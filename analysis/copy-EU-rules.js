const { readdirSync } = require("fs")
const { join } = require("path")

const { mkDir, readJson, writeJson } = require("./file-utils")
const { renderAsText } = require("./render")


const euPath = join("..", "EU")

const euRuleIds = readdirSync(euPath)

const dissectId = (id) => {
    const match = id.match(/^([A-Z]{2})-EU-([0-9]{4})$/)
    return ({
        t: match[1],
        n: match[2]
    })
}

mkDir("EU")

for (const ruleID of euRuleIds) {
    const { t, n } = dissectId(ruleID)
    const rule = readJson(join(euPath, ruleID, "rule.json"))
    rule["expr-as-text"] = renderAsText(rule.Logic)
    writeJson(join("EU", `${t}-${n}.json`), rule)
}

