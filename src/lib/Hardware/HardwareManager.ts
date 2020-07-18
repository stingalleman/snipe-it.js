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
		if (await res.status !== 200) throw(JSON.stringify(result, null, " "));
		if (await result.status == "error") throw(JSON.stringify(result, null, " "));

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}


	/**
	 * Get specific asset
	 * @param id Asset ID
	 */
	async getID(id: number) {
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "Content-Type"
			}
		});
		const result = await res.json();
		if (await result.status == "error") throw(JSON.stringify(result, null, " "));

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}


	/**
	 * Checkin a asset
	 * @param id Asset ID to checkin
	 * @param note Note
	 * @param location Location ID
	 */
	async checkin(id: number, note?: string, location_id?: number) {
		const data = {
			note: note,
			location_id: location_id
		};
		const Body = JSON.stringify(data);
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}/checkin`), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "Content-Type"
			},
			body: Body
		});
		const result = await res.json();
		if (await result.status == "error") {
			if (await result.messages == "That asset is already checked in.") throw("Asset already checked in");
			throw(`Error on checkin:\n${JSON.stringify(result, null, " ")}`);
		}
		return result;
	}
}