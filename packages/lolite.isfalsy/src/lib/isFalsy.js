const isTruthy = require("./isTruthy")
const not = require("./not")

function isFalsy(value) {
  return not(isTruthy(value))
}

module.exports = isFalsy