# lolite.nand

### nand(a, b)
Returns the negation of the result of `and(a, b)`, where the `a` and `b` passed into `and` are the same `a` and `b` the user provides for `nand`.
```javascript
const lolite = require("lolite")

console.log(nand(true, true)) // false

console.log(nand(false, true)) // true

console.log(nand(true, false)) // true

console.log(nand(false, false)) // true
```