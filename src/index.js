const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const json = require('koa-json')
const logger = require('koa-logger')
const yenv = require('yenv')
const routes = require('./routes')
const docs = require('./utils/api.docs')

const env = yenv()
const server = new Koa()

server.use(cors()).use(bodyParser()).use(json()).use(logger()).use(docs)

routes.map((r) => {
  server.use(r.routes()).use(r.allowedMethods())
})

server.listen(env.PORT, () => {
  console.log(`Listening on port: ${env.PORT}`)
})
