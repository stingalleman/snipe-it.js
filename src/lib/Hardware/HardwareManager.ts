import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IHardware } from "../Interfaces";
import { Hardware } from "./Hardware";

// Error:
//		const result = await res.json();
//		if (await result.status == "error") throw(`Error on checkin:\n${JSON.stringify(result, null, " ")}`);
export class HardwareManager extends Manager {

	/**
 * Return list of assets
 * @param options options - Options to pass to the API
 */
	async get(options: {
		limit: number,
		offset?: number,
		search?: string,
		order_number?: string,
		sort?: string,
		model_id?: number,
		category_id?: number,
		company_id?: number,
		location_id?: number,
		status?: string,
		status_id?: string
	}) {
		const res = await fetch(getApiURL(this.snipeURL, `/hardware?limit=${options.limit}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "Content-Type"
			}
		});
		const result = await res.json();
		if (await result.status == "error") throw(JSON.stringify(result, null, " "));
		if (res.status !== 200) throw(JSON.stringify(result, null, " "));

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}
}