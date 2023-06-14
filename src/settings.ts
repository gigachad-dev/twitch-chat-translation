import './GM_config/index.js'
import { fromLangs, storage, StorageValues, toLangs } from './storage.js'

export const configFields: Record<string, Field> = {
  enabled: {
    type: 'checkbox',
    default: storage.initialValues.enabled,
    label: 'Вкл/Выкл перевод'
  },
  clipboard: {
    type: 'checkbox',
    default: storage.initialValues.clipboard,
    label: 'Копировать текст сообщения (оригинал/перевод)'
  },
  self: {
    type: 'checkbox',
    default: storage.initialValues.self,
    label: 'Переводить собственные сообщения'
  },
  from: {
    type: 'select',
    options: fromLangs,
    default: 'en',
    label: 'Переводить из'
  },
  to: {
    type: 'select',
    options: toLangs,
    default: 'ru',
    label: 'Переводить в'
  }
}

GM_config.init({
  id: 'Options',
  title: 'Настройки',
  events: {
    save: () => {
      const options = Object.values(GM_config.fields).reduce(
        (arr, { id, value }) => {
          // @ts-ignore
          arr[id] = value
          return arr
        },
        {} as StorageValues
      )

      storage.write(options)
    },
    reset: () => storage.write()
  },
  fields: configFields
})

GM_registerMenuCommand('Настройки', () => {
  GM_config.open()
})
