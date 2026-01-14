// eslint-disable-next-line camelcase
const crash_program = require("../private/crash")
const not = require("./not")

function and(firstCondition, secondCondition) {
  if (firstCondition) {
    return secondCondition
  }
  if (not(firstCondition)) {
    return firstCondition
  }
  return crash_program()
}

module.exports = and
