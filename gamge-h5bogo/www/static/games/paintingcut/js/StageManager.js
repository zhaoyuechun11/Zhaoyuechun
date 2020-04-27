'use strict';

var _stageManager = _stageManager||{};

_stageManager.Instance = (function ()
{
    var _Instance = {};
    var isOpenJumpMonthsWindow = false;
    var create_balls_count = {
        normal_ball : 0,
        fast_ball : 0,
        slow_ball : 0,
        blink_ball : 0,
        split_ball : 0
        // bomb_ball : 0,
        // buff_box : 0,
        // damage_time : 5
    };
    var bomb_ball_count = 0;
    var buff_ball_count = 0;
    //--------------random-------------------
    var ball_random_point = 0;
    var bomb_random_count = {
        min : 0,
        max : 0
    };
    var buff_ball_random_count = {
        min : 0,
        max : 0
    };
    var damage_time = 0;

    // // 1 ~ 10까지 랜덤 설정해줌.  18.04.12 현재 사용 하지 않는 기능
    // _Instance.CreateRandomStage = function ()
    // {
    //     var i = 0;
    //     randomStage.length = 0;
    //
    //     // 봄 셔플
    //     var myArray = ['1','2','3'];
    //     ShuffleArray(myArray);
    //
    //     for(i = 0; i < myArray.length; i++)
    //     {
    //         randomStage.push(myArray[i]);
    //     }
    //
    //     // 여름 셔플
    //     myArray.length = 0;
    //     myArray = ['4','5','6'];
    //     ShuffleArray(myArray);
    //
    //     for(i = 0; i < myArray.length; i++)
    //     {
    //         randomStage.push(myArray[i]);
    //     }
    //
    //     // 가을 셔플
    //     myArray.length = 0;
    //     myArray = ['7','8'];
    //     ShuffleArray(myArray);
    //
    //     for(i = 0; i < myArray.length; i++)
    //     {
    //         randomStage.push(myArray[i]);
    //     }
    //
    //     // 겨울 셔플
    //     myArray.length = 0;
    //     myArray = ['9','10'];
    //     ShuffleArray(myArray);
    //
    //     for(i = 0; i < myArray.length; i++)
    //     {
    //         randomStage.push(myArray[i]);
    //     }
    // };

    /**
     * @return {Boolean}
     */
    _Instance.GetIsOpenJumpMonthsWindow = function () {
        return isOpenJumpMonthsWindow;
    };

    _Instance.SetIsOpenJumpMonthsWindow = function (b) {
        isOpenJumpMonthsWindow = b;
    };

    /**
     * @return {Number}
     */
    _Instance.GetIsOpenJumpMonthsCount = function () {
        for(var i = uData.nStage; i > 10; i--) {
            if(i % 10 == 1) {
                return i;
            }
        }
    };

    _Instance.Get_Create_Balls_Count = function () {
        if(create_balls_count.normal_ball == 0) _Instance.Load_Random_Stage_Data();
        return create_balls_count;
    };

    /**
     * @return {Number}
     */
    _Instance.Get_Bomb_Ball_Count = function () {
        return bomb_ball_count;
    };

    /**
     * @return {Number}
     */
    _Instance.Get_Buff_Ball_Count = function () {
        return buff_ball_count;
    };

    _Instance.Load_Random_Stage_Data = function () {
        // var __time = MG.game.time.totalElapsedSeconds();
        // console.log("[START] StageManager.Load_Random_Stage_Data() SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");

        if(uData.nStage <= 10) {
            // Set Random Balls.............
            create_balls_count.normal_ball = MG.gameSheetsData['StageData'][uData.nStage].NormalBall;
            create_balls_count.fast_ball = MG.gameSheetsData['StageData'][uData.nStage].FastBall;
            create_balls_count.slow_ball = MG.gameSheetsData['StageData'][uData.nStage].SlowBall;
            create_balls_count.blink_ball = MG.gameSheetsData['StageData'][uData.nStage].BlinkBall;
            create_balls_count.split_ball = MG.gameSheetsData['StageData'][uData.nStage].SplitBall;
            //bomb_ball_count = MG.gameSheetsData['StageData'][uData.nStage].BombBall;
            //buff_ball_count = 0;
            bomb_random_count.min = MG.gameSheetsData['RandomStageData'][0].Bomb_Min;
            bomb_random_count.max = MG.gameSheetsData['RandomStageData'][0].Bomb_Max;
            buff_ball_random_count.min = MG.gameSheetsData['RandomStageData'][0].ItemBox_Min;
            buff_ball_random_count.max = MG.gameSheetsData['RandomStageData'][0].ItemBox_Max;
            damage_time = MG.gameSheetsData['RandomStageData'][0].DamageTime;
            Set_Random_Bomb_Ball ();
            Set_Random_BuffBox_Ball ();
        } else {

            var _input_OK = false;
            for(var i = 1; i < MG.gameSheetsData['RandomStageData'].length; i++) {
                if(uData.nStage < MG.gameSheetsData['RandomStageData'][i].StartNumber) {
                    ball_random_point = MG.gameSheetsData['RandomStageData'][i - 1].BallTotalCount;
                    bomb_random_count.min = MG.gameSheetsData['RandomStageData'][i - 1].Bomb_Min;
                    bomb_random_count.max = MG.gameSheetsData['RandomStageData'][i - 1].Bomb_Max;
                    buff_ball_random_count.min = MG.gameSheetsData['RandomStageData'][i - 1].ItemBox_Min;
                    buff_ball_random_count.max = MG.gameSheetsData['RandomStageData'][i - 1].ItemBox_Max;
                    damage_time = MG.gameSheetsData['RandomStageData'][i - 1].DamageTime;
                    _input_OK = true;
                    break;
                }
            }

            if(_input_OK == false) {
                ball_random_point = MG.gameSheetsData['RandomStageData'][MG.gameSheetsData['RandomStageData'].length - 1].BallTotalCount;
                bomb_random_count.min = MG.gameSheetsData['RandomStageData'][MG.gameSheetsData['RandomStageData'].length - 1].Bomb_Min;
                bomb_random_count.max = MG.gameSheetsData['RandomStageData'][MG.gameSheetsData['RandomStageData'].length - 1].Bomb_Max;
                buff_ball_random_count.min = MG.gameSheetsData['RandomStageData'][MG.gameSheetsData['RandomStageData'].length - 1].ItemBox_Min;
                buff_ball_random_count.max = MG.gameSheetsData['RandomStageData'][MG.gameSheetsData['RandomStageData'].length - 1].ItemBox_Max;
                damage_time = MG.gameSheetsData['RandomStageData'][MG.gameSheetsData['RandomStageData'].length - 1].DamageTime;
            }

            Set_Random_Balls ();
            Set_Random_Bomb_Ball ();
            Set_Random_BuffBox_Ball ();
        }

        // console.log("[END] BallManager.SetActiveBalls() EEEEEEEEEEEEEEEEEEEEE= " + parseFloat(MG.game.time.totalElapsedSeconds() - __time));
    };

    function Init_Create_Random_Count () {
        create_balls_count.normal_ball = 0;
        create_balls_count.fast_ball = 0;
        create_balls_count.slow_ball = 0;
        create_balls_count.blink_ball = 0;
        create_balls_count.split_ball = 0;
    }

    function Set_Random_Balls () {
        var bLoop = true;

        while (bLoop) {
            var _point = ball_random_point;
            Init_Create_Random_Count ();

            while (_point > 0) {
                switch (getRandomIntInclusive(0, 4)) {
                    case 0:
                        // normal ball
                        _point -= MG.gameSheetsData["NormalBallPoint"];
                        create_balls_count.normal_ball++;
                        break;

                    case 1:
                        // fast ball
                        _point -= MG.gameSheetsData["FastBallPoint"];
                        create_balls_count.fast_ball++;
                        break;

                    case 2:
                        // slow ball
                        _point -= MG.gameSheetsData["SlowBallPoint"];
                        create_balls_count.slow_ball++;
                        break;

                    case 3:
                        // blink ball
                        _point -= MG.gameSheetsData["BlinkBallPoint"];
                        create_balls_count.blink_ball++;
                        break;

                    case 4:
                        // split ball
                        _point -= MG.gameSheetsData["SplitBallPoint"];
                        create_balls_count.split_ball++;
                        break;
                }

                if(_point == 0) {
                    bLoop = false;
                    break;
                }
            }
        }
    }

    function Set_Random_Bomb_Ball () {
        bomb_ball_count = getRandomIntInclusive(bomb_random_count.min, bomb_random_count.max);
    }

    function Set_Random_BuffBox_Ball () {
        buff_ball_count = getRandomIntInclusive(buff_ball_random_count.min, buff_ball_random_count.max);
    }

    /**
     * @return {Number}
     */
    _Instance.GetSeason12 = function (stageCount) {
        var result = stageCount % 36;
        if(result == 0) result = 36;

        result = result % 12;
        if(result == 0) result = 12;

        return result;
    };

    /**
     * @return {Number}
     */
    _Instance.GetSeason36 = function (stageCount) {
        var result = stageCount % 36;
        if(result === 0) result = 36;

        return result;
    };

    /**
     * @return {boolean}
     */
    _Instance.IsJustMonthsOpen = function () {

        console.log("--- IsJustMonthsOpen. ----------------------------");
        console.log("--- uData.nStage = " + uData.nStage);
        console.log("--- uData.nBestScore + 1 = " + parseInt(uData.nBestScore + 1));
        console.log("--- isOpenJumpMonthsWindow = " + isOpenJumpMonthsWindow);


        if(uData.nStage < 10 || uData.nStage < parseInt(uData.nBestScore + 1)) return false;
        if(isOpenJumpMonthsWindow) return true;

        console.log("--- uData.nStage % 10 = " + parseInt(uData.nStage % 10));
        return uData.nStage % 10 == 1 ? true : false;
    };

    // 피버모드 발동 시 JustMonthsOpen 조건에 만족하는 스테이지를 지나쳤다면, 다음 시작시 JumpMonths 창을 보여주자,
    _Instance.IsOpenJumpMonths = function (_start, _end) {
        for(var i = _start; i <= _end; i++)
        {
            if(i % 10 == 1) {
                // Open Jump Months Window 예약
                isOpenJumpMonthsWindow = true;
            }
        }
    };

    function ShuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    // function getRandomIntInclusive(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    return _Instance;
}
)();