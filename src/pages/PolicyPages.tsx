import React from 'react';
import { AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';

export type PolicyPageType =
  | 'shipping'
  | 'returns'
  | 'privacy'
  | 'terms'
  | 'disclaimer';

interface PolicyPageProps {
  type: PolicyPageType;
}

export const PolicyPage: React.FC<PolicyPageProps> = ({ type }) => {
  const metaMap: Record<
    PolicyPageType,
    {
      title: string;
      description: string;
      path: string;
      h1: string;
      subtitle: string;
      breadcrumb: string;
    }
  > = {
    shipping: {
      title: 'Shipping Policy (Illustrative Draft Guide) | VALENTINA',
      description:
        'Review how VALENTINA structures dispatch timelines, PIN code coverage, delivery estimates and tracking disclosures for this demonstration store.',
      path: '/shipping-policy',
      h1: 'Shipping Policy — Illustrative Store Framework',
      subtitle:
        'An educational and structural overview of the shipping disclosures a live online accessories store in India should confirm prior to launch.',
      breadcrumb: 'Shipping Policy',
    },
    returns: {
      title: 'Returns & Refunds Policy (Illustrative Draft Guide) | VALENTINA',
      description:
        'Understand return eligibility, hygiene considerations for pierced earrings, inspection standards and refund timelines on the VALENTINA demo store.',
      path: '/returns-refunds',
      h1: 'Returns & Refunds — Illustrative Store Framework',
      subtitle:
        'Draft guidelines explaining how return windows, product condition checks, and refund methods should be disclosed for fashion accessories.',
      breadcrumb: 'Returns & Refunds',
    },
    privacy: {
      title: 'Privacy Policy — Data & Cookie Transparency | VALENTINA',
      description:
        'Learn how local browser storage, demo forms and optional analytics consent operate on the VALENTINA demonstration e-commerce website.',
      path: '/privacy-policy',
      h1: 'Privacy Policy',
      subtitle:
        'How information, browser localStorage, cookies and third-party analytics placeholders are handled on this demonstration website.',
      breadcrumb: 'Privacy Policy',
    },
    terms: {
      title: 'Terms & Conditions — Website Use & Demo Notice | VALENTINA',
      description:
        'Read the terms and conditions governing the use of the VALENTINA demonstration women’s accessories website.',
      path: '/terms-and-conditions',
      h1: 'Terms & Conditions',
      subtitle:
        'Guidelines covering website usage, sample product information, INR pricing illustrations and intellectual property.',
      breadcrumb: 'Terms & Conditions',
    },
    disclaimer: {
      title: 'Demonstration Store Disclaimer | VALENTINA',
      description:
        'Official disclaimer clarifying that VALENTINA is a demonstration e-commerce project with sample inventory and simulated checkout.',
      path: '/disclaimer',
      h1: 'Demonstration Store Disclaimer',
      subtitle:
        'Important transparency notice regarding sample product data, imagery, pricing and simulated checkout functionality.',
      breadcrumb: 'Disclaimer',
    },
  };

  const currentMeta = metaMap[type];

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title={currentMeta.title}
        description={currentMeta.description}
        canonicalPath={currentMeta.path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: currentMeta.breadcrumb, path: currentMeta.path },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: currentMeta.breadcrumb, path: currentMeta.path },
        ]}
      />

      <div className="py-8 border-b border-[#D8C3AD]">
        <p className="text-xs text-[#C5A572] tracking-widest mb-1">
          STORE INFORMATION & TRANSPARENCY
        </p>
        <h1 className="font-serif-display text-3xl sm:text-5xl font-semibold text-[#30251F]">
          {currentMeta.h1}
        </h1>
        <p className="text-sm text-[#8B7765] mt-2 max-w-2xl leading-relaxed">
          {currentMeta.subtitle}
        </p>
      </div>

      {/* Draft Placeholder Banner */}
      <div className="mt-8 p-4 bg-[#D8C3AD]/50 border border-[#C5A572] flex items-start gap-3 max-w-4xl">
        <AlertCircle className="w-5 h-5 text-[#C5A572] shrink-0 mt-0.5" />
        <p className="text-xs text-[#30251F] leading-relaxed">
          <strong>Draft Policy Notice:</strong> VALENTINA is a demonstration e-commerce project. Operational figures, shipping charges, return windows and legal clauses below are illustrative draft placeholders and must be reviewed and confirmed by the business owner and qualified legal counsel before launching a commercial store.
        </p>
      </div>

      {/* Policy Content Body */}
      <div className="mt-8 bg-white border border-[#D8C3AD] p-6 sm:p-10 max-w-4xl space-y-8 text-sm text-[#8B7765] leading-relaxed">
        {type === 'shipping' && (
          <>
            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                1. Order Processing & Dispatch Timelines (Illustrative)
              </h2>
              <p>
                A commercial online fashion accessories store should clearly state how many business days are required to inspect, pack and hand over an order to a courier partner (for example, 1–2 business days excluding Sundays and public holidays).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                2. Sample Delivery Estimates & Shipping Charges Table
              </h2>
              <p>
                In this demonstration store, the shopping bag and checkout use the following illustrative sample shipping structure:
              </p>
              <div className="overflow-x-auto border border-[#D8C3AD]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6F0] text-[#30251F] border-b border-[#D8C3AD]">
                    <tr>
                      <th className="p-3 font-semibold">Order Value (Demo)</th>
                      <th className="p-3 font-semibold">Illustrative Shipping Charge</th>
                      <th className="p-3 font-semibold">Sample Transit Window (to be confirmed)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8C3AD]">
                    <tr>
                      <td className="p-3 tabular-nums">Orders below ₹1,990</td>
                      <td className="p-3 tabular-nums">₹120 (Illustrative Flat Rate)</td>
                      <td className="p-3">[Placeholder: e.g., 3–6 business days across metro & tier-2 cities]</td>
                    </tr>
                    <tr>
                      <td className="p-3 tabular-nums">Orders ₹1,990 and above</td>
                      <td className="p-3 tabular-nums">₹0 (Demo Complimentary Tier)</td>
                      <td className="p-3">[Placeholder: e.g., 3–6 business days across serviceable PIN codes]</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                3. Serviceable Areas, Tracking & Delayed Deliveries
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Serviceable PIN Codes:</strong> A live store should integrate courier PIN-code verification so shoppers know whether prepaid and Cash-on-Delivery services are available in their area.
                </li>
                <li>
                  <strong>Shipment Tracking:</strong> Once a live order is dispatched, customers should receive an AWB tracking number via email/SMS to monitor transit milestones.
                </li>
                <li>
                  <strong>Weather or Regional Delays:</strong> Policies should explain how customers are notified if monsoon disruptions, regional holidays or courier delays extend transit times.
                </li>
              </ul>
            </section>
          </>
        )}

        {type === 'returns' && (
          <>
            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                1. Return Eligibility & Illustrative Return Window
              </h2>
              <p>
                Before launching a live store, the business owner must specify the exact return or exchange window (for example, <strong>[Draft Placeholder: 7 days from delivery]</strong>) and clarify whether returns are accepted for size mismatches, damaged transit items, or change of mind.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                2. Product Condition & Hygiene Exceptions
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>
                  <strong>Unused Condition:</strong> Returned accessories must be unused, unwashed and accompanied by original tags, protective pouches and boxes.
                </li>
                <li>
                  <strong>Pierced Earrings Hygiene Note:</strong> Many fashion jewellery stores exclude pierced earrings (studs, hoops and drops) from general change-of-mind returns for hygiene and safety reasons, except where an item arrives damaged or defective. This exception must be stated clearly on product pages.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                3. Return Shipping, Inspection & Refund Processing
              </h2>
              <div className="overflow-x-auto border border-[#D8C3AD]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6F0] text-[#30251F] border-b border-[#D8C3AD]">
                    <tr>
                      <th className="p-3 font-semibold">Stage</th>
                      <th className="p-3 font-semibold">Illustrative Store Procedure (Draft Placeholder)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8C3AD]">
                    <tr>
                      <td className="p-3 font-medium text-[#30251F]">Return Pickup / Self-Ship</td>
                      <td className="p-3">Specify whether reverse courier pickup is provided or if return shipping fees apply.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#30251F]">Quality Check</td>
                      <td className="p-3">Returned items are inspected within [Placeholder: 2–3 business days] of receipt at the warehouse.</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[#30251F]">Refund Method & Timeline</td>
                      <td className="p-3">Approved refunds are credited to the original payment source or bank account within [Placeholder: 5–7 business days].</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {type === 'privacy' && (
          <>
            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                1. Information Collected on This Demonstration Website
              </h2>
              <p>
                In this demonstration environment, your shopping bag (<code className="font-mono-code text-xs">valentina_demo_cart_v1</code>), saved wishlist (<code className="font-mono-code text-xs">valentina_demo_wishlist_v1</code>), and recently viewed product slugs are stored locally inside your browser’s <code className="font-mono-code text-xs">localStorage</code> so your selections persist when you refresh the page.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                2. Demo Forms (Newsletter, Contact & Checkout)
              </h2>
              <p>
                Inputs entered into the Newsletter form, Contact Us form, or Demo Checkout form are validated client-side to demonstrate form validation and confirmation states. They are not transmitted to an external payment gateway or third-party mailing database.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                3. Cookies, Analytics & User Choices
              </h2>
              <p>
                This website includes configurable integration points for Google Analytics 4 (GA4), Google Tag Manager (GTM), and Meta Pixel. No fake tracking IDs are active by default, and marketing event hooks respect the Analytics Consent toggle available in the footer’s SEO & Analytics Inspector.
              </p>
            </section>
          </>
        )}

        {type === 'terms' && (
          <>
            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                1. Website Purpose & Demonstration Status
              </h2>
              <p>
                VALENTINA is a demonstration e-commerce website designed to showcase multi-page navigation, multi-variant product merchandising, technical SEO, structured data, and checkout validation. No commercial contract is formed by submitting the demo checkout form.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                2. Product Information, Variants & INR Pricing
              </h2>
              <p>
                All 32 products, SKUs, variant prices in Indian Rupees (INR), and stock quantities represent structured demonstration catalogue data. Comparison prices, where displayed, are marked as illustrative merchandising examples.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                3. Intellectual Property & Policy Updates
              </h2>
              <p>
                Before operating a commercial store, the business owner must replace these draft terms with legally reviewed conditions governing jurisdiction, liability limitations, consumer protection compliance, and dispute resolution.
              </p>
            </section>
          </>
        )}

        {type === 'disclaimer' && (
          <>
            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                1. Demonstration Store & Sample Inventory Notice
              </h2>
              <p>
                VALENTINA (“Elegance in Every Detail.”) is a demonstration e-commerce website created for educational, portfolio, UI/UX, merchandising and technical SEO purposes. Displayed products, SKUs, stock counts and prices do not represent verified real-world commercial inventory.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                2. No Real Orders or Payments
              </h2>
              <p>
                Submitting the checkout form generates a simulated order reference (<code className="font-mono-code text-xs">VAL-DEMO-XXXXXX</code>) for workflow verification only. No payment gateway is connected, no credit/debit card details are collected, and no physical merchandise is shipped.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
                3. Truthful Representation Commitment
              </h2>
              <p>
                In accordance with transparent merchandising practices, this website does not fabricate customer reviews, star ratings, sales counts, material certifications, or business history.
              </p>
            </section>
          </>
        )}

        {/* Cross-navigation between policy pages */}
        <div className="pt-6 border-t border-[#D8C3AD] flex flex-wrap items-center gap-3 text-xs">
          <span className="text-[#8B7765]">Related Information Pages:</span>
          <Link to="/shipping-policy" className="underline hover:text-[#30251F]">
            Shipping Policy
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/returns-refunds" className="underline hover:text-[#30251F]">
            Returns & Refunds
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/privacy-policy" className="underline hover:text-[#30251F]">
            Privacy Policy
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/terms-and-conditions" className="underline hover:text-[#30251F]">
            Terms & Conditions
          </Link>
          <span aria-hidden="true">·</span>
          <Link to="/disclaimer" className="underline hover:text-[#30251F]">
            Disclaimer
          </Link>
        </div>
      </div>
    </div>
  );
};
