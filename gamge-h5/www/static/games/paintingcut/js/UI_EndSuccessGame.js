
function UI_EndSuccessGame() {
    this.gameOverWindowGroup = MG.game.add.group();
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.months_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY + 20, 'months_animation');
    this.completeMonthsCounter = 1;
    this.myScoreText;
    this.myScoreText2;
    this.SpineNode_nowScore;
    this.action_iter = 0;
    this.rewardCounter = 0;
    this.bestMonths_counter_event;
    this.reward_counter_event;

    this.Start_EndSuccessGameWindow();
    this.VisibleWindow(false);
}

UI_EndSuccessGame.prototype.Start_EndSuccessGameWindow = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.gameOverWindowGroup.add(this.blackWall);

    this.panelOption = { game:MG.game, packname:"atlas_UI", pngname:"panel.png", x:MG.game.world.centerX, y:MG.game.world.centerY, w:606, h:839, off_l:27, off_r:27, off_t:27, off_b:27 };
    this.panelBG = uiManager.createImg9(this.panelOption);
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0.5);
    this.gameOverWindowGroup.add(this.panelBG);

    this.titleText = MG.game.add.bitmapText(MG.game.world.centerX, 260, 'uiFont','Bitmap Fonts!',50);
    this.titleText.anchor.setTo(0.5, 0);
    this.titleText.setText("GAME OVER");
    // this.titleText.tint = '#f47e8e';
    this.titleText.tint = 0xf47e8e;
    this.titleText.align = 'center';
    this.gameOverWindowGroup.add(this.titleText);

    this.line = MG.game.add.sprite(MG.game.world.centerX, 340, 'atlas_UI', 'line_width.png');
    this.line.scale.setTo(53, 1);
    this.line.alpha = 0.5;
    this.line.anchor.setTo(0.5, 0.5);
    this.gameOverWindowGroup.add(this.line);

    this.rewardTitleText = MG.game.add.bitmapText(MG.game.world.centerX, 380, 'uiFont','Bitmap Fonts!',26);
    this.rewardTitleText.anchor.setTo(0.5, 0.5);
    this.rewardTitleText.setText("REWARD");
    this.rewardTitleText.tint = 0x1fbb99;
    this.rewardTitleText.align = 'center';
    this.gameOverWindowGroup.add(this.rewardTitleText);

    this.jewelIcon = MG.game.add.sprite(MG.game.world.centerX - 95, this.rewardTitleText.position.y + 45, 'atlas_UI', 'jewel.png');
    this.jewelIcon.scale.setTo(0.6, 0.6);
    this.jewelIcon.anchor.setTo(0.5, 0.5);
    this.gameOverWindowGroup.add(this.jewelIcon);

    this.rewardScoreText = MG.game.add.bitmapText(MG.game.world.centerX + 15, this.rewardTitleText.position.y + 45, 'uiFontBlack','Bitmap Fonts!',40);
    this.rewardScoreText.anchor.setTo(0.5, 0.5);
    this.rewardScoreText.setText('0');
    this.rewardScoreText.alpha = 0.6;
    // this.rewardScoreText.tint = 0x575757;
    this.rewardScoreText.align = 'center';
    this.gameOverWindowGroup.add(this.rewardScoreText);

    this.Create_Months_Box();

    this.line2 = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY + 245, 'atlas_UI', 'line_width.png');
    this.line2.scale.setTo(53, 1);
    this.line2.alpha = 0.5;
    this.line2.anchor.setTo(0.5, 0.5);
    this.gameOverWindowGroup.add(this.line2);

    this.rePlayButton = MG.game.add.sprite(-1000, -1000, 'atlas_UI', 'btn_over_replay.png');
    this.rePlayButton.scale.setTo(0);
    this.rePlayButton.anchor.setTo(0.5, 0.5);
    this.rePlayButton.inputEnabled = true;
    this.rePlayButton.events.onInputUp.add( function () {this.OnClick_ReplayButton()}.bind(this) );
    this.gameOverWindowGroup.add(this.rePlayButton);

    this.gotoHomeButton = MG.game.add.sprite(-1000, -1000, 'atlas_UI', 'btn_pause_home.png');
    this.gotoHomeButton.scale.setTo(0);
    this.gotoHomeButton.anchor.setTo(0.5, 0.5);
    this.gotoHomeButton.inputEnabled = true;
    this.gotoHomeButton.events.onInputUp.add( function () {this.OnClick_GotoHomeButton()}.bind(this) );
    this.gameOverWindowGroup.add(this.gotoHomeButton);


    // this.gameOverWindowGroup.add(this.myScoreText_last);
};

UI_EndSuccessGame.prototype.VisibleWindow = function (b) {
    if (b){
        // ---------------- 这里是结束的地方 ---------------- //
        //uData.nStage
        if ( window.parent != null ) {
            window.parent.postMessage({
              cmd: "GameOver",
              msg: {
                score: uData.nStage, // 如果是星星数，也是这个分数
                //level: uData.nStage
              }
            }, "*");
          }
        return;
    }
    this.gameOverWindowGroup.visible = b;

    if(b)
    {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');

        if(isHighest_record) {
            this.bestScoreText.setText(oldBest_months);
        } else {
            this.bestScoreText.setText(uData.nBestScore);
        }
        if(isHighest_record) {
            this.bestScoreText2.setText(oldBest_months);
        } else {
            this.bestScoreText2.setText(uData.nBestScore);
        }
        MG.game.world.bringToTop(this.gameOverWindowGroup);
    }
};

UI_EndSuccessGame.prototype.Result_Action_State = function () {
    switch ( this.action_iter++ ) {
        case 0:                         // Months Animation
            console.log("--- 1. Months Animation ---");
            this.StartMonths_Animation();
            break;

        case 1:                         // New Record
            console.log("--- 2. New Record --- " + isHighest_record);
            if(isHighest_record) {
                this.Play_New_RecordIcon();
            } else {
                this.Result_Action_State();
            }
            break;

        case 2:                         // Best Months Counter
            console.log("--- 3. Best Months Counter --- " + isHighest_record);
            if(isHighest_record) {
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_increase', true);
               this.bestMonths_counter_event = MG.game.time.events.repeat(Phaser.Timer.SECOND * 0.05, parseInt(uData.nBestScore - oldBest_months), this.AddCount_BestMonts_Text, this);
            } else {
                this.Result_Action_State();
            }
            break;

        case 3:                         // Reward Counter
            console.log("--- 4. Reward Counter ---");
            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_increase', true);
            this.reward_counter_event = MG.game.time.events.repeat(Phaser.Timer.SECOND * 0.01, assetManager.GetRewardJewelry("nStage"), this.AddCount_Reward_Text, this);
            break;

        case 4:                         // Show Button
            console.log("--- 5. Show Button ---");
            this.Play_Buttons();
            break;
    }
};

UI_EndSuccessGame.prototype.Create_Months_Box = function () {
    // "BEST MONTHS"
    this.bestScoreTitleText = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',26);
    this.bestScoreTitleText.anchor.setTo(0.5, 0.5);
    this.bestScoreTitleText.setText("BEST LEVEL");
    this.bestScoreTitleText.tint = 0xf47e8e;
    this.bestScoreTitleText.align = 'center';
    this.bestScoreTitleText2 = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',26);
    this.bestScoreTitleText2.anchor.setTo(0.5, 0.5);
    this.bestScoreTitleText2.setText("BEST LEVEL");
    this.bestScoreTitleText2.tint = 0xf47e8e;
    this.bestScoreTitleText2.align = 'center';
    this.gameOverWindowGroup.add(this.bestScoreTitleText);
    this.gameOverWindowGroup.add(this.bestScoreTitleText2);
    // spine
    this.SpineNode_BestMonths = this.FindSpineNode(this.months_spine, "text_best_months_1");
    this.SpineNode_BestMonths.addChild(this.bestScoreTitleText);        //타이틀 붙이기
    this.SpineNode_BestMonths2 = this.FindSpineNode(this.months_spine, "text_best_months_2");
    this.SpineNode_BestMonths2.addChild(this.bestScoreTitleText2);        //타이틀 붙이기
    // "MONTHS"
    this.scoreTitleText = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',40);
    this.scoreTitleText.anchor.setTo(0.5, 0.5);
    this.scoreTitleText.setText("LEVEL");
    this.scoreTitleText.align = 'center';
    this.gameOverWindowGroup.add(this.scoreTitleText);
    this.scoreTitleText2 = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',40);
    this.scoreTitleText2.anchor.setTo(0.5, 0.5);
    this.scoreTitleText2.setText("LEVEL");
    this.scoreTitleText2.align = 'center';
    this.gameOverWindowGroup.add(this.scoreTitleText2);
    // spine
    this.SpineNode_Months = this.FindSpineNode(this.months_spine, "text_months_1");
    this.SpineNode_Months.addChild(this.scoreTitleText);     //'MONTHS' 붙이기
    this.SpineNode_Months2 = this.FindSpineNode(this.months_spine, "text_months_2");
    this.SpineNode_Months2.addChild(this.scoreTitleText2);     //'MONTHS' 붙이기
    // 최고점수 표시
    this.bestScoreText = MG.game.add.bitmapText(0, 0, 'numberFont_Pink','Bitmap Fonts!',40);
    this.bestScoreText.anchor.setTo(0.5, 0.5);
    this.bestScoreText.setText('0');
    // this.bestScoreText.tint = 0xf47e8e;
    this.bestScoreText.align = 'center';
    this.gameOverWindowGroup.add(this.bestScoreText);
    this.bestScoreText2 = MG.game.add.bitmapText(0, 0, 'numberFont_Pink','Bitmap Fonts!',40);
    this.bestScoreText2.anchor.setTo(0.5, 0.5);
    this.bestScoreText2.setText('0');
    // this.bestScoreText2.tint = 0xf47e8e;
    this.bestScoreText2.align = 'center';
    this.gameOverWindowGroup.add(this.bestScoreText2);
    // spine
    this.SpineNode_BestScoreCount = this.FindSpineNode(this.months_spine, "text_best_months_score_1");
    this.SpineNode_BestScoreCount.addChild(this.bestScoreText);         //최고점수 붙이기
    this.SpineNode_BestScoreCount2 = this.FindSpineNode(this.months_spine, "text_best_months_score_2");
    this.SpineNode_BestScoreCount2.addChild(this.bestScoreText2);     //최고점수 붙이기

    // 현재 획득 점수
    this.myScoreText = MG.game.add.bitmapText(0, 0, 'uiFontBlack','Bitmap Fonts!',75);
    this.myScoreText.anchor.setTo(0.5, 0.5);
    this.myScoreText.alpha = 0.65;
    this.myScoreText.setText("1");
    this.gameOverWindowGroup.add(this.myScoreText);
    this.myScoreText2 = MG.game.add.bitmapText(0, 0, 'uiFontBlack','Bitmap Fonts!',75);
    this.myScoreText2.anchor.setTo(0.5, 0.5);
    this.myScoreText2.alpha = 0.65;
    this.myScoreText2.setText("1");
    this.myScoreText2.align = 'center';
    this.gameOverWindowGroup.add(this.myScoreText2);
    // spine
    this.SpineNode_nowScore = this.FindSpineNode(this.months_spine, "text_months_score_1");
    this.SpineNode_nowScore.addChild(this.myScoreText);     //현재점수 붙이기
    this.SpineNode_nowScore2 = this.FindSpineNode(this.months_spine, "text_months_score_2");
    this.SpineNode_nowScore2.addChild(this.myScoreText2);                                           //현재점수 붙이기
    // New RecordIcon
    this.newRecordIcon = MG.game.add.sprite(-1000, -1000, 'atlas_UI', 'over_record.png');
    this.newRecordIcon.scale.setTo(0);
    this.newRecordIcon.anchor.setTo(0.5);
    this.gameOverWindowGroup.add(this.newRecordIcon);
};

UI_EndSuccessGame.prototype.StartMonths_Animation = function() {
    this.completeMonthsCounter = 0;

    // 달력 Spine /////////////////////////////////////
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_tear', true);
    this.months_spine.setAnimationByName(0, "months_paper_ani", false);
    if((uData.nStage - this.completeMonthsCounter) > 20) {
        this.months_spine.state.timeScale = (uData.nStage - this.completeMonthsCounter) * 0.1;
    } else {
        this.months_spine.state.timeScale = 2;
    }
    this.gameOverWindowGroup.add(this.months_spine);

    this.months_spine.state.onComplete = function () {
        if(this.completeMonthsCounter < uData.nStage) {
            this.completeMonthsCounter += 1;
            this.myScoreText.setText(this.completeMonthsCounter.toString());
            this.myScoreText2.setText(this.completeMonthsCounter.toString());
            this.SpineNode_nowScore2 = this.FindSpineNode(this.months_spine, "text_months_score_1");
            this.SpineNode_nowScore2.addChild(this.myScoreText);                                           //현재점수 붙이기
            this.months_spine.setAnimationByName(0, "months_paper_ani", false);
        }
        else {
            if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_tear');
            this.completeMonthsCounter = 1;
            this.myScoreText_last = MG.game.add.bitmapText(MG.game.world.centerX, MG.game.world.centerY + 20, 'uiFontBlack','Bitmap Fonts!',75);
            this.myScoreText_last.anchor.setTo(0.5, 0.5);
            this.myScoreText_last.alpha = 0.65;
            this.myScoreText_last.setText(uData.nStage);
            this.Result_Action_State();
        }

        if((uData.nStage - this.completeMonthsCounter) > 20) this.months_spine.state.timeScale = (uData.nStage - this.completeMonthsCounter) * 0.1;
    }.bind(this);

    MG.game.input.onDown.add(function() {
        switch (this.action_iter) {
            case 0:
            case 1:
            case 2:
            case 3:
                // Months Box
                if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_tear');
                this.completeMonthsCounter = uData.nStage;
                this.myScoreText.setText(this.completeMonthsCounter.toString());
                this.myScoreText2.setText(this.completeMonthsCounter.toString());

                if(isHighest_record) {
                    // New Record
                    this.newRecordIcon.scale.setTo(2);
                    this.newRecordIcon.position.setTo(100, 660);
                    this.gameOverWindowGroup.swap(this.newRecordIcon, this.months_spine);
                    MG.game.world.bringToTop(this.newRecordIcon);
                    // Best Months Counter
                    MG.game.time.events.remove(this.bestMonths_counter_event);
                    this.bestScoreText.setText(uData.nBestScore);
                }
                this.action_iter = 3;
                //this.Result_Action_State();
                break;

            case 4:
                // Reward Counter
                if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_increase');
                MG.game.time.events.remove(this.reward_counter_event);
                this.rewardScoreText.setText(assetManager.GetRewardJewelry("nStage"));
                this.Result_Action_State();
                break;
        }
    }, this);

};

// New Record 애니메이션 시작
UI_EndSuccessGame.prototype.Play_New_RecordIcon = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_newRecord');
    this.gameOverWindowGroup.swap(this.newRecordIcon, this.months_spine);
    this.newRecordIcon.scale.setTo(6);
    this.newRecordIcon.position.setTo(100, 660);
    MG.game.world.bringToTop(this.newRecordIcon);
    MG.game.add.tween(this.newRecordIcon.scale).to({
        x: 2,
        y: 2
    }, 400, Phaser.Easing.Bounce.Out, true).onComplete.add( function () {
        this.Result_Action_State();
    }.bind(this) );
};

// Best Months Counter
UI_EndSuccessGame.prototype.AddCount_BestMonts_Text = function () {
    var _count = parseInt(this.bestScoreText.text);
    this.bestScoreText.setText(++_count);

    if(_count >= uData.nBestScore) {
        if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_increase');
        this.Result_Action_State();
    }
};

// Reward Counter
UI_EndSuccessGame.prototype.AddCount_Reward_Text = function () {
    var _v = (assetManager.GetRewardJewelry("nStage") - this.rewardCounter);
    if(_v > 300) {
        this.rewardCounter += 30;
    } else if(_v <= 300 && _v > 200){
        this.rewardCounter += 20;
    } else if(_v <= 200 && _v > 100){
        this.rewardCounter += 10;
    } else if(_v <= 100 && _v > 50){
        this.rewardCounter += 5;
    } else if(_v <= 50 && _v > 20){
        this.rewardCounter += 2;
    } else {
        this.rewardCounter += 1;
    }

    this.rewardScoreText.setText(this.rewardCounter);
    if(this.rewardCounter >= assetManager.GetRewardJewelry("nStage")) {
        if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_increase');
        MG.game.time.events.remove(this.reward_counter_event);
        this.Result_Action_State();
    }
};

// 리플레이, 고홈 버튼 애니메이션 시작
UI_EndSuccessGame.prototype.Play_Buttons = function () {
    MG.game.world.bringToTop(this.rePlayButton);
    MG.game.world.bringToTop(this.gotoHomeButton);

    this.rePlayButton.scale.setTo(3);
    this.rePlayButton.position.setTo(MG.game.world.centerX - 80, 970);
    MG.game.add.tween(this.rePlayButton.scale).to({
        x: 1,
        y: 1
    }, 400, Phaser.Easing.Bounce.Out, true).onComplete.add( function () {
        this.Result_Action_State();
    }.bind(this) );

    this.gotoHomeButton.scale.setTo(3);
    this.gotoHomeButton.position.setTo(MG.game.world.centerX + 80, 970);
    MG.game.add.tween(this.gotoHomeButton.scale).to({
        x: 1,
        y: 1
    }, 400, Phaser.Easing.Bounce.Out, true);
};

//////////////////////////////// 버튼 /////////////////////////////////////////
// RePlay Button을 눌렀다. 게임을 처음부터 다시 시작하자.
UI_EndSuccessGame.prototype.OnClick_ReplayButton = function() {
    actionManager.Button_Click_Effect(this.rePlayButton);
   MG.game.time.events.add(300, this.OnClick_ReplayButton_Start, this);
};
UI_EndSuccessGame.prototype.OnClick_ReplayButton_Start = function() {
    this.gameOverWindowGroup.visible = false;
    uiManager.OnClick_ReplayButton();
    //Game.prototype.PlayRetryGame();
};

// Home Button을 눌렀다.
UI_EndSuccessGame.prototype.OnClick_GotoHomeButton = function() {
    actionManager.Button_Click_Effect(this.gotoHomeButton);
    MG.game.time.events.add(300, this.OnClick_GotoHomeButton_Start, this);
};
UI_EndSuccessGame.prototype.OnClick_GotoHomeButton_Start = function() {

    uiManager.OnClick_GotoUserItem();

    // this.gameOverWindowGroup.visible = false;
    // uiManager.OnClick_GotoHomeButton();

    // Game.prototype.GotoHomeScene();
    // uiManager.OnClickEvent_StartButton();
};

UI_EndSuccessGame.prototype.FindSpineNode = function ( SpineObj, NodeName ) {
    return SpineObj.children[SpineObj.skeleton.findSlotIndex(NodeName)];
};