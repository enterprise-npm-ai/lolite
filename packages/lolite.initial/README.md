# lolite.initial

### initial(array)
Returns all but the last element of an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite")
const result = initial([1, 2, 3])
// result: [1, 2]

const single = initial([1])
// result: []

const undef = initial("Not an array")
// result: undefined
```