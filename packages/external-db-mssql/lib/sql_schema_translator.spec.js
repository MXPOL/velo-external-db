const SchemaColumnTranslator = require('./sql_schema_translator')
const { Uninitialized } = require('test-commons')
const Chance = require('chance')
const { escapeId } = require('./mssql_utils')
const chance = Chance()

describe('Sql Schema Column Translator', () => {

    describe('translate velo data schema column to db column', () => {

        describe('numeric fields', () => {

            test('integer', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'int' }) ).toEqual(`${escapeId(ctx.fieldName)} INT`)
            })

            test('big integer', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'bigint' }) ).toEqual(`${escapeId(ctx.fieldName)} BIGINT`)
            })

            test('decimal float', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'float' }) ).toEqual(`${escapeId(ctx.fieldName)} FLOAT(5,2)`)
            })

            test('decimal float with precision', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'float', precision: '7, 3' }) ).toEqual(`${escapeId(ctx.fieldName)} FLOAT(7,3)`)
            })

            test('decimal double', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'double' }) ).toEqual(`${escapeId(ctx.fieldName)} REAL(5,2)`)
            })

            test('decimal double with precision', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'double', precision: '7, 3' }) ).toEqual(`${escapeId(ctx.fieldName)} REAL(7,3)`)
            })

            test('decimal generic', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'decimal' }) ).toEqual(`${escapeId(ctx.fieldName)} DECIMAL(5,2)`)
            })

            test('decimal generic with precision', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'number', subtype: 'decimal', precision: '7, 3' }) ).toEqual(`${escapeId(ctx.fieldName)} DECIMAL(7,3)`)
            })
        })

        describe('date time fields', () => {
            test('date', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'datetime', subtype: 'date' }) ).toEqual(`${escapeId(ctx.fieldName)} DATE`)
            })

            test('datetime', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'datetime', subtype: 'datetime' }) ).toEqual(`${escapeId(ctx.fieldName)} DATETIME2`)
            })

            test('timestamp', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'datetime', subtype: 'timestamp' }) ).toEqual(`${escapeId(ctx.fieldName)} DATETIME2`)
            })

            test('time', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'datetime', subtype: 'time' }) ).toEqual(`${escapeId(ctx.fieldName)} TIME`)
            })

            test('year', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'datetime', subtype: 'year' }) ).toEqual(`${escapeId(ctx.fieldName)} SMALLDATETIME`)
            })

        })

        describe('string fields', () => {
            test('string', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'text', subtype: 'string' }) ).toEqual(`${escapeId(ctx.fieldName)} VARCHAR(2048)`)
            })

            test('string with length', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'text', subtype: 'string', precision: '2055' }) ).toEqual(`${escapeId(ctx.fieldName)} VARCHAR(2055)`)
            })

            test('text small', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'text', subtype: 'small' }) ).toEqual(`${escapeId(ctx.fieldName)} TEXT`)
            })

            test('text medium', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'text', subtype: 'medium' }) ).toEqual(`${escapeId(ctx.fieldName)} TEXT`)
            })

            test('text large', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'text', subtype: 'large' }) ).toEqual(`${escapeId(ctx.fieldName)} TEXT`)
            })
        })

        describe('other fields', () => {
            test('boolean', () => {
                expect( env.schemaTranslator.columnToDbColumnSql({ name: ctx.fieldName, type: 'boolean' }) ).toEqual(`${escapeId(ctx.fieldName)} TINYINT`)
            })
        })
    })


    describe('translate db type to velo type', () => {
        describe('numeric fields', () => {

            test('integer', () => {
                ['INT', 'BIGINT'].forEach(t => {
                    expect( env.schemaTranslator.translateType(t) ).toEqual('number')
                })
            })

            test('decimal float', () => {
                ['FLOAT', 'FLOAT(5,2)', 'REAL', 'REAL(5,2)', 'DECIMAL', 'DECIMAL(5,2)', 'NUMERIC', 'NUMERIC(5,2)'].forEach(t => {
                    expect( env.schemaTranslator.translateType(t) ).toEqual('number')
                })
            })
        })

        describe('string fields', () => {
            test('string', () => {
                ['VARCHAR', 'VARCHAR(2048)', 'CHAR', 'CHAR(2048)', 'TEXT', 'NCHAR', 'NVARCHAR', 'NTEXT'].forEach(t => {
                    expect( env.schemaTranslator.translateType(t) ).toEqual('text')
                })
            })
        })

        describe('date time fields', () => {
            test('date', () => {
                ['DATE', 'DATETIME', 'DATETIME2', 'TIME', 'DATETIMEOFFSET', 'SMALLDATETIME'].forEach(t => {
                    expect( env.schemaTranslator.translateType(t) ).toEqual('datetime')
                })
            })
        })

        describe('other fields', () => {
            test('boolean', () => {
                ['tinyint'].forEach(t => {
                    expect( env.schemaTranslator.translateType(t) ).toEqual('boolean')
                })
            })
        })
    })





    const ctx = {
        fieldName: Uninitialized,
    }

    const env = {
        schemaTranslator: Uninitialized,
    }

    beforeEach(() => {
        ctx.fieldName = chance.word()
    })

    beforeAll(function() {
        env.schemaTranslator = new SchemaColumnTranslator()
    })
})
