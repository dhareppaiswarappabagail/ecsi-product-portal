import { useEffect, useState } from "react";

export type Lang = "en" | "hi" | "mr";
const KEY = "ecsi-lang";

export function useLanguage() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && (localStorage.getItem(KEY) as Lang)) || "en";
    setLang(saved);
  }, []);

  function change(l: Lang) {
    setLang(l);
    if (typeof window !== "undefined") localStorage.setItem(KEY, l);
  }

  return { lang, setLang: change };
}
