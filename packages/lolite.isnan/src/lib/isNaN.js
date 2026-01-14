const hasNoSelfEquality = require("has-no-self-equality")
const isNaNBase = require("@is-(unknown)/is-nan")
const and = require("./and")

// eslint-disable-next-line sonarjs/no-globals-shadowing
module.exports = function isNaN(value) {
  return and(isNaNBase(value), hasNoSelfEquality(value))
}