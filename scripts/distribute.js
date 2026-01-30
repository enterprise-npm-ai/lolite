#!/usr/bin/env node

const fs = require("fs")
const path = require("path")
const crypto = require("crypto")
const { execSync } = require("child_process")

const FORCED_DEPENDENCIES = {
  "lolite.__private.date": ["date"]
}

const args = process.argv.slice(2)
const isDryRun = args.includes("--dry-run")

/* -------------------------------------------------- */
/* Logging helpers                                    */
/* -------------------------------------------------- */
const log = (msg) => console.log(`🔍 ${msg}`)
const step = (msg) => console.log(`📦 ${msg}`)
const done = (msg) => console.log(`✅ ${msg}`)

if (isDryRun) {
  log("Running in DRY RUN mode. Skipping version/hash checks.")
}

/* -------------------------------------------------- */
/* Paths & inputs                                     */
/* -------------------------------------------------- */
const ROOT = path.resolve(__dirname, "..")
const SRC = path.join(ROOT, "src")
const LIB = path.join(SRC, "lib")
const PRIVATE = path.join(SRC, "private")
const DIST = path.join(ROOT, "packages")

const parentPkg = require(path.join(ROOT, "package.json"))
const parentReadme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8")

if (!fs.existsSync(DIST)) {
  log("Creating packages directory.")
  fs.mkdirSync(DIST)
}

/* -------------------------------------------------- */
/* Utilities                                          */
/* -------------------------------------------------- */
const toLower = (s) => s.toLowerCase()

function getJsFiles(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith(".js"))
}

function parseRequires(code) {
  const regex = /require\(["']([^"']+)["']\)/g
  const out = []
  let match
  while ((match = regex.exec(code))) {
    out.push(match[1])
  }
  return out
}

function getExternalPackage(dep) {
  if (dep.startsWith("@")) {
    return dep.split("/").slice(0, 2).join("/")
  }
  return dep.split("/")[0]
}

/* -------------------------------------------------- */
/* Hashing & npm helpers                              */
/* -------------------------------------------------- */
function hashDir(dir) {
  const hash = crypto.createHash("sha256")

  function walk(p) {
    for (const file of fs.readdirSync(p).sort()) {
      if (file === "package.json") continue
      if (file === "README.md") continue

      const full = path.join(p, file)
      const stat = fs.statSync(full)

      if (stat.isDirectory()) {
        walk(full)
      } else {
        hash.update(fs.readFileSync(full))
      }
    }
  }

  walk(dir)
  return hash.digest("hex")
}

function getLatestNpmVersion(pkgName) {
  try {
    return execSync(`npm view ${pkgName} version`, {
      stdio: ["ignore", "pipe", "ignore"]
    })
      .toString()
      .trim()
  } catch {
    return null
  }
}

/* -------------------------------------------------- */
/* Dependency collection                              */
/* -------------------------------------------------- */
function collectDeps(entryFile, seenFiles = new Set(), externalDeps = new Set()) {
  if (seenFiles.has(entryFile)) return { seenFiles, externalDeps }
  seenFiles.add(entryFile)

  log(`Scanning ${path.relative(ROOT, entryFile)}.`)

  const code = fs.readFileSync(entryFile, "utf8")
  const requires = parseRequires(code)

  for (const req of requires) {
    if (req.startsWith("./") || req.startsWith("../")) {
      const resolved = fs.existsSync(req)
        ? req
        : path.resolve(path.dirname(entryFile), req)

      const file = fs.existsSync(resolved)
        ? resolved
        : fs.existsSync(`${resolved}.js`)
        ? `${resolved}.js`
        : null

      if (file) {
        collectDeps(file, seenFiles, externalDeps)
      }
    } else {
      const pkg = getExternalPackage(req)
      externalDeps.add(pkg)
      log(`Found external dependency: ${pkg}.`)
    }
  }

  return { seenFiles, externalDeps }
}

/* -------------------------------------------------- */
/* README rewriting                                   */
/* -------------------------------------------------- */
function rewritePublicExamples(text, name) {
  return text
    .replace(/require\(["']lolite["']\)/g, `require("lolite.${name}")`)
    .replace(new RegExp(`lolite\\.${name}\\(`, "g"), `${name}(`)
}

function rewritePrivateExamples(text, name) {
  return text.replace(
    /require\(["']lolite["']\)\.__private\.[A-Za-z0-9_]+/g,
    `require("lolite.__private.${name}")`
  )
}

function extractPublicReadme(name) {
  const regex = new RegExp(
    `##\\s+${name}\\([^)]*\\)[\\s\\S]*?(?=\\n###|$)`,
    "i"
  )

  const match = parentReadme.match(regex)
  if (!match) {
    return `## ${name}\n\nSee the LoLite README for documentation.\n`
  }

  return rewritePublicExamples(match[0], name)
}

function extractPrivateReadme(name) {
  const regex = new RegExp(
    `#{2,3}\\s+__private\\.${name}[\\s\\S]*?(?=\\n##|$)`,
    "i"
  )

  const match = parentReadme.match(regex)
  if (!match) {
    return `## ${name}\n\nSee the LoLite README for documentation.\n`
  }

  return rewritePrivateExamples(match[0], name)
}

/* -------------------------------------------------- */
/* Package builder                                    */
/* -------------------------------------------------- */
function buildPackage(name, entryFile, type) {
  const cleanName = toLower(name.replace("__private.", ""))
  const pkgName =
    type === "private"
      ? `lolite.__private.${cleanName}`
      : `lolite.${cleanName}`

  const pkgDir = path.join(DIST, pkgName)
  const srcDir = path.join(pkgDir, "src")

  step(`Building ${pkgName}.`)

  fs.mkdirSync(srcDir, { recursive: true })

  const { seenFiles, externalDeps } = collectDeps(entryFile)

  for (const file of seenFiles) {
    const rel = path.relative(SRC, file)
    const dest = path.join(srcDir, rel)
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(file, dest)
  }

  const dependencies = {}
  for (const dep of externalDeps) {
    if (parentPkg.dependencies?.[dep]) {
      dependencies[dep] = parentPkg.dependencies[dep]
    }
  }

  const forced = FORCED_DEPENDENCIES[pkgName]
  if (forced) {
    for (const dep of forced) {
      if (parentPkg.dependencies?.[dep]) {
        dependencies[dep] = parentPkg.dependencies[dep]
      }
    }
  }

  const main =
    type === "private"
      ? `src/private/${cleanName}.js`
      : `src/lib/${cleanName}.js`

  let version = parentPkg.version

  // Only handle versioning/hashing logic if NOT a dry run
  if (!isDryRun) {
    const localHash = hashDir(pkgDir)
    const npmVersion = getLatestNpmVersion(pkgName)

    if (npmVersion) {
      log(`Checking published version ${npmVersion}.`)
      try {
        const tmp = fs.mkdtempSync(path.join(require("os").tmpdir(), "lolite-"))
        execSync(`npm pack ${pkgName}@${npmVersion}`, {
          cwd: tmp,
          stdio: "ignore"
        })

        const tgz = fs.readdirSync(tmp).find((f) => f.endsWith(".tgz"))
        execSync(`tar -xzf ${tgz}`, { cwd: tmp, stdio: "ignore" })

        const publishedHash = hashDir(path.join(tmp, "package"))

        if (publishedHash === localHash) {
          version = npmVersion
          log(`No content changes detected. Reusing ${npmVersion}.`)
        }
      } catch {
        log("Unable to compare with npm package. Publishing normally.")
      }
    }
  }

  const pkgJson = {
    name: pkgName,
    version,
    main,
    license: parentPkg.license,
    author: parentPkg.author,
    repository: parentPkg.repository,
    dependencies
  }

  fs.writeFileSync(
    path.join(pkgDir, "package.json"),
    JSON.stringify(pkgJson, null, 2)
  )

  const readme =
    type === "private"
      ? extractPrivateReadme("__private." + cleanName)
      : extractPublicReadme(cleanName)

  fs.writeFileSync(path.join(pkgDir, "README.md"), readme)

  done(`${pkgName} ready (${version}).`)
}

/* -------------------------------------------------- */
/* Execution                                          */
/* -------------------------------------------------- */
log("Processing public utilities.")
for (const file of getJsFiles(LIB)) {
  const name = path.basename(file, ".js")
  buildPackage(name, path.join(LIB, file), "lib")
}

log("Processing private utilities.")
for (const file of getJsFiles(PRIVATE)) {
  const name = path.basename(file, ".js")
  buildPackage(`__private.${name}`, path.join(PRIVATE, file), "private")
}

done("All LoLite packages generated successfully. 🎉")