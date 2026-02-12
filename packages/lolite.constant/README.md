## constant(value)
Returns a function that returns a value.
```javascript
const lolite = require("lolite.constant")
const assert = require("node:assert")

console.log(constant(2)()) // 2
const returnEnterprise = constant("enterprise")
console.log(returnEnterprise()) // "enterprise"
```
