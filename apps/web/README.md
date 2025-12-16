# タスク管理システム

※コマンドはワークスペースルートで実行してください。

## プロジェクト構成

```
apps/web/
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (actions)/         # Server Actions
│   │   │   └── content/           # コンテンツCRUD操作
│   │   ├── [id]/              # 動的ルート
│   │   ├── index.css          # Panda CSSのレイヤー定義
│   │   ├── layout.tsx         # ルートレイアウト
│   │   └── page.tsx           # ホームページ
│   ├── components/            # 共通コンポーネント
│   │   ├── Button/                 # ボタンコンポーネント
│   │   │   ├── index.stories.tsx       # storybook
│   │   │   ├── index.test.tsx/         # テスト
│   │   │   └── index.tsx               # 本体
│   │   ├── Form/
│   │   ├── Layouts/
│   │   ├── Nav/
│   │   └── Svg/
│   ├── hooks/                 # 共通カスタムフック
│   │   └── content.ts             # コンテンツ関連のフック（TanStack Query）
│   ├── lib/                   # ライブラリ設定
│   │   ├── api/                   # APIクライアント設定
│   │   ├── nextjs-registry/       # Next.jsレジストリ設定（Ant Design等）
│   │   └── query/                 # TanStack Query設定
│   ├── styles/                # スタイル・デザインシステム定義
│   ├── utils/                 # ユーティリティ関数
│   └── view/                  # ページビュー
│       └── Home/
│           ├── components/    # ページ固有のコンポーネント
│           ├── hooks/         # ページ固有のフック
│           └── index.tsx      # ページビュー本体
├── tests/                     # テスト
│   ├── e2e/                       # E2Eテスト（CodeceptJS）
│   └── unit/                      # ユニットテスト（Vitest）
├── styled-system/             # Panda CSS生成ファイル
├── .env.example               # .envのサンプル
├── biome.json                 # Biome設定
├── codecept.conf.js           # Codecept
├── panda.config.ts            # Panda CSS設定
├── postcss.config.cjs         # Panda CSSで必要
├── vitest.config.ts           # Vitest設定
└── vitest.setup.ts            # vitestセットアップ
```

## セットアップ

```bash
# 依存関係のインストール
$ pnpm install
```

## 開発

```bash
# 開発サーバーを起動
$ pnpm dev:web
```

## ビルド

```bash
# プロダクションビルド
$ pnpm build:web
```

## フロントフレームワーク
- Next.js 16（App router）

## リント・フォーマッター

- Biomeを使用
  - 設定ファイル: apps/web/biome.json
  - vscode, cursor上にBiomeのプラグインを別途インストールする必要あり
      - 詳細: https://biomejs.dev/ja/reference/vscode/

```bash
$ lint:web
$ format:web
```

## API型の生成

```bash
# OpenAPI仕様を生成
$ pnpm openapi:generate

# OpenAPI仕様からTypeScript型を生成
$ pnpm api:types
```

生成された型は `src/lib/api/schema.gen.ts` からインポートして使用できます。

## APIクライアント

- **APIクライアントライブラリ**: `openapi-fetch` を使用
  - OpenAPIスキーマから型安全なAPIクライアントを自動生成
  - `src/lib/api/client.ts` で 定義
  - 環境変数 `NEXT_PUBLIC_API_URL` でAPIのベースURLを設定

## Panda CSS

```bash
# スタイルシステムのコード生成
$ pnpm panda:web
```

## テスト

### テスト戦略

- **E2Eテスト（CodeceptJS + Playwright）**: エンドツーエンドのシナリオテスト
  - `tests/e2e/` ディレクトリにテストファイルを配置
  - Playwrightを使用したブラウザ自動化テスト
  - BDDスタイルのテスト記述
- **ユニットテスト（Vitest）**: コンポーネントやロジックの個別テスト
  - コンポーネントのレンダリングや関数の動作をテスト
  - 🔥 コンポーネントの表示テストといった簡単なもので実装

### テストの実行

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

### テストの書き方

#### CodeceptJS（E2E）

`tests/e2e/` ディレクトリに `.test.ts` ファイルを作成し、BDDスタイルでテストを記述します。

```typescript
Feature('機能名');

Scenario('シナリオ名', ({ I }) => {
  I.amOnPage('/');
  I.see('テキスト');
});
```

設定ファイルは `codecept.conf.js` にあります。カスタムステップは `tests/e2e/steps_file.ts` に追加できます。

#### Vitest（ユニットテスト）

`tests/unit/` ディレクトリに `.test.ts` または `.test.tsx` ファイルを作成します。

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Component } from '@/path/to/component';

describe('Component', () => {
  it('期待する動作', () => {
    render(<Component />);
    expect(screen.getByText('テキスト')).toBeInTheDocument();
  });
});
```

## スタイリングの方針

- **UIライブラリ**: Ant Design を使用
  - フォームコンポーネント（Input、Select、Button など）を活用
- **CSS-in-JS**: PandaCSS を使用
  - コンポーネント内で `css()` 関数を使用してスタイルを記述
  - `src/app/index.css` にレイヤー定義を記述

## データフェッチングの方針

- **データフェッチングライブラリ**: TanStack Query を使用
  - Server Actions と組み合わせてデータ取得・更新を実装
    - 特に `src/hooks/content.ts` で `useContent` フックを提供
  - `useQuery` でデータ取得、`useMutation` でデータ更新
  - `QueryProvider` でアプリ全体をラップ（`src/lib/query/QueryProvider.tsx`）
  - SSR対応のため一部 `dehydrate` と `HydrationBoundary` を使用

## フォーム管理の方針

- **フォームライブラリ**: TanStack Form を使用
  - `TaskForm.tsx` でタスク追加フォームを実装
- **バリデーション**: Zod を使用
  - TanStack Form と組み合わせて使用
