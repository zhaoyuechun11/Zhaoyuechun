'use strict';

var _shopManager = _shopManager||{};

_shopManager.Instance = (function () {
        var _Instance = {};
        var jewelShopWindow;
        var reward_count = new Array(4);
        var cooltime_count_event = new Array(4);
        var reward_muilt = [2, 10, 2, 4];

        _Instance.Init = function () {
            jewelShopWindow = new UI_JewelryShop();
        };

        // 쥬얼리 구매, 충전 창을 연다. 오픈 open
        _Instance.OpenJewelShopWindow = function () {
            jewelShopWindow.VisibleWindow(true);
            jewelShopWindow.Set_CoolTime_0(Is_CoolTime(0));
            jewelShopWindow.Set_CoolTime_1(Is_CoolTime(1));
            jewelShopWindow.Set_CoolTime_2(Is_CoolTime(2));
            jewelShopWindow.Set_CoolTime_3(Is_CoolTime(3));
        };

        _Instance.CloseJewelShopWindow = function () {
            for(var i = 0; i < cooltime_count_event.length; i++) {
                if(cooltime_count_event[i] != undefined || cooltime_count_event[i] != null) MG.game.time.events.remove(cooltime_count_event[i]);
            }
        };

        // 쥬얼리 구매, 충전 확인 창을 연다. 오픈 open
        _Instance.OpenIsBuyWindow = function () {
            jewelShopWindow.VisibleIsBuyWindow(true);
        };

        _Instance.Set_Reward_Count = function () {
            for(var i = 0; i < reward_muilt.length; i++) {
                reward_count[i] = Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * reward_muilt[i]);
            }
        };

        _Instance.Get_Reward_Count = function(_inx) {
            _Instance.Set_Reward_Count();
            return reward_count[_inx];
        };

        /**
         * @return {boolean}
         */
        _Instance.Buy_Jewelry = function (_inx) {
            uData.nJewelryCount += reward_count[_inx];
            StorageManager.prototype.set('nJewelryCount', uData.nJewelryCount);

            // 충전완료 창 open
            jewelShopWindow.Create_OkBuyWindow();
            jewelShopWindow.VisibleOkBuyWindow(true, reward_count[_inx]);
            uiManager.SetJewelryCount();
            console.log(typeof MG.game.time.time);

            // cool time 적용해야함...
            var _t = MG.game.time.time;
            _t += 600000;       // 10분 미래 시간
            switch(_inx) {
                case 0:
                    uData.nJewelryCoolTime0 = _t;
                    StorageManager.prototype.set('nJewelryCoolTime0', uData.nJewelryCoolTime0);
                    jewelShopWindow.Set_CoolTime_0(Is_CoolTime(_inx));
                    break;

                case 1:
                    uData.nJewelryCoolTime1 = _t;
                    StorageManager.prototype.set('nJewelryCoolTime1', uData.nJewelryCoolTime1);
                    jewelShopWindow.Set_CoolTime_1(Is_CoolTime(_inx));
                    break;

                case 2:
                    uData.nJewelryCoolTime2 = _t;
                    StorageManager.prototype.set('nJewelryCoolTime2', uData.nJewelryCoolTime2);
                    jewelShopWindow.Set_CoolTime_2(Is_CoolTime(_inx));
                    break;

                case 3:
                    uData.nJewelryCoolTime3 = _t;
                    StorageManager.prototype.set('nJewelryCoolTime3', uData.nJewelryCoolTime3);
                    jewelShopWindow.Set_CoolTime_3(Is_CoolTime(_inx));
                    break;
            }

        };

        /**
         * @return {Number}
         */
        function Is_CoolTime(_num) {
            switch(_num) {
                case 0:
                    if(uData.nJewelryCoolTime0 <= 0 || uData.nJewelryCoolTime0 == null || MG.game.time.time > uData.nJewelryCoolTime0) {
                        // cool time 아니다.
                        if(cooltime_count_event[0] != undefined || cooltime_count_event[0] != null) MG.game.time.events.remove(cooltime_count_event[0]);
                        return 'none';
                    } else {
                        // cool time 중이다.
                        cooltime_count_event[0] = MG.game.time.events.loop(Phaser.Timer.SECOND, Loop_CoolTime_0, this);
                        return Create_TimeFormat(uData.nJewelryCoolTime0 - MG.game.time.time);
                    }
                    break;

                case 1:
                    if(uData.nJewelryCoolTime1 <= 0 || uData.nJewelryCoolTime1 == null || MG.game.time.time > uData.nJewelryCoolTime1) {
                        // cool time 아니다.
                        if(cooltime_count_event[1] != undefined || cooltime_count_event[1] != null) MG.game.time.events.remove(cooltime_count_event[1]);
                        return 'none';
                    } else {
                        // cool time 중이다.
                        cooltime_count_event[1] = MG.game.time.events.loop(Phaser.Timer.SECOND, Loop_CoolTime_1, this);
                        return Create_TimeFormat(uData.nJewelryCoolTime1 - MG.game.time.time);
                    }
                    break;

                case 2:
                    if(uData.nJewelryCoolTime2 <= 0 || uData.nJewelryCoolTime2 == null || MG.game.time.time > uData.nJewelryCoolTime2) {
                        // cool time 아니다.
                        if(cooltime_count_event[2] != undefined || cooltime_count_event[2] != null) MG.game.time.events.remove(cooltime_count_event[2]);
                        return 'none';
                    } else {
                        // cool time 중이다.
                        cooltime_count_event[2] = MG.game.time.events.loop(Phaser.Timer.SECOND, Loop_CoolTime_2, this);
                        return Create_TimeFormat(uData.nJewelryCoolTime2 - MG.game.time.time);
                    }
                    break;

                case 3:
                    if(uData.nJewelryCoolTime3 <= 0 || uData.nJewelryCoolTime3 == null || MG.game.time.time > uData.nJewelryCoolTime3) {
                        // cool time 아니다.
                        if(cooltime_count_event[3] != undefined || cooltime_count_event[3] != null) MG.game.time.events.remove(cooltime_count_event[3]);
                        return 'none';
                    } else {
                        // cool time 중이다.
                        cooltime_count_event[3] = MG.game.time.events.loop(Phaser.Timer.SECOND, Loop_CoolTime_3, this);
                        return Create_TimeFormat(uData.nJewelryCoolTime3 - MG.game.time.time);
                    }
                    break;
            }
        }

        function Loop_CoolTime_0 () {
            if(MG.game.time.time < uData.nJewelryCoolTime0) {
                jewelShopWindow.Set_CoolTime_0(Create_TimeFormat(uData.nJewelryCoolTime0 - MG.game.time.time));
            } else {
                MG.game.time.events.remove(cooltime_count_event[0]);
                jewelShopWindow.Set_CoolTime_0('none');
            }
        }

        function Loop_CoolTime_1 () {
            if(MG.game.time.time < uData.nJewelryCoolTime1) {
                jewelShopWindow.Set_CoolTime_1(Create_TimeFormat(uData.nJewelryCoolTime1 - MG.game.time.time));
            } else {
                MG.game.time.events.remove(cooltime_count_event[1]);
                jewelShopWindow.Set_CoolTime_1('none');
            }
        }

        function Loop_CoolTime_2 () {
            if(MG.game.time.time < uData.nJewelryCoolTime2) {
                jewelShopWindow.Set_CoolTime_2(Create_TimeFormat(uData.nJewelryCoolTime2 - MG.game.time.time));
            } else {
                MG.game.time.events.remove(cooltime_count_event[2]);
                jewelShopWindow.Set_CoolTime_2('none');
            }
        }

        function Loop_CoolTime_3 () {
            if(MG.game.time.time < uData.nJewelryCoolTime3) {
                jewelShopWindow.Set_CoolTime_3(Create_TimeFormat(uData.nJewelryCoolTime3 - MG.game.time.time));
            } else {
                MG.game.time.events.remove(cooltime_count_event[3]);
                jewelShopWindow.Set_CoolTime_3('none');
            }
        }

        /**
         * @return {String}
         */
        function Create_TimeFormat(t) {
            t = Math.floor(t / 1000);
            var timeFormat;

            var min = Math.floor(t / 60);
            var sec = Math.floor(t % 60);

            if(min > 0) {
                if(sec >= 10)
                    timeFormat = "0" + min.toString() + ":" + sec.toString();
                else
                    timeFormat = "0" + min.toString() + ":0" + sec.toString();
            } else {
                if(sec >= 10)
                    timeFormat = "00" + ":" + sec.toString();
                else
                    timeFormat = "00" + ":0" + sec.toString();
            }

            return timeFormat.toString();
        }



        return _Instance;
    }
)();