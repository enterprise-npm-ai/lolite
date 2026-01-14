### `invertFallback.js`
A fallback implementation of `lolite.invert` to avoid circular dependencies. No non-finite-to-zero coercion is in this implementation.
```javascript
const invert = require("lolite.__private.invertfallback")
console.log(invert(1)) // -1
console.log(invert(-1)) // 1
console.log(invert("hi")) // "hi" (normal lolite.invert would return -0)
```
