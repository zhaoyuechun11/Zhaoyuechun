gc.ResultPopup = function () {
    PIXI.Container.call(this),
        this.ranking = 0,
        this.bestScore = 0,
        this.group = null,
        this.groupIcon = null,
        this.errorCode = null,
        this.msgType = null,
        this.darkBg = new PIXI.Graphics,
        this.darkBg.lineStyle(1, 0, 1),
        this.darkBg.beginFill(0, .8),
        this.darkBg.drawRect(0, 0, gc.width, gc.height),

        this.darkBg.endFill(),
        this.darkBg.interactive = true,
        this.setTouchEnd(this.darkBg),
        this.bg = PIXI.Sprite.fromFrame("popup_bg1.png"),
        this.bg.anchor.set(.5),
        this.bg.x = gc.width / 2,
        this.bg.y = gc.height / 2,
        this.scoreTxt = new gc.NumberText("c_score_", "center", 0, null, null, "c_score_11"),
        this.scoreTxt.x = 0,
        this.scoreTxt.y = -130,
        this.scoreTxt.setValue(1e6),
        this.bg.addChild(this.scoreTxt),
        this.bestScoreTxt = new gc.NumberText("c_score2_", "center", 0, null, null, "c_score2_11"),
        this.bestScoreTxt.x = 0,
        this.bestScoreTxt.y = 20,
        this.bg.addChild(this.bestScoreTxt),
        this.gropImg = PIXI.Sprite.fromFrame("popup_icon_1.png"),
        this.gropImg.anchor.set(.5),
        this.gropImg.scale.set(.4),
        this.gropImg.x = 30,
        this.gropImg.y = 97,
        this.bg.addChild(this.gropImg),
        this.reStartBtn = PIXI.Sprite.fromFrame("popup_bt_retry.png"),
        this.reStartBtn.anchor.set(.5),
        this.reStartBtn.y = 220,
        this.bg.addChild(this.reStartBtn),
        this.setTouchStartAction(this.reStartBtn, function () {
                this.requestCloseWindow()
            },
            this),
        this.errorMessageTxt = new PIXI.Text("Failed to save game points. \nPlease join the game once again.", {
            fontSize: "24px", fontWeight: "bold"
        }),
        this.errorMessageTxt.anchor.set(.5),
        this.errorMessageTxt.x = 0,
        this.errorMessageTxt.y = 50,
        this.bg.addChild(this.errorMessageTxt)
},
    gc.ResultPopup.constructor = gc.ResultPopup,
    gc.ResultPopup.prototype = Object.create(PIXI.Container.prototype),
    gc.ResultPopup.prototype.init = function () {
        this.removeAll(),
            this.ranking = 0,
            this.bestScore = 0, DataManager.gameEnd(gc.score,
            gc.level);
        var t = this;

        /*    gc.isLocalPlay
                ? (this.bestScore = gc.score,
                this.group = "DIAMOND",
                this.showPopup(true))
                //SDK/发送分数
                : GamePocket.Sdk.Ranking.addMyScore(gc.score, function (e) {
                e.code === GamePocket.Sdk.ResponseCode.SUCCESS
                    ? (t.isSign = true,
                t.ranking = e.result,
                t.bestScore = t.ranking.score,
                t.group = t.ranking.group,
                t.groupIcon = t.ranking.groupIcon,
                t.showPopup(true))
                    : (t.errorCode = e.code, 2001 == t.errorCode || 2002 == t.errorCode ? t.msgType = 2 : t.msgType = 1,
                t.isSign = false,
                t.showPopup(false))
            })*/
        if (gc.isLocalPlay) {
            this.bestScore = gc.score,
                this.group = "DIAMOND",
                this.showPopup(true)
        } else {

            var e = {};
            e.code = 2002;

       /*    t.isSign = true,
            t.ranking = e.result,
                t.bestScore = t.ranking.score,
                t.group = t.ranking.group,
                t.groupIcon = t.ranking.groupIcon,
                t.showPopup(true)*/

       console.log('//SDK/发送分数');

            t.errorCode = e.code,
                2001 == t.errorCode || 2002 == t.errorCode
                    ? t.msgType = 2
                    : t.msgType = 1,

                t.isSign = false,
                t.showPopup(false)
        }


    },
    gc.ResultPopup.prototype.showPopup = function (isInitPage) {
        this.scoreTxt.setValue(gc.score),
            this.bestScore <= 0
                ? this.bestScoreTxt.setValue(0)
                : this.bestScoreTxt.setValue(this.bestScore),
            "NONE" != this.group && this.groupIcon
                ? (this.gropImg.visible = true, this.gropImg.texture = PIXI.Texture.fromImage(this.groupIcon))
                : this.gropImg.visible = false,

            this.initPage(isInitPage),
            this.addChild(this.darkBg),
            this.addChild(this.bg),
            this.setInteractive(true), LocalStorageManager.clearStorage()
    },
    gc.ResultPopup.prototype.initPage = function (isInitPage) {
        isInitPage ? (this.bg.texture = PIXI.Texture.fromFrame("popup_bg1.png"),
            this.scoreTxt.x = 0,
            this.scoreTxt.y = -130,
            this.reStartBtn.y = 220,
            this.bestScoreTxt.visible = true,
            this.errorMessageTxt.visible = false) : (this.errorMessageTxt.text = MessageData["SCORE_SAVE_FAIL_" + this.msgType],
            this.bg.texture = PIXI.Texture.fromFrame("popup_bg4.png"),
            this.scoreTxt.x = 0,
            this.scoreTxt.y = -60,
            this.reStartBtn.y = 155,
            this.bestScoreTxt.visible = false,
            this.gropImg.visible = false,
            this.errorMessageTxt.visible = true)
    },
    gc.ResultPopup.prototype.requestCloseWindow = function () {
        this.setInteractive(false),
            this.removeChildren(), LocalStorageManager.clearStorage(),
            gc.game.emit("GAME_OUT_EVENT")
    },
    gc.ResultPopup.prototype.removeAll = function () {
        this.removeChildren()
    },
    gc.ResultPopup.prototype.setInteractive = function (interactive) {
        this.reStartBtn.interactive = interactive
    },
    gc.ResultPopup.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }