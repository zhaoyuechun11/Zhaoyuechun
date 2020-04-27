gc.GameScoreEffectContianer = function(){
    PIXI.Container.call(this);

    this.scoreTxtLists = [];
};

gc.GameScoreEffectContianer.constructor = gc.GameScoreEffectContianer;
gc.GameScoreEffectContianer.prototype = Object.create(PIXI.Container.prototype);

gc.GameScoreEffectContianer.prototype.init = function () {
    this.removeAll();
};

gc.GameScoreEffectContianer.prototype.showScore = function (score,x,y) {
    var scoreTxt = null,tween = null;
    if(this.scoreTxtLists.length > 0){
        scoreTxt = this.scoreTxtLists.shift();
    }else{
        scoreTxt = new gc.NumberText("ui_effec_score","center",-3);
    }
    scoreTxt.x = x;
    scoreTxt.y = y-20;
    this.addChild(scoreTxt);
    scoreTxt.setValue(score);

    scoreTxt.scale.set(1);
    scoreTxt.alpha = 1;
    tween = new TimelineMax();
    tween.to(scoreTxt.scale,0.3,{x:1.5,y:1.5,yoyo:true,repeat:0,ease:Elastic.easeOut});
    tween.to(scoreTxt,0.3,{y:"-=50",alpha:0.5,onComplete:(function (scoreTxt,tween) {
        try {
            this.removeChild(scoreTxt);
            tween.kill(false);
            tween = null;
        }catch(e){

        }
    }).bind(this),onCompleteParams:[scoreTxt,tween],ease:Sine.easeOut});
};

gc.GameScoreEffectContianer.prototype.removeAll = function () {
    this.removeChildren();
};

gc.GameScoreEffectContianer.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};