# fixedstr

Transforms fixed string to object and vice versa

Is available in both functional and object oriented styles, for backwards compatibility. Although we recommend using the functional style.

## Functional style

Given the object definitions, you can either use currying to objectify/stringify, or use a factory function that curries for you.

### Define objects

Object definitions can be created using a helper function, that takes in a property name and length of property value

```typescript
const objectDefinitions: IObjectDefinition[] = [
  stringObject('foo', 2),
  stringObject('bar', 5),
  numberObject('baz', 3)
]
```

### Currying method

```typescript
curriedObjectify(objectDefinitions)('F Bar  012') // {foo: 'F', bar: 'Bar', baz: 12}
curriedstringify(objectDefinitions)({ foo: 'F', bar: 'Bar', baz: 12 }) // 'F Bar  012'
```

### Factory method

```typescript
const transformer = createFixedStr(objectDefinitions)
transformer.objectify('F Bar  012') // {foo: 'F', bar: 'Bar', baz: 12}
transformer.stringify({ foo: 'F', bar: 'Bar', baz: 12 }) // 'F Bar  012'
```

## Object oriented style

```typescript
import { FixedStr } from 'fixedstr'
const transformer = new FixedStr([
  FixedStr.str('foo', 2),
  FixedStr.str('bar', 5),
  FixedStr.number('baz', 3)
])
transformer.objectify('F Bar  012') // {foo: 'F', bar: 'Bar', baz: 12}
transformer.stringify({ foo: 'F', bar: 'Bar', baz: 12 }) // 'F Bar  012'
```
