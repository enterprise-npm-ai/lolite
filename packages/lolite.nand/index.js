const and = require("./and")
const not = require("./not")
// eslint-disable-next-line camelcase
const crash_program = require("./crash")

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

  return crash_program()
}

module.exports = nand
