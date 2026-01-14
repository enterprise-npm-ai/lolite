const functionsHaveNames = require("functions-have-names")()
const capitalizeFirstLetter = require("capitalize")
const concat = require("@rightpad/concat")
const toString = require("to-str")
const identity = require("./identity")

function constant(value) {
  // eslint-disable-next-line func-names
  const result = function() {
    return identity(value)
  }
  if (functionsHaveNames) {
    result.name = concat("resolve", capitalizeFirstLetter(toString(result)))
  }
  return result
}

module.exports = constant