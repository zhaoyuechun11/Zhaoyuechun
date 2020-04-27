var GUMA = GUMA || {};
GUMA.txt2JsonConverter = function () {
    this.fileReader = new XMLHttpRequest, this.files = [], this.jsonObjects = {}, this.state = void 0, this.onceCallBack = null, this._onUpdate = this.onUpdate.bind(this), this.onUpdate()
},
    GUMA.txt2JsonConverter.constructor = GUMA.txt2JsonConverter, GUMA.txt2JsonConverter.prototype.add = function (t, e) {
    var i = {};
    i.key = t, i.url = e, this.files.push(i)
},
    GUMA.txt2JsonConverter.prototype.load = function () {
        if (this.files.length <= 0) this.state = "loadComplete"; else {
            var t = this, e = this.fileReader, i = this.files.shift();
            this.fileReader.open("GET", i.url, !0), this.fileReader.onreadystatechange = function () {
                if (4 === e.readyState && (200 === e.status || 0 == this.target.status)) {
                    var r = e.responseText, n = JSON.parse(r), s = i.key;
                    t.jsonObjects[s] = n, t.load()
                }
            }, this.fileReader.send(null)
        }
    },
    GUMA.txt2JsonConverter.prototype.once = function (t) {
        this.onceCallBack = t
    },
    GUMA.txt2JsonConverter.prototype.onUpdate = function () {
        "loadComplete" !== this.state ? window.requestAnimationFrame(this._onUpdate) : this.onceCallBack.apply()
    },
    GUMA.txtJsonConverter = new GUMA.txt2JsonConverter, GUMA.button = function (t, e, i, r, n, s, o, a, h) {
    void 0 === n && (n = "none"), void 0 === s && (s = .5), void 0 === o && (o = .5), void 0 === a && (a = 1), void 0 === h && (h = 1), this.sprite = PIXI.Sprite.fromFrame(e), this.sprite.position.set(i, r), this.sprite.anchor.set(s, o), this.sprite.scale.set(a, h), this.sprite.interactive = !0, t.addChild(this.sprite), this.tweenTime = .2, this.scaleDown_x = this.sprite.scale.x - .1, this.scaleDown_y = this.sprite.scale.x - .1, this.scaleUp_x = this.sprite.scale.x + .1, this.scaleUp_y = this.sprite.scale.y + .1, this.effTint = 8421504, this.originTint = this.sprite.tint, this.originScaleX = this.sprite.scale.x, this.originScaleY = this.sprite.scale.y, this.originScaleX < 0 ? this.scaleDown_x = this.originScaleX + .1 : this.scaleDown_x = this.originScaleX - .1, this.originScaleY < 0 ? this.scaleDown_y = this.originScaleY + .1 : this.scaleDown_y = this.originScaleY - .1, this.timeLine = new TimelineLite, this.scale_type = n, this.init()
},
    GUMA.button.constructor = GUMA.button, GUMA.button.prototype.setScaleType = function (t) {
    this.scale_type = t
},
    GUMA.button.prototype.setOriginScale = function (t, e) {
        void 0 === t && (t = this.originScaleX), void 0 === e && (e = t), this.sprite.scale.set(t, e), this.originScaleX = t, this.originScaleY = e, this.originScaleX < 0 ? this.scaleDown_x = this.originScaleX + .1 : this.scaleDown_x = this.originScaleX - .1, this.originScaleY < 0 ? this.scaleDown_y = this.originScaleY + .1 : this.scaleDown_y = this.originScaleY - .1
    },
    GUMA.button.prototype.setOriginTint = function (t) {
        this.originTint = t, this.sprite.tint = t
    },
    GUMA.button.prototype.setCallback = function (t, e) {
        void 0 !== t && (void 0 !== e && (t = t.bind(e)), this.sprite.on("click", t), this.sprite.on("tap", t))
    },
    GUMA.button.prototype.init = function () {
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
},
    GUMA.scrollView = function (t, e, i, r, n, s) {
        function o(t) {
            this.data = t.data, this.dragging = !0, l.vector = {
                x: this.position.x - this.data.global.x, y: this.position.y - this.data.global.y
            }
        }

        function a() {
            this.dragging = !1, this.data = null
        }

        function h() {
            if (this.dragging) switch (l.type) {
                case l.scrollType.Horizontal:
                    this.position.x = this.data.global.x + l.vector.x, this.position.x < l.limitPos && (this.position.x = l.limitPos), this.position.x > l.position.x && (this.position.x = l.position.x);
                    break;
                case l.scrollType.Vertical:
                    this.position.y = this.data.global.y + l.vector.y, this.position.y < l.limitPos && (this.position.y = l.limitPos), this.position.y > l.position.y && (this.position.y = l.position.y)
            }
        }

        var l = this;
        this.position = {
            x: 0, y: 0
        }, this.position.x = r, this.position.y = n, this.width = e, this.height = i, this.scrollContainer = new PIXI.Container, this.scrollContainer.position.set(this.position.x, this.position.y), this.viewArea = new PIXI.Graphics, this.viewArea.beginFill(8421504, .8), this.viewArea.drawRect(this.position.x, this.position.y, e, i), this.viewArea.endFill(), this.scrollContainer.mask = this.viewArea, t.addChild(this.scrollContainer), t.addChild(this.viewArea), this.scrollContainer.interactive = !0, this.viewLists = [], s = void 0 === s ? this.scrollType.Horizontal : "Vertical" === s || "vertical" === s ? this.scrollType.Vertical : this.scrollType.Horizontal, this.type = s, this.center_point = this.type === this.scrollType.Horizontal ? this.position.x + e : this.position.y + i, this.limitPos = 0, this.vector = {
            x: 0, y: 0
        }, this.interval = 0, this.padding = 0, this.padded_width = 0, this.padded_height = 0, this.moveCall_horizontal = {
            right: !1, left: !1
        }, this.moveCall_vertical = {
            up: !1, down: !1
        }, this.scrollContainer.on("mousedown", o), this.scrollContainer.on("touchstart", o), this.scrollContainer.on("mouseup", a), this.scrollContainer.on("touchend", a), this.scrollContainer.on("mouseupoutside", a), this.scrollContainer.on("touchendoutside", a), this.scrollContainer.on("mousemove", h), this.scrollContainer.on("touchmove", h)
    },
    GUMA.scrollView.constructor = GUMA.scrollView, GUMA.scrollView.prototype.scrollType = {
    Vertical: 0, Horizontal: 1
},
    GUMA.scrollView.prototype.setList = function (t, e) {
        if (0 !== this.viewLists.length) {
            var i = 0,
                r = this.viewLists.length,
                n = this.viewLists[0].sprite.width / 2,
                s = this.viewLists[0].sprite.height / 2;
            if (void 0 === t && (t = 0), void 0 === e && (e = 0), this.calculatePadding(e), this.padding = e, 0 !== r) switch (this.interval = t, this.type) {
                case this.scrollType.Horizontal:
                    var o = n;
                    for (i = 0; i < r; ++i)
                        this.viewLists[i].sprite.anchor.set(.5, .5),
                            this.viewLists[i].sprite.scale.set(this.padded_width, this.padded_height),
                            this.viewLists[i].sprite.position.x = o,
                            this.viewLists[i].sprite.position.y = s,
                            o += this.viewLists[i].sprite.width + t;
                    if (this.viewArea.width < this.scrollContainer.width) {
                        h = this.scrollContainer.width - this.width;
                        this.limitPos = this.position.x - h - this.padding
                    } else this.limitPos = this.position.x;
                    break;
                case this.scrollType.Vertical:
                    var a = s;
                    for (i = 0; i < r; ++i) this.viewLists[i].sprite.anchor.set(.5, .5), this.viewLists[i].sprite.scale.set(this.padded_width, this.padded_height), this.viewLists[i].sprite.position.x = n, this.viewLists[i].sprite.position.y = a, a += this.viewLists[i].sprite.height + t;
                    if (this.viewArea.height < this.scrollContainer.height) {
                        var h = this.scrollContainer.height - this.height;
                        this.limitPos = this.position.y - h - this.padding
                    } else this.limitPos = this.position.y
            }
        }
    },
    GUMA.scrollView.prototype.pushList = function (t) {
        if (t.constructor !== GUMA.scrollSlot) throw"Unvaliable child type. Check its type is GUMA.scrollSlot";
        this.viewLists.push(t)
    },
    GUMA.scrollView.prototype.calculatePadding = function (t) {
        if (0 !== this.viewLists.length) {
            var e = this.viewLists[0].sprite.width, i = this.viewLists[0].sprite.height;
            this.padded_width = (e - 2 * t) / e, this.padded_width > 1 && (this.padded_width = 1), this.padded_height = (i - 2 * t) / i, this.padded_height > 1 && (this.padded_height = 1)
        }
    },
    GUMA.scrollView.prototype.scrollMove = function (t, e) {
        switch (this.type) {
            case this.scrollType.Horizontal:
                "right" === t ? (this.scrollContainer.position.x -= e, this.scrollContainer.position.x < this.limitPos && (this.scrollContainer.position.x = this.limitPos), this.scrollContainer.position.x > this.position.x && (this.scrollContainer.position.x = this.position.x)) : "left" === t && (this.scrollContainer.position.x += e, this.scrollContainer.position.x < this.limitPos && (this.scrollContainer.position.x = this.limitPos), this.scrollContainer.position.x > this.position.x && (this.scrollContainer.position.x = this.position.x));
                break;
            case this.scrollType.Vertical:
                "up" === t ? (this.scrollContainer.position.y += e, this.scrollContainer.position.y < this.limitPos && (this.scrollContainer.position.y = this.limitPos), this.scrollContainer.position.y > this.position.y && (this.scrollContainer.position.y = this.position.y)) : "down" === t && (this.scrollContainer.position.y -= e, this.scrollContainer.position.y < this.limitPos && (this.scrollContainer.position.y = this.limitPos), this.scrollContainer.position.y > this.position.y && (this.scrollContainer.position.y = this.position.y))
        }
    },
    GUMA.scrollView.prototype.moveCheck = function () {
        switch (this.type) {
            case this.scrollType.Horizontal:
                return this.scrollContainer.position.x === this.limitPos ? (this.moveCall_horizontal.left = !1, this.moveCall_horizontal.right = !0, this.moveCall_horizontal) : this.scrollContainer.position.x === this.position.x ? (this.moveCall_horizontal.left = !0, this.moveCall_horizontal.right = !1, this.moveCall_horizontal) : (this.moveCall_horizontal.left = !0, this.moveCall_horizontal.right = !0, this.moveCall_horizontal);
            case this.scrollType.Vertical:
                return this.scrollContainer.position.y === this.limitPos ? (this.moveCall_vertical.up = !1, this.moveCall_vertical.down = !0, this.moveCall_vertical) : this.scrollContainer.position.y === this.position.y ? (this.moveCall_vertical.up = !0, this.moveCall_vertical.down = !1, this.moveCall_vertical) : (this.moveCall_vertical.up = !0, this.moveCall_vertical.down = !0, this.moveCall_vertical)
        }
    },
    GUMA.scrollView.prototype.setCenterSlot = function (t) {
        switch (this.type) {
            case this.scrollType.Horizontal:
            case this.scrollType.Vertical:
        }
    },
    GUMA.scrollSlot = function (t, e) {
        if (t.constructor !== GUMA.scrollView) throw"Unvaliable parent type. Check its type is GUMA.scrollView";
        this.sprite = new PIXI.Sprite.fromFrame(e), this.sprite.anchor.set(.5, .5), t.scrollContainer.addChild(this.sprite), t.pushList(this)
    },
    GUMA.scrollSlot.constructor = GUMA.scrollSlot,






    Object.defineProperties(PIXI.Sprite.prototype, {
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
    }),


    Object.defineProperties(PIXI.Container.prototype, {
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
    });

