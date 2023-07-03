import { BeforeSpec, AfterSpec, DataStoreFactory } from "gauge-ts";
import { BrowserContext, chromium, Page } from "playwright";
import { isHeadless } from "./config";

export let context: BrowserContext;
export let page: Page;

export class Browser {
	@BeforeSpec()
	public async beforeSpec() {
		const start = Date.now();
		DataStoreFactory.getSpecDataStore().put("startTime", start);
		const browser = await chromium.launch({ headless: isHeadless });
		context = await browser.newContext({
			ignoreHTTPSErrors: true,
			acceptDownloads: true,
			timezoneId: "Asia/Tokyo",
		});
		page = await context.newPage();
		page.setDefaultTimeout(10000);
	}

	@AfterSpec()
	public async afterSpec() {
		const start: number = DataStoreFactory.getSpecDataStore().get("startTime");
		const end = Date.now();
		console.log(
			"Total time taken for this spec: ",
			(end - start) / 1000,
			"seconds",
		);
		page.close();
	}
}
