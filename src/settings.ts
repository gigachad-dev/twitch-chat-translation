const to = ['en', 'ru', 'kk', 'uk', 'ja'] as const
const from = ['en', 'ru', 'kk', 'uk', 'ja', 'auto'] as const

type ToLangs = typeof to[number]
type FromLangs = typeof from[number]

interface Store {
  to: ToLangs
  from: FromLangs
  self: boolean
}

const STORE_KEY = 'twitch-chat-translation'
const INITIAL_STORE: Store = {
  to: 'ru',
  from: 'en',
  self: false
}

export function getStore(): Store {
  const store = localStorage.getItem(STORE_KEY)

  if (!store) {
    saveStore(INITIAL_STORE)
    return INITIAL_STORE
  }

  return JSON.parse(store) as Store
}

function saveStore(data: Store): void {
  localStorage.setItem(STORE_KEY, JSON.stringify(data))
}

GM_config.init({
  id: 'Options',
  title: 'Настройки',
  events: {
    save: () => {
      const options = Object
        .values(GM_config.fields)
        .reduce((arr, { id, value }) => {
          // @ts-ignore
          arr[id] = value
          return arr
        }, {} as Store)

      saveStore(options)
      window.location.reload()
    },
    reset: () => window.location.reload()
  },
  fields: {
    self: {
      type: 'checkbox',
      default: false,
      label: 'Переводить собственные сообщения'
    },
    from: {
      type: 'select',
      options: from,
      default: 'en',
      label: 'Переводить из'
    },
    to: {
      type: 'select',
      options: to,
      default: 'ru',
      label: 'Переводить в'
    }
  }
})

GM_registerMenuCommand('Настройки', () => {
  GM_config.open()
})
