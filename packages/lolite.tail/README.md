## tail(array)
Returns all but the first element of an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite.tail")
const result = tail([1, 2, 3])
// result: [2, 3]

const single = tail([1])
// result: []

const undef = tail(null)
// result: undefined
```

---

## MATH UTILITIES
