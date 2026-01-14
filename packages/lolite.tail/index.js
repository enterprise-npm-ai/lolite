const not = require("./not")
const isArray = require("./isArray")
// eslint-disable-next-line sonarjs/no-globals-shadowing, no-shadow-restricted-names, no-undefined
const { undefined } = require("undefined-is-a-function")
const slice = require("array-slice")
const arrayLength = require("@extra-array/length")
const iszero = require("iszero")
const emptyArray = require("lodash.stubarray")
const one = require("@positive-numbers/one")

function tail(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined()
  }

  const length = arrayLength(array)
  if (iszero(length)) {
    return emptyArray()
  }
  
  // eslint-disable-next-line no-undefined
  return slice(array, one, undefined())
}

module.exports = tail