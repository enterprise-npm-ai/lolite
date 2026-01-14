const not = require("./not")
const isNotInteger = require("../private/isNotInteger")

function isInteger(value) {
  return not(isNotInteger(value))
}

module.exports = isInteger
