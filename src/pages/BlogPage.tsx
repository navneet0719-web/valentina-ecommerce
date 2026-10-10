import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';
import { Link } from '../context/RouterContext';
import { BLOG_ARTICLES, getBlogBySlug } from '../data/blog';
import { getProductBySlug } from '../data/products';
import { SITE_CONFIG } from '../config/site';
import { NotFoundPage } from './NotFoundPage';

export const BlogOverviewPage: React.FC = () => {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title="The Valentina Journal — Accessory Styling Guides & Ideas | VALENTINA"
        description="Discover styling inspiration, accessory guides and thoughtful ideas for bringing more personality to your everyday looks on The Valentina Journal."
        canonicalPath="/blog"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'The Valentina Journal', path: '/blog' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'The Valentina Journal', path: '/blog' },
        ]}
      />

      <div className="py-8 border-b border-[#D8C3AD]">
        <p className="text-xs text-[#C5A572] tracking-widest mb-1">EDITORIAL & STYLING</p>
        <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#30251F]">
          The Valentina Journal
        </h1>
        <p className="text-sm text-[#8B7765] mt-2 max-w-2xl leading-relaxed">
          Discover styling inspiration, accessory guides and thoughtful ideas for bringing more personality to your everyday looks.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-[#D8C3AD] flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div>
              <Link
                to={`/blog/${article.slug}`}
                className="block aspect-[4/3] bg-[#FAF6F0] overflow-hidden border-b border-[#D8C3AD]"
              >
                <img
                  src={article.featuredImage}
                  alt={article.featuredImageAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </Link>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#8B7765]">
                  <span>{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <Link
                  to={`/blog/${article.slug}`}
                  className="font-serif-display text-2xl font-semibold text-[#30251F] hover:text-[#C5A572] block leading-snug"
                >
                  {article.title}
                </Link>

                <p className="text-xs text-[#8B7765] leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-[#D8C3AD]/70">
              <Link
                to={`/blog/${article.slug}`}
                className="text-xs font-semibold text-[#30251F] hover:text-[#C5A572] inline-flex items-center gap-1.5"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

interface BlogArticlePageProps {
  slug: string;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({ slug }) => {
  const article = getBlogBySlug(slug);

  if (!article) {
    return <NotFoundPage />;
  }

  const relatedProducts = article.relatedProductSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const otherArticles = BLOG_ARTICLES.filter((b) => b.slug !== article.slug).slice(0, 3);

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.brandName,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.productionDomain}/blog/${article.slug}`,
    },
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title={article.seoTitle}
        description={article.metaDescription}
        canonicalPath={`/blog/${article.slug}`}
        ogType="article"
        ogImage={article.featuredImage}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'The Valentina Journal', path: '/blog' },
          { name: article.title, path: `/blog/${article.slug}` },
        ]}
        jsonLd={blogJsonLd}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'The Valentina Journal', path: '/blog' },
          { name: article.title, path: `/blog/${article.slug}` },
        ]}
      />

      {/* Article Container */}
      <article className="mt-4 bg-white border border-[#D8C3AD] p-6 sm:p-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 text-xs text-[#C5A572] mb-3">
          <span>{article.category}</span>
          <span aria-hidden="true">·</span>
          <span>Published {article.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime}</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#30251F] leading-tight">
          {article.title}
        </h1>

        <p className="text-base text-[#8B7765] mt-3 leading-relaxed">
          {article.subtitle}
        </p>

        <div className="my-8 aspect-[16/9] bg-[#FAF6F0] border border-[#D8C3AD] overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.featuredImageAlt}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Introduction */}
        <p className="text-sm sm:text-base text-[#30251F] leading-relaxed mb-8 font-medium">
          {article.introduction}
        </p>

        {/* Sections */}
        <div className="space-y-8">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3 pt-6 border-t border-[#D8C3AD]/70">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#30251F]">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((pText, pIdx) => (
                <p key={pIdx} className="text-sm text-[#8B7765] leading-relaxed">
                  {pText}
                </p>
              ))}
              {sec.internalLinks && sec.internalLinks.length > 0 && (
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  {sec.internalLinks.map((lnk) => (
                    <Link
                      key={lnk.to}
                      to={lnk.to}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C5A572] hover:text-[#30251F] underline underline-offset-4"
                    >
                      <span>{lnk.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-[#D8C3AD] flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#30251F] hover:text-[#C5A572]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to The Valentina Journal</span>
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#30251F] hover:text-[#C5A572]"
          >
            <span>Explore Full Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </article>

      {/* Featured Products Mentioned in This Guide */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 pt-12 border-t border-[#D8C3AD]">
          <div className="mb-8">
            <p className="text-xs text-[#C5A572] tracking-widest mb-1">SHOP THE STORY</p>
            <h2 className="font-serif-display text-3xl font-semibold text-[#30251F]">
              Pieces Featured in This Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* More Journal Guides */}
      <section className="mt-16 pt-12 border-t border-[#D8C3AD]">
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-serif-display text-3xl font-semibold text-[#30251F]">
            More from The Valentina Journal
          </h2>
          <Link to="/blog" className="text-xs font-semibold text-[#30251F] underline">
            View All Articles
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherArticles.map((other) => (
            <Link
              key={other.id}
              to={`/blog/${other.slug}`}
              className="p-6 bg-white border border-[#D8C3AD] hover:border-[#30251F] transition-colors space-y-2"
            >
              <p className="text-xs text-[#8B7765]">
                {other.category} · {other.readTime}
              </p>
              <h3 className="font-serif-display text-xl font-semibold text-[#30251F]">
                {other.title}
              </h3>
              <p className="text-xs text-[#8B7765] line-clamp-2">{other.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
