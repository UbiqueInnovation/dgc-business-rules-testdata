const axios = require("axios")
const { writeFileSync } = require("fs")
const { join } = require("path")

async function getRequest(path) {
    try {
        const response = await axios.get(`https://distribution-cff4f7147260.dcc-rules.de/${path}`)
        return response.data
    } catch (error) {
        console.dir(error)
    }
}


(async () => {
    const rules = await getRequest("rules")
    console.log(`#rules=${rules.length}`)

    // const allBRs = rules.map(async (rule, i) => {
    //     console.log(`downloading rule #${i} with country=${rule.country} and hash=${rule.hash}`)
    //     return await getRequest(`rules/${rule.country}/${rule.hash}`)
    // })

    const allBRs = []
    rules.forEach(async (rule, i) => {
        console.log(`downloading rule #${i} with country=${rule.country} and hash=${rule.hash}`)
        allBRs.push(await getRequest(`rules/${rule.country}/${rule.hash}`))
    })

    setTimeout(() => {
        writeFileSync(join("tmp", "all-rules-TSI.json"), JSON.stringify(allBRs, null, 2))
    }, 20000)
})()

