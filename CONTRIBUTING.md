# Contributing to LoLite

## Pull Request Process
1. There should be no ESLint errors.
2. All tests must pass
3. TypeScript Definitions and documentation must be up-to-date.
4. Version number should be updated so that we can push to NPM.
5. Run `npm run build` to build the project with Webpack.
6. Code must never use any numbers, booleans true and false, directly, and you must maximize things that use NPM packages and not native JS things. Exceptions include if-else statements, and try-catch statements, but you can use npm package alternatives for them too if you want.