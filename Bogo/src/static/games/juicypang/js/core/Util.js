/**
 * Created by juho on 2016-03-29.
 */

var Util = {
    zeroStr: function (num, total) {
        for (var i = num.toString(), n = total - i.length; n--;)
            i = "0" + i;

        return i
    },

    randomNumber: function (total, point) {
        var i = 10 * point || 1;
        return Math.floor(Math.random() * total) / i
    },

    hitTest: function (bound, point) {
        return point.x >= bound.x && point.x <= bound.x + bound.width && point.y >= bound.y && point.y <= bound.y + bound.height
    },

    uniqueArray: function (arr) {
        for (var a  = [], i = 0, l = arr.length; l > i; i++)
            -1 === a .indexOf(arr[i]) && "" !== arr[i] && a .push(arr[i]);

        return a
    },

    comma: function (str) {
        return (str = String(str)).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
    },

    shuffle: function (t) {
        var e, i, n;
        for (n = t.length; n; n--) e = Math.floor(Math.random() * n), i = t[n - 1], t[n - 1] = t[e], t[e] = i;
        return t
    },

    grep: function (ary, removeItem) {
        return jQuery.grep(ary, function (t) {
            return t != removeItem
        })
    },

    getParam: function (str) {
        var e = window.location.search.match(new RegExp("(?:[?&]" + str + "=)([^&]+)"));
        return e ? e[1] : null
    },

    mobileCheck: function () {
        return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
    },

    radiansToDegrees: function (t) {
        return t * Math.PI / 180
    },

    degreesToradians: function (t) {
        return 180 * t / Math.PI
    },

    getRadian: function (t, e, i, n) {
        var r = i - t, o = n - e;
        return -Math.atan2(r, o)
    },

    getAngle: function (t, e, i, n) {
        var r = i - t, o = n - e;
        return 180 * Math.atan2(r, o) / Math.PI
    },

    distanceOfTwoPoints: function (t, e) {
        var i = Math.pow(t.x - e.x, 2), n = Math.pow(t.y - e.y, 2);
        return Math.sqrt(i + n)
    },

    detectIE: function () {
        return window.navigator.userAgent.search(/(MSIE|Trident|Edge)/) > -1
    },

    getIOS: function () {
        return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
    },
    getTime: function (t, e) {
        e || (e = ":");
        var i = t.split(e);
        return 60 * parseInt(i[0]) * 60 * 1e3 + 60 * parseInt(i[1]) * 1e3 + 1e3 * parseInt(i[2])
    },

    getTimeString: function (t, e) {
        var i = t / 1e3, n = parseInt(i / 3600);
        i %= 3600;
        var r = parseInt(i / 60);
        return i = Math.floor(i % 60), 10 > n && (n = "0" + n), 10 > r && (r = "0" + r), 10 > i && (i = "0" + i), e ? r + ":" + i : n + ":" + r + ":" + i
    }
};