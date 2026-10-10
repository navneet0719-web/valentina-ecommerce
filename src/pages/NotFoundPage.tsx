import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Link } from '../context/RouterContext';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SEOHead
        title="Page Not Found (404) | VALENTINA"
        description="The page or accessory you were looking for could not be found. Explore the VALENTINA catalogue or return to the homepage."
        canonicalPath="/404"
        noindex={true}
      />

      <div className="bg-white border border-[#D8C3AD] p-10 sm:p-16 max-w-2xl mx-auto text-center space-y-6">
        <Compass className="w-12 h-12 text-[#C5A572] mx-auto stroke-[1.5]" />
        <p className="text-xs text-[#C5A572] tracking-[0.2em] font-semibold">
          ERROR 404 · PAGE NOT FOUND
        </p>
        <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#30251F]">
          We Couldn’t Find That Page
        </h1>
        <p className="text-sm text-[#8B7765] leading-relaxed max-w-md mx-auto">
          The link you followed may have moved or the URL may have been mistyped. Explore our accessory collections below or return to the homepage.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/shop"
            className="px-7 py-3.5 bg-[#30251F] text-white text-xs sm:text-sm font-medium hover:bg-[#8B7765] transition-colors inline-flex items-center gap-2"
          >
            <span>Shop All Accessories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/collections"
            className="px-7 py-3.5 border border-[#30251F] text-[#30251F] text-xs sm:text-sm font-medium hover:bg-[#FAF6F0] transition-colors"
          >
            Browse Collections
          </Link>
          <Link
            to="/"
            className="px-7 py-3.5 border border-[#D8C3AD] text-[#8B7765] text-xs sm:text-sm font-medium hover:text-[#30251F] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
