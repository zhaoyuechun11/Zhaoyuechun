gc.IntroSoundPopup = function () {
    PIXI.Container.call(this),
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, 
    gc.width, 
    gc.height),
        this.darkBg.endFill(),
        this.bg = new PIXI.Sprite(gc.loader.resources.main_popup_sound.texture),
        this.bg.anchor.set(.5),
        this.bg.x = gc.width / 2,
        this.bg.y = gc.height / 2,
        this.offBtn = new PIXI.Sprite.fromFrame("main_btn_bgm2.png"),
        this.offBtn.anchor.set(.5),
        this.offBtn.x = -123,
        this.offBtn.y = 184,
        this.setTouchStartAction(this.offBtn),
        this.setTouchEnd(this.offBtn, function () {
                this.setInteractive(false), 
    gc.isSoundSet = false, 
    gc.isBgmSound = false, 
    gc.bgmSoundStop(), LocalStorageManager.setItem(LocalStorageManager.BGM_SOUND, "false"), TweenMax.to(this.bg.scale, .2, {
                    x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                        this.emit("INTRO_SOUND_POPUP_EVENT")
                    }.bind(this)
                })
            },
            this),
        this.bg.addChild(this.offBtn),
        this.onBtn = new PIXI.Sprite.fromFrame("main_btn_bgm1.png"),
        this.onBtn.anchor.set(.5),
        this.onBtn.x = -this.offBtn.x,
        this.onBtn.y = this.offBtn.y,
        this.setTouchStartAction(this.onBtn),
        this.setTouchEnd(this.onBtn, function () {
                this.setInteractive(false), 
    gc.isSoundSet = false, 
    gc.isBgmSound = true, LocalStorageManager.setItem(LocalStorageManager.BGM_SOUND, "true"), TweenMax.to(this.bg.scale, .2, {
                    x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                        this.emit("INTRO_SOUND_POPUP_EVENT")
                    }.bind(this)
                })
            },
            this),
        this.bg.addChild(this.onBtn)
},
    gc.IntroSoundPopup.prototype.constructor = gc.IntroSoundPopup,
    gc.IntroSoundPopup.prototype = Object.create(PIXI.Container.prototype),
    gc.IntroSoundPopup.prototype.init = function () {
        this.removeAll(),
            this.addChild(this.darkBg),
            this.addChild(this.bg),
            this.bg.scale.set(.1), TweenMax.to(this.bg.scale, .2, {
            x: 1, y: 1, ease: Back.easeOut, onComplete: this.endBgMotion.bind(this)
        })
    },
    gc.IntroSoundPopup.prototype.endBgMotion = function () {
        this.setInteractive(true)
    },
    gc.IntroSoundPopup.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.IntroSoundPopup.prototype.setInteractive = function (interactive) {
        this.offBtn.interactive = interactive,
            this.onBtn.interactive = interactive
    },
    gc.IntroSoundPopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }