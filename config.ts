import { config } from "dotenv";

config();

interface EnvConfig {
	X_EMAIL: string;
	X_USERNAME: string;
	X_PASSWORD: string;
	X_COOKIES: string;

	MFA_SECRET_KEY: string;

	DEV_URL: string;

	BLOG_URL: string;
	BLOG_USERNAME: string;
	BLOG_PASSWORD: string;
	BLOG_NAME: string;

	API_BASE_URL: string;
	API_ID: string;
	API_AFFILIATE_ID: string;
	API_SERVICE: string;

	POST_INDEX: string;
	GET_DATE: string;
	GITHUB_OUTPUT: string;
}

const env: EnvConfig = {
	X_EMAIL: process.env.X_EMAIL,
	X_USERNAME: process.env.X_USERNAME,
	X_PASSWORD: process.env.X_PASSWORD,
	X_COOKIES: process.env.X_COOKIES,

	MFA_SECRET_KEY: process.env.MFA_SECRET_KEY,

	DEV_URL: process.env.DEV_URL,

	BLOG_URL: process.env.BLOG_URL,
	BLOG_USERNAME: process.env.BLOG_USERNAME,
	BLOG_PASSWORD: process.env.BLOG_PASSWORD,
	BLOG_NAME: process.env.BLOG_NAME,

	API_BASE_URL: process.env.API_BASE_URL,
	API_ID: process.env.API_ID,
	API_AFFILIATE_ID: process.env.API_AFFILIATE_ID,
	API_SERVICE: process.env.API_SERVICE,

	GET_DATE: process.env.GET_DATE,
	POST_INDEX: process.env.POST_INDEX,

	GITHUB_OUTPUT: process.env.GITHUB_OUTPUT,
};

export default env;
