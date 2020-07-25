export interface Response<A> {
	total: number,
	messages: any,
	rows: []
}

export interface IHardware {
	id?: number,
	name?: string,
	asset_tag?: string,
	serial?: any,
	model?: any,
	model_number?: any,
	eol?: any,
	status_label?: {
		id?: number,
		name?: string,
		status_type?: string,
		status_meta?: string
	},
	category?: any,
	manufacturer?: any,
	supplier?: any,
	notes?: any,
	order_number?: any,
	compAny?: any,
	location?: any,
	rtd_location?: any,
	image?: any,
	assigned_to?: any,
	warranty_months?: string,
	warranty_expires?: string,
	created_at?: any,
	updated_at?: any,
	last_audit_date?: any,
	next_audit_date?: any,
	deleted_at?: any,
	purchase_date?: any,
	last_checkout?: any,
	expected_checkin?: any,
	purchase_cost?: any,
	checkin_counter?: number,
	checkout_counter?: number,
	requests_counter?: number,
	user_can_checkout?: boolean,
	custom_fields?: string[],
	available_actions?: any
}

export interface HardwarePostOptions {
	asset_tag: string,
	status_id: number,
	model_id: number,
	name?: string
}

export interface HardwareOptions {
	limit?: number,
	offset?: number,
	search?: string,
	order_number?: string,
	sort?: string,
	model_id?: number,
	category_id?: number,
	company_id?: number,
	location_id?: number,
	status?: string,
	status_id?: string
}

export interface HardwareUpdateOptions {
	asset_tag?: string,
	notes?: string,
	status_id?: number,
	model_id?: number,
	last_checkout?: Date,
	assigned_to?: number,
	company_id?: number,
	serial?: string,
	order_number?: string,
	warranty_months?: number,
	purchase_cost?: number,
	purchase_date?: Date,
	requestable?: boolean,
	archived?: boolean,
	rtd_location_id?: number,
	name?: string
}

export interface checkoutOptions {
	assigned_user?: number,
	assigned_asset?: number,
	assigned_location?: number,
	expected_checkin?: Date,
	checkout_at?: Date,
	name?: string,
	note?: number,
	checkout_to_type: "user" | "asset" | "location"
}

export interface ICategories {
	id?: number,
	name?: string,
	image?: string,
	category_type?: string,
	eula?: boolean,
	checkin_email?: boolean,
	require_acceptance?: boolean,
	assets_count?: number,
	accessories_count?: number,
	consumables_count?: number,
	components_count?: number,
	licenses_count?: number,
	avaible_actions?: any,
	created_at?: any,
	updated_at?: any
}

export interface CategoriesOptions {
	limit?: number,
	offset?: number,
	search?: string,
	sort?: string,
	order?: string
}

export interface NewCategoriesOptions {
	name: string,
	category_type: "asset" | "accessory" | "consumable" | "component",
	use_default_eula?: boolean,
	require_acceptance?: boolean,
	checkin_email?: boolean
}

export interface IStatusLabel {
	id?: number,
	name?: string,
	type?: string,
	color?: string,
	show_in_nav?: boolean,
	assets_count?: number,
	notes?: string,
	created_at?: any,
	updated_at?: any,
	available_actions?: any
}

export interface StatusLabelGetOptions {
	limit?: number,
	offset?: number,
	search?: string,
	sort?: string,
	order?: string
}

export interface StatusLabelOptions {
	name: string,
	deployable: boolean,
	pending: boolean,
	archived: boolean
}