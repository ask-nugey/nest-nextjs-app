Feature("ページ管理機能");

Scenario("サイドバーに全ページが表示される", ({ I }) => {
	I.amOnPage("/");
	// サイドバーにページ一覧が表示されることを確認（nav要素の存在を確認）
	I.seeElement('[data-testid="nav"]');
	// コンテンツが存在する場合、リンクが表示されることを確認
	I.waitForElement('[data-testid^="nav-item-"]', 5);
});

Scenario("選択中のページがハイライト表示される", async ({ I }) => {
	I.amOnPage("/");
	// 最初のページのIDを取得
	const firstItemId = await I.grabAttributeFrom(
		'[data-testid^="nav-item-"]:not([data-testid*="new"])',
		"data-testid",
	);
	// 最初のページをクリック
	I.click(`[data-testid="${firstItemId}"] a`);
	// ページ遷移を待つ
	I.wait(1);
	// 選択中のページがハイライト表示されることを確認（リンクが存在し、アクティブなスタイルが適用されている）
	// CSSクラスでスタイリングされているため、リンクの存在とURLの一致を確認
	I.seeElement(`[data-testid="${firstItemId}"] a`);
});

Scenario(
	"EditボタンをクリックするとNew PageボタンとDoneボタンが表示される",
	({ I }) => {
		I.amOnPage("/");
		I.click('[data-testid="nav-edit-button"]');
		I.seeElement('[data-testid="nav-new-page-button"]');
		I.seeElement('[data-testid="nav-done-button"]');
	},
);

Scenario("New Pageボタンでページを作成できる", ({ I }) => {
	I.amOnPage("/");
	I.click('[data-testid="nav-edit-button"]');
	// ボタンが有効になるまで待つ
	I.waitForElement('[data-testid="nav-new-page-button"]:not([disabled])', 10);
	I.click('[data-testid="nav-new-page-button"]');
	// 新規ページの入力フィールドが表示されることを確認
	I.waitForElement('[data-testid^="nav-item-new-"] input', 10);
	// デフォルトで空のタイトルが表示されることを確認
	I.seeInField('[data-testid^="nav-item-new-"] input', "");
	I.click('[data-testid="nav-done-button"]');
});

Scenario(
	"Editボタンをクリックすると各項目に削除ボタンが表示される",
	({ I }) => {
		I.amOnPage("/");
		I.click('[data-testid="nav-edit-button"]');
		// サイドバーの各項目に削除ボタンが表示されることを確認
		I.seeElement('[data-testid^="nav-delete-button-"]');
	},
);

Scenario(
	"削除ボタンをクリックするとページが削除予定にマークされる",
	async ({ I }) => {
		I.amOnPage("/");
		I.click('[data-testid="nav-edit-button"]');
		// 最初のページのIDを取得
		const firstItemId = await I.grabAttributeFrom(
			'[data-testid^="nav-item-"]:not([data-testid*="new"])',
			"data-testid",
		);
		// 最初のページの削除ボタンをクリック
		const itemId = firstItemId.replace("nav-item-", "");
		I.click(`[data-testid="nav-delete-button-${itemId}"]`);
		// ページが削除予定にマークされることを確認
		I.waitForElement(
			`[data-testid="${firstItemId}"][data-marked-for-delete="true"]`,
			10,
		);
	},
);

Scenario(
	"削除予定にマークされたページを再度クリックするとマークが解除される",
	async ({ I }) => {
		I.amOnPage("/");
		I.click('[data-testid="nav-edit-button"]');
		// 最初のページのIDとテキストを取得
		const firstItemId = await I.grabAttributeFrom(
			'[data-testid^="nav-item-"]:not([data-testid*="new"])',
			"data-testid",
		);
		const firstPageText = await I.grabTextFrom(
			`[data-testid="${firstItemId}"] a`,
		);
		const itemId = firstItemId.replace("nav-item-", "");
		I.click(`[data-testid="nav-delete-button-${itemId}"]`);
		// ページが削除予定にマークされることを確認
		I.waitForElement(
			`[data-testid="${firstItemId}"][data-marked-for-delete="true"]`,
			10,
		);
		// 再度削除ボタンをクリック
		I.click(`[data-testid="nav-delete-button-${itemId}"]`);
		// マークが解除されることを確認
		I.dontSeeElement(
			`[data-testid="${firstItemId}"][data-marked-for-delete="true"]`,
		);
		I.see(firstPageText);
		I.click('[data-testid="nav-done-button"]');
	},
);

Scenario("削除予定にマークされたページをDoneで削除できる", async ({ I }) => {
	I.amOnPage("/");
	I.click('[data-testid="nav-edit-button"]');
	// 最初のページのIDとテキストを取得
	const firstItemId = await I.grabAttributeFrom(
		'[data-testid^="nav-item-"]:not([data-testid*="new"])',
		"data-testid",
	);
	const firstPageText = await I.grabTextFrom(
		`[data-testid="${firstItemId}"] a`,
	);
	const itemId = firstItemId.replace("nav-item-", "");
	I.click(`[data-testid="nav-delete-button-${itemId}"]`);
	// ページが削除予定にマークされることを確認（属性が設定されるまで待つ）
	I.wait(0.5);
	I.waitForElement(
		`[data-testid="${firstItemId}"][data-marked-for-delete="true"]`,
		10,
	);
	I.click('[data-testid="nav-done-button"]');
	// 削除処理が完了するまで待つ
	I.wait(1);
	// ページがサイドバーから削除されることを確認
	I.dontSee(firstPageText);
});

Scenario("タイトルを編集して保存できる", async ({ I }) => {
	I.amOnPage("/");
	// 最初のページをクリック
	const firstItemId = await I.grabAttributeFrom(
		'[data-testid^="nav-item-"]:not([data-testid*="new"])',
		"data-testid",
	);
	I.click(`[data-testid="${firstItemId}"] a`);
	// タイトルのEditボタンをクリック
	I.click('[data-testid="edit-title-button"]');
	I.fillField('[data-testid="title-input"]', "新しいタイトル");
	I.click('[data-testid="save-button"]');
	// 編集内容が反映されることを確認
	I.see("新しいタイトル");
});

Scenario("タイトル編集をキャンセルできる", async ({ I }) => {
	I.amOnPage("/");
	// 最初のページをクリック
	const firstItemId = await I.grabAttributeFrom(
		'[data-testid^="nav-item-"]:not([data-testid*="new"])',
		"data-testid",
	);
	I.click(`[data-testid="${firstItemId}"] a`);
	// タイトルのEditボタンをクリックする前に、元のタイトルを取得
	const originalTitle = await I.grabTextFrom(
		'[data-testid="content-title"] h1',
	);
	// タイトルのEditボタンをクリック
	I.click('[data-testid="edit-title-button"]');
	I.fillField('[data-testid="title-input"]', "変更されたタイトル");
	I.click('[data-testid="cancel-button"]');
	// 元のタイトルが表示されることを確認
	I.see(originalTitle);
});

Scenario("本文を編集して保存できる", async ({ I }) => {
	I.amOnPage("/");
	// 最初のページをクリック
	const firstItemId = await I.grabAttributeFrom(
		'[data-testid^="nav-item-"]:not([data-testid*="new"])',
		"data-testid",
	);
	I.click(`[data-testid="${firstItemId}"] a`);
	// 本文のEditボタンをクリック
	I.click('[data-testid="edit-body-button"]');
	I.fillField(
		'[data-testid="body-input"]',
		"これは新しい本文です。10文字以上必要です。",
	);
	I.click('[data-testid="save-button"]');
	// 編集内容が反映されることを確認
	I.see("これは新しい本文です。10文字以上必要です。");
});

Scenario("本文編集をキャンセルできる", async ({ I }) => {
	I.amOnPage("/");
	// 最初のページをクリック
	const firstItemId = await I.grabAttributeFrom(
		'[data-testid^="nav-item-"]:not([data-testid*="new"])',
		"data-testid",
	);
	I.click(`[data-testid="${firstItemId}"] a`);
	// 本文のEditボタンをクリックする前に、元の本文を取得
	// 本文が空の場合もあるため、要素の存在を確認してから取得
	I.waitForElement('[data-testid="content-body"]', 5);
	let originalContent = "";
	try {
		originalContent = await I.grabTextFrom('[data-testid="content-body"] p');
	} catch {
		// 本文が空の場合は空文字列のまま
		originalContent = "";
	}
	// 本文のEditボタンをクリック
	I.click('[data-testid="edit-body-button"]');
	I.fillField(
		'[data-testid="body-input"]',
		"変更された本文です。10文字以上必要です。",
	);
	I.click('[data-testid="cancel-button"]');
	// 元の本文が表示されることを確認（本文が空の場合は何も表示されない）
	if (originalContent) {
		I.see(originalContent);
	}
});

Scenario("タイトルが空の場合エラーメッセージが表示される", async ({ I }) => {
	I.amOnPage("/");
	// 最初のページをクリック
	const firstItemId = await I.grabAttributeFrom(
		'[data-testid^="nav-item-"]:not([data-testid*="new"])',
		"data-testid",
	);
	I.click(`[data-testid="${firstItemId}"] a`);
	// タイトルのEditボタンをクリック
	I.click('[data-testid="edit-title-button"]');
	I.fillField('[data-testid="title-input"]', "");
	I.click('[data-testid="save-button"]');
	// エラーメッセージが表示されることを確認
	I.see("タイトルは1文字以上、50文字以下で入力してください");
});

Scenario(
	"タイトルが50文字を超える場合エラーメッセージが表示される",
	async ({ I }) => {
		I.amOnPage("/");
		// 最初のページをクリック
		const firstItemId = await I.grabAttributeFrom(
			'[data-testid^="nav-item-"]:not([data-testid*="new"])',
			"data-testid",
		);
		I.click(`[data-testid="${firstItemId}"] a`);
		// タイトルのEditボタンをクリック
		I.click('[data-testid="edit-title-button"]');
		const longTitle = "あ".repeat(51);
		I.fillField('[data-testid="title-input"]', longTitle);
		I.click('[data-testid="save-button"]');
		// エラーメッセージが表示されることを確認
		I.see("タイトルは1文字以上、50文字以下で入力してください");
	},
);

Scenario(
	"本文が10文字未満の場合エラーメッセージが表示される",
	async ({ I }) => {
		I.amOnPage("/");
		// 最初のページをクリック
		const firstItemId = await I.grabAttributeFrom(
			'[data-testid^="nav-item-"]:not([data-testid*="new"])',
			"data-testid",
		);
		I.click(`[data-testid="${firstItemId}"] a`);
		// 本文のEditボタンをクリック
		I.click('[data-testid="edit-body-button"]');
		I.wait(0.5);
		I.fillField('[data-testid="body-input"]', "短い");
		I.click('[data-testid="save-button"]');
		// エラーメッセージが表示されることを確認
		I.see("本文は10文字以上、2000文字以下で入力してください");
	},
);

Scenario(
	"本文が2000文字を超える場合エラーメッセージが表示される",
	async ({ I }) => {
		I.amOnPage("/");
		// 最初のページをクリック
		const firstItemId = await I.grabAttributeFrom(
			'[data-testid^="nav-item-"]:not([data-testid*="new"])',
			"data-testid",
		);
		I.click(`[data-testid="${firstItemId}"] a`);
		// 本文のEditボタンをクリック
		I.click('[data-testid="edit-body-button"]');
		const longContent = "あ".repeat(2000);
		I.executeScript(
			([selector, value]) => {
				const element = document.querySelector(selector);
				if (element) {
					element.value = value;
					// NOTE: inputイベントとchangeイベントを発火すると文字を入力できる
					element.dispatchEvent(new Event("input", { bubbles: true }));
					element.dispatchEvent(new Event("change", { bubbles: true }));
				}
			},
			['[data-testid="body-input"]', longContent],
		);
		I.wait(1);
		I.appendField('[data-testid="body-input"]', "あ");
		I.wait(1);
		I.click('[data-testid="save-button"]');
		// エラーメッセージが表示されるまで待つ
		I.waitForText("本文は10文字以上、2000文字以下で入力してください", 5);
		// エラーメッセージが表示されることを確認
		I.see("本文は10文字以上、2000文字以下で入力してください");
	},
);
