import fetch from 'node-fetch';
import { Manager } from '../Manager';
import { getApiURL } from '../Util';
import { Response, ICategories, CategoriesOptions, NewCategoriesOptions } from '../Interfaces';
import { Categories } from './Categories';

export class CategoriesManager extends Manager {
  /**
   * Return list of categories.
   * @param options Options to pass to the API.
   */
  async get(options?: CategoriesOptions): Promise<Categories[]> {
    const parsedOptions = { limit: 50, ...(options || {}) };
    const res = await fetch(getApiURL(this.snipeURL, '/categories', parsedOptions), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    if ((await result.status) === 'error') throw JSON.stringify(result, null, ' ');
    if (res.status !== 200) throw JSON.stringify(result, null, ' ');

    const json: Response<ICategories> = result;
    return json.rows.map((categories) => new Categories(categories));
  }

  /**
   * Return category ID.
   * @param id Category ID.
   */
  async getID(id: number): Promise<Categories> {
    const res = await fetch(getApiURL(this.snipeURL, `/categories/${id}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();
    if (res.status !== 200) throw JSON.stringify(result, null, ' ');
    if (result.status === 'error') throw JSON.stringify(result, null, ' ');

    const json: ICategories = result;
    return new Categories(json);
  }

  async new(options: NewCategoriesOptions): Promise<Categories> {
    const res = await fetch(getApiURL(this.snipeURL, '/categories'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    const result = await res.json();

    return result;
  }
}
