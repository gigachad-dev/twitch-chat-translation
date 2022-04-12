import translate, { setCORS } from 'google-translate-api-browser'
import { addTooltip } from './tooltip'
import Store from './store'

setCORS('https://proxy.crashmax.ru/')

interface TranslateResponse {
  text: string
  pronunciation: string
}

export async function enterEvent(event: MouseEvent): Promise<void> {
  const { enabled } = Store.value
  if (!enabled) return

  const el = event.currentTarget as HTMLElement
  const attr = el.getAttribute('request')
  if (attr) return

  const textFragment = el.querySelectorAll<HTMLElement>('.text-fragment')
  const message = Object
    .values(textFragment)
    .map((fragment) => fragment.innerText)
    .join(' ')
    .trim()

  if (!message) return

  el.setAttribute('request', 'load')

  try {
    const { to, from } = Store.value
    const { text } = await translate<TranslateResponse>(
      message, { to, from }
    )

    addTooltip(el, text)
  } catch (err) {
    addTooltip(el, (err as Error).message)
  }
}

export function clickEvent(event: MouseEvent): void {
  const el = event.currentTarget as HTMLElement
  const message = el.getAttribute('aria-label')
  if (message) {
    navigator.clipboard.writeText(message)
  }
}
