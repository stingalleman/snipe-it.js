export interface Response<A> {
	total?: number,
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
	status_label?: any,
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