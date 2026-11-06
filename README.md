# 決起集会 ホームページ

決起集会の案内ページです。ビルド不要の静的サイトで、GitHub Pages にそのまま公開できます。

## ファイル構成

```
index.html          ページ本体(文章はここを直接編集)
assets/style.css    デザイン
assets/script.js    カウントダウン、写真スライド、住所コピー
assets/photos/      スライドに流れる写真
.nojekyll           GitHub Pages に加工させないための空ファイル
```

## 公開手順(GitHub Pages)

1. GitHub で新しいリポジトリを作り、このフォルダの中身をすべてアップロードします。
   `index.html` がリポジトリの一番上の階層に来るようにしてください。
2. リポジトリの **Settings → Pages** を開きます。
3. **Build and deployment** の Source を `Deploy from a branch` にし、
   Branch を `main`、フォルダを `/ (root)` にして Save を押します。
4. 1〜2分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます。

コマンドで行う場合は次のとおりです。

```bash
git init
git add .
git commit -m "決起集会ページを追加"
git branch -M main
git remote add origin https://github.com/<ユーザー名>/<リポジトリ名>.git
git push -u origin main
```

## 内容の編集箇所

仮の情報が入っている場所には、`index.html` 内に「仮の情報です」というコメントがあります。

| 変更したい内容 | 場所 |
| --- | --- |
| 開催日・時刻 | `index.html` のヒーロー部分と、`assets/script.js` 冒頭の `EVENT_START` |
| 参加人数・締切・参加費 | `index.html` の「開催状況」 |
| タイムスケジュール | `index.html` の `<ol class="tl">` 内の `<li>` |
| 会場名・住所・アクセス | `index.html` の「開催地」 |
| 地図ボタンのリンク | `id="maplink"` の `href`(Google マップで会場を開き、共有リンクに差し替えると確実です) |
| 写真 | 下記 |

参加人数の進捗バーは、`assets/style.css` の `.bar i { width: 80% }` を変更します(32/40名 = 80%)。

## 写真の差し替え

1. 画像(JPG / PNG / WebP)を `assets/photos/` に入れます。横長 8:5(例: 1600×1000px)がきれいに収まります。
2. `assets/script.js` の `PHOTOS` を編集します。

```js
var PHOTOS = [
  { src: "assets/photos/kanpai.jpg", caption: "乾杯の瞬間", tag: "18:20" },
  // 枚数は自由に増減できます
];
```

写真は1枚あたり500KB以下にすると、スマホでも軽く表示されます。

## SNS でのリンク表示(任意)

公開後に、`index.html` の `<head>` へ次の1行を追加すると、リンクを貼ったときに画像が表示されます。
画像は 1200×630px 程度のものを用意してください。

```html
<meta property="og:image" content="https://<ユーザー名>.github.io/<リポジトリ名>/assets/og.jpg">
```

## メモ

- Google Fonts(Dela Gothic One / Zen Kaku Gothic New / Barlow Condensed)を読み込んでいます。
  オフラインでは代替フォントで表示されます。
- ライト/ダークは閲覧者の端末設定に自動で合わせます。
