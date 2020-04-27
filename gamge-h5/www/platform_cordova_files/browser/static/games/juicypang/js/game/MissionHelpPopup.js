gc.MissionHelpPopup = function () {
    PIXI.Container.call(this),
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, 
    gc.width, 
    gc.height),
        this.darkBg.endFill(),
        this.bg = new PIXI.Sprite(gc.loader.resources.game_tutorial_bg.texture),
        this.bg.anchor.set(.5),
        this.bg.x = gc.width / 2,
        this.bg.y = gc.height / 2,
        this.titleTxt = new PIXI.Sprite.fromFrame("title1_1.png"),
        this.titleTxt.anchor.set(.5),
        this.bg.addChild(this.titleTxt),
        this.txt = new PIXI.Sprite.fromFrame("game_tutorial2_1.png"),
        this.txt.anchor.set(.5),
        this.bg.addChild(this.txt),
        this.kegImg = new PIXI.Sprite.fromFrame("game_tutorial_keg.png"),
        this.kegImg.anchor.set(.5),
        this.bg.addChild(this.kegImg),
        this.cup = new gc.Cup,
        this.cup.y = -162,
        this.bg.addChild(this.cup),
        this.okBtn = new PIXI.Sprite.fromFrame("popup_btn_check.png"),
        this.okBtn.anchor.set(.5),
        this.setTouchStartAction(this.okBtn),
        this.setTouchEnd(this.okBtn, function () {
                gc.isMissionHelp = false,
                    this.setInteractive(false), TweenMax.to(this.bg.scale, .2, {
                    x: 0, y: 0, ease: Back.easeIn, onComplete: function () {
                        this.emit("CLOSE_MISSION_HELP_EVENT")
                    }.bind(this)
                })
            },
            this),
        this.bg.addChild(this.okBtn)
},
    gc.MissionHelpPopup.prototype.constructor = gc.MissionHelpPopup, 
    gc.MissionHelpPopup.prototype = Object.create(PIXI.Container.prototype), 
    gc.MissionHelpPopup.prototype.init = function () {
    this.removeAll()
},
    gc.MissionHelpPopup.prototype.show = function (cup) {
        var type;
        this.addChild(this.darkBg);
        this.addChild(this.bg);
        type = cup.type < 10
            ? cup.type + 1
            : 61 == cup.type
                ? 8
                : cup.type > 10 && cup.type < 20
                    ? cup.type % 10 + 14
                    : cup.type > 20 && cup.type < 30
                        ? cup.type % 10 + 8
                        : cup.type > 30 && cup.type < 40
                            ? cup.type % 10 + 26
                            : cup.type > 40 && cup.type < 50
                                ? cup.type % 10 + 20
                                : cup.type > 50 && cup.type < 60
                                    ? cup.type % 10 + 32
                                    : 71 == cup.type
                                        ? 36 : 1;

            this.titleTxt.texture = PIXI.Texture.fromFrame("title1_" + type + ".png"),
            100 == cup.type && 0 == gc.item4
                ? (this.bg.texture = gc.loader.resources.game_tutorial_bg2.texture,
                    this.kegImg.texture = PIXI.Texture.fromFrame("game_tutorial_keg.png"),
                    this.kegImg.alpha = 1,
                    this.txt.texture = PIXI.Texture.fromFrame("game_tutorial2_36.png"),
                    this.txt.y = 150,
                    this.titleTxt.y = -340,
                    this.kegImg.y = -110,
                    this.okBtn.y = 320,
                    this.cup.alpha = 0)
                : (
                    71 == cup.type
                        ? this.txt.texture = PIXI.Texture.fromFrame("game_tutorial2_37.png")
                        : this.txt.texture = PIXI.Texture.fromFrame("game_tutorial2_" + type + ".png"
                        ),

                        this.bg.texture = gc.loader.resources.game_tutorial_bg.texture,
                        this.titleTxt.y = -300,
                        this.txt.y = 155,
                        this.kegImg.y = -72,
                        this.okBtn.y = 290,

                        100 == cup.type
                            ? (this.kegImg.texture = PIXI.Texture.fromFrame("game_tutorial_keg2.png"),
                                this.kegImg.y = -72,
                                this.kegImg.alpha = 1,
                                this.cup.alpha = 0)
                            :
                            (this.kegImg.alpha = 0,
                                this.cup.alpha = 1,
                                this.cup.init(cup.type,
                                    cup.totalPer),
                                cup.totalPer == cup.per
                                    ? (this.cup.setFull(), this.cup.setMissionTxt(0))
                                    : this.cup.setMission(cup.per))),

            this.bg.scale.set(.1),

            TweenMax.to(this.bg.scale, .2, {
            x: 1, y: 1, ease: Back.easeOut, onComplete: this.endBgMotion.bind(this)
        })
    },
    gc.MissionHelpPopup.prototype.endBgMotion = function () {
        this.setInteractive(true)
    },
    gc.MissionHelpPopup.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.MissionHelpPopup.prototype.setInteractive = function (interactive) {
        this.okBtn.interactive = interactive
    },
    gc.MissionHelpPopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }