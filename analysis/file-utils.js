const { existsSync, mkdirSync, readFileSync, writeFileSync } = require("fs")

const readJson = (path) => JSON.parse(readFileSync(path, "utf8"))
module.exports.readJson = readJson
const writeJson = (path, data) => writeFileSync(path, JSON.stringify(data, null, 2), "utf8")
module.exports.writeJson = writeJson

const mkDir = (path) => existsSync(path) || mkdirSync(path)
module.exports.mkDir = mkDir

