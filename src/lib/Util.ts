export const getApiURL = (snipeURL: string, slug: string) => {
	return `${snipeURL}/api/v1${slug}`;
};