// ==UserScript==
// @name            IITC plugin: CountPortals
// @category        Misc
// @version         0.0.0
// @namespace       https://github.com/jonatkins/ingress-intel-total-conversion
// @include         https://intel.ingress.com/*
// @id              iitc_plugin_CountPortals
// @author          
// @icon64          data:image/png;base64,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
// ==/UserScript==
function wrapper(t) {
    ! function (t) {
        var e = {};

        function n(o) {
            if (e[o]) return e[o].exports;
            var r = e[o] = {
                i: o,
                l: !1,
                exports: {}
            };
            return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
        }
        n.m = t, n.c = e, n.d = function (t, e, o) {
            n.o(t, e) || Object.defineProperty(t, e, {
                enumerable: !0,
                get: o
            })
        }, n.r = function (t) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
                value: "Module"
            }), Object.defineProperty(t, "__esModule", {
                value: !0
            })
        }, n.t = function (t, e) {
            if (1 & e && (t = n(t)), 8 & e) return t;
            if (4 & e && "object" == typeof t && t && t.__esModule) return t;
            var o = Object.create(null);
            if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
                for (var r in t) n.d(o, r, function (e) {
                    return t[e]
                }.bind(null, r));
            return o
        }, n.n = function (t) {
            var e = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return n.d(e, "a", e), e
        }, n.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, n.p = "", n(n.s = 6)
    }([function (t, _e, n) {
        var o = n(1),
            r = n(2);
        "string" == typeof (r = r.__esModule ? r.default : r) && (r = [
            [t.i, r, ""]
        ]);
        var i = {
            insert: "head",
            singleton: !1
        };
        o(r, i);
        t.exports = r.locals || {}
    }, function (t, _e, n) {
        "use strict";
        var o, r = function () {
            return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), o
        },
            i = function () {
                var t = {};
                return function (e) {
                    if (void 0 === t[e]) {
                        var n = document.querySelector(e);
                        if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                            n = n.contentDocument.head
                        } catch (t) {
                            n = null
                        }
                        t[e] = n
                    }
                    return t[e]
                }
            }(),
            a = [];

        function s(t) {
            for (var e = -1, n = 0; n < a.length; n++)
                if (a[n].identifier === t) {
                    e = n;
                    break
                } return e
        }

        function l(t, e) {
            for (var n = {}, o = [], r = 0; r < t.length; r++) {
                var i = t[r],
                    l = e.base ? i[0] + e.base : i[0],
                    c = n[l] || 0,
                    d = "".concat(l, " ").concat(c);
                n[l] = c + 1;
                var u = s(d),
                    f = {
                        css: i[1],
                        media: i[2],
                        sourceMap: i[3]
                    }; - 1 !== u ? (a[u].references++, a[u].updater(f)) : a.push({
                        identifier: d,
                        updater: m(f, e),
                        references: 1
                    }), o.push(d)
            }
            return o
        }

        function c(t) {
            var e = document.createElement("style"),
                o = t.attributes || {};
            if (void 0 === o.nonce) {
                var r = n.nc;
                r && (o.nonce = r)
            }
            if (Object.keys(o).forEach((function (t) {
                e.setAttribute(t, o[t])
            })), "function" == typeof t.insert) t.insert(e);
            else {
                var a = i(t.insert || "head");
                if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                a.appendChild(e)
            }
            return e
        }
        var d, u = (d = [], function (t, e) {
            return d[t] = e, d.filter(Boolean).join("\n")
        });

        function f(t, e, n, o) {
            var r = n ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
            if (t.styleSheet) t.styleSheet.cssText = u(e, r);
            else {
                var i = document.createTextNode(r),
                    a = t.childNodes;
                a[e] && t.removeChild(a[e]), a.length ? t.insertBefore(i, a[e]) : t.appendChild(i)
            }
        }

        function p(t, _e, n) {
            var o = n.css,
                r = n.media,
                i = n.sourceMap;
            if (r ? t.setAttribute("media", r) : t.removeAttribute("media"), i && btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), t.styleSheet) t.styleSheet.cssText = o;
            else {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(o))
            }
        }
        var h = null,
            g = 0;

        function m(t, e) {
            var n, o, r;
            if (e.singleton) {
                var i = g++;
                n = h || (h = c(e)), o = f.bind(null, n, i, !1), r = f.bind(null, n, i, !0)
            } else n = c(e), o = p.bind(null, n, e), r = function () {
                ! function (t) {
                    if (null === t.parentNode) return !1;
                    t.parentNode.removeChild(t)
                }(n)
            };
            return o(t),
                function (e) {
                    if (e) {
                        if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                        o(t = e)
                    } else r()
                }
        }
        t.exports = function (t, e) {
            (e = e || {}).singleton || "boolean" == typeof e.singleton || (e.singleton = r());
            var n = l(t = t || [], e);
            return function (t) {
                if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
                    for (var o = 0; o < n.length; o++) {
                        var r = s(n[o]);
                        a[r].references--
                    }
                    for (var i = l(t, e), c = 0; c < n.length; c++) {
                        var d = s(n[c]);
                        0 === a[d].references && (a[d].updater(), a.splice(d, 1))
                    }
                    n = i
                }
            }
        }
    }, function (t, e, n) {
        var o = n(3),
            r = n(4),
            i = n(5);
        e = o(!1);
        var a = r(i);
        e.push([t.i, ".mybutton{background-image:url(" + a + ");background-size:24px}.countTable{width:100%}.countTable tr:nth-child(odd) td{background-color:#102060}.countTable .sep td{height:5px;background-color:#ffe37f!important}", ""]), t.exports = e
    }, function (t, _e, _n) {
        "use strict";
        t.exports = function (t) {
            var e = [];
            return e.toString = function () {
                return this.map((function (e) {
                    var n = function (t, e) {
                        var n = t[1] || "",
                            o = t[3];
                        if (!o) return n;
                        if (e && "function" == typeof btoa) {
                            var r = (a = o, s = btoa(unescape(encodeURIComponent(JSON.stringify(a)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s), "/*# ".concat(l, " */")),
                                i = o.sources.map((function (t) {
                                    return "/*# sourceURL=".concat(o.sourceRoot || "").concat(t, " */")
                                }));
                            return [n].concat(i).concat([r]).join("\n")
                        }
                        var a, s, l;
                        return [n].join("\n")
                    }(e, t);
                    return e[2] ? "@media ".concat(e[2], " {").concat(n, "}") : n
                })).join("")
            }, e.i = function (t, n, o) {
                "string" == typeof t && (t = [
                    [null, t, ""]
                ]);
                var r = {};
                if (o)
                    for (var i = 0; i < this.length; i++) {
                        var a = this[i][0];
                        null != a && (r[a] = !0)
                    }
                for (var s = 0; s < t.length; s++) {
                    var l = [].concat(t[s]);
                    o && r[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n), e.push(l))
                }
            }, e
        }
    }, function (t, _e, _n) {
        "use strict";
        t.exports = function (t, e) {
            return e || (e = {}), "string" != typeof (t = t && t.__esModule ? t.default : t) ? t : (/^['"].*['"]$/.test(t) && (t = t.slice(1, -1)), e.hash && (t += e.hash), /["'() \t\n]/.test(t) || e.needQuotes ? '"'.concat(t.replace(/"/g, '\\"').replace(/\n/g, "\\n"), '"') : t)
        }
    }, function (t, _e) {
        t.exports = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 6.35 6.35'%3E%3Cg font-weight='400' font-family='sans-serif' letter-spacing='0' word-spacing='0' stroke='%23fff' stroke-miterlimit='2' paint-order='markers fill stroke'%3E%3Ctext style='line-height:125%25' x='3.034' y='296.648' font-size='4.166' stroke-width='.118' transform='translate(0 -290.65)'%3E%3Ctspan x='3.034' y='296.648'%3E3%3C/tspan%3E%3C/text%3E%3Ctext style='line-height:125%25' x='1.768' y='295.038' font-size='3.918' stroke-width='.111' transform='translate(0 -290.65)'%3E%3Ctspan x='1.768' y='295.038'%3E2%3C/tspan%3E%3C/text%3E%3Ctext style='line-height:125%25' x='.396' y='293.999' font-size='4.145' stroke-width='.118' transform='translate(0 -290.65)'%3E%3Ctspan x='.396' y='293.999'%3E1%3C/tspan%3E%3C/text%3E%3C/g%3E%3C/svg%3E"
    }, function (_e, n, o) {
        "use strict";
        o.r(n);
        ! function (e, n) {
            const o = () => {
                window.plugin[n] = e, window.plugin[n].init()
            };
            o.info = t, window.bootPlugins || (window.bootPlugins = []), window.bootPlugins.push(o), window.iitcLoaded && o()
        }(new class {
            init() {
                o(0), this.createButtons()
            }
            createButtons() {
                $("#toolbox").append($("<a>", {
                    text: "Count",
                    click: () => this.doCount()
                }));
                const t = $("<div>", {
                    class: "leaflet-bar leaflet-control"
                }).append($("<a>", {
                    class: "mybutton leaflet-bar-part",
                    click: () => this.doCount()
                }));
                $(".leaflet-top.leaflet-left", window.map.getContainer()).append(t)
            }
            doCount() {
                if (!window.plugin.drawTools) return void alert("DrawTools are required");
                const t = this.findHackablePortals();
                let e = "<table class='countTable'>";
                e += `<tr><td>Total:</td><td>${t.length}</td></tr>`, e += '<tr class="sep"><td colspan="2"></td></tr>';
                const n = t.filter(t => t.options.team == TEAM_RES),
                    o = t.filter(t => t.options.team == TEAM_ENL);
                e += `<tr><td>RES</td><td>${n.length}</td></tr>`, e += `<tr><td>ENL</td><td>${o.length}</td></tr>`, e += '<tr class="sep"><td colspan="2"></td></tr>';
                for (let n = 8; n > 0; n--) {
                    const o = t.filter(t => t.options.team != TEAM_NONE && t.options.data.level == n);
                    e += `<tr><td>Level ${n}</td><td>${o.length}</td></tr>`
                }
                e += "</table>", dialog({
                    id: "pathPortals",
                    title: "Portals on Path",
                    html: e,
                    closeCallback: () => this.onDialogClose()
                }), this.drawPortals(t)
            }
            drawPortals(t) {
                this.layer = new L.LayerGroup, window.map.addLayer(this.layer), t.forEach(t => {
                    const e = new L.CircleMarker(t.getLatLng(), {
                        color: "red",
                        stroke: !0,
                        clickable: !1,
                        interactive: !1
                    });
                    this.layer.addLayer(e)
                })
            }
            onDialogClose() {
                this.layer && (window.map.removeLayer(this.layer), this.layer = void 0)
            }
            findHackablePortals() {
                const t = [];
                for (const e in window.portals) {
                    const n = window.portals[e],
                        o = n.getLatLng(),
                        r = this.findNearestPoint(o);
                    r && o.distanceTo(r) <= 40 && t.push(n)
                }
                return t
            }
            findNearestPoint(t) {
                const e = window.plugin.drawTools.drawnItems;
                let n, o = 1;
                return e.eachLayer(e => {
                    if (e instanceof L.GeodesicPolyline) {
                        const r = e.getLatLngs();
                        for (let e = 0; e < r.length - 1; e++) {
                            const i = this.closedPoint(r[e], r[e + 1], t),
                                a = this.distance2(t, i);
                            a < o && (o = a, n = i)
                        }
                    }
                }), n
            }
            closedPoint(t, e, n) {
                const o = e.lat - t.lat,
                    r = e.lng - t.lng,
                    i = o * o + r * r;
                if (0 === i) return t;
                let a = (o * n.lat + r * n.lng - (o * t.lat + r * t.lng)) / i;
                return a < 0 && (a = 0), a > 1 && (a = 1), L.latLng(t.lat + a * o, t.lng + a * r)
            }
            distance2(t, e) {
                const n = e.lat - t.lat,
                    o = e.lng - t.lng;
                return n * n + o * o
            }
        }, "CountPortals")
    }])
} ! function () {
    const t = {};
    if ("undefined" != typeof GM_info && GM_info && GM_info.script && (t.script = {
        version: GM_info.script.version,
        name: GM_info.script.name
    }), "undefined" != typeof unsafeWindow || "undefined" == typeof GM_info || "Tampermonkey" != GM_info.scriptHandler) {
        const e = document.createElement("script");
        e.appendChild(document.createTextNode("(" + wrapper + ")(" + JSON.stringify(t) + ");")), document.head.appendChild(e)
    } else wrapper(t)
}();