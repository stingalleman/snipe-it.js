import fetch from 'node-fetch';
import { Manager } from '../Manager';
import { getApiURL } from '../Util';
import {
  Response,
  IHardware,
  HardwareOptions,
  CheckoutOptions,
  HardwarePostOptions,
  HardwareUpdateOptions
} from '../Interfaces';
import { Hardware } from './Hardware';

export class HardwareManager extends Manager {
  // GET

  /**
   * Return list of assets.
   * @param options Options - Options to pass to the API.
   */
  async get(options?: HardwareOptions): Promise<Hardware[]> {
    const parsedOptions = { limit: 50, ...(options || {}) };
    const res = await fetch(getApiURL(this.snipeURL, '/hardware', parsedOptions), {
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

  /**
   * Get specific asset by Asset ID.
   * @param id Asset ID.
   */
  async getID(id: number): Promise<Hardware> {
    const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();

    const json: IHardware = result;
    return new Hardware(json);
  }

  /**
   * Get specific asset by Asset Tag.
   * @param asset_tag Asset tag.
   */
  async getAssetTag(asset_tag: string): Promise<Hardware> {
    const res = await fetch(getApiURL(this.snipeURL, `/hardware/bytag/${asset_tag}`), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const result = await res.json();

    const json: IHardware = result;
    return new Hardware(json);
  }

  /**
   * Get specific asset by Serial.
   * @param serial Asset tag.
   */
  async getSerial(serial: string): Promise<Hardware[]> {
    const res = await fetch(getApiURL(this.snipeURL, `/hardware/byserial/${serial}`), {
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

  /**
   * Checkin a asset.
   * @param id Asset ID.
   * @param note Note.
   * @param location_id Location ID.
   */
  async checkin(id: number, note?: string, location_id?: number): Promise<Hardware> {
    const data = {
      note,
      location_id
    };
    const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}/checkin`), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
  }

  /**
   * Checkout a asset.
   * @param id Asset ID to checkin.
   * @param options Options to pass to the API.
   */
  async checkout(id: number, options: CheckoutOptions): Promise<Hardware> {
    const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}/checkout`), {
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

  /**
   * Return a list of assets that are due for audit soon.
   */
  async getAuditDue(): Promise<Hardware[]> {
    const res = await fetch(getApiURL(this.snipeURL, '/hardware/audit/due'), {
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

  /**
   * Return a list of assets that are overdue for audit.
   */
  async getOverdueAudit(): Promise<Hardware[]> {
    const res = await fetch(getApiURL(this.snipeURL, '/hardware/audit/overdue'), {
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

  // DELETE

  /**
   * Delete specific asset by ID.
   * @param id Asset ID.
   */
  async delete(id: number): Promise<void> {
    await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  // POST, PATCH, PUT

  /**
   * Make new asset.
   * @param options
   */
  async new(options: HardwarePostOptions): Promise<Hardware> {
    // if(!options.asset_tag || !options.model_id || !options.status_id) return "missing fields!";
    const res = await fetch(getApiURL(this.snipeURL, '/hardware'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    const result = await res.json();
    if (result.status === 'success') {
      const json: IHardware = result.payload;
      return new Hardware(json);
    }
    return result;
  }

  /**
   * Update an asset.
   * @param id
   * @param options Options to pass to the API.
   */
  async update(id: number, options: HardwareUpdateOptions): Promise<Hardware> {
    const res = await fetch(getApiURL(this.snipeURL, `/hardware/${id}`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    });
    const result = await res.json();
    if (result.status === 'success') {
      const json: IHardware = result.payload;
      return new Hardware(json);
    }
    return result;
  }

  /**
   * Mark an asset as audited.
   * @param asset_tag Asset tag of asset to audit.
   * @param location_id ID of location.
   */
  async audit(asset_tag: string, location_id?: number): Promise<Hardware> {
    const data = {
      asset_tag,
      location_id
    };
    const res = await fetch(getApiURL(this.snipeURL, '/hardware/audit'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    return result;
  }
}
