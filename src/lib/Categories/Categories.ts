import { ICategories } from "../Interfaces";

export class Categories {
	public id?: number;
	public name?: string;
	public image?: string;
	public category_type?: string;
	public eula?: boolean;
	public checkin_email?: boolean;
	public require_acceptance?: boolean;
	public assets_count?: number;
	public accessories_count?: number;
	public consumables_count?: number;
	public components_count?: number;
	public licenses_count?: number;
	public created_at?: any;
	public avaible_actions?: any;
	public updated_at?: any;
	constructor(categories?: ICategories) {
		this.id = categories!.id;
		this.name = categories!.name;
		this.image = categories!.image;
		this.category_type = categories!.category_type;
		this.eula = categories!.eula;
		this.checkin_email = categories!.checkin_email;
		this.require_acceptance = categories!.require_acceptance;
		this.assets_count = categories!.assets_count;
		this.accessories_count = categories!.accessories_count;
		this.consumables_count = categories!.consumables_count;
		this.components_count = categories!.components_count;
		this.licenses_count = categories!.licenses_count;
		this.created_at = categories!.created_at;
		this.updated_at = categories!.updated_at;
		this.avaible_actions = categories!.avaible_actions;
	}
}