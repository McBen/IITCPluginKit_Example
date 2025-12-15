# 1. Creating the Plugin

Start by creating a new project directory (for example, `countPortals`) and navigate into it.

## Install the Plugin Kit

Open a terminal and run:

```yarn add iitcpluginkit```

This installs all required dependencies into a `node_modules` directory and may take a few moments. Deprecated dependency warnings can be safely ignored. If you encounter errors, check that your Node.js version is compatible.

## Create the initial layout

Generate a default plugin structure:

```
yarn ipk
```

When prompted, enter `CountPortals` (case-sensitive) as the plugin name and use the default settings for all other options.

## Add some code

1. Open `/src/Main.ts` and replace the `// FILL ME` comment with `alert("Hello World");`

2. Save the file and run:

```
yarn autobuild
```

This command automatically rebuilds your code whenever you make changes and provides a local file server for easy installation. Wait for the build to complete—you'll see output like this:

```shell
[0] Built at: 2020-07-11 22:35:01
[0]                    Asset      Size  Chunks             Chunk Names
[0] iitc_plugin_CountPortals.dev.user.js  23.7 KiB    main  [emitted]  main...   
```

## Installation

1. Navigate to [http://localhost:8100](http://localhost:8100) in your browser to install your new plugin.

![Browser window](/images/tut-1.png)

2. Open or refresh your IITC window.

You should now see the "Hello World" alert message. Congratulations on creating your first IITC plugin! 🎉

## Updating

Eventually, someday, you may need to update IITCPluginKit:

- `yarn outdated` — Check for available updates
- `yarn upgrade` — Apply minor version updates

Major updates may require code changes. For these, run:

```
yarn add iitcpluginkit
```

Then verify your code compiles. Check the [changelog](https://github.com/McBen/IITCPluginKit/blob/master/changelog.txt) for details on breaking changes.
