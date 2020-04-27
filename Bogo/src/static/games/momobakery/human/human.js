//方法集
var funArr = [

    //加载顺序
    function (fun, exports, InitFun) {

        InitFun(1),

            InitFun(5),
            InitFun(10),
            InitFun(6),
            InitFun(7),
            InitFun(9),
            InitFun(8),
            InitFun(11),
            InitFun(12),
            InitFun(13),
            InitFun(14),
            InitFun(15),
            InitFun(2),
            InitFun(3),
            InitFun(4)
    },

    //1 占位
    function (fun, exports) {
    },

    //2
    function (fun, exports) {


        PIXI.Container.prototype.setTouchStartAction = function (Btn, back, i) {
            Btn.mousedown = Btn.touchstart = function (e) {
                e.stopPropagation(),
                    GD.fullScreen(),
                    GD.buttonAction(Btn),
                back && back.call(i, e)
            }.bind(i)
        },

            PIXI.Container.prototype.setTouchStart = function (Btn, back, i) {
                Btn.mousedown = Btn.touchstart = function (e) {
                    e.stopPropagation(),
                        GD.fullScreen(),
                    back && back.call(i, e)
                }.bind(i)
            },
            PIXI.Container.prototype.setTouchEnd = function (Btn, back, i) {
                Btn.tap = function (e) {
                    e.stopPropagation(),
                        GD.fullScreen(),
                    back && back.call(i, e)
                }.bind(i),

                GD.isMobile || (Btn.click = function (e) {
                    e.stopPropagation(),
                    back && back.call(i, e)
                }.bind(i))
            },
            PIXI.Container.prototype.setTouchMove = function (Btn, back, i) {
                Btn.mousemove = Btn.touchmove = function (e) {
                    e.stopPropagation(),
                    back && back.call(i, e)
                }.bind(i)
            },
            PIXI.Container.prototype.addGamePadEvent = function () {
                this.removeGamePadEvent(),
                    $(GamePadManager).on("padButton", this.onGamePadEvent.bind(this)),
                    $(GamePadManager).on("padStickX", this.onGamePadStickXEvent.bind(this)),
                    $(GamePadManager).on("padStickY", this.onGamePadStickYEvent.bind(this))
            },
            PIXI.Container.prototype.removeGamePadEvent = function () {
                $(GamePadManager).off()
            },
            PIXI.Container.prototype.onGamePadEvent = function (t, button) {
            },
            PIXI.Container.prototype.onGamePadStickXEvent = function (t, e) {
            },
            PIXI.Container.prototype.onGamePadStickYEvent = function (t, e) {
            },
            PIXI.Container.prototype.showLoading = function () {
                GD.loading = GD.LoadingView.getInstance(),
                    GD.loading.init(), this.addChild(GD.loading)
            },
            PIXI.Container.prototype.hideLoading = function () {
                this.removeChild(GD.loading)
            }
    },
    //3
    function (fun, exports) {

        //信息
        GD.CommonIntro = function (copyText, bgText) {
            PIXI.Container.call(this),
                this.helpBtn = null,
                this.soundpBtn = null,
                this.startBtn = null,
                this.callBackFunc = null,
                this.callBackTarget = null,
                this.bg = this.setSpriteTexture(this.bg, "texture", bgText),
                this.addChild(this.bg),
                this.copyText = this.setSpriteTexture(this.copyText, "texture", "copybar_" + copyText),
                this.copyText.anchor.set(.5),
                this.copyText.x = GD.width / 2,
                this.copyText.y = GD.height - 20,
                this.addChild(this.copyText),
                this.gamePadGuide = null,
                this.soundPopup = new GD.OptionPopup,
                this.soundPopup.on("SOUND_POPUP_CLOSE_EVENT", this.closeSoundPopup.bind(this)),
                gamen.loadend()
        },
            GD.CommonIntro.constructor = GD.CommonIntro,
            GD.CommonIntro.prototype = Object.create(PIXI.Container.prototype),
            GD.CommonIntro.prototype.init = function () {
                GamePadManager.isConnected
                && GD.isShowPadGuide
                && (this.gamePadGuide || (this.gamePadGuide = new GD.GamePadGuide), this.showGamePadGuide(), this.addGamePadEvent())
                    , GD.isShowPadGuide = !1,
                    this.setInteractive(!0)
            },
            GD.CommonIntro.prototype.showGamePadGuide = function () {
                this.gamePadGuide.init(), this.addChild(this.gamePadGuide)
            },
            GD.CommonIntro.prototype.hideGamePadGuide = function () {
                this.removeChild(this.gamePadGuide)
            },
            GD.CommonIntro.prototype.initHelp = function (btn, x, y) {
                this.helpBtn = this.setSpriteTexture(this.helpBtn, "texture", btn),
                    this.helpBtn.anchor.set(.5),
                    this.helpBtn.x = x,
                    this.helpBtn.y = y,
                    this.helpBtn.scale.set(1),
                    this.addChild(this.helpBtn),
                    this.setTouchStartAction(this.helpBtn),
                    this.setTouchEnd(this.helpBtn, this.showHelp, this)
            },
            GD.CommonIntro.prototype.initSound = function (btn, x, y) {
                this.soundpBtn = this.setSpriteTexture(this.soundpBtn, "texture", btn),
                    this.soundpBtn.anchor.set(.5),
                    this.soundpBtn.x = x,
                    this.soundpBtn.y = y,
                    this.soundpBtn.scale.set(1),
                    this.addChild(this.soundpBtn), this.setTouchStartAction(this.soundpBtn),
                    this.setTouchEnd(this.soundpBtn, this.showSoundPopup, this)
            },
            GD.CommonIntro.prototype.initStart = function (btn, x, y, callBackFunc, callBackTarget) {
                this.startBtn = this.setSpriteTexture(this.startBtn, "texture", btn),
                    this.startBtn.anchor.set(.5),
                    this.startBtn.x = x,
                    this.startBtn.y = y,
                    this.callBackFunc = callBackFunc,
                    this.callBackTarget = callBackTarget,
                    this.startBtn.scale.set(1),
                    this.addChild(this.startBtn),
                    this.setTouchStartAction(this.startBtn),
                    this.setTouchEnd(this.startBtn, this.sendStartData, this)
            },
            GD.CommonIntro.prototype.onGamePadEvent = function (t, button) {
                switch (button) {
                    case"button-1":
                        this.hideGamePadGuide(), this.sendStartData();
                        break;
                    case"button-2":
                        this.hideGamePadGuide(), this.showHelp();
                        break;
                    case"button-3":
                        this.hideGamePadGuide(), this.showSoundPopup();
                        break;
                    case"button-4":
                        this.hideGamePadGuide()
                }
            },
            GD.CommonIntro.prototype.showHelp = function () {
                this.setInteractive(!1),
                    GD.tutorial.initPage(0, "help_start"),
                    GD.tutorial.once("TUTORIAL_CLOSE_EVENT", this.hideHelp.bind(this)),
                    this.addChild(GD.tutorial)
            },
            GD.CommonIntro.prototype.hideHelp = function () {
                this.sendStartData()
            },
            GD.CommonIntro.prototype.showSoundPopup = function () {
                this.setInteractive(!1),
                    this.soundPopup.show(0),
                    this.addChild(this.soundPopup)
            },
            GD.CommonIntro.prototype.closeSoundPopup = function () {
                this.removeChild(this.soundPopup),
                    this.setInteractive(!0)
            },
            GD.CommonIntro.prototype.sendStartData = function () {
                this.showLoading(),
                    DataManager.start(this.startDataComplete, this)
            },
            GD.CommonIntro.prototype.startDataComplete = function () {
                this.hideLoading(),
                GD.tutorial && this.removeChild(GD.tutorial),
                    this.callBackFunc.call(this.callBackTarget)
            },
            GD.CommonIntro.prototype.setInteractive = function (interactive) {
                this.helpBtn.interactive = interactive,
                    this.soundpBtn.interactive = interactive,
                    this.startBtn.interactive = interactive,
                GamePadManager.isConnected && (interactive ? this.addGamePadEvent() : this.removeGamePadEvent())
            },
            GD.CommonIntro.getInstance = function (copyText, bgText) {
                return GD.commonIntro || (GD.commonIntro = new GD.CommonIntro(copyText, bgText)), GD.commonIntro
            }
    },
    //4
    function (fun, exports) {

        //常用的选项
        GD.CommonOption = function (t) {
            PIXI.Container.call(this),
                this.scorePopup = new GD.ScorePopup,
                this.scorePopup.on("SCORE_POPUP_CLOSE_EVENT", this.closeScorePopup.bind(this)),
                this.optionPopup = new GD.OptionPopup,
                this.optionPopup.on("SOUND_POPUP_CLOSE_EVENT", this.closeOptionPopup.bind(this)),
                this.optionPopup.on("TUTORIAL_OPEN_EVENT", this.showTutorial.bind(this)),
                this.optBtn = this.setSpriteTexture(this.optBtn, "texture", "btn_option_" + t),
                this.optBtn.anchor.set(.5),
                this.optBtn.x = GD.width - 40,
                this.optBtn.y = 40,
                this.setTouchStartAction(this.optBtn),
                this.setTouchEnd(this.optBtn, function () {
                    this.setInteractive(!1), this.optionPopup.show(1), this.addChild(this.optionPopup), this.emit("OPTION_OPEN_EVENT")
                }.bind(this)),
                this.achievement = new GD.Achievement
        },
            GD.CommonOption.constructor = GD.CommonOption,
            GD.CommonOption.prototype = Object.create(PIXI.Container.prototype),
            GD.CommonOption.prototype.init = function () {
                this.removeAll(),
                    this.addChild(this.optBtn),
                    this.addChild(this.achievement),
                    this.setInteractive(!0)
            },
            GD.CommonOption.prototype.setAchievement = function (t) {
                this.achievement.show(t)
            },
            GD.CommonOption.prototype.setInteractive = function (interactive) {
                this.optBtn.interactive = interactive
            },
            GD.CommonOption.prototype.closeOptionPopup = function () {
                this.removeChild(this.optionPopup), this.setInteractive(!0), this.emit("OPTION_CLOSE_EVENT")
            },
            GD.CommonOption.prototype.showTutorial = function () {
                GD.tutorial.initPage(0, "help_close"), GD.tutorial.on("TUTORIAL_CLOSE_EVENT", this.hideHelp.bind(this)), this.addChild(GD.tutorial)
            },
            GD.CommonOption.prototype.hideHelp = function () {
                this.removeChild(GD.tutorial), this.optionPopup.setInteractive(!0)
            },
            GD.CommonOption.prototype.closeScorePopup = function () {
                this.gameRestart()
            },
            GD.CommonOption.prototype.finish = function (t) {
                gamen.score_view_status ? (this.scorePopup.show(t), this.addChild(this.scorePopup)) : (GD.exitFullScreen(), DataManager.finish(t))
            },
            GD.CommonOption.prototype.gameRestart = function () {
                this.emit("GAME_RESTART")
            },
            GD.CommonOption.prototype.removeAll = function () {
                this.removeChildren()
            },
            GD.CommonOption.getInstance = function (t) {
                return GD.commonOption || (GD.commonOption = new GD.CommonOption(t)), GD.commonOption
            }
    },
    //5
    function (fun, exports) {


        //逻辑核心
        GD = {
            loader: null,
            stats: null,
            width: 504,
            height: 861,
            leng: "ko",
            isMobile: !1,
            isDebug: !1,
            isShowLog: !1,
            isLogin: !1,
            unique: null,
            pk: null,
            sKey: null,
            oKey: null,
            startTime: null,
            medal: [],
            soundType: 2,
            isAllSound: !0,
            isBgmSound: !0,
            isEffectSound: !0,
            isShowPadGuide: !0,
            orientationType: null,
            orientationGuide: null,
            sound: {},
            darkBg: null,
            stage: null,
            commonIntro: null,
            commonOption: null,
            tutorial: null,
            loading: null
        },
            GD.init = function (width, height, i, n, backgroundColor) {

                if (
                    GD.width = width,
                        GD.height = height,
                        GD.leng = gamen.game_language,
                        this.renderer = PIXI.autoDetectRenderer(width, height, {
                            backgroundColor: backgroundColor,
                            resolution: 2,
                            clearBeforeRender: !1
                        }),

                        $("#gamecontainer")[0]
                            ? ($("#gameCanvas") && $("#gameCanvas").remove(), $("#gamecontainer").append(this.renderer.view))
                            : document.body.appendChild(this.renderer.view),

                    GD.Util.mobileCheck() && (GD.isMobile = !0),

                        GD.Util.mobileCheck()) {
                    var s = navigator.userAgent.toLowerCase();
                    -1 != s.indexOf("android 4.")
                        ? -1 == s.indexOf("chrome") && -1 == s.indexOf("mobile safari") || (GD.soundType = 1)
                        : GD.soundType = 1

                } else GD.soundType = 1;

                requestAnimationFrame(this.update),
                    this.root = new PIXI.Container,
                    this.stage = new PIXI.Container,
                    this.root.addChild(this.stage),
                GD.isDebug && (
                    GD.stats = new Stats,
                        document.body.appendChild(GD.stats.domElement),
                        GD.stats.domElement.style.position = "absolute",
                        GD.stats.domElement.style.top = "0px"),
                    this.resize(),
                    this.setSpriteTexture(),
                    this.resourceLoad()
            },
            GD.resourceLoad = function () {
                var t = COMMON_IMG_PATH + "image/json/";
                GD.loader = PIXI.loader, GD.loader.add(t + "human_common.json"),
                    GD.loader.add(t + "human_popup_" + this.leng + ".json")
            },
            GD.showProgress = function () {
                GD.progress = new GD.Progress,
                    GD.progress.show(),
                    this.root.addChild(GD.progress)
            },
            GD.hideProgress = function () {
                GD.progress.hide(),
                    this.root.removeChild(GD.progress)
            },
            GD.resize = function () {
                if (GD.renderer) {
                    var s = GD.width / GD.height,
                        Width = window.innerWidth,
                        Height = window.innerHeight,
                        scale = Width / Height;

                    if ($("#gamecontainer")[0]) {

                        var gamecontainer = document.getElementById("gamecontainer");
                        gamecontainer.style.color = "#FF0000",
                            scale > s
                                ? (
                                    Width = Height * s,
                                        gamecontainer.style.width = Width + "px",
                                        gamecontainer.style.height = Height + "px",
                                        GD.renderer.view.style.width = Width + "px",
                                        GD.renderer.view.style.height = Height + "px"
                                )
                                : (
                                    Height = Width / s,
                                        gamecontainer.style.width = Width + "px",
                                        gamecontainer.style.height = Height + "px",
                                        GD.renderer.view.style.width = Width + "px",
                                        GD.renderer.view.style.height = Height + "px"
                                )
                    } else scale > s
                        ? Width = Height * s
                        : Height = Width / s,
                        this.renderer.view.style.width = Width + "px",
                        this.renderer.view.style.height = Height + "px",
                        this.renderer.view.style.margin = "auto",
                        this.renderer.view.style.position = "absolute",
                        this.renderer.view.style.top = 0,
                        this.renderer.view.style.bottom = 0,
                        this.renderer.view.style.right = 0,
                        this.renderer.view.style.left = 0,
                        this.renderer.view.style.backgroundColor = "#01c2fa"
                }
                gamen.score_view_status || this.setOrientationGuide()
            },
            GD.render = function () {
                GD.renderer.render(GD.root)
            },
            GD.update = function () {
                GD.isDebug && GD.stats.begin(),
                    requestAnimationFrame(GD.update),
                    GD.render(),
                GD.isDebug && GD.stats.end()
            },

            GD.buttonAction = function (Btn, scale, xy) {
                scale || (scale = 1.2),
                xy || (xy = 1),
                    Btn.scale.set(scale),
                    TweenMax.to(Btn.scale, .2, {x: xy, y: xy})
            },
            GD.setSpriteTexture = function () {

                PIXI.Container.prototype.setSpriteTexture = function (Sprite, sprite, i) {
                    return "sprite" == sprite
                        ? Sprite
                            ? Sprite.texture = GD.loader.resources[i].texture
                            : Sprite = new PIXI.Sprite(GD.loader.resources[i].texture)
                        : Sprite
                            ? Sprite.texture = PIXI.Texture.fromFrame(i + ".png")
                            : Sprite = new PIXI.Sprite.fromFrame(i + ".png"), Sprite
                }
            },
            GD.getDarkBg = function () {
                return GD.darkBg
                || (GD.darkBg = new PIXI.Graphics, GD.darkBg.beginFill(0, .8), GD.darkBg.drawRect(0, 0, GD.width, GD.height), GD.darkBg.endFill()),
                    GD.darkBg
            },
            GD.log = function (log) {
                GD.isShowLog
                    ? (
                        GD.logStr = log + "\n" + GD.logStr,
                        GD.logText || (GD.logText = new PIXI.Text("", {
                            font: "14px Arial", fill: "#F7EDCA", stroke: "#000", strokeThickness: 4,
                            wordWrapWidth: GD.width - 60,
                            wordWrap: !0
                        }), GD.logText.x = 30, GD.logText.y = 30),
                        GD.logText.parent || GD.root.addChild(GD.logText), GD.logText.text = GD.logStr)
                    : console.log(log)
            },

            GD.fullScreen = function () {
                // if (GD.isMobile) {
                //     var t = navigator.platform.match(/iPhone|iPod|iPad/);
                //     if (!t) {
                //         var e = GD.renderer.view;
                //         e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullScreen ? e.webkitRequestFullScreen() : e.mozRequestFullScreen()
                //     }
                // }
            },
            GD.exitFullScreen = function () {
                // if (GD.isMobile) {
                //     var t = navigator.platform.match(/iPhone|iPod|iPad/);
                //     if (!t) {
                //         var e = GD.renderer.view;
                //         e.exitFullscreen ? e.exitFullscreen() : e.mozCancelFullScreen ? e.mozCancelFullScreen() : e.webkitExitFullscreen && e.webkitExitFullscreen()
                //     }
                // }
            },
            GD.setOrientationGuide = function () {

                var t = document.getElementById("rank_layout");
                if (t && "none" != t.style.display && com) return GD.renderer.view.style.display = "none",
                    void GD.showOrientation(!1);

                var e = window.innerWidth / window.innerHeight,
                    i = GD.width / GD.height;

                i > 1
                    ? GD.orientationType = "phone rotate_x"
                    : GD.orientationType = "phone rotate_y",
                    e > 1 && 1 > i || 1 > e && i > 1
                        ? GD.showOrientation(!0)
                        : GD.showOrientation(!1)
            },
            GD.showOrientation = function (t) {

                for (var e = ["Z300C", "TF701T", "TF700T", "TF103C", "TF101-1B251A", "TA2506 10BK", "SM-T805", "SM-T800", "SM-T677", "SM-T670", "SM-P900", "SMP-605", "SMP-600", "SMART-TV", "SmartTV", "SM-905", "SHW-M480W", "SHW-M380",
                    "SHV-E230", "SGP771", "SGP311", "QM0101", "Q109", "MZ68", "MZ601", "MX1080", "MID 1065-8", "MID 1042-8", "ME102A", "LGV940", "LGV700N", "GT-P5110", "FZ-A1",
                    "AT105", "A10-70", "10QS", "10ES"], i = e.length; i--;)
                    if (navigator.userAgent.match(e[i])) return;


                var orientationGuide, div, div2, span, span2, p;
                if (GD.isMobile) {
                    var l = document.getElementsByClassName("xy_wrap").length;
                    if (t) {
                        if (orientationGuide = GD.orientationGuide, null == orientationGuide) {
                            if (
                                orientationGuide = document.createElement("div"),
                                    orientationGuide.style.backgroundColor = "#ff7e17",
                                    orientationGuide.style.position = "absolute",
                                    orientationGuide.style.left = 0,
                                    orientationGuide.style.top = 0,
                                    orientationGuide.style.right = 0,
                                    orientationGuide.style.bottom = 0,
                                    orientationGuide.style.margin = "auto",
                                    orientationGuide.setAttribute("class", "xy_wrap"),
                                    GD.orientationGuide = orientationGuide,

                                    div = document.createElement("div"),
                                    div.setAttribute("class", "xy_info"),

                                    div2 = document.createElement("div"),
                                    div2.setAttribute("class", GD.orientationType),

                                    span = document.createElement("span"),
                                    span.setAttribute("class", "yes"),

                                    span2 = document.createElement("span"),
                                    span2.setAttribute("class", "no"),

                                    orientationGuide.appendChild(div),
                                    div.appendChild(div2),
                                    div.appendChild(span),
                                    div.appendChild(span2),

                                    p = document.createElement("p"),
                                    p.style.left = "0px",
                                    p.style.right = "0px",
                                    p.style.padding = "15px",
                                    p.style.lineHeight = "130%",
                                    p.style.color = "#FFFFFF",
                                    p.style.position = "absolute",

                                "en" == GD.lang

                            ) p.style.fontSize = "18px",
                                p.innerHTML = "Please rotate your device.";

                            else {
                                var txt;
                                switch (GD.lang) {

                                    case"jp":
                                        txt = "お使いの 携?電話を 回?させて 下ください。";
                                        break;
                                    case"en":
                                        txt = "ROTATE YOUR PHONE";
                                        break;
                                    case"cn":
                                        txt = "如果?幕不能旋?，?打?自?旋?功能。";
                                        break;

                                    default:
                                        txt = window.innerWidth > 480 ? "If the screen does not switch, turn on the auto rotate function." : "If the screen does not switch,turn on the auto rotate function."
                                }

                                p.innerHTML = txt
                            }
                            div.appendChild(p)
                        }

                        0 == l && (document.body.appendChild(orientationGuide), GD.orientationChange(!0), GD.renderer.view.style.visibility = "hidden")

                    } else l > 0 && (document.body.removeChild(GD.orientationGuide), GD.orientationChange(!1), GD.renderer.view.style.visibility = "visible")
                }
            },
            GD.orientationChange = function (t) {
                t ? GD.soundMute() : GD.isAllSound && GD.soundUnMute()
            },


            GD.loadSound = function (loader, resource) {
                for (var i, n = loader.length, o = 0, s = n; s--;) {
                    i = loader[s], GD.sound[i] = new Howl({
                        src: [RES_DIR_SOUND + i + ".mp3?ver=" + SOUND_VERSION, RES_DIR_SOUND + i + ".ogg?ver=" + SOUND_VERSION, RES_DIR_SOUND + i + ".wav?ver=" + SOUND_VERSION],
                        onload: function () {
                            o++, o == n && resource()
                        }
                    })
                }

            },
            GD.bgmPlay = function (volume) {
                var e = GD.sound.sound_bgm;
                e._loop = !0,
                    volume ? e._volume = volume : e._volume = .3,
                GD.isBgmSound && e.play()
            },
            GD.bgmStop = function () {
                GD.sound.sound_bgm.stop()
            },
            GD.soundPlay = function (i, volume, loop) {
                var sound = GD.sound[i];
                volume || (volume = 1)
                    , volume ? sound._volume = volume : sound._volume = 1
                    , loop ? sound._loop = loop : sound._loop = !1
                    , GD.isEffectSound && sound.play()
            },
            GD.soundStop = function (t) {
                GD.isEffectSound && GD.sound[t].stop()
            },
            GD.soundAllStop = function () {
                for (var t in GD.sound) GD.sound[t].stop()
            },
            GD.soundMute = function () {
                Howler.mute(!0)
            },
            GD.soundUnMute = function () {
                GD.isAllSound && Howler.mute(!1)
            },
            window.onresize = function (t) {
                GD.resize()
            }
    },
    //6
    function (fun, exports) {

        DataManager = {},
            DataManager.unique = null,
            DataManager.pk = null,
            DataManager.Skey = null,
            DataManager.Okey = null,
            DataManager.callFunc = null,
            DataManager.target = null,
            DataManager.playInterval = null,
            DataManager.start = function (callFunc, target) {
                DataManager.callFunc = callFunc,
                    DataManager.target = target,
                    gamen.start(DataManager.startDataComplete)
            },
            DataManager.startDataComplete = function (isLogin, byte, pk, sKey, oKey) {
                if (
                    GD.isLogin = isLogin,
                    GD.isLogin && (
                        GD.sKey = gamen.spkey(sKey),
                            GD.oKey = gamen.opkey(oKey),
                            GD.unique = XORcipher().xorDecoder(byte, GD.sKey),
                            GD.pk = pk,
                            GD.startTime = Date.now(),
                            GD.medal = [],
                        null != gamen.achievement)) {
                    for (var s = gamen.achievement.length, r = 0; s > r; ++r) {
                        var a = XORcipher().xorDecoder(gamen.achievement[r], GD.sKey),
                            h = [];
                        h = a.split("_gamen_"),
                            GD.medal[r] = [parseInt(h[0]), !1, parseInt(h[1]), h[2], h[3], parseInt(h[5]), h[4]]
                    }
                }


                DataManager.callFunc.call(DataManager.target),
                    DataManager.playInterval = setInterval(DataManager.promisePlay, .1)
            },
            DataManager.point = function (point, addPoint) {
                if (GD.log(point + " : " + addPoint), DataManager.otherPoint(point, addPoint), GD.isLogin) {
                    point = XORcipher().xorEncoder(point, GD.sKey),
                        addPoint = XORcipher().xorEncoder(addPoint.toString(), GD.sKey);

                    var i = Date.now() - GD.startTime,
                        n = XORcipher().xorEncoder(i.toString(), GD.sKey);

                    gamen.point(point, addPoint, n)
                }
            },
            DataManager.otherPoint = function (point, addPoint) {
                if (GD.isLogin) {

                    var point = XORcipher().xorEncoder(point, GD.oKey),
                        addPoint = XORcipher().xorEncoder(addPoint.toString(), GD.oKey);
                    var time = Date.now() - GD.startTime,
                        timeX = XORcipher().xorEncoder(time.toString(), GD.oKey);

                    gamen.otherpoint(point, addPoint, timeX)
                }
            },
            DataManager.promisePlay = function () {
                var t = Date.now() - GD.startTime,
                    e = XORcipher().xorEncoder(t.toString(), GD.oKey);
                gamen.promiseplay(e)
            },
            DataManager.finish = function (t) {
                if (DataManager.playInterval && clearInterval(DataManager.playInterval), GD.isLogin) {
                    if (GD.medal.length > 0) {
                        var e = [],
                            i = GD.medal.length;
                        gamen.new_achievement = [];
                        for (var n = 0; i > n; ++n)
                            e[n] = GD.medal[n][0] + "_gamen_" + GD.medal[n][2] + "_gamen_" + GD.medal[n][3] + "_gamen_" + GD.medal[n][4] + "_gamen_" + parseInt(GD.medal[n][5]), gamen.new_achievement[n] = XORcipher().xorEncoder(e[n], GD.sKey)
                    }
                    GD.log("finish : " + t);
                    var o = XORcipher().xorEncoder(t.toString(), GD.sKey),
                        s = GD.commonOption.gameRestart.bind(GD.commonOption),
                        r = XORcipher().xorEncoder(GD.unique, GD.sKey),
                        a = XORcipher().xorEncoder(GD.startTime.toString(), GD.sKey), h = Date.now(),
                        l = XORcipher().xorEncoder(h.toString(), this.sKey);
                    gamen.finish(GD.pk, o, s, r, a, l)
                }
                else gamen.finish(t, GD.commonOption.gameRestart.bind(GD.commonOption))
            },
            DataManager.addMedal = function (t, e) {
                if (GD.isLogin && GD.medal.length > 0) for (var i = null, n = 0; n < GD.medal.length; ++n) if (t == GD.medal[n][0]) {
                    i = n, 0 == GD.medal[i][1] && (null == e && (e = 1), GD.medal[i][5] += e, GD.medal[i][2] <= GD.medal[i][5] && (GD.medal[i][1] = !0, GD.commonOption.setAchievement(i + 1)));
                    break
                }
            }
    },
    //7
    function (fun, exports) {


        GamePadManager = {
            isConnected: !1,
            init: function () {
                gamepadSupport.init()
            },
            showNotSupported: function () {
            },
            updateGamePads: function (gamepads) {
                if (this.isConnected = !1, gamepads)
                    for (var e in gamepads) {
                        var i = gamepads[e];
                        i && (this.isConnected = !0)
                    }
            },
            updateButton: function (buttons, gamepadId, i) {
                buttons.pressed && $(this).trigger("padButton", i)
            },
            updateAxis: function (axe, gamepadId, axis, stick, t) {
                "stick-1" == stick
                && ("stick-1-axis-x" == axis
                    ? $(this).trigger("padStickX", axe)
                    : "stick-1-axis-y" == axis
                    && $(this).trigger("padStickY", axe))
            }
        }
    },
    //8
    function (fun, exports) {


        //Option
        GD.OptionPopup = function () {
            PIXI.Container.call(this),
                this.darkBg = GD.getDarkBg(),
                this.bg = null,
                this.type = null,
                this.allBtn = this.setSpriteTexture(this.allBtn, "texture", "option_on_0"),
                this.allBtn.anchor.set(.5),
                this.allBtn.x = 110,
                this.setTouchEnd(this.allBtn, function () {
                    GD.isAllSound = !GD.isAllSound, this.setAllSoundBtn(), this.setBgmBtn(!1), this.setEffectBtn()
                }, this),
                this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_on_0"),
                this.bgmBtn.anchor.set(.5),
                this.bgmBtn.x = this.allBtn.x,
                this.setTouchEnd(this.bgmBtn, function () {
                    GD.isAllSound && (GD.isBgmSound = !GD.isBgmSound, this.setBgmBtn(!0))
                }, this),
                this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_on_0"),
                this.effectBtn.anchor.set(.5),
                this.effectBtn.x = this.allBtn.x,
                this.setTouchEnd(this.effectBtn, function () {
                    GD.isAllSound && (GD.isEffectSound = !GD.isEffectSound, this.setEffectBtn())
                }, this),
                this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", "option_close_btn"),
                this.closeBtn.anchor.set(.5),
                this.closeBtn.x = 200,
                this.setTouchStartAction(this.closeBtn, function () {
                    this.emit("SOUND_POPUP_CLOSE_EVENT")
                }, this),
                this.tutorialBtn = this.setSpriteTexture(this.tutorialBtn, "texture", "option_help_btn"),
                this.tutorialBtn.anchor.set(.5), this.setTouchStartAction(this.tutorialBtn),
                this.setTouchEnd(this.tutorialBtn, function () {
                    this.setInteractive(!1), this.emit("TUTORIAL_OPEN_EVENT")
                }, this)
        },
            GD.OptionPopup.constructor = GD.OptionPopup,
            GD.OptionPopup.prototype = Object.create(PIXI.Container.prototype),
            GD.OptionPopup.prototype.show = function (type) {
                this.removeChild(),
                    this.type = type;
                var e = "option_box_0";
                0 == this.type
                    ? (1 == GD.soundType
                    ? (this.closeBtn.y = -185, this.allBtn.y = -62)
                    : (e = "option_box1_0", this.closeBtn.y = -92, this.allBtn.y = 25, this.allBtn.y = 30),
                        this.bgmBtn.y = 70,
                        this.effectBtn.y = 165)
                    : (e = "option_box_1", 1 == GD.soundType
                    ? (this.closeBtn.y = -247, this.allBtn.y = -124, this.tutorialBtn.y = 230)
                    : (e = "option_box1_1", this.closeBtn.y = -148, this.allBtn.y = -27, this.tutorialBtn.y = 130),
                        this.bgmBtn.y = 20,
                        this.effectBtn.y = 115),

                    this.addChild(this.darkBg),
                    this.bg = this.setSpriteTexture(this.bg, "texture", e),
                    this.bg.anchor.set(.5),
                    this.bg.x = GD.width / 2,
                    this.bg.y = GD.height / 2,
                    this.addChild(this.bg),
                    this.bg.addChild(this.closeBtn),
                    this.bg.addChild(this.allBtn),
                1 == GD.soundType && (this.bg.addChild(this.bgmBtn), this.bg.addChild(this.effectBtn)),
                1 == this.type && this.bg.addChild(this.tutorialBtn),
                    this.setAllSoundBtn(),
                    this.setBgmBtn(!1),
                    this.setEffectBtn(),
                    this.bg.scale.set(.1),
                    TweenMax.to(this.bg.scale, .15, {
                        x: 1, y: 1, ease: Back.easeOut, onComplete: this.showComplete.bind(this)
                    })
            },
            GD.OptionPopup.prototype.showComplete = function () {
                this.setInteractive(!0)
            },
            GD.OptionPopup.prototype.hide = function () {
                this.removeChild()
            },
            GD.OptionPopup.prototype.setAllSoundBtn = function () {
                GD.isAllSound
                    ? (this.allBtn = this.setSpriteTexture(this.allBtn, "texture", "option_on_0"), GD.soundUnMute())
                    : (this.allBtn = this.setSpriteTexture(this.allBtn, "texture", "option_off_0"), GD.soundMute())
            },
            GD.OptionPopup.prototype.setBgmBtn = function (t) {
                GD.isAllSound
                    ? (GD.isBgmSound
                    ? this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_on_0")
                    : this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_off_0"),
                    t && 1 == this.type && (GD.isBgmSound ? GD.bgmPlay() : GD.bgmStop()))
                    : GD.isBgmSound
                    ? this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_on_1")
                    : this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_off_1")
            },
            GD.OptionPopup.prototype.setEffectBtn = function () {
                GD.isAllSound ? GD.isEffectSound ? this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_on_0") : this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_off_0") : GD.isEffectSound ? this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_on_1") : this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_off_1")
            },
            GD.OptionPopup.prototype.setInteractive = function (interactive) {
                this.allBtn.interactive = interactive,
                    this.bgmBtn.interactive = interactive,
                    this.effectBtn.interactive = interactive,
                    this.tutorialBtn.interactive = interactive,
                    this.closeBtn.interactive = interactive
            },
            GD.OptionPopup.prototype.removeChild = function () {
                this.removeChildren(),
                this.bg && this.bg.removeChildren(),
                    this.setInteractive(!1)
            }
    },
    //9
    function (fun, exports) {
        GD.ScorePopup = function () {
            PIXI.Container.call(this),
                this.darkBg = GD.getDarkBg(),
                this.bg = this.setSpriteTexture(this.allBtn, "texture", "gameOver_box"),
                this.bg.anchor.set(.5),
                this.bg.x = GD.width / 2,
                this.bg.y = GD.height / 2,
                this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", "option_close_btn"),
                this.closeBtn.anchor.set(.5),
                this.closeBtn.x = 267,
                this.closeBtn.y = -88,
                this.setTouchStartAction(this.closeBtn, function () {
                    this.emit("SCORE_POPUP_CLOSE_EVENT")
                }, this),
                this.bg.addChild(this.closeBtn),
                this.pointTxt = new gc.NumberText("gameOver_num_", "center", -12),
                this.pointTxt.y = 8,
                this.bg.addChild(this.pointTxt)
        },
            GD.ScorePopup.constructor = GD.ScorePopup,
            GD.ScorePopup.prototype = Object.create(PIXI.Container.prototype),
            GD.ScorePopup.prototype.show = function (t) {
                this.removeChild(),
                    this.pointTxt.setValue(t),
                    this.addChild(this.darkBg),
                    this.addChild(this.bg),
                    this.bg.scale.set(.1),
                    TweenMax.to(this.bg.scale, .15, {
                        x: 1,
                        y: 1,
                        ease: Back.easeOut, onComplete: this.showComplete.bind(this)
                    })
            },
            GD.ScorePopup.prototype.showComplete = function () {
                this.setInteractive(!0)
            },
            GD.ScorePopup.prototype.setInteractive = function (interactive) {
                this.closeBtn.interactive = interactive
            },
            GD.ScorePopup.prototype.removeChild = function () {
                this.setInteractive(!1),
                    this.removeChildren()
            }
    },
    //10
    function (fun, exports) {


        //Util
        GD.Util = {
            zeroStr: function (t, e) {
                for (var i = t.toString(), n = e - i.length; n--;) i = "0" + i;
                return i
            },
            randomNumber: function (t, e) {
                var i = 10 * e || 1;
                return Math.floor(Math.random() * t * i / i)
            },
            hitTest: function (t, e) {
                return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height
            },
            uniqueArray: function (t) {
                for (var e = [], i = 0, n = t.length; n > i; i++) -1 === e.indexOf(t[i]) && "" !== t[i] && e.push(t[i]);
                return e
            },
            comma: function (t) {

                return t = String(t), t.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
            },
            shuffle: function (t) {
                var e, i, n;
                for (n = t.length; n; n--) e = Math.floor(Math.random() * n), i = t[n - 1], t[n - 1] = t[e], t[e] = i
            },
            grep: function (t, e) {
                return jQuery.grep(t, function (t) {
                    return t != e
                })
            },
            getParam: function (t) {
                var e = window.location.search.match(new RegExp("(?:[?&]" + t + "=)([^&]+)"));
                return e ? e[1] : null
            },
            mobileCheck: function () {
                return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
            },
            radiansToDegrees: function (t) {
                return t * Math.PI / 180
            },
            degreesToradians: function (t) {
                return 180 * t / Math.PI
            }
        }
    },
    //11
    function (fun, exports) {


        //成就

        GD.Achievement = function () {
            PIXI.Container.call(this),
                this.icons = [],
                this.idx = 0
        },
            GD.Achievement.constructor = GD.Achievement,
            GD.Achievement.prototype = Object.create(PIXI.Container.prototype),
            GD.Achievement.prototype.show = function (t, y) {
                var text = this.setSpriteTexture(null, "texture", "medal_box");
                text.anchor.set(.5),
                    text.scale.set(.3),
                    text.idx = this.idx,
                    text.x = GD.width + 50,
                    y ? text.y = y : text.y = 140,
                this.icons.length > 0 && (text.y += 100 * this.icons.length),
                    GD.log("game_medal_" + t);
                var text2 = this.setSpriteTexture(null, "sprite", "game_medal_" + t);
                text2.anchor.set(.5),
                    text2.y = -30, text.addChild(text2),
                    this.addChild(text),
                    this.icons.push(text),
                    setTimeout(function () {
                        TweenMax.to(text, .5, {
                            x: GD.width - 50, ease: Back.easeOut, onComplete: this.iconHide.bind(this),
                            onCompleteParams: [text]
                        })
                    }.bind(this), 3),
                    this.idx++
            },
            GD.Achievement.prototype.iconHide = function (ico) {
                TweenMax.to(ico, .5, {
                    x: GD.width + 50, delay: 2, ease: Back.easeIn, onComplete: function () {
                        for (var icon, i = this.icons.length; i--;)
                            if (icon = this.icons[i], icon.idx == ico.idx) {
                                this.icons.splice(i, 1),
                                    this.removeChild(icon);
                                break
                            }
                    }.bind(this)
                })
            },
            GD.Achievement.prototype.removeAll = function () {
                this.removeChildren()
            }
    },
    //12
    function (fun, exports) {

        GD.GamePadGuide = function () {
            PIXI.Container.call(this),
                this.guide = this.setSpriteTexture(this.guide, "sprite", "gamePadGuide"),
                this.setTouchEnd(this.guide, function () {
                    this.setInteractive(!1),
                        this.removeChild(this.guide),
                        this.emit("GAME_PAD_GUIDE_CLOSE_EVENT")
                }.bind(this))
        },
            GD.GamePadGuide.constructor = GD.GamePadGuide,
            GD.GamePadGuide.prototype = Object.create(PIXI.Container.prototype),
            GD.GamePadGuide.prototype.init = function () {
                this.removeChild(),
                    this.addChild(this.guide),
                    this.setInteractive(!0)
            },
            GD.GamePadGuide.prototype.setInteractive = function (interactive) {
                this.guide.interactive = interactive
            },
            GD.GamePadGuide.prototype.removeChild = function () {
                this.removeChildren()
            }
    },
    //13
    function (fun, exports) {

        GD.LoadingView = function () {
            PIXI.Container.call(this),
                this.darkBg = GD.getDarkBg(),
                this.img = this.setSpriteTexture(null, "texture", "loadingCircle"),
                this.img.scale.set(.8),
                this.img.anchor.set(.5),
                this.img.x = GD.width / 2,
                this.img.y = GD.height / 2,
                this.addChild(this.img)
        },
            GD.LoadingView.constructor = GD.LoadingView,
            GD.LoadingView.prototype = Object.create(PIXI.Container.prototype),
            GD.LoadingView.prototype.init = function () {
                this.removeAll(), this.addChild(this.darkBg), this.addChild(this.img)
            },
            GD.LoadingView.prototype.removeAll = function () {
                this.removeChildren()
            },
            GD.LoadingView.prototype.updateTransform = function () {
                PIXI.Container.prototype.updateTransform.call(this), this.img.rotation += .1
            },
            GD.LoadingView.getInstance = function () {
                return GD.loading || (GD.loading = new GD.LoadingView), GD.loading
            }
    },
    //14
    function (fun, exports) {

        GD.Progress = function () {
            this.bg = null,
                this.logo = null,
                this.logoTxt = null,
                this.tween = null,
                PIXI.Container.call(this)
        },
            GD.Progress.constructor = GD.Progress,
            GD.Progress.prototype = Object.create(PIXI.Container.prototype),
            GD.Progress.prototype.show = function () {
                if (
                    this.bg
                    || (this.bg = new PIXI.Graphics, this.bg.beginFill(16742144, 1), this.bg.drawRect(0, 0, GD.width, GD.height), this.bg.endFill()),
                        this.addChild(this.bg),
                        !this.logo) {

                    var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGYAAAAiCAYAAACtFqwYAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3goRDTAjMwwrdgAABCFJREFUaN7tm09oHFUcxz+/2SW7O3/ak9CF4kkPOXisBfEQe+wl6cmD4F1BxJOXUKvYmxgERQQPWkwRCrq5VEG0UaglFKQSS6CtByWygVak7Owm0XR+HjKb7iY729l5bzOFnR8EhrB577Pv+35/3m9eoLDH0mSUD6tS6XQ4RcSswjRQF6gDEbAe/9xSoeF5LIvwYBzQo3C4Lj86DjuHzOEp/Ae0Bf5S4aLn8YEIHavCtNvUiTgr8JJCkHLsewKvuQFf2lqIrBzAWyJccH3CHDkU+B6Hlz2PppEwqlQ7IfPAG4A7In9UUqarR7hlYWcacQgsi8P1qss5EbZy4uhaB1hwfd4dxpIoTBhyTKCBcjIjQMMLOGMqigWO3S+6+03/UeVFL+C7vDh6Vn5FYc732UgtTBjyjCiXgeOZ51Wed49w1VAUY44BArVU+QT42gv4OS+O2NZVOO37rD5SmDDkmCjXDSGueQHPGXuKOUeS3Qa+chxuRBE/lctsVGpEOXB0xTmx33Oc/TFUoGEKIfCeaU6xwTHEngbeVGWuVGJ2aoqjOXEAHBdoqFJNFKYTMm8hht6p+TRMBrDEMTTfxDnnWVXC7W3qeXD01Gsn46LiYCiLS8A7BtVG1171Aj42LEVtcCACqgNF+VeVK45wkYhL1YDNcXKkrtYcnuqW0uWHRSVnLUDcc30+MxrBDkc3FB0QSYS/gQ9FuFT1uHkYHCnNjed8Zc9jVKlshtwd4bCUZG97AedMTtI2OBI8RVVplEpcKJe4Uq5wf9wcGXJzq+bzhAjbZYBOh1OYQ2xG8JGRLxtyxHnjgKeIsAZcq3m83m6xVXWHt2gsrUeGVEMQz/1NOXbbWQvjfh4E3DUMY7O2wlcs0n3gpirzNY9fRFK2ZOysh8ka7AqjMC2Gw5Ui3rewY4w49onym+PwhQjfVmr8epgcpmvQm/zrhuMtVY9y2wKXKQeOw5+q3BD4tBJxWfxMHe46+Vl9TxgxBBE1O1D2JD/jBYkiniyXeGGqxh9ZXztIjsJIrzDG7idcbbeyd1+8wG6i3XnA7zshjMhkncPI8+O41swLoHfuguPh3N2WTDPHzdFMeJ5oDieOa2s5xtS1Qc+TzuHEAW0px2C6NPB5wjlst2QytyAKjn4OJz6QbSss5pDoFruLUXD0c4yj7Z/W+trcBUc/x96LsvgXC4e4QRYGXeMpOPbCWo8rKdVOm+Wxv7UTVlyPmaTrOwXHvlfLImwpzLF7k3Fctq4wN/ROVcHRLwyA77OhwukxwXSv62w86oOTzuEkwKyqcAJhxaa7xtd0VtP+ySRzOMN2iusxA5yH9JehB1YbcN71mEmzQwuOAck/ybJcohZoKSzi8E6aS9QFRwZheqqUpH876HZFmwJrOCy5Lj/0HtqsHsQKjsLysv8BJhxQwi0w/98AAAAASUVORK5CYII=";
                    this.logo = new PIXI.Sprite.fromImage(image)
                }
                this.logo.x = GD.width / 2,
                    this.logo.y = GD.height / 2,
                    this.logo.anchor.set(.5),
                    this.logo.scale.set(.1),
                    this.logo.rotation = 20,
                    this.addChild(this.logo),
                    this.tween ? this.tween.kill() : this.tween = new TimelineLite,
                    this.tween.to(this.logo, 1, {
                        rotation: 0, ease: Sine.easeOut
                    }),
                    this.tween.call(this.showLocoText.bind(this)),
                    TweenMax.to(this.logo.scale, 1, {x: 1, y: 1})
            },
            GD.Progress.prototype.showLocoText = function () {
                if (!this.logoTxt) {
                    var image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAE+SURBVFiF7dYxbsJAEIXhf01oqKjScgTaIEUKvpmPwDFyC3BFWo6QLheIhLDWkyKKFS/2sjtrkxR+/b75tMVojIjwH/KQ8jh/y7dkFADUFPun/UHbZTQ/0gCEl3YbpRYUBekFXLXGg4IgwYAEkBeiBihAnZDBABGgFmQ0QADIiMj9AB5QBnB+P+/sp13eFQFYsctLfdnBz0KrWVcfFVVWneaPc2aL2XpUAPZkrUWQZk57s44M6gJ0Q0YC+QB+yECgEEAYRAmKAcRBAkEagA7SA2IBWkAaxAGZlUmqAciSGwbKBHEzQdxMEDffEEMOlH8wv5RacnBOxc3rZotQQNylplhopdRSHJ+Ph6aj63iOBUVArgBeSCwoANILCIKEgjyQm4AoyC1QByQYoIL0gX5BogFJEBdkVgYtYBDIkPkCtkIwLKIiCREAAAAASUVORK5CYII=";
                    this.logoTxt = new PIXI.Sprite.fromImage(image),
                        this.logoTxt.anchor.set(1),
                        this.logoTxt.scale.set(1),
                        this.logoTxt.y = GD.height / 2 + 45
                }
                this.logoTxt.x = GD.width / 2 + 120,
                    this.logoTxt.alpha = 0,
                    this.addChild(this.logoTxt),
                    TweenMax.to(this.logo, .4, {
                        x: GD.width / 2 + 145, ease: Sine.easeOut
                    }),
                    TweenMax.to(this.logoTxt, .4, {
                        x: GD.width / 2 + 80, alpha: 1, ease: Sine.easeOut
                    }),
                    TweenMax.delayedCall(2, this.replay.bind(this))
            },
            GD.Progress.prototype.replay = function () {
                this.hide(),
                    this.show()
            },
            GD.Progress.prototype.hide = function () {
                TweenMax.killAll(),
                    this.tween.clear(),
                    this.removeChildren()
            },
            GD.Progress.prototype.updateTransform = function () {
                PIXI.Container.prototype.updateTransform.call(this)
            }
    },
    //15
    function (fun, exports) {


        //教程
        GD.Tutorial = function () {
            PIXI.Container.call(this),
                this.type = 1,
                this.tutorialImg = null,
                this.nowPage = 0,
                this.totalPage = 0,
                this.contents = [],
                this.container = new PIXI.Container,
                this.img = this.setSpriteTexture(this.img, "texture", "temp"),
                this.prevBtn = this.setSpriteTexture(this.prevBtn, "texture", "temp"),
                this.prevBtn.anchor.set(.5),
                this.prevBtn.x = 30,
                this.prevBtn.y = GD.height / 2,
                this.setTouchStartAction(this.prevBtn, function () {
                    this.nowPage > 0 && this.initPage(this.nowPage - 1)
                }, this),
                this.addChild(this.prevBtn),
                this.nextBtn = this.setSpriteTexture(this.nextBtn, "texture", "temp"),
                this.nextBtn.anchor.set(.5),
                this.nextBtn.x = GD.width - 30,
                this.nextBtn.y = GD.height / 2,

                this.setTouchStartAction(
                    this.nextBtn,
                    function () {
                        this.nowPage + 1 < this.totalPage && this.initPage(this.nowPage + 1)
                    }, this),

                this.addChild(this.nextBtn),
                this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", "temp"),
                this.closeBtn.anchor.set(.5),
                this.closeBtn.x = GD.width / 2,
                this.closeBtn.y = GD.height - 105,
                this.setTouchStartAction(this.closeBtn),
                this.setTouchEnd(this.closeBtn, function () {
                    this.emit("TUTORIAL_CLOSE_EVENT")
                }, this),
                this.addChild(this.closeBtn)
        },

            GD.Tutorial.constructor = GD.Tutorial,
            GD.Tutorial.prototype = Object.create(PIXI.Container.prototype),
            GD.Tutorial.prototype.init = function (totalPage, tutorialImg) {
                this.removeChild(),
                    this.type = 1,
                    this.tutorialImg = tutorialImg,
                    this.nowPage = 0,
                    this.totalPage = totalPage,
                    this.addChild(this.img),
                    this.addChild(this.closeBtn),
                    this.initPageButton(),
                    this.setTutorialImg(),
                    this.setInteractive(!0),
                    this.setButtons()
            },
            GD.Tutorial.prototype.initContent = function (totalPage, contents) {
                this.removeChild(),
                    this.type = 2,
                    this.nowPage = 0,
                    this.totalPage = totalPage,
                    this.contents = contents,
                    this.addChild(this.container),
                    this.addChild(this.closeBtn),
                    this.container.addChild(this.contents[0]),
                    this.setContent(),
                    this.initPageButton(),
                    this.setInteractive(!0),
                    this.setButtons()
            },
            GD.Tutorial.prototype.initPage = function (nowPage, t) {
                this.nowPage = nowPage,
                t && (this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", t)),
                    1 == this.type
                        ? this.setTutorialImg()
                        : this.setContent(),
                    this.setButtons()
            },
            GD.Tutorial.prototype.initPageButton = function () {
                this.totalPage > 0 && (this.prevBtn = this.setSpriteTexture(this.prevBtn, "texture", "help_prev"),
                    this.nextBtn = this.setSpriteTexture(this.nextBtn, "texture", "help_next"),
                    this.prevBtn.scale.set(1),
                    this.nextBtn.scale.set(1),
                    this.addChild(this.prevBtn),
                    this.addChild(this.nextBtn))
            },
            GD.Tutorial.prototype.setPrevButtonPos = function (x, y) {
                this.prevBtn.x = x,
                    this.prevBtn.y = y
            },
            GD.Tutorial.prototype.setNextButtonPos = function (x, y) {
                this.nextBtn.x = x,
                    this.nextBtn.y = y
            },
            GD.Tutorial.prototype.setCloseButtonPos = function (x, y) {
                this.closeBtn.x = x,
                    this.closeBtn.y = y
            },
            GD.Tutorial.prototype.setTutorialImg = function () {
                this.img = this.setSpriteTexture(this.img, "texture", this.tutorialImg + (this.nowPage + 1))
            },
            GD.Tutorial.prototype.setContent = function () {
                this.container.removeChildren();
                var page = this.contents[this.nowPage];
                page.init && page.init(),
                    this.container.addChild(page)
            },
            GD.Tutorial.prototype.setButtons = function () {
                this.totalPage > 0
                && (0 == this.nowPage
                    ? (this.prevBtn.alpha = .3, this.nextBtn.alpha = 1, this.prevBtn.interactive = !1, this.nextBtn.interactive = !0)
                    : this.nowPage + 1 == this.totalPage
                        ? (this.prevBtn.alpha = 1, this.nextBtn.alpha = .3, this.prevBtn.interactive = !0, this.nextBtn.interactive = !1)
                        : (this.prevBtn.alpha = 1, this.nextBtn.alpha = 1, this.prevBtn.interactive = !0, this.nextBtn.interactive = !0))
            },
            GD.Tutorial.prototype.setInteractive = function (interactive) {
                this.prevBtn.interactive = interactive,
                    this.nextBtn.interactive = interactive,
                    this.closeBtn.interactive = interactive
            },
            GD.Tutorial.prototype.removeChild = function () {
                this.setInteractive(!1),
                    this.container.removeChildren(),
                    this.removeChildren()
            },
            GD.Tutorial.getInstance = function () {
                return GD.tutorial || (GD.tutorial = new GD.Tutorial), GD.tutorial
            }
    }


];


//次序加载方法
!function (arr) {

    function InitFun(id) {

        //已加载过
        if (funArrs[id]) return funArrs[id].exports;

        //初始化
        var fun = funArrs[id] = {exports: {}, id: id, loaded: false};

        //加载
        arr[id].call(fun.exports,
            fun, fun.exports, InitFun);
        fun.loaded = true;

        console.log(fun);
        return fun.exports;
    }

    var funArrs = {};
    InitFun.m = arr,
        InitFun.c = funArrs,
        InitFun.p = "";

    return InitFun(0);

}(funArr);