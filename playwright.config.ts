import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./tests",
	timeout: 5 * 60 * 1000,
	projects: [
		{ name: "setup", testMatch: /.*\.setup\.ts/ },
		{
			name: "chromium",
			use: {
				...devices["Desktop Chrome"],
			},
		},
	],
});
