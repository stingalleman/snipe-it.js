import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IHardware, HardwareOptions, checkoutOptions, HardwarePostOptions, HardwareUpdateOptions } from "../Interfaces";
import { Hardware } from "./Hardware";

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

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}


	/**
	 * Get specific asset by Asset ID
	 * @param id Asset ID
	 */
	async getID(id: number) {
		if(!id) return "id required!";
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();

		const json: IHardware = result;
		return new Hardware(json);
	}

	/**
	 * Get specific asset by Asset Tag
	 * @param id Asset ID
	 */
	async getAssetTag(asset_tag: string) {
		if(!asset_tag) return "asset_tag required!";
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/bytag/${asset_tag}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();

		const json: IHardware = result;
		return new Hardware(json);
	}

	/**
	 * Get specific asset by Serial
	 * @param id Asset ID
	 */
	async getSerial(serial: string) {
		if(!serial) return "serial required!";
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/byserial/${serial}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();

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
		if(!id) return "id required!";
		const data = {
			note: note,
			location_id: location_id
		};
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}/checkin`), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const result = await res.json();
		return result;
	}

	/**
	 * Checkout a asset
	 * @param id Asset ID to checkin
	 * @param options Options to pass to the API
	 */
	async checkout(id: number, options: checkoutOptions) {
		if(!id) return "id required!";
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

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}

	// DELETE

	/**
	 * Delete specific asset by ID
	 * @param id Asset ID
	 */
	async delete(id: number) {
		if(!id) return "id required!";
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			}
		});
		const result = await res.json();

		return `Asset ${id} deleted`;
	}

	// POST, PATCH, PUT

	/**
	 * Make new asset
	 */
	async new(options: HardwarePostOptions) {
		if(!options.asset_tag || !options.model_id || !options.status_id) return "missing fields!";
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
		if (result.status == "success") {
			const json: IHardware = result.payload;
			return new Hardware(json);
		} else {
			return result;
		}
	}

	/**
	 * Update an asset
	 * @param options Options to pass to the API
	 */
	async update(id: number, options: HardwareUpdateOptions) {
		if(!id) return "id required!";
		const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
			method: "PATCH",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(options)
		});
		const result = await res.json();
		if (result.status == "success") {
			const json: IHardware = result.payload;
			return new Hardware(json);
		} else {
			return result;
		}
	}

	async audit(asset_tag: string, location_id?: number) {
		if(!asset_tag) return "asset_tag required!";

		const data = {
			asset_tag: asset_tag,
			location_id: location_id
		};
		const res = await fetch(getApiURL(this.snipeURL, "/hardware/audit"), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		});
		const result = await res.json();
		return result;
	}
}
