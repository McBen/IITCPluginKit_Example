# 3. The Calculation

Let's implement the core functionality. We'll work top-down, starting with the expected result:
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
We check if the DrawTools plugin is installed, then retrieve a list of hackable portals, and finally display the result to the user.

One level deeper, we loop through all portals and check if they're within range:
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

`window.portals` is where IITC stores all portal data. `IITC.Portal` is a type definition provided by IITCPluginKit. If you like you can explore all available type definitions in `./node_modules/iitcpluginkit/src/types/iitc` or most IDEs will give you a tooltip hint. 
The `.distanceTo()` method is a Leaflet function that calculates the distance between points in meters.

Going deeper, we loop through all drawn polylines:

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

`drawnItems` is the layer where DrawTools stores all its content. The `<L.LayerGroup<any>>` syntax tells TypeScript the variable's type, which helps with code completion and eliminates warnings.

In summary: we iterate through all drawn items, find those that are GeodesicPolylines, get their positions, and find the nearest point on each line to our portal position.

Finally, some mathematical utilities:

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

For simplicity, we treat these (Geodesic) Curved lines as straight lines. This isn't technically correct and may introduce small errors for very long polylines, but it saves computation and is imperceptible to most users.

`closedPoint()` calculates the closest point on line segment a-b to point x. `distance2()` returns the squared 2D distance between two points.

Finally, let's replace the hard-coded value `40` in `findHackablePortals()` with a named constant:

```typescript
if (closestPoint && position.distanceTo(closestPoint) <= HACK_RANGE) 
```
and place the definition at the top of the file:

```typescript {3}
import * as Plugin from "iitcpluginkit";

const HACK_RANGE = 40;
```

Not only this is easier to change. It's also easier to read and understand.
