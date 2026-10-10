export type StudioCategoryShape =
  | 'earrings-drop'
  | 'earrings-hoop'
  | 'earrings-stud'
  | 'necklace-pendant'
  | 'necklace-layered'
  | 'necklace-choker'
  | 'rings-stack'
  | 'rings-signet'
  | 'rings-stone'
  | 'bracelet-charm'
  | 'bracelet-cuff'
  | 'bracelet-tennis'
  | 'hair-bow'
  | 'hair-claw'
  | 'hair-pins'
  | 'scrunchie-set'
  | 'hairband-padded'
  | 'bag-shoulder'
  | 'bag-sling'
  | 'wallet-card'
  | 'pouch-makeup'
  | 'organiser-jewellery';

export type StudioAngle = 'front' | 'profile' | 'detail' | 'styled';

interface StudioImageOptions {
  productName: string;
  shape: StudioCategoryShape;
  primaryHex: string;
  secondaryHex?: string;
  colorName: string;
  secondaryLabel: string;
  angle: StudioAngle;
  sku: string;
}

function renderMotifSVG(
  shape: StudioCategoryShape,
  primaryHex: string,
  secondaryHex: string,
  angle: StudioAngle
): string {
  const scaleTransform =
    angle === 'front'
      ? 'translate(400, 290) scale(1)'
      : angle === 'profile'
      ? 'translate(400, 295) rotate(-8) scale(0.95, 1.02)'
      : angle === 'detail'
      ? 'translate(400, 310) scale(1.26)'
      : 'translate(400, 285) rotate(4) scale(0.92)';

  switch (shape) {
    case 'earrings-drop':
      return `
        <g transform="${scaleTransform}">
          <!-- Left Earring -->
          <g transform="translate(-75, -10)">
            <ellipse cx="0" cy="-70" rx="14" ry="22" fill="none" stroke="url(#mainGrad)" stroke-width="8"/>
            <circle cx="0" cy="-42" r="5" fill="url(#mainGrad)"/>
            <path d="M0,-35 C24,-35 34,8 28,38 C22,64 -22,64 -28,38 C-34,8 -24,-35 0,-35 Z" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2.5"/>
            <ellipse cx="-8" cy="12" rx="7" ry="18" fill="#FFFFFF" opacity="0.55" transform="rotate(-12 -8 12)"/>
          </g>
          <!-- Right Earring -->
          <g transform="translate(75, 5)">
            <ellipse cx="0" cy="-70" rx="14" ry="22" fill="none" stroke="url(#mainGrad)" stroke-width="8"/>
            <circle cx="0" cy="-42" r="5" fill="url(#mainGrad)"/>
            <path d="M0,-35 C24,-35 34,8 28,38 C22,64 -22,64 -28,38 C-34,8 -24,-35 0,-35 Z" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2.5"/>
            <ellipse cx="-8" cy="12" rx="7" ry="18" fill="#FFFFFF" opacity="0.55" transform="rotate(-12 -8 12)"/>
          </g>
        </g>`;

    case 'earrings-hoop':
      return `
        <g transform="${scaleTransform}">
          <g transform="translate(-72, 0) rotate(-10)">
            <circle cx="0" cy="0" r="58" fill="none" stroke="url(#mainGrad)" stroke-width="18" stroke-dasharray="315 60" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="50" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.45"/>
            <line x1="-18" y1="-52" x2="22" y2="-48" stroke="url(#mainGrad)" stroke-width="4" stroke-linecap="round"/>
          </g>
          <g transform="translate(72, 12) rotate(12)">
            <circle cx="0" cy="0" r="58" fill="none" stroke="url(#mainGrad)" stroke-width="18" stroke-dasharray="315 60" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="50" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.45"/>
            <line x1="-18" y1="-52" x2="22" y2="-48" stroke="url(#mainGrad)" stroke-width="4" stroke-linecap="round"/>
          </g>
        </g>`;

    case 'earrings-stud':
      return `
        <g transform="${scaleTransform}">
          <g transform="translate(-70, -8)">
            <circle cx="0" cy="0" r="38" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2" opacity="0.95"/>
            <circle cx="0" cy="0" r="24" fill="url(#secondaryGrad)" stroke="url(#mainGrad)" stroke-width="3"/>
            <circle cx="-8" cy="-8" r="6" fill="#FFFFFF" opacity="0.65"/>
          </g>
          <g transform="translate(70, 8)">
            <circle cx="0" cy="0" r="38" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2" opacity="0.95"/>
            <circle cx="0" cy="0" r="24" fill="url(#secondaryGrad)" stroke="url(#mainGrad)" stroke-width="3"/>
            <circle cx="-8" cy="-8" r="6" fill="#FFFFFF" opacity="0.65"/>
          </g>
        </g>`;

    case 'necklace-pendant':
      return `
        <g transform="${scaleTransform}">
          <path d="M-150,-115 Q0,55 150,-115" fill="none" stroke="url(#mainGrad)" stroke-width="4.5" stroke-dasharray="6 3"/>
          <circle cx="0" cy="-22" r="7" fill="url(#mainGrad)"/>
          <ellipse cx="0" cy="22" rx="34" ry="42" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="1.5"/>
          <ellipse cx="0" cy="22" rx="22" ry="28" fill="url(#secondaryGrad)" opacity="0.88"/>
          <path d="M-10,6 L10,36 M10,6 L-10,36" stroke="#FFFFFF" stroke-width="1.5" opacity="0.45"/>
        </g>`;

    case 'necklace-layered':
      return `
        <g transform="${scaleTransform}">
          <path d="M-160,-110 Q0,10 160,-110" fill="none" stroke="url(#mainGrad)" stroke-width="3.5"/>
          <path d="M-150,-95 Q0,75 150,-95" fill="none" stroke="url(#mainGrad)" stroke-width="4.5" stroke-dasharray="8 4"/>
          <circle cx="-55" cy="-35" r="5" fill="url(#mainGrad)"/>
          <circle cx="0" cy="-18" r="6" fill="url(#mainGrad)"/>
          <circle cx="55" cy="-35" r="5" fill="url(#mainGrad)"/>
          <circle cx="0" cy="30" r="24" fill="url(#mainGrad)"/>
          <circle cx="0" cy="30" r="14" fill="url(#pearlGrad)"/>
        </g>`;

    case 'necklace-choker':
      return `
        <g transform="${scaleTransform}">
          <path d="M-145,-65 C-85,35 85,35 145,-65" fill="none" stroke="url(#mainGrad)" stroke-width="10" stroke-linecap="round"/>
          <g>
            <circle cx="-90" cy="-22" r="11" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
            <circle cx="-46" cy="0" r="12" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
            <circle cx="0" cy="9" r="14" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2.5"/>
            <circle cx="46" cy="0" r="12" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
            <circle cx="90" cy="-22" r="11" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
          </g>
        </g>`;

    case 'rings-stack':
      return `
        <g transform="${scaleTransform}">
          <ellipse cx="-35" cy="10" rx="68" ry="42" fill="none" stroke="url(#mainGrad)" stroke-width="12" transform="rotate(-14 -35 10)"/>
          <ellipse cx="18" cy="-8" rx="68" ry="42" fill="none" stroke="url(#mainGrad)" stroke-width="10" stroke-dasharray="14 4" transform="rotate(8 18 -8)"/>
          <ellipse cx="5" cy="24" rx="70" ry="42" fill="none" stroke="url(#mainGrad)" stroke-width="11" transform="rotate(-3 5 24)"/>
          <circle cx="5" cy="-18" r="9" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="3"/>
        </g>`;

    case 'rings-signet':
      return `
        <g transform="${scaleTransform}">
          <ellipse cx="0" cy="14" rx="78" ry="48" fill="none" stroke="url(#mainGrad)" stroke-width="18"/>
          <rect x="-36" y="-50" width="72" height="44" rx="18" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2"/>
          <rect x="-24" y="-40" width="48" height="24" rx="10" fill="url(#secondaryGrad)"/>
        </g>`;

    case 'rings-stone':
      return `
        <g transform="${scaleTransform}">
          <ellipse cx="0" cy="18" rx="74" ry="46" fill="none" stroke="url(#mainGrad)" stroke-width="11"/>
          <polygon points="0,-54 26,-26 0,2 -26,-26" fill="url(#secondaryGrad)" stroke="url(#mainGrad)" stroke-width="5"/>
          <polygon points="0,-44 15,-26 0,-8 -15,-26" fill="#FFFFFF" opacity="0.55"/>
        </g>`;

    case 'bracelet-charm':
      return `
        <g transform="${scaleTransform}">
          <ellipse cx="0" cy="-6" rx="105" ry="62" fill="none" stroke="url(#mainGrad)" stroke-width="9" stroke-dasharray="18 6"/>
          <circle cx="-65" cy="48" r="16" fill="url(#mainGrad)"/>
          <circle cx="0" cy="68" r="20" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="3"/>
          <path d="M62,38 L78,62 L50,62 Z" fill="url(#mainGrad)"/>
        </g>`;

    case 'bracelet-cuff':
      return `
        <g transform="${scaleTransform}">
          <path d="M-95,30 A105,68 0 1,1 95,30" fill="none" stroke="url(#mainGrad)" stroke-width="22" stroke-linecap="round"/>
          <circle cx="-95" cy="30" r="14" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="4"/>
          <circle cx="95" cy="30" r="14" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="4"/>
        </g>`;

    case 'bracelet-tennis':
      return `
        <g transform="${scaleTransform}">
          <ellipse cx="0" cy="0" rx="102" ry="60" fill="none" stroke="url(#mainGrad)" stroke-width="12" stroke-dasharray="12 5"/>
          <ellipse cx="0" cy="0" rx="102" ry="60" fill="none" stroke="#FFFFFF" stroke-width="5" stroke-dasharray="6 11" opacity="0.85"/>
        </g>`;

    case 'hair-bow':
      return `
        <g transform="${scaleTransform}">
          <path d="M-18,8 L-92,98 L-48,108 L-4,22 Z" fill="url(#mainGrad)" opacity="0.9"/>
          <path d="M18,8 L92,98 L48,108 L4,22 Z" fill="url(#mainGrad)" opacity="0.9"/>
          <path d="M0,0 C-55,-65 -145,-45 -135,10 C-125,58 -45,42 0,8 Z" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="1.5"/>
          <path d="M0,0 C55,-65 145,-45 135,10 C125,58 45,42 0,8 Z" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="1.5"/>
          <rect x="-22" y="-18" width="44" height="38" rx="12" fill="url(#secondaryGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
        </g>`;

    case 'hair-claw':
      return `
        <g transform="${scaleTransform}">
          <path d="M-125,22 C-110,-52 110,-52 125,22 L105,36 C80,-16 -80,-16 -105,36 Z" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2"/>
          <g fill="url(#mainGrad)">
            <rect x="-90" y="6" width="12" height="44" rx="6"/>
            <rect x="-62" y="0" width="12" height="48" rx="6"/>
            <rect x="-34" y="-4" width="12" height="50" rx="6"/>
            <rect x="-6" y="-5" width="12" height="52" rx="6"/>
            <rect x="22" y="-4" width="12" height="50" rx="6"/>
            <rect x="50" y="0" width="12" height="48" rx="6"/>
            <rect x="78" y="6" width="12" height="44" rx="6"/>
          </g>
          <rect x="-32" y="-48" width="64" height="24" rx="10" fill="url(#secondaryGrad)"/>
        </g>`;

    case 'hair-pins':
      return `
        <g transform="${scaleTransform}">
          <g transform="translate(0, -28)">
            <line x1="-120" y1="0" x2="120" y2="0" stroke="url(#mainGrad)" stroke-width="8" stroke-linecap="round"/>
            <circle cx="-95" cy="0" r="13" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
            <circle cx="-62" cy="0" r="11" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
            <circle cx="-32" cy="0" r="9" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
          </g>
          <g transform="translate(0, 28)">
            <line x1="-120" y1="0" x2="120" y2="0" stroke="url(#mainGrad)" stroke-width="8" stroke-linecap="round"/>
            <circle cx="-95" cy="0" r="13" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
            <circle cx="-62" cy="0" r="11" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
            <circle cx="-32" cy="0" r="9" fill="url(#pearlGrad)" stroke="url(#mainGrad)" stroke-width="2"/>
          </g>
        </g>`;

    case 'scrunchie-set':
      return `
        <g transform="${scaleTransform}">
          <g transform="translate(-40, -10)">
            <circle cx="0" cy="0" r="68" fill="none" stroke="url(#mainGrad)" stroke-width="42" stroke-dasharray="28 6" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="68" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.35"/>
          </g>
          <g transform="translate(48, 18)">
            <circle cx="0" cy="0" r="62" fill="none" stroke="url(#secondaryGrad)" stroke-width="38" stroke-dasharray="26 5" stroke-linecap="round"/>
            <circle cx="0" cy="0" r="62" fill="none" stroke="url(#mainGrad)" stroke-width="3" opacity="0.5"/>
          </g>
        </g>`;

    case 'hairband-padded':
      return `
        <g transform="${scaleTransform}">
          <path d="M-112,72 C-128,-88 128,-88 112,72" fill="none" stroke="url(#mainGrad)" stroke-width="34" stroke-linecap="round"/>
          <path d="M-112,72 C-128,-88 128,-88 112,72" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-dasharray="8 14" opacity="0.65"/>
          <circle cx="-72" cy="-24" r="8" fill="url(#pearlGrad)"/>
          <circle cx="-38" cy="-42" r="9" fill="url(#pearlGrad)"/>
          <circle cx="0" cy="-48" r="10" fill="url(#pearlGrad)"/>
          <circle cx="38" cy="-42" r="9" fill="url(#pearlGrad)"/>
          <circle cx="72" cy="-24" r="8" fill="url(#pearlGrad)"/>
        </g>`;

    case 'bag-shoulder':
      return `
        <g transform="${scaleTransform}">
          <path d="M-76,-42 C-76,-122 76,-122 76,-42" fill="none" stroke="url(#mainGrad)" stroke-width="12" stroke-linecap="round"/>
          <rect x="-118" y="-42" width="236" height="132" rx="22" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2"/>
          <path d="M-118,-20 L0,28 L118,-20" fill="none" stroke="#FFFFFF" stroke-width="2.5" opacity="0.65"/>
          <rect x="-20" y="10" width="40" height="24" rx="6" fill="url(#goldHardware)"/>
          <circle cx="0" cy="22" r="5" fill="#24211F"/>
        </g>`;

    case 'bag-sling':
      return `
        <g transform="${scaleTransform}">
          <path d="M-110,-28 C-135,-120 135,-120 110,-28" fill="none" stroke="url(#goldHardware)" stroke-width="5" stroke-dasharray="10 4"/>
          <path d="M-115,-28 Q0,18 115,-28 L128,62 Q0,108 -128,62 Z" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2"/>
          <rect x="-24" y="18" width="48" height="16" rx="8" fill="url(#goldHardware)"/>
        </g>`;

    case 'wallet-card':
      return `
        <g transform="${scaleTransform}">
          <rect x="-118" y="-68" width="236" height="142" rx="16" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2"/>
          <line x1="-112" y1="-22" x2="112" y2="-22" stroke="#FFFFFF" stroke-width="2" opacity="0.55"/>
          <line x1="-112" y1="12" x2="112" y2="12" stroke="#FFFFFF" stroke-width="2" opacity="0.55"/>
          <rect x="-36" y="36" width="72" height="14" rx="4" fill="url(#goldHardware)"/>
        </g>`;

    case 'pouch-makeup':
      return `
        <g transform="${scaleTransform}">
          <path d="M-110,-52 L110,-52 L128,68 C128,80 118,88 106,88 L-106,88 C-118,88 -128,80 -128,68 Z" fill="url(#mainGrad)" stroke="#FFFFFF" stroke-width="2"/>
          <line x1="-110" y1="-52" x2="110" y2="-52" stroke="url(#goldHardware)" stroke-width="7" stroke-linecap="round"/>
          <path d="M-95,-45 L95,78 M-40,-45 L110,50 M-115,0 L35,82 M95,-45 L-95,78 M40,-45 L-110,50" stroke="#FFFFFF" stroke-width="1.5" opacity="0.35"/>
          <circle cx="0" cy="14" r="16" fill="url(#goldHardware)"/>
        </g>`;

    case 'organiser-jewellery':
      return `
        <g transform="${scaleTransform}">
          <rect x="-126" y="-66" width="252" height="146" rx="20" fill="url(#mainGrad)" stroke="url(#goldHardware)" stroke-width="4"/>
          <rect x="-110" y="-50" width="102" height="114" rx="10" fill="#FAF7F2" opacity="0.9"/>
          <rect x="6" y="-50" width="104" height="52" rx="10" fill="#FAF7F2" opacity="0.9"/>
          <rect x="6" y="12" width="104" height="52" rx="10" fill="#FAF7F2" opacity="0.9"/>
          <line x1="-98" y1="-26" x2="-20" y2="-26" stroke="#E8DCCB" stroke-width="8" stroke-linecap="round"/>
          <line x1="-98" y1="4" x2="-20" y2="4" stroke="#E8DCCB" stroke-width="8" stroke-linecap="round"/>
          <line x1="-98" y1="34" x2="-20" y2="34" stroke="#E8DCCB" stroke-width="8" stroke-linecap="round"/>
          <circle cx="-68" cy="-26" r="8" fill="url(#goldHardware)"/>
          <circle cx="-46" cy="4" r="8" fill="url(#goldHardware)"/>
          <circle cx="58" cy="-24" r="14" fill="none" stroke="url(#goldHardware)" stroke-width="4"/>
          <circle cx="58" cy="38" r="10" fill="url(#pearlGrad)" stroke="url(#goldHardware)" stroke-width="2"/>
        </g>`;
  }
}

export function generateStudioProductImage(options: StudioImageOptions): string {
  const {
    productName,
    shape,
    primaryHex,
    secondaryHex = '#E8DCCB',
    colorName,
    secondaryLabel,
    angle,
    sku,
  } = options;

  const angleTitle =
    angle === 'front'
      ? 'STUDIO FRONT VIEW'
      : angle === 'profile'
      ? 'SILHOUETTE & SCALE'
      : angle === 'detail'
      ? 'MATERIAL & FINISH DETAIL'
      : 'TRAVERTINE PLINTH EDIT';

  const bgTop = angle === 'styled' ? '#F3ECE1' : '#FAF7F2';
  const bgBottom = angle === 'detail' ? '#E5D7C3' : '#EFE6D8';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgTop}" />
        <stop offset="100%" stop-color="${bgBottom}" />
      </linearGradient>
      <linearGradient id="plinthGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#E7DAC6" />
        <stop offset="50%" stop-color="#F4EDE2" />
        <stop offset="100%" stop-color="#D8C7AE" />
      </linearGradient>
      <linearGradient id="mainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryHex}" />
        <stop offset="45%" stop-color="${primaryHex}" stop-opacity="0.88" />
        <stop offset="100%" stop-color="${primaryHex}" />
      </linearGradient>
      <linearGradient id="secondaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${secondaryHex}" />
        <stop offset="100%" stop-color="#FFFFFF" />
      </linearGradient>
      <radialGradient id="pearlGrad" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="60%" stop-color="#F7F2EA" />
        <stop offset="100%" stop-color="#DFD3C3" />
      </radialGradient>
      <linearGradient id="goldHardware" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#DFC48E" />
        <stop offset="50%" stop-color="#B89A64" />
        <stop offset="100%" stop-color="#8F723E" />
      </linearGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#24211F" flood-opacity="0.14" />
      </filter>
    </defs>

    <!-- Studio Canvas -->
    <rect width="800" height="600" fill="url(#bgGrad)" />

    <!-- Subtle Architectural Sunbeam -->
    <polygon points="0,0 520,0 800,420 800,600 220,600" fill="#FFFFFF" opacity="0.28" />

    <!-- Travertine Stone Plinth -->
    <g transform="translate(0, 15)">
      <ellipse cx="400" cy="435" rx="235" ry="44" fill="#24211F" opacity="0.08" />
      <path d="M175,395 C175,372 625,372 625,395 L625,432 C625,458 175,458 175,432 Z" fill="url(#plinthGrad)" />
      <ellipse cx="400" cy="395" rx="225" ry="30" fill="#F8F3EB" stroke="#E2D4C0" stroke-width="1.5" />
    </g>

    <!-- Product Motif with Studio Drop Shadow -->
    <g filter="url(#softShadow)">
      ${renderMotifSVG(shape, primaryHex, secondaryHex, angle)}
    </g>

    <!-- Minimalist Editorial Studio Frame & Caption -->
    <rect x="28" y="28" width="744" height="544" fill="none" stroke="#B89A64" stroke-opacity="0.28" stroke-width="1" />
    <text x="52" y="62" font-family="Georgia, serif" font-size="13" letter-spacing="3" fill="#786E65">VALENTINA STUDIO ARCHIVE</text>
    <text x="748" y="62" text-anchor="end" font-family="sans-serif" font-size="11" letter-spacing="2" fill="#8C8075">${angleTitle}</text>

    <!-- Variant Swatch & Spec Pill at Bottom -->
    <g transform="translate(52, 526)">
      <circle cx="10" cy="0" r="8" fill="${primaryHex}" stroke="#24211F" stroke-opacity="0.25" stroke-width="1.5" />
      <text x="28" y="4" font-family="sans-serif" font-size="13" font-weight="600" fill="#24211F">${escapeXml(
        productName
      )}</text>
      <text x="28" y="22" font-family="sans-serif" font-size="11.5" fill="#6E655E">${escapeXml(
        colorName
      )} · ${escapeXml(secondaryLabel)} · ${escapeXml(sku)}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
