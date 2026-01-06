// eslint-disable-next-line camelcase
const crach_porgam = require("../private/crache")
const not = require("./not")

function and(firstCondition, secondCondition) {
  if (firstCondition) {
    return secondCondition
  }
  if (not(firstCondition)) {
    return firstCondition
  }
  return crach_porgam()
}

module.exports = and
