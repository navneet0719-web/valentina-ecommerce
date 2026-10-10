import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../context/RouterContext';
import { SITE_CONFIG } from '../config/site';
import {
  getAnalyticsEventLog,
  getMarketingConsent,
  setMarketingConsent,
  subscribeAnalytics,
} from '../utils/analytics';

export const Footer: React.FC = () => {
  const { pathname } = useRouter();
  const [email, setEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const [seoConsoleOpen, setSeoConsoleOpen] = useState(false);
  const [events, setEvents] = useState(() => getAnalyticsEventLog());
  const [consent, setConsent] = useState(() => getMarketingConsent());

  useEffect(() => {
    return subscribeAnalytics(() => {
      setEvents(getAnalyticsEventLog());
      setConsent(getMarketingConsent());
    });
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');
    setNewsletterSuccess(false);

    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setNewsletterError('Please enter a valid email address (for example, name@example.com).');
      return;
    }

    setNewsletterSuccess(true);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#24211F] text-[#FAF7F2] border-t border-[#B89A64]/30 mt-20">
      {/* Main Footer Grid */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#FAF7F2]/15">
          {/* Column 1: Brand Identity & Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="font-serif-display text-3xl font-semibold tracking-[0.18em] text-white block"
            >
              VALENTINA
            </Link>
            <p className="font-serif-display italic text-lg text-[#E8DCCB]">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-xs text-[#E8DCCB]/80 leading-relaxed max-w-sm">
              Thoughtfully styled women’s accessories designed to complement everyday moments, festive occasions and personal style across India.
            </p>

            {/* Footer Newsletter Form */}
            <div className="pt-3">
              <p className="text-xs font-semibold text-white mb-2">
                A Note from Valentina
              </p>
              <form onSubmit={handleNewsletterSubmit} noValidate className="space-y-2 max-w-sm">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    aria-label="Email address for newsletter"
                    className="flex-1 px-3.5 py-2.5 bg-[#FAF7F2]/10 border border-[#E8DCCB]/30 text-xs text-white placeholder:text-[#E8DCCB]/50 focus:outline-none focus:border-[#B89A64]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#B89A64] text-[#24211F] text-xs font-semibold hover:bg-[#D0B47E] transition-colors whitespace-nowrap shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
                {newsletterError && (
                  <p className="text-xs text-[#F2B8B5]" role="alert">
                    {newsletterError}
                  </p>
                )}
                {newsletterSuccess && (
                  <p className="text-xs text-[#E8DCCB]" role="status">
                    Demo confirmation: Your email format was validated. Because this is a demonstration store with no live mailing service connected, your address has not been added to an external mailing list.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Column 2: Shop & Jewellery Collections (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="font-serif-display text-lg font-semibold text-[#E8DCCB]">
              Jewellery
            </h3>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li><Link to="/shop" className="hover:text-white transition-colors">Shop All Products</Link></li>
              <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link to="/bestsellers" className="hover:text-white transition-colors">Bestsellers (Demo Edit)</Link></li>
              <li><Link to="/collections/jewellery" className="hover:text-white transition-colors">All Jewellery</Link></li>
              <li><Link to="/collections/earrings" className="hover:text-white transition-colors">Earrings</Link></li>
              <li><Link to="/collections/necklaces" className="hover:text-white transition-colors">Necklaces</Link></li>
              <li><Link to="/collections/rings" className="hover:text-white transition-colors">Rings</Link></li>
              <li><Link to="/collections/bracelets" className="hover:text-white transition-colors">Bracelets</Link></li>
            </ul>
          </div>

          {/* Column 3: Hair, Bags & Organisers (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif-display text-lg font-semibold text-[#E8DCCB]">
              Hair, Bags & Organisers
            </h3>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li><Link to="/collections" className="hover:text-white transition-colors">All Collections</Link></li>
              <li><Link to="/collections/hair-accessories" className="hover:text-white transition-colors">Hair Accessories</Link></li>
              <li><Link to="/collections/hair-clips" className="hover:text-white transition-colors">Hair Clips & Bows</Link></li>
              <li><Link to="/collections/scrunchies" className="hover:text-white transition-colors">Velvet & Satin Scrunchies</Link></li>
              <li><Link to="/collections/hairbands" className="hover:text-white transition-colors">Padded Hairbands</Link></li>
              <li><Link to="/collections/bags" className="hover:text-white transition-colors">Bags & Wallets</Link></li>
              <li><Link to="/collections/shoulder-bags" className="hover:text-white transition-colors">Mini Shoulder Bags</Link></li>
              <li><Link to="/collections/sling-bags" className="hover:text-white transition-colors">Everyday Sling Bags</Link></li>
              <li><Link to="/collections/wallets" className="hover:text-white transition-colors">Card Wallets</Link></li>
              <li><Link to="/collections/makeup-pouches" className="hover:text-white transition-colors">Makeup Pouches</Link></li>
              <li><Link to="/collections/jewellery-organisers" className="hover:text-white transition-colors">Jewellery Organisers</Link></li>
            </ul>
          </div>

          {/* Column 4: Brand, Journal & Policies (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="font-serif-display text-lg font-semibold text-[#E8DCCB]">
              Brand & Information
            </h3>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us — Our Story</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">The Valentina Journal (Blog)</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Saved Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-white transition-colors">Shopping Bag</Link></li>
              <li><Link to="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy (Draft Guide)</Link></li>
              <li><Link to="/returns-refunds" className="hover:text-white transition-colors">Returns & Refunds (Draft Guide)</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/disclaimer" className="hover:text-white transition-colors">Demonstration Store Disclaimer</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & SEO / Marketing Verification Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#E8DCCB]/70">
          <div className="space-y-1">
            <p>
              © {currentYear} {SITE_CONFIG.brandName}. All rights reserved. Demonstration e-commerce website — no real orders or payments are processed.
            </p>
            <div className="flex flex-wrap items-center gap-3 text-[11px]">
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                XML Sitemap (/sitemap.xml)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/robots.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Robots.txt (/robots.txt)
              </a>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSeoConsoleOpen((prev) => !prev)}
            className="px-3.5 py-2 border border-[#E8DCCB]/30 text-[#E8DCCB] hover:border-[#B89A64] hover:text-white text-xs transition-colors whitespace-nowrap"
          >
            {seoConsoleOpen ? 'Hide SEO & Analytics Inspector' : 'SEO & Analytics Readiness'}
          </button>
        </div>

        {/* Interactive SEO & Marketing Readiness Drawer */}
        {seoConsoleOpen && (
          <div className="mt-6 p-6 bg-[#1A1816] border border-[#B89A64]/40 text-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8DCCB]/15">
              <div>
                <h4 className="font-serif-display text-lg text-white font-semibold">
                  Technical SEO, Google Search Console & Analytics Readiness
                </h4>
                <p className="text-[#E8DCCB]/75">
                  Live inspection of page metadata, canonical URL, and marketing event hooks for route: <code className="font-mono-code text-[#B89A64]">{pathname}</code>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-[#E8DCCB]">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="accent-[#B89A64]"
                  />
                  <span>Analytics Consent ({consent ? 'Granted' : 'Declined'})</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="font-semibold text-[#E8DCCB]">Analytics Placeholders & Search Console Setup</p>
                <ul className="space-y-1 text-[#E8DCCB]/80">
                  <li>
                    • <strong>GA4 Measurement ID:</strong>{' '}
                    <code className="font-mono-code">
                      {SITE_CONFIG.analytics.ga4MeasurementId || 'Not configured (Set VITE_GA4_ID)'}
                    </code>
                  </li>
                  <li>
                    • <strong>GTM Container ID:</strong>{' '}
                    <code className="font-mono-code">
                      {SITE_CONFIG.analytics.gtmContainerId || 'Not configured (Set VITE_GTM_ID)'}
                    </code>
                  </li>
                  <li>
                    • <strong>Meta Pixel ID:</strong>{' '}
                    <code className="font-mono-code">
                      {SITE_CONFIG.analytics.metaPixelId || 'Not configured (Set VITE_META_PIXEL_ID)'}
                    </code>
                  </li>
                  <li>
                    • <strong>Google Search Console Verification:</strong> After deploying to your custom domain, update <code className="font-mono-code">SITE_CONFIG.productionDomain</code>, verify domain ownership via DNS TXT record in Google Search Console, and submit <code className="font-mono-code">/sitemap.xml</code> under Indexing → Sitemaps.
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-[#E8DCCB] mb-2">
                  Recent E-Commerce Events Fired ({events.length})
                </p>
                <div className="max-h-36 overflow-y-auto bg-[#24211F] p-3 border border-[#E8DCCB]/20 space-y-1.5 font-mono-code text-[11px]">
                  {events.length === 0 ? (
                    <p className="text-[#E8DCCB]/50">No events logged yet.</p>
                  ) : (
                    events.slice(0, 8).map((ev) => (
                      <div key={ev.id} className="text-[#E8DCCB]/90">
                        <span className="text-[#B89A64]">[{ev.event}]</span>{' '}
                        <span>{JSON.stringify(ev.payload)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
};
