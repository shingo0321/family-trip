# 家族旅行ポータルサイト

家族旅行の「旅程・タイムテーブル」「持ち物リスト」を掲載するポータルサイト。
通常のWebサイトとしても、LINEミニアプリ（LIFF）としても同じURLで開ける構成。フロントエンドのみ・Netlify無料枠で完結する。

## ファイル構成

- [index.html](index.html) — ページ構造
- [style.css](style.css) — 見た目
- [data.js](data.js) — 掲載内容（**実際の情報に差し替えるのはこのファイルだけでOK**）
- [app.js](app.js) — 描画処理・持ち物チェックの保存・LINEでのシェアボタン制御

## 1. 内容の差し替え

[data.js](data.js) 内の `TODO:` と書かれた箇所を、実際のタイトル・旅程・持ち物情報に書き換える。
持ち物リストのチェック状態は、各利用者のブラウザ内（localStorage）に保存される（他の人とは共有されない、個人用のチェックリスト）。

## 2. LINE Developersでの準備（LIFFとして開く場合）

1. [LINE Developers Console](https://developers.line.biz/console/) にログイン
2. プロバイダーを作成（未作成の場合、または既存のものを流用）
3. 「LINEログイン」チャネルを新規作成
4. チャネルの「LIFF」タブから「追加」をクリックし、LIFFアプリを登録
   - サイズ: Full（お好みで Tall / Compact も可）
   - エンドポイントURL: 後述のNetlifyデプロイ後のURLを入力（一旦仮の値でも登録可、後で編集できる）
   - Scope: `profile` は不要（ログイン不要な公開ページのため）
5. 発行された **LIFF ID**（`1234567890-AbcdEfgh` のような形式）を控える

[app.js](app.js) 内の以下の行を、控えたLIFF IDに書き換える。

```js
const LIFF_ID = "YOUR_LIFF_ID";
```

※ LINE外の通常ブラウザで開いた場合、LIFF初期化は失敗するがページ表示には影響しない（シェアボタンが非表示になるだけ）。

## 3. Netlifyへのデプロイ

1. このフォルダの内容をGitHubリポジトリに push する
2. [Netlify](https://app.netlify.com/) にログイン →「Add new site」→「Import an existing project」→ GitHub → 対象リポジトリを選択
3. ビルド設定はデフォルトのまま（Build command空欄、Publish directoryは`.`）でデプロイ

デプロイ後に発行されるURL（例: `https://xxxx.netlify.app`）を、LINE DevelopersのLIFFエンドポイントURLに設定し直す。

## 4. 動作確認

- 通常サイトとして: NetlifyのURLをブラウザで開く
- LIFFとして: LIFF URL（`https://liff.line.me/{LIFF ID}`）をLINEアプリでタップして開く

## 補足

- 完全に無料で使える範囲: Netlify無料枠（帯域100GB/月など）+ LINEログインチャネルは無料
- サーバー処理やデータ保存が必要になったら、Netlify Functions（無料枠あり）の追加を検討する
