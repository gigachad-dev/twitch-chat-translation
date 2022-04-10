import translate, { setCORS } from 'google-translate-api-browser'
import './styles.scss'

interface TranslateResponse {
  text: string
  pronunciation: string
}

//! https://github.com/Rob--W/cors-anywhere#demo-server
// setCORS('https://cors-anywhere.herokuapp.com/')
setCORS('https://proxy.crashmax.ru/')

window.addEventListener('load', () => {
  const chat = document.querySelector('.chat-scrollable-area__message-container')

  if (chat) {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const element of mutation.addedNodes) {
          const message = element as HTMLElement
          const chatMessage = message.classList.contains('chat-line__message')
          const highlightMessage = message.querySelector('.chat-line__message-highlight')

          if (chatMessage && (NODE_ENV === 'development' || highlightMessage)) {
            addListeners(message)
          }
        }
      }
    })

    observer.observe(chat, {
      childList: true
    })
  }

  function addListeners(target: HTMLElement): void {
    target.addEventListener('mouseenter', (event) => {
      const el = event.currentTarget as HTMLElement
      const attr = el.getAttribute('request')
      if (attr) return

      const textFragment = el.querySelectorAll<HTMLElement>('.text-fragment')
      const message = Object
        .values(textFragment)
        .map((fragment) => fragment.innerText)
        .join(' ')

      if (/[а-яА-Я]/gmi.test(message)) return

      el.setAttribute('request', 'load')

      translate<TranslateResponse>(message, {
        to: 'ru'
      }).then((res) => {
        el.setAttribute('role', 'tooltip')
        el.setAttribute('data-microtip-size', 'fit')
        el.setAttribute('data-microtip-position', 'top')
        el.setAttribute('aria-label', res.text)
      })
    })

    target.addEventListener('click', (event) => {
      const el = event.currentTarget as HTMLElement
      const message = el.getAttribute('aria-label')
      if (message) {
        navigator.clipboard.writeText(message)
      }
    })
  }
})
