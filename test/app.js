const { Snipe } = require("../dist");
const config = require("./config.json");

const snipe = new Snipe(config.url, config.token);

async function func() {
	try {
		const data = await snipe.hardware.get();
		console.log(data);
	}catch (err) {
		console.log(err);
		process.exit();
	}
}

func();