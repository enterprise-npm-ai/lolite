# lolite.first

### first(array)
alias: head(array)

Get the first element of an array. Returns undefined for non-arrays.
```javascript
const lolite = require("lolite")
const testArray = [0, 1, 2]
console.log(first(testArray)) // 0
console.log(lolite.head(testArray)) // 0
```