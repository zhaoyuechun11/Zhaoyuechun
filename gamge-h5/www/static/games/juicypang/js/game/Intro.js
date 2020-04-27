gc.Intro = function () {
    PIXI.Container.call(this),
        this.score = 0,
        this.codeData = null,
        this.fruitList = [],
        this.popupList = [],
        this.optionPopup = new gc.OptionPopup,
        this.optionPopup.on("OPTION_POPUP_CLOSE_EVENT",
            this.hideOptionPopup.bind(this)),
        this.localContinuePopup = new gc.LocalContinuePopup,
        this.localContinuePopup.on("LOCAL_CONTINUE_EVENT",
            this.gameContinue.bind(this)),
        this.localContinuePopup.on("CLOSE_EVENT",
            this.closeLocalPopup.bind(this)),
        this.tutorial = new gc.Tutorial,
        this.tutorial.on("TUTORIAL_CLOSE_EVENT",
            this.closeTutorial.bind(this)),
        this.introSoundPopup = new gc.IntroSoundPopup,
        this.introSoundPopup.on("INTRO_SOUND_POPUP_EVENT",
            this.hideIntroSoundPopup.bind(this)),
        this.grade = new PIXI.Sprite(gc.loader.resources.common_game_grade.texture),
        this.grade.x = 20,
        this.grade.y = 20,
        this.bg1 = new PIXI.Sprite(gc.loader.resources.main_bg1.texture),
        this.bg1.x = gc.width / 2,
        this.bg1.anchor.set(.5),
        this.bg2 = new PIXI.Sprite(gc.loader.resources.main_bg2.texture),
        /*this.copyright = new PIXI.Sprite.fromFrame("copybar_w.png"),
        this.copyright.scale.set(.7),
        this.copyright.x = gc.width / 2,
        this.copyright.y = gc.height - 13,
        this.copyright.anchor.set(.5),*/
        this.rIcon = PIXI.Sprite.fromFrame("registration_r.png"),
        this.rIcon.anchor.set(.5),
        this.rIcon.x = 180,
        this.rIcon.y = -38,
        this.bg1.addChild(this.rIcon),
        gc.versionTxt = new PIXI.Text("", {
            fontFamily: "Arial", fontSize: 10, fill: "#000"
        }),
        gc.versionTxt.anchor.set(1, 0),
        gc.versionTxt.x = gc.width - 6,
        gc.versionTxt.y = gc.height - 17,
        gc.versionTxt.text = "v" + VERSION,
        gc.root.addChild(gc.versionTxt),
        this.icon = PIXI.Sprite.fromFrame("main_juicy.png"),
        this.icon.anchor.set(.5),
        this.icon.x = gc.width / 2,
        this.iconShadow = PIXI.Sprite.fromFrame("main_shadow.png"),
        this.iconShadow.anchor.set(.5),
        this.iconShadow.x = this.icon.x,
        this.iconShadow.y = 830,
        this.tipBtn = PIXI.Sprite.fromFrame("main_btn_tip.png"),
        this.tipBtn.anchor.set(.5),
        this.tipBtn.x = 100,
        this.tipBtn.y = gc.height - 110,
        this.setTouchStartAction(this.tipBtn),
        this.setTouchEnd(this.tipBtn, function () {
                this.showTutorial()
            },
            this),
        this.startBtn = PIXI.Sprite.fromFrame("main_btn_start.png"),
        this.startBtn.anchor.set(.5),
        this.startBtn.x = gc.width / 2,
        this.startBtn.y = this.tipBtn.y,
        this.setTouchStartAction(this.startBtn),
        this.setTouchEnd(this.startBtn,
            this.newGameStart,
            this),
        this.optionBtn = PIXI.Sprite.fromFrame("main_btn_sound.png"),
        this.optionBtn.anchor.set(.5),
        this.optionBtn.x = gc.width - this.tipBtn.x,
        this.optionBtn.y = this.tipBtn.y,
        this.setTouchStartAction(this.optionBtn),
        this.setTouchEnd(this.optionBtn,
            this.showOptionPopup,
            this),
        this.iconTween = new TimelineLite;

    var t, fruit;
    for (t = 0; 7 > t; t++)
        fruit = this["fruit" + (t + 1)] = new gc.IntroFruit(t),

            this.fruitList.push(fruit)
},
    gc.Intro.constructor = gc.Intro,
    gc.Intro.prototype = Object.create(PIXI.Container.prototype),
    gc.Intro.prototype.init = function () {
        this.removeAll(),
            gc.state = "intro",
            gc.isGameStart = false,
            this.bg1.y = -450, TweenMax.to(this.bg1, 1.5, {
            y: 250, ease: Bounce.easeOut
        }),
            this.addChild(this.bg2);
        var fruitListLength = this.fruitList.length;
        for (e = 0; fruitListLength > e; e++) (i = this.fruitList[e]).init(),
            this.addChild(i);

        this.addChildAt(this.icon, 3),
            this.addChild(this.bg1),
            this.addChild(this.grade),
            //this.addChild(this.copyright),
            this.addChild(this.tipBtn),
            this.addChild(this.startBtn),
            this.addChild(this.optionBtn),
            this.icon.y = -500,
            this.setInteractive(false),
            gc.isSoundSet ? (this.popupList.push(0),
                gc.bgmSoundPlay()) : "true" == LocalStorageManager.getItem(LocalStorageManager.BGM_SOUND) && gc.bgmSoundPlay();

        var e, i;
        fruitListLength = this.fruitList.length;
        for (e = 0; fruitListLength > e; e++)
            (i = this.fruitList[e]).play();

        this.showIcon(),
        "true" == LocalStorageManager.getStorage(LocalStorageManager.GAME_START) && (gc.isGameStart = true),
            LocalStorageManager.load() || gc.isGameStart
                ? this.showLocalContinuePopup()
                : this.showEventPopup()
    },
    gc.Intro.prototype.showEventPopup = function () {
        if (this.popupList.length > 0) switch (this.setInteractive(false),
            this.popupList.shift()) {
            case 0:
                this.introSoundPopup.init(),
                    this.addChild(this.introSoundPopup)
        }
        else "true" == LocalStorageManager.getStorage(LocalStorageManager.GAME_START) && (gc.isGameStart = true),
            LocalStorageManager.load() || gc.isGameStart
                ? this.showLocalContinuePopup()
                : this.setInteractive(true)
    },
    gc.Intro.prototype.showOptionPopup = function () {
        this.setInteractive(false),
            this.optionPopup.introInit(),
            this.addChild(this.optionPopup)
    },
    gc.Intro.prototype.hideOptionPopup = function () {
        this.removeChild(this.optionPopup),
            this.setInteractive(true)
    },
    gc.Intro.prototype.showIcon = function () {
        this.iconTween.clear(),
            gc.item4
                ? this.icon.texture = PIXI.Texture.fromFrame("main_keg.png")
                : this.icon.texture = PIXI.Texture.fromFrame("main_juicy.png"),

            this.icon.scale.set(.8, 1.2),
            this.iconTween = new TimelineLite,
            this.iconTween.to(this.icon, .4, {
                y: 630, ease: Sine.easeIn
            }),

            this.iconTween.to(this.icon.scale, .1, {x: 1.1, y: .9}),
            this.iconTween.to(this.icon.scale, .8, {
                x: 1, y: 1, ease: Elastic.easeOut, onComplete: this.iconMotion.bind(this)
            }),

        gc.item4 && (this.iconShadow.scale.set(0),
            this.addChildAt(this.iconShadow, 3), TweenMax.to(this.iconShadow.scale, .9, {
            x: 1.2, y: 1.2, delay: .2, ease: Elastic.easeOut
        }))
    },
    gc.Intro.prototype.iconMotion = function () {
        this.iconTween = new TimelineLite,
            this.iconTween.to(this.icon.scale, .3, {
                x: 1.1, y: .9, delay: 2
            }),
            this.iconTween.to(this.icon.scale, .3, {x: .9, y: 1.1}),
            this.iconTween.to(this.icon.scale, .3, {
                x: 1, y: 1, onComplete: this.iconMotion.bind(this)
            })
    },
    gc.Intro.prototype.hideIcon = function () {
        this.iconTween.clear(),
            this.icon.y = -500
    },
    gc.Intro.prototype.showLocalContinuePopup = function () {
        this.setInteractive(false),
            this.localContinuePopup.init(),
            this.addChild(this.localContinuePopup)
    },
    gc.Intro.prototype.hideLocalContinuePopup = function () {
        this.removeChild(this.localContinuePopup)
    },
    gc.Intro.prototype.gameContinue = function () {
        this.hideLocalContinuePopup(),
            this.emit("GAME_START_EVENT")
    },
    gc.Intro.prototype.closeLocalPopup = function () {
        this.hideLocalContinuePopup(),
            this.setInteractive(true)
    },
    gc.Intro.prototype.newGameStart = function () {
        DataManager.gameStart(),
            this.setInteractive(false),
            LocalStorageManager.clearStorage(),
            LocalStorageManager.setStorage(LocalStorageManager.GAME_START, true),
            gc.isGameStart = true,
            LocalStorageManager.setStorage(LocalStorageManager.JUICY_ITEM,
                gc.juicyItem),
            this.emit("GAME_START_EVENT")
    },
    gc.Intro.prototype.hideIntroSoundPopup = function () {
        this.setInteractive(true),
            this.removeChild(this.introSoundPopup),
            this.showEventPopup()
    },
    gc.Intro.prototype.showTutorial = function () {
        this.setInteractive(false),
            this.hideIcon(),
            this.tutorial.init(),
            this.addChild(this.tutorial)
    },
    gc.Intro.prototype.closeTutorial = function () {
        this.removeChild(this.tutorial),
            this.showIcon(),
            this.setInteractive(true)
    },
    gc.Intro.prototype.removeAll = function () {
        var t;
        for (t = 0; 6 > t; t++) this.fruitList[t].stop();
        this.iconTween.kill(),
            TweenMax.killTweensOf(this.iconShadow),
            this.removeChildren()
    },
    gc.Intro.prototype.setInteractive = function (interactive) {
        this.tipBtn.interactive = interactive,
            this.startBtn.interactive = interactive,
            this.optionBtn.interactive = interactive
    },
    gc.Intro.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }