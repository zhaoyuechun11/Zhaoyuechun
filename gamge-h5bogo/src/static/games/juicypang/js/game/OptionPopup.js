gc.OptionPopup = function () {
    PIXI.Container.call(this),
        this.buyPoint = 0,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0,
            gc.width,
            gc.height),
        this.darkBg.endFill(),
        this.bg = new PIXI.Sprite(gc.loader.resources.game_option_bg.texture),
        this.bg.anchor.set(.5),
        this.bg.x = gc.width / 2,
        this.bg.y = gc.height / 2,
        this.closeBtn = new PIXI.Sprite.fromFrame("popup_btn_exit.png"),
        this.closeBtn.anchor.set(.5),
        this.closeBtn.x = 195,
        this.closeBtn.y = -255,
        this.setTouchStartAction(this.closeBtn),
        this.setTouchEnd(this.closeBtn, function () {
                this.setInteractive(false), TweenMax.to(this.bg.scale, .3, {
                    x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                        this.emit("OPTION_POPUP_CLOSE_EVENT")
                    }.bind(this)
                })
            },
            this),
        this.bg.addChild(this.closeBtn),
        this.bgmBtn = new PIXI.Sprite.fromFrame("popup_btn_bgm1.png"),
        this.bgmBtn.anchor.set(.5),
        this.bgmBtn.y = -30,
        this.setTouchStartAction(this.bgmBtn),
        this.setTouchEnd(this.bgmBtn, function () {
            gc.isBgmSound = !gc.isBgmSound,
                this.setBgmBtn(gc.isBgmSound, true)
        }.bind(this)),
    gc.isSound && (this.bg.addChild(this.bgmBtn),
        this.setBgmBtn(gc.isBgmSound)),
        this.effectBtn = new PIXI.Sprite.fromFrame("popup_btn_em1.png"),
        this.effectBtn.anchor.set(.5),
        this.effectBtn.y = 82,
        this.setTouchStartAction(this.effectBtn),
        this.setTouchEnd(this.effectBtn, function () {
            gc.isEffectSound = !gc.isEffectSound,
                this.setEffectBtn(gc.isEffectSound)
        }.bind(this)),
    gc.isSound && (this.bg.addChild(this.effectBtn),
        this.setEffectBtn(gc.isEffectSound)),
        this.outBtn = new PIXI.Sprite.fromFrame("popup_btn_gameover.png"),
        this.outBtn.anchor.set(.5),
        gc.isSound ? this.outBtn.y = 190 : this.outBtn.y = 70,
        this.setTouchStartAction(this.outBtn),
        this.setTouchEnd(this.outBtn, function () {
                this.removeChildren(),
                    this.exit()
            },
            this),
        this.bg.addChild(this.outBtn)
},
    gc.OptionPopup.prototype.constructor = gc.OptionPopup,
    gc.OptionPopup.prototype = Object.create(PIXI.Container.prototype),
    gc.OptionPopup.prototype.init = function () {
        this.removeAll(),
            this.outBtn.scale.set(1),
            this.closeBtn.scale.set(1),
            this.addChild(this.darkBg),
            this.addChild(this.bg),
            this.bg.scale.set(.1), TweenMax.to(this.bg.scale, .3, {
            x: 1, y: 1, ease: Back.easeOut, onComplete: this.endBgMotion.bind(this)
        })
    },
    gc.OptionPopup.prototype.introInit = function () {
        this.removeAll(),
            this.outBtn.scale.set(1),
            this.closeBtn.scale.set(1),
            this.bg.removeChild(this.outBtn),
            this.bgmBtn.y = 20,
            this.effectBtn.y = 130,
            this.addChild(this.darkBg),
            this.addChild(this.bg),
            this.bg.scale.set(.1), TweenMax.to(this.bg.scale, .3, {
            x: 1, y: 1, ease: Back.easeOut, onComplete: this.endBgMotion.bind(this)
        })
    },
    gc.OptionPopup.prototype.endBgMotion = function () {
        this.setInteractive(true)
    },
    gc.OptionPopup.prototype.setBgmBtn = function (isBgmSound, bgmSoundPlay) {
        isBgmSound
            ?
            (bgmSoundPlay && gc.bgmSoundPlay(gc.bgmIndex),
            this.bgmBtn.texture = PIXI.Texture.fromFrame("popup_btn_bgm1.png"))
            : (bgmSoundPlay && gc.bgmSoundStop(gc.bgmIndex),
            this.bgmBtn.texture = PIXI.Texture.fromFrame("popup_btn_bgm2.png")),
            LocalStorageManager.setItem(LocalStorageManager.BGM_SOUND,
            isBgmSound)
    },
    gc.OptionPopup.prototype.setEffectBtn = function (isEffectSound) {
        isEffectSound
            ? this.effectBtn.texture = PIXI.Texture.fromFrame("popup_btn_em1.png")
            : (gc.effectAllStop(),
            this.effectBtn.texture = PIXI.Texture.fromFrame("popup_btn_em2.png")),
            LocalStorageManager.setItem(LocalStorageManager.EFFECT_SOUND, isEffectSound)
    },
    gc.OptionPopup.prototype.exit = function () {
        LocalStorageManager.clearStorage(),
            gc.soundAllStop(),
            gc.game.emit("GAME_OUT_EVENT")
    },
    gc.OptionPopup.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.OptionPopup.prototype.setInteractive = function (interactive) {
        this.outBtn.interactive = interactive,
            this.bgmBtn.interactive = interactive,
            this.effectBtn.interactive = interactive,
            this.closeBtn.interactive = interactive
    },
    gc.OptionPopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }