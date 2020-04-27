gc.GameUI = function () {
    PIXI.Container.call(this),
        this.missionNum = null,
        this.startX = 520,
        this.space = 125,
        this.obstacleValue = 0,
        this.obstacleTotal = 0,
        this.obstacleTarget = 0,
        this.obstacleTotalNum = 35,
        this.moveMax = 55,
        this.lostCount = 0,
        this.lostList = [],
        this.tmpLoadList = [],
        this.disturb = new PIXI.Sprite.fromFrame("ui_disturb.png"),
        this.disturb.anchor.set(.5),
        this.disturb.x = 60,
        this.disturb.y = 230,
        this.disturb.tween = new TimelineLite,
        this.shadow = new PIXI.Sprite.fromFrame("ui_disturb_shadow.png"),
        this.shadow.anchor.set(.5),
        this.shadow.x = this.disturb.x,
        this.shadow.y = this.disturb.y + 37,
        this.optionBtn = new PIXI.Sprite.fromFrame("ui_btn_pause.png"),
        this.optionBtn.anchor.set(.5),
        this.optionBtn.x = gc.width - 50,
        this.optionBtn.y = 45,
        this.setTouchStartAction(this.optionBtn, function () {
        }, this, true),
        this.setTouchEnd(this.optionBtn, function () {
            this.emit("OPTION_POPUP_SHOW_EVENT")
        }, this),
        this.moveTxt = new gc.NumberText("ui_moves_", "center", -8),
        this.moveTxt.x = 113,
        this.moveTxt.y = 130,
        this.maxTxt = new PIXI.Sprite.fromFrame("ui_moves_max.png"),
        this.maxTxt.anchor.set(.5),
        this.maxTxt.x = 115,
        this.maxTxt.y = 74,
        this.maxTxt.tween = new TimelineLite,
        this.scoreTxt = new gc.NumberText("ui_score_", "left", -5),
        this.scoreTxt.x = 125,
        this.scoreTxt.y = 5,
        this.missionTxt = new gc.NumberText("ui_score_", "left", -5),
        this.missionTxt.x = 448,
        this.missionTxt.y = this.scoreTxt.y,
        this.warningEffect = new PIXI.Sprite.fromFrame("ui_moves_count.png"),
        this.warningEffect.anchor.set(.5),
        this.warningEffect.x = this.moveTxt.x,
        this.warningEffect.y = this.moveTxt.y + 30,
        this.warningEffect.tween = new TimelineLite,
        this.cup1 = new gc.Cup,
        this.cup1.y = 50,
        this.cup2 = new gc.Cup,
        this.cup2.y = this.cup1.y,
        this.cup3 = new gc.Cup,
        this.cup3.y = this.cup1.y,
        this.cup4 = new gc.Cup,
        this.cup4.y = this.cup1.y,
        this.item1 = new PIXI.Sprite.fromFrame("ui_item_gloves1.png"),
        this.item1.anchor.set(.5),
        this.item1.x = 382,
        this.item1.y = gc.height - 80,
        this.setTouchStartAction(this.item1, function () {
        }, this, true),
        this.setTouchEnd(this.item1, function () {
            !gc.isPlay || gc.isDrag || gc.isMove || gc.isUseItem || gc.useItem1 > 0 && this.useItem(1)
        }, this),
        this.item1Num = new gc.NumberText("item_no_", -2, "center"),
        this.item1Num.x = 33,
        this.item1Num.y = -56,
        this.item1.addChild(this.item1Num);
    this.item2 = new PIXI.Sprite.fromFrame("ui_item_hammer1.png"),
        this.item2.anchor.set(.5),
        this.item2.x = this.item1.x + 130,
        this.item2.y = this.item1.y,
        this.setTouchStartAction(this.item2, function () {
        }, this, true),
        this.setTouchEnd(this.item2, function () {
            !gc.isPlay || gc.isDrag || gc.isMove || gc.isUseItem || gc.useItem2 > 0 && this.useItem(2)
        }, this),
        this.item2Num = new gc.NumberText("item_no_", -2, "center"),
        this.item2Num.x = this.item1Num.x,
        this.item2Num.y = this.item1Num.y,
        this.item2.addChild(this.item2Num),
        this.item3 = new PIXI.Sprite.fromFrame("ui_item_refrigerator1.png"),
        this.item3.anchor.set(.5),
        this.item3.x = this.item2.x + 130,
        this.item3.y = this.item1.y,
        this.setTouchStartAction(this.item3, function () {
        }, this, true),
        this.setTouchEnd(this.item3, function () {
            !gc.isPlay || gc.isDrag || gc.isMove || gc.isUseItem || gc.useItem3 > 0 && this.useItem(3)
        }, this),
        this.item3Num = new gc.NumberText("item_no_", -2, "center"),
        this.item3Num.x = this.item1Num.x,
        this.item3Num.y = this.item1Num.y,
        this.item3.addChild(this.item3Num)
},

    gc.GameUI.constructor = gc.GameUI,
    gc.GameUI.prototype = Object.create(PIXI.Container.prototype),
    gc.GameUI.prototype.init = function () {
        this.removeAll(),
            this.obstacleValue = 0,
            this.obstacleTotal = 0,
            this.obstacleTarget = 0,
            this.lostCount = 0,
            this.setWarningEffect(),
            this.moveTxt.setValue(gc.moveCount),
            this.scoreTxt.setValue(gc.score),
            this.missionTxt.setValue(gc.level),
        gc.disturbList[gc.level - 1] && this.showDisturb(),
            this.addChild(this.moveTxt),
            this.addChild(this.scoreTxt),
            this.addChild(this.missionTxt),
            this.addChild(this.item1),
            this.addChild(this.item2),
            this.addChild(this.item3),
            this.addChild(this.optionBtn),
            this.setMissionUI(),
            this.setItemCount(),
            this.setMoveMax(),
            this.setInteractive(true)
    },

    gc.GameUI.prototype.showDisturb = function () {
        this.disturb.scale.set(1),
            this.disturb.y = -100,
            this.disturb.tween.kill(),
            this.disturb.tween = new TimelineLite,
            this.disturb.tween.to(this.disturb, .7, {
                y: 230, ease: Bounce.easeOut, onComplete: function () {
                    this.addChildAt(this.shadow, 0)
                }.bind(this)
            }),
            this.addChild(this.disturb)
    },

    gc.GameUI.prototype.hideDisturb = function () {
        this.disturb.scale.set(1),
            this.disturb.tween.kill(),
            this.disturb.tween = new TimelineLite,
            this.disturb.tween.to(this.disturb, .7, {
                y: -101, ease: Bounce.easeIn, onComplete: function () {
                    this.removeChild(this.disturb)
                }.bind(this)
            }),
            this.removeChild(this.shadow)
    },
    gc.GameUI.prototype.setMissionUI = function () {
        var level = gc.level - 1;
        level > gc.missionTypeList.length - 1 && (level = gc.missionTypeList.length - 1);
        var typeTotal, cupx, mType, totalPer, type, s = 0, typeTotals = [],
            h = [51, 52, 53],
            missionType = gc.missionTypeList[level],
            mission = gc.missionList[level],
            missionLength = mission.length;

        for (30 != gc.level && 32 != gc.level || (h = [52, 53]),
                 typeTotal = gc.typeTotal,
             4 == gc.level && (typeTotal = 5); typeTotal--;)
            typeTotals.push(typeTotal + 1);

        for (
            typeTotals = Util.shuffle(typeTotals),
                gc.missionData = [],
                this.missionNum = missionLength,
                typeTotal = 0; missionLength > typeTotal; typeTotal++)
            mType = missionType[typeTotal],
                totalPer = mission[typeTotal],
                (cupx = this["cup" + (typeTotal + 1)]).x = this.startX - this.space * missionLength / 2 + s * this.space,
                1 == mType
                    ? type = typeTotals.shift()
                    : 10 == mType
                    ? type = 11 == gc.level
                        ? 10 * (Util.randomNumber(2) + 1) + typeTotals.shift()
                        : 12 == gc.level
                            ? 40 + typeTotals.shift()
                            : 14 == gc.level
                                ? 30 + typeTotals.shift()
                                : 10 * (Util.randomNumber(4) + 1) + typeTotals.shift()
                    : 20 == mType
                        ? type = 26 == gc.level
                            ? 51
                            : 27 == gc.level
                                ? 52
                                : 28 == gc.level
                                    ? 53
                                    : 29 == gc.level
                                        ? 51 + Util.randomNumber(2)
                                        : gc.level > 29
                                            ? h.shift()
                                            : 0 == typeTotal
                                                ? 52
                                                : 53
                        : 30 == mType
                            ? type = 61
                            : 40 == mType && (type = 71),
                cupx.init(type, totalPer, true),
                this.addChildAt(cupx, 0),
                s++,
                this.missionTxt.setValue(gc.level),
                gc.missionData.push({
                    type: type, totalPer: totalPer
                });

        this.setTheme()
    },

    gc.GameUI.prototype.setTheme = function () {
        gc.level <= 12
            ? gc.game.setTheme(1)
            : gc.level > 12 && gc.level <= 30
            ? gc.game.setTheme(2)
            : gc.game.setTheme(3)

    },

    gc.GameUI.prototype.setMoveMax = function () {
        gc.moveCount >= this.moveMax
            ? this.maxTxt.tween.isActive()
            || (
                this.addChild(this.maxTxt),
                    this.maxTxt.alpha = 1,
                    this.maxTxt.tween = new TimelineLite,
                    this.maxTxt.tween.to(this.maxTxt, .7, {
                        alpha: 0, yoyo: true, repeat: -1
                    }))
            : this.maxTxt.tween.isActive()
            && (this.maxTxt.tween.clear(), this.removeChild(this.maxTxt))

    },

    gc.GameUI.prototype.setMission = function (missionType, missionList) {
        var i, cup, totalPer, type,
            level = gc.level - 1,
            missionNum = missionType.length;
        for (level > gc.missionTypeList.length - 1 && (level = gc.missionTypeList.length - 1),
                 gc.missionData = [], this.missionNum = missionNum,
                 i = 0; missionNum > i; i++)

            totalPer = gc.missionList[level][i],
                type = parseInt(missionType[i]),
                (cup = this["cup" + (i + 1)]).init(type, totalPer, true),
                cup.setMission(parseInt(missionList[i])),
                this.addChildAt(cup, 0),
                gc.missionData.push({
                    type: type, totalPer: totalPer
                });
        this.missionTxt.setValue(gc.level),
            this.setTheme()
    },

    gc.GameUI.prototype.setObstacle = function (obstacleTarget, obstacleTotal) {
        obstacleTotal
            ? (this.obstacleTotal = obstacleTotal, this.obstacleValue = obstacleTotal, this.obstacleTarget = 0, this.disturb.texture = PIXI.Texture.fromFrame("ui_disturb.png"))
            : (this.obstacleTarget = obstacleTarget, this.setObstacleGauge())
    },

    gc.GameUI.prototype.setObstacleGauge = function () {
        this.obstacleValue--;
        var id = this.getObstacleGaugeIndex();
        0 == id && (id = 1),
            this.disturb.texture = PIXI.Texture.fromFrame("ui_disturb_" + id + ".png"),
        this.obstacleValue > this.obstacleTarget && TweenMax.delayedCall(.4, this.setObstacleGauge.bind(this)),
            this.disturb.tween.clear(),
            this.disturb.tween = new TimelineLite,
            this.disturb.tween.to(this.disturb.scale, .1, {
                x: .8, y: 1.2
            }),
            this.disturb.tween.to(this.disturb.scale, .2, {
                x: 1.1, y: .9
            }),
            this.disturb.tween.to(this.disturb.scale, .3, {x: 1, y: 1})
    },
    gc.GameUI.prototype.getObstacleGaugeIndex = function () {
        return Math.floor(this.obstacleTotalNum - this.obstacleValue / this.obstacleTotal * this.obstacleTotalNum)
    },
    gc.GameUI.prototype.setLocalDataUI = function () {
        if (this.obstacleTarget = LocalStorageManager.obstacleCount, this.obstacleValue = LocalStorageManager.obstacleCount, this.obstacleValue > 0) {
            var id = this.getObstacleGaugeIndex();
            1 > id && (id = 1),
                this.disturb.texture = PIXI.Texture.fromFrame("ui_disturb_" + id + ".png"),
                this.setWarningEffect()
        }
        this.setMission(LocalStorageManager.missionType, LocalStorageManager.missionList)
    },
    gc.GameUI.prototype.addScore = function (score) {
        gc.score += score,
            this.scoreTxt.valueTween(gc.score, 100)
    },
    gc.GameUI.prototype.addMission = function (t, per) {
        this["cup" + t].addJuice(per)
    },
    gc.GameUI.prototype.addMissionList = function (MissionList) {
        var e, i, cup, Mission, Score,
            MissionListLength = MissionList.length;

        for (e = 0; MissionListLength > e; e++) {
            for (Mission = MissionList[e], i = 0; i < this.missionNum; i++)
                (cup = this["cup" + (i + 1)]).type == Mission.type && cup.addJuice(Mission.value);
            Score = 100 * Mission.value,
                this.addScore(Score),
                gc.game.combineCount += Mission.value
        }
        gc.game.addJuice(MissionListLength)
    },
    gc.GameUI.prototype.getPosByType = function (type) {
        var e, cup;
        for (e = 0; e < this.missionNum; e++)
            if ((cup = this["cup" + (e + 1)]).type == type)
                return {x: cup.x, y: cup.y};

        return null
    },
    gc.GameUI.prototype.getMissionFull = function () {
        for (var t = this.missionNum, e = 0; t--;)
            this["cup" + (t + 1)].getIsFull() && e++;

        return e == this.missionNum
    },
    gc.GameUI.prototype.missionOut = function () {
        for (var t = this.missionNum; t--;)
            this["cup" + (t + 1)].moveOut(-100, .1 * t);

        TweenMax.delayedCall(.8, function () {
            this.setMissionUI(), this.missionIn()
        }.bind(this))
    },
    gc.GameUI.prototype.missionIn = function () {
        var t, e, i,
            n = gc.level - 1,
            r = gc.missionList[n].length,
            o = 0;

        for (t = 0; t < this.missionNum; t++)
            e = this["cup" + (t + 1)],
                i = this.startX - this.space * r / 2 + o * this.space, e.moveIn(i, .1 * t),
                o++;

        TweenMax.delayedCall(1, function () {
            this.emit("MISSION_MOVE_COMPLETE_EVENT"),
                gc.disturbList[gc.level - 1] ? this.showDisturb() : this.hideDisturb()
        }.bind(this))
    },
    gc.GameUI.prototype.useMove = function (t) {
        this.obstacleTotal > 0 && gc.disturbList[gc.level - 1] && this.setObstacle(t),
            this.lostMove(false)
    },
    gc.GameUI.prototype.addMove = function (Count) {
        gc.moveCount += Count,
        gc.moveCount > this.moveMax && (gc.moveCount = this.moveMax),
            this.setWarningEffect(),
            this.setMoveMax(),
            this.moveTxt.valueTween(gc.moveCount)
    },
    gc.GameUI.prototype.lostMove = function (t) {
        var tmpLoadList;
        (gc.moveCount--,
        gc.moveCount <= 0 && (gc.moveCount = 0),
            this.setWarningEffect(),
            this.setMoveMax(),
            this.moveTxt.setValue(gc.moveCount), t)
        && (this.tmpLoadList.length
            ? (tmpLoadList = this.tmpLoadList.shift()).tween.kill()
            : ((tmpLoadList = new PIXI.Sprite.fromFrame("ghost_minus.png")).anchor.set(.5),
                tmpLoadList.x = this.moveTxt.x),
            tmpLoadList.id = this.lostCount,
            tmpLoadList.y = this.moveTxt.y,
            tmpLoadList.alpha = 1,
            tmpLoadList.tween = new TimelineLite,
            tmpLoadList.tween.to(tmpLoadList, .2, {y: this.moveTxt.y - 30}),
            tmpLoadList.tween.to(tmpLoadList, .5, {
                alpha: 0, onCompleteParams: [tmpLoadList.id], onComplete: this.hideLostMove.bind(this)
            }),
            this.addChild(tmpLoadList),
            this.lostList.push(tmpLoadList),
            this.lostCount = 0,
            gc.effectSoundPlay("sound_he-wrong"))
    },
    gc.GameUI.prototype.hideLostMove = function (count) {
        var lost, i, lostListLength = this.lostList.length;
        for (i = 0; lostListLength > i; i++)
            if ((lost = this.lostList[i]).id == count) {
            this.lostList.splice(i, 1),
                this.tmpLoadList.push(lost),
                this.removeChild(lost);
            break
        }
    },
    gc.GameUI.prototype.setItemCount = function () {
        this.item1Num.setValue(gc.useItem1),
            this.item2Num.setValue(gc.useItem2),
            this.item3Num.setValue(gc.useItem3);

        var img = "ui_item_gloves1.png";
        gc.useItem1 > 0 && (img = "ui_item_gloves2.png"),
            this.item1.texture = PIXI.Texture.fromFrame(img),
            img = "ui_item_hammer1.png",

        gc.useItem2 > 0 && (img = "ui_item_hammer2.png"),
            this.item2.texture = PIXI.Texture.fromFrame(img),
            img = "ui_item_refrigerator1.png",

        gc.useItem3 > 0 && (img = "ui_item_refrigerator2.png"),
            this.item3.texture = PIXI.Texture.fromFrame(img)
    },
    gc.GameUI.prototype.setWarningEffect = function () {
        gc.moveCount <= 7
            ? (this.warningEffect.parent
            || (this.warningEffect.scale.set(0),
                this.warningEffect.alpha = 1,
                this.addChild(this.warningEffect),
                this.warningEffect.tween = new TimelineLite,
                this.warningEffect.tween.to(this.warningEffect.scale, .6, {
                x: 1, y: 1, repeat: -1, onUpdateParams: [this.warningEffect], onUpdate: function (t) {
                    t.scale.x < .1 ? t.alpha = 1 : t.alpha -= .03
                }
            })),
                this.moveTxt.space = -25,
                this.moveTxt.y = 120,
                this.moveTxt.fileName = "ui_moves2_")
            : gc.moveCount > 7
            && (this.warningEffect.parent && (this.warningEffect.tween.clear(),
                this.removeChild(this.warningEffect)),
                this.moveTxt.space = -8,
                this.moveTxt.y = 130,
                this.moveTxt.fileName = "ui_moves_")
    },
    gc.GameUI.prototype.useItem = function (id) {
        this.emit("USE_ITEM" + id + "_EVENT"),
            gc.isDrag = false,
        gc.selectBlock && (gc.selectBlock.itemUnselect(),
            gc.selectBlock = null)
    },
    gc.GameUI.prototype.getMissionCount = function (t) {
        var e, cup;
        for (this.missionNum, e = 0; e < this.missionNum; e++)
            if ((cup = this["cup" + (e + 1)]).type == t)
                return cup.getMissionCount();

        return 0
    },
    gc.GameUI.prototype.pause = function () {
        this.setInteractive(false),
            this.warningEffect.tween.pause(),
            this.disturb.tween.pause(),
            this.maxTxt.tween.pause()
    },
    gc.GameUI.prototype.resume = function () {
        this.setInteractive(true),
            this.warningEffect.tween.resume(),
            this.disturb.tween.resume(),
            this.maxTxt.tween.resume()
    },
    gc.GameUI.prototype.removeAll = function () {
        this.removeChildren(),
            this.setInteractive(false),
            this.warningEffect.tween.kill(),
            this.disturb.tween.kill(),
            this.maxTxt.tween.kill()
    },
    gc.GameUI.prototype.setInteractive = function (interactive) {
        this.item1.interactive = interactive,
            this.item2.interactive = interactive,
            this.item3.interactive = interactive,
            this.optionBtn.interactive = interactive,
            this.item1.scale.set(1),
            this.item2.scale.set(1),
            this.item3.scale.set(1),
            this.optionBtn.scale.set(1),
            this.cup1.setInteractive(interactive),
            this.cup2.setInteractive(interactive),
            this.cup3.setInteractive(interactive),
            this.cup4.setInteractive(interactive)
    },
    gc.GameUI.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }