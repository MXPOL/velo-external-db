const moment = require('moment')

// Ported from PostgreSQL 9.2.4 source code in src/interfaces/libpq/fe-exec.c
const escapeIdentifier = (str) => `"${(str || '').replace(/"/g, '""')}"`

const prepareStatementVariables = (n) => {
    return Array.from({length: n}, (_, i) => i + 1)
        .map(i => `$${i}`)
        .join(', ')
}

const patchDateTime = (item) => {
    const obj = {}
    for (const key of Object.keys(item)) {
        const value = item[key]
        const reISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        if (value instanceof Date) {
            obj[key] = moment(value).format('YYYY-MM-DD HH:mm:ss')
        } else if (reISO.test(value)) {
            obj[key] = moment(new Date(value)).format('YYYY-MM-DD HH:mm:ss')
        } else {
            obj[key] = value
        }
    }
    return obj
}

const asParamArrays = (item) => {
    return Object.values(item);
}


module.exports = { escapeIdentifier, asParamArrays, prepareStatementVariables, patchDateTime }