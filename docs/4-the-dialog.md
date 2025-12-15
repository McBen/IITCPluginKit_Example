# 4. The Dialog

A simple `alert()` dialog works for quick messages, but a proper dialog provides a better user experience:

```typescript {10-29}
doCount(): void {

    if (!window.plugin.drawTools) {
        alert("DrawTools are required");
        return;
    }

    const portals = this.findHackablePortals();

    let contents = "<table>"
    contents += `<tr><td>Total:</td><td>${portals.length}</td></tr>`;

    const resPortals = portals.filter(p => p.options.team == TEAM_RES);
    const enlPortals = portals.filter(p => p.options.team == TEAM_ENL);
    contents += `<tr><td>RES</td><td>${resPortals.length}</td></tr>`;
    contents += `<tr><td>ENL</td><td>${enlPortals.length}</td></tr>`;

    for (let i = 8; i > 0; i--) {
        const levelPortals = portals.filter(p => p.options.team != TEAM_NONE && p.options.data.level == i);
        contents += `<tr><td>Level ${i}</td><td>${levelPortals.length}</td></tr>`;
    }

    contents += "</table>"

    dialog({
        id: "pathPortals",
        title: "Portals on Path",
        html: contents
    });
}
```

We've created a table displaying detailed information about the found portals.

### Portal Data—A Closer Look

Since many plugins work with portal data, it's worth understanding the structure in detail.

All portals are stored in the `window.portals` object, keyed by GUID. This includes visible portals plus some outside your current view.

These portals use the `IITC.Portal` format, which are Leaflet markers with additional data stored in `options`. There's also a nested `data` structure containing more detailed information.

There is another data structure called `ent`, but it should not be modified—IITC has already processed this raw data.

Simplified structure:
```typescript
 interface IITC.Portal {
     options:  {
        guid: string;   // Unique ID
        ent: any;       // raw data
        level: number;  
        team: number;   // use the constants TEAM_NEU, TEAM_RES, TEAM_ENL
        timestamp: number; 
        data: {
          artifactBrief: any;
          health: number;
          image: string;  // url
          level: number;  // equal to options.level
          latE6: number;  // position * 1e6
          lngE6: number;  // position * 1e6
          mission: boolean;
          mission50plus: boolean;
          ornaments: any[];
          resCount: number;
          team: string;  // faction as string: "N","R","E"
          timestamp: number;
          title: string;
     }
   }
}
```

This is the data structure for all portals on the map.  Portal-Detail data is handled separately.

Be aware that portals in 'Link-Zoom' are dummy portals created by IITC at link endpoints. They contain only position, GUID, and faction information. Always check if data is available (e.g., verify the name exists) before processing portal details.


### Back to Our Dialog

We count portals by faction using `portal.options.team`, then count them by level (8 to 1) using `portal.options.data.level`.

The HTML string in `contents` builds a table. Finally, we create the dialog using IITC's dialog helper, which wraps jQuery dialogs. This is a function you'll use frequently for dialogs.

By providing an ID, IITC ensures only one instance of our dialog is open at a time.

The table itself looks really boring. Let's add some CSS styling:

:::code-group
```typescript {1,4,11} [Main.ts]
let contents = "<table class='countTable'>"
contents += `<tr><td>Total:</td><td>${portals.length}</td></tr>`;

contents += `<tr class="sep"><td colspan="2"></td></tr>`;

const resPortals = portals.filter(p => p.options.team == TEAM_RES);
const enlPortals = portals.filter(p => p.options.team == TEAM_ENL);
contents += `<tr><td>RES</td><td>${resPortals.length}</td></tr>`;
contents += `<tr><td>ENL</td><td>${enlPortals.length}</td></tr>`;

contents += `<tr class="sep"><td colspan="2"></td></tr>`;

for (let i = 8; i > 0; i--) {
    const levelPortals = portals.filter(p => p.options.team != TEAM_NONE && p.options.data.level == i);
    contents += `<tr><td>Level ${i}</td><td>${levelPortals.length}</td></tr>`;
}

contents += "</table>"
```
:::

:::code-group
```css [styles.css]
.countTable {
    width: 100%;
    
    tr:nth-child(odd) td {
        background-color: #102060;
    }

    .sep td {
        height: 5px;
        background-color: #ffe37f !important
    }
}
```
:::

The CSS file is processed by [PostCSS](https://postcss.org/), which allows more elegant syntax like nested rules. VS Code won't recognize PostCSS by default. For better syntax highlighting, install a PostCSS extension (such as postcss-sugarss-language) and switch the file type from CSS to PostCSS in the editor's bottom right corner.

What we did here:
- Applied the class `countTable` to our table
- Alternated background colors on odd rows
- Added a separator row with the `sep` class

Instead of building the HTML as a string, you could use jQuery or `createElement()`. I typically start with quick HTML strings and refactor to jQuery for better event handling, but that's your preference.
