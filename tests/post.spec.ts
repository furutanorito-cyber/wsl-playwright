import { appendFileSync } from "node:fs";
import test from "@playwright/test";
import type { Locator } from "@playwright/test";
import env from "../config.ts";

test("Post", async ({ browser }) => {
	const jsonString = env.X_COOKIES;
	const jsonData = JSON.parse(jsonString.replace(/\\n/g, "\n"));

	const context = await browser.newContext({
		httpCredentials: {
			username: env.BLOG_USERNAME,
			password: env.BLOG_PASSWORD,
		},
		storageState: jsonData,
	});
	const page = await context.newPage();

	//
	//
	//
	let articleLength = 0;
	let getDate = env.GET_DATE;
	// let getDate = "2024-12-15";
	let cidElements: Locator;

	while (articleLength === 0) {
		await page.goto(`${env.BLOG_URL}/post/list/${getDate}`);
		cidElements = await page.locator("[id='cid']");
		articleLength = await cidElements.count();

		if (articleLength === 0) {
			const currentDate = new Date(getDate);
			currentDate.setDate(currentDate.getDate() + 1);
			getDate = currentDate.toISOString().split("T")[0];
		}
	}

	const cidElement = cidElements.nth(env.POST_INDEX);
	const cid = await cidElement.textContent();

	const idElement = page.locator("[id='id']").nth(env.POST_INDEX);
	const postId = idElement.textContent();
	const articleUrl = `${env.BLOG_URL}/article/${env.POST_INDEX}`;

	if (env.GITHUB_OUTPUT) {
		appendFileSync(env.GITHUB_OUTPUT, `TOTAL_POSTS=${articleLength - 1}`);
		appendFileSync(env.GITHUB_OUTPUT, `GET_DATE=${getDate}`);
	}

	//
	//
	//
});
