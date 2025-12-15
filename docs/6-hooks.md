# 6. Hooks

So far our plugin only reacts when the dialog is opened. "Hooks" are how IITC broadcasts event messages to plugins.

Before we add hooks, we first change how the dialog is populated with data.
```typescript {4,13-24,27-49,56}
class CountPortals implements Plugin.Class {

    private layer?: L.LayerGroup<any>;
    private dialog?: JQuery;

    doCount(): void {

        if (!window.plugin.drawTools) {
            alert("DrawTools are required");
            return;
        }

        let contents = "<table class='countTable'></table>";

        this.dialog = dialog({
            id: "pathPortals",
            title: "Portals on Path",
            html: contents,
            closeCallback: () => this.onDialogClose()
        });

        const portals = this.findHackablePortals();
        this.updateDialog(portals);
        this.drawPortals(portals);
    }

    updateDialog(portals: IITC.Portal[]): void {
        if (!this.dialog) return;

        let contents = `<tr><td>Total:</td><td>${portals.length}</td></tr>`;
        contents += `<tr class="sep"><td colspan="2"></td></tr>`;

        const resPortals = portals.filter(p => p.options.team == TEAM_RES);
        const enlPortals = portals.filter(p => p.options.team == TEAM_ENL);
        contents += `<tr><td>RES</td><td>${resPortals.length}</td></tr>`;
        contents += `<tr><td>ENL</td><td>${enlPortals.length}</td></tr>`;

        contents += `<tr class="sep"><td colspan="2"></td></tr>`;

        for (let i = 8; i > 0; i--) {
            const levelPortals = portals.filter(
                p => p.options.team != TEAM_NONE && p.options.data.level == i
            );
            contents += `<tr><td>Level ${i}</td><td>${levelPortals.length}</td></tr>`;
        }

        const table = this.dialog.find(".countTable");
        table.html(contents);
    }

    onDialogClose(): void {
        if (this.layer) {
            window.map.removeLayer(this.layer);
            this.layer = undefined;

            this.dialog = undefined;
        }
    }
}
```

We keep a reference to the dialog so we can update or clear it when needed. The `updateDialog` method rebuilds the table contents from the latest data.


Next we'll subscribe to the message sent by drawTools:
```typescript {11,14-18,27}
class CountPortals implements Plugin.Class {
    
    doCount(): void {
        
        // ...
        
        const portals = this.findHackablePortals();
        this.updateDialog(portals);
        this.drawPortals(portals);

        window.addHook("pluginDrawTools", this.onDrawingChanged);
    }

    onDrawingChanged = (): void => {
        const portals = this.findHackablePortals();
        this.updateDialog(portals);
        this.drawPortals(portals);
    }

    onDialogClose(): void {
        if (this.layer) {
            window.map.removeLayer(this.layer);
            this.layer = undefined;

            this.dialog = undefined;

            window.removeHook("pluginDrawTools", this.onDrawingChanged);
        }
    }
}
```

You may notice the handler is defined as an arrow function assigned to a class property: `onDrawingChanged = (): void => { ... }`. Assigning the callback this way ensures it keeps the correct `this` binding and lets us pass the function directly to `addHook` as `window.addHook("pluginDrawTools", this.onDrawingChanged)`.
(if you're familar with javascript this is just a different way of "bind")

Because we register the hook when the dialog is created, we must remove it when the dialog is closed. Storing the function reference makes it possible to call `window.removeHook("pluginDrawTools", this.onDrawingChanged)` later.

Note: `addHook` validates the message name. If you define your own messages or use hooks provided by other third-party plugins, call `window.pluginCreateHook("pluginDrawTools")` before registering the hook.
