# 5. Map Icons

Next we want to mark these portals on the map.

Leaflet is the underlaying library for all the drawing stuff. All visible items are based on 'L.Layer'.
A LayerGroup will be our container for all our things.
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

By calling "window.addLayerGroup" we transfer the visibility control of our layer container to the IITC Layer Control (the top right layer-chooser)

Now draw circles around our portals.
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

A  CircleMarker is a quick an easy solution. If you prefer some more unique you could create a "L.Marker" and add a custom "L.Icon". But here we'll stay with circles.

Showing them all the time is a little bit annoying. We'll bind their visibility to the dialog.

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
Remove the initialization and let Typescript know that the layer value can be undefined (`layer?`).
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
We removed the "addLayerGroup" to get back full control of the visibility of the layer.
Then we directly add our container to the map and add a close-event handler to the dialog.

There are two new options in `new L.CircleMarker()`. These will prevent click interaction. One is for the old Leaflet the other for the newer version.
If you want user interaction change the clickable and interactive to `true` and add a `marker.on("click", ()=> ...)` event handler.

Since the current type in IITCPluginKit only covers the old Leaflet the 'interactive' will generate a compiler error. To prevent this we changed the type to the allrounder `<any>`. Long story short: You should avoid `any` if possible.
