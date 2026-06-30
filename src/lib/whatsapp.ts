export const WHATSAPP_NUMBER = "919373826926";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function orderMessage(productName: string, size?: string) {
  return size
    ? `Hi, I would like to order ${productName} – ${size}. Please share availability and pricing.`
    : `Hi, I would like to order ${productName}. Please share availability and pricing.`;
}

export const GENERAL_MESSAGE = "Hi, I'm interested in ECSI products. Please share more details.";
