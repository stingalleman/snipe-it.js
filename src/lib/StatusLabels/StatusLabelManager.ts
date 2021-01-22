import fetch from 'node-fetch';
import { Manager } from '../Manager';
import { getApiURL } from '../Util';
import {
  Response,
  IStatusLabel,
  StatusLabelGetOptions,
  StatusLabelOptions,
  IHardware
} from '../Interfaces';
import { StatusLabel } from './StatusLabel';

import { Hardware } from '../Hardware/Hardware';

export class StatusLabelManager extends Manager {
  /**
   * Get status labels.
   * @param options Options to pass to the API.
   */
  async get(options: StatusLabelGetOptions) {
    options = { limit: 50, ...(options || {}) };

    const res = await fetch(getApiURL(this.snipeURL, '/statuslabels', options), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();

    const json: Response<IStatusLabel> = result;
    return json.rows.map((statuslabel) => new StatusLabel(statuslabel));
  }

  /**
   * Fetch specific status label.
   * @param id ID of status label to fetch.
   */
  async getID(id: number) {
    const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();

    const json: IStatusLabel = result;
    return new StatusLabel(json);
  }

  /**
   * Make new statuslabel.
   * @param name Name of status label.
   * @param type Type of status label: deployable, pending or archived.
   */
  async new(name: string, type?: 'deloyable' | 'pending' | 'archived') {
    const body = {
      name,
      type
    };
    const res = await fetch(getApiURL(this.snipeURL, '/statuslabels'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await res.json();
    return result;
  }

  /**
   * Edit a status label.
   * @param id ID of status label to update.
   * @param options Options to pass to the API.
   */
  async update(id: number, options: StatusLabelOptions) {
    const body = {
      id,
      name: options.name,
      deployable: options.deployable,
      pending: options.pending,
      archived: options.archived
    };

    const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const result = await res.json();

    return result;
  }

  /**
   * Delete a status label.
   * @param id ID of status label to delete.
   */
  async delete(id: number) {
    const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();

    return result;
  }

  /**
   * View assets with a specific status label.
   * @param id ID of status label to fetch.
   */
  async getAssets(id: number) {
    const res = await fetch(getApiURL(this.snipeURL, `/statuslabels/${id}/assetlist`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();

    const json: Response<IHardware> = result;
    return json.rows.map((hardware) => new Hardware(hardware));
  }
}
