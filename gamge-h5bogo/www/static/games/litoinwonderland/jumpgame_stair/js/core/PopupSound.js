/**
 * Created by admin on 2018-06-07.
 */
gc.PopupSound = function () {
    PIXI.Container.call(this);

    this.bgBlack = GraphicManager.drawRect(gc.width, gc.height, "0X000000");
    this.bgBlack.alpha = 0.7;
    this.bg = new PIXI.Sprite.fromFrame("popup_bg_sound1.png");
    this.bg.anchor.set(0.5);

    this.btnClose = new PIXI.Sprite.fromFrame("popup_btn_close.png");
    this.btnClose.anchor.set(0.5);
    bm.buttonEvent(this.btnClose, true, null, null, this.closeSoundPopup.bind(this));

    this.btnBgm = new PIXI.Sprite.fromFrame("popup_btn_sound1_off.png");
    this.btnBgm.anchor.set(0.5);
    bm.buttonEvent(this.btnBgm, true, null, null, this.setBgm.bind(this));

    this.btnFx = new PIXI.Sprite.fromFrame("popup_btn_sound2_off.png");
    this.btnFx.anchor.set(0.5);
    bm.buttonEvent(this.btnFx, true, null, null, this.setFx.bind(this));

    this.btnRestart = new PIXI.Sprite.fromFrame("popup_btn_restart.png");
    this.btnRestart.anchor.set(0.5);
    bm.buttonEvent(this.btnRestart, true, null, null, (function () {
        gc.pauseGame = false;
        this.setInteractive(false);
        GD.stage.removeChild(this);

        gc.chapter = 1;
        onGame();
    }).bind(this));
};

gc.PopupSound.constructor = gc.PopupSound;
gc.PopupSound.prototype = Object.create(PIXI.Container.prototype);

gc.PopupSound.prototype.onSoundPopup = function () {
    this.reset();

    this.setBgImg();
    this.setButtonImage();
    this.setPosition();

    this.bg.addChild(this.btnBgm);
    this.bg.addChild(this.btnFx);
    this.bg.addChild(this.btnClose);
    this.addChild(this.bgBlack);
    this.addChild(this.bg);

    if(gc.game) {
        this.bg.addChild(this.btnRestart);
        gc.game.pause();
    }

    var time = 0.1;
    TweenMax.fromTo(this.bg.scale, time, {x:0, y:0}, {x:1.05, y:1.05, onComplete:(function () {
        TweenMax.to(this.bg.scale, time/2, {x:1, y:1, onComplete:(function () {
            this.bg.scale.x = 1;
            this.bg.scale.y = 1;
            this.setInteractive(true);
        }).bind(this)});
    }).bind(this)});
    GD.stage.addChild(this);
};

gc.PopupSound.prototype.closeSoundPopup = function () {
    gc.pauseGame = false;
    var time = 0.1;
    this.bg.scale.x = 1;
    this.bg.scale.y = 1;

    TweenMax.to(this.bg.scale, time, {x:1.1, y:1.1, onComplete:(function () {
        TweenMax.to(this.bg.scale, time/2, {x:0, y:0, onComplete:(function () {
            GD.stage.removeChild(this);

            if(gc.intro) {
                gc.intro.setInteractive(true);
            }
            else if(gc.game) {
                gc.game.resume();
            }
        }).bind(this)});
    }).bind(this)});
};

//배경 이미지
gc.PopupSound.prototype.setBgImg = function () {
    if(gc.intro) this.bg.texture = PIXI.Texture.fromFrame("popup_bg_sound2.png");
    else if(gc.game) this.bg.texture = PIXI.Texture.fromFrame("popup_bg_sound1.png");

    this.bg.scale.x = 1;
    this.bg.scale.y = 1;
};

//버튼 이미지 활성화 설정
gc.PopupSound.prototype.setButtonImage = function () {
    if(gc.onBgm) this.btnBgm.texture = PIXI.Texture.fromFrame("popup_btn_sound1_on.png");
    else this.btnBgm.texture = PIXI.Texture.fromFrame("popup_btn_sound1_off.png");
    if(gc.onFx) this.btnFx.texture = PIXI.Texture.fromFrame("popup_btn_sound2_on.png");
    else this.btnFx.texture = PIXI.Texture.fromFrame("popup_btn_sound2_off.png");
};

//좌표 설정
gc.PopupSound.prototype.setPosition = function () {
    this.bg.x = gc.width/2;
    this.bg.y = gc.height/2;

    var gap = 60;
    this.btnClose.x = this.bg.width/2 - 50;
    this.btnClose.y = -this.bg.height/2 + gap;

    if(gc.intro) {
        gap = this.btnBgm.height + 40;
        this.btnBgm.y = -this.bg.height/2 + 190;
        this.btnFx.y = this.btnBgm.y + gap;
        this.btnRestart.y = this.btnFx.y + gap;
    }
    else if(gc.game) {
        gap = this.btnBgm.height + 10;
        this.btnBgm.y = -this.bg.height/2 + 185;
        this.btnFx.y = this.btnBgm.y + gap;
        gap += 30;
        this.btnRestart.y = this.btnFx.y + gap;
    }
    this.btnBgm.x = 0;
    this.btnFx.x = this.btnBgm.x;
    this.btnRestart.x = this.btnBgm.x;
};

//배경음 설정
gc.PopupSound.prototype.setBgm = function () {
    gc.onBgm = !gc.onBgm;
    if(gc.game) {
        if(!gc.onBgm) GD.bgmStop();
        else GD.bgmPlay(0.8);
    }
    this.setButtonImage();
};

//효과음 설정
gc.PopupSound.prototype.setFx = function () {
    gc.onFx = !gc.onFx;
    this.setButtonImage();
};

gc.PopupSound.prototype.setInteractive = function (bool) {
    this.btnClose.interactive = bool;
    this.btnBgm.interactive = bool;
    this.btnFx.interactive = bool;
    if(getIE11()) this.btnFx.interactive = false;
    this.btnRestart.interactive = bool;
};

gc.PopupSound.prototype.reset = function () {
    this.removeChildren();
    this.bg.removeChildren();
};

gc.PopupSound.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};