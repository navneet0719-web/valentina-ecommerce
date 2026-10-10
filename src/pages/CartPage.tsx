import React from 'react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../config/site';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartCount,
    cartSubtotal,
  } = useStore();

  // Illustrative demo shipping estimate
  const demoShippingEstimate = cartSubtotal > 0 ? (cartSubtotal >= 1990 ? 0 : 120) : 0;
  const demoTotal = cartSubtotal + demoShippingEstimate;

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title="Shopping Bag | VALENTINA"
        description="Review your selected VALENTINA accessories, adjust quantities, verify selected varieties and proceed to demo checkout."
        canonicalPath="/cart"
        noindex={true}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Shopping Bag', path: '/cart' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Shopping Bag', path: '/cart' },
        ]}
      />

      <div className="py-8 border-b border-[#E8DCCB] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#24211F]">
            Shopping Bag
          </h1>
          <p className="text-sm text-[#5C534C] mt-2">
            Different colours, sizes or styles of the same product are maintained as separate lines so you can review every selection clearly.
          </p>
        </div>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-[#6E655E] hover:text-[#24211F] underline self-start sm:self-auto"
          >
            Clear Entire Bag
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="mt-10 bg-white border border-[#E8DCCB] p-12 text-center max-w-xl mx-auto space-y-4">
          <ShoppingBag className="w-10 h-10 text-[#B89A64] mx-auto stroke-[1.5]" />
          <h2 className="font-serif-display text-3xl text-[#24211F]">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#5C534C] leading-relaxed">
            Explore our collections of earrings, necklaces, rings, hair accessories, structured bags and organisers to add items to your bag.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="px-7 py-3.5 bg-[#24211F] text-white text-xs sm:text-sm font-medium hover:bg-[#3A3532] transition-colors inline-flex items-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Cart Lines Table/List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.lineId}
                className="bg-white border border-[#E8DCCB] p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex gap-4 items-start flex-1 min-w-0">
                  <Link
                    to={`/products/${item.productSlug}`}
                    className="w-24 h-20 bg-[#FAF7F2] border border-[#E8DCCB] shrink-0 overflow-hidden"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.imageAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="space-y-1 min-w-0">
                    <span className="text-[11px] text-[#6E655E]">{item.category}</span>
                    <Link
                      to={`/products/${item.productSlug}`}
                      className="font-serif-display text-2xl font-semibold text-[#24211F] hover:text-[#8F723E] block truncate"
                    >
                      {item.productName}
                    </Link>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C534C]">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-[#24211F]/25"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <strong>Colour:</strong> {item.color}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>
                        <strong>{item.secondaryDimensionLabel}:</strong>{' '}
                        {item.secondaryOption}
                      </span>
                    </div>

                    <p className="text-[11px] font-mono-code text-[#8C8075]">
                      SKU: {item.sku} · Unit Price: {formatINR(item.unitPrice)}
                    </p>
                  </div>
                </div>

                {/* Quantity Stepper & Line Total */}
                <div className="w-full sm:w-auto flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E8DCCB]/70">
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center border border-[#24211F] bg-[#FAF7F2]">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.lineId, item.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-2 text-[#24211F] hover:bg-[#E8DCCB]/50"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3.5 text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(item.lineId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        aria-label="Increase quantity"
                        className="p-2 text-[#24211F] hover:bg-[#E8DCCB]/50 disabled:opacity-40"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.lineId)}
                      aria-label={`Remove ${item.productName}`}
                      className="p-2 text-[#8C8075] hover:text-[#9E3B33] transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-semibold text-[#24211F] tabular-nums">
                      {formatINR(item.unitPrice * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#24211F] hover:text-[#8F723E]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Box (4 Cols) */}
          <div className="lg:col-span-4 bg-white border border-[#E8DCCB] p-6 sm:p-8 space-y-5 lg:sticky lg:top-28">
            <h2 className="font-serif-display text-2xl font-semibold text-[#24211F] pb-3 border-b border-[#E8DCCB]">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-[#5C534C]">
              <div className="flex justify-between">
                <span>Items Subtotal ({cartCount} items)</span>
                <span className="font-semibold text-[#24211F] tabular-nums">
                  {formatINR(cartSubtotal)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Illustrative Shipping Estimate (Demo)</span>
                <span className="font-semibold text-[#24211F] tabular-nums">
                  {demoShippingEstimate === 0
                    ? '₹0 (Demo Complimentary Tier)'
                    : formatINR(demoShippingEstimate)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DCCB] flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[#24211F]">Estimated Total</span>
              <span className="font-serif-display text-3xl font-semibold text-[#24211F] tabular-nums">
                {formatINR(demoTotal)}
              </span>
            </div>

            <div className="p-3 bg-[#FAF7F2] border border-[#E8DCCB] text-[11px] text-[#5C534C] leading-relaxed">
              <strong>Demonstration Notice:</strong> Shipping figures and totals shown above are illustrative sample calculations for this demo store.
            </div>

            <Link
              to="/checkout"
              className="w-full py-3.5 px-6 bg-[#24211F] text-white text-xs sm:text-sm font-medium hover:bg-[#3A3532] transition-colors flex items-center justify-center gap-2"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
