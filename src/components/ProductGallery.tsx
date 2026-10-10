import React, { useState, useEffect } from 'react';
import { ProductImage } from '../data/products';

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  productName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  // Reset to first angle if variant images array changes but keep selected angle index if valid
  useEffect(() => {
    setImgError(false);
    if (activeIndex >= images.length) {
      setActiveIndex(0);
    }
  }, [images, activeIndex]);

  const currentImage = images[activeIndex] || images[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Studio Image */}
      <div className="relative aspect-[4/3] w-full bg-white border border-[#E8DCCB] overflow-hidden">
        {!imgError && currentImage?.url ? (
          <img
            src={currentImage.url}
            alt={currentImage.alt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#FAF7F2] text-center">
            <span className="font-serif-display text-2xl text-[#24211F]">
              {productName}
            </span>
            <span className="text-xs text-[#6E655E] mt-2">
              {currentImage?.caption}
            </span>
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-[#FAF7F2]/90 border border-[#E8DCCB] px-3 py-1 text-[11px] text-[#5C534C]">
          {currentImage?.caption}
        </div>
      </div>

      {/* Angle Thumbnails */}
      <div
        className="grid grid-cols-4 gap-3"
        role="tablist"
        aria-label="Product gallery angles"
      >
        {images.map((image, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={image.angle + idx}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-label={`View ${image.caption}`}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[4/3] bg-white border overflow-hidden transition-all focus-visible:outline-2 focus-visible:outline-[#B89A64] ${
                isSelected
                  ? 'border-[#24211F] ring-1 ring-[#24211F]'
                  : 'border-[#E8DCCB] opacity-75 hover:opacity-100'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
