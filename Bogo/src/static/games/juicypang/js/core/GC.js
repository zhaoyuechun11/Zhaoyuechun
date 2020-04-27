var gc = {


    loader: null,
    stats: null,
    width: 720,
    height: 1130,
    isRender: !0,
    isDebug: false,
    isShowLog: false,
    isLocalPlay: false,
    isHumanIP: false,
    isLocalStorage: !0,
    isWebGL: false,
    isMobile: false,
    isOrientationFixed: !0,
    isPlay: false,
    isDrag: false,
    isMove: false,
    isMissionHelp: false,
    isSound: !0,
    isBgmSound: !0,
    isEffectSound: !0,
    isSoundSet: false,
    isUseItem: false,
    isSoundLoad: !0,
    isGameStart: false,
    stage: null,
    intro: null,
    game: null,
    sound: {},
    orientationInterval: null,
    orientationType: null,
    orientationView: null,
    resizeInterval: null,
    state: null,
    itemType: null,
    continueCount: 0,
    resourceLoadIndex: 0,
    LOCAL_VER: 11,
    H_TOTAL: 7,
    V_TOTAL: 7,
    BLOCK_NAME: ["block_default", "block_slice1_", "block_slice2_", "block_default", "block_big", "block_gold"],
    PRICE: [10, 30, 40, 50, 5e3, 100, 6300, 11200, 14700, 500, 1500],
    bgmIndex: 1,
    item1: 3,
    item2: 3,
    item3: 3,
    useItem1: 0,
    useItem2: 0,
    useItem3: 0,
    itemSelectBlocks: [],
    typeTotal: 6,
    item_idx: null,
    levelTotal: 40,
    level: 1,
    score: 0,
    moveCount: 0,
    juicyItem: 0,
    juicyItemTotal: 140,
    missionData: null,
    useItemList: [0, 0, 0],
    addMoveCountList: [5, 6, 7, 8, 8, 12, 15, 17, 18, 6, 23, 15, 17, 20, 24, 30, 10, 18, 10, 35, 31, 25, 33, 41, 7, 38, 45, 30, 37, 27, 40, 10, 45, 14, 24, 12, 35, 20, 44, 0],
    missionList: [
        [4, 4, 4],
        [5, 5, 5],
        [6, 6, 6],
        [7, 7, 7],
        [8, 8, 8],
        [15], [15, 7], [30, 7, 7], [30, 7, 7, 7], [30, 8, 8, 8],
        [1], [20, 20, 20, 1], [15, 15, 15], [43, 1], [43, 10, 1], [43, 10, 10, 1], [30, 30, 30, 2],
        [1], [1, 20, 20], [15, 1], [40, 20, 40, 20], [64, 2], [3, 2], [64, 20, 1, 1], [64, 45, 1, 1],
        [1], [31, 31, 31, 1], [50, 50, 50, 1], [31, 31, 1, 1], [75, 2, 1], [10, 15, 25, 50], [75, 40, 2, 1], [1, 1, 1, 1], [75, 30, 1, 1],
        [1, 1], [20, 20, 20], [1, 1, 1], [75, 4], [2, 2, 1], [6, 1, 1]
    ],
    missionTypeList: [
        [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1],
        [30], [30, 1], [30, 1, 1], [30, 1, 1, 1], [30, 1, 1, 1],
        [10], [1, 1, 1, 10], [1, 1, 1], [30, 10], [30, 1, 10], [30, 1, 1, 10], [1, 1, 1, 10],
        [40], [40, 1, 1], [30, 40], [1, 1, 1, 1], [30, 40], [40, 10], [30, 1, 10, 10], [30, 1, 10, 10],
        [20], [1, 1, 1, 20], [1, 1, 1, 20], [1, 1, 10, 20], [30, 10, 20], [1, 1, 1, 1], [30, 1, 10, 10], [10, 10, 10, 10], [30, 1, 10, 20], [20, 20],
        [1, 1, 1], [10, 10, 10], [30, 10], [40, 10, 10], [40, 20, 20]
    ],

    disturbList: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        10, 10, 10, 10, 10, 0, 0, 0, 0, 0, 0,
        9, 9, 0, 9, 9, 9, 8, 8, 8, 8, 8, 8, 0, 7, 7, 7, 7
    ],
    ghostList: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 50, 48, 46, 44, 42],
    touchPos: null,
    selectBlock: null,
    targetBlock: null,
    init: function (width, height, n, r, backgroundColor) {
        navigator.userAgent.match(/Android 4./) || navigator.userAgent.match(/TG-L800S/) || Util.detectIE()
            ? this.renderer = PIXI.autoDetectRenderer(width, height, {backgroundColor: backgroundColor}, !0)
            : (this.renderer = PIXI.autoDetectRenderer(width, height, {
                backgroundColor: backgroundColor, resolution: 1, clearBeforeRender: false
            }), gc.isWebGL = !0),

            document.body.appendChild(this.renderer.view),

            //本地测试
        location.href.indexOf("192.168") >= 0 && (gc.isLocalPlay = !0),


        Util.mobileCheck() && (gc.isMobile = !0),

            gc.resourceLoadIndex = 0,
            requestAnimationFrame(this.update),
            this.root = new PIXI.Container,
            this.stage = new PIXI.Container,
            this.root.addChild(this.stage),
            gc.progressView = new gc.ProgressView,
            gc.progressView.show(),
            this.stage.addChild(gc.progressView),
            this.resize()
    },

    hideProgress: function () {
        gc.progressView.hide(),
            gc.stage.removeChild(gc.progressView)
    },
    resize: function () {
        if (gc.renderer) {

            var widthToHeight = gc.width / gc.height,
                newWidth = window.innerWidth,
                newHeight = window.innerHeight;
            newWidth / newHeight > widthToHeight
                ? newWidth = newHeight * widthToHeight
                : newHeight = newWidth / widthToHeight,

                gc.renderer.view.style.width = newWidth + "px",
                gc.renderer.view.style.height = newHeight + "px",

            gc.isOrientationFixed
            && gc.isMobile
            && (gc.width < gc.height
                ? window.innerWidth > window.innerHeight
                    ? (
                        gc.renderer.resize(gc.height, gc.width),
                            gc.orientation < 0
                                ? (gc.root.rotation = Math.PI / 2, gc.root.x = gc.height)
                                : (gc.root.rotation = -Math.PI / 2, gc.root.y = gc.width),

                            this.renderer.view.style.width = newHeight / widthToHeight + "px"
                    )
                    : (
                        gc.renderer.resize(gc.width, gc.height),
                            gc.root.rotation = 0,
                            gc.root.x = 0,
                            gc.root.y = 0
                    )
                : window.innerWidth < window.innerHeight
                    ? (
                        gc.renderer.resize(gc.height, gc.width),
                            gc.orientation < 0
                                ? (gc.root.rotation = Math.PI / 2, gc.root.x = gc.height)
                                : (gc.root.rotation = -Math.PI / 2, gc.root.y = gc.width),

                            this.renderer.view.style.height = widthToHeight * newWidth + "px"
                    )

                    : (
                        gc.renderer.resize(gc.width, gc.height),
                            gc.root.rotation = 0,
                            gc.root.x = 0,
                            gc.root.y = 0)),

                gc.renderer.view.style.margin = "auto",
                gc.renderer.view.style.position = "absolute",
                gc.renderer.view.style.top = 0,
                gc.renderer.view.style.bottom = 0,
                gc.renderer.view.style.right = 0,
                gc.renderer.view.style.left = 0,
                gc.renderer.view.style.backgroundColor = "#132957"
        }
        setTimeout(gc.setOrientationGuide, 100)
    },
    render: function () {
        gc.renderer.render(gc.root)
    },
    stopRender: function () {
        gc.isRender = false,
            cancelAnimationFrame(gc.requestID)
    },
    startRender: function () {
        gc.isRender = !0,
            gc.update()
    },
    requestID: null,

    update: function () {
        gc.isRender && (gc.requestID = requestAnimationFrame(gc.update)),
            gc.render()
    },
    soundPlay: function (t, vol, loop) {
        gc.isSound && gc.sound[t] && (loop && gc.sound[t].loop(!0), vol && gc.sound[t].volume(vol),
            gc.sound[t].pause(),
            gc.sound[t].play())
    },
    bgmSoundPlay: function (t) {
        if (gc.isSound && gc.isBgmSound) {
            t || (t = 0);
            var sound = gc.sound["sound_bgm_" + t];
            sound && (0 == t && sound.loop(!0), sound.volume(.2), sound.pause(), sound.play())
        }
    },
    bgmSoundStop: function (t) {
        t || (t = 0),
        gc.isSound && gc.sound["sound_bgm_" + t] && gc.sound["sound_bgm_" + t].pause()
    },
    effectSoundPlay: function (name, vol, loop) {
        gc.isSound
        && gc.isEffectSound
        && gc.sound[name]
        && (
            loop && gc.sound[name].loop(!0),
            vol && gc.sound[name].volume(vol),
                gc.sound[name].play()
        )
    },
    effectAllStop: function () {
        for (var t in gc.sound) t.indexOf("sound_bgm") < 0 && gc.sound[t].stop()
    },
    soundStop: function (t) {
        gc.isSound && gc.sound[t] && gc.sound[t].stop()
    },
    soundAllStop: function () {
        for (var t in gc.sound) gc.sound[t] && gc.sound[t].stop()
    },
    soundMute: function () {
        for (var t in gc.sound) gc.sound[t] && gc.sound[t].mute(!0)
    },
    soundUnMute: function () {
        for (var t in gc.sound) gc.sound[t] && gc.sound[t].mute(false)
    },
    showLoading: function () {
        gc.isLoading = !0,
        gc.loadingView || (gc.loadingView = new gc.LoadingView),
            gc.loadingView.show(),
            gc.root.addChild(gc.loadingView)
    },
    hideLoading: function () {
        gc.isLoading = false,
            gc.loadingView.hide(),
            gc.root.removeChild(gc.loadingView)
    },
    buttonAction: function (btn) {
        btn.scale.sx || (btn.scale.sx = btn.scale.x),
        btn.scale.sy || (btn.scale.sy = btn.scale.y);
        var sx = btn.scale.sx,
            sy = btn.scale.sy;
        btn.scale.set(.8 * sx, .8 * sy),
            TweenMax.to(btn.scale, .3, {x: sx, y: sy, ease: Back.easeOut})
    },
    log: function (log) {
        gc.isShowLog
            ? (
                gc.logStr = log + "\n" + gc.logStr,
                gc.logText || (
                    gc.logText = new PIXI.Text("", {
                        fontFamily: "Arial", fontSize: 14, fill: "#F7EDCA", stroke: "#000", strokeThickness: 4,
                        wordWrapWidth: gc.width - 60, wordWrap: !0
                    }),
                        gc.logText.x = 30,
                        gc.logText.y = 30
                ),
                gc.logText.parent || gc.root.addChild(gc.logText),
                    gc.logText.text = gc.logStr) : console.log(log)
    },
    alert: function (t) {
        alert(t)
    },
    requestCloseWindow: function () {
        gc.isMobile && OcbApplicationJS.requestCloseWindow()
    },
    requestConfirmPasswordWindow: function () {
        gc.isConfirmPassword || (gc.isConfirmPassword = !0,
            OcbApplicationJS.requestConfirmPasswordWindow("cashbagPassConfirmResult"))
    },
    deviceStop: function () {
        gc.stopRender(),
            gc.soundMute()
    },
    deviceResume: function () {
        gc.startRender(),
            gc.soundUnMute()
    },
    fullScreen: function () {
        if (gc.isMobile)
            if (isGamePocketReady && GamePocket.Util.isNaverApp()) GamePocket.Util.naverAppFullscreen();
            else {
                if (!navigator.platform.match(/iPhone|iPod|iPad/)) {
                    var view = gc.renderer.view;
                    try {
                        view.requestFullscreen
                            ? view.requestFullscreen() : view.webkitRequestFullScreen
                            ? view.webkitRequestFullScreen() : view.mozRequestFullScreen()
                    } catch (t) {
                        console.log("fullscree fail")
                    }
                }
            }
    },
    exitFullScreen: function () {
        if (gc.isMobile)
            if (GamePocket && GamePocket.Util.isNaverApp()) GamePocket.Util.cancelNaverAppFullscreen();
            else {
                if (!navigator.platform.match(/iPhone|iPod|iPad/))
                    try {
                        document.exitFullscreen
                            ? document.exitFullscreen() : document.msExitFullscreen
                            ? document.msExitFullscreen() : document.mozCancelFullScreen
                                ? document.mozCancelFullScreen() : document.webkitCancelFullScreen
                                && document.webkitCancelFullScreen()
                    }
                    catch (t) {
                        console.log("fullscree cancel fail")
                    }
            }
    },
    setOrientationGuide: function () {
        var rank_layout = document.getElementById("rank_layout");
        if (rank_layout && "none" != rank_layout.style.display && com)
            return gc.renderer.view.style.display = "none",
                void gc.showOrientation(false);

        var p1 = window.innerWidth / window.innerHeight,
            p2 = gc.width / gc.height;
        gc.orientationType = p2 > 1 ? "phone rotate_x" : "phone rotate_y",
            p1 > 1 && 1 > p2 || 1 > p1 && p2 > 1 ? gc.showOrientation(!0) : gc.showOrientation(false),
        gc.isMobile && gc.orientationView && gc.orientationView.init()
    },
    showOrientation: function ($bool) {
        if (!(gc.isOrientationFixed && gc.width > gc.height)) {
            gc.isShowOrientationGuide = $bool;
            for (var list = ["Z300C", "TF701T", "TF700T", "TF103C", "TF101-1B251A", "TA2506 10BK",
                    "SM-T805", "SM-T800", "SM-T677", "SM-T670", "SM-P900", "SMP-605", "SMP-600",
                    "SMART-TV", "SmartTV", "SM-905", "SHW-M480W", "SHW-M380", "SHV-E230", "SGP771",
                    "SGP311", "QM0101", "Q109", "MZ68", "MZ601", "MX1080", "MID 1065-8", "MID 1042-8",
                    "ME102A", "LGV940", "LGV700N", "GT-P5110", "FZ-A1", "AT105", "A10-70", "10QS", "10ES"],
                     i = list.length; i--;) {
                if (navigator.userAgent.match(list[i])) return;
            }

            var orientationGuide, arrowDiv, textDiv, yesText, noText, guideText;
            if (gc.isMobile) {
                var len = document.getElementsByClassName("xy_wrap").length;
                if ($bool) {
                    var message;
                    if (null == (orientationGuide = gc.orientationGuide))
                        (orientationGuide = document.createElement("div")).style.backgroundColor = "#ff7e17",
                            orientationGuide.style.position = "absolute",
                            orientationGuide.style.left = 0,
                            orientationGuide.style.top = 0,
                            orientationGuide.style.right = 0,
                            orientationGuide.style.bottom = 0,
                            orientationGuide.style.margin = "auto",
                            orientationGuide.setAttribute("class", "xy_wrap"),

                            gc.orientationGuide = orientationGuide,

                            (arrowDiv = document.createElement("div")).setAttribute("class", "xy_info"),
                            (textDiv = document.createElement("div")).setAttribute("class", gc.orientationType),
                            (yesText = document.createElement("span")).setAttribute("class", "yes"),
                            (noText = document.createElement("span")).setAttribute("class", "no"),
                            orientationGuide.appendChild(arrowDiv),
                            arrowDiv.appendChild(textDiv),
                            arrowDiv.appendChild(yesText),
                            arrowDiv.appendChild(noText),

                            (guideText = document.createElement("p")).style.left = "0px",
                            guideText.style.right = "0px",
                            guideText.style.padding = "15px",
                            guideText.style.lineHeight = "130%",
                            guideText.style.color = "#FFFFFF",
                            guideText.style.position = "absolute",
                            message = window.innerWidth > 480
                                ?  "If the screen does not switch, turn on the auto rotate function."
                                :  "If the screen does not switch,<br>turn on the auto rotate function.",
                            guideText.innerHTML = message,
                            arrowDiv.appendChild(guideText);

                    0 == len && (document.body.appendChild(orientationGuide),
                        gc.orientationChange(!0),
                        gc.renderer.view.style.visibility = "hidden")
                }
                else len > 0 && (document.body.removeChild(gc.orientationGuide),
                    gc.orientationChange(false),
                    gc.renderer.view.style.visibility = "visible")
            }
        }
    },
    orientationChange: function (isStop) {
        isStop ? gc.deviceStop() : gc.deviceResume()
    }

};

document.addEventListener(
    "visibilitychange",
    function () {
        document.hidden ? gc.deviceStop() : gc.deviceResume()
    },
    false),

    window.onresize = function (t) {
        gc.renderer.view.style.width = "0px",
            gc.renderer.view.style.height = "0px",
        gc.resizeInterval && clearTimeout(gc.resizeInterval),
            gc.resizeInterval = setTimeout(function () {
                gc.resize()
            }, 100)
    },

    window.addEventListener(
        "orientationchange",
        function () {
            gc.orientation = window.orientation,
                setTimeout(gc.setOrientationGuide, 100)
        },
        false)