import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IHardware } from "../Interfaces";
import { Hardware } from "./Hardware";

export class HardwareManager extends Manager {

	// async get({
	// 	limit = Number,
	// 	offset = Number,
	// 	search = String,
	// 	order_number = String,
	// 	sort = String,
	// 	model_id = Number,
	// 	category_id = Number,
	// 	company_id = Number,
	// 	location_id = Number,
	// 	status = String,
	// 	status_id = String,
	// }) {
	// 	const res = await fetch(getApiURL(this.snipeURL, `/hardware?limit=${limit}&offset=${offset ? null : 0}&search=${search}&order_number=${order_number}&sort=${sort}&model_id=${model_id}&category_id=${category_id}&company_id=${company_id}&location_id=${location_id}&status=${status}&status_id=${status_id}`), {
	// 		method: "GET",
	// 		headers: {
	// 			"Authorization": `Bearer ${this.apiToken}`,
	// 			"Accept": "application/json",
	// 			"Content-Type": "Content-Type"
	// 		}
	// 	});
	// 	const json: Response<IHardware> = await res.json();
	// 	// return json;
	// 	return json.rows.map(hardware => new Hardware(hardware)).sort((a, b) => {
	// 		return 1;
	// 	}) + getApiURL(this.snipeURL, `/hardware?limit=${limit}&offset=${offset}&search=${search}&order_number=${order_number}&sort=${sort}&model_id=${model_id}&category_id=${category_id}&company_id=${company_id}&location_id=${location_id}&status=${status}&status_id=${status_id}`);
	// }

	async get() {
		const res = await fetch(getApiURL(this.snipeURL, "/hardware"), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "Content-Type"
			}
		});
		const json: Response<IHardware> = await res.json();
		// return json;
		return json.rows.map(hardware => new Hardware(hardware));
	}
}