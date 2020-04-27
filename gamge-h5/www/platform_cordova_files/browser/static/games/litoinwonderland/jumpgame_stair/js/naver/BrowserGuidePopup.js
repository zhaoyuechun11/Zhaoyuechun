/**
 * ie11 이하의 경우 다른 브라우저에서 플레이 하도록 권유하는 팝업 노출
 * Created by juho on 2018-07-03.
 */
gc.BrowserGuidePopup = function() {
    PIXI.Container.call(this);

    this.isHide = false;

    this.darkBg = new PIXI.Graphics();
    this.darkBg.beginFill(0x000, 0.8);
    this.darkBg.drawRect(0, 0, gc.width, gc.height);
    this.darkBg.endFill();

    // 배경
    this.bg = new PIXI.Sprite.fromFrame('popup_bg5.png');
    this.bg.anchor.set(0.5);
    this.bg.x = gc.width/2;
    this.bg.y = gc.height/2;

    // 확인 버튼
    this.checkIcon = new PIXI.Sprite.fromFrame('check.png');
    this.checkIcon.anchor.set(0.5);
    this.checkIcon.x = -250;
    this.checkIcon.y = 160;
    this.bg.addChild(this.checkIcon);

    // 배경
    this.checkBtn = new PIXI.Graphics();
    this.checkBtn.beginFill(0x000, 0);
    this.checkBtn.drawRect(0, 0, 300, 60);
    this.checkBtn.endFill();
    this.checkBtn.x = -270;
    this.checkBtn.y = 130;

    this.setTouchStartAction(this.checkIcon);
    this.setTouchEnd(this.checkBtn, function(){
        this.isHide = !this.isHide;
        if(this.isHide){
            this.checkIcon.alpha = 1;
            LocalStorage.storageSet(LocalStorage.BROWSER_DATE, Util.getNowDate());
        }else{
            this.checkIcon.alpha = 0;
            LocalStorage.storageSet(LocalStorage.BROWSER_DATE, '');
        }

    }, this);
    this.bg.addChild(this.checkBtn);

    // 확인 버튼
    this.btn = new PIXI.Sprite.fromFrame('popup_bt_ok.png');
    this.btn.anchor.set(0.5);
    this.btn.y = 67;
    this.setTouchStartAction(this.btn);
    this.setTouchEnd(this.btn, this.closePopup, this);
    this.bg.addChild(this.btn);
};
gc.BrowserGuidePopup.prototype.constructor = gc.BrowserGuidePopup;
gc.BrowserGuidePopup.prototype = Object.create(PIXI.Container.prototype);

// 초기화
gc.BrowserGuidePopup.prototype.init = function(){
    this.removeAll();

    this.checkIcon.alpha = 0;

    this.addChild(this.darkBg);
    this.addChild(this.bg);

    this.bg.scale.set(0.1);
    TweenMax.to(this.bg.scale, 0.2, {x:1, y:1, ease:Back.easeOut, onComplete:this.endBgMotion.bind(this)});
};

gc.BrowserGuidePopup.prototype.endBgMotion = function(){
    this.setInteractive(true);
};

/**
 * 팝업닫기
 */
gc.BrowserGuidePopup.prototype.closePopup = function(){
    this.setInteractive(false);
    TweenMax.to(this.bg.scale, 0.2, {x:0, y:0, ease:Back.easeIn, onComplete:(function(){
        this.removeAll();
        gc.isIE11GuidePopup = false;
        this.emit('BROWSER_GUIDE_POPUP_EVENT');
    }).bind(this)});
};

// 화면에서 모두 삭제
gc.BrowserGuidePopup.prototype.removeAll = function(){
    this.removeChildren();
};

// 버튼 활성화 설정
gc.BrowserGuidePopup.prototype.setInteractive = function(bool){
    this.btn.interactive = bool;
    this.checkBtn.interactive = bool;
};

gc.BrowserGuidePopup.prototype.updateTransform = function() {
    PIXI.Container.prototype.updateTransform.call( this );
};