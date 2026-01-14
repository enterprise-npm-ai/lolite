## isNil(value)
Check if a value is null or undefined.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isNil(null))
assert.ok(lolite.isNil(undefined))
assert.ok(lolite.isNil()) // if you pass nothing into a function, JS coerces to undefined
assert.ok(!lolite.isNil("anything else"))
```

### isBoolean(value)
Check if a value is a boolean primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isBoolean(true))
assert.ok(lolite.isBoolean(false))
assert.ok(!lolite.isBoolean(new Boolean())) // this is a boolean object, not a boolean primitive
assert.ok(!"anything else")
```

### isNumber(value)
Check if a value is a number primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isNumber(2))
assert.ok(lolite.isNumber(54))
assert.ok(lolite.isNumber(-49))
assert.ok(lolite.isNumber(0))
assert.ok(lolite.isNumber(-0))
assert.ok(lolite.isNumber(NaN))
assert.ok(lolite.isNumber(Infinity))
assert.ok(lolite.isNumber(-Infinity))
assert.ok(!lolite.isNumber(new Number(42)))
assert.ok(!lolite.isNumber(Object(3)))
assert.ok(!lolite.isNumber("67"))
assert.ok(!lolite.isNumber("anything else"))
```

### isBigInt(value)
Check if a value is a bigint primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isBigInt(20n))
assert.ok(lolite.isBigInt(-2093280n))
assert.ok(!lolite.isBigInt(Object(3n)))
assert.ok(!lolite.isBigInt("anything else"))
```

### isString(value)
Check if a value is a string primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isString("test"))
assert.ok(lolite.isString(""))
assert.ok(!lolite.isString(Object("test")))
assert.ok(!lolite.isString(new String("test")))
assert.ok(!lolite.isString(/anything else that isn't a string/))
```

### isSymbol(value)
Check if a value is a symbol primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isSymbol(Symbol("test")))
assert.ok(lolite.isSymbol(Symbol.iterator))
assert.ok(!lolite.isSymbol(Object(Symbol("test"))))
assert.ok(!lolite.isSymbol("not a symbol"))
```

### isPrimitive(value)
Check if a value is a JavaScript primitive. LoLite validates the seven core primitives: string, number, bigint, boolean, symbol, null, and undefined.

```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isPrimitive("enterprise"))
assert.ok(lolite.isPrimitive(42))
assert.ok(lolite.isPrimitive(10n))
assert.ok(lolite.isPrimitive(true))
assert.ok(lolite.isPrimitive(Symbol("lolite")))
assert.ok(lolite.isPrimitive(null))
assert.ok(lolite.isPrimitive(undefined))

assert.ok(!lolite.isPrimitive({}))
assert.ok(!lolite.isPrimitive([]))
assert.ok(!lolite.isPrimitive(() => {}))
assert.ok(!lolite.isPrimitive(new String("I am an object now")))
```

### isObject(value)
Check if a value is an object or null. Returns false for functions.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isObject({}))
assert.ok(lolite.isObject(new Object()))
assert.ok(lolite.isObject(lolite))
assert.ok(lolite.isObject({ e: 1 }))
assert.ok(lolite.isObject(null))
assert.ok(lolite.isObject(Object("hi")))
assert.ok(!lolite.isObject(() => {}))
assert.ok(!lolite.isObject("hi"))
assert.ok(!lolite.isObject(63))
```

### isFunction(value)
Check if a value is a function.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isFunction(function() {}))
assert.ok(lolite.isFunction(function*() {}))
assert.ok(lolite.isFunction(async function() {}))
assert.ok(lolite.isFunction(async function*() {}))
assert.ok(lolite.isFunction(() => {}))
assert.ok(lolite.isFunction(async () => {}))
assert.ok(!lolite.isFunction("anything else"))
```

### isArray(value)
Check if a value is an array.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isArray([]))
assert.ok(lolite.isArray([1, 2, 3]))
assert.ok(lolite.isArray(new Array(10)))
assert.ok(!lolite.isArray({ length: 1, 0: "fake" }))
assert.ok(!lolite.isArray("not an array"))
```

### isMap(value)
Check if a value is a Map.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isMap(new Map()))
assert.ok(!lolite.isMap(new WeakMap()))
assert.ok(!lolite.isMap({}))
```

### isWeakMap(value)
Check if a value is a WeakMap.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isWeakMap(new WeakMap()))
assert.ok(!lolite.isWeakMap(new Map()))
assert.ok(!lolite.isWeakMap(null))
```

### isSet(value)
Check if a value is a Set.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isSet(new Set()))
assert.ok(!lolite.isSet(new WeakSet()))
assert.ok(!lolite.isSet([]))
```

### isWeakSet(value)
Check if a value is a WeakSet.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isWeakSet(new WeakSet()))
assert.ok(!lolite.isWeakSet(new Set()))
assert.ok(!lolite.isWeakSet(undefined))
```

### isPlainObject(value)
Check if a value is a plain object.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isPlainObject({}))
assert.ok(lolite.isPlainObject(Object.create(null)))
assert.ok(!lolite.isPlainObject([]))
assert.ok(!lolite.isPlainObject(null))
```

### isNonNullObject(value)
Check if a value is an object that isn't null.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isNonNullObject({}))
assert.ok(lolite.isNonNullObject([]))
assert.ok(!lolite.isNonNullObject(null))
assert.ok(!lolite.isNonNullObject(42))
```

### isNaN(value)
Check if a value is NaN.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isNaN(NaN))
assert.ok(!lolite.isNaN("anything else"))
```

### isFinite(value)
Check if a value is a finite number primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isFinite(342))
assert.ok(lolite.isFinite(-230))
assert.ok(!lolite.isFinite(Infinity))
assert.ok(!lolite.isFinite(new Number(10)))
assert.ok(!lolite.isFinite("test"))
```

### isInteger(value)
Check if a value is an integer primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isInteger(42))
assert.ok(lolite.isInteger(-42))
assert.ok(lolite.isInteger(0))
assert.ok(lolite.isInteger(-0))

assert.ok(!lolite.isInteger(3.14))        // decimals are not integers
assert.ok(!lolite.isInteger(-2.5))        // still not integers
assert.ok(!lolite.isInteger(Infinity))    // too big to be finite
assert.ok(!lolite.isInteger(NaN))         // not a number, ironically
assert.ok(!lolite.isInteger(new Number(5))) // boxed numbers are impostors
assert.ok(!lolite.isInteger("42"))        // strings are not integers
assert.ok(!lolite.isInteger(null))        // null is not an integer
assert.ok(!lolite.isInteger(undefined))   // undefined is not an integer
```

### isSafeInteger(value)
Check if a value is a safe integer primitive.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

assert.ok(lolite.isSafeInteger(42))
assert.ok(lolite.isSafeInteger(Number.MAX_SAFE_INTEGER))
assert.ok(lolite.isSafeInteger(Number.MIN_SAFE_INTEGER))

assert.ok(!lolite.isSafeInteger(Math.pow(2, 53))) // Out of bounds
assert.ok(!lolite.isSafeInteger(3.14))            // Not an integer
assert.ok(!lolite.isSafeInteger(Infinity))        // Not finite
assert.ok(!lolite.isSafeInteger("42"))            // String primitive
assert.ok(!lolite.isSafeInteger(42n))             // BigInt is not a Number primitive
```

### isArguments(value)
Check if a value is an `arguments` object.
```javascript
const lolite = require("lolite.isnil")
const assert = require("node:assert")

(function () {
  assert.ok(lolite.isArguments(arguments))
})()

assert.ok(
  lolite.isArguments((function () { return arguments })(1, 2, 3))
)

assert.ok(!lolite.isArguments([]))                        // arrays are not arguments
assert.ok(!lolite.isArguments({}))                        // plain objects are not arguments
assert.ok(!lolite.isArguments({ length: 2, 0: "fake" }))  // array-like ≠ arguments
assert.ok(!lolite.isArguments({ callee: () => {}, length: 1 })) // nice try
assert.ok(!lolite.isArguments("not arguments"))           // strings are not arguments
assert.ok(!lolite.isArguments(42))                        // numbers are not arguments
assert.ok(!lolite.isArguments(null))                      // null is not arguments
assert.ok(!lolite.isArguments(undefined))                 // undefined is not arguments
assert.ok(!lolite.isArguments(() => {}))                  // functions are not arguments
```
