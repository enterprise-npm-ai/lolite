const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

const ROOT_DIRS = ["packages", "browser"]

let changedFiles = []
try {
  changedFiles = execSync("git diff --name-only HEAD~1 HEAD", { stdio: "pipe" })
    .toString()
    .split("\n")
    .filter(Boolean)
} catch (e) {
  console.error("Failed to get git changes:", e.message)
}

ROOT_DIRS.forEach((dirName) => {
  const absoluteDirPath = path.join(__dirname, "..", dirName)

  if (!fs.existsSync(absoluteDirPath)) {
    console.warn(`[WARN] Directory ${dirName} not found. Skipping.`)
    return
  }

  const items = fs.readdirSync(absoluteDirPath)

  items.forEach((item) => {
    const itemPath = path.join(absoluteDirPath, item)
    if (!fs.statSync(itemPath).isDirectory()) return

    const pkgJsonPath = path.join(itemPath, "package.json")
    if (!fs.existsSync(pkgJsonPath)) return

    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf8"))
    const name = pkgJson.name
    const version = pkgJson.version

    try {
      // Registry check to avoid 403 errors on existing versions
      try {
        const versions = JSON.parse(
          execSync(`npm view ${name} versions --json`, { stdio: "pipe" }).toString()
        )
        if (Array.isArray(versions) && versions.includes(version)) {
          console.log(`[NOTE] ${name}@${version} already exists. Skipping.`)
          return
        }
      } catch (e) {
        // Package doesn't exist yet or npm view failed
      }

      console.log(`[PUBLISHING] ${name}@${version} from ${dirName}...`)
      execSync("npm publish --access public", {
        cwd: itemPath,
        stdio: "inherit",
      })

      console.log(`[SUCCESS] ${name} deployed.\n`)
    } catch (error) {
      console.error(`[ERROR] Failed to process ${name}:`, error.message)
    }
  })
})

console.log("Deployment sequence complete.")