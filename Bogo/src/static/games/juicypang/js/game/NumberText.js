gc.NumberText = function (t, align, space, iconName, iconAlign, commaName, spaces) {
    this.CENTER = "center",
        this.RIGHT = "right",
        this.LEFT = "left",
        this.value = 0,
        this.isChange = false,
        this.list = [],
        this.tmpList = [],
        this.fileName = t,
        this.align = align,
        this.space = space,
        this.iconName = iconName,
        this.iconAlign = iconAlign,
        this.commaName = commaName,
        this.iconSpace = this.space,
    null != spaces && (this.iconSpace = spaces),
        this.icon = null,
        this.tl = new TimelineMax,
        PIXI.Container.call(this),
        this.container = new PIXI.Container,
        this.addChild(this.container),
        this.setValue(0)
},
    gc.NumberText.constructor = gc.NumberText,
    gc.NumberText.prototype = Object.create(PIXI.Container.prototype),
    gc.NumberText.prototype.setValue = function (value) {
        this.value = value,
            this.isChange = true
    },
    gc.NumberText.prototype.valueTween = function (value, e) {
        var i = e || 1;
        this.tl.clear(),
            this.tl.to(this, .3, {
                value: value, ease: Sine.easeOut, onUpdate: function () {
                    this.value = Math.floor(this.value / i) * i,
                        this.isChange = true
                }.bind(this)
            })
    },
    gc.NumberText.prototype.getNumberSprite = function (type) {
        var e,
            i = this.fileName + type + ".png";
        return this.tmpList.length > 0 ? (e = this.tmpList.shift()).texture = PIXI.Texture.fromFrame(i) : e = PIXI.Sprite.fromFrame(i), e
    },
    gc.NumberText.prototype.getCommaSprite = function () {
        var t,
            e = this.commaName + ".png";
        return this.tmpList.length > 0 ? (t = this.tmpList.shift()).texture = PIXI.Texture.fromFrame(e) : t = PIXI.Sprite.fromFrame(e),
            t
    },
    gc.NumberText.prototype.removeAll = function () {
        for (var t, e = this.list.length; e--;) t = this.list.shift(),
            this.tmpList.push(t);
        this.container && this.container.removeChildren()
    },
    gc.NumberText.prototype.updateTransform = function () {
        if (this.isChange) {
            this.removeAll();
            var t,
                e,
                i = this.commaName
                    ? Util.comma(this.value)
                    : this.value.toString(),
                n = 0,
                r = 0,
                o = i.length;
            for (this.iconName && (this.icon || (this.icon = PIXI.Sprite.fromFrame(this.iconName + ".png")),
                this.container.addChild(this.icon),
            "left" == this.iconAlign && (r += this.icon.width + this.iconSpace)); o--;)
                (t = "," == (e = i.substr(n, 1))
                    ? this.getCommaSprite()
                    : this.getNumberSprite(parseInt(e) + 1)).x = r,
                    r += t.width,
                o > 0 && (r += this.space), n++,
                    this.container.addChild(t),
                    this.list[o] = t;
            "right" == this.iconAlign && (r += this.iconSpace,
                this.icon.x = r,
                r += this.icon.width),
                this.align == this.CENTER
                    ? this.container.x = -r / 2
                    : this.align == this.RIGHT && (this.container.x = -r),
                this.isChange = false
        }
        PIXI.Container.prototype.updateTransform.call(this)
    }