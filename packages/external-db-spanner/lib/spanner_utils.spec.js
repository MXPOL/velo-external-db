const { patchFloat, extractFloatFields } = require('./spanner_utils')
const { Spanner } = require ('@google-cloud/spanner')
const { Chance } = require('chance')
const { Uninitialized } = require('test-commons')

const chance = Chance()

describe('Spanner utils', () => {
  test('patchFloat will wrap with Spanner.float float columns data', () => {
    const item = { floatColumn: ctx.integer, doubleColumn: ctx.integer, intColumn: ctx.integer, field: ctx.text }

    const fields = [
      { field: 'floatColumn', type: 'number', subtype: 'float', },
      { field: 'doubleColumn', type: 'number', subtype: 'double', },
      { field: 'intColumn', type: 'number', subtype: 'int', },
      { field: 'field', type: 'text', subtype: 'string' },
    ]
    
    expect(patchFloat(item, extractFloatFields(fields))).toEqual({
        floatColumn: Spanner.float(ctx.integer),
        doubleColumn: Spanner.float(ctx.integer),
        intColumn: ctx.integer,
        field: ctx.text,
      })
    })
    const ctx = {
      integer: Uninitialized,
      text: Uninitialized
    }
    beforeEach(() => {
      ctx.integer = chance.integer()
      ctx.text = chance.word()
    })

})