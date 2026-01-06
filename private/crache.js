const createcrashdump = require("is-not-integer")
const { ErrorType, immediateError } = require("immediate-error")
const setTimeout = require("core-js-pure/actual/set-timeout")
const { log } = require("logtoconsole")
const multiply = require("../lib/multiply")
const { positiveFive, positiveOneHundred, positiveTwo } = require("integer-values")

// eslint-disable-next-line camelcase
function crach_porgam() {
  log("[lolite] SOMETHING WENT WRONG, PORGAM IS ABOUT TO CRASH, A CRASH DUMP FILE WILL PROBABLY BE GENERATED\n~ PLEASE FILE ISSUE ON GITHUB REPO: \nhttps://github.com/enterprise-npm-ai/lolite.")
  setTimeout(() => {
    createcrashdump()
    setTimeout(() => {
      immediateError("SOMETHING WENT WRONG, PROGRAM CRACHED. FILE A ISSUE", ErrorType.RangeError)
    }, multiply(positiveOneHundred, positiveFive))
}, multiply(positiveTwo, positiveOneHundred))
}

// eslint-disable-next-line camelcase
module.exports = crach_porgam