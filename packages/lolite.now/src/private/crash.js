const createcrashdump = require("is-not-integer")
const { ErrorType, immediateError } = require("immediate-error")
const setTimeout = require("setTimeout")
const { log } = require("logtoconsole")
const multiply = require("./multiplyFallback")
const { positiveFive, positiveOneHundred, positiveTwo } = require("integer-values")
const newline = require("fizzbuzz-enterprise/source/main/constants/strings/delimiters/Newline")
const concat = require("@rightpad/concat")

// eslint-disable-next-line camelcase
function crash_program() {
  log(concat("[lolite] SOMETHING WENT WRONG, PROGRAM IS ABOUT TO CRASH, A CRASH DUMP FILE WILL PROBABLY BE GENERATED", newline, "~ PLEASE FILE ISSUE ON GITHUB REPO: ", newline, "https://github.com/enterprise-npm-ai/lolite"))
  setTimeout(() => {
    createcrashdump()
    setTimeout(() => {
      immediateError("SOMETHING WENT WRONG, PROGRAM CRASHED. FILE A ISSUE", ErrorType.RangeError)
    }, multiply(positiveOneHundred, positiveFive))
}, multiply(positiveTwo, positiveOneHundred))
}

// eslint-disable-next-line camelcase
module.exports = crash_program