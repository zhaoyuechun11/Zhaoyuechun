'use strict';

// 전역으로 빼자
var timer;
var reward_timer;
var gHeart = DEFAULT_HEART_COUNT;

var _assetManager = _assetManager||{};

_assetManager.Instance = (function ()
{
    var _Instance = {};

    const COOL_TIME = 3000;
    //var jewel;
    var timerEvents = undefined;
    var timeBar;
    var hurryUp_TimeStamp = 0;

    _Instance.Ready = function ()
    {
        if(gHeart < 0) gHeart = DEFAULT_HEART_COUNT;

        console.log("--- gHeart = " + parseInt(gHeart));
        console.log("--- playCount = " + playCount);

        if(isUseTimeItem && playCount <= 1) _Instance.Set_Time_Skill();

        if(timeBar == undefined || timeBar == null) timeBar = new AreaBar(timer);
        //timeBar = new AreaBar(timer);
        timeBar.LoadingSprite();

        MG.game.time.events.remove(timerEvents);
        timerEvents = MG.game.time.create(false);
        timerEvents.loop(Phaser.Timer.SECOND, UpdateTimer, this);

        assetManager.SetupTimer();

        if(timer <= HURRYUP_TIME_COUNT && timer > 0)
        {
            //actionManager.WidthOutCallBack_Animation("hurry_up");
            timeBar.StartWarning(true);
        }
    };

    _Instance.Set_Time_Skill = function () {
        DEFAULT_TIME_COUNT = MG.gameSheetsData["DefaultTimeCount"];
        DEFAULT_TIME_COUNT += MG.gameSheetsData["AddTimePlus"];
        timer = DEFAULT_TIME_COUNT;
    };

    _Instance.SetupTimer = function () {
        UpdateTimerBar();
        _Instance.PauseTimer();
    };

    _Instance.StartTimer = function ()
    {
        timerEvents.start();
        UpdateTimerBar();
    };

    _Instance.PauseTimer = function ()
    {
        timerEvents.pause();
    };

    _Instance.ResumeTimer = function ()
    {
        timerEvents.resume();
    };

    _Instance.UseHeart = function ()
    {
        if(--gHeart < 0) {
            gHeart = 0;
            UsingTime(MG.gameSheetsData["NoShieldDamage"])
        }

        this.UpdateHeartText();
    };

    // [FROM] FigureManager.RewardTime()
    _Instance.AddTime = function (t)
    {
        timer += t;
        if(timer > DEFAULT_TIME_COUNT) timer = DEFAULT_TIME_COUNT;

        UpdateTimerBar();
        _Instance.UpdateHeartText();
    };

    function UsingTime (t) {
        timer -= t;
        if(timer <= 0) {
            console.log("--------UsingTime--------");
            _Instance.EndingTimer();
        }
        timeBar.UpdateBarGauge(timer);
        timeBar.SetTimeFormat(timer);
    }

    _Instance.FullRefillTime = function () {
        timer = DEFAULT_TIME_COUNT;
        UpdateTimerBar();
        timeBar.SetTimeFormat(timer);
    };

    _Instance.SmoothRefillTime = function () {
        actionManager.SetSmoothRefillTime(true);
    };

    function UpdateTimerBar()
    {
        //uiManager.SetTimerText(timer);
        timeBar.UpdateBarGauge(timer);
    }

    _Instance.UpdateHeartText = function()
    {
        uiManager.SetHeartText(gHeart);
    };

    function UpdateTimer()
    {
        if(--timer <= 0) {
            _Instance.EndingTimer();
        } else {
            UpdateTimerBar();
        }

        // if(timeBar.GetIsHurryUp() == false && timer <= HURRYUP_TIME_COUNT && ((hurryUp_TimeStamp + COOL_TIME) <= MG.game.time.totalElapsedSeconds()) && timer > 0)
        if(timeBar.GetIsHurryUp() == false && timer <= HURRYUP_TIME_COUNT && timer > 0)
        {
            hurryUp_TimeStamp = MG.game.time.totalElapsedSeconds();
            actionManager.WidthOutCallBack_Animation("hurry_up");
            timeBar.StartWarning(true);
        }

        if(timeBar.GetIsHurryUp() == true && timer > HURRYUP_TIME_COUNT)
        {
            timeBar.StopWarning();
        }
    }

    _Instance.StopWarning = function () {
        timeBar.StopWarning();
    };

    _Instance.EndingTimer = function () {
        // if(currentScene != "game") return;
        if(stateManager.onTimeOver()) {
            stateManager.onContinue();
            _Instance.PauseTimer();
            globalTouchInput = false;
            // currentScene = "continue";
            timer = 0;
            if(timeBar.GetIsHurryUp()) timeBar.StopWarning();
            timeBar.UpdateBarGauge(0);
            timeBar.SetTimeFormat(0);
            actionManager.TimeOverAnimation();
        }
    };

    _Instance.OOPS_Time_Broken = function () {
        timeBar.OOPS_Time_Broken();
    };

    /**
     * @return {Number}
     */
    _Instance.GetRewardJewelry = function (_targetStage) {

        var _target;

        switch(_targetStage) {
            case "nStage":
                if(uData.nStage === 1) return 0;
                _target = uData.nStage;
                break;

            case "nBestStage":
                _target = uData.nBestScore;
                break;
        }

        var _get = 10;
        for(var i = 1; i < _target; i++) {
            _get = _get + (((parseInt(i + 1) - 2) / 5) + 1);
            _get = Math.floor(_get);
        }
        return _get.toFixed(0);
    };

    /**
     * @return {Number}
     */
    _Instance.GetMonthsJumpNeedJewelry = function (jumpMonth) {
        var _need = 20;
        for(var i = 1; i < jumpMonth; i++) {
            _need = _need + (((parseInt(i + 1) - 2) / 5) + 3);
            _need = Math.floor(_need);
        }
        return _need.toFixed(0);
    };

    /**
     * @return {Number}
     */
    _Instance.GetContinueNeedJewelry = function () {
        return uData.nStage * continueCounter;
    };

    // 베스트 스코어를 기록 한다.
    _Instance.UpdateBestScore = function () {
        // var currentScore = uData.nBestScore.toString() + uData.nBestCompleteArea.toString();
        // console.log("=== currentScore = " + currentScore);
        var insertZero;
        if(figureManager.GetTotalPaintedArea() < 10.0) {
            insertZero = "0" + figureManager.GetTotalPaintedArea().toString();
        }
        else {
            insertZero = figureManager.GetTotalPaintedArea().toString();
        }
        var newScore = uData.nStage.toString() + insertZero.toString();

        if(uData.nBestCompleteArea == null || uData.nBestCompleteArea == undefined)
        {
            StorageManager.prototype.set('nBestCompleteArea', 0);
            uData.nBestCompleteArea = 0;
        }

        console.log("--- uData.nBestCompleteArea = " + uData.nBestCompleteArea);
        console.log("--- newScore = " + newScore);

        if(parseFloat(uData.nBestCompleteArea) < parseFloat(newScore)) {
            console.log("--- Set newScore ---");
            isHighest_record = true;
            oldBest_months = uData.nBestScore;
            uData.nBestScore = uData.nStage;
            uData.nBestCompleteArea = newScore;
            StorageManager.prototype.set('nBestScore', uData.nBestScore);
            StorageManager.prototype.set('nBestCompleteArea', uData.nBestCompleteArea);
        }
    };

    return _Instance;
}
)();