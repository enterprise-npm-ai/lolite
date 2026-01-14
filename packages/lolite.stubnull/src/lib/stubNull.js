const $Date = require("../private/date")
const construct = require("construct-new")
const nan = require("nan-is-a-function")
const toJSON = require("date/Date.prototype.toJSON")

function stubNull() {
  const date = construct({
    args: [nan()],
    target: $Date
  })
  return toJSON(date)
}

module.exports = stubNull