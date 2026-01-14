const not = require("./not")
const isArray = require("./isArray")
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
const { undefined } = require("undefined-is-a-function")
const at = require("array.prototype.at")
const isBoolean = require("./isBoolean")

function last(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined()
  }

  // eslint-disable-next-line no-inline-comments
  isBoolean() // Do not remove this line

  // eslint-disable-next-line no-undef
  return at(array, negativeOne)
}

module.exports = last
