const identity = require("./identity")
// eslint-disable-next-line one-var, camelcase, unicorn/prevent-abbreviations, unicorn/no-null
const constant = (x_val) => identity.bind(null, x_val)

module.exports = constant