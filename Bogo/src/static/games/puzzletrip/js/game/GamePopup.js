gc.GamePopup = function(){
    PIXI.Container.call(this);
    this.shadow = PIXI.Sprite.fromFrame("puzzle_popup_shadow.png");
    this.popupSprite = PIXI.Sprite.fromFrame("ui_start1.png");
    this.popupSprite.anchor.set(0.5,0.5);
    this.popupSprite.x = GD.width/2;
    this.popupSprite.y = GD.height/2+200;
    this.tweenTime = 2;
    this.tweenMax = null;
    this.shadow.anchor.set(0.5,0);
    this.shadow.x = GD.width/2;
    this.shadow.y = GD.height*0.417;
    this.addChild(this.shadow);
    this.addChild(this.popupSprite);

    this.countryFlagSprite = PIXI.Sprite.fromFrame("ui_nation_0001.png");
    this.countryFlagSprite.anchor.set(0.5,0.5);
    this.countryFlagSprite.x = GD.width/2;
    this.countryFlagSprite.y = GD.height*0.7;

};

gc.GamePopup.constructor = gc.GamePopup;
gc.GamePopup.prototype = Object.create(PIXI.Container.prototype);
//타입에 따라 팝업창 띄우기
gc.GamePopup.prototype.showPopup = function (type) {

    if(this.tweenMax != null){
        this.tweenMax.kill(false);
    }

    var flag = true;

    if(type == 0){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_start");
        this.popupSprite.texture = PIXI.Texture.fromFrame("ui_start.png");
        this.removeChild(this.popupSprite);
        //flag = false;
    }else if(type == 1){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_stage");
        var num = Math.ceil(this.parent.stageNum/2);
        this.popupSprite.texture = PIXI.Texture.fromFrame('ui_nation_000'+num+".png");
        //this.removeChild(this.popupSprite);
        //flag = false;
    }else if(type == 2){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_clear");
        this.popupSprite.texture = PIXI.Texture.fromFrame("ui_clear1.png");
    }else if(type == 3){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_clear");
        this.popupSprite.texture = PIXI.Texture.fromFrame("ui_clear2.png");
    }else if(type == 4){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_gameover");
        this.popupSprite.texture = PIXI.Texture.fromFrame("ui_gameover.png");
    }else if(type == 5){
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_fever");
        this.popupSprite.texture = PIXI.Texture.fromFrame("ui_bonus.png");
    }else if(type == 6){
        if(gc.soundFlag && !gc.deviceStopFlag)
            GD.soundPlay("sound_stage");
        var num = Math.ceil(this.parent.stageNum/2);
        this.popupSprite.texture = PIXI.Texture.fromFrame("ui_nation_0001.png");
    }else{
        if(gc.soundFlag && !gc.deviceStopFlag)
        GD.soundPlay("sound_start");
        this.popupSprite.texture = PIXI.Texture.fromFrame("ui_start1.png");
        this.removeChild(this.popupSprite);
        flag = false;
    }

    if(flag) {
        this.addChild(this.popupSprite);
        if(gc.isLowPhone){
            this.popupSprite.scale.set(1);
            if (type == 0) {
                this.tweenMax = TweenMax.from(this.popupSprite.scale, this.tweenTime, {
                    x: 1, y: 1, onComplete: (function (type) {
                        this.parent.popupCloseCallBack(type);
                    }).bind(this), onCompleteParams: [type]
                });
            } else {
                this.tweenMax = TweenMax.from(this.popupSprite, this.tweenTime, {
                    y: "-=0", onComplete: (function (type) {
                        this.parent.popupCloseCallBack(type);
                    }).bind(this), onCompleteParams: [type]
                });
            }
        }else {
            if (type == 0) {
                this.tweenMax = TweenMax.from(this.popupSprite.scale, this.tweenTime, {
                    x: 0.2, y: 0.2, ease: Elastic.easeOut, onComplete: (function (type) {
                        this.parent.popupCloseCallBack(type);
                    }).bind(this), onCompleteParams: [type]
                });
            } else {
                this.tweenMax = TweenMax.from(this.popupSprite, this.tweenTime, {
                    y: -this.popupSprite.height / 2, ease: Elastic.easeOut, onComplete: (function (type) {
                        this.parent.popupCloseCallBack(type);
                    }).bind(this), onCompleteParams: [type]
                });
            }
        }
    }else{
        var num = Math.ceil(this.parent.stageNum/2);
        this.countryFlagSprite.texture = PIXI.Texture.fromFrame('ui_nation_000'+num+".png");
        this.addChild(this.countryFlagSprite);
        if(gc.isLowPhone){
            this.countryFlagSprite.scale.set(1);
            TweenMax.from(this.countryFlagSprite.scale, 0.5, {
                x: 1, y: 1, onComplete: (function () {
                    this.addChild(this.popupSprite);
                    this.popupSprite.y = GD.height/2;
                    this.tweenMax = TweenMax.from(this.popupSprite, this.tweenTime, {
                        delay: 0.5,
                        y: GD.height/2, onStart: (function () {
                            this.removeChild(this.countryFlagSprite);
                        }).bind(this), onComplete: (function (type) {
                            this.parent.popupCloseCallBack(type);
                        }).bind(this), onCompleteParams: [type]
                    });
                }).bind(this)
            });
        }else {
            TweenMax.from(this.countryFlagSprite.scale, 0.5, {
                x: 1.5, y: 1.5, onComplete: (function () {
                    this.addChild(this.popupSprite);
                    this.tweenMax = TweenMax.from(this.popupSprite, this.tweenTime, {
                        delay: 1,
                        y: -this.popupSprite.height / 2, ease: Elastic.easeOut, onStart: (function () {
                            this.removeChild(this.countryFlagSprite);
                        }).bind(this), onComplete: (function (type) {
                            this.parent.popupCloseCallBack(type);
                        }).bind(this), onCompleteParams: [type]
                    });
                }).bind(this)
            });
        }
    }
}

gc.GamePopup.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};