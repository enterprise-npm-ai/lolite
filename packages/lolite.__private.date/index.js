// eslint-disable-next-line no-ternary, camelcase, no-undef
const requireFunction = typeof __webpack_require__ === "function" ? __non_webpack_require__ : require
// eslint-disable-next-line one-var
const $DatePath = requireFunction.resolve("date").replace("index.json", "cache")
// eslint-disable-next-line one-var
const $Date = requireFunction($DatePath)
module.exports = $Date