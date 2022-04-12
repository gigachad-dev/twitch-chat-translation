import pkg from './package.json'
import type { WPUSOptions } from 'webpack-userscript'

interface Server {
  hostname: string
  port: number
}

interface IWebpackUserScript {
  /* userscript version */
  scriptVersion: string

  /* homepage url (github pages) */
  scriptHomePage: string

  /* script file name, without file extension */
  scriptFileName: string

  server: Server
  isDev: boolean

  /**
   * userscript headers
   * including script name, description, match url, grants and so on
   * see https://www.tampermonkey.net/documentation.php for details
   **/
  scriptHeaders: WPUSOptions['headers']
}

const NODE_ENV = process.env.NODE_ENV || 'development'
const isDev = NODE_ENV === 'development'

const server: Server = {
  hostname: 'https://localhost',
  port: 5500
}

const GM_config = (isDev ?
  `${server.hostname}:${server.port}/` :
  `${pkg.homepage}`) + 'GM_config.js'

export const UserScriptConfig: IWebpackUserScript = {
  scriptVersion: pkg.version,
  scriptHomePage: pkg.homepage,
  scriptFileName: pkg.name,
  server,
  isDev,
  scriptHeaders: {
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    author: pkg.author.name,
    include: '/^(http|https)://(www.twitch.tv|canary.twitch.tv|release.twitch.tv).*$/',
    require: GM_config,
    grant: [
      'GM_registerMenuCommand',
      'GM_getValue',
      'GM_setValue',
      'GM_addStyle'
    ]
  }
}
