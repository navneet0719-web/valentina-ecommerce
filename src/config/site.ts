export const SITE_CONFIG = {
  brandName: 'VALENTINA',
  tagline: 'Elegance in Every Detail.',
  siteUrl:
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-dcafvusuznjbb4z2mfr6ia-1025272406749.asia-southeast1.run.app',
  productionDomain: 'https://ais-pre-dcafvusuznjbb4z2mfr6ia-1025272406749.asia-southeast1.run.app',
  announcementBarMessage: 'Discover your everyday finishing touch — Explore thoughtfully styled collections.',
  currency: 'INR',
  currencySymbol: '₹',
  isDemoStore: true,
  // Editable contact & social configuration: left null by default so unverified contact details are not invented
  contact: {
    supportEmail: null as string | null,
    phone: null as string | null,
    officeAddress: null as string | null,
    businessHoursNote: 'Demonstration store enquiry form — responses are simulated locally.',
  },
  socialLinks: {
    instagram: null as string | null,
    pinterest: null as string | null,
    youtube: null as string | null,
  },
  // Configurable Analytics Placeholders (disabled until site owner configures real IDs & user grants consent)
  analytics: {
    ga4MeasurementId: '', // e.g. 'G-XXXXXXXXXX' (configure via VITE_GA4_ID)
    gtmContainerId: '', // e.g. 'GTM-XXXXXXX' (configure via VITE_GTM_ID)
    metaPixelId: '', // e.g. '1234567890' (configure via VITE_META_PIXEL_ID)
    trackingActive: false,
  },
  editorialImages: {
    heroEditorial: '/src/assets/images/valentina_hero_editorial_1791643616774.jpg',
    jewelleryCollection: '/src/assets/images/valentina_jewellery_collection_1791643634883.jpg',
    hairAccessoriesEdit: '/src/assets/images/valentina_hair_accessories_edit_1791643647760.jpg',
    bagsAndWallets: '/src/assets/images/valentina_bags_and_wallets_1791643664382.jpg',
    organisersAndPouches: '/src/assets/images/valentina_organisers_and_pouches_1791643684585.jpg',
  },
};

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
