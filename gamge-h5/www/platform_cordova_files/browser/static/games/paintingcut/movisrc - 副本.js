function GetString(e, t) {
    switch (Define.LANGUAGE) {
        case Enum.LANGUAGE.english:
            return void 0 === t ? Define.tbString[e].en.replace(/{E}/gi, "\n") : Define.tbString[e].en.replace("{V}", t.toString()).replace(/{E}/gi, "\n");
        case Enum.LANGUAGE.japan:
            return void 0 === t ? Define.tbString[e].jp.replace(/{E}/gi, "\n") : Define.tbString[e].jp.replace("{V}", t.toString()).replace(/{E}/gi, "\n");
        case Enum.LANGUAGE.korea:
            return void 0 === t ? Define.tbString[e].kr.replace(/{E}/gi, "\n") : Define.tbString[e].kr.replace("{V}", t.toString()).replace(/{E}/gi, "\n")
    }
    return ""
}

function NetworkingWait() {
    0 == proto.gidx && networkManager.networkState == NET_STATE.TEST_SERVER && setGidx(MYGIDX), networkManager.fSaveTimer = 0
}

function NetworkingEnd() {
}

function NetworkManager() {
    this.networkState = NET_STATE.LOCALHOST, this.fSaveTimer = 0, this.fSaveTimeTick = 10, this.iSaveStackMax = 4, this.bAbleConnetingServer = !0, this.saveStack = [], this.forcedSaveStack = [], this.isSaveRankVal = [], this.bHeartUseCalled = !1, this.heartUseStack = [], this.bCalledDataLoading = !1, this.loadDataStack = [], this.cb_ModalOK = null, this.cb_ModalCancel = null, -1 != document.location.href.indexOf("localhost") ? (this.networkState = NET_STATE.LOCALHOST, console.log("localhost")) : this.networkState = NET_STATE.RUN_SERVER;
    var e = function () {
        if (networkManager.bAbleConnetingServer) if (NetworkingWait(), networkManager.bAbleConnetingServer = !1, networkManager.networkState != NET_STATE.RUN_SERVER) StorageManager.prototype.SetStorageData(), networkManager.ForcedSaveData(); else if (1 == loginTF) {
            var e = networkManager.saveStack.pop();
            savecall(e, null, uData.nJewelryCount)
        } else StorageManager.prototype.SetStorageData(), networkManager.ForcedSaveData()
    }, t = function () {
        if (networkManager.bAbleConnetingServer) {
            NetworkingWait(), networkManager.bAbleConnetingServer = !1;
            var e = networkManager.forcedSaveStack.pop(), t = networkManager.isSaveRankVal.pop();
            networkManager.networkState != NET_STATE.RUN_SERVER ? networkManager.SaveDataComplete() : 1 == loginTF ? t ? savecall(e, RANKVAL_DATA_NAME, uData.nJewelryCount) : savecall(e, null, uData.nJewelryCount) : networkManager.SaveDataComplete()
        }
    };
    NetworkManager.prototype.Update = function () {
        networkManager.bAbleConnetingServer && (networkManager.bCalledDataLoading && networkManager.loadDataStack.length > 0 ? (networkManager.bCalledDataLoading = !1, networkManager.LoadData(networkManager.loadDataStack.pop())) : networkManager.bHeartUseCalled && networkManager.heartUseStack.length > 0 ? networkManager.UseHeart([0].use_Heart, networkManager.heartUseStack[0].cb_func) : null != networkManager.forcedSaveStack && networkManager.forcedSaveStack.length > 0 ? t() : (networkManager.bAbleConnetingServer && networkManager.saveStack.length >= 1 && (networkManager.fSaveTimer += deltaTime), networkManager.saveStack.length >= networkManager.iSaveStackMax ? (networkManager.fSaveTimer = 0, e()) : networkManager.fSaveTimer >= networkManager.fSaveTimeTick && (networkManager.fSaveTimer = 0, e())))
    }, NetworkManager.prototype.SaveData = function () {
        networkManager.fSaveTimer = 0, networkManager.bAbleConnetingServer && networkManager.saveStack.push($.extend({}, uData))
    };
    var i = null;
    NetworkManager.prototype.ForcedSaveData = function (e, t) {
        if (void 0 !== e && null != e || (e = !1), i = void 0 !== t && null != t ? t : null, !networkManager.bAbleConnetingServer) return networkManager.forcedSaveStack.push($.extend({}, uData)), void networkManager.isSaveRankVal.push($.extend({}, e));
        NetworkingWait(), networkManager.bAbleConnetingServer = !1, networkManager.fSaveTimer = 0, 0 == servicePos ? networkManager.networkState != NET_STATE.RUN_SERVER ? networkManager.SaveDataComplete() : 1 == loginTF ? e ? savecall(uData, RANKVAL_DATA_NAME, uData.nJewelryCount) : savecall(uData, null, uData.nJewelryCount) : networkManager.SaveDataComplete() : 1 == servicePos && (e ? savecall(uData, RANKVAL_DATA_NAME, uData.nJewelryCount) : savecall(uData, null, uData.nJewelryCount))
    }, NetworkManager.prototype.SaveDataComplete = function (e) {
        networkManager.saveStack.length > 0 && (networkManager.saveStack = []), NetworkingEnd(), networkManager.bAbleConnetingServer = !0, networkManager.networkState != NET_STATE.LOCALHOST && null != e && e.rank, null != i && (i(), i = null)
    };
    var a;
    NetworkManager.prototype.LoadData = function (e) {
        if (!networkManager.bAbleConnetingServer) return networkManager.bCalledDataLoading = !0, void 0 === e && (e = null), void networkManager.loadDataStack.push(e);
        NetworkingWait(), a = void 0 !== e && null != e ? e : null, networkManager.bAbleConnetingServer = !1, 1 == loginTF ? dataLoading() : networkManager.LoadDataComplete()
    }, NetworkManager.prototype.LoadDataComplete = function (e) {
        1 == loginTF && (null != e.save ? ((uData = JSON.parse(e.save)).nStage = 1, StorageManager.prototype.InitStorageData(!1)) : (StorageManager.prototype.SetStorageData(), networkManager.ForcedSaveData())), void 0 !== a && null != a && (a(e), a = null), networkManager.bAbleConnetingServer = !0, NetworkingEnd()
    };
    var o;
    NetworkManager.prototype.UseHeart = function (e, t) {
        if (!networkManager.bAbleConnetingServer) return networkManager.bHeartUseCalled = !0, void networkManager.heartUseStack.push(new HeartUseStackData(e, t));
        NetworkingWait(), networkManager.bAbleConnetingServer = !1, void 0 !== e && null != e || (e = 1), o = void 0 !== t && null != t ? t : null
    }, NetworkManager.prototype.UseHeartComplete = function (e) {
        networkManager.bHeartUseCalled = !1, networkManager.heartUseStack = [], NetworkingEnd(), networkManager.bAbleConnetingServer = !0, networkManager.ForcedSaveData(), void 0 !== o && null != o && (o(), o = null)
    };
    var n;
    NetworkManager.prototype.GetShoplist = function (e, t) {
        networkManager.bAbleConnetingServer && (networkManager.bAbleConnetingServer = !1, NetworkingWait(), void 0 !== e && null != e || (e = ShopType.HEART), networkManager.networkState == NET_STATE.LOCALHOST ? (n = void 0 !== t && null != t ? t : null, networkManager.GetShoppingListComplete()) : (n = void 0 !== t && null != t ? t : null, marketList(e)))
    }, NetworkManager.prototype.GetShoppingListComplete = function (e) {
        networkManager.bAbleConnetingServer = !0, NetworkingEnd(), void 0 === e || null == e ? void 0 !== n && null !== n && (n(), n = null) : (shopListData = e, void 0 !== n && null !== n && (n(), n = null))
    }, NetworkManager.prototype.Payment = function (e, t) {
        void 0 !== e && null != e ? networkManager.ForcedSaveData(!1, function () {
            if (void 0 === e || null == e) return !1;
            networkManager.bAbleConnetingServer && (networkManager.bAbleConnetingServer = !1, NetworkingWait(), networkManager.networkState == NET_STATE.LOCALHOST ? (a = void 0 !== t && null != t ? t : null, networkManager.GetShoppingListComplete()) : (a = void 0 !== t && null != t ? t : null, mkPayment(e)))
        }) : alert("구매 인덱스 에러\n버전" + VERSION)
    };
    var s;
    NetworkManager.prototype.GetServerTime = function (e) {
        s = void 0 !== e && null != e ? e : null, networkManager.networkState != NET_STATE.LOCALHOST ? getTimestamp() : networkManager.GetServerTimeComplete()
    }, NetworkManager.prototype.GetServerTimeComplete = function (e) {
        var t = null;
        void 0 !== e && null != e && (t = e.Timestamp), void 0 !== s && null != s && (s(t), s = null)
    };
    var l;
    NetworkManager.prototype.GetGameInfo = function (e) {
        l = e, networkManager.networkState != NET_STATE.LOCALHOST ? baseinfoCall() : networkManager.GetGameInfoComplete()
    }, NetworkManager.prototype.GetGameInfoComplete = function (e) {
        void 0 !== l && (l(e), l = void 0)
    }, NetworkManager.prototype.JoinMember = function () {
        networkManager.networkState == NET_STATE.RUN_SERVER && 0 == loginTF && networkManager.ForcedSaveData(!1, function () {
            memberCall()
        })
    }, NetworkManager.prototype.JumpGooglePlay = function () {
        googleplaypopCall()
    }, NetworkManager.prototype.ModalCall = function (e, t, i, a) {
        switch (ShowPopup(!1), b_okTF = !1, e) {
            case MODAL_BUTTON_TYPE.OKONLY:
                b_okTF = !1;
                break;
            case MODAL_BUTTON_TYPE.OKCANCEL:
                b_okTF = !0
        }
        networkManager.cb_ModalOK = i, networkManager.cb_ModalCancel = a, msgModalSET(t, b_okTF)
    }
}

function HeartUseStackData(e, t) {
    this.use_Heart = 0, this.cb_func = null, void 0 !== e && null != e && (this.use_Heart = e), void 0 !== t && null != t && (this.cb_func = t)
}

function ShopListData() {
    this.mkidx = 0, this.mtype = "", this.pType = "", this.Quantity = 0, this.Price = 0, this.icon = ""
}

function MoviGame() {
    var e = Array.prototype.slice.call(arguments), t = e.pop(), i = e[0] && "string" == typeof e[0] ? e : e[0];
    if (!(this instanceof MoviGame)) return new MoviGame(i, t);
    if (!i || "*" === i || "*" === i[0]) {
        i = [];
        for (var a in MoviGame.Modules) MoviGame.modules.hasOwnProperty(a) && i.push(a)
    }
    for (var a = 0, o = i.length; a < o; a += 1) MoviGame.modules[i[a]](this);
    t(this), this.state = Enum.MOVI_STATE.PreLoader, this.game = null, this.resourcesManager = null, this.MGButton = null, this.version = Define.VERSION, this.storage = null, this._sound = null, this._bgm = null, this.firstPortrait = !1, this.firstLandScape = !1, this.callReSize = null, this.gameSheetsData = null
}

function Data() {
    this.nVer = 0, this.isBGM = !1, this.isSfx = !1, this.nStage = 0, this.nBestScore = 0, this.nBestCompleteArea = 0, this.nJewelryCount = 0, this.nJewelryCoolTime0 = 0, this.nJewelryCoolTime1 = 0, this.nJewelryCoolTime2 = 0, this.nJewelryCoolTime3 = 0, this.iHeartChargeMax = 0, this.iHeartInitData = 0, this.fHeartChargeTime = 0, this.iCoinInitDatauData = 0
}

function Boot() {
}

function Preloader() {
    this.ready = !1, this.loadingText = null, this.sprLoad = null
}

function getRandomIntInclusive(e, t) {
    return Math.floor(Math.random() * (t - e + 1)) + e
}

function Game() {
}

function FigureObject(e) {
    this.figurePoints = e, this.walls = MG.game.add.group(), this.walls.enableBody = !0, this.wallLineAdd = 2
}

function AreaBar(e) {
    this.bg, this.warningBG, this.barOption, this.bar, this.bar_cover, this.barBG, this.timerText, this.totalTimer = e, this.paintedArea, this.time_top_icon_spine, this.oops_time_broken_spine, this.isHurryUp = !1
}

function ScreenOutline_Animation(e) {
    this.aniSpeed = e, this.top_sprite_data = [], this.down_sprite_data = [], this.left_sprite_data = [], this.right_sprite_data = [], this.iter = 0, this.anim_event
}

function BallClass() {
}

function NormalBall() {
    this.mySpeed = MG.gameSheetsData.NormalBallSpeed, this.kill_animation = ["basic_ball_bomb_spring", "basic_ball_bomb_summer", "basic_ball_bomb_autumn", "basic_ball_bomb_winter"], this.isActive = !1, this.myVelocity = new Phaser.Point, this.myBall, this.mySpine, this.speedEvent, this.blinkEvent, this.shakeEvent, this.savePosition = {
        x: 0, y: 0
    }
}

function BuffBall() {
    this.index = 0, this.mySpeed = MG.gameSheetsData.BuffBallSpeed, this.isActive = !1, this.myVelocity = new Phaser.Point, this.buffType = "", this.myBall, this.mySpine, this.speedEvent, this.blinkEvent, this.shakeEvent, this.savePosition = {
        x: 0, y: 0
    }
}

function BombBall() {
    this.index = 0, this.mySpeed = MG.gameSheetsData.BombBallSpeed, this.isActive = !1, this.myVelocity = new Phaser.Point, this.myBall, this.mySpine, this.speedEvent, this.moveDir, this.blinkEvent, this.shakeEvent, this.savePosition = {
        x: 0, y: 0
    }
}

function FastBall() {
    this.mySpeed = MG.gameSheetsData.FastBallSpeed, this.kill_animation = ["fast_ball_bomb_spring", "fast_ball_bomb_summer", "fast_ball_bomb_autumn", "fast_ball_bomb_winter"], this.isActive = !1, this.myVelocity = new Phaser.Point, this.myBall, this.mySpine, this.speedEvent, this.blinkEvent, this.shakeEvent, this.savePosition = {
        x: 0, y: 0
    }
}

function SlowBall() {
    this.mySpeed = MG.gameSheetsData.SlowBallSpeed, this.kill_animation = ["slow_ball_bomb_spring", "slow_ball_bomb_summer", "slow_ball_bomb_autumn", "slow_ball_bomb_winter"], this.isActive = !1, this.myVelocity = new Phaser.Point, this.myBall, this.mySpine, this.speedEvent, this.blinkEvent, this.shakeEvent, this.savePosition = {
        x: 0, y: 0
    }
}

function SplitBall() {
    this.mySpeed = MG.gameSheetsData.SplitBallSpeed, this.kill_animation = ["split_ball_bomb_spring", "split_ball_bomb_summer", "split_ball_bomb_autumn", "split_ball_bomb_winter"], this.isActive = !1, this.myVelocity = new Phaser.Point, this.myBall, this.mySpine, this.speedEvent, this.splitCount = 0, this.blinkEvent, this.shakeEvent, this.savePosition = {
        x: 0, y: 0
    }
}

function BlinkBall() {
    this.mySpeed = MG.gameSheetsData.BlinkBallSpeed, this.kill_animation = ["blink_ball_bomb_spring", "blink_ball_bomb_summer", "blink_ball_bomb_autumn", "blink_ball_bomb_winter"], this.isActive = !1, this.myVelocity = new Phaser.Point, this.myBall, this.mySpine, this.skillEvent, this.speedEvent, this.isVisible, this.blinkEvent, this.shakeEvent, this.savePosition = {
        x: 0, y: 0
    }
}

function UI_Title() {
    this.uiGroup = MG.game.add.group(), this.fullScreen_touchButton = MG.game.add.image(MG.game.world.centerX, 0, "blank"), this.startButton = MG.game.add.image(MG.game.world.centerX, MG.game.world.height - 170, "blank"), this.grade_all = MG.game.add.image(MG.game.world.width - 10, 10, "atlas_UI", "grade_all.png"), this.soundButton_ON = MG.game.add.image(MG.game.world.centerX, MG.game.world.height + 100, "atlas_UI", "btn_sound_on.png"), this.soundButton_OFF = MG.game.add.image(MG.game.world.centerX, MG.game.world.height + 100, "atlas_UI", "btn_sound_off.png"), this.Load_TitleScene(), this.VisibleWindow(!1)
}

function UI_UserItem() {
    this.isTimeUse = !1, this.isSlowUse = !1, this.isLifeUse = !1, this.userItemWindowGroup = MG.game.add.group(), this.time_slot_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "item_slot"), this.slow_slot_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "item_slot"), this.shield_slot_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "item_slot"), this.gradationBG = MG.game.add.image(0, 0, "atlas_UI", "ready_bg.png"), this.bestScoreTitle_Text = MG.game.add.bitmapText(MG.game.world.centerX, 190, "uiFont", "Bitmap Fonts!", 30), this.bestScoreCount_Text = MG.game.add.bitmapText(MG.game.world.centerX, 280, "uiFont", "Bitmap Fonts!", 35), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "best.png", x: MG.game.world.centerX, y: 280, w: 556, h: 88,
        off_l: 40, off_r: 40, off_t: 0, off_b: 0
    }, this.mainWindowOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 606, h: 539, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.playButtonOption = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_main_yellow.png", x: MG.game.world.centerX,
        y: MG.game.world.height - 250, w: 550, h: 98, off_l: 43, off_r: 43, off_t: 0, off_b: 0
    }, this.stageJumpButtonOption = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_main_green.png", x: MG.game.world.centerX,
        y: MG.game.world.height - 100, w: 550, h: 98, off_l: 43, off_r: 43, off_t: 0, off_b: 0
    }, this.time_useJewelryInfoBox_Enable_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_1.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40,
        off_t: 0, off_b: 0
    }, this.time_useJewelryInfoBoxEnableBG = uiManager.createImg9(this.time_useJewelryInfoBox_Enable_Option), this.time_useJewelryInfoBox_Disable_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40,
        off_r: 40, off_t: 0, off_b: 0
    }, this.time_useJewelryInfoBoxDisableBG = uiManager.createImg9(this.time_useJewelryInfoBox_Disable_Option), this.slow_useJewelryInfoBox_Enable_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_1.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40,
        off_t: 0, off_b: 0
    }, this.slow_useJewelryInfoBoxEnableBG = uiManager.createImg9(this.slow_useJewelryInfoBox_Enable_Option), this.slow_useJewelryInfoBox_Disable_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40,
        off_r: 40, off_t: 0, off_b: 0
    }, this.slow_useJewelryInfoBoxDisableBG = uiManager.createImg9(this.slow_useJewelryInfoBox_Disable_Option), this.life_useJewelryInfoBox_Enable_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_1.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40,
        off_t: 0, off_b: 0
    }, this.life_useJewelryInfoBoxEnableBG = uiManager.createImg9(this.life_useJewelryInfoBox_Enable_Option), this.life_useJewelryInfoBox_Disable_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40,
        off_r: 40, off_t: 0, off_b: 0
    }, this.life_useJewelryInfoBoxDisableBG = uiManager.createImg9(this.life_useJewelryInfoBox_Disable_Option), this.horizontalLine = MG.game.add.sprite(0, 0, "atlas_UI", "line_width.png"), this.dialog1Style = {
        font: "23px Arial", fill: "#666666", align: "center", fontWeight: "normal"
    }, this.dialog3Style = {
        font: "23px Arial", fill: "#666666", align: "center", fontWeight: "normal"
    }, this.dialog2Style = {
        font: "30px Arial", fill: "#ffffff", align: "center", fontWeight: "bold"
    }, this.timeUI_Parent = MG.game.add.sprite(0, 0, "blank"), this.slowUI_Parent = MG.game.add.image(0, 0, "blank"), this.lifeUI_Parent = MG.game.add.image(0, 0, "blank"), this.Create_UserItemWindow(), this.VisibleWindow(!1)
}

function UI_UserItem_Display() {
    this.userItemDisplayGroup = MG.game.add.group(), this.TimeItemGroup = MG.game.add.group(), this.SlowItemGroup = MG.game.add.group(), this.LifeItemGroup = MG.game.add.group(), this.timeUI_Parent = MG.game.add.sprite(0, 0, "blank"), this.slowUI_Parent = MG.game.add.image(0, 0, "blank"), this.lifeUI_Parent = MG.game.add.image(0, 0, "blank"), this.isUseTime = !1, this.isUseSlow = !1, this.isUseLife = !1, this.useCount = 0, this.alignXpos = [, , ,], this.dialog1Style = {
        font: "23px Arial", fill: "#ffffff", align: "center", fontWeight: "normal"
    }, this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.text_item_start, this.Create_Window(), this.VisibleWindow(!1)
}

function UI_TopCommon() {
    this.jewelryGroup = MG.game.add.group(), this.commonUIGroup = MG.game.add.group(), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: 0, y: 0, w: 294, h: 87, off_l: 27, off_r: 27,
        off_t: 27, off_b: 27
    }, this.jewelIcon = MG.game.add.image(0, 0, "atlas_UI", "jewel.png"), this.plusJewelButton = MG.game.add.image(0, 0, "atlas_UI", "btn_plus.png"), this.jewelryCountText = MG.game.add.bitmapText(0, 0, "uiFontBlack", "Bitmap Fonts!", 35), this.tutorialButton = MG.game.add.image(MG.game.world.width - 160, 60, "atlas_UI", "btn_tutorial.png"), this.tutorialButton.inputEnabled = !0, this.tutorialButton.events.onInputUp.add(function () {
        uiManager.ViewTutorial()
    }), this.soundButton_ON = MG.game.add.image(MG.game.world.width - 60, -60, "atlas_UI", "btn_sound_on.png"), this.soundButton_OFF = MG.game.add.image(MG.game.world.width - 60, -60, "atlas_UI", "btn_sound_off.png"), this.Create_Common_TopIcons(), this.VisibleWindow(!1)
}

function UI_Pause() {
    this.onClick_close_button = !1, this.pauseWindowGroup = MG.game.add.group(), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 606, h: 402, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.panelBG = uiManager.createImg9(this.panelOption), this.titleText = MG.game.add.bitmapText(MG.game.world.centerX, 480, "uiFont", "Bitmap Fonts!", 80), this.line = MG.game.add.sprite(MG.game.world.centerX, 600, "atlas_UI", "line_width.png"), this.pauseCloseButton = MG.game.add.sprite(0, 0, "atlas_UI", "btn_close.png"), this.pauseHelpButton = MG.game.add.sprite(MG.game.world.centerX - 160, MG.game.world.centerY + 75, "atlas_UI", "btn_pause_tutorial.png"), this.pauseSoundOnButton = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY + 75, "atlas_UI", "btn_pause_sound_on.png"), this.pauseSoundOffButton = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY + 75, "atlas_UI", "btn_pause_sound_off.png"), this.pauseHomeButton = MG.game.add.sprite(MG.game.world.centerX + 160, MG.game.world.centerY + 75, "atlas_UI", "btn_pause_home.png"), MG.game.input.onDown.add(UI_Pause.prototype.PauseInput, this), this.gotoHomeWindowGroup = MG.game.add.group(), this.blackWall_goHome = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.isGoHomePanelBG_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 570, h: 415, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.isGoHomePanelBG = uiManager.createImg9(this.isGoHomePanelBG_Option), this.message_bg_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "message_bg.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY - 65, w: 494, h: 205, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.isBuyPanel_MessageBG = uiManager.createImg9(this.message_bg_Option), this.dialogStyle = {
        font: "32px Arial", fill: "#666666", align: "center", fontWeight: "normal"
    }, this.isGoHome_dialog = MG.game.add.text(0, 0, GetString("Goto_Home"), this.dialogStyle), this.okButton_GoHome_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_98_green.png", x: 0, y: 0, w: 235, h: 98, off_l: 50,
        off_r: 50, off_t: 0, off_b: 0
    }, this.okButton_GoHome = uiManager.createImg9(this.okButton_GoHome_Option), this.noButton_GoHome_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_98_pink.png", x: 0, y: 0, w: 235, h: 98, off_l: 50,
        off_r: 50, off_t: 0, off_b: 0
    }, this.noButton_GoHome = uiManager.createImg9(this.noButton_GoHome_Option), this.Create_Pause_Window(), this.Create_IsGotoHome_Window(), this.VisibleWindow(!1), this.VisibleWindow_IsGoHome(!1)
}

function UI_EndSuccessGame() {
    this.gameOverWindowGroup = MG.game.add.group(), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.months_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY + 20, "months_animation"), this.completeMonthsCounter = 1, this.myScoreText, this.myScoreText2, this.SpineNode_nowScore, this.action_iter = 0, this.rewardCounter = 0, this.bestMonths_counter_event, this.reward_counter_event, this.Start_EndSuccessGameWindow(), this.VisibleWindow(!1)
}

function UI_MonthsJump() {
    this.monthsJumpWindowGroup = MG.game.add.group(), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "popup_open.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY, w: 606, h: 621, off_l: 45, off_r: 45, off_t: 155, off_b: 55
    }, this.panelBG = uiManager.createImg9(this.panelOption), this.titleText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 52), this.pauseCloseButton = MG.game.add.sprite(0, 0, "atlas_UI", "btn_close.png"), this.monthsCountFrameOption = {
        game: MG.game, packname: "atlas_UI", pngname: "jump_bg.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY - 65, w: 313, h: 153, off_l: 20, off_r: 20, off_t: 20, off_b: 20
    }, this.monthsCountFrame = uiManager.createImg9(this.monthsCountFrameOption), this.selectedMonthText = MG.game.add.bitmapText(0, 0, "numberFont_1fbb99", "Bitmap Fonts!", 90), this.leftSelectMonthsButton = MG.game.add.sprite(0, 0, "atlas_UI", "btn_arrow.png"), this.rightSelectMonthsButton = MG.game.add.sprite(0, 0, "atlas_UI", "btn_arrow.png"), this.dialogStyle = {
        font: "26px Arial", fill: "#776e65", align: "center", fontWeight: "normal"
    }, this.useJewelryCountBGOption = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_130_green.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY + 200, w: 303, h: 130, off_l: 65, off_r: 65, off_t: 0, off_b: 0
    }, this.playButton = uiManager.createImg9(this.useJewelryCountBGOption), this.jewelIcon = MG.game.add.image(0, 0, "atlas_UI", "jewel.png"), this.jewelryCountText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 40), this.CreateWindow(), this.VisibleWindow(!1)
}

function UI_MonthsJump_Animation() {
    this.monthsJumpSpineGroup = MG.game.add.group(), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.gradationBG = MG.game.add.image(0, 0, "atlas_UI", "ready_bg.png"), this.levelJump_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "months_animation"), this.bestScoreTitleText, this.bestScoreTitleText2, this.SpineNode_BestMonths, this.SpineNode_BestMonths2, this.scoreTitleText, this.scoreTitleText2, this.bestScoreText, this.bestScoreText2, this.myScoreText, this.myScoreText2, this.completeMonthsCounter = 1, this.CreateWindow(), this.VisibleWindow(!1)
}

function UI_MonthsOpen() {
    this.monthsOpenWindowGroup = MG.game.add.group(), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "popup_open.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY, w: 606, h: 621, off_l: 45, off_r: 45, off_t: 155, off_b: 55
    }, this.panelBG, this.titleText, this.monthsCountFrameOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel_open.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY, w: 364, h: 222, off_l: 30, off_r: 30, off_t: 25, off_b: 40
    }, this.monthsCountFrame, this.selectedMonthText, this.dialogStyle = {
        font: "30px Arial", fill: "#776e65", align: "center", fontWeight: "normal"
    }, this.months_text = this.Get_Months_Open(), this.CreateWindow(), this.VisibleWindow(!1)
}

function UI_Tutorial() {
    this.windowGroup = MG.game.add.group(), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 660, h: 1160, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.panelBG = uiManager.createImg9(this.panelOption), this.titleText = MG.game.add.bitmapText(0, 0, "uiFontBlack", "Bitmap Fonts!", 50), this.pauseCloseButton = MG.game.add.sprite(0, 0, "atlas_UI", "btn_close.png"), this.panel2Option = {
        game: MG.game, packname: "atlas_UI", pngname: "tutorial_bg.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY + 40, w: 594, h: 1017, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.panel2BG = uiManager.createImg9(this.panel2Option);
    var e = 0;
    for (this.DEFAULT_Y = 200, this.tutorialMask = MG.game.add.graphics(0, 0), this.tutorialMask.drawRect(50, 175, 600, 1010), this.contents_data = [], this.bg_data = [], this.text_data = [], this.bg_gap = [], this.content_gap = [], this.text_gap = [], this.contentsGroup = MG.game.add.group(), this.contentsGroup.inputEnableChildren = !0, this.tutorialPanelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: 0, w: 500, h: 505,
        off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.tutorialSmallPanelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: 0, w: 500, h: 370,
        off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.dialogStyle = {
        font: "32px Arial", fill: "#666666", align: "center", fontWeight: "bold"
    }, this.dialog_Red_Style = {
        font: "32px Arial", fill: "#ff6600", align: "center", fontWeight: "bold"
    }, e = 1; e <= 7; e++) {
        if (3 == e || 4 == e) t = uiManager.createImg9(this.tutorialSmallPanelOption); else var t = uiManager.createImg9(this.tutorialPanelOption);
        t.mask = this.tutorialMask, t.position.setTo(MG.game.world.centerX, 0), t.anchor.setTo(.5, 0), t.scale.setTo(1.1, 1.25), 2 == e && t.scale.setTo(1.1, 1.33), 5 != e && 6 != e || t.scale.setTo(1.1, 1.15), 7 == e && t.scale.setTo(1.1, 1.35), this.bg_data.push(t), this.contentsGroup.add(t);
        var i = "tutorial_" + e + ".png", a = this.contentsGroup.create(MG.game.world.centerX, 0, "atlas_tutorial", i);
        a.anchor.setTo(.5, 0), a.scale.setTo(1), a.mask = this.tutorialMask, this.contents_data.push(a), this.contentsGroup.add(a);
        var o = "Tuto_0" + e;
        2 == e && (o = "Tuto_02_1");
        var n = MG.game.add.text(MG.game.world.centerX, 0, GetString(o), this.dialogStyle);
        switch (n.position.setTo(MG.game.world.centerX, 0), n.anchor.setTo(.5, 0), n.scale.setTo(1), n.mask = this.tutorialMask, this.text_data.push(n), this.contentsGroup.add(n), e) {
            case 1:
                this.bg_gap.push(0), this.content_gap.push(25), this.text_gap.push(this.contents_data[e - 1].height + 35);
                break;
            case 2:
                this.bg_gap.push(this.bg_data[e - 2].height + 30), this.content_gap.push(this.bg_data[e - 2].height + 55), this.text_gap.push(this.content_gap[e - 1] + this.contents_data[e - 1].height + 20);
                break;
            case 3:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30), this.content_gap.push(this.bg_gap[e - 1] + 30), this.text_gap.push(this.bg_gap[e - 1] + 320);
                break;
            case 4:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30), this.content_gap.push(this.bg_gap[e - 1] + 30), this.text_gap.push(this.bg_gap[e - 1] + 320);
                break;
            case 5:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30 + this.bg_data[3].height + 30), this.content_gap.push(this.bg_gap[e - 1] + 30), this.text_gap.push(this.bg_gap[e - 1] + 430);
                break;
            case 6:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30 + this.bg_data[3].height + 30 + this.bg_data[4].height + 30), this.content_gap.push(this.bg_gap[e - 1] + 30), this.text_gap.push(this.bg_gap[e - 1] + 430);
                break;
            case 7:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30 + this.bg_data[3].height + 30 + this.bg_data[4].height + 30 + this.bg_data[5].height + 30), this.content_gap.push(this.bg_gap[e - 1] + 30), this.text_gap.push(this.bg_gap[e - 1] + 540)
        }
    }
    this.dialogText_2_2 = MG.game.add.text(0, 45, GetString("Tuto_02_2"), this.dialog_Red_Style), this.dialogText_2_2.anchor.setTo(.5), this.dialogText_2_2.position.setTo(MG.game.world.centerX, 0), this.dialogText_2_2.scale.setTo(1), this.dialogText_2_2.mask = this.tutorialMask, this.contentsGroup.add(this.dialogText_2_2), this.tutorialDrag = MG.game.add.sprite(MG.game.world.centerX, this.DEFAULT_Y, "blank"), this.tutorialDrag.anchor.setTo(.5, 0), this.tutorialDrag.scale.setTo(500, 4500), this.tutorialDrag.inputEnabled = !0, this.tutorialDrag.input.enableDrag(), this.tutorialDrag.input.boundsRect = new Phaser.Rectangle(50, -3100, 600, 7800), this.tutorialDrag.input.setDragLock(!1, !0), this.tutorialDrag.events.onDragUpdate.add(this.onDragUpdate, this), this.contentsGroup.add(this.tutorialDrag), this.Create_Window(), this.windowGroup.visible = !1, this.contentsGroup.visible = !1
}

function UI_Continue() {
    this.bContinue = !1, this.monthsContinueGroup = MG.game.add.group(), this.flyObjectGroup = MG.game.add.group(), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 606, h: 620, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.panelBG = uiManager.createImg9(this.panelOption), this.titleText = MG.game.add.bitmapText(0, 0, "uiFontBlack", "Bitmap Fonts!", 52), this.line = MG.game.add.image(0, 0, "atlas_UI", "line_width.png"), this.pauseCloseButton = MG.game.add.sprite(0, 0, "atlas_UI", "btn_close.png"), this.upIcon = MG.game.add.image(MG.game.world.centerX + 100, MG.game.world.centerY - 70, "atlas_UI", "continue_heart_1.png"), this.flyTimer = MG.game.add.image(MG.game.world.centerX - 100, MG.game.world.centerY - 70, "atlas_UI", "continue_heart_2.png"), this.dialogStyle = {
        font: "26px Arial", fill: "#776e65", align: "center", fontWeight: "normal"
    }, this.useJewelryCountBGOption = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_130_green.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY + 200, w: 303, h: 130, off_l: 65, off_r: 65, off_t: 0, off_b: 0
    }, this.playButton = uiManager.createImg9(this.useJewelryCountBGOption), this.jewelIcon = MG.game.add.image(0, 0, "atlas_UI", "jewel.png"), this.jewelryCountText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 40), this.CreateWindow(), this.VisibleWindow(!1), this.VisibleFlyObjectWindow(!1)
}

function UI_JewelryShop() {
    this.jewelryShopWindowGroup = MG.game.add.group(), this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 632, h: 952, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.panelBG = uiManager.createImg9(this.panelOption), this.titleText = MG.game.add.bitmapText(MG.game.world.centerX, 250, "uiFont", "Bitmap Fonts!", 60), this.moviPointBG = MG.game.add.sprite(MG.game.world.centerX, 330, "atlas_UI", "point.png"), this.moviPoint_Text = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 38), this.plusJewelButton = MG.game.add.image(0, 0, "atlas_UI", "btn_plus.png"), this.itemPanel1Option = {
        game: MG.game, packname: "atlas_UI", pngname: "list_1.png", x: 0, y: 0, w: 564, h: 136, off_l: 27, off_r: 27,
        off_t: 27, off_b: 27
    }, this.itemPanel2Option = {
        game: MG.game, packname: "atlas_UI", pngname: "list_2.png", x: 0, y: 0, w: 564, h: 136, off_l: 27, off_r: 27,
        off_t: 27, off_b: 27
    }, this.itemPanel1BG_1 = uiManager.createImg9(this.itemPanel1Option), this.itemPanel2BG_1 = uiManager.createImg9(this.itemPanel2Option), this.itemPanel1BG_2 = uiManager.createImg9(this.itemPanel1Option), this.itemPanel2BG_2 = uiManager.createImg9(this.itemPanel2Option), this.okButton_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_2.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40,
        off_t: 0, off_b: 0
    }, this.okButton = uiManager.createImg9(this.okButton_Option), this.jewelryIcon_1 = MG.game.add.sprite(0, 0, "atlas_UI", "shop_jewel_1.png"), this.jewelryIcon_2 = MG.game.add.sprite(0, 0, "atlas_UI", "shop_jewel_3.png"), this.jewelryIcon_3 = MG.game.add.sprite(0, 0, "atlas_UI", "shop_jewel_1.png"), this.jewelryIcon_4 = MG.game.add.sprite(0, 0, "atlas_UI", "shop_jewel_2.png"), this.ad_icon_1 = MG.game.add.sprite(0, 0, "atlas_UI", "shop_movie.png"), this.ad_icon_2 = MG.game.add.sprite(0, 0, "atlas_UI", "shop_movie.png"), this.itemPanel1_Text = MG.game.add.bitmapText(0, 0, "numberFont_Shop", "Bitmap Fonts!", 70), this.itemPanel2_Text = MG.game.add.bitmapText(0, 0, "numberFont_Shop", "Bitmap Fonts!", 70), this.itemPanel3_Text = MG.game.add.bitmapText(0, 0, "numberFont_Shop", "Bitmap Fonts!", 70), this.itemPanel4_Text = MG.game.add.bitmapText(0, 0, "numberFont_Shop", "Bitmap Fonts!", 70), this.getJewelry_Button_BG_ON_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_2.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40,
        off_t: 0, off_b: 0
    }, this.getJewelry_Button_BG_OFF_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40,
        off_r: 40, off_t: 0, off_b: 0
    }, this.getJewelry_Button_BG_1 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option), this.getJewelry_Button_BG_2 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option), this.getJewelry_Button_BG_3 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option), this.getJewelry_Button_BG_4 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option), this.getJewelry_Button_BG_1_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option), this.getJewelry_Button_BG_2_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option), this.getJewelry_Button_BG_3_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option), this.getJewelry_Button_BG_4_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option), this.itemPanel_PayCounter_Text_1 = MG.game.add.bitmapText(0, 0, "uiFont", "", 25), this.itemPanel_PayCounter_Text_2 = MG.game.add.bitmapText(0, 0, "uiFont", "", 25), this.itemPanel_PayCounter_Text_3 = MG.game.add.bitmapText(0, 0, "uiFont", "", 25), this.itemPanel_CollTime_Text_1 = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "", 35), this.itemPanel_CollTime_Text_2 = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "", 35), this.itemPanel_CollTime_Text_3 = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "", 35), this.itemPanel_CollTime_Text_4 = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "", 35), this.windowIsBuyGroup = MG.game.add.group(), this.blackWall_IsBuy = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.isBuyPanelBG_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 570, h: 415, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.isBuyPanelBG = uiManager.createImg9(this.isBuyPanelBG_Option), this.message_bg_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "message_bg.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY - 45, w: 494, h: 205, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.isBuyPanel_MessageBG = uiManager.createImg9(this.message_bg_Option), this.dialogStyle = {
        font: "32px Arial", fill: "#666666", align: "center", fontWeight: "normal"
    }, this.OkBuy_dialog = MG.game.add.text(0, 0, "", this.dialogStyle), this.isBuy_dialog = MG.game.add.text(0, 0, GetString("GEM_None"), this.dialogStyle), this.okButton_IsBuy_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_98_green.png", x: 0, y: 0, w: 235, h: 98, off_l: 50,
        off_r: 50, off_t: 0, off_b: 0
    }, this.okButton_IsBuy = uiManager.createImg9(this.okButton_IsBuy_Option), this.noButton_IsBuy_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_98_pink.png", x: 0, y: 0, w: 235, h: 98, off_l: 50,
        off_r: 50, off_t: 0, off_b: 0
    }, this.noButton_IsBuy = uiManager.createImg9(this.noButton_IsBuy_Option), this.windowOkBuyGroup = MG.game.add.group(), this.blackWall_OkBuy = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "blackTexture"), this.OkBuyPanelBG_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 570, h: 415, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.OkBuyPanelBG = uiManager.createImg9(this.OkBuyPanelBG_Option), this.message_bg_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "message_bg.png", x: MG.game.world.centerX,
        y: MG.game.world.centerY - 45, w: 494, h: 205, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.OkBuyPanel_MessageBG = uiManager.createImg9(this.message_bg_Option), this.dialogStyle = {
        font: "32px Arial", fill: "#666666", align: "center", fontWeight: "normal"
    }, this.okButton_OkBuy_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_98_green.png", x: 0, y: 0, w: 235, h: 98, off_l: 50,
        off_r: 50, off_t: 0, off_b: 0
    }, this.okButton_OkBuy = uiManager.createImg9(this.okButton_OkBuy_Option), this.noButton_OkBuy_Option = {
        game: MG.game, packname: "atlas_UI", pngname: "btn_98_pink.png", x: 0, y: 0, w: 235, h: 98, off_l: 50,
        off_r: 50, off_t: 0, off_b: 0
    }, this.noButton_OkBuy = uiManager.createImg9(this.noButton_OkBuy_Option), this.Create_Window(), this.Create_IsBuyWindow(), this.Create_OkBuyWindow(), this.VisibleWindow(!1), this.VisibleIsBuyWindow(!1), this.VisibleOkBuyWindow(!1)
}

Define = function () {
}, Enum = function () {
}, Enum.SERVICE_CODE = {MOVI_KR: 0, MOVI_JP: 1, YAHOO: 2, NAVER: 3}, Enum.MOVI_STATE = {
    PreLoader: 0, Menu: 1, Game: 2
}, Enum.DEVICE_STATE = {PC: 0, IOS: 1, ANDROID: 2}, Enum.LANGUAGE = {
    korea: 0, english: 1, japan: 2
}, Define.LANGUAGE = Enum.LANGUAGE.korea, Define.staticWidth = window.innerWidth, Define.staticHeight = window.innerHeight, Define.GIDX = 24, Define.SAVE_VER = 1, Define.IMG_VER = 1, Define.SND_VER = 1, Define.SPINE_VER = 1, Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR, Define.strGamePath = "", Define.DEVICE = Enum.DEVICE_STATE.PC, Define.LANGUAGE = Enum.LANGUAGE.korea, Define.CURRENT_VERSION = "ver. 0511:1023",
    Define.GOOGLE_SHEETS_DATA = !0,

    Define.GOOGLE_SPREADSHEET_ID = "13ROXLBwfLQFybHL4qu_iGFNk4dXCBBnQA_Sln9p0Sb0",
    Define.SHEET_LOCAL_STRING = 'json: {"debug":false,"AddTimePlus":30,"StageData":[{"Index":0,"NormalBall":0,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":1,"NormalBall":1,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":2,"NormalBall":2,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":3,"NormalBall":3,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":0},{"Index":4,"NormalBall":3,"FastBall":0,"SlowBall":1,"BlinkBall":0,"SplitBall":0},{"Index":5,"NormalBall":3,"FastBall":1,"SlowBall":1,"BlinkBall":0,"SplitBall":0},{"Index":6,"NormalBall":2,"FastBall":1,"SlowBall":2,"BlinkBall":0,"SplitBall":0},{"Index":7,"NormalBall":1,"FastBall":2,"SlowBall":2,"BlinkBall":0,"SplitBall":0},{"Index":8,"NormalBall":2,"FastBall":1,"SlowBall":1,"BlinkBall":1,"SplitBall":0},{"Index":9,"NormalBall":0,"FastBall":0,"SlowBall":0,"BlinkBall":0,"SplitBall":2},{"Index":10,"NormalBall":1,"FastBall":1,"SlowBall":1,"BlinkBall":1,"SplitBall":1}],"RandomStageData":[{"Index":0,"StartNumber":0,"BallTotalCount":5,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":0,"ItemBox_Max":1,"DamageTime":5,"CompleteArea":0.8},{"Index":1,"StartNumber":11,"BallTotalCount":10,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":1,"DamageTime":6,"CompleteArea":0.75},{"Index":2,"StartNumber":21,"BallTotalCount":11,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":1,"DamageTime":7,"CompleteArea":0.7},{"Index":3,"StartNumber":31,"BallTotalCount":12,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":1,"DamageTime":8,"CompleteArea":0.65},{"Index":4,"StartNumber":41,"BallTotalCount":13,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":2,"DamageTime":9,"CompleteArea":0.6},{"Index":5,"StartNumber":51,"BallTotalCount":14,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":1,"ItemBox_Max":2,"DamageTime":10,"CompleteArea":0.55},{"Index":6,"StartNumber":61,"BallTotalCount":15,"Bomb_Min":0,"Bomb_Max":0,"ItemBox_Min":2,"ItemBox_Max":2,"DamageTime":11,"CompleteArea":0.5},{"Index":7,"StartNumber":71,"BallTotalCount":9,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":2,"ItemBox_Max":2,"DamageTime":12,"CompleteArea":0.75},{"Index":8,"StartNumber":81,"BallTotalCount":10,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":2,"ItemBox_Max":3,"DamageTime":13,"CompleteArea":0.7},{"Index":9,"StartNumber":91,"BallTotalCount":11,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":2,"ItemBox_Max":3,"DamageTime":14,"CompleteArea":0.65},{"Index":10,"StartNumber":101,"BallTotalCount":12,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":15,"CompleteArea":0.6},{"Index":11,"StartNumber":111,"BallTotalCount":13,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":16,"CompleteArea":0.55},{"Index":12,"StartNumber":121,"BallTotalCount":14,"Bomb_Min":1,"Bomb_Max":1,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":17,"CompleteArea":0.5},{"Index":13,"StartNumber":131,"BallTotalCount":8,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":18,"CompleteArea":0.75},{"Index":14,"StartNumber":141,"BallTotalCount":9,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":19,"CompleteArea":0.7},{"Index":15,"StartNumber":151,"BallTotalCount":10,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":20,"CompleteArea":0.65},{"Index":16,"StartNumber":161,"BallTotalCount":11,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":21,"CompleteArea":0.6},{"Index":17,"StartNumber":171,"BallTotalCount":12,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":22,"CompleteArea":0.55},{"Index":18,"StartNumber":181,"BallTotalCount":13,"Bomb_Min":2,"Bomb_Max":2,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":23,"CompleteArea":0.5},{"Index":19,"StartNumber":191,"BallTotalCount":7,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":24,"CompleteArea":0.75},{"Index":20,"StartNumber":201,"BallTotalCount":8,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":25,"CompleteArea":0.7},{"Index":21,"StartNumber":211,"BallTotalCount":9,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":26,"CompleteArea":0.65},{"Index":22,"StartNumber":221,"BallTotalCount":10,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":27,"CompleteArea":0.6},{"Index":23,"StartNumber":231,"BallTotalCount":11,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":28,"CompleteArea":0.55},{"Index":24,"StartNumber":241,"BallTotalCount":12,"Bomb_Min":3,"Bomb_Max":3,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":29,"CompleteArea":0.5},{"Index":25,"StartNumber":251,"BallTotalCount":6,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":30,"CompleteArea":0.75},{"Index":26,"StartNumber":261,"BallTotalCount":7,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":31,"CompleteArea":0.7},{"Index":27,"StartNumber":271,"BallTotalCount":8,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":32,"CompleteArea":0.65},{"Index":28,"StartNumber":281,"BallTotalCount":9,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":33,"CompleteArea":0.6},{"Index":29,"StartNumber":291,"BallTotalCount":10,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":34,"CompleteArea":0.55},{"Index":30,"StartNumber":301,"BallTotalCount":11,"Bomb_Min":4,"Bomb_Max":4,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":35,"CompleteArea":0.5},{"Index":31,"StartNumber":311,"BallTotalCount":5,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":36,"CompleteArea":0.75},{"Index":32,"StartNumber":321,"BallTotalCount":6,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":37,"CompleteArea":0.7},{"Index":33,"StartNumber":331,"BallTotalCount":7,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":38,"CompleteArea":0.65},{"Index":34,"StartNumber":341,"BallTotalCount":8,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":39,"CompleteArea":0.6},{"Index":35,"StartNumber":351,"BallTotalCount":9,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":40,"CompleteArea":0.55},{"Index":36,"StartNumber":361,"BallTotalCount":10,"Bomb_Min":5,"Bomb_Max":5,"ItemBox_Min":3,"ItemBox_Max":3,"DamageTime":41,"CompleteArea":0.5}],"MonthsBackground":[{"Index":0,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_2.png","mainBG":"BG_11.png"},{"Index":1,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_2.png","mainBG":"BG_11.png"},{"Index":2,"topBG":"bg_top_02.png","bottomBG":"bg_bottom_02.png","pencil":"pencil_3.png","mainBG":"BG_12.png"},{"Index":3,"topBG":"bg_top_03.png","bottomBG":"bg_bottom_03.png","pencil":"pencil_4.png","mainBG":"BG_13.png"},{"Index":4,"topBG":"bg_top_04.png","bottomBG":"bg_bottom_04.png","pencil":"pencil_5.png","mainBG":"BG_14.png"},{"Index":5,"topBG":"bg_top_05.png","bottomBG":"bg_bottom_05.png","pencil":"pencil_6.png","mainBG":"BG_15.png"},{"Index":6,"topBG":"bg_top_06.png","bottomBG":"bg_bottom_06.png","pencil":"pencil_7.png","mainBG":"BG_16.png"},{"Index":7,"topBG":"bg_top_07.png","bottomBG":"bg_bottom_07.png","pencil":"pencil_8.png","mainBG":"BG_17.png"},{"Index":8,"topBG":"bg_top_08.png","bottomBG":"bg_bottom_08.png","pencil":"pencil_9.png","mainBG":"BG_18.png"},{"Index":9,"topBG":"bg_top_09.png","bottomBG":"bg_bottom_09.png","pencil":"pencil_10.png","mainBG":"BG_19.png"},{"Index":10,"topBG":"bg_top_10.png","bottomBG":"bg_bottom_10.png","pencil":"pencil_11.png","mainBG":"BG_110.png"},{"Index":11,"topBG":"bg_top_11.png","bottomBG":"bg_bottom_11.png","pencil":"pencil_12.png","mainBG":"BG_111.png"},{"Index":12,"topBG":"bg_top_12.png","bottomBG":"bg_bottom_12.png","pencil":"pencil_3.png","mainBG":"BG_112.png"},{"Index":13,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_12.png","mainBG":"BG_21.png"},{"Index":14,"topBG":"bg_top_02.png","bottomBG":"bg_bottom_02.png","pencil":"pencil_10.png","mainBG":"BG_22.png"},{"Index":15,"topBG":"bg_top_03.png","bottomBG":"bg_bottom_03.png","pencil":"pencil_4.png","mainBG":"BG_23.png"},{"Index":16,"topBG":"bg_top_04.png","bottomBG":"bg_bottom_04.png","pencil":"pencil_10.png","mainBG":"BG_24.png"},{"Index":17,"topBG":"bg_top_05.png","bottomBG":"bg_bottom_05.png","pencil":"pencil_7.png","mainBG":"BG_25.png"},{"Index":18,"topBG":"bg_top_06.png","bottomBG":"bg_bottom_06.png","pencil":"pencil_4.png","mainBG":"BG_26.png"},{"Index":19,"topBG":"bg_top_07.png","bottomBG":"bg_bottom_07.png","pencil":"pencil_8.png","mainBG":"BG_27.png"},{"Index":20,"topBG":"bg_top_08.png","bottomBG":"bg_bottom_08.png","pencil":"pencil_9.png","mainBG":"BG_28.png"},{"Index":21,"topBG":"bg_top_09.png","bottomBG":"bg_bottom_09.png","pencil":"pencil_8.png","mainBG":"BG_29.png"},{"Index":22,"topBG":"bg_top_10.png","bottomBG":"bg_bottom_10.png","pencil":"pencil_3.png","mainBG":"BG_210.png"},{"Index":23,"topBG":"bg_top_11.png","bottomBG":"bg_bottom_11.png","pencil":"pencil_7.png","mainBG":"BG_211.png"},{"Index":24,"topBG":"bg_top_12.png","bottomBG":"bg_bottom_12.png","pencil":"pencil_2.png","mainBG":"BG_212.png"},{"Index":25,"topBG":"bg_top_01.png","bottomBG":"bg_bottom_01.png","pencil":"pencil_10.png","mainBG":"BG_31.png"},{"Index":26,"topBG":"bg_top_02.png","bottomBG":"bg_bottom_02.png","pencil":"pencil_12.png","mainBG":"BG_32.png"},{"Index":27,"topBG":"bg_top_03.png","bottomBG":"bg_bottom_03.png","pencil":"pencil_9.png","mainBG":"BG_33.png"},{"Index":28,"topBG":"bg_top_04.png","bottomBG":"bg_bottom_04.png","pencil":"pencil_5.png","mainBG":"BG_34.png"},{"Index":29,"topBG":"bg_top_05.png","bottomBG":"bg_bottom_05.png","pencil":"pencil_6.png","mainBG":"BG_35.png"},{"Index":30,"topBG":"bg_top_06.png","bottomBG":"bg_bottom_06.png","pencil":"pencil_7.png","mainBG":"BG_36.png"},{"Index":31,"topBG":"bg_top_07.png","bottomBG":"bg_bottom_07.png","pencil":"pencil_9.png","mainBG":"BG_37.png"},{"Index":32,"topBG":"bg_top_08.png","bottomBG":"bg_bottom_08.png","pencil":"pencil_3.png","mainBG":"BG_38.png"},{"Index":33,"topBG":"bg_top_09.png","bottomBG":"bg_bottom_09.png","pencil":"pencil_10.png","mainBG":"BG_39.png"},{"Index":34,"topBG":"bg_top_10.png","bottomBG":"bg_bottom_10.png","pencil":"pencil_8.png","mainBG":"BG_310.png"},{"Index":35,"topBG":"bg_top_11.png","bottomBG":"bg_bottom_11.png","pencil":"pencil_9.png","mainBG":"BG_311.png"},{"Index":36,"topBG":"bg_top_12.png","bottomBG":"bg_bottom_12.png","pencil":"pencil_1.png","mainBG":"BG_312.png"}],"CompleteArea":"0.6999","FeverSuccessArea":"1","DefaultTimeCount":60,"OnePercentAddTime":0.25,"DefaultHeartCount":0,"ContinueHeartCount":3,"HurryUPTimeCount":10,"BallMaxCount":10,"NormalBallSpeed":250,"FastBallSpeed":400,"SlowBallSpeed":100,"SplitBallSpeed":125,"BlinkBallSpeed":150,"BombBallSpeed":1000,"BuffBallSpeed":300,"BuffCreation":"random","DefaultJewelryCount":10,"TimeItemPayCount":0.3,"SlowItemPayCount":0.2,"LifeItemPayCount":0.1,"SlowItemSkill":0.8,"LifeItemSkill":3,"Shake_intensity":0.05,"Shake_duration":70,"BombPower":100,"NoShieldDamage":10,"NormalBallPoint":1,"FastBallPoint":1,"SlowBallPoint":0.5,"SplitBallPoint":2,"BlinkBallPoint":1,"FeverJumpStageCount":5,"StopSkillTime":7,"StopSkillBlinkTime":1.5,"SuperRatio":30,"StopRatio":30,"ShieldRatio":15,"TimeUpRatio":15,"FeverRatio":10,"DrawLine_Speed":25,"DrawMask_Speed":30}';

var tbString_json = '{"Item_Description":{"en":"게임에 도움이 되는 아이템을 장착해 보세요","jp":"게임에 도움이 되는 아이템을 장착해 보세요","kr":"게임에 도움이 되는 아이템을 장착해 보세요"},"Passive_Item01_Name":{"en":"TIME","jp":"TIME","kr":"TIME"},"Passive_Item02_Name":{"en":"SLOW","jp":"SLOW","kr":"SLOW"},"Passive_Item03_Name":{"en":"SHIELD","jp":"SHIELD","kr":"SHIELD"},"Passive_Item01_Explanation":{"en":"최대 시간{E}{V}초 추가","jp":"최대 시간{E}{V}초 추가","kr":"최대 시간{E}{V}초 추가"},"Passive_Item02_Explanation":{"en":"방해물 속도{E}{V}% 감소","jp":"방해물 속도{E}{V}% 감소","kr":"방해물 속도{E}{V}% 감소"},"Passive_Item03_Explanation":{"en":"실드{E}{V}개 추가","jp":"실드{E}{V}개 추가","kr":"실드{E}{V}개 추가"},"Release":{"en":"해제","jp":"해제","kr":"해제"},"Stage_Select":{"en":"보석을 사용하여{E}선택한 LEVEL에서 시작하시겠습니까?","jp":"보석을 사용하여{E}선택한 LEVEL에서 시작하시겠습니까?","kr":"보석을 사용하여{E}선택한 LEVEL에서 시작하시겠습니까?"},"Stage_Open":{"en":"지금부터 {V} LEVEL를{E}선택하고 시작할 수 있습니다.","jp":"지금부터 {V} LEVEL를{E}선택하고 시작할 수 있습니다.","kr":"지금부터 {V} LEVEL를{E}선택하고 시작할 수 있습니다."},"Stage_Continue":{"en":"보석을 사용하여{E}시간을 최대로 충전 하시겠습니까?{E}(보너스: 실드 아이템 +{V}개 지급)","jp":"보석을 사용하여{E}시간을 최대로 충전 하시겠습니까?{E}(보너스: 실드 아이템 +{V}개 지급)","kr":"보석을 사용하여{E}시간을 최대로 충전 하시겠습니까?{E}(보너스: 실드 아이템 +{V}개 지급)"},"GEM_Shop":{"en":"보석 상점","jp":"보석 상점","kr":"보석 상점"},"Login":{"en":"로그인","jp":"로그인","kr":"로그인"},"Members":{"en":"회원전용","jp":"회원전용","kr":"회원전용"},"AD":{"en":"AD","jp":"AD","kr":"AD"},"GEM_Get":{"en":"보석을 {V}개를 획득하였습니다.","jp":"보석을 {V}개를 획득하였습니다.","kr":"보석을 {V}개를 획득하였습니다."},"Purchase_Complete":{"en":"구매 완료되었습니다!","jp":"구매 완료되었습니다!","kr":"구매 완료되었습니다!"},"Error":{"en":"네트워크 연결이 원활하지 않습니다.{E}게임을 다시 시작합니다.","jp":"네트워크 연결이 원활하지 않습니다.{E}게임을 다시 시작합니다.","kr":"네트워크 연결이 원활하지 않습니다.{E}게임을 다시 시작합니다."},"YES":{"en":"Yes","jp":"Yes","kr":"Yes"},"NO":{"en":"No","jp":"No","kr":"No"},"Connection_Error":{"en":"네트워크 연결이 원활하지 않습니다.{E}재시도 하시겠습니까?","jp":"네트워크 연결이 원활하지 않습니다.{E}재시도 하시겠습니까?","kr":"네트워크 연결이 원활하지 않습니다.{E}재시도 하시겠습니까?"},"GEM_None":{"en":"보석이 모자랍니다.{E}충전하시겠습니까?","jp":"보석이 모자랍니다.{E}충전하시겠습니까?","kr":"보석이 모자랍니다.{E}충전하시겠습니까?"},"Tuto_01":{"en":"가로나 세로로 밀면{E}경계선이 그어져요.","jp":"가로나 세로로 밀면{E}경계선이 그어져요.","kr":"가로나 세로로 밀면{E}경계선이 그어져요."},"Tuto_02_1":{"en":"끝까지 그어지면","jp":"끝까지 그어지면","kr":"끝까지 그어지면"},"Tuto_02_2":{"en":"방해물이 없는 화면에 다른색이 칠해져요!","jp":"방해물이 없는 화면에 다른색이 칠해져요!","kr":"방해물이 없는 화면에{E}다른색이 칠해져요!"},"Tuto_03":{"en":"미션의 범위만큼{E}화면이 색칠되면 임무완수!{E}다음 레벨로 넘어가죠~","jp":"미션의 범위만큼{E}화면이 색칠되면 임무완수!{E}다음 레벨로 넘어가죠~","kr":"미션의 범위만큼{E}화면이 색칠되면 임무완수!{E}다음 레벨로 넘어가죠~"},"Tuto_04":{"en":"조심!!{E}경계선이 그어질때 방해물과{E}부딪히면 시간이 줄어들어요!","jp":"조심!!{E}경계선이 그어질때 방해물과{E}부딪히면 시간이 줄어들어요!","kr":"조심!!{E}경계선이 그어질때 방해물과{E}부딪히면 시간이 줄어들어요!"},"Tuto_05":{"en":"시간이 모두 소진되면{E}게임이 끝나요.","jp":"시간이 모두 소진되면{E}게임이 끝나요.","kr":"시간이 모두 소진되면{E}게임이 끝나요."},"Tuto_06":{"en":"돌아다니는 아이템상자는{E}색칠되는 화면안에{E}있어야만 얻을 수 있어요.","jp":"돌아다니는 아이템상자는{E}색칠되는 화면안에{E}있어야만 얻을 수 있어요.","kr":"돌아다니는 아이템상자는{E}색칠되는 화면안에{E}있어야만 얻을 수 있어요."},"Tuto_07":{"en":"봄여름가을겨울 사계절을{E}만끽하며 최대한{E}높은 레벨에 도전해보세요!","jp":"봄여름가을겨울 사계절을{E}만끽하며 최대한{E}높은 레벨에 도전해보세요!","kr":"봄여름가을겨울 사계절을{E}만끽하며 최대한{E}높은 레벨에 도전해보세요!"},"SUPER":{"en":"라인이 1회 무적으로 그어집니다!","jp":"라인이 1회 무적으로 그어집니다!","kr":"라인이 1회 무적으로 그어집니다!"},"STOP":{"en":"방해물이 {V}초 정지 합니다!","jp":"방해물이 {V}초 정지 합니다!","kr":"방해물이 {V}초 정지 합니다!"},"Goto_Home":{"en":"게임을 포기하시겠습니까?","jp":"게임을 포기하시겠습니까?","kr":"게임을 포기하시겠습니까?"},"MustTuto_01":{"en":"가로나 세로로 밀면{E}경계선이 그어져요.{E}{E}손가락이 움직이는 곳을{E}똑같이 그어보세요!","jp":"가로나 세로로 밀면{E}경계선이 그어져요.{E}{E}손가락이 움직이는 곳을{E}똑같이 그어보세요!","kr":"가로나 세로로 밀면{E}경계선이 그어져요.{E}{E}손가락이 움직이는 곳을{E}똑같이 그어보세요!"},"MustTuto_02":{"en":"좋아요! 잘했어요!!{E}{E}방해물과 부딪히지 않고{E}끝까지 그어지면 화면이 나뉘어요!","jp":"좋아요! 잘했어요!!{E}{E}방해물과 부딪히지 않고{E}끝까지 그어지면 화면이 나뉘어요!","kr":"좋아요! 잘했어요!!{E}{E}방해물과 부딪히지 않고{E}끝까지 그어지면 화면이 나뉘어요!"},"MustTuto_03":{"en":"나누어진 화면 중{E}방해물이 없는 화면은{E}다른 색이 칠해집니다!","jp":"나누어진 화면 중{E}방해물이 없는 화면은{E}다른 색이 칠해집니다!","kr":"나누어진 화면 중{E}방해물이 없는 화면은{E}다른 색이 칠해집니다!"},"MustTuto_04":{"en":"미션의 범위만큼{E}화면이 색칠되면 임무완수!{E}{E}남은 영역을 색칠해{E}다음 레벨로 넘어가죠~!","jp":"미션의 범위만큼{E}화면이 색칠되면 임무완수!{E}{E}남은 영역을 색칠해{E}다음 레벨로 넘어가죠~!","kr":"미션의 범위만큼{E}화면이 색칠되면 임무완수!{E}{E}남은 영역을 색칠해{E}다음 레벨로 넘어가죠~!"}}';
Define.tbString = JSON.parse(tbString_json),
    Define.fontStyle = "Arial",
    Define.fontStyleTitle = "Arial",
    Define.LANDSCAPE = !1,
    window.onload = function () {
    var e, t = window[""];
    (e = !0 === Define.LANDSCAPE ? new Phaser.Game(1280, 720, Phaser.CANVAS, "game") : new Phaser.Game(720, 1280, Phaser.CANVAS, "game")).state.add("boot", t.Boot), e.state.add("preloader", t.Preloader), e.state.add("game", t.Game), e.state.start("boot")
}, MGButton = function (e) {
    this.game = e
}, MGButton.prototype = {
    preload: function () {
    }, create: function () {
    }, createAtlas: function (e, t, i, a, o, n, s, l, r, h, p) {
        void 0 === s && (s = o), void 0 === l && (l = o);
        var u = !1, m = this.game.add.button(e, t, a, void 0, this.game, o, s, l);
        return void 0 !== i && (i.x = m.width / 2, i.y = m.height / 2, m.addChild(i)), m.onInputOver.add(function () {
            m.alpha = .9, u = !1, void 0 !== r && r()
        }, this), m.onInputOut.add(function () {
            m.alpha = 1, u = !0, void 0 !== h && h()
        }, this), m.onInputDown.add(function () {
            m.alpha = 1, m.tint = 4261206783, void 0 !== p && p()
        }, this), m.onInputUp.add(function () {
            m.alpha = 1, m.tint = 16777215, !0 !== u && this.game.add.tween(m.scale).from({
                x: 1.1, y: 1.1
            }, 200, Phaser.Easing.Bounce.Out, !0).onComplete.add(function () {
                m.scale.setTo(1), m.alpha = 1, void 0 !== n && n()
            }, this)
        }, this), m
    }, createText: function (e, t, i, a, o, n, s, l, r, h, p, u) {
        var m, g = !1;
        return void 0 === l ? m = this.game.add.button(e, t, n, r, this.game, s, s, s) : ((m = new PhaserNineSlice.NineSlice(this.game, e, t, n, s, i, a, {
            top: l.top, bottom: l.bottom, left: l.left, right: l.right
        })).anchor.setTo(.5, .5), this.game.add.existing(m)), m.inputEnabled = !0, m.input.useHandCursor = !0, void 0 !== o && (o.anchor.set(.5, .5), m.addChild(o)), m.events.onInputOver.add(function () {
            g = !1, m.alpha = .9, void 0 !== h && h()
        }, this), m.events.onInputOut.add(function () {
            g = !0, m.alpha = 1, void 0 !== p && p()
        }, this), m.events.onInputDown.add(function () {
            m.alpha = 1, m.tint = 4261206783, void 0 !== u && u()
        }, this), m.events.onInputUp.add(function () {
            m.alpha = 1, m.tint = 16777215, !0 !== g && this.game.add.tween(m.scale).from({
                x: 1.1, y: 1.1
            }, 200, Phaser.Easing.Bounce.Out, !0).onComplete.add(function () {
                m.scale.setTo(1), m.alpha = 1, void 0 !== r && r()
            }, this)
        }, this), m
    }, over: function () {
    }, out: function () {
    }, down: function () {
    }, up: function () {
    }, update: function () {
    }
}, ResourcesManager = function (e) {
    this.game = e
}, ResourcesManager.prototype = {
    preload: function () {
    }, create: function () {
    }, update: function () {
    }, loader: function (e) {
        var t = e;
        for (var i in t) t[i].forEach(function (e) {
            var t = this.game.load[i];
            t && t.apply(this.game.load, e)
        }, this)
    }
}, ResourcesManager.MoviLoad = {image: [["preloaderLogoMono", "assets/atlas/load/movi_01.png?v=" + Define.IMG_VER], ["preloaderLogoColor", "assets/atlas/load/movi_02.png?v=" + Define.IMG_VER], ["preloaderLogoText", "assets/atlas/load/movi_03.png?v=" + Define.IMG_VER], ["loading_banner", "assets/atlas/load/Loading_banner.png?v=" + Define.IMG_VER]]}, ResourcesManager.Preloader = {
    image: [["lineDot", "assets/atlas/lineDot.png?v=" + Define.IMG_VER], ["lineDot_SuperBuff", "assets/atlas/lineDot_SuperBuff.png?v=" + Define.IMG_VER], ["lineDot90_SuperBuff", "assets/atlas/lineDot90_SuperBuff.png?v=" + Define.IMG_VER], ["touch_ring", "assets/atlas/touch_ring.png?v=" + Define.IMG_VER], ["finger_flick", "assets/atlas/finger_flick.png?v=" + Define.IMG_VER], ["blank", "assets/atlas/blank.png?v=" + Define.IMG_VER], ["wall", "assets/atlas/lineDot.png?v=" + Define.IMG_VER], ["warningBG", "assets/atlas/BG/warningBG.png?v=" + Define.IMG_VER], ["blackTexture", "assets/atlas/BG/BG_black.png?v=" + Define.IMG_VER]],
    atlas: [["atlas_UI", "assets/atlas/ui/ui.png?v=" + Define.IMG_VER, "assets/atlas/ui/ui.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY], ["atlas_BG", "assets/atlas/BG_Atlas.png?v=" + Define.IMG_VER, "assets/atlas/BG_Atlas.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY], ["atlas_topBG", "assets/atlas/top_Atlas.png?v=" + Define.IMG_VER, "assets/atlas/top_Atlas.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY], ["atlas_bottomBG", "assets/atlas/bottom_Atlas.png?v=" + Define.IMG_VER, "assets/atlas/bottom_Atlas.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY], ["atlas_pencil", "assets/atlas/pencil.png?v=" + Define.IMG_VER, "assets/atlas/pencil.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY], ["atlas_tutorial", "assets/atlas/tutorials/tutorial.png?v=" + Define.IMG_VER, "assets/atlas/tutorials/tutorial.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY], ["atlas_bomb", "assets/atlas/bomb.png?v=" + Define.IMG_VER, "assets/atlas/bomb.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY]],
    spine: [["basic_game_animation", "assets/spine/ready_go_clear.json?v=" + Define.IMG_VER], ["fever_text", "assets/spine/fever_text.json?v=" + Define.IMG_VER], ["fever_roller", "assets/spine/fever_roller.json?v=" + Define.IMG_VER], ["title", "assets/spine/title.json?v=" + Define.IMG_VER], ["months_animation", "assets/spine/months_paper.json?v=" + Define.IMG_VER], ["enemy_balls", "assets/spine/enemy_ball.json?v=" + Define.IMG_VER], ["bomb_autumn", "assets/spine/bomb_autumn.json?v=" + Define.IMG_VER], ["bomb_spring", "assets/spine/bomb_spring.json?v=" + Define.IMG_VER], ["bomb_summer", "assets/spine/bomb_summer.json?v=" + Define.IMG_VER], ["bomb_winter", "assets/spine/bomb_winter.json?v=" + Define.IMG_VER], ["item_slot", "assets/spine/item_slot.json?v=" + Define.IMG_VER], ["shield_broken", "assets/spine/shield_broken.json?v=" + Define.IMG_VER], ["shield_broken_ui", "assets/spine/shield_broken_ui.json?v=" + Define.IMG_VER], ["time_top_icon", "assets/spine/time_icon.json?v=" + Define.IMG_VER], ["oops_time_broken", "assets/spine/oops_time_broken.json?v=" + Define.IMG_VER], ["buff_item_info", "assets/spine/item_eff.json?v=" + Define.IMG_VER]],
    audio: [["se_click", ["assets/sound/SE_Click.mp3?v=" + Define.SND_VER, "assets/sound/SE_Click.ogg?v=" + Define.SND_VER]], ["se_clear", ["assets/sound/SE_Clear.mp3?v=" + Define.SND_VER, "assets/sound/SE_Clear.ogg?v=" + Define.SND_VER]], ["se_crash", ["assets/sound/SE_Crash.mp3?v=" + Define.SND_VER, "assets/sound/SE_Clear.ogg?v=" + Define.SND_VER]], ["se_popup_on", ["assets/sound/SE_PopupOn.mp3?v=" + Define.SND_VER, "assets/sound/SE_PopupOn.ogg?v=" + Define.SND_VER]], ["se_popup_off", ["assets/sound/SE_PopupOff.mp3?v=" + Define.SND_VER, "assets/sound/SE_PopupOff.ogg?v=" + Define.SND_VER]], ["se_item_show", ["assets/sound/SE_ItemShow.mp3?v=" + Define.SND_VER, "assets/sound/SE_ItemShow.ogg?v=" + Define.SND_VER]], ["se_item_idle", ["assets/sound/SE_ItemIdle.mp3?v=" + Define.SND_VER, "assets/sound/SE_ItemIdle.ogg?v=" + Define.SND_VER]], ["se_line_super", ["assets/sound/SE_Line_Super.mp3?v=" + Define.SND_VER, "assets/sound/SE_Line_Super.ogg?v=" + Define.SND_VER]], ["se_stop_relent", ["assets/sound/SE_Stop_Relent.mp3?v=" + Define.SND_VER, "assets/sound/SE_Stop_Relent.ogg?v=" + Define.SND_VER]], ["se_shield", ["assets/sound/SE_Shield.mp3?v=" + Define.SND_VER, "assets/sound/SE_Shield.ogg?v=" + Define.SND_VER]], ["se_hurryUp", ["assets/sound/SE_HurryUp.mp3?v=" + Define.SND_VER, "assets/sound/SE_HurryUp.ogg?v=" + Define.SND_VER]], ["se_time_over", ["assets/sound/SE_TimeOver.mp3?v=" + Define.SND_VER, "assets/sound/SE_TimeOver.ogg?v=" + Define.SND_VER]], ["se_tear", ["assets/sound/SE_Tear.mp3?v=" + Define.SND_VER, "assets/sound/SE_Tear.ogg?v=" + Define.SND_VER]], ["se_newRecord", ["assets/sound/SE_NewRecord.mp3?v=" + Define.SND_VER, "assets/sound/SE_NewRecord.ogg?v=" + Define.SND_VER]], ["se_increase", ["assets/sound/SE_Increase.mp3?v=" + Define.SND_VER, "assets/sound/SE_Increase.ogg?v=" + Define.SND_VER]], ["se_fever_play", ["assets/sound/SE_Fever_Play.mp3?v=" + Define.SND_VER, "assets/sound/SE_Fever_Play.ogg?v=" + Define.SND_VER]], ["se_fever_play_01", ["assets/sound/SE_Fever_Play_01.mp3?v=" + Define.SND_VER, "assets/sound/SE_Fever_Play_01.ogg?v=" + Define.SND_VER]], ["se_fever_play_02", ["assets/sound/SE_Fever_Play_02.mp3?v=" + Define.SND_VER, "assets/sound/SE_Fever_Play_02.ogg?v=" + Define.SND_VER]], ["se_fever_ready", ["assets/sound/SE_Fever_Ready.mp3?v=" + Define.SND_VER, "assets/sound/SE_Fever_Ready.ogg?v=" + Define.SND_VER]], ["se_item_get", ["assets/sound/SE_ItemGet.mp3?v=" + Define.SND_VER, "assets/sound/SE_ItemGet.ogg?v=" + Define.SND_VER]], ["se_land_get", ["assets/sound/SE_LandGet.mp3?v=" + Define.SND_VER, "assets/sound/SE_LandGet.ogg?v=" + Define.SND_VER]], ["se_line", ["assets/sound/SE_Line.mp3?v=" + Define.SND_VER, "assets/sound/SE_Line.ogg?v=" + Define.SND_VER]], ["se_start", ["assets/sound/SE_Start.mp3?v=" + Define.SND_VER, "assets/sound/SE_Start.ogg?v=" + Define.SND_VER]], ["se_ready", ["assets/sound/SE_Ready.mp3?v=" + Define.SND_VER, "assets/sound/SE_Ready.ogg?v=" + Define.SND_VER]], ["se_go", ["assets/sound/SE_Go.mp3?v=" + Define.SND_VER, "assets/sound/SE_Go.ogg?v=" + Define.SND_VER]], ["bgm_title", ["assets/sound/BGM_Title.mp3?v=" + Define.SND_VER, "assets/sound/BGM_Title.ogg?v=" + Define.SND_VER], "bgm"], ["bgm_game", ["assets/sound/BGM_Game.mp3?v=" + Define.SND_VER, "assets/sound/BGM_Game.ogg?v=" + Define.SND_VER], "bgm"]],
    bitmapFont: [["uiFont", "assets/atlas/font/font-export.png?v=" + Define.IMG_VER, "assets/atlas/font/font-export.xml?v=" + Define.IMG_VER], ["uiFontBlack", "assets/atlas/font/font-export-black.png?v=" + Define.IMG_VER, "assets/atlas/font/font-export-black.xml?v=" + Define.IMG_VER], ["numberFont_Pink", "assets/atlas/font/font_time-export.png?v=" + Define.IMG_VER, "assets/atlas/font/font_time-export.xml?v=" + Define.IMG_VER], ["numberFont_Shop", "assets/atlas/font/font_shop-export.png?v=" + Define.IMG_VER, "assets/atlas/font/font_shop-export.xml?v=" + Define.IMG_VER], ["numberFont_1fbb99", "assets/atlas/font/font_1fbb99-export.png?v=" + Define.IMG_VER, "assets/atlas/font/font_1fbb99-export.xml?v=" + Define.IMG_VER], ["numberFont_mission", "assets/atlas/font/mission_no-export.png?v=" + Define.IMG_VER, "assets/atlas/font/mission_no-export.xml?v=" + Define.IMG_VER]]
}, ResourcesManager.MenuLoader = {}, ResourcesManager.GameLoader = {}, window[""] = window[""] || {}, window[""].ResourcesManager = ResourcesManager;
var CASH_DATA_NAME = "coin", RANKVAL_DATA_NAME = "RankVal", HEART_COUNT = "life", HEART_TIME = "lifeTime",
    GREAP_POINT = "greappoint", TIME_STAMP = "timeSTAMP", MYGIDX = 24,
    NET_STATE = {LOCALHOST: 100, TEST_SERVER: 200, RUN_SERVER: 400}, ShopType = {HEART: 1, GAMEMONEY: 2},
    MODAL_BUTTON_TYPE = {OKONLY: 1, OKCANCEL: 2}, networkManager = new NetworkManager, sTopContainer = null,
    shopListData = [new ShopListData];
Define.StorageDataKey = ["nVer", "isBGM", "isSfx", "nStage", "nBestScore", "nBestCompleteArea", "nJewelryCount", "iHeartChargeMax", "iHeartInitData", "fHeartChargeTime", "iCoinInitDatauData"], StorageManager = function (e) {
    this.game = e, this.StorageData = {}, this.StorageData.nVer = 0, this.StorageData.isBGM = !0, this.StorageData.isSfx = !0, this.StorageData.nStage = 1, this.StorageData.nBestScore = 0, this.StorageData.nBestCompleteArea = "0", this.StorageData.nJewelryCount = 0, this.iHeartChargeMax = 0, this.iHeartInitData = 0, this.fHeartChargeTime = 0, this.iCoinInitDatauData = 0, this.isLocal = !1
}, StorageManager.prototype = {
    preload: function () {
    }, create: function () {
    }, init: function () {
        this.getDataAllString(), this.loadData()
    }, loadData: function () {
        if (console.log("window.localStorage " + window.localStorage), void 0 !== window.localStorage) for (t = 0; t < Define.StorageDataKey.length; t++) {
            var e = this.get(Define.StorageDataKey[t]);
            void 0 !== e && null !== e && (this.StorageData[Define.StorageDataKey[t]] = e)
        } else {
            console.log("window.Define.StorageDataKey.lengt " + Define.StorageDataKey.lengt);
            for (var t = 0; t < Define.StorageDataKey.length; t++) this.set(Define.StorageDataKey[t], this.StorageData[Define.StorageDataKey[t]])
        }
    }, getDataAllString: function () {
        for (var e = "", t = 0; t < Define.StorageDataKey.length; t++) e += Define.StorageDataKey[t] + (t === Define.StorageDataKey.length - 1 ? "" : ",");
        return e
    }, availability: function () {
        if (void 0 === window.localStorage) return console.log("localStorage not available"), null
    }, get: function (e) {
        this.availability();
        try {
            return JSON.parse(window.localStorage.getItem(e))
        } catch (t) {
            return window.localStorage.getItem(e)
        }
    }, setPut: function (e) {
        this.availability()
    }, set: function (e, t) {
        this.availability();
        try {
            window.localStorage.setItem(e, JSON.stringify(t))
        } catch (e) {
            console.log("e " + e), e == QUOTA_EXCEEDED_ERR && console.log("localStorage quota exceeded")
        }
    }, set_json: function (e, t) {
        var i = JSON.stringify(e);
        (e = {})[key] = value, this.availability(), JSON.parse(i, function (e, t) {
            if ("" === e) return t;
            console.log(e + " = " + t);
            try {
                window.localStorage.setItem(e, JSON.stringify(t))
            } catch (e) {
                console.log("e " + e), e == QUOTA_EXCEEDED_ERR && console.log("localStorage quota exceeded")
            }
        })
    }, remove: function (e) {
        this.availability(), window.localStorage.removeItem(e)
    }, clear: function () {
        this.availability(), window.localStorage.clear()
    }, update: function () {
    }, SetStorageData: function () {
        null == StorageManager.prototype.get("nVer") && (this.InitStorageData(!0), stateManager.onPlayTutorial()), uData.nVer = StorageManager.prototype.get("nVer"), uData.isBGM = StorageManager.prototype.get("isBGM"), uData.isSfx = StorageManager.prototype.get("isSfx"), StorageManager.prototype.set("isBGM", uData.isBGM), StorageManager.prototype.set("isSfx", uData.isSfx), uData.nStage = 1, uData.nBestScore = StorageManager.prototype.get("nBestScore"), uData.nBestCompleteArea = StorageManager.prototype.get("nBestCompleteArea"), null != uData.nBestCompleteArea && void 0 != uData.nBestCompleteArea || (StorageManager.prototype.set("nBestCompleteArea", 0), uData.nBestCompleteArea = 0), uData.nJewelryCount = StorageManager.prototype.get("nJewelryCount"), uData.nJewelryCoolTime0 = StorageManager.prototype.get("nJewelryCoolTime0"), uData.nJewelryCoolTime1 = StorageManager.prototype.get("nJewelryCoolTime1"), uData.nJewelryCoolTime2 = StorageManager.prototype.get("nJewelryCoolTime2"), uData.nJewelryCoolTime3 = StorageManager.prototype.get("nJewelryCoolTime3"), uData.iHeartChargeMax = StorageManager.prototype.get("iHeartChargeMax"), uData.iHeartInitData = StorageManager.prototype.get("iHeartInitData"), uData.fHeartChargeTime = StorageManager.prototype.get("fHeartChargeTime"), uData.iCoinInitDatauData = StorageManager.prototype.get("iCoinInitDatauData")
    }, InitStorageData: function (e) {
        e ? (first_save_data = !0, StorageManager.prototype.set("nVer", 1), StorageManager.prototype.set("isBGM", !0), StorageManager.prototype.set("isSfx", !0), StorageManager.prototype.set("nStage", 1), StorageManager.prototype.set("nBestScore", 0), StorageManager.prototype.set("nBestCompleteArea", 0), StorageManager.prototype.set("nJewelryCount", 0), StorageManager.prototype.set("nJewelryCoolTime0", 0), StorageManager.prototype.set("nJewelryCoolTime1", 0), StorageManager.prototype.set("nJewelryCoolTime2", 0), StorageManager.prototype.set("nJewelryCoolTime3", 0)) : (StorageManager.prototype.set("nVer", uData.nVer), StorageManager.prototype.set("isBGM", !0), StorageManager.prototype.set("isSfx", !0), StorageManager.prototype.set("nStage", 1), StorageManager.prototype.set("nBestScore", uData.nBestScore), StorageManager.prototype.set("nBestCompleteArea", uData.nBestCompleteArea), StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount), StorageManager.prototype.set("nJewelryCoolTime0", uData.nJewelryCoolTime0), StorageManager.prototype.set("nJewelryCoolTime1", uData.nJewelryCoolTime1), StorageManager.prototype.set("nJewelryCoolTime2", uData.nJewelryCoolTime2), StorageManager.prototype.set("nJewelryCoolTime3", uData.nJewelryCoolTime3))
    }
}, MoviGame.prototype = {
    name: "Painting Cut", getName: function () {
        return this.name
    }, getServiceString: function () {
        return Define.SERVICE == Enum.SERVICE_CODE.MOVI_KR ? "movi" : Define.SERVICE == Enum.SERVICE_CODE.YAHOO ? "yahoo" : Define.SERVICE == Enum.SERVICE_CODE.NAVER ? "naver" : "none"
    }, Initialize: function (e) {
        console.log("~~~~~~~~~~~~~~~document.location.href ~~~~~~~~~~~~~~~~~~ " + document.location.href), /Android/i.test(navigator.userAgent) ? Define.DEVICE = Enum.DEVICE_STATE.ANDROID : /iPhone|iPad|iPod/i.test(navigator.userAgent) ? Define.DEVICE = Enum.DEVICE_STATE.IOS : Define.DEVICE = Enum.DEVICE_STATE.PC, document.location.href.indexOf("game.jp") > -1 ? Define.SERVICE = Enum.SERVICE_CODE.MOVI_JP : document.location.href.indexOf("yahoo-net.jp") > -1 ? Define.SERVICE = Enum.SERVICE_CODE.YAHOO : document.location.href.indexOf("naver.com") > -1 ? Define.SERVICE = Enum.SERVICE_CODE.NAVER : Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR, this.game = e;
        var t = [Phaser.Keyboard.SPACEBAR, Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT];
        this.game.input.keyboard.addKeyCapture(t), this.resourcesManager = e.plugins.add(ResourcesManager), this.MGButton = e.plugins.add(MGButton), this.game.plugins.add(PhaserSpine.SpinePlugin), this.storage = e.plugins.add(StorageManager), this.initScreenSize()
    }, initScreenSize: function () {
        var e = this;
        if (this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE, this.firstPortrait = Define.LANDSCAPE, this.firstLandScape = !Define.LANDSCAPE, this.game.device.desktop) this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL, this.game.pageAlignHorizontally = !1, this.game.pageAlignVertically = !1, this.game.scale.parentIsWindow = !0; else {
            var t = !1;
            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE, t = void 0 !== window.orientation ? 0 !== window.orientation : !(Define.staticWidth < Define.staticHeight);
            var i = parseFloat(Define.staticWidth / this.game.width),
                a = parseFloat(Define.staticHeight / this.game.height);
            !0 === t ? (document.getElementById("turn").style.display = !1 === Define.LANDSCAPE ? "block" : "none", this.firstLandScape = !0) : (document.getElementById("turn").style.display = !1 === Define.LANDSCAPE ? "none" : "block", this.firstPortrait = !0), this.game.scale.setUserScale(i, a)
        }
        window.addEventListener("orientationchange", function () {
            e.reScreenSize()
        }), this.game.scale.setResizeCallback(function (e, t) {
        })
    }, callBackReSize: function (e) {
        this.callReSize = function () {
            void 0 !== e && e(this.isLandscape)
        }
    }, reScreenSize: function () {
        var e = !1;
        if (!this.game.device.desktop) {
            e = void 0 !== window.orientation ? 0 !== window.orientation : !(window.innerWidth < window.innerHeight);
            var t = parseFloat(Define.staticWidth / this.game.width),
                i = parseFloat(Define.staticHeight / this.game.height);
            !1 === e ? (document.getElementById("turn").style.display = !1 === Define.LANDSCAPE ? "none" : "block", !1 === this.firstPortrait && location.reload(), !0 === Define.LANDSCAPE ? this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height)) : this.game.scale.setUserScale(t, i)) : (document.getElementById("turn").style.display = !1 === Define.LANDSCAPE ? "block" : "none", !1 === this.firstLandScape && location.reload(), !1 === Define.LANDSCAPE ? this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height)) : this.game.scale.setUserScale(t, i))
        }
        this.game.scale.refresh(), null !== this.callReSize && this.callReSize(e)
    }
}, MoviGame.modules = {
    utils: function (e) {
        e.Init = function () {
        }, e.GetSecondsToTimeString = function (e) {
            var t = Math.floor(e / 60), i = Math.floor(e % 60);
            return (t >= 10 ? t.toString() : "0" + t) + ":" + (i >= 10 ? i.toString() : "0" + i)
        }, e.AddSprite = function (e, t, i, a, o, n, s, l, r, h, p) {
            var u = this.game.add.sprite(t, i, a, o);
            return void 0 != n && (u.tint = 0), void 0 != s && (u.alpha = s), u.anchor.x = void 0 == l ? .5 : l, u.anchor.y = void 0 == r ? .5 : r, void 0 != h && (u.width = h), void 0 != p && (u.height = p), e.addChild(u), u
        }, e.AddSpriteNine = function (e, t, i, a, o, n, s, l, r, h, p) {
            var u = new PhaserNineSlice.NineSlice(MG.game, t, i, a, o, n, s, l);
            return u.anchor.x = void 0 == r ? .5 : r, u.anchor.y = void 0 == h ? .5 : h, void 0 != p && (u.tint = p), e.addChild(u), u
        }, e.AddText = function (e, t, i, a, o, n, s) {
            return (a = MG.game.add.text(t, i, a, o)).anchor.x = void 0 == n ? .5 : n, a.anchor.y = void 0 == s ? .5 : s, e.addChild(a), a
        }, e.textNumberCounting = function (e, t, i, a) {
            var o, n = 0, s = parseInt(a / nFra0meTime), l = t + i;
            e.setText(MG.GetSecondsToTimeString(t)), o = this.game.time.events.loop(10, function () {
                (n += i / s) + t < l ? e.setText((t + n).toLocaleString()) : (e.setText(l.toLocaleString()), this.game.time.events.remove(o))
            }, this)
        }, e.googleSheetsToData = function (e) {
            var t = e.substring(6);
            return console.log(t), JSON.parse(t)
        },

            e.loadGameSheetsData = function (e, t, i) {
            var a = this;
            if (!1 === t) return
                a.gameSheetsData = a.googleSheetsToData(Define.SHEET_LOCAL_STRING),
                    void(void 0 !== i && i());

            var o = "https://spreadsheets.google.com/feeds/list/" + Define.GOOGLE_SPREADSHEET_ID + "/" + e + "/public/basic?alt=json";
            jQuery(function (e) {
                e.ajax({type: "GET", url: o, dataType: "jsonp"}).done(function (e) {
                    var t = JSON.stringify(e), o = JSON.parse(t).feed.entry[0].content.$t;
                    a.gameSheetsData = a.googleSheetsToData(o), void 0 !== i && i(e), console.log(a.gameSheetsData)
                }).fail(function () {
                    a.gameSheetsData = a.googleSheetsToData(Define.SHEET_LOCAL_STRING), void 0 !== i && i(response)
                })
            })
        }
    }, audio: function (e) {
        e.Init = function () {
        }, e.AudioInit = function () {
            this.game.device.android && this.game.device.chrome && this.game.device.chromeVersion >= 55 && (this.game.sound.setTouchLock(), this.game.input.touch.addTouchLockCallback(function () {
                if (this.noAudio || null !== this._unlockSource) return !0;
                if (this.usingWebAudio) {
                    var e = this.context.createBuffer(1, 1, 22050);
                    this._unlockSource = this.context.createBufferSource(), this._unlockSource.buffer = e, this._unlockSource.connect(this.context.destination), void 0 === this._unlockSource.start ? this._unlockSource.noteOn(0) : this._unlockSource.start(0), "suspended" === this._unlockSource.context.state && this._unlockSource.context.resume()
                }
                return !0
            }, this.game.sound, !0)), MG.game.device.desktop ? (this.isSfx = this.storage.StorageData.isSfx, this.isBGM = this.storage.StorageData.isBGM) : (this.isSfx = !1, this.isBGM = !1), MG.game.device.desktop ? (void 0 === this.isSfx && (this.isSfx = !0), void 0 === this.isBGM && (this.isBGM = !0)) : (void 0 === this.isSfx && (this.isSfx = !1), void 0 === this.isBGM && (this.isBGM = !1)), this.storage.set("isSfx", this.isSfx), this.storage.set("isBGM", this.isBGM), this._sound = [], this._bgm = [], ResourcesManager.Preloader.audio.forEach(function (e) {
                "bgm" === e[2] ? this._bgm[e[0]] = this.game.add.audio(e[0], 1, !0) : this._sound[e[0]] = this.game.add.audio(e[0])
            }, this)
        }, e.AudioSwitch = function (e) {
            this.isSfx = !e, this.isBGM = !e, this.storage.set("isSfx", this.isSfx), this.storage.set("isBGM", this.isBGM)
        }, e.PlayAudio = function (e, t) {
            t = t || !1, this.isSfx && this._sound && this._sound[e] && this._sound[e].play("", 0, 1, t)
        }, e.StopAudio = function (e) {
            this._sound[e].stop()
        }, e.PlayBgm = function (e, t) {
            this.isBGM && this._bgm && this._bgm[e] && (void 0 === t && (t = !1), this._bgm[e].play("", 0, 1, t))
        }, e.StopBgm = function (e) {
            this._bgm[e].stop()
        }
    }
}, window[""] = window[""] || {}, window[""].MoviGame = MoviGame;
var MG = MoviGame("utils", "audio", function () {
}), first_save_data = !1, uData = new Data;
Boot.prototype = {
    preload: function () {
        MG.Initialize(this.game), MG.resourcesManager.loader(ResourcesManager.MoviLoad)
    }, create: function () {
        var e = this;
        console.log(" ============================= "), console.log(" Name  :" + MG.getName()), console.log(" GIDX :  " + Define.GIDX), console.log(" service : " + Define.SERVICE + " ( 0:movi, 1:yahoo, 2:naver ) "), console.log(" service : " + MG.getServiceString()), console.log(" ============================= "), this.stage.backgroundColor = $("body").css("background-color"), this.game.time.events.add(100, function () {
            e.game.state.start("preloader")
        }), networkManager.GetGameInfo(function (e) {
            void 0 != e && (uData.iHeartChargeMax = e.baseHeart, uData.iHeartInitData = e.initHeart, uData.fHeartChargeTime = e.Heartrefill, uData.iCoinInitData = e.money_base)
        }), 0 == loginTF ? StorageManager.prototype.SetStorageData() : networkManager.LoadData()
    }
}, window[""] = window[""] || {}, window[""].Boot = Boot;
var COMPLETE_AREA, FEVER_SUCCESS_AREA, DEFAULT_TIME_COUNT, ONE_PERCENT_ADDTIME, DEFAULT_HEART_COUNT, HURRYUP_TIME_COUNT;
Preloader.prototype = {
    preload: function () {
        this.grpLoad = this.game.add.group(), this.grpLoad.x = this.game.width / 2, this.grpLoad.y = this.game.height / 2 - 120, this.stage.backgroundColor = "#FFFFFF", this.sprLoad = [], this.sprLoad[0] = this.add.sprite(0, 0, "preloaderLogoMono"), this.sprLoad[0].anchor.setTo(.5, .5), this.sprLoad[1] = this.add.sprite(-117, 0, "preloaderLogoColor"), this.sprLoad[1].anchor.setTo(0, .5), this.load.setPreloadSprite(this.sprLoad[1]), this.sprLoad[2] = this.add.sprite(0, 170, "preloaderLogoText"), this.sprLoad[2].anchor.setTo(.5, .5), this.loading_banner = this.add.sprite(0, this.game.height - this.grpLoad.y, "loading_banner"), this.loading_banner.anchor.setTo(.5, 1), this.loadingText = this.add.text(0, 250, "99%", {
            font: "23px Arial", fill: "#2E85ED", align: "center"
        }), this.loadingText.anchor.setTo(.5, .5), this.load.onLoadStart.add(this.onLoadStart, this), this.load.onFileComplete.add(this.onFileComplete, this), this.load.onLoadComplete.add(this.onLoadComplete, this), this.grpLoad.addChild(this.sprLoad[0]), this.grpLoad.addChild(this.sprLoad[1]), this.grpLoad.addChild(this.sprLoad[2]), this.grpLoad.addChild(this.loading_banner), this.grpLoad.addChild(this.loadingText), MG.stateThis = this, MG.resourcesManager.loader(ResourcesManager.Preloader)
    }, onLoadStart: function () {
        this.loadingText.setText("0%")
    }, onFileComplete: function (e, t, i, a, o) {
        this.loadingText.setText(e + "%")
    }, onLoadComplete: function () {
        var e = this;
        this.ready = !0, MG.AudioInit(), MG.loadGameSheetsData(1, Define.GOOGLE_SHEETS_DATA, function (t) {
            e.game.time.events.add(300, function () {
                FEVER_SUCCESS_AREA = parseFloat(MG.gameSheetsData.FeverSuccessArea), DEFAULT_TIME_COUNT = MG.gameSheetsData.DefaultTimeCount, timer = DEFAULT_TIME_COUNT, ONE_PERCENT_ADDTIME = MG.gameSheetsData.OnePercentAddTime, DEFAULT_HEART_COUNT = MG.gameSheetsData.DefaultHeartCount, gHeart = DEFAULT_HEART_COUNT, HURRYUP_TIME_COUNT = MG.gameSheetsData.HurryUPTimeCount, e.game.state.start("game"), e.destroy()
            })
        })
    }, create: function () {
        this.sprLoad[1].cropEnabled = !1
    }, update: function () {
        this.loadingText.setText("100%"), this.ready
    }, destroy: function () {
        console.log("  >>>>  destroy  <<<<"), this.sprLoad.forEach(function (e) {
            e.destroy()
        }), this.loadingText.destroy()
    }
}, window[""] = window[""] || {}, window[""].Preloader = Preloader;
var playCount = -1, isReady, isPlaying, isOnceView_NewRecord = !1, isUseTimeItem = !1, isUseSlowItem = 1,
    isSuperItem = !1, globalTouchInput = !1, isHighest_record = !1, oldBest_months = 0, feverCounter = 0,
    continueCounter = 0, currentScene = "none", splitBall_count = 0, create_20_balls = !1, isPaused = !1,
    isStart1stage = !1, isPlaying_SuperItem = !1, jumpCount = 11, isPlaying_GameBGM = !1, isPlaying_TitleBGM = !1;
Game.prototype = {
    preload: function () {
        isReady = !1, playCount <= -1 && (playCount = 0, MG.game.device.desktop ? (StorageManager.prototype.set("isBGM", !0), StorageManager.prototype.set("isSfx", !0)) : (StorageManager.prototype.set("isBGM", !1), StorageManager.prototype.set("isSfx", !1)), first_save_data && (first_save_data = !1, uData.nJewelryCount = parseInt(MG.gameSheetsData.DefaultJewelryCount), StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount)), this.Set_Complete_Area())
    }, create: function () {
        if (MG.game.physics.startSystem(Phaser.Physics.ARCADE), DEFAULT_TIME_COUNT = MG.gameSheetsData.DefaultTimeCount, isUseTimeItem && (DEFAULT_TIME_COUNT += MG.gameSheetsData.AddTimePlus), isHighest_record = !1, oldBest_months = 0, shopManager.Init(), uiManager.Start(), userItemManager.Start(), feverManager.Start(), isStart1stage) isStart1stage = !1, gHeart = MG.gameSheetsData.DefaultHeartCount, uData.nStage = 1, StorageManager.prototype.set("nStage", uData.nStage), 1 == loginTF && networkManager.ForcedSaveData(), uiManager.SetHeartText(gHeart), uiManager.OnClickEvent_PlayButton(); else switch (currentScene) {
            case"none":
                StorageManager.prototype.get("isBGM") && 0 == isPlaying_TitleBGM && (isPlaying_TitleBGM = !0, reward_timer = 0, MG.PlayBgm("bgm_title", !0));
            case"game":
                uiManager.Create_StartWindow();
                break;
            case"userItem":
                uiManager.OnClickEvent_StartButton()
        }
    }, update: function () {
        figureManager.OnUpdate(), actionManager.OnUpdate()
    }, Set_Complete_Area: function () {
        for (var e = 1; e < MG.gameSheetsData.RandomStageData.length; e++) if (uData.nStage < MG.gameSheetsData.RandomStageData[e].StartNumber) {
            COMPLETE_AREA = parseFloat(MG.gameSheetsData.RandomStageData[e - 1].CompleteArea);
            break
        }
    }, StartGame: function () {
        StorageManager.prototype.get("isBGM") && 0 == isPlaying_GameBGM && (isPlaying_GameBGM = !0, MG.PlayBgm("bgm_game", !0)), uData.nBestScore <= 0 && (isOnceView_NewRecord = !0), 0 == isReady ? (figureManager.Ready(), ballManager.Ready(), uiManager.SetupFont(), actionManager.Ready(), buffItemManager.Ready(), stateManager.IsPlayTutorial() && playTutorialManager.Ready(), bombEffecter.Ready(), uiManager.LoadingAtlasData(), currentScene = "readyGame", playCount <= 1 ? userItemManager.DisplayUserItem() : 0 == isOnceView_NewRecord && uData.nBestScore < uData.nStage && uData.nStage > 1 ? (isOnceView_NewRecord = !0, actionManager.NewRecordAnimation()) : stageManager.IsJustMonthsOpen() ? uiManager.OpenMonthsOpenWindow() : this.StartGame_ReadyGoAnimation()) : (uiManager.SetMonthsText(uData.nStage), uiManager.LoadingPencilSprite(), figureManager.Start(), ballManager.Start(), assetManager.StartTimer(), isPlaying = !0, stateManager.offGameFail(), isPlaying_SuperItem = !1, stateManager.IsPlayTutorial() && (assetManager.PauseTimer(), playTutorialManager.Active_Step()))
    }, Start_Play_Tutorial: function () {
        StorageManager.prototype.get("isBGM") && 0 == isPlaying_GameBGM && (isPlaying_GameBGM = !0, MG.PlayBgm("bgm_game", !0)), uiManager.SetMonthsText(uData.nStage), uiManager.LoadingPencilSprite(), figureManager.Start(), ballManager.Start()
    }, StartGame_ReadyGoAnimation: function () {
        Game.prototype.Set_Complete_Area(), currentScene = "game", actionManager.ReadyGoAnimation(), assetManager.Ready(), assetManager.SetupTimer()
    }, ReStartGame: function () {
        isSuperItem = !1, actionManager.Shutdown(), figureManager.Shutdown(), stateManager.Init(), currentScene = "none", MG.game.state.start("game")
    }, FeverModeSuccessGame: function () {
        stateManager.offFeverMode(), stageManager.IsOpenJumpMonths(uData.nStage, uData.nStage + MG.gameSheetsData.FeverJumpStageCount), uData.nStage += MG.gameSheetsData.FeverJumpStageCount, StorageManager.prototype.set("nStage", uData.nStage), 1 == loginTF && networkManager.ForcedSaveData(), assetManager.PauseTimer(), this.ReStartGame()
    }, PlayContinueGame: function () {
        figureManager.IsSuccessGame() ? ballManager.VisibleBalls(!0) : (currentScene = "game", gHeart = MG.gameSheetsData.ContinueHeartCount, uData.nJewelryCount -= assetManager.GetContinueNeedJewelry(), StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount), 1 == loginTF && networkManager.ForcedSaveData(), uiManager.SetHeartText(gHeart), globalTouchInput = !0, ballManager.VisibleBalls(!0), uiManager.togglePause())
    }, DebugGotoBackStage: function (e) {
        uData.nStage -= e, uData.nStage <= 1 && (uData.nStage = 1), StorageManager.prototype.set("nStage", uData.nStage), assetManager.PauseTimer(), this.ReStartGame()
    }, DebugGotoNextStage: function (e) {
        uData.nStage += e, StorageManager.prototype.set("nStage", uData.nStage), assetManager.PauseTimer(), this.ReStartGame()
    }, FailGame: function () {
        stateManager.onGameFail() && (isPlaying = !1, isUseTimeItem = !1, isSuperItem = !1, feverCounter = 0, continueCounter = 0, bombEffecter.Init(), StorageManager.prototype.get("isBGM") && (isPlaying_GameBGM = !1, MG.StopBgm("bgm_game")), assetManager.UpdateBestScore(), uData.nJewelryCount += parseInt(assetManager.GetRewardJewelry("nStage")), StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount), 1 == loginTF && networkManager.ForcedSaveData(), actionManager.GameFail())
    }, SuccessGame: function () {
        stateManager.IsStopSkill() && ballManager.StopSkill_Cancle(), assetManager.SetupTimer(), assetManager.PauseTimer(), this.Stage_Up(), actionManager.GameSuccess()
    }, Stage_Up: function () {
        uData.nStage > uData.nBestScore && (uData.nBestScore = uData.nStage), uData.nStage += 1, StorageManager.prototype.set("nStage", uData.nStage), 1 == loginTF && networkManager.ForcedSaveData()
    }, GotoHomeScene: function () {
        StorageManager.prototype.get("isBGM") && (isPlaying_TitleBGM = !0, isPlaying_GameBGM = !1, MG.StopBgm("bgm_game"), MG.PlayBgm("bgm_title", !0)), currentScene = "title", playCount = 0, isOnceView_NewRecord = !1, gHeart = DEFAULT_HEART_COUNT, DEFAULT_TIME_COUNT = MG.gameSheetsData.DefaultTimeCount, timer = DEFAULT_TIME_COUNT, isUseSlowItem = 1, isPlaying = !1, isUseTimeItem = !1, feverCounter = 0, continueCounter = 0, globalTouchInput = !1, uData.nStage = 1, assetManager.SetupTimer(), StorageManager.prototype.set("nStage", uData.nStage), 1 == loginTF && networkManager.ForcedSaveData(), ballManager.AllKillBalls(), figureManager.DeleteAllFigure(), this.ReStartGame()
    }
}, window[""] = window[""] || {}, window[""].Game = Game;
var timer, reward_timer, gHeart = DEFAULT_HEART_COUNT, _assetManager = _assetManager || {};
_assetManager.Instance = function () {
    function e(e) {
        (timer -= e) <= 0 && 0 == stateManager.IsGameSuccess() && o.EndingTimer(), a.UpdateBarGauge(timer), a.SetTimeFormat(timer)
    }

    function t() {
        a.UpdateBarGauge(timer)
    }

    function i() {
        --timer <= 0 ? o.EndingTimer() : t(), 0 == a.GetIsHurryUp() && timer <= HURRYUP_TIME_COUNT && timer > 0 && (s = MG.game.time.totalElapsedSeconds(), actionManager.WidthOutCallBack_Animation("hurry_up"), a.StartWarning(!0)), 1 == a.GetIsHurryUp() && timer > HURRYUP_TIME_COUNT && a.StopWarning()
    }

    var a, o = {}, n = void 0, s = 0;
    return o.Ready = function () {
        gHeart < 0 && (gHeart = DEFAULT_HEART_COUNT), isUseTimeItem && playCount <= 1 && o.Set_Time_Skill(), void 0 != a && null != a || (a = new AreaBar(timer)), a.LoadingSprite(), MG.game.time.events.remove(n), (n = MG.game.time.create(!1)).loop(Phaser.Timer.SECOND, i, this), assetManager.SetupTimer(), timer <= HURRYUP_TIME_COUNT && timer > 0 && a.StartWarning(!0)
    }, o.Set_Time_Skill = function () {
        DEFAULT_TIME_COUNT = MG.gameSheetsData.DefaultTimeCount, DEFAULT_TIME_COUNT += MG.gameSheetsData.AddTimePlus, timer = DEFAULT_TIME_COUNT
    }, o.SetupTimer = function () {
        t(), o.PauseTimer()
    }, o.StartTimer = function () {
        n.start(), t()
    }, o.PauseTimer = function () {
        n.pause()
    }, o.ResumeTimer = function () {
        n.resume()
    }, o.UseHeart = function () {
        --gHeart < 0 && (gHeart = 0, e(MG.gameSheetsData.NoShieldDamage)), this.UpdateHeartText()
    }, o.AddTime = function (e) {
        (timer += e) > DEFAULT_TIME_COUNT && (timer = DEFAULT_TIME_COUNT), t(), o.UpdateHeartText()
    }, o.FullRefillTime = function () {
        timer = DEFAULT_TIME_COUNT, t(), a.SetTimeFormat(timer)
    }, o.SmoothRefillTime = function () {
        actionManager.SetSmoothRefillTime(!0)
    }, o.UpdateHeartText = function () {
        uiManager.SetHeartText(gHeart)
    }, o.StopWarning = function () {
        a.StopWarning()
    }, o.EndingTimer = function () {
        stateManager.onTimeOver() && (stateManager.onContinue(), o.PauseTimer(), globalTouchInput = !1, timer = 0, a.GetIsHurryUp() && a.StopWarning(), a.UpdateBarGauge(0), a.SetTimeFormat(0), actionManager.TimeOverAnimation())
    }, o.OOPS_Time_Broken = function () {
        a.OOPS_Time_Broken()
    }, o.GetRewardJewelry = function (e) {
        var t;
        switch (e) {
            case"nStage":
                if (1 === uData.nStage) return 0;
                t = uData.nStage;
                break;
            case"nBestStage":
                t = uData.nBestScore
        }
        for (var i = 10, a = 1; a < t; a++) i += (parseInt(a + 1) - 2) / 5 + 1, i = Math.floor(i);
        return i.toFixed(0)
    }, o.GetMonthsJumpNeedJewelry = function (e) {
        for (var t = 20, i = 1; i < e; i++) t += (parseInt(i + 1) - 2) / 5 + 3, t = Math.floor(t);
        return t.toFixed(0)
    }, o.GetContinueNeedJewelry = function () {
        return uData.nStage * continueCounter
    }, o.UpdateBestScore = function () {
        var e;
        e = figureManager.GetTotalPaintedArea() < 10 ? "0" + figureManager.GetTotalPaintedArea().toString() : figureManager.GetTotalPaintedArea().toString();
        var t = uData.nStage.toString() + e.toString();
        null != uData.nBestCompleteArea && void 0 != uData.nBestCompleteArea || (StorageManager.prototype.set("nBestCompleteArea", 0), uData.nBestCompleteArea = 0), console.log("--- uData.nBestCompleteArea = " + uData.nBestCompleteArea), console.log("--- newScore = " + t), parseFloat(uData.nBestCompleteArea) < parseFloat(t) && (console.log("--- Set newScore ---"), isHighest_record = !0, oldBest_months = uData.nBestScore, console.log("------- UpdateBestScore.uData.nBestScore = " + uData.nBestScore), uData.nBestScore = uData.nStage, console.log("------- UpdateBestScore.uData.nStage = " + uData.nStage), uData.nBestCompleteArea = t, StorageManager.prototype.set("nBestScore", uData.nBestScore), StorageManager.prototype.set("nBestCompleteArea", uData.nBestCompleteArea))
    }, o
}();
var _figureManager = _figureManager || {};
_figureManager.Instance = function () {
    function e() {
        G(), ge = MG.game.time.events.add(Phaser.Timer.SECOND, e, this)
    }

    function t() {
        ballManager.BringToTopBuffBalls()
    }

    function i() {
        (Te = MG.game.add.graphics(0, 0)).beginFill(0), ee.mask = Te, oe.mask = Te
    }

    function a() {
        var e = [];
        e.push({x: 0, y: 180}), e.push({x: MG.game.world.width, y: 180}), e.push({
            x: MG.game.world.width, y: MG.game.world.height
        }), e.push({x: 0, y: MG.game.world.height});
        var t = new FigureObject(e);
        Be.push(t), j = Be[0], Be[0].CreateWalls(), Be[0].SetWalls(), l()
    }

    function o() {
        var e = [];
        e.push({x: 0, y: 180}), e.push({x: MG.game.world.width, y: 180}), e.push({
            x: MG.game.world.width, y: MG.game.world.height
        }), e.push({x: 0, y: MG.game.world.height});
        var t = new FigureObject(e);
        Me.push(t), Me[0].CreateWalls(), Me[0].SetWalls()
    }

    function n() {
        for (var e = 0; e < Be.length; e++) Be[e].SetWalls()
    }

    function s() {
        for (var e = 0; e < Be.length; e++) Be[e].ReSetWalls();
        for (e = 0; e < Me.length; e++) Me[e].ReSetWalls()
    }

    function l() {
        for (var e = 0; e < Be.length; e++) Be[e].DrawMask(Te)
    }

    function r() {
        L.removeAll();
        for (var e = 0; e < Be.length; e++) {
            var t = new Phaser.Point;
            t.x = Be[e].figurePoints[1].x - Be[e].figurePoints[0].x, t.y = Be[e].figurePoints[2].y - Be[e].figurePoints[1].y;
            var i = new Phaser.Point;
            i.x = .5 * (Be[e].figurePoints[1].x - Be[e].figurePoints[0].x) + Be[e].figurePoints[0].x, i.y = .5 * (Be[e].figurePoints[2].y - Be[e].figurePoints[1].y) + Be[e].figurePoints[1].y;
            var a = L.create(i.x += ye, i.y += ye, "blackTexture");
            a.scale.setTo(t.x, t.y), a.anchor.setTo(.5), a.alpha = fe
        }
    }

    function h(e) {
        return Math.round((e.figurePoints[1].x - e.figurePoints[0].x) * (e.figurePoints[2].y - e.figurePoints[0].y).toFixed(2))
    }

    function p() {
        Ge = {
            x: MG.game.input.x, y: MG.game.input.y
        }, uiManager.TouchRing_Animation(MG.game.input.x, MG.game.input.y), stateManager.IsPlayTutorial() && (Ge.y < 350 || Ge.y > 700) || 0 != d(Ge) && (parseFloat(MG.game.time.totalElapsedSeconds() - Ce) < .3 || 0 != stateManager.onGameTouch() && (Ce = MG.game.time.totalElapsedSeconds(), me = !0, m()))
    }

    function u() {
        if (0 != me && 0 != stateManager.onGameTouch() && 0 != stateManager.onGameTouch()) {
            if (we = {x: MG.game.input.x, y: MG.game.input.y}, me = !1, stateManager.IsPlayTutorial()) {
                if (!c() || 0 != playTutorialManager.IsUserInput()) return;
                playTutorialManager.SetUserInput(!0), playTutorialManager.Active_Step()
            }
            g()
        }
    }

    function m() {
        uiManager.HiddenTouchInputUI(), d(Ge)
    }

    function g() {
        (Math.abs(Ge.x - we.x) > 5 || Math.abs(Ge.y - we.y) > 5) && (stateManager.onLineDrawing(), _())
    }

    function _() {
        var e = {x: Ge.x, y: Ge.y}, t = {x: we.x, y: we.y};
        c() ? (t.y = e.y, e.x < t.x ? (be = "right", e.x = -1, t.x = MG.game.world.width + 1) : (be = "left", e.x = MG.game.world.width + 1, t.x = -1)) : (t.x = e.x, e.y < t.y ? (be = "down", e.y = -1, t.y = MG.game.world.height + 1) : (be = "up", e.y = MG.game.world.height + 1, t.y = -1)), y(e, t, j.figurePoints), S(be)
    }

    function d(e) {
        for (var t = 0; t < Be.length; t++) if (f(e, Be[t].figurePoints)) return j = Be[t], !0;
        return !1
    }

    function c() {
        return Math.abs(we.x - Ge.x) > Math.abs(we.y - Ge.y)
    }

    function y(e, t, i) {
        var a, o, n = new Phaser.Line(e.x, e.y, t.x, t.y), s = null;
        for (xe.length = 0, a = 0; a < i.length; a++) s = a < i.length - 1 ? new Phaser.Line(i[a].x, i[a].y, i[a + 1].x, i[a + 1].y) : new Phaser.Line(i[a].x, i[a].y, i[0].x, i[0].y), (o = n.intersects(s, !0)) && xe.push(o)
    }

    function f(e, t) {
        var i = 0, a = 0, o = null, n = new Phaser.Line(e.x, e.y, .5 * MG.game.world.width, -5);
        for (i = 0; i < t.length; i++) o = i < t.length - 1 ? new Phaser.Line(t[i].x, t[i].y, t[i + 1].x, t[i + 1].y) : new Phaser.Line(t[i].x, t[i].y, t[0].x, t[0].y), n.intersects(o, !0) && a++;
        return a % 2 != 0
    }

    function B() {
        isSuperItem ? (ballManager.BallAndLineColliderListener(K), ballManager.BallAndLineColliderListener(z), ballManager.BallAndLineColliderListener(q), ballManager.BallAndLineColliderListener(Q)) : (ballManager.BallAndLineColliderListener(X), ballManager.BallAndLineColliderListener(Y))
    }

    function M() {
        for (var e = 0; e < Be.length; e++) Be[e].figurePoints[0].x > Be[e].figurePoints[1].x ? (Be[e].DeleteWalls(), Be.splice(e, 1)) : Be[e].figurePoints[3].x > Be[e].figurePoints[2].x ? (Be[e].DeleteWalls(), Be.splice(e, 1)) : Be[e].figurePoints[1].y > Be[e].figurePoints[2].y ? (Be[e].DeleteWalls(), Be.splice(e, 1)) : Be[e].figurePoints[0].y > Be[e].figurePoints[3].y ? (Be[e].DeleteWalls(), Be.splice(e, 1)) : (Be[e].figurePoints[0].x !== Be[e].figurePoints[3].x && (Be[e].figurePoints[0].x = Be[e].figurePoints[3].x), Be[e].figurePoints[1].x !== Be[e].figurePoints[2].x && (Be[e].figurePoints[1].x = Be[e].figurePoints[2].x), Be[e].figurePoints[0].y !== Be[e].figurePoints[1].y && (Be[e].figurePoints[0].y = Be[e].figurePoints[1].y), Be[e].figurePoints[2].y !== Be[e].figurePoints[3].y && (Be[e].figurePoints[2].y = Be[e].figurePoints[3].y))
    }

    function S(e) {
        if (!(xe.length <= 1)) {
            var t, i, a, o, n, s;
            switch (isSuperItem ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_line_super"), "up" == e || "down" == e ? (n = q, s = Q) : (n = K, s = z)) : (n = X, s = Y, StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_line")), e) {
                case"right":
                    xe[0].x < xe[1].x ? (t = Ge, a = xe[1], i = Ge, o = xe[0]) : (t = Ge, a = xe[0], i = Ge, o = xe[1]), n.anchor.setTo(0, .5), s.anchor.setTo(1, .5), isSuperItem ? (n.scale.setTo(0, .5), s.scale.setTo(0, .5)) : (n.scale.setTo(0, 5), s.scale.setTo(0, 5)), n.position.setTo(t.x, t.y), s.position.setTo(i.x, i.y), re = Math.abs(a.x - t.x), he = Math.abs(o.x - i.x);
                    break;
                case"left":
                    xe[0].x < xe[1].x ? (t = Ge, a = xe[0], i = Ge, o = xe[1]) : (t = Ge, a = xe[1], i = Ge, o = xe[0]), n.anchor.setTo(1, .5), s.anchor.setTo(0, .5), isSuperItem ? (n.scale.setTo(0, .5), s.scale.setTo(0, .5)) : (n.scale.setTo(0, 5), s.scale.setTo(0, 5)), n.position.setTo(t.x, t.y), s.position.setTo(i.x, i.y), re = Math.abs(a.x - t.x), he = Math.abs(o.x - i.x);
                    break;
                case"up":
                    t = Ge, a = xe[0], i = Ge, o = xe[1], n.anchor.setTo(.5, 1), s.anchor.setTo(.5, 0), isSuperItem ? (n.scale.setTo(.5, 0), s.scale.setTo(.5, 0)) : (n.scale.setTo(5, 0), s.scale.setTo(5, 0)), n.position.setTo(t.x, t.y), s.position.setTo(i.x, i.y), re = Math.abs(a.y - t.y), he = Math.abs(o.y - i.y);
                    break;
                case"down":
                    t = Ge, a = xe[1], i = Ge, o = xe[0], n.anchor.setTo(.5, 0), s.anchor.setTo(.5, 1), isSuperItem ? (n.scale.setTo(.5, 0), s.scale.setTo(.5, 0)) : (n.scale.setTo(5, 0), s.scale.setTo(5, 0)), n.position.setTo(t.x, t.y), s.position.setTo(i.x, i.y), re = Math.abs(a.y - t.y), he = Math.abs(o.y - i.y)
            }
        }
    }

    function T() {
        stateManager.offLineDrawing(), 0 == stateManager.IsPlayTutorial() ? (K.scale.setTo(0), z.scale.setTo(0), q.scale.setTo(0), Q.scale.setTo(0), X.scale.setTo(0), Y.scale.setTo(0), _e.EndDrawLine_CallBack()) : playTutorialManager.Active_Step()
    }

    function G() {
        for (var e = 0; e < ballManager.GetActiveBalls().length; e++) {
            for (var t = !1, i = {
                x: ballManager.GetActiveBalls()[e].GetBallBody().position.x,
                y: ballManager.GetActiveBalls()[e].GetBallBody().position.y
            }, a = 0; a < Be.length; a++) f(i, Be[a].figurePoints) && (t = !0);
            0 == t && ballManager.GetActiveBalls()[e].KillBall()
        }
    }

    function w() {
        switch (stateManager.offLineDrawing(), $.position.setTo(X.position.x, X.position.y), Z.position.setTo(Y.position.x, Y.position.y), be) {
            case"right":
            case"left":
                $.scale.setTo(X.scale.x, 10), Z.scale.setTo(Y.scale.x, 10);
                break;
            case"up":
            case"down":
                $.scale.setTo(10, X.scale.y), Z.scale.setTo(10, Y.scale.y)
        }
        $.anchor.setTo(X.anchor.x, X.anchor.y), Z.anchor.setTo(Y.anchor.x, Y.anchor.y), MG.game.time.events.add(150, b, this), X.scale.setTo(0), X.position.setTo(-1e3, -1e3), Y.scale.setTo(0), Y.position.setTo(-1e3, -1e3)
    }

    function b() {
        Ie = !0
    }

    function x() {
        switch (be) {
            case"right":
            case"left":
                $.scale.setTo($.scale.x, $.scale.y - .008 * ce), Z.scale.setTo(Z.scale.x, Z.scale.y - .008 * ce), $.scale.y <= 0 && ($.scale.setTo(0), $.position.setTo(-1e3, -1e3), $.alpha = 1), Z.scale.y <= 0 && (Z.scale.setTo(0), Z.position.setTo(-1e3, -1e3), Z.alpha = 1);
                break;
            case"up":
            case"down":
                $.scale.setTo($.scale.x - .008 * ce, $.scale.y), Z.scale.setTo(Z.scale.x - .008 * ce, Z.scale.y), $.scale.x <= 0 && ($.scale.setTo(0), $.position.setTo(-1e3, -1e3), $.alpha = 1), Z.scale.x <= 0 && (Z.scale.setTo(0), Z.position.setTo(-1e3, -1e3), Z.alpha = 1)
        }
        $.alpha -= .001 * ce, Z.alpha -= .001 * ce, $.alpha < 0 && ($.alpha = 0), Z.alpha < 0 && (Z.alpha = 0), $.scale.x <= 0 && Z.scale.x <= 0 && (Ie = !1)
    }

    function I() {
        switch (be) {
            case"right":
            case"left":
                X.scale.x < re ? X.scale.setTo(X.scale.x + ce, 5) : X.scale.setTo(re, 5), Y.scale.x < he ? Y.scale.setTo(Y.scale.x + ce, 5) : Y.scale.setTo(he, 5), X.scale.x >= re && Y.scale.x >= he && T();
                break;
            case"up":
            case"down":
                X.scale.y < re ? X.scale.setTo(5, X.scale.y + ce) : X.scale.setTo(5, re), Y.scale.y < he ? Y.scale.setTo(5, Y.scale.y + ce) : Y.scale.setTo(5, he), X.scale.y >= re && Y.scale.y >= he && T()
        }
    }

    function v() {
        switch (be) {
            case"right":
            case"left":
                K.scale.x < re ? K.scale.setTo(K.scale.x + ce, 1) : K.scale.setTo(re, 1), z.scale.x < he ? z.scale.setTo(z.scale.x + ce, 1) : z.scale.setTo(he, 1), K.scale.x >= re && z.scale.x >= he && T();
                break;
            case"up":
            case"down":
                q.scale.y < re ? q.scale.setTo(1, q.scale.y + ce) : q.scale.setTo(1, re), Q.scale.y < he ? Q.scale.setTo(1, Q.scale.y + ce) : Q.scale.setTo(1, he), q.scale.y >= re && Q.scale.y >= he && T()
        }
    }

    function P(e) {
        for (var t = 0; t < Be.length; t++) if (0 == U(ballManager.GetBallSplites(), Be[t].figurePoints)) {
            if (k(Be[t]), 1 == U(ballManager.GetBuffItemSplites(), Be[t].figurePoints)) for (var i = 0; i < ballManager.GetBuffBalls().length; i++) f({
                x: ballManager.GetBuffBalls()[i].GetBallBody().position.x,
                y: ballManager.GetBuffBalls()[i].GetBallBody().position.y
            }, Be[t].figurePoints) && (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_item_get"), ballManager.KillBuffBall(ballManager.GetBuffBalls()[i]));
            for (var a = 0; a < Be[t].figurePoints.length; a++) Se.push(Be[t].figurePoints[a]);
            Be[t].DeleteWalls(), Be.splice(t, 1), e && O()
        }
    }

    function C() {
        if (!(xe.length < 2)) {
            var e, t, i = 0, a = [];
            if (Se.length = 0, "right" === be || "left" === be ? (xe[0].x < xe[1].x ? (e = xe[0], t = xe[1]) : (e = xe[1], t = xe[0]), a.push({
                x: e.x, y: e.y
            }), a.push({x: t.x, y: t.y}), a.push({
                x: j.figurePoints[2].x, y: j.figurePoints[2].y
            }), a.push({
                x: j.figurePoints[3].x, y: j.figurePoints[3].y
            }), j.figurePoints[2].x = t.x, j.figurePoints[2].y = t.y, j.figurePoints[3].x = e.x, j.figurePoints[3].y = e.y) : (xe[0].y < xe[1].y ? (e = xe[0], t = xe[1]) : (e = xe[1], t = xe[0]), a.push({
                x: e.x, y: e.y
            }), a.push({x: j.figurePoints[1].x, y: j.figurePoints[1].y}), a.push({
                x: j.figurePoints[2].x, y: j.figurePoints[2].y
            }), a.push({
                x: t.x, y: t.y
            }), j.figurePoints[1].x = e.x, j.figurePoints[1].y = e.y, j.figurePoints[2].x = t.x, j.figurePoints[2].y = t.y), !1 === U(ballManager.GetBallSplites(), j.figurePoints)) {
                if (!0 === U(ballManager.GetBuffItemSplites(), j.figurePoints)) for (i = 0; i < ballManager.GetBuffBalls().length; i++) f(l = {
                    x: ballManager.GetBuffBalls()[i].GetBallBody().position.x,
                    y: ballManager.GetBuffBalls()[i].GetBallBody().position.y
                }, j.figurePoints) && (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_item_get"), ballManager.CollisionBuffItemHandler(ballManager.GetBuffBalls()[i]));
                for (i = 0; i < Be.length; i++) {
                    var o = Be.indexOf(j);
                    if (o >= 0) {
                        k(j);
                        for (r = 0; r < j.figurePoints.length; r++) Se.push(j.figurePoints[r]);
                        Be[o].DeleteWalls(), Be.splice(o, 1), StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_land_get"), O()
                    }
                }
            }
            var s = new FigureObject(a);
            if (!1 === U(ballManager.GetBallSplites(), s.figurePoints)) {
                if (!0 === U(ballManager.GetBuffItemSplites(), s.figurePoints)) for (i = 0; i < ballManager.GetBuffBalls().length; i++) {
                    var l = {
                        x: ballManager.GetBuffBalls()[i].GetBallBody().position.x,
                        y: ballManager.GetBuffBalls()[i].GetBallBody().position.y
                    };
                    f(l, s.figurePoints) && ballManager.CollisionBuffItemHandler(ballManager.GetBuffBalls()[i])
                }
                k(s);
                for (var r = 0; r < s.figurePoints.length; r++) Se.push(s.figurePoints[r]);
                O()
            } else Be.push(s);
            Be.length > 0 && (Be[Be.length - 1].CreateWalls(), n())
        }
    }

    function E() {
        var e, t, i = 0;
        for (e = 0; e < Be.length; e++) {
            var a = J(Be[e]);
            for (t = 0; t < Be[e].figurePoints.length; t++) Be[e].figurePoints[t].x += .15 * (a.x - Be[e].figurePoints[t].x), Be[e].figurePoints[t].y += .15 * (a.y - Be[e].figurePoints[t].y);
            if (Phaser.Math.distance(Be[e].figurePoints[0].x, Be[e].figurePoints[0].y, a.x, a.y) <= 2) {
                for (t = 0; t < Be[e].figurePoints.length; t++) Be[e].figurePoints[t].x = a.x, Be[e].figurePoints[t].y = a.y;
                i++
            }
        }
        for (Te.clear(), e = 0; e < Be.length; e++) for (t = 0; t < Be[e].figurePoints.length; t++) Te.moveTo(Be[e].figurePoints[t].x, Be[e].figurePoints[t].y), l(), r();
        if (i > 0) for (L.removeAll(), ve = !1, e = 0; e < Be.length; e++) for (t = 0; t < Be[e].figurePoints.length; t++) Be[e].figurePoints[t].x = -1e3, Be[e].figurePoints[t].y = -1e3;
        for (Te.clear(), e = 0; e < Be.length; e++) for (t = 0; t < Be[e].figurePoints.length; t++) Te.moveTo(Be[e].figurePoints[t].x, Be[e].figurePoints[t].y), l()
    }

    function k(e) {
        var t = h(e) / le;
        A(t), se += t;
        var i = 0;
        stateManager.IsPlayTutorial() && (i = 1200), uiManager.ViewCompleteAreaRatio(J(e), V(e), 100 * t, i), uiManager.CompletePaintingRatio(_e.GetTotalPaintedArea())
    }

    function D() {
        for (var e = le, t = 0; t < Be.length; t++) e -= h(Be[t]);
        se = e / le, uiManager.CompletePaintingRatio(_e.GetTotalPaintedArea())
    }

    function A(e) {
        if (!(e < .01) && ((reward_timer += 100 * e * ONE_PERCENT_ADDTIME).toFixed(2), reward_timer > 1)) {
            var t = Math.floor(reward_timer);
            reward_timer -= t, assetManager.AddTime(t)
        }
    }

    function U(e, t) {
        for (var i = !1, a = 0; a < e.length; a++) if (f({x: e[a].position.x, y: e[a].position.y}, t)) {
            i = !0;
            break
        }
        return i
    }

    function O() {
        Pe = F(be, Se), stateManager.onMaskDrawing()
    }

    function F(e, t) {
        var i = 0, a = 0;
        switch (be) {
            case"right":
                for (a = 0, i = 0; i < t.length; i++) t[i].x > a && (a = t[i].x);
                break;
            case"left":
                for (a = MG.game.world.width, i = 0; i < t.length; i++) t[i].x < a && (a = t[i].x);
                break;
            case"up":
                for (a = MG.game.world.height, i = 0; i < t.length; i++) t[i].y < a && (a = t[i].y);
                break;
            case"down":
                for (a = 0, i = 0; i < t.length; i++) t[i].y > a && (a = t[i].y)
        }
        return a
    }

    function R() {
        var e = 0, t = !0, i = W(Se);
        switch (be) {
            case"right":
                for (e = 0; e < Se.length; e++) Se[e].x < Pe && (Se[e].x += de, Se[e].x > Pe && (Se[e].x = Pe), uiManager.HandlePencil(Se[e].x, i.y), t = !1);
                break;
            case"left":
                for (e = 0; e < Se.length; e++) Se[e].x > Pe && (Se[e].x -= de, Se[e].x < Pe && (Se[e].x = Pe), uiManager.HandlePencil(Se[e].x, i.y), t = !1);
                break;
            case"up":
                for (e = 0; e < Se.length; e++) Se[e].y > Pe && (Se[e].y -= de, Se[e].y < Pe && (Se[e].y = Pe), uiManager.HandlePencil(i.x, Se[e].y), t = !1);
                break;
            case"down":
                for (e = 0; e < Se.length; e++) Se[e].y < Pe && (Se[e].y += de, Se[e].y > Pe && (Se[e].y = Pe), uiManager.HandlePencil(i.x, Se[e].y), t = !1)
        }
        N(), t && (Se.length = 0, uiManager.HiddenPencil(), stateManager.offMaskDrawing(), globalTouchInput = !0, P(!0), _e.IsSuccessGame(), stateManager.IsPlayTutorial())
    }

    function N() {
        if (Se.length > 0) {
            var e;
            for (Te.clear(), Te.moveTo(Se[0].x, Se[0].y), e = 0; e < Se.length; e++) Te.lineTo(Se[e].x, Se[e].y)
        }
        l(), r(), t()
    }

    function J(e) {
        return {
            x: e.figurePoints[0].x + .5 * (e.figurePoints[1].x - e.figurePoints[0].x),
            y: e.figurePoints[1].y + .5 * (e.figurePoints[2].y - e.figurePoints[1].y)
        }
    }

    function V(e) {
        return {x: e.figurePoints[1].x - e.figurePoints[0].x, y: e.figurePoints[3].y - e.figurePoints[0].y}
    }

    function W(e) {
        return {x: e[0].x + .5 * (e[1].x - e[0].x), y: e[1].y + .5 * (e[2].y - e[1].y)}
    }

    var L, j, H, X, Y, K, z, q, Q, $, Z, ee, te, ie, ae, oe, ne, se, le, re, he, pe, ue, me, ge, _e = {}, de = 0,
        ce = 0, ye = 6, fe = .35, Be = [], Me = [], Se = [], Te = null, Ge = {x: 0, y: 0}, we = {x: 0, y: 0}, be = null,
        xe = [], Ie = !1, ve = !1, Pe = 0, Ce = 0;
    return _e.Ready = function () {
        Be.length = 0, Me.length = 0, 0 == stateManager.IsPlayTutorial() ? (ce = MG.gameSheetsData.DrawLine_Speed, de = MG.gameSheetsData.DrawMask_Speed) : (ce = 10, de = 10), L = MG.game.add.group(), Te = null, me = !1, _e.LoadingSprites(), i(), a(), o(), MG.game.world.swap(L, ae), le = h(Be[0]), se = 0, Se.length = 0
    }, _e.Start = function () {
        ge = MG.game.time.events.add(Phaser.Timer.SECOND, e, this)
    }, _e.Set_Draw_Speed = function () {
        ce = MG.gameSheetsData.DrawLine_Speed, de = MG.gameSheetsData.DrawMask_Speed
    }, _e.FinishAnimation_Boolean = function (e) {
        ve = e
    }, _e.Shutdown = function () {
        ve = !1;
        for (var e = 0; e < Be.length; e++) Be[e].DeleteWalls();
        for (e = 0; e < Me.length; e++) Me[e].DeleteWalls();
        Be.length = 0, Me.length = 0, se = 0
    }, _e.AutoFill = function () {
        Te.clear(), Be.visible = !1
    }, _e.OnUpdate = function () {
        for (var e = 0; e < Be.length; e++) Be[e].ColliderListener(ballManager.GetBallSplites()), MG.game.physics.arcade.collide(ballManager.GetBallSplites(), ballManager.GetBallSplites());
        for (e = 0; e < Me.length; e++) Me[e].ColliderListener(ballManager.GetBuffItemSplites()), Me[e].ColliderListener(ballManager.GetBombBallSprites());
        stateManager.IsLineDrawing() && (isSuperItem ? v() : I(), B()), Ie && x(), stateManager.IsMaskDrawing() && R(), ve && E()
    }, _e.LoadingSprites = function () {
        ue = stageManager.GetSeason36(uData.nStage), pe = stageManager.GetSeason36(uData.nStage + 1), (te = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "atlas_BG", MG.gameSheetsData.MonthsBackground[pe].mainBG)).scale.setTo(MG.game.world.width, MG.game.world.height), te.anchor.setTo(.5), (ie = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, "atlas_bottomBG", MG.gameSheetsData.MonthsBackground[pe].bottomBG)).anchor.setTo(.5, 1), (ae = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, "blank")).anchor.setTo(.5, 1), (ee = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, "atlas_BG", MG.gameSheetsData.MonthsBackground[ue].mainBG)).scale.setTo(MG.game.world.width, MG.game.world.height), ee.anchor.setTo(.5), ee.inputEnabled = !0, ee.events.onInputDown.add(p, this), ee.events.onInputUp.add(u, this), (oe = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, "atlas_bottomBG", MG.gameSheetsData.MonthsBackground[ue].bottomBG)).anchor.setTo(.5, 1), ne = MG.game.add.sprite(MG.game.world.centerX, 0, "atlas_topBG", MG.gameSheetsData.MonthsBackground[ue].topBG), "bg_top_06.png" == MG.gameSheetsData.MonthsBackground[ue].topBG || "bg_top_07.png" == MG.gameSheetsData.MonthsBackground[ue].topBG ? ne.scale.setTo(1, .85) : ne.scale.setTo(1), ne.anchor.setTo(.5, 0), (X = MG.game.add.sprite(-1e3, -1e3, "lineDot")).enableBody = !0, MG.game.physics.enable(X, Phaser.Physics.ARCADE), X.body.immovable = !0, X.scale.setTo(0, 0), X.anchor.setTo(0, .5), (Y = MG.game.add.sprite(-1e3, -1e3, "lineDot")).enableBody = !0, MG.game.physics.enable(Y, Phaser.Physics.ARCADE), Y.body.immovable = !0, Y.scale.setTo(0, 0), Y.anchor.setTo(0, .5), ($ = MG.game.add.sprite(-1e3, -1e3, "lineDot")).scale.setTo(0, 0), $.anchor.setTo(0, .5), (Z = MG.game.add.sprite(-1e3, -1e3, "lineDot")).scale.setTo(0, 0), Z.anchor.setTo(0, .5), (K = MG.game.add.sprite(-1e3, -1e3, "lineDot_SuperBuff")).enableBody = !0, MG.game.physics.enable(K, Phaser.Physics.ARCADE), K.body.immovable = !0, K.scale.setTo(0, 0), K.anchor.setTo(0, .5), (z = MG.game.add.sprite(-1e3, -1e3, "lineDot_SuperBuff")).enableBody = !0, MG.game.physics.enable(z, Phaser.Physics.ARCADE), z.body.immovable = !0, z.scale.setTo(0, 0), z.anchor.setTo(0, .5), (q = MG.game.add.sprite(-1e3, -1e3, "lineDot90_SuperBuff")).enableBody = !0, MG.game.physics.enable(q, Phaser.Physics.ARCADE), q.body.immovable = !0, q.scale.setTo(0, 0), q.anchor.setTo(0, .5), (Q = MG.game.add.sprite(-1e3, -1e3, "lineDot90_SuperBuff")).enableBody = !0, MG.game.physics.enable(Q, Phaser.Physics.ARCADE), Q.body.immovable = !0, Q.scale.setTo(0, 0), Q.anchor.setTo(0, .5)
    }, _e.FeverModeSuccess_LoadingSprites = function () {
        var e = stageManager.GetSeason36(uData.nStage + MG.gameSheetsData.FeverJumpStageCount);
        te.loadTexture("atlas_BG", MG.gameSheetsData.MonthsBackground[e].mainBG), ee.loadTexture("atlas_BG", MG.gameSheetsData.MonthsBackground[e].mainBG), ie.loadTexture("atlas_bottomBG", MG.gameSheetsData.MonthsBackground[e].bottomBG), ne.loadTexture("atlas_topBG", MG.gameSheetsData.MonthsBackground[e].topBG), uiManager.SetMonthsText(uData.nStage + MG.gameSheetsData.FeverJumpStageCount), "bg_top_06.png" == MG.gameSheetsData.MonthsBackground[e].topBG || "bg_top_07.png" == MG.gameSheetsData.MonthsBackground[e].topBG ? ne.scale.setTo(1, .85) : ne.scale.setTo(1)
    }, _e.GetDefault_FigureObjectGroup = function () {
        return Me
    }, _e.TouchInputUI = function (e) {
        switch (e) {
            case"right":
                we = {x: Ge.x + 5, y: Ge.y};
                break;
            case"left":
                we = {x: Ge.x - 5, y: Ge.y};
                break;
            case"up":
                we = {x: Ge.x, y: Ge.y - 5};
                break;
            case"down":
                we = {x: Ge.x, y: Ge.y + 5}
        }
        _()
    }, _e.CollisionLineHandler = function (e, t) {
        w(), StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_crash"), gHeart > 0 ? (actionManager.Shield_Broken_Animation(e, t), uiManager.Shield_Broken_UI_Animation()) : (actionManager.WidthOutCallBack_Animation("oops"), assetManager.OOPS_Time_Broken()), P(!0)
    }, _e.BombFigure = function (e, t) {
        for (var i = {
            x: e, y: t
        }, a = 0; a < Be.length; a++) f(i, Be[a].figurePoints) && (H = a, Be[a].Bomb(_e.OverlapFigures))
    }, _e.OverlapFigures = function () {
        for (var e = 0; e < Be.length; e++) if (e !== H && !(parseInt(Be[H].figurePoints[0].x) > parseInt(Be[e].figurePoints[1].x) || parseInt(Be[H].figurePoints[1].x) < parseInt(Be[e].figurePoints[0].x) || parseInt(Be[H].figurePoints[0].y) > parseInt(Be[e].figurePoints[3].y) || parseInt(Be[H].figurePoints[3].y) < parseInt(Be[e].figurePoints[0].y))) if (parseInt(Be[e].figurePoints[0].x) >= parseInt(Be[H].figurePoints[0].x) && parseInt(Be[e].figurePoints[1].x) <= parseInt(Be[H].figurePoints[1].x) && parseInt(Be[e].figurePoints[0].y) >= parseInt(Be[H].figurePoints[0].y) && parseInt(Be[e].figurePoints[3].y) <= parseInt(Be[H].figurePoints[3].y)) Be[e].HiddenFigure(); else {
            var t = !1, i = !1, a = !1, o = !1, s = !1, l = !1;
            parseInt(Be[H].figurePoints[0].x) > parseInt(Be[e].figurePoints[0].x) && parseInt(Be[H].figurePoints[0].x) < parseInt(Be[e].figurePoints[1].x) && parseInt(Be[H].figurePoints[1].x) > parseInt(Be[e].figurePoints[1].x) && (t = !0), parseInt(Be[H].figurePoints[1].x) > parseInt(Be[e].figurePoints[0].x) && parseInt(Be[H].figurePoints[1].x) < parseInt(Be[e].figurePoints[1].x) && parseInt(Be[H].figurePoints[0].x) < parseInt(Be[e].figurePoints[0].x) && (i = !0), parseInt(Be[H].figurePoints[0].y) > parseInt(Be[e].figurePoints[0].y) && parseInt(Be[H].figurePoints[0].y) < parseInt(Be[e].figurePoints[3].y) && parseInt(Be[H].figurePoints[3].y) > parseInt(Be[e].figurePoints[3].y) && (a = !0), parseInt(Be[H].figurePoints[3].y) > parseInt(Be[e].figurePoints[0].y) && parseInt(Be[H].figurePoints[3].y) < parseInt(Be[e].figurePoints[3].y) && parseInt(Be[H].figurePoints[0].y) < parseInt(Be[e].figurePoints[0].y) && (o = !0), parseInt(Be[H].figurePoints[0].y) > parseInt(Be[e].figurePoints[0].y) && parseInt(Be[H].figurePoints[0].y) < parseInt(Be[e].figurePoints[3].y) && parseInt(Be[H].figurePoints[0].x) < parseInt(Be[e].figurePoints[0].x) && parseInt(Be[H].figurePoints[1].x) > parseInt(Be[e].figurePoints[1].x) && (s = !0), parseInt(Be[H].figurePoints[0].y) < parseInt(Be[e].figurePoints[0].y) && parseInt(Be[H].figurePoints[3].y) > parseInt(Be[e].figurePoints[3].y) && parseInt(Be[H].figurePoints[0].x) > parseInt(Be[e].figurePoints[0].x) && parseInt(Be[H].figurePoints[1].x) < parseInt(Be[e].figurePoints[1].x) && (l = !0), t && o && (t = !1, o = !1, parseInt(Be[e].figurePoints[1].x) - parseInt(Be[H].figurePoints[0].x) > parseInt(Be[H].figurePoints[3].y) - parseInt(Be[e].figurePoints[0].y) ? (parseInt(Be[e].figurePoints[3].y) < parseInt(Be[H].figurePoints[3].y) && (Be[e].figurePoints[0].y = Be[H].figurePoints[3].y), Be[e].figurePoints[1].y = Be[H].figurePoints[3].y) : (parseInt(Be[e].figurePoints[0].x) > parseInt(Be[H].figurePoints[0].x) && (Be[e].figurePoints[1].x = Be[H].figurePoints[0].x), Be[e].figurePoints[2].x = Be[H].figurePoints[0].x)), t && a && (t = !1, a = !1, parseInt(Be[e].figurePoints[1].x) - parseInt(Be[H].figurePoints[0].x) > parseInt(Be[e].figurePoints[3].y) - parseInt(Be[H].figurePoints[0].y) ? (parseInt(Be[e].figurePoints[0].y) > parseInt(Be[H].figurePoints[0].y) && (Be[e].figurePoints[2].y = Be[H].figurePoints[0].y), Be[e].figurePoints[3].y = Be[H].figurePoints[0].y) : (parseInt(Be[e].figurePoints[0].x) > parseInt(Be[H].figurePoints[0].x) && (Be[e].figurePoints[1].x = Be[H].figurePoints[0].x), Be[e].figurePoints[2].x = Be[H].figurePoints[0].x)), i && a && (i = !1, a = !1, parseInt(Be[H].figurePoints[1].x) - parseInt(Be[e].figurePoints[0].x) > parseInt(Be[e].figurePoints[3].y) - parseInt(Be[H].figurePoints[0].y) ? (parseInt(Be[e].figurePoints[0].y) > parseInt(Be[H].figurePoints[0].y) && (Be[e].figurePoints[2].y = Be[H].figurePoints[0].y), Be[e].figurePoints[3].y = Be[H].figurePoints[0].y) : (parseInt(Be[e].figurePoints[1].x) < parseInt(Be[H].figurePoints[1].x) && (Be[e].figurePoints[0].x = Be[H].figurePoints[1].x), Be[e].figurePoints[3].x = Be[H].figurePoints[1].x)), i && o && (i = !1, o = !1, parseInt(Be[H].figurePoints[1].x) - parseInt(Be[e].figurePoints[0].x) > parseInt(Be[H].figurePoints[3].y) - parseInt(Be[e].figurePoints[0].y) ? (parseInt(Be[e].figurePoints[3].y) < parseInt(Be[H].figurePoints[3].y) && (Be[e].figurePoints[0].y = Be[H].figurePoints[3].y), Be[e].figurePoints[1].y = Be[H].figurePoints[3].y) : (parseInt(Be[e].figurePoints[1].x) < parseInt(Be[H].figurePoints[1].x) && (Be[e].figurePoints[0].x = Be[H].figurePoints[1].x), Be[e].figurePoints[3].x = Be[H].figurePoints[1].x)), t && (parseInt(Be[e].figurePoints[0].x) > parseInt(Be[H].figurePoints[0].x) && (Be[e].figurePoints[1].x = Be[H].figurePoints[0].x), Be[e].figurePoints[2].x = Be[H].figurePoints[0].x), i && (parseInt(Be[e].figurePoints[1].x) < parseInt(Be[H].figurePoints[1].x) && (Be[e].figurePoints[0].x = Be[H].figurePoints[1].x), Be[e].figurePoints[3].x = Be[H].figurePoints[1].x), a && (parseInt(Be[e].figurePoints[0].y) > parseInt(Be[H].figurePoints[0].y) && (Be[e].figurePoints[2].y = Be[H].figurePoints[0].y), Be[e].figurePoints[3].y = Be[H].figurePoints[0].y), o && (parseInt(Be[e].figurePoints[3].y) < parseInt(Be[H].figurePoints[3].y) && (Be[e].figurePoints[0].y = Be[H].figurePoints[3].y), Be[e].figurePoints[1].y = Be[H].figurePoints[3].y), s && (Be[e].figurePoints[1].x = Be[H].figurePoints[0].x, Be[e].figurePoints[2].x = Be[H].figurePoints[0].x), l && (Be[e].figurePoints[2].y = Be[H].figurePoints[0].y, Be[e].figurePoints[3].y = Be[H].figurePoints[0].y)
        }
        M(), P(!1), n(), N(), _e.ReDrawAllFigure()
    }, _e.EndDrawLine_CallBack = function () {
        buffItemManager.EndDrawLine_CallBack(), C(), N()
    }, _e.DeleteAllFigure = function () {
        s(), ve = !0, N(), l()
    }, _e.GetTotalPaintedArea = function () {
        return (100 * se).toFixed(1)
    }, _e.ReDrawAllFigure = function () {
        var e = 0, i = 0;
        for (Te.clear(), e = 0; e < Be.length; e++) for (i = 0; i < Be[e].figurePoints.length; i++) Te.moveTo(Be[e].figurePoints[i].x, Be[e].figurePoints[i].y), l(), r(), t();
        D()
    }, _e.IsSuccessGame = function () {
        return !!(se.toFixed(3) >= COMPLETE_AREA && stateManager.onGameSuccess()) && (MG.game.time.events.remove(ge), Game.prototype.SuccessGame(), !0)
    }, _e
}(), FigureObject.prototype.CreateWalls = function () {
    for (var e = 0; e < 4; e++) {
        var t = this.walls.create(MG.game.world.centerX, MG.game.world.centerY, "wall");
        t.name = "walls" + t, t.scale.setTo(0), t.anchor.setTo(.5), t.position.setTo(-1e3, -1e3), t.body.immovable = !0
    }
}, FigureObject.prototype.SetWalls = function () {
    this.ReSetWalls();
    for (var e = 0; e < this.figurePoints.length; e++) {
        var t = e + 1;
        t >= this.figurePoints.length && (t = 0), parseInt(this.figurePoints[e].x) !== parseInt(this.figurePoints[t].x) ? (parseInt(this.figurePoints[e].x) < parseInt(this.figurePoints[t].x) ? this.walls.children[e].anchor.setTo(0, .5) : this.walls.children[e].anchor.setTo(1, .5), this.walls.children[e].scale.setTo(Math.abs(this.figurePoints[t].x - this.figurePoints[e].x) + this.wallLineAdd, 5), this.walls.children[e].position.setTo(this.figurePoints[e].x, this.figurePoints[e].y)) : (parseInt(this.figurePoints[e].y) < parseInt(this.figurePoints[t].y) ? this.walls.children[e].anchor.setTo(.5, 0) : this.walls.children[e].anchor.setTo(.5, 1), this.walls.children[e].scale.setTo(5, Math.abs(this.figurePoints[t].y - this.figurePoints[e].y) + this.wallLineAdd), this.walls.children[e].position.setTo(this.figurePoints[e].x, this.figurePoints[e].y))
    }
}, FigureObject.prototype.ReSetWalls = function () {
    for (var e = 0; e < this.walls.children.length; e++) this.walls.children[e].scale.setTo(0, 0), this.walls.children[e].position.setTo(-1e3, -1e3)
}, FigureObject.prototype.DeleteWalls = function () {
    for (var e = 0; e < this.walls.children.length; e++) this.walls.remove(this.walls.children[e]);
    this.walls.visible = !1
}, FigureObject.prototype.Bomb = function (e) {
    var t = .5 * MG.gameSheetsData.BombPower, i = new Phaser.Point, a = new Phaser.Point, o = new Phaser.Point,
        n = new Phaser.Point;
    this.figurePoints[0].x -= t, this.figurePoints[0].y -= t, this.figurePoints[1].x += t, this.figurePoints[1].y -= t, this.figurePoints[2].x += t, this.figurePoints[2].y += t, this.figurePoints[3].x -= t, this.figurePoints[3].y += t, parseInt(this.figurePoints[0].x) < 0 ? (i.x = Math.abs(this.figurePoints[0].x), this.figurePoints[0].x = 0) : i.x = 0, parseInt(this.figurePoints[0].y) < 180 ? (i.y = Math.abs(180 - this.figurePoints[0].y), this.figurePoints[0].y = 180) : i.y = 0, parseInt(this.figurePoints[1].x) > MG.game.world.width ? (a.x = this.figurePoints[1].x - MG.game.world.width, this.figurePoints[1].x = MG.game.world.width) : a.x = 0, parseInt(this.figurePoints[1].y) < 180 ? (a.y = Math.abs(180 - this.figurePoints[1].y), this.figurePoints[1].y = 180) : a.y = 0, parseInt(this.figurePoints[2].x) > MG.game.world.width ? (n.x = this.figurePoints[2].x - MG.game.world.width, this.figurePoints[2].x = MG.game.world.width) : n.x = 0, parseInt(this.figurePoints[2].y) > MG.game.world.height ? (n.y = this.figurePoints[2].y - MG.game.world.height, this.figurePoints[2].y = MG.game.world.height) : n.y = 0, parseInt(this.figurePoints[3].x) < 0 ? (o.x = Math.abs(this.figurePoints[3].x), this.figurePoints[3].x = 0) : o.x = 0, parseInt(this.figurePoints[3].y) > MG.game.world.height ? (o.y = this.figurePoints[3].y - MG.game.world.height, this.figurePoints[3].y = MG.game.world.height) : o.y = 0, this.figurePoints[0].x -= a.x, this.figurePoints[0].y -= o.y, this.figurePoints[1].x += i.x, this.figurePoints[1].y -= n.y, this.figurePoints[2].x += o.x, this.figurePoints[2].y += a.y, this.figurePoints[3].x -= n.x, this.figurePoints[3].y += i.y, parseInt(this.figurePoints[0].x) < 0 && (this.figurePoints[0].x = 0), parseInt(this.figurePoints[0].y) < 180 && (this.figurePoints[0].y = 180), parseInt(this.figurePoints[1].x) > MG.game.world.width && (this.figurePoints[1].x = MG.game.world.width), parseInt(this.figurePoints[1].y) < 180 && (this.figurePoints[1].y = 180), parseInt(this.figurePoints[2].x) > MG.game.world.width && (this.figurePoints[2].x = MG.game.world.width), parseInt(this.figurePoints[2].y) > MG.game.world.height && (this.figurePoints[2].y = MG.game.world.height), parseInt(this.figurePoints[3].x) < 0 && (this.figurePoints[3].x = 0), parseInt(this.figurePoints[3].y) > MG.game.world.height && (this.figurePoints[3].y = MG.game.world.height), e()
}, FigureObject.prototype.DrawMask = function (e) {
    e.moveTo(this.figurePoints[0].x, this.figurePoints[0].y);
    for (var t = 0; t < this.figurePoints.length; t++) e.lineTo(this.figurePoints[t].x, this.figurePoints[t].y)
}, FigureObject.prototype.ColliderListener = function (e) {
    MG.game.physics.arcade.collide(this.walls, e)
}, FigureObject.prototype.HiddenFigure = function () {
    this.ReSetWalls(), this.figurePoints[0].x = -500, this.figurePoints[0].y = -500, this.figurePoints[1].x = -500, this.figurePoints[1].y = -500, this.figurePoints[2].x = -500, this.figurePoints[2].y = -500, this.figurePoints[3].x = -500, this.figurePoints[3].y = -500
}, AreaBar.prototype.GetIsHurryUp = function () {
    return this.isHurryUp
}, AreaBar.prototype.LoadingSprite = function () {
    this.bg = MG.game.add.sprite(MG.game.world.centerX, 163, "wall"), this.bg.scale.setTo(MG.game.world.width, 30), this.bg.anchor.setTo(.5), this.barGroup = MG.game.add.group(), this.barBGOption = {
        game: MG.game, packname: "atlas_UI", pngname: "gage_bg.png", x: 200, y: 164, w: MG.game.world.width - 200,
        h: 28, off_l: 20, off_r: 20, off_t: 0, off_b: 0
    }, this.barBG = uiManager.createImg9(this.barBGOption), this.barBG.scale.setTo(.999), this.barBG.anchor.setTo(0, .5), this.barGroup.add(this.barBG), this.barWarningOption = {
        game: MG.game, packname: "atlas_UI", pngname: "gage_warning.png", x: 200, y: 164, w: MG.game.world.width - 200,
        h: 28, off_l: 20, off_r: 20, off_t: 0, off_b: 0
    }, this.warningBG = uiManager.createImg9(this.barWarningOption), this.warningBG.scale.setTo(1), this.warningBG.anchor.setTo(0, .5), this.warningBG.visible = !1, this.barGroup.add(this.warningBG), this.barOption = {
        game: MG.game, packname: "atlas_UI", pngname: "gage.png", x: MG.game.world.width, y: 164,
        w: MG.game.world.width - 200, h: 28, off_l: 20, off_r: 20, off_t: 0, off_b: 0
    }, this.bar = uiManager.createImg9(this.barOption), this.bar.scale.setTo(1), this.bar.anchor.setTo(1, .5), this.barGroup.add(this.bar), this.bar_cover = MG.game.add.sprite(0, 164, "atlas_UI", "gage_cover.png"), this.bar_cover.anchor.setTo(0, .5), this.bar_cover.scale.setTo(1.13, 1), this.barGroup.add(this.bar_cover), MG.game.world.bringToTop(this.barGroup), this.paintedArea = 0, this.herry_up_event, this.oops_time_broken_spine = MG.game.add.spine(MG.game.world.centerX + 110, 165, "oops_time_broken"), this.time_top_icon_spine = MG.game.add.spine(40, 165, "time_top_icon"), this.time_top_icon_spine.setAnimationByName(0, "time_idle", !0), this.time_top_icon_spine.state.onComplete = function () {
    }, this.timerText = MG.game.add.bitmapText(125, 162, "numberFont_Pink", "Bitmap Fonts!", 32), this.timerText.anchor.setTo(.5), this.SetTimeFormat(timer), this.UpdateBarGauge(timer)
}, AreaBar.prototype.StartWarning = function (e) {
    this.HerryUp_Timer_Start(e), this.herry_up_event = MG.game.time.events.repeat(.5 * Phaser.Timer.SECOND, 20, this.FlipWarningBG, this)
}, AreaBar.prototype.StopWarning = function () {
    this.HerryUp_Timer_Stop(), this.warningBG.visible = !1, MG.game.time.events.remove(this.herry_up_event)
}, AreaBar.prototype.FlipWarningBG = function () {
    this.warningBG.visible = !this.warningBG.visible
}, AreaBar.prototype.HerryUp_Timer_Start = function (e) {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_hurryUp"), this.isHurryUp = !0, e && (this.time_top_icon_spine.setAnimationByName(0, "time_hurry_up", !0), this.time_top_icon_spine.state.onComplete = function () {
    })
}, AreaBar.prototype.HerryUp_Timer_Stop = function () {
    this.isHurryUp = !1, this.time_top_icon_spine.setAnimationByName(0, "time_idle", !0), this.time_top_icon_spine.state.onComplete = function () {
    }
}, AreaBar.prototype.OOPS_Time_Broken = function () {
    this.oops_time_broken_spine.setAnimationByName(0, "oop_time_broken", !1), MG.game.world.bringToTop(this.oops_time_broken_spine)
}, AreaBar.prototype.GetJustPaintingRatio = function (e) {
    return this.paintedArea += e, this.UpdateBarGauge(), (e / this.totalTimer).toFixed(2)
}, AreaBar.prototype.UpdateBarGauge = function (e) {
    e >= DEFAULT_TIME_COUNT && (e = DEFAULT_TIME_COUNT);
    var t = parseInt((MG.game.world.width - 200) / DEFAULT_TIME_COUNT * (DEFAULT_TIME_COUNT - e));
    this.bar.position.setTo(MG.game.world.width - t, 164), this.SetTimeFormat(e)
}, AreaBar.prototype.SetTimeFormat = function (e) {
    var t;
    if (e <= 0) return t = "00:00", this.timerText.setText(t.toString()), void this.HerryUp_Timer_Stop();
    var i = Math.floor(e / 60), a = Math.floor(e % 60);
    t = i > 0 ? a >= 10 ? "0" + i.toString() + ":" + a.toString() : "0" + i.toString() + ":0" + a.toString() : a >= 10 ? "00:" + a.toString() : "00:0" + a.toString(), this.timerText.setText(t.toString())
};
var _actionManager = _actionManager || {};
_actionManager.Instance = function () {
    function e() {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_go")
    }

    var t, i, a = {}, o = 0, n = !1;
    return a.Ready = function () {
        o = 0, t = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "basic_game_animation"), i = MG.game.add.spine(-1e3, -1e3, "shield_broken")
    }, a.FindSpineNode = function (e, t) {
        return e.children[e.skeleton.findSlotIndex(t)]
    }, a.SetSmoothRefillTime = function (e) {
        n = e, e && StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_increase", !0)
    }, a.Button_Click_Effect = function (e, t) {
        e.inputEnabled = !1, void 0 != t && MG.game.add.tween(t.scale).from({
            x: 1.1, y: 1.1
        }, 150, Phaser.Easing.Cubic.Out, !0), MG.game.add.tween(e.scale).from({
            x: 1.1, y: 1.1
        }, 150, Phaser.Easing.Cubic.Out, !0).onComplete.add(function () {
            e.inputEnabled = !0, MG.game.add.tween(e.scale).from({
                x: 1, y: 1
            }, 150, Phaser.Easing.Linear.None, !0), void 0 != t && MG.game.add.tween(t.scale).from({
                x: 1, y: 1
            }, 150, Phaser.Easing.Linear.None, !0)
        }, this)
    }, a.GameFail = function () {
        ballManager.VisibleBalls(!0), MG.game.time.events.add(500, a.ActionGameFail, this)
    }, a.GameSuccess = function () {
        MG.game.time.events.add(500, a.ActionGameSuccess, this)
    }, a.Shutdown = function () {
        o = 0
    }, a.ReadyGoAnimation = function () {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_start"), stateManager.onUIMessage(), playCount <= 1 ? (t.setAnimationByName(0, "ready_go", !1), StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_ready"), MG.game.time.events.add(1500, e, this)) : (t.setAnimationByName(0, "go", !1), StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_go")), COMPLETE_AREA > .79 && COMPLETE_AREA < .81 ? uiManager.SetMissionValueText("80%") : COMPLETE_AREA > .74 && COMPLETE_AREA < .76 ? uiManager.SetMissionValueText("75%") : COMPLETE_AREA > .69 && COMPLETE_AREA < .71 ? uiManager.SetMissionValueText("70%") : COMPLETE_AREA > .64 && COMPLETE_AREA < .66 ? uiManager.SetMissionValueText("65%") : COMPLETE_AREA > .59 && COMPLETE_AREA < .61 ? uiManager.SetMissionValueText("60%") : COMPLETE_AREA > .54 && COMPLETE_AREA < .56 ? uiManager.SetMissionValueText("55%") : COMPLETE_AREA > .49 && COMPLETE_AREA < .51 && uiManager.SetMissionValueText("50%"), t.state.onComplete = function () {
            isReady = !0, stateManager.offUIMessage(), Game.prototype.StartGame()
        }
    }, a.ClearAnimation = function () {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_clear"), stateManager.onUIMessage(), MG.game.world.bringToTop(t), t.setAnimationByName(0, "clear", !1), t.state.onComplete = function () {
            stateManager.offUIMessage(), a.ActionGameSuccess()
        }
    }, a.TimeOverAnimation = function () {
        globalTouchInput = !1, StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_time_over"), MG.game.world.bringToTop(t), t.setAnimationByName(0, "time_over_in", !1), t.state.onComplete = function () {
            stateManager.offTimeOver(), uiManager.OpenContinueWindow()
        }
    }, a.WidthOutCallBack_Animation = function (e) {
        "oops" != e && ("hurry_up" == e ? stateManager.onHurryUp() : stateManager.onUIMessage(), assetManager.PauseTimer(), MG.game.world.bringToTop(t), t.setAnimationByName(0, e, !1), t.state.onComplete = function () {
            stateManager.offUIMessage(), stateManager.offHurryUp(), assetManager.ResumeTimer()
        })
    }, a.Shield_Broken_Animation = function (e, t) {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_shield"), i.position.setTo(e, t), i.setAnimationByName(0, "shield_broken", !1), i.state.onComplete = function () {
            i.position.setTo(-1e3, -1e3)
        }
    }, a.NewRecordAnimation = function () {
        stateManager.onUIMessage(), MG.game.world.bringToTop(t), t.setAnimationByName(0, "new_record", !1), t.state.onComplete = function () {
            stateManager.offUIMessage(), stageManager.IsJustMonthsOpen() ? uiManager.OpenMonthsOpenWindow() : Game.prototype.StartGame_ReadyGoAnimation()
        }
    }, a.OnUpdate = function () {
        n && (assetManager.AddTime(2), timer >= DEFAULT_TIME_COUNT && (n = !1, timer = DEFAULT_TIME_COUNT, assetManager.StopWarning(), stateManager.offContinue(), stateManager.offHurryUp(), StorageManager.prototype.get("isSfx") && MG.StopAudio("se_increase"), Game.prototype.PlayContinueGame()))
    }, a.ActionGameFail = function () {
        switch (o++) {
            case 0:
                assetManager.PauseTimer(), ballManager.AllKillBalls();
                break;
            case 1:
                figureManager.DeleteAllFigure(), MG.game.time.events.add(500, a.ActionGameFail, this);
                break;
            case 2:
                timer = DEFAULT_TIME_COUNT, o = 0, uiManager.Create_GameOverWindow()
        }
    }, a.ActionGameSuccess = function () {
        if (0 != stateManager.IsGameSuccess()) switch (o++) {
            case 0:
                (isSuperItem || stateManager.IsStopSkill()) && buffItemManager.Deactive_BuffItem(), a.ClearAnimation();
                break;
            case 1:
                ballManager.AllKillBalls();
                break;
            case 2:
                figureManager.DeleteAllFigure(), MG.game.time.events.add(1e3, a.ActionGameSuccess, this);
                break;
            case 3:
                o = 0, figureManager.FinishAnimation_Boolean(!1), Game.prototype.ReStartGame()
        } else o = 0
    }, a
}();
var _stageManager = _stageManager || {};
_stageManager.Instance = function () {
    function e() {
        s.normal_ball = 0, s.fast_ball = 0, s.slow_ball = 0, s.blink_ball = 0, s.split_ball = 0
    }

    function t() {
        for (var t = !0; t;) {
            var i = h;
            for (e(); i > 0;) {
                switch (getRandomIntInclusive(0, 4)) {
                    case 0:
                        i -= MG.gameSheetsData.NormalBallPoint, s.normal_ball++;
                        break;
                    case 1:
                        i -= MG.gameSheetsData.FastBallPoint, s.fast_ball++;
                        break;
                    case 2:
                        i -= MG.gameSheetsData.SlowBallPoint, s.slow_ball++;
                        break;
                    case 3:
                        i -= MG.gameSheetsData.BlinkBallPoint, s.blink_ball++;
                        break;
                    case 4:
                        i -= MG.gameSheetsData.SplitBallPoint, s.split_ball++
                }
                if (0 == i) {
                    t = !1;
                    break
                }
            }
        }
    }

    function i() {
        l = getRandomIntInclusive(p.min, p.max)
    }

    function a() {
        r = getRandomIntInclusive(u.min, u.max)
    }

    var o = {}, n = !1, s = {normal_ball: 0, fast_ball: 0, slow_ball: 0, blink_ball: 0, split_ball: 0}, l = 0, r = 0,
        h = 0, p = {min: 0, max: 0}, u = {min: 0, max: 0}, m = 0;
    return o.GetIsOpenJumpMonthsWindow = function () {
        return n
    }, o.SetIsOpenJumpMonthsWindow = function (e) {
        n = e
    }, o.GetIsOpenJumpMonthsCount = function () {
        for (var e = uData.nStage; e > 10; e--) if (e % 10 == 1) return e
    }, o.Get_Create_Balls_Count = function () {
        return 0 == s.normal_ball && o.Load_Random_Stage_Data(), s
    }, o.Get_Bomb_Ball_Count = function () {
        return l
    }, o.Get_Buff_Ball_Count = function () {
        return r
    }, o.Load_Random_Stage_Data = function () {
        if (uData.nStage <= 10) s.normal_ball = MG.gameSheetsData.StageData[uData.nStage].NormalBall, s.fast_ball = MG.gameSheetsData.StageData[uData.nStage].FastBall, s.slow_ball = MG.gameSheetsData.StageData[uData.nStage].SlowBall, s.blink_ball = MG.gameSheetsData.StageData[uData.nStage].BlinkBall, s.split_ball = MG.gameSheetsData.StageData[uData.nStage].SplitBall, p.min = MG.gameSheetsData.RandomStageData[0].Bomb_Min, p.max = MG.gameSheetsData.RandomStageData[0].Bomb_Max, u.min = MG.gameSheetsData.RandomStageData[0].ItemBox_Min, u.max = MG.gameSheetsData.RandomStageData[0].ItemBox_Max, m = MG.gameSheetsData.RandomStageData[0].DamageTime, i(), a(); else {
            for (var e = !1, o = 1; o < MG.gameSheetsData.RandomStageData.length; o++) if (uData.nStage < MG.gameSheetsData.RandomStageData[o].StartNumber) {
                h = MG.gameSheetsData.RandomStageData[o - 1].BallTotalCount, p.min = MG.gameSheetsData.RandomStageData[o - 1].Bomb_Min, p.max = MG.gameSheetsData.RandomStageData[o - 1].Bomb_Max, u.min = MG.gameSheetsData.RandomStageData[o - 1].ItemBox_Min, u.max = MG.gameSheetsData.RandomStageData[o - 1].ItemBox_Max, m = MG.gameSheetsData.RandomStageData[o - 1].DamageTime, e = !0;
                break
            }
            0 == e && (h = MG.gameSheetsData.RandomStageData[MG.gameSheetsData.RandomStageData.length - 1].BallTotalCount, p.min = MG.gameSheetsData.RandomStageData[MG.gameSheetsData.RandomStageData.length - 1].Bomb_Min, p.max = MG.gameSheetsData.RandomStageData[MG.gameSheetsData.RandomStageData.length - 1].Bomb_Max, u.min = MG.gameSheetsData.RandomStageData[MG.gameSheetsData.RandomStageData.length - 1].ItemBox_Min, u.max = MG.gameSheetsData.RandomStageData[MG.gameSheetsData.RandomStageData.length - 1].ItemBox_Max, m = MG.gameSheetsData.RandomStageData[MG.gameSheetsData.RandomStageData.length - 1].DamageTime), t(), i(), a()
        }
    }, o.GetSeason12 = function (e) {
        var t = e % 36;
        return 0 == t && (t = 36), 0 == (t %= 12) && (t = 12), t
    }, o.GetSeason36 = function (e) {
        var t = e % 36;
        return 0 === t && (t = 36), t
    }, o.IsJustMonthsOpen = function () {
        return !!n || !(uData.nStage < 10 || uData.nStage < parseInt(uData.nBestScore + 1)) && uData.nStage % 10 == 1
    }, o.IsOpenJumpMonths = function (e, t) {
        if (e <= uData.nBestScore) n = !1; else for (var i = e; i <= t; i++) i % 10 == 1 && (n = !0)
    }, o
}();
var _feverManager = _feverManager || {};
_feverManager.Instance = function () {
    function e() {
        feverCounter = 0, MG.game.world.bringToTop(a), a.setAnimationByName(0, "fever_roller", !1), a.state.onEvent = function (e, t) {
            StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_fever_play_02")
        }, a.state.onComplete = function () {
            currentScene = "game", Game.prototype.FeverModeSuccessGame()
        }
    }

    function t() {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_fever_play_01"), figureManager.DeleteAllFigure(), ballManager.AllKillBalls(), uiManager.CompletePaintingRatio(0), figureManager.FeverModeSuccess_LoadingSprites()
    }

    var i, a, o = {};
    return o.Start = function () {
        i = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "fever_text"), a = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "fever_roller")
    }, o.SuccessFever = function () {
        switch (++feverCounter) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                MG.game.world.bringToTop(i), assetManager.PauseTimer(), StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_fever_ready"), i.setAnimationByName(0, "fever_all", !1), i.state.onComplete = function () {
                    e(), MG.game.time.events.add(1500, t, this)
                }
        }
        MG.game.world.bringToTop(i)
    }, o
}();
var _ballManager = _ballManager || {}, normalBalls = [], fastBalls = [], slowBalls = [], blinkBalls = [],
    splitBalls = [], activeBalls = [], standByBalls = [], activeBuffBalls = [], activeBombBalls = [], bombBalls = [],
    bombBallSprites = [], ballSprites = [], buffBalls = [], buffBallSprites = [], deleteBalls = [], isDelete = !1,
    stopSkill_event, stopSkill_Blink_event;
_ballManager.Instance = function () {
    function e() {
        for (var e = 0; e < splitBalls.length; e++) splitBalls[e].SetActiveBlooen(!1)
    }

    function t() {
        u++;
        for (var e = 0; e < splitBalls.length; e++) splitBalls[e].IsActive() && splitBalls[e].PlayAnimation("split_ball_big_out", !1);
        MG.game.time.events.add(500, i, this)
    }

    function i() {
        for (var e = [], t = 0; t < activeBalls.length; t++) activeBalls[t].constructor == SplitBall && activeBalls[t].IsActive() && (e.push(t), activeBalls[t].PlayAnimation("split_ball_big_idle", !0), activeBalls[t].ActiveSplitSkill());
        if (!(e.length <= 0)) {
            var i = standByBalls.length, a = [];
            for (t = 0; t < i; t++) {
                var o = e.shift(),
                    n = {x: activeBalls[o].GetBallBody().position.x, y: activeBalls[o].GetBallBody().position.y};
                if (standByBalls[0].SetSplitCount(u), a.push(t), standByBalls[0].ActiveBall(!0), stateManager.IsStopSkill() ? standByBalls[0].SetVelocity(!1) : standByBalls[0].SetVelocity(!0), standByBalls[0].SetSpritePosition(n.x, n.y), standByBalls[0].VisibleBall(!0), standByBalls[0].PlayAnimation("split_ball_big_idle", !0), activeBalls.push(standByBalls[0]), ballSprites.push(standByBalls[0].GetBallBody()), standByBalls.shift(), e.length <= 0) break
            }
        }
    }

    function a() {
        var e = 0;
        if (stageManager.Load_Random_Stage_Data(), l = stageManager.Get_Create_Balls_Count(), activeBalls.length = 0, standByBalls.length = 0, activeBuffBalls.length = 0, activeBombBalls.length = 0, ballSprites.length = 0, buffBallSprites.length = 0, bombBallSprites.length = 0, 0 == create_20_balls) {
            for (e = 0; e < 10; e++) normalBalls[e] = new NormalBall, fastBalls[e] = new FastBall, slowBalls[e] = new SlowBall, blinkBalls[e] = new BlinkBall, splitBalls[e] = new SplitBall;
            create_20_balls = !0
        }
        for (e = 0; e < l.normal_ball; e++) e >= normalBalls.length && (normalBalls[e] = new NormalBall), normalBalls[e].Create(), normalBalls[e].Create_Physics(), normalBalls[e].Create_Events(), normalBalls[e].ActiveBall(!1), normalBalls[e].VisibleBall(!0), activeBalls.push(normalBalls[e]), ballSprites.push(normalBalls[e].GetBallBody()), 0 == e && stateManager.IsPlayTutorial() && normalBalls[e].Set_Force_Position(MG.game.world.centerX, 800);
        for (e = 0; e < l.fast_ball; e++) e >= fastBalls.length && (fastBalls[e] = new FastBall), fastBalls[e].Create(), fastBalls[e].Create_Physics(), fastBalls[e].Create_Events(), fastBalls[e].ActiveBall(!1), fastBalls[e].VisibleBall(!0), activeBalls.push(fastBalls[e]), ballSprites.push(fastBalls[e].GetBallBody());
        for (e = 0; e < l.slow_ball; e++) e >= slowBalls.length && (slowBalls[e] = new SlowBall), slowBalls[e].Create(), slowBalls[e].Create_Physics(), slowBalls[e].Create_Events(), slowBalls[e].ActiveBall(!1), slowBalls[e].VisibleBall(!0), activeBalls.push(slowBalls[e]), ballSprites.push(slowBalls[e].GetBallBody());
        for (e = 0; e < l.blink_ball; e++) e >= blinkBalls.length && (blinkBalls[e] = new BlinkBall), blinkBalls[e].Create(), blinkBalls[e].Create_Physics(), blinkBalls[e].Create_Events(), blinkBalls[e].ActiveBall(!1), blinkBalls[e].VisibleBall(!0), activeBalls.push(blinkBalls[e]), ballSprites.push(blinkBalls[e].GetBallBody());
        for (e = 0; e < 4 * l.split_ball; e++) splitBall_count = l.split_ball, e >= splitBalls.length && (splitBalls[e] = new SplitBall), splitBalls[e].Create(), splitBalls[e].Create_Physics(), splitBalls[e].Create_Events(), splitBalls[e].SetSplitCount(0), e < l.split_ball ? (splitBalls[e].ActiveBall(!1), splitBalls[e].VisibleBall(!0), activeBalls.push(splitBalls[e]), ballSprites.push(splitBalls[e].GetBallBody())) : (splitBalls[e].ActiveBall(!1), splitBalls[e].VisibleBall(!1), splitBalls[e].SetVelocity(!1), standByBalls.push(splitBalls[e]));
        var t = 0;
        for (e = 0; e < stageManager.Get_Bomb_Ball_Count(); e++) e >= bombBalls.length && (bombBalls[e] = new BombBall), bombBalls[e].Create(t++), bombBalls[e].Create_Physics(), bombBalls[e].Create_Events(), bombBalls[e].ActiveBall(!1), bombBalls[e].VisibleBall(!0), activeBombBalls.push(bombBalls[e]), bombBallSprites.push(bombBalls[e].GetBallBody()), MG.game.world.bringToTop(bombBalls[e].GetBallBody());
        for (t = 0, e = 0; e < stageManager.Get_Buff_Ball_Count(); e++) {
            if (stateManager.IsPlayTutorial()) return;
            e >= buffBalls.length && (buffBalls[e] = new BuffBall), buffBalls[e].Create(t++), buffBalls[e].Create_Physics(), buffBalls[e].Create_Events(), buffBalls[e].SetBuffType(buffItemManager.Get_BuffItem_Type()), buffBalls[e].ActiveBall(!1), buffBalls[e].VisibleBall(!0), activeBuffBalls.push(buffBalls[e]), buffBallSprites.push(buffBalls[e].GetBallBody()), MG.game.world.bringToTop(buffBalls[e].GetBallBody())
        }
    }

    function o(e, t) {
        void 0 != t && (0 == isSuperItem ? (p.KillBall(t), figureManager.CollisionLineHandler(t.position.x, t.position.y), gHeart <= 0 && this.ShakeCamera(), assetManager.UseHeart()) : deleteBalls.push(t))
    }

    function n() {
        deleteBalls.length > 0 ? (p.KillBall(deleteBalls.shift()), MG.game.time.events.add(150, n, this)) : isDelete = !1
    }

    function s(e, t) {
        void 0 != t && (p.KillBombBall(t), 0 == isSuperItem && (figureManager.CollisionLineHandler(t.position.x, t.position.y), figureManager.BombFigure(t.position.x, t.position.y), gHeart <= 0 && this.ShakeCamera(), assetManager.UseHeart()))
    }

    var l, r, h, p = {}, u = 0, m = 0;
    return p.Ready = function () {
        u = 0, r = 0, h = 0, m = uData.nStage, e()
    }, p.Start = function () {
        a(), p.Active_Move_Balls(!stateManager.IsPlayTutorial())
    }, p.Get_Current_Months_Count = function () {
        return m
    }, p.VisibleBalls = function (e) {
        MG.game.physics.arcade.isPaused = e;
        for (var t = 0; t < ballSprites.length; t++) ballSprites[t].visible = e;
        for (t = 0; t < bombBallSprites.length; t++) bombBallSprites[t].visible = e;
        for (t = 0; t < buffBallSprites.length; t++) buffBallSprites[t].visible = e;
        e && (MG.game.physics.arcade.isPaused = e)
    }, p.SplitBallSkill = function (e) {
        l.split_ball <= 0 || (parseFloat(e) > 50 && 0 == u ? (t(), MG.game.time.events.add(700, t, this)) : parseFloat(e) > 25 && 0 == u ? t() : parseFloat(e) > 50 && 1 == u && t())
    }, p.GetActiveBalls = function () {
        return activeBalls
    }, p.GetBallSplites = function () {
        return ballSprites
    }, p.GetBuffBalls = function () {
        return buffBalls
    }, p.GetBuffItemSplites = function () {
        return buffBallSprites
    }, p.GetBombBalls = function () {
        return bombBalls
    }, p.GetBombBallSprites = function () {
        return bombBallSprites
    }, p.BringToTopBuffBalls = function () {
        for (var e = 0; e < buffBallSprites.length; e++) MG.game.world.bringToTop(buffBallSprites[e]);
        for (e = 0; e < bombBallSprites.length; e++) MG.game.world.bringToTop(bombBallSprites[e])
    }, p.Active_Move_Balls = function (e) {
        var t = 0;
        for (t = 0; t < activeBalls.length; t++) activeBalls[t].SetVelocity(e);
        for (t = 0; t < activeBuffBalls.length; t++) activeBuffBalls[t].SetVelocity(e);
        for (t = 0; t < activeBombBalls.length; t++) activeBombBalls[t].SetVelocity(e)
    }, p.BallAndLineColliderListener = function (e) {
        0 == MG.game.physics.arcade.collide(e, ballSprites, o, null, this) && MG.game.physics.arcade.overlap(e, ballSprites, o, null, this), 0 == MG.game.physics.arcade.collide(e, bombBallSprites, s, null, this) && MG.game.physics.arcade.overlap(e, bombBallSprites, s, null, this), deleteBalls.length > 0 && 0 == isDelete && (isDelete = !0, n())
    }, p.CollisionBuffItemHandler = function (e) {
        void 0 != e && p.KillBuffBall(e)
    }, p.ShakeCamera = function () {
        MG.game.camera.shake(MG.gameSheetsData.Shake_intensity, MG.gameSheetsData.Shake_duration)
    }, p.StopSkill_Start = function () {
        r = MG.game.time.totalElapsedSeconds(), this.Active_Move_Balls(!1), stopSkill_event = MG.game.time.events.add(1e3 * MG.gameSheetsData.StopSkillTime, p.StopSkill_End, this), stopSkill_Blink_event = MG.game.time.events.add(1e3 * MG.gameSheetsData.StopSkillTime - 1e3 * MG.gameSheetsData.StopSkillBlinkTime, p.Active_Shake_Animation, this)
    }, p.StopSkill_ReStart = function () {
        p.StopSkill_Cancle(), p.StopSkill_Start()
    }, p.StopSkill_Pause = function () {
        h = MG.game.time.totalElapsedSeconds() - r, h *= 1e3, console.log("------ save_timeStamp = " + h), MG.game.time.events.remove(stopSkill_event), MG.game.time.events.remove(stopSkill_Blink_event)
    }, p.StopSkill_Resume = function () {
        r = 0;
        var e = 1e3 * MG.gameSheetsData.StopSkillTime, t = 1e3 * MG.gameSheetsData.StopSkillBlinkTime;
        stopSkill_event = MG.game.time.events.add(e - h, p.StopSkill_End, this), h < e - t && (stopSkill_Blink_event = MG.game.time.events.add(e - h - t, p.Active_Shake_Animation, this))
    }, p.StopSkill_End = function () {
        stateManager.offStopSkill(), this.Active_Move_Balls(!0), this.Active_Shake_Animation(!1), buffItemManager.Deactive_BuffItem()
    }, p.StopSkill_Cancle = function () {
        MG.game.time.events.remove(stopSkill_event), MG.game.time.events.remove(stopSkill_Blink_event), p.StopSkill_End()
    }, p.Active_Blink_Animation = function (e) {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_stop_relent");
        var t = 0;
        if (void 0 != e && null != e || (e = !0), e) for (t = 0; t < activeBalls.length; t++) activeBalls[t].Active_Blink_Mode(!0); else for (t = 0; t < activeBalls.length; t++) activeBalls[t].Active_Blink_Mode(!1)
    }, p.Active_Shake_Animation = function (e) {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_stop_relent");
        var t = 0;
        if (void 0 != e && null != e || (e = !0), e) for (t = 0; t < activeBalls.length; t++) activeBalls[t].Active_Shake_Mode(!0); else for (t = 0; t < activeBalls.length; t++) activeBalls[t].Active_Shake_Mode(!1)
    }, p.KillBall = function (e) {
        var t = ballSprites.indexOf(e);
        t < 0 || null != activeBalls[t] && void 0 != activeBalls[t] && (activeBalls[t].KillBall(), activeBalls.splice(t, 1), ballSprites.splice(t, 1))
    }, p.KillBuffBall = function (e) {
        for (var t = 0; t < activeBuffBalls.length; t++) activeBuffBalls[t].GetIndex() == e.GetIndex() && (activeBuffBalls[t].KillBall(!0), activeBuffBalls.splice(t, 1), buffBallSprites.splice(t, 1))
    }, p.KillBombBall = function (e) {
        var t = bombBallSprites.indexOf(e);
        t < 0 || null != activeBombBalls[t] && void 0 != activeBombBalls[t] && (activeBombBalls[t].KillBall(), activeBombBalls.splice(t, 1), bombBallSprites.splice(t, 1))
    }, p.AllKillBalls = function () {
        if (activeBuffBalls.length > 0) {
            for (var e = 0; e < activeBuffBalls.length; e++) activeBuffBalls[e].KillBall(!1);
            activeBuffBalls.length = 0
        }
        if (activeBombBalls.length > 0) {
            for (e = 0; e < activeBombBalls.length; e++) activeBombBalls[e].KillBall();
            activeBombBalls.length = 0
        }
        activeBalls.length > 0 ? (activeBalls.shift().KillBall(), MG.game.time.events.add(200, ballManager.AllKillBalls, this)) : stateManager.IsGameSuccess() ? actionManager.ActionGameSuccess() : stateManager.IsGameFail() && actionManager.ActionGameFail()
    }, p
}(), ScreenOutline_Animation.prototype.LoadingSprite = function () {
    var e = 1;
    for (e = 1; e < 4; e++) {
        t = "item_eff_1_" + e + ".png";
        (i = MG.game.add.sprite(MG.game.world.centerX, 180, "atlas_UI", t)).scale.setTo(1), i.anchor.setTo(.5, 0), i.visible = !1, this.top_sprite_data.push(i)
    }
    for (e = 1; e < 4; e++) {
        t = "item_eff_1_" + e + ".png";
        (i = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, "atlas_UI", t)).scale.setTo(1), i.anchor.setTo(.5, 1), i.visible = !1, this.down_sprite_data.push(i)
    }
    for (e = 1; e < 4; e++) {
        t = "item_eff_2_" + e + ".png";
        (i = MG.game.add.sprite(0, MG.game.world.centerY + 90, "atlas_UI", t)).scale.setTo(1, 1.02), i.anchor.setTo(0, .5), i.visible = !1, this.left_sprite_data.push(i)
    }
    for (e = 1; e < 4; e++) {
        var t = "item_eff_2_" + e + ".png",
            i = MG.game.add.sprite(MG.game.world.width, MG.game.world.centerY + 90, "atlas_UI", t);
        i.scale.setTo(1, 1.02), i.anchor.setTo(1, .5), i.visible = !1, this.right_sprite_data.push(i)
    }
}, ScreenOutline_Animation.prototype.Start_SpriteAnimation = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_item_idle", !0), this.iter = 0, this.anim_event = MG.game.time.events.loop(this.aniSpeed, this.Playing, this)
}, ScreenOutline_Animation.prototype.Stop_SpriteAnimation = function () {
    StorageManager.prototype.get("isSfx") && MG.StopAudio("se_item_idle"), MG.game.time.events.remove(this.anim_event), this.iter = 0, this.Visible_AllScrite(!1)
}, ScreenOutline_Animation.prototype.Playing = function () {
    this.Visible_AllScrite(!1), this.top_sprite_data[this.iter].visible = !0, MG.game.world.bringToTop(this.top_sprite_data[this.iter]), this.down_sprite_data[this.iter].visible = !0, MG.game.world.bringToTop(this.down_sprite_data[this.iter]), this.left_sprite_data[this.iter].visible = !0, MG.game.world.bringToTop(this.left_sprite_data[this.iter]), this.right_sprite_data[this.iter].visible = !0, MG.game.world.bringToTop(this.right_sprite_data[this.iter]), ++this.iter >= this.top_sprite_data.length && (this.iter = 0)
}, ScreenOutline_Animation.prototype.Visible_AllScrite = function (e) {
    var t = 0;
    for (t = 0; t < this.top_sprite_data.length; t++) this.top_sprite_data[t].visible = e;
    for (t = 0; t < this.down_sprite_data.length; t++) this.down_sprite_data[t].visible = e;
    for (t = 0; t < this.left_sprite_data.length; t++) this.left_sprite_data[t].visible = e;
    for (t = 0; t < this.right_sprite_data.length; t++) this.right_sprite_data[t].visible = e
};
var _uiManager = _uiManager || {}, monthsOpenWindow;
_uiManager.Instance = function () {
    function e() {
        t(!J.visible)
    }

    function t(e) {
        J.visible = e, V.visible = e
    }

    function i() {
        stateManager.onPauseWindow() && (L.togglePause(), T.VisibleWindow(!0))
    }

    function a() {
        var e = MG.game.add.sprite(0, 0, "atlas_UI", "a-01.png");
        e.scale.setTo(.7), e.anchor.setTo(.5, .5), v.add(e);
        var t = MG.game.add.sprite(75, 0, "atlas_UI", "a-00.png");
        t.scale.setTo(.7), t.anchor.setTo(.5, .5), t.angle = 90, t.inputEnabled = !0, t.events.onInputUp.add(o), v.add(t);
        var i = MG.game.add.sprite(-75, 0, "atlas_UI", "a-00.png");
        i.scale.setTo(.7), i.anchor.setTo(.5, .5), i.angle = 270, i.inputEnabled = !0, i.events.onInputUp.add(n), v.add(i);
        var a = MG.game.add.sprite(0, -75, "atlas_UI", "a-00.png");
        a.scale.setTo(.7), a.anchor.setTo(.5, .5), a.inputEnabled = !0, a.events.onInputUp.add(s), v.add(a);
        var r = MG.game.add.sprite(0, 75, "atlas_UI", "a-00.png");
        r.scale.setTo(.7), r.anchor.setTo(.5, .5), r.angle = 180, r.inputEnabled = !0, r.events.onInputUp.add(l), v.add(r), v.position.setTo(-500, -500), MG.game.world.bringToTop(v)
    }

    function o() {
        L.HiddenTouchInputUI(), figureManager.TouchInputUI("right")
    }

    function n() {
        L.HiddenTouchInputUI(), figureManager.TouchInputUI("left")
    }

    function s() {
        L.HiddenTouchInputUI(), figureManager.TouchInputUI("up")
    }

    function l() {
        L.HiddenTouchInputUI(), figureManager.TouchInputUI("down")
    }

    function r() {
        MG.game.add.tween(u.scale).to({
            x: 1.2, y: 1.2
        }, 200, Phaser.Easing.Quadratic.Out, !0), MG.game.add.tween(u.scale).to({
            x: 1, y: 1
        }, 100, Phaser.Easing.Quadratic.Out, !0, 200), MG.game.add.tween(m.scale).to({
            x: 1.2, y: 1.2
        }, 200, Phaser.Easing.Quadratic.Out, !0), MG.game.add.tween(m.scale).to({
            x: 1, y: 1
        }, 100, Phaser.Easing.Quadratic.Out, !0, 200)
    }

    function h() {
        D.position.setTo(-100, -100)
    }

    var p, u, m, g, _, d, c, y, f, B, M, S, T, G, w, b, x, I, v, P, C, E, k, D, A, U, O, F, R, N, J, V, W, L = {};
    return L.Start = function () {
        v = MG.game.add.group(), (P = MG.game.add.group()).position.setTo(0, 0), monthsOpenWindow = new UI_MonthsOpen, B = new UI_Title, M = new UI_TopCommon, S = new UI_UserItem, T = new UI_Pause, w = new UI_EndSuccessGame, b = new UI_MonthsJump, x = new UI_MonthsJump_Animation, I = new UI_Tutorial, G = new UI_Continue, (W = MG.game.time.create(!1)).loop(250, e, this)
    }, L.BlinkEffect_Mission = function (e) {
        e ? W.start() : (W.pause(), t(!0))
    }, L.LoadingAtlasData = function () {
        (F = MG.game.add.sprite(-1e3, -1e3, "atlas_UI", "a-01.png")).scale.setTo(0), F.anchor.setTo(.5), R = {
            game: MG.game, packname: "atlas_UI", pngname: "mission_bg.png", x: MG.game.world.centerX, y: 35, w: 250,
            h: 47, off_l: 15, off_r: 15, off_t: 15, off_b: 15
        }, (N = uiManager.createImg9(R)).anchor.setTo(.5, .5), N.alpha = .4, P.add(N), P.visible = !0, MG.game.world.bringToTop(P), (J = MG.game.add.sprite(MG.game.world.centerX - 50, 35, "atlas_UI", "mission.png")).scale.setTo(1), J.anchor.setTo(.5), (V = MG.game.add.bitmapText(MG.game.world.centerX + 65, 12, "numberFont_mission", "", 80)).anchor.setTo(.5), V.setText("0%"), (C = MG.game.add.sprite(40, 40, "atlas_UI", "month.png")).scale.setTo(1), C.anchor.setTo(.5, .5), C.events.onInputUp.add(function () {
            Game.prototype.DebugGotoNextStage(1)
        }), (O = MG.game.add.spine(40, 105, "shield_broken_ui")).setAnimationByName(0, "shield_broken_ui_idle", !0), O.state.onComplete = function () {
        }, O.scale.setTo(1), (E = MG.game.add.sprite(40, 105, "atlas_UI", "heart.png")).anchor.setTo(.5, .5), E.alpha = 0, E.events.onInputUp.add(function () {
            Game.prototype.DebugGotoBackStage(1)
        }), (k = MG.game.add.sprite(MG.game.world.width - 75, 75, "atlas_UI", "btn_pause.png")).scale.setTo(1), k.anchor.setTo(.5), k.inputEnabled = !0, k.events.onInputDown.add(function () {
            actionManager.Button_Click_Effect(k), MG.game.time.events.add(300, i, this)
        }), a()
    }, L.InputEnabled_PauseButton = function (e) {
        k.inputEnabled = e
    }, L.Shield_Broken_UI_Animation = function () {
        O.setAnimationByName(0, "shield_broken_ui_out", !1), O.state.onComplete = function () {
            O.setAnimationByName(0, "shield_broken_ui_idle", !0)
        }
    }, L.togglePause = function () {
        MG.game.physics.arcade.isPaused = !MG.game.physics.arcade.isPaused, MG.game.physics.arcade.isPaused ? (assetManager.PauseTimer(), stateManager.IsStopSkill() && ballManager.StopSkill_Pause()) : (assetManager.ResumeTimer(), stateManager.IsStopSkill() && ballManager.StopSkill_Resume())
    }, L.OpenContinueWindow = function () {
        G.VisibleWindow(!0), L.VisibleTopJewelryGroup(!0), L.togglePause()
    }, L.OnClick_GotoUserItem = function () {
        T.OnClick_GotoHomeButton_Start()
    }, L.VisibleTopJewelryGroup = function (e) {
        M.Using_View_Jewelry_Part(e)
    }, L.LoadingPencilSprite = function () {
        var e = MG.gameSheetsData.MonthsBackground[stageManager.GetSeason36(uData.nStage)].pencil;
        (D = MG.game.add.sprite(-100, -100, "atlas_pencil", e)).scale.setTo(1), D.anchor.setTo(0, 1)
    }, L.SetPaintingAreaText = function (e) {
        u.setText(e.toString()), m.setText(u.text.toString())
    }, L.SetMissionValueText = function (e) {
        V.setText(e)
    }, L.SetMonthsText = function (e) {
        var t = e;
        g.setText(t.toString()), _.setText(t.toString())
    }, L.SetHeartText = function (e) {
        d.setText(e.toString()), c.setText(e.toString())
    }, L.SetJewelryCount = function (e) {
        M.SetJewelryCount()
    }, L.SetupFont = function () {
        p = MG.game.add.group(), (m = MG.game.add.bitmapText(MG.game.world.centerX + 3, 108, "uiFontBlack", "Bitmap Fonts!", 52)).anchor.setTo(.5), m.alpha = .5, m.setText("0%"), p.add(m), (u = MG.game.add.bitmapText(MG.game.world.centerX, 105, "uiFont", "Bitmap Fonts!", 52)).anchor.setTo(.5), u.setText("0%"), p.add(u), (_ = MG.game.add.bitmapText(82, 42, "uiFontBlack", "Bitmap Fonts!", 40)).anchor.setTo(0, .5), _.alpha = .6, _.setText(uData.nStage.toString()), p.add(_), (g = MG.game.add.bitmapText(80, 40, "uiFont", "Bitmap Fonts!", 40)).anchor.setTo(0, .5), g.setText(uData.nStage.toString()), p.add(g), (c = MG.game.add.bitmapText(82, 105, "uiFontBlack", "Bitmap Fonts!", 40)).anchor.setTo(0, .5), c.alpha = .6, c.setText(gHeart), p.add(c), (d = MG.game.add.bitmapText(80, 103, "uiFont", "Bitmap Fonts!", 40)).anchor.setTo(0, .5), d.setText(gHeart), p.add(d), (f = MG.game.add.bitmapText(-100, -100, "uiFontBlack", "Bitmap Fonts!", 40)).anchor.setTo(.5), f.setText("0%"), (y = MG.game.add.bitmapText(-100, -100, "uiFont", "Bitmap Fonts!", 40)).anchor.setTo(.5), y.setText("0%"), MG.game.world.bringToTop(p)
    }, L.SetTouchInputUI = function (e, t) {
        v.visible = !0, v.position.setTo(e, t), MG.game.world.bringToTop(v), MG.game.time.events.add(3e3, L.HiddenTouchInputUI, this)
    }, L.HiddenTouchInputUI = function () {
        v.position.setTo(-1e3, -1e3), v.visible = !1
    }, L.Create_StartWindow = function () {
        playCount > 0 ? this.OnClickEvent_StartButton() : B.VisibleWindow(!0)
    }, L.OnClickEvent_StartButton = function () {
        isPlaying || (currentScene = "userItem", S.VisibleWindow(!0), M.VisibleWindow(!0))
    }, L.OnClickEvent_JumpButton = function () {
        b.VisibleWindow(!0), L.VisibleTopJewelryGroup(!0)
    }, L.OpenMonthsOpenWindow = function () {
        stageManager.SetIsOpenJumpMonthsWindow(!1), stateManager.onUIMessage(), monthsOpenWindow.VisibleWindow(!0), MG.game.time.events.add(2e3, L.CloseMonthsOpenWindow, this)
    }, L.CloseMonthsOpenWindow = function () {
        stateManager.offUIMessage(), L.VisibleTopJewelryGroup(!1), monthsOpenWindow.VisibleWindow(!1), Game.prototype.StartGame_ReadyGoAnimation()
    }, L.OnClickEvent_PlayButton = function () {
        S.OnClickEvent_PlayButton_Start()
    }, L.OnClickEvent_JumpAnimationButton = function () {
        ballManager.VisibleBalls(!1), b.VisibleWindow(!1), M.VisibleWindow(!1), S.VisibleWindow(!1), x.JumpAnimation_Ready()
    }, L.PlayGame = function () {
        playCount++, M.VisibleWindow(!1), Game.prototype.StartGame()
    }, L.ViewTutorial = function () {
        I.VisibleWindow(!0)
    }, L.isClickCloseEvent = function (e) {
        I.isClickCloseEvent(e)
    }, L.isOpenTutoriallWindow = function () {
        return I.isVisibleWindow()
    }, L.OnClick_SoundButton = function () {
    }, L.Create_GameOverWindow = function () {
        w.VisibleWindow(!0), w.Result_Action_State()
    }, L.OnClick_ReplayButton = function () {
        gHeart = DEFAULT_HEART_COUNT, isStart1stage = !0, console.log("=========== OnClick_ReplayButton.ReStartGame ============"), Game.prototype.ReStartGame()
    }, L.OnClick_GotoHomeButton = function () {
        Game.prototype.GotoHomeScene()
    }, L.ViewCompleteAreaRatio = function (e, t, i, a) {
        i <= 0 && (i = 1), A = i, f.scale.x = 0, f.scale.y = 0, f.alpha = .6, y.scale.x = 0, y.scale.y = 0, y.alpha = 1;
        var o = 0;
        o = t.x >= t.y ? t.y : t.x, o *= .01, e.x < 200 ? (f.anchor.setTo(0, .5), y.anchor.setTo(0, .5), e.x = 20) : e.x > MG.game.world.width - 200 ? (f.anchor.setTo(1, .5), y.anchor.setTo(1, .5), e.x = MG.game.world.width - 20) : (f.anchor.setTo(.5, .5), y.anchor.setTo(.5, .5)), o < .5 && (o = .5), o > 2.2 && (o = 2.2);
        var n = A.toFixed(1).toString() + "%";
        f.setText(n), f.position.setTo(e.x + 2, e.y + 2), y.setText(n), y.position.setTo(e.x, e.y), MG.game.add.tween(f.scale).to({
            x: o, y: o
        }, 300, Phaser.Easing.Linear.None, !0, a), MG.game.add.tween(f).to({alpha: 0}, 100, Phaser.Easing.Linear.None, !0, a + 500), MG.game.add.tween(y.scale).to({
            x: o, y: o
        }, 300, Phaser.Easing.Linear.None, !0, a), MG.game.add.tween(y).to({alpha: 0}, 100, Phaser.Easing.Linear.None, !0, a + 500)
    }, L.CompletePaintingRatio = function (e) {
        U = e, ballManager.SplitBallSkill(U);
        var t = e.toString() + "%";
        u.setText(t), m.setText(t), r()
    }, L.GetCompletePercent = function () {
        return U
    }, L.HandlePencil = function (e, t) {
        var i = A;
        A > 12 ? i = 12 : A < 3 && (i = 3), MG.game.world.bringToTop(D), D.position.x = e, D.position.y = t, D.scale.setTo(.1 * i)
    }, L.HiddenPencil = function () {
        MG.game.time.events.add(150, h, this)
    }, L.TouchRing_Animation = function (e, t) {
        F.position.setTo(e, t), F.alpha = 1, MG.game.add.tween(F.scale).to({
            x: 6, y: 6
        }, 350, Phaser.Easing.Linear.None, !0).onComplete.add(function () {
            F.scale.setTo(0)
        }), MG.game.add.tween(F).to({alpha: 0}, 250, Phaser.Easing.Linear.None, !0, 100)
    }, L.createImg9 = function (e) {
        void 0 == e.packname && (e.packname = e.pngname, e.pngname = void 0);
        var t = new PhaserNineSlice.NineSlice(e.game, e.x, e.y, e.packname, e.pngname, e.w, e.h, {
            top: e.off_t, bottom: e.off_b, left: e.off_l, right: e.off_r
        });
        return t.anchor.setTo(.5, .5), t
    }, L
}(), BallClass.prototype.Create = function () {
}, NormalBall.prototype.GetBallBody = function () {
    return this.myBall
}, NormalBall.prototype.VisibleBall = function (e) {
    this.myBall.visible = e
}, NormalBall.prototype.Create = function () {
    this.myBall = MG.game.add.sprite(-1e3, -1e3, "blank"), this.mySpine = MG.game.add.spine(0, 0, "enemy_balls"), this.mySpine.setAnimationByName(0, "basic_ball_idle", !0), this.myBall.scale.setTo(35), this.mySpine.scale.setTo(.028), this.myBall.anchor.setTo(.5)
}, NormalBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE), this.myBall.enableBody = !0
}, NormalBall.prototype.Create_Events = function () {
    this.speedEvent = MG.game.time.create(!1), this.speedEvent.loop(.5 * Phaser.Timer.SECOND, this.ConstrainVelocity, this), this.blinkEvent = MG.game.time.create(!1), this.blinkEvent.loop(.25 * Phaser.Timer.SECOND, this.Blink_Mode, this)
}, NormalBall.prototype.ActiveBall = function (e) {
    this.isActive = !0, this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100)), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine), this.SetVelocity(e)
}, NormalBall.prototype.Set_Force_Position = function (e, t) {
    this.myBall.position.setTo(e, t)
}, NormalBall.prototype.SetVelocity = function (e) {
    e ? (this.myVelocity.x = MG.game.rnd.integerInRange(parseInt(this.mySpeed * isUseSlowItem * .25), parseInt(this.mySpeed * isUseSlowItem * .75)), this.myVelocity.y = this.mySpeed * isUseSlowItem - this.myVelocity.x, 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.x *= -1), 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.y *= -1), this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(1), this.speedEvent.start()) : (this.myVelocity.x = 0, this.myVelocity.y = 0, this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(0), this.speedEvent.pause())
}, NormalBall.prototype.Active_Blink_Mode = function (e) {
    e ? this.blinkEvent.start() : (this.blinkEvent.pause(), this.VisibleBall(!0))
}, NormalBall.prototype.Blink_Mode = function () {
    this.VisibleBall(!this.myBall.visible)
}, NormalBall.prototype.Active_Shake_Mode = function (e) {
    e ? (this.savePosition.x = this.myBall.position.x, this.savePosition.y = this.myBall.position.y, this.shakeEvent = MG.game.time.create(!1), this.shakeEvent.loop(.001 * Phaser.Timer.SECOND, this.Shake_Playing, this), this.shakeEvent.start()) : void 0 != this.shakeEvent && this.shakeEvent.stop()
}, NormalBall.prototype.Shake_Playing = function () {
    if (0 == getRandomIntInclusive(0, 3)) this.myBall.position.setTo(this.savePosition.x, this.savePosition.y); else {
        var e = getRandomIntInclusive(-3, 3), t = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + e, this.myBall.position.y + t)
    }
}, NormalBall.prototype.ConstrainVelocity = function () {
    var e, t, i;
    t = this.myBall.body.velocity.x, i = this.myBall.body.velocity.y, e = Math.atan2(i, t), t = Math.cos(e) * (this.mySpeed * isUseSlowItem), i = Math.sin(e) * (this.mySpeed * isUseSlowItem), this.myBall.body.velocity.x = t, this.myBall.body.velocity.y = i
}, NormalBall.prototype.KillBall = function () {
    this.Active_Shake_Mode(!1), this.isActive = !1, this.speedEvent.stop(), StorageManager.prototype.get("isSfx") && 0 == stateManager.IsFeverMode() && MG.PlayAudio("se_crash"), this.myBall.body.velocity.setTo(0, 0), this.myBall.body.bounce.set(0), this.KillAnimation()
}, NormalBall.prototype.KillAnimation = function () {
    bombEffecter.Start_Bomb_Effect(this.myBall.position.x, this.myBall.position.y), MG.game.add.tween(this.myBall).to({alpha: 0}, 200, Phaser.Easing.Linear.None, !0).onComplete.add(function () {
        this.myBall.position.setTo(-1e3, -1e3), this.myBall.alpha = 1
    }, this)
}, BuffBall.prototype.GetBallBody = function () {
    return this.myBall
}, BuffBall.prototype.SetBuffType = function (e) {
    this.buffType = e
}, BuffBall.prototype.VisibleBall = function (e) {
    this.myBall.visible = e
}, BuffBall.prototype.Create = function (e) {
    this.index = e, this.myBall = MG.game.add.sprite(-1e3, -1e3, "blank"), this.mySpine = MG.game.add.spine(0, 0, "enemy_balls"), this.mySpine.setAnimationByName(0, "item_box_idle", !0), this.myBall.scale.setTo(50), this.mySpine.scale.setTo(.02), this.myBall.anchor.setTo(.5)
}, BuffBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE), this.myBall.enableBody = !0
}, BuffBall.prototype.Create_Events = function () {
    this.speedEvent = MG.game.time.create(!1), this.speedEvent.loop(.5 * Phaser.Timer.SECOND, this.ConstrainVelocity, this), this.blinkEvent = MG.game.time.create(!1)
}, BuffBall.prototype.GetIndex = function () {
    return this.index
}, BuffBall.prototype.ActiveBall = function () {
    this.isActive = !0, this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100)), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine), this.SetVelocity(!1)
}, BuffBall.prototype.Blink_Mode = function () {
    this.VisibleBall(!this.myBall.visible), this.blinkEvent = MG.game.time.events.add(300, this.Blink_Mode, this)
}, BuffBall.prototype.Active_Shake_Mode = function (e) {
    e ? (this.savePosition.x = this.myBall.position.x, this.savePosition.y = this.myBall.position.y, this.shakeEvent = MG.game.time.create(!1), this.shakeEvent.loop(.001 * Phaser.Timer.SECOND, this.Shake_Playing, this), this.shakeEvent.start()) : void 0 != this.shakeEvent && this.shakeEvent.stop()
}, BuffBall.prototype.Shake_Playing = function () {
    if (0 == getRandomIntInclusive(0, 3)) this.myBall.position.setTo(this.savePosition.x, this.savePosition.y); else {
        var e = getRandomIntInclusive(-3, 3), t = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + e, this.myBall.position.y + t)
    }
}, BuffBall.prototype.SetVelocity = function (e) {
    e ? (this.myVelocity.x = parseInt(this.mySpeed * isUseSlowItem * .5), this.myVelocity.y = this.mySpeed * isUseSlowItem - this.myVelocity.x, 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.x *= -1), 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.y *= -1), this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(1), this.speedEvent.start()) : (this.myVelocity.x = 0, this.myVelocity.y = 0, this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(0), this.speedEvent.pause())
}, BuffBall.prototype.ConstrainVelocity = function () {
    if (!1 !== this.isActive) {
        var e, t, i;
        (t = this.myBall.body.velocity.x) * t + (i = this.myBall.body.velocity.y) * i, e = Math.atan2(i, t), t = Math.cos(e) * (this.mySpeed * isUseSlowItem), i = Math.sin(e) * (this.mySpeed * isUseSlowItem), this.myBall.body.velocity.x = t, this.myBall.body.velocity.y = i
    }
}, BuffBall.prototype.KillBall = function (e) {
    this.Active_Shake_Mode(!1), this.isActive = !1, this.speedEvent.stop(), StorageManager.prototype.get("isSfx") && 0 == stateManager.IsFeverMode() && MG.PlayAudio("se_crash"), 0 == e && this.myBall.position.setTo(-1e3, -1e3), this.myBall.body.velocity.setTo(0, 0), this.myBall.body.bounce.set(0), this.myBall.enableBody = !1, e && this.KillAnimation()
}, BuffBall.prototype.KillAnimation = function () {
    switch (this.buffType) {
        case"super":
            isPlaying_SuperItem = !0, this.mySpine.setAnimationByName(0, "item_box_open_super", !1);
            break;
        case"stop":
            this.mySpine.setAnimationByName(0, "item_box_open_stop", !1);
            break;
        case"lifeUp":
            this.mySpine.setAnimationByName(0, "item_box_open_life_up", !1), buffItemManager.ScreenAnimation(!0);
            break;
        case"timePlus":
            this.mySpine.setAnimationByName(0, "item_box_open_time_plus", !1), buffItemManager.ScreenAnimation(!0);
            break;
        case"fever":
            this.mySpine.setAnimationByName(0, "item_box_open_fever", !1)
    }
    MG.game.world.bringToTop(this.mySpine), this.mySpine.state.onComplete = function () {
        "lifeUp" != this.buffType && "timePlus" != this.buffType || buffItemManager.ScreenAnimation(!1), buffItemManager.ActiveBuff(this.buffType)
    }.bind(this)
}, BombBall.prototype.GetBallBody = function () {
    return this.myBall
}, BombBall.prototype.VisibleBall = function (e) {
    this.myBall.visible = e
}, BombBall.prototype.Create = function (e) {
    this.index = e, this.myBall = MG.game.add.sprite(-1e3, -1e3, "blank"), this.mySpine = MG.game.add.spine(0, 0, "enemy_balls"), this.mySpine.setAnimationByName(0, "bomb_idle", !0), this.myBall.scale.setTo(35), this.mySpine.scale.setTo(.028), this.myBall.anchor.setTo(.5)
}, BombBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE), this.myBall.enableBody = !0
}, BombBall.prototype.Create_Events = function () {
    this.speedEvent = MG.game.time.create(!1)
}, BombBall.prototype.GetIndex = function () {
    return this.index
}, BombBall.prototype.ActiveBall = function (e) {
    this.isActive = !0, this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100)), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine), this.moveDir = MG.game.rnd.integerInRange(1, 2), this.SetVelocity(e)
}, BombBall.prototype.SetVelocity = function (e) {
    if (e) {
        switch (this.moveDir) {
            case 1:
                this.myVelocity.x = this.mySpeed * isUseSlowItem, this.myVelocity.y = 0, this.myVelocity.x *= -1;
                break;
            case 2:
                this.myVelocity.x = 0, this.myVelocity.y = this.mySpeed * isUseSlowItem, this.myVelocity.y *= -1
        }
        this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(1), this.speedEvent.start()
    } else this.myVelocity.x = 0, this.myVelocity.y = 0, this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(0), this.speedEvent.pause()
}, BombBall.prototype.Active_Blink_Mode = function (e) {
    e ? this.blinkEvent.start() : (this.blinkEvent.pause(), this.VisibleBall(!0))
}, BombBall.prototype.Blink_Mode = function () {
    this.VisibleBall(!this.myBall.visible)
}, BombBall.prototype.Active_Shake_Mode = function (e) {
    e ? (this.savePosition.x = this.myBall.position.x, this.savePosition.y = this.myBall.position.y, this.shakeEvent = MG.game.time.create(!1), this.shakeEvent.loop(.001 * Phaser.Timer.SECOND, this.Shake_Playing, this), this.shakeEvent.start()) : void 0 != this.shakeEvent && this.shakeEvent.stop()
}, BombBall.prototype.Shake_Playing = function () {
    if (0 == getRandomIntInclusive(0, 3)) this.myBall.position.setTo(this.savePosition.x, this.savePosition.y); else {
        var e = getRandomIntInclusive(-3, 3), t = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + e, this.myBall.position.y + t)
    }
}, BombBall.prototype.ConstrainVelocity = function () {
    if (!1 !== this.isActive) {
        var e, t, i;
        (t = this.myBall.body.velocity.x) * t + (i = this.myBall.body.velocity.y) * i, e = Math.atan2(i, t), t = Math.cos(e) * (this.mySpeed * isUseSlowItem), i = Math.sin(e) * (this.mySpeed * isUseSlowItem), this.myBall.body.velocity.x = t, this.myBall.body.velocity.y = i
    }
}, BombBall.prototype.KillBall = function () {
    this.Active_Shake_Mode(!1), this.isActive = !1, this.speedEvent.stop(), StorageManager.prototype.get("isSfx") && 0 == stateManager.IsFeverMode() && MG.PlayAudio("se_crash"), this.myBall.body.velocity.setTo(0, 0), this.myBall.body.bounce.set(0), this.KillAnimation()
}, BombBall.prototype.KillAnimation = function () {
    this.mySpine.setAnimationByName(0, "bomb_out", !1), this.mySpine.state.onComplete = function () {
        this.myBall.position.setTo(-1e3, -1e3)
    }.bind(this)
}, FastBall.prototype.GetBallBody = function () {
    return this.myBall
}, FastBall.prototype.VisibleBall = function (e) {
    this.myBall.visible = e
}, FastBall.prototype.Create = function () {
    this.myBall = MG.game.add.sprite(-1e3, -1e3, "blank"), this.mySpine = MG.game.add.spine(0, 0, "enemy_balls"), this.mySpine.setAnimationByName(0, "fast_ball_idle", !0), this.myBall.scale.setTo(35), this.mySpine.scale.setTo(.028), this.myBall.anchor.setTo(.5)
}, FastBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE), this.myBall.enableBody = !0
}, FastBall.prototype.Create_Events = function () {
    this.speedEvent = MG.game.time.create(!1), this.speedEvent.loop(.5 * Phaser.Timer.SECOND, this.ConstrainVelocity, this)
}, FastBall.prototype.ActiveBall = function (e) {
    this.isActive = !0, this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100)), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine), this.SetVelocity(e)
}, FastBall.prototype.SetVelocity = function (e) {
    e ? (this.myVelocity.x = MG.game.rnd.integerInRange(parseInt(this.mySpeed * isUseSlowItem * .25), parseInt(this.mySpeed * isUseSlowItem * .75)), this.myVelocity.y = this.mySpeed * isUseSlowItem - this.myVelocity.x, 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.x *= -1), 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.y *= -1), this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(1), this.speedEvent.start()) : (this.myVelocity.x = 0, this.myVelocity.y = 0, this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(0), this.speedEvent.pause())
}, FastBall.prototype.Active_Blink_Mode = function (e) {
    e ? this.blinkEvent.start() : (this.blinkEvent.pause(), this.VisibleBall(!0))
}, FastBall.prototype.Blink_Mode = function () {
    this.VisibleBall(!this.myBall.visible)
}, FastBall.prototype.Active_Shake_Mode = function (e) {
    e ? (this.savePosition.x = this.myBall.position.x, this.savePosition.y = this.myBall.position.y, this.shakeEvent = MG.game.time.create(!1), this.shakeEvent.loop(.001 * Phaser.Timer.SECOND, this.Shake_Playing, this), this.shakeEvent.start()) : void 0 != this.shakeEvent && this.shakeEvent.stop()
}, FastBall.prototype.Shake_Playing = function () {
    if (0 == getRandomIntInclusive(0, 3)) this.myBall.position.setTo(this.savePosition.x, this.savePosition.y); else {
        var e = getRandomIntInclusive(-3, 3), t = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + e, this.myBall.position.y + t)
    }
}, FastBall.prototype.ConstrainVelocity = function () {
    var e, t, i;
    t = this.myBall.body.velocity.x, i = this.myBall.body.velocity.y, e = Math.atan2(i, t), t = Math.cos(e) * (this.mySpeed * isUseSlowItem), i = Math.sin(e) * (this.mySpeed * isUseSlowItem), this.myBall.body.velocity.x = t, this.myBall.body.velocity.y = i
}, FastBall.prototype.KillBall = function () {
    this.Active_Shake_Mode(!1), this.isActive = !1, this.speedEvent.stop(), StorageManager.prototype.get("isSfx") && 0 == stateManager.IsFeverMode() && MG.PlayAudio("se_crash"), this.myBall.body.velocity.setTo(0, 0), this.myBall.body.bounce.set(0), this.KillAnimation()
}, FastBall.prototype.KillAnimation = function () {
    bombEffecter.Start_Bomb_Effect(this.myBall.position.x, this.myBall.position.y), MG.game.add.tween(this.myBall).to({alpha: 0}, 200, Phaser.Easing.Linear.None, !0).onComplete.add(function () {
        this.myBall.position.setTo(-1e3, -1e3), this.myBall.alpha = 1
    }, this)
}, SlowBall.prototype.GetBallBody = function () {
    return this.myBall
}, SlowBall.prototype.VisibleBall = function (e) {
    this.myBall.visible = e
}, SlowBall.prototype.Create = function () {
    this.myBall = MG.game.add.sprite(-1e3, -1e3, "blank"), this.mySpine = MG.game.add.spine(0, 0, "enemy_balls"), this.mySpine.setAnimationByName(0, "slow_ball_idle", !0), this.myBall.scale.setTo(35), this.mySpine.scale.setTo(.028), this.myBall.anchor.setTo(.5)
}, SlowBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE), this.myBall.enableBody = !0
}, SlowBall.prototype.Create_Events = function () {
    this.speedEvent = MG.game.time.create(!1), this.speedEvent.loop(.5 * Phaser.Timer.SECOND, this.ConstrainVelocity, this)
}, SlowBall.prototype.ActiveBall = function (e) {
    this.isActive = !0, this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100)), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine), this.SetVelocity(e)
}, SlowBall.prototype.SetVelocity = function (e) {
    e ? (this.myVelocity.x = MG.game.rnd.integerInRange(parseInt(this.mySpeed * isUseSlowItem * .25), parseInt(this.mySpeed * isUseSlowItem * .75)), this.myVelocity.y = this.mySpeed * isUseSlowItem - this.myVelocity.x, 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.x *= -1), 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.y *= -1), this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(1), this.speedEvent.start()) : (this.myVelocity.x = 0, this.myVelocity.y = 0, this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(0), this.speedEvent.pause())
}, SlowBall.prototype.Active_Blink_Mode = function (e) {
    e ? this.blinkEvent.start() : (this.blinkEvent.pause(), this.VisibleBall(!0))
}, SlowBall.prototype.Blink_Mode = function () {
    this.VisibleBall(!this.myBall.visible)
}, SlowBall.prototype.Active_Shake_Mode = function (e) {
    e ? (this.savePosition.x = this.myBall.position.x, this.savePosition.y = this.myBall.position.y, this.shakeEvent = MG.game.time.create(!1), this.shakeEvent.loop(.001 * Phaser.Timer.SECOND, this.Shake_Playing, this), this.shakeEvent.start()) : void 0 != this.shakeEvent && this.shakeEvent.stop()
}, SlowBall.prototype.Shake_Playing = function () {
    if (0 == getRandomIntInclusive(0, 3)) this.myBall.position.setTo(this.savePosition.x, this.savePosition.y); else {
        var e = getRandomIntInclusive(-3, 3), t = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + e, this.myBall.position.y + t)
    }
}, SlowBall.prototype.ConstrainVelocity = function () {
    var e, t, i;
    t = this.myBall.body.velocity.x, i = this.myBall.body.velocity.y, e = Math.atan2(i, t), t = Math.cos(e) * (this.mySpeed * isUseSlowItem), i = Math.sin(e) * (this.mySpeed * isUseSlowItem), this.myBall.body.velocity.x = t, this.myBall.body.velocity.y = i
}, SlowBall.prototype.KillBall = function () {
    this.Active_Shake_Mode(!1), this.isActive = !1, this.speedEvent.stop(), StorageManager.prototype.get("isSfx") && 0 == stateManager.IsFeverMode() && MG.PlayAudio("se_crash"), this.myBall.body.velocity.setTo(0, 0), this.myBall.body.bounce.set(0), this.KillAnimation()
}, SlowBall.prototype.KillAnimation = function () {
    bombEffecter.Start_Bomb_Effect(this.myBall.position.x, this.myBall.position.y), MG.game.add.tween(this.myBall).to({alpha: 0}, 200, Phaser.Easing.Linear.None, !0).onComplete.add(function () {
        this.myBall.position.setTo(-1e3, -1e3), this.myBall.alpha = 1
    }, this)
}, SplitBall.prototype.GetBallBody = function () {
    return this.myBall
}, SplitBall.prototype.VisibleBall = function (e) {
    this.myBall.visible = e
}, SplitBall.prototype.IsVisibleBall = function () {
    return this.myBall.visible
}, SplitBall.prototype.Create = function () {
    this.myBall = MG.game.add.sprite(-1e3, -1e3, "blank"), this.mySpine = MG.game.add.spine(0, 0, "enemy_balls"), this.mySpine.setAnimationByName(0, "split_ball_big_idle", !0), this.SetScale(), this.mySpine.scale.setTo(.028), this.myBall.anchor.setTo(.5)
}, SplitBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE), this.myBall.enableBody = !0, this.myBall.body.setSize(1.2, 1)
}, SplitBall.prototype.Create_Events = function () {
    this.speedEvent = MG.game.time.create(!1), this.speedEvent.loop(.5 * Phaser.Timer.SECOND, this.ConstrainVelocity, this)
}, SplitBall.prototype.SetScale = function () {
    switch (this.splitCount) {
        case 0:
            this.myBall.scale.setTo(87.5);
            break;
        case 1:
            this.myBall.scale.setTo(52.5);
            break;
        case 2:
            this.myBall.scale.setTo(17.5)
    }
}, SplitBall.prototype.Active_Blink_Mode = function (e) {
    e ? this.blinkEvent.start() : (this.blinkEvent.pause(), this.VisibleBall(!0))
}, SplitBall.prototype.Blink_Mode = function () {
    this.VisibleBall(!this.myBall.visible)
}, SplitBall.prototype.Active_Shake_Mode = function (e) {
    e ? (this.savePosition.x = this.myBall.position.x, this.savePosition.y = this.myBall.position.y, this.shakeEvent = MG.game.time.create(!1), this.shakeEvent.loop(.001 * Phaser.Timer.SECOND, this.Shake_Playing, this), this.shakeEvent.start()) : void 0 != this.shakeEvent && this.shakeEvent.stop()
}, SplitBall.prototype.Shake_Playing = function () {
    if (0 == getRandomIntInclusive(0, 3)) this.myBall.position.setTo(this.savePosition.x, this.savePosition.y); else {
        var e = getRandomIntInclusive(-3, 3), t = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + e, this.myBall.position.y + t)
    }
}, SplitBall.prototype.SetSplitCount = function (e) {
    this.splitCount = e, this.SetScale()
}, SplitBall.prototype.IsActive = function () {
    return this.isActive
}, SplitBall.prototype.SetActiveBlooen = function (e) {
    this.isActive = e
}, SplitBall.prototype.ActiveBall = function (e) {
    this.isActive = !0, this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100)), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine)
}, SplitBall.prototype.Action_Split = function (e, t, i) {
    this.isActive = !0, this.myBall.position.setTo(t, i), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine), this.SetVelocity(e)
}, SplitBall.prototype.SetVelocity = function (e) {
    e ? (this.myVelocity.x = MG.game.rnd.integerInRange(parseInt(this.mySpeed * isUseSlowItem * .25), parseInt(this.mySpeed * isUseSlowItem * .75)), this.myVelocity.y = this.mySpeed * isUseSlowItem - this.myVelocity.x, 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.x *= -1), 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.y *= -1), this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(1), this.speedEvent.start()) : (this.myVelocity.x = 0, this.myVelocity.y = 0, this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(0), this.speedEvent.pause())
}, SplitBall.prototype.SetSpritePosition = function (e, t) {
    this.myBall.position.setTo(e, t)
}, SplitBall.prototype.ConstrainVelocity = function () {
    var e, t, i;
    t = this.myBall.body.velocity.x, i = this.myBall.body.velocity.y, e = Math.atan2(i, t), t = Math.cos(e) * (this.mySpeed * isUseSlowItem), i = Math.sin(e) * (this.mySpeed * isUseSlowItem), this.myBall.body.velocity.x = t, this.myBall.body.velocity.y = i
}, SplitBall.prototype.PlayAnimation = function (e, t) {
    this.mySpine.setAnimationByName(0, e, t)
}, SplitBall.prototype.ActiveSplitSkill = function () {
    this.splitCount++, this.SetScale()
}, SplitBall.prototype.KillBall = function () {
    this.Active_Shake_Mode(!1), this.isActive = !1, this.speedEvent.stop(), StorageManager.prototype.get("isSfx") && 0 == stateManager.IsFeverMode() && MG.PlayAudio("se_crash"), this.myBall.body.velocity.setTo(0, 0), this.myBall.body.bounce.set(0), this.KillAnimation()
}, SplitBall.prototype.KillAnimation = function () {
    bombEffecter.Start_Bomb_Effect(this.myBall.position.x, this.myBall.position.y), MG.game.add.tween(this.myBall).to({alpha: 0}, 200, Phaser.Easing.Linear.None, !0).onComplete.add(function () {
        this.myBall.position.setTo(-1e3, -1e3), this.myBall.alpha = 1
    }, this)
}, BlinkBall.prototype.GetBallBody = function () {
    return this.myBall
}, BlinkBall.prototype.VisibleBall = function (e) {
    this.myBall.visible = e
}, BlinkBall.prototype.VisibleSpine = function (e) {
    this.mySpine.visible = e
},BlinkBall.prototype.Create = function () {
    this.isVisible = !0, this.myBall = MG.game.add.sprite(-1e3, -1e3, "blank"), this.mySpine = MG.game.add.spine(0, 0, "enemy_balls"), this.mySpine.setAnimationByName(0, "blink_ball_idle", !0), this.myBall.scale.setTo(35), this.mySpine.scale.setTo(.028), this.myBall.anchor.setTo(.5)
},BlinkBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE), this.myBall.enableBody = !0
},BlinkBall.prototype.Create_Events = function () {
    this.skillEvent = MG.game.time.create(!1), this.skillEvent.loop(Phaser.Timer.SECOND * (2 + Math.random()), this.Skill, this), this.speedEvent = MG.game.time.create(!1), this.speedEvent.loop(.5 * Phaser.Timer.SECOND, this.ConstrainVelocity, this)
},BlinkBall.prototype.ActiveBall = function (e) {
    this.isActive = !0, this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100)), this.mySpine.position.setTo(0, 0), this.myBall.addChild(this.mySpine), this.SetVelocity(e)
},BlinkBall.prototype.SetVelocity = function (e) {
    e ? (this.myVelocity.x = MG.game.rnd.integerInRange(parseInt(this.mySpeed * isUseSlowItem * .25), parseInt(this.mySpeed * isUseSlowItem * .75)), this.myVelocity.y = this.mySpeed * isUseSlowItem - this.myVelocity.x, 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.x *= -1), 1 === MG.game.rnd.integerInRange(1, 2) && (this.myVelocity.y *= -1), this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(1), this.skillEvent.start(), this.speedEvent.start()) : (this.myVelocity.x = 0, this.myVelocity.y = 0, this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y), this.myBall.body.bounce.set(0), this.speedEvent.pause())
},BlinkBall.prototype.Active_Blink_Mode = function (e) {
},BlinkBall.prototype.Blink_Mode = function () {
},BlinkBall.prototype.Active_Shake_Mode = function (e) {
    e ? (this.savePosition.x = this.myBall.position.x, this.savePosition.y = this.myBall.position.y, this.shakeEvent = MG.game.time.create(!1), this.shakeEvent.loop(.001 * Phaser.Timer.SECOND, this.Shake_Playing, this), this.shakeEvent.start()) : void 0 != this.shakeEvent && this.shakeEvent.stop()
},BlinkBall.prototype.Shake_Playing = function () {
    if (0 == getRandomIntInclusive(0, 3)) this.myBall.position.setTo(this.savePosition.x, this.savePosition.y); else {
        var e = getRandomIntInclusive(-3, 3), t = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + e, this.myBall.position.y + t)
    }
},BlinkBall.prototype.Skill = function () {
    this.isVisible ? this.mySpine.setAnimationByName(0, "blink_ball_out", !1) : this.mySpine.setAnimationByName(0, "blink_ball_in", !1), this.isVisible = !this.isVisible
},BlinkBall.prototype.ConstrainVelocity = function () {
    var e, t, i;
    t = this.myBall.body.velocity.x, i = this.myBall.body.velocity.y, e = Math.atan2(i, t), t = Math.cos(e) * (this.mySpeed * isUseSlowItem), i = Math.sin(e) * (this.mySpeed * isUseSlowItem), this.myBall.body.velocity.x = t, this.myBall.body.velocity.y = i
},BlinkBall.prototype.KillBall = function () {
    this.Active_Shake_Mode(!1), this.isActive = !1, this.skillEvent.stop(), this.speedEvent.stop(), StorageManager.prototype.get("isSfx") && 0 == stateManager.IsFeverMode() && MG.PlayAudio("se_crash"), this.myBall.body.velocity.setTo(0, 0), this.myBall.body.bounce.set(0), this.KillAnimation()
},BlinkBall.prototype.KillAnimation = function () {
    bombEffecter.Start_Bomb_Effect(this.myBall.position.x, this.myBall.position.y), MG.game.add.tween(this.myBall).to({alpha: 0}, 200, Phaser.Easing.Linear.None, !0).onComplete.add(function () {
        this.myBall.position.setTo(-1e3, -1e3), this.myBall.alpha = 1
    }, this)
};
var _bombEffecter = _bombEffecter || {};
_bombEffecter.Instance = function () {
    var e = {}, t = ["bomb_spring", "bomb_summer", "bomb_autumn", "bomb_winter"], i = [, , , , ,], a = [, , , , ,],
        o = [, , , , ,], n = [, , , , ,], s = 0, l = 0, r = 0, h = 0;
    return e.Ready = function () {
        for (var e = 0; e < 5; e++) i[e] = MG.game.add.spine(-1e3, 0, "bomb_autumn"), a[e] = MG.game.add.spine(-1e3, 0, "bomb_spring"), o[e] = MG.game.add.spine(-1e3, 0, "bomb_summer"), n[e] = MG.game.add.spine(-1e3, 0, "bomb_winter")
    }, e.Init = function () {
        for (var e = 0; e < 5; e++) i[e].position.setTo(-1e3, 0), a[e].position.setTo(-1e3, 0), o[e].position.setTo(-1e3, 0), n[e].position.setTo(-1e3, 0);
        s = 0, l = 0, r = 0, h = 0
    }, e.Start_Bomb_Effect = function (e, p) {
        var u = parseInt((stageManager.GetSeason12(ballManager.Get_Current_Months_Count()) - 1) / 3);
        switch (t[u].toString()) {
            case"bomb_autumn":
                i[s].position.setTo(e, p), i[s].setAnimationByName(0, "bomb_autumn", !1), ++s >= 5 && (s = 0);
                break;
            case"bomb_spring":
                a[l].position.setTo(e, p), a[l].setAnimationByName(0, "bomb_spring", !1), ++l >= 5 && (l = 0);
                break;
            case"bomb_summer":
                o[r].position.setTo(e, p), o[r].setAnimationByName(0, "bomb_summer", !1), ++r >= 5 && (r = 0);
                break;
            case"bomb_winter":
                n[h].position.setTo(e, p), n[h].setAnimationByName(0, "bomb_winter", !1), ++h >= 5 && (h = 0)
        }
    }, e
}();
var _userItemManager = _userItemManager || {};
_userItemManager.Instance = function () {
    var e, t = {}, i = 0;
    return t.Start = function () {
        e = new UI_UserItem_Display
    }, t.SetupItemSkill = function (t, a, o) {
        i = 0, t && (i++, isUseTimeItem = !0), a && (i++, console.log("=== Time Slow ==="), isUseSlowItem = MG.gameSheetsData.SlowItemSkill), o && (i++, console.log("=== Time Life ==="), gHeart += MG.gameSheetsData.LifeItemSkill), e.SetUseItemPosition(t, a, o)
    }, t.GetUserSelectedCount = function () {
        return i++
    }, t.DisplayUserItem = function () {
        i > 0 ? (e.VisibleWindow(!0), MG.game.time.events.add(3e3, t.HiddenUserItem, this)) : Game.prototype.StartGame_ReadyGoAnimation()
    }, t.HiddenUserItem = function () {
        e.VisibleWindow(!1), Game.prototype.StartGame_ReadyGoAnimation()
    }, t
}();
var _buffItemManager = _buffItemManager || {}, inOrder_iter = -1;
_buffItemManager.Instance = function () {
    function e() {
        var e, t = 0, i = getRandomIntInclusive(1, 100);
        return i > 0 && i <= MG.gameSheetsData.SuperRatio && (e = "super"), t = MG.gameSheetsData.SuperRatio, i > t && i <= t + MG.gameSheetsData.StopRatio && (e = "stop"), t += MG.gameSheetsData.StopRatio, i > t && i <= t + MG.gameSheetsData.ShieldRatio && (e = "lifeUp"), t += MG.gameSheetsData.ShieldRatio, i > t && i <= t + MG.gameSheetsData.TimeUpRatio && (e = "timePlus"), t += MG.gameSheetsData.TimeUpRatio, i > t && i <= t + MG.gameSheetsData.FeverRatio && (e = "fever"), e
    }

    function t() {
        return ++inOrder_iter >= s.length && (inOrder_iter = 0), s[inOrder_iter]
    }

    function i(e, t) {
        return e.children[e.skeleton.findSlotIndex(t)]
    }

    var a, o, n = {}, s = ["super", "stop", "lifeUp", "timePlus", "fever"];
    return n.Ready = function () {
        a = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "buff_item_info"), this.Deactive_BuffItem();
        var e = {font: "30px Arial", fill: "#ffffff", align: "center", fontWeight: "bold"},
            t = MG.game.add.text(0, 0, GetString("SUPER"), e);
        t.anchor.setTo(.5), t.strock = "#395d7b", t.strokeThickness = 4;
        var n = MG.game.add.text(0, 0, GetString("STOP", MG.gameSheetsData.StopSkillTime), e);
        n.anchor.setTo(.5), n.strock = "#395d7b", n.strokeThickness = 4;
        var s = i(a, "item_info_text_2"), l = i(a, "item_info_text_1");
        s.addChild(t), l.addChild(n), (o = new ScreenOutline_Animation(250)).LoadingSprite()
    }, n.ScreenAnimation = function (e) {
        e ? o.Start_SpriteAnimation() : o.Stop_SpriteAnimation()
    }, n.ActiveBuff = function (e) {
        switch (e) {
            case"super":
                "game" == currentScene && (isSuperItem = !0, this.Active_Super_BuffItem());
                break;
            case"stop":
                stateManager.onStopSkill() && (this.Active_Stop_BuffItem(), ballManager.StopSkill_Start());
                break;
            case"lifeUp":
                gHeart++, assetManager.UpdateHeartText();
                break;
            case"timePlus":
                assetManager.AddTime(30);
                break;
            case"fever":
                stateManager.onFeverMode() && feverManager.SuccessFever()
        }
    }, n.Get_BuffItem_Type = function () {
        return "random" == MG.gameSheetsData.BuffCreation ? e() : "inOrder" == MG.gameSheetsData.BuffCreation ? t() : MG.gameSheetsData.BuffCreation
    }, n.EndDrawLine_CallBack = function () {
        isSuperItem && (this.Deactive_BuffItem(), isSuperItem = !1)
    }, n.Active_Stop_BuffItem = function () {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_item_show"), a.visible = !0, a.setAnimationByName(0, "item_ani_stop_in", !0), MG.game.world.bringToTop(a), a.state.onComplete = function () {
            currentScene = "game", a.setAnimationByName(0, "item_ani_stop_idle", !0)
        }
    }, n.Deactive_BuffItem = function () {
        a.visible = !1
    }, n.Active_Super_BuffItem = function () {
        StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_item_show"), a.visible = !0, a.setAnimationByName(0, "item_ani_super_in", !0), MG.game.world.bringToTop(a), a.state.onComplete = function () {
            currentScene = "game", a.setAnimationByName(0, "item_ani_super_idle", !0)
        }
    }, n
}();
var _stateManager = _stateManager || {};
_stateManager.Instance = function () {
    var e = {}, t = !1, i = !1, a = !1, o = !1, n = !1, s = !1, l = !1, r = !1, h = !1, p = !1, u = !1, m = !1, g = !1;
    return e.Init = function () {
        t = !1, a = !1, o = !1, n = !1, s = !1, l = !1, r = !1, h = !1, p = !1, u = !1, m = !1, g = !1
    }, e.onGameTouch = function () {
        return !(m || u || p || h || n || a || o || t || r)
    }, e.onPlayTutorial = function () {
        return g = !0
    }, e.offPlayTutorial = function () {
        g = !1
    }, e.IsPlayTutorial = function () {
        return g
    }, e.onGameSuccess = function () {
        return !a && !t && (p = !0, s && assetManager.StopWarning(), p)
    }, e.offGameSuccess = function () {
        p = !1
    }, e.IsGameSuccess = function () {
        return p
    }, e.onGameFail = function () {
        return !a && (h = !0)
    }, e.offGameFail = function () {
        h = !1
    }, e.IsGameFail = function () {
        return h
    }, e.onLineDrawing = function () {
        u = !0
    }, e.offLineDrawing = function () {
        u = !1
    }, e.IsLineDrawing = function () {
        return u
    }, e.onMaskDrawing = function () {
        m = !0
    }, e.offMaskDrawing = function () {
        m = !1
    }, e.IsMaskDrawing = function () {
        return m
    }, e.onPauseWindow = function () {
        return !(r || p || h || n || s || a || o || t || i) && (r = !0)
    }, e.offPauseWindow = function () {
        r = !1
    }, e.IsPauseWindow = function () {
        return r
    }, e.onUIMessage = function () {
        return !n && (n = !0)
    }, e.offUIMessage = function () {
        n = !1
    }, e.IsUIMessage = function () {
        return n
    }, e.onHurryUp = function () {
        return !(s || o || p || h || a || t) && (s = !0)
    }, e.offHurryUp = function () {
        s = !1
    }, e.IsHurryUp = function () {
        return s
    }, e.onTimeOver = function () {
        return !t && (!a && (p && (p = !1), t = !0))
    }, e.offTimeOver = function () {
        t = !1
    }, e.IsTimeOver = function () {
        return t
    }, e.onContinue = function () {
        return 0 != t && (i = !0)
    }, e.offContinue = function () {
        i = !1
    }, e.IsContinue = function () {
        return i
    }, e.onFeverMode = function () {
        return !a && (l && (ballManager.StopSkill_Cancle(), l = !1), a = !0)
    }, e.offFeverMode = function () {
        a = !1
    }, e.IsFeverMode = function () {
        return a
    }, e.onStopSkill = function () {
        return !(l || t || a || o || p || h) && (l ? ballManager.StopSkill_ReStart() : l = !0, l)
    }, e.offStopSkill = function () {
        l = !1
    }, e.IsStopSkill = function () {
        return l
    }, e
}();
var _shopManager = _shopManager || {};
_shopManager.Instance = function () {
    function e(e) {
        switch (e) {
            case 0:
                return uData.nJewelryCoolTime0 <= 0 || null == uData.nJewelryCoolTime0 || MG.game.time.time > uData.nJewelryCoolTime0 ? (void 0 == h[0] && null == h[0] || MG.game.time.events.remove(h[0]), "none") : (h[0] = MG.game.time.events.loop(Phaser.Timer.SECOND, t, this), n(uData.nJewelryCoolTime0 - MG.game.time.time));
            case 1:
                return uData.nJewelryCoolTime1 <= 0 || null == uData.nJewelryCoolTime1 || MG.game.time.time > uData.nJewelryCoolTime1 ? (void 0 == h[1] && null == h[1] || MG.game.time.events.remove(h[1]), "none") : (h[1] = MG.game.time.events.loop(Phaser.Timer.SECOND, i, this), n(uData.nJewelryCoolTime1 - MG.game.time.time));
            case 2:
                return uData.nJewelryCoolTime2 <= 0 || null == uData.nJewelryCoolTime2 || MG.game.time.time > uData.nJewelryCoolTime2 ? (void 0 == h[2] && null == h[2] || MG.game.time.events.remove(h[2]), "none") : (h[2] = MG.game.time.events.loop(Phaser.Timer.SECOND, a, this), n(uData.nJewelryCoolTime2 - MG.game.time.time));
            case 3:
                return uData.nJewelryCoolTime3 <= 0 || null == uData.nJewelryCoolTime3 || MG.game.time.time > uData.nJewelryCoolTime3 ? (void 0 == h[3] && null == h[3] || MG.game.time.events.remove(h[3]), "none") : (h[3] = MG.game.time.events.loop(Phaser.Timer.SECOND, o, this), n(uData.nJewelryCoolTime3 - MG.game.time.time))
        }
    }

    function t() {
        MG.game.time.time < uData.nJewelryCoolTime0 ? s.Set_CoolTime_0(n(uData.nJewelryCoolTime0 - MG.game.time.time)) : (MG.game.time.events.remove(h[0]), s.Set_CoolTime_0("none"))
    }

    function i() {
        MG.game.time.time < uData.nJewelryCoolTime1 ? s.Set_CoolTime_1(n(uData.nJewelryCoolTime1 - MG.game.time.time)) : (MG.game.time.events.remove(h[1]), s.Set_CoolTime_1("none"))
    }

    function a() {
        MG.game.time.time < uData.nJewelryCoolTime2 ? s.Set_CoolTime_2(n(uData.nJewelryCoolTime2 - MG.game.time.time)) : (MG.game.time.events.remove(h[2]), s.Set_CoolTime_2("none"))
    }

    function o() {
        MG.game.time.time < uData.nJewelryCoolTime3 ? s.Set_CoolTime_3(n(uData.nJewelryCoolTime3 - MG.game.time.time)) : (MG.game.time.events.remove(h[3]), s.Set_CoolTime_3("none"))
    }

    function n(e) {
        e = Math.floor(e / 1e3);
        var t = Math.floor(e / 60), i = Math.floor(e % 60);
        return (t > 0 ? i >= 10 ? "0" + t.toString() + ":" + i.toString() : "0" + t.toString() + ":0" + i.toString() : i >= 10 ? "00:" + i.toString() : "00:0" + i.toString()).toString()
    }

    var s, l = {}, r = [, , , ,], h = [, , , ,], p = [2, 10, 2, 4];
    return l.Init = function () {
        s = new UI_JewelryShop
    }, l.OpenJewelShopWindow = function () {
        s.VisibleWindow(!0), s.Set_CoolTime_0(e(0)), s.Set_CoolTime_1(e(1)), s.Set_CoolTime_2(e(2)), s.Set_CoolTime_3(e(3))
    }, l.CloseJewelShopWindow = function () {
        for (var e = 0; e < h.length; e++) void 0 == h[e] && null == h[e] || MG.game.time.events.remove(h[e])
    }, l.OpenIsBuyWindow = function () {
        s.VisibleIsBuyWindow(!0)
    }, l.Set_Reward_Count = function () {
        for (var e = 0; e < p.length; e++) r[e] = Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * p[e])
    }, l.Get_Reward_Count = function (e) {
        return l.Set_Reward_Count(), r[e]
    }, l.Buy_Jewelry = function (t) {
        uData.nJewelryCount += r[t], StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount), s.Create_OkBuyWindow(), s.VisibleOkBuyWindow(!0, r[t]), uiManager.SetJewelryCount(), console.log(typeof MG.game.time.time);
        var i = MG.game.time.time;
        switch (i += 6e5, t) {
            case 0:
                uData.nJewelryCoolTime0 = i, StorageManager.prototype.set("nJewelryCoolTime0", uData.nJewelryCoolTime0), s.Set_CoolTime_0(e(t));
                break;
            case 1:
                uData.nJewelryCoolTime1 = i, StorageManager.prototype.set("nJewelryCoolTime1", uData.nJewelryCoolTime1), s.Set_CoolTime_1(e(t));
                break;
            case 2:
                uData.nJewelryCoolTime2 = i, StorageManager.prototype.set("nJewelryCoolTime2", uData.nJewelryCoolTime2), s.Set_CoolTime_2(e(t));
                break;
            case 3:
                uData.nJewelryCoolTime3 = i, StorageManager.prototype.set("nJewelryCoolTime3", uData.nJewelryCoolTime3), s.Set_CoolTime_3(e(t))
        }
        1 == loginTF && networkManager.ForcedSaveData()
    }, l
}();
var _playTutorialManager = _playTutorialManager || {};
_playTutorialManager.Instance = function () {
    function e(e) {
        u.visible = e, e ? (d.scale.setTo(1), MG.game.world.bringToTop(u)) : d.scale.setTo(0)
    }

    function t() {
        M.visible = !0, S.visible = !0, M.position.setTo(MG.game.world.centerX, _.position.y + 120), S.position.setTo(MG.game.world.centerX, M.position.y)
    }

    function i() {
        M.visible = !1, S.visible = !1, M.position.setTo(MG.game.world.centerX, -1e3), S.position.setTo(MG.game.world.centerX, -1e3)
    }

    function a() {
        i(), e(!0), _.position.setTo(MG.game.world.centerX, 1050), d.setText(GetString("MustTuto_01")), d.anchor.setTo(.5, .5), d.position.setTo(MG.game.world.centerX, _.position.y)
    }

    function o() {
        i(), e(!0), _.position.setTo(MG.game.world.centerX, 1050), d.setText(GetString("MustTuto_02")), d.anchor.setTo(.5, .5), d.position.setTo(MG.game.world.centerX, _.position.y - 60)
    }

    function n() {
        i(), e(!0), _.position.setTo(MG.game.world.centerX, 1050), d.setText(GetString("MustTuto_03")), d.anchor.setTo(.5, .5), d.position.setTo(MG.game.world.centerX, _.position.y - 60)
    }

    function s() {
        i(), e(!0), _.position.setTo(MG.game.world.centerX, 500), d.setText(GetString("MustTuto_04")), d.anchor.setTo(.5, .5), d.position.setTo(MG.game.world.centerX, _.position.y - 60)
    }

    function l() {
        y.scale.setTo(1), y.position.setTo(MG.game.world.centerX + 100, 140), uiManager.BlinkEffect_Mission(!0)
    }

    function r() {
        y.scale.setTo(0), y.position.setTo(-1e3, -1e3), uiManager.BlinkEffect_Mission(!1)
    }

    function h() {
        c.position.setTo(MG.game.world.centerX - 100, MG.game.world.centerY), MG.game.add.tween(c).to({
            x: MG.game.world.centerX + 100, y: MG.game.world.centerY
        }, 1e3, Phaser.Easing.Linear.None, !0, 500).loop(!0)
    }

    function p() {
        c.scale.setTo(0), c.position.setTo(-1e3, -1e3)
    }

    var u, m, g, _, d, c, y, f, B, M, S, T = {}, G = !1, w = 0;
    return T.Ready = function () {
        u = MG.game.add.group(), m = {
            game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: -1e3, w: 540,
            h: 400, off_l: 27, off_r: 27, off_t: 27, off_b: 27
        }, g = {font: "32px Arial", fill: "#666666", align: "center", fontWeight: "bold"}, B = {
            game: MG.game, packname: "atlas_UI", pngname: "btn_98_green.png", x: -1e3, y: -1e3, w: 235, h: 98,
            off_l: 50, off_r: 50, off_t: 0, off_b: 0
        }, (M = uiManager.createImg9(B)).anchor.setTo(.5), M.inputEnabled = !0, M.events.onInputUp.add(T.Active_Step, this), (S = MG.game.add.bitmapText(-1e3, -1e3, "uiFont", "Bitmap Fonts!", 45)).anchor.setTo(.5), S.setText("OK"), S.align = "center", f = MG.game.add.sprite(-1e3, -1e3, "atlas_UI", "item_2_2.png"), d = MG.game.add.text(0, 0, "", g), (c = MG.game.add.sprite(-1e3, -1e3, "finger_flick")).scale.setTo(1), c.anchor.setTo(.5), (y = MG.game.add.sprite(-1e3, -1e3, "finger_flick")).scale.setTo(1), y.anchor.setTo(.5), (_ = uiManager.createImg9(m)).anchor.setTo(.5), u.add(c), u.add(y), u.add(_), u.add(d), u.add(f), u.add(M), u.add(S), e(!1)
    }, T.SetUserInput = function (e) {
        G = e
    }, T.IsUserInput = function () {
        return G
    }, T.Active_Step = function () {
        switch (w++) {
            case 0:
                a(), h();
                break;
            case 1:
                e(!1), p();
                break;
            case 2:
                o(), MG.game.time.events.add(1e3, t, this);
                break;
            case 3:
                n(), MG.game.time.events.add(1e3, figureManager.EndDrawLine_CallBack, this), MG.game.time.events.add(2500, t, this);
                break;
            case 4:
                s(), l(), MG.game.time.events.add(3e3, t, this);
                break;
            case 5:
                r(), e(!1), figureManager.Set_Draw_Speed(), uiManager.ViewTutorial(), stateManager.offPlayTutorial(), ballManager.Active_Move_Balls(!0)
        }
    }, T
}(), UI_Title.prototype.Load_TitleScene = function () {
    this.title_Spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, "title"), this.uiGroup.add(this.title_Spine), MG.game.world.bringToTop(this.title_Spine), this.title_Spine.setAnimationByName(0, "title_in", !1), this.title_Spine.state.onComplete = function () {
        this.End_Title_Animation()
    }.bind(this), this.startButton.scale.setTo(650, 100), this.startButton.anchor.setTo(.5, 1), this.startButton.inputEnabled = !0, this.startButton.events.onInputUp.add(function () {
        this.OnClickEvent_StartButton()
    }.bind(this)), this.uiGroup.add(this.startButton), this.fullScreen_touchButton.scale.setTo(MG.game.world.width, MG.game.world.height - 150), this.fullScreen_touchButton.anchor.setTo(.5, 0), this.fullScreen_touchButton.inputEnabled = !0, this.fullScreen_touchButton.events.onInputUp.add(function () {
        this.End_Title_Animation()
    }.bind(this)), this.uiGroup.add(this.fullScreen_touchButton), this.grade_all.scale.setTo(.9), this.grade_all.anchor.setTo(1, 0), this.uiGroup.add(this.grade_all), this.soundButton_ON.scale.setTo(1), this.soundButton_ON.anchor.setTo(.5), this.soundButton_ON.inputEnabled = !0, this.soundButton_ON.events.onInputUp.add(function () {
        this.OnClickEvent_SoundButton()
    }.bind(this)), this.uiGroup.add(this.soundButton_ON), this.soundButton_OFF.scale.setTo(1), this.soundButton_OFF.anchor.setTo(.5), this.soundButton_OFF.inputEnabled = !0, this.soundButton_OFF.events.onInputUp.add(function () {
        this.OnClickEvent_SoundButton()
    }.bind(this)), this.uiGroup.add(this.soundButton_OFF), this.copyRightStyle = {
        font: "20px Arial", fill: "#FFFFFF", align: "center", fontWeight: "bold", strock: "#395d7b"
    }, this.copyrightText = MG.game.add.text(MG.game.world.centerX, MG.game.world.height - 15, "Copyright Ⓒ 2018 GAME Co.,Ltd All rights reserved", this.copyRightStyle), this.copyrightText.anchor.setTo(.5, 1), this.copyrightText.strokeThickness = 3, this.uiGroup.add(this.copyrightText), MG.game.world.bringToTop(this.uiGroup)
}, UI_Title.prototype.End_Title_Animation = function () {
    this.fullScreen_touchButton.visible = !1, this.fullScreen_touchButton.scale.setTo(0), this.fullScreen_touchButton.inputEnabled = !1, UI_Title.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF), this.title_Spine.setAnimationByName(0, "title_idle", !0), this.title_Spine.state.onComplete = function () {
    }
}, UI_Title.prototype.VisibleWindow = function (e) {
    this.uiGroup.visible = e, e && MG.game.world.bringToTop(this.uiGroup)
}, UI_Title.prototype.SetSoundIcons = function (e, t) {
    StorageManager.prototype.get("isSfx") ? (e.position.setTo(MG.game.world.centerX, MG.game.world.height - 100), t.position.setTo(MG.game.world.centerX, MG.game.world.height + 100)) : (e.position.setTo(MG.game.world.centerX, MG.game.world.height + 100), t.position.setTo(MG.game.world.centerX, MG.game.world.height - 100))
}, UI_Title.prototype.OnClickEvent_SoundButton = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), StorageManager.prototype.get("isSfx") ? (MG.AudioSwitch(StorageManager.prototype.get("isSfx")), uData.isSfx = !1, uData.isBGM = !1, isPlaying_TitleBGM = !1, MG.StopBgm("bgm_title")) : (MG.AudioSwitch(StorageManager.prototype.get("isSfx")), uData.isSfx = !0, uData.isBGM = !0, isPlaying_TitleBGM = !0, MG.PlayBgm("bgm_title", !0)), UI_Title.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF)
}, UI_Title.prototype.OnClickEvent_StartButton = function () {
    this.uiGroup.visible = !1, actionManager.Button_Click_Effect(this.startButton), uiManager.OnClickEvent_StartButton()
}, UI_UserItem.prototype.Create_UserItemWindow = function () {
    isPlaying ? uiManager.PlayGame() : (this.gradationBG.anchor.setTo(0, 0), this.gradationBG.scale.setTo(.1 * MG.game.world.width, 1), this.userItemWindowGroup.add(this.gradationBG), this.BestScoreZone(), this.mainBG = uiManager.createImg9(this.mainWindowOption), this.mainBG.scale.setTo(1), this.mainBG.anchor.setTo(.5), this.userItemWindowGroup.add(this.mainBG), this.dialog1Text = MG.game.add.text(this.mainBG.position.x, this.mainBG.position.y - 210, "", this.dialog3Style), this.dialog1Text.anchor.setTo(.5), this.dialog1Text.setText(GetString("Item_Description")), this.userItemWindowGroup.add(this.dialog1Text), this.horizontalLine.position.setTo(this.mainBG.position.x, this.mainBG.position.y - 160), this.horizontalLine.scale.setTo(48, 1), this.horizontalLine.alpha = .5, this.horizontalLine.anchor.setTo(.5, .5), this.userItemWindowGroup.add(this.horizontalLine), this.TimeUI(), this.SlowUI(), this.LifeUI(), this.Buttons())
}, UI_UserItem.prototype.VisibleWindow = function (e) {
    this.userItemWindowGroup.visible = e, e && (currentScene = "userItem", uData.nStage = 1)
}, UI_UserItem.prototype.BestScoreZone = function () {
    this.bestScoreTitle_Text.anchor.setTo(.5), this.bestScoreTitle_Text.setText("BEST LEVEL"), this.bestScoreTitle_Text.tint = "#ffffff", this.bestScoreTitle_Text.alpha = .6, this.bestScoreTitle_Text.align = "center", this.userItemWindowGroup.add(this.bestScoreTitle_Text), this.bestScoreBG = uiManager.createImg9(this.panelOption), this.bestScoreBG.scale.setTo(1), this.bestScoreBG.anchor.setTo(.5), this.userItemWindowGroup.add(this.bestScoreBG), this.bestScoreCount_Text.anchor.setTo(.5), this.bestScoreCount_Text.setText(uData.nBestScore), this.bestScoreCount_Text.align = "center", this.userItemWindowGroup.add(this.bestScoreCount_Text)
}, UI_UserItem.prototype.Buttons = function () {
    this.playButton = uiManager.createImg9(this.playButtonOption), this.playButton.scale.setTo(1), this.playButton.anchor.setTo(.5), this.playButton.inputEnabled = !0, this.playButton.events.onInputUp.add(function () {
        this.OnClickEvent_PlayButton()
    }.bind(this)), this.userItemWindowGroup.add(this.playButton), this.playButton_Text = MG.game.add.bitmapText(this.playButton.position.x, this.playButton.position.y, "uiFont", "Bitmap Fonts!", 45), this.playButton_Text.anchor.setTo(.5), this.playButton_Text.setText("PLAY"), this.playButton_Text.align = "center", this.userItemWindowGroup.add(this.playButton_Text), this.stageJumpButton = uiManager.createImg9(this.stageJumpButtonOption), this.stageJumpButton.scale.setTo(1), this.stageJumpButton.anchor.setTo(.5), this.userItemWindowGroup.add(this.stageJumpButton), this.jumpButton_Text = MG.game.add.bitmapText(this.stageJumpButton.position.x, this.stageJumpButton.position.y, "uiFont", "Bitmap Fonts!", 45), this.jumpButton_Text.anchor.setTo(.5), this.jumpButton_Text.setText("LEVEL JUMP"), this.jumpButton_Text.align = "center", uData.nBestScore >= 11 ? (this.stageJumpButton.inputEnabled = !0, this.stageJumpButton.alpha = 1, this.jumpButton_Text.alpha = 1) : (this.stageJumpButton.inputEnabled = !1, this.stageJumpButton.alpha = .35, this.jumpButton_Text.alpha = .35), this.stageJumpButton.events.onInputUp.add(function () {
        this.OnClickEvent_JumpButton()
    }.bind(this)), this.userItemWindowGroup.add(this.jumpButton_Text)
}, UI_UserItem.prototype.TimeUI = function () {
    this.timeUI_Parent.position.setTo(this.mainBG.position.x - 200, this.mainBG.position.y), this.timeUI_Parent.scale.setTo(1), this.timeUI_Parent.anchor.setTo(.5), this.time_slot_spine.setAnimationByName(0, "time_idle", !0), this.time_slot_spine.position.setTo(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y), this.time_slot_spine.scale.setTo(1), this.time_slot_spine.state.onComplete = function () {
    }, this.time_button = MG.game.add.image(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y, "atlas_UI", "item_normal.png"), this.time_button.scale.setTo(1), this.time_button.anchor.setTo(.5), this.time_button.alpha = 0, this.time_button.inputEnabled = !0, this.time_button.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Time", !this.isTimeUse, this.time_useJewelryCount_Text, this.time_jewelIcon, this.time_cancleText)
    }.bind(this)), this.reward_Text = MG.game.add.bitmapText(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 45, "uiFont", "Bitmap Fonts!", 20), this.reward_Text.anchor.setTo(.5), this.reward_Text.setText("+" + MG.gameSheetsData.AddTimePlus.toString()), this.reward_Text.align = "center", this.commentText = MG.game.add.text(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 120, "", this.dialog1Style), this.commentText.anchor.setTo(.5), this.commentText.setText(GetString("Passive_Item01_Explanation", MG.gameSheetsData.AddTimePlus)), this.time_useJewelryInfoBoxEnableBG.position.setTo(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 190), this.time_useJewelryInfoBoxEnableBG.scale.setTo(1), this.time_useJewelryInfoBoxEnableBG.anchor.setTo(.5), this.time_useJewelryInfoBoxEnableBG.inputEnabled = !0, this.time_useJewelryInfoBoxEnableBG.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Time", !this.isTimeUse, this.time_useJewelryCount_Text, this.time_jewelIcon, this.time_cancleText)
    }.bind(this)), this.time_useJewelryInfoBoxDisableBG.position.setTo(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 190), this.time_useJewelryInfoBoxDisableBG.scale.setTo(1), this.time_useJewelryInfoBoxDisableBG.anchor.setTo(.5), this.time_useJewelryInfoBoxDisableBG.visible = !1, this.time_useJewelryInfoBoxDisableBG.inputEnabled = !0, this.time_useJewelryInfoBoxDisableBG.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Time", !this.isTimeUse, this.time_useJewelryCount_Text, this.time_jewelIcon, this.time_cancleText)
    }.bind(this)), this.time_use_jewel_count = Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.TimeItemPayCount)), this.time_icon_scale = 0, this.time_text_scale = 0, this.time_use_jewel_count >= 1e4 ? (this.time_icon_scale = .3, this.time_text_scale = 23) : this.time_use_jewel_count < 1e4 && this.time_use_jewel_count >= 1e3 ? (this.time_icon_scale = .32, this.time_text_scale = 25) : this.time_use_jewel_count < 1e3 && this.time_use_jewel_count >= 100 ? (this.time_icon_scale = .34, this.time_text_scale = 27) : this.time_use_jewel_count < 100 && this.time_use_jewel_count >= 10 ? (this.time_icon_scale = .36, this.time_text_scale = 29) : (this.time_icon_scale = .4, this.time_text_scale = 31), this.time_jewelIcon = MG.game.add.image(this.time_useJewelryInfoBoxEnableBG.position.x - 60, this.time_useJewelryInfoBoxEnableBG.position.y, "atlas_UI", "jewel.png"), this.time_jewelIcon.scale.setTo(this.time_icon_scale), this.time_jewelIcon.anchor.setTo(0, .5), this.time_useJewelryCount_Text = MG.game.add.bitmapText(this.time_useJewelryInfoBoxEnableBG.position.x + 17, this.time_useJewelryInfoBoxEnableBG.position.y, "uiFont", "Bitmap Fonts!", this.time_text_scale), this.time_useJewelryCount_Text.anchor.setTo(.5), this.time_useJewelryCount_Text.setText(this.time_use_jewel_count), this.time_useJewelryCount_Text.align = "center", this.time_cancleText = MG.game.add.text(this.timeUI_Parent.position.x, this.time_useJewelryInfoBoxEnableBG.position.y, "", this.dialog2Style), this.time_cancleText.anchor.setTo(.5), this.time_cancleText.setText(GetString("Release")), this.time_cancleText.visible = !1, this.userItemWindowGroup.add(this.timeUI_Parent), this.userItemWindowGroup.add(this.time_slot_spine), this.userItemWindowGroup.add(this.time_button), this.userItemWindowGroup.add(this.reward_Text), this.userItemWindowGroup.add(this.commentText), this.userItemWindowGroup.add(this.time_useJewelryInfoBoxEnableBG), this.userItemWindowGroup.add(this.time_useJewelryInfoBoxDisableBG), this.userItemWindowGroup.add(this.time_jewelIcon), this.userItemWindowGroup.add(this.time_useJewelryCount_Text), this.userItemWindowGroup.add(this.time_cancleText)
}, UI_UserItem.prototype.SlowUI = function () {
    this.slowUI_Parent.position.setTo(this.mainBG.position.x, this.mainBG.position.y), this.slowUI_Parent.scale.setTo(1), this.slowUI_Parent.anchor.setTo(.5), this.slow_slot_spine.setAnimationByName(0, "slow_idle", !0), this.slow_slot_spine.position.setTo(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y), this.slow_slot_spine.scale.setTo(1), this.slow_slot_spine.state.onComplete = function () {
    }, this.slow_button = MG.game.add.image(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y, "atlas_UI", "item_normal.png"), this.slow_button.scale.setTo(1), this.slow_button.anchor.setTo(.5), this.slow_button.alpha = 0, this.slow_button.inputEnabled = !0, this.slow_button.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Slow", !this.isSlowUse, this.slow_useJewelryCount_Text, this.slow_jewelIcon, this.slow_cancleText)
    }.bind(this)), this.reward_Text = MG.game.add.bitmapText(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 45, "uiFont", "Bitmap Fonts!", 20), this.reward_Text.anchor.setTo(.5), this.ratio = parseFloat(1 - MG.gameSheetsData.SlowItemSkill), this.reward_Text.setText("-" + Math.round(100 * this.ratio).toString()), this.reward_Text.align = "center", this.commentText = MG.game.add.text(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 120, "", this.dialog1Style), this.commentText.anchor.setTo(.5), this.commentText.setText(GetString("Passive_Item02_Explanation", Math.round(100 * this.ratio))), this.slow_useJewelryInfoBoxEnableBG.position.setTo(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 190), this.slow_useJewelryInfoBoxEnableBG.scale.setTo(1), this.slow_useJewelryInfoBoxEnableBG.inputEnabled = !0, this.slow_useJewelryInfoBoxEnableBG.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Slow", !this.isSlowUse, this.slow_useJewelryCount_Text, this.slow_jewelIcon, this.slow_cancleText)
    }.bind(this)), this.slow_useJewelryInfoBoxDisableBG.position.setTo(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 190), this.slow_useJewelryInfoBoxDisableBG.scale.setTo(1), this.slow_useJewelryInfoBoxDisableBG.anchor.setTo(.5), this.slow_useJewelryInfoBoxDisableBG.visible = !1, this.slow_useJewelryInfoBoxDisableBG.inputEnabled = !0, this.slow_useJewelryInfoBoxDisableBG.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Slow", !this.isSlowUse, this.slow_useJewelryCount_Text, this.slow_jewelIcon, this.slow_cancleText)
    }.bind(this)), this.slow_use_jewel_count = Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.SlowItemPayCount)), this.slow_icon_scale = 0, this.slow_text_scale = 0, this.slow_use_jewel_count >= 1e4 ? (this.slow_icon_scale = .3, this.slow_text_scale = 23) : this.slow_use_jewel_count < 1e4 && this.slow_use_jewel_count >= 1e3 ? (this.slow_icon_scale = .32, this.slow_text_scale = 25) : this.slow_use_jewel_count < 1e3 && this.slow_use_jewel_count >= 100 ? (this.slow_icon_scale = .34, this.slow_text_scale = 27) : this.slow_use_jewel_count < 100 && this.slow_use_jewel_count >= 10 ? (this.slow_icon_scale = .36, this.slow_text_scale = 29) : (this.slow_icon_scale = .4, this.slow_text_scale = 31), this.slow_jewelIcon = MG.game.add.image(this.slow_useJewelryInfoBoxEnableBG.position.x - 60, this.slow_useJewelryInfoBoxEnableBG.position.y, "atlas_UI", "jewel.png"), this.slow_jewelIcon.scale.setTo(this.slow_icon_scale), this.slow_jewelIcon.anchor.setTo(0, .5), this.slow_useJewelryCount_Text = MG.game.add.bitmapText(this.slow_useJewelryInfoBoxEnableBG.position.x + 17, this.slow_useJewelryInfoBoxEnableBG.position.y, "uiFont", "Bitmap Fonts!", this.slow_text_scale), this.slow_useJewelryCount_Text.anchor.setTo(.5), this.slow_useJewelryCount_Text.setText(this.slow_use_jewel_count), this.slow_useJewelryCount_Text.align = "center", this.slow_cancleText = MG.game.add.text(this.slowUI_Parent.position.x, this.slow_useJewelryInfoBoxEnableBG.position.y, "", this.dialog2Style), this.slow_cancleText.anchor.setTo(.5), this.slow_cancleText.setText(GetString("Release")), this.slow_cancleText.visible = !1, this.userItemWindowGroup.add(this.slowUI_Parent), this.userItemWindowGroup.add(this.slow_slot_spine), this.userItemWindowGroup.add(this.slow_button), this.userItemWindowGroup.add(this.reward_Text), this.userItemWindowGroup.add(this.commentText), this.userItemWindowGroup.add(this.slow_useJewelryInfoBoxEnableBG), this.userItemWindowGroup.add(this.slow_useJewelryInfoBoxDisableBG), this.userItemWindowGroup.add(this.slow_jewelIcon), this.userItemWindowGroup.add(this.slow_useJewelryCount_Text), this.userItemWindowGroup.add(this.slow_cancleText)
}, UI_UserItem.prototype.LifeUI = function () {
    this.lifeUI_Parent.position.setTo(this.mainBG.position.x + 200, this.mainBG.position.y), this.lifeUI_Parent.scale.setTo(1), this.lifeUI_Parent.anchor.setTo(.5), this.shield_slot_spine.setAnimationByName(0, "shield_idle", !0), this.shield_slot_spine.position.setTo(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y), this.shield_slot_spine.scale.setTo(1), this.shield_slot_spine.state.onComplete = function () {
    }, this.shield_button = MG.game.add.image(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y, "atlas_UI", "item_normal.png"), this.shield_button.scale.setTo(1), this.shield_button.anchor.setTo(.5), this.shield_button.alpha = 0, this.shield_button.inputEnabled = !0, this.shield_button.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Life", !this.isLifeUse, this.life_useJewelryCount_Text, this.life_jewelIcon, this.life_cancleText)
    }.bind(this)), this.reward_Text = MG.game.add.bitmapText(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 45, "uiFont", "Bitmap Fonts!", 20), this.reward_Text.anchor.setTo(.5), this.reward_Text.setText("+" + MG.gameSheetsData.LifeItemSkill.toString()), this.reward_Text.align = "center", this.commentText = MG.game.add.text(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 120, "", this.dialog1Style), this.commentText.anchor.setTo(.5), this.commentText.setText(GetString("Passive_Item03_Explanation", MG.gameSheetsData.LifeItemSkill)), this.life_useJewelryInfoBoxEnableBG.position.setTo(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 190), this.life_useJewelryInfoBoxEnableBG.scale.setTo(1), this.life_useJewelryInfoBoxEnableBG.anchor.setTo(.5), this.life_useJewelryInfoBoxEnableBG.inputEnabled = !0, this.life_useJewelryInfoBoxEnableBG.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Life", !this.isLifeUse, this.life_useJewelryCount_Text, this.life_jewelIcon, this.life_cancleText)
    }.bind(this)), this.life_useJewelryInfoBoxDisableBG.position.setTo(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 190), this.life_useJewelryInfoBoxDisableBG.scale.setTo(1), this.life_useJewelryInfoBoxDisableBG.anchor.setTo(.5), this.life_useJewelryInfoBoxDisableBG.visible = !1, this.life_useJewelryInfoBoxDisableBG.inputEnabled = !0, this.life_useJewelryInfoBoxDisableBG.events.onInputUp.add(function () {
        this.OnClickEvent_SetItem("Life", !this.isLifeUse, this.life_useJewelryCount_Text, this.life_jewelIcon, this.life_cancleText)
    }.bind(this)), this.life_use_jewel_count = Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.LifeItemPayCount)), this.life_icon_scale = 0, this.life_text_scale = 0, this.life_use_jewel_count >= 1e4 ? (this.life_icon_scale = .3, this.life_text_scale = 23) : this.life_use_jewel_count < 1e4 && this.life_use_jewel_count >= 1e3 ? (this.life_icon_scale = .32, this.life_text_scale = 25) : this.life_use_jewel_count < 1e3 && this.life_use_jewel_count >= 100 ? (this.life_icon_scale = .34, this.life_text_scale = 27) : this.life_use_jewel_count < 100 && this.life_use_jewel_count >= 10 ? (this.life_icon_scale = .36, this.life_text_scale = 29) : (this.life_icon_scale = .4, this.life_text_scale = 31), this.life_jewelIcon = MG.game.add.image(this.life_useJewelryInfoBoxEnableBG.position.x - 60, this.life_useJewelryInfoBoxEnableBG.position.y, "atlas_UI", "jewel.png"), this.life_jewelIcon.scale.setTo(this.life_icon_scale), this.life_jewelIcon.anchor.setTo(0, .5), this.life_useJewelryCount_Text = MG.game.add.bitmapText(this.life_useJewelryInfoBoxEnableBG.position.x + 17, this.life_useJewelryInfoBoxEnableBG.position.y, "uiFont", "Bitmap Fonts!", this.life_text_scale), this.life_useJewelryCount_Text.anchor.setTo(.5), this.life_useJewelryCount_Text.setText(this.life_use_jewel_count), this.life_useJewelryCount_Text.align = "center", this.life_cancleText = MG.game.add.text(this.lifeUI_Parent.position.x, this.life_useJewelryInfoBoxEnableBG.position.y, "", this.dialog2Style), this.life_cancleText.anchor.setTo(.5), this.life_cancleText.setText(GetString("Release")), this.life_cancleText.visible = !1, this.userItemWindowGroup.add(this.lifeUI_Parent), this.userItemWindowGroup.add(this.shield_slot_spine), this.userItemWindowGroup.add(this.shield_button), this.userItemWindowGroup.add(this.reward_Text), this.userItemWindowGroup.add(this.commentText), this.userItemWindowGroup.add(this.life_useJewelryInfoBoxEnableBG), this.userItemWindowGroup.add(this.life_useJewelryInfoBoxDisableBG), this.userItemWindowGroup.add(this.life_jewelIcon), this.userItemWindowGroup.add(this.life_useJewelryCount_Text), this.userItemWindowGroup.add(this.life_cancleText)
}, UI_UserItem.prototype.VisibleWindow = function (e) {
    this.userItemWindowGroup.visible = e, e && MG.game.world.bringToTop(this.userItemWindowGroup)
}, UI_UserItem.prototype.OnClickEvent_PlayButton = function () {
    actionManager.Button_Click_Effect(this.playButton, this.playButton_Text), MG.game.time.events.add(300, this.OnClickEvent_PlayButton_Start, this)
}, UI_UserItem.prototype.OnClickEvent_PlayButton_Start = function () {
    this.userItemWindowGroup.visible = !1, isPlaying_TitleBGM = !1, MG.StopBgm("bgm_title"), userItemManager.SetupItemSkill(this.isTimeUse, this.isSlowUse, this.isLifeUse), StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount), 1 == loginTF && networkManager.ForcedSaveData(), uiManager.PlayGame()
}, UI_UserItem.prototype.OnClickEvent_JumpButton = function () {
    actionManager.Button_Click_Effect(this.stageJumpButton, this.jumpButton_Text), MG.game.time.events.add(300, uiManager.OnClickEvent_JumpButton, this)
}, UI_UserItem.prototype.OnClickEvent_SetItem = function (e, t, i, a, o) {
    switch (e) {
        case"Time":
            if (t && parseInt(Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.TimeItemPayCount))) > uData.nJewelryCount) return void shopManager.OpenIsBuyWindow();
            this.isTimeUse = t, this.isTimeUse ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_on"), this.time_slot_spine.setAnimationByName(0, "time_equip", !1)) : (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), this.time_slot_spine.setAnimationByName(0, "time_unequip", !1)), this.time_slot_spine.state.onComplete = function () {
                this.isTimeUse ? this.time_slot_spine.setAnimationByName(0, "time_equip_idle", !0) : this.time_slot_spine.setAnimationByName(0, "time_idle", !0)
            }.bind(this);
            break;
        case"Slow":
            if (t && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.SlowItemPayCount)) > uData.nJewelryCount) return void shopManager.OpenIsBuyWindow();
            this.isSlowUse = t, this.isSlowUse ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_on"), this.slow_slot_spine.setAnimationByName(0, "slow_equip", !1)) : (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), this.slow_slot_spine.setAnimationByName(0, "slow_unequip", !1)), this.slow_slot_spine.state.onComplete = function () {
                this.isSlowUse ? this.slow_slot_spine.setAnimationByName(0, "slow_equip_idle", !0) : this.slow_slot_spine.setAnimationByName(0, "slow_idle", !0)
            }.bind(this);
            break;
        case"Life":
            if (t && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.LifeItemPayCount)) > uData.nJewelryCount) return void shopManager.OpenIsBuyWindow();
            this.isLifeUse = t, this.isLifeUse ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_on"), this.shield_slot_spine.setAnimationByName(0, "shield_equip", !1)) : (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), this.shield_slot_spine.setAnimationByName(0, "shield_unequip", !1)), this.shield_slot_spine.state.onComplete = function () {
                this.isLifeUse ? this.shield_slot_spine.setAnimationByName(0, "shield_equip_idle", !0) : this.shield_slot_spine.setAnimationByName(0, "shield_idle", !0)
            }.bind(this)
    }
    t ? (o.visible = !0, a.visible = !1, i.visible = !1, uData.nJewelryCount -= parseInt(i.text)) : (o.visible = !1, a.visible = !0, i.visible = !0, uData.nJewelryCount += parseInt(i.text)), uiManager.SetJewelryCount(), UI_UserItem.prototype.CheckAvailable(this.time_useJewelryInfoBoxDisableBG, this.slow_useJewelryInfoBoxDisableBG, this.life_useJewelryInfoBoxDisableBG, this.isTimeUse, this.isSlowUse, this.isLifeUse)
}, UI_UserItem.prototype.CheckAvailable = function (e, t, i, a, o, n) {
    !1 === a && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.TimeItemPayCount)) > uData.nJewelryCount ? e.visible = !0 : e.visible = !1, !1 === o && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.SlowItemPayCount)) > uData.nJewelryCount ? t.visible = !0 : t.visible = !1, !1 === n && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData.LifeItemPayCount)) > uData.nJewelryCount ? i.visible = !0 : i.visible = !1
}, UI_UserItem.prototype.FindSpineNode = function (e, t) {
    return e.children[e.skeleton.findSlotIndex(t)]
}, UI_UserItem_Display.prototype.Create_Window = function () {
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.userItemDisplayGroup.add(this.blackWall), this.text_item_start = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY - 300, "atlas_UI", "text_item_effect.png"), this.text_item_start.anchor.setTo(.5), this.userItemDisplayGroup.add(this.text_item_start), this.TimeUI(), this.SlowUI(), this.LifeUI()
}, UI_UserItem_Display.prototype.VisibleWindow = function (e) {
    this.userItemDisplayGroup.visible = e;
    var t = 0;
    e ? (this.isUseTime && (this.TimeItemGroup.visible = !0, this.TimeItemGroup.position.setTo(this.alignXpos[t++], MG.game.world.centerY), this.TimeItemGroup.scale.setTo(0, 0), MG.game.add.tween(this.TimeItemGroup.scale).to({
        x: 1, y: 1
    }, 400, Phaser.Easing.Sinusoidal.Out, !0)), this.isUseSlow && (this.SlowItemGroup.visible = !0, this.SlowItemGroup.position.setTo(this.alignXpos[t++], MG.game.world.centerY), this.SlowItemGroup.scale.setTo(0, 0), MG.game.add.tween(this.SlowItemGroup.scale).to({
        x: 1, y: 1
    }, 400, Phaser.Easing.Sinusoidal.Out, !0)), this.isUseLife && (this.LifeItemGroup.visible = !0, this.LifeItemGroup.position.setTo(this.alignXpos[t++], MG.game.world.centerY), this.LifeItemGroup.scale.setTo(0, 0), MG.game.add.tween(this.LifeItemGroup.scale).to({
        x: 1, y: 1
    }, 400, Phaser.Easing.Sinusoidal.Out, !0)), MG.game.world.bringToTop(this.userItemDisplayGroup), MG.game.world.bringToTop(this.TimeItemGroup), MG.game.world.bringToTop(this.SlowItemGroup), MG.game.world.bringToTop(this.LifeItemGroup)) : (this.TimeItemGroup.visible = !1, this.SlowItemGroup.visible = !1, this.LifeItemGroup.visible = !1, this.isUseTime = !1, this.isUseSlow = !1, this.isUseLife = !1)
}, UI_UserItem_Display.prototype.TimeUI = function () {
    this.timeUI_Parent.position.setTo(0, 0), this.timeUI_Parent.anchor.setTo(.5), this.TimeItemGroup.add(this.timeUI_Parent), this.cicleBG = MG.game.add.image(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y, "atlas_UI", "item_normal.png"), this.cicleBG.anchor.setTo(.5), this.TimeItemGroup.add(this.cicleBG), this.itemIcon = MG.game.add.image(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y - 10, "atlas_UI", "item_1.png"), this.itemIcon.anchor.setTo(.5), this.TimeItemGroup.add(this.itemIcon), this.reward_Text = MG.game.add.bitmapText(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 45, "uiFont", "Bitmap Fonts!", 20), this.reward_Text.anchor.setTo(.5), this.reward_Text.setText("+" + MG.gameSheetsData.AddTimePlus.toString()), this.reward_Text.align = "center", this.TimeItemGroup.add(this.reward_Text), this.commentText = MG.game.add.text(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 120, "", this.dialog1Style), this.commentText.anchor.setTo(.5), this.commentText.setText(GetString("Passive_Item01_Explanation", MG.gameSheetsData.AddTimePlus)), this.TimeItemGroup.add(this.commentText)
}, UI_UserItem_Display.prototype.SlowUI = function () {
    this.slowUI_Parent.position.setTo(0, 0), this.slowUI_Parent.scale.setTo(1), this.slowUI_Parent.anchor.setTo(.5), this.SlowItemGroup.add(this.slowUI_Parent), this.cicleBG = MG.game.add.image(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y, "atlas_UI", "item_normal.png"), this.cicleBG.anchor.setTo(.5), this.SlowItemGroup.add(this.cicleBG), this.itemIcon = MG.game.add.image(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y - 15, "atlas_UI", "item_2_1.png"), this.itemIcon.anchor.setTo(.5), this.SlowItemGroup.add(this.itemIcon), this.itemIcon2 = MG.game.add.image(this.itemIcon.position.x + 15, this.itemIcon.position.y + 15, "atlas_UI", "item_2_2.png"), this.itemIcon2.anchor.setTo(.5), this.SlowItemGroup.add(this.itemIcon2), this.reward_Text = MG.game.add.bitmapText(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 45, "uiFont", "Bitmap Fonts!", 20), this.reward_Text.anchor.setTo(.5), this.ratio = parseFloat(1 - MG.gameSheetsData.SlowItemSkill), this.reward_Text.setText("-" + Math.round(100 * this.ratio).toString()), this.reward_Text.align = "center", this.SlowItemGroup.add(this.reward_Text), this.commentText = MG.game.add.text(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 120, "", this.dialog1Style), this.commentText.anchor.setTo(.5), this.commentText.setText(GetString("Passive_Item02_Explanation", Math.round(100 * this.ratio))), this.SlowItemGroup.add(this.commentText)
}, UI_UserItem_Display.prototype.LifeUI = function () {
    this.lifeUI_Parent.position.setTo(0, 0), this.lifeUI_Parent.anchor.setTo(.5), this.LifeItemGroup.add(this.lifeUI_Parent), this.cicleBG = MG.game.add.image(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y, "atlas_UI", "item_normal.png"), this.cicleBG.anchor.setTo(.5), this.LifeItemGroup.add(this.cicleBG), this.itemIcon = MG.game.add.image(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y - 10, "atlas_UI", "item_3.png"), this.itemIcon.anchor.setTo(.5), this.LifeItemGroup.add(this.itemIcon), this.reward_Text = MG.game.add.bitmapText(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 45, "uiFont", "Bitmap Fonts!", 20), this.reward_Text.anchor.setTo(.5), this.reward_Text.setText("+" + MG.gameSheetsData.LifeItemSkill.toString()), this.reward_Text.align = "center", this.LifeItemGroup.add(this.reward_Text), this.commentText = MG.game.add.text(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 120, "", this.dialog1Style), this.commentText.anchor.setTo(.5), this.commentText.setText(GetString("Passive_Item03_Explanation", MG.gameSheetsData.LifeItemSkill)), this.LifeItemGroup.add(this.commentText)
}, UI_UserItem_Display.prototype.SetUseItemPosition = function (e, t, i) {
    switch (this.useCount = 0, this.isUseTime = e, this.isUseSlow = t, this.isUseLife = i, e && this.useCount++, t && this.useCount++, i && this.useCount++, this.useCount) {
        case 1:
            this.alignXpos[0] = MG.game.world.centerX;
            break;
        case 2:
            this.alignXpos[0] = MG.game.world.centerX - 100, this.alignXpos[1] = MG.game.world.centerX + 100;
            break;
        case 3:
            this.alignXpos[0] = MG.game.world.centerX, this.alignXpos[1] = MG.game.world.centerX - 200, this.alignXpos[2] = MG.game.world.centerX + 200
    }
}, UI_TopCommon.prototype.Create_Common_TopIcons = function () {
    this.panelBG = uiManager.createImg9(this.panelOption), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(0, 0), this.panelBG.position.setTo(0, 0), this.jewelryGroup.add(this.panelBG), this.jewelIcon.scale.setTo(.6, .6), this.jewelIcon.anchor.setTo(.5), this.jewelIcon.position.setTo(this.panelBG.position.x + 50, this.panelBG.position.y + 40), this.jewelIcon.events.onInputUp.add(function () {
        this.OnClickDebugEvent_AddJewelry()
    }.bind(this)), this.panelBG.addChild(this.jewelIcon), this.jewelryGroup.add(this.jewelIcon), this.plusJewelButton.scale.setTo(1), this.plusJewelButton.anchor.setTo(.5), this.plusJewelButton.position.setTo(this.panelBG.position.x + 250, this.panelBG.position.y + 40), this.plusJewelButton.inputEnabled = !0, this.plusJewelButton.events.onInputUp.add(function () {
        shopManager.OpenJewelShopWindow()
    }), this.panelBG.addChild(this.plusJewelButton), this.jewelryGroup.add(this.plusJewelButton), this.jewelryCountText.anchor.setTo(.5), this.jewelryCountText.position.setTo(this.panelBG.position.x + 147, this.panelBG.position.y + 40), this.jewelryCountText.setText(uData.nJewelryCount), this.jewelryCountText.alpha = .6, this.jewelryCountText.align = "center", this.jewelryGroup.add(this.jewelryCountText), this.jewelryGroup.position.setTo(20, 20), this.tutorialButton.scale.setTo(1), this.tutorialButton.anchor.setTo(.5), this.panelBG.addChild(this.tutorialButton), this.commonUIGroup.add(this.tutorialButton), this.soundButton_ON.scale.setTo(1), this.soundButton_ON.anchor.setTo(.5), this.soundButton_ON.inputEnabled = !0, this.soundButton_ON.events.onInputUp.add(function () {
        this.OnClickEvent_SoundButton()
    }.bind(this)), this.commonUIGroup.add(this.soundButton_ON), this.soundButton_OFF.scale.setTo(1), this.soundButton_OFF.anchor.setTo(.5), this.soundButton_OFF.inputEnabled = !0, this.soundButton_OFF.events.onInputUp.add(function () {
        this.OnClickEvent_SoundButton()
    }.bind(this)), this.commonUIGroup.add(this.soundButton_OFF), MG.game.world.bringToTop(this.commonUIGroup), MG.game.world.bringToTop(this.jewelryGroup), UI_TopCommon.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF), this.VisibleWindow(!1)
}, UI_TopCommon.prototype.VisibleWindow = function (e) {
    this.commonUIGroup.visible = e, this.jewelryGroup.visible = e, e && (UI_TopCommon.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF), this.jewelryCountText.setText(uData.nJewelryCount), MG.game.world.bringToTop(this.commonUIGroup), MG.game.world.bringToTop(this.jewelryGroup))
}, UI_TopCommon.prototype.Using_View_Jewelry_Part = function (e) {
    "game" != currentScene && "continueWindow" != currentScene || (this.jewelryGroup.visible = e), e ? this.jewelryGroup.position.setTo(55, 220) : this.jewelryGroup.position.setTo(20, 20), this.jewelryCountText.setText(uData.nJewelryCount), MG.game.world.bringToTop(this.jewelryGroup)
}, UI_TopCommon.prototype.SetSoundIcons = function (e, t) {
    StorageManager.prototype.get("isSfx") ? (e.position.setTo(MG.game.world.width - 60, 60), t.position.setTo(MG.game.world.width - 60, -60)) : (e.position.setTo(MG.game.world.width - 60, -60), t.position.setTo(MG.game.world.width - 60, 60))
}, UI_TopCommon.prototype.OnClickEvent_SoundButton = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), this.soundButton_ON.visible && actionManager.Button_Click_Effect(this.soundButton_ON), this.soundButton_OFF.visible && actionManager.Button_Click_Effect(this.soundButton_OFF), MG.game.time.events.add(300, this.OnClickEvent_SoundButton_Start, this)
}, UI_TopCommon.prototype.OnClickEvent_SoundButton_Start = function () {
    StorageManager.prototype.get("isSfx") ? (MG.AudioSwitch(StorageManager.prototype.get("isSfx")), uData.isSfx = !1, uData.isBGM = !1, isPlaying_TitleBGM = !1, MG.StopBgm("bgm_title")) : (MG.AudioSwitch(StorageManager.prototype.get("isSfx")), uData.isSfx = !0, uData.isBGM = !0, isPlaying_TitleBGM = !0, MG.PlayBgm("bgm_title", !0)), UI_TopCommon.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF)
}, UI_TopCommon.prototype.SetJewelryCount = function () {
    this.jewelryCountText.setText(uData.nJewelryCount)
}, UI_TopCommon.prototype.OnClickDebugEvent_AddJewelry = function () {
    uData.nJewelryCount += 100, StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount), this.jewelryCountText.setText(uData.nJewelryCount), 1 == loginTF && networkManager.ForcedSaveData()
}, UI_TopCommon.prototype.BringToTop_Jewelry = function () {
    MG.game.world.bringToTop(this.jewelryGroup)
}, UI_Pause.prototype.Create_Pause_Window = function () {
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.pauseWindowGroup.add(this.blackWall), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(.5), this.pauseWindowGroup.add(this.panelBG), this.titleText.anchor.setTo(.5, 0), this.titleText.setText("PAUSE"), this.titleText.tint = 5723991, this.titleText.align = "center", this.pauseWindowGroup.add(this.titleText), this.line.scale.setTo(50, 1), this.line.alpha = .5, this.line.anchor.setTo(.5, .5), this.pauseWindowGroup.add(this.line), this.pauseCloseButton.scale.setTo(1), this.pauseCloseButton.anchor.setTo(.5, .5), this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT), this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 35, this.pauseCloseButton.position.y - 35), this.pauseWindowGroup.add(this.pauseCloseButton), this.pauseHelpButton.scale.setTo(1), this.pauseHelpButton.anchor.setTo(.5), this.pauseWindowGroup.add(this.pauseHelpButton), this.pauseSoundOnButton.scale.setTo(1), this.pauseSoundOnButton.anchor.setTo(.5), this.pauseWindowGroup.add(this.pauseSoundOnButton), this.pauseSoundOffButton.scale.setTo(1), this.pauseSoundOffButton.anchor.setTo(.5), this.pauseWindowGroup.add(this.pauseSoundOffButton), this.pauseHomeButton.scale.setTo(1), this.pauseHomeButton.anchor.setTo(.5), this.pauseWindowGroup.add(this.pauseHomeButton)
}, UI_Pause.prototype.VisibleWindow = function (e) {
    this.pauseWindowGroup.visible = e, e && (StorageManager.prototype.get("isSfx") ? (MG.PlayAudio("se_popup_off"), this.pauseSoundOnButton.visible = !0, this.pauseSoundOffButton.visible = !1) : (this.pauseSoundOnButton.visible = !1, this.pauseSoundOffButton.visible = !0), MG.game.world.bringToTop(this.pauseWindowGroup))
}, UI_Pause.prototype.Create_IsGotoHome_Window = function () {
    this.blackWall_goHome.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall_goHome.anchor.setTo(.5), this.blackWall_goHome.alpha = .75, this.blackWall_goHome.inputEnabled = !0, this.blackWall_goHome.events.onInputUp.add(function () {
    }), this.gotoHomeWindowGroup.add(this.blackWall_goHome), this.isGoHomePanelBG.scale.setTo(1), this.isGoHomePanelBG.anchor.setTo(.5), this.gotoHomeWindowGroup.add(this.isGoHomePanelBG), this.isBuyPanel_MessageBG.scale.setTo(1), this.isBuyPanel_MessageBG.anchor.setTo(.5), this.gotoHomeWindowGroup.add(this.isBuyPanel_MessageBG), this.isGoHome_dialog.anchor.setTo(.5), this.isGoHome_dialog.position.setTo(this.isBuyPanel_MessageBG.position.x, this.isBuyPanel_MessageBG.position.y), this.gotoHomeWindowGroup.add(this.isGoHome_dialog), this.okButton_GoHome.position.setTo(MG.game.world.centerX + 130, this.isGoHomePanelBG.position.y + 125), this.okButton_GoHome.anchor.setTo(.5), this.okButton_GoHome.inputEnabled = !0, this.okButton_GoHome.events.onInputUp.add(this.onClick_OK, this), this.gotoHomeWindowGroup.add(this.okButton_GoHome), this.ok_Text = MG.game.add.bitmapText(this.okButton_GoHome.position.x, this.okButton_GoHome.position.y, "uiFont", "Bitmap Fonts!", 45), this.ok_Text.anchor.setTo(.5), this.ok_Text.setText("YES"), this.ok_Text.align = "center", this.gotoHomeWindowGroup.add(this.ok_Text), this.noButton_GoHome.position.setTo(MG.game.world.centerX - 130, this.isGoHomePanelBG.position.y + 125), this.noButton_GoHome.anchor.setTo(.5), this.noButton_GoHome.inputEnabled = !0, this.noButton_GoHome.events.onInputUp.add(this.onClick_IsBuy_NO, this), this.gotoHomeWindowGroup.add(this.noButton_GoHome), this.no_Text = MG.game.add.bitmapText(this.noButton_GoHome.position.x, this.noButton_GoHome.position.y, "uiFont", "Bitmap Fonts!", 45), this.no_Text.anchor.setTo(.5), this.no_Text.align = "center", this.no_Text.setText("NO"), this.gotoHomeWindowGroup.add(this.no_Text)
}, UI_Pause.prototype.VisibleWindow_IsGoHome = function (e) {
    this.gotoHomeWindowGroup.visible = e, e && MG.game.world.bringToTop(this.gotoHomeWindowGroup)
}, UI_Pause.prototype.PauseInput = function (e) {
    0 == this.pauseWindowGroup.visible || this.gotoHomeWindowGroup.visible || this.onClick_close_button || MG.game.physics.arcade.isPaused && (0 == uiManager.isOpenTutoriallWindow() && Phaser.Math.distance(this.pauseCloseButton.position.x, this.pauseCloseButton.position.y, e.x, e.y) <= 20 && this.OnClick_PauseClose(), 0 == uiManager.isOpenTutoriallWindow() && Phaser.Math.distance(this.pauseHelpButton.position.x, this.pauseHelpButton.position.y, e.x, e.y) <= 40 && uiManager.ViewTutorial(), 0 == uiManager.isOpenTutoriallWindow() && Phaser.Math.distance(this.pauseSoundOnButton.position.x, this.pauseSoundOnButton.position.y, e.x, e.y) <= 40 && this.OnClick_Sound(), 0 == uiManager.isOpenTutoriallWindow() && Phaser.Math.distance(this.pauseHomeButton.position.x, this.pauseHomeButton.position.y, e.x, e.y) <= 40 && this.OnClick_GotoHomeButton(), uiManager.isClickCloseEvent(e))
}, UI_Pause.prototype.OnClick_Sound = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), this.pauseSoundOnButton.visible && actionManager.Button_Click_Effect(this.pauseSoundOnButton), this.pauseSoundOffButton.visible && actionManager.Button_Click_Effect(this.pauseSoundOffButton), MG.game.time.events.add(300, this.OnClick_Sound_Start, this)
}, UI_Pause.prototype.OnClick_Sound_Start = function () {
    console.log("OnClick_Sound"), StorageManager.prototype.get("isSfx") ? (MG.AudioSwitch(StorageManager.prototype.get("isSfx")), uData.isSfx = !1, uData.isBGM = !1, this.pauseSoundOnButton.visible = !1, this.pauseSoundOffButton.visible = !0, isPlaying_GameBGM = !1, MG.StopBgm("bgm_game")) : (MG.AudioSwitch(StorageManager.prototype.get("isSfx")), uData.isSfx = !0, uData.isBGM = !0, this.pauseSoundOnButton.visible = !0, this.pauseSoundOffButton.visible = !1, isPlaying_GameBGM = !0, MG.PlayBgm("bgm_game", !0))
}, UI_Pause.prototype.OnClick_PauseClose = function () {
    this.onClick_close_button = !0, actionManager.Button_Click_Effect(this.pauseCloseButton), MG.game.time.events.add(300, this.OnClick_PauseClose_Start, this)
}, UI_Pause.prototype.OnClick_PauseClose_Start = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), stateManager.offPauseWindow(), uiManager.togglePause(), this.onClick_close_button = !1, this.pauseWindowGroup.visible = !1
}, UI_Pause.prototype.OnClick_GotoHomeButton = function () {
    actionManager.Button_Click_Effect(this.pauseHomeButton), MG.game.time.events.add(300, this.OnClick_GotoHomeButton_Start, this)
}, UI_Pause.prototype.OnClick_GotoHomeButton_Start = function () {
    this.VisibleWindow_IsGoHome(!0)
}, UI_Pause.prototype.onClick_OK = function () {
    Game.prototype.GotoHomeScene(), uiManager.OnClickEvent_StartButton(), this.VisibleWindow(!1), this.VisibleWindow_IsGoHome(!1)
}, UI_Pause.prototype.onClick_IsBuy_NO = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), this.VisibleWindow_IsGoHome(!1)
}, UI_EndSuccessGame.prototype.Start_EndSuccessGameWindow = function () {
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.gameOverWindowGroup.add(this.blackWall), this.panelOption = {
        game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY,
        w: 606, h: 839, off_l: 27, off_r: 27, off_t: 27, off_b: 27
    }, this.panelBG = uiManager.createImg9(this.panelOption), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(.5), this.gameOverWindowGroup.add(this.panelBG), this.titleText = MG.game.add.bitmapText(MG.game.world.centerX, 260, "uiFont", "Bitmap Fonts!", 50), this.titleText.anchor.setTo(.5, 0), this.titleText.setText("GAME OVER"), this.titleText.tint = 16023182, this.titleText.align = "center", this.gameOverWindowGroup.add(this.titleText), this.line = MG.game.add.sprite(MG.game.world.centerX, 340, "atlas_UI", "line_width.png"), this.line.scale.setTo(53, 1), this.line.alpha = .5, this.line.anchor.setTo(.5, .5), this.gameOverWindowGroup.add(this.line), this.rewardTitleText = MG.game.add.bitmapText(MG.game.world.centerX, 380, "uiFont", "Bitmap Fonts!", 26), this.rewardTitleText.anchor.setTo(.5, .5), this.rewardTitleText.setText("REWARD"), this.rewardTitleText.tint = 2079641, this.rewardTitleText.align = "center", this.gameOverWindowGroup.add(this.rewardTitleText), this.jewelIcon = MG.game.add.sprite(MG.game.world.centerX - 95, this.rewardTitleText.position.y + 45, "atlas_UI", "jewel.png"), this.jewelIcon.scale.setTo(.6, .6), this.jewelIcon.anchor.setTo(.5, .5), this.gameOverWindowGroup.add(this.jewelIcon), this.rewardScoreText = MG.game.add.bitmapText(MG.game.world.centerX + 15, this.rewardTitleText.position.y + 45, "uiFontBlack", "Bitmap Fonts!", 40), this.rewardScoreText.anchor.setTo(.5, .5), this.rewardScoreText.setText("0"), this.rewardScoreText.alpha = .6, this.rewardScoreText.align = "center", this.gameOverWindowGroup.add(this.rewardScoreText), this.Create_Months_Box(), this.line2 = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY + 245, "atlas_UI", "line_width.png"), this.line2.scale.setTo(53, 1), this.line2.alpha = .5, this.line2.anchor.setTo(.5, .5), this.gameOverWindowGroup.add(this.line2), this.rePlayButton = MG.game.add.sprite(-1e3, -1e3, "atlas_UI", "btn_over_replay.png"), this.rePlayButton.scale.setTo(0), this.rePlayButton.anchor.setTo(.5, .5), this.rePlayButton.inputEnabled = !0, this.rePlayButton.events.onInputUp.add(function () {
        this.OnClick_ReplayButton()
    }.bind(this)), this.gameOverWindowGroup.add(this.rePlayButton), this.gotoHomeButton = MG.game.add.sprite(-1e3, -1e3, "atlas_UI", "btn_pause_home.png"), this.gotoHomeButton.scale.setTo(0), this.gotoHomeButton.anchor.setTo(.5, .5), this.gotoHomeButton.inputEnabled = !0, this.gotoHomeButton.events.onInputUp.add(function () {
        this.OnClick_GotoHomeButton()
    }.bind(this)), this.gameOverWindowGroup.add(this.gotoHomeButton)
}, UI_EndSuccessGame.prototype.VisibleWindow = function (e) {
    this.gameOverWindowGroup.visible = e, e && (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), isHighest_record ? this.bestScoreText.setText(oldBest_months) : this.bestScoreText.setText(uData.nBestScore), isHighest_record ? this.bestScoreText2.setText(oldBest_months) : this.bestScoreText2.setText(uData.nBestScore), MG.game.world.bringToTop(this.gameOverWindowGroup))
}, UI_EndSuccessGame.prototype.Result_Action_State = function () {
    switch (this.action_iter++) {
        case 0:
            this.StartMonths_Animation();
            break;
        case 1:
            isHighest_record ? this.Play_New_RecordIcon() : this.Result_Action_State();
            break;
        case 2:
            isHighest_record ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_increase", !0), this.bestMonths_counter_event = MG.game.time.events.repeat(.05 * Phaser.Timer.SECOND, parseInt(uData.nBestScore - oldBest_months), this.AddCount_BestMonts_Text, this)) : this.Result_Action_State();
            break;
        case 3:
            StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_increase", !0), this.reward_counter_event = MG.game.time.events.repeat(.01 * Phaser.Timer.SECOND, assetManager.GetRewardJewelry("nStage"), this.AddCount_Reward_Text, this);
            break;
        case 4:
            this.Play_Buttons()
    }
}, UI_EndSuccessGame.prototype.Create_Months_Box = function () {
    this.bestScoreTitleText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 26), this.bestScoreTitleText.anchor.setTo(.5, .5), this.bestScoreTitleText.setText("BEST LEVEL"), this.bestScoreTitleText.tint = 16023182, this.bestScoreTitleText.align = "center", this.bestScoreTitleText2 = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 26), this.bestScoreTitleText2.anchor.setTo(.5, .5), this.bestScoreTitleText2.setText("BEST LEVEL"), this.bestScoreTitleText2.tint = 16023182, this.bestScoreTitleText2.align = "center", this.gameOverWindowGroup.add(this.bestScoreTitleText), this.gameOverWindowGroup.add(this.bestScoreTitleText2), this.SpineNode_BestMonths = this.FindSpineNode(this.months_spine, "text_best_months_1"), this.SpineNode_BestMonths.addChild(this.bestScoreTitleText), this.SpineNode_BestMonths2 = this.FindSpineNode(this.months_spine, "text_best_months_2"), this.SpineNode_BestMonths2.addChild(this.bestScoreTitleText2), this.scoreTitleText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 40), this.scoreTitleText.anchor.setTo(.5, .5), this.scoreTitleText.setText("LEVEL"), this.scoreTitleText.align = "center", this.gameOverWindowGroup.add(this.scoreTitleText), this.scoreTitleText2 = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 40), this.scoreTitleText2.anchor.setTo(.5, .5), this.scoreTitleText2.setText("LEVEL"), this.scoreTitleText2.align = "center", this.gameOverWindowGroup.add(this.scoreTitleText2), this.SpineNode_Months = this.FindSpineNode(this.months_spine, "text_months_1"), this.SpineNode_Months.addChild(this.scoreTitleText), this.SpineNode_Months2 = this.FindSpineNode(this.months_spine, "text_months_2"), this.SpineNode_Months2.addChild(this.scoreTitleText2), this.bestScoreText = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "Bitmap Fonts!", 40), this.bestScoreText.anchor.setTo(.5, .5), this.bestScoreText.setText("0"), this.bestScoreText.align = "center", this.gameOverWindowGroup.add(this.bestScoreText), this.bestScoreText2 = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "Bitmap Fonts!", 40), this.bestScoreText2.anchor.setTo(.5, .5), this.bestScoreText2.setText("0"), this.bestScoreText2.align = "center", this.gameOverWindowGroup.add(this.bestScoreText2), this.SpineNode_BestScoreCount = this.FindSpineNode(this.months_spine, "text_best_months_score_1"), this.SpineNode_BestScoreCount.addChild(this.bestScoreText), this.SpineNode_BestScoreCount2 = this.FindSpineNode(this.months_spine, "text_best_months_score_2"), this.SpineNode_BestScoreCount2.addChild(this.bestScoreText2), this.myScoreText = MG.game.add.bitmapText(0, 0, "uiFontBlack", "Bitmap Fonts!", 75), this.myScoreText.anchor.setTo(.5, .5), this.myScoreText.alpha = .65, this.myScoreText.setText("1"), this.gameOverWindowGroup.add(this.myScoreText), this.myScoreText2 = MG.game.add.bitmapText(0, 0, "uiFontBlack", "Bitmap Fonts!", 75), this.myScoreText2.anchor.setTo(.5, .5), this.myScoreText2.alpha = .65, this.myScoreText2.setText("1"), this.myScoreText2.align = "center", this.gameOverWindowGroup.add(this.myScoreText2), this.SpineNode_nowScore = this.FindSpineNode(this.months_spine, "text_months_score_1"), this.SpineNode_nowScore.addChild(this.myScoreText), this.SpineNode_nowScore2 = this.FindSpineNode(this.months_spine, "text_months_score_2"), this.SpineNode_nowScore2.addChild(this.myScoreText2), this.newRecordIcon = MG.game.add.sprite(-1e3, -1e3, "atlas_UI", "over_record.png"), this.newRecordIcon.scale.setTo(0), this.newRecordIcon.anchor.setTo(.5), this.gameOverWindowGroup.add(this.newRecordIcon)
}, UI_EndSuccessGame.prototype.StartMonths_Animation = function () {
    this.completeMonthsCounter = 0, StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_tear", !0), this.months_spine.setAnimationByName(0, "months_paper_ani", !1), uData.nStage - this.completeMonthsCounter > 20 ? this.months_spine.state.timeScale = .1 * (uData.nStage - this.completeMonthsCounter) : this.months_spine.state.timeScale = 2, this.gameOverWindowGroup.add(this.months_spine), this.months_spine.state.onComplete = function () {
        this.completeMonthsCounter < uData.nStage ? (this.completeMonthsCounter += 1, this.myScoreText.setText(this.completeMonthsCounter.toString()), this.myScoreText2.setText(this.completeMonthsCounter.toString()), this.SpineNode_nowScore2 = this.FindSpineNode(this.months_spine, "text_months_score_1"), this.SpineNode_nowScore2.addChild(this.myScoreText), this.months_spine.setAnimationByName(0, "months_paper_ani", !1)) : (StorageManager.prototype.get("isSfx") && MG.StopAudio("se_tear"), this.completeMonthsCounter = 1, this.myScoreText_last = MG.game.add.bitmapText(MG.game.world.centerX, MG.game.world.centerY + 20, "uiFontBlack", "Bitmap Fonts!", 75), this.myScoreText_last.anchor.setTo(.5, .5), this.myScoreText_last.alpha = .65, this.myScoreText_last.setText(uData.nStage), this.Result_Action_State()), uData.nStage - this.completeMonthsCounter > 20 && (this.months_spine.state.timeScale = .1 * (uData.nStage - this.completeMonthsCounter))
    }.bind(this), MG.game.input.onDown.add(function () {
        switch (this.action_iter) {
            case 0:
            case 1:
            case 2:
            case 3:
                StorageManager.prototype.get("isSfx") && MG.StopAudio("se_tear"), this.completeMonthsCounter = uData.nStage, this.myScoreText.setText(this.completeMonthsCounter.toString()), this.myScoreText2.setText(this.completeMonthsCounter.toString()), isHighest_record && (this.newRecordIcon.scale.setTo(2), this.newRecordIcon.position.setTo(100, 660), this.gameOverWindowGroup.swap(this.newRecordIcon, this.months_spine), MG.game.world.bringToTop(this.newRecordIcon), MG.game.time.events.remove(this.bestMonths_counter_event), this.bestScoreText.setText(uData.nBestScore)), this.action_iter = 3;
                break;
            case 4:
                StorageManager.prototype.get("isSfx") && MG.StopAudio("se_increase"), MG.game.time.events.remove(this.reward_counter_event), this.rewardScoreText.setText(assetManager.GetRewardJewelry("nStage")), this.Result_Action_State()
        }
    }, this)
}, UI_EndSuccessGame.prototype.Play_New_RecordIcon = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_newRecord"), this.gameOverWindowGroup.swap(this.newRecordIcon, this.months_spine), this.newRecordIcon.scale.setTo(6), this.newRecordIcon.position.setTo(100, 660), MG.game.world.bringToTop(this.newRecordIcon), MG.game.add.tween(this.newRecordIcon.scale).to({
        x: 2, y: 2
    }, 400, Phaser.Easing.Bounce.Out, !0).onComplete.add(function () {
        this.Result_Action_State()
    }.bind(this))
}, UI_EndSuccessGame.prototype.AddCount_BestMonts_Text = function () {
    var e = parseInt(this.bestScoreText.text);
    this.bestScoreText.setText(++e), e >= uData.nBestScore && (StorageManager.prototype.get("isSfx") && MG.StopAudio("se_increase"), this.Result_Action_State())
}, UI_EndSuccessGame.prototype.AddCount_Reward_Text = function () {
    var e = assetManager.GetRewardJewelry("nStage") - this.rewardCounter;
    this.rewardCounter += e > 300 ? 30 : e <= 300 && e > 200 ? 20 : e <= 200 && e > 100 ? 10 : e <= 100 && e > 50 ? 5 : e <= 50 && e > 20 ? 2 : 1, this.rewardScoreText.setText(this.rewardCounter), this.rewardCounter >= assetManager.GetRewardJewelry("nStage") && (StorageManager.prototype.get("isSfx") && MG.StopAudio("se_increase"), MG.game.time.events.remove(this.reward_counter_event), this.Result_Action_State())
}, UI_EndSuccessGame.prototype.Play_Buttons = function () {
    MG.game.world.bringToTop(this.rePlayButton), MG.game.world.bringToTop(this.gotoHomeButton), this.rePlayButton.scale.setTo(3), this.rePlayButton.position.setTo(MG.game.world.centerX - 80, 970), MG.game.add.tween(this.rePlayButton.scale).to({
        x: 1, y: 1
    }, 400, Phaser.Easing.Bounce.Out, !0).onComplete.add(function () {
        this.Result_Action_State()
    }.bind(this)), this.gotoHomeButton.scale.setTo(3), this.gotoHomeButton.position.setTo(MG.game.world.centerX + 80, 970), MG.game.add.tween(this.gotoHomeButton.scale).to({
        x: 1, y: 1
    }, 400, Phaser.Easing.Bounce.Out, !0)
}, UI_EndSuccessGame.prototype.OnClick_ReplayButton = function () {
    actionManager.Button_Click_Effect(this.rePlayButton), MG.game.time.events.add(300, this.OnClick_ReplayButton_Start, this)
}, UI_EndSuccessGame.prototype.OnClick_ReplayButton_Start = function () {
    this.gameOverWindowGroup.visible = !1, uiManager.OnClick_ReplayButton()
}, UI_EndSuccessGame.prototype.OnClick_GotoHomeButton = function () {
    actionManager.Button_Click_Effect(this.gotoHomeButton), MG.game.time.events.add(300, this.OnClick_GotoHomeButton_Start, this)
}, UI_EndSuccessGame.prototype.OnClick_GotoHomeButton_Start = function () {
    uiManager.OnClick_GotoUserItem()
}, UI_EndSuccessGame.prototype.FindSpineNode = function (e, t) {
    return e.children[e.skeleton.findSlotIndex(t)]
}, UI_MonthsJump.prototype.CreateWindow = function () {
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.monthsJumpWindowGroup.add(this.blackWall), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(.5), this.monthsJumpWindowGroup.add(this.panelBG), this.titleText.anchor.setTo(.5), this.titleText.setText("LEVEL JUMP"), this.titleText.align = "center", this.titleText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 230), this.monthsJumpWindowGroup.add(this.titleText), this.pauseCloseButton.scale.setTo(1), this.pauseCloseButton.anchor.setTo(.5, .5), this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT), this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 35, this.pauseCloseButton.position.y - 35), this.pauseCloseButton.inputEnabled = !0, this.pauseCloseButton.events.onInputUp.add(function () {
        actionManager.Button_Click_Effect(this.pauseCloseButton), MG.game.time.events.add(300, function () {
            StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), this.VisibleWindow(!1)
        }, this)
    }.bind(this)), this.monthsJumpWindowGroup.add(this.pauseCloseButton), this.monthsCountFrame.scale.setTo(1), this.monthsCountFrame.anchor.setTo(.5), this.monthsJumpWindowGroup.add(this.monthsCountFrame), this.leftSelectMonthsButton.scale.setTo(1), this.leftSelectMonthsButton.anchor.setTo(.5, .5), this.leftSelectMonthsButton.position.setTo(this.monthsCountFrame.position.x - 225, this.monthsCountFrame.position.y), this.leftSelectMonthsButton.inputEnabled = !0, this.leftSelectMonthsButton.events.onInputDown.add(function () {
        this.JumpMonths("down")
    }, this), this.leftSelectMonthsButton.visible = !1, this.monthsJumpWindowGroup.add(this.leftSelectMonthsButton), this.rightSelectMonthsButton.scale.setTo(-1, 1), this.rightSelectMonthsButton.anchor.setTo(.5, .5), this.rightSelectMonthsButton.position.setTo(this.monthsCountFrame.position.x + 225, this.monthsCountFrame.position.y), this.rightSelectMonthsButton.inputEnabled = !0, this.rightSelectMonthsButton.events.onInputDown.add(function () {
        this.JumpMonths("up")
    }, this), this.monthsJumpWindowGroup.add(this.rightSelectMonthsButton), this.selectedMonthText.anchor.setTo(.5), this.selectedMonthText.setText(jumpCount.toString()), this.selectedMonthText.align = "center", this.selectedMonthText.position.setTo(MG.game.world.centerX, this.monthsCountFrame.position.y - 20), this.monthsJumpWindowGroup.add(this.selectedMonthText), this.dialogText = MG.game.add.text(MG.game.world.centerX, MG.game.world.centerY + 70, GetString("Stage_Select"), this.dialogStyle), this.dialogText.anchor.setTo(.5, .5), this.monthsJumpWindowGroup.add(this.dialogText), this.playButton.scale.setTo(1), this.playButton.anchor.setTo(.5), this.playButton.inputEnabled = !0, this.playButton.events.onInputDown.add(this.PlayJumpGame, this), this.monthsJumpWindowGroup.add(this.playButton), this.jewelIcon.scale.setTo(.8, .8), this.jewelIcon.anchor.setTo(.5), this.jewelIcon.position.setTo(this.playButton.position.x - 90, this.playButton.position.y), this.monthsJumpWindowGroup.add(this.jewelIcon), this.jewelryCountText.anchor.setTo(.5), this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString()), this.jewelryCountText.align = "center", this.jewelryCountText.position.setTo(this.playButton.position.x + 40, this.jewelIcon.position.y), this.monthsJumpWindowGroup.add(this.jewelryCountText)
}, UI_MonthsJump.prototype.VisibleWindow = function (e) {
    this.monthsJumpWindowGroup.visible = e, e ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), jumpCount = 11, uData.nBestScore < 21 && (this.leftSelectMonthsButton.visible = !1, this.rightSelectMonthsButton.visible = !1), this.selectedMonthText.setText(jumpCount.toString()), this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString()), MG.game.world.bringToTop(this.monthsJumpWindowGroup)) : uiManager.VisibleTopJewelryGroup(!1)
}, UI_MonthsJump.prototype.JumpMonths = function (e) {
    "up" == e ? uData.nBestScore + 1 >= jumpCount + 10 && (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), jumpCount += 10, this.selectedMonthText.setText(jumpCount.toString()), this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString()), this.leftSelectMonthsButton.visible = !0, uData.nBestScore + 1 < jumpCount + 10 && (this.rightSelectMonthsButton.visible = !1)) : "down" == e && 11 <= jumpCount - 10 && (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_click"), jumpCount -= 10, this.selectedMonthText.setText(jumpCount.toString()), this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString()), this.rightSelectMonthsButton.visible = !0, 11 == jumpCount && (this.leftSelectMonthsButton.visible = !1))
}, UI_MonthsJump.prototype.PlayJumpGame = function () {
    actionManager.Button_Click_Effect(this.playButton), MG.game.time.events.add(300, this.PlayJumpGame_Start, this)
}, UI_MonthsJump.prototype.PlayJumpGame_Start = function () {
    uData.nJewelryCount < assetManager.GetMonthsJumpNeedJewelry(jumpCount) ? shopManager.OpenIsBuyWindow() : (uData.nJewelryCount -= assetManager.GetMonthsJumpNeedJewelry(jumpCount), StorageManager.prototype.set("nJewelryCount", uData.nJewelryCount), 1 == loginTF && networkManager.ForcedSaveData(), uiManager.OnClickEvent_JumpAnimationButton())
}, UI_MonthsJump_Animation.prototype.CreateWindow = function () {
    this.gradationBG.anchor.setTo(0, 0), this.gradationBG.scale.setTo(.1 * MG.game.world.width, 1), this.monthsJumpSpineGroup.add(this.gradationBG), this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.monthsJumpSpineGroup.add(this.blackWall), this.bestScoreTitleText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 26), this.bestScoreTitleText.anchor.setTo(.5, .5), this.bestScoreTitleText.setText("BEST LEVEL"), this.bestScoreTitleText.tint = 16023182, this.bestScoreTitleText.align = "center", this.bestScoreTitleText2 = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 26), this.bestScoreTitleText2.anchor.setTo(.5, .5), this.bestScoreTitleText2.setText("BEST LEVEL"), this.bestScoreTitleText2.tint = 16023182, this.bestScoreTitleText2.align = "center", this.monthsJumpSpineGroup.add(this.bestScoreTitleText), this.monthsJumpSpineGroup.add(this.bestScoreTitleText2), this.SpineNode_BestMonths = this.FindSpineNode(this.levelJump_spine, "text_best_months_1"), this.SpineNode_BestMonths.addChild(this.bestScoreTitleText), this.SpineNode_BestMonths2 = this.FindSpineNode(this.levelJump_spine, "text_best_months_2"), this.SpineNode_BestMonths2.addChild(this.bestScoreTitleText2), this.scoreTitleText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 40), this.scoreTitleText.anchor.setTo(.5, .5), this.scoreTitleText.setText("LEVEL"), this.scoreTitleText.align = "center", this.monthsJumpSpineGroup.add(this.scoreTitleText), this.scoreTitleText2 = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 40), this.scoreTitleText2.anchor.setTo(.5, .5), this.scoreTitleText2.setText("LEVEL"), this.scoreTitleText2.align = "center", this.monthsJumpSpineGroup.add(this.scoreTitleText2), this.SpineNode_Months = this.FindSpineNode(this.levelJump_spine, "text_months_1"), this.SpineNode_Months.addChild(this.scoreTitleText), this.SpineNode_Months2 = this.FindSpineNode(this.levelJump_spine, "text_months_2"), this.SpineNode_Months2.addChild(this.scoreTitleText2), this.bestScoreText = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "Bitmap Fonts!", 40), this.bestScoreText.anchor.setTo(.5, .5), this.bestScoreText.setText(uData.nBestScore), this.bestScoreText.align = "center", this.monthsJumpSpineGroup.add(this.bestScoreText), this.bestScoreText2 = MG.game.add.bitmapText(0, 0, "numberFont_Pink", "Bitmap Fonts!", 40), this.bestScoreText2.anchor.setTo(.5, .5), this.bestScoreText2.setText(uData.nBestScore), this.bestScoreText2.align = "center", this.monthsJumpSpineGroup.add(this.bestScoreText2), this.SpineNode_BestScoreCount = this.FindSpineNode(this.levelJump_spine, "text_best_months_score_1"), this.SpineNode_BestScoreCount.addChild(this.bestScoreText), this.SpineNode_BestScoreCount2 = this.FindSpineNode(this.levelJump_spine, "text_best_months_score_2"), this.SpineNode_BestScoreCount2.addChild(this.bestScoreText2), this.myScoreText = MG.game.add.bitmapText(0, 0, "uiFontBlack", "Bitmap Fonts!", 75), this.myScoreText.anchor.setTo(.5, .5), this.myScoreText.alpha = .65, this.myScoreText.setText("1"), this.monthsJumpSpineGroup.add(this.myScoreText), this.myScoreText2 = MG.game.add.bitmapText(0, 0, "uiFontBlack", "Bitmap Fonts!", 75), this.myScoreText2.anchor.setTo(.5, .5), this.myScoreText2.alpha = .65, this.myScoreText2.setText("1"), this.myScoreText2.align = "center", this.monthsJumpSpineGroup.add(this.myScoreText2), this.SpineNode_nowScore = this.FindSpineNode(this.levelJump_spine, "text_months_score_1"), this.SpineNode_nowScore.addChild(this.myScoreText), this.SpineNode_nowScore2 = this.FindSpineNode(this.levelJump_spine, "text_months_score_2"), this.SpineNode_nowScore2.addChild(this.myScoreText2)
}, UI_MonthsJump_Animation.prototype.VisibleWindow = function (e) {
    this.monthsJumpSpineGroup.visible = e
}, UI_MonthsJump_Animation.prototype.JumpAnimation_Ready = function () {
    this.VisibleWindow(!0), this.StartMonths_Animation()
}, UI_MonthsJump_Animation.prototype.StartMonths_Animation = function () {
    this.completeMonthsCounter = 1, StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_tear", !0), this.levelJump_spine.setAnimationByName(0, "months_paper_ani", !1), jumpCount - this.completeMonthsCounter < jumpCount - 20 ? this.levelJump_spine.state.timeScale = .2 * (jumpCount - this.completeMonthsCounter) : this.levelJump_spine.state.timeScale = 3, this.monthsJumpSpineGroup.add(this.levelJump_spine), this.levelJump_spine.state.onComplete = function () {
        this.completeMonthsCounter < jumpCount ? (this.completeMonthsCounter += 1, this.myScoreText.setText(this.completeMonthsCounter.toString()), this.myScoreText2.setText(this.completeMonthsCounter.toString()), this.SpineNode_nowScore2 = this.FindSpineNode(this.levelJump_spine, "text_months_score_1"), this.SpineNode_nowScore2.addChild(this.myScoreText), this.levelJump_spine.setAnimationByName(0, "months_paper_ani", !1)) : (StorageManager.prototype.get("isSfx") && MG.StopAudio("se_tear"), this.completeMonthsCounter = jumpCount, this.myScoreText_last = MG.game.add.bitmapText(MG.game.world.centerX, MG.game.world.centerY, "uiFontBlack", "Bitmap Fonts!", 75), this.myScoreText_last.anchor.setTo(.5, .5), this.myScoreText_last.alpha = .65, this.myScoreText_last.setText(jumpCount), MG.game.time.events.add(800, this.EnterGame, this)), jumpCount - this.completeMonthsCounter > 20 && (this.levelJump_spine.state.timeScale = .2 * (jumpCount - this.completeMonthsCounter))
    }.bind(this)
}, UI_MonthsJump_Animation.prototype.EnterGame = function () {
    uData.nStage = jumpCount, Game.prototype.Set_Complete_Area(), this.VisibleWindow(!1), uiManager.OnClickEvent_PlayButton()
}, UI_MonthsJump_Animation.prototype.FindSpineNode = function (e, t) {
    return e.children[e.skeleton.findSlotIndex(t)]
}, UI_MonthsOpen.prototype.Get_Months_Open = function () {
    if (uData.nStage <= 10) return "";
    for (var e = "", t = 0; t < uData.nStage.toString().length - 1; t++) e += uData.nStage.toString()[t];
    return e + 1
}, UI_MonthsOpen.prototype.CreateWindow = function () {
    this.panelBG = uiManager.createImg9(this.panelOption), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(.5), this.monthsOpenWindowGroup.add(this.panelBG), this.titleText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 52), this.titleText.anchor.setTo(.5), this.titleText.setText("LEVEL OPEN"), this.titleText.align = "center", this.titleText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 230), this.monthsOpenWindowGroup.add(this.titleText), this.monthsCountFrame = uiManager.createImg9(this.monthsCountFrameOption), this.monthsCountFrame.scale.setTo(1), this.monthsCountFrame.anchor.setTo(.5), this.monthsOpenWindowGroup.add(this.monthsCountFrame), this.selectedMonthText = MG.game.add.bitmapText(0, 0, "uiFont", "Bitmap Fonts!", 125), this.selectedMonthText.anchor.setTo(.5), this.selectedMonthText.setText(this.months_text), this.selectedMonthText.align = "center", this.selectedMonthText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 10), this.monthsOpenWindowGroup.add(this.selectedMonthText), this.dialogText = MG.game.add.text(MG.game.world.centerX, MG.game.world.centerY + 210, GetString("Stage_Open", this.months_text), this.dialogStyle), this.dialogText.anchor.setTo(.5, .5), this.monthsOpenWindowGroup.add(this.dialogText)
}, UI_MonthsOpen.prototype.VisibleWindow = function (e) {
    e ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), this.monthsOpenWindowGroup.visible = !0, MG.game.world.bringToTop(this.monthsOpenWindowGroup)) : this.monthsOpenWindowGroup.visible = !1
}, UI_Tutorial.prototype.Create_Window = function () {
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.windowGroup.add(this.blackWall), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(.5), this.windowGroup.add(this.panelBG), this.panel2BG.scale.setTo(1), this.panel2BG.anchor.setTo(.5), this.windowGroup.add(this.panel2BG), this.titleText.anchor.setTo(.5), this.titleText.setText("HOW TO PLAY"), this.titleText.alpha = .6, this.titleText.align = "center", this.titleText.position.setTo(MG.game.world.centerX, 120), this.windowGroup.add(this.titleText), this.pauseCloseButton.scale.setTo(1), this.pauseCloseButton.anchor.setTo(.5, .5), this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT), this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 25, this.pauseCloseButton.position.y - 25), this.pauseCloseButton.inputEnabled = !0, this.pauseCloseButton.events.onInputUp.add(this.OnClick_CloseButton, this), this.windowGroup.add(this.pauseCloseButton)
}, UI_Tutorial.prototype.VisibleWindow = function (e) {
    this.windowGroup.visible = e, this.contentsGroup.visible = e, e && (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), this.tutorialDrag.position.setTo(MG.game.world.centerX, this.DEFAULT_Y), this.onDragUpdate(), MG.game.world.bringToTop(this.windowGroup), MG.game.world.bringToTop(this.contentsGroup))
}, UI_Tutorial.prototype.isClickCloseEvent = function (e) {
    Phaser.Math.distance(this.pauseCloseButton.position.x, this.pauseCloseButton.position.y, e.x, e.y) <= 20 && this.VisibleWindow(!1)
}, UI_Tutorial.prototype.isVisibleWindow = function () {
    return this.windowGroup.visible
}, UI_Tutorial.prototype.onDragUpdate = function (e, t) {
    for (var i = 0; i < this.bg_data.length; i++) this.bg_data[i].position.y = this.tutorialDrag.position.y + this.bg_gap[i], this.contents_data[i].position.y = this.tutorialDrag.position.y + this.content_gap[i];
    for (i = 0; i < this.text_data.length; i++) this.text_data[i].position.y = this.tutorialDrag.position.y + this.text_gap[i];
    this.dialogText_2_2.position.y = this.text_data[1].position.y + 85
}, UI_Tutorial.prototype.OnClick_CloseButton = function () {
    stateManager.IsPlayTutorial() && "userItme" == currentScene && uiManager.OnClickEvent_PlayButton(), stateManager.IsPlayTutorial() && "readyGame" == currentScene && userItemManager.DisplayUserItem(), this.VisibleWindow(!1)
}, UI_Continue.prototype.CreateWindow = function () {
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.monthsContinueGroup.add(this.blackWall), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(.5), this.monthsContinueGroup.add(this.panelBG), this.titleText.anchor.setTo(.5), this.titleText.setText("CONTINUE?"), this.titleText.alpha = .6, this.titleText.align = "center", this.titleText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 240), this.monthsContinueGroup.add(this.titleText), this.line.scale.setTo(50, 1), this.line.alpha = .5, this.line.anchor.setTo(.5, .5), this.line.position.setTo(MG.game.world.centerX, this.titleText.position.y + 60), this.monthsContinueGroup.add(this.line), this.pauseCloseButton.scale.setTo(1), this.pauseCloseButton.anchor.setTo(.5, .5), this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT), this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 35, this.pauseCloseButton.position.y - 35), this.pauseCloseButton.inputEnabled = !0, this.pauseCloseButton.events.onInputUp.add(this.OnClick_CloseButton, this), this.monthsContinueGroup.add(this.pauseCloseButton), this.upIcon.anchor.setTo(.5, .5), this.monthsContinueGroup.add(this.upIcon), this.flyTimer.anchor.setTo(.5, .5), this.flyObjectGroup.add(this.flyTimer), this.dialogText = MG.game.add.text(MG.game.world.centerX, MG.game.world.centerY + 70, GetString("Stage_Continue", MG.gameSheetsData.ContinueHeartCount), this.dialogStyle), this.dialogText.anchor.setTo(.5, .5), this.monthsContinueGroup.add(this.dialogText), this.playButton.scale.setTo(1), this.playButton.anchor.setTo(.5), this.playButton.inputEnabled = !0, this.playButton.events.onInputDown.add(this.PlayContinueGame, this), this.monthsContinueGroup.add(this.playButton), this.jewelIcon.scale.setTo(.8, .8), this.jewelIcon.anchor.setTo(.5), this.jewelIcon.position.setTo(this.playButton.position.x - 80, this.playButton.position.y), this.monthsContinueGroup.add(this.jewelIcon), this.jewelryCountText.anchor.setTo(.5), this.jewelryCountText.setText("0"), this.jewelryCountText.align = "center", this.jewelryCountText.position.setTo(this.playButton.position.x + 40, this.jewelIcon.position.y), this.monthsContinueGroup.add(this.jewelryCountText)
}, UI_Continue.prototype.VisibleWindow = function (e) {
    this.monthsContinueGroup.visible = e, e && (this.bContinue = !1, StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), uiManager.InputEnabled_PauseButton(!1), continueCounter++, this.jewelryCountText.setText(assetManager.GetContinueNeedJewelry().toString()), ballManager.VisibleBalls(!1), MG.game.world.bringToTop(this.monthsContinueGroup), this.VisibleFlyObjectWindow(!0))
}, UI_Continue.prototype.VisibleFlyObjectWindow = function (e) {
    this.flyObjectGroup.visible = e, e && (this.flyObjectGroup.position.setTo(0, 0), this.flyTimer.scale.setTo(1, 1), MG.game.world.bringToTop(this.flyObjectGroup))
}, UI_Continue.prototype.OnClick_CloseButton = function () {
    this.bContinue || (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), actionManager.Button_Click_Effect(this.pauseCloseButton), stateManager.IsStopSkill() && ballManager.StopSkill_Cancle(), MG.game.time.events.add(300, this.OnClick_CloseButton_Start, this))
}, UI_Continue.prototype.OnClick_CloseButton_Start = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), uiManager.VisibleTopJewelryGroup(!1), stateManager.offContinue(), this.VisibleWindow(!1), this.VisibleFlyObjectWindow(!1), Game.prototype.FailGame()
}, UI_Continue.prototype.PlayContinueGame = function () {
    actionManager.Button_Click_Effect(this.playButton), uData.nJewelryCount >= assetManager.GetContinueNeedJewelry() && (this.bContinue = !0), MG.game.time.events.add(300, this.PlayContinueGame_Start, this)
}, UI_Continue.prototype.PlayContinueGame_Start = function () {
    uData.nJewelryCount < assetManager.GetContinueNeedJewelry() ? shopManager.OpenIsBuyWindow() : (currentScene = "game", uiManager.InputEnabled_PauseButton(!0), uiManager.VisibleTopJewelryGroup(!1), MG.game.add.tween(this.flyTimer.scale).to({
        x: .3, y: .3
    }, 800, Phaser.Easing.Quartic.Out, !0), MG.game.add.tween(this.flyObjectGroup).to({
        x: -220, y: -400
    }, 800, Phaser.Easing.Quartic.Out, !0).onComplete.add(function () {
        assetManager.SmoothRefillTime(), this.VisibleWindow(!1), this.VisibleFlyObjectWindow(!1)
    }.bind(this)))
}, UI_JewelryShop.prototype.Create_Window = function () {
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall.anchor.setTo(.5), this.blackWall.alpha = .75, this.blackWall.inputEnabled = !0, this.blackWall.events.onInputUp.add(function () {
    }), this.jewelryShopWindowGroup.add(this.blackWall), this.panelBG.scale.setTo(1), this.panelBG.anchor.setTo(.5), this.jewelryShopWindowGroup.add(this.panelBG), this.titleText.anchor.setTo(.5, 0), this.titleText.setText("JEWEL SHOP"), this.titleText.tint = 16023182, this.titleText.align = "center", this.jewelryShopWindowGroup.add(this.titleText), this.itemPanel1BG_1.scale.setTo(1), this.itemPanel1BG_1.anchor.setTo(.5), this.itemPanel1BG_1.position.setTo(MG.game.world.centerX, 460), this.jewelryShopWindowGroup.add(this.itemPanel1BG_1), this.jewelryIcon_1.scale.setTo(1), this.jewelryIcon_1.anchor.setTo(.5), this.jewelryIcon_1.position.setTo(this.itemPanel1BG_1.position.x - 190, this.itemPanel1BG_1.position.y), this.jewelryShopWindowGroup.add(this.jewelryIcon_1), this.itemPanel1_Text.anchor.setTo(1, .5), this.itemPanel1_Text.position.setTo(this.itemPanel1BG_1.position.x + 80, this.itemPanel1BG_1.position.y - 15), this.itemPanel1_Text.setText("x" + shopManager.Get_Reward_Count(0)), this.itemPanel1_Text.align = "right", this.jewelryShopWindowGroup.add(this.itemPanel1_Text), this.getJewelry_Button_BG_1_OFF.scale.setTo(1), this.getJewelry_Button_BG_1_OFF.anchor.setTo(.5), this.getJewelry_Button_BG_1_OFF.position.setTo(this.itemPanel1BG_1.position.x + 180, this.itemPanel1BG_1.position.y), this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_1_OFF), this.getJewelry_Button_BG_1.scale.setTo(1), this.getJewelry_Button_BG_1.anchor.setTo(.5), this.getJewelry_Button_BG_1.position.setTo(this.itemPanel1BG_1.position.x + 180, this.itemPanel1BG_1.position.y), this.getJewelry_Button_BG_1.inputEnabled = !0, this.getJewelry_Button_BG_1.events.onInputUp.add(function () {
        shopManager.Buy_Jewelry(0)
    }), this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_1), this.itemPanel_PayCounter_Text_1.anchor.setTo(.5), this.itemPanel_PayCounter_Text_1.position.setTo(this.getJewelry_Button_BG_1.position.x, this.getJewelry_Button_BG_1.position.y), this.itemPanel_PayCounter_Text_1.setText("AD"), this.itemPanel_PayCounter_Text_1.align = "center", this.jewelryShopWindowGroup.add(this.itemPanel_PayCounter_Text_1), this.itemPanel_CollTime_Text_1.anchor.setTo(.5), this.itemPanel_CollTime_Text_1.position.setTo(this.getJewelry_Button_BG_1_OFF.position.x, this.getJewelry_Button_BG_1_OFF.position.y - 5), this.itemPanel_CollTime_Text_1.setText(""), this.itemPanel_CollTime_Text_1.align = "center", this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_1), this.itemPanel1BG_2.scale.setTo(1), this.itemPanel1BG_2.anchor.setTo(.5), this.itemPanel1BG_2.position.setTo(MG.game.world.centerX, 605), this.jewelryShopWindowGroup.add(this.itemPanel1BG_2), this.itemPanel2_Text.anchor.setTo(1, .5), this.itemPanel2_Text.position.setTo(this.itemPanel1BG_2.position.x + 80, this.itemPanel1BG_2.position.y - 15), this.itemPanel2_Text.setText("x" + shopManager.Get_Reward_Count(1)), this.itemPanel2_Text.align = "right", this.jewelryShopWindowGroup.add(this.itemPanel2_Text), this.jewelryIcon_2.scale.setTo(.7), this.jewelryIcon_2.anchor.setTo(.5), this.jewelryIcon_2.position.setTo(this.itemPanel1BG_2.position.x - 190, this.itemPanel1BG_2.position.y), this.jewelryShopWindowGroup.add(this.jewelryIcon_2), this.getJewelry_Button_BG_2_OFF.scale.setTo(1), this.getJewelry_Button_BG_2_OFF.anchor.setTo(.5), this.getJewelry_Button_BG_2_OFF.position.setTo(this.itemPanel1BG_2.position.x + 180, this.itemPanel1BG_2.position.y), this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_2_OFF), this.getJewelry_Button_BG_2.scale.setTo(1), this.getJewelry_Button_BG_2.anchor.setTo(.5), this.getJewelry_Button_BG_2.position.setTo(this.itemPanel1BG_2.position.x + 180, this.itemPanel1BG_2.position.y), this.getJewelry_Button_BG_2.inputEnabled = !0, this.getJewelry_Button_BG_2.events.onInputUp.add(function () {
        shopManager.Buy_Jewelry(1)
    }), this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_2), this.ad_icon_1.scale.setTo(1), this.ad_icon_1.anchor.setTo(.5), this.ad_icon_1.position.setTo(this.getJewelry_Button_BG_2.position.x, this.getJewelry_Button_BG_2.position.y), this.jewelryShopWindowGroup.add(this.ad_icon_1), this.itemPanel_CollTime_Text_2.anchor.setTo(.5), this.itemPanel_CollTime_Text_2.position.setTo(this.getJewelry_Button_BG_2_OFF.position.x, this.getJewelry_Button_BG_2_OFF.position.y - 5), this.itemPanel_CollTime_Text_2.setText(""), this.itemPanel_CollTime_Text_2.align = "center", this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_2), this.itemPanel2BG_1.scale.setTo(1), this.itemPanel2BG_1.anchor.setTo(.5), this.itemPanel2BG_1.position.setTo(MG.game.world.centerX, 750), this.jewelryShopWindowGroup.add(this.itemPanel2BG_1), this.jewelryIcon_3.scale.setTo(1), this.jewelryIcon_3.anchor.setTo(.5), this.jewelryIcon_3.position.setTo(this.itemPanel2BG_1.position.x - 190, this.itemPanel2BG_1.position.y), this.jewelryShopWindowGroup.add(this.jewelryIcon_3), this.itemPanel3_Text.anchor.setTo(1, .5), this.itemPanel3_Text.position.setTo(this.itemPanel2BG_1.position.x + 80, this.itemPanel2BG_1.position.y - 15), this.itemPanel3_Text.setText("x" + shopManager.Get_Reward_Count(2)), this.itemPanel3_Text.align = "right", this.jewelryShopWindowGroup.add(this.itemPanel3_Text), this.getJewelry_Button_BG_3_OFF.scale.setTo(1), this.getJewelry_Button_BG_3_OFF.anchor.setTo(.5), this.getJewelry_Button_BG_3_OFF.position.setTo(this.itemPanel2BG_1.position.x + 180, this.itemPanel2BG_1.position.y), this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_3_OFF), this.getJewelry_Button_BG_3.scale.setTo(1), this.getJewelry_Button_BG_3.anchor.setTo(.5), this.getJewelry_Button_BG_3.position.setTo(this.itemPanel2BG_1.position.x + 180, this.itemPanel2BG_1.position.y), this.getJewelry_Button_BG_3.inputEnabled = !0, this.getJewelry_Button_BG_3.events.onInputUp.add(function () {
        shopManager.Buy_Jewelry(2)
    }),this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_3),this.itemPanel_PayCounter_Text_3.anchor.setTo(.5),this.itemPanel_PayCounter_Text_3.position.setTo(this.getJewelry_Button_BG_3.position.x, this.getJewelry_Button_BG_3.position.y),this.itemPanel_PayCounter_Text_3.setText("AD"),this.itemPanel_PayCounter_Text_3.align = "center",this.jewelryShopWindowGroup.add(this.itemPanel_PayCounter_Text_3),this.itemPanel_CollTime_Text_3.anchor.setTo(.5),this.itemPanel_CollTime_Text_3.position.setTo(this.getJewelry_Button_BG_3_OFF.position.x, this.getJewelry_Button_BG_3_OFF.position.y - 5),this.itemPanel_CollTime_Text_3.setText(""),this.itemPanel_CollTime_Text_3.align = "center",this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_3),this.itemPanel2BG_2.scale.setTo(1),this.itemPanel2BG_2.anchor.setTo(.5),this.itemPanel2BG_2.position.setTo(MG.game.world.centerX, 895),this.jewelryShopWindowGroup.add(this.itemPanel2BG_2),this.jewelryIcon_4.scale.setTo(.8),this.jewelryIcon_4.anchor.setTo(.5),this.jewelryIcon_4.position.setTo(this.itemPanel2BG_2.position.x - 190, this.itemPanel2BG_2.position.y),this.jewelryShopWindowGroup.add(this.jewelryIcon_4),this.itemPanel4_Text.anchor.setTo(1, .5),this.itemPanel4_Text.position.setTo(this.itemPanel2BG_2.position.x + 80, this.itemPanel2BG_2.position.y - 15),this.itemPanel4_Text.setText("x" + shopManager.Get_Reward_Count(3)),this.itemPanel4_Text.align = "right",this.jewelryShopWindowGroup.add(this.itemPanel4_Text),this.getJewelry_Button_BG_4_OFF.scale.setTo(1),this.getJewelry_Button_BG_4_OFF.anchor.setTo(.5),this.getJewelry_Button_BG_4_OFF.position.setTo(this.itemPanel2BG_2.position.x + 180, this.itemPanel2BG_2.position.y),this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_4_OFF),this.getJewelry_Button_BG_4.scale.setTo(1),this.getJewelry_Button_BG_4.anchor.setTo(.5),this.getJewelry_Button_BG_4.position.setTo(this.itemPanel2BG_2.position.x + 180, this.itemPanel2BG_2.position.y),this.getJewelry_Button_BG_4.inputEnabled = !0,this.getJewelry_Button_BG_4.events.onInputUp.add(function () {
        shopManager.Buy_Jewelry(3)
    }),this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_4),this.ad_icon_2.scale.setTo(1),this.ad_icon_2.anchor.setTo(.5),this.ad_icon_2.position.setTo(this.getJewelry_Button_BG_4.position.x, this.getJewelry_Button_BG_4.position.y),this.jewelryShopWindowGroup.add(this.ad_icon_2),this.itemPanel_CollTime_Text_4.anchor.setTo(.5),this.itemPanel_CollTime_Text_4.position.setTo(this.getJewelry_Button_BG_4_OFF.position.x, this.getJewelry_Button_BG_4_OFF.position.y - 5),this.itemPanel_CollTime_Text_4.setText(""),this.itemPanel_CollTime_Text_4.align = "center",this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_4),this.okButton.position.setTo(MG.game.world.centerX, 1035),this.okButton.scale.setTo(1.4),this.okButton.anchor.setTo(.5),this.okButton.inputEnabled = !0,this.okButton.events.onInputUp.add(this.onClick_OK, this),this.jewelryShopWindowGroup.add(this.okButton),this.ok_Text = MG.game.add.bitmapText(this.okButton.position.x, this.okButton.position.y, "uiFont", "Bitmap Fonts!", 45),this.ok_Text.anchor.setTo(.5),this.ok_Text.setText("OK"),this.ok_Text.align = "center",this.jewelryShopWindowGroup.add(this.ok_Text)
}, UI_JewelryShop.prototype.Create_IsBuyWindow = function () {
    this.blackWall_IsBuy.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall_IsBuy.anchor.setTo(.5), this.blackWall_IsBuy.alpha = .75, this.blackWall_IsBuy.inputEnabled = !0, this.blackWall_IsBuy.events.onInputUp.add(function () {
    }), this.windowIsBuyGroup.add(this.blackWall_IsBuy), this.isBuyPanelBG.scale.setTo(1), this.isBuyPanelBG.anchor.setTo(.5), this.windowIsBuyGroup.add(this.isBuyPanelBG), this.isBuyPanel_MessageBG.scale.setTo(1), this.isBuyPanel_MessageBG.anchor.setTo(.5), this.windowIsBuyGroup.add(this.isBuyPanel_MessageBG), this.isBuy_dialog.anchor.setTo(.5), this.isBuy_dialog.position.setTo(this.isBuyPanel_MessageBG.position.x, this.isBuyPanel_MessageBG.position.y), this.windowIsBuyGroup.add(this.isBuy_dialog), this.okButton_IsBuy.position.setTo(MG.game.world.centerX + 130, this.isBuyPanelBG.position.y + 125), this.okButton_IsBuy.anchor.setTo(.5), this.okButton_IsBuy.inputEnabled = !0, this.okButton_IsBuy.events.onInputUp.add(this.onClick_IsBuy_OK, this), this.windowIsBuyGroup.add(this.okButton_IsBuy), this.ok_Text = MG.game.add.bitmapText(this.okButton_IsBuy.position.x, this.okButton_IsBuy.position.y, "uiFont", "Bitmap Fonts!", 45), this.ok_Text.anchor.setTo(.5), this.ok_Text.setText("YES"), this.ok_Text.align = "center", this.windowIsBuyGroup.add(this.ok_Text), this.noButton_IsBuy.position.setTo(MG.game.world.centerX - 130, this.isBuyPanelBG.position.y + 125), this.noButton_IsBuy.anchor.setTo(.5), this.noButton_IsBuy.inputEnabled = !0, this.noButton_IsBuy.events.onInputUp.add(this.onClick_IsBuy_NO, this), this.windowIsBuyGroup.add(this.noButton_IsBuy), this.no_Text = MG.game.add.bitmapText(this.noButton_IsBuy.position.x, this.noButton_IsBuy.position.y, "uiFont", "Bitmap Fonts!", 45), this.no_Text.anchor.setTo(.5), this.no_Text.align = "center", this.no_Text.setText("NO"), this.windowIsBuyGroup.add(this.no_Text)
}, UI_JewelryShop.prototype.Create_OkBuyWindow = function () {
    this.blackWall_OkBuy.scale.setTo(MG.game.world.width, MG.game.world.height), this.blackWall_OkBuy.anchor.setTo(.5), this.blackWall_OkBuy.alpha = .75, this.blackWall_OkBuy.inputEnabled = !0, this.blackWall_OkBuy.events.onInputUp.add(function () {
    }), this.windowOkBuyGroup.add(this.blackWall_OkBuy), this.OkBuyPanelBG.scale.setTo(1), this.OkBuyPanelBG.anchor.setTo(.5), this.windowOkBuyGroup.add(this.OkBuyPanelBG), this.OkBuyPanel_MessageBG.scale.setTo(1), this.OkBuyPanel_MessageBG.anchor.setTo(.5), this.windowOkBuyGroup.add(this.OkBuyPanel_MessageBG), this.OkBuy_dialog.anchor.setTo(.5), this.OkBuy_dialog.position.setTo(this.isBuyPanel_MessageBG.position.x, this.isBuyPanel_MessageBG.position.y), this.windowOkBuyGroup.add(this.OkBuy_dialog), this.okButton_OkBuy.position.setTo(MG.game.world.centerX, this.isBuyPanelBG.position.y + 125), this.okButton_OkBuy.anchor.setTo(.5), this.okButton_OkBuy.inputEnabled = !0, this.okButton_OkBuy.events.onInputUp.add(this.onClick_IsBuy_OK, this), this.windowOkBuyGroup.add(this.okButton_OkBuy), this.ok_OkText = MG.game.add.bitmapText(this.okButton_OkBuy.position.x, this.okButton_OkBuy.position.y, "uiFont", "Bitmap Fonts!", 45), this.ok_OkText.anchor.setTo(.5), this.ok_OkText.setText("OK"), this.ok_OkText.align = "center", this.windowOkBuyGroup.add(this.ok_OkText)
}, UI_JewelryShop.prototype.VisibleWindow = function (e) {
    this.jewelryShopWindowGroup.visible = e, e ? (StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), MG.game.world.bringToTop(this.jewelryShopWindowGroup)) : shopManager.CloseJewelShopWindow()
}, UI_JewelryShop.prototype.Set_CoolTime_0 = function (e) {
    "none" != e ? (this.getJewelry_Button_BG_1.visible = !1, this.getJewelry_Button_BG_1_OFF.visible = !0, this.itemPanel_PayCounter_Text_1.setText(""), this.itemPanel_CollTime_Text_1.setText(e)) : (this.getJewelry_Button_BG_1.visible = !0, this.getJewelry_Button_BG_1_OFF.visible = !1, this.itemPanel_PayCounter_Text_1.setText("AD"), this.itemPanel_CollTime_Text_1.setText(""))
}, UI_JewelryShop.prototype.Set_CoolTime_1 = function (e) {
    "none" != e ? (this.getJewelry_Button_BG_2.visible = !1, this.getJewelry_Button_BG_2_OFF.visible = !0, this.ad_icon_1.visible = !1, this.itemPanel_CollTime_Text_2.setText(e)) : (this.getJewelry_Button_BG_2.visible = !0, this.getJewelry_Button_BG_2_OFF.visible = !1, this.ad_icon_1.visible = !0, this.itemPanel_CollTime_Text_2.setText(""))
}, UI_JewelryShop.prototype.Set_CoolTime_2 = function (e) {
    "none" != e ? (this.getJewelry_Button_BG_3.visible = !1, this.getJewelry_Button_BG_3_OFF.visible = !0, this.itemPanel_PayCounter_Text_3.setText(""), this.itemPanel_CollTime_Text_3.setText(e)) : (this.getJewelry_Button_BG_3.visible = !0, this.getJewelry_Button_BG_3_OFF.visible = !1, this.itemPanel_PayCounter_Text_3.setText("AD"), this.itemPanel_CollTime_Text_3.setText(""))
}, UI_JewelryShop.prototype.Set_CoolTime_3 = function (e) {
    "none" != e ? (this.getJewelry_Button_BG_4.visible = !1, this.getJewelry_Button_BG_4_OFF.visible = !0, this.ad_icon_2.visible = !1, this.itemPanel_CollTime_Text_4.setText(e)) : (this.getJewelry_Button_BG_4.visible = !0, this.getJewelry_Button_BG_4_OFF.visible = !1, this.ad_icon_2.visible = !0, this.itemPanel_CollTime_Text_4.setText(""))
}, UI_JewelryShop.prototype.VisibleIsBuyWindow = function (e) {
    this.windowIsBuyGroup.visible = e, e && MG.game.world.bringToTop(this.windowIsBuyGroup)
}, UI_JewelryShop.prototype.VisibleOkBuyWindow = function (e, t) {
    this.windowOkBuyGroup.visible = e, e && (void 0 != t && this.OkBuy_dialog.setText(GetString("GEM_Get", t)), MG.game.world.bringToTop(this.windowOkBuyGroup))
}, UI_JewelryShop.prototype.onClick_OK = function () {
    this.VisibleWindow(!1)
},UI_JewelryShop.prototype.onClick_IsBuy_OK = function () {
    this.VisibleOkBuyWindow(!1), this.VisibleWindow(!0)
},UI_JewelryShop.prototype.onClick_IsBuy_NO = function () {
    StorageManager.prototype.get("isSfx") && MG.PlayAudio("se_popup_off"), this.VisibleIsBuyWindow(!1)
};
var uiManager = _uiManager.Instance, figureManager = _figureManager.Instance, actionManager = _actionManager.Instance,
    assetManager = _assetManager.Instance, stageManager = _stageManager.Instance, feverManager = _feverManager.Instance,
    ballManager = _ballManager.Instance, userItemManager = _userItemManager.Instance,
    buffItemManager = _buffItemManager.Instance, bombEffecter = _bombEffecter.Instance,
    stateManager = _stateManager.Instance, shopManager = _shopManager.Instance,
    playTutorialManager = _playTutorialManager.Instance;