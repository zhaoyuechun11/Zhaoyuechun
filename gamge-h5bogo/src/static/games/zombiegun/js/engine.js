GAME.playSpine = function(spine, animName, loop, trackIndex, clear, timeScale){
	if(loop === undefined) loop = false;
	if(trackIndex === undefined) trackIndex = 0;
	if(clear === undefined) clear = false;
	if(timeScale === undefined) timeScale = 1;
	
	spine.visible = true;
	spine.alpha = 1;
	
	spine.state.timeScale = timeScale;
	
	if(clear)
		spine.state.clearTracks();
	
	spine.state.setAnimation(trackIndex, animName, loop);
};

GAME.getMoneyBuff_pct = 0;
GAME.bPlusMoney = false;
GAME.discount_floorMove = 0;
GAME.bBuff_elevator = false;

GAME.setGunBuff = function(gunIndex){
	GAME.getMoneyBuff_pct = 0;
	GAME.discount_floorMove = 0;
	GAME.flag_life = GAME.basic_heartCnt;//버프 값 초기화...

    GAME.bPlusMoney = false;
    GAME.bBuff_elevator = false;

	var gunData = GAME.gunData[gunIndex];
	var i = 0; var value = 0; var type = 0;
	for(i=0;i<2;++i){
		type = gunData["skill"+(i+1).toString()];
		if(type === -1) break;

		switch(type){
			case 100://돈 획득량 증가.
                GAME.bPlusMoney = true;
			    GAME.getMoneyBuff_pct = gunData["value"+(i+1).toString()]*0.01;
			    break;
			case 101://층 이동 요금 할인.
                GAME.bBuff_elevator = true;
			    GAME.discount_floorMove = gunData["value"+(i+1).toString()]*0.01;
			    break;
			case 102://라이프 증가.
			    GAME.flag_life = GAME.basic_heartCnt + gunData["value"+(i+1).toString()];
			    break;
			case 103://라이프 감소.
			    GAME.flag_life = GAME.basic_heartCnt - gunData["value"+(i+1).toString()];
			    break;
		}
	}
};

GAME.engine = function(){
	this.stageManager = new GAME.stageManager(this);
	
	this.state = GAME.state.STATE_TITLE;
	this.gameState = GAME.gameState.STATE_NONE;
	
	this.stageManager = new GAME.stageManager(this);
	GAME.view = new GAME.view(this);

	stage.addChild(this.stageManager.floorContainer);
	stage.addChild(GAME.view.viewContainer);
	stage.addChild(sTopContainer);//networkManager에서 쓸 최상단 container

	this.gunFire();
};

GAME.engine.constructor = GAME.engine;
GAME.engineInst = undefined;

GAME.engine.prototype.init = function(){
	this.stageManager.init();
};

GAME.engine.prototype.update = function(){
	var length = 0; var i = 0;
	switch(this.state){
	case GAME.state.STATE_TITLE:
		break;
	case GAME.state.STATE_GAME:
		switch(this.gameState){
		case GAME.gameState.STATE_NONE:
			break;
		case GAME.gameState.STATE_PLAY:
			this.stageManager.insertZombie();
			this.stageManager.update();
			if(this.stageManager.allDeath()){
				GAME.view.blueSiren();
			}
			break;
		case GAME.gameState.STATE_UPSTAIR:
			break;
		}
		break;
	case GAME.state.STATE_PAUSE:
		i = 0;
		length = GAME.view.pause_Spines.length;
		for(i=0;i<length;++i){
			GAME.view.pause_Spines[i].state.timeScale = 0;
		}
		break;
	case GAME.state.STATE_OVER:
		if(GAME.view.bStopCntFlag)
			GAME.view.countFloor();
		i = 0;
		length = GAME.view.pause_Spines.length;
		for(i=0;i<length;++i){
			GAME.view.pause_Spines[i].state.timeScale = 0;
		}
		break;
	}

	if(GAME.ui_shop_gold.spr_bg.visible)
		GAME.ui_shop_gold.update();
};

GAME.engine.prototype.gunFire = function () {
	var self = this;
	//left : 0, right : 1
	document.addEventListener('keydown', function(event){
	    var THIS = self;
        if(THIS.state === GAME.state.STATE_GAME || GAME.bShop){
            if(GAME.bChangeGun || THIS.gameState === GAME.gameState.STATE_UPSTAIR) return;

            switch(event.which){
                case 37:
                    event.preventDefault();
                    if(!GAME.bPushKeyboard_left){
                        if(!GAME.bShop){//스테이지 진행.
                            if(kData.bFirstPlay) return;
                            GAME.view.fire(0);
                            THIS.stageManager.hit(0);
                        }else{//상점에서 총 쏘는 경우.
                            GAME.view.fire(0);
                            GAME.view.shotTarget(0);
                        }
                    }
                    GAME.bPushKeyboard_left = true;
                    break;
                case 39:
                    event.preventDefault();
                    if(!GAME.bPushKeyboard_right){
                        if(!GAME.bShop){
                            if(kData.bFirstPlay) return;
                            GAME.view.fire(1);
                            THIS.stageManager.hit(1);
                        }else{
                            GAME.view.fire(1);
                            GAME.view.shotTarget(1);
                        }
                    }
                    GAME.bPushKeyboard_right = true;
                    break;
            }
        }
	});
	
	document.addEventListener('keydown', function(event){///space key pause
        var THIS = self;
		if(kData.bFirstPlay || THIS.state === GAME.state.STATE_OVER || THIS.state === GAME.state.STATE_TITLE) return;
		if(32 === event.which){
	    	var view = GAME.view;
			view.pause_bPopOn = (!view.pause_bPopOn) ? true:false;
	    
	    	if(view.pause_bPopOn){
	    		event.preventDefault();
	    		view.showPausePop();
			} else {
				event.preventDefault();
				view.hidePausePop();
			}
	    }
	});
	
	document.addEventListener('keyup', function(event){
		switch(event.which){
			case 37:
				GAME.bPushKeyboard_left = false;
			break;
			case 39:
				GAME.bPushKeyboard_right = false;
			break;
		}
	});
	
	document.addEventListener("mousedown", function(event){
	    var THIS = self;
        if(THIS.state === GAME.state.STATE_GAME || GAME.bShop){
            if(GAME.bChangeGun || GAME.bGetButton || THIS.gameState === GAME.gameState.STATE_UPSTAIR) return;

            var screenWidth = window.innerWidth;
            var halfScreenWidth = screenWidth/2;
            var mouseX = event.clientX;


            if(mouseX <= halfScreenWidth){
                if(!GAME.bShop){
                    if(kData.bFirstPlay) return;
                    GAME.view.fire(0);
                    THIS.stageManager.hit(0);
                }
                else{
                    GAME.view.fire(0);
                    GAME.view.shotTarget(0);
                }

            } else {
                if(!GAME.bShop){
                    if(kData.bFirstPlay) return;
                    GAME.view.fire(1);
                    THIS.stageManager.hit(1);
                }
                else {
                    GAME.view.fire(1);
                    GAME.view.shotTarget(1);
                }
            }
        }
	});
	
	document.addEventListener("click", function(){
		GAME.bGetButton = false;
	});

	touch_area_left.on("touchstart", function(){
	    var THIS = self;
        if(THIS.state === GAME.state.STATE_GAME || GAME.bShop){
            if(GAME.bChangeGun||GAME.bGetButton || THIS.gameState === GAME.gameState.STATE_UPSTAIR) return;

            if(!GAME.bShop){
                if(kData.bFirstPlay) return;
                GAME.view.fire(0);
                THIS.stageManager.hit(0);
            } else {
                GAME.view.fire(0);
                GAME.view.shotTarget(0);
            }
        }
	});

	touch_area_right.on("touchstart", function(){
        var THIS = self;
        if(THIS.state === GAME.state.STATE_GAME || GAME.bShop){
            if(GAME.bChangeGun||GAME.bGetButton || THIS.gameState === GAME.gameState.STATE_UPSTAIR) return;

            if(!GAME.bShop){
                if(kData.bFirstPlay) return;
                GAME.view.fire(1);
                THIS.stageManager.hit(1);
            } else {
                GAME.view.fire(1);
                GAME.view.shotTarget(1);
            }
        }
	});

	document.body.addEventListener("touchend", function(e){
		GAME.bGetButton = false;
	});
};

GAME.engine.prototype.replay = function(){
    SESoundPlay(SE_BUTTON);
    GAME.view.cont_Count = 0;
    GAME.view.bSelfOver = false;
    GAME.view.bNewScore = false;
    gameResultMoney = 0;

	// if(GAME.view.bSkip){
	// 	GAME.view.showSelectPop();
	// 	return;
	// }

	SESoundStop(SE_GAMEOVER);
	this.state = GAME.state.STATE_GAME;
	this.gameState = GAME.gameState.STATE_NONE;

    GAME.view.replay();
    this.stageManager.init();
    this.stageManager.createStage();
    GAME.view.redSiren();

	GAME.accStageGold = 0;
};

GAME.engine.prototype.goTitle = function(){
    SESoundPlay(SE_BUTTON);
	SESoundStop(SE_GAMEOVER);
	GAME.view.bSkip = false;

	gameResultMoney = 0;

    this.state = GAME.state.STATE_TITLE;
	this.gameState = GAME.gameState.STATE_NONE;

    GAME.view.cont_Count = 0;
    GAME.view.bSelfOver = false;
    GAME.view.bNewScore = false;
	GAME.view.showTitle();
	GAME.view.replay();
	GAME.view.outHand();
	GAME.view.pause_btnPause.sprite.visible = false;
	//GAME.view.btn_showRank.sprite.visible = false;
	GAME.view.heart.hideHeart();

	this.stageManager.init();
	this.stageManager.createStage();
	
	GAME.accStageGold = 0;

	GAME.view.bPause_out = false;
};

GAME.engine.prototype.continue = function(){
	SESoundStop(SE_GAMEOVER);
	this.state = GAME.state.STATE_GAME;
	this.gameState = GAME.gameState.STATE_NONE;

	GAME.view.replay();
	this.stageManager.createStage();
	GAME.view.redSiren();
};