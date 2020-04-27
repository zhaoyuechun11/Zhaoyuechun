'use strict';

var _actionManager = _actionManager||{};

_actionManager.Instance = (function ()
{
    var _Instance = {};
    var gameIter = 0;
    var basic_Spine;
    var shield_broken_spine;
    var bSmoothRefillTime = false;

    _Instance.Ready = function ()
    {
        //console.log('=== Instance.Start ===');
        gameIter = 0;
        basic_Spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'basic_game_animation');
        shield_broken_spine = MG.game.add.spine(-1000, -1000, 'shield_broken');
    };

    _Instance.FindSpineNode = function ( SpineObj, NodeName ) {
        return SpineObj.children[SpineObj.skeleton.findSlotIndex(NodeName)];
    };

    _Instance.SetSmoothRefillTime = function (b) {
        bSmoothRefillTime = b;
        if(b) if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_increase', true);
    };

    _Instance.Button_Click_Effect = function (_target, _title) {
        // if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
        _target.inputEnabled = false;
        if(_title != undefined) MG.game.add.tween(_title.scale).from( { x: 1.1, y: 1.1 }, 150, Phaser.Easing.Cubic.Out, true);

        MG.game.add.tween(_target.scale).from( { x: 1.1, y: 1.1 }, 150, Phaser.Easing.Cubic.Out, true).onComplete.add(function () {
            _target.inputEnabled = true;
            MG.game.add.tween(_target.scale).from( { x: 1, y: 1 }, 150, Phaser.Easing.Linear.None, true);
            if(_title != undefined) MG.game.add.tween(_title.scale).from( { x: 1, y: 1 }, 150, Phaser.Easing.Linear.None, true);
        }, this);
    };

    _Instance.GameFail = function ()
    {
        //isAction_Fail = true;
        ballManager.VisibleBalls(true);
        MG.game.time.events.add(500, _Instance.ActionGameFail, this);
     };

    _Instance.GameSuccess = function ()
    {
        // isAction_Success = true;
        MG.game.time.events.add(500, _Instance.ActionGameSuccess, this);
    };

    _Instance.Shutdown = function()
    {
        gameIter = 0;
        //basic_Spine.kill();
    };

    // Ready go Animation
    _Instance.ReadyGoAnimation = function()
    {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_start');
        stateManager.onUIMessage();
        console.log("-----1--------onUIMessage()-----------------------");

        if(playCount <= 1) {
            basic_Spine.setAnimationByName(0, "ready_go", false);
        } else {
            basic_Spine.setAnimationByName(0, "go", false);
        }

        if(COMPLETE_AREA > 0.79 && COMPLETE_AREA < 0.81) {
            // basic_Spine.setAnimationByName(0, "ready_go_80p", false);
            uiManager.SetMissionValueText("80%");
        }
        else if(COMPLETE_AREA > 0.74 && COMPLETE_AREA < 0.76) {
            // basic_Spine.setAnimationByName(0, "ready_go_75p", false);
            uiManager.SetMissionValueText("75%");
        }
        else if(COMPLETE_AREA > 0.69 && COMPLETE_AREA < 0.71) {
            // basic_Spine.setAnimationByName(0, "ready_go_70p", false);
            uiManager.SetMissionValueText("70%");
        }
        else if(COMPLETE_AREA > 0.64 && COMPLETE_AREA < 0.66) {
            // basic_Spine.setAnimationByName(0, "ready_go_65p", false);
            uiManager.SetMissionValueText("65%");
        }
        else if(COMPLETE_AREA > 0.59 && COMPLETE_AREA < 0.61) {
            // basic_Spine.setAnimationByName(0, "ready_go_60p", false);
            uiManager.SetMissionValueText("60%");
        }
        else if(COMPLETE_AREA > 0.54 && COMPLETE_AREA < 0.56) {
            // basic_Spine.setAnimationByName(0, "ready_go_55p", false);
            uiManager.SetMissionValueText("55%");
        }
        else if(COMPLETE_AREA > 0.49 && COMPLETE_AREA < 0.51) {
            // basic_Spine.setAnimationByName(0, "ready_go_50p", false);
            uiManager.SetMissionValueText("50%");
        }
        // else {
        //     basic_Spine.setAnimationByName(0, "ready_go", false);
        // }

        basic_Spine.state.onComplete = function () {
            isReady = true;
            console.log("-----1--------offUIMessage()-----------------------");
            stateManager.offUIMessage();
            Game.prototype.StartGame();
        }
    };

    // Clear Animation
    _Instance.ClearAnimation = function()
    {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_clear');
        stateManager.onUIMessage();
        console.log("------2-------onUIMessage()-----------------------");
        MG.game.world.bringToTop(basic_Spine);
        basic_Spine.setAnimationByName(0, "clear", false);
        basic_Spine.state.onComplete = function () {
            stateManager.offUIMessage();
            console.log("-----2--------offUIMessage()-----------------------");
            _Instance.ActionGameSuccess();
        }
    };

    // Time Over Animation
    _Instance.TimeOverAnimation = function()
    {
        console.log("--- globalTouchInput = false ---");
        globalTouchInput = false;
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_time_over');
        // stateManager.onUIMessage();
        MG.game.world.bringToTop(basic_Spine);
        basic_Spine.setAnimationByName(0, "time_over_in", false);
        basic_Spine.state.onComplete = function () {
            // stateManager.offUIMessage();
            stateManager.offTimeOver();
            uiManager.OpenContinueWindow();
        }
    };

    // oops, new_record, hurry_up
    _Instance.WidthOutCallBack_Animation = function(aniName)
    {
        if(aniName == "oops") return;
        if(aniName == "hurry_up") {
            stateManager.onHurryUp();
        } else {
            stateManager.onUIMessage();
            console.log("-----3--------onUIMessage()--------------------- " + aniName);
        }
        assetManager.PauseTimer();
        MG.game.world.bringToTop(basic_Spine);
        basic_Spine.setAnimationByName(0, aniName, false);
        basic_Spine.state.onComplete = function () {
            stateManager.offUIMessage();
            console.log("-----3--------offUIMessage()-----------------------");
            stateManager.offHurryUp();
            assetManager.ResumeTimer();
        }
    };

    // sheild oops
    _Instance.Shield_Broken_Animation = function (posX, posY) {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_shield');
        shield_broken_spine.position.setTo(posX, posY);
        shield_broken_spine.setAnimationByName(0, 'shield_broken', false);
        shield_broken_spine.state.onComplete = function () {
            shield_broken_spine.position.setTo(-1000, -1000);
        }
    };

    // New Record
    _Instance.NewRecordAnimation = function () {
        stateManager.onUIMessage();
        console.log("------4-------onUIMessage()-----------------------");
        MG.game.world.bringToTop(basic_Spine);
        basic_Spine.setAnimationByName(0, "new_record", false);
        basic_Spine.state.onComplete = function () {
            stateManager.offUIMessage();
            console.log("-----4--------offUIMessage()-----------------------");
            if(stageManager.IsJustMonthsOpen()) {
                uiManager.OpenMonthsOpenWindow();       // 여기서 자동으로 StartGame_ReadyGoAnimation() 실행한다.
            } else {
                Game.prototype.StartGame_ReadyGoAnimation();
            }
        }
    };

    _Instance.OnUpdate = function () {
        if(bSmoothRefillTime) {
            assetManager.AddTime(2);
            if(timer >= DEFAULT_TIME_COUNT) {
                bSmoothRefillTime = false;
                timer = DEFAULT_TIME_COUNT;
                //stateManager.offHurryUp();
                assetManager.StopWarning();
                stateManager.offContinue();
                stateManager.offHurryUp();
                if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_increase');
                Game.prototype.PlayContinueGame();
            }
        }
    };

    _Instance.ActionGameFail = function () {

        switch(gameIter++)
        {
            case 0:
                //currentScene = 'failAction';
                // globalTouchInput = false;
                assetManager.PauseTimer();
                ballManager.AllKillBalls();
                //MG.game.time.events.add(1000, _Instance.ActionGameFail, this);
                break;

            case 1:
                figureManager.DeleteAllFigure();
                MG.game.time.events.add(500, _Instance.ActionGameFail, this);
                break;

            case 2:
                timer = DEFAULT_TIME_COUNT;
                gameIter = 0;
                uiManager.Create_GameOverWindow();
                break;
        }
    };

    _Instance.ActionGameSuccess = function () {
        if(stateManager.IsGameSuccess() == false) {
            gameIter = 0;
            return;
        }
        switch(gameIter++)
        {
            case 0:
                //currentScene = 'successAction';
                // globalTouchInput = false;
                if(isSuperItem || stateManager.IsStopSkill()) {
                    buffItemManager.Deactive_BuffItem();
                    // ballManager.StopSkill_End();
                }
                _Instance.ClearAnimation();
                break;

            case 1:
                ballManager.AllKillBalls();
                //MG.game.time.events.add(1500, _Instance.ActionGameSuccess, this);
                break;

            case 2:
                figureManager.DeleteAllFigure();
                MG.game.time.events.add(1000, _Instance.ActionGameSuccess, this);
                break;

            case 3:
                gameIter = 0;
                figureManager.FinishAnimation_Boolean(false);
                Game.prototype.ReStartGame();
                break;
        }
    };
    
    return _Instance;
}
)();