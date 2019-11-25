# fixedstr

Transforms fixed string to object and vice versa

## Javascript

```javascript
var transformer = new fixedstr([
  fixedstr.str('foo', 2),
  fixedstr.str('bar', 5),
  fixedstr.number('baz', 3)
])
transformer.objectify('F Bar  012') // {foo: 'F', bar: 'Bar', baz: 12}
transformer.stringify({ foo: 'F', bar: 'Bar', baz: 12 }) // 'F Bar  012'
```

## Typescript

```typescript
import { FixedStr } from 'fixedstr'
interface ITestObject {
  foo: string
  bar: string
  bas: number
}
const transformer = new FixedStr([
  FixedStr.str('foo', 2),
  FixedStr.str('bar', 5),
  FixedStr.number('baz', 3)
])
transformer.objectify<ITestObject>('F Bar  012') // {foo: 'F', bar: 'Bar', baz: 12}:ITestObject
transformer.stringify({ foo: 'F', bar: 'Bar', baz: 12 }) // 'F Bar  012'
```
