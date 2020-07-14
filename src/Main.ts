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

        dialog({
            id: "pathPortals",
            title: "Portals on Path",
            html: contents
        });
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
