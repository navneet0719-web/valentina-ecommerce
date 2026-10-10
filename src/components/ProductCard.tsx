import React, { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';
import { Link } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../config/site';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useStore();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [imgError, setImgError] = useState(false);

  const activeVariant = product.variants[selectedVariantIdx] || product.variants[0];
  const wishlisted = isInWishlist(product.id);

  // Deduplicate colour swatches for quick card preview
  const uniqueColorVariants = product.variants.reduce<
    Array<{ color: string; colorHex: string; variantIndex: number }>
  >((acc, v, idx) => {
    if (!acc.some((item) => item.color === v.color)) {
      acc.push({ color: v.color, colorHex: v.colorHex, variantIndex: idx });
    }
    return acc;
  }, []);

  const primaryImage = activeVariant?.images[0];

  return (
    <article className="group flex flex-col bg-white border border-[#E8DCCB] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      {/* Image Container (4:3 aspect ratio) */}
      <div className="relative aspect-[4/3] w-full bg-[#FAF7F2] overflow-hidden">
        <Link
          to={`/products/${product.slug}`}
          className="block w-full h-full focus-visible:outline-2 focus-visible:outline-[#B89A64]"
          aria-label={`View ${product.name}`}
        >
          {!imgError && primaryImage?.url ? (
            <img
              src={primaryImage.url}
              alt={primaryImage.alt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FAF7F2] to-[#E8DCCB]">
              <span className="font-serif-display text-lg text-[#24211F]">
                {product.name}
              </span>
              <span className="text-xs text-[#6E655E] mt-1">{activeVariant?.color}</span>
            </div>
          )}
        </Link>

        {/* Subtle single text label (No pill badge clusters) */}
        {product.isNewArrival ? (
          <span className="absolute top-3 left-3 bg-[#FAF7F2]/95 px-2.5 py-1 text-[11px] font-medium tracking-wider text-[#24211F]">
            New Arrival
          </span>
        ) : product.isBestseller ? (
          <span className="absolute top-3 left-3 bg-[#FAF7F2]/95 px-2.5 py-1 text-[11px] font-medium tracking-wider text-[#6E655E]">
            Curated Edit
          </span>
        ) : null}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product, activeVariant?.id)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 hover:bg-white text-[#24211F] border border-[#E8DCCB] transition-colors focus-visible:outline-2 focus-visible:outline-[#B89A64]"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              wishlisted ? 'fill-[#B89A64] text-[#B89A64]' : 'text-[#24211F]'
            }`}
          />
        </button>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-5 justify-between gap-4">
        <div>
          {/* Clean unboxed metadata */}
          <div className="flex items-center gap-1.5 text-xs text-[#6E655E] mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.variants.length} Varieties</span>
          </div>

          <Link
            to={`/products/${product.slug}`}
            className="block font-serif-display text-xl font-semibold text-[#24211F] hover:text-[#8F723E] transition-colors line-clamp-1"
          >
            {product.name}
          </Link>

          <p className="text-xs text-[#5C534C] mt-1 line-clamp-2 leading-relaxed">
            {product.shortSummary}
          </p>

          {/* Interactive Color Swatches */}
          {uniqueColorVariants.length > 0 && (
            <div className="mt-3 flex items-center gap-2" role="group" aria-label="Available finishes">
              {uniqueColorVariants.slice(0, 5).map((swatch) => {
                const isSelected = activeVariant?.color === swatch.color;
                return (
                  <button
                    key={swatch.color}
                    type="button"
                    onClick={() => setSelectedVariantIdx(swatch.variantIndex)}
                    title={`${swatch.color}`}
                    aria-label={`Preview ${swatch.color}`}
                    className={`w-5 h-5 rounded-full border transition-transform ${
                      isSelected
                        ? 'ring-2 ring-[#24211F] ring-offset-1 scale-105 border-white'
                        : 'border-[#C8B9A6] hover:scale-105'
                    }`}
                    style={{ backgroundColor: swatch.colorHex }}
                  />
                );
              })}
              <span className="text-[11px] text-[#6E655E] truncate ml-1">
                {activeVariant?.color}
              </span>
            </div>
          )}
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 border-t border-[#E8DCCB]/70 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-[15px] font-semibold text-[#24211F] tabular-nums">
                {formatINR(activeVariant.price)}
              </span>
              {activeVariant.compareAtPrice && (
                <span
                  className="text-xs text-[#7D7268] line-through tabular-nums"
                  title="Illustrative demo comparison price"
                >
                  {formatINR(activeVariant.compareAtPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#6E655E] truncate max-w-[140px]">
              {activeVariant.secondaryOption}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              disabled={activeVariant.stockStatus === 'out_of_stock'}
              onClick={() => addToCart(product, activeVariant, 1, true)}
              aria-label={`Add ${product.name} (${activeVariant.color}) to bag`}
              className="p-2.5 border border-[#24211F] text-[#24211F] hover:bg-[#24211F] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Quick Add Selected Variant"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
            <Link
              to={`/products/${product.slug}`}
              className="px-3.5 py-2 text-xs font-medium bg-[#24211F] text-white hover:bg-[#3A3532] transition-colors whitespace-nowrap shrink-0"
            >
              View Product
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
