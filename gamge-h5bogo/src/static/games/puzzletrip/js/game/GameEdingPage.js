gc.GameEdingPage = function(){
    PIXI.Container.call(this);
    //배경
    this.endingBg = PIXI.Sprite.fromFrame("ending_bg.png");
    this.addChild(this.endingBg);

    this.karakter = PIXI.Sprite.fromFrame("ending_cha.png");
    this.karakter.anchor.set(0.5,0.5);
    this.karakter.x = GD.width/2;
    this.karakter.y = GD.height*0.755;

};

gc.GameEdingPage.constructor = gc.GameEdingPage;
gc.GameEdingPage.prototype = Object.create(PIXI.Container.prototype);
//앤딩 에니
gc.GameEdingPage.prototype.showChaAniamtion = function () {

    TweenMax.from(this.karakter,1,{delay:0.2,y:GD.height+this.karakter.height,onStart:(function () {
        this.addChild(this.karakter);
        try {
            clearInterval(this.parent.guidTime);
        }catch(e){

        }
    }).bind(this),ease:Back.easeOut,onComplete:(function () {
        TweenMax.to(this.karakter,2,{alpha:1,onComplete:(function () {
            gc.flag = 0;
            //GD.commonOption.finish(this.parent.totalScore);
            GD.soundAllStop();
            //this.removeChildren();
            this.parent.scoreSave();

        }).bind(this)});
    }).bind(this)});

}

gc.GameEdingPage.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};