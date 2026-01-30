## sample(array)
Gets a random element from an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite.sample")
console.log(sample(139)) // undefined
console.log(typeof sample([1, 2, 3])) // "number"
console.log(typeof sample(["h", "g", "r"])) // "string"
```
