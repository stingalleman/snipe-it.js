const { Snipe } = require("../dist");
const config = require("./config.json");

const snipe = new Snipe("https://aucom.alfrinklive.nl", config.token);

async function func() {
	const data = await snipe.hardware.get({
		limit: 5
	});
	console.log(data.length);
}

func();