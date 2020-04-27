
function UI_TopCommon() {
    this.jewelryGroup = MG.game.add.group();
    this.commonUIGroup = MG.game.add.group();
    this.panelOption = { game:MG.game, packname:"atlas_UI", pngname:"panel.png", x:0, y:0, w:294, h:87, off_l:27, off_r:27, off_t:27, off_b:27 };
    this.jewelIcon = MG.game.add.image(0, 0, 'atlas_UI', 'jewel.png');
    //this.plusJewelButton = MG.game.add.image(0, 0, 'atlas_UI', 'btn_plus.png');
    this.jewelryCountText = MG.game.add.bitmapText(0, 0, 'uiFontBlack','Bitmap Fonts!', 35);
    this.tutorialButton = MG.game.add.image(MG.game.world.width - 160, 60, 'atlas_UI', 'btn_tutorial.png');
    this.tutorialButton.inputEnabled = true;
    this.tutorialButton.events.onInputUp.add( function () {
        uiManager.ViewTutorial();
    } );
    this.soundButton_ON = MG.game.add.image(MG.game.world.width - 60, -60, 'atlas_UI', 'btn_sound_on.png');
    this.soundButton_OFF = MG.game.add.image(MG.game.world.width - 60, -60, 'atlas_UI', 'btn_sound_off.png');

    this.Create_Common_TopIcons();
    this.VisibleWindow(false);
}

////////////////////////////////////////
// 상단 공용 아이콘 (쥬얼리, ?, 사운드)
////////////////////////////////////////
UI_TopCommon.prototype.Create_Common_TopIcons = function () {

    this.panelBG = uiManager.createImg9(this.panelOption);
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0, 0);
    this.panelBG.position.setTo(0, 0);
    this.jewelryGroup.add(this.panelBG);

    this.jewelIcon.scale.setTo(0.6, 0.6);
    this.jewelIcon.anchor.setTo(0.5);
    this.jewelIcon.position.setTo(this.panelBG.position.x + 50, this.panelBG.position.y + 40);
    this.jewelIcon.inputEnabled = true;
    this.jewelIcon.events.onInputUp.add( function () {
        // if(Define.GOOGLE_SHEETS_DATA === false) return;
        //this.OnClickDebugEvent_AddJewelry()
    }.bind(this) );        // Debug.. 쥬얼리 100씩 추가
    this.panelBG.addChild(this.jewelIcon);
    this.jewelryGroup.add(this.jewelIcon);

    // 상단 쥬얼리 추가 버튼
    //this.plusJewelButton.scale.setTo(1);
    //this.plusJewelButton.anchor.setTo(0.5);
    //this.plusJewelButton.position.setTo(this.panelBG.position.x + 250, this.panelBG.position.y + 40);
    //this.plusJewelButton.inputEnabled = true;
    //this.plusJewelButton.events.onInputUp.add( function () {shopManager.OpenJewelShopWindow()} );
    //this.panelBG.addChild(this.plusJewelButton);
    //this.jewelryGroup.add(this.plusJewelButton);

    // 상단 쥬얼리 카운터 text
    this.jewelryCountText.anchor.setTo(0.5);
    this.jewelryCountText.position.setTo(this.panelBG.position.x + 147, this.panelBG.position.y + 40);
    this.jewelryCountText.setText(uData.nJewelryCount);
    // this.jewelryCountText.tint = 0x555555;
    this.jewelryCountText.alpha = 0.6;
    this.jewelryCountText.align = 'center';
    this.jewelryGroup.add(this.jewelryCountText);

    this.jewelryGroup.position.setTo(20, 20);


    this.tutorialButton.scale.setTo(1);
    this.tutorialButton.anchor.setTo(0.5);
    //this.tutorialButton.inputEnabled = true;
    //this.tutorialButton.events.onInputUp.add();
    this.panelBG.addChild(this.tutorialButton);
    this.commonUIGroup.add(this.tutorialButton);

    // 사운드 On 버튼
    this.soundButton_ON.scale.setTo(1);
    this.soundButton_ON.anchor.setTo(0.5);
    this.soundButton_ON.inputEnabled = true;
    this.soundButton_ON.events.onInputUp.add( function () {this.OnClickEvent_SoundButton()}.bind(this) );
    //this.soundButton_ON.visible = false;
    this.commonUIGroup.add(this.soundButton_ON);

    // 사운드 Off 버튼
    this.soundButton_OFF.scale.setTo(1);
    this.soundButton_OFF.anchor.setTo(0.5);
    this.soundButton_OFF.inputEnabled = true;
    this.soundButton_OFF.events.onInputUp.add( function () {this.OnClickEvent_SoundButton()}.bind(this) );
    //this.soundButton_OFF.visible = false;
    this.commonUIGroup.add(this.soundButton_OFF);

    MG.game.world.bringToTop(this.commonUIGroup);
    MG.game.world.bringToTop(this.jewelryGroup);

    // 사운드 설정 버튼
    UI_TopCommon.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF);

    this.VisibleWindow(false);
};

UI_TopCommon.prototype.VisibleWindow = function (b) {
    this.commonUIGroup.visible = b;
    this.jewelryGroup.visible = b;

    if(b)
    {
        UI_TopCommon.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF);
        MG.game.world.bringToTop(this.commonUIGroup);
        MG.game.world.bringToTop(this.jewelryGroup);
    }
};

UI_TopCommon.prototype.Using_View_Jewelry_Part = function (b) {
    if(currentScene == 'game' || currentScene == 'continueWindow') this.jewelryGroup.visible = b;
    if(b) {
        this.jewelryGroup.position.setTo(55, 220);
    } else {
        this.jewelryGroup.position.setTo(20, 20);
    }

    this.jewelryCountText.setText(uData.nJewelryCount);
    MG.game.world.bringToTop(this.jewelryGroup);
};

UI_TopCommon.prototype.SetSoundIcons = function (soundON, soundOFF) {
    if(StorageManager.prototype.get('isSfx'))
    {
        soundON.position.setTo(MG.game.world.width - 60, 60);
        soundOFF.position.setTo(MG.game.world.width - 60, -60);
    }
    else
    {
        soundON.position.setTo(MG.game.world.width - 60, -60);
        soundOFF.position.setTo(MG.game.world.width - 60, 60);
    }
};

UI_TopCommon.prototype.OnClickEvent_SoundButton = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
    if(this.soundButton_ON.visible) actionManager.Button_Click_Effect(this.soundButton_ON);
    if(this.soundButton_OFF.visible) actionManager.Button_Click_Effect(this.soundButton_OFF);
    MG.game.time.events.add(300, this.OnClickEvent_SoundButton_Start, this);
};

UI_TopCommon.prototype.OnClickEvent_SoundButton_Start = function () {
    if(StorageManager.prototype.get('isSfx')) {
        MG.AudioSwitch(StorageManager.prototype.get('isSfx'));
        uData.isSfx = false;
        uData.isBGM = false;
        isPlaying_TitleBGM = false;
        MG.StopBgm('bgm_title');
    } else {
        MG.AudioSwitch(StorageManager.prototype.get('isSfx'));
        uData.isSfx = true;
        uData.isBGM = true;
        isPlaying_TitleBGM = true;
        MG.PlayBgm('bgm_title', true);
    }


    // uData.isSfx = !uData.isSfx;
    // StorageManager.prototype.set('isSfx', uData.isSfx);
    UI_TopCommon.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF);
};



UI_TopCommon.prototype.SetJewelryCount = function () {
    this.jewelryCountText.setText(uData.nJewelryCount);
};

UI_TopCommon.prototype.OnClickDebugEvent_AddJewelry = function () {
    uData.nJewelryCount += 100;
    StorageManager.prototype.set('nJewelryCount', uData.nJewelryCount);
    this.jewelryCountText.setText(uData.nJewelryCount);
};

UI_TopCommon.prototype.BringToTop_Jewelry = function () {
    MG.game.world.bringToTop(this.jewelryGroup);
};