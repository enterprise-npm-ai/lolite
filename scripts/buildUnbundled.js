#!/usr/bin/env node

const fs = require("fs")
const path = require("path")

/* -------------------------------------------------- */
/* Paths                                              */
/* -------------------------------------------------- */
const ROOT = path.resolve(__dirname, "..")
const BUILDS = path.join(ROOT, "builds")
const UNBUNDLED_DIR = path.join(BUILDS, "unbundled")
const SRC_LOLITE = path.join(ROOT, "src", "lolite.js")

const parentPkg = require(path.join(ROOT, "package.json"))

/* -------------------------------------------------- */
/* Logging helpers                                    */
/* -------------------------------------------------- */
const log = (msg) => console.log(`🔍 ${msg}`)
const step = (msg) => console.log(`📦 ${msg}`)
const done = (msg) => console.log(`✅ ${msg}`)

/* -------------------------------------------------- */
/* Parse src/lolite.js to extract exports             */
/* -------------------------------------------------- */
function parseExports(filepath) {
  const content = fs.readFileSync(filepath, "utf8")
  
  const objectMatch = content.match(/const lolite = \{([\s\S]*?)\}\s*module\.exports/m)
  if (!objectMatch) {
    throw new Error("Could not find lolite object in src/lolite.js")
  }
  
  const objectBody = objectMatch[1]
  const result = {
    privateLevel: {},
    topLevel: {}
  }
  
  // 1. Isolate and parse the __private block
  const privateBlockMatch = objectBody.match(/__private:\s*\{([\s\S]*?)\}/)
  if (privateBlockMatch) {
    const privateBody = privateBlockMatch[1]
    const privateRegex = /(\w+):\s*require\(["']\.\/private\/(\w+)["']\)/g
    let m
    while ((m = privateRegex.exec(privateBody))) {
      result.privateLevel[m[1]] = m[2]
    }
  }

  // 2. Parse top-level exports (only those coming from ./lib/)
  const topLevelRegex = /(\w+):\s*require\(["']\.\/lib\/(\w+)["']\)/g
  let m
  while ((m = topLevelRegex.exec(objectBody))) {
    result.topLevel[m[1]] = m[2]
  }
  
  log(`Parsed ${Object.keys(result.topLevel).length} public and ${Object.keys(result.privateLevel).length} private exports`)
  
  return result
}

/* -------------------------------------------------- */
/* Build execution                                    */
/* -------------------------------------------------- */
if (!fs.existsSync(BUILDS)) {
  fs.mkdirSync(BUILDS)
}

if (!fs.existsSync(UNBUNDLED_DIR)) {
  fs.mkdirSync(UNBUNDLED_DIR)
}

step("Building lolite-unbundled")

const exportsData = parseExports(SRC_LOLITE)
const dependencies = {}

const indexLines = [
  "/* eslint-disable sort-keys */",
  "/* eslint-disable perfectionist/sort-objects */",
  "const lolite = {"
]

// Generate Private block with lolite.__private prefix
indexLines.push("  __private: {")
for (const [exportName, fileName] of Object.entries(exportsData.privateLevel)) {
  const pkgName = `lolite.__private.${fileName.toLowerCase()}`
  indexLines.push(`    ${exportName}: require("${pkgName}"),`)
  dependencies[pkgName] = "*"
}
indexLines.push("  },")

// Generate Top Level block
for (const [exportName, fileName] of Object.entries(exportsData.topLevel)) {
  const pkgName = `lolite.${fileName.toLowerCase()}`
  indexLines.push(`  ${exportName}: require("${pkgName}"),`)
  dependencies[pkgName] = "*"
}

indexLines.push("}")
indexLines.push("")
indexLines.push("module.exports = lolite")

fs.writeFileSync(path.join(UNBUNDLED_DIR, "lolite.js"), indexLines.join("\n"))
log("Generated lolite.js")

/* -------------------------------------------------- */
/* Generate package.json                              */
/* -------------------------------------------------- */
const pkgJson = {
  name: "lolite-unbundled",
  version: parentPkg.version,
  description: "Modular distribution of LoLite - each function as a separate dependency",
  main: "lolite.js",
  keywords: [...parentPkg.keywords, "modular", "unbundled"],
  homepage: parentPkg.homepage,
  bugs: parentPkg.bugs,
  repository: parentPkg.repository,
  license: parentPkg.license,
  author: parentPkg.author,
  dependencies,
  engines: parentPkg.engines
}

fs.writeFileSync(
  path.join(UNBUNDLED_DIR, "package.json"),
  JSON.stringify(pkgJson, null, 2)
)
log("Generated package.json")

/* -------------------------------------------------- */
/* Generate README                                    */
/* -------------------------------------------------- */
const depCount = Object.keys(dependencies).length
const readme = `# lolite-unbundled

The modular, tree-shakeable distribution of LoLite.

## Usage

\`\`\`javascript
const lolite = require("lolite-unbundled")
\`\`\`

Contains ${depCount} individual packages as dependencies.
`

fs.writeFileSync(path.join(UNBUNDLED_DIR, "README.md"), readme)
log("Generated README.md")

done(`lolite-unbundled ready with ${depCount} dependencies 🎉`)