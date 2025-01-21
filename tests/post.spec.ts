import { appendFileSync } from "node:fs";
import test from "@playwright/test";
import env from "../config.ts";
import type { ApiType } from "../types/apiType.ts";
import { hiddenWords } from "../utilities/hiddenWords.ts";

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
	await page.goto(`${env.BLOG_URL}/post/list/${env.GET_DATE}`);
	const cidElements = await page.locator("[id='cid']");

	const cidElement = cidElements.nth(env.POST_INDEX);
	const cid = await cidElement.textContent();
	const idElement = await page.locator("[id='id']").nth(env.POST_INDEX);
	const articleId = await idElement.textContent();

	const articleUrl = `${env.BLOG_URL}/article/${articleId}`;

	//
	//
	const requestUrl = `${env.API_BASE_URL}/ItemList?api_id=${env.API_ID}&affiliate_id=${env.API_AFFILIATE_ID}&site=${env.API_SERVICE}&cid=${cid}`;
	const apiResponse = await fetch(requestUrl);
	const apiJson: ApiType = await apiResponse.json();
	const productItem = apiJson.result.items[0];
	const affiliateUrl = productItem.affiliateURL;

	const actress: string[] =
		productItem.iteminfo.actress?.map((item) => item.name).slice(0, 2) || [];
	const genre: string[] =
		productItem.iteminfo.genre
			?.filter((item) => !hiddenWords.includes(item.name))
			?.map((item) => item.name) || [];
	const hushTug = [...actress, ...genre, env.BLOG_NAME];

	//
	//
	const postImageUrls: string[] =
		productItem.sampleImageURL.sample_l.image.length > 0
			? Array.from(
					{ length: 4 },
					(_, index) => productItem.sampleImageURL.sample_l.image[index],
				)
			: Array.from(
					{ length: 4 },
					(_, index) => productItem.sampleImageURL.sample_s.image[index],
				);

	const imageBuffers = await Promise.all(
		postImageUrls.map(async (item) => {
			const response = await fetch(item);
			const arrayBuffer = await response.arrayBuffer();
			const imageBuffer = Buffer.from(arrayBuffer);

			return imageBuffer;
		}),
	);

	const setImages = imageBuffers.map((imageBuffer) => {
		const setImage = {
			name: "image.jpg",
			mimeType: "image/jpg",
			buffer: imageBuffer,
		};

		return setImage;
	});

	//
	//
	await page.goto(`https://x.com/${env.X_USERNAME}`);

	await page.getByTestId("SideNav_NewTweet_Button").click();
	await page.waitForURL("https://x.com/compose/post");

	const fileChooserPromise = page.waitForEvent("filechooser");
	await page.getByTestId("ScrollSnap-List").getByRole("button").nth(0).click();
	const fileChooser = await fileChooserPromise;
	await fileChooser.setFiles(setImages);
	await page.getByTestId("attachments").locator("img").first().waitFor();

	await page
		.getByTestId("tweetTextarea_0")
		.fill(
			`無料でこの動画を視聴したい方はこちらから:\n${articleUrl}\n\n完全版動画はこちら:\n${affiliateUrl}\n\n#${hushTug.join(
				" #",
			)}`,
		);

	await page.getByTestId("tweetButton").press("Control+Enter");
	await page.waitForURL(`https://x.com/${env.X_USERNAME}`);

	//
	//
	if (env.GITHUB_OUTPUT) {
		let nextDate: string;
		let nextIndex: number;

		await page.goto(`${env.BLOG_URL}/post/list/${env.GET_DATE}`);
		let cidElements = await page.locator("[id='cid']");
		let totalArticles: number = await cidElements.count();

		//
		//
		if (Number(env.POST_INDEX) === totalArticles - 1) {
			let preFormatDate = new Date(env.GET_DATE);
			preFormatDate.setDate(preFormatDate.getDate() + 1);
			nextDate = preFormatDate.toISOString().split("T")[0];

			await page.goto(`${env.BLOG_URL}/post/list/${nextDate}`);
			cidElements = await page.locator("[id='cid']");
			totalArticles = await cidElements.count();

			while (totalArticles === 0) {
				preFormatDate = new Date(nextDate);
				preFormatDate.setDate(preFormatDate.getDate() + 1);
				nextDate = preFormatDate.toISOString().split("T")[0];

				await page.goto(`${env.BLOG_URL}/post/list/${nextDate}`);
				cidElements = await page.locator("[id='cid']");
				totalArticles = await cidElements.count();

				if (totalArticles > 0) {
					break;
				}
			}

			nextIndex = 0;

			//
			//
		} else {
			nextDate = env.GET_DATE;
			nextIndex = Number(env.POST_INDEX) + 1;
		}

		//
		//
		appendFileSync(env.GITHUB_OUTPUT, `NEXT_DATE=${nextDate}\n`);
		appendFileSync(env.GITHUB_OUTPUT, `NEXT_INDEX=${nextIndex}\n`);
	}

	//
	//
	//
});
