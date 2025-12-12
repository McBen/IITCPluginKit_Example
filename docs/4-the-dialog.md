# 4. The Dialog

A simple `alert` dialog is fine for a quick message. If we want to provide better user experience we should use a better approach: a real dialog

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

We created a table with more details of the found portals.

### Portal-Data - side story
Many plugins use portal data, and so we should take a deeper look.

All portals are stored in the window.portals object with the GUID as key. It includes all visible portals plus some outside of your view.

These portal uses the IITC.Portals format. In fact these are Leaflet markers with more data stored in `options`. And to increase confusions this has another sub-structure `data` which hold more detail information about the portal. 

There is even another data-structure `ent` but this one we shouldn't touch. IITC has already processed this raw-data.

Without the leaflet stuff:
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

This is the data you'll get for all portals on the map. Portal-Detail data are handled separately.

Be aware that Portals in 'Link-Zoom' have no data. They not even exists. IITC creates dummy-portals at the end of links. They only contain Position, GUID and Faction. So before processing check if data is available - like check if name is present.


### Back to our dialog
First we count portals by each faction (portal.options.team). Then count these by level 8 to 1 (portal.options.data.level).

All the <> stuff is for creating a html-table stored as HTML-String in `contents`. 

At last, we have to create the dialog by using IITC dialog helper. It's a IITC-wrapper for JQuery Dialogs.
This is the function you'll use a lot for your dialogs. 

Because we gave it an ID IITC will make sure that only one of our dialog is open at the same time.

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

The CSS file we use here is processed by [postCSS](https://postcss.org/). This allows us to add some more elegant handling in our CSS like nested rules.
VS-code won't know that our CSS uses the postCSS format. For better syntax highlighting install a postCSS extension (like: postcss-sugarss-language) and switch file type from css to postcss in the lower right corner of the editor.

What we did here:
- our table uses the class "countTable"
- evey odd row uses a different background color
- added a special row (class "sep") as a separator

Instead of constructing this in an HTML-String we could have use JQuery of plain 'createElement's. 
I usually start with a quick HTML-String and then rewrite these in JQuery to ease event handling. But that's up to you.
