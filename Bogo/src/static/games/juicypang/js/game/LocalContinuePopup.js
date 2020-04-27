gc.LocalContinuePopup = function () {
    PIXI.Container.call(this),
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, 
    gc.width, 
    gc.height),
        this.darkBg.endFill(),
        this.bg = new PIXI.Sprite(gc.loader.resources.main_popup_notice02.texture),
        this.bg.anchor.set(.5),
        this.bg.x = gc.width / 2,
        this.bg.y = gc.height / 2,
        this.startBtn = new PIXI.Sprite.fromFrame("main_btn_replay.png"),
        this.startBtn.anchor.set(.5),
        this.startBtn.x = -120,
        this.startBtn.y = 82,
        this.setTouchStartAction(this.startBtn),
        this.setTouchEnd(this.startBtn, function () {
                this.setInteractive(false), 
    gc.isGameStart = false,
                    this.exit()
            },
            this),
        this.bg.addChild(this.startBtn),
        this.continueBtn = new PIXI.Sprite.fromFrame("main_btn_continue.png"),
        this.continueBtn.anchor.set(.5),
        this.continueBtn.x = -this.startBtn.x,
        this.continueBtn.y = this.startBtn.y,
        this.setTouchStartAction(this.continueBtn),
        this.setTouchEnd(this.continueBtn, function () {
                this.setInteractive(false), TweenMax.to(this.bg.scale, .2, {
                    x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                        this.emit("LOCAL_CONTINUE_EVENT")
                    }.bind(this)
                })
            },
            this),
        this.bg.addChild(this.continueBtn)
},
    gc.LocalContinuePopup.prototype.constructor = gc.LocalContinuePopup,
    gc.LocalContinuePopup.prototype = Object.create(PIXI.Container.prototype),
    gc.LocalContinuePopup.prototype.init = function () {
        this.removeAll(),
            this.continueBtn.scale.set(1),
            this.startBtn.scale.set(1),
            this.addChild(this.darkBg),
            this.addChild(this.bg),
            this.bg.scale.set(.1), TweenMax.to(this.bg.scale, .2, {
            x: 1, y: 1, ease: Back.easeOut, onComplete: this.endBgMotion.bind(this)
        })
    },
    gc.LocalContinuePopup.prototype.endBgMotion = function () {
        this.setInteractive(true)
    },
    gc.LocalContinuePopup.prototype.exit = function () {
        LocalStorageManager.clearStorage(), TweenMax.to(this.bg.scale, .2, {
            x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                this.emit("CLOSE_EVENT")
            }.bind(this)
        })
    },
    gc.LocalContinuePopup.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.LocalContinuePopup.prototype.setInteractive = function (interactive) {
        this.continueBtn.interactive = interactive,
            this.startBtn.interactive = interactive
    },
    gc.LocalContinuePopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }