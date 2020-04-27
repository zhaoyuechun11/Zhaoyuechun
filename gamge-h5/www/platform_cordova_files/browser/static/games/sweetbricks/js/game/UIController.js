var GAME = 0;
UIController = function (game) {
    this.spawnStack = []; //var retE = shift();
    this.spawnStackFrom = [];
    this.spawnStackTo = [];
    this.spawn1ing = false;
    this.spawn1 = 0;
    this.spawnFrom1 = 0;
    this.spawnTo1 = 0;
    this.updatecnt = 0;
    this.game = game;
    GAME = game;
    this.gameState = game.state.states[game.state.current];
    this.utilities = this.gameState.utilities;

    //지울것
    // this.upKey1=0;
    // this.qKey1=0;
    // this.leftKey1=0;
    // this.rightKey1=0;
    //지울것

    // ensure string.format exists
    if (!String.prototype.format) {
        String.prototype.format = function () {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] !== 'undefined' ? args[number] : match;
            });
        };
    }
};

UIController.prototype = {
    // constants
    struggleIndicatorOffset: 25, // distance from attached vehicle to struggle indicator
    struggleIndicatorBlinkDuration: 100, // duration of struggle indicator blink animation (in milliseconds)
    struggleIndicatorBlinkCount: 10, // number of times struggle indicator will blink during animation

    readySetGoYOffset: 150,	// distance from center of screen for readySetGoText////레드-카운트다운
    readySetGoStyle: {font: "124pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2},
    readySetGoLabelsDesktop: ["3", "2", "1"], //레드-카운트다운 레벨

    scoreXOffset: 10,
    scoreYOffset: 10,
    scoreStyle: {font: "20pt Arial", fill: "#ffffff", align: "right", stroke: "#000000", strokeThickness: 2},
    scoreLabelDebug: ("{0}km\n"
        + "difficulty: {1}\n"
        + "struggle: {2}\n"
        + "velocity: {3}\n"
        + "elapsed: {4}\n"
        + "timeplay: {5}\n"
        + "playtime_bias: {6}\n"
        + "iHeartChargeMax: {7}\n"
        + "iHeartInitData: {8}\n"
        + "fHeartChargeTime: {9}\n"
    ), ////속도표시

    gameOverStyle: {font: "20pt Arial", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 2},
    gameOverLabel: "GAME OVER\n\nHIGH SCORE\n{1}km\n\nPRESS TO RETRY",
    gameOverHighScore: "NEW HIGH SCORE!\n\n{0}km\n\nPRESS TO RETRY",


    fingerIconYOffset: 185, // distance from center of screen for the finger icon

    init: function () {
        if (dm) console.log("- UIController.init");


       // this.itembomb = createFX_bomb();
       // this.itemmissile = createFX_missile();

        //this.gameState.onIntroComplete.add(this.onIntroComplete, this);
        this.gameState.onGameBegin.add(this.onGameBegun, this);
        this.gameState.onGameOver.add(this.onGameOver, this); //골인 내랭킹 트로피 연출
        //this.gameState.onMistake.add(this.onMistake, this);

        this.gameState.onFinishLevelUI.add(this.onFinishLevelUI, this);




        this.uivelocity = 0; //속도그래프용 속도
        this.uiguagestep = 0;
        //새로추가 --속도계 ----

        //새로추가 --신호등----

        this.tx20sec = create20sec();
        this.tx20sec.visible = false;

        this.light123 = createLight123();
        this.number123 = createNumber123();

        //this.light123.fixedToCamera = true;

        //this.number123.fixedToCamera = true;
        //새로추가 --신호등----


        this.uievent_onoff = true;

        this.veldivmin = 0.25;
        this.veldivnormal = 0.5;
        this.veldiv = 0.5;
        //


        //새로추가 - 일시정지버튼---------

        //벽돌깨기-------------------------------------------------------------------------------
        // .z_life[3]
        // .z_life[0].z_star
        // .z_life[0].z_paddle
        // .z_stageNumber
        // .z_scoreNumber
        this.uiMain =  CreateUIMainGame();
        this.uiMain.z_pause.fnok = function () { //일시정지버튼 클릭시(일시정지메뉴보이기)
            if (kData.iHeart <= 0){
                return;
            }
            var stgame = uigame.state.states.game;
            stgame.uiController.uipause.visible = true;

            ispausemode=true;                               //메인창-일시정지클릭-->인풋잠금

            stgame.massiveController.onPauseSaveVelocity(); //속도저장

            stgame.uiController.uipause.onActivePs();

            if (kData.bSoundBGM) {
                if (stgame.uiController.uipause.dlgbg9.btnsound.icon.visible)
                    stgame.uiController.uipause.dlgbg9.btnsound.icon.visible = false; //사운드켜기 상태표시
            } else {
                if (!stgame.uiController.uipause.dlgbg9.btnsound.icon.visible)
                    stgame.uiController.uipause.dlgbg9.btnsound.icon.visible = true; //사운드끄기 상태표시
            }
            
        };
        this.uiMain.onShow();

        this.uiReadyGo = CreateUIReadyG0();//레디고스파인생성
        this.uiReadyGo.visible = false;

        //별숨김// this.uiDropStar = CreateUIDropStar();//별파괴
        //별숨김// this.uiDropStar.visible = false;//debug_Sprite(this.uiDropStar);

        //시작창만들기----------------------------------------------------------------------
        this.uiStartLevel = CreateUIStartLevel();
        this.uiStartLevel.visible = false;
        var star3;

        //kData예외처리//케이데이타예외처리
        if(typeof(kData) === 'undefined' || typeof(kData.userData) === 'undefined') {
            star3 = 0;
        }else{
            star3 = kData.userData[curLevel];
        }
        var score3 = -99;//점수제거// var score3 = kData.userDataScore[curLevel];

        this.uiStartLevel.onSetSt(curLevel, score3, star3); //유저스코어출력
        //일반모드 텍스트 출력
        if(modeOption[0]===1) this.uiStartLevel.z_scoreNumber.text="DROP MODE";
        else{
            var stgame = uigame.state.states.game;
            if( stgame.massiveController.mskllen>0
             || stgame.massiveController.mskrlen>0){
                this.uiStartLevel.z_scoreNumber.text="MOVE MODE";
            }
            else {
                this.uiStartLevel.z_scoreNumber.text="BASIC MODE";
            }
        }

        this.uiStartLevel.onActiveSt(); //생성과 동시에 나온다




        this.uiStartLevel.z_btyes.fnok = function () {//레벨시작 오케이버튼 클릭시
            if(nvmode===true){
                //네이버모드 하트가 0이면
                if(kData.iHeart<=0){
                    //네이버모드
                    if (naverShop2.visible) {
                        naverShop2.visible=false;
                    } else {
                        naverShop2.Show(cbNaverShopReward);//네이버샵띄우기
                    }
                    return;
                    //일시정지모드
                }else {
                    var sends = {};//처리
                    kData.iHeart -= 1;//네이버 시작
                    sends.iHeart = kData.iHeart;//네이버저장하기
                    if (typeof GamePocket.Sdk !== 'undefined') {
                        networkManager.AppDataPut(JSON.stringify(sends));
                    }
                    // 레벨시작 음악---
                    TweenMax.delayedCall(0.1, function () {
                        if (kData.bSoundSE) SE_Heart.play(); //하트가 소모될때
                        selectBGM("BGM_Game_Nomal", true);
                    });
                }
			}

            //스타트화면 닫기용 트윈 오브젝트
            var stgame = uigame.state.states.game;
            var dlg =stgame.uiController.uiStartLevel.z_dlg;
            var bg = stgame.uiController.uiStartLevel.z_bg;




            //-----로그인 상태 체크-----------in CreateUIStartLevel
            if(loginTF === 1){          //로그인회원
                if (proto.serPos === 0              //모비서비스
                    ||proto.serPos === 1) {              //야후서비스
                    if (kData.iHeart<=0) { //하트가 바닥이면
                        //우선나가기
                        ispausemode = false; //컨티뉴-오케이->인풋잠금풀기

                        uigame.state.states.game.onGameOver.dispatch();
                        uigame.state.game.state.start('menu');

                        //우선나가기
                    }else {
                        // 컨티뉴버젼 ----
                        // TweenMax.delayedCall( 0.1, function () {
                        //     if(bSoundSE) SE_Heart.play(); //하트가 소모될때
                        // });

                        // 레벨시작 음악---
                        TweenMax.delayedCall( 0.1, function () {
                            if(kData.bSoundSE) SE_Heart.play(); //하트가 소모될때
                            selectBGM("BGM_Game_Nomal", true);
                        });

                        // networkManager.UseHeart(1, function () {
                        //    curLives = MaxLife; //in 스타트메뉴 예스(모비서비스)
                        // });
                    }
                }
            }else{
                if (networkManager.networkState === NET_STATE.LOCALHOST) { //로컬서비스
                    curLives = MaxLife;  //in 컨티뉴UI 예스(로컬)
                    var stgame = uigame.state.states.game;
                    //stgame.uiController.uiMain.z_lifestar.onSetLife(curLives);//컨티뉴 예스

                    //stgame.massiveController.startContinue(); //인트로시작2?
                }else{ //비회원  //게스트모드
                    //
                    // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),//상점
                    //     function () {
                    //         networkManager.JoinMember();
                    //     },
                    //     function () {
                    //     }
                    // );
                    // networkManager.UseHeart(1, function () {
                    //     curLives = MaxLife; //in 스타트메뉴 예스(모비서비스)
                    // });
                    TweenMax.delayedCall( 0.1, function () {
                        if(kData.bSoundSE) SE_Heart.play(); //하트가 소모될때
                        selectBGM("BGM_Game_Nomal", true);
                    });
                }
            }
            //-----로그인 상태 체크-----------in CreateUIStartLevel
            

            ////하트소비 연출(스파인) //레벨시작 오케이
            //stgame.uiController.uiStartLevel.z_spnHeart.visible = true;
            //stgame.uiController.uiStartLevel.z_spnHeart.z_spine.setAnimationByName(1, "heart_bomb_out", false);
            //엠프티에러//stgame.uiController.uiStartLevel.z_spnHeart.z_spine.addAnimationByName(0, "empty", false);

            // //하트소비 연출(프레임)
            // stgame.uiController.hideHeart.x = stgame.uiController.uiStartLevel.z_btyes.world.x+75;
            // stgame.uiController.hideHeart.y = stgame.uiController.uiStartLevel.z_btyes.world.y-115;
            // stgame.uiController.hideHeart.visible = true;
            // stgame.uiController.hideHeart.animations.play('hideheart', 20, false, true); //1time //kill//

            //더블클릭방지 마스크 사용
            stgame.uiController.uiStartLevel.z_mask.visible = true;

            //시작창 사라진 후, 인트로 시작
            TweenMax.delayedCall(0.5,function(){
                if(kData.bSoundSE) SE_Popup_OFF.play();
                onFadeout(bg, 0.75);
                onFadeoutScale(dlg, function () {
                    //스타트화면 끄기
                    stgame.uiController.uiStartLevel.visible = false;
                    stgame.uiController.uiStartLevel.z_mask.visible = false;
                    //console.log("introshow in uicontroller:init");
                    TweenMax.delayedCall(0.75,function() { stgame.massiveController.introShow(); });


                    TweenMax.delayedCall(0.2,function() {
                        if (kData.bSoundSE) SE_Ready.play();
                    });
                    TweenMax.delayedCall(1.1,function() {
                        if (kData.bSoundSE) SE_Go.play();
                    });

                    //레디고플레이
                    TweenMax.delayedCall(0.1,function() {
                        stgame.uiController.uiReadyGo.visible = true;
                        stgame.uiController.uiReadyGo.z_spine.setAnimationByName(1, "ready_go_ani", false); //in uiStartLevel.btyes
                        //엠프티에러//stgame.uiController.uiReadyGo.z_spine.addAnimationByName(0, "empty", false);
                    });
                });

                uigame.state.states.game.gameBegun = true;

                uimode = uimodeset.ingame;

                uigame.state.states.game.onGameBegin.dispatch();
                timer20sec=alonemode?9:time20secMax;


            });//delay
            //gameBegin: function()----------------
        };

        //클리어창만들기------------------------------------------------------------------------
        this.uiClearLevel = CreateUIClearLevel();
        this.uiClearLevel.visible = false;
        this.uiClearLevel.onSetCl(curLevel, ""); //lvidx, time, starcount, clearmode, allcleared
        //this.uiClearLevel.onActiveCl(true, false);

        //게임오버창
        this.uiGameOver = CreateUIGameOver();
        this.uiGameOver.visible = false;
        //this.uiGameOver.onActiveGv(false); //생성과 동시에 나온다

        //컨티뉴
        this.uiContinue = CreateUIContinue();
        this.uiContinue.visible = false;
        //this.uiContinue.onActiveCn(false);


        //새로추가 - 스타트샵------------
        uishopinmenu = false;
        this.uishop = createUIShop();
        this.uishop.visible = false;//초기화 삽ui 숨기기
        this.uishop.onRefreshInitShop();

        this.uishopresult = createUIShopResult();
        this.uishopresult.visible = false;

        //
        // this.uishopplus = createUIShopPlusButton();
        // this.uishopplus.visible = false;//초기화 삽플러스ui 숨기기
        //새로추가 - 스타트샵-------------

        //하트1개소비
        this.hideHeart = CreateHideHeart1();
        this.hideHeart.visible = false;

        //해쉬디버그용 텍스트
        this.txDebug =  uigame.add.text(0, 0, "", style_debug);
        this.txDebug.anchor.setTo(1,1);
        this.txDebug.position.setTo(720,1280-50);
        this.txDebug.name = "uicontroller";
        txdebug = this.txDebug;
        //

        //if(hsdm) hsDebug.onSet("info","1");
        //if(hsdm) hsDebug.onUpdateHash();



        //if(dm) hsDebug.onSet("os", 1234);
        //if(dm) hsDebug.onSet("v1", "aa");
        //if(dm) hsDebug.onSet("os", "ios");


        //벽돌깨기------------------------------------------------------------------------------


        //새로추가 - 일시정지메뉴판 윈도우창---------
        this.uipause = createUIPause();        //this.uipause.dlgbg9.scale.set(0.5,0.5);
        if (kData.bSoundBGM) {
            if (this.uipause.dlgbg9.btnsound.icon.visible)
                this.uipause.dlgbg9.btnsound.icon.visible = false; //사운드켜기 상태표시
        } else {
            if (!this.uipause.dlgbg9.btnsound.icon.visible)
                this.uipause.dlgbg9.btnsound.icon.visible = true; //사운드끄기 상태표시
        }
        //일시정지메뉴판 - 닫기버튼
        this.uipause.dlgbg9.btnx.fnok = function () { //아래와 동일 //일시정지창 닫기
            var stgame = uigame.state.states.game;
            var dlg = stgame.uiController.uipause.dlgbg9;
            var bg = stgame.uiController.uipause.bg;

            //일시정지변수
            ispausemode = false;  //일시정지창-닫기->인풋잠금풀기

            //TweenMax.resumeAll(true, true);//트윈맥스일시정지 다시시작
            
            if(kData.bSoundSE) SE_Popup_OFF.play();
            onFadeout(bg, 0.75);
            onFadeoutScale(dlg, function () {
                stgame.uiController.uipause.visible = false;

                //stgame.massiveController.onPauseModeEnd();//오브젝트 속도 복구(in 창닫기버튼)
                ispausemode=false; //메인창-일시정지닫기-->인풋풀기
                stgame.massiveController.onPauseLoadVelocity();

                //grp.z_mask.visible = false;
            });
            //grp.z_mask.visible = true; //일시정지창에는 없다

        };
        this.uipause.dlgbg9.btnback.fnok = function () { //위와같다 //일시정지창 창닫기

            //일시정지변수
            ispausemode = false; //일시정지뒤로클릭->인풋잠금풀기

            //일시정지메뉴판 사라지기
            var stgame = uigame.state.states.game;
            stgame.uiController.uipause.visible = false;

            //차량속도 복구
            ispausemode=false;  //일시정지창-뒤로버튼클릭시 --> 인풋잠금풀기


            uigame.state.start('game');
            //stgame.massiveController.onPauseLoadVelocity();
        };
        this.uipause.visible = false;
        //새로추가 - 일시정지 윈도우창---------


        //도움말
        this.uiHelp = CreateUIHelp();
        this.uiHelp.visible = false;
        //this.uiHelp.onActiveHp();


        // if (kData.ITEM_1 < 1) item3btn[0].visible = false;
        // if (kData.ITEM_2 < 1) item3btn[1].visible = false;
        // if (kData.ITEM_3 < 1) item3btn[2].visible = false;
        if (kData.ITEM_1 < 1) {
            item3btn[0].islock = true;                                          //호버시,업,다운시 작동 못하게
            item3btn[0].alpha = 0.2;                                            //사용한후 투명처리
        }
        if (kData.ITEM_2 < 1) {
            item3btn[1].islock = true;                                          //호버시,업,다운시 작동 못하게
            item3btn[1].alpha = 0.2;                                            //사용한후 투명처리
        }
        if (kData.ITEM_3 < 1) {
            item3btn[2].islock = true;                                          //호버시,업,다운시 작동 못하게
            item3btn[2].alpha = 0.2;                                            //사용한후 투명처리
        }
		if(nvmode===true){
	        this.naver = uigame.add.group();
	        naverShop2 = new NaverShop(uigame, this.naver); //원본
            //this.naver.addChild(naverShop2.main); //혜관님 수정본
	        naverShop2.loadImg();
		}
        this.uiDev = CreateUIDev();
        this.uiDev.visible=false;

    },//init


    onFinishLevelUI: function () { //비어있음
        //this.uiClearLevel.
    },

    //스폰스택 업데이트 //아이템공격당함
    spawnstackcallback: function () {
    },

    //속도계업데이트
    speedupdatecallback: function () {
    },

    //onIntroComplete: function () {
        // if (dm) console.log("- UIController.onIntroComplete");
        //
        // if (this.fingerIcon && !this.game.input.activePointer.isDown) {
        //     this.fingerIcon.visible = true;
        //     this.fingerIcon.reset(this.game.world.centerX, this.game.world.centerY + this.fingerIconYOffset);
        //     this.fingerIcon.alpha = 0.15;
        //     this.pulseFingerTween = this.game.add.tween(this.fingerIcon).to({alpha: 0.75}, 1000, Phaser.Easing.Linear.None, true, 0, 2000, true);
        //     this.game.input.onDown.addOnce(
        //         function () {
        //             this.pulseFingerTween.stop();
        //             this.fingerIcon.kill();
        //         },
        //         this
        //     );
        // }

    //},

    onGameBegun: function () { //ui방향키보이기, ui아이템보이기, 타이머콜백시작
        if (dm) console.log("- UIController.onGameBegun");

        if (this.readySetGoText) this.readySetGoText.destroy(); //레드-카운트다운 제거



        if (this.leftArrow) this.leftArrow.visible = true;
        if (this.rightArrow) this.rightArrow.visible = true;

        // if (FOLLOW_TOUCH && this.fingerIcon && !this.game.input.activePointer.isDown) {
        //     this.fingerIcon.visible = true;
        //     this.fingerIcon.reset(this.game.world.centerX, this.game.world.centerY + this.fingerIconYOffset);
        //     this.fingerIcon.alpha = 0.75;
        //     this.swipeFingerTween = this.game.add.tween(this.fingerIcon).to({x: this.gameState.playerController.roadBounds.max}, 750, Phaser.Easing.Linear.None, true, 0, 0, true)
        //         .to({x: this.gameState.playerController.roadBounds.min}, 1500, Phaser.Easing.Linear.None)
        //         .to({x: this.game.world.centerX}, 750, Phaser.Easing.Linear.None)
        //         .loop();
        //     this.game.input.onDown.addOnce(
        //         function () {
        //             this.swipeFingerTween.stop();
        //             this.fingerIcon.kill();
        //         },
        //         this
        //     );
        // }


        if (kData.ITEM_1 < 1) item3btn[0].visible = false;
        if (kData.ITEM_2 < 1) item3btn[1].visible = false;
        if (kData.ITEM_3 < 1) item3btn[2].visible = false;

        //uigame.time.events.add(250, uigame.state.states.game.uiController.speedupdatecallback, this);
        uigame.time.events.loop(Phaser.Timer.QUARTER, uigame.state.states.game.uiController.spawnstackcallback, this);//속도계업데이트
        uigame.time.events.loop(Phaser.Timer.QUARTER, uigame.state.states.game.uiController.speedupdatecallback, this);//속도계업데이트
        //uigame.time.events.loop(Phaser.Timer.SECOND, uigame.state.states.game.uiController.minimap.onupdatetrack, this);//미니맵업데이트

        //this.side4.onSetCountSide4();
        //uigame.time.events.loop(Phaser.Timer.SECOND, this.utilities.updateSide4, this);//사이드4업데이트
        uigame.time.events.loop(Phaser.Timer.SECOND, this.utilities.updateTx20Sec, this);

    },
    // //순위업데이트,랭킹업데이트<<
    // Side4Time -= this.game.time.elapsed; //레드-카운트다운 타이머
    // if(Side4Time<0) {
    //     Side4Time = Side4TimeMax;
    //     this.side4.onSwapRankSide4();//랭킹업데이트
    // }
    // //순위업데이트,랭킹업데이트>>

    onGameOver: function () { //골인시 내랭킹 트로피 연출 되는 곳 //in endGame: function()
        if (dm) console.log("- UIController.onGameOver");
        //랜덤등수
        //var Rankrnd0123 = uigame.rnd.integerInRange(0, 3); //랜덤(0~3포함)

        //미스테이크 등수
        //mistake4 = [0,1,2,3];//실수카운트를 저장, 초기값은 싱글모드
        //mistake4_sort=[0,0,0,0]; //임시데이터 랭크용
        //mistake4_myrank=0;
        if (matchmode) {
            //멀티모드
            if (alonemode) {
                net_userallfin[0] = net_userall[0];
                net_userallfin[1] = net_userall[1];
            }//alonemode

            //공격메뉴판 사라지게
            if(item3btn[0].visible) item3btn[0].visible = false;
            if(item3btn[1].visible) item3btn[1].visible = false;
            if(item3btn[2].visible) item3btn[2].visible = false;

            uigame.state.states.game.uiController.side4.onSwapRankSide4();//게임종료시 랭킹업데이트 1회 강제 호출

            var myrankidx = net_userall.indexOf(net_yourname);//내순위
            if(myrankidx==0)this.tx20sec.visible = false;
            this.uigoal.onFinishRank(ids[rndid][0], myrankidx); //넷 골인직후 내랭킹만 출력


            //}
        } else {
            //싱글모드
            //sortMistake4();
            //getMyRank();

            //this.uigoal.onFinishRank(ids[rndid][0], mistake4_myrank);
        }



        TweenMax.delayedCall(3, function () {
            //일시정지버튼으로 게임종료시에도 호출되므로,  다른메뉴에서 에러안나게하려고
            //if(!this.uistartshop.visible || !this.uifind.visible)
            if(uimode === uimodeset.ingame
            && game.state.states[game.state.current] === "game" //게임스테이트검사
            )
                uigame.state.states.game.gotoResult();
        });

        //this.gameOverText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, txt, this.gameOverStyle);
        //this.gameOverText.anchor.setTo(0.5, 0.5);

        //if(this.leftArrow) this.leftArrow.kill();
        //if(this.rightArrow) this.rightArrow.kill();

        // ensure finger tweens are not active at this point
        //if (this.pulseFingerTween && this.pulseFingerTween.isRunning) this.pulseFingerTween.stop();
        //if (this.swipeFingerTween && this.swipeFingerTween.isRunning) this.swipeFingerTween.stop();
    },
    // onMistake: function () {
    //     if (dm) console.log("- UIController.onMistake");
    // },
    update: function () {},

    postUpdate: function () { },

    // copStruggle: function (direction, onCompleteCallback) {
    //     if (dm) console.log("- UIController.copStruggle");
    //
    //     if (this.gameState.playerSprite && !this.struggleIndicator) {
    //         this.struggleBlinkTimer = 0;
    //         this.struggleBlinkCounter = 0;
    //         this.struggleDirection = direction;
    //         this.struggleCompleteCallback = onCompleteCallback;
    //         this.struggleIndicator = direction > 0 ? this.struggleWarnLeft : this.struggleWarnRight;
    //         this.struggleIndicator.x = this.gameState.playerSprite.x - (this.struggleIndicatorOffset * this.struggleDirection);
    //         this.struggleIndicator.y = this.gameState.playerSprite.y;
    //         this.struggleIndicator.visible = true;
    //     }
    // },

    // cancelStruggle: function () {
    //     if (dm) console.log("- UIController.cancelStruggle");
    //
    //     if (this.struggleIndicator) {
    //         this.struggleIndicator.visible = false;
    //         this.struggleCompleteCallback = null;
    //         this.struggleIndicator = null;
    //     }
    // }
    destroy: function () {//게임재시작1-3
        //console.log("- UIController.destroy---");

        this.gameState = null;
        this.utilities = null;
        this.readySetGoLabels = null;
        this.readySetGoText = null;//레드-카운트다운 제거
        // if (this.scoreText) {
        //     this.scoreText.destroy();
        //     this.scoreText = null;
        // }
        if (this.stageText) {
            this.stageText.destroy();
            this.stageText = null;
        }

        if (this.gameOverText) {
            this.gameOverText.destroy();
            this.gameOverText = null;
        }
        this.struggleWarnLeft = null;
        this.struggleWarnRight = null;
        this.struggleIndicator = null;
        this.struggleCompleteCallback = null;
        this.struggleMeter = null;
        this.struggleMeterBG = null;
        this.struggleMeterFiller = null;
        this.leftArrow = null;
        this.rightArrow = null;
        this.fingerIcon = null;
        this.pulseFingerTween = null;
        this.swipeFingerTween = null;
        this.game = null;

//this.uiMain =  CreateUIMainGame();
        this.uiMain.z_bonus.destroy(true);
        this.uiMain.z_normal.destroy(true);
        this.uiMain.z_top_b.destroy(true);
        this.uiMain.z_bonus.destroy(true);
        this.uiMain.z_prog.destroy(true);
        this.uiMain.z_warning.destroy(true);
        this.uiMain.z_itemsel.destroy(true);
        this.uiMain.z_combo.destroy(true);
        this.uiMain.z_shopplus.destroy(true);
        this.uiMain.z_heartcnt_b.destroy(true);

//this.uiReadyGo = CreateUIReadyG0();
        this.uiReadyGo.z_spine.destroy(true);

//this.uiStartLevel = CreateUIStartLevel();
        this.uiStartLevel.z_mini.destroy(true);
        this.uiStartLevel.z_star1y.destroy(true);
        this.uiStartLevel.z_star3y.destroy(true);
        this.uiStartLevel.z_star2y.destroy(true);
        this.uiStartLevel.z_star1.destroy(true);
        this.uiStartLevel.z_star3.destroy(true);
        this.uiStartLevel.z_star2.destroy(true);
        this.uiStartLevel.z_stageNumber.destroy(true);
        this.uiStartLevel.z_scorebg.destroy(true);
        this.uiStartLevel.z_bonus_title.destroy(true);
        this.uiStartLevel.z_stageNumber_b.destroy(true);
        this.uiStartLevel.z_minibg_b.destroy(true);
        this.uiStartLevel.z_scoreNumber_b.destroy(true);
        this.uiStartLevel.z_scorebg_b.destroy(true);
        this.uiStartLevel.z_allcollected.destroy(true);
        this.uiStartLevel.z_spnHeart.z_spine.destroy(true);

        this.uiStartLevel.z_normal.destroy(true);
        this.uiStartLevel.z_bonus.destroy(true);
        this.uiStartLevel.z_dlgdown_b.destroy(true);
        this.uiStartLevel.z_bonusbg.destroy(true);
        this.uiStartLevel.z_dlgtop.destroy(true);
        this.uiStartLevel.z_normalbg.destroy(true);
        this.uiStartLevel.z_dlg.destroy(true);
        this.uiStartLevel.z_bg.destroy(true);

//this.uiClearLevel = CreateUIClearLevel();
        this.uiClearLevel.z_mask.destroy(true);
        this.uiClearLevel.z_allcollected.destroy(true);
        this.uiClearLevel.z_scoreNumber_b.destroy(true);
        this.uiClearLevel.z_bonus_hminmap.destroy(true);
        this.uiClearLevel.z_scorebg_b.destroy(true);
        this.uiClearLevel.z_scoreNumber.destroy(true);
        this.uiClearLevel.z_scorebg.destroy(true);
        this.uiClearLevel.z_stageNumber.destroy(true);
        this.uiClearLevel.z_bonus_title.destroy(true);
        this.uiClearLevel.z_spine_clear.destroy(true);
        this.uiClearLevel.z_spine_star.destroy(true);
        this.uiClearLevel.z_star1.destroy(true);
        this.uiClearLevel.z_star2.destroy(true);
        this.uiClearLevel.z_star3.destroy(true);
        this.uiClearLevel.z_btyes.destroy(true);
        this.uiClearLevel.z_btretry.destroy(true);
        this.uiClearLevel.z_btnext.destroy(true);

        this.uiClearLevel.z_normal.destroy(true);
        this.uiClearLevel.z_bonus.destroy(true);
        this.uiClearLevel.z_dlgdown_b.destroy(true);
        this.uiClearLevel.z_bonusbg.destroy(true);
        this.uiClearLevel.z_dlgtop.destroy(true);
        this.uiClearLevel.z_normalbg.destroy(true);
        this.uiClearLevel.z_dlg.destroy(true);
        this.uiClearLevel.z_bg.destroy(true);

//this.uiGameOver = CreateUIGameOver();
        this.uiGameOver.z_btyes.destroy(true);
        this.uiGameOver.z_game_text.destroy(true);
        this.uiGameOver.z_over_text.destroy(true);
        this.uiGameOver.z_mask.destroy(true);
        this.uiGameOver.z_dlgall.destroy(true);
        this.uiGameOver.z_dlgmelt.destroy(true);
        this.uiGameOver.z_dlg.destroy(true);

//this.uiContinue = CreateUIContinue();
        this.uiContinue.z_bg.destroy(true);
        this.uiContinue.z_dlg.destroy(true);
        this.uiContinue.z_btyes.destroy(true);
        this.uiContinue.z_spnHeart.z_spine.destroy(true);
        this.uiContinue.z_spnHeart.destroy(true);
        this.uiContinue.z_btno.destroy(true);
        this.uiContinue.z_title.destroy(true);
        this.uiContinue.z_txmsg.destroy(true);
        this.uiContinue.z_mask.destroy(true);
        this.uiContinue.z_dlg.destroy(true);
        this.uiContinue.z_bg.destroy(true);

//this.uishop = createUIShop();
        this.uishop.slots[3].destroy(true);
        this.uishop.slots[2].destroy(true);
        this.uishop.slots[1].destroy(true);
        this.uishop.slots[0].destroy(true);
        //this.uishop.btnok.destroy(true);
        //this.uishop.fnok.destroy(true);
        this.uishop.pttx.destroy(true);
        this.uishop.spPoint.destroy(true);
        //this.uishop.pt.destroy(true);
        //this.uishop.title.destroy(true);
        this.uishop.dlgbg9_t.destroy(true);
        this.uishop.dlgbg9_b.destroy(true);
        this.uishop.dlgbg9.destroy(true);
        this.uishop.bg.destroy(true);

//this.uishopresult = createUIShopResult();
        //this.uishopresult.ybt.destroy(true);
        this.uishopresult.txComment.destroy(true);
        this.uishopresult.txCnt.destroy(true);
        //this.uishopresult.sprGold.destroy(true);
        //this.uishopresult.inresultbg9.destroy(true);
        this.uishopresult.dlgbg9.destroy(true);
        //this.uishopresult.darkbg.destroy(true);

//this.hideHeart = CreateHideHeart1();
        this.hideHeart.destroy(true);

//this.txDebug =  uigame.add.text(0, 0, "", style_debug);
        this.txDebug.destroy(true);

//this.uipause = createUIPause();
        this.uipause.dlgbg9.btnhelp.destroy(true);
        this.uipause.dlgbg9.btnhome.destroy(true);
        this.uipause.dlgbg9.btnsound.destroy(true);
        this.uipause.dlgbg9.btnback.destroy(true);
        this.uipause.dlgbg9.btnx.destroy(true);
        this.uipause.dlgbg9.destroy(true);
        this.uipause.bg.destroy(true);


//this.uiHelp = CreateUIHelp();
        this.uiHelp.z_btno.destroy(true);
        this.uiHelp.z_slots[4].destroy(true);
        this.uiHelp.z_slots[3].destroy(true);
        this.uiHelp.z_slots[2].destroy(true);
        this.uiHelp.z_slots[1].destroy(true);
        this.uiHelp.z_slots[0].destroy(true);
        this.uiHelp.txPageBg.destroy(true);
        this.uiHelp.sRight.destroy(true);
        this.uiHelp.sLeft.destroy(true);
        this.uiHelp.z_title.destroy(true);
        this.uiHelp.z_dlgtop.destroy(true);
        this.uiHelp.z_dlgdown.destroy(true);
        this.uiHelp.z_bg.destroy(true);
        this.uiHelp.z_dlg.destroy(true);



    },

};
