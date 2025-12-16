/// <reference types="codeceptjs" />

declare namespace CodeceptJS {
	interface SupportObject {
		I: I;
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		current: any;
	}
	interface Methods extends Playwright {}
	interface I extends WithTranslation<Methods> {}
}
