GAME.view = function(engine){
	this.engine = engine;
	this.viewContainer = new PIXI.Container();
	GAME.viewContainer = this.viewContainer;
	this.blackLayer = new PIXI.DisplayGroup(0, false);
	this.popUpLayer = new PIXI.DisplayGroup(1, false);

	this.fakeY = {x:0, y:0};
	this.bStopCntFlag = false;
	this.newBestSpine_over = undefined;
	/////////////////

	///userOwnGun///
	this.gunSoundIndexes = [];
	////////////////

	///shop///
	this.leftTargetFall = false;
	this.rightTargetFall = false;

	// this.gunData;
	this.maxGunIdx = 0;
	this.curShowNum = 0;
	//////////

	///shop_2///
	this.shop_gunSlots = [];
	////////////

	// ///pause key && popup///
	this.pause_bPopOn = false;
	this.pause_Spines = [];
	// //add things
	// this.bPause_out = false;
	// /////////////////////////

	// ///continue pop///
	this.cont_Count = 0;
	// //////////////////

	// ///select Floor pop///
	this.select_needGold = 0;
	this.bSkip = false;
	// //////////////////////

	////depth sort start////
	this.elevatorInit();
	this.rifleRangeInit();
	this.shopInit();
	this.gunInit();
	this.sirenInit();
	
	this.heart = new Heart(GAME.viewContainer);
	this.heart.initHeart();
    this.heart.hideHeart();

    this.initUnlockSpine();

    this.gameOverInit();
    this.tutorialInit();
    /////////////////////
	
	///////////////////////
	this.gameOverPopInit();
	this.pausePopInit();
	this.contPopInit();
	/////////////////////
	this.titleInit();
	/////////////////////
	this.selectPopInit();
	this.exitPopInit();

	GAME.buttonShield = new PIXI.Graphics();
    this.viewContainer.addChild(GAME.buttonShield);//최상단 건테이너에 붙임...
    GAME.buttonShield.beginFill(0xffff00, 0);
    GAME.buttonShield.drawRect(0, 0, iMaxSizeX, iMaxSizeY);

    GAME.buttonShield.endFill();
    GAME.buttonShield.interactive = true;
    GAME.buttonShield.visible = false;

	GAME.ui_shop_gold = new UI_goldShop(this.viewContainer);
    GAME.ui_shop_gold.spr_bg.displayGroup = this.popUpLayer;
    GAME.ui_shop_gold.popupShield.displayGroup = this.blackLayer;

	GAME.ui_ranking = new UI_ranking(this.viewContainer);
	/*this.btn_showRank = new GUMA.button(this.elevator, "btn_rank.png", 300, -450);
	this.btn_showRank.setOriginScale(0.6, 0.6);
	this.btn_showRank.setCallback(GAME.ui_ranking.checkRanking);

	this.btn_showRank.setDownAction(function(){
    	GAME.bGetButton = true;
	});

	this.elevator.addChild(this.btn_showRank.sprite);*/

	GAME.ui_message = new UI_message(this.viewContainer);
	this.bNewScore = false;

	//////////////////
	////depth sort end//////
	this.detectDevice();
};

GAME.view.constructor = GAME.view;

GAME.view.prototype.setUserGun = function(gunNumber){
	switch(gunNumber){
	case 0:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_1");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_1");
		break;
	case 1:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_2");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_2");
		break;
	case 2:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_3");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_3");
		break;
	case 3:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_4");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_4");
		break;
	case 4:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_5");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_5");
		break;
	case 5:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_6");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_6");
		break;
	case 6:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_7");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_7");
		break;
	case 7:
		this.L_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_8_2");
		this.R_hand.skeleton.setAttachment("hand_gun_1", "hand_gun_8_1");
		break;
	}

	this.L_hand.scale.x = -1;
};

GAME.view.prototype.gunInit = function(){
	this.L_hand = new PIXI.spine.Spine(spines.gun_1);
	this.R_hand = new PIXI.spine.Spine(spines.gun_1);

	this.gunSoundIndexes[0] = SE_GUN_0;
	this.gunSoundIndexes[1] = SE_GUN_1;
	this.gunSoundIndexes[2] = SE_GUN_2;
	this.gunSoundIndexes[3] = SE_GUN_3;
	this.gunSoundIndexes[4] = SE_GUN_4;
	this.gunSoundIndexes[5] = SE_GUN_5;
	this.gunSoundIndexes[6] = SE_GUN_6;
	this.gunSoundIndexes[7] = SE_GUN_7_1;
	this.gunSoundIndexes[8] = SE_GUN_7_2;
	
	this.pause_Spines[2] = this.L_hand;
	this.pause_Spines[3] = this.R_hand;
	
	this.viewContainer.addChild(this.L_hand);
	this.viewContainer.addChild(this.R_hand);
	
	this.L_hand.position.set(iCenterSizeX-350, iCenterSizeY+610);
	this.R_hand.position.set(iCenterSizeX+350, iCenterSizeY+610);

	this.setUserGun(kData.iUserOwnGun);
	
	var self = this;
	// gunAnimation Numbering: 0-idle, 1-attack, 2-out, 3-in, 4-hit
	this.L_hand.state.addListener({
		complete:function(_e) {
            var view = self;
            if(!view.L_hand.visible) return;

            switch(_e.animation.name){
                case "gun_1_out":
                    if(GAME.bShop){
                        view.setUserGun(view.curShowNum);
                        GAME.bChangeGun = false;
                        view.showHand();
                    }
                    break;
                case "gun_1_in":
                case "gun_1_attack":
                case "gun_1_hit":
                    GAME.playSpine(view.L_hand, "gun_1_idle", true);
                    break;
            }
        }
	});

    this.R_hand.state.addListener({
        complete:function(_e) {
        	var view = self;
            if(!view.R_hand.visible) return;

            switch(_e.animation.name){
                case "gun_1_out":
                    if(GAME.bShop){
                        view.setUserGun(view.curShowNum);
                        GAME.bChangeGun = false;
                        view.showHand();
                    }
                    break;
                case "gun_1_in":
                case "gun_1_attack":
                case "gun_1_hit":
                    GAME.playSpine(view.R_hand, "gun_1_idle", true);
                    break;
            }
        }
    });
	
	this.L_hand.visible = false;
	this.R_hand.visible = false;
};

GAME.view.prototype.fire = function(direction){
	if(direction === 0){//left
		GAME.playSpine(this.L_hand, "gun_1_attack"/*, false, 1*/);
		if(!GAME.bShop){
			switch(kData.iUserOwnGun){
			default:
				SESoundPlay(this.gunSoundIndexes[kData.iUserOwnGun]);
			break;
			case 7:
				SESoundPlay(this.gunSoundIndexes[8]);	
			break;
			}
		} else {
			switch(this.curShowNum){
			default:
				SESoundPlay(this.gunSoundIndexes[this.curShowNum]);	
			break;
			case 7:
				SESoundPlay(this.gunSoundIndexes[8]);	
			break;
			}
		}	
	} else {//right
		GAME.playSpine(this.R_hand, "gun_1_attack"/*, false, 1*/);
		if(!GAME.bShop){
			switch(kData.iUserOwnGun){
			default:
				SESoundPlay(this.gunSoundIndexes[kData.iUserOwnGun]);
			break;
			case 7:
				SESoundPlay(this.gunSoundIndexes[7]);	
			break;
			}
		} else {
			switch(this.curShowNum){
			default:
				SESoundPlay(this.gunSoundIndexes[this.curShowNum]);	
			break;
			case 7:
				SESoundPlay(this.gunSoundIndexes[7]);	
			break;
			}
		}	
	}
};

GAME.view.prototype.outHand = function(){
	GAME.playSpine(this.L_hand, "gun_1_out"/*, false, 2*/);
	GAME.playSpine(this.R_hand, "gun_1_out"/*, false, 2*/);
};

GAME.view.prototype.showHand = function(){
	GAME.playSpine(this.L_hand, "gun_1_in"/*, false, 3*/);
	GAME.playSpine(this.R_hand, "gun_1_in", false, 0, false, 0.8);
};

GAME.view.prototype.titleInit = function(){
	this.title_title = new PIXI.spine.Spine(spines.title);
	this.title_title.interactive = true;
	this.viewContainer.addChild(this.title_title);
    this.title_title.position.set(GAME.iCenterSizeX, GAME.iCenterSizeY);
	this.best_title = SpriteLoad(this.title_title, "title_floor.png", 0, 0);
	this.txtBest_title = FontLoad(this.best_title, GAME.table_language["etc01"][GAME.language]+" "+kData.iBestFloor.toString()+"F", 0, 30
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});
	this.txtBest_title.rotation = -5 * (Math.PI / 180);

	this.start_title = new GUMA.button(this.title_title, "title_start_btn.png", 25, 200);
	//this.shop_title = new GUMA.button(this.title_title, "title_gunshop_btn.png", 25, 350);
    this.skip_title = new GUMA.button(this.title_title, "title_floor_btn.png", 25, 350);
	this.skip_title.sprite.visible = false;

	if(kData.iBestFloor>10){
		this.skip_title.sprite.visible = true;
		//this.shop_title.position.y = 500;
	}
	
	this.sound_title = new GUMA.button(this.title_title, "title_sound_btn.png", 300, 550);
	this.sound_title.setOriginScale(0.7, 0.7);
	
	//this.alert_title = SpriteLoad(this.shop_title.sprite, "new_icon.png", 150, -50);
	//this.alert_title.scale.set(0.8, 0.8);
	
	this.soundOn_title = SpriteLoad(this.sound_title.sprite, "title_sound_on.png", 0, 0);
	this.soundOff_title = SpriteLoad(this.sound_title.sprite, "title_sound_off.png", 0, 0);
	this.soundOn_title.visible = false;
	this.soundOff_title.visible = false;

	//this.txt_copyright = FontLoad(this.title_title, "Copyright Ⓒ 2017 Game Corp. All rights reserved", 0, 620
	//	, {fontFamily:"Arial", fontSize:"20px", fill:"#ffffff", stroke:"#000000", strokeThickness:3, wordWrap:true, wordWrapWidth:iMaxSizeX});

    // if(yahooIN===undefined) this.txt_copyright.text = "Copyright Ⓒ 2017 Game Corp. All rights reserved";//yahoo 대응.
    // else this.txt_copyright.text = "(C) RECOM Co.,Ltd. 2017 All Rights Reserved.";//yahoo 대응.
    /*if(document.location.href.indexOf("movigame.com") > 0){
        this.txt_copyright.text = "Copyright Ⓒ 2017 Game Corp. All rights reserved";
    }else{
        this.txt_copyright.text = "(C) RECOM Co.,Ltd. 2017 All Rights Reserved.";
    }*/

	
	var self = this;
	
	this.start_title.setCallback(function(){
        if(yahooIN!==undefined) {
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

		var view = self;
        SESoundPlay(SE_BUTTON);
		view.setUserGun(kData.iUserOwnGun);
		GAME.setGunBuff(kData.iUserOwnGun);
		view.heart.initHeart();
		view.heart.showHeart();
		view.hideTitle();
		GAME.engineInst.state = GAME.state.STATE_GAME;
		view.conElevator();
		view.pause_btnPause.sprite.visible = true;
        //view.btn_showRank.sprite.visible = true;
		BGMSoundStop();
		SESoundPlay(SE_SPEEDUP);
	});
	
	/*this.shop_title.setCallback(function(){
	    if(yahooIN!==undefined) {
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

		var view = self;
        SESoundPlay(SE_BUTTON);
        view.hideTitle();
		view.showShop();
		view.setUserGun(kData.iUserOwnGun);
	});*/

	this.skip_title.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        GAME.setGunBuff(kData.iUserOwnGun);
		self.showSelectPop();
	});

    /**
     * sprJPSound
     * */
	this.sound_title.setCallback(function(){
	    var view = self;
        SESoundPlay(SE_BUTTON);
        console.log("sound_title");

        if(kData.bSoundBGM){
            BGMSoundStop();
            kData.bSoundBGM = false;
            kData.bSoundSE = false;
            view.soundOn_title.visible = false;
            view.soundOff_title.visible = true;
        } else {
            kData.bSoundBGM = true;
            kData.bSoundSE = true;
            BGMSoundPlay(0, true);
            view.soundOn_title.visible = true;
            view.soundOff_title.visible = false;
        }

        SaveDataInClient();
	});
    /**
     * sprJPSound
     * */

	this.version = FontLoad(this.title_title, str_version, 710/2, 1261/2, { fontFamily:'Arial', fontSize:"15px", fill: '#A0A0FF' }, 1, 0.5);

    var sprGrade = SpriteLoad(this.title_title, "img/grade_all.png", 285, -585);
	//const sprViolence = SpriteLoad(this.title_title, "img/grade_violence.png", 195, -585);
	sprGrade.scale.set(0.6);
    //sprViolence.scale.set(0.6);

    sprGrade.visible = (yahooIN===undefined);
    //sprViolence.visible = (yahooIN===undefined);

	// this.hideTitle();
    this.title_title.visible = false;
};

GAME.view.prototype.showTitle = function(){
	BGMSoundPlay(BGM_BG, true);
	GAME.playSpine(this.title_title, "title_ani_in");

	if(kData.iBestFloor>10){
		this.skip_title.sprite.visible = true;
		//this.shop_title.position.y = 500;
	}

	// if(kData.bSoundSE){
     //    this.sound_title.texture = PIXI.Texture.fromFrame("title_sound_on.png");
	// } else {
     //    this.sound_title.texture = PIXI.Texture.fromFrame("title_sound_off.png");
	// }
	this.txtBest_title.text = GAME.table_language["etc01"][GAME.language]+" "+kData.iBestFloor.toString()+"F";

	if(kData.bSoundBGM){
	    this.soundOn_title.visible = true;
	    this.soundOff_title.visible = false;
    } else {
        this.soundOn_title.visible = false;
        this.soundOff_title.visible = true;
    }

	//this.checkAlert(this.alert_title);

	if(yahooIN===undefined){
        kMGMenu.HideYahooIcon();
        console.log("hideyahooicon");
    } else {
	    kMGMenu.ShowYahooIcon();
	    console.log("showyahooicon");
    }
};

GAME.view.prototype.checkAlert = function(alertSprite){
	var i = 0;
	var length = this.gunData.length;
	for(i=0;i<length;++i){
		if(this.buyRecords[i] === undefined || this.buyRecords[i] === null){//안 산건데~~
			if(kData.iBestFloor < this.gunData[i].floor) break;
			if(kData.iUserOwnGold >= this.gunData[i].price
					&& kData.iBestFloor >= this.gunData[i].floor){
				alertSprite.visible = true;
				return;
			}
		}
	}
	alertSprite.visible = false;
};

GAME.view.prototype.hideTitle = function(){
	this.title_title.visible = false;
	if(yahooIN!==undefined)kMGMenu.HideYahooIcon();
};

GAME.view.prototype.gameOverInit = function(){
	var self = this;
	this.msg_over = new PIXI.spine.Spine(spines.txtGameOver);
	this.bloodAnim_over = new PIXI.spine.Spine(spines.bloodEffect);
	this.msgSpeed_over = new PIXI.spine.Spine(spines.txtSpeedUp);

	this.msgSpeed_over.state.addListener({
        complete:function (_entry) {
            switch(_entry.animation.name){
                case "text_speedup":
                    // if(!GAME.bGetAll){
                    //     if(GAME.stageFloor === GAME.data_getNextGun.floor){//새로운 총 해금
                    //         console.log("gun_unlock");
                    //         SpinePlay_1(self.spine_gunUnlock, "gun_unlock_ani_in");
                    //         checkNextGunSlot();
                    //     } else {
                    //         setTimeout(function () {
                    //             SpinePlay_1(self.elevator, "elevator_up_end");
                    //         }, 500);
                    //     }//default//unlock
                    // } else {
                    //     setTimeout(function () {
                    //         SpinePlay_1(self.elevator, "elevator_up_end");
                    //     }, 500);
                    // }//default
                    setTimeout(function () {
                        SpinePlay_1(self.elevator, "elevator_up_end");
                    }, 500);

                    // if(!GAME.bGetAll){
                    //     if(true){//새로운 총 해금
                    //         console.log("gun_unlock");
                    //         SpinePlay_1(self.spine_gunUnlock, "gun_unlock_ani_in");
                    //         checkNextGunSlot();
                    //     } else {
                    //         setTimeout(function () {
                    //             SpinePlay_1(self.elevator, "elevator_up_end");
                    //         }, 500);
                    //     }//default//unlock
                    // } else {
                    //     setTimeout(function () {
                    //         SpinePlay_1(self.elevator, "elevator_up_end");
                    //     }, 500);
                    // }//test
                    // break;
            }
        }
    });
	
	this.viewContainer.addChild(this.bloodAnim_over);
	this.viewContainer.addChild(this.msg_over);
	this.viewContainer.addChild(this.msgSpeed_over);

    this.bloodAnim_over.state.addListener({
        complete:function(){
			if(GAME.cur_life !== 0) self.bloodAnim_over.visible = false;
        }
    });

	this.msg_over.state.addListener({
		complete:function(){
            var view = self;

			if(GAME.stageFloor>10&&view.cont_Count===0&&!view.bSelfOver){
                // networkManager.ForcedSaveData(true, function () {
                //     GAME.view.showContPop();
                // });
                // networkManager.SaveRaking();
                GAME.view.showContPop();
			}else{
				var showOverPop = view.showOverPop.bind(view);
				setTimeout(showOverPop, 800);
			}
		}
	});
	
	this.msg_over.position.set(GAME.iCenterSizeX, GAME.iCenterSizeY);
	this.bloodAnim_over.position.set(GAME.iCenterSizeX, GAME.iCenterSizeY);
	this.msgSpeed_over.position.set(GAME.iCenterSizeX, GAME.iCenterSizeY);
	
	this.msg_over.visible = false;
	this.bloodAnim_over.visible = false;
	this.msgSpeed_over.visible = false;
};
var gameResultMoney = 0;
GAME.view.prototype.gameOver = function(blood){
    //this.btn_showRank.sprite.visible = false;
	this.pause_btnPause.sprite.visible = false;

	if(blood === "blood"){
	    console.log("hit");
		GAME.playSpine(this.bloodAnim_over, "elevator_dead");
		GAME.playSpine(this.L_hand, "gun_1_hit"/*, false, 4*/);
		GAME.playSpine(this.R_hand, "gun_1_hit"/*, false, 4*/);
	}

    kData.iClimbFloor = GAME.stageFloor;
    if(GAME.stageFloor>kData.iBestFloor) kData.iBestFloor = GAME.stageFloor;

    var lvData = undefined;
    var levelData = GAME.engineInst.stageManager.levelData;
    var remains = GAME.stageFloor%5;
    var tempStageLevel = 0;

    this.newBestSpine_over.skeleton.setToSetupPose();

    /**
     * 올라간 층에 대한 보상금 계산
     * */
    if(GAME.stageFloor<=125){//테이블로 표현된 최대 층 수 : 125
        if(remains!==0){
            tempStageLevel = ((GAME.stageFloor/5)|0);
            if(tempStageLevel>24) lvData = levelData[levelData.length-1];
            else{
                for(i=0;i<levelData.length;++i){
                    if(i===tempStageLevel){
                        lvData = levelData[i];
                        break;
                    }
                }
            }

            GAME.accStageGold = lvData.gold + (lvData.add*(remains-1));
        }else{//5, 10층 등 각 레벨 끝 층..
            tempStageLevel = ((GAME.stageFloor/5)|0)-1;
            if(tempStageLevel>24) lvData = levelData[levelData.length-1];
            else{
                for(i=0;i<levelData.length;++i){
                    if(i===tempStageLevel){
                        lvData = levelData[i];
                        break;
                    }
                }
            }

            GAME.accStageGold = lvData.gold + (lvData.add*4);
        }
    }else{
        lvData = levelData[levelData.length-1];
        GAME.accStageGold = (lvData.gold + (lvData.add*4)) + ((GAME.stageFloor-125)*lvData.add);
    }

    var plusGold = Math.ceil(GAME.accStageGold*GAME.getMoneyBuff_pct);
    // var reward = Math.round((GAME.accStageGold + (GAME.accStageGold*GAME.getMoneyBuff_pct)));
    gameResultMoney = GAME.accStageGold+plusGold;
    // kData.iUserOwnGold += GAME.accStageGold+plusGold;
    /**
     * 올라간 층에 대한 보상금 계산 end
     * */
    networkManager.ForcedSaveData(true);

    GAME.playSpine(this.msg_over, "game_over");
	SESoundPlay(SE_GAMEOVER);

	this.engine.state = GAME.state.STATE_OVER;
	this.engine.gameState = GAME.gameState.STATE_NONE;

	// networkManager.SaveData();//게임 오버 때 서버에 정보 저장
    // networkManager.ForcedSaveData(true);
};

GAME.view.prototype.hideGameOver = function(){
	this.msg_over.visible = false;
	this.bloodAnim_over.visible = false;
};

GAME.view.prototype.elevatorInit = function(){
	var self = this;
	this.graphic_black = new PIXI.Graphics();
	this.viewContainer.addChild(this.graphic_black);
	this.graphic_black.beginFill(0x000000, 35/255);
	this.graphic_black.drawRect(0, 0, iMaxSizeX, iMaxSizeY);
	this.graphic_black.endFill();
	this.graphic_black.visible = false;

	this.spr_red = SpriteLoad(this.viewContainer, "back_red_light_2.png", iCenterSizeX, iCenterSizeY);
	this.spr_red.scale.set(4, 4);
	TweenMax.fromTo(this.spr_red, 0.5, {alpha:140/255}, {alpha:74/255, repeat:-1, yoyo:true});
	this.spr_red.visible = false;
	this.spr_black = SpriteLoad(this.viewContainer, "back_black_light.png", iCenterSizeX, iCenterSizeY);
	this.spr_black.scale.set(4, 4);
	this.spr_black.visible = false;
	
	this.spine_line = new PIXI.spine.Spine(spines.line);
	this.viewContainer.addChild(this.spine_line);
	this.spine_line.position.set(180, 130);
	GAME.playSpine(this.spine_line, "back_eff_type_1_electric", true, 0);
	this.spine_line.visible = false;

	this.arr_stageEffects = [];
	this.arr_stageEffects[0] = this.spine_line;
	this.arr_stageEffects[1] = this.spr_red;
	this.arr_stageEffects[2] = this.spr_black;

	this.elevator = new PIXI.spine.Spine(spines.elevator);
	this.viewContainer.addChild(this.elevator);
	this.elevator.position.set(iCenterSizeX, iCenterSizeY);
	this.elevator_bitTxt = createBitmapFont("65px NumFont", "0000", {x:iCenterSizeX-350, y:-600}, "center");//엘리베이터 상단의 녹색 비트맵 폰트
	this.elevator.addChild(this.elevator_bitTxt);
	this.elevator_bitTxt.visible = false;

	this.moveFloor_bitTxt = createBitmapFont("80px FloorFont", "00000", {x:iCenterSizeX, y:iCenterSizeY}, "center");//엘리베이터 올라갈 때 나오는 비트맵 폰트
	this.viewContainer.addChild(this.moveFloor_bitTxt);
	this.moveFloor_bitTxt.visible = false;
	
	this.pause_Spines[4] = this.elevator;

	//animation track set~
	this.elevator.state.addListener({
		complete:function(entry){
			var view = self;
			// switch(entry.trackIndex){
			// 	case 0://open
             //        view.engine.gameState = GAME.gameState.STATE_PLAY;
			// 		break;
             //    case 1://close
             //        view.upstair();
             //        break;
             //    case 2://upstair
             //        view.redSiren();
             //        break;
			// }
            switch(entry.animation.name){
                case "elevator_door_open":
                    view.engine.gameState = GAME.gameState.STATE_PLAY;
                    break;
                case "elevator_door_close":
                    view.upstair();
                    break;
                case "elevator_up_start":
                    // console.log("elevator_idle");
                    GAME.playSpine(view.elevator, "elevator_up_idle", true, 0, false);
                    view.moveFloor_bitTxt.text = GAME.stageFloor.toString()+"f";
                    view.moveFloor_bitTxt.visible = true;
                    TweenLite.fromTo(view.moveFloor_bitTxt, 0.5, {x:iCenterSizeX, y:iCenterSizeY-640}, {x:iCenterSizeX, y:iCenterSizeY, ease:Elastic.easeOut
                        , onComplete:function(){
                            setTimeout(function(){
                                var view = self;
                                TweenLite.to(view.moveFloor_bitTxt, 0.1, {x:iCenterSizeX, y:iCenterSizeY+640, ease:Power0.easeNone, onComplete:function(){
                                    view.moveFloor_bitTxt.visible = false;

                                    // if(GAME.stageFloor % 5 === 1 && GAME.stageFloor > 5){//default
                                    //     GAME.playSpine(view.msgSpeed_over, "text_speedup");
                                    //     SESoundPlay(SE_SPEEDUP);
                                    // } else {
                                    //     setTimeout(function () {
                                    //         SpinePlay_1(view.elevator, "elevator_up_end");
                                    //     }, 500);
                                    // }//default

                                    // if(true){//test
                                    //     GAME.playSpine(view.msgSpeed_over, "text_speedup");
                                    //     SESoundPlay(SE_SPEEDUP);
                                    // } else {
                                    //     setTimeout(function () {
                                    //         SpinePlay_1(view.elevator, "elevator_up_end");
                                    //     }, 500);
                                    // }//test
                                    if(!GAME.bGetAll){
                                        if(GAME.stageFloor === GAME.data_getNextGun.floor){//새로운 총 해금
                                            console.log("gun_unlock");
                                            SpinePlay_1(self.spine_gunUnlock, "gun_unlock_ani_in");
                                            checkNextGunSlot();
                                        } else {
                                            if(GAME.stageFloor % 5 === 1 && GAME.stageFloor > 5){//default
                                                GAME.playSpine(view.msgSpeed_over, "text_speedup");
                                                SESoundPlay(SE_SPEEDUP);
                                            } else {
                                                setTimeout(function () {
                                                    SpinePlay_1(view.elevator, "elevator_up_end");
                                                }, 500);
                                            }//default
                                        }//default//unlock
                                    } else {
                                        setTimeout(function () {
                                            SpinePlay_1(view.elevator, "elevator_up_end");
                                        }, 500);
                                    }
                                }});
                            }, 300);
                        }});
                    break;
                case "elevator_up_end":
                    view.redSiren();
                    // SESoundStop(SE_ELEVATOR_MOVE)
                    break;
            }
		},

        event:function (entry, event) {
			var name = event.data.name;
            if(name === "closeup"){
                self.elevator_bitTxt.visible = true;
                self.elevator_bitTxt.text = GAME.stageFloor.toString() + "F";
            } else if(name === "door_open"){
                SESoundPlay(SE_ELEVATOR_OPEN);
            } else if(name === "door_close"){
                SESoundPlay(SE_ELEVATOR_CLOSE);
            } else if(name === "arrive"){
                SESoundPlay(SE_ELEVATOR_ARRIVE);
            }
        }
	});


};

GAME.view.prototype.initUnlockSpine = function () {
    var self = this;
    this.spine_gunUnlock = new PIXI.spine.Spine(spines.gunUnlock);
    this.viewContainer.addChild(this.spine_gunUnlock);
    this.spine_gunUnlock.position.set(iCenterSizeX, iCenterSizeY);

    this.spine_gunUnlock.state.addListener({
        complete:function (_entry) {
            switch(_entry.animation.name){
                case "gun_unlock_ani_in":
                    console.log("unlock_in");
                    SpinePlay_1(self.spine_gunUnlock, "gun_lock_ani_idle", 0, true);
                    setTimeout(function () {
                        console.log("unlock_timeout");
                        SpinePlay_1(self.spine_gunUnlock, "gun_unlock_ani_out");
                    }, 1000);
                    break;
                case "gun_unlock_ani_out":
                    if(GAME.stageFloor % 5 === 1 && GAME.stageFloor > 5){//default
                        GAME.playSpine(self.msgSpeed_over, "text_speedup");
                        SESoundPlay(SE_SPEEDUP);
                    } else {
                        SpinePlay_1(self.elevator, "elevator_up_end");
                    }
                    break;
            }
        }
    });

    this.spr_gun = SpriteLoad(this.spine_gunUnlock.children[this.spine_gunUnlock.skeleton.findSlotIndex("gun_shop_slot")], "gun_shop_slot_1.png", 0, 0);
    this.spr_gun.rotation = 3.14;
    this.spr_gun.scale.set(-0.8, 0.8);
    this.spr_gun.position.y = 10;

    this.txt_unlock_name = FontLoad(this.spine_gunUnlock.children[this.spine_gunUnlock.skeleton.findSlotIndex("text_gun_name")], "name", 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"65px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});
    this.txt_unlock_name.scale.x = -1;
    this.txt_unlock_name.rotation = 3.14;

    this.txt_buff_single = FontLoad(this.spine_gunUnlock.children[this.spine_gunUnlock.skeleton.findSlotIndex("text_gun_option_single")], "name", 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});
    this.txt_buff_0 = FontLoad(this.spine_gunUnlock.children[this.spine_gunUnlock.skeleton.findSlotIndex("text_gun_option_double_1")], "name", 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});
    this.txt_buff_1 = FontLoad(this.spine_gunUnlock.children[this.spine_gunUnlock.skeleton.findSlotIndex("text_gun_option_double_2")], "name", 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});

    this.txt_desc = FontLoad(this.spine_gunUnlock.children[this.spine_gunUnlock.skeleton.findSlotIndex("text_info")], GAME.table_language["newgun"][GAME.language], 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});

    this.txt_buff_single.scale.x = -1;
    this.txt_buff_single.rotation = 3.14;
    this.txt_buff_single.position.y = 20;
    this.txt_buff_0.scale.x = -1;
    this.txt_buff_0.rotation = 3.14;
    this.txt_buff_0.position.y = 10;
    this.txt_buff_1.scale.x = -1;
    this.txt_buff_1.rotation = 3.14;
    this.txt_buff_1.position.y = 5;

    this.txt_desc.scale.x = -1;
    this.txt_desc.rotation = 3.14;

    this.pause_Spines.push(this.spine_gunUnlock);
};

GAME.view.prototype.hideElevator = function(){
	this.elevator.visible = false;
};

GAME.view.prototype.conElevator = function(){
	if(this.engine.state !== GAME.state.STATE_GAME) return;
	
	var self = this;
	if(kData.bFirstPlay){
		//to do : tutorial
		var view = self;
		this.showHand();
		GAME.playSpine(view.elevator, "elevator_door_open", false, 0, false, 1.2);

		this.showTutorial();
	} else {
		this.redSiren();
	}
};

GAME.view.prototype.showMapEffect = function(max_number){
	for(i=0;i<3;++i){
		this.arr_stageEffects[i].visible = false;
	}
	this.graphic_black.visible = false;

	if(Math.random()<=0.4){//맵효과가 나올 확률 40%
		switch(GAME.iPrevMapEff = randRangeFromInt(0, max_number)){//randRangeFromInt(0, max_number)
			case 0://깜박이는 복도...
			this.arr_stageEffects[0].visible = true;
			// this.arr_stageEffects[randRangeFromInt(0, max_number)].visible = true;
			break;
			case 1://붉은 복도...
			this.graphic_black.visible = true;
			this.graphic_black.alpha = 85/255;
			this.arr_stageEffects[0].visible = true;
			this.arr_stageEffects[1].visible = true;
			break;
			case 2://어두운 복도...
			this.graphic_black.visible = true;
			this.graphic_black.alpha = 35/255;
			this.arr_stageEffects[0].visible = true;
			this.arr_stageEffects[2].visible = true;
			break;
		}
		GAME.bPrevMapEff = true;
		// console.log("iPrevMapEff:"+GAME.iPrevMapEff);
	}
};

GAME.view.prototype.setPrevMapEffect = function(mapEffectNum){//이전 맵 효과 세팅 함수...
    for(i=0;i<3;++i){
        this.arr_stageEffects[i].visible = false;
    }
    this.graphic_black.visible = false;

    switch(mapEffectNum){
        case 0://깜박이는 복도...
            this.arr_stageEffects[0].visible = true;
            // this.arr_stageEffects[randRangeFromInt(0, max_number)].visible = true;
            break;
        case 1://붉은 복도...
            this.graphic_black.visible = true;
            this.graphic_black.alpha = 85/255;
            this.arr_stageEffects[0].visible = true;
            this.arr_stageEffects[1].visible = true;
            break;
        case 2://어두운 복도...
            this.graphic_black.visible = true;
            this.graphic_black.alpha = 35/255;
            this.arr_stageEffects[0].visible = true;
            this.arr_stageEffects[2].visible = true;
            break;
    }
};

GAME.view.prototype.redSiren = function(){//game start trigger
	var self = this;
	this.elevator_bitTxt.visible = false;
	GAME.playSpine(this.sirenRed, "elevator_siren_red", true);
	SESoundPlay(SE_SIREN_RED);
	this.heart.showHeart();
	this.showHand();

	if(GAME.bPrevMapEff&&GAME.bContinue){
        this.setPrevMapEffect(GAME.iPrevMapEff);
        GAME.bPrevMapEff = false;
        GAME.bContinue = false;
    }else{
        if(GAME.stageFloor>5 && GAME.stageFloor<11)
            this.showMapEffect(0);
        else if(GAME.stageFloor>10 && GAME.stageFloor<16)
            this.showMapEffect(1);
        else if(GAME.stageFloor>15)
            this.showMapEffect(2);
    }


	this.elevator.state.clearTracks();

	setTimeout(function(){
		var view = self;
		view.sirenRed.visible = false;
		GAME.playSpine(view.elevator, "elevator_door_open", false, 0, false, 1.2);
	}, 1000);
};

GAME.view.prototype.blueSiren = function(){//stage end trigger
    // console.log("blue siren");
	var self = this;
	this.engine.gameState = GAME.gameState.STATE_UPSTAIR;
	GAME.playSpine(this.sirenBlue, "elevator_siren_blue");
	SESoundPlay(SE_SIREN_BLUE);
	++GAME.stageFloor;

    if(!GAME.bGetAll){
        if(GAME.stageFloor === GAME.data_getNextGun.floor){
            kData.arrBuyRecords[GAME.iNextGetGunNum] = true;
            setUnlockGunData();
            // checkNextGunSlot();
        }//default//unlock
    }//default

    // if(!GAME.bGetAll){
    //     if(true){
    //         kData.arrBuyRecords[GAME.iNextGetGunNum] = true;
    //         setUnlockGunData();
    //         // checkNextGunSlot();
    //     }//default//unlock
    // }//test

	if(GAME.stageFloor % 5 === 1 && GAME.stageFloor > 5)
		++GAME.stageLevel;

	setTimeout(function(){
		GAME.playSpine(self.elevator, "elevator_door_close", false, 0, false/*, 1.2*/);//elevator_door_close
	}, 1500);
};

GAME.view.prototype.upstair = function(){
    // console.log("upstair");
	var self = this;
	GAME.playSpine(this.elevator, "elevator_up_start", false, 0, false/*, 2.5*/);//default

	// this.moveFloor_bitTxt.text = GAME.stageFloor.toString()+"f";
	// this.moveFloor_bitTxt.visible = true;
	// TweenLite.fromTo(this.moveFloor_bitTxt, 0.5, {x:iCenterSizeX, y:iCenterSizeY-640}, {x:iCenterSizeX, y:iCenterSizeY, ease:Elastic.easeOut
	// 	, onComplete:function(){
	// 		setTimeout(function(){
	// 			var view = self;
	// 			TweenLite.to(view.moveFloor_bitTxt, 0.1, {x:iCenterSizeX, y:iCenterSizeY+640, ease:Power0.easeNone, onComplete:function(){
	// 				view.moveFloor_bitTxt.visible = false;
	// 				if(GAME.stageFloor % 5 === 1 && GAME.stageFloor > 5){
	// 					GAME.playSpine(view.msgSpeed_over, "text_speedup");
	// 					SESoundPlay(SE_SPEEDUP);
	// 				}
    //
     //                // GAME.iNextGetGunNum = GAME.stageFloor;//test
     //                // if(GAME.stageFloor === GAME.iNextGetGunNum){//새로운 총 해금
     //                //     SpinePlay_1(view.spine_gunUnlock, "gun_unlock_ani_in");
     //                // }
	// 			}});
	// 		}, 300);
	// 	}});
	SESoundPlay(SE_ELEVATOR_MOVE);

	this.outHand();
	this.engine.stageManager.createStage();
};

GAME.view.prototype.sirenInit = function(){
	this.sirenBlue = new PIXI.spine.Spine(spines.blueSiren);
	this.sirenRed = new PIXI.spine.Spine(spines.redSiren);
	
	this.pause_Spines[0] = this.sirenBlue;
	this.pause_Spines[1] = this.sirenRed;
	
	this.viewContainer.addChild(this.sirenBlue);
	this.viewContainer.addChild(this.sirenRed);

	var self = this;

	this.sirenBlue.state.addListener({
		complete:function(){
            self.elevator_bitTxt.visible = false;
		}
	});
	
	this.sirenBlue.visible = false;
	this.sirenRed.visible = false;
};

GAME.view.prototype.gameOverPopInit = function(){
	this.popBG_over = SpriteLoad(this.viewContainer, "popup_ui_3.png", iCenterSizeX, iCenterSizeY);
	this.txtTitle_over = FontLoad(this.popBG_over, GAME.table_language["popup02"][GAME.language], 0, -350
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"}, 0.5, 0.5, 500);
	this.floorBG_over = SpriteLoad(this.popBG_over, "game_over_popup_slot_1.png", 95.5, -130);
	this.floorTitle_over = SpriteLoad(this.floorBG_over, "game_over_floor.png", -210, 0, 0, 0.5);
	this.txtUserFloor_over = FontLoad(this.floorBG_over, "0F", 195, 2
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"}, 1, 0.5);
	this.bestBG_over = SpriteLoad(this.popBG_over, "game_over_popup_slot_2.png", 110, 15);
	this.bestTitle_over = SpriteLoad(this.bestBG_over, "game_over_best.png", -200, 0, 0, 0.5);
	this.txtUserBest_over = FontLoad(this.bestBG_over, "0F", 180, 0
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"}, 1, 0.5);
	this.rewardBG_over = SpriteLoad(this.popBG_over, "game_over_popup_slot_2.png", 110, 120);
	this.rewardTitle_over = SpriteLoad(this.rewardBG_over, "game_over_reward.png", -200, 0, 0, 0.5);
	this.txtUserReward_over = FontLoad(this.rewardBG_over, "$0", 180, 0
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"}, 1, 0.5);

	// var self = this;

	var engine = this.engine;
	this.replay_over = new GUMA.button(this.popBG_over, "1f_btn.png", 60, 275);
    this.replay_over.setOriginScale(0.73);
	this.replay_over.setCallback(engine.replay, engine);

	this.goTitle_over = new GUMA.button(this.popBG_over, "home_btn.png", 220, 275);
	this.goTitle_over.setOriginScale(0.73);
	this.goTitle_over.setCallback(engine.goTitle, engine);

	this.alert_over = SpriteLoad(this.goTitle_over.sprite, "new_icon.png", 70, -70);
	
	this.tower_over = SpriteLoad(this.popBG_over, "popup_tower.png", -230, 37);
	this.bestFloor_over = SpriteLoad(this.tower_over, "tower_best_floor_ui.png", 0, -100);
	this.curFloor_over = SpriteLoad(this.tower_over, "tower_now_floor_ui.png", 0, -230);

	this.txtBestFloor_over = FontLoad(this.bestFloor_over, GAME.table_language["etc01"][GAME.language]+"\n"+kData.iBestFloor.toString()+"F", -20, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"25px", fill:"#0DD4F2", stroke:"#000000", strokeThickness:4, align:"center"}, 1, 0.5);//#0DD4F2
	this.txtCurFloor_over = FontLoad(this.curFloor_over, GAME.stageFloor.toString()+"F", 20, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"30px", fill:"#FFE400", stroke:"#000000", strokeThickness:4}, 0, 0.5);//#FFE400
	this.txt100_over = FontLoad(this.tower_over, "100F", 0, -260
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"25px", fill:"#FF0000", stroke:"#000000", strokeThickness:4});

	this.newBestSpine_over = new PIXI.spine.Spine(spines.newBest);
	this.popBG_over.addChild(this.newBestSpine_over);

	this.newBestSpine_over.state.addListener({
		complete:function(entry){
			switch(entry.animation.name){
				case "animation_in"://in
					setTimeout(function(){
						if(GAME.view.bNewScore) GAME.ui_ranking.checkRanking();
						GAME.playSpine(GAME.view.newBestSpine_over, "animation_out", false, 0);
					}, 1000);
					break;
				case "animation_out"://out
					// console.log("newBest_init");
					// GAME.view.newBestSpine_over.state.clearTracks();
                    if(GAME.bPlusMoney&&GAME.accStageGold!==0) {
                        GAME.view.spr_gunBuff.visible = true;
                        GAME.view.txt_buffGold.visible = true;
                        TweenMax.fromTo(GAME.view.txt_buffGold, 1, {y:0, alpha:1}, {y:-35, alpha:0, onComplete:function () {
                            if(!GAME.view.popBG_over.visible) return;
                            SpinePlay_1(GAME.view.spine_gunBuff, "popup_eff", 0, true);

                            if(loginTF === 1) {
                                GAME.ui_ranking.cb_setRankingPop();
                            } else {
                                if(networkManager.networkState!==NET_STATE.LOCALHOST) {
                                    // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_language["ranking05"][GAME.language], networkManager.JoinMember, null);
                                    kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
                                }
                            }

                            GAME.buttonShield.visible = false;
                        }});
                    } else {
                        GAME.buttonShield.visible = false;
                    }
					break;
			}
		}
	});

	this.btn_elevator = new GUMA.button(this.popBG_over, "elevator_btn.png", -100, 275);
    this.btn_elevator.setOriginScale(0.73);
	this.btn_elevator.setCallback(function () {
        GAME.view.showSelectPop();
    });

    this.spine_gunBuff = new PIXI.spine.Spine(spines.sparkle);
    this.rewardBG_over.addChild(this.spine_gunBuff);

	this.spr_gunBuff = SpriteLoad(this.rewardBG_over, "gun_bonus_icon.png", -200, -20);
	this.txt_buffGold = FontLoad(this.rewardBG_over, "buffGold", 180, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#7cd268", stroke:"#000000", strokeThickness:4, fontWeight:"bold"}, 1, 0.5);
	this.txt_buffGold.visible = false;

	this.popBG_over.visible = false;
};

GAME.view.prototype.showOverPop = function(){
	this.bStopCntFlag = true;
	this.popBG_over.visible = true;
	this.txtUserFloor_over.text = GAME.stageFloor.toString() + "F";
	this.txtUserBest_over.text = kData.iBestFloor.toString() + "F";

	this.spine_gunBuff.visible = false;

	kData.iClimbFloor = GAME.stageFloor;

    var lvData = undefined;
    var levelData = GAME.engineInst.stageManager.levelData;
    var remains = GAME.stageFloor%5;
    var tempStageLevel = 0;

	this.newBestSpine_over.skeleton.setToSetupPose();

	/**
	 * 올라간 층에 대한 보상금 계산
	 * */
	if(GAME.stageFloor<=125){//테이블로 표현된 최대 층 수 : 125
        if(remains!==0){
            tempStageLevel = ((GAME.stageFloor/5)|0);
            if(tempStageLevel>24) lvData = levelData[levelData.length-1];
            else{
                for(i=0;i<levelData.length;++i){
                    if(i===tempStageLevel){
                        lvData = levelData[i];
                        break;
                    }
                }
            }

            GAME.accStageGold = lvData.gold + (lvData.add*(remains-1));
        }else{//5, 10층 등 각 레벨 끝 층..
            tempStageLevel = ((GAME.stageFloor/5)|0)-1;
            if(tempStageLevel>24) lvData = levelData[levelData.length-1];
            else{
                for(i=0;i<levelData.length;++i){
                    if(i===tempStageLevel){
                        lvData = levelData[i];
                        break;
                    }
                }
            }

            GAME.accStageGold = lvData.gold + (lvData.add*4);
        }
    }else{
	    lvData = levelData[levelData.length-1];
        GAME.accStageGold = (lvData.gold + (lvData.add*4)) + ((GAME.stageFloor-125)*lvData.add);
    }

    var plusGold = Math.ceil(GAME.accStageGold*GAME.getMoneyBuff_pct);
	// var reward = Math.round((GAME.accStageGold + (GAME.accStageGold*GAME.getMoneyBuff_pct)));
	// var reward = GAME.accStageGold+plusGold;
	// /**
	//  * 올라간 층에 대한 보상금 계산 end
	//  * */

	this.txtUserReward_over.text = "$" + gameResultMoney.formatMoney(0);

	this.txtUserFloor_over.visible =false;
	this.txtUserBest_over.visible = false;
	this.txtUserReward_over.visible = false;

	// console.log("reward: "+reward);
    kData.iUserOwnGold += gameResultMoney;
    gameResultMoney = 0;
	SaveDataInClient();

	this.checkAlert(this.alert_over);

    this.bNewScore = false;
    if(GAME.stageFloor > kData.iBestFloor){//신기록을 새웠을 때....
        this.bNewScore = true;//신기록 여부 구분...
		kData.iBestFloor = GAME.stageFloor;
		SaveDataInClient();
    }

    GAME.buttonShield.visible = true;
    this.setOverPopEff();

    // if(loginTF === 1) networkManager.SaveRaking();
    // else {
    //     if(networkManager.networkState!==NET_STATE.LOCALHOST)
    //         networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_language["ranking05"][GAME.language], networkManager.JoinMember, null);
    // }

    this.bStopCntFlag = true;
    this.popBG_over.visible = true;
    this.txtUserFloor_over.text = GAME.stageFloor.toString() + "F";
    this.txtUserBest_over.text = kData.iBestFloor.toString() + "F";

    this.txt_buffGold.visible = false;
    this.btn_elevator.sprite.visible = (kData.iBestFloor>10);
    if(GAME.bPlusMoney&&GAME.accStageGold!==0){
        // this.spr_gunBuff.visible = true;
        this.txt_buffGold.text = "+$ "+plusGold.formatMoney(0);
        // TweenMax.fromTo(this.txt_buffGold, 1, {y:0, alpha:1}, {y:-35, alpha:0});
        // SpinePlay_1(this.spine_gunBuff, "popup_eff", 0, true);
    } else {
        this.spr_gunBuff.visible = false;
        // this.txt_buffGold.visible = false;
        this.spine_gunBuff.visible = false;
    }

    if(this.btn_elevator.sprite.visible){
        this.btn_elevator.sprite.position.x = -50;
        this.replay_over.sprite.position.x = 100;
        this.goTitle_over.sprite.position.x = 250;
    } else {
        this.replay_over.sprite.position.x = 30;
        this.goTitle_over.sprite.position.x = 200;
    }

    // networkManager.SaveRaking();
};

GAME.view.prototype.setOverPopEff = function(){//게임 오버 창 연출 함수...
	var destY = 305 - (5.35 * (GAME.stageFloor-1));
	var fakeY = destY;
	var self = this;
	if(destY <=  -230) destY = -230;
	TweenLite.fromTo(this.curFloor_over, 0.5, {y:305}, {y:destY, ease:Power0.easeNon, delay: 0.5});
	TweenLite.fromTo(this.fakeY, 0.5, {y:305}, {y:fakeY, ease:Power0.easeNone, onComplete:function(){
		var view = self;
		if(!view.popBG_over.visible) return;

        view.txtCurFloor_over.text = GAME.stageFloor.toString()+"F";
        view.txtUserFloor_over.visible =true;
        view.txtUserBest_over.visible = true;
        view.txtUserReward_over.visible = true;
        view.bStopCntFlag = false;
        // GAME.buttonShield.visible = false;

        // if(GAME.bPlusMoney&&GAME.accStageGold!==0){
        //     GAME.view.txt_buffGold.visible = true;
        //     TweenMax.fromTo(GAME.view.txt_buffGold, 1, {y:0, alpha:1}, {y:-35, alpha:0, onComplete:function () {
        //         if(!GAME.view.popBG_over.visible) return;
        //         if(loginTF === 1) {
        //             // networkManager.SaveRaking();
        //             GAME.ui_ranking.cb_setRankingPop();
        //         } else {
        //             if(networkManager.networkState!==NET_STATE.LOCALHOST)
        //                 networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_language["ranking05"][GAME.language], networkManager.JoinMember, null);
        //         }
        //     }});
        //     SpinePlay_1(GAME.view.spine_gunBuff, "popup_eff", 0, true);
        // }
        //
        // if(view.bNewScore)
        // 	GAME.playSpine(view.newBestSpine_over, "animation_in", false, 0);

        if(!view.bNewScore){
            if(GAME.bPlusMoney&&GAME.accStageGold!==0) {
                GAME.view.spr_gunBuff.visible = true;
                GAME.view.txt_buffGold.visible = true;
                TweenMax.fromTo(GAME.view.txt_buffGold, 1, {y:0, alpha:1}, {y:-35, alpha:0, onComplete:function () {
                    if(!GAME.view.popBG_over.visible) return;
                    SpinePlay_1(GAME.view.spine_gunBuff, "popup_eff", 0, true);

                    if(loginTF === 1) {
                        GAME.ui_ranking.cb_setRankingPop();
                    } else {
                        if(networkManager.networkState!==NET_STATE.LOCALHOST) {
                            // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_language["ranking05"][GAME.language], networkManager.JoinMember, null);
                            kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
                        }

                    }

                    GAME.buttonShield.visible = false;
                }});
            } else {
                GAME.buttonShield.visible = false;
                if(loginTF === 1) {
                    GAME.ui_ranking.cb_setRankingPop();
                } else {
                    if(networkManager.networkState!==NET_STATE.LOCALHOST){
                        // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_language["ranking05"][GAME.language], networkManager.JoinMember, null);
                        kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
                    }

                }
            }
        } else {
            GAME.playSpine(view.newBestSpine_over, "animation_in", false, 0);
        }
	}, delay: 0.5});

	var floor = kData.iBestFloor;
	if(floor>100) floor = 100;
	this.bestFloor_over.position.y = 294 - (5.35 * floor);
	this.txtBestFloor_over.text = GAME.table_language["etc01"][GAME.language]+"\n"+kData.iBestFloor.toString()+"F";
};

GAME.view.prototype.countFloor = function(){
	var floor = Math.abs(Math.ceil((305-this.fakeY.y) / 5.35));
	if(floor < 1) floor = 1;
	this.txtCurFloor_over.text = floor.toString()+"F";
};

GAME.view.prototype.replay = function(){
	// console.log("replay");
	this.bStopCntFlag = false;
	this.newBestSpine_over.visible = false;
	this.pause_btnPause.sprite.visible = true;
    //this.btn_showRank.sprite.visible = true;
	this.popBG_over.visible = false;

	this.sirenRed.skeleton.setToSetupPose();
	this.sirenRed.state.clearTracks();
	this.sirenBlue.skeleton.setToSetupPose();
	this.sirenBlue.state.clearTracks();
	this.elevator.skeleton.setToSetupPose();
	this.elevator.state.clearTracks();

	this.msg_over.visible = false;
	this.bloodAnim_over.visible = false;

	GAME.engineInst.stageManager.arr_banIndex.length = 0;
	GAME.engineInst.stageManager.banCount = 2;

    for(i=0;i<3;++i){
        this.arr_stageEffects[i].visible = false;
    }
	
	this.heart.initHeart();
	this.elevator.skeleton.setToSetupPose();
	GAME.ui_ranking.bFlag_showAgain = false;//랭크 업 연출 한 번 보기 초기화 flag
};

GAME.view.prototype.shotTarget = function(direction){//shop에서 타겟을 쏘는 함수
	var self = this;
	if(direction === 0){//left
		if(!this.leftTargetFall){
			GAME.playSpine(this.leftTarget_shop, "target_hit", false);
			this.leftTargetFall = true;

			setTimeout(function(){
				self.leftTargetFall = false;
				if(self.leftTarget_shop.visible === false) return;
				GAME.playSpine(self.leftTarget_shop, "target_rise", false);
			}, 500);
		}
	} else {
		if(!this.rightTargetFall){
			GAME.playSpine(this.rightTarget_shop, "target_hit", false);
			this.rightTargetFall = true;
			
			setTimeout(function(){
				self.rightTargetFall = false;
				if(self.rightTarget_shop.visible === false) return;
				GAME.playSpine(self.rightTarget_shop, "target_rise", false);
			}, 500);
		}
	}
};

GAME.view.prototype.tutorialInit = function(){
	if(!kData.bFirstPlay) return;
	var self = this;
	this.mobile_l_hand = SpriteLoad(this.viewContainer, "hand_cursor.png", iCenterSizeX-200, iCenterSizeY+500);
	this.mobile_r_hand = SpriteLoad(this.viewContainer, "hand_cursor.png", iCenterSizeX+200, iCenterSizeY+500);
	this.mobile_l_hand.scale.x = -1;
	this.tuto_title = SpriteLoad(this.viewContainer, "tutorial_how_to_play.png", iCenterSizeX, iCenterSizeY-300);
	this.tuto_leftKey = new PIXI.spine.Spine(spines.tutoKeyboard);
	this.tuto_rightKey = new PIXI.spine.Spine(spines.tutoKeyboard);
	this.tuto_spaceKey = new PIXI.spine.Spine(spines.tutoKeyboard);
	
	this.viewContainer.addChild(this.tuto_leftKey);
	this.viewContainer.addChild(this.tuto_rightKey);
	this.viewContainer.addChild(this.tuto_spaceKey);
	
	this.tuto_leftKey.position.set(iCenterSizeX-200, iCenterSizeY);
	this.tuto_rightKey.position.set(iCenterSizeX+200, iCenterSizeY);
	this.tuto_spaceKey.position.set(iCenterSizeX, iCenterSizeY);
	
	this.hideTutorial();
};

GAME.view.prototype.hideTutorial = function(){
	this.mobile_l_hand.visible = false;
	this.mobile_r_hand.visible = false;
	this.tuto_title.visible = false;
	this.tuto_leftKey.visible = false;
	this.tuto_rightKey.visible = false;
	this.tuto_spaceKey.visible = false;
};

GAME.view.prototype.showTutorial = function(){
	this.tuto_title.visible = true;
	if(GAME.bMobile){
		this.mobile_l_hand.visible = true;
		this.mobile_r_hand.visible = true;
	} else {
		this.tuto_leftKey.visible = true;
		this.tuto_rightKey.visible = true;
		this.tuto_spaceKey.visible = true;
		
		GAME.playSpine(this.tuto_leftKey, "btn_arrow_2_idle");
		GAME.playSpine(this.tuto_rightKey, "btn_arrow_1_idle");
		GAME.playSpine(this.tuto_spaceKey, "btn_space_idle");
	}
};

GAME.view.prototype.shotTuto = function(dir){
	var self = this;
	var stageManager = this.engine.stageManager;
	if(GAME.bMobile){
		switch(dir){
		case 0:
			TweenLite.to(this.mobile_l_hand, 0.5, {scaleY:0.8, onComplete:function(){
				self.fire(dir);
				stageManager.hit(dir);
				TweenLite.to(self.mobile_l_hand, 0.5, {scaleY:1});
			}});
			break;
		case 1:
			TweenLite.to(this.mobile_r_hand, 0.5, {scaleY:0.8,  onComplete:function(){
				self.fire(dir);
				stageManager.hit(dir);
				TweenLite.to(self.mobile_r_hand, 0.5, {scaleY:1});
			}});
			break;
		}
	} else {
		switch(dir){
		case 0:
			GAME.playSpine(this.tuto_leftKey, "btn_arrow_2_click");
			this.tuto_leftKey.state.addListener({
				complete:function(){
					self.tuto_leftKey.state.clearListeners();
					self.fire(dir);
					stageManager.hit(dir);
					GAME.playSpine(self.tuto_leftKey, "btn_arrow_2_idle");
				}
			});
			break;
		case 1:
			GAME.playSpine(this.tuto_rightKey, "btn_arrow_1_click");
            this.tuto_rightKey.state.addListener({
                complete:function(){
                    self.tuto_rightKey.state.clearListeners();
                    self.fire(dir);
                    stageManager.hit(dir);
                    GAME.playSpine(self.tuto_rightKey, "btn_arrow_1_idle");
                }
            });
			break;
		case 2:
			GAME.playSpine(this.tuto_spaceKey, "btn_space_click");
			this.tuto_spaceKey.state.addListener({
				complete:function(){
                    self.tuto_spaceKey.state.clearListeners();
                    GAME.playSpine(self.tuto_spaceKey, "btn_space_idle");

                    self.showPausePop();
                    setTimeout(hidePauseTuto, 1000);

                    function hidePauseTuto(){
                        self.pause_bg.visible = false;
                        self.engine.state = GAME.state.STATE_GAME;
                        self.tl.resume();
                        self.pause_bPopOn = false;
                    }
				}
			});
			break;
		}
	}
};

GAME.view.prototype.detectDevice = function(){
    var filter = "win16|win32|win64|mac";
    this.bMobile = (filter.indexOf(navigator.platform.toLowerCase())<0);
};

GAME.view.prototype.pausePopInit = function(){
	this.pause_bg = SpriteLoad(this.viewContainer, "popup_ui_1.png", iCenterSizeX, iCenterSizeY);
    this.pause_btnSound = new GUMA.button(this.pause_bg, "popup_sound_on_btn.png", -200, 30);
    this.pause_btnResume = new GUMA.button(this.pause_bg, "retry_btn.png", 0, 30);
    this.pause_btnTitle = new GUMA.button(this.pause_bg, "home_btn.png", 200, 30);

	this.pause_texSoundOn = new PIXI.Texture.fromFrame("popup_sound_on_btn.png");
	this.pause_texSoundOff = new PIXI.Texture.fromFrame("popup_sound_off_btn.png");
	
	this.pause_txtTitle = FontLoad(this.pause_bg, GAME.table_language["popup04"][GAME.language], 0, -185
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4}, 0.5, 0.5, 500);
	
	var self = this;
	function getButton(){
		GAME.bGetButton = true;
	}

	this.pause_btnPause = new GUMA.button(this.viewContainer, "pause_btn.png", iCenterSizeX, iCenterSizeY+525);
	this.pause_btnPause.setOriginScale(0.75, 0.75);
	this.pause_btnPause.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		var view = self;
		if(kData.bFirstPlay || view.engine.state === GAME.state.STATE_OVER) return;
        view.pause_bPopOn = !view.pause_bPopOn;
		if(view.pause_bPopOn){
            view.showPausePop();
		} else {
            view.hidePausePop();
		}
	});
	this.pause_btnPause.setDownAction(getButton);

	this.pause_btnResume.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		if(kData.bFirstPlay) return;
		self.hidePausePop();
	});
	this.pause_btnResume.setDownAction(getButton);

	this.pause_btnTitle.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		var view = self;
		if(kData.bFirstPlay) return;
        // view.hidePausePop();
        // view.gameOver("self");
        // view.bPause_out = true;
        // view.bSelfOver = true;
        // GAME.bPauseExit = true;
        view.showExitPop();
	});
	this.pause_btnTitle.setDownAction(getButton);

	this.pause_btnSound.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		if(kData.bFirstPlay) return;
		kData.bSoundBGM = !kData.bSoundBGM;
		kData.bSoundSE = !kData.bSoundSE;
		SaveDataInClient();

		if(kData.bSoundSE){
			self.pause_btnSound.sprite.texture = self.pause_texSoundOn;
		} else {
			self.pause_btnSound.sprite.texture = self.pause_texSoundOff;
		}
	});
	this.pause_btnSound.setDownAction(getButton);
	
	this.pause_bg.visible = false;
	this.pause_btnPause.sprite.visible = false;
	this.bSelfOver = false;//일시정지에서 스스로 게임오버 됐는지 확인하는 변수....
};

GAME.view.prototype.showPausePop = function(){
	this.pause_bg.visible = true;
    this.pause_bPopOn = true;
    this.pauseGame();
};

GAME.view.prototype.pauseGame = function(){
    console.log("pauseGAME");
    this.engine.state = GAME.state.STATE_PAUSE;
    this.tl = TimelineLite.exportRoot();
    this.tl.pause();
    this.pause_btnPause.timeLine.resume();

    var i = 0;
    var length = this.pause_Spines.length;
    for(i=0;i<length;++i){
        this.pause_Spines[i].state.timeScale = 0;
    }

    if(kData.bSoundSE){
        this.pause_btnSound.sprite.texture = this.pause_texSoundOn;
    } else {
        this.pause_btnSound.sprite.texture = this.pause_texSoundOff;
    }
};

GAME.view.prototype.hidePausePop = function(){
	this.pause_bg.visible = false;
    this.pause_bPopOn = false;
    this.resumeGame();
};

GAME.view.prototype.resumeGame = function(){
    console.log("resumeGAME");
    this.engine.state = GAME.state.STATE_GAME;
    this.tl.resume();

    var i = 0;
    var length = this.pause_Spines.length;
    for(i=0;i<length;++i){
        this.pause_Spines[i].state.timeScale = 1;
    }
};

GAME.view.prototype.contPopInit = function(){
	this.cont_bg = SpriteLoad(this.viewContainer, "popup_ui_1.png", iCenterSizeX, iCenterSizeY);
	this.cont_title = FontLoad(this.cont_bg, GAME.table_language["popup01"][GAME.language], 0, -180
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});

	this.cont_btnCont = new GUMA.button(this.cont_bg, "btn_continue.png", -150, 75);//btn_ad:"게임머니로 이어하기"로 변경.
	this.cont_btnClose = new GUMA.button(this.cont_bg, "close_btn.png", 150, 75);

	var self = this;
	this.cont_btnCont.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        var view = self;
		if(kData.iUserOwnGold<view.cont_needGold){
            // networkManager.GetShoplist(ShopType.GAMEMONEY, GAME.ui_shop_gold.cb_ShowPop);
            GAME.ui_shop_gold.cb_ShowPop();
            return;
		}
        GAME.bContinue = true;
        kData.iUserOwnGold -= view.cont_needGold;
		networkManager.ForcedSaveData();

        view.cont_bg.visible = false;
        //set continue Pattern
        GAME.engineInst.stageManager.curPattern = view.engine.stageManager.stagePattern;
        GAME.engineInst.stageManager.curMoveTime = view.engine.stageManager.revisionTime;

        GAME.engineInst.continue();
	});

	this.cont_btnClose.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		self.cont_bg.visible = false;
		self.showOverPop();
	});

	//quality up
	this.spr_userGoldBG = SpriteLoad(this.cont_bg, "gold_ui.png", 0, -70);
	this.spr_goldIcon = SpriteLoad(this.spr_userGoldBG, "gold_icon.png", -210, 0);
	this.btn_showShop = new GUMA.button(this.spr_userGoldBG, "btn_plus.png", 210, 0);

	this.txt_userGold = FontLoad(this.spr_userGoldBG, "userGold", 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});

	this.txt_needGold = FontLoad(this.cont_btnCont.sprite, "needGold", 0, 40
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});

	this.fill_able = "#ffffff";
	this.stroke_able = "#000000";
	this.tint_able = this.btn_showShop.sprite.tint;

	this.cont_needGold = 0;//이어하기 위해 필요한 골드량..

	this.btn_showShop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        // networkManager.GetShoplist(ShopType.GAMEMONEY, GAME.ui_shop_gold.cb_ShowPop);
        GAME.ui_shop_gold.cb_ShowPop();
	});

	this.btn_showShop.setDownAction(function(){
		GAME.bGetButton = true;
	});

	FontLoad(this.cont_bg, GAME.table_language["continue"][GAME.language], 0, 255
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:4}, 0.5, 0.5, 600);
	this.cont_bg.visible = false;
};

GAME.view.prototype.showContPop = function(){
	this.cont_bg.visible = true;
	this.cont_Count = 1;
	if(bInfiniteCont) this.cont_Count = 0;//debug

	//check need Gold//
	//11층에서 15층 까지는 50골드
	//5층 증가할 때마다 25골드 추가
	//101층 위로는 500골드
	if(GAME.stageFloor>=11 && GAME.stageFloor<16){
		this.cont_needGold = 50;
		this.txt_needGold.text = this.cont_needGold.formatMoney(0);
	} else if(GAME.stageFloor>=101){
        this.cont_needGold = 500;
        this.txt_needGold.text = this.cont_needGold.formatMoney(0);
	} else {
		this.cont_needGold = 50 + (Math.floor(((GAME.stageFloor-10)/5)|0)*25);
        this.txt_needGold.text = this.cont_needGold.formatMoney(0);
	}

	//show user Gold//
	this.txt_userGold.text = kData.iUserOwnGold.formatMoney(0);

	//able or disable
	// if(kData.iUserOwnGold<this.cont_needGold){
	// 	this.cont_btnCont.sprite.tint = GAME.tint_btn_disabled;
	// 	this.cont_btnCont.setOriginTint(GAME.tint_btn_disabled);
	// 	this.txt_needGold.style.fill = GAME.fill_txt_disabled;
	// 	this.txt_needGold.style.stroke = GAME.stroke_txt_disabled;
	// }else{
     //    this.cont_btnCont.sprite.tint = this.tint_able;
     //    this.cont_btnCont.setOriginTint(this.tint_able);
     //    this.txt_needGold.style.fill = this.fill_able;
     //    this.txt_needGold.style.stroke = this.stroke_able;
	// }
    this.setContAble();
};

GAME.view.prototype.setContAble = function () {
    if(kData.iUserOwnGold<this.cont_needGold){
        this.cont_btnCont.sprite.tint = GAME.tint_btn_disabled;
        this.cont_btnCont.setOriginTint(GAME.tint_btn_disabled);
        this.txt_needGold.style.fill = GAME.fill_txt_disabled;
        this.txt_needGold.style.stroke = GAME.stroke_txt_disabled;
    }else{
        this.cont_btnCont.sprite.tint = this.tint_able;
        this.cont_btnCont.setOriginTint(this.tint_able);
        this.txt_needGold.style.fill = this.fill_able;
        this.txt_needGold.style.stroke = this.stroke_able;
    }
};

GAME.view.prototype.hideContPop = function(){
	this.cont_bg.visible = false;
};

GAME.view.prototype.selectPopInit = function(){
	var self = this;

	this.select_shield = new PIXI.Graphics();
    this.viewContainer.addChild(this.select_shield);
    this.select_shield.beginFill(0x000000, 0.5);
    this.select_shield.drawRect(0, 0, 720, 1280);
    this.select_shield.endFill();
    this.select_shield.interactive = true;

	this.select_bg = SpriteLoad(this.viewContainer, "popup_ui_2.png", iCenterSizeX, iCenterSizeY);
	this.select_bg.interactive = true;
	/*this.select_txtTitle = */FontLoad(this.select_bg, GAME.table_language["popup03"][GAME.language], 0, -345
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4}, 0.5, 0.5, 500);

	this.select_userGoldBG = SpriteLoad(this.select_bg, "gold_ui.png", 0, -250);
	/*this.select_userGoldIcon = */SpriteLoad(this.select_userGoldBG, "gold_icon.png", -100 ,0);
	this.select_txtUserGold = FontLoad(this.select_userGoldBG, kData.iUserOwnGold.formatMoney(0), 170, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"45px", fill:"#ffffff", stroke:"#000000", strokeThickness:4}, 1, 0.5);

	this.select_btnShowMoneyShop = new GUMA.button(this.select_userGoldBG, "btn_plus.png", 220, 0);
	this.select_btnShowMoneyShop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        // networkManager.GetShoplist(ShopType.GAMEMONEY, GAME.ui_shop_gold.cb_ShowPop);
        GAME.ui_shop_gold.cb_ShowPop();
    });

    this.select_btnShowMoneyShop.setDownAction(function(){
        GAME.bGetButton = true;
    });

	this.select_btnUp = new GUMA.button(this.select_bg, "select_floor_up_btn.png", 170, -80);
	this.select_btnUp.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		self.engine.stageManager.skipStage(GAME.up);
	});

	this.select_btnDown = new GUMA.button(this.select_bg, "select_floor_down_btn.png", 170, 80);
	this.select_btnDown.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		self.engine.stageManager.skipStage(GAME.down);
	});

	this.select_floorBG = SpriteLoad(this.select_bg, "select_floor_slot_1.png", -125, -50);
	this.select_needGoldBG = SpriteLoad(this.select_floorBG, "select_floor_slot_2.png", 0, 180);
	this.select_txtFloor = FontLoad(this.select_floorBG, GAME.stageFloor.toString()+"F", 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"80px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});
	this.select_txtNeedGold = FontLoad(this.select_needGoldBG, "$0", 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});
	
	
	this.select_btnCancel = new GUMA.button(this.select_bg, "select_floor_btn_1.png", -160, 280);
	this.select_txtCancel = FontLoad(this.select_btnCancel.sprite, GAME.table_language["button02"][GAME.language], 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});

	this.select_btnCancel.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		var view = self;
		view.select_shield.visible = false;
        view.select_bg.visible = false;
        view.engine.stageManager.init();
        view.engine.stageManager.createStage();
	});

	this.select_btnSkip = new GUMA.button(this.select_bg, "select_floor_btn_2.png", 160, 280);
	this.select_txtSkip = FontLoad(this.select_btnSkip.sprite, GAME.table_language["button01"][GAME.language], 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});

	this.skipStage = 0;

	this.select_btnSkip.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		if(kData.iUserOwnGold < self.select_needGold){
            // networkManager.GetShoplist(ShopType.GAMEMONEY, GAME.ui_shop_gold.cb_ShowPop);
            GAME.ui_shop_gold.cb_ShowPop();
		    return;
        }

		var view = self;
		if(view.engine.state === GAME.state.STATE_OVER){
			// console.log("skip_hideGameover");
			view.hideGameOver();
			view.popBG_over.visible = false;

			view.sirenRed.skeleton.setToSetupPose();
			view.sirenRed.state.clearTracks();
			view.sirenBlue.skeleton.setToSetupPose();
			view.sirenBlue.state.clearTracks();
			view.elevator.skeleton.setToSetupPose();
			view.elevator.state.clearTracks();
		}

        view.cont_Count = 0;
        view.bSelfOver = false;
        view.bNewScore = false;
		view.setUserGun(kData.iUserOwnGun);
		GAME.setGunBuff(kData.iUserOwnGun);
		view.heart.initHeart();
		view.heart.showHeart();

		view.bSkip = true;
		view.engine.stageManager.createStage();
		view.hideTitle();
		GAME.engineInst.state = GAME.state.STATE_GAME;
		view.conElevator();
		view.pause_btnPause.sprite.visible = true;
        //view.btn_showRank.sprite.visible = true;
        view.select_shield.visible = false;
		view.select_bg.visible = false;
        kData.iUserOwnGold -= view.select_needGold;
		// SaveDataInClient();
		networkManager.ForcedSaveData();
		BGMSoundStop();
	});

	this.spr_selectGunBuff = SpriteLoad(this.select_needGoldBG, "gun_bonus_icon.png", -145, -20);

	this.select_shield.visible = false;
	this.select_bg.visible = false;
};

GAME.view.prototype.showSelectPop = function(){
	this.select_txtUserGold.text = kData.iUserOwnGold.formatMoney(0);
	this.setSelectPopText();

	if(GAME.bBuff_elevator){
	    this.select_txtNeedGold.style.fill = "#ffae57";
	    this.spr_selectGunBuff.visible = true;
    } else {
        this.select_txtNeedGold.style.fill = "#ffffff";
        this.spr_selectGunBuff.visible = false;
    }

	this.select_shield.visible = true;
	this.select_bg.visible = true;
};

GAME.view.prototype.setSelectPopText = function(){
	var levelData = GAME.engineInst.stageManager.levelData;
    var length = levelData.length;
    //view Control
    for(i=0;i<length;++i){
        if(GAME.skipStageLevel === levelData[i].level){
            this.select_needGold = Math.round(levelData[i].skip - (levelData[i].skip*GAME.discount_floorMove));
            GAME.skipGold = levelData[i].gold;
            break;
        }
    }

	this.select_txtNeedGold.text = "$"+this.select_needGold.formatMoney(0);
	this.select_txtFloor.text = GAME.skipStageFloor.toString()+"F";

	GAME.stageFloor = GAME.skipStageFloor;
	GAME.stageLevel = GAME.skipStageLevel;
};

GAME.view.prototype.shopInit = function(){
    // GAME.gunShopContainer = new PIXI.Container();
    GAME.gunShopContainer = new GUMA.scrollView(this.shopBG_shop, 700, 1200, -350, -500, "vertical");
	var self = this;
	var length = GAME.gunData.length;
	var i;
	for(i=0;i<length;++i){
		this.shop_gunSlots[i] = new GAME.gunShopSlot("gun_shop_slot_new.png", "gun_"+(i+1).toString()+".png"
			, GAME.table_language["gun0"+(i+1).toString()][GAME.language], GAME.gunData[i].price, GAME.gunData[i].floor, i);
		GAME.gunShopContainer.viewLists[i] = this.shop_gunSlots[i].slotBG;
	}
	GAME.gunShopContainer.setList(5, 0, 2, 50);

	this.shop_userInfoBG = SpriteLoad(this.shopBG_shop, "shooting_range_ui.png", 0,-575);
	this.shop_GoldIcon = SpriteLoad(this.shop_userInfoBG, "gold_icon.png", -280, -5);
	this.shop_txtUserOwnGold = FontLoad(this.shop_userInfoBG, kData.iUserOwnGold.formatMoney(0), 30, -5
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:'#ffffff', stroke:"#000000", strokeThickness:4}, 1, 0.5);

	this.shop_btnRifleRange = new GUMA.button(this.shop_userInfoBG, "shooting_range_change_btn.png", 190, -5);
	this.shop_btnRifleRange.setOriginScale(0.6, 0.6);
	this.shop_btnRifleRange.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		self.showRifleRange();
	});
	this.shop_btnRifleRange.setDownAction(function () {
        GAME.bGetButton = true;
    });

	this.shop_btnTitle = new GUMA.button(this.shop_userInfoBG, "home_btn.png", 290, -5);
	this.shop_btnTitle.setOriginScale(0.43, 0.43);
	this.shop_btnTitle.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		var view = self;
        view.hideShop();
        view.showTitle();
	});
    this.shop_btnTitle.setDownAction(function () {
        GAME.bGetButton = true;
    });

	this.shop_btnBackShop = new GUMA.button(this.shop_userInfoBG, "shooting_range_back_btn.png", 290, -5);
    this.shop_btnBackShop.setOriginScale(0.6, 0.6);
	this.shop_btnBackShop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		var view = self;
        view.hideRifleRange();
        view.showShop();
	});
    this.shop_btnBackShop.setDownAction(function () {
        GAME.bGetButton = true;
    });

	this.shop_btnBackShop.sprite.visible = false;

	this.btn_showPayShop = new GUMA.button(this.shop_userInfoBG, "btn_plus.png", 70, -5);
    this.btn_showPayShop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        // networkManager.GetShoplist(ShopType.GAMEMONEY, GAME.ui_shop_gold.cb_ShowPop);
        GAME.ui_shop_gold.cb_ShowPop();
    });

    this.btn_showPayShop.setDownAction(function () {
        GAME.bGetButton = true;
    });

    // this.shopBG_shop.addChild(GAME.gunShopContainer);
    // GAME.gunShopContainer.position.set(iCenterSizeX-iMaxSizeX, iCenterSizeY-iMaxSizeY);
	this.shopBG_shop.visible = false;
	GAME.gunShopContainer.scrollContainer.visible = false;

	GAME.ui_gunBuyPop = new UI_buyGunPop();
	this.viewContainer.addChild(GAME.ui_gunBuyPop.con_pop);
};

GAME.view.prototype.showShop = function(){
	this.shopBG_shop.visible = true;
    GAME.gunShopContainer.scrollContainer.visible = true;
	var length = GAME.gunData.length;
	var i = 0;
    for(i=0;i<length;++i){
        this.shop_gunSlots[i].setState(this.checkBuyRecords(i));
    }
	this.shop_btnTitle.sprite.visible = true;
	this.shop_btnRifleRange.sprite.visible = true;
	this.shop_btnBackShop.sprite.visible = false;
	this.shop_txtUserOwnGold.text = kData.iUserOwnGold.formatMoney(0);
	this.L_hand.visible = false;
	this.R_hand.visible = false;
};

GAME.view.prototype.hideShop = function(){
	this.shopBG_shop.visible = false;
    GAME.gunShopContainer.scrollContainer.visible = false;
};

GAME.view.prototype.hideSlotsAndBtn = function(){
	var length = GAME.gunData.length;
	var i = 0;
	for(i=0;i<length;++i){
		this.shop_gunSlots[i].hideSlot();
	}
	this.shop_btnRifleRange.sprite.visible = false;
	this.shop_btnTitle.sprite.visible = false;
	this.shop_btnBackShop.sprite.visible = true;
};

GAME.view.prototype.checkBuyRecords = function(idx){
	return (kData.arrBuyRecords[idx] !== undefined && kData.arrBuyRecords[idx] !== null);
};

GAME.view.prototype.selectCancel = function(idx){
	var slot = this.shop_gunSlots[idx];
	slot.selectSlot.visible = false;
	slot.state = slot.STATE.EQUIP;
	slot.setButton();
};

GAME.view.prototype.setSlotState = function(){
	var i = 0;
	var length = this.shop_gunSlots.length;
	for(i=0;i<length;++i){
		this.shop_gunSlots[i].setState(this.checkBuyRecords(i));
	}
};

GAME.view.prototype.rifleRangeInit = function(){
	var self = this;

	function getButton(){
		GAME.bGetButton = true;
	}

	this.shopBG_shop = SpriteLoad(this.viewContainer, strGamePath+"img/gun_range.png", iCenterSizeX, iCenterSizeY);
	// this.shopBG_shop.interactive = true;
	
	this.leftTarget_shop = new PIXI.spine.Spine(spines.target);
	this.rightTarget_shop = new PIXI.spine.Spine(spines.target);
	
	this.shopBG_shop.addChild(this.leftTarget_shop);
	this.shopBG_shop.addChild(this.rightTarget_shop);
	
	this.leftTarget_shop.position.set(-120, 0);
	this.leftTarget_shop.scale.x = -1;
	this.rightTarget_shop.position.set(120, 0);

	this.leftChange_shop = new GUMA.button(this.shopBG_shop, "select_arrow_btn.png", -80, 500);
	this.leftChange_shop.setOriginScale(0.8, 0.8);
	this.leftChange_shop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		var view = self;
		GAME.bChangeGun = true;
		view.curShowNum -= 1;
		if(view.curShowNum<0){
			view.curShowNum = view.maxGunIdx;
		}

		view.txtGunName.text = GAME.table_language["gun0"+(view.curShowNum+1).toString()][GAME.language];
		
		GAME.playSpine(view.L_hand, "gun_1_out"/*, false, 2*/);
		GAME.playSpine(view.R_hand, "gun_1_out"/*, false, 2*/);
	});
	this.leftChange_shop.setDownAction(getButton);

	this.rightChange_shop = new GUMA.button(this.shopBG_shop, "select_arrow_btn.png", 80, 500);
	this.rightChange_shop.setOriginScale(-0.8, 0.8);
	this.rightChange_shop.setCallback(function(){
        SESoundPlay(SE_BUTTON);
        var view = self;
        GAME.bChangeGun = true;
		view.curShowNum += 1;
		if(view.curShowNum>view.maxGunIdx){
			view.curShowNum = 0;
		}

        view.txtGunName.text = GAME.table_language["gun0"+(view.curShowNum+1).toString()][GAME.language];
		
		GAME.playSpine(view.L_hand, "gun_1_out"/*, false, 2*/);
		GAME.playSpine(view.R_hand, "gun_1_out"/*, false, 2*/);
	});
	this.rightChange_shop.setDownAction(getButton);

	this.txtGunName = FontLoad(this.shopBG_shop, "Desert Eagle", 0, 250
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});
	
	this.txtGunName.visible = false;
	this.leftTarget_shop.visible = false;
	this.rightTarget_shop.visible = false;
	this.rightChange_shop.sprite.visible = false;
	this.leftChange_shop.sprite.visible = false;
};

GAME.view.prototype.showRifleRange = function(){
	GAME.bShop = true;
	GAME.gunShopContainer.scrollContainer.visible = false;

	this.leftTarget_shop.state.clearTracks();
	this.rightTarget_shop.state.clearTracks();
	this.leftTarget_shop.skeleton.setToSetupPose();
    this.rightTarget_shop.skeleton.setToSetupPose();

	GAME.playSpine(this.leftTarget_shop, "target_idle");
	GAME.playSpine(this.rightTarget_shop, "target_idle");
	this.curShowNum = kData.iUserOwnGun;
	this.setUserGun(this.curShowNum);
    this.txtGunName.text = GAME.table_language["gun0"+(this.curShowNum+1).toString()][GAME.language];
	this.txtGunName.visible = true;
	this.shop_btnBackShop.sprite.visible = true;
	this.rightChange_shop.sprite.visible = true;
	this.leftChange_shop.sprite.visible = true;
	this.showHand();
};

GAME.view.prototype.hideRifleRange = function(){
	GAME.bShop = false;
    GAME.gunShopContainer.scrollContainer.visible = true;

	this.txtGunName.visible = false;
	this.leftTarget_shop.visible = false;
	this.rightTarget_shop.visible = false;
	this.shop_btnBackShop.sprite.visible = false;
	this.rightChange_shop.sprite.visible = false;
	this.leftChange_shop.sprite.visible = false;
	this.L_hand.visible = false;
	this.R_hand.visible = false;
};

GAME.view.prototype.exitPopInit = function () {
    this.con_exitPop = new PIXI.Container();
    this.spr_back = SpriteLoad(this.con_exitPop, "white.png", iCenterSizeX, iCenterSizeY);
    this.spr_back.tint = 0x000000;
    this.spr_back.alpha = 0.7;
    this.spr_back.interactive = true;
    this.spr_back.width = iMaxSizeX;
    this.spr_back.height = iMaxSizeY;
    this.spr_exitBG = SpriteLoad(this.con_exitPop, "popup_message.png", iCenterSizeX, iCenterSizeY)
    /*this.txt_exitTitle = */FontLoad(this.spr_exitBG, GAME.table_language["popup07"][GAME.language], 0, -210
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"}, 0.5, 0.5, 500);
    /*this.txt_exitMessage = */FontLoad(this.spr_exitBG, GAME.table_language["exitCheck"][GAME.language], 0, -50
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"}, 0.5, 0.5, 600);

    this.btn_exitNO = new GUMA.button(this.spr_exitBG, "btn_shop_no.png", -155, 120);
    this.btn_exitNO.setCallback(function () {
        SESoundPlay(SE_BUTTON);
        GAME.view.con_exitPop.visible = false;
        // if(GAME.bPauseExit) GAME.bPauseExit = false;
    });
    FontLoad(this.btn_exitNO.sprite, GAME.table_language["button02"][GAME.language], 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"30px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});

    this.btn_exitYES = new GUMA.button(this.spr_exitBG, "btn_shop_ok.png", 155, 120);
    this.btn_exitYES.setCallback(function () {
        SESoundPlay(SE_BUTTON);
        GAME.view.con_exitPop.visible = false;
        GAME.view.hidePausePop();
        GAME.view.gameOver("self");
        GAME.view.bPause_out = true;
        GAME.view.bSelfOver = true;
    });

    FontLoad(this.btn_exitYES.sprite, GAME.table_language["button01"][GAME.language], 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"30px", fill:"#ffffff", stroke:"#000000", strokeThickness:4, fontWeight:"bold"});

    this.viewContainer.addChild(this.con_exitPop);
    this.con_exitPop.visible = false;
};

GAME.view.prototype.showExitPop = function () {
    this.con_exitPop.visible = true;
};