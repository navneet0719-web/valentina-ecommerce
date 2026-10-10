/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { RouterProvider, useRouter } from './context/RouterContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionsOverviewPage } from './pages/CollectionsOverviewPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { BlogOverviewPage, BlogArticlePage } from './pages/BlogPage';
import { PolicyPage } from './pages/PolicyPages';
import { NotFoundPage } from './pages/NotFoundPage';

const RouteSwitch: React.FC = () => {
  const { pathname } = useRouter();

  if (pathname === '/') return <HomePage />;
  if (pathname === '/shop') return <ShopPage mode="all" />;
  if (pathname === '/new-arrivals') return <ShopPage mode="new-arrivals" />;
  if (pathname === '/bestsellers') return <ShopPage mode="bestsellers" />;
  if (pathname === '/collections') return <CollectionsOverviewPage />;
  if (pathname === '/wishlist') return <WishlistPage />;
  if (pathname === '/cart') return <CartPage />;
  if (pathname === '/checkout') return <CheckoutPage />;
  if (pathname === '/about') return <AboutPage />;
  if (pathname === '/contact') return <ContactPage />;
  if (pathname === '/faq') return <FaqPage />;
  if (pathname === '/blog') return <BlogOverviewPage />;
  if (pathname === '/shipping-policy') return <PolicyPage type="shipping" />;
  if (pathname === '/returns-refunds') return <PolicyPage type="returns" />;
  if (pathname === '/privacy-policy') return <PolicyPage type="privacy" />;
  if (pathname === '/terms-and-conditions') return <PolicyPage type="terms" />;
  if (pathname === '/disclaimer') return <PolicyPage type="disclaimer" />;
  if (pathname === '/404') return <NotFoundPage />;

  if (pathname.startsWith('/collections/')) {
    const slug = pathname.replace('/collections/', '');
    return <CollectionDetailPage slug={slug} />;
  }

  if (pathname.startsWith('/products/')) {
    const slug = pathname.replace('/products/', '');
    return <ProductDetailPage slug={slug} />;
  }

  if (pathname.startsWith('/blog/')) {
    const slug = pathname.replace('/blog/', '');
    return <BlogArticlePage slug={slug} />;
  }

  return <NotFoundPage />;
};

const ToastBanner: React.FC = () => {
  const { toastMessage, clearToast } = useStore();
  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 right-5 z-50 max-w-sm bg-[#30251F] text-[#FAF6F0] border border-[#C5A572] px-5 py-3.5 shadow-xl flex items-center justify-between gap-4 text-xs"
    >
      <span>{toastMessage}</span>
      <button
        type="button"
        onClick={clearToast}
        className="text-[#D8C3AD] hover:text-white font-semibold"
      >
        Dismiss
      </button>
    </div>
  );
};

export default function App() {
  return (
    <RouterProvider>
      <StoreProvider>
        <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-[#30251F]">
          <Header />
          <main className="flex-1">
            <RouteSwitch />
          </main>
          <Footer />
          <CartDrawer />
          <ToastBanner />
        </div>
      </StoreProvider>
    </RouterProvider>
  );
}

