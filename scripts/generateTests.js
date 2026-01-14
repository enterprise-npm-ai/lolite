const fs = require("fs")
const path = require("path")

const ROOT = path.join(__dirname, "..")
const BASE_FILE = path.join(ROOT, "test", "src", "test.js")
const OUTPUT_FILE = path.join(ROOT, "test", "dist", "test.js")

const baseContent = fs.readFileSync(BASE_FILE, "utf8")

// 1. Identify all methods used
const methodsUsed = new Set()
const methodRegex = /lolite\.([a-zA-Z0-9_]+)/g
let match
while ((match = methodRegex.exec(baseContent)) !== null) {
  if (match[1] !== "__private") {
    methodsUsed.add(match[1])
  }
}

// 2. Build the Atomic Require Block
let atomicRequires = "\n    // --- ATOMIC PACKAGE INJECTION ---\n"
methodsUsed.forEach((method) => {
  const isPrivate = [
    "arrayOfAllBooleans", 
    "crash", 
    "date", 
    "invertFallback", 
    "isNotInteger", 
    "multiplyFallback"
  ].includes(method)

  const pkgName = isPrivate 
    ? `lolite.__private.${method.toLowerCase()}` 
    : `lolite.${method.toLowerCase()}`

  atomicRequires += `    const ${method} = require(\"../../packages/${pkgName}\")\n`
})

// 3. Extract the test body
const bodyRegex = /enterpriseTest\(".*?",\s*\(assert\)\s*=>\s*\{([\s\S]*)\}\)/
const bodyMatch = baseContent.match(bodyRegex)
const originalBody = bodyMatch[1]

// 4. Create the Atomic version of the body
let atomicBody = originalBody.replace(/lolite\.([a-zA-Z0-9_]+)/g, "$1")
atomicBody = atomicBody.replace(/([a-zA-Z0-9_]+)\.__private\./g, "")

// 5. Construct with defensive semicolons for IIFE safety
const finalContent = baseContent.replace(
  bodyRegex,
  `enterpriseTest("Lolite Enterprise-Grade Tests (Monolith + Atomic)", (assert) => {
  // SCOPE 1: MONOLITHIC
  ;{
  ${originalBody}
  }

  // SCOPE 2: ATOMIC
  ;{
  ${atomicRequires}
    ${atomicBody}
  }
})`
)

const outputDir = path.dirname(OUTPUT_FILE)
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

fs.writeFileSync(OUTPUT_FILE, finalContent)

console.log("Consolidated test suite generated.")