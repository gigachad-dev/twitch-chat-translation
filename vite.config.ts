import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { author, description, name, version } from './package.json'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'src/index.ts',
      header: {
        name,
        description,
        author: author.name,
        version,
        match: 'https://*.twitch.tv/*'
      }
    })
  ]
})
