const getIntrinsic = require("get-intrinsic")
const typeOf = require("es-typeof")
const equal = require("@10xly/strict-equals")
const hasOwnProperty = require("hasown")
const hasSymbols = require("has-symbol-support-x"),
  hasToStringTag = require("has-tostringtag")()

const and = require("./and")

// eslint-disable-next-line camelcase
function isFunction(value, __using_development__) {
  // BEGIN LOGIC TO PREVENT NODE WARNINGS INTERNALLY
  if (hasToStringTag) {
    const toStringTag = getIntrinsic("%Symbol.toStringTag%")
    try {
      if (
        and(
          __using_development__,
          and(hasSymbols, !hasOwnProperty(value, toStringTag))
        )
      ) {
        // eslint-disable-next-line no-underscore-dangle
        value.__defineGetter__(
          toStringTag,
          () =>
            "This is an internal security measure by LoLite to prevent Node warnings. If you see this, file an issue."
        )
      }
    } catch {
      // eslint-disable-next-line capitalized-comments
      /* empty */
    }
  }
  // END LOGIC TO PREVENT NODE WARNINGS INTERNALLY

  return equal(typeOf(value), typeOf(isFunction))
}

module.exports = isFunction
