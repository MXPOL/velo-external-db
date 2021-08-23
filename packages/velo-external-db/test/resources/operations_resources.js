const {Uninitialized} = require('test-commons');
const mysql = require('external-db-mysql')
const spanner = require('external-db-spanner')
const postgres = require('external-db-postgres')

const env = {
    driver: Uninitialized,
}

const init = async impl => {
    const driver = impl.opsDriver()

    env.driver = driver
}

const postgresTestEnvInit = async () => await init(postgres)
const mysqlTestEnvInit = async () => await init(mysql)
const spannerTestEnvInit = async () => await init(spanner)

module.exports = { env,
    postgresTestEnvInit,
    mysqlTestEnvInit,
    spannerTestEnvInit,
}