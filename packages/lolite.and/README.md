## and(a, b)
Returns `b` if both values are truthy, otherwise returns the first value passed into the function that *isn't* truthy.
```javascript
const lolite = require("lolite.and")

console.log(and(true, true))   // true
console.log(and(true, false))  // false
console.log(and(false, true))  // false
console.log(and(false, false)) // false
console.log(and("truthy value", true)) // true
console.log(and(0, true)) // 0
console.log(and("", 0)) // ""
```

### or(a,b)
Returns `a` if `a` is truthy, else returns `b`.
```javascript
const lolite = require("lolite.and")

console.log(lolite.or(true, false)) // true
console.log(lolite.or(false, true)) // true
console.log(lolite.or(true, true)) // true
console.log(lolite.or(false, false)) // false
console.log(lolite.or(0, true)) // true
console.log(lolite.or(0, "truthy value")) // "truthy value"
console.log(lolite.or("truthy value", false)) // "truthy value"
```

### not(value)
Returns the negation of the value passed in. Equivalent to JavaScript `!`.
```javascript
const lolite = require("lolite.and")

console.log(lolite.not(false)) // true
console.log(lolite.not(true)) // false
console.log(lolite.not(0)) // true
console.log(lolite.not("")) // true
console.log(lolite.not()) // true
console.log(lolite.not(1)) // false
```

### nand(a, b)
Returns the negation of the result of `and(a, b)`, where the `a` and `b` passed into `and` are the same `a` and `b` the user provides for `nand`.
```javascript
const lolite = require("lolite.and")

console.log(lolite.nand(true, true)) // false

console.log(lolite.nand(false, true)) // true

console.log(lolite.nand(true, false)) // true

console.log(lolite.nand(false, false)) // true
```

### nor(a, b)
Returns the negation of the result of `or(a, b)`, where the `a` and `b` passed into `or` are the same `a` and `b` the user provides for `nor`.
```javascript
const lolite = require("lolite.and")

console.log(lolite.nor(false, false)) // true
console.log(lolite.nor(true, false))  // false
console.log(lolite.nor(false, true)) // false
console.log(lolite.nor(true, true)) // false
```

### `xor(a, b)`
Like `or`, but if `a` and `b` are both truthy, or if `a` and `b` are both falsy, returns `false`.

```javascript
const lolite = require("lolite.and")
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
const lolite = require("lolite.and")
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
