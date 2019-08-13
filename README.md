testsimple is a Javascript unit testing framework that uses the Test Anything
Protocol (TAP). It is inspired by Test::Simple.

# Example

```javascript
const { test, doneTesting } = require('testsimple');

test('Addition', ts => {
    // Test with simple assertions
    ts.ok(10 > 3);
    ts.ok(2 + 3 == 5);

    // Output extra information
    ts.ok(10 > 3,     '3 is less than 10');
    ts.ok(2 + 3 == 5, 'It works this way too');
});

test('Strings', ts => {
    ts.eq("  Test  ".trim(), "Test");
});

doneTesting();
```

If you don't like sectioning the tests like that, you just write the tests like
this.

```javascript
const { ts } = require('testsimple');

ts.ok(5 > 1, "This should pass");
ts.ok(true);

ts.eq(5, 4 + 1);
ts.ok(5 + 4 == 9);

ts.doneTesting();
```
