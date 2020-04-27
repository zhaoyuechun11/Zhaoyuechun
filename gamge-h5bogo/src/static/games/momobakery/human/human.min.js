!function (t) {
    function e(n) {
        if (i[n]) return i[n].exports;
        var o = i[n] = {exports: {}, id: n, loaded: !1};
        return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
    }
    var i = {};
    return e.m = t, e.c = i, e.p = "", e(0)
}(
    [

        function (t, e, i) {
            i(1), i(5), i(10), i(6), i(7), i(9), i(8), i(11), i(12), i(13), i(14), i(15), i(2), i(3), i(4)
        },
        function (t, e) {},
        function (t, e) {


            PIXI.Container.prototype.setTouchStartAction = function (Btn, e, i) {
                Btn.mousedown = Btn.touchstart = function (n) {
                    n.stopPropagation(), GD.fullScreen(), GD.buttonAction(Btn), e && e.call(i, n)
                }.bind(i)
            },
                PIXI.Container.prototype.setTouchStart = function (t, e, i) {
                    t.mousedown = t.touchstart = function (t) {
                        t.stopPropagation(), GD.fullScreen(), e && e.call(i, t)
                    }.bind(i)
                },
                PIXI.Container.prototype.setTouchEnd = function (t, e, i) {
                    t.tap = function (t) {
                        t.stopPropagation(), GD.fullScreen(), e && e.call(i, t)
                    }.bind(i), GD.isMobile || (t.click = function (t) {
                        t.stopPropagation(), e && e.call(i, t)
                    }.bind(i))
                },
                PIXI.Container.prototype.setTouchMove = function (t, e, i) {
                    t.mousemove = t.touchmove = function (t) {
                        t.stopPropagation(), e && e.call(i, t)
                    }.bind(i)
                },
                PIXI.Container.prototype.addGamePadEvent = function () {
                    this.removeGamePadEvent(), $(GamePadManager).on("padButton", this.onGamePadEvent.bind(this)), $(GamePadManager).on("padStickX", this.onGamePadStickXEvent.bind(this)), $(GamePadManager).on("padStickY", this.onGamePadStickYEvent.bind(this))
                },
                PIXI.Container.prototype.removeGamePadEvent = function () {
                    $(GamePadManager).off()
                },
                PIXI.Container.prototype.onGamePadEvent = function (t, e) {
                },
                PIXI.Container.prototype.onGamePadStickXEvent = function (t, e) {
                },
                PIXI.Container.prototype.onGamePadStickYEvent = function (t, e) {
                },
                PIXI.Container.prototype.showLoading = function () {
                    GD.loading = GD.LoadingView.getInstance(), GD.loading.init(), this.addChild(GD.loading)
                },
                PIXI.Container.prototype.hideLoading = function () {
                    this.removeChild(GD.loading)
                }
        },

        function (t, e) {

            GD.CommonIntro = function (t, e) {
                PIXI.Container.call(this), this.helpBtn = null, this.soundpBtn = null, this.startBtn = null, this.callBackFunc = null, this.callBackTarget = null, this.bg = this.setSpriteTexture(this.bg, "texture", e), this.addChild(this.bg), this.copyText = this.setSpriteTexture(this.copyText, "texture", "copybar_" + t), this.copyText.anchor.set(.5), this.copyText.x = GD.width / 2, this.copyText.y = GD.height - 20, this.addChild(this.copyText), this.gamePadGuide = null, this.soundPopup = new GD.OptionPopup, this.soundPopup.on("SOUND_POPUP_CLOSE_EVENT", this.closeSoundPopup.bind(this)), gamen.loadend()
            },
                GD.CommonIntro.constructor = GD.CommonIntro, GD.CommonIntro.prototype = Object.create(PIXI.Container.prototype), GD.CommonIntro.prototype.init = function () {
                GamePadManager.isConnected && GD.isShowPadGuide && (this.gamePadGuide || (this.gamePadGuide = new GD.GamePadGuide), this.showGamePadGuide(), this.addGamePadEvent()), GD.isShowPadGuide = !1, this.setInteractive(!0)
            }, GD.CommonIntro.prototype.showGamePadGuide = function () {
                this.gamePadGuide.init(), this.addChild(this.gamePadGuide)
            },
                GD.CommonIntro.prototype.hideGamePadGuide = function () {
                    this.removeChild(this.gamePadGuide)
                },
                GD.CommonIntro.prototype.initHelp = function (t, e, i) {
                    this.helpBtn = this.setSpriteTexture(this.helpBtn, "texture", t), this.helpBtn.anchor.set(.5), this.helpBtn.x = e, this.helpBtn.y = i, this.helpBtn.scale.set(1), this.addChild(this.helpBtn),
                        this.setTouchStartAction(this.helpBtn), this.setTouchEnd(this.helpBtn, this.showHelp, this)
                },
                GD.CommonIntro.prototype.initSound = function (t, e, i) {
                    this.soundpBtn = this.setSpriteTexture(this.soundpBtn, "texture", t), this.soundpBtn.anchor.set(.5), this.soundpBtn.x = e, this.soundpBtn.y = i, this.soundpBtn.scale.set(1), this.addChild(this.soundpBtn), this.setTouchStartAction(this.soundpBtn), this.setTouchEnd(this.soundpBtn, this.showSoundPopup, this)
                },
                GD.CommonIntro.prototype.initStart = function (t, e, i, n, o) {
                    this.startBtn = this.setSpriteTexture(this.startBtn, "texture", t), this.startBtn.anchor.set(.5), this.startBtn.x = e, this.startBtn.y = i, this.callBackFunc = n, this.callBackTarget = o, this.startBtn.scale.set(1), this.addChild(this.startBtn), this.setTouchStartAction(this.startBtn), this.setTouchEnd(this.startBtn, this.sendStartData, this)
                },
                GD.CommonIntro.prototype.onGamePadEvent = function (t, e) {
                    switch (e) {
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
                    this.setInteractive(!1), GD.tutorial.initPage(0, "help_start"), GD.tutorial.once("TUTORIAL_CLOSE_EVENT", this.hideHelp.bind(this)), this.addChild(GD.tutorial)
                },
                GD.CommonIntro.prototype.hideHelp = function () {
                    this.sendStartData()
                },
                GD.CommonIntro.prototype.showSoundPopup = function () {
                    this.setInteractive(!1), this.soundPopup.show(0), this.addChild(this.soundPopup)
                },
                GD.CommonIntro.prototype.closeSoundPopup = function () {
                    this.removeChild(this.soundPopup), this.setInteractive(!0)
                },
                GD.CommonIntro.prototype.sendStartData = function () {
                    this.showLoading(), DataManager.start(this.startDataComplete, this)
                },
                GD.CommonIntro.prototype.startDataComplete = function () {
                    this.hideLoading(), GD.tutorial && this.removeChild(GD.tutorial), this.callBackFunc.call(this.callBackTarget)
                },
                GD.CommonIntro.prototype.setInteractive = function (t) {
                    this.helpBtn.interactive = t, this.soundpBtn.interactive = t, this.startBtn.interactive = t, GamePadManager.isConnected && (t ? this.addGamePadEvent() : this.removeGamePadEvent())
                },
                GD.CommonIntro.getInstance = function (t, e) {
                    return GD.commonIntro || (GD.commonIntro = new GD.CommonIntro(t, e)), GD.commonIntro
                }
        },

        function (t, e) {

            GD.CommonOption = function (t) {
                PIXI.Container.call(this), this.scorePopup = new GD.ScorePopup, this.scorePopup.on("SCORE_POPUP_CLOSE_EVENT", this.closeScorePopup.bind(this)), this.optionPopup = new GD.OptionPopup, this.optionPopup.on("SOUND_POPUP_CLOSE_EVENT", this.closeOptionPopup.bind(this)), this.optionPopup.on("TUTORIAL_OPEN_EVENT", this.showTutorial.bind(this)), this.optBtn = this.setSpriteTexture(this.optBtn, "texture", "btn_option_" + t), this.optBtn.anchor.set(.5), this.optBtn.x = GD.width - 40, this.optBtn.y = 40, this.setTouchStartAction(this.optBtn), this.setTouchEnd(this.optBtn, function () {
                    this.setInteractive(!1), this.optionPopup.show(1), this.addChild(this.optionPopup), this.emit("OPTION_OPEN_EVENT")
                }.bind(this)), this.achievement = new GD.Achievement
            },
                GD.CommonOption.constructor = GD.CommonOption, GD.CommonOption.prototype = Object.create(PIXI.Container.prototype), GD.CommonOption.prototype.init = function () {
                this.removeAll(), this.addChild(this.optBtn), this.addChild(this.achievement), this.setInteractive(!0)
            },
                GD.CommonOption.prototype.setAchievement = function (t) {
                    this.achievement.show(t)
                },
                GD.CommonOption.prototype.setInteractive = function (t) {
                    this.optBtn.interactive = t
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

        function (t, e) {


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
                GD.init = function (t, e, i, n, o) {
                    if (GD.width = t, GD.height = e, GD.leng = gamen.game_language, this.renderer = PIXI.autoDetectRenderer(t, e, {
                        backgroundColor: o, resolution: 2, clearBeforeRender: !1
                    }),
                        $("#gamecontainer")[0] ? ($("#gameCanvas") && $("#gameCanvas").remove(),
                            $("#gamecontainer").append(this.renderer.view)) : document.body.appendChild(this.renderer.view),
                    GD.Util.mobileCheck() && (GD.isMobile = !0),


                        GD.Util.mobileCheck()) {
                        var s = navigator.userAgent.toLowerCase();
                        -1 != s.indexOf("android 4.") ? -1 == s.indexOf("chrome") && -1 == s.indexOf("mobile safari") || (GD.soundType = 1) : GD.soundType = 1
                    } else GD.soundType = 1;

                    requestAnimationFrame(this.update),
                        this.root = new PIXI.Container,
                        this.stage = new PIXI.Container,
                        this.root.addChild(this.stage),
                    GD.isDebug && (GD.stats = new Stats, document.body.appendChild(GD.stats.domElement), GD.stats.domElement.style.position = "absolute", GD.stats.domElement.style.top = "0px"), this.resize(), this.setSpriteTexture(), this.resourceLoad()
                },
                GD.resourceLoad = function () {
                    var t = COMMON_IMG_PATH + "image/json/";
                    GD.loader = PIXI.loader, GD.loader.add(t + "human_common.json"), GD.loader.add(t + "human_popup_" + this.leng + ".json")
                }, GD.showProgress = function () {
                GD.progress = new GD.Progress, GD.progress.show(), this.root.addChild(GD.progress)
            },
                GD.hideProgress = function () {
                    GD.progress.hide(), this.root.removeChild(GD.progress)
                },
                GD.resize = function () {
                    if (GD.renderer) {
                        var t = GD.width / GD.height, e = window.innerWidth, i = window.innerHeight, n = e / i;
                        if ($("#gamecontainer")[0]) {
                            var o = document.getElementById("gamecontainer");
                            o.style.color = "#FF0000", n > t ? (e = i * t, o.style.width = e + "px", o.style.height = i + "px", GD.renderer.view.style.width = e + "px", GD.renderer.view.style.height = i + "px") : (i = e / t, o.style.width = e + "px", o.style.height = i + "px", GD.renderer.view.style.width = e + "px", GD.renderer.view.style.height = i + "px")
                        } else n > t ? e = i * t : i = e / t, this.renderer.view.style.width = e + "px", this.renderer.view.style.height = i + "px"
                    }
                    gamen.score_view_status || this.setOrientationGuide()
                },
                GD.render = function () {
                    GD.renderer.render(GD.root)
                },
                GD.update = function () {
                    GD.isDebug && GD.stats.begin(), requestAnimationFrame(GD.update), GD.render(), GD.isDebug && GD.stats.end()
                },
                GD.buttonAction = function (t, e, i) {
                    e || (e = 1.2), i || (i = 1), t.scale.set(e), TweenMax.to(t.scale, .2, {x: i, y: i})
                },
                GD.setSpriteTexture = function () {
                    PIXI.Container.prototype.setSpriteTexture = function (t, e, i) {
                        return "sprite" == e ? t ? t.texture = GD.loader.resources[i].texture : t = new PIXI.Sprite(GD.loader.resources[i].texture) : t ? t.texture = PIXI.Texture.fromFrame(i + ".png") : t = new PIXI.Sprite.fromFrame(i + ".png"), t
                    }
                },
                GD.getDarkBg = function () {
                    return GD.darkBg || (GD.darkBg = new PIXI.Graphics, GD.darkBg.beginFill(0, .8), GD.darkBg.drawRect(0, 0, GD.width, GD.height), GD.darkBg.endFill()), GD.darkBg
                },
                GD.log = function (t) {
                    GD.isShowLog ? (GD.logStr = t + "\n" + GD.logStr, GD.logText || (GD.logText = new PIXI.Text("", {
                        font: "14px Arial", fill: "#F7EDCA", stroke: "#000", strokeThickness: 4,
                        wordWrapWidth: GD.width - 60,
                        wordWrap: !0
                    }), GD.logText.x = 30, GD.logText.y = 30), GD.logText.parent || GD.root.addChild(GD.logText), GD.logText.text = GD.logStr) : console.log(t)
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
                    if (t && "none" != t.style.display && com) return GD.renderer.view.style.display = "none", void GD.showOrientation(!1);
                    var e = window.innerWidth / window.innerHeight, i = GD.width / GD.height;
                    i > 1 ? GD.orientationType = "phone rotate_x" : GD.orientationType = "phone rotate_y", e > 1 && 1 > i || 1 > e && i > 1 ? GD.showOrientation(!0) : GD.showOrientation(!1)
                },
                GD.showOrientation = function (t) {
                    for (var e = ["Z300C", "TF701T", "TF700T", "TF103C", "TF101-1B251A", "TA2506 10BK", "SM-T805", "SM-T800", "SM-T677", "SM-T670", "SM-P900", "SMP-605", "SMP-600", "SMART-TV", "SmartTV", "SM-905", "SHW-M480W", "SHW-M380", "SHV-E230", "SGP771", "SGP311", "QM0101", "Q109", "MZ68", "MZ601", "MX1080", "MID 1065-8", "MID 1042-8", "ME102A", "LGV940", "LGV700N", "GT-P5110", "FZ-A1", "AT105", "A10-70", "10QS", "10ES"], i = e.length; i--;) if (navigator.userAgent.match(e[i])) return;
                    var n, o, s, r, a, h;
                    if (GD.isMobile) {
                        var l = document.getElementsByClassName("xy_wrap").length;
                        if (t) {
                            if (n = GD.orientationGuide, null == n) {
                                if (n = document.createElement("div"), n.style.backgroundColor = "#ff7e17", n.style.position = "absolute", n.style.left = 0, n.style.top = 0, n.style.right = 0, n.style.bottom = 0, n.style.margin = "auto", n.setAttribute("class", "xy_wrap"), GD.orientationGuide = n, o = document.createElement("div"), o.setAttribute("class", "xy_info"), s = document.createElement("div"), s.setAttribute("class", GD.orientationType), r = document.createElement("span"), r.setAttribute("class", "yes"), a = document.createElement("span"), a.setAttribute("class", "no"), n.appendChild(o), o.appendChild(s), o.appendChild(r), o.appendChild(a), h = document.createElement("p"), h.style.left = "0px", h.style.right = "0px", h.style.padding = "15px", h.style.lineHeight = "130%", h.style.color = "#FFFFFF", h.style.position = "absolute", "en" == GD.lang) h.style.fontSize = "18px", h.innerHTML = "Please rotate your device."; else {
                                    var u;
                                    switch (GD.lang) {
                                        case"jp":
                                            u = "お使いの 携?電話を 回?させて 下ください。";
                                            break;
                                        case"en":
                                            u = "ROTATE YOUR PHONE";
                                            break;
                                        case"cn":
                                            u = "如果?幕不能旋?，?打?自?旋?功能。";
                                            break;
                                        default:
                                            u = window.innerWidth > 480 ? "If the screen does not switch, turn on the auto rotate function." : "If the screen does not switch,turn on the auto rotate function."
                                    }
                                    h.innerHTML = u
                                }
                                o.appendChild(h)
                            }
                            0 == l && (document.body.appendChild(n), GD.orientationChange(!0), GD.renderer.view.style.visibility = "hidden")
                        } else l > 0 && (document.body.removeChild(GD.orientationGuide), GD.orientationChange(!1), GD.renderer.view.style.visibility = "visible")
                    }
                },
                GD.orientationChange = function (t) {
                    t ? GD.soundMute() : GD.isAllSound && GD.soundUnMute()
                },
                GD.loadSound = function (t, e) {
                    for (var i, n = t.length, o = 0, s = n; s--;) i = t[s], GD.sound[i] = new Howl({
                        src: [RES_DIR_SOUND + i + ".mp3?ver=" + SOUND_VERSION, RES_DIR_SOUND + i + ".ogg?ver=" + SOUND_VERSION, RES_DIR_SOUND + i + ".wav?ver=" + SOUND_VERSION],
                        onload: function () {
                            o++, o == n && e()
                        }
                    })
                },
                GD.bgmPlay = function (t) {
                    var e = GD.sound.sound_bgm;
                    e._loop = !0, t ? e._volume = t : e._volume = .3, GD.isBgmSound && e.play()
                },
                GD.bgmStop = function () {
                    GD.sound.sound_bgm.stop()
                },
                GD.soundPlay = function (t, e, i) {
                    var n = GD.sound[t];
                    e || (e = 1), e ? n._volume = e : n._volume = 1, i ? n._loop = i : n._loop = !1, GD.isEffectSound && n.play()
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

        function (t, e) {
            DataManager = {},
                DataManager.unique = null,
                DataManager.pk = null,
                DataManager.Skey = null,
                DataManager.Okey = null,
                DataManager.callFunc = null,
                DataManager.target = null,
                DataManager.playInterval = null,
                DataManager.start = function (t, e) {
                    DataManager.callFunc = t,
                        DataManager.target = e,
                        gamen.start(DataManager.startDataComplete)
                },
                DataManager.startDataComplete = function (t, e, i, n, o) {
                    if (GD.isLogin = t, GD.isLogin && (GD.sKey = gamen.spkey(n), GD.oKey = gamen.opkey(o), GD.unique = XORcipher().xorDecoder(e, GD.sKey), GD.pk = i, GD.startTime = Date.now(), GD.medal = [], null != gamen.achievement)) for (var s = gamen.achievement.length, r = 0; s > r; ++r) {
                        var a = XORcipher().xorDecoder(gamen.achievement[r], GD.sKey), h = [];
                        h = a.split("_gamen_"), GD.medal[r] = [parseInt(h[0]), !1, parseInt(h[1]), h[2], h[3], parseInt(h[5]), h[4]]
                    }
                    DataManager.callFunc.call(DataManager.target), DataManager.playInterval = setInterval(DataManager.promisePlay, .1)
                },
                DataManager.point = function (t, e) {
                    if (GD.log(t + " : " + e), DataManager.otherPoint(t, e), GD.isLogin) {
                        t = XORcipher().xorEncoder(t, GD.sKey), e = XORcipher().xorEncoder(e.toString(), GD.sKey);
                        var i = Date.now() - GD.startTime, n = XORcipher().xorEncoder(i.toString(), GD.sKey);
                        gamen.point(t, e, n)
                    }
                },
                DataManager.otherPoint = function (t, e) {
                    if (GD.isLogin) {
                        t = XORcipher().xorEncoder(t, GD.oKey), e = XORcipher().xorEncoder(e.toString(), GD.oKey);
                        var i = Date.now() - GD.startTime, n = XORcipher().xorEncoder(i.toString(), GD.oKey);
                        gamen.otherpoint(t, e, n)
                    }
                },
                DataManager.promisePlay = function () {
                    var t = Date.now() - GD.startTime, e = XORcipher().xorEncoder(t.toString(), GD.oKey);
                    gamen.promiseplay(e)
                },
                DataManager.finish = function (t) {
                    if (DataManager.playInterval && clearInterval(DataManager.playInterval), GD.isLogin) {
                        if (GD.medal.length > 0) {
                            var e = [], i = GD.medal.length;
                            gamen.new_achievement = [];
                            for (var n = 0; i > n; ++n) e[n] = GD.medal[n][0] + "_gamen_" + GD.medal[n][2] + "_gamen_" + GD.medal[n][3] + "_gamen_" + GD.medal[n][4] + "_gamen_" + parseInt(GD.medal[n][5]), gamen.new_achievement[n] = XORcipher().xorEncoder(e[n], GD.sKey)
                        }
                        GD.log("finish : " + t);
                        var o = XORcipher().xorEncoder(t.toString(), GD.sKey),
                            s = GD.commonOption.gameRestart.bind(GD.commonOption),
                            r = XORcipher().xorEncoder(GD.unique, GD.sKey),
                            a = XORcipher().xorEncoder(GD.startTime.toString(), GD.sKey), h = Date.now(),
                            l = XORcipher().xorEncoder(h.toString(), this.sKey);
                        gamen.finish(GD.pk, o, s, r, a, l)
                    } else gamen.finish(t, GD.commonOption.gameRestart.bind(GD.commonOption))
                },
                DataManager.addMedal = function (t, e) {
                    if (GD.isLogin && GD.medal.length > 0) for (var i = null, n = 0; n < GD.medal.length; ++n) if (t == GD.medal[n][0]) {
                        i = n, 0 == GD.medal[i][1] && (null == e && (e = 1), GD.medal[i][5] += e, GD.medal[i][2] <= GD.medal[i][5] && (GD.medal[i][1] = !0, GD.commonOption.setAchievement(i + 1)));
                        break
                    }
                }
        },

        function (t, e) {


            GamePadManager = {
                isConnected: !1,
                init: function () {
                    gamepadSupport.init()
                },
                showNotSupported: function () {
                },
                updateGamePads: function (t) {
                    if (this.isConnected = !1, t) for (var e in t) {
                        var i = t[e];
                        i && (this.isConnected = !0)
                    }
                },
                updateButton: function (t, e, i) {
                    t.pressed && $(this).trigger("padButton", i)
                },
                updateAxis: function (t, e, i, n, o) {
                    "stick-1" == n && ("stick-1-axis-x" == i ? $(this).trigger("padStickX", t) : "stick-1-axis-y" == i && $(this).trigger("padStickY", t))
                }
            }
        },

        function (t, e) {


            GD.OptionPopup = function () {
                PIXI.Container.call(this), this.darkBg = GD.getDarkBg(), this.bg = null, this.type = null, this.allBtn = this.setSpriteTexture(this.allBtn, "texture", "option_on_0"), this.allBtn.anchor.set(.5), this.allBtn.x = 110, this.setTouchEnd(this.allBtn, function () {
                    GD.isAllSound = !GD.isAllSound, this.setAllSoundBtn(), this.setBgmBtn(!1), this.setEffectBtn()
                }, this), this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_on_0"), this.bgmBtn.anchor.set(.5), this.bgmBtn.x = this.allBtn.x, this.setTouchEnd(this.bgmBtn, function () {
                    GD.isAllSound && (GD.isBgmSound = !GD.isBgmSound, this.setBgmBtn(!0))
                }, this), this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_on_0"), this.effectBtn.anchor.set(.5), this.effectBtn.x = this.allBtn.x, this.setTouchEnd(this.effectBtn, function () {
                    GD.isAllSound && (GD.isEffectSound = !GD.isEffectSound, this.setEffectBtn())
                }, this), this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", "option_close_btn"), this.closeBtn.anchor.set(.5), this.closeBtn.x = 200, this.setTouchStartAction(this.closeBtn, function () {
                    this.emit("SOUND_POPUP_CLOSE_EVENT")
                }, this), this.tutorialBtn = this.setSpriteTexture(this.tutorialBtn, "texture", "option_help_btn"), this.tutorialBtn.anchor.set(.5), this.setTouchStartAction(this.tutorialBtn), this.setTouchEnd(this.tutorialBtn, function () {
                    this.setInteractive(!1), this.emit("TUTORIAL_OPEN_EVENT")
                }, this)
            },
                GD.OptionPopup.constructor = GD.OptionPopup, GD.OptionPopup.prototype = Object.create(PIXI.Container.prototype), GD.OptionPopup.prototype.show = function (t) {
                this.removeChild(), this.type = t;
                var e = "option_box_0";
                0 == this.type ? (1 == GD.soundType ? (this.closeBtn.y = -185, this.allBtn.y = -62) : (e = "option_box1_0", this.closeBtn.y = -92, this.allBtn.y = 25, this.allBtn.y = 30), this.bgmBtn.y = 70, this.effectBtn.y = 165) : (e = "option_box_1", 1 == GD.soundType ? (this.closeBtn.y = -247, this.allBtn.y = -124, this.tutorialBtn.y = 230) : (e = "option_box1_1", this.closeBtn.y = -148, this.allBtn.y = -27, this.tutorialBtn.y = 130), this.bgmBtn.y = 20, this.effectBtn.y = 115), this.addChild(this.darkBg), this.bg = this.setSpriteTexture(this.bg, "texture", e), this.bg.anchor.set(.5), this.bg.x = GD.width / 2, this.bg.y = GD.height / 2, this.addChild(this.bg), this.bg.addChild(this.closeBtn), this.bg.addChild(this.allBtn), 1 == GD.soundType && (this.bg.addChild(this.bgmBtn), this.bg.addChild(this.effectBtn)), 1 == this.type && this.bg.addChild(this.tutorialBtn), this.setAllSoundBtn(), this.setBgmBtn(!1), this.setEffectBtn(), this.bg.scale.set(.1), TweenMax.to(this.bg.scale, .15, {
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
                    GD.isAllSound ? (this.allBtn = this.setSpriteTexture(this.allBtn, "texture", "option_on_0"), GD.soundUnMute()) : (this.allBtn = this.setSpriteTexture(this.allBtn, "texture", "option_off_0"), GD.soundMute())
                },
                GD.OptionPopup.prototype.setBgmBtn = function (t) {
                    GD.isAllSound ? (GD.isBgmSound ? this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_on_0") : this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_off_0"), t && 1 == this.type && (GD.isBgmSound ? GD.bgmPlay() : GD.bgmStop())) : GD.isBgmSound ? this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_on_1") : this.bgmBtn = this.setSpriteTexture(this.bgmBtn, "texture", "option_off_1")
                },
                GD.OptionPopup.prototype.setEffectBtn = function () {
                    GD.isAllSound ? GD.isEffectSound ? this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_on_0") : this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_off_0") : GD.isEffectSound ? this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_on_1") : this.effectBtn = this.setSpriteTexture(this.effectBtn, "texture", "option_off_1")
                },
                GD.OptionPopup.prototype.setInteractive = function (t) {
                    this.allBtn.interactive = t, this.bgmBtn.interactive = t, this.effectBtn.interactive = t, this.tutorialBtn.interactive = t, this.closeBtn.interactive = t
                },
                GD.OptionPopup.prototype.removeChild = function () {
                    this.removeChildren(), this.bg && this.bg.removeChildren(), this.setInteractive(!1)
                }
        },

        function (t, e) {
            GD.ScorePopup = function () {
                PIXI.Container.call(this), this.darkBg = GD.getDarkBg(), this.bg = this.setSpriteTexture(this.allBtn, "texture", "gameOver_box"), this.bg.anchor.set(.5), this.bg.x = GD.width / 2, this.bg.y = GD.height / 2, this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", "option_close_btn"), this.closeBtn.anchor.set(.5), this.closeBtn.x = 267, this.closeBtn.y = -88, this.setTouchStartAction(this.closeBtn, function () {
                    this.emit("SCORE_POPUP_CLOSE_EVENT")
                }, this), this.bg.addChild(this.closeBtn), this.pointTxt = new gc.NumberText("gameOver_num_", "center", -12), this.pointTxt.y = 8, this.bg.addChild(this.pointTxt)
            },
                GD.ScorePopup.constructor = GD.ScorePopup, GD.ScorePopup.prototype = Object.create(PIXI.Container.prototype), GD.ScorePopup.prototype.show = function (t) {
                this.removeChild(), this.pointTxt.setValue(t), this.addChild(this.darkBg), this.addChild(this.bg), this.bg.scale.set(.1), TweenMax.to(this.bg.scale, .15, {
                    x: 1, y: 1, ease: Back.easeOut, onComplete: this.showComplete.bind(this)
                })
            },
                GD.ScorePopup.prototype.showComplete = function () {
                    this.setInteractive(!0)
                },
                GD.ScorePopup.prototype.setInteractive = function (t) {
                    this.closeBtn.interactive = t
                },
                GD.ScorePopup.prototype.removeChild = function () {
                    this.setInteractive(!1), this.removeChildren()
                }
        },

        function (t, e) {
            GD.Util = {
                zeroStr: function (t, e) {
                    for (var i = t.toString(), n = e - i.length; n--;) i = "0" + i;
                    return i
                }, randomNumber: function (t, e) {
                    var i = 10 * e || 1;
                    return Math.floor(Math.random() * t * i / i)
                }, hitTest: function (t, e) {
                    return e.x >= t.x && e.x <= t.x + t.width && e.y >= t.y && e.y <= t.y + t.height
                }, uniqueArray: function (t) {
                    for (var e = [], i = 0, n = t.length; n > i; i++) -1 === e.indexOf(t[i]) && "" !== t[i] && e.push(t[i]);
                    return e
                }, comma: function (t) {
                    return t = String(t), t.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,")
                }, shuffle: function (t) {
                    var e, i, n;
                    for (n = t.length; n; n--) e = Math.floor(Math.random() * n), i = t[n - 1], t[n - 1] = t[e], t[e] = i
                }, grep: function (t, e) {
                    return jQuery.grep(t, function (t) {
                        return t != e
                    })
                }, getParam: function (t) {
                    var e = window.location.search.match(new RegExp("(?:[?&]" + t + "=)([^&]+)"));
                    return e ? e[1] : null
                }, mobileCheck: function () {
                    return !!(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i))
                }, radiansToDegrees: function (t) {
                    return t * Math.PI / 180
                }, degreesToradians: function (t) {
                    return 180 * t / Math.PI
                }
            }
        },

        function (t, e) {
            GD.Achievement = function () {
                PIXI.Container.call(this), this.icons = [], this.idx = 0
            },
                GD.Achievement.constructor = GD.Achievement, GD.Achievement.prototype = Object.create(PIXI.Container.prototype), GD.Achievement.prototype.show = function (t, e) {
                var i = this.setSpriteTexture(null, "texture", "medal_box");
                i.anchor.set(.5), i.scale.set(.3), i.idx = this.idx, i.x = GD.width + 50, e ? i.y = e : i.y = 140, this.icons.length > 0 && (i.y += 100 * this.icons.length), GD.log("game_medal_" + t);
                var n = this.setSpriteTexture(null, "sprite", "game_medal_" + t);
                n.anchor.set(.5), n.y = -30, i.addChild(n), this.addChild(i), this.icons.push(i), setTimeout(function () {
                    TweenMax.to(i, .5, {
                        x: GD.width - 50, ease: Back.easeOut, onComplete: this.iconHide.bind(this),
                        onCompleteParams: [i]
                    })
                }.bind(this), 3), this.idx++
            },
                GD.Achievement.prototype.iconHide = function (t) {
                    TweenMax.to(t, .5, {
                        x: GD.width + 50, delay: 2, ease: Back.easeIn, onComplete: function () {
                            for (var e, i = this.icons.length; i--;) if (e = this.icons[i], e.idx == t.idx) {
                                this.icons.splice(i, 1), this.removeChild(e);
                                break
                            }
                        }.bind(this)
                    })
                },
                GD.Achievement.prototype.removeAll = function () {
                    this.removeChildren()
                }
        },

        function (t, e) {
            GD.GamePadGuide = function () {
                PIXI.Container.call(this), this.guide = this.setSpriteTexture(this.guide, "sprite", "gamePadGuide"), this.setTouchEnd(this.guide, function () {
                    this.setInteractive(!1), this.removeChild(this.guide), this.emit("GAME_PAD_GUIDE_CLOSE_EVENT")
                }.bind(this))
            },
                GD.GamePadGuide.constructor = GD.GamePadGuide, GD.GamePadGuide.prototype = Object.create(PIXI.Container.prototype), GD.GamePadGuide.prototype.init = function () {
                this.removeChild(), this.addChild(this.guide), this.setInteractive(!0)
            },
                GD.GamePadGuide.prototype.setInteractive = function (t) {
                    this.guide.interactive = t
                },
                GD.GamePadGuide.prototype.removeChild = function () {
                    this.removeChildren()
                }
        },

        function (t, e) {
            GD.LoadingView = function () {
                PIXI.Container.call(this), this.darkBg = GD.getDarkBg(), this.img = this.setSpriteTexture(null, "texture", "loadingCircle"), this.img.scale.set(.8), this.img.anchor.set(.5), this.img.x = GD.width / 2, this.img.y = GD.height / 2, this.addChild(this.img)
            },
                GD.LoadingView.constructor = GD.LoadingView, GD.LoadingView.prototype = Object.create(PIXI.Container.prototype), GD.LoadingView.prototype.init = function () {
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

        function (t, e) {

            GD.Progress = function () {
                this.bg = null, this.logo = null, this.logoTxt = null, this.tween = null, PIXI.Container.call(this)
            },
                GD.Progress.constructor = GD.Progress, GD.Progress.prototype = Object.create(PIXI.Container.prototype), GD.Progress.prototype.show = function () {
                if (this.bg || (this.bg = new PIXI.Graphics, this.bg.beginFill(16742144, 1), this.bg.drawRect(0, 0, GD.width, GD.height), this.bg.endFill()), this.addChild(this.bg), !this.logo) {
                    var t = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABsCAYAAACPZlfNAAAGvElEQVR4nO2d/5XaOBDHv6KBpYPQQXwVhFQQUkGcCo6rIL4KlqtgfRUsV8E5FYSrYJ0KQiqY+0Nj1hBsJFuyNMKf93j7lmdg8JcZzeingiCI6A2AFYAMwJIfmeXb1Pw4AjgAOCql/nNmpGdUaAO6YHEyAOvWX58cAFTNX6XUd8+fN4ioBCOiD9DCbKA9KSQ1gD2Ag1Lq78C2nAguGBG9BZDzYxnUmG6O0OLtlVL/hDQkiGAc7nJ+rELYMIIaWrxdrGHTGUT0loieiOgHpcET6QiRFqSFeg57b73yTBMJ5zUkkg59W8TdPrlkB8+h0ptgpDO+EvchVJsjgK2vzNK5YOxVO+jU/J6pAOSuvc2pYHfsVX3kLr1t4eJNiOiBiB6h091ZrHNK0tnkg4s3G+1hnB2VsO/TuzcO0N42qt9ylGDcXh0we5UpRwDZmHZtcEhkz5pDoB1LAPsxNdsgD+MPrDCLNZQjgPWQ8Ggt2CyWMwaJZiXYLJZzrEUzFowTjAryetdjp4YWzSgRMRKMa4gKc+ruiwO0aD9vXWiaJZaYxfJJBn2Pb3LTw4joC4BinD1G1NB9kAfo2N60kxl0b/89/GAKpdSfg19NRO8mGk96NLDlE3kc+LS4J//6soF5N1SsByJ68WwckYFYLZvekCfRIhLshXr6HfvasB38Z4S1UuoP04s5k9p6tCcGVtD3/ipXBSPtlrkfe84obF/AQxUH96ZERU4dobHLwwp/tpyxH/i63KURkVJce/IXwYjoE/zPsgX07Nqbdcc1uGegM2wkwpq1OOOahxX+bQGgC/ExFNClQMoUl0+cCcaKriYyph7zYvbO5BOQSy+79LApb0A99g142vTQdlAKZ5qcBCPdEy+xN2EL3TOSKhm1BjzbHiYyvHBtVoS2wzMnbdqCiZ1HqJT6C2nXZidtFsCpUJY+KJmHNsAjy6aQbjxMrHc13EFttgFeBVuHs6Mf0iPdphRItzZbA8CCe4Zjzg5zMpwWlnhtlhHRwwJxi9VQml6YeG2WLRBxOGyREdHvFtenWputF5CTHRZ9A3ttEq7NllJCIqB/WKXpxYnWZpmT5UYTsuka2OsguQREShvWpjS9UCn1FWnVZmtpHgboIYcvFtcXSCgBkSgYoBMQo4Kaa7PcrznTIVUwwL42q7xZMiGSBbs656GHHAmERsmCAcDOsjYTn4BIF2wJiwKZ562Lrs0WEP4FAGzvqDY7LJBAXIdFqBNemx1TEcy2c7iAzO9dpxASG+6hNqsXSGeEdgm70CixNqtS8jDAvnM4h6zQWC8k7dluSJlobVYrpb43dVgV0hLHrGCRuguqzSrgtXBObQ6EcQLCSKjNKuBVsCqYGf4oTS/k2ix29gALxu1YHdIaD9h2DsfMvln82O5LLMPY4hXjzuHIOTVZqQtmVZtFSnOMCICWYJziVgEM8k3ninwh7NprwS+HV4ppbZkMyV5Wtv85E4yzpWpCY6Yis5y4Ewvl5bZ8IXcRmJqtZW0WA8XlE78IlrCXSUtAimubXobeCWdqNqRPr4idGh0/rquCsZcV/uwJioTabNu1S9Ct3dxqL+aEZYVxNafvxSO7vmMbOwVjhcWvfe5gM6TbaoLF+zVuRLbeaW7cxyihJ3sIO9OluMBpo+rSnzkAgM2tDdNuzkvkdValK4siYgmgMukFYW88wO8+XEYH6YTcBr3ZjPkWK/jfsKyEbjtON4y/8wZ6GsHa9+crpT6bXGhz0MADdIyVssRWCsZiAfNRHqGplFLvbV5gNbeeQ8YasmYaxcoBA7Lw+TiqMBgf3XHJoNUr7GkZ0iysfVMqpX4but/x4OVG3DGZId0uLB9YJRjXcHIsMNcpO8whso8t17SjcHaOM72eibly9Z6JUEP3YDiZYe1sBWarXUttUuoYKuhTZZ1Nh3e6ZFYp9VMp9RE6Xb3n1P8I7VXvhyYXXXhZ48zDAyvodu3ehCsBrPqGSMbgrA3rgtu2AukO1TTUcNhWdeFdsAYemi8gZ/c4GyoYDI2IhIg+ENE3p0ekhWXS6XOTedglpKecbaGHLyTWb01iMenKl2CCtSEdLnPIaecG9wWOJQrBGkiPua2hhcsQZ3u3szkG0jVRCXYJvW7RvuZHhnDh8wg9jO8lXTclasG6IF0qLNE/dF84/MhgIfBucJgFGh9bPDMCB0L9IBnTutNgpFjPFP907rQYIZbEdWTyGSDUC1nMBJ5xjKVYcwgMjYVYNvsszvjCMARKW0KbLjfEepxDYGR0CDXXVrFyRaxvs1dFzIVYc20VO63EYq6tJEBETymGwP8BVlcYNPzZTlcAAAAASUVORK5CYII=";
                    this.logo = new PIXI.Sprite.fromImage(t)
                }
                this.logo.x = GD.width / 2, this.logo.y = GD.height / 2, this.logo.anchor.set(.5), this.logo.scale.set(.1), this.logo.rotation = 20, this.addChild(this.logo), this.tween ? this.tween.kill() : this.tween = new TimelineLite, this.tween.to(this.logo, 1, {
                    rotation: 0, ease: Sine.easeOut
                }), this.tween.call(this.showLocoText.bind(this)), TweenMax.to(this.logo.scale, 1, {x: 1, y: 1})
            },
                GD.Progress.prototype.showLocoText = function () {
                    if (!this.logoTxt) {
                        var t = "data:image/png;base64,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";
                        this.logoTxt = new PIXI.Sprite.fromImage(t), this.logoTxt.anchor.set(1), this.logoTxt.scale.set(1), this.logoTxt.y = GD.height / 2 + 45
                    }
                    this.logoTxt.x = GD.width / 2 + 120, this.logoTxt.alpha = 0, this.addChild(this.logoTxt), TweenMax.to(this.logo, .4, {
                        x: GD.width / 2 + 145, ease: Sine.easeOut
                    }), TweenMax.to(this.logoTxt, .4, {
                        x: GD.width / 2 + 80, alpha: 1, ease: Sine.easeOut
                    }), TweenMax.delayedCall(2, this.replay.bind(this))
                },
                GD.Progress.prototype.replay = function () {
                    this.hide(), this.show()
                },
                GD.Progress.prototype.hide = function () {
                    TweenMax.killAll(), this.tween.clear(), this.removeChildren()
                },
                GD.Progress.prototype.updateTransform = function () {
                    PIXI.Container.prototype.updateTransform.call(this)
                }
        },

        function (t, e) {


            GD.Tutorial = function () {
                PIXI.Container.call(this), this.type = 1, this.tutorialImg = null, this.nowPage = 0, this.totalPage = 0, this.contents = [], this.container = new PIXI.Container, this.img = this.setSpriteTexture(this.img, "texture", "temp"), this.prevBtn = this.setSpriteTexture(this.prevBtn, "texture", "temp"), this.prevBtn.anchor.set(.5), this.prevBtn.x = 30, this.prevBtn.y = GD.height / 2, this.setTouchStartAction(this.prevBtn, function () {
                    this.nowPage > 0 && this.initPage(this.nowPage - 1)
                }, this), this.addChild(this.prevBtn), this.nextBtn = this.setSpriteTexture(this.nextBtn, "texture", "temp"), this.nextBtn.anchor.set(.5), this.nextBtn.x = GD.width - 30, this.nextBtn.y = GD.height / 2,
                    this.setTouchStartAction(
                        this.nextBtn,
                        function () {
                            this.nowPage + 1 < this.totalPage && this.initPage(this.nowPage + 1)
                        }, this),

                    this.addChild(this.nextBtn),
                    this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", "temp"), this.closeBtn.anchor.set(.5), this.closeBtn.x = GD.width / 2, this.closeBtn.y = GD.height - 105,
                    this.setTouchStartAction(this.closeBtn), this.setTouchEnd(this.closeBtn, function () {
                    this.emit("TUTORIAL_CLOSE_EVENT")
                }, this), this.addChild(this.closeBtn)
            },
                GD.Tutorial.constructor = GD.Tutorial, GD.Tutorial.prototype = Object.create(PIXI.Container.prototype), GD.Tutorial.prototype.init = function (t, e) {
                this.removeChild(), this.type = 1, this.tutorialImg = e, this.nowPage = 0, this.totalPage = t, this.addChild(this.img), this.addChild(this.closeBtn), this.initPageButton(), this.setTutorialImg(), this.setInteractive(!0), this.setButtons()
            },
                GD.Tutorial.prototype.initContent = function (t, e) {
                    this.removeChild(), this.type = 2, this.nowPage = 0, this.totalPage = t, this.contents = e, this.addChild(this.container), this.addChild(this.closeBtn), this.container.addChild(this.contents[0]), this.setContent(), this.initPageButton(), this.setInteractive(!0), this.setButtons()
                },
                GD.Tutorial.prototype.initPage = function (t, e) {
                    this.nowPage = t, e && (this.closeBtn = this.setSpriteTexture(this.closeBtn, "texture", e)), 1 == this.type ? this.setTutorialImg() : this.setContent(), this.setButtons()
                },
                GD.Tutorial.prototype.initPageButton = function () {
                    this.totalPage > 0 && (this.prevBtn = this.setSpriteTexture(this.prevBtn, "texture", "help_prev"), this.nextBtn = this.setSpriteTexture(this.nextBtn, "texture", "help_next"), this.prevBtn.scale.set(1), this.nextBtn.scale.set(1), this.addChild(this.prevBtn), this.addChild(this.nextBtn))
                },
                GD.Tutorial.prototype.setPrevButtonPos = function (t, e) {
                    this.prevBtn.x = t, this.prevBtn.y = e
                },
                GD.Tutorial.prototype.setNextButtonPos = function (t, e) {
                    this.nextBtn.x = t, this.nextBtn.y = e
                },
                GD.Tutorial.prototype.setCloseButtonPos = function (t, e) {
                    this.closeBtn.x = t, this.closeBtn.y = e
                },
                GD.Tutorial.prototype.setTutorialImg = function () {
                    this.img = this.setSpriteTexture(this.img, "texture", this.tutorialImg + (this.nowPage + 1))
                },
                GD.Tutorial.prototype.setContent = function () {
                    this.container.removeChildren();
                    var t = this.contents[this.nowPage];
                    t.init && t.init(), this.container.addChild(t)
                },
                GD.Tutorial.prototype.setButtons = function () {
                    this.totalPage > 0 && (0 == this.nowPage ? (this.prevBtn.alpha = .3, this.nextBtn.alpha = 1, this.prevBtn.interactive = !1, this.nextBtn.interactive = !0) : this.nowPage + 1 == this.totalPage ? (this.prevBtn.alpha = 1, this.nextBtn.alpha = .3, this.prevBtn.interactive = !0, this.nextBtn.interactive = !1) : (this.prevBtn.alpha = 1, this.nextBtn.alpha = 1, this.prevBtn.interactive = !0, this.nextBtn.interactive = !0))
                },
                GD.Tutorial.prototype.setInteractive = function (t) {
                    this.prevBtn.interactive = t, this.nextBtn.interactive = t, this.closeBtn.interactive = t
                },
                GD.Tutorial.prototype.removeChild = function () {
                    this.setInteractive(!1), this.container.removeChildren(), this.removeChildren()
                },
                GD.Tutorial.getInstance = function () {
                    return GD.tutorial || (GD.tutorial = new GD.Tutorial), GD.tutorial
                }
        }


    ]);