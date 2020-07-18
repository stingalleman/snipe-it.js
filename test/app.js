const { Snipe } = require("../dist");
const config = require("./config.json");

const snipe = new Snipe("https://aucom.alfrinklive.nl", config.token);

async function func() {
	// const data = await snipe.hardware.get({
	// 	limit: 50
	// });
	// console.log(data);
	console.log(await snipe.hardware.getID(5));
}

func();