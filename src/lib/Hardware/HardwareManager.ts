import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IHardware } from "../Interfaces";
// import { Hardware } from "./Hardware";

export class HardwareManager extends Manager {

	async get() {
		const res = await fetch(getApiURL(this.snipeURL));
		const json: Response<IHardware> = await res.json();
		return json;
		// const json: Response<IHardware> = await res.json();
		// return json.response.data.map(Hardware => new Hardware(Hardware)).sort((a, b) => {
		// 	if (a.start === b.start) return 0;
		// 	if (a.start! < b.start!) return -1;
		// 	return 1;
		// });
	}
}