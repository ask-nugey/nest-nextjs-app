## Description

![](./Design/画面/20220615/03_title_edit.png)

## セットアップ

### インストール

```bash
$ pnpm install
```

### APIサーバー起動

```bash
# migration
$ pnpm run migration:api:run
# start build
$ pnpm run build:api
# 実行
$ pnpm run start:api
```

### webサーバー起動

.env.example を複製し、.envに命名変更

```bash
# start build
$ pnpm run build:web
# 実行
$ pnpm run start:web

# 開発サーバー
$ pnpm run dev:web
```

### storybook起動

```bash
# start build
$ pnpm run build:web
# 実行
$ pnpm run start:web

# 開発サーバー
$ pnpm run dev:web
```

## API

API の Document は、  
アプリを起動後、`http://localhost:3001/api` にて Swagger で確認できる。  
![](./doc/images/swagger.png)

### API型の生成

```bash
# OpenAPI仕様を生成
$ pnpm openapi:generate

# TypeScript型を生成（フロントエンドで使用）
$ pnpm api:types
```

生成された型は `apps/web/src/lib/api/schema.gen.ts` からインポートして使用できます。

## DB を初期状態に戻す

```bash
$ cp ./apps/api/data/bk-dev.sqlite ./apps/api/data/dev.sqlite
```

## モノレポ

- pnpm workspace でモノレポ環境を構築
  - 設定ファイル: pnpm-workspace.yaml

## web
- 技術スタック等の詳細: apps/web/README.md

## 仕様

※ ⭐️マークは自分の判断で追加
※ 🔥マークは時間がなくて実装できなかったが、実装したかったもの

### ページ一覧表示
- サイドバーに全ページが一覧表示される
- 選択中のページがハイライト表示される
  - ⭐️ トップページ（/）にアクセスしたら、最初のコンテンツへリダイレクト処理
- ⭐️ 項目がない場合、"コンテンツがありません"と表示
- ⭐️ エラー時は、"エラーが発生しました"とエラー詳細を表示
- ⭐️ データの取得中はローディングスピナーを表示
- ⭐️ ウィンドウサイズが狭い場合は、ハンバーガーメニュー表示

#### ページ編集モード
- Editボタンをクリックすると編集モードに切り替わる
- 編集モードではNew PageボタンとDoneボタンが表示される
- 各ページ項目に削除ボタンが表示される
- ⭐️ 項目がない場合、"コンテンツがありません"と"編集モードで「New Page」ボタンから新規作成できます"のテキストと「New Page」ボタンを表示
- ⭐️ ページ編集関連のボタンは下部に固定し、常に表示

#### ページ作成
- New Pageボタンをクリックすると新規ページのタイトル入力フィールドが表示される
- Doneボタンで編集を確定する
- ⭐️ タイトル入力フィールドが未入力のまま保存した場合、"（タイトルなし）"で保存される
  - （🔥 タイトルの文字数バリデーション）

#### ページ削除
- 削除ボタンをクリックするとページが削除予定にマークされる（取り消し線を表示）
  - 複数選択可能
- Doneボタンをクリックすると削除予定にマークされたページが削除される
- ⭐️ 存在しないURLを開いたとき、"コンテンツが見つかりませんでした"と表示

### コンテンツ/本文 編集
- **タイトル編集**
  - Editボタンで編集モードに切り替わる
  - コンテンツ/本文 を編集して保存できる
  - 編集をキャンセルできる

### バリデーション
- **タイトル**: 1文字以上50文字以下
- **本文**: 10文字以上2000文字以下
- バリデーションエラー時はエラーメッセージが表示される

## その他実装途中のもの🔥
- Unitテストについてはごくごく簡単なものを実装
- E2Eテストも書いているが、上記で⭐️がついているものについては未実装

```bash
# Vitestでユニットテストを実行
$ pnpm test:web

# Vitest UIを起動
$ pnpm test:web:ui

# カバレッジレポートを生成
$ pnpm test:web:coverage

# CodeceptJSでE2Eテストを実行
$ pnpm exec playwright install # Playwrightのブラウザをインストール（初回のみ）
$ pnpm test:e2e

# CodeceptJSでE2Eテストを実行（ステップ表示）
$ pnpm test:e2e:ui
```
