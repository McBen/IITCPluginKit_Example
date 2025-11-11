# 7. Release

The final step when creating an addon is publishing it to other people.

## Versioning
You can manually set a version number in plugin.json:
```json
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

A better way is using GIT TAGs. Remove the 'version' line and create a TAG like "v1.0"

_Q:"What is GIT?" A:Source code managment system. If you don't know it you can skip it.
If you're a developer or want to become one: grap a tutorial.
I highly recommend using it, but it is not required.


## Building
`yarn build:prod` 
creates a release version for end-users.  
A release version will strip off some stuff and adds some optimizations.

If you like to minimize your code add a `minimize: true` to your plugin config.  
This will reduce the size and remove debug stuff like console.log. But it makes it hard to read and review your code without access to your sources.  
The benefit of a minimized vs. a normal version is not a big deal. Iitc is still a project that life of open and shared code.

You'll find them in you **/dist/** folder.  
A `myplugin.user.js` with the code and a `myplugin.meta.js` which is used for version checking.


## Distribute
There are multiple ways how to distibute your code. And even every faction has it's own distibution channels.
One of the best methods is to create a public git repository includeing the /dist/ folder. 
This way everybody can check your sources and everybody has easy access to your compiled file.



***
While this chapter was really short, you should grap a coffee for the next one.
