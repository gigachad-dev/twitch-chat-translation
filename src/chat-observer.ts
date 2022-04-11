import { getStore } from './settings'

interface ChatObserver {
  chat: HTMLElement
  update: (message: HTMLElement) => void
}

export function chatObserver({ chat, update }: ChatObserver): void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const element of mutation.addedNodes) {
        const message = element as HTMLElement
        const chatMessage = message.classList.contains('chat-line__message')
        const highlightMessage = message.querySelector('.chat-line__message-highlight')
        const { self } = getStore()

        if (chatMessage && (self || highlightMessage)) {
          update(message)
        }
      }
    }
  })

  observer.observe(chat, {
    childList: true
  })
}
