const { checkRequiredKeys } = require('./secret_provider_utils')

class AzrSecretsProvider {
  constructor () {
  }

  async getSecrets() {
    const { HOST, USER, PASSWORD, DB, SECRET_KEY } = process.env
    return { host: HOST , user: USER, password: PASSWORD, db: DB, secretKey: SECRET_KEY }
  }

  validate() {
    return {
      missingRequiredSecretsKeys: checkRequiredKeys(process.env, ['HOST', 'USER', 'PASSWORD', 'DB', 'SECRET_KEY'])
    }
  }
}

module.exports = { AzrSecretsProvider }
