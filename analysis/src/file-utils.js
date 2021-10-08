const { existsSync, mkdirSync, readFileSync, writeFileSync } = require("fs")

const readString = (path) => readFileSync(path, "utf8")
module.exports.readString = readString
const readJson = (path) => JSON.parse(readString(path))
module.exports.readJson = readJson

const writeString = (path, data) => writeFileSync(path, data, "utf8")
module.exports.writeString = writeString
const writeJson = (path, data) => writeString(path, JSON.stringify(data, null, 2))
module.exports.writeJson = writeJson

const mkDir = (path) => existsSync(path) || mkdirSync(path)
module.exports.mkDir = mkDir

