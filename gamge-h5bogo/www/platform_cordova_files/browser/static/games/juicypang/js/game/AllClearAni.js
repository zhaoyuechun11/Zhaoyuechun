gc.AllClearAni = function () {
    PIXI.Container.call(this),
        this.callFunc = null,
        this.target = null,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.beginFill(0, 1),
        this.darkBg.drawRect(0, 0,
            gc.width,
            gc.height),
        this.darkBg.endFill(),
        this.white = new PIXI.Graphics,
        this.white.beginFill(16777215, 1),
        this.white.drawRect(0, 0,
            gc.width,
            gc.height),
        this.white.endFill(),
        this.white.tween = new TimelineLite,
        this.bg = new PIXI.Sprite(gc.loader.resources.ending_bg.texture),
        this.fireClear = new gc.FireFruit(0,
            gc.width / 2, 400, 2),
        this.fire1 = new gc.FireFruit(1,
            gc.width / 2, 400, 1),
        this.fire2 = new gc.FireFruit(2, 250, 350, 1.5),
        this.fire3 = new gc.FireFruit(3, 400, 650, 1),
        this.fire4 = new gc.FireFruit(4, 500, 400, 1.5),
        this.fire5 = new gc.FireFruit(5, 250, 300, 1),
        this.fire6 = new gc.FireFruit(6,
            gc.width / 2, 600, 1.5),
        this.fruit1 = new gc.ClearFruit(1),
        this.fruit1.x = gc.width / 2 + 90,
        this.fruit1.y = gc.height - 130,
        this.fruit2 = new gc.ClearFruit(5),
        this.fruit2.x = gc.width / 2 - 90,
        this.fruit2.y = gc.height - 130,
        this.fruit3 = new gc.ClearFruit(3),
        this.fruit3.x = 80,
        this.fruit3.y = gc.height - 130,
        this.fruit4 = new gc.ClearFruit(2),
        this.fruit4.x = gc.width - 80,
        this.fruit4.y = gc.height - 130,
        this.fruit5 = new gc.ClearFruit(4),
        this.fruit5.x = 160,
        this.fruit5.y = gc.height - 210,
        this.fruit6 = new gc.ClearFruit(6),
        this.fruit6.x = gc.width - 160,
        this.fruit6.y = gc.height - 200,

        this.setTouchEnd(this, function () {
            this.removeAll(),
                this.callFunc.call(this.target)
        }, this)
},
    gc.AllClearAni.prototype.constructor = gc.AllClearAni,
    gc.AllClearAni.prototype = Object.create(PIXI.Container.prototype),
    gc.AllClearAni.prototype.init = function (callFunc, target) {
        this.removeAll(),
            this.callFunc = callFunc,
            this.target = target,
            this.addChild(this.darkBg),
            this.darkBg.alpha = 0,

            TweenMax.to(this.darkBg, 1, {
                alpha: 1,
                onComplete: function () {
                    gc.game.removeChildren(),
                        gc.game.addChild(this), this.showAni()
                }.bind(this)

            }),

            TweenMax.to(this.darkBg, 2, {
            alpha: 0, delay: 1, onComplete: function () {
                this.setInteractive(true)
            }.bind(this)
        })
    },
    gc.AllClearAni.prototype.showAni = function () {
        this.addChildAt(this.bg, 0);
        for (var l = 6; l--;)
            this["fruit" + (l + 1)].show(),
                this.addChild(this["fruit" + (l + 1)]),
                this.addChild(this["fire" + (l + 1)]);

        this.addChild(this.fireClear),
            this.fireClear.show(),
            TweenMax.delayedCall(2, function () {
                this.showFire()
            }.bind(this))
    },
    gc.AllClearAni.prototype.showFire = function () {
        this.fire1.show(), TweenMax.delayedCall(2, function () {
            this.fire2.show(), TweenMax.delayedCall(1.2, function () {
                this.fire3.show(), TweenMax.delayedCall(1, function () {
                    this.fire4.show(), TweenMax.delayedCall(.6, function () {
                        this.fire5.show(), TweenMax.delayedCall(1, function () {
                            this.fire6.show(), TweenMax.delayedCall(2, function () {
                                this.showFire()
                            }.bind(this))
                        }.bind(this))
                    }.bind(this))
                }.bind(this))
            }.bind(this))
        }.bind(this))
    },

    gc.AllClearAni.prototype.showEffect = function () {
        this.addChild(this.white),
            this.white.alpha = 0,
            this.white.tween.clear(),
            this.white.tween = new TimelineLite,
            this.white.tween.to(this.white, .1, {alpha: .8}),
            this.white.tween.to(this.white, .5, {alpha: 0})
    },

    gc.AllClearAni.prototype.removeAll = function () {
        this.removeChildren()
    },

    gc.AllClearAni.prototype.setInteractive = function (interactive) {
        this.interactive = interactive
    },

    gc.AllClearAni.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }