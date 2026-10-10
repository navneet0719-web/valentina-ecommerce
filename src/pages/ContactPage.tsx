import React, { useState } from 'react';
import { CheckCircle2, HelpCircle, Truck, RotateCcw } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';
import { SITE_CONFIG } from '../config/site';

const SUBJECT_OPTIONS = [
  'Product information',
  'Product variants',
  'Order assistance',
  'Shipping question',
  'Returns and refunds',
  'Website feedback',
  'Other enquiry',
];

export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    email: string;
    subject: string;
    orderNumber?: string;
  } | null>(null);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      next.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!message.trim() || message.trim().length < 10) {
      next.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmittedData({
      name: fullName.trim(),
      email: email.trim(),
      subject,
      orderNumber: orderNumber.trim() || undefined,
    });
    setFullName('');
    setEmail('');
    setOrderNumber('');
    setMessage('');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title="Contact Us — Customer & Product Enquiries | VALENTINA"
        description="Have a question about a product, need help choosing a variation, or want to know more about the shopping process? Send us a message at VALENTINA."
        canonicalPath="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Contact Us', path: '/contact' },
        ]}
      />

      <div className="py-8 border-b border-[#D8C3AD]">
        <p className="text-xs text-[#C5A572] tracking-widest mb-1">CUSTOMER ASSISTANCE</p>
        <h1 className="font-serif-display text-4xl sm:text-5xl font-semibold text-[#30251F]">
          We're Here to Help
        </h1>
        <p className="text-sm text-[#8B7765] mt-2 max-w-2xl leading-relaxed">
          Have a question about a product, need help choosing a variation, or want to know more about the shopping process? Send us a message using the form below.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#D8C3AD] p-6 sm:p-10">
          {submittedData ? (
            <div className="space-y-5" role="status">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-[#2E6F40] shrink-0 mt-0.5" />
                <div>
                  <h2 className="font-serif-display text-3xl font-semibold text-[#30251F]">
                    Demonstration Enquiry Recorded
                  </h2>
                  <p className="text-xs text-[#8B7765] mt-1">
                    Thank you, <strong>{submittedData.name}</strong>. Your enquiry regarding{' '}
                    <strong>“{submittedData.subject}”</strong> was validated.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#FAF6F0] border border-[#C5A572] text-xs text-[#30251F] leading-relaxed">
                <strong>Important Demo Notice:</strong> Because this is a demonstration store without a connected email server, <strong>no real email has been sent</strong>. When deploying a live store, connect this form handler to your support inbox or CRM.
              </div>

              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="px-6 py-3 bg-[#30251F] text-white text-xs font-medium hover:bg-[#8B7765] transition-colors"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[#30251F] mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#D8C3AD] text-xs sm:text-sm text-[#30251F] focus:outline-none focus:border-[#30251F]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[#30251F] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#D8C3AD] text-xs sm:text-sm text-[#30251F] focus:outline-none focus:border-[#30251F]"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-[#30251F] mb-1.5"
                  >
                    Subject *
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF6F0] border border-[#D8C3AD] text-xs sm:text-sm text-[#30251F] focus:outline-none focus:border-[#30251F]"
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-order"
                    className="block text-xs font-medium text-[#30251F] mb-1.5"
                  >
                    Demo Order Reference (Optional)
                  </label>
                  <input
                    id="contact-order"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. VAL-DEMO-123456"
                    className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#D8C3AD] text-xs sm:text-sm text-[#30251F] focus:outline-none focus:border-[#30251F]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[#30251F] mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us which product or variation you would like assistance with..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#D8C3AD] text-xs sm:text-sm text-[#30251F] focus:outline-none focus:border-[#30251F]"
                />
                {errors.message && (
                  <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="px-7 py-3.5 bg-[#30251F] text-white text-xs sm:text-sm font-medium hover:bg-[#8B7765] transition-colors"
              >
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* Helpful Resources Sidebar (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-[#D8C3AD] p-6 space-y-4">
            <h2 className="font-serif-display text-2xl font-semibold text-[#30251F]">
              Quick Self-Service Guides
            </h2>
            <p className="text-xs text-[#8B7765] leading-relaxed">
              Explore our informational pages for answers on choosing varieties, illustrative shipping policies and returns guidelines.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                to="/faq"
                className="flex items-start gap-3 p-4 bg-[#FAF6F0] border border-[#D8C3AD] hover:border-[#C5A572] transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-[#C5A572] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#30251F]">
                    Frequently Asked Questions
                  </p>
                  <p className="text-[11px] text-[#8B7765] mt-0.5">
                    Learn how variant pricing, stock status, cart lines and demo checkout work.
                  </p>
                </div>
              </Link>

              <Link
                to="/shipping-policy"
                className="flex items-start gap-3 p-4 bg-[#FAF6F0] border border-[#D8C3AD] hover:border-[#C5A572] transition-colors"
              >
                <Truck className="w-5 h-5 text-[#C5A572] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#30251F]">
                    Shipping Policy Guide
                  </p>
                  <p className="text-[11px] text-[#8B7765] mt-0.5">
                    Review illustrative dispatch timelines, tracking disclosures and PIN code coverage.
                  </p>
                </div>
              </Link>

              <Link
                to="/returns-refunds"
                className="flex items-start gap-3 p-4 bg-[#FAF6F0] border border-[#D8C3AD] hover:border-[#C5A572] transition-colors"
              >
                <RotateCcw className="w-5 h-5 text-[#C5A572] shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-[#30251F]">
                    Returns & Refunds Guide
                  </p>
                  <p className="text-[11px] text-[#8B7765] mt-0.5">
                    Understand how return eligibility, condition checks and refund windows work.
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Only render direct contact details if configured by site owner in SITE_CONFIG */}
          {(SITE_CONFIG.contact.supportEmail ||
            SITE_CONFIG.contact.phone ||
            SITE_CONFIG.contact.officeAddress) && (
            <div className="bg-white border border-[#D8C3AD] p-6 space-y-2 text-xs">
              <h3 className="font-serif-display text-xl font-semibold text-[#30251F]">
                Configured Contact Details
              </h3>
              {SITE_CONFIG.contact.supportEmail && (
                <p>Email: {SITE_CONFIG.contact.supportEmail}</p>
              )}
              {SITE_CONFIG.contact.phone && <p>Phone: {SITE_CONFIG.contact.phone}</p>}
              {SITE_CONFIG.contact.officeAddress && (
                <p>Address: {SITE_CONFIG.contact.officeAddress}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
