import { SITE_CONFIG } from '../config/site';

export interface BlogSection {
  heading: string;
  paragraphs: string[];
  internalLinks?: Array<{ label: string; to: string }>;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  publishedAt: string;
  readTime: string;
  featuredImage: string;
  featuredImageAlt: string;
  excerpt: string;
  introduction: string;
  sections: BlogSection[];
  relatedProductSlugs: string[];
  seoTitle: string;
  metaDescription: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-01',
    slug: 'choose-everyday-jewellery',
    title: 'How to Choose Everyday Jewellery That Matches Your Style',
    subtitle: 'Building a capsule jewellery edit that transitions effortlessly from morning routines to evening gatherings.',
    category: 'Jewellery Styling',
    publishedAt: '2026-09-10',
    readTime: '5 min read',
    featuredImage: SITE_CONFIG.editorialImages.jewelleryCollection,
    featuredImageAlt: 'Everyday gold hoops, pendant necklaces and stackable rings on warm travertine stone',
    excerpt:
      'Discover how to select comfortable proportions, versatile necklines and signature finishes that complement both Indian and Western daily wardrobes.',
    introduction:
      'The most rewarding pieces in any jewellery box are rarely the ones saved exclusively for once-a-year celebrations. Instead, they are the quiet companions you reach for on a Tuesday morning—the lightweight hoops that frame your face on video calls, the pendant chain that sits neatly inside a linen shirt collar, or the stacking rings that feel like a natural extension of your hands.',
    sections: [
      {
        heading: '1. Start with Proportion and Comfort',
        paragraphs: [
          'When evaluating jewellery for daily wear, weight and profile matter just as much as visual appeal. Look for hollow-core tubular hoops or hinged huggies between 18mm and 30mm in diameter. They offer unmistakable presence without tugging on the earlobe during a long commute or workday.',
          'Similarly, for rings and bracelets, smooth low-profile settings prevent snagging on knitwear, dupattas or laptop keyboards. A tapered signet ring or a set of slim 2mm stacking bands offers tactile detail while keeping your fingers comfortable.',
        ],
        internalLinks: [
          { label: 'Explore Classic Gold Hoops', to: '/products/classic-gold-hoops' },
          { label: 'View All Earrings', to: '/collections/earrings' },
        ],
      },
      {
        heading: '2. Match Chain Lengths to Your Most-Worn Necklines',
        paragraphs: [
          'Take a moment to look at the five tops or kurtas you wear most frequently. If your wardrobe leans toward crisp button-down shirts and V-neck kurtas, a 45cm princess-length pendant necklace with a 5cm extender allows the medallion to rest gracefully on the skin just above the neckline.',
          'For crew-neck tees, boat necks or structured blazers, a 39cm–40cm flat herringbone chain creates a clean luminous line right along the collarbone.',
        ],
        internalLinks: [
          { label: 'Shop Minimal Pendant Necklace', to: '/products/minimal-pendant-necklace' },
          { label: 'Browse Necklaces Collection', to: '/collections/necklaces' },
        ],
      },
      {
        heading: '3. Choose a Signature Motif That Feels Personal',
        paragraphs: [
          'Whether you gravitate toward organic baroque pearls, clean geometric hoops, or delicate botanical textures, repeating one consistent design language ties your look together. A pair of pearl drop huggies paired with a simple gold chain feels intentional without looking over-styled.',
        ],
        internalLinks: [
          { label: 'Discover Pearl Drop Earrings', to: '/products/pearl-drop-earrings' },
          { label: 'Explore Stackable Gold Rings', to: '/products/stackable-gold-rings' },
        ],
      },
    ],
    relatedProductSlugs: ['classic-gold-hoops', 'minimal-pendant-necklace', 'stackable-gold-rings'],
    seoTitle: 'How to Choose Everyday Jewellery That Matches Your Style | VALENTINA Journal',
    metaDescription:
      'Learn how to build an everyday jewellery capsule with comfortable hoop sizes, versatile necklace lengths and timeless finishes from VALENTINA.',
  },
  {
    id: 'blog-02',
    slug: 'style-gold-and-silver-accessories',
    title: 'How to Style Gold and Silver Accessories',
    subtitle: 'Modern guidelines for choosing metallic tones—and how to mix warm gold and cool silver with confidence.',
    category: 'Style Guide',
    publishedAt: '2026-09-16',
    readTime: '4 min read',
    featuredImage: SITE_CONFIG.editorialImages.heroEditorial,
    featuredImageAlt: 'Editorial portrait showing layered necklaces and subtle mixed-metal accessories',
    excerpt:
      'Gone are the days of strict single-metal rules. Learn how to coordinate gold, silver and rose-gold tones across jewellery and handbag hardware.',
    introduction:
      'For decades, traditional styling advice insisted that you had to pledge loyalty to either gold or silver—and never wear both at once. Today, thoughtfully combining warm gold tones with cool silver or soft rose gold is one of the easiest ways to make an outfit feel contemporary and personal.',
    sections: [
      {
        heading: '1. Use a "Bridge Piece" to Anchor Mixed Metals',
        paragraphs: [
          'The secret to making gold and silver look intentional rather than accidental is introducing a single two-tone "bridge" piece. An interlocking two-tone ring or a dual-strand necklace that incorporates both gold and silver links immediately signals that your palette is deliberate.',
          'Once you wear one mixed-metal anchor, your silver wristwatch and gold hoop earrings suddenly look like part of a unified story.',
        ],
        internalLinks: [
          { label: 'View Interlocking Two-Tone Band Ring', to: '/products/interlocking-two-tone-band-ring' },
          { label: 'Explore Layered Herringbone Chain Necklace', to: '/products/layered-herringbone-chain-necklace' },
        ],
      },
      {
        heading: '2. Balance Warm and Cool Fabric Palettes',
        paragraphs: [
          'Warm ivory, champagne beige, olive sage, espresso brown and terracotta naturally come alive alongside 18k gold-tone finishes. Cool crisp whites, charcoal greys, icy pastels and monochrome noir offer striking contrast with sterling silver tones, while rose gold softens blush and neutral linen palettes.',
        ],
        internalLinks: [
          { label: 'Explore All Jewellery', to: '/collections/jewellery' },
        ],
      },
      {
        heading: '3. Coordinate Handbag Hardware Without Over-Matching',
        paragraphs: [
          'If your mini shoulder bag features brushed gold-tone turn-lock hardware, echoing that warm tone in at least one piece of jewellery—such as your earrings or one ring in your stack—creates subtle visual harmony across your whole silhouette.',
        ],
        internalLinks: [
          { label: 'Shop Mini Shoulder Bag', to: '/products/mini-shoulder-bag' },
          { label: 'Browse Bracelets Collection', to: '/collections/bracelets' },
        ],
      },
    ],
    relatedProductSlugs: ['interlocking-two-tone-band-ring', 'layered-herringbone-chain-necklace', 'sculpted-open-cuff-bangle'],
    seoTitle: 'How to Style Gold and Silver Accessories Together | VALENTINA Journal',
    metaDescription:
      'Discover practical tips for styling gold, silver and rose-gold accessories together using two-tone bridge pieces and balanced colour palettes.',
  },
  {
    id: 'blog-03',
    slug: 'elevate-outfits-with-accessories',
    title: 'Five Ways to Elevate a Simple Outfit with Accessories',
    subtitle: 'How small finishing touches transform basic shirts, kurtas and monochrome dresses.',
    category: 'Wardrobe Edit',
    publishedAt: '2026-09-22',
    readTime: '5 min read',
    featuredImage: SITE_CONFIG.editorialImages.bagsAndWallets,
    featuredImageAlt: 'Structured mini shoulder bag, sling bag and card wallet styled on travertine stone',
    excerpt:
      'A crisp white shirt or solid kurta is a blank canvas. Here are five effortless accessory combinations that change the mood of a simple outfit in seconds.',
    introduction:
      'When your schedule moves from daytime errands to an impromptu dinner, you rarely need a complete wardrobe change. Often, the difference between a basic outfit and a memorable look lies entirely in the three or four accessories you pair with it.',
    sections: [
      {
        heading: '1. Frame the Face with Luminous Pearl Drops',
        paragraphs: [
          'Swapping tiny everyday studs for baroque pearl drop earrings immediately draws soft light toward your cheekbones and jawline. Paired with a plain cotton kurta or a black slip dress, pearl drops introduce texture without feeling overly formal.',
        ],
        internalLinks: [
          { label: 'Shop Pearl Drop Earrings', to: '/products/pearl-drop-earrings' },
        ],
      },
      {
        heading: '2. Add Structure with a Top-Handle Mini Bag',
        paragraphs: [
          'Relaxed clothing—like wide-leg linen trousers, oversized shirts or flowing dresses—benefits from the crisp geometry of a structured handbag. Carrying a trapezoid top-handle bag in Champagne Beige or Warm Taupe balances soft fabrics with tailored poise.',
        ],
        internalLinks: [
          { label: 'Explore Mini Shoulder Bag', to: '/products/mini-shoulder-bag' },
          { label: 'View All Bags & Wallets', to: '/collections/bags' },
        ],
      },
      {
        heading: '3. Polish Your Hairstyle with a Satin Bow or Padded Hairband',
        paragraphs: [
          'Even a two-minute half-up hairstyle looks thoughtfully styled when secured with an ivory satin bow barrette or framed by a pearl-accented padded hairband.',
        ],
        internalLinks: [
          { label: 'Shop Satin Bow Hair Clip', to: '/products/satin-bow-hair-clip' },
          { label: 'Explore Padded Hairband', to: '/products/padded-hairband' },
        ],
      },
      {
        heading: '4. Layer Two Contrasting Chain Textures',
        paragraphs: [
          'Open the top two buttons of a collared shirt and pair a flat herringbone chain with a slightly longer pendant necklace. The contrast between a flat ribbon of metal and a delicate pendant adds depth to an otherwise plain neckline.',
        ],
        internalLinks: [
          { label: 'Shop Layered Herringbone Chain', to: '/products/layered-herringbone-chain-necklace' },
        ],
      },
      {
        heading: '5. Finish the Wrist with a Charm Bracelet or Open Cuff',
        paragraphs: [
          'Rolling up your blazer or shirt sleeves to reveal a delicate charm bracelet or sculpted open cuff makes a casual silhouette feel styled right down to the fingertips.',
        ],
        internalLinks: [
          { label: 'Shop Elegant Charm Bracelet', to: '/products/elegant-charm-bracelet' },
        ],
      },
    ],
    relatedProductSlugs: ['pearl-drop-earrings', 'mini-shoulder-bag', 'satin-bow-hair-clip'],
    seoTitle: 'Five Ways to Elevate a Simple Outfit with Accessories | VALENTINA Journal',
    metaDescription:
      'Transform simple shirts, kurtas and dresses with five practical accessory styling ideas—from pearl drop earrings to structured mini shoulder bags.',
  },
  {
    id: 'blog-04',
    slug: 'choose-an-everyday-bag',
    title: 'How to Choose a Bag for Everyday Use',
    subtitle: 'Comparing strap styles, interior compartments and proportions for workdays, errands and evenings out.',
    category: 'Bag Buying Guide',
    publishedAt: '2026-09-27',
    readTime: '5 min read',
    featuredImage: SITE_CONFIG.editorialImages.bagsAndWallets,
    featuredImageAlt: 'Everyday sling bag and structured shoulder bag in neutral taupe tones',
    excerpt:
      'From crescent crossbody slings to structured top-handle bags, learn what dimensions, closures and strap options matter most for daily use.',
    introduction:
      'An everyday bag has a demanding job: it needs to hold your phone, card wallet, keys, sunglasses and touch-up essentials without weighing down your shoulder or losing its shape after a few weeks. Choosing the right silhouette comes down to how you move through your day.',
    sections: [
      {
        heading: '1. Crossbody Sling vs. Structured Shoulder Bag',
        paragraphs: [
          'If your routine involves commuting, shopping or walking between meetings, a contoured crescent sling bag with a wide adjustable strap keeps your hands completely free and distributes weight evenly across your torso.',
          'If you frequently transition from office desks to dinner tables, a structured mini shoulder bag with both a top handle and a detachable chain or leatherette strap gives you two distinct looks in one.',
        ],
        internalLinks: [
          { label: 'Compare Everyday Sling Bag', to: '/products/everyday-sling-bag' },
          { label: 'Compare Mini Shoulder Bag', to: '/products/mini-shoulder-bag' },
        ],
      },
      {
        heading: '2. Check Internal Dimensions Against Your Daily Carry',
        paragraphs: [
          'Before choosing a compact bag, check that its width is at least 20cm–24cm so modern large-screen smartphones slide in horizontally without angling. Pairing a compact bag with a dedicated slim card wallet rather than a bulky long wallet frees up nearly half the interior space.',
        ],
        internalLinks: [
          { label: 'Shop Classic Card Wallet', to: '/products/classic-card-wallet' },
          { label: 'Explore Wallets Collection', to: '/collections/wallets' },
        ],
      },
      {
        heading: '3. Select Versatile Neutral Shades',
        paragraphs: [
          'Warm Taupe, Champagne Beige, Warm Ivory and Classic Noir work effortlessly across both vibrant Indian festive colours and monochrome Western outfits, ensuring you never have to switch bags simply because your outfit palette changed.',
        ],
        internalLinks: [
          { label: 'Browse All Sling Bags', to: '/collections/sling-bags' },
          { label: 'Browse All Shoulder Bags', to: '/collections/shoulder-bags' },
        ],
      },
    ],
    relatedProductSlugs: ['everyday-sling-bag', 'mini-shoulder-bag', 'classic-card-wallet'],
    seoTitle: 'How to Choose a Bag for Everyday Use — Sling vs Shoulder Bags | VALENTINA',
    metaDescription:
      'Find your ideal everyday bag with our practical guide comparing crossbody sling bags, structured mini shoulder bags, strap styles and wallet pairings.',
  },
  {
    id: 'blog-05',
    slug: 'everyday-hair-accessories',
    title: 'Hair Accessories That Can Refresh Your Everyday Look',
    subtitle: 'Effortless ways to style claw clips, satin bows, velvet scrunchies and padded hairbands.',
    category: 'Hair Styling',
    publishedAt: '2026-10-01',
    readTime: '4 min read',
    featuredImage: SITE_CONFIG.editorialImages.hairAccessoriesEdit,
    featuredImageAlt: 'Satin bow hair clip, marbled claw clips, velvet scrunchies and pearl hairband',
    excerpt:
      'Give your hair a break from heat tools and tight elastics with tactile hair accessories that look polished in under a minute.',
    introduction:
      'On warm or humid mornings across India, styling hair with heat tools isn’t always practical—or gentle on your strands. Well-crafted hair accessories allow you to sweep hair off your neck or frame your face in seconds while looking intentionally put together.',
    sections: [
      {
        heading: '1. The 30-Second Acetate Claw Clip Twist',
        paragraphs: [
          'Marbled cellulose acetate claw clips have become a modern staple for good reason: their rounded teeth gather hair securely without leaving the sharp kink of a thin rubber elastic. Gather your hair at the nape of your neck, twist upward once, tuck the ends in, and secure with an 11cm Maxi Claw Clip.',
        ],
        internalLinks: [
          { label: 'Shop Pastel Claw Clip', to: '/products/pastel-claw-clip' },
          { label: 'Explore Hair Clips Collection', to: '/collections/hair-clips' },
        ],
      },
      {
        heading: '2. Soften Low Ponytails with Velvet and Satin',
        paragraphs: [
          'Switching from bare elastic bands to plush velvet or smooth satin scrunchies reduces friction when pulling your hair back. Keep a neutral trio of Champagne, Ivory and Taupe scrunchies on hand to coordinate with any outfit.',
        ],
        internalLinks: [
          { label: 'Shop Velvet Scrunchie Set', to: '/products/velvet-scrunchie-set' },
          { label: 'Browse Scrunchies Collection', to: '/collections/scrunchies' },
        ],
      },
      {
        heading: '3. Instant Occasion Polish with Padded Hairbands and Pearl Pins',
        paragraphs: [
          'When you want to wear your hair down but keep strands neatly away from your face, a cushioned satin hairband or a pair of graduated pearl hair pins tucked behind one ear creates an instant focal point.',
        ],
        internalLinks: [
          { label: 'Shop Padded Hairband', to: '/products/padded-hairband' },
          { label: 'Shop Pearl-Embellished Hair Pins', to: '/products/pearl-embellished-hair-pins' },
        ],
      },
    ],
    relatedProductSlugs: ['pastel-claw-clip', 'velvet-scrunchie-set', 'padded-hairband'],
    seoTitle: 'Hair Accessories That Refresh Your Everyday Look | VALENTINA Journal',
    metaDescription:
      'Discover easy hair styling ideas using pastel claw clips, satin bow barrettes, velvet scrunchies and pearl-embellished hairbands from VALENTINA.',
  },
  {
    id: 'blog-06',
    slug: 'organise-jewellery-and-accessories',
    title: 'A Simple Guide to Organising Jewellery and Small Accessories',
    subtitle: 'Practical habits for keeping chains tangle-free, preserving metallic finishes and packing for travel.',
    category: 'Care & Organisation',
    publishedAt: '2026-10-05',
    readTime: '5 min read',
    featuredImage: SITE_CONFIG.editorialImages.organisersAndPouches,
    featuredImageAlt: 'Open champagne velvet travel jewellery organiser next to a quilted makeup pouch',
    excerpt:
      'Prevent tangled chains, misplaced earring backs and surface scratches with a calm, compartmentalised storage routine.',
    introduction:
      'Even the most thoughtfully chosen jewellery loses its lustre when tossed into a single dish where chains knot together and stone settings scratch against metal hoops. Setting up a simple organisation system takes less than ten minutes and keeps every piece visible and ready to wear.',
    sections: [
      {
        heading: '1. Separate Pieces by Category and Hardness',
        paragraphs: [
          'Fine chains, simulated pearls and crystal-set pieces should never share a loose compartment with heavy metal cuffs or hair clips. Use a velvet-lined organiser with dedicated cushioned ring rolls for bands and rings, perforated stud cards for earrings, and individual hooks for necklaces.',
        ],
        internalLinks: [
          { label: 'Shop Travel Jewellery Organiser', to: '/products/travel-jewellery-organiser' },
          { label: 'Explore Velvet Dresser Jewellery Box', to: '/products/velvet-dresser-jewellery-box' },
        ],
      },
      {
        heading: '2. Pack Smart for Weekends and Destination Weddings',
        paragraphs: [
          'Never pack loose necklaces in a fabric pouch when travelling. Fasten every necklace clasp, hook the top loop onto a travel case hook, and tuck the pendant end inside the ruched elastic pocket so the chain cannot swing during transit.',
          'For lighter work-to-dinner days, a flat tri-fold jewellery roll slips directly into your sling or tote bag.',
        ],
        internalLinks: [
          { label: 'Shop Mini Ring & Earring Travel Roll', to: '/products/mini-ring-and-earring-travel-roll' },
          { label: 'Browse All Jewellery Organisers', to: '/collections/jewellery-organisers' },
        ],
      },
      {
        heading: '3. Keep Cosmetics in a Dedicated Wipe-Clean Pouch',
        paragraphs: [
          'Storing lip glosses, compacts and perfume atomisers inside a quilted makeup pouch with a water-resistant lining protects both your handbag interior and your jewellery from accidental spills.',
        ],
        internalLinks: [
          { label: 'Shop Everyday Makeup Pouch', to: '/products/everyday-makeup-pouch' },
          { label: 'Explore Makeup Pouches Collection', to: '/collections/makeup-pouches' },
        ],
      },
    ],
    relatedProductSlugs: ['travel-jewellery-organiser', 'velvet-dresser-jewellery-box', 'everyday-makeup-pouch'],
    seoTitle: 'A Simple Guide to Organising Jewellery & Small Accessories | VALENTINA',
    metaDescription:
      'Learn how to store earrings, necklaces, rings and cosmetics without tangles or scratches using velvet jewellery organisers and travel pouches.',
  },
];

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((b) => b.slug === slug);
}
