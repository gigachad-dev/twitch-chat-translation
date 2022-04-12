import { chatObserver } from './chat-observer'
import { clickEvent, enterEvent } from './message-events'
import './settings'
import './styles.scss'

window.addEventListener('load', () => {
  const chat = document
    .querySelector<HTMLElement>('.chat-scrollable-area__message-container')

  if (chat) {
    chatObserver({
      chat,
      update: (message) => {
        message.addEventListener('mouseenter', enterEvent)
        message.addEventListener('click', clickEvent)
      }
    })
  }
})
