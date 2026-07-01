import { useEffect, useState } from "react";
import { X, ChevronRight, Edit3 } from "lucide-react";
import type { Product } from "@/data/products";
import { waLink, orderMessage } from "@/lib/whatsapp";
import { t } from "@/lib/i18n";
import type { Lang } from "@/hooks/use-language";

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607z" />
  </svg>
);

export function ProductModal({
  product,
  lang,
  onClose,
  onWatchVideo,
}: {
  product: Product | null;
  lang: Lang;
  onClose: () => void;
  onWatchVideo: (p: Product) => void;
}) {
  const [size, setSize] = useState<string>("");
  const [preview, setPreview] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (product) {
      setSize(product.sizes[0] ?? "");
      setPreview(false);
    }
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  if (!product) return null;

  const openPreview = () => {
    setMessage(orderMessage(product.name, size, product.description));
    setPreview(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-secondary"
        >
          <X className="h-5 w-5" />
        </button>

        {!preview ? (
          <div>
            <div
              className="relative h-44 rounded-t-3xl"
              style={{ background: "linear-gradient(135deg, var(--ecsi-green), oklch(0.32 0.08 145))" }}
            >
              <div
                className="absolute inset-0 rounded-t-3xl opacity-40"
                style={{ background: "radial-gradient(circle at 70% 30%, var(--ecsi-orange), transparent 55%)" }}
              />
              <div className="relative flex h-full flex-col items-center justify-center text-white">
                <div className="font-display text-3xl font-bold">{product.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest opacity-80">{product.category}</div>
              </div>
            </div>

            <div className="p-6">
              {(product.nameMr || product.nameHi) && (
                <div className="mb-3 flex flex-wrap gap-3 text-sm">
                  {product.nameHi && <span className="text-ecsi-orange" lang="hi">हिंदी: {product.nameHi}</span>}
                  {product.nameMr && <span className="text-ecsi-orange" lang="mr">मराठी: {product.nameMr}</span>}
                </div>
              )}

              <p className="text-sm leading-relaxed text-foreground/80">{product.description}</p>

              {product.usage && (
                <div className="mt-5 rounded-xl border border-border bg-secondary/50 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-ecsi-green">{t("dosage", lang)}</div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{product.usage}</p>
                </div>
              )}

              <div className="mt-5">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("sizes", lang)}</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${
                        size === s
                          ? "border-ecsi-red bg-ecsi-red text-white shadow"
                          : "border-border bg-background text-foreground/80 hover:border-ecsi-orange"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={openPreview}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t("order_wa", lang)}
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onWatchVideo(product)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ecsi-orange px-5 py-3 text-sm font-semibold text-ecsi-orange transition-colors hover:bg-ecsi-orange hover:text-white"
                >
                  {t("watch_video", lang)}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 pt-12">
            <div className="text-xs font-bold uppercase tracking-widest text-ecsi-orange">{t("preview_title", lang)}</div>
            <h3 className="mt-2 font-display text-2xl font-bold">{product.name} {size && <span className="text-ecsi-orange">· {size}</span>}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{t("preview_sub", lang)}</p>

            <div className="mt-5">
              <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                <Edit3 className="h-3.5 w-3.5" /> WhatsApp Message
              </div>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground outline-none focus:border-ecsi-orange focus:ring-2 focus:ring-ecsi-orange/30"
              />
              <div className="mt-2 text-[11px] text-muted-foreground">
                Sending to: +91 9373826926 · ECSI Sales
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                onClick={() => setPreview(false)}
                className="rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground/80 hover:bg-secondary"
              >
                {t("cancel", lang)}
              </button>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noreferrer"
                onClick={() => setTimeout(onClose, 200)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <WhatsAppIcon className="h-4 w-4" /> {t("send_now", lang)}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
