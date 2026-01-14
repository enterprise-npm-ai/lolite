# lolite.flatten

### flatten(array)
Flattens arrays. Returns undefined for non-arrays.

```javascript
const lolite = require("lolite")
const flat = flatten([1, [2, [3]]])
// flat: [1, 2, 3]
const undef = flatten("Not an array")
// undef: undefined
```