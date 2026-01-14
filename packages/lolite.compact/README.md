## compact(array)
Cleanses an array of all falsy values. Returns undefined for non-arrays.

```javascript
const lolite = require("lolite.compact")
const result = compact([1, 0, false, "hello"])
// result: [1, "hello"]
const undef = compact("Not an array")
// undef: undefined
```
