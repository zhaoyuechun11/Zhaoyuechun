(function () {

    function onIntro() {
        var sounds = ["sound_bgm_0", "sound_button"];
        "y" == Util.getParam("noSound")
            ? (gc.hideProgress(), gc.isSoundLoad = false, GAME_OUT_EVENT(), SoundLoader.loadSound(sounds))
            : SoundLoader.loadSound(sounds, GAME_OUT_EVENT, this)
    }

    function GAME_OUT_EVENT() {
        gc.stage.removeChildren(),
        gc.intro || (gc.intro = new gc.Intro, gc.intro.on("GAME_START_EVENT", GAME_START_EVENT)),
            gc.intro.init(),
            gc.stage.addChild(gc.intro)
    }

    function GAME_START_EVENT() {
        gc.bgmSoundStop(),
            gc.game
                ? gc.game.init()
                : (gc.game = new gc.Game, gc.game.on("GAME_OUT_EVENT", GAME_OUT_EVENT)),
            gc.stage.addChild(gc.game)
    }

    PIXI.Container.prototype.setTouchStartAction = function (btn, back, i, n) {
        var touchstart = gc.isMobile ? "touchstart" : "pointerdown";
        btn.on(touchstart, function (r) {
            r.stopPropagation(),
            n && !gc.isPlay || (
                gc.effectSoundPlay("sound_button"),
                    gc.buttonAction(btn),
                back && back.call(i, r, btn)
            )
        }.bind(i))
    },

        PIXI.Container.prototype.setTouchStart = function (btn, back, i) {
            var touchstart = gc.isMobile ? "touchstart" : "pointerdown";
            btn.on(touchstart, function (n) {
                n.stopPropagation(), back && back.call(i, n, btn)
            }.bind(i))
        },

        PIXI.Container.prototype.setTouchEnd = function (btn, back, i) {
            var touchstart = gc.isMobile ? "touchend" : "pointerup";
            btn.on(touchstart, function (n) {
                n.stopPropagation(), back && back.call(i, n, btn)
            }.bind(i))
        },
        PIXI.Container.prototype.setTouchMove = function (btn, back, i) {
            var touchstart = gc.isMobile ? "touchmove" : "pointermove";
            btn.on(touchstart, function (n) {
                n.stopPropagation(), back && back.call(i, n, btn)
            }.bind(i))
        },

        gc.init(gc.width, gc.height, 0, 0, 16777215),
        gc.loader = PIXI.loader,
        gc.loader.add("common_game_grade", RES_DIR_COMMON + "common_game_grade.png"),
        gc.loader.add(RES_DIR_COMMON + "orientation.json"),
        gc.loader.add("main_bg1", RES_DIR_PNG + "main_bg1.png"),
        gc.loader.add("main_bg2", RES_DIR_PNG + "main_bg2.png"),
        gc.loader.add("tutorial_1", RES_DIR_PNG + "tutorial_1.png"),
        gc.loader.add("tutorial_2", RES_DIR_PNG + "tutorial_2.png"),
        gc.loader.add("tutorial_3", RES_DIR_PNG + "tutorial_3.png"),
        gc.loader.add("tutorial_4", RES_DIR_PNG + "tutorial_4.png"),
        gc.loader.add("tutorial_5", RES_DIR_PNG + "tutorial_5.png"),
        gc.loader.add("tutorial_6", RES_DIR_PNG + "tutorial_6.png"),
        gc.loader.add("tutorial_7", RES_DIR_PNG + "tutorial_7.png"),
        gc.loader.add("main_popup_keg", RES_DIR_PNG + "main_popup_keg.png"),
        gc.loader.add(RES_DIR_JSON + "intro.json"),
        gc.loader.add(RES_DIR_JSON + "popupButton.json"),
        gc.loader.add(RES_DIR_JSON + "block.json"),
        gc.loader.add(RES_DIR_JSON + "gameOverPopup.json"),
        gc.loader.add("main_popup_coin", RES_DIR_PNG + "main_popup_coin.png"),
        gc.loader.add("main_popup_event", RES_DIR_PNG + "main_popup_event.png"),
        gc.loader.add("main_popup_event2", RES_DIR_PNG + "main_popup_event2.png"),
        gc.loader.add("main_popup_juice", RES_DIR_PNG + "main_popup_juice.png"),
        gc.loader.add("main_popup_notice02", RES_DIR_PNG + "main_popup_notice02.png"),
        gc.loader.add("main_popup_sound", RES_DIR_PNG + "main_popup_sound.png"),
        gc.loader.add("game_bg", RES_DIR_PNG + "game_bg.png"),
        gc.loader.add("ending_bg", RES_DIR_PNG + "ending_bg.png"),
        gc.loader.add("game_tutorial", RES_DIR_PNG + "game_tutorial.png"),
        gc.loader.add(RES_DIR_JSON + "basicEffect1.json"),
        gc.loader.add(RES_DIR_JSON + "basicEffect2.json"),
        gc.loader.add(RES_DIR_JSON + "basicEffect3.json"),
        gc.loader.add(RES_DIR_JSON + "basicEffect4.json"),
        gc.loader.add(RES_DIR_JSON + "basicEffect5.json"),
        gc.loader.add(RES_DIR_JSON + "basicEffect6.json"),
        gc.loader.add(RES_DIR_JSON + "block2.json"),
        gc.loader.add(RES_DIR_JSON + "block3.json"),
        gc.loader.add(RES_DIR_JSON + "block4.json"),
        gc.loader.add(RES_DIR_JSON + "block5.json"),
        gc.loader.add(RES_DIR_JSON + "cup1.json"),
        gc.loader.add(RES_DIR_JSON + "cup2.json"),
        gc.loader.add(RES_DIR_JSON + "cup3.json"),
        gc.loader.add(RES_DIR_JSON + "cup4.json"),
        gc.loader.add(RES_DIR_JSON + "cup5.json"),
        gc.loader.add(RES_DIR_JSON + "cup6.json"),
        gc.loader.add(RES_DIR_JSON + "cup7.json"),
        gc.loader.add(RES_DIR_JSON + "combine1.json"),
        gc.loader.add(RES_DIR_JSON + "combine2.json"),
        gc.loader.add(RES_DIR_JSON + "combine3.json"),
        gc.loader.add(RES_DIR_JSON + "special1_1.json"),
        gc.loader.add(RES_DIR_JSON + "special1_2.json"),
        gc.loader.add(RES_DIR_JSON + "special1_3.json"),
        gc.loader.add(RES_DIR_JSON + "special1_4.json"),
        gc.loader.add(RES_DIR_JSON + "special1_5.json"),
        gc.loader.add(RES_DIR_JSON + "special1_6.json"),
        gc.loader.add(RES_DIR_JSON + "special2_1.json"),
        gc.loader.add(RES_DIR_JSON + "special2_2.json"),
        gc.loader.add(RES_DIR_JSON + "special2_3.json"),
        gc.loader.add(RES_DIR_JSON + "special2_4.json"),
        gc.loader.add(RES_DIR_JSON + "special2_5.json"),
        gc.loader.add(RES_DIR_JSON + "special2_6.json"),
        gc.loader.add(RES_DIR_JSON + "special3_1.json"),
        gc.loader.add(RES_DIR_JSON + "special3_2.json"),
        gc.loader.add(RES_DIR_JSON + "special3_3.json"),
        gc.loader.add(RES_DIR_JSON + "special3_4.json"),
        gc.loader.add(RES_DIR_JSON + "special3_5.json"),
        gc.loader.add(RES_DIR_JSON + "special3_6.json"),
        gc.loader.add(RES_DIR_JSON + "ice.json"),
        gc.loader.add(RES_DIR_JSON + "effect1.json"),
        gc.loader.add(RES_DIR_JSON + "effect2.json"),
        gc.loader.add(RES_DIR_JSON + "effect3.json"),
        gc.loader.add(RES_DIR_JSON + "gameNEffect.json"),
        gc.loader.add(RES_DIR_JSON + "hyperEffect.json"),
        gc.loader.add(RES_DIR_JSON + "iceEffect.json"),
        gc.loader.add(RES_DIR_JSON + "item.json"),
        gc.loader.add(RES_DIR_JSON + "guide.json"),
        gc.loader.add(RES_DIR_JSON + "message.json"),
        gc.loader.add(RES_DIR_JSON + "mission.json"),
        gc.loader.add(RES_DIR_JSON + "missionEffect.json"),
        gc.loader.add(RES_DIR_JSON + "number.json"),
        gc.loader.add(RES_DIR_JSON + "ui.json"),
        gc.loader.add(RES_DIR_JSON + "disturb.json"),
        gc.loader.add(RES_DIR_JSON + "allClear.json"),
        gc.loader.add(RES_DIR_JSON + "theme.json"),
        gc.loader.add(RES_DIR_JSON + "ghost.json"),
        gc.loader.add(RES_DIR_JSON + "coconut.json"),
        gc.loader.add(RES_DIR_JSON + "resultPopup.json"),
        gc.loader.add("game_option_bg", RES_DIR_PNG + "game_option_bg.png"),
        gc.loader.add("game_neworder_bg1", RES_DIR_PNG + "game_neworder_bg1.png"),
        gc.loader.add("game_neworder_bg2", RES_DIR_PNG + "game_neworder_bg2.png"),
        gc.loader.add("game_shuffle", RES_DIR_PNG + "game_shuffle.png"),
        gc.loader.add("game_tutorial_bg", RES_DIR_PNG + "game_tutorial_bg.png"),
        gc.loader.add("game_tutorial_bg2", RES_DIR_PNG + "game_tutorial_bg2.png"),
        gc.loader.add(RES_DIR_JSON + "missionPopup.json"),
        gc.loader.add(RES_DIR_JSON + "missionPopup2.json"),
        gc.loader.add(RES_DIR_JSON + "missionClear.json"),
        gc.loader.add(RES_DIR_JSON + "missionHelp.json"),
        gc.loader.add(RES_DIR_JSON + "2juicy.json"),

        gc.loader.load(
            function (i, n) {
                if ($("#loading").hide(),
                    Util.mobileCheck()) {
                    var userAgent = navigator.userAgent;
                    userAgent.indexOf("Android") >= 0
                    && parseInt(userAgent.match(/Android [\d+\.]{3,5}/)[0].replace("Android ", "")) < 5
                        ? (gc.isSound = false, gc.hideProgress(), GAME_OUT_EVENT())
                        : onIntro()
                }
                else onIntro()
            })
})();