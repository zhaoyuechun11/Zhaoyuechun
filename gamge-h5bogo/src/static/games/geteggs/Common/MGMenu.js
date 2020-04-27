MGMButton = function (t, e, i, s, n, o, a, h, r, p, d) {
    void 0 === o && (o = "none"), void 0 === r && (r = .5), void 0 === p && (p = .5), void 0 === a && (a = 1), void 0 === h && (h = 1), this.tweenTime = .2, this.slice = d, this.main = new PIXI.Container, void 0 == this.slice ? (this.sprite = PIXI.Sprite.fromFrame(e), this.sprite.anchor.set(r, p), this.originTint = this.sprite.tint) : (this.sprite = d, this.originTint = 16777215), this.main.position.set(i, s), this.main.scale.set(a, h), this.originScaleX = a, this.originScaleY = h, this.originScaleX < 0 ? (this.addScaleX = .1, this.addIdleX = .02) : (this.addScaleX = -.1, this.addIdleX = -.02), this.originScaleY < 0 ? (this.addScaleY = .1, this.addIdleY = .02) : (this.addScaleY = -.1, this.addIdleY = -.02), this.main.addChild(this.sprite), t.addChild(this.main), this.effTint = 8421504, this.scale_type = o, this.main.on("click", n), this.main.on("tap", n), this.init()
}, MGMButton.prototype.SetTween = function () {
    TweenMax.fromTo(this.sprite, .5, {
        sx: this.originScaleX - this.addIdleX, sy: this.originScaleY - this.addIdleY
    }, {
        yoyo: !0, repeat: -1, sx: this.originScaleX + this.addIdleX, sy: this.originScaleY + this.addIdleY,
        ease: Power0.easeNone
    })
}, MGMButton.prototype.setScaleType = function (t) {
    this.scale_type = t
}, MGMButton.prototype.init = function () {
    var t = this;
    this.main.interactive = !0, this.main.on("mousedown", function () {
        var e = t;
        if ("scaleDown" === e.scale_type ? TweenLite.to(this, e.tweenTime, {
            sx: e.originScaleX + e.addScaleX, sy: e.originScaleY + e.addScaleY, ease: Power1.easeOut
        }) : "scaleUp" === e.scale_type && TweenLite.to(this, e.tweenTime, {
            sx: e.originScaleX - e.addScaleX, sy: e.originScaleY - e.addScaleY, ease: Power1.easeOut
        }), void 0 == e.slice) {
            e.sprite.tint = e.effTint;
            for (i = 0; i < e.sprite.children.length; ++i) e.sprite.children[i].tint = e.effTint
        } else for (var i = 0; i < e.sprite.children.length; ++i) e.sprite.children[i].tint = e.effTint
    }), this.main.on("mouseup", function (e) {
        var i = t;
        if (TweenLite.to(this, i.tweenTime, {
            sx: i.originScaleX, sy: i.originScaleY, ease: Power1.easeOut
        }), void 0 == i.slice) {
            i.sprite.tint = i.originTint;
            for (s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
        } else for (var s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
    }), this.main.on("mouseupoutside", function (e) {
        var i = t;
        if (TweenLite.to(this, i.tweenTime, {
            sx: i.originScaleX, sy: i.originScaleY, ease: Power1.easeOut
        }), void 0 == i.slice) {
            i.sprite.tint = i.originTint;
            for (s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
        } else for (var s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
    }), this.main.on("touchstart", function () {
        var e = t;
        if ("scaleDown" === e.scale_type ? TweenLite.to(this, e.tweenTime, {
            sx: e.originScaleX + e.addScaleX, sy: e.originScaleY + e.addScaleY, ease: Power1.easeOut
        }) : "scaleUp" === e.scale_type && TweenLite.to(this, e.tweenTime, {
            sx: e.originScaleX - e.addScaleX, sy: e.originScaleY - e.addScaleY, ease: Power1.easeOut
        }), void 0 == e.slice) {
            e.sprite.tint = e.effTint;
            for (i = 0; i < e.sprite.children.length; ++i) e.sprite.children[i].tint = e.effTint
        } else for (var i = 0; i < e.sprite.children.length; ++i) e.sprite.children[i].tint = e.effTint
    }), this.main.on("touchend", function (e) {
        var i = t;
        if (TweenLite.to(this, i.tweenTime, {
            sx: i.originScaleX, sy: i.originScaleY, ease: Power1.easeOut
        }), void 0 == i.slice) {
            i.sprite.tint = i.originTint;
            for (s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
        } else for (var s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
    }), this.main.on("touchendoutside", function (e) {
        var i = t;
        if (TweenLite.to(this, i.tweenTime, {
            sx: i.originScaleX, sy: i.originScaleY, ease: Power1.easeOut
        }), void 0 == i.slice) {
            i.sprite.tint = i.originTint;
            for (s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
        } else for (var s = 0; s < i.sprite.children.length; ++s) i.sprite.children[s].tint = i.originTint
    })
}, Object.defineProperties(MGMButton.prototype, {
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
}), function (t) {
    function e() {
    }

    function i(e) {
        return e.value !== t ? "value" : e.text !== t ? "text" : e.textContent !== t ? "textContent" : "innerText"
    }

    function s(t, e, i) {
        t[e] = i
    }

    function n(t, e) {
        return t[e].replace(/\r/g, "")
    }

    function o(t) {
        return !("object" != typeof t || !t || t instanceof Array)
    }

    function a(t) {
        var e = f[t];
        if (!e) {
            var i = document.createElement("canvas");
            i.width = 2, i.height = 2;
            var s = i.getContext("2d");
            s.fillStyle = t, s.fillRect(0, 0, 2, 2), e = PIXI.Texture.fromCanvas(i), f[t] = e
        }
        return e
    }

    function h(t, e, i) {
        for (var s in e) if (i) t[s] = e[s]; else {
            var n = o(e[s]);
            t.hasOwnProperty(s) || (t[s] = n ? {} : e[s]), n && (o(t[s]) || (t[s] = {}), h(t[s], e[s]))
        }
        return t
    }

    function r(t) {
        return t._isBitmapFont ? t._lineHeight : l || t.determineFontHeight ? t.determineFontHeight("font: " + t.style.font + ";") + t.style.strokeThickness : parseInt(t.determineFontProperties(t.style.font).fontSize, 10) + t.style.strokeThickness
    }

    function p(t, e, i, s, n, o) {
        if (o instanceof Array) var a = o[0], h = o[1], r = o[2], d = o[3]; else var a = o, h = o, r = o, d = o;
        if (s < 2 * a || n < 2 * a) return p(t, e, i, s || 1, n || 1, 0);
        t.beginPath(), t.moveTo(e + a, i), t.lineTo(e + s - h, i), t.quadraticCurveTo(e + s, i, e + s, i + h), t.lineTo(e + s, i + n - r), t.quadraticCurveTo(e + s, i + n, e + s - r, i + n), t.lineTo(e + d, i + n), t.quadraticCurveTo(e, i + n, e, i + n - d), t.lineTo(e, i + a), t.quadraticCurveTo(e, i, e + a, i), t.closePath()
    }

    function d(t, e) {
        var i = e ? t.boxShadow : t.innerShadow;
        if (i && "none" !== i) {
            var s = i.split("px ");
            i = {x: parseInt(s[0], 10), y: parseInt(s[1], 10), blur: parseInt(s[2], 10), color: s[3]}
        } else i = {x: 0, y: 0, blur: 0, color: ""};
        return e && (i.x < 0 ? (t.shadowLeft = Math.abs(i.x) + i.blur, t.shadowRight = i.blur + i.x) : (t.shadowLeft = Math.abs(i.blur - i.x), t.shadowRight = i.blur + i.x), i.y < 0 ? (t.shadowTop = Math.abs(i.y) + i.blur, t.shadowBottom = i.blur + i.y) : (t.shadowTop = Math.abs(i.blur - i.y), t.shadowBottom = i.blur + i.y), t.shadowWidth = t.shadowLeft + t.shadowRight, t.shadowHeight = t.shadowTop + t.shadowBottom), i
    }

    var l = -1 !== PIXI.VERSION.indexOf("v1"), u = navigator && navigator.isCocoonJS, c = void 0 !== window.orientation,
        M = {
            readonly: !1, maxlength: null, placeholder: "", placeholderColor: "#bfbebd", placeholderAlign: "",
            selectionColor: "rgba(179, 212, 253, 0.8)", selectionUpdated: !1, selectionStart: -1, value: "",
            type: "text", onsubmit: e, onkeydown: e, onkeyup: e, onfocus: e, onblur: e, onmousedown: e, onmouseup: e,
            cursorPos: 0, hasFocus: !1, mouseDown: !1
        }, b = {
            width: 170, height: null, padding: 5, borderColor: "#000", borderWidth: 1, borderRadius: 3,
            backgroundImage: null, backgroundColor: "#fff", backgroundGradient: null,
            boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.1)", innerShadow: "0px 0px 4px rgba(0, 0, 0, 0.4)", valign: "middle",
            align: "center", outline: 0, text: {fontFamily: "Arial", fontSize: "14px", fill: "#000000", align: "left"}
        }, f = {}, x = document.createElement("canvas"), S = x.getContext("2d"), g = document.createElement("canvas"),
        I = g.getContext("2d");
    PIXI.ButtonFactory = function (t, e, i) {
        o(i.boxShadow) || (i.boxShadow = d(i, !0), i.outerWidth = i.width + 2 * i.padding + 2 * i.borderWidth + i.shadowWidth, i.outerHeight = i.height + 2 * i.padding + 2 * i.borderWidth + i.shadowHeight), o(i.innerShadow) || (i.innerShadow = d(i, !1));
        var s = i.outerWidth || i.width || 100, n = i.outerHeight || i.height || 30, a = i.borderRadius,
            h = i.borderWidth, r = i.shadowWidth, l = i.shadowHeight, c = i.shadowLeft, M = i.shadowTop;
        t.width = s, t.height = n, u && e.clearRect(0, 0, s, n), e.shadowOffsetX = i.boxShadow.x, e.shadowOffsetY = i.boxShadow.y, e.shadowBlur = i.boxShadow.blur, e.shadowColor = i.boxShadow.color, i.borderWidth > 0 && (e.fillStyle = i.borderColor, p(e, c, M, s - r, n - l, a), e.fill(), e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 0);
        var b = i.textboxHeight = n - 2 * h - l, f = i.textboxTop = h + M, g = i.textboxWidth = s - 2 * h - r,
            I = i.textboxLeft = h + c;
        if (!i.bgImage && i.backgroundImage && (i.bgImage = PIXI.Texture.fromImage(i.backgroundImage), i.bgImage.baseTexture.hasLoaded ? i.dirty = !0 : i.bgImage.on("update", function () {
            i.dirty = !0
        })), i.bgImage && i.backgroundImage && i.bgImage.baseTexture.hasLoaded) e.drawImage(i.bgImage, 0, 0, i.bgImage.width, i.bgImage.height, I, f, g, b); else {
            if (i.backgroundGradient && !o(i.backgroundColor)) {
                var m = i.backgroundGradient.length;
                if (m < 2) return;
                i.backgroundColor = e.createLinearGradient(0, 0, 0, n);
                for (var v = 0; v < m; v++) {
                    var y = i.backgroundGradient[v];
                    2 === y.length ? i.backgroundColor.addColorStop(y[0], y[1]) : i.backgroundColor.addColorStop(v / (m - 1), y)
                }
            }
            e.fillStyle = i.backgroundColor, p(e, I, f, g, b, a)
        }
        e.shadowOffsetX = 0, e.shadowOffsetY = 0, e.shadowBlur = 0;
        var G = i.innerShadow;
        G.blur > 0 && (x.width = i.width + 2 * i.padding, x.height = i.height + 2 * i.padding, S.shadowBlur = G.blur, S.shadowColor = G.color, S.shadowOffsetX = 0, S.shadowOffsetY = G.y, S.fillRect(-1 * s, -100, 3 * s, 100), S.shadowOffsetX = G.x, S.shadowOffsetY = 0, S.fillRect(x.width, -1 * n, 100, 3 * n), S.shadowOffsetX = 0, S.shadowOffsetY = G.y, S.fillRect(-1 * s, x.height, 3 * s, 100), S.shadowOffsetX = G.x, S.shadowOffsetY = 0, S.fillRect(-100, -1 * n, 100, 3 * n), p(e, h + c, h + M, s - 2 * h - r, n - 2 * h - l, a), e.clip(), e.drawImage(x, 0, 0, x.width, x.height, h + c, h + M, x.width, x.height))
    }, PIXI.InputObject = function (e) {
        if (this.tabIndex = e !== t ? e : PIXI.InputObject.tabIndex++, PIXI.Sprite.call(this, PIXI.Texture.fromCanvas(this.canvas)), PIXI.InputObject.inputs.push(this), this.resolution = 1, !u) {
            if (!PIXI.InputObject.hiddenInput) {
                var s = document.createElement("input");
                s.type = "text", s.tabindex = -1, s.style.position = "fixed", s.style.opacity = 0, s.style.pointerEvents = "none", s.style.left = "0px", s.style.bottom = "0px", s.style.left = "-100px", s.style.top = "-100px", s.style.zIndex = 10, s.addEventListener("blur", function () {
                    PIXI.InputObject.currentInput && PIXI.InputObject.currentInput.onMouseUpOutside()
                }, !1), s.addEventListener("keydown", function (t) {
                    PIXI.InputObject.currentInput && (t = t || window.event, PIXI.InputObject.currentInput.data.hasFocus && PIXI.InputObject.currentInput.onKeyDown(t))
                }), s.addEventListener("keyup", function (t) {
                    PIXI.InputObject.currentInput && (t = t || window.event, PIXI.InputObject.currentInput.data.hasFocus && PIXI.InputObject.currentInput.onKeyUp(t))
                }), document.body.appendChild(s), PIXI.InputObject.textProp = i(s), PIXI.InputObject.hiddenInput = s
            }
            this.hiddenInput = PIXI.InputObject.hiddenInput
        }
        this._textNeedsUpdate = !0, this.data.dirty = !0, this.update()
    }, PIXI.InputObject.prototype = Object.create(PIXI.Sprite.prototype), PIXI.InputObject.prototype.constructor = PIXI.InputObject, h(PIXI.InputObject.prototype, {
        updateData: function (t) {
            t.hasOwnProperty("text") && (this._textStyleNeedsUpdate = !0), this.data = h(t, this.data), this.data.dirty = !0, (t.hasOwnProperty("value") || this._textStyleNeedsUpdate) && (this._textNeedsUpdate = !0)
        }, focus: function () {
            PIXI.InputObject.currentInput !== this && (PIXI.InputObject.currentInput && PIXI.InputObject.currentInput.blur(), PIXI.InputObject.currentInput = this, this.data.hasFocus = !0, this.data.onfocus(), this.data.readonly || this.hiddenInput.focus())
        }, blur: function () {
            PIXI.InputObject.currentInput === this && (PIXI.InputObject.currentInput = null, this.data.hasFocus = !1, this.hiddenInput.blur(), this.data.onblur())
        }, onKeyUp: function () {
        }, onKeyDown: function () {
        }, onClick: function () {
        }, onMouseMove: function () {
        }, onMouseDown: function () {
        }, onMouseUp: function () {
        }, onMouseUpOutside: function (t) {
            this.data.hasFocus && !this.data.mouseDown && this.blur(), this.data.mouseDown = !1
        }, updateTexture: function () {
            this.texture.baseTexture.width = this.canvas.width, this.texture.baseTexture.height = this.canvas.height, this.texture.frame.width = this.canvas.width, this.texture.frame.height = this.canvas.height, this._width = this.canvas.width, this._height = this.canvas.height, l && (this.requiresUpdate = !0)
        }, _renderWebGL: function (t) {
            l ? this.requiresUpdate && (this.requiresUpdate = !1, PIXI.updateWebGLTexture(this.texture.baseTexture, t.gl)) : (this.resolution = t.resolution, this.texture.baseTexture.resolution = this.resolution), PIXI.Sprite.prototype._renderWebGL.call(this, t)
        }, destroy: function () {
            this.interactive = !1, this.context = null, this.canvas = null, this.texture.destroy(!0), PIXI.InputObject.inputs.splice(PIXI.InputObject.inputs.indexOf(this), 1)
        }
    }, !0), Object.defineProperty(PIXI.InputObject.prototype, "width", {
        get: function () {
            return this.update(), this.scale.x * this.texture.frame.width
        }, set: function (t) {
            this.scale.x = t / this.texture.frame.width, this._width = t
        }
    }), Object.defineProperty(PIXI.InputObject.prototype, "height", {
        get: function () {
            return this.update(), this.scale.y * this.texture.frame.height
        }, set: function (t) {
            this.scale.y = t / this.texture.frame.height, this._height = t
        }
    }), PIXI.InputObject.tabIndex = 0, PIXI.InputObject.currentCanvas = null, PIXI.InputObject.currentInput = null, PIXI.InputObject.hiddenInput = null, PIXI.InputObject.inputs = [], PIXI.InputObject.Styles = {}, PIXI.InputObject.TextCache = {}, PIXI.InputObject.textProp = "value", PIXI.InputObject.Tab = function (t, e, i) {
        if (t.preventDefault(), PIXI.InputObject.inputs.length > 1) for (var s = PIXI.InputObject.inputs.indexOf(i); ;) {
            if (++s >= PIXI.InputObject.inputs.length && (s = 0), PIXI.InputObject.inputs[s] === i) break;
            if (-1 !== PIXI.InputObject.inputs[s].tabIndex) {
                i.blur(), setTimeout(function () {
                    PIXI.InputObject.inputs[s].focus()
                }, 10);
                break
            }
        }
    }, PIXI.InputObject.Style = function (e, i, s) {
        if (i === t) return PIXI.InputObject.Styles[e] || {};
        PIXI.InputObject.Styles[e] = i, s && delete PIXI.InputObject.Styles[e]
    }, PIXI.InputObject.blur = function () {
        PIXI.InputObject.currentInput && !PIXI.InputObject.currentInput.data.mouseDown && (PIXI.InputObject.currentInput.blur(), PIXI.InputObject.currentInput = null)
    }, window.addEventListener("blur", PIXI.InputObject.blur, !1), PIXI.InputObject.setCanvas = function (t) {
        c || PIXI.InputObject.currentCanvas !== t && (PIXI.InputObject.currentCanvas && (PIXI.InputObject.currentCanvas.removeEventListener("mousedown", PIXI.InputObject.blur, !0), PIXI.InputObject.currentCanvas.removeEventListener("touchstart", PIXI.InputObject.blur, !0)), t && (t.addEventListener("mousedown", PIXI.InputObject.blur, !0), t.addEventListener("touchstart", PIXI.InputObject.blur, !0)), PIXI.InputObject.currentCanvas = t)
    }, PIXI.InputObject.getTextCache = function (t, e) {
        var i = t.textCache ? t.textCache.__id : null, s = t.data.text.font + "_" + t.data.text.strokeThickness;
        if (!i || (--PIXI.InputObject.TextCache[i].count, !e)) return PIXI.InputObject.TextCache[s] || (PIXI.InputObject.TextCache[s] = {
            count: 0, __id: s
        }), PIXI.InputObject.TextCache[s].count++, PIXI.InputObject.TextCache[s];
        PIXI.InputObject.TextCache[i].count <= 0 && (PIXI.InputObject.TextCache[i] = null)
    }, PIXI.Input = function (t) {
        this.data = t || {}, this.data.style && (this.data = h(this.data, PIXI.InputObject.Style(this.data.style))), this.data = h(this.data, M), this.data = h(this.data, b), this.data.selection = [0, 0], this.data.clipPos = [0, 0], this.data.cursorPos = 0, this.cursorTimer = 0, this.data.value = (this.data.value || this.data.placeholder || "") + "", this.currText = this.data.value, this.data.text.bitmap ? (this.text = new PIXI.BitmapText(this.data.value || "Temp", this.data.text), this.text._isBitmapFont = !0, this.text._data = PIXI.BitmapText.fonts[this.text.fontName], this.text._scale = this.text.fontSize / this.text._data.size, this.text._lineHeight = this.text._data.lineHeight * this.text._scale, this.data.value || (this._textNeedsUpdate = !0)) : (this.text = new PIXI.Text(this.data.value, this.data.text), this.textCache = PIXI.InputObject.getTextCache(this)), this.cursor = new PIXI.Text("|", this.data.text), this.cursor.visible = !1, this.selection = new PIXI.Sprite(a(this.data.selectionColor)), this.data.height = this.data.height || r(this.text), this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = this.data.width, this.canvas.height = this.data.height, PIXI.InputObject.call(this), this.addChild(this.selection), this.addChild(this.text), this.addChild(this.cursor), this.boundOnMouseUp = this.onMouseUp.bind(this), this.boundOnMouseUpOutside = this.onMouseUpOutside.bind(this), this.boundOnMouseDown = this.onMouseDown.bind(this), this.boundOnMouseMove = this.onMouseMove.bind(this), this.interactive = !0, this.defaultCursor = "text", this.buttonMode = !0, this.mousemove = this.touchmove = this.boundOnMouseMove, this.mousedown = this.touchstart = this.boundOnMouseDown, this.mouseup = this.touchend = this.boundOnMouseUp, this.mouseupoutside = this.touchendoutside = this.boundOnMouseUpOutside
    }, PIXI.Input.prototype = Object.create(PIXI.InputObject.prototype), PIXI.Input.prototype.constructor = PIXI.Input, h(PIXI.Input.prototype, {
        focus: function () {
            if (PIXI.InputObject.prototype.focus.call(this), !this.data.readonly) {
                if (u) return this.value = prompt(this.data.placeholder || "Enter Text", this.value) || this.value, void(this._textNeedsUpdate = !0);
                this.hiddenInput.type = this.data.type || "text", this.data.maxlength ? this.hiddenInput.maxLength = this.data.maxlength : this.hiddenInput.removeAttribute("maxLength"), "number" === this.data.type ? (this.data.min !== t && (this.hiddenInput.min = this.data.min), this.data.max !== t && (this.hiddenInput.max = this.data.max)) : (this.hiddenInput.removeAttribute("min"), this.hiddenInput.removeAttribute("max")), this.currText = this.value, this.data.value = this.currText, s(this.hiddenInput, PIXI.InputObject.textProp, this.currText), this._textNeedsUpdate = !0
            }
        }, blur: function (t) {
            t = t || this, PIXI.InputObject.prototype.blur.call(t), "" === t.data.value && (t.data.value = t.data.placeholder), t.clearSelection(), this.cursor.visible = !1, t._textNeedsUpdate = !0
        }, onKeyDown: function (t) {
            this.data.selectionStart = -1;
            var e = t.which;
            t.shiftKey;
            if (27 !== t.which) {
                if (this._textNeedsUpdate = !0, this._selectionNeedsUpdate = !0, this.data.onkeydown(t, this), 65 === e && (t.ctrlKey || t.metaKey)) return t.preventDefault(), this.data.selection[0] = 0, this.data.selection[1] = this.value.length, this.hiddenInput.selectionStart = 0, void(this.hiddenInput.selectionEnd = this.value.length);
                if (17 !== e && !t.metaKey && !t.ctrlKey) {
                    if (13 === e) t.preventDefault(), this.data.onsubmit(t, this); else if (9 === e) return void PIXI.InputObject.Tab(t, e, this);
                    this.updateTextState()
                }
            } else this.blur()
        }, onKeyUp: function (t) {
            this.data.onkeyup(t, this), this.updateTextState()
        }, updateTextState: function () {
            var t = n(this.hiddenInput, PIXI.InputObject.textProp);
            t !== this.data.value && (this.data.value = t, this._textNeedsUpdate = !0), this.data.selection[0] === this.hiddenInput.selectionStart && this.data.selection[1] === this.hiddenInput.selectionEnd || (this.data.selection[0] = this.hiddenInput.selectionStart, this.data.selection[1] = this.hiddenInput.selectionEnd, this.data.cursorPos = this.data.selection[0], this._textNeedsUpdate = !0, this._selectionNeedsUpdate = !0, this._cursorNeedsUpdate = !0)
        }, onMouseMove: function (t) {
            if (this.data.hasFocus && this.data.mouseDown && !(this.data.selectionStart < 0)) {
                var e = this.mousePos(t), i = this.clickPos(e.x, e.y), s = Math.min(this.data.selectionStart, i),
                    n = Math.max(this.data.selectionStart, i);
                this.data.selection[0] === s && this.data.selection[1] === n || (this.data.selection[0] = s, this.data.selection[1] = n, u || (this.hiddenInput.selectionStart = s, this.hiddenInput.selectionEnd = n), this.data.cursorPos = i, this._textNeedsUpdate = !0, this._selectionNeedsUpdate = !0, this._cursorNeedsUpdate = !0)
            }
        }, onMouseDown: function (t) {
            if (2 !== t.data.originalEvent.which && 3 !== t.data.originalEvent.which) {
                this.focus();
                var e = this.mousePos(t);
                this.data.mouseDown = !0, this.data.value === this.data.placeholder && (this._textNeedsUpdate = !0), this.data.selectionStart = this.clickPos(e.x, e.y), this.data.selection[0] = this.data.selectionStart, this.data.selection[1] = this.data.selectionStart, u || (this.hiddenInput.selectionStart = this.data.selectionStart, this.hiddenInput.selectionEnd = this.data.selectionStart), this.data.cursorPos = this.data.selectionStart, this._cursorNeedsUpdate = !0, this._selectionNeedsUpdate = !0
            } else t.data.originalEvent.preventDefault()
        }, onMouseUp: function (t) {
            if (2 !== t.data.originalEvent.which && 3 !== t.data.originalEvent.which) {
                var e = this.mousePos(t), i = this.clickPos(e.x, e.y);
                this.data.selectionStart >= 0 && i !== this.data.selectionStart || (this.data.cursorPos = i, this.data.selection[0] = this.data.cursorPos, this.data.selection[1] = this.data.cursorPos, u || (this.hiddenInput.selectionStart = this.data.cursorPos, this.hiddenInput.selectionEnd = this.data.cursorPos), this._cursorNeedsUpdate = !0), this.data.selectionStart = -1, this.data.mouseDown = !1
            } else t.data.originalEvent.preventDefault()
        }, update: function (t) {
            (t || this.data.dirty || this._textNeedsUpdate || this._textStyleNeedsUpdate || this._selectionNeedsUpdate) && (this.data.dirty && (this.renderTexture(), this.data.dirty = !1), this._textStyleNeedsUpdate && (this.text.setStyle(this.data.text), this.cursor.setStyle(this.data.text), this.cursor.updateText(), this.text._isBitmapFont ? (this.text._data = PIXI.BitmapText.fonts[this.text.fontName], this.text._scale = this.text.fontSize / this.text._data.size, this.text._lineHeight = this.text._data.lineHeight * this.text._scale) : this.textCache = PIXI.InputObject.getTextCache(this), this._textStyleNeedsUpdate = !1), this._textNeedsUpdate && (this.currText = this.clipText(), this.text.text = this.currText || "", this.text.updateText(), this._textNeedsUpdate = !1), this._selectionNeedsUpdate && (this.updateSelection(), this._selectionNeedsUpdate = !1))
        }, updateSelection: function () {
            this.data.selection[0] !== this.data.selection[1] ? (this.selection.visible = !0, this.selection.x = this.selection.y + this.textWidth(this.currText.substring(0, this.data.selection[0] - this.data.clipPos[0])) | 0, this.selection.width = Math.ceil(this.textWidth(this.currText.substring(this.data.selection[0] - this.data.clipPos[0], this.data.selection[1] - this.data.clipPos[0]))) + this.text.style.strokeThickness) : this.selection.visible = !1
        }, renderTexture: function () {
            PIXI.ButtonFactory(this.canvas, this.context, this.data), "none" !== this.data.valign && this.data.valign ? "middle" === this.data.valign ? this.text.y = this.data.textboxTop + (this.data.textboxHeight - this.text.height) / 2 | 0 : "top" === this.data.valign ? this.text.y = 0 | this.data.textboxTop : "bottom" === this.data.valign && (this.text.y = this.data.textboxTop + this.data.textboxHeight - this.text.height | 0) : this.text.y = 0 | this.data.padding, this.cursor.y = this.text.y, this.data.placeholderAlign = this.data.placeholderAlign || this.data.align, this.text.x = this.data.textboxLeft + this.data.padding | 0;
            var t = this.data.padding + this.data.borderWidth + this.data.shadowTop | 0;
            this.selection.y = t, this.selection.height = this.data.height, this._cursorNeedsUpdate = !0, this._selectionNeedsUpdate = !0, this.updateTexture()
        }, clipText: function (e) {
            var i = e === t, s = 0;
            e = i ? this.data.mouseDown || this.data.hasFocus ? this.value : this.data.value || this.data.placeholder || "" : e, "password" === this.data.type && e !== this.data.placeholder && (e = e.replace(/./g, "*"));
            var n = this.textWidth(e), o = e.length, a = this.data.width - 2 * this.data.padding, h = e;
            if (i && e !== this.data.placeholder && (this.data.cursorPos = this.data.cursorPos || 0, o < this.data.clipPos[0] && (this.data.clipPos[0] = 0), this.data.cursorPos > this.data.clipPos[1] ? (s = this.data.clipPos[0], e = e.substr(s, this.data.cursorPos - this.data.clipPos[0]) || "") : this.data.cursorPos < this.data.clipPos[0] ? (s = this.data.cursorPos, e = e.substr(s) || "") : (s = this.data.clipPos[0], e = e.substr(s)), e !== h && (n = this.textWidth(e), o = e.length)), n > a) if (this.text._isBitmapFont) for (; n > a;) i && this.data.cursorPos > this.data.clipPos[1] ? (n -= this.textWidth(e[0]), e = e.substr(1, --o), s++) : (n -= this.textWidth(e[--o]), e = e.substr(0, o)); else for (var r = this.textCache, p = ""; n > a;) i && this.data.cursorPos > this.data.clipPos[1] ? (r[p = e[0]] = r[p] || this.textWidth(p), n -= r[p], e = e.substr(1, --o), s++) : (r[p = e[--o]] = r[p] || this.textWidth(p), n -= r[p], e = e.substr(0, o));
            return i && e !== this.data.placeholder && (this.data.clipPos[0] = s, this.data.clipPos[1] = s + o), e + ""
        }, clickPos: function (t, e) {
            var i = this.currText, s = 0, n = i.length;
            if (t < this.textWidth(i)) for (var o = 0; o < i.length; o++) if ((s += this.textWidth(i[o])) >= t) {
                n = o;
                break
            }
            return this.data.clipPos[0] + n
        }, textWidth: function (t) {
            if (this.text._isBitmapFont) {
                for (var e = null, i = 0, s = this.text._data, n = 0; n < t.length; n++) {
                    var o = t.charCodeAt(n), a = s.chars[o];
                    a && (e && a.kerning[e] && (i += a.kerning[e]), i += a.xAdvance, e = o)
                }
                return i * this.text._scale
            }
            var h = this.context;
            return h.font = this.text.style.font, h.textAlign = "left", h.measureText(t || "").width
        }, mousePos: function (t) {
            return t.data.getLocalPosition(t.target || this)
        }, clearSelection: function () {
            this.data.selection[1] !== this.data.selection[0] && (this.data.cursorPos = 0, this.data.selection[0] = 0, this.data.selection[1] = 0, u || (this.hiddenInput.selectionStart = 0, this.hiddenInput.selectionEnd = 0), this._cursorNeedsUpdate = !0, this._selectionNeedsUpdate = !0)
        }, updateTransform: function () {
            if (this.update(), this.data.hasFocus || this.data.mouseDown) {
                var t = Date.now();
                t - this.cursorTimer >= 300 && (this.cursorTimer = t, this.cursor.visible = !this.cursor.visible), this.selection.visible && (this.cursor.visible = !1), this.cursor.visible && this._cursorNeedsUpdate && (this.cursor.x = this.selection.y - 1 + this.textWidth(this.currText.substring(0, this.data.cursorPos - this.data.clipPos[0])) | 0, this._cursorNeedsUpdate = !1)
            } else this.selection.visible = !1, this.cursor.visible = !1;
            PIXI.Sprite.prototype.updateTransform.call(this)
        }, destroy: function () {
            this.text._isBitmapFont ? this.text = null : (PIXI.InputObject.getTextCache(this, !0), this.text.destroy(!0)), this.cursor.destroy(!0), PIXI.InputObject.prototype.destroy.call(this)
        }
    }, !0), Object.defineProperty(PIXI.Input.prototype, "value", {
        get: function () {
            return this.data.value === this.data.placeholder ? "" : this.data.value
        }, set: function (t) {
            this.data.value = t + "", s(this.hiddenInput, PIXI.InputObject.textProp, t + ""), this._textNeedsUpdate = !0
        }
    }), PIXI.Button = function (t) {
        this.tabIndex = -1, this.data = t || {}, this.data.style && (this.data = h(this.data, PIXI.InputObject.Style(this.data.style))), this.data = h(this.data, M), this.data = h(this.data, b), this.data.text.bitmap ? (this.text = new PIXI.BitmapText(this.data.value || "Temp", this.data.text), this.text._isBitmapFont = !0, this.text._data = PIXI.BitmapText.fonts[this.text.fontName], this.text._scale = this.text.fontSize / this.text._data.size, this.text._lineHeight = this.text._data.lineHeight * this.text._scale, this.data.value || (this._textNeedsUpdate = !0)) : this.text = new PIXI.Text(this.data.value, this.data.text), this.data.height = this.data.height || r(this.text), this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = this.data.width, this.canvas.height = this.data.height, PIXI.InputObject.call(this, -1), this.addChild(this.text), this.boundOnMouseUp = this.onMouseUp.bind(this), this.boundOnMouseUpOutside = this.onMouseUpOutside.bind(this), this.boundOnMouseDown = this.onMouseDown.bind(this), this.interactive = !0, this.buttonMode = !0, this.mousedown = this.touchstart = this.boundOnMouseDown, this.mouseup = this.touchend = this.boundOnMouseUp, this.mouseupoutside = this.touchendoutside = this.boundOnMouseUpOutside
    }, PIXI.Button.prototype = Object.create(PIXI.InputObject.prototype), PIXI.Button.prototype.constructor = PIXI.Button, h(PIXI.Button.prototype, {
        focus: function () {
            PIXI.InputObject.prototype.focus.call(this)
        }, blur: function (t) {
            PIXI.InputObject.prototype.blur.call(t || this)
        }, onMouseDown: function (t) {
            this.focus(), this.data.mouseDown = !0, this.data.onmousedown(t, this)
        }, onMouseUp: function (t) {
            this.data.onmouseup(t, this), this.data.mouseDown = !1
        }, update: function (t) {
            (t || this.data.dirty || this._textNeedsUpdate || this._textStyleNeedsUpdate) && (this.data.dirty && (this.renderTexture(), this.data.dirty = !1), this._textStyleNeedsUpdate && (this.text.setStyle(this.data.text), this.text._isBitmapFont && (this.text._data = PIXI.BitmapText.fonts[this.text.fontName], this.text._scale = this.text.fontSize / this.text._data.size, this.text._lineHeight = this.text._data.lineHeight * this.text._scale), this._textStyleNeedsUpdate = !1), this._textNeedsUpdate && (this.text.setText(this.data.value || ""), this.text.updateText(), "center" === this.data.align ? this.text.x = (this.data.outerWidth - this.text.width) / 2 | 0 : "right" === this.data.align && (this.text.x = this.data.outerWidth - this.text.width - this.data.textboxLeft - this.data.padding | 0), this._textNeedsUpdate = !1))
        }, renderTexture: function () {
            PIXI.ButtonFactory(this.canvas, this.context, this.data), "none" !== this.data.valign && this.data.valign ? "middle" === this.data.valign ? this.text.y = this.data.textboxTop + (this.data.textboxHeight - this.text.height) / 2 | 0 : "top" === this.data.valign ? this.text.y = 0 | this.data.textboxTop : "bottom" === this.data.valign && (this.text.y = this.data.textboxTop + this.data.textboxHeight - this.text.height | 0) : this.text.y = 0 | this.data.padding, this.text.x = this.data.textboxLeft + this.data.padding | 0, this.updateTexture()
        }, updateTransform: function () {
            this.update(), PIXI.Sprite.prototype.updateTransform.call(this)
        }, destroy: function () {
            this.text._isBitmapFont ? this.text.destroy(!0) : this.text = null, PIXI.InputObject.prototype.destroy.call(this)
        }
    }, !0), Object.defineProperty(PIXI.Button.prototype, "value", {
        get: function () {
            return this.data.value
        }, set: function (t) {
            this.data.value = t + "", this._textNeedsUpdate = !0
        }
    }), PIXI.Select = function (t) {
        this.data = t || {}, this.data.style && (this.data = h(this.data, PIXI.InputObject.Style(this.data.style))), this.data = h(this.data, M), this.data = h(this.data, b), this.data.options = this.data.options || {}, this.data.selected = this.data.selected || null, this.selectedIndex = 0, this.lineHeight = 20, this.options = [], this.data.text.bitmap ? (this.text = new PIXI.BitmapText("Temp", this.data.text), this.text._isBitmapFont = !0, this.text._data = PIXI.BitmapText.fonts[this.text.fontName], this.text._scale = this.text.fontSize / this.text._data.size, this.text._lineHeight = this.text._data.lineHeight * this.text._scale) : this.text = new PIXI.Text("", this.data.text), this.selection = new PIXI.Sprite(a(this.data.selectionColor)), this.selection.visible = !1, this.menu = new PIXI.Sprite(a(this.data.backgroundColor)), this.menu.visible = !1, this.data.height = this.data.height || r(this.text), this.canvas = document.createElement("canvas"), this.context = this.canvas.getContext("2d"), this.canvas.width = this.data.width, this.canvas.height = this.data.height, PIXI.InputObject.call(this), this.addChild(this.text), this.addChild(this.menu), this.addChild(this.selection), this.boundOnMouseUp = this.onMouseUp.bind(this), this.boundOnMouseUpOutside = this.onMouseUpOutside.bind(this), this.boundOnMouseDown = this.onMouseDown.bind(this), this.interactive = !0, this.mousedown = this.touchstart = this.boundOnMouseDown, this.mouseup = this.touchend = this.boundOnMouseUp, this.mouseupoutside = this.touchendoutside = this.boundOnMouseUpOutside;
        var e = "";
        for (var i in this.data.options) this.data.selected === i && (this.selectedIndex = this.options.length), this.options.push({
            value: i, text: this.data.options[i]
        }), e += this.data.options[i] + "\n";
        this.data.optionText && this.data.optionText.bitmap ? (this.optionstext = new PIXI.BitmapText(e, this.data.optionText), this.optionstext._isBitmapFont = !0, this.optionstext._data = PIXI.BitmapText.fonts[this.optionstext.fontName], this.optionstext._scale = this.optionstext.fontSize / this.optionstext._data.size, this.optionstext._lineHeight = this.optionstext._data.lineHeight * this.optionstext._scale, this.lineHeight = this.optionstext._lineHeight) : (this.optionstext = new PIXI.Text(e, this.data.optionText || {font: "14px arial"}), this.lineHeight = this.optionstext.height / (this.options.length + 1) - this.optionstext.style.strokeThickness / 2 | 0), this.optionstext.visible = !1, this.addChild(this.optionstext), this.menu.height = this.lineHeight * this.options.length - 1, this.menu.interactive = !0, this.menu.mousedown = this.menu.touchstart = function (t) {
            if (2 === t.originalEvent.which || 3 === t.originalEvent.which) return t.originalEvent.preventDefault(), void this.displayMenu(!1);
            this.selectedIndex = this.getIndexByLocalPosition(t), this.updateText()
        }.bind(this), this.menu.mousemove = this.menu.touchmove = function (t) {
            this.menu.stage && this.menu.stage.interactionManager.hitTest(this.menu, t) && (this.menu.selectedIndex = this.getIndexByLocalPosition(t), this.updateSelection(this.menu.selectedIndex))
        }.bind(this), this.updateText()
    }, PIXI.Select.prototype = Object.create(PIXI.InputObject.prototype), PIXI.Select.prototype.constructor = PIXI.Select, h(PIXI.Select.prototype, {
        getIndexByLocalPosition: function (t) {
            var e = t.getLocalPosition(this).y - this.menu.startY;
            if (!(e < 1 || e > this.menu.height)) {
                var i = Math.floor(e / (this.lineHeight + 1));
                return i < 0 ? i = 0 : i >= this.options.length && (i = this.options.length - 1), i
            }
        }, updateText: function () {
            var t = this.value;
            t ? (this.data.value !== t.text && (this.data.value = t.text), this._textNeedsUpdate = !0, this.updateSelection()) : this.data.value = ""
        }, updateSelection: function (e) {
            this.selection.y = this.menu.startY + this.lineHeight * (e !== t ? e : this.selectedIndex)
        }, focus: function () {
            PIXI.InputObject.prototype.focus.call(this)
        }, blur: function (t) {
            t = t || this, PIXI.InputObject.prototype.blur.call(t), t.displayMenu(!1)
        }, onKeyDown: function (t) {
            var e = t.which;
            t.shiftKey;
            if (27 !== t.which) {
                if (this._textNeedsUpdate = !0, this._selectionNeedsUpdate = !0, this.data.onkeydown(t, this), 32 === e || 13 === e) return t.preventDefault(), void(this.menu.visible ? (this.displayMenu(!1), this.menu.selectedIndex && (this.selectedIndex = this.menu.selectedIndex, this.menu.selectedIndex = null, this.updateText())) : this.displayMenu(!0));
                9 !== e ? (38 === e && (--this.selectedIndex < 0 && (this.selectedIndex = 0), this.updateText()), 40 === e && (++this.selectedIndex >= this.options.length && (this.selectedIndex = this.options.length - 1), this.updateText())) : PIXI.InputObject.Tab(t, e, this)
            } else this.blur()
        }, onKeyUp: function (t) {
            this.data.onkeyup(t, this), this.menu.selectedIndex || this.updateText()
        }, onMouseDown: function (t) {
            this.focus(), this.data.mouseDown = !0, this.data.onmousedown(t, this)
        }, onMouseUp: function (t) {
            this.data.onmouseup(t, this), this.data.mouseDown = !1, this.focus(), this.displayMenu(!this.menu.visible)
        }, displayMenu: function (t) {
            if (this.menu.visible = t, this.selection.visible = !1, this.optionstext.visible = !1, t) {
                this.menu.x = this.data.textboxLeft, this.menu.width = this.data.textboxWidth, this.selection.x = this.data.textboxLeft, this.selection.width = this.data.textboxWidth, this.selection.height = this.lineHeight;
                var e = this.stage ? this.stage.interactionManager.target.height : 0,
                    i = this.y - this.height * this.anchor.y, s = e - (i + this.height);
                this.menu.height > s && i > s ? (this.menu.anchor.y = 1, this.menu.y = 1) : (this.menu.anchor.y = 0, this.menu.y = this.height - 1), this.menu.startY = this.menu.y - this.menu.height * this.menu.anchor.y, this.menu.selectedIndex = null, this.optionstext.y = this.menu.startY, this.optionstext.x = 5, this.optionstext.visible = !0, this.value && (this.selection.visible = !0, this.updateSelection())
            }
        }, update: function (t) {
            (t || this.data.dirty || this._textNeedsUpdate || this._textStyleNeedsUpdate) && (this.data.dirty && (this.renderTexture(), this.data.dirty = !1), this._textStyleNeedsUpdate && (this.text.setStyle(this.data.text), this.text._isBitmapFont && (this.text._data = PIXI.BitmapText.fonts[this.text.fontName], this.text._scale = this.text.fontSize / this.text._data.size, this.text._lineHeight = this.text._data.lineHeight * this.text._scale), this._textStyleNeedsUpdate = !1), this._textNeedsUpdate && (this.text.setText(this.data.value || ""), this.text.updateText(), this._textNeedsUpdate = !1))
        }, renderTexture: function () {
            PIXI.ButtonFactory(this.canvas, this.context, this.data), PIXI.ButtonFactory(g, I, {
                backgroundGradient: ["#bbb", "#eee", "#bbb"], borderWidth: 1, borderColor: this.data.borderColor,
                borderRadius: [0, this.data.borderRadius, this.data.borderRadius, 0], boxShadow: "none",
                innerShadow: "none", padding: 0, width: 25, height: this.data.outerHeight
            }), I.beginPath(), I.moveTo(9 + this.data.borderWidth - 2, this.data.outerHeight / 3 + this.data.borderWidth + 1), I.lineTo(17 - this.data.borderWidth, this.data.outerHeight / 3 + this.data.borderWidth + 1), I.lineTo(12, 2 * this.data.outerHeight / 3 - this.data.borderWidth + 2), I.closePath(), I.fillStyle = "#000", I.fill(), this.context.drawImage(g, 0, 0, 25, this.data.outerHeight, this.data.outerWidth - 25, 0, 25, this.data.outerHeight), "none" !== this.data.valign && this.data.valign ? "middle" === this.data.valign ? this.text.y = this.data.textboxTop + (this.data.textboxHeight - this.text.height) / 2 | 0 : "top" === this.data.valign ? this.text.y = 0 | this.data.textboxTop : "bottom" === this.data.valign && (this.text.y = this.data.textboxTop + this.data.textboxHeight - this.text.height | 0) : this.text.y = 0 | this.data.padding, this.text.x = this.data.textboxLeft + this.data.padding | 0, this.updateTexture()
        }, updateTransform: function () {
            this.update(), PIXI.Sprite.prototype.updateTransform.call(this)
        }, destroy: function () {
            this.text._isBitmapFont ? this.text = null : this.text.destroy(!0), this.optionstext._isBitmapFont ? this.optionstext = null : this.optionstext._isBitmapFont.destroy(!0), PIXI.InputObject.prototype.destroy.call(this)
        }
    }, !0), Object.defineProperty(PIXI.Select.prototype, "value", {
        get: function () {
            return this.options[this.selectedIndex] ? this.options[this.selectedIndex] : null
        }, set: function (t) {
        }
    })
}();
var MGM_VERTICAL = 0, MGM_HORIZONTAL = 1,
    tbMGMString_json = '{"signup":{"en":"Members only!{E}Please login.","jp":"会員専用になります。{E}ログインをしてください。","kr":"회원전용!{E}로그인을 해주세요."},"gotogpg":{"en":"Only available in the Moby Games app.<br/>Would you like to go to the Moby Games app?","jp":"モビゲームアプリのみ購入で きます。<br/>モビゲームアプリに移動しますか？","kr":"모비게임 앱에서만 구매 가능합니다.<br/>모비게임 앱으로 이동하시겠습니까?"},"tapout":{"en":"※Caution※{E}If you leave the game screen,{E}The game pauses","jp":"※注意※{E}ゲーム画面を離れると{E}ゲームが一時停止します","kr":"※주의※{E}게임화면을 벗어나면{E}게임이 일시정지 됩니다"},"home":{"en":"HOME","jp":"ホーム","kr":"HOME"},"nickchange":{"en":"Change Nickname","jp":"ニックネーム変更","kr":"닉네임 변경"},"cashbuy":{"en":"Buy M-Coin","jp":"Mコインショップへ","kr":"M코인 구입"},"baseNick":{"en":"Your current nickname","jp":"現在のニックネーム","kr":"현재 닉네임"},"changeNick":{"en":"Changed nickname","jp":"変更後ニックネーム","kr":"변경 닉네임"},"change":{"en":"change","jp":"変更","kr":"변경"},"confirm":{"en":"Confirm","jp":"確認","kr":"확인"},"rank":{"en":"View rankings","jp":"ランキングを見る","kr":"랭킹보기"},"rankTitle":{"en":"ranking","jp":"ランキング","kr":"랭 킹"},"event":{"en":"event","jp":"イベント","kr":"이벤트"},"bonus":{"en":"bonus","jp":"ボーナス","kr":"보너스"},"nick0":{"en":"Your nickname can not{E}{E}exceed 16 characters.","jp":"ニックネームに指定出来る文字数は{E}{E}１６文字までです。","kr":"닉네임은 16자를{E}{E}넘길수 없습니다."},"nick1":{"en":"Change to nickname{E}{E}{V}is complete.","jp":"ニックネーム{E}{E}{V}に{E}{E}変更しました。","kr":"닉네임{E}{E}{V}으로{E}{E}변경이 완료 되었습니다."},"nick2":{"en":"","jp":"このニックネームはすでに使用されています。","kr":"이미 사용중인 닉네임 입니다."},"terms":{"en":"Terms Of Use","jp":"利用規約","kr":"이용약관"},"notice":{"en":"NOTICE","jp":"NOTICE","kr":"알림"},"ok":{"en":"OK","jp":"OK","kr":"OK"},"lowpoint":{"en":"Not enough points!{E}{E}Do you want to go to the store?","jp":"Mコインが足りません！{E}{E}ストアに移動しますか？{E}{E}※Ｍコインは他のMOVIGAMEタイトルでも{E}{E}使用できます。","kr":"M코인이 부족합니다!{E}{E}상점으로 이동하시겠습니까?{E}{E}M코인은 다른 모비게임 타이틀에도{E}{E}사용됩니다."},"lowpoint1":{"en":"Not enough points!","jp":"Mコインが足りません！","kr":"M코인이 부족합니다!"},"termsTitle":{"en":"","jp":"ゲーム利用規約の同意","kr":"게임이용 약관 동의"},"termsContents":{"en":"","jp":"本ゲームを遊ぶには利用規約に{E}{E}同意して頂く必要がございます。{E}{E}利用規約に同意して頂けますか？","kr":"본 게임을 즐기시려면 이용약관에{E}{E}동의가 필요가 있습니다.{E}{E}이용약관에 동의 하시겠습니까?"},"termsBtn0":{"en":"","jp":"利用規約を確認","kr":"이용약관을 확인"},"termsBtn1":{"en":"","jp":"同意しない","kr":"동의하지않는다"},"termsBtn2":{"en":"","jp":"同意する","kr":"동의한다"},"attendance":{"en":"출석체크가 완료되었습니다.","jp":"ログインボーナスをGETしました！{E}※ボーナスは1日1回です{E}※メニューのイベントから確認できます。","kr":"출석체크가 완료되었습니다."},"warning00":{"en":"","jp":"ゲームの多重起動を行った場合、ゲームの進行状態が失われる{E}可能性があります。別の端末・ブラウザで遊ぶ場合、必ず現在{E}遊んでいるブラウザを閉じてから遊ぶようにして下さい。","kr":"게임을 다중기동을 하였을 경우, 게임의 진행 상태가{E}손실 될 수 있습니다. 다른 단말 브라우저에서 접속 시{E}반드시 현재 브라우저를 닫아주십시요."},"rotate":{"en":"Please rotate your device.","jp":"画面を回転させてください。","kr":"화면을 회전시켜 주세요."}}',
    tbMGMString = JSON.parse(tbMGMString_json);
MGMenu = function (t, e, i, s, n, o) {
    this.main = new PIXI.Container, this.user_id, this.type = t, this.title = e, this.comment = i, this.tbRank = s, this.bDirect = !1, this.ver = n, this.MOVI_POINT = o, this.inappList = [], this.listToast = [], this.btnMenuFlag = !0, this.btnMenuY = 300
}, MGMenu.prototype.MoveMenu = function (t) {
    void 0 === this.btnMenu ? this.btnMenuY = t : TweenLite.to(this.btnMenu.main, .5, {y: t, ease: Power2.easeOut})
}, MGMenu.prototype.ShowMenu = function () {
    void 0 === this.btnMenu ? this.btnMenuFlag = !0 : this.btnMenu.main.visible = !0
}, MGMenu.prototype.HideMenu = function () {
    void 0 === this.btnMenu ? this.btnMenuFlag = !1 : this.btnMenu.main.visible = !1
}, MGMenu.prototype.SetYahooIcon = function (t, e) {
    void 0 === this.btnYahoo ? (this.btnYahooX = t, this.btnYahooY = e) : this.btnYahoo.main.position.set(t, e)
}, MGMenu.prototype.ShowYahooIcon = function () {
    void 0 !== this.btnYahoo && (this.btnYahoo.main.visible = !0)
}, MGMenu.prototype.HideYahooIcon = function () {
    void 0 !== this.btnYahoo && (this.btnYahoo.main.visible = !1)
}, MGMenu.prototype.cbButtonMenu = function () {
    this.sprTopBlind.visible = !0, this.sMenu.visible = !0, this.txtCash.text = this.GetComma(kData[this.MOVI_POINT]) + " M coin", TweenLite.to(this.sMenu, .5, {
        x: 0, ease: Power2.easeOut
    })
}, MGMenu.prototype.cbButtonMenuClose = function () {
    this.sprTopBlind.visible = !1, TweenLite.to(this.sMenu, .5, {
        x: -iMaxSizeX, ease: Power2.easeOut, onComplete: this.cbTweenMenuEnd.bind(this)
    })
}, MGMenu.prototype.cbTweenMenuEnd = function () {
    this.sMenu.visible = !1, this.sNick.visible = !1, this.sShop.visible = !1, this.sRank.visible = !1
}, MGMenu.prototype.cbButtonHome = function () {
    void 0 === yahooIN ? window.open("http://www.LAMPgame.com", "MoviGame") : location.href = "https://games.yahoo-net.jp/title?t=casual"
}, MGMenu.prototype.cbButtonYahoo = function () {
    var t = document.createEvent("UIEvents");
    t.initEvent("recommendation", !0, !1), dispatchEvent(t)
}, MGMenu.prototype.cbButtonNick = function () {
    this.sNick.visible = !0, this.txtBaseNick.text = this.user_id, this.FontScale(this.txtBaseNick, 400), this.input.value = "", this.input.blur()
}, MGMenu.prototype.cbButtonNickChange = function () {
    this.input.value = this.input.value.trim(), this.input.value.length <= 0 || (this.input.value.length > 16 ? this.ShowPopup(this.GetString("nickchange"), this.GetString("nick0"), this.GetString("confirm")) : idchange(this.input.value, this.cbButtonNickChangeComplete.bind(this)))
}, MGMenu.prototype.cbButtonNickChangeComplete = function (t) {
    1 == t.TF ? (this.sNick.visible = !1, this.user_id = this.input.value, this.txtNickName.text = this.user_id, this.FontScale(this.txtNickName, 380), this.ShowPopup(this.GetString("nickchange"), this.GetString("nick1", this.user_id), this.GetString("confirm"))) : this.ShowPopup(this.GetString("nickchange"), this.GetString("nick2"), this.GetString("confirm"))
}, MGMenu.prototype.cbButtonNickClose = function () {
    0 == this.bDirect ? this.sNick.visible = !1 : (this.bDirect = !1, this.cbButtonMenuClose())
}, MGMenu.prototype.ShowPopup = function (t, e, i, s, n) {
    this.sPopup.visible = !0, this.txtPopupTitle.text = t, this.txtPopupContents.text = e, this.FontScale(this.txtPopupContents, 600), this.txtPopupBtn.text = i, this.popupBtnUrl = s, this.popupOKCallBack = n
}, MGMenu.prototype.cbButtonPopupOK = function () {
    void 0 === this.popupBtnUrl ? this.sPopup.visible = !1 : void 0 !== this.popupOKCallBack ? this.popupOKCallBack() : location.href = this.popupBtnUrl
}, MGMenu.prototype.cbButtonPopupClose = function () {
    this.sPopup.visible = !1
}, MGMenu.prototype.cbButtonCashShop = function () {
    inappList(this.cbButtonCashShopListComplete.bind(this))
}, MGMenu.prototype.cbButtonCashShopListComplete = function (t) {
    this.sShop.visible = !0, this.txtShopCash.text = this.GetComma(kData[this.MOVI_POINT]) + " M coin", this.inappList = t.inappList;
    for (var e = 0; e < this.inappList.length; ++e) this.txtShopaddPoint[e].text = this.GetComma(this.inappList[e].addPoint), this.txtShopbonusPoint[e].text = this.GetComma(this.inappList[e].sourcePoint) + " + " + this.GetComma(t.inappList[e].bonusPoint) + " " + this.GetString("bonus"), this.FontScale(this.txtShopbonusPoint[e], 220), this.txtShopCost[e].text = "￥" + this.GetComma(this.inappList[e].Cost)
}, MGMenu.prototype.cbButtonCashShopBuy0 = function () {
    this.cbButtonCashShopBuy(0)
}, MGMenu.prototype.cbButtonCashShopBuy1 = function () {
    this.cbButtonCashShopBuy(1)
}, MGMenu.prototype.cbButtonCashShopBuy2 = function () {
    this.cbButtonCashShopBuy(2)
}, MGMenu.prototype.cbButtonCashShopBuy3 = function () {
    this.cbButtonCashShopBuy(3)
}, MGMenu.prototype.cbButtonCashShopBuy4 = function () {
    this.cbButtonCashShopBuy(4)
}, MGMenu.prototype.cbButtonCashShopBuy5 = function () {
    this.cbButtonCashShopBuy(5)
}, MGMenu.prototype.cbButtonCashShopBuy = function (t) {
    inappCall(this.inappList[t].product_Code, this.cbButtonCashShopBuyComplete.bind(this))
}, MGMenu.prototype.cbButtonCashShopBuyComplete = function (t) {
    this.ShowPopup(this.GetString("nickchange"), this.GetString("nick1", this.user_id), this.GetString("confirm"))
}, MGMenu.prototype.cbButtonCashShopClose = function () {
    0 == this.bDirect ? this.sShop.visible = !1 : (this.bDirect = !1, this.cbButtonMenuClose())
}, MGMenu.prototype.cbButtonRank = function () {
    networkManager.LoadRanking(this.cbButtonRankComplete.bind(this))
}, MGMenu.prototype.cbButtonRankComplete = function () {
    this.sRank.visible = !0, this.SetRank()
}, MGMenu.prototype.SetRank = function () {
    var t = !1;
    switch (this.tbRank[this.iRankSelect]) {
        case"DAILY":
            for (e = 0; e < 6; ++e) this.sprRankBG[e].visible = !0, e < rankingData.day.length ? (0 != e ? this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[1]) : this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[0]), this.txtRank[e].text = rankingData.day[e].rank, this.txtUserName[e].text = rankingData.day[e].user_id, this.FontScale(this.txtUserName[e], 220), this.txtScore[e].text = this.GetComma(rankingData.day[e].score), this.FontScale(this.txtScore[e], 220), rankingData.day[e].rank > 3 ? this.sprRankTop[e].visible = !1 : (this.sprRankTop[e].visible = !0, this.sprRankTop[e].texture = PIXI.Texture.fromFrame("MGM_rank_" + rankingData.day[e].rank + ".png")), this.sprMe[e].visible = !1, rankingData.day[e].user_id == rankingData.myid && (t = !0, this.sprMe[e].visible = !0, this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[2]))) : 0 == t ? (0 != e ? this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[1]) : this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[0]), this.txtRank[e].text = rankingData.my_day_rank.toString(), this.txtUserName[e].text = rankingData.myid, this.FontScale(this.txtUserName[e], 220), this.txtScore[e].text = "No Data", this.FontScale(this.txtScore[e], 220), rankingData.my_day_rank > 3 ? this.sprRankTop[e].visible = !1 : (this.sprRankTop[e].visible = !0, this.sprRankTop[e].texture = PIXI.Texture.fromFrame("MGM_rank_" + rankingData.my_day_rank + ".png")), t = !0, this.sprMe[e].visible = !0, this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[2])) : this.sprRankBG[e].visible = !1;
            break;
        case"TOTAL":
            for (var e = 0; e < 6; ++e) this.sprRankBG[e].visible = !0, e < rankingData.all.length ? (0 != e ? this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[1]) : this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[0]), this.txtRank[e].text = rankingData.all[e].rank, this.txtUserName[e].text = rankingData.all[e].user_id, this.FontScale(this.txtUserName[e], 220), this.txtScore[e].text = this.GetComma(rankingData.all[e].score), this.FontScale(this.txtScore[e], 220), rankingData.all[e].rank > 3 ? this.sprRankTop[e].visible = !1 : (this.sprRankTop[e].visible = !0, this.sprRankTop[e].texture = PIXI.Texture.fromFrame("MGM_rank_" + rankingData.all[e].rank + ".png")), this.sprMe[e].visible = !1, rankingData.all[e].user_id == rankingData.myid && (t = !0, this.sprMe[e].visible = !0, this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[2]))) : 0 == t ? (0 != e ? this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[1]) : this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[0]), this.txtRank[e].text = rankingData.my_all_rank.toString(), this.txtUserName[e].text = rankingData.myid, this.FontScale(this.txtUserName[e], 220), this.txtScore[e].text = "No Data", this.FontScale(this.txtScore[e], 220), rankingData.my_all_rank > 3 ? this.sprRankTop[e].visible = !1 : (this.sprRankTop[e].visible = !0, this.sprRankTop[e].texture = PIXI.Texture.fromFrame("MGM_rank_" + rankingData.my_all_rank + ".png")), t = !0, this.sprMe[e].visible = !0, this.SlicedSpriteChangeTexture(this.sprRankBG[e], this.sprRankBGType[2])) : this.sprRankBG[e].visible = !1
    }
}, MGMenu.prototype.cbButtonRankClose = function () {
    0 == this.bDirect ? this.sRank.visible = !1 : (this.bDirect = !1, this.cbButtonMenuClose())
}, MGMenu.prototype.cbButtonRank0 = function () {
    0 != this.iRankSelect && (this.iRankSelect = 0, this.RankBtnSet(), this.SetRank())
}, MGMenu.prototype.cbButtonRank1 = function () {
    1 != this.iRankSelect && (this.iRankSelect = 1, this.RankBtnSet(), this.SetRank())
}, MGMenu.prototype.RankBtnSet = function () {
    for (var t = 0; t < this.tbRank.length; ++t) t != this.iRankSelect ? (4 == this.ver ? this.btnRankTxt[t].style.fill = this.btnRankTxtColor[0] : this.btnRankTxt[t].tint = this.btnRankTxtColor[0], this.SlicedSpriteChangeTexture(this.btnRank[t].sprite, this.btnRankBGType[0])) : (4 == this.ver ? this.btnRankTxt[t].style.fill = this.btnRankTxtColor[1] : this.btnRankTxt[t].tint = this.btnRankTxtColor[1], this.SlicedSpriteChangeTexture(this.btnRank[t].sprite, this.btnRankBGType[1]))
}, MGMenu.prototype.ShowNotice = function () {
    this.sNotice.visible = !0
}, MGMenu.prototype.cbButtonNoticeClose = function () {
    yahooenventSkip(this.yeidx), this.sNotice.visible = !1
}, MGMenu.prototype.cbButtonEvent = function () {
    this.sEvent.visible = !0;
    for (var t = 0; t < 15; ++t) t < this.attendanceCnt ? this.sprAttendance[t].visible = !0 : this.sprAttendance[t].visible = !1
}, MGMenu.prototype.cbButtonEventClose = function () {
    this.sEvent.visible = !1
}, MGMenu.prototype.ShowDirectNickName = function () {
    this.bDirect = !0, this.cbButtonMenu(), this.sNick.visible = !0
}, MGMenu.prototype.ShowDirectShop = function () {
    this.bDirect = !0, this.cbButtonMenu(), this.sShop.visible = !0
}, MGMenu.prototype.ShowDirectRank = function () {
    this.bDirect = !0, networkManager.LoadRanking(this.ShowDirectRankComplete.bind(this))
}, MGMenu.prototype.ShowDirectRankComplete = function () {
    this.sRank.visible = !0, this.cbButtonMenu(), this.SetRank()
}, MGMenu.prototype.SpriteLoad = function (t, e, i, s, n, o) {
    void 0 === n && (n = .5), void 0 === o && (o = .5);
    var a = PIXI.Sprite.fromFrame(e);
    return a.position.x = i, a.position.y = s, a.anchor.x = n, a.anchor.y = o, t.addChild(a), a
}, MGMenu.prototype.Mathfloor = function (t) {
    var e = 0 | t;
    return e < 0 ? Math.floor(t) : e
}, MGMenu.prototype.SpriteSliceLoad = function (t, e, i, s, n, o, a, h, r, p, d, l) {
    var u = new PIXI.Container, c = new PIXI.Texture.fromFrame(e), M = c.width, b = c.height;
    void 0 === a && (a = this.Mathfloor(M / 2) - 1), void 0 === h && (h = this.Mathfloor(M / 2) - 1), void 0 === r && (r = this.Mathfloor(b / 2) - 1), void 0 === p && (p = this.Mathfloor(b / 2) - 1), void 0 === d && (d = .5), void 0 === l && (l = .5);
    var f = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x, c.frame.y, a, r)));
    f.position.set(-n * d, -o * l);
    var x = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x + a, c.frame.y, M - a - h, r)));
    x.position.set(-n * d + a, -o * l), x.scale.set((n - a - h) / (M - a - h), 1);
    var S = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x + (M - h), c.frame.y, h, r)));
    S.position.set(-n * d + n - h, -o * l);
    var g = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x, c.frame.y + r, a, b - r - p)));
    g.position.set(-n * d, -o * l + r), g.scale.set(1, (o - r - p) / (b - r - p));
    var I = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x + a, c.frame.y + r, M - a - h, b - r - p)));
    I.position.set(-n * d + a, -o * l + r), I.scale.set((n - a - h) / (M - a - h), (o - r - p) / (b - r - p));
    var m = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x + (M - h), c.frame.y + r, h, b - r - p)));
    m.position.set(-n * d + n - h, -o * l + r), m.scale.set(1, (o - r - p) / (b - r - p));
    var v = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x, c.frame.y + (b - p), a, p)));
    v.position.set(-n * d, -o * l + o - p);
    var y = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x + a, c.frame.y + (b - p), M - a - h, p)));
    y.position.set(-n * d + a, -o * l + o - p), y.scale.set((n - a - h) / (M - a - h), 1);
    var G = new PIXI.Sprite(new PIXI.Texture(c.baseTexture, new PIXI.Rectangle(c.frame.x + (M - h), c.frame.y + (b - p), h, p)));
    return G.position.set(-n * d + n - h, -o * l + o - p), u.addChild(f), u.addChild(x), u.addChild(S), u.addChild(g), u.addChild(I), u.addChild(m), u.addChild(v), u.addChild(y), u.addChild(G), u.position.set(i, s), t.addChild(u), u
}, MGMenu.prototype.GetString = function (t, e) {
    switch (lang) {
        case"en":
            return void 0 === e ? tbMGMString[t].en.replace(/{E}/gi, "\n") : tbMGMString[t].en.replace("{V}", e.toString()).replace(/{E}/gi, "\n");
        case"ja":
            return void 0 === e ? tbMGMString[t].jp.replace(/{E}/gi, "\n") : tbMGMString[t].jp.replace("{V}", e.toString()).replace(/{E}/gi, "\n");
        case"ko":
            return void 0 === e ? tbMGMString[t].kr.replace(/{E}/gi, "\n") : tbMGMString[t].kr.replace("{V}", e.toString()).replace(/{E}/gi, "\n")
    }
    return ""
}, MGMenu.prototype.SlicedSpriteChangeTexture = function (t, e) {
    for (var i = 0; i < 9; ++i) t.children[i].texture = e.children[i].texture
}, MGMenu.prototype.FontLoad = function (t, e, i, s, n, o, a, h) {
    void 0 === h && (h = 0), 3 == this.ver && (a.font = a.fontSize + " " + a.fontFamily, void 0 != a.fontWeight && (a.font += " " + a.fontWeight));
    var r = new PIXI.Text(e, a);
    return r.anchor.set(n, o), r.position.x = i, r.position.y = s, h > 0 && r.width > h && r.scale.set(h / r.width), t.addChild(r), r
}, MGMenu.prototype.FontScale = function (t, e, i) {
    t.scale.set(1), t.width > e && (void 0 === i ? t.scale.set(e / t.width) : e / t.width <= i / t.height && t.scale.set(e / t.width)), void 0 != i && t.height > i && e / t.width > i / t.height && t.scale.set(i / t.height)
}, MGMenu.prototype.GetComma = function (t) {
    return (t = String(t)).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
}, MGMenu.prototype.SetToastMsg = function (t, e, i) {
    void 0 === e && (e = 2500), void 0 === i && (i = "center"), this.listToast.unshift(new MGToggle(t, e, i));
    for (var s = 1; s < this.listToast.length; ++s) this.listToast[s].tween.kill(), void 0 == this.listToast[s].tween2 && (kMGMenu.type == MGM_VERTICAL ? this.listToast[s].tween = TweenMax.to(this.listToast[s].sprBG, .5, {
        alpha: .9, y: iCenterSizeY + 540 - 110 * s, ease: Power3.easeOut
    }) : this.listToast[s].tween = TweenMax.to(this.listToast[s].sprBG, .5, {
        alpha: .9, y: iCenterSizeY + 290 - 110 * s, ease: Power3.easeOut
    }))
}, MGMenu.prototype.load = function (t) {
    this.user_id = t;
    var e = PIXI.loader;
    strGamePath.indexOf("dm.") < 0 ? e.add(strGamePath + "../Common/MGMenu_Atlas-0.json", strGamePath + "../Common/MGMenu_Atlas-0.json") : e.add("https://game.jp/Run/Common/MGMenu_Atlas-0.json", "https://game.jp/Run/Common/MGMenu_Atlas-0.json"), void 0 != yahooIN && (this.type == MGM_VERTICAL ? (e.add("https://game.jp/Run/Common/event/MGM_open_h.png", "https://game.jp/Run/Common/event/MGM_open_h.png"), e.add("https://game.jp/Run/Common/event/MGM_ch_00_h.png", "https://game.jp/Run/Common/event/MGM_ch_00_h.png")) : (e.add("https://game.jp/Run/Common/event/MGM_open_w.png", "https://game.jp/Run/Common/event/MGM_open_w.png"), e.add("https://game.jp/Run/Common/event/MGM_ch_00_w.png", "https://game.jp/Run/Common/event/MGM_ch_00_w.png")), e.add("https://game.jp/Run/Common/event/MGM_btn_open.png", "https://game.jp/Run/Common/event/MGM_btn_open.png"), e.add("https://game.jp/Run/Common/event/MGM_ch_01.png", "https://game.jp/Run/Common/event/MGM_ch_01.png")), e.once("complete", this.LoadComplete.bind(this)), e.load()
}, MGMenu.prototype.LoadComplete = function () {
    var spr, spr2, spr3, spr4;
    switch (this.sprRankBG = [], this.txtRank = [], this.txtUserName = [], this.txtScore = [], this.sprRankTop = [], this.sprMe = [], this.sprRankBGType = [], this.btnMenu = new MGMButton(this.main, "MGM_menu_bg.png", 0, this.btnMenuY, this.cbButtonMenu.bind(this), "none", 1, 1, 0, .5), this.btnMenu.main.alpha = .7, this.btnMenu.main.visible = this.btnMenuFlag, this.sprTopBlind = this.SpriteLoad(this.main, "MGM_white.png", iCenterSizeX, iCenterSizeY), this.sprTopBlind.scale.set(iMaxSizeX / 4, iMaxSizeY / 4), this.sprTopBlind.alpha = 0, this.sprTopBlind.interactive = !0, this.sprTopBlind.visible = !1, this.sMenu = new PIXI.Container, this.sNick = new PIXI.Container, this.sShop = new PIXI.Container, this.sRank = new PIXI.Container, this.sPopup = new PIXI.Container, this.sEvent = new PIXI.Container, this.sNotice = new PIXI.Container, this.sTermsOfUse = new PIXI.Container, this.type) {
        case MGM_VERTICAL:
            this.btnYahooX = this.btnYahooX || 65, this.btnYahooY = this.btnYahooY || 65, void 0 == yahooIN && 1 != bMGCHEAT || (this.btnYahoo = new MGMButton(this.main, "plus_logo.png", this.btnYahooX, this.btnYahooY, this.cbButtonYahoo, "none", 1, 1, .5, .5)), spr = this.SpriteLoad(this.sMenu, "MGM_shadow.png", 2 * iCenterSizeX - 40, iCenterSizeY, 0, .5), spr.scale.set(1, iMaxSizeY / 10), spr.tint = 2184090, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY - 593), spr.scale.set((iMaxSizeX - 40) / 4, 23.5), spr.tint = 3048942, spr.interactive = !0, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", 2 * iCenterSizeX - 20, iCenterSizeY), spr.scale.set(10, iMaxSizeY / 4), spr.alpha = 0, spr.tint = 3048942, spr.interactive = !0, this.SpriteLoad(this.sMenu, "MGM_logo_large.png", iCenterSizeX - 190, iCenterSizeY - 595), new MGMButton(this.sMenu, "MGM_btn_close.png", iCenterSizeX + 235, iCenterSizeY - 595, this.cbButtonMenuClose.bind(this), "none", 1, 1, 0, .5), spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY - 541), spr.scale.set((iMaxSizeX - 40) / 4, 2.5), spr.tint = 2184090, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY + 52), spr.scale.set((iMaxSizeX - 40) / 4, (iMaxSizeY - 103) / 4), spr.tint = 16777215, spr.interactive = !0, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", 65, iCenterSizeY - 446), spr.scale.set(32.5, 35), spr.tint = 3048942, spr.interactive = !0, spr.on("click", this.cbButtonHome), spr.on("tap", this.cbButtonHome), spr = this.SpriteLoad(this.sMenu, "MGM_btn_go.png", 65, iCenterSizeY - 446 - 10), this.FontLoad(spr, this.GetString("home"), 0, 60, .5, .5, {
                fontFamily: "Arial", fontSize: "24px", fill: "#ffffff"
            }), this.FontLoad(spr, this.title, 80, -43, 0, .5, {
                fontFamily: "Arial", fontSize: "32px", fontWeight: "bold", fill: "#21539a"
            }), txt = this.FontLoad(spr, this.comment, 80, -10, 0, 0, {
                fontFamily: "Arial", fontSize: "25px", fill: "#21539a", wordWrap: !0, wordWrapWidth: "530"
            }), txt.height >= 88 && (txt.style.fontSize = "19px"), spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY - 260), spr.scale.set((iMaxSizeX - 40) / 4, 46.5), spr.tint = 3048942, spr = this.SpriteSliceLoad(this.sMenu, "MGM_info.png", iCenterSizeX - 20, iCenterSizeY - 260, 650, 170), this.SpriteLoad(spr, "MGM_photo.png", -180, 0), this.txtNickName = this.FontLoad(spr, this.user_id, -70, -30, 0, .5, {
                fontFamily: "Arial", fontSize: "38px", fill: "#21539a"
            }), this.FontScale(this.txtNickName, 380), spr2 = this.SpriteLoad(spr, "MGM_gold.png", -46, 30), spr2.scale.set(.8), this.txtCash = this.FontLoad(spr, this.GetComma(kData[this.MOVI_POINT]) + " M coin", 10, 30, 0, .5, {
                fontFamily: "Arial", fontSize: "24px", fill: "#000000"
            });
            var tty = iCenterSizeY - 90;
            spr = this.SpriteSliceLoad(this.sMenu, "MGM_menu.png", 0, 0, iMaxSizeX - 40, 140, 150, 12, 12, 12), spr2 = new MGMButton(this.sMenu, "MGM_menu.png", iCenterSizeX - 20, tty, this.cbButtonNick.bind(this), "none", 1, 1, 1, 1, spr), this.SpriteLoad(spr2.main, "MGM_btn_nickname.png", -270, 0), this.FontLoad(spr2.sprite, this.GetString("nickchange"), -160, 0, 0, .5, {
                fontFamily: "Arial", fontSize: "48px", fill: "#21539a"
            }), tty += 145, this.tbRank.length > 0 && (spr = this.SpriteSliceLoad(this.sMenu, "MGM_menu.png", 0, 0, iMaxSizeX - 40, 140, 150, 12, 12, 12), spr2 = new MGMButton(this.sMenu, "MGM_menu.png", iCenterSizeX - 20, tty, this.cbButtonRank.bind(this), "none", 1, 1, 1, 1, spr), this.SpriteLoad(spr2.main, "MGM_btn_ranking.png", -270, 0), this.FontLoad(spr2.sprite, this.GetString("rank"), -160, 0, 0, .5, {
                fontFamily: "Arial", fontSize: "48px", fill: "#21539a"
            }), tty += 145), spr = this.SpriteSliceLoad(this.sMenu, "MGM_menu.png", 0, 0, iMaxSizeX - 40, 140, 150, 12, 12, 12), spr2 = new MGMButton(this.sMenu, "MGM_menu.png", iCenterSizeX - 20, tty, this.cbButtonTermsRead.bind(this), "none", 1, 1, 1, 1, spr), this.SpriteLoad(spr2.main, "MGM_btn_terms.png", -270, 0), this.FontLoad(spr2.sprite, this.GetString("terms"), -160, 0, 0, .5, {
                fontFamily: "Arial", fontSize: "48px", fill: "#21539a"
            }), tty += 145, spr = this.SpriteLoad(this.sShop, "MGM_white.png", iCenterSizeX, iCenterSizeY), spr.scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteSliceLoad(this.sShop, "MGM_popup.png", iCenterSizeX, iCenterSizeY, 660, 980, 24, 24, 120, 22), spr2 = this.SpriteLoad(spr, "MGM_btn_shop.png", -260, -433), spr2.scale.set(.8), spr2 = this.FontLoad(spr, this.GetString("cashbuy"), 0, -433, .5, .5, {
                fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", dropShadow: !0,
                dropShadowColor: "#21539a", dropShadowDistance: 5, dropShadowAngle: Math.PI / 3
            }), new MGMButton(spr, "MGM_btn_close.png", 270, -433, this.cbButtonCashShopClose.bind(this), "none"), spr2 = this.SpriteSliceLoad(spr, "MGM_gold_bg.png", 150, -340, 285, 48), this.txtShopCash = this.FontLoad(spr2, "0 Mcoin", 130, 0, 1, .5, {
                fontFamily: "Arial", fontSize: "28px", fill: "#000000"
            }), this.txtShopaddPoint = [], this.txtShopbonusPoint = [], this.txtShopCost = [];
            for (var i = 0; i < 6; ++i) spr2 = this.SpriteSliceLoad(spr, "MGM_list_shop.png", 0, 120 * i - 240, 574, 108, 110, 250, 53, 53), this.txtShopaddPoint[i] = this.FontLoad(spr2, "18,000", -170, -25, 0, .5, {
                fontFamily: "Arial", fontSize: "42px", fontWeight: "bold", fill: "#ffffff"
            }), this.txtShopbonusPoint[i] = this.FontLoad(spr2, "BONUS", -170, 28, 0, .5, {
                fontFamily: "Arial", fontSize: "24px", fontWeight: "bold", fill: "#ED2E2F"
            }), spr3 = this.SpriteSliceLoad(spr2, "MGM_btn_emerald_small.png", 0, 0, 180, 62), spr4 = new MGMButton(spr2, "MGM_btn_emerald_small.png", 180, 0, eval("this.cbButtonCashShopBuy" + i + ".bind(this)"), "none", 1, 1, .5, .5, spr3), this.txtShopCost[i] = this.FontLoad(spr4.sprite, "￥0", 0, 0, .5, .5, {
                fontFamily: "Arial", fontSize: "38px", fontWeight: "bold", fill: "#ffffff", stroke: "#5b4006",
                strokeThickness: 4
            });
            if (this.tbRank.length > 0) {
                spr = this.SpriteLoad(this.sRank, "MGM_white.png", iCenterSizeX, iCenterSizeY), spr.scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteSliceLoad(this.sRank, "MGM_popup.png", iCenterSizeX, iCenterSizeY, 660, 980, 24, 24, 120, 22), spr2 = this.SpriteLoad(spr, "MGM_btn_ranking.png", -260, -433), spr2.scale.set(.8), this.FontLoad(spr, this.GetString("rankTitle"), 0, -433, .5, .5, {
                    fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", dropShadow: !0,
                    dropShadowColor: "#21539a", dropShadowDistance: 5, dropShadowAngle: Math.PI / 3
                }), new MGMButton(spr, "MGM_btn_close.png", 270, -433, this.cbButtonRankClose.bind(this), "none"), this.btnRank = [], this.btnRankTxt = [], this.btnRankBGType = [], this.btnRankBGType[0] = this.SpriteSliceLoad(spr, "MGM_tab_blue.png", 0, 0, 310, 70), this.btnRankBGType[1] = this.SpriteSliceLoad(spr, "MGM_tab_white.png", 0, 0, 309, 70), this.btnRankBGType[0].visible = !1, this.btnRankBGType[1].visible = !1, this.btnRankTxtColor = [10275326, 3048942], this.iRankSelect = 0;
                for (var i = 0; i < this.tbRank.length; ++i) spr2 = this.SpriteSliceLoad(spr, "MGM_tab_blue.png", 0, 0, 320, 70), this.btnRank[i] = new MGMButton(spr, "MGM_tab_white.png", 310 * i - 158, -330, eval("this.cbButtonRank" + i + ".bind(this)"), "none", 1, 1, .5, .5, spr2), this.btnRankTxt[i] = this.FontLoad(this.btnRank[i].sprite, this.tbRank[i], 0, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#9CC9FE"
                });
                this.RankBtnSet();
                for (var i = 0; i < 6; ++i) this.sprRankBG[i] = this.SpriteSliceLoad(spr, "MGM_list_white.png", 0, 120 * i - 220, 574, 108), this.txtRank[i] = this.FontLoad(this.sprRankBG[i], "1", -230, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", lineJoin: "round",
                    stroke: "#21539a", strokeThickness: 5
                }), this.txtUserName[i] = this.FontLoad(this.sprRankBG[i], "No Data", -50, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "45px", fontWeight: "bold", fill: "#555555"
                }), this.FontScale(this.txtUserName[i], 220), this.txtScore[i] = this.FontLoad(this.sprRankBG[i], "No Data", 180, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "45px", fontWeight: "bold", fill: "#744e2b"
                }), this.sprRankTop[i] = this.SpriteLoad(this.sprRankBG[i], "MGM_rank_1.png", -230, 3), this.sprMe[i] = this.SpriteLoad(this.sprRankBG[i], "MGM_me.png", -275, -40), this.FontLoad(this.sprMe[i], "ME", 0, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "28px", fontWeight: "bold", fill: "#ffffff", lineJoin: "round",
                    stroke: "#21539a", strokeThickness: 5
                });
                this.sprRankBGType[0] = this.SpriteSliceLoad(this.sRank, "MGM_list_white.png", 0, 0, 574, 108), this.sprRankBGType[1] = this.SpriteSliceLoad(this.sRank, "MGM_list_blue.png", 0, 0, 574, 108), this.sprRankBGType[2] = this.SpriteSliceLoad(this.sRank, "MGM_list_yellow.png", 0, 0, 574, 108), this.sprRankBGType[0].visible = !1, this.sprRankBGType[1].visible = !1, this.sprRankBGType[2].visible = !1
            }
            if ((spr = this.SpriteLoad(this.sNotice, "MGM_white.png", iCenterSizeX, iCenterSizeY)).scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, void 0 != yahooIN && (this.SpriteLoad(this.sNotice, "https://game.jp/Run/Common/event/MGM_open_h.png", iCenterSizeX, iCenterSizeY), new MGMButton(this.sNotice, "https://game.jp/Run/Common/event/MGM_btn_open.png", iCenterSizeX, iCenterSizeY + 420, this.cbButtonNoticeClose.bind(this), "none")), new MGMButton(this.sNotice, "MGM_btn_close.png", iCenterSizeX + 280, iCenterSizeY - 480, this.cbButtonNoticeClose.bind(this), "none"), void 0 != yahooIN) {
                spr = this.SpriteLoad(this.sEvent, "MGM_white.png", iCenterSizeX, iCenterSizeY), spr.scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteLoad(this.sEvent, "https://game.jp/Run/Common/event/MGM_ch_00_h.png", iCenterSizeX, iCenterSizeY), this.sprAttendance = [];
                for (var i = 0; i < 15; ++i) this.sprAttendance[i] = this.SpriteLoad(spr, "https://game.jp/Run/Common/event/MGM_ch_01.png", i % 5 * 118 - 236, 193 * (i / 5 | 0) - 82);
                new MGMButton(this.sEvent, "MGM_btn_close.png", iCenterSizeX + 275, iCenterSizeY - 405, this.cbButtonEventClose.bind(this), "none")
            }
            break;
        case MGM_HORIZONTAL:
            this.btnYahooX = this.btnYahooX || 65, this.btnYahooY = this.btnYahooY || 655, void 0 == yahooIN && 1 != bMGCHEAT || (this.btnYahoo = new MGMButton(this.main, "plus_logo.png", this.btnYahooX, this.btnYahooY, this.cbButtonYahoo, "none", 1, 1, .5, .5)), spr = this.SpriteLoad(this.sMenu, "MGM_shadow.png", 2 * iCenterSizeX - 40, iCenterSizeY, 0, .5), spr.scale.set(1, iMaxSizeY / 10), spr.tint = 2184090, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY - 315), spr.scale.set((iMaxSizeX - 40) / 4, 23.5), spr.tint = 3048942, spr.interactive = !0, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", 2 * iCenterSizeX - 20, iCenterSizeY), spr.scale.set(10, iMaxSizeY / 4), spr.alpha = 0, spr.tint = 3048942, spr.interactive = !0, this.SpriteLoad(this.sMenu, "MGM_logo_large.png", iCenterSizeX - 480, iCenterSizeY - 313), new MGMButton(this.sMenu, "MGM_btn_close.png", iCenterSizeX + 525, iCenterSizeY - 313, this.cbButtonMenuClose.bind(this), "none", 1, 1, 0, .5), spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY - 263), spr.scale.set((iMaxSizeX - 40) / 4, 2.5), spr.tint = 2184090, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY + 50), spr.scale.set((iMaxSizeX - 40) / 4, (iMaxSizeY - 100) / 4), spr.tint = 16777215, spr = this.SpriteLoad(this.sMenu, "MGM_white.png", 65, iCenterSizeY - 176), spr.scale.set(32.5, 35), spr.tint = 3048942, spr.interactive = !0, spr.on("click", this.cbButtonHome), spr.on("tap", this.cbButtonHome), spr = this.SpriteLoad(this.sMenu, "MGM_btn_go.png", 65, iCenterSizeY - 176 - 10), this.FontLoad(spr, this.GetString("home"), 0, 60, .5, .5, {
                fontFamily: "Arial", fontSize: "24px", fill: "#ffffff"
            }), this.FontLoad(spr, this.title, 80, -43, 0, .5, {
                fontFamily: "Arial", fontSize: "32px", fontWeight: "bold", fill: "#21539a"
            }), txt = this.FontLoad(spr, this.comment, 80, -10, 0, 0, {
                fontFamily: "Arial", fontSize: "18px", fill: "#21539a", wordWrap: !0, wordWrapWidth: "530"
            }), this.FontScale(txt, 530, 88), spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 332, iCenterSizeY + 3), spr.scale.set(154.5, 46.5), spr.tint = 3048942, spr = this.SpriteSliceLoad(this.sMenu, "MGM_info.png", iCenterSizeX - 332, iCenterSizeY + 3, 592, 170), this.SpriteLoad(spr, "MGM_photo.png", -170, 0), this.txtNickName = this.FontLoad(spr, this.user_id, -50, -30, 0, .5, {
                fontFamily: "Arial", fontSize: "38px", fill: "#21539a"
            }), this.FontScale(this.txtNickName, 380), spr2 = this.SpriteLoad(spr, "MGM_gold.png", -26, 30), spr2.scale.set(.8), this.txtCash = this.FontLoad(spr, this.GetComma(kData[this.MOVI_POINT]) + " M coin", 30, 30, 0, .5, {
                fontFamily: "Arial", fontSize: "24px", fill: "#000000"
            }), spr = this.SpriteLoad(this.sMenu, "MGM_white.png", iCenterSizeX - 20, iCenterSizeY + 50), spr.scale.set(2, (iMaxSizeY - 100) / 4), spr.tint = 10275326;
            var tty = iCenterSizeY - 170;
            spr = this.SpriteSliceLoad(this.sMenu, "MGM_menu.png", 0, 0, 616, 140, 150, 12, 12, 12), spr2 = new MGMButton(this.sMenu, "MGM_menu.png", iCenterSizeX + 292, tty, this.cbButtonNick.bind(this), "none", 1, 1, 1, 1, spr), this.SpriteLoad(spr2.main, "MGM_btn_nickname.png", -245, 0), this.FontLoad(spr2.sprite, this.GetString("nickchange"), -130, 0, 0, .5, {
                fontFamily: "Arial", fontSize: "48px", fill: "#21539a"
            }), tty += 145, this.tbRank.length > 0 && (spr = this.SpriteSliceLoad(this.sMenu, "MGM_menu.png", 0, 0, 616, 140, 150, 12, 12, 12), spr2 = new MGMButton(this.sMenu, "MGM_menu.png", iCenterSizeX + 292, tty, this.cbButtonRank.bind(this), "none", 1, 1, 1, 1, spr), this.SpriteLoad(spr2.main, "MGM_btn_ranking.png", -245, 0), this.FontLoad(spr2.sprite, this.GetString("rank"), -130, 0, 0, .5, {
                fontFamily: "Arial", fontSize: "48px", fill: "#21539a"
            }), tty += 145), spr = this.SpriteSliceLoad(this.sMenu, "MGM_menu.png", 0, 0, 616, 140, 150, 12, 12, 12), spr2 = new MGMButton(this.sMenu, "MGM_menu.png", iCenterSizeX + 292, tty, this.cbButtonTermsRead.bind(this), "none", 1, 1, 1, 1, spr), this.SpriteLoad(spr2.main, "MGM_btn_terms.png", -245, 0), this.FontLoad(spr2.sprite, this.GetString("terms"), -130, 0, 0, .5, {
                fontFamily: "Arial", fontSize: "40px", fill: "#21539a"
            }), tty += 145, spr = this.SpriteLoad(this.sShop, "MGM_white.png", iCenterSizeX, iCenterSizeY), spr.scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteSliceLoad(this.sShop, "MGM_popup.png", iCenterSizeX, iCenterSizeY, 1220, 674, 24, 24, 120, 22), spr2 = this.SpriteLoad(spr, "MGM_btn_shop.png", -550, -280), spr2.scale.set(.8), this.FontLoad(spr, this.GetString("cashbuy"), 0, -280, .5, .5, {
                fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", dropShadow: !0,
                dropShadowColor: "#21539a", dropShadowDistance: 5, dropShadowAngle: Math.PI / 3
            }), new MGMButton(spr, "MGM_btn_close.png", 550, -280, this.cbButtonCashShopClose.bind(this), "none"), spr2 = this.SpriteSliceLoad(spr, "MGM_gold_bg.png", 440, -175, 285, 48), this.txtShopCash = this.FontLoad(spr2, "0 Mcoin", 130, 0, 1, .5, {
                fontFamily: "Arial", fontSize: "28px", fill: "#000000"
            });
            var tbX = [-300, 295, -300, 295, -300, 295], tbY = [-60, -60, 80, 80, 220, 220];
            this.txtShopaddPoint = [], this.txtShopbonusPoint = [], this.txtShopCost = [];
            for (var i = 0; i < 6; ++i) spr2 = this.SpriteSliceLoad(spr, "MGM_list_shop.png", tbX[i], tbY[i], 574, 108, 110, 250, 53, 53), this.txtShopaddPoint[i] = this.FontLoad(spr2, "18,000", -170, -25, 0, .5, {
                fontFamily: "Arial", fontSize: "42px", fontWeight: "bold", fill: "#ffffff"
            }), this.txtShopbonusPoint[i] = this.FontLoad(spr2, "BONUS", -170, 28, 0, .5, {
                fontFamily: "Arial", fontSize: "24px", fontWeight: "bold", fill: "#ED2E2F"
            }), spr3 = this.SpriteSliceLoad(spr2, "MGM_btn_emerald_small.png", 0, 0, 180, 62), spr4 = new MGMButton(spr2, "MGM_btn_emerald_small.png", 180, 0, eval("this.cbButtonCashShopBuy" + i + ".bind(this)"), "none", 1, 1, .5, .5, spr3), this.txtShopCost[i] = this.FontLoad(spr4.sprite, "￥0", 0, 0, .5, .5, {
                fontFamily: "Arial", fontSize: "38px", fontWeight: "bold", fill: "#ffffff", stroke: "#5b4006",
                strokeThickness: 4
            });
            if (this.tbRank.length > 0) {
                spr = this.SpriteLoad(this.sRank, "MGM_white.png", iCenterSizeX, iCenterSizeY), spr.scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteSliceLoad(this.sRank, "MGM_popup.png", iCenterSizeX, iCenterSizeY, 1220, 674, 24, 24, 120, 22), spr2 = this.SpriteLoad(spr, "MGM_btn_ranking.png", -550, -280), spr2.scale.set(.8), this.FontLoad(spr, this.GetString("rankTitle"), 0, -280, .5, .5, {
                    fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", dropShadow: !0,
                    dropShadowColor: "#21539a", dropShadowDistance: 5, dropShadowAngle: Math.PI / 3
                }), new MGMButton(spr, "MGM_btn_close.png", 550, -280, this.cbButtonRankClose.bind(this), "none"), this.btnRank = [], this.btnRankTxt = [], this.btnRankBGType = [], this.btnRankBGType[0] = this.SpriteSliceLoad(spr, "MGM_tab_blue.png", 0, 0, 320, 70), this.btnRankBGType[1] = this.SpriteSliceLoad(spr, "MGM_tab_white.png", 0, 0, 320, 70), this.btnRankBGType[0].visible = !1, this.btnRankBGType[1].visible = !1, this.btnRankTxtColor = [10275326, 3048942], this.iRankSelect = 0;
                for (var i = 0; i < this.tbRank.length; ++i) spr2 = this.SpriteSliceLoad(spr, "MGM_tab_blue.png", 0, 0, 320, 70), this.btnRank[i] = new MGMButton(spr, "MGM_tab_white.png", 320 * i - 438, -180, eval("this.cbButtonRank" + i + ".bind(this)"), "none", 1, 1, .5, .5, spr2), this.btnRankTxt[i] = this.FontLoad(this.btnRank[i].sprite, this.tbRank[i], 0, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#9CC9FE"
                });
                this.RankBtnSet(), spr2 = this.SpriteLoad(spr, "MGM_white.png", 320 * this.tbRank.length - 600, -146, 0, .5), spr2.scale.set(138, .5), spr2.tint = 3048942;
                for (var tbX = [-300, -300, -300, 300, 300, 300], tbY = [-50, 90, 230, -50, 90, 230], i = 0; i < 6; ++i) this.sprRankBG[i] = this.SpriteSliceLoad(spr, "MGM_list_white.png", tbX[i], tbY[i], 574, 108), this.txtRank[i] = this.FontLoad(this.sprRankBG[i], "1", -230, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", lineJoin: "round",
                    stroke: "#21539a", strokeThickness: 5
                }), this.txtUserName[i] = this.FontLoad(this.sprRankBG[i], "No Data", -50, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "45px", fontWeight: "bold", fill: "#555555"
                }), this.FontScale(this.txtUserName[i], 220), this.txtScore[i] = this.FontLoad(this.sprRankBG[i], "No Data", 180, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "45px", fontWeight: "bold", fill: "#744e2b"
                }), this.sprRankTop[i] = this.SpriteLoad(this.sprRankBG[i], "MGM_rank_1.png", -230, 3), this.sprMe[i] = this.SpriteLoad(this.sprRankBG[i], "MGM_me.png", -275, -40), this.FontLoad(this.sprMe[i], "ME", 0, 0, .5, .5, {
                    fontFamily: "Arial", fontSize: "28px", fontWeight: "bold", fill: "#ffffff", lineJoin: "round",
                    stroke: "#21539a", strokeThickness: 5
                });
                this.sprRankBGType[0] = this.SpriteSliceLoad(this.sRank, "MGM_list_white.png", 0, 0, 574, 108), this.sprRankBGType[1] = this.SpriteSliceLoad(this.sRank, "MGM_list_blue.png", 0, 0, 574, 108), this.sprRankBGType[2] = this.SpriteSliceLoad(this.sRank, "MGM_list_yellow.png", 0, 0, 574, 108), this.sprRankBGType[0].visible = !1, this.sprRankBGType[1].visible = !1, this.sprRankBGType[2].visible = !1
            }
            if ((spr = this.SpriteLoad(this.sNotice, "MGM_white.png", iCenterSizeX, iCenterSizeY)).scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, void 0 != yahooIN && (this.SpriteLoad(this.sNotice, "https://game.jp/Run/Common/event/MGM_open_w.png", iCenterSizeX, iCenterSizeY), new MGMButton(this.sNotice, "https://game.jp/Run/Common/event/MGM_btn_open.png", iCenterSizeX + 415, iCenterSizeY + 220, this.cbButtonNoticeClose.bind(this), "none")), new MGMButton(this.sNotice, "MGM_btn_close.png", iCenterSizeX + 500, iCenterSizeY - 255, this.cbButtonNoticeClose.bind(this), "none"), void 0 != yahooIN) {
                spr = this.SpriteLoad(this.sEvent, "MGM_white.png", iCenterSizeX, iCenterSizeY), spr.scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteLoad(this.sEvent, "https://game.jp/Run/Common/event/MGM_ch_00_w.png", iCenterSizeX, iCenterSizeY), this.sprAttendance = [];
                for (var i = 0; i < 15; ++i) this.sprAttendance[i] = this.SpriteLoad(spr, "https://game.jp/Run/Common/event/MGM_ch_01.png", i % 8 * 136 - 477, 13 + 193 * (i / 8 | 0));
                new MGMButton(this.sEvent, "MGM_btn_close.png", iCenterSizeX + 545, iCenterSizeY - 290, this.cbButtonEventClose.bind(this), "none")
            }
    }
    (spr = this.SpriteLoad(this.sNick, "MGM_white.png", iCenterSizeX, iCenterSizeY)).scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteSliceLoad(this.sNick, "MGM_popup.png", iCenterSizeX, iCenterSizeY, 654, 700, 24, 24, 120, 22), (spr2 = this.SpriteLoad(spr, "MGM_btn_nickname.png", -260, -293)).scale.set(.8), this.FontLoad(spr, this.GetString("nickchange"), 0, -293, .5, .5, {
        fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", dropShadow: !0,
        dropShadowColor: "#21539a", dropShadowDistance: 5, dropShadowAngle: Math.PI / 3
    }), new MGMButton(spr, "MGM_btn_close.png", 265, -293, this.cbButtonNickClose.bind(this), "none"), this.FontLoad(spr, this.GetString("baseNick"), -230, -140, 0, .5, {
        fontFamily: "Arial", fontSize: "38px", fill: "#000000"
    }), spr3 = this.SpriteSliceLoad(spr, "MGM_panel_blank.png", 0, -70, 456, 66), this.txtBaseNick = this.FontLoad(spr3, this.user_id, -200, 0, 0, .5, {
        fontFamily: "Arial", fontSize: "32px", fill: "#86858c"
    }), this.FontScale(this.txtBaseNick, 400), this.FontLoad(spr, this.GetString("changeNick"), -230, 20, 0, .5, {
        fontFamily: "Arial", fontSize: "38px", fill: "#000000"
    }), (spr2 = this.SpriteLoad(spr, "MGM_white.png", -3, 190)).scale.set(156, 1), spr2.tint = 14408667, spr3 = this.SpriteSliceLoad(spr, "MGM_panel_blank.png", 0, 90, 456, 66), spr2 = this.SpriteSliceLoad(spr, "MGM_btn_emerald.png", 0, -10, 268, 94), spr2 = new MGMButton(spr, "MGM_btn_emerald.png", 0, 270, this.cbButtonNickChange.bind(this), "none", 1, 1, .5, .5, spr2), this.FontLoad(spr2.sprite, this.GetString("change"), 0, 0, .5, .5, {
        fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff"
    });
    var options = {
        readonly: !1, maxlength: null, placeholder: "", placeholderColor: "#bfbebd",
        selectionColor: "rgba(179, 212, 253, 0.8)", value: "", type: "text", onsubmit: function () {
        }, onkeydown: function () {
        }, onkeyup: function () {
        }, onfocus: function () {
        }, onblur: function () {
        }, onmousedown: function () {
        }, onmouseup: function () {
        }, width: 400, height: 66, padding: 5, borderColor: "#000", borderWidth: 0, borderRadius: 0,
        backgroundImage: null, backgroundColor: "#fff", backgroundGradient: null,
        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.1)", innerShadow: "0px 0px 0px rgba(0, 0, 0, 0.4)", valign: "middle",
        align: "center", outline: 0, text: {fontFamily: "Arial", fontSize: "32px", fill: "#000000", align: "left"}
    };
    this.input = new PIXI.Input(options), this.input.position.set(-200, -40), spr3.addChild(this.input), (spr = this.SpriteLoad(this.sPopup, "MGM_white.png", iCenterSizeX, iCenterSizeY)).scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteSliceLoad(this.sPopup, "MGM_popup.png", iCenterSizeX, iCenterSizeY, 654, 700, 24, 24, 120, 22), this.txtPopupTitle = this.FontLoad(spr, this.GetString("nickchange"), 0, -293, .5, .5, {
        fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff", dropShadow: !0,
        dropShadowColor: "#21539a", dropShadowDistance: 5, dropShadowAngle: Math.PI / 3
    }), new MGMButton(spr, "MGM_btn_close.png", 265, -293, this.cbButtonPopupClose.bind(this), "none"), this.txtPopupContents = this.FontLoad(spr, this.GetString("baseNick"), 0, -20, .5, .5, {
        fontFamily: "Arial", fontSize: "38px", fill: "#000000", align: "center"
    }), (spr2 = this.SpriteLoad(spr, "MGM_white.png", -3, 190)).scale.set(156, 1), spr2.tint = 14408667, spr2 = this.SpriteSliceLoad(spr, "MGM_btn_emerald.png", 0, 0, 268, 94), spr2 = new MGMButton(spr, "MGM_btn_emerald.png", 0, 260, this.cbButtonPopupOK.bind(this), "none", 1, 1, .5, .5, spr2), this.txtPopupBtn = this.FontLoad(spr2.sprite, this.GetString("confirm"), 0, 0, .5, .5, {
        fontFamily: "Arial", fontSize: "48px", fontWeight: "bold", fill: "#ffffff"
    }), void 0 != yahooIN && ((spr = this.SpriteLoad(this.sTermsOfUse, "MGM_white.png", iCenterSizeX, iCenterSizeY)).scale.set(iMaxSizeX / 4, iMaxSizeY / 4), spr.tint = 0, spr.alpha = .7, spr.interactive = !0, spr = this.SpriteSliceLoad(this.sTermsOfUse, "MGM_popup.png", iCenterSizeX, iCenterSizeY, 654, 700, 24, 24, 120, 22), this.FontLoad(spr, this.GetString("termsTitle"), 0, -293, .5, .5, {
        fontFamily: "Arial", fontSize: "44px", fontWeight: "bold", fill: "#ffffff", dropShadow: !0,
        dropShadowColor: "#21539a", dropShadowDistance: 5, dropShadowAngle: Math.PI / 3
    }), new MGMButton(spr, "MGM_btn_close.png", 265, -293, this.cbButtonTermsNO.bind(this), "none"), this.FontLoad(spr, this.GetString("termsContents"), 0, -60, .5, .5, {
        fontFamily: "Arial", fontSize: "32px", fill: "#000000", align: "center"
    }), spr2 = this.SpriteSliceLoad(spr, "MGM_btn_grey.png", 0, 0, 300, 80), spr2 = new MGMButton(spr, "MGM_btn_grey.png", 0, 160, this.cbButtonTermsRead.bind(this), "none", 1, 1, .5, .5, spr2), this.FontLoad(spr2.sprite, this.GetString("termsBtn0"), 0, 0, .5, .5, {
        fontFamily: "Arial", fontSize: "32px", fontWeight: "bold", fill: "#ffffff"
    }), spr2 = this.SpriteSliceLoad(spr, "MGM_btn_orange.png", 0, 0, 268, 80), spr2 = new MGMButton(spr, "MGM_btn_orange.png", -150, 260, this.cbButtonTermsNO.bind(this), "none", 1, 1, .5, .5, spr2), this.FontLoad(spr2.sprite, this.GetString("termsBtn1"), 0, 0, .5, .5, {
        fontFamily: "Arial", fontSize: "32px", fontWeight: "bold", fill: "#ffffff"
    }), spr2 = this.SpriteSliceLoad(spr, "MGM_btn_emerald.png", 0, 0, 268, 80), spr2 = new MGMButton(spr, "MGM_btn_emerald.png", 150, 260, this.cbButtonTermsYES.bind(this), "none", 1, 1, .5, .5, spr2), this.FontLoad(spr2.sprite, this.GetString("termsBtn2"), 0, 0, .5, .5, {
        fontFamily: "Arial", fontSize: "32px", fontWeight: "bold", fill: "#ffffff"
    })), this.main.addChild(this.sprTopBlind), this.main.addChild(this.sMenu), this.main.addChild(this.sPopup), this.main.addChild(this.sNotice), this.main.addChild(this.sTermsOfUse), this.sMenu.addChild(this.sNick), this.sMenu.addChild(this.sShop), this.sMenu.addChild(this.sRank), this.sMenu.addChild(this.sEvent), this.sMenu.position.set(-iMaxSizeX, 0), this.sMenu.visible = !1, this.sNick.visible = !1, this.sShop.visible = !1, this.sRank.visible = !1, this.sEvent.visible = !1, this.sPopup.visible = !1, this.sNotice.visible = !1, this.sTermsOfUse.visible = !1, void 0 != yahooIN && (this.SetToastMsg(this.GetString("warning00"), 4e3), yahooenventLIst(this.yahooenventLIstComplete.bind(this)))
}, MGMenu.prototype.ShowTermsOfUse = function () {
    this.sTermsOfUse.visible = !0
}, MGMenu.prototype.cbButtonTermsRead = function () {
    var t = strGamePath + "../Common/terms_of_use.html";
    window.open(t, "", "width=700, height=1200, resizable=no, scrollbars=yes, status=no;")
}, MGMenu.prototype.cbButtonTermsYES = function () {
    kData.bTermsOfUse = !0, networkManager.ForcedSaveData(), this.sTermsOfUse.visible = !1
}, MGMenu.prototype.cbButtonTermsNO = function () {
    this.sTermsOfUse.visible = !1
}, MGMenu.prototype.yahooenventLIstComplete = function (t) {
    t.any_event_list.length > 0 && (this.yeidx = t.any_event_list[0].yeidx, this.ShowNotice()), this.attendanceCnt = t.attendance, this.attendanceTF = t.attendanceTF
}, MGToggle = function (t, e, i) {
    if (this.sprBG, kMGMenu.type == MGM_VERTICAL) {
        this.sprBG = kMGMenu.SpriteSliceLoad(kMGMenu.main, "MGM_info.png", iCenterSizeX, iCenterSizeY + 680, 600, 100), this.sprBG.alpha = 0;
        s = kMGMenu.FontLoad(this.sprBG, t, 0, 0, .5, .5, {
            fontFamily: "Arial", fontSize: "50px", fontWeight: "bold", fill: "#000000", align: i
        });
        kMGMenu.FontScale(s, 570, 90), this.tween = TweenMax.to(this.sprBG, .5, {
            alpha: .9, y: iCenterSizeY + 540, ease: Power3.easeOut
        })
    } else {
        this.sprBG = kMGMenu.SpriteSliceLoad(kMGMenu.main, "MGM_info.png", iCenterSizeX, iCenterSizeY + 400, 600, 100), this.sprBG.alpha = 0;
        var s = kMGMenu.FontLoad(this.sprBG, t, 0, 0, .5, .5, {
            fontFamily: "Arial", fontSize: "50px", fontWeight: "bold", fill: "#000000", align: i
        });
        kMGMenu.FontScale(s, 570, 90), this.tween = TweenMax.to(this.sprBG, .5, {
            alpha: .9, y: iCenterSizeY + 290, ease: Power3.easeOut
        })
    }
    setTimeout(this.cbTweenOut.bind(this), e)
}, MGToggle.prototype.cbTweenOut = function () {
    this.tween2 = TweenMax.to(this.sprBG, .5, {
        alpha: 0, ease: Power3.easeOut, onComplete: this.cbTweenOutComplete.bind(this)
    })
}, MGToggle.prototype.cbTweenOutComplete = function () {
    kMGMenu.listToast.pop(), kMGMenu.main.removeChild(this.sprBG), this.sprBG.parent = void 0, this.tween.kill()
};