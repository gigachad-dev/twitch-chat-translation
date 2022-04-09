import translate, { setCORS } from 'google-translate-api-browser'
import './styles.scss'

setCORS('https://cors-anywhere.herokuapp.com/')

window.addEventListener('load', () => {
  const chat = document.querySelector('.chat-scrollable-area__message-container')

  if (chat) {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const element of mutation.addedNodes) {
          const message = element as HTMLElement
          const chatMessage = message.classList.contains('chat-line__message')
          const highlightMessage = message.querySelector('.chat-line__message-highlight')

          if (chatMessage && highlightMessage) {
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
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    target.addEventListener('mouseenter', (event) => {
      const el = event.currentTarget as HTMLElement
      const attr = el.getAttribute('request')

      if (attr) {
        return
      }

      el.setAttribute('request', 'load')
      const message = el.querySelector('.text-fragment')!.textContent!

      googleTranslate(message)
        .then((res) => {
          // el.setAttribute('request', 'done')
          el.setAttribute('role', 'tooltip')
          el.setAttribute('data-microtip-size', 'fit')
          el.setAttribute('data-microtip-position', 'top')
          el.setAttribute('aria-label', res.text)
        })
        .catch(() => {
          // el.setAttribute('request', 'fail')
        })
    })

    // target.addEventListener('mouseleave', (event) => { console.log(event) })
    // target.addEventListener('click', (event) => { console.log(event) })
  }
})

interface TranslateResponse {
  text: string
  pronunciation: string
}

async function googleTranslate(message: string): Promise<TranslateResponse> {
  return await translate<TranslateResponse>(message, {
    to: 'ru'
  })

  // @le_xot (ле_шот)
  // const body = new URLSearchParams({
  //   text,
  //   auth_key: '3fdbfe4f-56a5-07ad-77f5-afcfc6589cec:fx',
  //   target_lang: 'RU'
  // })

  // try {
  //   const res = await fetch('https://api-free.deepl.com/v2/translate', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     body
  //   })

  //   const data = await res.json()
  //   console.log(data)
  // } catch (err) {
  //   console.log(err)
  // }
}
