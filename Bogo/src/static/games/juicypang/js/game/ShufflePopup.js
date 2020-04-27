gc.ShufflePopup = function () {
    PIXI.Container.call(this),
        this.buyPoint = 0,
        this.callFunc = null,
        this.target = null,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, gc.width, gc.height),
        this.darkBg.endFill(),
        this.bg = new PIXI.Sprite(gc.loader.resources.game_shuffle.texture),
        this.bg.anchor.set(.5),
        this.bg.x = gc.width / 2,
        this.bg.y = gc.height / 2,
        this.confirmBtn = new PIXI.Sprite.fromFrame("popup_btn_shuffle.png"),
        this.confirmBtn.anchor.set(.5),
        this.confirmBtn.y = 135,
        this.setTouchStartAction(this.confirmBtn),
        this.setTouchEnd(this.confirmBtn, function () {
                this.setInteractive(false),
                    TweenMax.to(this.bg.scale, .3, {
                        x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                            this.removeAll(),
                                this.callFunc.call(this.target)
                        }.bind(this)
                    })
            },
            this),
        this.bg.addChild(this.confirmBtn)
},
    gc.ShufflePopup.prototype.constructor = gc.ShufflePopup,
    gc.ShufflePopup.prototype = Object.create(PIXI.Container.prototype),
    gc.ShufflePopup.prototype.init = function () {
        this.removeAll()
    },
    gc.ShufflePopup.prototype.show = function (callFunc, target) {
        this.callFunc = callFunc,
            this.target = target,
            this.confirmBtn.scale.set(1),
            this.addChild(this.darkBg),
            this.addChild(this.bg),
            this.bg.scale.set(.1),
            TweenMax.to(this.bg.scale, .3, {
                x: 1,
                y: 1,
                ease: Back.easeOut, onComplete: this.endBgMotion.bind(this)
            })
    },
    gc.ShufflePopup.prototype.endBgMotion = function () {
        this.setInteractive(true)
    },
    gc.ShufflePopup.prototype.removeAll = function () {
        this.removeChildren(),
            this.setInteractive(false)
    },
    gc.ShufflePopup.prototype.setInteractive = function (interactive) {
        this.confirmBtn.interactive = interactive
    },
    gc.ShufflePopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }