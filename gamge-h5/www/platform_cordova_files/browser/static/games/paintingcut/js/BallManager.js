'use strict';

var _ballManager = _ballManager||{};

var normalBalls = new Array();
var fastBalls = new Array();
var slowBalls = new Array();
var blinkBalls = new Array();
var splitBalls = new Array();
var activeBalls = new Array();
var standByBalls = new Array();
var activeBuffBalls = new Array();
var activeBombBalls = new Array();
var bombBalls = new Array();
var bombBallSprites = new Array();
var ballSprites = new Array();
var buffBalls = new Array();
var buffBallSprites = new Array();
var deleteBalls = new Array();          // Super 아이템으로 죽을 볼들,,
var isDelete = false;
var stopSkill_event;
var stopSkill_Blink_event;


_ballManager.Instance = (function ()
{
    //const COLLIDER_SPACE = 15;
    var _Instance = {};
    var create_balls_count;
    var start_timeStamp;
    var save_timeStamp;



    // var ballBombAnimation;
    //var blinkEvent;
    //var splitBallSkillEvent;
    var splitCount = 0;
    var current_months_count = 0;

    _Instance.Ready = function () {
        splitCount = 0;
        start_timeStamp = 0;
        save_timeStamp = 0;
        current_months_count = uData.nStage;
        //this.blinkEvent = MG.game.time.create(false);
        ReSetSplitBalls();
        SetActiveBalls();
        // _Instance.VisibleBalls(false);
    };

    _Instance.Start = function () {
        _Instance.Active_Move_Balls(true);
    };

    /**
     * @return {Number}
     */
    _Instance.Get_Current_Months_Count = function () {
        return current_months_count;
    };

    _Instance.VisibleBalls = function (b) {
        MG.game.physics.arcade.isPaused = b;

        for(var i = 0; i < ballSprites.length; i++) {
            ballSprites[i].visible = b;
        }
        for(i = 0; i < bombBallSprites.length; i++) {
            bombBallSprites[i].visible = b;
        }
        for(i = 0; i < buffBallSprites.length; i++) {
            buffBallSprites[i].visible = b;
        }

        if(b) MG.game.physics.arcade.isPaused = b;
    };

    // from uiManager
    _Instance.SplitBallSkill = function (_completePercent) {
        if(create_balls_count.split_ball <= 0) return;

        if(parseFloat(_completePercent) > 50 && splitCount == 0)
        {
            // 2번 연속 스플릿
            PlaySplitBallAnimation();
            MG.game.time.events.add(700, PlaySplitBallAnimation, this);
        }
        else if(parseFloat(_completePercent) > 25 && splitCount == 0)
        {
            // 1st
            PlaySplitBallAnimation();
        }
        else if(parseFloat(_completePercent) > 50 && splitCount == 1)
        {
            // 2nd
            PlaySplitBallAnimation();
        }
    };

    function ReSetSplitBalls()
    {
        for(var i = 0; i < splitBalls.length; i++)
        {
            splitBalls[i].SetActiveBlooen(false);
        }
    }

    function PlaySplitBallAnimation() {
        splitCount++;

        for(var i = 0; i < splitBalls.length; i++)
        {
            if(splitBalls[i].IsActive())
            {
                splitBalls[i].PlayAnimation("split_ball_big_out", false);
            }
        }

        MG.game.time.events.add(500, SplitSkillEndAnimationCallBack, this);
    }

    // split Skill 스플릿 스킬 실행
    function SplitSkillEndAnimationCallBack() {
        var createArray = new Array();

        for(var i = 0; i < activeBalls.length; i++) {
            if(activeBalls[i].constructor == SplitBall && activeBalls[i].IsActive()) {
                createArray.push(i);
                activeBalls[i].PlayAnimation("split_ball_big_idle", true);
                activeBalls[i].ActiveSplitSkill();
            }
        }

        if(createArray.length <= 0) return;

        var _standByBall = standByBalls.length;
        var deleteArray = new Array();

        for(i = 0; i < _standByBall; i++) {
            var inx = createArray.shift();
            var pos = {x:activeBalls[inx].GetBallBody().position.x, y:activeBalls[inx].GetBallBody().position.y};
            standByBalls[0].SetSplitCount(splitCount);
            deleteArray.push(i);
            standByBalls[0].ActiveBall(true);
            if(stateManager.IsStopSkill()) {
                standByBalls[0].SetVelocity(false);
            } else {
                standByBalls[0].SetVelocity(true);
            }
            standByBalls[0].SetSpritePosition(pos.x, pos.y);
            standByBalls[0].VisibleBall(true);
            standByBalls[0].PlayAnimation("split_ball_big_idle", true);
            activeBalls.push(standByBalls[0]);
            ballSprites.push(standByBalls[0].GetBallBody());
            standByBalls.shift();

            if(createArray.length <= 0) break;
        }
    }

    // function SplitSkillEndAnimationCallBack() {
    //     var createArray = new Array();
    //
    //     for(var i = 0; i < splitBalls.length; i++)
    //     {
    //         if(splitBalls[i].IsActive())
    //         {
    //             createArray.push(i);
    //             splitBalls[i].PlayAnimation("split_ball_big_idle", true);
    //             splitBalls[i].ActiveSplitSkill();
    //         }
    //     }
    //
    //     for(var i = 0; i < splitBalls.length; i++)
    //     {
    //         if(splitBalls[i].IsActive() == false)
    //         {
    //             var inx = createArray.shift();
    //             var pos = splitBalls[inx].GetBallBody();
    //
    //             // splitBalls[i].Create();
    //             splitBalls[i].SetSplitCount(splitCount);
    //             splitBalls[i].Create();
    //             splitBalls[i].ActiveBall();
    //             splitBalls[i].SetSpritePosition(pos.position.x, pos.position.y);
    //             activeBalls.push(splitBalls[i]);
    //             ballSprites.push(splitBalls[i].GetBallBody());
    //         }
    //
    //         if(createArray.length <= 0) break;
    //     }
    // }

    // // from SplitBall
    // _Instance.ActiveSplitSkill = function () {
    //     for(var i = 0; i < splitBalls.length; i++) {
    //
    //         if(splitBalls[i].IsActive()) {
    //             splitBalls[i].ActiveBall();
    //             var ballBody = splitBalls[i].GetBallBody();
    //             var s = splitBalls[i];
    //             s.Create();
    //             s.SetSpritePosition(ballBody.position.x, ballBody.position.y);
    //             s.ActiveBall();
    //             activeBalls.push(s);
    //             ballSprites.push(s.GetBallBody());
    //         }
    //     }
    // };

    // // from SplitBall
    // _Instance.CreateSplitBalls = function () {
    //     for (var i = 0; i < 2; i++) {
    //         var s = new SplitBall(splitCount);
    //         s.Create();
    //         s.ActiveBall();
    //         activeBalls.push(s);
    //         ballSprites.push(s.GetBallBody());
    //     }
    // };

    _Instance.GetActiveBalls = function () {
        return activeBalls;
    };

    _Instance.GetBallSplites = function () {
        return ballSprites;
    };

    _Instance.GetBuffBalls = function () {
        return buffBalls;
    };

    _Instance.GetBuffItemSplites = function () {
        return buffBallSprites;
    };

    _Instance.GetBombBalls = function () {
        return bombBalls;
    };

    _Instance.GetBombBallSprites = function () {
        return bombBallSprites;
    };


    _Instance.BringToTopBuffBalls = function () {
        for(var i = 0; i < buffBallSprites.length; i++)
        {
            MG.game.world.bringToTop(buffBallSprites[i]);
        }
        for(i = 0; i < bombBallSprites.length; i++)
        {
            MG.game.world.bringToTop(bombBallSprites[i]);
        }
    };

    // _Instance.CreateBalls = function () {
        // var i = 0;
        //
        // // for (i = 0; i < MG.gameSheetsData["BallMaxCount"]; i++) {
        // //     normalBalls[i] = new NormalBall();
        // //     normalBalls[i].Create();
        // // }
        //
        // if(normalBalls.length < MG.gameSheetsData['StageData'][uData.nStage].NormalBall)
        // {
        //     for (i = normalBalls.length; i < MG.gameSheetsData['StageData'][uData.nStage].NormalBall; i++) {
        //         normalBalls[i] = new NormalBall();
        //         normalBalls[i].Create();
        //         //normalBalls[i].VisibleBall(false);
        //     }
        // }
        //
        // if(fastBalls.length < MG.gameSheetsData['StageData'][uData.nStage].FastBall)
        // {
        //     for (i = fastBalls.length; i < MG.gameSheetsData['StageData'][uData.nStage].FastBall; i++) {
        //         fastBalls[i] = new FastBall();
        //         fastBalls[i].Create();
        //         //fastBalls[i].VisibleBall(false);
        //     }
        // }
        //
        // if(slowBalls.length < MG.gameSheetsData['StageData'][uData.nStage].SlowBall)
        // {
        //     for (i = slowBalls.length; i < MG.gameSheetsData['StageData'][uData.nStage].SlowBall; i++) {
        //         slowBalls[i] = new SlowBall();
        //         slowBalls[i].Create();
        //         //slowBalls[i].VisibleBall(false);
        //     }
        // }
        //
        // if(blinkBalls.length < MG.gameSheetsData['StageData'][uData.nStage].BlinkBall)
        // {
        //     for (i = blinkBalls.length; i < MG.gameSheetsData['StageData'][uData.nStage].BlinkBall; i++) {
        //         blinkBalls[i] = new BlinkBall();
        //         blinkBalls[i].Create();
        //         //blinkBalls[i].VisibleBall(false);
        //     }
        // }
        //
        // if(splitBalls.length < MG.gameSheetsData['StageData'][uData.nStage].SplitBall * 4)
        // {
        //     for (i = splitBalls.length; i < MG.gameSheetsData['StageData'][uData.nStage].SplitBall * 4; i++) {
        //         splitBalls[i] = new SplitBall();
        //         splitBalls[i].Create();
        //         //splitBalls[i].VisibleBall(false);
        //     }
        // }
        //
        // if(bombBalls.length < 3)
        // {
        //     // 폭탄볼 (임시로 Stage당 1~3개중 랜덤 출현)
        //     for (i = 0; i < 3; i++) {
        //         bombBalls[i] = new BombBall();
        //         bombBalls[i].Create();
        //         //bombBalls[i].VisibleBall(false);
        //     }
        // }
        //
        // // 버프 아이템박스 (임시로 Stage당 1~3개중 랜덤 출현)
        // for (i = 0; i < 3; i++) {
        //     var rndType = getRandomIntInclusive(1, 2);
        //     console.log("=== rndType = " + rndType);
        //     if(rndType === 1)
        //         buffBalls[i] = new BuffBall("timePlus");
        //     else
        //         buffBalls[i] = new BuffBall("lifeUp");
        //
        //     buffBalls[i].Create();
        //     //buffBalls[i].VisibleBall(false);
        // }

    // };

    // function getRandomIntInclusive(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    function SetActiveBalls() {
        // var __time = MG.game.time.totalElapsedSeconds();
        // console.log("[START] BallManager.SetActiveBalls() SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");

        var i = 0;
        stageManager.Load_Random_Stage_Data();
        create_balls_count = stageManager.Get_Create_Balls_Count();
        activeBalls.length = 0;
        standByBalls.length = 0;
        activeBuffBalls.length = 0;
        activeBombBalls.length = 0;
        ballSprites.length = 0;
        buffBallSprites.length = 0;
        bombBallSprites.length = 0;
        //ballSprites.visible = true;
        //ballSprites = MG.game.add.group();
        //ballSprites.enableBody = true;
        //ballSprites.children.length = 0;

        // console.log("$$$ NormalBall = " + MG.gameSheetsData['StageData'][uData.nStage].NormalBall);
        // console.log("$$$ FastBall = " + MG.gameSheetsData['StageData'][uData.nStage].FastBall);
        // console.log("$$$ SlowBall = " + MG.gameSheetsData['StageData'][uData.nStage].SlowBall);
        // console.log("$$$ BlinkBall = " + MG.gameSheetsData['StageData'][uData.nStage].BlinkBall);
        // console.log("$$$ SplitBall = " + MG.gameSheetsData['StageData'][uData.nStage].SplitBall);


        console.log("------- playcount = " + playCount);
        if(create_20_balls == false) {
            console.log("------------------ create_20_balls -------------------");
            for (i = 0; i < 10; i++) {
                normalBalls[i] = new NormalBall();
                fastBalls[i] = new FastBall();
                slowBalls[i] = new SlowBall();
                blinkBalls[i] = new BlinkBall();
                splitBalls[i] = new SplitBall();
            }
            create_20_balls = true;
        }

        // for (i = 0; i < MG.gameSheetsData['StageData'][uData.nStage].NormalBall; i++) {
        for (i = 0; i < create_balls_count.normal_ball; i++) {
            if(i >= normalBalls.length)
            {
                normalBalls[i] = new NormalBall();
                console.log("------------------ create_normalBalls_balls -------------------");
            }
            normalBalls[i].Create();
            normalBalls[i].Create_Physics();
            normalBalls[i].Create_Events();
            normalBalls[i].ActiveBall(false);
            normalBalls[i].VisibleBall(true);
            activeBalls.push(normalBalls[i]);
            ballSprites.push(normalBalls[i].GetBallBody());
        }

        // for (i = 0; i < MG.gameSheetsData['StageData'][uData.nStage].FastBall; i++) {
        for (i = 0; i < create_balls_count.fast_ball; i++) {
            if(i >= fastBalls.length)
            {
                fastBalls[i] = new FastBall();
                console.log("------------------ create_fastBalls_balls -------------------");

            }
            fastBalls[i].Create();
            fastBalls[i].Create_Physics();
            fastBalls[i].Create_Events();
            fastBalls[i].ActiveBall(false);
            fastBalls[i].VisibleBall(true);
            activeBalls.push(fastBalls[i]);
            ballSprites.push(fastBalls[i].GetBallBody());
        }

        // for (i = 0; i < MG.gameSheetsData['StageData'][uData.nStage].SlowBall; i++) {
        for (i = 0; i < create_balls_count.slow_ball; i++) {
            if(i >= slowBalls.length)
            {
                slowBalls[i] = new SlowBall();
                console.log("------------------ create_slowBalls_balls -------------------");
            }
            slowBalls[i].Create();
            slowBalls[i].Create_Physics();
            slowBalls[i].Create_Events();
            slowBalls[i].ActiveBall(false);
            slowBalls[i].VisibleBall(true);
            activeBalls.push(slowBalls[i]);
            ballSprites.push(slowBalls[i].GetBallBody());
        }

        // for (i = 0; i < MG.gameSheetsData['StageData'][uData.nStage].BlinkBall; i++) {
        for (i = 0; i < create_balls_count.blink_ball; i++) {
            if(i >= blinkBalls.length)
            {
                blinkBalls[i] = new BlinkBall();
                console.log("------------------ create_blinkBalls_balls -------------------");
            }
            blinkBalls[i].Create();
            blinkBalls[i].Create_Physics();
            blinkBalls[i].Create_Events();
            blinkBalls[i].ActiveBall(false);
            blinkBalls[i].VisibleBall(true);
            activeBalls.push(blinkBalls[i]);
            ballSprites.push(blinkBalls[i].GetBallBody());
        }

        // for (i = 0; i < MG.gameSheetsData['StageData'][uData.nStage].SplitBall * 4; i++) {
        for (i = 0; i < create_balls_count.split_ball * 4; i++) {
            splitBall_count = create_balls_count.split_ball;
            if(i >= splitBalls.length)
            {
                splitBalls[i] = new SplitBall();
                console.log("------------------ create_splitBalls_balls -------------------");
            }
            splitBalls[i].Create();
            splitBalls[i].Create_Physics();
            splitBalls[i].Create_Events();
            splitBalls[i].SetSplitCount(0);
            if( i < create_balls_count.split_ball ) {
                splitBalls[i].ActiveBall(false);
                splitBalls[i].VisibleBall(true);
                activeBalls.push(splitBalls[i]);
                ballSprites.push(splitBalls[i].GetBallBody());
            } else {
                splitBalls[i].ActiveBall(false);
                splitBalls[i].VisibleBall(false);
                splitBalls[i].SetVelocity(false);
                standByBalls.push(splitBalls[i]);
            }
        }

        var createInx = 0;
        // for (i = 0; i < MG.gameSheetsData['StageData'][uData.nStage].BombBall; i++) {
        for (i = 0; i < stageManager.Get_Bomb_Ball_Count(); i++) {
            if(i >= bombBalls.length)
            {
                bombBalls[i] = new BombBall();
            }
            bombBalls[i].Create(createInx++);
            bombBalls[i].Create_Physics();
            bombBalls[i].Create_Events();
            bombBalls[i].ActiveBall(false);
            bombBalls[i].VisibleBall(true);
            activeBombBalls.push(bombBalls[i]);
            bombBallSprites.push(bombBalls[i].GetBallBody());
            MG.game.world.bringToTop(bombBalls[i].GetBallBody());
        }

        createInx = 0;
        // for (i = 0; i < getRandomIntInclusive(1, 3); i++) {
            // var rndType = getRandomIntInclusive(1, 2);
            // if(rndType === 1)
            //     buffBalls[i] = new BuffBall("timePlus");
            // else
            //     buffBalls[i] = new BuffBall("lifeUp");

        for (i = 0; i < stageManager.Get_Buff_Ball_Count(); i++) {
            if(i >= buffBalls.length)
            {
                buffBalls[i] = new BuffBall();
            }
            buffBalls[i].Create(createInx++);
            buffBalls[i].Create_Physics();
            buffBalls[i].Create_Events();
            buffBalls[i].SetBuffType(buffItemManager.Get_BuffItem_Type());
            buffBalls[i].ActiveBall(false);
            buffBalls[i].VisibleBall(true);
            activeBuffBalls.push(buffBalls[i]);
            buffBallSprites.push(buffBalls[i].GetBallBody());
            MG.game.world.bringToTop(buffBalls[i].GetBallBody());
        }

        //ballSprites.visible = false;


        // console.log("[END] BallManager.SetActiveBalls() EEEEEEEEEEEEEEEEEEEEE= " + parseFloat(MG.game.time.totalElapsedSeconds() - __time));
    }

    // 이동 / 정지
    _Instance.Active_Move_Balls = function (_move) {
        var i = 0;
        for (i = 0; i < activeBalls.length; i++) {
            activeBalls[i].SetVelocity(_move);
        }
        for (i = 0; i < activeBuffBalls.length; i++) {
            activeBuffBalls[i].SetVelocity(_move);
        }
        for (i = 0; i < activeBombBalls.length; i++) {
            activeBombBalls[i].SetVelocity(_move);
        }
    };

    // 라인, 폭탄과 방해물이 충돌하는지 검사 (일반 모드)
    _Instance.BallAndLineColliderListener = function (_line) {
        var isCollide_line_to_ball = MG.game.physics.arcade.collide(_line, ballSprites, CollisionHandler, null, this);
        if(isCollide_line_to_ball == false) MG.game.physics.arcade.overlap(_line, ballSprites, CollisionHandler, null, this);
        var isCollide_line_to_bomb = MG.game.physics.arcade.collide(_line, bombBallSprites, CollisionBombBallHandler, null, this);
        if(isCollide_line_to_bomb == false) MG.game.physics.arcade.overlap(_line, bombBallSprites, CollisionBombBallHandler, null, this);

        if(deleteBalls.length > 0 && isDelete == false) {
            isDelete = true;
            SuperItem_DeleteBalls();
        }
    };

    function CollisionHandler(obj1, obj2) {
        if(obj2 == undefined) return;

        if(isSuperItem == false) {      // Super 모드가 아니다.
            _Instance.KillBall(obj2);
            figureManager.CollisionLineHandler(obj2.position.x, obj2.position.y);
            if(gHeart <= 0) this.ShakeCamera();
            assetManager.UseHeart();            // life -1
            // figureManager.NoBallFigureDelete(true);
        } else {
            // _Instance.KillBall(obj2);
            deleteBalls.push(obj2);
        }
    }

    function SuperItem_DeleteBalls() {
        if(deleteBalls.length > 0) {
            _Instance.KillBall(deleteBalls.shift());
            MG.game.time.events.add(150, SuperItem_DeleteBalls, this);
        } else {
            isDelete = false;
        }
    }

    // 선과 폭탄 방해물이 서로 충돌 했다.
    function CollisionBombBallHandler(obj1, obj2) {
        if(obj2 == undefined) return;

        _Instance.KillBombBall(obj2);

        if(isSuperItem == false) {      // Super 모드가 아니다.
            figureManager.CollisionLineHandler(obj2.position.x, obj2.position.y);   // 라인처리
            figureManager.BombFigure(obj2.position.x, obj2.position.y);     // 폭파 처리
            if(gHeart <= 0) this.ShakeCamera();
            assetManager.UseHeart();            // life -1
        }
    }

    _Instance.CollisionBuffItemHandler = function (obj1) {
        if(obj1 == undefined) return;

        _Instance.KillBuffBall(obj1);
        // figureManager.CollisionBuffBallHandler();
    };

    _Instance.ShakeCamera = function () {
        MG.game.camera.shake(MG.gameSheetsData["Shake_intensity"], MG.gameSheetsData["Shake_duration"]);
    };

    //////////////////////////////////////////////////////////////// Stop 아이템 실행 ////////////
    _Instance.StopSkill_Start = function () {
        start_timeStamp = MG.game.time.totalElapsedSeconds();
        this.Active_Move_Balls(false);
        stopSkill_event = MG.game.time.events.add(MG.gameSheetsData["StopSkillTime"] * 1000, _Instance.StopSkill_End, this);
        stopSkill_Blink_event = MG.game.time.events.add((MG.gameSheetsData["StopSkillTime"] * 1000) - (MG.gameSheetsData["StopSkillBlinkTime"] * 1000), _Instance.Active_Shake_Animation, this);
    };

    _Instance.StopSkill_ReStart = function () {
        _Instance.StopSkill_Cancle();
        _Instance.StopSkill_Start();
    };

    _Instance.StopSkill_Pause = function () {
        save_timeStamp = MG.game.time.totalElapsedSeconds() - start_timeStamp;
        save_timeStamp *= 1000;
        console.log("------ save_timeStamp = " + save_timeStamp);
        MG.game.time.events.remove(stopSkill_event);
        MG.game.time.events.remove(stopSkill_Blink_event);
    };

    _Instance.StopSkill_Resume = function () {
        start_timeStamp = 0;
        var _stopTime = MG.gameSheetsData["StopSkillTime"] * 1000;
        var _blinkTime = MG.gameSheetsData["StopSkillBlinkTime"] * 1000;

        stopSkill_event = MG.game.time.events.add(_stopTime - save_timeStamp, _Instance.StopSkill_End, this);

        if(save_timeStamp < (_stopTime - _blinkTime)) {
            stopSkill_Blink_event = MG.game.time.events.add((_stopTime - save_timeStamp) - _blinkTime, _Instance.Active_Shake_Animation, this);
        }
    };

    _Instance.StopSkill_End = function () {
        stateManager.offStopSkill();
        this.Active_Move_Balls(true);
        this.Active_Shake_Animation(false);
        buffItemManager.Deactive_BuffItem();
    };

    _Instance.StopSkill_Cancle = function () {
        MG.game.time.events.remove(stopSkill_event);
        MG.game.time.events.remove(stopSkill_Blink_event);
        _Instance.StopSkill_End();
    };

    _Instance.Active_Blink_Animation = function (_active) {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_stop_relent');
        var i = 0;
        if(_active == undefined || _active == null) _active = true;
        if(_active) {
            for (i = 0; i < activeBalls.length; i++) {
                activeBalls[i].Active_Blink_Mode(true);
            }
        } else {
            for (i = 0; i < activeBalls.length; i++) {
                activeBalls[i].Active_Blink_Mode(false);
            }
        }
    };

    _Instance.Active_Shake_Animation = function (_active) {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_stop_relent');
        var i = 0;
        if(_active == undefined || _active == null) _active = true;
        if(_active) {
            for (i = 0; i < activeBalls.length; i++) {
                activeBalls[i].Active_Shake_Mode(true);
            }
        } else {
            for (i = 0; i < activeBalls.length; i++) {
                activeBalls[i].Active_Shake_Mode(false);
            }
        }
    };

    _Instance.KillBall = function (targetBall) {

        var inx = ballSprites.indexOf(targetBall);
        if(inx < 0) return;
        if(activeBalls[inx] == null || activeBalls[inx] == undefined) return;
        activeBalls[inx].KillBall();
        activeBalls.splice(inx, 1);
        ballSprites.splice(inx, 1);

        // targetBall.body.velocity.setTo(0,0);
        // targetBall.scale.setTo(0);
        // targetBall.position.setTo(-1000, -1000);
    };

    _Instance.KillBuffBall = function (targetBall) {
        for(var i = 0; i < activeBuffBalls.length; i++)
        {
            if(activeBuffBalls[i].GetIndex() == targetBall.GetIndex())
            {
                console.log("--- KillBuffBall i --- " + i);
                activeBuffBalls[i].KillBall(true);
                activeBuffBalls.splice(i, 1);
                buffBallSprites.splice(i, 1);
            }
        }
        // var inx = buffBallSprites.indexOf(targetBall);
        // if(inx < 0) return;
        // if(activeBuffBalls[inx] === null || activeBuffBalls[inx] === undefined) return;
        // activeBuffBalls[inx].KillBall(true);
        // activeBuffBalls.splice(inx, 1);
        // buffBallSprites.splice(inx, 1);
    };

    _Instance.KillBombBall = function (targetBall) {
        // for(var i = 0; i < activeBombBalls.length; i++)
        // {
        //     if(activeBombBalls[i].GetIndex() === targetBall.GetIndex())
        //     {
        //         activeBombBalls[i].KillBall(true);
        //         activeBombBalls.splice(i, 1);
        //         bombBallSprites.splice(i, 1);
        //     }
        // }
        var inx = bombBallSprites.indexOf(targetBall);
        if(inx < 0) return;
        if(activeBombBalls[inx] == null || activeBombBalls[inx] == undefined) return;
        activeBombBalls[inx].KillBall();
        activeBombBalls.splice(inx, 1);
        bombBallSprites.splice(inx, 1);
    };

    _Instance.AllKillBalls = function () {
        if(activeBuffBalls.length > 0 ) {
            for (var i = 0; i < activeBuffBalls.length; i++) {
                activeBuffBalls[i].KillBall(false);
                console.log("--- AllKillBalls activeBuffBalls ---");
            }
            activeBuffBalls.length = 0;
        }

        if(activeBombBalls.length > 0 ) {
            for (i = 0; i < activeBombBalls.length; i++) {
                activeBombBalls[i].KillBall();
            }
            activeBombBalls.length = 0;
        }

        // 일반 방해물 순차적으로 삭제해주자,
        if(activeBalls.length > 0) {
            var _targetBall = activeBalls.shift();
            _targetBall.KillBall();
            MG.game.time.events.add(200, ballManager.AllKillBalls, this);
        } else {
            if(stateManager.IsGameSuccess()) {
                actionManager.ActionGameSuccess();
            } else if(stateManager.IsGameFail()) {
                actionManager.ActionGameFail();
            } else {
                console.log("################# ERROR ##########################");
            }
        }
    };

    return _Instance;
}
)();