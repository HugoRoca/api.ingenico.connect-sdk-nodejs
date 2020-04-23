/* eslint-disable prefer-const */
const connectSdk = require('connect-sdk-nodejs')
const _ = require('lodash')
const yenv = require('yenv')
const env = yenv()

module.exports = class {
  constructor (params) {
    this.params = params
    this.connectSdk = connectSdk.init({
      host: this.params.host || env.INGENICO.HOST,
      scheme: this.params.sheme || env.INGENICO.SCHEME,
      port: this.params.port || env.INGENICO.PORT,
      enableLogging: false, // defaults to false
      apiKeyId: this.params.apiKeyId || env.INGENICO.API_KEY,
      secretApiKey: this.params.secretApiKey || env.INGENICO.SECRET_API_KEY,
      integrator: this.params.integrator || env.INGENICO.INTEGRATOR
    })
  }

  async sessionsCreate () {
    return new Promise((resolve, reject) => {
      const body = {}
      this.connectSdk.sessions.create(this.params.merchantId, body, null, (error, sdkResponse) => {
        if (_.isNull(sdkResponse) || _.isUndefined(sdkResponse)) reject(error)
        resolve(sdkResponse)
      })
    })
  }
}
