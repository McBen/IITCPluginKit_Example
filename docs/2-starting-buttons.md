# 2. Starting Buttons

Expect the unexpected: the function `init()` is called on startup.  
So put there all the stuff you want to run on start.

## Toolbutton
Having the alert text popping up on every start is really annoying. Let's hide it behind a toolbox button - a link below the portal-detail view. Where most plugins will add a link:

:::code-group
```typescript {7-12,15-17} [src/Main.ts]
class CountPortals implements Plugin.Class {
    init(): void {
        console.log("CountPortals " + VERSION);

        require("./styles.css");

        $("#toolbox").append(
            $("<a>", {
                text: "Count",
                click: () => this.doCount()
            })
        )
    }

    doCount(): void {
        alert("Hello World");
    }
}
```
:::

The `$` is JQuery. JQuery is a good old google framework helping us doing html stuff. Modern developers will tell you not to use it. And yes, they are right and wrong. Anyway, it's already included in IITC so let's make use of it to ease HTML creations. 

Here we create an `<a>` tag and add a "click" handler. This will call our new function which will hold our old `alert`.

![Hello world!](/images/tut-2.png)

## Toolbar Button
Some people prefer a quick access button on the left side of the map. Please think twice before adding it. Only use it for stuff that a user will use daily.
But hey, this is a tutorial: let's do it

- First we need an icon. Download and place it in your /src/ directory -> ...
Here we use SVG because it's simple and small, but you're free to use any web-format you like.
- Import it at the top of your Main.ts:

```typescript {3}
import * as Plugin from "iitcpluginkit";

import myicon from "./icon.svg";

class CountPortals implements Plugin.Class {
// ...
}
```

- Then create the toolbar button.

```typescript {14-24}
class CountPortals implements Plugin.Class {
    init(): void {
        console.log("CountPortals " + VERSION);

        require("./styles.css");

        $("#toolbox").append(
            $("<a>", {
                text: "Count",
                click: () => this.doCount()
            })
        )

        const toolbarGroup = $("<div>", {class: "leaflet-bar leaflet-control"})
            .append(
                $("<a>")
                    .addClass("leaflet-bar-part")
                    .css("background-image", 'url("' + myicon + '")')
                    .css("background-size", "24px")
                    .click(() => this.doCount())
            );

        const parent = $(".leaflet-top.leaflet-left", window.map.getContainer()).first();
        parent.append(toolbarGroup);
    }
}
```

We created a `<div>` for a new toolbar group and a `<a>` for a button with the image. 
Finally attached them to the global map container.

Make sure your "autobuild" command is still running. Open _**localhost:8100**_, update your script and reload iitc.
As you see you'll need these often. It's a good thing to keep localhost and iitc open in different tabs.

## CSS
Let's keep our code clean and move the styles into another file. We already have one which is still empty: `styles.css`

:::code-group
```css [styles.css]
.mybutton {
   background-image: url("./icon.svg");
   background-size: 24px;
}
```
:::

:::code-group
```typescript {3-6} [Main.ts]
const toolbarGroup = $("<div>", { class: "leaflet-bar leaflet-control" })
    .append(
        $("<a>", {
            class: "mybutton leaflet-bar-part",
            click: () => this.doCount()
        })
    );
```
:::

You will see an error message in your terminal window because the icon import is no longer required in `Main.ts`.
So remove this import line.

:::code-group
```typescript [Main.ts]
import * as Plugin from "iitcpluginkit";

import myicon from "./icon.svg"; // [!code error]

class CountPortals implements Plugin.Class {
// ...
}
```
:::

## Refactoring

Last but not least let's do a little cleanup and move our stuff to an extra function to keep the `init()` function easy to read:

:::code-group
```typescript {7,10-28} [Main.ts]
class CountPortals implements Plugin.Class {
    init(): void {
        console.log("CountPortals " + VERSION);

        require("./styles.css");

        this.createButtons();
    }

    private createButtons(): void {
        $("#toolbox").append(
            $("<a>", {
                text: "Count",
                click: () => this.doCount()
            })
        )

        const toolbarGroup = $("<div>", {class: "leaflet-bar leaflet-control"})
            .append(
                $("<a>", {
                    class: "mybutton leaflet-bar-part",
                    click: () => this.doCount()
                })
            );

        const parent = $(".leaflet-top.leaflet-left", window.map.getContainer());
        parent.append(toolbarGroup);
    }
}
```
:::

The `private` will let the compiler know no one else will use this function. You can mark most of your functions private.
It won't help in final javascript but will help you track down obsolete functions. 
