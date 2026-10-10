import React from 'react';
import { Product, ProductVariant } from '../data/products';

interface VariantSelectorProps {
  product: Product;
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  selectedVariant,
  onSelectVariant,
}) => {
  // Extract unique colors with their hex codes
  const uniqueColors = product.variants.reduce<
    Array<{ color: string; colorHex: string }>
  >((acc, v) => {
    if (!acc.some((item) => item.color === v.color)) {
      acc.push({ color: v.color, colorHex: v.colorHex });
    }
    return acc;
  }, []);

  // Extract unique secondary options across the product
  const uniqueSecondaryOptions = Array.from(
    new Set(product.variants.map((v) => v.secondaryOption))
  );

  const handleColorClick = (colorName: string) => {
    // Try to find a variant with the same secondaryOption first
    const exactMatch = product.variants.find(
      (v) => v.color === colorName && v.secondaryOption === selectedVariant.secondaryOption
    );
    if (exactMatch) {
      onSelectVariant(exactMatch);
      return;
    }
    // Otherwise pick the first available variant in that color
    const fallbackMatch =
      product.variants.find(
        (v) => v.color === colorName && v.stockStatus !== 'out_of_stock'
      ) || product.variants.find((v) => v.color === colorName);

    if (fallbackMatch) {
      onSelectVariant(fallbackMatch);
    }
  };

  const handleSecondaryClick = (secOption: string) => {
    const exactMatch = product.variants.find(
      (v) => v.color === selectedVariant.color && v.secondaryOption === secOption
    );
    if (exactMatch) {
      onSelectVariant(exactMatch);
      return;
    }
    // If not available in current color, switch to a color that supports this option
    const anyWithOption = product.variants.find((v) => v.secondaryOption === secOption);
    if (anyWithOption) {
      onSelectVariant(anyWithOption);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Colour / Finish Selector */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2.5">
          <span className="font-semibold text-[#24211F]">
            Colour / Finish:{' '}
            <span className="font-normal text-[#5C534C]">{selectedVariant.color}</span>
          </span>
          <span className="text-[#6E655E] font-mono-code text-[11px]">
            SKU: {selectedVariant.sku}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3" role="radiogroup" aria-label="Select colour or finish">
          {uniqueColors.map((swatch) => {
            const isSelected = selectedVariant.color === swatch.color;
            const hasInStock = product.variants.some(
              (v) => v.color === swatch.color && v.stockStatus !== 'out_of_stock'
            );

            return (
              <button
                key={swatch.color}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => handleColorClick(swatch.color)}
                className={`flex items-center gap-2.5 px-3 py-2 border text-xs transition-all focus-visible:outline-2 focus-visible:outline-[#B89A64] ${
                  isSelected
                    ? 'border-[#24211F] bg-[#FAF7F2] font-semibold text-[#24211F] ring-1 ring-[#24211F]'
                    : 'border-[#E8DCCB] bg-white text-[#5C534C] hover:border-[#B89A64]'
                } ${!hasInStock ? 'opacity-50' : ''}`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-[#24211F]/25 shrink-0"
                  style={{ backgroundColor: swatch.colorHex }}
                />
                <span className="whitespace-nowrap">
                  {swatch.color}
                  {!hasInStock ? ' (Sold Out)' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Secondary Option Selector (Style / Size / Length / Pack Size / Strap) */}
      <div>
        <div className="flex items-center justify-between text-xs mb-2.5">
          <span className="font-semibold text-[#24211F]">
            {product.secondaryDimensionLabel}:{' '}
            <span className="font-normal text-[#5C534C]">
              {selectedVariant.secondaryOption}
            </span>
          </span>
        </div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
          role="radiogroup"
          aria-label={`Select ${product.secondaryDimensionLabel}`}
        >
          {uniqueSecondaryOptions.map((optionValue) => {
            const matchingInCurrentColor = product.variants.find(
              (v) =>
                v.color === selectedVariant.color && v.secondaryOption === optionValue
            );
            const isSelected = selectedVariant.secondaryOption === optionValue;
            const isCombinationMissing = !matchingInCurrentColor;
            const isOutOfStock =
              matchingInCurrentColor?.stockStatus === 'out_of_stock';

            return (
              <button
                key={optionValue}
                type="button"
                role="radio"
                aria-checked={isSelected}
                disabled={isCombinationMissing}
                onClick={() => handleSecondaryClick(optionValue)}
                className={`flex items-center justify-between px-3.5 py-2.5 border text-left text-xs transition-all focus-visible:outline-2 focus-visible:outline-[#B89A64] ${
                  isSelected
                    ? 'border-[#24211F] bg-[#24211F] text-white font-medium'
                    : isCombinationMissing
                    ? 'border-[#E8DCCB]/60 bg-[#FAF7F2]/50 text-[#9E948B] cursor-not-allowed line-through'
                    : isOutOfStock
                    ? 'border-[#E8DCCB] bg-[#FAF7F2] text-[#8C8075]'
                    : 'border-[#E8DCCB] bg-white text-[#24211F] hover:border-[#24211F]'
                }`}
              >
                <span className="truncate pr-2">{optionValue}</span>
                {matchingInCurrentColor && (
                  <span
                    className={`text-[11px] tabular-nums shrink-0 ${
                      isSelected ? 'text-[#E8DCCB]' : 'text-[#6E655E]'
                    }`}
                  >
                    {isOutOfStock
                      ? 'Unavailable'
                      : `₹${matchingInCurrentColor.price.toLocaleString('en-IN')}`}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Direct All-Varieties Quick Matrix (for transparent comparison) */}
      <div className="pt-2 border-t border-[#E8DCCB]/70">
        <p className="text-[11px] text-[#6E655E] mb-2">
          All {product.variants.length} configured varieties for this piece:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {product.variants.map((v) => {
            const active = v.id === selectedVariant.id;
            const out = v.stockStatus === 'out_of_stock';
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => onSelectVariant(v)}
                className={`px-2.5 py-1 text-[11px] border transition-colors ${
                  active
                    ? 'border-[#B89A64] bg-[#E8DCCB]/50 text-[#24211F] font-semibold'
                    : out
                    ? 'border-[#E8DCCB] text-[#9E948B] line-through'
                    : 'border-[#E8DCCB] text-[#5C534C] hover:border-[#24211F]'
                }`}
              >
                {v.color} · {v.secondaryOption.split('(')[0].trim()}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
