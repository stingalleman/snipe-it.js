import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IStatusLabel, StatusLabelGetOptions, StatusLabelOptions } from "../Interfaces";
import { StatusLabel } from "./StatusLabel";

import { IHardware } from "../Interfaces";
import { Hardware } from "../Hardware/Hardware";

export class StatusLabelManager extends Manager {

	async get(options: StatusLabelGetOptions) {
		options = Object.assign({ limit: 50 }, options || {});

		const res = await fetch(getApiURL(this.snipeURL, "/statuslabels", options), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			} });
		const result = await res.json();

		const json: Response<IStatusLabel> = result;
		return json.rows.map(statuslabel => new StatusLabel(statuslabel));
	}

	async getID(id: number) {
		const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			} });
		const result = await res.json();

		const json: IStatusLabel = result;
		return new StatusLabel(json);
	}

	async new(name: string, type?: "deloyable" | "pending" | "archived") {
		const body = {
			name: name,
			type: type
		};
		const res = await fetch(getApiURL(this.snipeURL, "/statuslabels"), {
			method: "POST",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
		const result = await res.json();
		return result;
	}

	async update(id: number, options: StatusLabelOptions) {
		const body = {
			id: id,
			name: options.name,
			deployable: options.deployable,
			pending: options.pending,
			archived: options.archived
		};

		const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}`), {
			method: "PATCH",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
		const result = await res.json();

		return result;
	}

	async delete(id: number) {
		const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}`), {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
		});
		const result = await res.json();

		return result;
	}

	async getAssets(id: number) {
		const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}/assetlist`), {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${this.apiToken}`,
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
		});
		const result = await res.json();

		const json: Response<IHardware> = result;
		return json.rows.map(hardware => new Hardware(hardware));
	}
}