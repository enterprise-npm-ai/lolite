/* eslint-disable ninja/no-ts */
// ESLint Ninja thinks this is a TypeScript file, as "Arguments" has TS in it, so we have to disable no-ts.
const extractTag = require("extract-stringtag")
const uncurried = require("uncurried-intrinsics"),
  // eslint-disable-next-line sort-vars
  $toString = uncurried("Object.prototype.toString")

const { OBJECT_STRING_TAG } = require("@extremejs/utils")
const equal = require("@10xly/strict-equals")

module.exports = function isArguments(value) {
  const tag = extractTag($toString(value))
  return equal(tag, OBJECT_STRING_TAG.ARGUMENTS)
}
