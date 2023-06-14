import { defineConfig } from 'vite'
import Userscript from 'vite-userscript-plugin'
import { author, description, homepage, name, version } from './package.json'

export default defineConfig({
  plugins: [
    Userscript({
      entry: 'src/index.ts',
      header: {
        name,
        version,
        homepage,
        description,
        author: author.name,
        match: 'https://*.twitch.tv/*'
      },
      server: {
        port: 3000
      }
    })
  ]
})
