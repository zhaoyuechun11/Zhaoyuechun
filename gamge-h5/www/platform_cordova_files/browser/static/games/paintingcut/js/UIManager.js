'use strict';

var _uiManager = _uiManager||{};

var monthsOpenWindow;

_uiManager.Instance = (function ()
    {
        var _Instance = {};
        var topTextGroup;
        var paintingAreaText;
        var paintingAreaText_BG;
        var paintingAreaShadowText;
        //var completePaintingArea;
        var monthsText;
        var monthsShadowText;
        var heartText;
        var heartShadowText;
        var completeAreaText;
        var completeAreaShadowText;
        //var heart;
        var titleScene;                       // 초기 타이틀 화면 객체
        var commonTopIcons;
        var userItemWindow;
        var pauseWindow;
        var continueWindow;
        var endSuccessGameWindow;
        var monthsJumpWindow;
        var monthsJumpWindow_Animation;
        //var monthsOpenWindow;
        // var gameOverWindowGroup;
        var tutorialWindow;
        var touchInputUIGroup;
        var commonTopIconsGroup;
        //var windowOption;
        var blackBG;
        var monthsIcon;
        var monthsIcon2;
        var monthsIcon3;
        var heartIcon;
        var heartIcon2;
        var heartIcon3;
        var pauseButton;
        var pencil;
        var justCompleteAreaRatio;
        var completePercent;
        var shield_broken_ui_spine;
        var touch_ring;
        var finger_flick;
        var mission_Option;
        var mission_bg;
        var mission_title;
        var mission_value;

        _Instance.Start = function ()
        {
            //SetupFont();
            //LoadingAtlasData();
            //completePaintingArea = 0;
            //heart = DEFAULT_HEART_COUNT;
            // gameOverWindowGroup = MG.game.add.group();
            touchInputUIGroup = MG.game.add.group();
            commonTopIconsGroup = MG.game.add.group();
            commonTopIconsGroup.position.setTo(0, 0);
            monthsOpenWindow = new UI_MonthsOpen();
            titleScene = new UI_Title();
            commonTopIcons = new UI_TopCommon();
            userItemWindow = new UI_UserItem();
            pauseWindow = new UI_Pause();
            endSuccessGameWindow = new UI_EndSuccessGame();
            monthsJumpWindow = new UI_MonthsJump();
            monthsJumpWindow_Animation = new UI_MonthsJump_Animation();
            tutorialWindow = new UI_Tutorial();
            continueWindow = new UI_Continue();
        };

        _Instance.LoadingAtlasData = function()
        {
            touch_ring = MG.game.add.sprite(-1000, -1000, 'atlas_UI', 'a-01.png');
            touch_ring.scale.setTo(0);
            touch_ring.anchor.setTo(0.5);

            mission_Option = { game: MG.game, packname: "atlas_UI", pngname: "mission_bg.png", x: MG.game.world.centerX, y: 35, w: 250, h: 47, off_l: 15, off_r: 15, off_t: 15, off_b: 15 };
            mission_bg = uiManager.createImg9(mission_Option);
            mission_bg.anchor.setTo(0.5, 0.5);
            mission_bg.alpha = 0.4;
            commonTopIconsGroup.add(mission_bg);
            commonTopIconsGroup.visible = true;
            MG.game.world.bringToTop(commonTopIconsGroup);

            mission_title = MG.game.add.sprite(MG.game.world.centerX - 50, 35, 'atlas_UI', 'mission.png');
            mission_title.scale.setTo(1);
            mission_title.anchor.setTo(0.5);
            //commonTopIconsGroup.add(mission_title);

            mission_value = MG.game.add.bitmapText(MG.game.world.centerX + 65, 12, 'numberFont_mission', '', 80);
            mission_value.anchor.setTo(0.5);
            mission_value.setText("0%");
            //commonTopIconsGroup.add(mission_value);

            if(uData.isViewTutorial == false) {
                finger_flick = MG.game.add.sprite(-1000, -1000, "finger_flick");
                finger_flick.scale.setTo(1);
                finger_flick.anchor.setTo(0.5);
            }

            monthsIcon = MG.game.add.sprite(40, 40, 'atlas_UI', 'month.png');
            monthsIcon.scale.setTo(1);
            monthsIcon.anchor.setTo(0.5, 0.5);
            monthsIcon.inputEnabled = true;         // Debug.. next Stage
            monthsIcon.events.onInputUp.add(function () {
                // if(Define.GOOGLE_SHEETS_DATA === false) return;
                Game.prototype.DebugGotoNextStage(1);
            });

            monthsIcon2 = MG.game.add.sprite(90, 40, 'atlas_UI', 'month.png');
            monthsIcon2.scale.setTo(1);
            monthsIcon2.anchor.setTo(0.5, 0.5);
            monthsIcon2.alpha = 0;
            monthsIcon2.inputEnabled = true;         // Debug.. next Stage
            monthsIcon2.events.onInputUp.add(function () {
                // if(Define.GOOGLE_SHEETS_DATA === false) return;
                Game.prototype.DebugGotoNextStage(10);
            });

            monthsIcon3 = MG.game.add.sprite(140, 40, 'atlas_UI', 'month.png');
            monthsIcon3.scale.setTo(1);
            monthsIcon3.anchor.setTo(0.5, 0.5);
            monthsIcon3.alpha = 0;
            monthsIcon3.inputEnabled = true;         // Debug.. next Stage
            monthsIcon3.events.onInputUp.add(function () {
                // if(Define.GOOGLE_SHEETS_DATA === false) return;
                Game.prototype.DebugGotoNextStage(100);
            });

            shield_broken_ui_spine = MG.game.add.spine(40, 105, 'shield_broken_ui');
            shield_broken_ui_spine.setAnimationByName(0, 'shield_broken_ui_idle', true);
            shield_broken_ui_spine.state.onComplete = function () {};

            shield_broken_ui_spine.scale.setTo(1);

            heartIcon = MG.game.add.sprite(40, 105, 'atlas_UI', 'heart.png');
            heartIcon.anchor.setTo(0.5, 0.5);
            heartIcon.alpha = 0;
            heartIcon.inputEnabled = true;         // Debug..   prev Stage
            heartIcon.events.onInputUp.add(function () {
                // if(Define.GOOGLE_SHEETS_DATA === false) return;
                Game.prototype.DebugGotoBackStage(1);
            });

            heartIcon2 = MG.game.add.sprite(90, 105, 'atlas_UI', 'heart.png');
            heartIcon2.anchor.setTo(0.5, 0.5);
            heartIcon2.alpha = 0;
            heartIcon2.inputEnabled = true;         // Debug..   prev Stage
            heartIcon2.events.onInputUp.add(function () {
                // if(Define.GOOGLE_SHEETS_DATA === false) return;
                Game.prototype.DebugGotoBackStage(10);
            });

            heartIcon3 = MG.game.add.sprite(140, 105, 'atlas_UI', 'heart.png');
            heartIcon3.anchor.setTo(0.5, 0.5);
            heartIcon3.alpha = 0;
            heartIcon3.inputEnabled = true;         // Debug..   prev Stage
            heartIcon3.events.onInputUp.add(function () {
                // if(Define.GOOGLE_SHEETS_DATA === false) return;
                Game.prototype.DebugGotoBackStage(100);
            });

            pauseButton = MG.game.add.sprite(MG.game.world.width - 75, 75, 'atlas_UI', 'btn_pause.png');
            pauseButton.scale.setTo(1);
            pauseButton.anchor.setTo(0.5);
            pauseButton.inputEnabled = true;
            pauseButton.events.onInputDown.add(function () {
                //if(currentScene != 'game') return;
                actionManager.Button_Click_Effect(pauseButton);
                MG.game.time.events.add(300, OnClick_PauseButton, this);
                //// MG.game.paused = true;
                // _Instance.togglePause();
                // pauseWindow.VisibleWindow(true);
            });

            //_Instance.LoadingPencilSprite();
            CreateTouchInputUI();
            // pauseWindow.Create_Pause_Window();
        };

        // Pause (일시정지) 창 실행
        function OnClick_PauseButton() {
            if(stateManager.onPauseWindow()) {
                _Instance.togglePause();
                pauseWindow.VisibleWindow(true);
            }
        }

        _Instance.InputEnabled_PauseButton = function (_b) {
            pauseButton.inputEnabled = _b;
        };

        _Instance.Shield_Broken_UI_Animation = function () {
            shield_broken_ui_spine.setAnimationByName(0, 'shield_broken_ui_out', false);
            shield_broken_ui_spine.state.onComplete = function () {
                shield_broken_ui_spine.setAnimationByName(0, 'shield_broken_ui_idle', true);
            }
        };

        // physic & timer pause... 시간 일시 정지, 제시작
        _Instance.togglePause = function () {
            MG.game.physics.arcade.isPaused = (MG.game.physics.arcade.isPaused) ? false : true;
            if(MG.game.physics.arcade.isPaused) {
                assetManager.PauseTimer();
                if(stateManager.IsStopSkill()) ballManager.StopSkill_Pause();
            }
            else {
                assetManager.ResumeTimer();
                if(stateManager.IsStopSkill()) ballManager.StopSkill_Resume();
            }
        };

        // 이어하기 창 열기
        _Instance.OpenContinueWindow = function () {
            // currentScene = 'continueWindow';
            continueWindow.VisibleWindow(true);
            _Instance.VisibleTopJewelryGroup(true);
            _Instance.togglePause();
        };

        // 게임종료 화면에서 Home을 눌렸다.
        _Instance.OnClick_GotoUserItem = function () {
            pauseWindow.OnClick_GotoHomeButton_Start();
        };

        _Instance.VisibleTopJewelryGroup = function (b) {
            commonTopIcons.Using_View_Jewelry_Part(b);
        };

        _Instance.LoadingPencilSprite = function ()
        {
            // var seasonStage = seasonCount + 1;
            // if(seasonStage > 10) seasonStage = 1;
            // var pencilSpriteName = "pencil_" + stageManager.GetSeason(uData.nStage) + ".png";
            var pencilSpriteName = MG.gameSheetsData['MonthsBackground'][stageManager.GetSeason36(uData.nStage)].pencil;
            pencil = MG.game.add.sprite(-100, -100, 'atlas_pencil', pencilSpriteName);
            pencil.scale.setTo(1);
            pencil.anchor.setTo(0, 1);
        };

        _Instance.SetPaintingAreaText = function (scoreCount)
        {
            //console.log("Instance.SetPaintingAreaText");
            paintingAreaText.setText(scoreCount.toString());
            paintingAreaShadowText.setText(paintingAreaText.text.toString());
            //paintingAreaShadowText.updateText();
        };

        _Instance.SetMissionValueText = function (_target) {
            mission_value.setText(_target);
        };

        _Instance.SetMonthsText = function(monthsCount)
        {
            var txt = monthsCount;
            monthsText.setText(txt.toString());
            monthsShadowText.setText(txt.toString());
        };

        _Instance.SetHeartText = function(heartCount)
        {
            //var txt = heartCount;
            heartText.setText(heartCount.toString());
            heartShadowText.setText(heartCount.toString());
        };

        _Instance.SetJewelryCount = function(heartCount) {
            commonTopIcons.SetJewelryCount();
        };

        _Instance.SetupFont = function ()
        {
            topTextGroup = MG.game.add.group();

            paintingAreaShadowText = MG.game.add.bitmapText(MG.game.world.centerX + 3, 108, 'uiFontBlack','Bitmap Fonts!',52);
            paintingAreaShadowText.anchor.setTo(0.5);
            paintingAreaShadowText.alpha = 0.5;
            paintingAreaShadowText.setText("0%");
            topTextGroup.add(paintingAreaShadowText);

            paintingAreaText = MG.game.add.bitmapText(MG.game.world.centerX, 105, 'uiFont','Bitmap Fonts!', 52);
            paintingAreaText.anchor.setTo(0.5);
            paintingAreaText.setText("0%");
            topTextGroup.add(paintingAreaText);

            monthsShadowText = MG.game.add.bitmapText(82, 42, 'uiFontBlack','Bitmap Fonts!',40);
            monthsShadowText.anchor.setTo(0, 0.5);
            monthsShadowText.alpha = 0.6;
            monthsShadowText.setText(uData.nStage.toString());
            topTextGroup.add(monthsShadowText);

            monthsText = MG.game.add.bitmapText(80, 40, 'uiFont','Bitmap Fonts!',40);
            monthsText.anchor.setTo(0, 0.5);
            monthsText.setText(uData.nStage.toString());
            topTextGroup.add(monthsText);

            heartShadowText = MG.game.add.bitmapText(82, 105, 'uiFontBlack','Bitmap Fonts!',40);
            heartShadowText.anchor.setTo(0, 0.5);
            heartShadowText.alpha = 0.6;
            heartShadowText.setText(gHeart);
            topTextGroup.add(heartShadowText);

            heartText = MG.game.add.bitmapText(80, 103, 'uiFont','Bitmap Fonts!',40);
            heartText.anchor.setTo(0, 0.5);
            heartText.setText(gHeart);
            topTextGroup.add(heartText);

            completeAreaShadowText = MG.game.add.bitmapText(-100, -100, 'uiFontBlack','Bitmap Fonts!',40);
            completeAreaShadowText.anchor.setTo(0.5);
            completeAreaShadowText.setText("0%");

            completeAreaText = MG.game.add.bitmapText(-100, -100, 'uiFont','Bitmap Fonts!',40);
            completeAreaText.anchor.setTo(0.5);
            completeAreaText.setText("0%");


            ////////////////////////////////////////////////////////////////////
            // Debug : Key Information
            // this.timerStyle = { font: "11px Arial", fill: "#e07860", align: "left", fontWeight: "bold" };
            // this.timerText = MG.game.add.text(130, 120, '달력아이콘: 다음스테이지 이동\n실드아이콘: 이전스테이지 이동\n장착아이템 화면의 쥬얼리 아이콘 : 쥬얼리 +100', this.timerStyle);
            // this.timerText.anchor.setTo(0, 0.5);
            ////////////////////////////////////////////////////////////////////


            MG.game.world.bringToTop(topTextGroup);
        };

        // iOS 싸파리 대응용 투 터치 인터페이스
        function CreateTouchInputUI()
        {
            var centerPoint = MG.game.add.sprite(0, 0, 'atlas_UI', 'a-01.png');
            centerPoint.scale.setTo(0.7);
            centerPoint.anchor.setTo(0.5, 0.5);
            touchInputUIGroup.add(centerPoint);

            var rightArrow = MG.game.add.sprite(75, 0, 'atlas_UI', 'a-00.png');
            rightArrow.scale.setTo(0.7);
            rightArrow.anchor.setTo(0.5, 0.5);
            rightArrow.angle = 90;
            rightArrow.inputEnabled = true;
            rightArrow.events.onInputUp.add(OnClick_RightArrow);
            touchInputUIGroup.add(rightArrow);

            var leftArrow = MG.game.add.sprite(-75, 0, 'atlas_UI', 'a-00.png');
            leftArrow.scale.setTo(0.7);
            leftArrow.anchor.setTo(0.5, 0.5);
            leftArrow.angle = 270;
            leftArrow.inputEnabled = true;
            leftArrow.events.onInputUp.add(OnClick_LeftArrow);
            touchInputUIGroup.add(leftArrow);

            var upArrow = MG.game.add.sprite(0, -75, 'atlas_UI', 'a-00.png');
            upArrow.scale.setTo(0.7);
            upArrow.anchor.setTo(0.5, 0.5);
            upArrow.inputEnabled = true;
            upArrow.events.onInputUp.add(OnClick_UpArrow);
            touchInputUIGroup.add(upArrow);

            var downArrow = MG.game.add.sprite(0, 75, 'atlas_UI', 'a-00.png');
            downArrow.scale.setTo(0.7);
            downArrow.anchor.setTo(0.5, 0.5);
            downArrow.angle = 180;
            downArrow.inputEnabled = true;
            downArrow.events.onInputUp.add(OnClick_DownArrow);
            touchInputUIGroup.add(downArrow);

            touchInputUIGroup.position.setTo(-500, -500);
            MG.game.world.bringToTop(touchInputUIGroup);
        }

        function OnClick_RightArrow ()
        {
            _Instance.HiddenTouchInputUI();
            figureManager.TouchInputUI("right");
        }

        function OnClick_LeftArrow ()
        {
            _Instance.HiddenTouchInputUI();
            figureManager.TouchInputUI("left");
        }

        function OnClick_UpArrow ()
        {
            _Instance.HiddenTouchInputUI();
            figureManager.TouchInputUI("up");
        }

        function OnClick_DownArrow ()
        {
            _Instance.HiddenTouchInputUI();
            figureManager.TouchInputUI("down");
        }

        // 터치를 했다. 투터치 4방향 화살표 인터페이스를 보여주자
        _Instance.SetTouchInputUI = function (posX, posY)
        {
            touchInputUIGroup.visible = true;
            touchInputUIGroup.position.setTo(posX, posY);
            MG.game.world.bringToTop(touchInputUIGroup);
            MG.game.time.events.add(3000, _Instance.HiddenTouchInputUI, this);
        };

        _Instance.HiddenTouchInputUI = function()
        {
            touchInputUIGroup.position.setTo(-1000, -1000);
            touchInputUIGroup.visible = false;
        };

        ///////////////////////////////////
        // 게임 시작하고 처음 나오는 창
        ///////////////////////////////////
        _Instance.Create_StartWindow = function ()
        {
            if(playCount > 0 )
            {
                //Game.prototype.StartGame();
                this.OnClickEvent_StartButton();
                return;
            }

            titleScene.VisibleWindow(true);
        };

        // 스타트 버튼을 눌렀다. 장착 아이템 윈도우를 먼저 보여주자.
        _Instance.OnClickEvent_StartButton = function () {
            if(isPlaying) return;
            currentScene = 'userItem';
            userItemWindow.VisibleWindow(true);
            commonTopIcons.VisibleWindow(true);
        };

        // 유저 아이템 선택 창에서 Months 점프 창을 호출 한다.
        _Instance.OnClickEvent_JumpButton = function () {
            monthsJumpWindow.VisibleWindow(true);
            _Instance.VisibleTopJewelryGroup(true);
            // commonTopIcons.BringToTop_Jewelry();
        };

        // Months Open 스테이지이다,
        _Instance.OpenMonthsOpenWindow = function () {
            stageManager.SetIsOpenJumpMonthsWindow(false);
            // currentScene = "viewMonthsOpen";
            // monthsOpenWindow.Set_JumpMonths_Text();
            stateManager.onUIMessage();
            monthsOpenWindow.VisibleWindow(true);
            MG.game.time.events.add(2000, _Instance.CloseMonthsOpenWindow, this);
        };

        _Instance.CloseMonthsOpenWindow = function () {
            // currentScene = "game";
            stateManager.offUIMessage();
            _Instance.VisibleTopJewelryGroup(false);
            monthsOpenWindow.VisibleWindow(false);
            Game.prototype.StartGame_ReadyGoAnimation();
        };

        // Months Jump 창에서 플레이를 클릭했다.
        _Instance.OnClickEvent_PlayButton = function () {
            userItemWindow.OnClickEvent_PlayButton_Start();
        };

        // Jump 애니메이션을 보여주고, 게임 시작하자.
        _Instance.OnClickEvent_JumpAnimationButton = function () {
            ballManager.VisibleBalls(false);
            monthsJumpWindow.VisibleWindow(false);
            commonTopIcons.VisibleWindow(false);
            userItemWindow.VisibleWindow(false);
            monthsJumpWindow_Animation.JumpAnimation_Ready();
        };

        // 장착 아이템이 끝났다. 진짜 게임 시작
        _Instance.PlayGame = function () {
            playCount++;
            commonTopIcons.VisibleWindow(false);
            Game.prototype.StartGame();
        };

        _Instance.ViewTutorial = function () {
            tutorialWindow.VisibleWindow(true);
        };

        // pause 창에서 튜토리얼 닫기 버튼을 눌렀는지 검사
        _Instance.isClickCloseEvent = function (event) {
            tutorialWindow.isClickCloseEvent(event);
        };

        _Instance.isOpenTutoriallWindow = function () {
            return tutorialWindow.isVisibleWindow();
        };

        // 사운드 옵션
        _Instance.OnClick_SoundButton = function () {
        };

        // DEBUG../////////////////////
        function OnClick_StageReset()
        {
            uData.nStage = 1;
            StorageManager.prototype.set('nStage', uData.nStage);
        }


        ///////////////////////////////////
        // 게임 종료 창
        ///////////////////////////////////
        _Instance.Create_GameOverWindow = function ()
        {
            endSuccessGameWindow.VisibleWindow(true);
            endSuccessGameWindow.Result_Action_State();
        };
        // RePlay Button을 눌렀다. 게임을 다시 시작하자.
        _Instance.OnClick_ReplayButton = function() {
            gHeart = DEFAULT_HEART_COUNT;
            //playCount = -1;
            isStart1stage = true;console.log("=========== OnClick_ReplayButton.ReStartGame ============");
            Game.prototype.ReStartGame();
        };
        // Home Button을 눌렀다. 초기 화면으로 돌아가자.
        _Instance.OnClick_GotoHomeButton = function() {
            Game.prototype.GotoHomeScene();
        };

        _Instance.ViewCompleteAreaRatio = function(centerPos, length, ratio)
        {
            if(ratio <= 0) ratio = 1;
            justCompleteAreaRatio = ratio;
            completeAreaShadowText.scale.x = 0;
            completeAreaShadowText.scale.y = 0;
            completeAreaShadowText.alpha = 0.6;
            completeAreaText.scale.x = 0;
            completeAreaText.scale.y = 0;
            completeAreaText.alpha = 1;

            var newXY = 0;
            length.x >= length.y ? newXY = length.y : newXY = length.x;
            newXY *= 0.01;
            // console.log("--- newXY = " + newXY);
            // var newXY = justCompleteAreaRatio * 0.3;

            // 지금 완료한 % 가장자리 짤리지 않도록
            if(centerPos.x < 200) {
                completeAreaShadowText.anchor.setTo(0, 0.5);
                completeAreaText.anchor.setTo(0, 0.5);
                centerPos.x = 20;
            } else if(centerPos.x > MG.game.world.width - 200) {
                completeAreaShadowText.anchor.setTo(1, 0.5);
                completeAreaText.anchor.setTo(1, 0.5);
                centerPos.x = MG.game.world.width - 20;
            } else {
                completeAreaShadowText.anchor.setTo(0.5, 0.5);
                completeAreaText.anchor.setTo(0.5, 0.5);
            }
            if(newXY < 0.5) newXY = 0.5;
            if(newXY > 2.2) newXY = 2.2;

            var completeArea = justCompleteAreaRatio.toFixed(1);
            var displayRatio = completeArea.toString() + "%";

            console.log("completeArea = " + completeArea);

            // // 피버모드 관리자에게 라인 성공 통지
            // feverManager.SuccessFever(completeArea);

            completeAreaShadowText.setText(displayRatio);
            completeAreaShadowText.position.setTo(centerPos.x + 2, centerPos.y + 2);

            completeAreaText.setText(displayRatio);
            completeAreaText.position.setTo(centerPos.x, centerPos.y);

            MG.game.add.tween(completeAreaShadowText.scale).to({
                x: newXY,
                y: newXY
            }, 300, Phaser.Easing.Linear.None, true);//.onComplete.add(ScaleUpComplete, this);

            MG.game.add.tween(completeAreaShadowText).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, true, 500);

            MG.game.add.tween(completeAreaText.scale).to({
                x: newXY,
                y: newXY
            }, 300, Phaser.Easing.Linear.None, true);//.onComplete.add(ScaleUpComplete, this);

            MG.game.add.tween(completeAreaText).to({
                alpha: 0
            }, 100, Phaser.Easing.Linear.None, true, 500);
        };

        // 완료 % Text
        _Instance.CompletePaintingRatio = function(totalComplete)
        {
            completePercent = totalComplete;
            ballManager.SplitBallSkill(completePercent);
            var txt = totalComplete.toString() + "%";
            paintingAreaText.setText(txt);
            paintingAreaShadowText.setText(txt);
            Zoom_Effect_CompletePainting_Text();
        };

        function Zoom_Effect_CompletePainting_Text() {
            MG.game.add.tween(paintingAreaText.scale).to({ x: 1.2, y: 1.2 }, 200, Phaser.Easing.Quadratic.Out, true);
            MG.game.add.tween(paintingAreaText.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Quadratic.Out, true, 200);
            MG.game.add.tween(paintingAreaShadowText.scale).to({ x: 1.2, y: 1.2 }, 200, Phaser.Easing.Quadratic.Out, true);
            MG.game.add.tween(paintingAreaShadowText.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Quadratic.Out, true, 200);
        }

        _Instance.GetCompletePercent = function() {
            return completePercent;
        };

        _Instance.HandlePencil = function (posX, posY)
        {
            var maxSize = justCompleteAreaRatio;

            if(justCompleteAreaRatio > 12)
                maxSize = 12;
            else if(justCompleteAreaRatio < 3)
                maxSize = 3;

            MG.game.world.bringToTop(pencil);
            pencil.position.x = posX;
            pencil.position.y = posY;

            pencil.scale.setTo(maxSize * 0.1);
        };

        _Instance.HiddenPencil = function ()
        {
            MG.game.time.events.add(150, DelayAction_HiddenPencil, this);
        };

        function DelayAction_HiddenPencil()
        {
            pencil.position.setTo(-100, -100);
        }

        _Instance.TouchRing_Animation = function (_x, _y) {
            touch_ring.position.setTo(_x, _y);
            touch_ring.alpha = 1;
            MG.game.add.tween(touch_ring.scale).to({ x: 6, y: 6 }, 350, Phaser.Easing.Linear.None, true).onComplete.add( function () {
                touch_ring.scale.setTo(0);
            } );
            MG.game.add.tween(touch_ring).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 100);
        };

        _Instance.Finger_Flick = function () {
            finger_flick.position.setTo(MG.game.world.centerX - 100, MG.game.world.centerY);
            MG.game.add.tween(finger_flick).to({ x:MG.game.world.centerX + 100, y:MG.game.world.centerY }, 1000, Phaser.Easing.Linear.None, true, 500).loop(true);
        };

        _Instance.Finger_Flick_End = function () {
            uData.isViewTutorial = true;
            StorageManager.prototype.set('isViewTutorial', uData.isViewTutorial);
            finger_flick.scale.setTo(0);
            finger_flick.position.setTo(-1000, -1000);
        };

        ////////////////////////////////////////////////////////////////////////////
        //option = { game, packname, pngname, x,y, w, h, off_l, off_r, off_t, off_b}
        _Instance.createImg9 = function (option) {
            if(option.packname == undefined){//싱글이미지경우
                option.packname = option.pngname;
                option.pngname = undefined;
            }
            var ui9b = new PhaserNineSlice.NineSlice(
                option.game,                 //Phaser.Game
                option.x,                      //x
                option.y,                      //y
                option.packname,                  //atlas key //pack이름
                option.pngname,      //Image frame //png이름,
                option.w,                    //width
                option.h,                    //height
                {top: option.off_t, bottom: option.off_b, left: option.off_l, right: option.off_r}
            );
            ui9b.anchor.setTo(0.5, 0.5);
            //ui9b.resize(400,300);
            //ui9b.scale.setTo(0.5,0.5);
            return ui9b;
        };

        //option = {name:"", packname:"", pngname:"", x:0, y:0, anchorx:0.5, anchory:0.5}
        function createSpriteImg(option) {
            var Obj;
            if(option.packname==undefined)//싱글이미지경우
                Obj = MG.game.make.sprite(option.x, option.y, option.pngname);
            else
                Obj = MG.game.make.sprite(option.x, option.y, option.packname, option.pngname);

            Obj.name = option.name;
            Obj.anchor.setTo(option.anchorx, option.anchory);
            return Obj;
        }

        function createImgOnly(option) {
            var Obj;
            if(option.packname===undefined)//싱글이미지경우
                Obj = MG.game.make.image(option.x, option.y, option.pngname);
            else
                Obj = MG.game.make.image(option.x, option.y, option.packname, option.pngname);

            Obj.name = option.name;
            Obj.anchor.setTo(option.anchorx, option.anchory);
            return Obj;
        }


        return _Instance;
    }
)();