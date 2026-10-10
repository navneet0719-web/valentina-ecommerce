import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { useRouter } from '../context/RouterContext';
import { trackEvent } from '../utils/analytics';

interface ShopPageProps {
  mode?: 'all' | 'new-arrivals' | 'bestsellers';
}

export const ShopPage: React.FC<ShopPageProps> = ({ mode = 'all' }) => {
  const { search } = useRouter();

  const initialQuerySearch = useMemo(() => {
    const params = new URLSearchParams(search);
    return params.get('search') || '';
  }, [search]);

  const [searchTerm, setSearchTerm] = useState(initialQuerySearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [selectedColorGroup, setSelectedColorGroup] = useState<string>('all');
  const [priceCeiling, setPriceCeiling] = useState<number>(3500);
  const [sortBy, setSortBy] = useState<
    'newest' | 'price-asc' | 'price-desc' | 'alpha-asc'
  >('newest');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  useEffect(() => {
    setSearchTerm(initialQuerySearch);
  }, [initialQuerySearch]);

  useEffect(() => {
    // Reset pagination count when mode changes
    setVisibleCount(12);
  }, [mode]);

  const allCategories = useMemo(
    () => Array.from(new Set(PRODUCTS.map((p) => p.category))),
    []
  );

  const colorKeywords = [
    { label: 'All Finishes & Colours', value: 'all' },
    { label: 'Gold Tone', value: 'gold' },
    { label: 'Silver Tone', value: 'silver' },
    { label: 'Rose Gold & Blush', value: 'rose' },
    { label: 'Warm Ivory & Pearl', value: 'ivory' },
    { label: 'Champagne & Taupe', value: 'champagne' },
    { label: 'Noir & Charcoal', value: 'noir' },
    { label: 'Sage & Emerald', value: 'sage' },
  ];

  const baseProducts = useMemo(() => {
    if (mode === 'new-arrivals') {
      return PRODUCTS.filter((p) => p.isNewArrival);
    }
    if (mode === 'bestsellers') {
      return PRODUCTS.filter((p) => p.isBestseller);
    }
    return PRODUCTS;
  }, [mode]);

  const filteredProducts = useMemo(() => {
    return baseProducts
      .filter((product) => {
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesCategory = product.category.toLowerCase().includes(q);
          const matchesSummary = product.shortSummary.toLowerCase().includes(q);
          if (!matchesName && !matchesCategory && !matchesSummary) return false;
        }

        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        if (
          selectedCollection !== 'all' &&
          !product.collections.includes(selectedCollection)
        ) {
          return false;
        }

        if (product.basePrice > priceCeiling) {
          return false;
        }

        if (selectedColorGroup !== 'all') {
          const hasMatchingVariantColor = product.variants.some((v) => {
            const c = v.color.toLowerCase();
            if (selectedColorGroup === 'rose') {
              return c.includes('rose') || c.includes('blush');
            }
            if (selectedColorGroup === 'ivory') {
              return c.includes('ivory') || c.includes('pearl');
            }
            if (selectedColorGroup === 'champagne') {
              return c.includes('champagne') || c.includes('taupe') || c.includes('espresso');
            }
            if (selectedColorGroup === 'sage') {
              return c.includes('sage') || c.includes('emerald');
            }
            return c.includes(selectedColorGroup);
          });
          if (!hasMatchingVariantColor) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
        if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
        if (sortBy === 'alpha-asc') return a.name.localeCompare(b.name);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    baseProducts,
    searchTerm,
    selectedCategory,
    selectedCollection,
    selectedColorGroup,
    priceCeiling,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCollection('all');
    setSelectedColorGroup('all');
    setPriceCeiling(3500);
    setSortBy('newest');
    setVisibleCount(12);
    trackEvent('filter_catalog', { action: 'reset_all' });
  };

  const pageMeta =
    mode === 'new-arrivals'
      ? {
          title: 'New Arrivals — Latest Women’s Jewellery & Accessories | VALENTINA',
          description:
            'Explore the newest arrivals at VALENTINA. Discover newly added pearl drops, crystal ear climbers, structured bags and velvet organisers.',
          canonicalPath: '/new-arrivals',
          h1: 'New Arrivals',
          subtitle:
            'Our newest additions across demi-fine jewellery, hair accessories, structured bags and vanity organisers.',
          breadcrumbName: 'New Arrivals',
        }
      : mode === 'bestsellers'
      ? {
          title: 'Bestsellers & Featured Edit — Women’s Accessories | VALENTINA',
          description:
            'Browse VALENTINA’s curated featured accessories edit. Includes classic gold hoops, pearl drop earrings, satin bows and travel jewellery organisers.',
          canonicalPath: '/bestsellers',
          h1: 'Bestsellers — Curated Demo Merchandising Edit',
          subtitle:
            'A curated showcase of signature VALENTINA pieces across every category. Note: This selection represents demonstration merchandising rather than live historical sales data.',
          breadcrumbName: 'Bestsellers',
        }
      : {
          title: 'Shop All Women’s Accessories — Jewellery, Hair & Bags | VALENTINA',
          description:
            'Browse all 32 women’s fashion accessories at VALENTINA. Filter by category, collection, finish and INR price across earrings, necklaces, hair clips and bags.',
          canonicalPath: '/shop',
          h1: 'Shop All Accessories',
          subtitle:
            'Explore our complete catalogue of 32 distinct accessories, each with selectable finishes, sizes and styles.',
          breadcrumbName: 'Shop All',
        };

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <SEOHead
        title={pageMeta.title}
        description={pageMeta.description}
        canonicalPath={pageMeta.canonicalPath}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: pageMeta.breadcrumbName, path: pageMeta.canonicalPath },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: pageMeta.breadcrumbName, path: pageMeta.canonicalPath },
        ]}
      />

      {/* Page Header */}
      <div className="py-8 border-b border-[#E8DCCB]">
        <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#24211F]">
          {pageMeta.h1}
        </h1>
        <p className="text-sm text-[#5C534C] mt-2 max-w-2xl leading-relaxed">
          {pageMeta.subtitle}
        </p>
      </div>

      {/* Filter & Sort Controls Bar */}
      <div className="my-8 p-5 bg-white border border-[#E8DCCB] space-y-4">
        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#E8DCCB]/70">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#24211F]">
            <SlidersHorizontal className="w-4 h-4 text-[#B89A64]" />
            <span>Filter & Sort Catalogue</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#5C534C] tabular-nums">
              Showing <strong>{displayedProducts.length}</strong> of{' '}
              <strong>{filteredProducts.length}</strong> products
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#8F723E] hover:text-[#24211F] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {/* 1. Search by Product Name */}
          <div className="lg:col-span-2">
            <label
              htmlFor="shop-search-input"
              className="block text-[11px] font-medium text-[#5C534C] mb-1"
            >
              Search by Product Name
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#6E655E] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                id="shop-search-input"
                type="search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  trackEvent('search', { search_term: e.target.value });
                }}
                placeholder="e.g. Pearl Drop, Claw Clip, Sling Bag..."
                className="w-full pl-9 pr-3 py-2 bg-[#FAF7F2] border border-[#E8DCCB] text-xs text-[#24211F] focus:outline-none focus:border-[#24211F]"
              />
            </div>
          </div>

          {/* 2. Category Filter */}
          <div>
            <label
              htmlFor="shop-category-select"
              className="block text-[11px] font-medium text-[#5C534C] mb-1"
            >
              Category
            </label>
            <select
              id="shop-category-select"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                trackEvent('filter_catalog', { category: e.target.value });
              }}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E8DCCB] text-xs text-[#24211F] focus:outline-none focus:border-[#24211F]"
            >
              <option value="all">All Categories</option>
              {allCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Collection Filter */}
          <div>
            <label
              htmlFor="shop-collection-select"
              className="block text-[11px] font-medium text-[#5C534C] mb-1"
            >
              Collection
            </label>
            <select
              id="shop-collection-select"
              value={selectedCollection}
              onChange={(e) => {
                setSelectedCollection(e.target.value);
                trackEvent('filter_catalog', { collection: e.target.value });
              }}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E8DCCB] text-xs text-[#24211F] focus:outline-none focus:border-[#24211F]"
            >
              <option value="all">All Collections</option>
              {COLLECTIONS.map((col) => (
                <option key={col.slug} value={col.slug}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Colour / Finish Filter */}
          <div>
            <label
              htmlFor="shop-color-select"
              className="block text-[11px] font-medium text-[#5C534C] mb-1"
            >
              Colour / Finish
            </label>
            <select
              id="shop-color-select"
              value={selectedColorGroup}
              onChange={(e) => {
                setSelectedColorGroup(e.target.value);
                trackEvent('filter_catalog', { color: e.target.value });
              }}
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E8DCCB] text-xs text-[#24211F] focus:outline-none focus:border-[#24211F]"
            >
              {colorKeywords.map((ck) => (
                <option key={ck.value} value={ck.value}>
                  {ck.label}
                </option>
              ))}
            </select>
          </div>

          {/* 5. Sort By */}
          <div>
            <label
              htmlFor="shop-sort-select"
              className="block text-[11px] font-medium text-[#5C534C] mb-1"
            >
              Sort By
            </label>
            <select
              id="shop-sort-select"
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value as 'newest' | 'price-asc' | 'price-desc' | 'alpha-asc'
                )
              }
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#E8DCCB] text-xs text-[#24211F] focus:outline-none focus:border-[#24211F]"
            >
              <option value="newest">Newest (Catalogue Date)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="alpha-asc">Alphabetical: A to Z</option>
            </select>
          </div>
        </div>

        {/* Price Range Slider Row */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#E8DCCB]/50">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <label
              htmlFor="price-range-slider"
              className="text-xs text-[#5C534C] whitespace-nowrap tabular-nums"
            >
              Max Base Price: <strong>₹{priceCeiling.toLocaleString('en-IN')}</strong>
            </label>
            <input
              id="price-range-slider"
              type="range"
              min={500}
              max={3500}
              step={100}
              value={priceCeiling}
              onChange={(e) => setPriceCeiling(Number(e.target.value))}
              className="w-full accent-[#24211F] cursor-pointer"
            />
          </div>
          <div className="text-[11px] text-[#6E655E]">
            Click any colour swatch on a product card to preview its variety image and INR price.
          </div>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#E8DCCB] p-12 text-center space-y-4">
          <h2 className="font-serif-display text-3xl text-[#24211F]">
            No Matching Accessories Found
          </h2>
          <p className="text-xs sm:text-sm text-[#5C534C] max-w-md mx-auto">
            We couldn’t find any products matching your current search or filter combination. Try expanding your price range or resetting the filters.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-6 py-3 bg-[#24211F] text-white text-xs font-medium hover:bg-[#3A3532] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Pagination */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 text-center space-y-3">
              <p className="text-xs text-[#6E655E] tabular-nums">
                Viewing {displayedProducts.length} of {filteredProducts.length} products
              </p>
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 12)}
                className="px-8 py-3.5 bg-white border border-[#24211F] text-[#24211F] text-xs font-semibold hover:bg-[#24211F] hover:text-white transition-colors"
              >
                Load More Products ({filteredProducts.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
