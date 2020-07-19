import { URLSearchParams } from "url";

export const getApiURL = (snipeURL: string, slug: string, options?: any) => {
	// Check for / at end
	if (slug.charAt(slug.length - 1) == "/") throw("/ at end of API endpoint! pls fix");

	return `${snipeURL}/api/v1${slug}?${new URLSearchParams(options).toString()}`;
};