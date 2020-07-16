import { HardwareManager } from "./Hardware/HardwareManager";

export class Snipe {
  hardware: HardwareManager;

  constructor(private snipeURL: string, private accessToken: string) {

  	this.hardware = new HardwareManager(snipeURL, accessToken);
  }

  public getSnipe() {
  	return this.snipeURL;
  }

  public getApiToken() {
  	return this.accessToken;
  }

  public static getAPI(snipeURL: string, accessToken: string) {
  	return new Snipe(snipeURL, accessToken);
  }
}