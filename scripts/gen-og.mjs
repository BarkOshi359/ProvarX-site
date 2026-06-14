import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, '..', 'public')

// Regenerate the 1200x630 branded OpenGraph / Twitter share card (public/og-default.png).
// Run with: node scripts/gen-og.mjs
// Navy gradient on brand colors, hexagon+check mark, wordmark, tagline, value prop.
const W = 1200
const H = 630
const og = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0A2540"/>
      <stop offset="100%" stop-color="#1B2D4F"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <!-- top accent bar -->
  <rect x="0" y="0" width="${W}" height="8" fill="#00C9A7"/>

  <!-- hexagon + check mark, right side -->
  <g transform="translate(905,315)">
    <polygon points="0,-150 130,-75 130,75 0,150 -130,75 -130,-75"
      fill="#13294B" stroke="#4A90D9" stroke-width="4"/>
    <polygon points="0,-108 93,-54 93,54 0,108 -93,54 -93,-54"
      fill="none" stroke="#2E4A78" stroke-width="2"/>
    <path d="M -58 6 L -16 50 L 64 -46"
      fill="none" stroke="#FFFFFF" stroke-width="22"
      stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- wordmark -->
  <text x="90" y="170" font-family="Arial, Helvetica, sans-serif" font-size="46"
    font-weight="700" letter-spacing="12" fill="#FFFFFF">PROVARX</text>
  <rect x="92" y="192" width="64" height="4" fill="#00C9A7"/>

  <!-- headline / tagline -->
  <text x="90" y="320" font-family="Arial, Helvetica, sans-serif" font-size="72"
    font-weight="800" fill="#FFFFFF">Every Record.</text>
  <text x="90" y="402" font-family="Arial, Helvetica, sans-serif" font-size="72"
    font-weight="800" fill="#FFFFFF">Proven. <tspan fill="#00C9A7">Permanent.</tspan></text>

  <!-- value prop -->
  <text x="92" y="480" font-family="Arial, Helvetica, sans-serif" font-size="28"
    font-weight="400" fill="#9FB3C8">FSMA 204 compliance &amp; process intelligence</text>
  <text x="92" y="518" font-family="Arial, Helvetica, sans-serif" font-size="28"
    font-weight="400" fill="#9FB3C8">for food &amp; beverage manufacturers</text>

  <!-- footer url -->
  <text x="92" y="585" font-family="Arial, Helvetica, sans-serif" font-size="22"
    font-weight="600" letter-spacing="2" fill="#4A90D9">getprovarx.com</text>
</svg>`

await sharp(Buffer.from(og)).png().toFile(join(PUBLIC, 'og-default.png'))
console.log('wrote public/og-default.png (1200x630)')
