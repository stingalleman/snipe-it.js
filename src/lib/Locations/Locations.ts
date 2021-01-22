import { IStatusLabel } from '../Interfaces';

export class Locations {
  // public id: number;
  public id?: number;

  public name?: string;

  public type?: string;

  public color?: string;

  public show_in_nav?: boolean;

  public assets_count?: number;

  public notes?: string;

  public created_at?: any;

  public updated_at?: any;

  public available_actions?: any;

  constructor(statuslabel?: IStatusLabel) {
    this.id = statuslabel!.id;
    this.name = statuslabel!.name;
    this.type = statuslabel!.type;
    this.color = statuslabel!.color;
    this.show_in_nav = statuslabel!.show_in_nav;
    this.assets_count = statuslabel!.assets_count;
    this.notes = statuslabel!.notes;
    this.created_at = statuslabel!.created_at;
    this.updated_at = statuslabel!.updated_at;
    this.available_actions = statuslabel!.available_actions;
  }
}
