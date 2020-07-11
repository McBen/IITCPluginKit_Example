import * as Plugin from "iitcpluginkit";


class CountPortals implements Plugin.Class {

    init() {
        console.log("CountPortals " + VERSION);

        require("./styles.css");

        alert("Hello World");
    }

}


Plugin.Register(new CountPortals(), "CountPortals");
