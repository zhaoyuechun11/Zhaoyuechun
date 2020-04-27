
function UI_Continue() {
    this.monthsContinueGroup = MG.game.add.group();
    this.flyObjectGroup = MG.game.add.group();
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.panelOption = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY, w: 606, h: 620, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.panelBG = uiManager.createImg9(this.panelOption);
    this.titleText = MG.game.add.bitmapText(0, 0, 'uiFontBlack', 'Bitmap Fonts!', 52);
    this.line = MG.game.add.image(0, 0, 'atlas_UI', 'line_width.png');
    this.pauseCloseButton = MG.game.add.sprite(0, 0, 'atlas_UI', 'btn_close.png');
    this.upIcon = MG.game.add.image(MG.game.world.centerX + 100, MG.game.world.centerY - 70, 'atlas_UI', 'continue_heart_1.png');
    this.flyTimer = MG.game.add.image(MG.game.world.centerX - 100, MG.game.world.centerY - 70, 'atlas_UI', 'continue_heart_2.png');
    // this.plus5HeartText = MG.game.add.bitmapText(this.upIcon.position.x + 50, this.upIcon.position.y + 30, 'uiFont', 'Bitmap Fonts!', 60);
    this.dialogStyle = {font: "26px Arial", fill: "#776e65", align: "center", fontWeight: "normal"};
    this.useJewelryCountBGOption = { game: MG.game, packname: "atlas_UI", pngname: "btn_130_green.png", x: MG.game.world.centerX, y: MG.game.world.centerY + 200, w: 303, h: 130, off_l: 65, off_r: 65, off_t: 0, off_b: 0 };
    this.playButton = uiManager.createImg9(this.useJewelryCountBGOption);
    this.jewelIcon = MG.game.add.image(0, 0, 'atlas_UI', 'jewel.png');
    this.jewelryCountText = MG.game.add.bitmapText(0, 0, 'uiFont', 'Bitmap Fonts!', 40);

    this.CreateWindow();
    this.VisibleWindow(false);
    this.VisibleFlyObjectWindow(false);
}

UI_Continue.prototype.CreateWindow = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.monthsContinueGroup.add(this.blackWall);
    // BG pannel
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0.5);
    this.monthsContinueGroup.add(this.panelBG);
    // Title text 'CONTINUE?'
    this.titleText.anchor.setTo(0.5);
    this.titleText.setText("CONTINUE?");
    this.titleText.alpha = 0.6;
    this.titleText.align = 'center';
    this.titleText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 240);
    this.monthsContinueGroup.add(this.titleText);
    // title Line
    this.line.scale.setTo(50, 1);
    this.line.alpha = 0.5;
    this.line.anchor.setTo(0.5, 0.5);
    this.line.position.setTo(MG.game.world.centerX, this.titleText.position.y + 60);
    this.monthsContinueGroup.add(this.line);
    // Close Button
    this.pauseCloseButton.scale.setTo(1);
    this.pauseCloseButton.anchor.setTo(0.5, 0.5);
    this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT);
    this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 35, this.pauseCloseButton.position.y - 35);
    this.pauseCloseButton.inputEnabled = true;
    this.pauseCloseButton.events.onInputUp.add( this.OnClick_CloseButton, this );
    this.monthsContinueGroup.add(this.pauseCloseButton);
    // Heart Icon
    this.upIcon.anchor.setTo(0.5, 0.5);
    this.monthsContinueGroup.add(this.upIcon);
    // Fly Timer
    this.flyTimer.anchor.setTo(0.5, 0.5);
    this.flyObjectGroup.add(this.flyTimer);
    // 지급되는 하트 수 Text
    // this.plus5HeartText.tint = 0x1FBB99;
    // this.plus5HeartText.anchor.setTo(0.5);
    // this.plus5HeartText.setText("+" + MG.gameSheetsData["ContinueHeartCount"].toString());
    // this.plus5HeartText.align = 'center';
    // this.monthsContinueGroup.add(this.plus5HeartText);
    // 설명 글
    this.dialogText = MG.game.add.text(MG.game.world.centerX, MG.game.world.centerY + 70, GetString("Stage_Continue", MG.gameSheetsData["ContinueHeartCount"]), this.dialogStyle);
    this.dialogText.anchor.setTo(0.5, 0.5);
    this.monthsContinueGroup.add(this.dialogText);
    // 플레이 버튼
    this.playButton.scale.setTo(1);
    this.playButton.anchor.setTo(0.5);
    this.playButton.inputEnabled = true;
    this.playButton.events.onInputDown.add( this.PlayContinueGame, this );
    this.monthsContinueGroup.add(this.playButton);
    // 쥬얼리 아이콘
    this.jewelIcon.scale.setTo(0.8, 0.8);
    this.jewelIcon.anchor.setTo(0.5);
    this.jewelIcon.position.setTo(this.playButton.position.x - 80, this.playButton.position.y);
    this.monthsContinueGroup.add(this.jewelIcon);
    // 쥬얼리 카운트 텍스트
    this.jewelryCountText.anchor.setTo(0.5);
    this.jewelryCountText.setText("0");
    this.jewelryCountText.align = 'center';
    this.jewelryCountText.position.setTo(this.playButton.position.x + 40, this.jewelIcon.position.y);
    this.monthsContinueGroup.add(this.jewelryCountText);
};

UI_Continue.prototype.VisibleWindow = function (b) {
    this.monthsContinueGroup.visible = b;
    if(b) {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
        uiManager.InputEnabled_PauseButton(false);
        continueCounter++;
        this.jewelryCountText.setText(assetManager.GetContinueNeedJewelry().toString());
        ballManager.VisibleBalls(false);
        MG.game.world.bringToTop(this.monthsContinueGroup);
        this.VisibleFlyObjectWindow(true);
    } else {
    }
};

UI_Continue.prototype.VisibleFlyObjectWindow = function (b) {
    this.flyObjectGroup.visible = b;
    if(b)
    {
        this.flyObjectGroup.position.setTo(0,0);
        this.flyTimer.scale.setTo(1,1);
        MG.game.world.bringToTop(this.flyObjectGroup);
        // MG.game.world.bringToTop(this.flyTimer);
    }
};

// Close 버튼을 눌렀다.
UI_Continue.prototype.OnClick_CloseButton = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
    actionManager.Button_Click_Effect(this.pauseCloseButton);
    if(stateManager.IsStopSkill()) ballManager.StopSkill_Cancle();
    MG.game.time.events.add(300, this.OnClick_CloseButton_Start, this);
};
UI_Continue.prototype.OnClick_CloseButton_Start = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
    uiManager.VisibleTopJewelryGroup(false);
    stateManager.offContinue();
    this.VisibleWindow(false);
    this.VisibleFlyObjectWindow(false);
    // currentScene = 'none';

    Game.prototype.FailGame();
};

// Continue 이어하기 버튼을 눌렀다.
UI_Continue.prototype.PlayContinueGame = function () {
    actionManager.Button_Click_Effect(this.playButton);
    //MG.game.time.gameResumed();//uiManager.togglePause();
    MG.game.time.events.add(300, this.PlayContinueGame_Start, this);
};
UI_Continue.prototype.PlayContinueGame_Start = function () {
    if(uData.nJewelryCount < assetManager.GetContinueNeedJewelry()) {
        shopManager.OpenIsBuyWindow();
        // uiManager.togglePause();
        return;
    }
    currentScene = 'game';
    uiManager.InputEnabled_PauseButton(true);
    uiManager.VisibleTopJewelryGroup(false);


    MG.game.add.tween(this.flyTimer.scale).to({ x: 0.3, y:0.3 }, 800, Phaser.Easing.Quartic.Out, true);
    MG.game.add.tween(this.flyObjectGroup).to({ x:-220, y:-400 }, 800, Phaser.Easing.Quartic.Out, true).onComplete.add( function () {
        assetManager.SmoothRefillTime();
        this.VisibleWindow(false);
        this.VisibleFlyObjectWindow(false);
    }.bind(this) );
};