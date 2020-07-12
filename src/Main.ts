import * as Plugin from "iitcpluginkit";

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
        alert("Hello World");
    }
}


Plugin.Register(new CountPortals(), "CountPortals");
