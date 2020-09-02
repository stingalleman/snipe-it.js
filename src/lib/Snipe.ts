import { HardwareManager } from "./Hardware";
import { CategoriesManager } from "./Categories";
import { StatusLabelManager } from "./StatusLabels";
import { LocationManager } from "./Locations";

export class Snipe {
	hardware: HardwareManager;
	categories: CategoriesManager;
	statuslabels: StatusLabelManager;
	locations: LocationManager;

	constructor(snipeURL: string, accessToken: string) {
		this.hardware = new HardwareManager(snipeURL, accessToken);
		this.categories = new CategoriesManager(snipeURL, accessToken);
		this.statuslabels = new StatusLabelManager(snipeURL, accessToken);
		this.locations = new LocationManager(snipeURL, accessToken);
	}

	// public static init(snipeURL: string, accessToken: string) {
	// 	return new Snipe(snipeURL, accessToken);
	// }
}