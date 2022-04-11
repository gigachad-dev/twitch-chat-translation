import translate, { setCORS } from 'google-translate-api-browser'
import { addToltip } from './tooltip'

setCORS('https://proxy.crashmax.ru/')

interface TranslateResponse {
  text: string
  pronunciation: string
}

export async function enterEvent(event: MouseEvent): Promise<void> {
  const el = event.currentTarget as HTMLElement
  const attr = el.getAttribute('request')
  if (attr) return

  const textFragment = el.querySelectorAll<HTMLElement>('.text-fragment')
  const message = Object
    .values(textFragment)
    .map((fragment) => fragment.innerText)
    .join(' ')
    .trim()

  if (!message || /[а-яА-Я]/gmi.test(message)) return

  el.setAttribute('request', 'load')

  try {
    const { text } = await translate<TranslateResponse>(
      message, { to: 'ru' }
    )

    addToltip(el, text)
  } catch (err) {
    addToltip(el, (err as Error).message)
  }
}

export function clickEvent(event: MouseEvent): void {
  const el = event.currentTarget as HTMLElement
  const message = el.getAttribute('aria-label')
  if (message) {
    navigator.clipboard.writeText(message)
  }
}
