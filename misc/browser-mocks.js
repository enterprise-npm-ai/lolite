// Node.js Core Mocks
const coreMocks = {
  constants: {
    COPYFILE_EXCL: 1,
    COPYFILE_FICLONE: 2,
    COPYFILE_FICLONE_FORCE: 4,
    O_RDONLY: 0,
    O_WRONLY: 1,
    O_RDWR: 2,
    O_CREAT: 64,
    S_IFMT: 61440,
    S_IFREG: 32768,
    S_IFDIR: 16384
  },
  readFileSync: () => "",
  writeFileSync: () => {},
  writeFile: () => {},
  appendFileSync: () => {}, 
  existsSync: () => false,   
  mkdirSync: () => {},      
  statSync: () => ({ isDirectory: () => false, isFile: () => true }),
  release: () => "0.0.0",
  platform: () => "browser",
  arch: () => "javascript",
  hostname: () => "localhost",
  homedir: () => "/",
  join: (...args) => args.join("/").replace(/\/+/g, "/"),
  resolve: (...args) => "/" + args.join("/").replace(/\/+/g, "/"),
  relative: () => "",
  dirname: (p = "/") => p.split("/").slice(0, -1).join("/") || "/",
  basename: (p) => p.split("/").pop(),
  env: {
    
  },
  argv: ""
}

globalThis.process = coreMocks
if (typeof window === "undefined") globalThis.window = globalThis
if (typeof self === "undefined") globalThis.self = globalThis

globalThis.require = typeof require === "function" ? require : () => {
  return Date
}

globalThis.require.resolve = typeof require === "function" && typeof require.resolve === "function" ? require.resolve : () => {
  return "date"
}

module.exports = { ...coreMocks }