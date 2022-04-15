import { chatObserver } from './chat-observer'
import { clickEvent, enterEvent } from './message-events'
import './settings'
import './styles.scss'

window.addEventListener('load', () => {
  const observe = chatMount()
  const { history } = window
  const { pushState, replaceState } = history

  history.pushState = (...args) => {
    pushState.apply(history, args)
    observe()
  }

  history.replaceState = (...args) => {
    replaceState.apply(history, args)
    observe()
  }

  observe()
})

function chatMount(): () => void {
  const observer = chatObserver((message) => {
    message.addEventListener('mouseenter', enterEvent)
    message.addEventListener('click', clickEvent)
  })

  return () => {
    const chat = document
      .querySelector<HTMLElement>('.chat-scrollable-area__message-container')

    if (chat) {
      observer.observe(chat, {
        childList: true
      })
    }
  }
}
