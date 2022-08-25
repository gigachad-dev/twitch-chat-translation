import { defineConfig } from 'vite'
import { UserscriptPlugin } from 'vite-userscript-plugin'
import { author, description, name, version } from './package.json'

export default defineConfig({
  plugins: [
    UserscriptPlugin({
      entry: 'src/index.ts',
      metadata: {
        name,
        description,
        author: author.name,
        version,
        match: 'https://*.twitch.tv/*'
      }
    })
  ]
})
