import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IStatusLabel, StatusLabelOptions } from "../Interfaces";
import { StatusLabel } from "./StatusLabel";

export class StatusLabelManager extends Manager {

	async get(options: StatusLabelOptions) {
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
}