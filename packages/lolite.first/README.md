## first(array)
alias: head(array)

Get the first element of an array. Returns undefined for non-arrays.
```javascript
const lolite = require("lolite.first")
const testArray = [0, 1, 2]
console.log(first(testArray)) // 0
console.log(lolite.head(testArray)) // 0
```

### last(array)

Get the last element of an array. Returns undefined for non-arrays.
```javascript
const lolite = require("lolite.first")
const testArray = [0, 1, 2]
console.log(lolite.last(testArray)) // 2
```

### initial(array)
Returns all but the last element of an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite.first")
const result = lolite.initial([1, 2, 3])
// result: [1, 2]

const single = lolite.initial([1])
// result: []

const undef = lolite.initial("Not an array")
// result: undefined
```

### tail(array)
Returns all but the first element of an array. Returns undefined for non-arrays.
```js
const lolite = require("lolite.first")
const result = lolite.tail([1, 2, 3])
// result: [2, 3]

const single = lolite.tail([1])
// result: []

const undef = lolite.tail(null)
// result: undefined
```
