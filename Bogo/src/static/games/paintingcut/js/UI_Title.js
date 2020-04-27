
function UI_Title() {
    //this.title_Spine;
    this.uiGroup = MG.game.add.group();
    this.fullScreen_touchButton = MG.game.add.image(MG.game.world.centerX, 0, 'blank');
    this.startButton = MG.game.add.image(MG.game.world.centerX, MG.game.world.height - 170, 'blank');
    this.grade_all = MG.game.add.image(MG.game.world.width - 25, 25, 'atlas_UI', 'grade_all.png');
    this.soundButton_ON = MG.game.add.image(MG.game.world.centerX, MG.game.world.height + 100, 'atlas_UI', 'btn_sound_on.png');
    this.soundButton_OFF = MG.game.add.image(MG.game.world.centerX, MG.game.world.height + 100, 'atlas_UI', 'btn_sound_off.png');

    this.Load_TitleScene();
    this.VisibleWindow(false);
}

UI_Title.prototype.Load_TitleScene = function () {
    this.title_Spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'title');
    this.uiGroup.add(this.title_Spine);
    MG.game.world.bringToTop(this.title_Spine);
    this.title_Spine.setAnimationByName(0, "title_in", false);
    this.title_Spine.state.onComplete = function () {
        this.End_Title_Animation();
    }.bind(this);

    // Start 버튼
    this.startButton.scale.setTo(650, 100);
    this.startButton.anchor.setTo(0.5, 1);
    this.startButton.inputEnabled = true;
    this.startButton.events.onInputUp.add( function () {this.OnClickEvent_StartButton()}.bind(this) );
    this.uiGroup.add(this.startButton);

    // 화면전체 터치 버튼 (연출 애니메이션 종료)
    this.fullScreen_touchButton.scale.setTo(MG.game.world.width, MG.game.world.height - 150);
    this.fullScreen_touchButton.anchor.setTo(0.5, 0);
    this.fullScreen_touchButton.inputEnabled = true;
    this.fullScreen_touchButton.events.onInputUp.add( function () {this.End_Title_Animation()}.bind(this) );
    this.uiGroup.add(this.fullScreen_touchButton);

    // 전체이용가
    this.grade_all.scale.setTo(0.5);
    this.grade_all.anchor.setTo(1, 0);
    this.uiGroup.add(this.grade_all);

    // 사운드 On 버튼
    this.soundButton_ON.scale.setTo(1);
    this.soundButton_ON.anchor.setTo(0.5);
    this.soundButton_ON.inputEnabled = true;
    this.soundButton_ON.events.onInputUp.add( function () {this.OnClickEvent_SoundButton()}.bind(this) );
    //this.soundButton_ON.visible = false;
    this.uiGroup.add(this.soundButton_ON);

    // 사운드 Off 버튼
    this.soundButton_OFF.scale.setTo(1);
    this.soundButton_OFF.anchor.setTo(0.5);
    this.soundButton_OFF.inputEnabled = true;
    this.soundButton_OFF.events.onInputUp.add( function () {this.OnClickEvent_SoundButton()}.bind(this) );
    //this.soundButton_OFF.visible = false;
    this.uiGroup.add(this.soundButton_OFF);

    // Copyright...
    /*this.copyRightStyle = { font: "20px Arial", fill: "#FFFFFF", align: "center", fontWeight: "bold", strock: "#395d7b" };
    this.copyrightText = MG.game.add.text(MG.game.world.centerX, MG.game.world.height - 15, "Copyright Ⓒ 2018 GAME Co.,Ltd All rights reserved", this.copyRightStyle);
    this.copyrightText.anchor.setTo(0.5, 1);
    // this.copyrightText.strock = '#FF0000';
    this.copyrightText.strokeThickness = 3;
    this.uiGroup.add(this.copyrightText);*/
    //////////////////////////////////////////////////////////
    // Debug : Version Information
    // this.timerStyle = { font: "17px Arial", fill: "#666666", align: "right", fontWeight: "normal" };
    // this.timerText = MG.game.add.text(MG.game.world.width - 25, MG.game.world.height - 70, Define.CURRENT_VERSION.toString(), this.timerStyle);
    // this.timerText.anchor.setTo(1, 0.5);
    // this.uiGroup.add(this.timerText);
    //////////////////////////////////////////////////////////

    MG.game.world.bringToTop(this.uiGroup);
};

UI_Title.prototype.End_Title_Animation = function () {
    this.fullScreen_touchButton.visible = false;
    this.fullScreen_touchButton.scale.setTo(0);
    this.fullScreen_touchButton.inputEnabled = false;
    UI_Title.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF);
    // this.startButton.scale.setTo(MG.game.world.width, MG.game.world.height - 150);
    this.title_Spine.setAnimationByName(0, "title_idle", true);
    this.title_Spine.state.onComplete = function () {};
};

UI_Title.prototype.VisibleWindow = function (b) {
    this.uiGroup.visible = b;

    if(b)
    {
        MG.game.world.bringToTop(this.uiGroup);
    }
};

UI_Title.prototype.SetSoundIcons = function (soundON, soundOFF) {
    if(StorageManager.prototype.get('isSfx'))
    {
        soundON.position.setTo(MG.game.world.centerX, MG.game.world.height - 100);
        soundOFF.position.setTo(MG.game.world.centerX, MG.game.world.height + 100);
    }
    else
    {
        soundON.position.setTo(MG.game.world.centerX, MG.game.world.height + 100);
        soundOFF.position.setTo(MG.game.world.centerX, MG.game.world.height - 100);
    }
};

UI_Title.prototype.OnClickEvent_SoundButton = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');

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

    UI_Title.prototype.SetSoundIcons(this.soundButton_ON, this.soundButton_OFF);
};

// 초기화면의 Start Button을 눌렀다. 게임을 시작하자.
UI_Title.prototype.OnClickEvent_StartButton = function () {
    this.uiGroup.visible = false;
    actionManager.Button_Click_Effect(this.startButton);
    uiManager.OnClickEvent_StartButton();
};