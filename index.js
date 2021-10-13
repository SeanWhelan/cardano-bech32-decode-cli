let { bech32, bech32m } = require("bech32")
const readline = require("readline")

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

rl.question("Please enter your Cardano address: ", function (address) {
	// decode bech32 shelley address and convert to hex
	const addressWords = bech32.decode(address, 1000)
	const payload = bech32.fromWords(addressWords.words)
	const addressDecoded = `${Buffer.from(payload).toString("hex")}`

	// stake part of the address is the last 56 bytes
	const stakeAddressDecoded =
		"e1" + addressDecoded.substr(addressDecoded.length - 56)

	const stakeAddress = bech32.encode(
		"stake",
		bech32.toWords(Uint8Array.from(Buffer.from(stakeAddressDecoded, "hex"))),
		1000
	)
	console.log("\nYour Cardano stake key is: " + stakeAddress)
	rl.close()
})

rl.on("close", function () {
	console.log("\nGoodbye!")
	process.exit(0)
})
