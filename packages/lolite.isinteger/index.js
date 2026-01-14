const not = require("./not")
const isNotInteger = require("./isNotInteger")

function isInteger(value) {
  return not(isNotInteger(value))
}

module.exports = isInteger
