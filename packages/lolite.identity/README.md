## identity(value)
Returns the value passed into the identity function.
```javascript
const lolite = require("lolite.identity")
const assert = require("node:assert")

console.log(identity(2)) // 2
console.log(identity()) // undefined
console.log(identity(true)) // true
console.log(identity(null)) // null
console.log(identity("enterprise")) // "enterprise"
```

### constant(value)
Returns a function that returns a value.
```javascript
const lolite = require("lolite.identity")
const assert = require("node:assert")

console.log(lolite.constant(2)()) // 2
const returnEnterprise = lolite.constant("enterprise")
console.log(returnEnterprise()) // "enterprise"
```

### stubUndefined()
Returns the primitive value undefined.
```javascript
const lolite = require("lolite.identity")
console.log(lolite.stubUndefined()) // undefined
```

### stubTrue()
Returns the primitive boolean value true.
```javascript
const lolite = require("lolite.identity")
console.log(lolite.stubTrue()) // true
```

### stubFalse()
Returns the primitive boolean value false.
```javascript
const lolite = require("lolite.identity")
console.log(lolite.stubFalse()) // false
```

### stubNaN()
Returns the primitive value NaN.
```javascript
const lolite = require("lolite.identity")
console.log(lolite.stubNaN()) // NaN
```

### stubNull()
Returns the primitive value null.
```javascript
const lolite = require("lolite.identity")
console.log(lolite.stubNull()) // null
```

# EXTENDED DOCUMENTATION
LoLite contains some private utilities in its code that it uses internally. These are exported under the `__private` key in the default export. You probably don't want to use these, unless you have a really good reason to.

### `arrayOfAllBooleans.js`
This is a file that exports an array that contains true and false.
```javascript
const lolite = require("lolite.identity")

console.log(lolite.__private.arrayOfAllBooleans) // [true, false]
```

### `crash.js`
An internal function that crashes the program. This is used internally in code for cases that should never happen. If LoLite crashes, it is a serious bug and your Node.js could be broken, or the world could be ending.
```javascript
const crash_program = require("lolite.identity").__private.crash
crash_program()
/* The above code will output something like this:

[lolite] SOMETHING WENT WRONG, PORGAM IS ABOUT TO CRASH, A CRASH DUMP FILE WILL PROBABLY BE GENERATED
~ PLEASE FILE ISSUE ON GITHUB REPO:
https://github.com/enterprise-npm-ai/lolite.
Porgam crahed.
*/
```
It will also create a crash dump file with a filename like `crash_3989.bin` in your root project directory, with some stack dump information.
Note: you can also require `lolite/test/crash` and it will immediately crash the program, like this:
```javascript
require("lolite/test/crash") // crashes program
```

### `date.js`
A file that just exports the `Date` constructor.
```javascript
const $Date = require("lolite.identity").__private.date
const assert = require("node:assert")
assert.ok($Date === Date)
```

### `invertFallback.js`
A fallback implementation of `lolite.invert` to avoid circular dependencies. No non-finite-to-zero coercion is in this implementation.
```javascript
const invert = require("lolite.identity").__private.invertFallback
console.log(invert(1)) // -1
console.log(invert(-1)) // 1
console.log(invert("hi")) // "hi" (normal lolite.invert would return -0)
```

### `isNotInteger.js`
An internal function that checks if a value is not an integer. This is used to avoid a crash-on-zero bug in the `is-not-integer` NPM package.
```javascript
const isNotInteger = require("lolite.identity").__private.isNotInteger
console.log(isNotInteger(39)) // false
console.log(isNotInteger(3.2)) // true
console.log(isNotInteger("test")) // true
```

### `multiplyFallback.js`
A fallback implementation of `lolite.multiply` to avoid circular dependencies. No non-finite-to-zero coercion is in this implementation.
```javascript
const lolite = require("lolite.identity")
console.log(lolite.__private.multiplyFallback(2, 6)) // 12
```


### `__using_development__` in `isFunction`
This internal feature is not a private function, it's a hidden argument in the `isFunction` function. The parameter is called `__using_development__`, and if it's on, it defines a getter on the value passed in for `Symbol.toStringTag`. The reason for this is that LoLite internally has a file that requires some other file that ends up requiring the first file. You might think this crashes the program, but it doesn't, because when you do infinite require loop like that Node.js cuts off the loop and makes it so when you require it it just returns an empty object. LoLite checks if the required file is not a function using `isFunction`, and if it is not a function, reassigns it to a fallback. However, the empty object that Node.js returns is actually an object but without any of the Object.prototype properties, so it doesn't have `Symbol.toStringTag` as a property. When it uses `isFunction`, it checks the toStringTag of the value to check if it's a function. This triggers a Node.js warning for accessing non-existent property `Symbol.toStringTag` on object. This is where the `__using_development__` parameter comes in. It stops this Node.js internal warning.