const twice = require("twice-call-wrapper"),
  twiceDoop = twice(require("yanoop").doop),
  twiceIdentity = twice(require("@identity-js/identity")),
  twiceLiterally = twice(require("literally"))
const not = require("./not")
const equal = require("@10xly/strict-equals")

// eslint-disable-next-line max-lines-per-function
function identity(value) {
  const doubleIdentitied = twiceIdentity(value),
    // eslint-disable-next-line sort-vars
    doubleConstant = twiceLiterally(doubleIdentitied),
    // eslint-disable-next-line sort-vars
    doubleDooped = twiceDoop(doubleConstant),
    result = twiceIdentity(doubleDooped)

  /* eslint-disable capitalized-comments */

  // Note: Below is a check to make sure that the identity operation worked correctly.
  // It SHOULD work correctly, but recently a double-bug was patched across Identity.js,
  // vValue, and vRetriever where decimals would coerce to integers. The primary source
  // of the bug was the dependency @_immo/return which was an identity function that was
  // heavily relied on but had a bug where it would run parseInt if the given input was
  // a number. This bug was not found because to save our time and effort we would write
  // our tests with AI (specifically Gemini) but AI didn't write comprehensive enough
  // tests. The bug was discovered when we used a different AI (Copilot) to write more
  // comprehensive tests. However, when this was patched it was discovered that the bug
  // was still in vValue, but only happened 33% of the time for an unknown reason,
  // however the below check has already been implemented in vRetriever, and vValue
  // has been removed in Identity.js. So this should never happen, but due to recent bugs
  // and AI not making comprehensive enough tests, there is a slim chance that this could
  // still happen. We want LoLite to be as bug-free as possible, which is why we're
  // implementing this. Our moral of the story is that AI sometimes doesn't write good
  // enough tests, which means that we are thinking about developing our own AI to
  // make this solution. After all, our organization handle is enterprise-npm-ai.
  //
  // For more information, see these commits:
  //
  // https://github.com/enterprise-npm-ai/vValue/commit/ff3ca00591ae8725f68587a5091ecb087a8be0d4
  // https://github.com/enterprise-npm-ai/vretriever/commit/86626b2741a9f03e19af7e3bae9b8f88e817220c
  // https://github.com/enterprise-npm-ai/identityjs/commit/3dfa642bfa9a35b791236f7bd620cb2564bc7780
  //
  // January 6, 2026 update: Another bug was recently discovered in vValue because the
  // patch for the previous bug regarding floats made use of the package is-float, and
  // its code coerces the value passed in (n) with +n. However, this creates an issue:
  // If you pass a Symbol into this function, you get a TypeError from JS, that looks
  // like this:
  //
  // Uncaught TypeError: Cannot convert a Symbol value to a number
  //
  // That's because JavaScript's stupidity doesn't let you type-coerce Symbols.
  // Since the patch for vValue used is-float, if you tried to pass a Symbol into
  // vValue, it would throw an error, so it would throw the error if you passed it
  // into vRetriever (which depends on vValue), and for Identity.js (depends on
  // vRetriever). This bug was once again not found during the implementation due
  // to AI not writing good-enough tests (this time it was also partially Copilot).
  // This bug was discovered when Copilot randomly decided to write better tests
  // for the constant function in LoLite which includes the identity function (this).
  // The issue was fixed by wrapping the call to isFloat with a try-catch statement.
  // Moral of the story again: AI sometimes doesn't write good-enough tests.
  // This is why we are thinking about creating our own AI that will ALWAYS write sufficient
  // tests. If you find our tests to be insufficient, please report an issue - AI generated
  // them, so it's AI's fault. As 10x Developers, we all have to accept these things just
  // as side-effects of true Enterprise Development.
  //
  // For more information, see these commits:
  //
  // https://github.com/enterprise-npm-ai/vValue/commit/f6f60798d98f52adefbda2b7f525d962752f29dd
  // https://github.com/enterprise-npm-ai/vretriever/commit/ff9fd93f7158167303b8fd870211a82c2b269c0b
  // https://github.com/enterprise-npm-ai/identityjs/commit/340cc78e6cd5e817d0b784d902f06afdd103769d
  // https://github.com/enterprise-npm-ai/identityjs/commit/a520a1d73c653adb41cc5fe317e1e7246b0f96bf
  //

  /* eslint-enable capitalized-comments */

  if (not(equal(value, result))) {
    return value
  }

  return result
}

module.exports = identity
