# GitHub Actions Release Workflow

このリポジトリでは release-it は使用せず、GitHub Actions の既製ステップを組み合わせてリリースを自動化しています。`release.yml` ワークフローはタグの push もしくは手動トリガーで実行され、以下を行います。

1. 依存関係のインストール (`pnpm install --frozen-lockfile`)
2. ビルド (`pnpm run build`)
3. npm への公開 (`npm publish --access public`)
4. GitHub Release の作成 (`actions/create-release`)

## シークレットの設定

Actions からリリースするために、以下のシークレットをリポジトリに登録してください。

| 名前 | 内容 | 用途 |
| --- | --- | --- |
| `NPM_TOKEN` | npm に publish できるアクセストークン | `npm publish` 用 |
| `GH_TOKEN` (任意) | `repo` 権限を持つ GitHub PAT。未設定の場合は `GITHUB_TOKEN` が使用されます。 | `actions/create-release` 用 |

## ワークフローの実行

- **タグを push**: `git tag v1.2.0 && git push origin v1.2.0` を実行すると、自動的にワークフローが走ります。`package.json` のバージョンは事前に更新しておいてください。
- **手動トリガー**: Actions タブで `Release` ワークフローを選択し、`tag_name` と任意で `release_name` を指定して実行できます。タグ名はリリースに利用され、存在しない場合はワークフロー内で作成されます。

やり直す場合
```bash
git tag -d v0.0.1
git push origin :refs/tags/v0.0.1
```

## 参考

- ワークフローファイル: `.github/workflows/release.yml`
- npm 公開では `npm publish --access public` を使用しています。scoped package をパブリック公開している場合に適切な設定です。必要に応じて変更してください。
