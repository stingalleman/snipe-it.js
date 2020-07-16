import { IHardware } from "../Interfaces";

export class Hardware {
	public id?: number;
	public name?: string;
	public asset_tag?: string;
	public serial?: any;
	public model?: any;
	public model_number?: any;
	public eol?: any;
	public status_label?: any;
	public category?: any;
	public manufacturer?: any;
	public supplier?: any;
	public notes?: any;
	public order_number?: any;
	public compAny?: any;
	public location?: any;
	public rtd_location?: any;
	public image?: any;
	public assigned_to?: any;
	public warranty_months?: string;
	public warranty_expires?: string;
	public created_at?: any;
	public updated_at?: any;
	public last_audit_date?: any;
	public next_audit_date?: any;
	public deleted_at?: any;
	public purchase_date?: any;
	public last_checkout?: any;
	public expected_checkin?: any;
	public purchase_cost?: any;
	public checkin_counter?: number;
	public checkout_counter?: number;
	public requests_counter?: number;
	public user_can_checkout?: Boolean;
	public custom_fields?: string[];
	public available_actions?: any;
	constructor(hardware?: IHardware) {
	  this.id = hardware!.id;
	  this.asset_tag = hardware!.asset_tag;
	  // this.appointmentInstance = hardware!.appointmentInstance;
	}
}