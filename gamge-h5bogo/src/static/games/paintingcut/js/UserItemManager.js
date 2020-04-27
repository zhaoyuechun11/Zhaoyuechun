'use strict';

var _userItemManager = _userItemManager||{};


_userItemManager.Instance = (function ()
{
    var _Instance = {};
    var userSelectedCount = 0;
    var userItemWindow;

    _Instance.Start = function () {
        userItemWindow = new UI_UserItem_Display();
    };

    _Instance.SetupItemSkill = function (isTime, isSlow, isLife) {
        userSelectedCount = 0;

        if(isTime)
        {
            userSelectedCount++;
            // DEFAULT_TIME_COUNT += MG.gameSheetsData["AddTimePlus"];
            isUseTimeItem = true;
            // assetManager.Set_Time_Skill();
            // assetManager.SetupTimer();
        }

        if(isSlow)
        {
            userSelectedCount++;
            console.log("=== Time Slow ===");
            isUseSlowItem = MG.gameSheetsData["SlowItemSkill"];
        }

        if(isLife)
        {
            userSelectedCount++;
            console.log("=== Time Life ===");
            gHeart += MG.gameSheetsData["LifeItemSkill"];
        }

        userItemWindow.SetUseItemPosition(isTime, isSlow, isLife);
    };

    /**
     * @return {Number}
     */
    _Instance.GetUserSelectedCount = function () {
        return userSelectedCount++;
    };

    _Instance.DisplayUserItem = function () {
        if(userSelectedCount > 0) {
            userItemWindow.VisibleWindow(true);
            MG.game.time.events.add(3000, _Instance.HiddenUserItem, this);
        } else {
            Game.prototype.StartGame_ReadyGoAnimation();
        }
    };

    _Instance.HiddenUserItem = function () {
        userItemWindow.VisibleWindow(false);
        Game.prototype.StartGame_ReadyGoAnimation();
    };

    return _Instance;
}
)();