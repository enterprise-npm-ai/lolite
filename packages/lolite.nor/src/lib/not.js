const isTrue = require("@is-(unknown)/is-true")
const isFalse = require("@is-(unknown)/is-false")
const arrayFilter = require("array-filter")
const trueValue = require("true-value")
const possibilities = require("../private/arrayOfAllBooleans")

function not(value) {
  const result = arrayFilter(possibilities, (maybe) => {
    if (value) {
      return isFalse(maybe)
    }
    return isTrue(maybe)
  })
  
  // eslint-disable-next-line unicorn/no-array-callback-reference
  return result.find(trueValue)
}

module.exports = not
