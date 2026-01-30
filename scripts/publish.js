const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const PACKAGES_DIR = path.join(__dirname, "..", "packages")

if (!fs.existsSync(PACKAGES_DIR)) {
  console.error("Packages directory not found. Run 'npm run buildPackages' first.")
  process.exit(1)
}

const packages = fs.readdirSync(PACKAGES_DIR)

// Get changed files in the last commit
let changedFiles = []
try {
  changedFiles = execSync("git diff --name-only HEAD~1 HEAD", { stdio: "pipe" })
    .toString()
    .split("\n")
    .filter(Boolean)
} catch (e) {
  console.error("Failed to get git changes:", e.message)
}

console.log(`Analyzing ${packages.length} packages for enterprise-grade changes...\n`)

packages.forEach((pkg) => {
  const pkgPath = path.join(PACKAGES_DIR, pkg)
  if (!fs.statSync(pkgPath).isDirectory()) return

  // Skip if folder hasn't changed
  const folderChanged = changedFiles.some((file) => file.startsWith(`packages/${pkg}/`))
  if (!folderChanged) {
    console.log(`[SKIP] ${pkg} has no changes in this commit.`)
    return
  }

  const pkgJsonPath = path.join(pkgPath, "package.json")
  if (!fs.existsSync(pkgJsonPath)) return

  const pkgJson = require(pkgJsonPath)
  const name = pkgJson.name
  const version = pkgJson.version

  try {
    // Double check with the registry to see if this specific version is already taken
    try {
      const versions = JSON.parse(
        execSync(`npm view ${name} versions --json`, { stdio: "pipe" }).toString()
      )
      if (Array.isArray(versions) && versions.includes(version)) {
        console.log(`[NOTE] ${name} is unchanged. Skipping.`)
        return
      }
    } catch (e) {
      // Package might not exist yet
    }

    console.log(`[PUBLISHING] ${name}@${version}...`)
    execSync("npm publish --access public", {
      cwd: pkgPath,
      stdio: "inherit",
    })

    console.log(`[SUCCESS] ${name} deployed.\n`)
  } catch (error) {
    console.error(`[ERROR] Failed to process ${name}:`, error.message)
  }
})

console.log("Enterprise deployment sequence complete.")
