class Store<T extends object> {
  private storeKey: string
  private initialValue: T
  private store: T

  constructor(key: string, value: T) {
    this.storeKey = key
    this.initialValue = value
    this.read()
  }

  get value(): T {
    return this.store
  }

  read(): T {
    const store = localStorage.getItem(this.storeKey)

    if (!store) {
      this.write(this.initialValue)
      return this.store
    }

    try {
      const storeValue = JSON.parse(store) as T
      this.store = storeValue
      return storeValue
    } catch (err) {
      this.write(this.initialValue)
      return this.store
    }
  }

  write(data?: T): void {
    this.store = data ?? this.initialValue
    localStorage.setItem(this.storeKey, JSON.stringify(this.store))
  }
}

export const to = ['en', 'ru', 'kk', 'uk', 'ja'] as const
export const from = ['en', 'ru', 'kk', 'uk', 'ja', 'auto'] as const

type ToLangs = typeof to[number]
type FromLangs = typeof from[number]

export interface IStore {
  to: ToLangs
  from: FromLangs
  self: boolean
  enabled: boolean
  clipboard: boolean
}

const initialStore: IStore = {
  to: to[1],
  from: to[0],
  self: false,
  enabled: true,
  clipboard: true
}

export default new Store(
  'twitch-chat-translation',
  initialStore
)
