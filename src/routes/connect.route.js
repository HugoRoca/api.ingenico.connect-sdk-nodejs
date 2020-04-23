const KoaRouter = require('koa-router')
const ConnectController = require('../controllers/connect.controller')
const yenv = require('yenv')

const connectRouter = new KoaRouter()
const controller = new ConnectController()
const env = yenv()

connectRouter.post(`${env.ENDPOINTS.CONNECT}`, controller.init)

module.exports = connectRouter
