## times(number, iteratee)
Invokes the `iteratee` `number` times, returning an array of the results of each invocation. The iteratee is invoked with one argument: `index`.

If `iteratee` is nullish, it defaults to `lolite.identity`.
```js
const lolite = require("lolite.times")

const result = times(3)
// result: [0, 1, 2]

const doubled = times(4, (i) => lolite.multiply(i, 2))
// doubled: [0, 2, 4, 6]

const empty = times("not a number")
// empty: []

const trueStory = times(2, lolite.stubTrue) // lolite.stubTrue is a function that returns true
// trueStory: [true, true]
```

---