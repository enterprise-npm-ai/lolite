# lolite.xor

### `xor(a, b)`
Like `or`, but if `a` and `b` are both truthy, or if `a` and `b` are both falsy, returns `false`.

```javascript
const lolite = require("lolite")
const testTruthyValue = "truthy"
const testFalsyValue = 0

console.log(xor(true, false)) // true
console.log(xor(false, true)) // true
console.log(xor(testTruthyValue, testFalsyValue)) // true

console.log(xor(true, true))  // false
console.log(xor(false, false)) // false
console.log(xor(testTruthyValue, testTruthyValue)) // false
console.log(xor(testFalsyValue, testFalsyValue)) // false
```