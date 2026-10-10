import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Link, useRouter } from '../context/RouterContext';
import { formatINR } from '../config/site';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateCartQuantity,
    removeFromCart,
    cartCount,
    cartSubtotal,
  } = useStore();
  const { navigate } = useRouter();

  if (!isCartDrawerOpen) return null;

  const handleCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCart = () => {
    setIsCartDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#24211F]/50 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag"
    >
      {/* Backdrop click to close */}
      <div
        className="flex-1"
        onClick={() => setIsCartDrawerOpen(false)}
        aria-hidden="true"
      />

      <div className="w-full max-w-md bg-[#FAF7F2] h-full flex flex-col border-l border-[#E8DCCB] shadow-2xl">
        {/* Drawer Header */}
        <div className="px-6 py-5 bg-white border-b border-[#E8DCCB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#B89A64]" />
            <h2 className="font-serif-display text-2xl font-semibold text-[#24211F]">
              Your Shopping Bag
            </h2>
            <span className="text-xs text-[#6E655E] tabular-nums">
              ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(false)}
            aria-label="Close shopping bag"
            className="p-2 text-[#5C534C] hover:text-[#24211F] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag className="w-10 h-10 text-[#B89A64] mb-3 stroke-[1.5]" />
              <p className="font-serif-display text-2xl text-[#24211F] mb-2">
                Your bag is currently empty
              </p>
              <p className="text-xs text-[#6E655E] max-w-xs mb-6 leading-relaxed">
                Explore our jewellery, hair accessories, structured bags and organisers to add your favourite varieties.
              </p>
              <Link
                to="/shop"
                onClick={() => setIsCartDrawerOpen(false)}
                className="px-6 py-3 bg-[#24211F] text-white text-xs font-medium hover:bg-[#3A3532] transition-colors"
              >
                Explore All Accessories
              </Link>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.lineId}
                className="flex gap-4 p-4 bg-white border border-[#E8DCCB]"
              >
                <Link
                  to={`/products/${item.productSlug}`}
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="w-20 h-20 bg-[#FAF7F2] border border-[#E8DCCB] shrink-0 overflow-hidden"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      to={`/products/${item.productSlug}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="font-serif-display text-lg font-semibold text-[#24211F] hover:text-[#8F723E] truncate"
                    >
                      {item.productName}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.lineId)}
                      aria-label={`Remove ${item.productName} (${item.color})`}
                      className="text-[#8C8075] hover:text-[#24211F] p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Variant Metadata */}
                  <div className="mt-1 space-y-0.5 text-xs text-[#5C534C]">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-[#24211F]/25 inline-block"
                        style={{ backgroundColor: item.colorHex }}
                      />
                      <span>{item.color}</span>
                    </div>
                    <p className="text-[11px] text-[#6E655E]">
                      {item.secondaryDimensionLabel}: {item.secondaryOption}
                    </p>
                    <p className="text-[10px] font-mono-code text-[#8C8075]">
                      SKU: {item.sku}
                    </p>
                  </div>

                  {/* Quantity & Line Subtotal */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center border border-[#E8DCCB] bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.lineId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 text-[#24211F] hover:bg-[#E8DCCB]/50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-medium tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.lineId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        aria-label="Increase quantity"
                        className="p-1.5 text-[#24211F] hover:bg-[#E8DCCB]/50 disabled:opacity-40"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-semibold text-[#24211F] tabular-nums">
                        {formatINR(item.unitPrice * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <p className="text-[11px] text-[#6E655E] tabular-nums">
                          {formatINR(item.unitPrice)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-[#E8DCCB] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5C534C]">Subtotal (INR)</span>
              <span className="font-serif-display text-2xl font-semibold text-[#24211F] tabular-nums">
                {formatINR(cartSubtotal)}
              </span>
            </div>
            <p className="text-[11px] text-[#6E655E]">
              Demonstration store: illustrative shipping estimates are shown at checkout. No real payment is processed.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleViewCart}
                className="py-3 px-4 border border-[#24211F] text-[#24211F] text-xs font-medium hover:bg-[#FAF7F2] transition-colors whitespace-nowrap"
              >
                View Full Bag
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="py-3 px-4 bg-[#24211F] text-white text-xs font-medium hover:bg-[#3A3532] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <span>Demo Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
