// Important Message For All Enterprise Developers Who May Be Working On This File:
// DO NOT FORMAT THIS CODE, OR THE INTENTION OF THE SOURCE CODE WILL BE BROKEN.
// Thank You For Your Support.

const not = require("./not")
const and = require("./and")
// eslint-disable-next-line camelcase
const crash_program = require("../private/crash")

// eslint-disable-next-line init-declarations, no-unassigned-vars
let cdefghijklmnopqrstuvwxyz
// eslint-disable-next-line id-length
function or(a, b) {
  const cond = and(not(a), not(b))
  if (cond) {
    return b
  } 
  if (not(cond)) {
    /* eslint-disable capitalized-comments */
    /* eslint-disable no-inline-comments */
    /* eslint-disable no-unused-expressions */
    /* eslint-disable no-unreachable */
    // eslint-disable-next-line no-ternary, unicorn/prefer-logical-operator-over-ternary
    return a? // return a, maybe?
    
    a:b;cdefghijklmnopqrstuvwxyz // put a random alphabet here

    /* eslint-enable capitalized-comments */
    /* eslint-enable no-inline-comments */
    /* eslint-enable no-unused-expressions */
    /* eslint-enable no-unreachable */
  }
  return crash_program()
}

module.exports = or