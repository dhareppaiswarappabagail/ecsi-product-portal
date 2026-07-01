import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Leaf,
  Menu,
  X,
  Moon,
  Sun,
  Award,
  ShieldCheck,
  Factory,
  Sprout,
  MapPin,
  Mail,
  Phone,
  ChevronDown,
  Globe,
  Play,
  Info,
} from "lucide-react";
import logoAsset from "@/assets/ECSi_Logo.jpg";
import heroFarm from "@/assets/hero-farm.jpg";
import { PRODUCTS, CATEGORIES, type Category, type Product } from "@/data/products";
import { waLink, GENERAL_MESSAGE } from "@/lib/whatsapp";
import { useTheme } from "@/hooks/use-theme";
import { useLanguage, type Lang } from "@/hooks/use-language";
import { t, LANG_LABEL } from "@/lib/i18n";
import { ProductModal } from "@/components/ProductModal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ECSI – Eaglecrop Science Industries | Bio-Stimulant & Plant Growth Products" },
      { name: "description", content: "ISO 9001:2015 certified bio-stimulant, plant growth promoter and micronutrient manufacturer in Pune. Govt. of Maharashtra licensed wholesale dealer. Order on WhatsApp." },
    ],
  }),
  component: Index,
});

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zM17.91 14.305c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);

function LanguageMenu({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{LANG_LABEL[lang]}</span>
        <span className="sm:hidden uppercase">{lang}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-xl border border-border bg-popover shadow-xl">
          {(["en", "hi", "mr"] as Lang[]).map((l) => (
            <button
              key={l}
              onMouseDown={(e) => { e.preventDefault(); setLang(l); setOpen(false); }}
              className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-secondary ${
                lang === l ? "bg-secondary font-semibold text-ecsi-orange" : ""
              }`}
            >
              {LANG_LABEL[l]}
              {lang === l && <span className="text-ecsi-orange">●</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Index() {
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  const NAV = [
    { href: "#home", label: t("nav_home", lang) },
    { href: "#about", label: t("nav_about", lang) },
    { href: "#products", label: t("nav_products", lang) },
    { href: "#bulk", label: t("nav_bulk", lang) },
    { href: "#certifications", label: t("nav_cert", lang) },
    { href: "#contact", label: t("nav_contact", lang) },
  ];

  // Products ordered automatically by their description text — changing a
  // description in src/data/products.ts will re-sort this list on next render.
  const sortedProducts = useMemo(
    () => [...PRODUCTS].sort((a, b) => a.description.localeCompare(b.description)),
    [],
  );
  const filtered = useMemo(
    () => (activeCategory === "All" ? sortedProducts : sortedProducts.filter((p) => p.category === activeCategory)),
    [activeCategory, sortedProducts],
  );

  // Deterministic image URL derived from product id + description slug — a
  // description edit gives the product a fresh picture too.
  const imgFor = (p: Product) => {
    const slug = p.description.slice(0, 24).replace(/\W+/g, "-").toLowerCase();
    return `https://picsum.photos/seed/${p.id}-${slug}/480/480`;
  };

  // Split first 40 sorted products into 4 marquee rows of 10.
  const marqueeRows = useMemo(() => {
    const list = sortedProducts.slice(0, 40);
    return [0, 1, 2, 3].map((i) => list.slice(i * 10, i * 10 + 10));
  }, [sortedProducts]);



  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img src={logoAsset} alt="ECSI Eaglecrop Science Industries logo" className="h-12 w-12 rounded-md object-contain" />
            <div className="hidden sm:block">
              <div className="font-display text-base font-bold leading-tight text-foreground">EAGLECROP</div>
              <div className="text-[10px] font-medium tracking-widest text-muted-foreground">SCIENCE INDUSTRIES</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-ecsi-orange">
                {n.label}
              </a>
            ))}
            <Link to="/videos" className="text-sm font-medium text-foreground/80 transition-colors hover:text-ecsi-orange">
              {t("nav_videos", lang)}
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageMenu lang={lang} setLang={setLang} />
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground transition-colors hover:bg-secondary"
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] md:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" /> {t("order_wa", lang)}
            </a>
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-background shadow-2xl">
            <div
              className="relative px-6 pb-6 pt-7 text-white"
              style={{ background: "linear-gradient(135deg, var(--ecsi-red), var(--ecsi-orange))" }}
            >
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/20 backdrop-blur hover:bg-white/30"
              >
                <X className="h-4 w-4" />
              </button>
              <img src={logoAsset} alt="ECSI" className="h-14 w-14 rounded-lg bg-white p-1.5 object-contain" />
              <div className="mt-3 font-display text-lg font-bold leading-tight">EAGLECROP</div>
              <div className="text-[10px] tracking-widest opacity-90">SCIENCE INDUSTRIES</div>
            </div>

            <div className="p-5">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Menu</div>
              <nav className="flex flex-col">
                {NAV.map((n) => (
                  <a
                    key={n.href}
                    href={n.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex min-h-[48px] items-center justify-between rounded-lg px-3 text-base font-medium text-foreground hover:bg-secondary"
                  >
                    {n.label}
                    <ChevronDown className="-rotate-90 h-4 w-4 text-muted-foreground" />
                  </a>
                ))}
                <Link
                  to="/videos"
                  onClick={() => setDrawerOpen(false)}
                  className="flex min-h-[48px] items-center justify-between rounded-lg px-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  <span className="inline-flex items-center gap-2"><Play className="h-4 w-4 text-ecsi-red" /> {t("nav_videos", lang)}</span>
                  <ChevronDown className="-rotate-90 h-4 w-4 text-muted-foreground" />
                </Link>
              </nav>

              <div className="mt-6 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Shop by Category</div>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.slice(0, 8).map((c) => (
                    <a
                      key={c}
                      href="#products"
                      onClick={() => { setActiveCategory(c); setDrawerOpen(false); }}
                      className="rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-foreground/80 hover:border-ecsi-orange hover:text-ecsi-orange"
                    >
                      {c}
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2">
                <a href="tel:+919999999999" className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-foreground/80 hover:border-ecsi-green hover:text-ecsi-green">
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
                <a href="mailto:info@eaglecrop.in" className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold text-foreground/80 hover:border-ecsi-orange hover:text-ecsi-orange">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              </div>


              <div className="mt-6 space-y-2">
                <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("language", lang)}</div>
                <div className="flex gap-2">
                  {(["en", "hi", "mr"] as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition-all ${
                        lang === l ? "border-ecsi-red bg-ecsi-red text-white" : "border-border bg-background"
                      }`}
                    >
                      {LANG_LABEL[l]}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={toggle}
                className="mt-4 flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium"
              >
                <span>{t("theme", lang)}</span>
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </button>

              <a
                href={waLink(GENERAL_MESSAGE)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-base font-semibold text-white shadow-lg"
              >
                <WhatsAppIcon className="h-5 w-5" /> {t("order_wa", lang)}
              </a>
            </div>
          </aside>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative isolate overflow-hidden">
        <img src={heroFarm} alt="Lush vineyard and farmland" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, oklch(0.2 0.02 30 / 0.78), oklch(0.42 0.12 145 / 0.55))" }} />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center text-white md:py-36">
          <img src={logoAsset} alt="ECSI logo" className="mb-6 h-24 w-24 rounded-xl bg-white/95 p-2 shadow-2xl md:h-32 md:w-32" />
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5" /> ISO 9001:2015 Certified Manufacturer
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] md:text-6xl">
            Eaglecrop Science Industries
          </h1>
          <p className="mt-4 text-xl font-light italic text-white/90 md:text-2xl">A Quality Product</p>
          <p className="mt-5 max-w-2xl text-base text-white/85 md:text-lg">
            ISO 9001:2015 Certified Bio-Stimulant & Plant Nutrition Manufacturer — Trusted Across Maharashtra's Farms.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#products"
              className="ecsi-blink inline-flex items-center justify-center gap-2 rounded-full bg-ecsi-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04]"
            >
              <Leaf className="h-4 w-4" /> View Products
            </a>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/80 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white hover:text-ecsi-green"
            >
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
            </a>
          </div>

          <a href="#about" aria-label="Scroll down" className="mt-16 animate-bounce text-white/70">
            <ChevronDown className="h-7 w-7" />
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary p-8 shadow-card">
            <div
              className="absolute inset-0 opacity-30"
              style={{ background: "radial-gradient(circle at 30% 20%, var(--ecsi-orange), transparent 60%), radial-gradient(circle at 80% 80%, var(--ecsi-green), transparent 55%)" }}
            />
            <div className="relative flex h-full min-h-[360px] flex-col items-center justify-center text-center">
              <img src={logoAsset} alt="ECSI" className="mb-6 h-40 w-40 rounded-2xl bg-white p-3 shadow-xl" />
              <div className="font-display text-xl font-bold text-foreground">A Quality Product</div>
              <div className="mt-1 text-sm text-muted-foreground">Self-manufactured in Maharashtra</div>
            </div>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-ecsi-orange">About ECSI</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Quality-first bio-stimulants, <span className="text-gradient-brand">manufactured in-house.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Eaglecrop Science Industries is a Pune-based, ISO 9001:2015 certified manufacturer of agricultural
              bio-stimulants, plant growth promoters, micronutrients and soil conditioners. As a Government of Maharashtra
              licensed State-Level BioStimulant Wholesale Dealer, every formulation is self-manufactured under <em>"Own Source"</em>
              classification — ensuring complete quality control from raw material to final product.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Proprietor <strong>Mr. Dhareppa Ishwarappa Bagali</strong> leads a portfolio of 248+ registered bio-stimulant grades
              spanning seaweed extracts, humic & fulvic acids, amino acids, microbials and PGRs — built to deliver consistent,
              measurable results across grapes, sugarcane, onion, cotton and vegetables.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Stat icon={<Sprout className="h-5 w-5" />} value="248+" label="Registered Formulations" />
              <Stat icon={<Award className="h-5 w-5" />} value="ISO 9001:2015" label="Certified Company" />
              <Stat icon={<ShieldCheck className="h-5 w-5" />} value="Govt. of MH" label="Licensed Dealer" />
              <Stat icon={<Factory className="h-5 w-5" />} value="Own Source" label="Self-Manufactured" />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-ecsi-orange">Our Product Range</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Complete Bio-Stimulant & Plant Nutrition Catalog</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Browse our full product range — tap any size to pre-fill your WhatsApp order.
            </p>
          </div>

          {/* AUTO-SCROLLING PRODUCT MARQUEE — 4 rows × 10 products, hover to pause, drag to scroll manually */}
          <div className="ecsi-marquee-mask mb-12 space-y-3 overflow-hidden">
            {marqueeRows.map((row, i) => (
              <div
                key={i}
                className="ecsi-marquee-track"
                style={{ animationDuration: `${38 + i * 6}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
              >
                {[...row, ...row].map((p, idx) => (
                  <button
                    key={`${p.id}-${idx}`}
                    type="button"
                    onClick={() => setModalProduct(p)}
                    className="group relative flex w-56 shrink-0 items-center gap-3 rounded-xl border border-border bg-card p-2 pr-4 text-left shadow-card transition-transform hover:-translate-y-0.5"
                  >
                    <img
                      src={imgFor(p)}
                      alt={p.name}
                      loading="lazy"
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <div className="truncate font-display text-sm font-bold text-foreground">{p.name}</div>
                      <div className="truncate text-[11px] text-muted-foreground">{p.category}</div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>



          <div className="mb-10 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {(["All", ...CATEGORIES] as const).map((c) => {
              const active = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c as Category | "All")}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                    active
                      ? "border-transparent bg-ecsi-red text-white shadow-md"
                      : "border-border bg-background text-foreground/80 hover:border-ecsi-orange hover:text-ecsi-orange"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <article
                key={p.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                {p.badge && (
                  <div className="absolute right-3 top-3 z-10 rounded-full bg-ecsi-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground/90 shadow">
                    {p.badge}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setModalProduct(p)}
                  className="group/img relative block aspect-square w-full overflow-hidden text-left"
                  style={{ background: "linear-gradient(135deg, var(--ecsi-green), oklch(0.32 0.08 145))" }}
                >
                  <img
                    src={imgFor(p)}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3">
                    <div className="font-display text-base font-bold leading-tight text-white drop-shadow">{p.name}</div>
                    <div className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-ecsi-green backdrop-blur">
                      {p.category}
                    </div>
                  </div>
                </button>


                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold leading-tight">{p.name}</h3>
                  {p.nameMr && <div className="mt-0.5 text-sm text-ecsi-orange" lang="mr">{p.nameMr}</div>}
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                  <div className="mt-4">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {t("sizes", lang)}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {p.sizes.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-background px-2.5 py-1 text-xs font-semibold text-foreground/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-ecsi-green/10 px-2.5 py-1 text-[10px] font-semibold text-ecsi-green">
                    <Sprout className="h-3 w-3" /> {t("bulk_avail", lang)}
                  </div>

                  <div className="mt-4 grid gap-2">
                    <button
                      type="button"
                      onClick={() => setModalProduct(p)}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      {t("order_wa", lang)}
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setModalProduct(p)}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-ecsi-orange hover:text-ecsi-orange"
                      >
                        <Info className="h-3.5 w-3.5" /> {t("details", lang)}
                      </button>
                      <Link
                        to="/videos"
                        hash={p.id}
                        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-semibold text-foreground/80 hover:border-ecsi-red hover:text-ecsi-red"
                      >
                        <Play className="h-3.5 w-3.5" /> {t("watch_video", lang)}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BULK */}
      <BulkSection />

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-ecsi-orange">Trust & Credentials</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Certified, Licensed & Self-Manufactured</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Credential icon={<Award />} title="ISO 9001:2015" subtitle="Certified Quality Management" />
            <Credential
              icon={<ShieldCheck />}
              title="Govt. of Maharashtra"
              subtitle="BioStimulant Wholesale Dealer License"
              detail="No. LCBWD0620260109"
            />
            <Credential icon={<Factory />} title="Self-Manufactured" subtitle="248+ Registered Formulations" />
            <Credential icon={<Sprout />} title="State-Level Dealer" subtitle="Pan-Maharashtra Supply" />
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-ecsi-orange">License Details</div>
                <h3 className="mt-2 font-display text-xl font-bold">BioStimulant Wholesale Dealer (State Level)</h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">License No.:</strong> LCBWD0620260109</li>
                  <li><strong className="text-foreground">Issued By:</strong> Director of Agriculture (Input & Quality Control), Pune</li>
                  <li><strong className="text-foreground">Date of Issue:</strong> 22/06/2026</li>
                  <li><strong className="text-foreground">Valid:</strong> 22/06/2026 to 21/06/2031</li>
                  <li><strong className="text-foreground">Proprietor:</strong> Mr. Dhareppa Ishwarappa Bagali</li>
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-ecsi-orange">Manufacturing Unit</div>
                <h3 className="mt-2 font-display text-xl font-bold">Akkalkot Road, Solapur</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Plot No. C 13-B, MIDC Akkalkot Road, North Solapur, Maharashtra – 413001. Licensed manufacturing unit
                  producing the entire ECSI bio-stimulant portfolio under Own Source classification.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mb-10 text-center">
            <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-ecsi-orange">From The Field</div>
            <h2 className="font-display text-3xl font-bold md:text-4xl">Trusted by Maharashtra's Farmers</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Ramesh Patil", loc: "Sangli", text: "EG Long 40 ने माझ्या द्राक्षांचा रंग आणि चव दोन्ही सुधारली. Excellent bunch quality this season." },
              { name: "Suresh Jadhav", loc: "Solapur", text: "G2 helped my sugarcane plot get more tillers and longer canes. Best yield in five years." },
              { name: "Anita More", loc: "Nashik", text: "Dharti Gold आणि Plant Bro वापरून कांद्याचा आकार आणि वजन वाढले. Reliable products." },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-ecsi-green/10 text-ecsi-green">
                    <Sprout className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-display font-bold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.loc}, Maharashtra</div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground" lang="mr">"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-border bg-background pt-16 pb-6">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <img src={logoAsset} alt="ECSI" className="h-14 w-14 object-contain" />
                <div>
                  <div className="font-display text-base font-bold">EAGLECROP</div>
                  <div className="text-[10px] tracking-widest text-muted-foreground">SCIENCE INDUSTRIES</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                A Quality Product. ISO 9001:2015 Certified Bio-Stimulant Manufacturer.
              </p>
              <div className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ecsi-orange" />
                <span>
                  Flat No. 101/1, Wing Silver Park, Phase-2, Mumbai-Pune Bypass Road, Raghav Nagar, Ambegaon BK, Pune – 411046 (MH)
                </span>
              </div>
            </div>

            <div>
              <div className="font-display text-sm font-bold uppercase tracking-wider">Quick Links</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-ecsi-orange">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-display text-sm font-bold uppercase tracking-wider">Contact</div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+919373826926" className="flex items-center gap-2 hover:text-ecsi-orange">
                    <Phone className="h-4 w-4 text-ecsi-orange" /> +91 9373826926
                  </a>
                </li>
                <li>
                  <a href="mailto:eaglecropscienceind@gmail.com" className="flex items-center gap-2 hover:text-ecsi-orange">
                    <Mail className="h-4 w-4 text-ecsi-orange" /> eaglecropscienceind@gmail.com
                  </a>
                </li>
                <li>
                  <a
                    href={waLink(GENERAL_MESSAGE)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-xs font-semibold text-white"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="font-display text-sm font-bold uppercase tracking-wider">Certifications</div>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center gap-2"><Award className="h-3.5 w-3.5 text-ecsi-orange" /> ISO 9001:2015 Certified</li>
                <li className="flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-ecsi-orange" /> Govt. of Maharashtra Licensed Dealer</li>
                <li className="flex items-center gap-2"><Factory className="h-3.5 w-3.5 text-ecsi-orange" /> License No. LCBWD0620260109</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground md:flex-row">
              <div>© 2026 Eaglecrop Science Industries. All Rights Reserved.</div>
              <div className="opacity-70">
                Website designed by Ashok_Gawali_GFX — Graphics & Video Production | <a href="tel:+919145026302" className="hover:text-ecsi-orange">9145026302</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={waLink(GENERAL_MESSAGE)}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="wa-pulse fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-2xl transition-transform hover:scale-110"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>

      <ProductModal
        product={modalProduct}
        lang={lang}
        onClose={() => setModalProduct(null)}
        onWatchVideo={(p) => { setModalProduct(null); navigate({ to: "/videos", hash: p.id }); }}
      />
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-card">
      <div className="grid h-9 w-9 place-items-center rounded-lg bg-ecsi-orange/15 text-ecsi-orange">{icon}</div>
      <div className="mt-3 font-display text-lg font-bold leading-tight">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Credential({
  icon,
  title,
  subtitle,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  detail?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-shadow hover:shadow-card-hover">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl gradient-brand text-white">{icon}</div>
      <div className="mt-4 font-display text-lg font-bold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{subtitle}</div>
      {detail && <div className="mt-2 text-[11px] font-semibold tracking-wider text-ecsi-green">{detail}</div>}
    </div>
  );
}

function BulkSection() {
  const [form, setForm] = useState({ name: "", phone: "", product: "", qty: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Bulk Order Enquiry — Name: ${form.name}, Phone: ${form.phone}, Product/Category: ${form.product}, Quantity Required: ${form.qty}.`;
    window.open(waLink(msg), "_blank");
  }

  return (
    <section
      id="bulk"
      className="relative overflow-hidden py-20 md:py-28"
      style={{ background: "linear-gradient(135deg, var(--ecsi-green), oklch(0.28 0.08 145))" }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{ background: "radial-gradient(circle at 80% 20%, var(--ecsi-orange), transparent 50%)" }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 text-white lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-ecsi-gold">For Dealers & Distributors</div>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Bulk Orders Welcome — Dealers & Distributors Invited</h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90">
            As a Government of Maharashtra licensed State-Level Wholesale BioStimulant Dealer, ECSI supports
            bulk and wholesale purchasing across the entire product range. Send your enquiry — we'll respond on WhatsApp.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 text-sm">
            {[
              "Direct Factory Pricing",
              "Pan-Maharashtra Supply",
              "Consistent Self-Manufactured Quality",
              "Fast Order Processing via WhatsApp",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-ecsi-gold" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} className="rounded-3xl bg-white p-6 text-foreground shadow-2xl md:p-8">
          <div className="font-display text-xl font-bold">Send a Bulk Enquiry</div>
          <p className="mt-1 text-sm text-muted-foreground">All fields go straight to WhatsApp — no signup needed.</p>
          <div className="mt-5 space-y-3">
            <Field label="Your Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required />
            <Field label="Phone Number" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required />
            <Field label="Product / Category" value={form.product} onChange={(v) => setForm({ ...form, product: v })} placeholder="e.g. Dharti Gold or Foliar Sprays" required />
            <Field label="Quantity Required" value={form.qty} onChange={(v) => setForm({ ...form, qty: v })} placeholder="e.g. 50 KG / 100 bottles" required />
          </div>
          <button
            type="submit"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
          >
            <WhatsAppIcon className="h-4 w-4" /> Send Enquiry on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-ecsi-orange focus:ring-2 focus:ring-ecsi-orange/30"
      />
    </label>
  );
}
