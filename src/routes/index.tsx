import { createFileRoute } from "@tanstack/react-router";
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
  Package,
} from "lucide-react";
import logoAsset from "@/assets/ecsi-logo.asset.json";
import heroFarm from "@/assets/hero-farm.jpg";
import { PRODUCTS, CATEGORIES, type Category } from "@/data/products";
import { waLink, orderMessage, GENERAL_MESSAGE } from "@/lib/whatsapp";
import { useTheme } from "@/hooks/use-theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ECSI – Eaglecrop Science Industries | Bio-Stimulant & Plant Growth Products" },
      { name: "description", content: "ISO 9001:2015 certified bio-stimulant, plant growth promoter and micronutrient manufacturer in Pune. Govt. of Maharashtra licensed wholesale dealer. Order on WhatsApp." },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About ECSI" },
  { href: "#products", label: "Products" },
  { href: "#bulk", label: "Bulk Orders" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zM17.91 14.305c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);

function Index() {
  const { theme, toggle } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [selectedSize, setSelectedSize] = useState<Record<string, string>>({});

  const filtered = useMemo(
    () => (activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)),
    [activeCategory],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="ECSI Eaglecrop Science Industries logo" className="h-12 w-12 rounded-md object-contain" />
            <div className="hidden sm:block">
              <div className="font-display text-base font-bold leading-tight text-foreground">EAGLECROP</div>
              <div className="text-[10px] font-medium tracking-widest text-muted-foreground">SCIENCE INDUSTRIES</div>
            </div>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-foreground/80 transition-colors hover:text-ecsi-orange">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
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
              <WhatsAppIcon className="h-4 w-4" /> Order on WhatsApp
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
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawerOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-background p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <img src={logoAsset.url} alt="ECSI" className="h-12 w-12 object-contain" />
              <button onClick={() => setDrawerOpen(false)} aria-label="Close menu" className="grid h-10 w-10 place-items-center rounded-full border border-border">
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setDrawerOpen(false)}
                  className="flex min-h-[48px] items-center rounded-lg px-3 text-base font-medium text-foreground hover:bg-secondary"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <button
              onClick={toggle}
              className="mt-6 flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-sm font-medium"
            >
              <span>Theme</span>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
            <a
              href={waLink(GENERAL_MESSAGE)}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-base font-semibold text-white"
            >
              <WhatsAppIcon className="h-5 w-5" /> Order via WhatsApp
            </a>
          </aside>
        </div>
      )}

      {/* HERO */}
      <section id="home" className="relative isolate overflow-hidden">
        <img src={heroFarm} alt="Lush vineyard and farmland" className="absolute inset-0 -z-10 h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 -z-10" style={{ background: "linear-gradient(135deg, oklch(0.2 0.02 30 / 0.78), oklch(0.42 0.12 145 / 0.55))" }} />
        <div className="mx-auto flex max-w-5xl flex-col items-center px-4 py-24 text-center text-white md:py-36">
          <img src={logoAsset.url} alt="ECSI logo" className="mb-6 h-24 w-24 rounded-xl bg-white/95 p-2 shadow-2xl md:h-32 md:w-32" />
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-ecsi-red px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.04]"
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
              <img src={logoAsset.url} alt="ECSI" className="mb-6 h-40 w-40 rounded-2xl bg-white p-3 shadow-xl" />
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
            {filtered.map((p) => {
              const isOpen = expanded[p.id];
              const selSize = selectedSize[p.id];
              return (
                <article
                  key={p.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  {p.badge && (
                    <div className="absolute right-3 top-3 z-10 rounded-full bg-ecsi-gold px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground/90 shadow">
                      {p.badge}
                    </div>
                  )}
                  <div
                    className="relative grid h-44 place-items-center overflow-hidden"
                    style={{ background: "linear-gradient(135deg, var(--ecsi-green), oklch(0.32 0.08 145))" }}
                  >
                    <div
                      className="absolute inset-0 opacity-40"
                      style={{ background: "radial-gradient(circle at 70% 30%, var(--ecsi-orange), transparent 55%)" }}
                    />
                    <div className="relative flex flex-col items-center text-white">
                      <Package className="h-12 w-12 opacity-90" strokeWidth={1.5} />
                      <div className="mt-2 px-3 text-center font-display text-lg font-bold leading-tight">{p.name}</div>
                    </div>
                    <div className="absolute bottom-2 left-2 rounded-full bg-black/35 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
                      {p.category}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-lg font-bold leading-tight">{p.name}</h3>
                    {p.nameMr && <div className="mt-0.5 text-sm text-ecsi-orange" lang="mr">{p.nameMr}</div>}
                    <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${isOpen ? "" : "line-clamp-3"}`}>
                      {p.description}
                    </p>
                    {p.usage && isOpen && (
                      <div className="mt-3 rounded-lg border border-border bg-secondary/60 p-3 text-xs leading-relaxed text-foreground/80">
                        <div className="mb-1 font-semibold text-ecsi-green">Usage & Dosage</div>
                        {p.usage}
                      </div>
                    )}
                    {(p.description.length > 110 || p.usage) && (
                      <button
                        onClick={() => setExpanded((e) => ({ ...e, [p.id]: !e[p.id] }))}
                        className="mt-2 self-start text-xs font-semibold text-ecsi-orange hover:underline"
                      >
                        {isOpen ? "Show less" : "Read more"}
                      </button>
                    )}

                    <div className="mt-4">
                      <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Available Sizes
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.sizes.map((s) => {
                          const active = selSize === s;
                          return (
                            <button
                              key={s}
                              onClick={() => setSelectedSize((m) => ({ ...m, [p.id]: active ? "" : s }))}
                              className={`rounded-full border px-2.5 py-1 text-xs font-semibold transition-all ${
                                active
                                  ? "border-ecsi-red bg-ecsi-red text-white"
                                  : "border-border bg-background text-foreground/80 hover:border-ecsi-orange"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1.5 self-start rounded-full bg-ecsi-green/10 px-2.5 py-1 text-[10px] font-semibold text-ecsi-green">
                      <Sprout className="h-3 w-3" /> Bulk Orders Available
                    </div>

                    <a
                      href={waLink(orderMessage(p.name, selSize))}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                      Order on WhatsApp{selSize ? ` · ${selSize}` : ""}
                    </a>
                  </div>
                </article>
              );
            })}
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
                <img src={logoAsset.url} alt="ECSI" className="h-14 w-14 object-contain" />
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
