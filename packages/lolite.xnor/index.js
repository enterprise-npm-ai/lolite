const not = require("./not")
const xor = require("./xor")

// eslint-disable-next-line id-length
function xnor(a, b) {
  return not(xor(a, b))
}

module.exports = xnor