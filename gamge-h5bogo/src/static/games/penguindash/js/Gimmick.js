function Gimmick(gimmickManager){
    this.spine = undefined;//외부에서 참조할 대표 스파인 변수.

    this.spine_iceBox = new PIXI.spine.Spine(spines.iceObstacle);//얼음, 아이템 상자 스파인
    this.spine_iceBox.visible = false;
    // this.setItemSpineListener();

    this.spine_sea = new PIXI.spine.Spine(spines.sea);//물개, 고래꼬리 스파인
    this.spine_sea.visible = false;
    this.setSeaSpineListener();

    this.spine_egg = new PIXI.spine.Spine(spines.egg);
    this.spine_egg.visible = false;

    this.spr = new PIXI.Sprite(PIXI.Texture.fromFrame("jewel.png"));
    this.spr.visible = false;

    this.sp_emoticon = new PIXI.spine.Spine(spines.enemy_emoticon);
    this.spine_sea.addChild(this.sp_emoticon);
    this.sp_emoticon.position.set(20, -120);
    this.sp_emoticon.visible = false;

    this.sp_deathCon = new PIXI.spine.Spine(spines.gimmick_death_emoticon);
    this.spine_sea.addChild(this.sp_deathCon);
    this.sp_deathCon.position.set(-170, -200);
    this.sp_deathCon.scale.x = -1;
    this.sp_deathCon.visible = false;

	this.manager = gimmickManager;
	this.position = new PIXI.Point();
	this.hitCount = 0;
	this.type = undefined;
	this.onBlock = undefined;
	this.zOffset = -25;
	this.upOffset = -35;
	this.gemOffset = -40;
	this.bDoorSound = false;
	// this.prevZOrder = 0;
}

Gimmick.prototype.init = function () {
    this.spine_sea.displayGroup = undefined;
    this.spine_iceBox.displayGroup = undefined;
    this.spine_egg.displayGroup = undefined;
    this.spine_iceBox.visible = false;
    this.spine_sea.visible = false;
    this.spine_egg.visible = false;
    this.spr.visible = false;//보석..
    this.spr.scale.set(1, 1);//보석 획득 연출로 scale 조정되어 초기화.
    this.sp_emoticon.visible = false;
    this.sp_deathCon.visible = false;
    this.bDoorSound = false;
};

Gimmick.prototype.set = function(type, position, hitCnt, onBlock){
	if(hitCnt === undefined) this.hitCount = 0;

	this.position.x = position.x;
	this.position.y = position.y;
	
	this.type = type;
	this.hitCount = hitCnt;
	switch(this.type){
	    case GAME.gimmick_type.TYPE_NORMAL_OBS:
            this.spine = this.spine_iceBox;
            switch(this.hitCount){
            case 1:
                this.playSpine("block_action_1", 0);
                break;
            case 2:
                this.playSpine("block_action_2", 0);
                break;
            case 3:
                this.playSpine("block_action_3", 0);
                break;
            }
            break;
		case GAME.gimmick_type.TYPE_RANDOM_OBS://랜덤 얼음 블럭->랜덤 아이템 상자
            this.spine = this.spine_iceBox;
            this.setItemType();
            this.playSpine('item_block_idle', 1, 0, true);
            break;
        case GAME.gimmick_type.TYPE_GEM://sprite
            this.spr = new PIXI.Sprite(PIXI.Texture.fromFrame("jewel.png"));
            this.spr.anchor.set(0.5);
            this.spr.scale.set(0.7);
            break;
        case GAME.gimmick_type.TYPE_SEA:
            var initNum = Math.random();
            this.spine = this.spine_sea;

            this.bSeal = false;
            this.bWhale = false;
            this.inOutName = undefined;
            // initNum = 0.5;//test
            if(initNum > 0.49){
                this.inOutName = "enemy_in_out";
                this.playSpine("enemy_in_out", 1, 0, false);
            } else {
                this.inOutName = "tale_in_out";
                this.playSpine("tale_in_out", 1, 0, false);
            }
            break;
        case GAME.gimmick_type.TYPE_EGG:
            this.spine = this.spine_egg;
            this.playSpine("egg_block_idle", 1, 0, true);
            // engine.createBaby(this.onBlock);
            break;
	}
	
	this.onBlock = onBlock;
	// var tempOrder = 0;
	if(this.type !== GAME.gimmick_type.TYPE_GEM){
		this.onBlock.spr.addChild(this.spine);
		// this.spine.displayGroup = GAME.mapManager.blockLayer;
		
		this.spine.position.y = this.upOffset;
		
		if(this.onBlock.dir === 1){
			if(this.type !== GAME.gimmick_type.TYPE_RANDOM_OBS)
				this.spine.scale.x = -1;
		}

		// tempOrder = -16;
		// this.spine.zOrder = this.onBlock.spr.zOrder + tempOrder;
		// this.prevZOrder = this.spine.zOrder;
	} else {//보석....
		this.onBlock.spr.addChild(this.spr);
		this.spr.position.y = this.gemOffset;
		// tempOrder = -20;
		// this.spr.zOrder = this.onBlock.spr.zOrder + tempOrder;
	}
};

Gimmick.prototype.checkState = function(){
	if(this.type === GAME.gimmick_type.TYPE_NORMAL_OBS
			||this.type === GAME.gimmick_type.TYPE_RANDOM_OBS||this.type===GAME.gimmick_type.TYPE_EGG){
		
		switch(this.hitCount--){
            case 1:
                switch(this.type){
                    case GAME.gimmick_type.TYPE_NORMAL_OBS:
                        GAME.gimmickManager.gimmicks.shift();
                        this.playSpine("block_action_1", 2);
                        SESoundPlay(SE_ICEBROKEN);
                        break;
                    case GAME.gimmick_type.TYPE_RANDOM_OBS:
                        this.activeItemBox();
                        SESoundPlay(SE_ITEMBOXHIT);
                        break;
                    case GAME.gimmick_type.TYPE_EGG:
                        GAME.gimmickManager.gimmicks.shift();
                        this.playSpine("egg_block_out", 1);
                        engine.createBaby(this.onBlock);
                        SESoundPlay(SE_EGGHIT);
                        break;
                }
                break;
            case 2:
                if(this.type === GAME.gimmick_type.TYPE_NORMAL_OBS){
                    if(GAME.penguin.type === GAME.pengType.power){
                        GAME.gimmickManager.gimmicks.shift();
                        this.playSpine("block_action_2_2", 2);
                    } else{
                        this.playSpine("block_action_2", 2);
                    }
                    SESoundPlay(SE_ICEHIT);
                }
                break;
            case 3:
                if(this.type === GAME.gimmick_type.TYPE_NORMAL_OBS){
                    if(GAME.penguin.type === GAME.pengType.power){
                        GAME.gimmickManager.gimmicks.shift();
                        this.playSpine("block_action_3_2", 2);
                    } else {
                        this.playSpine("block_action_3", 2);
                    }
                    SESoundPlay(SE_ICEHIT);
                }
                break;
            }

	} else if(this.type === GAME.gimmick_type.TYPE_GEM){
		this.manager.gimmicks.shift();
		SESoundPlay(SE_GETGEM);
	}
};

Gimmick.prototype.playSpine = function(animationName, timeScale, trackIdx, loop){
	if(trackIdx === undefined) trackIdx = 0;
	if(loop === undefined) loop = false;
	if(timeScale === undefined) timeScale = 1;

	this.spine.visible = true;
	this.spine.state.timeScale = timeScale;

	this.spine.state.setAnimation(trackIdx, animationName, loop);
};

Gimmick.prototype.gameOver = function(){//물개 게임 오버 용
    // console.log("seal_gameOver");
	GAME.view.hideMobileBtn();
    GAME.engine.checkHighScore();
    this.spine.displayGroup = GAME.mapManager.upperLayer;
    this.spine.state.setAnimation(0, "enemy_action", false);
    SpinePlay_1(this.sp_deathCon, "enemy_emoticon", 0, false);
    this.sp_emoticon.visible = false;

    kData.iRankScore = GAME.engine.blockCount;


    SESoundPlay(SE_SUPRISE);
    BGMSoundStop();
};

Gimmick.prototype.whaleAction = function(){
	this.playSpine("tale_action", 1, 1, false);
    SpinePlay_1(this.sp_emoticon, "imoticon_out");
	SESoundPlay(SE_BOOMTALE);
	this.bDoorSound = false;
};

Gimmick.prototype.departParent = function(){//대쉬 블럭 만들 때 미리 만들어진 기믹들 제거..
	switch(this.type){
        case GAME.gimmick_type.TYPE_GEM:
            this.spr.parent.parent.removeChild(this.spr);
            this.spr.parent.removeChild(this.spr);
            break;

        case GAME.gimmick_type.TYPE_NORMAL_OBS:
        case GAME.gimmick_type.TYPE_RANDOM_OBS:
        case GAME.gimmick_type.TYPE_SEA:
        case GAME.gimmick_type.TYPE_EGG:
            this.spine.parent.parent.removeChild(this.spine);
            this.spine.parent.removeChild(this.spine);
		    break;
	}
};

Gimmick.prototype.showEmoticon = function (_case) {
    if(this.sp_emoticon === undefined) return;
    this.sp_emoticon.skeleton.setSlotsToSetupPose();
    this.sp_emoticon.skeleton.setAttachment("add_1", "add_"+_case);
    SpinePlay_1(this.sp_emoticon, "imoticon_in", 0, false);
};

Gimmick.prototype.setItemType = function () {
    //test
    // if(GAME.gimmickBlockIdx==20){
    //     this.itemType = GAME.itemType.power;//test
    //     return;
    // }
    // this.itemType = GAME.itemType.chaos;//test
    // return;
    //test
    var min = 0; var max = GAME.item_nothing;
    var rand = Math.random();

    //nothing
    if(rand>=min && rand<max){
        this.itemType = GAME.itemType.nothing;
        return;
    }

    //power
    min = max; max += GAME.item_power;
    if(rand>=min && rand<max){
        this.itemType = GAME.itemType.power;
        return;
    }

    //chaos
    min = max; max += GAME.item_chaos;
    if(rand>=min && rand<max){
        this.itemType = GAME.itemType.chaos;
        return;
    }

    //gem
    min = max; max += GAME.item_gem;
    if(rand>=min && rand<max){
        this.itemType = GAME.itemType.gem;
    }
};

Gimmick.prototype.activeItemBox = function () {
    switch(this.itemType){
        case GAME.itemType.nothing:
            // console.log("nothing");
            GAME.gimmickManager.gimmicks.shift();
            this.playSpine("item_block_out", 1, 0, false);
            break;
        case GAME.itemType.power:
            // console.log("power");
            this.playSpine("item_block_item_drop_power", 1, 0, false);
            // SESoundPlay(SE_ITEMDROP);
            this.type = GAME.gimmick_type.TYPE_POWER;
            break;
        case GAME.itemType.chaos:
            // console.log("chaos");
            this.playSpine("item_block_item_drop_chaos", 1, 0, false);
            // SESoundPlay(SE_ITEMDROP);
            this.type = GAME.gimmick_type.TYPE_CHAOS;
            break;
        case GAME.itemType.gem:
            this.playSpine("item_block_out", 1, 0, false);
            // SESoundPlay(SE_ITEMDROP);
            this.type = GAME.gimmick_type.TYPE_GEM;
            this.spr.anchor.set(0.5);
            this.spr.scale.set(0.7);
            this.onBlock.spr.addChild(this.spr);
            this.spr.position.y = this.gemOffset;
            // this.spr.zOrder = this.onBlock.spr.zOrder -20;
            this.spr.visible = true;
            break;
    }
};



Gimmick.prototype.setSeaSpineListener = function () {
    var self = this;
    this.spine_sea.state.addListener({
        event:function(entry, event){
            var gimmick = self;
            if(event.data.name === "enemy_on"){
                gimmick.bSeal = true;
                gimmick.showEmoticon(GAME.skeleton);

                if(gimmick.bDoorSound && engine.state === engine.gameState.STATE_GAME)
                    SESoundPlay(SE_DOOR);
            } else if(event.data.name === "enemy_off"){
                gimmick.bSeal = false;
                if(gimmick.sp_emoticon.visible) SpinePlay_1(gimmick.sp_emoticon, "imoticon_out", 0, false);
            } else if(event.data.name === "chu"){
                SESoundPlay(SE_CHU);
            }
            else if(event.data.name === "tale_on"){
                gimmick.bWhale = true;
                gimmick.showEmoticon(GAME.wing);

                if(gimmick.bDoorSound && engine.state === engine.gameState.STATE_GAME)
                    SESoundPlay(SE_DOOR);
            }
            else if(event.data.name === "tale_off"){
                gimmick.bWhale = false;
                if(gimmick.sp_emoticon.visible) SpinePlay_1(gimmick.sp_emoticon, "imoticon_out", 0, false);
            }
        },

        complete:function (entry) {
            var gimmick = self;
            if(entry.animation.name !== "enemy_action"){
                if(entry.animation.name === "enemy_death") return;
                var randNum = Math.random();
                // randNum = 0.4;//test
                if(randNum>0.49){//seal
                    gimmick.playSpine("enemy_in_out", 1, 0, false);
                } else {
                    gimmick.playSpine("tale_in_out", 1, 0, false);
                }
            } else { //물개에게 죽은 경우!
                engine.state = engine.gameState.STATE_OVER;
                engine.prevState = engine.gameState.STATE_OVER;
                var rand = 0;
                if(engine.possibleContinue()){//부활팝업조건만족
                    kData.iRankScore = GAME.engine.blockCount;
                    bPayRank = true;
                    networkManager.ForcedSaveData(true, function () {
                        GAME.view.showContPop();
                    });
                    // networkManager.SaveRaking();
                    // GAME.view.showContPop();
                } else {
                    kData.iRankScore = GAME.engine.blockCount;
                    networkManager.ForcedSaveData(true, function () {
                        if(GAME.first_sealCnt===0){
                            GAME.view.showTipPop();
                            return;
                        }

                        if (engine.callTipCnt < 5) {
                            GAME.view.showOverPop();
                        } else {
                            engine.callTipCnt = 0;
                            // rand = Math.random();
                            // rand = 0.5;//test
                            // if (rand < (1-GAME.showBonusGem)) GAME.view.showTipPop();
                            // else GAME.view.showBonusPop();
                            GAME.view.showTipPop();
                        }
                    });
                }
            }
        }
    });
};

// Gimmick.prototype.setItemSpineListener = function () {
//     // var self = this;
//     this.spine_iceBox.state.addListener({
//         complete:function (entry) {
//             // var gimmick = self;
//             switch(entry.animation.name){
//                 case "item_block_item_drop_power":
//                 case "item_block_item_drop_chaos":
//                     // console.log("SE_ITEMDROP");
//                     // SESoundPlay(SE_ITEMDROP);
//                     break;
//             }
//         }
//     });
// };