const fs = require("fs")
const path = require("path")

const ROOT = process.cwd()
const SRC = path.join(ROOT, "src")
const PACKAGES_DIR = path.join(ROOT, "packages")
const MAIN_PKG = require(path.join(ROOT, "package.json"))
const MAIN_README = fs.readFileSync(path.join(ROOT, "README.md"), "utf8")

const BLACKLIST = ["index.js", "lolite.js"]

const getDocsForMethod = (methodName, pkgName) => {
  const regex = new RegExp(`###\\s+\`?(?:lolite\\.)?${methodName}(?:\\(.*?\\))?(?:\\.js)?\`?[\\s\\S]*?(?=###|##|---|\$)`, "i")
  const match = MAIN_README.match(regex)
  if (!match) return `### ${methodName}\nUtility part of LoLite.`
  let docs = match[0].trim()
  docs = docs.replace(new RegExp(`lolite\\.${methodName}(?!")`, "g"), methodName)
  return docs
}

const getAllFiles = (dirPath, arrayOfFiles) => {
  const files = fs.readdirSync(dirPath)
  arrayOfFiles = arrayOfFiles || []
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles)
    } else if (file.endsWith(".js") && !BLACKLIST.includes(file)) {
      arrayOfFiles.push(fullPath)
    }
  })
  return arrayOfFiles
}

if (fs.existsSync(PACKAGES_DIR)) fs.rmSync(PACKAGES_DIR, { recursive: true, force: true })
fs.mkdirSync(PACKAGES_DIR)

const allSrcFiles = getAllFiles(SRC)

allSrcFiles.forEach((fullPath) => {
  const fileName = path.basename(fullPath, ".js")
  const isPrivate = fullPath.includes(path.sep + "private" + path.sep)
  const pkgName = isPrivate ? `lolite.__private.${fileName.toLowerCase()}` : `lolite.${fileName.toLowerCase()}`
  const pkgDir = path.join(PACKAGES_DIR, pkgName)

  if (!fs.existsSync(pkgDir)) fs.mkdirSync(pkgDir, { recursive: true })

  const pkgJson = {
    name: pkgName,
    version: MAIN_PKG.version,
    main: "index.js",
    dependencies: {}
  }

  // RECURSIVE REWRITER FUNCTION
  const processFile = (sourcePath, destFileName) => {
    let fileContent = fs.readFileSync(sourcePath, "utf8")
    const requireRegex = /require\("(\.\.?\/.*)"\)/g
    let match

    while ((match = requireRegex.exec(fileContent)) !== null) {
      const originalImport = match[0]
      const relativeImportPath = match[1]
      const absolutePath = path.resolve(path.dirname(sourcePath), relativeImportPath) + ".js"
      const depName = path.basename(absolutePath, ".js")

      if (fs.existsSync(absolutePath)) {
        const newLocalName = depName + ".js"
        const destPath = path.join(pkgDir, newLocalName)
        
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(absolutePath, destPath)
          processFile(absolutePath, newLocalName) // Recursively fix the copied file
        }
        fileContent = fileContent.replace(originalImport, `require("./${depName}")`)
      }
    }

    // Add external dependencies to pkgJson
    Object.keys(MAIN_PKG.dependencies).forEach((dep) => {
      if (fileContent.includes(`require("${dep}")`)) {
        pkgJson.dependencies[dep] = MAIN_PKG.dependencies[dep]
      }
    })

    fs.writeFileSync(path.join(pkgDir, destFileName), fileContent)
  }

  processFile(fullPath, "index.js")

  if (Object.keys(pkgJson.dependencies).length === 0) delete pkgJson.dependencies
  fs.writeFileSync(path.join(pkgDir, "package.json"), JSON.stringify(pkgJson, null, 2))
  fs.writeFileSync(path.join(pkgDir, "README.md"), `# ${pkgName}\n\n${getDocsForMethod(fileName, pkgName)}`)
})

console.log("Atomic packages flattened and recursively bundled.")