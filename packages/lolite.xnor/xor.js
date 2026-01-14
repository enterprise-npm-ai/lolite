const and = require("./and")
const not = require("./not")
const falseValue = require("false-value")
const equal = require("@10xly/strict-equals")
// eslint-disable-next-line camelcase
const crash_program = require("./crash")

// eslint-disable-next-line id-length
function xor(a, b) {
  const notTrue = falseValue()
  if (and(a, b)) {
    /* Empty */
  } else {
    // eslint-disable-next-line vars-on-top, no-var, sonarjs/block-scoped-var, block-scoped-var
    var maybe = not(equal(not(not(a)), not(not(b)))),
      // eslint-disable-next-line sonarjs/block-scoped-var
      notFalse = not(notTrue)
  }

  // eslint-disable-next-line block-scoped-var
  if (notFalse) {
    // eslint-disable-next-line block-scoped-var
    return maybe
    // eslint-disable-next-line no-else-return
  } else {
    // eslint-disable-next-line no-redeclare, block-scoped-var, no-var, one-var, vars-on-top
    var maybe = notTrue
  }

  // eslint-disable-next-line block-scoped-var
  if (not(notFalse)) {
    // eslint-disable-next-line block-scoped-var
    return maybe
  }
  return crash_program()
}

module.exports = xor
