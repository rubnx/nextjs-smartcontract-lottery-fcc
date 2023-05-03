// this file is just a clever way to import our constants in a single line of code
// (see LotteryEntrance.js)
const contractAddresses = require("./contractAddresses.json")
const abi = require("./abi.json")

module.exports = {
    abi,
    contractAddresses,
}
