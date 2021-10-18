const { checkRequiredKeys } = require('../utils/config_utils')

class CommonConfigReader {
    constructor() { }

    readConfig() {
        const { CLOUD_VENDOR, TYPE, REGION, SECRET_ID_OVERRIDE, PROTOCOL_VERSION } = process.env
        return { vendor: CLOUD_VENDOR, type: TYPE, region: REGION, secretId: SECRET_ID_OVERRIDE, protocolVersion: PROTOCOL_VERSION }
    }

    validate() {
        return {
            missingRequiredSecretsKeys: checkRequiredKeys(process.env, ['CLOUD_VENDOR', 'TYPE'])
        }
    }
}

module.exports = CommonConfigReader