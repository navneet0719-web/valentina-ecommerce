import React, { useState, useMemo } from 'react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { Link } from '../context/RouterContext';
import { getCollectionBySlug, COLLECTIONS } from '../data/collections';
import { getProductsByCollection } from '../data/products';
import { SITE_CONFIG } from '../config/site';
import { NotFoundPage } from './NotFoundPage';

interface CollectionDetailPageProps {
  slug: string;
}

export const CollectionDetailPage: React.FC<CollectionDetailPageProps> = ({
  slug,
}) => {
  const collection = getCollectionBySlug(slug);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'alpha'>('newest');

  const rawProducts = useMemo(
    () => (collection ? getProductsByCollection(collection.slug) : []),
    [collection]
  );

  const sortedProducts = useMemo(() => {
    return [...rawProducts].sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'alpha') return a.name.localeCompare(b.name);
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [rawProducts, sortBy]);

  if (!collection) {
    return <NotFoundPage />;
  }

  const siblingCollections = COLLECTIONS.filter(
    (c) => c.group === collection.group && c.slug !== collection.slug
  );

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.h1,
    description: collection.metaDescription,
    url: `${SITE_CONFIG.productionDomain}/collections/${collection.slug}`,
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <SEOHead
        title={collection.seoTitle}
        description={collection.metaDescription}
        canonicalPath={`/collections/${collection.slug}`}
        ogImage={collection.heroImage}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Collections', path: '/collections' },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ]}
        jsonLd={collectionJsonLd}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Collections', path: '/collections' },
          { name: collection.name, path: `/collections/${collection.slug}` },
        ]}
      />

      {/* Collection Hero Header */}
      <div className="bg-white border border-[#E8DCCB] p-6 sm:p-10 my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <p className="text-xs text-[#8F723E] tracking-widest font-medium">
            {collection.group.toUpperCase()} COLLECTION
          </p>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#24211F]">
            {collection.h1}
          </h1>
          <p className="text-sm text-[#5C534C] leading-relaxed">
            {collection.introParagraph}
          </p>
          <div className="pt-2 border-t border-[#E8DCCB]/70 text-xs text-[#6E655E]">
            <strong className="text-[#24211F]">Styling Note:</strong> {collection.stylingNote}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="aspect-[4/3] bg-[#FAF7F2] border border-[#E8DCCB] overflow-hidden">
            <img
              src={collection.heroImage}
              alt={collection.heroImageAlt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Sibling Collection Quick Links & Sort Controls */}
      <div className="my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8DCCB]">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#6E655E] mr-1">Related in {collection.group}:</span>
          {siblingCollections.map((sib) => (
            <Link
              key={sib.slug}
              to={`/collections/${sib.slug}`}
              className="px-3 py-1.5 bg-white border border-[#E8DCCB] text-[#24211F] hover:border-[#24211F] transition-colors whitespace-nowrap"
            >
              {sib.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-[#6E655E] tabular-nums">
            {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'}
          </span>
          <label htmlFor="collection-sort" className="sr-only">
            Sort products
          </label>
          <select
            id="collection-sort"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as 'newest' | 'price-asc' | 'price-desc' | 'alpha')
            }
            className="px-3 py-2 bg-white border border-[#E8DCCB] text-xs text-[#24211F] focus:outline-none focus:border-[#24211F]"
          >
            <option value="newest">Sort: Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="alpha">Alphabetical: A–Z</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
