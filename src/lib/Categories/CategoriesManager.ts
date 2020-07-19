import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, ICategories, CategoriesOptions } from "../Interfaces";
import { Categories } from "./Categories";

// Error:
//		const result = await res.json();
//		if (await result.status == "error") throw(`Error on checkin:\n${JSON.stringify(result, null, " ")}`);
export class CategoriesManager extends Manager {

	/**
 	* Return list of categories
  * @param options Options to pass to the API
 */
	async get(options?: CategoriesOptions) {
		options = Object.assign({ limit: 50 }, options || {});
		const res = await fetch(getApiURL(this.snipeURL, "/categories", options), {
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

		const json: Response<ICategories> = result;
		return json.rows.map(categories => new Categories(categories));
	}

	/**
 	* Return category ID
  * @param id Category ID
 */
	async getID(id: number) {
		const res = await fetch(getApiURL(this.snipeURL, `/categories/${id}`), {
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

		const json: ICategories = result;
		return new Categories(json);
	}
}