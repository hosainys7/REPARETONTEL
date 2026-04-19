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

// Walk the offsetParent chain so transforms (Framer Motion) don't skew the
// measured Y position. getBoundingClientRect() includes transforms, which
// causes the wrong final scroll target while animations are still running.
export function getDocOffsetTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function smoothScrollToEl(el: HTMLElement | null, offset = HEADER_OFFSET, extra = 0) {
  if (!el || typeof window === "undefined") return;
  const top = Math.max(0, getDocOffsetTop(el) - offset - extra);
  window.scrollTo({ top, behavior: "smooth" });
}

export function smoothScrollToHash(hash: string, offset = HEADER_OFFSET) {
  if (typeof window === "undefined") return;
  if (!hash || hash === "#") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(hash);
  if (el instanceof HTMLElement) {
    requestAnimationFrame(() => smoothScrollToEl(el, offset));
  }
}

export function scrollToTop() {
  if (typeof window === "undefined") return;
  window.scrollTo({ top: 0, behavior: "smooth" });
}
