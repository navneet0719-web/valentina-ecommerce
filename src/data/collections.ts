export type CollectionDepartment =
  | 'Jewellery'
  | 'Handbags & Purses'
  | 'Watches & Sunglasses'
  | 'Makeup & Beauty'
  | 'Hair Accessories'
  | 'More Accessories'
  | 'Occasion & Edit Collections';

export interface CollectionInfo {
  slug: string;
  name: string;
  h1: string;
  group: CollectionDepartment;
  shortDescription: string;
  introParagraph: string;
  stylingNote: string;
  heroImage: string;
  heroImageAlt: string;
  seoTitle: string;
  metaDescription: string;
  featuredOnHomepage?: boolean;
}

export const COLLECTIONS: CollectionInfo[] = [
  // ==========================================
  // 1. JEWELLERY COLLECTIONS
  // ==========================================
  {
    slug: 'jewellery',
    name: 'Jewellery',
    h1: 'Jewellery — Rings, Bangles, Earrings, Necklaces & Bridal',
    group: 'Jewellery',
    shortDescription: 'Rings, bangles, kadas, earrings, necklaces, lockets, payal, maang tikka & bridal sets.',
    introParagraph:
      'Explore the complete VALENTINA Jewellery department featuring over 175 distinct designs across contemporary demi-fine silhouettes and traditional Indian styles—including Kundan, Polki, Meenakari, oxidised silver-tone, pearl, and gold-plated pieces.',
    stylingNote:
      'Filter by subcategory, finish, bangle size (2.2 to 2.10), or occasion to find pieces for daily wear, office styling, festivities, and weddings.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/1.webp',
    heroImageAlt: 'Traditional and contemporary women’s jewellery and bangles collection',
    seoTitle: 'Women’s Jewellery — Rings, Bangles, Earrings, Necklaces & Bridal | VALENTINA',
    metaDescription:
      'Shop over 175 unique women’s jewellery designs at VALENTINA, including rings, bangles, bracelets, jhumkas, necklaces, lockets, payal and maang tikka.',
    featuredOnHomepage: true,
  },
  {
    slug: 'rings',
    name: 'Rings',
    h1: 'Rings — Solitaire, Stackable, Kundan, Oxidised & Cocktail Rings',
    group: 'Jewellery',
    shortDescription: 'Adjustable, solitaire-style, stackable, cocktail, floral, pearl, Kundan & oxidised rings.',
    introParagraph:
      'Discover rings crafted for every hand and occasion—from minimal everyday bands and couple rings to statement Kundan, pearl, floral, and oxidised cocktail silhouettes. Select from fixed Indian ring sizes or adjustable comfort bands where supported by the design.',
    stylingNote:
      'Pair minimal stackable bands for office wear or choose a statement Kundan or cocktail ring as a single festive focal point.',
    heroImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Diamond_and_gembone_inlay_14K_gold_wedding_ring.jpg/960px-Diamond_and_gembone_inlay_14K_gold_wedding_ring.jpg',
    heroImageAlt: 'Women’s fashion and statement rings collection',
    seoTitle: 'Women’s Rings — Adjustable, Stackable, Kundan & Solitaire Rings | VALENTINA',
    metaDescription:
      'Browse adjustable, solitaire-style, stackable, cocktail, floral, pearl, Kundan and oxidised rings in gold-plated and silver-tone finishes at VALENTINA.',
  },
  {
    slug: 'bangles',
    name: 'Bangles',
    h1: 'Bangles — Gold-Plated, Glass, Lac, Kundan, Meenakari & Bridal Sets',
    group: 'Jewellery',
    shortDescription: 'Plain, glass, lac, Kundan, Polki, Meenakari, oxidised, openable kada & bridal chooda sets.',
    introParagraph:
      'Our Bangles collection brings together lightweight daily-wear bangles, traditional glass and lac sets, antique-finish temple bangles, Kundan and Polki party styles, screw-open kadas, and full bridal chooda-style sets. Available in Indian bangle sizes 2.2, 2.4, 2.6, 2.8, and 2.10 where supported by the supplier. Please note that sizing varies by design and openable mechanism.',
    stylingNote:
      'Measure the widest part of your palm across the knuckles to select between sizes 2.2 (petite) through 2.10 (plus), or choose screw-openable bangles for flexible wrist entry.',
    heroImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Clevelandart_1973.64.1.jpg/960px-Clevelandart_1973.64.1.jpg',
    heroImageAlt: 'Colourful Indian glass and gold-toned bangles assortment',
    seoTitle: 'Bangles for Women — Gold-Plated, Glass, Lac, Kundan & Bridal Sets | VALENTINA',
    metaDescription:
      'Shop Indian bangles in sizes 2.2 to 2.10 at VALENTINA. Explore plain, glass, lac, Kundan, Polki, Meenakari, oxidised, screw-open and bridal chooda bangle sets.',
  },
  {
    slug: 'bracelets',
    name: 'Bracelets & Kada',
    h1: 'Bracelets & Kada — Chain, Charm, Tennis, Pearl & Traditional Kada',
    group: 'Jewellery',
    shortDescription: 'Chain bracelets, charm bracelets, tennis styles, pearl wristwear & openable kadas.',
    introParagraph:
      'From delicate charm and crystal tennis bracelets to sculpted traditional kadas, stone-studded openable cuffs, and oxidised wristwear, explore versatile designs crafted for both everyday layering and festive dressing.',
    stylingNote:
      'Stack a slim tennis bracelet alongside your wristwatch, or wear an antique-finish openable kada solo with ethnic wear.',
    heroImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Gold_Bracelet_MET_sf52-76-1s3.jpg/960px-Gold_Bracelet_MET_sf52-76-1s3.jpg',
    heroImageAlt: 'Women’s bracelets and traditional kada wristwear',
    seoTitle: 'Women’s Bracelets & Kada — Charm, Tennis & Traditional Kada | VALENTINA',
    metaDescription:
      'Discover chain bracelets, charm bracelets, tennis bracelets, pearl wristwear, traditional kadas and oxidised cuffs at VALENTINA.',
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    h1: 'Earrings — Studs, Hoops, Jhumkas, Chandbalis, Drops & Bridal',
    group: 'Jewellery',
    shortDescription: 'Studs, hoops, jhumkas, chandbalis, drops, pearl, Kundan, Polki, oxidised & ear cuffs.',
    introParagraph:
      'Frame your face with our expansive Earrings collection. Browse lightweight everyday studs and classic tubular hoops alongside traditional domes of jhumkas, crescent chandbalis, Kundan and Polki drops, oxidised tribal styles, and non-pierced ear cuffs.',
    stylingNote:
      'Choose lightweight studs or 20mm hoops for daily comfort, and reserve tiered chandbalis or bridal jhumkas for celebratory evenings.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/1.webp',
    heroImageAlt: 'Green oval drop earrings and gold-toned women’s earrings',
    seoTitle: 'Women’s Earrings — Jhumkas, Chandbalis, Hoops, Studs & Drops | VALENTINA',
    metaDescription:
      'Shop stud earrings, hoops, jhumkas, chandbalis, pearl drops, Kundan, Polki, oxidised earrings and ear cuffs at VALENTINA.',
  },
  {
    slug: 'necklaces',
    name: 'Necklaces, Chains, Lockets & Pendants',
    h1: 'Necklaces, Chains, Lockets & Pendants — Chokers to Mangalsutras',
    group: 'Jewellery',
    shortDescription: 'Minimal chains, layered necklaces, chokers, Kundan sets, lockets, initial pendants & mangalsutras.',
    introParagraph:
      'Discover neckwear for every neckline and milestone. Our collection spans minimal everyday chains, layered herringbone sets, pearl and Kundan chokers, temple-style necklaces, bridal sets, heart and photo lockets, initial and name pendants, religious-symbol pendants, and contemporary mangalsutra designs.',
    stylingNote:
      'Use adjustable extender chains to position chokers at the base of the throat and pendant lockets along the collarbone.',
    heroImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Khalili_Collection_Islamic_Art_jly_1261.3.jpg/960px-Khalili_Collection_Islamic_Art_jly_1261.3.jpg',
    heroImageAlt: 'Women’s necklaces, pendants, lockets and traditional Indian neckwear',
    seoTitle: 'Necklaces, Chains, Lockets, Pendants & Mangalsutras | VALENTINA',
    metaDescription:
      'Explore minimal chains, layered necklaces, pearl chokers, Kundan bridal sets, heart lockets, initial pendants and mangalsutra designs at VALENTINA.',
  },
  {
    slug: 'payal-and-anklets',
    name: 'Payal / Anklets',
    h1: 'Payal & Anklets — Traditional Ghungroo, Oxidised, Pearl & Minimal Chains',
    group: 'Jewellery',
    shortDescription: 'Traditional payal, ghungroo payal, oxidised, silver-tone, gold-plated & minimal anklets.',
    introParagraph:
      'Celebrate graceful movement with our collection of single anklets and matched pairs. Choose from traditional silver-tone payals with melodic ghungroo bells, intricate bridal payals, oxidised boho anklets, and delicate gold-plated or pearl chain anklets for western and fusion wear.',
    stylingNote:
      'Select single minimal chain anklets for cropped denim and summer dresses, or traditional paired ghungroo payals for festive and bridal occasions.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/2.webp',
    heroImageAlt: 'Traditional Indian payal and modern chain anklets',
    seoTitle: 'Payal & Anklets for Women — Ghungroo, Silver-Tone & Minimal | VALENTINA',
    metaDescription:
      'Shop traditional payal, ghungroo anklets, oxidised payal, silver-tone pairs, gold-plated chain anklets and bridal payal at VALENTINA.',
  },
  {
    slug: 'maang-tikka-and-head-jewellery',
    name: 'Maang Tikka & Bridal Head Jewellery',
    h1: 'Maang Tikka & Bridal Head Jewellery — Kundan, Matha Patti, Passa & Borla',
    group: 'Jewellery',
    shortDescription: 'Traditional maang tikka, Kundan, Polki, pearl, minimal styles, matha patti, passa & borla.',
    introParagraph:
      'Complete your festive and bridal ensemble with traditional and modern head jewellery. Explore Kundan and Polki maang tikkas, delicate pearl single-strand styles for bridesmaids, Rajasthani borlas, side-swept passas, and ornate matha patti headpieces.',
    stylingNote:
      'Secure the top hook into a back-combed or braided section at the crown and use a bobby pin crosswise for all-evening stability.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-crystal-earring/2.webp',
    heroImageAlt: 'Bridal maang tikka, matha patti, passa and borla head jewellery',
    seoTitle: 'Maang Tikka, Matha Patti, Passa & Bridal Head Jewellery | VALENTINA',
    metaDescription:
      'Discover Kundan, Polki, pearl and minimal maang tikkas, matha patti, side passa and Rajasthani borla head jewellery at VALENTINA.',
  },
  {
    slug: 'other-jewellery',
    name: 'Other Traditional & Bridal Jewellery',
    h1: 'Nose Pins, Nath, Toe Rings, Kamarbandh, Hathphool & Bridal Sets',
    group: 'Jewellery',
    shortDescription: 'Nose pins, bridal nath, bichhiya toe rings, kamarbandh waist chains, hathphool & bajubandh.',
    introParagraph:
      'Discover specialized Indian jewellery silhouettes including pierced and clip-on nose pins, bridal naths with pearl chains, adjustable toe rings (bichhiya), waist chains (kamarbandh), hand harnesses (hathphool), armlets (bajubandh), temple jewellery, and coordinated bridal sets.',
    stylingNote:
      'Clip-on press nose pins and naths allow you to wear traditional silhouettes comfortably even without a nose piercing.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/2.webp',
    heroImageAlt: 'Traditional Indian nose pins, nath, kamarbandh and bridal sets',
    seoTitle: 'Nose Pins, Nath, Toe Rings, Kamarbandh & Bridal Jewellery Sets | VALENTINA',
    metaDescription:
      'Shop nose pins, bridal nath, toe rings (bichhiya), kamarbandh, hathphool, bajubandh, temple jewellery and oxidised sets at VALENTINA.',
  },

  // ==========================================
  // 2. HANDBAGS & PURSES
  // ==========================================
  {
    slug: 'bags',
    name: 'Handbags & Purses',
    h1: 'Handbags & Purses — Slings, Totes, Shoulder Bags, Clutches & Wallets',
    group: 'Handbags & Purses',
    shortDescription: 'Sling bags, crossbody, totes, shoulder bags, mini bags, clutches, wallets & satchels.',
    introParagraph:
      'Explore 50 distinct silhouettes across our Handbags & Purses department. From structured office totes, satchels, hobo and bucket bags to compact crossbody slings, quilted mini bags, beaded evening clutches, and precision-stitched wallets and cardholders.',
    stylingNote:
      'Filter by bag silhouette, strap style, or colour palette to match workdays, travel, or wedding receptions.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/1.webp',
    heroImageAlt: 'Structured women’s handbag and purse collection',
    seoTitle: 'Handbags & Purses for Women — Slings, Totes, Clutches & Wallets | VALENTINA',
    metaDescription:
      'Shop women’s handbags, sling bags, crossbody bags, office totes, shoulder bags, evening clutches, bucket bags and wallets at VALENTINA.',
    featuredOnHomepage: true,
  },
  {
    slug: 'sling-bags',
    name: 'Sling & Crossbody Bags',
    h1: 'Sling & Crossbody Bags — Hands-Free Everyday Silhouettes',
    group: 'Handbags & Purses',
    shortDescription: 'Adjustable crossbody slings, camera bags, quilted slings & saddle silhouettes.',
    introParagraph:
      'Engineered for effortless hands-free movement, our sling and crossbody bags feature adjustable straps, secure zip and turn-lock closures, and smart internal compartments.',
    stylingNote:
      'Adjust the strap drop between 45cm and 58cm to wear high across the torso or resting at the hip.',
    heroImage: "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/1.webp",
    heroImageAlt: 'Women’s crossbody and sling bag collection',
    seoTitle: 'Sling Bags & Crossbody Bags for Women | VALENTINA',
    metaDescription:
      'Discover everyday sling bags, crossbody bags, quilted slings and saddle bags for women at VALENTINA.',
  },
  {
    slug: 'shoulder-bags',
    name: 'Shoulder, Tote & Satchel Bags',
    h1: 'Shoulder Bags, Totes, Satchels, Bucket & Hobo Bags',
    group: 'Handbags & Purses',
    shortDescription: 'Structured shoulder bags, laptop totes, bucket bags, hobo bags & satchels.',
    introParagraph:
      'From classic underarm baguette shoulder bags and structured top-handle satchels to roomy work totes, drawstring bucket bags, and relaxed hobo silhouettes.',
    stylingNote:
      'Choose structured totes with padded dividers for office days and mini shoulder bags for evening outings.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/1.webp',
    heroImageAlt: 'Structured shoulder bags, totes and satchels for women',
    seoTitle: 'Women’s Shoulder Bags, Totes, Satchels & Bucket Bags | VALENTINA',
    metaDescription:
      'Browse structured shoulder bags, office totes, satchels, bucket bags and hobo bags at VALENTINA.',
  },
  {
    slug: 'wallets',
    name: 'Wallets, Cardholders & Clutches',
    h1: 'Wallets, Cardholders, Evening Bags & Party Clutches',
    group: 'Handbags & Purses',
    shortDescription: 'Slim cardholders, zip-around wallets, box clutches & festive potli/evening bags.',
    introParagraph:
      'Organise cards, currency and coins in slim stitched wallets, or carry your evening essentials in pleated satin clutches, hard-frame box bags, and festive purses.',
    stylingNote:
      'Pair a compact 6-slot cardholder with mini bags so your handbag silhouette stays sleek.',
    heroImage: "https://cdn.dummyjson.com/product-images/womens-bags/blue-women's-handbag/1.webp",
    heroImageAlt: 'Women’s wallets, cardholders and evening clutches',
    seoTitle: 'Wallets, Cardholders & Evening Clutches for Women | VALENTINA',
    metaDescription:
      'Shop women’s wallets, slim cardholders, zip coin purses and evening clutches at VALENTINA.',
  },

  // ==========================================
  // 3. WATCHES & SUNGLASSES
  // ==========================================
  {
    slug: 'watches-and-sunglasses',
    name: 'Watches & Sunglasses',
    h1: 'Watches & Sunglasses — Analog Timepieces & Fashion Eyewear',
    group: 'Watches & Sunglasses',
    shortDescription: 'Minimalist watches, bracelet watches, cat-eye sunglasses, oversized & retro frames.',
    introParagraph:
      'Explore 70 distinct styles across our Watches and Sunglasses department. Discover minimalist round and square-dial analog wristwatches with metal mesh, link, or leatherette straps alongside cat-eye, oversized, aviator-inspired, round, rectangular, and rimless-style fashion sunglasses.',
    stylingNote:
      'Match your watch case finish (gold, silver, or rose-gold tone) with the bridge hardware of your sunglasses for a cohesive daytime look.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp',
    heroImageAlt: 'Women’s analog wristwatches and fashion sunglasses collection',
    seoTitle: 'Women’s Watches & Sunglasses — Fashion Timepieces & Eyewear | VALENTINA',
    metaDescription:
      'Shop women’s wristwatches and fashion sunglasses at VALENTINA. Compare metal-strap, leather-strap and bracelet watches plus cat-eye, oversized and retro frames.',
    featuredOnHomepage: true,
  },
  {
    slug: 'watches',
    name: 'Watches',
    h1: 'Women’s Watches — Minimalist, Metal-Strap, Leather-Strap & Bracelet Styles',
    group: 'Watches & Sunglasses',
    shortDescription: 'Round & square dials across gold-tone, silver-tone, rose-gold & leatherette straps.',
    introParagraph:
      'Browse dress watches, casual everyday watches, petite bracelet-style timepieces, and architectural square-dial watches in gold-tone, silver-tone, rose-gold-tone, and colourful strap finishes. Product specifications reflect verified supplier catalogue details without unsupported horological claims.',
    stylingNote:
      'Bracelet-style watches pair naturally next to delicate chain or tennis bracelets.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp',
    heroImageAlt: 'Women’s dress and minimalist analog watches',
    seoTitle: 'Women’s Fashion Watches — Metal, Leather & Bracelet Straps | VALENTINA',
    metaDescription:
      'Explore minimalist, metal-strap, leather-strap, bracelet-style, square-dial and round-dial watches for women at VALENTINA.',
  },
  {
    slug: 'sunglasses-and-eyewear',
    name: 'Sunglasses & Eyewear',
    h1: 'Sunglasses & Eyewear — Cat-Eye, Oversized, Aviator, Retro & Rimless Frames',
    group: 'Watches & Sunglasses',
    shortDescription: 'Cat-eye, oversized, round, square, aviator-inspired, rectangular, oval & rimless frames.',
    introParagraph:
      'Frame your face with fashion eyewear across classic tortoiseshell, jet black, champagne crystal, and tinted pastel acetate and metal frames. Frame dimensions and tint details are listed clearly per product.',
    stylingNote:
      'Angular cat-eye and rectangular frames add definition to softer facial contours, while round and oval frames balance angular jawlines.',
    heroImage: 'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp',
    heroImageAlt: 'Cat-eye, oversized and classic women’s sunglasses',
    seoTitle: 'Women’s Sunglasses — Cat-Eye, Oversized, Retro & Aviator Frames | VALENTINA',
    metaDescription:
      'Shop women’s fashion sunglasses at VALENTINA, including cat-eye, oversized, round, square, aviator-inspired, rectangular, oval and rimless frames.',
  },

  // ==========================================
  // 4. MAKEUP & BEAUTY
  // ==========================================
  {
    slug: 'makeup-and-beauty',
    name: 'Makeup & Beauty',
    h1: 'Makeup, Skincare, Nail Products, Beauty Tools & Gift Sets',
    group: 'Makeup & Beauty',
    shortDescription: 'Face, eye & lip makeup, brushes, organisers, nail care, skincare & curated beauty kits.',
    introParagraph:
      'Welcome to the VALENTINA Makeup & Beauty department featuring nearly 180 distinct products across Face Makeup, Eye Makeup, Lip Products, Makeup Tools & Organisers, Nail Products, Skincare Essentials, and Beauty Gift Sets. Every listing presents clear shade, finish, volume, usage, and ingredient transparency.',
    stylingNote:
      'Use the Shade, Finish, and Subcategory filters to compare matte, satin, and glossy formulas across complexion, eye, and lip essentials.',
    heroImage: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
    heroImageAlt: 'Lipstick, eyeshadow palette, mascara and skincare beauty essentials',
    seoTitle: 'Makeup & Beauty — Face, Eye, Lip, Nails, Skincare & Tools | VALENTINA',
    metaDescription:
      'Explore VALENTINA Makeup & Beauty: foundations, lipsticks, eyeshadow palettes, kajal, mascara, makeup brushes, nail polish, skincare and beauty gift kits.',
    featuredOnHomepage: true,
  },
  {
    slug: 'face-makeup',
    name: 'Face Makeup',
    h1: 'Face Makeup — Foundation, Concealer, Compact, Blush, Highlighter & Primer',
    group: 'Makeup & Beauty',
    shortDescription: 'Foundations, concealers, compacts, loose powders, BB/CC creams, blush, bronzer & sprays.',
    introParagraph:
      'Build a smooth, natural-looking complexion with foundations, concealers, pressed compacts, translucent loose setting powders, BB and CC creams, primers, powder and liquid blushes, highlighters, contours, bronzers, colour correctors, and setting sprays.',
    stylingNote:
      'Select shades by undertone (Warm, Neutral, or Cool) and set cream formulas lightly through the T-zone with compact or loose powder.',
    heroImage: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
    heroImageAlt: 'Face compact powder, foundation and complexion makeup',
    seoTitle: 'Face Makeup — Foundation, Concealer, Compact Powder & Blush | VALENTINA',
    metaDescription:
      'Shop face makeup at VALENTINA including liquid foundation, concealer, compact powder, loose setting powder, BB cream, primer, blush, highlighter and bronzer.',
  },
  {
    slug: 'eye-makeup',
    name: 'Eye Makeup',
    h1: 'Eye Makeup — Mascara, Eyeliner, Kajal, Eyeshadow Palettes & Brow Essentials',
    group: 'Makeup & Beauty',
    shortDescription: 'Mascara, liquid & gel eyeliner, kajal, eyeshadow palettes, brow pencils & lashes.',
    introParagraph:
      'Define and accentuate your eyes with lengthening and volumising mascaras, precision felt-tip and gel eyeliners, velvety kohl kajals, curated multi-pan eyeshadow palettes, single shimmer shadows, brow pencils and gels, false eyelashes, and ergonomic lash curlers.',
    stylingNote:
      'Pair a smudge-resistant matte kajal along the waterline with neutral bronze eyeshadows for effortless everyday definition.',
    heroImage: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
    heroImageAlt: 'Eyeshadow palette with mirror and mascara wand',
    seoTitle: 'Eye Makeup — Eyeshadow Palettes, Kajal, Mascara & Eyeliner | VALENTINA',
    metaDescription:
      'Discover eye makeup at VALENTINA: eyeshadow palettes, kajal, mascara, eyeliner, eyebrow pencils, brow gels, false eyelashes and curlers.',
  },
  {
    slug: 'lip-makeup',
    name: 'Lip Products',
    h1: 'Lip Makeup — Matte & Satin Lipsticks, Liquid Lipsticks, Gloss, Tints & Oils',
    group: 'Makeup & Beauty',
    shortDescription: 'Bullet lipsticks, liquid lipsticks, lip gloss, lip liners, balms, tints, oils & crayons.',
    introParagraph:
      'Explore lip colour and care across classic bullet lipsticks, transfer-resistant liquid mattes, high-shine lip glosses, precision lip liners, nourishing tinted balms, lightweight lip tints, conditioning lip oils, and twist-up lip crayons.',
    stylingNote:
      'Outline with a neutral rose or terracotta lip liner before applying satin lipstick or lip oil for clean, feathered-free edges.',
    heroImage: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
    heroImageAlt: 'Classic bullet lipstick and liquid lip colour collection',
    seoTitle: 'Lip Products — Lipsticks, Liquid Mattes, Lip Gloss, Oils & Tints | VALENTINA',
    metaDescription:
      'Shop lipsticks, liquid lipsticks, lip gloss, lip liners, lip balms, lip tints, lip oils and lip crayons in matte, satin and glossy finishes at VALENTINA.',
  },
  {
    slug: 'makeup-tools-and-organisers',
    name: 'Makeup Tools & Organisers',
    h1: 'Makeup Brushes, Sponges, Vanity Mirrors, Cosmetic Bags & Organisers',
    group: 'Makeup & Beauty',
    shortDescription: 'Face & eye brushes, brush sets, blenders, puffs, tweezers, mirrors & vanity organisers.',
    introParagraph:
      'Achieve seamless application and tidy vanity storage with synthetic-bristle makeup brushes, coordinated brush sets, latex-free blending sponges, velvet powder puffs, slanted tweezers, LED and compact mirrors, quilted makeup pouches, acrylic organisers, and travel vanity train cases.',
    stylingNote:
      'Wash makeup brushes and blending sponges weekly with mild cleanser and let them air-dry flat on a clean towel.',
    heroImage: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
    heroImageAlt: 'Makeup brushes, blending sponges and cosmetic organisers',
    seoTitle: 'Makeup Tools & Organisers — Brushes, Sponges, Mirrors & Cases | VALENTINA',
    metaDescription:
      'Browse makeup brushes, brush sets, beauty blenders, powder puffs, tweezers, makeup mirrors, cosmetic bags and organisers at VALENTINA.',
  },
  {
    slug: 'nail-products',
    name: 'Nail Products',
    h1: 'Nail Polish, Gel-Effect Lacquer, Press-On Nails & Manicure Tools',
    group: 'Makeup & Beauty',
    shortDescription: 'Creme & shimmer nail polish, gel-effect lacquers, press-on nails, files, buffers & removers.',
    introParagraph:
      'Create salon-neat manicures at home with high-gloss creme and shimmer nail polishes, no-lamp gel-effect top coats, reusable press-on nail sets, nail art stickers and studs, glass nail files, 4-way buffers, gentle acetone-free removers, and stainless-steel cuticle tools.',
    stylingNote:
      'Apply a thin base coat, two even layers of nail colour, and seal the free edge of the nail tip with top coat.',
    heroImage: 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/1.webp',
    heroImageAlt: 'Bottle of red nail polish and manicure nail care products',
    seoTitle: 'Nail Products — Nail Polish, Press-On Nails & Manicure Tools | VALENTINA',
    metaDescription:
      'Shop nail polish, gel-effect lacquers, press-on nails, nail art accessories, nail files, buffers and polish removers at VALENTINA.',
  },
  {
    slug: 'skincare-and-beauty',
    name: 'Skincare & Beauty Essentials',
    h1: 'Skincare Essentials — Cleansers, Moisturisers, Sunscreens, Serums & Masks',
    group: 'Makeup & Beauty',
    shortDescription: 'Gentle cleansers, moisturisers, sunscreens, serums, toners, masks, micellar water & tools.',
    introParagraph:
      'Explore daily skincare routines featuring gentle foaming and gel cleansers, hydrating moisturisers, broad-spectrum sunscreens, targeted serums, balancing toners, clay and sheet face masks, lip sleeping masks, micellar makeup removers, and facial massage rollers. Key ingredients, usage directions, and shelf-life guidance are clearly listed.',
    stylingNote:
      'Apply products from thinnest to thickest texture: Cleanser → Toner → Serum → Moisturiser → Daytime Sunscreen.',
    heroImage: 'https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/1.webp',
    heroImageAlt: 'Skincare cleanser, serum and moisturiser bottles',
    seoTitle: 'Skincare & Beauty Essentials — Cleansers, Serums & Moisturisers | VALENTINA',
    metaDescription:
      'Discover facial cleansers, moisturisers, sunscreens, serums, toners, face masks, micellar water and facial beauty tools at VALENTINA.',
  },
  {
    slug: 'makeup-kits-and-gift-sets',
    name: 'Makeup Kits & Gift Sets',
    h1: 'Makeup Kits, Jewellery Gift Boxes & Festive Accessory Combos',
    group: 'Makeup & Beauty',
    shortDescription: 'Beginner makeup kits, lipstick sets, bracelet-earring combos & festive gift boxes.',
    introParagraph:
      'Thoughtfully bundled for birthdays, weddings, festivals, and self-gifting. Explore beginner makeup starter kits, mini lipstick vaults, eyeshadow-and-brush duos, travel beauty kits, necklace-and-earring sets, bracelet combos, and keepsake gift packaging.',
    stylingNote:
      'Each gift set arrives arranged in a coordinated presentation box with an itemized contents list.',
    heroImage: 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/1.webp',
    heroImageAlt: 'Curated beauty and jewellery gift set presentation',
    seoTitle: 'Makeup Kits & Gift Sets — Beauty Boxes & Jewellery Combos | VALENTINA',
    metaDescription:
      'Shop beginner makeup kits, lipstick sets, travel beauty kits, jewellery gift boxes and festive accessory combos at VALENTINA.',
  },

  // ==========================================
  // 5. HAIR ACCESSORIES
  // ==========================================
  {
    slug: 'hair-accessories',
    name: 'Hair Accessories',
    h1: 'Hair Accessories — Claw Clips, Scrunchies, Hairbands, Pins & Bridal Hair',
    group: 'Hair Accessories',
    shortDescription: 'Claw clips, velvet & satin scrunchies, padded hairbands, pearl clips, bows & bridal hair.',
    introParagraph:
      'Refresh your hairstyle in seconds with our 36-piece Hair Accessories collection—featuring marbled cellulose acetate claw clips, satin and velvet scrunchies, cushioned headbands, pearl barrettes, satin ribbon bows, and traditional floral/jeweled bridal hair accessories.',
    stylingNote:
      'Use rounded-tooth acetate claw clips for crease-free daytime updos and pearl pins or bridal hair vines for festive occasions.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/1.webp',
    heroImageAlt: 'Women’s hair clips, claw clips, scrunchies and headbands',
    seoTitle: 'Women’s Hair Accessories — Claw Clips, Scrunchies, Bows & Hairbands | VALENTINA',
    metaDescription:
      'Shop claw clips, scrunchies, hairbands, headbands, pearl hairpins, satin bow clips, barrettes and bridal hair accessories at VALENTINA.',
    featuredOnHomepage: true,
  },
  {
    slug: 'hair-clips',
    name: 'Hair Clips, Claws & Barrettes',
    h1: 'Hair Clips — Acetate Claw Clips, Satin Bows, Pearl Clips & Barrettes',
    group: 'Hair Accessories',
    shortDescription: 'Pastel & tortoiseshell claw clips, satin bow barrettes, pearl pins & bridal hair clips.',
    introParagraph:
      'Discover gentle-grip hair claws, French barrettes, alligator pins, and decorative bridal hair clips in multiple sizes and finishes.',
    stylingNote:
      'Choose 11cm maxi claws for thick hair updos and 6cm–8cm barrettes for half-up styling.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/3.webp',
    heroImageAlt: 'Decorative hair clips, claw clips and barrettes',
    seoTitle: 'Hair Clips, Claw Clips, Satin Bows & Pearl Barrettes | VALENTINA',
    metaDescription:
      'Browse claw clips, satin bow clips, pearl hairpins, barrettes and embellished hair clips at VALENTINA.',
  },
  {
    slug: 'scrunchies',
    name: 'Scrunchies',
    h1: 'Scrunchies — Velvet, Mulberry-Finish Satin, Organza & Printed Sets',
    group: 'Hair Accessories',
    shortDescription: 'Crease-minimising scrunchies in single oversized styles, trios & 5-piece sets.',
    introParagraph:
      'Plush velvet, smooth satin, and sheer organza scrunchies designed to secure ponytails and buns gently without tugging hair strands.',
    stylingNote:
      'Keep a neutral satin scrunchie on your wrist for quick, crease-free updos throughout the day.',
    heroImage: 'https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/1.webp',
    heroImageAlt: 'Fabric hair scrunchies in neutral and pastel tones',
    seoTitle: 'Hair Scrunchies — Velvet, Satin & Organza Scrunchie Sets | VALENTINA',
    metaDescription:
      'Shop velvet, satin and organza scrunchies in single oversized styles and multi-packs at VALENTINA.',
  },
  {
    slug: 'hairbands',
    name: 'Hairbands & Headbands',
    h1: 'Hairbands & Headbands — Padded, Knotted, Pearl & Embellished Styles',
    group: 'Hair Accessories',
    shortDescription: 'Cushioned velvet hairbands, knotted satin headbands & pearl-studded crowns.',
    introParagraph:
      'Comfortable, pressure-distributed hairbands and headbands with flexible cores and soft fabric-wrapped ear tips.',
    stylingNote:
      'Pair a pearl-embellished headband with sleek open hair for instant dinner or festive polish.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-jewellery/green-oval-earring/3.webp',
    heroImageAlt: 'Padded and pearl-embellished women’s hairbands',
    seoTitle: 'Hairbands & Headbands for Women — Padded, Satin & Pearl | VALENTINA',
    metaDescription:
      'Explore padded hairbands, knotted headbands and pearl-embellished hair accessories at VALENTINA.',
  },

  // ==========================================
  // 6. SCARVES & MORE FASHION ACCESSORIES
  // ==========================================
  {
    slug: 'more-accessories',
    name: 'More Accessories',
    h1: 'Scarves, Stoles, Fashion Belts, Brooches, Bag Charms & Keychains',
    group: 'More Accessories',
    shortDescription: 'Printed & satin scarves, stoles, waist belts, brooches, bag charms, keychains & organisers.',
    introParagraph:
      'Discover the finishing touches that personalise every outfit and handbag—including printed satin neck scarves, lightweight stoles, waist and dress belts with sculpted buckles, enamel and crystal lapel brooches, decorative pins, bag charms, keychains, makeup pouches, and jewellery organisers.',
    stylingNote:
      'Tie a printed satin square scarf onto the handle of your neutral tote bag or wear a crystal brooch on a tailored blazer lapel.',
    heroImage: 'https://cdn.dummyjson.com/product-images/tops/blue-frock/1.webp',
    heroImageAlt: 'Women’s silk scarves, belts, brooches and fashion accessories',
    seoTitle: 'Scarves, Stoles, Belts, Brooches, Bag Charms & Organisers | VALENTINA',
    metaDescription:
      'Shop printed scarves, satin scarves, lightweight stoles, fashion belts, brooches, bag charms, keychains and organisers at VALENTINA.',
    featuredOnHomepage: true,
  },
  {
    slug: 'makeup-pouches',
    name: 'Makeup Pouches',
    h1: 'Makeup Pouches — Quilted & Structured Vanity Cases',
    group: 'More Accessories',
    shortDescription: 'Wipe-clean lined cosmetic pouches and vanity train cases for daily carry and travel.',
    introParagraph:
      'Keep cosmetics neatly arranged at home or inside your tote with quilted linen pouches, pebbled vegan leather vanity bags, and multi-tier train cases.',
    stylingNote:
      'Choose a compact 18cm pouch for handbag touch-ups and a wide gusseted train case for travel.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/2.webp',
    heroImageAlt: 'Quilted makeup pouch and structured vanity case',
    seoTitle: 'Makeup Pouches & Cosmetic Vanity Bags | VALENTINA',
    metaDescription:
      'Shop quilted makeup pouches, travel cosmetic bags and structured vanity train cases at VALENTINA.',
  },
  {
    slug: 'jewellery-organisers',
    name: 'Jewellery Organisers',
    h1: 'Jewellery Organisers — Velvet Travel Cases & Dresser Storage Boxes',
    group: 'More Accessories',
    shortDescription: 'Zip travel jewellery cases, multi-tier velvet dresser chests & tri-fold travel rolls.',
    introParagraph:
      'Protect rings, chains, earrings, and bangles from tangling or scratching with micro-velvet lined travel organisers and tabletop storage boxes.',
    stylingNote:
      'Store necklaces on individual hooks and keep earrings paired on perforated stud cards.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/2.webp',
    heroImageAlt: 'Velvet-lined travel jewellery organiser and storage box',
    seoTitle: 'Jewellery Organisers & Velvet Storage Boxes | VALENTINA',
    metaDescription:
      'Discover velvet travel jewellery organisers, dresser jewellery boxes and compact travel rolls at VALENTINA.',
  },
  {
    slug: 'everyday-essentials',
    name: 'Everyday Essentials',
    h1: 'Everyday Essentials — Organisers, Pouches, Wallets & Daily Slings',
    group: 'More Accessories',
    shortDescription: 'Thoughtful storage, vanity pouches, cardholders and daily carry companions.',
    introParagraph:
      'Our Everyday Essentials edit brings together practical daily companions including travel jewellery organisers, makeup pouches, slim card wallets, and hands-free slings.',
    stylingNote:
      'Coordinate your wallet, cosmetic pouch, and travel jewellery case in matching neutral tones.',
    heroImage: "https://cdn.dummyjson.com/product-images/womens-bags/heshe-women's-leather-bag/2.webp",
    heroImageAlt: 'Everyday wallets, pouches and organisers',
    seoTitle: 'Everyday Essentials — Organisers, Pouches & Wallets | VALENTINA',
    metaDescription:
      'Explore VALENTINA’s Everyday Essentials collection of jewellery organisers, makeup pouches and card wallets.',
  },

  // ==========================================
  // 7. EVERYDAY & OCCASION COLLECTIONS (Section 4.L)
  // ==========================================
  {
    slug: 'daily-wear',
    name: 'Daily Wear Edit',
    h1: 'Daily Wear Collection — Lightweight Jewellery, Bags & Everyday Beauty',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Feather-light hoops, minimal chains, claw clips, tinted lip balms & daily slings.',
    introParagraph:
      'Curated from across our store without duplicate listings, the Daily Wear collection highlights comfortable, effortless pieces designed for everyday routines.',
    stylingNote:
      'Focus on lightweight studs, breathable BB creams, and hands-free crossbody slings.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/1.webp',
    heroImageAlt: 'Daily wear watches, earrings and everyday accessories',
    seoTitle: 'Daily Wear Jewellery, Bags & Beauty Collection | VALENTINA',
    metaDescription:
      'Shop VALENTINA’s Daily Wear collection featuring lightweight earrings, minimal chains, daily bangles, sling bags and everyday beauty essentials.',
  },
  {
    slug: 'college-and-casual-wear',
    name: 'College & Casual Wear',
    h1: 'College & Casual Wear — Oxidised Jewellery, Tote Bags, Clips & Lip Tints',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Oxidised jhumkas, pastel claw clips, roomy totes, sunglasses & sheer lip tints.',
    introParagraph:
      'Playful, expressive, and practical pieces organised for campus days, coffee catch-ups, and weekend outings.',
    stylingNote:
      'Pair oxidised silver-tone jhumkas with cotton kurtas or denim and carry a roomy tote.',
    heroImage: 'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/1.webp',
    heroImageAlt: 'Casual sunglasses, totes and college accessories',
    seoTitle: 'College & Casual Wear Accessories & Beauty | VALENTINA',
    metaDescription:
      'Explore oxidised earrings, stackable rings, claw clips, scrunchies, tote bags, sunglasses and lip tints in the VALENTINA College & Casual edit.',
  },
  {
    slug: 'office-wear',
    name: 'Office Wear Edit',
    h1: 'Office Wear Collection — Structured Totes, Minimalist Watches & Subtle Studs',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Tailored satchels, minimalist analog watches, pearl studs, pendant chains & satin lipsticks.',
    introParagraph:
      'Polished, understated pieces selected to complement formalwear, blazers, and work sarees without distraction.',
    stylingNote:
      'Combine a structured leatherette tote, a classic round-dial watch, and 12mm pearl or botanical studs.',
    heroImage: 'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/1.webp',
    heroImageAlt: 'Minimalist office watch and structured work accessories',
    seoTitle: 'Office Wear Jewellery, Handbags, Watches & Makeup | VALENTINA',
    metaDescription:
      'Discover structured office bags, minimalist watches, subtle stud earrings, minimal chains and neutral satin lipsticks at VALENTINA.',
  },
  {
    slug: 'party-wear',
    name: 'Party Wear Edit',
    h1: 'Party Wear Collection — Cocktail Rings, Evening Clutches & Glam Makeup',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Crystal ear climbers, tennis bracelets, pleated evening clutches & shimmer palettes.',
    introParagraph:
      'Statement silhouettes and luminous finishes curated for cocktail evenings, dinner parties, and celebrations.',
    stylingNote:
      'Pair crystal drop earrings with a satin box clutch and a transfer-resistant liquid matte lip.',
    heroImage: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
    heroImageAlt: 'Evening party makeup palette, clutches and statement jewellery',
    seoTitle: 'Party Wear Jewellery, Clutches & Evening Makeup | VALENTINA',
    metaDescription:
      'Shop party-wear cocktail rings, crystal bracelets, chandelier earrings, evening clutches and eyeshadow palettes at VALENTINA.',
  },
  {
    slug: 'festive-wear',
    name: 'Festive Wear Edit',
    h1: 'Festive Wear Collection — Kundan, Meenakari Bangles, Jhumkas & Potlis',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Kundan & Polki earrings, Meenakari bangles, chandbalis, payal & festive gift boxes.',
    introParagraph:
      'Celebrate Diwali, Eid, Puja, and family gatherings with traditional Kundan, Polki, Meenakari, and pearl-accented accessories.',
    stylingNote:
      'Coordinate antique gold chandbalis with a stack of glass and Kundan bangles.',
    heroImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Clevelandart_1973.64.1.jpg/960px-Clevelandart_1973.64.1.jpg',
    heroImageAlt: 'Festive Indian bangles and traditional jewellery',
    seoTitle: 'Festive Wear Jewellery, Bangles & Ethnic Accessories | VALENTINA',
    metaDescription:
      'Explore Kundan earrings, chandbalis, Meenakari bangles, ghungroo payal, maang tikka and festive purses at VALENTINA.',
  },
  {
    slug: 'wedding-and-bridal-wear',
    name: 'Wedding & Bridal Wear',
    h1: 'Wedding & Bridal Collection — Bridal Chooda, Necklace Sets, Maang Tikka & Nath',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Bridal necklace sets, chooda bangle sets, matha patti, passa, borla, nath & hathphool.',
    introParagraph:
      'An heirloom-inspired edit for brides, bridesmaids, and wedding guests—spanning Kundan and Polki bridal sets, chooda sets, maang tikkas, naths, kamarbandhs, and bridal vanity cases.',
    stylingNote:
      'Keep bridal sets organised by ceremony inside a double-layer velvet jewellery chest.',
    heroImage: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Khalili_Collection_Islamic_Art_jly_1261.3.jpg/960px-Khalili_Collection_Islamic_Art_jly_1261.3.jpg',
    heroImageAlt: 'Bridal gold-toned necklace set and wedding jewellery',
    seoTitle: 'Wedding & Bridal Jewellery, Bangle Sets & Headpieces | VALENTINA',
    metaDescription:
      'Shop bridal necklace sets, chooda bangle sets, maang tikka, matha patti, bridal nath, hathphool and wedding clutches at VALENTINA.',
  },
  {
    slug: 'travel-essentials',
    name: 'Travel Essentials',
    h1: 'Travel Essentials — Jewellery Organisers, Train Cases, Slings & Mini Skincare',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Crush-resistant jewellery cases, vanity train cases, crossbody slings, sunglasses & SPF.',
    introParagraph:
      'Pack smart and keep your accessories tangle-free on holidays and destination weddings with our curated Travel Essentials collection.',
    stylingNote:
      'Pair a zip-around travel jewellery organiser with a wipe-clean makeup pouch inside your carry-on.',
    heroImage: 'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp',
    heroImageAlt: 'Travel sunglasses, crossbody bags and jewellery organisers',
    seoTitle: 'Travel Essentials — Jewellery Organisers, Pouches & Slings | VALENTINA',
    metaDescription:
      'Browse travel jewellery organisers, makeup train cases, crossbody sling bags, sunglasses and travel-friendly skincare at VALENTINA.',
  },
  {
    slug: 'gifts-and-special-occasions',
    name: 'Gifts & Special Occasions',
    h1: 'Gifts & Special Occasions — Curated Jewellery, Watch & Beauty Gift Sets',
    group: 'Occasion & Edit Collections',
    shortDescription: 'Jewellery gift boxes, makeup kits, heart lockets, couple rings & luxury watch sets.',
    introParagraph:
      'Thoughtful gift ideas for birthdays, anniversaries, bridesmaids, and festive exchanges across every price point.',
    stylingNote:
      'Heart lockets, initial pendants, and curated lipstick or jewellery gift boxes make effortless, personal gifts.',
    heroImage: 'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp',
    heroImageAlt: 'Curated beauty and jewellery gift sets for special occasions',
    seoTitle: 'Gifts for Women — Jewellery Gift Boxes, Makeup Kits & Watches | VALENTINA',
    metaDescription:
      'Find thoughtful gifts for women at VALENTINA, including jewellery gift boxes, heart lockets, watch sets and curated makeup kits.',
  },
];

export function getCollectionBySlug(slug: string): CollectionInfo | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}
