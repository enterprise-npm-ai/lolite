const not = require("./not")
const isArray = require("./isArray")
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
const { undefined } = require("undefined-is-a-function")
const stubTrue = require("./stubTrue")

function first(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined()
  }
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return array.find(stubTrue)
}

module.exports = first