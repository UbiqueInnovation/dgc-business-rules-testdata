const { join } = require("path")

const { readString, writeString } = require("./file-utils")


const html = readString(join("tmp", "html-from-own.html"))
const preMatch = html.match(/<pre>(.+)<\/pre\>/s)
const preText = preMatch[1]
writeString(join("tmp", "all-rules.json"), preText)

