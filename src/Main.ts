import * as Plugin from "iitcpluginkit";

const HACK_RANGE = 40;

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


        const toolbarGroup = $("<div>", { class: "leaflet-bar leaflet-control" })
            .append(
                $("<a>", {
                    class: "mybutton leaflet-bar-part",
                    click: () => this.doCount()
                })
            );

        const parent = $(".leaflet-top.leaflet-left", window.map.getContainer());
        parent.append(toolbarGroup);
    }

    doCount(): void {

        if (!window.plugin.drawTools) {
            alert("DrawTools are required");
            return;
        }

        const portals = this.findHackablePortals();
        alert(`Portals in Hack range: ${portals.length}`)
    }

    private findHackablePortals(): IITC.Portal[] {

        const result = [];

        for (const guid in window.portals) {
            const portal = window.portals[guid];
            const position = portal.getLatLng();

            const closestPoint = this.findNearestPoint(position);

            if (closestPoint && position.distanceTo(closestPoint) <= HACK_RANGE) {
                result.push(portal);
            }
        }

        return result;
    }

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
}


Plugin.Register(new CountPortals(), "CountPortals");
