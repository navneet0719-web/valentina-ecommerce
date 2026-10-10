import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { ProductCard } from '../components/ProductCard';
import { Link } from '../context/RouterContext';
import { PRODUCTS } from '../data/products';
import { SITE_CONFIG } from '../config/site';

export const HomePage: React.FC = () => {
  // Select 6 diverse New Arrivals across Jewellery, Bags, Watches & Makeup
  const newArrivals = PRODUCTS.filter((p) => p.isNewArrival).slice(0, 6);

  // Select 4 Bestsellers
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  // Section 3: Shop by Category — 6 clean category cards
  const categoryCards = [
    {
      name: 'Jewellery',
      subtitle: 'Rings, bangles, jhumkas, necklaces, payal & bridal sets',
      slug: '/collections/jewellery',
      image: SITE_CONFIG.editorialImages.jewelleryCollection,
      alt: 'VALENTINA demi-fine and traditional Indian jewellery collection',
    },
    {
      name: 'Handbags & Purses',
      subtitle: 'Slings, crossbody bags, office totes, clutches & wallets',
      slug: '/collections/bags',
      image: 'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp',
      alt: 'Structured women’s handbags, sling bags and purses',
    },
    {
      name: 'Watches & Sunglasses',
      subtitle: 'Minimalist analog watches, cat-eye & oversized eyewear',
      slug: '/collections/watches-and-sunglasses',
      image: 'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp',
      alt: 'Gold-toned women’s analog wristwatches and fashion sunglasses',
    },
    {
      name: 'Makeup & Beauty',
      subtitle: 'Face, eye & lip makeup, brushes, nail care & skincare',
      slug: '/collections/makeup-and-beauty',
      image: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
      alt: 'Luxury eyeshadow palette, lipsticks and beauty essentials',
    },
    {
      name: 'Hair Accessories',
      subtitle: 'Claw clips, satin scrunchies, hairbands & bridal hair pins',
      slug: '/collections/hair-accessories',
      image: SITE_CONFIG.editorialImages.hairAccessoriesEdit,
      alt: 'Satin bow clips, cellulose acetate claw clips and velvet scrunchies',
    },
    {
      name: 'More Accessories',
      subtitle: 'Satin scarves, stoles, waist belts, brooches & organisers',
      slug: '/collections/more-accessories',
      image: SITE_CONFIG.editorialImages.organisersAndPouches,
      alt: 'Printed scarves, fashion belts, brooches and velvet jewellery organisers',
    },
  ];

  return (
    <div className="bg-[#FAF6F0]">
      <SEOHead
        title="VALENTINA — Elegance in Every Detail | Jewellery, Bags, Makeup & Accessories"
        description="Discover timeless accessories and beauty essentials for every occasion at VALENTINA. Shop over 500 unique jewellery designs, bangles, handbags, watches, sunglasses, makeup, and hair accessories."
        canonicalPath="/"
        ogImage={SITE_CONFIG.editorialImages.heroEditorial}
      />

      {/* SECTION 2: SINGLE HERO BANNER */}
      <section className="bg-[#D8C3AD]/35 border-b border-[#D8C3AD]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Editorial Copy Column */}
            <div className="lg:col-span-5 space-y-6">
              <p className="text-xs tracking-[0.22em] text-[#C5A572] font-medium uppercase">
                VALENTINA
              </p>
              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-[56px] font-semibold text-[#30251F] leading-[1.08]">
                Elegance in Every Detail.
              </h1>
              <p className="text-base sm:text-lg text-[#8B7765] leading-relaxed">
                Discover timeless accessories and beauty essentials for every occasion.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="px-8 py-4 bg-[#30251F] text-[#FAF6F0] text-xs sm:text-sm font-medium tracking-wider hover:bg-[#8B7765] transition-colors inline-flex items-center gap-2.5 whitespace-nowrap"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A572]" />
                </Link>
              </div>
            </div>

            {/* Single Hero Fashion Product Photograph */}
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] w-full bg-[#D8C3AD] border border-[#C5A572]/60 overflow-hidden">
                <img
                  src={SITE_CONFIG.editorialImages.heroEditorial}
                  alt="Elegant fashion and beauty presentation featuring VALENTINA pearl drop earrings, gold necklaces and champagne mini handbag"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SHOP BY CATEGORY (6 Clean Category Cards) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-xs text-[#C5A572] tracking-[0.2em] uppercase mb-1.5">
              CURATED DEPARTMENTS
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#30251F]">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/collections"
            className="text-xs font-semibold text-[#30251F] hover:text-[#C5A572] inline-flex items-center gap-1.5"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categoryCards.map((cat) => (
            <Link
              key={cat.name}
              to={cat.slug}
              className="group block bg-[#FAF6F0] border border-[#D8C3AD] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:border-[#C5A572]"
            >
              <div className="aspect-[4/3] w-full bg-[#D8C3AD]/30 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 flex items-center justify-between gap-4 bg-white">
                <div>
                  <h3 className="font-serif-display text-2xl font-semibold text-[#30251F] group-hover:text-[#C5A572] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#8B7765] mt-1">{cat.subtitle}</p>
                </div>
                <span className="w-9 h-9 border border-[#D8C3AD] flex items-center justify-center text-[#30251F] group-hover:bg-[#30251F] group-hover:text-[#FAF6F0] transition-colors shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: NEW ARRIVALS (Show 6 products + View All link) */}
      <section className="bg-[#D8C3AD]/25 border-y border-[#D8C3AD] py-16 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs text-[#C5A572] tracking-[0.2em] uppercase mb-1.5">
                JUST ADDED
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#30251F]">
                New Arrivals
              </h2>
            </div>
            <Link
              to="/new-arrivals"
              className="text-xs font-semibold text-[#30251F] hover:text-[#C5A572] inline-flex items-center gap-1.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: FEATURED COLLECTION (One elegant image, short description, one Shop Collection button) */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="bg-[#D8C3AD]/40 border border-[#D8C3AD] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <p className="text-xs text-[#C5A572] tracking-[0.2em] uppercase font-medium">
              FEATURED COLLECTION
            </p>
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#30251F] leading-tight">
              The Heritage & Modern Trousseau Edit
            </h2>
            <p className="text-sm sm:text-base text-[#8B7765] leading-relaxed">
              Thoughtfully curated across Kundan and Polki bangles, luminous pearl jewellery, structured evening clutches, and velvet-matte lip colour—designed to move effortlessly from intimate celebrations to timeless everyday elegance.
            </p>
            <div className="pt-2">
              <Link
                to="/collections/festive-wear"
                className="px-8 py-3.5 bg-[#30251F] text-[#FAF6F0] text-xs sm:text-sm font-medium hover:bg-[#8B7765] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 text-[#C5A572]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] w-full bg-[#FAF6F0] border border-[#C5A572]/60 overflow-hidden">
              <img
                src={SITE_CONFIG.editorialImages.jewelleryCollection}
                alt="Featured VALENTINA collection of sculpted gold jewellery, pearl drops and stackable rings"
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: BESTSELLERS (Show only 4 products + View All Bestsellers link) */}
      <section className="bg-[#FAF6F0] border-t border-[#D8C3AD] py-16 sm:py-24">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-xs text-[#C5A572] tracking-[0.2em] uppercase mb-1.5">
                MOST LOVED
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#30251F]">
                Bestsellers
              </h2>
            </div>
            <Link
              to="/bestsellers"
              className="text-xs font-semibold text-[#30251F] hover:text-[#C5A572] inline-flex items-center gap-1.5"
            >
              <span>View All Bestsellers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
