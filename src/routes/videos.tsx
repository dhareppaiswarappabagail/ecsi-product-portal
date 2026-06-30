import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Search, Play } from "lucide-react";
import { PRODUCTS, CATEGORIES, type Category } from "@/data/products";
import { useLanguage } from "@/hooks/use-language";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "Product Videos — ECSI Eaglecrop Science Industries" },
      { name: "description", content: "Watch product demos, application techniques and farmer testimonials for ECSI bio-stimulants." },
      { property: "og:title", content: "Product Videos — ECSI" },
      { property: "og:description", content: "Application demos and farmer results for ECSI bio-stimulants." },
    ],
  }),
  component: VideosPage,
});

// Demo agricultural video ID (placeholder — replace with real product videos)
const DEMO_VIDEO = "EngW7tLk6R8";

function VideosPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(null);

  const list = useMemo(() => {
    let l = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory);
    if (query.trim()) {
      const q = query.toLowerCase();
      l = l.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    return l;
  }, [activeCategory, query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
          <button
            onClick={() => navigate({ to: "/" })}
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" /> {t("back", lang)}
          </button>
          <div className="font-display text-base font-bold">{t("videos_title", lang)}</div>
          <Link to="/" className="text-sm font-medium text-ecsi-orange hover:underline">ECSI</Link>
        </div>
      </header>

      <section className="bg-secondary/40 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-ecsi-orange">ECSI Knowledge Hub</div>
          <h1 className="font-display text-3xl font-bold md:text-4xl">{t("videos_title", lang)}</h1>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">{t("videos_sub", lang)}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-ecsi-orange focus:ring-2 focus:ring-ecsi-orange/30"
            />
          </div>
          <div className="flex flex-1 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["All", ...CATEGORIES] as const).map((c) => {
              const a = activeCategory === c;
              return (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c as Category | "All")}
                  className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all ${
                    a ? "border-transparent bg-ecsi-red text-white" : "border-border bg-background text-foreground/80 hover:border-ecsi-orange"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const vid = p.videoId || DEMO_VIDEO;
            const isActive = active === p.id;
            return (
              <article key={p.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
                <div className="relative aspect-video bg-black">
                  {isActive ? (
                    <iframe
                      title={p.name}
                      src={`https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <button onClick={() => setActive(p.id)} className="group absolute inset-0 grid place-items-center">
                      <img
                        src={`https://img.youtube.com/vi/${vid}/hqdefault.jpg`}
                        alt={`${p.name} video thumbnail`}
                        className="absolute inset-0 h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
                      />
                      <div className="relative grid h-16 w-16 place-items-center rounded-full bg-ecsi-red/90 text-white shadow-2xl transition-transform group-hover:scale-110">
                        <Play className="h-7 w-7 fill-white" />
                      </div>
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ecsi-orange">{p.category}</div>
                  <div className="mt-1 font-display text-lg font-bold leading-tight">{p.name}</div>
                  {p.nameMr && <div className="text-xs text-muted-foreground" lang="mr">{p.nameMr}</div>}
                </div>
              </article>
            );
          })}
        </div>

        {list.length === 0 && (
          <div className="py-16 text-center text-muted-foreground">No videos match your search.</div>
        )}
      </section>
    </div>
  );
}
