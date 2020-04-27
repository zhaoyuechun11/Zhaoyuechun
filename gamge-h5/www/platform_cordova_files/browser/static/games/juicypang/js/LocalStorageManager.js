window.LocalStorageManager = {
    GAME_IDX: "game_idx",
    START_TIME: "start_time",
    LEVEL: "level",
    SCORE: "score",
    MOVE_TOTAL: "moveTotal",
    ITEM: "item",
    USED_ITEM: "usedItem",
    OBSTACLE_COUNT: "obstacleCount",
    BLOCK_TYPE_LIST: "blockTypeList",
    BLOCK_LIFE_LIST: "blockLifeList",
    BLOCK_GHOST_LIST: "blockGhostList",
    GHOST_COUNT: "ghostCount",
    BLOCK_SPECIAL_TYPE_LIST: "blockSpecialTypeList",
    COCONUT_COUNT: "coconutCount",
    MISSION_TYPE: "missionType",
    MISSION_COUNT: "missionCount",
    USE_ITEM_TYPE: "useItemType",
    ITEM_BLOCKS_H: "itemSelectBlockHor",
    ITEM_BLOCKS_V: "itemSelectBlockVer",
    CONTINUE: "continue",
    JUICY_ITEM: "juicyItem",
    ICE_BLOCK: "iceBlock",
    GAME_UI_GUIDE: "gameUIGuide",
    BGM_SOUND: "juicy_bgmSound",
    EFFECT_SOUND: "juicy_effectSound",
    KEY_EVENT_DATE: "juicy_keyEventDate",
    GAME_START: "gameStart",
    itemHIndex: [],
    itemVIndex: [],
    blockTypeList: [],
    blockLifeList: [],
    blockGhostList: [],
    blockSpecialTypeList: [],
    missionType: [],
    missionList: [],
    iceList: [],
    obstacleCount: 0,
    useItemType: 0,
    coconutCount: 0,
    ghostCount: 0,
    start: 0,
    save: function (time) {
        this.clearStorage(),
            this.setStorage(this.GAME_IDX, DataManager.gameIdx),
            this.setStorage(this.START_TIME, DataManager.startTime),
            this.setStorage(this.LEVEL, gc.level),
            this.setStorage(this.SCORE, gc.score),
            this.setStorage(this.MOVE_TOTAL, gc.moveCount),
            this.setStorage(this.USED_ITEM, gc.useItemList.join()),
            this.setStorage(this.OBSTACLE_COUNT, gc.game.obstacleCount),
            this.setStorage(this.COCONUT_COUNT, gc.game.coconutCount),
            this.setStorage(this.GHOST_COUNT, gc.game.ghostCount);

        var h,
            v,
            block,
            types = [],
            lifes = [],
            isGhosts = [],
            specialTypes = [],
            blocks = gc.game.blocks;

        for (h = 0; h < gc.H_TOTAL; h++)
            for (v = 0; v < gc.V_TOTAL; v++)
                block = blocks[h][v],
                    types.push(block.type),
                    lifes.push(block.life),
                    isGhosts.push(block.isGhost),
                    specialTypes.push(block.specialType);

        this.setStorage(this.BLOCK_TYPE_LIST, types.join()),
            this.setStorage(this.BLOCK_LIFE_LIST, lifes.join()),
            this.setStorage(this.BLOCK_GHOST_LIST, isGhosts.join()),
            this.setStorage(this.BLOCK_SPECIAL_TYPE_LIST, specialTypes.join());

        var useItems = [];
        for (h = 0; 3 > h; h++) useItems.push(gc["useItem" + (h + 1)]);

        this.setStorage(this.ITEM, useItems.join());

        var block,
            blocks = gc.game.iceBlock.blocks,
            newBlocks = [];
        for (var l = blocks.length, h = 0; l > h; h++)
            block = blocks[h],
                newBlocks.push(block.health);

        this.setStorage(this.ICE_BLOCK, newBlocks.join());

        var types = [],
            targetPers = [],
            l = gc.missionTypeList[gc.level - 1].length;

        for (h = 0; l > h; h++)
            types.push(gc.game.ui["cup" + (h + 1)].type),
                targetPers.push(gc.game.ui["cup" + (h + 1)].targetPer);

        this.setStorage(this.MISSION_TYPE, types.join());
        this.setStorage(this.MISSION_COUNT, targetPers.join());
        if (time) {
            var hIndexs = [],
                vIndexs = [];

            this.setStorage(this.USE_ITEM_TYPE, time),
                l = gc.itemSelectBlocks.length;
            for (var h = 0; l > h; h++)
                blocks = gc.itemSelectBlocks[h],
                    hIndexs.push(blocks.hIndex),
                    vIndexs.push(blocks.vIndex);

            this.setStorage(this.ITEM_BLOCKS_H, hIndexs.join()),
                this.setStorage(this.ITEM_BLOCKS_V, vIndexs.join())
        }
        this.setStorage(this.JUICY_ITEM, gc.juicyItem),
            gc.isLocalData = false
    },

    load: function () {
        var score = this.getStorage(this.SCORE);

        if ("y" == Util.getParam("test") && alert(JSON.stringify(localStorage)),
        score && gc.isLocalStorage) {
            DataManager.gameIdx = parseInt(this.getStorage(this.GAME_IDX)),
                DataManager.startTime = parseInt(this.getStorage(this.START_TIME)),
                gc.level = parseInt(this.getStorage(this.LEVEL)),
                gc.score = parseInt(score),
                gc.moveCount = parseInt(this.getStorage(this.MOVE_TOTAL)),
                gc.continueCount = parseInt(this.getStorage(this.CONTINUE)),
            gc.score || (gc.score = 0);

            var times = this.getStorage(this.ITEM).split(",");
            gc.useItem1 = parseInt(times[0]),
                gc.useItem2 = parseInt(times[1]),
                gc.useItem3 = parseInt(times[2]);

            var usedItems = this.getStorage(this.USED_ITEM).split(",");
            gc.useItemList = [],
                gc.useItemList.push(parseInt(usedItems[0])),
                gc.useItemList.push(parseInt(usedItems[1])),
                gc.useItemList.push(parseInt(usedItems[2])),
                this.obstacleCount = parseInt(this.getStorage(this.OBSTACLE_COUNT));

            var coconutCount = this.getStorage(this.COCONUT_COUNT);
            this.coconutCount = coconutCount ? parseInt(coconutCount) : 0;

            var coconutCount = this.getStorage(this.COCONUT_COUNT);
            this.ghostCount = coconutCount ? parseInt(coconutCount) : 0;

            var BLOCK_TYPE_LIST = this.getStorage(this.BLOCK_TYPE_LIST).split(","),
                BLOCK_LIFE_LIST = this.getStorage(this.BLOCK_LIFE_LIST);

            BLOCK_LIFE_LIST && (BLOCK_LIFE_LIST = BLOCK_LIFE_LIST.split(","));
            var BLOCK_GHOST_LIST = this.getStorage(this.BLOCK_GHOST_LIST);

            BLOCK_GHOST_LIST && (BLOCK_GHOST_LIST = BLOCK_GHOST_LIST.split(","));
            var BLOCK_SPECIAL_TYPE_LIST = this.getStorage(this.BLOCK_SPECIAL_TYPE_LIST).split(","),
                l = BLOCK_TYPE_LIST.length;

            this.blockTypeList = [],
                this.blockLifeList = [],
                this.blockGhostList = [],
                this.blockSpecialTypeList = [];

            for (var i = 0; l > i; i++)
                this.blockTypeList.push(parseInt(BLOCK_TYPE_LIST[i])),
                    this.blockSpecialTypeList.push(parseInt(BLOCK_SPECIAL_TYPE_LIST[i])),
                    BLOCK_LIFE_LIST.length ? this.blockLifeList.push(parseInt(BLOCK_LIFE_LIST[i])) : this.blockLifeList.push(1),
                    BLOCK_GHOST_LIST.length && "true" == BLOCK_GHOST_LIST[i] ? this.blockGhostList.push(!0) : this.blockGhostList.push(false);

            this.iceList = [];
            var iceBlock = this.getStorage(this.ICE_BLOCK);
            if (iceBlock)
                this.iceList = iceBlock.split(",");
            else
                for (var i = gc.H_TOTAL * gc.V_TOTAL; i--;)
                    this.iceList.push(0);

            this.missionType = this.getStorage(this.MISSION_TYPE).split(","),
                this.missionList = this.getStorage(this.MISSION_COUNT).split(","),
                gc.juicyItem = parseInt(this.getStorage(this.JUICY_ITEM)),
                this.useItemType = parseInt(this.getStorage(this.USE_ITEM_TYPE)),
                this.itemHIndex = [],
                this.itemVIndex = [];

            if (this.useItemType) {
                var ITEM_BLOCKS_H = this.getStorage(this.ITEM_BLOCKS_H).split(","),
                    ITEM_BLOCKS_V = this.getStorage(this.ITEM_BLOCKS_V).split(",");

                for (var l = ITEM_BLOCKS_H.length, h = 0; l > h; h++)
                    this.itemHIndex.push(parseInt(ITEM_BLOCKS_H[h])),
                        this.itemVIndex.push(parseInt(ITEM_BLOCKS_V[h]))
            }
            return !0
        }
        return false
    },
    getStorage: function (t) {
        if (gc.isLocalStorage) {
            var e = localStorage.getItem(gc.LOCAL_VER + "#" + gc.GAME_ID + "@" + t);
            return void 0 == e ? null : e
        }
        return null
    },
    setStorage: function (t, e) {
        gc.isLocalStorage && LocalStorageManager.setItem(gc.LOCAL_VER + "#" + gc.GAME_ID + "@" + t, e)
    },
    setItem: function (t, e) {
        try {
            localStorage.setItem(t, e)
        } catch (t) {
        }
    },
    getItem: function (t) {

        var e = localStorage.getItem(t);
        return void 0 == e ? null : e
    },
    clearStorage: function () {
        for (var t in localStorage)
            String(t).indexOf("#" + gc.GAME_ID + "@") >= 0 && localStorage.removeItem(t)
    },

    getLocalStorage: function () {
        return localStorage
    }
};
