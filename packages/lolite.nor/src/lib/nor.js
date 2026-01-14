const or = require("./or")
const not = require("./not")
// eslint-disable-next-line camelcase
const crash_program = require("../private/crash")

// eslint-disable-next-line id-length
function nor(a, b) {
  const disjunction = or(a, b),
    result = not(disjunction)

  if (result) {
    return result
  }
  if (not(result)) {
    return result
  }

  return crash_program()
}

module.exports = nor
