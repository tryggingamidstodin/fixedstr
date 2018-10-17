fixedstr
========
Transforms fixed string to object and vice versa

```javascript
    var transformer = new fixedstr([
        fixedstr.str('foo', 2),
        fixedstr.str('bar', 5),
        fixedstr.number('baz', 3)
    ]);
    transformer.objectify('F Bar  012'); // {foo: 'F', bar: 'Bar', baz: 12}
    transformer.stringify({foo: 'F', bar: 'Bar', baz: 12}); // 'F Bar  012'
```

