gc.Game = function () {
    PIXI.Container.call(this),
        this.isDummyTest = false,
        this.isLocalData = false,
        this.clearState = 0,
        this.blocks = [],
        this.touchBlocks = [],
        this.hintBlocks = [],
        this.specialBlocks = [],
        this.sh = 95,
        this.sv = 88,
        this.sx = 77,
        this.sy = 920,
        this.combineCount = 0,
        this.obstacleCount = 0,
        this.matchCount = 0,
        this.coconutCount = 0,
        this.ghostCount = 0,
        this.hintTimer = new gc.Timer(this.showHint.bind(this), 3e3),
        gc.showLoading();

    var sounds = ["sound_all_effect", "sound_allclear", "sound_bgm_1", "sound_bgm_2", "sound_bgm_3",
        "sound_boom_effect", "sound_charge_effect", "sound_clear", "sound_juicyClear",
        "sound_coconut_enter", "sound_combi", "sound_cup_1_clear", "sound_cup_2_clear",
        "sound_cup_3_clear", "sound_cup_charge", "sound_durian", "sound_gameover", "sound_great",
        "sound_happy", "sound_he-wrong", "sound_hyper", "sound_item_copy", "sound_item_hammer",
        "sound_item_move", "sound_juicy", "sound_lastpang", "sound_match_1", "sound_match_2",
        "sound_match_3", "sound_match_4", "sound_match_5", "sound_movefail", "sound_shuffle",
        "sound_slice_effect", "sound_special", "sound_start", "sound_wonderful"];

    gc.isSoundLoad
        ? SoundLoader.loadSound(sounds, this.loadComplete, this)
        : (this.loadComplete(), SoundLoader.loadSound(sounds))

},
    gc.Game.constructor = gc.Game,
    gc.Game.prototype = Object.create(PIXI.Container.prototype),
    gc.Game.prototype.loadComplete = function () {
        var H_TOTAL, V_TOTAL;

        this.gameGuide = new gc.GameGuide,
            this.theme = new gc.Theme,
            this.bg = new PIXI.Sprite(gc.loader.resources.game_bg.texture),
            this.blockContainer = new PIXI.Container,
            this.touchContainer = new PIXI.Container,
            this.iceBlock = new gc.IceBlock(this.sh, this.sv, this.sx, this.sy),
            this.ui = new gc.GameUI,
            this.ui.on("MISSION_MOVE_COMPLETE_EVENT", this.levelUpComplete.bind(this)),
            this.ui.on("OPTION_POPUP_SHOW_EVENT", this.showOptionPopup.bind(this)),
            this.ui.on("USE_ITEM1_EVENT", this.useItem1.bind(this)),
            this.ui.on("USE_ITEM2_EVENT", this.useItem2.bind(this)),
            this.ui.on("USE_ITEM3_EVENT", this.useItem3.bind(this)),
            this.ui.on("MISSION_HELP_EVENT", this.showMissionHelp.bind(this)),
            this.optionPopup = new gc.OptionPopup,
            this.optionPopup.on("OPTION_POPUP_CLOSE_EVENT", this.hideOptionPopup.bind(this)),
            this.missionHelpPopup = new gc.MissionHelpPopup,
            this.missionHelpPopup.on("CLOSE_MISSION_HELP_EVENT", this.hideMissionHelp.bind(this)),
            this.kegUseView = new gc.KegUseView,
            this.allClearAni = new gc.AllClearAni,
            this.basicEffect = new gc.BasicEffect,
            this.effect1 = new gc.Effect1,
            this.effect2 = new gc.Effect2,
            this.effect3 = new gc.Effect3,
            this.gameNEffect = new gc.GameNEffect,
            this.hyperEffect = new gc.HyperEffect,
            this.obstacleEffect = new gc.ObstacleEffect,
            this.shufflePopup = new gc.ShufflePopup,
            this.missionPopup = new gc.MissionPopup,
            this.gloveItem = new gc.GloveItem,
            this.gloveItem.on("GLOVE_ITEM_CANCEL_EVENT", this.endItem1.bind(this)),
            this.gloveItem.on("GLOVE_ITEM_COMPLETE_EVENT", this.endItem1.bind(this)),
            this.hammerItem = new gc.HammerItem,
            this.hammerItem.on("HAMMER_ITEM_CANCEL_EVENT", this.endItem2.bind(this)),
            this.hammerItem.on("HAMMER_ITEM_COMPLETE_EVENT", this.endItem2.bind(this)),
            this.boxItem = new gc.BoxItem,
            this.boxItem.on("FRIDGE_ITEM_CANCEL_EVENT", this.endItem3.bind(this)),
            this.boxItem.on("FRIDGE_ITEM_COMPLETE_EVENT", this.endItem3.bind(this)),
            this.juiceItem = new gc.JuiceItem,
            this.juiceItem.x = 100,
            this.juiceItem.y = gc.height - 80,
            this.juiceItem.on("USE_JUICE_ITEM_EVENT", this.useJuiceItem.bind(this)),
            this.juiceItem.on("END_JUICE_ITEM_EVENT", this.endJuiceItem.bind(this)),
            this.juiceItem.on("MISSION_HELP_EVENT", this.showMissionHelp.bind(this)),
            this.coconutEffect = new gc.CoconutEffect,
            this.coconutEffect.on("COCONUT_EFFECT_COMPLETE_EVENT", this.addCoconutComplete.bind(this)),
            this.message = new gc.Message,
            this.missionClearPopup = new gc.MissionClearPopup,
            this.resultPopup = new gc.ResultPopup,
            this.dummy = [
                [5, 1, 2, 1, 3, 4, 5],
                [4, 2, 3, 54, 2, 1, 1],
                [1, 3, 1, 3, 1, 3, 1],
                [1, 6, 6, 5, 3, 2, 3],
                [31, 6, 1, 5, 5, 1, 5],
                [2, 4, 1, 2, 6, 6, 2],
                [6, 5, 6, 5, 6, 6, 1]],
            this.dummyGhost = [
                [false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false]],
            this.shakeTween = new TimelineLite,

            this.setTouchStart(this, function (touch) {
                if (gc.isPlay && !gc.isDrag && !gc.isMove) {
                    var block, pos,
                        isHit = false,
                        global = touch.data.global;

                    for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
                        for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                            pos = {
                                x: (block = this.blocks[hIndex][vIndex]).x - 46,
                                y: block.y - 43, width: 92, height: 86
                            },
                            Util.hitTest(pos, global) && (hIndex = gc.H_TOTAL, vIndex = gc.V_TOTAL, isHit = true);

                    isHit && (
                        gc.isUseItem
                            ? 1 == gc.itemType
                            ? gc.game.gloveItem.select(block)
                            : 2 == gc.itemType
                                ? gc.game.hammerItem.select(block)
                                : 3 == gc.itemType && (10 == block.type && 0 == gc.game.boxItem.selectCount || gc.game.boxItem.select(block))
                            : null == gc.selectBlock
                            ? (gc.touchPos = {
                                x: touch.data.global.x,
                                y: touch.data.global.y
                            },
                                gc.isDrag = true,
                                gc.selectBlock = block,
                                block.itemSelect())
                            : (gc.selectBlock.itemUnselect(),
                                gc.selectBlock.hIndex - 1 == block.hIndex && gc.selectBlock.vIndex == block.vIndex
                                    ? gc.game.blockMove("left")
                                    : gc.selectBlock.hIndex + 1 == block.hIndex && gc.selectBlock.vIndex == block.vIndex
                                    ? gc.game.blockMove("right")
                                    : gc.selectBlock.vIndex + 1 == block.vIndex && gc.selectBlock.hIndex == block.hIndex
                                        ? gc.game.blockMove("up")
                                        : gc.selectBlock.vIndex - 1 == block.vIndex && gc.selectBlock.hIndex == block.hIndex
                                            ? gc.game.blockMove("down")
                                            : (gc.isDrag = false, gc.selectBlock = null)))
                }
            }, this),

            this.setTouchMove(this, function (touch) {
                if (gc.isDrag && !gc.isMove) {
                    var globalx = touch.data.global.x,
                        globaly = touch.data.global.y,
                        posX = gc.touchPos.x - globalx,
                        posY = gc.touchPos.y - globaly;

                    posX > 20
                        ? gc.selectBlock.hIndex > 0 && this.blockMove("left")
                        : -20 > posX
                        ? gc.selectBlock.hIndex < gc.H_TOTAL - 1 && this.blockMove("right")
                        : posY > 20
                            ? gc.selectBlock.vIndex < gc.V_TOTAL - 1 && this.blockMove("up")
                            : -20 > posY && gc.selectBlock.vIndex > 0 && this.blockMove("down"),

                    gc.isMove && gc.selectBlock.itemUnselect()
                }
            }, this),

            this.setTouchEnd(this, function (touch) {
                if (!gc.isMove) {
                    var block, pos, global, isHitTest = false;
                    global = touch.data.global;
                    for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
                        for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                            pos = {
                                x: (block = this.blocks[hIndex][vIndex]).x - block.width / 2,
                                y: block.y - block.height / 2, width: block.width,
                                height: block.height
                            },
                            Util.hitTest(pos, global)
                            && (isHitTest = true);

                    isHitTest || (gc.isDrag = false,
                    gc.selectBlock && (gc.selectBlock.itemUnselect(),
                        gc.selectBlock = null))
                }
                gc.isDrag = false
            }, this);


        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++) {
            this.touchBlocks[hIndex] = [];
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++) {
                var Graphics = new PIXI.Graphics;
                Graphics.beginFill(16711680, 0),
                    Graphics.drawRect(-46, -43, 92, 86),
                    Graphics.endFill(),
                    Graphics.x = this.sx + hIndex * this.sh,
                    Graphics.y = this.sy - vIndex * this.sv,
                    this.touchContainer.addChild(Graphics),
                    this.touchBlocks[hIndex].push(Graphics);
            }

        }


        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++) {
            this.blocks[hIndex] = [];
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++) {
                var Block = new gc.Block;
                this.blocks[hIndex].push(Block);
            }
        }


        gc.hideLoading(),
            this.init()

    },

    gc.Game.prototype.init = function () {
        this.removeAll();
        var t, vIndex, block,
            level = location.search.split("level=")[1],
            move = location.search.split("move=")[1];

        gc.useItemList = [0, 0, 0],
            gc.state = "game",
            gc.level = 1,
            gc.useItem1 = 3,
            gc.useItem2 = 3,
            gc.useItem3 = 3,
        level && (gc.level = parseInt(level)),
            gc.score = 0,
            gc.moveCount = 15,
        move && (gc.moveCount = parseInt(move)),
            gc.juicyItem = 0,
            gc.isDrag = false,
            gc.isMove = true,
            gc.isMissionHelp = false,
            gc.isPlay = false,
            IceMapData.mapShuffle(),
            this.x = 0,
            this.hintBlocks = [],
            this.specialBlocks = [],
            this.interval = null,
            this.combineCount = 0,
            this.matchCount = 0,
            this.obstacleCount = 0,
            this.clearState = 0,
            this.coconutCount = 0,
            this.ghostCount = gc.ghostList[gc.level - 1],
            this.isLocalData = LocalStorageManager.load(),
        gc.isGameStart
        && (
            gc.juicyItem = gc.juicyItemTotal,
                LocalStorageManager.setStorage(LocalStorageManager.JUICY_ITEM,
                    gc.juicyItem
                )),

            gc.juicyItemTotal = 140,
            this.setTypeTotal(),
            this.addChild(this.theme),
            this.addChild(this.bg),
            this.addChild(this.iceBlock),
            this.addChild(this.blockContainer),
            this.addChild(this.touchContainer),
            this.addChild(this.effect1),
            this.addChild(this.effect2),
            this.addChild(this.effect3),
            this.addChild(this.gameNEffect),
            this.addChild(this.hyperEffect),
            this.addChild(this.ui),
            this.addChild(this.basicEffect),
            this.addChild(this.obstacleEffect),
            this.addChild(this.gloveItem),
            this.addChild(this.hammerItem),
            this.addChild(this.boxItem),
            this.addChild(this.juiceItem),
            this.addChild(this.coconutEffect),
            this.addChild(this.shufflePopup),
            this.addChild(this.kegUseView),
            this.addChild(this.missionClearPopup),
            this.addChild(this.missionPopup),
            this.addChild(this.message),
            this.addChild(this.missionHelpPopup),
            this.addChild(this.gameGuide),
            this.theme.init(),
            this.ui.init(),
            this.basicEffect.init(),
            this.effect1.init(),
            this.effect2.init(),
            this.effect3.init(),
            this.gameNEffect.init(),
            this.hyperEffect.init(),
            this.obstacleEffect.init(),
            this.gloveItem.init(),
            this.hammerItem.init(),
            this.boxItem.init(),
            this.juiceItem.init(),
            this.coconutEffect.init(),
            this.shufflePopup.init(),
            this.missionClearPopup.init(),
            this.message.init(),
            this.iceBlock.init(),
            this.missionPopup.init(),
            this.missionHelpPopup.init(),
            this.gameGuide.init(),
            this.kegUseView.removeAll(),
            this.setInteractive(true);

        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++) {
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++) {
                (block = this.blocks[hIndex][vIndex]).x = this.sx + hIndex * this.sh,
                    block.y = this.sy - vIndex * this.sv,
                    block.ty = block.y,
                    block.alpha = 1,
                    this.blockContainer.addChild(block);
            }
        }


        this.setBlocksType(),
            this.setObstacleCount(),
            this.isLocalData
                ? (
                    this.iceBlock.showLocalData(),
                        this.obstacleCount = LocalStorageManager.obstacleCount,
                        this.coconutCount = LocalStorageManager.coconutCount,
                        this.ghostCount = LocalStorageManager.ghostCount,
                        this.ui.setLocalDataUI(this.obstacleCount),
                        0 == gc.moveCount
                            ? this.showResultMessage()
                            : (this.ui.getMissionFull()
                            ? gc.level == gc.levelTotal
                                ? this.showAllClear()
                                : this.levelUp()
                            : LocalStorageManager.useItemType
                                ? (this.ui.useItem(LocalStorageManager.useItemType), this.gamePlay(true))
                                : this.combineMove(), this.playBGM()))
                : (this.showIceBlocks(), LocalStorageManager.save())
    },

    gc.Game.prototype.setTypeTotal = function () {
        gc.level < 4 ? gc.typeTotal = 5 : gc.typeTotal = 6
    },

    gc.Game.prototype.setBlocksType = function () {
        var block, dummy, Special, Life, Ghost;
        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                hIndex * gc.V_TOTAL + vIndex,
                    block = this.blocks[hIndex][vIndex],

                    this.isDummyTest
                        ? (
                            (dummy = this.dummy[hIndex][vIndex]) > 10 && 60 > dummy
                                ? (block.init(hIndex, vIndex, dummy % 10, null, true),
                                    block.setSpecial(Math.floor(dummy / 10)),
                                5 == Math.floor(dummy / 10) && this.specialBlockErase(block))
                                : 10 == dummy
                                ? (block.init(hIndex, vIndex, 1, null, true), block.setObstacle())
                                : 71 == dummy
                                    ? (block.init(hIndex, vIndex, 1, null, true), block.setObstacle())
                                    : block.init(hIndex, vIndex, dummy % 10, null, true),
                            this.dummyGhost[hIndex][vIndex] && block.setGhost()
                        )
                        : this.isLocalData
                        ? (
                            dummy = LocalStorageManager.blockTypeList.shift(),
                                Life = LocalStorageManager.blockLifeList.shift(),
                                Ghost = LocalStorageManager.blockGhostList.shift(),
                                Special = LocalStorageManager.blockSpecialTypeList.shift(),
                                block.init(hIndex, vIndex, dummy, Life),
                            Special && block.setType(dummy, Special),
                            Ghost && block.setGhost()
                        )
                        : (
                            dummy = Util.randomNumber(gc.typeTotal) + 1,
                                block.init(hIndex, vIndex, dummy, null, true)
                        );

        this.isDummyTest
            ? TweenMax.delayedCall(.5, this.combineBlocksErase.bind(this))
            : (this.isLocalData || (this.blockMixCheck()
            ? this.gameGuide.show(function () {
                this.missionPopup.show(function () {
                    gc.item4
                        ? this.kegUseView.show(function () {
                            gc.isGameStart = false, this.removeChild(this.kegUseView), this.showStartMessage()
                        }, this)
                        : this.showStartMessage()
                }, this)
            }, this)
            : this.setBlocksType()),
            gc.item4 && this.juiceItem.visible && gc.isGameStart
            && (this.juiceItem.visible = false, this.kegUseView.init()))

    },
    gc.Game.prototype.showStartMessage = function () {
        this.juiceItem.visible = true,
            this.showMessage("start", this.missionStart, this)
    },
    gc.Game.prototype.setTheme = function (type) {
        this.theme.setTheme(type)
    },
    gc.Game.prototype.playBGM = function () {
        gc.bgmSoundPlay(gc.bgmIndex)
    },
    gc.Game.prototype.missionStart = function () {
        if (gc.isUseItem)
            switch (LocalStorageManager.useItemType) {
                case 1:
                    this.gloveItem.localDataItem();
                    break;
                case 2:
                    this.hammerItem.localDataItem();
                    break;
                case 3:
                    this.boxItem.localDataItem()
            } else this.addCoconut();
        this.playBGM()
    },
    gc.Game.prototype.showIceBlocks = function () {
        var i,
            Type = gc.missionTypeList[gc.level - 1],
            l = Type.length;
        for (i = 0; l > i; i++)
            if (30 == Type[i]) {
                this.iceBlock.show(gc.missionList[gc.level - 1][i]);
                break
            }
    },
    gc.Game.prototype.clearIceBlock = function (Block, delay) {
        if (this.iceBlock.hide(Block.hIndex, Block.vIndex)) {
            this.ui.addMissionList([{type: 61, value: 1}]),
                this.basicEffect.showSpecialPoint(Block, 100);
            var Pos = this.ui.getPosByType(61);
            this.basicEffect.show({type: "ice", x: Block.x, y: Block.y, missionCount: 1}, Pos, delay)
        }
    },
    gc.Game.prototype.useJuicyItem = function () {
        this.juiceItem.show(function () {
            this.gamePlay()
        }, this)
    },
    gc.Game.prototype.showHint = function () {
        if (gc.isPlay)
            for (var hintBlock = this.hintBlocks.length; hintBlock--;)
                this.hintBlocks[hintBlock].playHint()
    },
    gc.Game.prototype.movePositionStart = function () {
        gc.isMove = true;
        var block, newBlocks = [];
        for (var hIndex = gc.H_TOTAL; hIndex--;)
            for (var vIndex = gc.V_TOTAL; vIndex--;)
                block = this.blocks[hIndex].shift(), newBlocks.push(block);

        Util.shuffle(newBlocks);


        var r = 0,
            o = gc.H_TOTAL * gc.V_TOTAL;
        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                (block = newBlocks.shift()).hIndex = hIndex,
                    block.vIndex = vIndex,
                    this.blocks[hIndex].push(block),
                    block.moveTween = new TimelineLite,
                    block.moveTween.to(block, .3, {
                        x: gc.width / 2, y: gc.height / 2 + 100, delay: .05 * vIndex, ease: Sine.easeOut,
                        onComplete: function () {
                            ++r == o && this.moveNextPosition()
                        }.bind(this)
                    });
        gc.effectSoundPlay("sound_shuffle")
    },
    gc.Game.prototype.moveNextPosition = function () {
        var block,
            n = gc.H_TOTAL * gc.V_TOTAL,
            r = 0;
        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                (block = this.blocks[hIndex][vIndex]).tx = this.sx + hIndex * this.sh,
                    block.ty = this.sy - vIndex * this.sv,
                    block.moveTween = new TimelineLite,
                    block.moveTween.to(block, .5, {
                        x: block.tx, y: block.ty, delay: .1 * vIndex, ease: Sine.easeOut, onComplete: function () {
                            ++r == n && this.combineMove()
                        }.bind(this)
                    })
    },

    gc.Game.prototype.moveCombineCheck = function () {
        var block, nblock, len;
        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++) {
                if (block = this.blocks[hIndex][vIndex],
                vIndex < gc.V_TOTAL - 1 && (
                    nblock = this.blocks[hIndex][vIndex + 1],
                        this.blocks[hIndex].splice(vIndex, 2, nblock, block),
                    (len = this.moveCombineEnable(hIndex, vIndex + 1, block)).length < 3
                    && (len = this.moveCombineEnable(hIndex, vIndex, nblock)),
                        this.blocks[hIndex].splice(vIndex, 2, block, nblock), len.length > 2
                ))
                    return len;

                if (
                    vIndex > 0 && (nblock = this.blocks[hIndex][vIndex - 1],
                        this.blocks[hIndex].splice(vIndex - 1, 2, block, nblock),
                    (len = this.moveCombineEnable(hIndex, vIndex - 1, block)).length < 3 && (len = this.moveCombineEnable(hIndex, vIndex, nblock)),
                        this.blocks[hIndex].splice(vIndex - 1, 2, nblock, block), len.length > 2)
                )
                    return len;


                if (
                    hIndex > 0 && (
                        nblock = this.blocks[hIndex - 1][vIndex],
                            this.blocks[hIndex].splice(vIndex, 1, nblock),
                            this.blocks[hIndex - 1].splice(vIndex, 1, block),
                        (len = this.moveCombineEnable(hIndex - 1, vIndex, block)).length < 3 && (len = this.moveCombineEnable(hIndex, vIndex, nblock)),
                            this.blocks[hIndex].splice(vIndex, 1, block),
                            this.blocks[hIndex - 1].splice(vIndex, 1, nblock),
                        len.length > 2)
                ) return len;

                if (
                    vIndex > gc.H_TOTAL - 1 && (
                        nblock = this.blocks[hIndex + 1][vIndex],
                            this.blocks[hIndex].splice(vIndex, 1, nblock),
                            this.blocks[hIndex + 1].splice(vIndex, 1, block),
                        (len = this.moveCombineEnable(hIndex + 1, vIndex, block)).length < 3 && (len = this.moveCombineEnable(hIndex, vIndex, nblock)),
                            this.blocks[hIndex].splice(vIndex, 1, block),
                            this.blocks[hIndex + 1].splice(vIndex, 1, nblock),
                        len.length > 2)
                ) return len
            }

        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                if ((block = this.blocks[hIndex][vIndex]).specialType > 0) {

                    if (vIndex < gc.V_TOTAL - 1 && ((nblock = this.blocks[hIndex][vIndex + 1]).specialType > 0 && (block.specialType < 3 && nblock.specialType < 3 || block.specialType == nblock.specialType))) return [block, nblock];
                    if (vIndex > 0 && ((nblock = this.blocks[hIndex][vIndex - 1]).specialType > 0 && (block.specialType < 3 && nblock.specialType < 3 || block.specialType == nblock.specialType))) return [block, nblock];
                    if (hIndex > 0 && ((nblock = this.blocks[hIndex - 1][vIndex]).specialType > 0 && (block.specialType < 3 && nblock.specialType < 3 || block.specialType == nblock.specialType))) return [block, nblock];
                    if (vIndex > gc.H_TOTAL - 1 && ((nblock = this.blocks[hIndex + 1][vIndex]).specialType > 0 && (block.specialType < 3 && nblock.specialType < 3 || block.specialType == nblock.specialType))) return [block, nblock]
                }
        return []
    },
    gc.Game.prototype.moveCombineEnable = function (hIndex, vIndex, block) {
        var newBlocks;
        return (newBlocks = this.horCombineCheck(hIndex, vIndex, block.type)).length > 2
            ? newBlocks : newBlocks = this.verCombineCheck(hIndex, vIndex, block.type)
    },
    gc.Game.prototype.blockMixCheck = function () {
        var block, newBlocksLen, blocksLen;
        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                if (!(block = this.blocks[hIndex][vIndex]).isCombine
                    && (newBlocksLen = this.horCombineCheck(hIndex, vIndex, block.type, true).length,
                        blocksLen = this.verCombineCheck(hIndex, vIndex, block.type, true).length,
                    newBlocksLen > 2 || blocksLen > 2)) return false;
        return true
    },

    gc.Game.prototype.horCombineCheck = function (hIndex, vIndex, type, isErase) {
        var r, block, newBlocks = [];

        if (hIndex > 0)
            for (var r = hIndex; r--
            && ((block = this.blocks[r][vIndex]).type < 10
                && block.type == type
                && !block.isCombine
                && !block.isSpecialCombine
                && 1 != block.bombType);)
                newBlocks.push(block);

        for (var r = hIndex + 1; r < gc.H_TOTAL
        && ((block = this.blocks[r][vIndex]).type < 10
            && block.type == type
            && !block.isCombine
            && !block.isSpecialCombine
            && 1 != block.bombType); r++)
            newBlocks.push(block);

        if (newBlocks.length > 1)
            for (newBlocks.push(this.blocks[hIndex][vIndex]), r = newBlocks.length; r--;)
                block = newBlocks[r],
                isErase && (block.specialType > 0 ? this.specialBlockErase(block) : block.loseLife());

        else newBlocks = [];

        return newBlocks
    },
    gc.Game.prototype.specialBlockErase = function (Block) {
        Block.specialCombine(),
            this.clearIceBlock(Block, 0),
            this.specialBlocks.push(Block)
    },
    gc.Game.prototype.verCombineCheck = function (hIndex, vIndex, type, isErase) {
        var r, newBlock, newBlocks = [];
        for (var r = vIndex + 1; r < gc.V_TOTAL
        && ((newBlock = this.blocks[hIndex][r]).type < 10
            && newBlock.type == type
            && !newBlock.isCombine
            && !newBlock.isSpecialCombine
            && 1 != newBlock.bombType); r++)
            newBlocks.push(newBlock);

        if (vIndex > 0)
            for (var r = vIndex; r--
            && ((newBlock = this.blocks[hIndex][r]).type < 10
                && newBlock.type == type
                && !newBlock.isCombine
                && !newBlock.isSpecialCombine
                && 1 != newBlock.bombType);)
                newBlocks.push(newBlock);

        if (newBlocks.length > 1)
            for (newBlocks.push(this.blocks[hIndex][vIndex]), r = newBlocks.length; r--;)
                newBlock = newBlocks[r],
                isErase && (newBlock.specialType > 0 ? this.specialBlockErase(newBlock) : newBlock.loseLife());

        else newBlocks = [];
        return newBlocks
    },
    gc.Game.prototype.combine2x2Check = function (hIndex, vIndex, i) {
        var n, block, nblock = [],
            s = false;

        hIndex > 0 && vIndex < gc.V_TOTAL - 1 && (
            i != (block = this.blocks[hIndex - 1][vIndex + 1]).type
            || block.isCombine
            || nblock.push(block),
            i != (block = this.blocks[hIndex - 1][vIndex]).type
            || block.isCombine
            || nblock.push(block),
            i != (block = this.blocks[hIndex][vIndex + 1]).type
            || block.isCombine
            || nblock.push(block),
                3 == nblock.length ? s = true : nblock = []),


        !s && hIndex < gc.H_TOTAL - 1 && vIndex < gc.V_TOTAL - 1
        && (i != (block = this.blocks[hIndex + 1][vIndex + 1]).type
        || block.isCombine
        || nblock.push(block),
        i != (block = this.blocks[hIndex + 1][vIndex]).type
        || block.isCombine
        || nblock.push(block),
        i != (block = this.blocks[hIndex][vIndex + 1]).type
        || block.isCombine
        || nblock.push(block),
            3 == nblock.length ? s = true : nblock = []),


        !s && hIndex > 0 && vIndex > 0 &&
        (i != (block = this.blocks[hIndex - 1][vIndex - 1]).type
        || block.isCombine
        || nblock.push(block),
        i != (block = this.blocks[hIndex - 1][vIndex]).type
        || block.isCombine
        || nblock.push(block),
        i != (block = this.blocks[hIndex][vIndex - 1]).type
        || block.isCombine
        || nblock.push(block),
            3 == nblock.length ? s = true : nblock = []),


        !s && hIndex < gc.H_TOTAL - 1 && vIndex > 0
        && (i != (block = this.blocks[hIndex + 1][vIndex - 1]).type
        || block.isCombine
        || nblock.push(block),
        i != (block = this.blocks[hIndex + 1][vIndex]).type
        || block.isCombine
        || nblock.push(block),
        i != (block = this.blocks[hIndex][vIndex - 1]).type
        || block.isCombine
        || nblock.push(block),
            3 == nblock.length ? s = true : nblock = []);

        if (s) {
            for (nblock.push(this.blocks[hIndex][vIndex]), n = nblock.length; n--;)
                (block = nblock[n]).isCombine = true;
        }


        return nblock.length
    },
    gc.Game.prototype.blockMove = function (dir) {
        this.stopHintTimer(),
            gc.isDrag = false,
            gc.isMove = true;
        var type = 1;
        switch (dir) {
            case"up":
                type = 2,
                    gc.targetBlock = this.blocks[gc.selectBlock.hIndex][gc.selectBlock.vIndex + 1];
                break;
            case"down":
                type = 2,
                    gc.targetBlock = this.blocks[gc.selectBlock.hIndex][gc.selectBlock.vIndex - 1];
                break;
            case"left":
                gc.targetBlock = this.blocks[gc.selectBlock.hIndex - 1][gc.selectBlock.vIndex];
                break;
            case"right":
                gc.targetBlock = this.blocks[gc.selectBlock.hIndex + 1][gc.selectBlock.vIndex]
        }
        this.blockChange(gc.selectBlock,
            gc.targetBlock),
            TweenMax.delayedCall(.3, function () {
                this.blockCombineCheck(
                    gc.selectBlock,
                    gc.targetBlock,
                    type),

                    gc.selectBlock = null,
                    gc.targetBlock = null
            }.bind(this))
    },
    gc.Game.prototype.blockCombineCheck = function (selectBlock, targetBlock, type) {
        if (!(1 != selectBlock.specialType
            && 2 != selectBlock.specialType
            || 1 != targetBlock.specialType
            && 2 != targetBlock.specialType))
            return selectBlock.setCombineBlock(),
                selectBlock.isCombine = true,
                targetBlock.isCombine = true,
                targetBlock.alpha = 0,
                selectBlock.specialType = 0,
                targetBlock.specialType = 0,
                this.message.show("cocktail", function () {
                    1 == type
                        ? (selectBlock.vIndex < gc.V_TOTAL - 1 && this.lineErase("H", selectBlock.hIndex, selectBlock.vIndex + 1),
                            this.lineErase("H", selectBlock.hIndex, selectBlock.vIndex),
                        selectBlock.vIndex > 0 && this.lineErase("H", selectBlock.hIndex, selectBlock.vIndex - 1))

                        : (selectBlock.hIndex < gc.H_TOTAL - 1 && this.lineErase("V", selectBlock.hIndex + 1, selectBlock.vIndex),
                            this.lineErase("V", selectBlock.hIndex, selectBlock.vIndex),
                        selectBlock.hIndex > 0 && this.lineErase("V", selectBlock.hIndex - 1, selectBlock.vIndex)),

                        gc.game.shakeMotion(.3),
                        this.effect1.showCocktail(type, selectBlock.type, selectBlock.x, selectBlock.y, selectBlock.hIndex, selectBlock.vIndex,
                            function () {
                                TweenMax.delayedCall(.2, this.combineBlocksErase.bind(this))
                            }, this, true)
                }, this),
                void gc.effectSoundPlay("sound_combi");

        if (3 == selectBlock.specialType && 3 == targetBlock.specialType)
            return selectBlock.isCombine = true,
                targetBlock.isCombine = true,
                targetBlock.alpha = 0,
                selectBlock.specialType = 0,
                targetBlock.specialType = 0,
                this.message.show("slush", function () {
                    selectBlock.alpha = 0;
                    for (var vIndex = gc.V_TOTAL, hIndex = gc.H_TOTAL; hIndex--;){
                        targetBlock = this.blocks[hIndex][0];
                        this.lineErase("V", hIndex, vIndex);
                    }

                    this.gameNEffect.show(
                        selectBlock.x, selectBlock.y, selectBlock.type,
                        function () {
                            TweenMax.delayedCall(.2, this.combineBlocksErase.bind(this))
                        }, this)
                }, this),
                void gc.effectSoundPlay("sound_combi");

        if (4 == selectBlock.specialType && 4 == targetBlock.specialType)
            return selectBlock.specialType = 4,
                selectBlock.bombType = 2,
                selectBlock.setCombineBlock(),
            this.checkSpecialBlock(selectBlock) && this.specialBlockErase(selectBlock),
                targetBlock.isCombine = true,
                targetBlock.alpha = 0,
                targetBlock.specialType = 0,
                this.message.show("special", function () {
                    this.bombErase(selectBlock),
                        this.clearIceBlock(selectBlock, 0),
                        this.effect3.show(selectBlock, function () {
                            TweenMax.delayedCall(.2, this.combineBlocksErase.bind(this)),
                                gc.game.shakeMotion()
                        }, this)
                }, this),
                void gc.effectSoundPlay("sound_combi");


        var shorLen, sverLen, thorLen, tverLen,
            shIndex = selectBlock.hIndex,
            svIndex = selectBlock.vIndex,
            thIndex = targetBlock.hIndex,
            tvIndex = targetBlock.vIndex,
            isSelectSpecial = false,

            shorBlocks = this.horCombineCheck(shIndex, svIndex, selectBlock.type, true);
        shorLen = shorBlocks.length;

        var sverBlocks = this.verCombineCheck(shIndex, svIndex, selectBlock.type, true);
        shorLen + (sverLen = sverBlocks.length) > 2 && (isSelectSpecial = true);

        var thorBlocks = this.horCombineCheck(thIndex, tvIndex, targetBlock.type, true);

        thorLen = thorBlocks.length;
        var tverBlocks = this.verCombineCheck(thIndex, tvIndex, targetBlock.type, true);

        thorLen + (tverLen = tverBlocks.length) > 2 && (isSelectSpecial = true),

            isSelectSpecial ? (
                    this.obstacleCount--,
                        this.ui.useMove(this.obstacleCount),
                        this.setSpecialBlock(this.selectSpecial(selectBlock, shorBlocks, sverBlocks), shorLen, sverLen, type),
                        this.setSpecialBlock(this.selectSpecial(targetBlock, thorBlocks, tverBlocks), thorLen, tverLen, type),
                        TweenMax.delayedCall(.1, this.combineBlocksErase.bind(this))
                )
                : (
                    this.blockChange(selectBlock, targetBlock),
                        this.startHintTimer(),
                        TweenMax.delayedCall(.3, function () {
                            gc.isMove = false
                        }),
                        gc.effectSoundPlay("sound_movefail")
                )
    },

    gc.Game.prototype.selectSpecial = function (selectBlock, shorBlocks, sverBlocks) {
        var n, block;
        if (selectBlock.specialType > 0) {
            for (n = shorBlocks.length; n--;)
                if (0 == (block = shorBlocks[n]).specialType) return block;

            for (n = sverBlocks.length; n--;)
                if (0 == (block = sverBlocks[n]).specialType) return block
        }
        return selectBlock
    },
    gc.Game.prototype.setSpecialBlock = function (selectBlock, horLen, verLen, type) {
        var r,
            o = horLen + verLen;
        if (o > 3) {
            horLen > 1 && verLen > 1
                ? horLen > 5 || verLen > 5
                ? (r = 5, this.specialBlockErase(selectBlock))
                : r = horLen > 4 || verLen > 4
                    ? 3
                    : 4
                : 4 == o
                ? r = type || (horLen > 1 ? 2 : 1)
                : 5 == o
                    ? r = 3
                    : (r = 5, this.specialBlockErase(selectBlock)),
                selectBlock.setSpecial(r, true);

            var pos = this.ui.getPosByType(selectBlock.type);

            this.basicEffect.show(selectBlock, pos, 0),
                this.clearIceBlock(selectBlock, 0),
            selectBlock.missionCount && this.ui.addMissionList([{
                type: selectBlock.type, value: 1
            }])
        }
    },
    gc.Game.prototype.startHintTimer = function () {
        this.hintBlocks = this.moveCombineCheck(), this.hintTimer.play()
    },
    gc.Game.prototype.stopHintTimer = function () {
        var hIndex, vIndex;
        for (this.hintTimer.clear(), hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = gc.V_TOTAL; vIndex--;)
                this.blocks[hIndex][vIndex].stopHint()
    },
    gc.Game.prototype.deleteBlock = function (block) {
        var hIndex = block.hIndex,
            vIndex = block.vIndex;
        block.moveTween.kill(),
            block.alpha = 0,
            block.isCombine = true,
            block.y = this.blocks[hIndex][gc.V_TOTAL - 1].y - this.sv,
            this.blocks[hIndex].splice(vIndex, 1),
            this.blocks[hIndex].push(block)
    },

    gc.Game.prototype.combineBlocksErase = function () {
        var block,
            hIndex,
            vIndex,
            pos,
            delay = 0,
            isSound = false,
            sounds = [];
        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = gc.V_TOTAL; vIndex--;)
                0 == (block = this.blocks[hIndex][vIndex]).specialType && block.isCombine && ((pos = this.ui.getPosByType(block.type)) && delay++,
                    this.basicEffect.show(block, pos, delay),
                    this.clearIceBlock(block, delay),
                    block.moveTween.clear(),
                    block.alpha = 0,
                    block.x = this.sx + hIndex * this.sh,
                    block.y = this.blocks[hIndex][gc.V_TOTAL - 1].y - this.sv,
                    this.blocks[hIndex].splice(vIndex, 1),
                    this.blocks[hIndex].push(block),

                !block.isGhost
                && block.missionCount
                && sounds.push({
                    type: block.type, value: 1
                }),
                    isSound = true);


        isSound && (0 == this.matchCount
            ? gc.effectSoundPlay("sound_match_1")
            : 1 == this.matchCount
                ? gc.effectSoundPlay("sound_match_2")
                : 2 == this.matchCount
                    ? gc.effectSoundPlay("sound_match_3")
                    : 3 == this.matchCount
                        ? gc.effectSoundPlay("sound_match_4")
                        : gc.effectSoundPlay("sound_match_5"),
            this.matchCount++),
            this.ui.addMissionList(sounds),
            this.combineMove()
    },

    gc.Game.prototype.checkSpecialBlock = function (block) {
        return block.specialType > 0
    },

    gc.Game.prototype.combineMove = function () {
        var block, n = 0;
        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++) {
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++) {
                block = this.blocks[hIndex][vIndex];

                block.ty = this.sy - vIndex * this.sv,

                    block.isCombine && 1 != block.bombType

                        ? (block.init(hIndex, vIndex, Util.randomNumber(gc.typeTotal) + 1),
                        gc.ghostList[gc.level - 1] > 0 && --this.ghostCount <= 0
                        && (block.setGhost(), this.ghostCount = gc.ghostList[gc.level - 1]))

                        : block.setIndex(hIndex, vIndex),
                Math.abs(block.ty - block.y) > 1
                && block.dropAni(),
                    block.moveTween = new TimelineLite,
                    block.moveTween.to(block, .5, {
                        y: block.ty,
                        delay: .1,
                        ease: Bounce.easeOut,
                        onUpdate: function () {
                            var t, e, i;
                            for (var t = 0; t < gc.H_TOTAL; t++) {
                                for (var e = gc.V_TOTAL; e--;) {
                                    var i = this.blocks[t][e];
                                    i.y > 350 && (i.alpha = 1)
                                }
                            }


                        }.bind(this),
                        onComplete: function () {
                            this.iceBlock.setIceBlocks(),
                            ++n == this.blocks.length && (this.setBlockPosition(),
                                this.checkCombineBlocks()
                                    ? TweenMax.delayedCall(.1, this.combineBlocksErase.bind(this))
                                    : this.specialBlocks.length > 0
                                    ? TweenMax.delayedCall(.2, this.useSpecialBlock.bind(this))
                                    : (this.hintBlocks = this.moveCombineCheck(),
                                        0 == this.hintBlocks.length
                                            ? this.shufflePopup.show(this.movePositionStart, this)
                                            : gc.disturbList[gc.level - 1] && 0 == this.obstacleCount
                                            ? this.addObstacle()
                                            : (this.setInteractive(false),
                                                this.showResultMessage())))
                        }.bind(this)
                    })
            }
        }


    },
    gc.Game.prototype.showResultMessage = function () {
        this.combineCount >= 10
            ? (this.combineCount < 20
            ? this.showMessage("juicy", this.addCoconut, this)
            : this.combineCount >= 20 && this.combineCount < 30
                ? this.showMessage("great", this.addCoconut, this)
                : this.combineCount >= 30 && this.combineCount < 40
                    ? this.showMessage("happy", this.addCoconut, this)
                    : this.combineCount >= 40 && this.showMessage("wonderful", this.addCoconut, this),
                this.combineCount = 0)
            : this.addCoconut()
    },
    gc.Game.prototype.addCoconut = function () {
        var t = this.ui.getMissionCount(71);
        if (t > 0) {
            var e = t - this.coconutCount;
            if (e > 0 && this.coconutCount < 4)
                return e - this.coconutCount > 4 && (e = 4 - this.coconutCount),
                    void this.coconutEffect.add(e)
        }
        this.coconutEffect.moveStart(false) && this.gameReplay()
    },
    gc.Game.prototype.addCoconutComplete = function () {
        this.combineMove()
    },
    gc.Game.prototype.setBlockPosition = function () {
        var t, hIndex, vIndex;
        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                (t = this.blocks[hIndex][vIndex]).y = t.ty
    },
    gc.Game.prototype.blockChange = function (b1, b2) {
        var hIndex1 = b1.hIndex,
            vIndex1 = b1.vIndex,
            hIndex2 = b2.hIndex,
            vIndex2 = b2.vIndex;

        b1.hIndex = hIndex2,
            b1.vIndex = vIndex2,
            b2.hIndex = hIndex1,
            b2.vIndex = vIndex1,
            this.blocks[hIndex1].splice(vIndex1, 1, b2),
            this.blocks[hIndex2].splice(vIndex2, 1, b1);

        var x1 = b1.x,
            y1 = b1.y,
            x2 = b2.x,
            y2 = b2.y;

        TweenMax.to(b1, .2, {
            x: x2, y: y2
        }),
            1 == b1.specialType
            && 1 == b2.specialType || 2 == b1.specialType
            && 2 == b2.specialType || 1 == b1.specialType
            && 2 == b2.specialType || 2 == b1.specialType
            && 1 == b2.specialType || 3 == b1.specialType
            && 3 == b2.specialType || 4 == b1.specialType
            && 4 == b2.specialType || 5 == b1.specialType
            && 5 == b2.specialType
                ? TweenMax.delayedCall(.3, this.addMixBlockMission.bind(this))
                : TweenMax.to(b2, .2, {x: x1, y: y1})

    },
    gc.Game.prototype.addMixBlockMission = function () {
        var selectBlockType, specialType = gc.targetBlock.specialType;
        selectBlockType = 4 == specialType ? 52 : 3 == specialType ? 53 : 51;

        var i = this.ui.getPosByType(selectBlockType);
        i && this.basicEffect.show(gc.targetBlock, i, 0),
            this.ui.addMissionList([{
                type: selectBlockType, value: 1
            }]),
            this.checkBlockMission(gc.targetBlock, 1),
            this.checkBlockMission(gc.selectBlock, 2)
    },
    gc.Game.prototype.checkBlockMission = function (block, delay) {
        var i = block.specialType;
        if (i > 0 && 5 > i) {
            var selectBlockType = 10 * i + block.type,
                pos = this.ui.getPosByType(selectBlockType);
            pos && (this.basicEffect.show(block, pos, delay),
                this.clearIceBlock(block, 0),
                this.ui.addMissionList([{type: selectBlockType, value: 1}]))
        }
    },

    gc.Game.prototype.checkCombineBlocks = function () {
        var i, block, block, horBlocks, verBlocks, nLen, vLen,
            c = false;
        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                if (!(block = this.blocks[hIndex][vIndex]).isCombine && !block.isSpecialCombine
                    && (horBlocks = this.horCombineCheck(hIndex, vIndex, block.type),
                        verBlocks = this.verCombineCheck(hIndex, vIndex, block.type),
                    (nLen = horBlocks.length) + (vLen = verBlocks.length) > 2)) {
                    if (3 > nLen && (nLen = 0), 3 > vLen && (vLen = 0), nLen > 1 && vLen > 1) {

                        for (i = 0; i < horBlocks.length; i++)
                            (block = horBlocks[i]).specialType > 0 ? this.specialBlockErase(block) : block.isCombine = true;

                        for (i = 0; i < verBlocks.length; i++)
                            (block = verBlocks[i]).specialType > 0 ? this.specialBlockErase(block) : block.isCombine = true;

                        this.setSpecialBlock(this.selectSpecial(block, horBlocks, verBlocks), nLen, vLen)
                    }
                    c = true
                }

        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)

                (block = this.blocks[hIndex][vIndex]).isCombine
                || block.isSpecialCombine
                || (
                    horBlocks = this.horCombineCheck(hIndex, vIndex, block.type, true),
                        verBlocks = this.verCombineCheck(hIndex, vIndex, block.type, true),
                    (nLen = horBlocks.length) + (vLen = verBlocks.length) > 2
                    &&
                    (
                        3 > nLen && (nLen = 0),
                        3 > vLen && (vLen = 0),
                            this.setSpecialBlock(this.selectSpecial(block, horBlocks, verBlocks), nLen, vLen),
                            c = true
                    )
                );
        return c
    },

    gc.Game.prototype.check2x2CombineBlocks = function () {
        var hIndex, vIndex, block,
            n = false;

        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                (block = this.blocks[hIndex][vIndex]).isCombine
                || this.combine2x2Check(hIndex, vIndex, block.type) > 3
                && (n = true);

        return n
    },

    gc.Game.prototype.useSpecialBlock = function () {
        var targetList,
            specialBlock = this.specialBlocks[0],
            specialType = specialBlock.specialType;

        if (0 == specialType)
            return this.specialBlocks.shift(),
                void(this.specialBlocks.length > 0 ? this.useSpecialBlock() : this.combineBlocksErase());

        specialBlock.bombType > 1 || (this.specialBlocks.shift(), specialBlock.specialType = 0),
            this.combineCount++;

        var score = 0;

        switch (specialType) {
            case 1:
                score = 400, this.lineErase("H", specialBlock.hIndex, specialBlock.vIndex),
                    this.effect1.show(specialBlock, specialType, specialBlock.hIndex, 90, this.combineBlocksErase, this),
                    gc.game.shakeMotion(.3);
                break;
            case 2:
                score = 400, this.lineErase("V", specialBlock.hIndex, specialBlock.vIndex),
                    this.effect1.show(specialBlock, specialType, specialBlock.vIndex, 0, this.combineBlocksErase, this),
                    gc.game.shakeMotion(.3);
                break;
            case 3:
                score = 500, targetList = this.selectAllErase(specialBlock),
                    specialBlock.loseLife(), this.ui.addScore(500),
                    this.effect2.show(specialBlock, targetList, this.combineBlocksErase, this);
                break;
            case 4:
                score = 500, this.bombErase(specialBlock),
                    this.effect3.show(specialBlock, this.combineBlocksErase, this);
                break;
            case 5:
                score = 600, specialBlock.loseLife(),
                    targetList = this.setHyperErase(),
                    this.hyperEffect.show(specialBlock, targetList, this.combineBlocksErase, this)
        }

        if (this.ui.addScore(score),
            this.basicEffect.showSpecialPoint(specialBlock, score),
        5 > specialType) {
            var type = 10 * specialType + specialBlock.type,
                newPos = this.ui.getPosByType(type);

            this.basicEffect.show(specialBlock, newPos, .3),
                this.clearIceBlock(specialBlock, 0),
                this.ui.addMissionList([{type: type, value: 1}])
        }
    },

    gc.Game.prototype.lineErase = function (t, h, v) {
        var block, vIndex, hIndex;
        if ("H" == t)
            for (hIndex = gc.H_TOTAL, vIndex = 0; hIndex > vIndex; vIndex++)
                (block = this.blocks[vIndex][v]).isCombine || (this.checkSpecialBlock(block)
                    ? this.specialBlockErase(block)
                    : (block.isGhost && block.resetGhost(), block.loseLife()));

        else for (vIndex = gc.V_TOTAL; vIndex--;)
            (block = this.blocks[h][vIndex]).isCombine || (this.checkSpecialBlock(block)
                ? this.specialBlockErase(block)
                : (block.isGhost && block.resetGhost(), block.loseLife()))

    },

    gc.Game.prototype.selectAllErase = function (specialBlock) {
        var block, hIndex, vIndex,
            len = 3,
            o = 0,
            blocks = [],
            blockx = [];

        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                (specialBlock != (block = this.blocks[hIndex][vIndex])
                    && specialBlock.type == block.type || 10 == block.type || 71 == block.type)

                && (0 == block.specialType && !block.isCombine || block.specialType > 0
                    && !block.isSpecialCombine)

                && (this.checkSpecialBlock(block)
                    ? this.specialBlockErase(block)
                    : (10 == block.type && blocks.push(block),
                    block.isGhost && block.resetGhost(),
                        block.loseLife(.8 + .2 * o)), blockx.push(block), o++);

        return 3 == specialBlock.specialType
        && blocks.length > 0
        && (Util.shuffle(blocks), blocks.length < len && (len = blocks.length),
            blockx.concat(blocks.splice(0, len))),
            blockx

    },
    gc.Game.prototype.bombErase = function (block) {
        var hIndex = block.hIndex,
            vIndex = block.vIndex;
        2 == block.bombType
            ? (
                hIndex > 1 && this.setBombBlock(this.blocks[hIndex - 2][vIndex]),
                vIndex > 1 && this.setBombBlock(this.blocks[hIndex][vIndex - 2]),
                hIndex < gc.H_TOTAL - 2 && this.setBombBlock(this.blocks[hIndex + 2][vIndex]),
                vIndex < gc.V_TOTAL - 2 && this.setBombBlock(this.blocks[hIndex][vIndex + 2]),
                    block.isCombine = false
            )
            : block.loseLife(),
        hIndex > 0 && this.setBombBlock(this.blocks[hIndex - 1][vIndex]),
        hIndex < gc.H_TOTAL - 1 && this.setBombBlock(this.blocks[hIndex + 1][vIndex]),
        vIndex < gc.V_TOTAL - 1 && this.setBombBlock(this.blocks[hIndex][vIndex + 1]),
        vIndex > 0 && this.setBombBlock(this.blocks[hIndex][vIndex - 1]),
        hIndex > 0 && vIndex > 0 && this.setBombBlock(this.blocks[hIndex - 1][vIndex - 1]),
        hIndex > 0 && vIndex < gc.V_TOTAL - 1 && this.setBombBlock(this.blocks[hIndex - 1][vIndex + 1]),
        hIndex < gc.H_TOTAL - 1 && vIndex > 0 && this.setBombBlock(this.blocks[hIndex + 1][vIndex - 1]),
        hIndex < gc.H_TOTAL - 1 && vIndex < gc.V_TOTAL - 1 && this.setBombBlock(this.blocks[hIndex + 1][vIndex + 1]),

            block.bombType--
    },

    gc.Game.prototype.setBombBlock = function (block) {
        this.checkSpecialBlock(block)
            ? 1 != block.bombType && this.specialBlockErase(block)
            : (block.isGhost && block.resetGhost(), block.loseLife())
    },
    gc.Game.prototype.setHyperErase = function () {
        var isCombine, hIndex, vIndex, len,
            r = 0,
            isCombinex = [],
            isCombines = [];
        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                !(isCombine = this.blocks[hIndex][vIndex]).isCombine
                && 0 == isCombine.specialType
                && isCombine.type < 10
                && isCombinex.push(isCombine);


        for (Util.shuffle(isCombinex),
                 len = isCombinex.length,
                 hIndex = 0;
             len > hIndex
             && (isCombine = isCombinex[hIndex], isCombines.push(isCombine), 7 != ++r); hIndex++) ;

        return isCombines
    },

    gc.Game.prototype.levelUp = function () {
        for (var type, e = 0,
                 mission = gc.missionList[gc.level - 1],
                 missionType = gc.missionTypeList[gc.level - 1],
                 len = missionType.length, score = 0; len--;)
            score += 1 == (type = missionType[len])
                ? 500 * mission[len]
                : 10 == type
                    ? 1500 * mission[len]
                    : 20 == type
                        ? 15e3 * mission[len]
                        : 30 == type
                            ? 750 * mission[len]
                            : 6e3 * mission[len];


        return this.ui.addScore(score),
            LocalStorageManager.save(),
            gc.level == gc.levelTotal
                ? void this.showAllClear()
                : (e = gc.addMoveCountList[gc.level - 1],
                    gc.level++, this.setTypeTotal(),
                    this.showIceBlocks(),
                    this.setObstacleCount(),
                    this.ui.addMove(Math.ceil(e)),
                    void this.ui.missionOut())
    },

    gc.Game.prototype.showAllClear = function () {
        this.pause(),
            this.clearState = 1,
            this.juiceItem.setInteractive(false),
            this.addChild(this.allClearAni),
            this.allClearAni.init(this.onGameResult, this)
    },
    gc.Game.prototype.addJuice = function (per) {
        this.juiceItem.addJuice(per)
    },
    gc.Game.prototype.setObstacleCount = function () {
        this.obstacleCount = gc.disturbList[gc.level - 1],
        this.obstacleCount > 0
        && this.ui.setObstacle(0, this.obstacleCount)
    },


    gc.Game.prototype.addObstacle = function () {
        var block, newBlock,
            hIndex, vIndex,
            newLen = 1,
            blocks = [];

        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                10 == (block = this.blocks[hIndex][vIndex]).type
                && blocks.push(block);

        if (
            blocks.length + newLen > 9
            && (newLen = 9 - blocks.length),
            0 == blocks.length
            && (block = this.getRandomObstacle(), this.showObstacle(block), newLen--),
            blocks.length > 0
            && (blocks = [], newLen > 0)
        ) {
            for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
                for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                    10 == (block = this.blocks[hIndex][vIndex]).type
                    && (vIndex < gc.V_TOTAL - 1 && (
                        newBlock = this.blocks[hIndex][vIndex + 1],
                        this.getIsDefaultBlock(newBlock, true) && blocks.push(newBlock)),
                    vIndex > 0 && (newBlock = this.blocks[hIndex][vIndex - 1],
                    this.getIsDefaultBlock(newBlock, true) && blocks.push(newBlock)),
                    hIndex > 0 && (newBlock = this.blocks[hIndex - 1][vIndex],
                    this.getIsDefaultBlock(newBlock, true) && blocks.push(newBlock)),
                    hIndex < gc.H_TOTAL - 1
                    && (newBlock = this.blocks[hIndex + 1][vIndex],
                    this.getIsDefaultBlock(newBlock, true)
                    && blocks.push(newBlock)));

            for (hIndex = 0; newLen > hIndex; hIndex++)
                block = hIndex < blocks.length
                    ? blocks[hIndex]
                    : this.getRandomObstacle(),
                    this.showObstacle(block)
        }

        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                (block = this.blocks[hIndex][vIndex]).isObstacleSelect = false;

        this.setObstacleCount(),
            TweenMax.delayedCall(.5, this.combineMove.bind(this))
    },

    gc.Game.prototype.getRandomObstacle = function () {
        var hIndex,
            vIndex,
            block,
            blocks = [];

        for (hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                block = this.blocks[hIndex][vIndex],
                this.getIsDefaultBlock(block, false) && blocks.push(block);

        return Util.shuffle(blocks), blocks[0]
    },
    gc.Game.prototype.showObstacle = function (block) {
        this.obstacleEffect.show(block),
            block.setObstacle()
    },
    gc.Game.prototype.getIsDefaultBlock = function (block, onIsObstacleSelect) {
        return block.type < 10
            && 0 == block.specialType
            && !block.isObstacleSelect
            && !block.isGhost
            && (onIsObstacleSelect && (block.isObstacleSelect = true), true)
    },
    gc.Game.prototype.levelUpComplete = function () {
        LocalStorageManager.save(),
            this.missionPopup.show(this.addCoconut, this)
    },

    gc.Game.prototype.gamePlay = function (noSave) {
        this.iceBlock.setIceBlocks(),
            this.combineCount = 0,
            gc.isMove = false,
            gc.isPlay = true,
            this.setInteractive(true),
        noSave || (this.startHintTimer(),
            LocalStorageManager.useItemType = 0,
            LocalStorageManager.save())
    },
    gc.Game.prototype.gameReplay = function () {
        this.ui.getMissionFull()
            ? (LocalStorageManager.save(), this.missionClearPopup.show(this.levelUp, this))
            : 0 == gc.moveCount
            ? this.showGameOverMsg()
            : this.gamePlay(),
            this.matchCount = 0,
            this.basicEffect.removeAllEffect()
    },
    gc.Game.prototype.showGameOverMsg = function () {
        LocalStorageManager.save(),
            this.showMessage("end", this.onGameResult, this)
    },
    gc.Game.prototype.onGameResult = function () {
        gc.soundAllStop(),
            this.pause(),
            this.ui.scoreTxt.setValue(gc.score)
            //this.resultPopup.init(),
            //this.addChild(this.resultPopup)
            // ---------------- 这里是结束的地方 ---------------- //
            //gc.score
            if ( window.parent != null ) {
                window.parent.postMessage({
                  cmd: "GameOver",
                  msg: {
                    score: gc.score, // 如果是星星数，也是这个分数
                    level: 0
                  }
                }, "*");
              }
    },
    gc.Game.prototype.showMessage = function (type, callFunc, target) {
        this.message.show(type, callFunc, target)
    },
    gc.Game.prototype.showOptionPopup = function () {
        this.pause(),
            this.optionPopup.init(),
            this.addChild(this.optionPopup)
    },
    gc.Game.prototype.hideOptionPopup = function () {
        this.removeChild(this.optionPopup),
            this.resume()
    },
    gc.Game.prototype.showMissionHelp = function (cup) {
        this.pause(),
            this.missionHelpPopup.show(cup),
            this.addChild(this.missionHelpPopup)
    },
    gc.Game.prototype.hideMissionHelp = function () {
        this.removeChild(this.missionHelpPopup),
            this.juiceItem.setInteractive(true),
            this.resume()
    },
    gc.Game.prototype.useItem1 = function () {
        this.ui.setInteractive(false),
            this.gloveItem.use(),
            this.stopHintTimer()
    },
    gc.Game.prototype.endItem1 = function () {
        LocalStorageManager.save(),
            this.ui.setInteractive(true),
            gc.isUseItem = false,
            gc.isMove = true,
            this.combineBlocksErase()
    },
    gc.Game.prototype.useItem2 = function () {
        this.ui.setInteractive(false),
            this.hammerItem.use(),
            this.stopHintTimer()
    },
    gc.Game.prototype.endItem2 = function () {
        LocalStorageManager.save(),
            this.ui.setInteractive(true),
            gc.isUseItem = false,
            gc.isMove = true,
            this.combineBlocksErase()
    },
    gc.Game.prototype.useItem3 = function () {
        this.ui.setInteractive(false),
            this.boxItem.use(),
            this.stopHintTimer()
    },
    gc.Game.prototype.endItem3 = function () {
        LocalStorageManager.save(),
            this.ui.setInteractive(true),
            gc.isUseItem = false,
            gc.isMove = true,
            this.combineBlocksErase()
    },
    gc.Game.prototype.useJuiceItem = function () {
        this.ui.setInteractive(false),
            this.stopHintTimer(),
            gc.isUseItem = true
    },
    gc.Game.prototype.endJuiceItem = function () {
        gc.juicyItem = 0,
            LocalStorageManager.save(),
            this.iceBlock.setIceBlocks(),
            this.ui.setInteractive(true),
            this.startHintTimer(),
            gc.isUseItem = false
    },


    gc.Game.prototype.shakeMotion = function (time) {
        time || (time = 0),
            TweenMax.delayedCall(time, function () {
                this.shakeTween.clear(),
                    this.shakeTween = new TimelineLite,
                    this.x = -10,
                    this.shakeTween.to(this, .05, {
                        x: 10, yoyo: true, repeat: 5, onComplete: function () {
                            this.shakeTween.clear(), this.x = 0
                        }.bind(this)
                    })
            }.bind(this))
    },

    gc.Game.prototype.pause = function () {
        gc.isPlay = false,
            this.setInteractive(false),
            this.hintTimer.pause(),
            this.ui.pause(),
            this.basicEffect.pause(),
            this.effect1.pause(),
            this.effect2.pause(),
            this.effect3.pause(),
            this.gameNEffect.pause(),
            this.hyperEffect.pause(),
            this.obstacleEffect.pause(),
            this.juiceItem.pause(),
            this.message.pause(),
            this.iceBlock.pause(),
            this.shakeTween.pause(),
            TweenMax.pauseAll();

        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                this.blocks[hIndex][vIndex].pause()
    },
    gc.Game.prototype.resume = function () {

        gc.isPlay = true,
            this.setInteractive(true),
            this.hintTimer.resume(),
            this.ui.resume(),
            this.basicEffect.resume(),
            this.effect1.resume(),
            this.effect2.resume(),
            this.effect3.resume(),
            this.gameNEffect.resume(),
            this.hyperEffect.resume(),
            this.obstacleEffect.resume(),
            this.juiceItem.resume(),
            this.message.resume(),
            this.iceBlock.resume(),
            this.shakeTween.resume(),
            TweenMax.resumeAll();

        for (var hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (var vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                this.blocks[hIndex][vIndex].resume()
    },

    gc.Game.prototype.setInteractive = function (interactive) {
        var hIndex, vIndex;
        for (this.interactive = interactive, hIndex = 0; hIndex < gc.H_TOTAL; hIndex++)
            for (vIndex = 0; vIndex < gc.V_TOTAL; vIndex++)
                this.blocks[hIndex][vIndex].setInteractive(interactive);

        this.ui.setInteractive(interactive)
    },

    gc.Game.prototype.removeAll = function () {
        TweenMax.killAll(),
            this.shakeTween.kill(),
            this.blockContainer.removeChildren(),
            this.setInteractive(false),
            this.removeChildren()
    },


    gc.Game.prototype.updateTransform = function () {
        PIXI.Container.prototype.updateTransform.call(this)
    }