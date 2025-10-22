```markdown
# team-test
チーム開発テスト

```

## 動作確認

簡易的にこのリポジトリ内の HTML をブラウザで確認する手順（ローカルで動くシンプルな http サーバを立てます）:

1. カレントディレクトリをワークスペースのルートにします。

```bash
# Python3 がインストールされていれば簡単に起動できます
python3 -m http.server 8000
```

2. ブラウザで以下にアクセスします。

 - http://localhost:8000/21top.html  （人気のペットページ）
 - http://localhost:8000/24top.html  （来年の天気ジョークページ）

3. スクリプトやスタイルはそれぞれ `21script.js` / `21style.css`, `24script.js` / `24style.css` を読み込みます。

備考: 開発環境でポート 8000 が使えない場合は他のポート番号を指定してください。
# team-test
チーム開発テスト
