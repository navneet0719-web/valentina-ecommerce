import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from '../context/RouterContext';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../config/site';
import { trackEvent } from '../utils/analytics';

interface DemoOrderReceipt {
  referenceId: string;
  placedAt: string;
  customerName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethodLabel: string;
  items: Array<{
    name: string;
    variantText: string;
    sku: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
  demoShipping: number;
  total: number;
}

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Delhi (NCT)',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, clearCart } = useStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pinCode, setPinCode] = useState('');
  const [paymentDemoOption, setPaymentDemoOption] = useState<
    'upi_demo' | 'cod_demo' | 'card_sandbox'
  >('upi_demo');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [completedReceipt, setCompletedReceipt] = useState<DemoOrderReceipt | null>(null);

  useEffect(() => {
    if (cart.length > 0 && !completedReceipt) {
      trackEvent('begin_checkout', {
        value: cartSubtotal,
        item_count: cart.length,
      });
    }
  }, []);

  const demoShipping = cartSubtotal > 0 ? (cartSubtotal >= 1990 ? 0 : 120) : 0;
  const grandTotal = cartSubtotal + demoShipping;

  const validateForm = () => {
    const nextErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      nextErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!address.trim() || address.trim().length < 6) {
      nextErrors.address = 'Please enter a complete street address.';
    }
    if (!city.trim()) {
      nextErrors.city = 'Please enter your city or town.';
    }
    const pinDigits = pinCode.replace(/\D/g, '');
    if (pinDigits.length !== 6) {
      nextErrors.pinCode = 'Please enter a valid 6-digit Indian PIN code.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePlaceDemoOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refNum = `VAL-DEMO-${Math.floor(100000 + Math.random() * 900000)}`;
    const paymentLabel =
      paymentDemoOption === 'upi_demo'
        ? 'UPI Sandbox Simulation (No Real Charge)'
        : paymentDemoOption === 'cod_demo'
        ? 'Cash on Delivery Simulation (Demo Only)'
        : 'Card Gateway Walkthrough (No Card Data Collected)';

    const receipt: DemoOrderReceipt = {
      referenceId: refNum,
      placedAt: new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      customerName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      addressLine: address.trim(),
      city: city.trim(),
      state: stateName,
      pinCode: pinCode.trim(),
      paymentMethodLabel: paymentLabel,
      items: cart.map((c) => ({
        name: c.productName,
        variantText: `${c.color} · ${c.secondaryOption}`,
        sku: c.sku,
        quantity: c.quantity,
        unitPrice: c.unitPrice,
      })),
      subtotal: cartSubtotal,
      demoShipping,
      total: grandTotal,
    };

    // Fire dedicated demo_purchase_complete event (explicitly separated from real purchase conversion)
    trackEvent('demo_purchase_complete', {
      demo_order_reference: refNum,
      value: grandTotal,
      shipping_estimate_demo: demoShipping,
      item_count: cart.length,
      is_real_transaction: false,
    });

    setCompletedReceipt(receipt);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SEOHead
        title="Demo Checkout | VALENTINA"
        description="Demonstration checkout workflow for VALENTINA women’s accessories. No real orders or payments are processed."
        canonicalPath="/checkout"
        noindex={true}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Shopping Bag', path: '/cart' },
          { name: 'Demo Checkout', path: '/checkout' },
        ]}
      />

      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'Shopping Bag', path: '/cart' },
          { name: 'Demo Checkout', path: '/checkout' },
        ]}
      />

      {/* Prominent Demo Banner */}
      <div className="mt-4 p-4 bg-[#E8DCCB]/60 border border-[#B89A64] flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#8F723E] shrink-0 mt-0.5" />
        <div className="text-xs text-[#24211F] leading-relaxed">
          <strong>Demonstration Checkout Mode:</strong> This page demonstrates an e-commerce checkout flow for educational and evaluation purposes. Do not enter sensitive personal or financial information. <strong>No real order will be dispatched and no payment will be charged.</strong>
        </div>
      </div>

      {/* COMPLETED DEMO RECEIPT VIEW */}
      {completedReceipt ? (
        <div className="mt-8 bg-white border border-[#E8DCCB] p-6 sm:p-10 max-w-3xl mx-auto space-y-6">
          <div className="flex items-start gap-4 pb-6 border-b border-[#E8DCCB]">
            <CheckCircle2 className="w-8 h-8 text-[#2E6F40] shrink-0 mt-1" />
            <div>
              <p className="text-xs font-semibold text-[#8F723E] tracking-widest">
                DEMONSTRATION ORDER CONFIRMATION
              </p>
              <h1 className="font-serif-display text-3xl sm:text-4xl font-semibold text-[#24211F] mt-1">
                Thank You, {completedReceipt.customerName}
              </h1>
              <p className="text-xs text-[#5C534C] mt-1">
                Demo Reference: <strong className="font-mono-code">{completedReceipt.referenceId}</strong> · Recorded on {completedReceipt.placedAt}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FAF7F2] border border-[#B89A64] text-xs text-[#24211F] leading-relaxed">
            <strong>Important Notice:</strong> This is a simulated order confirmation generated by the VALENTINA demonstration store. No real purchase has been placed, no inventory has been shipped, and no payment has been collected.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="p-4 bg-[#FAF7F2] border border-[#E8DCCB] space-y-1">
              <p className="font-semibold text-[#24211F] mb-1">Simulated Delivery Details</p>
              <p className="text-[#5C534C]">{completedReceipt.customerName}</p>
              <p className="text-[#5C534C]">{completedReceipt.addressLine}</p>
              <p className="text-[#5C534C]">
                {completedReceipt.city}, {completedReceipt.state} — {completedReceipt.pinCode}
              </p>
              <p className="text-[#5C534C] pt-1">
                Phone: {completedReceipt.phone} · Email: {completedReceipt.email}
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] border border-[#E8DCCB] space-y-1">
              <p className="font-semibold text-[#24211F] mb-1">Payment & Shipping Simulation</p>
              <p className="text-[#5C534C]">
                <strong>Method:</strong> {completedReceipt.paymentMethodLabel}
              </p>
              <p className="text-[#5C534C]">
                <strong>Payment Status:</strong> ₹0 Charged (Demo Mode)
              </p>
              <p className="text-[#5C534C]">
                <strong>Analytics Event Fired:</strong>{' '}
                <code className="font-mono-code">demo_purchase_complete</code>
              </p>
            </div>
          </div>

          {/* Itemised Demo Receipt */}
          <div>
            <h2 className="font-serif-display text-2xl font-semibold text-[#24211F] mb-3">
              Simulated Order Items
            </h2>
            <div className="divide-y divide-[#E8DCCB] border-y border-[#E8DCCB]">
              {completedReceipt.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
                  <div>
                    <p className="font-semibold text-[#24211F]">
                      {item.name} × {item.quantity}
                    </p>
                    <p className="text-[#6E655E]">
                      {item.variantText} · SKU: {item.sku}
                    </p>
                  </div>
                  <span className="font-semibold text-[#24211F] tabular-nums">
                    {formatINR(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-[#5C534C]">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatINR(completedReceipt.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5C534C]">
                <span>Demo Shipping Estimate</span>
                <span className="tabular-nums">{formatINR(completedReceipt.demoShipping)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#24211F] pt-2 border-t border-[#E8DCCB]">
                <span>Simulated Order Total (INR)</span>
                <span className="tabular-nums">{formatINR(completedReceipt.total)}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="px-6 py-3 bg-[#24211F] text-white text-xs font-medium hover:bg-[#3A3532] transition-colors"
            >
              Return to Shop
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-[#24211F] text-[#24211F] text-xs font-medium hover:bg-[#FAF7F2] transition-colors"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div className="mt-10 bg-white border border-[#E8DCCB] p-12 text-center max-w-xl mx-auto space-y-4">
          <ShoppingBag className="w-10 h-10 text-[#B89A64] mx-auto stroke-[1.5]" />
          <h1 className="font-serif-display text-3xl text-[#24211F]">
            Your Bag is Empty
          </h1>
          <p className="text-xs sm:text-sm text-[#5C534C]">
            Add at least one accessory to your bag before testing the demonstration checkout flow.
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 bg-[#24211F] text-white text-xs font-medium"
          >
            Browse Catalogue
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handlePlaceDemoOrder}
          noValidate
          className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
        >
          {/* Left 7 Columns: Customer, Shipping & Demo Payment Sections */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section 1: Customer Contact */}
            <div className="bg-white border border-[#E8DCCB] p-6 sm:p-8 space-y-5">
              <h1 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#24211F]">
                1. Customer Details
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs font-medium text-[#24211F] mb-1.5"
                  >
                    Full Name *
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8DCCB] text-xs sm:text-sm text-[#24211F] focus:outline-none focus:border-[#24211F]"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-email"
                    className="block text-xs font-medium text-[#24211F] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ananya@example.com"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8DCCB] text-xs sm:text-sm text-[#24211F] focus:outline-none focus:border-[#24211F]"
                  />
                  {errors.email && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs font-medium text-[#24211F] mb-1.5"
                  >
                    Phone Number (10-digit India) *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8DCCB] text-xs sm:text-sm text-[#24211F] focus:outline-none focus:border-[#24211F]"
                  />
                  {errors.phone && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Shipping Address */}
            <div className="bg-white border border-[#E8DCCB] p-6 sm:p-8 space-y-5">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#24211F]">
                2. Shipping Address (Demo)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs font-medium text-[#24211F] mb-1.5"
                  >
                    Street Address, Apartment / Landmark *
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Flat 402, Lotus Enclave, Linking Road"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8DCCB] text-xs sm:text-sm text-[#24211F] focus:outline-none focus:border-[#24211F]"
                  />
                  {errors.address && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-city"
                    className="block text-xs font-medium text-[#24211F] mb-1.5"
                  >
                    City / Town *
                  </label>
                  <input
                    id="checkout-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Mumbai"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8DCCB] text-xs sm:text-sm text-[#24211F] focus:outline-none focus:border-[#24211F]"
                  />
                  {errors.city && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.city}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="checkout-state"
                    className="block text-xs font-medium text-[#24211F] mb-1.5"
                  >
                    State *
                  </label>
                  <select
                    id="checkout-state"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#E8DCCB] text-xs sm:text-sm text-[#24211F] focus:outline-none focus:border-[#24211F]"
                  >
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="checkout-pincode"
                    className="block text-xs font-medium text-[#24211F] mb-1.5"
                  >
                    PIN Code (6 digits) *
                  </label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    maxLength={6}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="400050"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#E8DCCB] text-xs sm:text-sm text-[#24211F] focus:outline-none focus:border-[#24211F]"
                  />
                  {errors.pinCode && (
                    <p className="text-xs text-[#9E3B33] mt-1" role="alert">
                      {errors.pinCode}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Payment Method Demonstration */}
            <div className="bg-white border border-[#E8DCCB] p-6 sm:p-8 space-y-4">
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#24211F]">
                3. Payment Method Demonstration
              </h2>
              <p className="text-xs text-[#5C534C] leading-relaxed">
                Select a simulated payment option below. For your security, this demonstration store does not collect or store credit/debit card numbers, CVVs, or UPI PINs.
              </p>

              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 p-4 border border-[#E8DCCB] bg-[#FAF7F2] cursor-pointer">
                  <input
                    type="radio"
                    name="paymentDemo"
                    checked={paymentDemoOption === 'upi_demo'}
                    onChange={() => setPaymentDemoOption('upi_demo')}
                    className="mt-1 accent-[#24211F]"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#24211F] block">
                      UPI Instant Simulation (Demo Mode)
                    </span>
                    <span className="text-[#5C534C]">
                      Simulates an instant UPI checkout confirmation without connecting to a live banking gateway.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-[#E8DCCB] bg-[#FAF7F2] cursor-pointer">
                  <input
                    type="radio"
                    name="paymentDemo"
                    checked={paymentDemoOption === 'cod_demo'}
                    onChange={() => setPaymentDemoOption('cod_demo')}
                    className="mt-1 accent-[#24211F]"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#24211F] block">
                      Cash on Delivery Simulation (Demo Mode)
                    </span>
                    <span className="text-[#5C534C]">
                      Simulates placing a pay-on-delivery order for demonstration testing.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-4 border border-[#E8DCCB] bg-[#FAF7F2] cursor-pointer">
                  <input
                    type="radio"
                    name="paymentDemo"
                    checked={paymentDemoOption === 'card_sandbox'}
                    onChange={() => setPaymentDemoOption('card_sandbox')}
                    className="mt-1 accent-[#24211F]"
                  />
                  <div className="text-xs">
                    <span className="font-semibold text-[#24211F] block">
                      Hosted Card Gateway Walkthrough (No Card Fields Collected)
                    </span>
                    <span className="text-[#5C534C]">
                      Demonstrates a redirect-style card checkout completion without collecting card details.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Order Summary & Submit */}
          <div className="lg:col-span-5 bg-white border border-[#E8DCCB] p-6 sm:p-8 space-y-6 lg:sticky lg:top-28">
            <h2 className="font-serif-display text-2xl font-semibold text-[#24211F] pb-3 border-b border-[#E8DCCB]">
              Order Summary ({cart.length} {cart.length === 1 ? 'line' : 'lines'})
            </h2>

            <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.lineId} className="flex gap-3 items-center text-xs pb-3 border-b border-[#E8DCCB]/60">
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                    className="w-14 h-12 object-cover border border-[#E8DCCB] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[#24211F] truncate">
                      {item.productName} × {item.quantity}
                    </p>
                    <p className="text-[11px] text-[#6E655E] truncate">
                      {item.color} · {item.secondaryOption}
                    </p>
                  </div>
                  <span className="font-semibold text-[#24211F] tabular-nums shrink-0">
                    {formatINR(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-xs text-[#5C534C]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#24211F] tabular-nums">
                  {formatINR(cartSubtotal)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Estimate (Demo Data)</span>
                <span className="font-semibold text-[#24211F] tabular-nums">
                  {demoShipping === 0 ? '₹0 (Demo Free Tier)' : formatINR(demoShipping)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8DCCB] flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[#24211F]">
                Demonstration Total (INR)
              </span>
              <span className="font-serif-display text-3xl font-semibold text-[#24211F] tabular-nums">
                {formatINR(grandTotal)}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-6 bg-[#24211F] text-white text-xs sm:text-sm font-medium hover:bg-[#3A3532] transition-colors"
            >
              Complete Demo Order (No Real Payment)
            </button>

            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-xs text-[#6E655E] hover:text-[#24211F]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Shopping Bag</span>
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};
