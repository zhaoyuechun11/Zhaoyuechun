gc.MissionPopup = function () {
    PIXI.Container.call(this),
        this.callFunc = null,
        this.target = null,
        this.addCountAry = null,
        this.missionNum = null,
        this.startX = 65,
        this.space = 125,
        this.type = 1,
        this.tipIndex = 1,
        this.tipTotal = 24,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0,
            gc.width,
            gc.height),
        this.darkBg.endFill(),
        this.bg = new PIXI.Sprite(gc.loader.resources.game_neworder_bg1.texture),
        this.bg.anchor.set(.5),
        this.bg.x = gc.width / 2,
        this.bg.y = gc.height / 2 - 100,
        this.cup1 = new gc.Cup,
        this.cup2 = new gc.Cup,
        this.cup3 = new gc.Cup,
        this.cup4 = new gc.Cup,
        this.cupContainer = new PIXI.Container,
        this.cupContainer.scale.set(.9),
        this.bg.addChild(this.cupContainer),
        this.txt = new PIXI.Sprite.fromFrame("game_neworder_1.png"),
        this.txt.anchor.set(.5),
        this.txt.y = 230,
        this.bg.addChild(this.txt),
        this.tip = new PIXI.Sprite.fromFrame("neworder_tip_1.png"),
        this.tip.anchor.set(.5),
        this.tip.x = gc.width / 2,
        this.tipNumTxt = new gc.NumberText("neworder_tip2_", "right", -6),
        this.tipNumTxt.x = 285,
        this.tipNumTxt.y = -95,
        this.tip.addChild(this.tipNumTxt),
        this.tipTotalTxt = new gc.NumberText("neworder_tip2_", "left", -6),
        this.tipTotalTxt.x = this.tipNumTxt.x + 4,
        this.tipTotalTxt.y = this.tipNumTxt.y,
        this.tip.addChild(this.tipTotalTxt),
        this.prevBtn = new PIXI.Sprite.fromFrame("neworder_tip_btn.png"),
        this.prevBtn.anchor.set(.5),
        this.setTouchStartAction(this.prevBtn),
        this.setTouchEnd(this.prevBtn, function () {
                this.tipIndex--,
                this.tipIndex < 1 && (this.tipIndex = this.tipTotal),
                    this.setTipImg()
            },
            this),
        this.prevBtn.x = -310,
        this.tip.addChild(this.prevBtn),
        this.nextBtn = new PIXI.Sprite.fromFrame("neworder_tip_btn.png"),
        this.nextBtn.anchor.set(.5),
        this.nextBtn.scale.x = -1,
        this.setTouchStartAction(this.nextBtn),
        this.setTouchEnd(this.nextBtn, function () {
                this.tipIndex++,
                this.tipIndex > this.tipTotal && (this.tipIndex = 1),
                    this.setTipImg()
            },
            this),
        this.nextBtn.x = -this.prevBtn.x,
        this.tip.addChild(this.nextBtn),
        this.setTouchEnd(this,
            this.popupClose,
            this)
},
    gc.MissionPopup.prototype.constructor = gc.MissionPopup,
    gc.MissionPopup.prototype = Object.create(PIXI.Container.prototype),
    gc.MissionPopup.prototype.init = function () {
        this.removeAll()
    },
    gc.MissionPopup.prototype.show = function (t, e) {
        switch (this.callFunc = t,
            this.target = e,
            this.type = 1,
            this.tipIndex = Util.randomNumber(this.tipTotal) + 1, Util.randomNumber(10) < 5 && (this.tipIndex = 20),
            gc.level) {
            case 1:
                this.tipIndex = 20;
                break;
            case 6:
                this.tipIndex = 4;
                break;
            case 11:
                this.tipIndex = 5;
                break;
            case 12:
                this.tipIndex = 8;
                break;
            case 14:
                this.tipIndex = 6;
                break;
            case 18:
                this.tipIndex = 22;
                break;
            case 26:
                this.tipIndex = 9;
                break;
            case 27:
                this.tipIndex = 10;
                break;
            case 28:
                this.tipIndex = 11;
                break;
            case 36:
                this.tipIndex = 23
        }
        this.prevBtn.scale.set(1),
            this.nextBtn.scale.set(-1),
            this.addChild(this.darkBg),
            this.addChild(this.tip),
            this.addChild(this.bg);
        var i = 0;
        switch (gc.level) {
            case 1:
                i = 1;
                break;
            case 6:
                i = 8;
                break;
            case 11:
                i = 2;
                break;
            case 12:
                i = 3;
                break;
            case 14:
                i = 4;
                break;
            case 18:
                i = 9;
                break;
            case 26:
                i = 5;
                break;
            case 27:
                i = 6;
                break;
            case 28:
                i = 7
        }
        this.setTipImg(),
            i
                ? (this.txt.texture = PIXI.Texture.fromFrame("game_neworder_" + i + ".png"),
                    this.txt.alpha = 1)
                : (this.type = 2,
                    this.txt.alpha = 0),

            this.bg.texture = gc.loader.resources["game_neworder_bg" + this.type].texture,
            this.setCups(),
            this.bg.scale.set(.1), TweenMax.to(this.bg.scale, .3, {
            x: 1, y: 1, ease: Back.easeOut, onComplete: this.endBgMotion.bind(this)
        }),
            this.tip.y = gc.height + 100, TweenMax.to(this.tip, .5, {y: gc.height - 118, ease: Back.easeOut})
    },
    gc.MissionPopup.prototype.setTipImg = function () {
        this.tip.texture = PIXI.Texture.fromFrame("neworder_tip_" + this.tipIndex + ".png"),
            this.tipNumTxt.setValue(this.tipIndex),
            this.tipTotalTxt.setValue(this.tipTotal)
    },
    gc.MissionPopup.prototype.endBgMotion = function () {
        this.setInteractive(true)
    },
    gc.MissionPopup.prototype.setCups = function () {
        var t, e, i, n = 0, r = gc.missionData.length;
        for (this.missionNum = r, t = 0; r > t; t++)
            i = gc.missionData[t],
                (e = this["cup" + (t + 1)]).init(i.type, i.totalPer),
                e.x = this.startX - this.space * r / 2 + n * this.space,
                1 == this.type
                    ? this.cupContainer.y = -105
                    : this.cupContainer.y = -25,
                e.setFull(),

                this.cupContainer.addChild(e),
                n++
    },
    gc.MissionPopup.prototype.popupClose = function () {
        this.setInteractive(false), TweenMax.to(this.tip, .3, {
            y: gc.height + 118, ease: Back.easeIn
        }), TweenMax.to(this.bg.scale, .3, {
            x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                this.removeAll(),
                    this.callFunc.call(this.target)
            }.bind(this)
        })
    },
    gc.MissionPopup.prototype.removeAll = function () {
        this.cupContainer.removeChildren(),
            this.removeChildren(),
            this.setInteractive(false)
    },
    gc.MissionPopup.prototype.setInteractive = function (interactive) {
        this.nextBtn.interactive = interactive,
            this.prevBtn.interactive = interactive,
            this.interactive = !!interactive
    },
    gc.MissionPopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }