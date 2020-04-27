GamePocket.Api = {
    ON_LOAD: "gamepocket.sdk.onLoad", GET_AUTH_TOKEN: "gamepocket.sdk.getAuthToken",
    GET_RANKING: "gamepocket.api.getRanking", ADD_SCORE: "gamepocket.api.addScore", PUT_DATA: "gamepocket.api.putData",
    GET_DATA: "gamepocket.api.getData", REMOVE_DATA: "gamepocket.api.removeData"
};
GamePocket.SdkApi = GamePocket.SdkApi || {};
GamePocket.SdkApi.Caller = function (u) {
    var c = {code: u.TIMEOUT, message: "Timeout"};
    var k = {code: u.UNKNOWN, message: "Unknown Error"};
    var h = "__RANKING_SCORE";
    var o = "__APP_DATA";
    var q = {}, p, r, d, l, n;

    function s() {
        q[GamePocket.Api.GET_RANKING] = f;
        q[GamePocket.Api.ADD_SCORE] = m;
        q[GamePocket.Api.GET_AUTH_TOKEN] = j;
        q[GamePocket.Api.GET_DATA] = i;
        q[GamePocket.Api.PUT_DATA] = t;
        q[GamePocket.Api.REMOVE_DATA] = a
    }

    function f() {
        var v = sessionStorage.getItem(h);
        if (v) {
            return {
                code: u.SUCCESS, message: "success",
                result: {score: parseInt(v, 10), percentile: d || 10, group: l || "GOLD", countOfAllUsers: n || 100}
            }
        } else {
            return {
                code: u.SUCCESS, message: "success",
                result: {score: -1, percentile: -1, group: "NONE", countOfAllUsers: -1}
            }
        }
    }

    function m(v) {
        var w = parseInt(sessionStorage.getItem(h) || 0, 10);
        if (w < v) {
            sessionStorage.setItem(h, v)
        }
        return f()
    }

    function j() {
        return {code: u.SUCCESS, message: "success", result: "testToken"}
    }

    function i(v) {
        var x = sessionStorage.getItem(o);
        var w = {};
        if (x) {
            var y = JSON.parse(x);
            v.split(",").forEach(function (z) {
                if (y[z]) {
                    w[z] = y[z]
                }
            })
        }
        return w
    }

    function t(y) {
        var x = JSON.parse(y);
        var w = {};
        var v = sessionStorage.getItem(o);
        if (v) {
            w = JSON.parse(v);
            Object.keys(x).forEach(function (z) {
                w[z] = x[z]
            })
        }
        sessionStorage.setItem(o, JSON.stringify(w))
    }

    function a(v) {
        var w = sessionStorage.getItem(o);
        if (w) {
            var x = JSON.parse(w);
            v.split(",").forEach(function (y) {
                if (x[y]) {
                    delete x[y]
                }
            });
            sessionStorage.setItem(o, JSON.stringify(x))
        }
    }

    function e(v) {
        p = v.isTimeout;
        r = v.isUnknownError;
        d = v.rankingPercentile;
        l = v.rankingGroup;
        n = v.rankingCountOfAllUsers
    }

    function g() {
        gadgets.rpc.register("gamePocket.testCondition.change", e)
    }

    function b() {
        if (!sessionStorage) {
            gadgets.warn("This browser is not supported for testing.");
            return
        }
        s();
        g()
    }

    b();
    return {
        call: function (x, z, y) {
            if (r === "true") {
                z && z(k);
                return
            }
            if (p === "true") {
                z && z(c);
                return
            }
            var w = y || "";
            var v = q[x](w);
            z && z(v)
        }
    }
};
GamePocket.Sdk = function () {
    var f, e = false;
    var c = {
        SUCCESS: 0, NOT_ON_SERVICE_GAME: 1001, NOT_FOUND_GAME: 1002, NO_AUTHENTICATION: 2001, REQUIRE_PERMISSION: 2002,
        INVALID_PARAMETER: 9004, TIMEOUT: 8888, UNKNOWN: 9999
    };

    function a() {
        f = GamePocket.SdkApi.Caller(c);
        if (window.top === window.self) {
            e = true;
            gadgets.util.runOnLoadHandlers()
        } else {
            b(function () {
                gadgets.rpc.call("..", GamePocket.Api.ON_LOAD);
                e = true;
                gadgets.util.runOnLoadHandlers()
            })
        }
    }

    function b(g) {
        d(GamePocket.Api.GET_AUTH_TOKEN, function (h) {
            if (h && h.code === c.SUCCESS) {
                gadgets.rpc.setAuthToken("..", h.result);
                gadgets.log("SDK is initialized.");
                g && g()
            } else {
                gadgets.warn("There is no authToken. SDK is not activated.")
            }
        })
    }

    function d(g, i, h) {
        f.call(g, i, h)
    }

    a();
    return {
        isLoaded: function () {
            return e
        }, ResponseCode: c, refresh: function (g) {
            b(g)
        }, Ranking: function () {
            return {
                get: function (g) {
                    d(GamePocket.Api.GET_RANKING, g)
                }, add: function (g, h) {
                    d(GamePocket.Api.ADD_SCORE, h, g)
                }
            }
        }(), AppData: function () {
            function g(i) {
                if (!i || (typeof i !== "string" && i.constructor !== Array)) {
                    throw'Fields argument must be defined as String or Array type.(ex: "key1,key2" or ["key1", "key2"])'
                }
                if (i.constructor === Array) {
                    return i.join(",")
                }
                return i
            }

            function h(k) {
                var i = k;
                if (k && typeof k === "object") {
                    i = JSON.stringify(k)
                }
                try {
                    return JSON.parse(i)
                } catch (j) {
                    throw"Params are must be json type.\ncaused: " + j
                }
            }

            return {
                get: function (i, k) {
                    var j = g(i);
                    d(GamePocket.Api.GET_DATA, k, j)
                }, put: function (j, k) {
                    var i = h(j);
                    d(GamePocket.Api.PUT_DATA, k, i)
                }, remove: function (i, k) {
                    var j = g(i);
                    d(GamePocket.Api.REMOVE_DATA, k, j)
                }
            }
        }()
    }
}();