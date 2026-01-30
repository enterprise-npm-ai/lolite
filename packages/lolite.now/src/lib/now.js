require("function.prototype.exec")

const construct = require("construct-new-second")
const getFunctionName = require("name-of-function")
const globalObj = require("@10xly/global")
const DateCtr = require("../private/date")
const isNil = require("./isNil")
const not = require("./not")
const and = require("./and")
const isFunction = require("./isFunction")

// eslint-disable-next-line one-var
const stringDate = getFunctionName(DateCtr)

// eslint-disable-next-line one-var
const $Date = globalObj[stringDate]

function now() {
  if (and(not(isNil(DateCtr.now)), isFunction(DateCtr.now))) {
    return DateCtr.now.exec()
  }
  const myDate = construct($Date)

  return myDate.getTime()
}

module.exports = now