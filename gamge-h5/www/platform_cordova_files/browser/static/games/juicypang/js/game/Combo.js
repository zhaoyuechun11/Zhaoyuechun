gc.Combo = function () {
    PIXI.Container.call(this),
        this.tween = new TimelineLite,
        this.txt = new gc.NumberText("count_combo_", "center", -1, "t_combo", "left", null, 6),
        this.txt.x = gc.width / 2,
        this.txt.y = 145
},
    gc.Combo.constructor = gc.Combo,
    gc.Combo.prototype = Object.create(PIXI.Container.prototype),
    gc.Combo.prototype.init = function () {
        this.removeAll()
    },
    gc.Combo.prototype.show = function (txt) {
        1 == txt && this.addChild(this.txt),
            this.txt.setValue(txt),
            this.txt.scale.set(0),
            this.tween.to(this.txt.scale, .2, {
                x: 1, y: 1, ease: Back.easeOut
            })
    },
    gc.Combo.prototype.hide = function () {
        this.removeAll()
    },
    gc.Combo.prototype.pause = function () {
        this.tween.pause()
    },
    gc.Combo.prototype.resume = function () {
        this.tween.resume()
    },
    gc.Combo.prototype.removeAll = function () {
        this.removeChildren(), this.tween.clear()
    },
    gc.Combo.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }