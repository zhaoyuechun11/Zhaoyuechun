function Button(t, e, r, i, n, o, s, a, l, h) {
    void 0 === n && (n = "none"), void 0 === a && (a = .5), void 0 === l && (l = .5), void 0 === o && (o = 1), void 0 === s && (s = 1), this.tweenTime = .2, this.slice = h, this.main = new PIXI.Container, void 0 == this.slice ? (this.sprite = PIXI.Sprite.fromFrame(e), this.sprite.anchor.set(a, l), this.originTint = this.sprite.tint) : (this.sprite = h, this.originTint = 16777215), this.main.position.set(r, i), this.main.scale.set(o, s), this.originScaleX = o, this.originScaleY = s, this.originScaleX < 0 ? this.addScaleX = .1 : this.addScaleX = -.1, this.originScaleY < 0 ? this.addScaleY = .1 : this.addScaleY = -.1, this.main.addChild(this.sprite), t.addChild(this.main), this.effTint = 8421504, this.scale_type = n, this.init()
}

function distance2D(t, e, r, i) {
    return r || (r = 0), i || (i = 0), Math.sqrt((r - t) * (r - t) + (i - e) * (i - e))
}

function randRangeFromInt(t, e) {
    return t + Math.random() * (e - t + 1) | 0
}

function circleIntersectionFromPos(t, e, r, i, n, o) {
    var s = t - i, a = e - n;
    return Math.sqrt(s * s + a * a) < r + o
}

function radToDegFromAngle(t) {
    return t * (180 / Math.PI)
}

function degToRadFromPI(t) {
    return t * (Math.PI / 180)
}

function moveToAngle(t, e) {
    var r = {x: 0, y: 0};
    return r.x = e * Math.cos(degToRadFromPI(t)), r.y = -1 * e * Math.sin(degToRadFromPI(t)), r
}

function rotateFromPos(t, e, r, i, n) {
    var o = Math.PI / 180 * n, s = Math.cos(o), a = Math.sin(o);
    return [s * (r - t) + a * (i - e) + t, s * (i - e) - a * (r - t) + e]
}

function getAngleFromPos(t, e, r, i) {
    for (var n = radToDeg(Math.atan2(e - i, r - t)); n < 0;) n += 360;
    for (; n > 360;) n -= 360;
    return n
}

function cropAngleWith180(t, e, r) {
    return t > 90 && t < 270 ? t > r && (t = r) : (t < e || t >= 270) && (t = e), t
}

var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, r) {
        var i = function (t) {
            var e, r = [], i = t.length;
            for (e = 0; e !== i; r.push(t[e++])) ;
            return r
        }, n = function (t, e, r) {
            var i, n, o = t.cycle;
            for (i in o) n = o[i], t[i] = "function" == typeof n ? n.call(e[r], r) : n[r % n.length];
            delete t.cycle
        }, o = function (t, e, i) {
            r.call(this, t, e, i), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = o.prototype.render
        }, s = 1e-10, a = r._internals, l = a.isSelector, h = a.isArray, u = o.prototype = r.to({}, .1, {}), c = [];
        o.version = "1.18.0", u.constructor = o, u.kill()._gc = !1, o.killTweensOf = o.killDelayedCallsTo = r.killTweensOf, o.getTweensOf = r.getTweensOf, o.lagSmoothing = r.lagSmoothing, o.ticker = r.ticker, o.render = r.render, u.invalidate = function () {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), r.prototype.invalidate.call(this)
        }, u.updateTo = function (t, e) {
            var i, n = this.ratio, o = this.vars.immediateRender || t.immediateRender;
            e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
            for (i in t) this.vars[i] = t[i];
            if (this._initted || o) if (e) this._initted = !1, o && this.render(0, !0, !0); else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && r._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                var s = this._time;
                this.render(0, !0, !1), this._initted = !1, this.render(s, !0, !1)
            } else if (this._time > 0 || o) {
                this._initted = !1, this._init();
                for (var a, l = 1 / (1 - n), h = this._firstPT; h;) a = h.s + h.c, h.c *= l, h.s = a - h.c, h = h._next
            }
            return this
        }, u.render = function (t, e, r) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var i, n, o, l, h, u, c, p, d = this._dirty ? this.totalDuration() : this._totalDuration, f = this._time,
                m = this._totalTime, g = this._cycle, v = this._duration, _ = this._rawPrevTime;
            if (t >= d ? (this._totalTime = d, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = v, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (i = !0, n = "onComplete", r = r || this._timeline.autoRemoveChildren), 0 === v && (this._initted || !this.vars.lazy || r) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > _ || _ === s) && _ !== t && (r = !0, _ > s && (n = "onReverseComplete")), this._rawPrevTime = p = !e || t || _ === t ? t : s)) : 1e-7 > t ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== m || 0 === v && _ > 0) && (n = "onReverseComplete", i = this._reversed), 0 > t && (this._active = !1, 0 === v && (this._initted || !this.vars.lazy || r) && (_ >= 0 && (r = !0), this._rawPrevTime = p = !e || t || _ === t ? t : s)), this._initted || (r = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (l = v + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && this._cycle--, this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = v - this._time), this._time > v ? this._time = v : 0 > this._time && (this._time = 0)), this._easeType ? (h = this._time / v, u = this._easeType, c = this._easePower, (1 === u || 3 === u && h >= .5) && (h = 1 - h), 3 === u && (h *= 2), 1 === c ? h *= h : 2 === c ? h *= h * h : 3 === c ? h *= h * h * h : 4 === c && (h *= h * h * h * h), this.ratio = 1 === u ? 1 - h : 2 === u ? h : .5 > this._time / v ? h / 2 : 1 - h / 2) : this.ratio = this._ease.getRatio(this._time / v)), f !== this._time || r || g !== this._cycle) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!r && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = f, this._totalTime = m, this._rawPrevTime = _, this._cycle = g, a.lazyTweens.push(this), void(this._lazy = [t, e]);
                    this._time && !i ? this.ratio = this._ease.getRatio(this._time / v) : i && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== f && t >= 0 && (this._active = !0), 0 === m && (2 === this._initted && t > 0 && this._init(), this._startAt && (t >= 0 ? this._startAt.render(t, e, r) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === v) && (e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, r), e || (this._totalTime !== m || i) && this._callback("onUpdate")), this._cycle !== g && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), n && (!this._gc || r) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, r), i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this._callback(n), 0 === v && this._rawPrevTime === s && p !== s && (this._rawPrevTime = 0))
            } else m !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
        }, o.to = function (t, e, r) {
            return new o(t, e, r)
        }, o.from = function (t, e, r) {
            return r.runBackwards = !0, r.immediateRender = 0 != r.immediateRender, new o(t, e, r)
        }, o.fromTo = function (t, e, r, i) {
            return i.startAt = r, i.immediateRender = 0 != i.immediateRender && 0 != r.immediateRender, new o(t, e, i)
        }, o.staggerTo = o.allTo = function (t, e, s, a, u, p, d) {
            a = a || 0;
            var f, m, g, v, _ = s.delay || 0, y = [], x = s.cycle, b = s.startAt && s.startAt.cycle;
            for (h(t) || ("string" == typeof t && (t = r.selector(t) || t), l(t) && (t = i(t))), t = t || [], 0 > a && ((t = i(t)).reverse(), a *= -1), f = t.length - 1, g = 0; f >= g; g++) {
                m = {};
                for (v in s) m[v] = s[v];
                if (x && n(m, t, g), b) {
                    b = m.startAt = {};
                    for (v in s.startAt) b[v] = s.startAt[v];
                    n(m.startAt, t, g)
                }
                m.delay = _, g === f && u && (m.onComplete = function () {
                    s.onComplete && s.onComplete.apply(s.onCompleteScope || this, arguments), u.apply(d || s.callbackScope || this, p || c)
                }), y[g] = new o(t[g], e, m), _ += a
            }
            return y
        }, o.staggerFrom = o.allFrom = function (t, e, r, i, n, s, a) {
            return r.runBackwards = !0, r.immediateRender = 0 != r.immediateRender, o.staggerTo(t, e, r, i, n, s, a)
        }, o.staggerFromTo = o.allFromTo = function (t, e, r, i, n, s, a, l) {
            return i.startAt = r, i.immediateRender = 0 != i.immediateRender && 0 != r.immediateRender, o.staggerTo(t, e, i, n, s, a, l)
        }, o.delayedCall = function (t, e, r, i, n) {
            return new o(e, 0, {
                delay: t, onComplete: e, onCompleteParams: r, callbackScope: i, onReverseComplete: e,
                onReverseCompleteParams: r, immediateRender: !1, useFrames: n, overwrite: 0
            })
        }, o.set = function (t, e) {
            return new o(t, 0, e)
        }, o.isTweening = function (t) {
            return r.getTweensOf(t, !0).length > 0
        };
        var p = function (t, e) {
            for (var i = [], n = 0, o = t._first; o;) o instanceof r ? i[n++] = o : (e && (i[n++] = o), i = i.concat(p(o, e)), n = i.length), o = o._next;
            return i
        }, d = o.getAllTweens = function (e) {
            return p(t._rootTimeline, e).concat(p(t._rootFramesTimeline, e))
        };
        o.killAll = function (t, r, i, n) {
            null == r && (r = !0), null == i && (i = !0);
            var o, s, a, l = d(0 != n), h = l.length, u = r && i && n;
            for (a = 0; h > a; a++) s = l[a], (u || s instanceof e || (o = s.target === s.vars.onComplete) && i || r && !o) && (t ? s.totalTime(s._reversed ? 0 : s.totalDuration()) : s._enabled(!1, !1))
        }, o.killChildTweensOf = function (t, e) {
            if (null != t) {
                var n, s, u, c, p, d = a.tweenLookup;
                if ("string" == typeof t && (t = r.selector(t) || t), l(t) && (t = i(t)), h(t)) for (c = t.length; --c > -1;) o.killChildTweensOf(t[c], e); else {
                    n = [];
                    for (u in d) for (s = d[u].target.parentNode; s;) s === t && (n = n.concat(d[u].tweens)), s = s.parentNode;
                    for (p = n.length, c = 0; p > c; c++) e && n[c].totalTime(n[c].totalDuration()), n[c]._enabled(!1, !1)
                }
            }
        };
        var f = function (t, r, i, n) {
            r = !1 !== r, i = !1 !== i;
            for (var o, s, a = d(n = !1 !== n), l = r && i && n, h = a.length; --h > -1;) s = a[h], (l || s instanceof e || (o = s.target === s.vars.onComplete) && i || r && !o) && s.paused(t)
        };
        return o.pauseAll = function (t, e, r) {
            f(!0, t, e, r)
        }, o.resumeAll = function (t, e, r) {
            f(!1, t, e, r)
        }, o.globalTimeScale = function (e) {
            var i = t._rootTimeline, n = r.ticker.time;
            return arguments.length ? (e = e || s, i._startTime = n - (n - i._startTime) * i._timeScale / e, i = t._rootFramesTimeline, n = r.ticker.frame, i._startTime = n - (n - i._startTime) * i._timeScale / e, i._timeScale = t._rootTimeline._timeScale = e, e) : i._timeScale
        }, u.progress = function (t) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
        }, u.totalProgress = function (t) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, !1) : this._totalTime / this.totalDuration()
        }, u.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, u.duration = function (e) {
            return arguments.length ? t.prototype.duration.call(this, e) : this._duration
        }, u.totalDuration = function (t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, u.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, u.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, u.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, o
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (t, e, r) {
        var i = function (t) {
                e.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                var r, i, n = this.vars;
                for (i in n) r = n[i], l(r) && -1 !== r.join("").indexOf("{self}") && (n[i] = this._swapSelfInParams(r));
                l(n.tweens) && this.add(n.tweens, 0, n.align, n.stagger)
            }, n = 1e-10, o = r._internals, s = i._internals = {}, a = o.isSelector, l = o.isArray, h = o.lazyTweens,
            u = o.lazyRender, c = _gsScope._gsDefine.globals, p = function (t) {
                var e, r = {};
                for (e in t) r[e] = t[e];
                return r
            }, d = function (t, e, r) {
                var i, n, o = t.cycle;
                for (i in o) n = o[i], t[i] = "function" == typeof n ? n.call(e[r], r) : n[r % n.length];
                delete t.cycle
            }, f = s.pauseCallback = function () {
            }, m = function (t) {
                var e, r = [], i = t.length;
                for (e = 0; e !== i; r.push(t[e++])) ;
                return r
            }, g = i.prototype = new e;
        return i.version = "1.18.0", g.constructor = i, g.kill()._gc = g._forcingPlayhead = g._hasPause = !1, g.to = function (t, e, i, n) {
            var o = i.repeat && c.TweenMax || r;
            return e ? this.add(new o(t, e, i), n) : this.set(t, i, n)
        }, g.from = function (t, e, i, n) {
            return this.add((i.repeat && c.TweenMax || r).from(t, e, i), n)
        }, g.fromTo = function (t, e, i, n, o) {
            var s = n.repeat && c.TweenMax || r;
            return e ? this.add(s.fromTo(t, e, i, n), o) : this.set(t, n, o)
        }, g.staggerTo = function (t, e, n, o, s, l, h, u) {
            var c, f, g = new i({
                onComplete: l, onCompleteParams: h, callbackScope: u, smoothChildTiming: this.smoothChildTiming
            }), v = n.cycle;
            for ("string" == typeof t && (t = r.selector(t) || t), a(t = t || []) && (t = m(t)), 0 > (o = o || 0) && ((t = m(t)).reverse(), o *= -1), f = 0; t.length > f; f++) (c = p(n)).startAt && (c.startAt = p(c.startAt), c.startAt.cycle && d(c.startAt, t, f)), v && d(c, t, f), g.to(t[f], e, c, f * o);
            return this.add(g, s)
        }, g.staggerFrom = function (t, e, r, i, n, o, s, a) {
            return r.immediateRender = 0 != r.immediateRender, r.runBackwards = !0, this.staggerTo(t, e, r, i, n, o, s, a)
        }, g.staggerFromTo = function (t, e, r, i, n, o, s, a, l) {
            return i.startAt = r, i.immediateRender = 0 != i.immediateRender && 0 != r.immediateRender, this.staggerTo(t, e, i, n, o, s, a, l)
        }, g.call = function (t, e, i, n) {
            return this.add(r.delayedCall(0, t, e, i), n)
        }, g.set = function (t, e, i) {
            return i = this._parseTimeOrLabel(i, 0, !0), null == e.immediateRender && (e.immediateRender = i === this._time && !this._paused), this.add(new r(t, 0, e), i)
        }, i.exportRoot = function (t, e) {
            null == (t = t || {}).smoothChildTiming && (t.smoothChildTiming = !0);
            var n, o, s = new i(t), a = s._timeline;
            for (null == e && (e = !0), a._remove(s, !0), s._startTime = 0, s._rawPrevTime = s._time = s._totalTime = a._time, n = a._first; n;) o = n._next, e && n instanceof r && n.target === n.vars.onComplete || s.add(n, n._startTime - n._delay), n = o;
            return a.add(s, 0), s
        }, g.add = function (n, o, s, a) {
            var h, u, c, p, d, f;
            if ("number" != typeof o && (o = this._parseTimeOrLabel(o, 0, !0, n)), !(n instanceof t)) {
                if (n instanceof Array || n && n.push && l(n)) {
                    for (s = s || "normal", a = a || 0, h = o, u = n.length, c = 0; u > c; c++) l(p = n[c]) && (p = new i({tweens: p})), this.add(p, h), "string" != typeof p && "function" != typeof p && ("sequence" === s ? h = p._startTime + p.totalDuration() / p._timeScale : "start" === s && (p._startTime -= p.delay())), h += a;
                    return this._uncache(!0)
                }
                if ("string" == typeof n) return this.addLabel(n, o);
                if ("function" != typeof n) throw"Cannot add " + n + " into the timeline; it is not a tween, timeline, function, or string.";
                n = r.delayedCall(0, n)
            }
            if (e.prototype.add.call(this, n, o), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration()) for (d = this, f = d.rawTime() > n._startTime; d._timeline;) f && d._timeline.smoothChildTiming ? d.totalTime(d._totalTime, !0) : d._gc && d._enabled(!0, !1), d = d._timeline;
            return this
        }, g.remove = function (e) {
            if (e instanceof t) {
                this._remove(e, !1);
                var r = e._timeline = e.vars.useFrames ? t._rootFramesTimeline : t._rootTimeline;
                return e._startTime = (e._paused ? e._pauseTime : r._time) - (e._reversed ? e.totalDuration() - e._totalTime : e._totalTime) / e._timeScale, this
            }
            if (e instanceof Array || e && e.push && l(e)) {
                for (var i = e.length; --i > -1;) this.remove(e[i]);
                return this
            }
            return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e)
        }, g._remove = function (t, r) {
            e.prototype._remove.call(this, t, r);
            var i = this._last;
            return i ? this._time > i._startTime + i._totalDuration / i._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, g.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, g.insert = g.insertMultiple = function (t, e, r, i) {
            return this.add(t, e || 0, r, i)
        }, g.appendMultiple = function (t, e, r, i) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), r, i)
        }, g.addLabel = function (t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, g.addPause = function (t, e, i, n) {
            var o = r.delayedCall(0, f, i, n || this);
            return o.vars.onComplete = o.vars.onReverseComplete = e, o.data = "isPause", this._hasPause = !0, this.add(o, t)
        }, g.removeLabel = function (t) {
            return delete this._labels[t], this
        }, g.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, g._parseTimeOrLabel = function (e, r, i, n) {
            var o;
            if (n instanceof t && n.timeline === this) this.remove(n); else if (n && (n instanceof Array || n.push && l(n))) for (o = n.length; --o > -1;) n[o] instanceof t && n[o].timeline === this && this.remove(n[o]);
            if ("string" == typeof r) return this._parseTimeOrLabel(r, i && "number" == typeof e && null == this._labels[r] ? e - this.duration() : 0, i);
            if (r = r || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration()); else {
                if (-1 === (o = e.indexOf("="))) return null == this._labels[e] ? i ? this._labels[e] = this.duration() + r : r : this._labels[e] + r;
                r = parseInt(e.charAt(o - 1) + "1", 10) * Number(e.substr(o + 1)), e = o > 1 ? this._parseTimeOrLabel(e.substr(0, o - 1), 0, i) : this.duration()
            }
            return Number(e) + r
        }, g.seek = function (t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
        }, g.stop = function () {
            return this.paused(!0)
        }, g.gotoAndPlay = function (t, e) {
            return this.play(t, e)
        }, g.gotoAndStop = function (t, e) {
            return this.pause(t, e)
        }, g.render = function (t, e, r) {
            this._gc && this._enabled(!0, !1);
            var i, o, s, a, l, c, p = this._dirty ? this.totalDuration() : this._totalDuration, d = this._time,
                f = this._startTime, m = this._timeScale, g = this._paused;
            if (t >= p) this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (o = !0, a = "onComplete", l = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === n) && this._rawPrevTime !== t && this._first && (l = !0, this._rawPrevTime > n && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n, t = p + 1e-4; else if (1e-7 > t) if (this._totalTime = this._time = 0, (0 !== d || 0 === this._duration && this._rawPrevTime !== n && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (a = "onReverseComplete", o = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (l = o = !0, a = "onReverseComplete") : this._rawPrevTime >= 0 && this._first && (l = !0), this._rawPrevTime = t; else {
                if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n, 0 === t && o) for (i = this._first; i && 0 === i._startTime;) i._duration || (o = !1), i = i._next;
                t = 0, this._initted || (l = !0)
            } else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (t >= d) for (i = this._first; i && t >= i._startTime && !c;) i._duration || "isPause" !== i.data || i.ratio || 0 === i._startTime && 0 === this._rawPrevTime || (c = i), i = i._next; else for (i = this._last; i && i._startTime >= t && !c;) i._duration || "isPause" === i.data && i._rawPrevTime > 0 && (c = i), i = i._prev;
                    c && (this._time = t = c._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== d && this._first || r || l || c) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== d && t > 0 && (this._active = !0), 0 === d && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), this._time >= d) for (i = this._first; i && (s = i._next, !this._paused || g);) (i._active || i._startTime <= this._time && !i._paused && !i._gc) && (c === i && this.pause(), i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, r) : i.render((t - i._startTime) * i._timeScale, e, r)), i = s; else for (i = this._last; i && (s = i._prev, !this._paused || g);) {
                    if (i._active || d >= i._startTime && !i._paused && !i._gc) {
                        if (c === i) {
                            for (c = i._prev; c && c.endTime() > this._time;) c.render(c._reversed ? c.totalDuration() - (t - c._startTime) * c._timeScale : (t - c._startTime) * c._timeScale, e, r), c = c._prev;
                            c = null, this.pause()
                        }
                        i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, r) : i.render((t - i._startTime) * i._timeScale, e, r)
                    }
                    i = s
                }
                this._onUpdate && (e || (h.length && u(), this._callback("onUpdate"))), a && (this._gc || (f === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (o && (h.length && u(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
            }
        }, g._hasPausedChild = function () {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof i && t._hasPausedChild()) return !0;
                t = t._next
            }
            return !1
        }, g.getChildren = function (t, e, i, n) {
            n = n || -9999999999;
            for (var o = [], s = this._first, a = 0; s;) n > s._startTime || (s instanceof r ? !1 !== e && (o[a++] = s) : (!1 !== i && (o[a++] = s), !1 !== t && (o = o.concat(s.getChildren(!0, e, i)), a = o.length))), s = s._next;
            return o
        }, g.getTweensOf = function (t, e) {
            var i, n, o = this._gc, s = [], a = 0;
            for (o && this._enabled(!0, !0), n = (i = r.getTweensOf(t)).length; --n > -1;) (i[n].timeline === this || e && this._contains(i[n])) && (s[a++] = i[n]);
            return o && this._enabled(!1, !0), s
        }, g.recent = function () {
            return this._recent
        }, g._contains = function (t) {
            for (var e = t.timeline; e;) {
                if (e === this) return !0;
                e = e.timeline
            }
            return !1
        }, g.shiftChildren = function (t, e, r) {
            r = r || 0;
            for (var i, n = this._first, o = this._labels; n;) n._startTime >= r && (n._startTime += t), n = n._next;
            if (e) for (i in o) o[i] >= r && (o[i] += t);
            return this._uncache(!0)
        }, g._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (var r = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), i = r.length, n = !1; --i > -1;) r[i]._kill(t, e) && (n = !0);
            return n
        }, g.clear = function (t) {
            var e = this.getChildren(!1, !0, !0), r = e.length;
            for (this._time = this._totalTime = 0; --r > -1;) e[r]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0)
        }, g.invalidate = function () {
            for (var e = this._first; e;) e.invalidate(), e = e._next;
            return t.prototype.invalidate.call(this)
        }, g._enabled = function (t, r) {
            if (t === this._gc) for (var i = this._first; i;) i._enabled(t, !0), i = i._next;
            return e.prototype._enabled.call(this, t, r)
        }, g.totalTime = function () {
            this._forcingPlayhead = !0;
            var e = t.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, e
        }, g.duration = function (t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, g.totalDuration = function (t) {
            if (!arguments.length) {
                if (this._dirty) {
                    for (var e, r, i = 0, n = this._last, o = 999999999999; n;) e = n._prev, n._dirty && n.totalDuration(), n._startTime > o && this._sortChildren && !n._paused ? this.add(n, n._startTime - n._delay) : o = n._startTime, 0 > n._startTime && !n._paused && (i -= n._startTime, this._timeline.smoothChildTiming && (this._startTime += n._startTime / this._timeScale), this.shiftChildren(-n._startTime, !1, -9999999999), o = 0), (r = n._startTime + n._totalDuration / n._timeScale) > i && (i = r), n = e;
                    this._duration = this._totalDuration = i, this._dirty = !1
                }
                return this._totalDuration
            }
            return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
        }, g.paused = function (e) {
            if (!e) for (var r = this._first, i = this._time; r;) r._startTime === i && "isPause" === r.data && (r._rawPrevTime = 0), r = r._next;
            return t.prototype.paused.apply(this, arguments)
        }, g.usesFrames = function () {
            for (var e = this._timeline; e._timeline;) e = e._timeline;
            return e === t._rootFramesTimeline
        }, g.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, i
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (t, e, r) {
        var i = function (e) {
                t.call(this, e), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
            }, n = 1e-10, o = e._internals, s = o.lazyTweens, a = o.lazyRender, l = new r(null, null, 1, 0),
            h = i.prototype = new t;
        return h.constructor = i, h.kill()._gc = !1, i.version = "1.18.0", h.invalidate = function () {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), t.prototype.invalidate.call(this)
        }, h.addCallback = function (t, r, i, n) {
            return this.add(e.delayedCall(0, t, i, n), r)
        }, h.removeCallback = function (t, e) {
            if (t) if (null == e) this._kill(null, t); else for (var r = this.getTweensOf(t, !1), i = r.length, n = this._parseTimeOrLabel(e); --i > -1;) r[i]._startTime === n && r[i]._enabled(!1, !1);
            return this
        }, h.removePause = function (e) {
            return this.removeCallback(t._internals.pauseCallback, e)
        }, h.tweenTo = function (t, r) {
            r = r || {};
            var i, n, o, s = {ease: l, useFrames: this.usesFrames(), immediateRender: !1};
            for (n in r) s[n] = r[n];
            return s.time = this._parseTimeOrLabel(t), i = Math.abs(Number(s.time) - this._time) / this._timeScale || .001, o = new e(this, i, s), s.onStart = function () {
                o.target.paused(!0), o.vars.time !== o.target.time() && i === o.duration() && o.duration(Math.abs(o.vars.time - o.target.time()) / o.target._timeScale), r.onStart && o._callback("onStart")
            }, o
        }, h.tweenFromTo = function (t, e, r) {
            r = r || {}, t = this._parseTimeOrLabel(t), r.startAt = {
                onComplete: this.seek, onCompleteParams: [t], callbackScope: this
            }, r.immediateRender = !1 !== r.immediateRender;
            var i = this.tweenTo(e, r);
            return i.duration(Math.abs(i.vars.time - t) / this._timeScale || .001)
        }, h.render = function (t, e, r) {
            this._gc && this._enabled(!0, !1);
            var i, o, l, h, u, c, p, d = this._dirty ? this.totalDuration() : this._totalDuration, f = this._duration,
                m = this._time, g = this._totalTime, v = this._startTime, _ = this._timeScale, y = this._rawPrevTime,
                x = this._paused, b = this._cycle;
            if (t >= d) this._locked || (this._totalTime = d, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (o = !0, h = "onComplete", u = !!this._timeline.autoRemoveChildren, 0 === this._duration && (0 === t || 0 > y || y === n) && y !== t && this._first && (u = !0, y > n && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : n, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : (this._time = f, t = f + 1e-4); else if (1e-7 > t) if (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== m || 0 === f && y !== n && (y > 0 || 0 > t && y >= 0) && !this._locked) && (h = "onReverseComplete", o = this._reversed), 0 > t) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (u = o = !0, h = "onReverseComplete") : y >= 0 && this._first && (u = !0), this._rawPrevTime = t; else {
                if (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : n, 0 === t && o) for (i = this._first; i && 0 === i._startTime;) i._duration || (o = !1), i = i._next;
                t = 0, this._initted || (u = !0)
            } else if (0 === f && 0 > y && (u = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (c = f + this._repeatDelay, this._cycle = this._totalTime / c >> 0, 0 !== this._cycle && this._cycle === this._totalTime / c && this._cycle--, this._time = this._totalTime - this._cycle * c, this._yoyo && 0 != (1 & this._cycle) && (this._time = f - this._time), this._time > f ? (this._time = f, t = f + 1e-4) : 0 > this._time ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                if ((t = this._time) >= m) for (i = this._first; i && t >= i._startTime && !p;) i._duration || "isPause" !== i.data || i.ratio || 0 === i._startTime && 0 === this._rawPrevTime || (p = i), i = i._next; else for (i = this._last; i && i._startTime >= t && !p;) i._duration || "isPause" === i.data && i._rawPrevTime > 0 && (p = i), i = i._prev;
                p && (this._time = t = p._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== b && !this._locked) {
                var T = this._yoyo && 0 != (1 & b), w = T === (this._yoyo && 0 != (1 & this._cycle)),
                    E = this._totalTime, S = this._cycle, A = this._rawPrevTime, M = this._time;
                if (this._totalTime = b * f, b > this._cycle ? T = !T : this._totalTime += f, this._time = m, this._rawPrevTime = 0 === f ? y - 1e-4 : y, this._cycle = b, this._locked = !0, m = T ? 0 : f, this.render(m, e, 0 === f), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), w && (m = T ? f + 1e-4 : -1e-4, this.render(m, !0, !1)), this._locked = !1, this._paused && !x) return;
                this._time = M, this._totalTime = E, this._cycle = S, this._rawPrevTime = A
            }
            if (this._time !== m && this._first || r || u || p) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== g && t > 0 && (this._active = !0), 0 === g && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), this._time >= m) for (i = this._first; i && (l = i._next, !this._paused || x);) (i._active || i._startTime <= this._time && !i._paused && !i._gc) && (p === i && this.pause(), i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, r) : i.render((t - i._startTime) * i._timeScale, e, r)), i = l; else for (i = this._last; i && (l = i._prev, !this._paused || x);) {
                    if (i._active || m >= i._startTime && !i._paused && !i._gc) {
                        if (p === i) {
                            for (p = i._prev; p && p.endTime() > this._time;) p.render(p._reversed ? p.totalDuration() - (t - p._startTime) * p._timeScale : (t - p._startTime) * p._timeScale, e, r), p = p._prev;
                            p = null, this.pause()
                        }
                        i._reversed ? i.render((i._dirty ? i.totalDuration() : i._totalDuration) - (t - i._startTime) * i._timeScale, e, r) : i.render((t - i._startTime) * i._timeScale, e, r)
                    }
                    i = l
                }
                this._onUpdate && (e || (s.length && a(), this._callback("onUpdate"))), h && (this._locked || this._gc || (v === this._startTime || _ !== this._timeScale) && (0 === this._time || d >= this.totalDuration()) && (o && (s.length && a(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[h] && this._callback(h)))
            } else g !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
        }, h.getActive = function (t, e, r) {
            null == t && (t = !0), null == e && (e = !0), null == r && (r = !1);
            var i, n, o = [], s = this.getChildren(t, e, r), a = 0, l = s.length;
            for (i = 0; l > i; i++) (n = s[i]).isActive() && (o[a++] = n);
            return o
        }, h.getLabelAfter = function (t) {
            t || 0 !== t && (t = this._time);
            var e, r = this.getLabelsArray(), i = r.length;
            for (e = 0; i > e; e++) if (r[e].time > t) return r[e].name;
            return null
        }, h.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), r = e.length; --r > -1;) if (t > e[r].time) return e[r].name;
            return null
        }, h.getLabelsArray = function () {
            var t, e = [], r = 0;
            for (t in this._labels) e[r++] = {time: this._labels[t], name: t};
            return e.sort(function (t, e) {
                return t.time - e.time
            }), e
        }, h.progress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }, h.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }, h.totalDuration = function (e) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((e - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (t.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, h.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, h.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, h.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, h.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, h.currentLabel = function (t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }, i
    }, !0), function () {
        var t = 180 / Math.PI, e = [], r = [], i = [], n = {}, o = _gsScope._gsDefine.globals,
            s = function (t, e, r, i) {
                this.a = t, this.b = e, this.c = r, this.d = i, this.da = i - t, this.ca = r - t, this.ba = e - t
            }, a = function (t, e, r, i) {
                var n = {a: t}, o = {}, s = {}, a = {c: i}, l = (t + e) / 2, h = (e + r) / 2, u = (r + i) / 2,
                    c = (l + h) / 2, p = (h + u) / 2, d = (p - c) / 8;
                return n.b = l + (t - l) / 4, o.b = c + d, n.c = o.a = (n.b + o.b) / 2, o.c = s.a = (c + p) / 2, s.b = p - d, a.b = u + (i - u) / 4, s.c = a.a = (s.b + a.b) / 2, [n, o, s, a]
            }, l = function (t, n, o, s, l) {
                var h, u, c, p, d, f, m, g, v, _, y, x, b, T = t.length - 1, w = 0, E = t[0].a;
                for (h = 0; T > h; h++) d = t[w], u = d.a, c = d.d, p = t[w + 1].d, l ? (y = e[h], x = r[h], b = .25 * (x + y) * n / (s ? .5 : i[h] || .5), f = c - (c - u) * (s ? .5 * n : 0 !== y ? b / y : 0), m = c + (p - c) * (s ? .5 * n : 0 !== x ? b / x : 0), g = c - (f + ((m - f) * (3 * y / (y + x) + .5) / 4 || 0))) : (f = c - .5 * (c - u) * n, m = c + .5 * (p - c) * n, g = c - (f + m) / 2), f += g, m += g, d.c = v = f, d.b = 0 !== h ? E : E = d.a + .6 * (d.c - d.a), d.da = c - u, d.ca = v - u, d.ba = E - u, o ? (_ = a(u, E, v, c), t.splice(w, 1, _[0], _[1], _[2], _[3]), w += 4) : w++, E = m;
                (d = t[w]).b = E, d.c = E + .4 * (d.d - E), d.da = d.d - d.a, d.ca = d.c - d.a, d.ba = E - d.a, o && (_ = a(d.a, E, d.c, d.d), t.splice(w, 1, _[0], _[1], _[2], _[3]))
            }, h = function (t, i, n, o) {
                var a, l, h, u, c, p, d = [];
                if (o) for (t = [o].concat(t), l = t.length; --l > -1;) "string" == typeof(p = t[l][i]) && "=" === p.charAt(1) && (t[l][i] = o[i] + Number(p.charAt(0) + p.substr(2)));
                if (0 > (a = t.length - 2)) return d[0] = new s(t[0][i], 0, 0, t[-1 > a ? 0 : 1][i]), d;
                for (l = 0; a > l; l++) h = t[l][i], u = t[l + 1][i], d[l] = new s(h, 0, 0, u), n && (c = t[l + 2][i], e[l] = (e[l] || 0) + (u - h) * (u - h), r[l] = (r[l] || 0) + (c - u) * (c - u));
                return d[l] = new s(t[l][i], 0, 0, t[l + 1][i]), d
            }, u = function (t, o, s, a, u, c) {
                var p, d, f, m, g, v, _, y, x = {}, b = [], T = c || t[0];
                u = "string" == typeof u ? "," + u + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == o && (o = 1);
                for (d in t[0]) b.push(d);
                if (t.length > 1) {
                    for (y = t[t.length - 1], _ = !0, p = b.length; --p > -1;) if (d = b[p], Math.abs(T[d] - y[d]) > .05) {
                        _ = !1;
                        break
                    }
                    _ && (t = t.concat(), c && t.unshift(c), t.push(t[1]), c = t[t.length - 3])
                }
                for (e.length = r.length = i.length = 0, p = b.length; --p > -1;) d = b[p], n[d] = -1 !== u.indexOf("," + d + ","), x[d] = h(t, d, n[d], c);
                for (p = e.length; --p > -1;) e[p] = Math.sqrt(e[p]), r[p] = Math.sqrt(r[p]);
                if (!a) {
                    for (p = b.length; --p > -1;) if (n[d]) for (f = x[b[p]], v = f.length - 1, m = 0; v > m; m++) g = f[m + 1].da / r[m] + f[m].da / e[m], i[m] = (i[m] || 0) + g * g;
                    for (p = i.length; --p > -1;) i[p] = Math.sqrt(i[p])
                }
                for (p = b.length, m = s ? 4 : 1; --p > -1;) d = b[p], f = x[d], l(f, o, s, a, n[d]), _ && (f.splice(0, m), f.splice(f.length - m, m));
                return x
            }, c = function (t, e, r) {
                var i, n, o, a, l, h, u, c, p, d, f, m = {}, g = "cubic" === (e = e || "soft") ? 3 : 2, v = "soft" === e,
                    _ = [];
                if (v && r && (t = [r].concat(t)), null == t || g + 1 > t.length) throw"invalid Bezier data";
                for (p in t[0]) _.push(p);
                for (h = _.length; --h > -1;) {
                    for (m[p = _[h]] = l = [], d = 0, c = t.length, u = 0; c > u; u++) i = null == r ? t[u][p] : "string" == typeof(f = t[u][p]) && "=" === f.charAt(1) ? r[p] + Number(f.charAt(0) + f.substr(2)) : Number(f), v && u > 1 && c - 1 > u && (l[d++] = (i + l[d - 2]) / 2), l[d++] = i;
                    for (c = d - g + 1, d = 0, u = 0; c > u; u += g) i = l[u], n = l[u + 1], o = l[u + 2], a = 2 === g ? 0 : l[u + 3], l[d++] = f = 3 === g ? new s(i, n, o, a) : new s(i, (2 * n + i) / 3, (2 * n + o) / 3, o);
                    l.length = d
                }
                return m
            }, p = function (t, e, r) {
                for (var i, n, o, s, a, l, h, u, c, p, d, f = 1 / r, m = t.length; --m > -1;) for (p = t[m], o = p.a, s = p.d - o, a = p.c - o, l = p.b - o, i = n = 0, u = 1; r >= u; u++) h = f * u, c = 1 - h, i = n - (n = (h * h * s + 3 * c * (h * a + c * l)) * h), d = m * r + u - 1, e[d] = (e[d] || 0) + i * i
            }, d = function (t, e) {
                var r, i, n, o, s = [], a = [], l = 0, h = 0, u = (e = e >> 0 || 6) - 1, c = [], d = [];
                for (r in t) p(t[r], s, e);
                for (n = s.length, i = 0; n > i; i++) l += Math.sqrt(s[i]), o = i % e, d[o] = l, o === u && (h += l, o = i / e >> 0, c[o] = d, a[o] = h, l = 0, d = []);
                return {length: h, lengths: a, segments: c}
            }, f = _gsScope._gsDefine.plugin({
                propName: "bezier", priority: -1, version: "1.3.4", API: 2, global: !0, init: function (t, e, r) {
                    this._target = t, e instanceof Array && (e = {values: e}), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
                    var i, n, o, s, a, l = e.values || [], h = {}, p = l[0], f = e.autoRotate || r.vars.orientToBezier;
                    this._autoRotate = f ? f instanceof Array ? f : [["x", "y", "rotation", !0 === f ? 0 : Number(f) || 0]] : null;
                    for (i in p) this._props.push(i);
                    for (o = this._props.length; --o > -1;) i = this._props[o], this._overwriteProps.push(i), n = this._func[i] = "function" == typeof t[i], h[i] = n ? t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]() : parseFloat(t[i]), a || h[i] !== l[0][i] && (a = h);
                    if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? u(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, a) : c(l, e.type, h), this._segCount = this._beziers[i].length, this._timeRes) {
                        var m = d(this._beziers, this._timeRes);
                        this._length = m.length, this._lengths = m.lengths, this._segments = m.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                    }
                    if (f = this._autoRotate) for (this._initialRotations = [], f[0] instanceof Array || (this._autoRotate = f = [f]), o = f.length; --o > -1;) {
                        for (s = 0; 3 > s; s++) i = f[o][s], this._func[i] = "function" == typeof t[i] && t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)];
                        i = f[o][2], this._initialRotations[o] = this._func[i] ? this._func[i].call(this._target) : this._target[i]
                    }
                    return this._startRatio = r.vars.runBackwards ? 1 : 0, !0
                }, set: function (e) {
                    var r, i, n, o, s, a, l, h, u, c, p = this._segCount, d = this._func, f = this._target,
                        m = e !== this._startRatio;
                    if (this._timeRes) {
                        if (u = this._lengths, c = this._curSeg, e *= this._length, n = this._li, e > this._l2 && p - 1 > n) {
                            for (h = p - 1; h > n && e >= (this._l2 = u[++n]);) ;
                            this._l1 = u[n - 1], this._li = n, this._curSeg = c = this._segments[n], this._s2 = c[this._s1 = this._si = 0]
                        } else if (this._l1 > e && n > 0) {
                            for (; n > 0 && (this._l1 = u[--n]) >= e;) ;
                            0 === n && this._l1 > e ? this._l1 = 0 : n++, this._l2 = u[n], this._li = n, this._curSeg = c = this._segments[n], this._s1 = c[(this._si = c.length - 1) - 1] || 0, this._s2 = c[this._si]
                        }
                        if (r = n, e -= this._l1, n = this._si, e > this._s2 && c.length - 1 > n) {
                            for (h = c.length - 1; h > n && e >= (this._s2 = c[++n]);) ;
                            this._s1 = c[n - 1], this._si = n
                        } else if (this._s1 > e && n > 0) {
                            for (; n > 0 && (this._s1 = c[--n]) >= e;) ;
                            0 === n && this._s1 > e ? this._s1 = 0 : n++, this._s2 = c[n], this._si = n
                        }
                        a = (n + (e - this._s1) / (this._s2 - this._s1)) * this._prec
                    } else r = 0 > e ? 0 : e >= 1 ? p - 1 : p * e >> 0, a = (e - r * (1 / p)) * p;
                    for (i = 1 - a, n = this._props.length; --n > -1;) o = this._props[n], s = this._beziers[o][r], l = (a * a * s.da + 3 * i * (a * s.ca + i * s.ba)) * a + s.a, this._round[o] && (l = Math.round(l)), d[o] ? f[o](l) : f[o] = l;
                    if (this._autoRotate) {
                        var g, v, _, y, x, b, T, w = this._autoRotate;
                        for (n = w.length; --n > -1;) o = w[n][2], b = w[n][3] || 0, T = !0 === w[n][4] ? 1 : t, s = this._beziers[w[n][0]], g = this._beziers[w[n][1]], s && g && (s = s[r], g = g[r], v = s.a + (s.b - s.a) * a, y = s.b + (s.c - s.b) * a, v += (y - v) * a, y += (s.c + (s.d - s.c) * a - y) * a, _ = g.a + (g.b - g.a) * a, x = g.b + (g.c - g.b) * a, _ += (x - _) * a, x += (g.c + (g.d - g.c) * a - x) * a, l = m ? Math.atan2(x - _, y - v) * T + b : this._initialRotations[n], d[o] ? f[o](l) : f[o] = l)
                    }
                }
            }), m = f.prototype;
        f.bezierThrough = u, f.cubicToQuadratic = a, f._autoCSS = !0, f.quadraticToCubic = function (t, e, r) {
            return new s(t, (2 * e + t) / 3, (2 * e + r) / 3, r)
        }, f._cssRegister = function () {
            var t = o.CSSPlugin;
            if (t) {
                var e = t._internals, r = e._parseToProxy, i = e._setPluginRatio, n = e.CSSPropTween;
                e._registerComplexSpecialProp("bezier", {
                    parser: function (t, e, o, s, a, l) {
                        e instanceof Array && (e = {values: e}), l = new f;
                        var h, u, c, p = e.values, d = p.length - 1, m = [], g = {};
                        if (0 > d) return a;
                        for (h = 0; d >= h; h++) c = r(t, p[h], s, a, l, d !== h), m[h] = c.end;
                        for (u in e) g[u] = e[u];
                        return g.values = m, a = new n(t, "bezier", 0, 0, c.pt, 2), a.data = c, a.plugin = l, a.setRatio = i, 0 === g.autoRotate && (g.autoRotate = !0), !g.autoRotate || g.autoRotate instanceof Array || (h = !0 === g.autoRotate ? 0 : Number(g.autoRotate), g.autoRotate = null != c.end.left ? [["left", "top", "rotation", h, !1]] : null != c.end.x && [["x", "y", "rotation", h, !1]]), g.autoRotate && (s._transform || s._enableTransforms(!1), c.autoRotate = s._target._gsTransform), l._onInitTween(c.proxy, g, s._tween), a
                    }
                })
            }
        }, m._roundProps = function (t, e) {
            for (var r = this._overwriteProps, i = r.length; --i > -1;) (t[r[i]] || t.bezier || t.bezierThrough) && (this._round[r[i]] = e)
        }, m._kill = function (t) {
            var e, r, i = this._props;
            for (e in this._beziers) if (e in t) for (delete this._beziers[e], delete this._func[e], r = i.length; --r > -1;) i[r] === e && i.splice(r, 1);
            return this._super._kill.call(this, t)
        }
    }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (t, e) {
        var r, i, n, o, s = function () {
            t.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = s.prototype.setRatio
        }, a = _gsScope._gsDefine.globals, l = {}, h = s.prototype = new t("css");
        h.constructor = s, s.version = "1.18.0", s.API = 2, s.defaultTransformPerspective = 0, s.defaultSkewType = "compensated", s.defaultSmoothOrigin = !0, h = "px", s.suffixMap = {
            top: h, right: h, bottom: h, left: h, width: h, height: h, fontSize: h, padding: h, margin: h,
            perspective: h, lineHeight: ""
        };
        var u, c, p, d, f, m, g = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
            v = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            _ = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, y = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            x = /(?:\d|\-|\+|=|#|\.)*/g, b = /opacity *= *([^)]*)/i, T = /opacity:([^;]*)/i,
            w = /alpha\(opacity *=.+?\)/i, E = /^(rgb|hsl)/, S = /([A-Z])/g, A = /-([a-z])/gi,
            M = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, C = function (t, e) {
                return e.toUpperCase()
            }, R = /(?:Left|Right|Width)/i, P = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            O = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, D = /,(?=[^\)]*(?:\(|$))/gi, I = Math.PI / 180,
            F = 180 / Math.PI, L = {}, k = document, B = function (t) {
                return k.createElementNS ? k.createElementNS("http://www.w3.org/1999/xhtml", t) : k.createElement(t)
            }, N = B("div"), U = B("img"), X = s._internals = {_specialProps: l}, Y = navigator.userAgent, j = function () {
                var t = Y.indexOf("Android"), e = B("a");
                return p = -1 !== Y.indexOf("Safari") && -1 === Y.indexOf("Chrome") && (-1 === t || Number(Y.substr(t + 8, 1)) > 3), f = p && 6 > Number(Y.substr(Y.indexOf("Version/") + 8, 1)), d = -1 !== Y.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(Y) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(Y)) && (m = parseFloat(RegExp.$1)), !!e && (e.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(e.style.opacity))
            }(), V = function (t) {
                return b.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            }, W = function (t) {
                window.console && console.log(t)
            }, G = "", z = "", H = function (t, e) {
                var r, i, n = (e = e || N).style;
                if (void 0 !== n[t]) return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1), r = ["O", "Moz", "ms", "Ms", "Webkit"], i = 5; --i > -1 && void 0 === n[r[i] + t];) ;
                return i >= 0 ? (z = 3 === i ? "ms" : r[i], G = "-" + z.toLowerCase() + "-", z + t) : null
            }, q = k.defaultView ? k.defaultView.getComputedStyle : function () {
            }, Z = s.getStyle = function (t, e, r, i, n) {
                var o;
                return j || "opacity" !== e ? (!i && t.style[e] ? o = t.style[e] : (r = r || q(t)) ? o = r[e] || r.getPropertyValue(e) || r.getPropertyValue(e.replace(S, "-$1").toLowerCase()) : t.currentStyle && (o = t.currentStyle[e]), null == n || o && "none" !== o && "auto" !== o && "auto auto" !== o ? o : n) : V(t)
            }, K = X.convertToPixels = function (t, r, i, n, o) {
                if ("px" === n || !n) return i;
                if ("auto" === n || !i) return 0;
                var a, l, h, u = R.test(r), c = t, p = N.style, d = 0 > i;
                if (d && (i = -i), "%" === n && -1 !== r.indexOf("border")) a = i / 100 * (u ? t.clientWidth : t.clientHeight); else {
                    if (p.cssText = "border:0 solid red;position:" + Z(t, "position") + ";line-height:0;", "%" !== n && c.appendChild && "v" !== n.charAt(0) && "rem" !== n) p[u ? "borderLeftWidth" : "borderTopWidth"] = i + n; else {
                        if (c = t.parentNode || k.body, l = c._gsCache, h = e.ticker.frame, l && u && l.time === h) return l.width * i / 100;
                        p[u ? "width" : "height"] = i + n
                    }
                    c.appendChild(N), a = parseFloat(N[u ? "offsetWidth" : "offsetHeight"]), c.removeChild(N), u && "%" === n && !1 !== s.cacheWidths && (l = c._gsCache = c._gsCache || {}, l.time = h, l.width = a / i * 100), 0 !== a || o || (a = K(t, r, i, n, !0))
                }
                return d ? -a : a
            }, Q = X.calculateOffset = function (t, e, r) {
                if ("absolute" !== Z(t, "position", r)) return 0;
                var i = "left" === e ? "Left" : "Top", n = Z(t, "margin" + i, r);
                return t["offset" + i] - (K(t, e, parseFloat(n), n.replace(x, "")) || 0)
            }, J = function (t, e) {
                var r, i, n, o = {};
                if (e = e || q(t, null)) if (r = e.length) for (; --r > -1;) (-1 === (n = e[r]).indexOf("-transform") || Et === n) && (o[n.replace(A, C)] = e.getPropertyValue(n)); else for (r in e) (-1 === r.indexOf("Transform") || wt === r) && (o[r] = e[r]); else if (e = t.currentStyle || t.style) for (r in e) "string" == typeof r && void 0 === o[r] && (o[r.replace(A, C)] = e[r]);
                return j || (o.opacity = V(t)), i = kt(t, e, !1), o.rotation = i.rotation, o.skewX = i.skewX, o.scaleX = i.scaleX, o.scaleY = i.scaleY, o.x = i.x, o.y = i.y, At && (o.z = i.z, o.rotationX = i.rotationX, o.rotationY = i.rotationY, o.scaleZ = i.scaleZ), o.filters && delete o.filters, o
            }, $ = function (t, e, r, i, n) {
                var o, s, a, l = {}, h = t.style;
                for (s in r) "cssText" !== s && "length" !== s && isNaN(s) && (e[s] !== (o = r[s]) || n && n[s]) && -1 === s.indexOf("Origin") && ("number" == typeof o || "string" == typeof o) && (l[s] = "auto" !== o || "left" !== s && "top" !== s ? "" !== o && "auto" !== o && "none" !== o || "string" != typeof e[s] || "" === e[s].replace(y, "") ? o : 0 : Q(t, s), void 0 !== h[s] && (a = new ft(h, s, h[s], a)));
                if (i) for (s in i) "className" !== s && (l[s] = i[s]);
                return {difs: l, firstMPT: a}
            }, tt = {width: ["Left", "Right"], height: ["Top", "Bottom"]},
            et = ["marginLeft", "marginRight", "marginTop", "marginBottom"], rt = function (t, e, r) {
                var i = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight), n = tt[e], o = n.length;
                for (r = r || q(t, null); --o > -1;) i -= parseFloat(Z(t, "padding" + n[o], r, !0)) || 0, i -= parseFloat(Z(t, "border" + n[o] + "Width", r, !0)) || 0;
                return i
            }, it = function (t, e) {
                if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                (null == t || "" === t) && (t = "0 0");
                var r = t.split(" "), i = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : r[0],
                    n = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : r[1];
                return null == n ? n = "center" === i ? "50%" : "0" : "center" === n && (n = "50%"), ("center" === i || isNaN(parseFloat(i)) && -1 === (i + "").indexOf("=")) && (i = "50%"), t = i + " " + n + (r.length > 2 ? " " + r[2] : ""), e && (e.oxp = -1 !== i.indexOf("%"), e.oyp = -1 !== n.indexOf("%"), e.oxr = "=" === i.charAt(1), e.oyr = "=" === n.charAt(1), e.ox = parseFloat(i.replace(y, "")), e.oy = parseFloat(n.replace(y, "")), e.v = t), e || t
            }, nt = function (t, e) {
                return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e)
            }, ot = function (t, e) {
                return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t)
            }, st = function (t, e, r, i) {
                var n, o, s, a, l;
                return null == t ? a = e : "number" == typeof t ? a = t : (n = 360, o = t.split("_"), l = "=" === t.charAt(1), s = (l ? parseInt(t.charAt(0) + "1", 10) * parseFloat(o[0].substr(2)) : parseFloat(o[0])) * (-1 === t.indexOf("rad") ? 1 : F) - (l ? 0 : e), o.length && (i && (i[r] = e + s), -1 !== t.indexOf("short") && (s %= n) != s % (n / 2) && (s = 0 > s ? s + n : s - n), -1 !== t.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * n) % n - (0 | s / n) * n : -1 !== t.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * n) % n - (0 | s / n) * n)), a = e + s), 1e-6 > a && a > -1e-6 && (a = 0), a
            }, at = {
                aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0],
                teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255],
                olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128],
                purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            }, lt = function (t, e, r) {
                return 0 | 255 * (1 > 6 * (t = 0 > t ? t + 1 : t > 1 ? t - 1 : t) ? e + 6 * (r - e) * t : .5 > t ? r : 2 > 3 * t ? e + 6 * (r - e) * (2 / 3 - t) : e) + .5
            }, ht = s.parseColor = function (t, e) {
                var r, i, n, o, s, a, l, h, u, c, p;
                if (t) if ("number" == typeof t) r = [t >> 16, 255 & t >> 8, 255 & t]; else {
                    if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), at[t]) r = at[t]; else if ("#" === t.charAt(0)) 4 === t.length && (i = t.charAt(1), n = t.charAt(2), o = t.charAt(3), t = "#" + i + i + n + n + o + o), t = parseInt(t.substr(1), 16), r = [t >> 16, 255 & t >> 8, 255 & t]; else if ("hsl" === t.substr(0, 3)) if (r = p = t.match(g), e) {
                        if (-1 !== t.indexOf("=")) return t.match(v)
                    } else s = Number(r[0]) % 360 / 360, a = Number(r[1]) / 100, l = Number(r[2]) / 100, n = .5 >= l ? l * (a + 1) : l + a - l * a, i = 2 * l - n, r.length > 3 && (r[3] = Number(t[3])), r[0] = lt(s + 1 / 3, i, n), r[1] = lt(s, i, n), r[2] = lt(s - 1 / 3, i, n); else r = t.match(g) || at.transparent;
                    r[0] = Number(r[0]), r[1] = Number(r[1]), r[2] = Number(r[2]), r.length > 3 && (r[3] = Number(r[3]))
                } else r = at.black;
                return e && !p && (i = r[0] / 255, n = r[1] / 255, o = r[2] / 255, h = Math.max(i, n, o), u = Math.min(i, n, o), l = (h + u) / 2, h === u ? s = a = 0 : (c = h - u, a = l > .5 ? c / (2 - h - u) : c / (h + u), s = h === i ? (n - o) / c + (o > n ? 6 : 0) : h === n ? (o - i) / c + 2 : (i - n) / c + 4, s *= 60), r[0] = 0 | s + .5, r[1] = 0 | 100 * a + .5, r[2] = 0 | 100 * l + .5), r
            }, ut = function (t, e) {
                var r, i, n, o = t.match(ct) || [], s = 0, a = o.length ? "" : t;
                for (r = 0; o.length > r; r++) i = o[r], n = t.substr(s, t.indexOf(i, s) - s), s += n.length + i.length, 3 === (i = ht(i, e)).length && i.push(1), a += n + (e ? "hsla(" + i[0] + "," + i[1] + "%," + i[2] + "%," + i[3] : "rgba(" + i.join(",")) + ")";
                return a
            }, ct = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
        for (h in at) ct += "|" + h + "\\b";
        ct = RegExp(ct + ")", "gi"), s.colorStringFilter = function (t) {
            var e, r = t[0] + t[1];
            ct.lastIndex = 0, ct.test(r) && (e = -1 !== r.indexOf("hsl(") || -1 !== r.indexOf("hsla("), t[0] = ut(t[0], e), t[1] = ut(t[1], e))
        }, e.defaultStringFilter || (e.defaultStringFilter = s.colorStringFilter);
        var pt = function (t, e, r, i) {
            if (null == t) return function (t) {
                return t
            };
            var n, o = e ? (t.match(ct) || [""])[0] : "", s = t.split(o).join("").match(_) || [],
                a = t.substr(0, t.indexOf(s[0])), l = ")" === t.charAt(t.length - 1) ? ")" : "",
                h = -1 !== t.indexOf(" ") ? " " : ",", u = s.length, c = u > 0 ? s[0].replace(g, "") : "";
            return u ? n = e ? function (t) {
                var e, p, d, f;
                if ("number" == typeof t) t += c; else if (i && D.test(t)) {
                    for (f = t.replace(D, "|").split("|"), d = 0; f.length > d; d++) f[d] = n(f[d]);
                    return f.join(",")
                }
                if (e = (t.match(ct) || [o])[0], p = t.split(e).join("").match(_) || [], d = p.length, u > d--) for (; u > ++d;) p[d] = r ? p[0 | (d - 1) / 2] : s[d];
                return a + p.join(h) + h + e + l + (-1 !== t.indexOf("inset") ? " inset" : "")
            } : function (t) {
                var e, o, p;
                if ("number" == typeof t) t += c; else if (i && D.test(t)) {
                    for (o = t.replace(D, "|").split("|"), p = 0; o.length > p; p++) o[p] = n(o[p]);
                    return o.join(",")
                }
                if (e = t.match(_) || [], p = e.length, u > p--) for (; u > ++p;) e[p] = r ? e[0 | (p - 1) / 2] : s[p];
                return a + e.join(h) + l
            } : function (t) {
                return t
            }
        }, dt = function (t) {
            return t = t.split(","), function (e, r, i, n, o, s, a) {
                var l, h = (r + "").split(" ");
                for (a = {}, l = 0; 4 > l; l++) a[t[l]] = h[l] = h[l] || h[(l - 1) / 2 >> 0];
                return n.parse(e, a, o, s)
            }
        }, ft = (X._setPluginRatio = function (t) {
            this.plugin.setRatio(t);
            for (var e, r, i, n, o = this.data, s = o.proxy, a = o.firstMPT; a;) e = s[a.v], a.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), a.t[a.p] = e, a = a._next;
            if (o.autoRotate && (o.autoRotate.rotation = s.rotation), 1 === t) for (a = o.firstMPT; a;) {
                if ((r = a.t).type) {
                    if (1 === r.type) {
                        for (n = r.xs0 + r.s + r.xs1, i = 1; r.l > i; i++) n += r["xn" + i] + r["xs" + (i + 1)];
                        r.e = n
                    }
                } else r.e = r.s + r.xs0;
                a = a._next
            }
        }, function (t, e, r, i, n) {
            this.t = t, this.p = e, this.v = r, this.r = n, i && (i._prev = this, this._next = i)
        }), mt = (X._parseToProxy = function (t, e, r, i, n, o) {
            var s, a, l, h, u, c = i, p = {}, d = {}, f = r._transform, m = L;
            for (r._transform = null, L = e, i = u = r.parse(t, e, i, n), L = m, o && (r._transform = f, c && (c._prev = null, c._prev && (c._prev._next = null))); i && i !== c;) {
                if (1 >= i.type && (a = i.p, d[a] = i.s + i.c, p[a] = i.s, o || (h = new ft(i, "s", a, h, i.r), i.c = 0), 1 === i.type)) for (s = i.l; --s > 0;) l = "xn" + s, a = i.p + "_" + l, d[a] = i.data[l], p[a] = i[l], o || (h = new ft(i, l, a, h, i.rxp[l]));
                i = i._next
            }
            return {proxy: p, end: d, firstMPT: h, pt: u}
        }, X.CSSPropTween = function (t, e, i, n, s, a, l, h, u, c, p) {
            this.t = t, this.p = e, this.s = i, this.c = n, this.n = l || e, t instanceof mt || o.push(this.n), this.r = h, this.type = a || 0, u && (this.pr = u, r = !0), this.b = void 0 === c ? i : c, this.e = void 0 === p ? i + n : p, s && (this._next = s, s._prev = this)
        }), gt = function (t, e, r, i, n, o) {
            var s = new mt(t, e, r, i - r, n, -1, o);
            return s.b = r, s.e = s.xs0 = i, s
        }, vt = s.parseComplex = function (t, e, r, i, n, o, s, a, l, h) {
            r = r || o || "", s = new mt(t, e, 0, 0, s, h ? 2 : 1, null, !1, a, r, i), i += "";
            var c, p, d, f, m, _, y, x, b, T, w, E, S, A = r.split(", ").join(",").split(" "),
                M = i.split(", ").join(",").split(" "), C = A.length, R = !1 !== u;
            for ((-1 !== i.indexOf(",") || -1 !== r.indexOf(",")) && (A = A.join(" ").replace(D, ", ").split(" "), M = M.join(" ").replace(D, ", ").split(" "), C = A.length), C !== M.length && (A = (o || "").split(" "), C = A.length), s.plugin = l, s.setRatio = h, ct.lastIndex = 0, c = 0; C > c; c++) if (f = A[c], m = M[c], (x = parseFloat(f)) || 0 === x) s.appendXtra("", x, nt(m, x), m.replace(v, ""), R && -1 !== m.indexOf("px"), !0); else if (n && ct.test(f)) E = "," === m.charAt(m.length - 1) ? ")," : ")", S = -1 !== m.indexOf("hsl") && j, f = ht(f, S), m = ht(m, S), (b = f.length + m.length > 6) && !j && 0 === m[3] ? (s["xs" + s.l] += s.l ? " transparent" : "transparent", s.e = s.e.split(M[c]).join("transparent")) : (j || (b = !1), S ? s.appendXtra(b ? "hsla(" : "hsl(", f[0], nt(m[0], f[0]), ",", !1, !0).appendXtra("", f[1], nt(m[1], f[1]), "%,", !1).appendXtra("", f[2], nt(m[2], f[2]), b ? "%," : "%" + E, !1) : s.appendXtra(b ? "rgba(" : "rgb(", f[0], m[0] - f[0], ",", !0, !0).appendXtra("", f[1], m[1] - f[1], ",", !0).appendXtra("", f[2], m[2] - f[2], b ? "," : E, !0), b && (f = 4 > f.length ? 1 : f[3], s.appendXtra("", f, (4 > m.length ? 1 : m[3]) - f, E, !1))), ct.lastIndex = 0; else if (_ = f.match(g)) {
                if (!(y = m.match(v)) || y.length !== _.length) return s;
                for (d = 0, p = 0; _.length > p; p++) w = _[p], T = f.indexOf(w, d), s.appendXtra(f.substr(d, T - d), Number(w), nt(y[p], w), "", R && "px" === f.substr(T + w.length, 2), 0 === p), d = T + w.length;
                s["xs" + s.l] += f.substr(d)
            } else s["xs" + s.l] += s.l ? " " + f : f;
            if (-1 !== i.indexOf("=") && s.data) {
                for (E = s.xs0 + s.data.s, c = 1; s.l > c; c++) E += s["xs" + c] + s.data["xn" + c];
                s.e = E + s["xs" + c]
            }
            return s.l || (s.type = -1, s.xs0 = s.e), s.xfirst || s
        }, _t = 9;
        for ((h = mt.prototype).l = h.pr = 0; --_t > 0;) h["xn" + _t] = 0, h["xs" + _t] = "";
        h.xs0 = "", h._next = h._prev = h.xfirst = h.data = h.plugin = h.setRatio = h.rxp = null, h.appendXtra = function (t, e, r, i, n, o) {
            var s = this, a = s.l;
            return s["xs" + a] += o && a ? " " + t : t || "", r || 0 === a || s.plugin ? (s.l++, s.type = s.setRatio ? 2 : 1, s["xs" + s.l] = i || "", a > 0 ? (s.data["xn" + a] = e + r, s.rxp["xn" + a] = n, s["xn" + a] = e, s.plugin || (s.xfirst = new mt(s, "xn" + a, e, r, s.xfirst || s, 0, s.n, n, s.pr), s.xfirst.xs0 = 0), s) : (s.data = {s: e + r}, s.rxp = {}, s.s = e, s.c = r, s.r = n, s)) : (s["xs" + a] += e + (i || ""), s)
        };
        var yt = function (t, e) {
            e = e || {}, this.p = e.prefix ? H(t) || t : t, l[t] = l[this.p] = this, this.format = e.formatter || pt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
        }, xt = X._registerComplexSpecialProp = function (t, e, r) {
            "object" != typeof e && (e = {parser: r});
            var i, n = t.split(","), o = e.defaultValue;
            for (r = r || [o], i = 0; n.length > i; i++) e.prefix = 0 === i && e.prefix, e.defaultValue = r[i] || o, new yt(n[i], e)
        };
        (h = yt.prototype).parseComplex = function (t, e, r, i, n, o) {
            var s, a, l, h, u, c, p = this.keyword;
            if (this.multi && (D.test(r) || D.test(e) ? (a = e.replace(D, "|").split("|"), l = r.replace(D, "|").split("|")) : p && (a = [e], l = [r])), l) {
                for (h = l.length > a.length ? l.length : a.length, s = 0; h > s; s++) e = a[s] = a[s] || this.dflt, r = l[s] = l[s] || this.dflt, p && (u = e.indexOf(p), c = r.indexOf(p), u !== c && (-1 === c ? a[s] = a[s].split(p).join("") : -1 === u && (a[s] += " " + p)));
                e = a.join(", "), r = l.join(", ")
            }
            return vt(t, this.p, e, r, this.clrs, this.dflt, i, this.pr, n, o)
        }, h.parse = function (t, e, r, i, o, s) {
            return this.parseComplex(t.style, this.format(Z(t, this.p, n, !1, this.dflt)), this.format(e), o, s)
        }, s.registerSpecialProp = function (t, e, r) {
            xt(t, {
                parser: function (t, i, n, o, s, a) {
                    var l = new mt(t, n, 0, 0, s, 2, n, !1, r);
                    return l.plugin = a, l.setRatio = e(t, i, o._tween, n), l
                }, priority: r
            })
        }, s.useSVGTransformAttr = p || d;
        var bt,
            Tt = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            wt = H("transform"), Et = G + "transform", St = H("transformOrigin"), At = null !== H("perspective"),
            Mt = X.Transform = function () {
                this.perspective = parseFloat(s.defaultTransformPerspective) || 0, this.force3D = !(!1 === s.defaultForce3D || !At) && (s.defaultForce3D || "auto")
            }, Ct = window.SVGElement, Rt = function (t, e, r) {
                var i, n = k.createElementNS("http://www.w3.org/2000/svg", t), o = /([a-z])([A-Z])/g;
                for (i in r) n.setAttributeNS(null, i.replace(o, "$1-$2").toLowerCase(), r[i]);
                return e.appendChild(n), n
            }, Pt = k.documentElement, Ot = function () {
                var t, e, r, i = m || /Android/i.test(Y) && !window.chrome;
                return k.createElementNS && !i && (t = Rt("svg", Pt), e = Rt("rect", t, {
                    width: 100, height: 50, x: 100
                }), r = e.getBoundingClientRect().width, e.style[St] = "50% 50%", e.style[wt] = "scaleX(0.5)", i = r === e.getBoundingClientRect().width && !(d && At), Pt.removeChild(t)), i
            }(), Dt = function (t, e, r, i, n) {
                var o, a, l, h, u, c, p, d, f, m, g, v, _, y, x = t._gsTransform, b = Lt(t, !0);
                x && (_ = x.xOrigin, y = x.yOrigin), (!i || 2 > (o = i.split(" ")).length) && (p = t.getBBox(), e = it(e).split(" "), o = [(-1 !== e[0].indexOf("%") ? parseFloat(e[0]) / 100 * p.width : parseFloat(e[0])) + p.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * p.height : parseFloat(e[1])) + p.y]), r.xOrigin = h = parseFloat(o[0]), r.yOrigin = u = parseFloat(o[1]), i && b !== Ft && (c = b[0], p = b[1], d = b[2], f = b[3], m = b[4], g = b[5], v = c * f - p * d, a = h * (f / v) + u * (-d / v) + (d * g - f * m) / v, l = h * (-p / v) + u * (c / v) - (c * g - p * m) / v, h = r.xOrigin = o[0] = a, u = r.yOrigin = o[1] = l), x && (n || !1 !== n && !1 !== s.defaultSmoothOrigin ? (a = h - _, l = u - y, x.xOffset += a * b[0] + l * b[2] - a, x.yOffset += a * b[1] + l * b[3] - l) : x.xOffset = x.yOffset = 0), t.setAttribute("data-svg-origin", o.join(" "))
            }, It = function (t) {
                return !!(Ct && "function" == typeof t.getBBox && t.getCTM && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
            }, Ft = [1, 0, 0, 1, 0, 0], Lt = function (t, e) {
                var r, i, n, o, s, a = t._gsTransform || new Mt;
                if (wt ? i = Z(t, Et, null, !0) : t.currentStyle && (i = t.currentStyle.filter.match(P), i = i && 4 === i.length ? [i[0].substr(4), Number(i[2].substr(4)), Number(i[1].substr(4)), i[3].substr(4), a.x || 0, a.y || 0].join(",") : ""), r = !i || "none" === i || "matrix(1, 0, 0, 1, 0, 0)" === i, (a.svg || t.getBBox && It(t)) && (r && -1 !== (t.style[wt] + "").indexOf("matrix") && (i = t.style[wt], r = 0), n = t.getAttribute("transform"), r && n && (-1 !== n.indexOf("matrix") ? (i = n, r = 0) : -1 !== n.indexOf("translate") && (i = "matrix(1,0,0,1," + n.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", r = 0))), r) return Ft;
                for (n = (i || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], _t = n.length; --_t > -1;) o = Number(n[_t]), n[_t] = (s = o - (o |= 0)) ? (0 | 1e5 * s + (0 > s ? -.5 : .5)) / 1e5 + o : o;
                return e && n.length > 6 ? [n[0], n[1], n[4], n[5], n[12], n[13]] : n
            }, kt = X.getTransform = function (t, r, i, o) {
                if (t._gsTransform && i && !o) return t._gsTransform;
                var a, l, h, u, c, p, d = i ? t._gsTransform || new Mt : new Mt, f = 0 > d.scaleX, m = 1e5,
                    g = At ? parseFloat(Z(t, St, r, !1, "0 0 0").split(" ")[2]) || d.zOrigin || 0 : 0,
                    v = parseFloat(s.defaultTransformPerspective) || 0;
                if (d.svg = !(!t.getBBox || !It(t)), d.svg && (Dt(t, Z(t, St, n, !1, "50% 50%") + "", d, t.getAttribute("data-svg-origin")), bt = s.useSVGTransformAttr || Ot), (a = Lt(t)) !== Ft) {
                    if (16 === a.length) {
                        var _, y, x, b, T, w = a[0], E = a[1], S = a[2], A = a[3], M = a[4], C = a[5], R = a[6], P = a[7],
                            O = a[8], D = a[9], I = a[10], L = a[12], k = a[13], B = a[14], N = a[11], U = Math.atan2(R, I);
                        d.zOrigin && (B = -d.zOrigin, L = O * B - a[12], k = D * B - a[13], B = I * B + d.zOrigin - a[14]), d.rotationX = U * F, U && (b = Math.cos(-U), T = Math.sin(-U), _ = M * b + O * T, y = C * b + D * T, x = R * b + I * T, O = M * -T + O * b, D = C * -T + D * b, I = R * -T + I * b, N = P * -T + N * b, M = _, C = y, R = x), U = Math.atan2(O, I), d.rotationY = U * F, U && (b = Math.cos(-U), T = Math.sin(-U), _ = w * b - O * T, y = E * b - D * T, x = S * b - I * T, D = E * T + D * b, I = S * T + I * b, N = A * T + N * b, w = _, E = y, S = x), U = Math.atan2(E, w), d.rotation = U * F, U && (b = Math.cos(-U), T = Math.sin(-U), w = w * b + M * T, y = E * b + C * T, C = E * -T + C * b, R = S * -T + R * b, E = y), d.rotationX && Math.abs(d.rotationX) + Math.abs(d.rotation) > 359.9 && (d.rotationX = d.rotation = 0, d.rotationY += 180), d.scaleX = (0 | Math.sqrt(w * w + E * E) * m + .5) / m, d.scaleY = (0 | Math.sqrt(C * C + D * D) * m + .5) / m, d.scaleZ = (0 | Math.sqrt(R * R + I * I) * m + .5) / m, d.skewX = 0, d.perspective = N ? 1 / (0 > N ? -N : N) : 0, d.x = L, d.y = k, d.z = B, d.svg && (d.x -= d.xOrigin - (d.xOrigin * w - d.yOrigin * M), d.y -= d.yOrigin - (d.yOrigin * E - d.xOrigin * C))
                    } else if (!(At && !o && a.length && d.x === a[4] && d.y === a[5] && (d.rotationX || d.rotationY) || void 0 !== d.x && "none" === Z(t, "display", r))) {
                        var X = a.length >= 6, Y = X ? a[0] : 1, j = a[1] || 0, V = a[2] || 0, W = X ? a[3] : 1;
                        d.x = a[4] || 0, d.y = a[5] || 0, h = Math.sqrt(Y * Y + j * j), u = Math.sqrt(W * W + V * V), c = Y || j ? Math.atan2(j, Y) * F : d.rotation || 0, p = V || W ? Math.atan2(V, W) * F + c : d.skewX || 0, Math.abs(p) > 90 && 270 > Math.abs(p) && (f ? (h *= -1, p += 0 >= c ? 180 : -180, c += 0 >= c ? 180 : -180) : (u *= -1, p += 0 >= p ? 180 : -180)), d.scaleX = h, d.scaleY = u, d.rotation = c, d.skewX = p, At && (d.rotationX = d.rotationY = d.z = 0, d.perspective = v, d.scaleZ = 1), d.svg && (d.x -= d.xOrigin - (d.xOrigin * Y + d.yOrigin * V), d.y -= d.yOrigin - (d.xOrigin * j + d.yOrigin * W))
                    }
                    d.zOrigin = g;
                    for (l in d) 2e-5 > d[l] && d[l] > -2e-5 && (d[l] = 0)
                }
                return i && (t._gsTransform = d, d.svg && (bt && t.style[wt] ? e.delayedCall(.001, function () {
                    Xt(t.style, wt)
                }) : !bt && t.getAttribute("transform") && e.delayedCall(.001, function () {
                    t.removeAttribute("transform")
                }))), d
            }, Bt = function (t) {
                var e, r, i = this.data, n = -i.rotation * I, o = n + i.skewX * I, s = 1e5,
                    a = (0 | Math.cos(n) * i.scaleX * s) / s, l = (0 | Math.sin(n) * i.scaleX * s) / s,
                    h = (0 | Math.sin(o) * -i.scaleY * s) / s, u = (0 | Math.cos(o) * i.scaleY * s) / s, c = this.t.style,
                    p = this.t.currentStyle;
                if (p) {
                    r = l, l = -h, h = -r, e = p.filter, c.filter = "";
                    var d, f, g = this.t.offsetWidth, v = this.t.offsetHeight, _ = "absolute" !== p.position,
                        y = "progid:DXImageTransform.Microsoft.Matrix(M11=" + a + ", M12=" + l + ", M21=" + h + ", M22=" + u,
                        T = i.x + g * i.xPercent / 100, w = i.y + v * i.yPercent / 100;
                    if (null != i.ox && (d = (i.oxp ? .01 * g * i.ox : i.ox) - g / 2, f = (i.oyp ? .01 * v * i.oy : i.oy) - v / 2, T += d - (d * a + f * l), w += f - (d * h + f * u)), _ ? (d = g / 2, f = v / 2, y += ", Dx=" + (d - (d * a + f * l) + T) + ", Dy=" + (f - (d * h + f * u) + w) + ")") : y += ", sizingMethod='auto expand')", c.filter = -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.replace(O, y) : y + " " + e, (0 === t || 1 === t) && 1 === a && 0 === l && 0 === h && 1 === u && (_ && -1 === y.indexOf("Dx=0, Dy=0") || b.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), !_) {
                        var E, S, A, M = 8 > m ? 1 : -1;
                        for (d = i.ieOffsetX || 0, f = i.ieOffsetY || 0, i.ieOffsetX = Math.round((g - ((0 > a ? -a : a) * g + (0 > l ? -l : l) * v)) / 2 + T), i.ieOffsetY = Math.round((v - ((0 > u ? -u : u) * v + (0 > h ? -h : h) * g)) / 2 + w), _t = 0; 4 > _t; _t++) S = et[_t], E = p[S], r = -1 !== E.indexOf("px") ? parseFloat(E) : K(this.t, S, parseFloat(E), E.replace(x, "")) || 0, A = r !== i[S] ? 2 > _t ? -i.ieOffsetX : -i.ieOffsetY : 2 > _t ? d - i.ieOffsetX : f - i.ieOffsetY, c[S] = (i[S] = Math.round(r - A * (0 === _t || 2 === _t ? 1 : M))) + "px"
                    }
                }
            }, Nt = X.set3DTransformRatio = X.setTransformRatio = function (t) {
                var e, r, i, n, o, s, a, l, h, u, c, p, f, m, g, v, _, y, x, b, T, w, E, S = this.data, A = this.t.style,
                    M = S.rotation, C = S.rotationX, R = S.rotationY, P = S.scaleX, O = S.scaleY, D = S.scaleZ, F = S.x,
                    L = S.y, k = S.z, B = S.svg, N = S.perspective, U = S.force3D;
                if (!((1 !== t && 0 !== t || "auto" !== U || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && U || k || N || R || C) || bt && B || !At) M || S.skewX || B ? (M *= I, w = S.skewX * I, E = 1e5, e = Math.cos(M) * P, n = Math.sin(M) * P, r = Math.sin(M - w) * -O, o = Math.cos(M - w) * O, w && "simple" === S.skewType && (_ = Math.tan(w), _ = Math.sqrt(1 + _ * _), r *= _, o *= _, S.skewY && (e *= _, n *= _)), B && (F += S.xOrigin - (S.xOrigin * e + S.yOrigin * r) + S.xOffset, L += S.yOrigin - (S.xOrigin * n + S.yOrigin * o) + S.yOffset, bt && (S.xPercent || S.yPercent) && (m = this.t.getBBox(), F += .01 * S.xPercent * m.width, L += .01 * S.yPercent * m.height), (m = 1e-6) > F && F > -m && (F = 0), m > L && L > -m && (L = 0)), x = (0 | e * E) / E + "," + (0 | n * E) / E + "," + (0 | r * E) / E + "," + (0 | o * E) / E + "," + F + "," + L + ")", B && bt ? this.t.setAttribute("transform", "matrix(" + x) : A[wt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + x) : A[wt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix(" : "matrix(") + P + ",0,0," + O + "," + F + "," + L + ")"; else {
                    if (d && ((m = 1e-4) > P && P > -m && (P = D = 2e-5), m > O && O > -m && (O = D = 2e-5), !N || S.z || S.rotationX || S.rotationY || (N = 0)), M || S.skewX) M *= I, g = e = Math.cos(M), v = n = Math.sin(M), S.skewX && (M -= S.skewX * I, g = Math.cos(M), v = Math.sin(M), "simple" === S.skewType && (_ = Math.tan(S.skewX * I), _ = Math.sqrt(1 + _ * _), g *= _, v *= _, S.skewY && (e *= _, n *= _))), r = -v, o = g; else {
                        if (!(R || C || 1 !== D || N || B)) return void(A[wt] = (S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) translate3d(" : "translate3d(") + F + "px," + L + "px," + k + "px)" + (1 !== P || 1 !== O ? " scale(" + P + "," + O + ")" : ""));
                        e = o = 1, r = n = 0
                    }
                    h = 1, i = s = a = l = u = c = 0, p = N ? -1 / N : 0, f = S.zOrigin, m = 1e-6, b = ",", T = "0", (M = R * I) && (g = Math.cos(M), v = Math.sin(M), a = -v, u = p * -v, i = e * v, s = n * v, h = g, p *= g, e *= g, n *= g), (M = C * I) && (g = Math.cos(M), v = Math.sin(M), _ = r * g + i * v, y = o * g + s * v, l = h * v, c = p * v, i = r * -v + i * g, s = o * -v + s * g, h *= g, p *= g, r = _, o = y), 1 !== D && (i *= D, s *= D, h *= D, p *= D), 1 !== O && (r *= O, o *= O, l *= O, c *= O), 1 !== P && (e *= P, n *= P, a *= P, u *= P), (f || B) && (f && (F += i * -f, L += s * -f, k += h * -f + f), B && (F += S.xOrigin - (S.xOrigin * e + S.yOrigin * r) + S.xOffset, L += S.yOrigin - (S.xOrigin * n + S.yOrigin * o) + S.yOffset), m > F && F > -m && (F = T), m > L && L > -m && (L = T), m > k && k > -m && (k = 0)), x = S.xPercent || S.yPercent ? "translate(" + S.xPercent + "%," + S.yPercent + "%) matrix3d(" : "matrix3d(", x += (m > e && e > -m ? T : e) + b + (m > n && n > -m ? T : n) + b + (m > a && a > -m ? T : a), x += b + (m > u && u > -m ? T : u) + b + (m > r && r > -m ? T : r) + b + (m > o && o > -m ? T : o), C || R ? (x += b + (m > l && l > -m ? T : l) + b + (m > c && c > -m ? T : c) + b + (m > i && i > -m ? T : i), x += b + (m > s && s > -m ? T : s) + b + (m > h && h > -m ? T : h) + b + (m > p && p > -m ? T : p) + b) : x += ",0,0,0,0,1,0,", x += F + b + L + b + k + b + (N ? 1 + -k / N : 1) + ")", A[wt] = x
                }
            };
        (h = Mt.prototype).x = h.y = h.z = h.skewX = h.skewY = h.rotation = h.rotationX = h.rotationY = h.zOrigin = h.xPercent = h.yPercent = h.xOffset = h.yOffset = 0, h.scaleX = h.scaleY = h.scaleZ = 1, xt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function (t, e, r, i, o, a, l) {
                if (i._lastParsedTransform === l) return o;
                i._lastParsedTransform = l;
                var h, u, c, p, d, f, m, g, v, _, y = t._gsTransform, x = t.style, b = Tt.length, T = l, w = {},
                    E = "transformOrigin";
                if (l.display ? (p = Z(t, "display"), x.display = "block", h = kt(t, n, !0, l.parseTransform), x.display = p) : h = kt(t, n, !0, l.parseTransform), i._transform = h, "string" == typeof T.transform && wt) p = N.style, p[wt] = T.transform, p.display = "block", p.position = "absolute", k.body.appendChild(N), u = kt(N, null, !1), k.body.removeChild(N), u.perspective || (u.perspective = h.perspective), null != T.xPercent && (u.xPercent = ot(T.xPercent, h.xPercent)), null != T.yPercent && (u.yPercent = ot(T.yPercent, h.yPercent)); else if ("object" == typeof T) {
                    if (u = {
                        scaleX: ot(null != T.scaleX ? T.scaleX : T.scale, h.scaleX),
                        scaleY: ot(null != T.scaleY ? T.scaleY : T.scale, h.scaleY), scaleZ: ot(T.scaleZ, h.scaleZ),
                        x: ot(T.x, h.x), y: ot(T.y, h.y), z: ot(T.z, h.z), xPercent: ot(T.xPercent, h.xPercent),
                        yPercent: ot(T.yPercent, h.yPercent), perspective: ot(T.transformPerspective, h.perspective)
                    }, null != (g = T.directionalRotation)) if ("object" == typeof g) for (p in g) T[p] = g[p]; else T.rotation = g;
                    "string" == typeof T.x && -1 !== T.x.indexOf("%") && (u.x = 0, u.xPercent = ot(T.x, h.xPercent)), "string" == typeof T.y && -1 !== T.y.indexOf("%") && (u.y = 0, u.yPercent = ot(T.y, h.yPercent)), u.rotation = st("rotation" in T ? T.rotation : "shortRotation" in T ? T.shortRotation + "_short" : "rotationZ" in T ? T.rotationZ : h.rotation, h.rotation, "rotation", w), At && (u.rotationX = st("rotationX" in T ? T.rotationX : "shortRotationX" in T ? T.shortRotationX + "_short" : h.rotationX || 0, h.rotationX, "rotationX", w), u.rotationY = st("rotationY" in T ? T.rotationY : "shortRotationY" in T ? T.shortRotationY + "_short" : h.rotationY || 0, h.rotationY, "rotationY", w)), u.skewX = null == T.skewX ? h.skewX : st(T.skewX, h.skewX), u.skewY = null == T.skewY ? h.skewY : st(T.skewY, h.skewY), (c = u.skewY - h.skewY) && (u.skewX += c, u.rotation += c)
                }
                for (At && null != T.force3D && (h.force3D = T.force3D, m = !0), h.skewType = T.skewType || h.skewType || s.defaultSkewType, (f = h.force3D || h.z || h.rotationX || h.rotationY || u.z || u.rotationX || u.rotationY || u.perspective) || null == T.scale || (u.scaleZ = 1); --b > -1;) r = Tt[b], ((d = u[r] - h[r]) > 1e-6 || -1e-6 > d || null != T[r] || null != L[r]) && (m = !0, o = new mt(h, r, h[r], d, o), r in w && (o.e = w[r]), o.xs0 = 0, o.plugin = a, i._overwriteProps.push(o.n));
                return d = T.transformOrigin, h.svg && (d || T.svgOrigin) && (v = h.xOffset, _ = h.yOffset, Dt(t, it(d), u, T.svgOrigin, T.smoothOrigin), o = gt(h, "xOrigin", (y ? h : u).xOrigin, u.xOrigin, o, E), o = gt(h, "yOrigin", (y ? h : u).yOrigin, u.yOrigin, o, E), (v !== h.xOffset || _ !== h.yOffset) && (o = gt(h, "xOffset", y ? v : h.xOffset, h.xOffset, o, E), o = gt(h, "yOffset", y ? _ : h.yOffset, h.yOffset, o, E)), d = bt ? null : "0px 0px"), (d || At && f && h.zOrigin) && (wt ? (m = !0, r = St, d = (d || Z(t, r, n, !1, "50% 50%")) + "", o = new mt(x, r, 0, 0, o, -1, E), o.b = x[r], o.plugin = a, At ? (p = h.zOrigin, d = d.split(" "), h.zOrigin = (d.length > 2 && (0 === p || "0px" !== d[2]) ? parseFloat(d[2]) : p) || 0, o.xs0 = o.e = d[0] + " " + (d[1] || "50%") + " 0px", o = new mt(h, "zOrigin", 0, 0, o, -1, o.n), o.b = p, o.xs0 = o.e = h.zOrigin) : o.xs0 = o.e = d) : it(d + "", h)), m && (i._transformType = h.svg && bt || !f && 3 !== this._transformType ? 2 : 3), o
            }, prefix: !0
        }), xt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset"
        }), xt("borderRadius", {
            defaultValue: "0px", parser: function (t, e, r, o, s) {
                e = this.format(e);
                var a, l, h, u, c, p, d, f, m, g, v, _, y, x, b, T,
                    w = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    E = t.style;
                for (m = parseFloat(t.offsetWidth), g = parseFloat(t.offsetHeight), a = e.split(" "), l = 0; w.length > l; l++) this.p.indexOf("border") && (w[l] = H(w[l])), -1 !== (c = u = Z(t, w[l], n, !1, "0px")).indexOf(" ") && (u = c.split(" "), c = u[0], u = u[1]), p = h = a[l], d = parseFloat(c), _ = c.substr((d + "").length), (y = "=" === p.charAt(1)) ? (f = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), f *= parseFloat(p), v = p.substr((f + "").length - (0 > f ? 1 : 0)) || "") : (f = parseFloat(p), v = p.substr((f + "").length)), "" === v && (v = i[r] || _), v !== _ && (x = K(t, "borderLeft", d, _), b = K(t, "borderTop", d, _), "%" === v ? (c = x / m * 100 + "%", u = b / g * 100 + "%") : "em" === v ? (T = K(t, "borderLeft", 1, "em"), c = x / T + "em", u = b / T + "em") : (c = x + "px", u = b + "px"), y && (p = parseFloat(c) + f + v, h = parseFloat(u) + f + v)), s = vt(E, w[l], c + " " + u, p + " " + h, !1, "0px", s);
                return s
            }, prefix: !0, formatter: pt("0px 0px 0px 0px", !1, !0)
        }), xt("backgroundPosition", {
            defaultValue: "0 0", parser: function (t, e, r, i, o, s) {
                var a, l, h, u, c, p, d = "background-position", f = n || q(t, null),
                    g = this.format((f ? m ? f.getPropertyValue(d + "-x") + " " + f.getPropertyValue(d + "-y") : f.getPropertyValue(d) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                    v = this.format(e);
                if (-1 !== g.indexOf("%") != (-1 !== v.indexOf("%")) && (p = Z(t, "backgroundImage").replace(M, "")) && "none" !== p) {
                    for (a = g.split(" "), l = v.split(" "), U.setAttribute("src", p), h = 2; --h > -1;) g = a[h], (u = -1 !== g.indexOf("%")) !== (-1 !== l[h].indexOf("%")) && (c = 0 === h ? t.offsetWidth - U.width : t.offsetHeight - U.height, a[h] = u ? parseFloat(g) / 100 * c + "px" : parseFloat(g) / c * 100 + "%");
                    g = a.join(" ")
                }
                return this.parseComplex(t.style, g, v, o, s)
            }, formatter: it
        }), xt("backgroundSize", {defaultValue: "0 0", formatter: it}), xt("perspective", {
            defaultValue: "0px", prefix: !0
        }), xt("perspectiveOrigin", {
            defaultValue: "50% 50%", prefix: !0
        }), xt("transformStyle", {prefix: !0}), xt("backfaceVisibility", {prefix: !0}), xt("userSelect", {prefix: !0}), xt("margin", {parser: dt("marginTop,marginRight,marginBottom,marginLeft")}), xt("padding", {parser: dt("paddingTop,paddingRight,paddingBottom,paddingLeft")}), xt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)", parser: function (t, e, r, i, o, s) {
                var a, l, h;
                return 9 > m ? (l = t.currentStyle, h = 8 > m ? " " : ",", a = "rect(" + l.clipTop + h + l.clipRight + h + l.clipBottom + h + l.clipLeft + ")", e = this.format(e).split(",").join(h)) : (a = this.format(Z(t, this.p, n, !1, this.dflt)), e = this.format(e)), this.parseComplex(t.style, a, e, o, s)
            }
        }), xt("textShadow", {
            defaultValue: "0px 0px 0px #999", color: !0, multi: !0
        }), xt("autoRound,strictUnits", {
            parser: function (t, e, r, i, n) {
                return n
            }
        }), xt("border", {
            defaultValue: "0px solid #000", parser: function (t, e, r, i, o, s) {
                return this.parseComplex(t.style, this.format(Z(t, "borderTopWidth", n, !1, "0px") + " " + Z(t, "borderTopStyle", n, !1, "solid") + " " + Z(t, "borderTopColor", n, !1, "#000")), this.format(e), o, s)
            }, color: !0, formatter: function (t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(ct) || ["#000"])[0]
            }
        }), xt("borderWidth", {parser: dt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")}), xt("float,cssFloat,styleFloat", {
            parser: function (t, e, r, i, n) {
                var o = t.style, s = "cssFloat" in o ? "cssFloat" : "styleFloat";
                return new mt(o, s, 0, 0, n, -1, r, !1, 0, o[s], e)
            }
        });
        var Ut = function (t) {
            var e, r = this.t, i = r.filter || Z(this.data, "filter") || "", n = 0 | this.s + this.c * t;
            100 === n && (-1 === i.indexOf("atrix(") && -1 === i.indexOf("radient(") && -1 === i.indexOf("oader(") ? (r.removeAttribute("filter"), e = !Z(this.data, "filter")) : (r.filter = i.replace(w, ""), e = !0)), e || (this.xn1 && (r.filter = i = i || "alpha(opacity=" + n + ")"), -1 === i.indexOf("pacity") ? 0 === n && this.xn1 || (r.filter = i + " alpha(opacity=" + n + ")") : r.filter = i.replace(b, "opacity=" + n))
        };
        xt("opacity,alpha,autoAlpha", {
            defaultValue: "1", parser: function (t, e, r, i, o, s) {
                var a = parseFloat(Z(t, "opacity", n, !1, "1")), l = t.style, h = "autoAlpha" === r;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), h && 1 === a && "hidden" === Z(t, "visibility", n) && 0 !== e && (a = 0), j ? o = new mt(l, "opacity", a, e - a, o) : (o = new mt(l, "opacity", 100 * a, 100 * (e - a), o), o.xn1 = h ? 1 : 0, l.zoom = 1, o.type = 2, o.b = "alpha(opacity=" + o.s + ")", o.e = "alpha(opacity=" + (o.s + o.c) + ")", o.data = t, o.plugin = s, o.setRatio = Ut), h && (o = new mt(l, "visibility", 0, 0, o, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit"), o.xs0 = "inherit", i._overwriteProps.push(o.n), i._overwriteProps.push(r)), o
            }
        });
        var Xt = function (t, e) {
            e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(S, "-$1").toLowerCase())) : t.removeAttribute(e))
        }, Yt = function (t) {
            if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                this.t.setAttribute("class", 0 === t ? this.b : this.e);
                for (var e = this.data, r = this.t.style; e;) e.v ? r[e.p] = e.v : Xt(r, e.p), e = e._next;
                1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        xt("className", {
            parser: function (t, e, i, o, s, a, l) {
                var h, u, c, p, d, f = t.getAttribute("class") || "", m = t.style.cssText;
                if (s = o._classNamePT = new mt(t, i, 0, 0, s, 2), s.setRatio = Yt, s.pr = -11, r = !0, s.b = f, u = J(t, n), c = t._gsClassPT) {
                    for (p = {}, d = c.data; d;) p[d.p] = 1, d = d._next;
                    c.setRatio(1)
                }
                return t._gsClassPT = s, s.e = "=" !== e.charAt(1) ? e : f.replace(RegExp("\\s*\\b" + e.substr(2) + "\\b"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", s.e), h = $(t, u, J(t), l, p), t.setAttribute("class", f), s.data = h.firstMPT, t.style.cssText = m, s = s.xfirst = o.parse(t, h.difs, s, a)
            }
        });
        var jt = function (t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, r, i, n, o, s = this.t.style, a = l.transform.parse;
                if ("all" === this.e) s.cssText = "", n = !0; else for (e = this.e.split(" ").join("").split(","), i = e.length; --i > -1;) r = e[i], l[r] && (l[r].parse === a ? n = !0 : r = "transformOrigin" === r ? St : l[r].p), Xt(s, r);
                n && (Xt(s, wt), (o = this.t._gsTransform) && (o.svg && this.t.removeAttribute("data-svg-origin"), delete this.t._gsTransform))
            }
        };
        for (xt("clearProps", {
            parser: function (t, e, i, n, o) {
                return o = new mt(t, i, 0, 0, o, 2), o.setRatio = jt, o.e = e, o.pr = -10, o.data = n._tween, r = !0, o
            }
        }), h = "bezier,throwProps,physicsProps,physics2D".split(","), _t = h.length; _t--;) !function (t) {
            if (!l[t]) {
                var e = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                xt(t, {
                    parser: function (t, r, i, n, o, s, h) {
                        var u = a.com.greensock.plugins[e];
                        return u ? (u._cssRegister(), l[i].parse(t, r, i, n, o, s, h)) : (W("Error: " + e + " js file not loaded."), o)
                    }
                })
            }
        }(h[_t]);
        (h = s.prototype)._firstPT = h._lastParsedTransform = h._transform = null, h._onInitTween = function (t, e, a) {
            if (!t.nodeType) return !1;
            this._target = t, this._tween = a, this._vars = e, u = e.autoRound, r = !1, i = e.suffixMap || s.suffixMap, n = q(t, ""), o = this._overwriteProps;
            var h, d, m, g, v, _, y, x, b, w = t.style;
            if (c && "" === w.zIndex && ("auto" === (h = Z(t, "zIndex", n)) || "" === h) && this._addLazySet(w, "zIndex", 0), "string" == typeof e && (g = w.cssText, h = J(t, n), w.cssText = g + ";" + e, h = $(t, h, J(t)).difs, !j && T.test(e) && (h.opacity = parseFloat(RegExp.$1)), e = h, w.cssText = g), this._firstPT = d = e.className ? l.className.parse(t, e.className, "className", this, null, null, e) : this.parse(t, e, null), this._transformType) {
                for (b = 3 === this._transformType, wt ? p && (c = !0, "" === w.zIndex && ("auto" === (y = Z(t, "zIndex", n)) || "" === y) && this._addLazySet(w, "zIndex", 0), f && this._addLazySet(w, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : w.zoom = 1, m = d; m && m._next;) m = m._next;
                x = new mt(t, "transform", 0, 0, null, 2), this._linkCSSP(x, null, m), x.setRatio = wt ? Nt : Bt, x.data = this._transform || kt(t, n, !0), x.tween = a, x.pr = -1, o.pop()
            }
            if (r) {
                for (; d;) {
                    for (_ = d._next, m = g; m && m.pr > d.pr;) m = m._next;
                    (d._prev = m ? m._prev : v) ? d._prev._next = d : g = d, (d._next = m) ? m._prev = d : v = d, d = _
                }
                this._firstPT = g
            }
            return !0
        }, h.parse = function (t, e, r, o) {
            var s, a, h, c, p, d, f, m, g, v, _ = t.style;
            for (s in e) d = e[s], (a = l[s]) ? r = a.parse(t, d, s, this, r, o, e) : (p = Z(t, s, n) + "", g = "string" == typeof d, "color" === s || "fill" === s || "stroke" === s || -1 !== s.indexOf("Color") || g && E.test(d) ? (g || (d = ht(d), d = (d.length > 3 ? "rgba(" : "rgb(") + d.join(",") + ")"), r = vt(_, s, p, d, !0, "transparent", r, 0, o)) : !g || -1 === d.indexOf(" ") && -1 === d.indexOf(",") ? (h = parseFloat(p), f = h || 0 === h ? p.substr((h + "").length) : "", ("" === p || "auto" === p) && ("width" === s || "height" === s ? (h = rt(t, s, n), f = "px") : "left" === s || "top" === s ? (h = Q(t, s, n), f = "px") : (h = "opacity" !== s ? 0 : 1, f = "")), (v = g && "=" === d.charAt(1)) ? (c = parseInt(d.charAt(0) + "1", 10), d = d.substr(2), c *= parseFloat(d), m = d.replace(x, "")) : (c = parseFloat(d), m = g ? d.replace(x, "") : ""), "" === m && (m = s in i ? i[s] : f), d = c || 0 === c ? (v ? c + h : c) + m : e[s], f !== m && "" !== m && (c || 0 === c) && h && (h = K(t, s, h, f), "%" === m ? (h /= K(t, s, 100, "%") / 100, !0 !== e.strictUnits && (p = h + "%")) : "em" === m || "rem" === m ? h /= K(t, s, 1, m) : "px" !== m && (c = K(t, s, c, m), m = "px"), v && (c || 0 === c) && (d = c + h + m)), v && (c += h), !h && 0 !== h || !c && 0 !== c ? void 0 !== _[s] && (d || "NaN" != d + "" && null != d) ? (r = new mt(_, s, c || h || 0, 0, r, -1, s, !1, 0, p, d), r.xs0 = "none" !== d || "display" !== s && -1 === s.indexOf("Style") ? d : p) : W("invalid " + s + " tween value: " + e[s]) : (r = new mt(_, s, h, c - h, r, 0, s, !1 !== u && ("px" === m || "zIndex" === s), 0, p, d), r.xs0 = m)) : r = vt(_, s, p, d, !0, null, r, 0, o)), o && r && !r.plugin && (r.plugin = o);
            return r
        }, h.setRatio = function (t) {
            var e, r, i, n = this._firstPT;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time) if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime) for (; n;) {
                if (e = n.c * t + n.s, n.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), n.type) if (1 === n.type) if (2 === (i = n.l)) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2; else if (3 === i) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3; else if (4 === i) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4; else if (5 === i) n.t[n.p] = n.xs0 + e + n.xs1 + n.xn1 + n.xs2 + n.xn2 + n.xs3 + n.xn3 + n.xs4 + n.xn4 + n.xs5; else {
                    for (r = n.xs0 + e + n.xs1, i = 1; n.l > i; i++) r += n["xn" + i] + n["xs" + (i + 1)];
                    n.t[n.p] = r
                } else -1 === n.type ? n.t[n.p] = n.xs0 : n.setRatio && n.setRatio(t); else n.t[n.p] = e + n.xs0;
                n = n._next
            } else for (; n;) 2 !== n.type ? n.t[n.p] = n.b : n.setRatio(t), n = n._next; else for (; n;) {
                if (2 !== n.type) if (n.r && -1 !== n.type) if (e = Math.round(n.s + n.c), n.type) {
                    if (1 === n.type) {
                        for (i = n.l, r = n.xs0 + e + n.xs1, i = 1; n.l > i; i++) r += n["xn" + i] + n["xs" + (i + 1)];
                        n.t[n.p] = r
                    }
                } else n.t[n.p] = e + n.xs0; else n.t[n.p] = n.e; else n.setRatio(t);
                n = n._next
            }
        }, h._enableTransforms = function (t) {
            this._transform = this._transform || kt(this._target, n, !0), this._transformType = this._transform.svg && bt || !t && 3 !== this._transformType ? 2 : 3
        };
        var Vt = function () {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        h._addLazySet = function (t, e, r) {
            var i = this._firstPT = new mt(t, e, 0, 0, this._firstPT, 2);
            i.e = r, i.setRatio = Vt, i.data = this
        }, h._linkCSSP = function (t, e, r, i) {
            return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, i = !0), r ? r._next = t : i || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = r), t
        }, h._kill = function (e) {
            var r, i, n, o = e;
            if (e.autoAlpha || e.alpha) {
                o = {};
                for (i in e) o[i] = e[i];
                o.opacity = 1, o.autoAlpha && (o.visibility = 1)
            }
            return e.className && (r = this._classNamePT) && ((n = r.xfirst) && n._prev ? this._linkCSSP(n._prev, r._next, n._prev._prev) : n === this._firstPT && (this._firstPT = r._next), r._next && this._linkCSSP(r._next, r._next._next, n._prev), this._classNamePT = null), t.prototype._kill.call(this, o)
        };
        var Wt = function (t, e, r) {
            var i, n, o, s;
            if (t.slice) for (n = t.length; --n > -1;) Wt(t[n], e, r); else for (i = t.childNodes, n = i.length; --n > -1;) o = i[n], s = o.type, o.style && (e.push(J(o)), r && r.push(o)), 1 !== s && 9 !== s && 11 !== s || !o.childNodes.length || Wt(o, e, r)
        };
        return s.cascadeTo = function (t, r, i) {
            var n, o, s, a, l = e.to(t, r, i), h = [l], u = [], c = [], p = [], d = e._internals.reservedProps;
            for (t = l._targets || l.target, Wt(t, u, p), l.render(r, !0, !0), Wt(t, c), l.render(0, !0, !0), l._enabled(!0), n = p.length; --n > -1;) if ((o = $(p[n], u[n], c[n])).firstMPT) {
                o = o.difs;
                for (s in i) d[s] && (o[s] = i[s]);
                a = {};
                for (s in o) a[s] = u[n][s];
                h.push(e.fromTo(p[n], r, a, o))
            }
            return h
        }, t.activate([s]), s
    }, !0), function () {
        var t = function (t) {
            for (; t;) t.f || t.blob || (t.r = 1), t = t._next
        }, e = _gsScope._gsDefine.plugin({
            propName: "roundProps", version: "1.5", priority: -1, API: 2, init: function (t, e, r) {
                return this._tween = r, !0
            }
        }).prototype;
        e._onInitAllProps = function () {
            for (var e, r, i, n = this._tween, o = n.vars.roundProps.join ? n.vars.roundProps : n.vars.roundProps.split(","), s = o.length, a = {}, l = n._propLookup.roundProps; --s > -1;) a[o[s]] = 1;
            for (s = o.length; --s > -1;) for (e = o[s], r = n._firstPT; r;) i = r._next, r.pg ? r.t._roundProps(a, !0) : r.n === e && (2 === r.f && r.t ? t(r.t._firstPT) : (this._add(r.t, e, r.s, r.c), i && (i._prev = r._prev), r._prev ? r._prev._next = i : n._firstPT === r && (n._firstPT = i), r._next = r._prev = null, n._propLookup[e] = l)), r = i;
            return !1
        }, e._add = function (t, e, r, i) {
            this._addTween(t, e, r, r + i, e, !0), this._overwriteProps.push(e)
        }
    }(), _gsScope._gsDefine.plugin({
        propName: "attr", API: 2, version: "0.5.0", init: function (t, e) {
            var r;
            if ("function" != typeof t.setAttribute) return !1;
            for (r in e) this._addTween(t, "setAttribute", t.getAttribute(r) + "", e[r] + "", r, !1, r), this._overwriteProps.push(r);
            return !0
        }
    }), _gsScope._gsDefine.plugin({
        propName: "directionalRotation", version: "0.2.1", API: 2, init: function (t, e) {
            "object" != typeof e && (e = {rotation: e}), this.finals = {};
            var r, i, n, o, s, a, l = !0 === e.useRadians ? 2 * Math.PI : 360;
            for (r in e) "useRadians" !== r && (a = (e[r] + "").split("_"), i = a[0], n = parseFloat("function" != typeof t[r] ? t[r] : t[r.indexOf("set") || "function" != typeof t["get" + r.substr(3)] ? r : "get" + r.substr(3)]()), o = this.finals[r] = "string" == typeof i && "=" === i.charAt(1) ? n + parseInt(i.charAt(0) + "1", 10) * Number(i.substr(2)) : Number(i) || 0, s = o - n, a.length && (-1 !== (i = a.join("_")).indexOf("short") && (s %= l) != s % (l / 2) && (s = 0 > s ? s + l : s - l), -1 !== i.indexOf("_cw") && 0 > s ? s = (s + 9999999999 * l) % l - (0 | s / l) * l : -1 !== i.indexOf("ccw") && s > 0 && (s = (s - 9999999999 * l) % l - (0 | s / l) * l)), (s > 1e-6 || -1e-6 > s) && (this._addTween(t, r, n, n + s, r), this._overwriteProps.push(r)));
            return !0
        }, set: function (t) {
            var e;
            if (1 !== t) this._super.setRatio.call(this, t); else for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
        }
    })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (t) {
        var e, r, i, n = _gsScope.GreenSockGlobals || _gsScope, o = n.com.greensock, s = 2 * Math.PI, a = Math.PI / 2,
            l = o._class, h = function (e, r) {
                var i = l("easing." + e, function () {
                }, !0), n = i.prototype = new t;
                return n.constructor = i, n.getRatio = r, i
            }, u = t.register || function () {
            }, c = function (t, e, r, i) {
                var n = l("easing." + t, {easeOut: new e, easeIn: new r, easeInOut: new i}, !0);
                return u(n, t), n
            }, p = function (t, e, r) {
                this.t = t, this.v = e, r && (this.next = r, r.prev = this, this.c = r.v - e, this.gap = r.t - t)
            }, d = function (e, r) {
                var i = l("easing." + e, function (t) {
                    this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                }, !0), n = i.prototype = new t;
                return n.constructor = i, n.getRatio = r, n.config = function (t) {
                    return new i(t)
                }, i
            }, f = c("Back", d("BackOut", function (t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), d("BackIn", function (t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), d("BackInOut", function (t) {
                return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })), m = l("easing.SlowMo", function (t, e, r) {
                e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === r
            }, !0), g = m.prototype = new t;
        return g.constructor = m, g.getRatio = function (t) {
            var e = t + (.5 - t) * this._p;
            return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, m.ease = new m(.7, .7), g.config = m.config = function (t, e, r) {
            return new m(t, e, r)
        }, e = l("easing.SteppedEase", function (t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
        }, !0), g = e.prototype = new t, g.constructor = e, g.getRatio = function (t) {
            return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, g.config = e.config = function (t) {
            return new e(t)
        }, r = l("easing.RoughEase", function (e) {
            for (var r, i, n, o, s, a, l = (e = e || {}).taper || "none", h = [], u = 0, c = 0 | (e.points || 20), d = c, f = !1 !== e.randomize, m = !0 === e.clamp, g = e.template instanceof t ? e.template : null, v = "number" == typeof e.strength ? .4 * e.strength : .4; --d > -1;) r = f ? Math.random() : 1 / c * d, i = g ? g.getRatio(r) : r, "none" === l ? n = v : "out" === l ? (o = 1 - r, n = o * o * v) : "in" === l ? n = r * r * v : .5 > r ? (o = 2 * r, n = .5 * o * o * v) : (o = 2 * (1 - r), n = .5 * o * o * v), f ? i += Math.random() * n - .5 * n : d % 2 ? i += .5 * n : i -= .5 * n, m && (i > 1 ? i = 1 : 0 > i && (i = 0)), h[u++] = {
                x: r, y: i
            };
            for (h.sort(function (t, e) {
                return t.x - e.x
            }), a = new p(1, 1, null), d = c; --d > -1;) s = h[d], a = new p(s.x, s.y, a);
            this._prev = new p(0, 0, 0 !== a.t ? a : a.next)
        }, !0), g = r.prototype = new t, g.constructor = r, g.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;) e = e.next;
                e = e.prev
            } else for (; e.prev && e.t >= t;) e = e.prev;
            return this._prev = e, e.v + (t - e.t) / e.gap * e.c
        }, g.config = function (t) {
            return new r(t)
        }, r.ease = new r, c("Bounce", h("BounceOut", function (t) {
            return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), h("BounceIn", function (t) {
            return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), h("BounceInOut", function (t) {
            var e = .5 > t;
            return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), c("Circ", h("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), h("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), h("CircInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), i = function (e, r, i) {
            var n = l("easing." + e, function (t, e) {
                this._p1 = t >= 1 ? t : 1, this._p2 = (e || i) / (1 > t ? t : 1), this._p3 = this._p2 / s * (Math.asin(1 / this._p1) || 0), this._p2 = s / this._p2
            }, !0), o = n.prototype = new t;
            return o.constructor = n, o.getRatio = r, o.config = function (t, e) {
                return new n(t, e)
            }, n
        }, c("Elastic", i("ElasticOut", function (t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
        }, .3), i("ElasticIn", function (t) {
            return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
        }, .3), i("ElasticInOut", function (t) {
            return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) + 1
        }, .45)), c("Expo", h("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t)
        }), h("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), h("ExpoInOut", function (t) {
            return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), c("Sine", h("SineOut", function (t) {
            return Math.sin(t * a)
        }), h("SineIn", function (t) {
            return 1 - Math.cos(t * a)
        }), h("SineInOut", function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), l("easing.EaseLookup", {
            find: function (e) {
                return t.map[e]
            }
        }, !0), u(n.SlowMo, "SlowMo", "ease,"), u(r, "RoughEase", "ease,"), u(e, "SteppedEase", "ease,"), f
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (t, e) {
    "use strict";
    var r = t.GreenSockGlobals = t.GreenSockGlobals || t;
    if (!r.TweenLite) {
        var i, n, o, s, a, l = function (t) {
            var e, i = t.split("."), n = r;
            for (e = 0; i.length > e; e++) n[i[e]] = n = n[i[e]] || {};
            return n
        }, h = l("com.greensock"), u = 1e-10, c = function (t) {
            var e, r = [], i = t.length;
            for (e = 0; e !== i; r.push(t[e++])) ;
            return r
        }, p = function () {
        }, d = function () {
            var t = Object.prototype.toString, e = t.call([]);
            return function (r) {
                return null != r && (r instanceof Array || "object" == typeof r && !!r.push && t.call(r) === e)
            }
        }(), f = {}, m = function (e, i, n, o) {
            this.sc = f[e] ? f[e].sc : [], f[e] = this, this.gsClass = null, this.func = n;
            var s = [];
            this.check = function (a) {
                for (var h, u, c, p, d, g = i.length, v = g; --g > -1;) (h = f[i[g]] || new m(i[g], [])).gsClass ? (s[g] = h.gsClass, v--) : a && h.sc.push(this);
                if (0 === v && n) for (u = ("com.greensock." + e).split("."), c = u.pop(), p = l(u.join("."))[c] = this.gsClass = n.apply(n, s), o && (r[c] = p, !(d = "undefined" != typeof module && module.exports) && "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + e.split(".").pop(), [], function () {
                    return p
                }) : "TweenMax" === e && d && (module.exports = p)), g = 0; this.sc.length > g; g++) this.sc[g].check()
            }, this.check(!0)
        }, g = t._gsDefine = function (t, e, r, i) {
            return new m(t, e, r, i)
        }, v = h._class = function (t, e, r) {
            return e = e || function () {
            }, g(t, [], function () {
                return e
            }, r), e
        };
        g.globals = r;
        var _ = [0, 0, 1, 1], y = [], x = v("easing.Ease", function (t, e, r, i) {
            this._func = t, this._type = r || 0, this._power = i || 0, this._params = e ? _.concat(e) : _
        }, !0), b = x.map = {}, T = x.register = function (t, e, r, i) {
            for (var n, o, s, a, l = e.split(","), u = l.length, c = (r || "easeIn,easeOut,easeInOut").split(","); --u > -1;) for (o = l[u], n = i ? v("easing." + o, null, !0) : h.easing[o] || {}, s = c.length; --s > -1;) a = c[s], b[o + "." + a] = b[a + o] = n[a] = t.getRatio ? t : t[a] || new t
        };
        for ((o = x.prototype)._calcEnd = !1, o.getRatio = function (t) {
            if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
            var e = this._type, r = this._power, i = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
            return 1 === r ? i *= i : 2 === r ? i *= i * i : 3 === r ? i *= i * i * i : 4 === r && (i *= i * i * i * i), 1 === e ? 1 - i : 2 === e ? i : .5 > t ? i / 2 : 1 - i / 2
        }, n = (i = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; --n > -1;) o = i[n] + ",Power" + n, T(new x(null, null, 1, n), o, "easeOut", !0), T(new x(null, null, 2, n), o, "easeIn" + (0 === n ? ",easeNone" : "")), T(new x(null, null, 3, n), o, "easeInOut");
        b.linear = h.easing.Linear.easeIn, b.swing = h.easing.Quad.easeInOut;
        var w = v("events.EventDispatcher", function (t) {
            this._listeners = {}, this._eventTarget = t || this
        });
        (o = w.prototype).addEventListener = function (t, e, r, i, n) {
            n = n || 0;
            var o, l, h = this._listeners[t], u = 0;
            for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) (o = h[l]).c === e && o.s === r ? h.splice(l, 1) : 0 === u && n > o.pr && (u = l + 1);
            h.splice(u, 0, {c: e, s: r, up: i, pr: n}), this !== s || a || s.wake()
        }, o.removeEventListener = function (t, e) {
            var r, i = this._listeners[t];
            if (i) for (r = i.length; --r > -1;) if (i[r].c === e) return void i.splice(r, 1)
        }, o.dispatchEvent = function (t) {
            var e, r, i, n = this._listeners[t];
            if (n) for (e = n.length, r = this._eventTarget; --e > -1;) (i = n[e]) && (i.up ? i.c.call(i.s || r, {
                type: t, target: r
            }) : i.c.call(i.s || r))
        };
        var E = t.requestAnimationFrame, S = t.cancelAnimationFrame, A = Date.now || function () {
            return (new Date).getTime()
        }, M = A();
        for (n = (i = ["ms", "moz", "webkit", "o"]).length; --n > -1 && !E;) E = t[i[n] + "RequestAnimationFrame"], S = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"];
        v("Ticker", function (t, e) {
            var r, i, n, o, l, h = this, c = A(), d = !1 !== e && E, f = 500, m = 33, g = function (t) {
                var e, s, a = A() - M;
                a > f && (c += a - m), M += a, h.time = (M - c) / 1e3, e = h.time - l, (!r || e > 0 || !0 === t) && (h.frame++, l += e + (e >= o ? .004 : o - e), s = !0), !0 !== t && (n = i(g)), s && h.dispatchEvent("tick")
            };
            w.call(h), h.time = h.frame = 0, h.tick = function () {
                g(!0)
            }, h.lagSmoothing = function (t, e) {
                f = t || 1 / u, m = Math.min(e, f, 0)
            }, h.sleep = function () {
                null != n && (d && S ? S(n) : clearTimeout(n), i = p, n = null, h === s && (a = !1))
            }, h.wake = function () {
                null !== n ? h.sleep() : h.frame > 10 && (M = A() - f + 5), i = 0 === r ? p : d && E ? E : function (t) {
                    return setTimeout(t, 0 | 1e3 * (l - h.time) + 1)
                }, h === s && (a = !0), g(2)
            }, h.fps = function (t) {
                return arguments.length ? (r = t, o = 1 / (r || 60), l = this.time + o, void h.wake()) : r
            }, h.useRAF = function (t) {
                return arguments.length ? (h.sleep(), d = t, void h.fps(r)) : d
            }, h.fps(t), setTimeout(function () {
                d && 5 > h.frame && h.useRAF(!1)
            }, 1500)
        }), (o = h.Ticker.prototype = new h.events.EventDispatcher).constructor = h.Ticker;
        var C = v("core.Animation", function (t, e) {
            if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, H) {
                a || s.wake();
                var r = this.vars.useFrames ? z : H;
                r.add(this, r._time), this.vars.paused && this.paused(!0)
            }
        });
        s = C.ticker = new h.Ticker, (o = C.prototype)._dirty = o._gc = o._initted = o._paused = !1, o._totalTime = o._time = 0, o._rawPrevTime = -1, o._next = o._last = o._onUpdate = o._timeline = o.timeline = null, o._paused = !1;
        var R = function () {
            a && A() - M > 2e3 && s.wake(), setTimeout(R, 2e3)
        };
        R(), o.play = function (t, e) {
            return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, o.pause = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!0)
        }, o.resume = function (t, e) {
            return null != t && this.seek(t, e), this.paused(!1)
        }, o.seek = function (t, e) {
            return this.totalTime(Number(t), !1 !== e)
        }, o.restart = function (t, e) {
            return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
        }, o.reverse = function (t, e) {
            return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, o.render = function () {
        }, o.invalidate = function () {
            return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
        }, o.isActive = function () {
            var t, e = this._timeline, r = this._startTime;
            return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= r && r + this.totalDuration() / this._timeScale > t
        }, o._enabled = function (t, e) {
            return a || s.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
        }, o._kill = function () {
            return this._enabled(!1, !1)
        }, o.kill = function (t, e) {
            return this._kill(t, e), this
        }, o._uncache = function (t) {
            for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
            return this
        }, o._swapSelfInParams = function (t) {
            for (var e = t.length, r = t.concat(); --e > -1;) "{self}" === t[e] && (r[e] = this);
            return r
        }, o._callback = function (t) {
            var e = this.vars;
            e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || y)
        }, o.eventCallback = function (t, e, r, i) {
            if ("on" === (t || "").substr(0, 2)) {
                var n = this.vars;
                if (1 === arguments.length) return n[t];
                null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = d(r) && -1 !== r.join("").indexOf("{self}") ? this._swapSelfInParams(r) : r, n[t + "Scope"] = i), "onUpdate" === t && (this._onUpdate = e)
            }
            return this
        }, o.delay = function (t) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
        }, o.duration = function (t) {
            return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
        }, o.totalDuration = function (t) {
            return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
        }, o.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
        }, o.totalTime = function (t, e, r) {
            if (a || s.wake(), !arguments.length) return this._totalTime;
            if (this._timeline) {
                if (0 > t && !r && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var i = this._totalDuration, n = this._timeline;
                    if (t > i && !r && (t = i), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? i - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline) for (; n._timeline;) n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline
                }
                this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (F.length && Z(), this.render(t, e, !1), F.length && Z())
            }
            return this
        }, o.progress = o.totalProgress = function (t, e) {
            var r = this.duration();
            return arguments.length ? this.totalTime(r * t, e) : r ? this._time / r : this.ratio
        }, o.startTime = function (t) {
            return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
        }, o.endTime = function (t) {
            return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
        }, o.timeScale = function (t) {
            if (!arguments.length) return this._timeScale;
            if (t = t || u, this._timeline && this._timeline.smoothChildTiming) {
                var e = this._pauseTime, r = e || 0 === e ? e : this._timeline.totalTime();
                this._startTime = r - (r - this._startTime) * this._timeScale / t
            }
            return this._timeScale = t, this._uncache(!1)
        }, o.reversed = function (t) {
            return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
        }, o.paused = function (t) {
            if (!arguments.length) return this._paused;
            var e, r, i = this._timeline;
            return t != this._paused && i && (a || t || s.wake(), e = i.rawTime(), r = e - this._pauseTime, !t && i.smoothChildTiming && (this._startTime += r, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== r && this._initted && this.duration() && (e = i.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
        };
        var P = v("core.SimpleTimeline", function (t) {
            C.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        (o = P.prototype = new C).constructor = P, o.kill()._gc = !1, o._first = o._last = o._recent = null, o._sortChildren = !1, o.add = o.insert = function (t, e) {
            var r, i;
            if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren) for (i = t._startTime; r && r._startTime > i;) r = r._prev;
            return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
        }, o._remove = function (t, e) {
            return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
        }, o.render = function (t, e, r) {
            var i, n = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = t; n;) i = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, r) : n.render((t - n._startTime) * n._timeScale, e, r)), n = i
        }, o.rawTime = function () {
            return a || s.wake(), this._totalTime
        };
        var O = v("TweenLite", function (e, r, i) {
            if (C.call(this, r, i), this.render = O.prototype.render, null == e) throw"Cannot tween a null target.";
            this.target = e = "string" != typeof e ? e : O.selector(e) || e;
            var n, o, s,
                a = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                l = this.vars.overwrite;
            if (this._overwrite = l = null == l ? G[O.defaultOverwrite] : "number" == typeof l ? l >> 0 : G[l], (a || e instanceof Array || e.push && d(e)) && "number" != typeof e[0]) for (this._targets = s = c(e), this._propLookup = [], this._siblings = [], n = 0; s.length > n; n++) (o = s[n]) ? "string" != typeof o ? o.length && o !== t && o[0] && (o[0] === t || o[0].nodeType && o[0].style && !o.nodeType) ? (s.splice(n--, 1), this._targets = s = s.concat(c(o))) : (this._siblings[n] = K(o, this, !1), 1 === l && this._siblings[n].length > 1 && J(o, this, null, 1, this._siblings[n])) : "string" == typeof(o = s[n--] = O.selector(o)) && s.splice(n + 1, 1) : s.splice(n--, 1); else this._propLookup = {}, this._siblings = K(e, this, !1), 1 === l && this._siblings.length > 1 && J(e, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === r && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -u, this.render(-this._delay))
        }, !0), D = function (e) {
            return e && e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType)
        }, I = function (t, e) {
            var r, i = {};
            for (r in t) W[r] || r in e && "transform" !== r && "x" !== r && "y" !== r && "width" !== r && "height" !== r && "className" !== r && "border" !== r || !(!Y[r] || Y[r] && Y[r]._autoCSS) || (i[r] = t[r], delete t[r]);
            t.css = i
        };
        (o = O.prototype = new C).constructor = O, o.kill()._gc = !1, o.ratio = 0, o._firstPT = o._targets = o._overwrittenProps = o._startAt = null, o._notifyPluginsOfEnabled = o._lazy = !1, O.version = "1.18.0", O.defaultEase = o._ease = new x(null, null, 1, 1), O.defaultOverwrite = "auto", O.ticker = s, O.autoSleep = 120, O.lagSmoothing = function (t, e) {
            s.lagSmoothing(t, e)
        }, O.selector = t.$ || t.jQuery || function (e) {
            var r = t.$ || t.jQuery;
            return r ? (O.selector = r, r(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e)
        };
        var F = [], L = {}, k = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, B = function (t) {
                for (var e, r = this._firstPT; r;) e = r.blob ? t ? this.join("") : this.start : r.c * t + r.s, r.r ? e = Math.round(e) : 1e-6 > e && e > -1e-6 && (e = 0), r.f ? r.fp ? r.t[r.p](r.fp, e) : r.t[r.p](e) : r.t[r.p] = e, r = r._next
            }, N = function (t, e, r, i) {
                var n, o, s, a, l, h, u, c = [t, e], p = 0, d = "", f = 0;
                for (c.start = t, r && (r(c), t = c[0], e = c[1]), c.length = 0, n = t.match(k) || [], o = e.match(k) || [], i && (i._next = null, i.blob = 1, c._firstPT = i), l = o.length, a = 0; l > a; a++) u = o[a], h = e.substr(p, e.indexOf(u, p) - p), d += h || !a ? h : ",", p += h.length, f ? f = (f + 1) % 5 : "rgba(" === h.substr(-5) && (f = 1), u === n[a] || a >= n.length ? d += u : (d && (c.push(d), d = ""), s = parseFloat(n[a]), c.push(s), c._firstPT = {
                    _next: c._firstPT, t: c, p: c.length - 1, s: s,
                    c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - s) || 0,
                    f: 0, r: f && 4 > f
                }), p += u.length;
                return (d += e.substr(p)) && c.push(d), c.setRatio = B, c
            }, U = function (t, e, r, i, n, o, s, a) {
                var l, h, u = "get" === r ? t[e] : r, c = typeof t[e], p = "string" == typeof i && "=" === i.charAt(1),
                    d = {
                        t: t, p: e, s: u, f: "function" === c, pg: 0, n: n || e, r: o, pr: 0,
                        c: p ? parseInt(i.charAt(0) + "1", 10) * parseFloat(i.substr(2)) : parseFloat(i) - u || 0
                    };
                return "number" !== c && ("function" === c && "get" === r && (h = e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), d.s = u = s ? t[h](s) : t[h]()), "string" == typeof u && (s || isNaN(u)) ? (d.fp = s, l = N(u, i, a || O.defaultStringFilter, d), d = {
                    t: l, p: "setRatio", s: 0, c: 1, f: 2, pg: 0, n: n || e, pr: 0
                }) : p || (d.c = parseFloat(i) - parseFloat(u) || 0)), d.c ? ((d._next = this._firstPT) && (d._next._prev = d), this._firstPT = d, d) : void 0
            }, X = O._internals = {isArray: d, isSelector: D, lazyTweens: F, blobDif: N}, Y = O._plugins = {},
            j = X.tweenLookup = {}, V = 0, W = X.reservedProps = {
                ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1,
                runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1,
                onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1,
                onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1,
                data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1, onOverwrite: 1, callbackScope: 1, stringFilter: 1
            }, G = {none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, true: 1, false: 0},
            z = C._rootFramesTimeline = new P, H = C._rootTimeline = new P, q = 30, Z = X.lazyRender = function () {
                var t, e = F.length;
                for (L = {}; --e > -1;) (t = F[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                F.length = 0
            };
        H._startTime = s.time, z._startTime = s.frame, H._active = z._active = !0, setTimeout(Z, 1), C._updateRoot = O.render = function () {
            var t, e, r;
            if (F.length && Z(), H.render((s.time - H._startTime) * H._timeScale, !1, !1), z.render((s.frame - z._startTime) * z._timeScale, !1, !1), F.length && Z(), s.frame >= q) {
                q = s.frame + (parseInt(O.autoSleep, 10) || 120);
                for (r in j) {
                    for (t = (e = j[r].tweens).length; --t > -1;) e[t]._gc && e.splice(t, 1);
                    0 === e.length && delete j[r]
                }
                if ((!(r = H._first) || r._paused) && O.autoSleep && !z._first && 1 === s._listeners.tick.length) {
                    for (; r && r._paused;) r = r._next;
                    r || s.sleep()
                }
            }
        }, s.addEventListener("tick", C._updateRoot);
        var K = function (t, e, r) {
            var i, n, o = t._gsTweenID;
            if (j[o || (t._gsTweenID = o = "t" + V++)] || (j[o] = {
                target: t, tweens: []
            }), e && (i = j[o].tweens, i[n = i.length] = e, r)) for (; --n > -1;) i[n] === e && i.splice(n, 1);
            return j[o].tweens
        }, Q = function (t, e, r, i) {
            var n, o, s = t.vars.onOverwrite;
            return s && (n = s(t, e, r, i)), (s = O.onOverwrite) && (o = s(t, e, r, i)), !1 !== n && !1 !== o
        }, J = function (t, e, r, i, n) {
            var o, s, a, l;
            if (1 === i || i >= 4) {
                for (l = n.length, o = 0; l > o; o++) if ((a = n[o]) !== e) a._gc || a._kill(null, t, e) && (s = !0); else if (5 === i) break;
                return s
            }
            var h, c = e._startTime + u, p = [], d = 0, f = 0 === e._duration;
            for (o = n.length; --o > -1;) (a = n[o]) === e || a._gc || a._paused || (a._timeline !== e._timeline ? (h = h || $(e, 0, f), 0 === $(a, h, f) && (p[d++] = a)) : c >= a._startTime && a._startTime + a.totalDuration() / a._timeScale > c && ((f || !a._initted) && 2e-10 >= c - a._startTime || (p[d++] = a)));
            for (o = d; --o > -1;) if (a = p[o], 2 === i && a._kill(r, t, e) && (s = !0), 2 !== i || !a._firstPT && a._initted) {
                if (2 !== i && !Q(a, e)) continue;
                a._enabled(!1, !1) && (s = !0)
            }
            return s
        }, $ = function (t, e, r) {
            for (var i = t._timeline, n = i._timeScale, o = t._startTime; i._timeline;) {
                if (o += i._startTime, n *= i._timeScale, i._paused) return -100;
                i = i._timeline
            }
            return (o /= n) > e ? o - e : r && o === e || !t._initted && 2 * u > o - e ? u : (o += t.totalDuration() / t._timeScale / n) > e + u ? 0 : o - e - u
        };
        o._init = function () {
            var t, e, r, i, n, o = this.vars, s = this._overwrittenProps, a = this._duration, l = !!o.immediateRender,
                h = o.ease;
            if (o.startAt) {
                this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};
                for (i in o.startAt) n[i] = o.startAt[i];
                if (n.overwrite = !1, n.immediateRender = !0, n.lazy = l && !1 !== o.lazy, n.startAt = n.delay = null, this._startAt = O.to(this.target, 0, n), l) if (this._time > 0) this._startAt = null; else if (0 !== a) return
            } else if (o.runBackwards && 0 !== a) if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null; else {
                0 !== this._time && (l = !1), r = {};
                for (i in o) W[i] && "autoCSS" !== i || (r[i] = o[i]);
                if (r.overwrite = 0, r.data = "isFromStart", r.lazy = l && !1 !== o.lazy, r.immediateRender = l, this._startAt = O.to(this.target, 0, r), l) {
                    if (0 === this._time) return
                } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
            }
            if (this._ease = h = h ? h instanceof x ? h : "function" == typeof h ? new x(h, o.easeParams) : b[h] || O.defaultEase : O.defaultEase, o.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, o.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets) for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], s ? s[t] : null) && (e = !0); else e = this._initProps(this.target, this._propLookup, this._siblings, s);
            if (e && O._onPluginEvent("_onInitAllProps", this), s && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), o.runBackwards) for (r = this._firstPT; r;) r.s += r.c, r.c = -r.c, r = r._next;
            this._onUpdate = o.onUpdate, this._initted = !0
        }, o._initProps = function (e, r, i, n) {
            var o, s, a, l, h, u;
            if (null == e) return !1;
            L[e._gsTweenID] && Z(), this.vars.css || e.style && e !== t && e.nodeType && Y.css && !1 !== this.vars.autoCSS && I(this.vars, e);
            for (o in this.vars) if (u = this.vars[o], W[o]) u && (u instanceof Array || u.push && d(u)) && -1 !== u.join("").indexOf("{self}") && (this.vars[o] = u = this._swapSelfInParams(u, this)); else if (Y[o] && (l = new Y[o])._onInitTween(e, this.vars[o], this)) {
                for (this._firstPT = h = {
                    _next: this._firstPT, t: l, p: "setRatio", s: 0, c: 1, f: 1, n: o, pg: 1, pr: l._priority
                }, s = l._overwriteProps.length; --s > -1;) r[l._overwriteProps[s]] = this._firstPT;
                (l._priority || l._onInitAllProps) && (a = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0), h._next && (h._next._prev = h)
            } else r[o] = U.call(this, e, o, "get", u, o, 0, null, this.vars.stringFilter);
            return n && this._kill(n, e) ? this._initProps(e, r, i, n) : this._overwrite > 1 && this._firstPT && i.length > 1 && J(e, this, r, this._overwrite, i) ? (this._kill(r, e), this._initProps(e, r, i, n)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (L[e._gsTweenID] = !0), a)
        }, o.render = function (t, e, r) {
            var i, n, o, s, a = this._time, l = this._duration, h = this._rawPrevTime;
            if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (i = !0, n = "onComplete", r = r || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || r) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > h || h === u && "isPause" !== this.data) && h !== t && (r = !0, h > u && (n = "onReverseComplete")), this._rawPrevTime = s = !e || t || h === t ? t : u); else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== a || 0 === l && h > 0) && (n = "onReverseComplete", i = this._reversed), 0 > t && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || r) && (h >= 0 && (h !== u || "isPause" !== this.data) && (r = !0), this._rawPrevTime = s = !e || t || h === t ? t : u)), this._initted || (r = !0); else if (this._totalTime = this._time = t, this._easeType) {
                var c = t / l, p = this._easeType, d = this._easePower;
                (1 === p || 3 === p && c >= .5) && (c = 1 - c), 3 === p && (c *= 2), 1 === d ? c *= c : 2 === d ? c *= c * c : 3 === d ? c *= c * c * c : 4 === d && (c *= c * c * c * c), this.ratio = 1 === p ? 1 - c : 2 === p ? c : .5 > t / l ? c / 2 : 1 - c / 2
            } else this.ratio = this._ease.getRatio(t / l);
            if (this._time !== a || r) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!r && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = a, this._rawPrevTime = h, F.push(this), void(this._lazy = [t, e]);
                    this._time && !i ? this.ratio = this._ease.getRatio(this._time / l) : i && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== a && t >= 0 && (this._active = !0), 0 === a && (this._startAt && (t >= 0 ? this._startAt.render(t, e, r) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), o = this._firstPT; o;) o.f ? o.t[o.p](o.c * this.ratio + o.s) : o.t[o.p] = o.c * this.ratio + o.s, o = o._next;
                this._onUpdate && (0 > t && this._startAt && -1e-4 !== t && this._startAt.render(t, e, r), e || (this._time !== a || i) && this._callback("onUpdate")), n && (!this._gc || r) && (0 > t && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, e, r), i && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this._callback(n), 0 === l && this._rawPrevTime === u && s !== u && (this._rawPrevTime = 0))
            }
        }, o._kill = function (t, e, r) {
            if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
            e = "string" != typeof e ? e || this._targets || this.target : O.selector(e) || e;
            var i, n, o, s, a, l, h, u, c,
                p = r && this._time && r._startTime === this._startTime && this._timeline === r._timeline;
            if ((d(e) || D(e)) && "number" != typeof e[0]) for (i = e.length; --i > -1;) this._kill(t, e[i], r) && (l = !0); else {
                if (this._targets) {
                    for (i = this._targets.length; --i > -1;) if (e === this._targets[i]) {
                        a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], n = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all";
                        break
                    }
                } else {
                    if (e !== this.target) return !1;
                    a = this._propLookup, n = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                }
                if (a) {
                    if (h = t || a, u = t !== n && "all" !== n && t !== a && ("object" != typeof t || !t._tempKill), r && (O.onOverwrite || this.vars.onOverwrite)) {
                        for (o in h) a[o] && (c || (c = []), c.push(o));
                        if ((c || !t) && !Q(this, r, e, c)) return !1
                    }
                    for (o in h) (s = a[o]) && (p && (s.f ? s.t[s.p](s.s) : s.t[s.p] = s.s, l = !0), s.pg && s.t._kill(h) && (l = !0), s.pg && 0 !== s.t._overwriteProps.length || (s._prev ? s._prev._next = s._next : s === this._firstPT && (this._firstPT = s._next), s._next && (s._next._prev = s._prev), s._next = s._prev = null), delete a[o]), u && (n[o] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return l
        }, o.invalidate = function () {
            return this._notifyPluginsOfEnabled && O._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -u, this.render(-this._delay)), this
        }, o._enabled = function (t, e) {
            if (a || s.wake(), t && this._gc) {
                var r, i = this._targets;
                if (i) for (r = i.length; --r > -1;) this._siblings[r] = K(i[r], this, !0); else this._siblings = K(this.target, this, !0)
            }
            return C.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && O._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
        }, O.to = function (t, e, r) {
            return new O(t, e, r)
        }, O.from = function (t, e, r) {
            return r.runBackwards = !0, r.immediateRender = 0 != r.immediateRender, new O(t, e, r)
        }, O.fromTo = function (t, e, r, i) {
            return i.startAt = r, i.immediateRender = 0 != i.immediateRender && 0 != r.immediateRender, new O(t, e, i)
        }, O.delayedCall = function (t, e, r, i, n) {
            return new O(e, 0, {
                delay: t, onComplete: e, onCompleteParams: r, callbackScope: i, onReverseComplete: e,
                onReverseCompleteParams: r, immediateRender: !1, lazy: !1, useFrames: n, overwrite: 0
            })
        }, O.set = function (t, e) {
            return new O(t, 0, e)
        }, O.getTweensOf = function (t, e) {
            if (null == t) return [];
            t = "string" != typeof t ? t : O.selector(t) || t;
            var r, i, n, o;
            if ((d(t) || D(t)) && "number" != typeof t[0]) {
                for (r = t.length, i = []; --r > -1;) i = i.concat(O.getTweensOf(t[r], e));
                for (r = i.length; --r > -1;) for (o = i[r], n = r; --n > -1;) o === i[n] && i.splice(r, 1)
            } else for (i = K(t).concat(), r = i.length; --r > -1;) (i[r]._gc || e && !i[r].isActive()) && i.splice(r, 1);
            return i
        }, O.killTweensOf = O.killDelayedCallsTo = function (t, e, r) {
            "object" == typeof e && (r = e, e = !1);
            for (var i = O.getTweensOf(t, e), n = i.length; --n > -1;) i[n]._kill(r, t)
        };
        var tt = v("plugins.TweenPlugin", function (t, e) {
            this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = tt.prototype
        }, !0);
        if (o = tt.prototype, tt.version = "1.18.0", tt.API = 2, o._firstPT = null, o._addTween = U, o.setRatio = B, o._kill = function (t) {
            var e, r = this._overwriteProps, i = this._firstPT;
            if (null != t[this._propName]) this._overwriteProps = []; else for (e = r.length; --e > -1;) null != t[r[e]] && r.splice(e, 1);
            for (; i;) null != t[i.n] && (i._next && (i._next._prev = i._prev), i._prev ? (i._prev._next = i._next, i._prev = null) : this._firstPT === i && (this._firstPT = i._next)), i = i._next;
            return !1
        }, o._roundProps = function (t, e) {
            for (var r = this._firstPT; r;) (t[this._propName] || null != r.n && t[r.n.split(this._propName + "_").join("")]) && (r.r = e), r = r._next
        }, O._onPluginEvent = function (t, e) {
            var r, i, n, o, s, a = e._firstPT;
            if ("_onInitAllProps" === t) {
                for (; a;) {
                    for (s = a._next, i = n; i && i.pr > a.pr;) i = i._next;
                    (a._prev = i ? i._prev : o) ? a._prev._next = a : n = a, (a._next = i) ? i._prev = a : o = a, a = s
                }
                a = e._firstPT = n
            }
            for (; a;) a.pg && "function" == typeof a.t[t] && a.t[t]() && (r = !0), a = a._next;
            return r
        }, tt.activate = function (t) {
            for (var e = t.length; --e > -1;) t[e].API === tt.API && (Y[(new t[e])._propName] = t[e]);
            return !0
        }, g.plugin = function (t) {
            if (!(t && t.propName && t.init && t.API)) throw"illegal plugin definition.";
            var e, r = t.propName, i = t.priority || 0, n = t.overwriteProps, o = {
                init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps"
            }, s = v("plugins." + r.charAt(0).toUpperCase() + r.substr(1) + "Plugin", function () {
                tt.call(this, r, i), this._overwriteProps = n || []
            }, !0 === t.global), a = s.prototype = new tt(r);
            a.constructor = s, s.API = t.API;
            for (e in o) "function" == typeof t[e] && (a[o[e]] = t[e]);
            return s.version = t.version, tt.activate([s]), s
        }, i = t._gsQueue) {
            for (n = 0; i.length > n; n++) i[n]();
            for (o in f) f[o].func || t.console.log("GSAP encountered missing dependency: com.greensock." + o)
        }
        a = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window), function () {
    "use strict";
    var t = function () {
        this.init()
    };
    t.prototype = {
        init: function () {
            var t = this || e;
            return t._counter = 0, t._codecs = {}, t._howls = [], t._muted = !1, t._volume = 1, t._canPlayEvent = "canplaythrough", t._navigator = "undefined" != typeof window && window.navigator ? window.navigator : null, t.masterGain = null, t.noAudio = !1, t.usingWebAudio = !0, t.autoSuspend = !0, t.ctx = null, t.mobileAutoEnable = !0, t._setup(), t
        }, volume: function (t) {
            var r = this || e;
            if (t = parseFloat(t), r.ctx || h(), void 0 !== t && t >= 0 && t <= 1) {
                if (r._volume = t, r._muted) return r;
                r.usingWebAudio && (r.masterGain.gain.value = t);
                for (var i = 0; i < r._howls.length; i++) if (!r._howls[i]._webAudio) for (var n = r._howls[i]._getSoundIds(), o = 0; o < n.length; o++) {
                    var s = r._howls[i]._soundById(n[o]);
                    s && s._node && (s._node.volume = s._volume * t)
                }
                return r
            }
            return r._volume
        }, mute: function (t) {
            var r = this || e;
            r.ctx || h(), r._muted = t, r.usingWebAudio && (r.masterGain.gain.value = t ? 0 : r._volume);
            for (var i = 0; i < r._howls.length; i++) if (!r._howls[i]._webAudio) for (var n = r._howls[i]._getSoundIds(), o = 0; o < n.length; o++) {
                var s = r._howls[i]._soundById(n[o]);
                s && s._node && (s._node.muted = !!t || s._muted)
            }
            return r
        }, unload: function () {
            for (var t = this || e, r = t._howls.length - 1; r >= 0; r--) t._howls[r].unload();
            return t.usingWebAudio && t.ctx && void 0 !== t.ctx.close && (t.ctx.close(), t.ctx = null, h()), t
        }, codecs: function (t) {
            return (this || e)._codecs[t.replace(/^x-/, "")]
        }, _setup: function () {
            var t = this || e;
            if (t.state = t.ctx ? t.ctx.state || "running" : "running", t._autoSuspend(), !t.usingWebAudio) if ("undefined" != typeof Audio) try {
                void 0 === (r = new Audio).oncanplaythrough && (t._canPlayEvent = "canplay")
            } catch (e) {
                t.noAudio = !0
            } else t.noAudio = !0;
            try {
                var r = new Audio;
                r.muted && (t.noAudio = !0)
            } catch (t) {
            }
            return t.noAudio || t._setupCodecs(), t
        }, _setupCodecs: function () {
            var t = this || e, r = null;
            try {
                r = "undefined" != typeof Audio ? new Audio : null
            } catch (e) {
                return t
            }
            if (!r || "function" != typeof r.canPlayType) return t;
            var i = r.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                n = t._navigator && t._navigator.userAgent.match(/OPR\/([0-6].)/g),
                o = n && parseInt(n[0].split("/")[1], 10) < 33;
            return t._codecs = {
                mp3: !(o || !i && !r.canPlayType("audio/mp3;").replace(/^no$/, "")), mpeg: !!i,
                opus: !!r.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                ogg: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                oga: !!r.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                wav: !!r.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                aac: !!r.canPlayType("audio/aac;").replace(/^no$/, ""),
                caf: !!r.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                m4a: !!(r.canPlayType("audio/x-m4a;") || r.canPlayType("audio/m4a;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                mp4: !!(r.canPlayType("audio/x-mp4;") || r.canPlayType("audio/mp4;") || r.canPlayType("audio/aac;")).replace(/^no$/, ""),
                weba: !!r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                webm: !!r.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                dolby: !!r.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                flac: !!(r.canPlayType("audio/x-flac;") || r.canPlayType("audio/flac;")).replace(/^no$/, "")
            }, t
        }, _enableMobileAudio: function () {
            var t = this || e,
                r = /iPhone|iPad|iPod|Android|BlackBerry|BB10|Silk|Mobi/i.test(t._navigator && t._navigator.userAgent),
                i = !!("ontouchend" in window || t._navigator && t._navigator.maxTouchPoints > 0 || t._navigator && t._navigator.msMaxTouchPoints > 0);
            if (!t._mobileEnabled && t.ctx && (r || i)) {
                t._mobileEnabled = !1, t._mobileUnloaded || 44100 === t.ctx.sampleRate || (t._mobileUnloaded = !0, t.unload()), t._scratchBuffer = t.ctx.createBuffer(1, 1, 22050);
                var n = function () {
                    var e = t.ctx.createBufferSource();
                    e.buffer = t._scratchBuffer, e.connect(t.ctx.destination), void 0 === e.start ? e.noteOn(0) : e.start(0), e.onended = function () {
                        e.disconnect(0), t._mobileEnabled = !0, t.mobileAutoEnable = !1, document.removeEventListener("touchend", n, !0)
                    }
                };
                return document.addEventListener("touchend", n, !0), t
            }
        }, _autoSuspend: function () {
            var t = this;
            if (t.autoSuspend && t.ctx && void 0 !== t.ctx.suspend && e.usingWebAudio) {
                for (var r = 0; r < t._howls.length; r++) if (t._howls[r]._webAudio) for (var i = 0; i < t._howls[r]._sounds.length; i++) if (!t._howls[r]._sounds[i]._paused) return t;
                return t._suspendTimer && clearTimeout(t._suspendTimer), t._suspendTimer = setTimeout(function () {
                    t.autoSuspend && (t._suspendTimer = null, t.state = "suspending", t.ctx.suspend().then(function () {
                        t.state = "suspended", t._resumeAfterSuspend && (delete t._resumeAfterSuspend, t._autoResume())
                    }))
                }, 3e4), t
            }
        }, _autoResume: function () {
            var t = this;
            if (t.ctx && void 0 !== t.ctx.resume && e.usingWebAudio) return "running" === t.state && t._suspendTimer ? (clearTimeout(t._suspendTimer), t._suspendTimer = null) : "suspended" === t.state ? (t.state = "resuming", t.ctx.resume().then(function () {
                t.state = "running";
                for (var e = 0; e < t._howls.length; e++) t._howls[e]._emit("resume")
            }), t._suspendTimer && (clearTimeout(t._suspendTimer), t._suspendTimer = null)) : "suspending" === t.state && (t._resumeAfterSuspend = !0), t
        }
    };
    var e = new t, r = function (t) {
        var e = this;
        t.src && 0 !== t.src.length ? e.init(t) : console.error("An array of source files must be passed with any new Howl.")
    };
    r.prototype = {
        init: function (t) {
            var r = this;
            return e.ctx || h(), r._autoplay = t.autoplay || !1, r._format = "string" != typeof t.format ? t.format : [t.format], r._html5 = t.html5 || !1, r._muted = t.mute || !1, r._loop = t.loop || !1, r._pool = t.pool || 5, r._preload = "boolean" != typeof t.preload || t.preload, r._rate = t.rate || 1, r._sprite = t.sprite || {}, r._src = "string" != typeof t.src ? t.src : [t.src], r._volume = void 0 !== t.volume ? t.volume : 1, r._duration = 0, r._state = "unloaded", r._sounds = [], r._endTimers = {}, r._queue = [], r._onend = t.onend ? [{fn: t.onend}] : [], r._onfade = t.onfade ? [{fn: t.onfade}] : [], r._onload = t.onload ? [{fn: t.onload}] : [], r._onloaderror = t.onloaderror ? [{fn: t.onloaderror}] : [], r._onpause = t.onpause ? [{fn: t.onpause}] : [], r._onplay = t.onplay ? [{fn: t.onplay}] : [], r._onstop = t.onstop ? [{fn: t.onstop}] : [], r._onmute = t.onmute ? [{fn: t.onmute}] : [], r._onvolume = t.onvolume ? [{fn: t.onvolume}] : [], r._onrate = t.onrate ? [{fn: t.onrate}] : [], r._onseek = t.onseek ? [{fn: t.onseek}] : [], r._onresume = [], r._webAudio = e.usingWebAudio && !r._html5, void 0 !== e.ctx && e.ctx && e.mobileAutoEnable && e._enableMobileAudio(), e._howls.push(r), r._autoplay && r._queue.push({
                event: "play", action: function () {
                    r.play()
                }
            }), r._preload && r.load(), r
        }, load: function () {
            var t = this, r = null;
            {
                if (!e.noAudio) {
                    "string" == typeof t._src && (t._src = [t._src]);
                    for (var n = 0; n < t._src.length; n++) {
                        var s, a;
                        if (t._format && t._format[n]) s = t._format[n]; else {
                            if ("string" != typeof(a = t._src[n])) {
                                t._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                                continue
                            }
                            (s = /^data:audio\/([^;,]+);/i.exec(a)) || (s = /\.([^.]+)$/.exec(a.split("?", 1)[0])), s && (s = s[1].toLowerCase())
                        }
                        if (s || console.warn('No file extension was found. Consider using the "format" property or specify an extension.'), s && e.codecs(s)) {
                            r = t._src[n];
                            break
                        }
                    }
                    return r ? (t._src = r, t._state = "loading", "https:" === window.location.protocol && "http:" === r.slice(0, 5) && (t._html5 = !0, t._webAudio = !1), new i(t), t._webAudio && o(t), t) : void t._emit("loaderror", null, "No codec support for selected audio sources.")
                }
                t._emit("loaderror", null, "No audio support.")
            }
        }, play: function (t, r) {
            var i = this, n = null;
            if ("number" == typeof t) n = t, t = null; else {
                if ("string" == typeof t && "loaded" === i._state && !i._sprite[t]) return null;
                if (void 0 === t) {
                    t = "__default";
                    for (var o = 0, s = 0; s < i._sounds.length; s++) i._sounds[s]._paused && !i._sounds[s]._ended && (o++, n = i._sounds[s]._id);
                    1 === o ? t = null : n = null
                }
            }
            var a = n ? i._soundById(n) : i._inactiveSound();
            if (!a) return null;
            if (n && !t && (t = a._sprite || "__default"), "loaded" !== i._state && !i._sprite[t]) return i._queue.push({
                event: "play", action: function () {
                    i.play(i._soundById(a._id) ? a._id : void 0)
                }
            }), a._id;
            if (n && !a._paused) return r || setTimeout(function () {
                i._emit("play", a._id)
            }, 0), a._id;
            i._webAudio && e._autoResume();
            var l = Math.max(0, a._seek > 0 ? a._seek : i._sprite[t][0] / 1e3),
                h = Math.max(0, (i._sprite[t][0] + i._sprite[t][1]) / 1e3 - l), u = 1e3 * h / Math.abs(a._rate);
            a._paused = !1, a._ended = !1, a._sprite = t, a._seek = l, a._start = i._sprite[t][0] / 1e3, a._stop = (i._sprite[t][0] + i._sprite[t][1]) / 1e3, a._loop = !(!a._loop && !i._sprite[t][2]);
            var c = a._node;
            if (i._webAudio) {
                var p = function () {
                    i._refreshBuffer(a);
                    var t = a._muted || i._muted ? 0 : a._volume;
                    c.gain.setValueAtTime(t, e.ctx.currentTime), a._playStart = e.ctx.currentTime, void 0 === c.bufferSource.start ? a._loop ? c.bufferSource.noteGrainOn(0, l, 86400) : c.bufferSource.noteGrainOn(0, l, h) : a._loop ? c.bufferSource.start(0, l, 86400) : c.bufferSource.start(0, l, h), u !== 1 / 0 && (i._endTimers[a._id] = setTimeout(i._ended.bind(i, a), u)), r || setTimeout(function () {
                        i._emit("play", a._id)
                    }, 0)
                }, d = "running" === e.state;
                if ("loaded" === i._state && d) p(); else {
                    var f = d || "loaded" !== i._state ? "load" : "resume";
                    i.once(f, p, d ? a._id : null), i._clearTimer(a._id)
                }
            } else {
                var m = function () {
                    c.currentTime = l, c.muted = a._muted || i._muted || e._muted || c.muted, c.volume = a._volume * e.volume(), c.playbackRate = a._rate, c.play(), u !== 1 / 0 && (i._endTimers[a._id] = setTimeout(i._ended.bind(i, a), u)), r || i._emit("play", a._id)
                }, g = "loaded" === i._state && (window && window.ejecta || !c.readyState && e._navigator.isCocoonJS);
                if (4 === c.readyState || g) m(); else {
                    var v = function () {
                        m(), c.removeEventListener(e._canPlayEvent, v, !1)
                    };
                    c.addEventListener(e._canPlayEvent, v, !1), i._clearTimer(a._id)
                }
            }
            return a._id
        }, pause: function (t) {
            var e = this;
            if ("loaded" !== e._state) return e._queue.push({
                event: "pause", action: function () {
                    e.pause(t)
                }
            }), e;
            for (var r = e._getSoundIds(t), i = 0; i < r.length; i++) {
                e._clearTimer(r[i]);
                var n = e._soundById(r[i]);
                if (n && !n._paused && (n._seek = e.seek(r[i]), n._rateSeek = 0, n._paused = !0, e._stopFade(r[i]), n._node)) if (e._webAudio) {
                    if (!n._node.bufferSource) return e;
                    void 0 === n._node.bufferSource.stop ? n._node.bufferSource.noteOff(0) : n._node.bufferSource.stop(0), e._cleanBuffer(n._node)
                } else isNaN(n._node.duration) && n._node.duration !== 1 / 0 || n._node.pause();
                arguments[1] || e._emit("pause", n ? n._id : null)
            }
            return e
        }, stop: function (t, e) {
            var r = this;
            if ("loaded" !== r._state) return r._queue.push({
                event: "stop", action: function () {
                    r.stop(t)
                }
            }), r;
            for (var i = r._getSoundIds(t), n = 0; n < i.length; n++) {
                r._clearTimer(i[n]);
                var o = r._soundById(i[n]);
                if (o && (o._seek = o._start || 0, o._rateSeek = 0, o._paused = !0, o._ended = !0, r._stopFade(i[n]), o._node)) if (r._webAudio) {
                    if (!o._node.bufferSource) return e || r._emit("stop", o._id), r;
                    void 0 === o._node.bufferSource.stop ? o._node.bufferSource.noteOff(0) : o._node.bufferSource.stop(0), r._cleanBuffer(o._node)
                } else isNaN(o._node.duration) && o._node.duration !== 1 / 0 || (o._node.currentTime = o._start || 0, o._node.pause());
                o && !e && r._emit("stop", o._id)
            }
            return r
        }, mute: function (t, r) {
            var i = this;
            if ("loaded" !== i._state) return i._queue.push({
                event: "mute", action: function () {
                    i.mute(t, r)
                }
            }), i;
            if (void 0 === r) {
                if ("boolean" != typeof t) return i._muted;
                i._muted = t
            }
            for (var n = i._getSoundIds(r), o = 0; o < n.length; o++) {
                var s = i._soundById(n[o]);
                s && (s._muted = t, i._webAudio && s._node ? s._node.gain.setValueAtTime(t ? 0 : s._volume, e.ctx.currentTime) : s._node && (s._node.muted = !!e._muted || t), i._emit("mute", s._id))
            }
            return i
        }, volume: function () {
            var t, r, i = this, n = arguments;
            if (0 === n.length) return i._volume;
            1 === n.length || 2 === n.length && void 0 === n[1] ? i._getSoundIds().indexOf(n[0]) >= 0 ? r = parseInt(n[0], 10) : t = parseFloat(n[0]) : n.length >= 2 && (t = parseFloat(n[0]), r = parseInt(n[1], 10));
            var o;
            if (!(void 0 !== t && t >= 0 && t <= 1)) return (o = r ? i._soundById(r) : i._sounds[0]) ? o._volume : 0;
            if ("loaded" !== i._state) return i._queue.push({
                event: "volume", action: function () {
                    i.volume.apply(i, n)
                }
            }), i;
            void 0 === r && (i._volume = t), r = i._getSoundIds(r);
            for (var s = 0; s < r.length; s++) (o = i._soundById(r[s])) && (o._volume = t, n[2] || i._stopFade(r[s]), i._webAudio && o._node && !o._muted ? o._node.gain.setValueAtTime(t, e.ctx.currentTime) : o._node && !o._muted && (o._node.volume = t * e.volume()), i._emit("volume", o._id));
            return i
        }, fade: function (t, r, i, n) {
            var o = this, s = Math.abs(t - r), a = t > r ? "out" : "in", l = s / .01, h = l > 0 ? i / l : i;
            if (h < 4 && (l = Math.ceil(l / (4 / h)), h = 4), "loaded" !== o._state) return o._queue.push({
                event: "fade", action: function () {
                    o.fade(t, r, i, n)
                }
            }), o;
            o.volume(t, n);
            for (var u = o._getSoundIds(n), c = 0; c < u.length; c++) {
                var p = o._soundById(u[c]);
                if (p) {
                    if (n || o._stopFade(u[c]), o._webAudio && !p._muted) {
                        var d = e.ctx.currentTime, f = d + i / 1e3;
                        p._volume = t, p._node.gain.setValueAtTime(t, d), p._node.gain.linearRampToValueAtTime(r, f)
                    }
                    var m = t;
                    p._interval = setInterval(function (e, i) {
                        l > 0 && (m += "in" === a ? .01 : -.01), m = Math.max(0, m), m = Math.min(1, m), m = Math.round(100 * m) / 100, o._webAudio ? (void 0 === n && (o._volume = m), i._volume = m) : o.volume(m, e, !0), (r < t && m <= r || r > t && m >= r) && (clearInterval(i._interval), i._interval = null, o.volume(r, e), o._emit("fade", e))
                    }.bind(o, u[c], p), h)
                }
            }
            return o
        }, _stopFade: function (t) {
            var r = this, i = r._soundById(t);
            return i && i._interval && (r._webAudio && i._node.gain.cancelScheduledValues(e.ctx.currentTime), clearInterval(i._interval), i._interval = null, r._emit("fade", t)), r
        }, loop: function () {
            var t, e, r, i = this, n = arguments;
            if (0 === n.length) return i._loop;
            if (1 === n.length) {
                if ("boolean" != typeof n[0]) return !!(r = i._soundById(parseInt(n[0], 10))) && r._loop;
                t = n[0], i._loop = t
            } else 2 === n.length && (t = n[0], e = parseInt(n[1], 10));
            for (var o = i._getSoundIds(e), s = 0; s < o.length; s++) (r = i._soundById(o[s])) && (r._loop = t, i._webAudio && r._node && r._node.bufferSource && (r._node.bufferSource.loop = t, t && (r._node.bufferSource.loopStart = r._start || 0, r._node.bufferSource.loopEnd = r._stop)));
            return i
        }, rate: function () {
            var t, r, i = this, n = arguments;
            0 === n.length ? r = i._sounds[0]._id : 1 === n.length ? i._getSoundIds().indexOf(n[0]) >= 0 ? r = parseInt(n[0], 10) : t = parseFloat(n[0]) : 2 === n.length && (t = parseFloat(n[0]), r = parseInt(n[1], 10));
            var o;
            if ("number" != typeof t) return (o = i._soundById(r)) ? o._rate : i._rate;
            if ("loaded" !== i._state) return i._queue.push({
                event: "rate", action: function () {
                    i.rate.apply(i, n)
                }
            }), i;
            void 0 === r && (i._rate = t), r = i._getSoundIds(r);
            for (var s = 0; s < r.length; s++) if (o = i._soundById(r[s])) {
                o._rateSeek = i.seek(r[s]), o._playStart = i._webAudio ? e.ctx.currentTime : o._playStart, o._rate = t, i._webAudio && o._node && o._node.bufferSource ? o._node.bufferSource.playbackRate.value = t : o._node && (o._node.playbackRate = t);
                var a = i.seek(r[s]),
                    l = 1e3 * ((i._sprite[o._sprite][0] + i._sprite[o._sprite][1]) / 1e3 - a) / Math.abs(o._rate);
                !i._endTimers[r[s]] && o._paused || (i._clearTimer(r[s]), i._endTimers[r[s]] = setTimeout(i._ended.bind(i, o), l)), i._emit("rate", o._id)
            }
            return i
        }, seek: function () {
            var t, r, i = this, n = arguments;
            if (0 === n.length ? r = i._sounds[0]._id : 1 === n.length ? i._getSoundIds().indexOf(n[0]) >= 0 ? r = parseInt(n[0], 10) : (r = i._sounds[0]._id, t = parseFloat(n[0])) : 2 === n.length && (t = parseFloat(n[0]), r = parseInt(n[1], 10)), void 0 === r) return i;
            if ("loaded" !== i._state) return i._queue.push({
                event: "seek", action: function () {
                    i.seek.apply(i, n)
                }
            }), i;
            var o = i._soundById(r);
            if (o) {
                if (!("number" == typeof t && t >= 0)) {
                    if (i._webAudio) {
                        var s = i.playing(r) ? e.ctx.currentTime - o._playStart : 0,
                            a = o._rateSeek ? o._rateSeek - o._seek : 0;
                        return o._seek + (a + s * Math.abs(o._rate))
                    }
                    return o._node.currentTime
                }
                var l = i.playing(r);
                l && i.pause(r, !0), o._seek = t, o._ended = !1, i._clearTimer(r), l && i.play(r, !0), !i._webAudio && o._node && (o._node.currentTime = t), i._emit("seek", r)
            }
            return i
        }, playing: function (t) {
            var e = this;
            if ("number" == typeof t) {
                var r = e._soundById(t);
                return !!r && !r._paused
            }
            for (var i = 0; i < e._sounds.length; i++) if (!e._sounds[i]._paused) return !0;
            return !1
        }, duration: function (t) {
            var e = this, r = e._duration, i = e._soundById(t);
            return i && (r = e._sprite[i._sprite][1] / 1e3), r
        }, state: function () {
            return this._state
        }, unload: function () {
            for (var t = this, r = t._sounds, i = 0; i < r.length; i++) {
                r[i]._paused || t.stop(r[i]._id), t._webAudio || (r[i]._node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA", r[i]._node.removeEventListener("error", r[i]._errorFn, !1), r[i]._node.removeEventListener(e._canPlayEvent, r[i]._loadFn, !1)), delete r[i]._node, t._clearTimer(r[i]._id);
                var o = e._howls.indexOf(t);
                o >= 0 && e._howls.splice(o, 1)
            }
            var s = !0;
            for (i = 0; i < e._howls.length; i++) if (e._howls[i]._src === t._src) {
                s = !1;
                break
            }
            return n && s && delete n[t._src], e.noAudio = !1, t._state = "unloaded", t._sounds = [], t = null, null
        }, on: function (t, e, r, i) {
            var n = this, o = n["_on" + t];
            return "function" == typeof e && o.push(i ? {id: r, fn: e, once: i} : {id: r, fn: e}), n
        }, off: function (t, e, r) {
            var i = this, n = i["_on" + t], o = 0;
            if (e) {
                for (o = 0; o < n.length; o++) if (e === n[o].fn && r === n[o].id) {
                    n.splice(o, 1);
                    break
                }
            } else if (t) i["_on" + t] = []; else {
                var s = Object.keys(i);
                for (o = 0; o < s.length; o++) 0 === s[o].indexOf("_on") && Array.isArray(i[s[o]]) && (i[s[o]] = [])
            }
            return i
        }, once: function (t, e, r) {
            var i = this;
            return i.on(t, e, r, 1), i
        }, _emit: function (t, e, r) {
            for (var i = this, n = i["_on" + t], o = n.length - 1; o >= 0; o--) n[o].id && n[o].id !== e && "load" !== t || (setTimeout(function (t) {
                t.call(this, e, r)
            }.bind(i, n[o].fn), 0), n[o].once && i.off(t, n[o].fn, n[o].id));
            return i
        }, _loadQueue: function () {
            var t = this;
            if (t._queue.length > 0) {
                var e = t._queue[0];
                t.once(e.event, function () {
                    t._queue.shift(), t._loadQueue()
                }), e.action()
            }
            return t
        }, _ended: function (t) {
            var r = this, i = t._sprite, n = !(!t._loop && !r._sprite[i][2]);
            if (r._emit("end", t._id), !r._webAudio && n && r.stop(t._id, !0).play(t._id), r._webAudio && n) {
                r._emit("play", t._id), t._seek = t._start || 0, t._rateSeek = 0, t._playStart = e.ctx.currentTime;
                var o = 1e3 * (t._stop - t._start) / Math.abs(t._rate);
                r._endTimers[t._id] = setTimeout(r._ended.bind(r, t), o)
            }
            return r._webAudio && !n && (t._paused = !0, t._ended = !0, t._seek = t._start || 0, t._rateSeek = 0, r._clearTimer(t._id), r._cleanBuffer(t._node), e._autoSuspend()), r._webAudio || n || r.stop(t._id), r
        }, _clearTimer: function (t) {
            var e = this;
            return e._endTimers[t] && (clearTimeout(e._endTimers[t]), delete e._endTimers[t]), e
        }, _soundById: function (t) {
            for (var e = this, r = 0; r < e._sounds.length; r++) if (t === e._sounds[r]._id) return e._sounds[r];
            return null
        }, _inactiveSound: function () {
            var t = this;
            t._drain();
            for (var e = 0; e < t._sounds.length; e++) if (t._sounds[e]._ended) return t._sounds[e].reset();
            return new i(t)
        }, _drain: function () {
            var t = this, e = t._pool, r = 0, i = 0;
            if (!(t._sounds.length < e)) {
                for (i = 0; i < t._sounds.length; i++) t._sounds[i]._ended && r++;
                for (i = t._sounds.length - 1; i >= 0; i--) {
                    if (r <= e) return;
                    t._sounds[i]._ended && (t._webAudio && t._sounds[i]._node && t._sounds[i]._node.disconnect(0), t._sounds.splice(i, 1), r--)
                }
            }
        }, _getSoundIds: function (t) {
            var e = this;
            if (void 0 === t) {
                for (var r = [], i = 0; i < e._sounds.length; i++) r.push(e._sounds[i]._id);
                return r
            }
            return [t]
        }, _refreshBuffer: function (t) {
            var r = this;
            return t._node.bufferSource = e.ctx.createBufferSource(), t._node.bufferSource.buffer = n[r._src], t._panner ? t._node.bufferSource.connect(t._panner) : t._node.bufferSource.connect(t._node), t._node.bufferSource.loop = t._loop, t._loop && (t._node.bufferSource.loopStart = t._start || 0, t._node.bufferSource.loopEnd = t._stop), t._node.bufferSource.playbackRate.value = t._rate, r
        }, _cleanBuffer: function (t) {
            var e = this;
            if (e._scratchBuffer) {
                t.bufferSource.onended = null, t.bufferSource.disconnect(0);
                try {
                    t.bufferSource.buffer = e._scratchBuffer
                } catch (t) {
                }
            }
            return t.bufferSource = null, e
        }
    };
    var i = function (t) {
        this._parent = t, this.init()
    };
    i.prototype = {
        init: function () {
            var t = this, r = t._parent;
            return t._muted = r._muted, t._loop = r._loop, t._volume = r._volume, t._muted = r._muted, t._rate = r._rate, t._seek = 0, t._paused = !0, t._ended = !0, t._sprite = "__default", t._id = ++e._counter, r._sounds.push(t), t.create(), t
        }, create: function () {
            var t = this, r = t._parent, i = e._muted || t._muted || t._parent._muted ? 0 : t._volume;
            return r._webAudio ? (t._node = void 0 === e.ctx.createGain ? e.ctx.createGainNode() : e.ctx.createGain(), t._node.gain.setValueAtTime(i, e.ctx.currentTime), t._node.paused = !0, t._node.connect(e.masterGain)) : (t._node = new Audio, t._errorFn = t._errorListener.bind(t), t._node.addEventListener("error", t._errorFn, !1), t._loadFn = t._loadListener.bind(t), t._node.addEventListener(e._canPlayEvent, t._loadFn, !1), t._node.src = r._src, t._node.preload = "auto", t._node.volume = i * e.volume(), t._node.load()), t
        }, reset: function () {
            var t = this, r = t._parent;
            return t._muted = r._muted, t._loop = r._loop, t._volume = r._volume, t._muted = r._muted, t._rate = r._rate, t._seek = 0, t._rateSeek = 0, t._paused = !0, t._ended = !0, t._sprite = "__default", t._id = ++e._counter, t
        }, _errorListener: function () {
            var t = this;
            t._parent._emit("loaderror", t._id, t._node.error ? t._node.error.code : 0), t._node.removeEventListener("error", t._errorListener, !1)
        }, _loadListener: function () {
            var t = this, r = t._parent;
            r._duration = Math.ceil(10 * t._node.duration) / 10, 0 === Object.keys(r._sprite).length && (r._sprite = {__default: [0, 1e3 * r._duration]}), "loaded" !== r._state && (r._state = "loaded", r._emit("load"), r._loadQueue()), t._node.removeEventListener(e._canPlayEvent, t._loadFn, !1)
        }
    };
    var n = {}, o = function (t) {
        var e = t._src;
        if (n[e]) return t._duration = n[e].duration, void l(t);
        if (/^data:[^;]+;base64,/.test(e)) {
            for (var r = atob(e.split(",")[1]), i = new Uint8Array(r.length), o = 0; o < r.length; ++o) i[o] = r.charCodeAt(o);
            a(i.buffer, t)
        } else {
            var h = new XMLHttpRequest;
            h.open("GET", e, !0), h.responseType = "arraybuffer", h.onload = function () {
                var e = (h.status + "")[0];
                "0" === e || "2" === e || "3" === e ? a(h.response, t) : t._emit("loaderror", null, "Failed loading audio file with status: " + h.status + ".")
            }, h.onerror = function () {
                t._webAudio && (t._html5 = !0, t._webAudio = !1, t._sounds = [], delete n[e], t.load())
            }, s(h)
        }
    }, s = function (t) {
        try {
            t.send()
        } catch (e) {
            t.onerror()
        }
    }, a = function (t, r) {
        e.ctx.decodeAudioData(t, function (t) {
            t && r._sounds.length > 0 && (n[r._src] = t, l(r, t))
        }, function () {
            r._emit("loaderror", null, "Decoding audio data failed.")
        })
    }, l = function (t, e) {
        e && !t._duration && (t._duration = e.duration), 0 === Object.keys(t._sprite).length && (t._sprite = {__default: [0, 1e3 * t._duration]}), "loaded" !== t._state && (t._state = "loaded", t._emit("load"), t._loadQueue())
    }, h = function () {
        try {
            "undefined" != typeof AudioContext ? e.ctx = new AudioContext : "undefined" != typeof webkitAudioContext ? e.ctx = new webkitAudioContext : e.usingWebAudio = !1
        } catch (t) {
            e.usingWebAudio = !1
        }
        var t = /iP(hone|od|ad)/.test(e._navigator && e._navigator.platform),
            r = e._navigator && e._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
            i = r ? parseInt(r[1], 10) : null;
        if (t && i && i < 9) {
            var n = /safari/.test(e._navigator && e._navigator.userAgent.toLowerCase());
            (e._navigator && e._navigator.standalone && !n || e._navigator && !e._navigator.standalone && !n) && (e.usingWebAudio = !1)
        }
        e.usingWebAudio && (e.masterGain = void 0 === e.ctx.createGain ? e.ctx.createGainNode() : e.ctx.createGain(), e.masterGain.gain.value = 1, e.masterGain.connect(e.ctx.destination)), e._setup()
    };
    "function" == typeof define && define.amd && define([], function () {
        return {Howler: e, Howl: r}
    }), "undefined" != typeof exports && (exports.Howler = e, exports.Howl = r), "undefined" != typeof window ? (window.HowlerGlobal = t, window.Howler = e, window.Howl = r, window.Sound = i) : "undefined" != typeof global && (global.HowlerGlobal = t, global.Howler = e, global.Howl = r, global.Sound = i)
}(), function () {
    "use strict";
    HowlerGlobal.prototype._pos = [0, 0, 0], HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0], HowlerGlobal.prototype.stereo = function (t) {
        var e = this;
        if (!e.ctx || !e.ctx.listener) return e;
        for (var r = e._howls.length - 1; r >= 0; r--) e._howls[r].stereo(t);
        return e
    }, HowlerGlobal.prototype.pos = function (t, e, r) {
        var i = this;
        return i.ctx && i.ctx.listener ? (e = "number" != typeof e ? i._pos[1] : e, r = "number" != typeof r ? i._pos[2] : r, "number" != typeof t ? i._pos : (i._pos = [t, e, r], i.ctx.listener.setPosition(i._pos[0], i._pos[1], i._pos[2]), i)) : i
    }, HowlerGlobal.prototype.orientation = function (t, e, r, i, n, o) {
        var s = this;
        if (!s.ctx || !s.ctx.listener) return s;
        var a = s._orientation;
        return e = "number" != typeof e ? a[1] : e, r = "number" != typeof r ? a[2] : r, i = "number" != typeof i ? a[3] : i, n = "number" != typeof n ? a[4] : n, o = "number" != typeof o ? a[5] : o, "number" != typeof t ? a : (s._orientation = [t, e, r, i, n, o], s.ctx.listener.setOrientation(t, e, r, i, n, o), s)
    }, Howl.prototype.init = function (t) {
        return function (e) {
            var r = this;
            return r._orientation = e.orientation || [1, 0, 0], r._stereo = e.stereo || null, r._pos = e.pos || null, r._pannerAttr = {
                coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : 360,
                coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : 360,
                coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : 0,
                distanceModel: void 0 !== e.distanceModel ? e.distanceModel : "inverse",
                maxDistance: void 0 !== e.maxDistance ? e.maxDistance : 1e4,
                panningModel: void 0 !== e.panningModel ? e.panningModel : "HRTF",
                refDistance: void 0 !== e.refDistance ? e.refDistance : 1,
                rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : 1
            }, r._onstereo = e.onstereo ? [{fn: e.onstereo}] : [], r._onpos = e.onpos ? [{fn: e.onpos}] : [], r._onorientation = e.onorientation ? [{fn: e.onorientation}] : [], t.call(this, e)
        }
    }(Howl.prototype.init), Howl.prototype.stereo = function (e, r) {
        var i = this;
        if (!i._webAudio) return i;
        if ("loaded" !== i._state) return i._queue.push({
            event: "stereo", action: function () {
                i.stereo(e, r)
            }
        }), i;
        var n = void 0 === Howler.ctx.createStereoPanner ? "spatial" : "stereo";
        if (void 0 === r) {
            if ("number" != typeof e) return i._stereo;
            i._stereo = e, i._pos = [e, 0, 0]
        }
        for (var o = i._getSoundIds(r), s = 0; s < o.length; s++) {
            var a = i._soundById(o[s]);
            if (a) {
                if ("number" != typeof e) return a._stereo;
                a._stereo = e, a._pos = [e, 0, 0], a._node && (a._pannerAttr.panningModel = "equalpower", a._panner && a._panner.pan || t(a, n), "spatial" === n ? a._panner.setPosition(e, 0, 0) : a._panner.pan.value = e), i._emit("stereo", a._id)
            }
        }
        return i
    }, Howl.prototype.pos = function (e, r, i, n) {
        var o = this;
        if (!o._webAudio) return o;
        if ("loaded" !== o._state) return o._queue.push({
            event: "pos", action: function () {
                o.pos(e, r, i, n)
            }
        }), o;
        if (r = "number" != typeof r ? 0 : r, i = "number" != typeof i ? -.5 : i, void 0 === n) {
            if ("number" != typeof e) return o._pos;
            o._pos = [e, r, i]
        }
        for (var s = o._getSoundIds(n), a = 0; a < s.length; a++) {
            var l = o._soundById(s[a]);
            if (l) {
                if ("number" != typeof e) return l._pos;
                l._pos = [e, r, i], l._node && (l._panner && !l._panner.pan || t(l, "spatial"), l._panner.setPosition(e, r, i)), o._emit("pos", l._id)
            }
        }
        return o
    }, Howl.prototype.orientation = function (e, r, i, n) {
        var o = this;
        if (!o._webAudio) return o;
        if ("loaded" !== o._state) return o._queue.push({
            event: "orientation", action: function () {
                o.orientation(e, r, i, n)
            }
        }), o;
        if (r = "number" != typeof r ? o._orientation[1] : r, i = "number" != typeof i ? o._orientation[2] : i, void 0 === n) {
            if ("number" != typeof e) return o._orientation;
            o._orientation = [e, r, i]
        }
        for (var s = o._getSoundIds(n), a = 0; a < s.length; a++) {
            var l = o._soundById(s[a]);
            if (l) {
                if ("number" != typeof e) return l._orientation;
                l._orientation = [e, r, i], l._node && (l._panner || (l._pos || (l._pos = o._pos || [0, 0, -.5]), t(l, "spatial")), l._panner.setOrientation(e, r, i)), o._emit("orientation", l._id)
            }
        }
        return o
    }, Howl.prototype.pannerAttr = function () {
        var e, r, i, n = this, o = arguments;
        if (!n._webAudio) return n;
        if (0 === o.length) return n._pannerAttr;
        if (1 === o.length) {
            if ("object" != typeof o[0]) return (i = n._soundById(parseInt(o[0], 10))) ? i._pannerAttr : n._pannerAttr;
            e = o[0], void 0 === r && (n._pannerAttr = {
                coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : n._coneInnerAngle,
                coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : n._coneOuterAngle,
                coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : n._coneOuterGain,
                distanceModel: void 0 !== e.distanceModel ? e.distanceModel : n._distanceModel,
                maxDistance: void 0 !== e.maxDistance ? e.maxDistance : n._maxDistance,
                panningModel: void 0 !== e.panningModel ? e.panningModel : n._panningModel,
                refDistance: void 0 !== e.refDistance ? e.refDistance : n._refDistance,
                rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : n._rolloffFactor
            })
        } else 2 === o.length && (e = o[0], r = parseInt(o[1], 10));
        for (var s = n._getSoundIds(r), a = 0; a < s.length; a++) if (i = n._soundById(s[a])) {
            var l = i._pannerAttr;
            l = {
                coneInnerAngle: void 0 !== e.coneInnerAngle ? e.coneInnerAngle : l.coneInnerAngle,
                coneOuterAngle: void 0 !== e.coneOuterAngle ? e.coneOuterAngle : l.coneOuterAngle,
                coneOuterGain: void 0 !== e.coneOuterGain ? e.coneOuterGain : l.coneOuterGain,
                distanceModel: void 0 !== e.distanceModel ? e.distanceModel : l.distanceModel,
                maxDistance: void 0 !== e.maxDistance ? e.maxDistance : l.maxDistance,
                panningModel: void 0 !== e.panningModel ? e.panningModel : l.panningModel,
                refDistance: void 0 !== e.refDistance ? e.refDistance : l.refDistance,
                rolloffFactor: void 0 !== e.rolloffFactor ? e.rolloffFactor : l.rolloffFactor
            };
            var h = i._panner;
            h ? (h.coneInnerAngle = l.coneInnerAngle, h.coneOuterAngle = l.coneOuterAngle, h.coneOuterGain = l.coneOuterGain, h.distanceModel = l.distanceModel, h.maxDistance = l.maxDistance, h.panningModel = l.panningModel, h.refDistance = l.refDistance, h.rolloffFactor = l.rolloffFactor) : (i._pos || (i._pos = n._pos || [0, 0, -.5]), t(i, "spatial"))
        }
        return n
    }, Sound.prototype.init = function (t) {
        return function () {
            var e = this, r = e._parent;
            e._orientation = r._orientation, e._stereo = r._stereo, e._pos = r._pos, e._pannerAttr = r._pannerAttr, t.call(this), e._stereo ? r.stereo(e._stereo) : e._pos && r.pos(e._pos[0], e._pos[1], e._pos[2], e._id)
        }
    }(Sound.prototype.init), Sound.prototype.reset = function (t) {
        return function () {
            var e = this, r = e._parent;
            return e._orientation = r._orientation, e._pos = r._pos, e._pannerAttr = r._pannerAttr, t.call(this)
        }
    }(Sound.prototype.reset);
    var t = function (t, e) {
        "spatial" === (e = e || "spatial") ? (t._panner = Howler.ctx.createPanner(), t._panner.coneInnerAngle = t._pannerAttr.coneInnerAngle, t._panner.coneOuterAngle = t._pannerAttr.coneOuterAngle, t._panner.coneOuterGain = t._pannerAttr.coneOuterGain, t._panner.distanceModel = t._pannerAttr.distanceModel, t._panner.maxDistance = t._pannerAttr.maxDistance, t._panner.panningModel = t._pannerAttr.panningModel, t._panner.refDistance = t._pannerAttr.refDistance, t._panner.rolloffFactor = t._pannerAttr.rolloffFactor, t._panner.setPosition(t._pos[0], t._pos[1], t._pos[2]), t._panner.setOrientation(t._orientation[0], t._orientation[1], t._orientation[2])) : (t._panner = Howler.ctx.createStereoPanner(), t._panner.pan.value = t._stereo), t._panner.connect(t._node), t._paused || t._parent.pause(t._id, !0).play(t._id)
    }
}(), function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).PIXI = t()
    }
}(function () {
    return function t(e, r, i) {
        function n(s, a) {
            if (!r[s]) {
                if (!e[s]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(s, !0);
                    if (o) return o(s, !0);
                    var h = new Error("Cannot find module '" + s + "'");
                    throw h.code = "MODULE_NOT_FOUND", h
                }
                var u = r[s] = {exports: {}};
                e[s][0].call(u.exports, function (t) {
                    var r = e[s][1][t];
                    return n(r || t)
                }, u, u.exports, t, e, r, i)
            }
            return r[s].exports
        }

        for (var o = "function" == typeof require && require, s = 0; s < i.length; s++) n(i[s]);
        return n
    }({
        1: [function (t, e, r) {
            (function (t, r) {
                !function () {
                    function i() {
                    }

                    function n(t) {
                        return t
                    }

                    function o(t) {
                        return !!t
                    }

                    function s(t) {
                        return !t
                    }

                    function a(t) {
                        return function () {
                            if (null === t) throw new Error("Callback was already called.");
                            t.apply(this, arguments), t = null
                        }
                    }

                    function l(t) {
                        return function () {
                            null !== t && (t.apply(this, arguments), t = null)
                        }
                    }

                    function h(t) {
                        return U(t) || "number" == typeof t.length && t.length >= 0 && t.length % 1 == 0
                    }

                    function u(t, e) {
                        for (var r = -1, i = t.length; ++r < i;) e(t[r], r, t)
                    }

                    function c(t, e) {
                        for (var r = -1, i = t.length, n = Array(i); ++r < i;) n[r] = e(t[r], r, t);
                        return n
                    }

                    function p(t) {
                        return c(Array(t), function (t, e) {
                            return e
                        })
                    }

                    function d(t, e, r) {
                        return u(t, function (t, i, n) {
                            r = e(r, t, i, n)
                        }), r
                    }

                    function f(t, e) {
                        u(Y(t), function (r) {
                            e(t[r], r)
                        })
                    }

                    function m(t, e) {
                        for (var r = 0; r < t.length; r++) if (t[r] === e) return r;
                        return -1
                    }

                    function g(t) {
                        var e, r, i = -1;
                        return h(t) ? (e = t.length, function () {
                            return ++i < e ? i : null
                        }) : (r = Y(t), e = r.length, function () {
                            return ++i < e ? r[i] : null
                        })
                    }

                    function v(t, e) {
                        return e = null == e ? t.length - 1 : +e, function () {
                            for (var r = Math.max(arguments.length - e, 0), i = Array(r), n = 0; n < r; n++) i[n] = arguments[n + e];
                            switch (e) {
                                case 0:
                                    return t.call(this, i);
                                case 1:
                                    return t.call(this, arguments[0], i)
                            }
                        }
                    }

                    function _(t) {
                        return function (e, r, i) {
                            return t(e, i)
                        }
                    }

                    function y(t) {
                        return function (e, r, n) {
                            n = l(n || i);
                            var o = g(e = e || []);
                            if (t <= 0) return n(null);
                            var s = !1, h = 0, u = !1;
                            !function i() {
                                if (s && h <= 0) return n(null);
                                for (; h < t && !u;) {
                                    var l = o();
                                    if (null === l) return s = !0, void(h <= 0 && n(null));
                                    h += 1, r(e[l], l, a(function (t) {
                                        h -= 1, t ? (n(t), u = !0) : i()
                                    }))
                                }
                            }()
                        }
                    }

                    function x(t) {
                        return function (e, r, i) {
                            return t(k.eachOf, e, r, i)
                        }
                    }

                    function b(t) {
                        return function (e, r, i, n) {
                            return t(y(r), e, i, n)
                        }
                    }

                    function T(t) {
                        return function (e, r, i) {
                            return t(k.eachOfSeries, e, r, i)
                        }
                    }

                    function w(t, e, r, n) {
                        n = l(n || i);
                        var o = h(e = e || []) ? [] : {};
                        t(e, function (t, e, i) {
                            r(t, function (t, r) {
                                o[e] = r, i(t)
                            })
                        }, function (t) {
                            n(t, o)
                        })
                    }

                    function E(t, e, r, i) {
                        var n = [];
                        t(e, function (t, e, i) {
                            r(t, function (r) {
                                r && n.push({index: e, value: t}), i()
                            })
                        }, function () {
                            i(c(n.sort(function (t, e) {
                                return t.index - e.index
                            }), function (t) {
                                return t.value
                            }))
                        })
                    }

                    function S(t, e, r, i) {
                        E(t, e, function (t, e) {
                            r(t, function (t) {
                                e(!t)
                            })
                        }, i)
                    }

                    function A(t, e, r) {
                        return function (i, n, o, s) {
                            function a() {
                                s && s(r(!1, void 0))
                            }

                            function l(t, i, n) {
                                if (!s) return n();
                                o(t, function (i) {
                                    s && e(i) && (s(r(!0, t)), s = o = !1), n()
                                })
                            }

                            arguments.length > 3 ? t(i, n, l, a) : (s = o, o = n, t(i, l, a))
                        }
                    }

                    function M(t, e) {
                        return e
                    }

                    function C(t, e, r) {
                        r = r || i;
                        var n = h(e) ? [] : {};
                        t(e, function (t, e, r) {
                            t(v(function (t, i) {
                                i.length <= 1 && (i = i[0]), n[e] = i, r(t)
                            }))
                        }, function (t) {
                            r(t, n)
                        })
                    }

                    function R(t, e, r, i) {
                        var n = [];
                        t(e, function (t, e, i) {
                            r(t, function (t, e) {
                                n = n.concat(e || []), i(t)
                            })
                        }, function (t) {
                            i(t, n)
                        })
                    }

                    function P(t, e, r) {
                        function n(t, e, r, n) {
                            if (null != n && "function" != typeof n) throw new Error("task callback must be a function");
                            if (t.started = !0, U(e) || (e = [e]), 0 === e.length && t.idle()) return k.setImmediate(function () {
                                t.drain()
                            });
                            u(e, function (e) {
                                var o = {data: e, callback: n || i};
                                r ? t.tasks.unshift(o) : t.tasks.push(o), t.tasks.length === t.concurrency && t.saturated()
                            }), k.setImmediate(t.process)
                        }

                        function o(t, e) {
                            return function () {
                                s -= 1;
                                var r = !1, i = arguments;
                                u(e, function (t) {
                                    u(l, function (e, i) {
                                        e !== t || r || (l.splice(i, 1), r = !0)
                                    }), t.callback.apply(t, i)
                                }), t.tasks.length + s === 0 && t.drain(), t.process()
                            }
                        }

                        if (null == e) e = 1; else if (0 === e) throw new Error("Concurrency must not be zero");
                        var s = 0, l = [], h = {
                            tasks: [], concurrency: e, payload: r, saturated: i, empty: i, drain: i, started: !1,
                            paused: !1, push: function (t, e) {
                                n(h, t, !1, e)
                            }, kill: function () {
                                h.drain = i, h.tasks = []
                            }, unshift: function (t, e) {
                                n(h, t, !0, e)
                            }, process: function () {
                                for (; !h.paused && s < h.concurrency && h.tasks.length;) {
                                    var e = h.payload ? h.tasks.splice(0, h.payload) : h.tasks.splice(0, h.tasks.length),
                                        r = c(e, function (t) {
                                            return t.data
                                        });
                                    0 === h.tasks.length && h.empty(), s += 1, l.push(e[0]);
                                    var i = a(o(h, e));
                                    t(r, i)
                                }
                            }, length: function () {
                                return h.tasks.length
                            }, running: function () {
                                return s
                            }, workersList: function () {
                                return l
                            }, idle: function () {
                                return h.tasks.length + s === 0
                            }, pause: function () {
                                h.paused = !0
                            }, resume: function () {
                                if (!1 !== h.paused) {
                                    h.paused = !1;
                                    for (var t = Math.min(h.concurrency, h.tasks.length), e = 1; e <= t; e++) k.setImmediate(h.process)
                                }
                            }
                        };
                        return h
                    }

                    function O(t) {
                        return v(function (e, r) {
                            e.apply(null, r.concat([v(function (e, r) {
                                "object" == typeof console && (e ? console.error && console.error(e) : console[t] && u(r, function (e) {
                                    console[t](e)
                                }))
                            })]))
                        })
                    }

                    function D(t) {
                        return function (e, r, i) {
                            t(p(e), r, i)
                        }
                    }

                    function I(t) {
                        return v(function (e, r) {
                            var i = v(function (r) {
                                var i = this, n = r.pop();
                                return t(e, function (t, e, n) {
                                    t.apply(i, r.concat([n]))
                                }, n)
                            });
                            return r.length ? i.apply(this, r) : i
                        })
                    }

                    function F(t) {
                        return v(function (e) {
                            var r = e.pop();
                            e.push(function () {
                                var t = arguments;
                                i ? k.setImmediate(function () {
                                    r.apply(null, t)
                                }) : r.apply(null, t)
                            });
                            var i = !0;
                            t.apply(this, e), i = !1
                        })
                    }

                    var L, k = {},
                        B = "object" == typeof self && self.self === self && self || "object" == typeof r && r.global === r && r || this;
                    null != B && (L = B.async), k.noConflict = function () {
                        return B.async = L, k
                    };
                    var N = Object.prototype.toString, U = Array.isArray || function (t) {
                        return "[object Array]" === N.call(t)
                    }, X = function (t) {
                        var e = typeof t;
                        return "function" === e || "object" === e && !!t
                    }, Y = Object.keys || function (t) {
                        var e = [];
                        for (var r in t) t.hasOwnProperty(r) && e.push(r);
                        return e
                    }, j = "function" == typeof setImmediate && setImmediate, V = j ? function (t) {
                        j(t)
                    } : function (t) {
                        setTimeout(t, 0)
                    };
                    "object" == typeof t && "function" == typeof t.nextTick ? k.nextTick = t.nextTick : k.nextTick = V, k.setImmediate = j ? V : k.nextTick, k.forEach = k.each = function (t, e, r) {
                        return k.eachOf(t, _(e), r)
                    }, k.forEachSeries = k.eachSeries = function (t, e, r) {
                        return k.eachOfSeries(t, _(e), r)
                    }, k.forEachLimit = k.eachLimit = function (t, e, r, i) {
                        return y(e)(t, _(r), i)
                    }, k.forEachOf = k.eachOf = function (t, e, r) {
                        r = l(r || i);
                        for (var n, o = g(t = t || []), s = 0; null != (n = o());) s += 1, e(t[n], n, a(function (t) {
                            s--, t ? r(t) : null === n && s <= 0 && r(null)
                        }));
                        0 === s && r(null)
                    }, k.forEachOfSeries = k.eachOfSeries = function (t, e, r) {
                        function n() {
                            var i = !0;
                            if (null === s) return r(null);
                            e(t[s], s, a(function (t) {
                                if (t) r(t); else {
                                    if (null === (s = o())) return r(null);
                                    i ? k.setImmediate(n) : n()
                                }
                            })), i = !1
                        }

                        r = l(r || i);
                        var o = g(t = t || []), s = o();
                        n()
                    }, k.forEachOfLimit = k.eachOfLimit = function (t, e, r, i) {
                        y(e)(t, r, i)
                    }, k.map = x(w), k.mapSeries = T(w), k.mapLimit = b(w), k.inject = k.foldl = k.reduce = function (t, e, r, i) {
                        k.eachOfSeries(t, function (t, i, n) {
                            r(e, t, function (t, r) {
                                e = r, n(t)
                            })
                        }, function (t) {
                            i(t, e)
                        })
                    }, k.foldr = k.reduceRight = function (t, e, r, i) {
                        var o = c(t, n).reverse();
                        k.reduce(o, e, r, i)
                    }, k.transform = function (t, e, r, i) {
                        3 === arguments.length && (i = r, r = e, e = U(t) ? [] : {}), k.eachOf(t, function (t, i, n) {
                            r(e, t, i, n)
                        }, function (t) {
                            i(t, e)
                        })
                    }, k.select = k.filter = x(E), k.selectLimit = k.filterLimit = b(E), k.selectSeries = k.filterSeries = T(E), k.reject = x(S), k.rejectLimit = b(S), k.rejectSeries = T(S), k.any = k.some = A(k.eachOf, o, n), k.someLimit = A(k.eachOfLimit, o, n), k.all = k.every = A(k.eachOf, s, s), k.everyLimit = A(k.eachOfLimit, s, s), k.detect = A(k.eachOf, n, M), k.detectSeries = A(k.eachOfSeries, n, M), k.detectLimit = A(k.eachOfLimit, n, M), k.sortBy = function (t, e, r) {
                        function i(t, e) {
                            var r = t.criteria, i = e.criteria;
                            return r < i ? -1 : r > i ? 1 : 0
                        }

                        k.map(t, function (t, r) {
                            e(t, function (e, i) {
                                e ? r(e) : r(null, {value: t, criteria: i})
                            })
                        }, function (t, e) {
                            if (t) return r(t);
                            r(null, c(e.sort(i), function (t) {
                                return t.value
                            }))
                        })
                    }, k.auto = function (t, e, r) {
                        function n(t) {
                            _.unshift(t)
                        }

                        function o(t) {
                            var e = m(_, t);
                            e >= 0 && _.splice(e, 1)
                        }

                        function s() {
                            h--, u(_.slice(0), function (t) {
                                t()
                            })
                        }

                        "function" == typeof arguments[1] && (r = e, e = null), r = l(r || i);
                        var a = Y(t), h = a.length;
                        if (!h) return r(null);
                        e || (e = h);
                        var c = {}, p = 0, g = !1, _ = [];
                        n(function () {
                            h || r(null, c)
                        }), u(a, function (i) {
                            function a() {
                                return p < e && d(y, function (t, e) {
                                    return t && c.hasOwnProperty(e)
                                }, !0) && !c.hasOwnProperty(i)
                            }

                            function l() {
                                a() && (p++, o(l), u[u.length - 1](_, c))
                            }

                            if (!g) {
                                for (var h, u = U(t[i]) ? t[i] : [t[i]], _ = v(function (t, e) {
                                    if (p--, e.length <= 1 && (e = e[0]), t) {
                                        var n = {};
                                        f(c, function (t, e) {
                                            n[e] = t
                                        }), n[i] = e, g = !0, r(t, n)
                                    } else c[i] = e, k.setImmediate(s)
                                }), y = u.slice(0, u.length - 1), x = y.length; x--;) {
                                    if (!(h = t[y[x]])) throw new Error("Has nonexistent dependency in " + y.join(", "));
                                    if (U(h) && m(h, i) >= 0) throw new Error("Has cyclic dependencies")
                                }
                                a() ? (p++, u[u.length - 1](_, c)) : n(l)
                            }
                        })
                    }, k.retry = function (t, e, r) {
                        function i(t, e) {
                            for (; a.times;) {
                                var r = !(a.times -= 1);
                                s.push(function (t, r) {
                                    return function (i) {
                                        t(function (t, e) {
                                            i(!t || r, {err: t, result: e})
                                        }, e)
                                    }
                                }(a.task, r)), !r && a.interval > 0 && s.push(function (t) {
                                    return function (e) {
                                        setTimeout(function () {
                                            e(null)
                                        }, t)
                                    }
                                }(a.interval))
                            }
                            k.series(s, function (e, r) {
                                r = r[r.length - 1], (t || a.callback)(r.err, r.result)
                            })
                        }

                        var n = 5, o = 0, s = [], a = {times: n, interval: o}, l = arguments.length;
                        if (l < 1 || l > 3) throw new Error("Invalid arguments - must be either (task), (task, callback), (times, task) or (times, task, callback)");
                        return l <= 2 && "function" == typeof t && (r = e, e = t), "function" != typeof t && function (t, e) {
                            if ("number" == typeof e) t.times = parseInt(e, 10) || n; else {
                                if ("object" != typeof e) throw new Error("Unsupported argument type for 'times': " + typeof e);
                                t.times = parseInt(e.times, 10) || n, t.interval = parseInt(e.interval, 10) || o
                            }
                        }(a, t), a.callback = r, a.task = e, a.callback ? i() : i
                    }, k.waterfall = function (t, e) {
                        function r(t) {
                            return v(function (i, n) {
                                if (i) e.apply(null, [i].concat(n)); else {
                                    var o = t.next();
                                    o ? n.push(r(o)) : n.push(e), F(t).apply(null, n)
                                }
                            })
                        }

                        if (e = l(e || i), !U(t)) {
                            var n = new Error("First argument to waterfall must be an array of functions");
                            return e(n)
                        }
                        if (!t.length) return e();
                        r(k.iterator(t))()
                    }, k.parallel = function (t, e) {
                        C(k.eachOf, t, e)
                    }, k.parallelLimit = function (t, e, r) {
                        C(y(e), t, r)
                    }, k.series = function (t, e) {
                        C(k.eachOfSeries, t, e)
                    }, k.iterator = function (t) {
                        function e(r) {
                            function i() {
                                return t.length && t[r].apply(null, arguments), i.next()
                            }

                            return i.next = function () {
                                return r < t.length - 1 ? e(r + 1) : null
                            }, i
                        }

                        return e(0)
                    }, k.apply = v(function (t, e) {
                        return v(function (r) {
                            return t.apply(null, e.concat(r))
                        })
                    }), k.concat = x(R), k.concatSeries = T(R), k.whilst = function (t, e, r) {
                        if (r = r || i, t()) {
                            var n = v(function (i, o) {
                                i ? r(i) : t.apply(this, o) ? e(n) : r.apply(null, [null].concat(o))
                            });
                            e(n)
                        } else r(null)
                    }, k.doWhilst = function (t, e, r) {
                        var i = 0;
                        return k.whilst(function () {
                            return ++i <= 1 || e.apply(this, arguments)
                        }, t, r)
                    }, k.until = function (t, e, r) {
                        return k.whilst(function () {
                            return !t.apply(this, arguments)
                        }, e, r)
                    }, k.doUntil = function (t, e, r) {
                        return k.doWhilst(t, function () {
                            return !e.apply(this, arguments)
                        }, r)
                    }, k.during = function (t, e, r) {
                        r = r || i;
                        var n = v(function (e, i) {
                            e ? r(e) : (i.push(o), t.apply(this, i))
                        }), o = function (t, i) {
                            t ? r(t) : i ? e(n) : r(null)
                        };
                        t(o)
                    }, k.doDuring = function (t, e, r) {
                        var i = 0;
                        k.during(function (t) {
                            i++ < 1 ? t(null, !0) : e.apply(this, arguments)
                        }, t, r)
                    }, k.queue = function (t, e) {
                        return P(function (e, r) {
                            t(e[0], r)
                        }, e, 1)
                    }, k.priorityQueue = function (t, e) {
                        function r(t, e) {
                            return t.priority - e.priority
                        }

                        function n(t, e, r) {
                            for (var i = -1, n = t.length - 1; i < n;) {
                                var o = i + (n - i + 1 >>> 1);
                                r(e, t[o]) >= 0 ? i = o : n = o - 1
                            }
                            return i
                        }

                        function o(t, e, o, s) {
                            if (null != s && "function" != typeof s) throw new Error("task callback must be a function");
                            if (t.started = !0, U(e) || (e = [e]), 0 === e.length) return k.setImmediate(function () {
                                t.drain()
                            });
                            u(e, function (e) {
                                var a = {data: e, priority: o, callback: "function" == typeof s ? s : i};
                                t.tasks.splice(n(t.tasks, a, r) + 1, 0, a), t.tasks.length === t.concurrency && t.saturated(), k.setImmediate(t.process)
                            })
                        }

                        var s = k.queue(t, e);
                        return s.push = function (t, e, r) {
                            o(s, t, e, r)
                        }, delete s.unshift, s
                    }, k.cargo = function (t, e) {
                        return P(t, 1, e)
                    }, k.log = O("log"), k.dir = O("dir"), k.memoize = function (t, e) {
                        var r = {}, i = {}, o = Object.prototype.hasOwnProperty;
                        e = e || n;
                        var s = v(function (n) {
                            var s = n.pop(), a = e.apply(null, n);
                            o.call(r, a) ? k.setImmediate(function () {
                                s.apply(null, r[a])
                            }) : o.call(i, a) ? i[a].push(s) : (i[a] = [s], t.apply(null, n.concat([v(function (t) {
                                r[a] = t;
                                var e = i[a];
                                delete i[a];
                                for (var n = 0, o = e.length; n < o; n++) e[n].apply(null, t)
                            })])))
                        });
                        return s.memo = r, s.unmemoized = t, s
                    }, k.unmemoize = function (t) {
                        return function () {
                            return (t.unmemoized || t).apply(null, arguments)
                        }
                    }, k.times = D(k.map), k.timesSeries = D(k.mapSeries), k.timesLimit = function (t, e, r, i) {
                        return k.mapLimit(p(t), e, r, i)
                    }, k.seq = function () {
                        var t = arguments;
                        return v(function (e) {
                            var r = this, n = e[e.length - 1];
                            "function" == typeof n ? e.pop() : n = i, k.reduce(t, e, function (t, e, i) {
                                e.apply(r, t.concat([v(function (t, e) {
                                    i(t, e)
                                })]))
                            }, function (t, e) {
                                n.apply(r, [t].concat(e))
                            })
                        })
                    }, k.compose = function () {
                        return k.seq.apply(null, Array.prototype.reverse.call(arguments))
                    }, k.applyEach = I(k.eachOf), k.applyEachSeries = I(k.eachOfSeries), k.forever = function (t, e) {
                        function r(t) {
                            if (t) return n(t);
                            o(r)
                        }

                        var n = a(e || i), o = F(t);
                        r()
                    }, k.ensureAsync = F, k.constant = v(function (t) {
                        var e = [null].concat(t);
                        return function (t) {
                            return t.apply(this, e)
                        }
                    }), k.wrapSync = k.asyncify = function (t) {
                        return v(function (e) {
                            var r, i = e.pop();
                            try {
                                r = t.apply(this, e)
                            } catch (t) {
                                return i(t)
                            }
                            X(r) && "function" == typeof r.then ? r.then(function (t) {
                                i(null, t)
                            }).catch(function (t) {
                                i(t.message ? t : new Error(t))
                            }) : i(null, r)
                        })
                    }, "object" == typeof e && e.exports ? e.exports = k : B.async = k
                }()
            }).call(this, t("_process"), "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {_process: 3}], 2: [function (t, e, r) {
            (function (t) {
                function e(t, e) {
                    for (var r = 0, i = t.length - 1; i >= 0; i--) {
                        var n = t[i];
                        "." === n ? t.splice(i, 1) : ".." === n ? (t.splice(i, 1), r++) : r && (t.splice(i, 1), r--)
                    }
                    if (e) for (; r--; r) t.unshift("..");
                    return t
                }

                function i(t, e) {
                    if (t.filter) return t.filter(e);
                    for (var r = [], i = 0; i < t.length; i++) e(t[i], i, t) && r.push(t[i]);
                    return r
                }

                var n = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/, o = function (t) {
                    return n.exec(t).slice(1)
                };
                r.resolve = function () {
                    for (var r = "", n = !1, o = arguments.length - 1; o >= -1 && !n; o--) {
                        var s = o >= 0 ? arguments[o] : t.cwd();
                        if ("string" != typeof s) throw new TypeError("Arguments to path.resolve must be strings");
                        s && (r = s + "/" + r, n = "/" === s.charAt(0))
                    }
                    return r = e(i(r.split("/"), function (t) {
                        return !!t
                    }), !n).join("/"), (n ? "/" : "") + r || "."
                }, r.normalize = function (t) {
                    var n = r.isAbsolute(t), o = "/" === s(t, -1);
                    return (t = e(i(t.split("/"), function (t) {
                        return !!t
                    }), !n).join("/")) || n || (t = "."), t && o && (t += "/"), (n ? "/" : "") + t
                }, r.isAbsolute = function (t) {
                    return "/" === t.charAt(0)
                }, r.join = function () {
                    var t = Array.prototype.slice.call(arguments, 0);
                    return r.normalize(i(t, function (t, e) {
                        if ("string" != typeof t) throw new TypeError("Arguments to path.join must be strings");
                        return t
                    }).join("/"))
                }, r.relative = function (t, e) {
                    function i(t) {
                        for (var e = 0; e < t.length && "" === t[e]; e++) ;
                        for (var r = t.length - 1; r >= 0 && "" === t[r]; r--) ;
                        return e > r ? [] : t.slice(e, r - e + 1)
                    }

                    t = r.resolve(t).substr(1), e = r.resolve(e).substr(1);
                    for (var n = i(t.split("/")), o = i(e.split("/")), s = Math.min(n.length, o.length), a = s, l = 0; l < s; l++) if (n[l] !== o[l]) {
                        a = l;
                        break
                    }
                    for (var h = [], l = a; l < n.length; l++) h.push("..");
                    return (h = h.concat(o.slice(a))).join("/")
                }, r.sep = "/", r.delimiter = ":", r.dirname = function (t) {
                    var e = o(t), r = e[0], i = e[1];
                    return r || i ? (i && (i = i.substr(0, i.length - 1)), r + i) : "."
                }, r.basename = function (t, e) {
                    var r = o(t)[2];
                    return e && r.substr(-1 * e.length) === e && (r = r.substr(0, r.length - e.length)), r
                }, r.extname = function (t) {
                    return o(t)[3]
                };
                var s = "b" === "ab".substr(-1) ? function (t, e, r) {
                    return t.substr(e, r)
                } : function (t, e, r) {
                    return e < 0 && (e = t.length + e), t.substr(e, r)
                }
            }).call(this, t("_process"))
        }, {_process: 3}], 3: [function (t, e, r) {
            function i() {
                u = !1, a.length ? h = a.concat(h) : c = -1, h.length && n()
            }

            function n() {
                if (!u) {
                    var t = setTimeout(i);
                    u = !0;
                    for (var e = h.length; e;) {
                        for (a = h, h = []; ++c < e;) a && a[c].run();
                        c = -1, e = h.length
                    }
                    a = null, u = !1, clearTimeout(t)
                }
            }

            function o(t, e) {
                this.fun = t, this.array = e
            }

            function s() {
            }

            var a, l = e.exports = {}, h = [], u = !1, c = -1;
            l.nextTick = function (t) {
                var e = [];
                if (e.length = arguments.length - 1, arguments.length > 1) for (var r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
                h.push(new o(t, e)), 1 !== h.length || u || setTimeout(n, 0)
            }, o.prototype.run = function () {
                this.fun.apply(null, this.array)
            }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = s, l.addListener = s, l.once = s, l.off = s, l.removeListener = s, l.removeAllListeners = s, l.emit = s, l.binding = function (t) {
                throw new Error("process.binding is not supported")
            }, l.cwd = function () {
                return "/"
            }, l.chdir = function (t) {
                throw new Error("process.chdir is not supported")
            }, l.umask = function () {
                return 0
            }
        }, {}], 4: [function (t, e, r) {
            (function (t) {
                !function (i) {
                    function n(t) {
                        throw new RangeError(O[t])
                    }

                    function o(t, e) {
                        for (var r = t.length, i = []; r--;) i[r] = e(t[r]);
                        return i
                    }

                    function s(t, e) {
                        var r = t.split("@"), i = "";
                        return r.length > 1 && (i = r[0] + "@", t = r[1]), i + o((t = t.replace(P, ".")).split("."), e).join(".")
                    }

                    function a(t) {
                        for (var e, r, i = [], n = 0, o = t.length; n < o;) (e = t.charCodeAt(n++)) >= 55296 && e <= 56319 && n < o ? 56320 == (64512 & (r = t.charCodeAt(n++))) ? i.push(((1023 & e) << 10) + (1023 & r) + 65536) : (i.push(e), n--) : i.push(e);
                        return i
                    }

                    function l(t) {
                        return o(t, function (t) {
                            var e = "";
                            return t > 65535 && (e += F((t -= 65536) >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), e += F(t)
                        }).join("")
                    }

                    function h(t) {
                        return t - 48 < 10 ? t - 22 : t - 65 < 26 ? t - 65 : t - 97 < 26 ? t - 97 : x
                    }

                    function u(t, e) {
                        return t + 22 + 75 * (t < 26) - ((0 != e) << 5)
                    }

                    function c(t, e, r) {
                        var i = 0;
                        for (t = r ? I(t / E) : t >> 1, t += I(t / e); t > D * T >> 1; i += x) t = I(t / D);
                        return I(i + (D + 1) * t / (t + w))
                    }

                    function p(t) {
                        var e, r, i, o, s, a, u, p, d, f, m = [], g = t.length, v = 0, _ = A, w = S;
                        for ((r = t.lastIndexOf(M)) < 0 && (r = 0), i = 0; i < r; ++i) t.charCodeAt(i) >= 128 && n("not-basic"), m.push(t.charCodeAt(i));
                        for (o = r > 0 ? r + 1 : 0; o < g;) {
                            for (s = v, a = 1, u = x; o >= g && n("invalid-input"), ((p = h(t.charCodeAt(o++))) >= x || p > I((y - v) / a)) && n("overflow"), v += p * a, d = u <= w ? b : u >= w + T ? T : u - w, !(p < d); u += x) a > I(y / (f = x - d)) && n("overflow"), a *= f;
                            w = c(v - s, e = m.length + 1, 0 == s), I(v / e) > y - _ && n("overflow"), _ += I(v / e), v %= e, m.splice(v++, 0, _)
                        }
                        return l(m)
                    }

                    function d(t) {
                        var e, r, i, o, s, l, h, p, d, f, m, g, v, _, w, E = [];
                        for (g = (t = a(t)).length, e = A, r = 0, s = S, l = 0; l < g; ++l) (m = t[l]) < 128 && E.push(F(m));
                        for (i = o = E.length, o && E.push(M); i < g;) {
                            for (h = y, l = 0; l < g; ++l) (m = t[l]) >= e && m < h && (h = m);
                            for (h - e > I((y - r) / (v = i + 1)) && n("overflow"), r += (h - e) * v, e = h, l = 0; l < g; ++l) if ((m = t[l]) < e && ++r > y && n("overflow"), m == e) {
                                for (p = r, d = x; f = d <= s ? b : d >= s + T ? T : d - s, !(p < f); d += x) w = p - f, _ = x - f, E.push(F(u(f + w % _, 0))), p = I(w / _);
                                E.push(F(u(p, 0))), s = c(r, v, i == o), r = 0, ++i
                            }
                            ++r, ++e
                        }
                        return E.join("")
                    }

                    var f = "object" == typeof r && r && !r.nodeType && r,
                        m = "object" == typeof e && e && !e.nodeType && e, g = "object" == typeof t && t;
                    g.global !== g && g.window !== g && g.self !== g || (i = g);
                    var v, _, y = 2147483647, x = 36, b = 1, T = 26, w = 38, E = 700, S = 72, A = 128, M = "-",
                        C = /^xn--/, R = /[^\x20-\x7E]/, P = /[\x2E\u3002\uFF0E\uFF61]/g, O = {
                            overflow: "Overflow: input needs wider integers to process",
                            "not-basic": "Illegal input >= 0x80 (not a basic code point)", "invalid-input": "Invalid input"
                        }, D = x - b, I = Math.floor, F = String.fromCharCode;
                    if (v = {
                        version: "1.3.2", ucs2: {decode: a, encode: l}, decode: p, encode: d, toASCII: function (t) {
                            return s(t, function (t) {
                                return R.test(t) ? "xn--" + d(t) : t
                            })
                        }, toUnicode: function (t) {
                            return s(t, function (t) {
                                return C.test(t) ? p(t.slice(4).toLowerCase()) : t
                            })
                        }
                    }, f && m) if (e.exports == f) m.exports = v; else for (_ in v) v.hasOwnProperty(_) && (f[_] = v[_]); else i.punycode = v
                }(this)
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}], 5: [function (t, e, r) {
            "use strict";

            function i(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }

            e.exports = function (t, e, r, o) {
                e = e || "&", r = r || "=";
                var s = {};
                if ("string" != typeof t || 0 === t.length) return s;
                var a = /\+/g;
                t = t.split(e);
                var l = 1e3;
                o && "number" == typeof o.maxKeys && (l = o.maxKeys);
                var h = t.length;
                l > 0 && h > l && (h = l);
                for (var u = 0; u < h; ++u) {
                    var c, p, d, f, m = t[u].replace(a, "%20"), g = m.indexOf(r);
                    g >= 0 ? (c = m.substr(0, g), p = m.substr(g + 1)) : (c = m, p = ""), d = decodeURIComponent(c), f = decodeURIComponent(p), i(s, d) ? n(s[d]) ? s[d].push(f) : s[d] = [s[d], f] : s[d] = f
                }
                return s
            };
            var n = Array.isArray || function (t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }
        }, {}], 6: [function (t, e, r) {
            "use strict";

            function i(t, e) {
                if (t.map) return t.map(e);
                for (var r = [], i = 0; i < t.length; i++) r.push(e(t[i], i));
                return r
            }

            var n = function (t) {
                switch (typeof t) {
                    case"string":
                        return t;
                    case"boolean":
                        return t ? "true" : "false";
                    case"number":
                        return isFinite(t) ? t : "";
                    default:
                        return ""
                }
            };
            e.exports = function (t, e, r, a) {
                return e = e || "&", r = r || "=", null === t && (t = void 0), "object" == typeof t ? i(s(t), function (s) {
                    var a = encodeURIComponent(n(s)) + r;
                    return o(t[s]) ? i(t[s], function (t) {
                        return a + encodeURIComponent(n(t))
                    }).join(e) : a + encodeURIComponent(n(t[s]))
                }).join(e) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(t)) : ""
            };
            var o = Array.isArray || function (t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            }, s = Object.keys || function (t) {
                var e = [];
                for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && e.push(r);
                return e
            }
        }, {}], 7: [function (t, e, r) {
            "use strict";
            r.decode = r.parse = t("./decode"), r.encode = r.stringify = t("./encode")
        }, {"./decode": 5, "./encode": 6}], 8: [function (t, e, r) {
            function i() {
                this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, this.path = null, this.href = null
            }

            function n(t, e, r) {
                if (t && s(t) && t instanceof i) return t;
                var n = new i;
                return n.parse(t, e, r), n
            }

            function o(t) {
                return "string" == typeof t
            }

            function s(t) {
                return "object" == typeof t && null !== t
            }

            function a(t) {
                return null === t
            }

            function l(t) {
                return null == t
            }

            var h = t("punycode");
            r.parse = n, r.resolve = function (t, e) {
                return n(t, !1, !0).resolve(e)
            }, r.resolveObject = function (t, e) {
                return t ? n(t, !1, !0).resolveObject(e) : e
            }, r.format = function (t) {
                return o(t) && (t = n(t)), t instanceof i ? t.format() : i.prototype.format.call(t)
            }, r.Url = i;
            var u = /^([a-z0-9.+-]+:)/i, c = /:[0-9]*$/, p = ["<", ">", '"', "`", " ", "\r", "\n", "\t"],
                d = ["{", "}", "|", "\\", "^", "`"].concat(p), f = ["'"].concat(d),
                m = ["%", "/", "?", ";", "#"].concat(f), g = ["/", "?", "#"], v = /^[a-z0-9A-Z_-]{0,63}$/,
                _ = /^([a-z0-9A-Z_-]{0,63})(.*)$/, y = {javascript: !0, "javascript:": !0},
                x = {javascript: !0, "javascript:": !0}, b = {
                    http: !0, https: !0, ftp: !0, gopher: !0, file: !0, "http:": !0, "https:": !0, "ftp:": !0,
                    "gopher:": !0, "file:": !0
                }, T = t("querystring");
            i.prototype.parse = function (t, e, r) {
                if (!o(t)) throw new TypeError("Parameter 'url' must be a string, not " + typeof t);
                var i = t;
                i = i.trim();
                var n = u.exec(i);
                if (n) {
                    var s = (n = n[0]).toLowerCase();
                    this.protocol = s, i = i.substr(n.length)
                }
                if (r || n || i.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var a = "//" === i.substr(0, 2);
                    !a || n && x[n] || (i = i.substr(2), this.slashes = !0)
                }
                if (!x[n] && (a || n && !b[n])) {
                    for (var l = -1, c = 0; c < g.length; c++) -1 !== (w = i.indexOf(g[c])) && (-1 === l || w < l) && (l = w);
                    var p, d;
                    -1 !== (d = -1 === l ? i.lastIndexOf("@") : i.lastIndexOf("@", l)) && (p = i.slice(0, d), i = i.slice(d + 1), this.auth = decodeURIComponent(p)), l = -1;
                    for (c = 0; c < m.length; c++) {
                        var w = i.indexOf(m[c]);
                        -1 !== w && (-1 === l || w < l) && (l = w)
                    }
                    -1 === l && (l = i.length), this.host = i.slice(0, l), i = i.slice(l), this.parseHost(), this.hostname = this.hostname || "";
                    var E = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
                    if (!E) for (var S = this.hostname.split(/\./), c = 0, A = S.length; c < A; c++) {
                        var M = S[c];
                        if (M && !M.match(v)) {
                            for (var C = "", R = 0, P = M.length; R < P; R++) M.charCodeAt(R) > 127 ? C += "x" : C += M[R];
                            if (!C.match(v)) {
                                var O = S.slice(0, c), D = S.slice(c + 1), I = M.match(_);
                                I && (O.push(I[1]), D.unshift(I[2])), D.length && (i = "/" + D.join(".") + i), this.hostname = O.join(".");
                                break
                            }
                        }
                    }
                    if (this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), !E) {
                        for (var F = this.hostname.split("."), L = [], c = 0; c < F.length; ++c) {
                            j = F[c];
                            L.push(j.match(/[^A-Za-z0-9_-]/) ? "xn--" + h.encode(j) : j)
                        }
                        this.hostname = L.join(".")
                    }
                    var k = this.port ? ":" + this.port : "", B = this.hostname || "";
                    this.host = B + k, this.href += this.host, E && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), "/" !== i[0] && (i = "/" + i))
                }
                if (!y[s]) for (var c = 0, A = f.length; c < A; c++) {
                    var N = f[c], U = encodeURIComponent(N);
                    U === N && (U = escape(N)), i = i.split(N).join(U)
                }
                var X = i.indexOf("#");
                -1 !== X && (this.hash = i.substr(X), i = i.slice(0, X));
                var Y = i.indexOf("?");
                if (-1 !== Y ? (this.search = i.substr(Y), this.query = i.substr(Y + 1), e && (this.query = T.parse(this.query)), i = i.slice(0, Y)) : e && (this.search = "", this.query = {}), i && (this.pathname = i), b[s] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
                    var k = this.pathname || "", j = this.search || "";
                    this.path = k + j
                }
                return this.href = this.format(), this
            }, i.prototype.format = function () {
                var t = this.auth || "";
                t && (t = (t = encodeURIComponent(t)).replace(/%3A/i, ":"), t += "@");
                var e = this.protocol || "", r = this.pathname || "", i = this.hash || "", n = !1, o = "";
                this.host ? n = t + this.host : this.hostname && (n = t + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), this.port && (n += ":" + this.port)), this.query && s(this.query) && Object.keys(this.query).length && (o = T.stringify(this.query));
                var a = this.search || o && "?" + o || "";
                return e && ":" !== e.substr(-1) && (e += ":"), this.slashes || (!e || b[e]) && !1 !== n ? (n = "//" + (n || ""), r && "/" !== r.charAt(0) && (r = "/" + r)) : n || (n = ""), i && "#" !== i.charAt(0) && (i = "#" + i), a && "?" !== a.charAt(0) && (a = "?" + a), r = r.replace(/[?#]/g, function (t) {
                    return encodeURIComponent(t)
                }), a = a.replace("#", "%23"), e + n + r + a + i
            }, i.prototype.resolve = function (t) {
                return this.resolveObject(n(t, !1, !0)).format()
            }, i.prototype.resolveObject = function (t) {
                if (o(t)) {
                    var e = new i;
                    e.parse(t, !1, !0), t = e
                }
                var r = new i;
                if (Object.keys(this).forEach(function (t) {
                    r[t] = this[t]
                }, this), r.hash = t.hash, "" === t.href) return r.href = r.format(), r;
                if (t.slashes && !t.protocol) return Object.keys(t).forEach(function (e) {
                    "protocol" !== e && (r[e] = t[e])
                }), b[r.protocol] && r.hostname && !r.pathname && (r.path = r.pathname = "/"), r.href = r.format(), r;
                if (t.protocol && t.protocol !== r.protocol) {
                    if (!b[t.protocol]) return Object.keys(t).forEach(function (e) {
                        r[e] = t[e]
                    }), r.href = r.format(), r;
                    if (r.protocol = t.protocol, t.host || x[t.protocol]) r.pathname = t.pathname; else {
                        for (f = (t.pathname || "").split("/"); f.length && !(t.host = f.shift());) ;
                        t.host || (t.host = ""), t.hostname || (t.hostname = ""), "" !== f[0] && f.unshift(""), f.length < 2 && f.unshift(""), r.pathname = f.join("/")
                    }
                    if (r.search = t.search, r.query = t.query, r.host = t.host || "", r.auth = t.auth, r.hostname = t.hostname || t.host, r.port = t.port, r.pathname || r.search) {
                        var n = r.pathname || "", s = r.search || "";
                        r.path = n + s
                    }
                    return r.slashes = r.slashes || t.slashes, r.href = r.format(), r
                }
                var h = r.pathname && "/" === r.pathname.charAt(0),
                    u = t.host || t.pathname && "/" === t.pathname.charAt(0), c = u || h || r.host && t.pathname, p = c,
                    d = r.pathname && r.pathname.split("/") || [], f = t.pathname && t.pathname.split("/") || [],
                    m = r.protocol && !b[r.protocol];
                if (m && (r.hostname = "", r.port = null, r.host && ("" === d[0] ? d[0] = r.host : d.unshift(r.host)), r.host = "", t.protocol && (t.hostname = null, t.port = null, t.host && ("" === f[0] ? f[0] = t.host : f.unshift(t.host)), t.host = null), c = c && ("" === f[0] || "" === d[0])), u) r.host = t.host || "" === t.host ? t.host : r.host, r.hostname = t.hostname || "" === t.hostname ? t.hostname : r.hostname, r.search = t.search, r.query = t.query, d = f; else if (f.length) d || (d = []), d.pop(), d = d.concat(f), r.search = t.search, r.query = t.query; else if (!l(t.search)) return m && (r.hostname = r.host = d.shift(), (w = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = w.shift(), r.host = r.hostname = w.shift())), r.search = t.search, r.query = t.query, a(r.pathname) && a(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.href = r.format(), r;
                if (!d.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, r.href = r.format(), r;
                for (var g = d.slice(-1)[0], v = (r.host || t.host) && ("." === g || ".." === g) || "" === g, _ = 0, y = d.length; y >= 0; y--) "." == (g = d[y]) ? d.splice(y, 1) : ".." === g ? (d.splice(y, 1), _++) : _ && (d.splice(y, 1), _--);
                if (!c && !p) for (; _--; _) d.unshift("..");
                !c || "" === d[0] || d[0] && "/" === d[0].charAt(0) || d.unshift(""), v && "/" !== d.join("/").substr(-1) && d.push("");
                var T = "" === d[0] || d[0] && "/" === d[0].charAt(0);
                if (m) {
                    r.hostname = r.host = T ? "" : d.length ? d.shift() : "";
                    var w = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@");
                    w && (r.auth = w.shift(), r.host = r.hostname = w.shift())
                }
                return (c = c || r.host && d.length) && !T && d.unshift(""), d.length ? r.pathname = d.join("/") : (r.pathname = null, r.path = null), a(r.pathname) && a(r.search) || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), r.auth = t.auth || r.auth, r.slashes = r.slashes || t.slashes, r.href = r.format(), r
            }, i.prototype.parseHost = function () {
                var t = this.host, e = c.exec(t);
                e && (":" !== (e = e[0]) && (this.port = e.substr(1)), t = t.substr(0, t.length - e.length)), t && (this.hostname = t)
            }
        }, {punycode: 4, querystring: 7}], 9: [function (t, e, r) {
            "use strict";

            function i(t, e, r, i, n) {
                var o, s, a, l = 0;
                for (o = e, s = r - i; o < r; o += i) l += (t[s] - t[o]) * (t[o + 1] + t[s + 1]), s = o;
                if (n === l > 0) for (o = e; o < r; o += i) a = M(o, t[o], t[o + 1], a); else for (o = r - i; o >= e; o -= i) a = M(o, t[o], t[o + 1], a);
                return a
            }

            function n(t, e) {
                if (!t) return t;
                e || (e = t);
                var r, i = t;
                do {
                    if (r = !1, i.steiner || !b(i, i.next) && 0 !== x(i.prev, i, i.next)) i = i.next; else {
                        if (C(i), (i = e = i.prev) === i.next) return null;
                        r = !0
                    }
                } while (r || i !== e);
                return e
            }

            function o(t, e, r, i, u, c, p) {
                if (t) {
                    !p && c && f(t, i, u, c);
                    for (var d, m, g = t; t.prev !== t.next;) if (d = t.prev, m = t.next, c ? a(t, i, u, c) : s(t)) e.push(d.i / r), e.push(t.i / r), e.push(m.i / r), C(t), t = m.next, g = m.next; else if ((t = m) === g) {
                        p ? 1 === p ? o(t = l(t, e, r), e, r, i, u, c, 2) : 2 === p && h(t, e, r, i, u, c) : o(n(t), e, r, i, u, c, 1);
                        break
                    }
                }
            }

            function s(t) {
                var e = t.prev, r = t, i = t.next;
                if (x(e, r, i) >= 0) return !1;
                for (var n = t.next.next; n !== t.prev;) {
                    if (_(e.x, e.y, r.x, r.y, i.x, i.y, n.x, n.y) && x(n.prev, n, n.next) >= 0) return !1;
                    n = n.next
                }
                return !0
            }

            function a(t, e, r, i) {
                var n = t.prev, o = t, s = t.next;
                if (x(n, o, s) >= 0) return !1;
                for (var a = n.x < o.x ? n.x < s.x ? n.x : s.x : o.x < s.x ? o.x : s.x, l = n.y < o.y ? n.y < s.y ? n.y : s.y : o.y < s.y ? o.y : s.y, h = n.x > o.x ? n.x > s.x ? n.x : s.x : o.x > s.x ? o.x : s.x, u = n.y > o.y ? n.y > s.y ? n.y : s.y : o.y > s.y ? o.y : s.y, c = g(a, l, e, r, i), p = g(h, u, e, r, i), d = t.nextZ; d && d.z <= p;) {
                    if (d !== t.prev && d !== t.next && _(n.x, n.y, o.x, o.y, s.x, s.y, d.x, d.y) && x(d.prev, d, d.next) >= 0) return !1;
                    d = d.nextZ
                }
                for (d = t.prevZ; d && d.z >= c;) {
                    if (d !== t.prev && d !== t.next && _(n.x, n.y, o.x, o.y, s.x, s.y, d.x, d.y) && x(d.prev, d, d.next) >= 0) return !1;
                    d = d.prevZ
                }
                return !0
            }

            function l(t, e, r) {
                var i = t;
                do {
                    var n = i.prev, o = i.next.next;
                    T(n, i, i.next, o) && E(n, o) && E(o, n) && (e.push(n.i / r), e.push(i.i / r), e.push(o.i / r), C(i), C(i.next), i = t = o), i = i.next
                } while (i !== t);
                return i
            }

            function h(t, e, r, i, s, a) {
                var l = t;
                do {
                    for (var h = l.next.next; h !== l.prev;) {
                        if (l.i !== h.i && y(l, h)) {
                            var u = A(l, h);
                            return l = n(l, l.next), u = n(u, u.next), o(l, e, r, i, s, a), void o(u, e, r, i, s, a)
                        }
                        h = h.next
                    }
                    l = l.next
                } while (l !== t)
            }

            function u(t, e, r, o) {
                var s, a, l, h = [];
                for (s = 0, a = e.length; s < a; s++) (l = i(t, e[s] * o, s < a - 1 ? e[s + 1] * o : t.length, o, !1)) === l.next && (l.steiner = !0), h.push(v(l));
                for (h.sort(c), s = 0; s < h.length; s++) p(h[s], r), r = n(r, r.next);
                return r
            }

            function c(t, e) {
                return t.x - e.x
            }

            function p(t, e) {
                if (e = d(t, e)) {
                    var r = A(e, t);
                    n(r, r.next)
                }
            }

            function d(t, e) {
                var r, i = e, n = t.x, o = t.y, s = -1 / 0;
                do {
                    if (o <= i.y && o >= i.next.y) {
                        var a = i.x + (o - i.y) * (i.next.x - i.x) / (i.next.y - i.y);
                        a <= n && a > s && (s = a, r = i.x < i.next.x ? i : i.next)
                    }
                    i = i.next
                } while (i !== e);
                if (!r) return null;
                if (t.x === r.x) return r.prev;
                var l, h = r, u = 1 / 0;
                for (i = r.next; i !== h;) n >= i.x && i.x >= r.x && _(o < r.y ? n : s, o, r.x, r.y, o < r.y ? s : n, o, i.x, i.y) && ((l = Math.abs(o - i.y) / (n - i.x)) < u || l === u && i.x > r.x) && E(i, t) && (r = i, u = l), i = i.next;
                return r
            }

            function f(t, e, r, i) {
                var n = t;
                do {
                    null === n.z && (n.z = g(n.x, n.y, e, r, i)), n.prevZ = n.prev, n.nextZ = n.next, n = n.next
                } while (n !== t);
                n.prevZ.nextZ = null, n.prevZ = null, m(n)
            }

            function m(t) {
                var e, r, i, n, o, s, a, l, h = 1;
                do {
                    for (r = t, t = null, o = null, s = 0; r;) {
                        for (s++, i = r, a = 0, e = 0; e < h && (a++, i = i.nextZ); e++) ;
                        for (l = h; a > 0 || l > 0 && i;) 0 === a ? (n = i, i = i.nextZ, l--) : 0 !== l && i ? r.z <= i.z ? (n = r, r = r.nextZ, a--) : (n = i, i = i.nextZ, l--) : (n = r, r = r.nextZ, a--), o ? o.nextZ = n : t = n, n.prevZ = o, o = n;
                        r = i
                    }
                    o.nextZ = null, h *= 2
                } while (s > 1);
                return t
            }

            function g(t, e, r, i, n) {
                return t = 32767 * (t - r) / n, e = 32767 * (e - i) / n, t = 16711935 & (t | t << 8), t = 252645135 & (t | t << 4), t = 858993459 & (t | t << 2), t = 1431655765 & (t | t << 1), e = 16711935 & (e | e << 8), e = 252645135 & (e | e << 4), e = 858993459 & (e | e << 2), e = 1431655765 & (e | e << 1), t | e << 1
            }

            function v(t) {
                var e = t, r = t;
                do {
                    e.x < r.x && (r = e), e = e.next
                } while (e !== t);
                return r
            }

            function _(t, e, r, i, n, o, s, a) {
                return (n - s) * (e - a) - (t - s) * (o - a) >= 0 && (t - s) * (i - a) - (r - s) * (e - a) >= 0 && (r - s) * (o - a) - (n - s) * (i - a) >= 0
            }

            function y(t, e) {
                return b(t, e) || t.next.i !== e.i && t.prev.i !== e.i && !w(t, e) && E(t, e) && E(e, t) && S(t, e)
            }

            function x(t, e, r) {
                return (e.y - t.y) * (r.x - e.x) - (e.x - t.x) * (r.y - e.y)
            }

            function b(t, e) {
                return t.x === e.x && t.y === e.y
            }

            function T(t, e, r, i) {
                return x(t, e, r) > 0 != x(t, e, i) > 0 && x(r, i, t) > 0 != x(r, i, e) > 0
            }

            function w(t, e) {
                var r = t;
                do {
                    if (r.i !== t.i && r.next.i !== t.i && r.i !== e.i && r.next.i !== e.i && T(r, r.next, t, e)) return !0;
                    r = r.next
                } while (r !== t);
                return !1
            }

            function E(t, e) {
                return x(t.prev, t, t.next) < 0 ? x(t, e, t.next) >= 0 && x(t, t.prev, e) >= 0 : x(t, e, t.prev) < 0 || x(t, t.next, e) < 0
            }

            function S(t, e) {
                var r = t, i = !1, n = (t.x + e.x) / 2, o = (t.y + e.y) / 2;
                do {
                    r.y > o != r.next.y > o && n < (r.next.x - r.x) * (o - r.y) / (r.next.y - r.y) + r.x && (i = !i), r = r.next
                } while (r !== t);
                return i
            }

            function A(t, e) {
                var r = new R(t.i, t.x, t.y), i = new R(e.i, e.x, e.y), n = t.next, o = e.prev;
                return t.next = e, e.prev = t, r.next = n, n.prev = r, i.next = r, r.prev = i, o.next = i, i.prev = o, i
            }

            function M(t, e, r, i) {
                var n = new R(t, e, r);
                return i ? (n.next = i.next, n.prev = i, i.next.prev = n, i.next = n) : (n.prev = n, n.next = n), n
            }

            function C(t) {
                t.next.prev = t.prev, t.prev.next = t.next, t.prevZ && (t.prevZ.nextZ = t.nextZ), t.nextZ && (t.nextZ.prevZ = t.prevZ)
            }

            function R(t, e, r) {
                this.i = t, this.x = e, this.y = r, this.prev = null, this.next = null, this.z = null, this.prevZ = null, this.nextZ = null, this.steiner = !1
            }

            e.exports = function (t, e, r) {
                r = r || 2;
                var n = e && e.length, s = n ? e[0] * r : t.length, a = i(t, 0, s, r, !0), l = [];
                if (!a) return l;
                var h, c, p, d, f, m, g;
                if (n && (a = u(t, e, a, r)), t.length > 80 * r) {
                    h = p = t[0], c = d = t[1];
                    for (var v = r; v < s; v += r) f = t[v], m = t[v + 1], f < h && (h = f), m < c && (c = m), f > p && (p = f), m > d && (d = m);
                    g = Math.max(p - h, d - c)
                }
                return o(a, l, r, h, c, g), l
            }
        }, {}], 10: [function (t, e, r) {
            "use strict";

            function i(t, e, r) {
                this.fn = t, this.context = e, this.once = r || !1
            }

            function n() {
            }

            var o = "function" != typeof Object.create && "~";
            n.prototype._events = void 0, n.prototype.listeners = function (t, e) {
                var r = o ? o + t : t, i = this._events && this._events[r];
                if (e) return !!i;
                if (!i) return [];
                if (i.fn) return [i.fn];
                for (var n = 0, s = i.length, a = []; n < s; n++) a[n] = i[n].fn;
                return a
            }, n.prototype.emit = function (t, e, r, i, n, s) {
                var a = o ? o + t : t;
                if (!this._events || !this._events[a]) return !1;
                var l, h, u = this._events[a], c = arguments.length;
                if ("function" == typeof u.fn) {
                    switch (u.once && this.removeListener(t, u.fn, void 0, !0), c) {
                        case 1:
                            return u.fn.call(u.context), !0;
                        case 2:
                            return u.fn.call(u.context, e), !0;
                        case 3:
                            return u.fn.call(u.context, e, r), !0;
                        case 4:
                            return u.fn.call(u.context, e, r, i), !0;
                        case 5:
                            return u.fn.call(u.context, e, r, i, n), !0;
                        case 6:
                            return u.fn.call(u.context, e, r, i, n, s), !0
                    }
                    for (h = 1, l = []; h < c; h++) l[h - 1] = arguments[h];
                    u.fn.apply(u.context, l)
                } else {
                    var p, d = u.length;
                    for (h = 0; h < d; h++) switch (u[h].once && this.removeListener(t, u[h].fn, void 0, !0), c) {
                        case 1:
                            u[h].fn.call(u[h].context);
                            break;
                        case 2:
                            u[h].fn.call(u[h].context, e);
                            break;
                        case 3:
                            u[h].fn.call(u[h].context, e, r);
                            break;
                        default:
                            if (!l) for (p = 1, l = []; p < c; p++) l[p - 1] = arguments[p];
                            u[h].fn.apply(u[h].context, l)
                    }
                }
                return !0
            }, n.prototype.on = function (t, e, r) {
                var n = new i(e, r || this), s = o ? o + t : t;
                return this._events || (this._events = o ? {} : Object.create(null)), this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], n] : this._events[s].push(n) : this._events[s] = n, this
            }, n.prototype.once = function (t, e, r) {
                var n = new i(e, r || this, !0), s = o ? o + t : t;
                return this._events || (this._events = o ? {} : Object.create(null)), this._events[s] ? this._events[s].fn ? this._events[s] = [this._events[s], n] : this._events[s].push(n) : this._events[s] = n, this
            }, n.prototype.removeListener = function (t, e, r, i) {
                var n = o ? o + t : t;
                if (!this._events || !this._events[n]) return this;
                var s = this._events[n], a = [];
                if (e) if (s.fn) (s.fn !== e || i && !s.once || r && s.context !== r) && a.push(s); else for (var l = 0, h = s.length; l < h; l++) (s[l].fn !== e || i && !s[l].once || r && s[l].context !== r) && a.push(s[l]);
                return a.length ? this._events[n] = 1 === a.length ? a[0] : a : delete this._events[n], this
            }, n.prototype.removeAllListeners = function (t) {
                return this._events ? (t ? delete this._events[o ? o + t : t] : this._events = o ? {} : Object.create(null), this) : this
            }, n.prototype.off = n.prototype.removeListener, n.prototype.addListener = n.prototype.on, n.prototype.setMaxListeners = function () {
                return this
            }, n.prefixed = o, void 0 !== e && (e.exports = n)
        }, {}], 11: [function (t, e, r) {
            "use strict";

            function i(t) {
                if (null === t || void 0 === t) throw new TypeError("Object.assign cannot be called with null or undefined");
                return Object(t)
            }

            var n = Object.prototype.hasOwnProperty, o = Object.prototype.propertyIsEnumerable;
            e.exports = Object.assign || function (t, e) {
                for (var r, s, a = i(t), l = 1; l < arguments.length; l++) {
                    r = Object(arguments[l]);
                    for (var h in r) n.call(r, h) && (a[h] = r[h]);
                    if (Object.getOwnPropertySymbols) {
                        s = Object.getOwnPropertySymbols(r);
                        for (var u = 0; u < s.length; u++) o.call(r, s[u]) && (a[s[u]] = r[s[u]])
                    }
                }
                return a
            }
        }, {}], 12: [function (t, e, r) {
            (function (t) {
                !function () {
                    function r(t) {
                        var e = !1;
                        return function () {
                            if (e) throw new Error("Callback was already called.");
                            e = !0, t.apply(i, arguments)
                        }
                    }

                    var i, n, o = {};
                    null != (i = this) && (n = i.async), o.noConflict = function () {
                        return i.async = n, o
                    };
                    var s = Object.prototype.toString, a = Array.isArray || function (t) {
                        return "[object Array]" === s.call(t)
                    }, l = function (t, e) {
                        for (var r = 0; r < t.length; r += 1) e(t[r], r, t)
                    }, h = function (t, e) {
                        if (t.map) return t.map(e);
                        var r = [];
                        return l(t, function (t, i, n) {
                            r.push(e(t, i, n))
                        }), r
                    }, u = function (t, e, r) {
                        return t.reduce ? t.reduce(e, r) : (l(t, function (t, i, n) {
                            r = e(r, t, i, n)
                        }), r)
                    }, c = function (t) {
                        if (Object.keys) return Object.keys(t);
                        var e = [];
                        for (var r in t) t.hasOwnProperty(r) && e.push(r);
                        return e
                    };
                    void 0 !== t && t.nextTick ? (o.nextTick = t.nextTick, "undefined" != typeof setImmediate ? o.setImmediate = function (t) {
                        setImmediate(t)
                    } : o.setImmediate = o.nextTick) : "function" == typeof setImmediate ? (o.nextTick = function (t) {
                        setImmediate(t)
                    }, o.setImmediate = o.nextTick) : (o.nextTick = function (t) {
                        setTimeout(t, 0)
                    }, o.setImmediate = o.nextTick), o.each = function (t, e, i) {
                        function n(e) {
                            e ? (i(e), i = function () {
                            }) : (o += 1) >= t.length && i()
                        }

                        if (i = i || function () {
                        }, !t.length) return i();
                        var o = 0;
                        l(t, function (t) {
                            e(t, r(n))
                        })
                    }, o.forEach = o.each, o.eachSeries = function (t, e, r) {
                        if (r = r || function () {
                        }, !t.length) return r();
                        var i = 0, n = function () {
                            e(t[i], function (e) {
                                e ? (r(e), r = function () {
                                }) : (i += 1) >= t.length ? r() : n()
                            })
                        };
                        n()
                    }, o.forEachSeries = o.eachSeries, o.eachLimit = function (t, e, r, i) {
                        p(e).apply(null, [t, r, i])
                    }, o.forEachLimit = o.eachLimit;
                    var p = function (t) {
                        return function (e, r, i) {
                            if (i = i || function () {
                            }, !e.length || t <= 0) return i();
                            var n = 0, o = 0, s = 0;
                            !function a() {
                                if (n >= e.length) return i();
                                for (; s < t && o < e.length;) s += 1, r(e[(o += 1) - 1], function (t) {
                                    t ? (i(t), i = function () {
                                    }) : (s -= 1, (n += 1) >= e.length ? i() : a())
                                })
                            }()
                        }
                    }, d = function (t) {
                        return function () {
                            var e = Array.prototype.slice.call(arguments);
                            return t.apply(null, [o.each].concat(e))
                        }
                    }, f = function (t, e) {
                        return function () {
                            var r = Array.prototype.slice.call(arguments);
                            return e.apply(null, [p(t)].concat(r))
                        }
                    }, m = function (t) {
                        return function () {
                            var e = Array.prototype.slice.call(arguments);
                            return t.apply(null, [o.eachSeries].concat(e))
                        }
                    }, g = function (t, e, r, i) {
                        if (e = h(e, function (t, e) {
                            return {index: e, value: t}
                        }), i) {
                            var n = [];
                            t(e, function (t, e) {
                                r(t.value, function (r, i) {
                                    n[t.index] = i, e(r)
                                })
                            }, function (t) {
                                i(t, n)
                            })
                        } else t(e, function (t, e) {
                            r(t.value, function (t) {
                                e(t)
                            })
                        })
                    };
                    o.map = d(g), o.mapSeries = m(g), o.mapLimit = function (t, e, r, i) {
                        return v(e)(t, r, i)
                    };
                    var v = function (t) {
                        return f(t, g)
                    };
                    o.reduce = function (t, e, r, i) {
                        o.eachSeries(t, function (t, i) {
                            r(e, t, function (t, r) {
                                e = r, i(t)
                            })
                        }, function (t) {
                            i(t, e)
                        })
                    }, o.inject = o.reduce, o.foldl = o.reduce, o.reduceRight = function (t, e, r, i) {
                        var n = h(t, function (t) {
                            return t
                        }).reverse();
                        o.reduce(n, e, r, i)
                    }, o.foldr = o.reduceRight;
                    var _ = function (t, e, r, i) {
                        var n = [];
                        t(e = h(e, function (t, e) {
                            return {index: e, value: t}
                        }), function (t, e) {
                            r(t.value, function (r) {
                                r && n.push(t), e()
                            })
                        }, function (t) {
                            i(h(n.sort(function (t, e) {
                                return t.index - e.index
                            }), function (t) {
                                return t.value
                            }))
                        })
                    };
                    o.filter = d(_), o.filterSeries = m(_), o.select = o.filter, o.selectSeries = o.filterSeries;
                    var y = function (t, e, r, i) {
                        var n = [];
                        t(e = h(e, function (t, e) {
                            return {index: e, value: t}
                        }), function (t, e) {
                            r(t.value, function (r) {
                                r || n.push(t), e()
                            })
                        }, function (t) {
                            i(h(n.sort(function (t, e) {
                                return t.index - e.index
                            }), function (t) {
                                return t.value
                            }))
                        })
                    };
                    o.reject = d(y), o.rejectSeries = m(y);
                    var x = function (t, e, r, i) {
                        t(e, function (t, e) {
                            r(t, function (r) {
                                r ? (i(t), i = function () {
                                }) : e()
                            })
                        }, function (t) {
                            i()
                        })
                    };
                    o.detect = d(x), o.detectSeries = m(x), o.some = function (t, e, r) {
                        o.each(t, function (t, i) {
                            e(t, function (t) {
                                t && (r(!0), r = function () {
                                }), i()
                            })
                        }, function (t) {
                            r(!1)
                        })
                    }, o.any = o.some, o.every = function (t, e, r) {
                        o.each(t, function (t, i) {
                            e(t, function (t) {
                                t || (r(!1), r = function () {
                                }), i()
                            })
                        }, function (t) {
                            r(!0)
                        })
                    }, o.all = o.every, o.sortBy = function (t, e, r) {
                        o.map(t, function (t, r) {
                            e(t, function (e, i) {
                                e ? r(e) : r(null, {value: t, criteria: i})
                            })
                        }, function (t, e) {
                            if (t) return r(t);
                            r(null, h(e.sort(function (t, e) {
                                var r = t.criteria, i = e.criteria;
                                return r < i ? -1 : r > i ? 1 : 0
                            }), function (t) {
                                return t.value
                            }))
                        })
                    }, o.auto = function (t, e) {
                        e = e || function () {
                        };
                        var r = c(t), i = r.length;
                        if (!i) return e();
                        var n = {}, s = [], h = function (t) {
                            s.unshift(t)
                        }, p = function (t) {
                            for (var e = 0; e < s.length; e += 1) if (s[e] === t) return void s.splice(e, 1)
                        }, d = function () {
                            i--, l(s.slice(0), function (t) {
                                t()
                            })
                        };
                        h(function () {
                            if (!i) {
                                var t = e;
                                e = function () {
                                }, t(null, n)
                            }
                        }), l(r, function (r) {
                            var i = a(t[r]) ? t[r] : [t[r]], s = function (t) {
                                var i = Array.prototype.slice.call(arguments, 1);
                                if (i.length <= 1 && (i = i[0]), t) {
                                    var s = {};
                                    l(c(n), function (t) {
                                        s[t] = n[t]
                                    }), s[r] = i, e(t, s), e = function () {
                                    }
                                } else n[r] = i, o.setImmediate(d)
                            }, f = i.slice(0, Math.abs(i.length - 1)) || [], m = function () {
                                return u(f, function (t, e) {
                                    return t && n.hasOwnProperty(e)
                                }, !0) && !n.hasOwnProperty(r)
                            };
                            if (m()) i[i.length - 1](s, n); else {
                                var g = function () {
                                    m() && (p(g), i[i.length - 1](s, n))
                                };
                                h(g)
                            }
                        })
                    }, o.retry = function (t, e, r) {
                        var i = [];
                        "function" == typeof t && (r = e, e = t, t = 5), t = parseInt(t, 10) || 5;
                        var n = function (n, s) {
                            for (; t;) i.push(function (t, e) {
                                return function (r) {
                                    t(function (t, i) {
                                        r(!t || e, {err: t, result: i})
                                    }, s)
                                }
                            }(e, !(t -= 1)));
                            o.series(i, function (t, e) {
                                e = e[e.length - 1], (n || r)(e.err, e.result)
                            })
                        };
                        return r ? n() : n
                    }, o.waterfall = function (t, e) {
                        if (e = e || function () {
                        }, !a(t)) {
                            var r = new Error("First argument to waterfall must be an array of functions");
                            return e(r)
                        }
                        if (!t.length) return e();
                        var i = function (t) {
                            return function (r) {
                                if (r) e.apply(null, arguments), e = function () {
                                }; else {
                                    var n = Array.prototype.slice.call(arguments, 1), s = t.next();
                                    s ? n.push(i(s)) : n.push(e), o.setImmediate(function () {
                                        t.apply(null, n)
                                    })
                                }
                            }
                        };
                        i(o.iterator(t))()
                    };
                    var b = function (t, e, r) {
                        if (r = r || function () {
                        }, a(e)) t.map(e, function (t, e) {
                            t && t(function (t) {
                                var r = Array.prototype.slice.call(arguments, 1);
                                r.length <= 1 && (r = r[0]), e.call(null, t, r)
                            })
                        }, r); else {
                            var i = {};
                            t.each(c(e), function (t, r) {
                                e[t](function (e) {
                                    var n = Array.prototype.slice.call(arguments, 1);
                                    n.length <= 1 && (n = n[0]), i[t] = n, r(e)
                                })
                            }, function (t) {
                                r(t, i)
                            })
                        }
                    };
                    o.parallel = function (t, e) {
                        b({map: o.map, each: o.each}, t, e)
                    }, o.parallelLimit = function (t, e, r) {
                        b({map: v(e), each: p(e)}, t, r)
                    }, o.series = function (t, e) {
                        if (e = e || function () {
                        }, a(t)) o.mapSeries(t, function (t, e) {
                            t && t(function (t) {
                                var r = Array.prototype.slice.call(arguments, 1);
                                r.length <= 1 && (r = r[0]), e.call(null, t, r)
                            })
                        }, e); else {
                            var r = {};
                            o.eachSeries(c(t), function (e, i) {
                                t[e](function (t) {
                                    var n = Array.prototype.slice.call(arguments, 1);
                                    n.length <= 1 && (n = n[0]), r[e] = n, i(t)
                                })
                            }, function (t) {
                                e(t, r)
                            })
                        }
                    }, o.iterator = function (t) {
                        var e = function (r) {
                            var i = function () {
                                return t.length && t[r].apply(null, arguments), i.next()
                            };
                            return i.next = function () {
                                return r < t.length - 1 ? e(r + 1) : null
                            }, i
                        };
                        return e(0)
                    }, o.apply = function (t) {
                        var e = Array.prototype.slice.call(arguments, 1);
                        return function () {
                            return t.apply(null, e.concat(Array.prototype.slice.call(arguments)))
                        }
                    };
                    var T = function (t, e, r, i) {
                        var n = [];
                        t(e, function (t, e) {
                            r(t, function (t, r) {
                                n = n.concat(r || []), e(t)
                            })
                        }, function (t) {
                            i(t, n)
                        })
                    };
                    o.concat = d(T), o.concatSeries = m(T), o.whilst = function (t, e, r) {
                        t() ? e(function (i) {
                            if (i) return r(i);
                            o.whilst(t, e, r)
                        }) : r()
                    }, o.doWhilst = function (t, e, r) {
                        t(function (i) {
                            if (i) return r(i);
                            var n = Array.prototype.slice.call(arguments, 1);
                            e.apply(null, n) ? o.doWhilst(t, e, r) : r()
                        })
                    }, o.until = function (t, e, r) {
                        t() ? r() : e(function (i) {
                            if (i) return r(i);
                            o.until(t, e, r)
                        })
                    }, o.doUntil = function (t, e, r) {
                        t(function (i) {
                            if (i) return r(i);
                            var n = Array.prototype.slice.call(arguments, 1);
                            e.apply(null, n) ? r() : o.doUntil(t, e, r)
                        })
                    }, o.queue = function (t, e) {
                        function i(t, e, r, i) {
                            if (t.started || (t.started = !0), a(e) || (e = [e]), 0 == e.length) return o.setImmediate(function () {
                                t.drain && t.drain()
                            });
                            l(e, function (e) {
                                var n = {data: e, callback: "function" == typeof i ? i : null};
                                r ? t.tasks.unshift(n) : t.tasks.push(n), t.saturated && t.tasks.length === t.concurrency && t.saturated(), o.setImmediate(t.process)
                            })
                        }

                        void 0 === e && (e = 1);
                        var n = 0, s = {
                            tasks: [], concurrency: e, saturated: null, empty: null, drain: null, started: !1,
                            paused: !1, push: function (t, e) {
                                i(s, t, !1, e)
                            }, kill: function () {
                                s.drain = null, s.tasks = []
                            }, unshift: function (t, e) {
                                i(s, t, !0, e)
                            }, process: function () {
                                if (!s.paused && n < s.concurrency && s.tasks.length) {
                                    var e = s.tasks.shift();
                                    s.empty && 0 === s.tasks.length && s.empty(), n += 1;
                                    var i = r(function () {
                                        n -= 1, e.callback && e.callback.apply(e, arguments), s.drain && s.tasks.length + n === 0 && s.drain(), s.process()
                                    });
                                    t(e.data, i)
                                }
                            }, length: function () {
                                return s.tasks.length
                            }, running: function () {
                                return n
                            }, idle: function () {
                                return s.tasks.length + n === 0
                            }, pause: function () {
                                !0 !== s.paused && (s.paused = !0)
                            }, resume: function () {
                                if (!1 !== s.paused) {
                                    s.paused = !1;
                                    for (var t = 1; t <= s.concurrency; t++) o.setImmediate(s.process)
                                }
                            }
                        };
                        return s
                    }, o.priorityQueue = function (t, e) {
                        function r(t, e) {
                            return t.priority - e.priority
                        }

                        function i(t, e, r) {
                            for (var i = -1, n = t.length - 1; i < n;) {
                                var o = i + (n - i + 1 >>> 1);
                                r(e, t[o]) >= 0 ? i = o : n = o - 1
                            }
                            return i
                        }

                        function n(t, e, n, s) {
                            if (t.started || (t.started = !0), a(e) || (e = [e]), 0 == e.length) return o.setImmediate(function () {
                                t.drain && t.drain()
                            });
                            l(e, function (e) {
                                var a = {data: e, priority: n, callback: "function" == typeof s ? s : null};
                                t.tasks.splice(i(t.tasks, a, r) + 1, 0, a), t.saturated && t.tasks.length === t.concurrency && t.saturated(), o.setImmediate(t.process)
                            })
                        }

                        var s = o.queue(t, e);
                        return s.push = function (t, e, r) {
                            n(s, t, e, r)
                        }, delete s.unshift, s
                    }, o.cargo = function (t, e) {
                        var r = !1, i = [], n = {
                            tasks: i, payload: e, saturated: null, empty: null, drain: null, drained: !0,
                            push: function (t, r) {
                                a(t) || (t = [t]), l(t, function (t) {
                                    i.push({
                                        data: t, callback: "function" == typeof r ? r : null
                                    }), n.drained = !1, n.saturated && i.length === e && n.saturated()
                                }), o.setImmediate(n.process)
                            }, process: function o() {
                                if (!r) {
                                    if (0 === i.length) return n.drain && !n.drained && n.drain(), void(n.drained = !0);
                                    var s = "number" == typeof e ? i.splice(0, e) : i.splice(0, i.length),
                                        a = h(s, function (t) {
                                            return t.data
                                        });
                                    n.empty && n.empty(), r = !0, t(a, function () {
                                        r = !1;
                                        var t = arguments;
                                        l(s, function (e) {
                                            e.callback && e.callback.apply(null, t)
                                        }), o()
                                    })
                                }
                            }, length: function () {
                                return i.length
                            }, running: function () {
                                return r
                            }
                        };
                        return n
                    };
                    var w = function (t) {
                        return function (e) {
                            var r = Array.prototype.slice.call(arguments, 1);
                            e.apply(null, r.concat([function (e) {
                                var r = Array.prototype.slice.call(arguments, 1);
                                "undefined" != typeof console && (e ? console.error && console.error(e) : console[t] && l(r, function (e) {
                                    console[t](e)
                                }))
                            }]))
                        }
                    };
                    o.log = w("log"), o.dir = w("dir"), o.memoize = function (t, e) {
                        var r = {}, i = {};
                        e = e || function (t) {
                            return t
                        };
                        var n = function () {
                            var n = Array.prototype.slice.call(arguments), s = n.pop(), a = e.apply(null, n);
                            a in r ? o.nextTick(function () {
                                s.apply(null, r[a])
                            }) : a in i ? i[a].push(s) : (i[a] = [s], t.apply(null, n.concat([function () {
                                r[a] = arguments;
                                var t = i[a];
                                delete i[a];
                                for (var e = 0, n = t.length; e < n; e++) t[e].apply(null, arguments)
                            }])))
                        };
                        return n.memo = r, n.unmemoized = t, n
                    }, o.unmemoize = function (t) {
                        return function () {
                            return (t.unmemoized || t).apply(null, arguments)
                        }
                    }, o.times = function (t, e, r) {
                        for (var i = [], n = 0; n < t; n++) i.push(n);
                        return o.map(i, e, r)
                    }, o.timesSeries = function (t, e, r) {
                        for (var i = [], n = 0; n < t; n++) i.push(n);
                        return o.mapSeries(i, e, r)
                    }, o.seq = function () {
                        var t = arguments;
                        return function () {
                            var e = this, r = Array.prototype.slice.call(arguments), i = r.pop();
                            o.reduce(t, r, function (t, r, i) {
                                r.apply(e, t.concat([function () {
                                    var t = arguments[0], e = Array.prototype.slice.call(arguments, 1);
                                    i(t, e)
                                }]))
                            }, function (t, r) {
                                i.apply(e, [t].concat(r))
                            })
                        }
                    }, o.compose = function () {
                        return o.seq.apply(null, Array.prototype.reverse.call(arguments))
                    };
                    var E = function (t, e) {
                        var r = function () {
                            var r = this, i = Array.prototype.slice.call(arguments), n = i.pop();
                            return t(e, function (t, e) {
                                t.apply(r, i.concat([e]))
                            }, n)
                        };
                        if (arguments.length > 2) {
                            var i = Array.prototype.slice.call(arguments, 2);
                            return r.apply(this, i)
                        }
                        return r
                    };
                    o.applyEach = d(E), o.applyEachSeries = m(E), o.forever = function (t, e) {
                        function r(i) {
                            if (i) {
                                if (e) return e(i);
                                throw i
                            }
                            t(r)
                        }

                        r()
                    }, void 0 !== e && e.exports ? e.exports = o : i.async = o
                }()
            }).call(this, t("_process"))
        }, {_process: 3}], 13: [function (t, e, r) {
            function i(t, e) {
                a.call(this), e = e || 10, this.baseUrl = t || "", this.progress = 0, this.loading = !1, this._progressChunk = 0, this._beforeMiddleware = [], this._afterMiddleware = [], this._boundLoadResource = this._loadResource.bind(this), this._boundOnLoad = this._onLoad.bind(this), this._buffer = [], this._numToLoad = 0, this._queue = n.queue(this._boundLoadResource, e), this.resources = {}
            }

            var n = t("async"), o = t("url"), s = t("./Resource"), a = t("eventemitter3");
            (i.prototype = Object.create(a.prototype)).constructor = i, e.exports = i, i.prototype.add = i.prototype.enqueue = function (t, e, r, i) {
                if (Array.isArray(t)) {
                    for (var n = 0; n < t.length; ++n) this.add(t[n]);
                    return this
                }
                if ("object" == typeof t && (i = e || t.callback || t.onComplete, r = t, e = t.url, t = t.name || t.key || t.url), "string" != typeof e && (i = r, r = e, e = t), "string" != typeof e) throw new Error("No url passed to add resource to loader.");
                if ("function" == typeof r && (i = r, r = null), this.resources[t]) throw new Error('Resource with name "' + t + '" already exists.');
                return e = this._handleBaseUrl(e), this.resources[t] = new s(t, e, r), "function" == typeof i && this.resources[t].once("afterMiddleware", i), this._numToLoad++, this._queue.started ? (this._queue.push(this.resources[t]), this._progressChunk = (100 - this.progress) / (this._queue.length() + this._queue.running())) : (this._buffer.push(this.resources[t]), this._progressChunk = 100 / this._buffer.length), this
            }, i.prototype._handleBaseUrl = function (t) {
                var e = o.parse(t);
                return e.protocol || 0 === e.pathname.indexOf("//") ? t : this.baseUrl.length && this.baseUrl.lastIndexOf("/") !== this.baseUrl.length - 1 && "/" !== t.charAt(0) ? this.baseUrl + "/" + t : this.baseUrl + t
            }, i.prototype.before = i.prototype.pre = function (t) {
                return this._beforeMiddleware.push(t), this
            }, i.prototype.after = i.prototype.use = function (t) {
                return this._afterMiddleware.push(t), this
            }, i.prototype.reset = function () {
                this.progress = 0, this.loading = !1, this._progressChunk = 0, this._buffer.length = 0, this._numToLoad = 0, this._queue.kill(), this._queue.started = !1, this.resources = {}
            }, i.prototype.load = function (t) {
                if ("function" == typeof t && this.once("complete", t), this._queue.started) return this;
                this.emit("start", this);
                for (var e = 0; e < this._buffer.length; ++e) this._queue.push(this._buffer[e]);
                return this._buffer.length = 0, this
            }, i.prototype._loadResource = function (t, e) {
                var r = this;
                t._dequeue = e, this._runMiddleware(t, this._beforeMiddleware, function () {
                    t.load(r._boundOnLoad)
                })
            }, i.prototype._onComplete = function () {
                this.emit("complete", this, this.resources)
            }, i.prototype._onLoad = function (t) {
                this.progress += this._progressChunk, this.emit("progress", this, t), this._runMiddleware(t, this._afterMiddleware, function () {
                    t.emit("afterMiddleware", t), 0 === --this._numToLoad && (this.progress = 100, this._onComplete()), t.error ? this.emit("error", t.error, this, t) : this.emit("load", this, t)
                }), t._dequeue()
            }, i.prototype._runMiddleware = function (t, e, r) {
                var i = this;
                n.eachSeries(e, function (e, r) {
                    e.call(i, t, r)
                }, r.bind(this, t))
            }, i.LOAD_TYPE = s.LOAD_TYPE, i.XHR_READY_STATE = s.XHR_READY_STATE, i.XHR_RESPONSE_TYPE = s.XHR_RESPONSE_TYPE
        }, {"./Resource": 14, async: 12, eventemitter3: 10, url: 8}], 14: [function (t, e, r) {
            function i(t, e, r) {
                if (s.call(this), r = r || {}, "string" != typeof t || "string" != typeof e) throw new Error("Both name and url are required for constructing a resource.");
                this.name = t, this.url = e, this.isDataUrl = 0 === this.url.indexOf("data:"), this.data = null, this.crossOrigin = !0 === r.crossOrigin ? "anonymous" : r.crossOrigin, this.loadType = r.loadType || this._determineLoadType(), this.xhrType = r.xhrType, this.metadata = r.metadata || {}, this.error = null, this.xhr = null, this.isJson = !1, this.isXml = !1, this.isImage = !1, this.isAudio = !1, this.isVideo = !1, this._dequeue = null, this._boundComplete = this.complete.bind(this), this._boundOnError = this._onError.bind(this), this._boundOnProgress = this._onProgress.bind(this), this._boundXhrOnError = this._xhrOnError.bind(this), this._boundXhrOnAbort = this._xhrOnAbort.bind(this), this._boundXhrOnLoad = this._xhrOnLoad.bind(this), this._boundXdrOnTimeout = this._xdrOnTimeout.bind(this)
            }

            function n(t) {
                return t.toString().replace("object ", "")
            }

            function o(t, e, r) {
                e && 0 === e.indexOf(".") && (e = e.substring(1)), e && (t[e] = r)
            }

            var s = t("eventemitter3"), a = t("url"),
                l = !(!window.XDomainRequest || "withCredentials" in new XMLHttpRequest), h = null;
            (i.prototype = Object.create(s.prototype)).constructor = i, e.exports = i, i.prototype.complete = function () {
                this.data && this.data.removeEventListener && (this.data.removeEventListener("error", this._boundOnError), this.data.removeEventListener("load", this._boundComplete), this.data.removeEventListener("progress", this._boundOnProgress), this.data.removeEventListener("canplaythrough", this._boundComplete)), this.xhr && (this.xhr.removeEventListener ? (this.xhr.removeEventListener("error", this._boundXhrOnError), this.xhr.removeEventListener("abort", this._boundXhrOnAbort), this.xhr.removeEventListener("progress", this._boundOnProgress), this.xhr.removeEventListener("load", this._boundXhrOnLoad)) : (this.xhr.onerror = null, this.xhr.ontimeout = null, this.xhr.onprogress = null, this.xhr.onload = null)), this.emit("complete", this)
            }, i.prototype.load = function (t) {
                switch (this.emit("start", this), t && this.once("complete", t), !1 !== this.crossOrigin && "string" == typeof this.crossOrigin || (this.crossOrigin = this._determineCrossOrigin(this.url)), this.loadType) {
                    case i.LOAD_TYPE.IMAGE:
                        this._loadImage();
                        break;
                    case i.LOAD_TYPE.AUDIO:
                        this._loadElement("audio");
                        break;
                    case i.LOAD_TYPE.VIDEO:
                        this._loadElement("video");
                        break;
                    case i.LOAD_TYPE.XHR:
                    default:
                        l && this.crossOrigin ? this._loadXdr() : this._loadXhr()
                }
            }, i.prototype._loadImage = function () {
                this.data = new Image, this.crossOrigin && (this.data.crossOrigin = this.crossOrigin), this.data.src = this.url, this.isImage = !0, this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1)
            }, i.prototype._loadElement = function (t) {
                if ("audio" === t && "undefined" != typeof Audio ? this.data = new Audio : this.data = document.createElement(t), null === this.data) return this.error = new Error("Unsupported element " + t), void this.complete();
                if (navigator.isCocoonJS) this.data.src = Array.isArray(this.url) ? this.url[0] : this.url; else if (Array.isArray(this.url)) for (var e = 0; e < this.url.length; ++e) this.data.appendChild(this._createSource(t, this.url[e])); else this.data.appendChild(this._createSource(t, this.url));
                this["is" + t[0].toUpperCase() + t.substring(1)] = !0, this.data.addEventListener("error", this._boundOnError, !1), this.data.addEventListener("load", this._boundComplete, !1), this.data.addEventListener("progress", this._boundOnProgress, !1), this.data.addEventListener("canplaythrough", this._boundComplete, !1), this.data.load()
            }, i.prototype._loadXhr = function () {
                "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                var t = this.xhr = new XMLHttpRequest;
                t.open("GET", this.url, !0), this.xhrType === i.XHR_RESPONSE_TYPE.JSON || this.xhrType === i.XHR_RESPONSE_TYPE.DOCUMENT ? t.responseType = i.XHR_RESPONSE_TYPE.TEXT : t.responseType = this.xhrType, t.addEventListener("error", this._boundXhrOnError, !1), t.addEventListener("abort", this._boundXhrOnAbort, !1), t.addEventListener("progress", this._boundOnProgress, !1), t.addEventListener("load", this._boundXhrOnLoad, !1), t.send()
            }, i.prototype._loadXdr = function () {
                "string" != typeof this.xhrType && (this.xhrType = this._determineXhrType());
                var t = this.xhr = new XDomainRequest;
                t.timeout = 5e3, t.onerror = this._boundXhrOnError, t.ontimeout = this._boundXdrOnTimeout, t.onprogress = this._boundOnProgress, t.onload = this._boundXhrOnLoad, t.open("GET", this.url, !0), setTimeout(function () {
                    t.send()
                }, 0)
            }, i.prototype._createSource = function (t, e, r) {
                r || (r = t + "/" + e.substr(e.lastIndexOf(".") + 1));
                var i = document.createElement("source");
                return i.src = e, i.type = r, i
            }, i.prototype._onError = function (t) {
                this.error = new Error("Failed to load element using " + t.target.nodeName), this.complete()
            }, i.prototype._onProgress = function (t) {
                t && t.lengthComputable && this.emit("progress", this, t.loaded / t.total)
            }, i.prototype._xhrOnError = function () {
                this.error = new Error(n(this.xhr) + " Request failed. Status: " + this.xhr.status + ', text: "' + this.xhr.statusText + '"'), this.complete()
            }, i.prototype._xhrOnAbort = function () {
                this.error = new Error(n(this.xhr) + " Request was aborted by the user."), this.complete()
            }, i.prototype._xdrOnTimeout = function () {
                this.error = new Error(n(this.xhr) + " Request timed out."), this.complete()
            }, i.prototype._xhrOnLoad = function () {
                var t = this.xhr, e = void 0 !== t.status ? t.status : 200;
                if (200 === e || 204 === e || 0 === e && t.responseText.length > 0) if (this.xhrType === i.XHR_RESPONSE_TYPE.TEXT) this.data = t.responseText; else if (this.xhrType === i.XHR_RESPONSE_TYPE.JSON) try {
                    this.data = JSON.parse(t.responseText), this.isJson = !0
                } catch (t) {
                    this.error = new Error("Error trying to parse loaded json:", t)
                } else if (this.xhrType === i.XHR_RESPONSE_TYPE.DOCUMENT) try {
                    if (window.DOMParser) {
                        var r = new DOMParser;
                        this.data = r.parseFromString(t.responseText, "text/xml")
                    } else {
                        var n = document.createElement("div");
                        n.innerHTML = t.responseText, this.data = n
                    }
                    this.isXml = !0
                } catch (t) {
                    this.error = new Error("Error trying to parse loaded xml:", t)
                } else this.data = t.response || t.responseText; else this.error = new Error("[" + t.status + "]" + t.statusText + ":" + t.responseURL);
                this.complete()
            }, i.prototype._determineCrossOrigin = function (t, e) {
                if (0 === t.indexOf("data:")) return "";
                e = e || window.location, h || (h = document.createElement("a")), h.href = t;
                var r = !(t = a.parse(h.href)).port && "" === e.port || t.port === e.port;
                return t.hostname === e.hostname && r && t.protocol === e.protocol ? "" : "anonymous"
            }, i.prototype._determineXhrType = function () {
                return i._xhrTypeMap[this._getExtension()] || i.XHR_RESPONSE_TYPE.TEXT
            }, i.prototype._determineLoadType = function () {
                return i._loadTypeMap[this._getExtension()] || i.LOAD_TYPE.XHR
            }, i.prototype._getExtension = function () {
                var t, e = this.url;
                if (this.isDataUrl) {
                    var r = e.indexOf("/");
                    t = e.substring(r + 1, e.indexOf(";", r))
                } else {
                    var i = e.indexOf("?");
                    -1 !== i && (e = e.substring(0, i)), t = e.substring(e.lastIndexOf(".") + 1)
                }
                return t
            }, i.prototype._getMimeFromXhrType = function (t) {
                switch (t) {
                    case i.XHR_RESPONSE_TYPE.BUFFER:
                        return "application/octet-binary";
                    case i.XHR_RESPONSE_TYPE.BLOB:
                        return "application/blob";
                    case i.XHR_RESPONSE_TYPE.DOCUMENT:
                        return "application/xml";
                    case i.XHR_RESPONSE_TYPE.JSON:
                        return "application/json";
                    case i.XHR_RESPONSE_TYPE.DEFAULT:
                    case i.XHR_RESPONSE_TYPE.TEXT:
                    default:
                        return "text/plain"
                }
            }, i.LOAD_TYPE = {XHR: 1, IMAGE: 2, AUDIO: 3, VIDEO: 4}, i.XHR_READY_STATE = {
                UNSENT: 0, OPENED: 1, HEADERS_RECEIVED: 2, LOADING: 3, DONE: 4
            }, i.XHR_RESPONSE_TYPE = {
                DEFAULT: "text", BUFFER: "arraybuffer", BLOB: "blob", DOCUMENT: "document", JSON: "json", TEXT: "text"
            }, i._loadTypeMap = {
                gif: i.LOAD_TYPE.IMAGE, png: i.LOAD_TYPE.IMAGE, bmp: i.LOAD_TYPE.IMAGE, jpg: i.LOAD_TYPE.IMAGE,
                jpeg: i.LOAD_TYPE.IMAGE, tif: i.LOAD_TYPE.IMAGE, tiff: i.LOAD_TYPE.IMAGE, webp: i.LOAD_TYPE.IMAGE,
                tga: i.LOAD_TYPE.IMAGE
            }, i._xhrTypeMap = {
                xhtml: i.XHR_RESPONSE_TYPE.DOCUMENT, html: i.XHR_RESPONSE_TYPE.DOCUMENT,
                htm: i.XHR_RESPONSE_TYPE.DOCUMENT, xml: i.XHR_RESPONSE_TYPE.DOCUMENT, tmx: i.XHR_RESPONSE_TYPE.DOCUMENT,
                tsx: i.XHR_RESPONSE_TYPE.DOCUMENT, svg: i.XHR_RESPONSE_TYPE.DOCUMENT, gif: i.XHR_RESPONSE_TYPE.BLOB,
                png: i.XHR_RESPONSE_TYPE.BLOB, bmp: i.XHR_RESPONSE_TYPE.BLOB, jpg: i.XHR_RESPONSE_TYPE.BLOB,
                jpeg: i.XHR_RESPONSE_TYPE.BLOB, tif: i.XHR_RESPONSE_TYPE.BLOB, tiff: i.XHR_RESPONSE_TYPE.BLOB,
                webp: i.XHR_RESPONSE_TYPE.BLOB, tga: i.XHR_RESPONSE_TYPE.BLOB, json: i.XHR_RESPONSE_TYPE.JSON,
                text: i.XHR_RESPONSE_TYPE.TEXT, txt: i.XHR_RESPONSE_TYPE.TEXT
            }, i.setExtensionLoadType = function (t, e) {
                o(i._loadTypeMap, t, e)
            }, i.setExtensionXhrType = function (t, e) {
                o(i._xhrTypeMap, t, e)
            }
        }, {eventemitter3: 10, url: 8}], 15: [function (t, e, r) {
            e.exports = {
                _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                encodeBinary: function (t) {
                    var e, r = "", i = [];
                    i.length = 4;
                    for (var n = 0, o = 0; n < t.length;) {
                        for ((e = []).length = 3, o = 0; o < e.length; o++) n < t.length ? e[o] = 255 & t.charCodeAt(n++) : e[o] = 0;
                        switch (i[0] = e[0] >> 2, i[1] = (3 & e[0]) << 4 | e[1] >> 4, i[2] = (15 & e[1]) << 2 | e[2] >> 6, i[3] = 63 & e[2], n - (t.length - 1)) {
                            case 2:
                                i[3] = 64, i[2] = 64;
                                break;
                            case 1:
                                i[3] = 64
                        }
                        for (o = 0; o < i.length; o++) r += this._keyStr.charAt(i[o])
                    }
                    return r
                }
            }
        }, {}], 16: [function (t, e, r) {
            e.exports = t("./Loader"), e.exports.Resource = t("./Resource"), e.exports.middleware = {
                caching: {memory: t("./middlewares/caching/memory")}, parsing: {blob: t("./middlewares/parsing/blob")}
            }
        }, {"./Loader": 13, "./Resource": 14, "./middlewares/caching/memory": 17, "./middlewares/parsing/blob": 18}],
        17: [function (t, e, r) {
            var i = {};
            e.exports = function () {
                return function (t, e) {
                    i[t.url] ? (t.data = i[t.url], t.complete()) : t.once("complete", function () {
                        i[this.url] = this.data
                    }), e()
                }
            }
        }, {}], 18: [function (t, e, r) {
            var i = t("../../Resource"), n = t("../../b64");
            window.URL = window.URL || window.webkitURL, e.exports = function () {
                return function (t, e) {
                    if (!t.data) return e();
                    if (t.xhr && t.xhrType === i.XHR_RESPONSE_TYPE.BLOB) if (window.Blob && "string" != typeof t.data) {
                        if (0 === t.data.type.indexOf("image")) {
                            var r = URL.createObjectURL(t.data);
                            t.blob = t.data, t.data = new Image, t.data.src = r, t.isImage = !0, t.data.onload = function () {
                                URL.revokeObjectURL(r), t.data.onload = null, e()
                            }
                        }
                    } else {
                        var o = t.xhr.getResponseHeader("content-type");
                        o && 0 === o.indexOf("image") && (t.data = new Image, t.data.src = "data:" + o + ";base64," + n.encodeBinary(t.xhr.responseText), t.isImage = !0, t.data.onload = function () {
                            t.data.onload = null, e()
                        })
                    } else e()
                }
            }
        }, {"../../Resource": 14, "../../b64": 15}], 19: [function (t, e, r) {
            function i(t) {
                var e = document.createElement("div");
                e.style.width = "100px", e.style.height = "100px", e.style.position = "absolute", e.style.top = 0, e.style.left = 0, e.style.zIndex = 2, this.div = e, this.pool = [], this.renderId = 0, this.debug = !1, this.renderer = t, this.children = [], this._onKeyDown = this._onKeyDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this.isActive = !1, window.addEventListener("keydown", this._onKeyDown, !1)
            }

            var n = t("../core");
            Object.assign(n.DisplayObject.prototype, t("./accessibleTarget")), i.prototype.constructor = i, e.exports = i, i.prototype.activate = function () {
                this.isActive || (this.isActive = !0, window.document.addEventListener("mousemove", this._onMouseMove, !0), window.removeEventListener("keydown", this._onKeyDown, !1), this.renderer.on("postrender", this.update, this), this.renderer.view.parentNode.appendChild(this.div))
            }, i.prototype.deactivate = function () {
                this.isActive && (this.isActive = !1, window.document.removeEventListener("mousemove", this._onMouseMove), window.addEventListener("keydown", this._onKeyDown, !1), this.renderer.off("postrender", this.update), this.div.parentNode.removeChild(this.div))
            }, i.prototype.updateAccessibleObjects = function (t) {
                if (t.visible && (t.accessible && t.interactive && (t._accessibleActive || this.addChild(t), t.renderId = this.renderId), t.interactiveChildren)) for (var e = t.children, r = e.length - 1; r >= 0; r--) this.updateAccessibleObjects(e[r])
            }, i.prototype.update = function () {
                this.updateAccessibleObjects(this.renderer._lastObjectRendered);
                var t = this.renderer.view.getBoundingClientRect(), e = t.width / this.renderer.width,
                    r = t.height / this.renderer.height, i = this.div;
                i.style.left = t.left + "px", i.style.top = t.top + "px", i.style.width = this.renderer.width + "px", i.style.height = this.renderer.height + "px";
                for (var o = 0; o < this.children.length; o++) {
                    var s = this.children[o];
                    if (s.renderId !== this.renderId) s._accessibleActive = !1, n.utils.removeItems(this.children, o, 1), this.div.removeChild(s._accessibleDiv), this.pool.push(s._accessibleDiv), s._accessibleDiv = null, o--, 0 === this.children.length && this.deactivate(); else {
                        i = s._accessibleDiv;
                        var a = s.hitArea, l = s.worldTransform;
                        s.hitArea ? (i.style.left = (l.tx + a.x * l.a) * e + "px", i.style.top = (l.ty + a.y * l.d) * r + "px", i.style.width = a.width * l.a * e + "px", i.style.height = a.height * l.d * r + "px") : (a = s.getBounds(), this.capHitArea(a), i.style.left = a.x * e + "px", i.style.top = a.y * r + "px", i.style.width = a.width * e + "px", i.style.height = a.height * r + "px")
                    }
                }
                this.renderId++
            }, i.prototype.capHitArea = function (t) {
                t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0), t.x + t.width > this.renderer.width && (t.width = this.renderer.width - t.x), t.y + t.height > this.renderer.height && (t.height = this.renderer.height - t.y)
            }, i.prototype.addChild = function (t) {
                var e = this.pool.pop();
                e || ((e = document.createElement("button")).style.width = "100px", e.style.height = "100px", e.style.backgroundColor = this.debug ? "rgba(255,0,0,0.5)" : "transparent", e.style.position = "absolute", e.style.zIndex = 2, e.style.borderStyle = "none", e.addEventListener("click", this._onClick.bind(this)), e.addEventListener("focus", this._onFocus.bind(this)), e.addEventListener("focusout", this._onFocusOut.bind(this))), e.title = t.accessibleTitle || "displayObject " + this.tabIndex, t._accessibleActive = !0, t._accessibleDiv = e, e.displayObject = t, this.children.push(t), this.div.appendChild(t._accessibleDiv), t._accessibleDiv.tabIndex = t.tabIndex
            }, i.prototype._onClick = function (t) {
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "click", e.eventData)
            }, i.prototype._onFocus = function (t) {
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "mouseover", e.eventData)
            }, i.prototype._onFocusOut = function (t) {
                var e = this.renderer.plugins.interaction;
                e.dispatchEvent(t.target.displayObject, "mouseout", e.eventData)
            }, i.prototype._onKeyDown = function (t) {
                9 === t.keyCode && this.activate()
            }, i.prototype._onMouseMove = function () {
                this.deactivate()
            }, i.prototype.destroy = function () {
                this.div = null;
                for (var t = 0; t < this.children.length; t++) this.children[t].div = null;
                window.document.removeEventListener("mousemove", this._onMouseMove), window.removeEventListener("keydown", this._onKeyDown), this.pool = null, this.children = null, this.renderer = null
            }, n.WebGLRenderer.registerPlugin("accessibility", i), n.CanvasRenderer.registerPlugin("accessibility", i)
        }, {"../core": 29, "./accessibleTarget": 20}], 20: [function (t, e, r) {
            var i = {accessible: !1, accessibleTitle: null, tabIndex: 0, _accessibleActive: !1, _accessibleDiv: !1};
            e.exports = i
        }, {}], 21: [function (t, e, r) {
            e.exports = {accessibleTarget: t("./accessibleTarget"), AccessibilityManager: t("./AccessibilityManager")}
        }, {"./AccessibilityManager": 19, "./accessibleTarget": 20}], 22: [function (t, e, r) {
            var i = {
                VERSION: "3.0.11", PI_2: 2 * Math.PI, RAD_TO_DEG: 180 / Math.PI, DEG_TO_RAD: Math.PI / 180,
                TARGET_FPMS: .06, RENDERER_TYPE: {UNKNOWN: 0, WEBGL: 1, CANVAS: 2}, BLEND_MODES: {
                    NORMAL: 0, ADD: 1, MULTIPLY: 2, SCREEN: 3, OVERLAY: 4, DARKEN: 5, LIGHTEN: 6, COLOR_DODGE: 7,
                    COLOR_BURN: 8, HARD_LIGHT: 9, SOFT_LIGHT: 10, DIFFERENCE: 11, EXCLUSION: 12, HUE: 13,
                    SATURATION: 14, COLOR: 15, LUMINOSITY: 16
                }, DRAW_MODES: {
                    POINTS: 0, LINES: 1, LINE_LOOP: 2, LINE_STRIP: 3, TRIANGLES: 4, TRIANGLE_STRIP: 5, TRIANGLE_FAN: 6
                }, SCALE_MODES: {DEFAULT: 0, LINEAR: 0, NEAREST: 1}, RETINA_PREFIX: /@(.+)x/, RESOLUTION: 1,
                FILTER_RESOLUTION: 1, DEFAULT_RENDER_OPTIONS: {
                    view: null, resolution: 1, antialias: !1, forceFXAA: !1, autoResize: !1, transparent: !1,
                    backgroundColor: 0, clearBeforeRender: !0, preserveDrawingBuffer: !1, roundPixels: !1
                }, SHAPES: {POLY: 0, RECT: 1, CIRC: 2, ELIP: 3, RREC: 4}, SPRITE_BATCH_SIZE: 2e3
            };
            e.exports = i
        }, {}], 23: [function (t, e, r) {
            function i() {
                s.call(this), this.children = []
            }

            var n = t("../math"), o = t("../utils"), s = t("./DisplayObject"), a = t("../textures/RenderTexture"),
                l = new n.Matrix;
            (i.prototype = Object.create(s.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                width: {
                    get: function () {
                        return this.scale.x * this.getLocalBounds().width
                    }, set: function (t) {
                        var e = this.getLocalBounds().width;
                        this.scale.x = 0 !== e ? t / e : 1, this._width = t
                    }
                }, height: {
                    get: function () {
                        return this.scale.y * this.getLocalBounds().height
                    }, set: function (t) {
                        var e = this.getLocalBounds().height;
                        this.scale.y = 0 !== e ? t / e : 1, this._height = t
                    }
                }
            }), i.prototype.onChildrenChange = function () {
            }, i.prototype.addChild = function (t) {
                var e = arguments.length;
                if (e > 1) for (var r = 0; r < e; r++) this.addChild(arguments[r]); else t.parent && t.parent.removeChild(t), t.parent = this, this.children.push(t), this.onChildrenChange(this.children.length - 1), t.emit("added", this);
                return t
            }, i.prototype.addChildAt = function (t, e) {
                if (e >= 0 && e <= this.children.length) return t.parent && t.parent.removeChild(t), t.parent = this, this.children.splice(e, 0, t), this.onChildrenChange(e), t.emit("added", this), t;
                throw new Error(t + "addChildAt: The index " + e + " supplied is out of bounds " + this.children.length)
            }, i.prototype.swapChildren = function (t, e) {
                if (t !== e) {
                    var r = this.getChildIndex(t), i = this.getChildIndex(e);
                    if (r < 0 || i < 0) throw new Error("swapChildren: Both the supplied DisplayObjects must be children of the caller.");
                    this.children[r] = e, this.children[i] = t, this.onChildrenChange(r < i ? r : i)
                }
            }, i.prototype.getChildIndex = function (t) {
                var e = this.children.indexOf(t);
                if (-1 === e) throw new Error("The supplied DisplayObject must be a child of the caller");
                return e
            }, i.prototype.setChildIndex = function (t, e) {
                if (e < 0 || e >= this.children.length) throw new Error("The supplied index is out of bounds");
                var r = this.getChildIndex(t);
                o.removeItems(this.children, r, 1), this.children.splice(e, 0, t), this.onChildrenChange(e)
            }, i.prototype.getChildAt = function (t) {
                if (t < 0 || t >= this.children.length) throw new Error("getChildAt: Supplied index " + t + " does not exist in the child list, or the supplied DisplayObject is not a child of the caller");
                return this.children[t]
            }, i.prototype.removeChild = function (t) {
                var e = arguments.length;
                if (e > 1) for (var r = 0; r < e; r++) this.removeChild(arguments[r]); else {
                    var i = this.children.indexOf(t);
                    if (-1 === i) return;
                    t.parent = null, o.removeItems(this.children, i, 1), this.onChildrenChange(i), t.emit("removed", this)
                }
                return t
            }, i.prototype.removeChildAt = function (t) {
                var e = this.getChildAt(t);
                return e.parent = null, o.removeItems(this.children, t, 1), this.onChildrenChange(t), e.emit("removed", this), e
            }, i.prototype.removeChildren = function (t, e) {
                var r, i, n = t || 0, o = "number" == typeof e ? e : this.children.length, s = o - n;
                if (s > 0 && s <= o) {
                    for (r = this.children.splice(n, s), i = 0; i < r.length; ++i) r[i].parent = null;
                    for (this.onChildrenChange(t), i = 0; i < r.length; ++i) r[i].emit("removed", this);
                    return r
                }
                if (0 === s && 0 === this.children.length) return [];
                throw new RangeError("removeChildren: numeric values are outside the acceptable range.")
            }, i.prototype.generateTexture = function (t, e, r) {
                var i = this.getLocalBounds(), n = new a(t, 0 | i.width, 0 | i.height, r, e);
                return l.tx = -i.x, l.ty = -i.y, n.render(this, l), n
            }, i.prototype.updateTransform = function () {
                if (this.visible) {
                    this.displayObjectUpdateTransform();
                    for (var t = 0, e = this.children.length; t < e; ++t) this.children[t].updateTransform()
                }
            }, i.prototype.containerUpdateTransform = i.prototype.updateTransform, i.prototype.getBounds = function () {
                if (!this._currentBounds) {
                    if (0 === this.children.length) return n.Rectangle.EMPTY;
                    for (var t, e, r, i = 1 / 0, o = 1 / 0, s = -1 / 0, a = -1 / 0, l = !1, h = 0, u = this.children.length; h < u; ++h) this.children[h].visible && (l = !0, i = i < (t = this.children[h].getBounds()).x ? i : t.x, o = o < t.y ? o : t.y, e = t.width + t.x, r = t.height + t.y, s = s > e ? s : e, a = a > r ? a : r);
                    if (!l) return n.Rectangle.EMPTY;
                    var c = this._bounds;
                    c.x = i, c.y = o, c.width = s - i, c.height = a - o, this._currentBounds = c
                }
                return this._currentBounds
            }, i.prototype.containerGetBounds = i.prototype.getBounds, i.prototype.getLocalBounds = function () {
                var t = this.worldTransform;
                this.worldTransform = n.Matrix.IDENTITY;
                for (var e = 0, r = this.children.length; e < r; ++e) this.children[e].updateTransform();
                return this.worldTransform = t, this._currentBounds = null, this.getBounds(n.Matrix.IDENTITY)
            }, i.prototype.renderWebGL = function (t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.renderable) {
                    var e, r;
                    if (this._mask || this._filters) {
                        for (t.currentRenderer.flush(), this._filters && this._filters.length && t.filterManager.pushFilter(this, this._filters), this._mask && t.maskManager.pushMask(this, this._mask), t.currentRenderer.start(), this._renderWebGL(t), e = 0, r = this.children.length; e < r; e++) this.children[e].renderWebGL(t);
                        t.currentRenderer.flush(), this._mask && t.maskManager.popMask(this, this._mask), this._filters && t.filterManager.popFilter(), t.currentRenderer.start()
                    } else for (this._renderWebGL(t), e = 0, r = this.children.length; e < r; ++e) this.children[e].renderWebGL(t)
                }
            }, i.prototype._renderWebGL = function (t) {
            }, i.prototype._renderCanvas = function (t) {
            }, i.prototype.renderCanvas = function (t) {
                if (this.visible && !(this.alpha <= 0) && this.renderable) {
                    this._mask && t.maskManager.pushMask(this._mask, t), this._renderCanvas(t);
                    for (var e = 0, r = this.children.length; e < r; ++e) this.children[e].renderCanvas(t);
                    this._mask && t.maskManager.popMask(t)
                }
            }, i.prototype.destroy = function (t) {
                if (s.prototype.destroy.call(this), t) for (var e = 0, r = this.children.length; e < r; ++e) this.children[e].destroy(t);
                this.removeChildren(), this.children = null
            }
        }, {"../math": 33, "../textures/RenderTexture": 71, "../utils": 77, "./DisplayObject": 24}],
        24: [function (t, e, r) {
            function i() {
                s.call(this), this.position = new n.Point, this.scale = new n.Point(1, 1), this.pivot = new n.Point(0, 0), this.skew = new n.Point(0, 0), this.rotation = 0, this.alpha = 1, this.visible = !0, this.renderable = !0, this.parent = null, this.worldAlpha = 1, this.worldTransform = new n.Matrix, this.filterArea = null, this._sr = 0, this._cr = 1, this._bounds = new n.Rectangle(0, 0, 1, 1), this._currentBounds = null, this._mask = null
            }

            var n = t("../math"), o = t("../textures/RenderTexture"), s = t("eventemitter3"), a = t("../const"),
                l = new n.Matrix, h = {worldTransform: new n.Matrix, worldAlpha: 1, children: []};
            (i.prototype = Object.create(s.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                x: {
                    get: function () {
                        return this.position.x
                    }, set: function (t) {
                        this.position.x = t
                    }
                }, y: {
                    get: function () {
                        return this.position.y
                    }, set: function (t) {
                        this.position.y = t
                    }
                }, worldVisible: {
                    get: function () {
                        var t = this;
                        do {
                            if (!t.visible) return !1;
                            t = t.parent
                        } while (t);
                        return !0
                    }
                }, mask: {
                    get: function () {
                        return this._mask
                    }, set: function (t) {
                        this._mask && (this._mask.renderable = !0), this._mask = t, this._mask && (this._mask.renderable = !1)
                    }
                }, filters: {
                    get: function () {
                        return this._filters && this._filters.slice()
                    }, set: function (t) {
                        this._filters = t && t.slice()
                    }
                }
            }), i.prototype.updateTransform = function () {
                var t, e, r, i, n, o, s = this.parent.worldTransform, h = this.worldTransform;
                this.skew.x || this.skew.y ? (l.setTransform(this.position.x, this.position.y, this.pivot.x, this.pivot.y, this.scale.x, this.scale.y, this.rotation, this.skew.x, this.skew.y), h.a = l.a * s.a + l.b * s.c, h.b = l.a * s.b + l.b * s.d, h.c = l.c * s.a + l.d * s.c, h.d = l.c * s.b + l.d * s.d, h.tx = l.tx * s.a + l.ty * s.c + s.tx, h.ty = l.tx * s.b + l.ty * s.d + s.ty) : this.rotation % a.PI_2 ? (this.rotation !== this.rotationCache && (this.rotationCache = this.rotation, this._sr = Math.sin(this.rotation), this._cr = Math.cos(this.rotation)), t = this._cr * this.scale.x, e = this._sr * this.scale.x, r = -this._sr * this.scale.y, i = this._cr * this.scale.y, n = this.position.x, o = this.position.y, (this.pivot.x || this.pivot.y) && (n -= this.pivot.x * t + this.pivot.y * r, o -= this.pivot.x * e + this.pivot.y * i), h.a = t * s.a + e * s.c, h.b = t * s.b + e * s.d, h.c = r * s.a + i * s.c, h.d = r * s.b + i * s.d, h.tx = n * s.a + o * s.c + s.tx, h.ty = n * s.b + o * s.d + s.ty) : (t = this.scale.x, i = this.scale.y, n = this.position.x - this.pivot.x * t, o = this.position.y - this.pivot.y * i, h.a = t * s.a, h.b = t * s.b, h.c = i * s.c, h.d = i * s.d, h.tx = n * s.a + o * s.c + s.tx, h.ty = n * s.b + o * s.d + s.ty), this.worldAlpha = this.alpha * this.parent.worldAlpha, this._currentBounds = null
            }, i.prototype.displayObjectUpdateTransform = i.prototype.updateTransform, i.prototype.getBounds = function (t) {
                return n.Rectangle.EMPTY
            }, i.prototype.getLocalBounds = function () {
                return this.getBounds(n.Matrix.IDENTITY)
            }, i.prototype.toGlobal = function (t) {
                return this.parent ? this.displayObjectUpdateTransform() : (this.parent = h, this.displayObjectUpdateTransform(), this.parent = null), this.worldTransform.apply(t)
            }, i.prototype.toLocal = function (t, e, r) {
                return e && (t = e.toGlobal(t)), this.parent ? this.displayObjectUpdateTransform() : (this.parent = h, this.displayObjectUpdateTransform(), this.parent = null), this.worldTransform.applyInverse(t, r)
            }, i.prototype.renderWebGL = function (t) {
            }, i.prototype.renderCanvas = function (t) {
            }, i.prototype.generateTexture = function (t, e, r) {
                var i = this.getLocalBounds(), n = new o(t, 0 | i.width, 0 | i.height, e, r);
                return l.tx = -i.x, l.ty = -i.y, n.render(this, l), n
            }, i.prototype.setParent = function (t) {
                if (!t || !t.addChild) throw new Error("setParent: Argument must be a Container");
                return t.addChild(this), t
            }, i.prototype.setTransform = function (t, e, r, i, n, o, s, a, l) {
                return this.position.x = t || 0, this.position.y = e || 0, this.scale.x = r || 1, this.scale.y = i || 1, this.rotation = n || 0, this.skew.x = o || 0, this.skew.y = s || 0, this.pivot.x = a || 0, this.pivot.y = l || 0, this
            }, i.prototype.destroy = function () {
                this.position = null, this.scale = null, this.pivot = null, this.skew = null, this.parent = null, this._bounds = null, this._currentBounds = null, this._mask = null, this.worldTransform = null, this.filterArea = null
            }
        }, {"../const": 22, "../math": 33, "../textures/RenderTexture": 71, eventemitter3: 10}],
        25: [function (t, e, r) {
            function i() {
                n.call(this), this.fillAlpha = 1, this.lineWidth = 0, this.lineColor = 0, this.graphicsData = [], this.tint = 16777215, this._prevTint = 16777215, this.blendMode = u.BLEND_MODES.NORMAL, this.currentPath = null, this._webGL = {}, this.isMask = !1, this.boundsPadding = 0, this._localBounds = new h.Rectangle(0, 0, 1, 1), this.dirty = !0, this.glDirty = !1, this.boundsDirty = !0, this.cachedSpriteDirty = !1
            }

            var n = t("../display/Container"), o = t("../textures/Texture"),
                s = t("../renderers/canvas/utils/CanvasBuffer"), a = t("../renderers/canvas/utils/CanvasGraphics"),
                l = t("./GraphicsData"), h = t("../math"), u = t("../const"), c = new h.Point;
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.clone = function () {
                var t = new i;
                t.renderable = this.renderable, t.fillAlpha = this.fillAlpha, t.lineWidth = this.lineWidth, t.lineColor = this.lineColor, t.tint = this.tint, t.blendMode = this.blendMode, t.isMask = this.isMask, t.boundsPadding = this.boundsPadding, t.dirty = !0, t.glDirty = !0, t.cachedSpriteDirty = this.cachedSpriteDirty;
                for (var e = 0; e < this.graphicsData.length; ++e) t.graphicsData.push(this.graphicsData[e].clone());
                return t.currentPath = t.graphicsData[t.graphicsData.length - 1], t.updateLocalBounds(), t
            }, i.prototype.lineStyle = function (t, e, r) {
                if (this.lineWidth = t || 0, this.lineColor = e || 0, this.lineAlpha = void 0 === r ? 1 : r, this.currentPath) if (this.currentPath.shape.points.length) {
                    var i = new h.Polygon(this.currentPath.shape.points.slice(-2));
                    i.closed = !1, this.drawShape(i)
                } else this.currentPath.lineWidth = this.lineWidth, this.currentPath.lineColor = this.lineColor, this.currentPath.lineAlpha = this.lineAlpha;
                return this
            }, i.prototype.moveTo = function (t, e) {
                var r = new h.Polygon([t, e]);
                return r.closed = !1, this.drawShape(r), this
            }, i.prototype.lineTo = function (t, e) {
                return this.currentPath.shape.points.push(t, e), this.dirty = !0, this
            }, i.prototype.quadraticCurveTo = function (t, e, r, i) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                var n, o, s = this.currentPath.shape.points;
                0 === s.length && this.moveTo(0, 0);
                for (var a = s[s.length - 2], l = s[s.length - 1], h = 0, u = 1; u <= 20; ++u) n = a + (t - a) * (h = u / 20), o = l + (e - l) * h, s.push(n + (t + (r - t) * h - n) * h, o + (e + (i - e) * h - o) * h);
                return this.dirty = this.boundsDirty = !0, this
            }, i.prototype.bezierCurveTo = function (t, e, r, i, n, o) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && (this.currentPath.shape.points = [0, 0]) : this.moveTo(0, 0);
                for (var s, a, l, h, u, c = this.currentPath.shape.points, p = c[c.length - 2], d = c[c.length - 1], f = 0, m = 1; m <= 20; ++m) l = (a = (s = 1 - (f = m / 20)) * s) * s, u = (h = f * f) * f, c.push(l * p + 3 * a * f * t + 3 * s * h * r + u * n, l * d + 3 * a * f * e + 3 * s * h * i + u * o);
                return this.dirty = this.boundsDirty = !0, this
            }, i.prototype.arcTo = function (t, e, r, i, n) {
                this.currentPath ? 0 === this.currentPath.shape.points.length && this.currentPath.shape.points.push(t, e) : this.moveTo(t, e);
                var o = this.currentPath.shape.points, s = o[o.length - 2], a = o[o.length - 1] - e, l = s - t,
                    h = i - e, u = r - t, c = Math.abs(a * u - l * h);
                if (c < 1e-8 || 0 === n) o[o.length - 2] === t && o[o.length - 1] === e || o.push(t, e); else {
                    var p = a * a + l * l, d = h * h + u * u, f = a * h + l * u, m = n * Math.sqrt(p) / c,
                        g = n * Math.sqrt(d) / c, v = m * f / p, _ = g * f / d, y = m * u + g * l, x = m * h + g * a,
                        b = l * (g + v), T = a * (g + v), w = u * (m + _), E = h * (m + _),
                        S = Math.atan2(T - x, b - y), A = Math.atan2(E - x, w - y);
                    this.arc(y + t, x + e, n, S, A, l * h > u * a)
                }
                return this.dirty = this.boundsDirty = !0, this
            }, i.prototype.arc = function (t, e, r, i, n, o) {
                if (o = o || !1, i === n) return this;
                !o && n <= i ? n += 2 * Math.PI : o && i <= n && (i += 2 * Math.PI);
                var s = o ? -1 * (i - n) : n - i, a = 40 * Math.ceil(Math.abs(s) / (2 * Math.PI));
                if (0 === s) return this;
                var l = t + Math.cos(i) * r, h = e + Math.sin(i) * r;
                this.currentPath ? this.currentPath.shape.points.push(l, h) : this.moveTo(l, h);
                for (var u = this.currentPath.shape.points, c = s / (2 * a), p = 2 * c, d = Math.cos(c), f = Math.sin(c), m = a - 1, g = m % 1 / m, v = 0; v <= m; v++) {
                    var _ = c + i + p * (v + g * v), y = Math.cos(_), x = -Math.sin(_);
                    u.push((d * y + f * x) * r + t, (d * -x + f * y) * r + e)
                }
                return this.dirty = this.boundsDirty = !0, this
            }, i.prototype.beginFill = function (t, e) {
                return this.filling = !0, this.fillColor = t || 0, this.fillAlpha = void 0 === e ? 1 : e, this.currentPath && this.currentPath.shape.points.length <= 2 && (this.currentPath.fill = this.filling, this.currentPath.fillColor = this.fillColor, this.currentPath.fillAlpha = this.fillAlpha), this
            }, i.prototype.endFill = function () {
                return this.filling = !1, this.fillColor = null, this.fillAlpha = 1, this
            }, i.prototype.drawRect = function (t, e, r, i) {
                return this.drawShape(new h.Rectangle(t, e, r, i)), this
            }, i.prototype.drawRoundedRect = function (t, e, r, i, n) {
                return this.drawShape(new h.RoundedRectangle(t, e, r, i, n)), this
            }, i.prototype.drawCircle = function (t, e, r) {
                return this.drawShape(new h.Circle(t, e, r)), this
            }, i.prototype.drawEllipse = function (t, e, r, i) {
                return this.drawShape(new h.Ellipse(t, e, r, i)), this
            }, i.prototype.drawPolygon = function (t) {
                var e = t, r = !0;
                if (e instanceof h.Polygon && (r = e.closed, e = e.points), !Array.isArray(e)) {
                    (e = []).length = arguments.length;
                    for (var i = 0; i < e.length; ++i) e[i] = arguments[i]
                }
                var n = new h.Polygon(e);
                return n.closed = r, this.drawShape(n), this
            }, i.prototype.clear = function () {
                return this.lineWidth = 0, this.filling = !1, this.dirty = !0, this.clearDirty = !0, this.graphicsData = [], this
            }, i.prototype.generateTexture = function (t, e, r) {
                e = e || 1;
                var i = this.getLocalBounds(), n = new s(i.width * e, i.height * e), l = o.fromCanvas(n.canvas, r);
                return l.baseTexture.resolution = e, n.context.scale(e, e), n.context.translate(-i.x, -i.y), a.renderGraphics(this, n.context), l
            }, i.prototype._renderWebGL = function (t) {
                this.glDirty && (this.dirty = !0, this.glDirty = !1), t.setObjectRenderer(t.plugins.graphics), t.plugins.graphics.render(this)
            }, i.prototype._renderCanvas = function (t) {
                if (!0 !== this.isMask) {
                    this._prevTint !== this.tint && (this.dirty = !0);
                    var e = t.context, r = this.worldTransform, i = t.blendModes[this.blendMode];
                    i !== e.globalCompositeOperation && (e.globalCompositeOperation = i);
                    var n = t.resolution;
                    e.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n), a.renderGraphics(this, e)
                }
            }, i.prototype.getBounds = function (t) {
                if (!this._currentBounds) {
                    if (!this.renderable) return h.Rectangle.EMPTY;
                    this.boundsDirty && (this.updateLocalBounds(), this.glDirty = !0, this.cachedSpriteDirty = !0, this.boundsDirty = !1);
                    var e = this._localBounds, r = e.x, i = e.width + e.x, n = e.y, o = e.height + e.y,
                        s = t || this.worldTransform, a = s.a, l = s.b, u = s.c, c = s.d, p = s.tx, d = s.ty,
                        f = a * i + u * o + p, m = c * o + l * i + d, g = a * r + u * o + p, v = c * o + l * r + d,
                        _ = a * r + u * n + p, y = c * n + l * r + d, x = a * i + u * n + p, b = c * n + l * i + d,
                        T = f, w = m, E = f, S = m;
                    E = x < (E = _ < (E = g < E ? g : E) ? _ : E) ? x : E, S = b < (S = y < (S = v < S ? v : S) ? y : S) ? b : S, T = x > (T = _ > (T = g > T ? g : T) ? _ : T) ? x : T, w = b > (w = y > (w = v > w ? v : w) ? y : w) ? b : w, this._bounds.x = E, this._bounds.width = T - E, this._bounds.y = S, this._bounds.height = w - S, this._currentBounds = this._bounds
                }
                return this._currentBounds
            }, i.prototype.containsPoint = function (t) {
                this.worldTransform.applyInverse(t, c);
                for (var e = this.graphicsData, r = 0; r < e.length; r++) {
                    var i = e[r];
                    if (i.fill && (i.shape && i.shape.contains(c.x, c.y))) return !0
                }
                return !1
            }, i.prototype.updateLocalBounds = function () {
                var t = 1 / 0, e = -1 / 0, r = 1 / 0, i = -1 / 0;
                if (this.graphicsData.length) for (var n, o, s, a, l, h, c = 0; c < this.graphicsData.length; c++) {
                    var p = this.graphicsData[c], d = p.type, f = p.lineWidth;
                    if (n = p.shape, d === u.SHAPES.RECT || d === u.SHAPES.RREC) s = n.x - f / 2, a = n.y - f / 2, l = n.width + f, h = n.height + f, t = s < t ? s : t, e = s + l > e ? s + l : e, r = a < r ? a : r, i = a + h > i ? a + h : i; else if (d === u.SHAPES.CIRC) s = n.x, a = n.y, l = n.radius + f / 2, h = n.radius + f / 2, t = s - l < t ? s - l : t, e = s + l > e ? s + l : e, r = a - h < r ? a - h : r, i = a + h > i ? a + h : i; else if (d === u.SHAPES.ELIP) s = n.x, a = n.y, l = n.width + f / 2, h = n.height + f / 2, t = s - l < t ? s - l : t, e = s + l > e ? s + l : e, r = a - h < r ? a - h : r, i = a + h > i ? a + h : i; else {
                        o = n.points;
                        for (var m = 0; m < o.length; m += 2) s = o[m], a = o[m + 1], t = s - f < t ? s - f : t, e = s + f > e ? s + f : e, r = a - f < r ? a - f : r, i = a + f > i ? a + f : i
                    }
                } else t = 0, e = 0, r = 0, i = 0;
                var g = this.boundsPadding;
                this._localBounds.x = t - g, this._localBounds.width = e - t + 2 * g, this._localBounds.y = r - g, this._localBounds.height = i - r + 2 * g
            }, i.prototype.drawShape = function (t) {
                this.currentPath && this.currentPath.shape.points.length <= 2 && this.graphicsData.pop(), this.currentPath = null;
                var e = new l(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.filling, t);
                return this.graphicsData.push(e), e.type === u.SHAPES.POLY && (e.shape.closed = e.shape.closed || this.filling, this.currentPath = e), this.dirty = this.boundsDirty = !0, e
            }, i.prototype.destroy = function () {
                n.prototype.destroy.apply(this, arguments);
                for (var t = 0; t < this.graphicsData.length; ++t) this.graphicsData[t].destroy();
                for (var e in this._webgl) for (var r = 0; r < this._webgl[e].data.length; ++r) this._webgl[e].data[r].destroy();
                this.graphicsData = null, this.currentPath = null, this._webgl = null, this._localBounds = null
            }
        }, {
            "../const": 22, "../display/Container": 23, "../math": 33, "../renderers/canvas/utils/CanvasBuffer": 45,
            "../renderers/canvas/utils/CanvasGraphics": 46, "../textures/Texture": 72, "./GraphicsData": 26
        }], 26: [function (t, e, r) {
            function i(t, e, r, i, n, o, s) {
                this.lineWidth = t, this.lineColor = e, this.lineAlpha = r, this._lineTint = e, this.fillColor = i, this.fillAlpha = n, this._fillTint = i, this.fill = o, this.shape = s, this.type = s.type
            }

            i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () {
                return new i(this.lineWidth, this.lineColor, this.lineAlpha, this.fillColor, this.fillAlpha, this.fill, this.shape)
            }, i.prototype.destroy = function () {
                this.shape = null
            }
        }, {}], 27: [function (t, e, r) {
            function i(t) {
                a.call(this, t), this.graphicsDataPool = [], this.primitiveShader = null, this.complexPrimitiveShader = null, this.maximumSimplePolySize = 200
            }

            var n = t("../../utils"), o = t("../../math"), s = t("../../const"),
                a = t("../../renderers/webgl/utils/ObjectRenderer"), l = t("../../renderers/webgl/WebGLRenderer"),
                h = t("./WebGLGraphicsData"), u = t("earcut");
            (i.prototype = Object.create(a.prototype)).constructor = i, e.exports = i, l.registerPlugin("graphics", i), i.prototype.onContextChange = function () {
            }, i.prototype.destroy = function () {
                a.prototype.destroy.call(this);
                for (var t = 0; t < this.graphicsDataPool.length; ++t) this.graphicsDataPool[t].destroy();
                this.graphicsDataPool = null
            }, i.prototype.render = function (t) {
                var e, r = this.renderer, i = r.gl, o = r.shaderManager.plugins.primitiveShader;
                !t.dirty && t._webGL[i.id] || this.updateGraphics(t);
                var s = t._webGL[i.id];
                r.blendModeManager.setBlendMode(t.blendMode);
                for (var a = 0, l = s.data.length; a < l; a++) e = s.data[a], 1 === s.data[a].mode ? (r.stencilManager.pushStencil(t, e), i.uniform1f(r.shaderManager.complexPrimitiveShader.uniforms.alpha._location, t.worldAlpha * e.alpha), i.drawElements(i.TRIANGLE_FAN, 4, i.UNSIGNED_SHORT, 2 * (e.indices.length - 4)), r.stencilManager.popStencil(t, e)) : (o = r.shaderManager.primitiveShader, r.shaderManager.setShader(o), i.uniformMatrix3fv(o.uniforms.translationMatrix._location, !1, t.worldTransform.toArray(!0)), i.uniformMatrix3fv(o.uniforms.projectionMatrix._location, !1, r.currentRenderTarget.projectionMatrix.toArray(!0)), i.uniform3fv(o.uniforms.tint._location, n.hex2rgb(t.tint)), i.uniform1f(o.uniforms.alpha._location, t.worldAlpha), i.bindBuffer(i.ARRAY_BUFFER, e.buffer), i.vertexAttribPointer(o.attributes.aVertexPosition, 2, i.FLOAT, !1, 24, 0), i.vertexAttribPointer(o.attributes.aColor, 4, i.FLOAT, !1, 24, 8), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.indexBuffer), i.drawElements(i.TRIANGLE_STRIP, e.indices.length, i.UNSIGNED_SHORT, 0)), r.drawCount++
            }, i.prototype.updateGraphics = function (t) {
                var e = this.renderer.gl, r = t._webGL[e.id];
                r || (r = t._webGL[e.id] = {lastIndex: 0, data: [], gl: e}), t.dirty = !1;
                var i;
                if (t.clearDirty) {
                    for (t.clearDirty = !1, i = 0; i < r.data.length; i++) {
                        var n = r.data[i];
                        n.reset(), this.graphicsDataPool.push(n)
                    }
                    r.data = [], r.lastIndex = 0
                }
                var o;
                for (i = r.lastIndex; i < t.graphicsData.length; i++) {
                    var a = t.graphicsData[i];
                    a.type === s.SHAPES.POLY ? (a.points = a.shape.points.slice(), a.shape.closed && (a.points[0] === a.points[a.points.length - 2] && a.points[1] === a.points[a.points.length - 1] || a.points.push(a.points[0], a.points[1])), a.fill && a.points.length >= 6 && (a.points.length < 2 * this.maximumSimplePolySize ? (o = this.switchMode(r, 0), this.buildPoly(a, o) || (o = this.switchMode(r, 1), this.buildComplexPoly(a, o))) : (o = this.switchMode(r, 1), this.buildComplexPoly(a, o))), a.lineWidth > 0 && (o = this.switchMode(r, 0), this.buildLine(a, o))) : (o = this.switchMode(r, 0), a.type === s.SHAPES.RECT ? this.buildRectangle(a, o) : a.type === s.SHAPES.CIRC || a.type === s.SHAPES.ELIP ? this.buildCircle(a, o) : a.type === s.SHAPES.RREC && this.buildRoundedRectangle(a, o)), r.lastIndex++
                }
                for (i = 0; i < r.data.length; i++) (o = r.data[i]).dirty && o.upload()
            }, i.prototype.switchMode = function (t, e) {
                var r;
                return t.data.length ? ((r = t.data[t.data.length - 1]).points.length > 32e4 || r.mode !== e || 1 === e) && ((r = this.graphicsDataPool.pop() || new h(t.gl)).mode = e, t.data.push(r)) : ((r = this.graphicsDataPool.pop() || new h(t.gl)).mode = e, t.data.push(r)), r.dirty = !0, r
            }, i.prototype.buildRectangle = function (t, e) {
                var r = t.shape, i = r.x, o = r.y, s = r.width, a = r.height;
                if (t.fill) {
                    var l = n.hex2rgb(t.fillColor), h = t.fillAlpha, u = l[0] * h, c = l[1] * h, p = l[2] * h,
                        d = e.points, f = e.indices, m = d.length / 6;
                    d.push(i, o), d.push(u, c, p, h), d.push(i + s, o), d.push(u, c, p, h), d.push(i, o + a), d.push(u, c, p, h), d.push(i + s, o + a), d.push(u, c, p, h), f.push(m, m, m + 1, m + 2, m + 3, m + 3)
                }
                if (t.lineWidth) {
                    var g = t.points;
                    t.points = [i, o, i + s, o, i + s, o + a, i, o + a, i, o], this.buildLine(t, e), t.points = g
                }
            }, i.prototype.buildRoundedRectangle = function (t, e) {
                var r = t.shape, i = r.x, o = r.y, s = r.width, a = r.height, l = r.radius, h = [];
                if (h.push(i, o + l), this.quadraticBezierCurve(i, o + a - l, i, o + a, i + l, o + a, h), this.quadraticBezierCurve(i + s - l, o + a, i + s, o + a, i + s, o + a - l, h), this.quadraticBezierCurve(i + s, o + l, i + s, o, i + s - l, o, h), this.quadraticBezierCurve(i + l, o, i, o, i, o + l + 1e-10, h), t.fill) {
                    var c = n.hex2rgb(t.fillColor), p = t.fillAlpha, d = c[0] * p, f = c[1] * p, m = c[2] * p,
                        g = e.points, v = e.indices, _ = g.length / 6, y = u(h, null, 2), x = 0;
                    for (x = 0; x < y.length; x += 3) v.push(y[x] + _), v.push(y[x] + _), v.push(y[x + 1] + _), v.push(y[x + 2] + _), v.push(y[x + 2] + _);
                    for (x = 0; x < h.length; x++) g.push(h[x], h[++x], d, f, m, p)
                }
                if (t.lineWidth) {
                    var b = t.points;
                    t.points = h, this.buildLine(t, e), t.points = b
                }
            }, i.prototype.quadraticBezierCurve = function (t, e, r, i, n, o, s) {
                function a(t, e, r) {
                    return t + (e - t) * r
                }

                for (var l, h, u, c, p, d, f = s || [], m = 0, g = 0; g <= 20; g++) l = a(t, r, m = g / 20), h = a(e, i, m), u = a(r, n, m), c = a(i, o, m), p = a(l, u, m), d = a(h, c, m), f.push(p, d);
                return f
            }, i.prototype.buildCircle = function (t, e) {
                var r, i, o = t.shape, a = o.x, l = o.y;
                t.type === s.SHAPES.CIRC ? (r = o.radius, i = o.radius) : (r = o.width, i = o.height);
                var h = Math.floor(30 * Math.sqrt(o.radius)) || Math.floor(15 * Math.sqrt(o.width + o.height)),
                    u = 2 * Math.PI / h, c = 0;
                if (t.fill) {
                    var p = n.hex2rgb(t.fillColor), d = t.fillAlpha, f = p[0] * d, m = p[1] * d, g = p[2] * d,
                        v = e.points, _ = e.indices, y = v.length / 6;
                    for (_.push(y), c = 0; c < h + 1; c++) v.push(a, l, f, m, g, d), v.push(a + Math.sin(u * c) * r, l + Math.cos(u * c) * i, f, m, g, d), _.push(y++, y++);
                    _.push(y - 1)
                }
                if (t.lineWidth) {
                    var x = t.points;
                    for (t.points = [], c = 0; c < h + 1; c++) t.points.push(a + Math.sin(u * c) * r, l + Math.cos(u * c) * i);
                    this.buildLine(t, e), t.points = x
                }
            }, i.prototype.buildLine = function (t, e) {
                var r = 0, i = t.points;
                if (0 !== i.length) {
                    var s = new o.Point(i[0], i[1]), a = new o.Point(i[i.length - 2], i[i.length - 1]);
                    if (s.x === a.x && s.y === a.y) {
                        (i = i.slice()).pop(), i.pop();
                        var l = (a = new o.Point(i[i.length - 2], i[i.length - 1])).x + .5 * (s.x - a.x),
                            h = a.y + .5 * (s.y - a.y);
                        i.unshift(l, h), i.push(l, h)
                    }
                    var u, c, p, d, f, m, g, v, _, y, x, b, T, w, E, S, A, M, C, R, P, O, D = e.points, I = e.indices,
                        F = i.length / 2, L = i.length, k = D.length / 6, B = t.lineWidth / 2,
                        N = n.hex2rgb(t.lineColor), U = t.lineAlpha, X = N[0] * U, Y = N[1] * U, j = N[2] * U;
                    for (p = i[0], d = i[1], f = i[2], _ = -(d - (m = i[3])), y = p - f, _ /= O = Math.sqrt(_ * _ + y * y), y /= O, _ *= B, y *= B, D.push(p - _, d - y, X, Y, j, U), D.push(p + _, d + y, X, Y, j, U), r = 1; r < F - 1; r++) p = i[2 * (r - 1)], d = i[2 * (r - 1) + 1], f = i[2 * r], m = i[2 * r + 1], g = i[2 * (r + 1)], v = i[2 * (r + 1) + 1], _ = -(d - m), y = p - f, _ /= O = Math.sqrt(_ * _ + y * y), y /= O, _ *= B, y *= B, x = -(m - v), b = f - g, x /= O = Math.sqrt(x * x + b * b), b /= O, A = (-_ + p) * (-y + m) - (-_ + f) * (-y + d), R = (-(x *= B) + g) * (-(b *= B) + m) - (-x + f) * (-b + v), P = (E = -y + d - (-y + m)) * (C = -x + f - (-x + g)) - (M = -b + v - (-b + m)) * (S = -_ + f - (-_ + p)), Math.abs(P) < .1 ? (P += 10.1, D.push(f - _, m - y, X, Y, j, U), D.push(f + _, m + y, X, Y, j, U)) : ((u = (S * R - C * A) / P) - f) * (u - f) + ((c = (M * A - E * R) / P) - m) * (c - m) > 19600 ? (T = _ - x, w = y - b, T /= O = Math.sqrt(T * T + w * w), w /= O, T *= B, w *= B, D.push(f - T, m - w), D.push(X, Y, j, U), D.push(f + T, m + w), D.push(X, Y, j, U), D.push(f - T, m - w), D.push(X, Y, j, U), L++) : (D.push(u, c), D.push(X, Y, j, U), D.push(f - (u - f), m - (c - m)), D.push(X, Y, j, U));
                    for (p = i[2 * (F - 2)], d = i[2 * (F - 2) + 1], f = i[2 * (F - 1)], _ = -(d - (m = i[2 * (F - 1) + 1])), y = p - f, _ /= O = Math.sqrt(_ * _ + y * y), y /= O, _ *= B, y *= B, D.push(f - _, m - y), D.push(X, Y, j, U), D.push(f + _, m + y), D.push(X, Y, j, U), I.push(k), r = 0; r < L; r++) I.push(k++);
                    I.push(k - 1)
                }
            }, i.prototype.buildComplexPoly = function (t, e) {
                var r = t.points.slice();
                if (!(r.length < 6)) {
                    var i = e.indices;
                    e.points = r, e.alpha = t.fillAlpha, e.color = n.hex2rgb(t.fillColor);
                    for (var o, s, a = 1 / 0, l = -1 / 0, h = 1 / 0, u = -1 / 0, c = 0; c < r.length; c += 2) o = r[c], s = r[c + 1], a = o < a ? o : a, l = o > l ? o : l, h = s < h ? s : h, u = s > u ? s : u;
                    r.push(a, h, l, h, l, u, a, u);
                    var p = r.length / 2;
                    for (c = 0; c < p; c++) i.push(c)
                }
            }, i.prototype.buildPoly = function (t, e) {
                var r = t.points;
                if (!(r.length < 6)) {
                    var i = e.points, o = e.indices, s = r.length / 2, a = n.hex2rgb(t.fillColor), l = t.fillAlpha,
                        h = a[0] * l, c = a[1] * l, p = a[2] * l, d = u(r, null, 2);
                    if (!d) return !1;
                    var f = i.length / 6, m = 0;
                    for (m = 0; m < d.length; m += 3) o.push(d[m] + f), o.push(d[m] + f), o.push(d[m + 1] + f), o.push(d[m + 2] + f), o.push(d[m + 2] + f);
                    for (m = 0; m < s; m++) i.push(r[2 * m], r[2 * m + 1], h, c, p, l);
                    return !0
                }
            }
        }, {
            "../../const": 22, "../../math": 33, "../../renderers/webgl/WebGLRenderer": 49,
            "../../renderers/webgl/utils/ObjectRenderer": 63, "../../utils": 77, "./WebGLGraphicsData": 28, earcut: 9
        }], 28: [function (t, e, r) {
            function i(t) {
                this.gl = t, this.color = [0, 0, 0], this.points = [], this.indices = [], this.buffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), this.mode = 1, this.alpha = 1, this.dirty = !0, this.glPoints = null, this.glIndices = null
            }

            i.prototype.constructor = i, e.exports = i, i.prototype.reset = function () {
                this.points.length = 0, this.indices.length = 0
            }, i.prototype.upload = function () {
                var t = this.gl;
                this.glPoints = new Float32Array(this.points), t.bindBuffer(t.ARRAY_BUFFER, this.buffer), t.bufferData(t.ARRAY_BUFFER, this.glPoints, t.STATIC_DRAW), this.glIndices = new Uint16Array(this.indices), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.glIndices, t.STATIC_DRAW), this.dirty = !1
            }, i.prototype.destroy = function () {
                this.color = null, this.points = null, this.indices = null, this.gl.deleteBuffer(this.buffer), this.gl.deleteBuffer(this.indexBuffer), this.gl = null, this.buffer = null, this.indexBuffer = null, this.glPoints = null, this.glIndices = null
            }
        }, {}], 29: [function (t, e, r) {
            var i = e.exports = Object.assign(t("./const"), t("./math"), {
                utils: t("./utils"), ticker: t("./ticker"), DisplayObject: t("./display/DisplayObject"),
                Container: t("./display/Container"), Sprite: t("./sprites/Sprite"),
                ParticleContainer: t("./particles/ParticleContainer"),
                SpriteRenderer: t("./sprites/webgl/SpriteRenderer"),
                ParticleRenderer: t("./particles/webgl/ParticleRenderer"), Text: t("./text/Text"),
                Graphics: t("./graphics/Graphics"), GraphicsData: t("./graphics/GraphicsData"),
                GraphicsRenderer: t("./graphics/webgl/GraphicsRenderer"), Texture: t("./textures/Texture"),
                BaseTexture: t("./textures/BaseTexture"), RenderTexture: t("./textures/RenderTexture"),
                VideoBaseTexture: t("./textures/VideoBaseTexture"), TextureUvs: t("./textures/TextureUvs"),
                CanvasRenderer: t("./renderers/canvas/CanvasRenderer"),
                CanvasGraphics: t("./renderers/canvas/utils/CanvasGraphics"),
                CanvasBuffer: t("./renderers/canvas/utils/CanvasBuffer"),
                WebGLRenderer: t("./renderers/webgl/WebGLRenderer"),
                WebGLManager: t("./renderers/webgl/managers/WebGLManager"),
                ShaderManager: t("./renderers/webgl/managers/ShaderManager"),
                Shader: t("./renderers/webgl/shaders/Shader"),
                TextureShader: t("./renderers/webgl/shaders/TextureShader"),
                PrimitiveShader: t("./renderers/webgl/shaders/PrimitiveShader"),
                ComplexPrimitiveShader: t("./renderers/webgl/shaders/ComplexPrimitiveShader"),
                ObjectRenderer: t("./renderers/webgl/utils/ObjectRenderer"),
                RenderTarget: t("./renderers/webgl/utils/RenderTarget"),
                AbstractFilter: t("./renderers/webgl/filters/AbstractFilter"),
                FXAAFilter: t("./renderers/webgl/filters/FXAAFilter"),
                SpriteMaskFilter: t("./renderers/webgl/filters/SpriteMaskFilter"),
                autoDetectRenderer: function (t, e, r, n) {
                    return t = t || 800, e = e || 600, !n && i.utils.isWebGLSupported() ? new i.WebGLRenderer(t, e, r) : new i.CanvasRenderer(t, e, r)
                }
            })
        }, {
            "./const": 22, "./display/Container": 23, "./display/DisplayObject": 24, "./graphics/Graphics": 25,
            "./graphics/GraphicsData": 26, "./graphics/webgl/GraphicsRenderer": 27, "./math": 33,
            "./particles/ParticleContainer": 39, "./particles/webgl/ParticleRenderer": 41,
            "./renderers/canvas/CanvasRenderer": 44, "./renderers/canvas/utils/CanvasBuffer": 45,
            "./renderers/canvas/utils/CanvasGraphics": 46, "./renderers/webgl/WebGLRenderer": 49,
            "./renderers/webgl/filters/AbstractFilter": 50, "./renderers/webgl/filters/FXAAFilter": 51,
            "./renderers/webgl/filters/SpriteMaskFilter": 52, "./renderers/webgl/managers/ShaderManager": 56,
            "./renderers/webgl/managers/WebGLManager": 58, "./renderers/webgl/shaders/ComplexPrimitiveShader": 59,
            "./renderers/webgl/shaders/PrimitiveShader": 60, "./renderers/webgl/shaders/Shader": 61,
            "./renderers/webgl/shaders/TextureShader": 62, "./renderers/webgl/utils/ObjectRenderer": 63,
            "./renderers/webgl/utils/RenderTarget": 65, "./sprites/Sprite": 67, "./sprites/webgl/SpriteRenderer": 68,
            "./text/Text": 69, "./textures/BaseTexture": 70, "./textures/RenderTexture": 71, "./textures/Texture": 72,
            "./textures/TextureUvs": 73, "./textures/VideoBaseTexture": 74, "./ticker": 76, "./utils": 77
        }], 30: [function (t, e, r) {
            function i(t) {
                return t < 0 ? -1 : t > 0 ? 1 : 0
            }

            var n = [1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1, 0, 1],
                o = [0, 1, 1, 1, 0, -1, -1, -1, 0, 1, 1, 1, 0, -1, -1, -1],
                s = [0, -1, -1, -1, 0, 1, 1, 1, 0, 1, 1, 1, 0, -1, -1, -1],
                a = [1, 1, 0, -1, -1, -1, 0, 1, -1, -1, 0, 1, 1, 1, 0, -1], l = [], h = t("./Matrix"), u = [];
            !function () {
                for (var t = 0; t < 16; t++) {
                    var e = [];
                    u.push(e);
                    for (var r = 0; r < 16; r++) for (var c = i(n[t] * n[r] + s[t] * o[r]), p = i(o[t] * n[r] + a[t] * o[r]), d = i(n[t] * s[r] + s[t] * a[r]), f = i(o[t] * s[r] + a[t] * a[r]), m = 0; m < 16; m++) if (n[m] === c && o[m] === p && s[m] === d && a[m] === f) {
                        e.push(m);
                        break
                    }
                }
                for (t = 0; t < 16; t++) {
                    var g = new h;
                    g.set(n[t], o[t], s[t], a[t], 0, 0), l.push(g)
                }
            }();
            var c = {
                E: 0, SE: 1, S: 2, SW: 3, W: 4, NW: 5, N: 6, NE: 7, MIRROR_VERTICAL: 8, MIRROR_HORIZONTAL: 12,
                uX: function (t) {
                    return n[t]
                }, uY: function (t) {
                    return o[t]
                }, vX: function (t) {
                    return s[t]
                }, vY: function (t) {
                    return a[t]
                }, inv: function (t) {
                    return 8 & t ? 15 & t : 7 & -t
                }, add: function (t, e) {
                    return u[t][e]
                }, sub: function (t, e) {
                    return u[t][c.inv(e)]
                }, rotate180: function (t) {
                    return 4 ^ t
                }, isSwapWidthHeight: function (t) {
                    return 2 == (3 & t)
                }, byDirection: function (t, e) {
                    return 2 * Math.abs(t) <= Math.abs(e) ? e >= 0 ? c.S : c.N : 2 * Math.abs(e) <= Math.abs(t) ? t > 0 ? c.E : c.W : e > 0 ? t > 0 ? c.SE : c.SW : t > 0 ? c.NE : c.NW
                }, matrixAppendRotationInv: function (t, e, r, i) {
                    var n = l[c.inv(e)];
                    r = r || 0, i = i || 0, n.tx = r, n.ty = i, t.append(n)
                }
            };
            e.exports = c
        }, {"./Matrix": 31}], 31: [function (t, e, r) {
            function i() {
                this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0
            }

            var n = t("./Point");
            i.prototype.constructor = i, e.exports = i, i.prototype.fromArray = function (t) {
                this.a = t[0], this.b = t[1], this.c = t[3], this.d = t[4], this.tx = t[2], this.ty = t[5]
            }, i.prototype.set = function (t, e, r, i, n, o) {
                return this.a = t, this.b = e, this.c = r, this.d = i, this.tx = n, this.ty = o, this
            }, i.prototype.toArray = function (t, e) {
                this.array || (this.array = new Float32Array(9));
                var r = e || this.array;
                return t ? (r[0] = this.a, r[1] = this.b, r[2] = 0, r[3] = this.c, r[4] = this.d, r[5] = 0, r[6] = this.tx, r[7] = this.ty, r[8] = 1) : (r[0] = this.a, r[1] = this.c, r[2] = this.tx, r[3] = this.b, r[4] = this.d, r[5] = this.ty, r[6] = 0, r[7] = 0, r[8] = 1), r
            }, i.prototype.apply = function (t, e) {
                e = e || new n;
                var r = t.x, i = t.y;
                return e.x = this.a * r + this.c * i + this.tx, e.y = this.b * r + this.d * i + this.ty, e
            }, i.prototype.applyInverse = function (t, e) {
                e = e || new n;
                var r = 1 / (this.a * this.d + this.c * -this.b), i = t.x, o = t.y;
                return e.x = this.d * r * i + -this.c * r * o + (this.ty * this.c - this.tx * this.d) * r, e.y = this.a * r * o + -this.b * r * i + (-this.ty * this.a + this.tx * this.b) * r, e
            }, i.prototype.translate = function (t, e) {
                return this.tx += t, this.ty += e, this
            }, i.prototype.scale = function (t, e) {
                return this.a *= t, this.d *= e, this.c *= t, this.b *= e, this.tx *= t, this.ty *= e, this
            }, i.prototype.rotate = function (t) {
                var e = Math.cos(t), r = Math.sin(t), i = this.a, n = this.c, o = this.tx;
                return this.a = i * e - this.b * r, this.b = i * r + this.b * e, this.c = n * e - this.d * r, this.d = n * r + this.d * e, this.tx = o * e - this.ty * r, this.ty = o * r + this.ty * e, this
            }, i.prototype.append = function (t) {
                var e = this.a, r = this.b, i = this.c, n = this.d;
                return this.a = t.a * e + t.b * i, this.b = t.a * r + t.b * n, this.c = t.c * e + t.d * i, this.d = t.c * r + t.d * n, this.tx = t.tx * e + t.ty * i + this.tx, this.ty = t.tx * r + t.ty * n + this.ty, this
            }, i.prototype.setTransform = function (t, e, r, i, n, o, s, a, l) {
                var h, u, c, p, d, f, m, g, v, _;
                return d = Math.sin(s), f = Math.cos(s), m = Math.cos(l), g = Math.sin(l), v = -Math.sin(a), _ = Math.cos(a), h = f * n, u = d * n, c = -d * o, p = f * o, this.a = m * h + g * c, this.b = m * u + g * p, this.c = v * h + _ * c, this.d = v * u + _ * p, this.tx = t + (r * h + i * c), this.ty = e + (r * u + i * p), this
            }, i.prototype.prepend = function (t) {
                var e = this.tx;
                if (1 !== t.a || 0 !== t.b || 0 !== t.c || 1 !== t.d) {
                    var r = this.a, i = this.c;
                    this.a = r * t.a + this.b * t.c, this.b = r * t.b + this.b * t.d, this.c = i * t.a + this.d * t.c, this.d = i * t.b + this.d * t.d
                }
                return this.tx = e * t.a + this.ty * t.c + t.tx, this.ty = e * t.b + this.ty * t.d + t.ty, this
            }, i.prototype.invert = function () {
                var t = this.a, e = this.b, r = this.c, i = this.d, n = this.tx, o = t * i - e * r;
                return this.a = i / o, this.b = -e / o, this.c = -r / o, this.d = t / o, this.tx = (r * this.ty - i * n) / o, this.ty = -(t * this.ty - e * n) / o, this
            }, i.prototype.identity = function () {
                return this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.tx = 0, this.ty = 0, this
            }, i.prototype.clone = function () {
                var t = new i;
                return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
            }, i.prototype.copy = function (t) {
                return t.a = this.a, t.b = this.b, t.c = this.c, t.d = this.d, t.tx = this.tx, t.ty = this.ty, t
            }, i.IDENTITY = new i, i.TEMP_MATRIX = new i
        }, {"./Point": 32}], 32: [function (t, e, r) {
            function i(t, e) {
                this.x = t || 0, this.y = e || 0
            }

            i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () {
                return new i(this.x, this.y)
            }, i.prototype.copy = function (t) {
                this.set(t.x, t.y)
            }, i.prototype.equals = function (t) {
                return t.x === this.x && t.y === this.y
            }, i.prototype.set = function (t, e) {
                this.x = t || 0, this.y = e || (0 !== e ? this.x : 0)
            }
        }, {}], 33: [function (t, e, r) {
            e.exports = {
                Point: t("./Point"), Matrix: t("./Matrix"), GroupD8: t("./GroupD8"), Circle: t("./shapes/Circle"),
                Ellipse: t("./shapes/Ellipse"), Polygon: t("./shapes/Polygon"), Rectangle: t("./shapes/Rectangle"),
                RoundedRectangle: t("./shapes/RoundedRectangle")
            }
        }, {
            "./GroupD8": 30, "./Matrix": 31, "./Point": 32, "./shapes/Circle": 34, "./shapes/Ellipse": 35,
            "./shapes/Polygon": 36, "./shapes/Rectangle": 37, "./shapes/RoundedRectangle": 38
        }], 34: [function (t, e, r) {
            function i(t, e, r) {
                this.x = t || 0, this.y = e || 0, this.radius = r || 0, this.type = o.SHAPES.CIRC
            }

            var n = t("./Rectangle"), o = t("../../const");
            i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () {
                return new i(this.x, this.y, this.radius)
            }, i.prototype.contains = function (t, e) {
                if (this.radius <= 0) return !1;
                var r = this.x - t, i = this.y - e;
                return r *= r, i *= i, r + i <= this.radius * this.radius
            }, i.prototype.getBounds = function () {
                return new n(this.x - this.radius, this.y - this.radius, 2 * this.radius, 2 * this.radius)
            }
        }, {"../../const": 22, "./Rectangle": 37}], 35: [function (t, e, r) {
            function i(t, e, r, i) {
                this.x = t || 0, this.y = e || 0, this.width = r || 0, this.height = i || 0, this.type = o.SHAPES.ELIP
            }

            var n = t("./Rectangle"), o = t("../../const");
            i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () {
                return new i(this.x, this.y, this.width, this.height)
            }, i.prototype.contains = function (t, e) {
                if (this.width <= 0 || this.height <= 0) return !1;
                var r = (t - this.x) / this.width, i = (e - this.y) / this.height;
                return r *= r, i *= i, r + i <= 1
            }, i.prototype.getBounds = function () {
                return new n(this.x - this.width, this.y - this.height, this.width, this.height)
            }
        }, {"../../const": 22, "./Rectangle": 37}], 36: [function (t, e, r) {
            function i(t) {
                var e = t;
                if (!Array.isArray(e)) {
                    (e = []).length = arguments.length;
                    for (var r = 0; r < e.length; ++r) e[r] = arguments[r]
                }
                if (e[0] instanceof n) {
                    for (var i = [], s = 0, a = e.length; s < a; s++) i.push(e[s].x, e[s].y);
                    e = i
                }
                this.closed = !0, this.points = e, this.type = o.SHAPES.POLY
            }

            var n = t("../Point"), o = t("../../const");
            i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () {
                return new i(this.points.slice())
            }, i.prototype.contains = function (t, e) {
                for (var r = !1, i = this.points.length / 2, n = 0, o = i - 1; n < i; o = n++) {
                    var s = this.points[2 * n], a = this.points[2 * n + 1], l = this.points[2 * o],
                        h = this.points[2 * o + 1];
                    a > e != h > e && t < (l - s) * (e - a) / (h - a) + s && (r = !r)
                }
                return r
            }
        }, {"../../const": 22, "../Point": 32}], 37: [function (t, e, r) {
            function i(t, e, r, i) {
                this.x = t || 0, this.y = e || 0, this.width = r || 0, this.height = i || 0, this.type = n.SHAPES.RECT
            }

            var n = t("../../const");
            i.prototype.constructor = i, e.exports = i, i.EMPTY = new i(0, 0, 0, 0), i.prototype.clone = function () {
                return new i(this.x, this.y, this.width, this.height)
            }, i.prototype.contains = function (t, e) {
                return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t < this.x + this.width && e >= this.y && e < this.y + this.height)
            }
        }, {"../../const": 22}], 38: [function (t, e, r) {
            function i(t, e, r, i, o) {
                this.x = t || 0, this.y = e || 0, this.width = r || 0, this.height = i || 0, this.radius = o || 20, this.type = n.SHAPES.RREC
            }

            var n = t("../../const");
            i.prototype.constructor = i, e.exports = i, i.prototype.clone = function () {
                return new i(this.x, this.y, this.width, this.height, this.radius)
            }, i.prototype.contains = function (t, e) {
                return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height)
            }
        }, {"../../const": 22}], 39: [function (t, e, r) {
            function i(t, e, r) {
                n.call(this), r = r || 15e3, t = t || 15e3;
                r > 16384 && (r = 16384), r > t && (r = t), this._properties = [!1, !0, !1, !1, !1], this._maxSize = t, this._batchSize = r, this._buffers = null, this._bufferToUpdate = 0, this.interactiveChildren = !1, this.blendMode = o.BLEND_MODES.NORMAL, this.roundPixels = !0, this.setProperties(e)
            }

            var n = t("../display/Container"), o = t("../const");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.setProperties = function (t) {
                t && (this._properties[0] = "scale" in t ? !!t.scale : this._properties[0], this._properties[1] = "position" in t ? !!t.position : this._properties[1], this._properties[2] = "rotation" in t ? !!t.rotation : this._properties[2], this._properties[3] = "uvs" in t ? !!t.uvs : this._properties[3], this._properties[4] = "alpha" in t ? !!t.alpha : this._properties[4])
            }, i.prototype.updateTransform = function () {
                this.displayObjectUpdateTransform()
            }, i.prototype.renderWebGL = function (t) {
                this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable && (t.setObjectRenderer(t.plugins.particle), t.plugins.particle.render(this))
            }, i.prototype.onChildrenChange = function (t) {
                var e = Math.floor(t / this._batchSize);
                e < this._bufferToUpdate && (this._bufferToUpdate = e)
            }, i.prototype.renderCanvas = function (t) {
                if (this.visible && !(this.worldAlpha <= 0) && this.children.length && this.renderable) {
                    var e = t.context, r = this.worldTransform, i = !0, n = 0, o = 0, s = 0, a = 0,
                        l = t.blendModes[this.blendMode];
                    l !== e.globalCompositeOperation && (e.globalCompositeOperation = l), e.globalAlpha = this.worldAlpha, this.displayObjectUpdateTransform();
                    for (var h = 0; h < this.children.length; ++h) {
                        var u = this.children[h];
                        if (u.visible) {
                            var c = u.texture.frame;
                            if (e.globalAlpha = this.worldAlpha * u.alpha, u.rotation % (2 * Math.PI) == 0) i && (e.setTransform(r.a, r.b, r.c, r.d, r.tx, r.ty), i = !1), n = u.anchor.x * (-c.width * u.scale.x) + u.position.x + .5, o = u.anchor.y * (-c.height * u.scale.y) + u.position.y + .5, s = c.width * u.scale.x, a = c.height * u.scale.y; else {
                                i || (i = !0), u.displayObjectUpdateTransform();
                                var p = u.worldTransform;
                                t.roundPixels ? e.setTransform(p.a, p.b, p.c, p.d, 0 | p.tx, 0 | p.ty) : e.setTransform(p.a, p.b, p.c, p.d, p.tx, p.ty), n = u.anchor.x * -c.width + .5, o = u.anchor.y * -c.height + .5, s = c.width, a = c.height
                            }
                            e.drawImage(u.texture.baseTexture.source, c.x, c.y, c.width, c.height, n, o, s, a)
                        }
                    }
                }
            }, i.prototype.destroy = function () {
                if (n.prototype.destroy.apply(this, arguments), this._buffers) for (var t = 0; t < this._buffers.length; ++t) this._buffers[t].destroy();
                this._properties = null, this._buffers = null
            }
        }, {"../const": 22, "../display/Container": 23}], 40: [function (t, e, r) {
            function i(t, e, r, i) {
                this.gl = t, this.vertSize = 2, this.vertByteSize = 4 * this.vertSize, this.size = i, this.dynamicProperties = [], this.staticProperties = [];
                for (var n = 0; n < e.length; n++) {
                    var o = e[n];
                    r[n] ? this.dynamicProperties.push(o) : this.staticProperties.push(o)
                }
                this.staticStride = 0, this.staticBuffer = null, this.staticData = null, this.dynamicStride = 0, this.dynamicBuffer = null, this.dynamicData = null, this.initBuffers()
            }

            i.prototype.constructor = i, e.exports = i, i.prototype.initBuffers = function () {
                var t, e, r = this.gl, i = 0;
                for (this.dynamicStride = 0, t = 0; t < this.dynamicProperties.length; t++) (e = this.dynamicProperties[t]).offset = i, i += e.size, this.dynamicStride += e.size;
                this.dynamicData = new Float32Array(this.size * this.dynamicStride * 4), this.dynamicBuffer = r.createBuffer(), r.bindBuffer(r.ARRAY_BUFFER, this.dynamicBuffer), r.bufferData(r.ARRAY_BUFFER, this.dynamicData, r.DYNAMIC_DRAW);
                var n = 0;
                for (this.staticStride = 0, t = 0; t < this.staticProperties.length; t++) (e = this.staticProperties[t]).offset = n, n += e.size, this.staticStride += e.size;
                this.staticData = new Float32Array(this.size * this.staticStride * 4), this.staticBuffer = r.createBuffer(), r.bindBuffer(r.ARRAY_BUFFER, this.staticBuffer), r.bufferData(r.ARRAY_BUFFER, this.staticData, r.DYNAMIC_DRAW)
            }, i.prototype.uploadDynamic = function (t, e, r) {
                for (var i = this.gl, n = 0; n < this.dynamicProperties.length; n++) {
                    var o = this.dynamicProperties[n];
                    o.uploadFunction(t, e, r, this.dynamicData, this.dynamicStride, o.offset)
                }
                i.bindBuffer(i.ARRAY_BUFFER, this.dynamicBuffer), i.bufferSubData(i.ARRAY_BUFFER, 0, this.dynamicData)
            }, i.prototype.uploadStatic = function (t, e, r) {
                for (var i = this.gl, n = 0; n < this.staticProperties.length; n++) {
                    var o = this.staticProperties[n];
                    o.uploadFunction(t, e, r, this.staticData, this.staticStride, o.offset)
                }
                i.bindBuffer(i.ARRAY_BUFFER, this.staticBuffer), i.bufferSubData(i.ARRAY_BUFFER, 0, this.staticData)
            }, i.prototype.bind = function () {
                var t, e, r = this.gl;
                for (r.bindBuffer(r.ARRAY_BUFFER, this.dynamicBuffer), t = 0; t < this.dynamicProperties.length; t++) e = this.dynamicProperties[t], r.vertexAttribPointer(e.attribute, e.size, r.FLOAT, !1, 4 * this.dynamicStride, 4 * e.offset);
                for (r.bindBuffer(r.ARRAY_BUFFER, this.staticBuffer), t = 0; t < this.staticProperties.length; t++) e = this.staticProperties[t], r.vertexAttribPointer(e.attribute, e.size, r.FLOAT, !1, 4 * this.staticStride, 4 * e.offset)
            }, i.prototype.destroy = function () {
                this.dynamicProperties = null, this.dynamicData = null, this.gl.deleteBuffer(this.dynamicBuffer), this.staticProperties = null, this.staticData = null, this.gl.deleteBuffer(this.staticBuffer)
            }
        }, {}], 41: [function (t, e, r) {
            function i(t) {
                n.call(this, t);
                this.indices = new Uint16Array(98304);
                for (var e = 0, r = 0; e < 98304; e += 6, r += 4) this.indices[e + 0] = r + 0, this.indices[e + 1] = r + 1, this.indices[e + 2] = r + 2, this.indices[e + 3] = r + 0, this.indices[e + 4] = r + 2, this.indices[e + 5] = r + 3;
                this.shader = null, this.indexBuffer = null, this.properties = null, this.tempMatrix = new l.Matrix
            }

            var n = t("../../renderers/webgl/utils/ObjectRenderer"), o = t("../../renderers/webgl/WebGLRenderer"),
                s = t("./ParticleShader"), a = t("./ParticleBuffer"), l = t("../../math");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, o.registerPlugin("particle", i), i.prototype.onContextChange = function () {
                var t = this.renderer.gl;
                this.shader = new s(this.renderer.shaderManager), this.indexBuffer = t.createBuffer(), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW), this.properties = [{
                    attribute: this.shader.attributes.aVertexPosition, size: 2, uploadFunction: this.uploadVertices,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aPositionCoord, size: 2, uploadFunction: this.uploadPosition,
                    offset: 0
                }, {
                    attribute: this.shader.attributes.aRotation, size: 1, uploadFunction: this.uploadRotation, offset: 0
                }, {
                    attribute: this.shader.attributes.aTextureCoord, size: 2, uploadFunction: this.uploadUvs, offset: 0
                }, {attribute: this.shader.attributes.aColor, size: 1, uploadFunction: this.uploadAlpha, offset: 0}]
            }, i.prototype.start = function () {
                var t = this.renderer.gl;
                t.activeTexture(t.TEXTURE0), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var e = this.shader;
                this.renderer.shaderManager.setShader(e)
            }, i.prototype.render = function (t) {
                var e = t.children, r = e.length, i = t._maxSize, n = t._batchSize;
                if (0 !== r) {
                    r > i && (r = i), t._buffers || (t._buffers = this.generateBuffers(t)), this.renderer.blendModeManager.setBlendMode(t.blendMode);
                    var o = this.renderer.gl, s = t.worldTransform.copy(this.tempMatrix);
                    s.prepend(this.renderer.currentRenderTarget.projectionMatrix), o.uniformMatrix3fv(this.shader.uniforms.projectionMatrix._location, !1, s.toArray(!0)), o.uniform1f(this.shader.uniforms.uAlpha._location, t.worldAlpha);
                    var a = e[0]._texture.baseTexture;
                    if (a._glTextures[o.id]) o.bindTexture(o.TEXTURE_2D, a._glTextures[o.id]); else {
                        if (!this.renderer.updateTexture(a)) return;
                        t._properties[0] && t._properties[3] || (t._bufferToUpdate = 0)
                    }
                    for (var l = 0, h = 0; l < r; l += n, h += 1) {
                        var u = r - l;
                        u > n && (u = n);
                        var c = t._buffers[h];
                        c.uploadDynamic(e, l, u), t._bufferToUpdate === h && (c.uploadStatic(e, l, u), t._bufferToUpdate = h + 1), c.bind(this.shader), o.drawElements(o.TRIANGLES, 6 * u, o.UNSIGNED_SHORT, 0), this.renderer.drawCount++
                    }
                }
            }, i.prototype.generateBuffers = function (t) {
                var e, r = this.renderer.gl, i = [], n = t._maxSize, o = t._batchSize, s = t._properties;
                for (e = 0; e < n; e += o) i.push(new a(r, this.properties, s, o));
                return i
            }, i.prototype.uploadVertices = function (t, e, r, i, n, o) {
                for (var s, a, l, h, u, c, p, d, f, m = 0; m < r; m++) a = (s = t[e + m])._texture, h = s.scale.x, u = s.scale.y, a.trim ? (c = (p = (l = a.trim).x - s.anchor.x * l.width) + a.crop.width, d = (f = l.y - s.anchor.y * l.height) + a.crop.height) : (c = a._frame.width * (1 - s.anchor.x), p = a._frame.width * -s.anchor.x, d = a._frame.height * (1 - s.anchor.y), f = a._frame.height * -s.anchor.y), i[o] = p * h, i[o + 1] = f * u, i[o + n] = c * h, i[o + n + 1] = f * u, i[o + 2 * n] = c * h, i[o + 2 * n + 1] = d * u, i[o + 3 * n] = p * h, i[o + 3 * n + 1] = d * u, o += 4 * n
            }, i.prototype.uploadPosition = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; s++) {
                    var a = t[e + s].position;
                    i[o] = a.x, i[o + 1] = a.y, i[o + n] = a.x, i[o + n + 1] = a.y, i[o + 2 * n] = a.x, i[o + 2 * n + 1] = a.y, i[o + 3 * n] = a.x, i[o + 3 * n + 1] = a.y, o += 4 * n
                }
            }, i.prototype.uploadRotation = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; s++) {
                    var a = t[e + s].rotation;
                    i[o] = a, i[o + n] = a, i[o + 2 * n] = a, i[o + 3 * n] = a, o += 4 * n
                }
            }, i.prototype.uploadUvs = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; s++) {
                    var a = t[e + s]._texture._uvs;
                    a ? (i[o] = a.x0, i[o + 1] = a.y0, i[o + n] = a.x1, i[o + n + 1] = a.y1, i[o + 2 * n] = a.x2, i[o + 2 * n + 1] = a.y2, i[o + 3 * n] = a.x3, i[o + 3 * n + 1] = a.y3, o += 4 * n) : (i[o] = 0, i[o + 1] = 0, i[o + n] = 0, i[o + n + 1] = 0, i[o + 2 * n] = 0, i[o + 2 * n + 1] = 0, i[o + 3 * n] = 0, i[o + 3 * n + 1] = 0, o += 4 * n)
                }
            }, i.prototype.uploadAlpha = function (t, e, r, i, n, o) {
                for (var s = 0; s < r; s++) {
                    var a = t[e + s].alpha;
                    i[o] = a, i[o + n] = a, i[o + 2 * n] = a, i[o + 3 * n] = a, o += 4 * n
                }
            }, i.prototype.destroy = function () {
                this.renderer.gl && this.renderer.gl.deleteBuffer(this.indexBuffer), n.prototype.destroy.apply(this, arguments), this.shader.destroy(), this.indices = null, this.tempMatrix = null
            }
        }, {
            "../../math": 33, "../../renderers/webgl/WebGLRenderer": 49,
            "../../renderers/webgl/utils/ObjectRenderer": 63, "./ParticleBuffer": 40, "./ParticleShader": 42
        }], 42: [function (t, e, r) {
            function i(t) {
                n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "void main(void){", "   vec2 v = aVertexPosition;", "   v.x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);", "   v.y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);", "   v = v + aPositionCoord;", "   gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "uniform float uAlpha;", "void main(void){", "  vec4 color = texture2D(uSampler, vTextureCoord) * vColor * uAlpha;", "  if (color.a == 0.0) discard;", "  gl_FragColor = color;", "}"].join("\n"), {
                    uAlpha: {
                        type: "1f", value: 1
                    }
                }, {aPositionCoord: 0, aRotation: 0})
            }

            var n = t("../../renderers/webgl/shaders/TextureShader");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i
        }, {"../../renderers/webgl/shaders/TextureShader": 62}], 43: [function (t, e, r) {
            function i(t, e, r, i) {
                if (a.call(this), n.sayHello(t), i) for (var l in s.DEFAULT_RENDER_OPTIONS) void 0 === i[l] && (i[l] = s.DEFAULT_RENDER_OPTIONS[l]); else i = s.DEFAULT_RENDER_OPTIONS;
                this.type = s.RENDERER_TYPE.UNKNOWN, this.width = e || 800, this.height = r || 600, this.view = i.view || document.createElement("canvas"), this.resolution = i.resolution, this.transparent = i.transparent, this.autoResize = i.autoResize || !1, this.blendModes = null, this.preserveDrawingBuffer = i.preserveDrawingBuffer, this.clearBeforeRender = i.clearBeforeRender, this.roundPixels = i.roundPixels, this._backgroundColor = 0, this._backgroundColorRgb = [0, 0, 0], this._backgroundColorString = "#000000", this.backgroundColor = i.backgroundColor || this._backgroundColor, this._tempDisplayObjectParent = {
                    worldTransform: new o.Matrix, worldAlpha: 1, children: []
                }, this._lastObjectRendered = this._tempDisplayObjectParent
            }

            var n = t("../utils"), o = t("../math"), s = t("../const"), a = t("eventemitter3");
            (i.prototype = Object.create(a.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                backgroundColor: {
                    get: function () {
                        return this._backgroundColor
                    }, set: function (t) {
                        this._backgroundColor = t, this._backgroundColorString = n.hex2string(t), n.hex2rgb(t, this._backgroundColorRgb)
                    }
                }
            }), i.prototype.resize = function (t, e) {
                this.width = t * this.resolution, this.height = e * this.resolution, this.view.width = this.width, this.view.height = this.height, this.autoResize && (this.view.style.width = this.width / this.resolution + "px", this.view.style.height = this.height / this.resolution + "px")
            }, i.prototype.destroy = function (t) {
                t && this.view.parentNode && this.view.parentNode.removeChild(this.view), this.type = s.RENDERER_TYPE.UNKNOWN, this.width = 0, this.height = 0, this.view = null, this.resolution = 0, this.transparent = !1, this.autoResize = !1, this.blendModes = null, this.preserveDrawingBuffer = !1, this.clearBeforeRender = !1, this.roundPixels = !1, this._backgroundColor = 0, this._backgroundColorRgb = null, this._backgroundColorString = null
            }
        }, {"../const": 22, "../math": 33, "../utils": 77, eventemitter3: 10}], 44: [function (t, e, r) {
            function i(t, e, r) {
                r = r || {}, n.call(this, "Canvas", t, e, r), this.type = l.RENDERER_TYPE.CANVAS, this.context = this.view.getContext("2d", {alpha: this.transparent}), this.refresh = !0, this.maskManager = new o, this.smoothProperty = "imageSmoothingEnabled", this.context.imageSmoothingEnabled || (this.context.webkitImageSmoothingEnabled ? this.smoothProperty = "webkitImageSmoothingEnabled" : this.context.mozImageSmoothingEnabled ? this.smoothProperty = "mozImageSmoothingEnabled" : this.context.oImageSmoothingEnabled ? this.smoothProperty = "oImageSmoothingEnabled" : this.context.msImageSmoothingEnabled && (this.smoothProperty = "msImageSmoothingEnabled")), this.initPlugins(), this._mapBlendModes(), this._tempDisplayObjectParent = {
                    worldTransform: new a.Matrix, worldAlpha: 1
                }, this.resize(t, e)
            }

            var n = t("../SystemRenderer"), o = t("./utils/CanvasMaskManager"), s = t("../../utils"),
                a = t("../../math"), l = t("../../const");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, s.pluginTarget.mixin(i), i.prototype.render = function (t) {
                this.emit("prerender");
                var e = t.parent;
                this._lastObjectRendered = t, t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = e, this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.globalAlpha = 1, this.context.globalCompositeOperation = this.blendModes[l.BLEND_MODES.NORMAL], navigator.isCocoonJS && this.view.screencanvas && (this.context.fillStyle = "black", this.context.clear()), this.clearBeforeRender && (this.transparent ? this.context.clearRect(0, 0, this.width, this.height) : (this.context.fillStyle = this._backgroundColorString, this.context.fillRect(0, 0, this.width, this.height))), this.renderDisplayObject(t, this.context), this.emit("postrender")
            }, i.prototype.destroy = function (t) {
                this.destroyPlugins(), n.prototype.destroy.call(this, t), this.context = null, this.refresh = !0, this.maskManager.destroy(), this.maskManager = null, this.smoothProperty = null
            }, i.prototype.renderDisplayObject = function (t, e) {
                var r = this.context;
                this.context = e, t.renderCanvas(this), this.context = r
            }, i.prototype.resize = function (t, e) {
                n.prototype.resize.call(this, t, e), this.smoothProperty && (this.context[this.smoothProperty] = l.SCALE_MODES.DEFAULT === l.SCALE_MODES.LINEAR)
            }, i.prototype._mapBlendModes = function () {
                this.blendModes || (this.blendModes = {}, s.canUseNewCanvasBlendModes() ? (this.blendModes[l.BLEND_MODES.NORMAL] = "source-over", this.blendModes[l.BLEND_MODES.ADD] = "lighter", this.blendModes[l.BLEND_MODES.MULTIPLY] = "multiply", this.blendModes[l.BLEND_MODES.SCREEN] = "screen", this.blendModes[l.BLEND_MODES.OVERLAY] = "overlay", this.blendModes[l.BLEND_MODES.DARKEN] = "darken", this.blendModes[l.BLEND_MODES.LIGHTEN] = "lighten", this.blendModes[l.BLEND_MODES.COLOR_DODGE] = "color-dodge", this.blendModes[l.BLEND_MODES.COLOR_BURN] = "color-burn", this.blendModes[l.BLEND_MODES.HARD_LIGHT] = "hard-light", this.blendModes[l.BLEND_MODES.SOFT_LIGHT] = "soft-light", this.blendModes[l.BLEND_MODES.DIFFERENCE] = "difference", this.blendModes[l.BLEND_MODES.EXCLUSION] = "exclusion", this.blendModes[l.BLEND_MODES.HUE] = "hue", this.blendModes[l.BLEND_MODES.SATURATION] = "saturate", this.blendModes[l.BLEND_MODES.COLOR] = "color", this.blendModes[l.BLEND_MODES.LUMINOSITY] = "luminosity") : (this.blendModes[l.BLEND_MODES.NORMAL] = "source-over", this.blendModes[l.BLEND_MODES.ADD] = "lighter", this.blendModes[l.BLEND_MODES.MULTIPLY] = "source-over", this.blendModes[l.BLEND_MODES.SCREEN] = "source-over", this.blendModes[l.BLEND_MODES.OVERLAY] = "source-over", this.blendModes[l.BLEND_MODES.DARKEN] = "source-over", this.blendModes[l.BLEND_MODES.LIGHTEN] = "source-over", this.blendModes[l.BLEND_MODES.COLOR_DODGE] = "source-over", this.blendModes[l.BLEND_MODES.COLOR_BURN] = "source-over", this.blendModes[l.BLEND_MODES.HARD_LIGHT] = "source-over", this.blendModes[l.BLEND_MODES.SOFT_LIGHT] = "source-over", this.blendModes[l.BLEND_MODES.DIFFERENCE] = "source-over", this.blendModes[l.BLEND_MODES.EXCLUSION] = "source-over", this.blendModes[l.BLEND_MODES.HUE] = "source-over", this.blendModes[l.BLEND_MODES.SATURATION] = "source-over", this.blendModes[l.BLEND_MODES.COLOR] = "source-over", this.blendModes[l.BLEND_MODES.LUMINOSITY] = "source-over"))
            }
        }, {
            "../../const": 22, "../../math": 33, "../../utils": 77, "../SystemRenderer": 43,
            "./utils/CanvasMaskManager": 47
        }], 45: [function (t, e, r) {
            function i(t, e) {
                this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = t, this.canvas.height = e
            }

            i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                width: {
                    get: function () {
                        return this.canvas.width
                    }, set: function (t) {
                        this.canvas.width = t
                    }
                }, height: {
                    get: function () {
                        return this.canvas.height
                    }, set: function (t) {
                        this.canvas.height = t
                    }
                }
            }), i.prototype.clear = function () {
                this.context.setTransform(1, 0, 0, 1, 0, 0), this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            }, i.prototype.resize = function (t, e) {
                this.canvas.width = t, this.canvas.height = e
            }, i.prototype.destroy = function () {
                this.context = null, this.canvas = null
            }
        }, {}], 46: [function (t, e, r) {
            var i = t("../../../const"), n = {};
            e.exports = n, n.renderGraphics = function (t, e) {
                var r = t.worldAlpha;
                t.dirty && (this.updateGraphicsTint(t), t.dirty = !1);
                for (var n = 0; n < t.graphicsData.length; n++) {
                    var o = t.graphicsData[n], s = o.shape, a = o._fillTint, l = o._lineTint;
                    if (e.lineWidth = o.lineWidth, o.type === i.SHAPES.POLY) {
                        e.beginPath();
                        var h = s.points;
                        e.moveTo(h[0], h[1]);
                        for (var u = 1; u < h.length / 2; u++) e.lineTo(h[2 * u], h[2 * u + 1]);
                        s.closed && e.lineTo(h[0], h[1]), h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && e.closePath(), o.fill && (e.globalAlpha = o.fillAlpha * r, e.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), e.fill()), o.lineWidth && (e.globalAlpha = o.lineAlpha * r, e.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), e.stroke())
                    } else if (o.type === i.SHAPES.RECT) (o.fillColor || 0 === o.fillColor) && (e.globalAlpha = o.fillAlpha * r, e.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), e.fillRect(s.x, s.y, s.width, s.height)), o.lineWidth && (e.globalAlpha = o.lineAlpha * r, e.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), e.strokeRect(s.x, s.y, s.width, s.height)); else if (o.type === i.SHAPES.CIRC) e.beginPath(), e.arc(s.x, s.y, s.radius, 0, 2 * Math.PI), e.closePath(), o.fill && (e.globalAlpha = o.fillAlpha * r, e.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), e.fill()), o.lineWidth && (e.globalAlpha = o.lineAlpha * r, e.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), e.stroke()); else if (o.type === i.SHAPES.ELIP) {
                        var c = 2 * s.width, p = 2 * s.height, d = s.x - c / 2, f = s.y - p / 2;
                        e.beginPath();
                        var m = c / 2 * .5522848, g = p / 2 * .5522848, v = d + c, _ = f + p, y = d + c / 2,
                            x = f + p / 2;
                        e.moveTo(d, x), e.bezierCurveTo(d, x - g, y - m, f, y, f), e.bezierCurveTo(y + m, f, v, x - g, v, x), e.bezierCurveTo(v, x + g, y + m, _, y, _), e.bezierCurveTo(y - m, _, d, x + g, d, x), e.closePath(), o.fill && (e.globalAlpha = o.fillAlpha * r, e.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), e.fill()), o.lineWidth && (e.globalAlpha = o.lineAlpha * r, e.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), e.stroke())
                    } else if (o.type === i.SHAPES.RREC) {
                        var b = s.x, T = s.y, w = s.width, E = s.height, S = s.radius, A = Math.min(w, E) / 2 | 0;
                        S = S > A ? A : S, e.beginPath(), e.moveTo(b, T + S), e.lineTo(b, T + E - S), e.quadraticCurveTo(b, T + E, b + S, T + E), e.lineTo(b + w - S, T + E), e.quadraticCurveTo(b + w, T + E, b + w, T + E - S), e.lineTo(b + w, T + S), e.quadraticCurveTo(b + w, T, b + w - S, T), e.lineTo(b + S, T), e.quadraticCurveTo(b, T, b, T + S), e.closePath(), (o.fillColor || 0 === o.fillColor) && (e.globalAlpha = o.fillAlpha * r, e.fillStyle = "#" + ("00000" + (0 | a).toString(16)).substr(-6), e.fill()), o.lineWidth && (e.globalAlpha = o.lineAlpha * r, e.strokeStyle = "#" + ("00000" + (0 | l).toString(16)).substr(-6), e.stroke())
                    }
                }
            }, n.renderGraphicsMask = function (t, e) {
                var r = t.graphicsData.length;
                if (0 !== r) {
                    e.beginPath();
                    for (var n = 0; n < r; n++) {
                        var o = t.graphicsData[n], s = o.shape;
                        if (o.type === i.SHAPES.POLY) {
                            var a = s.points;
                            e.moveTo(a[0], a[1]);
                            for (var l = 1; l < a.length / 2; l++) e.lineTo(a[2 * l], a[2 * l + 1]);
                            a[0] === a[a.length - 2] && a[1] === a[a.length - 1] && e.closePath()
                        } else if (o.type === i.SHAPES.RECT) e.rect(s.x, s.y, s.width, s.height), e.closePath(); else if (o.type === i.SHAPES.CIRC) e.arc(s.x, s.y, s.radius, 0, 2 * Math.PI), e.closePath(); else if (o.type === i.SHAPES.ELIP) {
                            var h = 2 * s.width, u = 2 * s.height, c = s.x - h / 2, p = s.y - u / 2,
                                d = h / 2 * .5522848, f = u / 2 * .5522848, m = c + h, g = p + u, v = c + h / 2,
                                _ = p + u / 2;
                            e.moveTo(c, _), e.bezierCurveTo(c, _ - f, v - d, p, v, p), e.bezierCurveTo(v + d, p, m, _ - f, m, _), e.bezierCurveTo(m, _ + f, v + d, g, v, g), e.bezierCurveTo(v - d, g, c, _ + f, c, _), e.closePath()
                        } else if (o.type === i.SHAPES.RREC) {
                            var y = s.x, x = s.y, b = s.width, T = s.height, w = s.radius, E = Math.min(b, T) / 2 | 0;
                            w = w > E ? E : w, e.moveTo(y, x + w), e.lineTo(y, x + T - w), e.quadraticCurveTo(y, x + T, y + w, x + T), e.lineTo(y + b - w, x + T), e.quadraticCurveTo(y + b, x + T, y + b, x + T - w), e.lineTo(y + b, x + w), e.quadraticCurveTo(y + b, x, y + b - w, x), e.lineTo(y + w, x), e.quadraticCurveTo(y, x, y, x + w), e.closePath()
                        }
                    }
                }
            }, n.updateGraphicsTint = function (t) {
                if (16777215 !== t.tint || t._prevTint !== t.tint) {
                    t._prevTint = t.tint;
                    for (var e = (t.tint >> 16 & 255) / 255, r = (t.tint >> 8 & 255) / 255, i = (255 & t.tint) / 255, n = 0; n < t.graphicsData.length; n++) {
                        var o = t.graphicsData[n], s = 0 | o.fillColor, a = 0 | o.lineColor;
                        o._fillTint = ((s >> 16 & 255) / 255 * e * 255 << 16) + ((s >> 8 & 255) / 255 * r * 255 << 8) + (255 & s) / 255 * i * 255, o._lineTint = ((a >> 16 & 255) / 255 * e * 255 << 16) + ((a >> 8 & 255) / 255 * r * 255 << 8) + (255 & a) / 255 * i * 255
                    }
                }
            }
        }, {"../../../const": 22}], 47: [function (t, e, r) {
            function i() {
            }

            var n = t("./CanvasGraphics");
            i.prototype.constructor = i, e.exports = i, i.prototype.pushMask = function (t, e) {
                e.context.save();
                var r = t.alpha, i = t.worldTransform, o = e.resolution;
                e.context.setTransform(i.a * o, i.b * o, i.c * o, i.d * o, i.tx * o, i.ty * o), t.texture || (n.renderGraphicsMask(t, e.context), e.context.clip()), t.worldAlpha = r
            }, i.prototype.popMask = function (t) {
                t.context.restore()
            }, i.prototype.destroy = function () {
            }
        }, {"./CanvasGraphics": 46}], 48: [function (t, e, r) {
            var i = t("../../../utils"), n = {};
            e.exports = n, n.getTintedTexture = function (t, e) {
                var r = t.texture, i = "#" + ("00000" + (0 | (e = n.roundColor(e))).toString(16)).substr(-6);
                if (r.tintCache = r.tintCache || {}, r.tintCache[i]) return r.tintCache[i];
                var o = n.canvas || document.createElement("canvas");
                if (n.tintMethod(r, e, o), n.convertTintToImage) {
                    var s = new Image;
                    s.src = o.toDataURL(), r.tintCache[i] = s
                } else r.tintCache[i] = o, n.canvas = null;
                return o
            }, n.tintWithMultiply = function (t, e, r) {
                var i = r.getContext("2d"), n = t.baseTexture.resolution, o = t.crop.clone();
                o.x *= n, o.y *= n, o.width *= n, o.height *= n, r.width = o.width, r.height = o.height, i.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), i.fillRect(0, 0, o.width, o.height), i.globalCompositeOperation = "multiply", i.drawImage(t.baseTexture.source, o.x, o.y, o.width, o.height, 0, 0, o.width, o.height), i.globalCompositeOperation = "destination-atop", i.drawImage(t.baseTexture.source, o.x, o.y, o.width, o.height, 0, 0, o.width, o.height)
            }, n.tintWithOverlay = function (t, e, r) {
                var i = r.getContext("2d"), n = t.baseTexture.resolution, o = t.crop.clone();
                o.x *= n, o.y *= n, o.width *= n, o.height *= n, r.width = o.width, r.height = o.height, i.globalCompositeOperation = "copy", i.fillStyle = "#" + ("00000" + (0 | e).toString(16)).substr(-6), i.fillRect(0, 0, o.width, o.height), i.globalCompositeOperation = "destination-atop", i.drawImage(t.baseTexture.source, o.x, o.y, o.width, o.height, 0, 0, o.width, o.height)
            }, n.tintWithPerPixel = function (t, e, r) {
                var n = r.getContext("2d"), o = t.baseTexture.resolution, s = t.crop.clone();
                s.x *= o, s.y *= o, s.width *= o, s.height *= o, r.width = s.width, r.height = s.height, n.globalCompositeOperation = "copy", n.drawImage(t.baseTexture.source, s.x, s.y, s.width, s.height, 0, 0, s.width, s.height);
                for (var a = i.hex2rgb(e), l = a[0], h = a[1], u = a[2], c = n.getImageData(0, 0, s.width, s.height), p = c.data, d = 0; d < p.length; d += 4) p[d + 0] *= l, p[d + 1] *= h, p[d + 2] *= u;
                n.putImageData(c, 0, 0)
            }, n.roundColor = function (t) {
                var e = n.cacheStepsPerColorChannel, r = i.hex2rgb(t);
                return r[0] = Math.min(255, r[0] / e * e), r[1] = Math.min(255, r[1] / e * e), r[2] = Math.min(255, r[2] / e * e), i.rgb2hex(r)
            }, n.cacheStepsPerColorChannel = 8, n.convertTintToImage = !1, n.canUseMultiply = i.canUseNewCanvasBlendModes(), n.tintMethod = n.canUseMultiply ? n.tintWithMultiply : n.tintWithPerPixel
        }, {"../../../utils": 77}], 49: [function (t, e, r) {
            function i(t, e, r) {
                r = r || {}, n.call(this, "WebGL", t, e, r), this.type = f.RENDERER_TYPE.WEBGL, this.handleContextLost = this.handleContextLost.bind(this), this.handleContextRestored = this.handleContextRestored.bind(this), this.view.addEventListener("webglcontextlost", this.handleContextLost, !1), this.view.addEventListener("webglcontextrestored", this.handleContextRestored, !1), this._useFXAA = !!r.forceFXAA && r.antialias, this._FXAAFilter = null, this._contextOptions = {
                    alpha: this.transparent, antialias: r.antialias,
                    premultipliedAlpha: this.transparent && "notMultiplied" !== this.transparent, stencil: !0,
                    preserveDrawingBuffer: r.preserveDrawingBuffer
                }, this.drawCount = 0, this.shaderManager = new o(this), this.maskManager = new s(this), this.stencilManager = new a(this), this.filterManager = new l(this), this.blendModeManager = new h(this), this.currentRenderTarget = null, this.currentRenderer = new c(this), this.initPlugins(), this._createContext(), this._initContext(), this._mapGlModes(), this._managedTextures = [], this._renderTargetStack = []
            }

            var n = t("../SystemRenderer"), o = t("./managers/ShaderManager"), s = t("./managers/MaskManager"),
                a = t("./managers/StencilManager"), l = t("./managers/FilterManager"),
                h = t("./managers/BlendModeManager"), u = t("./utils/RenderTarget"), c = t("./utils/ObjectRenderer"),
                p = t("./filters/FXAAFilter"), d = t("../../utils"), f = t("../../const");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, d.pluginTarget.mixin(i), i.glContextId = 0, i.prototype._createContext = function () {
                var t = this.view.getContext("webgl", this._contextOptions) || this.view.getContext("experimental-webgl", this._contextOptions);
                if (this.gl = t, !t) throw new Error("This browser does not support webGL. Try using the canvas renderer");
                this.glContextId = i.glContextId++, t.id = this.glContextId, t.renderer = this
            }, i.prototype._initContext = function () {
                var t = this.gl;
                t.disable(t.DEPTH_TEST), t.disable(t.CULL_FACE), t.enable(t.BLEND), this.renderTarget = new u(t, this.width, this.height, null, this.resolution, !0), this.setRenderTarget(this.renderTarget), this.emit("context", t), this.resize(this.width, this.height), this._useFXAA || (this._useFXAA = this._contextOptions.antialias && !t.getContextAttributes().antialias), this._useFXAA && (window.console.warn("FXAA antialiasing being used instead of native antialiasing"), this._FXAAFilter = [new p])
            }, i.prototype.render = function (t) {
                if (this.emit("prerender"), !this.gl.isContextLost()) {
                    this.drawCount = 0, this._lastObjectRendered = t, this._useFXAA && (this._FXAAFilter[0].uniforms.resolution.value.x = this.width, this._FXAAFilter[0].uniforms.resolution.value.y = this.height, t.filterArea = this.renderTarget.size, t.filters = this._FXAAFilter);
                    var e = t.parent;
                    t.parent = this._tempDisplayObjectParent, t.updateTransform(), t.parent = e;
                    var r = this.gl;
                    this.setRenderTarget(this.renderTarget), this.clearBeforeRender && (this.transparent ? r.clearColor(0, 0, 0, 0) : r.clearColor(this._backgroundColorRgb[0], this._backgroundColorRgb[1], this._backgroundColorRgb[2], 1), r.clear(r.COLOR_BUFFER_BIT)), this.renderDisplayObject(t, this.renderTarget), this.emit("postrender")
                }
            }, i.prototype.renderDisplayObject = function (t, e, r) {
                this.setRenderTarget(e), r && e.clear(), this.filterManager.setFilterStack(e.filterStack), t.renderWebGL(this), this.currentRenderer.flush()
            }, i.prototype.setObjectRenderer = function (t) {
                this.currentRenderer !== t && (this.currentRenderer.stop(), this.currentRenderer = t, this.currentRenderer.start())
            }, i.prototype.setRenderTarget = function (t) {
                this.currentRenderTarget !== t && (this.currentRenderTarget = t, this.currentRenderTarget.activate(), this.stencilManager.setMaskStack(t.stencilMaskStack))
            }, i.prototype.resize = function (t, e) {
                n.prototype.resize.call(this, t, e), this.filterManager.resize(t, e), this.renderTarget.resize(t, e), this.currentRenderTarget === this.renderTarget && (this.renderTarget.activate(), this.gl.viewport(0, 0, this.width, this.height))
            }, i.prototype.updateTexture = function (t) {
                if ((t = t.baseTexture || t).hasLoaded) {
                    var e = this.gl;
                    return t._glTextures[e.id] || (t._glTextures[e.id] = e.createTexture(), t.on("update", this.updateTexture, this), t.on("dispose", this.destroyTexture, this), this._managedTextures.push(t)), e.bindTexture(e.TEXTURE_2D, t._glTextures[e.id]), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultipliedAlpha), e.texImage2D(e.TEXTURE_2D, 0, e.RGBA, e.RGBA, e.UNSIGNED_BYTE, t.source), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, t.scaleMode === f.SCALE_MODES.LINEAR ? e.LINEAR : e.NEAREST), t.mipmap && t.isPowerOfTwo ? (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t.scaleMode === f.SCALE_MODES.LINEAR ? e.LINEAR_MIPMAP_LINEAR : e.NEAREST_MIPMAP_NEAREST), e.generateMipmap(e.TEXTURE_2D)) : e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, t.scaleMode === f.SCALE_MODES.LINEAR ? e.LINEAR : e.NEAREST), t.isPowerOfTwo ? (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.REPEAT), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT)) : (e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE)), t._glTextures[e.id]
                }
            }, i.prototype.destroyTexture = function (t, e) {
                if ((t = t.baseTexture || t).hasLoaded && t._glTextures[this.gl.id] && (this.gl.deleteTexture(t._glTextures[this.gl.id]), delete t._glTextures[this.gl.id], !e)) {
                    var r = this._managedTextures.indexOf(t);
                    -1 !== r && d.removeItems(this._managedTextures, r, 1)
                }
            }, i.prototype.handleContextLost = function (t) {
                t.preventDefault()
            }, i.prototype.handleContextRestored = function () {
                this._initContext();
                for (var t = 0; t < this._managedTextures.length; ++t) {
                    var e = this._managedTextures[t];
                    e._glTextures[this.gl.id] && delete e._glTextures[this.gl.id]
                }
            }, i.prototype.destroy = function (t) {
                this.destroyPlugins(), this.view.removeEventListener("webglcontextlost", this.handleContextLost), this.view.removeEventListener("webglcontextrestored", this.handleContextRestored);
                for (var e = 0; e < this._managedTextures.length; ++e) {
                    var r = this._managedTextures[e];
                    this.destroyTexture(r, !0), r.off("update", this.updateTexture, this), r.off("dispose", this.destroyTexture, this)
                }
                n.prototype.destroy.call(this, t), this.uid = 0, this.shaderManager.destroy(), this.maskManager.destroy(), this.stencilManager.destroy(), this.filterManager.destroy(), this.blendModeManager.destroy(), this.shaderManager = null, this.maskManager = null, this.filterManager = null, this.blendModeManager = null, this.currentRenderer = null, this.handleContextLost = null, this.handleContextRestored = null, this._contextOptions = null, this._managedTextures = null, this.drawCount = 0, this.gl.useProgram(null), this.gl.flush(), this.gl = null
            }, i.prototype._mapGlModes = function () {
                var t = this.gl;
                this.blendModes || (this.blendModes = {}, this.blendModes[f.BLEND_MODES.NORMAL] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.ADD] = [t.ONE, t.DST_ALPHA], this.blendModes[f.BLEND_MODES.MULTIPLY] = [t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.SCREEN] = [t.ONE, t.ONE_MINUS_SRC_COLOR], this.blendModes[f.BLEND_MODES.OVERLAY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.DARKEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.LIGHTEN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.COLOR_DODGE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.COLOR_BURN] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.HARD_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.SOFT_LIGHT] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.DIFFERENCE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.EXCLUSION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.HUE] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.SATURATION] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.COLOR] = [t.ONE, t.ONE_MINUS_SRC_ALPHA], this.blendModes[f.BLEND_MODES.LUMINOSITY] = [t.ONE, t.ONE_MINUS_SRC_ALPHA]), this.drawModes || (this.drawModes = {}, this.drawModes[f.DRAW_MODES.POINTS] = t.POINTS, this.drawModes[f.DRAW_MODES.LINES] = t.LINES, this.drawModes[f.DRAW_MODES.LINE_LOOP] = t.LINE_LOOP, this.drawModes[f.DRAW_MODES.LINE_STRIP] = t.LINE_STRIP, this.drawModes[f.DRAW_MODES.TRIANGLES] = t.TRIANGLES, this.drawModes[f.DRAW_MODES.TRIANGLE_STRIP] = t.TRIANGLE_STRIP, this.drawModes[f.DRAW_MODES.TRIANGLE_FAN] = t.TRIANGLE_FAN)
            }
        }, {
            "../../const": 22, "../../utils": 77, "../SystemRenderer": 43, "./filters/FXAAFilter": 51,
            "./managers/BlendModeManager": 53, "./managers/FilterManager": 54, "./managers/MaskManager": 55,
            "./managers/ShaderManager": 56, "./managers/StencilManager": 57, "./utils/ObjectRenderer": 63,
            "./utils/RenderTarget": 65
        }], 50: [function (t, e, r) {
            function i(t, e, r) {
                this.shaders = [], this.padding = 0, this.uniforms = r || {}, this.vertexSrc = t || n.defaultVertexSrc, this.fragmentSrc = e || n.defaultFragmentSrc
            }

            var n = t("../shaders/TextureShader");
            i.prototype.constructor = i, e.exports = i, i.prototype.getShader = function (t) {
                var e = t.gl, r = this.shaders[e.id];
                return r || (r = new n(t.shaderManager, this.vertexSrc, this.fragmentSrc, this.uniforms, this.attributes), this.shaders[e.id] = r), r
            }, i.prototype.applyFilter = function (t, e, r, i) {
                var n = this.getShader(t);
                t.filterManager.applyFilter(n, e, r, i)
            }, i.prototype.syncUniform = function (t) {
                for (var e = 0, r = this.shaders.length; e < r; ++e) this.shaders[e].syncUniform(t)
            }
        }, {"../shaders/TextureShader": 62}], 51: [function (t, e, r) {
            function i() {
                n.call(this, "\nprecision mediump float;\n\nattribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform vec2 resolution;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\n\nvoid texcoords(vec2 fragCoord, vec2 resolution,\n            out vec2 v_rgbNW, out vec2 v_rgbNE,\n            out vec2 v_rgbSW, out vec2 v_rgbSE,\n            out vec2 v_rgbM) {\n    vec2 inverseVP = 1.0 / resolution.xy;\n    v_rgbNW = (fragCoord + vec2(-1.0, -1.0)) * inverseVP;\n    v_rgbNE = (fragCoord + vec2(1.0, -1.0)) * inverseVP;\n    v_rgbSW = (fragCoord + vec2(-1.0, 1.0)) * inverseVP;\n    v_rgbSE = (fragCoord + vec2(1.0, 1.0)) * inverseVP;\n    v_rgbM = vec2(fragCoord * inverseVP);\n}\n\nvoid main(void){\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n   vResolution = resolution;\n\n   //compute the texture coords and send them to varyings\n   texcoords(aTextureCoord * resolution, resolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n}\n", 'precision lowp float;\n\n\n/**\nBasic FXAA implementation based on the code on geeks3d.com with the\nmodification that the texture2DLod stuff was removed since it\'s\nunsupported by WebGL.\n\n--\n\nFrom:\nhttps://github.com/mitsuhiko/webgl-meincraft\n\nCopyright (c) 2011 by Armin Ronacher.\n\nSome rights reserved.\n\nRedistribution and use in source and binary forms, with or without\nmodification, are permitted provided that the following conditions are\nmet:\n\n    * Redistributions of source code must retain the above copyright\n      notice, this list of conditions and the following disclaimer.\n\n    * Redistributions in binary form must reproduce the above\n      copyright notice, this list of conditions and the following\n      disclaimer in the documentation and/or other materials provided\n      with the distribution.\n\n    * The names of the contributors may not be used to endorse or\n      promote products derived from this software without specific\n      prior written permission.\n\nTHIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS\n"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT\nLIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR\nA PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT\nOWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,\nSPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT\nLIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,\nDATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY\nTHEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT\n(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE\nOF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.\n*/\n\n#ifndef FXAA_REDUCE_MIN\n    #define FXAA_REDUCE_MIN   (1.0/ 128.0)\n#endif\n#ifndef FXAA_REDUCE_MUL\n    #define FXAA_REDUCE_MUL   (1.0 / 8.0)\n#endif\n#ifndef FXAA_SPAN_MAX\n    #define FXAA_SPAN_MAX     8.0\n#endif\n\n//optimized version for mobile, where dependent\n//texture reads can be a bottleneck\nvec4 fxaa(sampler2D tex, vec2 fragCoord, vec2 resolution,\n            vec2 v_rgbNW, vec2 v_rgbNE,\n            vec2 v_rgbSW, vec2 v_rgbSE,\n            vec2 v_rgbM) {\n    vec4 color;\n    mediump vec2 inverseVP = vec2(1.0 / resolution.x, 1.0 / resolution.y);\n    vec3 rgbNW = texture2D(tex, v_rgbNW).xyz;\n    vec3 rgbNE = texture2D(tex, v_rgbNE).xyz;\n    vec3 rgbSW = texture2D(tex, v_rgbSW).xyz;\n    vec3 rgbSE = texture2D(tex, v_rgbSE).xyz;\n    vec4 texColor = texture2D(tex, v_rgbM);\n    vec3 rgbM  = texColor.xyz;\n    vec3 luma = vec3(0.299, 0.587, 0.114);\n    float lumaNW = dot(rgbNW, luma);\n    float lumaNE = dot(rgbNE, luma);\n    float lumaSW = dot(rgbSW, luma);\n    float lumaSE = dot(rgbSE, luma);\n    float lumaM  = dot(rgbM,  luma);\n    float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));\n    float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));\n\n    mediump vec2 dir;\n    dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n    dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n    float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) *\n                          (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);\n\n    float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);\n    dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n              max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n              dir * rcpDirMin)) * inverseVP;\n\n    vec3 rgbA = 0.5 * (\n        texture2D(tex, fragCoord * inverseVP + dir * (1.0 / 3.0 - 0.5)).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * (2.0 / 3.0 - 0.5)).xyz);\n    vec3 rgbB = rgbA * 0.5 + 0.25 * (\n        texture2D(tex, fragCoord * inverseVP + dir * -0.5).xyz +\n        texture2D(tex, fragCoord * inverseVP + dir * 0.5).xyz);\n\n    float lumaB = dot(rgbB, luma);\n    if ((lumaB < lumaMin) || (lumaB > lumaMax))\n        color = vec4(rgbA, texColor.a);\n    else\n        color = vec4(rgbB, texColor.a);\n    return color;\n}\n\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vResolution;\n\n//texcoords computed in vertex step\n//to avoid dependent texture reads\nvarying vec2 v_rgbNW;\nvarying vec2 v_rgbNE;\nvarying vec2 v_rgbSW;\nvarying vec2 v_rgbSE;\nvarying vec2 v_rgbM;\n\nuniform sampler2D uSampler;\n\n\nvoid main(void){\n\n    gl_FragColor = fxaa(uSampler, vTextureCoord * vResolution, vResolution, v_rgbNW, v_rgbNE, v_rgbSW, v_rgbSE, v_rgbM);\n\n}\n', {
                    resolution: {
                        type: "v2", value: {x: 1, y: 1}
                    }
                })
            }

            var n = t("./AbstractFilter");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r) {
                var i = t.filterManager, n = this.getShader(t);
                i.applyFilter(n, e, r)
            }
        }, {"./AbstractFilter": 50}], 52: [function (t, e, r) {
            function i(t) {
                var e = new o.Matrix;
                n.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n    vMaskCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vMaskCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform sampler2D mask;\n\nvoid main(void)\n{\n    // check clip! this will stop the mask bleeding out from the edges\n    vec2 text = abs( vMaskCoord - 0.5 );\n    text = step(0.5, text);\n    float clip = 1.0 - max(text.y, text.x);\n    vec4 original = texture2D(uSampler, vTextureCoord);\n    vec4 masky = texture2D(mask, vMaskCoord);\n    original *= (masky.r * masky.a * alpha * clip);\n    gl_FragColor = original;\n}\n", {
                    mask: {
                        type: "sampler2D", value: t._texture
                    }, alpha: {type: "f", value: 1}, otherMatrix: {type: "mat3", value: e.toArray(!0)}
                }), this.maskSprite = t, this.maskMatrix = e
            }

            var n = t("./AbstractFilter"), o = t("../../../math");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r) {
                var i = t.filterManager;
                this.uniforms.mask.value = this.maskSprite._texture, i.calculateMappedMatrix(e.frame, this.maskSprite, this.maskMatrix), this.uniforms.otherMatrix.value = this.maskMatrix.toArray(!0), this.uniforms.alpha.value = this.maskSprite.worldAlpha;
                var n = this.getShader(t);
                i.applyFilter(n, e, r)
            }, Object.defineProperties(i.prototype, {
                map: {
                    get: function () {
                        return this.uniforms.mask.value
                    }, set: function (t) {
                        this.uniforms.mask.value = t
                    }
                }, offset: {
                    get: function () {
                        return this.uniforms.offset.value
                    }, set: function (t) {
                        this.uniforms.offset.value = t
                    }
                }
            })
        }, {"../../../math": 33, "./AbstractFilter": 50}], 53: [function (t, e, r) {
            function i(t) {
                n.call(this, t), this.currentBlendMode = 99999
            }

            var n = t("./WebGLManager");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.setBlendMode = function (t) {
                if (this.currentBlendMode === t) return !1;
                this.currentBlendMode = t;
                var e = this.renderer.blendModes[this.currentBlendMode];
                return this.renderer.gl.blendFunc(e[0], e[1]), !0
            }
        }, {"./WebGLManager": 58}], 54: [function (t, e, r) {
            function i(t) {
                n.call(this, t), this.filterStack = [], this.filterStack.push({
                    renderTarget: t.currentRenderTarget, filter: [], bounds: null
                }), this.texturePool = [], this.textureSize = new l.Rectangle(0, 0, t.width, t.height), this.currentFrame = null
            }

            var n = t("./WebGLManager"), o = t("../utils/RenderTarget"), s = t("../../../const"),
                a = t("../utils/Quad"), l = t("../../../math");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.onContextChange = function () {
                this.texturePool.length = 0;
                var t = this.renderer.gl;
                this.quad = new a(t)
            }, i.prototype.setFilterStack = function (t) {
                this.filterStack = t
            }, i.prototype.pushFilter = function (t, e) {
                var r = t.filterArea ? t.filterArea.clone() : t.getBounds();
                r.x = 0 | r.x, r.y = 0 | r.y, r.width = 0 | r.width, r.height = 0 | r.height;
                var i = 0 | e[0].padding;
                if (r.x -= i, r.y -= i, r.width += 2 * i, r.height += 2 * i, this.renderer.currentRenderTarget.transform) {
                    var n = this.renderer.currentRenderTarget.transform;
                    r.x += n.tx, r.y += n.ty, this.capFilterArea(r), r.x -= n.tx, r.y -= n.ty
                } else this.capFilterArea(r);
                if (r.width > 0 && r.height > 0) {
                    this.currentFrame = r;
                    var o = this.getRenderTarget();
                    this.renderer.setRenderTarget(o), o.clear(), this.filterStack.push({renderTarget: o, filter: e})
                } else this.filterStack.push({renderTarget: null, filter: e})
            }, i.prototype.popFilter = function () {
                var t = this.filterStack.pop(), e = this.filterStack[this.filterStack.length - 1], r = t.renderTarget;
                if (t.renderTarget) {
                    var i = e.renderTarget, n = this.renderer.gl;
                    this.currentFrame = r.frame, this.quad.map(this.textureSize, r.frame), n.bindBuffer(n.ARRAY_BUFFER, this.quad.vertexBuffer), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, this.quad.indexBuffer);
                    var o = t.filter;
                    if (n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aVertexPosition, 2, n.FLOAT, !1, 0, 0), n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aTextureCoord, 2, n.FLOAT, !1, 0, 32), n.vertexAttribPointer(this.renderer.shaderManager.defaultShader.attributes.aColor, 4, n.FLOAT, !1, 0, 64), this.renderer.blendModeManager.setBlendMode(s.BLEND_MODES.NORMAL), 1 === o.length) o[0].uniforms.dimensions && (o[0].uniforms.dimensions.value[0] = this.renderer.width, o[0].uniforms.dimensions.value[1] = this.renderer.height, o[0].uniforms.dimensions.value[2] = this.quad.vertices[0], o[0].uniforms.dimensions.value[3] = this.quad.vertices[5]), o[0].applyFilter(this.renderer, r, i), this.returnRenderTarget(r); else {
                        for (var a = r, l = this.getRenderTarget(!0), h = 0; h < o.length - 1; h++) {
                            var u = o[h];
                            u.uniforms.dimensions && (u.uniforms.dimensions.value[0] = this.renderer.width, u.uniforms.dimensions.value[1] = this.renderer.height, u.uniforms.dimensions.value[2] = this.quad.vertices[0], u.uniforms.dimensions.value[3] = this.quad.vertices[5]), u.applyFilter(this.renderer, a, l);
                            var c = a;
                            a = l, l = c
                        }
                        o[o.length - 1].applyFilter(this.renderer, a, i), this.returnRenderTarget(a), this.returnRenderTarget(l)
                    }
                    return t.filter
                }
            }, i.prototype.getRenderTarget = function (t) {
                var e = this.texturePool.pop() || new o(this.renderer.gl, this.textureSize.width, this.textureSize.height, s.SCALE_MODES.LINEAR, this.renderer.resolution * s.FILTER_RESOLUTION);
                return e.frame = this.currentFrame, t && e.clear(!0), e
            }, i.prototype.returnRenderTarget = function (t) {
                this.texturePool.push(t)
            }, i.prototype.applyFilter = function (t, e, r, i) {
                var n = this.renderer.gl;
                this.renderer.setRenderTarget(r), i && r.clear(), this.renderer.shaderManager.setShader(t), t.uniforms.projectionMatrix.value = this.renderer.currentRenderTarget.projectionMatrix.toArray(!0), t.syncUniforms(), n.activeTexture(n.TEXTURE0), n.bindTexture(n.TEXTURE_2D, e.texture), n.drawElements(n.TRIANGLES, 6, n.UNSIGNED_SHORT, 0), this.renderer.drawCount++
            }, i.prototype.calculateMappedMatrix = function (t, e, r) {
                var i = e.worldTransform.copy(l.Matrix.TEMP_MATRIX), n = e._texture.baseTexture, o = r.identity(),
                    s = this.textureSize.height / this.textureSize.width;
                o.translate(t.x / this.textureSize.width, t.y / this.textureSize.height), o.scale(1, s);
                var a = this.textureSize.width / n.width, h = this.textureSize.height / n.height;
                return i.tx /= n.width * a, i.ty /= n.width * a, i.invert(), o.prepend(i), o.scale(1, 1 / s), o.scale(a, h), o.translate(e.anchor.x, e.anchor.y), o
            }, i.prototype.capFilterArea = function (t) {
                t.x < 0 && (t.width += t.x, t.x = 0), t.y < 0 && (t.height += t.y, t.y = 0), t.x + t.width > this.textureSize.width && (t.width = this.textureSize.width - t.x), t.y + t.height > this.textureSize.height && (t.height = this.textureSize.height - t.y)
            }, i.prototype.resize = function (t, e) {
                this.textureSize.width = t, this.textureSize.height = e;
                for (var r = 0; r < this.texturePool.length; r++) this.texturePool[r].resize(t, e)
            }, i.prototype.destroy = function () {
                this.quad.destroy(), n.prototype.destroy.call(this), this.filterStack = null, this.offsetY = 0;
                for (var t = 0; t < this.texturePool.length; t++) this.texturePool[t].destroy();
                this.texturePool = null
            }
        }, {
            "../../../const": 22, "../../../math": 33, "../utils/Quad": 64, "../utils/RenderTarget": 65,
            "./WebGLManager": 58
        }], 55: [function (t, e, r) {
            function i(t) {
                n.call(this, t), this.stencilStack = [], this.reverse = !0, this.count = 0, this.alphaMaskPool = []
            }

            var n = t("./WebGLManager"), o = t("../filters/SpriteMaskFilter");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.pushMask = function (t, e) {
                e.texture ? this.pushSpriteMask(t, e) : this.pushStencilMask(t, e)
            }, i.prototype.popMask = function (t, e) {
                e.texture ? this.popSpriteMask(t, e) : this.popStencilMask(t, e)
            }, i.prototype.pushSpriteMask = function (t, e) {
                var r = this.alphaMaskPool.pop();
                r || (r = [new o(e)]), r[0].maskSprite = e, this.renderer.filterManager.pushFilter(t, r)
            }, i.prototype.popSpriteMask = function () {
                var t = this.renderer.filterManager.popFilter();
                this.alphaMaskPool.push(t)
            }, i.prototype.pushStencilMask = function (t, e) {
                this.renderer.stencilManager.pushMask(e)
            }, i.prototype.popStencilMask = function (t, e) {
                this.renderer.stencilManager.popMask(e)
            }
        }, {"../filters/SpriteMaskFilter": 52, "./WebGLManager": 58}], 56: [function (t, e, r) {
            function i(t) {
                n.call(this, t), this.maxAttibs = 10, this.attribState = [], this.tempAttribState = [];
                for (var e = 0; e < this.maxAttibs; e++) this.attribState[e] = !1;
                this.stack = [], this._currentId = -1, this.currentShader = null
            }

            var n = t("./WebGLManager"), o = t("../shaders/TextureShader"), s = t("../shaders/ComplexPrimitiveShader"),
                a = t("../shaders/PrimitiveShader"), l = t("../../../utils");
            (i.prototype = Object.create(n.prototype)).constructor = i, l.pluginTarget.mixin(i), e.exports = i, i.prototype.onContextChange = function () {
                this.initPlugins();
                var t = this.renderer.gl;
                this.maxAttibs = t.getParameter(t.MAX_VERTEX_ATTRIBS), this.attribState = [];
                for (var e = 0; e < this.maxAttibs; e++) this.attribState[e] = !1;
                this.defaultShader = new o(this), this.primitiveShader = new a(this), this.complexPrimitiveShader = new s(this)
            }, i.prototype.setAttribs = function (t) {
                var e;
                for (e = 0; e < this.tempAttribState.length; e++) this.tempAttribState[e] = !1;
                for (var r in t) this.tempAttribState[t[r]] = !0;
                var i = this.renderer.gl;
                for (e = 0; e < this.attribState.length; e++) this.attribState[e] !== this.tempAttribState[e] && (this.attribState[e] = this.tempAttribState[e], this.attribState[e] ? i.enableVertexAttribArray(e) : i.disableVertexAttribArray(e))
            }, i.prototype.setShader = function (t) {
                return this._currentId !== t.uid && (this._currentId = t.uid, this.currentShader = t, this.renderer.gl.useProgram(t.program), this.setAttribs(t.attributes), !0)
            }, i.prototype.destroy = function () {
                this.primitiveShader.destroy(), this.complexPrimitiveShader.destroy(), n.prototype.destroy.call(this), this.destroyPlugins(), this.attribState = null, this.tempAttribState = null
            }
        }, {
            "../../../utils": 77, "../shaders/ComplexPrimitiveShader": 59, "../shaders/PrimitiveShader": 60,
            "../shaders/TextureShader": 62, "./WebGLManager": 58
        }], 57: [function (t, e, r) {
            function i(t) {
                n.call(this, t), this.stencilMaskStack = null
            }

            var n = t("./WebGLManager"), o = t("../../../utils");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.setMaskStack = function (t) {
                this.stencilMaskStack = t;
                var e = this.renderer.gl;
                0 === t.stencilStack.length ? e.disable(e.STENCIL_TEST) : e.enable(e.STENCIL_TEST)
            }, i.prototype.pushStencil = function (t, e) {
                this.renderer.currentRenderTarget.attachStencilBuffer();
                var r = this.renderer.gl, i = this.stencilMaskStack;
                this.bindGraphics(t, e), 0 === i.stencilStack.length && (r.enable(r.STENCIL_TEST), r.clear(r.STENCIL_BUFFER_BIT), i.reverse = !0, i.count = 0), i.stencilStack.push(e);
                var n = i.count;
                r.colorMask(!1, !1, !1, !1), r.stencilFunc(r.ALWAYS, 0, 255), r.stencilOp(r.KEEP, r.KEEP, r.INVERT), 1 === e.mode ? (r.drawElements(r.TRIANGLE_FAN, e.indices.length - 4, r.UNSIGNED_SHORT, 0), i.reverse ? (r.stencilFunc(r.EQUAL, 255 - n, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)) : (r.stencilFunc(r.EQUAL, n, 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)), r.drawElements(r.TRIANGLE_FAN, 4, r.UNSIGNED_SHORT, 2 * (e.indices.length - 4)), i.reverse ? r.stencilFunc(r.EQUAL, 255 - (n + 1), 255) : r.stencilFunc(r.EQUAL, n + 1, 255), i.reverse = !i.reverse) : (i.reverse ? (r.stencilFunc(r.EQUAL, n, 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)) : (r.stencilFunc(r.EQUAL, 255 - n, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)), r.drawElements(r.TRIANGLE_STRIP, e.indices.length, r.UNSIGNED_SHORT, 0), i.reverse ? r.stencilFunc(r.EQUAL, n + 1, 255) : r.stencilFunc(r.EQUAL, 255 - (n + 1), 255)), r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP), i.count++
            }, i.prototype.bindGraphics = function (t, e) {
                var r, i = this.renderer.gl;
                1 === e.mode ? (r = this.renderer.shaderManager.complexPrimitiveShader, this.renderer.shaderManager.setShader(r), i.uniformMatrix3fv(r.uniforms.translationMatrix._location, !1, t.worldTransform.toArray(!0)), i.uniformMatrix3fv(r.uniforms.projectionMatrix._location, !1, this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)), i.uniform3fv(r.uniforms.tint._location, o.hex2rgb(t.tint)), i.uniform3fv(r.uniforms.color._location, e.color), i.uniform1f(r.uniforms.alpha._location, t.worldAlpha), i.bindBuffer(i.ARRAY_BUFFER, e.buffer), i.vertexAttribPointer(r.attributes.aVertexPosition, 2, i.FLOAT, !1, 8, 0), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.indexBuffer)) : (r = this.renderer.shaderManager.primitiveShader, this.renderer.shaderManager.setShader(r), i.uniformMatrix3fv(r.uniforms.translationMatrix._location, !1, t.worldTransform.toArray(!0)), i.uniformMatrix3fv(r.uniforms.projectionMatrix._location, !1, this.renderer.currentRenderTarget.projectionMatrix.toArray(!0)), i.uniform3fv(r.uniforms.tint._location, o.hex2rgb(t.tint)), i.uniform1f(r.uniforms.alpha._location, t.worldAlpha), i.bindBuffer(i.ARRAY_BUFFER, e.buffer), i.vertexAttribPointer(r.attributes.aVertexPosition, 2, i.FLOAT, !1, 24, 0), i.vertexAttribPointer(r.attributes.aColor, 4, i.FLOAT, !1, 24, 8), i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, e.indexBuffer))
            }, i.prototype.popStencil = function (t, e) {
                var r = this.renderer.gl, i = this.stencilMaskStack;
                if (i.stencilStack.pop(), i.count--, 0 === i.stencilStack.length) r.disable(r.STENCIL_TEST); else {
                    var n = i.count;
                    this.bindGraphics(t, e), r.colorMask(!1, !1, !1, !1), 1 === e.mode ? (i.reverse = !i.reverse, i.reverse ? (r.stencilFunc(r.EQUAL, 255 - (n + 1), 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)) : (r.stencilFunc(r.EQUAL, n + 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)), r.drawElements(r.TRIANGLE_FAN, 4, r.UNSIGNED_SHORT, 2 * (e.indices.length - 4)), r.stencilFunc(r.ALWAYS, 0, 255), r.stencilOp(r.KEEP, r.KEEP, r.INVERT), r.drawElements(r.TRIANGLE_FAN, e.indices.length - 4, r.UNSIGNED_SHORT, 0), this.renderer.drawCount += 2, i.reverse ? r.stencilFunc(r.EQUAL, n, 255) : r.stencilFunc(r.EQUAL, 255 - n, 255)) : (i.reverse ? (r.stencilFunc(r.EQUAL, n + 1, 255), r.stencilOp(r.KEEP, r.KEEP, r.DECR)) : (r.stencilFunc(r.EQUAL, 255 - (n + 1), 255), r.stencilOp(r.KEEP, r.KEEP, r.INCR)), r.drawElements(r.TRIANGLE_STRIP, e.indices.length, r.UNSIGNED_SHORT, 0), this.renderer.drawCount++, i.reverse ? r.stencilFunc(r.EQUAL, n, 255) : r.stencilFunc(r.EQUAL, 255 - n, 255)), r.colorMask(!0, !0, !0, !0), r.stencilOp(r.KEEP, r.KEEP, r.KEEP)
                }
            }, i.prototype.destroy = function () {
                n.prototype.destroy.call(this), this.stencilMaskStack.stencilStack = null
            }, i.prototype.pushMask = function (t) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics), t.dirty && this.renderer.plugins.graphics.updateGraphics(t, this.renderer.gl), t._webGL[this.renderer.gl.id].data.length && this.pushStencil(t, t._webGL[this.renderer.gl.id].data[0])
            }, i.prototype.popMask = function (t) {
                this.renderer.setObjectRenderer(this.renderer.plugins.graphics), this.popStencil(t, t._webGL[this.renderer.gl.id].data[0])
            }
        }, {"../../../utils": 77, "./WebGLManager": 58}], 58: [function (t, e, r) {
            function i(t) {
                this.renderer = t, this.renderer.on("context", this.onContextChange, this)
            }

            i.prototype.constructor = i, e.exports = i, i.prototype.onContextChange = function () {
            }, i.prototype.destroy = function () {
                this.renderer.off("context", this.onContextChange, this), this.renderer = null
            }
        }, {}], 59: [function (t, e, r) {
            function i(t) {
                n.call(this, t, ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"].join("\n"), ["precision mediump float;", "varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"), {
                    tint: {
                        type: "3f", value: [0, 0, 0]
                    }, alpha: {type: "1f", value: 0}, color: {type: "3f", value: [0, 0, 0]},
                    translationMatrix: {type: "mat3", value: new Float32Array(9)},
                    projectionMatrix: {type: "mat3", value: new Float32Array(9)}
                }, {aVertexPosition: 0})
            }

            var n = t("./Shader");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i
        }, {"./Shader": 61}], 60: [function (t, e, r) {
            function i(t) {
                n.call(this, t, ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "uniform float alpha;", "uniform float flipY;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"].join("\n"), ["precision mediump float;", "varying vec4 vColor;", "void main(void){", "   gl_FragColor = vColor;", "}"].join("\n"), {
                    tint: {
                        type: "3f", value: [0, 0, 0]
                    }, alpha: {type: "1f", value: 0}, translationMatrix: {type: "mat3", value: new Float32Array(9)},
                    projectionMatrix: {type: "mat3", value: new Float32Array(9)}
                }, {aVertexPosition: 0, aColor: 0})
            }

            var n = t("./Shader");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i
        }, {"./Shader": 61}], 61: [function (t, e, r) {
            function i(t, e, r, i, o) {
                if (!e || !r) throw new Error("Pixi.js Error. Shader requires vertexSrc and fragmentSrc");
                this.uid = n.uid(), this.gl = t.renderer.gl, this.shaderManager = t, this.program = null, this.uniforms = i || {}, this.attributes = o || {}, this.textureCount = 1, this.vertexSrc = e, this.fragmentSrc = r, this.init()
            }

            var n = t("../../../utils");
            i.prototype.constructor = i, e.exports = i, i.prototype.init = function () {
                this.compile(), this.gl.useProgram(this.program), this.cacheUniformLocations(Object.keys(this.uniforms)), this.cacheAttributeLocations(Object.keys(this.attributes))
            }, i.prototype.cacheUniformLocations = function (t) {
                for (var e = 0; e < t.length; ++e) this.uniforms[t[e]]._location = this.gl.getUniformLocation(this.program, t[e])
            }, i.prototype.cacheAttributeLocations = function (t) {
                for (var e = 0; e < t.length; ++e) this.attributes[t[e]] = this.gl.getAttribLocation(this.program, t[e])
            }, i.prototype.compile = function () {
                var t = this.gl, e = this._glCompile(t.VERTEX_SHADER, this.vertexSrc),
                    r = this._glCompile(t.FRAGMENT_SHADER, this.fragmentSrc), i = t.createProgram();
                return t.attachShader(i, e), t.attachShader(i, r), t.linkProgram(i), t.getProgramParameter(i, t.LINK_STATUS) || (console.error("Pixi.js Error: Could not initialize shader."), console.error("gl.VALIDATE_STATUS", t.getProgramParameter(i, t.VALIDATE_STATUS)), console.error("gl.getError()", t.getError()), "" !== t.getProgramInfoLog(i) && console.warn("Pixi.js Warning: gl.getProgramInfoLog()", t.getProgramInfoLog(i)), t.deleteProgram(i), i = null), t.deleteShader(e), t.deleteShader(r), this.program = i
            }, i.prototype.syncUniform = function (t) {
                var e, r, i = t._location, o = t.value, s = this.gl;
                switch (t.type) {
                    case"b":
                    case"bool":
                    case"boolean":
                        s.uniform1i(i, o ? 1 : 0);
                        break;
                    case"i":
                    case"1i":
                        s.uniform1i(i, o);
                        break;
                    case"f":
                    case"1f":
                        s.uniform1f(i, o);
                        break;
                    case"2f":
                        s.uniform2f(i, o[0], o[1]);
                        break;
                    case"3f":
                        s.uniform3f(i, o[0], o[1], o[2]);
                        break;
                    case"4f":
                        s.uniform4f(i, o[0], o[1], o[2], o[3]);
                        break;
                    case"v2":
                        s.uniform2f(i, o.x, o.y);
                        break;
                    case"v3":
                        s.uniform3f(i, o.x, o.y, o.z);
                        break;
                    case"v4":
                        s.uniform4f(i, o.x, o.y, o.z, o.w);
                        break;
                    case"1iv":
                        s.uniform1iv(i, o);
                        break;
                    case"2iv":
                        s.uniform2iv(i, o);
                        break;
                    case"3iv":
                        s.uniform3iv(i, o);
                        break;
                    case"4iv":
                        s.uniform4iv(i, o);
                        break;
                    case"1fv":
                        s.uniform1fv(i, o);
                        break;
                    case"2fv":
                        s.uniform2fv(i, o);
                        break;
                    case"3fv":
                        s.uniform3fv(i, o);
                        break;
                    case"4fv":
                        s.uniform4fv(i, o);
                        break;
                    case"m2":
                    case"mat2":
                    case"Matrix2fv":
                        s.uniformMatrix2fv(i, t.transpose, o);
                        break;
                    case"m3":
                    case"mat3":
                    case"Matrix3fv":
                        s.uniformMatrix3fv(i, t.transpose, o);
                        break;
                    case"m4":
                    case"mat4":
                    case"Matrix4fv":
                        s.uniformMatrix4fv(i, t.transpose, o);
                        break;
                    case"c":
                        "number" == typeof o && (o = n.hex2rgb(o)), s.uniform3f(i, o[0], o[1], o[2]);
                        break;
                    case"iv1":
                        s.uniform1iv(i, o);
                        break;
                    case"iv":
                        s.uniform3iv(i, o);
                        break;
                    case"fv1":
                        s.uniform1fv(i, o);
                        break;
                    case"fv":
                        s.uniform3fv(i, o);
                        break;
                    case"v2v":
                        for (t._array || (t._array = new Float32Array(2 * o.length)), e = 0, r = o.length; e < r; ++e) t._array[2 * e] = o[e].x, t._array[2 * e + 1] = o[e].y;
                        s.uniform2fv(i, t._array);
                        break;
                    case"v3v":
                        for (t._array || (t._array = new Float32Array(3 * o.length)), e = 0, r = o.length; e < r; ++e) t._array[3 * e] = o[e].x, t._array[3 * e + 1] = o[e].y, t._array[3 * e + 2] = o[e].z;
                        s.uniform3fv(i, t._array);
                        break;
                    case"v4v":
                        for (t._array || (t._array = new Float32Array(4 * o.length)), e = 0, r = o.length; e < r; ++e) t._array[4 * e] = o[e].x, t._array[4 * e + 1] = o[e].y, t._array[4 * e + 2] = o[e].z, t._array[4 * e + 3] = o[e].w;
                        s.uniform4fv(i, t._array);
                        break;
                    case"t":
                    case"sampler2D":
                        if (!t.value || !t.value.baseTexture.hasLoaded) break;
                        s.activeTexture(s["TEXTURE" + this.textureCount]);
                        var a = t.value.baseTexture._glTextures[s.id];
                        a || (this.initSampler2D(t), a = t.value.baseTexture._glTextures[s.id]), s.bindTexture(s.TEXTURE_2D, a), s.uniform1i(t._location, this.textureCount), this.textureCount++;
                        break;
                    default:
                        console.warn("Pixi.js Shader Warning: Unknown uniform type: " + t.type)
                }
            }, i.prototype.syncUniforms = function () {
                this.textureCount = 1;
                for (var t in this.uniforms) this.syncUniform(this.uniforms[t])
            }, i.prototype.initSampler2D = function (t) {
                var e = this.gl, r = t.value.baseTexture;
                if (r.hasLoaded) if (t.textureData) {
                    var i = t.textureData;
                    r._glTextures[e.id] = e.createTexture(), e.bindTexture(e.TEXTURE_2D, r._glTextures[e.id]), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, r.premultipliedAlpha), e.texImage2D(e.TEXTURE_2D, 0, i.luminance ? e.LUMINANCE : e.RGBA, e.RGBA, e.UNSIGNED_BYTE, r.source), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, i.magFilter ? i.magFilter : e.LINEAR), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, i.wrapS ? i.wrapS : e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, i.wrapS ? i.wrapS : e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, i.wrapT ? i.wrapT : e.CLAMP_TO_EDGE)
                } else this.shaderManager.renderer.updateTexture(r)
            }, i.prototype.destroy = function () {
                this.gl.deleteProgram(this.program), this.gl = null, this.uniforms = null, this.attributes = null, this.vertexSrc = null, this.fragmentSrc = null
            }, i.prototype._glCompile = function (t, e) {
                var r = this.gl.createShader(t);
                return this.gl.shaderSource(r, e), this.gl.compileShader(r), this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS) ? r : null
            }
        }, {"../../../utils": 77}], 62: [function (t, e, r) {
            function i(t, e, r, o, s) {
                var a = {
                    uSampler: {type: "sampler2D", value: 0},
                    projectionMatrix: {type: "mat3", value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1])}
                };
                if (o) for (var l in o) a[l] = o[l];
                var h = {aVertexPosition: 0, aTextureCoord: 0, aColor: 0};
                if (s) for (var u in s) h[u] = s[u];
                e = e || i.defaultVertexSrc, r = r || i.defaultFragmentSrc, n.call(this, t, e, r, a, h)
            }

            var n = t("./Shader");
            i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i.defaultVertexSrc = ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"].join("\n"), i.defaultFragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"].join("\n")
        }, {"./Shader": 61}], 63: [function (t, e, r) {
            function i(t) {
                n.call(this, t)
            }

            var n = t("../managers/WebGLManager");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.start = function () {
            }, i.prototype.stop = function () {
                this.flush()
            }, i.prototype.flush = function () {
            }, i.prototype.render = function (t) {
            }
        }, {"../managers/WebGLManager": 58}], 64: [function (t, e, r) {
            function i(t) {
                this.gl = t, this.vertices = new Float32Array([0, 0, 200, 0, 200, 200, 0, 200]), this.uvs = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.colors = new Float32Array([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]), this.indices = new Uint16Array([0, 1, 2, 0, 3, 2]), this.vertexBuffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, 128, t.DYNAMIC_DRAW), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW), this.upload()
            }

            i.prototype.constructor = i, i.prototype.map = function (t, e) {
                var r = 0, i = 0;
                this.uvs[0] = r, this.uvs[1] = i, this.uvs[2] = r + e.width / t.width, this.uvs[3] = i, this.uvs[4] = r + e.width / t.width, this.uvs[5] = i + e.height / t.height, this.uvs[6] = r, this.uvs[7] = i + e.height / t.height, r = e.x, i = e.y, this.vertices[0] = r, this.vertices[1] = i, this.vertices[2] = r + e.width, this.vertices[3] = i, this.vertices[4] = r + e.width, this.vertices[5] = i + e.height, this.vertices[6] = r, this.vertices[7] = i + e.height, this.upload()
            }, i.prototype.upload = function () {
                var t = this.gl;
                t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferSubData(t.ARRAY_BUFFER, 0, this.vertices), t.bufferSubData(t.ARRAY_BUFFER, 32, this.uvs), t.bufferSubData(t.ARRAY_BUFFER, 64, this.colors)
            }, i.prototype.destroy = function () {
                var t = this.gl;
                t.deleteBuffer(this.vertexBuffer), t.deleteBuffer(this.indexBuffer)
            }, e.exports = i
        }, {}], 65: [function (t, e, r) {
            var i = t("../../../math"), n = t("../../../utils"), o = t("../../../const"), s = t("./StencilMaskStack"),
                a = function (t, e, r, a, l, h) {
                    this.gl = t, this.frameBuffer = null, this.texture = null, this.size = new i.Rectangle(0, 0, 1, 1), this.resolution = l || o.RESOLUTION, this.projectionMatrix = new i.Matrix, this.transform = null, this.frame = null, this.stencilBuffer = null, this.stencilMaskStack = new s, this.filterStack = [{
                        renderTarget: this, filter: [], bounds: this.size
                    }], this.scaleMode = a || o.SCALE_MODES.DEFAULT, this.root = h, this.root || (this.frameBuffer = t.createFramebuffer(), this.texture = t.createTexture(), t.bindTexture(t.TEXTURE_2D, this.texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, a === o.SCALE_MODES.LINEAR ? t.LINEAR : t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, a === o.SCALE_MODES.LINEAR ? t.LINEAR : t.NEAREST), n.isPowerOfTwo(e, r) ? (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.REPEAT), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.REPEAT)) : (t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE)), t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer), t.framebufferTexture2D(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, this.texture, 0)), this.resize(e, r)
                };
            a.prototype.constructor = a, e.exports = a, a.prototype.clear = function (t) {
                var e = this.gl;
                t && e.bindFramebuffer(e.FRAMEBUFFER, this.frameBuffer), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT)
            }, a.prototype.attachStencilBuffer = function () {
                if (!this.stencilBuffer && !this.root) {
                    var t = this.gl;
                    this.stencilBuffer = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, this.stencilBuffer), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.RENDERBUFFER, this.stencilBuffer), t.renderbufferStorage(t.RENDERBUFFER, t.DEPTH_STENCIL, this.size.width * this.resolution, this.size.height * this.resolution)
                }
            }, a.prototype.activate = function () {
                var t = this.gl;
                t.bindFramebuffer(t.FRAMEBUFFER, this.frameBuffer);
                var e = this.frame || this.size;
                this.calculateProjection(e), this.transform && this.projectionMatrix.append(this.transform), t.viewport(0, 0, e.width * this.resolution, e.height * this.resolution)
            }, a.prototype.calculateProjection = function (t) {
                var e = this.projectionMatrix;
                e.identity(), this.root ? (e.a = 1 / t.width * 2, e.d = -1 / t.height * 2, e.tx = -1 - t.x * e.a, e.ty = 1 - t.y * e.d) : (e.a = 1 / t.width * 2, e.d = 1 / t.height * 2, e.tx = -1 - t.x * e.a, e.ty = -1 - t.y * e.d)
            }, a.prototype.resize = function (t, e) {
                if (t |= 0, e |= 0, this.size.width !== t || this.size.height !== e) {
                    if (this.size.width = t, this.size.height = e, !this.root) {
                        var r = this.gl;
                        r.bindTexture(r.TEXTURE_2D, this.texture), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, t * this.resolution, e * this.resolution, 0, r.RGBA, r.UNSIGNED_BYTE, null), this.stencilBuffer && (r.bindRenderbuffer(r.RENDERBUFFER, this.stencilBuffer), r.renderbufferStorage(r.RENDERBUFFER, r.DEPTH_STENCIL, t * this.resolution, e * this.resolution))
                    }
                    var i = this.frame || this.size;
                    this.calculateProjection(i)
                }
            }, a.prototype.destroy = function () {
                var t = this.gl;
                t.deleteRenderbuffer(this.stencilBuffer), t.deleteFramebuffer(this.frameBuffer), t.deleteTexture(this.texture), this.frameBuffer = null, this.texture = null
            }
        }, {"../../../const": 22, "../../../math": 33, "../../../utils": 77, "./StencilMaskStack": 66}],
        66: [function (t, e, r) {
            function i() {
                this.stencilStack = [], this.reverse = !0, this.count = 0
            }

            i.prototype.constructor = i, e.exports = i
        }, {}], 67: [function (t, e, r) {
            function i(t) {
                s.call(this), this.anchor = new n.Point, this._texture = null, this._width = 0, this._height = 0, this.tint = 16777215, this.blendMode = h.BLEND_MODES.NORMAL, this.shader = null, this.cachedTint = 16777215, this.texture = t || o.EMPTY
            }

            var n = t("../math"), o = t("../textures/Texture"), s = t("../display/Container"),
                a = t("../renderers/canvas/utils/CanvasTinter"), l = t("../utils"), h = t("../const"), u = new n.Point,
                c = n.GroupD8, p = new n.Matrix;
            (i.prototype = Object.create(s.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                width: {
                    get: function () {
                        return Math.abs(this.scale.x) * this.texture._frame.width
                    }, set: function (t) {
                        var e = l.sign(this.scale.x) || 1;
                        this.scale.x = e * t / this.texture._frame.width, this._width = t
                    }
                }, height: {
                    get: function () {
                        return Math.abs(this.scale.y) * this.texture._frame.height
                    }, set: function (t) {
                        var e = l.sign(this.scale.y) || 1;
                        this.scale.y = e * t / this.texture._frame.height, this._height = t
                    }
                }, texture: {
                    get: function () {
                        return this._texture
                    }, set: function (t) {
                        this._texture !== t && (this._texture = t, this.cachedTint = 16777215, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                    }
                }
            }), i.prototype._onTextureUpdate = function () {
                this._width && (this.scale.x = l.sign(this.scale.x) * this._width / this.texture.frame.width), this._height && (this.scale.y = l.sign(this.scale.y) * this._height / this.texture.frame.height)
            }, i.prototype._renderWebGL = function (t) {
                t.setObjectRenderer(t.plugins.sprite), t.plugins.sprite.render(this)
            }, i.prototype.getBounds = function (t) {
                if (!this._currentBounds) {
                    var e, r, i, n, o = this._texture._frame.width, s = this._texture._frame.height,
                        a = o * (1 - this.anchor.x), l = o * -this.anchor.x, h = s * (1 - this.anchor.y),
                        u = s * -this.anchor.y, c = t || this.worldTransform, p = c.a, d = c.b, f = c.c, m = c.d,
                        g = c.tx, v = c.ty, _ = p * l + f * u + g, y = m * u + d * l + v, x = p * a + f * u + g,
                        b = m * u + d * a + v, T = p * a + f * h + g, w = m * h + d * a + v, E = p * l + f * h + g,
                        S = m * h + d * l + v;
                    if (e = _, e = x < e ? x : e, e = T < e ? T : e, e = E < e ? E : e, i = y, i = b < i ? b : i, i = w < i ? w : i, i = S < i ? S : i, r = _, r = x > r ? x : r, r = T > r ? T : r, r = E > r ? E : r, n = y, n = b > n ? b : n, n = w > n ? w : n, n = S > n ? S : n, this.children.length) {
                        var A = this.containerGetBounds();
                        a = A.x, l = A.x + A.width, h = A.y, u = A.y + A.height, e = e < a ? e : a, i = i < h ? i : h, r = r > l ? r : l, n = n > u ? n : u
                    }
                    var M = this._bounds;
                    M.x = e, M.width = r - e, M.y = i, M.height = n - i, this._currentBounds = M
                }
                return this._currentBounds
            }, i.prototype.getLocalBounds = function () {
                return this._bounds.x = -this._texture._frame.width * this.anchor.x, this._bounds.y = -this._texture._frame.height * this.anchor.y, this._bounds.width = this._texture._frame.width, this._bounds.height = this._texture._frame.height, this._bounds
            }, i.prototype.containsPoint = function (t) {
                this.worldTransform.applyInverse(t, u);
                var e, r = this._texture._frame.width, i = this._texture._frame.height, n = -r * this.anchor.x;
                return u.x > n && u.x < n + r && (e = -i * this.anchor.y, u.y > e && u.y < e + i)
            }, i.prototype._renderCanvas = function (t) {
                if (!(this.texture.crop.width <= 0 || this.texture.crop.height <= 0)) {
                    var e = t.blendModes[this.blendMode];
                    if (e !== t.context.globalCompositeOperation && (t.context.globalCompositeOperation = e), this.texture.valid) {
                        var r, i, n = this._texture, o = this.worldTransform, s = n.crop.width, l = n.crop.height;
                        t.context.globalAlpha = this.worldAlpha;
                        var u = n.baseTexture.scaleMode === h.SCALE_MODES.LINEAR;
                        t.smoothProperty && t.context[t.smoothProperty] !== u && (t.context[t.smoothProperty] = u), 2 == (3 & n.rotate) && (s = n.crop.height, l = n.crop.width), n.trim ? (r = n.crop.width / 2 + n.trim.x - this.anchor.x * n.trim.width, i = n.crop.height / 2 + n.trim.y - this.anchor.y * n.trim.height) : (r = (.5 - this.anchor.x) * n._frame.width, i = (.5 - this.anchor.y) * n._frame.height), n.rotate && (o.copy(p), o = p, c.matrixAppendRotationInv(o, n.rotate, r, i), r = 0, i = 0), r -= s / 2, i -= l / 2, t.roundPixels ? (t.context.setTransform(o.a, o.b, o.c, o.d, o.tx * t.resolution | 0, o.ty * t.resolution | 0), r |= 0, i |= 0) : t.context.setTransform(o.a, o.b, o.c, o.d, o.tx * t.resolution, o.ty * t.resolution);
                        var d = n.baseTexture.resolution;
                        16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = a.getTintedTexture(this, this.tint)), t.context.drawImage(this.tintedTexture, 0, 0, s * d, l * d, r * t.resolution, i * t.resolution, s * t.resolution, l * t.resolution)) : t.context.drawImage(n.baseTexture.source, n.crop.x * d, n.crop.y * d, s * d, l * d, r * t.resolution, i * t.resolution, s * t.resolution, l * t.resolution)
                    }
                }
            }, i.prototype.destroy = function (t, e) {
                s.prototype.destroy.call(this), this.anchor = null, t && this._texture.destroy(e), this._texture = null, this.shader = null
            }, i.fromFrame = function (t) {
                var e = l.TextureCache[t];
                if (!e) throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                return new i(e)
            }, i.fromImage = function (t, e, r) {
                return new i(o.fromImage(t, e, r))
            }
        }, {
            "../const": 22, "../display/Container": 23, "../math": 33, "../renderers/canvas/utils/CanvasTinter": 48,
            "../textures/Texture": 72, "../utils": 77
        }], 68: [function (t, e, r) {
            function i(t) {
                n.call(this, t), this.vertSize = 5, this.vertByteSize = 4 * this.vertSize, this.size = s.SPRITE_BATCH_SIZE;
                var e = 4 * this.size * this.vertByteSize, r = 6 * this.size;
                this.vertices = new ArrayBuffer(e), this.positions = new Float32Array(this.vertices), this.colors = new Uint32Array(this.vertices), this.indices = new Uint16Array(r);
                for (var i = 0, o = 0; i < r; i += 6, o += 4) this.indices[i + 0] = o + 0, this.indices[i + 1] = o + 1, this.indices[i + 2] = o + 2, this.indices[i + 3] = o + 0, this.indices[i + 4] = o + 2, this.indices[i + 5] = o + 3;
                this.currentBatchSize = 0, this.sprites = [], this.shader = null
            }

            var n = t("../../renderers/webgl/utils/ObjectRenderer"), o = t("../../renderers/webgl/WebGLRenderer"),
                s = t("../../const");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, o.registerPlugin("sprite", i), i.prototype.onContextChange = function () {
                var t = this.renderer.gl;
                this.shader = this.renderer.shaderManager.defaultShader, this.vertexBuffer = t.createBuffer(), this.indexBuffer = t.createBuffer(), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer), t.bufferData(t.ELEMENT_ARRAY_BUFFER, this.indices, t.STATIC_DRAW), t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bufferData(t.ARRAY_BUFFER, this.vertices, t.DYNAMIC_DRAW), this.currentBlendMode = 99999
            }, i.prototype.render = function (t) {
                var e = t._texture;
                this.currentBatchSize >= this.size && this.flush();
                var r = e._uvs;
                if (r) {
                    var i, n, o, s, a = t.anchor.x, l = t.anchor.y;
                    if (e.trim && void 0 === t.tileScale) {
                        var h = e.trim;
                        i = (n = h.x - a * h.width) + e.crop.width, o = (s = h.y - l * h.height) + e.crop.height
                    } else i = e._frame.width * (1 - a), n = e._frame.width * -a, o = e._frame.height * (1 - l), s = e._frame.height * -l;
                    var u = this.currentBatchSize * this.vertByteSize, c = t.worldTransform, p = c.a, d = c.b, f = c.c,
                        m = c.d, g = c.tx, v = c.ty, _ = this.colors, y = this.positions;
                    if (this.renderer.roundPixels) {
                        var x = this.renderer.resolution;
                        y[u] = ((p * n + f * s + g) * x | 0) / x, y[u + 1] = ((m * s + d * n + v) * x | 0) / x, y[u + 5] = ((p * i + f * s + g) * x | 0) / x, y[u + 6] = ((m * s + d * i + v) * x | 0) / x, y[u + 10] = ((p * i + f * o + g) * x | 0) / x, y[u + 11] = ((m * o + d * i + v) * x | 0) / x, y[u + 15] = ((p * n + f * o + g) * x | 0) / x, y[u + 16] = ((m * o + d * n + v) * x | 0) / x
                    } else y[u] = p * n + f * s + g, y[u + 1] = m * s + d * n + v, y[u + 5] = p * i + f * s + g, y[u + 6] = m * s + d * i + v, y[u + 10] = p * i + f * o + g, y[u + 11] = m * o + d * i + v, y[u + 15] = p * n + f * o + g, y[u + 16] = m * o + d * n + v;
                    y[u + 2] = r.x0, y[u + 3] = r.y0, y[u + 7] = r.x1, y[u + 8] = r.y1, y[u + 12] = r.x2, y[u + 13] = r.y2, y[u + 17] = r.x3, y[u + 18] = r.y3;
                    var b = t.tint;
                    _[u + 4] = _[u + 9] = _[u + 14] = _[u + 19] = (b >> 16) + (65280 & b) + ((255 & b) << 16) + (255 * t.worldAlpha << 24), this.sprites[this.currentBatchSize++] = t
                }
            }, i.prototype.flush = function () {
                if (0 !== this.currentBatchSize) {
                    var t, e = this.renderer.gl;
                    if (this.currentBatchSize > .5 * this.size) e.bufferSubData(e.ARRAY_BUFFER, 0, this.vertices); else {
                        var r = this.positions.subarray(0, this.currentBatchSize * this.vertByteSize);
                        e.bufferSubData(e.ARRAY_BUFFER, 0, r)
                    }
                    for (var i, n, o, s, a = 0, l = 0, h = null, u = this.renderer.blendModeManager.currentBlendMode, c = null, p = !1, d = !1, f = 0, m = this.currentBatchSize; f < m; f++) i = (s = this.sprites[f])._texture.baseTexture, p = u !== (n = s.blendMode), d = c !== (o = s.shader || this.shader), (h !== i || p || d) && (this.renderBatch(h, a, l), l = f, a = 0, h = i, p && (u = n, this.renderer.blendModeManager.setBlendMode(u)), d && ((t = (c = o).shaders ? c.shaders[e.id] : c) || (t = c.getShader(this.renderer)), this.renderer.shaderManager.setShader(t), t.uniforms.projectionMatrix.value = this.renderer.currentRenderTarget.projectionMatrix.toArray(!0), t.syncUniforms(), e.activeTexture(e.TEXTURE0))), a++;
                    this.renderBatch(h, a, l), this.currentBatchSize = 0
                }
            }, i.prototype.renderBatch = function (t, e, r) {
                if (0 !== e) {
                    var i = this.renderer.gl;
                    t._glTextures[i.id] ? i.bindTexture(i.TEXTURE_2D, t._glTextures[i.id]) : this.renderer.updateTexture(t), i.drawElements(i.TRIANGLES, 6 * e, i.UNSIGNED_SHORT, 6 * r * 2), this.renderer.drawCount++
                }
            }, i.prototype.start = function () {
                var t = this.renderer.gl;
                t.bindBuffer(t.ARRAY_BUFFER, this.vertexBuffer), t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                var e = this.vertByteSize;
                t.vertexAttribPointer(this.shader.attributes.aVertexPosition, 2, t.FLOAT, !1, e, 0), t.vertexAttribPointer(this.shader.attributes.aTextureCoord, 2, t.FLOAT, !1, e, 8), t.vertexAttribPointer(this.shader.attributes.aColor, 4, t.UNSIGNED_BYTE, !0, e, 16)
            }, i.prototype.destroy = function () {
                this.renderer.gl.deleteBuffer(this.vertexBuffer), this.renderer.gl.deleteBuffer(this.indexBuffer), n.prototype.destroy.call(this), this.shader.destroy(), this.renderer = null, this.vertices = null, this.positions = null, this.colors = null, this.indices = null, this.vertexBuffer = null, this.indexBuffer = null, this.sprites = null, this.shader = null
            }
        }, {
            "../../const": 22, "../../renderers/webgl/WebGLRenderer": 49,
            "../../renderers/webgl/utils/ObjectRenderer": 63
        }], 69: [function (t, e, r) {
            function i(t, e, r) {
                this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.resolution = r || l.RESOLUTION, this._text = null, this._style = null;
                var i = o.fromCanvas(this.canvas);
                i.trim = new s.Rectangle, n.call(this, i), this.text = t, this.style = e
            }

            var n = t("../sprites/Sprite"), o = t("../textures/Texture"), s = t("../math"), a = t("../utils"),
                l = t("../const");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.fontPropertiesCache = {}, i.fontPropertiesCanvas = document.createElement("canvas"), i.fontPropertiesContext = i.fontPropertiesCanvas.getContext("2d"), Object.defineProperties(i.prototype, {
                width: {
                    get: function () {
                        return this.dirty && this.updateText(), this.scale.x * this._texture._frame.width
                    }, set: function (t) {
                        this.scale.x = t / this._texture._frame.width, this._width = t
                    }
                }, height: {
                    get: function () {
                        return this.dirty && this.updateText(), this.scale.y * this._texture._frame.height
                    }, set: function (t) {
                        this.scale.y = t / this._texture._frame.height, this._height = t
                    }
                }, style: {
                    get: function () {
                        return this._style
                    }, set: function (t) {
                        "number" == typeof(t = t || {}).fill && (t.fill = a.hex2string(t.fill)), "number" == typeof t.stroke && (t.stroke = a.hex2string(t.stroke)), "number" == typeof t.dropShadowColor && (t.dropShadowColor = a.hex2string(t.dropShadowColor)), t.font = t.font || "bold 20pt Arial", t.fill = t.fill || "black", t.align = t.align || "left", t.stroke = t.stroke || "black", t.strokeThickness = t.strokeThickness || 0, t.wordWrap = t.wordWrap || !1, t.wordWrapWidth = t.wordWrapWidth || 100, t.breakWords = t.breakWords || !1, t.letterSpacing = t.letterSpacing || 0, t.dropShadow = t.dropShadow || !1, t.dropShadowColor = t.dropShadowColor || "#000000", t.dropShadowAngle = void 0 !== t.dropShadowAngle ? t.dropShadowAngle : Math.PI / 6, t.dropShadowDistance = void 0 !== t.dropShadowDistance ? t.dropShadowDistance : 5, t.dropShadowBlur = void 0 !== t.dropShadowBlur ? t.dropShadowBlur : 0, t.padding = t.padding || 0, t.textBaseline = t.textBaseline || "alphabetic", t.lineJoin = t.lineJoin || "miter", t.miterLimit = t.miterLimit || 10, this._style = t, this.dirty = !0
                    }
                }, text: {
                    get: function () {
                        return this._text
                    }, set: function (t) {
                        t = t.toString() || " ", this._text !== t && (this._text = t, this.dirty = !0)
                    }
                }
            }), i.prototype.updateText = function () {
                var t = this._style;
                this.context.font = t.font;
                var e = (t.wordWrap ? this.wordWrap(this._text) : this._text).split(/(?:\r\n|\r|\n)/), r = [];
                r.length = e.length;
                for (var i = 0, n = this.determineFontProperties(t.font), o = 0; o < e.length; o++) {
                    var s = this.context.measureText(e[o]).width + (e[o].length - 1) * t.letterSpacing;
                    r[o] = s, i = Math.max(i, s)
                }
                var a = i + t.strokeThickness;
                t.dropShadow && (a += t.dropShadowDistance), this.canvas.width = Math.ceil((a + this.context.lineWidth) * this.resolution);
                var l = this.style.lineHeight || n.fontSize + t.strokeThickness, h = l * e.length;
                t.dropShadow && (h += t.dropShadowDistance), this.canvas.height = Math.ceil((h + 2 * this._style.padding) * this.resolution), this.context.scale(this.resolution, this.resolution), navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height), this.context.font = t.font, this.context.strokeStyle = t.stroke, this.context.lineWidth = t.strokeThickness, this.context.textBaseline = t.textBaseline, this.context.lineJoin = t.lineJoin, this.context.miterLimit = t.miterLimit;
                var u, c;
                if (t.dropShadow) {
                    t.dropShadowBlur > 0 ? (this.context.shadowColor = t.dropShadowColor, this.context.shadowBlur = t.dropShadowBlur) : this.context.fillStyle = t.dropShadowColor;
                    var p = Math.cos(t.dropShadowAngle) * t.dropShadowDistance,
                        d = Math.sin(t.dropShadowAngle) * t.dropShadowDistance;
                    for (o = 0; o < e.length; o++) u = t.strokeThickness / 2, c = t.strokeThickness / 2 + o * l + n.ascent, "right" === t.align ? u += i - r[o] : "center" === t.align && (u += (i - r[o]) / 2), t.fill && this.drawLetterSpacing(e[o], u + p, c + d + t.padding)
                }
                for (this.context.fillStyle = t.fill, o = 0; o < e.length; o++) u = t.strokeThickness / 2, c = t.strokeThickness / 2 + o * l + n.ascent, "right" === t.align ? u += i - r[o] : "center" === t.align && (u += (i - r[o]) / 2), t.stroke && t.strokeThickness && this.drawLetterSpacing(e[o], u, c + t.padding, !0), t.fill && this.drawLetterSpacing(e[o], u, c + t.padding);
                this.updateTexture()
            }, i.prototype.drawLetterSpacing = function (t, e, r, i) {
                var n = this._style.letterSpacing;
                if (0 !== n) for (var o, s = String.prototype.split.call(t, ""), a = 0, l = e; a < t.length;) o = s[a++], i ? this.context.strokeText(o, l, r) : this.context.fillText(o, l, r), l += this.context.measureText(o).width + n; else i ? this.context.strokeText(t, e, r) : this.context.fillText(t, e, r)
            }, i.prototype.updateTexture = function () {
                var t = this._texture, e = this._style;
                t.baseTexture.hasLoaded = !0, t.baseTexture.resolution = this.resolution, t.baseTexture.width = this.canvas.width / this.resolution, t.baseTexture.height = this.canvas.height / this.resolution, t.crop.width = t._frame.width = this.canvas.width / this.resolution, t.crop.height = t._frame.height = this.canvas.height / this.resolution, t.trim.x = 0, t.trim.y = -e.padding, t.trim.width = t._frame.width, t.trim.height = t._frame.height - 2 * e.padding, this._width = this.canvas.width / this.resolution, this._height = this.canvas.height / this.resolution, t.baseTexture.emit("update", t.baseTexture), this.dirty = !1
            }, i.prototype.renderWebGL = function (t) {
                this.dirty && this.updateText(), n.prototype.renderWebGL.call(this, t)
            }, i.prototype._renderCanvas = function (t) {
                this.dirty && this.updateText(), n.prototype._renderCanvas.call(this, t)
            }, i.prototype.determineFontProperties = function (t) {
                var e = i.fontPropertiesCache[t];
                if (!e) {
                    e = {};
                    var r = i.fontPropertiesCanvas, n = i.fontPropertiesContext;
                    n.font = t;
                    var o = Math.ceil(n.measureText("|MÉq").width), s = Math.ceil(n.measureText("M").width), a = 2 * s;
                    s = 1.4 * s | 0, r.width = o, r.height = a, n.fillStyle = "#f00", n.fillRect(0, 0, o, a), n.font = t, n.textBaseline = "alphabetic", n.fillStyle = "#000", n.fillText("|MÉq", 0, s);
                    var l, h, u = n.getImageData(0, 0, o, a).data, c = u.length, p = 4 * o, d = 0, f = !1;
                    for (l = 0; l < s; l++) {
                        for (h = 0; h < p; h += 4) if (255 !== u[d + h]) {
                            f = !0;
                            break
                        }
                        if (f) break;
                        d += p
                    }
                    for (e.ascent = s - l, d = c - p, f = !1, l = a; l > s; l--) {
                        for (h = 0; h < p; h += 4) if (255 !== u[d + h]) {
                            f = !0;
                            break
                        }
                        if (f) break;
                        d -= p
                    }
                    e.descent = l - s, e.fontSize = e.ascent + e.descent, i.fontPropertiesCache[t] = e
                }
                return e
            }, i.prototype.wordWrap = function (t) {
                for (var e = "", r = t.split("\n"), i = this._style.wordWrapWidth, n = 0; n < r.length; n++) {
                    for (var o = i, s = r[n].split(" "), a = 0; a < s.length; a++) {
                        var l = this.context.measureText(s[a]).width;
                        if (this._style.breakWords && l > i) for (var h = s[a].split(""), u = 0; u < h.length; u++) {
                            var c = this.context.measureText(h[u]).width;
                            c > o ? (e += "\n" + h[u], o = i - c) : (0 === u && (e += " "), e += h[u], o -= c)
                        } else {
                            var p = l + this.context.measureText(" ").width;
                            0 === a || p > o ? (a > 0 && (e += "\n"), e += s[a], o = i - l) : (o -= p, e += " " + s[a])
                        }
                    }
                    n < r.length - 1 && (e += "\n")
                }
                return e
            }, i.prototype.getBounds = function (t) {
                return this.dirty && this.updateText(), n.prototype.getBounds.call(this, t)
            }, i.prototype.destroy = function (t) {
                this.context = null, this.canvas = null, this._style = null, this._texture.destroy(void 0 === t || t)
            }
        }, {"../const": 22, "../math": 33, "../sprites/Sprite": 67, "../textures/Texture": 72, "../utils": 77}],
        70: [function (t, e, r) {
            function i(t, e, r) {
                s.call(this), this.uid = n.uid(), this.resolution = r || 1, this.width = 100, this.height = 100, this.realWidth = 100, this.realHeight = 100, this.scaleMode = e || o.SCALE_MODES.DEFAULT, this.hasLoaded = !1, this.isLoading = !1, this.source = null, this.premultipliedAlpha = !0, this.imageUrl = null, this.isPowerOfTwo = !1, this.mipmap = !1, this._glTextures = {}, t && this.loadSource(t)
            }

            var n = t("../utils"), o = t("../const"), s = t("eventemitter3");
            (i.prototype = Object.create(s.prototype)).constructor = i, e.exports = i, i.prototype.update = function () {
                this.realWidth = this.source.naturalWidth || this.source.width, this.realHeight = this.source.naturalHeight || this.source.height, this.width = this.realWidth / this.resolution, this.height = this.realHeight / this.resolution, this.isPowerOfTwo = n.isPowerOfTwo(this.realWidth, this.realHeight), this.emit("update", this)
            }, i.prototype.loadSource = function (t) {
                var e = this.isLoading;
                if (this.hasLoaded = !1, this.isLoading = !1, e && this.source && (this.source.onload = null, this.source.onerror = null), this.source = t, (this.source.complete || this.source.getContext) && this.source.width && this.source.height) this._sourceLoaded(); else if (!t.getContext) {
                    this.isLoading = !0;
                    var r = this;
                    t.onload = function () {
                        t.onload = null, t.onerror = null, r.isLoading && (r.isLoading = !1, r._sourceLoaded(), r.emit("loaded", r))
                    }, t.onerror = function () {
                        t.onload = null, t.onerror = null, r.isLoading && (r.isLoading = !1, r.emit("error", r))
                    }, t.complete && t.src && (this.isLoading = !1, t.onload = null, t.onerror = null, t.width && t.height ? (this._sourceLoaded(), e && this.emit("loaded", this)) : e && this.emit("error", this))
                }
            }, i.prototype._sourceLoaded = function () {
                this.hasLoaded = !0, this.update()
            }, i.prototype.destroy = function () {
                this.imageUrl ? (delete n.BaseTextureCache[this.imageUrl], delete n.TextureCache[this.imageUrl], this.imageUrl = null, navigator.isCocoonJS || (this.source.src = "")) : this.source && this.source._pixiId && delete n.BaseTextureCache[this.source._pixiId], this.source = null, this.dispose()
            }, i.prototype.dispose = function () {
                this.emit("dispose", this)
            }, i.prototype.updateSourceImage = function (t) {
                this.source.src = t, this.loadSource(this.source)
            }, i.fromImage = function (t, e, r) {
                var o = n.BaseTextureCache[t];
                if (void 0 === e && 0 !== t.indexOf("data:") && (e = !0), !o) {
                    var s = new Image;
                    e && (s.crossOrigin = ""), (o = new i(s, r)).imageUrl = t, s.src = t, n.BaseTextureCache[t] = o, o.resolution = n.getResolutionOfUrl(t)
                }
                return o
            }, i.fromCanvas = function (t, e) {
                t._pixiId || (t._pixiId = "canvas_" + n.uid());
                var r = n.BaseTextureCache[t._pixiId];
                return r || (r = new i(t, e), n.BaseTextureCache[t._pixiId] = r), r
            }
        }, {"../const": 22, "../utils": 77, eventemitter3: 10}], 71: [function (t, e, r) {
            function i(t, e, r, i, c) {
                if (!t) throw new Error("Unable to create RenderTexture, you must pass a renderer into the constructor.");
                e = e || 100, r = r || 100, c = c || u.RESOLUTION;
                var p = new n;
                if (p.width = e, p.height = r, p.resolution = c, p.scaleMode = i || u.SCALE_MODES.DEFAULT, p.hasLoaded = !0, o.call(this, p, new h.Rectangle(0, 0, e, r)), this.width = e, this.height = r, this.resolution = c, this.render = null, this.renderer = t, this.renderer.type === u.RENDERER_TYPE.WEBGL) {
                    var d = this.renderer.gl;
                    this.textureBuffer = new s(d, this.width, this.height, p.scaleMode, this.resolution), this.baseTexture._glTextures[d.id] = this.textureBuffer.texture, this.filterManager = new a(this.renderer), this.filterManager.onContextChange(), this.filterManager.resize(e, r), this.render = this.renderWebGL, this.renderer.currentRenderer.start(), this.renderer.currentRenderTarget.activate()
                } else this.render = this.renderCanvas, this.textureBuffer = new l(this.width * this.resolution, this.height * this.resolution), this.baseTexture.source = this.textureBuffer.canvas;
                this.valid = !0, this._updateUvs()
            }

            var n = t("./BaseTexture"), o = t("./Texture"), s = t("../renderers/webgl/utils/RenderTarget"),
                a = t("../renderers/webgl/managers/FilterManager"), l = t("../renderers/canvas/utils/CanvasBuffer"),
                h = t("../math"), u = t("../const"), c = new h.Matrix;
            (i.prototype = Object.create(o.prototype)).constructor = i, e.exports = i, i.prototype.resize = function (t, e, r) {
                t === this.width && e === this.height || (this.valid = t > 0 && e > 0, this.width = this._frame.width = this.crop.width = t, this.height = this._frame.height = this.crop.height = e, r && (this.baseTexture.width = this.width, this.baseTexture.height = this.height), this.valid && (this.textureBuffer.resize(this.width, this.height), this.filterManager && this.filterManager.resize(this.width, this.height)))
            }, i.prototype.clear = function () {
                this.valid && (this.renderer.type === u.RENDERER_TYPE.WEBGL && this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer), this.textureBuffer.clear())
            }, i.prototype.renderWebGL = function (t, e, r, i) {
                if (this.valid) {
                    if (i = void 0 === i || i, this.textureBuffer.transform = e, this.textureBuffer.activate(), t.worldAlpha = 1, i) {
                        t.worldTransform.identity(), t.currentBounds = null;
                        var n, o, s = t.children;
                        for (n = 0, o = s.length; n < o; ++n) s[n].updateTransform()
                    }
                    var a = this.renderer.filterManager;
                    this.renderer.filterManager = this.filterManager, this.renderer.renderDisplayObject(t, this.textureBuffer, r), this.renderer.filterManager = a
                }
            }, i.prototype.renderCanvas = function (t, e, r, i) {
                if (this.valid) {
                    i = !!i;
                    var n = c;
                    n.identity(), e && n.append(e);
                    var o = t.worldTransform;
                    t.worldTransform = n, t.worldAlpha = 1;
                    var s, a, l = t.children;
                    for (s = 0, a = l.length; s < a; ++s) l[s].updateTransform();
                    r && this.textureBuffer.clear();
                    var h = this.textureBuffer.context, u = this.renderer.resolution;
                    this.renderer.resolution = this.resolution, this.renderer.renderDisplayObject(t, h), this.renderer.resolution = u, t.worldTransform === n && (t.worldTransform = o)
                }
            }, i.prototype.destroy = function () {
                o.prototype.destroy.call(this, !0), this.textureBuffer.destroy(), this.filterManager && this.filterManager.destroy(), this.renderer = null
            }, i.prototype.getImage = function () {
                var t = new Image;
                return t.src = this.getBase64(), t
            }, i.prototype.getBase64 = function () {
                return this.getCanvas().toDataURL()
            }, i.prototype.getCanvas = function () {
                if (this.renderer.type === u.RENDERER_TYPE.WEBGL) {
                    var t = this.renderer.gl, e = this.textureBuffer.size.width, r = this.textureBuffer.size.height,
                        i = new Uint8Array(4 * e * r);
                    t.bindFramebuffer(t.FRAMEBUFFER, this.textureBuffer.frameBuffer), t.readPixels(0, 0, e, r, t.RGBA, t.UNSIGNED_BYTE, i), t.bindFramebuffer(t.FRAMEBUFFER, null);
                    var n = new l(e, r), o = n.context.getImageData(0, 0, e, r);
                    return o.data.set(i), n.context.putImageData(o, 0, 0), n.canvas
                }
                return this.textureBuffer.canvas
            }, i.prototype.getPixels = function () {
                var t, e;
                if (this.renderer.type === u.RENDERER_TYPE.WEBGL) {
                    var r = this.renderer.gl;
                    t = this.textureBuffer.size.width, e = this.textureBuffer.size.height;
                    var i = new Uint8Array(4 * t * e);
                    return r.bindFramebuffer(r.FRAMEBUFFER, this.textureBuffer.frameBuffer), r.readPixels(0, 0, t, e, r.RGBA, r.UNSIGNED_BYTE, i), r.bindFramebuffer(r.FRAMEBUFFER, null), i
                }
                return t = this.textureBuffer.canvas.width, e = this.textureBuffer.canvas.height, this.textureBuffer.canvas.getContext("2d").getImageData(0, 0, t, e).data
            }, i.prototype.getPixel = function (t, e) {
                if (this.renderer.type === u.RENDERER_TYPE.WEBGL) {
                    var r = this.renderer.gl, i = new Uint8Array(4);
                    return r.bindFramebuffer(r.FRAMEBUFFER, this.textureBuffer.frameBuffer), r.readPixels(t, e, 1, 1, r.RGBA, r.UNSIGNED_BYTE, i), r.bindFramebuffer(r.FRAMEBUFFER, null), i
                }
                return this.textureBuffer.canvas.getContext("2d").getImageData(t, e, 1, 1).data
            }
        }, {
            "../const": 22, "../math": 33, "../renderers/canvas/utils/CanvasBuffer": 45,
            "../renderers/webgl/managers/FilterManager": 54, "../renderers/webgl/utils/RenderTarget": 65,
            "./BaseTexture": 70, "./Texture": 72
        }], 72: [function (t, e, r) {
            function i(t, e, r, n, o) {
                if (a.call(this), this.noFrame = !1, e || (this.noFrame = !0, e = new l.Rectangle(0, 0, 1, 1)), t instanceof i && (t = t.baseTexture), this.baseTexture = t, this._frame = e, this.trim = n, this.valid = !1, this.requiresUpdate = !1, this._uvs = null, this.width = 0, this.height = 0, this.crop = r || e, this._rotate = +(o || 0), !0 === o) this._rotate = 2; else if (this._rotate % 2 != 0) throw"attempt to use diamond-shaped UVs. If you are sure, set rotation manually";
                t.hasLoaded ? (this.noFrame && (e = new l.Rectangle(0, 0, t.width, t.height), t.on("update", this.onBaseTextureUpdated, this)), this.frame = e) : t.once("loaded", this.onBaseTextureLoaded, this)
            }

            var n = t("./BaseTexture"), o = t("./VideoBaseTexture"), s = t("./TextureUvs"), a = t("eventemitter3"),
                l = t("../math"), h = t("../utils");
            i.prototype = Object.create(a.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                frame: {
                    get: function () {
                        return this._frame
                    }, set: function (t) {
                        if (this._frame = t, this.noFrame = !1, this.width = t.width, this.height = t.height, !this.trim && !this.rotate && (t.x + t.width > this.baseTexture.width || t.y + t.height > this.baseTexture.height)) throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
                        this.valid = t && t.width && t.height && this.baseTexture.hasLoaded, this.trim ? (this.width = this.trim.width, this.height = this.trim.height, this._frame.width = this.trim.width, this._frame.height = this.trim.height) : this.crop = t, this.valid && this._updateUvs()
                    }
                }, rotate: {
                    get: function () {
                        return this._rotate
                    }, set: function (t) {
                        this._rotate = t, this.valid && this._updateUvs()
                    }
                }
            }), i.prototype.update = function () {
                this.baseTexture.update()
            }, i.prototype.onBaseTextureLoaded = function (t) {
                this.noFrame ? this.frame = new l.Rectangle(0, 0, t.width, t.height) : this.frame = this._frame, this.emit("update", this)
            }, i.prototype.onBaseTextureUpdated = function (t) {
                this._frame.width = t.width, this._frame.height = t.height, this.emit("update", this)
            }, i.prototype.destroy = function (t) {
                this.baseTexture && (t && this.baseTexture.destroy(), this.baseTexture.off("update", this.onBaseTextureUpdated, this), this.baseTexture.off("loaded", this.onBaseTextureLoaded, this), this.baseTexture = null), this._frame = null, this._uvs = null, this.trim = null, this.crop = null, this.valid = !1, this.off("dispose", this.dispose, this), this.off("update", this.update, this)
            }, i.prototype.clone = function () {
                return new i(this.baseTexture, this.frame, this.crop, this.trim, this.rotate)
            }, i.prototype._updateUvs = function () {
                this._uvs || (this._uvs = new s), this._uvs.set(this.crop, this.baseTexture, this.rotate)
            }, i.fromImage = function (t, e, r) {
                var o = h.TextureCache[t];
                return o || (o = new i(n.fromImage(t, e, r)), h.TextureCache[t] = o), o
            }, i.fromFrame = function (t) {
                var e = h.TextureCache[t];
                if (!e) throw new Error('The frameId "' + t + '" does not exist in the texture cache');
                return e
            }, i.fromCanvas = function (t, e) {
                return new i(n.fromCanvas(t, e))
            }, i.fromVideo = function (t, e) {
                return "string" == typeof t ? i.fromVideoUrl(t, e) : new i(o.fromVideo(t, e))
            }, i.fromVideoUrl = function (t, e) {
                return new i(o.fromUrl(t, e))
            }, i.addTextureToCache = function (t, e) {
                h.TextureCache[e] = t
            }, i.removeTextureFromCache = function (t) {
                var e = h.TextureCache[t];
                return delete h.TextureCache[t], delete h.BaseTextureCache[t], e
            }, i.EMPTY = new i(new n)
        }, {
            "../math": 33, "../utils": 77, "./BaseTexture": 70, "./TextureUvs": 73, "./VideoBaseTexture": 74,
            eventemitter3: 10
        }], 73: [function (t, e, r) {
            function i() {
                this.x0 = 0, this.y0 = 0, this.x1 = 1, this.y1 = 0, this.x2 = 1, this.y2 = 1, this.x3 = 0, this.y3 = 1
            }

            e.exports = i;
            var n = t("../math/GroupD8");
            i.prototype.set = function (t, e, r) {
                var i = e.width, o = e.height;
                if (r) {
                    var s = n.isSwapWidthHeight(r), a = (s ? t.height : t.width) / 2 / i,
                        l = (s ? t.width : t.height) / 2 / o, h = t.x / i + a, u = t.y / o + l;
                    r = n.add(r, n.NW), this.x0 = h + a * n.uX(r), this.y0 = u + l * n.uY(r), r = n.add(r, 2), this.x1 = h + a * n.uX(r), this.y1 = u + l * n.uY(r), r = n.add(r, 2), this.x2 = h + a * n.uX(r), this.y2 = u + l * n.uY(r), r = n.add(r, 2), this.x3 = h + a * n.uX(r), this.y3 = u + l * n.uY(r)
                } else this.x0 = t.x / i, this.y0 = t.y / o, this.x1 = (t.x + t.width) / i, this.y1 = t.y / o, this.x2 = (t.x + t.width) / i, this.y2 = (t.y + t.height) / o, this.x3 = t.x / i, this.y3 = (t.y + t.height) / o
            }
        }, {"../math/GroupD8": 30}], 74: [function (t, e, r) {
            function i(t, e) {
                if (!t) throw new Error("No video source element specified.");
                (t.readyState === t.HAVE_ENOUGH_DATA || t.readyState === t.HAVE_FUTURE_DATA) && t.width && t.height && (t.complete = !0), o.call(this, t, e), this.autoUpdate = !1, this._onUpdate = this._onUpdate.bind(this), this._onCanPlay = this._onCanPlay.bind(this), t.complete || (t.addEventListener("canplay", this._onCanPlay), t.addEventListener("canplaythrough", this._onCanPlay), t.addEventListener("play", this._onPlayStart.bind(this)), t.addEventListener("pause", this._onPlayStop.bind(this))), this.__loaded = !1
            }

            function n(t, e) {
                e || (e = "video/" + t.substr(t.lastIndexOf(".") + 1));
                var r = document.createElement("source");
                return r.src = t, r.type = e, r
            }

            var o = t("./BaseTexture"), s = t("../utils");
            (i.prototype = Object.create(o.prototype)).constructor = i, e.exports = i, i.prototype._onUpdate = function () {
                this.autoUpdate && (window.requestAnimationFrame(this._onUpdate), this.update())
            }, i.prototype._onPlayStart = function () {
                this.autoUpdate || (window.requestAnimationFrame(this._onUpdate), this.autoUpdate = !0)
            }, i.prototype._onPlayStop = function () {
                this.autoUpdate = !1
            }, i.prototype._onCanPlay = function () {
                this.hasLoaded = !0, this.source && (this.source.removeEventListener("canplay", this._onCanPlay), this.source.removeEventListener("canplaythrough", this._onCanPlay), this.width = this.source.videoWidth, this.height = this.source.videoHeight, this.source.play(), this.__loaded || (this.__loaded = !0, this.emit("loaded", this)))
            }, i.prototype.destroy = function () {
                this.source && this.source._pixiId && (delete s.BaseTextureCache[this.source._pixiId], delete this.source._pixiId), o.prototype.destroy.call(this)
            }, i.fromVideo = function (t, e) {
                t._pixiId || (t._pixiId = "video_" + s.uid());
                var r = s.BaseTextureCache[t._pixiId];
                return r || (r = new i(t, e), s.BaseTextureCache[t._pixiId] = r), r
            }, i.fromUrl = function (t, e) {
                var r = document.createElement("video");
                if (Array.isArray(t)) for (var o = 0; o < t.length; ++o) r.appendChild(n(t[o].src || t[o], t[o].mime)); else r.appendChild(n(t.src || t, t.mime));
                return r.load(), r.play(), i.fromVideo(r, e)
            }, i.fromUrls = i.fromUrl
        }, {"../utils": 77, "./BaseTexture": 70}], 75: [function (t, e, r) {
            function i() {
                var t = this;
                this._tick = function (e) {
                    t._requestId = null, t.started && (t.update(e), t.started && null === t._requestId && t._emitter.listeners(s, !0) && (t._requestId = requestAnimationFrame(t._tick)))
                }, this._emitter = new o, this._requestId = null, this._maxElapsedMS = 100, this.autoStart = !1, this.deltaTime = 1, this.elapsedMS = 1 / n.TARGET_FPMS, this.lastTime = 0, this.speed = 1, this.started = !1
            }

            var n = t("../const"), o = t("eventemitter3"), s = "tick";
            Object.defineProperties(i.prototype, {
                FPS: {
                    get: function () {
                        return 1e3 / this.elapsedMS
                    }
                }, minFPS: {
                    get: function () {
                        return 1e3 / this._maxElapsedMS
                    }, set: function (t) {
                        var e = Math.min(Math.max(0, t) / 1e3, n.TARGET_FPMS);
                        this._maxElapsedMS = 1 / e
                    }
                }
            }), i.prototype._requestIfNeeded = function () {
                null === this._requestId && this._emitter.listeners(s, !0) && (this.lastTime = performance.now(), this._requestId = requestAnimationFrame(this._tick))
            }, i.prototype._cancelIfNeeded = function () {
                null !== this._requestId && (cancelAnimationFrame(this._requestId), this._requestId = null)
            }, i.prototype._startIfPossible = function () {
                this.started ? this._requestIfNeeded() : this.autoStart && this.start()
            }, i.prototype.add = function (t, e) {
                return this._emitter.on(s, t, e), this._startIfPossible(), this
            }, i.prototype.addOnce = function (t, e) {
                return this._emitter.once(s, t, e), this._startIfPossible(), this
            }, i.prototype.remove = function (t, e) {
                return this._emitter.off(s, t, e), this._emitter.listeners(s, !0) || this._cancelIfNeeded(), this
            }, i.prototype.start = function () {
                this.started || (this.started = !0, this._requestIfNeeded())
            }, i.prototype.stop = function () {
                this.started && (this.started = !1, this._cancelIfNeeded())
            }, i.prototype.update = function (t) {
                var e;
                t = t || performance.now(), (e = this.elapsedMS = t - this.lastTime) > this._maxElapsedMS && (e = this._maxElapsedMS), this.deltaTime = e * n.TARGET_FPMS * this.speed, this._emitter.emit(s, this.deltaTime), this.lastTime = t
            }, e.exports = i
        }, {"../const": 22, eventemitter3: 10}], 76: [function (t, e, r) {
            var i = t("./Ticker"), n = new i;
            n.autoStart = !0, e.exports = {shared: n, Ticker: i}
        }, {"./Ticker": 75}], 77: [function (t, e, r) {
            var i = t("../const"), n = e.exports = {
                _uid: 0, _saidHello: !1, EventEmitter: t("eventemitter3"), pluginTarget: t("./pluginTarget"),
                async: t("async"), uid: function () {
                    return ++n._uid
                }, hex2rgb: function (t, e) {
                    return e = e || [], e[0] = (t >> 16 & 255) / 255, e[1] = (t >> 8 & 255) / 255, e[2] = (255 & t) / 255, e
                }, hex2string: function (t) {
                    return t = t.toString(16), "#" + (t = "000000".substr(0, 6 - t.length) + t)
                }, rgb2hex: function (t) {
                    return (255 * t[0] << 16) + (255 * t[1] << 8) + 255 * t[2]
                }, canUseNewCanvasBlendModes: function () {
                    if ("undefined" == typeof document) return !1;
                    var t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/",
                        e = "AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==", r = new Image;
                    r.src = t + "AP804Oa6" + e;
                    var i = new Image;
                    i.src = t + "/wCKxvRF" + e;
                    var n = document.createElement("canvas");
                    n.width = 6, n.height = 1;
                    var o = n.getContext("2d");
                    o.globalCompositeOperation = "multiply", o.drawImage(r, 0, 0), o.drawImage(i, 2, 0);
                    var s = o.getImageData(2, 0, 1, 1).data;
                    return 255 === s[0] && 0 === s[1] && 0 === s[2]
                }, getNextPowerOfTwo: function (t) {
                    if (t > 0 && 0 == (t & t - 1)) return t;
                    for (var e = 1; e < t;) e <<= 1;
                    return e
                }, isPowerOfTwo: function (t, e) {
                    return t > 0 && 0 == (t & t - 1) && e > 0 && 0 == (e & e - 1)
                }, getResolutionOfUrl: function (t) {
                    var e = i.RETINA_PREFIX.exec(t);
                    return e ? parseFloat(e[1]) : 1
                }, sayHello: function (t) {
                    if (!n._saidHello) {
                        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) i.VERSION; else window.console;
                        n._saidHello = !0
                    }
                }, isWebGLSupported: function () {
                    var t = {stencil: !0};
                    try {
                        if (!window.WebGLRenderingContext) return !1;
                        var e = document.createElement("canvas"),
                            r = e.getContext("webgl", t) || e.getContext("experimental-webgl", t);
                        return !(!r || !r.getContextAttributes().stencil)
                    } catch (t) {
                        return !1
                    }
                }, sign: function (t) {
                    return t ? t < 0 ? -1 : 1 : 0
                }, removeItems: function (t, e, r) {
                    var i = t.length;
                    if (!(e >= i || 0 === r)) {
                        for (var n = e, o = i - (r = e + r > i ? i - e : r); n < o; ++n) t[n] = t[n + r];
                        t.length = o
                    }
                }, TextureCache: {}, BaseTextureCache: {}
            }
        }, {"../const": 22, "./pluginTarget": 78, async: 1, eventemitter3: 10}], 78: [function (t, e, r) {
            function i(t) {
                t.__plugins = {}, t.registerPlugin = function (e, r) {
                    t.__plugins[e] = r
                }, t.prototype.initPlugins = function () {
                    this.plugins = this.plugins || {};
                    for (var e in t.__plugins) this.plugins[e] = new t.__plugins[e](this)
                }, t.prototype.destroyPlugins = function () {
                    for (var t in this.plugins) this.plugins[t].destroy(), this.plugins[t] = null;
                    this.plugins = null
                }
            }

            e.exports = {
                mixin: function (t) {
                    i(t)
                }
            }
        }, {}], 79: [function (t, e, r) {
            var i = t("./core"), n = t("./mesh"), o = t("./extras"), s = t("./filters");
            i.SpriteBatch = function () {
                throw new ReferenceError("SpriteBatch does not exist any more, please use the new ParticleContainer instead.")
            }, i.AssetLoader = function () {
                throw new ReferenceError("The loader system was overhauled in pixi v3, please see the new PIXI.loaders.Loader class.")
            }, Object.defineProperties(i, {
                Stage: {
                    get: function () {
                        return console.warn("You do not need to use a PIXI Stage any more, you can simply render any container."), i.Container
                    }
                }, DisplayObjectContainer: {
                    get: function () {
                        return console.warn("DisplayObjectContainer has been shortened to Container, please use Container from now on."), i.Container
                    }
                }, Strip: {
                    get: function () {
                        return console.warn("The Strip class has been renamed to Mesh and moved to mesh.Mesh, please use mesh.Mesh from now on."), n.Mesh
                    }
                }, Rope: {
                    get: function () {
                        return console.warn("The Rope class has been moved to mesh.Rope, please use mesh.Rope from now on."), n.Rope
                    }
                }, MovieClip: {
                    get: function () {
                        return console.warn("The MovieClip class has been moved to extras.MovieClip, please use extras.MovieClip from now on."), o.MovieClip
                    }
                }, TilingSprite: {
                    get: function () {
                        return console.warn("The TilingSprite class has been moved to extras.TilingSprite, please use extras.TilingSprite from now on."), o.TilingSprite
                    }
                }, BitmapText: {
                    get: function () {
                        return console.warn("The BitmapText class has been moved to extras.BitmapText, please use extras.BitmapText from now on."), o.BitmapText
                    }
                }, blendModes: {
                    get: function () {
                        return console.warn("The blendModes has been moved to BLEND_MODES, please use BLEND_MODES from now on."), i.BLEND_MODES
                    }
                }, scaleModes: {
                    get: function () {
                        return console.warn("The scaleModes has been moved to SCALE_MODES, please use SCALE_MODES from now on."), i.SCALE_MODES
                    }
                }, BaseTextureCache: {
                    get: function () {
                        return console.warn("The BaseTextureCache class has been moved to utils.BaseTextureCache, please use utils.BaseTextureCache from now on."), i.utils.BaseTextureCache
                    }
                }, TextureCache: {
                    get: function () {
                        return console.warn("The TextureCache class has been moved to utils.TextureCache, please use utils.TextureCache from now on."), i.utils.TextureCache
                    }
                }, math: {
                    get: function () {
                        return console.warn("The math namespace is deprecated, please access members already accessible on PIXI."), i
                    }
                }
            }), i.Sprite.prototype.setTexture = function (t) {
                this.texture = t, console.warn("setTexture is now deprecated, please use the texture property, e.g : sprite.texture = texture;")
            }, o.BitmapText.prototype.setText = function (t) {
                this.text = t, console.warn("setText is now deprecated, please use the text property, e.g : myBitmapText.text = 'my text';")
            }, i.Text.prototype.setText = function (t) {
                this.text = t, console.warn("setText is now deprecated, please use the text property, e.g : myText.text = 'my text';")
            }, i.Text.prototype.setStyle = function (t) {
                this.style = t, console.warn("setStyle is now deprecated, please use the style property, e.g : myText.style = style;")
            }, i.Texture.prototype.setFrame = function (t) {
                this.frame = t, console.warn("setFrame is now deprecated, please use the frame property, e.g : myTexture.frame = frame;")
            }, Object.defineProperties(s, {
                AbstractFilter: {
                    get: function () {
                        return console.warn("filters.AbstractFilter is an undocumented alias, please use AbstractFilter from now on."), i.AbstractFilter
                    }
                }, FXAAFilter: {
                    get: function () {
                        return console.warn("filters.FXAAFilter is an undocumented alias, please use FXAAFilter from now on."), i.FXAAFilter
                    }
                }, SpriteMaskFilter: {
                    get: function () {
                        return console.warn("filters.SpriteMaskFilter is an undocumented alias, please use SpriteMaskFilter from now on."), i.SpriteMaskFilter
                    }
                }
            }), i.utils.uuid = function () {
                return console.warn("utils.uuid() is deprecated, please use utils.uid() from now on."), i.utils.uid()
            }
        }, {"./core": 29, "./extras": 86, "./filters": 103, "./mesh": 128}], 80: [function (t, e, r) {
            function i(t, e) {
                n.Container.call(this), e = e || {}, this.textWidth = 0, this.textHeight = 0, this._glyphs = [], this._font = {
                    tint: void 0 !== e.tint ? e.tint : 16777215, align: e.align || "left", name: null, size: 0
                }, this.font = e.font, this._text = t, this.maxWidth = 0, this.maxLineHeight = 0, this.dirty = !1, this.updateText()
            }

            var n = t("../core");
            (i.prototype = Object.create(n.Container.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                tint: {
                    get: function () {
                        return this._font.tint
                    }, set: function (t) {
                        this._font.tint = "number" == typeof t && t >= 0 ? t : 16777215, this.dirty = !0
                    }
                }, align: {
                    get: function () {
                        return this._font.align
                    }, set: function (t) {
                        this._font.align = t || "left", this.dirty = !0
                    }
                }, font: {
                    get: function () {
                        return this._font
                    }, set: function (t) {
                        t && ("string" == typeof t ? (t = t.split(" "), this._font.name = 1 === t.length ? t[0] : t.slice(1).join(" "), this._font.size = t.length >= 2 ? parseInt(t[0], 10) : i.fonts[this._font.name].size) : (this._font.name = t.name, this._font.size = "number" == typeof t.size ? t.size : parseInt(t.size, 10)), this.dirty = !0)
                    }
                }, text: {
                    get: function () {
                        return this._text
                    }, set: function (t) {
                        t = t.toString() || " ", this._text !== t && (this._text = t, this.dirty = !0)
                    }
                }
            }), i.prototype.updateText = function () {
                for (var t = i.fonts[this._font.name], e = new n.Point, r = null, o = [], s = 0, a = 0, l = [], h = 0, u = this._font.size / t.size, c = -1, p = 0, d = 0; d < this.text.length; d++) {
                    var f = this.text.charCodeAt(d);
                    if (c = /(\s)/.test(this.text.charAt(d)) ? d : c, /(?:\r\n|\r|\n)/.test(this.text.charAt(d))) l.push(s), a = Math.max(a, s), h++, e.x = 0, e.y += t.lineHeight, r = null; else if (-1 !== c && this.maxWidth > 0 && e.x * u > this.maxWidth) n.utils.removeItems(o, c, d - c), d = c, c = -1, l.push(s), a = Math.max(a, s), h++, e.x = 0, e.y += t.lineHeight, r = null; else {
                        var m = t.chars[f];
                        m && (r && m.kerning[r] && (e.x += m.kerning[r]), o.push({
                            texture: m.texture, line: h, charCode: f,
                            position: new n.Point(e.x + m.xOffset, e.y + m.yOffset)
                        }), s = e.x + (m.texture.width + m.xOffset), e.x += m.xAdvance, p = Math.max(p, m.yOffset + m.texture.height), r = f)
                    }
                }
                l.push(s), a = Math.max(a, s);
                var g = [];
                for (d = 0; d <= h; d++) {
                    var v = 0;
                    "right" === this._font.align ? v = a - l[d] : "center" === this._font.align && (v = (a - l[d]) / 2), g.push(v)
                }
                var _ = o.length, y = this.tint;
                for (d = 0; d < _; d++) {
                    var x = this._glyphs[d];
                    x ? x.texture = o[d].texture : (x = new n.Sprite(o[d].texture), this._glyphs.push(x)), x.position.x = (o[d].position.x + g[o[d].line]) * u, x.position.y = o[d].position.y * u, x.scale.x = x.scale.y = u, x.tint = y, x.parent || this.addChild(x)
                }
                for (d = _; d < this._glyphs.length; ++d) this.removeChild(this._glyphs[d]);
                this.textWidth = a * u, this.textHeight = (e.y + t.lineHeight) * u, this.maxLineHeight = p * u
            }, i.prototype.updateTransform = function () {
                this.validate(), this.containerUpdateTransform()
            }, i.prototype.getLocalBounds = function () {
                return this.validate(), n.Container.prototype.getLocalBounds.call(this)
            }, i.prototype.validate = function () {
                this.dirty && (this.updateText(), this.dirty = !1)
            }, i.fonts = {}
        }, {"../core": 29}], 81: [function (t, e, r) {
            function i(t) {
                n.Sprite.call(this, t[0] instanceof n.Texture ? t[0] : t[0].texture), this._textures = null, this._durations = null, this.textures = t, this.animationSpeed = 1, this.loop = !0, this.onComplete = null, this._currentTime = 0, this.playing = !1
            }

            var n = t("../core");
            (i.prototype = Object.create(n.Sprite.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                totalFrames: {
                    get: function () {
                        return this._textures.length
                    }
                }, textures: {
                    get: function () {
                        return this._textures
                    }, set: function (t) {
                        if (t[0] instanceof n.Texture) this._textures = t, this._durations = null; else {
                            this._textures = [], this._durations = [];
                            for (var e = 0; e < t.length; e++) this._textures.push(t[e].texture), this._durations.push(t[e].time)
                        }
                    }
                }, currentFrame: {
                    get: function () {
                        var t = Math.floor(this._currentTime) % this._textures.length;
                        return t < 0 && (t += this._textures.length), t
                    }
                }
            }), i.prototype.stop = function () {
                this.playing && (this.playing = !1, n.ticker.shared.remove(this.update, this))
            }, i.prototype.play = function () {
                this.playing || (this.playing = !0, n.ticker.shared.add(this.update, this))
            }, i.prototype.gotoAndStop = function (t) {
                this.stop(), this._currentTime = t, this._texture = this._textures[this.currentFrame]
            }, i.prototype.gotoAndPlay = function (t) {
                this._currentTime = t, this.play()
            }, i.prototype.update = function (t) {
                var e = this.animationSpeed * t;
                if (null !== this._durations) {
                    var r = this._currentTime % 1 * this._durations[this.currentFrame];
                    for (r += e / 60 * 1e3; r < 0;) this._currentTime--, r += this._durations[this.currentFrame];
                    var i = Math.sign(this.animationSpeed * t);
                    for (this._currentTime = Math.floor(this._currentTime); r >= this._durations[this.currentFrame];) r -= this._durations[this.currentFrame] * i, this._currentTime += i;
                    this._currentTime += r / this._durations[this.currentFrame]
                } else this._currentTime += e;
                this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : this._texture = this._textures[this.currentFrame]
            }, i.prototype.destroy = function () {
                this.stop(), n.Sprite.prototype.destroy.call(this)
            }, i.fromFrames = function (t) {
                for (var e = [], r = 0; r < t.length; ++r) e.push(new n.Texture.fromFrame(t[r]));
                return new i(e)
            }, i.fromImages = function (t) {
                for (var e = [], r = 0; r < t.length; ++r) e.push(new n.Texture.fromImage(t[r]));
                return new i(e)
            }
        }, {"../core": 29}], 82: [function (t, e, r) {
            function i(t, e, r) {
                n.Sprite.call(this, t), this.tileScale = new n.Point(1, 1), this.tilePosition = new n.Point(0, 0), this._width = e || 100, this._height = r || 100, this._uvs = new n.TextureUvs, this._canvasPattern = null, this.shader = new n.AbstractFilter(["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec4 aColor;", "uniform mat3 projectionMatrix;", "uniform vec4 uFrame;", "uniform vec4 uTransform;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "void main(void){", "   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vec2 coord = aTextureCoord;", "   coord -= uTransform.xy;", "   coord /= uTransform.zw;", "   vTextureCoord = coord;", "   vColor = vec4(aColor.rgb * aColor.a, aColor.a);", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform vec4 uFrame;", "uniform vec2 uPixelSize;", "void main(void){", "   vec2 coord = mod(vTextureCoord, uFrame.zw);", "   coord = clamp(coord, uPixelSize, uFrame.zw - uPixelSize);", "   coord += uFrame.xy;", "   gl_FragColor =  texture2D(uSampler, coord) * vColor ;", "}"].join("\n"), {
                    uFrame: {
                        type: "4fv", value: [0, 0, 1, 1]
                    }, uTransform: {type: "4fv", value: [0, 0, 1, 1]}, uPixelSize: {type: "2fv", value: [1, 1]}
                })
            }

            var n = t("../core"), o = new n.Point, s = t("../core/renderers/canvas/utils/CanvasTinter");
            (i.prototype = Object.create(n.Sprite.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                width: {
                    get: function () {
                        return this._width
                    }, set: function (t) {
                        this._width = t
                    }
                }, height: {
                    get: function () {
                        return this._height
                    }, set: function (t) {
                        this._height = t
                    }
                }
            }), i.prototype._onTextureUpdate = function () {
            }, i.prototype._renderWebGL = function (t) {
                var e = this._texture;
                if (e && e._uvs) {
                    var r = e._uvs, i = e._frame.width, n = e._frame.height, o = e.baseTexture.width,
                        s = e.baseTexture.height;
                    e._uvs = this._uvs, e._frame.width = this.width, e._frame.height = this.height, this.shader.uniforms.uPixelSize.value[0] = 1 / o, this.shader.uniforms.uPixelSize.value[1] = 1 / s, this.shader.uniforms.uFrame.value[0] = r.x0, this.shader.uniforms.uFrame.value[1] = r.y0, this.shader.uniforms.uFrame.value[2] = r.x1 - r.x0, this.shader.uniforms.uFrame.value[3] = r.y2 - r.y0, this.shader.uniforms.uTransform.value[0] = this.tilePosition.x % (i * this.tileScale.x) / this._width, this.shader.uniforms.uTransform.value[1] = this.tilePosition.y % (n * this.tileScale.y) / this._height, this.shader.uniforms.uTransform.value[2] = o / this._width * this.tileScale.x, this.shader.uniforms.uTransform.value[3] = s / this._height * this.tileScale.y, t.setObjectRenderer(t.plugins.sprite), t.plugins.sprite.render(this), e._uvs = r, e._frame.width = i, e._frame.height = n
                }
            }, i.prototype._renderCanvas = function (t) {
                var e = this._texture;
                if (e.baseTexture.hasLoaded) {
                    var r = t.context, i = this.worldTransform, o = t.resolution, a = e.baseTexture,
                        l = this.tilePosition.x / this.tileScale.x % e._frame.width,
                        h = this.tilePosition.y / this.tileScale.y % e._frame.height;
                    if (!this._canvasPattern) {
                        var u = new n.CanvasBuffer(e._frame.width * o, e._frame.height * o);
                        16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint, this.tintedTexture = s.getTintedTexture(this, this.tint)), u.context.drawImage(this.tintedTexture, 0, 0)) : u.context.drawImage(a.source, -e._frame.x * o, -e._frame.y * o), this._canvasPattern = u.context.createPattern(u.canvas, "repeat")
                    }
                    r.globalAlpha = this.worldAlpha, r.setTransform(i.a * o, i.b * o, i.c * o, i.d * o, i.tx * o, i.ty * o), r.scale(this.tileScale.x / o, this.tileScale.y / o), r.translate(l + this.anchor.x * -this._width, h + this.anchor.y * -this._height);
                    var c = t.blendModes[this.blendMode];
                    c !== t.context.globalCompositeOperation && (r.globalCompositeOperation = c), r.fillStyle = this._canvasPattern, r.fillRect(-l, -h, this._width * o / this.tileScale.x, this._height * o / this.tileScale.y)
                }
            }, i.prototype.getBounds = function () {
                var t, e, r, i, n = this._width, o = this._height, s = n * (1 - this.anchor.x), a = n * -this.anchor.x,
                    l = o * (1 - this.anchor.y), h = o * -this.anchor.y, u = this.worldTransform, c = u.a, p = u.b,
                    d = u.c, f = u.d, m = u.tx, g = u.ty, v = c * a + d * h + m, _ = f * h + p * a + g,
                    y = c * s + d * h + m, x = f * h + p * s + g, b = c * s + d * l + m, T = f * l + p * s + g,
                    w = c * a + d * l + m, E = f * l + p * a + g;
                t = w < (t = b < (t = y < (t = v) ? y : t) ? b : t) ? w : t, r = E < (r = T < (r = x < (r = _) ? x : r) ? T : r) ? E : r, e = w > (e = b > (e = y > (e = v) ? y : e) ? b : e) ? w : e, i = E > (i = T > (i = x > (i = _) ? x : i) ? T : i) ? E : i;
                var S = this._bounds;
                return S.x = t, S.width = e - t, S.y = r, S.height = i - r, this._currentBounds = S, S
            }, i.prototype.containsPoint = function (t) {
                this.worldTransform.applyInverse(t, o);
                var e, r = this._width, i = this._height, n = -r * this.anchor.x;
                return o.x > n && o.x < n + r && (e = -i * this.anchor.y, o.y > e && o.y < e + i)
            }, i.prototype.destroy = function () {
                n.Sprite.prototype.destroy.call(this), this.tileScale = null, this._tileScaleOffset = null, this.tilePosition = null, this._uvs = null
            }, i.fromFrame = function (t, e, r) {
                var o = n.utils.TextureCache[t];
                if (!o) throw new Error('The frameId "' + t + '" does not exist in the texture cache ' + this);
                return new i(o, e, r)
            }, i.fromImage = function (t, e, r, o, s) {
                return new i(n.Texture.fromImage(t, o, s), e, r)
            }
        }, {"../core": 29, "../core/renderers/canvas/utils/CanvasTinter": 48}], 83: [function (t, e, r) {
            var i = t("../core"), n = i.DisplayObject, o = new i.Matrix;
            n.prototype._cacheAsBitmap = !1, n.prototype._originalRenderWebGL = null, n.prototype._originalRenderCanvas = null, n.prototype._originalUpdateTransform = null, n.prototype._originalHitTest = null, n.prototype._originalDestroy = null, n.prototype._cachedSprite = null, Object.defineProperties(n.prototype, {
                cacheAsBitmap: {
                    get: function () {
                        return this._cacheAsBitmap
                    }, set: function (t) {
                        this._cacheAsBitmap !== t && (this._cacheAsBitmap = t, t ? (this._originalRenderWebGL = this.renderWebGL, this._originalRenderCanvas = this.renderCanvas, this._originalUpdateTransform = this.updateTransform, this._originalGetBounds = this.getBounds, this._originalDestroy = this.destroy, this._originalContainsPoint = this.containsPoint, this.renderWebGL = this._renderCachedWebGL, this.renderCanvas = this._renderCachedCanvas, this.destroy = this._cacheAsBitmapDestroy) : (this._cachedSprite && this._destroyCachedDisplayObject(), this.renderWebGL = this._originalRenderWebGL, this.renderCanvas = this._originalRenderCanvas, this.getBounds = this._originalGetBounds, this.destroy = this._originalDestroy, this.updateTransform = this._originalUpdateTransform, this.containsPoint = this._originalContainsPoint))
                    }
                }
            }), n.prototype._renderCachedWebGL = function (t) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObject(t), this._cachedSprite.worldAlpha = this.worldAlpha, t.setObjectRenderer(t.plugins.sprite), t.plugins.sprite.render(this._cachedSprite))
            }, n.prototype._initCachedDisplayObject = function (t) {
                if (!this._cachedSprite) {
                    t.currentRenderer.flush();
                    var e = this.getLocalBounds().clone();
                    if (this._filters) {
                        var r = this._filters[0].padding;
                        e.x -= r, e.y -= r, e.width += 2 * r, e.height += 2 * r
                    }
                    var n = t.currentRenderTarget, s = t.filterManager.filterStack,
                        a = new i.RenderTexture(t, 0 | e.width, 0 | e.height), l = o;
                    l.tx = -e.x, l.ty = -e.y, this.renderWebGL = this._originalRenderWebGL, a.render(this, l, !0, !0), t.setRenderTarget(n), t.filterManager.filterStack = s, this.renderWebGL = this._renderCachedWebGL, this.updateTransform = this.displayObjectUpdateTransform, this.getBounds = this._getCachedBounds, this._cachedSprite = new i.Sprite(a), this._cachedSprite.worldTransform = this.worldTransform, this._cachedSprite.anchor.x = -e.x / e.width, this._cachedSprite.anchor.y = -e.y / e.height, this.updateTransform(), this.containsPoint = this._cachedSprite.containsPoint.bind(this._cachedSprite)
                }
            }, n.prototype._renderCachedCanvas = function (t) {
                !this.visible || this.worldAlpha <= 0 || !this.renderable || (this._initCachedDisplayObjectCanvas(t), this._cachedSprite.worldAlpha = this.worldAlpha, this._cachedSprite.renderCanvas(t))
            }, n.prototype._initCachedDisplayObjectCanvas = function (t) {
                if (!this._cachedSprite) {
                    var e = this.getLocalBounds(), r = t.context, n = new i.RenderTexture(t, 0 | e.width, 0 | e.height),
                        s = o;
                    s.tx = -e.x, s.ty = -e.y, this.renderCanvas = this._originalRenderCanvas, n.render(this, s, !0), t.context = r, this.renderCanvas = this._renderCachedCanvas, this.updateTransform = this.displayObjectUpdateTransform, this.getBounds = this._getCachedBounds, this._cachedSprite = new i.Sprite(n), this._cachedSprite.worldTransform = this.worldTransform, this._cachedSprite.anchor.x = -e.x / e.width, this._cachedSprite.anchor.y = -e.y / e.height, this.updateTransform(), this.containsPoint = this._cachedSprite.containsPoint.bind(this._cachedSprite)
                }
            }, n.prototype._getCachedBounds = function () {
                return this._cachedSprite._currentBounds = null, this._cachedSprite.getBounds()
            }, n.prototype._destroyCachedDisplayObject = function () {
                this._cachedSprite._texture.destroy(), this._cachedSprite = null
            }, n.prototype._cacheAsBitmapDestroy = function () {
                this.cacheAsBitmap = !1, this._originalDestroy()
            }
        }, {"../core": 29}], 84: [function (t, e, r) {
            var i = t("../core");
            i.DisplayObject.prototype.name = null, i.Container.prototype.getChildByName = function (t) {
                for (var e = 0; e < this.children.length; e++) if (this.children[e].name === t) return this.children[e];
                return null
            }
        }, {"../core": 29}], 85: [function (t, e, r) {
            var i = t("../core");
            i.DisplayObject.prototype.getGlobalPosition = function (t) {
                return t = t || new i.Point, this.parent ? (this.displayObjectUpdateTransform(), t.x = this.worldTransform.tx, t.y = this.worldTransform.ty) : (t.x = this.position.x, t.y = this.position.y), t
            }
        }, {"../core": 29}], 86: [function (t, e, r) {
            t("./cacheAsBitmap"), t("./getChildByName"), t("./getGlobalPosition"), e.exports = {
                MovieClip: t("./MovieClip"), TilingSprite: t("./TilingSprite"), BitmapText: t("./BitmapText")
            }
        }, {
            "./BitmapText": 80, "./MovieClip": 81, "./TilingSprite": 82, "./cacheAsBitmap": 83, "./getChildByName": 84,
            "./getGlobalPosition": 85
        }], 87: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nuniform vec4 dimensions;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n    if (clamp(p.x, 0.0, 4.0) == p.x && clamp(p.y, 0.0, 4.0) == p.y)\n    {\n        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 uv = gl_FragCoord.xy;\n\n    vec3 col = texture2D(uSampler, floor( uv / pixelSize ) * pixelSize / dimensions.xy).rgb;\n\n    float gray = (col.r + col.g + col.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    vec2 p = mod( uv / ( pixelSize * 0.5 ), 2.0) - vec2(1.0);\n    col = col * character(n, p);\n\n    gl_FragColor = vec4(col, 1.0);\n}\n", {
                    dimensions: {
                        type: "4fv", value: new Float32Array([0, 0, 0, 0])
                    }, pixelSize: {type: "1f", value: 8}
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                size: {
                    get: function () {
                        return this.uniforms.pixelSize.value
                    }, set: function (t) {
                        this.uniforms.pixelSize.value = t
                    }
                }
            })
        }, {"../../core": 29}], 88: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this), this.blurXFilter = new o, this.blurYFilter = new s, this.defaultFilter = new n.AbstractFilter
            }

            var n = t("../../core"), o = t("../blur/BlurXFilter"), s = t("../blur/BlurYFilter");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r) {
                var i = t.filterManager.getRenderTarget(!0);
                this.defaultFilter.applyFilter(t, e, r), this.blurXFilter.applyFilter(t, e, i), t.blendModeManager.setBlendMode(n.BLEND_MODES.SCREEN), this.blurYFilter.applyFilter(t, i, r), t.blendModeManager.setBlendMode(n.BLEND_MODES.NORMAL), t.filterManager.returnRenderTarget(i)
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (t) {
                        this.blurXFilter.blur = this.blurYFilter.blur = t
                    }
                }, blurX: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (t) {
                        this.blurXFilter.blur = t
                    }
                }, blurY: {
                    get: function () {
                        return this.blurYFilter.blur
                    }, set: function (t) {
                        this.blurYFilter.blur = t
                    }
                }
            })
        }, {"../../core": 29, "../blur/BlurXFilter": 91, "../blur/BlurYFilter": 92}], 89: [function (t, e, r) {
            function i(t, e) {
                n.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform float dirX;\nuniform float dirY;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[3];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[0] = aTextureCoord + vec2( (0.004 * strength) * dirX, (0.004 * strength) * dirY );\n    vBlurTexCoords[1] = aTextureCoord + vec2( (0.008 * strength) * dirX, (0.008 * strength) * dirY );\n    vBlurTexCoords[2] = aTextureCoord + vec2( (0.012 * strength) * dirX, (0.012 * strength) * dirY );\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[3];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vTextureCoord     ) * 0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0]) * 0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1]) * 0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2]) * 0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f", value: 1
                    }, dirX: {type: "1f", value: t || 0}, dirY: {type: "1f", value: e || 0}
                }), this.defaultFilter = new n.AbstractFilter, this.passes = 1, this.dirX = t || 0, this.dirY = e || 0, this.strength = 4
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r, i) {
                var n = this.getShader(t);
                if (this.uniforms.strength.value = this.strength / 4 / this.passes * (e.frame.width / e.size.width), 1 === this.passes) t.filterManager.applyFilter(n, e, r, i); else {
                    var o = t.filterManager.getRenderTarget(!0);
                    t.filterManager.applyFilter(n, e, o, i);
                    for (var s = 0; s < this.passes - 2; s++) t.filterManager.applyFilter(n, o, o, i);
                    t.filterManager.applyFilter(n, o, r, i), t.filterManager.returnRenderTarget(o)
                }
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (t) {
                        this.padding = .5 * t, this.strength = t
                    }
                }, dirX: {
                    get: function () {
                        return this.dirX
                    }, set: function (t) {
                        this.uniforms.dirX.value = t
                    }
                }, dirY: {
                    get: function () {
                        return this.dirY
                    }, set: function (t) {
                        this.uniforms.dirY.value = t
                    }
                }
            })
        }, {"../../core": 29}], 90: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this), this.blurXFilter = new o, this.blurYFilter = new s
            }

            var n = t("../../core"), o = t("./BlurXFilter"), s = t("./BlurYFilter");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r) {
                var i = t.filterManager.getRenderTarget(!0);
                this.blurXFilter.applyFilter(t, e, i), this.blurYFilter.applyFilter(t, i, r), t.filterManager.returnRenderTarget(i)
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (t) {
                        this.padding = .5 * Math.abs(t), this.blurXFilter.blur = this.blurYFilter.blur = t
                    }
                }, passes: {
                    get: function () {
                        return this.blurXFilter.passes
                    }, set: function (t) {
                        this.blurXFilter.passes = this.blurYFilter.passes = t
                    }
                }, blurX: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (t) {
                        this.blurXFilter.blur = t
                    }
                }, blurY: {
                    get: function () {
                        return this.blurYFilter.blur
                    }, set: function (t) {
                        this.blurYFilter.blur = t
                    }
                }
            })
        }, {"../../core": 29, "./BlurXFilter": 91, "./BlurYFilter": 92}], 91: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(-0.012 * strength, 0.0);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(-0.008 * strength, 0.0);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(-0.004 * strength, 0.0);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2( 0.004 * strength, 0.0);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2( 0.008 * strength, 0.0);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2( 0.012 * strength, 0.0);\n\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f", value: 1
                    }
                }), this.passes = 1, this.strength = 4
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r, i) {
                var n = this.getShader(t);
                if (this.uniforms.strength.value = this.strength / 4 / this.passes * (e.frame.width / e.size.width), 1 === this.passes) t.filterManager.applyFilter(n, e, r, i); else {
                    for (var o = t.filterManager.getRenderTarget(!0), s = e, a = o, l = 0; l < this.passes - 1; l++) {
                        t.filterManager.applyFilter(n, s, a, !0);
                        var h = a;
                        a = s, s = h
                    }
                    t.filterManager.applyFilter(n, s, r, i), t.filterManager.returnRenderTarget(o)
                }
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (t) {
                        this.padding = .5 * Math.abs(t), this.strength = t
                    }
                }
            })
        }, {"../../core": 29}], 92: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = vec4(0.0);\n\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    gl_FragColor += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n}\n", {
                    strength: {
                        type: "1f", value: 1
                    }
                }), this.passes = 1, this.strength = 4
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r, i) {
                var n = this.getShader(t);
                if (this.uniforms.strength.value = Math.abs(this.strength) / 4 / this.passes * (e.frame.height / e.size.height), 1 === this.passes) t.filterManager.applyFilter(n, e, r, i); else {
                    for (var o = t.filterManager.getRenderTarget(!0), s = e, a = o, l = 0; l < this.passes - 1; l++) {
                        t.filterManager.applyFilter(n, s, a, !0);
                        var h = a;
                        a = s, s = h
                    }
                    t.filterManager.applyFilter(n, s, r, i), t.filterManager.returnRenderTarget(o)
                }
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (t) {
                        this.padding = .5 * Math.abs(t), this.strength = t
                    }
                }
            })
        }, {"../../core": 29}], 93: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 delta;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta * percent);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n", {
                    delta: {
                        type: "v2", value: {x: .1, y: 0}
                    }
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i
        }, {"../../core": 29}], 94: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float m[25];\n\nvoid main(void)\n{\n\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.r = (m[0] * c.r);\n        gl_FragColor.r += (m[1] * c.g);\n        gl_FragColor.r += (m[2] * c.b);\n        gl_FragColor.r += (m[3] * c.a);\n        gl_FragColor.r += m[4] * c.a;\n\n    gl_FragColor.g = (m[5] * c.r);\n        gl_FragColor.g += (m[6] * c.g);\n        gl_FragColor.g += (m[7] * c.b);\n        gl_FragColor.g += (m[8] * c.a);\n        gl_FragColor.g += m[9] * c.a;\n\n     gl_FragColor.b = (m[10] * c.r);\n        gl_FragColor.b += (m[11] * c.g);\n        gl_FragColor.b += (m[12] * c.b);\n        gl_FragColor.b += (m[13] * c.a);\n        gl_FragColor.b += m[14] * c.a;\n\n     gl_FragColor.a = (m[15] * c.r);\n        gl_FragColor.a += (m[16] * c.g);\n        gl_FragColor.a += (m[17] * c.b);\n        gl_FragColor.a += (m[18] * c.a);\n        gl_FragColor.a += m[19] * c.a;\n\n}\n", {
                    m: {
                        type: "1fv", value: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]
                    }
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype._loadMatrix = function (t, e) {
                var r = t;
                (e = !!e) && (this._multiply(r, this.uniforms.m.value, t), r = this._colorMatrix(r)), this.uniforms.m.value = r
            }, i.prototype._multiply = function (t, e, r) {
                return t[0] = e[0] * r[0] + e[1] * r[5] + e[2] * r[10] + e[3] * r[15], t[1] = e[0] * r[1] + e[1] * r[6] + e[2] * r[11] + e[3] * r[16], t[2] = e[0] * r[2] + e[1] * r[7] + e[2] * r[12] + e[3] * r[17], t[3] = e[0] * r[3] + e[1] * r[8] + e[2] * r[13] + e[3] * r[18], t[4] = e[0] * r[4] + e[1] * r[9] + e[2] * r[14] + e[3] * r[19], t[5] = e[5] * r[0] + e[6] * r[5] + e[7] * r[10] + e[8] * r[15], t[6] = e[5] * r[1] + e[6] * r[6] + e[7] * r[11] + e[8] * r[16], t[7] = e[5] * r[2] + e[6] * r[7] + e[7] * r[12] + e[8] * r[17], t[8] = e[5] * r[3] + e[6] * r[8] + e[7] * r[13] + e[8] * r[18], t[9] = e[5] * r[4] + e[6] * r[9] + e[7] * r[14] + e[8] * r[19], t[10] = e[10] * r[0] + e[11] * r[5] + e[12] * r[10] + e[13] * r[15], t[11] = e[10] * r[1] + e[11] * r[6] + e[12] * r[11] + e[13] * r[16], t[12] = e[10] * r[2] + e[11] * r[7] + e[12] * r[12] + e[13] * r[17], t[13] = e[10] * r[3] + e[11] * r[8] + e[12] * r[13] + e[13] * r[18], t[14] = e[10] * r[4] + e[11] * r[9] + e[12] * r[14] + e[13] * r[19], t[15] = e[15] * r[0] + e[16] * r[5] + e[17] * r[10] + e[18] * r[15], t[16] = e[15] * r[1] + e[16] * r[6] + e[17] * r[11] + e[18] * r[16], t[17] = e[15] * r[2] + e[16] * r[7] + e[17] * r[12] + e[18] * r[17], t[18] = e[15] * r[3] + e[16] * r[8] + e[17] * r[13] + e[18] * r[18], t[19] = e[15] * r[4] + e[16] * r[9] + e[17] * r[14] + e[18] * r[19], t
            }, i.prototype._colorMatrix = function (t) {
                var e = new Float32Array(t);
                return e[4] /= 255, e[9] /= 255, e[14] /= 255, e[19] /= 255, e
            }, i.prototype.brightness = function (t, e) {
                var r = [t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, i.prototype.greyscale = function (t, e) {
                var r = [t, t, t, 0, 0, t, t, t, 0, 0, t, t, t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, i.prototype.grayscale = i.prototype.greyscale, i.prototype.blackAndWhite = function (t) {
                var e = [.3, .6, .1, 0, 0, .3, .6, .1, 0, 0, .3, .6, .1, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.hue = function (t, e) {
                t = (t || 0) / 180 * Math.PI;
                var r = Math.cos(t), i = Math.sin(t),
                    n = [.213 + .787 * r + -.213 * i, .715 + -.715 * r + -.715 * i, .072 + -.072 * r + .928 * i, 0, 0, .213 + -.213 * r + .143 * i, .715 + r * (1 - .715) + .14 * i, .072 + -.072 * r + -.283 * i, 0, 0, .213 + -.213 * r + -.787 * i, .715 + -.715 * r + .715 * i, .072 + .928 * r + .072 * i, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            }, i.prototype.contrast = function (t, e) {
                var r = (t || 0) + 1, i = -128 * (r - 1),
                    n = [r, 0, 0, 0, i, 0, r, 0, 0, i, 0, 0, r, 0, i, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            }, i.prototype.saturate = function (t, e) {
                var r = 2 * (t || 0) / 3 + 1, i = -.5 * (r - 1),
                    n = [r, i, i, 0, 0, i, r, i, 0, 0, i, i, r, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(n, e)
            }, i.prototype.desaturate = function (t) {
                this.saturate(-1)
            }, i.prototype.negative = function (t) {
                var e = [0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.sepia = function (t) {
                var e = [.393, .7689999, .18899999, 0, 0, .349, .6859999, .16799999, 0, 0, .272, .5339999, .13099999, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.technicolor = function (t) {
                var e = [1.9125277891456083, -.8545344976951645, -.09155508482755585, 0, 11.793603434377337, -.3087833385928097, 1.7658908555458428, -.10601743074722245, 0, -70.35205161461398, -.231103377548616, -.7501899197440212, 1.847597816108189, 0, 30.950940869491138, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.polaroid = function (t) {
                var e = [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.toBGR = function (t) {
                var e = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.kodachrome = function (t) {
                var e = [1.1285582396593525, -.3967382283601348, -.03992559172921793, 0, 63.72958762196502, -.16404339962244616, 1.0835251566291304, -.05498805115633132, 0, 24.732407896706203, -.16786010706155763, -.5603416277695248, 1.6014850761964943, 0, 35.62982807460946, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.browni = function (t) {
                var e = [.5997023498159715, .34553243048391263, -.2708298674538042, 0, 47.43192855600873, -.037703249837783157, .8609577587992641, .15059552388459913, 0, -36.96841498319127, .24113635128153335, -.07441037908422492, .44972182064877153, 0, -7.562075277591283, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.vintage = function (t) {
                var e = [.6279345635605994, .3202183420819367, -.03965408211312453, 0, 9.651285835294123, .02578397704808868, .6441188644374771, .03259127616149294, 0, 7.462829176470591, .0466055556782719, -.0851232987247891, .5241648018700465, 0, 5.159190588235296, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.colorTone = function (t, e, r, i, n) {
                t = t || .2, e = e || .15;
                var o = ((r = r || 16770432) >> 16 & 255) / 255, s = (r >> 8 & 255) / 255, a = (255 & r) / 255,
                    l = ((i = i || 3375104) >> 16 & 255) / 255, h = (i >> 8 & 255) / 255, u = (255 & i) / 255,
                    c = [.3, .59, .11, 0, 0, o, s, a, t, 0, l, h, u, e, 0, o - l, s - h, a - u, 0, 0];
                this._loadMatrix(c, n)
            }, i.prototype.night = function (t, e) {
                var r = [-2 * (t = t || .1), -t, 0, 0, 0, -t, 0, t, 0, 0, 0, t, 2 * t, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, i.prototype.predator = function (t, e) {
                var r = [11.224130630493164 * t, -4.794486999511719 * t, -2.8746118545532227 * t, 0 * t, .40342438220977783 * t, -3.6330697536468506 * t, 9.193157196044922 * t, -2.951810836791992 * t, 0 * t, -1.316135048866272 * t, -3.2184197902679443 * t, -4.2375030517578125 * t, 7.476448059082031 * t, 0 * t, .8044459223747253 * t, 0, 0, 0, 1, 0];
                this._loadMatrix(r, e)
            }, i.prototype.lsd = function (t) {
                var e = [2, -.4, .5, 0, 0, -.5, 2, -.4, 0, 0, -.4, -.5, 3, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(e, t)
            }, i.prototype.reset = function () {
                var t = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
                this._loadMatrix(t, !1)
            }, Object.defineProperties(i.prototype, {
                matrix: {
                    get: function () {
                        return this.uniforms.m.value
                    }, set: function (t) {
                        this.uniforms.m.value = t
                    }
                }
            })
        }, {"../../core": 29}], 95: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float step;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    color = floor(color * step) / step;\n\n    gl_FragColor = color;\n}\n", {
                    step: {
                        type: "1f", value: 5
                    }
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                step: {
                    get: function () {
                        return this.uniforms.step.value
                    }, set: function (t) {
                        this.uniforms.step.value = t
                    }
                }
            })
        }, {"../../core": 29}], 96: [function (t, e, r) {
            function i(t, e, r) {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n", {
                    matrix: {
                        type: "1fv", value: new Float32Array(t)
                    }, texelSize: {type: "v2", value: {x: 1 / e, y: 1 / r}}
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                matrix: {
                    get: function () {
                        return this.uniforms.matrix.value
                    }, set: function (t) {
                        this.uniforms.matrix.value = new Float32Array(t)
                    }
                }, width: {
                    get: function () {
                        return 1 / this.uniforms.texelSize.value.x
                    }, set: function (t) {
                        this.uniforms.texelSize.value.x = 1 / t
                    }
                }, height: {
                    get: function () {
                        return 1 / this.uniforms.texelSize.value.y
                    }, set: function (t) {
                        this.uniforms.texelSize.value.y = 1 / t
                    }
                }
            })
        }, {"../../core": 29}], 97: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n")
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i
        }, {"../../core": 29}], 98: [function (t, e, r) {
            function i(t, e) {
                var r = new n.Matrix;
                t.renderable = !1, n.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform mat3 projectionMatrix;\nuniform mat3 otherMatrix;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void)\n{\n   gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vMapCoord = ( otherMatrix * vec3( aTextureCoord, 1.0)  ).xy;\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision mediump float;\n\nvarying vec2 vMapCoord;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec2 scale;\n\nuniform sampler2D uSampler;\nuniform sampler2D mapSampler;\n\nvoid main(void)\n{\n   vec4 map =  texture2D(mapSampler, vMapCoord);\n\n   map -= 0.5;\n   map.xy *= scale;\n\n   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + map.x, vTextureCoord.y + map.y));\n}\n", {
                    mapSampler: {
                        type: "sampler2D", value: t.texture
                    }, otherMatrix: {type: "mat3", value: r.toArray(!0)}, scale: {type: "v2", value: {x: 1, y: 1}}
                }), this.maskSprite = t, this.maskMatrix = r, null !== e && void 0 !== e || (e = 20), this.scale = new n.Point(e, e)
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r) {
                var i = t.filterManager;
                i.calculateMappedMatrix(e.frame, this.maskSprite, this.maskMatrix), this.uniforms.otherMatrix.value = this.maskMatrix.toArray(!0), this.uniforms.scale.value.x = this.scale.x * (1 / e.frame.width), this.uniforms.scale.value.y = this.scale.y * (1 / e.frame.height);
                var n = this.getShader(t);
                i.applyFilter(n, e, r)
            }, Object.defineProperties(i.prototype, {
                map: {
                    get: function () {
                        return this.uniforms.mapSampler.value
                    }, set: function (t) {
                        this.uniforms.mapSampler.value = t
                    }
                }
            })
        }, {"../../core": 29}], 99: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 dimensions;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * dimensions.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n", {
                    scale: {
                        type: "1f", value: 1
                    }, angle: {type: "1f", value: 5}, dimensions: {type: "4fv", value: [0, 0, 0, 0]}
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                scale: {
                    get: function () {
                        return this.uniforms.scale.value
                    }, set: function (t) {
                        this.uniforms.scale.value = t
                    }
                }, angle: {
                    get: function () {
                        return this.uniforms.angle.value
                    }, set: function (t) {
                        this.uniforms.angle.value = t
                    }
                }
            })
        }, {"../../core": 29}], 100: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nuniform float strength;\nuniform vec2 offset;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nvarying vec2 vBlurTexCoords[6];\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3((aVertexPosition+offset), 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n\n    vBlurTexCoords[ 0] = aTextureCoord + vec2(0.0, -0.012 * strength);\n    vBlurTexCoords[ 1] = aTextureCoord + vec2(0.0, -0.008 * strength);\n    vBlurTexCoords[ 2] = aTextureCoord + vec2(0.0, -0.004 * strength);\n    vBlurTexCoords[ 3] = aTextureCoord + vec2(0.0,  0.004 * strength);\n    vBlurTexCoords[ 4] = aTextureCoord + vec2(0.0,  0.008 * strength);\n    vBlurTexCoords[ 5] = aTextureCoord + vec2(0.0,  0.012 * strength);\n\n   vColor = vec4(aColor.rgb * aColor.a, aColor.a);\n}\n", "precision lowp float;\n\nvarying vec2 vTextureCoord;\nvarying vec2 vBlurTexCoords[6];\nvarying vec4 vColor;\n\nuniform vec3 color;\nuniform float alpha;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec4 sum = vec4(0.0);\n\n    sum += texture2D(uSampler, vBlurTexCoords[ 0])*0.004431848411938341;\n    sum += texture2D(uSampler, vBlurTexCoords[ 1])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 2])*0.2419707245191454;\n    sum += texture2D(uSampler, vTextureCoord     )*0.3989422804014327;\n    sum += texture2D(uSampler, vBlurTexCoords[ 3])*0.2419707245191454;\n    sum += texture2D(uSampler, vBlurTexCoords[ 4])*0.05399096651318985;\n    sum += texture2D(uSampler, vBlurTexCoords[ 5])*0.004431848411938341;\n\n    gl_FragColor = vec4( color.rgb * sum.a * alpha, sum.a * alpha );\n}\n", {
                    blur: {
                        type: "1f", value: 1 / 512
                    }, color: {type: "c", value: [0, 0, 0]}, alpha: {type: "1f", value: .7},
                    offset: {type: "2f", value: [5, 5]}, strength: {type: "1f", value: 1}
                }), this.passes = 1, this.strength = 4
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r, i) {
                var n = this.getShader(t);
                if (this.uniforms.strength.value = this.strength / 4 / this.passes * (e.frame.height / e.size.height), 1 === this.passes) t.filterManager.applyFilter(n, e, r, i); else {
                    for (var o = t.filterManager.getRenderTarget(!0), s = e, a = o, l = 0; l < this.passes - 1; l++) {
                        t.filterManager.applyFilter(n, s, a, i);
                        var h = a;
                        a = s, s = h
                    }
                    t.filterManager.applyFilter(n, s, r, i), t.filterManager.returnRenderTarget(o)
                }
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.strength
                    }, set: function (t) {
                        this.padding = .5 * t, this.strength = t
                    }
                }
            })
        }, {"../../core": 29}], 101: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this), this.blurXFilter = new o, this.blurYTintFilter = new s, this.defaultFilter = new n.AbstractFilter, this.padding = 30, this._dirtyPosition = !0, this._angle = 45 * Math.PI / 180, this._distance = 10, this.alpha = .75, this.hideObject = !1, this.blendMode = n.BLEND_MODES.MULTIPLY
            }

            var n = t("../../core"), o = t("../blur/BlurXFilter"), s = t("./BlurYTintFilter");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r) {
                var i = t.filterManager.getRenderTarget(!0);
                this._dirtyPosition && (this._dirtyPosition = !1, this.blurYTintFilter.uniforms.offset.value[0] = Math.sin(this._angle) * this._distance, this.blurYTintFilter.uniforms.offset.value[1] = Math.cos(this._angle) * this._distance), this.blurXFilter.applyFilter(t, e, i), t.blendModeManager.setBlendMode(this.blendMode), this.blurYTintFilter.applyFilter(t, i, r), t.blendModeManager.setBlendMode(n.BLEND_MODES.NORMAL), this.hideObject || this.defaultFilter.applyFilter(t, e, r), t.filterManager.returnRenderTarget(i)
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (t) {
                        this.blurXFilter.blur = this.blurYTintFilter.blur = t
                    }
                }, blurX: {
                    get: function () {
                        return this.blurXFilter.blur
                    }, set: function (t) {
                        this.blurXFilter.blur = t
                    }
                }, blurY: {
                    get: function () {
                        return this.blurYTintFilter.blur
                    }, set: function (t) {
                        this.blurYTintFilter.blur = t
                    }
                }, color: {
                    get: function () {
                        return n.utils.rgb2hex(this.blurYTintFilter.uniforms.color.value)
                    }, set: function (t) {
                        this.blurYTintFilter.uniforms.color.value = n.utils.hex2rgb(t)
                    }
                }, alpha: {
                    get: function () {
                        return this.blurYTintFilter.uniforms.alpha.value
                    }, set: function (t) {
                        this.blurYTintFilter.uniforms.alpha.value = t
                    }
                }, distance: {
                    get: function () {
                        return this._distance
                    }, set: function (t) {
                        this._dirtyPosition = !0, this._distance = t
                    }
                }, angle: {
                    get: function () {
                        return this._angle
                    }, set: function (t) {
                        this._dirtyPosition = !0, this._angle = t
                    }
                }
            })
        }, {"../../core": 29, "../blur/BlurXFilter": 91, "./BlurYTintFilter": 100}], 102: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\nuniform float gray;\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);\n}\n", {
                    gray: {
                        type: "1f", value: 1
                    }
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                gray: {
                    get: function () {
                        return this.uniforms.gray.value
                    }, set: function (t) {
                        this.uniforms.gray.value = t
                    }
                }
            })
        }, {"../../core": 29}], 103: [function (t, e, r) {
            e.exports = {
                AsciiFilter: t("./ascii/AsciiFilter"), BloomFilter: t("./bloom/BloomFilter"),
                BlurFilter: t("./blur/BlurFilter"), BlurXFilter: t("./blur/BlurXFilter"),
                BlurYFilter: t("./blur/BlurYFilter"), BlurDirFilter: t("./blur/BlurDirFilter"),
                ColorMatrixFilter: t("./color/ColorMatrixFilter"), ColorStepFilter: t("./color/ColorStepFilter"),
                ConvolutionFilter: t("./convolution/ConvolutionFilter"),
                CrossHatchFilter: t("./crosshatch/CrossHatchFilter"),
                DisplacementFilter: t("./displacement/DisplacementFilter"), DotScreenFilter: t("./dot/DotScreenFilter"),
                GrayFilter: t("./gray/GrayFilter"), DropShadowFilter: t("./dropshadow/DropShadowFilter"),
                InvertFilter: t("./invert/InvertFilter"), NoiseFilter: t("./noise/NoiseFilter"),
                PixelateFilter: t("./pixelate/PixelateFilter"), RGBSplitFilter: t("./rgb/RGBSplitFilter"),
                ShockwaveFilter: t("./shockwave/ShockwaveFilter"), SepiaFilter: t("./sepia/SepiaFilter"),
                SmartBlurFilter: t("./blur/SmartBlurFilter"), TiltShiftFilter: t("./tiltshift/TiltShiftFilter"),
                TiltShiftXFilter: t("./tiltshift/TiltShiftXFilter"),
                TiltShiftYFilter: t("./tiltshift/TiltShiftYFilter"), TwistFilter: t("./twist/TwistFilter")
            }
        }, {
            "./ascii/AsciiFilter": 87, "./bloom/BloomFilter": 88, "./blur/BlurDirFilter": 89, "./blur/BlurFilter": 90,
            "./blur/BlurXFilter": 91, "./blur/BlurYFilter": 92, "./blur/SmartBlurFilter": 93,
            "./color/ColorMatrixFilter": 94, "./color/ColorStepFilter": 95, "./convolution/ConvolutionFilter": 96,
            "./crosshatch/CrossHatchFilter": 97, "./displacement/DisplacementFilter": 98, "./dot/DotScreenFilter": 99,
            "./dropshadow/DropShadowFilter": 101, "./gray/GrayFilter": 102, "./invert/InvertFilter": 104,
            "./noise/NoiseFilter": 105, "./pixelate/PixelateFilter": 106, "./rgb/RGBSplitFilter": 107,
            "./sepia/SepiaFilter": 108, "./shockwave/ShockwaveFilter": 109, "./tiltshift/TiltShiftFilter": 111,
            "./tiltshift/TiltShiftXFilter": 112, "./tiltshift/TiltShiftYFilter": 113, "./twist/TwistFilter": 114
        }], 104: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform float invert;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);\n}\n", {
                    invert: {
                        type: "1f", value: 1
                    }
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                invert: {
                    get: function () {
                        return this.uniforms.invert.value
                    }, set: function (t) {
                        this.uniforms.invert.value = t
                    }
                }
            })
        }, {"../../core": 29}], 105: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision highp float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform float noise;\nuniform sampler2D uSampler;\n\nfloat rand(vec2 co)\n{\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main()\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    float diff = (rand(vTextureCoord) - 0.5) * noise;\n\n    color.r += diff;\n    color.g += diff;\n    color.b += diff;\n\n    gl_FragColor = color;\n}\n", {
                    noise: {
                        type: "1f", value: .5
                    }
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                noise: {
                    get: function () {
                        return this.uniforms.noise.value
                    }, set: function (t) {
                        this.uniforms.noise.value = t
                    }
                }
            })
        }, {"../../core": 29}], 106: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec4 dimensions;\nuniform vec2 pixelSize;\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    vec2 coord = vTextureCoord;\n\n    vec2 size = dimensions.xy / pixelSize;\n\n    vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;\n\n    gl_FragColor = texture2D(uSampler, color);\n}\n", {
                    dimensions: {
                        type: "4fv", value: new Float32Array([0, 0, 0, 0])
                    }, pixelSize: {type: "v2", value: {x: 10, y: 10}}
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                size: {
                    get: function () {
                        return this.uniforms.pixelSize.value
                    }, set: function (t) {
                        this.uniforms.pixelSize.value = t
                    }
                }
            })
        }, {"../../core": 29}], 107: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 dimensions;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n", {
                    red: {
                        type: "v2", value: {x: 20, y: 20}
                    }, green: {type: "v2", value: {x: -20, y: 20}}, blue: {type: "v2", value: {x: 20, y: -20}},
                    dimensions: {type: "4fv", value: [0, 0, 0, 0]}
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                red: {
                    get: function () {
                        return this.uniforms.red.value
                    }, set: function (t) {
                        this.uniforms.red.value = t
                    }
                }, green: {
                    get: function () {
                        return this.uniforms.green.value
                    }, set: function (t) {
                        this.uniforms.green.value = t
                    }
                }, blue: {
                    get: function () {
                        return this.uniforms.blue.value
                    }, set: function (t) {
                        this.uniforms.blue.value = t
                    }
                }
            })
        }, {"../../core": 29}], 108: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float sepia;\n\nconst mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);\n\nvoid main(void)\n{\n   gl_FragColor = texture2D(uSampler, vTextureCoord);\n   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);\n}\n", {
                    sepia: {
                        type: "1f", value: 1
                    }
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                sepia: {
                    get: function () {
                        return this.uniforms.sepia.value
                    }, set: function (t) {
                        this.uniforms.sepia.value = t
                    }
                }
            })
        }, {"../../core": 29}], 109: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision lowp float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nuniform vec2 center;\nuniform vec3 params; // 10.0, 0.8, 0.1\nuniform float time;\n\nvoid main()\n{\n    vec2 uv = vTextureCoord;\n    vec2 texCoord = uv;\n\n    float dist = distance(uv, center);\n\n    if ( (dist <= (time + params.z)) && (dist >= (time - params.z)) )\n    {\n        float diff = (dist - time);\n        float powDiff = 1.0 - pow(abs(diff*params.x), params.y);\n\n        float diffTime = diff  * powDiff;\n        vec2 diffUV = normalize(uv - center);\n        texCoord = uv + (diffUV * diffTime);\n    }\n\n    gl_FragColor = texture2D(uSampler, texCoord);\n}\n", {
                    center: {
                        type: "v2", value: {x: .5, y: .5}
                    }, params: {type: "v3", value: {x: 10, y: .8, z: .1}}, time: {type: "1f", value: 0}
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                center: {
                    get: function () {
                        return this.uniforms.center.value
                    }, set: function (t) {
                        this.uniforms.center.value = t
                    }
                }, params: {
                    get: function () {
                        return this.uniforms.params.value
                    }, set: function (t) {
                        this.uniforms.params.value = t
                    }
                }, time: {
                    get: function () {
                        return this.uniforms.time.value
                    }, set: function (t) {
                        this.uniforms.time.value = t
                    }
                }
            })
        }, {"../../core": 29}], 110: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    gl_FragColor = color / total;\n    gl_FragColor.rgb /= gl_FragColor.a + 0.00001;\n}\n", {
                    blur: {
                        type: "1f", value: 100
                    }, gradientBlur: {type: "1f", value: 600},
                    start: {type: "v2", value: {x: 0, y: window.innerHeight / 2}},
                    end: {type: "v2", value: {x: 600, y: window.innerHeight / 2}},
                    delta: {type: "v2", value: {x: 30, y: 30}},
                    texSize: {type: "v2", value: {x: window.innerWidth, y: window.innerHeight}}
                }), this.updateDelta()
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.updateDelta = function () {
                this.uniforms.delta.value.x = 0, this.uniforms.delta.value.y = 0
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.uniforms.blur.value
                    }, set: function (t) {
                        this.uniforms.blur.value = t
                    }
                }, gradientBlur: {
                    get: function () {
                        return this.uniforms.gradientBlur.value
                    }, set: function (t) {
                        this.uniforms.gradientBlur.value = t
                    }
                }, start: {
                    get: function () {
                        return this.uniforms.start.value
                    }, set: function (t) {
                        this.uniforms.start.value = t, this.updateDelta()
                    }
                }, end: {
                    get: function () {
                        return this.uniforms.end.value
                    }, set: function (t) {
                        this.uniforms.end.value = t, this.updateDelta()
                    }
                }
            })
        }, {"../../core": 29}], 111: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this), this.tiltShiftXFilter = new o, this.tiltShiftYFilter = new s
            }

            var n = t("../../core"), o = t("./TiltShiftXFilter"), s = t("./TiltShiftYFilter");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, i.prototype.applyFilter = function (t, e, r) {
                var i = t.filterManager.getRenderTarget(!0);
                this.tiltShiftXFilter.applyFilter(t, e, i), this.tiltShiftYFilter.applyFilter(t, i, r), t.filterManager.returnRenderTarget(i)
            }, Object.defineProperties(i.prototype, {
                blur: {
                    get: function () {
                        return this.tiltShiftXFilter.blur
                    }, set: function (t) {
                        this.tiltShiftXFilter.blur = this.tiltShiftYFilter.blur = t
                    }
                }, gradientBlur: {
                    get: function () {
                        return this.tiltShiftXFilter.gradientBlur
                    }, set: function (t) {
                        this.tiltShiftXFilter.gradientBlur = this.tiltShiftYFilter.gradientBlur = t
                    }
                }, start: {
                    get: function () {
                        return this.tiltShiftXFilter.start
                    }, set: function (t) {
                        this.tiltShiftXFilter.start = this.tiltShiftYFilter.start = t
                    }
                }, end: {
                    get: function () {
                        return this.tiltShiftXFilter.end
                    }, set: function (t) {
                        this.tiltShiftXFilter.end = this.tiltShiftYFilter.end = t
                    }
                }
            })
        }, {"../../core": 29, "./TiltShiftXFilter": 112, "./TiltShiftYFilter": 113}], 112: [function (t, e, r) {
            function i() {
                n.call(this)
            }

            var n = t("./TiltShiftAxisFilter");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.updateDelta = function () {
                var t = this.uniforms.end.value.x - this.uniforms.start.value.x,
                    e = this.uniforms.end.value.y - this.uniforms.start.value.y, r = Math.sqrt(t * t + e * e);
                this.uniforms.delta.value.x = t / r, this.uniforms.delta.value.y = e / r
            }
        }, {"./TiltShiftAxisFilter": 110}], 113: [function (t, e, r) {
            function i() {
                n.call(this)
            }

            var n = t("./TiltShiftAxisFilter");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.updateDelta = function () {
                var t = this.uniforms.end.value.x - this.uniforms.start.value.x,
                    e = this.uniforms.end.value.y - this.uniforms.start.value.y, r = Math.sqrt(t * t + e * e);
                this.uniforms.delta.value.x = -e / r, this.uniforms.delta.value.y = t / r
            }
        }, {"./TiltShiftAxisFilter": 110}], 114: [function (t, e, r) {
            function i() {
                n.AbstractFilter.call(this, null, "precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\n\nvoid main(void)\n{\n   vec2 coord = vTextureCoord - offset;\n   float dist = length(coord);\n\n   if (dist < radius)\n   {\n       float ratio = (radius - dist) / radius;\n       float angleMod = ratio * ratio * angle;\n       float s = sin(angleMod);\n       float c = cos(angleMod);\n       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n   }\n\n   gl_FragColor = texture2D(uSampler, coord+offset);\n}\n", {
                    radius: {
                        type: "1f", value: .5
                    }, angle: {type: "1f", value: 5}, offset: {type: "v2", value: {x: .5, y: .5}}
                })
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.AbstractFilter.prototype)).constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                offset: {
                    get: function () {
                        return this.uniforms.offset.value
                    }, set: function (t) {
                        this.uniforms.offset.value = t
                    }
                }, radius: {
                    get: function () {
                        return this.uniforms.radius.value
                    }, set: function (t) {
                        this.uniforms.radius.value = t
                    }
                }, angle: {
                    get: function () {
                        return this.uniforms.angle.value
                    }, set: function (t) {
                        this.uniforms.angle.value = t
                    }
                }
            })
        }, {"../../core": 29}], 115: [function (t, e, r) {
            (function (r) {
                t("./polyfill");
                var i = e.exports = t("./core");
                i.extras = t("./extras"), i.filters = t("./filters"), i.interaction = t("./interaction"), i.loaders = t("./loaders"), i.mesh = t("./mesh"), i.accessibility = t("./accessibility"), i.loader = new i.loaders.Loader, Object.assign(i, t("./deprecation")), r.PIXI = i
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {
            "./accessibility": 21, "./core": 29, "./deprecation": 79, "./extras": 86, "./filters": 103,
            "./interaction": 118, "./loaders": 121, "./mesh": 128, "./polyfill": 133
        }], 116: [function (t, e, r) {
            function i() {
                this.global = new n.Point, this.target = null, this.originalEvent = null
            }

            var n = t("../core");
            i.prototype.constructor = i, e.exports = i, i.prototype.getLocalPosition = function (t, e, r) {
                return t.worldTransform.applyInverse(r || this.global, e)
            }
        }, {"../core": 29}], 117: [function (t, e, r) {
            function i(t, e) {
                e = e || {}, this.renderer = t, this.autoPreventDefault = void 0 === e.autoPreventDefault || e.autoPreventDefault, this.interactionFrequency = e.interactionFrequency || 10, this.mouse = new o, this.eventData = {
                    stopped: !1, target: null, type: null, data: this.mouse, stopPropagation: function () {
                        this.stopped = !0
                    }
                }, this.interactiveDataPool = [], this.interactionDOMElement = null, this.moveWhenInside = !1, this.eventsAdded = !1, this.onMouseUp = this.onMouseUp.bind(this), this.processMouseUp = this.processMouseUp.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.processMouseDown = this.processMouseDown.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.processMouseMove = this.processMouseMove.bind(this), this.onMouseOut = this.onMouseOut.bind(this), this.processMouseOverOut = this.processMouseOverOut.bind(this), this.onTouchStart = this.onTouchStart.bind(this), this.processTouchStart = this.processTouchStart.bind(this), this.onTouchEnd = this.onTouchEnd.bind(this), this.processTouchEnd = this.processTouchEnd.bind(this), this.onTouchMove = this.onTouchMove.bind(this), this.processTouchMove = this.processTouchMove.bind(this), this.last = 0, this.currentCursorStyle = "inherit", this._tempPoint = new n.Point, this.resolution = 1, this.setTargetElement(this.renderer.view, this.renderer.resolution)
            }

            var n = t("../core"), o = t("./InteractionData");
            Object.assign(n.DisplayObject.prototype, t("./interactiveTarget")), i.prototype.constructor = i, e.exports = i, i.prototype.setTargetElement = function (t, e) {
                this.removeEvents(), this.interactionDOMElement = t, this.resolution = e || 1, this.addEvents()
            }, i.prototype.addEvents = function () {
                this.interactionDOMElement && (n.ticker.shared.add(this.update, this), window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "none", this.interactionDOMElement.style["-ms-touch-action"] = "none"), window.document.addEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.addEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.addEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.addEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.addEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.addEventListener("touchmove", this.onTouchMove, !0), window.addEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !0)
            }, i.prototype.removeEvents = function () {
                this.interactionDOMElement && (n.ticker.shared.remove(this.update), window.navigator.msPointerEnabled && (this.interactionDOMElement.style["-ms-content-zooming"] = "", this.interactionDOMElement.style["-ms-touch-action"] = ""), window.document.removeEventListener("mousemove", this.onMouseMove, !0), this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0), this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0), this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0), this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0), this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0), this.interactionDOMElement = null, window.removeEventListener("mouseup", this.onMouseUp, !0), this.eventsAdded = !1)
            }, i.prototype.update = function (t) {
                this._deltaTime += t, this._deltaTime < this.interactionFrequency || (this._deltaTime = 0, this.interactionDOMElement && (this.didMove ? this.didMove = !1 : (this.cursor = "inherit", this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !0), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor))))
            }, i.prototype.dispatchEvent = function (t, e, r) {
                r.stopped || (r.target = t, r.type = e, t.emit(e, r), t[e] && t[e](r))
            }, i.prototype.mapPositionToPoint = function (t, e, r) {
                var i = this.interactionDOMElement.getBoundingClientRect();
                t.x = (e - i.left) * (this.interactionDOMElement.width / i.width) / this.resolution, t.y = (r - i.top) * (this.interactionDOMElement.height / i.height) / this.resolution
            }, i.prototype.processInteractive = function (t, e, r, i, n) {
                if (!e || !e.visible) return !1;
                var o = !1, s = n = e.interactive || n;
                if (e.hitArea && (s = !1), e.interactiveChildren) for (var a = e.children, l = a.length - 1; l >= 0; l--) {
                    var h = a[l];
                    if (this.processInteractive(t, h, r, i, s)) {
                        if (!h.parent) continue;
                        o = !0, s = !1, i = !1
                    }
                }
                return n && (i && !o && (e.hitArea ? (e.worldTransform.applyInverse(t, this._tempPoint), o = e.hitArea.contains(this._tempPoint.x, this._tempPoint.y)) : e.containsPoint && (o = e.containsPoint(t))), e.interactive && r(e, o)), o
            }, i.prototype.onMouseDown = function (t) {
                this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.autoPreventDefault && this.mouse.originalEvent.preventDefault(), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseDown, !0)
            }, i.prototype.processMouseDown = function (t, e) {
                var r = this.mouse.originalEvent, i = 2 === r.button || 3 === r.which;
                e && (t[i ? "_isRightDown" : "_isLeftDown"] = !0, this.dispatchEvent(t, i ? "rightdown" : "mousedown", this.eventData))
            }, i.prototype.onMouseUp = function (t) {
                this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseUp, !0)
            }, i.prototype.processMouseUp = function (t, e) {
                var r = this.mouse.originalEvent, i = 2 === r.button || 3 === r.which,
                    n = i ? "_isRightDown" : "_isLeftDown";
                e ? (this.dispatchEvent(t, i ? "rightup" : "mouseup", this.eventData), t[n] && (t[n] = !1, this.dispatchEvent(t, i ? "rightclick" : "click", this.eventData))) : t[n] && (t[n] = !1, this.dispatchEvent(t, i ? "rightupoutside" : "mouseupoutside", this.eventData))
            }, i.prototype.onMouseMove = function (t) {
                this.mouse.originalEvent = t, this.eventData.data = this.mouse, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.didMove = !0, this.cursor = "inherit", this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseMove, !0), this.currentCursorStyle !== this.cursor && (this.currentCursorStyle = this.cursor, this.interactionDOMElement.style.cursor = this.cursor)
            }, i.prototype.processMouseMove = function (t, e) {
                this.processMouseOverOut(t, e), this.moveWhenInside && !e || this.dispatchEvent(t, "mousemove", this.eventData)
            }, i.prototype.onMouseOut = function (t) {
                this.mouse.originalEvent = t, this.eventData.stopped = !1, this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.interactionDOMElement.style.cursor = "inherit", this.mapPositionToPoint(this.mouse.global, t.clientX, t.clientY), this.processInteractive(this.mouse.global, this.renderer._lastObjectRendered, this.processMouseOverOut, !1)
            }, i.prototype.processMouseOverOut = function (t, e) {
                e ? (t._over || (t._over = !0, this.dispatchEvent(t, "mouseover", this.eventData)), t.buttonMode && (this.cursor = t.defaultCursor)) : t._over && (t._over = !1, this.dispatchEvent(t, "mouseout", this.eventData))
            }, i.prototype.onTouchStart = function (t) {
                this.autoPreventDefault && t.preventDefault();
                for (var e = t.changedTouches, r = e.length, i = 0; i < r; i++) {
                    var n = e[i], o = this.getTouchData(n);
                    o.originalEvent = t, this.eventData.data = o, this.eventData.stopped = !1, this.processInteractive(o.global, this.renderer._lastObjectRendered, this.processTouchStart, !0), this.returnTouchData(o)
                }
            }, i.prototype.processTouchStart = function (t, e) {
                e && (t._touchDown = !0, this.dispatchEvent(t, "touchstart", this.eventData))
            }, i.prototype.onTouchEnd = function (t) {
                this.autoPreventDefault && t.preventDefault();
                for (var e = t.changedTouches, r = e.length, i = 0; i < r; i++) {
                    var n = e[i], o = this.getTouchData(n);
                    o.originalEvent = t, this.eventData.data = o, this.eventData.stopped = !1, this.processInteractive(o.global, this.renderer._lastObjectRendered, this.processTouchEnd, !0), this.returnTouchData(o)
                }
            }, i.prototype.processTouchEnd = function (t, e) {
                e ? (this.dispatchEvent(t, "touchend", this.eventData), t._touchDown && (t._touchDown = !1, this.dispatchEvent(t, "tap", this.eventData))) : t._touchDown && (t._touchDown = !1, this.dispatchEvent(t, "touchendoutside", this.eventData))
            }, i.prototype.onTouchMove = function (t) {
                this.autoPreventDefault && t.preventDefault();
                for (var e = t.changedTouches, r = e.length, i = 0; i < r; i++) {
                    var n = e[i], o = this.getTouchData(n);
                    o.originalEvent = t, this.eventData.data = o, this.eventData.stopped = !1, this.processInteractive(o.global, this.renderer._lastObjectRendered, this.processTouchMove, this.moveWhenInside), this.returnTouchData(o)
                }
            }, i.prototype.processTouchMove = function (t, e) {
                this.moveWhenInside && !e || this.dispatchEvent(t, "touchmove", this.eventData)
            }, i.prototype.getTouchData = function (t) {
                var e = this.interactiveDataPool.pop();
                return e || (e = new o), e.identifier = t.identifier, this.mapPositionToPoint(e.global, t.clientX, t.clientY), navigator.isCocoonJS && (e.global.x = e.global.x / this.resolution, e.global.y = e.global.y / this.resolution), t.globalX = e.global.x, t.globalY = e.global.y, e
            }, i.prototype.returnTouchData = function (t) {
                this.interactiveDataPool.push(t)
            }, i.prototype.destroy = function () {
                this.removeEvents(), this.renderer = null, this.mouse = null, this.eventData = null, this.interactiveDataPool = null, this.interactionDOMElement = null, this.onMouseUp = null, this.processMouseUp = null, this.onMouseDown = null, this.processMouseDown = null, this.onMouseMove = null, this.processMouseMove = null, this.onMouseOut = null, this.processMouseOverOut = null, this.onTouchStart = null, this.processTouchStart = null, this.onTouchEnd = null, this.processTouchEnd = null, this.onTouchMove = null, this.processTouchMove = null, this._tempPoint = null
            }, n.WebGLRenderer.registerPlugin("interaction", i), n.CanvasRenderer.registerPlugin("interaction", i)
        }, {"../core": 29, "./InteractionData": 116, "./interactiveTarget": 119}], 118: [function (t, e, r) {
            e.exports = {
                InteractionData: t("./InteractionData"), InteractionManager: t("./InteractionManager"),
                interactiveTarget: t("./interactiveTarget")
            }
        }, {"./InteractionData": 116, "./InteractionManager": 117, "./interactiveTarget": 119}],
        119: [function (t, e, r) {
            var i = {
                interactive: !1, buttonMode: !1, interactiveChildren: !0, defaultCursor: "pointer", _over: !1,
                _touchDown: !1
            };
            e.exports = i
        }, {}], 120: [function (t, e, r) {
            function i(t, e) {
                var r = {}, i = t.data.getElementsByTagName("info")[0], n = t.data.getElementsByTagName("common")[0];
                r.font = i.getAttribute("face"), r.size = parseInt(i.getAttribute("size"), 10), r.lineHeight = parseInt(n.getAttribute("lineHeight"), 10), r.chars = {};
                for (var a = t.data.getElementsByTagName("char"), l = 0; l < a.length; l++) {
                    var h = parseInt(a[l].getAttribute("id"), 10),
                        u = new o.Rectangle(parseInt(a[l].getAttribute("x"), 10) + e.frame.x, parseInt(a[l].getAttribute("y"), 10) + e.frame.y, parseInt(a[l].getAttribute("width"), 10), parseInt(a[l].getAttribute("height"), 10));
                    r.chars[h] = {
                        xOffset: parseInt(a[l].getAttribute("xoffset"), 10),
                        yOffset: parseInt(a[l].getAttribute("yoffset"), 10),
                        xAdvance: parseInt(a[l].getAttribute("xadvance"), 10), kerning: {},
                        texture: new o.Texture(e.baseTexture, u)
                    }
                }
                var c = t.data.getElementsByTagName("kerning");
                for (l = 0; l < c.length; l++) {
                    var p = parseInt(c[l].getAttribute("first"), 10), d = parseInt(c[l].getAttribute("second"), 10),
                        f = parseInt(c[l].getAttribute("amount"), 10);
                    r.chars[d] && (r.chars[d].kerning[p] = f)
                }
                t.bitmapFont = r, s.BitmapText.fonts[r.font] = r
            }

            var n = t("resource-loader").Resource, o = t("../core"), s = t("../extras"), a = t("path");
            e.exports = function () {
                return function (t, e) {
                    if (!t.data || !t.isXml) return e();
                    if (0 === t.data.getElementsByTagName("page").length || 0 === t.data.getElementsByTagName("info").length || null === t.data.getElementsByTagName("info")[0].getAttribute("face")) return e();
                    var r = a.dirname(t.url);
                    "." === r && (r = ""), this.baseUrl && r && ("/" === this.baseUrl.charAt(this.baseUrl.length - 1) && (r += "/"), r = r.replace(this.baseUrl, "")), r && "/" !== r.charAt(r.length - 1) && (r += "/");
                    var s = r + t.data.getElementsByTagName("page")[0].getAttribute("file");
                    if (o.utils.TextureCache[s]) i(t, o.utils.TextureCache[s]), e(); else {
                        var l = {
                            crossOrigin: t.crossOrigin, loadType: n.LOAD_TYPE.IMAGE, metadata: t.metadata.imageMetadata
                        };
                        this.add(t.name + "_image", s, l, function (r) {
                            i(t, r.texture), e()
                        })
                    }
                }
            }
        }, {"../core": 29, "../extras": 86, path: 2, "resource-loader": 16}], 121: [function (t, e, r) {
            e.exports = {
                Loader: t("./loader"), bitmapFontParser: t("./bitmapFontParser"),
                spritesheetParser: t("./spritesheetParser"), textureParser: t("./textureParser"),
                Resource: t("resource-loader").Resource
            }
        }, {
            "./bitmapFontParser": 120, "./loader": 122, "./spritesheetParser": 123, "./textureParser": 124,
            "resource-loader": 16
        }], 122: [function (t, e, r) {
            function i(t, e) {
                n.call(this, t, e);
                for (var r = 0; r < i._pixiMiddleware.length; ++r) this.use(i._pixiMiddleware[r]())
            }

            var n = t("resource-loader"), o = t("./textureParser"), s = t("./spritesheetParser"),
                a = t("./bitmapFontParser");
            i.prototype = Object.create(n.prototype), i.prototype.constructor = i, e.exports = i, i._pixiMiddleware = [n.middleware.parsing.blob, o, s, a], i.addPixiMiddleware = function (t) {
                i._pixiMiddleware.push(t)
            };
            var l = n.Resource;
            l.setExtensionXhrType("fnt", l.XHR_RESPONSE_TYPE.DOCUMENT)
        }, {"./bitmapFontParser": 120, "./spritesheetParser": 123, "./textureParser": 124, "resource-loader": 16}],
        123: [function (t, e, r) {
            var i = t("resource-loader").Resource, n = t("path"), o = t("../core"), s = t("async"), a = 1e3;
            e.exports = function () {
                return function (t, e) {
                    var r = t.name + "_image";
                    if (!t.data || !t.isJson || !t.data.frames || this.resources[r]) return e();
                    var l = {
                        crossOrigin: t.crossOrigin, loadType: i.LOAD_TYPE.IMAGE, metadata: t.metadata.imageMetadata
                    }, h = n.dirname(t.url.replace(this.baseUrl, ""));
                    this.add(r, h + "/" + t.data.meta.image, l, function (r) {
                        function i(e, i) {
                            for (var s = e; s - e < i && s < l.length;) {
                                var a = n[l[s]], u = a.frame;
                                if (u) {
                                    var c = null, p = null;
                                    if (c = a.rotated ? new o.Rectangle(u.x, u.y, u.h, u.w) : new o.Rectangle(u.x, u.y, u.w, u.h), a.trimmed && (p = new o.Rectangle(a.spriteSourceSize.x / h, a.spriteSourceSize.y / h, a.sourceSize.w / h, a.sourceSize.h / h)), a.rotated) {
                                        var d = c.width;
                                        c.width = c.height, c.height = d
                                    }
                                    c.x /= h, c.y /= h, c.width /= h, c.height /= h, t.textures[l[s]] = new o.Texture(r.texture.baseTexture, c, c.clone(), p, a.rotated), o.utils.TextureCache[l[s]] = t.textures[l[s]]
                                }
                                s++
                            }
                        }

                        t.textures = {};
                        var n = t.data.frames, l = Object.keys(n), h = o.utils.getResolutionOfUrl(t.url), u = 0;
                        l.length <= a ? (i(0, a), e()) : s.whilst(function () {
                            return u * a < l.length
                        }, function (t) {
                            i(u * a, a), u++, setTimeout(t, 0)
                        }, e)
                    })
                }
            }
        }, {"../core": 29, async: 1, path: 2, "resource-loader": 16}], 124: [function (t, e, r) {
            var i = t("../core");
            e.exports = function () {
                return function (t, e) {
                    if (t.data && t.isImage) {
                        var r = new i.BaseTexture(t.data, null, i.utils.getResolutionOfUrl(t.url));
                        r.imageUrl = t.url, t.texture = new i.Texture(r), i.utils.BaseTextureCache[t.url] = r, i.utils.TextureCache[t.url] = t.texture
                    }
                    e()
                }
            }
        }, {"../core": 29}], 125: [function (t, e, r) {
            function i(t, e, r, o, s) {
                n.Container.call(this), this._texture = null, this.uvs = r || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this.vertices = e || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]), this.indices = o || new Uint16Array([0, 1, 3, 2]), this.dirty = !0, this.blendMode = n.BLEND_MODES.NORMAL, this.canvasPadding = 0, this.drawMode = s || i.DRAW_MODES.TRIANGLE_MESH, this.texture = t, this.shader = null
            }

            var n = t("../core"), o = new n.Point, s = new n.Polygon;
            i.prototype = Object.create(n.Container.prototype), i.prototype.constructor = i, e.exports = i, Object.defineProperties(i.prototype, {
                texture: {
                    get: function () {
                        return this._texture
                    }, set: function (t) {
                        this._texture !== t && (this._texture = t, t && (t.baseTexture.hasLoaded ? this._onTextureUpdate() : t.once("update", this._onTextureUpdate, this)))
                    }
                }
            }), i.prototype._renderWebGL = function (t) {
                t.setObjectRenderer(t.plugins.mesh), t.plugins.mesh.render(this)
            }, i.prototype._renderCanvas = function (t) {
                var e = t.context, r = this.worldTransform, n = t.resolution;
                t.roundPixels ? e.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n | 0, r.ty * n | 0) : e.setTransform(r.a * n, r.b * n, r.c * n, r.d * n, r.tx * n, r.ty * n), this.drawMode === i.DRAW_MODES.TRIANGLE_MESH ? this._renderCanvasTriangleMesh(e) : this._renderCanvasTriangles(e)
            }, i.prototype._renderCanvasTriangleMesh = function (t) {
                for (var e = this.vertices, r = this.uvs, i = e.length / 2, n = 0; n < i - 2; n++) {
                    var o = 2 * n;
                    this._renderCanvasDrawTriangle(t, e, r, o, o + 2, o + 4)
                }
            }, i.prototype._renderCanvasTriangles = function (t) {
                for (var e = this.vertices, r = this.uvs, i = this.indices, n = i.length, o = 0; o < n; o += 3) {
                    var s = 2 * i[o], a = 2 * i[o + 1], l = 2 * i[o + 2];
                    this._renderCanvasDrawTriangle(t, e, r, s, a, l)
                }
            }, i.prototype._renderCanvasDrawTriangle = function (t, e, r, i, n, o) {
                var s = this._texture.baseTexture, a = s.source, l = s.width, h = s.height, u = e[i], c = e[n],
                    p = e[o], d = e[i + 1], f = e[n + 1], m = e[o + 1], g = r[i] * s.width, v = r[n] * s.width,
                    _ = r[o] * s.width, y = r[i + 1] * s.height, x = r[n + 1] * s.height, b = r[o + 1] * s.height;
                if (this.canvasPadding > 0) {
                    var T = this.canvasPadding / this.worldTransform.a, w = this.canvasPadding / this.worldTransform.d,
                        E = (u + c + p) / 3, S = (d + f + m) / 3, A = u - E, M = d - S, C = Math.sqrt(A * A + M * M);
                    u = E + A / C * (C + T), d = S + M / C * (C + w), M = f - S, c = E + (A = c - E) / (C = Math.sqrt(A * A + M * M)) * (C + T), f = S + M / C * (C + w), M = m - S, p = E + (A = p - E) / (C = Math.sqrt(A * A + M * M)) * (C + T), m = S + M / C * (C + w)
                }
                t.save(), t.beginPath(), t.moveTo(u, d), t.lineTo(c, f), t.lineTo(p, m), t.closePath(), t.clip();
                var R = g * x + y * _ + v * b - x * _ - y * v - g * b,
                    P = u * x + y * p + c * b - x * p - y * c - u * b,
                    O = g * c + u * _ + v * p - c * _ - u * v - g * p,
                    D = g * x * p + y * c * _ + u * v * b - u * x * _ - y * v * p - g * c * b,
                    I = d * x + y * m + f * b - x * m - y * f - d * b,
                    F = g * f + d * _ + v * m - f * _ - d * v - g * m,
                    L = g * x * m + y * f * _ + d * v * b - d * x * _ - y * v * m - g * f * b;
                t.transform(P / R, I / R, O / R, F / R, D / R, L / R), t.drawImage(a, 0, 0, l * s.resolution, h * s.resolution, 0, 0, l, h), t.restore()
            }, i.prototype.renderMeshFlat = function (t) {
                var e = this.context, r = t.vertices, i = r.length / 2;
                e.beginPath();
                for (var n = 1; n < i - 2; n++) {
                    var o = 2 * n, s = r[o], a = r[o + 2], l = r[o + 4], h = r[o + 1], u = r[o + 3], c = r[o + 5];
                    e.moveTo(s, h), e.lineTo(a, u), e.lineTo(l, c)
                }
                e.fillStyle = "#FF0000", e.fill(), e.closePath()
            }, i.prototype._onTextureUpdate = function () {
                this.updateFrame = !0
            }, i.prototype.getBounds = function (t) {
                if (!this._currentBounds) {
                    for (var e = t || this.worldTransform, r = e.a, i = e.b, o = e.c, s = e.d, a = e.tx, l = e.ty, h = -1 / 0, u = -1 / 0, c = 1 / 0, p = 1 / 0, d = this.vertices, f = 0, m = d.length; f < m; f += 2) {
                        var g = d[f], v = d[f + 1], _ = r * g + o * v + a, y = s * v + i * g + l;
                        c = _ < c ? _ : c, p = y < p ? y : p, h = _ > h ? _ : h, u = y > u ? y : u
                    }
                    if (c === -1 / 0 || u === 1 / 0) return n.Rectangle.EMPTY;
                    var x = this._bounds;
                    x.x = c, x.width = h - c, x.y = p, x.height = u - p, this._currentBounds = x
                }
                return this._currentBounds
            }, i.prototype.containsPoint = function (t) {
                if (!this.getBounds().contains(t.x, t.y)) return !1;
                this.worldTransform.applyInverse(t, o);
                var e, r, n = this.vertices, a = s.points;
                if (this.drawMode === i.DRAW_MODES.TRIANGLES) {
                    var l = this.indices;
                    for (r = this.indices.length, e = 0; e < r; e += 3) {
                        var h = 2 * l[e], u = 2 * l[e + 1], c = 2 * l[e + 2];
                        if (a[0] = n[h], a[1] = n[h + 1], a[2] = n[u], a[3] = n[u + 1], a[4] = n[c], a[5] = n[c + 1], s.contains(o.x, o.y)) return !0
                    }
                } else for (r = n.length, e = 0; e < r; e += 6) if (a[0] = n[e], a[1] = n[e + 1], a[2] = n[e + 2], a[3] = n[e + 3], a[4] = n[e + 4], a[5] = n[e + 5], s.contains(o.x, o.y)) return !0;
                return !1
            }, i.DRAW_MODES = {TRIANGLE_MESH: 0, TRIANGLES: 1}
        }, {"../core": 29}], 126: [function (t, e, r) {
            function i(t, e, r) {
                n.call(this, t), this._ready = !0, this.segmentsX = e || 10, this.segmentsY = r || 10, this.drawMode = n.DRAW_MODES.TRIANGLES, this.refresh()
            }

            var n = t("./Mesh");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.refresh = function () {
                var t = this.segmentsX * this.segmentsY, e = [], r = [], i = [], n = [], o = this.texture,
                    s = this.segmentsX - 1, a = this.segmentsY - 1, l = 0, h = o.width / s, u = o.height / a;
                for (l = 0; l < t; l++) {
                    var c = l % this.segmentsX, p = l / this.segmentsX | 0;
                    e.push(c * h, p * u), i.push(o._uvs.x0 + (o._uvs.x1 - o._uvs.x0) * (c / (this.segmentsX - 1)), o._uvs.y0 + (o._uvs.y3 - o._uvs.y0) * (p / (this.segmentsY - 1)))
                }
                var d = s * a;
                for (l = 0; l < d; l++) {
                    var f = l % s, m = l / s | 0, g = m * this.segmentsX + f, v = m * this.segmentsX + f + 1,
                        _ = (m + 1) * this.segmentsX + f, y = (m + 1) * this.segmentsX + f + 1;
                    n.push(g, v, _), n.push(v, y, _)
                }
                this.vertices = new Float32Array(e), this.uvs = new Float32Array(i), this.colors = new Float32Array(r), this.indices = new Uint16Array(n)
            }, i.prototype._onTextureUpdate = function () {
                n.prototype._onTextureUpdate.call(this), this._ready && this.refresh()
            }
        }, {"./Mesh": 125}], 127: [function (t, e, r) {
            function i(t, e) {
                n.call(this, t), this.points = e, this.vertices = new Float32Array(4 * e.length), this.uvs = new Float32Array(4 * e.length), this.colors = new Float32Array(2 * e.length), this.indices = new Uint16Array(2 * e.length), this._ready = !0, this.refresh()
            }

            var n = t("./Mesh"), o = t("../core");
            (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.refresh = function () {
                var t = this.points;
                if (!(t.length < 1) && this._texture._uvs) {
                    var e = this.uvs, r = this.indices, i = this.colors, n = this._texture._uvs,
                        s = new o.Point(n.x0, n.y0), a = new o.Point(n.x2 - n.x0, n.y2 - n.y0);
                    e[0] = 0 + s.x, e[1] = 0 + s.y, e[2] = 0 + s.x, e[3] = 1 * a.y + s.y, i[0] = 1, i[1] = 1, r[0] = 0, r[1] = 1;
                    for (var l, h, u = t.length, c = 1; c < u; c++) t[c], h = c / (u - 1), e[l = 4 * c] = h * a.x + s.x, e[l + 1] = 0 + s.y, e[l + 2] = h * a.x + s.x, e[l + 3] = 1 * a.y + s.y, i[l = 2 * c] = 1, i[l + 1] = 1, r[l = 2 * c] = l, r[l + 1] = l + 1;
                    this.dirty = !0
                }
            }, i.prototype._onTextureUpdate = function () {
                n.prototype._onTextureUpdate.call(this), this._ready && this.refresh()
            }, i.prototype.updateTransform = function () {
                var t = this.points;
                if (!(t.length < 1)) {
                    for (var e, r, i, n, o, s = t[0], a = 0, l = 0, h = this.vertices, u = t.length, c = 0; c < u; c++) r = t[c], i = 4 * c, l = -((e = c < t.length - 1 ? t[c + 1] : r).x - s.x), a = e.y - s.y, 10 * (1 - c / (u - 1)) > 1 && 1, a /= n = Math.sqrt(a * a + l * l), l /= n, a *= o = this._texture.height / 2, l *= o, h[i] = r.x + a, h[i + 1] = r.y + l, h[i + 2] = r.x - a, h[i + 3] = r.y - l, s = r;
                    this.containerUpdateTransform()
                }
            }
        }, {"../core": 29, "./Mesh": 125}], 128: [function (t, e, r) {
            e.exports = {
                Mesh: t("./Mesh"), Plane: t("./Plane"), Rope: t("./Rope"), MeshRenderer: t("./webgl/MeshRenderer"),
                MeshShader: t("./webgl/MeshShader")
            }
        }, {"./Mesh": 125, "./Plane": 126, "./Rope": 127, "./webgl/MeshRenderer": 129, "./webgl/MeshShader": 130}],
        129: [function (t, e, r) {
            function i(t) {
                n.ObjectRenderer.call(this, t), this.indices = new Uint16Array(15e3);
                for (var e = 0, r = 0; e < 15e3; e += 6, r += 4) this.indices[e + 0] = r + 0, this.indices[e + 1] = r + 1, this.indices[e + 2] = r + 2, this.indices[e + 3] = r + 0, this.indices[e + 4] = r + 2, this.indices[e + 5] = r + 3;
                this.currentShader = null
            }

            var n = t("../../core"), o = t("../Mesh");
            (i.prototype = Object.create(n.ObjectRenderer.prototype)).constructor = i, e.exports = i, n.WebGLRenderer.registerPlugin("mesh", i), i.prototype.onContextChange = function () {
            }, i.prototype.render = function (t) {
                t._vertexBuffer || this._initWebGL(t);
                var e = this.renderer, r = e.gl, i = t._texture.baseTexture, n = t.shader,
                    s = t.drawMode === o.DRAW_MODES.TRIANGLE_MESH ? r.TRIANGLE_STRIP : r.TRIANGLES;
                e.blendModeManager.setBlendMode(t.blendMode), n = n ? n.shaders[r.id] || n.getShader(e) : e.shaderManager.plugins.meshShader, this.renderer.shaderManager.setShader(n), n.uniforms.translationMatrix.value = t.worldTransform.toArray(!0), n.uniforms.projectionMatrix.value = e.currentRenderTarget.projectionMatrix.toArray(!0), n.uniforms.alpha.value = t.worldAlpha, n.syncUniforms(), t.dirty ? (t.dirty = !1, r.bindBuffer(r.ARRAY_BUFFER, t._vertexBuffer), r.bufferData(r.ARRAY_BUFFER, t.vertices, r.STATIC_DRAW), r.vertexAttribPointer(n.attributes.aVertexPosition, 2, r.FLOAT, !1, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, t._uvBuffer), r.bufferData(r.ARRAY_BUFFER, t.uvs, r.STATIC_DRAW), r.vertexAttribPointer(n.attributes.aTextureCoord, 2, r.FLOAT, !1, 0, 0), r.activeTexture(r.TEXTURE0), i._glTextures[r.id] ? r.bindTexture(r.TEXTURE_2D, i._glTextures[r.id]) : this.renderer.updateTexture(i), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, t._indexBuffer), r.bufferData(r.ELEMENT_ARRAY_BUFFER, t.indices, r.STATIC_DRAW)) : (r.bindBuffer(r.ARRAY_BUFFER, t._vertexBuffer), r.bufferSubData(r.ARRAY_BUFFER, 0, t.vertices), r.vertexAttribPointer(n.attributes.aVertexPosition, 2, r.FLOAT, !1, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, t._uvBuffer), r.vertexAttribPointer(n.attributes.aTextureCoord, 2, r.FLOAT, !1, 0, 0), r.activeTexture(r.TEXTURE0), i._glTextures[r.id] ? r.bindTexture(r.TEXTURE_2D, i._glTextures[r.id]) : this.renderer.updateTexture(i), r.bindBuffer(r.ELEMENT_ARRAY_BUFFER, t._indexBuffer), r.bufferSubData(r.ELEMENT_ARRAY_BUFFER, 0, t.indices)), r.drawElements(s, t.indices.length, r.UNSIGNED_SHORT, 0)
            }, i.prototype._initWebGL = function (t) {
                var e = this.renderer.gl;
                t._vertexBuffer = e.createBuffer(), t._indexBuffer = e.createBuffer(), t._uvBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, t._vertexBuffer), e.bufferData(e.ARRAY_BUFFER, t.vertices, e.DYNAMIC_DRAW), e.bindBuffer(e.ARRAY_BUFFER, t._uvBuffer), e.bufferData(e.ARRAY_BUFFER, t.uvs, e.STATIC_DRAW), t.colors && (t._colorBuffer = e.createBuffer(), e.bindBuffer(e.ARRAY_BUFFER, t._colorBuffer), e.bufferData(e.ARRAY_BUFFER, t.colors, e.STATIC_DRAW)), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, t._indexBuffer), e.bufferData(e.ELEMENT_ARRAY_BUFFER, t.indices, e.STATIC_DRAW)
            }, i.prototype.flush = function () {
            }, i.prototype.start = function () {
                this.currentShader = null
            }, i.prototype.destroy = function () {
                n.ObjectRenderer.prototype.destroy.call(this)
            }
        }, {"../../core": 29, "../Mesh": 125}], 130: [function (t, e, r) {
            function i(t) {
                n.Shader.call(this, t, ["precision lowp float;", "attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform mat3 projectionMatrix;", "varying vec2 vTextureCoord;", "void main(void){", "   gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"].join("\n"), ["precision lowp float;", "varying vec2 vTextureCoord;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void){", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * alpha ;", "}"].join("\n"), {
                    alpha: {
                        type: "1f", value: 0
                    }, translationMatrix: {type: "mat3", value: new Float32Array(9)},
                    projectionMatrix: {type: "mat3", value: new Float32Array(9)}
                }, {aVertexPosition: 0, aTextureCoord: 0})
            }

            var n = t("../../core");
            (i.prototype = Object.create(n.Shader.prototype)).constructor = i, e.exports = i, n.ShaderManager.registerPlugin("meshShader", i)
        }, {"../../core": 29}], 131: [function (t, e, r) {
            Math.sign || (Math.sign = function (t) {
                return 0 == (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1
            })
        }, {}], 132: [function (t, e, r) {
            Object.assign || (Object.assign = t("object-assign"))
        }, {"object-assign": 11}], 133: [function (t, e, r) {
            t("./Object.assign"), t("./requestAnimationFrame"), t("./Math.sign")
        }, {"./Math.sign": 131, "./Object.assign": 132, "./requestAnimationFrame": 134}], 134: [function (t, e, r) {
            (function (t) {
                if (Date.now && Date.prototype.getTime || (Date.now = function () {
                    return (new Date).getTime()
                }), !t.performance || !t.performance.now) {
                    var e = Date.now();
                    t.performance || (t.performance = {}), t.performance.now = function () {
                        return Date.now() - e
                    }
                }
                for (var r = Date.now(), i = ["ms", "moz", "webkit", "o"], n = 0; n < i.length && !t.requestAnimationFrame; ++n) t.requestAnimationFrame = t[i[n] + "RequestAnimationFrame"], t.cancelAnimationFrame = t[i[n] + "CancelAnimationFrame"] || t[i[n] + "CancelRequestAnimationFrame"];
                t.requestAnimationFrame || (t.requestAnimationFrame = function (t) {
                    if ("function" != typeof t) throw new TypeError(t + "is not a function");
                    var e = Date.now(), i = 16 + r - e;
                    return i < 0 && (i = 0), r = e, setTimeout(function () {
                        r = Date.now(), t(performance.now())
                    }, i)
                }), t.cancelAnimationFrame || (t.cancelAnimationFrame = function (t) {
                    clearTimeout(t)
                })
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
        }, {}]
    }, {}, [115])(115)
});
var __extends = this && this.__extends || function () {
    var t = Object.setPrototypeOf || {__proto__: []} instanceof Array && function (t, e) {
        t.__proto__ = e
    } || function (t, e) {
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r])
    };
    return function (e, r) {
        function i() {
            this.constructor = e
        }

        t(e, r), e.prototype = null === r ? Object.create(r) : (i.prototype = r.prototype, new i)
    }
}(), pixi_spine;
!function (t) {
    !function (t) {
        var e = function () {
            function t(t, e, r) {
                if (null == t) throw new Error("name cannot be null.");
                if (null == e) throw new Error("timelines cannot be null.");
                this.name = t, this.timelines = e, this.duration = r
            }

            return t.prototype.apply = function (t, e, r, i, n, o, s, a) {
                if (null == t) throw new Error("skeleton cannot be null.");
                i && 0 != this.duration && (r %= this.duration, e > 0 && (e %= this.duration));
                for (var l = this.timelines, h = 0, u = l.length; h < u; h++) l[h].apply(t, e, r, n, o, s, a)
            }, t.binarySearch = function (t, e, r) {
                void 0 === r && (r = 1);
                var i = 0, n = t.length / r - 2;
                if (0 == n) return r;
                for (var o = n >>> 1; ;) {
                    if (t[(o + 1) * r] <= e ? i = o + 1 : n = o, i == n) return (i + 1) * r;
                    o = i + n >>> 1
                }
            }, t.linearSearch = function (t, e, r) {
                for (var i = 0, n = t.length - r; i <= n; i += r) if (t[i] > e) return i;
                return -1
            }, t
        }();
        t.Animation = e;
        var r;
        !function (t) {
            t[t.rotate = 0] = "rotate", t[t.translate = 1] = "translate", t[t.scale = 2] = "scale", t[t.shear = 3] = "shear", t[t.attachment = 4] = "attachment", t[t.color = 5] = "color", t[t.deform = 6] = "deform", t[t.event = 7] = "event", t[t.drawOrder = 8] = "drawOrder", t[t.ikConstraint = 9] = "ikConstraint", t[t.transformConstraint = 10] = "transformConstraint", t[t.pathConstraintPosition = 11] = "pathConstraintPosition", t[t.pathConstraintSpacing = 12] = "pathConstraintSpacing", t[t.pathConstraintMix = 13] = "pathConstraintMix"
        }(r = t.TimelineType || (t.TimelineType = {}));
        var i = function () {
            function e(r) {
                if (r <= 0) throw new Error("frameCount must be > 0: " + r);
                this.curves = t.Utils.newFloatArray((r - 1) * e.BEZIER_SIZE)
            }

            return e.prototype.getFrameCount = function () {
                return this.curves.length / e.BEZIER_SIZE + 1
            }, e.prototype.setLinear = function (t) {
                this.curves[t * e.BEZIER_SIZE] = e.LINEAR
            }, e.prototype.setStepped = function (t) {
                this.curves[t * e.BEZIER_SIZE] = e.STEPPED
            }, e.prototype.getCurveType = function (t) {
                var r = t * e.BEZIER_SIZE;
                if (r == this.curves.length) return e.LINEAR;
                var i = this.curves[r];
                return i == e.LINEAR ? e.LINEAR : i == e.STEPPED ? e.STEPPED : e.BEZIER
            }, e.prototype.setCurve = function (t, r, i, n, o) {
                var s = .03 * (2 * -r + n), a = .03 * (2 * -i + o), l = .006 * (3 * (r - n) + 1),
                    h = .006 * (3 * (i - o) + 1), u = 2 * s + l, c = 2 * a + h, p = .3 * r + s + .16666667 * l,
                    d = .3 * i + a + .16666667 * h, f = t * e.BEZIER_SIZE, m = this.curves;
                m[f++] = e.BEZIER;
                for (var g = p, v = d, _ = f + e.BEZIER_SIZE - 1; f < _; f += 2) m[f] = g, m[f + 1] = v, p += u, d += c, u += l, c += h, g += p, v += d
            }, e.prototype.getCurvePercent = function (r, i) {
                i = t.MathUtils.clamp(i, 0, 1);
                var n = this.curves, o = r * e.BEZIER_SIZE, s = n[o];
                if (s == e.LINEAR) return i;
                if (s == e.STEPPED) return 0;
                for (var a = 0, l = ++o, h = o + e.BEZIER_SIZE - 1; o < h; o += 2) if ((a = n[o]) >= i) {
                    var u = void 0, c = void 0;
                    return o == l ? (u = 0, c = 0) : (u = n[o - 2], c = n[o - 1]), c + (n[o + 1] - c) * (i - u) / (a - u)
                }
                var p = n[o - 1];
                return p + (1 - p) * (i - a) / (1 - a)
            }, e
        }();
        i.LINEAR = 0, i.STEPPED = 1, i.BEZIER = 2, i.BEZIER_SIZE = 19, t.CurveTimeline = i;
        var n = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e << 1), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.rotate << 24) + this.boneIndex
            }, n.prototype.setFrame = function (t, e, r) {
                t <<= 1, this.frames[t] = e, this.frames[t + n.ROTATION] = r
            }, n.prototype.apply = function (t, r, i, o, s, a, l) {
                var h = this.frames, u = t.bones[this.boneIndex];
                if (i < h[0]) a && (u.rotation = u.data.rotation); else if (i >= h[h.length - n.ENTRIES]) if (a) u.rotation = u.data.rotation + h[h.length + n.PREV_ROTATION] * s; else {
                    var c = u.data.rotation + h[h.length + n.PREV_ROTATION] - u.rotation;
                    c -= 360 * (16384 - (16384.499999999996 - c / 360 | 0)), u.rotation += c * s
                } else {
                    var p = e.binarySearch(h, i, n.ENTRIES), d = h[p + n.PREV_ROTATION], f = h[p],
                        m = this.getCurvePercent((p >> 1) - 1, 1 - (i - f) / (h[p + n.PREV_TIME] - f)),
                        g = h[p + n.ROTATION] - d;
                    g = d + (g -= 360 * (16384 - (16384.499999999996 - g / 360 | 0))) * m, a ? (g -= 360 * (16384 - (16384.499999999996 - g / 360 | 0)), u.rotation = u.data.rotation + g * s) : (g = u.data.rotation + g - u.rotation, g -= 360 * (16384 - (16384.499999999996 - g / 360 | 0)), u.rotation += g * s)
                }
            }, n
        }(i);
        n.ENTRIES = 2, n.PREV_TIME = -2, n.PREV_ROTATION = -1, n.ROTATION = 1, t.RotateTimeline = n;
        var o = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e * n.ENTRIES), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.translate << 24) + this.boneIndex
            }, n.prototype.setFrame = function (t, e, r, i) {
                t *= n.ENTRIES, this.frames[t] = e, this.frames[t + n.X] = r, this.frames[t + n.Y] = i
            }, n.prototype.apply = function (t, r, i, o, s, a, l) {
                var h = this.frames, u = t.bones[this.boneIndex];
                if (i < h[0]) a && (u.x = u.data.x, u.y = u.data.y); else {
                    var c = 0, p = 0;
                    if (i >= h[h.length - n.ENTRIES]) c = h[h.length + n.PREV_X], p = h[h.length + n.PREV_Y]; else {
                        var d = e.binarySearch(h, i, n.ENTRIES);
                        c = h[d + n.PREV_X], p = h[d + n.PREV_Y];
                        var f = h[d],
                            m = this.getCurvePercent(d / n.ENTRIES - 1, 1 - (i - f) / (h[d + n.PREV_TIME] - f));
                        c += (h[d + n.X] - c) * m, p += (h[d + n.Y] - p) * m
                    }
                    a ? (u.x = u.data.x + c * s, u.y = u.data.y + p * s) : (u.x += (u.data.x + c - u.x) * s, u.y += (u.data.y + p - u.y) * s)
                }
            }, n
        }(i);
        o.ENTRIES = 3, o.PREV_TIME = -3, o.PREV_X = -2, o.PREV_Y = -1, o.X = 1, o.Y = 2, t.TranslateTimeline = o;
        var s = function (i) {
            function n(t) {
                return i.call(this, t) || this
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.scale << 24) + this.boneIndex
            }, n.prototype.apply = function (r, i, o, s, a, l, h) {
                var u = this.frames, c = r.bones[this.boneIndex];
                if (o < u[0]) l && (c.scaleX = c.data.scaleX, c.scaleY = c.data.scaleY); else {
                    var p = 0, d = 0;
                    if (o >= u[u.length - n.ENTRIES]) p = u[u.length + n.PREV_X] * c.data.scaleX, d = u[u.length + n.PREV_Y] * c.data.scaleY; else {
                        var f = e.binarySearch(u, o, n.ENTRIES);
                        p = u[f + n.PREV_X], d = u[f + n.PREV_Y];
                        var m = u[f],
                            g = this.getCurvePercent(f / n.ENTRIES - 1, 1 - (o - m) / (u[f + n.PREV_TIME] - m));
                        p = (p + (u[f + n.X] - p) * g) * c.data.scaleX, d = (d + (u[f + n.Y] - d) * g) * c.data.scaleY
                    }
                    if (1 == a) c.scaleX = p, c.scaleY = d; else {
                        var v = 0, _ = 0;
                        l ? (v = c.data.scaleX, _ = c.data.scaleY) : (v = c.scaleX, _ = c.scaleY), h ? (p = Math.abs(p) * t.MathUtils.signum(v), d = Math.abs(d) * t.MathUtils.signum(_)) : (v = Math.abs(v) * t.MathUtils.signum(p), _ = Math.abs(_) * t.MathUtils.signum(d)), c.scaleX = v + (p - v) * a, c.scaleY = _ + (d - _) * a
                    }
                }
            }, n
        }(o);
        t.ScaleTimeline = s;
        var a = function (t) {
            function i(e) {
                return t.call(this, e) || this
            }

            return __extends(i, t), i.prototype.getPropertyId = function () {
                return (r.shear << 24) + this.boneIndex
            }, i.prototype.apply = function (t, r, n, o, s, a, l) {
                var h = this.frames, u = t.bones[this.boneIndex];
                if (n < h[0]) a && (u.shearX = u.data.shearX, u.shearY = u.data.shearY); else {
                    var c = 0, p = 0;
                    if (n >= h[h.length - i.ENTRIES]) c = h[h.length + i.PREV_X], p = h[h.length + i.PREV_Y]; else {
                        var d = e.binarySearch(h, n, i.ENTRIES);
                        c = h[d + i.PREV_X], p = h[d + i.PREV_Y];
                        var f = h[d],
                            m = this.getCurvePercent(d / i.ENTRIES - 1, 1 - (n - f) / (h[d + i.PREV_TIME] - f));
                        c += (h[d + i.X] - c) * m, p += (h[d + i.Y] - p) * m
                    }
                    a ? (u.shearX = u.data.shearX + c * s, u.shearY = u.data.shearY + p * s) : (u.shearX += (u.data.shearX + c - u.shearX) * s, u.shearY += (u.data.shearY + p - u.shearY) * s)
                }
            }, i
        }(o);
        t.ShearTimeline = a;
        var l = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e * n.ENTRIES), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.color << 24) + this.slotIndex
            }, n.prototype.setFrame = function (t, e, r, i, o, s) {
                t *= n.ENTRIES, this.frames[t] = e, this.frames[t + n.R] = r, this.frames[t + n.G] = i, this.frames[t + n.B] = o, this.frames[t + n.A] = s
            }, n.prototype.apply = function (t, r, i, o, s, a, l) {
                var h = t.slots[this.slotIndex], u = this.frames;
                if (i < u[0]) a && h.color.setFromColor(h.data.color); else {
                    var c = 0, p = 0, d = 0, f = 0;
                    if (i >= u[u.length - n.ENTRIES]) {
                        var m = u.length;
                        c = u[m + n.PREV_R], p = u[m + n.PREV_G], d = u[m + n.PREV_B], f = u[m + n.PREV_A]
                    } else {
                        var g = e.binarySearch(u, i, n.ENTRIES);
                        c = u[g + n.PREV_R], p = u[g + n.PREV_G], d = u[g + n.PREV_B], f = u[g + n.PREV_A];
                        var v = u[g],
                            _ = this.getCurvePercent(g / n.ENTRIES - 1, 1 - (i - v) / (u[g + n.PREV_TIME] - v));
                        c += (u[g + n.R] - c) * _, p += (u[g + n.G] - p) * _, d += (u[g + n.B] - d) * _, f += (u[g + n.A] - f) * _
                    }
                    if (1 == s) h.color.set(c, p, d, f); else {
                        var y = h.color;
                        a && y.setFromColor(h.data.color), y.add((c - y.r) * s, (p - y.g) * s, (d - y.b) * s, (f - y.a) * s)
                    }
                }
            }, n
        }(i);
        l.ENTRIES = 5, l.PREV_TIME = -5, l.PREV_R = -4, l.PREV_G = -3, l.PREV_B = -2, l.PREV_A = -1, l.R = 1, l.G = 2, l.B = 3, l.A = 4, t.ColorTimeline = l;
        var h = function () {
            function i(e) {
                this.frames = t.Utils.newFloatArray(e), this.attachmentNames = new Array(e)
            }

            return i.prototype.getPropertyId = function () {
                return (r.attachment << 24) + this.slotIndex
            }, i.prototype.getFrameCount = function () {
                return this.frames.length
            }, i.prototype.setFrame = function (t, e, r) {
                this.frames[t] = e, this.attachmentNames[t] = r
            }, i.prototype.apply = function (t, r, i, n, o, s, a) {
                var l = t.slots[this.slotIndex];
                if (a && s) {
                    var h = l.data.attachmentName;
                    l.setAttachment(null == h ? null : t.getAttachment(this.slotIndex, h))
                } else {
                    var u = this.frames;
                    if (i < u[0]) {
                        if (s) {
                            var c = l.data.attachmentName;
                            l.setAttachment(null == c ? null : t.getAttachment(this.slotIndex, c))
                        }
                    } else {
                        var p = 0;
                        p = i >= u[u.length - 1] ? u.length - 1 : e.binarySearch(u, i, 1) - 1;
                        var d = this.attachmentNames[p];
                        t.slots[this.slotIndex].setAttachment(null == d ? null : t.getAttachment(this.slotIndex, d))
                    }
                }
            }, i
        }();
        t.AttachmentTimeline = h;
        var u = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e), r.frameVertices = new Array(e), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.deform << 24) + this.slotIndex
            }, n.prototype.setFrame = function (t, e, r) {
                this.frames[t] = e, this.frameVertices[t] = r
            }, n.prototype.apply = function (r, i, n, o, s, a, l) {
                var h = r.slots[this.slotIndex], u = h.getAttachment();
                if (u instanceof t.VertexAttachment && u.applyDeform(this.attachment)) {
                    var c = this.frames, p = h.attachmentVertices;
                    if (n < c[0]) a && t.Utils.setArraySize(p, 0); else {
                        var d = this.frameVertices, f = d[0].length;
                        p.length != f && (s = 1);
                        var m = t.Utils.setArraySize(p, f);
                        if (n >= c[c.length - 1]) {
                            var g = d[c.length - 1];
                            if (1 == s) t.Utils.arrayCopy(g, 0, m, 0, f); else if (a) if (null == (E = u).bones) for (var v = E.vertices, _ = 0; _ < f; _++) {
                                A = v[_];
                                m[_] = A + (g[_] - A) * s
                            } else for (_ = 0; _ < f; _++) m[_] = g[_] * s; else for (_ = 0; _ < f; _++) m[_] += (g[_] - m[_]) * s
                        } else {
                            var y = e.binarySearch(c, n), x = d[y - 1], b = d[y], T = c[y],
                                w = this.getCurvePercent(y - 1, 1 - (n - T) / (c[y - 1] - T));
                            if (1 == s) for (_ = 0; _ < f; _++) {
                                S = x[_];
                                m[_] = S + (b[_] - S) * w
                            } else if (a) {
                                var E = u;
                                if (null == E.bones) for (var v = E.vertices, _ = 0; _ < f; _++) {
                                    var S = x[_], A = v[_];
                                    m[_] = A + (S + (b[_] - S) * w - A) * s
                                } else for (_ = 0; _ < f; _++) {
                                    S = x[_];
                                    m[_] = (S + (b[_] - S) * w) * s
                                }
                            } else for (_ = 0; _ < f; _++) {
                                S = x[_];
                                m[_] += (S + (b[_] - S) * w - m[_]) * s
                            }
                        }
                    }
                }
            }, n
        }(i);
        t.DeformTimeline = u;
        var c = function () {
            function i(e) {
                this.frames = t.Utils.newFloatArray(e), this.events = new Array(e)
            }

            return i.prototype.getPropertyId = function () {
                return r.event << 24
            }, i.prototype.getFrameCount = function () {
                return this.frames.length
            }, i.prototype.setFrame = function (t, e) {
                this.frames[t] = e.time, this.events[t] = e
            }, i.prototype.apply = function (t, r, i, n, o, s, a) {
                if (null != n) {
                    var l = this.frames, h = this.frames.length;
                    if (r > i) this.apply(t, r, Number.MAX_VALUE, n, o, s, a), r = -1; else if (r >= l[h - 1]) return;
                    if (!(i < l[0])) {
                        var u = 0;
                        if (r < l[0]) u = 0; else for (var c = l[u = e.binarySearch(l, r)]; u > 0 && l[u - 1] == c;) u--;
                        for (; u < h && i >= l[u]; u++) n.push(this.events[u])
                    }
                }
            }, i
        }();
        t.EventTimeline = c;
        var p = function () {
            function i(e) {
                this.frames = t.Utils.newFloatArray(e), this.drawOrders = new Array(e)
            }

            return i.prototype.getPropertyId = function () {
                return r.drawOrder << 24
            }, i.prototype.getFrameCount = function () {
                return this.frames.length
            }, i.prototype.setFrame = function (t, e, r) {
                this.frames[t] = e, this.drawOrders[t] = r
            }, i.prototype.apply = function (r, i, n, o, s, a, l) {
                var h = r.drawOrder, u = r.slots;
                if (l && a) t.Utils.arrayCopy(r.slots, 0, r.drawOrder, 0, r.slots.length); else {
                    var c = this.frames;
                    if (n < c[0]) a && t.Utils.arrayCopy(r.slots, 0, r.drawOrder, 0, r.slots.length); else {
                        var p = 0;
                        p = n >= c[c.length - 1] ? c.length - 1 : e.binarySearch(c, n) - 1;
                        var d = this.drawOrders[p];
                        if (null == d) t.Utils.arrayCopy(u, 0, h, 0, u.length); else for (var f = 0, m = d.length; f < m; f++) h[f] = u[d[f]]
                    }
                }
            }, i
        }();
        t.DrawOrderTimeline = p;
        var d = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e * n.ENTRIES), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.ikConstraint << 24) + this.ikConstraintIndex
            }, n.prototype.setFrame = function (t, e, r, i) {
                t *= n.ENTRIES, this.frames[t] = e, this.frames[t + n.MIX] = r, this.frames[t + n.BEND_DIRECTION] = i
            }, n.prototype.apply = function (t, r, i, o, s, a, l) {
                var h = this.frames, u = t.ikConstraints[this.ikConstraintIndex];
                if (i < h[0]) a && (u.mix = u.data.mix, u.bendDirection = u.data.bendDirection); else if (i >= h[h.length - n.ENTRIES]) a ? (u.mix = u.data.mix + (h[h.length + n.PREV_MIX] - u.data.mix) * s, u.bendDirection = l ? u.data.bendDirection : h[h.length + n.PREV_BEND_DIRECTION]) : (u.mix += (h[h.length + n.PREV_MIX] - u.mix) * s, l || (u.bendDirection = h[h.length + n.PREV_BEND_DIRECTION])); else {
                    var c = e.binarySearch(h, i, n.ENTRIES), p = h[c + n.PREV_MIX], d = h[c],
                        f = this.getCurvePercent(c / n.ENTRIES - 1, 1 - (i - d) / (h[c + n.PREV_TIME] - d));
                    a ? (u.mix = u.data.mix + (p + (h[c + n.MIX] - p) * f - u.data.mix) * s, u.bendDirection = l ? u.data.bendDirection : h[c + n.PREV_BEND_DIRECTION]) : (u.mix += (p + (h[c + n.MIX] - p) * f - u.mix) * s, l || (u.bendDirection = h[c + n.PREV_BEND_DIRECTION]))
                }
            }, n
        }(i);
        d.ENTRIES = 3, d.PREV_TIME = -3, d.PREV_MIX = -2, d.PREV_BEND_DIRECTION = -1, d.MIX = 1, d.BEND_DIRECTION = 2, t.IkConstraintTimeline = d;
        var f = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e * n.ENTRIES), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.transformConstraint << 24) + this.transformConstraintIndex
            }, n.prototype.setFrame = function (t, e, r, i, o, s) {
                t *= n.ENTRIES, this.frames[t] = e, this.frames[t + n.ROTATE] = r, this.frames[t + n.TRANSLATE] = i, this.frames[t + n.SCALE] = o, this.frames[t + n.SHEAR] = s
            }, n.prototype.apply = function (t, r, i, o, s, a, l) {
                var h = this.frames, u = t.transformConstraints[this.transformConstraintIndex];
                if (i < h[0]) {
                    if (a) {
                        y = u.data;
                        u.rotateMix = y.rotateMix, u.translateMix = y.rotateMix, u.scaleMix = y.scaleMix, u.shearMix = y.shearMix
                    }
                } else {
                    var c = 0, p = 0, d = 0, f = 0;
                    if (i >= h[h.length - n.ENTRIES]) {
                        var m = h.length;
                        c = h[m + n.PREV_ROTATE], p = h[m + n.PREV_TRANSLATE], d = h[m + n.PREV_SCALE], f = h[m + n.PREV_SHEAR]
                    } else {
                        var g = e.binarySearch(h, i, n.ENTRIES);
                        c = h[g + n.PREV_ROTATE], p = h[g + n.PREV_TRANSLATE], d = h[g + n.PREV_SCALE], f = h[g + n.PREV_SHEAR];
                        var v = h[g],
                            _ = this.getCurvePercent(g / n.ENTRIES - 1, 1 - (i - v) / (h[g + n.PREV_TIME] - v));
                        c += (h[g + n.ROTATE] - c) * _, p += (h[g + n.TRANSLATE] - p) * _, d += (h[g + n.SCALE] - d) * _, f += (h[g + n.SHEAR] - f) * _
                    }
                    if (a) {
                        var y = u.data;
                        u.rotateMix = y.rotateMix + (c - y.rotateMix) * s, u.translateMix = y.translateMix + (p - y.translateMix) * s, u.scaleMix = y.scaleMix + (d - y.scaleMix) * s, u.shearMix = y.shearMix + (f - y.shearMix) * s
                    } else u.rotateMix += (c - u.rotateMix) * s, u.translateMix += (p - u.translateMix) * s, u.scaleMix += (d - u.scaleMix) * s, u.shearMix += (f - u.shearMix) * s
                }
            }, n
        }(i);
        f.ENTRIES = 5, f.PREV_TIME = -5, f.PREV_ROTATE = -4, f.PREV_TRANSLATE = -3, f.PREV_SCALE = -2, f.PREV_SHEAR = -1, f.ROTATE = 1, f.TRANSLATE = 2, f.SCALE = 3, f.SHEAR = 4, t.TransformConstraintTimeline = f;
        var m = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e * n.ENTRIES), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.pathConstraintPosition << 24) + this.pathConstraintIndex
            }, n.prototype.setFrame = function (t, e, r) {
                t *= n.ENTRIES, this.frames[t] = e, this.frames[t + n.VALUE] = r
            }, n.prototype.apply = function (t, r, i, o, s, a, l) {
                var h = this.frames, u = t.pathConstraints[this.pathConstraintIndex];
                if (i < h[0]) a && (u.position = u.data.position); else {
                    var c = 0;
                    if (i >= h[h.length - n.ENTRIES]) c = h[h.length + n.PREV_VALUE]; else {
                        var p = e.binarySearch(h, i, n.ENTRIES);
                        c = h[p + n.PREV_VALUE];
                        var d = h[p],
                            f = this.getCurvePercent(p / n.ENTRIES - 1, 1 - (i - d) / (h[p + n.PREV_TIME] - d));
                        c += (h[p + n.VALUE] - c) * f
                    }
                    a ? u.position = u.data.position + (c - u.data.position) * s : u.position += (c - u.position) * s
                }
            }, n
        }(i);
        m.ENTRIES = 2, m.PREV_TIME = -2, m.PREV_VALUE = -1, m.VALUE = 1, t.PathConstraintPositionTimeline = m;
        var g = function (t) {
            function i(e) {
                return t.call(this, e) || this
            }

            return __extends(i, t), i.prototype.getPropertyId = function () {
                return (r.pathConstraintSpacing << 24) + this.pathConstraintIndex
            }, i.prototype.apply = function (t, r, n, o, s, a, l) {
                var h = this.frames, u = t.pathConstraints[this.pathConstraintIndex];
                if (n < h[0]) a && (u.spacing = u.data.spacing); else {
                    var c = 0;
                    if (n >= h[h.length - i.ENTRIES]) c = h[h.length + i.PREV_VALUE]; else {
                        var p = e.binarySearch(h, n, i.ENTRIES);
                        c = h[p + i.PREV_VALUE];
                        var d = h[p],
                            f = this.getCurvePercent(p / i.ENTRIES - 1, 1 - (n - d) / (h[p + i.PREV_TIME] - d));
                        c += (h[p + i.VALUE] - c) * f
                    }
                    a ? u.spacing = u.data.spacing + (c - u.data.spacing) * s : u.spacing += (c - u.spacing) * s
                }
            }, i
        }(m);
        t.PathConstraintSpacingTimeline = g;
        var v = function (i) {
            function n(e) {
                var r = i.call(this, e) || this;
                return r.frames = t.Utils.newFloatArray(e * n.ENTRIES), r
            }

            return __extends(n, i), n.prototype.getPropertyId = function () {
                return (r.pathConstraintMix << 24) + this.pathConstraintIndex
            }, n.prototype.setFrame = function (t, e, r, i) {
                t *= n.ENTRIES, this.frames[t] = e, this.frames[t + n.ROTATE] = r, this.frames[t + n.TRANSLATE] = i
            }, n.prototype.apply = function (t, r, i, o, s, a, l) {
                var h = this.frames, u = t.pathConstraints[this.pathConstraintIndex];
                if (i < h[0]) a && (u.rotateMix = u.data.rotateMix, u.translateMix = u.data.translateMix); else {
                    var c = 0, p = 0;
                    if (i >= h[h.length - n.ENTRIES]) c = h[h.length + n.PREV_ROTATE], p = h[h.length + n.PREV_TRANSLATE]; else {
                        var d = e.binarySearch(h, i, n.ENTRIES);
                        c = h[d + n.PREV_ROTATE], p = h[d + n.PREV_TRANSLATE];
                        var f = h[d],
                            m = this.getCurvePercent(d / n.ENTRIES - 1, 1 - (i - f) / (h[d + n.PREV_TIME] - f));
                        c += (h[d + n.ROTATE] - c) * m, p += (h[d + n.TRANSLATE] - p) * m
                    }
                    a ? (u.rotateMix = u.data.rotateMix + (c - u.data.rotateMix) * s, u.translateMix = u.data.translateMix + (p - u.data.translateMix) * s) : (u.rotateMix += (c - u.rotateMix) * s, u.translateMix += (p - u.translateMix) * s)
                }
            }, n
        }(i);
        v.ENTRIES = 3, v.PREV_TIME = -3, v.PREV_ROTATE = -2, v.PREV_TRANSLATE = -1, v.ROTATE = 1, v.TRANSLATE = 2, t.PathConstraintMixTimeline = v
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(e) {
                this.tracks = new Array, this.events = new Array, this.listeners = new Array, this.queue = new i(this), this.propertyIDs = new t.IntSet, this.animationsChanged = !1, this.timeScale = 1, this.trackEntryPool = new t.Pool(function () {
                    return new r
                }), this.data = e
            }

            return e.prototype.update = function (t) {
                t *= this.timeScale;
                for (var e = this.tracks, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (null != n) {
                        n.animationLast = n.nextAnimationLast, n.trackLast = n.nextTrackLast;
                        var o = t * n.timeScale;
                        if (n.delay > 0) {
                            if (n.delay -= o, n.delay > 0) continue;
                            o = -n.delay, n.delay = 0
                        }
                        var s = n.next;
                        if (null != s) {
                            var a = n.trackLast - s.delay;
                            if (a >= 0) {
                                for (s.delay = 0, s.trackTime = a + t * s.timeScale, n.trackTime += o, this.setCurrent(r, s, !0); null != s.mixingFrom;) s.mixTime += o, s = s.mixingFrom;
                                continue
                            }
                        } else if (n.trackLast >= n.trackEnd && null == n.mixingFrom) {
                            e[r] = null, this.queue.end(n), this.disposeNext(n);
                            continue
                        }
                        this.updateMixingFrom(n, t), n.trackTime += o
                    }
                }
                this.queue.drain()
            }, e.prototype.updateMixingFrom = function (t, e) {
                var r = t.mixingFrom;
                if (null != r) {
                    if (this.updateMixingFrom(r, e), t.mixTime >= t.mixDuration && null != r.mixingFrom && t.mixTime > 0) return t.mixingFrom = null, void this.queue.end(r);
                    r.animationLast = r.nextAnimationLast, r.trackLast = r.nextTrackLast, r.trackTime += e * r.timeScale, t.mixTime += e * r.timeScale
                }
            }, e.prototype.apply = function (e) {
                if (null == e) throw new Error("skeleton cannot be null.");
                this.animationsChanged && this._animationsChanged();
                for (var r = this.events, i = this.tracks, n = 0, o = i.length; n < o; n++) {
                    var s = i[n];
                    if (!(null == s || s.delay > 0)) {
                        var a = s.alpha;
                        null != s.mixingFrom ? a *= this.applyMixingFrom(s, e) : s.trackTime >= s.trackEnd && (a = 0);
                        var l = s.animationLast, h = s.getAnimationTime(), u = s.animation.timelines.length,
                            c = s.animation.timelines;
                        if (1 == a) for (m = 0; m < u; m++) c[m].apply(e, l, h, r, 1, !0, !1); else {
                            var p = 0 == s.timelinesRotation.length;
                            p && t.Utils.setArraySize(s.timelinesRotation, u << 1, null);
                            for (var d = s.timelinesRotation, f = s.timelinesFirst, m = 0; m < u; m++) {
                                var g = c[m];
                                g instanceof t.RotateTimeline ? this.applyRotateTimeline(g, e, h, a, f[m], d, m << 1, p) : g.apply(e, l, h, r, a, f[m], !1)
                            }
                        }
                        this.queueEvents(s, h), r.length = 0, s.nextAnimationLast = h, s.nextTrackLast = s.trackTime
                    }
                }
                this.queue.drain()
            }, e.prototype.applyMixingFrom = function (e, r) {
                var i = e.mixingFrom;
                null != i.mixingFrom && this.applyMixingFrom(i, r);
                var n = 0;
                0 == e.mixDuration ? n = 1 : (n = e.mixTime / e.mixDuration) > 1 && (n = 1);
                var o = n < i.eventThreshold ? this.events : null, s = n < i.attachmentThreshold,
                    a = n < i.drawOrderThreshold, l = i.animationLast, h = i.getAnimationTime(),
                    u = i.animation.timelines.length, c = i.animation.timelines, p = i.timelinesFirst,
                    d = i.alpha * e.mixAlpha * (1 - n), f = 0 == i.timelinesRotation.length;
                f && t.Utils.setArraySize(i.timelinesRotation, u << 1, null);
                for (var m = i.timelinesRotation, g = 0; g < u; g++) {
                    var v = c[g], _ = p[g];
                    if (v instanceof t.RotateTimeline) this.applyRotateTimeline(v, r, h, d, _, m, g << 1, f); else {
                        if (!_) {
                            if (!s && v instanceof t.AttachmentTimeline) continue;
                            if (!a && v instanceof t.DrawOrderTimeline) continue
                        }
                        v.apply(r, l, h, o, d, _, !0)
                    }
                }
                return e.mixDuration > 0 && this.queueEvents(i, h), this.events.length = 0, i.nextAnimationLast = h, i.nextTrackLast = i.trackTime, n
            }, e.prototype.applyRotateTimeline = function (e, r, i, n, o, s, a, l) {
                if (l && (s[a] = 0), 1 != n) {
                    var h = e, u = h.frames, c = r.bones[h.boneIndex];
                    if (i < u[0]) o && (c.rotation = c.data.rotation); else {
                        var p = 0;
                        if (i >= u[u.length - t.RotateTimeline.ENTRIES]) p = c.data.rotation + u[u.length + t.RotateTimeline.PREV_ROTATION]; else {
                            var d = t.Animation.binarySearch(u, i, t.RotateTimeline.ENTRIES),
                                f = u[d + t.RotateTimeline.PREV_ROTATION], m = u[d],
                                g = h.getCurvePercent((d >> 1) - 1, 1 - (i - m) / (u[d + t.RotateTimeline.PREV_TIME] - m));
                            p = u[d + t.RotateTimeline.ROTATION] - f, p = f + (p -= 360 * (16384 - (16384.499999999996 - p / 360 | 0))) * g + c.data.rotation, p -= 360 * (16384 - (16384.499999999996 - p / 360 | 0))
                        }
                        var v = o ? c.data.rotation : c.rotation, _ = 0, y = p - v;
                        if (0 == y) _ = s[a]; else {
                            y -= 360 * (16384 - (16384.499999999996 - y / 360 | 0));
                            var x = 0, b = 0;
                            l ? (x = 0, b = y) : (x = s[a], b = s[a + 1]);
                            var T = y > 0, w = x >= 0;
                            t.MathUtils.signum(b) != t.MathUtils.signum(y) && Math.abs(b) <= 90 && (Math.abs(x) > 180 && (x += 360 * t.MathUtils.signum(x)), w = T), _ = y + x - x % 360, w != T && (_ += 360 * t.MathUtils.signum(x)), s[a] = _
                        }
                        s[a + 1] = y, v += _ * n, c.rotation = v - 360 * (16384 - (16384.499999999996 - v / 360 | 0))
                    }
                } else e.apply(r, 0, i, null, 1, o, !1)
            }, e.prototype.queueEvents = function (t, e) {
                for (var r = t.animationStart, i = t.animationEnd, n = i - r, o = t.trackLast % n, s = this.events, a = 0, l = s.length; a < l; a++) {
                    var h = s[a];
                    if (h.time < o) break;
                    h.time > i || this.queue.event(t, h)
                }
                for ((t.loop ? o > t.trackTime % n : e >= i && t.animationLast < i) && this.queue.complete(t); a < l; a++) s[a].time < r || this.queue.event(t, s[a])
            }, e.prototype.clearTracks = function () {
                var t = this.queue.drainDisabled;
                this.queue.drainDisabled = !0;
                for (var e = 0, r = this.tracks.length; e < r; e++) this.clearTrack(e);
                this.tracks.length = 0, this.queue.drainDisabled = t, this.queue.drain()
            }, e.prototype.clearTrack = function (t) {
                if (!(t >= this.tracks.length)) {
                    var e = this.tracks[t];
                    if (null != e) {
                        this.queue.end(e), this.disposeNext(e);
                        for (var r = e; ;) {
                            var i = r.mixingFrom;
                            if (null == i) break;
                            this.queue.end(i), r.mixingFrom = null, r = i
                        }
                        this.tracks[e.trackIndex] = null, this.queue.drain()
                    }
                }
            }, e.prototype.setCurrent = function (t, e, r) {
                var i = this.expandToIndex(t);
                this.tracks[t] = e, null != i && (r && this.queue.interrupt(i), e.mixingFrom = i, e.mixTime = 0, i.timelinesRotation.length = 0, null != i.mixingFrom && i.mixDuration > 0 && (e.mixAlpha *= Math.min(i.mixTime / i.mixDuration, 1))), this.queue.start(e)
            }, e.prototype.setAnimation = function (t, e, r) {
                var i = this.data.skeletonData.findAnimation(e);
                if (null == i) throw new Error("Animation not found: " + e);
                return this.setAnimationWith(t, i, r)
            }, e.prototype.setAnimationWith = function (t, e, r) {
                if (null == e) throw new Error("animation cannot be null.");
                var i = !0, n = this.expandToIndex(t);
                null != n && (-1 == n.nextTrackLast ? (this.tracks[t] = n.mixingFrom, this.queue.interrupt(n), this.queue.end(n), this.disposeNext(n), n = n.mixingFrom, i = !1) : this.disposeNext(n));
                var o = this.trackEntry(t, e, r, n);
                return this.setCurrent(t, o, i), this.queue.drain(), o
            }, e.prototype.addAnimation = function (t, e, r, i) {
                var n = this.data.skeletonData.findAnimation(e);
                if (null == n) throw new Error("Animation not found: " + e);
                return this.addAnimationWith(t, n, r, i)
            }, e.prototype.addAnimationWith = function (t, e, r, i) {
                if (null == e) throw new Error("animation cannot be null.");
                var n = this.expandToIndex(t);
                if (null != n) for (; null != n.next;) n = n.next;
                var o = this.trackEntry(t, e, r, n);
                if (null == n) this.setCurrent(t, o, !0), this.queue.drain(); else if (n.next = o, i <= 0) {
                    var s = n.animationEnd - n.animationStart;
                    0 != s ? i += s * (1 + (n.trackTime / s | 0)) - this.data.getMix(n.animation, e) : i = 0
                }
                return o.delay = i, o
            }, e.prototype.setEmptyAnimation = function (t, r) {
                var i = this.setAnimationWith(t, e.emptyAnimation, !1);
                return i.mixDuration = r, i.trackEnd = r, i
            }, e.prototype.addEmptyAnimation = function (t, r, i) {
                i <= 0 && (i -= r);
                var n = this.addAnimationWith(t, e.emptyAnimation, !1, i);
                return n.mixDuration = r, n.trackEnd = r, n
            }, e.prototype.setEmptyAnimations = function (t) {
                var e = this.queue.drainDisabled;
                this.queue.drainDisabled = !0;
                for (var r = 0, i = this.tracks.length; r < i; r++) {
                    var n = this.tracks[r];
                    null != n && this.setEmptyAnimation(n.trackIndex, t)
                }
                this.queue.drainDisabled = e, this.queue.drain()
            }, e.prototype.expandToIndex = function (e) {
                return e < this.tracks.length ? this.tracks[e] : (t.Utils.ensureArrayCapacity(this.tracks, e - this.tracks.length + 1, null), this.tracks.length = e + 1, null)
            }, e.prototype.trackEntry = function (t, e, r, i) {
                var n = this.trackEntryPool.obtain();
                return n.trackIndex = t, n.animation = e, n.loop = r, n.eventThreshold = 0, n.attachmentThreshold = 0, n.drawOrderThreshold = 0, n.animationStart = 0, n.animationEnd = e.duration, n.animationLast = -1, n.nextAnimationLast = -1, n.delay = 0, n.trackTime = 0, n.trackLast = -1, n.nextTrackLast = -1, n.trackEnd = Number.MAX_VALUE, n.timeScale = 1, n.alpha = 1, n.mixAlpha = 1, n.mixTime = 0, n.mixDuration = null == i ? 0 : this.data.getMix(i.animation, e), n
            }, e.prototype.disposeNext = function (t) {
                for (var e = t.next; null != e;) this.queue.dispose(e), e = e.next;
                t.next = null
            }, e.prototype._animationsChanged = function () {
                this.animationsChanged = !1;
                var t = this.propertyIDs, e = 0, r = this.tracks.length;
                for (t.clear(); e < r; e++) if (null != (i = this.tracks[e])) {
                    this.setTimelinesFirst(i), e++;
                    break
                }
                for (; e < r; e++) {
                    var i = this.tracks[e];
                    null != i && this.checkTimelinesFirst(i)
                }
            }, e.prototype.setTimelinesFirst = function (e) {
                if (null != e.mixingFrom) return this.setTimelinesFirst(e.mixingFrom), void this.checkTimelinesUsage(e, e.timelinesFirst);
                for (var r = this.propertyIDs, i = e.animation.timelines, n = i.length, o = t.Utils.setArraySize(e.timelinesFirst, n, !1), s = 0; s < n; s++) r.add(i[s].getPropertyId()), o[s] = !0
            }, e.prototype.checkTimelinesFirst = function (t) {
                null != t.mixingFrom && this.checkTimelinesFirst(t.mixingFrom), this.checkTimelinesUsage(t, t.timelinesFirst)
            }, e.prototype.checkTimelinesUsage = function (e, r) {
                for (var i = this.propertyIDs, n = e.animation.timelines, o = n.length, s = t.Utils.setArraySize(r, o), a = 0; a < o; a++) s[a] = i.add(n[a].getPropertyId())
            }, e.prototype.getCurrent = function (t) {
                return t >= this.tracks.length ? null : this.tracks[t]
            }, e.prototype.addListener = function (t) {
                if (null == t) throw new Error("listener cannot be null.");
                this.listeners.push(t)
            }, e.prototype.removeListener = function (t) {
                var e = this.listeners.indexOf(t);
                e >= 0 && this.listeners.splice(e, 1)
            }, e.prototype.clearListeners = function () {
                this.listeners.length = 0
            }, e.prototype.clearListenerNotifications = function () {
                this.queue.clear()
            }, e.prototype.setAnimationByName = function (t, r, i) {
                e.deprecatedWarning1 || (e.deprecatedWarning1 = !0, console.warn("Deprecation Warning: AnimationState.setAnimationByName is deprecated, please use setAnimation from now on.")), this.setAnimation(t, r, i)
            }, e.prototype.addAnimationByName = function (t, r, i, n) {
                e.deprecatedWarning2 || (e.deprecatedWarning2 = !0, console.warn("Deprecation Warning: AnimationState.addAnimationByName is deprecated, please use addAnimation from now on.")), this.addAnimation(t, r, i, n)
            }, e.prototype.hasAnimation = function (t) {
                return null !== this.data.skeletonData.findAnimation(t)
            }, e.prototype.hasAnimationByName = function (t) {
                return e.deprecatedWarning3 || (e.deprecatedWarning3 = !0, console.warn("Deprecation Warning: AnimationState.hasAnimationByName is deprecated, please use hasAnimation from now on.")), this.hasAnimation(t)
            }, e
        }();
        e.emptyAnimation = new t.Animation("<empty>", [], 0), e.deprecatedWarning1 = !1, e.deprecatedWarning2 = !1, e.deprecatedWarning3 = !1, t.AnimationState = e;
        var r = function () {
            function t() {
                this.timelinesFirst = new Array, this.timelinesRotation = new Array
            }

            return t.prototype.reset = function () {
                this.next = null, this.mixingFrom = null, this.animation = null, this.listener = null, this.timelinesFirst.length = 0, this.timelinesRotation.length = 0
            }, t.prototype.getAnimationTime = function () {
                if (this.loop) {
                    var t = this.animationEnd - this.animationStart;
                    return 0 == t ? this.animationStart : this.trackTime % t + this.animationStart
                }
                return Math.min(this.trackTime + this.animationStart, this.animationEnd)
            }, t.prototype.setAnimationLast = function (t) {
                this.animationLast = t, this.nextAnimationLast = t
            }, t.prototype.isComplete = function () {
                return this.trackTime >= this.animationEnd - this.animationStart
            }, t.prototype.resetRotationDirections = function () {
                this.timelinesRotation.length = 0
            }, Object.defineProperty(t.prototype, "time", {
                get: function () {
                    return t.deprecatedWarning1 || (t.deprecatedWarning1 = !0, console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.")), this.trackTime
                }, set: function (e) {
                    t.deprecatedWarning1 || (t.deprecatedWarning1 = !0, console.warn("Deprecation Warning: TrackEntry.time is deprecated, please use trackTime from now on.")), this.trackTime = e
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "endTime", {
                get: function () {
                    return t.deprecatedWarning2 || (t.deprecatedWarning2 = !0, console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.")), this.trackTime
                }, set: function (e) {
                    t.deprecatedWarning2 || (t.deprecatedWarning2 = !0, console.warn("Deprecation Warning: TrackEntry.endTime is deprecated, please use trackEnd from now on.")), this.trackTime = e
                }, enumerable: !0, configurable: !0
            }), t.prototype.loopsCount = function () {
                return Math.floor(this.trackTime / this.trackEnd)
            }, t
        }();
        r.deprecatedWarning1 = !1, r.deprecatedWarning2 = !1, t.TrackEntry = r;
        var i = function () {
            function e(t) {
                this.objects = [], this.drainDisabled = !1, this.animState = t
            }

            return e.prototype.start = function (t) {
                this.objects.push(n.start), this.objects.push(t), this.animState.animationsChanged = !0
            }, e.prototype.interrupt = function (t) {
                this.objects.push(n.interrupt), this.objects.push(t)
            }, e.prototype.end = function (t) {
                this.objects.push(n.end), this.objects.push(t), this.animState.animationsChanged = !0
            }, e.prototype.dispose = function (t) {
                this.objects.push(n.dispose), this.objects.push(t)
            }, e.prototype.complete = function (t) {
                this.objects.push(n.complete), this.objects.push(t)
            }, e.prototype.event = function (t, e) {
                this.objects.push(n.event), this.objects.push(t), this.objects.push(e)
            }, e.prototype.deprecateStuff = function () {
                return e.deprecatedWarning1 || (e.deprecatedWarning1 = !0, console.warn("Deprecation Warning: onComplete, onStart, onEnd, onEvent art deprecated, please use listeners from now on. 'state.addListener({ complete: function(track, event) { } })'")), !0
            }, e.prototype.drain = function () {
                if (!this.drainDisabled) {
                    this.drainDisabled = !0;
                    for (var e = this.objects, r = this.animState.listeners, i = 0; i < e.length; i += 2) {
                        var o = e[i], s = e[i + 1];
                        switch (o) {
                            case n.start:
                                null != s.listener && s.listener.start && s.listener.start(s);
                                for (h = 0; h < r.length; h++) r[h].start && r[h].start(s);
                                s.onStart && this.deprecateStuff() && s.onStart(s.trackIndex), this.animState.onStart && this.deprecateStuff() && this.deprecateStuff && this.animState.onStart(s.trackIndex);
                                break;
                            case n.interrupt:
                                null != s.listener && s.listener.interrupt && s.listener.interrupt(s);
                                for (h = 0; h < r.length; h++) r[h].interrupt && r[h].interrupt(s);
                                break;
                            case n.end:
                                null != s.listener && s.listener.end && s.listener.end(s);
                                for (h = 0; h < r.length; h++) r[h].end && r[h].end(s);
                                s.onEnd && this.deprecateStuff() && s.onEnd(s.trackIndex), this.animState.onEnd && this.deprecateStuff() && this.animState.onEnd(s.trackIndex);
                            case n.dispose:
                                null != s.listener && s.listener.dispose && s.listener.dispose(s);
                                for (h = 0; h < r.length; h++) r[h].dispose && r[h].dispose(s);
                                this.animState.trackEntryPool.free(s);
                                break;
                            case n.complete:
                                null != s.listener && s.listener.complete && s.listener.complete(s);
                                for (h = 0; h < r.length; h++) r[h].complete && r[h].complete(s);
                                var a = t.MathUtils.toInt(s.loopsCount());
                                s.onComplete && this.deprecateStuff() && s.onComplete(s.trackIndex, a), this.animState.onComplete && this.deprecateStuff() && this.animState.onComplete(s.trackIndex, a);
                                break;
                            case n.event:
                                var l = e[2 + i++];
                                null != s.listener && s.listener.event && s.listener.event(s, l);
                                for (var h = 0; h < r.length; h++) r[h].event && r[h].event(s, l);
                                s.onEvent && this.deprecateStuff() && s.onEvent(s.trackIndex, l), this.animState.onEvent && this.deprecateStuff() && this.animState.onEvent(s.trackIndex, l)
                        }
                    }
                    this.clear(), this.drainDisabled = !1
                }
            }, e.prototype.clear = function () {
                this.objects.length = 0
            }, e
        }();
        i.deprecatedWarning1 = !1, t.EventQueue = i;
        var n;
        !function (t) {
            t[t.start = 0] = "start", t[t.interrupt = 1] = "interrupt", t[t.end = 2] = "end", t[t.dispose = 3] = "dispose", t[t.complete = 4] = "complete", t[t.event = 5] = "event"
        }(n = t.EventType || (t.EventType = {}));
        var o = function () {
            function t() {
            }

            return t.prototype.start = function (t) {
            }, t.prototype.interrupt = function (t) {
            }, t.prototype.end = function (t) {
            }, t.prototype.dispose = function (t) {
            }, t.prototype.complete = function (t) {
            }, t.prototype.event = function (t, e) {
            }, t
        }();
        t.AnimationStateAdapter2 = o
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function t(t) {
                if (this.animationToMixTime = {}, this.defaultMix = 0, null == t) throw new Error("skeletonData cannot be null.");
                this.skeletonData = t
            }

            return t.prototype.setMix = function (t, e, r) {
                var i = this.skeletonData.findAnimation(t);
                if (null == i) throw new Error("Animation not found: " + t);
                var n = this.skeletonData.findAnimation(e);
                if (null == n) throw new Error("Animation not found: " + e);
                this.setMixWith(i, n, r)
            }, t.prototype.setMixByName = function (e, r, i) {
                t.deprecatedWarning1 || (t.deprecatedWarning1 = !0, console.warn("Deprecation Warning: AnimationStateData.setMixByName is deprecated, please use setMix from now on.")), this.setMix(e, r, i)
            }, t.prototype.setMixWith = function (t, e, r) {
                if (null == t) throw new Error("from cannot be null.");
                if (null == e) throw new Error("to cannot be null.");
                var i = t.name + e.name;
                this.animationToMixTime[i] = r
            }, t.prototype.getMix = function (t, e) {
                var r = t.name + e.name, i = this.animationToMixTime[r];
                return void 0 === i ? this.defaultMix : i
            }, t
        }();
        e.deprecatedWarning1 = !1, t.AnimationStateData = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(t) {
                this.atlas = t
            }

            return e.prototype.newRegionAttachment = function (e, r, i) {
                var n = this.atlas.findRegion(i);
                if (null == n) throw new Error("Region not found in atlas: " + i + " (region attachment: " + r + ")");
                var o = new t.RegionAttachment(r);
                return o.region = n, o
            }, e.prototype.newMeshAttachment = function (e, r, i) {
                var n = this.atlas.findRegion(i);
                if (null == n) throw new Error("Region not found in atlas: " + i + " (mesh attachment: " + r + ")");
                var o = new t.MeshAttachment(r);
                return o.region = n, o
            }, e.prototype.newBoundingBoxAttachment = function (e, r) {
                return new t.BoundingBoxAttachment(r)
            }, e.prototype.newPathAttachment = function (e, r) {
                return new t.PathAttachment(r)
            }, e
        }();
        t.AtlasAttachmentLoader = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (t) {
                if (null == t) throw new Error("name cannot be null.");
                this.name = t
            }
        }();
        t.Attachment = e;
        var r = function (t) {
            function e(e) {
                var r = t.call(this, e) || this;
                return r.worldVerticesLength = 0, r
            }

            return __extends(e, t), e.prototype.computeWorldVertices = function (t, e) {
                this.computeWorldVerticesWith(t, 0, this.worldVerticesLength, e, 0)
            }, e.prototype.computeWorldVerticesWith = function (t, e, r, i, n) {
                r += n;
                var o = t.bone.skeleton, s = t.attachmentVertices, a = this.vertices, l = this.bones;
                if (null != l) {
                    for (var h = 0, u = 0, c = 0; c < e; c += 2) h += (v = l[h]) + 1, u += v;
                    var p = o.bones;
                    if (0 == s.length) for (var d = n, f = 3 * u; d < r; d += 2) {
                        var m = 0, g = 0, v = l[h++];
                        for (v += h; h < v; h++, f += 3) {
                            var _ = (E = p[l[h]]).matrix, y = a[f], x = a[f + 1], b = a[f + 2];
                            m += (y * _.a + x * _.c + _.tx) * b, g += (y * _.b + x * _.d + _.ty) * b
                        }
                        i[d] = m, i[d + 1] = g
                    } else for (var T = s, d = n, f = 3 * u, w = u << 1; d < r; d += 2) {
                        var m = 0, g = 0, v = l[h++];
                        for (v += h; h < v; h++, f += 3, w += 2) {
                            var E = p[l[h]], _ = E.matrix, y = a[f] + T[w], x = a[f + 1] + T[w + 1], b = a[f + 2];
                            m += (y * _.a + x * _.c + _.tx) * b, g += (y * _.b + x * _.d + _.ty) * b
                        }
                        i[d] = m, i[d + 1] = g
                    }
                } else {
                    s.length > 0 && (a = s);
                    for (var S = (_ = (E = t.bone).matrix).tx, A = _.ty, M = _.a, f = _.c, C = _.b, R = _.d, P = e, d = n; d < r; P += 2, d += 2) {
                        var y = a[P], x = a[P + 1];
                        i[d] = y * M + x * f + S, i[d + 1] = y * C + x * R + A
                    }
                }
            }, e.prototype.applyDeform = function (t) {
                return this == t
            }, e
        }(e);
        t.VertexAttachment = r
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        !function (t) {
            t[t.Region = 0] = "Region", t[t.BoundingBox = 1] = "BoundingBox", t[t.Mesh = 2] = "Mesh", t[t.LinkedMesh = 3] = "LinkedMesh", t[t.Path = 4] = "Path"
        }(t.AttachmentType || (t.AttachmentType = {}))
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function (e) {
            function r(r) {
                var i = e.call(this, r) || this;
                return i.color = new t.Color(1, 1, 1, 1), i
            }

            return __extends(r, e), r
        }(t.VertexAttachment);
        t.BoundingBoxAttachment = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function (e) {
            function r(r) {
                var i = e.call(this, r) || this;
                return i.color = new t.Color(1, 1, 1, 1), i.inheritDeform = !1, i.tempColor = new t.Color(0, 0, 0, 0), i
            }

            return __extends(r, e), r.prototype.updateWorldVertices = function (t, e) {
                return []
            }, r.prototype.updateUVs = function (e, r) {
                var i = this.regionUVs.length;
                if (r && r.length == i || (r = t.Utils.newFloatArray(i)), null != e) {
                    for (var n = e.texture._uvs, o = e.width, s = e.height, a = e.originalWidth, l = e.originalHeight, h = e.offsetX, u = e.pixiOffsetY, c = 0; c < i; c += 2) {
                        var p = this.regionUVs[c], d = this.regionUVs[c + 1];
                        p = (p * a - h) / o, d = (d * l - u) / s, r[c] = (n.x0 * (1 - p) + n.x1 * p) * (1 - d) + (n.x3 * (1 - p) + n.x2 * p) * d, r[c + 1] = (n.y0 * (1 - p) + n.y1 * p) * (1 - d) + (n.y3 * (1 - p) + n.y2 * p) * d
                    }
                    return r
                }
            }, r.prototype.applyDeform = function (t) {
                return this == t || this.inheritDeform && this.parentMesh == t
            }, r.prototype.getParentMesh = function () {
                return this.parentMesh
            }, r.prototype.setParentMesh = function (t) {
                this.parentMesh = t, null != t && (this.bones = t.bones, this.vertices = t.vertices, this.regionUVs = t.regionUVs, this.triangles = t.triangles, this.hullLength = t.hullLength, this.worldVerticesLength = t.worldVerticesLength)
            }, r
        }(t.VertexAttachment);
        t.MeshAttachment = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function (e) {
            function r(r) {
                var i = e.call(this, r) || this;
                return i.closed = !1, i.constantSpeed = !1, i.color = new t.Color(1, 1, 1, 1), i
            }

            return __extends(r, e), r
        }(t.VertexAttachment);
        t.PathAttachment = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function (e) {
            function r(r) {
                var i = e.call(this, r) || this;
                return i.x = 0, i.y = 0, i.scaleX = 1, i.scaleY = 1, i.rotation = 0, i.width = 0, i.height = 0, i.color = new t.Color(1, 1, 1, 1), i
            }

            return __extends(r, e), r.prototype.updateWorldVertices = function (t, e) {
                return []
            }, r
        }(t.Attachment);
        t.RegionAttachment = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        !function (t) {
            t[t.Normal = 0] = "Normal", t[t.Additive = 1] = "Additive", t[t.Multiply = 2] = "Multiply", t[t.Screen = 3] = "Screen"
        }(t.BlendMode || (t.BlendMode = {}))
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(t, e, r) {
                if (this.matrix = new PIXI.Matrix, this.children = new Array, this.x = 0, this.y = 0, this.rotation = 0, this.scaleX = 0, this.scaleY = 0, this.shearX = 0, this.shearY = 0, this.ax = 0, this.ay = 0, this.arotation = 0, this.ascaleX = 0, this.ascaleY = 0, this.ashearX = 0, this.ashearY = 0, this.appliedValid = !1, this.sorted = !1, null == t) throw new Error("data cannot be null.");
                if (null == e) throw new Error("skeleton cannot be null.");
                this.data = t, this.skeleton = e, this.parent = r, this.setToSetupPose()
            }

            return Object.defineProperty(e.prototype, "worldX", {
                get: function () {
                    return this.matrix.tx
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(e.prototype, "worldY", {
                get: function () {
                    return this.matrix.ty
                }, enumerable: !0, configurable: !0
            }), e.prototype.update = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY)
            }, e.prototype.updateWorldTransform = function () {
                this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY)
            }, e.prototype.updateWorldTransformWith = function (r, i, n, o, s, a, l) {
                this.ax = r, this.ay = i, this.arotation = n, this.ascaleX = o, this.ascaleY = s, this.ashearX = a, this.ashearY = l, this.appliedValid = !0;
                var h = this.parent, u = this.matrix;
                if (null == h) {
                    var c = n + 90 + l, p = t.MathUtils.cosDeg(n + a) * o, d = t.MathUtils.cosDeg(c) * s,
                        f = t.MathUtils.sinDeg(n + a) * o, m = t.MathUtils.sinDeg(c) * s, g = this.skeleton;
                    return g.flipX && (r = -r, p = -p, d = -d), g.flipY !== e.yDown && (i = -i, f = -f, m = -m), u.a = p, u.c = d, u.b = f, u.d = m, u.tx = r + g.x, void(u.ty = i + g.y)
                }
                var v = h.matrix.a, _ = h.matrix.c, y = h.matrix.b, x = h.matrix.d;
                switch (u.tx = v * r + _ * i + h.matrix.tx, u.ty = y * r + x * i + h.matrix.ty, this.data.transformMode) {
                    case t.TransformMode.Normal:
                        var c = n + 90 + l, p = t.MathUtils.cosDeg(n + a) * o, d = t.MathUtils.cosDeg(c) * s,
                            f = t.MathUtils.sinDeg(n + a) * o, m = t.MathUtils.sinDeg(c) * s;
                        return u.a = v * p + _ * f, u.c = v * d + _ * m, u.b = y * p + x * f, void(u.d = y * d + x * m);
                    case t.TransformMode.OnlyTranslation:
                        c = n + 90 + l;
                        u.a = t.MathUtils.cosDeg(n + a) * o, u.c = t.MathUtils.cosDeg(c) * s, u.b = t.MathUtils.sinDeg(n + a) * o, u.d = t.MathUtils.sinDeg(c) * s;
                        break;
                    case t.TransformMode.NoRotationOrReflection:
                        var b = 0;
                        (C = v * v + y * y) > 1e-4 ? (_ = y * (C = Math.abs(v * x - _ * y) / C), x = v * C, b = Math.atan2(y, v) * t.MathUtils.radDeg) : (v = 0, y = 0, b = 90 - Math.atan2(x, _) * t.MathUtils.radDeg);
                        var T = n + a - b, w = n + l - b + 90, p = t.MathUtils.cosDeg(T) * o,
                            d = t.MathUtils.cosDeg(w) * s, f = t.MathUtils.sinDeg(T) * o, m = t.MathUtils.sinDeg(w) * s;
                        u.a = v * p - _ * f, u.c = v * d - _ * m, u.b = y * p + x * f, u.d = y * d + x * m;
                        break;
                    case t.TransformMode.NoScale:
                    case t.TransformMode.NoScaleOrReflection:
                        var E = t.MathUtils.cosDeg(n), S = t.MathUtils.sinDeg(n), A = v * E + _ * S, M = y * E + x * S,
                            C = Math.sqrt(A * A + M * M);
                        C > 1e-5 && (C = 1 / C), A *= C, M *= C, C = Math.sqrt(A * A + M * M);
                        var R = Math.PI / 2 + Math.atan2(M, A), P = Math.cos(R) * C, O = Math.sin(R) * C,
                            p = t.MathUtils.cosDeg(a) * o, d = t.MathUtils.cosDeg(90 + l) * s,
                            f = t.MathUtils.sinDeg(a) * o, m = t.MathUtils.sinDeg(90 + l) * s;
                        return u.a = A * p + P * f, u.c = A * d + P * m, u.b = M * p + O * f, u.d = M * d + O * m, void((this.data.transformMode != t.TransformMode.NoScaleOrReflection ? v * x - _ * y < 0 : this.skeleton.flipX != this.skeleton.flipY != e.yDown) && (u.c = -u.c, u.d = -u.d))
                }
                this.skeleton.flipX && (u.a = -u.a, u.c = -u.c), this.skeleton.flipY != e.yDown && (u.b = -u.b, u.d = -u.d)
            }, e.prototype.setToSetupPose = function () {
                var t = this.data;
                this.x = t.x, this.y = t.y, this.rotation = t.rotation, this.scaleX = t.scaleX, this.scaleY = t.scaleY, this.shearX = t.shearX, this.shearY = t.shearY
            }, e.prototype.getWorldRotationX = function () {
                return Math.atan2(this.matrix.b, this.matrix.a) * t.MathUtils.radDeg
            }, e.prototype.getWorldRotationY = function () {
                return Math.atan2(this.matrix.d, this.matrix.c) * t.MathUtils.radDeg
            }, e.prototype.getWorldScaleX = function () {
                var t = this.matrix;
                return Math.sqrt(t.a * t.a + t.c * t.c)
            }, e.prototype.getWorldScaleY = function () {
                var t = this.matrix;
                return Math.sqrt(t.b * t.b + t.d * t.d)
            }, e.prototype.worldToLocalRotationX = function () {
                var e = this.parent;
                if (null == e) return this.arotation;
                var r = e.matrix, i = this.matrix;
                return Math.atan2(r.a * i.b - r.b * i.a, r.d * i.a - r.c * i.b) * t.MathUtils.radDeg
            }, e.prototype.worldToLocalRotationY = function () {
                var e = this.parent;
                if (null == e) return this.arotation;
                var r = e.matrix, i = this.matrix;
                return Math.atan2(r.a * i.d - r.b * i.c, r.d * i.c - r.c * i.d) * t.MathUtils.radDeg
            }, e.prototype.rotateWorld = function (e) {
                var r = this.matrix, i = this.matrix.a, n = r.c, o = r.b, s = r.d, a = t.MathUtils.cosDeg(e),
                    l = t.MathUtils.sinDeg(e);
                r.a = a * i - l * o, r.c = a * n - l * s, r.b = l * i + a * o, r.d = l * n + a * s, this.appliedValid = !1
            }, e.prototype.updateAppliedTransform = function () {
                this.appliedValid = !0;
                var e = this.parent, r = this.matrix;
                if (null == e) return this.ax = r.tx, this.ay = r.ty, this.arotation = Math.atan2(r.b, r.a) * t.MathUtils.radDeg, this.ascaleX = Math.sqrt(r.a * r.a + r.b * r.b), this.ascaleY = Math.sqrt(r.c * r.c + r.d * r.d), this.ashearX = 0, void(this.ashearY = Math.atan2(r.a * r.c + r.b * r.d, r.a * r.d - r.b * r.c) * t.MathUtils.radDeg);
                var i = e.matrix, n = 1 / (i.a * i.d - i.b * i.c), o = r.tx - i.tx, s = r.ty - i.ty;
                this.ax = o * i.d * n - s * i.c * n, this.ay = s * i.a * n - o * i.b * n;
                var a = n * i.d, l = n * i.a, h = n * i.c, u = n * i.b, c = a * r.a - h * r.b, p = a * r.c - h * r.d,
                    d = l * r.b - u * r.a, f = l * r.d - u * r.c;
                if (this.ashearX = 0, this.ascaleX = Math.sqrt(c * c + d * d), this.ascaleX > 1e-4) {
                    var m = c * f - p * d;
                    this.ascaleY = m / this.ascaleX, this.ashearY = Math.atan2(c * p + d * f, m) * t.MathUtils.radDeg, this.arotation = Math.atan2(d, c) * t.MathUtils.radDeg
                } else this.ascaleX = 0, this.ascaleY = Math.sqrt(p * p + f * f), this.ashearY = 0, this.arotation = 90 - Math.atan2(f, p) * t.MathUtils.radDeg
            }, e.prototype.worldToLocal = function (t) {
                var e = this.matrix, r = e.a, i = e.c, n = e.b, o = e.d, s = 1 / (r * o - i * n), a = t.x - e.tx,
                    l = t.y - e.ty;
                return t.x = a * o * s - l * i * s, t.y = l * r * s - a * n * s, t
            }, e.prototype.localToWorld = function (t) {
                var e = this.matrix, r = t.x, i = t.y;
                return t.x = r * e.a + i * e.c + e.tx, t.y = r * e.b + i * e.d + e.ty, t
            }, e
        }();
        e.yDown = !1, t.Bone = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (t, e, i) {
                if (this.x = 0, this.y = 0, this.rotation = 0, this.scaleX = 1, this.scaleY = 1, this.shearX = 0, this.shearY = 0, this.transformMode = r.Normal, t < 0) throw new Error("index must be >= 0.");
                if (null == e) throw new Error("name cannot be null.");
                this.index = t, this.name = e, this.parent = i
            }
        }();
        t.BoneData = e;
        var r;
        !function (t) {
            t[t.Normal = 0] = "Normal", t[t.OnlyTranslation = 1] = "OnlyTranslation", t[t.NoRotationOrReflection = 2] = "NoRotationOrReflection", t[t.NoScale = 3] = "NoScale", t[t.NoScaleOrReflection = 4] = "NoScaleOrReflection"
        }(r = t.TransformMode || (t.TransformMode = {}))
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (t, e) {
                if (null == e) throw new Error("data cannot be null.");
                this.time = t, this.data = e
            }
        }();
        t.Event = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (t) {
                this.name = t
            }
        }();
        t.EventData = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(t, e) {
                if (this.mix = 1, this.bendDirection = 0, this.level = 0, null == t) throw new Error("data cannot be null.");
                if (null == e) throw new Error("skeleton cannot be null.");
                this.data = t, this.mix = t.mix, this.bendDirection = t.bendDirection, this.bones = new Array;
                for (var r = 0; r < t.bones.length; r++) this.bones.push(e.findBone(t.bones[r].name));
                this.target = e.findBone(t.target.name)
            }

            return e.prototype.getOrder = function () {
                return this.data.order
            }, e.prototype.apply = function () {
                this.update()
            }, e.prototype.update = function () {
                var t = this.target, e = this.bones;
                switch (e.length) {
                    case 1:
                        this.apply1(e[0], t.worldX, t.worldY, this.mix);
                        break;
                    case 2:
                        this.apply2(e[0], e[1], t.worldX, t.worldY, this.bendDirection, this.mix)
                }
            }, e.prototype.apply1 = function (e, r, i, n) {
                e.appliedValid || e.updateAppliedTransform();
                var o = e.parent.matrix, s = 1 / (o.a * o.d - o.b * o.c), a = r - o.tx, l = i - o.ty,
                    h = (a * o.d - l * o.c) * s - e.ax, u = (l * o.a - a * o.b) * s - e.ay,
                    c = Math.atan2(u, h) * t.MathUtils.radDeg - e.ashearX - e.arotation;
                e.ascaleX < 0 && (c += 180), c > 180 ? c -= 360 : c < -180 && (c += 360), e.updateWorldTransformWith(e.ax, e.ay, e.arotation + c * n, e.ascaleX, e.ascaleY, e.ashearX, e.ashearY)
            }, e.prototype.apply2 = function (e, r, i, n, o, s) {
                if (0 != s) {
                    e.appliedValid || e.updateAppliedTransform(), r.appliedValid || r.updateAppliedTransform();
                    var a = e.ax, l = e.ay, h = e.ascaleX, u = e.ascaleY, c = r.ascaleX, p = 0, d = 0, f = 0;
                    h < 0 ? (h = -h, p = 180, f = -1) : (p = 0, f = 1), u < 0 && (u = -u, f = -f), c < 0 ? (c = -c, d = 180) : d = 0;
                    var m = e.matrix, g = r.ax, v = 0, _ = 0, y = 0, x = m.a, b = m.c, T = m.b, w = m.d,
                        E = Math.abs(h - u) <= 1e-4;
                    E ? (_ = x * g + b * (v = r.ay) + m.tx, y = T * g + w * v + m.ty) : (v = 0, _ = x * g + m.tx, y = T * g + m.ty);
                    e.parent;
                    var S = e.parent.matrix;
                    x = S.a, b = S.c, T = S.b;
                    var A = 1 / (x * (w = S.d) - b * T), M = i - S.tx, C = n - S.ty, R = (M * w - C * b) * A - a,
                        P = (C * x - M * T) * A - l, O = ((M = _ - S.tx) * w - (C = y - S.ty) * b) * A - a,
                        D = (C * x - M * T) * A - l, I = Math.sqrt(O * O + D * D), F = r.data.length * c, L = 0, k = 0;
                    t:if (E) {
                        var B = (R * R + P * P - I * I - (F *= h) * F) / (2 * I * F);
                        B < -1 ? B = -1 : B > 1 && (B = 1), k = Math.acos(B) * o, x = I + F * B, b = F * Math.sin(k), L = Math.atan2(P * x - R * b, R * x + P * b)
                    } else {
                        var N = (x = h * F) * x, U = (b = u * F) * b, X = R * R + P * P, Y = Math.atan2(P, R),
                            j = -2 * U * I, V = U - N;
                        if ((w = j * j - 4 * V * (T = U * I * I + N * X - N * U)) >= 0) {
                            var W = Math.sqrt(w);
                            j < 0 && (W = -W);
                            var G = (W = -(j + W) / 2) / V, z = T / W, H = Math.abs(G) < Math.abs(z) ? G : z;
                            if (H * H <= X) {
                                C = Math.sqrt(X - H * H) * o, L = Y - Math.atan2(C, H), k = Math.atan2(C / u, (H - I) / h);
                                break t
                            }
                        }
                        var q = 0, Z = Number.MAX_VALUE, K = 0, Q = 0, J = 0, $ = 0, tt = 0, et = 0;
                        (w = (M = I + x) * M) > $ && (J = 0, $ = w, tt = M), (w = (M = I - x) * M) < Z && (q = t.MathUtils.PI, Z = w, K = M);
                        var rt = Math.acos(-x * I / (N - U));
                        (w = (M = x * Math.cos(rt) + I) * M + (C = b * Math.sin(rt)) * C) < Z && (q = rt, Z = w, K = M, Q = C), w > $ && (J = rt, $ = w, tt = M, et = C), X <= (Z + $) / 2 ? (L = Y - Math.atan2(Q * o, K), k = q * o) : (L = Y - Math.atan2(et * o, tt), k = J * o)
                    }
                    var it = Math.atan2(v, g) * f, nt = e.arotation;
                    (L = (L - it) * t.MathUtils.radDeg + p - nt) > 180 ? L -= 360 : L < -180 && (L += 360), e.updateWorldTransformWith(a, l, nt + L * s, e.ascaleX, e.ascaleY, 0, 0), nt = r.arotation, (k = ((k + it) * t.MathUtils.radDeg - r.ashearX) * f + d - nt) > 180 ? k -= 360 : k < -180 && (k += 360), r.updateWorldTransformWith(g, v, nt + k * s, r.ascaleX, r.ascaleY, r.ashearX, r.ashearY)
                } else r.updateWorldTransform()
            }, e
        }();
        t.IkConstraint = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (t) {
                this.order = 0, this.bones = new Array, this.bendDirection = 1, this.mix = 1, this.name = t
            }
        }();
        t.IkConstraintData = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(t, e) {
                if (this.position = 0, this.spacing = 0, this.rotateMix = 0, this.translateMix = 0, this.spaces = new Array, this.positions = new Array, this.world = new Array, this.curves = new Array, this.lengths = new Array, this.segments = new Array, null == t) throw new Error("data cannot be null.");
                if (null == e) throw new Error("skeleton cannot be null.");
                this.data = t, this.bones = new Array;
                for (var r = 0, i = t.bones.length; r < i; r++) this.bones.push(e.findBone(t.bones[r].name));
                this.target = e.findSlot(t.target.name), this.position = t.position, this.spacing = t.spacing, this.rotateMix = t.rotateMix, this.translateMix = t.translateMix
            }

            return e.prototype.apply = function () {
                this.update()
            }, e.prototype.update = function () {
                var e = this.target.getAttachment();
                if (e instanceof t.PathAttachment) {
                    var r = this.rotateMix, i = this.translateMix, n = r > 0;
                    if (i > 0 || n) {
                        var o = this.data, s = o.spacingMode, a = s == t.SpacingMode.Length, l = o.rotateMode,
                            h = l == t.RotateMode.Tangent, u = l == t.RotateMode.ChainScale, c = this.bones.length,
                            p = h ? c : c + 1, d = this.bones, f = t.Utils.setArraySize(this.spaces, p), m = null,
                            g = this.spacing;
                        if (u || a) {
                            u && (m = t.Utils.setArraySize(this.lengths, c));
                            for (var v = 0, _ = p - 1; v < _;) {
                                var y = (P = d[v]).matrix, x = P.data.length, b = x * y.a, T = x * y.b;
                                x = Math.sqrt(b * b + T * T), u && (m[v] = x), f[++v] = a ? Math.max(0, x + g) : g
                            }
                        } else for (v = 1; v < p; v++) f[v] = g;
                        var w = this.computeWorldPositions(e, p, h, o.positionMode == t.PositionMode.Percent, s == t.SpacingMode.Percent),
                            E = w[0], S = w[1], A = o.offsetRotation, M = !1;
                        if (0 == A) M = l == t.RotateMode.Chain; else {
                            M = !1;
                            var C = this.target.bone.matrix;
                            A *= C.a * C.d - C.b * C.c > 0 ? t.MathUtils.degRad : -t.MathUtils.degRad
                        }
                        for (var v = 0, R = 3; v < c; v++, R += 3) {
                            var P = d[v];
                            (y = P.matrix).tx += (E - y.tx) * i, y.ty += (S - y.ty) * i;
                            var O = (b = w[R]) - E, D = (T = w[R + 1]) - S;
                            if (u) {
                                var I = m[v];
                                if (0 != I) {
                                    var F = (Math.sqrt(O * O + D * D) / I - 1) * r + 1;
                                    y.a *= F, y.b *= F
                                }
                            }
                            if (E = b, S = T, n) {
                                var L = y.a, k = y.c, B = y.b, N = y.d, U = 0, X = 0, Y = 0;
                                if (U = h ? w[R - 1] : 0 == f[v + 1] ? w[R + 2] : Math.atan2(D, O), U -= Math.atan2(B, L), M) {
                                    X = Math.cos(U), Y = Math.sin(U);
                                    var j = P.data.length;
                                    E += (j * (X * L - Y * B) - O) * r, S += (j * (Y * L + X * B) - D) * r
                                } else U += A;
                                U > t.MathUtils.PI ? U -= t.MathUtils.PI2 : U < -t.MathUtils.PI && (U += t.MathUtils.PI2), U *= r, X = Math.cos(U), Y = Math.sin(U), y.a = X * L - Y * B, y.c = X * k - Y * N, y.b = Y * L + X * B, y.d = Y * k + X * N
                            }
                            P.appliedValid = !1
                        }
                    }
                }
            }, e.prototype.computeWorldPositions = function (r, i, n, o, s) {
                var a = this.target, l = this.position, h = this.spaces,
                    u = t.Utils.setArraySize(this.positions, 3 * i + 2), c = null, p = r.closed,
                    d = r.worldVerticesLength, f = d / 6, m = e.NONE;
                if (!r.constantSpeed) {
                    var g = r.lengths, v = g[f -= p ? 1 : 2];
                    if (o && (l *= v), s) for (_ = 0; _ < i; _++) h[_] *= v;
                    c = t.Utils.setArraySize(this.world, 8);
                    for (var _ = 0, y = 0, x = 0; _ < i; _++, y += 3) {
                        G = l += W = h[_];
                        if (p) (G %= v) < 0 && (G += v), x = 0; else {
                            if (G < 0) {
                                m != e.BEFORE && (m = e.BEFORE, r.computeWorldVerticesWith(a, 2, 4, c, 0)), this.addBeforePosition(G, c, 0, u, y);
                                continue
                            }
                            if (G > v) {
                                m != e.AFTER && (m = e.AFTER, r.computeWorldVerticesWith(a, d - 6, 4, c, 0)), this.addAfterPosition(G - v, c, 0, u, y);
                                continue
                            }
                        }
                        for (; ; x++) {
                            var b = g[x];
                            if (!(G > b)) {
                                0 == x ? G /= b : G = (G - (Z = g[x - 1])) / (b - Z);
                                break
                            }
                        }
                        x != m && (m = x, p && x == f ? (r.computeWorldVerticesWith(a, d - 4, 4, c, 0), r.computeWorldVerticesWith(a, 0, 4, c, 4)) : r.computeWorldVerticesWith(a, 6 * x + 2, 8, c, 0)), this.addCurvePosition(G, c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], u, y, n || _ > 0 && 0 == W)
                    }
                    return u
                }
                p ? (d += 2, c = t.Utils.setArraySize(this.world, d), r.computeWorldVerticesWith(a, 2, d - 4, c, 0), r.computeWorldVerticesWith(a, 0, 2, c, d - 4), c[d - 2] = c[0], c[d - 1] = c[1]) : (f--, d -= 4, c = t.Utils.setArraySize(this.world, d), r.computeWorldVerticesWith(a, 2, d, c, 0));
                for (var T = t.Utils.setArraySize(this.curves, f), w = 0, E = c[0], S = c[1], A = 0, M = 0, C = 0, R = 0, P = 0, O = 0, D = 0, I = 0, F = 0, L = 0, k = 0, B = 0, N = 0, U = 0, _ = 0, X = 2; _ < f; _++, X += 6) A = c[X], M = c[X + 1], C = c[X + 2], R = c[X + 3], k = 2 * (D = .1875 * (E - 2 * A + C)) + (F = .09375 * (3 * (A - C) - E + (P = c[X + 4]))), B = 2 * (I = .1875 * (S - 2 * M + R)) + (L = .09375 * (3 * (M - R) - S + (O = c[X + 5]))), N = .75 * (A - E) + D + .16666667 * F, U = .75 * (M - S) + I + .16666667 * L, w += Math.sqrt(N * N + U * U), N += k, U += B, k += F, B += L, w += Math.sqrt(N * N + U * U), N += k, U += B, w += Math.sqrt(N * N + U * U), N += k + F, U += B + L, w += Math.sqrt(N * N + U * U), T[_] = w, E = P, S = O;
                if (o && (l *= w), s) for (_ = 0; _ < i; _++) h[_] *= w;
                for (var Y = this.segments, j = 0, _ = 0, y = 0, x = 0, V = 0; _ < i; _++, y += 3) {
                    var W = h[_], G = l += W;
                    if (p) (G %= w) < 0 && (G += w), x = 0; else {
                        if (G < 0) {
                            this.addBeforePosition(G, c, 0, u, y);
                            continue
                        }
                        if (G > w) {
                            this.addAfterPosition(G - w, c, d - 4, u, y);
                            continue
                        }
                    }
                    for (; ; x++) {
                        var z = T[x];
                        if (!(G > z)) {
                            0 == x ? G /= z : G = (G - (Z = T[x - 1])) / (z - Z);
                            break
                        }
                    }
                    if (x != m) {
                        m = x;
                        var H = 6 * x;
                        for (E = c[H], S = c[H + 1], A = c[H + 2], M = c[H + 3], C = c[H + 4], R = c[H + 5], k = 2 * (D = .03 * (E - 2 * A + C)) + (F = .006 * (3 * (A - C) - E + (P = c[H + 6]))), B = 2 * (I = .03 * (S - 2 * M + R)) + (L = .006 * (3 * (M - R) - S + (O = c[H + 7]))), N = .3 * (A - E) + D + .16666667 * F, U = .3 * (M - S) + I + .16666667 * L, j = Math.sqrt(N * N + U * U), Y[0] = j, H = 1; H < 8; H++) N += k, U += B, k += F, B += L, j += Math.sqrt(N * N + U * U), Y[H] = j;
                        N += k, U += B, j += Math.sqrt(N * N + U * U), Y[8] = j, N += k + F, U += B + L, j += Math.sqrt(N * N + U * U), Y[9] = j, V = 0
                    }
                    for (G *= j; ; V++) {
                        var q = Y[V];
                        if (!(G > q)) {
                            if (0 == V) G /= q; else {
                                var Z = Y[V - 1];
                                G = V + (G - Z) / (q - Z)
                            }
                            break
                        }
                    }
                    this.addCurvePosition(.1 * G, E, S, A, M, C, R, P, O, u, y, n || _ > 0 && 0 == W)
                }
                return u
            }, e.prototype.addBeforePosition = function (t, e, r, i, n) {
                var o = e[r], s = e[r + 1], a = e[r + 2] - o, l = e[r + 3] - s, h = Math.atan2(l, a);
                i[n] = o + t * Math.cos(h), i[n + 1] = s + t * Math.sin(h), i[n + 2] = h
            }, e.prototype.addAfterPosition = function (t, e, r, i, n) {
                var o = e[r + 2], s = e[r + 3], a = o - e[r], l = s - e[r + 1], h = Math.atan2(l, a);
                i[n] = o + t * Math.cos(h), i[n + 1] = s + t * Math.sin(h), i[n + 2] = h
            }, e.prototype.addCurvePosition = function (t, e, r, i, n, o, s, a, l, h, u, c) {
                (0 == t || isNaN(t)) && (t = 1e-4);
                var p = t * t, d = p * t, f = 1 - t, m = f * f, g = m * f, v = f * t, _ = 3 * v, y = f * _, x = _ * t,
                    b = e * g + i * y + o * x + a * d, T = r * g + n * y + s * x + l * d;
                h[u] = b, h[u + 1] = T, c && (h[u + 2] = Math.atan2(T - (r * m + n * v * 2 + s * p), b - (e * m + i * v * 2 + o * p)))
            }, e.prototype.getOrder = function () {
                return this.data.order
            }, e
        }();
        e.NONE = -1, e.BEFORE = -2, e.AFTER = -3, t.PathConstraint = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (t) {
                this.order = 0, this.bones = new Array, this.name = t
            }
        }();
        t.PathConstraintData = e;
        !function (t) {
            t[t.Fixed = 0] = "Fixed", t[t.Percent = 1] = "Percent"
        }(t.PositionMode || (t.PositionMode = {}));
        !function (t) {
            t[t.Length = 0] = "Length", t[t.Fixed = 1] = "Fixed", t[t.Percent = 2] = "Percent"
        }(t.SpacingMode || (t.SpacingMode = {}));
        !function (t) {
            t[t.Tangent = 0] = "Tangent", t[t.Chain = 1] = "Chain", t[t.ChainScale = 2] = "ChainScale"
        }(t.RotateMode || (t.RotateMode = {}))
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(e) {
                if (this._updateCache = new Array, this.updateCacheReset = new Array, this.time = 0, this.flipX = !1, this.flipY = !1, this.x = 0, this.y = 0, null == e) throw new Error("data cannot be null.");
                this.data = e, this.bones = new Array;
                for (h = 0; h < e.bones.length; h++) {
                    var r = e.bones[h], i = void 0;
                    if (null == r.parent) i = new t.Bone(r, this, null); else {
                        var n = this.bones[r.parent.index];
                        i = new t.Bone(r, this, n), n.children.push(i)
                    }
                    this.bones.push(i)
                }
                this.slots = new Array, this.drawOrder = new Array;
                for (h = 0; h < e.slots.length; h++) {
                    var o = e.slots[h], i = this.bones[o.boneData.index], s = new t.Slot(o, i);
                    this.slots.push(s), this.drawOrder.push(s)
                }
                this.ikConstraints = new Array;
                for (h = 0; h < e.ikConstraints.length; h++) {
                    var a = e.ikConstraints[h];
                    this.ikConstraints.push(new t.IkConstraint(a, this))
                }
                this.transformConstraints = new Array;
                for (h = 0; h < e.transformConstraints.length; h++) {
                    var l = e.transformConstraints[h];
                    this.transformConstraints.push(new t.TransformConstraint(l, this))
                }
                this.pathConstraints = new Array;
                for (var h = 0; h < e.pathConstraints.length; h++) {
                    var u = e.pathConstraints[h];
                    this.pathConstraints.push(new t.PathConstraint(u, this))
                }
                this.color = new t.Color(1, 1, 1, 1), this.updateCache()
            }

            return e.prototype.updateCache = function () {
                this._updateCache.length = 0, this.updateCacheReset.length = 0;
                for (var t = this.bones, e = 0, r = t.length; e < r; e++) t[e].sorted = !1;
                var i = this.ikConstraints, n = this.transformConstraints, o = this.pathConstraints, s = i.length,
                    a = n.length, l = o.length, h = s + a + l;
                t:for (e = 0; e < h; e++) {
                    for (u = 0; u < s; u++) if ((c = i[u]).data.order == e) {
                        this.sortIkConstraint(c);
                        continue t
                    }
                    for (u = 0; u < a; u++) if ((c = n[u]).data.order == e) {
                        this.sortTransformConstraint(c);
                        continue t
                    }
                    for (var u = 0; u < l; u++) {
                        var c = o[u];
                        if (c.data.order == e) {
                            this.sortPathConstraint(c);
                            continue t
                        }
                    }
                }
                for (var e = 0, r = t.length; e < r; e++) this.sortBone(t[e])
            }, e.prototype.sortIkConstraint = function (t) {
                var e = t.target;
                this.sortBone(e);
                var r = t.bones, i = r[0];
                if (this.sortBone(i), r.length > 1) {
                    var n = r[r.length - 1];
                    this._updateCache.indexOf(n) > -1 || this.updateCacheReset.push(n)
                }
                this._updateCache.push(t), this.sortReset(i.children), r[r.length - 1].sorted = !0
            }, e.prototype.sortPathConstraint = function (e) {
                var r = e.target, i = r.data.index, n = r.bone;
                null != this.skin && this.sortPathConstraintAttachment(this.skin, i, n), null != this.data.defaultSkin && this.data.defaultSkin != this.skin && this.sortPathConstraintAttachment(this.data.defaultSkin, i, n);
                for (var o = 0, s = this.data.skins.length; o < s; o++) this.sortPathConstraintAttachment(this.data.skins[o], i, n);
                var a = r.getAttachment();
                a instanceof t.PathAttachment && this.sortPathConstraintAttachmentWith(a, n);
                for (var l = e.bones, h = l.length, o = 0; o < h; o++) this.sortBone(l[o]);
                this._updateCache.push(e);
                for (o = 0; o < h; o++) this.sortReset(l[o].children);
                for (o = 0; o < h; o++) l[o].sorted = !0
            }, e.prototype.sortTransformConstraint = function (t) {
                this.sortBone(t.target);
                for (var e = t.bones, r = e.length, i = 0; i < r; i++) this.sortBone(e[i]);
                this._updateCache.push(t);
                for (i = 0; i < r; i++) this.sortReset(e[i].children);
                for (i = 0; i < r; i++) e[i].sorted = !0
            }, e.prototype.sortPathConstraintAttachment = function (t, e, r) {
                var i = t.attachments[e];
                if (i) for (var n in i) this.sortPathConstraintAttachmentWith(i[n], r)
            }, e.prototype.sortPathConstraintAttachmentWith = function (e, r) {
                if (e instanceof t.PathAttachment) {
                    var i = e.bones;
                    if (null == i) this.sortBone(r); else for (var n = this.bones, o = 0; o < i.length;) for (var s = i[o++], a = o + s; o < a; o++) {
                        var l = i[o];
                        this.sortBone(n[l])
                    }
                }
            }, e.prototype.sortBone = function (t) {
                if (!t.sorted) {
                    var e = t.parent;
                    null != e && this.sortBone(e), t.sorted = !0, this._updateCache.push(t)
                }
            }, e.prototype.sortReset = function (t) {
                for (var e = 0, r = t.length; e < r; e++) {
                    var i = t[e];
                    i.sorted && this.sortReset(i.children), i.sorted = !1
                }
            }, e.prototype.updateWorldTransform = function () {
                for (var t = this.updateCacheReset, e = 0, r = t.length; e < r; e++) {
                    var i = t[e];
                    i.ax = i.x, i.ay = i.y, i.arotation = i.rotation, i.ascaleX = i.scaleX, i.ascaleY = i.scaleY, i.ashearX = i.shearX, i.ashearY = i.shearY, i.appliedValid = !0
                }
                for (var n = this._updateCache, e = 0, r = n.length; e < r; e++) n[e].update()
            }, e.prototype.setToSetupPose = function () {
                this.setBonesToSetupPose(), this.setSlotsToSetupPose()
            }, e.prototype.setBonesToSetupPose = function () {
                for (var t = this.bones, e = 0, r = t.length; e < r; e++) t[e].setToSetupPose();
                for (var i = this.ikConstraints, e = 0, r = i.length; e < r; e++) (s = i[e]).bendDirection = s.data.bendDirection, s.mix = s.data.mix;
                for (var n = this.transformConstraints, e = 0, r = n.length; e < r; e++) {
                    a = (s = n[e]).data;
                    s.rotateMix = a.rotateMix, s.translateMix = a.translateMix, s.scaleMix = a.scaleMix, s.shearMix = a.shearMix
                }
                for (var o = this.pathConstraints, e = 0, r = o.length; e < r; e++) {
                    var s = o[e], a = s.data;
                    s.position = a.position, s.spacing = a.spacing, s.rotateMix = a.rotateMix, s.translateMix = a.translateMix
                }
            }, e.prototype.setSlotsToSetupPose = function () {
                var e = this.slots;
                t.Utils.arrayCopy(e, 0, this.drawOrder, 0, e.length);
                for (var r = 0, i = e.length; r < i; r++) e[r].setToSetupPose()
            }, e.prototype.getRootBone = function () {
                return 0 == this.bones.length ? null : this.bones[0]
            }, e.prototype.findBone = function (t) {
                if (null == t) throw new Error("boneName cannot be null.");
                for (var e = this.bones, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.data.name == t) return n
                }
                return null
            }, e.prototype.findBoneIndex = function (t) {
                if (null == t) throw new Error("boneName cannot be null.");
                for (var e = this.bones, r = 0, i = e.length; r < i; r++) if (e[r].data.name == t) return r;
                return -1
            }, e.prototype.findSlot = function (t) {
                if (null == t) throw new Error("slotName cannot be null.");
                for (var e = this.slots, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.data.name == t) return n
                }
                return null
            }, e.prototype.findSlotIndex = function (t) {
                if (null == t) throw new Error("slotName cannot be null.");
                for (var e = this.slots, r = 0, i = e.length; r < i; r++) if (e[r].data.name == t) return r;
                return -1
            }, e.prototype.setSkinByName = function (t) {
                var e = this.data.findSkin(t);
                if (null == e) throw new Error("Skin not found: " + t);
                this.setSkin(e)
            }, e.prototype.setSkin = function (t) {
                if (null != t) if (null != this.skin) t.attachAll(this, this.skin); else for (var e = this.slots, r = 0, i = e.length; r < i; r++) {
                    var n = e[r], o = n.data.attachmentName;
                    if (null != o) {
                        var s = t.getAttachment(r, o);
                        null != s && n.setAttachment(s)
                    }
                }
                this.skin = t
            }, e.prototype.getAttachmentByName = function (t, e) {
                return this.getAttachment(this.data.findSlotIndex(t), e)
            }, e.prototype.getAttachment = function (t, e) {
                if (null == e) throw new Error("attachmentName cannot be null.");
                if (null != this.skin) {
                    var r = this.skin.getAttachment(t, e);
                    if (null != r) return r
                }
                return null != this.data.defaultSkin ? this.data.defaultSkin.getAttachment(t, e) : null
            }, e.prototype.setAttachment = function (t, e) {
                if (null == t) throw new Error("slotName cannot be null.");
                for (var r = this.slots, i = 0, n = r.length; i < n; i++) {
                    var o = r[i];
                    if (o.data.name == t) {
                        var s = null;
                        if (null != e && null == (s = this.getAttachment(i, e))) throw new Error("Attachment not found: " + e + ", for slot: " + t);
                        return void o.setAttachment(s)
                    }
                }
                throw new Error("Slot not found: " + t)
            }, e.prototype.findIkConstraint = function (t) {
                if (null == t) throw new Error("constraintName cannot be null.");
                for (var e = this.ikConstraints, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.data.name == t) return n
                }
                return null
            }, e.prototype.findTransformConstraint = function (t) {
                if (null == t) throw new Error("constraintName cannot be null.");
                for (var e = this.transformConstraints, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.data.name == t) return n
                }
                return null
            }, e.prototype.findPathConstraint = function (t) {
                if (null == t) throw new Error("constraintName cannot be null.");
                for (var e = this.pathConstraints, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.data.name == t) return n
                }
                return null
            }, e.prototype.getBounds = function (e, r) {
                if (null == e) throw new Error("offset cannot be null.");
                if (null == r) throw new Error("size cannot be null.");
                for (var i = this.drawOrder, n = Number.POSITIVE_INFINITY, o = Number.POSITIVE_INFINITY, s = Number.NEGATIVE_INFINITY, a = Number.NEGATIVE_INFINITY, l = 0, h = i.length; l < h; l++) {
                    var u = i[l], c = null, p = u.getAttachment();
                    if (p instanceof t.RegionAttachment ? c = p.updateWorldVertices(u, !1) : p instanceof t.MeshAttachment && (c = p.updateWorldVertices(u, !0)), null != c) for (var d = 0, f = c.length; d < f; d += 8) {
                        var m = c[d], g = c[d + 1];
                        n = Math.min(n, m), o = Math.min(o, g), s = Math.max(s, m), a = Math.max(a, g)
                    }
                }
                e.set(n, o), r.set(s - n, a - o)
            }, e.prototype.update = function (t) {
                this.time += t
            }, e
        }();
        t.Skeleton = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e() {
                this.minX = 0, this.minY = 0, this.maxX = 0, this.maxY = 0, this.boundingBoxes = new Array, this.polygons = new Array, this.polygonPool = new t.Pool(function () {
                    return t.Utils.newFloatArray(16)
                })
            }

            return e.prototype.update = function (e, r) {
                if (null == e) throw new Error("skeleton cannot be null.");
                var i = this.boundingBoxes, n = this.polygons, o = this.polygonPool, s = e.slots, a = s.length;
                i.length = 0, o.freeAll(n), n.length = 0;
                for (var l = 0; l < a; l++) {
                    var h = s[l], u = h.getAttachment();
                    if (u instanceof t.BoundingBoxAttachment) {
                        var c = u;
                        i.push(c);
                        var p = o.obtain();
                        p.length != c.worldVerticesLength && (p = t.Utils.newFloatArray(c.worldVerticesLength)), n.push(p), c.computeWorldVertices(h, p)
                    }
                }
                r && this.aabbCompute()
            }, e.prototype.aabbCompute = function () {
                for (var t = Number.POSITIVE_INFINITY, e = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, i = Number.NEGATIVE_INFINITY, n = this.polygons, o = 0, s = n.length; o < s; o++) for (var a = n[o], l = a, h = 0, u = a.length; h < u; h += 2) {
                    var c = l[h], p = l[h + 1];
                    t = Math.min(t, c), e = Math.min(e, p), r = Math.max(r, c), i = Math.max(i, p)
                }
                this.minX = t, this.minY = e, this.maxX = r, this.maxY = i
            }, e.prototype.aabbContainsPoint = function (t, e) {
                return t >= this.minX && t <= this.maxX && e >= this.minY && e <= this.maxY
            }, e.prototype.aabbIntersectsSegment = function (t, e, r, i) {
                var n = this.minX, o = this.minY, s = this.maxX, a = this.maxY;
                if (t <= n && r <= n || e <= o && i <= o || t >= s && r >= s || e >= a && i >= a) return !1;
                var l = (i - e) / (r - t), h = l * (n - t) + e;
                if (h > o && h < a) return !0;
                if ((h = l * (s - t) + e) > o && h < a) return !0;
                var u = (o - e) / l + t;
                return u > n && u < s || (u = (a - e) / l + t) > n && u < s
            }, e.prototype.aabbIntersectsSkeleton = function (t) {
                return this.minX < t.maxX && this.maxX > t.minX && this.minY < t.maxY && this.maxY > t.minY
            }, e.prototype.containsPoint = function (t, e) {
                for (var r = this.polygons, i = 0, n = r.length; i < n; i++) if (this.containsPointPolygon(r[i], t, e)) return this.boundingBoxes[i];
                return null
            }, e.prototype.containsPointPolygon = function (t, e, r) {
                for (var i = t, n = t.length, o = n - 2, s = !1, a = 0; a < n; a += 2) {
                    var l = i[a + 1], h = i[o + 1];
                    if (l < r && h >= r || h < r && l >= r) {
                        var u = i[a];
                        u + (r - l) / (h - l) * (i[o] - u) < e && (s = !s)
                    }
                    o = a
                }
                return s
            }, e.prototype.intersectsSegment = function (t, e, r, i) {
                for (var n = this.polygons, o = 0, s = n.length; o < s; o++) if (this.intersectsSegmentPolygon(n[o], t, e, r, i)) return this.boundingBoxes[o];
                return null
            }, e.prototype.intersectsSegmentPolygon = function (t, e, r, i, n) {
                for (var o = t, s = t.length, a = e - i, l = r - n, h = e * n - r * i, u = o[s - 2], c = o[s - 1], p = 0; p < s; p += 2) {
                    var d = o[p], f = o[p + 1], m = u * f - c * d, g = u - d, v = c - f, _ = a * v - l * g,
                        y = (h * g - a * m) / _;
                    if ((y >= u && y <= d || y >= d && y <= u) && (y >= e && y <= i || y >= i && y <= e)) {
                        var x = (h * v - l * m) / _;
                        if ((x >= c && x <= f || x >= f && x <= c) && (x >= r && x <= n || x >= n && x <= r)) return !0
                    }
                    u = d, c = f
                }
                return !1
            }, e.prototype.getPolygon = function (t) {
                if (null == t) throw new Error("boundingBox cannot be null.");
                var e = this.boundingBoxes.indexOf(t);
                return -1 == e ? null : this.polygons[e]
            }, e.prototype.getWidth = function () {
                return this.maxX - this.minX
            }, e.prototype.getHeight = function () {
                return this.maxY - this.minY
            }, e
        }();
        t.SkeletonBounds = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function t() {
                this.bones = new Array, this.slots = new Array, this.skins = new Array, this.events = new Array, this.animations = new Array, this.ikConstraints = new Array, this.transformConstraints = new Array, this.pathConstraints = new Array, this.fps = 0
            }

            return t.prototype.findBone = function (t) {
                if (null == t) throw new Error("boneName cannot be null.");
                for (var e = this.bones, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findBoneIndex = function (t) {
                if (null == t) throw new Error("boneName cannot be null.");
                for (var e = this.bones, r = 0, i = e.length; r < i; r++) if (e[r].name == t) return r;
                return -1
            }, t.prototype.findSlot = function (t) {
                if (null == t) throw new Error("slotName cannot be null.");
                for (var e = this.slots, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findSlotIndex = function (t) {
                if (null == t) throw new Error("slotName cannot be null.");
                for (var e = this.slots, r = 0, i = e.length; r < i; r++) if (e[r].name == t) return r;
                return -1
            }, t.prototype.findSkin = function (t) {
                if (null == t) throw new Error("skinName cannot be null.");
                for (var e = this.skins, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findEvent = function (t) {
                if (null == t) throw new Error("eventDataName cannot be null.");
                for (var e = this.events, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findAnimation = function (t) {
                if (null == t) throw new Error("animationName cannot be null.");
                for (var e = this.animations, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findIkConstraint = function (t) {
                if (null == t) throw new Error("constraintName cannot be null.");
                for (var e = this.ikConstraints, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findTransformConstraint = function (t) {
                if (null == t) throw new Error("constraintName cannot be null.");
                for (var e = this.transformConstraints, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findPathConstraint = function (t) {
                if (null == t) throw new Error("constraintName cannot be null.");
                for (var e = this.pathConstraints, r = 0, i = e.length; r < i; r++) {
                    var n = e[r];
                    if (n.name == t) return n
                }
                return null
            }, t.prototype.findPathConstraintIndex = function (t) {
                if (null == t) throw new Error("pathConstraintName cannot be null.");
                for (var e = this.pathConstraints, r = 0, i = e.length; r < i; r++) if (e[r].name == t) return r;
                return -1
            }, t
        }();
        t.SkeletonData = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(t) {
                this.scale = 1, this.linkedMeshes = new Array, this.attachmentLoader = t
            }

            return e.prototype.readSkeletonData = function (r) {
                var i = this.scale, n = new t.SkeletonData, o = "string" == typeof r ? JSON.parse(r) : r,
                    s = o.skeleton;
                if (null != s && (n.hash = s.hash, n.version = s.spine, n.width = s.width, n.height = s.height, n.fps = s.fps, n.imagesPath = s.images), o.bones) for (A = 0; A < o.bones.length; A++) {
                    var a = o.bones[A], l = null, h = this.getValue(a, "parent", null);
                    if (null != h && null == (l = n.findBone(h))) throw new Error("Parent bone not found: " + h);
                    (d = new t.BoneData(n.bones.length, a.name, l)).length = this.getValue(a, "length", 0) * i, d.x = this.getValue(a, "x", 0) * i, d.y = this.getValue(a, "y", 0) * i, d.rotation = this.getValue(a, "rotation", 0), d.scaleX = this.getValue(a, "scaleX", 1), d.scaleY = this.getValue(a, "scaleY", 1), d.shearX = this.getValue(a, "shearX", 0), d.shearY = this.getValue(a, "shearY", 0), a.hasOwnProperty("inheritScale") || a.hasOwnProperty("inheritRotation") ? d.transformMode = e.transformModeLegacy(this.getValue(a, "inheritRotation", !0), this.getValue(a, "inheritScale", !0)) : d.transformMode = e.transformModeFromString(this.getValue(a, "transform", "normal")), n.bones.push(d)
                }
                if (o.slots) for (A = 0; A < o.slots.length; A++) {
                    var u = (w = o.slots[A]).name, c = w.bone, p = n.findBone(c);
                    if (null == p) throw new Error("Slot bone not found: " + c);
                    var d = new t.SlotData(n.slots.length, u, p), f = this.getValue(w, "color", null);
                    null != f && d.color.setFromString(f), d.attachmentName = this.getValue(w, "attachment", null), d.blendMode = e.blendModeFromString(this.getValue(w, "blend", "normal")), n.slots.push(d)
                }
                if (o.ik) for (A = 0; A < o.ik.length; A++) {
                    m = o.ik[A];
                    (d = new t.IkConstraintData(m.name)).order = this.getValue(m, "order", 0);
                    for (g = 0; g < m.bones.length; g++) {
                        c = m.bones[g];
                        if (null == (v = n.findBone(c))) throw new Error("IK bone not found: " + c);
                        d.bones.push(v)
                    }
                    _ = m.target;
                    if (d.target = n.findBone(_), null == d.target) throw new Error("IK target bone not found: " + _);
                    d.bendDirection = this.getValue(m, "bendPositive", !0) ? 1 : -1, d.mix = this.getValue(m, "mix", 1), n.ikConstraints.push(d)
                }
                if (o.transform) for (A = 0; A < o.transform.length; A++) {
                    m = o.transform[A];
                    (d = new t.TransformConstraintData(m.name)).order = this.getValue(m, "order", 0);
                    for (g = 0; g < m.bones.length; g++) {
                        c = m.bones[g];
                        if (null == (v = n.findBone(c))) throw new Error("Transform constraint bone not found: " + c);
                        d.bones.push(v)
                    }
                    _ = m.target;
                    if (d.target = n.findBone(_), null == d.target) throw new Error("Transform constraint target bone not found: " + _);
                    d.offsetRotation = this.getValue(m, "rotation", 0), d.offsetX = this.getValue(m, "x", 0) * i, d.offsetY = this.getValue(m, "y", 0) * i, d.offsetScaleX = this.getValue(m, "scaleX", 0), d.offsetScaleY = this.getValue(m, "scaleY", 0), d.offsetShearY = this.getValue(m, "shearY", 0), d.rotateMix = this.getValue(m, "rotateMix", 1), d.translateMix = this.getValue(m, "translateMix", 1), d.scaleMix = this.getValue(m, "scaleMix", 1), d.shearMix = this.getValue(m, "shearMix", 1), n.transformConstraints.push(d)
                }
                if (o.path) for (A = 0; A < o.path.length; A++) {
                    var m = o.path[A];
                    (d = new t.PathConstraintData(m.name)).order = this.getValue(m, "order", 0);
                    for (var g = 0; g < m.bones.length; g++) {
                        var c = m.bones[g], v = n.findBone(c);
                        if (null == v) throw new Error("Transform constraint bone not found: " + c);
                        d.bones.push(v)
                    }
                    var _ = m.target;
                    if (d.target = n.findSlot(_), null == d.target) throw new Error("Path target slot not found: " + _);
                    d.positionMode = e.positionModeFromString(this.getValue(m, "positionMode", "percent")), d.spacingMode = e.spacingModeFromString(this.getValue(m, "spacingMode", "length")), d.rotateMode = e.rotateModeFromString(this.getValue(m, "rotateMode", "tangent")), d.offsetRotation = this.getValue(m, "rotation", 0), d.position = this.getValue(m, "position", 0), d.positionMode == t.PositionMode.Fixed && (d.position *= i), d.spacing = this.getValue(m, "spacing", 0), d.spacingMode != t.SpacingMode.Length && d.spacingMode != t.SpacingMode.Fixed || (d.spacing *= i), d.rotateMix = this.getValue(m, "rotateMix", 1), d.translateMix = this.getValue(m, "translateMix", 1), n.pathConstraints.push(d)
                }
                if (o.skins) for (var y in o.skins) {
                    var x = o.skins[y], b = new t.Skin(y);
                    for (var u in x) {
                        var T = n.findSlotIndex(u);
                        if (-1 == T) throw new Error("Slot not found: " + u);
                        var w = x[u];
                        for (var E in w) {
                            var S = this.readAttachment(w[E], b, T, E);
                            null != S && b.addAttachment(T, E, S)
                        }
                    }
                    n.skins.push(b), "default" == b.name && (n.defaultSkin = b)
                }
                for (var A = 0, M = this.linkedMeshes.length; A < M; A++) {
                    var C = this.linkedMeshes[A];
                    if (null == (b = null == C.skin ? n.defaultSkin : n.findSkin(C.skin))) throw new Error("Skin not found: " + C.skin);
                    var R = b.getAttachment(C.slotIndex, C.parent);
                    if (null == R) throw new Error("Parent mesh not found: " + C.parent);
                    C.mesh.setParentMesh(R)
                }
                if (this.linkedMeshes.length = 0, o.events) for (var P in o.events) {
                    var O = o.events[P];
                    (d = new t.EventData(P)).intValue = this.getValue(O, "int", 0), d.floatValue = this.getValue(O, "float", 0), d.stringValue = this.getValue(O, "string", ""), n.events.push(d)
                }
                if (o.animations) for (var D in o.animations) {
                    var I = o.animations[D];
                    this.readAnimation(I, D, n)
                }
                return n
            }, e.prototype.readAttachment = function (e, i, n, o) {
                var s = this.scale;
                switch (o = this.getValue(e, "name", o), this.getValue(e, "type", "region")) {
                    case"region":
                        var a = this.getValue(e, "path", o), l = this.attachmentLoader.newRegionAttachment(i, o, a);
                        return null == l ? null : (l.path = a, l.x = this.getValue(e, "x", 0) * s, l.y = this.getValue(e, "y", 0) * s, l.scaleX = this.getValue(e, "scaleX", 1), l.scaleY = this.getValue(e, "scaleY", 1), l.rotation = this.getValue(e, "rotation", 0), l.width = e.width * s, l.height = e.height * s, null != (g = this.getValue(e, "color", null)) && l.color.setFromString(g), l);
                    case"boundingbox":
                        var h = this.attachmentLoader.newBoundingBoxAttachment(i, o);
                        return null == h ? null : (this.readVertices(e, h, e.vertexCount << 1), null != (g = this.getValue(e, "color", null)) && h.color.setFromString(g), h);
                    case"weightedmesh":
                    case"skinnedmesh":
                    case"mesh":
                    case"linkedmesh":
                        var a = this.getValue(e, "path", o), u = this.attachmentLoader.newMeshAttachment(i, o, a);
                        if (null == u) return null;
                        u.path = a, null != (g = this.getValue(e, "color", null)) && u.color.setFromString(g);
                        var c = this.getValue(e, "parent", null);
                        if (null != c) return u.inheritDeform = this.getValue(e, "deform", !0), this.linkedMeshes.push(new r(u, this.getValue(e, "skin", null), n, c)), u;
                        var p = e.uvs;
                        return this.readVertices(e, u, p.length), u.triangles = e.triangles, u.regionUVs = p, u.hullLength = 2 * this.getValue(e, "hull", 0), u;
                    case"path":
                        if (null == (a = this.attachmentLoader.newPathAttachment(i, o))) return null;
                        a.closed = this.getValue(e, "closed", !1), a.constantSpeed = this.getValue(e, "constantSpeed", !0);
                        var d = e.vertexCount;
                        this.readVertices(e, a, d << 1);
                        for (var f = t.Utils.newArray(d / 3, 0), m = 0; m < e.lengths.length; m++) f[m++] = e.lengths[m] * s;
                        a.lengths = f;
                        var g = this.getValue(e, "color", null);
                        return null != g && a.color.setFromString(g), a
                }
                return null
            }, e.prototype.readVertices = function (e, r, i) {
                var n = this.scale;
                r.worldVerticesLength = i;
                var o = e.vertices;
                if (i != o.length) {
                    for (var s = new Array, a = new Array, l = 0, h = o.length; l < h;) {
                        var u = o[l++];
                        a.push(u);
                        for (var c = l + 4 * u; l < c; l += 4) a.push(o[l]), s.push(o[l + 1] * n), s.push(o[l + 2] * n), s.push(o[l + 3])
                    }
                    r.bones = a, r.vertices = t.Utils.toFloatArray(s)
                } else {
                    if (1 != n) for (var l = 0, h = o.length; l < h; l++) o[l] *= n;
                    r.vertices = t.Utils.toFloatArray(o)
                }
            }, e.prototype.readAnimation = function (e, r, i) {
                var n = this.scale, o = new Array, s = 0;
                if (e.slots) for (var a in e.slots) {
                    C = e.slots[a];
                    if (-1 == (q = i.findSlotIndex(a))) throw new Error("Slot not found: " + a);
                    for (var l in C) {
                        R = C[l];
                        if ("color" == l) {
                            (g = new t.ColorTimeline(R.length)).slotIndex = q;
                            for (var h = 0, u = 0; u < R.length; u++) {
                                var c = R[u], p = new t.Color;
                                p.setFromString(c.color), g.setFrame(h, c.time, p.r, p.g, p.b, p.a), this.readCurve(c, g, h), h++
                            }
                            o.push(g), s = Math.max(s, g.frames[(g.getFrameCount() - 1) * t.ColorTimeline.ENTRIES])
                        } else {
                            if (!(l = "attachment")) throw new Error("Invalid timeline type for a slot: " + l + " (" + a + ")");
                            (g = new t.AttachmentTimeline(R.length)).slotIndex = q;
                            for (var h = 0, u = 0; u < R.length; u++) {
                                c = R[u];
                                g.setFrame(h++, c.time, c.name)
                            }
                            o.push(g), s = Math.max(s, g.frames[g.getFrameCount() - 1])
                        }
                    }
                }
                if (e.bones) for (var d in e.bones) {
                    var f = e.bones[d], m = i.findBoneIndex(d);
                    if (-1 == m) throw new Error("Bone not found: " + d);
                    for (var l in f) {
                        R = f[l];
                        if ("rotate" === l) {
                            (g = new t.RotateTimeline(R.length)).boneIndex = m;
                            for (var h = 0, u = 0; u < R.length; u++) {
                                c = R[u];
                                g.setFrame(h, c.time, c.angle), this.readCurve(c, g, h), h++
                            }
                            o.push(g), s = Math.max(s, g.frames[(g.getFrameCount() - 1) * t.RotateTimeline.ENTRIES])
                        } else {
                            if ("translate" !== l && "scale" !== l && "shear" !== l) throw new Error("Invalid timeline type for a bone: " + l + " (" + d + ")");
                            var g = null, v = 1;
                            "scale" === l ? g = new t.ScaleTimeline(R.length) : "shear" === l ? g = new t.ShearTimeline(R.length) : (g = new t.TranslateTimeline(R.length), v = n), g.boneIndex = m;
                            for (var h = 0, u = 0; u < R.length; u++) {
                                var c = R[u], _ = this.getValue(c, "x", 0), y = this.getValue(c, "y", 0);
                                g.setFrame(h, c.time, _ * v, y * v), this.readCurve(c, g, h), h++
                            }
                            o.push(g), s = Math.max(s, g.frames[(g.getFrameCount() - 1) * t.TranslateTimeline.ENTRIES])
                        }
                    }
                }
                if (e.ik) for (var x in e.ik) {
                    var b = e.ik[x], T = i.findIkConstraint(x);
                    (g = new t.IkConstraintTimeline(b.length)).ikConstraintIndex = i.ikConstraints.indexOf(T);
                    for (var h = 0, u = 0; u < b.length; u++) {
                        c = b[u];
                        g.setFrame(h, c.time, this.getValue(c, "mix", 1), this.getValue(c, "bendPositive", !0) ? 1 : -1), this.readCurve(c, g, h), h++
                    }
                    o.push(g), s = Math.max(s, g.frames[(g.getFrameCount() - 1) * t.IkConstraintTimeline.ENTRIES])
                }
                if (e.transform) for (var x in e.transform) {
                    var b = e.transform[x], T = i.findTransformConstraint(x);
                    (g = new t.TransformConstraintTimeline(b.length)).transformConstraintIndex = i.transformConstraints.indexOf(T);
                    for (var h = 0, u = 0; u < b.length; u++) {
                        c = b[u];
                        g.setFrame(h, c.time, this.getValue(c, "rotateMix", 1), this.getValue(c, "translateMix", 1), this.getValue(c, "scaleMix", 1), this.getValue(c, "shearMix", 1)), this.readCurve(c, g, h), h++
                    }
                    o.push(g), s = Math.max(s, g.frames[(g.getFrameCount() - 1) * t.TransformConstraintTimeline.ENTRIES])
                }
                if (e.paths) for (var x in e.paths) {
                    var b = e.paths[x], w = i.findPathConstraintIndex(x);
                    if (-1 == w) throw new Error("Path constraint not found: " + x);
                    var E = i.pathConstraints[w];
                    for (var l in b) {
                        R = b[l];
                        if ("position" === l || "spacing" === l) {
                            var g = null, v = 1;
                            "spacing" === l ? (g = new t.PathConstraintSpacingTimeline(R.length), E.spacingMode != t.SpacingMode.Length && E.spacingMode != t.SpacingMode.Fixed || (v = n)) : (g = new t.PathConstraintPositionTimeline(R.length), E.positionMode == t.PositionMode.Fixed && (v = n)), g.pathConstraintIndex = w;
                            for (var h = 0, u = 0; u < R.length; u++) {
                                c = R[u];
                                g.setFrame(h, c.time, this.getValue(c, l, 0) * v), this.readCurve(c, g, h), h++
                            }
                            o.push(g), s = Math.max(s, g.frames[(g.getFrameCount() - 1) * t.PathConstraintPositionTimeline.ENTRIES])
                        } else if ("mix" === l) {
                            (g = new t.PathConstraintMixTimeline(R.length)).pathConstraintIndex = w;
                            for (var h = 0, u = 0; u < R.length; u++) {
                                c = R[u];
                                g.setFrame(h, c.time, this.getValue(c, "rotateMix", 1), this.getValue(c, "translateMix", 1)), this.readCurve(c, g, h), h++
                            }
                            o.push(g), s = Math.max(s, g.frames[(g.getFrameCount() - 1) * t.PathConstraintMixTimeline.ENTRIES])
                        }
                    }
                }
                if (e.deform) for (var S in e.deform) {
                    var A = e.deform[S], M = i.findSkin(S);
                    if (null == M) throw new Error("Skin not found: " + S);
                    for (var a in A) {
                        var C = A[a];
                        if (-1 == (q = i.findSlotIndex(a))) throw new Error("Slot not found: " + C.name);
                        for (var l in C) {
                            var R = C[l], P = M.getAttachment(q, l);
                            if (null == P) throw new Error("Deform attachment not found: " + R.name);
                            var O = null != P.bones, D = P.vertices, I = O ? D.length / 3 * 2 : D.length;
                            (g = new t.DeformTimeline(R.length)).slotIndex = q, g.attachment = P;
                            for (var h = 0, F = 0; F < R.length; F++) {
                                var c = R[F], L = void 0, k = this.getValue(c, "vertices", null);
                                if (null == k) L = O ? t.Utils.newFloatArray(I) : D; else {
                                    L = t.Utils.newFloatArray(I);
                                    var B = this.getValue(c, "offset", 0);
                                    if (t.Utils.arrayCopy(k, 0, L, B, k.length), 1 != n) for (var N = (u = B) + k.length; u < N; u++) L[u] *= n;
                                    if (!O) for (u = 0; u < I; u++) L[u] += D[u]
                                }
                                g.setFrame(h, c.time, L), this.readCurve(c, g, h), h++
                            }
                            o.push(g), s = Math.max(s, g.frames[g.getFrameCount() - 1])
                        }
                    }
                }
                var U = e.drawOrder;
                if (null == U && (U = e.draworder), null != U) {
                    for (var g = new t.DrawOrderTimeline(U.length), X = i.slots.length, h = 0, F = 0; F < U.length; F++) {
                        var Y = U[F], j = null, V = this.getValue(Y, "offsets", null);
                        if (null != V) {
                            j = t.Utils.newArray(X, -1);
                            for (var W = t.Utils.newArray(X - V.length, 0), G = 0, z = 0, u = 0; u < V.length; u++) {
                                var H = V[u], q = i.findSlotIndex(H.slot);
                                if (-1 == q) throw new Error("Slot not found: " + H.slot);
                                for (; G != q;) W[z++] = G++;
                                j[G + H.offset] = G++
                            }
                            for (; G < X;) W[z++] = G++;
                            for (u = X - 1; u >= 0; u--) -1 == j[u] && (j[u] = W[--z])
                        }
                        g.setFrame(h++, Y.time, j)
                    }
                    o.push(g), s = Math.max(s, g.frames[g.getFrameCount() - 1])
                }
                if (e.events) {
                    for (var g = new t.EventTimeline(e.events.length), h = 0, u = 0; u < e.events.length; u++) {
                        var Z = e.events[u], K = i.findEvent(Z.name);
                        if (null == K) throw new Error("Event not found: " + Z.name);
                        var Q = new t.Event(Z.time, K);
                        Q.intValue = this.getValue(Z, "int", K.intValue), Q.floatValue = this.getValue(Z, "float", K.floatValue), Q.stringValue = this.getValue(Z, "string", K.stringValue), g.setFrame(h++, Q)
                    }
                    o.push(g), s = Math.max(s, g.frames[g.getFrameCount() - 1])
                }
                if (isNaN(s)) throw new Error("Error while parsing animation, duration is NaN");
                i.animations.push(new t.Animation(r, o, s))
            }, e.prototype.readCurve = function (t, e, r) {
                if (t.curve) if ("stepped" === t.curve) e.setStepped(r); else if ("[object Array]" === Object.prototype.toString.call(t.curve)) {
                    var i = t.curve;
                    e.setCurve(r, i[0], i[1], i[2], i[3])
                }
            }, e.prototype.getValue = function (t, e, r) {
                return void 0 !== t[e] ? t[e] : r
            }, e.blendModeFromString = function (t) {
                if ("multiply" === t) return PIXI.BLEND_MODES.MULTIPLY;
                if ("additive" === t) return PIXI.BLEND_MODES.ADD;
                if ("screen" === t) return PIXI.BLEND_MODES.SCREEN;
                if ("normal" === t) return PIXI.BLEND_MODES.NORMAL;
                throw new Error("Unknown blend mode: " + t)
            }, e.positionModeFromString = function (e) {
                if ("fixed" == (e = e.toLowerCase())) return t.PositionMode.Fixed;
                if ("percent" == e) return t.PositionMode.Percent;
                throw new Error("Unknown position mode: " + e)
            }, e.spacingModeFromString = function (e) {
                if ("length" == (e = e.toLowerCase())) return t.SpacingMode.Length;
                if ("fixed" == e) return t.SpacingMode.Fixed;
                if ("percent" == e) return t.SpacingMode.Percent;
                throw new Error("Unknown position mode: " + e)
            }, e.rotateModeFromString = function (e) {
                if ("tangent" == (e = e.toLowerCase())) return t.RotateMode.Tangent;
                if ("chain" == e) return t.RotateMode.Chain;
                if ("chainscale" == e) return t.RotateMode.ChainScale;
                throw new Error("Unknown rotate mode: " + e)
            }, e.transformModeFromString = function (e) {
                if ("normal" == (e = e.toLowerCase())) return t.TransformMode.Normal;
                if ("onlytranslation" == e) return t.TransformMode.OnlyTranslation;
                if ("norotationorreflection" == e) return t.TransformMode.NoRotationOrReflection;
                if ("noscale" == e) return t.TransformMode.NoScale;
                if ("noscaleorreflection" == e) return t.TransformMode.NoScaleOrReflection;
                throw new Error("Unknown transform mode: " + e)
            }, e.transformModeLegacy = function (e, r) {
                return console.log("Deprecation Warning: re-export your model with spine 3.5, or downgrade to pixi-spine 1.1 branch. There were many breaking changes, place breakpoint here if you want to know which model is broken"), e && r ? t.TransformMode.Normal : e ? t.TransformMode.NoScaleOrReflection : r ? t.TransformMode.NoRotationOrReflection : t.TransformMode.OnlyTranslation
            }, e
        }();
        t.SkeletonJson = e;
        var r = function () {
            return function (t, e, r, i) {
                this.mesh = t, this.skin = e, this.slotIndex = r, this.parent = i
            }
        }()
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function t(t) {
                if (this.attachments = new Array, null == t) throw new Error("name cannot be null.");
                this.name = t
            }

            return t.prototype.addAttachment = function (t, e, r) {
                if (null == r) throw new Error("attachment cannot be null.");
                var i = this.attachments;
                t >= i.length && (i.length = t + 1), i[t] || (i[t] = {}), i[t][e] = r
            }, t.prototype.getAttachment = function (t, e) {
                var r = this.attachments[t];
                return r ? r[e] : null
            }, t.prototype.attachAll = function (t, e) {
                for (var r = 0, i = 0; i < t.slots.length; i++) {
                    var n = t.slots[i], o = n.getAttachment();
                    if (o && r < e.attachments.length) {
                        var s = e.attachments[r];
                        for (var a in s) if (o == s[a]) {
                            var l = this.getAttachment(r, name);
                            null != l && n.setAttachment(l);
                            break
                        }
                    }
                    r++
                }
            }, t
        }();
        t.Skin = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(e, r) {
                if (this.attachmentVertices = new Array, null == e) throw new Error("data cannot be null.");
                if (null == r) throw new Error("bone cannot be null.");
                this.data = e, this.bone = r, this.color = new t.Color, this.blendMode = e.blendMode, this.setToSetupPose()
            }

            return e.prototype.getAttachment = function () {
                return this.attachment
            }, e.prototype.setAttachment = function (t) {
                this.attachment != t && (this.attachment = t, this.attachmentTime = this.bone.skeleton.time, this.attachmentVertices.length = 0)
            }, e.prototype.setAttachmentTime = function (t) {
                this.attachmentTime = this.bone.skeleton.time - t
            }, e.prototype.getAttachmentTime = function () {
                return this.bone.skeleton.time - this.attachmentTime
            }, e.prototype.setToSetupPose = function () {
                this.color.setFromColor(this.data.color), null == this.data.attachmentName ? this.attachment = null : (this.attachment = null, this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName)))
            }, e
        }();
        t.Slot = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (e, r, i) {
                if (this.color = new t.Color(1, 1, 1, 1), e < 0) throw new Error("index must be >= 0.");
                if (null == r) throw new Error("name cannot be null.");
                if (null == i) throw new Error("boneData cannot be null.");
                this.index = e, this.name = r, this.boneData = i
            }
        }();
        t.SlotData = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function t(t) {
                this._image = t
            }

            return t.prototype.getImage = function () {
                return this._image
            }, t.filterFromString = function (t) {
                switch (t.toLowerCase()) {
                    case"nearest":
                        return r.Nearest;
                    case"linear":
                        return r.Linear;
                    case"mipmap":
                        return r.MipMap;
                    case"mipmapnearestnearest":
                        return r.MipMapNearestNearest;
                    case"mipmaplinearnearest":
                        return r.MipMapLinearNearest;
                    case"mipmapnearestlinear":
                        return r.MipMapNearestLinear;
                    case"mipmaplinearlinear":
                        return r.MipMapLinearLinear;
                    default:
                        throw new Error("Unknown texture filter " + t)
                }
            }, t.wrapFromString = function (t) {
                switch (t.toLowerCase()) {
                    case"mirroredtepeat":
                        return i.MirroredRepeat;
                    case"clamptoedge":
                        return i.ClampToEdge;
                    case"repeat":
                        return i.Repeat;
                    default:
                        throw new Error("Unknown texture wrap " + t)
                }
            }, t
        }();
        t.Texture = e;
        var r;
        !function (t) {
            t[t.Nearest = 9728] = "Nearest", t[t.Linear = 9729] = "Linear", t[t.MipMap = 9987] = "MipMap", t[t.MipMapNearestNearest = 9984] = "MipMapNearestNearest", t[t.MipMapLinearNearest = 9985] = "MipMapLinearNearest", t[t.MipMapNearestLinear = 9986] = "MipMapNearestLinear", t[t.MipMapLinearLinear = 9987] = "MipMapLinearLinear"
        }(r = t.TextureFilter || (t.TextureFilter = {}));
        var i;
        !function (t) {
            t[t.MirroredRepeat = 33648] = "MirroredRepeat", t[t.ClampToEdge = 33071] = "ClampToEdge", t[t.Repeat = 10497] = "Repeat"
        }(i = t.TextureWrap || (t.TextureWrap = {}));
        var n = function () {
            function t() {
                this.size = null
            }

            return Object.defineProperty(t.prototype, "width", {
                get: function () {
                    var t = this.texture;
                    return "3" == PIXI.VERSION[0] ? t.crop.width : t.trim ? t.trim.width : t.orig.width
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "height", {
                get: function () {
                    var t = this.texture;
                    return "3" == PIXI.VERSION[0] ? t.crop.height : t.trim ? t.trim.height : t.orig.height
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "u", {
                get: function () {
                    return this.texture._uvs.x0
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "v", {
                get: function () {
                    return this.texture._uvs.y0
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "u2", {
                get: function () {
                    return this.texture._uvs.x2
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "v2", {
                get: function () {
                    return this.texture._uvs.y2
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "offsetX", {
                get: function () {
                    var t = this.texture;
                    return t.trim ? t.trim.x : 0
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "offsetY", {
                get: function () {
                    return console.warn("Deprecation Warning: @Hackerham: I guess, if you are using PIXI-SPINE ATLAS region.offsetY, you want a texture, right? Use region.texture from now on."), this.spineOffsetY
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "pixiOffsetY", {
                get: function () {
                    var t = this.texture;
                    return t.trim ? t.trim.y : 0
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "spineOffsetY", {
                get: function () {
                    var t = this.texture;
                    return this.originalHeight - this.height - (t.trim ? t.trim.y : 0)
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "originalWidth", {
                get: function () {
                    var t = this.texture;
                    return "3" == PIXI.VERSION[0] ? t.trim ? t.trim.width : t.crop.width : t.orig.width
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "originalHeight", {
                get: function () {
                    var t = this.texture;
                    return "3" == PIXI.VERSION[0] ? t.trim ? t.trim.height : t.crop.height : t.orig.height
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "x", {
                get: function () {
                    return this.texture.frame.x
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "y", {
                get: function () {
                    return this.texture.frame.y
                }, enumerable: !0, configurable: !0
            }), Object.defineProperty(t.prototype, "rotate", {
                get: function () {
                    return 0 !== this.texture.rotate
                }, enumerable: !0, configurable: !0
            }), t
        }();
        t.TextureRegion = n
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(t, e, r) {
                this.pages = new Array, this.regions = new Array, t && this.addSpineAtlas(t, e, r)
            }

            return e.prototype.addTexture = function (e, r) {
                for (var o = this.pages, s = null, a = 0; a < o.length; a++) if (o[a].baseTexture === r.baseTexture) {
                    s = o[a];
                    break
                }
                if (null === s) {
                    (s = new i).name = "texturePage";
                    var l = r.baseTexture;
                    s.width = l.realWidth, s.height = l.realHeight, s.baseTexture = l, s.minFilter = s.magFilter = t.TextureFilter.Nearest, s.uWrap = t.TextureWrap.ClampToEdge, s.vWrap = t.TextureWrap.ClampToEdge, o.push(s)
                }
                var h = new n;
                return h.name = e, h.page = s, h.texture = r, h.index = -1, this.regions.push(h), h
            }, e.prototype.addTextureHash = function (t, e) {
                for (var r in t) t.hasOwnProperty(r) && this.addTexture(e && -1 !== r.indexOf(".") ? r.substr(0, r.lastIndexOf(".")) : r, t[r])
            }, e.prototype.addSpineAtlas = function (t, e, r) {
                return this.load(t, e, r)
            }, e.prototype.load = function (e, o, s) {
                var a = this;
                if (null == o) throw new Error("textureLoader cannot be null.");
                var l = new r(e), h = new Array(4), u = null, c = function () {
                    for (; ;) {
                        var e = l.readLine();
                        if (null == e) return s && s(a);
                        if (0 == (e = e.trim()).length) u = null; else {
                            if (!u) {
                                (u = new i).name = e, 2 == l.readTuple(h) && (u.width = parseInt(h[0]), u.height = parseInt(h[1]), l.readTuple(h)), l.readTuple(h), u.minFilter = t.Texture.filterFromString(h[0]), u.magFilter = t.Texture.filterFromString(h[1]);
                                var r = l.readValue();
                                u.uWrap = t.TextureWrap.ClampToEdge, u.vWrap = t.TextureWrap.ClampToEdge, "x" == r ? u.uWrap = t.TextureWrap.Repeat : "y" == r ? u.vWrap = t.TextureWrap.Repeat : "xy" == r && (u.uWrap = u.vWrap = t.TextureWrap.Repeat), o(e, function (t) {
                                    u.baseTexture = t, t.hasLoaded || (t.width = u.width, t.height = u.height), a.pages.push(u), u.setFilters(), u.width && u.height || (u.width = t.realWidth, u.height = t.realHeight, u.width && u.height || console.log("ERROR spine atlas page " + u.name + ": meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)")), c()
                                }), a.pages.push(u);
                                break
                            }
                            var p = new n;
                            p.name = e, p.page = u;
                            var d = "true" == l.readValue() ? 6 : 0;
                            l.readTuple(h);
                            var f = parseInt(h[0]), m = parseInt(h[1]);
                            l.readTuple(h);
                            var g = parseInt(h[0]), v = parseInt(h[1]), _ = u.baseTexture.resolution;
                            f /= _, m /= _, g /= _, v /= _;
                            var y = new PIXI.Rectangle(f, m, d ? v : g, d ? g : v);
                            4 == l.readTuple(h) && 4 == l.readTuple(h) && l.readTuple(h);
                            var x = parseInt(h[0]) / _, b = parseInt(h[1]) / _;
                            l.readTuple(h);
                            var T = parseInt(h[0]) / _, w = parseInt(h[1]) / _, E = new PIXI.Rectangle(0, 0, x, b),
                                S = new PIXI.Rectangle(T, b - v - w, g, v);
                            if ("4" == PIXI.VERSION[0]) p.texture = new PIXI.Texture(p.page.baseTexture, y, E, S, d); else {
                                var A = new PIXI.Rectangle(f, m, g, v), M = A.clone();
                                S.width = x, S.height = b, p.texture = new PIXI.Texture(p.page.baseTexture, A, M, S, d)
                            }
                            p.index = parseInt(l.readValue()), p.texture._updateUvs(), a.regions.push(p)
                        }
                    }
                };
                c()
            }, e.prototype.findRegion = function (t) {
                for (var e = 0; e < this.regions.length; e++) if (this.regions[e].name == t) return this.regions[e];
                return null
            }, e.prototype.dispose = function () {
                for (var t = 0; t < this.pages.length; t++) this.pages[t].baseTexture.dispose()
            }, e
        }();
        t.TextureAtlas = e;
        var r = function () {
            function t(t) {
                this.index = 0, this.lines = t.split(/\r\n|\r|\n/)
            }

            return t.prototype.readLine = function () {
                return this.index >= this.lines.length ? null : this.lines[this.index++]
            }, t.prototype.readValue = function () {
                var t = this.readLine(), e = t.indexOf(":");
                if (-1 == e) throw new Error("Invalid line: " + t);
                return t.substring(e + 1).trim()
            }, t.prototype.readTuple = function (t) {
                var e = this.readLine(), r = e.indexOf(":");
                if (-1 == r) throw new Error("Invalid line: " + e);
                for (var i = 0, n = r + 1; i < 3; i++) {
                    var o = e.indexOf(",", n);
                    if (-1 == o) break;
                    t[i] = e.substr(n, o - n).trim(), n = o + 1
                }
                return t[i] = e.substring(n).trim(), i + 1
            }, t
        }(), i = function () {
            function e() {
            }

            return e.prototype.setFilters = function () {
                var e = this.baseTexture, r = this.minFilter;
                r == t.TextureFilter.Linear ? e.scaleMode = PIXI.SCALE_MODES.LINEAR : this.minFilter == t.TextureFilter.Nearest ? e.scaleMode = PIXI.SCALE_MODES.NEAREST : (e.mipmap = !0, r == t.TextureFilter.MipMapNearestNearest ? e.scaleMode = PIXI.SCALE_MODES.NEAREST : e.scaleMode = PIXI.SCALE_MODES.LINEAR)
            }, e
        }();
        t.TextureAtlasPage = i;
        var n = function (t) {
            function e() {
                return null !== t && t.apply(this, arguments) || this
            }

            return __extends(e, t), e
        }(t.TextureRegion);
        t.TextureAtlasRegion = n
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function e(e, r) {
                if (this.rotateMix = 0, this.translateMix = 0, this.scaleMix = 0, this.shearMix = 0, this.temp = new t.Vector2, null == e) throw new Error("data cannot be null.");
                if (null == r) throw new Error("skeleton cannot be null.");
                this.data = e, this.rotateMix = e.rotateMix, this.translateMix = e.translateMix, this.scaleMix = e.scaleMix, this.shearMix = e.shearMix, this.bones = new Array;
                for (var i = 0; i < e.bones.length; i++) this.bones.push(r.findBone(e.bones[i].name));
                this.target = r.findBone(e.target.name)
            }

            return e.prototype.apply = function () {
                this.update()
            }, e.prototype.update = function () {
                for (var e = this.rotateMix, r = this.translateMix, i = this.scaleMix, n = this.shearMix, o = this.target, s = o.matrix.a, a = o.matrix.c, l = o.matrix.b, h = o.matrix.d, u = this.bones, c = 0, p = u.length; c < p; c++) {
                    var d = u[c], f = d.matrix, m = !1;
                    if (0 != e) {
                        var g = f.a, v = f.c, _ = f.b, y = f.d;
                        (A = Math.atan2(l, s) - Math.atan2(_, g) + this.data.offsetRotation * t.MathUtils.degRad) > t.MathUtils.PI ? A -= t.MathUtils.PI2 : A < -t.MathUtils.PI && (A += t.MathUtils.PI2), A *= e;
                        var x = Math.cos(A), b = Math.sin(A);
                        f.a = x * g - b * _, f.c = x * v - b * y, f.b = b * g + x * _, f.d = b * v + x * y, m = !0
                    }
                    if (0 != r) {
                        var T = this.temp;
                        o.localToWorld(T.set(this.data.offsetX, this.data.offsetY)), f.tx += (T.x - f.tx) * r, f.ty += (T.y - f.ty) * r, m = !0
                    }
                    if (i > 0) {
                        var w = Math.sqrt(f.a * f.a + f.b * f.b), E = Math.sqrt(s * s + l * l);
                        w > 1e-5 && (w = (w + (E - w + this.data.offsetScaleX) * i) / w), f.a *= w, f.b *= w, w = Math.sqrt(f.c * f.c + f.d * f.d), E = Math.sqrt(a * a + h * h), w > 1e-5 && (w = (w + (E - w + this.data.offsetScaleY) * i) / w), f.c *= w, f.d *= w, m = !0
                    }
                    if (n > 0) {
                        var v = f.c, y = f.d, S = Math.atan2(y, v),
                            A = Math.atan2(h, a) - Math.atan2(l, s) - (S - Math.atan2(f.b, f.a));
                        A > t.MathUtils.PI ? A -= t.MathUtils.PI2 : A < -t.MathUtils.PI && (A += t.MathUtils.PI2), A = S + (A + this.data.offsetShearY * t.MathUtils.degRad) * n;
                        w = Math.sqrt(v * v + y * y);
                        f.c = Math.cos(A) * w, f.d = Math.sin(A) * w, m = !0
                    }
                    m && (d.appliedValid = !1)
                }
            }, e.prototype.getOrder = function () {
                return this.data.order
            }, e
        }();
        t.TransformConstraint = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            return function (t) {
                if (this.order = 0, this.bones = new Array, this.rotateMix = 0, this.translateMix = 0, this.scaleMix = 0, this.shearMix = 0, this.offsetRotation = 0, this.offsetX = 0, this.offsetY = 0, this.offsetScaleX = 0, this.offsetScaleY = 0, this.offsetShearY = 0, null == t) throw new Error("name cannot be null.");
                this.name = t
            }
        }();
        t.TransformConstraintData = e
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    !function (t) {
        var e = function () {
            function t() {
                this.array = new Array
            }

            return t.prototype.add = function (t) {
                var e = this.contains(t);
                return this.array[0 | t] = 0 | t, !e
            }, t.prototype.contains = function (t) {
                return void 0 != this.array[0 | t]
            }, t.prototype.remove = function (t) {
                this.array[0 | t] = void 0
            }, t.prototype.clear = function () {
                this.array.length = 0
            }, t
        }();
        t.IntSet = e;
        var r = function () {
            function t(t, e, r, i) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === i && (i = 0), this.r = t, this.g = e, this.b = r, this.a = i
            }

            return t.prototype.set = function (t, e, r, i) {
                return this.r = t, this.g = e, this.b = r, this.a = i, this.clamp(), this
            }, t.prototype.setFromColor = function (t) {
                return this.r = t.r, this.g = t.g, this.b = t.b, this.a = t.a, this
            }, t.prototype.setFromString = function (t) {
                return t = "#" == t.charAt(0) ? t.substr(1) : t, this.r = parseInt(t.substr(0, 2), 16) / 255, this.g = parseInt(t.substr(2, 2), 16) / 255, this.b = parseInt(t.substr(4, 2), 16) / 255, this.a = (8 != t.length ? 255 : parseInt(t.substr(6, 2), 16)) / 255, this
            }, t.prototype.add = function (t, e, r, i) {
                return this.r += t, this.g += e, this.b += r, this.a += i, this.clamp(), this
            }, t.prototype.clamp = function () {
                return this.r < 0 ? this.r = 0 : this.r > 1 && (this.r = 1), this.g < 0 ? this.g = 0 : this.g > 1 && (this.g = 1), this.b < 0 ? this.b = 0 : this.b > 1 && (this.b = 1), this.a < 0 ? this.a = 0 : this.a > 1 && (this.a = 1), this
            }, t
        }();
        r.WHITE = new r(1, 1, 1, 1), r.RED = new r(1, 0, 0, 1), r.GREEN = new r(0, 1, 0, 1), r.BLUE = new r(0, 0, 1, 1), r.MAGENTA = new r(1, 0, 1, 1), t.Color = r;
        var i = function () {
            function t() {
            }

            return t.clamp = function (t, e, r) {
                return t < e ? e : t > r ? r : t
            }, t.cosDeg = function (e) {
                return Math.cos(e * t.degRad)
            }, t.sinDeg = function (e) {
                return Math.sin(e * t.degRad)
            }, t.signum = function (t) {
                return t > 0 ? 1 : t < 0 ? -1 : 0
            }, t.toInt = function (t) {
                return t > 0 ? Math.floor(t) : Math.ceil(t)
            }, t.cbrt = function (t) {
                var e = Math.pow(Math.abs(t), 1 / 3);
                return t < 0 ? -e : e
            }, t
        }();
        i.PI = 3.1415927, i.PI2 = 2 * i.PI, i.radiansToDegrees = 180 / i.PI, i.radDeg = i.radiansToDegrees, i.degreesToRadians = i.PI / 180, i.degRad = i.degreesToRadians, t.MathUtils = i;
        var n = function () {
            function t() {
            }

            return t.arrayCopy = function (t, e, r, i, n) {
                for (var o = e, s = i; o < e + n; o++, s++) r[s] = t[o]
            }, t.setArraySize = function (t, e, r) {
                void 0 === r && (r = 0);
                var i = t.length;
                if (i == e) return t;
                if (t.length = e, i < e) for (var n = i; n < e; n++) t[n] = r;
                return t
            }, t.ensureArrayCapacity = function (e, r, i) {
                return void 0 === i && (i = 0), e.length >= r ? e : t.setArraySize(e, r, i)
            }, t.newArray = function (t, e) {
                for (var r = new Array(t), i = 0; i < t; i++) r[i] = e;
                return r
            }, t.newFloatArray = function (e) {
                if (t.SUPPORTS_TYPED_ARRAYS) return new Float32Array(e);
                for (var r = new Array(e), i = 0; i < r.length; i++) r[i] = 0;
                return r
            }, t.toFloatArray = function (e) {
                return t.SUPPORTS_TYPED_ARRAYS ? new Float32Array(e) : e
            }, t
        }();
        n.SUPPORTS_TYPED_ARRAYS = "undefined" != typeof Float32Array, t.Utils = n;
        var o = function () {
            function t() {
            }

            return t.logBones = function (t) {
                for (var e = 0; e < t.bones.length; e++) {
                    var r = t.bones[e], i = r.matrix;
                    console.log(r.data.name + ", " + i.a + ", " + i.b + ", " + i.c + ", " + i.d + ", " + i.tx + ", " + i.ty)
                }
            }, t
        }();
        t.DebugUtils = o;
        var s = function () {
            function t(t) {
                this.items = new Array, this.instantiator = t
            }

            return t.prototype.obtain = function () {
                return this.items.length > 0 ? this.items.pop() : this.instantiator()
            }, t.prototype.free = function (t) {
                t.reset && t.reset(), this.items.push(t)
            }, t.prototype.freeAll = function (t) {
                for (var e = 0; e < t.length; e++) t[e].reset && t[e].reset(), this.items[e] = t[e]
            }, t.prototype.clear = function () {
                this.items.length = 0
            }, t
        }();
        t.Pool = s;
        var a = function () {
            function t(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = t, this.y = e
            }

            return t.prototype.set = function (t, e) {
                return this.x = t, this.y = e, this
            }, t.prototype.length = function () {
                var t = this.x, e = this.y;
                return Math.sqrt(t * t + e * e)
            }, t.prototype.normalize = function () {
                var t = this.length();
                return 0 != t && (this.x /= t, this.y /= t), this
            }, t
        }();
        t.Vector2 = a;
        var l = function () {
            function t() {
                this.maxDelta = .064, this.framesPerSecond = 0, this.delta = 0, this.totalTime = 0, this.lastTime = Date.now() / 1e3, this.frameCount = 0, this.frameTime = 0
            }

            return t.prototype.update = function () {
                var t = Date.now() / 1e3;
                this.delta = t - this.lastTime, this.frameTime += this.delta, this.totalTime += this.delta, this.delta > this.maxDelta && (this.delta = this.maxDelta), this.lastTime = t, this.frameCount++, this.frameTime > 1 && (this.framesPerSecond = this.frameCount / this.frameTime, this.frameTime = 0, this.frameCount = 0)
            }, t
        }();
        t.TimeKeeper = l
    }(t.core || (t.core = {}))
}(pixi_spine || (pixi_spine = {})), function (t) {
    function e(t) {
        var e = PIXI.loaders.Resource.TYPE;
        return e ? t.type === e.JSON : t.isJson
    }

    function r() {
        return function (r, n) {
            if (!r.data || !e(r) || !r.data.bones) return n();
            var o = r.metadata ? r.metadata.spineSkeletonScale : null, s = r.metadata ? r.metadata.spineAtlas : null;
            if (!1 === s) return n();
            if (s && s.pages) {
                var a = new t.core.SkeletonJson(new t.core.AtlasAttachmentLoader(s)).readSkeletonData(r.data);
                return r.spineData = a, r.spineAtlas = s, n()
            }
            var l = ".atlas";
            r.metadata && r.metadata.spineAtlasSuffix && (l = r.metadata.spineAtlasSuffix);
            var h = r.url.substr(0, r.url.lastIndexOf(".")) + l;
            h = h.replace(this.baseUrl, "");
            var u = {
                crossOrigin: r.crossOrigin, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
                metadata: r.metadata ? r.metadata.spineMetadata : null, parentResource: r
            }, c = {
                crossOrigin: r.crossOrigin, metadata: r.metadata ? r.metadata.imageMetadata : null, parentResource: r
            }, p = r.url.substr(0, r.url.lastIndexOf("/") + 1);
            p = p.replace(this.baseUrl, "");
            var d = i(this, r.name + "_atlas_page_", p, c);
            this.add(r.name + "_atlas", h, u, function (e) {
                new t.core.TextureAtlas(e.xhr.responseText, d, function (e) {
                    var i = new t.core.SkeletonJson(new t.core.AtlasAttachmentLoader(e));
                    o && (i.scale = o);
                    var s = i.readSkeletonData(r.data);
                    r.spineData = s, r.spineAtlas = e, n()
                })
            })
        }
    }

    function i(t, e, r, i) {
        return r && r.lastIndexOf("/") !== r.length - 1 && (r += "/"), function (n, o) {
            var s = e + n, a = r + n;
            t.add(s, a, i, function (t) {
                o(t.texture.baseTexture)
            })
        }
    }

    t.atlasParser = r, t.imageLoaderAdapter = i, t.syncImageLoaderAdapter = function (t, e) {
        return t && t.lastIndexOf("/") !== t.length - 1 && (t += "/"), function (t, r) {
            r(PIXI.BaseTexture.fromImage(t, e))
        }
    }, PIXI.loaders.Loader.addPixiMiddleware(r), PIXI.loader.use(r())
}(pixi_spine || (pixi_spine = {})), function (t) {
    function e() {
        var t = this.parent.worldTransform, e = this.worldTransform, r = this.localTransform;
        e.a = r.a * t.a + r.b * t.c, e.b = r.a * t.b + r.b * t.d, e.c = r.c * t.a + r.d * t.c, e.d = r.c * t.b + r.d * t.d, e.tx = r.tx * t.a + r.ty * t.c + t.tx, e.ty = r.tx * t.b + r.ty * t.d + t.ty, this.worldAlpha = this.alpha * this.parent.worldAlpha, this._currentBounds = null
    }

    t.core.Bone.yDown = !0;
    var r = [0, 0, 0], i = function (t) {
        function e(e) {
            return t.call(this, e) || this
        }

        return __extends(e, t), e
    }(PIXI.Sprite);
    t.SpineSprite = i;
    var n = function (t) {
        function e(e, r, i, n, o) {
            return t.call(this, e, r, i, n, o) || this
        }

        return __extends(e, t), e
    }(PIXI.mesh.Mesh);
    t.SpineMesh = n;
    var o = function (o) {
        function s(e) {
            var r = o.call(this) || this;
            if (r.hackTextureBySlotName = function (t, e, r) {
                void 0 === e && (e = null), void 0 === r && (r = null);
                var i = this.skeleton.findSlotIndex(t);
                return -1 != i && this.hackTextureBySlotIndex(i, e, r)
            }, !e) throw new Error("The spineData param is required.");
            if ("string" == typeof e) throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
            r.spineData = e, r.skeleton = new t.core.Skeleton(e), r.skeleton.updateWorldTransform(), r.stateData = new t.core.AnimationStateData(e), r.state = new t.core.AnimationState(r.stateData), r.slotContainers = [];
            for (var i = 0, n = r.skeleton.slots.length; i < n; i++) {
                var s = r.skeleton.slots[i], a = s.attachment, l = new PIXI.Container;
                if (r.slotContainers.push(l), r.addChild(l), a instanceof t.core.RegionAttachment) {
                    var h = a.region.name, u = r.createSprite(s, a, h);
                    s.currentSprite = u, s.currentSpriteName = h, l.addChild(u)
                } else {
                    if (!(a instanceof t.core.MeshAttachment)) continue;
                    var c = r.createMesh(s, a);
                    s.currentMesh = c, s.currentMeshName = a.name, l.addChild(c)
                }
            }
            return r.autoUpdate = !0, r.tintRgb = new Float32Array([1, 1, 1]), r
        }

        return __extends(s, o), Object.defineProperty(s.prototype, "autoUpdate", {
            get: function () {
                return this.updateTransform === s.prototype.autoUpdateTransform
            }, set: function (t) {
                this.updateTransform = t ? s.prototype.autoUpdateTransform : PIXI.Container.prototype.updateTransform
            }, enumerable: !0, configurable: !0
        }), Object.defineProperty(s.prototype, "tint", {
            get: function () {
                return PIXI.utils.rgb2hex(this.tintRgb)
            }, set: function (t) {
                this.tintRgb = PIXI.utils.hex2rgb(t, this.tintRgb)
            }, enumerable: !0, configurable: !0
        }), s.prototype.update = function (i) {
            this.state.update(i), this.state.apply(this.skeleton), this.skeleton.updateWorldTransform();
            for (var n = this.skeleton.drawOrder, o = this.skeleton.slots, s = 0, a = n.length; s < a; s++) this.children[s] = this.slotContainers[n[s].data.index];
            var l = this.tintRgb[0], h = this.tintRgb[1], u = this.tintRgb[2];
            for (s = 0, a = o.length; s < a; s++) {
                var c = o[s], p = c.attachment, d = this.slotContainers[s];
                if (p) {
                    var f = p.color;
                    if (p instanceof t.core.RegionAttachment) {
                        var m = p.region;
                        if (m) {
                            c.currentMesh && (c.currentMesh.visible = !1, c.currentMesh = null, c.currentMeshName = void 0);
                            var g = m;
                            if (!c.currentSpriteName || c.currentSpriteName !== g.name) {
                                var v = g.name;
                                if (c.currentSprite && (c.currentSprite.visible = !1), c.sprites = c.sprites || {}, void 0 !== c.sprites[v]) c.sprites[v].visible = !0; else {
                                    var _ = this.createSprite(c, p, v);
                                    d.addChild(_)
                                }
                                c.currentSprite = c.sprites[v], c.currentSpriteName = v
                            }
                        }
                        if (d.transform) {
                            var y = d.transform, x = y, b = void 0;
                            x.matrix2d ? (b = x.matrix2d, x._dirtyVersion++, x.version = x._dirtyVersion, x.isStatic = !0, x.operMode = 0) : (x.position && (y = new PIXI.TransformBase, d.transform = y), b = y.localTransform), c.bone.matrix.copy(b)
                        } else {
                            var T = d.localTransform || new PIXI.Matrix;
                            c.bone.matrix.copy(T), d.localTransform = T, d.displayObjectUpdateTransform = e
                        }
                        r[0] = l * c.color.r * f.r, r[1] = h * c.color.g * f.g, r[2] = u * c.color.b * f.b, c.currentSprite.tint = PIXI.utils.rgb2hex(r), c.currentSprite.blendMode = c.blendMode
                    } else {
                        if (!(p instanceof t.core.MeshAttachment)) {
                            d.visible = !1;
                            continue
                        }
                        if (c.currentSprite && (c.currentSprite.visible = !1, c.currentSprite = null, c.currentSpriteName = void 0, d.transform ? d.transform = new PIXI.TransformStatic : (d.localTransform = new PIXI.Matrix, d.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform)), !c.currentMeshName || c.currentMeshName !== p.name) {
                            var w = p.name;
                            if (c.currentMesh && (c.currentMesh.visible = !1), c.meshes = c.meshes || {}, void 0 !== c.meshes[w]) c.meshes[w].visible = !0; else {
                                var E = this.createMesh(c, p);
                                d.addChild(E)
                            }
                            c.currentMesh = c.meshes[w], c.currentMeshName = w
                        }
                        if (p.computeWorldVertices(c, c.currentMesh.vertices), "3" !== PIXI.VERSION[0]) {
                            var S = c.currentMesh.tintRgb;
                            S[0] = l * c.color.r * f.r, S[1] = h * c.color.g * f.g, S[2] = u * c.color.b * f.b
                        }
                        c.currentMesh.blendMode = c.blendMode
                    }
                    d.visible = !0, d.alpha = c.color.a
                } else d.visible = !1
            }
        }, s.prototype.setSpriteRegion = function (t, e, r) {
            e.region = r, e.texture = r.texture, r.size ? (e.scale.x = r.size.width / r.originalWidth, e.scale.y = -r.size.height / r.originalHeight) : (e.scale.x = t.scaleX * t.width / r.originalWidth, e.scale.y = -t.scaleY * t.height / r.originalHeight)
        }, s.prototype.setMeshRegion = function (t, e, r) {
            e.region = r, e.texture = r.texture, t.updateUVs(r, e.uvs), e.dirty++
        }, s.prototype.autoUpdateTransform = function () {
            if (s.globalAutoUpdate) {
                this.lastTime = this.lastTime || Date.now();
                var t = .001 * (Date.now() - this.lastTime);
                this.lastTime = Date.now(), this.update(t)
            } else this.lastTime = 0;
            PIXI.Container.prototype.updateTransform.call(this)
        }, s.prototype.createSprite = function (e, r, n) {
            var o = r.region;
            e.tempAttachment === r && (o = e.tempRegion, e.tempAttachment = null, e.tempRegion = null);
            var s = o.texture, a = new i(s);
            return a.rotation = r.rotation * t.core.MathUtils.degRad, a.anchor.x = .5, a.anchor.y = .5, a.position.x = r.x, a.position.y = r.y, a.alpha = r.color.a, a.region = r.region, this.setSpriteRegion(r, a, r.region), e.sprites = e.sprites || {}, e.sprites[n] = a, a
        }, s.prototype.createMesh = function (t, e) {
            var r = e.region;
            t.tempAttachment === e && (r = t.tempRegion, t.tempAttachment = null, t.tempRegion = null);
            var i = new n(r.texture, new Float32Array(e.regionUVs.length), new Float32Array(e.regionUVs.length), new Uint16Array(e.triangles), PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);
            return i.canvasPadding = 1.5, i.alpha = e.color.a, i.region = e.region, this.setMeshRegion(e, i, r), t.meshes = t.meshes || {}, t.meshes[e.name] = i, i
        }, s.prototype.hackTextureBySlotIndex = function (e, r, i) {
            void 0 === r && (r = null), void 0 === i && (i = null);
            var n = this.skeleton.slots[e];
            if (!n) return !1;
            var o = n.attachment, s = o.region;
            return r && ((s = new t.core.TextureRegion).texture = r, s.size = i), n.currentSprite && n.currentSprite.region != s ? (this.setSpriteRegion(o, n.currentSprite, s), n.currentSprite.region = s) : n.currentMesh && n.currentMesh.region != s ? this.setMeshRegion(o, n.currentMesh, s) : (n.tempRegion = s, n.tempAttachment = o), !0
        }, s
    }(PIXI.Container);
    o.globalAutoUpdate = !0, t.Spine = o
}(pixi_spine || (pixi_spine = {})), PIXI.spine = pixi_spine, function t(e, r, i) {
    function n(s, a) {
        if (!r[s]) {
            if (!e[s]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(s, !0);
                if (o) return o(s, !0);
                var h = new Error("Cannot find module '" + s + "'");
                throw h.code = "MODULE_NOT_FOUND", h
            }
            var u = r[s] = {exports: {}};
            e[s][0].call(u.exports, function (t) {
                var r = e[s][1][t];
                return n(r || t)
            }, u, u.exports, t, e, r, i)
        }
        return r[s].exports
    }

    for (var o = "function" == typeof require && require, s = 0; s < i.length; s++) n(i[s]);
    return n
}({
    1: [function (t, e, r) {
        var i = {
            _oldRender: PIXI.CanvasRenderer.prototype.render, render: function (t, e, r, i, n) {
                e || (this._lastDisplayOrder = 0), this._oldRender(t, e, r, i, n)
            }
        };
        e.exports = i
    }, {}], 2: [function (t, e, r) {
        var i = {DISPLAY_FLAG: {AUTO_CHILDREN: 0, AUTO_CONTAINER: 1, AUTO_OBJECT: 2, MANUAL_CONTAINER: 3}};
        e.exports = i
    }, {}], 3: [function (t, e, r) {
        var i = {
            displayList: null, displayChildren: null, updateTransform: function () {
                this.visible && (this.containerUpdateTransform(), this.displayList && this.displayList.update(this))
            }, renderCanvas: function (t) {
                this.visible ? (this.displayOrder = t.incDisplayOrder(), this.worldAlpha <= 0 || !this.renderable || (this.displayList ? this.displayList.renderCanvas(this, t) : this.containerRenderCanvas(t))) : this.displayOrder = 0
            }, renderWebGL: function (t) {
                this.visible ? (this.displayOrder = t.incDisplayOrder(), this.worldAlpha <= 0 || !this.renderable || (this.displayList ? this.displayList.renderWebGL(this, t) : this.containerRenderWebGL(t))) : this.displayOrder = 0
            }, containerRenderWebGL: PIXI.Container.prototype.renderWebGL,
            containerRenderCanvas: PIXI.Container.prototype.renderCanvas
        };
        e.exports = i
    }, {}], 4: [function (t, e, r) {
        function i(t, e) {
            n.call(this), this.computedChildren = [], this.currentDisplayList = null, this.currentIndex = 0, this.zIndex = t || 0, this.enableSort = !!e, "function" == typeof e && this.on("add", e)
        }

        var n = PIXI.utils.EventEmitter;
        (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.compareZOrder = function (t, e) {
            return t.zOrder < e.zOrder ? 1 : t.zOrder > e.zOrder ? -1 : t.updateOrder - e.updateOrder
        }, i.prototype.clear = function () {
            for (var t = this.computedChildren, e = 0; e < t.length; e++) {
                var r = t[e].displayChildren;
                if (r && r.length > 0) {
                    for (var i = 0; i < r.length; i++) r[i].displayParent = null;
                    r.length = 0
                }
                t[e].displayParent = null
            }
            t.length = 0, this.currentDisplayList = null, this.currentIndex = 0
        }, i.prototype.add = function (t) {
            t.displayOrder = this.computedChildren.length, this.emit("add", t), this.computedChildren.push(t)
        }, i.prototype.update = function () {
            this.emit("update"), this.enableSort && this.computedChildren.length > 1 && this.computedChildren.sort(i.compareZOrder)
        }, i.prototype.renderWebGL = function (t, e) {
            for (var r = this.computedChildren, i = 0; i < r.length; i++) {
                var n = r[i];
                if (n.displayFlag) n.renderWebGL(e); else {
                    n.displayOrder = e.incDisplayOrder(), n._renderWebGL(e);
                    var o = n.displayChildren;
                    if (o && o.length) for (var s = 0; s < o.length; s++) {
                        var a = o[s];
                        a.displayOrder = e.incDisplayOrder(), a.displayFlag ? a.renderWebGL(e) : a._renderWebGL(e)
                    }
                }
            }
        }, i.prototype.renderCanvas = function (t, e) {
            for (var r = this.computedChildren, i = 0; i < r.length; i++) {
                var n = r[i];
                if (n.displayFlag) n.renderCanvas(e); else {
                    n.displayOrder = e.incDisplayOrder(), n._renderCanvas(e);
                    var o = n.displayChildren;
                    if (o && o.length) for (var s = 0; s < o.length; s++) {
                        var a = o[s];
                        a.displayOrder = e.incDisplayOrder(), a.displayFlag ? a.renderCanvas(e) : a._renderCanvas(e)
                    }
                }
            }
        }
    }, {}], 5: [function (t, e, r) {
        function i() {
            n.call(this), this.displayGroups = [], this.container = null, this.totalElements = 0, this.defaultDisplayGroup = new s(0, !1)
        }

        var n = PIXI.utils.EventEmitter, o = t("./Const"), s = t("./DisplayGroup");
        (i.prototype = Object.create(n.prototype)).constructor = i, e.exports = i, i.prototype.clear = function () {
            for (var t = this.displayGroups, e = 0; e < t.length; e++) t[e].clear();
            t.length = 0, this.totalElements = 0, this.container = null
        }, i.prototype.destroy = function () {
            this.clear()
        }, i.compareZIndex = function (t, e) {
            return t.zIndex !== e.zIndex ? t.zIndex - e.zIndex : t.currentIndex - e.currentIndex
        }, i.prototype._addRecursive = function (t, e) {
            if (t.visible && t.renderable) {
                var r = this.displayGroups, i = e.displayGroup;
                if (t.updateOrder = this.totalElements++, t.displayGroup ? ((i = t.displayGroup).currentDisplayList || (i.currentDisplayList = this, i.currentIndex = r.length, r.push(i)), i.add(t), t.displayParent = t) : (t.displayParent = e, e.displayChildren || (e.displayChildren = []), e.displayChildren.push(t)), t.displayFlag !== o.DISPLAY_FLAG.MANUAL_CONTAINER) {
                    var n = t.children;
                    if (n && n.length > 0) if (t._mask || t._filters && t._filters.length || t.displayList) t.displayFlag = o.DISPLAY_FLAG.AUTO_CONTAINER; else {
                        t.displayFlag = o.DISPLAY_FLAG.AUTO_CHILDREN;
                        for (var s = 0; s < n.length; s++) this._addRecursive(n[s], t.displayParent)
                    } else t.displayFlag = o.DISPLAY_FLAG.AUTO_OBJECT
                }
            }
        }, i.prototype.update = function (t) {
            this.clear();
            t.displayGroup;
            this.displayGroups.push(this.defaultDisplayGroup), this.defaultDisplayGroup.add(t), this.container = t;
            var e, r = t.children;
            for (e = 0; e < r.length; e++) this._addRecursive(r[e], t);
            var n = this.displayGroups;
            for (n.sort(i.compareZIndex), e = 0; e < n.length; e++) n[e].currentIndex = e, n[e].update();
            this.emit("afterUpdate")
        }, i.prototype.renderWebGL = function (t, e) {
            for (var r = this.displayGroups, i = 0; i < r.length; i++) r[i].renderWebGL(t, e)
        }, i.prototype.renderCanvas = function (t, e) {
            for (var r = this.displayGroups, i = 0; i < r.length; i++) r[i].renderCanvas(t, e)
        }
    }, {"./Const": 2, "./DisplayGroup": 4}], 6: [function (t, e, r) {
        var i = {
            displayGroup: null, displayFlag: t("./Const").DISPLAY_FLAG.AUTO_CHILDREN, displayParent: null, zOrder: 0,
            updateOrder: 0
        };
        e.exports = i
    }, {"./Const": 2}], 7: [function (t, e, r) {
        var i = !!PIXI.Camera2d, n = {
            _processInteractive: function (t, e, r, n) {
                if (!e || !e.visible) return !1;
                var o = 0, s = n = e.interactive || n;
                if (e.hitArea && (s = !1), r < 1 / 0 && e._mask && (e._mask.containsPoint(t) || (r = 1 / 0)), r < 1 / 0 && e.filterArea && (e.filterArea.contains(t.x, t.y) || (r = 1 / 0)), e.interactiveChildren) for (var a = e.children, l = a.length - 1; l >= 0; l--) {
                    var h = a[l], u = this._processInteractive(t, h, r, s);
                    u && (o = u, r = u)
                }
                return n && (r < e.displayOrder && (i ? e.hitArea && e.isRaycastPossible && e.containsPoint(t) && (o = e.displayOrder) : e.hitArea ? (e.worldTransform.applyInverse(t, this._tempPoint), e.hitArea.contains(this._tempPoint.x, this._tempPoint.y) && (o = e.displayOrder)) : e.containsPoint && e.containsPoint(t) && (o = e.displayOrder)), e.interactive && this._queueAdd(e, o)), o
            }, processInteractive: function (t, e, r, i) {
                this._startInteractionProcess(), this._processInteractive(t, e, i ? 0 : 1 / 0, !1), this._finishInteractionProcess(r)
            }, _startInteractionProcess: function () {
                this._eventDisplayOrder = 1, this._queue || (this._queue = [[], []]), this._queue[0].length = 0, this._queue[1].length = 0
            }, _queueAdd: function (t, e) {
                var r = this._queue;
                if (e < this._eventDisplayOrder) r[0].push(t); else {
                    if (e > this._eventDisplayOrder) {
                        this._eventDisplayOrder = e;
                        for (var i = r[1], n = 0; n < i.length; n++) r[0].push(i[n]);
                        r[1].length = 0
                    }
                    r[1].push(t)
                }
            }, _finishInteractionProcess: function (t) {
                var e, r = this._queue, i = r[0];
                for (e = 0; e < i.length; e++) t(i[e], !1);
                for (i = r[1], e = 0; e < i.length; e++) t(i[e], !0)
            }
        };
        e.exports = n
    }, {}], 8: [function (t, e, r) {
        var i = {
            _lastDisplayOrder: 0, incDisplayOrder: function () {
                return ++this._lastDisplayOrder
            }
        };
        e.exports = i
    }, {}], 9: [function (t, e, r) {
        var i = {
            _oldRender: PIXI.WebGLRenderer.prototype.render, render: function (t, e, r, i, n) {
                e || (this._lastDisplayOrder = 0), this._oldRender(t, e, r, i, n)
            }
        };
        e.exports = i
    }, {}], 10: [function (t, e, r) {
        var i = {
            DisplayGroup: t("./DisplayGroup"), DisplayList: t("./DisplayList"), Const: t("./Const"),
            DisplayObjectMixin: t("./DisplayObjectMixin"), ContainerMixin: t("./ContainerMixin"),
            SystemRendererMixin: t("./SystemRendererMixin"), WebGLRendererMixin: t("./WebGLRendererMixin"),
            CanvasRendererMixin: t("./CanvasRendererMixin"), InteractionManagerMixin: t("./InteractionManagerMixin")
        }, n = {DisplayGroup: i.DisplayGroup, DisplayList: i.DisplayList};
        Object.assign(n, i.Const), Object.assign(PIXI.DisplayObject.prototype, i.DisplayObjectMixin), Object.assign(PIXI.Container.prototype, i.ContainerMixin), Object.assign(PIXI.WebGLRenderer.prototype, i.SystemRendererMixin, i.WebGLRendererMixin), Object.assign(PIXI.CanvasRenderer.prototype, i.SystemRendererMixin, i.CanvasRendererMixin), Object.assign(PIXI.interaction.InteractionManager.prototype, i.InteractionManagerMixin), Object.assign(PIXI, n), e.exports = i
    }, {
        "./CanvasRendererMixin": 1, "./Const": 2, "./ContainerMixin": 3, "./DisplayGroup": 4, "./DisplayList": 5,
        "./DisplayObjectMixin": 6, "./InteractionManagerMixin": 7, "./SystemRendererMixin": 8, "./WebGLRendererMixin": 9
    }]
}, {}, [10]);


var GUMA = GUMA || {};
GUMA.txt2JsonConverter = function () {
    this.fileReader = new XMLHttpRequest, this.files = [], this.jsonObjects = {}, this.state = void 0, this.onceCallBack = null, this._onUpdate = this.onUpdate.bind(this), this.onUpdate()
}, GUMA.txt2JsonConverter.constructor = GUMA.txt2JsonConverter, GUMA.txt2JsonConverter.prototype.add = function (t, e) {
    var r = {};
    r.key = t, r.url = e, this.files.push(r)
}, GUMA.txt2JsonConverter.prototype.load = function () {
    if (this.files.length <= 0) this.state = "loadComplete"; else {
        var t = this, e = this.fileReader, r = this.files.shift();
        this.fileReader.open("GET", r.url, !0), this.fileReader.onreadystatechange = function () {
            if (4 === e.readyState && (200 === e.status || 0 == this.target.status)) {
                var i = e.responseText, n = JSON.parse(i), o = r.key;
                t.jsonObjects[o] = n, t.load()
            }
        }, this.fileReader.send(null)
    }
}, GUMA.txt2JsonConverter.prototype.once = function (t) {
    this.onceCallBack = t
}, GUMA.txt2JsonConverter.prototype.onUpdate = function () {
    "loadComplete" !== this.state ? window.requestAnimationFrame(this._onUpdate) : this.onceCallBack.apply()
}, GUMA.txtJsonConverter = new GUMA.txt2JsonConverter, GUMA.button = function (t, e, r, i, n, o, s, a, l) {
    void 0 === n && (n = "none"), void 0 === o && (o = .5), void 0 === s && (s = .5), void 0 === a && (a = 1), void 0 === l && (l = 1), this.sprite = PIXI.Sprite.fromFrame(e), this.sprite.position.set(r, i), this.sprite.anchor.set(o, s), this.sprite.scale.set(a, l), this.sprite.interactive = !0, t.addChild(this.sprite), this.tweenTime = .2, this.scaleDown_x = this.sprite.scale.x - .1, this.scaleDown_y = this.sprite.scale.x - .1, this.scaleUp_x = this.sprite.scale.x + .1, this.scaleUp_y = this.sprite.scale.y + .1, this.effTint = 8421504, this.originTint = this.sprite.tint, this.originScaleX = this.sprite.scale.x, this.originScaleY = this.sprite.scale.y, this.originScaleX < 0 ? this.scaleDown_x = this.originScaleX + .1 : this.scaleDown_x = this.originScaleX - .1, this.originScaleY < 0 ? this.scaleDown_y = this.originScaleY + .1 : this.scaleDown_y = this.originScaleY - .1, this.timeLine = new TimelineLite, this.scale_type = n, this.init()
}, GUMA.button.constructor = GUMA.button, GUMA.button.prototype.setScaleType = function (t) {
    this.scale_type = t
}, GUMA.button.prototype.setOriginScale = function (t, e) {
    void 0 === t && (t = this.originScaleX), void 0 === e && (e = t), this.sprite.scale.set(t, e), this.originScaleX = t, this.originScaleY = e, this.originScaleX < 0 ? this.scaleDown_x = this.originScaleX + .1 : this.scaleDown_x = this.originScaleX - .1, this.originScaleY < 0 ? this.scaleDown_y = this.originScaleY + .1 : this.scaleDown_y = this.originScaleY - .1
}, GUMA.button.prototype.setOriginTint = function (t) {
    this.originTint = t, this.sprite.tint = t
}, GUMA.button.prototype.setCallback = function (t, e) {
    void 0 !== t && (void 0 !== e && (t = t.bind(e)), this.sprite.on("click", t), this.sprite.on("tap", t))
}, GUMA.button.prototype.init = function () {
    var t = this;
    this.sprite.interactive = !0, this.sprite.on("mousedown", function () {
        "scaleDown" === t.scale_type ? TweenLite.to(this, t.tweenTime, {
            scaleX: t.scaleDown_x, scaleY: t.scaleDown_y, ease: Power1.easeOut
        }) : "scaleUp" === t.scale_type && TweenLite.to(this, t.tweenTime, {
            scaleX: t.scaleUp_x, scaleY: t.scaleUp_y, ease: Power1.easeOut
        }), this.tint = t.effTint
    }), this.sprite.on("mouseup", function (e) {
        this.tint = t.originTint, TweenLite.to(this, t.tweenTime, {
            scaleX: t.originScaleX, scaleY: t.originScaleY, ease: Power1.easeOut
        })
    }), this.sprite.on("mouseupoutside", function (e) {
        this.tint = t.originTint, TweenLite.to(this, t.tweenTime, {
            scaleX: t.originScaleX, scaleY: t.originScaleY, ease: Power1.easeOut
        })
    }), this.sprite.on("touchstart", function () {
        "scaleDown" === t.scale_type ? TweenLite.to(this, t.tweenTime, {
            scaleX: t.scaleDown_x, scaleY: t.scaleDown_y, ease: Power1.easeOut
        }) : "scaleUp" === t.scale_type && TweenLite.to(this, t.tweenTime, {
            scaleX: t.scaleUp_x, scaleY: t.scaleUp_y, ease: Power1.easeOut
        }), this.tint = t.effTint
    }), this.sprite.on("touchend", function (e) {
        TweenLite.to(this, t.tweenTime, {
            scaleX: t.originScaleX, scaleY: t.originScaleY, ease: Power1.easeOut
        }), this.tint = t.originTint
    }), this.sprite.on("touchendoutside", function (e) {
        TweenLite.to(this, t.tweenTime, {
            scaleX: t.originScaleX, scaleY: t.originScaleY, ease: Power1.easeOut
        }), this.tint = t.originTint
    })
}, Object.defineProperties(GUMA.button.prototype, {
    visible: {
        get: function () {
            return this.sprite.visible
        }, set: function (t) {
            this.sprite.visible = t
        }
    }, position: {
        get: function () {
            return this.sprite.position
        }
    }, scale: {
        get: function () {
            return this.sprite.scale
        }
    }
}), GUMA.button.prototype.setDownAction = function (t, e) {
    void 0 !== t && (void 0 !== e && (t = t.bind(e)), this.sprite.on("mousedown", t), this.sprite.on("touchstart", t))
}, GUMA.scrollView = function (t, e, r, i, n, o) {
    function s(t) {
        this.data = t.data, this.dragging = !0, h.vector = {
            x: this.position.x - this.data.global.x, y: this.position.y - this.data.global.y
        }
    }

    function a() {
        this.dragging = !1, this.data = null
    }

    function l() {
        if (this.dragging) switch (h.type) {
            case h.scrollType.Horizontal:
                this.position.x = this.data.global.x + h.vector.x, this.position.x < h.limitPos && (this.position.x = h.limitPos), this.position.x > h.position.x && (this.position.x = h.position.x);
                break;
            case h.scrollType.Vertical:
                this.position.y = this.data.global.y + h.vector.y, this.position.y < h.limitPos && (this.position.y = h.limitPos), this.position.y > h.position.y && (this.position.y = h.position.y)
        }
    }

    var h = this;
    this.position = {
        x: 0, y: 0
    }, this.position.x = i, this.position.y = n, this.width = e, this.height = r, this.scrollContainer = new PIXI.Container, this.scrollContainer.position.set(this.position.x, this.position.y), this.viewArea = new PIXI.Graphics, this.viewArea.beginFill(8421504, .8), this.viewArea.drawRect(this.position.x, this.position.y, e, r), this.viewArea.endFill(), this.scrollContainer.mask = this.viewArea, t.addChild(this.scrollContainer), t.addChild(this.viewArea), this.scrollContainer.interactive = !0, this.viewLists = [], o = void 0 === o ? this.scrollType.Horizontal : "Vertical" === o || "vertical" === o ? this.scrollType.Vertical : this.scrollType.Horizontal, this.type = o, this.center_point = this.type === this.scrollType.Horizontal ? this.position.x + e : this.position.y + r, this.limitPos = 0, this.vector = {
        x: 0, y: 0
    }, this.interval = 0, this.padding = 0, this.padded_width = 0, this.padded_height = 0, this.moveCall_horizontal = {
        right: !1, left: !1
    }, this.moveCall_vertical = {
        up: !1, down: !1
    }, this.scrollContainer.on("mousedown", s), this.scrollContainer.on("touchstart", s), this.scrollContainer.on("mouseup", a), this.scrollContainer.on("touchend", a), this.scrollContainer.on("mouseupoutside", a), this.scrollContainer.on("touchendoutside", a), this.scrollContainer.on("mousemove", l), this.scrollContainer.on("touchmove", l)
}, GUMA.scrollView.constructor = GUMA.scrollView, GUMA.scrollView.prototype.scrollType = {
    Vertical: 0, Horizontal: 1
}, GUMA.scrollView.prototype.setList = function (t, e) {
    if (0 !== this.viewLists.length) {
        var r = 0, i = this.viewLists.length, n = this.viewLists[0].sprite.width / 2,
            o = this.viewLists[0].sprite.height / 2;
        if (void 0 === t && (t = 0), void 0 === e && (e = 0), this.calculatePadding(e), this.padding = e, 0 !== i) switch (this.interval = t, this.type) {
            case this.scrollType.Horizontal:
                var s = n;
                for (r = 0; r < i; ++r) this.viewLists[r].sprite.anchor.set(.5, .5), this.viewLists[r].sprite.scale.set(this.padded_width, this.padded_height), this.viewLists[r].sprite.position.x = s, this.viewLists[r].sprite.position.y = o, s += this.viewLists[r].sprite.width + t;
                if (this.viewArea.width < this.scrollContainer.width) {
                    l = this.scrollContainer.width - this.width;
                    this.limitPos = this.position.x - l - this.padding
                } else this.limitPos = this.position.x;
                break;
            case this.scrollType.Vertical:
                var a = o;
                for (r = 0; r < i; ++r) this.viewLists[r].sprite.anchor.set(.5, .5), this.viewLists[r].sprite.scale.set(this.padded_width, this.padded_height), this.viewLists[r].sprite.position.x = n, this.viewLists[r].sprite.position.y = a, a += this.viewLists[r].sprite.height + t;
                if (this.viewArea.height < this.scrollContainer.height) {
                    var l = this.scrollContainer.height - this.height;
                    this.limitPos = this.position.y - l - this.padding
                } else this.limitPos = this.position.y
        }
    }
}, GUMA.scrollView.prototype.pushList = function (t) {
    if (t.constructor !== GUMA.scrollSlot) throw"Unvaliable child type. Check its type is GUMA.scrollSlot";
    this.viewLists.push(t)
}, GUMA.scrollView.prototype.calculatePadding = function (t) {
    if (0 !== this.viewLists.length) {
        var e = this.viewLists[0].sprite.width, r = this.viewLists[0].sprite.height;
        this.padded_width = (e - 2 * t) / e, this.padded_width > 1 && (this.padded_width = 1), this.padded_height = (r - 2 * t) / r, this.padded_height > 1 && (this.padded_height = 1)
    }
}, GUMA.scrollView.prototype.scrollMove = function (t, e) {
    switch (this.type) {
        case this.scrollType.Horizontal:
            "right" === t ? (this.scrollContainer.position.x -= e, this.scrollContainer.position.x < this.limitPos && (this.scrollContainer.position.x = this.limitPos), this.scrollContainer.position.x > this.position.x && (this.scrollContainer.position.x = this.position.x)) : "left" === t && (this.scrollContainer.position.x += e, this.scrollContainer.position.x < this.limitPos && (this.scrollContainer.position.x = this.limitPos), this.scrollContainer.position.x > this.position.x && (this.scrollContainer.position.x = this.position.x));
            break;
        case this.scrollType.Vertical:
            "up" === t ? (this.scrollContainer.position.y += e, this.scrollContainer.position.y < this.limitPos && (this.scrollContainer.position.y = this.limitPos), this.scrollContainer.position.y > this.position.y && (this.scrollContainer.position.y = this.position.y)) : "down" === t && (this.scrollContainer.position.y -= e, this.scrollContainer.position.y < this.limitPos && (this.scrollContainer.position.y = this.limitPos), this.scrollContainer.position.y > this.position.y && (this.scrollContainer.position.y = this.position.y))
    }
}, GUMA.scrollView.prototype.moveCheck = function () {
    switch (this.type) {
        case this.scrollType.Horizontal:
            return this.scrollContainer.position.x === this.limitPos ? (this.moveCall_horizontal.left = !1, this.moveCall_horizontal.right = !0, this.moveCall_horizontal) : this.scrollContainer.position.x === this.position.x ? (this.moveCall_horizontal.left = !0, this.moveCall_horizontal.right = !1, this.moveCall_horizontal) : (this.moveCall_horizontal.left = !0, this.moveCall_horizontal.right = !0, this.moveCall_horizontal);
        case this.scrollType.Vertical:
            return this.scrollContainer.position.y === this.limitPos ? (this.moveCall_vertical.up = !1, this.moveCall_vertical.down = !0, this.moveCall_vertical) : this.scrollContainer.position.y === this.position.y ? (this.moveCall_vertical.up = !0, this.moveCall_vertical.down = !1, this.moveCall_vertical) : (this.moveCall_vertical.up = !0, this.moveCall_vertical.down = !0, this.moveCall_vertical)
    }
}, GUMA.scrollView.prototype.setCenterSlot = function (t) {
    switch (this.type) {
        case this.scrollType.Horizontal:
        case this.scrollType.Vertical:
    }
}, GUMA.scrollSlot = function (t, e) {
    if (t.constructor !== GUMA.scrollView) throw"Unvaliable parent type. Check its type is GUMA.scrollView";
    this.sprite = new PIXI.Sprite.fromFrame(e), this.sprite.anchor.set(.5, .5), t.scrollContainer.addChild(this.sprite), t.pushList(this)
}, GUMA.scrollSlot.constructor = GUMA.scrollSlot, Object.defineProperties(PIXI.Sprite.prototype, {
    scaleX: {
        get: function () {
            return this.scale.x
        }, set: function (t) {
            this.scale.x = t
        }
    }, scaleY: {
        get: function () {
            return this.scale.y
        }, set: function (t) {
            this.scale.y = t
        }
    }
}), Object.defineProperties(PIXI.Container.prototype, {
    scaleX: {
        get: function () {
            return this.scale.x
        }, set: function (t) {
            this.scale.x = t
        }
    }, scaleY: {
        get: function () {
            return this.scale.y
        }, set: function (t) {
            this.scale.y = t
        }
    }
}), PIXI.extras.BitmapText.prototype.updateTextDefault = PIXI.extras.BitmapText.prototype.updateText, PIXI.extras.BitmapText.prototype.updateText = function () {
    switch (this.updateTextDefault(), this.align) {
        case"center":
            this.pivot.x = .5 * this.textWidth;
            break;
        case"right":
            this.pivot.x = this.textWidth;
            break;
        default:
            this.pivot.x = 0
    }
}, createBitmapFont = function (t, e, r, i) {
    void 0 == i && (i = "center");
    var n = new PIXI.extras.BitmapText(e, {font: t, align: i});
    return n.position.set(r.x, r.y), n
}, Number.prototype.formatMoney = function (t, e, r) {
    var i = this, t = isNaN(t = Math.abs(t)) ? 2 : t, e = void 0 == e ? "." : e, r = void 0 == r ? "," : r,
        n = i < 0 ? "-" : "", o = String(parseInt(i = Math.abs(Number(i) || 0).toFixed(t))),
        s = (s = o.length) > 3 ? s % 3 : 0;
    return n + (s ? o.substr(0, s) + r : "") + o.substr(s).replace(/(\d{3})(?=\d)/g, "$1" + r) + (t ? e + Math.abs(i - o).toFixed(t).slice(2) : "")
}, Button.prototype.setScaleType = function (t) {
    this.scale_type = t
}, Button.prototype.setOriginTint = function (t) {
    this.originTint = t, this.sprite.tint = t
}, Button.prototype.setCallback = function (t, e) {
    void 0 !== t && (void 0 !== e && (t = t.bind(e)), this.main.on("click", t), this.main.on("tap", t))
}, Button.prototype.init = function () {
    var t = this;
    this.main.interactive = !0, this.main.on("mousedown", function () {
        var e = t;
        if ("scaleDown" === e.scale_type ? TweenLite.to(this, e.tweenTime, {
            scaleX: e.originScaleX + e.addScaleX, scaleY: e.originScaleY + e.addScaleY, ease: Power1.easeOut
        }) : "scaleUp" === e.scale_type && TweenLite.to(this, e.tweenTime, {
            scaleX: e.originScaleX - e.addScaleX, scaleY: e.originScaleY - e.addScaleY, ease: Power1.easeOut
        }), void 0 == e.slice) e.sprite.tint = e.effTint; else for (var r = 0; r < e.sprite.children.length; ++r) e.sprite.children[r].tint = e.effTint
    }), this.main.on("mouseup", function (e) {
        var r = t;
        if (TweenLite.to(this, r.tweenTime, {
            scaleX: r.originScaleX, scaleY: r.originScaleY, ease: Power1.easeOut
        }), void 0 == r.slice) r.sprite.tint = r.originTint; else for (var i = 0; i < r.sprite.children.length; ++i) r.sprite.children[i].tint = r.originTint
    }), this.main.on("mouseupoutside", function (e) {
        var r = t;
        if (TweenLite.to(this, r.tweenTime, {
            scaleX: r.originScaleX, scaleY: r.originScaleY, ease: Power1.easeOut
        }), void 0 == r.slice) r.sprite.tint = r.originTint; else for (var i = 0; i < r.sprite.children.length; ++i) r.sprite.children[i].tint = r.originTint
    }), this.main.on("touchstart", function () {
        var e = t;
        if ("scaleDown" === e.scale_type ? TweenLite.to(this, e.tweenTime, {
            scaleX: e.originScaleX + e.addScaleX, scaleY: e.originScaleY + e.addScaleY, ease: Power1.easeOut
        }) : "scaleUp" === e.scale_type && TweenLite.to(this, e.tweenTime, {
            scaleX: e.originScaleX - e.addScaleX, scaleY: e.originScaleY - e.addScaleY, ease: Power1.easeOut
        }), void 0 == e.slice) e.sprite.tint = e.effTint; else for (var r = 0; r < e.sprite.children.length; ++r) e.sprite.children[r].tint = e.effTint
    }), this.main.on("touchend", function (e) {
        var r = t;
        if (TweenLite.to(this, r.tweenTime, {
            scaleX: r.originScaleX, scaleY: r.originScaleY, ease: Power1.easeOut
        }), void 0 == r.slice) r.sprite.tint = r.originTint; else for (var i = 0; i < r.sprite.children.length; ++i) r.sprite.children[i].tint = r.originTint
    }), this.main.on("touchendoutside", function (e) {
        var r = t;
        if (TweenLite.to(this, r.tweenTime, {
            scaleX: r.originScaleX, scaleY: r.originScaleY, ease: Power1.easeOut
        }), void 0 == r.slice) r.sprite.tint = r.originTint; else for (var i = 0; i < r.sprite.children.length; ++i) r.sprite.children[i].tint = r.originTint
    })
}, Object.defineProperties(Button.prototype, {
    visible: {
        get: function () {
            return this.main.visible
        }, set: function (t) {
            this.main.visible = t
        }
    }, position: {
        get: function () {
            return this.main.position
        }
    }, scale: {
        get: function () {
            return this.main.scale
        }
    }
}), Button.prototype.setDownAction = function (t, e) {
    void 0 !== t && (void 0 !== e && (t = t.bind(e)), this.main.on("mousedown", t), this.main.on("touchstart", t))
};