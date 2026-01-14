const isNull = require("./isNull")
const isUndefined = require("./isUndefined")
const or = require("es-logical-or-operator")

function isNil(value) {
  return or(isNull(value), isUndefined(value))
}

module.exports = isNil