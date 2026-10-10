import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';

interface FAQEntry {
  category: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQEntry[] = [
  {
    category: 'Products & Variants',
    question: 'How do I choose product variants such as colour, finish, size or pack size?',
    answer:
      'On every product detail page, you will see interactive selectors for Colour / Finish alongside a category-specific selector (such as Hoop Diameter, Chain Length, Indian Ring Size, Pack Size, or Strap Style). Clicking any option immediately updates the selected visual state, studio gallery image, SKU, stock availability and price.',
  },
  {
    category: 'Products & Variants',
    question: 'Can different variants of the same product have different prices?',
    answer:
      'Yes. While colour changes in the same size often share the same price, selecting a larger hoop diameter, a multi-tier cascade, a 5-pack of scrunchies instead of a 3-pack, or a double-layer vanity case updates the displayed INR price automatically.',
  },
  {
    category: 'Products & Variants',
    question: 'How is product availability and stock status represented?',
    answer:
      'Each product variant is backed by structured demo inventory data showing whether that specific combination is In Stock, Low Stock, or Currently Out of Stock. Out-of-stock variants disable the Add to Bag button so they cannot be accidentally ordered.',
  },
  {
    category: 'Pricing & Shopping Bag',
    question: 'How are product prices displayed across the website?',
    answer:
      'All prices are displayed in Indian Rupees (INR / ₹). Where a comparison price is shown, it is explicitly marked as illustrative demonstration merchandising data.',
  },
  {
    category: 'Pricing & Shopping Bag',
    question: 'How do I add an item to the cart, and can I add two different colours of the same product?',
    answer:
      'Select your preferred colour and size/style on the product page (or preview a colour swatch on a product card) and click "Add to Bag". Each unique variant combination has its own line ID and SKU, so adding Pearl Drop Earrings in 18k Gold Tone and Rose Gold Tone creates two separate lines in your shopping bag.',
  },
  {
    category: 'Pricing & Shopping Bag',
    question: 'How does the Wishlist work?',
    answer:
      'Clicking the heart icon on any product card or product detail page saves the item to your browser’s localStorage so your list persists across page refreshes. From the /wishlist page, you can remove items or move them directly into your shopping bag.',
  },
  {
    category: 'Demo Checkout & Orders',
    question: 'Does the checkout page process a real payment or place a real order?',
    answer:
      'No. VALENTINA is a demonstration e-commerce website created for learning and evaluation. The checkout page validates your address fields and simulates an order confirmation with a demo reference code, but no real payment is collected and no physical goods are shipped.',
  },
  {
    category: 'Shipping, Returns & Support',
    question: 'How is shipping information displayed?',
    answer:
      'Our Shipping Policy page (/shipping-policy) outlines how an online store in India should disclose processing times, PIN code serviceability, shipping fee tiers, and tracking procedures. All shipping estimates shown in the cart and checkout are illustrative demo figures.',
  },
  {
    category: 'Shipping, Returns & Support',
    question: 'How would returns and refunds work?',
    answer:
      'Our Returns & Refunds page (/returns-refunds) provides an illustrative framework explaining eligibility windows, unused condition requirements, hygiene exceptions for pierced earrings, and refund timelines that a business owner must confirm before launching a live store.',
  },
  {
    category: 'Shipping, Returns & Support',
    question: 'How can I contact customer support?',
    answer:
      'You can submit product or variant questions using the validated form on our Contact Us page (/contact). In this demonstration environment, submitting the form displays an instant local confirmation.',
  },
];

export const FaqPage: React.FC = () => {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 4, 6]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const categories = Array.from(new Set(FAQ_DATA.map((f) => f.category)));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title="Frequently Asked Questions — Variants, Cart & Demo Info | VALENTINA"
        description="Find clear answers on choosing VALENTINA product variants, INR pricing, adding multiple varieties to the cart, wishlist persistence and demo checkout."
        canonicalPath="/faq"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Frequently Asked Questions', path: '/faq' },
        ]}
        jsonLd={faqJsonLd}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Frequently Asked Questions', path: '/faq' },
        ]}
      />

      <div className="py-8 border-b border-[#D8C3AD]">
        <p className="text-xs text-[#C5A572] tracking-widest mb-1">HELP CENTRE</p>
        <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#30251F]">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#8B7765] mt-2 max-w-2xl leading-relaxed">
          Everything you need to know about exploring product varieties, managing your bag and wishlist, and understanding how this demonstration store operates.
        </p>
      </div>

      <div className="mt-10 space-y-12 max-w-4xl">
        {categories.map((cat) => {
          const items = FAQ_DATA.map((entry, globalIdx) => ({
            ...entry,
            globalIdx,
          })).filter((e) => e.category === cat);

          return (
            <section key={cat} className="space-y-4">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#30251F] pb-2 border-b border-[#D8C3AD]">
                {cat}
              </h2>

              <div className="space-y-3">
                {items.map((item) => {
                  const isOpen = openIndices.includes(item.globalIdx);
                  return (
                    <div
                      key={item.globalIdx}
                      className="bg-white border border-[#D8C3AD]"
                    >
                      <button
                        type="button"
                        onClick={() => toggleIndex(item.globalIdx)}
                        aria-expanded={isOpen}
                        className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-[#FAF6F0] transition-colors"
                      >
                        <span className="font-serif-display text-xl font-semibold text-[#30251F]">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#C5A572] shrink-0 transition-transform duration-150 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-[#8B7765] leading-relaxed border-t border-[#D8C3AD]/50">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 p-6 sm:p-8 bg-white border border-[#D8C3AD] max-w-4xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif-display text-2xl font-semibold text-[#30251F]">
            Still have a question?
          </h3>
          <p className="text-xs text-[#8B7765] mt-1">
            Use our Contact page or review our illustrative policy guides.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-[#30251F] text-white text-xs font-medium hover:bg-[#8B7765] transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/shipping-policy"
            className="px-5 py-2.5 border border-[#30251F] text-[#30251F] text-xs font-medium hover:bg-[#FAF6F0] transition-colors"
          >
            Shipping Policy
          </Link>
        </div>
      </div>
    </div>
  );
};
