import fetch from 'node-fetch';
import { Manager } from '../Manager';
import { getApiURL } from '../Util';
import { LocationOptions, ILocation, Response } from '../Interfaces';
import { Locations } from './Locations';

export class LocationManager extends Manager {
  /**
   * Get locations.
   * @param options Options to pass to the API.
   */
  async get(options?: LocationOptions): Promise<Locations[]> {
    const parsedOptions = { limit: 50, ...(options || {}) };

    const res = await fetch(getApiURL(this.snipeURL, '/locations', parsedOptions), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    const json: Response<ILocation> = result;
    return json.rows.map((location) => new Locations(location));
  }

  /**
   * Fetch specific status label.
   * @param id ID of status label to fetch.
   */
  // async getID(id: number) {
  // 	const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}`), {
  // 		method: "GET",
  // 		headers: {
  // 			"Authorization": `Bearer ${this.apiToken}`,
  // 			"Accept": "application/json",
  // 			"Content-Type": "application/json"
  // 		} });
  // 	const result = await res.json();

  // 	const json: IStatusLabel = result;
  // 	return new StatusLabel(json);
  // }
}
