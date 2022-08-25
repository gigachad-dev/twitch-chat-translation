import './GM_config/index.js'
import Store, { configFields } from './store.js'
import type { ValuesStore } from './store.js'

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
        {} as ValuesStore
      )

      Store.write(options)
    },
    reset: () => Store.write()
  },
  fields: configFields
})

GM_registerMenuCommand('Настройки', () => {
  GM_config.open()
})
