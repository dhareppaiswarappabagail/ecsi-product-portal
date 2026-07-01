export const WHATSAPP_NUMBER = "919373826926";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a pre-filled WhatsApp order message. Pack size and product
 * description are pulled straight from the product data so editing
 * src/data/products.ts automatically updates every order message.
 */
export function orderMessage(productName: string, size?: string, description?: string) {
  const lines = [
    `Hi ECSI Sales,`,
    ``,
    `I would like to order the following product:`,
    `• Product: ${productName}`,
  ];
  if (size) lines.push(`• Pack size: ${size}`);
  if (description) {
    lines.push(``, `Product details:`, description);
  }
  lines.push(``, `Please share availability, pricing and delivery timelines. Thank you.`);
  return lines.join("\n");
}

export const GENERAL_MESSAGE = "Hi, I'm interested in ECSI products. Please share more details.";

// Small transparent SVG used as an inline fallback when a product photo
// URL fails to load. Kept as a data URI so it never triggers another
// network request.
export const IMAGE_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 480'>
      <defs>
        <linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>
          <stop offset='0' stop-color='#1F5B2E'/>
          <stop offset='1' stop-color='#F58220'/>
        </linearGradient>
      </defs>
      <rect width='480' height='480' fill='url(#g)'/>
      <text x='50%' y='50%' text-anchor='middle' dominant-baseline='middle'
        font-family='system-ui,sans-serif' font-size='34' font-weight='700' fill='white'>ECSI</text>
    </svg>`,
  );
