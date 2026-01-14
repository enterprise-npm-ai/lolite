const isNotIntegerUnsafe = require("is-not-integer")
// eslint-disable-next-line camelcase
const crash_program = require("./crash"),
  isNotIntegerAlternative = require("@not-js/not")(require("is-integer"))

const not = require("es-logical-not-operator")
const notNot = require("not-not")
const { doop } = require("yanoop")
const literally = require("literally")

function isNotInteger(value) {
  if (not(value)) {
    return isNotIntegerAlternative(value)
  } else if (doop(notNot(literally(value)))) {
    return isNotIntegerUnsafe(value)
  }
  return crash_program()
}

module.exports = isNotInteger