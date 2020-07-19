import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IHardware, HardwareOptions, checkoutOptions, HardwarePostOptions } from "../Interfaces";
import { Hardware } from "./Hardware";

// Error:
//		const result = await res.json();
//		if (await result.status == "error") throw(`Error on checkin:\n${JSON.stringify(result, null, " ")}`);
export class HardwareManager extends Manager {

	// GET

	/**
 	* Return list of assets
  * @param options options - Options to pass to the API
 */
	async get(options?: HardwareOptions) {
		options = Object.assign({ limit: 50 }, options || {});
		const res = await fetch(getApiURL(this.snipeURL, "/hardware", options), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		if (await result.status == "error") throw (JSON.stringify(result, null, " "));
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}


	/**
	 * Get specific asset by Asset ID
	 * @param id Asset ID
	 */
	async getID(id: number) {
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));
		if (result.status == "error") throw (JSON.stringify(result, null, " "));

		const json: IHardware = result;
		return new Hardware(json);
	}

	/**
	 * Get specific asset by Asset Tag
	 * @param id Asset ID
	 */
	async getAssetTag(asset_tag: string) {
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/bytag/${asset_tag}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));
		if (result.status == "error") throw (JSON.stringify(result, null, " "));

		const json: IHardware = result;
		return new Hardware(json);
	}

	/**
	 * Get specific asset by Serial
	 * @param id Asset ID
	 */
	async getSerial(serial: string) {
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/byserial/${serial}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));
		if (result.status == "error") throw (JSON.stringify(result, null, " "));

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
		const JSONdata = JSON.stringify(data);
		console.log(JSONdata);
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}/checkin`), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSONdata
		});
		const result = await res.json();
		if (await result.status == "error") {
			if (await result.messages == "That asset is already checked in.") throw ("Asset already checked in");
			throw (`Error on checkin:\n${JSON.stringify(result, null, " ")}`);
		}
		return result;
	}

	/**
	 * Checkout a asset
	 * @param id Asset ID to checkin
	 * @param options Options to pass to the API
	 */
	async checkout(id: number, options: checkoutOptions) {
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}/checkout`), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(options)
		});
		const result = await res.json();
		if (await result.status == "error") {
			if (await result.messages == "That asset is not available for checkout!") throw ("Asset already checked out");
			throw (`Error on checkout:\n${JSON.stringify(result, null, " ")}`);
		}
		return result;
	}


	/**
	 * Return a list of assets that are due for audit soon
	 */
	async getAuditDue() {
		const res = await fetch(getApiURL(this.snipeURL, "/hardware/audit/due"), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));
		if (result.status == "error") throw (JSON.stringify(result, null, " "));

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}

	/**
	 * Return a list of assets that are overdue for audit
	 */
	async getOverdueAudit() {
		const res = await fetch(getApiURL(this.snipeURL, "/hardware/audit/overdue"), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));
		if (result.status == "error") throw (JSON.stringify(result, null, " "));

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}

	// DELETE

	/**
	 * Delete specific asset by ID
	 * @param id Asset ID
	 */
	async delete(id: number) {
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));
		if (result.status == "error") throw (JSON.stringify(result, null, " "));

		return `Asset ${id} deleted`;
	}

	// POST, PATCH, PUT

	/**
	 * Make new asset
	 */
	async new(options: HardwarePostOptions) {
		const res = await fetch(getApiURL(this.snipeURL, "/hardware"), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(options)
		});
		const result = await res.json();
		if (res.status !== 200) throw (JSON.stringify(result, null, " "));
		if (result.status == "error") throw (JSON.stringify(result, null, " "));
		if (result.status == "success") {
			return result.payload;
		} else {
			return result;
		}
	}
}
