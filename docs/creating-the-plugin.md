# 1. Creating the Plugin

- create a directory for your project (countPortals)
- open a terminal window and run:

```yarn add iitcpluginkit```

This will install all required software (inside a `node_modules` directory) and might take a little bit. 
You can ignore the warnings about deprecated dependencies.
If you got an error it's most likely about an incompatible node version.

- let IITCPluginKit create a default plugin layout for you:  
`yarn ipk`

- Enter "CountPortals" (case-sensitive!) for plugin name and leave the rest default.
- Open /src/Main and replace the  _**// FILL ME**_ with `alert("Hello World");`

- save and run:  
`yarn autobuild`

This will start building your code everytime you save your changes. Additionally, it provides a small fileserver to ease installation.
Wait a little moment till you see the compilation is finished.
something like:

```shell
[0] Built at: 2020-07-11 22:35:01
[0]                    Asset      Size  Chunks             Chunk Names
[0] iitc_plugin_CountPortals.dev.user.js  23.7 KiB    main  [emitted]  main...   
```

- Open [http://localhost:8100](http://localhost:8100) and install your freshly created Plugin.
  Open or reload your iitc browser window.

![Browser window](/images/tut-1.png)

You should see the good old "Hello World" message.

Congratulation for your first IITC-Plugin.

## 1.1 Updating
You won't need that now but sooner or later you'll need to update the IITCPluginKit.  
`yarn outdated` will show you if you're still up to date  
`yarn upgrade` will do all minor version upgrades  

Sometimes the upgrade may break your code (like renamed function,...).  
Run `yarn add iitcpluginkit` to do the bigger step and see if your code still compiles well.
Maybe you should look at the [changelog](https://github.com/McBen/IITCPluginKit/blob/master/changelog.txt)
