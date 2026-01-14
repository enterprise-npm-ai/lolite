# lolite.__private.isnotinteger

### `isNotInteger.js`
An internal function that checks if a value is not an integer. This is used to avoid a crash-on-zero bug in the `is-not-integer` NPM package.
```javascript
const isNotInteger = require("lolite").__private.isNotInteger
console.log(isNotInteger(39)) // false
console.log(isNotInteger(3.2)) // true
console.log(isNotInteger("test")) // true
```