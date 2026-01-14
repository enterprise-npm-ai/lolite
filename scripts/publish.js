const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")
const crypto = require("crypto")

const PACKAGES_DIR = path.join(__dirname, "..", "packages")

if (!fs.existsSync(PACKAGES_DIR)) {
  console.error("Packages directory not found. Run 'npm run buildPackages' first.")
  process.exit(1)
}

const getLocalHash = (pkgPath) => {
  // Generate a dry-run tarball to get a consistent content hash
  const tarballName = execSync("npm pack --silent", { cwd: pkgPath }).toString().trim()
  const tarballPath = path.join(pkgPath, tarballName)
  const fileBuffer = fs.readFileSync(tarballPath)
  const hash = crypto.createHash("sha1").update(fileBuffer).digest("hex")
  
  // Cleanup the temporary tarball
  fs.unlinkSync(tarballPath)
  return hash
}

const packages = fs.readdirSync(PACKAGES_DIR)

console.log(`Analyzing ${packages.length} packages for enterprise-grade changes...\n`)

packages.forEach((pkg) => {
  const pkgPath = path.join(PACKAGES_DIR, pkg)
  if (!fs.statSync(pkgPath).isDirectory()) return

  const pkgJsonPath = path.join(pkgPath, "package.json")
  if (!fs.existsSync(pkgJsonPath)) return

  const pkgJson = require(pkgJsonPath)
  const name = pkgJson.name
  const version = pkgJson.version

  try {
    let remoteInfo = null
    try {
      remoteInfo = JSON.parse(execSync(`npm view ${name} --json`, { stdio: "pipe" }).toString())
    } catch (e) {
      // Package doesn't exist on npm yet
    }

    // 1. Check if the version is already published
    if (remoteInfo && remoteInfo.versions && remoteInfo.versions.includes(version)) {
      // 2. If version exists, check if the content has actually changed
      const remoteHash = remoteInfo.dist.shasum
      const localHash = getLocalHash(pkgPath)

      if (remoteHash === localHash) {
        console.log(`[SKIP] ${name}@${version} - Content is identical to registry.`)
        return
      } else {
        console.log(`[NOTICE] ${name}@${version} - Content changed but version is same. Manual version bump required?`)
        // Usually npm won't let you publish the same version twice, 
        // but this logic detects the discrepancy.
        return
      }
    }

    console.log(`[PUBLISHING] ${name}@${version}...`)
    execSync("npm publish --access public", {
      cwd: pkgPath,
      stdio: "inherit"
    })
    console.log(`[SUCCESS] ${name} deployed.\n`)

  } catch (error) {
    console.error(`[ERROR] Failed to process ${name}:`, error.message)
  }
})

console.log("Enterprise deployment sequence complete.")