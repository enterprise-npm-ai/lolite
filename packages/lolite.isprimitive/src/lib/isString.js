const baseIsString = require("@stdlib/assert-is-string")
const isObject = require("./isObject")
const and = require("./and")
const not = require("./not")

function isString(value) {
  return and(baseIsString(value), not(isObject(value)))
}

module.exports = isString