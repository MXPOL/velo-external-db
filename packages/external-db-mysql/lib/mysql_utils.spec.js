const { InvalidQuery } = require('velo-external-db-commons').errors
const { escapeTable, escapeId } = require('./mysql_utils')

describe('Mysql Utils', () => {
    test('escape collection id will not allow dots', () => {
        expect( () => escapeTable('db.table') ).toThrow(InvalidQuery)
    })

    test('escape collection id', () => {
        expect( escapeTable('some_table_name') ).toEqual(escapeId('some_table_name'))
    })
})
