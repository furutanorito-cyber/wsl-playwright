import { config } from "dotenv";

config();

interface EnvConfig {
	X_EMAIL: string;
	X_USERNAME: string;
	X_PASSWORD: string;
	MFA_SECRET_KEY: string;
	X_COOKIES: string;
	BLOG_URL: string;
	BLOG_USERNAME: string;
	BLOG_PASSWORD: string;
	GET_DATE: string;
	POST_INDEX: string;
	GITHUB_OUTPUT: string;
}

const env: EnvConfig = {
	X_EMAIL: process.env.X_EMAIL,
	X_USERNAME: process.env.X_USERNAME,
	X_PASSWORD: process.env.X_PASSWORD,
	X_COOKIES: process.env.X_COOKIES,

	MFA_SECRET_KEY: process.env.MFA_SECRET_KEY,

	BLOG_URL: process.env.BLOG_URL,
	BLOG_USERNAME: process.env.BLOG_USERNAME,
	BLOG_PASSWORD: process.env.BLOG_PASSWORD,

	GET_DATE: process.env.GET_DATE,
	POST_INDEX: process.env.POST_INDEX,

	GITHUB_OUTPUT: process.env.GITHUB_OUTPUT,
};

export default env;
