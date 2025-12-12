# 5. Map Icons

Next we'll mark the found portals visually on the map.

Leaflet is the underlying library used by IITC; visible items are implementations of `L.Layer`. A `L.LayerGroup` will be our container for all our things.

```typescript {12,13}
class CountPortals implements Plugin.Class {

    private layer: L.LayerGroup<any>;

    init(): void {
        console.log("CountPortals " + VERSION);

        require("./styles.css");

        this.createButtons();

        this.layer = new L.LayerGroup();
        window.addLayerGroup("Portals on path", this.layer, true);
    }
}
```

Calling `window.addLayerGroup` hands visibility control of our container to IITC's layer control (the top-right layers menu).

Now draw circle markers around each portal:

```typescript {11,14-25}
doCount(): void {
    
    // ...
   
   dialog({
        id: "pathPortals",
        title: "Portals on Path",
        html: contents
    });

    this.drawPortals(portals);
}

private drawPortals(portals: IITC.Portal[]): void {
    this.layer.clearLayers();

    portals.forEach(portal => {
        const marker = new L.CircleMarker(portal.getLatLng(), {
            color: "red",
            stroke: true
        });

        this.layer.addLayer(marker);
    });
}
```

`L.CircleMarker` is a quick and lightweight way to visualize positions. If you prefer custom icons, you can use `L.Marker` with a custom `L.Icon`, but circles are sufficient for this example.

Keeping the markers visible permanently can be annoying. A common pattern is to show them while a dialog is open and remove them when it closes.

```typescript {3}
class CountPortals implements Plugin.Class {

    private layer?: L.LayerGroup<any>;

    init(): void {
        console.log("CountPortals " + VERSION);

        require("./styles.css");

        this.createButtons();
    }
}
```

Here we make the `layer` optional (`layer?`) so it can be undefined until needed.

```typescript {9,16-21,31,35-40}
doCount(): void {

    // ...

    dialog({
        id: "pathPortals",
        title: "Portals on Path",
        html: contents,
        closeCallback: () => this.onDialogClose()
    });

    this.drawPortals(portals);
}

private drawPortals(portals: IITC.Portal[]): void {
    if (this.layer) {
        window.map.removeLayer(this.layer);
    }

    this.layer = new L.LayerGroup();
    window.map.addLayer(this.layer);

    portals.forEach(portal => {
        const marker = new L.CircleMarker(portal.getLatLng(), <any>{
            color: "red",
            stroke: true,
            clickable: false,  /* Leaflet 0.7*/
            interactive: false /* Leaflet 1.0+*/
        });

        this.layer!.addLayer(marker);
    });
}

onDialogClose(): void {
    if (this.layer) {
        window.map.removeLayer(this.layer);
        this.layer = undefined;
    }
}
```

We removed the `addLayerGroup` usage to manage visibility ourselves. When the dialog opens we create and add the layer to the map; when the dialog closes we remove it.

The example sets both `clickable: false` (Leaflet 0.7) and `interactive: false` (Leaflet 1.0+). If you want the markers to respond to clicks, set these to `true` and attach a handler with `marker.on("click", () => { ... })`.

Type definitions included with IITCPluginKit currently target older Leaflet versions, so `interactive` may trigger a TypeScript error. The example uses `<any>` to avoid that; prefer concrete types if possible and avoid `any` when you can.
