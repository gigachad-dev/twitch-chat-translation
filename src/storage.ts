export const toLangs = [
  'en',
  'ru',
  'kk',
  'uk',
  'ja'
] as const

export const fromLangs = [
  'en',
  'ru',
  'kk',
  'uk',
  'ja',
  'auto'
] as const

export type ToLangs = typeof toLangs[number]
export type FromLangs = typeof fromLangs[number]

export interface StorageValues {
  to: ToLangs
  from: FromLangs
  self: boolean
  enabled: boolean
  clipboard: boolean
}

class Storage {
  private STORAGE_VALUE: StorageValues
  private readonly STORAGE_KEY = 'translation-options'
  private readonly INITIAL_VALUES: StorageValues = {
    to: toLangs[1],
    from: toLangs[0],
    self: false,
    enabled: true,
    clipboard: true
  }

  constructor() {
    this.read()
  }

  get values() {
    return this.STORAGE_VALUE
  }

  get initialValues() {
    return this.INITIAL_VALUES
  }

  write(value?: any): void {
    this.STORAGE_VALUE = value ?? this.INITIAL_VALUES
    GM_setValue(this.STORAGE_KEY, this.STORAGE_VALUE)
  }

  read(): void {
    try {
      const value = GM_getValue<StorageValues>(this.STORAGE_KEY)
      if (!value) this.write()
      this.STORAGE_VALUE = value
    } catch (err) {
      console.error(err)
    }
  }
}

export const storage = new Storage()
