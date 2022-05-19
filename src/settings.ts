import Store, { to, from } from './store'
import type { IStore } from './store'

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
        }, {} as IStore)

      Store.write(options)
    },
    reset: () => Store.write()
  },
  fields: {
    enabled: {
      type: 'checkbox',
      default: true,
      label: 'Вкл/Выкл расширения'
    },
    clipboard: {
      type: 'checkbox',
      default: true,
      label: 'Копировать текст сообщения (оригинал/перевод)'
    },
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
