const { setHeadlessWhen, setWindowSize } = require("@codeceptjs/configure");

// turn on headless mode when running with HEADLESS=true environment variable
// HEADLESS=true npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// set window size for any helper: Puppeteer, Playwright, TestCafe
setWindowSize(1280, 720);

exports.config = {
	tests: "./tests/e2e/**/*.test.ts",
	output: "./output",
	helpers: {
		Playwright: {
			url: process.env.BASE_URL || "http://localhost:3000",
			show: !process.env.HEADLESS,
			browser: "chromium",
			waitForTimeout: 60000,
			waitForAction: 1000,
			waitForNavigation: "networkidle",
			restart: false,
			keepCookies: false,
			keepBrowserState: false,
		},
	},
	include: {},
	bootstrap: null,
	mocha: {},
	name: "web",
	plugins: {
		pauseOnFail: {},
		retryFailedStep: {
			enabled: true,
		},
		tryTo: {
			enabled: true,
		},
		screenshotOnFail: {
			enabled: true,
		},
	},
};
