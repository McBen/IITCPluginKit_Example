# 2. Starting Buttons

Expect the unexpected: the function `init()` is called on startup.  
So put there all the stuff you want to run on start.

## Toolbutton

Showing the alert on every startup is annoying. Instead, let's hide it behind a toolbox button—a link below the portal detail view:

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

The `$` symbol represents jQuery, a popular library for HTML manipulation. While modern developers often prefer alternatives, jQuery is already included in IITC, so we use it here to simplify HTML creation.

This code creates an `<a>` tag with a click handler that calls our new `doCount()` function.

![Hello world!](/images/tut-2.png)

## Toolbar Button

Some users prefer a quick access button on the left side of the map. Use this sparingly—only for features that users will access daily. For this tutorial, let's add one:

1. First, create an icon. Download an icon and place it in your `/src/` directory. We'll use SVG for simplicity and small file size, but any web format works.

2. Import it at the top of `Main.ts`:

```typescript {3}
import * as Plugin from "iitcpluginkit";

import myicon from "./icon.svg";

class CountPortals implements Plugin.Class {
// ...
}
```

3. Then create the toolbar button:

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

This code creates a toolbar group `<div>` and a button `<a>` with your icon, then attaches them to the map container.

Ensure your "autobuild" command is still running. Navigate to [http://localhost:8100](http://localhost:8100), update your script, and reload IITC. It's helpful to keep localhost and IITC open in separate tabs.

## CSS

Let's keep our code clean by moving styles into the CSS file. You already have `styles.css`—let's use it:

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

You'll see an error message in your terminal because the icon import is no longer needed in `Main.ts`. Remove this import line:

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

Let's clean up the code and move button creation to a separate function to keep `init()` easy to read:

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

The `private` keyword tells the compiler that this function is only used internally. Mark most of your functions as `private`—it won't affect the final JavaScript but helps identify unused code. 
