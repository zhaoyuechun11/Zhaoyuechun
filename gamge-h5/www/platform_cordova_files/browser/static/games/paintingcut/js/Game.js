'use strict';

var playCount = -1;
var isReady;
var isPlaying;
var isOnceView_NewRecord = false;
var isUseTimeItem = false;
var isUseSlowItem = 1;
var isSuperItem = false;
var globalTouchInput = false;
var isHighest_record = false;       // 최고기록을 세웠는가?
var oldBest_months = 0;                 // 이전 최고기록
var feverCounter = 0;
var continueCounter = 0;
var currentScene = "none";
var splitBall_count = 0;
var create_20_balls = false;
var isPaused = false;
// var isAction_Success = false;
// var isAction_Fail = false;
var isStart1stage = false;
var isPlaying_SuperItem = false;
var jumpCount = 11;
var isPlaying_GameBGM = false;
var isPlaying_TitleBGM = false;

function Data(){
    this.nVer = 0;
    this.isBGM = false;
    this.isSfx = false;
    this.isViewTutorial = false;
    this.nStage = 0;
    this.nBestScore = 0;
    this.nBestCompleteArea = 0;
    this.nJewelryCount = 0;
    this.nJewelryCoolTime0 = 0;
    this.nJewelryCoolTime1 = 0;
    this.nJewelryCoolTime2 = 0;
    this.nJewelryCoolTime3 = 0;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var uData = new Data();     // 기본 게임 데이터

function Game()
{
}

Game.prototype = {
    preload: function ()
    {
        console.log("=========== Game.preload ============");
        isReady = false;

        if(playCount <= -1)
        {
            console.log("=========== Game.preload (playCount <= -1) ============");
            playCount = 0;
            this.SetStorageData();
            this.Set_Complete_Area();

            ballManager.Ready();            ///////// ballManager를 미리 메모리에 올린다.///////////////////////////////////
            // ballManager.Start();            ///////// 모바일에서 1stage가 프레임 드랍 현상 있어서///////////////////////////
            //MG.game.state.start('game');
        }
    },

    create: function ()
    {
        console.log("=========== Game.create ============");
        MG.game.physics.startSystem(Phaser.Physics.ARCADE);
        DEFAULT_TIME_COUNT = MG.gameSheetsData["DefaultTimeCount"];
        if(isUseTimeItem) DEFAULT_TIME_COUNT += MG.gameSheetsData["AddTimePlus"];
        isHighest_record = false;
        oldBest_months = 0;

        shopManager.Init();
        uiManager.Start();
        userItemManager.Start();
        feverManager.Start();

        if(isStart1stage) {
            isStart1stage = false;
            gHeart = MG.gameSheetsData["DefaultHeartCount"];
            uData.nStage = 1;
            StorageManager.prototype.set('nStage', uData.nStage);
            uiManager.SetHeartText(gHeart);
            uiManager.OnClickEvent_PlayButton();
        } else {
            switch(currentScene) {
                case "none":
                    if(StorageManager.prototype.get('isBGM') && isPlaying_TitleBGM == false) {

                        isPlaying_TitleBGM = true;
                        //isPlaying_GameBGM = false;
                        reward_timer = 0;
                        MG.PlayBgm('bgm_title', true);
                    }
                case "game":
                    uiManager.Create_StartWindow();
                    //isPlaying_GameBGM = false;
                    break;

                case "userItem":
                    uiManager.OnClickEvent_StartButton();
                    break;
            }
        }
    },

    update: function ()
    {
        figureManager.OnUpdate();
        actionManager.OnUpdate();

        // // CANVAS & Sprite tint 사용시 메모리 랙 버그 방지
        // while(PIXI.CanvasPool.pool.length > 0) {
        //     var elem = PIXI.CanvasPool.pool.pop();
        //     elem.parentNode = null;
        //     elem = null;
        // }
    },

    SetStorageData: function ()
    {
        if(StorageManager.prototype.get('nVer') == null)
        {
            // 처음 실행한거다. 초기 데이터를 만들자
            console.log("=== 처음 실행한거다. 초기 데이터를 만들자 ===");
            StorageManager.prototype.set('nVer', 1);
            StorageManager.prototype.set('isBGM', false);
            StorageManager.prototype.set('isSfx', false);
            StorageManager.prototype.set('isViewTutorial', false);
            StorageManager.prototype.set('nStage', 1);
            StorageManager.prototype.set('nBestScore', 0);
            StorageManager.prototype.set('nBestCompleteArea', 0);
            StorageManager.prototype.set('nJewelryCount', parseInt(MG.gameSheetsData["DefaultJewelryCount"]));
            StorageManager.prototype.set('nJewelryCoolTime0', 0);
            StorageManager.prototype.set('nJewelryCoolTime1', 0);
            StorageManager.prototype.set('nJewelryCoolTime2', 0);
            StorageManager.prototype.set('nJewelryCoolTime3', 0);
        }

        uData.nVer = StorageManager.prototype.get('nVer');
        uData.isBGM = true;
        //uData.isBGM = StorageManager.prototype.get('isBGM');
        uData.isSfx = true;
        //uData.isSfx = StorageManager.prototype.get('isSfx');
        StorageManager.prototype.set('isBGM', uData.isBGM);
        StorageManager.prototype.set('isSfx', uData.isSfx);

        uData.isViewTutorial = StorageManager.prototype.get('isViewTutorial');
        // uData.nStage = StorageManager.prototype.get('nStage');
        uData.nStage = 1;
        uData.nBestScore = StorageManager.prototype.get('nBestScore');
        //console.log(StorageManager.prototype.get('nBestCompleteArea'));
        uData.nBestCompleteArea = StorageManager.prototype.get('nBestCompleteArea');
        if(uData.nBestCompleteArea == null || uData.nBestCompleteArea == undefined)
        {
            StorageManager.prototype.set('nBestCompleteArea', 0);
            uData.nBestCompleteArea = 0;
        }
        uData.nJewelryCount = StorageManager.prototype.get('nJewelryCount');
        console.log("=== uData.nJewelryCount : " + uData.nJewelryCount);

        uData.nJewelryCoolTime0 = StorageManager.prototype.get('nJewelryCoolTime0');
        uData.nJewelryCoolTime1 = StorageManager.prototype.get('nJewelryCoolTime1');
        uData.nJewelryCoolTime2 = StorageManager.prototype.get('nJewelryCoolTime2');
        uData.nJewelryCoolTime3 = StorageManager.prototype.get('nJewelryCoolTime3');
    },

    Set_Complete_Area: function () {
        for(var i = 1; i < MG.gameSheetsData['RandomStageData'].length; i++) {
            if(uData.nStage < MG.gameSheetsData['RandomStageData'][i].StartNumber) {
                COMPLETE_AREA = parseFloat(MG.gameSheetsData['RandomStageData'][i - 1].CompleteArea);
                break;
            }
        }
    },

    StartGame: function ()
    {
        console.log("===========StartGame============");
        if(StorageManager.prototype.get('isBGM') && isPlaying_GameBGM == false) {
            isPlaying_GameBGM = true;
            //isPlaying_TitleBGM = false;
            console.log("===========MG.PlayBgm(bgm_game)============");
            MG.PlayBgm('bgm_game', true);
        }
        if(uData.nBestScore <= 0) isOnceView_NewRecord = true;

        if(isReady == false)
        {
            console.log("===========StartGame isReady == false============");
            //stageManager.Start();
            figureManager.Ready();
            ballManager.Ready();
            uiManager.SetupFont();
            actionManager.Ready();
            buffItemManager.Ready();
            bombEffecter.Ready();
            uiManager.LoadingAtlasData();
            currentScene = "readyGame";

            // ballManager.Start();

            //------------------------------------------------------------------------------
            // 이 시점에서 게임을 시작하기전에, 먼저 노출 해야할 4가지가 있다.
            // 0. 최초 실행 시 Tutorial Window을 보여주자. (이후 1번 검사)
            // 1. 유저아이템을 선택하였다면, 아이콘을 보여주고 시작하자.
            // 2. 신기록을 새웠다면 New Record Animation을 보여주고 시작하자. (이후 3번 검사)
            // 3. Months Jump 판에 도착하였으면, Months Open Animation을 보여주고 시작하자.
            if(playCount <= 1) {
                // Title 화면에서 게임 실행한거.. 이때는 tutorial창 -> userItem아이콘 -> Ready Go!!
                if(uData.isViewTutorial == false) {
                    uiManager.ViewTutorial();
                } else {
                    userItemManager.DisplayUserItem();      // 여기서 자동으로 StartGame_ReadyGoAnimation() 실행한다.
                }
            } else {
                // 게임을 연속으로 진행하고 있는 중.. 이때는 New Record -> Months Open -> Ready Go!!
                if(isOnceView_NewRecord == false && uData.nBestScore < uData.nStage && uData.nStage > 1) {
                    isOnceView_NewRecord = true;
                    actionManager.NewRecordAnimation();
                } else if(stageManager.IsJustMonthsOpen()) {
                    console.log("--- stageManager.IsJustMonthsOpen() = TRUE");
                    uiManager.OpenMonthsOpenWindow();       // 여기서 자동으로 StartGame_ReadyGoAnimation() 실행한다.
                } else {
                    this.StartGame_ReadyGoAnimation();
                }
            }
            //------------------------------------------------------------------------------
        }
        else
        {
            console.log("=========== StartGame isReady == true ============");

            uiManager.SetMonthsText(uData.nStage);
            console.log("Game.stage = " + uData.nStage);

            // Start
            uiManager.LoadingPencilSprite();
            figureManager.Start();
            ballManager.Start();
            assetManager.StartTimer();
            //globalTouchInput = true;
            isPlaying = true;
            // isAction_Success = false;
            // isAction_Fail = false;
            stateManager.offGameFail();
            isPlaying_SuperItem = false;
            // 최초 실행이면, 드래그 안내 손을 보여주자
            if(uData.isViewTutorial == false) uiManager.Finger_Flick();
        }

    },

    StartGame_ReadyGoAnimation: function () {
        console.log("=========== StartGame_ReadyGoAnimation ============");
        Game.prototype.Set_Complete_Area();
        currentScene = "game";
        actionManager.ReadyGoAnimation();
        assetManager.Ready();
        assetManager.SetupTimer();
    },

    ReStartGame: function ()
    {
        console.log("=========== ReStartGame ============");
        isSuperItem = false;
        //MG.game.state.clearCurrentState();
        actionManager.Shutdown();
        figureManager.Shutdown();
        stateManager.Init();
        currentScene = 'none';
        // isReady = false;
        // this.StartGame();
       MG.game.state.start('game');
       // // this.create();
    },

    FeverModeSuccessGame: function ()
    {
        stateManager.offFeverMode();
        stageManager.IsOpenJumpMonths(uData.nStage, uData.nStage + MG.gameSheetsData["FeverJumpStageCount"]);
        uData.nStage += MG.gameSheetsData["FeverJumpStageCount"];
        StorageManager.prototype.set('nStage', uData.nStage);
        //uData.nBestScore = uData.nStage - 1;
        assetManager.PauseTimer();
        this.ReStartGame();
    },

    // 이어하기 실행
    PlayContinueGame: function ()
    {
        if(figureManager.IsSuccessGame()) {
            ballManager.VisibleBalls(true);
            return;
        }

        currentScene = "game";
        gHeart = MG.gameSheetsData["ContinueHeartCount"];
        uData.nJewelryCount -= assetManager.GetContinueNeedJewelry();
        StorageManager.prototype.set('nJewelryCount', uData.nJewelryCount);
        uiManager.SetHeartText(gHeart);
        globalTouchInput = true;
        ballManager.VisibleBalls(true);
        uiManager.togglePause();
    },

    DebugGotoBackStage: function (_count) {
        return;
        uData.nStage -= _count;
        if(uData.nStage <= 1) uData.nStage = 1;
        StorageManager.prototype.set('nStage', uData.nStage);
        assetManager.PauseTimer();
        this.ReStartGame();
    },
    DebugGotoNextStage: function (_count) {
        return;
        uData.nStage += _count;
        StorageManager.prototype.set('nStage', uData.nStage);
        assetManager.PauseTimer();
        this.ReStartGame();
    },

    FailGame: function()
    {
        if(stateManager.onGameFail()) {
            console.log("=========== FailGame ============");
            isPlaying = false;
            isUseTimeItem = false;
            isSuperItem = false;
            feverCounter = 0;
            continueCounter = 0;
            bombEffecter.Init();
            if(StorageManager.prototype.get('isBGM')) {
                isPlaying_GameBGM = false;
                MG.StopBgm('bgm_game');
            }
            assetManager.UpdateBestScore();         // BestScore 기록
            uData.nJewelryCount += parseInt(assetManager.GetRewardJewelry("nStage"));
            StorageManager.prototype.set('nJewelryCount', uData.nJewelryCount);
            actionManager.GameFail();
        }
    },

    // from FigureManager.IsSuccessGame()
    SuccessGame: function ()
    {
        console.log("=========== SuccessGame ============");
        // globalTouchInput = false;
        // isSuperItem = false;
        if(stateManager.IsStopSkill()) ballManager.StopSkill_Cancle();
        assetManager.SetupTimer();
        assetManager.PauseTimer();
        this.Stage_Up();
        actionManager.GameSuccess();
    },

    Stage_Up: function () {
        if(uData.nStage > uData.nBestScore) {
            uData.nBestScore = uData.nStage;
        }
        uData.nStage += 1;
        StorageManager.prototype.set('nStage', uData.nStage);
    },

    GotoHomeScene: function ()
    {
        if(StorageManager.prototype.get('isBGM')) {
            isPlaying_TitleBGM = true;
            isPlaying_GameBGM = false;
            MG.StopBgm('bgm_game');
            MG.PlayBgm('bgm_title', true);
        }
        console.log("=========== GotoHomeScene ============");
        currentScene = "title";
        playCount = 0;
        isOnceView_NewRecord = false;
        gHeart = DEFAULT_HEART_COUNT;
        DEFAULT_TIME_COUNT = MG.gameSheetsData["DefaultTimeCount"];
        timer = DEFAULT_TIME_COUNT;
        isUseSlowItem = 1;
        isPlaying = false;
        isUseTimeItem = false;
        feverCounter = 0;
        continueCounter = 0;
        globalTouchInput = false;
        uData.nStage = 1;
        assetManager.SetupTimer();
        StorageManager.prototype.set('nStage', uData.nStage);
        // assetManager.PauseTimer();
        ballManager.AllKillBalls();
        figureManager.DeleteAllFigure();console.log("=========== GotoHomeScene.ReStartGame ============");
        this.ReStartGame();
    }
};

window[''] = window[''] || {};
window[''].Game = Game;