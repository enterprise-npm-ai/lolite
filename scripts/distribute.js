#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const FORCED_DEPENDENCIES = {
  "lolite.__private.date": ["date"]
};

/* -------------------------------------------------- */
/* Logging helpers                                     */
/* -------------------------------------------------- */
const log = (msg) => console.log(`🔍 ${msg}`);
const step = (msg) => console.log(`📦 ${msg}`);
const done = (msg) => console.log(`✅ ${msg}`);

/* -------------------------------------------------- */
/* Paths & inputs                                     */
/* -------------------------------------------------- */
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const LIB = path.join(SRC, "lib");
const PRIVATE = path.join(SRC, "private");
const DIST = path.join(ROOT, "packages");

const parentPkg = require(path.join(ROOT, "package.json"));
const parentReadme = fs.readFileSync(path.join(ROOT, "README.md"), "utf8");

if (!fs.existsSync(DIST)) {
  log("Creating packages directory.  ");
  fs.mkdirSync(DIST);
}

/* -------------------------------------------------- */
/* Utilities                                          */
/* -------------------------------------------------- */
const toLower = (s) => s.toLowerCase();

function getJsFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".js"));
}

function parseRequires(code) {
  const regex = /require\(["']([^"']+)["']\)/g;
  const out = [];
  let match;
  while ((match = regex.exec(code))) {
    out.push(match[1]);
  }
  return out;
}

function getExternalPackage(dep) {
  if (dep.startsWith("@")) {
    return dep.split("/").slice(0, 2).join("/");
  }
  return dep.split("/")[0];
}

/* -------------------------------------------------- */
/* Dependency collection                               */
/* -------------------------------------------------- */
function collectDeps(entryFile, seenFiles = new Set(), externalDeps = new Set()) {
  if (seenFiles.has(entryFile)) return { seenFiles, externalDeps };
  seenFiles.add(entryFile);

  log(`Scanning ${path.relative(ROOT, entryFile)}.  `);

  const code = fs.readFileSync(entryFile, "utf8");
  const requires = parseRequires(code);

  for (const req of requires) {
    if (req.startsWith("./") || req.startsWith("../")) {
      const resolved =
        fs.existsSync(req)
          ? req
          : path.resolve(path.dirname(entryFile), req);

      const file =
        fs.existsSync(resolved) ? resolved :
        fs.existsSync(`${resolved}.js`) ? `${resolved}.js` :
        null;

      if (file) {
        collectDeps(file, seenFiles, externalDeps);
      }
    } else {
      const pkg = getExternalPackage(req);
      externalDeps.add(pkg);
      log(`Found external dependency: ${pkg}.  `);
    }
  }

  return { seenFiles, externalDeps };
}

/* -------------------------------------------------- */
/* README rewriting                                   */
/* -------------------------------------------------- */
function rewritePublicExamples(text, name) {
  return text
    .replace(/require\(["']lolite["']\)/g, `require("lolite.${name}")`)
    .replace(new RegExp(`lolite\\.${name}\\(`, "g"), `${name}(`);
}

function rewritePrivateExamples(text, name) {
  return text.replace(
    /require\(["']lolite["']\)\.__private\.[A-Za-z0-9_]+/g,
    `require("lolite.__private.${name}")`
  );
}

function extractPublicReadme(name) {
  const regex = new RegExp(
    `##\\s+${name}\\([^)]*\\)[\\s\\S]*?(?=\\n###|$)`,
    "i"
  );

  const match = parentReadme.match(regex);
  if (!match) {
    return `## ${name}\n\nNo documentation available.\n`;
  }

  return rewritePublicExamples(match[0], name);
}

function extractPrivateReadme(name) {
  const fileName = `${name}.js`;
  const regex = new RegExp(
    `###\\s+\`${fileName}\`[\\s\\S]*?(?=\\n###|$)`,
    "i"
  );

  const match = parentReadme.match(regex);
  if (!match) {
    return `## ${name}\n\nNo documentation available.\n`;
  }

  return rewritePrivateExamples(match[0], name);
}

/* -------------------------------------------------- */
/* Package builder                                    */
/* -------------------------------------------------- */
function buildPackage(name, entryFile, type) {
  const cleanName = toLower(name.replace("__private.", ""));
  const pkgName =
    type === "private"
      ? `lolite.__private.${cleanName}`
      : `lolite.${cleanName}`;

  const pkgDir = path.join(DIST, pkgName);
  const srcDir = path.join(pkgDir, "src");

  step(`Building ${pkgName}.  `);

  fs.mkdirSync(srcDir, { recursive: true });

  const { seenFiles, externalDeps } = collectDeps(entryFile);

  log(`Bundling ${seenFiles.size} internal file(s).  `);
  for (const file of seenFiles) {
    const rel = path.relative(SRC, file);
    const dest = path.join(srcDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(file, dest);
  }

  const dependencies = {};
  for (const dep of externalDeps) {
    if (parentPkg.dependencies?.[dep]) {
      dependencies[dep] = parentPkg.dependencies[dep];
    }
  }

  const forced = FORCED_DEPENDENCIES[pkgName];
  if (forced) {
    log(`Applying forced dependencies: ${forced.join(", ")}.  `);
    for (const dep of forced) {
      if (parentPkg.dependencies?.[dep]) {
        dependencies[dep] = parentPkg.dependencies[dep];
      }
    }
  }

  const main =
    type === "private"
      ? `src/private/${cleanName}.js`
      : `src/lib/${cleanName}.js`;

  const pkgJson = {
    name: pkgName,
    version: parentPkg.version,
    main,
    license: parentPkg.license,
    author: parentPkg.author,
    repository: parentPkg.repository,
    dependencies
  };

  fs.writeFileSync(path.join(pkgDir, "package.json"), JSON.stringify(pkgJson, null, 2));

  const readme =
    type === "private"
      ? extractPrivateReadme(cleanName)
      : extractPublicReadme(cleanName);

  fs.writeFileSync(path.join(pkgDir, "README.md"), readme);

  done(`${pkgName} complete.  `);
}

/* -------------------------------------------------- */
/* Execution                                           */
/* -------------------------------------------------- */
log("Processing public utilities.  ");
for (const file of getJsFiles(LIB)) {
  const name = path.basename(file, ".js");
  buildPackage(name, path.join(LIB, file), "lib");
}

log("Processing private utilities.  ");
for (const file of getJsFiles(PRIVATE)) {
  const name = path.basename(file, ".js");
  buildPackage(`__private.${name}`, path.join(PRIVATE, file), "private");
}

done("All LoLite packages generated successfully.  🎉");
