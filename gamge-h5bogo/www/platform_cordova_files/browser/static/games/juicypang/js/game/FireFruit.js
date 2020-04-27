gc.FireFruit = function (type, tx, ty, showTime) {
    PIXI.Container.call(this),
        this.sc = null,
        this.type = type,
        this.tx = tx,
        this.ty = ty,
        this.showTime = showTime,
        this.fire1 = new gc.MovieClip("ending_start_", 1, 3, .1),
        this.fire1.loop = true,
        this.fire2 = new PIXI.Sprite.fromFrame("ending_fw1_1.png"),
        this.fire2.anchor.set(.5)
},
    gc.FireFruit.prototype.constructor = gc.FireFruit,
    gc.FireFruit.prototype = Object.create(PIXI.Container.prototype),
    gc.FireFruit.prototype.show = function () {
        this.removeAll(),
            this.sc = Util.randomNumber(30) / 100 + .6,
            this.fire1.x = this.tx,
            this.fire1.y = gc.height - 300,
            this.addChild(this.fire1),
            this.fire1.gotoAndPlay(1),
            TweenMax.to(this.fire1, 1, {
                y: this.ty,
                onComplete: function () {
                    this.removeChild(this.fire1),
                        this.showFire(),
                        this.parent.showEffect()
                }.bind(this)
            })
    },
    gc.FireFruit.prototype.showFire = function () {
        this.type > 0
            ? (this.fire2.texture = PIXI.Texture.fromFrame("ending_fw" + this.type + "_1.png"),
                this.fire2.x = this.tx,
                this.fire2.y = this.ty,
                TweenMax.delayedCall(.5 + this.showTime, this.hide.bind(this)))
            : (this.fire2.texture = PIXI.Texture.fromFrame("ending_fw0.png"),
                this.fire2.x = this.tx,
                this.fire2.y = this.ty,
                TweenMax.delayedCall(this.showTime, this.hide.bind(this))),
            this.addChild(this.fire2),
            this.fire2.alpha = 0,
            this.fire2.scale.set(.1),
            TweenMax.to(this.fire2, 1, {alpha: 1}),
            TweenMax.to(this.fire2.scale, 1, {
                x: this.sc, y: this.sc
            })
    },
    gc.FireFruit.prototype.hide = function () {
        TweenMax.to(this.fire2, 1, {alpha: 0, delay: .3}),
            TweenMax.delayedCall(1, this.removeAll.bind(this))
    },
    gc.FireFruit.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.FireFruit.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }