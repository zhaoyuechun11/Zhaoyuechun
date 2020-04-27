'use strict';

var _feverManager = _feverManager||{};

_feverManager.Instance = (function ()
{
    var _Instance = {};
    var text_Spine;
    var roller_Spine;

    _Instance.Start = function()
    {
        text_Spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'fever_text');
        roller_Spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'fever_roller');
    };

    _Instance.SuccessFever = function ()
    {
        switch(++feverCounter)
        {
            case 1:
                // MG.game.world.bringToTop(text_Spine);
                // text_Spine.setAnimationByName(0, "fever_text_1_blue", false);
                // text_Spine.state.onComplete = function () {};
                // break;

            case 2:
                // MG.game.world.bringToTop(text_Spine);
                // text_Spine.setAnimationByName(0, "fever_text_1_2_green", false);
                // text_Spine.state.onComplete = function () {};
                // break;

            case 3:
                // MG.game.world.bringToTop(text_Spine);
                // text_Spine.setAnimationByName(0, "fever_text_2_yellow", false);
                // text_Spine.state.onComplete = function () {};
                // break;

            case 4:
                // MG.game.world.bringToTop(text_Spine);
                // text_Spine.setAnimationByName(0, "fever_text_3_orange", false);
                // text_Spine.state.onComplete = function () {};
                // break;

            case 5:
                MG.game.world.bringToTop(text_Spine);
                assetManager.PauseTimer();
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_fever_ready');
                text_Spine.setAnimationByName(0, "fever_all", false);
                text_Spine.state.onComplete = function () {
                    // figureManager.DeleteAllFigure();
                    // ballManager.AllKillBalls();
                    // if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_fever_play');
                    Play_RollerAnimation();
                    MG.game.time.events.add(1500, FeverModeSuccess_LoadingSprites, this);
                };
                break;
        }

        MG.game.world.bringToTop(text_Spine);
    };

    // _Instance.SuccessFever = function (area)
    // {
    //     // 1 == 100% 기준을 유지하기위해
    //     if(area >= (FEVER_SUCCESS_AREA * 100))
    //     {
    //         // success
    //         switch(++feverCounter)
    //         {
    //             case 1:
    //                 MG.game.world.bringToTop(text_Spine);
    //                 text_Spine.setAnimationByName(0, "fever_text_1_blue", false);
    //                 text_Spine.state.onComplete = function () {};
    //                 break;
    //
    //             case 2:
    //                 MG.game.world.bringToTop(text_Spine);
    //                 text_Spine.setAnimationByName(0, "fever_text_1_2_green", false);
    //                 text_Spine.state.onComplete = function () {};
    //                 break;
    //
    //             case 3:
    //                 MG.game.world.bringToTop(text_Spine);
    //                 text_Spine.setAnimationByName(0, "fever_text_2_yellow", false);
    //                 text_Spine.state.onComplete = function () {};
    //                 break;
    //
    //             case 4:
    //                 MG.game.world.bringToTop(text_Spine);
    //                 text_Spine.setAnimationByName(0, "fever_text_3_orange", false);
    //                 text_Spine.state.onComplete = function () {};
    //                 break;
    //
    //             case 5:
    //                 MG.game.world.bringToTop(text_Spine);
    //                 bFeverMode = true;
    //                 text_Spine.setAnimationByName(0, "fever_text_4_red", false);
    //                 text_Spine.state.onComplete = function () {
    //                     figureManager.DeleteAllFigure();
    //                     ballManager.AllKillBalls();
    //                     Play_RollerAnimation();
    //                 };
    //                 break;
    //         }
    //
    //         MG.game.world.bringToTop(text_Spine);
    //     }
    //     else
    //     {
    //         feverCounter = 0;
    //     }
    // };

    function Play_RollerAnimation()
    {
        feverCounter = 0;
        MG.game.world.bringToTop(roller_Spine);
        roller_Spine.setAnimationByName(0, "fever_roller", false);
        roller_Spine.state.onEvent = function(i, event)
        {
            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_fever_play_02');
        };
        roller_Spine.state.onComplete = function () {
            currentScene = "game";
            Game.prototype.FeverModeSuccessGame();
        };
    }

    function FeverModeSuccess_LoadingSprites() {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_fever_play_01');
        figureManager.DeleteAllFigure();
        ballManager.AllKillBalls();
        uiManager.CompletePaintingRatio(0);
        figureManager.FeverModeSuccess_LoadingSprites();        // 피버모드 애니메이션 끝나면 배경 sprite가 그대로 있다. 점프 Months 배경 스프라이트로 교체해주자.
    }

    return _Instance;
}
)();