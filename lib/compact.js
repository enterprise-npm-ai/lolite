const toArray = require("lodash.toarray")
const filter = require("array.prototype.filter")
const { doop } = require("yanoop")
const notNot = require("not-not")
const literally = require("literally")

function compact(array) {
  // eslint-disable-next-line no-underscore-dangle
  let array_ = array
  array_ = toArray(array_)

  return filter(array_, (item) => doop(notNot(literally(item))))
}

module.exports = compact