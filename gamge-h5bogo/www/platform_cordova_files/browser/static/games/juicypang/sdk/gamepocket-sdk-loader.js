var gadgets = gadgets || {};
var shindig = shindig || {};
var osapi = osapi || {};
gadgets.config = function () {
    var a = {};
    var b;
    return {
        register: function (e, d, c) {
            var f = a[e];
            if (!f) {
                f = [];
                a[e] = f
            }
            f.push({validators: d || {}, callback: c})
        }, get: function (c) {
            if (c) {
                return b[c] || {}
            }
            return b
        }, init: function (e, n) {
            b = e;
            for (var c in a) {
                if (a.hasOwnProperty(c)) {
                    var d = a[c], k = e[c];
                    for (var h = 0, g = d.length; h < g; ++h) {
                        var l = d[h];
                        if (k && !n) {
                            var f = l.validators;
                            for (var m in f) {
                                if (f.hasOwnProperty(m)) {
                                    if (!f[m](k[m])) {
                                        throw new Error('Invalid config value "' + k[m] + '" for parameter "' + m + '" in component "' + c + '"')
                                    }
                                }
                            }
                        }
                        if (l.callback) {
                            l.callback(e)
                        }
                    }
                }
            }
        }, EnumValidator: function (f) {
            var e = [];
            if (arguments.length > 1) {
                for (var d = 0, c; (c = arguments[d]); ++d) {
                    e.push(c)
                }
            } else {
                e = f
            }
            return function (h) {
                for (var g = 0, j; (j = e[g]); ++g) {
                    if (h === e[g]) {
                        return true
                    }
                }
                return false
            }
        }, RegExValidator: function (c) {
            return function (d) {
                return c.test(d)
            }
        }, ExistsValidator: function (c) {
            return typeof c !== "undefined"
        }, NonEmptyStringValidator: function (c) {
            return typeof c === "string" && c.length > 0
        }, BooleanValidator: function (c) {
            return typeof c === "boolean"
        }, LikeValidator: function (c) {
            return function (e) {
                for (var f in c) {
                    if (c.hasOwnProperty(f)) {
                        var d = c[f];
                        if (!d(e[f])) {
                            return false
                        }
                    }
                }
                return true
            }
        }
    }
}();
gadgets.config.isGadget = true;
gadgets.config.isContainer = false;
gadgets.log = (function () {
    var e = 1;
    var a = 2;
    var f = 3;
    var c = 4;
    var d = function (i) {
        b(e, i)
    };
    gadgets.warn = function (i) {
        b(a, i)
    };
    gadgets.error = function (i) {
        b(f, i)
    };
    gadgets.setLogLevel = function (i) {
        h = i
    };

    function b(j, i) {
        if (j < h || !g) {
            return
        }
        if (j === a && g.warn) {
            g.warn(i)
        } else {
            if (j === f && g.error) {
                g.error(i)
            } else {
                if (g.log) {
                    g.log(i)
                }
            }
        }
    }

    d.INFO = e;
    d.WARNING = a;
    d.NONE = c;
    var h = e;
    var g = window.console ? window.console : window.opera ? window.opera.postError : undefined;
    return d
})();
if (window.JSON && window.JSON.parse && window.JSON.stringify) {
    gadgets.json = (function () {
        var a = /___$/;
        return {
            parse: function (c) {
                try {
                    return window.JSON.parse(c)
                } catch (b) {
                    return false
                }
            }, stringify: function (c) {
                try {
                    return window.JSON.stringify(c, function (e, d) {
                        return !a.test(e) ? d : null
                    })
                } catch (b) {
                    return null
                }
            }
        }
    })()
}
else {
    gadgets.json = function () {
        function f(n) {
            return n < 10 ? "0" + n : n
        }

        Date.prototype.toJSON = function () {
            return [this.getUTCFullYear(), "-", f(this.getUTCMonth() + 1), "-", f(this.getUTCDate()), "T", f(this.getUTCHours()), ":", f(this.getUTCMinutes()), ":", f(this.getUTCSeconds()), "Z"].join("")
        };
        var m = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};

        function stringify(value) {
            var a, i, k, l, r = /["\\\x00-\x1f\x7f-\x9f]/g, v;
            switch (typeof value) {
                case"string":
                    return r.test(value) ? '"' + value.replace(r, function (a) {
                        var c = m[a];
                        if (c) {
                            return c
                        }
                        c = a.charCodeAt();
                        return "\\u00" + Math.floor(c / 16).toString(16) + (c % 16).toString(16)
                    }) + '"' : '"' + value + '"';
                case"number":
                    return isFinite(value) ? String(value) : "null";
                case"boolean":
                case"null":
                    return String(value);
                case"object":
                    if (!value) {
                        return "null"
                    }
                    a = [];
                    if (typeof value.length === "number" && !value.propertyIsEnumerable("length")) {
                        l = value.length;
                        for (i = 0; i < l; i += 1) {
                            a.push(stringify(value[i]) || "null")
                        }
                        return "[" + a.join(",") + "]"
                    }
                    for (k in value) {
                        if (k.match("___$")) {
                            continue
                        }
                        if (value.hasOwnProperty(k)) {
                            if (typeof k === "string") {
                                v = stringify(value[k]);
                                if (v) {
                                    a.push(stringify(k) + ":" + v)
                                }
                            }
                        }
                    }
                    return "{" + a.join(",") + "}"
            }
            return "undefined"
        }

        return {
            stringify: stringify, parse: function (text) {
                if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/b-u]/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    return eval("(" + text + ")")
                }
                return false
            }
        }
    }()
}

gadgets.json.flatten = function (c) {
    var d = {};
    if (c === null || c === undefined) {
        return d
    }
    for (var a in c) {
        if (c.hasOwnProperty(a)) {
            var b = c[a];
            if (null === b || undefined === b) {
                continue
            }
            d[a] = (typeof b === "string") ? b : gadgets.json.stringify(b)
        }
    }
    return d
};
gadgets.util = function () {
    function g(k) {
        var l;
        var i = k.indexOf("?");
        var j = k.indexOf("#");
        if (j === -1) {
            l = k.substr(i + 1)
        } else {
            l = [k.substr(i + 1, j - i - 1), "&", k.substr(j + 1)].join("")
        }
        return l.split("&")
    }

    var e = null;
    var d = {};
    var c = {};
    var f = [];
    var a = {0: false, 10: true, 13: true, 34: true, 39: true, 60: true, 62: true, 92: true, 8232: true, 8233: true};

    function b(i, j) {
        return String.fromCharCode(j)
    }

    function h(i) {
        d = i["core.util"] || {}
    }

    if (gadgets.config) {
        gadgets.config.register("core.util", null, h)
    }
    return {
        getUrlParameters: function (t) {
            var l = typeof t === "undefined";
            if (e !== null && l) {
                return e
            }
            var p = {};
            var m = g(t || document.location.href);
            var r = function (i) {
                var u = window.decodeURIComponent ? decodeURIComponent : unescape;
                try {
                    return u(i)
                } catch (j) {
                    return i
                }
            };
            for (var o = 0, n = m.length; o < n; ++o) {
                var q = m[o].indexOf("=");
                if (q === -1) {
                    continue
                }
                var k = m[o].substring(0, q);
                var s = m[o].substring(q + 1);
                s = s.replace(/\+/g, " ");
                p[k] = r(s)
            }
            if (l) {
                e = p
            }
            return p
        }, makeClosure: function (n, p, o) {
            var m = [];
            for (var l = 2, k = arguments.length; l < k; ++l) {
                m.push(arguments[l])
            }
            return function () {
                var q = m.slice();
                for (var s = 0, r = arguments.length; s < r; ++s) {
                    q.push(arguments[s])
                }
                return p.apply(n, q)
            }
        }, makeEnum: function (k) {
            var l, j, m = {};
            for (l = 0; (j = k[l]); ++l) {
                m[j] = j
            }
            return m
        }, getFeatureParameters: function (i) {
            return typeof d[i] === "undefined" ? null : d[i]
        }, hasFeature: function (i) {
            return typeof d[i] !== "undefined"
        }, getServices: function () {
            return c
        }, registerOnLoadHandler: function (i) {
            f.push(i)
        }, runOnLoadHandlers: function () {
            for (var l = 0, k = f.length; l < k; ++l) {
                f[l]()
            }
        }, escape: function (k, o) {
            if (!k) {
                return k
            } else {
                if (typeof k === "string") {
                    return gadgets.util.escapeString(k)
                } else {
                    if (typeof k === "array") {
                        for (var n = 0, l = k.length; n < l; ++n) {
                            k[n] = gadgets.util.escape(k[n])
                        }
                    } else {
                        if (typeof k === "object" && o) {
                            var m = {};
                            for (var p in k) {
                                if (k.hasOwnProperty(p)) {
                                    m[gadgets.util.escapeString(p)] = gadgets.util.escape(k[p], true)
                                }
                            }
                            return m
                        }
                    }
                }
            }
            return k
        }, escapeString: function (o) {
            if (!o) {
                return o
            }
            var l = [], n, p;
            for (var m = 0, k = o.length; m < k; ++m) {
                n = o.charCodeAt(m);
                p = a[n];
                if (p === true) {
                    l.push("&#", n, ";")
                } else {
                    if (p !== false) {
                        l.push(o.charAt(m))
                    }
                }
            }
            return l.join("")
        }, unescapeString: function (i) {
            if (!i) {
                return i
            }
            return i.replace(/&#([0-9]+);/g, b)
        }, attachBrowserEvent: function (k, j, l, i) {
            if (typeof k.addEventListener != "undefined") {
                k.addEventListener(j, l, i)
            } else {
                if (typeof k.attachEvent != "undefined") {
                    k.attachEvent("on" + j, l)
                } else {
                    gadgets.warn("cannot attachBrowserEvent: " + j)
                }
            }
        }, removeBrowserEvent: function (k, j, l, i) {
            if (k.removeEventListener) {
                k.removeEventListener(j, l, i)
            } else {
                if (k.detachEvent) {
                    k.detachEvent("on" + j, l)
                } else {
                    gadgets.warn("cannot removeBrowserEvent: " + j)
                }
            }
        }
    }
}();
gadgets.util.getUrlParameters();
gadgets.rpctx = gadgets.rpctx || {};
if (!gadgets.rpctx.wpm) {
    gadgets.rpctx.wpm = function () {
        var f, d;
        var c;
        var e = false;
        var a = false;
        var g = false;

        function b() {
            var i = false;

            function j(k) {
                if (k.data === "postmessage.test") {
                    i = true;
                    if (typeof k.origin === "undefined") {
                        a = true
                    }
                }
            }

            gadgets.util.attachBrowserEvent(window, "message", j, false);
            window.postMessage("postmessage.test", "*");
            if (i) {
                e = true
            }
            gadgets.util.removeBrowserEvent(window, "message", j, false)
        }

        function h(k) {
            var l = gadgets.json.parse(k.data);
            if (g) {
                if (!l || !l.f) {
                    return
                }
                var j = gadgets.rpc.getRelayUrl(l.f) || gadgets.util.getUrlParameters()["parent"];
                var i = gadgets.rpc.getOrigin(j);
                if (!a ? k.origin !== i : k.domain !== /^.+:\/\/([^:]+).*/.exec(i)[1]) {
                    return
                }
            }
            f(l)
        }

        return {
            getCode: function () {
                return "wpm"
            }, isParentVerifiable: function () {
                return true
            }, init: function (i, j) {
                f = i;
                d = j;
                b();
                if (!e) {
                    c = function (l, m, k) {
                        l.postMessage(m, k)
                    }
                } else {
                    c = function (l, m, k) {
                        window.setTimeout(function () {
                            l.postMessage(m, k)
                        }, 0)
                    }
                }
                gadgets.util.attachBrowserEvent(window, "message", h, false);
                d("..", true);
                return true
            }, setup: function (k, j, i) {
                g = i;
                if (k === "..") {
                    if (g) {
                        gadgets.rpc._createRelayIframe(j)
                    } else {
                        gadgets.rpc.call(k, gadgets.rpc.ACK)
                    }
                }
                return true
            }, call: function (j, n, m) {
                var l = gadgets.rpc._getTargetWin(j);
                var k = gadgets.rpc.getRelayUrl(j) || gadgets.util.getUrlParameters()["parent"];
                var i = gadgets.rpc.getOrigin(k);
                if (i) {
                    c(l, gadgets.json.stringify(m), i)
                } else {
                    if (j === "..") {
                        gadgets.error("There is no valid GamePocket player. SDK is not activated.")
                    } else {
                        gadgets.error("There is no valid GamePocket frame. SDK is not activated.")
                    }
                }
                return true
            }, relayOnload: function (j, i) {
                d(j, true)
            }
        }
    }()
}
;
if (!gadgets.rpc) {
    gadgets.rpc = function () {
        var A = "__cb";
        var G = "";
        var H = "__ack";
        var e = 500;
        var v = 10;
        var m = {};
        var J = {};
        var s = {};
        var r = {};
        var p = 0;
        var i = {};
        var j = {};
        var E = {};
        var d = {};
        var k = {};
        var t = {};
        var q = (window.top !== window.self);
        var o = window.name;
        var y = function () {
        };
        var D = 0;
        var M = 1;
        var a = 2;
        var F = (function () {
            function Q(R) {
                return function () {
                    gadgets.log("The game pocket SDK will not run properly in the current browser.Please update to the latest browser.")
                }
            }

            return {
                getCode: function () {
                    return "noop"
                }, isParentVerifiable: function () {
                    return true
                }, init: Q("init"), setup: function () {
                }, call: Q("call")
            }
        })();
        if (gadgets.util) {
            d = gadgets.util.getUrlParameters()
        }

        function z() {
            return typeof window.postMessage === "function" ? gadgets.rpctx.wpm : typeof window.postMessage === "object" ? gadgets.rpctx.wpm : F
        }

        function h(V, T) {
            var R = w;
            if (!T) {
                R = F
            }
            k[V] = R;
            var Q = t[V] || [];
            for (var S = 0; S < Q.length; ++S) {
                var U = Q[S];
                U.t = u(V);
                R.call(V, U.f, U)
            }
            t[V] = []
        }

        var x = false, I = false;

        function B() {
            if (I) {
                return
            }

            function Q() {
                x = true
            }

            gadgets.util.attachBrowserEvent(window, "unload", Q, false);
            I = true
        }

        function g(Q, U, R, T, S) {
            if (!r[U] || r[U] !== R) {
                gadgets.error("Invalid auth token. " + r[U] + " vs " + R);
                y(U, a)
            }
            S.onunload = function () {
                if (j[U] && !x) {
                    y(U, M);
                    gadgets.rpc.removeReceiver(U)
                }
            };
            B();
            T = gadgets.json.parse(decodeURIComponent(T));
            w.relayOnload(U, T)
        }

        function N(R) {
            if (R && typeof R.s === "string" && typeof R.f === "string" && R.a instanceof Array) {
                if (r[R.f]) {
                    if (r[R.f] !== R.t) {
                        gadgets.error("Invalid auth token. " + r[R.f] + " vs " + R.t);
                        y(R.f, a)
                    }
                }
                if (R.s === H) {
                    window.setTimeout(function () {
                        h(R.f, true)
                    }, 0);
                    return
                }
                if (R.c) {
                    R.callback = function (S) {
                        gadgets.rpc.call(R.f, A, null, R.c, S)
                    }
                }
                var Q = (m[R.s] || m[G]).apply(R, R.a);
                if (R.c && typeof Q !== "undefined") {
                    gadgets.rpc.call(R.f, A, null, R.c, Q)
                }
            }
        }

        function n(S) {
            if (!S) {
                return ""
            }
            S = S.toLowerCase();
            if (S.indexOf("//") === 0) {
                S = window.location.protocol + S
            }
            if (S.indexOf("://") === -1) {
                S = window.location.protocol + "//" + S
            }
            var T = S.substring(S.indexOf("://") + 3);
            var Q = T.indexOf("/");
            if (Q !== -1) {
                T = T.substring(0, Q)
            }
            var V = S.substring(0, S.indexOf("://"));
            var U = "";
            var W = T.indexOf(":");
            if (W !== -1) {
                var R = T.substring(W + 1);
                T = T.substring(0, W);
                if ((V === "http" && R !== "80") || (V === "https" && R !== "443")) {
                    U = ":" + R
                }
            }
            return V + "://" + T + U
        }

        function P(R) {
            if (typeof R === "undefined" || R === "..") {
                return window.parent
            }
            R = String(R);
            var Q = window.frames[R];
            if (Q && "frames" in Q) {
                return Q
            }
            Q = document.getElementById(R);
            if (Q && Q.contentWindow) {
                return Q.contentWindow
            }
            return null
        }

        var w = z();
        m[G] = function () {
            gadgets.warn("Unknown RPC service: " + this.s)
        };
        m[A] = function (R, Q) {
            var S = i[R];
            if (S) {
                delete i[R];
                S(Q)
            }
        };

        function L(T, R, Q) {
            if (j[T] === true) {
                return
            }
            if (typeof j[T] === "undefined") {
                j[T] = 0
            }
            var S = document.getElementById(T);
            if (T === ".." || S != null) {
                if (w.setup(T, R, Q) === true) {
                    j[T] = true;
                    return
                }
            }
            if (j[T] !== true && j[T]++ < v) {
                window.setTimeout(function () {
                    L(T, R, Q)
                }, e)
            } else {
                k[T] = F;
                j[T] = true
            }
        }

        function C(R, U) {
            if (typeof E[R] === "undefined") {
                E[R] = false;
                var T = gadgets.rpc.getRelayUrl(R);
                if (n(T) !== n(window.location.href)) {
                    return false
                }
                var S = P(R);
                try {
                    E[R] = S.gadgets.rpc.receiveSameDomain
                } catch (Q) {
                    gadgets.error("Same domain call failed: parent= incorrectly set.")
                }
            }
            if (typeof E[R] === "function") {
                E[R](U);
                return true
            }
            return false
        }

        function O(R, Q, S) {
            if (!/http(s)?:\/\/.+/.test(Q)) {
                if (Q.indexOf("//") == 0) {
                    Q = window.location.protocol + Q
                } else {
                    if (Q.charAt(0) == "/") {
                        Q = window.location.protocol + "//" + window.location.host + Q
                    } else {
                        if (Q.indexOf("://") == -1) {
                            Q = window.location.protocol + "//" + Q
                        }
                    }
                }
            }
            J[R] = Q;
            s[R] = !!S
        }

        function u(Q) {
            return r[Q]
        }

        function c(Q, S, R) {
            S = S || "";
            r[Q] = String(S);
            L(Q, S, R)
        }

        function b(Q, S) {
            function T(X) {
                var Z = X ? X.rpc : {};
                var V = d.parentRelayURL || Z.parentRelayUrl;
                if (V.substring(0, 7) !== "http://" && V.substring(0, 8) !== "https://" && V.substring(0, 2) !== "//") {
                    if (typeof d.parent === "string" && d.parent !== "") {
                        if (V.substring(0, 1) !== "/") {
                            var U = d.parent.lastIndexOf("/");
                            V = d.parent.substring(0, U + 1) + V
                        } else {
                            V = n(d.parent) + V
                        }
                    }
                }
                var Y = !!Z.useLegacyProtocol;
                O("..", V, Y);
                if (Y) {
                    w = gadgets.rpctx.ifpc;
                    w.init(N, h)
                }
                var W = S || d.forcesecure || false;
                c("..", Q, W)
            }

            var R = {parentRelayUrl: gadgets.config.NonEmptyStringValidator};
            gadgets.config.register("rpc", R, T)
        }

        function K(T, Q, U) {
            var R = U || d.forcesecure || false;
            var S = Q || d.parent;
            if (S) {
                O("..", S);
                c("..", T, R)
            }
        }

        function l(S, U, Q, T) {
            if (!gadgets.util) {
                return
            }
            var Y = document.getElementById(S);
            if (!Y) {
                throw new Error("Cannot set up gadgets.rpc receiver with ID: " + S + ", element not found.")
            }
            var W = U || Y.src;
            O(S, W);
            var X = gadgets.util.getUrlParameters(Y.src);
            var R = Q || X.rpctoken;
            var V = T || X.forcesecure;
            c(S, R, V)
        }

        function f(Q, S, U, T) {
            if (Q === "..") {
                var R = U || d.rpctoken || d.ifpctok || "";
                if (window.__isgadget === true) {
                    b(R, T)
                } else {
                    K(R, S, T)
                }
            } else {
                l(Q, S, U, T)
            }
        }

        return {
            config: function (Q) {
                if (typeof Q.securityCallback === "function") {
                    y = Q.securityCallback
                }
            }, register: function (R, Q) {
                if (R === A || R === H) {
                    throw new Error("Cannot overwrite callback/ack service")
                }
                if (R === G) {
                    throw new Error("Cannot overwrite default service: use registerDefault")
                }
                m[R] = Q
            }, unregister: function (Q) {
                if (Q === A || Q === H) {
                    throw new Error("Cannot delete callback/ack service")
                }
                if (Q === G) {
                    throw new Error("Cannot delete default service: use unregisterDefault")
                }
                delete m[Q]
            }, registerDefault: function (Q) {
                m[G] = Q
            }, unregisterDefault: function () {
                delete m[G]
            }, forceParentVerifiable: function () {
                if (!w.isParentVerifiable()) {
                    w = gadgets.rpctx.ifpc
                }
            }, call: function (Q, R, W, U) {
                Q = Q || "..";
                var V = "..";
                if (Q === "..") {
                    V = o
                }
                ++p;
                if (W) {
                    i[p] = W
                }
                var T = {s: R, f: V, c: W ? p : 0, a: Array.prototype.slice.call(arguments, 3), t: r[Q], l: s[Q]};
                if (Q !== ".." && !document.getElementById(Q)) {
                    gadgets.log("WARNING: attempted send to nonexistent frame: " + Q);
                    return
                }
                if (C(Q, T)) {
                    return
                }
                var S = k[Q];
                if (!S) {
                    if (!t[Q]) {
                        t[Q] = [T]
                    } else {
                        t[Q].push(T)
                    }
                    return
                }
                if (s[Q]) {
                    S = gadgets.rpctx.ifpc
                }
                if (S.call(Q, V, T) === false) {
                    k[Q] = F;
                    w.call(Q, V, T)
                }
            }, getRelayUrl: function (R) {
                var Q = J[R];
                if (Q && Q.substring(0, 1) === "/") {
                    if (Q.substring(1, 2) === "/") {
                        Q = document.location.protocol + Q
                    } else {
                        Q = document.location.protocol + "//" + document.location.host + Q
                    }
                }
                return Q
            }, setRelayUrl: O, setAuthToken: c, setupReceiver: f, getAuthToken: u, removeReceiver: function (Q) {
                delete J[Q];
                delete s[Q];
                delete r[Q];
                delete j[Q];
                delete E[Q];
                delete k[Q]
            }, getRelayChannel: function () {
                return w.getCode()
            }, receive: function (R, Q) {
                if (R.length > 4) {
                    N(gadgets.json.parse(decodeURIComponent(R[R.length - 1])))
                } else {
                    g.apply(null, R.concat(Q))
                }
            }, receiveSameDomain: function (Q) {
                Q.a = Array.prototype.slice.call(Q.a);
                window.setTimeout(function () {
                    N(Q)
                }, 0)
            }, getOrigin: n, getReceiverOrigin: function (S) {
                var R = k[S];
                if (!R) {
                    return null
                }
                if (!R.isParentVerifiable(S)) {
                    return null
                }
                var Q = gadgets.rpc.getRelayUrl(S) || gadgets.util.getUrlParameters().parent;
                return gadgets.rpc.getOrigin(Q)
            }, init: function () {
                if (w.init(N, h) === false) {
                    w = F
                }
                if (q) {
                    f("..", document.referrer)
                }
            }, _getTargetWin: P, _createRelayIframe: function (Q, S) {
                var V = gadgets.rpc.getRelayUrl("..");
                if (!V) {
                    return null
                }
                var U = V + "#..&" + o + "&" + Q + "&" + encodeURIComponent(gadgets.json.stringify(S));
                var R = document.createElement("iframe");
                R.style.border = R.style.width = R.style.height = "0px";
                R.style.visibility = "hidden";
                R.style.position = "absolute";

                function T() {
                    document.body.appendChild(R);
                    R.src = 'javascript:"<html></html>"';
                    R.src = U
                }

                if (document.body) {
                    T()
                } else {
                    gadgets.util.registerOnLoadHandler(function () {
                        T()
                    })
                }
                return R
            }, ACK: H, RPC_ID: o, SEC_ERROR_LOAD_TIMEOUT: D, SEC_ERROR_FRAME_PHISH: M, SEC_ERROR_FORGED_MSG: a
        }
    }();
    gadgets.rpc.init()
}
;

function loadJs(b, e) {
    if (b.length > 0) {
        var c = document.head || document.getElementsByTagName("head")[0];
        var d = document.createElement("script");
        d.setAttribute("type", "text/javascript");
        d.setAttribute("src", b[0]);
        b.shift();
        var a = false;
        d.onload = d.onreadystatechange = function () {
            if (!a && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                a = true;
                d.onload = d.onreadystatechange = null;
                loadJs(b, e)
            }
        };
        c.appendChild(d)
    } else {
        e()
    }
};var GamePocket = GamePocket || {};
GamePocket.SdkLoader = function () {
    var a = ["gamepocket-test-sdk.js"];

    function b() {
        var d = document.getElementsByTagName("script");
        var f = d[d.length - 1];
        var e = gadgets.util.getUrlParameters(f.src);
        return e.v
    }

    function c(d) {
        if (d) {
            loadJs(d, function () {
                gadgets.log("SDK is loaded.");
                window.focus()
            })
        } else {
            gadgets.error("Failed to loading SDK. SDK is not activated.")
        }
    }

    if (window.top === window.self) {
        c(a)
    } else {
        gadgets.rpc.call("..", "gamepocket.sdk.getSdkJsFiles", function (d) {
            c(d)
        }, b())
    }
    return {
        onLoad: function (d) {
            if (GamePocket.Sdk && GamePocket.Sdk.isLoaded()) {
                d()
            } else {
                gadgets.util.registerOnLoadHandler(d)
            }
        }
    }
}();