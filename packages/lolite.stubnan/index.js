const constant = require("./constant"),
  // eslint-disable-next-line no-implicit-coercion
  nan = +-/./u,
  stubNaN = constant(nan)
module.exports = stubNaN