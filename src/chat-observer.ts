import Store from './store'

export function chatObserver(callback: (message: HTMLElement) => void): MutationObserver {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const element of mutation.addedNodes) {
        const message = element as HTMLElement
        const chatMessage = message.classList.contains('chat-line__message')
        const highlightMessage = message.querySelector('.chat-line__message-highlight')
        const { self } = Store.values

        if (chatMessage && (self || highlightMessage)) {
          callback(message)
        }
      }
    }
  })

  return observer
}
