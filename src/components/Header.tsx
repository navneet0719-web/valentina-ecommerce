import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { Link, useRouter } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';

export const Header: React.FC = () => {
  const { pathname } = useRouter();
  const { cartCount, wishlist, setIsCartDrawerOpen, recentlyViewedSlugs } = useStore();

  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isNavActive = (target: string) => {
    if (target === '/') return pathname === '/';
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-sm border-b border-[#D8C3AD]">
      {/* Slim Champagne-Gold & Deep Espresso Announcement Bar */}
      <div className="bg-[#30251F] text-[#FAF6F0] text-center px-4 py-2 text-xs tracking-wide">
        <span>
          VALENTINA — Elegance in Every Detail · Explore {PRODUCTS.length}+ Jewellery, Handbags, Watches, Makeup & Beauty Essentials
        </span>
      </div>

      {/* Main Header Row */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Trigger + VALENTINA Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2 -ml-2 text-[#30251F] hover:text-[#C5A572] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link
            to="/"
            className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-[0.18em] text-[#30251F] whitespace-nowrap shrink-0"
          >
            VALENTINA
          </Link>
        </div>

        {/* Center: Simple Navigation (Home, Shop, Jewellery, Bags, Makeup & Beauty, Accessories, About Us) */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-[#8B7765]"
        >
          <Link
            to="/"
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isNavActive('/')
                ? 'text-[#30251F] border-[#C5A572]'
                : 'border-transparent hover:text-[#30251F]'
            }`}
          >
            Home
          </Link>

          <Link
            to="/shop"
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isNavActive('/shop')
                ? 'text-[#30251F] border-[#C5A572]'
                : 'border-transparent hover:text-[#30251F]'
            }`}
          >
            Shop
          </Link>

          <Link
            to="/collections/jewellery"
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isNavActive('/collections/jewellery')
                ? 'text-[#30251F] border-[#C5A572]'
                : 'border-transparent hover:text-[#30251F]'
            }`}
          >
            Jewellery
          </Link>

          <Link
            to="/collections/bags"
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isNavActive('/collections/bags')
                ? 'text-[#30251F] border-[#C5A572]'
                : 'border-transparent hover:text-[#30251F]'
            }`}
          >
            Bags
          </Link>

          <Link
            to="/collections/makeup-and-beauty"
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isNavActive('/collections/makeup-and-beauty')
                ? 'text-[#30251F] border-[#C5A572]'
                : 'border-transparent hover:text-[#30251F]'
            }`}
          >
            Makeup & Beauty
          </Link>

          {/* Accessories Mega-Menu Trigger */}
          <div
            ref={megaMenuRef}
            className="relative"
            onMouseEnter={() => setMegaMenuOpen(true)}
          >
            <div className="flex items-center gap-1">
              <Link
                to="/collections/more-accessories"
                className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isNavActive('/collections/more-accessories') ||
                  isNavActive('/collections/watches-and-sunglasses') ||
                  isNavActive('/collections/hair-accessories')
                    ? 'text-[#30251F] border-[#C5A572]'
                    : 'border-transparent hover:text-[#30251F]'
                }`}
              >
                Accessories
              </Link>
              <button
                type="button"
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                aria-label="Toggle Accessories & Departments Menu"
                aria-expanded={megaMenuOpen}
                className="p-1 text-[#8B7765] hover:text-[#30251F]"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-150 ${
                    megaMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Desktop Mega-Menu Panel */}
            {megaMenuOpen && (
              <div
                onMouseLeave={() => setMegaMenuOpen(false)}
                className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[860px] z-50"
              >
                <div className="bg-[#FAF6F0] border border-[#D8C3AD] shadow-xl p-8 grid grid-cols-4 gap-6">
                  {/* Column 1: Jewellery Varieties */}
                  <div>
                    <Link
                      to="/collections/jewellery"
                      className="font-serif-display text-lg font-semibold text-[#30251F] hover:text-[#C5A572] block pb-2 mb-3 border-b border-[#D8C3AD]"
                    >
                      Jewellery
                    </Link>
                    <ul className="space-y-1.5 text-xs text-[#8B7765]">
                      <li>
                        <Link to="/collections/rings" className="hover:text-[#30251F] block py-0.5">
                          Rings — Solitaire, Kundan & Oxidised
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/bangles" className="hover:text-[#30251F] block py-0.5">
                          Bangles — Sizes 2.2 to 2.10 & Chooda
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/bracelets" className="hover:text-[#30251F] block py-0.5">
                          Bracelets & Traditional Kada
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/earrings" className="hover:text-[#30251F] block py-0.5">
                          Earrings — Jhumkas, Chandbalis & Hoops
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/necklaces" className="hover:text-[#30251F] block py-0.5">
                          Necklaces, Lockets & Mangalsutras
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/payal-and-anklets" className="hover:text-[#30251F] block py-0.5">
                          Payal / Anklets
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/maang-tikka-and-head-jewellery" className="hover:text-[#30251F] block py-0.5">
                          Maang Tikka, Matha Patti & Passa
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/other-jewellery" className="hover:text-[#30251F] block py-0.5">
                          Nose Pins, Nath, Kamarbandh & Bridal
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2: Watches, Sunglasses & Bags */}
                  <div>
                    <Link
                      to="/collections/watches-and-sunglasses"
                      className="font-serif-display text-lg font-semibold text-[#30251F] hover:text-[#C5A572] block pb-2 mb-3 border-b border-[#D8C3AD]"
                    >
                      Watches, Eyewear & Bags
                    </Link>
                    <ul className="space-y-1.5 text-xs text-[#8B7765]">
                      <li>
                        <Link to="/collections/watches" className="hover:text-[#30251F] block py-0.5">
                          Women’s Analog & Bracelet Watches
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/sunglasses-and-eyewear" className="hover:text-[#30251F] block py-0.5">
                          Sunglasses — Cat-Eye, Oversized & Retro
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/bags" className="hover:text-[#30251F] block py-0.5">
                          All Handbags & Purses
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/sling-bags" className="hover:text-[#30251F] block py-0.5">
                          Sling & Crossbody Bags
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/shoulder-bags" className="hover:text-[#30251F] block py-0.5">
                          Totes, Satchels, Hobo & Bucket Bags
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/wallets" className="hover:text-[#30251F] block py-0.5">
                          Wallets, Clutches & Bridal Potlis
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Makeup & Beauty */}
                  <div>
                    <Link
                      to="/collections/makeup-and-beauty"
                      className="font-serif-display text-lg font-semibold text-[#30251F] hover:text-[#C5A572] block pb-2 mb-3 border-b border-[#D8C3AD]"
                    >
                      Makeup & Beauty
                    </Link>
                    <ul className="space-y-1.5 text-xs text-[#8B7765]">
                      <li>
                        <Link to="/collections/face-makeup" className="hover:text-[#30251F] block py-0.5">
                          Face — Foundation, Compact & Blush
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/eye-makeup" className="hover:text-[#30251F] block py-0.5">
                          Eyes — Kajal, Mascara & Palettes
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/lip-makeup" className="hover:text-[#30251F] block py-0.5">
                          Lips — Matte, Satin, Gloss & Lip Oils
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/makeup-tools-and-organisers" className="hover:text-[#30251F] block py-0.5">
                          Brushes, Sponges, Mirrors & Vanity
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/nail-products" className="hover:text-[#30251F] block py-0.5">
                          Nail Polish, Press-Ons & Manicure
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/skincare-and-beauty" className="hover:text-[#30251F] block py-0.5">
                          Skincare — Serums, SPF & Moisturisers
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/makeup-kits-and-gift-sets" className="hover:text-[#30251F] block py-0.5">
                          Makeup Kits & Jewellery Gift Boxes
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Column 4: Hair, Scarves & Occasion Edits */}
                  <div>
                    <Link
                      to="/collections/more-accessories"
                      className="font-serif-display text-lg font-semibold text-[#30251F] hover:text-[#C5A572] block pb-2 mb-3 border-b border-[#D8C3AD]"
                    >
                      Hair, Scarves & Edits
                    </Link>
                    <ul className="space-y-1.5 text-xs text-[#8B7765]">
                      <li>
                        <Link to="/collections/hair-accessories" className="hover:text-[#30251F] block py-0.5">
                          Hair Clips, Claws, Scrunchies & Bridal Hair
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/more-accessories" className="hover:text-[#30251F] block py-0.5">
                          Scarves, Stoles, Belts, Brooches & Charms
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/jewellery-organisers" className="hover:text-[#30251F] block py-0.5">
                          Velvet Jewellery Organisers & Pouches
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/daily-wear" className="hover:text-[#30251F] block py-0.5">
                          Daily, College & Office Wear Edits
                        </Link>
                      </li>
                      <li>
                        <Link to="/collections/wedding-and-bridal-wear" className="hover:text-[#30251F] block py-0.5">
                          Festive, Party & Bridal Collections
                        </Link>
                      </li>
                      <li className="pt-2">
                        <Link
                          to="/collections"
                          className="font-semibold text-[#C5A572] hover:text-[#30251F] inline-flex items-center gap-1"
                        >
                          <span>View All 31 Collections</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
              isNavActive('/about')
                ? 'text-[#30251F] border-[#C5A572]'
                : 'border-transparent hover:text-[#30251F]'
            }`}
          >
            About Us
          </Link>
        </nav>

        {/* Right: Account Icon, Wishlist Icon, and Cart Icon */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setAccountModalOpen(true)}
            aria-label="Account & Shopping Preferences"
            title="Account & Saved Preferences"
            className="p-2 text-[#30251F] hover:text-[#C5A572] transition-colors flex items-center gap-1.5"
          >
            <User className="w-5 h-5" />
            <span className="hidden xl:inline text-xs font-medium">Account</span>
          </button>

          <Link
            to="/wishlist"
            aria-label={`Wishlist (${wishlist.length} saved items)`}
            title="Wishlist"
            className="relative p-2 text-[#30251F] hover:text-[#C5A572] transition-colors flex items-center gap-1"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="text-xs font-semibold text-[#30251F] tabular-nums">
                ({wishlist.length})
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`Shopping bag (${cartCount} items)`}
            title="Shopping Bag"
            className="flex items-center gap-2 px-3 py-2 bg-[#30251F] text-[#FAF6F0] text-xs font-medium hover:bg-[#8B7765] transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A572]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold">({cartCount})</span>
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF6F0] border-b border-[#D8C3AD] px-4 py-6 space-y-5 max-h-[80vh] overflow-y-auto">
          <nav aria-label="Mobile Navigation" className="space-y-3 text-sm font-medium text-[#30251F]">
            <Link to="/" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Home
            </Link>
            <Link to="/shop" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Shop Complete Catalogue ({PRODUCTS.length} Products)
            </Link>
            <Link to="/collections/jewellery" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Jewellery (Rings, Bangles, Earrings, Necklaces, Payal, Bridal)
            </Link>
            <Link to="/collections/bags" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Handbags & Purses (Slings, Totes, Clutches, Wallets)
            </Link>
            <Link to="/collections/watches-and-sunglasses" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Watches & Sunglasses
            </Link>
            <Link to="/collections/makeup-and-beauty" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Makeup, Skincare, Nails & Beauty Tools
            </Link>
            <Link to="/collections/hair-accessories" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Hair Accessories (Claw Clips, Scrunchies, Bridal Hair)
            </Link>
            <Link to="/collections/more-accessories" className="block py-1.5 border-b border-[#D8C3AD]/60">
              More Accessories (Scarves, Belts, Brooches & Organisers)
            </Link>
            <Link to="/collections" className="block py-1.5 border-b border-[#D8C3AD]/60 text-[#C5A572]">
              Browse All 31 Collections →
            </Link>
            <Link to="/about" className="block py-1.5 border-b border-[#D8C3AD]/60">
              About Us
            </Link>
            <Link to="/contact" className="block py-1.5 border-b border-[#D8C3AD]/60">
              Contact & Customer Care
            </Link>
            <Link to="/faq" className="block py-1.5">
              FAQs
            </Link>
          </nav>
        </div>
      )}

      {/* Account & Customer Preferences Modal */}
      {accountModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="VALENTINA Customer Account Overview"
          className="fixed inset-0 z-50 bg-[#30251F]/50 flex items-center justify-center p-4"
        >
          <div className="bg-[#FAF6F0] border border-[#D8C3AD] max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#D8C3AD] pb-4">
              <div>
                <p className="text-[11px] tracking-widest text-[#C5A572] font-medium">
                  VALENTINA CLIENT PROFILE
                </p>
                <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                  Your Shopping Profile
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAccountModalOpen(false)}
                aria-label="Close account modal"
                className="p-1.5 text-[#8B7765] hover:text-[#30251F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#8B7765]">
              <div className="p-4 bg-white border border-[#D8C3AD] flex items-center justify-between">
                <span>Saved Wishlist Items</span>
                <Link
                  to="/wishlist"
                  onClick={() => setAccountModalOpen(false)}
                  className="font-semibold text-[#30251F] underline hover:text-[#C5A572]"
                >
                  {wishlist.length} Saved →
                </Link>
              </div>
              <div className="p-4 bg-white border border-[#D8C3AD] flex items-center justify-between">
                <span>Items in Shopping Bag</span>
                <button
                  type="button"
                  onClick={() => {
                    setAccountModalOpen(false);
                    setIsCartDrawerOpen(true);
                  }}
                  className="font-semibold text-[#30251F] underline hover:text-[#C5A572]"
                >
                  {cartCount} Items →
                </button>
              </div>
              <div className="p-4 bg-white border border-[#D8C3AD] flex items-center justify-between">
                <span>Recently Viewed Products</span>
                <span className="font-semibold text-[#30251F]">
                  {recentlyViewedSlugs.length} Products
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[#8B7765] leading-relaxed">
              Your wishlist, shopping bag, and recently viewed items are automatically saved in your browser session for seamless browsing across all {PRODUCTS.length} products.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Link
                to="/shop"
                onClick={() => setAccountModalOpen(false)}
                className="px-5 py-2.5 bg-[#30251F] text-[#FAF6F0] text-xs font-medium hover:bg-[#8B7765]"
              >
                Explore Catalogue
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
