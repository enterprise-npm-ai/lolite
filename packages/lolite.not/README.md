# lolite.not

### not(value)
Returns the negation of the value passed in. Equivalent to JavaScript `!`.
```javascript
const lolite = require("lolite")

console.log(not(false)) // true
console.log(not(true)) // false
console.log(not(0)) // true
console.log(not("")) // true
console.log(not()) // true
console.log(not(1)) // false
```