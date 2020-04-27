
function UI_Tutorial() {
    this.windowGroup = MG.game.add.group();     // 모든 요소 포함
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.panelOption = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY, w: 660, h: 1160, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.panelBG = uiManager.createImg9(this.panelOption);  // main window

    this.titleText = MG.game.add.bitmapText(0, 0, 'uiFontBlack', 'Bitmap Fonts!', 50);
    this.pauseCloseButton = MG.game.add.sprite(0, 0, 'atlas_UI', 'btn_close.png');
    this.panel2Option = { game: MG.game, packname: "atlas_UI", pngname: "tutorial_bg.png", x: MG.game.world.centerX, y: MG.game.world.centerY + 40, w: 594, h: 1017, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.panel2BG = uiManager.createImg9(this.panel2Option);

    // tutorial contents
    var i = 0;
    this.DEFAULT_Y = 200;
    this.tutorialMask = MG.game.add.graphics(0, 0);
    this.tutorialMask.drawRect(50, 175, 600, 1010);
    this.contents_data = new Array();
    this.bg_data = new Array();
    this.text_data = new Array();
    this.bg_gap = new Array();
    this.content_gap = new Array();
    this.text_gap = new Array();
    this.contentsGroup = MG.game.add.group();     // 튜토리얼 내용
    this.contentsGroup.inputEnableChildren = true;
    this.tutorialPanelOption = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: 0, w: 500, h: 505, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.tutorialSmallPanelOption = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: 0, w: 500, h: 370, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.dialogStyle = {font: "32px Arial", fill: "#666666", align: "center", fontWeight: "bold"};
    this.dialog_Red_Style = {font: "32px Arial", fill: "#ff6600", align: "center", fontWeight: "bold"};

    for (i = 1; i <= 7; i++) {

        // bg
        if(i == 3 || i == 4) {
            var _bg = uiManager.createImg9(this.tutorialSmallPanelOption);
        } else {
            var _bg = uiManager.createImg9(this.tutorialPanelOption);
        }
        _bg.mask = this.tutorialMask;
        _bg.position.setTo(MG.game.world.centerX, 0);
        _bg.anchor.setTo(0.5, 0);
        _bg.scale.setTo(1.1, 1.25);
        if(i == 2) _bg.scale.setTo(1.1, 1.33);
        if(i == 5 || i == 6) _bg.scale.setTo(1.1, 1.15);
        if(i == 7) _bg.scale.setTo(1.1, 1.35);

        this.bg_data.push(_bg);
        this.contentsGroup.add(_bg);

        // content
        var _name = "tutorial_" + i + ".png";
        var _content = this.contentsGroup.create(MG.game.world.centerX, 0, 'atlas_tutorial', _name);
        _content.anchor.setTo(0.5, 0);
        _content.scale.setTo(1);
        _content.mask = this.tutorialMask;
        this.contents_data.push(_content);
        this.contentsGroup.add(_content);
        // Text
        var _dialog_name = "Tuto_0" + i;
        if (i == 2) _dialog_name = "Tuto_02_1";
        var _text = MG.game.add.text(MG.game.world.centerX, 0, GetString(_dialog_name), this.dialogStyle);
        _text.position.setTo(MG.game.world.centerX, 0);
        _text.anchor.setTo(0.5, 0);
        _text.scale.setTo(1);
        _text.mask = this.tutorialMask;
        this.text_data.push(_text);
        this.contentsGroup.add(_text);

        switch (i) {
            case 1:
                this.bg_gap.push(0);
                this.content_gap.push(25);
                this.text_gap.push(this.contents_data[i-1].height + 35);
                break;

            case 2:
                this.bg_gap.push(this.bg_data[i-2].height + 30);
                this.content_gap.push(this.bg_data[i-2].height + 55);
                this.text_gap.push(this.content_gap[i-1] + this.contents_data[i-1].height + 20);
                break;

            case 3:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30);
                this.content_gap.push(this.bg_gap[i-1] + 30);
                this.text_gap.push(this.bg_gap[i-1] + 320);
                break;

            case 4:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30);
                this.content_gap.push(this.bg_gap[i-1] + 30);
                this.text_gap.push(this.bg_gap[i-1] + 320);
                break;

            case 5:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30 + this.bg_data[3].height + 30);
                this.content_gap.push(this.bg_gap[i-1] + 30);
                this.text_gap.push(this.bg_gap[i-1] + 430);
                break;

            case 6:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30 + this.bg_data[3].height + 30 + this.bg_data[4].height + 30);
                this.content_gap.push(this.bg_gap[i-1] + 30);
                this.text_gap.push(this.bg_gap[i-1] + 430);
                break;

            case 7:
                this.bg_gap.push(this.bg_data[0].height + 30 + this.bg_data[1].height + 30 + this.bg_data[2].height + 30 + this.bg_data[3].height + 30 + this.bg_data[4].height + 30 + this.bg_data[5].height + 30);
                this.content_gap.push(this.bg_gap[i-1] + 30);
                this.text_gap.push(this.bg_gap[i-1] + 540);
                break;
        }

    }

    this.dialogText_2_2 = MG.game.add.text(0, 45, GetString("Tuto_02_2"), this.dialog_Red_Style);
    this.dialogText_2_2.anchor.setTo(0.5);
    this.dialogText_2_2.position.setTo(MG.game.world.centerX, 0);
    this.dialogText_2_2.scale.setTo(1);
    this.dialogText_2_2.mask = this.tutorialMask;
    this.contentsGroup.add(this.dialogText_2_2);

    this.tutorialDrag = MG.game.add.sprite(MG.game.world.centerX, this.DEFAULT_Y, 'blank');
    this.tutorialDrag.anchor.setTo(0.5, 0);
    this.tutorialDrag.scale.setTo(500, 4500);
    this.tutorialDrag.inputEnabled = true;
    this.tutorialDrag.input.enableDrag();
    this.tutorialDrag.input.boundsRect = new Phaser.Rectangle(50, -3100, 600, 7800);
    this.tutorialDrag.input.setDragLock(false, true);
    this.tutorialDrag.events.onDragUpdate.add(this.onDragUpdate, this);
    this.contentsGroup.add(this.tutorialDrag);

    this.Create_Window();
    this.windowGroup.visible = false;
    this.contentsGroup.visible = false;
}

UI_Tutorial.prototype.Create_Window = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.windowGroup.add(this.blackWall);
    // BG pannel
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0.5);
    this.windowGroup.add(this.panelBG);
    // bg_data pannel
    this.panel2BG.scale.setTo(1);
    this.panel2BG.anchor.setTo(0.5);
    this.windowGroup.add(this.panel2BG);
    // Title text 'TUTORIAL'
    this.titleText.anchor.setTo(0.5);
    this.titleText.setText("HOW TO PLAY");
    this.titleText.alpha = 0.6;
    // this.titleText.tint = 0x666666;
    this.titleText.align = 'center';
    this.titleText.position.setTo(MG.game.world.centerX, 120);
    this.windowGroup.add(this.titleText);
    // Close Button
    this.pauseCloseButton.scale.setTo(1);
    this.pauseCloseButton.anchor.setTo(0.5, 0.5);
    this.pauseCloseButton.alignIn(this.panelBG, Phaser.TOP_RIGHT);
    this.pauseCloseButton.position.setTo(this.pauseCloseButton.position.x + 25, this.pauseCloseButton.position.y - 25);
    this.pauseCloseButton.inputEnabled = true;
    this.pauseCloseButton.events.onInputUp.add( this.OnClick_CloseButton, this );
    this.windowGroup.add(this.pauseCloseButton);
};

UI_Tutorial.prototype.VisibleWindow = function (b) {
    this.windowGroup.visible = b;
    this.contentsGroup.visible = b;

    if(b)
    {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
        this.tutorialDrag.position.setTo(MG.game.world.centerX, this.DEFAULT_Y);
        this.onDragUpdate();
        MG.game.world.bringToTop(this.windowGroup);
        MG.game.world.bringToTop(this.contentsGroup);
    }
};

// Pause 상태에서 Close 버튼을 눌렀을때,,
UI_Tutorial.prototype.isClickCloseEvent = function (event) {
    if(Phaser.Math.distance(this.pauseCloseButton.position.x, this.pauseCloseButton.position.y, event.x, event.y) <= 20) this.VisibleWindow(false);
};

UI_Tutorial.prototype.isVisibleWindow = function () {
    return this.windowGroup.visible;
};

////////////////////////////////////////////

UI_Tutorial.prototype.onDragUpdate = function (sprite, pointer) {
    for(var i = 0; i < this.bg_data.length; i++) {
        this.bg_data[i].position.y = this.tutorialDrag.position.y + this.bg_gap[i];
        this.contents_data[i].position.y = this.tutorialDrag.position.y + this.content_gap[i];
    }
    for(i = 0; i < this.text_data.length; i++) {
        this.text_data[i].position.y = this.tutorialDrag.position.y + this.text_gap[i];
    }
    // 2번은 text가 2개이다. 예외처리
    this.dialogText_2_2.position.y = this.text_data[1].position.y + 85;
};

// 게임 시작 전에 열린 창을 닫을때,, 제어권을 유저아이템을 보이도록 userManager에게 줘야 한다.
UI_Tutorial.prototype.OnClick_CloseButton = function () {
    if(uData.isViewTutorial == false && currentScene == "userItme") {
        // uData.isViewTutorial = true;
        // StorageManager.prototype.set('isViewTutorial', uData.isViewTutorial);
        uiManager.OnClickEvent_PlayButton();
    }
    if(uData.isViewTutorial == false && currentScene == "readyGame") {
        // uData.isViewTutorial = true;
        // StorageManager.prototype.set('isViewTutorial', uData.isViewTutorial);
        userItemManager.DisplayUserItem();
    }
    this.VisibleWindow(false);
};