import { IHardware } from '../Interfaces';

export class Hardware {
  public id: number;

  public name?: string;

  public asset_tag: string;

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

  public user_can_checkout?: boolean;

  public custom_fields?: string[];

  public available_actions?: any;

  constructor(hardware?: IHardware) {
    this.id = hardware!.id;
    this.name = hardware!.name;
    this.asset_tag = hardware!.asset_tag;
    this.serial = hardware!.serial;
    this.model = hardware!.model;
    this.model_number = hardware!.model_number;
    this.eol = hardware!.eol;
    this.status_label = hardware!.status_label;
    this.category = hardware!.category;
    this.manufacturer = hardware!.manufacturer;
    this.supplier = hardware!.supplier;
    this.notes = hardware!.notes;
    this.order_number = hardware!.order_number;
    this.compAny = hardware!.compAny;
    this.location = hardware!.location;
    this.rtd_location = hardware!.rtd_location;
    this.image = hardware!.image;
    this.assigned_to = hardware!.assigned_to;
    this.warranty_months = hardware!.warranty_months;
    this.warranty_expires = hardware!.warranty_expires;
    this.created_at = hardware!.created_at;
    this.updated_at = hardware!.updated_at;
    this.last_audit_date = hardware!.last_audit_date;
    this.next_audit_date = hardware!.next_audit_date;
    this.deleted_at = hardware!.deleted_at;
    this.purchase_date = hardware!.purchase_date;
    this.last_checkout = hardware!.last_checkout;
    this.expected_checkin = hardware!.expected_checkin;
    this.purchase_cost = hardware!.purchase_cost;
    this.checkin_counter = hardware!.checkin_counter;
    this.checkout_counter = hardware!.checkout_counter;
    this.requests_counter = hardware!.requests_counter;
    this.user_can_checkout = hardware!.user_can_checkout;
    this.custom_fields = hardware!.custom_fields;
    this.available_actions = hardware!.available_actions;
  }
}
