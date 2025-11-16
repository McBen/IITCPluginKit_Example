# 7. Release

The final step when creating an addon is publishing it to other people.

## Versioning

You can manually set a version number in plugin.json:

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

A better way is using GIT TAGs. Remove the 'version' line and create a TAG like `v1.0`

Q: "What is GIT?" 

A: It's a source code management system. If you don't know it you can skip it.
If you're a developer or want to become one: grab a tutorial.
I highly recommend using it, but it is not required.

## Building

`yarn build:prod` creates a release version for end-users.  
A release version will strip off some stuff and adds some optimizations.

If you like to minimize your code add a `minimize: true` to your `plugin.json` config file.  
This will reduce the size and remove debug stuff like console.log. But it makes it hard to read and review your code without access to your sources.  
The benefit of a minimized vs. a normal version is not a big deal. IITC is still a project that live of open and shared code.

After the script has finished, you'll find the files in your `/dist` folder.  
A `myplugin.user.js` with the code and a `myplugin.meta.js` which is used for version checking.

### GitHub action

If you want to automate things, you could add a [GitHub action](https://github.com/features/actions), so every time you push a tag that starts with a `v`, you will create
a production build, a new release on GitHub, and then add the created `user.js` script to your release so fellow agents can download it.  
Automagically ;)

Here is an example:

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

There are multiple ways how to distribute your code. And even every faction has its own distribution channels.
One of the best methods is to create a public git repository including the /dist/ folder. 
This way everybody can check your sources and everybody has easy access to your compiled file.

----

While this chapter was really short, you should grab a coffee for the next one.
