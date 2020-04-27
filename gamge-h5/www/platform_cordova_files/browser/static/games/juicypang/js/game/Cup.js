gc.Cup = function () {
    PIXI.Container.call(this),
        this.type = null,
        this.totalPer = null,
        this.per = null,
        this.targetPer = null,
        this.point = 0,
        this.isHelp = false,
        this.helpBtn = new PIXI.Graphics,
        this.helpBtn.lineStyle(1, 0, 1),
        this.helpBtn.beginFill(0, 1),
        this.helpBtn.drawRect(-60, 40, 120, 190),
        this.helpBtn.endFill(),
        this.helpBtn.alpha = 0,
        this.setTouchStart(this.helpBtn, function () {
            !gc.isMissionHelp && gc.isPlay && (gc.isMissionHelp = true,
                gc.game.ui.emit("MISSION_HELP_EVENT", {
                    type: this.type, per: this.targetPer, totalPer: this.totalPer
                }))
        }, this),
        this.tween = new TimelineLite,
        this.tween2 = new TimelineLite,
        this.cup = new PIXI.Sprite.fromFrame("ui_basic1_1.png"),
        this.cup.anchor.set(.5),
        this.missionIcon = new PIXI.Sprite.fromFrame("ui_missionBg01_1.png"),
        this.missionIcon.anchor.set(.5),
        this.missionIcon.x = -32,
        this.missionIcon.y = 205,
        this.missionBg = new PIXI.Sprite.fromFrame("ui_missionBg.png"),
        this.missionBg.anchor.set(.5),
        this.missionBg.x = 10,
        this.missionBg.y = this.missionIcon.y + 4,
        this.missionTxt = new gc.NumberText("ui_score_", "center", -5),
        this.missionTxt.x = 10,
        this.missionTxt.y = -15,
        this.missionBg.addChild(this.missionTxt),
        this.effect = new gc.MovieClip("ui_mission_", 1, 10, .4),
        this.effect.anchor.set(.5),
        this.effect.loop = false,
        this.effect.y = 100,
        this.effect.onComplete = function () {
            this.removeChild(this.effect)
        }.bind(this)
},
    gc.Cup.constructor = gc.Cup,
    gc.Cup.prototype = Object.create(PIXI.Container.prototype),

    gc.Cup.prototype.init = function (type, totalPer, isHelp) {
        this.removeAll(),
            this.isHelp = false | isHelp,
            this.type = type,
            this.totalPer = totalPer,
            this.targetPer = 0,
            this.per = 0,
            this.cup.scale.set(1),
            this.cup.x = 0,
            this.missionIcon.scale.set(1);

        var img = "ui_missionBg01_" + this.type;
        if (this.type <= 50)
            this.type > 10 && this.type <= 20
                ? img = "ui_missionBg02_" + (this.type % 10 + 6)
                : this.type > 20 && this.type <= 30
                ? img = "ui_missionBg02_" + this.type % 10
                : this.type > 30 && this.type <= 40
                    ? img = "ui_missionBg03_" + this.type % 10
                    : this.type > 40 && (img = "ui_missionBg04_" + this.type % 10);
        else if (this.type > 50 && this.type <= 60)
            switch (this.type) {
                case 51:
                    img = "ui_missionBg06_3";
                    break;
                case 52:
                    img = "ui_missionBg06_2";
                    break;
                case 53:
                    img = "ui_missionBg06_1"
            }
        else 61 == this.type
                ? img = "ui_missionBg05"
                : 71 == this.type && (img = "ui_missionBg01_7");

        this.missionIcon.texture = PIXI.Texture.fromFrame(img + ".png"),
            this.missionTxt.setValue(this.totalPer),
            this.addChild(this.cup),
            this.addChild(this.missionBg),
            this.addChild(this.missionIcon),
            this.setJuice(),
        this.isHelp && (this.addChild(this.helpBtn),
            this.setInteractive(true))
    },
    gc.Cup.prototype.addJuice = function (per) {
        this.targetPer != this.totalPer && (
            this.targetPer += per,
            this.targetPer > this.totalPer && (this.targetPer = this.totalPer),
                this.tween = new TimelineLite, this.tween.to(this, .3, {
                per: this.targetPer, delay: 1, ease: Power0.easeNone, onStart: this.addMission.bind(this),
                onUpdate: this.setJuice.bind(this)
            }),
            this.tween2 && this.tween2.isActive() || (this.tween2 = new TimelineLite, this.tween2.to(this.cup.scale, .1, {
                x: .9, delay: 1, y: 1.1
            }),
                this.tween2.to(this.cup.scale, .2, {x: 1.2, y: .8}), this.tween2.to(this.cup.scale, .1, {x: 1, y: 1})))
    },
    gc.Cup.prototype.setMission = function (per) {
        this.targetPer = per,
            this.per = per,
            this.setMissionTxt(this.getMissionCount()),
            this.setJuice()
    },
    gc.Cup.prototype.addMission = function () {
        this.setMissionTxt(this.getMissionCount())
    },
    gc.Cup.prototype.getMissionCount = function () {
        return this.totalPer - this.targetPer
    },
    gc.Cup.prototype.moveOut = function (x, delay) {
        this.tween = new TimelineLite,
            this.tween.to(this, .4, {x: x, delay: delay, ease: Back.easeIn})
    },
    gc.Cup.prototype.moveIn = function (x, delay) {
        this.tween = new TimelineLite,
            this.x = gc.width + 100,
            this.tween.to(this, .4, {
                x: x, delay: delay, ease: Back.easeOut
            })
    },
    gc.Cup.prototype.setJuice = function () {
        var t = Math.floor(this.per / this.totalPer * 20) + 1,
            img = "ui_basic" + this.type;
        if (this.cup.y = 120, this.type > 10 && this.type < 50) {
            switch (10 * Math.floor(this.type / 10)) {
                case 10:
                case 20:
                    img = "ui_specialA" + this.type % 10;
                    break;
                case 30:
                    img = "ui_specialC" + this.type % 10;
                    break;
                case 40:
                    img = "ui_specialB" + this.type % 10
            }
            this.cup.y = 123
        }
        else if (this.type > 50 && this.type <= 60)
            switch (this.type) {
                case 51:
                    img = "ui_combinationA";
                    break;
                case 52:
                    img = "ui_combinationC";
                    break;
                case 53:
                    img = "ui_combinationB"
            }
        else 61 == this.type ? (img = "ui_ice", this.cup.y = 128) : 71 == this.type && (img = "ui_basic7", this.cup.y = 120);

        this.cup.texture = PIXI.Texture.fromFrame(img + "_" + t + ".png"),
        this.per == this.totalPer && TweenMax.delayedCall(.1, function () {
            this.setFull(),
            this.tween2 && this.tween2.clear(),
                this.cup.scale.set(2),
                this.tween = new TimelineLite,
                this.tween.to(this.cup.scale, .8, {
                    x: 1, y: 1, ease: Elastic.easeOut
                }),
                this.effect.gotoAndPlay(0),
                this.addChild(this.effect),
                this.type < 10
                    ? gc.effectSoundPlay("sound_cup_1_clear")
                    : this.type > 50
                    ? gc.effectSoundPlay("sound_cup_3_clear")
                    : gc.effectSoundPlay("sound_cup_2_clear")
        }.bind(this))
    },
    gc.Cup.prototype.setFull = function () {
        var img = "ui_basic" + this.type + "_success";
        if (this.cup.y = 100, this.cup.scale.set(1), this.type > 10 && this.type < 50) {
            switch (10 * Math.floor(this.type / 10)) {
                case 10:
                case 20:
                    img = "ui_specialA" + this.type % 10 + "_success";
                    break;
                case 30:
                    img = "ui_specialC" + this.type % 10 + "_success";
                    break;
                case 40:
                    img = "ui_specialB" + this.type % 10 + "_success"
            }
            this.cup.x = -14, this.cup.y = 114
        }
        else if (this.type > 50 && this.type <= 60) {
            switch (this.type) {
                case 51:
                    img = "ui_combinationA_success";
                    break;
                case 52:
                    img = "ui_combinationC_success";
                    break;
                case 53:
                    img = "ui_combinationB_success"
            }
            this.cup.y = 112
        }
        else 61 == this.type
                ? (img = "ui_ice_success", this.cup.y = 111)
                : 71 == this.type && (img = "ui_basic7_success", this.cup.y = 95);

        this.cup.texture = PIXI.Texture.fromFrame(img + ".png")
    },
    gc.Cup.prototype.setMissionTxt = function (t) {
        this.missionTxt.valueTween(t)
    },
    gc.Cup.prototype.getIsFull = function () {
        return this.targetPer == this.totalPer && (this.missionTxt.setValue(0), true)
    },
    gc.Cup.prototype.pause = function () {
        this.tween.pause(),
            this.tween2.pause(),
            this.setInteractive(false)
    },
    gc.Cup.prototype.resume = function () {
        this.tween.resume(),
            this.tween2.resume(),
            this.setInteractive(true)
    },
    gc.Cup.prototype.removeAll = function () {
        this.removeChildren(),
            this.tween.clear(),
            this.tween2.clear()
    },
    gc.Cup.prototype.setInteractive = function (interactive) {
        this.isHelp && (this.helpBtn.interactive = interactive)
    },
    gc.Cup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }