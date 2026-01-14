const isNumber = require("./isNumber")
const and = require("./and")
const baseIsFinite = require("@is-(unknown)/is-finite")

// eslint-disable-next-line sonarjs/no-globals-shadowing
function isFinite(value) {
  return and(isNumber(value), baseIsFinite(value))
}

module.exports = isFinite