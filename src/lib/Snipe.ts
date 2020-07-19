import { HardwareManager } from "./Hardware";
import { CategoriesManager } from "./Categories";

export class Snipe {
	hardware: HardwareManager;
	categories: CategoriesManager;

	constructor(private snipeURL: string, private accessToken: string) {
		this.hardware = new HardwareManager(snipeURL, accessToken);
		this.categories = new CategoriesManager(snipeURL, accessToken);
	}

	// public static init(snipeURL: string, accessToken: string) {
	// 	return new Snipe(snipeURL, accessToken);
	// }
}