export function addToltip(el: HTMLElement, label: string): void {
  el.setAttribute('role', 'tooltip')
  el.setAttribute('data-microtip-size', 'fit')
  el.setAttribute('data-microtip-position', 'top')
  el.setAttribute('aria-label', label)
}
