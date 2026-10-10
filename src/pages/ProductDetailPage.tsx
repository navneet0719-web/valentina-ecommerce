import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  ShoppingBag,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductGallery } from '../components/ProductGallery';
import { VariantSelector } from '../components/VariantSelector';
import { ProductCard } from '../components/ProductCard';
import { Link } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { getProductBySlug, PRODUCTS, ProductVariant } from '../data/products';
import { getCollectionBySlug } from '../data/collections';
import { SITE_CONFIG, formatINR } from '../config/site';
import { trackEvent } from '../utils/analytics';
import { NotFoundPage } from './NotFoundPage';

interface ProductDetailPageProps {
  slug: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug }) => {
  const product = getProductBySlug(slug);
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    recentlyViewedSlugs,
    recordRecentlyViewed,
  } = useStore();

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    () => product?.variants[0] || null
  );
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      const initialVar = product.variants[0];
      setSelectedVariant(initialVar);
      setQuantity(1);
      recordRecentlyViewed(product.slug);
      trackEvent('view_item', {
        item_id: product.id,
        item_name: product.name,
        category: product.category,
        price: initialVar.price,
        sku: initialVar.sku,
      });
    }
  }, [product, recordRecentlyViewed]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const explicit = product.relatedSlugs
      .map((s) => getProductBySlug(s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    if (explicit.length >= 3) return explicit.slice(0, 3);
    const sameCategory = PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    );
    return [...explicit, ...sameCategory].slice(0, 3);
  }, [product]);

  const recentlyViewedProducts = useMemo(() => {
    if (!product) return [];
    return recentlyViewedSlugs
      .filter((s) => s !== product.slug)
      .map((s) => getProductBySlug(s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .slice(0, 3);
  }, [product, recentlyViewedSlugs]);

  if (!product || !selectedVariant) {
    return <NotFoundPage />;
  }

  const wishlisted = isInWishlist(product.id);
  const primaryCollectionSlug = product.collections[0] || 'jewellery';
  const primaryCollection = getCollectionBySlug(primaryCollectionSlug);

  const handleVariantChange = (nextVariant: ProductVariant) => {
    setSelectedVariant(nextVariant);
    setQuantity((prev) =>
      nextVariant.stockQuantity > 0 ? Math.min(prev, nextVariant.stockQuantity) : 1
    );
  };

  // Accurate Product Schema.org JSON-LD matching visible demo data (no fake ratings or reviews)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: selectedVariant.sku,
    description: product.description,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.brandName,
    },
    url: `${SITE_CONFIG.productionDomain}/products/${product.slug}`,
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.productionDomain}/products/${product.slug}`,
      priceCurrency: 'INR',
      price: String(selectedVariant.price),
      availability:
        selectedVariant.stockStatus === 'out_of_stock'
          ? 'https://schema.org/OutOfStock'
          : 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
    },
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title={product.seoTitle}
        description={product.metaDescription}
        canonicalPath={`/products/${product.slug}`}
        ogType="product"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          {
            name: primaryCollection?.name || product.category,
            path: `/collections/${primaryCollectionSlug}`,
          },
          { name: product.name, path: `/products/${product.slug}` },
        ]}
        jsonLd={productJsonLd}
      />

      {/* 1. Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Shop', path: '/shop' },
          {
            name: primaryCollection?.name || product.category,
            path: `/collections/${primaryCollectionSlug}`,
          },
          { name: product.name, path: `/products/${product.slug}` },
        ]}
      />

      {/* Main Contiguous Purchase Module (Gallery Left + Sticky Purchase Module Right) */}
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* 2. Product Image Gallery */}
        <div className="lg:col-span-7 lg:sticky lg:top-28">
          <ProductGallery
            images={selectedVariant.images}
            productName={`${product.name} (${selectedVariant.color})`}
          />
        </div>

        {/* 3–9. Product Details & Variant Purchase Module */}
        <div className="lg:col-span-5 bg-white border border-[#E8DCCB] p-6 sm:p-8 space-y-6">
          {/* Unboxed category & collection links */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E655E]">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span> SKU: {selectedVariant.sku}</span>
          </div>

          {/* 3. Product Title and Price */}
          <div>
            <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#24211F]">
              {product.name}
            </h1>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl font-semibold text-[#24211F] tabular-nums">
                {formatINR(selectedVariant.price)}
              </span>
              {selectedVariant.compareAtPrice && (
                <span className="text-sm text-[#7D7268] line-through tabular-nums">
                  {formatINR(selectedVariant.compareAtPrice)}
                </span>
              )}
              <span className="text-xs text-[#6E655E]">
                Inclusive of illustrative demo taxes
              </span>
            </div>
            {selectedVariant.compareAtPrice && (
              <p className="text-[11px] text-[#8F723E] mt-1">
                *Comparison price shown is illustrative demo merchandising data.
              </p>
            )}
          </div>

          {/* 17. Visible Stock Status Derived from Product Data */}
          <div className="py-2.5 px-3.5 bg-[#FAF7F2] border border-[#E8DCCB] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {selectedVariant.stockStatus === 'in_stock' && (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#2E6F40] shrink-0" />
                  <span className="font-medium text-[#24211F]">
                    In Stock ({selectedVariant.stockQuantity} units in demo inventory)
                  </span>
                </>
              )}
              {selectedVariant.stockStatus === 'low_stock' && (
                <>
                  <AlertCircle className="w-4 h-4 text-[#B86B14] shrink-0" />
                  <span className="font-medium text-[#24211F]">
                    Low Stock — Only {selectedVariant.stockQuantity} remaining in demo inventory
                  </span>
                </>
              )}
              {selectedVariant.stockStatus === 'out_of_stock' && (
                <>
                  <AlertCircle className="w-4 h-4 text-[#9E3B33] shrink-0" />
                  <span className="font-medium text-[#9E3B33]">
                    Currently Out of Stock in this variety — Please select another option
                  </span>
                </>
              )}
            </div>
          </div>

          {/* 4. Short Product Introduction */}
          <p className="text-sm text-[#5C534C] leading-relaxed">
            {product.shortSummary}
          </p>

          {/* 5. Variant Selector (Colour Swatches + Secondary Option + Matrix) */}
          <VariantSelector
            product={product}
            selectedVariant={selectedVariant}
            onSelectVariant={handleVariantChange}
          />

          {/* 6, 7, 8. Quantity Selector, Add to Cart & Add to Wishlist */}
          <div className="pt-4 border-t border-[#E8DCCB] space-y-3">
            <div className="flex items-center gap-4">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#24211F] bg-[#FAF7F2]">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={selectedVariant.stockStatus === 'out_of_stock'}
                  aria-label="Decrease quantity"
                  className="p-3 text-[#24211F] hover:bg-[#E8DCCB]/60 disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-semibold text-[#24211F] tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) =>
                      Math.min(selectedVariant.stockQuantity || 1, q + 1)
                    )
                  }
                  disabled={
                    selectedVariant.stockStatus === 'out_of_stock' ||
                    quantity >= selectedVariant.stockQuantity
                  }
                  aria-label="Increase quantity"
                  className="p-3 text-[#24211F] hover:bg-[#E8DCCB]/60 disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                type="button"
                disabled={selectedVariant.stockStatus === 'out_of_stock'}
                onClick={() => addToCart(product, selectedVariant, quantity, true)}
                className="flex-1 py-3.5 px-6 bg-[#24211F] text-white text-xs sm:text-sm font-medium hover:bg-[#3A3532] disabled:bg-[#9E948B] disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {selectedVariant.stockStatus === 'out_of_stock'
                    ? 'Variety Out of Stock'
                    : `Add to Bag · ${formatINR(selectedVariant.price * quantity)}`}
                </span>
              </button>
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product, selectedVariant.id)}
              className="w-full py-3 px-4 border border-[#E8DCCB] bg-[#FAF7F2] hover:border-[#24211F] text-xs font-medium text-[#24211F] transition-colors flex items-center justify-center gap-2"
            >
              <Heart
                className={`w-4 h-4 ${
                  wishlisted ? 'fill-[#B89A64] text-[#B89A64]' : 'text-[#24211F]'
                }`}
              />
              <span>
                {wishlisted ? 'Saved in Your Wishlist (Click to Remove)' : 'Add to Wishlist'}
              </span>
            </button>
          </div>

          {/* 9 & 13. Delivery, Shipping & Returns Information Links */}
          <div className="pt-4 border-t border-[#E8DCCB] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              to="/shipping-policy"
              className="flex items-center gap-2.5 p-3 bg-[#FAF7F2] border border-[#E8DCCB] hover:border-[#B89A64] transition-colors"
            >
              <Truck className="w-4 h-4 text-[#B89A64] shrink-0" />
              <div>
                <p className="font-semibold text-[#24211F]">Shipping & Delivery</p>
                <p className="text-[11px] text-[#6E655E] underline">View shipping guide</p>
              </div>
            </Link>

            <Link
              to="/returns-refunds"
              className="flex items-center gap-2.5 p-3 bg-[#FAF7F2] border border-[#E8DCCB] hover:border-[#B89A64] transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-[#B89A64] shrink-0" />
              <div>
                <p className="font-semibold text-[#24211F]">Returns & Exchanges</p>
                <p className="text-[11px] text-[#6E655E] underline">View returns guide</p>
              </div>
            </Link>
          </div>

          {/* Collection Membership Links */}
          <div className="text-xs text-[#6E655E] flex flex-wrap items-center gap-2 pt-2">
            <span>Explore in Collections:</span>
            {product.collections.map((colSlug) => {
              const colInfo = getCollectionBySlug(colSlug);
              return (
                <Link
                  key={colSlug}
                  to={`/collections/${colSlug}`}
                  className="text-[#24211F] underline hover:text-[#8F723E]"
                >
                  {colInfo?.name || colSlug}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* 10, 11, 12, 14. Detailed Description, Features, Specifications, Care & Product FAQs */}
      <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Description, Key Features & Care */}
        <div className="lg:col-span-7 bg-white border border-[#E8DCCB] p-6 sm:p-10 space-y-8">
          <div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#24211F] mb-3">
              Product Description
            </h2>
            <p className="text-sm text-[#5C534C] leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="pt-6 border-t border-[#E8DCCB]">
            <h3 className="font-serif-display text-2xl font-semibold text-[#24211F] mb-3">
              Key Features
            </h3>
            <ul className="space-y-2 text-sm text-[#5C534C] list-disc pl-5">
              {product.features.map((feat, idx) => (
                <li key={idx} className="leading-relaxed">
                  {feat}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-6 border-t border-[#E8DCCB] grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-serif-display text-xl font-semibold text-[#24211F] mb-2">
                Materials & Finish
              </h3>
              <p className="text-xs text-[#5C534C] leading-relaxed">
                {product.materialAndFinish}
              </p>
            </div>
            <div>
              <h3 className="font-serif-display text-xl font-semibold text-[#24211F] mb-2">
                Care Instructions
              </h3>
              <ul className="space-y-1.5 text-xs text-[#5C534C] list-disc pl-4">
                {product.careInstructions.map((care, idx) => (
                  <li key={idx}>{care}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Specifications Table & Product FAQs */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-[#E8DCCB] p-6 sm:p-8">
            <h2 className="font-serif-display text-2xl font-semibold text-[#24211F] mb-4">
              Specifications
            </h2>
            <dl className="divide-y divide-[#E8DCCB]/70 text-xs">
              {product.specifications.map((spec) => (
                <div key={spec.label} className="py-3 flex justify-between gap-4">
                  <dt className="text-[#6E655E] font-medium">{spec.label}</dt>
                  <dd className="text-[#24211F] text-right font-medium">{spec.value}</dd>
                </div>
              ))}
              <div className="py-3 flex justify-between gap-4">
                <dt className="text-[#6E655E] font-medium">Selected Variety SKU</dt>
                <dd className="text-[#24211F] font-mono-code">{selectedVariant.sku}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white border border-[#E8DCCB] p-6 sm:p-8">
            <h2 className="font-serif-display text-2xl font-semibold text-[#24211F] mb-4">
              Product Questions & Answers
            </h2>
            <div className="space-y-4">
              {product.faqs.map((faq, idx) => (
                <div key={idx} className="pb-4 border-b border-[#E8DCCB]/70 last:border-b-0 last:pb-0">
                  <h3 className="text-xs font-semibold text-[#24211F] mb-1">
                    {faq.question}
                  </h3>
                  <p className="text-xs text-[#5C534C] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
              <div className="pt-2">
                <Link
                  to="/faq"
                  className="text-xs font-semibold text-[#8F723E] hover:text-[#24211F] underline"
                >
                  View all general shopping FAQs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 15. Related Products */}
      <section className="mt-16 pt-12 border-t border-[#E8DCCB]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs text-[#8F723E] tracking-widest mb-1">COMPLETE THE LOOK</p>
            <h2 className="font-serif-display text-3xl font-semibold text-[#24211F]">
              Related Pieces You May Like
            </h2>
          </div>
          <Link
            to={`/collections/${primaryCollectionSlug}`}
            className="text-xs font-semibold text-[#24211F] hover:text-[#8F723E] underline"
          >
            View {primaryCollection?.name || product.category}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {relatedProducts.map((relProd) => (
            <ProductCard key={relProd.id} product={relProd} />
          ))}
        </div>
      </section>

      {/* 16. Recently Viewed Products */}
      {recentlyViewedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#E8DCCB]">
          <div className="mb-8">
            <p className="text-xs text-[#8F723E] tracking-widest mb-1">YOUR BROWSING HISTORY</p>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#24211F]">
              Recently Viewed Pieces
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {recentlyViewedProducts.map((recProd) => (
              <ProductCard key={recProd.id} product={recProd} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
