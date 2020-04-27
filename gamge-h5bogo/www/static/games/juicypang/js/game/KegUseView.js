gc.KegUseView = function () {
    PIXI.Container.call(this),
        this.func = null,
        this.target = null,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, 
    gc.width, 
    gc.height),
        this.darkBg.endFill(),
        this.normalKeg = new PIXI.Sprite.fromFrame("charge_1.png"),
        this.normalKeg.anchor.set(.5),
        this.normalKeg.x = 100,
        this.normalKeg.y = gc.height - 80,
        this.normalKegIcon = new PIXI.Sprite.fromFrame("charge_pack.png"),
        this.normalKegIcon.anchor.set(.5),
        this.normalKeg.addChild(this.normalKegIcon),
        this.kegBg = new PIXI.Sprite.fromFrame("charge2_21.png"),
        this.kegBg.scale.set(1.2),
        this.kegBg.anchor.set(.5),
        this.kegIcon = new PIXI.Sprite.fromFrame("charge_pack.png"),
        this.kegIcon.anchor.set(.5),
        this.kegIcon.y = -8,
        this.kegBg.addChild(this.kegIcon),
        this.txt1 = new PIXI.Sprite.fromFrame("game_keg_text.png"),
        this.txt1.anchor.set(.5),
        this.txt1.x = gc.width / 2,
        this.txt1.y = 540,
        this.kegH = new gc.NumberText("game_keg_time", "right", -6, "game_keg_time11", "right", null, -7),
        this.kegH.x = gc.width / 2 - 15,
        this.kegH.y = this.txt1.y + 50,
        this.kegM = new gc.NumberText("game_keg_time", "right", -6, "game_keg_time11", "right", null, -7),
        this.kegM.y = this.kegH.y,
        this.kegS = new gc.NumberText("game_keg_time", "right", -6),
        this.kegS.y = this.kegH.y,
        this.txt2 = new PIXI.Sprite.fromFrame("game_keg_btn.png"),
        this.txt2.anchor.set(.5),
        this.txt2.x = gc.width / 2,
        this.txt2.y = gc.height - 250,
        this.effect = new gc.MovieClip("ui_mission_", 1, 10, .4),
        this.effect.anchor.set(.5),
        this.effect.loop = false,
        this.effect.x = 100,
        this.effect.y = gc.height - 90,
        this.effect.onComplete = function () {
            TweenMax.delayedCall(.3, function () {
                this.removeAll(),
                this.func && this.func.call(this.target)
            }.bind(this))
        }.bind(this),
        this.effect.stop(),
        this.tween = new TimelineLite,
        this.tween2 = new TimelineLite,
        this.setTouchStart(this),
        this.setTouchEnd(this,
            this.closeView,
            this)
},
    gc.KegUseView.constructor = gc.KegUseView,
    gc.KegUseView.prototype = Object.create(PIXI.Container.prototype),
    gc.KegUseView.prototype.init = function () {
        this.removeAll(),
            this.addChild(this.normalKeg)
    },
    gc.KegUseView.prototype.show = function (t, e) {
        this.func = t,
            this.target = e,
            this.addChild(this.darkBg),
            this.addChild(this.kegBg),
            this.darkBg.alpha = 1, 
    gc.period_keg ? this.showKegTime() : (this.kegBg.x = gc.width / 2,
            this.kegBg.scale.set(1.2),
            this.kegBg.alpha = 1,
            this.kegBg.y = 0, TweenMax.to(this.kegBg, .8, {
            y: gc.height / 2, ease: Bounce.easeOut, onComplete: function () {
                this.setInteractive(true),
                    this.closeView()
            }.bind(this)
        }))
    },
    gc.KegUseView.prototype.showKegTime = function () {
        this.addChild(this.txt1),
            this.addChild(this.kegH),
            this.addChild(this.kegM),
            this.addChild(this.kegS),
            this.kegBg.x = gc.width / 2,
            this.kegBg.scale.set(1.2),
            this.kegBg.alpha = 1,
            this.kegBg.y = 0, TweenMax.to(this.kegBg, .8, {
            y: 390, ease: Bounce.easeOut, onComplete: function () {
                this.setInteractive(true),
                    this.txt2.scale.set(1),
                    this.txt2.alpha = 0,
                    this.addChild(this.txt2),
                    this.tween2 = new TimelineLite,
                    this.tween2.to(this.txt2, .5, {alpha: 1}),
                    this.tween2.to(this.txt2.scale, .5, {
                        x: 1.05, y: 1.05, repeat: -1, yoyo: true
                    })
            }.bind(this)
        }),
            this.darkBg.alpha = 0,
            this.tween = new TimelineLite,
            this.tween.to(this.darkBg, .3, {alpha: 1})
    },
    gc.KegUseView.prototype.setKegTime = function (t) {
        var e = Util.getTimeString(t, false).split(":");
        this.kegH.setValue(e[0]),
            this.kegM.setValue(e[1]),
            this.kegS.setValue(e[2]),
            this.kegM.x = 415,
            this.kegS.x = 465
    },
    gc.KegUseView.prototype.closeView = function () {
        this.setInteractive(false),
            this.tween = new TimelineLite,
            this.tween.to(this.darkBg, .3, {alpha: 0}), TweenMax.to(this.kegBg.scale, .4, {
            x: 1, y: 1
        }), TweenMax.to(this.kegBg, .4, {
            x: 100, y: gc.height - 80, onComplete: function () {
                this.removeAll(),
                    this.addChild(this.kegBg),
                    this.addChild(this.effect),
                    this.effect.gotoAndPlay(1), 
    gc.effectSoundPlay("sound_cup_1_clear")
            }.bind(this)
        }),
            this.removeChild(this.darkBg),
            this.removeChild(this.txt1),
            this.removeChild(this.kegH),
            this.removeChild(this.kegM),
            this.removeChild(this.kegS),
            this.removeChild(this.txt2)
    },
    gc.KegUseView.prototype.pause = function () {
        this.tween.pause(),
            this.tween2.pause()
    },
    gc.KegUseView.prototype.resume = function () {
        this.tween.resume(),
            this.tween2.resume()
    },
    gc.KegUseView.prototype.setInteractive = function (interactive) {
        this.interactive = interactive
    },
    gc.KegUseView.prototype.removeAll = function () {
        this.removeChildren(),
            this.setInteractive(false)
    },
    gc.KegUseView.prototype.updateTransform = function () {
        if (PIXI.Container.prototype.updateTransform.call(this), 
    gc.period_keg) {
            var t = gc.kegTime - Date.now();
            0 >= t ? this.setKegTime(0) : this.setKegTime(t)
        }
    }