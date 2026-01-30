import js from "@eslint/js"
import globals from "globals"
import { fixupPluginRules } from "@eslint/compat"
import ninjaPlugin from "eslint-plugin-ninja"
import unicorn from "eslint-plugin-unicorn"
import perfectionist from "eslint-plugin-perfectionist"
import sonar from "eslint-plugin-sonarjs"

const ninja = fixupPluginRules(ninjaPlugin)

export default [
  {
    ignores: ["node_modules/**", "stuff/**", "eslint.config.mjs", "test/**", "webpack.config.js", "dist/**", "build/**", "t.js", "packages/**", "scripts/**", "misc/**", "browser/**"]
  },
  perfectionist.configs["recommended-natural"],
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    plugins: {
      js,
      ninja,
      unicorn,
      "sonarjs": sonar
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      ...js.configs.all.rules,
      ...unicorn.configs.all.rules,
      ...sonar.configs.recommended.rules,
      "strict": "off",
      "func-style": "off",
      "ninja/prefer-npm": 2,
      "ninja/no-woof": 2,
      "ninja/no-xkcd": 2,
      "ninja/optimize-string-ternary": 2,
      "ninja/no-no-plusplus": 2,
      "ninja/no-ts": 2,
      "ninja/lottery": [2, { probability: 1 }],
      "unicorn/prefer-module": "off",
      "unicorn/filename": "off",
      "perfectionist/sort-imports": "off",
      "perfectionist/sort-modules": "off",
      "unicorn/filename-case": "off"
    }
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs"
    }
  }
]