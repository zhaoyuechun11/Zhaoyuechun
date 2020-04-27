/**
 * Created by juho on 2016-05-09.
 * 수정 chadol 2016-09-20
 */

NoHeartPopup = function() {
    this.darkBg = null;
    this.bg = null;
    this.txt = null;
    this.closeBtn = null;
    this.imgScale = 1.4;
    PIXI.Container.call(this);
};
NoHeartPopup.constructor = NoHeartPopup;
NoHeartPopup.prototype = Object.create(PIXI.Container.prototype);

// 초기화
NoHeartPopup.prototype.init = function(){
    this.removeChildren();

    if(!this.darkBg){
        this.darkBg = new PIXI.Graphics();
        this.darkBg.beginFill('0x000000', 0.9);
        this.darkBg.lineStyle(0, 0x000000, 0);
        this.darkBg.drawRect(0, 0, GD.width, GD.height);
        this.darkBg.endFill();
    }
    this.addChild(this.darkBg);

    if(!this.bg){
        this.bg = new PIXI.Sprite.fromFrame('popup_chance.png');
        this.bg.anchor.set(0.5);
        this.bg.scale.set(this.imgScale);
        this.bg.x = GD.width/2;
        this.bg.y = GD.height/2;
    }
    this.addChild(this.bg);

    // 재시작 버튼
    if(!this.closeBtn){
        this.closeBtn = new PIXI.Sprite.fromFrame('btn_identify.png');
        this.closeBtn.anchor.set(0.5);
        this.closeBtn.scale.set(this.imgScale)
        this.closeBtn.x = GD.width/2;
        this.closeBtn.y = GD.height/2 + 115;
        this.closeBtn.interactive = true;
        this.closeBtn.mousedown = this.closeBtn.touchstart = this.close.bind(this);
    }
    this.addChild(this.closeBtn);
};

NoHeartPopup.prototype.close = function()
{
    OcbApplicationJS.requestCloseWindow();
};


/*NoHeartPopup.prototype.updateTransform = function() {
    PIXI.Container.prototype.updateTransform.call( this );
};*/
