
function UI_MonthsJump_Animation() {
    this.monthsJumpSpineGroup = MG.game.add.group();
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.gradationBG = MG.game.add.image(0, 0, 'atlas_UI', 'ready_bg.png');
    this.levelJump_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'months_animation');

    // Spine
    //this.levelJump_spine.scale.setTo(10);
    // MG.game.world.bringToTop(this.levelJump_spine);
    // this.levelJump_spine.visible = false;
    // this.monthsJumpSpineGroup.add(this.levelJump_spine);
    this.bestScoreTitleText;
    this.bestScoreTitleText2;
    this.SpineNode_BestMonths;
    this.SpineNode_BestMonths2;
    this.scoreTitleText;
    this.scoreTitleText2;
    this.bestScoreText;
    this.bestScoreText2;
    this.myScoreText;
    this.myScoreText2;

    this.completeMonthsCounter = 1;

    this.CreateWindow();
    this.VisibleWindow(false);
}


UI_MonthsJump_Animation.prototype.CreateWindow = function () {
    // gradation 백그라운드
    this.gradationBG.anchor.setTo(0, 0);
    this.gradationBG.scale.setTo(MG.game.world.width * 0.1, 1);
    this.monthsJumpSpineGroup.add(this.gradationBG);
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.monthsJumpSpineGroup.add(this.blackWall);

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
    this.monthsJumpSpineGroup.add(this.bestScoreTitleText);
    this.monthsJumpSpineGroup.add(this.bestScoreTitleText2);
    // spine
    this.SpineNode_BestMonths = this.FindSpineNode(this.levelJump_spine, "text_best_months_1");
    this.SpineNode_BestMonths.addChild(this.bestScoreTitleText);        //타이틀 붙이기
    this.SpineNode_BestMonths2 = this.FindSpineNode(this.levelJump_spine, "text_best_months_2");
    this.SpineNode_BestMonths2.addChild(this.bestScoreTitleText2);        //타이틀 붙이기
    // "MONTHS"
    this.scoreTitleText = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',40);
    this.scoreTitleText.anchor.setTo(0.5, 0.5);
    this.scoreTitleText.setText("LEVEL");
    this.scoreTitleText.align = 'center';
    this.monthsJumpSpineGroup.add(this.scoreTitleText);
    this.scoreTitleText2 = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',40);
    this.scoreTitleText2.anchor.setTo(0.5, 0.5);
    this.scoreTitleText2.setText("LEVEL");
    this.scoreTitleText2.align = 'center';
    this.monthsJumpSpineGroup.add(this.scoreTitleText2);
    // spine
    this.SpineNode_Months = this.FindSpineNode(this.levelJump_spine, "text_months_1");
    this.SpineNode_Months.addChild(this.scoreTitleText);     //'MONTHS' 붙이기
    this.SpineNode_Months2 = this.FindSpineNode(this.levelJump_spine, "text_months_2");
    this.SpineNode_Months2.addChild(this.scoreTitleText2);     //'MONTHS' 붙이기
    // 최고점수 표시
    this.bestScoreText = MG.game.add.bitmapText(0, 0, 'numberFont_Pink','Bitmap Fonts!',40);
    this.bestScoreText.anchor.setTo(0.5, 0.5);
    this.bestScoreText.setText(uData.nBestScore);
    this.bestScoreText.align = 'center';
    this.monthsJumpSpineGroup.add(this.bestScoreText);
    this.bestScoreText2 = MG.game.add.bitmapText(0, 0, 'numberFont_Pink','Bitmap Fonts!',40);
    this.bestScoreText2.anchor.setTo(0.5, 0.5);
    this.bestScoreText2.setText(uData.nBestScore);
    this.bestScoreText2.align = 'center';
    this.monthsJumpSpineGroup.add(this.bestScoreText2);
    // this.monthsJumpSpineGroup.add(this.myScoreText_last);
    // spine
    this.SpineNode_BestScoreCount = this.FindSpineNode(this.levelJump_spine, "text_best_months_score_1");
    this.SpineNode_BestScoreCount.addChild(this.bestScoreText);         //최고점수 붙이기
    this.SpineNode_BestScoreCount2 = this.FindSpineNode(this.levelJump_spine, "text_best_months_score_2");
    this.SpineNode_BestScoreCount2.addChild(this.bestScoreText2);     //최고점수 붙이기

    // 현재 획득 점수
    this.myScoreText = MG.game.add.bitmapText(0, 0, 'uiFontBlack','Bitmap Fonts!',75);
    this.myScoreText.anchor.setTo(0.5, 0.5);
    this.myScoreText.alpha = 0.65;
    this.myScoreText.setText("1");
    this.monthsJumpSpineGroup.add(this.myScoreText);
    this.myScoreText2 = MG.game.add.bitmapText(0, 0, 'uiFontBlack','Bitmap Fonts!',75);
    this.myScoreText2.anchor.setTo(0.5, 0.5);
    this.myScoreText2.alpha = 0.65;
    this.myScoreText2.setText("1");
    this.myScoreText2.align = 'center';
    this.monthsJumpSpineGroup.add(this.myScoreText2);
    // spine
    this.SpineNode_nowScore = this.FindSpineNode(this.levelJump_spine, "text_months_score_1");
    this.SpineNode_nowScore.addChild(this.myScoreText);     //현재점수 붙이기
    this.SpineNode_nowScore2 = this.FindSpineNode(this.levelJump_spine, "text_months_score_2");
    this.SpineNode_nowScore2.addChild(this.myScoreText2);                                           //현재점수 붙이기
};

UI_MonthsJump_Animation.prototype.VisibleWindow = function (b) {

    console.log("--------- UI_MonthsJump_Animation.prototype.VisibleWindow = " + b);
    if(b) {
        // this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
        // MG.game.world.bringToTop(this.monthsJumpSpineGroup);
        // MG.game.world.sendToBack(this.blackWall);
        // MG.game.world.bringToTop(this.levelJump_spine);

    } else {
        // this.blackWall.scale.setTo(0, 0);
    }

    this.monthsJumpSpineGroup.visible = b;
};

UI_MonthsJump_Animation.prototype.JumpAnimation_Ready = function () {
    this.VisibleWindow(true);
    //this.VisibleWindow(false);
    // MG.game.world.bringToTop(this.levelJump_spine);
    this.StartMonths_Animation();
};

UI_MonthsJump_Animation.prototype.StartMonths_Animation = function() {
    this.completeMonthsCounter = 1;

    // 달력 Spine /////////////////////////////////////
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_tear', true);

    this.levelJump_spine.setAnimationByName(0, "months_paper_ani", false);
    if((jumpCount - this.completeMonthsCounter) < jumpCount - 20) {
        this.levelJump_spine.state.timeScale = (jumpCount - this.completeMonthsCounter) * 0.2;
    } else {
        this.levelJump_spine.state.timeScale = 3;
    }

    this.monthsJumpSpineGroup.add(this.levelJump_spine);

    this.levelJump_spine.state.onComplete = function () {
        if(this.completeMonthsCounter < jumpCount) {
            this.completeMonthsCounter += 1;
            console.log("--- completeMonthsCounter ---" + this.completeMonthsCounter);
            this.myScoreText.setText(this.completeMonthsCounter.toString());
            this.myScoreText2.setText(this.completeMonthsCounter.toString());
            this.SpineNode_nowScore2 = this.FindSpineNode(this.levelJump_spine, "text_months_score_1");
            this.SpineNode_nowScore2.addChild(this.myScoreText);                                           //현재점수 붙이기
            this.levelJump_spine.setAnimationByName(0, "months_paper_ani", false);
        }
        else {
            if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_tear');
            this.completeMonthsCounter = jumpCount;
            this.myScoreText_last = MG.game.add.bitmapText(MG.game.world.centerX, MG.game.world.centerY, 'uiFontBlack','Bitmap Fonts!',75);
            this.myScoreText_last.anchor.setTo(0.5, 0.5);
            this.myScoreText_last.alpha = 0.65;
            this.myScoreText_last.setText(jumpCount);

            MG.game.time.events.add(800, this.EnterGame, this);
        }

        if((jumpCount - this.completeMonthsCounter) > 20) this.levelJump_spine.state.timeScale = (jumpCount - this.completeMonthsCounter) * 0.2;
    }.bind(this);

    // 이걸 풀면, 게임에서 터치가 안된다.
    // MG.game.input.onDown.add(function() {
    //     if(this.monthsJumpSpineGroup.visible) {
    //         if(StorageManager.prototype.get('isSfx')) MG.StopAudio('se_tear');
    //         this.completeMonthsCounter = this.jumpCount;
    //         this.myScoreText.setText(this.completeMonthsCounter.toString());
    //         this.myScoreText2.setText(this.completeMonthsCounter.toString());
    //         MG.game.time.events.add(800, this.EnterGame, this);
    //     }
    // }, this);

};

UI_MonthsJump_Animation.prototype.EnterGame = function() {
    console.log("--- EnterGame ---");
    uData.nStage = jumpCount;
    Game.prototype.Set_Complete_Area();
    this.VisibleWindow(false);
    uiManager.OnClickEvent_PlayButton();
};

UI_MonthsJump_Animation.prototype.FindSpineNode = function ( SpineObj, NodeName ) {
    return SpineObj.children[SpineObj.skeleton.findSlotIndex(NodeName)];
};