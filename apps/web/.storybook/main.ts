import path from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-vitest",
		"@storybook/addon-a11y",
		"@storybook/addon-docs",
		"@storybook/addon-onboarding",
	],
	framework: {
		name: "@storybook/nextjs",
		options: {},
	},
	webpackFinal: async (config) => {
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			"@": path.resolve(__dirname, "../src"),
			"styled-system": path.resolve(__dirname, "../styled-system"),
			"styled-system/css": path.resolve(__dirname, "../styled-system/css"),
		};
		return config;
	},
};
export default config;
