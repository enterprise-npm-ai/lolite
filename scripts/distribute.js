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
  if (!match) return `### ${methodName}\nThis utility is part of the [LoLite](https://github.com/enterprise-npm-ai/lolite) utility suite.`
  
  let docs = match[0].trim()
  
  // Truncate at EXTENDED DOCUMENTATION to prevent leaking internal docs into atomic readmes
  if (docs.includes("# EXTENDED DOCUMENTATION")) {
    docs = docs.split("# EXTENDED DOCUMENTATION")[0].trim()
  }
  
  const monolithRequireRegex = /const\s+lolite\s+=\s+require\("lolite"\)/g
  docs = docs.replace(monolithRequireRegex, `const ${methodName} = require("${pkgName}")`)
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
    description: `Enterprise-grade ${fileName} utility from the LoLite suite`,
    main: "index.js",
    author: MAIN_PKG.author,
    license: MAIN_PKG.license,
    repository: MAIN_PKG.repository,
    bugs: MAIN_PKG.bugs,
    homepage: MAIN_PKG.homepage,
    dependencies: {}
  }

  const processFile = (sourcePath, destFileName) => {
    let fileContent = fs.readFileSync(sourcePath, "utf8")
    // Target both relative and absolute-looking local requires
    const requireRegex = /require\("(\.\.?\/.*)"\)/g
    let match

    while ((match = requireRegex.exec(fileContent)) !== null) {
      const originalImport = match[0]
      const relativeImportPath = match[1]
      let absolutePath = path.resolve(path.dirname(sourcePath), relativeImportPath)
      
      // Node.js Resolution Logic: Check .js, then /index.js
      if (!absolutePath.endsWith(".js") && !fs.existsSync(absolutePath + ".js")) {
        const indexPath = path.join(absolutePath, "index.js")
        if (fs.existsSync(indexPath)) {
          absolutePath = indexPath
        }
      } else if (fs.existsSync(absolutePath + ".js")) {
        absolutePath += ".js"
      }

      if (fs.existsSync(absolutePath) && absolutePath.endsWith(".js")) {
        const depName = path.basename(absolutePath, ".js")
        const newLocalName = depName + ".js"
        const destPath = path.join(pkgDir, newLocalName)
        
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(absolutePath, destPath)
          processFile(absolutePath, newLocalName)
        }
        fileContent = fileContent.replace(originalImport, `require("./${depName}")`)
      }
    }

    // Improved dependency detection for packages like 'date' or '@is-(unknown)/...'
    Object.keys(MAIN_PKG.dependencies).forEach((dep) => {
      // Matches require("dep") or require("dep/path")
      const depRegex = new RegExp(`require\\("${dep}(?:\/.*)?"\\)`)
      if (depRegex.test(fileContent)) {
        pkgJson.dependencies[dep] = MAIN_PKG.dependencies[dep]
      }
    })

    fs.writeFileSync(path.join(pkgDir, destFileName), fileContent)
  }

  processFile(fullPath, "index.js")

  if (Object.keys(pkgJson.dependencies).length === 0) delete pkgJson.dependencies
  fs.writeFileSync(path.join(pkgDir, "package.json"), JSON.stringify(pkgJson, null, 2))
  
  const finalReadme = `# ${pkgName}\n\n${getDocsForMethod(fileName, pkgName)}\n\nThis utility is part of the [LoLite](https://github.com/enterprise-npm-ai/lolite) utility suite.`
  fs.writeFileSync(path.join(pkgDir, "README.md"), finalReadme)
})

console.log("Atomic packages generated with smart dependency detection and clean READMEs.")