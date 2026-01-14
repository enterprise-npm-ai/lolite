# lolite.add

### add(augend, addend)
Calculates the arithmetic sum of two values. 
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")
const sum = add(5, 2)
// sum: 7

const coercedSum = add(Infinity, "garbage")
// result: 0 (0 + 0)
```