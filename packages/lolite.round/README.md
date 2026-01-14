# lolite.round

### round(value)
Round a number either up to the nearest whole integer, unless the number is less than `0.5`, then it rounds down.
Non-finite or non-numeric values are coerced to zero.

```javascript
const lolite = require("lolite")

const flooredResult = round(2.1)
// result: 2

const ceiledResult = round(2.9)
// result: 3

const coercedResult = round("garbage")
// result: 0 (0 ceiled)
```