const { mkDir, writeJson } = require("./file-utils")

const { renderAsText } = require("./render")

const allRules = require("./all-rules.json")

const map = {}
for (const rule of allRules) {
    if (!(rule.c in map)) {
        map[rule.c] = []
    }
    map[rule.c].push(rule)
}

/*
const comparatorFor = (propertyName) =>
    (leftObj, rightObj) => {
        const left = leftObj[propertyName]
        const right = rightObj[propertyName]
        return left === right
            ? 0
            : (left < right ? -1 : 1)
    }
 */

for (const c in map) {
    mkDir(c)
    for (const rule of map[c]) {
        if (new Date(rule.ValidTo) > new Date()) {
            rule["expr-as-text"] = renderAsText(rule.Logic)
            writeJson(`${c}/${rule.t}-${rule.n}.json`, rule)
        } else {
            console.warn(`skipped rule with id="${rule.Identifier}" because it's not valid anymore`)
        }
    }
}

