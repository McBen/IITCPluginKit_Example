# 7. Release

The final step in creating an add-on is publishing it so others can install and use it.

## Versioning

You can set a version number manually in `plugin.json`:

::: code-group
```json{4} [plugin.json]
{
  "name": "IITC plugin: CountPortals",
  "id": "iitc_plugin_CountPortals",
  "version": "1.0",
  "category": "Misc",
  "description": "just a tutorial script",
  "author": "",
  "entry": "src/Main.ts"
}
```
:::

A better approach is to use Git tags. Omit the `version` field from `plugin.json` and create a Git tag such as `v1.0` for releases.

If you are new to Git, it's a version control system worth learning—especially if you plan to publish and maintain code—but it's not strictly required for releasing a plugin.

## Building

Running `yarn build:prod` creates a production-ready build for end users. The build process applies optimizations and strips development-only code.

If you want to further reduce the output size, add `"minimize": true` to your `plugin.json`. This removes debug statements (for example, `console.log`) and minifies the code, which makes it harder to inspect without the original sources. For most plugins, minimizing offers only modest benefits—IITC values open, reviewable code.

When the build completes, the generated files appear in the `dist/` folder: a `myplugin.user.js` containing the compiled plugin and a `myplugin.meta.js` used for update/version checking.

### GitHub action

You can automate releases with a GitHub Action: when you push a tag that starts with `v`, the workflow can build a production release, create a GitHub Release, and upload the generated `user.js` and other assets automatically.

Here is an example workflow:

::: details deploy-gh-pages.yml
```yaml
name: Build and Release

permissions:
  contents: write

on:
  push:
    tags:
      - 'v*' # Trigger this workflow when a tag starting with 'v' is pushed

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js environment
        uses: actions/setup-node@v4
        with:
          node-version: '20.x'
          cache: 'yarn'

      - name: Install dependencies
        run: yarn install --immutable --frozen-lockfile

      - name: Run build
        run: yarn build:prod

      - name: Create Release and Upload Assets
        uses: softprops/action-gh-release@v1
        with:
          files: dist/*
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
:::

## Distribute

There are several ways to distribute your plugin. A common approach is to publish a public Git repository that includes the `dist/` folder. This lets users review your source and easily download the compiled script.

----

This chapter was short—take a coffee break, then continue with the next chapter.
