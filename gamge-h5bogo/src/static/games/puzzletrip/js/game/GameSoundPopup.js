gc.GameSoundPopup = function(){
    PIXI.Container.call(this);

    this.darkBg = new PIXI.Graphics();
    this.darkBg.lineStyle(1, 0x000, 1);
    this.darkBg.beginFill(0x000, 0.8);
    this.darkBg.drawRect(0, 0, gc.width, gc.height);
    this.darkBg.endFill();
    this.darkBg.interactive = true;
    this.setTouchEnd(this.darkBg);

    this.bg = PIXI.Sprite.fromFrame("popup_sound.png");
    this.bg.anchor.set(0.5);
    this.bg.x = GD.width/2;
    this.bg.y = GD.height/2;

    this.exitBtn = PIXI.Sprite.fromFrame("btn_exit.png");
    this.exitBtn.anchor.set(0.5);
    this.exitBtn.x = 230;
    this.exitBtn.y = -250;
    this.bg.addChild(this.exitBtn);

    this.bgmBtn = PIXI.Sprite.fromFrame("sound_btn_bg1.png");
    this.bgmBtn.anchor.set(0.5);
    this.bgmBtn.y = -10;
    this.bg.addChild(this.bgmBtn);

    this.effectBtn = PIXI.Sprite.fromFrame("sound_btn_effect1.png");
    this.effectBtn.anchor.set(0.5);
    this.effectBtn.y = 110;
    this.bg.addChild(this.effectBtn);

    this.setTouchStartAction(this.bgmBtn,this.clickedBgmBtn,this);
    this.setTouchStartAction(this.effectBtn,this.clickedEffectBtn,this);
    this.setTouchStart(this.exitBtn,this.closePopup,this);

};

gc.GameSoundPopup.constructor = gc.GameSoundPopup;
gc.GameSoundPopup.prototype = Object.create(PIXI.Container.prototype);

gc.GameSoundPopup.prototype.init = function () {
    this.removeAll();
    this.setInteractive(false);
    this.initBtnSta();
    this.addChild(this.darkBg);
    this.addChild(this.bg);

    this.bg.scale.set(0.1);
    TweenMax.to(this.bg.scale, 0.2, {x:1, y:1, ease:Back.easeOut, onComplete:this.endBgMotion.bind(this)});
};

gc.GameSoundPopup.prototype.endBgMotion = function () {
    this.setInteractive(true);
};

gc.GameSoundPopup.prototype.initBtnSta = function () {
    if(gc.bgmFlag){
        this.bgmBtn.texture = PIXI.Texture.fromFrame("sound_btn_bg1.png");
    }else{
        this.bgmBtn.texture = PIXI.Texture.fromFrame("sound_btn_bg2.png");
    }
    if(gc.soundFlag){
        this.effectBtn.texture = PIXI.Texture.fromFrame("sound_btn_effect1.png");
    }else{
        this.effectBtn.texture = PIXI.Texture.fromFrame("sound_btn_effect2.png");
    }
};

gc.GameSoundPopup.prototype.closePopup = function () {
    this.setInteractive(false);
    this.removeAll();
    this.emit("CLOSE_SOUND_POPUP");
};

gc.GameSoundPopup.prototype.clickedBgmBtn = function () {
    if(gc.bgmFlag){
        GD.bgmStop();
    }else{
        GD.bgmPlay(1);
    }
    gc.bgmFlag = !gc.bgmFlag;
    gc.setStorage(gc.storagebgm,gc.bgmFlag);
    this.initBtnSta();
};

gc.GameSoundPopup.prototype.clickedEffectBtn = function () {
    gc.soundFlag = !gc.soundFlag;
    gc.setStorage(gc.storagesound,gc.soundFlag);
    if(!gc.soundFlag) gc.stopAllEffectSound();
    this.initBtnSta();
};

gc.GameSoundPopup.prototype.setInteractive = function (bool) {
    this.bgmBtn.interactive = bool;
    this.effectBtn.interactive = bool;
    this.exitBtn.interactive = bool;
};

gc.GameSoundPopup.prototype.removeAll = function () {
    this.removeChildren();
};

gc.GameSoundPopup.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);

};