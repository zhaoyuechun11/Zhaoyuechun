gc.GamePlayPage = function(){
    PIXI.Container.call(this);

    //미사용
    //this.randomBlockArray = new Array(1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,
    //    1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,
    //    1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,
    //    1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,
    //    1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,15,16,17,18,15);                                  //새로운 블록 생성 배열,장애 블록 5개 일반 블록 95개

    this.stoneBlockArray = [0,0,2,0,3,0,3,0,4,0,4,0,5,0,6];                                       //매 스테지 장액블록수 배열
    this.stageTurnNum = [0,40,40,60,60,75,75,75,75,80,80,80,80,85,85];                     //매 스테지 터뜨려야 하는 블록수
    //this.stageTurnNum = [0,10,10,10,10,10,10,10,10,10,10,10,10,10,10];                     //매 스테지 터뜨려야 하는 블록수
    this.turnCountArray = [0,30,15,20,20,25,25,30,30,30,30,35,35,35,35,35];                         //매 스테지 초기 주어진 턴수
    this.turnScoreArray = [0,1500,1500,2000,2000,2500,2500,3000,3000,3500,3500,4000,4000,4500,4500];    //스테지 클리어시 남은 턴수당 점수
    this.stageStonBlockChance = [0,0,10,0,10,0,10,0,15,0,15,0,15,0,20];
    this.countryClearPlusVal = [10,10,10,10,10,10,10];
    this.stageClearBonusSocre = [1500,2000,2500,3000,3500,4000,4500];


    this.groundArray = ['123','korea_ground_0001','korea_ground_0002',                              //매 스테지 위 배경
                            'china_ground_0001','china_ground_0002',
                            'egypt_ground_0001','egypt_ground_0002',
                            'greece_ground_0001','greece_ground_0002',
                            'france_ground_0001','france_ground_0002',
                            'brazil_ground_0001','brazil_ground_0002',
                            'america_ground_0001','america_ground_0002'];
    this.blockNameArray = ['123','block_000','block_000',                                       //매 스테지 블록 네임
                                'block_000','block_000',
                                'block_000','block_000','block_000',
                                'block_000','block_000','block_000',
                                'block_000','block_000',
                                'block_000','block_000'];
    this.randMarkArray = ['123','korea_randmark_0001','korea_randmark_0002',                            //매 스테지 나라 마크
                                'china_randmark_0001','china_randmark_0002',
                                'egypt_randmark_0001','egypt_randmark_0002',
                                'greece_randmark_0001','greece_randmark_0002',
                                'france_randmark_0001','france_randmark_0002',
                                'brazil_randmark_0001','brazil_randmark_0002',
                                'america_randmark_0001','america_randmark_0002'];

    this.stageBlockTypeArray = [[1],[-1,-1,-1,-1],[100,0,0,0],[-1,-1,-1,-1],                                //매 스테지 각장애 블록당 생성 개수
        [100,-1,-1,-1],[-1,-1,-1,-1],[50,100,-1,-1],[-1,-1,-1,-1],
        [50,100,-1,-1],[-1,-1,-1,-1],[33,100,-1,-1],[-1,-1,-1,-1],
        [0,100,-1,-1],[-1,-1,-1,-1],[0,100,-1,-1]];


    this.sPuzzleStartY = 577;                                                       //퍼즐 시작 위치 y축
    this.dPuzzleStartY = 528;                                                       //퍼즐 시작 위치 y축
    this.puzzleStartX = 109;                                                         //퍼즐 시작 위치 x축
    this.puzzleXSIZE = 7;                                                           //퍼즐 y축 사이즈
    this.puzzleYSIZE = 6;                                                           //퍼즐 x축 사이즈
    this.pXp = 84;                                                                   //퍼즐 간격
    this.pYp = 95.5;                                                                  //퍼즐 간격

    this.overAnimationFlag = false;                                                 //에니메이션 종료 체크 프라그
    this.itemBombOver = false;                                                      //스테지 클리어 프라그
    this.feverTimeStart = false;                                                    //피버타임 스다트 프라그

    this.item6Num = 5;                                                                //특수 퍼즐 터뜨릴때 빌딩 므부 속도
    this.item12Num = 10;
    this.feverTurnCount = 1;

    this.shipAniTime = 0.1;                                                        //배,기차 에니메이션 타임
    this.singleShipCount = 0;                                                       //배 에니메이션 종료 프라그
    this.trainCount = 0;                                                            //기차 에니메이션 종료 프라그
    this.moveClipTime = 1.5;                                                          //블록 터지는 movieclip시간
    this.shipClipTime = 0.3;                                                          //배 블록 터지는 에니메이션 시간
    this.copterBombTime = 0.3;                                                      //헬기 블록 터지는 에니메이션 시간
    this.copterMovieClipTime = 1;                                                   //헬기 movieclip시간
    this.stonClearTime = 0.2;                                                       //장애블록 터지는 에니메이션 시간
    this.trainThrowTime = 0.2;                                                      //기차 블록 터지는 에니메이션 시간
    this.shipThrowTime = 0.2;                                                       //배 지나가는 에니메이션 시간
    this.planeBombTime = 0.3;                                                       //비행기 블록 터지는 에니메이션 시간
    this.shipBombBtweenTime = 0.15;

    this.dropPuzzleCount = 0;                                                       //현존 장애블록수

    this.graphics = new PIXI.Graphics();                                            //미사용

    this.startTouchX = -1;                                                          //터치시작 블록 좌표
    this.startTouchY = -1;                                                          //터치시작 블록 좌표

    this.gameOverPopupSprite = PIXI.Sprite.fromFrame("ui_gameover.png");                //게임 오버 팝업
    this.gameOverPopupSprite.anchor.set(0.5,0.5);
    this.gameOverPopupSprite.x = GD.width/2;
    this.gameOverPopupSprite.y = GD.height/2;

    this.endingPage = new gc.GameEdingPage();

    this.canDragBg = PIXI.Sprite.fromFrame("puzzle_popup_shadow.png");
    this.canDragBg.anchor.set(0.5);
    this.canDragBg.x = GD.width/2;
    this.canDragBg.y = 790;

    this.scoreEffect = new gc.GameScoreEffectContianer();
    this.countFlag = 0;

    this.resultBox = new gc.ResultView();
    this.resultBox.on("GOTO_MAINPAGE",(function () {
        this.emit("GOTO_MAINPAGE");
    }).bind(this));
};

gc.GamePlayPage.constructor = gc.GamePlayPage;
gc.GamePlayPage.prototype = Object.create(PIXI.Container.prototype);

// 초기화
gc.GamePlayPage.prototype.init = function(){

    this.removeChildren();

    if(GD.AGENT != "ios")
        gc.soundBt.x = GD.width*0.94;

    this.loading = null;

    this.level1 = false;
    this.level2 = false;
    this.level3 = false;
    this.level4 = false;

    this.moveGaugeMax = 5;

    this.gameStared = false;
    this.oldTime = 0;

    this.turnCountNum = 0;
    this.turnCountFlag = false;

    this.stonLevelClearCount = 0;
    this.goldLevelClearCount = 0;

    this.stageStoneBlockNum = 0;                                                    //스테지당 최대 장애블록수
    this.stageNum = 1;                                                              //스테지
    this.totalClear = this.stageTurnNum[this.stageNum];
    this.totalFlag = this.stageTurnNum[this.stageNum] + this.stageTurnNum[this.stageNum+1];

    this.gameBaceContiner = new PIXI.Container();                                   //게임 베이스 콘테널
    this.gameMergeAniContiner = new PIXI.Container();                               //드레그된 블록 콘테널
    this.gameLineContiner = new PIXI.Container();                                   //드레그 라인 콘테널
    this.gameEffectContiner = new PIXI.Container();                                 //게임 이팩트 콘테널
    this.gameShipEffectContiner = new PIXI.Container();                             //게임 특수퍼즐 이팩트 배경 콘테널
    this.gameTopEffectContiner = new PIXI.Container();
    this.gameTransportContianer = new PIXI.Container();
    this.karictorContainer = new PIXI.Container();
    this.guiedContainer = new PIXI.Container();
    this.itemLineEffectContainer = new PIXI.Container();
    this.dayAndNightContainer = new PIXI.Container();
    this.topUIContainer = new PIXI.Container();
    this.moveLineContainer = new PIXI.Container();
    this.movePopupContainer = new PIXI.Container();
    this.turnCountMusContiner = new PIXI.Container();
    this.canDragPuzzleContainer = new PIXI.Container();
    this.canDragBgContainer = new PIXI.Container();
    this.darkBgContainer = new PIXI.Container();

    this.overAnimationFlag = false;                                                 //에니메이션 종료 체크 프라그
    this.itemBombOver = false;                                                      //스테지 클리어 프라그
    this.feverTimeStart = false;                                                    //피버타임 스다트 프라그

    this.turnCount = this.turnCountArray[this.stageNum];                         //게임 턴수
    this.randomBombCount = 15;                                                      //게임 종료 랜덤으로 터지는 블록수
    this.totalScore = 0;                                                            //게임 점수
    this.totalClearBlockNum = 0;                                                    //게임 크리어 블록 수
    this.buildingMoveBlockNum = 0;                                                  //빌딩 매번 드래그할때 속도 조절

    this.puzzleArray = [];                                                          //블록 배열 타입,객체,기차 아이템 분류,블록 tweenmax
    this.dragedArray = [];                                                          //드래그된 블록 배열
    this.mergeDragedArray = [];                                                     //드래그 에니메이션 블록 배열
    this.copyDrageArray = [];                                                       //드래그된 블록 코비 배열

    this.bombEffectArray = [];                                                      //이팩트 factory 배열

    this.itemSelectedArray = [];                                                    //터질 블록 배열
    this.blockCallBackLists = [];

    this.guiedTime = 0;

    this.trainTypeLR = [];                                                              //기차 블록 배열 좌 -> 우
    this.trainTypeRL = [];                                                              //기차 블록 배열 우 -> 좌
    this.trainTypeDU = [];                                                              //기차 블록 배열 밑 -> 위

    this.effectCallBackLists = [];
    this.sixBombEffectLists = [];
    this.planEffectLists = [];
    this.trainEffectLists = [];
    this.trainEffectSaveLists = [];
    this.trainMoveEffectLists = [];
    this.shipEffectLists = [];                                                          //배아이템 물결 이팩트
    this.shipEffectSaveLists = [];                                                      //배아이템 물결 이팩트 저장
    this.shipPointEffectLists = [];                                                     //배아이템 물결 이팩트 처음 이팩트
    this.shipMoveEffectLists = [];                                                      //배아이템 움직이는 배 이팩트

    this.shipStartX = 0;

    this.animation = new PIXI.spine.Spine(GD.loader.resources['spineCharacter'].spineData);                         //캐리터 move spine
    this.animation.state.addAnimation(0,'flag_1',false,0);
    this.animation.x = GD.width/2;
    this.animation.y = GD.height*0.31;

    this.normalAnimation = new PIXI.spine.Spine(GD.loader.resources['kariNormal'].spineData);
    this.normalAnimation.state.addAnimation(0,'normal_1',true,0);
    this.normalAnimation.x = GD.width/2;
    this.normalAnimation.y = GD.height*0.31;

    this.clearAniSpine = new PIXI.spine.Spine(GD.loader.resources['clearSpine'].spineData);                         //스테지 클리어 캐릭터 에니
    this.clearAniSpine.state.addAnimation(0,'cha_clear_1',true,0);
    this.clearAniSpine.x = GD.width/2;
    this.clearAniSpine.y = GD.height*0.3;

    this.failAniSpine = new PIXI.spine.Spine(GD.loader.resources['failSpine'].spineData);                           //게임 오버 캐릭터 에니
    this.failAniSpine.state.addAnimation(0,'cha_fail_1',false,0);
    this.failAniSpine.x = GD.width/2;
    this.failAniSpine.y = GD.height*0.3;

    this.gameBlackBG = PIXI.Sprite.fromFrame("puzzle_bg.png");                                                          //퍼즐 배경
    this.gameBlackBG.anchor.y = 1;
    this.gameBlackBG.y = GD.height*0.976;
    this.gameBlackBG.x = 46;

    this.gameLineBG = PIXI.Sprite.fromFrame("puzzle_line.png");
    this.gameLineBG.x = GD.width*0.108;
    this.gameLineBG.y = GD.height*0.469;

    if(!gc.isLowPhone) {
        this.addChild(this.gameBlackBG);
        this.addChild(this.gameLineBG);
    }


    if(gc.isLowPhone) {
        //this.topLowBG = PIXI.Sprite.fromFrame("stage_"+this.stageNum+".png");
        this.topLowBG = new PIXI.Sprite(GD.loader.resources["stage1"].texture);
        this.topLowBG.scale.set(2);
        this.addChild(this.topLowBG);
    }

    this.addChild(this.itemLineEffectContainer);

    this.gameBaceContiner.addChild(this.gameShipEffectContiner);
    this.addChild(this.gameBaceContiner);

    if(!gc.isLowPhone) {
        this.topBG = PIXI.Sprite.fromFrame(this.randMarkArray[this.stageNum] + ".png");                                       //게임 위 배경
        this.addChild(this.topBG);
    }

    this.building = new gc.GameBuilding();                                                                                  //게임 위 움직이는 건물

    this.dayCountBG = PIXI.Sprite.fromFrame("ui_move_bg.png");                                                              //턴수 배경
    this.dayCountBG.x = GD.width*0.01;
    this.dayCountBG.y = GD.height*0.01;
    this.topUIContainer.addChild(this.dayCountBG);

    this.moveNumber = new gc.NumberText('ui_move1_','center',-20);                                                           //턴수 텍스트
    this.moveNumber.setValue(this.turnCount);
    //this.moveNumber.x = this.dayCountBG.x+(this.dayCountBG.width-this.moveNumber.width)/2-5;
    this.moveNumber.x = 72;
    this.moveNumber.y = 62;
    this.moveNumber.scale.x = 0.8;
    this.topUIContainer.addChild(this.moveNumber);

    this.moveGauge = PIXI.Sprite.fromFrame("ui_move_gauge.png");
    this.moveGauge.x = 31.5;
    this.moveGauge.y = 130.5;
    this.topUIContainer.addChild(this.moveGauge);

    this.moveGaugeMask = new PIXI.Graphics();
    this.moveGaugeMask.lineStyle(0, 0x0000FF, 0);
    this.moveGaugeMask.beginFill(0xFF700B, 1);
    this.moveGaugeMask.drawRect(30, 130, 84, 15);
    this.moveGaugeMask.endFill();
    this.topUIContainer.addChild(this.moveGaugeMask);
    this.moveGauge.mask = this.moveGaugeMask;
    this.moveGaugeMask.x = 0;

    this.addChild(this.gameTopEffectContiner);

    if(!gc.isLowPhone) {
        this.gameEarth = PIXI.Sprite.fromFrame(this.groundArray[this.stageNum] + ".png");                                         //게임 퍼즐 배경
        this.gameEarth.y = GD.height - this.gameEarth.height;
        this.addChild(this.gameEarth);
    }

    if(!gc.isLowPhone)
    this.addChild(this.building);

    this.turnBarBG = PIXI.Sprite.fromFrame("ui_distance_bar.png");                                                              //게임 게이지 바 배경
    this.turnBarBG.x = (GD.width-this.turnBarBG.width)/2;
    this.turnBarBG.y = GD.height*0.36;
    this.topUIContainer.addChild(this.turnBarBG);

    this.turnBar = PIXI.Sprite.fromFrame("ui_distance_gauge.png");                                                              //게임 게이지 바
    this.turnBar.x = this.turnBarBG.x+14;
    this.turnBar.y = this.turnBarBG.y+14;
    this.turnBar.scale.x = 1;
    this.topUIContainer.addChild(this.turnBar);

    this.turnBarMask = new PIXI.Graphics();
    this.turnBarMask.lineStyle(2, 0x0000FF, 1);
    this.turnBarMask.beginFill(0xFF700B, 1);
    this.turnBarMask.drawRect(110, 410, 500, 40);
    this.turnBarMask.endFill();
    this.turnBar.mask = this.turnBarMask;
    this.topUIContainer.addChild(this.turnBarMask);
    this.turnBarMask.x = -500;



    this.overFlag = new gc.MovieClip('ui_distance_flag000',1,6,0.5,0);
    this.overFlag.loop = true;
    this.overFlag.anchor.set(0.5,0);
    this.overFlag.x = this.turnBarBG.x+this.turnBarBG.width;
    this.overFlag.y = this.turnBarBG.y-50;
    this.topUIContainer.addChild(this.overFlag);
    this.overFlag.stop();

    this.turnBarRod = PIXI.Sprite.fromFrame("ui_distance_position.png");                                                        //게이지 추
    this.turnBarRod.anchor.x = 0.5;
    //this.turnBarRod.x = this.turnBar.x+this.turnBar.width;
    this.turnBarRod.x = this.turnBarMask.x + 610;
    this.turnBarRod.y = this.turnBarBG.y-20;
    this.topUIContainer.addChild(this.turnBarRod);

    //블록 초기화
    this.initPuzzle();

    this.karictorContainer.addChild(this.normalAnimation);

    this.popUp = new gc.GamePopup();                                            //게임 모든 팝업
    //this.stageChangePopup = new gc.GameStageChange();

    this.gameStageClearPopup = new gc.GameStageClearPopup();
    //this.gameStageClearPopup.anchor.set(0.5,0.5);
    //this.gameStageClearPopup.x = GD.width/2;
    //this.gameStageClearPopup.y = GD.height/2;

    //점수
    this.scoreNumberText = new gc.NumberText('ui_score_','center',-10);
    this.scoreNumberText.setValue(0);
    this.scoreNumberText.x = (GD.width-this.scoreNumberText.width)/2;
    this.scoreNumberText.y = GD.height*0.01;
    this.topUIContainer.addChild(this.scoreNumberText);

    this.addChild(this.gameTransportContianer);

    this.addChild(this.popUp);
    //this.popupCloseCallBack(0);
    this.popUp.showPopup(0);

    this.messageText = new gc.GameKariMessage();

    //this.optionPopup = new gc.GameOption();

    this.moveLineSpine = new PIXI.spine.Spine(GD.loader.resources['moveLineSpine'].spineData);                         //캐리터 move spine
    this.moveLineSpine.state.addAnimation(0,'animation',true,0);
    this.moveLineSpine.x = 72;
    this.moveLineSpine.y = 90;

    this.move5CountPopup = PIXI.Sprite.fromFrame("ui_notice_2.png");
    this.move5CountPopup.anchor.set(0.5,0.5);
    this.move5CountPopup.x = GD.width/2;
    this.move5CountPopup.y = GD.height*0.7;
    this.move5CountPopup.flag = false;

    this.topUIContainer.addChild(this.moveLineContainer);
    this.topUIContainer.addChild(this.movePopupContainer);

    this.daytonightSprite = PIXI.Sprite.fromFrame("level_next_0001.png");
    this.addChild(this.dayAndNightContainer);

    this.loadingShow();
    this.pointUseCheck();


    this.scoreInterval = null;
    this.aniScore = 0;

    if(!gc.isLowPhone)
    this.addChild(this.karictorContainer);

    if(GD.AGENT != "ios"){
        GD.bgmStop();
        if(gc.bgmFlag)
            GD.bgmPlay(1);
    }

};

gc.GamePlayPage.prototype.loadingShow = function(){
    if(this.loading == null){
        this.loading = new gc.DataLoadingView();
        GD.stage.addChild(this.loading);
        this.loading.init();
    }
}

gc.GamePlayPage.prototype.loadingHide = function () {
    if(this.loading != null){
        GD.stage.removeChild(this.loading);
        this.loading = null;
    }
}

gc.GamePlayPage.prototype.pointUseCheck = function () {

    gc.game_idx = null;
    this.loadingHide();
    this.gameStared = true;
    NetworkManager.sendData2("gameStart",{"gameId":gc.gameId,"type":gc.gameType},this.gameStartResult,this);
    return;


    if(gc.localTest)
    {
        var data = {};
        data.playSeq = 2345;
        this.pointUseCheckResult(data);
        return;
    }

    NetworkManager.sendData("startGame", {gameId:GD.gameId}, this.pointUseCheckResult, this);
};

gc.GamePlayPage.prototype.gameStartResult = function (data) {
    if(data.result) {
        gc.game_idx = data.game_idx;
        gc.startDatetime = data.start_datetime;
    }else{
        gc.game_idx = null;
        gc.startDatetime = null;
    }
};

gc.GamePlayPage.prototype.pointUseCheckResult = function (receiveData) {
    if(!gc.localTest)
        gc.playSeq = receiveData.result.playSeq;//플레이 시퀀스 값
    console.log("pointUseCheckResult");

    this.loadingHide();

    this.gameStared = true;
}

gc.GamePlayPage.prototype.setTurnCountFlag = function (type) {
    if(type){
        this.turnCountFlag = true;
    }else{
        this.turnCountFlag = false;
    }
    this.turnCountNum = 0;
    this.moveGaugeMask.x = 0;
    if(this.moveGaugeTween)
        this.moveGaugeTween.kill(false);
}

//게임 스다트
gc.GamePlayPage.prototype.startGame = function () {
    this.initTouch();
    this.addChild(this.darkBgContainer);
    this.addChild(this.canDragBgContainer);
    this.addChild(this.canDragPuzzleContainer);
    this.addChild(this.gameMergeAniContiner);
    this.addChild(this.gameLineContiner);

    this.addChild(this.messageText);
    this.messageText.startMessage();
    this.addChild(this.guiedContainer);

    this.test = new gc.GameGuied();
    this.guiedContainer.addChild(this.test);

    this.addChild(this.topUIContainer);
    this.addChild(this.gameEffectContiner);

    this.scoreEffect.init();
    this.addChild(this.scoreEffect);

    this.addChild(this.turnCountMusContiner);

    this.addChild(this.gameStageClearPopup);

    this.gameBaceContiner.interactive = true;

    this.guidTime = setInterval((function () {
        if(this.gameStared && !gc.isPaused) {
            var nowTime = new Date().getTime();
            if (nowTime - this.guiedTime > 5000) {
                //this.test.removeAll();
                if (this.dragedArray.length == 0) {
                    this.test.checkPuzzle(this.puzzleArray);
                    this.test.inGuied = true;
                }
            }

            if (this.turnCountFlag) {
                this.turnCountNum++;
                this.moveGaugeDc();
            }
        }
    }).bind(this),1000);
    this.guiedTime = new Date().getTime();

}

gc.GamePlayPage.prototype.moveGaugeDc = function () {
    var flag = false;
    if(this.turnCountNum >= this.moveGaugeMax){
        flag = true;
        //this.moveGaugeTween.kill(false);
        this.moveGaugeMask.x = 0;
        this.turnCountNum = 1;
        if(this.turnCount > 0){
            if(gc.soundFlag && !gc.deviceStopFlag)
                GD.soundPlay("sound_mvminus");
            this.turnCount--;
            this.showTurnMusAnimation();
            this.moveNumber.setValue(this.turnCount);
            if(this.turnCount <= 0){
                this.setTurnCountFlag(false);
                this.gameover();
            }else if(this.turnCount <= 5){
                try {
                    this.moveNumber.fileName = 'ui_move3_';
                    this.moveLineContainer.removeChildren();
                    if(!gc.isLowPhone)
                    this.moveLineContainer.addChild(this.moveLineSpine);
                    if(!this.move5CountPopup.flag){
                        this.move5CountPopup.flag = true;
                        this.move5CountPopupAnimation();
                    }
                }catch(e){

                }
            }
        }
    }
    if(this.turnCountNum == 1) {
        if (this.moveGaugeTween)this.moveGaugeTween.kill(false);
        this.moveGaugeTween = TweenMax.to(this.moveGaugeMask, 3.8, {
            x: -83, onComplete: (function () {

            }).bind(this), ease: Linear.easeInOut
        });
    }

}

gc.GamePlayPage.prototype.showTurnMusAnimation = function () {
    var musSprite = PIXI.Sprite.fromFrame("move_minus0001.png");
    musSprite.anchor.set(0.5,0.5);
    musSprite.scale.x = 0.7;
    musSprite.scale.y = 0.7
    musSprite.x = 70;
    musSprite.y = 100;
    this.turnCountMusContiner.addChild(musSprite);
    TweenMax.to(musSprite,0.5,{y:"-=60",onComplete:(function (musSprite) {
        this.turnCountMusContiner.removeChild(musSprite);
    }).bind(this),onCompleteParams:[musSprite]});
}

gc.GamePlayPage.prototype.resumeGame = function () {
    //this.gameBaceContiner.interactive = true;
    TweenMax.resumeAll();
}

gc.GamePlayPage.prototype.pauseGame = function () {
    //this.gameBaceContiner.interactive = false;
    TweenMax.pauseAll();
}

/**
 * 게임팝업창 콜백 함수
 * @param type  팝업창 타입
 */
gc.GamePlayPage.prototype.popupCloseCallBack = function (type) {
    if(type != 4)
        this.removeChild(this.popUp);
    if(type == 0){
        this.addChild(this.popUp);
        this.popUp.showPopup(6);
    }else if(type == 1){
        this.setTurnCountFlag(true);
        this.gameBaceContiner.interactive = true;
        //this.feverTimeStart = false;
        //this.building.resetTime(1000);
        //this.building.stopInterval();
        //this.building.resetBudingTexture(this.stageNum);
        //this.dropPuzzleAnimation();
    }else if(type == 2){
        this.showStageTunrPlusAnimation();
    }else if(type == 3){
        TweenMax.killAll(false);
        gc.flag = 0;
        //GD.commonOption.finish(this.totalScore);
        GD.soundAllStop();
        clearInterval(this.guidTime);
        this.messageText.stopAllTime();
        this.removeChild(this.messageText);
        if(!gc.isLowPhone)
        this.building.stopInterval();
        this.gameStared = false;
        this.showEndingPage();
    }else if(type == 4){
        TweenMax.killAll(false);
        gc.flag = 0;
        //GD.commonOption.finish(this.totalScore);
        GD.soundAllStop();
        gc.gameOver = true;
        //gc.soundFlag = false;
        clearInterval(this.guidTime);
        this.messageText.stopAllTime();
        this.removeChild(this.messageText);
        if(!gc.isLowPhone)
        this.building.stopInterval();
        this.gameStared = false;
        this.scoreSave();
        //this.emit("GOTO_MAINPAGE");
        // ---------------- 这里是结束的地方 ---------------- //

        //alert('post score message ' + this.totalScore);
        //this.totalScore

        if ( window.parent != null ) {
          window.parent.postMessage({
            cmd: "GameOver",
            msg: {
              score: this.totalScore, // 如果是星星数，也是这个分数
              level: 0
            }
          }, "*");
        }

    }else if(type == 5){
        this.gameOverItemBomb();
    }else if(type == 6){
        this.startGame();
        this.setTurnCountFlag(true);
    }else{
        this.feverTimeStart = false;
        if(!gc.isLowPhone) {
            this.building.resetTime(1000);
            this.building.stopInterval();
            this.building.resetBudingTexture(this.stageNum);
        }
        this.dropPuzzleAnimation();
    }
}

gc.GamePlayPage.prototype.setScoreInterval = function () {
    if(this.scoreInterval == null){
        this.scoreInterval = setInterval((function(){
            if(this.aniScore >= this.totalScore){
                clearInterval(this.scoreInterval);
                this.scoreInterval = null;
            }else {
                this.aniScore += 100;
                this.scoreNumberText.setValue(this.aniScore);
            }
        }).bind(this),30);
    }
}

//게임 replay 초기화
gc.GamePlayPage.prototype.reStartGame = function () {
    this.moveNumber.fileName = 'ui_move1_';
    this.messageText.showMessage = true;

    var num = Math.floor(this.stageNum/2)+1;

    this.karictorContainer.removeChildren();
    this.normalAnimation.state.setAnimation(0,'normal_'+num,true,0);
    this.normalAnimation.skeleton.setToSetupPose();

    this.karictorContainer.addChild(this.normalAnimation);
    this.karictorContainer.removeChild(this.clearAniSpine);
    this.addChild(this.messageText);

    this.stageNum++;
    this.stageStoneBlockNum = 0;
    this.buildingMoveBlockNum = 0;
    this.totalClearBlockNum = 0;
    this.turnBar.scale.x = 0.0001;
    this.turnBarRod.x = this.turnBar.x + this.turnBar.width;

    if(!gc.isLowPhone) {
        this.building.resetBudingTexture(this.stageNum);
        this.building.setBuildingRotation();
    }

    var string = this.randMarkArray[this.stageNum]+".png";
    if(!gc.isLowPhone) {
        this.topBG.texture = PIXI.Texture.fromFrame(string);
    }else{
        //this.topLowBG.texture = PIXI.Texture.fromFrame("stage_"+this.stageNum+".png");
        this.topLowBG.texture = GD.loader.resources["stage"+this.stageNum].texture;
    }
    if(!gc.isLowPhone)
        this.gameEarth.texture = PIXI.Texture.fromFrame(this.groundArray[this.stageNum]+".png");

    this.turnCount = this.turnCountArray[this.stageNum];
    this.overAnimationFlag = false;
    this.moveNumber.setValue(this.turnCount);
};

gc.GamePlayPage.prototype.stageChangeRedarwPuzzle = function () {
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            this.puzzleArray[i][j][1].alpha = 0;
        }
    }
};

gc.GamePlayPage.prototype.dropPuzzleAnimation = function () {
    for(var j=0;j<7;j++){
        for(var i=0;i<6;i++){
            var puzzletype = Math.floor(Math.random()*100)%5+1;

            //if(puzzletype == 4){
            //    puzzletype = Math.floor(Math.random()*100)%3+1;
            //}

            if(i==0 && j== 0){
                puzzletype = 1;
            }

            if(i==0 && j== 1){
                puzzletype = 1;
            }

            if(i==0 && j== 2){
                puzzletype = 1;
            }

            this.puzzleArray[i][j][0] = puzzletype;
            var string = this.blockNameArray[this.stageNum]+puzzletype+".png";
            this.puzzleArray[i][j][1].texture = new PIXI.Texture.fromFrame(string);
            this.puzzleArray[i][j][2] = 0;
            this.puzzleArray[i][j][1].alpha = 1;
            var y = this.puzzleArray[i][j][1].y-660;
            if(j == 6 && i == 5){
                TweenMax.from(this.puzzleArray[i][j][1],0.5,{y:y,onComplete:(function () {
                    this.gameBaceContiner.interactive = true;
                    this.guiedTime = new Date().getTime();
                    this.test.inGuied = false;
                    this.setTurnCountFlag(true);
                }).bind(this)});
            }else {
                TweenMax.from(this.puzzleArray[i][j][1], 0.5, {y: y});
            }
        }
    }

};

gc.GamePlayPage.prototype.resetMovePuzzleImg = function (type) {
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0] == 14) {
                if (type == 0) {
                    this.puzzleArray[i][j][1].texture = PIXI.Texture.fromFrame("block_00014.png");
                } else {
                    this.puzzleArray[i][j][1].texture = PIXI.Texture.fromFrame("special_puzzle_move_000"+type+".png");
                }
            }
        }
    }
}

//게임 터치 초기화
gc.GamePlayPage.prototype.initTouch = function(){

    this.gameBaceContiner.interactive = true;
    this.gameBaceContiner.mousedown = this.gameBaceContiner.touchstart = (function (e) {
        e.stopPropagation();

        var position = e.data.getLocalPosition(this.parent);
        var array = this.getTouchPosition(position);

        if(array[1] > 5 || array[1] <0 || array[0] <0 || array[0] > 6){
            return;
        }

        if(this.test.inGuied) {
            this.test.removeAll();
            this.test.inGuied = false;
        }
        this.guiedTime = new Date().getTime();

        if(this.puzzleArray[array[1]][array[0]][0] > 5 && this.puzzleArray[array[1]][array[0]][0] < 14){
            this.itemLineEffectContainer.removeChildren();
            this.clickedItemBlock(array[1],array[0]);
            this.gameBaceContiner.interactive = false;
            return;
        }

        if(array[0] >= 0 && array[0] <= 6 && array[1] >= 0 && array[1] <= 5 && this.dragedArray.length == 0){
            this.startTouchX = array[0];
            this.startTouchY = array[1];
            this.dragedArray.push(this.puzzleArray[array[1]][array[0]]);
            var dragSpriteBG = PIXI.Sprite.fromFrame("puzzle_effect_bg.png");
            dragSpriteBG.anchor.set(0.5,0.5);
            dragSpriteBG.x = this.dragedArray[0][1].x;
            dragSpriteBG.y = this.dragedArray[0][1].y;
            if(this.puzzleArray[array[1]][array[0]][0] > 5 || gc.isLowPhone){
                this.gameShipEffectContiner.addChild(dragSpriteBG);
            }else {
                this.showCanDragPuzzle(this.puzzleArray[array[1]][array[0]]);
                this.canDragBgContainer.addChild(dragSpriteBG);
            }
            var dragSprite = PIXI.Sprite.fromFrame("puzzle_effect_select.png");
            dragSprite.anchor.set(0.5,0.5);
            dragSprite.x = this.dragedArray[0][1].x;
            dragSprite.y = this.dragedArray[0][1].y;
            this.gameLineContiner.addChild(dragSprite);
        }else{
            this.startTouchX = -1;
            this.startTouchY = -1;
            return;
        }

    }).bind(this);

    this.gameBaceContiner.mousemove = this.gameBaceContiner.touchmove = (function (e) {
        if(this.startTouchX >= 0 && this.startTouchY >= 0){
            var position = e.data.getLocalPosition(this.parent);
            var array = this.getTouchPosition(position);
            if(array[0] >= 0 && array[0] <= 6 && array[1] >= 0 && array[1] <= 5){

            }else{
                return;
            }

            if(array[0] == this.startTouchX && array[1] == this.startTouchY){
                return;
            }

            if((this.puzzleArray[array[1]][array[0]][0] == this.dragedArray[0][0] || this.puzzleArray[array[1]][array[0]][0] == 14) && this.puzzleArray[array[1]][array[0]][0] < 15){

                var num = -1;
                for(var i=0;i<this.dragedArray.length;i++){
                    if(this.dragedArray[i][1] == this.puzzleArray[array[1]][array[0]][1]){
                        num = i;
                        break;
                    }
                }

                if(num != -1){
                    this.dragedArray.splice(num+1,this.dragedArray.length-num-1);
                    this.startTouchX = array[0];
                    this.startTouchY = array[1];
                    this.drawDragEffect();
                }else {
                    if(Math.abs(this.puzzleArray[array[1]][array[0]][1].x - this.puzzleArray[this.startTouchY][this.startTouchX][1].x) <=this.pXp
                        && Math.abs(this.puzzleArray[array[1]][array[0]][1].y - this.puzzleArray[this.startTouchY][this.startTouchX][1].y) <=this.pYp) {
                        this.dragedArray.push(this.puzzleArray[array[1]][array[0]]);

                        if (this.dragedArray.length <= 10) {
                            if(gc.soundFlag && !gc.deviceStopFlag)
                            GD.soundPlay("sound_drag0" + this.dragedArray.length);
                        } else {
                            if(gc.soundFlag && !gc.deviceStopFlag)
                            GD.soundPlay("sound_drag_max");
                        }

                        this.startTouchX = array[0];
                        this.startTouchY = array[1];
                        this.drawDragEffect();
                    }
                }
            }
        }else{
            return;
        }
    }).bind(this);

    this.gameBaceContiner.mouseup = this.gameBaceContiner.touchend =
        this.gameBaceContiner.mouseupoutside = this.gameBaceContiner.touchendoutside = this.gameBaceContiner.pointerupoutside = (function (e) {
        e.stopPropagation();

        this.guiedTime = new Date().getTime();
        this.gameLineContiner.removeChildren();
        this.gameShipEffectContiner.removeChildren();
        this.canDragBgContainer.removeChildren();
        this.closeCanDragPuzzle();
        if(!gc.isPaused)
            this.drawDragPuzzle();
        this.startTouchX = -1;
        this.startTouchY = -1;
        this.dragedArray = [];
    }).bind(this);

}

gc.GamePlayPage.prototype.move5CountPopupAnimation = function () {
    try{
        TweenMax.kill(this.movePopupTween);
    }catch(e){

    }
    this.movePopupContainer.removeChildren();
    this.movePopupContainer.addChild(this.move5CountPopup);
    this.movePopupTween = TweenMax.delayedCall(1,(function () {
        this.movePopupContainer.removeChildren();
    }).bind(this));
    //this.movePopupTween = TweenMax.to(this.move5CountPopup,1,{alpha:1,onComplete:(function () {
    //    this.movePopupContainer.removeChildren();
    //}).bind(this)});


}

gc.GamePlayPage.prototype.showCanDragPuzzle = function (puzzle) {
    var type = puzzle[0];
    if(type <=  5){
        this.darkBgContainer.addChild(this.canDragBg);
        for(var i=0; i<this.puzzleArray.length; i++){
            for(var j=0; j<this.puzzleArray[i].length; j++){
                if(type == this.puzzleArray[i][j][0]){
                    this.canDragPuzzleContainer.addChild(this.puzzleArray[i][j][1]);
                }
            }
        }
    }
};

gc.GamePlayPage.prototype.closeCanDragPuzzle = function () {
    //if(this.canDragBg.parent)
    this.darkBgContainer.removeChildren();
    var puzzle = null;
    try {
        for (var i = this.canDragPuzzleContainer.children.length - 1; i >= 0; i--) {
            puzzle = this.canDragPuzzleContainer.getChildAt(i);
            this.canDragPuzzleContainer.removeChild(puzzle);
            this.gameBaceContiner.addChild(puzzle);
        }
    }catch(e){

    }
};

gc.GamePlayPage.prototype.clickedItemBlock = function (x, y) {
    this.guiedTime = new Date().getTime();
    if(this.puzzleArray[x][y][0] == 14){
        if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_mvplus");
        this.totalScore += 333;
        this.turnCount++;
        //if(this.turnCount >= 100)
        //    this.turnCount = 99;

        if(this.turnCount > 5){
            this.moveLineContainer.removeChildren();
            this.moveNumber.fileName = 'ui_move1_';
        }

        this.timeAddAnimation(x,y,1);
        this.puzzleArray[x][y][1].alpha = 0;
        this.puzzleArray[x][y][0] = 0;
        this.reDarwPuzzle();
    }else {
        this.itemSelectedFun(this.puzzleArray[x][y][0], [y, x]);
    }
}

/**
 * 미사용(보류)
 */
gc.GamePlayPage.prototype.drawLine = function () {
    this.graphics.clear();
    this.gameLineContiner.removeChildren();
    for(var i=0;i<this.dragedArray.length-1;i++){
        this.graphics.beginFill(0x000000);
        this.graphics.lineStyle(3,0x0099ff,10);
        this.graphics.moveTo(this.dragedArray[i][1].x,
            this.dragedArray[i][1].y);
        this.graphics.lineTo(this.dragedArray[i+1][1].x,
            this.dragedArray[i+1][1].y);
        this.graphics.endFill();
    }
    this.gameLineContiner.addChild(this.graphics);
}

/**
 * 드래그 된 퍼들의 이팩트
 */
gc.GamePlayPage.prototype.drawDragEffect = function () {
    this.gameShipEffectContiner.removeChildren();
    this.canDragBgContainer.removeChildren();
    this.gameLineContiner.removeChildren();
    for(var i=0;i<this.dragedArray.length;i++){

        if(i != this.dragedArray.length-1 && this.dragedArray.length > 1){
            var rotation = this.checkDragRotation(this.dragedArray[i][1].x,this.dragedArray[i][1].y,this.dragedArray[i+1][1].x,this.dragedArray[i+1][1].y);
            var dragLineSprite = PIXI.Sprite.fromFrame("puzzle_effect_line.png");
            dragLineSprite.anchor.set(0,0.5);
            dragLineSprite.scale.x = 0.9;
            dragLineSprite.rotation = rotation;
            dragLineSprite.x = this.dragedArray[i][1].x;
            dragLineSprite.y = this.dragedArray[i][1].y;
            this.gameLineContiner.addChild(dragLineSprite);
        }

        var dragSpriteBG = PIXI.Sprite.fromFrame("puzzle_effect_bg.png");
        dragSpriteBG.anchor.set(0.5,0.5);
        dragSpriteBG.x = this.dragedArray[i][1].x;
        dragSpriteBG.y = this.dragedArray[i][1].y;
        if(gc.isLowPhone){
            this.gameShipEffectContiner.addChild(dragSpriteBG);
        }else{
            this.canDragBgContainer.addChild(dragSpriteBG);
        }
        var dragSprite = PIXI.Sprite.fromFrame("puzzle_effect_select.png");
        dragSprite.anchor.set(0.5,0.5);
        dragSprite.x = this.dragedArray[i][1].x;
        dragSprite.y = this.dragedArray[i][1].y;
        this.gameLineContiner.addChild(dragSprite);
    }
}

/**
 * 두 블록간의 각도를 구하는 함수
 * @param point1x   기존 포인트
 * @param point1y   기존 포인트
 * @param point2x   목표 포인트
 * @param point2y   목표 포인트
 * @returns {number}    각도
 */
gc.GamePlayPage.prototype.checkDragRotation = function (point1x,point1y,point2x,point2y) {
    var rotation = 0;
    var xLenght = Math.abs(Math.pow(point1x-point2x,2) + Math.pow(point1y-point2y,2));
    xLenght = Math.sqrt(xLenght);
    var wLength = Math.abs(point1x-point2x);
    var corner = Math.acos(wLength/xLenght);

    if(point1x >= point2x &&                //4 xiangxian
        point1y >= point2y){
        rotation = -Math.PI+corner;
    }else if(point1x >= point2x &&          //3 xiangxian
        point1y <= point2y){
        rotation = -Math.PI-corner;
    }else if(point1x <= point2x &&
        point1y >= point2y){                //1 xiangxian
        rotation = -corner;
    }else{                                  //2 xiangxian
        rotation = corner;
    }
    return rotation;
}

gc.GamePlayPage.prototype.newReDarwPuzzle = function () {
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0] == 0)
                this.gameBaceContiner.removeChild(this.puzzleArray[i][j][1]);
        }
    }

    for(var i=0;i<7;i++){
        var num =0;
        for(var j=5;j>=0;j--){
            if(num >0 && this.puzzleArray[j][i][0] != 0){
                this.puzzleArray[j+num][i][0] = this.puzzleArray[j][i][0];

                var toY = this.puzzleArray[j+num][i][1].y;
                this.puzzleArray[j+num][i][1] = this.puzzleArray[j][i][1];
                this.puzzleArray[j+num][i][1].alpha = 1;
                this.puzzleArray[j+num][i][2] = this.puzzleArray[j][i][2];
                this.dropPuzzleCount++;
                TweenMax.to(this.puzzleArray[j][i][1],0.2,{y:toY,
                    onComplete:(function () {
                        this.dropPuzzleCount--;
                        if(this.dropPuzzleCount == 0){
                            this.newCheckNextItemBlock();
                        }
                    }).bind(this)})
            }

            if(this.puzzleArray[j][i][0] == 0){
                num++;
            }
        }

        for(var z=0;z<num;z++){
            var count = 90;
            if(this.stageStoneBlockNum <0){
                this.stageStoneBlockNum = 0;
            }

            var puzzletype = 0;
            if(this.stageStoneBlockNum < this.stoneBlockArray[this.stageNum]){
                if(Math.random()*100 < 50){
                    //puzzletype = this.randomBlockArray[Math.floor(Math.random()*100) % count +1];
                    puzzletype = Math.floor(Math.random()*100)%5+1;
                    //if(puzzletype == 4){
                    //    puzzletype = Math.floor(Math.random()*100)%3+1;
                    //}
                }else{
                    var randNum = Math.random()*100;
                    if(randNum <= this.stageBlockTypeArray[this.stageNum][0]){
                        puzzletype = 15;
                    }else if(randNum <= this.stageBlockTypeArray[this.stageNum][1]){
                        puzzletype = 16;
                    }else if(randNum <= this.stageBlockTypeArray[this.stageNum][2]){
                        puzzletype = 17;
                    }else if(randNum <= this.stageBlockTypeArray[this.stageNum][3]){
                        puzzletype = 18;
                    }
                }
            }else{
                //puzzletype = this.randomBlockArray[Math.floor(Math.random()*100) % count +1];
                puzzletype = Math.floor(Math.random()*100)%5+1;
                //if(puzzletype == 4){
                //    puzzletype = Math.floor(Math.random()*100)%3+1;
                //}
            }

            if(puzzletype >14){
                this.stageStoneBlockNum++;
            }

            if(puzzletype == 0)
                puzzletype = 1;
            this.puzzleArray[z][i][0] = puzzletype;
            if(puzzletype > 5){
                this.puzzleArray[z][i][1] = PIXI.Sprite.fromFrame("block_000" + puzzletype + ".png");
            }else {
                this.puzzleArray[z][i][1] = PIXI.Sprite.fromFrame(this.blockNameArray[this.stageNum] + puzzletype + ".png");
            }
            this.puzzleArray[z][i][1].anchor.set(0.5,0.5);
            if(i%2 == 0){
                this.puzzleArray[z][i][1].y = this.sPuzzleStartY + z*this.pYp;
            }else{
                this.puzzleArray[z][i][1].y = this.dPuzzleStartY + z*this.pYp;
            }
            this.puzzleArray[z][i][1].x = this.puzzleStartX + i*this.pXp;
            this.gameBaceContiner.addChild(this.puzzleArray[z][i][1]);

            this.puzzleArray[z][i][1].alpha = 1;
            this.puzzleArray[z][i][2] = 0;
            var tagerY = this.puzzleArray[z][i][1].y - (num+1)*this.pYp;
            this.dropPuzzleCount++;
            TweenMax.from(this.puzzleArray[z][i][1],0.2,{y:tagerY,onComplete:(function () {
                this.dropPuzzleCount--;
                if(this.dropPuzzleCount == 0){
                    this.newCheckNextItemBlock();
                }
            }).bind(this)})
        }
    }
}

//블록 재생
gc.GamePlayPage.prototype.reDarwPuzzle = function () {

    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0] == 0)
            this.gameBaceContiner.removeChild(this.puzzleArray[i][j][1]);
        }
    }

    for(var i=0;i<7;i++){
        var num =0;
        for(var j=5;j>=0;j--){
            if(num >0 && this.puzzleArray[j][i][0] != 0){
                this.puzzleArray[j+num][i][0] = this.puzzleArray[j][i][0];

                var toY = this.puzzleArray[j+num][i][1].y;
                this.puzzleArray[j+num][i][1] = this.puzzleArray[j][i][1];
                this.puzzleArray[j+num][i][1].alpha = 1;
                this.puzzleArray[j+num][i][2] = this.puzzleArray[j][i][2];
                this.dropPuzzleCount++;
                TweenMax.to(this.puzzleArray[j][i][1],0.2,{y:toY,
                    onComplete:(function () {
                        this.dropPuzzleCount--;
                        if(this.dropPuzzleCount == 0){
                            this.dropPuzzleOver();
                        }
                    }).bind(this)})
            }

            if(this.puzzleArray[j][i][0] == 0){
                num++;
            }
        }

        for(var z=0;z<num;z++){
            var count = 90;
            if(this.stageStoneBlockNum <0){
                this.stageStoneBlockNum = 0;
            }

            var puzzletype = 0;
            if(this.stageStoneBlockNum < this.stoneBlockArray[this.stageNum]){
                var val = this.stageStonBlockChance[this.stageNum];
                if(Math.random()*100 < 100 - val){

                    //puzzletype = this.randomBlockArray[Math.floor(Math.random()*100) % count +1];
                    puzzletype = Math.floor(Math.random()*100)%5+1;
                    //if(puzzletype == 4){
                    //    puzzletype = Math.floor(Math.random()*100)%3+1;
                    //}
                }else{
                    var randNum = Math.random()*100;
                    if(randNum <= this.stageBlockTypeArray[this.stageNum][0]){
                        puzzletype = 15;
                    }else if(randNum <= this.stageBlockTypeArray[this.stageNum][1]){
                        puzzletype = 16;
                    }else if(randNum <= this.stageBlockTypeArray[this.stageNum][2]){
                        puzzletype = 17;
                    }else if(randNum <= this.stageBlockTypeArray[this.stageNum][3]){
                        puzzletype = 18;
                    }
                }
            }else{
                //puzzletype = this.randomBlockArray[Math.floor(Math.random()*100) % count +1];

                puzzletype = Math.floor(Math.random()*100)%5+1;
                //if(puzzletype == 4){
                //    puzzletype = Math.floor(Math.random()*100)%3+1;
                //}
            }

            if(puzzletype >14){
                this.stageStoneBlockNum++;
            }

            if(puzzletype == 0)
                puzzletype = 1;
            this.puzzleArray[z][i][0] = puzzletype;
            if(puzzletype > 5){
                this.puzzleArray[z][i][1] = PIXI.Sprite.fromFrame("block_000" + puzzletype + ".png");
            }else {
                this.puzzleArray[z][i][1] = PIXI.Sprite.fromFrame(this.blockNameArray[this.stageNum] + puzzletype + ".png");
            }
            this.puzzleArray[z][i][1].anchor.set(0.5,0.5);
            if(i%2 == 0){
                this.puzzleArray[z][i][1].y = this.sPuzzleStartY + z*this.pYp;
            }else{
                this.puzzleArray[z][i][1].y = this.dPuzzleStartY + z*this.pYp;
            }
            this.puzzleArray[z][i][1].x = this.puzzleStartX + i*this.pXp;
            this.gameBaceContiner.addChild(this.puzzleArray[z][i][1]);

            this.puzzleArray[z][i][1].alpha = 1;
            this.puzzleArray[z][i][2] = 0;
            var tagerY = this.puzzleArray[z][i][1].y - (num+1)*this.pYp;
            if(gc.isLowPhone) {
                if (i % 2 == 0) {
                    tagerY = this.sPuzzleStartY - this.pYp;
                } else {
                    tagerY = this.dPuzzleStartY - this.pYp;
                }
            }
            this.dropPuzzleCount++;
            TweenMax.from(this.puzzleArray[z][i][1],0.2,{y:tagerY,onComplete:(function () {
                this.dropPuzzleCount--;
                if(this.dropPuzzleCount == 0){
                    this.dropPuzzleOver();
                }
            }).bind(this)})
        }
    }
}

/**
 * 게임 오버 팝업띄우기
 */
gc.GamePlayPage.prototype.gameOverPopupAnimation = function () {
    this.addChild(this.popUp);
    this.popUp.showPopup(4);
}

gc.GamePlayPage.prototype.showStageTunrPlusAnimation = function () {
    this.newStageChange();
}

gc.GamePlayPage.prototype.newShowTurnPlusBring = function () {
    var sprite = PIXI.Sprite.fromFrame("special1_effect_0008.png");
    sprite.anchor.set(0.5);
    sprite.x = 50;
    sprite.y = 100;
    this.addChild(sprite);
    TweenMax.to(sprite,0.2,{alpha:0.2,onComplete:(function(){
        this.removeChild(sprite);
        sprite = null;
    }).bind(this),onCompleteParams:[sprite]});
}

gc.GamePlayPage.prototype.newStageChange = function () {
    if(this.stageNum == 14){
        this.totalScore += this.turnCount*1111;
        this.scoreNumberText.valueTween(this.totalScore);

        TweenMax.killAll(false);
        gc.flag = 0;
        GD.soundAllStop();
        clearInterval(this.guidTime);
        this.messageText.stopAllTime();
        this.removeChild(this.messageText);
        if(!gc.isLowPhone)
            this.building.stopInterval();
        this.gameStared = false;

        this.showEndingPage();
        return;
    }
    this.totalClear = this.stageTurnNum[this.stageNum];
    this.totalClearBlockNum = 0;
    this.totalFlag = this.stageTurnNum[this.stageNum] + this.stageTurnNum[this.stageNum+1];
    if(!gc.isLowPhone)
        this.building.resetBudingTexture(this.stageNum);

    var string = this.randMarkArray[this.stageNum]+".png";
    if(!gc.isLowPhone) {
        this.topBG.texture = PIXI.Texture.fromFrame(string);
    }else{
        //this.topLowBG.texture = PIXI.Texture.fromFrame("stage_"+this.stageNum+".png");
        this.topLowBG.texture = GD.loader.resources["stage"+this.stageNum].texture;
    }
    if(!gc.isLowPhone)
        this.gameEarth.texture = PIXI.Texture.fromFrame(this.groundArray[this.stageNum]+".png");

    var num = Math.floor((this.stageNum+1)/2);
    this.normalAnimation.state.setAnimation(0,'normal_'+num,true,0);
    this.normalAnimation.skeleton.setToSetupPose();

    this.moveNumber.fileName = 'ui_move1_';
    try {
        this.moveLineContainer.removeChildren();
        this.move5CountPopup.flag = false;
    }catch(e){

    }

    this.turnBarMask.x = -500;
    this.turnBarRod.x = this.turnBarMask.x + 610;

    this.addChild(this.popUp);
    this.popUp.showPopup(1);

}

gc.GamePlayPage.prototype.newClearStage = function () {
    this.setTurnCountFlag(false);

    if(this.stageNum == 14){
        var num = Math.ceil((this.stageNum)/2)-1;
        this.totalScore += this.stageClearBonusSocre[num];
        this.scoreNumberText.valueTween(this.totalScore);

        this.gameStageClearPopup.show(this.countryClearPlusVal[num],this.stageClearBonusSocre[num]);
        TweenMax.from(this.gameStageClearPopup.bg.scale,0.5,{x:0.2,y:0.2});
        TweenMax.to(this.gameStageClearPopup,2.5,{alpha:1,onComplete:(function () {
            this.gameStageClearPopup.remove();
            this.addChild(this.popUp);
            this.popUp.showPopup(2);
        }).bind(this)});
        return;
    }

    if(this.stageNum%2 == 1){
        this.stageNum++;
        this.totalClear +=  this.stageTurnNum[this.stageNum];
        //this.building.resetBudingTexture(this.stageNum);

        //var string = this.randMarkArray[this.stageNum]+".png";
        //this.topBG.texture = PIXI.Texture.fromFrame(string);
        //this.gameEarth.texture = PIXI.Texture.fromFrame(this.groundArray[this.stageNum]+".png");
        this.moveNumber.fileName = 'ui_move1_';
        this.moveNumber.setValue(this.turnCount);
        this.changeStageBGAnimation();

        this.gameBaceContiner.interactive = true;
        this.setTurnCountFlag(true);
    }else{
        this.stageNum++;

        this.turnBar.scale.x = 1;
        this.turnBarRod.x = this.turnBarMask.x + 610;

        TweenMax.killAll(true);
        this.buildingMoveBlockNum = 0;

        var num = Math.ceil((this.stageNum-1)/2)-1;
        this.totalScore += this.stageClearBonusSocre[num];
        this.scoreNumberText.valueTween(this.totalScore);

        this.turnCount += this.countryClearPlusVal[num];
        this.moveNumber.fileName = 'ui_move1_';
        this.moveNumber.setValue(this.turnCount);

        this.gameStageClearPopup.show(this.countryClearPlusVal[num],this.stageClearBonusSocre[num]);
        if(gc.soundFlag && !gc.deviceStopFlag){
            GD.soundPlay("sound_camera");
        }
        if(gc.isLowPhone){
            //TweenMax.from(this.gameStageClearPopup.bg.scale, 0.5, {x: 1, y: 1});
            //TweenMax.to(this.gameStageClearPopup, 2, {
            //    alpha: 1, onComplete: (function () {
            //        this.gameStageClearPopup.remove();
            //        this.popupCloseCallBack(2);
            //    }).bind(this)
            //});

            setTimeout((function () {
                this.gameStageClearPopup.remove();
                this.popupCloseCallBack(2);
            }).bind(this),2000);
        }else {
            TweenMax.from(this.gameStageClearPopup.bg.scale, 0.5, {x: 0.2, y: 0.2});
            TweenMax.to(this.gameStageClearPopup, 2.5, {
                alpha: 1, onComplete: (function () {
                    this.gameStageClearPopup.remove();
                    this.popupCloseCallBack(2);
                }).bind(this)
            });
        }

        //this.addChild(this.popUp);
        //this.popUp.showPopup(2);
    }
}

gc.GamePlayPage.prototype.changeStageBGAnimation = function () {

    if(!gc.isLowPhone) {
        TweenMax.to(this.building, 1, {alpha: 0.3, ease: Linear.easeInOut});
        TweenMax.to(this.topBG, 1, {alpha: 0.3, ease: Linear.easeInOut});
        TweenMax.to(this.gameEarth, 1, {
            alpha: 0.3, onComplete: (function () {
                this.building.resetBudingTexture(this.stageNum);
                var string = this.randMarkArray[this.stageNum] + ".png";
                this.topBG.texture = PIXI.Texture.fromFrame(string);
                this.gameEarth.texture = PIXI.Texture.fromFrame(this.groundArray[this.stageNum] + ".png");
                this.building.alpha = 0.3;
                this.topBG.alpha = 0.3;
                this.gameEarth.alpha = 0.3;
                TweenMax.to(this.building, 1, {alpha: 1, ease: Linear.easeInOut});
                TweenMax.to(this.topBG, 1, {alpha: 1, ease: Linear.easeInOut});
                TweenMax.to(this.gameEarth, 1, {alpha: 1, ease: Linear.easeInOut});
            }).bind(this), ease: Linear.easeInOut
        });
    }else{
        this.topLowBG.texture = GD.loader.resources["stage"+this.stageNum].texture;
    }

}

/**
 * 스테지 클리어했을때 그에 맏는 팝업 띄우기
 */
gc.GamePlayPage.prototype.clearStage = function () {
    this.setTurnCountFlag(false);
    this.test.inGuied = true;
    if(!gc.isLowPhone) {
        this.building.stopInterval();
        this.building.setBuildingRotation();
    }
    if(!this.itemBombOver) {
        this.messageText.showMessage = false;
        this.removeChild(this.messageText);

        if(this.turnCount<0)
            this.turnCount = 0;
        try {
            this.moveLineContainer.removeChildren();
            this.move5CountPopup.flag = false;
        }catch(e){

        }
        this.moveNumber.fileName = 'ui_move1_';
        this.moveNumber.setValue(this.turnCount);
        var num = Math.floor((this.stageNum+1)/2);
        this.karictorContainer.removeChildren();
        this.normalAnimation.state.setAnimation(0,'normal_'+num,true,0);
        this.normalAnimation.skeleton.setToSetupPose();

        this.clearAniSpine.state.setAnimation(0,'cha_clear_'+num,true,0);
        this.clearAniSpine.skeleton.setToSetupPose();

        this.karictorContainer.addChild(this.clearAniSpine);

        var flag = false;
        for(var i=0;i<6;i++){
            for(var j=0;j<7;j++){
                if(this.puzzleArray[i][j][0] > 5 && this.puzzleArray[i][j][0]<14){
                    flag = true;
                    break;
                }
            }
        }

        if(flag || this.turnCount >= this.feverTurnCount) {
            this.addChild(this.popUp);
            this.popUp.showPopup(5);
        }else{
            this.addChild(this.popUp);
            var type = 0;
            if(this.stageNum%2==0){
                type = 3;
            }else{
                type = 2;
            }
            this.popUp.showPopup(type);
        }
    }else{
        this.gameOverItemBomb();
    }
}

gc.GamePlayPage.prototype.showItemLine = function () {
    this.itemLineEffectContainer.removeChildren();
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0] > 5 && this.puzzleArray[i][j][0] < 14){
                var sprite = null;
                if(this.puzzleArray[i][j][0]%2 == 0){
                    sprite = new gc.MovieClip('special1_effect_000',1,9,0.2,0);
                }else{
                    sprite = new gc.MovieClip('special2_effect_000',1,9,0.2,0);
                }
                sprite.anchor.set(0.5,0.5);
                sprite.x = this.puzzleArray[i][j][1].x;
                sprite.y = this.puzzleArray[i][j][1].y;
                this.itemLineEffectContainer.addChild(sprite);
            }
        }
    }
}

gc.GamePlayPage.prototype.gameover = function () {
    var num = Math.floor((this.stageNum+1)/2);
    this.failAniSpine.state.setAnimation(0,'cha_fail_'+num,false,0);
    this.failAniSpine.skeleton.setToSetupPose();

    this.karictorContainer.removeChildren();
    this.karictorContainer.addChild(this.failAniSpine);

    this.turnCount = 0;
    this.moveNumber.setValue(this.turnCount);
    if(!gc.isLowPhone) {
        this.building.stopInterval();
    }
    this.gameOverPopupAnimation();
}

//블록 재생 오브 및 드래그 여부 체크 장애 블록 체크
gc.GamePlayPage.prototype.dropPuzzleOver = function () {

    if(this.itemSelectedArray.length > 0){
        this.newCheckNextItemBlock();
        return;
    }

    if(true) {
        var flag = this.checkDragPuzzle();
        //flag = false;
        if (flag) {
            if(this.turnCount < 0){
                this.turnCount = 0;
            }
            this.moveNumber.setValue(this.turnCount);

            if(this.totalClearBlockNum < this.totalClear){
                TweenMax.to(this.turnBarMask,0.1,{x:500*this.totalClearBlockNum/this.totalFlag-500,onUpdate:(function () {
                    this.turnBarRod.x = this.turnBarMask.x + 610;
                }).bind(this)});
            }else{
                if(this.stageNum%2 == 1){
                    TweenMax.to(this.turnBarMask, 0.1, {
                        x: 500*this.totalClearBlockNum/this.totalFlag-500, onUpdate: (function () {
                            this.turnBarRod.x = this.turnBarMask.x + 610;
                        }).bind(this), onComplete: (function () {
                            this.newClearStage();
                            //this.overFlag.stop();
                        }).bind(this)
                    });
                }else {
                    //this.overFlag.play();
                    TweenMax.to(this.turnBarMask, 0.1, {
                        x: 0, onUpdate: (function () {
                            this.turnBarRod.x = this.turnBarMask.x + 610;
                        }).bind(this), onComplete: (function () {
                            this.newClearStage();
                            //this.overFlag.stop();
                        }).bind(this)
                    });
                }
                return;
            }

            if(this.turnCount<=0){
                var num = Math.floor((this.stageNum+1)/2);
                this.failAniSpine.state.setAnimation(0,'cha_fail_'+num,false,0);
                this.failAniSpine.skeleton.setToSetupPose();

                this.karictorContainer.removeChildren();
                this.karictorContainer.addChild(this.failAniSpine);

                this.turnCount = 0;
                this.moveNumber.setValue(this.turnCount);
                if(!gc.isLowPhone) {
                    this.building.stopInterval();
                }
                this.gameOverPopupAnimation();
            }else {
                this.test.inGuied = false;
                this.guiedTime = new Date().getTime();
                this.gameBaceContiner.interactive = true;
                this.setTurnCountFlag(true);
            }
        } else {
            this.notDragPuzzleReset();
        }
    }else{

        for(var i=0;i<7;i++){
            if(this.puzzleArray[5][i][0] >14){
                var puzzletype = this.puzzleArray[5][i][0];
                this.puzzleArray[5][i][0] = 0;
                this.puzzleArray[5][i][1].alpha = 0;
                //this.turnCount--;
                this.stageStoneBlockNum --;
                var num = 0;
                if(puzzletype == 15){
                    num = 1;
                    this.turnCount --;
                }else if(puzzletype == 16){
                    num = 2;
                    this.turnCount -= 2;
                }else if(puzzletype == 17){
                    num = 3;
                    this.turnCount -= 3;
                }else if(puzzletype == 18){
                    num = 4;
                    this.turnCount -= 4;
                }
                if(this.turnCount < 0){
                    this.turnCount = 0;
                }
                this.moveNumber.setValue(this.turnCount);

                var sprite = new gc.MovieClip('disturb_effect_000',1,7,0.8,1);
                sprite.loop = false;
                sprite.anchor.set(0.5,0.5);
                sprite.x = this.puzzleArray[5][i][1].x;
                sprite.y = this.puzzleArray[5][i][1].y;
                this.gameEffectContiner.addChild(sprite);
                if(gc.soundFlag && !gc.deviceStopFlag)
                GD.soundPlay("sound_block");
                TweenMax.to(sprite,0.5,{alpha:1,onComplete:(function (sprite) {
                    this.gameEffectContiner.removeChild(sprite);
                }).bind(this),onCompleteParams:[sprite]});

                var musSprite = PIXI.Sprite.fromFrame("move_minus000"+num+".png");
                musSprite.anchor.set(0.5,0.5);
                musSprite.x = this.puzzleArray[5][i][1].x;
                musSprite.y = this.puzzleArray[5][i][1].y;
                this.gameEffectContiner.addChild(musSprite);
                TweenMax.to(musSprite,0.5,{y:"-=20",onComplete:(function (musSprite) {
                    this.gameEffectContiner.removeChild(musSprite);
                }).bind(this),onCompleteParams:[musSprite]});

                var musUpSprite = PIXI.Sprite.fromFrame("effect_move_minus.png");
                musUpSprite.anchor.set(0.5,0.5);
                musUpSprite.x = this.puzzleArray[5][i][1].x;
                musUpSprite.y = this.puzzleArray[5][i][1].y;
                musUpSprite.scale.x = 1.2;
                musUpSprite.scale.y = 1.2;
                this.gameEffectContiner.addChild(musUpSprite);
                TweenMax.to(musUpSprite,0.3,{x:GD.width*0.15,y:GD.height*0.1,onComplete:(function (musUpSprite) {
                    this.gameEffectContiner.removeChild(musUpSprite);
                }).bind(this),onCompleteParams:[musUpSprite]});
            }
        }

        var sprite = new gc.MovieClip('disturb_effect_000',1,7,0.8,1);
        sprite.loop = false;
        sprite.anchor.set(0.5,0.5);
        sprite.x = 0;
        sprite.x = 0;
        TweenMax.to(sprite,0.5,{rotation:0,onComplete:(function (sprite) {
            if(this.turnCount <= 5 && !this.itemBombOver){
                try {
                    this.moveNumber.fileName = 'ui_move3_';
                    this.moveLineContainer.removeChildren();
                    this.moveLineContainer.addChild(this.moveLineSpine);
                    if(!this.move5CountPopup.flag){
                        this.move5CountPopup.flag = true;
                        this.move5CountPopupAnimation();
                    }
                }catch(e){

                }
            }
            this.reDarwPuzzle();
        }).bind(this),onCompleteParams:[sprite]});

    }
}
//게임 오브 특수 블록 작동
gc.GamePlayPage.prototype.gameOverItemBomb = function () {
    this.overAnimationFlag = true;
    this.itemBombOver = true;
    this.feverTimeStart = true;
    var itemArray = [];
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0] > 5 && this.puzzleArray[i][j][0]<14){
                itemArray.push([i,j]);
            }
        }
    }

    if(itemArray.length>0){
        this.itemSelectedFun(this.puzzleArray[itemArray[0][0]][itemArray[0][1]][0],[itemArray[0][1],itemArray[0][0]]);
    }else{
        this.randomBomb();
    }
}
//남은 턴수에 의해 랜덤 블록 크리어
gc.GamePlayPage.prototype.randomBomb = function () {
    this.itemBombOver = false;
    if(this.turnCount == 0){
        this.addChild(this.popUp);
        var type = 0;
        if(this.stageNum%2==0){
            type = 3;
        }else{
            type = 2;
        }
        this.popUp.showPopup(type);
        return;
    }

    this.totalScore += this.turnScoreArray[this.stageNum]*this.turnCount;
    this.randomBombCount = Math.floor(this.turnCount/this.feverTurnCount);

    var randomArray = [];
    var randomBombArray = [];
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0] < 6 && this.puzzleArray[i][j][0] > 0 ){
                randomArray.push([i,j]);
            }
        }
    }

    while(true){
        if(randomArray.length <= 0){
            break;
        }
        if(randomBombArray.length < this.randomBombCount){
            var randNum = Math.floor(Math.random()*100)%randomArray.length;
            randomBombArray.push(randomArray.splice(randNum,1));
        }else{
            break;
        }
    }

    if(randomBombArray.length > 0) {
        this.randomBombAnimation(randomBombArray);
    }else{
        this.addChild(this.popUp);
        var type = 0;
        if(this.stageNum%2==0){
            type = 3;
        }else{
            type = 2;
        }
        this.popUp.showPopup(type);
    }
}

//스테지 크리어 및 체인지
//gc.GamePlayPage.prototype.stageChange = function () {
//
//    this.stageChangeRedarwPuzzle();
//
//    if(this.stageNum < 14) {
//
//    }else{
//        this.addChild(this.stageChangePopup);
//        this.stageChangePopup.startMove(Math.floor(this.stageNum/2));
//        return;
//    }
//
//    this.stageNum++;
//    if(this.stageNum%2 == 0){
//        this.stageNum--;
//        this.karictorContainer.removeChildren();
//        this.karictorContainer.addChild(this.normalAnimation);
//        this.daytonightSprite.alpha = 0;
//        var num = Math.ceil(this.stageNum/2);
//        this.daytonightSprite.texture = PIXI.Texture.fromFrame("level_next_000"+num+".png");
//        this.dayAndNightContainer.addChild(this.daytonightSprite);
//        var gameLineBG = PIXI.Sprite.fromFrame("puzzle_line.png");
//        gameLineBG.y = GD.height*0.469;
//        gameLineBG.alpha = 0;
//
//        TweenMax.to(this.daytonightSprite,1,{alpha:1,onComplete:(function (gameLineBG) {
//            //this.dayAndNightContainer.removeChild(gameLineBG);
//            this.reStartGame();
//            this.dayAndNightContainer.removeChild(this.daytonightSprite);
//            this.addChild(this.popUp);
//            this.popUp.showPopup(1);
//        }).bind(this),onCompleteParams:[gameLineBG],ease:Linear.ease});
//    }else{
//        this.stageNum--;
//        this.reStartGame();
//        this.addChild(this.stageChangePopup);
//        this.stageChangePopup.startMove(Math.floor(this.stageNum/2));
//    }
//}

/**
 * 스테지 체인지 에니메이션 오버 팝업띄우기
 */
gc.GamePlayPage.prototype.stageChangeOver = function () {
    //this.removeChild(this.stageChangePopup);
    this.addChild(this.popUp);
    if(this.stageNum%2 == 0){
        this.popUp.showPopup(1);
    }else{
        this.popUp.showPopup(6);
    }
}

/**
 * 앤딩 페이지 띄우기
 */
gc.GamePlayPage.prototype.showEndingPage = function () {
    //this.removeChild(this.stageChangePopup);
    this.addChild(this.endingPage);
    this.endingPage.showChaAniamtion();
}

gc.GamePlayPage.prototype.scoreSave = function () {
    gc.soundBt.x = GD.width+500;

    if(gc.game_idx != null) {
    //    console.log(gc.gameType,this.totalScore,this.stageNum);
        NetworkManager.sendData2("gameScoreSave", {
            "gameId": gc.gameId,"type":gc.gameType,"score":this.totalScore,"stage":this.stageNum,"game_idx":gc.game_idx,"start_datetime":gc.startDatetime
        },this.saveScoreResult,this);
    }

    this.loadingShow();
    /*GamePocket.Sdk.Ranking.addMyScore(this.totalScore, (function(response) {
        this.loadingHide();
        if (response.code === GamePocket.Sdk.ResponseCode.SUCCESS) {
            var ranking = response.result;
            //console.log("랭킹을 남긴 사용자 수 : " + ranking.countOfAllUsers);
            //console.log("" + ranking.percentile);
            //console.log("" + ranking.group);
            //console.log("" + ranking.groupIcon);
            //console.log("" + ranking.score);
            this.showResultPopup(this.totalScore,ranking.score,"",ranking.groupIcon,1);
        } else {
            if(response.code == GamePocket.Sdk.ResponseCode.NOT_FOUND_GAME || response.code == GamePocket.Sdk.ResponseCode.NO_AUTHENTICATION){
                this.showResultPopup(this.totalScore,0,0,"DIAMOND",2,2);
            }else{
                this.showResultPopup(this.totalScore,0,0,"DIAMOND",2,1);
            }
            //console.log(response.code);
        }   //fail process
    }).bind(this));*/

    //this.showResultPopup(this.totalScore,100000,10,"DIAMOND",1,2);
    return;


    this.loadingShow();
    if(gc.localTest)
    {
        var data = {};
        data.result = {};
        data.result.endInfo = {};
        data.result.endInfo.nowScore = this.totalScore;
        data.result.endInfo.maxScore = this.totalScore + 9500;
        data.result.endInfo.myRank = 10000;
        data.result.endInfo.playOpportunity = 1;

        this.scoreSaveResult(data);
        return;
    }

    //var score = 1000;
    NetworkManager.sendData("scoreSave", { playSeq:gc.playSeq, score:this.totalScore,gameId:GD.gameId}, this.scoreSaveResult, this);
};

gc.GamePlayPage.prototype.saveScoreResult = function (data) {
    gc.gameType = 1;
};

gc.GamePlayPage.prototype.showResultPopup = function(score,maxScore,percent,group,type,message){
    //console.log(score,maxScore,percent);
    this.resultBox.init(score,maxScore,percent,group,type,message);
    this.addChild(this.resultBox);
};

gc.GamePlayPage.prototype.scoreSaveResult = function(receiveData){

    this.loadingHide();

    this.resultBox.init(receiveData.result.endInfo.nowScore, receiveData.result.endInfo.maxScore, receiveData.result.endInfo.myRank, receiveData.result.endInfo.playOpportunity);
    this.addChild(this.resultBox);

    console.log("scoreSaveResult===result data === "+receiveData);

}

/**
 * 피버타임 에니메이션 오버
 * @param array 랜덤으로 터드리는 퍼즐
 */
gc.GamePlayPage.prototype.randomBombAnimationOver = function (array) {
    for(var i=0;i<array.length;i++){
        var bombEffect = new gc.MovieClip('puzzle_effect_000',1,15,1,0);
        bombEffect.loop = false;
        bombEffect.anchor.set(0.5,0.5);
        this.puzzleArray[array[i][0][0]][array[i][0][1]][1].alpha = 0;
        bombEffect.x = this.puzzleArray[array[i][0][0]][array[i][0][1]][1].x;
        bombEffect.y = this.puzzleArray[array[i][0][0]][array[i][0][1]][1].y;
        this.gameEffectContiner.addChild(bombEffect);

        var score = new gc.NumberText('ui_puzzle_000','center',0);
        score.x = this.puzzleArray[array[i][0][0]][array[i][0][1]][1].x;
        score.y = this.puzzleArray[array[i][0][0]][array[i][0][1]][1].y-5;
        score.setValue(this.turnScoreArray[this.stageNum]);
        this.topUIContainer.addChild(score);

        //***************
        this.scoreNumberText.valueTween(this.totalScore);

        TweenMax.to(score,0.3,{delay:0.5,alpha:0.5,y:"-=20",onComplete:(function (score) {
            this.topUIContainer.removeChild(score);
        }).bind(this),onCompleteParams:[score],onStart:(function (bombEffect) {
            this.gameEffectContiner.removeChild(bombEffect);
        }).bind(this),onStartParams:[bombEffect]});

        if(i==array.length-1){
            TweenMax.to(bombEffect,0.8,{alpha:1,onComplete:(function () {
                this.gameEffectContiner.removeChildren();
                this.addChild(this.popUp);
                var type = 0;
                if(this.stageNum%2==0){
                    type = 3;
                }else{
                    type = 2;
                }
                this.popUp.showPopup(type);
            }).bind(this)});
        }else{
            TweenMax.to(bombEffect,0.8,{alpha:1});
        }
    }
    if(gc.soundFlag && !gc.deviceStopFlag)
    GD.soundPlay("sound_puzzle");
}

/**
 * 게임 오브 블록 랜덤 터지는 에니메이션
 * @randomBombArray 랜덤으로 선택된 블록 배열
 * @param randomBombArray
 */

gc.GamePlayPage.prototype.randomBombAnimation = function (randomBombArray) {

    for(var i=0;i<randomBombArray.length;i++){
        //this.totalScore += 100;

        var effect = null;
        effect = PIXI.Sprite.fromFrame("puzzle_effect_0001.png");
        effect.anchor.set(0.5,0.5);
        effect.x = this.puzzleArray[randomBombArray[i][0][0]][randomBombArray[i][0][1]][1].x;
        effect.y = this.puzzleArray[randomBombArray[i][0][0]][randomBombArray[i][0][1]][1].y;
        if(i == randomBombArray.length-1){
            TweenMax.from(effect,1,{delay:0.1*i,x:GD.width*0.1,y:GD.height*0.18,onComplete:(function (effect) {
                this.gameEffectContiner.removeChildren();
                this.randomBombAnimationOver(randomBombArray);
            }).bind(this),onCompleteParams:[effect],onStart:(function (effect) {
                if(gc.soundFlag && !gc.deviceStopFlag)
                GD.soundPlay("sound_puzzle");
                this.turnCount -= this.feverTurnCount;
                if(this.turnCount < 0)
                    this.turnCount = 0;
                this.moveNumber.setValue(this.turnCount);
                this.gameEffectContiner.addChild(effect);
            }).bind(this),onStartParams:[effect]});
        }else{
            TweenMax.from(effect,1,{delay:0.1*i,x:GD.width*0.1,y:GD.height*0.18,onStart:(function (effect) {
                if(gc.soundFlag && !gc.deviceStopFlag)
                GD.soundPlay("sound_puzzle");
                this.turnCount -= this.feverTurnCount;
                if(this.turnCount < 0)
                    this.turnCount = 0;
                this.moveNumber.setValue(this.turnCount);
                this.gameEffectContiner.addChild(effect);
            }).bind(this),onStartParams:[effect]});
        }
    }
}

/**
 * 장애블록 맨아래있는지 체크
 * @returns {boolean}
 */
gc.GamePlayPage.prototype.checkStoneBlockDrop = function () {
    var flag = false;
    for(var i=0;i<7;i++){
        if(this.puzzleArray[5][i][0] >14){
            return true;
        }
    }
    return flag;
};

gc.GamePlayPage.prototype.shuffleAnimation = function () {

    var puzzle = null,shuffleList = [];
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            puzzle = this.puzzleArray[i][j][1];
            if(j%2 == 0){
                puzzle.y = this.sPuzzleStartY + i*this.pYp;
            }else{
                puzzle.y = this.dPuzzleStartY + i*this.pYp;
            }
            puzzle.x = this.puzzleStartX + j* this.pXp;
            shuffleList.push(puzzle);
        }
    }
    TweenMax.from(shuffleList,0.5,{x:this.puzzleArray[3][3][1].x,y:this.puzzleArray[3][3][1].y,onComplete:(function () {
        this.gameTopEffectContiner.removeChildren();
        this.dropPuzzleOver();
    }).bind(this)});
};

/**
 * 드래그 될수있는 블록 조합이 없을때 블록 재생
 */
gc.GamePlayPage.prototype.notDragPuzzleReset = function () {
    this.gameBaceContiner.interactive = false;
    var sprite = PIXI.Sprite.fromFrame("ui_notice.png");
    sprite.anchor.set(0.5,0.5);
    sprite.x = GD.width/2;
    sprite.y = GD.height * 0.7;
    this.gameTopEffectContiner.addChild(sprite);

    var shuffleList = [];
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(gc.isLowPhone) {
                this.puzzleArray[i][j][1].visible = false;
                if (this.puzzleArray[i][j][0] < 6) {
                    var puzzletype = Math.floor(Math.random() * 100) % 5 + 1;
                    this.puzzleArray[i][j][0] = puzzletype;
                    this.puzzleArray[i][j][1].texture = new PIXI.Texture.fromFrame(this.blockNameArray[this.stageNum] + puzzletype + ".png");
                }
            }else{
                shuffleList.push(this.puzzleArray[i][j][1]);
            }
        }
    }

    if(gc.isLowPhone) {
        TweenMax.delayedCall(1,(function () {
            for(var i=0;i<6;i++){
                for(var j=0;j<7;j++){
                    this.puzzleArray[i][j][1].visible = true;
                }
            }
            this.gameTopEffectContiner.removeChildren();
            this.dropPuzzleOver();
        }).bind(this));
        //setTimeout((function () {
        //    for(var i=0;i<6;i++){
        //        for(var j=0;j<7;j++){
        //            this.puzzleArray[i][j][1].alpha = 1;
        //        }
        //    }
        //    this.gameTopEffectContiner.removeChildren();
        //    this.dropPuzzleOver();
        //}).bind(this),1000);
    }else{
        TweenMax.to(shuffleList,0.5,{x:this.puzzleArray[3][3][1].x,y:this.puzzleArray[3][3][1].y,delay:0.5,onComplete:(function () {
            for (var i = 0; i < 6; i++) {
                for (var j = 0; j < 7; j++) {
                    //this.puzzleArray[i][j][1].alpha = 0;
                    if (this.puzzleArray[i][j][0] < 6) {
                        var puzzletype = Math.floor(Math.random() * 100) % 5 + 1;
                        this.puzzleArray[i][j][0] = puzzletype;
                        this.puzzleArray[i][j][1].texture = new PIXI.Texture.fromFrame(this.blockNameArray[this.stageNum] + puzzletype + ".png");
                    }
                }
            }
            this.shuffleAnimation();
        }).bind(this)});
    }
};
/**
 * 드래그된 블록을 그리기
 */
gc.GamePlayPage.prototype.drawDragPuzzle = function () {

    if(!this.turnCountFlag){
        return;
    }

    if(this.dragedArray.length >= 3){
        this.setTurnCountFlag(false);
        this.itemLineEffectContainer.removeChildren();
        this.test.inGuied = true;
        this.turnCount--;
        if(this.turnCount < 0){
            this.turnCount = 0;
        }
        if(this.turnCount <= 5){
            try {
                this.moveNumber.fileName = 'ui_move3_';
                this.moveLineContainer.removeChildren();
                this.moveLineContainer.addChild(this.moveLineSpine);
                if(!this.move5CountPopup.flag){
                    this.move5CountPopup.flag = true;
                    this.move5CountPopupAnimation();
                }
            }catch(e){

            }
        }
        this.moveNumber.setValue(this.turnCount);

        this.buildingMoveBlockNum += this.dragedArray.length;
        this.changeBuildingMoveTime(1);

        this.gameBaceContiner.interactive = false;
        this.copyDrageArray = [];
        for(var i=0;i<this.dragedArray.length;i++){
            var num = this.dragedArray[i][0];
            var array = [num,this.dragedArray[i]];
            this.copyDrageArray.push(array);
            var puzzle = null;

            if(this.blockCallBackLists.length > 0){
                puzzle = this.blockCallBackLists.shift();
                if(num >5){
                    puzzle.texture = PIXI.Texture.fromFrame("block_000"+this.dragedArray[i][0]+".png");
                }else{
                    puzzle.texture = PIXI.Texture.fromFrame(this.blockNameArray[this.stageNum]+this.dragedArray[i][0]+".png");
                }
            }else{
                if(num >5){
                    puzzle = PIXI.Sprite.fromFrame("block_000"+this.dragedArray[i][0]+".png");
                }else{
                    puzzle = PIXI.Sprite.fromFrame(this.blockNameArray[this.stageNum]+this.dragedArray[i][0]+".png");
                }
            }


            //if(num >5){
            //    puzzle = PIXI.Sprite.fromFrame("block_000"+this.dragedArray[i][0]+".png");
            //}else{
            //    puzzle = PIXI.Sprite.fromFrame(this.blockNameArray[this.stageNum]+this.dragedArray[i][0]+".png");
            //}
            puzzle.anchor.set(0.5,0.5);
            puzzle.x = this.dragedArray[i][1].x ;
            puzzle.y = this.dragedArray[i][1].y ;
            var mergArray = [];
            mergArray.push(puzzle);
            mergArray.push(num);
            this.gameMergeAniContiner.addChildAt(puzzle,0);
            this.mergeDragedArray.push(mergArray);
        }

        this.puzzleMergeAnimation();
    }
}
/**
 * 드래그된 블록수에 의해 특수 블록 생성
 * @param type  블록 타입
 */
gc.GamePlayPage.prototype.changeDragBlock = function (type) {
    if(type > 1){
        var blockType = this.copyDrageArray[0][0]*2+2+type;
        if(blockType == 10)
        {
            var randomNum = Math.floor(Math.random()*20)%3+1;
            var point = this.getTouchPosition(this.copyDrageArray[this.copyDrageArray.length - 1][1][1]);
            if(point[1] == 5 && point[0] == 0){
                randomNum = 1;
            }else if(point[1] == 5 && point[6] == 0){
                randomNum = 1;
            }
            this.copyDrageArray[this.copyDrageArray.length - 1][1][0] = blockType;
            this.copyDrageArray[this.copyDrageArray.length - 1][1][1].texture = new PIXI.Texture.fromFrame("block_000" + blockType + ".png");
            this.copyDrageArray[this.copyDrageArray.length - 1][1][1].alpha = 1;
            this.copyDrageArray[this.copyDrageArray.length - 1][1][2] = randomNum;
            this.itemSelectedArray.push(this.copyDrageArray[this.copyDrageArray.length - 1][1][1]);
        }else {
            this.copyDrageArray[this.copyDrageArray.length - 1][1][0] = blockType;
            this.copyDrageArray[this.copyDrageArray.length - 1][1][1].texture = new PIXI.Texture.fromFrame("block_000" + blockType + ".png");
            this.copyDrageArray[this.copyDrageArray.length - 1][1][1].alpha = 1;
            this.itemSelectedArray.push(this.copyDrageArray[this.copyDrageArray.length - 1][1][1]);
        }
    }else{

    }
}
/**
 * 드래그된 블록수에 의해 특수 블록 생성
 */
gc.GamePlayPage.prototype.drawDragItem = function () {
    if(this.overAnimationFlag)
        return;
    if(this.copyDrageArray[0][0] == 5){
        var size = Math.floor(this.copyDrageArray.length/3);

        if(size > 5){
            size =5;
        };
        var lenght = this.copyDrageArray.length-1;
        var position = this.getTouchPosition(this.copyDrageArray[lenght][1][1]);
        this.showTurnPlusAnimation(position[1],position[0],size);

        for(var i=this.copyDrageArray.length-1;i>this.copyDrageArray.length-1-size;i--){
            this.copyDrageArray[i][1][0] = 0;
            this.copyDrageArray[i][1][1].alpha = 0;
        }
    }else{
        if(this.copyDrageArray.length >= 8){
            this.goldLevelClearCount++;
            this.changeDragBlock(3);
        }else if(this.copyDrageArray.length >= 5){
            this.changeDragBlock(2);
        }else{
            this.changeDragBlock(1);
        }
    }
}

/**
 * 배경 건물 움직이는 에니메이션
 * @param type  1 블록 클리어 0 일반 므부
 */
gc.GamePlayPage.prototype.changeBuildingMoveTime = function (type) {

    if(this.feverTimeStart){
        return;
    }

    if(!gc.isLowPhone)
        this.building.stopInterval();
    if(type == 1) {

        var num = Math.ceil(this.stageNum/2);
        this.animation.state.setAnimation(0,'flag_'+num,true,0);
        this.animation.skeleton.setToSetupPose();

        this.karictorContainer.removeChildren();
        this.karictorContainer.addChild(this.animation);

        if(!gc.isLowPhone) {
            this.building.resetTime(200 - this.buildingMoveBlockNum * 30);
            this.building.startMove();
        }
    }else{

        var num = Math.ceil(this.stageNum/2);
        this.karictorContainer.removeChildren();
        this.normalAnimation.state.setAnimation(0,'normal_'+num,true,0);
        this.normalAnimation.skeleton.setToSetupPose();
        this.karictorContainer.addChild(this.normalAnimation);

        if(!gc.isLowPhone)
            this.building.resetTime(1000);
        //this.building.startMove();
    }
}

/**
 * 특수 퍼즐이 터졌을때 위 캐릭터 탑승 에니메이션
 * @param type  퍼즐 유형 1 비행기 2 핼기 3 배 4 기차
 * @param delayTime     에니메이션 디렛한 시간
 */
gc.GamePlayPage.prototype.meansOfTransportAnimation = function (type,delayTime) {

    if(gc.isLowPhone)return;

    if(this.itemBombOver){
        return;
    }

    this.topImgType = type;
    if(type == 1){
        this.animation.visible = false;
        var sprite = new gc.MovieClip('special_airplane_ani',2,2,0.5,10);
        sprite.anchor.set(0.5,0.5);
        sprite.x = GD.width/2;
        sprite.y = GD.height*0.2;
        this.gameTransportContianer.addChild(sprite);
        TweenMax.to(sprite,0.4,{y:GD.height*0.1,onComplete:(function (sprite) {
            TweenMax.to(sprite,0.4,{delay:0.2,y:GD.height*0.2,onStart:(function () {
            }).bind(this),onComplete:(function (sprite) {
                this.animation.visible = true;
                this.gameTransportContianer.removeChild(sprite);
            }).bind(this),onCompleteParams:[sprite],ease:Linear.easeInOut})
        }).bind(this),onCompleteParams:[sprite],ease:Linear.easeInOut});
    }else if(type == 2){
        var sprite = new gc.MovieClip('special_helicopter_ani',3,4,0.5,10);
        sprite.anchor.set(0.5,0.5);
        sprite.x = GD.width/2;
        sprite.y = GD.height*0.2;
        this.gameTransportContianer.addChild(sprite);
        this.animation.visible = false;
        TweenMax.to(sprite,0.5,{y:GD.height*0.1,onComplete:(function (sprite) {
            TweenMax.to(sprite,0.5,{delay:0.2,y:GD.height*0.2,onStart:(function () {
            }).bind(this),onComplete:(function (sprite) {
                this.animation.visible = true;
                this.gameTransportContianer.removeChild(sprite);
            }).bind(this),onCompleteParams:[sprite],ease:Linear.easeInOut})
        }).bind(this),onCompleteParams:[sprite],ease:Linear.easeInOut});
    }else if(type == 3){
        var sprite = new gc.MovieClip('special_boat_ani',1,2,0.2,10);
        sprite.anchor.set(0.5,0.5);
        sprite.y = GD.height*0.2+100;
        sprite.x = -sprite.width/2;
        sprite.rotation = -Math.PI/12;
        this.gameTransportContianer.addChild(sprite);
        TweenMax.to(sprite,0.2,{rotation:0,bezier:[{x:GD.width/4,y:GD.height*0.19+50},
            {x:GD.width/2,y:GD.height*0.21}],x:GD.width/2,onComplete:(function (sprite) {
            sprite.textures = new gc.MovieClip('special_boat_ani',3,4,2,10).textures;
            this.animation.visible = false;
            TweenMax.to(sprite,0.2,{rotation:Math.PI/12,bezier:[{x:GD.width*3/4,y:GD.height*0.19+50},
                {x:GD.width+sprite.width/2,y:GD.height*0.2+100}],
                delay:1.2,x:GD.width+sprite.width,onStart:(function () {
                sprite.textures = new gc.MovieClip('special_boat_ani',1,2,1,10).textures;
                this.animation.visible = true;
            }).bind(this),onComplete:(function (sprite) {
                this.gameTransportContianer.removeChild(sprite);
            }).bind(this),onCompleteParams:[sprite]})
        }).bind(this),onCompleteParams:[sprite]});
    }else if(type == 4){
        var sprite = new gc.MovieClip('special_train_ani',1,3,0.1,10);
        sprite.anchor.set(0.5,0.5);
        sprite.y = GD.height*0.2+100;
        sprite.x = -sprite.width/2;
        sprite.rotation = -Math.PI/12;
        this.gameTransportContianer.addChild(sprite);
        TweenMax.to(sprite,0.2,{rotation:0,bezier:[{x:GD.width/4,y:GD.height*0.19+50},
            {x:GD.width/2,y:GD.height*0.21}],onComplete:(function (sprite) {
            this.animation.visible = false;
            sprite.textures = new gc.MovieClip('special_train_ani',4,5,2,10).textures;
            TweenMax.to(sprite,0.2,{rotation:Math.PI/12,bezier:[{x:GD.width*3/4,y:GD.height*0.19+50},
                {x:GD.width+sprite.width/2,y:GD.height*0.2+100}],
                delay:delayTime-0.2,x:GD.width+sprite.width,onStart:(function () {
                    sprite.textures = new gc.MovieClip('special_train_ani',1,3,1,10).textures;
                    if(this.gameTransportContianer.children.length>1) {
                        if(this.topImgType >2)
                            this.animation.visible = true;
                    }else{
                        this.animation.visible = true;
                    }
            }).bind(this),onComplete:(function (sprite) {
                this.gameTransportContianer.removeChild(sprite);
            }).bind(this),onCompleteParams:[sprite]})
        }).bind(this),onCompleteParams:[sprite],ease:Linear.easeNone});
    }
}

gc.GamePlayPage.prototype.showScoreEffect = function (score,point) {
    if(gc.isLowPhone)return;
    this.scoreEffect.showScore(score,this.puzzleArray[point[1]][point[0]][1].x,this.puzzleArray[point[1]][point[0]][1].y);
};

/**
 * 블록이 선택됬을때 블록 타입에 따라 분기처리
 * @param type  블록 타입 1~5 일반 블록, 6~7 헬기 블록, 8~9 기차 블록, 10~11 배 블록, 12~13 비행기 블록
 * @param point  블록 좌표
 */
gc.GamePlayPage.prototype.itemSelectedFun = function (type,point) {
    this.totalClearBlockNum ++;
    switch (type){
        case 1:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_puzzle");
            this.totalScore += 100;
            this.showScoreEffect(100,point);
            break;
        case 2:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_puzzle");
            this.totalScore += 100;
            this.showScoreEffect(100,point);
            break;
        case 3:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_puzzle");
            this.totalScore += 100;
            this.showScoreEffect(100,point);
            break;
        case 4:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_puzzle");
            this.totalScore += 100;
            this.showScoreEffect(100,point);
            break;
        case 5:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_puzzle");
            this.totalScore += 100;
            this.showScoreEffect(100,point);
            break;
        case 6:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_helicopter");
            this.meansOfTransportAnimation(2,0.2);
            this.buildingMoveBlockNum += this.item6Num;
            this.changeBuildingMoveTime(1);
            this.totalScore += 1111;
            this.showScoreEffect(1111,point);
            this.puzzleArray[point[1]][point[0]][1].alpha = 0;

            var copterBombSprite = null;
            if(this.sixBombEffectLists.length >0){
                copterBombSprite = this.sixBombEffectLists.shift();
            }else{
                copterBombSprite = new gc.MovieClip('special_helicopter',1,3,2,0);
            }
            //var copterBombSprite = new gc.MovieClip('special_helicopter',1,3,2,0);
            copterBombSprite.anchor.set(0.5,0.5);
            copterBombSprite.scale.set(1);
            copterBombSprite.x =this.puzzleArray[point[1]][point[0]][1].x;
            copterBombSprite.y =this.puzzleArray[point[1]][point[0]][1].y;
            this.gameEffectContiner.addChild(copterBombSprite);
            copterBombSprite.gotoAndPlay(1);
            var myTx = TweenMax.to(copterBombSprite.scale,1,{x:2,y:2,onComplete:(function (copterBombSprite,point) {
                this.gameEffectContiner.removeChild(copterBombSprite);
                copterBombSprite.gotoAndStop(1);
                this.sixBombEffectLists.push(copterBombSprite);
                this.copterBomb(point);
            }).bind(this),onCompleteParams:[copterBombSprite,point]});
            break;
        case 7:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_helicopter");
            this.meansOfTransportAnimation(2,0.2);
            this.buildingMoveBlockNum += this.item12Num;
            this.changeBuildingMoveTime(1);

            this.totalScore += 2222;
            this.showScoreEffect(2222,point);
            this.puzzleArray[point[1]][point[0]][1].alpha = 0;

            //var copterBombSprite = new gc.MovieClip('special_helicopter',1,3,2,0);
            var copterBombSprite = null;
            if(this.sixBombEffectLists.length >0){
                copterBombSprite = this.sixBombEffectLists.shift();
            }else{
                copterBombSprite = new gc.MovieClip('special_helicopter',1,3,2,0);
            }
            copterBombSprite.anchor.set(0.5,0.5);
            copterBombSprite.scale.set(1);
            copterBombSprite.x =this.puzzleArray[point[1]][point[0]][1].x;
            copterBombSprite.y =this.puzzleArray[point[1]][point[0]][1].y;
            this.gameEffectContiner.addChild(copterBombSprite);
            copterBombSprite.gotoAndPlay(1);
            var myTx = TweenMax.to(copterBombSprite.scale,1,{x:3,y:3,onComplete:(function (copterBombSprite,point) {
                this.gameEffectContiner.removeChild(copterBombSprite);
                copterBombSprite.gotoAndStop(1);
                this.sixBombEffectLists.push(copterBombSprite);
                this.strongCopterBomb(point);
            }).bind(this),onCompleteParams:[copterBombSprite,point]});
            break;
        case 10:
            this.buildingMoveBlockNum += this.item6Num;
            this.changeBuildingMoveTime(1);
            this.totalScore += 1111;
            this.showScoreEffect(1111,point);
            this.trainBomb(point);
            break;
        case 11:
            this.buildingMoveBlockNum += this.item12Num;
            this.changeBuildingMoveTime(1);
            this.totalScore += 2222;
            this.showScoreEffect(2222,point);
            this.strongTrainBomb(point);
            break;
        case 12:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_ship");
            this.buildingMoveBlockNum += this.item6Num;
            this.changeBuildingMoveTime(1);
            this.totalScore += 1111;
            this.showScoreEffect(1111,point);
            this.shipBomb(point);
            break;
        case 13:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_ship");
            this.buildingMoveBlockNum += this.item12Num;
            this.changeBuildingMoveTime(1);
            this.totalScore += 2222;
            this.showScoreEffect(2222,point);
            this.strongShipBomb(point);
            break;
        case 8:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_airplane");
            this.meansOfTransportAnimation(1);
            this.buildingMoveBlockNum += this.item6Num;
            this.changeBuildingMoveTime(1);
            this.totalScore += 1111;
            this.showScoreEffect(1111,point);
            this.planeBomb(point);
            break;
        case 9:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_airplane");
            this.meansOfTransportAnimation(1);
            this.buildingMoveBlockNum += this.item12Num;
            this.changeBuildingMoveTime(1);
            this.totalScore += 2222;
            this.showScoreEffect(2222,point);
            this.strongPlaneBomb(point);
            break;
        case 14:
            if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_foot");
            this.totalScore += 333;
            this.showScoreEffect(333,point);
            console.log(11111111111);
            if(gc.soundFlag && !gc.deviceStopFlag)
                GD.soundPlay("sound_mvplus");
            this.turnCount++;
            //if(this.turnCount >= 100)
            //    this.turnCount = 99;
            if(this.turnCount > 5){
                try {
                    this.moveNumber.fileName = 'ui_move1_';
                    //this.removeChild(this.moveLine);
                    this.moveLineContainer.removeChildren();
                    this.move5CountPopup.flag = false;
                }catch(e){

                }
            }
            this.timeAddAnimation(point[1],point[0],1);
            break;
        default :
            break;
    }
}
/**
 * 타임 플러스 에니메이션
 * @param x 좌표
 * @param y 좌표
 */
gc.GamePlayPage.prototype.timeAddAnimation = function (x,y,num) {
    if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_mvplus");
    this.moveNumber.setValue(this.turnCount);

    var plusSprite = PIXI.Sprite.fromFrame("move_plus000"+num+".png");
    plusSprite.anchor.set(0.5,0.5);
    plusSprite.x = this.puzzleArray[x][y][1].x;
    plusSprite.y = this.puzzleArray[x][y][1].y;
    this.turnCountMusContiner.addChild(plusSprite);
    TweenMax.to(plusSprite,0.5,{y:"-=20",onComplete:(function (plusSprite) {
        this.turnCountMusContiner.removeChild(plusSprite);
    }).bind(this),onCompleteParams:[plusSprite]});

    var delay = 0;
    var effect = null;
    effect = PIXI.Sprite.fromFrame("effect_move_plus.png");
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    effect.scale.x = 1.2;
    effect.scale.y = 1.2;
    this.turnCountMusContiner.addChild(effect);
    TweenMax.to(effect,0.3,{delay:delay,x:GD.width*0.15,y:GD.height*0.06,onComplete:(function (effect,x,y) {
        this.moveNumber.setValue(this.turnCount);
        this.turnCountMusContiner.removeChild(effect);
    }).bind(this),onCompleteParams:[effect,x,y],ease:Linear.easeNone});
}
/**
 * 배 블록 터지는 에니메이션
 * @param x 좌표
 * @param y 좌표
 * @param type  블록 타입
 */
gc.GamePlayPage.prototype.singleShipBombAni = function (x, y, type) {
    var effect = null;
    effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    effect.loop= false;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    TweenMax.delayedCall(0.2,(function (effect,x,y,type) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        this.shipBombCheckAni(x,y,type);
    }).bind(this),[effect,x,y,type]);
    //TweenMax.to(effect,0.2,{rotation:0,onComplete:(function (effect,x,y,type) {
    //    this.bombEffectArray.push(effect);
    //    this.gameEffectContiner.removeChild(effect);
    //    this.shipBombCheckAni(x,y,type);
    //}).bind(this),onCompleteParams:[effect,x,y,type]});
}

/**
 * 배 블록 터지는 에니메이션
 * @param x 좌표
 * @param y 좌표
 */
gc.GamePlayPage.prototype.singleItemBombAni = function (x,y) {
    var effect = null;
    effect = new gc.MovieClip('puzzle_effect_000',1,15,this.copterMovieClipTime,0);
    effect.loop= false;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    TweenMax.delayedCall(this.copterBombTime,(function (effect) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        if(this.gameEffectContiner.children.length <= 0){
            this.checkNextItemBlock();
        }
    }).bind(this),[effect]);
    //TweenMax.to(effect,this.copterBombTime,{rotation:0,onComplete:(function (effect) {
    //    this.bombEffectArray.push(effect);
    //    this.gameEffectContiner.removeChild(effect);
    //    if(this.gameEffectContiner.children.length <= 0){
    //        this.checkNextItemBlock();
    //    }
    //}).bind(this),onCompleteParams:[effect]});
}
/**
 * 장애블록 터지는 에니메이션
 * @param x 좌표
 * @param y 좌표
 */
gc.GamePlayPage.prototype.stoneItemAni = function (x,y) {
    var stonAniSprite = PIXI.Sprite.fromFrame("disturb_puzzle_effect.png");
    stonAniSprite.anchor.set(0.5,0.5);
    stonAniSprite.x = this.puzzleArray[x][y][1].x;
    stonAniSprite.y = this.puzzleArray[x][y][1].y;
    this.gameTopEffectContiner.addChild(stonAniSprite);
    TweenMax.to(stonAniSprite,this.stonClearTime,{alpha:1,onComplete:(function (sprite) {
        this.gameTopEffectContiner.removeChild(sprite);
    }).bind(this),onCompleteParams:[stonAniSprite]});
}
/**
 * 터지는 블록이 드래그된 상태인지 체크
 * @param point 좌표
 */
gc.GamePlayPage.prototype.checkInDragArray = function (point) {
    var num = -1;
    for(var i=0;i<this.mergeDragedArray.length;i++){
        var positionArray = this.getTouchPosition(this.mergeDragedArray[i][0]);
        if(positionArray[0] == point[0] && positionArray[1] == point[1]){
            num = i;
            break;
        }
    }

    if(num != -1) {
        this.gameMergeAniContiner.removeChild(this.mergeDragedArray[num][0]);
        this.mergeDragedArray.splice(num, 1);
    }
}

gc.GamePlayPage.prototype.checkInArray = function (x,y) {
    if(x>=0 && x<6 && y>=0 && y<7){
        return true;
    }
    return false;
}

/**
 * 헬기 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.copterBomb = function (point) {
    var x = point[1];
    var y = point[0];
    this.puzzleArray[x][y][0] = 0;
    this.puzzleArray[x][y][1].alpha = 0;

    if(y%2 == 0){
        for(var i=x;i<=x+1;i++){
            for(var j=y-1;j<=y+1;j++){
                this.copterBombCheckFun(i,j,x,y);
            }
        }
        this.copterBombCheckFun(x-1,y,x,y);

    }else{
        for(var i=x-1;i<=x;i++){
            for(var j=y-1;j<=y+1;j++){
                this.copterBombCheckFun(i,j,x,y);
            }
        }
        this.copterBombCheckFun(x+1,y,x,y);
    }
}
/**
 * 강화 헬기 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.strongCopterBomb = function (point) {
    var x = point[1];
    var y = point[0];
    this.puzzleArray[x][y][0] = 0;
    this.puzzleArray[x][y][1].alpha = 0;

    for(var i=x-1;i<=x+1;i++){
        for(var j=y-2;j<=y+2;j++){
            this.copterBombCheckFun(i,j,x,y);
        }
    }

    if(y%2 == 0){
        this.copterBombCheckFun(x-2,y,x,y);
        for(var i=y-1;i<=y+1;i++){
            this.copterBombCheckFun(x+2,i,x,y);
        }
    }else{
        this.copterBombCheckFun(x+2,y,x,y);
        for(var i=y-1;i<=y+1;i++){
            this.copterBombCheckFun(x-2,i,x,y);
        }
    }
}
/**
 * 헬기블록에 의해 터진 블록 체크
 * @param x 좌표
 * @param y 좌표
 */
gc.GamePlayPage.prototype.copterBombCheckFun = function (x,y,px,py) {
    var flag = false;
    if(x < 0 || x > 5 || y <0 || y > 6 ){
        return;
    }

    if(x == px && py == y){
    }else{
        if(this.puzzleArray[x][y][0] == 0){
            return;
        }
    }

    this.checkInDragArray([y,x]);
    flag = this.checkPuzzleTypeAndBomb(x,y);
    if(flag){
        return;
    }

    var effect = null;
    //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.copterMovieClipTime,0);
    if(this.effectCallBackLists.length > 0){
        effect = this.effectCallBackLists.shift();
    }else{
        effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.copterMovieClipTime,0);
    }
    effect.loop= false;
    effect.animationSpeed = this.copterMovieClipTime;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    effect.gotoAndPlay(1);
    TweenMax.delayedCall(this.copterBombTime,(function (effect) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        effect.gotoAndStop(1);
        this.effectCallBackLists.push(effect);
        if(this.gameEffectContiner.children.length <= 0){
            this.checkNextItemBlock();
        }
    }).bind(this),[effect]);
    //TweenMax.to(effect,this.copterBombTime,{rotation:0,onComplete:(function (effect) {
    //    this.bombEffectArray.push(effect);
    //    this.gameEffectContiner.removeChild(effect);
    //    effect.gotoAndStop(1);
    //    this.effectCallBackLists.push(effect);
    //    if(this.gameEffectContiner.children.length <= 0){
    //        this.checkNextItemBlock();
    //    }
    //}).bind(this),onCompleteParams:[effect]});
}

gc.GamePlayPage.prototype.recoverTrainEffect = function () {
    //return;
    if(this.trainEffectSaveLists.length > 0){
        var effect = null;
        try {
            for (var i = this.trainEffectSaveLists.length - 1; i >= 0; i--) {
                effect = this.trainEffectSaveLists.shift();
                effect.rotation = 0;
                this.trainEffectLists.push(effect);
            }
            this.trainEffectSaveLists = [];
        }catch(e){

        }
    }
};

/**
 * 기차 에니메이션 오브
 */
gc.GamePlayPage.prototype.trainBombOverAnimation = function () {
    if(this.trainTypeDU.length>1 || this.trainTypeLR.length>1 || this.trainTypeRL.length>1){
        var time = 0;
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_train");
        if(this.trainTypeDU.length > 0){
            if(this.trainThrowTime*6 > time){
                time = this.trainThrowTime*6;
            }

            var trainSprite = null;
            if(this.trainMoveEffectLists.length > 0){
                trainSprite = this.trainMoveEffectLists.shift();
            }else{
                trainSprite = new gc.MovieClip('special_train',1,13,2,0);
            }
            trainSprite.rotation = 0;
            trainSprite.y = this.puzzleArray[this.trainTypeDU[0][0]][this.trainTypeDU[0][1]][1].y+50;
            trainSprite.x = this.puzzleArray[this.trainTypeDU[0][0]][this.trainTypeDU[0][1]][1].x;
            trainSprite.anchor.set(0.5,0.5);
            this.gameTopEffectContiner.addChild(trainSprite);
            trainSprite.gotoAndPlay(1);
            TweenMax.to(trainSprite,this.trainThrowTime*6,{
                y:this.puzzleArray[this.trainTypeDU[this.trainTypeDU.length-1][0]][this.trainTypeDU[this.trainTypeDU.length-1][1]][1].y-50,
                onComplete:(function (sprite) {
                    this.gameTopEffectContiner.removeChild(sprite);
                    sprite.gotoAndStop(1);
                    this.trainMoveEffectLists.push(sprite);
                    if(this.gameTopEffectContiner.children.length == 0){
                        this.gameTopEffectContiner.removeChildren();
                        this.gameShipEffectContiner.removeChildren();
                        this.recoverTrainEffect();
                        this.checkNextItemBlock();
                    }
                }).bind(this),onCompleteParams:[trainSprite]});
        }
        if(this.trainTypeLR.length > 0){
            if(this.trainThrowTime*this.trainTypeLR.length > time){
                time = this.trainThrowTime*this.trainTypeLR.length;
            }

            //var trainSprite = new gc.MovieClip('special_train',1,13,2,0);
            var trainSprite = null;
            if(this.trainMoveEffectLists.length > 0){
                trainSprite = this.trainMoveEffectLists.shift();
            }else{
                trainSprite = new gc.MovieClip('special_train',1,13,2,0);
            }
            trainSprite.anchor.set(0.5,0.5);
            trainSprite.rotation = Math.PI/3;
            trainSprite.y = this.puzzleArray[this.trainTypeLR[0][0]][this.trainTypeLR[0][1]][1].y+30;
            trainSprite.x = this.puzzleArray[this.trainTypeLR[0][0]][this.trainTypeLR[0][1]][1].x-50;
            this.gameTopEffectContiner.addChild(trainSprite);
            trainSprite.gotoAndPlay(1);
            TweenMax.to(trainSprite,this.trainThrowTime*this.trainTypeLR.length,{
                y:this.puzzleArray[this.trainTypeLR[this.trainTypeLR.length-1][0]][this.trainTypeLR[this.trainTypeLR.length-1][1]][1].y-30,
                x:this.puzzleArray[this.trainTypeLR[this.trainTypeLR.length-1][0]][this.trainTypeLR[this.trainTypeLR.length-1][1]][1].x+50,
                onComplete:(function (sprite) {
                    this.gameTopEffectContiner.removeChild(sprite);
                    sprite.gotoAndStop(1);
                    this.trainMoveEffectLists.push(sprite);
                    if(this.gameTopEffectContiner.children.length == 0){
                        this.gameTopEffectContiner.removeChildren();
                        this.gameShipEffectContiner.removeChildren();
                        this.recoverTrainEffect();
                        this.checkNextItemBlock();
                    }
                }).bind(this),onCompleteParams:[trainSprite]});
        }
        if(this.trainTypeRL.length > 0){
            if(this.trainThrowTime*this.trainTypeRL.length > time){
                time = this.trainThrowTime*this.trainTypeRL.length;
            }
            //var trainSprite = new gc.MovieClip('special_train',1,13,2,0);
            var trainSprite = null;
            if(this.trainMoveEffectLists.length > 0){
                trainSprite = this.trainMoveEffectLists.shift();
            }else{
                trainSprite = new gc.MovieClip('special_train',1,13,2,0);
            }
            trainSprite.anchor.set(0.5,0.5);
            trainSprite.rotation = Math.PI*5/3;
            trainSprite.y = this.puzzleArray[this.trainTypeRL[0][0]][this.trainTypeRL[0][1]][1].y-30;
            trainSprite.x = this.puzzleArray[this.trainTypeRL[0][0]][this.trainTypeRL[0][1]][1].x-50;
            this.gameTopEffectContiner.addChild(trainSprite);
            trainSprite.gotoAndPlay(1);
            TweenMax.from(trainSprite,this.trainThrowTime*this.trainTypeRL.length,{
                y:this.puzzleArray[this.trainTypeRL[this.trainTypeRL.length-1][0]][this.trainTypeRL[this.trainTypeRL.length-1][1]][1].y+30,
                x:this.puzzleArray[this.trainTypeRL[this.trainTypeRL.length-1][0]][this.trainTypeRL[this.trainTypeRL.length-1][1]][1].x+50,
                onComplete:(function (sprite) {
                    this.gameTopEffectContiner.removeChild(sprite);
                    sprite.gotoAndStop(1);
                    this.trainMoveEffectLists.push(sprite);
                    if(this.gameTopEffectContiner.children.length == 0){
                        this.gameTopEffectContiner.removeChildren();
                        this.gameShipEffectContiner.removeChildren();
                        //this.recoverTrainEffect();
                        this.checkNextItemBlock();
                    }
                }).bind(this),onCompleteParams:[trainSprite]});
        }
        this.meansOfTransportAnimation(4,time);
    }else{
        this.checkNextItemBlock();
    }
}

/**
 * 기차 터지는 방향에 따라 애니메이션 추가
 * @param x 좌표
 * @param y 좌표
 * @param btype 방향 1 down, 0 up
 * @param ftype 에니메이션 타입
 */
//btype up down, ftype aspect
gc.GamePlayPage.prototype.trainBombCheckAni = function (x,y,btype,ftype) {
    if(x < 0 || x > 5 || y <0 || y > 6 ){
        this.trainCount++;
        if(this.trainCount == 6){
            this.trainCount = 0;
            this.trainBombOverAnimation();
        }
        return;
    }

    if(ftype == 3){
        if(btype == 1){
            this.trainTypeLR.unshift([x,y]);
        }else{
            this.trainTypeLR.push([x,y]);
        }
    }else if(ftype == 2){
        if(btype == 1){
            this.trainTypeRL.push([x,y]);
        }else{
            this.trainTypeRL.unshift([x,y]);
        }
    }else{
        if(btype == 1){
            this.trainTypeDU.unshift([x,y]);
        }else{
            this.trainTypeDU.push([x,y]);
        }
    }

    this.checkInDragArray([y,x]);
    flag = this.checkPuzzleTypeAndBomb(x,y);

    var effect = null;
    //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    if(this.effectCallBackLists.length > 0){
        effect = this.effectCallBackLists.shift();
    }else{
        effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    }
    effect.loop= false;
    effect.animationSpeed = this.moveClipTime;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    effect.gotoAndPlay(1);

    TweenMax.delayedCall(this.shipAniTime,(function (effect,x,y,btype,ftype) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        effect.gotoAndStop(1);
        this.effectCallBackLists.push(effect);
        var shipEffect = null;
        if(this.trainEffectLists.length > 0){
            shipEffect = this.trainEffectLists.shift();
        }else{
            shipEffect = PIXI.Sprite.fromFrame("special_train_0001.png");
        }
        //shipEffect = PIXI.Sprite.fromFrame("special_train_0001.png");
        shipEffect.anchor.set(0.5,0.5);
        shipEffect.x = this.puzzleArray[x][y][1].x ;
        shipEffect.y = this.puzzleArray[x][y][1].y ;
        this.gameShipEffectContiner.addChild(shipEffect);
        //console.log(shipEffect.texture);
        //console.log(22222222222222);
        this.trainEffectSaveLists.push(shipEffect);
        shipEffect.rotation = 0;
        if(ftype == 3){
            shipEffect.rotation = Math.PI/3;
        }else if(ftype == 2){
            shipEffect.rotation = -Math.PI/3;
        }

        TweenMax.delayedCall(this.shipAniTime,(function (x,y,btype,ftype) {
            if(btype == 1) {
                if (ftype == 3) {
                    if(y%2 == 0){
                        this.trainBombCheckAni(x+1,y-1,btype,ftype);
                    }else{
                        this.trainBombCheckAni(x,y-1,btype,ftype);
                    }
                } else if (ftype == 2) {
                    if(y%2 == 0){
                        this.trainBombCheckAni(x+1,y+1,btype,ftype);
                    }else{
                        this.trainBombCheckAni(x,y+1,btype,ftype);
                    }
                } else {
                    this.trainBombCheckAni(x+1,y,btype,ftype);
                }
            }else{
                if (ftype == 3) {
                    if(y%2 == 0){
                        this.trainBombCheckAni(x,y+1,btype,ftype);
                    }else{
                        this.trainBombCheckAni(x-1,y+1,btype,ftype);
                    }
                } else if (ftype == 2) {
                    if(y%2 == 0){
                        this.trainBombCheckAni(x,y-1,btype,ftype);
                    }else{
                        this.trainBombCheckAni(x-1,y-1,btype,ftype);
                    }
                } else {
                    this.trainBombCheckAni(x-1,y,btype,ftype);
                }
            }
        }).bind(this),[x,y,btype,ftype]);
    }).bind(this),[effect,x,y,btype,ftype]);
}
/**
 * 방향에 따라 좌표게산
 * @param x 좌표
 * @param y 좌표
 */
gc.GamePlayPage.prototype.trainBombCheckType1 = function (x,y) {
    var shipEffect = PIXI.Sprite.fromFrame("special_train_0001.png");
    shipEffect.anchor.set(0.5,0.5);
    shipEffect.x = this.puzzleArray[x][y][1].x ;
    shipEffect.y = this.puzzleArray[x][y][1].y ;
    shipEffect.rotation = Math.PI/3;
    this.gameShipEffectContiner.addChild(shipEffect);

    var shipEffect = PIXI.Sprite.fromFrame("special_train_0001.png");
    shipEffect.anchor.set(0.5,0.5);
    shipEffect.x = this.puzzleArray[x][y][1].x ;
    shipEffect.y = this.puzzleArray[x][y][1].y ;
    shipEffect.rotation = Math.PI*2/3;
    this.gameShipEffectContiner.addChild(shipEffect);

    var shipEffect = PIXI.Sprite.fromFrame("special_train_0001.png");
    shipEffect.anchor.set(0.5,0.5);
    shipEffect.x = this.puzzleArray[x][y][1].x ;
    shipEffect.y = this.puzzleArray[x][y][1].y ;
    this.gameShipEffectContiner.addChild(shipEffect);

    TweenMax.delayedCall(this.shipAniTime,(function (x,y) {
        var x1 = 0;
        var x2 = 0;
        var y1 = 0;
        var y2 = 0;
        if(y%2 == 0){
            x1 = x+1;
            x2 = x;
        }else{
            x1 = x;
            x2 = x-1;
        }
        y1 = y-1;
        y2 = y+1;
        this.trainBombCheckAni(x1,y1,1,3);
        this.trainBombCheckAni(x2,y2,2,3);

        if(y%2 == 0){
            x1 = x;
            x2 = x+1;
        }else{
            x1 = x-1;
            x2 = x;
        }
        y1 = y-1;
        y2 = y+1;
        this.trainBombCheckAni(x1,y1,2,2);
        this.trainBombCheckAni(x2,y2,1,2);

        x1 = x-1;
        x2 = x+1;
        this.trainBombCheckAni(x1,y,2,1);
        this.trainBombCheckAni(x2,y,1,1);
    }).bind(this),[x,y]);
}

/**
 * 기차 블록 체크
 * @param x 좌표
 * @param y 좌표
 * @param bombType  블록 유형
 * @param fType     터지는 방향
 */
gc.GamePlayPage.prototype.trainBombCheckType = function (x,y,bombType,fType) {

    var shipEffect = null;
    if(this.trainEffectLists.length > 0){
        shipEffect = this.trainEffectLists.shift();
    }else{
        shipEffect = PIXI.Sprite.fromFrame("special_train_0001.png");
    }
    //shipEffect = PIXI.Sprite.fromFrame("special_train_0001.png");
    shipEffect.anchor.set(0.5,0.5);
    shipEffect.x = this.puzzleArray[x][y][1].x ;
    shipEffect.y = this.puzzleArray[x][y][1].y ;
    shipEffect.rotation = 0;
    if(fType == 3){
        shipEffect.rotation = Math.PI/3;
    }else if(fType == 2){
        shipEffect.rotation = Math.PI*2/3;
    }
    this.gameShipEffectContiner.addChild(shipEffect);
    //console.log(shipEffect.texture);
    //console.log(111111111111);
    this.trainEffectSaveLists.push(shipEffect);
    TweenMax.delayedCall(this.shipAniTime,(function (x,y,bombType,ftype) {
        if(fType == 3){
            var x1 = 0;
            var x2 = 0;
            var y1 = 0;
            var y2 = 0;
            if(y%2 == 0){
                x1 = x+1;
                x2 = x;
            }else{
                x1 = x;
                x2 = x-1;
            }
            y1 = y-1;
            y2 = y+1;
            this.trainBombCheckAni(x1,y1,1,fType);
            this.trainBombCheckAni(x2,y2,2,fType);
        }else if(fType == 2){
            var x1 = 0;
            var x2 = 0;
            var y1 = 0;
            var y2 = 0;
            if(y%2 == 0){
                x1 = x;
                x2 = x+1;
            }else{
                x1 = x-1;
                x2 = x;
            }
            y1 = y-1;
            y2 = y+1;
            this.trainBombCheckAni(x1,y1,2,fType);
            this.trainBombCheckAni(x2,y2,1,fType);
        }else{
            var x1 = 0;
            var x2 = 0;
            x1 = x-1;
            x2 = x+1;
            this.trainBombCheckAni(x1,y,2,fType);
            this.trainBombCheckAni(x2,y,1,fType);
        }
    }).bind(this),[x,y,bombType,fType]);

}
/**
 * 기차 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.trainBomb = function (point) {
    var randNum = Math.floor(Math.random()*100)%3;
    var x = point[1];
    var y = point[0];
    this.puzzleArray[x][y][0] = 0;
    this.puzzleArray[x][y][1].alpha = 0;

    this.trainTypeDU = [];
    this.trainTypeLR = [];
    this.trainTypeRL = [];

    this.trainCount = 4;
    randNum = 1;

    if(randNum == 1){
        this.trainTypeDU.push([x,y]);
    }else if(randNum == 2){
        this.trainTypeRL.push([x,y]);
    }else{
        this.trainTypeLR.push([x,y]);
    }

    var effect = null;
    //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    if(this.effectCallBackLists.length > 0){
        effect = this.effectCallBackLists.shift();
    }else{
        effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    }
    effect.loop= false;
    effect.animationSpeed = this.moveClipTime;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    effect.gotoAndPlay(1);
    TweenMax.delayedCall(this.shipAniTime,(function (effect,x,y,randNum) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        effect.gotoAndStop(1);
        this.effectCallBackLists.push(effect);
        this.trainBombCheckType(x,y,0,randNum);
    }).bind(this),[effect,x,y,randNum]);
}
/**
 * 강화 기차 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.strongTrainBomb = function (point) {
    var x = point[1];
    var y = point[0];
    this.puzzleArray[x][y][0] = 0;
    this.puzzleArray[x][y][1].alpha = 0;

    this.trainTypeDU = [];
    this.trainTypeLR = [];
    this.trainTypeRL = [];

    this.trainTypeDU.push([x,y]);
    this.trainTypeLR.push([x,y]);
    this.trainTypeRL.push([x,y]);

    var effect = null;
    //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    if(this.effectCallBackLists.length > 0){
        effect = this.effectCallBackLists.shift();
    }else{
        effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    }
    effect.loop= false;
    effect.animationSpeed = this.moveClipTime;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    effect.gotoAndPlay(1);
    TweenMax.delayedCall(this.shipAniTime,(function (effect,x,y) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        effect.gotoAndStop(1);
        this.effectCallBackLists.push(effect);
        this.trainBombCheckType1(x,y);
    }).bind(this),[effect,x,y]);
}

/**
 * 배 므부 에니메이션
 * @param sprite    객체
 * @param nextI     차음으로 이동 블록
 */
gc.GamePlayPage.prototype.singleShipMoveAnimation = function (sprite,nextI) {
    if(nextI%2 == 0){
        sprite.rotation =  Math.PI*2/3;
    }else{
        sprite.rotation = Math.PI/3;
    }
    if(nextI <7) {
        TweenMax.to(sprite, this.shipThrowTime, {
            x: this.puzzleArray[this.shipStartX][nextI][1].x, y: this.puzzleArray[this.shipStartX][nextI][1].y,
            onComplete: (function (sprite, next) {
                this.singleShipMoveAnimation(sprite, next);
            }).bind(this), onCompleteParams: [sprite, nextI + 1],ease:Linear.easeNone
        });
    }else{
        TweenMax.to(sprite, this.shipThrowTime, {
            x: this.puzzleArray[this.shipStartX][6][1].x+50, y: this.puzzleArray[this.shipStartX][6][1].y-50,
            onComplete: (function (sprite) {
                this.gameTopEffectContiner.removeChildren();
                this.gameShipEffectContiner.removeChildren();
                sprite.gotoAndStop(1);
                this.shipMoveEffectLists.push(sprite);
                this.recoverShipEffect();
                this.checkNextItemBlock();
            }).bind(this),onCompleteParams:[sprite],ease:Linear.easeNone
        });
    }
}

/**
 * 배 클리어 오버 에니메이션
 * @param type  0 일반 배 ,1 강화 배
 */
gc.GamePlayPage.prototype.shipOverBombAnimation = function (type) {

    this.meansOfTransportAnimation(3,this.shipThrowTime*8);
    var shipSprite = null;
    if(type == 0){
        //var shipSprite = new gc.MovieClip('special_boat',1,2,0.5,10);
        if(this.shipMoveEffectLists.length > 0){
            shipSprite = this.shipMoveEffectLists.shift();
        }else{
            shipSprite = new gc.MovieClip('special_boat',1,2,0.5,10);
        }
        shipSprite.anchor.set(0.5,0.5);
        shipSprite.x = this.puzzleArray[this.shipStartX][0][1].x-50;
        shipSprite.y = this.puzzleArray[this.shipStartX][0][1].y+50;
        shipSprite.scale.set(1);
        shipSprite.rotation = Math.PI/3;
        this.gameTopEffectContiner.addChild(shipSprite);
        shipSprite.gotoAndPlay(1);

        if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_boattrans");
        TweenMax.to(shipSprite,this.shipThrowTime,{x:this.puzzleArray[this.shipStartX][0][1].x,y:this.puzzleArray[this.shipStartX][0][1].y,
            onComplete:(function (sprite,next) {
                this.singleShipMoveAnimation(sprite,next);
            }).bind(this),onCompleteParams:[shipSprite,1]});
    }else{
        //var shipSprite = new gc.MovieClip('special_boat',1,2,0.5,10);
        if(this.shipMoveEffectLists.length > 0){
            shipSprite = this.shipMoveEffectLists.shift();
        }else{
            shipSprite = new gc.MovieClip('special_boat',1,2,0.5,10);
        }
        shipSprite.anchor.set(0.5,0.5);
        shipSprite.x = this.puzzleArray[this.shipStartX][0][1].x-100;
        shipSprite.y = this.puzzleArray[this.shipStartX][0][1].y-50;
        shipSprite.rotation = Math.PI/2;
        shipSprite.scale.x = 2;
        shipSprite.scale.y = 2;
        this.gameTopEffectContiner.addChild(shipSprite);
        shipSprite.gotoAndPlay(1);

        if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_boattrans");
        TweenMax.to(shipSprite,this.shipThrowTime*8,{x:this.puzzleArray[this.shipStartX][6][1].x+100,onComplete:(function (shipSprite) {
            this.gameTopEffectContiner.removeChildren();
            this.gameShipEffectContiner.removeChildren();
            shipSprite.gotoAndStop(1);
            this.shipMoveEffectLists.push(shipSprite);
            this.recoverShipEffect();
            this.checkNextItemBlock();
        }).bind(this),onCompleteParams:[shipSprite]});
    }
}

gc.GamePlayPage.prototype.recoverShipEffect = function () {
    var effect = null;
    try {
        for (var i = this.shipEffectSaveLists.length - 1; i >= 0; i--) {
            effect = this.shipEffectSaveLists.splice(i, 1);
            effect.gotoAndStop(1);
            this.shipEffectLists.push(effect);
        }
        this.shipEffectSaveLists = [];
    }catch(e){

    }
};

/**
 * 배 블록 에니메이션
 * @param x 좌표
 * @param y 좌표
 * @param type  타입
 * @param style 일반 블록 0, 강화 블록 1
 */
gc.GamePlayPage.prototype.shipBombCheckAni = function (x,y,type,style) {
    if(x < 0 || x > 5 || y <0 || y > 6 ){
        if(style == 0) {
            this.singleShipCount++;
            if (this.singleShipCount == 2) {
                this.singleShipCount = 0;
                this.shipOverBombAnimation(0);
            }
        }else{
            this.singleShipCount++;
            if (this.singleShipCount == 6) {
                this.singleShipCount = 0;
                this.shipOverBombAnimation(1);
            }
        }
        return;
    }

    this.checkInDragArray([y,x]);

    var flag
    flag = this.checkPuzzleTypeAndBomb(x,y);

    var effect = null;
    //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    if(this.effectCallBackLists.length > 0){
        effect = this.effectCallBackLists.shift();
    }else{
        effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    }
    effect.loop= false;
    effect.animationSpeed = this.moveClipTime;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    effect.gotoAndPlay(1);

    var shipEffect = null;
    if(type == 1){
        TweenMax.delayedCall(this.shipBombBtweenTime,(function (effect,x,y,style) {
            this.bombEffectArray.push(effect);
            this.gameEffectContiner.removeChild(effect);
            effect.gotoAndStop(1);
            this.effectCallBackLists.push(effect);
            //var shipEffect = new gc.MovieClip("special_boat_000",1,5,this.shipClipTime,1);
            if(this.shipEffectLists.length > 0){
                shipEffect =  this.shipEffectLists.shift();
            }else{
                shipEffect = new gc.MovieClip("special_boat_000",1,5,this.shipClipTime,1);
            }
            shipEffect.loop = false;
            shipEffect.anchor.set(0.5,0.5);
            shipEffect.x = this.puzzleArray[x][y][1].x ;
            shipEffect.y = this.puzzleArray[x][y][1].y ;
            shipEffect.scale.x = -1;
            this.gameShipEffectContiner.addChild(shipEffect);
            this.shipEffectSaveLists.push(shipEffect);
            shipEffect.gotoAndPlay(1);
            TweenMax.delayedCall(this.shipAniTime,(function (x,y,style) {
                this.shipBombCheckAni(x,y-1,1,style);
            }).bind(this),[x,y,style]);
        }).bind(this),[effect,x,y,style]);
    }else if(type == 2){
        TweenMax.delayedCall(this.shipBombBtweenTime,(function (effect,x,y,style) {
            this.bombEffectArray.push(effect);
            this.gameEffectContiner.removeChild(effect);
            effect.gotoAndStop(1);
            this.effectCallBackLists.push(effect);
            //var shipEffect = new gc.MovieClip("special_boat_000",1,5,this.shipClipTime,1);
            if(this.shipEffectLists.length > 0){
                shipEffect =  this.shipEffectLists.shift();
            }else{
                shipEffect = new gc.MovieClip("special_boat_000",1,5,this.shipClipTime,1);
            }
            shipEffect.loop = false;
            shipEffect.anchor.set(0.5,0.5);
            shipEffect.x = this.puzzleArray[x][y][1].x ;
            shipEffect.y = this.puzzleArray[x][y][1].y ;
            shipEffect.scale.x = 1;
            this.gameShipEffectContiner.addChild(shipEffect);
            this.shipEffectSaveLists.push(shipEffect);
            shipEffect.gotoAndPlay(1);
            TweenMax.delayedCall(this.shipAniTime,(function (x,y,style) {
                this.shipBombCheckAni(x,y+1,2,style);
            }).bind(this),[x,y,style]);
        }).bind(this),[effect,x,y,style]);
    }
}
/**
 * 배 블록 체크
 * @param x 좌표
 * @param y 좌표
 * @param type  블록 타입
 */
gc.GamePlayPage.prototype.shipBombCheckType = function (x,y,type) {
    var shipEffect = null;
    if(this.shipPointEffectLists.length > 0){
        shipEffect = this.shipPointEffectLists.shift();
    }else{
        shipEffect = PIXI.Sprite.fromFrame("special_boat_0005.png");
    }
    shipEffect.anchor.set(0.5,0.5);
    shipEffect.x = this.puzzleArray[x][y][1].x ;
    shipEffect.y = this.puzzleArray[x][y][1].y ;
    this.gameShipEffectContiner.addChild(shipEffect);
    TweenMax.delayedCall(this.shipAniTime,(function (x,y,shipEffect) {
        this.shipPointEffectLists.push(shipEffect);
        this.shipBombCheckAni(x,y-1,1,type);
        this.shipBombCheckAni(x,y+1,2,type);
    }).bind(this),[x,y,shipEffect,type]);
}
/**
 * 배 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.shipBomb = function (point) {
    var x = point[1];
    var y = point[0];
    this.puzzleArray[x][y][0] = 0;
    this.puzzleArray[x][y][1].alpha = 0;

    this.shipStartX = x;
    var effect = null;
    //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    if(this.effectCallBackLists.length > 0){
        effect = this.effectCallBackLists.shift();
    }else{
        effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    }
    effect.loop= false;
    effect.animationSpeed = this.moveClipTime;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    effect.gotoAndPlay(1);
    TweenMax.delayedCall(this.shipAniTime,(function (effect,x,y) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        effect.gotoAndStop(1);
        this.effectCallBackLists.push(effect);
        this.shipBombCheckType(x,y,0);
    }).bind(this),[effect,x,y]);

}
/**
 * 강화 배 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.strongShipBomb = function (point) {
    var x = point[1];
    var y = point[0];
    this.shipStartX = x;
    for(var i= x-1;i<=x+1;i++){
        if(i<6 && i>=0){

            this.checkInDragArray([y,i]);
            var flag = false;
            if(this.shipStartX != i)
                flag = this.checkPuzzleTypeAndBomb(i,y);

            if(!flag) {
                if(this.puzzleArray[i][y][0] < 15) {
                    this.puzzleArray[i][y][0] = 0;
                    this.puzzleArray[i][y][1].alpha = 0;
                }
            }

            var effect = null;
            //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
            if(this.effectCallBackLists.length > 0){
                effect = this.effectCallBackLists.shift();
            }else{
                effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
            }
            effect.loop= false;
            effect.animationSpeed = this.moveClipTime;
            effect.anchor.set(0.5,0.5);
            effect.x = this.puzzleArray[i][y][1].x;
            effect.y = this.puzzleArray[i][y][1].y;
            if(flag){
                effect.alpha = 0;
            }
            this.gameEffectContiner.addChild(effect);
            effect.gotoAndPlay(1);
            TweenMax.delayedCall(this.shipAniTime,(function (effect,x,y) {
                this.bombEffectArray.push(effect);
                this.gameEffectContiner.removeChild(effect);
                effect.alpha = 1;
                effect.gotoAndStop(1);
                this.effectCallBackLists.push(effect);
                this.shipBombCheckType(x,y,1);
            }).bind(this),[effect,i,y]);
        }else{
            this.singleShipCount += 2;
        }
    }
}
/**
 * 아이템 작동대기 에니메이션
 * @param x 좌표
 * @param y 좌표
 */
gc.GamePlayPage.prototype.itemSelectedAnimation = function (x,y) {
    //2016-12-30 add
    if(this.puzzleArray[x][y][3] != null)
        this.puzzleArray[x][y][3].kill(true);
    //end
    this.puzzleArray[x][y][3] = TweenMax.to(this.puzzleArray[x][y][1].scale,0.5,{repeat:-1,yoyo:true,x:0.8,y:0.8,onComplete:(function (i,j) {
        this.puzzleArray[x][y][1].scale.x = 1;
        this.puzzleArray[x][y][1].scale.y = 1;
    }).bind(this),onCompleteParams:[x,y]});
}

/**
 * 블록 유형 체크,블록 유형에 따라 다른 에니메이션 추가
 * @param x
 * @param y
 * @returns {boolean}
 */
gc.GamePlayPage.prototype.checkPuzzleTypeAndBomb = function (x,y) {
    var flag = false;
    var type = this.puzzleArray[x][y][0];
    if(this.puzzleArray[x][y][0] > 5 && this.puzzleArray[x][y][0] < 14){
        //2016-12-30 add
        var isIN = false;
        for(var i=0;i<this.itemSelectedArray.length;i++){
            if(this.itemSelectedArray[i] == this.puzzleArray[x][y][1]){
                isIN = true;
                break;
            }
        }
        if(!isIN) {
            this.itemSelectedArray.push(this.puzzleArray[x][y][1]);
            this.itemSelectedAnimation(x, y);
        }
        //end
        flag = true;
        //2016-12-30 update
    }else if(this.puzzleArray[x][y][0] > 14){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_block");
        if(this.puzzleArray[x][y][0] > 17){
            this.totalScore += 500;
            this.showScoreEffect(500,[y,x]);
            this.stoneItemAni(x,y);
            this.puzzleArray[x][y][0] = 17;
            this.puzzleArray[x][y][1].texture = new PIXI.Texture.fromFrame("block_00017.png");
            this.stonLevelClearCount ++ ;
        }else if(this.puzzleArray[x][y][0] >16){
            this.totalScore += 400;
            this.showScoreEffect(400,[y,x]);
            this.stoneItemAni(x,y);
            this.puzzleArray[x][y][0] = 16;
            this.puzzleArray[x][y][1].texture = new PIXI.Texture.fromFrame("block_00016.png");
            this.stonLevelClearCount ++ ;
        }else if(this.puzzleArray[x][y][0] >15){
            this.totalScore += 550;
            this.showScoreEffect(550,[y,x]);
            this.stoneItemAni(x,y);
            this.puzzleArray[x][y][0] = 15;
            this.puzzleArray[x][y][1].texture = new PIXI.Texture.fromFrame("block_00015.png");
            this.stonLevelClearCount ++ ;
        }else{
            this.stageStoneBlockNum --;
            this.puzzleArray[x][y][0] = 0;
            this.puzzleArray[x][y][1].alpha = 0;
            this.totalScore += 330;
            this.showScoreEffect(330,[y,x]);
            this.stonLevelClearCount ++ ;
        }
    }else{
        this.itemSelectedFun(this.puzzleArray[x][y][0],[y,x]);
        this.puzzleArray[x][y][0] = 0;
        this.puzzleArray[x][y][1].alpha = 0;
    }
    return flag;
}

/**
 * 비행기 블록 체크
 * @param x 좌표
 * @param y 좌표
 */
gc.GamePlayPage.prototype.checkPlaneBomb = function (x, y) {
    var flag = false;
    if(x < 0 || x > 5 || y <0 || y > 6 ){
        return;
    }

    if(this.puzzleArray[x][y][0] == 0){
        return;
    }

    this.checkInDragArray([y,x]);
    flag = this.checkPuzzleTypeAndBomb(x,y);

    if(flag){
        return;
    }
    var effect = null;
    //effect = new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    if(this.effectCallBackLists.length > 0){
        effect = this.effectCallBackLists.shift();
    }else{
        effect =  new gc.MovieClip('puzzle_effect_000',1,15,this.moveClipTime,0);
    }
    effect.loop= false;
    effect.animationSpeed = this.moveClipTime;
    effect.anchor.set(0.5,0.5);
    effect.x = this.puzzleArray[x][y][1].x;
    effect.y = this.puzzleArray[x][y][1].y;
    this.gameEffectContiner.addChild(effect);
    effect.gotoAndPlay(1);
    TweenMax.delayedCall(this.planeBombTime,(function (effect) {
        this.bombEffectArray.push(effect);
        this.gameEffectContiner.removeChild(effect);
        effect.gotoAndStop(1);
        this.effectCallBackLists.push(effect);
        if(this.gameEffectContiner.children.length <= 0){
            this.checkNextItemBlock();
        }
    }).bind(this),[effect]);
}

/**
 * 비행기 터지는 에니메이션
 * @param array     터드리는 퍼즐 배열
 * @param x         좌표
 * @param y         좌표
 */
gc.GamePlayPage.prototype.planeBombAnimation = function (array, x, y) {

    for(var i=0;i<array.length;i++){
        var sprite = null;
        if(this.planEffectLists.length >0){
            sprite = this.planEffectLists.shift();
        }else{
            sprite = PIXI.Sprite.fromFrame("special_airplane.png");
        }
        sprite.anchor.set(0.5,0.25);
        sprite.x = this.puzzleArray[x][y][1].x;
        sprite.y = this.puzzleArray[x][y][1].y;
        var xLenght = Math.abs(Math.pow(this.puzzleArray[x][y][1].x-this.puzzleArray[array[i][0]][array[i][1]][1].x,2)+
            Math.pow(this.puzzleArray[x][y][1].y-this.puzzleArray[array[i][0]][array[i][1]][1].y,2));
        xLenght = Math.sqrt(xLenght);
        var wLength = Math.abs(this.puzzleArray[x][y][1].x-this.puzzleArray[array[i][0]][array[i][1]][1].x);
        var corner = Math.acos(wLength/xLenght);

        if(this.puzzleArray[x][y][1].x >= this.puzzleArray[array[i][0]][array[i][1]][1].x &&             //4
            this.puzzleArray[x][y][1].y >= this.puzzleArray[array[i][0]][array[i][1]][1].y){
            sprite.rotation = Math.PI*3/2+corner;
        }else if(this.puzzleArray[x][y][1].x >= this.puzzleArray[array[i][0]][array[i][1]][1].x &&          //3
            this.puzzleArray[x][y][1].y <= this.puzzleArray[array[i][0]][array[i][1]][1].y){
            sprite.rotation = Math.PI*3/2-corner;
        }else if(this.puzzleArray[x][y][1].x <= this.puzzleArray[array[i][0]][array[i][1]][1].x &&
            this.puzzleArray[x][y][1].y >= this.puzzleArray[array[i][0]][array[i][1]][1].y){                //1
            sprite.rotation = Math.PI/2-corner;
        }else{                                                                                                  //2
            sprite.rotation = Math.PI/2+corner;
        }
        this.gameEffectContiner.addChild(sprite);
        TweenMax.to(sprite,0.8,{x:this.puzzleArray[array[i][0]][array[i][1]][1].x,y:this.puzzleArray[array[i][0]][array[i][1]][1].y,
            onComplete:(function (sprite,array) {
            this.gameEffectContiner.removeChild(sprite);
            this.planEffectLists.push(sprite);
            if(this.gameEffectContiner.children.length == 0){
                for(var i=0;i<array.length;i++){
                    this.checkPlaneBomb(array[i][0],array[i][1]);
                }
            }
        }).bind(this),onCompleteParams:[sprite,array]})
    }
}

/**
 * 비행기 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.planeBomb = function (point) {
    var x = point[1];
    var y = point[0];
    this.puzzleArray[x][y][0] = 0;
    this.puzzleArray[x][y][1].alpha = 0;
    var checkArray = [];
    var bombArray = [];
    var otherArray = [];
    var toneBlockCount = 0;
    var type = 1;
    if(this.copyDrageArray.length != 0){
        type = this.copyDrageArray[0][0];
    }

    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0]>14){
                toneBlockCount++;
                checkArray.unshift([i,j]);
            }else if(this.puzzleArray[i][j][0] > 0){
                //if(type == this.puzzleArray[i][j][0]){
                //    checkArray.push([i,j]);
                //}else{
                    otherArray.push([i,j]);
                //}
            }
        }
    }

    for(var i=0;i<5;i++){
        if(checkArray.length<=0){
            break;
        }
        if(toneBlockCount>0){
            toneBlockCount--;
            var array = checkArray.shift();
            bombArray.push([array[0],array[1]]);
        }else{
            var randomNum = Math.floor(Math.random()*100)%checkArray.length;
            var puzzle = checkArray.splice(randomNum,1);
            bombArray.push([puzzle[0][0],puzzle[0][1]]);
        }
    }
    if(bombArray.length <5){
        var length = bombArray.length;
        for(var i = 0;i < 5-length;i++){
            var randomNum = Math.floor(Math.random()*100)%otherArray.length;
            var puzzle = otherArray.splice(randomNum,1);
            bombArray.push([puzzle[0][0],puzzle[0][1]]);
        }
    }

    this.planeBombAnimation(bombArray,x,y);
}
/**
 * 강화 비행기 블록
 * @param point 좌표
 */
gc.GamePlayPage.prototype.strongPlaneBomb = function (point) {
    var x = point[1];
    var y = point[0];
    this.puzzleArray[x][y][0] = 0;
    this.puzzleArray[x][y][1].alpha = 0;

    var flag = false;
    var randomBombArray = [];
    var randomBombArray1  = [];
    var randomBombArray2  = [];
    var randomBombArray3  = [];
    var randomBombArray4  = [];
    var randomBombArray5  = [];

    var bombArray = [];
    var checkArray = [];
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0]>14){
                checkArray.unshift([i,j]);
            }
        }
    }

    for(var i=0;i<checkArray.length;i++){
        var array = checkArray[i];
        bombArray.push([array[0],array[1]]);
    }

    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            if(this.puzzleArray[i][j][0] == 1){
                randomBombArray1.push([i,j]);
            }else if(this.puzzleArray[i][j][0] == 2){
                randomBombArray2.push([i,j]);
            }else if(this.puzzleArray[i][j][0] == 3){
                randomBombArray3.push([i,j]);
            }else if(this.puzzleArray[i][j][0] == 4){
                randomBombArray4.push([i,j]);
            }else if(this.puzzleArray[i][j][0] == 5){
                randomBombArray5.push([i,j]);
            }
            //if(this.copyDrageArray[0][0] == this.puzzleArray[i][j][0]){
            //    flag = true;
            //}
        }
    }

    randomBombArray.push(randomBombArray1);
    randomBombArray.push(randomBombArray2);
    randomBombArray.push(randomBombArray3);
    randomBombArray.push(randomBombArray4);
    randomBombArray.push(randomBombArray5);
    flag = false;
    if(flag){
        var array = randomBombArray.splice(this.copyDrageArray[0][0]-1,1);
        for(var i=0;i<array[0].length;i++){
            bombArray.push([array[0][i][0],array[0][i][1]]);
        }
    }else{
        var length = 0;
        var newArray = [];
        if(randomBombArray1.length > length){
            length = randomBombArray1.length;
            newArray = randomBombArray1;
        }
        if(randomBombArray2.length > length){
            length = randomBombArray2.length;
            newArray = [];
            newArray = randomBombArray2;
        }
        if(randomBombArray3.length > length){
            length = randomBombArray3.length;
            newArray = [];
            newArray = randomBombArray3;
        }
        if(randomBombArray4.length > length){
            length = randomBombArray4.length;
            newArray = [];
            newArray = randomBombArray4;
        }
        if(randomBombArray5.length > length){
            length = randomBombArray5.length;
            newArray = [];
            newArray = randomBombArray5;
        }

        for(var i=0;i<newArray.length;i++){
            bombArray.push([newArray[i][0],newArray[i][1]]);
        }

        //for(var i=0;i<randomBombArray.length;i++){
        //    if(randomBombArray[i].length >0){
        //        for(var j=0;j<randomBombArray[i].length;j++){
        //            bombArray.push(randomBombArray[i][j][0],randomBombArray[i][j][1]);
        //        }
        //        break;
        //    }
        //}
    }
    this.planeBombAnimation(bombArray,x,y);
}
/**
 * 대기 특수 블록 작동
 */
gc.GamePlayPage.prototype.checkNextItemBlock = function () {
    if(this.itemSelectedArray.length == 0){
        this.resetScale();
        this.scoreNumberText.valueTween(this.totalScore);
        this.gameMergeAniContiner.removeChildren();
        this.changeBuildingMoveTime(0);
        this.buildingMoveBlockNum = 0;
        this.reDarwPuzzle();
    }else {
        this.scoreNumberText.valueTween(this.totalScore);
        this.newReDarwPuzzle();
    }

}

gc.GamePlayPage.prototype.newCheckNextItemBlock = function () {
    if(this.itemSelectedArray.length > 0){
        this.guiedTime = new Date().getTime();
        this.test.inGuied = true;
        var itemData = this.itemSelectedArray.shift();

        var position = this.getTouchPosition(itemData);
        var x = position[1];
        var y = position[0];
        try {
            this.puzzleArray[x][y][3].kill();
        }catch(e){

        }
        this.resetScale();
        this.itemSelectedFun(this.puzzleArray[x][y][0],[y,x]);
    }
}



/**
 * 블록 크기 초기화
 */
gc.GamePlayPage.prototype.resetScale = function () {
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            this.puzzleArray[i][j][1].scale.x = 1;
            this.puzzleArray[i][j][1].scale.y = 1;
        }
    }
}
/**
 *블록 드래그 에니메이션
 */
gc.GamePlayPage.prototype.puzzleMergeAnimation = function () {
    if(this.mergeDragedArray.length == 0){
        //***************
        this.scoreNumberText.valueTween(this.totalScore);

        for(var i=0; i< this.gameMergeAniContiner.children.length; i++){
            this.blockCallBackLists.push(this.gameMergeAniContiner.getChildAt(i));
        }

        this.gameMergeAniContiner.removeChildren();
        this.changeBuildingMoveTime(0);
        this.buildingMoveBlockNum = 0;
        this.drawDragItem();
        this.reDarwPuzzle();
        return;
    }

    var mergPuzzle = this.mergeDragedArray.shift();
    var puzzle = mergPuzzle[0];
    puzzle.texture = PIXI.Texture.fromFrame("puzzle_effect_combine.png");
    var puzzleType = mergPuzzle[1];
    var touchPoint = this.getTouchPosition(puzzle);
    this.puzzleArray[touchPoint[1]][touchPoint[0]][0] = 0;
    this.puzzleArray[touchPoint[1]][touchPoint[0]][1].alpha = 0;

    if(puzzleType <6){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_puzzle_mix");
    }else{
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_sp_puzzle_mix");
    }

    if(this.mergeDragedArray.length >0){
        var effect = null;
        if(puzzleType > 5 && puzzleType<14) {
            this.mergePuzzleTween = TweenMax.to(puzzle, 0.1, {
                x: this.mergeDragedArray[0][0].x,
                y: this.mergeDragedArray[0][0].y,
                onComplete: (function (x,y) {
                    if(this.effectCallBackLists.length > 0){
                        effect = this.effectCallBackLists.shift();
                    }else{
                        effect =  new gc.MovieClip('puzzle_effect_000',1,15,1.5,0);
                    }
                    //var effect =  new gc.MovieClip('puzzle_effect_000',1,15,1.5,0);
                    effect.loop= false;
                    effect.anchor.set(0.5,0.5);
                    effect.x = x;
                    effect.y = y;
                    this.gameMergeAniContiner.addChild(effect);
                    effect.gotoAndPlay(1);
                    this.itemSelectedFun(puzzleType,touchPoint);
                    //TweenMax.to(effect.scale,0.2,{x:1,onComplete:(function (effect) {
                    //    this.gameMergeAniContiner.removeChild(effect);
                    //}).bind(this),onCompleteParams:[effect]});
                    TweenMax.delayedCall(0.3,(function (effect) {
                        this.gameMergeAniContiner.removeChild(effect);
                        effect.gotoAndStop(1);
                        this.effectCallBackLists.push(effect);
                    }).bind(this),[effect]);
                    puzzle.alpha = 0;
                }).bind(this),
                onCompleteParams:[this.mergeDragedArray[0][0].x,this.mergeDragedArray[0][0].y]
            });
        }else{
            this.mergePuzzleTween = TweenMax.to(puzzle, 0.1, {
                x: this.mergeDragedArray[0][0].x,
                y: this.mergeDragedArray[0][0].y,
                onComplete: (function (x,y) {
                    //var effect =  new gc.MovieClip('puzzle_effect_000',1,15,1,0);
                    if(this.effectCallBackLists.length > 0){
                        effect = this.effectCallBackLists.shift();
                    }else{
                        effect =  new gc.MovieClip('puzzle_effect_000',1,15,1.5,0);
                    }
                    effect.loop= false;
                    effect.anchor.set(0.5,0.5);
                    effect.x = x;
                    effect.y = y;
                    this.gameMergeAniContiner.addChild(effect);
                    effect.gotoAndPlay(1);
                    TweenMax.delayedCall(0.3,(function (effect) {
                        this.gameMergeAniContiner.removeChild(effect);
                        effect.gotoAndStop(1);
                        this.effectCallBackLists.push(effect);
                    }).bind(this),[effect]);
                    //TweenMax.to(effect.scale,0.4,{x:1,onComplete:(function (effect) {
                    //    this.gameMergeAniContiner.removeChild(effect);
                    //}).bind(this),onCompleteParams:[effect]});
                    this.itemSelectedFun(puzzleType,touchPoint);
                    this.puzzleMergeAnimation();
                    puzzle.alpha = 0;
                }).bind(this),
                onCompleteParams:[this.mergeDragedArray[0][0].x,this.mergeDragedArray[0][0].y]
            });
        }
    }else{
        this.totalClearBlockNum++;

        if(puzzleType>5 && puzzleType<14){
            this.itemSelectedFun(puzzleType,touchPoint);
            puzzle.alpha = 0;
        }else {
            if(puzzleType == 14){
                console.log(22222222222);
                if(gc.soundFlag && !gc.deviceStopFlag)
                    GD.soundPlay("sound_mvplus");
                this.turnCount++;
                //if(this.turnCount >= 100){
                //    this.turnCount = 99;
                //}
                if(this.turnCount > 5){
                    try {
                        this.moveNumber.fileName = 'ui_move1_';
                        //this.removeChild(this.moveLine);
                        this.moveLineContainer.removeChildren();
                        this.move5CountPopup.flag = flag;
                    }catch(e){

                    }
                }
                this.totalScore += 300;
                this.showScoreEffect(300,touchPoint);
                this.timeAddAnimation(touchPoint[1],touchPoint[0],1);
            }else{
                this.totalScore += 100;
                this.showScoreEffect(100,touchPoint);
            }
            this.changeBuildingMoveTime(0);
            this.buildingMoveBlockNum = 0;
            this.gameMergeAniContiner.removeChildren();
            this.drawDragItem();
            this.reDarwPuzzle();
        }
        //***************
        this.scoreNumberText.valueTween(this.totalScore);
        //this.setScoreInterval();
    }
}

gc.GamePlayPage.prototype.showTurnPlusAnimation = function (x,y,num) {
    this.turnCount += num;
    //if(this.turnCount >= 100){
    //    this.turnCount = 99;
    //}
    if(this.turnCount > 5){
        try {
            this.moveNumber.fileName = 'ui_move1_';
            //this.removeChild(this.moveLine);
            this.moveLineContainer.removeChildren();
            this.move5CountPopup.flag = flag;
        }catch(e){

        }
    }
    this.totalScore += 300*num;
    this.timeAddAnimation(x,y,num);
};

/**
 * 터치 위치에 의해 좌표 게산
 * @param position  터치 위치
 * @returns {Array} x,y좌표
 */
gc.GamePlayPage.prototype.getTouchPosition = function (position) {
    var x = (position.x - this.puzzleStartX+50)/this.pXp;
    x = Math.floor(x);
    var y = 0;
    if(x%2 == 0){
        y = (position.y - this.sPuzzleStartY+50)/this.pYp;
    }else{
        y = (position.y - this.dPuzzleStartY+50)/this.pYp;
    }
    y = Math.floor(y);
    var array = [];
    array.push(x);
    array.push(y);
    return array;
}

//퍼즐 초기화 및 이벤트 추가
gc.GamePlayPage.prototype.initPuzzle = function () {
    this.puzzleArray = [];
    var randomNum = Math.floor(Math.random()*100)%5+1;
    for(var i=0;i<this.puzzleYSIZE;i++){
        var puzzleContinerArray = [];
        for(var j=0;j<this.puzzleXSIZE;j++){
            var thisPuzzleArray = [];
            var puzzletype = Math.floor(Math.random()*100)%5+1;

            if(puzzletype == 0)
                puzzletype = 1;

            if(i == 5 && j == 0){
                puzzletype = randomNum;
            }

            if(i == 5 && j == 1){
                puzzletype = randomNum;
            }

            if(i == 5 && j == 2){
                puzzletype = randomNum;
            }

            var puzzle = null;
            if(puzzletype >5){
                puzzle = PIXI.Sprite.fromFrame("block_000"+puzzletype+".png");
            }else{
                puzzle = PIXI.Sprite.fromFrame(this.blockNameArray[this.stageNum]+puzzletype+".png");
            }
            if(j%2 == 0){
                puzzle.y = this.sPuzzleStartY + i*this.pYp;
            }else{
                puzzle.y = this.dPuzzleStartY + i*this.pYp;
            }
            puzzle.x = this.puzzleStartX + j* this.pXp;
            puzzle.anchor.set(0.5,0.5);
            this.gameBaceContiner.addChild(puzzle);
            thisPuzzleArray.push(puzzletype);
            thisPuzzleArray.push(puzzle);
            thisPuzzleArray.push(0);
            var tweenmax = null;
            thisPuzzleArray.push(tweenmax);
            puzzleContinerArray.push(thisPuzzleArray);
        }
        this.puzzleArray.push(puzzleContinerArray);
    }
}
/**
 * 드래그 될수 있는 퍼즐이 있는지 체크
 * @returns {boolean}
 */
gc.GamePlayPage.prototype.checkDragPuzzle = function () {
    for(var i=0;i<6;i++){
        for(var j=0;j<7;j++){
            var type = this.puzzleArray[i][j][0];
            if(type > 14){
                continue;
            }

            if(type > 5 && type <14){
                return true;
            }

            if(type == 14){
                var array1 = [];
                var array2 = [];
                var array3 = [];
                var array4 = [];
                var array5 = [];
                var array14 = [];
                if(i-1 >= 0){
                    if(this.puzzleArray[i-1][j][0] == 1){
                        array1.push([i-1,j]);
                    }else if(this.puzzleArray[i-1][j][0] == 2){
                        array2.push([i-1,j]);
                    }else if(this.puzzleArray[i-1][j][0] == 3){
                        array3.push([i-1,j]);
                    }else if(this.puzzleArray[i-1][j][0] == 4){
                        array4.push([i-1,j]);
                    }else if(this.puzzleArray[i-1][j][0] == 5){
                        array5.push([i-1,j]);
                    }else if(this.puzzleArray[i-1][j][0] == 14){
                        array14.push([i-1,j]);
                    }
                }
                if(i+1 <= 5){
                    if(this.puzzleArray[i+1][j][0] == 1){
                        array1.push([i+1,j]);
                    }else if(this.puzzleArray[i+1][j][0] == 2){
                        array2.push([i+1,j]);
                    }else if(this.puzzleArray[i+1][j][0] == 3){
                        array3.push([i+1,j]);
                    }else if(this.puzzleArray[i+1][j][0] == 4){
                        array4.push([i+1,j]);
                    }else if(this.puzzleArray[i+1][j][0] == 5){
                        array5.push([i+1,j]);
                    }else if(this.puzzleArray[i+1][j][0] == 14){
                        array14.push([i+1,j]);
                    }
                }
                if(j-1 >= 0){
                    if(this.puzzleArray[i][j-1][0] == 1){
                        array1.push([i,j-1]);
                    }else if(this.puzzleArray[i][j-1][0] == 2){
                        array2.push([i,j-1]);
                    }else if(this.puzzleArray[i][j-1][0] == 3){
                        array3.push([i,j-1]);
                    }else if(this.puzzleArray[i][j-1][0] == 4){
                        array4.push([i,j-1]);
                    }else if(this.puzzleArray[i][j-1][0] == 5){
                        array5.push([i,j-1]);
                    }else if(this.puzzleArray[i][j-1][0] == 14){
                        array14.push([i,j-1]);
                    }
                }
                if(j+1 <= 6){
                    if(this.puzzleArray[i][j+1][0] == 1){
                        array1.push([i,j+1]);
                    }else if(this.puzzleArray[i][j+1][0] == 2){
                        array2.push([i,j+1]);
                    }else if(this.puzzleArray[i][j+1][0] == 3){
                        array3.push([i,j+1]);
                    }else if(this.puzzleArray[i][j+1][0] == 4){
                        array4.push([i,j+1]);
                    }else if(this.puzzleArray[i][j+1][0] == 5){
                        array5.push([i,j+1]);
                    }else if(this.puzzleArray[i][j+1][0] == 14){
                        array14.push([i,j+1]);
                    }
                }
                if(j%2 ==0){
                    if(j-1 >= 0 && i+1 <= 5){
                        if(this.puzzleArray[i+1][j-1][0] == 1){
                            array1.push([i+1,j-1]);
                        }else if(this.puzzleArray[i+1][j-1][0] == 2){
                            array2.push([i+1,j-1]);
                        }else if(this.puzzleArray[i+1][j-1][0] == 3){
                            array3.push([i+1,j-1]);
                        }else if(this.puzzleArray[i+1][j-1][0] == 4){
                            array4.push([i+1,j-1]);
                        }else if(this.puzzleArray[i+1][j-1][0] == 5){
                            array5.push([i+1,j-1]);
                        }else if(this.puzzleArray[i+1][j-1][0] == 14){
                            array14.push([i+1,j-1]);
                        }
                    }
                    if(j+1 <= 6 && i+1 <= 5){
                        if(this.puzzleArray[i+1][j+1][0] == 1){
                            array1.push([i+1,j+1]);
                        }else if(this.puzzleArray[i+1][j+1][0] == 2){
                            array2.push([i+1,j+1]);
                        }else if(this.puzzleArray[i+1][j+1][0] == 3){
                            array3.push([i+1,j+1]);
                        }else if(this.puzzleArray[i+1][j+1][0] == 4){
                            array4.push([i+1,j+1]);
                        }else if(this.puzzleArray[i+1][j+1][0] == 5){
                            array5.push([i+1,j+1]);
                        }else if(this.puzzleArray[i+1][j+1][0] == 14){
                            array14.push([i+1,j+1]);
                        }
                    }
                }else{
                    if(j-1 >= 0 && i-1 >= 0){
                        if(this.puzzleArray[i-1][j-1][0] == 1){
                            array1.push([i-1,j-1]);
                        }else if(this.puzzleArray[i-1][j-1][0] == 2){
                            array2.push([i-1,j-1]);
                        }else if(this.puzzleArray[i-1][j-1][0] == 3){
                            array3.push([i-1,j-1]);
                        }else if(this.puzzleArray[i-1][j-1][0] == 4){
                            array4.push([i-1,j-1]);
                        }else if(this.puzzleArray[i-1][j-1][0] == 5){
                            array5.push([i-1,j-1]);
                        }else if(this.puzzleArray[i-1][j-1][0] == 14){
                            array14.push([i-1,j-1]);
                        }
                    }
                    if(j+1 <= 6 && i-1 >= 0){
                        if(this.puzzleArray[i-1][j+1][0] == 1){
                            array1.push([i-1,j+1]);
                        }else if(this.puzzleArray[i-1][j+1][0] == 2){
                            array2.push([i-1,j+1]);
                        }else if(this.puzzleArray[i-1][j+1][0] == 3){
                            array3.push([i-1,j+1]);
                        }else if(this.puzzleArray[i-1][j+1][0] == 4){
                            array4.push([i-1,j+1]);
                        }else if(this.puzzleArray[i-1][j+1][0] == 5){
                            array5.push([i-1,j+1]);
                        }else if(this.puzzleArray[i-1][j+1][0] == 14){
                            array14.push([i-1,j+1]);
                        }
                    }
                }

                if(array14.length > 0){
                    if(array1.length > 0){
                        return true;
                    }
                    if(array2.length > 0){
                        return true;
                    }
                    if(array3.length > 0){
                        return true;
                    }
                    if(array4.length > 0){
                        return true;
                    }
                    if(array5.length > 0){
                        return true;
                    }
                }else{
                    if(array1.length > 1){
                        return true;
                    }else
                    if(array2.length > 1){
                        return true;
                    }else
                    if(array3.length > 1){
                        return true;
                    }else
                    if(array4.length > 1){
                        return true;
                    }else
                    if(array5.length > 1){
                        return true;
                    }
                }
            }else{
                var count = 0;
                var countItem = 0;
                if(i-1 >= 0){
                    if(type == this.puzzleArray[i-1][j][0]) {
                        count++;
                    }
                    if(this.puzzleArray[i-1][j][0] == 14){
                        countItem++;
                    }
                }
                if(i+1 <= 5){
                    if( type == this.puzzleArray[i+1][j][0]) {
                        count++;
                    }
                    if(this.puzzleArray[i+1][j][0] == 14){
                        countItem++;
                    }
                }
                if(j-1 >= 0){
                    if(type == this.puzzleArray[i][j-1][0]) {
                        count++;
                    }
                    if(this.puzzleArray[i][j-1][0] == 14){
                        countItem++;
                    }
                }
                if(j+1 <= 6){
                    if(type == this.puzzleArray[i][j+1][0]) {
                        count++;
                    }
                    if(this.puzzleArray[i][j+1][0] == 14){
                        countItem++;
                    }
                }
                if(j%2 ==0){
                    if(j-1 >= 0 && i+1 <= 5){
                        if(type == this.puzzleArray[i+1][j-1][0]) {
                            count++;
                        }
                        if(this.puzzleArray[i+1][j-1][0] == 14){
                            countItem++;
                        }
                    }
                    if(j+1 <= 6 && i+1 <= 5){
                        if(type == this.puzzleArray[i+1][j+1][0]) {
                            count++;
                        }
                        if(this.puzzleArray[i+1][j+1][0] == 14){
                            countItem++;
                        }
                    }
                }else{
                    if(j-1 >= 0 && i-1 >= 0){
                        if(type == this.puzzleArray[i-1][j-1][0]) {
                            count++;
                        }
                        if(this.puzzleArray[i-1][j-1][0] == 14){
                            countItem++;
                        }
                    }
                    if(j+1 <= 6 && i-1 >= 0){
                        if(type == this.puzzleArray[i-1][j+1][0]) {
                            count++;
                        }
                        if(this.puzzleArray[i-1][j+1][0] == 14){
                            countItem++;
                        }
                    }
                }

                if(count+countItem >= 2){
                    if(count >= 1){
                        return true;
                    }
                }
            }
        }
    }
    return false;
};

gc.GamePlayPage.prototype.pause = function(){

};

gc.GamePlayPage.prototype.resume = function(){

};

gc.GamePlayPage.prototype.updateTransform = function() {
    PIXI.Container.prototype.updateTransform.call(this);

    //this.nowTime = new Date().getTime();
    //
    //if(this.gameStared && (this.nowTime - this.oldTime > 15000)){
    //    this.oldTime = this.nowTime;
    //    if(gc.localTest){
    //        console.log("gameLog"+this.totalScore);
    //    }else {
    //        //var score = 1000;
    //        NetworkManager.sendData("gameLog", {
    //            playSeq: gc.playSeq,
    //            score: this.totalScore,
    //            clientTime: this.oldTime,
    //            gameId:GD.gameId
    //        }, null, null);
    //    }
    //}
};