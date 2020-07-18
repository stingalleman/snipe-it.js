const { Snipe } = require("../dist");
const fetch = require("node-fetch");
const config = require("./config.json");

const snipe = new Snipe("https://aucom.alfrinklive.nl", config.token);

async function init() {
	// const data = await snipe.hardware.get();
	console.log(await snipe.hardware.get());
}

init();