## Description

NCDC フロント課題 [Markdown Editor] のバックエンド API。  
pnpm ワークスペース内の `apps/api` に配置されています。
![](../Design/画面/20220615/03_title_edit.png)

## セットアップと起動

ワークスペースルートで実行します。

```bash
# install
pnpm install
# migration
pnpm --filter api migration:run
# build
pnpm --filter api build
# 起動
pnpm --filter api start
```

開発モード:

```bash
pnpm --filter api start:dev
```

## API ドキュメント

API の Document は、アプリを起動後 `http://localhost:3001/api` にて Swagger で確認できます。  
![](../doc/images/swagger.png)

## DB を初期状態に戻す

アプリ配下のデータファイルをコピーします。

```bash
cp ./data/bk-dev.sqlite ./data/dev.sqlite
```
