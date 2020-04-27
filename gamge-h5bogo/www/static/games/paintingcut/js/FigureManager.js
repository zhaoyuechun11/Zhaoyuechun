'use strict';

var _figureManager = _figureManager||{};

_figureManager.Instance = (function () {
    var _Instance = {};

    const MASKANIMATION_SPEED = 30;
    const DRAWLINE_SPEED = 50;
    const STAGE_TEXTURE = "stageTexture";
    const TOPBANNER_TEXTURE = "topBanner";
    const BUTTOMPATTERN_TEXTURE = "patternTexture";
    const SHADOW_OFFSET = 6;
    const SHADOW_ALPHA = 0.35;
    var figureObjectGroup = new Array();
    var default_FigureObjectGroup = new Array();
    var deleteMaskFigure = new Array();
    var shadowRectGroup;
    // var areaBar;
    var targetFigure;
    var bombFigureIndex;
    var line, line_SuperBuff, line90_SuperBuff;
    var cloneLine;
    var maskTexture, nextTexture, nextPatternTexture, shadowTexture, patternTexture, topBannerTexture;
    var mask = null;
    var dir = "none";
    var totalPaintedArea;
    var startClickPos = {x: 0, y: 0};
    var endClickPos = {x: 0, y: 0};
    var totalMaskArea;
    var dragDirection = null;
    var intersectionPoint = new Array();
    var bCancleLineAnimation = false;
    var bFinishAnimation = false;
    var lineDrawTargetScale;
    var animationTargetPoint = 0;
    var nextSeason;
    var justSeason;
    var bEnterInputDown;
    //var checkTouchDisableEvent;
    var inputTimeStamp = 0;
    var one_second_event;

   // var ballBomb;

    _Instance.Ready = function () {
        figureObjectGroup.length = 0;
        default_FigureObjectGroup.length = 0;
        //MG.game.physics.startSystem(Phaser.Physics.ARCADE);
        shadowRectGroup = MG.game.add.group();
        mask = null;
        bEnterInputDown = false;

        _Instance.LoadingSprites();
        SetMask();
        SetDefaultMaskFigure();
        SetDefault_BuffBallsFigure();

        MG.game.world.swap(shadowRectGroup, shadowTexture);
        totalMaskArea = Get_FigureArea(figureObjectGroup[0]);
        // areaBar = new AreaBar(totalMaskArea);
        // areaBar.LoadingSprite();
        totalPaintedArea = 0;
        deleteMaskFigure.length = 0;
    };

    _Instance.Start = function () {
        one_second_event = MG.game.time.events.add(Phaser.Timer.SECOND, OneSecond_Update, this);
        // MG.game.time.events.remove(one_second_event);
    };

    _Instance.FinishAnimation_Boolean = function (b) {
        bFinishAnimation = b;
    };

    _Instance.Shutdown = function()
    {
        bFinishAnimation = false;

        for(var i = 0; i < figureObjectGroup.length; i++)
        {
            figureObjectGroup[i].DeleteWalls();
        }

        for(i = 0; i < default_FigureObjectGroup.length; i++)
        {
            default_FigureObjectGroup[i].DeleteWalls();
        }

        figureObjectGroup.length = 0;
        default_FigureObjectGroup.length = 0;
        totalPaintedArea = 0;
    };

    _Instance.AutoFill = function ()
    {
        // 순차 진행 (칠하는 애니메이션 포함)
        mask.clear();
        figureObjectGroup.visible = false;
    }

    _Instance.OnUpdate = function () {
        for (var i = 0; i < figureObjectGroup.length; i++) {
            figureObjectGroup[i].ColliderListener(ballManager.GetBallSplites());                        // 일반공들과 도형들간의 충돌처리
            MG.game.physics.arcade.collide(ballManager.GetBallSplites(), ballManager.GetBallSplites()); // 공끼리 충돌처리
        }

        for (i = 0; i < default_FigureObjectGroup.length; i++) {
            default_FigureObjectGroup[i].ColliderListener(ballManager.GetBuffItemSplites());      // 버프아이템과 기본 외곽 도형과의 충돌처리
            default_FigureObjectGroup[i].ColliderListener(ballManager.GetBombBallSprites());      // 폭탄과 기본 외곽 도형과의 충돌처리
        }

            // // 라인 그리기 애니메이션
        if(stateManager.IsLineDrawing()) {
            if(isSuperItem) {
                DrawSuperLineUpdate();
            } else {
                DrawLineUpdate();
            }
            BallAndLineColliderListener();
        }
        
        // 취소 라인 애니메이션
        if(bCancleLineAnimation) {
            CancleDrawLine_Update();
        }
        
        // 마스크 영역 지우기 애니메이션
        if(stateManager.IsMaskDrawing()) {
            RemoveMaskAnimation();
        }

        // 종료되었다. 남아 있는 도형을 없애자
        if(bFinishAnimation) {
            FinishDeleteFigureAnimation();
        }
    };

    function OneSecond_Update() {
        //ballManager.BringToTopBuffBalls();
        console.log("-------- OneSecond_Update() ----------");
        Out_Balls_Delete();     // 어느 도형안에도 포함되지 못한 공이 있다면, 삭제

        one_second_event = MG.game.time.events.add(Phaser.Timer.SECOND, OneSecond_Update, this);
    }

    _Instance.LoadingSprites = function () {
        justSeason = stageManager.GetSeason36(uData.nStage);
        nextSeason = stageManager.GetSeason36(uData.nStage + 1);

        // nextTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, STAGE_TEXTURE + nextSeason);
        nextTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'atlas_BG', MG.gameSheetsData['MonthsBackground'][nextSeason].mainBG);
        nextTexture.scale.setTo(MG.game.world.width, MG.game.world.height);
        nextTexture.anchor.setTo(0.5);

        // nextPatternTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, BUTTOMPATTERN_TEXTURE + nextSeason);
        nextPatternTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, 'atlas_bottomBG', MG.gameSheetsData['MonthsBackground'][nextSeason].bottomBG);
        nextPatternTexture.anchor.setTo(0.5, 1);

        shadowTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, "blank");
        shadowTexture.anchor.setTo(0.5, 1);

        //maskTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, STAGE_TEXTURE + justSeason);
        maskTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'atlas_BG', MG.gameSheetsData['MonthsBackground'][justSeason].mainBG);
        maskTexture.scale.setTo(MG.game.world.width, MG.game.world.height);
        maskTexture.anchor.setTo(0.5);
        maskTexture.inputEnabled = true;
        maskTexture.events.onInputDown.add(OnInputDown, this);
        maskTexture.events.onInputUp.add(OnInputUp, this);

        // patternTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, BUTTOMPATTERN_TEXTURE + justSeason);
        patternTexture = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.height, 'atlas_bottomBG', MG.gameSheetsData['MonthsBackground'][justSeason].bottomBG);
        patternTexture.anchor.setTo(0.5, 1);

        // topBannerTexture = MG.game.add.sprite(MG.game.world.centerX, 0, TOPBANNER_TEXTURE + justSeason);
        topBannerTexture = MG.game.add.sprite(MG.game.world.centerX, 0, 'atlas_topBG', MG.gameSheetsData['MonthsBackground'][justSeason].topBG);
        // 예외처리
        if(MG.gameSheetsData['MonthsBackground'][justSeason].topBG == "bg_top_06.png" || MG.gameSheetsData['MonthsBackground'][justSeason].topBG == "bg_top_07.png") {
            topBannerTexture.scale.setTo(1, 0.85);
        } else {
            topBannerTexture.scale.setTo(1);
        }
        topBannerTexture.anchor.setTo(0.5, 0);

        line = MG.game.add.sprite(-1000, -1000, "lineDot");
        line.enableBody = true;
        MG.game.physics.enable(line, Phaser.Physics.ARCADE);
        line.body.immovable = true;
        line.scale.setTo(0, 0);
        line.anchor.setTo(0, 0.5);

        cloneLine = MG.game.add.sprite(-1000, -1000, "lineDot");
        cloneLine.scale.setTo(0, 0);
        cloneLine.anchor.setTo(0, 0.5);

        line_SuperBuff = MG.game.add.sprite(-1000, -1000, "lineDot_SuperBuff");
        line_SuperBuff.enableBody = true;
        MG.game.physics.enable(line_SuperBuff, Phaser.Physics.ARCADE);
        line_SuperBuff.body.immovable = true;
        line_SuperBuff.scale.setTo(0, 0);
        line_SuperBuff.anchor.setTo(0, 0.5);

        line90_SuperBuff = MG.game.add.sprite(-1000, -1000, "lineDot90_SuperBuff");
        line90_SuperBuff.enableBody = true;
        MG.game.physics.enable(line90_SuperBuff, Phaser.Physics.ARCADE);
        line90_SuperBuff.body.immovable = true;
        line90_SuperBuff.scale.setTo(0, 0);
        line90_SuperBuff.anchor.setTo(0, 0.5);
    };

    _Instance.FeverModeSuccess_LoadingSprites = function () {
        var _just = stageManager.GetSeason36(uData.nStage + MG.gameSheetsData["FeverJumpStageCount"]);
        //var _next = stageManager.GetSeason36(uData.nStage + MG.gameSheetsData["FeverJumpStageCount"] + 1);

        nextTexture.loadTexture('atlas_BG', MG.gameSheetsData['MonthsBackground'][_just].mainBG);
        maskTexture.loadTexture('atlas_BG', MG.gameSheetsData['MonthsBackground'][_just].mainBG);
        nextPatternTexture.loadTexture('atlas_bottomBG', MG.gameSheetsData['MonthsBackground'][_just].bottomBG);
        topBannerTexture.loadTexture('atlas_topBG', MG.gameSheetsData['MonthsBackground'][_just].topBG);
        uiManager.SetMonthsText(uData.nStage + MG.gameSheetsData["FeverJumpStageCount"]);

        // 예외처리
        if(MG.gameSheetsData['MonthsBackground'][_just].topBG == "bg_top_06.png" || MG.gameSheetsData['MonthsBackground'][_just].topBG == "bg_top_07.png") {
            topBannerTexture.scale.setTo(1, 0.85);
        } else {
            topBannerTexture.scale.setTo(1);
        }
    };

    function BringToTop_BuffBalls () {
        ballManager.BringToTopBuffBalls();
    }

    function SetMask() {
        mask = MG.game.add.graphics(0, 0);
        mask.beginFill(0x000000);
        maskTexture.mask = mask;
        patternTexture.mask = mask;
    }

    function SetDefaultMaskFigure() {
        var figurePoint = new Array();

        figurePoint.push({x: 0, y: 180});
        figurePoint.push({x: MG.game.world.width, y: 180});
        figurePoint.push({x: MG.game.world.width, y: MG.game.world.height});
        figurePoint.push({x: 0, y: MG.game.world.height});

        var createFigureObject = new FigureObject(figurePoint);
        figureObjectGroup.push(createFigureObject);
        targetFigure = figureObjectGroup[0];
        figureObjectGroup[0].CreateWalls();
        figureObjectGroup[0].SetWalls();
        DrawMask();
    }

    function SetDefault_BuffBallsFigure() {
        var figureDefaultPoint = new Array();

        figureDefaultPoint.push({x: 0, y: 180});
        figureDefaultPoint.push({x: MG.game.world.width, y: 180});
        figureDefaultPoint.push({x: MG.game.world.width, y: MG.game.world.height});
        figureDefaultPoint.push({x: 0, y: MG.game.world.height});

        var createFigureDefaultObject = new FigureObject(figureDefaultPoint);
        default_FigureObjectGroup.push(createFigureDefaultObject);
        default_FigureObjectGroup[0].CreateWalls();
        default_FigureObjectGroup[0].SetWalls();
    }

    _Instance.GetDefault_FigureObjectGroup = function () {
        return default_FigureObjectGroup;
    };

    function SetWalls() {
        for (var i = 0; i < figureObjectGroup.length; i++) {
            figureObjectGroup[i].SetWalls();
        }
    }

    function AllKillWalls()
    {
        for (var i = 0; i < figureObjectGroup.length; i++) {
            figureObjectGroup[i].ReSetWalls();
        }

        for (i = 0; i < default_FigureObjectGroup.length; i++) {
            default_FigureObjectGroup[i].ReSetWalls();
        }
    }

    function DrawMask() {
        for (var i = 0; i < figureObjectGroup.length; i++) {
            figureObjectGroup[i].DrawMask(mask);
        }
    }

    // mask 영역의 그림자를 그린다.
    // deleteMask 할때 같이 업데이트 해준다.
    function CreateShadowRect()
    {
        shadowRectGroup.removeAll();

        for (var i = 0; i < figureObjectGroup.length; i++) {
            var scalePoint = new Phaser.Point;
            scalePoint.x = figureObjectGroup[i].figurePoints[1].x - figureObjectGroup[i].figurePoints[0].x;
            scalePoint.y = figureObjectGroup[i].figurePoints[2].y - figureObjectGroup[i].figurePoints[1].y;

            var centerPoint = new Phaser.Point;
            centerPoint.x = ((figureObjectGroup[i].figurePoints[1].x - figureObjectGroup[i].figurePoints[0].x) * 0.5) + figureObjectGroup[i].figurePoints[0].x;
            centerPoint.y = ((figureObjectGroup[i].figurePoints[2].y - figureObjectGroup[i].figurePoints[1].y) * 0.5) + figureObjectGroup[i].figurePoints[1].y;

            var r = shadowRectGroup.create(centerPoint.x += SHADOW_OFFSET, centerPoint.y += SHADOW_OFFSET, "blackTexture");
            r.scale.setTo(scalePoint.x, scalePoint.y);
            r.anchor.setTo(0.5);
            r.alpha = SHADOW_ALPHA;
        }
    }

    // 다각형의 넓이를 구한다.
    function Get_FigureArea(targetFigure) {
        return Math.round((targetFigure.figurePoints[1].x - targetFigure.figurePoints[0].x) * (targetFigure.figurePoints[2].y - targetFigure.figurePoints[0].y).toFixed(2));
    }

    function OnInputDown() {

        // if(timer <= 0) {
        //     console.log("------------- OnInputDown.assetManager.EndingTimer(); -----------------");
        //     assetManager.EndingTimer();
        //     return;
        // }

        startClickPos = {x: MG.game.input.x, y: MG.game.input.y};
        uiManager.TouchRing_Animation(MG.game.input.x, MG.game.input.y);

        if(parseFloat(MG.game.time.totalElapsedSeconds() - inputTimeStamp) < 0.3) return;
        if (stateManager.onGameTouch() == false) return;

        //MG.game.time.events.remove(checkTouchDisableEvent);
        //checkTouchDisableEvent = MG.game.time.events.add(6000, ENABLE_Touch, this);
        inputTimeStamp = MG.game.time.totalElapsedSeconds();
        bEnterInputDown = true;
        OnInputDown_Event(MG.game.input.x, MG.game.input.y);
    }

    function OnInputUp() {

        // if(currentScene != "game") return;
        if (bEnterInputDown == false || stateManager.onGameTouch() == false) return;

        //MG.game.time.events.remove(checkTouchDisableEvent);
        //checkTouchDisableEvent = MG.game.time.events.add(6000, ENABLE_Touch, this);

        endClickPos = {x: MG.game.input.x, y: MG.game.input.y};
        if(SetTargetFigure(startClickPos) == false && SetTargetFigure(endClickPos) == false) return;

        bEnterInputDown = false;
        OnInputUp_Event(MG.game.input.x, MG.game.input.y);

        // 버프볼을 라인보다 상단에 올려놓자.
        //setTimeout(function() { ballManager.BringToTopBuffBalls(); }, 300);
    }

    function OnInputDown_Event(posX, posY) {
        if(uData.isViewTutorial == false) uiManager.Finger_Flick_End();
        startClickPos = {x: posX, y: posY};
        uiManager.HiddenTouchInputUI();
        SetTargetFigure(startClickPos);
    }

    // function ENABLE_Touch() {
    //     bEnterInputDown = true;
    // }

    _Instance.TouchInputUI = function (dir)
    {
        switch(dir)
        {
            case "right":
                endClickPos = {x: startClickPos.x + 5, y: startClickPos.y};
                break;

            case "left":
                endClickPos = {x: startClickPos.x - 5, y: startClickPos.y};
                break;

            case "up":
                endClickPos = {x: startClickPos.x, y: startClickPos.y - 5};
                break;

            case "down":
                endClickPos = {x: startClickPos.x, y: startClickPos.y + 5};
                break;
        }

        PressInputData();
    };

    function OnInputUp_Event(posX, posY) {
        endClickPos = {x: posX, y: posY};

        if (Math.abs(startClickPos.x - endClickPos.x) > 5 || Math.abs(startClickPos.y - endClickPos.y) > 5)
        {
            stateManager.onLineDrawing();
            PressInputData();
        }
        else
        {

        }

    }

    function PressInputData()
    {
        // 드레그 타입에 따라 라인 시작점과 종료점 판단
        // return true : 좌, 우
        // return false : 상, 하
        if (DragTypeResult()) {
            endClickPos.y = startClickPos.y;

            if (startClickPos.x < endClickPos.x) {
                dragDirection = 'right';
                startClickPos.x = -1;
                endClickPos.x = MG.game.world.width + 1;
            }
            else {
                dragDirection = 'left';
                startClickPos.x = MG.game.world.width + 1;
                endClickPos.x = -1;
            }
        }
        else {
            endClickPos.x = startClickPos.x;

            if (startClickPos.y < endClickPos.y) {
                dragDirection = 'down';
                startClickPos.y = -1;
                endClickPos.y = MG.game.world.height + 1;
            }
            else {
                dragDirection = 'up';
                startClickPos.y = MG.game.world.height + 1;
                endClickPos.y = -1;
            }
        }

        GetIntersectionPoint(startClickPos, endClickPos, targetFigure.figurePoints);
        SetDrawLine(dragDirection);
    }

    /**
     * @return {boolean}
     */
    function SetTargetFigure(pos) {
        // 최초 클릭한 지점의 도형이 작업대상 도형이다.
        for (var i = 0; i < figureObjectGroup.length; i++) {
            if (IsPointInTheFigure(pos, figureObjectGroup[i].figurePoints)) {
                targetFigure = figureObjectGroup[i];
                return true;
            }
        }
        return false;
    }

    /**
     * @return {boolean}
     */
    function DragTypeResult() {
        return Math.abs(endClickPos.x - startClickPos.x) > Math.abs(endClickPos.y - startClickPos.y);
    }

    // 교차점 검출
    function GetIntersectionPoint(startPos, endPos, figurePoint) {
        var i;
        var dragLine = new Phaser.Line(startPos.x, startPos.y, endPos.x, endPos.y);
        var targetLine = null;
        var point;
        intersectionPoint.length = 0;

        for (i = 0; i < figurePoint.length; i++) {
            if (i < figurePoint.length - 1)
                targetLine = new Phaser.Line(figurePoint[i].x, figurePoint[i].y, figurePoint[i + 1].x, figurePoint[i + 1].y);
            else
                targetLine = new Phaser.Line(figurePoint[i].x, figurePoint[i].y, figurePoint[0].x, figurePoint[0].y);

            point = dragLine.intersects(targetLine, true);

            if (point) {
                intersectionPoint.push(point);
            }
        }
    }

    // 도형에 대한 포인트의 위치가 내부인지 외부인지 판단
        // true : 내부에 있다.  false : 외부에 있다.
    /**
     * @return {boolean}
     */
    function IsPointInTheFigure(pos, figurePoint) {
        var i = 0;
        var count = 0;
        var targetLine = null;
        // 임의의 상단, 하단 검사 라인 생성
        var testLine1 = new Phaser.Line(pos.x, pos.y, (MG.game.world.width * 0.5), -5);

        for (i = 0; i < figurePoint.length; i++) {
            if (i < figurePoint.length - 1)
                targetLine = new Phaser.Line(figurePoint[i].x, figurePoint[i].y, figurePoint[i + 1].x, figurePoint[i + 1].y);
            else
                targetLine = new Phaser.Line(figurePoint[i].x, figurePoint[i].y, figurePoint[0].x, figurePoint[0].y);

            var point = testLine1.intersects(targetLine, true);

            if (point) {
                count++;
            }
        }

        return (count % 2) !== 0;
    }

    // 라인이 그려지는 동안 볼과 충돌이 있는지 검사. 총돌이면 FailGame
    // _Instance.OnUpdate() 에서 호출
    function BallAndLineColliderListener()
    {
        if(isSuperItem) {
            ballManager.BallAndLineColliderListener(line_SuperBuff);
            ballManager.BallAndLineColliderListener(line90_SuperBuff);
        } else {
            ballManager.BallAndLineColliderListener(line);
        }
    }

    // 라인과 충돌하였다. 라인 처리
    _Instance.CollisionLineHandler = function (_x, _y) {
        CancleDrawLine();
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_crash');
        if(gHeart > 0) {
            actionManager.Shield_Broken_Animation(_x, _y);
            uiManager.Shield_Broken_UI_Animation();
        } else {
            actionManager.WidthOutCallBack_Animation("oops");
            assetManager.OOPS_Time_Broken();
        }
        NoBallFigureDelete(true);
    };

    // 폭탄 터짐. 폭탄을 포함하고 있는 도형을 확장
    _Instance.BombFigure = function (posX, posY) {
        var pointPos = { x:posX, y:posY };

        for(var i = 0; i < figureObjectGroup.length; i++)
        {
            if (IsPointInTheFigure(pointPos, figureObjectGroup[i].figurePoints))
            {
                bombFigureIndex = i;
                figureObjectGroup[i].Bomb(_Instance.OverlapFigures);
            }
        }
    };

    // 폭탄이 터지고 난 후 겹치는 도형이 있는지 검사
    _Instance.OverlapFigures = function () {
        console.log("******************************************");
        console.log("========= call OverlapFigures() ==========");
        console.log("******************************************");

        for (var i = 0; i < figureObjectGroup.length; i++) {
            if(i === bombFigureIndex) continue;
            if(parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x) > parseInt(figureObjectGroup[i].figurePoints[1].x)) continue;
            if(parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) < parseInt(figureObjectGroup[i].figurePoints[0].x)) continue;
            if(parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) > parseInt(figureObjectGroup[i].figurePoints[3].y)) continue;
            if(parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y) < parseInt(figureObjectGroup[i].figurePoints[0].y)) continue;

            // 도형이 폭탄도형의 안에 완전히 포함 될때...
            if( parseInt(figureObjectGroup[i].figurePoints[0].x) >= parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x) &&
                parseInt(figureObjectGroup[i].figurePoints[1].x) <= parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) &&
                parseInt(figureObjectGroup[i].figurePoints[0].y) >= parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) &&
                parseInt(figureObjectGroup[i].figurePoints[3].y) <= parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y)) {
                // 도형 삭제
                // 삭제 되는 마스크 영역
                console.log("도형이 폭탄도형의 안에 완전히 포함 될때...");
                figureObjectGroup[i].HiddenFigure();
                // figureObjectGroup[i].DeleteWalls();
                // figureObjectGroup.splice(i, 1);
                continue;
            }

            var overlapLeft = false;
            var overlapRight = false;
            var overlapTop = false;
            var overlapDown = false;
            var widthCross = false;
            var heightCross = false;

            // 여기까지 온거면 겹치는 도형이 있는거다.
            // 폭탄도형의 왼쪽으로 겹침
            if( parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x) > parseInt(figureObjectGroup[i].figurePoints[0].x) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x) < parseInt(figureObjectGroup[i].figurePoints[1].x) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) > parseInt(figureObjectGroup[i].figurePoints[1].x) ) {
                console.log("=== 폭탄도형의 왼쪽으로 겹침 === " + i);
                overlapLeft = true;
            }

            // 폭탄도형의 오른쪽으로 겹침
            if( parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) > parseInt(figureObjectGroup[i].figurePoints[0].x) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) < parseInt(figureObjectGroup[i].figurePoints[1].x) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x) < parseInt(figureObjectGroup[i].figurePoints[0].x) ) {
                console.log("=== 폭탄도형의 오른쪽으로 겹침 === " + i);
                overlapRight = true;
            }

            // 폭탄도형의 위쪽으로 겹침
            if( parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) > parseInt(figureObjectGroup[i].figurePoints[0].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) < parseInt(figureObjectGroup[i].figurePoints[3].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y) > parseInt(figureObjectGroup[i].figurePoints[3].y) ) {
                console.log("=== 폭탄도형의 위쪽으로 겹침 === " + i);
                overlapTop = true;
            }

            // 폭탄도형의 아래쪽으로 겹침
            if( parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y) > parseInt(figureObjectGroup[i].figurePoints[0].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y) < parseInt(figureObjectGroup[i].figurePoints[3].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) < parseInt(figureObjectGroup[i].figurePoints[0].y) ) {
                console.log("=== 폭탄도형의 아래쪽으로 겹침 === " + i);
                overlapDown = true;
            }

            // 폭탄도형의 가로지름
            if( parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) > parseInt(figureObjectGroup[i].figurePoints[0].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) < parseInt(figureObjectGroup[i].figurePoints[3].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x) < parseInt(figureObjectGroup[i].figurePoints[0].x) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) > parseInt(figureObjectGroup[i].figurePoints[1].x) ) {
                console.log("=== 폭탄도형의 가로지름 === " + i);
                widthCross = true;
            }

            // 폭탄도형의 세로지름
            if( parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y) < parseInt(figureObjectGroup[i].figurePoints[0].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y) > parseInt(figureObjectGroup[i].figurePoints[3].y) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x) > parseInt(figureObjectGroup[i].figurePoints[0].x) &&
                parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) < parseInt(figureObjectGroup[i].figurePoints[1].x) ) {
                console.log("=== 폭탄도형의 세로지름 === " + i);
                heightCross = true;
            }

            if(overlapLeft && overlapDown) {
                overlapLeft = false;
                overlapDown = false;
                if((parseInt(figureObjectGroup[i].figurePoints[1].x) - parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x)) > (parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y) - parseInt(figureObjectGroup[i].figurePoints[0].y))) {
                    if(parseInt(figureObjectGroup[i].figurePoints[3].y) < parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y)) console.log("$$$$$ error $$$$$ overlapLeft && overlapDown (Y) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[0].y = figureObjectGroup[bombFigureIndex].figurePoints[3].y;
                    figureObjectGroup[i].figurePoints[1].y = figureObjectGroup[bombFigureIndex].figurePoints[3].y;
                    console.log("=== overlapLeft && overlapDown (Y) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[4] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                } else {
                    if(parseInt(figureObjectGroup[i].figurePoints[0].x) > parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x)) console.log("$$$$$ error $$$$$ overlapLeft && overlapDown (X) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[1].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
                    figureObjectGroup[i].figurePoints[2].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
                    console.log("=== overlapLeft && overlapDown (X) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[4] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                }
            }

            if(overlapLeft && overlapTop) {
                overlapLeft = false;
                overlapTop = false;
                if((parseInt(figureObjectGroup[i].figurePoints[1].x) - parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x)) > (parseInt(figureObjectGroup[i].figurePoints[3].y) - parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y))) {
                    if(parseInt(figureObjectGroup[i].figurePoints[0].y) > parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y)) console.log("$$$$$ error $$$$$ overlapLeft && overlapTop (Y) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[2].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
                    figureObjectGroup[i].figurePoints[3].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
                    console.log("=== overlapLeft && overlapTop (Y) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                } else {
                    if(parseInt(figureObjectGroup[i].figurePoints[0].x) > parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x)) console.log("$$$$$ error $$$$$ overlapLeft && overlapTop (X) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[1].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
                    figureObjectGroup[i].figurePoints[2].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
                    console.log("=== overlapLeft && overlapTop (X) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                }
            }

            if(overlapRight && overlapTop) {
                overlapRight = false;
                overlapTop = false;
                if((parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) - parseInt(figureObjectGroup[i].figurePoints[0].x)) > (parseInt(figureObjectGroup[i].figurePoints[3].y) - parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y))) {
                    if(parseInt(figureObjectGroup[i].figurePoints[0].y) > parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y)) console.log("$$$$$ error $$$$$ overlapRight && overlapTop (Y) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[2].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
                    figureObjectGroup[i].figurePoints[3].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
                    console.log("=== overlapRight && overlapTop (Y) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                } else {
                    if(parseInt(figureObjectGroup[i].figurePoints[1].x) < parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x)) console.log("$$$$$ error $$$$$ overlapRight && overlapTop (X) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[0].x = figureObjectGroup[bombFigureIndex].figurePoints[1].x;
                    figureObjectGroup[i].figurePoints[3].x = figureObjectGroup[bombFigureIndex].figurePoints[1].x;
                    console.log("=== overlapRight && overlapTop (X) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                }
            }

            if(overlapRight && overlapDown) {
                overlapRight = false;
                overlapDown = false;
                if((parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x) - parseInt(figureObjectGroup[i].figurePoints[0].x)) > (parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y) - parseInt(figureObjectGroup[i].figurePoints[0].y))) {
                    if(parseInt(figureObjectGroup[i].figurePoints[3].y) < parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y)) console.log("$$$$$ error $$$$$ overlapRight && overlapDown (Y) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[0].y = figureObjectGroup[bombFigureIndex].figurePoints[3].y;
                    figureObjectGroup[i].figurePoints[1].y = figureObjectGroup[bombFigureIndex].figurePoints[3].y;
                    console.log("=== overlapRight && overlapDown (Y) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                } else {
                    if(parseInt(figureObjectGroup[i].figurePoints[1].x) < parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x)) console.log("$$$$$ error $$$$$ overlapRight && overlapDown (X) $$$$$" + i);
                    figureObjectGroup[i].figurePoints[0].x = figureObjectGroup[bombFigureIndex].figurePoints[1].x;
                    figureObjectGroup[i].figurePoints[3].x = figureObjectGroup[bombFigureIndex].figurePoints[1].x;
                    console.log("=== overlapRight && overlapDown (X) === " + i);
                    console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                    console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
                }
            }

            if(overlapLeft) {
                if(parseInt(figureObjectGroup[i].figurePoints[0].x) > parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].x)) console.log("$$$$$ error $$$$$ overlapLeft $$$$$" + i);
                figureObjectGroup[i].figurePoints[1].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
                figureObjectGroup[i].figurePoints[2].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
                console.log("=== overlapLeft === " + i);
                console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
            }

            if(overlapRight) {
                if(parseInt(figureObjectGroup[i].figurePoints[1].x) < parseInt(figureObjectGroup[bombFigureIndex].figurePoints[1].x)) console.log("$$$$$ error $$$$$ overlapRight $$$$$" + i);
                figureObjectGroup[i].figurePoints[0].x = figureObjectGroup[bombFigureIndex].figurePoints[1].x;
                figureObjectGroup[i].figurePoints[3].x = figureObjectGroup[bombFigureIndex].figurePoints[1].x;
                console.log("=== overlapRight === " + i);
                console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
            }

            if(overlapTop) {
                if(parseInt(figureObjectGroup[i].figurePoints[0].y) > parseInt(figureObjectGroup[bombFigureIndex].figurePoints[0].y)) console.log("$$$$$ error $$$$$ overlapTop $$$$$" + i);
                figureObjectGroup[i].figurePoints[2].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
                figureObjectGroup[i].figurePoints[3].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
                console.log("=== overlapTop === " + i);
                console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
            }

            if(overlapDown) {
                if(parseInt(figureObjectGroup[i].figurePoints[3].y) < parseInt(figureObjectGroup[bombFigureIndex].figurePoints[3].y)) console.log("$$$$$ error $$$$$ overlapDown $$$$$" + i);
                figureObjectGroup[i].figurePoints[0].y = figureObjectGroup[bombFigureIndex].figurePoints[3].y;
                figureObjectGroup[i].figurePoints[1].y = figureObjectGroup[bombFigureIndex].figurePoints[3].y;
                console.log("=== overlapDown === " + i);
                console.log("figureObjectGroup["+i+"].figurePoints[0] = " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y);
                console.log("figureObjectGroup["+i+"].figurePoints[1] = " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y);
                console.log("figureObjectGroup["+i+"].figurePoints[2] = " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y);
                console.log("figureObjectGroup["+i+"].figurePoints[3] = " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y);
            }

            if(widthCross) {
                figureObjectGroup[i].figurePoints[1].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
                figureObjectGroup[i].figurePoints[2].x = figureObjectGroup[bombFigureIndex].figurePoints[0].x;
            }

            if(heightCross) {
                figureObjectGroup[i].figurePoints[2].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
                figureObjectGroup[i].figurePoints[3].y = figureObjectGroup[bombFigureIndex].figurePoints[0].y;
            }

        }

        CheckErrorFigure();
        NoBallFigureDelete(false);
        SetWalls();
        ReDrawMaskFigure ();
        _Instance.ReDrawAllFigure();

    };

    function CheckErrorFigure() {
        for(var i = 0; i < figureObjectGroup.length; i++) {
            if(figureObjectGroup[i].figurePoints[0].x > figureObjectGroup[i].figurePoints[1].x)
            {
                figureObjectGroup[i].DeleteWalls();
                figureObjectGroup.splice(i, 1);
                continue;
            }
            if(figureObjectGroup[i].figurePoints[3].x > figureObjectGroup[i].figurePoints[2].x)
            {
                figureObjectGroup[i].DeleteWalls();
                figureObjectGroup.splice(i, 1);
                continue;
            }
            if(figureObjectGroup[i].figurePoints[1].y > figureObjectGroup[i].figurePoints[2].y)
            {
                figureObjectGroup[i].DeleteWalls();
                figureObjectGroup.splice(i, 1);
                continue;
            }
            if(figureObjectGroup[i].figurePoints[0].y > figureObjectGroup[i].figurePoints[3].y)
            {
                figureObjectGroup[i].DeleteWalls();
                figureObjectGroup.splice(i, 1);
                continue;
            }

            if(figureObjectGroup[i].figurePoints[0].x !== figureObjectGroup[i].figurePoints[3].x) {
                console.log("$$$ error[" + i + "]" + "  0.x !== 3.x");
                figureObjectGroup[i].figurePoints[0].x = figureObjectGroup[i].figurePoints[3].x
            }
            if(figureObjectGroup[i].figurePoints[1].x !== figureObjectGroup[i].figurePoints[2].x) {
                console.log("$$$ error[" + i + "]" + "  1.x !== 2.x");
                figureObjectGroup[i].figurePoints[1].x = figureObjectGroup[i].figurePoints[2].x
            }
            if(figureObjectGroup[i].figurePoints[0].y !== figureObjectGroup[i].figurePoints[1].y) {
                console.log("$$$ error[" + i + "]" + "  0.y !== 1.y");
                figureObjectGroup[i].figurePoints[0].y = figureObjectGroup[i].figurePoints[1].y
            }
            if(figureObjectGroup[i].figurePoints[2].y !== figureObjectGroup[i].figurePoints[3].y) {
                console.log("$$$ error[" + i + "]" + "  2.y !== 3.y");
                figureObjectGroup[i].figurePoints[2].y = figureObjectGroup[i].figurePoints[3].y
            }

            console.log("figureObjectGroup["+i+"].figurePoints = " + "( " + figureObjectGroup[i].figurePoints[0].x + ", " + figureObjectGroup[i].figurePoints[0].y + " )   ( " + figureObjectGroup[i].figurePoints[1].x + ", " + figureObjectGroup[i].figurePoints[1].y + " )");
            console.log("figureObjectGroup["+i+"].figurePoints = " + "( " + figureObjectGroup[i].figurePoints[3].x + ", " + figureObjectGroup[i].figurePoints[3].y + " )   ( " + figureObjectGroup[i].figurePoints[2].x + ", " + figureObjectGroup[i].figurePoints[2].y + " )");
            console.log("------------------------------------------------------");
        }
    }

    // 유저 드레그 동작이 유효하게 끝났으면, 마스크 영역을 삭제하기 전 라인을 그려서 보여주자
    function SetDrawLine(dir) {
        if (intersectionPoint.length <= 1) return;

        var startPos, endPos;
        var _line;

        if(isSuperItem) {
            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_line_super');
            if(dir == "up" || dir == "down") {
                _line = line90_SuperBuff;
            } else {
                _line = line_SuperBuff;
            }
        } else {
            _line = line;
            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_line');
        }

        switch (dir) {
            case "right":
                if (intersectionPoint[0].x < intersectionPoint[1].x) {
                    startPos = intersectionPoint[0];
                    endPos = intersectionPoint[1];
                }
                else {
                    startPos = intersectionPoint[1];
                    endPos = intersectionPoint[0];
                }

                _line.anchor.setTo(0, 0.5);
                if(isSuperItem) {
                    _line.scale.setTo(0, 0.5);
                } else {
                    _line.scale.setTo(0, 5);
                }
                _line.position.setTo(startPos.x, startPos.y);

                lineDrawTargetScale = Math.abs(endPos.x - startPos.x);
                break;

            case "left":
                if (intersectionPoint[0].x < intersectionPoint[1].x) {
                    endPos = intersectionPoint[0];
                    startPos = intersectionPoint[1];
                }
                else {
                    endPos = intersectionPoint[1];
                    startPos = intersectionPoint[0];
                }

                _line.anchor.setTo(1, 0.5);
                if(isSuperItem) {
                    _line.scale.setTo(0, 0.5);
                } else {
                    _line.scale.setTo(0, 5);
                }
                _line.position.setTo(startPos.x, startPos.y);
                lineDrawTargetScale = Math.abs(endPos.x - startPos.x);
                break;

            case "up":
                if (intersectionPoint[0].y < intersectionPoint[1].y) {
                    endPos = intersectionPoint[0];
                    startPos = intersectionPoint[1];
                }
                else {
                    endPos = intersectionPoint[1];
                    startPos = intersectionPoint[0];
                }

                _line.anchor.setTo(0.5, 1);
                if(isSuperItem) {
                    _line.scale.setTo(0.5, 0);
                } else {
                    _line.scale.setTo(5, 0);
                }
                _line.position.setTo(startPos.x, startPos.y);
                lineDrawTargetScale = Math.abs(endPos.y - startPos.y);
                break;

            case "down":
                if (intersectionPoint[0].y < intersectionPoint[1].y) {
                    startPos = intersectionPoint[0];
                    endPos = intersectionPoint[1];
                }
                else {
                    startPos = intersectionPoint[1];
                    endPos = intersectionPoint[0];
                }

                _line.anchor.setTo(0.5, 0);
                if(isSuperItem) {
                    _line.scale.setTo(0.5, 0);
                } else {
                    _line.scale.setTo(5, 0);
                }
                _line.position.setTo(startPos.x, startPos.y);
                lineDrawTargetScale = Math.abs(endPos.y - startPos.y);
                break;
        }
    }

    function DrawLineComplete_CallBack() {
        line_SuperBuff.scale.setTo(0);
        line90_SuperBuff.scale.setTo(0);
        line.scale.setTo(0);

        EndDrawLine_CallBack();
    }

    // 선 line 그리기 끝났다, 이제 도형을 삭제하자,
    function EndDrawLine_CallBack() {
        stateManager.offLineDrawing();
        buffItemManager.EndDrawLine_CallBack();
        SplitFigure();
        ReDrawMaskFigure();
    }

    // 방해물이 어느 도형안에도 속해 있지 못하면, 삭제해주자.
    function Out_Balls_Delete() {
        for(var b = 0; b < ballManager.GetActiveBalls().length; b++) {
            var isIn = false;
            var pointPos = { x:ballManager.GetActiveBalls()[b].GetBallBody().position.x, y:ballManager.GetActiveBalls()[b].GetBallBody().position.y };
            for(var f = 0; f < figureObjectGroup.length; f++) {
                if (IsPointInTheFigure(pointPos, figureObjectGroup[f].figurePoints)) {
                    isIn = true;
                }
            }
            if(isIn == false) ballManager.GetActiveBalls()[b].KillBall();
        }
    }

    // 선 그리기 취소 line cancle
    function CancleDrawLine() {
        stateManager.offLineDrawing();
        cloneLine.position.setTo(line.position.x, line.position.y);

        switch (dragDirection) {
            case "right":
            case "left":
                cloneLine.scale.setTo(line.scale.x, 10);
                break;

            case "up":
            case "down":
                cloneLine.scale.setTo(10, line.scale.y);
                break;
        }

        cloneLine.anchor.setTo(line.anchor.x, line.anchor.y);
        MG.game.time.events.add(150, Start_CancleDrawLine_Animation, this);

        line.scale.setTo(0);
        line.position.setTo(-1000, -1000);
    }
    
    function Start_CancleDrawLine_Animation() {
        bCancleLineAnimation = true;
    }

    function CancleDrawLine_Update() {

        switch (dragDirection)
        {
            case "right":
            case "left":
                cloneLine.scale.setTo(cloneLine.scale.x, cloneLine.scale.y - (DRAWLINE_SPEED * 0.008));
                if(cloneLine.scale.y <= 0)
                {
                    cloneLine.scale.setTo(0);
                    cloneLine.position.setTo(-1000, -1000);
                    cloneLine.alpha = 1;
                    bCancleLineAnimation = false;
                }
                break;

            case "up":
            case "down":
                cloneLine.scale.setTo(cloneLine.scale.x - (DRAWLINE_SPEED * 0.008), cloneLine.scale.y);
                if(cloneLine.scale.x <= 0)
                {
                    cloneLine.scale.setTo(0);
                    cloneLine.position.setTo(-1000, -1000);
                    cloneLine.alpha = 1;
                    bCancleLineAnimation = false;
                }
                break;
        }

        cloneLine.alpha -= DRAWLINE_SPEED * 0.001;
        if(cloneLine.alpha < 0) cloneLine.alpha = 0;
    }


    function DrawLineUpdate()
    {
        switch (dragDirection)
        {
            case "right":
            case "left":
                if(line.scale.x >= lineDrawTargetScale) return;

                line.scale.setTo(line.scale.x + DRAWLINE_SPEED, 5);
                if(line.scale.x >= lineDrawTargetScale)
                {
                    line.scale.setTo(lineDrawTargetScale, 5);
                    DrawLineComplete_CallBack();
                }
                break;

            case "up":
            case "down":
                if(line.scale.y >= lineDrawTargetScale) return;

                line.scale.setTo(5, line.scale.y + DRAWLINE_SPEED);
                if(line.scale.y >= lineDrawTargetScale)
                {
                    line.scale.setTo(5, lineDrawTargetScale);
                    DrawLineComplete_CallBack();
                }
                break;
        }
    }

    // Super 슈퍼 모드일때 선을 그린다.
    function DrawSuperLineUpdate()
    {
        switch (dragDirection)
        {
            case "right":
            case "left":
                if(line_SuperBuff.scale.x >= lineDrawTargetScale) return;

                line_SuperBuff.scale.setTo(line_SuperBuff.scale.x + DRAWLINE_SPEED, 1);
                if(line_SuperBuff.scale.x >= lineDrawTargetScale)
                {
                    line_SuperBuff.scale.setTo(lineDrawTargetScale, 1);
                    DrawLineComplete_CallBack();
                }
                break;

            case "up":
            case "down":
                if(line90_SuperBuff.scale.y >= lineDrawTargetScale) return;

                line90_SuperBuff.scale.setTo(1, line90_SuperBuff.scale.y + DRAWLINE_SPEED);
                if(line90_SuperBuff.scale.y >= lineDrawTargetScale)
                {
                    line90_SuperBuff.scale.setTo(1, lineDrawTargetScale);
                    DrawLineComplete_CallBack();
                }
                break;
        }
    }

    function NoBallFigureDelete(isPlayAnimation) {
        //if(deleteMaskFigure.length > 0) return;

        for (var i = 0; i < figureObjectGroup.length; i++) {
            if (IsMuiltPointInTheFigure(ballManager.GetBallSplites(), figureObjectGroup[i].figurePoints) == false) {

                SendJustCompleteAndTotalCompleteRatio(figureObjectGroup[i]);

                // 삭제 대상 영역안에 버프아이템, 있다면 버프아이템 획득처리
                if (IsMuiltPointInTheFigure(ballManager.GetBuffItemSplites(), figureObjectGroup[i].figurePoints) == true) {
                    for(var k = 0; k < ballManager.GetBuffBalls().length; k++)
                    {
                        var pointPos = { x:ballManager.GetBuffBalls()[k].GetBallBody().position.x, y:ballManager.GetBuffBalls()[k].GetBallBody().position.y };

                        if (IsPointInTheFigure(pointPos, figureObjectGroup[i].figurePoints))
                        {
                            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_item_get');
                            ballManager.KillBuffBall(ballManager.GetBuffBalls()[k]);
                        }
                    }
                }

                // 삭제 되는 마스크 영역
                for (var j = 0; j < figureObjectGroup[i].figurePoints.length; j++) {
                    deleteMaskFigure.push(figureObjectGroup[i].figurePoints[j]);
                }
                figureObjectGroup[i].DeleteWalls();
                figureObjectGroup.splice(i, 1);

                if(isPlayAnimation) DeleteMaskAnimation();
            }
        }
    }

    // targetFighre와 새로운 도형 분리
    function SplitFigure() {

        if (intersectionPoint.length < 2) return;

        var i = 0;
        var pos1, pos2;
        var figurePoint = new Array();
        deleteMaskFigure.length = 0;

        if (dragDirection === 'right' || dragDirection === 'left') {
            if (intersectionPoint[0].x < intersectionPoint[1].x) {
                pos1 = intersectionPoint[0];
                pos2 = intersectionPoint[1];
            }
            else {
                pos1 = intersectionPoint[1];
                pos2 = intersectionPoint[0];
            }

            figurePoint.push({x: pos1.x, y: pos1.y});
            figurePoint.push({x: pos2.x, y: pos2.y});
            figurePoint.push({x: targetFigure.figurePoints[2].x, y: targetFigure.figurePoints[2].y});
            figurePoint.push({x: targetFigure.figurePoints[3].x, y: targetFigure.figurePoints[3].y});

            targetFigure.figurePoints[2].x = pos2.x;
            targetFigure.figurePoints[2].y = pos2.y;
            targetFigure.figurePoints[3].x = pos1.x;
            targetFigure.figurePoints[3].y = pos1.y;
        }
        else {
            if (intersectionPoint[0].y < intersectionPoint[1].y) {
                pos1 = intersectionPoint[0];
                pos2 = intersectionPoint[1];
            }
            else {
                pos1 = intersectionPoint[1];
                pos2 = intersectionPoint[0];
            }

            figurePoint.push({x: pos1.x, y: pos1.y});
            figurePoint.push({x: targetFigure.figurePoints[1].x, y: targetFigure.figurePoints[1].y});
            figurePoint.push({x: targetFigure.figurePoints[2].x, y: targetFigure.figurePoints[2].y});
            figurePoint.push({x: pos2.x, y: pos2.y});

            targetFigure.figurePoints[1].x = pos1.x;
            targetFigure.figurePoints[1].y = pos1.y;
            targetFigure.figurePoints[2].x = pos2.x;
            targetFigure.figurePoints[2].y = pos2.y;
        }

        // targetFigure로 선정된 기존 도형안에 방해물, 버프아이템 등이 있는지 검사
        if (IsMuiltPointInTheFigure(ballManager.GetBallSplites(), targetFigure.figurePoints) === false) {

            // 삭제 대상 영역안에 버프아이템, 있다면 버프아이템 획득처리
            if (IsMuiltPointInTheFigure(ballManager.GetBuffItemSplites(), targetFigure.figurePoints) === true) {

                for(i = 0; i < ballManager.GetBuffBalls().length; i++)
                {
                    var pointPos = { x:ballManager.GetBuffBalls()[i].GetBallBody().position.x, y:ballManager.GetBuffBalls()[i].GetBallBody().position.y };

                    if (IsPointInTheFigure(pointPos, targetFigure.figurePoints))
                    {
                        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_item_get');
                        ballManager.CollisionBuffItemHandler(ballManager.GetBuffBalls()[i]);
                    }
                }
            }

            // 도형 삭제
            for (i = 0; i < figureObjectGroup.length; i++) {
                var inx = figureObjectGroup.indexOf(targetFigure);

                if (inx >= 0) {
                    SendJustCompleteAndTotalCompleteRatio(targetFigure);

                    // 삭제 되는 마스크 영역
                    for (var k = 0; k < targetFigure.figurePoints.length; k++) {
                        deleteMaskFigure.push(targetFigure.figurePoints[k]);
                    }
                    figureObjectGroup[inx].DeleteWalls();
                    figureObjectGroup.splice(inx, 1);
                    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_land_get');
                    DeleteMaskAnimation();
                }
            }
        }

        var newFigureObject = new FigureObject(figurePoint);

        // newFigureObject로 새롭게 생성된 도형안에 방해물, 버프아이템 등이 있는지 검사
        if (IsMuiltPointInTheFigure(ballManager.GetBallSplites(), newFigureObject.figurePoints) === false) {

            // 삭제 대상 영역안에 버프아이템, 있다면 버프아이템 획득처리
            if (IsMuiltPointInTheFigure(ballManager.GetBuffItemSplites(), newFigureObject.figurePoints) === true) {

                for(i = 0; i < ballManager.GetBuffBalls().length; i++)
                {
                    var pointPos = { x:ballManager.GetBuffBalls()[i].GetBallBody().position.x, y:ballManager.GetBuffBalls()[i].GetBallBody().position.y };

                    if (IsPointInTheFigure(pointPos, newFigureObject.figurePoints))
                    {
                        ballManager.CollisionBuffItemHandler(ballManager.GetBuffBalls()[i]);
                    }
                }
            }

            SendJustCompleteAndTotalCompleteRatio(newFigureObject);

            // 삭제 되는 마스크 영역
            for (var k = 0; k < newFigureObject.figurePoints.length; k++) {
                deleteMaskFigure.push(newFigureObject.figurePoints[k]);
            }

            DeleteMaskAnimation();
        }
        else {
            figureObjectGroup.push(newFigureObject);
        }

        if(figureObjectGroup.length > 0)
        {
            figureObjectGroup[figureObjectGroup.length - 1].CreateWalls();
            SetWalls();
        }
    }

    _Instance.DeleteAllFigure = function ()
    {
        AllKillWalls();
        //LoopFinishFigureAnimation();
        //FinishDeleteFigureAnimation();
        //NoBallFigureDelete();
        bFinishAnimation = true;
        //figureObjectGroup.length = 0;
        ReDrawMaskFigure();
        DrawMask();
    };

    // Stage 종료, 남은 figure 도형 삭제
    function FinishDeleteFigureAnimation()
    {
        var i, k;
        var allDropCompleteCounter = 0;

        console.log("--- figureObjectGroup.length = " + figureObjectGroup.length);

        for(i = 0; i < figureObjectGroup.length; i++) {
            var _center = GetCenterPosition(figureObjectGroup[i]);
            for(k = 0; k < figureObjectGroup[i].figurePoints.length; k++) {
                figureObjectGroup[i].figurePoints[k].x += (_center.x - figureObjectGroup[i].figurePoints[k].x) * 0.15;
                figureObjectGroup[i].figurePoints[k].y += (_center.y - figureObjectGroup[i].figurePoints[k].y) * 0.15;
            }
            if(Phaser.Math.distance(figureObjectGroup[i].figurePoints[0].x, figureObjectGroup[i].figurePoints[0].y, _center.x, _center.y) <= 2) {
                for(k = 0; k < figureObjectGroup[i].figurePoints.length; k++) {
                    figureObjectGroup[i].figurePoints[k].x = _center.x;
                    figureObjectGroup[i].figurePoints[k].y = _center.y;
                }
                allDropCompleteCounter++;
            }
        }

        mask.clear();

        for(i = 0; i < figureObjectGroup.length; i++)
        {
            for(k = 0; k < figureObjectGroup[i].figurePoints.length; k++)
            {
                mask.moveTo(figureObjectGroup[i].figurePoints[k].x, figureObjectGroup[i].figurePoints[k].y);
                DrawMask();
                CreateShadowRect();
            }
        }

        if(allDropCompleteCounter > 0) {
            shadowRectGroup.removeAll();
            bFinishAnimation = false;

            for(i = 0; i < figureObjectGroup.length; i++) {
                for(k = 0; k < figureObjectGroup[i].figurePoints.length; k++) {
                    figureObjectGroup[i].figurePoints[k].x = -1000;
                    figureObjectGroup[i].figurePoints[k].y = -1000;
                }
            }
        }

        mask.clear();

        for(i = 0; i < figureObjectGroup.length; i++)
        {
            for(k = 0; k < figureObjectGroup[i].figurePoints.length; k++)
            {
                mask.moveTo(figureObjectGroup[i].figurePoints[k].x, figureObjectGroup[i].figurePoints[k].y);
                DrawMask();
            }
        }
    }

    // 지금 지운 도형의 비율 계산
    function SendJustCompleteAndTotalCompleteRatio(targetFigure)
    {
        var justAreaSize = Get_FigureArea(targetFigure);
        var justPainting = justAreaSize / totalMaskArea;
        RewardTime(justPainting);
        totalPaintedArea +=  justPainting;
        uiManager.ViewCompleteAreaRatio(GetCenterPosition(targetFigure), GetWidthHeightLength(targetFigure), justPainting * 100);
        uiManager.CompletePaintingRatio(_Instance.GetTotalPaintedArea());
    }

    function Reset_CompleteFigureArea_Display () {
        var _completeArea = totalMaskArea;

        for(var k = 0; k < figureObjectGroup.length; k++)
        {
            _completeArea -= Get_FigureArea(figureObjectGroup[k]);
        }

        totalPaintedArea = _completeArea / totalMaskArea;
        uiManager.CompletePaintingRatio(_Instance.GetTotalPaintedArea());
    }

    _Instance.GetTotalPaintedArea = function () {
        return (totalPaintedArea * 100).toFixed(1);
    };

    function RewardTime(areaPercent)
    {
        if(areaPercent < 0.01) return;
        reward_timer += (areaPercent * 100) * ONE_PERCENT_ADDTIME;
        reward_timer.toFixed(2);
        if(reward_timer > 1) {
            var addTime = Math.floor(reward_timer);
            reward_timer -= addTime;
            assetManager.AddTime(addTime);
        }
    }

    /**
    * @return {Boolean}
    */
    function IsMuiltPointInTheFigure(points, figure)
    {
        var b = false;

        for (var i = 0; i < points.length; i++)
        {
            var pointPos = {x: points[i].position.x, y: points[i].position.y};
            if (IsPointInTheFigure(pointPos, figure))
            {
                b = true;
                break;
            }
        }

        return b;
    }

    // 마스크 지우기 시작 (OnUpdate() 함수에 예약)
    function DeleteMaskAnimation()
    {
        animationTargetPoint = GetTweenTargetPoint(dragDirection, deleteMaskFigure);
        stateManager.onMaskDrawing();//bMaskAnimation = true;
    }

    // 마스크를 지울때 지워지는 방향값 찾기
    /**
     * @return {Number}
     */
    function GetTweenTargetPoint(dir, targetArray)
    {
        var i = 0;
        var returnValue = 0;

        switch(dragDirection)
        {
            case "right":
                returnValue = 0;
                for(i = 0; i < targetArray.length; i++)
                {
                    if(targetArray[i].x > returnValue) returnValue = targetArray[i].x;
                }
                break;

            case "left":
                returnValue = MG.game.world.width;
                for(i = 0; i < targetArray.length; i++)
                {
                    if(targetArray[i].x < returnValue) returnValue = targetArray[i].x;
                }
                break;

            case "up":
                returnValue = MG.game.world.height;
                for(i = 0; i < targetArray.length; i++)
                {
                    if(targetArray[i].y < returnValue) returnValue = targetArray[i].y;
                }
                break;

            case "down":
                returnValue = 0;
                for(i = 0; i < targetArray.length; i++)
                {
                    if(targetArray[i].y > returnValue) returnValue = targetArray[i].y;
                }
                break;
        }

        return returnValue;
    }

    // 삭제 대상 마스크 도형을 애니메이션 하며, 삭제해준다.
    // _Instance.OnUpdate() 에서 호출
    function RemoveMaskAnimation()
    {
        var i = 0;
        var bCompleteAnimation = true;
        var centerPoint = GetCenterPosition_Array(deleteMaskFigure);

        switch(dragDirection)
        {
            case "right":
                for(i = 0; i < deleteMaskFigure.length; i++)
                {
                    if(deleteMaskFigure[i].x < animationTargetPoint)
                    {
                        deleteMaskFigure[i].x += MASKANIMATION_SPEED;
                        if(deleteMaskFigure[i].x > animationTargetPoint) deleteMaskFigure[i].x = animationTargetPoint;
                        uiManager.HandlePencil(deleteMaskFigure[i].x, centerPoint.y);
                        bCompleteAnimation = false;
                    }
                }
                break;

            case "left":
                for(i = 0; i < deleteMaskFigure.length; i++)
                {
                    if(deleteMaskFigure[i].x > animationTargetPoint)
                    {
                        deleteMaskFigure[i].x -= MASKANIMATION_SPEED;
                        if(deleteMaskFigure[i].x < animationTargetPoint) deleteMaskFigure[i].x = animationTargetPoint;
                        uiManager.HandlePencil(deleteMaskFigure[i].x, centerPoint.y);
                        bCompleteAnimation = false;
                    }
                }
                break;

            case "up":
                for(i = 0; i < deleteMaskFigure.length; i++)
                {
                    if(deleteMaskFigure[i].y > animationTargetPoint)
                    {
                        deleteMaskFigure[i].y -= MASKANIMATION_SPEED;
                        if(deleteMaskFigure[i].y < animationTargetPoint) deleteMaskFigure[i].y = animationTargetPoint;
                        uiManager.HandlePencil(centerPoint.x, deleteMaskFigure[i].y);
                        bCompleteAnimation = false;
                    }
                }
                break;

            case "down":
                for(i = 0; i < deleteMaskFigure.length; i++)
                {
                    if(deleteMaskFigure[i].y < animationTargetPoint)
                    {
                        deleteMaskFigure[i].y += MASKANIMATION_SPEED;
                        if(deleteMaskFigure[i].y > animationTargetPoint) deleteMaskFigure[i].y = animationTargetPoint;
                        uiManager.HandlePencil(centerPoint.x, deleteMaskFigure[i].y);
                        bCompleteAnimation = false;
                    }
                }
                break;
        }

        ReDrawMaskFigure();

        if(bCompleteAnimation)
        {
            deleteMaskFigure.length = 0;
            uiManager.HiddenPencil();
            stateManager.offMaskDrawing();//bMaskAnimation = false;
            globalTouchInput = true;
            NoBallFigureDelete(true);
            _Instance.IsSuccessGame();
        }
    }

    // 새롭게 정렬된 도형배열을 참고하여, 마스킹을 업데이트 한다.
    // 삭제 대상 도형도 삭제 업데이트 한다.
    function ReDrawMaskFigure ()
    {
        if(deleteMaskFigure.length > 0) {
            var i;
            mask.clear();

            // 삭제 영역
            mask.moveTo(deleteMaskFigure[0].x, deleteMaskFigure[0].y);

            for(i = 0; i < deleteMaskFigure.length; i++)
            {
                mask.lineTo(deleteMaskFigure[i].x, deleteMaskFigure[i].y);
            }
        }

        DrawMask();
        CreateShadowRect();
        BringToTop_BuffBalls();
    }

    _Instance.ReDrawAllFigure = function () {
        var i = 0;
        var k = 0;
        mask.clear();

        for(i = 0; i < figureObjectGroup.length; i++)
        {
            for(k = 0; k < figureObjectGroup[i].figurePoints.length; k++)
            {
                mask.moveTo(figureObjectGroup[i].figurePoints[k].x, figureObjectGroup[i].figurePoints[k].y);
                DrawMask();
                CreateShadowRect();
                BringToTop_BuffBalls();
            }
        }

        // DrawMask();
        // CreateShadowRect();
        Reset_CompleteFigureArea_Display();
    };

    function GetCenterPosition(targetFigure) {
        var posX = targetFigure.figurePoints[0].x + ((targetFigure.figurePoints[1].x - targetFigure.figurePoints[0].x) * 0.5);
        var posY = targetFigure.figurePoints[1].y + ((targetFigure.figurePoints[2].y - targetFigure.figurePoints[1].y) * 0.5);

        return {x:posX, y:posY};
    }

    function GetWidthHeightLength(targetFigure) {
        var posX = targetFigure.figurePoints[1].x - targetFigure.figurePoints[0].x;
        var posY = targetFigure.figurePoints[3].y - targetFigure.figurePoints[0].y;

        return {x:posX, y:posY};
    }

    // Y 중심값 구하기, 위의 center 구하기 함수랑 다른건 이건 직접 배열을 넘겨받은거고
        // 위의 GetCenterPosition()은 FigureObject 형으로 넘겨받은 거다.
    function GetCenterPosition_Array(tagetArray)
    {
        var posX = tagetArray[0].x + ((tagetArray[1].x - tagetArray[0].x) * 0.5);
        var posY = tagetArray[1].y + ((tagetArray[2].y - tagetArray[1].y) * 0.5);

        return {x:posX, y:posY};
    }

    _Instance.IsSuccessGame = function()
    {
        var _area = totalPaintedArea.toFixed(3);

        console.log("------- totalPaintedArea = " + _area);
        console.log("------- COMPLETE_AREA = " + COMPLETE_AREA);

        if(_area >= COMPLETE_AREA && stateManager.onGameSuccess()) {
            MG.game.time.events.remove(one_second_event);
            Game.prototype.SuccessGame();
            return true;
        } else {
            return false;
        }
    };

    return _Instance;
}
)();