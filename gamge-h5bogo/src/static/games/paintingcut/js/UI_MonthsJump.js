
function UI_MonthsJump() {
    this.monthsJumpWindowGroup = MG.game.add.group();
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.panelOption = { game:MG.game, packname:"atlas_UI", pngname:"popup_open.png", x:MG.game.world.centerX, y:MG.game.world.centerY, w:606, h:621, off_l:45, off_r:45, off_t:155, off_b:55 };
    this.panelBG = uiManager.createImg9(this.panelOption);
    this.titleText = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',52);
    // this.line = MG.game.add.image(0, 0, 'atlas_UI', 'line_width.png');
    this.pauseCloseButton = MG.game.add.sprite(0, 0, 'atlas_UI', 'btn_close.png');
    this.monthsCountFrameOption = { game:MG.game, packname:"atlas_UI", pngname:"jump_bg.png", x:MG.game.world.centerX, y:MG.game.world.centerY - 65, w:313, h:153, off_l:20, off_r:20, off_t:20, off_b:20 };
    this.monthsCountFrame = uiManager.createImg9(this.monthsCountFrameOption);
    this.selectedMonthText = MG.game.add.bitmapText(0, 0, 'numberFont_1fbb99','Bitmap Fonts!',90);
    this.leftSelectMonthsButton = MG.game.add.sprite(0, 0, 'atlas_UI', 'btn_arrow.png');
    this.rightSelectMonthsButton = MG.game.add.sprite(0, 0, 'atlas_UI', 'btn_arrow.png');
    this.dialogStyle = { font: "26px Arial", fill: "#776e65", align: "center", fontWeight: "normal" };
    this.useJewelryCountBGOption = { game:MG.game, packname:"atlas_UI", pngname:"btn_130_green.png", x:MG.game.world.centerX, y:MG.game.world.centerY + 200, w:303, h:130, off_l:65, off_r:65, off_t:0, off_b:0 };
    this.playButton = uiManager.createImg9(this.useJewelryCountBGOption);
    this.jewelIcon = MG.game.add.image(0, 0, 'atlas_UI', 'jewel.png');
    this.jewelryCountText = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!', 40);

    this.CreateWindow();
    this.VisibleWindow(false);
}

UI_MonthsJump.prototype.CreateWindow = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.monthsJumpWindowGroup.add(this.blackWall);
    // BG pannel
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0.5);
    this.monthsJumpWindowGroup.add(this.panelBG);
    // Title text 'MONTHS JUMP'
    this.titleText.anchor.setTo(0.5);
    this.titleText.setText("LEVEL JUMP");
    // this.titleText.alpha = 0.6;
    this.titleText.align = 'center';
    this.titleText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 230);
    this.monthsJumpWindowGroup.add(this.titleText);
    // title Line
    // this.line.scale.setTo(50, 1);
    // this.line.alpha = 0.5;
    // this.line.anchor.setTo(0.5, 0.5);
    // this.line.position.setTo(MG.game.world.centerX, this.titleText.position.y + 60);
    // this.monthsJumpWindowGroup.add(this.line);
    // Close Button
    this.pauseCloseButton.scale.setTo(1);
    this.pauseCloseButton.anchor.setTo(0.5, 0.5);
    this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT);
    this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 35, this.pauseCloseButton.position.y - 35);
    this.pauseCloseButton.inputEnabled = true;
    this.pauseCloseButton.events.onInputUp.add( function () {
        actionManager.Button_Click_Effect(this.pauseCloseButton);
        MG.game.time.events.add(300, function() {
            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
            this.VisibleWindow(false);
        }, this);
        // this.VisibleWindow(false)
    }.bind(this) );
    this.monthsJumpWindowGroup.add(this.pauseCloseButton);
    // 캘린더 카운트 텍스트 박스
    this.monthsCountFrame.scale.setTo(1);
    this.monthsCountFrame.anchor.setTo(0.5);
    this.monthsJumpWindowGroup.add(this.monthsCountFrame);
    // 캘린더 선택 버튼 <-
    this.leftSelectMonthsButton.scale.setTo(1);
    this.leftSelectMonthsButton.anchor.setTo(0.5, 0.5);
    this.leftSelectMonthsButton.position.setTo(this.monthsCountFrame.position.x - 225, this.monthsCountFrame.position.y);
    this.leftSelectMonthsButton.inputEnabled = true;
    this.leftSelectMonthsButton.events.onInputDown.add( function () {this.JumpMonths("down")}, this );
    this.leftSelectMonthsButton.visible = false;
    this.monthsJumpWindowGroup.add(this.leftSelectMonthsButton);
    // 캘린더 선택 버튼 ->
    this.rightSelectMonthsButton.scale.setTo(-1, 1);
    this.rightSelectMonthsButton.anchor.setTo(0.5, 0.5);
    this.rightSelectMonthsButton.position.setTo(this.monthsCountFrame.position.x + 225, this.monthsCountFrame.position.y);
    this.rightSelectMonthsButton.inputEnabled = true;
    this.rightSelectMonthsButton.events.onInputDown.add( function () {this.JumpMonths("up")}, this );
    this.monthsJumpWindowGroup.add(this.rightSelectMonthsButton);
    // 선택한 Months Text
    this.selectedMonthText.anchor.setTo(0.5);
    this.selectedMonthText.setText(jumpCount.toString());
    // this.selectedMonthText.alpha = 0.6;
    this.selectedMonthText.align = 'center';
    this.selectedMonthText.position.setTo(MG.game.world.centerX, this.monthsCountFrame.position.y - 20);
    this.monthsJumpWindowGroup.add(this.selectedMonthText);
    // 설명 글
    this.dialogText = MG.game.add.text(MG.game.world.centerX, MG.game.world.centerY + 70, GetString("Stage_Select"), this.dialogStyle);
    this.dialogText.anchor.setTo(0.5, 0.5);
    this.monthsJumpWindowGroup.add(this.dialogText);
    // 플레이 버튼
    this.playButton.scale.setTo(1);
    this.playButton.anchor.setTo(0.5);
    this.playButton.inputEnabled = true;
    this.playButton.events.onInputDown.add( this.PlayJumpGame, this );
    this.monthsJumpWindowGroup.add(this.playButton);
    // 쥬얼리 아이콘
    this.jewelIcon.scale.setTo(0.8, 0.8);
    this.jewelIcon.anchor.setTo(0.5);
    this.jewelIcon.position.setTo(this.playButton.position.x - 90, this.playButton.position.y);
    this.monthsJumpWindowGroup.add(this.jewelIcon);
    // 쥬얼리 카운트 텍스트
    this.jewelryCountText.anchor.setTo(0.5);
    this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString());
    this.jewelryCountText.align = 'center';
    this.jewelryCountText.position.setTo(this.playButton.position.x + 40, this.jewelIcon.position.y);
    this.monthsJumpWindowGroup.add(this.jewelryCountText);

    //////////////////////////////////////////////////////////////////
};

UI_MonthsJump.prototype.VisibleWindow = function (b) {
    this.monthsJumpWindowGroup.visible = b;
    if(b)
    {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
        jumpCount = 11;
        if(uData.nBestScore < 21) {
            this.leftSelectMonthsButton.visible = false;
            this.rightSelectMonthsButton.visible = false;
        }
        this.selectedMonthText.setText(jumpCount.toString());
        this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString());
        MG.game.world.bringToTop(this.monthsJumpWindowGroup);
    } else {
        uiManager.VisibleTopJewelryGroup(false);
    }
};



UI_MonthsJump.prototype.JumpMonths = function (str) {
    if(str == "up") {
        if((uData.nBestScore + 1) >= jumpCount + 10) {
            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
            jumpCount += 10;
            this.selectedMonthText.setText(jumpCount.toString());
            this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString());

            this.leftSelectMonthsButton.visible = true;
            if((uData.nBestScore + 1) < jumpCount + 10) this.rightSelectMonthsButton.visible = false;
        }
    } else if(str == "down") {
        if(11 <= jumpCount - 10) {
            if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
            jumpCount -= 10;
            this.selectedMonthText.setText(jumpCount.toString());
            this.jewelryCountText.setText(assetManager.GetMonthsJumpNeedJewelry(jumpCount).toString());

            this.rightSelectMonthsButton.visible = true;
            if(jumpCount == 11) this.leftSelectMonthsButton.visible = false;
        }
    }
};

UI_MonthsJump.prototype.PlayJumpGame = function () {
    actionManager.Button_Click_Effect(this.playButton);
    MG.game.time.events.add(300, this.PlayJumpGame_Start, this);
};
UI_MonthsJump.prototype.PlayJumpGame_Start = function () {
    if(uData.nJewelryCount < assetManager.GetMonthsJumpNeedJewelry(jumpCount)) {
        shopManager.OpenIsBuyWindow();
        return;
    }
    uData.nJewelryCount -= assetManager.GetMonthsJumpNeedJewelry(jumpCount);
    StorageManager.prototype.set('nJewelryCount', uData.nJewelryCount);

// Blooming... 여기서 UI_MonthsJump_Animation 호출해야한다.
    uiManager.OnClickEvent_JumpAnimationButton();
};

