function View(){
	this.viewContainer = new PIXI.Container();
	this.shieldContainer = new PIXI.Container();
	
	this.callTitle = false;
	this.titleSpine = new PIXI.spine.Spine(spines.title);
	this.startSpine = new PIXI.spine.Spine(spines.startBtn);
	
	this.tips = undefined; //파일에서 읽어온 팁 객체의 배열 정보가 담기는 변수.

	this.bMobile = false;
	this.bShowTuto = false;

	this.bonusGem = 0;

	this.tipTextures = [];

	this.contGem = 10;

	//copyright//
	//this.copyright = FontLoad(this.viewContainer, "Copyright Ⓒ 2017 Game Corp. All rights reserved", iCenterSizeX, iCenterSizeY+600
	//	, {font:"17px Arial", fill:"#000000", wordWrap:true, wordWrapWidth:iMaxSizeX, fontWeight:"bold"});

	// if(yahooIN===undefined) this.copyright.text = "Copyright Ⓒ 2017 Game Corp. All rights reserved";//yahoo 대응.
	// else this.copyright.text = "(C) RECOM Co.,Ltd. 2017 All Rights Reserved.";//yahoo 대응.

    /*if(document.location.href.indexOf("game.com") > 0){
        this.copyright.text = "Copyright Ⓒ 2017 Game Corp. All rights reserved";
    }else{
        this.copyright.text = "(C) COM Co.,Ltd. 2017 All Rights Reserved.";
    }*/

	//this.copyright.visible = false;
    // kMGMenu.HideYahooIcon();

	this.txt_version = FontLoad(this.viewContainer, version, 710, 1261,{ font:"15px Arial", fill: '#A0A0FF'}, 1, 0.5);
	this.txt_version.visible = false;

	//set button shielder//
    this.buttonShielder = SpriteLoad(this.shieldContainer, strGamePath+"img/white.png", iCenterSizeX, iCenterSizeY);
    this.buttonShielder.scale.set(180, 320);
    this.buttonShielder.interactive = true;
    this.buttonShielder.alpha = 0;
    this.buttonShielder.visible = false;
}

View.prototype.init = function(){
    /**
     * title init start
     * */
    this.spr_leftTouchArea = SpriteLoad(this.viewContainer, "white.png", iCenterSizeX-(iCenterSizeX*0.5), iCenterSizeY);
    this.spr_leftTouchArea.width = iCenterSizeX;
    this.spr_leftTouchArea.height = iMaxSizeY;
    this.spr_leftTouchArea.alpha = 0;
    this.spr_leftTouchArea.interactive = true;

    this.spr_leftTouchArea.on("touchstart", function () {
        if(engine.state !== engine.gameState.STATE_GAME) return;
        if(engine.bGetButton) return;
        if(GAME.ui_gemShop!==undefined&&GAME.ui_gemShop.spr_bg.visible) return;

        if(GAME.penguin.buff === GAME.itemType.nothing && GAME.penguin.spine_emoticon.visible)
            SpinePlay_1(GAME.penguin.spine_emoticon, "imoticon_out", 0, false);

        GAME.waitForInputTime = 0;
        GAME.penguin.move(1);
        GAME.view.touchMobileBtn(1);
    });

    this.spr_leftTouchArea.on("touchend", function(e){
        engine.bGetButton = false;
        GAME.view.restoreMobileBtn();
    });

    this.spr_rightTouchArea = SpriteLoad(this.viewContainer, "white.png", iCenterSizeX+(iCenterSizeX*0.5), iCenterSizeY);
    this.spr_rightTouchArea.width = iCenterSizeX;
    this.spr_rightTouchArea.height = iMaxSizeY;
    this.spr_rightTouchArea.alpha = 0;
    this.spr_rightTouchArea.interactive = true;

    this.spr_rightTouchArea.on("touchstart", function () {
        if(engine.state !== engine.gameState.STATE_GAME) return;
        if(engine.bGetButton) return;
        if(GAME.ui_gemShop!==undefined&&GAME.ui_gemShop.spr_bg.visible) return;

        if(GAME.penguin.buff === GAME.itemType.nothing && GAME.penguin.spine_emoticon.visible)
            SpinePlay_1(GAME.penguin.spine_emoticon, "imoticon_out", 0, false);

        GAME.waitForInputTime = 0;
        GAME.penguin.move(0);
        GAME.view.touchMobileBtn(0);
    });

    this.spr_rightTouchArea.on("touchend", function(e){
        engine.bGetButton = false;
        GAME.view.restoreMobileBtn();
    });

    this.viewContainer.addChild(this.titleSpine);
    this.viewContainer.addChild(this.startSpine);

    this.spr_start = SpriteLoad(this.viewContainer, strGamePath+"img/white.png", iCenterSizeX, iCenterSizeY);//화면에 안보이는 스타트 트리거
    this.spr_start.scale.set(180, 320);
    this.spr_start.alpha = 0;
    this.spr_start.interactive = true;
    this.spr_start.visible = false;

	this.spr_start.on("click", playGame);
	this.spr_start.on("tap", playGame);

	function playGame(){
	    if(yahooIN!==undefined){
            if(kData["bTermsOfUse"] === undefined) {
                kMGMenu.ShowTermsOfUse();
                return;
            }

            // if(kData["attendanceCnt"] === undefined || kData["attendanceCnt"] < this.attendanceCnt){
            //     kMGMenu.SetToastMsg(kMGMenu.GetString("attendance"));
            //     kData["attendanceCnt"] = kMGMenu.attendanceCnt;
            //     networkManager.ForcedSaveData();
            // }

            if(kMGMenu.attendanceTF === 1){
                kMGMenu.SetToastMsg(kMGMenu.GetString("attendance"));
                kMGMenu.attendanceTF = 0;
            } // 출석이벤트 토스트 출력.
        }

        // 일본쪽 폰트 깨지는 부분때문에 다시 셋팅.
		GAME.view.txt_meter.text = "dummy";
		GAME.view.txt_meter.text = "M";
		GAME.view.txt_OverTitle.text = "dummy";
		GAME.view.txt_OverTitle.text = GAME.table_language["gameover01"][GAME.language];
		GAME.view.txt_btnBonus.text = "dummy";
		GAME.view.txt_btnBonus.text = GAME.table_language["popup03"][GAME.language];
		GAME.view.txt_dashCnt.text = "100";

        if(GAME.bPressTitleSound) return;
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
		GAME.view.btn_titleSound.sprite.visible = false;//sprJPSound
	}

	this.titleSpine.state.addListener({
	    complete:function(entry){
	        SpinePlay(GAME.view.startSpine, iCenterSizeX, iCenterSizeY+300, "title_in", 0, false);
	        // console.log("hi2");
        }
    });

	this.startSpine.state.addListener({
	    complete:function(entry){
	        if(entry.trackIndex !== 0) return;
	        SpinePlay(GAME.view.startSpine, iCenterSizeX, iCenterSizeY+300, "title_idle", 1, true);
	        GAME.view.spr_start.visible = true;
	        GAME.engine.bTitleEnd = true;
	        GAME.view.spr_start.interactive = true;
        }
    });

    var sprGrade = SpriteLoad(this.titleSpine, "img/grade_all.png", 285, -545);
    sprGrade.visible = (yahooIN===undefined);

    /**
     * sprJPSound
     * */
	this.btn_titleSound = new Button(this.viewContainer, "btn_sound.png", iCenterSizeX, iMaxSizeY-140, "none", 0.76, 0.76);
    this.btn_titleSound.setCallback(function () {
        SESoundPlay(SE_BUTTON);
        kData.bSoundSE = !kData.bSoundSE;
        kData.bSoundBGM = !kData.bSoundBGM;
        GAME.view.btn_titleSound.sprite.texture = (kData.bSoundSE) ? GAME.view.tex_soundOrigin : GAME.view.tex_soundDisable;
        SaveDataInClient();
        if(kData.bSoundBGM) BGMSoundPlay(BGM_BG);
        else arrBGM[BGM_BG].stop();
    });
    this.btn_titleSound.sprite.visible = false;
    /**
     * sprJPSound
     * */
	/**
     * title init end
     * */
    // this.viewContainer.displayList = new PIXI.DisplayList();
    // this.uiLayer = new PIXI.DisplayGroup(0, false);
    // this.blackLayer = new PIXI.DisplayGroup(1, false);
    // this.popupLayer = new PIXI.DisplayGroup(2, false);
    // this.blackLayer_01 = new PIXI.DisplayGroup(3, false);
    // this.popupLayer_01 = new PIXI.DisplayGroup(4, false);

    // this.viewContainer.addChild(GAME.curtain);



	this.detactDevice();
    this.overPopInit();
    this.pausePopInit();
    this.pauseBtnInit();
    this.dashPopInit();
    this.bonusPopInit();
    this.contPopInit();
    this.mobileBtnInit();
    this.tutorialInit();
    this.tipPopInit();

    this.sprCurGem = SpriteLoad(this.viewContainer, "jewel_bg.png", iCenterSizeX-180, iCenterSizeY-570);
    this.spine_gem = new PIXI.spine.Spine(spines.gem);
    this.sprCurGem.addChild(this.spine_gem);

    //this.btn_showShop = new GUMA.button(this.sprCurGem, "plus.png", 100, 0);
    //this.btn_showRank = new GUMA.button(this.viewContainer, "btn_rank.png", 650, 190);

    this.txt_meter = FontLoad(this.viewContainer, "M", iCenterSizeX+225, iCenterSizeY-560
        , {font:"50px "+GAME.fontName[GAME.language], fill:"#FCFF00", stroke:"#000000", strokeThickness:8, lineJoin:"round"}, 1, 0.5);
    this.txt_score = FontLoad(this.txt_meter, "0", -(this.txt_meter.width/2)-15, -8
        , {font:"80px "+GAME.fontName[GAME.language], fill:"#FCFF00", stroke:"#000000", strokeThickness:8}, 1, 0.5);

    this.txt_curGem = FontLoad(this.sprCurGem, "curGem", 50, 5, {font:"60px "+GAME.fontName[GAME.language], fill:"#000000"}, 1, 0.5);

    GAME.ui_gemShop = new UI_shop(this.viewContainer);
    GAME.ui_message = new UI_message(this.viewContainer);
    GAME.ui_ranking = new UI_ranking(this.viewContainer);

    /*this.btn_showShop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        GAME.ui_gemShop.cb_ShowPop();
	});
    this.btn_showShop.setDownAction(function(){
        GAME.engine.bGetButton = true;
    });*/


	/*this.btn_showRank.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		GAME.ui_ranking.checkRanking();
	});
	this.btn_showRank.setDownAction(function(){
        GAME.engine.bGetButton = true;
    });*/

	this.off_All();
};



View.prototype.playTitle = function(){
	this.callTitle = true;
    // window.parent.postMessage("callApk", "*");//밑에 alert은 안되는데 이 코드는 됨;;;
    // alert("parent: "+window.parent);//error
    // window.parent.showAD();//이 코드도 error

    SpinePlay(this.titleSpine, iCenterSizeX, iCenterSizeY-10, "title_in", 0, false);

	BGMSoundPlay(BGM_BG);
};

View.prototype.showMainUI = function(){
	this.sprCurGem.visible = true;
	this.sprPauseBtn.sprite.visible = true;
	//this.btn_showRank.sprite.visible = true;
};

View.prototype.showScore = function(){
    this.txt_meter.visible = true;
};

View.prototype.updateCount = function(){
	this.txt_score.text = GAME.engine.blockCount.formatMoney(0);
};

View.prototype.updateGemCnt = function(){
	this.txt_curGem.text = GAME.engine.gemCount.toString();
};

View.prototype.dashPopInit = function(){
    this.sprDashPopBG = SpriteLoad(this.viewContainer, "super.png", iCenterSizeX, iCenterSizeY-300);
    this.txt_dashCnt = FontLoad(this.sprDashPopBG, "100", -40, -65, {font:"90px "+GAME.fontName[GAME.language], fill:"#FCFF00"}, 0, 0.5);
    this.txt_dashMeter = FontLoad(this.sprDashPopBG, "M", this.txt_dashCnt.width+50, -55, {font:"50px "+GAME.fontName[GAME.language], fill:"#FCFF00"});

    this.btn_dash = new Button(this.sprDashPopBG, "btn_super.png", 0, 80);
    this.btn_dash.setCallback(function () {
        // GAME.engine.gemCount = 0;//test
        if(GAME.engine.gemCount < GAME.engine.dashGem){
            // GAME.ui_gemShop.showPop();
            // networkManager.GetShoplist(ShopType.GAMEMONEY, GAME.ui_gemShop.cb_ShowPop);
            GAME.ui_gemShop.cb_ShowPop();
            return;
        }

        engine.bChoiceDash = true;

        if(GAME.penguin.spine_emoticon.visible){
            GAME.penguin.spine_emoticon.visible = false;
        }

        GAME.view.closeDashPop();
        GAME.view.showScore();
       	GAME.view.hideTutorial();

       	SESoundPlay(SE_BUTTON);

       	GAME.engine.gemCount -= GAME.engine.dashGem;//default
       	kData.iGemCount = GAME.engine.gemCount;
       	GAME.view.updateGemCnt();

        SaveDataInClient();
    });

    this.btn_dash.setDownAction(function(){
        GAME.engine.bGetButton = true;
    });

    this.txt_dashGem = FontLoad(this.btn_dash.sprite, "0", 70, 0
        , {font:"50px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});
};

View.prototype.showDashPop = function(){
	this.sprDashPopBG.interactive = true;
	// GAME.engine.dashCount = 1000;
    this.txt_dashCnt.text = "dummy";
	this.txt_dashCnt.text = GAME.engine.dashCount.formatMoney(0);
	this.txt_dashMeter.position.x = this.txt_dashCnt.width-20;
    this.txt_dashGem.text = GAME.engine.dashGem.formatMoney(0);
	
	this.sprDashPopBG.visible = true;
};

View.prototype.closeDashPop = function(){
	this.sprDashPopBG.visible = false;
};

var showPausePop = function () {
    if(GAME.engine.state === GAME.engine.gameState.STATE_OVER)
        return;

    if(GAME.engine.state === GAME.engine.gameState.STATE_PAUSE){
        SESoundPlay(SE_BUTTON);
        GAME.view.sprPausePopBG.visible = false;
        GAME.engine.state = GAME.engine.prevState;
        if(GAME.view.bShowDashPop){
            GAME.view.bShowDashPop = false;
            GAME.view.sprDashPopBG.visible = true;
        }
        if(GAME.view.bShowTuto){
            GAME.view.showTutorial();
        }
        return;
    }

    if(GAME.view.sprDashPopBG.visible === true){
        GAME.view.bShowDashPop = true;
        GAME.view.sprDashPopBG.visible = false;
    }

    if(GAME.view.sprHand_left.visible === true){
        GAME.view.bShowTuto = true;
        GAME.view.hideTutorial();
    }

    SESoundPlay(SE_BUTTON);

    GAME.view.btn_sound.sprite.texture = (kData.bSoundSE) ? GAME.view.tex_soundOrigin : GAME.view.tex_soundDisable;

    GAME.view.sprPausePopBG.visible = true;
    GAME.engine.prevState = GAME.engine.state;
    GAME.engine.state = GAME.engine.gameState.STATE_PAUSE;
};

View.prototype.pauseBtnInit = function(){
	this.sprPauseBtn = new GUMA.button(this.viewContainer, "btn_pause.png", 650, 70);
	this.sprPauseBtn.setCallback(showPausePop);
	this.sprPauseBtn.setDownAction(function(){
        GAME.engine.bGetButton = true;
    });
	
	// function showPausePop(){
	// 	if(GAME.engine.state === GAME.engine.gameState.STATE_OVER)
	// 		return;
	//
	// 	if(GAME.engine.state === GAME.engine.gameState.STATE_PAUSE){
	// 		SESoundPlay(SE_BUTTON);
	// 		GAME.view.sprPausePopBG.visible = false;
     //        GAME.engine.state = GAME.engine.prevState;
	// 		if(GAME.view.bShowDashPop){
	// 			GAME.view.bShowDashPop = false;
	// 			GAME.view.sprDashPopBG.visible = true;
	// 		}
	// 		if(GAME.view.bShowTuto){
	// 			GAME.view.showTutorial();
	// 		}
	// 		return;
	// 	}
	//
	// 	if(GAME.view.sprDashPopBG.visible === true){
	// 		GAME.view.bShowDashPop = true;
	// 		GAME.view.sprDashPopBG.visible = false;
	// 	}
	//
	// 	if(GAME.view.sprHand_left.visible === true){
	// 		GAME.view.bShowTuto = true;
	// 		GAME.view.hideTutorial();
	// 	}
	//
	// 	SESoundPlay(SE_BUTTON);
    //
     //    GAME.view.btn_sound.sprite.texture = (kData.bSoundSE) ? GAME.view.tex_soundOrigin : GAME.view.tex_soundDisable;
    //
	// 	GAME.view.sprPausePopBG.visible = true;
     //    GAME.engine.prevState = GAME.engine.state;
     //    GAME.engine.state = GAME.engine.gameState.STATE_PAUSE;
	// }
};

View.prototype.pausePopInit = function(){
	this.sprPausePopBG = SpriteLoad(this.viewContainer, "popup_ui_1.png", iCenterSizeX, iCenterSizeY-50);
	this.sprPausePopBG.interactive = true;
	this.txt_pauseTitle = FontLoad(this.sprPausePopBG, GAME.table_language["popup01"][GAME.language], 0, -210
	    , {font:"100px "+GAME.fontName[GAME.language], fill:"#ffffff"});

	this.btn_resume = new Button(this.sprPausePopBG, "btn_play.png", -100, -25);
	this.btn_resume.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        GAME.view.sprPausePopBG.visible = false;
        GAME.engine.state = GAME.engine.prevState;

        if(GAME.prev_pauseState===GAME.engine.gameState.STATE_REPLAY){
            GAME.view.bShowTuto = true;
            // GAME.view.showTutorial();
        } else if(GAME.prev_pauseState===GAME.engine.gameState.STATE_OVER){
            GAME.View.showMobileBtn();
        }

        GAME.prev_pauseState = -1;

        if(GAME.view.bShowDashPop){
            GAME.view.bShowDashPop = false;
            GAME.view.sprDashPopBG.visible = true;
        }
        if(GAME.view.bShowTuto){
            GAME.view.showTutorial();
        }
	});

	this.btn_replay = new Button(this.sprPausePopBG, "btn_replay.png", 100, -25);
    this.btn_replay.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        GAME.engine.replayGame();
        GAME.view.sprPausePopBG.visible = false;
	});

	this.btn_title = new Button(this.sprPausePopBG, "btn_home.png", 100, 150);
	this.btn_title.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        GAME.engine.goTitle();
        GAME.view.off_All();
	});

	this.btn_sound = new Button(this.sprPausePopBG, "btn_sound.png", -100, 150);
	this.tex_soundOrigin = this.btn_sound.sprite.texture;
	this.tex_soundDisable = new PIXI.Texture.fromFrame("btn_sound_off.png");
	this.btn_sound.setCallback(function(){
		SESoundPlay(SE_BUTTON);
		kData.bSoundSE = !kData.bSoundSE;
		kData.bSoundBGM = !kData.bSoundBGM;
        GAME.view.btn_sound.sprite.texture = (kData.bSoundSE) ? GAME.view.tex_soundOrigin : GAME.view.tex_soundDisable;
        SaveDataInClient();
		if(kData.bSoundBGM) BGMSoundPlay(BGM_BG);
		else arrBGM[BGM_BG].stop();
	});
};

View.prototype.overPopInit = function(){
	this.sprOverPopBG = SpriteLoad(this.viewContainer, "popup_ui_2.png", iCenterSizeX, iCenterSizeY+50);

	this.txt_OverTitle = FontLoad(this.sprOverPopBG, GAME.table_language["gameover01"][GAME.language], 0, -345
        , {font:"100px "+GAME.fontName[GAME.language], fill:"#ffffff"}, 0.5, 0.5, 600);
	/*this.txt_BestTitle =*/ FontLoad(this.sprOverPopBG, GAME.table_language["ui01"][GAME.language], 8, -245, {font:"70px "+GAME.fontName[GAME.language], fill:"#FCFF00"});
	/*this.txt_CurTitle = */FontLoad(this.sprOverPopBG, GAME.table_language["ui02"][GAME.language], 0, 10, {font:"70px "+GAME.fontName[GAME.language], fill:"#FCFF00"});

	this.btn_title = new GUMA.button(this.sprOverPopBG, "btn_home.png", 200, 300);
	this.btn_title.setCallback(goTitle);
    function goTitle(){
    	SESoundPlay(SE_BUTTON);
        GAME.engine.goTitle();
    	GAME.view.off_All();
    }

    this.btn_replay = new GUMA.button(this.sprOverPopBG, "btn_replay.png", 23, 300);
    this.btn_replay.setCallback(replayGame);
    function replayGame(){
    	SESoundPlay(SE_BUTTON);
        GAME.engine.replayGame();
    	GAME.view.sprOverPopBG.visible = false;
    }

    this.btn_bonus = new GUMA.button(this.sprOverPopBG, "btn_bonus.png", -180, 300);
    this.btn_bonus.setCallback(getBonus);
    this.txt_btnBonus = FontLoad(this.btn_bonus.sprite, GAME.table_language["popup03"][GAME.language], 0, -45
		, {font:"50px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5}, 0.5, 0.5, 165);
	this.txt_bonusGemCnt = FontLoad(this.btn_bonus.sprite, GAME.bonusGemCnt.toString(), 50, 35
        , {font:"70px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});
	this.tex_BonusOrigin = this.btn_bonus.sprite.texture;
	this.tex_BonusDisable = new PIXI.Texture.fromFrame("btn_bonus_cooltime.png");
	this.timer_bonus = new Timer(this.btn_bonus.sprite, {fontFamily:"Apache", fontSize:"45px", fill:"#626262"});
	/**
     * 남은 시간 계산
     * */
	var remainTime = 0;
    remainTime = GAME.curServerTime - kData.bonusGemEndTime;
    if(remainTime < 0) remainTime *= -1;// 시간이 남았다
    else remainTime = 0;//볼 수 있다.

    if(kData.bonusGemEndTime !== 0) GAME.view.timer_bonus.remainTime = remainTime;
    else GAME.view.timer_bonus.remainTime = 0;

    //timer init
    this.bGetBonus = true;
    if(GAME.view.timer_bonus.remainTime<=0){
        GAME.view.btn_bonus.sprite.texture = GAME.view.tex_BonusOrigin;
    } else {
        GAME.view.bGetBonus = false;
        GAME.view.btn_bonus.sprite.texture = GAME.view.tex_BonusDisable;
        GAME.view.timer_bonus.txt_coolTime.visible = true;
        GAME.view.txt_bonusGemCnt.visible = false;
        GAME.view.txt_btnBonus.visible = false;
    }

	this.timer_bonus.coolTime = GAME.bonusCool;
	this.timer_bonus.cb_ableFunction = function(THIS){
	    THIS.bGetBonus = true;
        THIS.btn_bonus.sprite.texture = THIS.tex_BonusOrigin;
        THIS.timer_bonus.txt_coolTime.visible = false;
        THIS.txt_bonusGemCnt.visible = true;
        THIS.txt_btnBonus.visible = true;
    };

    function getBonus() {
        SESoundPlay(SE_BUTTON);
    	if(!GAME.view.bGetBonus) return;
    	networkManager.GetServerTime(function(timeStamp){
    	    var viewer = GAME.view;
    	    kData.bonusGemEndTime = timeStamp + viewer.timer_bonus.coolTime;
            viewer.timer_bonus.remainTime = viewer.timer_bonus.coolTime;

            kData.iGemCount += GAME.bonusGemCnt;
            GAME.engine.gemCount = kData.iGemCount;
            viewer.updateGemCnt();

            viewer.bGetBonus = false;
            viewer.btn_bonus.sprite.texture = viewer.tex_BonusDisable;
            viewer.timer_bonus.txt_coolTime.visible = true;
            viewer.txt_bonusGemCnt.visible = false;
            viewer.txt_btnBonus.visible = false;

            networkManager.ForcedSaveData();
        });
    }

	this.txt_BestScore = FontLoad(this.sprOverPopBG, "00", 0, -160, {font:"130px "+GAME.fontName[GAME.language], fill:"#FCFF00"});
	this.txt_bestMeter = FontLoad(this.sprOverPopBG, "M", (this.txt_BestScore.width/2)+35, -147
        , {font:"90px "+GAME.fontName[GAME.language], fill:"#FCFF00"});
	this.txt_CurScore = FontLoad(this.sprOverPopBG, "000", 0, 90, {font:"100px "+GAME.fontName[GAME.language], fill:"#FCFF00"});
	this.txt_curMeter = FontLoad(this.sprOverPopBG, "M", (this.txt_CurScore.width/2)+25, 102
        , {font:"60px "+GAME.fontName[GAME.language], fill:"#FCFF00"});

	//set newScore spine
    this.shieldContainer.addChild(GAME.sp_newScore);
    GAME.sp_newScore.position.set(iCenterSizeX, iCenterSizeY);
    GAME.sp_newScore.state.addListener({
       complete:function (entry) {
           switch(entry.animation.name){
               case "new_score_ani_in":
                   SpinePlay_1(GAME.sp_newScore, "new_score_ani_out");
                   break;
               case "new_score_ani_out":
                   if(loginTF === 1) networkManager.LoadRanking(GAME.ui_ranking.cb_setRankingPop());
                   GAME.view.buttonShielder.visible = false;
                   break;
           }
       }
    });
};

View.prototype.timerUpdate = function(){
    if(this.timer_bonus.remainTime !== undefined)
        this.timer_bonus.remainTime -= deltaTime;

    if(!this.sprOverPopBG.visible) return;

    if(this.timer_bonus.remainTime>0){
        this.timer_bonus.update();
    }

    this.timer_bonus.checkRemainTime(this);
};

View.prototype.showOverPop = function(){
    // ---------------- 这里是结束的地方 ---------------- //
    //GAME.engine.blockCount

    if ( window.parent != null ) {
        window.parent.postMessage({
          cmd: "GameOver",
          msg: {
            score: GAME.engine.blockCount, // 如果是星星数，也是这个分数
            level: 0
          }
        }, "*");
      }

    return;
	this.sprOverPopBG.visible = true;

	kData.iRankScore = GAME.engine.blockCount;

	if(networkManager.networkState !== NET_STATE.LOCALHOST){
        if(loginTF===1) networkManager.SaveRaking();//default
        else {
            // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_language["ranking05"][GAME.language], networkManager.JoinMember, null);
            kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
        }//default
    }

    // GAME.bRenewHighScore = true;//test
    if(GAME.bRenewHighScore) {
        this.buttonShielder.visible = true;
        SpinePlay_1(GAME.sp_newScore, "new_score_ani_in");
        SESoundPlay(SE_NEWBEST);
    }

    this.txt_BestScore.text = GAME.engine.highScore.formatMoney(0);
    this.txt_bestMeter.position.x = (this.txt_BestScore.width/2)+35;
    this.txt_CurScore.text = GAME.engine.blockCount.formatMoney(0);
    this.txt_curMeter.position.x = (this.txt_CurScore.width/2)+35;
};

View.prototype.bonusPopInit = function(){
	this.sprBonusPopBG = SpriteLoad(this.viewContainer, "popup_ui_1.png", iCenterSizeX, iCenterSizeY-50);
    this.txt_bonusTitle = FontLoad(this.sprBonusPopBG, GAME.table_language["popup03"][GAME.language], 0, -210
        , {font:"100px "+GAME.fontName[GAME.language], fill:"#ffffff"});

	this.sprBonusGem = SpriteLoad(this.sprBonusPopBG, "item_ui.png", 0, -40);

    this.txt_bonusGem = FontLoad(this.sprBonusGem, "0", 90, 10
        , {font:"80px "+GAME.fontName[GAME.language], fill:"#000000"}, 1, 0.5);

    this.btn_bonusOK = new Button(this.sprBonusPopBG, "btn_ok.png", 0, 150);
    this.txt_bonusOK = FontLoad(this.btn_bonusOK.sprite, GAME.table_language["select03"][GAME.language], 0, 0
        , {font:"60px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});
    this.btn_bonusOK.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        GAME.view.sprBonusPopBG.visible = false;
        GAME.engine.gemCount += GAME.view.bonusGem;
        kData.iGemCount = GAME.engine.gemCount;
        GAME.view.updateGemCnt();
        SaveDataInClient();
        var showOverPop = GAME.view.showOverPop.bind(GAME.view);
        networkManager.ForcedSaveData(false, showOverPop);
        GAME.view.showOverPop();
    });
};

View.prototype.showBonusPop = function(){
	var rand = Math.random();
	
	if(rand<0.5){
		this.bonusGem = 3;
	} else if(rand>=0.7){
		this.bonusGem = 4;
	} else if(rand>=0.5 && rand<0.7){
		this.bonusGem = 5;
	}
	this.txt_bonusGem.text = this.bonusGem.formatMoney(0);
	
	this.sprBonusPopBG.visible = true;
};

View.prototype.contPopInit = function(){
	this.sprContPopBG = SpriteLoad(this.viewContainer, "popup_ui_1.png", iCenterSizeX, iCenterSizeY-50);
    this.txt_ContTitle = FontLoad(this.sprContPopBG, GAME.table_language["popup04"][GAME.language], 0, -210
        , {font:"100px "+GAME.fontName[GAME.language], fill:"#ffffff"});

    this.btn_contGem = new Button(this.sprContPopBG, "btn_revive.png", -120, 30);
    this.txt_contGem = FontLoad(this.btn_contGem.sprite, "88", 43, 0
        , {font:"65px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:6});
    this.btn_contGem.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        if(GAME.engine.gemCount < GAME.view.contGem) {
            // networkManager.GetShoplist(ShopType.GAMEMONEY, GAME.ui_gemShop.cb_ShowPop);
            GAME.ui_gemShop.cb_ShowPop();
            return;
        }//default
        GAME.engine.gemCount -= GAME.view.contGem;//default
        kData.iGemCount = GAME.engine.gemCount;
        GAME.view.updateGemCnt();
        SaveDataInClient();
        GAME.view.sprContPopBG.visible = false;
        GAME.engine.rebirthPeng();
        GAME.engine.bContGame = true;
    });

    this.btn_closePop = new Button(this.sprContPopBG, "btn_no.png", 120, 30);
    this.btn_closePop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        GAME.view.sprContPopBG.visible = false;
        var rand = Math.random();

        if(GAME.first_sealCnt===0&&GAME.penguin.bKilledSeal){
            GAME.view.showTipPop();
            return;
        }

        if(GAME.first_chaosCnt===0&&GAME.penguin.bKilledChaos){
            GAME.view.showTipPop();
            return;
        }

        if(rand>0.5)
        	GAME.view.showOverPop();
        else {
        	// rand = Math.random();
            // if (rand < (1-GAME.showBonusGem)) GAME.view.showTipPop();
            // else GAME.view.showBonusPop();
            GAME.view.showTipPop();
        }
    });
};

View.prototype.showContPop = function(){
    kData.iRankScore = GAME.engine.blockCount;
	this.txt_contGem.text = this.contGem.formatMoney(0);
	this.sprContPopBG.visible = true;
};

View.prototype.tipPopInit = function(){
	this.sprTipPopBG = SpriteLoad(this.viewContainer, "popup_ui_1.png", iCenterSizeX, iCenterSizeY-50);
    this.txt_tipTitle = FontLoad(this.sprTipPopBG, GAME.table_language["popup02"][GAME.language], 0, -210
        , {font:"100px "+GAME.fontName[GAME.language], fill:"#ffffff"});
	this.btn_tipOK = new Button(this.sprTipPopBG, "btn_shop_ok.png", 0, 190);
	this.btn_tipOK.setCallback(function(){
		SESoundPlay(SE_BUTTON);
		GAME.view.sprTipPopBG.visible = false;
		GAME.view.showOverPop();
	});
	this.txt_tipOk = FontLoad(this.btn_tipOK.sprite, GAME.table_language["select03"][GAME.language], 0, 0
	, {font:"40px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});
	
	this.tipFont = FontLoad(this.sprTipPopBG, GAME.table_language["tip01"][GAME.language], 0, 55
			, {font:"40px "+GAME.fontName[GAME.language], fill:"#ffffff", wordWrap:true, wordWrapWidth:500, align:"center"});
	
	this.sprTipIcon = SpriteLoad(this.sprTipPopBG, "jewel.png", 0, -60);
	
	this.texBlock = PIXI.Texture.fromFrame("base_way.png");
	this.texSkipBlock = PIXI.Texture.fromFrame("skip_tile.png");
	this.texIceObs0 = PIXI.Texture.fromFrame("ice_obstacle_0.png");
	this.texIceObs1 = PIXI.Texture.fromFrame("ice_obstacle_1.png");
	this.texIceObs2 = PIXI.Texture.fromFrame("ice_obstacle_2.png");
	this.texIceObs3 = PIXI.Texture.fromFrame("ice_obstacle_3.png");
	this.texSuperObs = PIXI.Texture.fromFrame("block_tile_2.png");
	this.texSeal = PIXI.Texture.fromFrame("enemy.png");
	this.texTale = PIXI.Texture.fromFrame("tale.png");
	this.texGem = PIXI.Texture.fromFrame("jewel.png");
	this.texFlag = PIXI.Texture.fromFrame("flag.png");
	this.texEgg = PIXI.Texture.fromFrame("egg.png");
	this.texPower = PIXI.Texture.fromFrame("tip_image_power_up.png");
	this.texChaos = PIXI.Texture.fromFrame("tip_image_chaos.png");
	
	this.tipTextures.push(this.texBlock);
	this.tipTextures.push(this.texSkipBlock);
	this.tipTextures.push(this.texIceObs1);
	this.tipTextures.push(this.texIceObs2);
	this.tipTextures.push(this.texIceObs3);
	this.tipTextures.push(this.texIceObs0);
	this.tipTextures.push(this.texSuperObs);
	this.tipTextures.push(this.texSeal);
	this.tipTextures.push(this.texTale);
	this.tipTextures.push(this.texGem);//tip 언어 테이블의 순서와 일치시켜놨음.
    this.tipTextures.push(this.texFlag);
    this.tipTextures.push(this.texEgg);
    this.tipTextures.push(this.texPower);
    this.tipTextures.push(this.texChaos);
};

View.prototype.showTipPop = function(){
    var idx = randRangeFromInt(0, 13);
    this.sprTipIcon.texture = this.tipTextures[idx];

    if(GAME.penguin.bKilledSeal){
        idx = 7;
        this.sprTipIcon.texture = this.tipTextures[idx];
        GAME.first_sealCnt = 1;
    }//물개에 죽으면 뜨는 팝업...

    if(GAME.penguin.bKilledChaos){
        idx = 13;
        this.sprTipIcon.texture = this.tipTextures[idx];
        GAME.first_chaosCnt = 1;
    }

    ++idx;
	if(idx<10) idx = "0"+idx.toString();
	else idx = idx.toString();

	this.tipFont.text = GAME.table_language["tip"+idx][GAME.language];

	this.sprTipPopBG.visible = true;
};

View.prototype.off_All = function(){
	this.sprCurGem.visible = false;
	this.sprPauseBtn.sprite.visible = false;
	//this.btn_showRank.sprite.visible = false;
	this.sprDashPopBG.visible = false;
	this.sprPausePopBG.visible = false;
	this.sprOverPopBG.visible = false;
	this.sprBonusPopBG.visible = false;
	this.sprContPopBG.visible = false;
	this.sprTipPopBG.visible = false;
	
	this.txt_meter.visible = false;
};

View.prototype.detactDevice = function(){
	var filter = "win16|win32|win64|mac";
	this.bMobile = (filter.indexOf(navigator.platform.toLowerCase())<0);
};

View.prototype.tutorialInit = function(){
	this.sprKeyboard_left = SpriteLoad(this.viewContainer, "tutorial_keyboard.png", iCenterSizeX-180, iCenterSizeY+290);//scale.x = -1;
	this.sprKeyboard_left.scale.set(-0.9, 0.9);
	this.sprKeyboard_right = SpriteLoad(this.viewContainer, "tutorial_keyboard.png", iCenterSizeX+180, iCenterSizeY+290);
	this.sprKeyboard_right.scale.set(0.9, 0.9);
	
	this.sprHand_left = SpriteLoad(this.viewContainer, "tutorial_hand.png", iCenterSizeX-200, iCenterSizeY+360);//scale.x = -1;
	this.sprHand_left.scale.set(-0.7, 0.7);
	this.sprHand_right = SpriteLoad(this.viewContainer, "tutorial_hand.png", iCenterSizeX+200, iCenterSizeY+360);
	this.sprHand_right.scale.set(0.7, 0.7);
	
	TweenMax.to(this.sprHand_left, 0.5, {scaleY:0.8, repeat:-1, yoyo:true});
	TweenMax.to(this.sprHand_right, 0.5, {scaleY:0.8, repeat:-1, yoyo:true});
	
	this.sprKeyboard_left.visible = false;
	this.sprKeyboard_right.visible = false;
	this.sprHand_left.visible = false;
	this.sprHand_right.visible = false;
};

View.prototype.showTutorial = function(){
	if(this.bMobile){
		this.sprHand_right.visible = true;
		this.sprHand_left.visible = true;
		
		this.sprKeyboard_right.visible = false;
		this.sprKeyboard_left.visible = false;
	} else {
		this.sprHand_right.visible = true;
		this.sprHand_left.visible = true;
		
		this.sprKeyboard_right.visible = true;
		this.sprKeyboard_left.visible = true;
	}
};

View.prototype.hideTutorial = function(){
	this.sprHand_right.visible = false;
	this.sprHand_left.visible = false;
	
	this.sprKeyboard_right.visible = false;
	this.sprKeyboard_left.visible = false;
};

View.prototype.mobileBtnInit = function(){
    this.mBtn_rightPos = {x:iCenterSizeX+250, y:iCenterSizeY+450};
    this.mBtn_leftPos = {x:iCenterSizeX-250, y:iCenterSizeY+450};

	this.R_mobileBtn = SpriteLoad(this.viewContainer, "touch_btn.png", iCenterSizeX+250, iCenterSizeY+450);
	this.L_mobileBtn = SpriteLoad(this.viewContainer, "touch_btn.png", iCenterSizeX-250, iCenterSizeY+450);
	
	this.R_mobileBtn.scale.set(1.2, 1.2);
	this.L_mobileBtn.scale.set(-1.2, 1.2);
	
	this.R_mobileBtn.visible = false;
	this.L_mobileBtn.visible = false;
};

View.prototype.showMobileBtn = function(){
    this.L_mobileBtn.scale.set(-1.2, 1.2);
    this.R_mobileBtn.scale.set(1.2, 1.2);
    this.L_mobileBtn.position.set(this.mBtn_leftPos.x, this.mBtn_leftPos.y);
    this.R_mobileBtn.position.set(this.mBtn_rightPos.x, this.mBtn_rightPos.y);

	this.L_mobileBtn.visible = true;
	this.R_mobileBtn.visible = true;
};

View.prototype.hideMobileBtn = function(){
	this.L_mobileBtn.visible = false;
	this.R_mobileBtn.visible = false;

	TweenMax.killTweensOf(this.L_mobileBtn);
	TweenMax.killTweensOf(this.R_mobileBtn);
};

View.prototype.touchMobileBtn = function(dir){
    if(GAME.penguin.type === GAME.pengType.chaos)
        dir = (dir === 1) ? 0 : 1;

	if(dir === 0){//right
		TweenLite.to(this.R_mobileBtn, 0.3, {scaleX:0.9, scaleY:0.9, ease:Power1.easeOut});
	} else {
		TweenLite.to(this.L_mobileBtn, 0.3, {scaleX:-0.9, scaleY:0.9, ease:Power1.easeOut});
	}
};

View.prototype.restoreMobileBtn = function(){
	TweenLite.to(this.R_mobileBtn, 0.3, {scaleX:1.2, scaleY:1.2, ease:Power1.easeOut});
	TweenLite.to(this.L_mobileBtn, 0.3, {scaleX:-1.2, scaleY:1.2, ease:Power1.easeOut});
};

View.prototype.chaos_Mbtn_pos = function () {
    // this.R_mobileBtn.position.set(this.mBtn_leftPos.x, this.mBtn_leftPos.y);
    // this.L_mobileBtn.position.set(this.mBtn_rightPos.x, this.mBtn_rightPos.y);
    TweenMax.to(this.R_mobileBtn, 0.5, {x:this.mBtn_leftPos.x, y:this.mBtn_leftPos.y});
    TweenMax.to(this.L_mobileBtn, 0.5, {x:this.mBtn_rightPos.x, y:this.mBtn_rightPos.y});
};

View.prototype.backToOringinPos_mBtn = function () {
    // this.R_mobileBtn.position.set(this.mBtn_rightPos.x, this.mBtn_rightPos.y);
    // this.L_mobileBtn.position.set(this.mBtn_leftPos.x, this.mBtn_leftPos.y);
    TweenMax.to(this.R_mobileBtn, 0.5, {x:this.mBtn_rightPos.x, y:this.mBtn_rightPos.y});
    TweenMax.to(this.L_mobileBtn, 0.5, {x:this.mBtn_leftPos.x, y:this.mBtn_leftPos.y});
};