const from = require("array.from")
const nullishCoalescing = require("es-logical-nullish-coalescing-operator")
const identity = require("./identity")
const map = require("array.prototype.map")

function times(number, iteratee) {
  const iteratee2 = nullishCoalescing(iteratee, identity)

  return map(from({ length: number }), (__, index) => iteratee2(index))
}

module.exports = times