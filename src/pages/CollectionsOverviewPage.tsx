import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';
import { COLLECTIONS } from '../data/collections';
import { getProductsByCollection } from '../data/products';

export const CollectionsOverviewPage: React.FC = () => {
  const groups: Array<'Jewellery' | 'Hair Accessories' | 'Bags & Essentials'> = [
    'Jewellery',
    'Hair Accessories',
    'Bags & Essentials',
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      <SEOHead
        title="All Collections — Jewellery, Hair Accessories & Bags | VALENTINA"
        description="Explore all 16 curated women’s accessory collections at VALENTINA, including earrings, necklaces, rings, bracelets, hair clips, scrunchies, bags and organisers."
        canonicalPath="/collections"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'All Collections', path: '/collections' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'All Collections', path: '/collections' },
        ]}
      />

      <div className="py-8 border-b border-[#E8DCCB]">
        <p className="text-xs text-[#8F723E] tracking-widest mb-1">CURATED DIRECTORY</p>
        <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#24211F]">
          Explore All Collections
        </h1>
        <p className="text-sm text-[#5C534C] mt-2 max-w-2xl leading-relaxed">
          Browse our collections organised by department. Each collection features pieces with selectable finishes, proportions and styles.
        </p>
      </div>

      <div className="space-y-16 mt-12">
        {groups.map((groupName) => {
          const groupCollections = COLLECTIONS.filter((c) => c.group === groupName);
          return (
            <section key={groupName}>
              <div className="pb-4 mb-8 border-b border-[#E8DCCB] flex items-baseline justify-between">
                <h2 className="font-serif-display text-3xl font-semibold text-[#24211F]">
                  {groupName}
                </h2>
                <span className="text-xs text-[#6E655E]">
                  {groupCollections.length} Collections
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {groupCollections.map((col) => {
                  const count = getProductsByCollection(col.slug).length;
                  return (
                    <Link
                      key={col.slug}
                      to={`/collections/${col.slug}`}
                      className="group bg-white border border-[#E8DCCB] flex flex-col justify-between overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <div>
                        <div className="aspect-[4/3] w-full bg-[#FAF7F2] overflow-hidden">
                          <img
                            src={col.heroImage}
                            alt={col.heroImageAlt}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-xs text-[#6E655E] mb-1.5">
                            <span>{col.group}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{count} Products</span>
                          </div>
                          <h3 className="font-serif-display text-2xl font-semibold text-[#24211F] group-hover:text-[#8F723E] transition-colors">
                            {col.name}
                          </h3>
                          <p className="text-xs text-[#5C534C] mt-2 leading-relaxed">
                            {col.shortDescription}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 pb-5 pt-3 border-t border-[#E8DCCB]/60 flex items-center justify-between text-xs font-semibold text-[#24211F] group-hover:text-[#8F723E]">
                        <span>Explore {col.name}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
