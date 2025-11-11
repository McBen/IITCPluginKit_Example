# 6. Hooks

So far our plugin only reacts on dialog open.
"Hooks" are the way IITC will send event messages.

Before we start we have to change the way our dialog is filled with data.
```typescript
class CountPortals implements Plugin.Class {

    private layer?: L.LayerGroup<any>;
    private dialog?: JQuery;

    init() {

    [...]
    
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
            const levelPortals = portals.filter(p => p.options.team != TEAM_NONE && p.options.data.level == i);
            contents += `<tr><td>Level ${i}</td><td>${levelPortals.length}</td></tr>`;
        }
    
        const table = this.dialog.find(".countTable");
        table.html(contents);
    }
    
    [...]
    onDialogClose(): void {
        if (this.layer) {
            window.map.removeLayer(this.layer);
            this.layer = undefined;
        
            this.dialog = undefined;
        }
    }
```

We store the "dialog" handle and clears it on close. The function `updateDialog` will replace the contents of our table with a freshly generated snapshot.


Now let's subscribe to the message drawTools send:
```typescript
doCount(): void {
[...]
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

[...]
onDialogClose(): void {
    if (this.layer) {
        window.map.removeLayer(this.layer);
        this.layer = undefined;

        this.dialog = undefined;

        window.removeHook("pluginDrawTools", this.onDrawingChanged);
    }
}
```

Wait. What's that crazy function definition? `onDrawingChanged = (): void => {`  
Usually you'll use `addhook` like any other event handler and would use something like `window.addHook("pluginDrawTools", () => this.onDrawingChanged());`  
This is the regular way. Our "addHook" call is done when we create the dialog. So we also have to remove it again on dialog close.
For such a thing we need a variable were we store the function pointer. 

Note IITC.me: "addHook" will check if the string is a valid message string. If you created your own events or try to use other 3rd-party plugins messages, call `window.pluginCreateHook("pluginDrawTools")` before using them.
