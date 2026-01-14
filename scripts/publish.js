const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const PACKAGES_DIR = path.join(__dirname, "..", "packages")

if (!fs.existsSync(PACKAGES_DIR)) {
  console.error("Packages directory not found. Run 'npm run buildPackages' first.")
  process.exit(1)
}

const packages = fs.readdirSync(PACKAGES_DIR)

console.log(`Starting enterprise deployment for ${packages.length} packages...\n`)

packages.forEach((pkg) => {
  const pkgPath = path.join(PACKAGES_DIR, pkg)
  
  if (!fs.statSync(pkgPath).isDirectory()) return

  const pkgJsonPath = path.join(pkgPath, "package.json")
  if (!fs.existsSync(pkgJsonPath)) return

  const pkgJson = require(pkgJsonPath)
  const name = pkgJson.name
  const version = pkgJson.version

  try {
    console.log(`Checking status: ${name}@${version}`)
    
    // Check if version already exists to avoid 403/409 errors
    let isPublished = false
    try {
      const remoteVersion = execSync(`npm view ${name} version`, { stdio: "pipe" }).toString().trim()
      if (remoteVersion === version) {
        isPublished = true
      }
    } catch (e) {
      // Package might not exist yet, which is fine
    }

    if (isPublished) {
      console.log(`[SKIP] ${name}@${version} is already live.`)
      return
    }

    console.log(`[PUBLISHING] ${name}...`)
    
    // Using --access public for scoped packages (@lolite/...) 
    // though your current names are lolite.name
    execSync("npm publish --access public", {
      cwd: pkgPath,
      stdio: "inherit"
    })

    console.log(`[SUCCESS] ${name} deployed.\n`)
  } catch (error) {
    console.error(`[ERROR] Failed to publish ${name}:`, error.message)
  }
})

console.log("Enterprise deployment sequence complete.")