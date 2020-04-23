const ConnectModel = require('../models/connectRequest.model')
const ConnectService = require('../services/connect.service')

module.exports = class {
  async init (ctx) {
    const connectModel = new ConnectModel(
      ctx.request.body.host,
      ctx.request.body.sheme,
      ctx.request.body.port,
      ctx.request.body.enableLogging,
      ctx.request.body.logger,
      ctx.request.body.apiKeyId,
      ctx.request.body.secretApiKey,
      ctx.request.body.integrator,
      ctx.request.body.merchantId
    )
    try {
      const connectService = new ConnectService(connectModel)
      ctx.body = await connectService.sessionsCreate()
    } catch (error) {
      console.log('error', error)
      ctx.throw(400, error)
    }
  }
}
