# 3. The Calculation

Let's fill the plugin with the real magic.
I prefer to solve things top-down. So we start with the expected result:
```typescript
doCount(): void {

    if (!window.plugin.drawTools) {
        alert("DrawTools are required");
        return;
    }

    const portals = this.findHackablePortals();
    alert(`Portals in Hack range: ${portals.length}`)
}
```
We check if the drawtool-plugin is installed. Then we need something that will give us a list of portals.
And last-but-not-least print the result to the user.

One step deeper: Loop through all portals and check if they are in range:
```typescript
private findHackablePortals(): IITC.Portal[] {

    const result = [];

    for (const guid in window.portals) {
        const portal = window.portals[guid];
        const position = portal.getLatLng();

        const closestPoint = this.findNearestPoint(position);

        if (closestPoint && position.distanceTo(closestPoint) <= 40) {
            result.push(portal);
        }
    }

    return result;
}
```

window.portals is the object IITC stores all portals. IITC.Portal is a helper type defintion IITCPluginKit provides you.
Maybe you want to take a look at all type definitions resikit included? see: ./node_modules/iitcpluginkit/src/types/iitc
It's still incomplete but should cover most function and types you need for a plugin.
".distanceTo" is a Leaflet function and will calculate the distance between points in meters.

Another step deeper: Loop through all drawed polylines.

```typescript
private findNearestPoint(pos: L.LatLng): L.LatLng | undefined {

    const drawnItems = <L.LayerGroup<any>>window.plugin.drawTools.drawnItems;

    let bestPosition;
    let minDistance = 1;

    drawnItems.eachLayer(layer => {
        if (layer instanceof L.GeodesicPolyline) {
            const lls = (<L.GeodesicPolyline>layer).getLatLngs();

            for (let i = 0; i < lls.length - 1; i++) {
                const cp = this.closedPoint(lls[i], lls[i + 1], pos);
                const distance = this.distance2(pos, cp);

                if (distance < minDistance) {
                    minDistance = distance;
                    bestPosition = cp;
                }
            }
        }
    });

    return bestPosition;
}
```

"drawnItems" is the layer DrawTools puts all it's stuff. The `<L.LayerGroup<any>>` tells Typescript what type it is.
It's not only removing a warning. It's also helps with code completion.
Long story short: We loop through all drawn items. Pick every item which is a GeodesicPolyline. Get all positions of the line.
Then loop through the positions to find the nearest point on the line to the portal position

And finally some math stuff:

```typescript
private closedPoint(a: L.LatLng, b: L.LatLng, x: L.LatLng): L.LatLng {

    const dx = b.lat - a.lat;
    const dy = b.lng - a.lng;
    const d = (dx * dx + dy * dy);
    if (d === 0) return a;

    let r = (dx * x.lat + dy * x.lng - (dx * a.lat + dy * a.lng)) / d;
    if (r < 0) r = 0;
    if (r > 1) r = 1;

    return L.latLng(a.lat + r * dx, a.lng + r * dy);
}

private distance2(a: L.LatLng, b: L.LatLng): number {

    const dx = b.lat - a.lat;
    const dy = b.lng - a.lng;
    return dx * dx + dy * dy;
}
```

To make things easy we assume that these geolines are straight lines. This is not correct and may lead to some error for long polylines.
But it saves a bunch of calculation stuff and most people won't hardly ever recognize it.
"closedPoint" calculates the point on the line a to b which is closest to x. 
"distance2" returns the squared 2d-distance between two points.

One last thing: lets replace the constant "40" in findHackablePortals with a more descripting word.

```typescript
if (closestPoint && position.distanceTo(closestPoint) <= HACK_RANGE) 
```
and place the definition at the top of the file:

```typescript {3}
import * as Plugin from "iitcpluginkit";

const HACK_RANGE = 40;
```

Not only this is easier to change. It's also easier to read and understand.
