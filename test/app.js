const { Snipe } = require("../dist");
const fetch = require("node-fetch");
const config = require("./config.json");

const snipe = new Snipe("https://aucom.alfrinklive.nl", config.token);

async function init() {
	try {
	// const hardware = await snipe.hardware.get({
	// 	limit: 300,
	// });
	// hardware.forEach((aaa, i) => {
	// 	console.log(aaa.asset_tag);
	// });

		const checkin = await snipe.hardware.checkin(92, "noteeeee", 1);
		console.log(checkin);
	} catch (err) {
		if (err) console.log(err); process.exit();
	}
}

init();