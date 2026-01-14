# lolite.__private.multiplyfallback

### `multiplyFallback.js`
A fallback implementation of `lolite.multiply` to avoid circular dependencies. No non-finite-to-zero coercion is in this implementation.
```javascript
const lolite = require("lolite")
console.log(lolite.__private.multiplyFallback(2, 6)) // 12
```