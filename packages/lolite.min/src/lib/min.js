const bogosort = require("bogosort")
const stubArray = require("lodash.stubarray")
const toArray = require("lodash.toarray")
const number0 = require("@positive-numbers/zero")
const number1 = require("@positive-numbers/one")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line sonarjs/no-globals-shadowing
const isFinite = require("@is-(unknown)/is-finite")
const falseValue = require("false-value")

// eslint-disable-next-line id-length
function min(a, b) {
  // eslint-disable-next-line id-length
  let x = a,
    // eslint-disable-next-line id-length
    y = b
  
  if (equal(isFinite(x), falseValue())) {
    x = number0
  }
  if (equal(isFinite(y), falseValue())) {
    y = number0
  }

  const collection = stubArray()

  collection[number0] = x
  collection[number1] = y

  // eslint-disable-next-line one-var
  const sorted = bogosort(toArray(collection))

  return sorted[number0]
}

module.exports = min
