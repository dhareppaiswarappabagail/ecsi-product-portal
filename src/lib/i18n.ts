import type { Lang } from "@/hooks/use-language";

type Dict = Record<string, { en: string; hi: string; mr: string }>;

export const T: Dict = {
  nav_home: { en: "Home", hi: "होम", mr: "होम" },
  nav_about: { en: "About ECSI", hi: "हमारे बारे में", mr: "आमच्याबद्दल" },
  nav_products: { en: "Products", hi: "उत्पाद", mr: "उत्पादने" },
  nav_videos: { en: "Videos", hi: "वीडियो", mr: "व्हिडिओ" },
  nav_bulk: { en: "Bulk Orders", hi: "थोक ऑर्डर", mr: "घाऊक ऑर्डर" },
  nav_cert: { en: "Certifications", hi: "प्रमाणन", mr: "प्रमाणपत्रे" },
  nav_contact: { en: "Contact", hi: "संपर्क", mr: "संपर्क" },
  order_wa: { en: "Order on WhatsApp", hi: "व्हाट्सऐप पर ऑर्डर करें", mr: "व्हॉट्सअ‍ॅपवर ऑर्डर करा" },
  view_products: { en: "View Products", hi: "उत्पाद देखें", mr: "उत्पादने पहा" },
  details: { en: "View Details", hi: "विवरण देखें", mr: "तपशील पहा" },
  watch_video: { en: "Watch Video", hi: "वीडियो देखें", mr: "व्हिडिओ पहा" },
  sizes: { en: "Available Sizes", hi: "उपलब्ध आकार", mr: "उपलब्ध आकार" },
  dosage: { en: "Usage & Dosage", hi: "उपयोग व मात्रा", mr: "वापर व मात्रा" },
  bulk_avail: { en: "Bulk Orders Available", hi: "थोक उपलब्ध", mr: "घाऊक उपलब्ध" },
  preview_title: { en: "Confirm your WhatsApp message", hi: "अपना व्हाट्सऐप संदेश पुष्टि करें", mr: "व्हॉट्सअ‍ॅप संदेश निश्चित करा" },
  preview_sub: { en: "Review and edit before sending to ECSI sales.", hi: "ECSI को भेजने से पहले समीक्षा करें।", mr: "पाठवण्यापूर्वी संदेश तपासा." },
  send_now: { en: "Send on WhatsApp", hi: "व्हाट्सऐप पर भेजें", mr: "व्हॉट्सअ‍ॅपवर पाठवा" },
  cancel: { en: "Cancel", hi: "रद्द करें", mr: "रद्द करा" },
  language: { en: "Language", hi: "भाषा", mr: "भाषा" },
  theme: { en: "Theme", hi: "थीम", mr: "थीम" },
  videos_title: { en: "Product Videos", hi: "उत्पाद वीडियो", mr: "उत्पादन व्हिडिओ" },
  videos_sub: { en: "Watch demos, application techniques and farmer results.", hi: "डेमो, उपयोग तकनीक व किसान परिणाम देखें।", mr: "डेमो, वापर तंत्र व शेतकरी निकाल पहा." },
  back: { en: "Back to Home", hi: "होम पर वापस", mr: "होमवर परत" },
};

export function t(key: keyof typeof T, lang: Lang) {
  return T[key]?.[lang] ?? T[key]?.en ?? key;
}

export const LANG_LABEL: Record<Lang, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};
