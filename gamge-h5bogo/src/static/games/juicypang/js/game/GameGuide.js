gc.GameGuide = function () {
    PIXI.Container.call(this),
        this.guide = new PIXI.Sprite(gc.loader.resources.game_tutorial.texture),
        this.setTouchEnd(this, this.hide, this)
},
    gc.GameGuide.prototype.constructor = gc.GameGuide,
    gc.GameGuide.prototype = Object.create(PIXI.Container.prototype),
    gc.GameGuide.prototype.init = function () {
        this.removeAll()
    },
    gc.GameGuide.prototype.show = function (callFunc, target) {
        this.callFunc = callFunc,
            this.target = target,
            "Y" == LocalStorageManager.getItem(LocalStorageManager.GAME_UI_GUIDE)
                ? this.hide()
                : (
                    this.addChild(this.guide),
                        this.guide.alpha = 0, TweenMax.to(this.guide, .5, {
                        alpha: 1, onComplete: function () {
                            this.setInteractive(true)
                        }.bind(this)
                    }),
                        LocalStorageManager.setItem(LocalStorageManager.GAME_UI_GUIDE, "Y"))
    },
    gc.GameGuide.prototype.hide = function () {
        this.setInteractive(false),
            TweenMax.to(this.guide, .5, {
                alpha: 0, onComplete: function () {
                    this.removeAll(),
                        this.callFunc.call(this.target)
                }.bind(this)
            })
    },
    gc.GameGuide.prototype.removeAll = function () {
        this.removeChildren(),
            this.setInteractive(false)
    },
    gc.GameGuide.prototype.setInteractive = function (interactive) {
        this.interactive = interactive
    },
    gc.GameGuide.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }