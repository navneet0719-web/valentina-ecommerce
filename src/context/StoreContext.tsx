import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { PRODUCTS, Product, ProductVariant } from '../data/products';
import { trackEvent } from '../utils/analytics';

export interface CartItem {
  lineId: string; // `${productId}::${variantId}` — ensures different variants of same product are separate cart lines
  productId: string;
  productSlug: string;
  productName: string;
  category: string;
  variantId: string;
  sku: string;
  color: string;
  colorHex: string;
  secondaryDimensionLabel: string;
  secondaryOption: string;
  unitPrice: number;
  imageUrl: string;
  imageAlt: string;
  quantity: number;
  maxStock: number;
}

export interface WishlistItem {
  productId: string;
  variantId?: string;
  addedAt: string;
}

interface StoreContextValue {
  cart: CartItem[];
  wishlist: WishlistItem[];
  recentlyViewedSlugs: string[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  toastMessage: string | null;
  clearToast: () => void;
  addToCart: (product: Product, variant: ProductVariant, quantity?: number, openDrawer?: boolean) => void;
  updateCartQuantity: (lineId: string, newQuantity: number) => void;
  removeFromCart: (lineId: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product, variantId?: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;
  recordRecentlyViewed: (slug: string) => void;
  cartCount: number;
  cartSubtotal: number;
}

const CART_STORAGE_KEY = 'valentina_demo_cart_v1';
const WISHLIST_STORAGE_KEY = 'valentina_demo_wishlist_v1';
const RECENT_STORAGE_KEY = 'valentina_demo_recent_v1';

function loadValidatedCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Re-validate against live product & variant catalogue to handle stale/corrupt storage gracefully
    const validItems: CartItem[] = [];
    for (const item of parsed) {
      if (!item || typeof item.productId !== 'string' || typeof item.variantId !== 'string') {
        continue;
      }
      const product = PRODUCTS.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.variantId);
      if (!product || !variant || variant.stockStatus === 'out_of_stock') continue;

      const qty = Math.max(1, Math.min(Number(item.quantity) || 1, variant.stockQuantity || 10));
      validItems.push({
        lineId: `${product.id}::${variant.id}`,
        productId: product.id,
        productSlug: product.slug,
        productName: product.name,
        category: product.category,
        variantId: variant.id,
        sku: variant.sku,
        color: variant.color,
        colorHex: variant.colorHex,
        secondaryDimensionLabel: product.secondaryDimensionLabel,
        secondaryOption: variant.secondaryOption,
        unitPrice: variant.price,
        imageUrl: variant.images[0]?.url || '',
        imageAlt: variant.images[0]?.alt || product.name,
        quantity: qty,
        maxStock: variant.stockQuantity,
      });
    }
    return validItems;
  } catch {
    return [];
  }
}

function loadValidatedWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (w) =>
        w &&
        typeof w.productId === 'string' &&
        PRODUCTS.some((p) => p.id === w.productId)
    );
  } catch {
    return [];
  }
}

function loadValidatedRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((s) => typeof s === 'string' && PRODUCTS.some((p) => p.slug === s))
      .slice(0, 8);
  } catch {
    return [];
  }
}

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => loadValidatedCart());
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => loadValidatedWishlist());
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>(() =>
    loadValidatedRecent()
  );
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(recentlyViewedSlugs));
    } catch {
      // Ignore quota errors
    }
  }, [recentlyViewedSlugs]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const clearToast = useCallback(() => setToastMessage(null), []);

  const addToCart = useCallback(
    (product: Product, variant: ProductVariant, quantity = 1, openDrawer = true) => {
      if (variant.stockStatus === 'out_of_stock' || variant.stockQuantity <= 0) {
        showToast('This variant is currently unavailable in demo inventory.');
        return;
      }

      const lineId = `${product.id}::${variant.id}`;
      setCart((prev) => {
        const existingIndex = prev.findIndex((item) => item.lineId === lineId);
        if (existingIndex > -1) {
          const updated = [...prev];
          const existing = updated[existingIndex];
          const nextQty = Math.min(existing.quantity + quantity, variant.stockQuantity);
          updated[existingIndex] = { ...existing, quantity: nextQty };
          return updated;
        }
        return [
          ...prev,
          {
            lineId,
            productId: product.id,
            productSlug: product.slug,
            productName: product.name,
            category: product.category,
            variantId: variant.id,
            sku: variant.sku,
            color: variant.color,
            colorHex: variant.colorHex,
            secondaryDimensionLabel: product.secondaryDimensionLabel,
            secondaryOption: variant.secondaryOption,
            unitPrice: variant.price,
            imageUrl: variant.images[0]?.url || '',
            imageAlt: variant.images[0]?.alt || product.name,
            quantity: Math.min(quantity, variant.stockQuantity),
            maxStock: variant.stockQuantity,
          },
        ];
      });

      trackEvent('add_to_cart', {
        item_id: product.id,
        item_name: product.name,
        item_variant: `${variant.color} / ${variant.secondaryOption}`,
        sku: variant.sku,
        price: variant.price,
        quantity,
      });

      showToast(`Added "${product.name} (${variant.color})" to your bag.`);
      if (openDrawer) {
        setIsCartDrawerOpen(true);
      }
    },
    [showToast]
  );

  const updateCartQuantity = useCallback((lineId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart((prev) => {
        const target = prev.find((i) => i.lineId === lineId);
        if (target) {
          trackEvent('remove_from_cart', {
            item_id: target.productId,
            item_name: target.productName,
            sku: target.sku,
          });
        }
        return prev.filter((item) => item.lineId !== lineId);
      });
      return;
    }

    setCart((prev) =>
      prev.map((item) =>
        item.lineId === lineId
          ? { ...item, quantity: Math.min(newQuantity, item.maxStock) }
          : item
      )
    );
  }, []);

  const removeFromCart = useCallback(
    (lineId: string) => {
      setCart((prev) => {
        const target = prev.find((i) => i.lineId === lineId);
        if (target) {
          trackEvent('remove_from_cart', {
            item_id: target.productId,
            item_name: target.productName,
            sku: target.sku,
          });
        }
        return prev.filter((item) => item.lineId !== lineId);
      });
      showToast('Item removed from your shopping bag.');
    },
    [showToast]
  );

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => wishlist.some((w) => w.productId === productId),
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product: Product, variantId?: string) => {
      setWishlist((prev) => {
        const exists = prev.some((w) => w.productId === product.id);
        if (exists) {
          trackEvent('remove_from_wishlist', {
            item_id: product.id,
            item_name: product.name,
          });
          showToast(`Removed "${product.name}" from your wishlist.`);
          return prev.filter((w) => w.productId !== product.id);
        } else {
          trackEvent('add_to_wishlist', {
            item_id: product.id,
            item_name: product.name,
            price: product.basePrice,
          });
          showToast(`Saved "${product.name}" to your wishlist.`);
          return [
            ...prev,
            {
              productId: product.id,
              variantId: variantId || product.variants[0]?.id,
              addedAt: new Date().toISOString(),
            },
          ];
        }
      });
    },
    [showToast]
  );

  const moveWishlistToCart = useCallback(
    (productId: string) => {
      const product = PRODUCTS.find((p) => p.id === productId);
      if (!product) return;
      const savedEntry = wishlist.find((w) => w.productId === productId);
      const preferredVariant =
        product.variants.find(
          (v) => v.id === savedEntry?.variantId && v.stockStatus !== 'out_of_stock'
        ) ||
        product.variants.find((v) => v.stockStatus !== 'out_of_stock') ||
        product.variants[0];

      if (preferredVariant) {
        addToCart(product, preferredVariant, 1, true);
        setWishlist((prev) => prev.filter((w) => w.productId !== productId));
      }
    },
    [wishlist, addToCart]
  );

  const recordRecentlyViewed = useCallback((slug: string) => {
    setRecentlyViewedSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      return [slug, ...filtered].slice(0, 6);
    });
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart]
  );

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        recentlyViewedSlugs,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        toastMessage,
        clearToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        recordRecentlyViewed,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return ctx;
}
