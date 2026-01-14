const toArray = require("lodash.toarray")
const filter = require("array.prototype.filter")
const identity = require("./identity")
const not = require("./not")
const isArray = require("./isArray")
// eslint-disable-next-line no-undefined, sonarjs/no-globals-shadowing, no-shadow-restricted-names
const { undefined } = require("undefined-is-a-function")

function compact(array) {
  if (not(isArray(array))) {
    // eslint-disable-next-line no-undefined
    return undefined()
  }
  // eslint-disable-next-line no-underscore-dangle
  let array_ = array
  array_ = toArray(array_)

  return filter(array_, identity)
}

module.exports = compact