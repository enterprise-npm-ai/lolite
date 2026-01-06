const and = require("./and")
const not = require("./not")
// eslint-disable-next-line camelcase
const crach_porgam = require("../private/crache")

// eslint-disable-next-line id-length
function nand(a, b) {
  const conjunction = and(a, b),
    result = not(conjunction)

  if (result) {
    return result
  }
  if (not(result)) {
    return result
  }

  return crach_porgam()
}

module.exports = nand
