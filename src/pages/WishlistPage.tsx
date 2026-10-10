import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { formatINR } from '../config/site';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, moveWishlistToCart } = useStore();

  const savedProducts = wishlist
    .map((entry) => {
      const product = PRODUCTS.find((p) => p.id === entry.productId);
      if (!product) return null;
      const variant =
        product.variants.find((v) => v.id === entry.variantId) ||
        product.variants[0];
      return { product, variant, addedAt: entry.addedAt };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title="Your Saved Wishlist | VALENTINA"
        description="View and manage your saved VALENTINA accessories and move your favourite varieties to your shopping bag."
        canonicalPath="/wishlist"
        noindex={true}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Wishlist', path: '/wishlist' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Wishlist', path: '/wishlist' },
        ]}
      />

      <div className="py-8 border-b border-[#E8DCCB] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#24211F]">
            Saved Wishlist
          </h1>
          <p className="text-sm text-[#5C534C] mt-2">
            Your saved accessories are persisted in your browser so you can compare varieties and move them to your bag anytime.
          </p>
        </div>
        <span className="text-xs text-[#6E655E] tabular-nums">
          {savedProducts.length} {savedProducts.length === 1 ? 'Saved Piece' : 'Saved Pieces'}
        </span>
      </div>

      {savedProducts.length === 0 ? (
        <div className="mt-10 bg-white border border-[#E8DCCB] p-12 text-center max-w-xl mx-auto space-y-4">
          <Heart className="w-10 h-10 text-[#B89A64] mx-auto stroke-[1.5]" />
          <h2 className="font-serif-display text-3xl text-[#24211F]">
            Your Wishlist is Currently Empty
          </h2>
          <p className="text-xs sm:text-sm text-[#5C534C] leading-relaxed">
            Save earrings, necklaces, hair clips, bags or organisers as you browse by clicking the heart icon on any product card or detail page.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="px-7 py-3.5 bg-[#24211F] text-white text-xs sm:text-sm font-medium hover:bg-[#3A3532] transition-colors inline-flex items-center gap-2"
            >
              <span>Explore the Catalogue</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {savedProducts.map(({ product, variant }) => (
            <article
              key={product.id}
              className="bg-white border border-[#E8DCCB] flex flex-col justify-between"
            >
              <div>
                <Link
                  to={`/products/${product.slug}`}
                  className="block aspect-[4/3] bg-[#FAF7F2] overflow-hidden border-b border-[#E8DCCB]"
                >
                  <img
                    src={variant.images[0]?.url}
                    alt={variant.images[0]?.alt || product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </Link>

                <div className="p-6 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#6E655E]">
                    <span>{product.category}</span>
                    <span className="font-mono-code text-[11px]">{variant.sku}</span>
                  </div>

                  <Link
                    to={`/products/${product.slug}`}
                    className="font-serif-display text-2xl font-semibold text-[#24211F] hover:text-[#8F723E] block"
                  >
                    {product.name}
                  </Link>

                  <p className="text-xs text-[#5C534C]">
                    Preferred variety: <strong>{variant.color}</strong> ·{' '}
                    {variant.secondaryOption}
                  </p>

                  <p className="text-base font-semibold text-[#24211F] tabular-nums pt-1">
                    {formatINR(variant.price)}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#E8DCCB]/70 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => moveWishlistToCart(product.id)}
                  className="flex-1 py-2.5 px-4 bg-[#24211F] text-white text-xs font-medium hover:bg-[#3A3532] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Bag</span>
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={`Remove ${product.name} from wishlist`}
                  className="p-2.5 border border-[#E8DCCB] text-[#5C534C] hover:text-[#24211F] hover:border-[#24211F] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
