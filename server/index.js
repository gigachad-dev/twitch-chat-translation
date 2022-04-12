import { createServer } from 'cors-anywhere'

const host = process.env.APP_IP || 'localhost'
const port = process.env.APP_PORT || 8000

const server = createServer({
  originWhitelist: [],
  requireHeader: ['origin', 'x-requested-with']
})

server.listen(port, host, () => {
  console.log(`Running CORS Anywhere on http://${host}:${port}`)
})
