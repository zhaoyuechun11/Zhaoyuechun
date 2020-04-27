
function UI_Pause() {
    this.onClick_close_button = false;
    this.pauseWindowGroup = MG.game.add.group();
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.panelOption = {
        game: MG.game,
        packname: "atlas_UI",
        pngname: "panel.png",
        x: MG.game.world.centerX,
        y: MG.game.world.centerY,
        w: 606,
        h: 402,
        off_l: 27,
        off_r: 27,
        off_t: 27,
        off_b: 27
    };
    this.panelBG = uiManager.createImg9(this.panelOption);
    this.titleText = MG.game.add.bitmapText(MG.game.world.centerX, 480, 'uiFont', 'Bitmap Fonts!', 80);
    this.line = MG.game.add.sprite(MG.game.world.centerX, 600, 'atlas_UI', 'line_width.png');
    this.pauseCloseButton = MG.game.add.sprite(0, 0, 'atlas_UI', 'btn_close.png');
    this.pauseHelpButton = MG.game.add.sprite(MG.game.world.centerX - 160, MG.game.world.centerY + 75, 'atlas_UI', 'btn_pause_tutorial.png');
    this.pauseSoundOnButton = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY + 75, 'atlas_UI', 'btn_pause_sound_on.png');
    this.pauseSoundOffButton = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY + 75, 'atlas_UI', 'btn_pause_sound_off.png');
    this.pauseHomeButton = MG.game.add.sprite(MG.game.world.centerX + 160, MG.game.world.centerY + 75, 'atlas_UI', 'btn_pause_home.png');
    MG.game.input.onDown.add(UI_Pause.prototype.PauseInput, this);

    //////////////////////////////////////////////
    // 홈으로 이동 확인 창
    //////////////////////////////////////////////
    this.gotoHomeWindowGroup = MG.game.add.group();
    this.blackWall_goHome = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.isGoHomePanelBG_Option = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY, w: 570, h: 415, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.isGoHomePanelBG = uiManager.createImg9(this.isGoHomePanelBG_Option);
    this.message_bg_Option = { game: MG.game, packname: "atlas_UI", pngname: "message_bg.png", x: MG.game.world.centerX, y: MG.game.world.centerY - 65, w: 494, h: 205, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.isBuyPanel_MessageBG = uiManager.createImg9(this.message_bg_Option);
    this.dialogStyle = {font: "32px Arial", fill: "#666666", align: "center", fontWeight: "normal"};
    this.isGoHome_dialog = MG.game.add.text(0, 0, GetString("Goto_Home"), this.dialogStyle);
    this.okButton_GoHome_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_98_green.png", x: 0, y: 0, w: 235, h: 98, off_l: 50, off_r: 50, off_t: 0, off_b: 0 };
    this.okButton_GoHome = uiManager.createImg9(this.okButton_GoHome_Option);
    this.noButton_GoHome_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_98_pink.png", x: 0, y: 0, w: 235, h: 98, off_l: 50, off_r: 50, off_t: 0, off_b: 0 };
    this.noButton_GoHome = uiManager.createImg9(this.noButton_GoHome_Option);


    this.Create_Pause_Window();
    this.Create_IsGotoHome_Window();
    this.VisibleWindow(false);
    this.VisibleWindow_IsGoHome(false);
}

///////////////////////////////////
// Pause 창을 만든다.
///////////////////////////////////
UI_Pause.prototype.Create_Pause_Window = function ()
{
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.pauseWindowGroup.add(this.blackWall);
    // 메인 창
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0.5);
    this.pauseWindowGroup.add(this.panelBG);
    // 타이틀 Text
    this.titleText.anchor.setTo(0.5, 0);
    this.titleText.setText("PAUSE");
    this.titleText.tint = 0x575757;
    this.titleText.align = 'center';
    this.pauseWindowGroup.add(this.titleText);
    // 타이틀 밑줄
    this.line.scale.setTo(50, 1);
    this.line.alpha = 0.5;
    this.line.anchor.setTo(0.5, 0.5);
    this.pauseWindowGroup.add(this.line);
    // 닫기 버튼
    this.pauseCloseButton.scale.setTo(1);
    this.pauseCloseButton.anchor.setTo(0.5, 0.5);
    this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT);
    this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 35, this.pauseCloseButton.position.y - 35);
    this.pauseWindowGroup.add(this.pauseCloseButton);
    // 도움말 버튼
    this.pauseHelpButton.scale.setTo(1);
    this.pauseHelpButton.anchor.setTo(0.5);
    this.pauseWindowGroup.add(this.pauseHelpButton);
    // 사운드 ON 버튼
    this.pauseSoundOnButton.scale.setTo(1);
    this.pauseSoundOnButton.anchor.setTo(0.5);
    this.pauseWindowGroup.add(this.pauseSoundOnButton);
    // 사운드 OFF 버튼
    this.pauseSoundOffButton.scale.setTo(1);
    this.pauseSoundOffButton.anchor.setTo(0.5);
    this.pauseWindowGroup.add(this.pauseSoundOffButton);
    // 홈 버튼
    this.pauseHomeButton.scale.setTo(1);
    this.pauseHomeButton.anchor.setTo(0.5);
    this.pauseWindowGroup.add(this.pauseHomeButton);
};

UI_Pause.prototype.VisibleWindow = function (b) {
    this.pauseWindowGroup.visible = b;
    if(b) {
        if(StorageManager.prototype.get('isSfx')) {
            MG.PlayAudio('se_popup_off');
            this.pauseSoundOnButton.visible = true;
            this.pauseSoundOffButton.visible = false;
        } else {
            this.pauseSoundOnButton.visible = false;
            this.pauseSoundOffButton.visible = true;
        }

        MG.game.world.bringToTop(this.pauseWindowGroup);
    } else {

    }
};

////////////////////////////////
// 홈으로 이동 확인창 만들기
////////////////////////////////
UI_Pause.prototype.Create_IsGotoHome_Window = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall_goHome.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall_goHome.anchor.setTo(0.5);
    this.blackWall_goHome.alpha = 0.75;
    this.blackWall_goHome.inputEnabled = true;
    this.blackWall_goHome.events.onInputUp.add( function () {} );
    this.gotoHomeWindowGroup.add(this.blackWall_goHome);
    // BG pannel
    this.isGoHomePanelBG.scale.setTo(1);
    this.isGoHomePanelBG.anchor.setTo(0.5);
    this.gotoHomeWindowGroup.add(this.isGoHomePanelBG);
    // 내부 박스
    this.isBuyPanel_MessageBG.scale.setTo(1);
    this.isBuyPanel_MessageBG.anchor.setTo(0.5);
    this.gotoHomeWindowGroup.add(this.isBuyPanel_MessageBG);
    // 설명글
    this.isGoHome_dialog.anchor.setTo(0.5);
    this.isGoHome_dialog.position.setTo(this.isBuyPanel_MessageBG.position.x, this.isBuyPanel_MessageBG.position.y);
    this.gotoHomeWindowGroup.add(this.isGoHome_dialog);
    // OK Button
    this.okButton_GoHome.position.setTo(MG.game.world.centerX + 130, this.isGoHomePanelBG.position.y + 125);
    this.okButton_GoHome.anchor.setTo(0.5);
    this.okButton_GoHome.inputEnabled = true;
    this.okButton_GoHome.events.onInputUp.add( this.onClick_OK, this );
    this.gotoHomeWindowGroup.add(this.okButton_GoHome);
    // OK text
    this.ok_Text = MG.game.add.bitmapText(this.okButton_GoHome.position.x, this.okButton_GoHome.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.ok_Text.anchor.setTo(0.5);
    this.ok_Text.setText('OK');
    this.ok_Text.align = 'center';
    this.gotoHomeWindowGroup.add(this.ok_Text);
    // NO Button
    this.noButton_GoHome.position.setTo(MG.game.world.centerX - 130, this.isGoHomePanelBG.position.y + 125);
    this.noButton_GoHome.anchor.setTo(0.5);
    this.noButton_GoHome.inputEnabled = true;
    this.noButton_GoHome.events.onInputUp.add( this.onClick_IsBuy_NO, this );
    this.gotoHomeWindowGroup.add(this.noButton_GoHome);
    // NO text
    this.no_Text = MG.game.add.bitmapText(this.noButton_GoHome.position.x, this.noButton_GoHome.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.no_Text.anchor.setTo(0.5);
    this.no_Text.align = 'center';
    this.no_Text.setText('NO');
    this.gotoHomeWindowGroup.add(this.no_Text);
};

UI_Pause.prototype.VisibleWindow_IsGoHome = function (b) {
    this.gotoHomeWindowGroup.visible = b;
    if(b) {
        MG.game.world.bringToTop(this.gotoHomeWindowGroup);
    } else {
    }
};

UI_Pause.prototype.PauseInput = function (event) {
    if(this.pauseWindowGroup.visible == false || this.gotoHomeWindowGroup.visible || this.onClick_close_button) return;
    if(MG.game.physics.arcade.isPaused)
    {
        if(uiManager.isOpenTutoriallWindow() == false && Phaser.Math.distance(this.pauseCloseButton.position.x, this.pauseCloseButton.position.y, event.x, event.y) <= 20) this.OnClick_PauseClose();
        if(uiManager.isOpenTutoriallWindow() == false && Phaser.Math.distance(this.pauseHelpButton.position.x, this.pauseHelpButton.position.y, event.x, event.y) <= 40) uiManager.ViewTutorial();
        if(uiManager.isOpenTutoriallWindow() == false && Phaser.Math.distance(this.pauseSoundOnButton.position.x, this.pauseSoundOnButton.position.y, event.x, event.y) <= 40) this.OnClick_Sound();
        // if(uiManager.isOpenTutoriallWindow() == false && Phaser.Math.distance(this.pauseSoundOffButton.position.x, this.pauseSoundOffButton.position.y, event.x, event.y) <= 40) this.OnClick_Sound();
        if(uiManager.isOpenTutoriallWindow() == false && Phaser.Math.distance(this.pauseHomeButton.position.x, this.pauseHomeButton.position.y, event.x, event.y) <= 40) this.OnClick_GotoHomeButton();
        uiManager.isClickCloseEvent(event);
    }
};

// sound 버튼을 눌렀다.
UI_Pause.prototype.OnClick_Sound = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
    if(this.pauseSoundOnButton.visible) actionManager.Button_Click_Effect(this.pauseSoundOnButton);
    if(this.pauseSoundOffButton.visible) actionManager.Button_Click_Effect(this.pauseSoundOffButton);
    MG.game.time.events.add(300, this.OnClick_Sound_Start, this);
};
UI_Pause.prototype.OnClick_Sound_Start = function () {
    console.log("OnClick_Sound");
    if(StorageManager.prototype.get('isSfx')) {
        MG.AudioSwitch(StorageManager.prototype.get('isSfx'));
        uData.isSfx = false;
        uData.isBGM = false;
        this.pauseSoundOnButton.visible = false;
        this.pauseSoundOffButton.visible = true;
        isPlaying_GameBGM = false;
        MG.StopBgm('bgm_game');
    } else {
        MG.AudioSwitch(StorageManager.prototype.get('isSfx'));
        uData.isSfx = true;
        uData.isBGM = true;
        this.pauseSoundOnButton.visible = true;
        this.pauseSoundOffButton.visible = false;
        isPlaying_GameBGM = true;
        MG.PlayBgm('bgm_game', true);
    }
};

// Pause Close 버튼을 눌렀다.
UI_Pause.prototype.OnClick_PauseClose = function () {
    this.onClick_close_button = true;
    actionManager.Button_Click_Effect(this.pauseCloseButton);
    MG.game.time.events.add(300, this.OnClick_PauseClose_Start, this);
};
UI_Pause.prototype.OnClick_PauseClose_Start = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
    stateManager.offPauseWindow();
    uiManager.togglePause();
    this.onClick_close_button = false;
    this.pauseWindowGroup.visible = false;
};

// Home 버튼을 눌렀다.
UI_Pause.prototype.OnClick_GotoHomeButton = function () {
    actionManager.Button_Click_Effect(this.pauseHomeButton);
    MG.game.time.events.add(300, this.OnClick_GotoHomeButton_Start, this);
};

UI_Pause.prototype.OnClick_GotoHomeButton_Start = function () {
    this.VisibleWindow_IsGoHome(true);
};

// 확인창의 OK 선택
UI_Pause.prototype.onClick_OK = function () {
    Game.prototype.GotoHomeScene();
    uiManager.OnClickEvent_StartButton();
    this.VisibleWindow(false);
    this.VisibleWindow_IsGoHome(false);
};

// 확인창의 NO 선택
UI_Pause.prototype.onClick_IsBuy_NO = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
    this.VisibleWindow_IsGoHome(false);
};