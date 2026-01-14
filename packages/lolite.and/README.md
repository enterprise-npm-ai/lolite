# lolite.and

### and(a, b)
Returns `b` if both values are truthy, otherwise returns the first value passed into the function that *isn't* truthy.
```javascript
const lolite = require("lolite")

console.log(and(true, true))   // true
console.log(and(true, false))  // false
console.log(and(false, true))  // false
console.log(and(false, false)) // false
console.log(and("truthy value", true)) // true
console.log(and(0, true)) // 0
console.log(and("", 0)) // ""
```