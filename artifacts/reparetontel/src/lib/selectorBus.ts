export type SelectorAction =
  | { kind: "reset" }
  | { kind: "open-selector" }
  | { kind: "open-brand"; brandSlug: string }
  | { kind: "open-accessory"; categorySlug?: string };

const EVENT = "selector:nav";
export const HEADER_OFFSET = 88;

export function selectorNav(action: SelectorAction) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent<SelectorAction>(EVENT, { detail: action }));
}

export function onSelectorNav(handler: (action: SelectorAction) => void): () => void {
  if (typeof window === "undefined") return () => {};
  const fn = (e: Event) => handler((e as CustomEvent<SelectorAction>).detail);
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
}

export function smoothScrollToEl(el: HTMLElement | null, offset = HEADER_OFFSET) {
  if (!el || typeof window === "undefined") return;
  requestAnimationFrame(() => {
    const top = window.scrollY + el.getBoundingClientRect().top - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  });
}

export function smoothScrollToHash(hash: string, offset = HEADER_OFFSET) {
  if (typeof window === "undefined") return;
  if (!hash || hash === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(hash);
  if (el instanceof HTMLElement) smoothScrollToEl(el, offset);
}

export function scrollToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
