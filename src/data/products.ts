import {
  StudioAngle,
  StudioCategoryShape,
} from '../utils/productImageGenerator';
import { VERIFIED_PHOTO_POOL } from './verifiedPhotoPool';
import { generateExpandedCatalogue } from './expandedCatalogue';

export interface ProductImage {
  url: string;
  alt: string;
  angle: StudioAngle;
  caption: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  colorHex: string;
  secondaryOption: string;
  price: number;
  compareAtPrice?: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockQuantity: number;
  images: ProductImage[];
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  department?:
    | 'Jewellery'
    | 'Handbags & Purses'
    | 'Watches & Sunglasses'
    | 'Makeup & Beauty'
    | 'Hair Accessories'
    | 'More Accessories';
  category: string;
  subcategory?: string;
  brand?: string;
  occasion?: string[];
  photoSource?: string;
  sizingNote?: string;
  collections: string[];
  basePrice: number;
  compareAtPrice?: number;
  isNewArrival: boolean;
  isBestseller: boolean;
  createdAt: string;
  shortSummary: string;
  description: string;
  features: string[];
  specifications: Array<{ label: string; value: string }>;
  materialAndFinish: string;
  careInstructions: string[];
  secondaryDimensionLabel: string;
  variants: ProductVariant[];
  relatedSlugs: string[];
  faqs: ProductFAQ[];
  seoTitle: string;
  metaDescription: string;
}

interface RawVariantSeed {
  skuSuffix: string;
  color: string;
  colorHex: string;
  secondaryHex?: string;
  secondaryOption: string;
  price: number;
  compareAtPrice?: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock';
  stockQuantity: number;
}

function getGenuinePhotosForShape(shape: StudioCategoryShape, productId: string): string[] {
  const num = parseInt(productId.replace(/\D+/g, ''), 10) || 1;
  let poolUrls: string[] = [];

  if (shape.startsWith('earrings')) {
    const dj = VERIFIED_PHOTO_POOL.dummyJson
      .filter((d) => d.category === 'womens-jewellery')
      .flatMap((d) => d.images);
    const cm = VERIFIED_PHOTO_POOL.commons.earrings.map((c) => c.url);
    poolUrls = [...dj, ...cm];
  } else if (shape.startsWith('necklace')) {
    poolUrls = VERIFIED_PHOTO_POOL.commons.necklaces.map((c) => c.url);
  } else if (shape.startsWith('rings')) {
    poolUrls = VERIFIED_PHOTO_POOL.commons.rings.map((c) => c.url);
  } else if (shape.startsWith('bracelet')) {
    poolUrls = VERIFIED_PHOTO_POOL.commons.bracelets.map((c) => c.url);
  } else if (shape.startsWith('hair')) {
    poolUrls = [
      '/src/assets/images/valentina_hair_accessories_edit_1791643647760.jpg',
      ...VERIFIED_PHOTO_POOL.commons.hairAccessories.map((c) => c.url),
    ];
  } else if (shape.startsWith('bag') || shape.startsWith('wallet')) {
    const dj = VERIFIED_PHOTO_POOL.dummyJson
      .filter((d) => d.category === 'womens-bags')
      .flatMap((d) => d.images);
    const cm = VERIFIED_PHOTO_POOL.commons.handbags.map((c) => c.url);
    poolUrls = [
      ...dj,
      '/src/assets/images/valentina_bags_and_wallets_1791643664382.jpg',
      ...cm,
    ];
  } else {
    const dj = VERIFIED_PHOTO_POOL.dummyJson
      .filter((d) => d.category === 'womens-bags')
      .flatMap((d) => d.images);
    poolUrls = [
      '/src/assets/images/valentina_organisers_and_pouches_1791643684585.jpg',
      ...dj,
    ];
  }

  if (poolUrls.length === 0) {
    poolUrls = ['/src/assets/images/valentina_jewellery_collection_1791643634883.jpg'];
  }

  return [
    poolUrls[(num * 2) % poolUrls.length],
    poolUrls[(num * 2 + 1) % poolUrls.length],
    poolUrls[(num * 2 + 2) % poolUrls.length],
    poolUrls[(num * 2 + 3) % poolUrls.length],
  ];
}

function buildVariants(
  productId: string,
  productName: string,
  skuPrefix: string,
  shape: StudioCategoryShape,
  seeds: RawVariantSeed[]
): ProductVariant[] {
  const angles: Array<{ angle: StudioAngle; label: string }> = [
    { angle: 'front', label: 'Primary product photograph' },
    { angle: 'profile', label: 'Scale and silhouette view' },
    { angle: 'detail', label: 'Finish and clasp detail' },
    { angle: 'styled', label: 'Collection presentation' },
  ];

  const basePhotos = getGenuinePhotosForShape(shape, productId);

  return seeds.map((seed, idx) => {
    const sku = `${skuPrefix}-${seed.skuSuffix}`;
    const images: ProductImage[] = angles.map(({ angle, label }, aIdx) => ({
      url: basePhotos[(idx + aIdx) % basePhotos.length],
      alt: `${productName} in ${seed.color} (${seed.secondaryOption}) — ${label}`,
      angle,
      caption: `${label} · ${seed.color} · ${seed.secondaryOption}`,
    }));

    return {
      id: `${productId}-v${idx + 1}`,
      sku,
      color: seed.color,
      colorHex: seed.colorHex,
      secondaryOption: seed.secondaryOption,
      price: seed.price,
      compareAtPrice: seed.compareAtPrice,
      stockStatus: seed.stockStatus,
      stockQuantity: seed.stockQuantity,
      images,
    };
  });
}

const INITIAL_PRODUCTS: Product[] = [
  // ==========================================
  // 1–6: EARRINGS (6 Products)
  // ==========================================
  {
    id: 'prod-01',
    slug: 'pearl-drop-earrings',
    name: 'Pearl Drop Earrings',
    category: 'Earrings',
    collections: ['jewellery', 'earrings'],
    basePrice: 1290,
    compareAtPrice: 1590,
    isNewArrival: true,
    isBestseller: true,
    createdAt: '2026-09-28',
    shortSummary:
      'Luminous simulated baroque pearls suspended from hinged huggie clasps for graceful movement.',
    description:
      'Designed to bring soft luminosity to both everyday kurtas and evening silhouettes, the Pearl Drop Earrings pair organic-shaped faux baroque pearls with sleek metallic huggie hoops. The balanced drop articulates gently with every turn of the head while remaining lightweight enough for all-day wear.',
    features: [
      'Secure hinged huggie click closure that requires no separate backings',
      'Detachable pearl drop charm allows you to wear the hoops solo',
      'Smooth high-polish metallic finish in three signature tones',
      'Balanced lightweight construction suitable for extended wear',
    ],
    specifications: [
      { label: 'Drop Length', value: '22mm (Petite) / 28mm (Classic) / 35mm (Elongated)' },
      { label: 'Single Earring Weight', value: '3.4 grams' },
      { label: 'Closure Type', value: 'Hinged Click-Top Huggie' },
      { label: 'Country of Origin', value: 'India (Demo Catalogue Item)' },
    ],
    materialAndFinish:
      'Brass alloy base with electroplated gold, silver or rose-gold tone finish and high-lustre glass-core simulated pearls.',
    careInstructions: [
      'Wipe gently with a soft, dry lint-free cloth after each wear.',
      'Apply perfume, hairspray and lotions prior to putting on your earrings.',
      'Store in an individual compartment inside a dry jewellery box.',
    ],
    secondaryDimensionLabel: 'Drop Style & Length',
    variants: buildVariants('prod-01', 'Pearl Drop Earrings', 'VAL-EAR-001', 'earrings-drop', [
      {
        skuSuffix: 'GLD-CLS',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Classic Baroque Drop (28mm)',
        price: 1290,
        compareAtPrice: 1590,
        stockStatus: 'in_stock',
        stockQuantity: 18,
      },
      {
        skuSuffix: 'GLD-PET',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Petite Huggie Drop (22mm)',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'GLD-ELG',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Elongated Teardrop (35mm)',
        price: 1390,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
      {
        skuSuffix: 'SLV-CLS',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Classic Baroque Drop (28mm)',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'RSG-CLS',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryHex: '#FDF4F0',
        secondaryOption: 'Classic Baroque Drop (28mm)',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'RSG-ELG',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryHex: '#FDF4F0',
        secondaryOption: 'Elongated Teardrop (35mm)',
        price: 1390,
        stockStatus: 'out_of_stock',
        stockQuantity: 0,
      },
    ]),
    relatedSlugs: ['classic-gold-hoops', 'minimal-pendant-necklace', 'ivory-pearl-choker-necklace'],
    faqs: [
      {
        question: 'Can the pearl drops be removed from the hoops?',
        answer:
          'Yes, the pearl charm slides off the huggie hoop so you can wear the plain metallic hoops on their own.',
      },
      {
        question: 'Are these heavy on the earlobes?',
        answer:
          'Each earring weighs approximately 3.4 grams, engineered to feel comfortable for daytime and evening events.',
      },
    ],
    seoTitle: 'Pearl Drop Earrings in Gold, Silver & Rose Gold | VALENTINA',
    metaDescription:
      'Shop Pearl Drop Earrings at VALENTINA. Features detachable simulated baroque pearl drops on hinged huggie hoops in gold, silver and rose-gold tones.',
  },
  {
    id: 'prod-02',
    slug: 'classic-gold-hoops',
    name: 'Classic Gold Hoops',
    category: 'Earrings',
    collections: ['jewellery', 'earrings'],
    basePrice: 1090,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-15',
    shortSummary:
      'Hollow-core tubular hoops offering bold visual presence without heaviness on the ear.',
    description:
      'An indispensable wardrobe anchor, our Classic Gold Hoops are crafted with a rounded hollow-tube silhouette that catches light from every angle while remaining feather-light. Available across three diameters and three metallic finishes to suit both second-piercing stacks and statement solo wear.',
    features: [
      'Hollow tubular construction prevents earlobe tugging',
      'Seamless snap-bar closure for a clean, uninterrupted profile',
      'Available in 20mm Everyday, 30mm Classic and 42mm Statement diameters',
      'Polished mirror finish that pairs effortlessly with casual or formal attire',
    ],
    specifications: [
      { label: 'Tube Thickness', value: '4mm rounded profile' },
      { label: 'Available Diameters', value: '20mm / 30mm / 42mm' },
      { label: 'Closure', value: 'Hinged Saddle Snap Post' },
    ],
    materialAndFinish:
      'Lightweight brass tube with protective lacquer coating over gold, silver or rose-gold tone plating.',
    careInstructions: [
      'Avoid contact with water, sanitiser and harsh chemicals.',
      'Fasten the clasp when storing to maintain hinge alignment.',
    ],
    secondaryDimensionLabel: 'Hoop Diameter',
    variants: buildVariants('prod-02', 'Classic Gold Hoops', 'VAL-EAR-002', 'earrings-hoop', [
      {
        skuSuffix: 'GLD-20',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: '20mm Everyday Petite',
        price: 990,
        stockStatus: 'in_stock',
        stockQuantity: 22,
      },
      {
        skuSuffix: 'GLD-30',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: '30mm Classic Midi',
        price: 1090,
        stockStatus: 'in_stock',
        stockQuantity: 19,
      },
      {
        skuSuffix: 'GLD-42',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: '42mm Statement Maxi',
        price: 1250,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'SLV-30',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: '30mm Classic Midi',
        price: 1090,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'RSG-30',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryOption: '30mm Classic Midi',
        price: 1090,
        stockStatus: 'low_stock',
        stockQuantity: 4,
      },
    ]),
    relatedSlugs: ['pearl-drop-earrings', 'molten-wave-huggie-hoops', 'stackable-gold-rings'],
    faqs: [
      {
        question: 'Which hoop size is best for daily office wear?',
        answer:
          'The 20mm Everyday Petite and 30mm Classic Midi sizes sit comfortably close to the jawline and won’t catch on scarves or collars.',
      },
    ],
    seoTitle: 'Classic Gold Hoops — 20mm, 30mm & 42mm Hoop Earrings | VALENTINA',
    metaDescription:
      'Discover Classic Gold Hoops at VALENTINA. Lightweight hollow-core tubular hoop earrings in 20mm, 30mm and 42mm sizes across gold, silver and rose-gold tones.',
  },
  {
    id: 'prod-03',
    slug: 'sculpted-botanical-studs',
    name: 'Sculpted Botanical Studs',
    category: 'Earrings',
    collections: ['jewellery', 'earrings'],
    basePrice: 890,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-02',
    shortSummary:
      'Softly fluted petal studs that sit flush against the earlobe with understated architectural texture.',
    description:
      'Inspired by pressed botanical forms, the Sculpted Botanical Studs feature gently undulating petals with a satin-brushed centre and polished edges. Designed with a slightly oversized comfort disc backing so the stud sits upright on the lobe without drooping.',
    features: [
      'Textured satin-and-polish contrast catches soft ambient light',
      'Wide comfort butterfly clutch keeps the stud sitting flush',
      'Available in both Mini Petal (12mm) and Statement Bloom (18mm) sizes',
    ],
    specifications: [
      { label: 'Dimensions', value: '12mm or 18mm diameter' },
      { label: 'Post Material', value: 'Hypoallergenic-style stainless steel post' },
      { label: 'Backing', value: 'Comfort Disc Push Back' },
    ],
    materialAndFinish: 'Textured alloy casting with satin-matte and high-polish dual finish.',
    careInstructions: [
      'Clean gently with a dry microfibre cloth.',
      'Store on an earring card to protect the post from bending.',
    ],
    secondaryDimensionLabel: 'Stud Proportion',
    variants: buildVariants('prod-03', 'Sculpted Botanical Studs', 'VAL-EAR-003', 'earrings-stud', [
      {
        skuSuffix: 'GLD-12',
        color: 'Brushed Gold Tone',
        colorHex: '#CBA358',
        secondaryOption: '12mm Petite Petal',
        price: 890,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'GLD-18',
        color: 'Brushed Gold Tone',
        colorHex: '#CBA358',
        secondaryOption: '18mm Statement Bloom',
        price: 990,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'SLV-12',
        color: 'Brushed Silver Tone',
        colorHex: '#BFC5C9',
        secondaryOption: '12mm Petite Petal',
        price: 890,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'RSG-18',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryOption: '18mm Statement Bloom',
        price: 990,
        stockStatus: 'low_stock',
        stockQuantity: 2,
      },
    ]),
    relatedSlugs: ['pearl-drop-earrings', 'celestial-crystal-ear-climbers', 'minimal-pendant-necklace'],
    faqs: [
      {
        question: 'Do these studs droop forward on the ear?',
        answer:
          'No, they include a wide disc backing designed to support the stud evenly against the earlobe.',
      },
    ],
    seoTitle: 'Sculpted Botanical Studs — Floral Gold & Silver Stud Earrings | VALENTINA',
    metaDescription:
      'Shop Sculpted Botanical Studs at VALENTINA. Fluted petal stud earrings in 12mm and 18mm sizes with brushed gold, silver and rose-gold finishes.',
  },
  {
    id: 'prod-04',
    slug: 'celestial-crystal-ear-climbers',
    name: 'Celestial Crystal Ear Climbers',
    category: 'Earrings',
    collections: ['jewellery', 'earrings'],
    basePrice: 1150,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-09-30',
    shortSummary:
      'Curved constellation ear crawlers set with graduated cubic zirconia stones for a multi-pierced look.',
    description:
      'Create the illusion of a curated ear stack using only a single piercing. The Celestial Crystal Ear Climbers sweep gracefully along the natural curve of the lobe, featuring five graduated glass crystals secured in low-profile bezel and prong settings.',
    features: [
      'Requires only one standard earlobe piercing per ear',
      'Smoothly contoured wire hook adjusts gently to secure along the lobe',
      'Graduated faceted crystals offer subtle evening sparkle',
    ],
    specifications: [
      { label: 'Sweep Length', value: '21mm curved arc' },
      { label: 'Stone Type', value: 'Faceted Cubic Zirconia / Glass Crystal' },
      { label: 'Closure', value: 'Contoured Ear-Pin Sweep' },
    ],
    materialAndFinish: 'Polished brass base with rhodium or gold-tone electroplating and prong-set stones.',
    careInstructions: [
      'Buff crystals gently with a soft cloth to remove skin oils.',
      'Store flat in a lined compartment.',
    ],
    secondaryDimensionLabel: 'Stone Cut & Setting',
    variants: buildVariants('prod-04', 'Celestial Crystal Ear Climbers', 'VAL-EAR-004', 'earrings-stud', [
      {
        skuSuffix: 'GLD-CLR',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Clear Marquise Arc',
        price: 1150,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'SLV-CLR',
        color: 'Sterling Silver Tone',
        colorHex: '#C8CDD0',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Clear Marquise Arc',
        price: 1150,
        stockStatus: 'in_stock',
        stockQuantity: 16,
      },
      {
        skuSuffix: 'GLD-CHM',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#E8D5B5',
        secondaryOption: 'Champagne Round Constellation',
        price: 1220,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'RSG-CLR',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Clear Marquise Arc',
        price: 1150,
        stockStatus: 'in_stock',
        stockQuantity: 7,
      },
    ]),
    relatedSlugs: ['sculpted-botanical-studs', 'crystal-tennis-slider-bracelet', 'baguette-stone-solitaire-ring'],
    faqs: [
      {
        question: 'How do ear climbers stay in place?',
        answer:
          'You insert the long curved wire through your piercing like a hook, then rotate the climber upward so the back wire rests snugly behind your lobe.',
      },
    ],
    seoTitle: 'Celestial Crystal Ear Climbers & Ear Crawlers | VALENTINA',
    metaDescription:
      'Explore Celestial Crystal Ear Climbers at VALENTINA. Curved crystal ear crawlers in gold, silver and rose-gold tones for an effortless stacked ear look.',
  },
  {
    id: 'prod-05',
    slug: 'molten-wave-huggie-hoops',
    name: 'Molten Wave Huggie Hoops',
    category: 'Earrings',
    collections: ['jewellery', 'earrings'],
    basePrice: 1190,
    isNewArrival: false,
    isBestseller: false,
    createdAt: '2026-08-22',
    shortSummary:
      'Organic wavy-contour hoops inspired by fluid metal, finished with a tactile rippled surface.',
    description:
      'Moving away from rigid geometry, the Molten Wave Huggie Hoops feature an asymmetric, softly rippled silhouette that reflects light like sunlit water. Designed to hug the ear closely, they transition seamlessly from crisp daytime tailoring to festive evening wear.',
    features: [
      'Sculpted organic wave profile with high-shine crevices',
      'Snug huggie fit that works for first or second lobe piercings',
      'Offered in Smooth Molten and Hammered Ripple surface textures',
    ],
    specifications: [
      { label: 'Outer Diameter', value: '18mm (Huggie) / 26mm (Midi Wave)' },
      { label: 'Band Width', value: '5.5mm organic contour' },
      { label: 'Closure', value: 'Integrated Click Hinge' },
    ],
    materialAndFinish: 'Cast alloy with high-polish metallic plating.',
    careInstructions: [
      'Keep away from moisture and store in a dry pouch after wear.',
    ],
    secondaryDimensionLabel: 'Texture & Size',
    variants: buildVariants('prod-05', 'Molten Wave Huggie Hoops', 'VAL-EAR-005', 'earrings-hoop', [
      {
        skuSuffix: 'GLD-18-SM',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: '18mm Smooth Molten',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 13,
      },
      {
        skuSuffix: 'GLD-26-HM',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: '26mm Hammered Ripple',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'SLV-18-SM',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: '18mm Smooth Molten',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'SLV-26-HM',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: '26mm Hammered Ripple',
        price: 1290,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['classic-gold-hoops', 'dome-signet-statement-ring', 'sculpted-open-cuff-bangle'],
    faqs: [
      {
        question: 'Can I sleep in these huggie hoops?',
        answer:
          'We recommend removing all fashion jewellery before sleeping or showering to preserve the plating and hinge mechanism.',
      },
    ],
    seoTitle: 'Molten Wave Huggie Hoops — Sculpted Wavy Earrings | VALENTINA',
    metaDescription:
      'Shop Molten Wave Huggie Hoops at VALENTINA. Organic wavy hoop earrings in 18mm and 26mm sizes across gold and silver tones.',
  },
  {
    id: 'prod-06',
    slug: 'chandelier-pearl-cluster-drops',
    name: 'Chandelier Pearl Cluster Drops',
    category: 'Earrings',
    collections: ['jewellery', 'earrings'],
    basePrice: 1490,
    compareAtPrice: 1790,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-05',
    shortSummary:
      'Tiered cascades of petite simulated pearls and fine links crafted for weddings, festivities and dinners.',
    description:
      'When the occasion calls for a refined statement, the Chandelier Pearl Cluster Drops deliver graceful movement without overwhelming your neckline. Delicate metallic links suspend graduated clusters of simulated pearls that sway softly with every step.',
    features: [
      'Articulated multi-tier link structure for fluid movement',
      'Lightweight faux-pearl clusters prevent ear fatigue during long events',
      'Comfortable post with wide butterfly support backing',
    ],
    specifications: [
      { label: 'Total Drop Length', value: '44mm (Two-Tier) / 56mm (Three-Tier)' },
      { label: 'Weight per Earring', value: '4.8 grams' },
      { label: 'Closure', value: 'Push-Back Post with Support Disc' },
    ],
    materialAndFinish: 'Gold or champagne-silver tone plated brass links with glass-pearl beads.',
    careInstructions: [
      'Lay flat in your jewellery organiser so the articulated links do not kink.',
    ],
    secondaryDimensionLabel: 'Tier Length',
    variants: buildVariants('prod-06', 'Chandelier Pearl Cluster Drops', 'VAL-EAR-006', 'earrings-drop', [
      {
        skuSuffix: 'GLD-2T',
        color: 'Antique Gold & Ivory Pearl',
        colorHex: '#C5A059',
        secondaryHex: '#F9F5EB',
        secondaryOption: 'Two-Tier Cascade (44mm)',
        price: 1490,
        compareAtPrice: 1790,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'GLD-3T',
        color: 'Antique Gold & Ivory Pearl',
        colorHex: '#C5A059',
        secondaryHex: '#F9F5EB',
        secondaryOption: 'Three-Tier Statement (56mm)',
        price: 1650,
        compareAtPrice: 1950,
        stockStatus: 'in_stock',
        stockQuantity: 7,
      },
      {
        skuSuffix: 'RSG-2T',
        color: 'Rose Gold & Blush Pearl',
        colorHex: '#D9A193',
        secondaryHex: '#F9ECE8',
        secondaryOption: 'Two-Tier Cascade (44mm)',
        price: 1490,
        stockStatus: 'in_stock',
        stockQuantity: 6,
      },
      {
        skuSuffix: 'SLV-3T',
        color: 'Silver & Cool White Pearl',
        colorHex: '#C8CDD0',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Three-Tier Statement (56mm)',
        price: 1650,
        stockStatus: 'low_stock',
        stockQuantity: 2,
      },
    ]),
    relatedSlugs: ['pearl-drop-earrings', 'ivory-pearl-choker-necklace', 'pearl-embellished-hair-pins'],
    faqs: [
      {
        question: 'Do these pair well with Indian festive wear?',
        answer:
          'Yes, the Antique Gold and Ivory Pearl combination is specifically designed to complement silk sarees, lehengas, and festive fusion ensembles.',
      },
    ],
    seoTitle: 'Chandelier Pearl Cluster Drop Earrings for Occasions | VALENTINA',
    metaDescription:
      'Discover Chandelier Pearl Cluster Drops at VALENTINA. Tiered pearl statement earrings in two-tier and three-tier lengths for festive and evening wear.',
  },

  // ==========================================
  // 7–11: NECKLACES (5 Products)
  // ==========================================
  {
    id: 'prod-07',
    slug: 'minimal-pendant-necklace',
    name: 'Minimal Pendant Necklace',
    category: 'Necklaces',
    collections: ['jewellery', 'necklaces'],
    basePrice: 1390,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-18',
    shortSummary:
      'A fine cable chain suspending a tactile organic medallion pendant with a 5cm extender.',
    description:
      'Created to be the piece you reach for every morning without a second thought, the Minimal Pendant Necklace suspends a softly sculpted medallion on a fine, light-catching chain. The integrated extender loops allow you to position the pendant at your collarbone or lower along a V-neckline.',
    features: [
      'Adjustable lobster clasp with three extender loops (+5cm)',
      'Pendant slides freely along the chain for natural centering',
      'Choice of Sunburst Disc, Organic Pebble, or Mother-of-Pearl Inlay motifs',
    ],
    specifications: [
      { label: 'Chain Length', value: '40cm Collar / 45cm Princess (+5cm extender)' },
      { label: 'Pendant Diameter', value: '14mm' },
      { label: 'Clasp', value: 'Spring Lobster Clasp' },
    ],
    materialAndFinish: 'Electroplated brass chain and pendant with protective clear topcoat.',
    careInstructions: [
      'Fasten the clasp before storing to prevent chain knots.',
      'Avoid spraying perfume directly onto the chain.',
    ],
    secondaryDimensionLabel: 'Pendant Style & Chain Length',
    variants: buildVariants('prod-07', 'Minimal Pendant Necklace', 'VAL-NCK-001', 'necklace-pendant', [
      {
        skuSuffix: 'GLD-PEB-45',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Organic Pebble · 45cm Chain',
        price: 1390,
        stockStatus: 'in_stock',
        stockQuantity: 20,
      },
      {
        skuSuffix: 'GLD-SUN-45',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Sunburst Medallion · 45cm Chain',
        price: 1450,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'GLD-PEB-40',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Organic Pebble · 40cm Collar',
        price: 1350,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'SLV-PEB-45',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: 'Organic Pebble · 45cm Chain',
        price: 1390,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'RSG-SUN-45',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryOption: 'Sunburst Medallion · 45cm Chain',
        price: 1450,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['layered-herringbone-chain-necklace', 'pearl-drop-earrings', 'elegant-charm-bracelet'],
    faqs: [
      {
        question: 'Can I adjust the length to wear with different necklines?',
        answer:
          'Yes, both the 40cm and 45cm chains include a 5cm extender chain so you can customise where the pendant rests.',
      },
    ],
    seoTitle: 'Minimal Pendant Necklace — Everyday Gold & Silver Chains | VALENTINA',
    metaDescription:
      'Shop the Minimal Pendant Necklace at VALENTINA. Available in Organic Pebble and Sunburst Medallion styles across 40cm and 45cm adjustable chains.',
  },
  {
    id: 'prod-08',
    slug: 'layered-herringbone-chain-necklace',
    name: 'Layered Herringbone Chain Necklace',
    category: 'Necklaces',
    collections: ['jewellery', 'necklaces'],
    basePrice: 1690,
    compareAtPrice: 1990,
    isNewArrival: true,
    isBestseller: true,
    createdAt: '2026-09-25',
    shortSummary:
      'A pre-styled duo combining a liquid-smooth flat herringbone snake chain with a delicate link strand.',
    description:
      'Enjoy the polish of a layered neck stack with a single clasp. The Layered Herringbone Chain Necklace unites a supple 3mm flat snake chain at the collarbone with a longer satellite or rope chain below, engineered with a spacing bar to help reduce tangling during wear.',
    features: [
      'Single-clasp dual strand construction simplifies layering',
      'Flat herringbone chain lies smoothly against the collarbone',
      'Includes a 5cm extension tail with a polished droplet charm',
    ],
    specifications: [
      { label: 'Inner Strand Length', value: '39cm' },
      { label: 'Outer Strand Length', value: '44cm (+5cm extender)' },
      { label: 'Chain Width', value: '3mm flat herringbone + 1.5mm link chain' },
    ],
    materialAndFinish: 'Polished brass alloy with gold, silver or dual-tone plating.',
    careInstructions: [
      'Always store flat or hanging—never coil a herringbone chain tightly as sharp bends can crease flat links.',
    ],
    secondaryDimensionLabel: 'Layer Combination',
    variants: buildVariants('prod-08', 'Layered Herringbone Chain Necklace', 'VAL-NCK-002', 'necklace-layered', [
      {
        skuSuffix: 'GLD-SAT',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Herringbone + Beaded Satellite Duo',
        price: 1690,
        compareAtPrice: 1990,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'GLD-ROP',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Herringbone + Twisted Rope Duo',
        price: 1750,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'SLV-SAT',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: 'Herringbone + Beaded Satellite Duo',
        price: 1690,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'MIX-DUO',
        color: 'Mixed Gold & Silver Two-Tone',
        colorHex: '#C9B88A',
        secondaryHex: '#C5C9CC',
        secondaryOption: 'Gold Herringbone + Silver Link Duo',
        price: 1790,
        stockStatus: 'low_stock',
        stockQuantity: 4,
      },
    ]),
    relatedSlugs: ['minimal-pendant-necklace', 'classic-gold-hoops', 'travel-jewellery-organiser'],
    faqs: [
      {
        question: 'How should I store a flat herringbone chain?',
        answer:
          'Lay it flat or hang it on a necklace hook inside a jewellery organiser so the flat links remain smooth and kink-free.',
      },
    ],
    seoTitle: 'Layered Herringbone Chain Necklace — Pre-Styled Dual Chains | VALENTINA',
    metaDescription:
      'Discover the Layered Herringbone Chain Necklace at VALENTINA. A pre-styled dual chain necklace in gold, silver and mixed two-tone finishes.',
  },
  {
    id: 'prod-09',
    slug: 'ivory-pearl-choker-necklace',
    name: 'Ivory Pearl Choker Necklace',
    category: 'Necklaces',
    collections: ['jewellery', 'necklaces'],
    basePrice: 1550,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-09-29',
    shortSummary:
      'Stationed simulated freshwater pearls spaced along a fine metallic chain for modern lightness.',
    description:
      'Reimagining the classic pearl strand with contemporary airiness, the Ivory Pearl Choker Necklace spaces luminous glass-core pearls along a fine metallic chain—or offers a full continuous strand option for timeless occasion dressing.',
    features: [
      'Lightweight modern take on traditional pearl neckwear',
      'Pairs effortlessly with both round-neck kurtas and Western evening dresses',
      'Adjustable clasp from 36cm choker fit to 42cm collarbone fit',
    ],
    specifications: [
      { label: 'Adjustable Length', value: '36cm to 42cm' },
      { label: 'Pearl Size', value: '5mm to 6mm organic rounds' },
      { label: 'Clasp', value: 'Lobster Clasp with Extender' },
    ],
    materialAndFinish: 'Simulated glass-core pearls with electroplated brass chain and findings.',
    careInstructions: [
      'Wipe pearls with a soft damp cloth if exposed to perspiration, then air dry completely before storing.',
    ],
    secondaryDimensionLabel: 'Strand Style',
    variants: buildVariants('prod-09', 'Ivory Pearl Choker Necklace', 'VAL-NCK-003', 'necklace-choker', [
      {
        skuSuffix: 'GLD-STN',
        color: 'Warm Ivory & Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#F9F5EB',
        secondaryOption: 'Spaced Station Chain (11 Pearls)',
        price: 1550,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'GLD-FUL',
        color: 'Warm Ivory & Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#F9F5EB',
        secondaryOption: 'Continuous Pearl Strand',
        price: 1790,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'SLV-STN',
        color: 'Cool Pearl & Silver Tone',
        colorHex: '#C5C9CC',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Spaced Station Chain (11 Pearls)',
        price: 1550,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'RSG-STN',
        color: 'Blush Pearl & Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryHex: '#F9ECE8',
        secondaryOption: 'Spaced Station Chain (11 Pearls)',
        price: 1550,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['pearl-drop-earrings', 'chandelier-pearl-cluster-drops', 'elegant-charm-bracelet'],
    faqs: [
      {
        question: 'Does this sit tightly like a traditional choker?',
        answer:
          'The 36cm–42cm adjustable chain lets you wear it as a relaxed collar choker or lower on the collarbone.',
      },
    ],
    seoTitle: 'Ivory Pearl Choker Necklace — Station & Full Strand Pearls | VALENTINA',
    metaDescription:
      'Shop the Ivory Pearl Choker Necklace at VALENTINA. Choose between spaced station chains and full continuous simulated pearl strands.',
  },
  {
    id: 'prod-10',
    slug: 'solitaire-bezel-drop-lariat',
    name: 'Solitaire Bezel Drop Lariat',
    category: 'Necklaces',
    collections: ['jewellery', 'necklaces'],
    basePrice: 1490,
    isNewArrival: false,
    isBestseller: false,
    createdAt: '2026-08-29',
    shortSummary:
      'A sleek Y-shaped lariat necklace with two bezel-set solitaire crystals that elongate the neckline.',
    description:
      'Designed to complement collared shirts, blazers and plunging necklines, the Solitaire Bezel Drop Lariat features a delicate Y-drop chain accented with two bezel-set cubic zirconia stones that catch the light subtly with every movement.',
    features: [
      'Elongating Y-drop silhouette with 6cm vertical drop tail',
      'Smooth bezel settings won’t snag on delicate silk or knit fabrics',
      'Adjustable collar length for tailored placement',
    ],
    specifications: [
      { label: 'Necklace Circumference', value: '42cm (+5cm extender)' },
      { label: 'Vertical Drop', value: '6cm / 8cm option' },
      { label: 'Stone Setting', value: 'Smooth Full Bezel' },
    ],
    materialAndFinish: 'Electroplated brass chain with faceted glass-crystal solitaires.',
    careInstructions: [
      'Hang vertically or store in an individual zip compartment to keep the Y-drop tangle-free.',
    ],
    secondaryDimensionLabel: 'Drop Proportions',
    variants: buildVariants('prod-10', 'Solitaire Bezel Drop Lariat', 'VAL-NCK-004', 'necklace-pendant', [
      {
        skuSuffix: 'GLD-6CM',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: '6cm Subtle Y-Drop',
        price: 1490,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'GLD-8CM',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: '8cm Elongated Evening Drop',
        price: 1590,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'SLV-6CM',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: '6cm Subtle Y-Drop',
        price: 1490,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'RSG-6CM',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryOption: '6cm Subtle Y-Drop',
        price: 1490,
        stockStatus: 'in_stock',
        stockQuantity: 7,
      },
    ]),
    relatedSlugs: ['minimal-pendant-necklace', 'celestial-crystal-ear-climbers', 'crystal-tennis-slider-bracelet'],
    faqs: [
      {
        question: 'Is the Y-drop fixed or sliding?',
        answer:
          'The central bezel junction is fixed in place so the vertical drop remains symmetrical and won’t tighten around your neck.',
      },
    ],
    seoTitle: 'Solitaire Bezel Drop Lariat — Y-Drop Necklace for Women | VALENTINA',
    metaDescription:
      'Explore the Solitaire Bezel Drop Lariat at VALENTINA. A sleek Y-shaped necklace with bezel-set crystals in gold, silver and rose-gold tones.',
  },
  {
    id: 'prod-11',
    slug: 'emerald-cut-glass-pendant-chain',
    name: 'Emerald-Cut Glass Pendant Chain',
    category: 'Necklaces',
    collections: ['jewellery', 'necklaces'],
    basePrice: 1590,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-04',
    shortSummary:
      'An octagonal step-cut glass stone framed in a sleek gallery setting on a fine box chain.',
    description:
      'Bringing a refined touch of colour to neutral wardrobes, the Emerald-Cut Glass Pendant Chain showcases a step-cut octagonal glass stone suspended on a smooth box chain. Choose between verdant Emerald Green, Warm Champagne Topaz, or Clear Crystal.',
    features: [
      'Architectural step-cut glass stone in an open-back gallery setting',
      'Smooth 1.2mm box chain offers structured drape',
      'Available in three jewel-toned stone shades',
    ],
    specifications: [
      { label: 'Pendant Size', value: '10mm × 14mm Octagonal Cut' },
      { label: 'Chain Length', value: '45cm (+5cm extender)' },
      { label: 'Chain Style', value: 'Fine Box Chain / Cable Chain' },
    ],
    materialAndFinish: 'Gold-tone or silver-tone plated brass with faceted glass stone.',
    careInstructions: [
      'Clean the front and back of the glass stone with a soft dry cloth to maintain clarity.',
    ],
    secondaryDimensionLabel: 'Chain Style & Length',
    variants: buildVariants('prod-11', 'Emerald-Cut Glass Pendant Chain', 'VAL-NCK-005', 'necklace-pendant', [
      {
        skuSuffix: 'EMR-GLD-BOX',
        color: 'Emerald Green & Gold Tone',
        colorHex: '#2E6F40',
        secondaryHex: '#D4AF37',
        secondaryOption: '45cm Box Chain',
        price: 1590,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'CHM-GLD-BOX',
        color: 'Champagne Quartz & Gold Tone',
        colorHex: '#C8A97E',
        secondaryHex: '#D4AF37',
        secondaryOption: '45cm Box Chain',
        price: 1590,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'CLR-SLV-CBL',
        color: 'Clear Crystal & Silver Tone',
        colorHex: '#C5C9CC',
        secondaryHex: '#FFFFFF',
        secondaryOption: '42cm Cable Chain',
        price: 1550,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'EMR-GLD-CBL',
        color: 'Emerald Green & Gold Tone',
        colorHex: '#2E6F40',
        secondaryHex: '#D4AF37',
        secondaryOption: '50cm Long Matinee Chain',
        price: 1650,
        stockStatus: 'low_stock',
        stockQuantity: 2,
      },
    ]),
    relatedSlugs: ['baguette-stone-solitaire-ring', 'minimal-pendant-necklace', 'pearl-drop-earrings'],
    faqs: [
      {
        question: 'Is the stone natural emerald?',
        answer:
          'No, this is a fashion accessory featuring a precision-cut faceted glass stone in an emerald-green hue.',
      },
    ],
    seoTitle: 'Emerald-Cut Glass Pendant Chain Necklace | VALENTINA',
    metaDescription:
      'Shop the Emerald-Cut Glass Pendant Chain at VALENTINA. Features a step-cut octagonal glass stone in Emerald Green, Champagne or Clear Crystal.',
  },

  // ==========================================
  // 12–15: RINGS (4 Products)
  // ==========================================
  {
    id: 'prod-12',
    slug: 'stackable-gold-rings',
    name: 'Stackable Gold Rings',
    category: 'Rings',
    collections: ['jewellery', 'rings'],
    basePrice: 1190,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-20',
    shortSummary:
      'A coordinated set of three fixed-size stacking bands combining smooth, rope-twisted and beaded textures.',
    description:
      'Curated to be worn stacked together on a single finger or spread across your hand, our Stackable Gold Rings bring subtle textural interplay to your everyday gestures. Each fixed-size trio includes one smooth dome band, one twisted rope band, and one micro-beaded band.',
    features: [
      'Coordinated set of 3 distinct band textures',
      'True fixed Indian ring sizes (not open-backed)',
      'Smooth inner band profile for comfortable multi-ring stacking',
    ],
    specifications: [
      { label: 'Band Widths', value: '1.8mm, 2.0mm and 2.2mm' },
      { label: 'Sizing System', value: 'Fixed Indian Ring Sizes 10, 12, 14, 16' },
      { label: 'Pack Contents', value: 'Set of 3 Coordinated Rings' },
    ],
    materialAndFinish: 'Electroplated brass bands with high-polish finish.',
    careInstructions: [
      'Remove rings before washing hands, applying hand cream or exercising.',
    ],
    secondaryDimensionLabel: 'Indian Ring Size',
    variants: buildVariants('prod-12', 'Stackable Gold Rings', 'VAL-RNG-001', 'rings-stack', [
      {
        skuSuffix: 'GLD-SZ10',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Indian Size 10 (15.9mm inner dia)',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'GLD-SZ12',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Indian Size 12 (16.5mm inner dia)',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 18,
      },
      {
        skuSuffix: 'GLD-SZ14',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Indian Size 14 (17.2mm inner dia)',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'GLD-SZ16',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Indian Size 16 (17.8mm inner dia)',
        price: 1190,
        stockStatus: 'low_stock',
        stockQuantity: 4,
      },
      {
        skuSuffix: 'SLV-SZ12',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: 'Indian Size 12 (16.5mm inner dia)',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'MIX-SZ14',
        color: 'Mixed Gold & Silver Trio',
        colorHex: '#C9B88A',
        secondaryHex: '#C5C9CC',
        secondaryOption: 'Indian Size 14 (17.2mm inner dia)',
        price: 1250,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
    ]),
    relatedSlugs: ['dome-signet-statement-ring', 'baguette-stone-solitaire-ring', 'classic-gold-hoops'],
    faqs: [
      {
        question: 'Are these rings adjustable?',
        answer:
          'No, these are fixed-band rings offered in standard Indian sizes 10, 12, 14 and 16 for a secure, pinch-free fit.',
      },
    ],
    seoTitle: 'Stackable Gold Rings — Set of 3 Textured Stacking Bands | VALENTINA',
    metaDescription:
      'Shop Stackable Gold Rings at VALENTINA. A coordinated set of 3 smooth, rope and beaded bands in Indian ring sizes 10, 12, 14 and 16.',
  },
  {
    id: 'prod-13',
    slug: 'dome-signet-statement-ring',
    name: 'Dome Signet Statement Ring',
    category: 'Rings',
    collections: ['jewellery', 'rings'],
    basePrice: 1050,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-09-21',
    shortSummary:
      'A sleek modern signet silhouette with a softly curved oval bezel and tapered comfort shank.',
    description:
      'Balancing bold structure with feminine curvature, the Dome Signet Statement Ring features a low-profile oval face that looks equally striking on the index, middle or pinky finger. Choose between a pure mirror-polished face or an ivory enamel inlay.',
    features: [
      'Tapered band underside allows fingers to bend comfortably',
      'Hollowed interior dome keeps the ring balanced on the hand',
      'Fixed Indian sizing from Size 10 to Size 16',
    ],
    specifications: [
      { label: 'Face Width', value: '9mm oval signet top' },
      { label: 'Band Taper', value: '9mm top tapering to 3mm base' },
      { label: 'Fit Type', value: 'Fixed Band (Non-Adjustable)' },
    ],
    materialAndFinish: 'Cast brass alloy with polished plating and optional enamel inlay.',
    careInstructions: [
      'Buff gently with a dry cloth to remove fingerprints from the mirror signet face.',
    ],
    secondaryDimensionLabel: 'Indian Ring Size',
    variants: buildVariants('prod-13', 'Dome Signet Statement Ring', 'VAL-RNG-002', 'rings-signet', [
      {
        skuSuffix: 'GLD-POL-12',
        color: 'Mirror Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Indian Size 12 (16.5mm)',
        price: 1050,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'GLD-POL-14',
        color: 'Mirror Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Indian Size 14 (17.2mm)',
        price: 1050,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'IVR-GLD-12',
        color: 'Ivory Enamel & Gold Tone',
        colorHex: '#E8DCCB',
        secondaryHex: '#D4AF37',
        secondaryOption: 'Indian Size 12 (16.5mm)',
        price: 1150,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'SLV-POL-14',
        color: 'Mirror Silver Tone',
        colorHex: '#C5C9CC',
        secondaryOption: 'Indian Size 14 (17.2mm)',
        price: 1050,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
    ]),
    relatedSlugs: ['stackable-gold-rings', 'molten-wave-huggie-hoops', 'sculpted-open-cuff-bangle'],
    faqs: [
      {
        question: 'Does the signet ring feel bulky between fingers?',
        answer:
          'The band tapers down to 3mm on the sides and palm, so only the top dome is wide while the sides sit comfortably.',
      },
    ],
    seoTitle: 'Dome Signet Statement Ring — Gold, Silver & Enamel | VALENTINA',
    metaDescription:
      'Explore the Dome Signet Statement Ring at VALENTINA. Tapered comfort-fit signet rings in mirror gold, silver and ivory enamel finishes.',
  },
  {
    id: 'prod-14',
    slug: 'baguette-stone-solitaire-ring',
    name: 'Baguette Stone Solitaire Ring',
    category: 'Rings',
    collections: ['jewellery', 'rings'],
    basePrice: 1150,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-01',
    shortSummary:
      'An east-west set rectangular baguette crystal on a slim 1.8mm band ideal for solo wear or stacking.',
    description:
      'Set horizontally along the finger for a sleek contemporary profile, the Baguette Stone Solitaire Ring features a step-cut rectangular crystal nestled in a low four-prong gallery. Its low height makes it effortless to pair alongside plain stacking bands.',
    features: [
      'East-west horizontal stone orientation won’t catch on clothing',
      'Slim 1.8mm band stacks cleanly with other rings',
      'Fixed Indian ring sizes for accurate fit',
    ],
    specifications: [
      { label: 'Stone Dimensions', value: '4mm × 8mm East-West Baguette' },
      { label: 'Band Width', value: '1.8mm' },
      { label: 'Fit Type', value: 'Fixed Band (Sizes 10, 12, 14)' },
    ],
    materialAndFinish: 'Electroplated brass with step-cut cubic zirconia stone.',
    careInstructions: [
      'Avoid lotions building up beneath the stone setting; wipe dry after wear.',
    ],
    secondaryDimensionLabel: 'Indian Ring Size',
    variants: buildVariants('prod-14', 'Baguette Stone Solitaire Ring', 'VAL-RNG-003', 'rings-stone', [
      {
        skuSuffix: 'CLR-GLD-10',
        color: 'Clear Crystal & Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Indian Size 10 (15.9mm)',
        price: 1150,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'CLR-GLD-12',
        color: 'Clear Crystal & Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Indian Size 12 (16.5mm)',
        price: 1150,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'CHM-GLD-14',
        color: 'Champagne Stone & Gold Tone',
        colorHex: '#C8A97E',
        secondaryHex: '#D4AF37',
        secondaryOption: 'Indian Size 14 (17.2mm)',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 7,
      },
      {
        skuSuffix: 'CLR-SLV-12',
        color: 'Clear Crystal & Silver Tone',
        colorHex: '#C5C9CC',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Indian Size 12 (16.5mm)',
        price: 1150,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
    ]),
    relatedSlugs: ['stackable-gold-rings', 'emerald-cut-glass-pendant-chain', 'celestial-crystal-ear-climbers'],
    faqs: [
      {
        question: 'Can I stack this ring with the Stackable Gold Rings set?',
        answer:
          'Yes, the low-profile east-west setting is designed to sit neatly alongside smooth and textured stacking bands.',
      },
    ],
    seoTitle: 'Baguette Stone Solitaire Ring — East-West Crystal Band | VALENTINA',
    metaDescription:
      'Shop the Baguette Stone Solitaire Ring at VALENTINA. Features a horizontal step-cut crystal on a slim stacking band in gold and silver tones.',
  },
  {
    id: 'prod-15',
    slug: 'interlocking-two-tone-band-ring',
    name: 'Interlocking Two-Tone Band Ring',
    category: 'Rings',
    collections: ['jewellery', 'rings'],
    basePrice: 1290,
    isNewArrival: false,
    isBestseller: false,
    createdAt: '2026-09-04',
    shortSummary:
      'Two linked bands in contrasting metallic tones that roll smoothly onto the finger as a unified statement.',
    description:
      'Bridge the gap between gold and silver accessories with the Interlocking Two-Tone Band Ring. Two intertwined rings move fluidly together before settling into a sculptural overlap on the finger, making mixed-metal styling effortless.',
    features: [
      'Interlinked two-band construction bridges gold and silver jewellery',
      'Fluid rolling motion makes it comfortable to slide over knuckles',
      'Available in fixed Indian sizes 12, 14 and 16',
    ],
    specifications: [
      { label: 'Combined Width', value: '6mm on the finger' },
      { label: 'Individual Band Width', value: '3mm each' },
      { label: 'Fit Type', value: 'Fixed Interlocking Bands' },
    ],
    materialAndFinish: 'Dual-plated brass bands in contrasting metallic finishes.',
    careInstructions: [
      'Dry thoroughly between the interlocking bands if exposed to humidity.',
    ],
    secondaryDimensionLabel: 'Indian Ring Size',
    variants: buildVariants('prod-15', 'Interlocking Two-Tone Band Ring', 'VAL-RNG-004', 'rings-stack', [
      {
        skuSuffix: 'GLDSLV-12',
        color: 'Gold & Silver Two-Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#C5C9CC',
        secondaryOption: 'Indian Size 12 (16.5mm)',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 13,
      },
      {
        skuSuffix: 'GLDSLV-14',
        color: 'Gold & Silver Two-Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#C5C9CC',
        secondaryOption: 'Indian Size 14 (17.2mm)',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'RSGSLV-12',
        color: 'Rose Gold & Silver Two-Tone',
        colorHex: '#D9A193',
        secondaryHex: '#C5C9CC',
        secondaryOption: 'Indian Size 12 (16.5mm)',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'ALLGLD-16',
        color: 'Monochrome 18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryOption: 'Indian Size 16 (17.8mm)',
        price: 1290,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['layered-herringbone-chain-necklace', 'stackable-gold-rings', 'sculpted-open-cuff-bangle'],
    faqs: [
      {
        question: 'Can the two interlocking bands be separated?',
        answer:
          'They are permanently linked together so they always sit in a balanced crossover alignment.',
      },
    ],
    seoTitle: 'Interlocking Two-Tone Band Ring — Mixed Metal Ring | VALENTINA',
    metaDescription:
      'Discover the Interlocking Two-Tone Band Ring at VALENTINA. Linked gold and silver-tone rolling bands for effortless mixed-metal styling.',
  },

  // ==========================================
  // 16–18: BRACELETS (3 Products)
  // ==========================================
  {
    id: 'prod-16',
    slug: 'elegant-charm-bracelet',
    name: 'Elegant Charm Bracelet',
    category: 'Bracelets',
    collections: ['jewellery', 'bracelets'],
    basePrice: 1350,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-25',
    shortSummary:
      'An oval link wrist chain adorned with a luminous faux pearl, coin medallion and faceted crystal drop.',
    description:
      'Designed to bring subtle movement to your wrist, the Elegant Charm Bracelet pairs an elongated paperclip-and-oval link chain with three thoughtfully proportioned charms. The lobster clasp hooks into any link along the 3.5cm extender for a custom wrist fit.',
    features: [
      'Adjustable clasp fits wrist circumferences from 15cm to 19cm',
      'Balanced charm cluster sits neatly without catching on sleeves',
      'Choice of Pearl & Coin, Celestial Star, or Botanical Leaf charm edits',
    ],
    specifications: [
      { label: 'Chain Length', value: '16cm + 3.5cm adjustable extender' },
      { label: 'Link Profile', value: '4mm Oval Link Chain' },
      { label: 'Clasp', value: 'Lobster Clasp' },
    ],
    materialAndFinish: 'Electroplated brass chain with simulated pearl and glass crystal charms.',
    careInstructions: [
      'Remove before washing hands or applying wrist fragrance.',
    ],
    secondaryDimensionLabel: 'Charm Theme & Fit',
    variants: buildVariants('prod-16', 'Elegant Charm Bracelet', 'VAL-BRC-001', 'bracelet-charm', [
      {
        skuSuffix: 'GLD-PRL',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Pearl & Medallion Edit (16–19.5cm)',
        price: 1350,
        stockStatus: 'in_stock',
        stockQuantity: 16,
      },
      {
        skuSuffix: 'GLD-CEL',
        color: '18k Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Celestial Star & Crystal Edit (16–19.5cm)',
        price: 1390,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'SLV-PRL',
        color: 'Sterling Silver Tone',
        colorHex: '#C5C9CC',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Pearl & Medallion Edit (16–19.5cm)',
        price: 1350,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'RSG-PRL',
        color: 'Rose Gold Tone',
        colorHex: '#D9A193',
        secondaryHex: '#FDF4F0',
        secondaryOption: 'Pearl & Medallion Edit (16–19.5cm)',
        price: 1350,
        stockStatus: 'low_stock',
        stockQuantity: 4,
      },
    ]),
    relatedSlugs: ['minimal-pendant-necklace', 'pearl-drop-earrings', 'crystal-tennis-slider-bracelet'],
    faqs: [
      {
        question: 'Will this fit a petite wrist?',
        answer:
          'Yes, the lobster clasp can clip directly onto any oval link along the chain for a snug fit on petite wrists.',
      },
    ],
    seoTitle: 'Elegant Charm Bracelet — Adjustable Gold & Pearl Wrist Chain | VALENTINA',
    metaDescription:
      'Shop the Elegant Charm Bracelet at VALENTINA. Adjustable link bracelet featuring pearl, medallion and celestial charms in gold, silver and rose-gold tones.',
  },
  {
    id: 'prod-17',
    slug: 'sculpted-open-cuff-bangle',
    name: 'Sculpted Open Cuff Bangle',
    category: 'Bracelets',
    collections: ['jewellery', 'bracelets'],
    basePrice: 1450,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-09-27',
    shortSummary:
      'An architectural open-ended wrist cuff capped with twin organic spheres for easy slip-on wear.',
    description:
      'Clean, modern and effortless to put on with one hand, the Sculpted Open Cuff Bangle frames the wrist with an oval silhouette that prevents spinning. Available in Petite/Standard and Medium/Plus wrist proportions with either metallic sphere ends or faux-pearl terminals.',
    features: [
      'Oval ergonomic contour hugs the wrist naturally without rotating',
      'Slip-on open cuff design requires no clasp',
      'Offered in two dedicated wrist circumferences',
    ],
    specifications: [
      { label: 'Inner Diameter', value: '56mm (Petite/Standard) / 62mm (Medium/Plus)' },
      { label: 'Band Thickness', value: '4.5mm tapered wire' },
    ],
    materialAndFinish: 'Solid-feel brass alloy with high-polish plating.',
    careInstructions: [
      'Slide on over the narrow side of your wrist rather than bending the cuff repeatedly.',
    ],
    secondaryDimensionLabel: 'Wrist Size & Terminal Style',
    variants: buildVariants('prod-17', 'Sculpted Open Cuff Bangle', 'VAL-BRC-002', 'bracelet-cuff', [
      {
        skuSuffix: 'GLD-PRL-SM',
        color: '18k Gold & Pearl Ends',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Petite/Standard (56mm Inner Width)',
        price: 1450,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'GLD-PRL-MD',
        color: '18k Gold & Pearl Ends',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Medium/Plus (62mm Inner Width)',
        price: 1490,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'GLD-SPH-SM',
        color: 'All-Gold Sphere Ends',
        colorHex: '#D4AF37',
        secondaryOption: 'Petite/Standard (56mm Inner Width)',
        price: 1450,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'SLV-SPH-SM',
        color: 'Silver Sphere Ends',
        colorHex: '#C5C9CC',
        secondaryOption: 'Petite/Standard (56mm Inner Width)',
        price: 1450,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
    ]),
    relatedSlugs: ['dome-signet-statement-ring', 'molten-wave-huggie-hoops', 'elegant-charm-bracelet'],
    faqs: [
      {
        question: 'How do I put on an open cuff without bending the metal?',
        answer:
          'Turn your wrist sideways just above the wrist bone where it is narrowest, slip the opening over the side of your wrist, and rotate the cuff into place.',
      },
    ],
    seoTitle: 'Sculpted Open Cuff Bangle — Gold & Pearl Wrist Cuff | VALENTINA',
    metaDescription:
      'Explore the Sculpted Open Cuff Bangle at VALENTINA. Ergonomic oval open cuff bracelets in Petite/Standard and Medium/Plus sizes.',
  },
  {
    id: 'prod-18',
    slug: 'crystal-tennis-slider-bracelet',
    name: 'Crystal Tennis Slider Bracelet',
    category: 'Bracelets',
    collections: ['jewellery', 'bracelets'],
    basePrice: 1590,
    compareAtPrice: 1890,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-03',
    shortSummary:
      'A continuous row of faceted cubic zirconia stones paired with a silicone-lined bolo slider clasp.',
    description:
      'Combining classic evening brilliance with everyday adjustability, the Crystal Tennis Slider Bracelet features individually articulated stone settings that drape smoothly around the wrist. The smooth slider bead adjusts in seconds to fit any wrist size.',
    features: [
      'Silicone-lined slider bead glides smoothly and holds its position',
      'Articulated four-prong settings prevent flipping',
      'Available in 2.5mm Delicate and 3.5mm Statement stone widths',
    ],
    specifications: [
      { label: 'Adjustable Circumference', value: '14cm up to 22cm via bolo slider' },
      { label: 'Stone Width', value: '2.5mm or 3.5mm' },
      { label: 'Clasp', value: 'Adjustable Box-Chain Bolo Slider' },
    ],
    materialAndFinish: 'Electroplated brass settings with cubic zirconia stones.',
    careInstructions: [
      'Hold the end charm and slide the bead gently when adjusting.',
    ],
    secondaryDimensionLabel: 'Stone Width',
    variants: buildVariants('prod-18', 'Crystal Tennis Slider Bracelet', 'VAL-BRC-003', 'bracelet-tennis', [
      {
        skuSuffix: 'GLD-25',
        color: '18k Gold Tone & Clear Crystal',
        colorHex: '#D4AF37',
        secondaryHex: '#FFFFFF',
        secondaryOption: '2.5mm Delicate Row',
        price: 1590,
        compareAtPrice: 1890,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'GLD-35',
        color: '18k Gold Tone & Clear Crystal',
        colorHex: '#D4AF37',
        secondaryHex: '#FFFFFF',
        secondaryOption: '3.5mm Classic Statement Row',
        price: 1750,
        compareAtPrice: 2050,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'SLV-25',
        color: 'Sterling Silver Tone & Clear Crystal',
        colorHex: '#C5C9CC',
        secondaryHex: '#FFFFFF',
        secondaryOption: '2.5mm Delicate Row',
        price: 1590,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'RSG-25',
        color: 'Rose Gold Tone & Clear Crystal',
        colorHex: '#D9A193',
        secondaryHex: '#FFFFFF',
        secondaryOption: '2.5mm Delicate Row',
        price: 1590,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['celestial-crystal-ear-climbers', 'solitaire-bezel-drop-lariat', 'elegant-charm-bracelet'],
    faqs: [
      {
        question: 'Does the slider clasp loosen during the day?',
        answer:
          'The internal silicone grip inside the slider bead keeps the chain securely in place until you intentionally slide it.',
      },
    ],
    seoTitle: 'Crystal Tennis Slider Bracelet — Adjustable Bolo Bracelet | VALENTINA',
    metaDescription:
      'Shop the Crystal Tennis Slider Bracelet at VALENTINA. Adjustable bolo slider tennis bracelets in 2.5mm and 3.5mm stone widths across gold, silver and rose-gold.',
  },

  // ==========================================
  // 19–23: HAIR ACCESSORIES (5 Products)
  // ==========================================
  {
    id: 'prod-19',
    slug: 'satin-bow-hair-clip',
    name: 'Satin Bow Hair Clip',
    category: 'Hair Clips',
    collections: ['hair-accessories', 'hair-clips'],
    basePrice: 690,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-19',
    shortSummary:
      'A double-looped lustre satin ribbon bow mounted on a secure gold-tone French barrette clasp.',
    description:
      'Add a romantic finishing touch to half-up hairstyles, low ponytails or braided updos with our Satin Bow Hair Clip. Cut from heavy-drape matte-satin ribbon with neat diagonal tails, the bow retains its structured fullness throughout the day.',
    features: [
      'Spring-loaded French barrette clasp holds both fine and thick hair sections',
      'Double-layered bow loop maintains structured volume',
      'Available in Petite Tail and Long Flowing Ribbon Tail silhouettes',
    ],
    specifications: [
      { label: 'Bow Width', value: '13cm across loops' },
      { label: 'Tail Length', value: '9cm (Classic) / 18cm (Long Ribbon)' },
      { label: 'Clasp', value: '8cm Gold-Tone French Barrette' },
    ],
    materialAndFinish: 'Heavy-weight polyester satin ribbon with gold-tone steel barrette clasp.',
    careInstructions: [
      'Spot clean gently with cool water and mild soap if needed; air dry flat.',
    ],
    secondaryDimensionLabel: 'Bow Style & Tail Length',
    variants: buildVariants('prod-19', 'Satin Bow Hair Clip', 'VAL-HAR-001', 'hair-bow', [
      {
        skuSuffix: 'IVR-CLS',
        color: 'Warm Ivory Satin',
        colorHex: '#F3EDE2',
        secondaryHex: '#D4AF37',
        secondaryOption: 'Classic Structured Bow (9cm Tail)',
        price: 690,
        stockStatus: 'in_stock',
        stockQuantity: 24,
      },
      {
        skuSuffix: 'IVR-LNG',
        color: 'Warm Ivory Satin',
        colorHex: '#F3EDE2',
        secondaryHex: '#D4AF37',
        secondaryOption: 'Long Flowing Ribbon (18cm Tail)',
        price: 750,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'CHM-CLS',
        color: 'Champagne Gold Satin',
        colorHex: '#DEC9A8',
        secondaryHex: '#B89A64',
        secondaryOption: 'Classic Structured Bow (9cm Tail)',
        price: 690,
        stockStatus: 'in_stock',
        stockQuantity: 19,
      },
      {
        skuSuffix: 'BLK-LNG',
        color: 'Midnight Noir Satin',
        colorHex: '#262322',
        secondaryHex: '#D4AF37',
        secondaryOption: 'Long Flowing Ribbon (18cm Tail)',
        price: 750,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'BLS-CLS',
        color: 'Dusty Blush Satin',
        colorHex: '#E0B8B3',
        secondaryHex: '#D4AF37',
        secondaryOption: 'Classic Structured Bow (9cm Tail)',
        price: 690,
        stockStatus: 'low_stock',
        stockQuantity: 4,
      },
    ]),
    relatedSlugs: ['pastel-claw-clip', 'velvet-scrunchie-set', 'padded-hairband'],
    faqs: [
      {
        question: 'Can the barrette clasp hold a full ponytail?',
        answer:
          'It works best for half-up sections or clipped just above an elastic hair tie on a full ponytail for secure all-day hold.',
      },
    ],
    seoTitle: 'Satin Bow Hair Clip — Ivory, Champagne & Noir Hair Bows | VALENTINA',
    metaDescription:
      'Shop the Satin Bow Hair Clip at VALENTINA. Structured satin hair bows on French barrette clasps in Warm Ivory, Champagne, Dusty Blush and Noir.',
  },
  {
    id: 'prod-20',
    slug: 'pastel-claw-clip',
    name: 'Pastel Claw Clip',
    category: 'Hair Clips',
    collections: ['hair-accessories', 'hair-clips'],
    basePrice: 590,
    isNewArrival: true,
    isBestseller: true,
    createdAt: '2026-09-18',
    shortSummary:
      'Marbled cellulose acetate claw clips with rounded inner teeth for comfortable, crease-free updos.',
    description:
      'Crafted from glossy marbled cellulose acetate with a high-tension enclosed metal spring, the Pastel Claw Clip gathers hair into effortless French twists and half-up buns without pulling or snagging strands.',
    features: [
      'Smoothly polished rounded teeth are gentle on the scalp',
      'Strong enclosed hinge spring holds fine to thick hair securely',
      'Available in 7.5cm Midi and 11cm Full Updo sizes',
    ],
    specifications: [
      { label: 'Clip Length', value: '7.5cm (Midi) / 11cm (Maxi Updo)' },
      { label: 'Material', value: 'Polished Cellulose Acetate & Alloy Spring' },
    ],
    materialAndFinish: 'Gloss-finished marbled cellulose acetate.',
    careInstructions: [
      'Wipe clean with a dry cloth; keep spring dry.',
    ],
    secondaryDimensionLabel: 'Clip Size & Shape',
    variants: buildVariants('prod-20', 'Pastel Claw Clip', 'VAL-HAR-002', 'hair-claw', [
      {
        skuSuffix: 'BLSH-11',
        color: 'Rose Quartz Swirl',
        colorHex: '#E5C3BE',
        secondaryOption: '11cm Maxi Rectangular Claw',
        price: 650,
        stockStatus: 'in_stock',
        stockQuantity: 21,
      },
      {
        skuSuffix: 'BLSH-75',
        color: 'Rose Quartz Swirl',
        colorHex: '#E5C3BE',
        secondaryOption: '7.5cm Midi Curved Claw',
        price: 590,
        stockStatus: 'in_stock',
        stockQuantity: 16,
      },
      {
        skuSuffix: 'SAG-11',
        color: 'Pistachio Sage Marble',
        colorHex: '#A7B8A5',
        secondaryOption: '11cm Maxi Rectangular Claw',
        price: 650,
        stockStatus: 'in_stock',
        stockQuantity: 13,
      },
      {
        skuSuffix: 'IVR-11',
        color: 'Mother-of-Pearl Ivory',
        colorHex: '#F2ECE1',
        secondaryOption: '11cm Maxi Rectangular Claw',
        price: 650,
        stockStatus: 'in_stock',
        stockQuantity: 18,
      },
      {
        skuSuffix: 'TRT-11',
        color: 'Classic Amber Tortoiseshell',
        colorHex: '#8C5828',
        secondaryOption: '11cm Maxi Rectangular Claw',
        price: 650,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
    ]),
    relatedSlugs: ['satin-bow-hair-clip', 'velvet-scrunchie-set', 'pearl-embellished-hair-pins'],
    faqs: [
      {
        question: 'Which size should I choose for shoulder-length medium hair?',
        answer:
          'The 11cm Maxi Rectangular Claw holds a full twist for medium-to-long hair, while the 7.5cm Midi is ideal for half-up styles or finer hair.',
      },
    ],
    seoTitle: 'Pastel Claw Clip — Marbled Acetate Hair Claw Clips | VALENTINA',
    metaDescription:
      'Discover the Pastel Claw Clip at VALENTINA. Glossy marbled cellulose acetate hair clips in 7.5cm Midi and 11cm Maxi sizes.',
  },
  {
    id: 'prod-21',
    slug: 'velvet-scrunchie-set',
    name: 'Velvet Scrunchie Set',
    category: 'Scrunchies',
    collections: ['hair-accessories', 'scrunchies'],
    basePrice: 650,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-27',
    shortSummary:
      'Plush, crease-minimising velvet and satin scrunchies offered in coordinated colour trios and sets.',
    description:
      'Gentle on delicate hair strands and soft enough to wear on your wrist all day, our Velvet Scrunchie Set combines high-recovery inner elastics with generously gathered plush velvet and smooth satin fabrics.',
    features: [
      'Soft fabric folds help reduce ponytail kinks and breakage',
      'Durable braided inner elastic retains stretch over repeated use',
      'Offered in Single Statement, Trio Pack (Set of 3), and Curated Set of 5',
    ],
    specifications: [
      { label: 'Outer Diameter', value: '11cm relaxed gather' },
      { label: 'Pack Options', value: 'Single / Pack of 3 / Pack of 5' },
    ],
    materialAndFinish: 'Plush micro-velvet and smooth satin fabrics with internal elastic band.',
    careInstructions: [
      'Hand wash gently in cool water with mild detergent and air dry.',
    ],
    secondaryDimensionLabel: 'Pack Size & Fabric Mix',
    variants: buildVariants('prod-21', 'Velvet Scrunchie Set', 'VAL-HAR-003', 'scrunchie-set', [
      {
        skuSuffix: 'CHM-TRIO',
        color: 'Champagne, Ivory & Taupe Neutrals',
        colorHex: '#D8C3A5',
        secondaryHex: '#F4EFE6',
        secondaryOption: 'Trio Pack (Set of 3 — Velvet)',
        price: 650,
        stockStatus: 'in_stock',
        stockQuantity: 25,
      },
      {
        skuSuffix: 'CHM-5PK',
        color: 'Champagne, Ivory & Taupe Neutrals',
        colorHex: '#D8C3A5',
        secondaryHex: '#F4EFE6',
        secondaryOption: 'Curated Set of 5 (Velvet + Satin)',
        price: 950,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'BRY-TRIO',
        color: 'Rosewood, Blush & Espresso',
        colorHex: '#9E5B57',
        secondaryHex: '#E0B8B3',
        secondaryOption: 'Trio Pack (Set of 3 — Velvet)',
        price: 650,
        stockStatus: 'in_stock',
        stockQuantity: 17,
      },
      {
        skuSuffix: 'IVR-SGL',
        color: 'Warm Ivory Satin Oversized',
        colorHex: '#F3EDE2',
        secondaryOption: 'Single Oversized Cloud Scrunchie',
        price: 390,
        stockStatus: 'in_stock',
        stockQuantity: 20,
      },
    ]),
    relatedSlugs: ['satin-bow-hair-clip', 'pastel-claw-clip', 'padded-hairband'],
    faqs: [
      {
        question: 'How many wraps do these scrunchies offer?',
        answer:
          'They stretch comfortably for 2 to 3 wraps around medium-to-thick ponytails or buns.',
      },
    ],
    seoTitle: 'Velvet Scrunchie Set — Neutral & Blush Hair Scrunchies | VALENTINA',
    metaDescription:
      'Shop the Velvet Scrunchie Set at VALENTINA. Available in single oversized styles, Trio Packs of 3, and Curated Sets of 5 in velvet and satin.',
  },
  {
    id: 'prod-22',
    slug: 'padded-hairband',
    name: 'Padded Hairband',
    category: 'Hairbands',
    collections: ['hair-accessories', 'hairbands'],
    basePrice: 890,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-09-23',
    shortSummary:
      'A cushioned crown hairband with tapered comfort tips, offered in smooth satin, velvet and pearl-embellished styles.',
    description:
      'Frame your face in seconds with our signature Padded Hairband. Engineered with a flexible memory-fit core and softly wrapped tapered ends behind the ears, it offers elevated volume without pinching.',
    features: [
      'Soft micro-suede inner lining prevents slipping on smooth hair',
      'Tapered ear tips reduce pressure during extended wear',
      'Available in Smooth Satin, Plush Velvet, and Hand-Set Faux Pearl styles',
    ],
    specifications: [
      { label: 'Crown Height', value: '1.8cm cushioned profile' },
      { label: 'Crown Width', value: '3.2cm at top apex' },
      { label: 'Fit', value: 'Flexible Adult One-Size' },
    ],
    materialAndFinish: 'Flexible polycarbonate core wrapped in foam cushioning and satin/velvet textile.',
    careInstructions: [
      'Spot clean only with a lightly dampened cloth; store upright to preserve crown cushion shape.',
    ],
    secondaryDimensionLabel: 'Band Style & Embellishment',
    variants: buildVariants('prod-22', 'Padded Hairband', 'VAL-HAR-004', 'hairband-padded', [
      {
        skuSuffix: 'IVR-PRL',
        color: 'Warm Ivory',
        colorHex: '#F3EDE2',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Pearl-Embellished Satin Crown',
        price: 1090,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'CHM-SM',
        color: 'Champagne Beige',
        colorHex: '#DEC9A8',
        secondaryOption: 'Smooth Lustre Satin Padded',
        price: 890,
        stockStatus: 'in_stock',
        stockQuantity: 18,
      },
      {
        skuSuffix: 'BLK-VLV',
        color: 'Midnight Noir',
        colorHex: '#262322',
        secondaryOption: 'Plush Velvet Padded Crown',
        price: 890,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'BLK-PRL',
        color: 'Midnight Noir',
        colorHex: '#262322',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Pearl-Embellished Velvet Crown',
        price: 1090,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['satin-bow-hair-clip', 'pearl-embellished-hair-pins', 'pearl-drop-earrings'],
    faqs: [
      {
        question: 'Does this hairband cause pressure behind the ears?',
        answer:
          'The internal band is flexible and wrapped in soft fabric at the tips to distribute gentle hold comfortably.',
      },
    ],
    seoTitle: 'Padded Hairband — Pearl, Satin & Velvet Headbands | VALENTINA',
    metaDescription:
      'Explore the Padded Hairband at VALENTINA. Cushioned satin, velvet and pearl-embellished headbands designed for comfortable all-day wear.',
  },
  {
    id: 'prod-23',
    slug: 'pearl-embellished-hair-pins',
    name: 'Pearl-Embellished Hair Pins',
    category: 'Hair Clips',
    collections: ['hair-accessories', 'hair-clips'],
    basePrice: 620,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-06',
    shortSummary:
      'Graduated faux-pearl slide pins and alligator barrettes designed to tuck behind the ear or accent braids.',
    description:
      'Whether worn solo to sweep back a side parting or stacked in pairs for weddings and festive celebrations, our Pearl-Embellished Hair Pins combine secure non-slip metal slides with lustrous graduated pearls.',
    features: [
      'Ribbed underside grip keeps pins anchored in straight or wavy hair',
      'Graduated pearl row adds instant polish to simple blowouts or buns',
      'Available in Set of 2 Slide Pins or Set of 4 Mixed Barrettes',
    ],
    specifications: [
      { label: 'Pin Length', value: '6.8cm each' },
      { label: 'Pack Options', value: 'Pair (Set of 2) / Quartet (Set of 4)' },
    ],
    materialAndFinish: 'Gold-tone or silver-tone alloy slides with simulated glass pearls.',
    careInstructions: [
      'Clip pins onto a card when storing so pearls do not rub against rough surfaces.',
    ],
    secondaryDimensionLabel: 'Set Configuration',
    variants: buildVariants('prod-23', 'Pearl-Embellished Hair Pins', 'VAL-HAR-005', 'hair-pins', [
      {
        skuSuffix: 'GLD-2PK',
        color: 'Ivory Pearl & Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Set of 2 Graduated Slide Pins',
        price: 620,
        stockStatus: 'in_stock',
        stockQuantity: 19,
      },
      {
        skuSuffix: 'GLD-4PK',
        color: 'Ivory Pearl & Gold Tone',
        colorHex: '#D4AF37',
        secondaryHex: '#FAF5EC',
        secondaryOption: 'Set of 4 Mixed Pins & Barrettes',
        price: 920,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'SLV-2PK',
        color: 'Cool Pearl & Silver Tone',
        colorHex: '#C5C9CC',
        secondaryHex: '#FFFFFF',
        secondaryOption: 'Set of 2 Graduated Slide Pins',
        price: 620,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
    ]),
    relatedSlugs: ['padded-hairband', 'satin-bow-hair-clip', 'chandelier-pearl-cluster-drops'],
    faqs: [
      {
        question: 'Do these slide out of silky hair?',
        answer:
          'The bottom arm of each slide features subtle wave ribs that grip fine hair securely without pulling.',
      },
    ],
    seoTitle: 'Pearl-Embellished Hair Pins & Pearl Barrettes Set | VALENTINA',
    metaDescription:
      'Shop Pearl-Embellished Hair Pins at VALENTINA. Available in sets of 2 and 4 graduated pearl hair slides for everyday and festive hair styling.',
  },

  // ==========================================
  // 24–27: BAGS & WALLETS (4 Products)
  // ==========================================
  {
    id: 'prod-24',
    slug: 'mini-shoulder-bag',
    name: 'Mini Shoulder Bag',
    category: 'Shoulder Bags',
    collections: ['bags', 'shoulder-bags'],
    basePrice: 2690,
    compareAtPrice: 3190,
    isNewArrival: true,
    isBestseller: true,
    createdAt: '2026-09-15',
    shortSummary:
      'A structured top-handle trapezoid bag with brushed gold-tone turn-lock hardware and detachable crossbody strap.',
    description:
      'Architectural yet unmistakably feminine, the Valentina Mini Shoulder Bag is crafted from fine-grain vegan leather that holds its crisp silhouette from morning meetings to evening dinners. Carry it by the sculpted top handle or clip on the adjustable strap for hands-free ease.',
    features: [
      'Structured gusseted interior fits a 6.7-inch smartphone, card wallet, keys and lipstick',
      'Brushed gold-tone turn-lock closure with internal zip slip pocket',
      'Includes detachable strap options to customise how you carry it',
      'Protective metal base studs keep the bottom clean when placed on tables',
    ],
    specifications: [
      { label: 'Dimensions', value: '21cm (W) × 14.5cm (H) × 7.5cm (D)' },
      { label: 'Top Handle Drop', value: '8.5cm' },
      { label: 'Crossbody Strap Drop', value: '50cm to 58cm adjustable' },
    ],
    materialAndFinish:
      'Pebbled polyurethane vegan leather exterior, soft cotton-twill interior lining and brushed gold-tone alloy hardware.',
    careInstructions: [
      'Wipe exterior with a soft, slightly damp cloth.',
      'Stuff with tissue paper and store in a dust bag when not in use to maintain structure.',
    ],
    secondaryDimensionLabel: 'Strap & Carry Configuration',
    variants: buildVariants('prod-24', 'Mini Shoulder Bag', 'VAL-BAG-001', 'bag-shoulder', [
      {
        skuSuffix: 'CHM-CHN',
        color: 'Champagne Beige',
        colorHex: '#DFCBB2',
        secondaryOption: 'Leather Top Handle + Chain Crossbody Strap',
        price: 2690,
        compareAtPrice: 3190,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'CHM-LTH',
        color: 'Champagne Beige',
        colorHex: '#DFCBB2',
        secondaryOption: 'Leather Top Handle + Matching Leather Strap',
        price: 2690,
        compareAtPrice: 3190,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'TPE-LTH',
        color: 'Warm Taupe',
        colorHex: '#9C8776',
        secondaryOption: 'Leather Top Handle + Matching Leather Strap',
        price: 2690,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'BLK-CHN',
        color: 'Classic Noir',
        colorHex: '#24211F',
        secondaryOption: 'Leather Top Handle + Chain Crossbody Strap',
        price: 2690,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'IVR-CHN',
        color: 'Warm Ivory',
        colorHex: '#F3EDE2',
        secondaryOption: 'Leather Top Handle + Chain Crossbody Strap',
        price: 2690,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['everyday-sling-bag', 'classic-card-wallet', 'pleated-evening-clutch-bag'],
    faqs: [
      {
        question: 'Will a large smartphone fit inside the Mini Shoulder Bag?',
        answer:
          'Yes, the 21cm internal width comfortably accommodates all standard and Pro Max/Ultra smartphones alongside a card wallet and essentials.',
      },
    ],
    seoTitle: 'Mini Shoulder Bag — Structured Top-Handle Handbag | VALENTINA',
    metaDescription:
      'Shop the Mini Shoulder Bag at VALENTINA. Structured vegan leather top-handle bag in Champagne Beige, Warm Taupe, Ivory and Noir with detachable straps.',
  },
  {
    id: 'prod-25',
    slug: 'everyday-sling-bag',
    name: 'Everyday Sling Bag',
    category: 'Sling Bags',
    collections: ['bags', 'sling-bags', 'everyday-essentials'],
    basePrice: 2290,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-12',
    shortSummary:
      'A softly contoured crescent crossbody sling with smooth zip closure and built-in interior card slots.',
    description:
      'Designed for effortless movement through busy days, the Everyday Sling Bag contours comfortably against the body whether worn high across the chest or low on the hip. The wide zip opening reveals a surprisingly roomy main compartment with built-in organization.',
    features: [
      'Smooth top zipper with elongated leatherette pull tab',
      'Three built-in interior card slots plus one zip security pocket',
      'Choice of Classic Slim Leatherette Strap or Wide Woven Comfort Strap',
    ],
    specifications: [
      { label: 'Dimensions', value: '24cm (W) × 15cm (H) × 7cm (D)' },
      { label: 'Strap Drop', value: '42cm to 60cm fully adjustable' },
      { label: 'Closure', value: 'Full Top Zipper' },
    ],
    materialAndFinish: 'Supple matte vegan leather with brushed gold-tone buckles and twill lining.',
    careInstructions: [
      'Wipe clean with a dry or lightly damp cloth; avoid prolonged direct sun exposure.',
    ],
    secondaryDimensionLabel: 'Strap Style',
    variants: buildVariants('prod-25', 'Everyday Sling Bag', 'VAL-BAG-002', 'bag-sling', [
      {
        skuSuffix: 'TPE-SLM',
        color: 'Warm Taupe',
        colorHex: '#9C8776',
        secondaryOption: 'Classic Slim Adjustable Strap',
        price: 2290,
        stockStatus: 'in_stock',
        stockQuantity: 19,
      },
      {
        skuSuffix: 'TPE-WID',
        color: 'Warm Taupe',
        colorHex: '#9C8776',
        secondaryOption: 'Wide Crossbody Comfort Strap',
        price: 2450,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'ESP-SLM',
        color: 'Espresso Brown',
        colorHex: '#4E3829',
        secondaryOption: 'Classic Slim Adjustable Strap',
        price: 2290,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'IVR-SLM',
        color: 'Warm Ivory',
        colorHex: '#F3EDE2',
        secondaryOption: 'Classic Slim Adjustable Strap',
        price: 2290,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'SAG-WID',
        color: 'Olive Sage',
        colorHex: '#8E9B85',
        secondaryOption: 'Wide Crossbody Comfort Strap',
        price: 2450,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['mini-shoulder-bag', 'classic-card-wallet', 'everyday-makeup-pouch'],
    faqs: [
      {
        question: 'Can the strap be shortened to wear as a shoulder bag?',
        answer:
          'Yes, the buckle adjusts down to a 42cm drop so it can be worn neatly on one shoulder as well as crossbody.',
      },
    ],
    seoTitle: 'Everyday Sling Bag — Crescent Crossbody Bag for Women | VALENTINA',
    metaDescription:
      'Discover the Everyday Sling Bag at VALENTINA. A contoured crescent crossbody bag in Warm Taupe, Espresso, Ivory and Sage with adjustable strap styles.',
  },
  {
    id: 'prod-26',
    slug: 'classic-card-wallet',
    name: 'Classic Card Wallet',
    category: 'Wallets',
    collections: ['bags', 'wallets', 'everyday-essentials'],
    basePrice: 1090,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-14',
    shortSummary:
      'A slim precision-stitched cardholder and coin wallet engineered to slip effortlessly into mini bags.',
    description:
      'Say goodbye to bulky wallets that crowd your handbag. The Classic Card Wallet organises your essential bank cards, ID, folded currency notes and coins in a sleek profile crafted from fine-grain vegan leather.',
    features: [
      'Fits comfortably inside all Valentina mini shoulder and sling bags',
      'Precision-stitched card slots prevent stretching over time',
      'Available in Slim 6-Slot Cardholder or Zip-Coin Bi-Fold Wallet layouts',
    ],
    specifications: [
      { label: 'Slim Cardholder Size', value: '10.5cm (W) × 8cm (H) × 0.8cm (D)' },
      { label: 'Zip Bi-Fold Size', value: '11.5cm (W) × 9cm (H) × 2cm (D)' },
    ],
    materialAndFinish: 'Fine-grain polyurethane vegan leather with brushed gold-tone zip hardware.',
    careInstructions: [
      'Avoid overfilling individual card slots with more than two cards per slot.',
    ],
    secondaryDimensionLabel: 'Wallet Layout',
    variants: buildVariants('prod-26', 'Classic Card Wallet', 'VAL-WAL-001', 'wallet-card', [
      {
        skuSuffix: 'TPE-SLM',
        color: 'Warm Taupe',
        colorHex: '#9C8776',
        secondaryOption: 'Slim 6-Slot Cardholder + Central Slip',
        price: 1090,
        stockStatus: 'in_stock',
        stockQuantity: 24,
      },
      {
        skuSuffix: 'TPE-ZIP',
        color: 'Warm Taupe',
        colorHex: '#9C8776',
        secondaryOption: 'Snap Bi-Fold with Zip Coin Pocket',
        price: 1350,
        stockStatus: 'in_stock',
        stockQuantity: 15,
      },
      {
        skuSuffix: 'CHM-SLM',
        color: 'Champagne Beige',
        colorHex: '#DFCBB2',
        secondaryOption: 'Slim 6-Slot Cardholder + Central Slip',
        price: 1090,
        stockStatus: 'in_stock',
        stockQuantity: 18,
      },
      {
        skuSuffix: 'BLK-ZIP',
        color: 'Classic Noir',
        colorHex: '#24211F',
        secondaryOption: 'Snap Bi-Fold with Zip Coin Pocket',
        price: 1350,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'ESP-SLM',
        color: 'Espresso Brown',
        colorHex: '#4E3829',
        secondaryOption: 'Slim 6-Slot Cardholder + Central Slip',
        price: 1090,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
    ]),
    relatedSlugs: ['mini-shoulder-bag', 'everyday-sling-bag', 'everyday-makeup-pouch'],
    faqs: [
      {
        question: 'Does the Slim Cardholder fit Indian currency notes?',
        answer:
          'Indian currency notes fit neatly when folded once inside the central slip pocket; if you prefer flat note storage and a coin pocket, select the Snap Bi-Fold option.',
      },
    ],
    seoTitle: 'Classic Card Wallet — Slim Cardholder & Zip Bi-Fold | VALENTINA',
    metaDescription:
      'Shop the Classic Card Wallet at VALENTINA. Available in Slim 6-Slot Cardholder and Snap Bi-Fold with Zip Coin Pocket across Taupe, Champagne and Noir.',
  },
  {
    id: 'prod-27',
    slug: 'pleated-evening-clutch-bag',
    name: 'Pleated Evening Clutch Bag',
    category: 'Shoulder Bags',
    collections: ['bags', 'shoulder-bags', 'sling-bags'],
    basePrice: 2890,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-03',
    shortSummary:
      'A softly gathered satin-and-leatherette frame bag with a tuck-away snake chain for weddings and soirées.',
    description:
      'Designed specifically for festive evenings, cocktail receptions and formal dinners, the Pleated Evening Clutch Bag features delicate pleated folds secured by a sculpted metallic kiss-lock frame. Tuck the chain inside to hold it as a clutch, or drape it over your shoulder.',
    features: [
      'Sculpted metallic frame opens wide for easy access to evening essentials',
      'Concealable 110cm snake chain converts from clutch to shoulder/sling wear',
      'Offered in Lustre Satin and Soft Nappa-Texture Vegan Leather',
    ],
    specifications: [
      { label: 'Dimensions', value: '22cm (W) × 13cm (H) × 6.5cm (D)' },
      { label: 'Chain Length', value: '110cm tuck-away chain' },
    ],
    materialAndFinish: 'Lustre satin or soft vegan leather with gold-tone frame hardware.',
    careInstructions: [
      'Store inside the provided dust pouch away from sharp jewellery edges.',
    ],
    secondaryDimensionLabel: 'Exterior Material & Strap',
    variants: buildVariants('prod-27', 'Pleated Evening Clutch Bag', 'VAL-BAG-003', 'bag-shoulder', [
      {
        skuSuffix: 'CHM-SAT',
        color: 'Champagne Gold',
        colorHex: '#DEC9A8',
        secondaryOption: 'Lustre Satin + Gold Snake Chain',
        price: 2890,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'IVR-SAT',
        color: 'Warm Ivory',
        colorHex: '#F3EDE2',
        secondaryOption: 'Lustre Satin + Pearl & Chain Strap',
        price: 3050,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'BLK-LTH',
        color: 'Midnight Noir',
        colorHex: '#24211F',
        secondaryOption: 'Soft Vegan Leather + Gold Snake Chain',
        price: 2890,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
    ]),
    relatedSlugs: ['mini-shoulder-bag', 'chandelier-pearl-cluster-drops', 'ivory-pearl-choker-necklace'],
    faqs: [
      {
        question: 'Does the chain detach or tuck inside?',
        answer:
          'The snake chain pivots on internal hinges so you can tuck it completely inside the bag without unclipping.',
      },
    ],
    seoTitle: 'Pleated Evening Clutch Bag — Satin & Vegan Leather | VALENTINA',
    metaDescription:
      'Explore the Pleated Evening Clutch Bag at VALENTINA. Convertible frame clutch and shoulder bag in Champagne Satin, Warm Ivory and Midnight Noir.',
  },

  // ==========================================
  // 28–32: MAKEUP POUCHES & JEWELLERY ORGANISERS (5 Products)
  // ==========================================
  {
    id: 'prod-28',
    slug: 'everyday-makeup-pouch',
    name: 'Everyday Makeup Pouch',
    category: 'Makeup Pouches',
    collections: ['makeup-pouches', 'everyday-essentials'],
    basePrice: 1290,
    isNewArrival: false,
    isBestseller: true,
    createdAt: '2026-08-21',
    shortSummary:
      'A diamond-quilted cosmetic pouch with a wipe-clean interior lining and elasticated brush loops.',
    description:
      'Keep your handbag and vanity table effortlessly tidy with our Everyday Makeup Pouch. Designed with a wide gusseted base so it stands upright on countertops, it features a water-resistant wipe-clean interior lining and dedicated slip pockets for lipsticks and compacts.',
    features: [
      'Flat gusseted base stands upright without tipping over',
      'Wipe-clean water-resistant interior lining protects against spills',
      'Internal elastic loops keep lip liners and brushes upright',
    ],
    specifications: [
      { label: 'Handbag Petite Size', value: '18cm (W) × 11cm (H) × 6.5cm (D)' },
      { label: 'Vanity Medium Size', value: '23cm (W) × 15cm (H) × 9cm (D)' },
    ],
    materialAndFinish: 'Quilted cotton-linen blend or pebbled vegan leather with coated nylon lining.',
    careInstructions: [
      'Wipe interior lining with a damp cloth and mild soap; air dry open.',
    ],
    secondaryDimensionLabel: 'Pouch Size & Exterior',
    variants: buildVariants('prod-28', 'Everyday Makeup Pouch', 'VAL-PCH-001', 'pouch-makeup', [
      {
        skuSuffix: 'IVR-QLT-MD',
        color: 'Warm Ivory Linen',
        colorHex: '#F2ECE1',
        secondaryOption: 'Medium Vanity (23cm) · Quilted Linen',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 22,
      },
      {
        skuSuffix: 'IVR-QLT-SM',
        color: 'Warm Ivory Linen',
        colorHex: '#F2ECE1',
        secondaryOption: 'Handbag Petite (18cm) · Quilted Linen',
        price: 1090,
        stockStatus: 'in_stock',
        stockQuantity: 17,
      },
      {
        skuSuffix: 'CHM-LTH-MD',
        color: 'Champagne Beige',
        colorHex: '#DFCBB2',
        secondaryOption: 'Medium Vanity (23cm) · Pebbled Vegan Leather',
        price: 1390,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'BLS-QLT-MD',
        color: 'Dusty Blush',
        colorHex: '#E0B8B3',
        secondaryOption: 'Medium Vanity (23cm) · Quilted Linen',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
    ]),
    relatedSlugs: ['travel-jewellery-organiser', 'structured-vanity-train-case', 'everyday-sling-bag'],
    faqs: [
      {
        question: 'Do full-size makeup brushes fit inside?',
        answer:
          'The 23cm Medium Vanity size easily fits full-length makeup brushes, while the 18cm Handbag Petite size is ideal for travel brushes, compacts and lip products.',
      },
    ],
    seoTitle: 'Everyday Makeup Pouch — Quilted & Vegan Leather Cosmetic Bag | VALENTINA',
    metaDescription:
      'Shop the Everyday Makeup Pouch at VALENTINA. Available in Handbag Petite (18cm) and Medium Vanity (23cm) sizes with wipe-clean linings.',
  },
  {
    id: 'prod-29',
    slug: 'travel-jewellery-organiser',
    name: 'Travel Jewellery Organiser',
    category: 'Jewellery Organisers',
    collections: ['jewellery-organisers', 'everyday-essentials'],
    basePrice: 1590,
    compareAtPrice: 1890,
    isNewArrival: true,
    isBestseller: true,
    createdAt: '2026-09-12',
    shortSummary:
      'A structured zip-around case lined in plush micro-velvet with necklace hooks, ring rolls and earring panels.',
    description:
      'Never untangle knotted chains at a hotel vanity again. The Travel Jewellery Organiser features a hard-shell protective frame wrapped in tactile velvet or vegan leather, opening to reveal dedicated ring cushions, a perforated earring card, necklace hooks with an elastic pocket, and modular dividers.',
    features: [
      'Crush-resistant structured shell protects delicate posts and stones in luggage',
      '4 necklace hooks with a ruched elastic pouch to prevent chain tangling',
      '6 cushioned ring slots plus removable grid dividers for bracelets or hoops',
    ],
    specifications: [
      { label: 'Compact Weekend Size', value: '12cm × 12cm × 5.5cm' },
      { label: 'Extended Travel Size', value: '17cm × 12.5cm × 6cm' },
      { label: 'Closure', value: 'Smooth Wrap-Around Gold-Tone Zipper' },
    ],
    materialAndFinish: 'Plush micro-velvet or vegan leather exterior with anti-scratch velvet interior lining.',
    careInstructions: [
      'Brush velvet gently with a soft dry lint brush; keep interior dry.',
    ],
    secondaryDimensionLabel: 'Organiser Capacity & Exterior',
    variants: buildVariants('prod-29', 'Travel Jewellery Organiser', 'VAL-ORG-001', 'organiser-jewellery', [
      {
        skuSuffix: 'CHM-VLV-EXT',
        color: 'Champagne Velvet',
        colorHex: '#D8C3A5',
        secondaryOption: 'Extended Travel Case (17×12.5cm)',
        price: 1590,
        compareAtPrice: 1890,
        stockStatus: 'in_stock',
        stockQuantity: 23,
      },
      {
        skuSuffix: 'CHM-VLV-CMP',
        color: 'Champagne Velvet',
        colorHex: '#D8C3A5',
        secondaryOption: 'Compact Weekend Square (12×12cm)',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 19,
      },
      {
        skuSuffix: 'IVR-LTH-EXT',
        color: 'Warm Ivory Vegan Leather',
        colorHex: '#F3EDE2',
        secondaryOption: 'Extended Travel Case (17×12.5cm)',
        price: 1650,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'BLS-VLV-CMP',
        color: 'Blush Rose Velvet',
        colorHex: '#E0B8B3',
        secondaryOption: 'Compact Weekend Square (12×12cm)',
        price: 1290,
        stockStatus: 'in_stock',
        stockQuantity: 12,
      },
      {
        skuSuffix: 'SAG-VLV-EXT',
        color: 'Sage Green Velvet',
        colorHex: '#9CAF9E',
        secondaryOption: 'Extended Travel Case (17×12.5cm)',
        price: 1590,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['velvet-dresser-jewellery-box', 'everyday-makeup-pouch', 'mini-ring-and-earring-travel-roll'],
    faqs: [
      {
        question: 'Can the dividers inside be removed for chunky bangles?',
        answer:
          'Yes, the cross-dividers lift out so you can create one larger compartment for cuffs, watches or statement earrings.',
      },
    ],
    seoTitle: 'Travel Jewellery Organiser — Velvet Zip Jewellery Case | VALENTINA',
    metaDescription:
      'Shop the Travel Jewellery Organiser at VALENTINA. Crush-resistant velvet and vegan leather travel jewellery cases with ring rolls and necklace hooks.',
  },
  {
    id: 'prod-30',
    slug: 'structured-vanity-train-case',
    name: 'Structured Vanity Train Case',
    category: 'Makeup Pouches',
    collections: ['makeup-pouches', 'everyday-essentials'],
    basePrice: 1890,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-09-26',
    shortSummary:
      'A double-zipper top-handle vanity case with a flip-down brush panel and deep skincare base.',
    description:
      'Designed for longer journeys or neat dresser storage, the Structured Vanity Train Case opens flat at 180 degrees so you can see every product at once. The upper lid houses a covered brush organiser while the deep bottom compartment holds palettes, serums and foundations.',
    features: [
      'Dedicated upper brush compartment with clear protective flap',
      'Padded top handle for comfortable travel carry',
      'Dual-way gold-tone zippers for effortless opening',
    ],
    specifications: [
      { label: 'Standard Vanity Size', value: '23cm (W) × 16cm (D) × 14cm (H)' },
      { label: 'Double-Layer Pro Size', value: '25cm (W) × 18cm (D) × 17cm (H)' },
    ],
    materialAndFinish: 'Crosshatch vegan leather exterior with wipe-clean interior.',
    careInstructions: [
      'Wipe inner and outer surfaces with a soft damp cloth.',
    ],
    secondaryDimensionLabel: 'Case Capacity',
    variants: buildVariants('prod-30', 'Structured Vanity Train Case', 'VAL-PCH-002', 'pouch-makeup', [
      {
        skuSuffix: 'CHM-STD',
        color: 'Champagne Beige',
        colorHex: '#DFCBB2',
        secondaryOption: 'Single-Tier with Brush Panel (23cm)',
        price: 1890,
        stockStatus: 'in_stock',
        stockQuantity: 13,
      },
      {
        skuSuffix: 'CHM-DBL',
        color: 'Champagne Beige',
        colorHex: '#DFCBB2',
        secondaryOption: 'Double-Layer Cosmetic & Jewellery Tier (25cm)',
        price: 2290,
        stockStatus: 'in_stock',
        stockQuantity: 9,
      },
      {
        skuSuffix: 'TPE-STD',
        color: 'Warm Taupe',
        colorHex: '#9C8776',
        secondaryOption: 'Single-Tier with Brush Panel (23cm)',
        price: 1890,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
      {
        skuSuffix: 'BLK-DBL',
        color: 'Classic Noir',
        colorHex: '#24211F',
        secondaryOption: 'Double-Layer Cosmetic & Jewellery Tier (25cm)',
        price: 2290,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
    ]),
    relatedSlugs: ['everyday-makeup-pouch', 'travel-jewellery-organiser', 'velvet-dresser-jewellery-box'],
    faqs: [
      {
        question: 'What is the difference between Single-Tier and Double-Layer?',
        answer:
          'The Double-Layer version adds a separate shallow zip tray at the top for palettes and hair clips above the main skincare compartment.',
      },
    ],
    seoTitle: 'Structured Vanity Train Case — Travel Makeup Box | VALENTINA',
    metaDescription:
      'Explore the Structured Vanity Train Case at VALENTINA. Top-handle travel cosmetic cases with brush panels in Single-Tier and Double-Layer capacities.',
  },
  {
    id: 'prod-31',
    slug: 'velvet-dresser-jewellery-box',
    name: 'Velvet Dresser Jewellery Box',
    category: 'Jewellery Organisers',
    collections: ['jewellery-organisers', 'everyday-essentials'],
    basePrice: 2490,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-04',
    shortSummary:
      'A multi-compartment tabletop jewellery chest with a lift-out tray and clear glass-look viewing lid.',
    description:
      'Bring calm, boutique-inspired order to your dressing table. The Velvet Dresser Jewellery Box organises your entire collection across a lift-out top tray for rings, studs and daily chains, and a deeper lower drawer for hoops, bangles and hair accessories.',
    features: [
      'Lift-out upper tray with 8 ring rolls and 12 stud compartments',
      'Lower compartment accommodates larger hoops, cuffs and hair clips',
      'Soft anti-scratch champagne velvet lining throughout',
    ],
    specifications: [
      { label: 'Two-Tier Chest Size', value: '23cm (W) × 17cm (D) × 9.5cm (H)' },
      { label: 'Single Display Tray Size', value: '23cm (W) × 17cm (D) × 5.5cm (H)' },
    ],
    materialAndFinish: 'MDF structural core wrapped in micro-velvet with brushed gold-tone clasp.',
    careInstructions: [
      'Dust exterior gently with a dry microfibre cloth.',
    ],
    secondaryDimensionLabel: 'Box Architecture',
    variants: buildVariants('prod-31', 'Velvet Dresser Jewellery Box', 'VAL-ORG-002', 'organiser-jewellery', [
      {
        skuSuffix: 'CHM-2TR',
        color: 'Champagne Beige Velvet',
        colorHex: '#D8C3A5',
        secondaryOption: 'Two-Tier Chest with Lift-Out Tray',
        price: 2490,
        stockStatus: 'in_stock',
        stockQuantity: 10,
      },
      {
        skuSuffix: 'CHM-1TR',
        color: 'Champagne Beige Velvet',
        colorHex: '#D8C3A5',
        secondaryOption: 'Single-Tier Glass-Top Display Box',
        price: 1950,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'IVR-2TR',
        color: 'Warm Ivory Velvet',
        colorHex: '#F3EDE2',
        secondaryOption: 'Two-Tier Chest with Lift-Out Tray',
        price: 2490,
        stockStatus: 'in_stock',
        stockQuantity: 8,
      },
      {
        skuSuffix: 'CHR-2TR',
        color: 'Deep Charcoal Velvet',
        colorHex: '#3A3532',
        secondaryOption: 'Two-Tier Chest with Lift-Out Tray',
        price: 2490,
        stockStatus: 'low_stock',
        stockQuantity: 3,
      },
    ]),
    relatedSlugs: ['travel-jewellery-organiser', 'mini-ring-and-earring-travel-roll', 'layered-herringbone-chain-necklace'],
    faqs: [
      {
        question: 'Does the lid lock with a key?',
        answer:
          'It features a smooth press-release clasp for convenient daily access rather than a key lock.',
      },
    ],
    seoTitle: 'Velvet Dresser Jewellery Box — Two-Tier Storage Chest | VALENTINA',
    metaDescription:
      'Shop the Velvet Dresser Jewellery Box at VALENTINA. Tabletop jewellery storage chests in Champagne, Ivory and Charcoal velvet.',
  },
  {
    id: 'prod-32',
    slug: 'mini-ring-and-earring-travel-roll',
    name: 'Mini Ring & Earring Travel Roll',
    category: 'Jewellery Organisers',
    collections: ['jewellery-organisers', 'makeup-pouches', 'everyday-essentials'],
    basePrice: 990,
    isNewArrival: true,
    isBestseller: false,
    createdAt: '2026-10-07',
    shortSummary:
      'A tri-fold quilted satin-and-suede clutch roll that slips flat into any handbag or work tote.',
    description:
      'Ideal for gym visits, office-to-dinner transitions or light packing, the Mini Ring & Earring Travel Roll folds flat like a slim envelope. Unsnap the ribbon closure to access a snap-button ring bar, a perforated stud strap, and two zippered micro-pockets.',
    features: [
      'Ultra-slim tri-fold design fits inside work totes and sling bags',
      'Snap-button ring bolster and 4-pair earring strap',
      'Two transparent zip pockets keep delicate chains separated',
    ],
    specifications: [
      { label: 'Folded Dimensions', value: '15.5cm (W) × 7.5cm (H) × 2cm (D)' },
      { label: 'Unfolded Length', value: '23cm flat roll' },
    ],
    materialAndFinish: 'Quilted satin or vegan suede exterior with soft micro-suede interior.',
    careInstructions: [
      'Spot clean gently with a dry or slightly damp cloth.',
    ],
    secondaryDimensionLabel: 'Roll Size & Closure',
    variants: buildVariants('prod-32', 'Mini Ring & Earring Travel Roll', 'VAL-ORG-003', 'organiser-jewellery', [
      {
        skuSuffix: 'CHM-SAT-STD',
        color: 'Champagne Quilted Satin',
        colorHex: '#DEC9A8',
        secondaryOption: 'Tri-Fold Standard Roll (15.5cm)',
        price: 990,
        stockStatus: 'in_stock',
        stockQuantity: 18,
      },
      {
        skuSuffix: 'TPE-SDE-STD',
        color: 'Warm Taupe Vegan Suede',
        colorHex: '#9C8776',
        secondaryOption: 'Tri-Fold Standard Roll (15.5cm)',
        price: 1050,
        stockStatus: 'in_stock',
        stockQuantity: 14,
      },
      {
        skuSuffix: 'IVR-SAT-MAX',
        color: 'Warm Ivory Quilted Satin',
        colorHex: '#F3EDE2',
        secondaryOption: 'Expanded 4-Pocket Roll (19cm)',
        price: 1190,
        stockStatus: 'in_stock',
        stockQuantity: 11,
      },
    ]),
    relatedSlugs: ['travel-jewellery-organiser', 'everyday-makeup-pouch', 'everyday-sling-bag'],
    faqs: [
      {
        question: 'Will this fit inside the Everyday Sling Bag?',
        answer:
          'Yes, the 15.5cm Tri-Fold Standard Roll is compact enough to slip right into our Everyday Sling Bag.',
      },
    ],
    seoTitle: 'Mini Ring & Earring Travel Roll — Compact Jewellery Roll | VALENTINA',
    metaDescription:
      'Discover the Mini Ring & Earring Travel Roll at VALENTINA. A slim tri-fold jewellery roll for rings, studs and chains that fits inside any handbag.',
  },
];

export const PRODUCTS: Product[] = [
  ...INITIAL_PRODUCTS.map((p) => {
    let department: Product['department'] = 'Jewellery';
    if (['Hair Clips', 'Scrunchies', 'Hairbands'].includes(p.category)) {
      department = 'Hair Accessories';
    } else if (['Shoulder Bags', 'Sling Bags', 'Wallets'].includes(p.category)) {
      department = 'Handbags & Purses';
    } else if (['Makeup Pouches', 'Jewellery Organisers'].includes(p.category)) {
      department = 'More Accessories';
    }
    return {
      ...p,
      department,
      subcategory: p.category,
      brand: 'VALENTINA Atelier',
      photoSource: 'Verified Product Photography Library',
    };
  }),
  ...generateExpandedCatalogue(),
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.collections.includes(collectionSlug));
}

export function searchProducts(rawQuery: string): Product[] {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);

  return PRODUCTS.filter((p) => {
    const searchableText = [
      p.name,
      p.category,
      p.subcategory || '',
      p.department || '',
      p.brand || '',
      p.materialAndFinish,
      p.shortSummary,
      p.description,
      ...p.collections,
      ...p.variants.map((v) => `${v.color} ${v.secondaryOption}`),
    ]
      .join(' ')
      .toLowerCase();

    return tokens.every((token) => searchableText.includes(token));
  });
}

