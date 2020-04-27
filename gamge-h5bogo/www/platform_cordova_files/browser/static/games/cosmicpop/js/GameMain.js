var bMGCHEAT = false; //야후추가<>
// 게임상태를 나타낸다.
var State = {
    NONE: 0,
    LOADING_SET: 10,
    LOADING: 20,
    TITLE: 40,
    GAME: 60,
}
var Game = {
    INIT: 1000, //
    SET: 1020, //
    READY: 1025, //
    PLAY: 1030, //
    CLEAR_ANI: 1040,
    CLEAR: 1050,
    CLEAR_END: 1060,
    OVER_ANI: 1070,
    OVER: 1080,
    LEVELUP: 1090,
    STOP: 1091,
    CONTINUE: 1092,
    SELECT: 1093
}
var STATE_NONE = 0;
var STATE_LOADING_SET = 10;
var STATE_LOADING = 20;
var STATE_TITLE = 40;
var STATE_GAME = 60;
var STATE_GAME_INIT = 1000;
var STATE_GAME_SET = 1020;
var STATE_GAME_READY = 1025;
var STATE_GAME_PLAY = 1030;
var STATE_GAME_CLEAR_ANI = 1040;
var STATE_GAME_CLEAR = 1050;
var STATE_GAME_CLEAR_END = 1060;
var STATE_GAME_OVER_ANI = 1070;
var STATE_GAME_OVER = 1080;
var STATE_GAME_LEVELUP = 1090;

renderer.backgroundColor = 0xffffff;// 0x2e85ed;// // 백그라운드 컬러를 변경한다.
var VERSION = "ver 0.0.7";

var LockIconBG = {
    lock: true,
    unlock: false
};
var StarCount = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3
};

function getLockBG(lock) {
    //return lock == LockIconBG.lock ? "img/stage_select_slot_2.png" : "img/stage_select_slot_1.png";
    return lock == LockIconBG.lock ? strGamePath+"img2/select_stage_grey.png" : strGamePath+"img2/select_stage_bg.png";
}

function getLockHex(lock) {
    //return lock == LockIconBG.lock ? "img/White1x1Alpha1.png" : "img/stage_select_hexagon.png";
    return lock == LockIconBG.lock ? strGamePath+"img/White1x1Alpha1.png" : strGamePath+"img2/select_stage.png";
}

function getLockStar(lock) {
    //return lock == LockIconBG.lock ? "img/White1x1Alpha1.png" : "img/stage_select_star.png";
    return lock == LockIconBG.lock ? strGamePath+"img/White1x1Alpha1.png" : strGamePath+"img2/select_stage_star.png";
}

function getLockLock(lock) {
    //return lock == LockIconBG.lock ? "img/stage_select_lock.png" : "img/White1x1Alpha1.png";
    return lock == LockIconBG.lock ? strGamePath+"img/White1x1Alpha1.png" : strGamePath+"img/White1x1Alpha1.png";
}

function getPathMinimap(lv) {
    //if(lv>90)//레벨확장
    //    return "imgminimap/map_000.png";
    //else
        return lv < 10 ? strGamePath+"imgminimap/map_00" + (lv).toString() + ".png"
        : lv < 100 ? strGamePath+"imgminimap/map_0" + (lv).toString() + ".png"
        //: lv > 270 ? "imgminimap/map_000.png"
        : strGamePath+"imgminimap/map_" + (lv).toString() + ".png";
}

var state = State.LOADING_SET; // STATE_LOADING_SET;	// 게임을 상태를 나타내며..현상태로 해당 함수를 콜한다.
var gameState = Game.INIT; // STATE_GAME_INIT;
var nextState = State.NONE; // STATE_NONE;		// 우선 임시로 놓는다.

var AutoSaveTimeDelay = 0;
var fTimeDelay = 0;
var fTimeDelayMax = 0;

//var txtLoading;
var iLoadingCnt = 0;
var iLoadingCntDelay = 0;
//================================================================================
// 여기서부터 변수를 선언한다.
//세이브쪽으로 옮겨야 함.
var nMySecondPerDmg = [0]; // 초당 데미지
// 거북이 체력..
var iCharacterDirection = 0; // 레프트 라이트 처리..
var fClickTime = 0;
var fClickTimeMax = 0.1;

var txtMyMoney;
var txtMyCash;
var txtMyClickDmg;
var txtNextClickDmg;
var txtShurikenLv;
var txtMySecondDmg;
var txtNextSecondDmg;
var txtKunaiLv;

//var txtNextButMoney;

var TOAD_NONE = 0;
var TOAD_IN = 1;
var TOAD_IDLE = 2;
var TOAD_OUT = 3;
var sprToadGaugeMask;
var txtToadHP;
var txtToadLevel;
var iToadState = TOAD_NONE;
var nToadHP = [0];
var iToadHPMax = 0;

var spine_neko_character;
var spine_neko_shadow;
var spine_Shuriken = [];
var iShurikenCnt = 0;
var iShurikenCntMax = 20;
var spine_Kunai = [];
var iKunaiCnt = 0;
var iKunaiCntMax = 10;
var sprCash = [];
var iCashCnt = 0;
var iCashCntMax = 5;

var sprSoundBGM;
var sprSoundSE;

var sprPopupWhite;
var sprGlodShopShuriken;
var txtGlodShopAD;
var spine_GlodShopShuriken;
var sprGlodShopShurikenStar = [];
var txtGlodShopShurikenName;
var txtGlodShopShurikenInfo;
var txtGlodShopShurikenBuy;
var sprShurikenDisable;
var sprShurikenButton;
var sprCollectionShuriken = [];

var sprGlodShopKunai;
var spine_GlodShopKunai;
var sprGlodShopKunaiStar = [];
var txtGlodShopKunaiName;
var txtGlodShopKunaiInfo;
var txtGlodShopKunaiBuy;
var sprKunaiDisable;
var sprKunaiButton;
var sprCollectionKunai = [];

var txtDPS;
var sprRebirth;

//var nGoldShopAD = [];
//var fGoldShopADTime;

var sprGemShopBtn = [];
var sprGemShopBuy = [];
var txtGemShopBuy = [];
var txtGemShopBtn = [];
var txtGemShopCurrentLv = [];
var txtGemShopNextLv = [];
var txtGetShopPopupCash;

var txtOption1 = [];
var txtOption2 = [];

// 광고 관려
var iADState = 0; // 광고 상태
var fADTimeDelay = 0; // 광고 시간
var iADType = 0; // 광고의 종류
var txtAD1;
var txtAD2;

var sprFeverGauge;
var sprFeverMask;
var iFeverState = 0;
var iFeverCnt = 0;
var iFeverCntOld = 0;
var fFeverTime;
var spine_under_coin;
var spineBGCoinState = 0;
var fBGCoinTime = 0;
var spine_under_coin_fever;

var spine_coin = [];
var iCoinCnt = 0;
var iCoinCntMax = 30;

var txtScore = [];
var iScoreCnt = 0;
var iScoreCntMax = 30;
var sprRebirthWhite;

var sprTutoBG = [];
var sprTutoBox;
var txtTutoContents;
var iTutorialState = 0;
var iTutoClick = true;
var iTutoClickCnt = 0;
var fTutoTime;
var spine_tutorial_hand_1;
var spine_tutorial_arrow_2;

var txtUpgradeTitile;
var txtUpgradeContents;
var spine_UpgradeIcon = [];
var iUpgradePopupState = 0;
var fUpgradePopupTime;
var sprPopupNew;

// 업데이트함수를 호출하고 지속적으로 업데이트함수를 콜한다.
//update();
// $(document).ready(function() {
//     update();
// });

//$(function() { update(); });

//----------------- 서버에서 가져올 샘플
// var fLifeAddTime = 600;	//라이프가 획득 시간
// var iLifeMax = 5;	//라이프 맥스값
// var iLifeFirstCnt = 10;	//라이프 초기값
//var fLifeAddTime = 66;//data.Heartrefill;	//라이프가 획득 시간
//var iLifeMax = 66;//data.baseHeart;	//라이프 맥스값 -->iHeartChargeMax
//var iLifeFirstCnt = 66;//data.initHeart;	//라이프 초기값

// $(document).ready(function() {
//     if(loginTF == 0){
//         networkManager.GetGameInfo(function (data) {
//             if (networkManager.networkState != NET_STATE.LOCALHOST) {
//
//                 //	{"TF":1,"Heartrefill":600,"baseHeart":5,"initHeart":10,"money_base":0}
//                 fHeartChargeTime = data.Heartrefill;	//라이프가 획득 시간
//                 iHeartChargeMax = data.baseHeart;	//라이프 맥스값
//                 iLifeFirstCnt = data.initHeart;	//라이프 초기값
//             }
//             LoadDataInClient();
//             update();
//         });
//     }else{
//         networkManager.LoadData(function () {
//             update();
//         });
//         //LoadDataInClient();
//         // update();
//     }
// //	lang = "ja";
// //	lang = "en";
// //    var fastLoadTxt = new PIXI.Text("", {fontFamily:tbTTF[lang], fontSize:'20px', fill:'#ffffff', stroke:'#000000', strokeThickness:6});
// });

// $(document).ready(function(){
//     if(networkManager.networkState != NET_STATE.LOCALHOST){
//         networkManager.GetGameInfo(function (_data) {
//             iHeartChargeMax = _data['baseHeart'];
//             iHeartInitData = _data['initHeart'];
//             fHeartChargeTime = _data['Heartrefill'];
//
//             if(loginTF == 0)
//                 LoadDataInClient();
//
//             update();
//         });
//     }
// });



$(document).ready(function(){


    console.trace(NET_STATE);
    console.log(loginTF);
    networkManager.networkState = 1;
    if(networkManager.networkState != NET_STATE.LOCALHOST){

        console.log(1111111111111);
        networkManager.GetGameInfo(function (_data) {
            iHeartChargeMax = _data['baseHeart'];
            iHeartInitData = _data['initHeart'];
            fHeartChargeTime = _data['Heartrefill'];


            if(loginTF == 0)
                LoadDataInClient();


            //--리스트가져오기----
            //if(loginTF == 1) {
                networkManager.GetShoplist(ShopType.HEART, function () {
                });
            //}


            update();
        });
    }

    //임시 로컬 실행 모드
    if(networkManager.networkState == NET_STATE.LOCALHOST){
        console.log(22222222222222222);
        LoadDataInClient();
        update();
    }
    //임시 로컬 실행 모드
});

//---------------

//증가감소 방향
var IncrMode={Incr: 0, Decr:1};
var remainDir = IncrMode.Incr;

var busterx2 = false;


var fTimeTwinkle = 4;
var fTimeTwinkleMax = 4;

function update() {
//    if(dm) console.log("DangerMode:"+DangerMode);
    switch (state) {
    case State.NONE: // STATE_NONE: //게임모드
        break;

        case State.LOADING_SET: // STATE_LOADING_SET:
            resize();
            //--프로그래스바시작--                      <----여기서부터 복사시작
            var loader = PIXI.loader; //첫로더생성
            var resources = PIXI.loader.resources;

            //회사 로고 및 타이틀 로딩한다. //color #254699
            loader.add(strGamePath+"img/movi_01.png", strGamePath+"img/movi_01.png");
            loader.add(strGamePath+"img/movi_02.png", strGamePath+"img/movi_02.png");
            loader.add(strGamePath+"img/movi_03.png", strGamePath+"img/movi_03.png");
            loader.add(strGamePath+"img/loading_color_mask.png", strGamePath+"img/loading_color_mask.png");
            loader.add(strGamePath+"img/loading02.png", strGamePath+"img/loading02.png");
            loader.add(strGamePath+"img/zhuye002.png", strGamePath+"img/zhuye002.png");
            loader.once('complete', cbLogoComplete);
            loader.load();
            
            //cbLogoComplete에서
            // ->cbImageDownComplete(loader, res) 
            //   ->GameViewSetting(res)    //처리후
            //   ->State.TITLE로 대기모드로  //상태변경



            var style_loading = {
                font:'23px '+fontShow,
                //fontFamily : fontShow,
                //fontSize : '23px',
                //fill :  '#254699', //진파랑
                fill :  '#2e85ed', //연파랑
                //fill :  '#ffffff',
                align:'center'
            };

            /*txtLoading = new  PIXI.Text('0%', style_loading);
            //pixi4

            txtLoading.anchor.set(0.5, 0.5);
            txtLoading.position.set(360, 800);
            txtLoading.text = "0%";*/
            stage.addChild(sLoading);
            //sLoading.addChild(txtLoading);

            //로딩바작동
            loader.on(
                "progress",
                function (loader, resources){
                    //delayTime(10);
                    loadingcount+=1;
                    var progbias=loadingcount/loadingcountmax;                  // 현재갯수/전체갯수
                    var prog = progbias*100;//그래픽마스크 //progFore.scale.x=progbias;//비트맵마스크 //현재진행비율

                    var progcrop = prog<1?1:prog>100?100:prog;                  //현재비율을 1과 100사이로 자르기
                    //txtLoading.text = ""+ Math.floor(progcrop)+"%";             //정수변환+%표기,
                    //if(loadingcount<4)txtLoading.text="0%";                     //최소갯수(타이들리소스) 0 표기.
                    var scalex = loadingscalemax*progbias;                      //전체스케일 * 현재진행비율
                    var scalexcrop = scalex<1?1:scalex>loadingscalemax?loadingscalemax:scalex;//현재스케일값을 1과 맥스스케일사이로 자르기


                    if(typeof sprLogoMask !== "undefined"            //마스크로딩이 완료되면 나오게
                        && sprLogoMask) {
                        //그래픽스처리
                        sprLogoMask.clear();
                        sprLogoMask.beginFill(0xff00ff, 1);
                        sprLogoMask.drawRect(progSX, progSY, scalexcrop, progSH, 15);       //현재스케일값을 그래픽스 X값에 넣어준다.
                        sprLogoMask.endFill();
                        //그래픽스처리

                        //텍스쳐처리 //sprLogoMask.scale.x = scalexcrop;

                        if(sprLogoProg.alpha<1) sprLogoProg.alpha=1; //보라색로고가 나오게
                    }
                    // //디버그용도 --> 오브젝트 숫자를 세고, 그 카운트를 사용할 경우
                    // dm=true;
                    // var text = ("loading:"+ resources.url+"\n");
                    // text += ("progress:"+loader.progress+"\n");
                    // text += (loadingcount+"\n");
                    // if(dm) console.log("progress:"+ text);
                    // txtLoading.text=loadingcount; //
                    // //디버그용도
                }

            );

            //pixi3
            // loader.load(function () {
            // txtLoading.text = "100%";
            // sprLogoMask.scale.x = loadingscalemax;
            // }
            // );
            //pixi3

            //pixi4
            loader.load(
                function () {
                    //console.log("loader.load()"); //로고4개로드하고, 다음로딩전에 실행
                    return;
                }
            );
            //pixi4
            //--프로그래스바완료--                            <----여기서부터 복사끝
        state = State.LOADING; // STATE_LOADING;
        break;

    case State.LOADING: // STATE_LOADING:
        //updateLoading();
        break;

    case State.TITLE: // STATE_TITLE: // 타이틀화면에서 키입력이 있기까지 대기한다.
        //cbLogoComplete); //-->cbImageDownComplete(loader, res)//State.TITLE로-->GameViewSetting(res)
        //verNum.text = TX.verNum;
        //tx_copyright.text = TX.tx_copyright;

        /*if(yahooIN !== undefined || biPhone === true || bPhone){ //아이폰 소리끄기 -- 버튼 안건드리면, 전부 소리오프
        //if(true){
            if(sprJPSound.z_on===false) {
                kData.bSoundSE = false;
                kData.bSoundBGM = false;
            }else{
                kData.bSoundSE = true;
                kData.bSoundBGM = true;
            }
        }else{
            //데스크탑
        }*/
        break;

    case State.GAME: // STATE_GAME:

        //상점용도--자동저장
        AutoSaveChecker();//로컬 클라만 저장
        //상점용도--자동저장


        switch (gameState) {
            case Game.INIT: // STATE_GAME_INIT:
                state_game_init_once(); //sTitle하이드트윈, sGame보이기

                //BGMSoundPlay(bgm.title); //소음때문에 끔 //첫소리첫사운드

                ////sTitle 하이드
                //TweenPlay(sTitle, 0.5, 0, null, {alpha: 0}, false, PIXI.tween.Easing.outQuad(), cbTweenTitleOff);
                //sGame.visible = true;

                stage.addChildAt(sGame, 0);
                gameState = Game.SELECT; // STATE_GAME_SET;
                bSelectModeOnce = false;

                sHeartShop.onInitMode();
                sHeartShop.onHideAll();
                sHeartShop.timer.onSetCount(kData.iHeart);
                sHeartShop.timer.onShow();
                //sHeartShop.onShow();

                // if(yahooIN != undefined) {
                //     TweenMax.fromTo(kMGMenu.btnYahoo.main, 1, {alpha: 1}, {
                //             alpha: 0,
                //             ease: Linear.easeNone,
                //             onComplete: function () {
                //                 kMGMenu.HideYahooIcon();
                //             }
                //         }
                //     );
                // }
                break;
            case Game.SELECT: //UPdate

                if (!bSelectModeOnce) {
                    state_game_select(); //--선택--  -->clickTab(e)에서 모드변환
                    bSelectModeOnce = true;
                }
                fTimeTwinkle -= deltaTime;
                if (fTimeTwinkle < 0) {
                    fTimeTwinkle = fTimeTwinkleMax;
                    twinkleStage();
                }

                if(DangerMode === Dmode.idle){
                    SEDangerPause();
                }

                spine_title.visible = false;//

                break;

            case Game.SET: // STATE_GAME_SET: // 게임을 셋팅한다.
                if(kData.userStarArray==undefined || kData.userStarArray==null)  InitData(); //게임화면진입시 에러시
                state_game_set_once();

                fTimeDelay = 0;
                gameState = Game.READY; // STATE_GAME_READY;
                break;

            case Game.READY: // STATE_GAME_READY:
                state_game_ready_once();
                deltaBuster = 0;
                guiset_setFuelBar(); //연료초기화 0.3

                initTutorial();

                break;

            case Game.PLAY: // STATE_GAME_PLAY: //게임플레이
                //if(dm) console.log("~ ~ sGameMainUI.tut.visible:"+sGameMainUI.tut.visible
                //   +", sGameMainUI.tutbg.visible:"+sGameMainUI.tutbg.visible);
                if (busterAfterAD
                    && busterBeforeAD) {
                    player.busterpre = true; //광고전 버스터모드 복구
                    player.bustertime = 1;
                    SpinePlay(mainPlayer, null, null, AniShip.bust, 0, true);
                    mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);
                    busterAfterAD = false;
                    busterBeforeAD = false;
                }


                //runTutorial(undefined);
                //if(dm) console.log("~ ~ level.id:"+level.id);
                runTutorial(kData.tutorialpoint); //tutready==true면 실행

                update_TimerIdle();
                if (timerIdle > 600) { //10분
                    stfin = StFin.none;
                    setBSstate_(BSstates.finale);
                    timerIdle = 0;
                    //gameState = Game.PLAY;
                    //setBSstate_(BSstates.ready); //충전운석광고클릭시, 처음상태으로
                }

                player.playtime += deltaTime;
                //guiset_processFuelBar();
                guiset_processStarBar(); //상단메뉴별3, 프로그래스바 제어

                if (DangerMode == Dmode.begin) {
                    SEDangerPlay();
                    DangerMode = Dmode.run;
                } else if (DangerMode == Dmode.end) {
                    SEDangerPause();
                    DangerMode = Dmode.idle;
                } else if (DangerMode == Dmode.idle){
                    SEDangerPause();
                }

            if(rotMode) //레벨회전처리한다.----------------
            {
                rotCurTime += deltaTime;
                //if(dm) console.log("rotCurTime:"+rotCurTime);
                var biasTime = rotCurTime / rotMaxTime;
                rotCur = rotMax * biasTime;
                //rotCur = rotCur<1 ? 1 : rotCur; //최소 스케일 1로;
                if (Math.abs(rotCur) > Math.abs(rotMax)) { //회전이 다되면 정리
                    rotMode = false;
                    rotCur = rotMax; //+-60도
                    initLevelShift();
                    var r = rotMax > 0 ? Rot.Left : Rot.Right;
                    rotateLevel(r);
                    setTimeout(function(){
                        if(dm) console.log("~ ~ on:");
                        //BtnL.alpha=1;
                        //BtnR.alpha=1;
                        BtnL.active = true;
                        BtnR.active = true;
                        SpinePlay(guideLine, 361, 566, border.begin, 1, false);

                        warningDeadline();
                    }, 250);


                } else {
                    rotateAniLevel(rotCur); //절대회전값입력됨 //애니중
                    if(BtnL.active) SpinePlay(guideLine, 361, 566, border.end, 0, false);
                    BtnL.active = false;
                    BtnR.active = false;

                }

            }
            var wcnt=5; //남은 카운트 주의보 
            if(player.ballcount>0 && player.ballcount<wcnt+1){
                if(player.ballcount!=0){
                    if(remainDir == IncrMode.Decr){
                        var a = tx_remainBall.bias - deltaTime*20*((wcnt+1-player.ballcount)/wcnt);
                        if(a<0){
                            a=0;
                            remainDir = IncrMode.Incr;
                        }
                        tx_remainBall.tint=rgb2hex([1,a,a]);
                        tx_remainBall.bias=a;
                    }
                    else{ //IncrMode.Incr
                        var a = tx_remainBall.bias + deltaTime*20*((wcnt+1-player.ballcount)/wcnt);
                        if(a>1){
                            a=1;
                            remainDir = IncrMode.Decr;    
                        }
                        tx_remainBall.tint=rgb2hex([1,a,a]);
                        tx_remainBall.bias=a;
                    }
                }
                
            }else{
                if(tx_remainBall.tint!=ColorSet.white) {
                    tx_remainBall.tint=ColorSet.white;
                    remainDir = IncrMode.Incr;
                }
            }
            update_shooter(tickNow);//실제게임처리는 여기서 다 하고 있음


            render();
//            if(dm) console.log(
//                "~ ~ busterBeforeAD:"+busterBeforeAD
//                +", busterAfterAD:"+busterAfterAD
//                );    
            if(player.bustertime==1) busterBeforeAD=true; //백업



            break;
        case Game.STOP:
            break;
        case Game.CONTINUE:
            break;

        } //switch gameState

        break;//state == State.GAME 끝

    } //switch state

    //로컬하트타이머 중지
    // if(
    //     sHeartShop.onInitialized
    //    && sHeartShop.timer.onRun
    // ){
    //     var t = coolTimeHeart;
    //     coolTimeHeart = sHeartShop.timer.onAddTimer(coolTimeHeart);
    //     //if(dm) console.log( "coolTimeHeart old:"+ t +", new"+ coolTimeHeart );
    // }

    //상점용도
    /*if(heartController != null)
        heartController.Update();
    if(networkManager != null)
        networkManager.Update();
    //상점용도
    if(sHeartShop.onInitialized) {
        sHeartShop.twcooltime.onUpdateCoolTimer();
        //console.log();
    }*/



    renderer.render(stage);

    updateTick(); //tickNow를 처리
    //PIXI.tweenManager.update();
    fTimeDelay += deltaTime;
    fClickTime += deltaTime; // 클릭관련처리.
    update_DebugInfo();
    requestAnimationFrame(update);
}

function AutoSaveChecker(){//로컬 클라만 저장
    return;
    //var AutoSaveTimeDelay = 0;
    AutoSaveTimeDelay += deltaTime;
    if(AutoSaveTimeDelay < 3) return;
    AutoSaveTimeDelay = 0;

    //AD쿨타임자동저장
    var btns = sHeartShop.twcooltime.btn;
    var len = btns.length;
    for(var i=0; i<len; i++) {
        var btn1 = btns[i];
        //if (btn1.timeronoff) {
            if(!clientData.btncooltime) clientData.btncooltime = [0,0,0,0];
            clientData.btncooltime[i]=btn1.timer;
        //}
    }
    //AD쿨타임자동저장

    SaveDataInClient();
    //networkManager.SaveData();//서버에 저장
    console.log("AutoSaveChecker()");
}


//상태함수
function state_game_init_once() //시작초기화--
{
    sGame.visible = true;
    //sTitle.visible = false;

    // TweenPlay(
    //     sTitle, //오브젝트
    //     0.5, //타임
    //     0, //딜레이
    //     null, //from
    //     {
    //         alpha: 0
    //     }, //to
    //     false, //loop
    //     PIXI.tween.Easing.outQuad(), //ease
    //     cbTweenTitleOff //callback
    // );
    if (yahooIN != undefined || bMGCHEAT == true)
        kMGMenu.HideYahooIcon();
    TweenMax.to(
        sTitle, //오브젝트
        0.5,
        {
            alpha: 0,
            ease: Elastic.easeOut,
            onComplete: function (){
                cbTweenTitleOff();
            }
        }
    );

    //tx_copyright.text=TX.tx_copyright;
    if(dm) console.log("state_game_init");

    //------------버블슈터 init------------------------------------------------
    if(dm) console.log("--init by once--");
    // Load images
    //images = loadImages(["js/bubble-sprites.png"]);
    //images = loadImages(["js/bubble-sprites_392x56.png"]);


    // Add mouse events
    //canvas.addEventListener("mousemove", onMouseMove);
    //canvas.addEventListener("mousedown", onMouseDown);
    
    //사용하는 그리드 마스크 만들기
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            BStilesMask[i][j]=true;
        }
    }
    var ballcnt = bubble_levels[0].balls.length;
    var balls = bubble_levels[0].balls;
    for (var i = 0; i < ballcnt; i++) {
        BStilesMask[balls[i].x][balls[i].y] = false;
    }    
    //사용하는 그리드 마스크 만들기
    
    for (var i = 0; i < level.columns; i++) { //21
        level.tiles[i] = [];
        level.tilesBak[i] = [];
        level.tilesspnBak[i] = [];
        for (var j = 0; j < level.rows; j++) { //21
            // Define a tile type and a shift parameter for animation
            level.tiles[i][j] = new Tile(i, j, -1, 0); //x, y, type, shift //한번만 실행
            level.tilesBak[i][j] = new Tile(i, j, -1, 0); //x, y, type, shift //한번만 실행
            level.tilesspnBak[i] = [];
            var pos = getTileCoordinate(i, j);
            level.tiles[i][j].initx = pos.tilex;       //position.x 절대좌표값
            level.tiles[i][j].inity = pos.tiley;
            level.tiles[i][j].pivotx = pos.tilex + (level.tilewidth * 0.5);
            level.tiles[i][j].pivoty = pos.tiley + (level.tileheight * 0.5);
            //                //전체그리드보기
            //                var conEmpty = new PIXI.Container();
            //                sGameMain.addChild(conEmpty);
            //                conEmpty.x =  level.tiles[i][j].pivotx;
            //                conEmpty.y =  level.tiles[i][j].pivoty;
            //                debug_Obj(conEmpty, InfoPos.on, MovePos.on);    
            //                //전체그리드보기

        }
    }
    //620         //15            //40              //40/2    
    level.width = level.columns * level.tilewidth + level.tilewidth / 2;
    //482           //14            //34              //40
    level.height = (level.rows - 1) * level.rowheight + level.tileheight;

    //추가:중앙 그리드 구하기
    level.midGridx = Math.floor(level.columns / 2.0);
    level.midGridy = Math.floor(level.rows / 2.0);
    if(dm) console.log("level.midGridxy:"+ level.midGridx+", "+level.midGridx);
    //추가:중앙 외쪽상단 픽셀xy 구하기
    var midxy = getTileCoordinate(level.midGridx, level.midGridy);
    level.midx = midxy.tilex; //중앙 외쪽상단 픽셀x
    level.midy = midxy.tiley; //중앙 외쪽상단 픽셀y
    //추가:중앙 픽셀xy 구하기
    level.midxCenter = level.midx + level.tilewidth * 0.5; //그리드 중앙x pos
    level.midyCenter = level.midy + level.tileheight * 0.5; //그리드 중앙y pos    

   
    //---------------------------------------레이저방어막----------------------- ///급조
    var shoff_ray= 97;
    contBS = sGameMain;
    level.midxCenter = level.midx + level.tilewidth * 0.5; //그리드 중앙x pos
    level.midyCenter = level.midy + level.tileheight * 0.5; //그리드 중앙y pos   
    
    //빛광방어막//광방//빛방
    cShield_ray_ = new PIXI.Container(); //--> shieldsetVisible()
    cShield_ray_.position.set(level.midxCenter, level.midyCenter);//방어막루트중심
    contBS.addChild(cShield_ray_);
    
    //1번 오른쪽 방어막
    cShieldA_ray = new PIXI.Container();
    sprShieldA_ray = SpriteLoad(cShieldA_ray,  strGamePath+"img/shield_eff.png", shoff_ray, 0, 0.5, 0.5 );
    cShieldA_ray.rotation=degToRad(0); //방어막회전초기화
    cShieldA_ray.position.set(0, 0);//방어막루트중심
    cShield_ray_.addChild(cShieldA_ray);
    //2번 왼쪽 방어막    
    cShieldB_ray = new PIXI.Container();
    sprShieldB_ray = SpriteLoad(cShieldB_ray,  strGamePath+"img/shield_eff.png", shoff_ray, 0, 0.5, 0.5 );
    cShieldB_ray.rotation=degToRad(180); //방어막회전초기화
    cShieldB_ray.position.set(0, 0);//방어막루트중심
    cShield_ray_.addChild(cShieldB_ray);

    cShieldC1_ray = new PIXI.Container();
    sprShieldC1_ray = SpriteLoad(cShieldC1_ray,  strGamePath+"img/shield_eff.png", shoff_ray, 0, 0.5, 0.5 );
    cShieldC1_ray.rotation=degToRad(120); //방어막회전초기화
    cShieldC1_ray.position.set(0, 0);//방어막루트중심
    cShield_ray_.addChild(cShieldC1_ray);
    
    cShieldC2_ray = new PIXI.Container();
    sprShieldC2_ray = SpriteLoad(cShieldC2_ray,  strGamePath+"img/shield_eff.png", shoff_ray, 0, 0.5, 0.5 );
    cShieldC2_ray.rotation=degToRad(240); //방어막회전초기화
    cShieldC2_ray.position.set(0, 0);//방어막루트중심
    cShield_ray_.addChild(cShieldC2_ray);    
    //---------------------------------------레이저방어막----------------------- ///급조
        
    //버블 그리드스프라이트그리드 만들기
    contBS = sGameMain;
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            if(BStilesMask[i][j]){
                var coord = getTileCoordinate(i, j);
                BStiles[i][j] = SpriteLoad(contBS, bbArr[bbDic.empty], coord.tilex, coord.tiley, 0.0, 0.0);
                BStiles[i][j].cont=null;    ////버블아이템스파인
            //BStiles[i][j].idadd=-1;    ////버블아이템스파인
            //BStiles[i][j].idfuel=-1;    ////버블아이템스파인
            }else{
                BStiles[i][j]=undefined;
            }
            
        }
    }
    //버블 스프라이트그리드 만들기

    
    //방어막생성------------------------------------------------------
    //외계인곰 컨테이너
    cAlien = new PIXI.Container();
    cAlien.position.set(level.midxCenter, level.midyCenter);//방어막루트중심
    
    //외계인곰 스파인
    shieldspn= new PIXI.spine.Spine(spnAlien);
    SpinePlay(shieldspn, null, null, "bubble_friend_idle", 0, true);    //외계인노말상태
    //SpinePlay(shieldspn, null, null, "bubble_friend_happy", 0, true);//외계인웃기
    shieldspn.position.set(0,0);
    cAlien.addChild(shieldspn);
    contBS.addChild(cAlien);
    
   //코어운석
    mainCoreBallSpr = SpriteLoad(contBS,  strGamePath+"img/core_bubble_2.png", 360, 537);
    mainCoreBallSpr.name = "core_bubble_2";
    mainCoreBallSpr.alpha = 1;

    //방어막 변수들
    var shieldspr;
    var shieldcon;
    var shoff= 97;//113;//59;

    cShield_ = new PIXI.Container(); //--> shieldsetVisible()
    cShield_.position.set(level.midxCenter, level.midyCenter);//방어막루트중심
    contBS.addChild(cShield_);
    
    //1번 오른쪽 방어막
    cShieldA = new PIXI.Container();
    sprShieldA = SpriteLoad(cShieldA,  strGamePath+"img/shield.png", shoff, 0, 0.5, 0.5 );
    cShieldA.rotation=degToRad(0); //방어막회전초기화
    cShieldA.position.set(0, 0);//방어막루트중심
    cShield_.addChild(cShieldA);
    //2번 왼쪽 방어막    
    cShieldB = new PIXI.Container();
    sprShieldB = SpriteLoad(cShieldB,  strGamePath+"img/shield.png", shoff, 0, 0.5, 0.5 );
    cShieldB.rotation=degToRad(180); //방어막회전초기화
    cShieldB.position.set(0, 0);//방어막루트중심
    cShield_.addChild(cShieldB);

    cShieldC1 = new PIXI.Container();
    sprShieldC1 = SpriteLoad(cShieldC1,  strGamePath+"img/shield.png", shoff, 0, 0.5, 0.5 );
    cShieldC1.rotation=degToRad(120); //방어막회전초기화
    cShieldC1.position.set(0, 0);//방어막루트중심
    cShield_.addChild(cShieldC1);
    
    cShieldC2 = new PIXI.Container();
    sprShieldC2 = SpriteLoad(cShieldC2,  strGamePath+"img/shield.png", shoff, 0, 0.5, 0.5 );
    cShieldC2.rotation=degToRad(240); //방어막회전초기화
    cShieldC2.position.set(0, 0);//방어막루트중심
    cShield_.addChild(cShieldC2);
    //방어막생성--------------------------------------------------------

    //코어운석 이펙트    
    mainCoreFx = new PIXI.spine.Spine(spnCoreFx);
    mainCoreFx.interactive=false;
    contBS.addChild(mainCoreFx);
    mainCoreFx.x=mainCoreBallSpr.x;
    mainCoreFx.y=mainCoreBallSpr.y;

    //참고 itemStarArr //itemFuelArr //itemAddArr //spnStar //spnFuel //spnAddBall //생성
    //별아이템3개 생성 초기화
    var ifuellen =itemFuelArr.length;
    for (var sc=0; sc<ifuellen; sc++) {
        var spn = new PIXI.spine.Spine(spnFuel);
        var con = new PIXI.Container();
        con.addChild(spn);
        con.spn = spn;
        
        itemFuelArr[sc] = con;
        
        contBS.addChild(itemFuelArr[sc]);
    }    
    var iaddlen =itemAddArr.length;
    for (var sc=0; sc<iaddlen; sc++) {
        var spn = new PIXI.spine.Spine(spnAddBall);
        var con = new PIXI.Container();
        con.addChild(spn);
        con.spn = spn;
        itemAddArr[sc] = con;

        contBS.addChild(itemAddArr[sc]);
    }  
    var istarlen=itemStarArr.length;
    for (var sc=0; sc<istarlen; sc++) {
        var spn = new PIXI.spine.Spine(spnStar);
        var con = new PIXI.Container();
        con.addChild(spn);
        con.spn = spn;                  
        itemStarArr[sc] = con;

        contBS.addChild(itemStarArr[sc]);
    }
    

    //피날레 스프라이트 만들기
    var BSfinaleInitX = 366-level.tilewidth/2; //중앙기준이므로 공왼쪽모퉁이로 마춰줌
    var BSfinaleInitY = 1049-level.tileheight/2; //중점기준이므로 공왼쪽모퉁이로 마춰줌
    for (var i = 0; i < BSfinaleCount; i++) {
        BSfinale[i] = SpriteLoad(contBS, bbArr[bbDic.empty], BSfinaleInitX, BSfinaleInitY, 0.0, 0.0);
    }
    //피날레 스프라이트 만들기
    
    //버블 그리드스파인그리드 만들기
    contBS = sGameMain;
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            if(BStilesMask[i][j]){
                //var coord = getTileCoordinate(i, j);
                FXtiles[i][j] = new PIXI.spine.Spine(spnFxBurst);
                contBS.addChild(FXtiles[i][j]);

                //loadLevelSetSpr에서 초기화한다.
                //FXtiles[i][j].visible = true;
                //FXtiles[i][j].alpha = 1;
                //FXtiles[i][j].position.x = level.tiles[i][j].x + w2; //coord.tilex + level.tilewidth*0.5;
                //FXtiles[i][j].position.y = level.tiles[i][j].y + h2; //coord.tiley + level.tileheight*0.5;               
            }//BStilesMask[i][j]
        }
    }
    //버블 그리드스파인그리드 만들기
    
    //피날레 스파인 만들기
    for (var i = 0; i < BSfinaleCount; i++) {
        FXfinale[i] =  new PIXI.spine.Spine(spnFxBurst);
        contBS.addChild(FXfinale[i]);
    }
    //피날레 스파인 만들기
    
    //충돌효과
    spnCol.push(new PIXI.spine.Spine(spnCol_s));
    spnCol.push(new PIXI.spine.Spine(spnCol_s));
    spnCol.push(new PIXI.spine.Spine(spnCol_s));
    contBS.addChild(spnCol[0]);
    contBS.addChild(spnCol[1]);
    contBS.addChild(spnCol[2]);
    contBS.addChild(spnBusterBoom); //버스터 폭발 이펙트
    spnCol[0].state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            SpinePlay(spnCol[0], null, null,"empty", 0, true, SPINE_INIT_NONE);
            break;
        }
    };
    spnCol[1].state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            SpinePlay(spnCol[1], null, null,"empty", 0, true, SPINE_INIT_NONE);
            break;
        }
    };
    spnCol[2].state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            SpinePlay(spnCol[2], null, null,"empty", 0, true, SPINE_INIT_NONE);
            break;
        }
    };
    
    //
    //충돌효과
    
    //버블 TEXT그리드 만들기
    contBS = sGameMain;
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            if(BStilesMask[i][j]){
                //var coord = getTileCoordinate(i, j);
                    TXtiles[i][j] = FontLoad(
                    contBS,
                    ".",
                    20, 120,
                    0.5, 0.5, {
                        font: '35px ' + fontShow,
                        fill: ColorSet.white,
                        align: "center",
                        stroke:'#114C16',
                        lineJoin:"round",
                        strokeThickness:5
                    },
                    320
                );//폰트
                //loadLevelSetSpr 에서 초기화한다.
            }//BStilesMask[i][j]
        }
    }
    //버블 TEXT그리드 만들기
    
    //피날레 TEXT 만들기
    for (var i = 0; i < BSfinaleCount; i++) {
        TXfinale[i] = FontLoad(
                contBS,
                "2000",
                BSfinaleInitX, BSfinaleInitY,
                0.5, 0.5, {
                    font: '35px ' + fontShow,
                    fill: ColorSet.white,
                    align: "center",
                    stroke:'#114C16',
                    lineJoin:"round",
                    strokeThickness:5
                },
                320
            );//폰트
    }
    //피날레 TEXT 만들기
    
    
    //플레이어 공 위치
    var playerInitX = 366 - level.tilewidth / 2; //중앙기준이므로 공왼쪽모퉁이로 마춰줌
    var playerInitY = 1049 - level.tileheight / 2; //중점기준이므로 공왼쪽모퉁이로 마춰줌
    var playerInitAngle = 90;

    //var playerConst = new PIXI.Container();   //플레이어공위치
    //playerConst.position.set(playerInitX, playerInitY);
    //playerConst.name = "playerInitXY";
    //debug_Obj(playerConst, InfoPos.on, MovePos.on);
    //contBS.addChild(playerConst);    

    


//    //플레이어 화살표
//    SpArrow = SpriteLoad(contBS, "img/arrow_bubble.png",
//        playerInitX + level.tilewidth / 2,
//        playerInitY + level.tileheight / 2,
//        1, 0.5);


    //네비게이션배열설정//
    path = strGamePath+"img2/navi.png";
    for (var idx = 0; idx < navCount; idx++) {
        sprNav[idx] = SpriteLoad(
            contBS,
            path,
            playerInitX + (level.tilewidth*0.5),
            playerInitY + (level.tileheight*0.5) - (idx*navOffset)
        );
    }
    navX = playerInitX + (level.tilewidth*0.5);
    navY = playerInitY + (level.tileheight*0.5);
    navRot = degToRad(playerInitAngle);
    
    //플레이어 현재 버블
    // Init the player
    //               //x:294
    //        player.x = level.x + level.width/2 - level.tilewidth/2;
    //               //y:565 
    //        //player.y = level.y + level.height;
    //        player.y = 1115;
    //    
    sGameMain.addChild(mainPlayer); //우주선 여기로 왔음
    player.x = playerInitX; //플레이어 공 위치
    player.y = playerInitY; //플레이어 공 위치
    player.angle = playerInitAngle;
    player.tiletype = 0;

    sprTweenStone1 = SpriteLoad(contBS, bbArr[bbDic.stone1], -1000, -1000, 0.5, 0.5); //한번만 실행
    sprTweenStone2 = SpriteLoad(contBS, bbArr[bbDic.stone1], -1000, -1000, 0.5, 0.5); //한번만 실행
    sprTweenStone3 = SpriteLoad(contBS, bbArr[bbDic.stone1], -1000, -1000, 0.5, 0.5); //한번만 실행
    
    //플레이어버블
    SprPlayerBubble = SpriteLoad(contBS, bbArr[player.tiletype], player.x, player.y, 0.0, 0.0); //한번만 실행
    //debug_Obj(SpinePlayerBubble, InfoPos.on, MovePos.on);
    SprPlayerBubble.addChild(SpinePlayerBubble); //날아다니는 공에 붙는 버스터스파인
    SpinePlay(SpinePlayerBubble, 28, 28, BusterAni.idle, 1, true);//날아다니는 공에 붙는 버스터스파인 //state_game_init_once
    //플레이어소유버블보이기

    //플레이어소유버블보이기

    //플레이어 다음 버블
    //        player.nextbubble.x = player.x - 2 * level.tilewidth;
    //        player.nextbubble.y = player.y;
    //        SprPlayerBubbleNext = SpriteLoad(contBS, bbArr[player.tiletype], player.nextbubble.x, player.nextbubble.y, 0.0, 0,0); //한번만 실행
    //넥스트버블넥스트,다음버블다음
    //SprPlayerBubbleNext = SpriteLoad(contBS, bbArr[player.tiletype], player.nextbubble.x, player.nextbubble.y, 0.0, 0,0); //한번만 실행


    //contBS.addChild(mainCoreBallSpr);
    // Clear the canvas
    //context.clearRect(0, 0, canvas.width, canvas.height);
    //if(dm) console.log("--canva size:"+canvas.width+","+canvas.height);

    if(dm) console.log("--init by once --fin--");

    //SpArrow.visible = false;
    for(var n1=0; n1<navCount; n1++){sprNav[n1].visible=false;}
    SprPlayerBubble.visible = false;
    //SprPlayerBubbleNext.visible = false;
    mainPlayer.visible = false;
    mainCoreBallSpr.visible = false;
    guideLine.visible = false;
    deadLine.visible = false;
    mainPlayer.visible = false;
    
    getAlphaMultipleGlobal( 0.5 ); //알파 사라짐이 시작될 위치배수// 0.5면 2, 0.25면 1.33
    //newGame(); --> state_game_set_once() //Game.SET:

    reAddChildDevBtn();
    //---버블슈터 init----------------------------------------------------------------------

}

//참고 lvNumber // cShield_ // attArrSD // shieldsetVisible // stateShield(dt) //hieldst=ShieldSt.begin;
function shieldsetVisible(onoff){
    if(onoff==false){
        //if(cAlien.visible==true) { 
            SpinePlay(shieldspn, null, null, "bubble_friend_happy", 0, true);//외계인웃기
            //cAlien.visible = false;
            
        //}
        if(cShieldA.visible==true) cShieldA.visible = false;
        if(cShieldB.visible==true) cShieldB.visible = false;
        if(cShieldC1.visible==true) cShieldC1.visible = false;
        if(cShieldC2.visible==true) cShieldC2.visible = false;
        
        if(cShieldA_ray.visible==true) cShieldA_ray.visible = false;
        if(cShieldB_ray.visible==true) cShieldB_ray.visible = false;
        if(cShieldC1_ray.visible==true) cShieldC1_ray.visible = false;
        if(cShieldC2_ray.visible==true) cShieldC2_ray.visible = false;
    }else{
        //if(cAlien.visible==false){
            SpinePlay(shieldspn, null, null, "bubble_friend_idle", 0, true);    //외계인노말상태
            //cAlien.visible = true;  
        //} 
        if(typeSD==TypeSD.none){
            if(cShieldA.visible==true) cShieldA.visible = false;
            if(cShieldB.visible==true) cShieldB.visible = false;
            if(cShieldC1.visible==true) cShieldC1.visible = false;
            if(cShieldC2.visible==true) cShieldC2.visible = false;
            if(cShieldA_ray.visible==true) cShieldA_ray.visible = false;
            if(cShieldB_ray.visible==true) cShieldB_ray.visible = false;
            if(cShieldC1_ray.visible==true) cShieldC1_ray.visible = false;
            if(cShieldC2_ray.visible==true) cShieldC2_ray.visible = false;
        }else if(typeSD==TypeSD.one){
            if(cShieldA.visible==false) cShieldA.visible = true;
            if(cShieldB.visible==true) cShieldB.visible = false;
            if(cShieldC1.visible==true) cShieldC1.visible = false;
            if(cShieldC2.visible==true) cShieldC2.visible = false;
            if(cShieldA_ray.visible==false) cShieldA_ray.visible = true;
            if(cShieldB_ray.visible==true) cShieldB_ray.visible = false;
            if(cShieldC1_ray.visible==true) cShieldC1_ray.visible = false;
            if(cShieldC2_ray.visible==true) cShieldC2_ray.visible = false;
        }else if(typeSD==TypeSD.two){
            if(cShieldA.visible==false) cShieldA.visible = true;
            if(cShieldB.visible==false) cShieldB.visible = true;
            if(cShieldC1.visible==true) cShieldC1.visible = false;
            if(cShieldC2.visible==true) cShieldC2.visible = false;
            if(cShieldA_ray.visible==false) cShieldA_ray.visible = true;
            if(cShieldB_ray.visible==false) cShieldB_ray.visible = true;
            if(cShieldC1_ray.visible==true) cShieldC1_ray.visible = false;
            if(cShieldC2_ray.visible==true) cShieldC2_ray.visible = false;
        }else if(typeSD==TypeSD.three){
            if(cShieldA.visible==false) cShieldA.visible = true;
            if(cShieldB.visible==true) cShieldB.visible = false;
            if(cShieldC1.visible==false) cShieldC1.visible = true;
            if(cShieldC2.visible==false) cShieldC2.visible = true;
            if(cShieldA_ray.visible==false) cShieldA_ray.visible = true;
            if(cShieldB_ray.visible==true) cShieldB_ray.visible = false;
            if(cShieldC1_ray.visible==false) cShieldC1_ray.visible = true;
            if(cShieldC2_ray.visible==false) cShieldC2_ray.visible = true;
        }
    }
}
function hideFinale(){ //피날레끄기
    //var len = BSfinale.length;
    for (var i = 0; i < BSfinaleCount; i++) {
        if(BSfinale[i].visible == true) BSfinale[i].visible = false;
        if(FXfinale[i].visible == true) FXfinale[i].visible = false;
        if(TXfinale[i].visible == true) TXfinale[i].visible = false;
    }
    tx_remainBall.text = 0;//강제0으로
}
//function showFinale(){//피날레켜기
//    //var len = BSfinale.length;
//    for (var i = 0; i < BSfinaleCount; i++) {
//        if(BSfinale[i].visible == false) BSfinale[i].visible = true;
//        if(FXfinale[i].visible == false) FXfinale[i].visible = true;
//        if(TXfinale[i].visible == false) TXfinale[i].visible = true;
//    }
//}
function state_game_select() //--선택--
{
    hideFinale();
    
    //SpArrow.visible = false;
    if(sprNav[0].visible) for(var n1=0; n1<navCount; n1++){sprNav[n1].visible=false;} //레벨선택화면-네비
    shieldsetVisible(false);
    //쉬드보호막을 끄면 왜계인이 웃기 시작하므로
    SpinePlay(shieldspn, null, null, "empty", 0, true);

    
    SprPlayerBubble.visible = false;
    //SprPlayerBubbleNext.visible = false;
    mainPlayer.visible = false;
    mainCoreBallSpr.visible = false;
    mainCoreFx.visible = false;
    guideLine.visible = false;
    SpinePlay(
        deadLine,
        null,
        null,
        laser.idle,
        0, true
    );    
    deadLine.visible = false;
    
    hideItemBubble();
    //스프라이트배열 숨기기
    var alen = BStiles.length;
    var blen = BStiles.length;
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            if(BStilesMask[i][j]){
                BStiles[i][j].visible = false;
            }
        }
    }

    //현재레벨위치기준으로 레벨선택창 리플레쉬
    if(dm) console.log("kData.curLevel: " + kData.curLevel);
    if (kData.curLevel >= LEVEL_MAX - 1) //마지막 레벨 도달
    {
        setSelectPageByNumber(LEVEL_MAX - 1); //다음레벨 페이지로 안간다.
    } else {
        setSelectPageByNumber(kData.curLevel); //지정레벨에 맞는 페이지를 업데이트한다.
    }

    //finish_Game(); 버스터끄기가 우주선 나오기때문에 주석처리

    //선택화면상충전아이템들
    try //로드시에러시초기화
    {
        sHeartShop.timer.onSetCount(kData.iHeart);//TxtHeartSelectLevel.text = kData.userHeartCount.toString();
    } catch (e) {
        InitData();//선택창에서 에러시
        sHeartShop.timer.onSetCount(kData.iHeart)//TxtHeartSelectLevel.text = kData.userHeartCount.toString();
    }

    var totalstar = getTotalStar();
    TxtStarSelectLevel.text = totalstar + " / " + (LEVEL_MAX * 3).toString();

    //사운드온오프 버튼 초기화
    bgmOffMarkinSel.visible = kData.bSoundBGM ? false : true;
    sfxOffMarkinSel.visible = kData.bSoundSE ? false : true;

    TxPageSelectLevel.text= (curPage+1)+"/"+PAGE_MAX;

    selectPopUpUI(Pop.SelectLevel);
    sHeartShop.timer.onShow();
    
    // TweenMax.delayedCall(
    //     0.5, //tilem
    //     twinkleStage
    // );
    
    if(dm) console.log("kData.iHeart: " + kData.iHeart);
    if(dm) console.log("--state_game_select--");
}

function state_game_set_once() //--시작전--
{
    //SpArrow.visible = true;
    for(var n1=0; n1<navCount; n1++){sprNav[n1].visible=true;}

    SprPlayerBubble.visible = true;
    //SprPlayerBubbleNext.visible = true;
    mainCoreBallSpr.visible = true;
    guideLine.visible = true;
    deadLine.visible = false;
    mainPlayer.visible = true;

    SpinePlay(mainPlayer, 366, 1070, AniShip.idle, 0, true);
    //SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);
    hideFinale();
    //mainPlayer.visible = true;//이건 안해도 됨 //cancelBusterSpine()에서 mainplayer.idle동작을 시키므로
    if(dm) console.log("~ ~ state_game_set_once().cancelBusterSpine");
    cancelBusterSpine(); //뉴게임전
    resetBuster();
    newGame();


    //메인UI 레벨 숫자 리프레쉬
    if (TxStage) {
        TxStage.text = kData.curLevel + 1;
    }


    if(dm) console.log("state_game_set");
}
var gameStateOld = null;

function state_game_ready_once() {
    if(dm) console.log("state_game_ready");
    gameState = Game.PLAY;
}

// function cbButtonTuto() {
//     switch (iTutorialState) {
//     case 1:
//         iTutorialState = 2;
//         break;
//     case 7:
//         iTutorialState = 8;
//         break;
//     case 9:
//         iTutorialState = 10;
//         break;
//     case 24:
//         iTutorialState = 25;
//         break;
//     case 30:
//         iTutorialState = 31;
//         break;
//     case 35:
//         iTutorialState = 36;
//         break;
//     case 37:
//         iTutorialState = 38;
//         break;
//     case 39:
//         iTutorialState = 40;
//         break;
//     case 43:
//         iTutorialState = 44;
//         break;
//     case 45:
//         iTutorialState = 46;
//         break;
//     case 47:
//         iTutorialState = 48;
//         break;
//     case 50:
//         iTutorialState = 51;
//         break;
//     }
// }

function SetToadHPMax() {
    var iPow = kData.nToadHPMax.length - 1;
    if (iPow > 5) iPow = 5;
    var iMin = kData.nToadHPMax.length - 1 - 5;
    if (iMin < 0) iMin = 0;
    for (var i = kData.nToadHPMax.length - 1; i >= iMin; --i) {
        iToadHPMax += kData.nToadHPMax[i] * Math.pow(10, iPow);
        iPow--;
    }
}

function UpdateToadHP() {
    txtToadHP.text = XNumViewString(nToadHP) + " / " + XNumViewString(kData.nToadHPMax);

    // 두꺼비 게이지 표시..
    var iPow = nToadHP.length - 1;
    if (iPow > 5) iPow = 5;
    var iMin = kData.nToadHPMax.length - 1 - 5;
    if (iMin < 0) iMin = 0;
    var iA = 0;
    for (var i = nToadHP.length - 1; i >= iMin; --i) {
        iA += nToadHP[i] * Math.pow(10, iPow);
        iPow--;
    }
    sprToadGaugeMask.scale.set(iA / iToadHPMax, 1);
}

function cbTweenTitleOff() {
    sTitle.visible = false;
}

// 게임 시작할때마다 초기화.
//function GameSet()
//{
//	if(kData.nMySecondDmg.length > 1 || kData.nMySecondDmg[0] > 0)
//	{
//		spine_neko_shadow.visible = true;
//		spine_neko_shadow.alpha = 0;
//		TweenPlay(spine_neko_shadow, 0.5, 0, null, {alpha:1}, false, PIXI.tween.Easing.outQuad());
//	}
//}

function cbButtonWhite() {
    // 블랙 약간 투명부분이 터치가 통과하지 않게 막아준다.
    // 여기서는 뒤쪽 터치를 막기위한 용도이므로 아무짓도 하지 않는다.
}

function cbButtonSoundBGM() {
    if (kData.bSoundBGM == true) {
        kData.bSoundBGM = false;
        BGMSoundPause();
    } else {
        kData.bSoundBGM = true;
        BGMSoundResume();
    }
    SaveDataInClient();
    SetSoundIcon();
}

function cbButtonSoundSE() {
    if (kData.bSoundSE == true)
        kData.bSoundSE = false;
    else
        kData.bSoundSE = true;
    SaveDataInClient();
    SetSoundIcon();
}

function SetSoundIcon() {
    if (kData.bSoundBGM == true)
        sprSoundBGM.texture = SpritePool.getInstance().get( strGamePath+"img/bgm_on.png").texture;
    else
        sprSoundBGM.texture = SpritePool.getInstance().get( strGamePath+"img/bgm_off.png").texture;

    if (kData.bSoundSE == true)
        sprSoundSE.texture = SpritePool.getInstance().get( strGamePath+"img/se_on.png").texture;
    else
        sprSoundSE.texture = SpritePool.getInstance().get( strGamePath+"img/se_off.png").texture;
}

function cbButtonCheatDataInit() {
    SESoundPlay(SE_Button);
    InitData();//치트
}

function cbButtonCheatDebug() {
    SESoundPlay(SE_Button);
}

function cbButtonStart(e) {
    //야후추가<스타트버튼//타이틀버튼
    if(yahooIN != undefined) {
        if(kData["bTermsOfUse"] === undefined) {
            kMGMenu.ShowTermsOfUse();
            return;
        }
        if(kMGMenu.attendanceTF == 1) // 출석이벤트 토스트 출력.
            kMGMenu.SetToastMsg(kMGMenu.GetString("attendance"));
    }
    //야후추가>

    SESoundPlay(se.SE_Start); //알파자체가 0이므로 소리가 안나오게 되어 잇어서 고침
    if (
        state != State.TITLE // STATE_TITLE
    ) return;
    //	this.interactive = false;
    state = State.GAME; // STATE_GAME;
    gameState = Game.INIT; // STATE_GAME_INIT;
    //spine_title.visible = false;
}

//로딩이미지를 뿌리고 나서 생각해봐야 한다.
// function updateLoading() {
//     if (++iLoadingCntDelay > 8) {
//         iLoadingCntDelay = 0;
//         if (++iLoadingCnt >= 4) iLoadingCnt = 0;
//         switch (iLoadingCnt) {
//         case 0:
//             txtLoading.text = "Loading.";
//             break;
//         case 1:
//             txtLoading.text = "Loading..";
//             break;
//         case 2:
//             txtLoading.text = "Loading...";
//             break;
//         case 3:
//             txtLoading.text = "Loading....";
//             break;
//         }
//     }
// }

var progSX;
var progSY;
var progSH;

var sprLogo;
var sprLogoProg;

//야후추가< 공통메뉴생성
// 가로세로, 타이틀, 설명, 랭킹 ['DAILY', 'TOTAL'], 픽시버젼, kData 모비포인트 변수명
lang = 'en';
CURRENT_LANGUAGE=(lang==='ko'?LANGUAGE_KOR:lang==='ja'?LANGUAGE_JPN:lang==='en'?LANGUAGE_ENG:LANGUAGE_ENG);

var kMGMenu;
//if(yahooIN != undefined || bMGCHEAT == true)
    kMGMenu = new MGMenu(MGM_VERTICAL, GetString("MGM_Title"), GetString("MGM_Contents"), [], 3, 'greappoint');
if(yahooIN === undefined && bMGCHEAT == false)
    kMGMenu.HideMenu();
//야후추가>

function cbLogoComplete() {
    // 로딩바 준비 셋팅                       <----여기서부터 복사시작
    //var namey = 550;
    var iSH = iCenterSizeY - 130;
    // sprLogo = SpritePool.getInstance().get("img/loading_logo.png");
    // sprLogo.anchor.set(0.5, 0.5);
    // sprLogo.position.set(iCenterSizeX,logoy);
    // sLoading.addChild(sprLogo);

    // var spr = SpritePool.getInstance().get("img/white.png");
    // spr.position.set(iCenterSizeX,iCenterSizeY);
    // spr.scale.set(iMaxSizeX, iMaxSizeY);
    // spr.tint = 2e85ed;
    // spr.alpha = 1;
    // sLoading.addChild(spr);
    //renderer.backgroundColor = 0x2e85ed; // 백그라운드 컬러를 변경한다.

    /*var sprLogoBg = SpriteLoad(sLoading, strGamePath+"img/movi_01.png", iCenterSizeX, iSH);
    sprLogoBg.anchor.set(0.5, 0.5);
    sLoading.addChild(sprLogoBg);

    progSX = iCenterSizeX-(sprLogoBg.width/2);
    progSY = iSH-(sprLogoBg.height/2);
    progSH = sprLogoBg.height;
    loadingscalemax = sprLogoBg.width; //235 //리소스 4개 로딩후에  값이 입력되고 있다는 것

    sprLogo = SpriteLoad(sLoading, strGamePath+"img/movi_03.png", iCenterSizeX, iSH+170);
    sprLogo.anchor.set(0.5, 0.5);
    sprLogo.alpha=1;


    sprLogoProg = SpriteLoad(sLoading, strGamePath+"img/movi_02.png", iCenterSizeX, iSH);
    sprLogoProg.anchor.set(0.5, 0.5);
    sprLogoProg.alpha=0;

    //마스크그래픽
    sprLogoMask = new PIXI.Graphics();
    sprLogoProg.mask = sprLogoMask;
    //마스크그래픽

    sLoading.addChild(sprLogoMask);*/

    this.zhuye002  = SpriteLoad(sLoading, strGamePath+"img/zhuye002.png", iCenterSizeX, iCenterSizeY);
    this.zhuye002.anchor.set(0.5, 0.5);
    sLoading.addChild(this.zhuye002);

    this.zhuye002.anchor.set(.5),
    this.zhuye002.scale.set(.1),
    this.zhuye002.rotation = 20,
    this.tween ? this.tween.kill() : this.tween = new TimelineLite,
    this.tween.to(this.zhuye002, 1, {
        rotation: 0, ease: Sine.easeOut
    }),
    this.tween.call(showLocoText.bind(this)),
    TweenMax.to(this.zhuye002.scale, 1, {x: 0.5, y: 0.5});

    //                                         <----여기서부터 복사끝

    function showLocoText() {
        TweenMax.to(this.zhuye002, 0.2, {
            x: iCenterSizeX + 50, ease: Sine.easeIn
        });

        this.loading02  = SpriteLoad(sLoading, strGamePath+"img/loading02.png", iCenterSizeX - 70, 610);
        this.loading02.anchor.set(0.5, 0.5);
        sLoading.addChild(this.loading02);
        this.loading02.scale.set(.2);
        //this.loading02.alpha = 0;
        /*TweenMax.to(this.loading02, 1, {
            alpha: 1, ease: Sine.easeOut
        });*/

        TweenMax.to(this.loading02.scale, 0.3, {x: 0.6, y: 0.6, ease: Sine.easeOut, onComplete:(function () {
                TweenMax.to(this.loading02.scale, 0.2, {x: 0.5, y: 0.5, onComplete:(function () {

                    }).bind(this)});
            }).bind(this)});
    }

    networkManager.LoadData(function (_data) {  //-----------------첫로딩데이터 //야후추가<>
        LoadOnlyClientData();

        //언어변경 한글,일어,영어
        CURRENT_LANGUAGE=(lang==='ko'?LANGUAGE_KOR:lang==='ja'?LANGUAGE_JPN:lang==='en'?LANGUAGE_ENG:LANGUAGE_ENG);

        //강제변경
        //CURRENT_LANGUAGE=LANGUAGE_JPN;
        //CURRENT_LANGUAGE=LANGUAGE_ENG;
        //강제변경

        //언디파인드예외처리undefined예외처리
        if(typeof(kData.bSoundSE) === 'undefined'||typeof(kData.bSoundBGM) === 'undefined'){
            if(typeof(kData.bSoundSE) === 'undefined') kData.bSoundSE=true;
            if(typeof(kData.bSoundBGM) === 'undefined') kData.bSoundBGM=true;
        }



        // 이미지 다운로드.
        var loader = PIXI.loader;
        for (var i = 0; i < tbImgGame.length; ++i)
            loader.add(tbImgGame[i], tbImgGame[i]);
        //	for(var i=0;i<tbLanguageImage[CURRENT_LANGUAGE].length;++i)
        //		loader.add(tbLanguageImage[CURRENT_LANGUAGE][i], tbLanguageImage[CURRENT_LANGUAGE][i]);
        //-----
        //아틀라스로딩
        if(lang == 'ko') {

        }
        else if(lang == 'ja'){

        }
        else{//lang == 'en'

        }
        //아틀라스로딩
        //------

        //스파인리스트
        loader.add('buster_bubble',   strGamePath+'spine/buster_bubble.json');
        loader.add('core_bubble_eff', strGamePath+'spine/core_bubble_eff.json');
        loader.add('dead_line',       strGamePath+'spine/dead_line.json');
        loader.add('normal_bubble_bomb', strGamePath+'spine/normal_bubble_bomb.json');

        // if(lang == 'ja') {
        //     loader.add('title', 'spine_jp/title.json');
        //     loader.add('arrow_btn_z2',        'spine_jp/arrow_btn.json');
        // }else{
            loader.add('title', strGamePath+'spine/title.json');
            loader.add('arrow_btn_z2',        strGamePath+'spine2/arrow_btn.json');
        // }

        loader.add('bubble_crack_z2',     strGamePath+'spine2/bubble_crack.json');
        loader.add('bubble_eff_z2',       strGamePath+'spine2/bubble_eff.json');
        loader.add('bubble_friend',       strGamePath+'spine2/bubble_friend.json');
        loader.add('bullet_ui_effect_z2', strGamePath+'spine2/bullet_ui_effect.json');          //"img/bubble_count.png"
        loader.add('guard_line',          strGamePath+'spine2/guard_line.json');
        loader.add('item_bullet',         strGamePath+'spine2/item_bullet.json');                //changed
        loader.add('item_star',           strGamePath+'spine2/item_star.json');                  //changed
        loader.add('item_thunder',        strGamePath+'spine2/item_thunder.json');               //changed
        loader.add('popup_star_ani_z2',   strGamePath+'spine2/popup_star_ani.json');
        loader.add('space_rotation',      strGamePath+'spine2/space_rotation.json');             //changed
        loader.add('space_ship_ani',      strGamePath+'spine2/space_ship_ani.json');             //changed
        loader.add('stage_slot_ani_z2',   strGamePath+'spine2/stage_slot_ani.json');
        loader.add('ui_star_eff_z2',      strGamePath+'spine2/ui_star_eff.json');
        loader.add('heart_bomb',      strGamePath+'spine2/heart_bomb.json');

        //비트맵폰트추가--
        loader.add('shop_no-export', strGamePath+'./font/shop_no-export.xml');
        //비트맵폰트추가--

        // //픽시사운드로드
        // loader.add(
        //     [
        //         {
        //             name: "" +
        //             "bgm_title",
        //             url: tbBGMName[bgm.title]
        //         } //배경음다운준비
        //     ]
        // ); // 음악 로드.if (yahooIN != undefined || bMGCHEAT == true) {
        // //픽시사운드로드
        //하울러사운드로드-------------
        for (var i = 0, imax = tbSEName.length; i < imax; ++i) {
            if (i === 0){
                soundCtrl[0] = new Howl({ src: tbSEName[0], loop: true }); //배경음
            }else if(i === 26){
                soundCtrl[i] = new Howl({ src: tbSEName[i], loop: true }); //경고음
            }else {
                soundCtrl[i] = new Howl({ src: tbSEName[i], loop: false }); //효과음
            }
        }
        //하울러사운드로드-------------
        loader.once('complete', cbImageDownComplete); //<-- -- --
        loader.load();

        //야후추가< //아이디입력 //로드
        //if (yahooIN != undefined || bMGCHEAT == true) {
            if (_data != null)
                kMGMenu.load(_data.user_id);//rb,.
            else
                kMGMenu.load("GUEST");//rb,.로컬

            kMGMenu.comment = GetString("MGM_Contents");//국가설정을 지금 받으므로
        //}
        //야후추가>

    }); //네트워크매니저의 loaddata()
}

//야후추가< 아이폰변수, 아이폰사운드버튼
// yahooIN : 아래 두변수 추가.
var biPhone = false;
var sprJPSound;
//야후추가>

function cbImageDownComplete(loader, res) {
    if (this.tween) this.tween.kill();
    this.zhuye002.destroy(true, true);
    if (this.loading02) this.loading02.destroy(true, true);

    stage.removeChild(sLoading);
    //sprLogo.destroy(false, false);
    sLoading.destroy();
    //txtLoading.destroy(true, true);
    stage.addChild(sTitle);

    //야후추가< 아아폰안드로이드
    // modifier : kook : 일본대응 : 아이폰일경우 사운드가 초반에 출력되지 않아 임시로 셋팅한다.
    //if (yahooIN != undefined) {
    //야후뿐 아니라 모바일 대응바뀌어서 풀엇음
        if (/Android/i.test(navigator.userAgent)) {
            biPhone = false;
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            biPhone = true;
        } else {
            biPhone = false;
        }
    //}
    //야후추가>

    GameViewSetting(res); // 화면구성을 한다.
    SpinePlay(spine_title, iCenterSizeX, iCenterSizeY, "title_in", 1, false);
    state = State.TITLE; // STATE_TITLE;

    //전체이용가
    SpriteLoad(sTitle, strGamePath+"img/all.png", iCenterSizeX + 285, iCenterSizeY - 555);
    //전체이용가

    /*if(bPhone) {//로딩후 모바일일때 사운드 정지
        kData.bSoundBGM = false;
        kData.bSoundSE = false;
        BGMSoundPause();
    }*/
    //야후추가< 공통메뉴addchild 선택화면
    //if(yahooIN != undefined || bMGCHEAT == true)
        stage.addChild(kMGMenu.main);//연결
    //야후추가>


    // 사운드 처리
    //arrBGM[BGM_Game] = PIXI.audioManager.getAudio('BGM_Game');
    //arrBGM[BGM_Title] = PIXI.audioManager.getAudio('BGM_Title');
    //arrBGM[0] = PIXI.audioManager.getAudio('bgm_title'); //배경음 배경음배열에등록
    //if(dm) console.log("kData.bSoundBGM:" + bSoundBGM + ", arrBGM.len:" + arrBGM.length);
    iBGMCurrent=0;

    // if(yahooIN != undefined && biPhone === true) {
    // }else{

    if(kData.bSoundBGM)  BGMSoundPlay(iBGMCurrent); //첫사운드
    //kData.bSoundBGM = false;
    //kData.bSoundSE = false;

    //}

    // if(yahooIN !== undefined && biPhone === true){//야후 아이폰사운드 기본정지모드로//아이폰사운드일시정지
    // //if(true) {
    //     BGMSoundPause();
    // }


    // var loader = PIXI.loader;
    // var bgmcnt = 1;
    // for (var i = 0; i < tbSEName.length; ++i) {
    //     loader.add({
    //         name: tbSEName[i][0],
    //         url: tbSEName[i]
    //     }); //효과음다운준비
    // }
    // loader.load(function () {
    //     ////	for(var i=0;i<2;++i)
    //     //    //그냥 주석처리 해봄
    //     //    		arrBGM[0] = PIXI.audioManager.getAudio(tbSoundName[0][0]);
    //     for (var i = 0; i < tbSEName.length; ++i)
    //         arrSE[i] = PIXI.audioManager.getAudio(tbSEName[i][0]); //효과음 효과음배열에 등록
    // });

}


//게임화면구성.
function GameViewSetting(res) {
    //	//========================================================================
    //	// 변수 초기화 : 최초 한번만 초기화 한다.
    ////	fItemIncreateDmg *= 100;
    ////	fItemBuyMoney *= 10;
    //	//nToadHP = XMultiply(XNumToNum(iToadBase), XNumToNum(Math.pow(iToadHPIncreate, kData.iToadLevel)));
    //	//========================================================================
    
    //스파인임시저장
    spnFxBurst = res.normal_bubble_bomb.spineData;
    spnAlien = res.bubble_friend.spineData;
    spnCoreFx = res.core_bubble_eff.spineData;  //다른데서 쓰려고 스파인
    spnFuel = res.item_thunder.spineData;       //연료충전 부스터연료 스파인
    spnAddBall = res.item_bullet.spineData;     //버블충전 스파인
    spnStar = res.item_star.spineData;              //버블충전스파인    
    spnRLRotation = res.arrow_btn_z2.spineData;     //메인좌우회전버튼  
    spnRemain_s = res.bullet_ui_effect_z2.spineData; //남은버블배경
    spnSelectStage_s = res.stage_slot_ani_z2.spineData; //스테이지선택 반짝임
    spnCol_s = res.bubble_eff_z2.spineData;      //벽충돌 효과

    //타이틀화면 구성------------------------------
    debug_mode = true;

    //debug_mode=false;
    var path;
    var cont = sTitle;
    
    spine_title = new PIXI.spine.Spine(res.title.spineData); //타이틀배경
    cont.addChild(spine_title);
    //SpinePlay(spine_title, iCenterSizeX, iCenterSizeY, "title_idle", 0, true);
    spine_title.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            SpinePlay(spine_title, null, null,"title_idle", 0, true, SPINE_INIT_NONE);
            break;
        }
    };
    //----타이틀화면중 저작권표시
    //야후추가 //저작권
    /*var tx_copyrightcontext=undefined;
    if(document.location.href.indexOf("game.jp") > 0) {
        tx_copyrightcontext = "(C) RECOM Co.,Ltd. 2017 All Rights Reserved.";
        FontLoad(sTitle, tx_copyrightcontext, 360, 1250, 0.5, 0.5, {
            font: 'Bold 17px '+ "Arial", fill: ColorSet.white, align: "center" }, 0);
    }else{
        tx_copyrightcontext = "Copyright Ⓒ 2017 Game Corp. All rights reserved";
        FontLoad(sTitle, tx_copyrightcontext, 360, 1250, 0.5, 0.5, {
            font: 'Bold 17px '+ "Arial",  fill: ColorSet.white, align: "center" }, 0);
    }*/
    //야후추가 //저작권

    spr = SpriteLoad(cont,  strGamePath+"img/white.png", iCenterSizeX, iCenterSizeY);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.0;
    spr.interactive = true;
    setNormaButtonTint(spr, cbButtonStart);

    //야후추가< //타이틀에 추가된 아이폰사운드 버튼
    //if(true){
    if(yahooIN !== undefined || biPhone === true || bPhone){
        sprJPSound = setNormaButtonCon(cont, //conparent:부모
            new PIXI.Container(), //con:디스
            {x: 640, y: 1168}, //conpos:위치
            SpriteLoad(undefined, strGamePath+"img2/sound_iphone_on.png", 0, 0), //spr1:배경//debug_Sprite(sprShopYBtn1);,
            undefined, //spr2:아이콘
            undefined,  //tx:텍스트
            function () {
                if(sprJPSound.z_on===true) {
                    kData.bSoundBGM = false;
                    sprJPSound.z_on=false;
                    sprJPSound.spr2 = SpriteLoad(sprJPSound, strGamePath + "img2/sound_iphone_off.png", 0, 0);
                    BGMSoundPause();


                }else{
                    kData.bSoundBGM = true;
                    sprJPSound.z_on=true;
                    sprJPSound.spr2 = SpriteLoad(sprJPSound, strGamePath + "img2/sound_iphone_on.png", 0, 0);
                    BGMSoundResume();

                }
            },
            undefined //값이 있으면 spr1.heartIndex에 저장한다.
        );
        //sprJPSound.z_on = false;
        sprJPSound.spr2 = SpriteLoad(sprJPSound, strGamePath + "img2/sound_iphone_on.png", 0, 0);
    }
    if(biPhone === false && bPhone == false) {
        //데스크탑인경우
        var test = "test";
    }
    //야후


    //야후추가> //타이틀 아이폰사운드 버튼




    
    /*verNum = FontLoad(sTitle, VERSION, 700, 1250, 1, 0.5, //버젼표시
        {
            font: 'Bold 17px '+ "Arial",
            fill:'#A0A0FF',
            align: "center",
            //stroke: ColorSet.black,
            //strokeThickness: 2
        });*/

    var tempfont = FontLoad(sTitle, "xx", -100, -100, 0, 0.5, {
        font: '20px ' + fontShow,
        fill: '#FFE300',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);

    //본게임배경화면-------------------------
    cont = sGame;
    sGameBG = new PIXI.spine.Spine(res.space_rotation.spineData); //게임배경
    cont.addChild(sGameBG);
    SpinePlay(sGameBG, iCenterSizeX, iCenterSizeY, "space_rotation_1", 0, true);
    //--배경회전처리
    sGameBG.state.onComplete = function (trackIndex, count) {
            switch (trackIndex) {
            case 1:
                if(dm) console.log("end1");
                SpinePlay(sGameBG, null, null, AniSpace.stopA, 0, true, SPINE_INIT_NONE);
                break;
            case 2:
                if(dm) console.log("end2");
                SpinePlay(sGameBG, null, null, AniSpace.stopB, 0, true, SPINE_INIT_NONE);
                break;
            case 3:
                if(dm) console.log("end3");
                SpinePlay(sGameBG, null, null, AniSpace.stopC, 0, true, SPINE_INIT_NONE);
                break;
            case 4: //left
                if(dm) console.log("a2b");
                SpinePlay(sGameBG, null, null, AniSpace.A2B, 2, false, SPINE_INIT_NONE); //a->b
                break;
            case 5:
                if(dm) console.log("b2a");
                SpinePlay(sGameBG, null, null, AniSpace.B2A, 1, false, SPINE_INIT_NONE); //b->a
                break;
            case 6: //right
                if(dm) console.log("a2c");
                SpinePlay(sGameBG, null, null, AniSpace.A2C, 2, false, SPINE_INIT_NONE); //b<-a
                break;
            case 7:
                if(dm) console.log("c2a");
                SpinePlay(sGameBG, null, null, AniSpace.C2A, 1, false, SPINE_INIT_NONE); //a<-b
                break;
            }
        }
        //--

    deadLine = new PIXI.spine.Spine(res.dead_line.spineData); //데드라인--
    cont.addChild(deadLine);
    SpinePlay(deadLine,
        360,
        1020,
        laser.end,
        0, true);
    deadLine.active=true;
    deadLine.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            SpinePlay(deadLine, null, null, laser.idle, 0, true, SPINE_INIT_NONE);
            break;
        case 2:
            SpinePlay(deadLine, null, null, laser.end, 3, false, SPINE_INIT_NONE); //반복모드
            break;
        case 3:
            SpinePlay(deadLine, null, null, laser.begin, 2, false, SPINE_INIT_NONE);
            break;
        case 4:
            deadLine.visible=false;
            break;
                
        }
    }
    spr = SpriteLoad(cont,  strGamePath+"img/white.png", iCenterSizeX, iCenterSizeY); //실제게임화면 터치입력인풋용도--
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = ColorSet.red;
    spr.alpha = 0.0;
    spr.interactive = true;

    if (InputMode == MOUSE) spr.on('mousemove', dragScreen);
    if (InputMode == TOUCH) spr.on('touchmove', dragScreen);
    if (InputMode == TOUCH) spr.on('touchstart', dragScreen);

    if (InputMode == MOUSE) spr.on('mousedown', clickScreen); //기본move겨냥, 클릭시 쏜다
    if (InputMode == TOUCH) spr.on('touchend', clickScreen); //기본터치이동겨냥, 종료시 쏜다.

    //if(InputMode==MOUSE) spr.on('click', cbButtonWhite);
    //if(InputMode==TOUCH) spr.on('tap', cbButtonWhite);

    d_Txstate = FontLoad( //디버그 게임모드
        cont,
        "--",
        620, 134,
        1, 0.5, {
            font: '20px ' + fontShow,
            fill: '#FFFFFF',
            align: "center",
            // stroke:'#114C16',
            //strokeThickness:12
        },
        320
    );
    d_TxAngle = FontLoad( //디버그 각도
        cont,
        "--",
        231, 271,
        1, 0.5, {
            font: '20px ' + fontShow,
            fill: '#FFFF00',
            align: "center",
            // stroke:'#114C16',
            //strokeThickness:12
        },
        320
    );
    //debug_Obj(d_TxAngle );
    d_timerGlobal = FontLoad( //디버그 타이머
        cont,
        "000000",
        220, 134,
        1, 0.5, {
            font: '20px ' + fontShow,
            fill: '#FFFFFF',
            align: "center",
            // stroke:'#114C16',
            //strokeThickness:12
        },
        320
    );
    d_TxTurnSnapCounter = FontLoad( //디버그 턴
        cont,
        "000000",
        iMaxSizeX, 154,
        1, 0.5, {
            font: '20px ' + fontShow,
            fill: '#FFFFFF',
            align: "center",
            // stroke:'#114C16',
            //strokeThickness:12
        },
        320
    );
    //debug_Obj(d_timerGlobal, InfoPos.on, MovePos.on);

    //spr = SpriteLoad(sGame, "img/__capture_base.png", iCenterSizeX, iCenterSizeY);  //임시투영이미지    
    //spr.alpha = 0.25;

    //스테이지클리어--------------------------------------------------------------------------------------------------------
    cont = sGameUIClear;

    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.75;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);

    //배경 중심  컨테이너
    cont.bg = new PIXI.Container();
    cont.bg.x = iCenterSizeX;
    cont.bg.y = iCenterSizeY;
    cont.addChild(cont.bg); //부모에 중심컨테이너 붙이기
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup.png", 0, 0);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_stage_bg.png", 4, -319);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_score_bg.png", 0, 153);
    
    tx_nowname_Clear = FontLoad(cont.bg, GetString("score"), -224, 155, 0, 0.5, {
        font: '40px ' + fontShow,
        fill: '#FFE300',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    
    //별3개이식
    //별3개
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_star_1_empty.png", -170, -344);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    Star3_Clear.push(spr);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_star_3_empty.png",  177, -343);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    var star2 = SpriteLoad(cont.bg,  strGamePath+"img2/popup_star_2_empty.png", 2, -374);
    //debug_Sprite(starmid, InfoPos.on, MovePos.on);
    Star3_Clear.push(star2);
    Star3_Clear.push(spr);    
    //별3개이식
    
    //스코어 클리어화면
    TxScore_Clear = FontLoad(cont.bg, "000", 224, 155, 1.0, 0.5, {
        font: '40px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#5248C2',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //debug_Obj(TxScore_Clear, InfoPos.on, MovePos.on);


    //버튼
    //sprReplayClear;
    //sprNextClear;
    path =  strGamePath+"img2/btn_replay.png"; //replay
    spr = SpriteLoad(cont.bg, path, -200, 270 );
    spr.interactive = true;
    setNormaButtonTint(spr, clickReplay_Clear);
    sprReplayClear = spr;
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_ok.png", 0, 270); //ok버튼
    spr.interactive = true;
    setNormaButtonTint(spr, clickOk_Clear);
    tx_ok_Clear = FontLoad(cont.bg, GetString("ok"), 0, 265, 0.5, 0.5, {
        font: '55px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7F2D00',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    spr.txt = GetString("yes");// tx_ok_Clear;
    
    path =  strGamePath+"img2/btn_next.png"; //next
    spr = SpriteLoad(cont.bg, path, 200, 270 );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr.interactive = true;
    setNormaButtonTint(spr, clickNext_Clear);
    sprNextClear=spr;
    
                                        tx_replay_Clear = FontLoad(cont.bg, "replay", -1000, -1000, 0.5, 0.5, { //화면외
                                            font: '45px ' + fontShow,
                                            fill: '#FFE81F',
                                            align: "center",
                                            stroke: '#855419',
                                            lineJoin:"round",
                                            strokeThickness: 8
                                        }, 320);
    
                                        //tx_replay_Clear.alpha=0.25; //임시코드-------
                                        //debug_Obj(tx_replay_Clear, InfoPos.on, MovePos.on);
    

    //debug_Obj(tx_ok_Clear, InfoPos.on, MovePos.on);
    
                                        tx_next_clear = FontLoad(cont.bg, "next", -1000, -1000, 0.5, 0.5, {//화면외
                                            font: '45px ' + fontShow,
                                            fill: '#69EFF0',
                                            align: "center",
                                            stroke: '#22397F',
                                            lineJoin:"round",
                                            strokeThickness: 8
                                        }, 320);

                                        //tx_next_clear.alpha=0.25; //임시코드-------
                                        //debug_Obj(tx_next_clear, InfoPos.on, MovePos.on);

    tx_title_Clear = FontLoad(cont.bg, GetString("stage"), 56, -231, 1, 0.5, {
        font: '45px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342D89',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //debug_Obj(tx_title_Clear, InfoPos.on, MovePos.on);

    // sprminusnext = SpriteLoad(cont.bg, "img2/heart_btn_1.png", 238, 306 );
    // sprminusnext.scale.set(0.75, 0.75);
    // //debug_Sprite(sprminusnext);
    //
    // sprminusreplay = SpriteLoad(cont.bg, "img2/heart_btn_1.png", -155, 306 );
    // sprminusreplay.scale.set(0.75, 0.75);
    // //debug_Sprite(sprminusreplay);

    txLvNum_Clear = FontLoad(cont.bg, "00", 76, -231, 0, 0.5, {
        font: '45px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342D89',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //debug_Obj(txLvNum_Clear, InfoPos.on, MovePos.on);
    
    sprPopA_Clear = SpriteLoad(cont.bg,  strGamePath+"img2/perfect.png", 0, -42, 0.5, 1  );
    //sprPopA_Clear = SpriteLoad(cont.bg, "img2/stage.png", 0, -120  );
    //debug_Sprite(sprPopA_Clear, InfoPos.on, MovePos.on);
    sprPopB_Clear = SpriteLoad(cont.bg,  strGamePath+"img2/clear.png", 0, 16  );

    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //세팅화면 생성--------------------------------------------------------------------------------------------------------
    cont = sGameUISetting;
    //sGameUISetting.x = iCenterSizeX;
    //sGameUISetting.y = iCenterSizeY;

    //------------
    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.75;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);

    //배경 중심  컨테이너
    cont.bg = new PIXI.Container();
    cont.bg.x = iCenterSizeX;
    cont.bg.y = iCenterSizeY;
    cont.addChild(cont.bg); //부모에 중심컨테이너 붙이기    
    //------------
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup.png", 0, 0);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_title.png", 0, -351  );
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_bg.png", -180, -45  );
    spr.interactive = true;
    setNormaButtonTint(spr, clickBGM_Setting);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_bg.png", 0, -45  );
    spr.interactive = true;
    setNormaButtonTint(spr, clickSFX_Setting);    
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_bg.png", 180, -45  );
    spr.interactive = true;
    setNormaButtonTint(spr, clickSelect_Setting);    
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_line.png", 5, -218  );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_line.png", 5, 124  );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);

//-setposition(Sprite): none, xy: spr.xy = 4, -218  Utiljs.js:461
//--setposition(Sprite): none, xy: spr.xy = -173, -47  Utiljs.js:461
//--setposition(Sprite): none, xy: spr.xy = 4, -45  Utiljs.js:461
//--setposition(Sprite): none, xy: spr.xy = 180, -43  Utiljs.js:461
//--setposition(Sprite): none, xy: spr.xy = 5, 124      
    
    tx_title_setting = FontLoad(cont.bg, GetString("settings"), 10, -352, 0.5, 0.5, {
        font: '60px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342d89',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    //debug_Obj(tx_title_setting, InfoPos.on, MovePos.on);


    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_bgm_on.png", -184, -52); //음악
    spr.name = "popup_bgm_btn";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    spr.interactive = true;
//    setNormaButtonTint(spr, clickBGM_Setting);

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_sound_on.png", 2, -50); //효과음
    spr.name = "popup_sound_btn";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);


    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_exit.png", 179, -55); //셀렉트화면
    spr.name = "popup_stage_select_btn";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    //spr.interactive = true;
    //setNormaButtonTint(spr, clickSelect_Setting);

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_x_bgm.png", -188, -70);
    spr.name = "popup_off1";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    SpXBGM_Setting = spr;

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/setting_x_sound.png", -1, -71);
    spr.name = "popup_off2";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    SpXSFX_Setting = spr;

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_ok.png", 2, 240);
    spr.name = "yes";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr.interactive = true;
    setNormaButtonTint(spr, clickOk_Setting);    
    tx_ok_setting = FontLoad(cont.bg, GetString("ok"), 2, 240, 0.5, 0.5, {
        font: '60px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    //spr.txt=tx_ok_setting;
    //debug_Obj(tx_ok_setting, InfoPos.on, MovePos.on);

    
    //레벨조건화면--------------------------------------------------------------------------------------------------------
    cont = sGameUICondition;
    cont.name = "sGameUICondition";

    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.75;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);

    //배경 중심  컨테이너
    cont.bg = new PIXI.Container();
    cont.bg.x = iCenterSizeX;
    cont.bg.y = iCenterSizeY;
    cont.addChild(cont.bg); //부모에 중심컨테이너 붙이기
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup.png", 0, 0);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_stage_bg.png", 4, -319);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);//spr.x=6; spr.y=-370; 
        
    //별3개
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_star_1_empty.png", -170, -344);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr.name = "img2/popup_star_1";
    SpStar3_Condition.push(spr);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_star_3_empty.png",  177, -343);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr.name = "img2/popup_star_3";
    
    var starmid = SpriteLoad(cont.bg,  strGamePath+"img2/popup_star_2_empty.png", 2, -374);
    //debug_Sprite(starmid, InfoPos.on, MovePos.on);
    starmid.name = "img2/popup_star_2";
    SpStar3_Condition.push(starmid);    
    
    SpStar3_Condition.push(spr);


    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_score_bg.png", 0, 153);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_stage.png", 0, -57);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    sprMinmap_condition = SpriteLoad(cont.bg,  strGamePath+"imgminimap/map_001.png", 0, -57);
    sprMinmap_condition.scale.set(2,2);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);


    tx_nowname_condition = FontLoad(cont.bg, GetString("score"), -224, 155, 0, 0.5, {
        font: '40px ' + fontShow,
        fill: '#FFE300',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //debug_Obj(tx_nowname_condition, InfoPos.on, MovePos.on);

    //Now 숫자만
    TxNow_Condition = FontLoad(cont.bg, "000", 224, 155, 1.0, 0.5, {
        font: '40px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#5248C2',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //debug_Obj(TxNow_Condition, InfoPos.on, MovePos.on);


    TxStage_Condition = FontLoad(cont.bg, GetString("stage"), 56, -231, 1, 0.5, {
        font: '45px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342D89',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //debug_Obj(TxStage_Condition, InfoPos.on, MovePos.on);

    //라운드부드럽게
    this.txt_meter = FontLoad(this.viewContainer,
        "M", iCenterSizeX+250, iCenterSizeY-550
        , {fontFamily:"Apache",
            fontSize:"50px",
            fill:"#FCFF00",
            stroke:"#000000",
            lineJoin:"round",
            strokeThickness:8,
            lineJoin:"round"},
        1,
        0.5
    );

    //스테이지 숫자만
    TxTitle_Condition = FontLoad(cont.bg, "00", 76, -231, 0, 0.5, {
        font: '45px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342D89',
        lineJoin:"round",
        strokeThickness: 8,
        lineJoin:"round"
    }, 320);
    //debug_Obj(TxTitle_Condition, InfoPos.on, MovePos.on);

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_ok.png", 139, 271); //ok버튼
    spr.name = "yes";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr.interactive = true;
    setNormaButtonTint(spr, clickOk_Condition);

    tx_ok_condition = FontLoad(cont.bg, GetString("yes"), 139, 265, 0.5, 0.5, {
        font: '55px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7F2D00',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    //spr.txt=tx_ok_condition;
    // var sprminus = SpriteLoad(cont.bg, "img2/heart_btn_1.png", 220, 281 ); //yes -1 버튼

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_no.png", -132, 271); //no버튼
    spr.name = "no";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr.interactive = true;
    setNormaButtonTint(spr, clickNo_Condition, se.SE_ClickNo);
    tx_no_condition = FontLoad(cont.bg, GetString("no"), -122, 265, 0.5, 0.5, {
        font: '55px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7F2D00',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    spr.txt=tx_no_condition;

    //나가기화면--------------------------------------------------------------------------------------------------------
    cont = sGameUIExit;
    //------------
    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.75;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);

    //배경 중심  컨테이너
    cont.bg = new PIXI.Container();
    cont.bg.x = iCenterSizeX;
    cont.bg.y = iCenterSizeY;
    cont.addChild(cont.bg); //부모에 중심컨테이너 붙이기    
    //------------    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup.png", 0, 0);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_title.png", 0, -351  );
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_bg.png", 0, -60   );
    spr.scale.x=1.5;
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    // spr = SpriteLoad(cont.bg, "img2/exit_heart.png", 0, -112   );
    // //debug_Sprite(spr, InfoPos.on, MovePos.on);
    txMinus = FontLoad(cont.bg, "", 56, -62,  0.5, 0.5, {
        font: '70px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    txMinus.alpha=0;
    //debug_Obj(txMinus, InfoPos.on, MovePos.on);
    
    tx_title_Exit = FontLoad(cont.bg, GetString("exit"), 0, -355,  0.5, 0.5, {
        font: '60px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342d89',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    //debug_Obj(tx_title_Exit, InfoPos.on, MovePos.on);
    
    //var exitMsg = "Give up the game?";
    tx_Giveup = FontLoad(cont.bg,  GetString("giveup"),//LOCALE.exit.kr,
        0, -60,
        0.5, 0.5, {
            font: '42px ' + fontShow,
            fill: '#FFFFFF',
            align: "center",
            stroke: '#0B5D72',
            lineJoin:"round",
            strokeThickness: 8
                //                            dropShadow:true,
                //                            dropShadowColor:'#0B5D72',
                //                            dropShadowDistance:8
        },
        630);
    //debug_Obj(tx_Giveup);

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_ok.png", 133, 263 );
    spr.name = "yes";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr.interactive = true;
    setNormaButtonTint(spr, clickOk_Exit)
    tx_ok_Exit = FontLoad(cont.bg, GetString("yes"), 136, 259 , 0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //spr.txt=tx_ok_Exit;
    //debug_Obj(tx_ok_Exit, InfoPos.on, MovePos.on);
    
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_no.png", -140, 265 );
    spr.name = "no";
    spr.interactive = true;
    setNormaButtonTint(spr, clickNo_Exit, se.SE_ClickNo);
    tx_no_Exit = FontLoad(cont.bg, GetString("no"), -134, 262, 0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    spr.txt = tx_no_Exit;
    //debug_Obj(tx_no_Exit, InfoPos.on, MovePos.on);

    //볼광고화면--볼충전--------------------------------------------------------------------------------------------------------
    //컨티뉴화면,이어서하기화면,이어하기화면
    cont = sGameUIADBall;
    //------------
    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.75;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);

    //배경 중심  컨테이너
    cont.bg = new PIXI.Container();
    cont.bg.x = iCenterSizeX;
    cont.bg.y = iCenterSizeY;
    cont.addChild(cont.bg); //부모에 중심컨테이너 붙이기    
    //------------ 
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup.png", 0, 0);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_title.png", 0, -351  );
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_bg.png", 0, -116   );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/ad_burble.png", 0, -112   );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    

    tx_title_ADBAll = FontLoad(cont.bg, GetString("continue"), 0, -355, 0.5, 0.5, {
        font: '60px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342d89',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);

    tx_ball_ADBALL = FontLoad(cont.bg, "15",
        105, -42,
        0.5, 0.5, {
            font: '42px ' + fontShow,
            fill: '#FFFFFF',
            align: "center",
            stroke: '#0B5D72',
            lineJoin:"round",
            strokeThickness: 8
                //                            dropShadow:true,
                //                            dropShadowColor:'#0B5D72',
                //                            dropShadowDistance:8
        },
        630);
    //debug_Obj(tx_ball_ADBALL, InfoPos.on, MovePos.on);


    tx_ADBAll = FontLoad(cont.bg, GetString("use1heart"),//"광고를 보면 운석이\n충전됩니다.",
        0, 117,
        0.5, 0.5, {
            font: 'bold 40px Arial',// + fontShow,
            fill: '#FFFFFF',
            align: "center",
            stroke: '#342d89',
            lineJoin:"round",
            strokeThickness: 8
        },
        580);
    //debug_Obj(tx_ad, InfoPos.on, MovePos.on);

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_ok.png", 133, 263 );
    spr.interactive = true;
    setNormaButtonTint(spr, clickOk_ADBall);
    tx_ok_ADBAll = FontLoad(cont.bg, GetString("yes"), 136, 259 , 0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //spr.txt=tx_ok_ADBAll;

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_no.png", -140, 265 );
    spr.interactive = true;
    setNormaButtonTint(spr, clickNo_ADBall, se.SE_ClickNo);
    tx_no_ADBAll = FontLoad(cont.bg, GetString("no"), -134, 262, 0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    spr.txt=tx_no_ADBAll;

    //하트광고화면--하트충전--------------------------------------------------------------------------------------------------------
    cont = sGameUIADHeart;
    //------------
    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.75;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);

    //배경 중심  컨테이너
    cont.bg = new PIXI.Container();
    cont.bg.x = iCenterSizeX;
    cont.bg.y = iCenterSizeY;
    cont.addChild(cont.bg); //부모에 중심컨테이너 붙이기    
   //------------ 
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup.png", 0, 0);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_title.png", 0, -351  );
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/popup_bg.png", 0, -116   );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/ad_heart.png", 0, -112   );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);

    tx_title_ADHEART = FontLoad(cont.bg, GetString("continue"), 0, -355, 0.5, 0.5, {
        font: '60px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#342d89',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);

//    spr = SpriteLoad(cont.bg, "img/popup_ad_view_ui.png", iCenterSizeX, iCenterSizeY);
//    spr.name = "heartbg";
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    spr.x = 348+ux;
//    spr.y = 477+uy;
//
//    spr = SpriteLoad(cont.bg, "img/popup_ad_view_heart.png", iCenterSizeX, iCenterSizeY);
//    spr.name = "heartmark";
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    spr.x = 354+ux;
//    spr.y = 480+uy;
//
//    spr = SpriteLoad(cont.bg, "img/popup_ad_view_heart_add.png", iCenterSizeX, iCenterSizeY);
//    spr.name = "heartplus";
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    spr.x = 428+ux;
//    spr.y = 518+uy;

    tx_ADHEART = FontLoad(cont.bg,  GetString("use1heart"),//"광고를 보면 하트가\n충전됩니다.",
        0, 117,
        0.5, 0.5, {
            font: 'bold 55px Arial',// + fontShow,
            fill: '#FFFFFF',
            align: "center",
            stroke: '#0B5D72',
            lineJoin:"round",
            strokeThickness: 8
        },
        580);

    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_ok.png", 133, 263 );
    spr.interactive = true;
    setNormaButtonTint(spr, clickOk_ADHeart);
    tx_ok_ADHEART = FontLoad(cont.bg, GetString("yes"), 136, 259 , 0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    //spr.txt=tx_ok_ADHEART;


    spr = SpriteLoad(cont.bg,  strGamePath+"img2/btn_no.png", -140, 265 );
    spr.interactive = true;
    setNormaButtonTint(spr, clickNo_ADHeart, se.SE_ClickNo);
    tx_no_ADHEART = FontLoad(cont.bg, GetString("no"), -134, 262, 0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    spr.txt=tx_no_ADHEART;

    //게임오버화면--------------------------------------------------------------------------------------------------------
    cont = sGameUIGameOver;
    //------------
    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.75;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);

    //배경 중심  컨테이너
    cont.bg = new PIXI.Container();
    cont.bg.x = iCenterSizeX;
    cont.bg.y = iCenterSizeY;
    cont.addChild(cont.bg); //부모에 중심컨테이너 붙이기    
   //------------ 
    spr = SpriteLoad(cont.bg,  strGamePath+"img2/gameover.png", 0, 0);
    
    
    spr =  SpriteLoad(cont.bg,  strGamePath+"img2/btn_ok.png", 0, 263 );
    spr.interactive = true;
    setNormaButtonTint(spr, clickOk_GameOver);
    tx_ok_gameover = FontLoad(cont.bg, GetString("yes"), 0, 259,
                              0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    //spr.txt=tx_ok_gameover;

    //선택레벨화면선택화면--------------------------------------------------------------------------------------------------------
    cont = sGameUISelectLevel;
    //sGame.addChild(sGameUISelectLevel);
    //상단메뉴
    path =  strGamePath+"img2/asm_select_bg_1.png";//"img/main_ui_1.png";
    spr = SpriteLoad(cont, path, 360, 610 );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    path =  strGamePath+"img2/select_top.png";//"img/main_ui_1.png";
    spr = SpriteLoad(cont, path, 360, 44 );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-별메뉴배경
    path =  strGamePath+"img2/select_top_bg.png";//img/star_ui.png";
    spr = SpriteLoad(cont, path, 142, 41 );
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-별메뉴별
    path =  strGamePath+"img2/select_level.png";
    spr = SpriteLoad(cont, path, 49, 39);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    //spr.interactive = true;
    //setNormaButtonTint(spr, clickStarinSel);
    
    //-별숫자폰트
    TxtStarSelectLevel = FontLoad(cont, "0/0", 160, 40, 0.5, 0.5, {
        font: '25px ' + fontShow,
        fill: '#ffffff',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 320);
    //debug_Obj(TxtStarSelectLevel, InfoPos.on, MovePos.on);
    
    // //-하트배경
    // path = "img2/select_top_bg.png";//"img/heart_ui.png";
    // spr = SpriteLoad(cont, path, 389, 43);
    // spr.interactive = true;
    // setNormaButtonTint(spr, clickHeartinSel);
    // //debug_Sprite(spr, InfoPos.on, MovePos.on);
    // //-하트
    // path = "img2/select_heart.png";
    // spr = SpriteLoad(cont, path, 307, 41  );
    // spr.interactive = true;
    // setNormaButtonTint(spr, clickHeartinSel);
    // //debug_Sprite(spr, InfoPos.on, MovePos.on);
    //
    // //하트숫자폰트
    // TxtHeartSelectLevel = FontLoad(cont, "0", 398, 42, 0.5, 0.5, {
    //     font: '25px ' + fontShow,
    //     fill: '#ffffff',
    //     align: "center",
    //     stroke: '#000000',
    //     strokeThickness: 5
    // }, 320);
    // //debug_Obj(TxtHeartSelectLevel, InfoPos.on, MovePos.on);
    //
    // //-하트플러스
    // path = "img2/select_heart_plus.png";
    // spr = SpriteLoad(cont, path, 470, 43);
    // //debug_Sprite(spr, InfoPos.on, MovePos.on);
    // spr.interactive = true;
    // setNormaButtonTint(spr, clickHeartinSel);
    
    //-뮤직버튼
    path =  strGamePath+"img2/select_bgm_on.png";
    spr = SpriteLoad(cont, path, 594, 45 );
    spr.interactive = true;
    setNormaButtonTint(spr, clickBgmOffMarkinSel);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-효과음버튼
    path =  strGamePath+"img2/select_sound_on.png";
    spr = SpriteLoad(cont, path, 666, 45);
    spr.interactive = true;
    setNormaButtonTint(spr, clickSfxOffMarkinSel);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-뮤직버튼off
    path =  strGamePath+"img2/select_bgm_off.png";
    spr = SpriteLoad(cont, path, 594, 45 );
    bgmOffMarkinSel = spr;
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-효과음off
    path =  strGamePath+"img2/select_sound_off.png";
    spr = SpriteLoad(cont, path, 666, 45 );
    sfxOffMarkinSel = spr;
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-하단메뉴-좌버튼
    path =  strGamePath+"img2/select_arrow.png";
    spr = SpriteLoad(cont, path, 75, 1188);
    spr.scale.x = 1;//-1;
    spr.interactive = true;
    setNormaButtonTint(spr, clickLeftPage);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-하단메뉴-우버튼
    path =  strGamePath+"img2/select_arrow.png";
    spr = SpriteLoad(cont, path, 644, 1188);
    spr.scale.x = -1;
    spr.interactive = true;
    setNormaButtonTint(spr, clickRightPage);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    

    //선택레벨선택아이콘레벨아이콘--------------------------------------------------------------------------------------------------------
    var contB;
    contB = createLevelIcon();
    contB.x = 133;
    contB.y = 284;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);//133, 284
    
    contB = createLevelIcon();
    contB.x = 360;
    contB.y = 284;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);//360, 284 

    contB = createLevelIcon();
    contB.x = 591;
    contB.y = 284;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);//591, 284

    contB = createLevelIcon();
    contB.x = 133;
    contB.y = 611;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);

    contB = createLevelIcon();
    contB.x = 360;
    contB.y = 611;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);

    contB = createLevelIcon();
    contB.x = 591;
    contB.y = 611;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);//589, 611 

    contB = createLevelIcon();
    contB.x = 133;
    contB.y = 937;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);

    contB = createLevelIcon();
    contB.x = 360;
    contB.y = 937;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on);

    contB = createLevelIcon();
    contB.x = 591;
    contB.y = 937;
    cont.addChild(contB);
    arr9Level.push(contB);
    //debug_Obj(contB, InfoPos.on, MovePos.on); //589, 937

    //if(dm) console.log("arr9Level.length: " + arr9Level.length);

    //인디케이터배열설정//
//    for (var idx = 0; idx < IndiPage; idx++) {
//        sprIndicator[idx] = SpriteLoad(
//            sGameUISelectLevel,
//            IndicPath.off,
//            iCenterSizeX - LengthHalf + (IndiGrid1 * idx),
//            iCenterSizeY + 505
//        );
//    }
    //인디케이터배열설정//
    
    //인디케이터배열설정//
    for (var idx = 0; idx < IndiPage; idx++) {
        sprIndicator[idx] = SpriteLoad(
            sGameUISelectLevel,
            IndicPath.off,
            iCenterSizeX - LengthHalf + (IndiGrid1 * idx),
            iCenterSizeY + 545
        );
    }
    //인디케이터배열설정//
    
    //인디케이터배열설정//
    setSelectPageByNumber(0);

    TxPageSelectLevel = FontLoad(cont, "0/0", 360, 1233, 0.5, 0.5, {
        font: '35px ' + fontShow,
        fill: '#ffffff',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 5
    }, 320);
    //debug_Obj(TxPageSelectLevel);

    //더미 우주선과 중앙 행성UI--------------------------------------------------------------------------------------------------------
    cont = sGameMainUI; //임시하이드 //우주선, 중앙별, 우주배경

    //플레이어우주선 -->sGameMain으로 이동
    mainPlayer = new PIXI.spine.Spine(res.space_ship_ani.spineData);
    mainPlayer.interactive = false;
    
    //--우주선회전처리
    mainPlayer.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            if(dm) console.log("AniShip.1");
            SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);
            mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);//next

            break;
        case 2: //left
            if(dm) console.log("AniShip.2");
            SpinePlay(mainPlayer, null, null, AniShip.l, 1, false, SPINE_INIT_NONE);
            break;
        case 3: //right
            if(dm) console.log("AniShip.3");
            SpinePlay(mainPlayer, null, null, AniShip.r, 1, false, SPINE_INIT_NONE);
            break;
        case 4: //left
            if(dm) console.log("AniShip.4");
            SpinePlay(mainPlayer, null, null, AniShip.l_buster, 0, false, SPINE_INIT_NONE);
            break;
        case 5: //right
            if(dm) console.log("AniShip.5");
            SpinePlay(mainPlayer, null, null, AniShip.r_buster, 0, false, SPINE_INIT_NONE);
            break;
        case 6: //버스터 대기동작
            if(dm) console.log("AniShip.6");
            SpinePlay(mainPlayer, null, null, AniShip.bust, 0, true, SPINE_INIT_SLOTS);
            mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);
            break;
        case 7: //겨냥
            if(dm) console.log("AniShip.7");
            SpinePlay(mainPlayer, null, null, AniShip.aim, 0, true, SPINE_INIT_NONE);
            break;
        case 8: //충전
            if(dm) console.log("AniShip.7");
            SpinePlay(mainPlayer, null, null, AniShip.charge, 1, true, SPINE_INIT_NONE);
            break;
        case 9: //발사
            if(dm) console.log("AniShip.7");
            SpinePlay(mainPlayer, null, null, AniShip.fire, 8, false, SPINE_INIT_NONE);
            break;
        }
    }

//    //우주선버스터모드버튼
//    mainBuster = new PIXI.spine.Spine(res.buster_btn.spineData);
//    mainBuster.interactive = true;
//    mainBuster.name = "mainBuster";
//    cont.addChild(mainBuster);
//    SpinePlay(mainBuster, 367, 1137,
//        "buster_btn_idle",
//        1, true);
//
//    if (InputMode == MOUSE) mainBuster.on('click', clickBuster);
//    if (InputMode == TOUCH) mainBuster.on('tap', clickBuster);

    //게임메인UI--------------------------------------------------------------------------------------------------------
    //-좌우버튼
    //하단 좌우버튼이외 버튼 방지용//버튼마스크
    spr = SpriteLoad(cont,  strGamePath+"img/white.png", iCenterSizeX, iMaxSizeY, 0.5, 1);
    spr.scale.set(iMaxSizeX, 250);
    spr.tint = 0x000000;
    spr.alpha = 0;
    spr.interactive = true;
    
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);
    
    //왼쪽 이동
    path =  strGamePath+"img/move_arrow_btn.png";
    BtnL = SpriteLoad(cont, path, 64, 1111);
    BtnL.scale.x = -1;
    BtnL.scale.set(0.01, 0.01);
    BtnL.name = "ArrowLeft";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    //BtnL.interactive = true;
    //setNormaButtonTint(BtnL, clickLeftMov);
    BtnL.active = true;
    
    BtnLspn = new PIXI.spine.Spine(spnRLRotation);
    cont.addChild(BtnLspn);
    SpinePlay(BtnLspn, 96, 1111, AniBtnSpn.normal_r, 0, true);
    //debug_Obj(BtnLspn, InfoPos.on, MovePos.on);
    BtnLspn.interactive =  true;
    setLButton(BtnLspn, clickLeftMov);
    
    BtnLspn.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case StateBtnSpn.normal_r: //<--AniBtnSpn.press_r에서 지정
            if(dm) console.log("StateBtnSpn.normal_r");
            SpinePlay(BtnLspn, null, null, AniBtnSpn.normal_r, 0, true, SpnInit.none);
            break;
        }
    };
    
    //오른쪽 이동
    path =  strGamePath+"img/move_arrow_btn.png";
    BtnR = SpriteLoad(cont, path, 654, 1110);
    BtnR.name = "ArrowRight";
    BtnR.scale.set(0.01, 0.01);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    BtnR.interactive = true;
//    setNormaButtonTint(BtnR, clickRightMov);
    BtnR.active = true;
    
    BtnRspn = new PIXI.spine.Spine(spnRLRotation);
    cont.addChild(BtnRspn);
    SpinePlay(BtnRspn, 637, 1110, AniBtnSpn.normal_l, 0, true);
    //debug_Obj(BtnRspn, InfoPos.on, MovePos.on);
    BtnRspn.interactive =  true;
    setRButton(BtnRspn, clickRightMov);
    
    BtnRspn.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case StateBtnSpn.normal_l: //<--AniBtnSpn.press_l에서 지정
            if(dm) console.log("StateBtnSpn.normal_l");
            SpinePlay(BtnRspn, null, null, AniBtnSpn.normal_l, 0, true, SpnInit.none);
            break;
        }
    }   
//    //-하단메뉴
//    path = "img/main_ui_2.png";
//    spr = SpriteLoad(cont, path, 360, 1235);
//    spr.name = "UnderMenu";
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    
    //-하단메뉴-다음버블0
    path =  strGamePath+"img/bubble_5.png";
    spr = SpriteLoad(cont, path, 287, 1242);
    spr.name = "bubble0";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    mainmenuBottomBall5.push(spr);

   //-하단메뉴-다음버블1
    path =  strGamePath+"img/bubble_1.png";
    spr = SpriteLoad(cont, path, 222, 1242);
    spr.name = "bubble1";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    mainmenuBottomBall5.push(spr);

//    //-하단메뉴-다음버블2
//    path = "img/bubble_3.png";
//    spr = SpriteLoad(cont, path, 180, 1245);
//    spr.name = "bubble2";
//    spr.alpha = 0.25; //임시코드------
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    mainmenuBottomBall5.push(spr);
//
//    //-하단메뉴-다음버블3
//    path = "img/bubble_3.png";
//    spr = SpriteLoad(cont, path, 141, 1246);
//    spr.name = "bubble3";
//    spr.alpha = 0.25; //임시코드------
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    mainmenuBottomBall5.push(spr);
//
//    //-하단메뉴-다음버블4
//    path = "img/bubble_3.png";
//    spr = SpriteLoad(cont, path, 110, 1246);
//    spr.name = "bubble4";
//    spr.alpha = 0.25; //임시코드------
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
//    mainmenuBottomBall5.push(spr);

    if(dm) console.log("mainmenuBottomBall5: " + mainmenuBottomBall5.length);
    
    //-하단메뉴-남은버블 다이얼로그
//    path = "img/bubble_count.png";
//    spr = SpriteLoad(cont, path, 43, 1236);
//    spr.name = "bubble_count";
//    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    spnRemain = new PIXI.spine.Spine(spnRemain_s); //남음버블배경
    cont.addChild(spnRemain);
    SpinePlay(spnRemain, 368, 1233, AniRemain.normal, 0, true);
    //debug_Obj(spnRemain, InfoPos.on, MovePos.on);

    spnRemain.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case NextAniRemain.normal: 
            SpinePlay(spnRemain, null, null, AniRemain.normal, 0, true, SpnInit.none);
            break;
        }
    };
    
    tx_remainTitle = FontLoad(cont, "balls", 371, 1195, 0.5, 0.5, {
        font: '20px ' + fontShow,
        fill: '#FFE300',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 60);
    //debug_Obj(tx_remainTitle, InfoPos.on, MovePos.on);
    //
    var remainBall = 0;
    tx_remainBall = FontLoad(cont, remainBall, 368, 1233, 0.5, 0.5, {
        font: '35px ' + fontShow,
        fill: '#ffffff',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 60);
    tx_remainBall.bias=0; //5개이하경고주의보
    //debug_Obj(tx_remainBall, InfoPos.on, MovePos.on);

    //-하단메뉴-연료게이지 배경
    var foff = 5;
    path =  strGamePath+"img/fuel_gauge_1.png";
    spr = SpriteLoad(cont, path, 571, 1250+foff);
    spr.name = "fuel_gauge_1";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);

    //-하단메뉴-연료게이지    //프로그래스바
    path =  strGamePath+"img/fuel_gauge_2.png";
    mainmenuFuelGuage = SpriteLoad(cont, path, 446, 1249+foff, 0, 0.5);
    mainmenuFuelGuage.name = "fuel_gauge_2";
    //debug_Sprite(mainmenuFuelGuage, InfoPos.on, MovePos.on);

    path =  strGamePath+"img/fuel_gauge_2_mask.png";
    Fuel_Mask = SpriteLoad(cont, path, mainmenuFuelGuage.x, mainmenuFuelGuage.y, 0, 0.5);
    Fuel_Mask.scale.set(FuelMax, 1);
    mainmenuFuelGuage.mask = Fuel_Mask;

    //파워샷
    txFuelTitle = FontLoad(cont, "bustermode", 515, 1218+foff, 0.5, 0.5, {
        font: '20px ' + fontShow,
        fill: '#67DFF5',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 120);
    //debug_Obj(txFuelTitle, InfoPos.on, MovePos.on);
    //-하단메뉴-연료게이지 끝   
    path =  strGamePath+"img/fuel_icon.png";
    mainFuelIcon = SpriteLoad(cont, path, 605, 1212+foff    );
    mainFuelIcon.name = "fuel_icon";
    //debug_Sprite(mainFuelIcon, InfoPos.on, MovePos.on);
    
    txFuelPro = FontLoad(cont, "-%", 571, 1249+foff, 0.5, 0.5, {
        font: '20px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 60);    
    //debug_Obj(txFuelPro, InfoPos.on, MovePos.on);
    
    //-상단메뉴배경------
    path =  strGamePath+"img2/main_ui.png";//"img/main_ui_1.png";
    spr = SpriteLoad(cont, path, 359, 51);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);

    //    //가이드라인--
    guideLine = new PIXI.spine.Spine(res.guard_line.spineData);
    cont.addChild(guideLine);
    SpinePlay(guideLine, 361, 566,
        "guard_line_idle",
        //"guard_line_in",
        //"guard_line_out",
        1, true);
    //debug_Obj(guideLine, InfoPos.on, MovePos.on);
    guideLine.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            if(dm) console.log("guideLine.1(dead_line_idle)");
            SpinePlay(guideLine, null, null, border.idle, 0, true, SPINE_INIT_NONE);
            break;
        }
    }
 
    //-상단메뉴-스타Ain게이지    
    path =  strGamePath+"img/gauge_star.png";
    spr = SpriteLoad(cont, path, 288, 71);
    spr.name = "gauge_starA";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    mainmenuTopStar3.push(spr);

    //-상단메뉴-스타Bin게이지    
    path =  strGamePath+"img/gauge_star.png";
    spr = SpriteLoad(cont, path, 360, 72);
    spr.name = "gauge_starB";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    mainmenuTopStar3.push(spr);

    //-상단메뉴-스타Cin게이지    
    path =  strGamePath+"img/gauge_star.png";
    spr = SpriteLoad(cont, path, 433, 71);
    spr.name = "gauge_starC";
    //debug_Sprite(spr, InfoPos.on, MovePos.on);
    mainmenuTopStar3.push(spr);

    if(dm) console.log("mainmenuTopStar3: " + mainmenuTopStar3.length);


    //-상단메뉴-일시정지버튼
    path =  strGamePath+"img2/menu_btn.png";
    spr = SpriteLoad(cont, path, 678, 45);
    spr.name = "gauge_starC";
    spr.interactive = true;
    setNormaButtonTint(spr, clickPauseInMainUI);
    //debug_Sprite(spr, InfoPos.on, MovePos.on);

    //-상단메뉴-점수 메인스코어
    txScoreTitle = FontLoad(cont, GetString("score"), 71, 25  , 0.5, 0.5, {
        font: '18px ' + fontShow,
        fill: '#ffe300',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 132);
    //debug_Obj(txScoreTitle, InfoPos.on, MovePos.on);
    
    TxScore = FontLoad(cont, "", 141, 54, 1, 0.5, {
        font: '20px ' + fontShow,
        fill: '#ffffff',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 132);
    TxScore.maxsz=200;
    //debug_Obj(TxScore, InfoPos.on, MovePos.on);//none.x=305; none.y=203; none.x=361; none.y=322; none.x=232; none.y=32; 

    //-상단메뉴-스테이지
    TxStageTitle = FontLoad(cont, GetString("stage"), 387, 20, 1, 0.5, {
        font: '23px ' + fontShow,
        fill: '#ffffff',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 320);
    //debug_Obj(TxStageTitle, InfoPos.on, MovePos.on);

    //-상단메뉴-스테이지 숫자
    TxStage = FontLoad(cont, "0", 394, 20, 0, 0.5, {
        font: '23px ' + fontShow,
        fill: '#ffffff',
        align: "center",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 5
    }, 320);
    //debug_Obj(TxStage, InfoPos.on, MovePos.on);

    SpinePlayerBubble = new PIXI.spine.Spine(res.buster_bubble.spineData);//날아다니는 공에 붙는 버스터스파인
    spnBusterBoom = new PIXI.spine.Spine(res.buster_bubble.spineData);

    spnHeartTw = new PIXI.spine.Spine(res.heart_bomb.spineData);

    //--------------수정중----------------
    cont = sGameMainUI;
    //------------
    //배경블랙
    spr = SpriteLoad(cont, strGamePath+"img/white.png",0,0,0,0);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.3;
    spr.interactive = true;
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);
    cont.tutbg=spr; //sGameMainUI.tutbg

    //배경 중심  컨테이너
    var cTut = new PIXI.Container();
    cont.tut = cTut;
    cont.tut.x = iCenterSizeX;
    cont.tut.y = iCenterSizeY;
    cont.addChild(cTut); //부모에 중심컨테이너 붙이기    
   //------------ 
    //sGameMainUI.tutbg
    //sGameMainUI.tut
    //sGameMainUI.tut.dialog
    //sGameMainUI.tut.txt
    //sGameMainUI.tut.ok
    //runtutorial();
    var tutoff = -200;
    cont.tut.dialog = SpriteLoad(cTut,  strGamePath+"img2/tutorial.png", 0, 0+tutoff);
    cont.tut.icon = SpriteLoad(cTut, TUTICON.empty, -192, -263);
    cont.tut.icon.scale.set(2,2);
    //debug_Sprite(cont.tut.icon);
    cont.tut.txt = FontLoad(cTut, "", -88, -258, 0, 0.5, {
        font: '30px ' + fontShow,
        fill: '#ffffff',
        align: "left",
        stroke: '#000000',
        lineJoin:"round",
        strokeThickness: 2,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowDistance: 3        
    }, 820);
    //debug_Obj(cont.tut.txt);
    cont.tut.txt.text="";//TX.tutmsg_3ball;
    cont.tut.alpha=1;
    
    spr =  SpriteLoad(cont.tut,  strGamePath+"img2/btn_ok.png", 0, 100+tutoff );
    spr.interactive = true;
    setNormaButtonTint(spr, clickTutorial);
    var tut_ok = FontLoad(cont.tut, GetString("ok"), 0, 100+tutoff, 0.5, 0.5, {
        font: '50px ' + fontShow,
        fill: '#FFFFFF',
        align: "center",
        stroke: '#7f2d00',
        lineJoin:"round",
        strokeThickness: 12
    }, 320);
    cont.tut.ok =spr;
    spr.txt = tut_ok;
    
    cont.tut.left = SpriteLoad(cont,  strGamePath+"img/white.png",87, 1109,0.5,0.5);
    cont.tut.left.scale.set(200, 200);
    cont.tut.left.tint = 0x000000;
    cont.tut.left.alpha = 0;
    cont.tut.left.interactive = false;
    //debug_Obj(cont.tut.left);
    
    cont.tut.right = SpriteLoad(cont,  strGamePath+"img/white.png",630, 1109,0.5,0.5);
    cont.tut.right.scale.set(200, 200);
    cont.tut.right.tint = 0x000000;
    cont.tut.right.alpha = 0;
    cont.tut.right.interactive = false; 
    //debug_Obj(cont.tut.right);
    //--------------수정중----------------

    //--개발메뉴----------------------
    //개발-버튼
    var devbtn; //공용 변수 용도
    var devtext; //공용 변수 용도
    var pDev = {
        x: 25,
        y: iMaxSizeY - 25
    };

    setDevMainButton(sDevCon, devbtn, pDev.x, pDev.y, checkDevBtn, ColorSet.black);
    //devbtn.interactive = false;

    //개발-저장초기화
    var pInit = {
        x: iMaxSizeX - 70,
        y: iMaxSizeY - 25
    };
    var initbtn = setDevButton(sDevCon, "세이브 초기화", pInit.x, pInit.y, clickInitDevBtn, ColorSet.blue);
    Dev_BtnArr.push(initbtn);

    //개발-레벨언락
    var pCheat = {
        x: iMaxSizeX - 70 - 150,
        y: iMaxSizeY - 25
    };
    var unlockbtn = setDevButton(sDevCon, "Unlock", pCheat.x, pCheat.y, clickUnlockDevBtn, ColorSet.magenta);
    Dev_BtnArr.push(unlockbtn);

    //개발-디버깅정보                          
    var pInfo = {
        x: iMaxSizeX - 70 - 300,
        y: iMaxSizeY - 25
    };
    var infobtn = setDevButton(sDevCon, "Deb-Info", pInfo.x, pInfo.y, function(){Dev_InfoOnOff = Dev_InfoOnOff?false:true; }, ColorSet.red);
    Dev_BtnArr.push(infobtn);

    //개발-총알충전                       
    var pBullet = {
        x: iMaxSizeX - 70 - 450,
        y: iMaxSizeY - 25
    };
    var bulletbtn = setDevButton(sDevCon, "+20", pBullet.x, pBullet.y, clickBulletDevBtn, ColorSet.black);
    Dev_BtnArr.push(bulletbtn);

    //개발-부스터충전                       
    var pBuster = {
        x: iMaxSizeX - 70 - 450,
        y: iMaxSizeY - 25 - 50,
    };
    
    var busterbtn = setDevButton(sDevCon, "Buster", pBuster.x, pBuster.y, clickBusterDevBtn, ColorSet.darkgrey);
    Dev_BtnArr.push(busterbtn);
    
    //개발-연료99                      
    var pBuster = {
        x: iMaxSizeX - 70 - 300,
        y: iMaxSizeY - 25 - 50,
    };  
    var f99btn = setDevButton(sDevCon, "Fuel99", pBuster.x, pBuster.y, clickFuel99DevBtn, ColorSet.blue);
    Dev_BtnArr.push(f99btn);

    //개발-연료99
    var pBuster = {
        x: iMaxSizeX - 70 - 150,
        y: iMaxSizeY - 25 - 50,
    };
    var f99btn = setDevButton(sDevCon, "Heart1", pBuster.x, pBuster.y, clickHeart1DevBtn, ColorSet.black);
    Dev_BtnArr.push(f99btn);

    //개발- 기본사라짐 실행
    checkDevBtn();
    reAddChildDevBtn();
    //--개발메뉴----------------------
    sGame.addChild(sGameMain)
    sGame.addChild(sGameMainUI);
    sGame.addChild(sGameUISelectLevel);
    sGame.addChild(sGameUIClear);
    sGame.addChild(sGameUIADBall);
    sGame.addChild(sGameUIADHeart);
    sGame.addChild(sGameUIGameOver);
    sGame.addChild(sGameUICondition);
    sGame.addChild(sGameUISetting);
    sGame.addChild(sGameUIExit);



    //상점용도
    heartController = new HeartController();
    //0:비로그인 상태 , 1:한국 로그인 상태 .... 이후 번호는 추후 지정
    if(loginTF == 0) //더 안전하게 새로추가
        networkManager.GetServerTime(function (_time) {
            // /// //여기까지 안오므로 주석
            // //상점ui설정을 한다.
            // if(loginTF==0) Billing = BillMode.greapguest;
            // else if(loginTF==1 && proto.serPos==0) Billing = BillMode.greap;
            // else if(loginTF==1 && proto.serPos==1) Billing = BillMode.yahoo;
            // else Billing = BillMode.greapguest;
            // var selbillmode = Billing == BillMode.greapguest ? "BillMode.greapguest"
            //     :Billing == BillMode.greap ? "BillMode.greap"
            //     :Billing = BillMode.yahoo ? "BillMode.yahoo"
            //     :"BillMode.greapguest";
            // console.log("loginmode:"+ selbillmode);
            // //상점ui설정을 한다.

            if(loginTF == 0){//게스트모드
                if(clientData.iSaveTimeStamp != null){
                    var lostTime = (_time - clientData.iSaveTimeStamp);
                    heartController.LostTime(lostTime);
                }

                clientData.iSaveTimeStamp = _time;
                SaveOnlyClientData();
            }
        });
    //상점용도
    createUI_HeartShop(sGame);
    createMethod_HeartShop();
    createHeartTweener();


    //네트워크대기UI
    var sprwait = PIXIGraphics(sNetworkLoading, 0x000000, 0.6);
    sprwait.interactive = true;
    sprwait.on('click',cbButtonWhite);
    sprwait.on('tep',cbButtonWhite);
    sprwait.on('mousedown', cbButtonWhite);
    sprwait.on('touchstart', cbButtonWhite);
    sprwait.on('mouseup', cbButtonWhite);
    sprwait.on('touchend', cbButtonWhite);
    //네트워크대기UI
}//gameviewsetting


