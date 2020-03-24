import { expect } from 'chai'
import { createFixedStr, FixedStr, numberObject, stringObject } from './'

interface ITestObject {
  foo: string
  bar: string
  bas: number
}

describe('fixedstr', () => {
  const tests = [
    {
      description: 'object oriented style',
      transformer: new FixedStr([
        FixedStr.str('foo', 2),
        {
          name: 'bar',
          size: 5,
          parse: str => str
        },
        FixedStr.number('baz', 3)
      ])
    },
    {
      description: 'functional style',
      transformer: createFixedStr([
        stringObject('foo', 2),
        {
          name: 'bar',
          size: 5,
          parse: str => str
        },
        numberObject('baz', 3)
      ])
    }
  ]
  tests.map(test => {
    describe(test.description, () => {
      const transformer = test.transformer
      it('should objectify', () => {
        expect(transformer.objectify<ITestObject>('F Bar  3')).to.eql({
          foo: 'F',
          bar: 'Bar  ',
          baz: 3
        })
      })

      it('should objectify empty string', () => {
        expect(transformer.objectify<ITestObject>('')).to.eql({
          foo: '',
          bar: '',
          baz: 0
        })
      })

      it('should objectify empty undefined', () => {
        expect(transformer.objectify<ITestObject>()).to.eql({
          foo: '',
          bar: '',
          baz: 0
        })
      })

      it('should stringify', () => {
        expect(
          transformer.stringify({
            foo: 'F',
            bar: 'Bar',
            baz: 3
          })
        ).to.equal('F Bar  003')
      })

      it('should stringify missing fields', () => {
        expect(
          transformer.stringify({
            foo: 'F'
          })
        ).to.equal('F      000')
      })

      it('should throw truncation error on string type', () => {
        let ex
        try {
          transformer.stringify({
            foo: 'Fooo'
          })
        } catch (e) {
          ex = e
        }
        expect(ex.message).to.contain('truncation error on field: foo')
      })

      it('should throw truncation error on number type', () => {
        let ex
        try {
          transformer.stringify({
            baz: 12345
          })
        } catch (e) {
          ex = e
        }
        expect(ex.message).to.contain('truncation error on field: baz')
      })

      it('should not throw truncation error if toFixedString truncated the value', () => {
        const t = new FixedStr([
          {
            name: 'foo',
            size: 4,
            toFixedString: (_, value) => {
              return value.substr(0, 4)
            }
          }
        ])
        const str = t.stringify({
          foo: '123456'
        })
        expect(str).to.equal('1234')
      })

      it('should not throw truncation error if using fixedstr.strTrunc', () => {
        const t = new FixedStr([FixedStr.strTrunc('TEST', 5)])
        const str = t.stringify({
          TEST: '123456'
        })
        expect(str).to.equal('12345')
      })
    })
  })
})
