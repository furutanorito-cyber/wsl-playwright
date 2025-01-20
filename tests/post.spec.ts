import test from "@playwright/test";
import env from "../config.ts";

test("Post", async ({ browser }) => {
	const jsonString = env.X_COOKIES;
	const jsonData = JSON.parse(jsonString.replace(/\\n/g, "\n"));

	const context = await browser.newContext({
		storageState: jsonData,
	});
	const page = await context.newPage();

	await page.goto(`https://x.com/${env.X_USERNAME}`);
	await page.waitForTimeout(10000);
	const title = await page.title();

	console.log(title);
});
