gc.MissionClearPopup = function () {
    PIXI.Container.call(this),
        this.cups = [],
        this.txtList = [],
        this.effects = [],
        this.tmpEffects = [],
        this.callFunc = null,
        this.target = null,
        this.interval = null,
        this.effectCount = null,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0,
            gc.width,
            gc.height),
        this.darkBg.endFill(),
        this.txt = new PIXI.Sprite.fromFrame("game_text_clear.png"),
        this.txt.anchor.set(.5),
        this.txt.x = gc.width / 2,
        this.moveTitleTxt = new PIXI.Sprite.fromFrame("last_move.png"),
        this.moveTitleTxt.anchor.set(.5),
        this.moveTitleTxt.x = gc.width / 2,
        this.moveTxt = new gc.NumberText("last_move_", "center", -10, "last_move_plus", "left"),
        this.moveTxt.x = gc.width / 2,
        this.tween = new TimelineLite,
        this.tween2 = new TimelineLite,
        this.tween3 = new TimelineLite,
        this.tween4 = new TimelineLite,
        this.container = new PIXI.Container,
        this.setTouchEnd(this,
            this.popupClose,
            this)
},
    gc.MissionClearPopup.prototype.constructor = gc.MissionClearPopup,
    gc.MissionClearPopup.prototype = Object.create(PIXI.Container.prototype),
    gc.MissionClearPopup.prototype.init = function () {
        this.removeAll(),
            this.effectCount = 0
    },
    gc.MissionClearPopup.prototype.show = function (callFunc, target) {
        this.callFunc = callFunc,
            this.target = target,
            this.container.alpha = 1,
            this.addChild(this.darkBg),
            this.addChild(this.container),
            this.addChild(this.txt),
            this.darkBg.alpha = 0,
            this.txt.scale.set(0),
            this.txt.y = gc.height / 2,
            this.tween = new TimelineLite,
            this.tween.to(this.darkBg, .2, {
                alpha: 1, delay: 1
            }),
            this.tween2 = new TimelineLite,
            this.tween2.to(this.txt.scale, .1, {
                x: .5, y: 1.5, delay: .5, ease: Power0.easeNone, onComplete: function () {
                    if (gc.isWebGL) for (var t = 60; t--;) this.showEffect(t + 1, .05 * t)
                }.bind(this)
            }),
            this.tween2.to(this.txt.scale, .5, {x: 1, y: 1, ease: Elastic.easeOut}),
            this.tween2.to(this.txt, .3, {
                y: 290, delay: 1, onComplete: function () {
                    this.showCups(),
                        this.setInteractive(true)
                }.bind(this)
            }),
            gc.effectSoundPlay("sound_clear"),
            gc.effectSoundPlay("sound_juicyClear")
    },
    gc.MissionClearPopup.prototype.showCups = function () {
        var t, e, i, n, r = gc.missionData.length;
        for (t = 0; r > t; t++) n = gc.missionData[t], i = this.getCupImg(n.type),
            this.cups[t] ? (e = this.cups[t]).texture = PIXI.Texture.fromFrame(i) : ((e = new PIXI.Sprite.fromFrame(i)).anchor.set(.5, 1),
                this.cups.push(e)), e.scale.set(.9), e.x = 160 * t, e.y = -200,
            this.container.x = (gc.width - this.container.width) / 2,
            this.container.addChild(e), e.tween = new TimelineLite, e.tween.to(e, .2, {
            y: 700, delay: .15 * t
        }), e.tween.to(e.scale, .05, {y: .7, ease: Sine.easeIn}), e.tween.to(e.scale, .1, {y: .9, ease: Sine.easeOut});
        this.interval = setTimeout(this.showTxt.bind(this), 150 * r + 300)
    },

    gc.MissionClearPopup.prototype.showTxt = function () {
        var t, e, i, n,
            r = 0,
            o = gc.missionList[gc.level - 1],
            s = gc.missionTypeList[gc.level - 1],
            a = gc.missionData.length;
        for (t = 0; a > t; t++) e = this.cups[t],
            this.txtList[t] ? i = this.txtList[t] : (i = new gc.NumberText("last_score", "center", -10),
                this.txtList.push(i)), r = 1 == (n = s[t]) ? 500 * o[t] : 10 == n ? 1500 * o[t] : 20 == n ? 15e3 * o[t] : 30 == n ? 750 * o[t] : 6e3 * o[t], i.setValue(r), i.x = 10 == n ? e.x + 13 : e.x, i.y = e.y - 40, i.alpha = 0, i.tween = new TimelineLite, i.tween.to(i, .2, {
            alpha: 1, y: e.y
        }),
            this.container.addChild(i);
        gc.levelTotal > gc.level ? this.showAddMoveCount() : this.interval = setTimeout(this.popupClose.bind(this), 2e3)
    },

    gc.MissionClearPopup.prototype.showAddMoveCount = function () {
        this.moveTitleTxt.y = gc.height - 20,
            this.moveTitleTxt.alpha = 0,
            this.addChild(this.moveTitleTxt),
            this.tween3 = new TimelineLite,
            this.tween3.to(this.moveTitleTxt, .3, {
                alpha: 1, y: gc.height - 250
            }),
            this.moveTxt.setValue(gc.addMoveCountList[gc.level - 1]),
            this.moveTxt.y = gc.height,
            this.moveTxt.alpha = 0,
            this.addChild(this.moveTxt),
            this.tween4 = new TimelineLite,
            this.tween4.to(this.moveTxt, .3, {
                alpha: 1, y: gc.height - 230
            }),
            this.interval = setTimeout(this.popupClose.bind(this), 2e3)
    },


    gc.MissionClearPopup.prototype.getCupImg = function (t) {
        var img = "last_basic" + t;
        if (t > 10 && 50 > t) switch (10 * Math.floor(t / 10)) {
            case 10:
            case 20:
                img = "last_specialA_" + t % 10;
                break;
            case 30:
                img = "last_specialC_" + t % 10;
                break;
            case 40:
                img = "last_specialB_" + t % 10
        } else if (t > 50 && 60 >= t) switch (t) {
            case 51:
                img = "last_combinationA";
                break;
            case 52:
                img = "last_combinationC";
                break;
            case 53:
                img = "last_combinationB"
        } else t > 60 && 70 > t ? img = "last_ice" : t > 70 && 80 > t && (img = "last_basic7");
        return img + ".png"
    },
    gc.MissionClearPopup.prototype.popupClose = function () {
        this.interval && clearTimeout(this.interval),
            this.interval = null,
            this.tween.kill(),
            this.tween2.kill(),
            this.tween3.kill(),
            this.setInteractive(false),
            this.tween4.kill(),
            this.tween = new TimelineLite,
            this.tween.to(this.container, .2, {alpha: 0}),
            this.tween2 = new TimelineLite,
            this.tween2.to(this.darkBg, .2, {
                alpha: 0, delay: .1, onComplete: function () {
                    this.removeAll(),
                        this.callFunc.call(this.target)
                }.bind(this)
            })
    },
    gc.MissionClearPopup.prototype.showEffect = function (t, delay) {
        var i,
            n = "clar_effect" + (t % 3 + 1) + ".png";

        this.tmpEffects.length
            ? (i = this.tmpEffects.shift()).texture = PIXI.Texture.fromFrame(n)
            : (i = new PIXI.Sprite.fromFrame(n)).anchor.set(.5),
            i.id = this.effectCount,
            i.x = 50 + Math.random() * (gc.width - 100),
            i.y = 300 + 500 * Math.random(),
            i.scale.set(0),
            i.alpha = 2,
        t > 30 && (i.alpha = .5),
            this.addChildAt(i, 1),
            this.effects.push(i),
            this.effectCount++;

        var rand = Math.random() + 1.5;
        TweenMax.to(i.scale, .7, {
            x: rand, y: rand, delay: delay, onCompleteParams: [i], onComplete: this.removeEffect.bind(this)
        }), TweenMax.to(i, .7, {alpha: 0, delay: delay, onCompleteParams: [i.id]})
    },

    gc.MissionClearPopup.prototype.removeEffect = function (count) {
        var effect, i, n = this.effects.length;
        for (i = 0; n > i; i++)
            if ((effect = this.effects[i]).id == count) {
                this.effects.splice(i, 1),
                    this.tmpEffects.push(effect),
                    this.removeChild(effect),
                    TweenMax.killTweensOf(effect);
                break
            }
    },
    gc.MissionClearPopup.prototype.setInteractive = function (interactive) {
        this.interactive = interactive
    },

    gc.MissionClearPopup.prototype.removeAll = function () {
        var effect, e,
            i = this.effects.length;
        for (e = 0; i > e; e++)
            effect = this.effects.shift(),
                this.tmpEffects.push(effect),
                TweenMax.killTweensOf(effect);

        this.interval && clearTimeout(this.interval),
            this.interval = null,
            this.tween.kill(),
            this.tween2.kill(),
            this.tween3.kill(),
            this.setInteractive(false),
            this.tween4.kill(),
            this.container.removeChildren(),
            this.removeChildren()
    },
    gc.MissionClearPopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }