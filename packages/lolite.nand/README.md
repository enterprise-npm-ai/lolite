## nand(a, b)
Returns the negation of the result of `and(a, b)`, where the `a` and `b` passed into `and` are the same `a` and `b` the user provides for `nand`.
```javascript
const lolite = require("lolite.nand")

console.log(nand(true, true)) // false

console.log(nand(false, true)) // true

console.log(nand(true, false)) // true

console.log(nand(false, false)) // true
```

### nor(a, b)
Returns the negation of the result of `or(a, b)`, where the `a` and `b` passed into `or` are the same `a` and `b` the user provides for `nor`.
```javascript
const lolite = require("lolite.nand")

console.log(lolite.nor(false, false)) // true
console.log(lolite.nor(true, false))  // false
console.log(lolite.nor(false, true)) // false
console.log(lolite.nor(true, true)) // false
```

### `xor(a, b)`
Like `or`, but if `a` and `b` are both truthy, or if `a` and `b` are both falsy, returns `false`.

```javascript
const lolite = require("lolite.nand")
const testTruthyValue = "truthy"
const testFalsyValue = 0

console.log(lolite.xor(true, false)) // true
console.log(lolite.xor(false, true)) // true
console.log(lolite.xor(testTruthyValue, testFalsyValue)) // true

console.log(lolite.xor(true, true))  // false
console.log(lolite.xor(false, false)) // false
console.log(lolite.xor(testTruthyValue, testTruthyValue)) // false
console.log(lolite.xor(testFalsyValue, testFalsyValue)) // false
```

### `xnor(a, b)`
Returns the negation of the result of `xor(a, b)`, where the `a` and `b` passed into `xor` are the same `a` and `b` the user provides for `xnor`.

```javascript
const lolite = require("lolite.nand")
const testTruthyValue = "truthy"
const testFalsyValue = 0

console.log(lolite.xnor(true, false)) // false
console.log(lolite.xnor(false, true)) // false
console.log(lolite.xnor(testTruthyValue, testFalsyValue)) // false

console.log(lolite.xnor(true, true))  // true
console.log(lolite.xnor(false, false)) // true
console.log(lolite.xnor(testTruthyValue, testTruthyValue)) // true
console.log(lolite.xnor(testFalsyValue, testFalsyValue)) // true
```
