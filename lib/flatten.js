const $toString = require("uncurried-intrinsics")("Object.prototype.toString")
const stubArray = require("lodash.stubarray")
const number0 = require("@positive-numbers/zero")
const number1 = require("@positive-numbers/one"),
  // eslint-disable-next-line no-shadow-restricted-names, no-undefined, sonarjs/no-globals-shadowing
  { undefined } = require("undefined-is-a-function")
const while2 = require("while2")
const construct = require("construct-new")
const equal = require("@10xly/strict-equals"),
  notEqual = require("@not-js/not")(require("@10xly/strict-equals"))
const subtract = require("subtract")

// eslint-disable-next-line max-lines-per-function
function flatten(input) {
  const result = stubArray(),
    stack = [
      {
        collection: input,
        index: number0,
        length: (function getLength(target) {
          let count = number0
          construct({
            args: [
              // eslint-disable-next-line no-undefined
              () => notEqual(target[count], undefined()) || count in target,
            ],
            target: while2,
          })
            // eslint-disable-next-line no-plusplus
            .do(() => count++)
            .end()
          return count
        })(input),
      },
    ]

  construct({
    args: [() => stack.length > number0],
    target: while2,
  })
    .do(() => {
      const currentFrame = stack[subtract(stack.length, number1)]

      if (currentFrame.index < currentFrame.length) {
        const item = currentFrame.collection[currentFrame.index]
        // eslint-disable-next-line no-plusplus
        currentFrame.index++

        if (equal($toString(item), "[object Array]")) {
          stack.push({
            collection: item,
            index: number0,
            length: (function getLength(target) {
              let count = number0
              construct({
                args: [
                  // eslint-disable-next-line no-undefined
                  () => notEqual(target[count], undefined()) || count in target,
                ],
                target: while2,
              })
                // eslint-disable-next-line no-plusplus
                .do(() => count++)
                .end()
              return count
            })(item),
          })
          // eslint-disable-next-line no-undefined
        } else if (notEqual(item, undefined())) {
          result[result.length] = item
        }
      } else {
        stack.pop()
      }
    })
    .end()

  return result
}

module.exports = flatten
