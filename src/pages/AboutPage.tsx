import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';
import { SITE_CONFIG } from '../config/site';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title="About Us — The Story Behind Valentina | VALENTINA"
        description="Learn the philosophy and vision behind VALENTINA. Explore how we curate jewellery, hair accessories, bags and organisers around personal style."
        canonicalPath="/about"
        ogImage={SITE_CONFIG.editorialImages.heroEditorial}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'About Us', path: '/about' },
        ]}
      />

      {/* Hero Editorial Split */}
      <div className="mt-4 bg-white border border-[#E8DCCB] p-6 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <p className="text-xs text-[#8F723E] tracking-[0.2em] font-medium">
            ABOUT VALENTINA · BRAND CONCEPT
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#24211F]">
            The Story Behind Valentina
          </h1>
          <p className="text-sm sm:text-base text-[#5C534C] leading-relaxed">
            Style is often found in the details — the necklace that becomes part of your everyday look, the bag that goes everywhere with you, or the accessory that makes a familiar outfit feel new. Valentina is a fashion accessories concept created around that simple idea: the right details can make personal style feel even more special.
          </p>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-[16/9] bg-[#FAF7F2] border border-[#E8DCCB] overflow-hidden">
            <img
              src={SITE_CONFIG.editorialImages.heroEditorial}
              alt="Valentina editorial portrait celebrating personal style and accessories"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Core Editorial Chapters */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white border border-[#E8DCCB] p-8 sm:p-10 space-y-4">
          <p className="text-xs text-[#8F723E] tracking-widest">01. PHILOSOPHY</p>
          <h2 className="font-serif-display text-3xl font-semibold text-[#24211F]">
            Our Philosophy
          </h2>
          <p className="text-sm text-[#5C534C] leading-relaxed">
            At Valentina, accessories are more than finishing touches. They are small expressions of individuality. Some days call for understated elegance; other days invite a little colour, sparkle or statement. Our collection is designed to help you explore those different sides of your style.
          </p>
        </section>

        <section className="bg-white border border-[#E8DCCB] p-8 sm:p-10 space-y-4">
          <p className="text-xs text-[#8F723E] tracking-widest">02. CURATION</p>
          <h2 className="font-serif-display text-3xl font-semibold text-[#24211F]">
            Our Collection
          </h2>
          <p className="text-sm text-[#5C534C] leading-relaxed">
            From delicate jewellery and statement earrings to versatile bags, playful hair accessories and everyday essentials, Valentina brings together a variety of pieces for different moods, outfits and occasions. The aim is to make exploring and combining accessories feel simple, inspiring and personal.
          </p>
        </section>

        <section className="bg-white border border-[#E8DCCB] p-8 sm:p-10 space-y-4">
          <p className="text-xs text-[#8F723E] tracking-widest">03. STYLING</p>
          <h2 className="font-serif-display text-3xl font-semibold text-[#24211F]">
            Our Approach to Style
          </h2>
          <p className="text-sm text-[#5C534C] leading-relaxed">
            We believe good style does not have to be complicated. A carefully chosen accessory can bring balance to an outfit, add character to a classic look or make a thoughtful gift. We focus on presenting pieces clearly so shoppers can explore designs, compare options and find details that suit their preferences.
          </p>
        </section>

        <section className="bg-white border border-[#E8DCCB] p-8 sm:p-10 space-y-4">
          <p className="text-xs text-[#8F723E] tracking-widest">04. EXPERIENCE</p>
          <h2 className="font-serif-display text-3xl font-semibold text-[#24211F]">
            Our Customer Promise
          </h2>
          <p className="text-sm text-[#5C534C] leading-relaxed">
            Our goal for the Valentina shopping experience is to make product discovery clear, enjoyable and convenient. We want every product page to explain the available options, provide useful details and make it easy to understand what you are selecting.
          </p>
        </section>
      </div>

      {/* Vision & Closing Statement */}
      <div className="mt-12 bg-[#24211F] text-[#FAF7F2] p-8 sm:p-14 text-center space-y-6">
        <p className="text-xs text-[#B89A64] tracking-[0.2em]">05. LOOKING AHEAD</p>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold text-white">
          The Valentina Vision
        </h2>
        <p className="text-sm sm:text-base text-[#E8DCCB] max-w-2xl mx-auto leading-relaxed">
          We envision Valentina as a destination for discovering accessories that complement personal style — from everyday favourites to pieces chosen for meaningful moments.
        </p>

        <blockquote className="pt-4 font-serif-display italic text-2xl sm:text-3xl text-white">
          “Your style is personal. Let the details tell your story.”
        </blockquote>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/collections"
            className="px-7 py-3.5 bg-[#B89A64] text-[#24211F] text-xs sm:text-sm font-semibold hover:bg-[#D0B47E] transition-colors inline-flex items-center gap-2 whitespace-nowrap"
          >
            <span>Explore the Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/contact"
            className="px-7 py-3.5 border border-[#E8DCCB] text-white text-xs sm:text-sm font-medium hover:bg-white/10 transition-colors whitespace-nowrap"
          >
            Contact Us
          </Link>
        </div>

        <p className="text-[11px] text-[#E8DCCB]/60 pt-4 max-w-xl mx-auto">
          Transparency Note: This page presents draft brand-story content for the VALENTINA demonstration e-commerce project.
        </p>
      </div>
    </div>
  );
};
