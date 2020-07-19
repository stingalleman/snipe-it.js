import { Manager } from "../Manager";
import fetch from "node-fetch";
import { getApiURL } from "../Util";
import { Response, IHardware, HardwareOptions } from "../Interfaces";
import { Hardware } from "./Hardware";

// Error:
//		const result = await res.json();
//		if (await result.status == "error") throw(`Error on checkin:\n${JSON.stringify(result, null, " ")}`);
export class HardwareManager extends Manager {

 /**
 	* Return list of assets
  * @param options options - Options to pass to the API
 */
  async get(options?: HardwareOptions) {
    options = Object.assign({ limit: 50 }, options || {});
    const res = await fetch(getApiURL(this.snipeURL, `/hardware?limit=${options.limit}`), {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.apiToken}`,
        "Accept": "application/json",
        "Content-Type": "Content-Type"
      }
    });
    const result = await res.json();
    if (await result.status == "error") throw (JSON.stringify(result, null, " "));
    if (res.status !== 200) throw (JSON.stringify(result, null, " "));

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
    if (result.status == "error") throw (JSON.stringify(result, null, " "));
    if (res.status !== 200) throw (JSON.stringify(result, null, " "));

    const json: IHardware = result;
    return new Hardware(json);
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
    const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}/checkin`), {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiToken}`,
        "Accept": "application/json",
        "Content-Type": "Content-Type"
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
}