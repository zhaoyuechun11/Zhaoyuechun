function Engine(){
	//keyboard
	this.bPushKeyboard = false;
	
	this.camera = new PIXI.Point();
	this.camDir = new PIXI.Point();
	
	this.gameState = {
		STATE_NONE : 0,
		STATE_INIT : 10,
		STATE_TITLE : 20,
		STATE_GAME : 30,
		STATE_PAUSE : 40,
		STATE_OVER : 50,
		STATE_DASH : 60,
		STATE_REPLAY : 70,
		STATE_DASHLOAD : 80
	};
	
	this.state = this.gameState.STATE_LOAD;
	this.prevState = this.gameState.STATE_LOAD;
	
	this.camSpeed = 1;
	this.blockCount = 0;
	this.gemCount = 0;//default:0//save
	this.highScore = 0;//save
	
	// this.renewFlag = 50;
	// this.renewOffset = 25;
	// this.addCase = 1;//addCase - 1:addShelter, 2:addBlock, 3:addBlock
	
	this.callTipCnt =0;// 팁/보너스 팝업 조건 카운트
	
	this.callConCnt = -1;// 부활 쿨타임 카운트
	
	//dash
	this.bDash = false;
	this.bChoiceDash = false;
	this.bDashOnShelter = true;
	this.dashCount = 0;
	this.dashGem = 0;
	
	this.dashData = [
	    {open:200, dashCnt:100, gem:3},
	    {open:400, dashCnt:200, gem:4},
	    {open:600, dashCnt:300, gem:5}
    ];//대쉬 조건 데이터
	
	this.bCallGimmick = true;//gimmick을 위에 올릴지 말지 정하는 변수..false면 블럭위에 기믹이 생기지 않는다..
	
	this.changeTick = 0.005;
	this.changeDelta = 0;
	this.changeFlag = 50;
	this.changeCnt = 0;
	
	//title move
	this.titleSpeed = 150;
	this.bTitleEnd = false;//mapContainer가 다 움직였니?
	
	this.shelterRoutes = [];
	this.shelterCount = 0;
	
	this.callCount = 0;//쉼터 추가할 때 쓰는 변수
	
	//touch시 버튼 펭귄조작 충돌 제어
	this.bGetButton = false;

    GAME.gimmickManager = new GimmickManager();
    GAME.mapManager = new MapManager();
    GAME.view = new View();
    /**
     * 아기펭귄 Pool만들기
     * */
    this.createBabiesPool();
    GAME.penguin = new Penguin(GAME.pengType.normal);

    GAME.arr_pengGroup.push(GAME.penguin);

	this.mapContainer = GAME.mapManager.mapContainer;

	this.bContGame = false;//이어한 게임이니 아니니?

    /**
     * create block pool
     * */
    for(i=0;i<GAME.iMaxBlockCnt;++i){
        GAME.arr_blocks[i] = new Block();
        GAME.arr_blocks[i].setBlock(GAME.mapManager.mapContainer, GAME.mapManager.blockLayer);
    }

    /**
     * create invincibile block pool
     * */
    for(i=0;i<GAME.iMaxInvincibileCnt;++i){
        GAME.arr_invincibile[i] = new PIXI.Sprite.fromFrame("block_tile_2.png");
    }

    /**
     * create gimmick pool
     * */
    for(var i=0;i<GAME.iMaxGimmickCnt;++i){
        GAME.arr_gimmicks[i] = new Gimmick(GAME.gimmickManager);
    }

    this.bPengJumping = false;//펭귄들 점프 중인가 아닌가

    this.renewMapCnt = 0;

	this.check_DOM_event();
}

Engine.prototype.check_DOM_event = function () {
	var map = {39: 0, 37: 1};
	document.addEventListener('keydown', function(event){
	    //enter, space key로 게임 타이틀 화면에서 게임 시작하기 추가.(170418)
        if(event.which===13||event.which===32){//13: enter, 32: space
            if(GAME.engine != undefined){
                if(GAME.engine.state === GAME.engine.gameState.STATE_TITLE){
                    if(!GAME.engine.bTitleEnd) return;
                    GAME.engine.state = GAME.engine.gameState.STATE_GAME;
                    GAME.engine.prevState = GAME.engine.gameState.STATE_GAME;
                    GAME.view.titleSpine.visible = false;
                    GAME.view.startSpine.visible = false;
                    //GAME.view.copyright.visible = false;
                    if(yahooIN!==undefined)kMGMenu.HideYahooIcon();
                    GAME.view.txt_version.visible = false;
                    GAME.view.spr_start.visible = false;

                    GAME.view.callTitle = false;
                    SESoundPlay(SE_BUTTON);

                    GAME.view.bShowTuto = true;
                    GAME.view.showTutorial();
                    GAME.view.showMobileBtn();

                    GAME.view.showMainUI();
                }
            }
        }

		if(engine.state !== engine.gameState.STATE_GAME) return;
		if(engine.bPushKeyboard) return;
		if(GAME.ui_gemShop!==undefined&&GAME.ui_gemShop.spr_bg.visible) return;

		engine.bPushKeyboard = true;
		
		var modifiers = event.altKey || event.ctrlKey || event.metaKey ||
        event.shiftKey;
		
		var mapped = map[event.which];
		
		if (!modifiers) {
			if (mapped === 0 || mapped === 1) {
				event.preventDefault();
                if(GAME.penguin.buff === GAME.itemType.nothing && GAME.penguin.spine_emoticon.visible)
                    SpinePlay_1(GAME.penguin.spine_emoticon, "imoticon_out", 0, false);

                GAME.waitForInputTime = 0;
				GAME.penguin.move(mapped);
				GAME.view.touchMobileBtn(mapped);
		    }
		}
	});
	
	document.addEventListener('keyup', function(e){
		engine.bPushKeyboard = false;
		GAME.view.restoreMobileBtn();
	});
	
	// document.body.addEventListener("touchstart", function(e){
	// 	if(engine.state !== engine.gameState.STATE_GAME) return;
	// 	if(engine.bGetButton) return;
     //    if(GAME.ui_gemShop!==undefined&&GAME.ui_gemShop.spr_bg.visible) return;
     //
     //    if(GAME.penguin.buff === GAME.itemType.nothing && GAME.penguin.spine_emoticon.visible)
     //        SpinePlay_1(GAME.penguin.spine_emoticon, "imoticon_out", 0, false);
     //
     //    GAME.waitForInputTime = 0;
     //
		// if(screenWidth === undefined) screenWidth = window.innerWidth;
		// halfScreenWidth = screenWidth/2;
        //
        // var touchX = e.touches[0].clientX;
        //
        // if(touchX >= halfScreenWidth){
			// GAME.penguin.move(0);
			// GAME.view.touchMobileBtn(0);
		// } else {
		// 	GAME.penguin.move(1);
		// 	GAME.view.touchMobileBtn(1);
		// }
	// });
	//
	// document.body.addEventListener("touchend", function(e){
	// 	engine.bGetButton = false;
	// 	GAME.view.restoreMobileBtn();
	// });
};

Engine.prototype.init = function(){
	GAME.view.init();
};

Engine.prototype.initGame = function(startPos){
	if(startPos === undefined) startPos = {x:iCenterSizeX, y:iCenterSizeY+200};
	//show rankup effet flag init
    GAME.ui_ranking.bFlag_showAgain = false;
	//renew map init
	this.renewFlag = 50;
	this.addCase = 1;
	this.camSpeed = 1;
	
	//dash init
	this.bDash = false;
	this.bChoiceDash = false;
	this.bDashOnShelter = true;
	this.changeTick = 0.005;
	this.changeDelta = 0;
	this.changeFlag = 50;
	this.changeCnt = 0;
	
	this.bCallGimmick = true;
	
	this.callCount = 0;
	this.shelterCount = 0;
	
	this.bGetButton = false;
	
	this.possibleDash();
	
	this.bTitleEnd = false;

	//모든 블럭들 초기화...
    for(i=0;i<GAME.arr_blocks.length;++i){
	    GAME.arr_blocks[i].init();
    }

	GAME.mapManager.initGame();
	GAME.gimmickManager.initGame();
	
	GAME.mapManager.createStartShelter(startPos);
	GAME.mapManager.setPatternBlock(GAME.mapManager.startShelterBlocks[19].spr.position, 2, true);//loopNum은 2로 고정.
	
	var pengStartPos = {x: startPos.x, y: startPos.y + GAME.penguin.upOffset};
	GAME.penguin.init(pengStartPos, GAME.mapManager.mapContainer, GAME.mapManager.pengLayer);
	
	this.camera.x = GAME.penguin.position.x;
	this.camera.y = GAME.penguin.position.y;
	
	this.blockCount = 0;
	GAME.view.updateCount();

    //배경 초기화
    sprBG.visible = true;
    sprBG_night.visible = false;
    sprBG_sunset.visible = false;//temp
    sprMoon.visible = false;
    sprStar.visible = false;
    GAME.tick = 1;//배경 루프 틱 카운트 초기화.

    GAME.bRenewHighScore = false;//점수 갱신 체크 변수 초기화
    this.bContGame = false;//이어하기 체크 변수 초기화.

    for(i=0;i<GAME.arr_babies.length;++i){
        GAME.arr_babies[i].pengCon.visible = false;
    }

    GAME.arr_pengGroup.length = 0;
    GAME.arr_pengGroup.push(GAME.penguin);
    GAME.arr_waitBabies.length = 0;//기다리는 아기펭귄들 배열 초기화.
    GAME.iCurBabyCnt = 0;

    GAME.sp_death_emoticon.scale.x = 1;
    GAME.sp_death_emoticon.position.x = 130;

    this.bPengJumping = false;
    this.renewMapCnt = 0;//맵 갱신 플래그 값..
};
var testconsole = undefined;
Engine.prototype.update = function(){
	if(this.bChoiceDash){
		this.bChoiceDash = false;
		GAME.view.hideMobileBtn();
		
		var gimmicks = GAME.gimmickManager.gimmicks;
		var length = gimmicks.length;
		for(var i = 0; i < length;++i){
			var gimmick = gimmicks.shift();
			gimmick.departParent();
		}
		
		this.camSpeed = 1.8;
		this.bCallGimmick = false;
		
		this.state = this.gameState.STATE_DASHLOAD;
	}

	switch(this.state){
	case this.gameState.STATE_TITLE:
		//GAME.view.copyright.visible = true;
        if(yahooIN!==undefined)kMGMenu.ShowYahooIcon();
		GAME.view.txt_version.visible = true;
		if(!GAME.view.callTitle){
			GAME.mapManager.mapContainer.position.y = 500;
			GAME.view.playTitle();
			sprBG.visible = true;
		}

		if(GAME.mapManager.mapContainer.position.y <= 0){
			GAME.mapManager.mapContainer.position.y = 0;
			// this.bTitleEnd = true;
			break;
		}

		GAME.mapManager.mapContainer.position.y -= this.titleSpeed * deltaTime;
		break;
	case this.gameState.STATE_GAME:
	    if(!GAME.penguin.spine_emoticon.visible) GAME.waitForInputTime+=deltaTime;
	    if(GAME.waitForInputTime >= GAME.waitForInputFlag){
	        GAME.waitForInputTime = 0;

            if(GAME.penguin.pengCon.scale.x > 0) {
	            GAME.penguin.showEmoticon(GAME.question_reverse);
            } else {
	            GAME.penguin.showEmoticon(GAME.question);
            }
        }

		GAME.mapManager.update();
		GAME.gimmickManager.update();
		// GAME.penguin.update();
        this.updatePengGroup();

		GAME.saveTick += deltaTime;
		if(GAME.saveTick >= GAME.flag_saveTick){
		    GAME.saveTick = 0;
		    SaveDataInClient();
        }

        if(this.bPengJumping) this.jumpTurn(GAME.jump_targetBlock, GAME.arr_jumpBlocks);

		break;
	case this.gameState.STATE_OVER:
		//to do : gameOver 이후 로직 실행
		break;
	case this.gameState.STATE_DASH:
		if(GAME.penguin.state === GAME.penguin.stateMap.STATE_IDLE){
		    var targetBlock = undefined;
			if(this.bDashOnShelter){
				targetBlock = GAME.mapManager.blocks[GAME.penguin.normalBlockIdx];
                testconsole = "dash_0";
				// console.log("dash_0");
				// console.log("stepOn: "+GAME.penguin.stepOn);
				GAME.penguin.dash(targetBlock);
				this.bDashOnShelter = false;
			} else {
				if(this.blockCount%100 !== 0){//normalBlock move
					targetBlock = GAME.mapManager.blocks[GAME.penguin.normalBlockIdx];
                    testconsole = "dash_1";
                    // console.log("dash_1");
					GAME.penguin.dash(targetBlock);
				} else {//shelterBlock
					if(this.callCount<1){//callCount : if문 안의 함수를 한번만 호출하려고
						this.createShelterRoute();
						++this.callCount;
					}
					targetBlock = this.shelterRoutes[this.shelterCount++];
                    testconsole = "dash_2";
                    // console.log("dash_2");
					GAME.penguin.dash(targetBlock);
					
					if(this.shelterCount === (this.shelterRoutes.length - 1)){
						this.callCount = 0;
						this.shelterCount = 0;
						this.bDashOnShelter = true;
					}
				}
			}
			
			if(!this.bCallGimmick){
				this.changeDashBlock(deltaTime);
			}
				
			if(this.blockCount === this.dashCount){//dash end
				this.state = this.gameState.STATE_GAME;
				GAME.view.showMobileBtn();
				this.camSpeed = 1;
				GAME.penguin.playSpine("penguin_move6_win", 1, 0, true);
				GAME.penguin.shadowSpine.visible = true;
				GAME.penguin.pengCon.displayGroup = GAME.mapManager.upperLayer;
				SESoundPlay(SE_CONGRATULATION);
			}
		}
		break;
	case this.gameState.STATE_DASHLOAD:
		// if(!this.bCallGimmick){
		// 	this.changeDashBlock(deltaTime);
		// }
        this.changeDashBlock(deltaTime);
		break;
	}
	
	if(this.state !== this.gameState.STATE_OVER
			&& this.state !== this.gameState.STATE_PAUSE){

		// var dir = this.cameraUpdate(GAME.penguin.pengCon.position);
		GAME.mapManager.moveMapCon(this.cameraUpdate(GAME.penguin.pengCon.position));
	}

    GAME.ui_gemShop.update();

    GAME.view.timerUpdate(deltaTime);
};

Engine.prototype.cameraUpdate = function(targetPos){
	if(targetPos.x === this.camera.x && targetPos.y === this.camera.y){
		this.camDir.x = 0; this.camDir.y = 0;
		return this.camDir;
	} 
	
	this.camDir.x = (targetPos.x - this.camera.x)*deltaTime*this.camSpeed;
	this.camDir.y = (targetPos.y - this.camera.y)*deltaTime*this.camSpeed;
	
	this.camera.x += this.camDir.x;
	this.camera.y += this.camDir.y;
	
	if(getDist(targetPos, this.camera) < 0.1){
		this.camera.x = targetPos.x;
		this.camera.y = targetPos.y;
		
		this.camDir.x = 0; this.camDir.y = 0;
	}

	return {x:-this.camDir.x, y:-this.camDir.y};
};

Engine.prototype.renewMap = function(){
	if(this.blockCount >= (this.dashCount-50))
		this.bCallGimmick = true;

	if(this.renewMapCnt===0&&GAME.penguin.normalBlockIdx>=25&&GAME.penguin.normalBlockIdx<75){
        GAME.mapManager.setPatternBlock(GAME.mapManager.blocks[49].spr.position, 2);

        var randDir = (Math.random()<0.5) ? 0:1;
        GAME.mapManager.createShelter(GAME.mapManager.blocks[99].spr.position, randDir);

        ++GAME.mapManager.appearArea;
        ++GAME.mapManager.gimmickLevel;
        ++this.renewMapCnt;
        return;
    }

	if(GAME.penguin.normalBlockIdx>=75&&this.renewMapCnt===1){
	    this.renewMapCnt = 0;
        GAME.mapManager.setPatternBlock(GAME.mapManager.shelterBlocks[15].spr.position, 2);
    }
};

Engine.prototype.createShelterRoute = function(){
	this.shelterRoutes = [];
	var shelterBlocks = GAME.mapManager.shelterBlocks;
	this.shelterRoutes.push(shelterBlocks[0]);
	
	if(shelterBlocks[0].dir === 0){//right
		for(i=0;i<6;++i){
			switch(i){
			case 0:
				this.shelterRoutes.push(shelterBlocks[4]);
				break;
			case 1:
				this.shelterRoutes.push(shelterBlocks[5]);
				break;
			case 2:
				this.shelterRoutes.push(shelterBlocks[6]);
				shelterBlocks[6].dir = 1;
				break;
			case 3:
				this.shelterRoutes.push(shelterBlocks[9]);
				shelterBlocks[9].dir = 1;
				break;
			case 4:
				this.shelterRoutes.push(shelterBlocks[12]);
				shelterBlocks[12].dir = 1;
				break;
			case 5:
				this.shelterRoutes.push(shelterBlocks[15]);
				shelterBlocks[15].dir = 1;
				break;
			}
		}
	} else {//left
		for(i=0;i<6;++i){
			switch(i){
			case 0:
				this.shelterRoutes.push(shelterBlocks[1]);
				break;
			case 1:
				this.shelterRoutes.push(shelterBlocks[2]);
				break;
			case 2:
				this.shelterRoutes.push(shelterBlocks[3]);
				break;
			case 3:
				this.shelterRoutes.push(shelterBlocks[13]);
				break;
			case 4:
				this.shelterRoutes.push(shelterBlocks[14]);
				break;
			case 5:
				this.shelterRoutes.push(shelterBlocks[15]);
				break;
			}
		}
	}
};

Engine.prototype.possibleDash = function(){
	for(var i=(this.dashData.length-1);i>-1;--i){
		if(this.highScore>=this.dashData[i].open){
			this.bDash = true;
			this.dashCount = this.dashData[i].dashCnt;
			this.dashGem = this.dashData[i].gem;
			break;
		}
	}
};

Engine.prototype.possibleContinue = function(){
    // return true; //test;
    /**
     * 100층 이 후, 무조건 한 번 이어하기 창이 뜨는 걸로 수정.(170330)
     * */
    if(this.bContGame) return false;
    else {
        if(this.blockCount>=100) return true;
    }

};

Engine.prototype.changeDashBlock = function(deltaTime){
	if(this.changeCnt>this.changeFlag) return;
	if(this.changeCnt === this.changeFlag){
		++this.changeCnt;
		if(this.changeCnt===GAME.mapManager.blocks.length) this.changeCnt = 0;
		this.state = this.gameState.STATE_DASH;
		return;
	}

	this.changeDelta += deltaTime;
	if(this.changeDelta >= this.changeTick){
		var block = GAME.mapManager.blocks[this.changeCnt];
		this.changeDelta = 0;
		block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");

		if(block.dir === 1)
			block.spr.scale.x = -1;

		++this.changeCnt;
        if(this.changeCnt===GAME.mapManager.blocks.length) this.changeCnt = 0;
	}
};

Engine.prototype.rebirthPeng = function(){
    // console.log("peng_next: "+GAME.penguin.nextPeng);
    // console.log("arr_pengGroup.length_rebirth:"+GAME.arr_pengGroup.length);
    BGMSoundPlay(0, true);
    GAME.mapManager.allBlocksResume();
	var onBlock = GAME.penguin.prev_block;
	// TweenMax.killTweensOf(onBlock);//무적 타일 움직임 제거.

	if(GAME.penguin.gimmickBlock !== undefined){//물개에 죽었을 때
		GAME.penguin.gimmickBlock.playSpine("enemy_in_out", 1, 0, false);
		GAME.penguin.gimmickBlock = undefined;
	}
	
	// GAME.penguin.pengCon.visible = true;
	GAME.penguin.state = GAME.penguin.stateMap.STATE_IDLE;

	onBlock.spr.tint = 16777215;
	// onBlock.spr.displayGroup = GAME.mapManager.blockLayer;
	// onBlock.spr.displayGroup = GAME.mapManager.upperLayer;
	onBlock.setType(GAME.mapManager.block_type.TYPE_START);
	onBlock.setPosition(onBlock.position, undefined, true);
	// TweenMax.to(onBlock.spr, 0.1, {x:onBlock.position.x, y:onBlock.position.y});
	
	GAME.penguin.position.x = onBlock.position.x;
	GAME.penguin.position.y = onBlock.position.y + GAME.penguin.upOffset;
	
	GAME.penguin.pengCon.position.x = onBlock.position.x;
	GAME.penguin.pengCon.position.y = onBlock.position.y + GAME.penguin.upOffset;
	
	// GAME.penguin.pengCon.displayGroup = GAME.mapManager.upperLayer;
	GAME.penguin.pengCon.renderable = true;
	GAME.penguin.backToNormal();
    GAME.penguin.setPengAnimation("penguin_move5_resurrection", this.type);

    GAME.penguin.bKilledSeal = false;
    GAME.penguin.bKilledChaos = false;

    GAME.sp_death_emoticon.scale.x = 1;
    GAME.sp_death_emoticon.position.x = 130;

    if(GAME.penguin.nextPeng!=undefined){
        if(GAME.penguin.nextPeng.pengCon.position.x==onBlock.position.x
            ||GAME.penguin.nextPeng.pengCon.position.y==onBlock.position.y){
            GAME.penguin.prev_dir = undefined;
        }
    }

    GAME.mapManager.backToBlockLayer();
    // onBlock.spr.displayGroup = GAME.mapManager.upperLayer;

    // console.log("============");
    // var test = (onBlock.spr.displayGroup===GAME.mapManager.blockLayer)?"blockLayer":"upperLayer";
    // console.log("rebirth.display: "+test);
    // test = (GAME.penguin.pengCon.displayGroup===GAME.mapManager.pengLayer)?"pengLayer":"upperLayer";
    // console.log("rebirth_peng: "+test);
    // GAME.mapManager.getSuperBlock();
};

Engine.prototype.replayGame = function(){
	if(kData.bSoundBGM)
		BGMSoundPlay(BGM_BG);

	GAME.penguin.shadowSpine.visible = false;
	this.state = this.gameState.STATE_REPLAY;
	this.initGame(startPos);
	GAME.view.showMobileBtn();
};

Engine.prototype.goTitle = function(){
	if(kData.bSoundBGM)
		BGMSoundPlay(BGM_BG);
	
	GAME.penguin.shadowSpine.visible = true;
	this.state = this.gameState.STATE_TITLE;
	GAME.view.hideTutorial();
	GAME.view.hideMobileBtn();
	if(yahooIN!==undefined&&biPhone) {
        GAME.view.btn_titleSound.sprite.visible = true;
        setTitleSoundBtn();
    }

	this.initGame(startPos);
};

Engine.prototype.checkHighScore = function () {
    if(this.blockCount>this.highScore){
    	this.highScore = this.blockCount;
    	kData.iHighScore = this.highScore;
        GAME.bRenewHighScore = true;
    }
};

Engine.prototype.checkClounAlert = function () {
    var alertBlock = GAME.arr_alertBlocks[0];
    if(this.blockCount>=alertBlock.alertCount){//넘었다~~
        SpinePlay_1(GAME.sp_cloudAlert, "flying_score_board_special_in", 0, false);
        SESoundPlay(SE_HALFSIGN);
        GAME.arr_alertBlocks.shift();
        return;
    }

    if(this.blockCount===(alertBlock.alertCount-20)){
        alertBlock.spr.addChild(GAME.sp_cloudAlert);
        GAME.sp_cloudAlert.scale.x = alertBlock.spr.scale.x;

        SpinePlay(GAME.sp_cloudAlert, alertBlock.dir===1 ? 250:-250, -35, "flying_score_board_normal_idle", 0, true);
        GAME.txt_cloudBlockNum.text = alertBlock.alertCount.formatMoney(0);
    }
};

Engine.prototype.createBabiesPool = function () {
    for(i=0;i<GAME.arr_babies.length;++i){
        GAME.arr_babies[i] = new Baby(this, GAME.pengType.baby_1);
    }
};

Engine.prototype.createBaby = function (_block) {
    if(GAME.iCurBabyCnt===GAME.iMaxBabyCnt) return;//아기 펭귄 최대 생성 수 제한.
    var baby = GAME.getBaby();
    ++GAME.iCurBabyCnt;

    baby.init(_block);

    GAME.arr_waitBabies.push(baby);
    GAME.arr_pengGroup.push(baby);

    // console.log("arr_pengGroup.length: "+GAME.arr_pengGroup.length);
    // console.log("GAME.icurBabyCnt_create: "+GAME.iCurBabyCnt);
    // console.log("GAME.babyIndex: "+GAME.babyIndex);
    // console.log("group_idx: "+baby.group_idx);
};

var peng_i = 0; var peng_length = 0;
Engine.prototype.updatePengGroup = function () {
    peng_length = GAME.arr_pengGroup.length;
    for(peng_i=peng_length-1;peng_i>=0;--peng_i){
        if(GAME.arr_pengGroup[peng_i]===undefined){
            // console.log("peng_i: "+peng_i);
            continue;
        }
        GAME.arr_pengGroup[peng_i].update();
    }
};

var jumpTurn_idx = 0; var flag_tick = 0.2; var acc_jumpTime = flag_tick;
Engine.prototype.jumpTurn = function (_targetBlock, _blocks) {
    acc_jumpTime += deltaTime;
    if(acc_jumpTime>=flag_tick){
        acc_jumpTime = 0;
        // console.log("jumpIdx: "+jumpTurn_idx);
        if(GAME.arr_pengGroup[jumpTurn_idx] === undefined) {
            this.bPengJumping = false;
            jumpTurn_idx = 0;
            acc_jumpTime = flag_tick;
            return;
        }

        GAME.arr_pengGroup[jumpTurn_idx++].meetWhale(_targetBlock, _blocks);

        if(jumpTurn_idx===GAME.arr_pengGroup.length){
            this.bPengJumping = false;
            jumpTurn_idx = 0;
            acc_jumpTime = flag_tick;
        }

    }
};