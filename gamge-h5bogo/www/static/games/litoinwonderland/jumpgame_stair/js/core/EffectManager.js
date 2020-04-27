/**
 * Created by admin on 2018-06-14.
 */
var em = {
    killTweener:false,
    tweener:null
};

em.bumpToY = function (obj, time, addScale, returnFunc) {
    var originScale = obj.scale.y;

    this.tweener = TweenMax.to(obj.scale, time, {ease:Power0.easeNone, y:originScale + addScale, onComplete:(function () {
        this.tweener = TweenMax.to(obj.scale, time, {ease:Power0.easeNone, y:originScale, onComplete:(function () {
            this.tweener = null;
            if(returnFunc) returnFunc();
        }).bind(this)});
    }).bind(this)});
};

em.bumpFromToX = function (obj, time, minScale, maxScale, endScale, returnFunc) {
    this.tweener = TweenMax.fromTo(obj.scale, time, {x:minScale}, {x:maxScale, onComplete:(function () {
        this.tweener = TweenMax.to(obj.scale, time/2, {x:endScale, onComplete:(function () {
            this.tweener = null;
            if(returnFunc) returnFunc();
        }).bind(this)});
    }).bind(this)});
}

em.floatByY = function (obj, time, dist, repeatTime, returnFunc) {
    var originY = obj.y;
    //올라가기
    if(!this.killTweener) upTween.bind(this)();
    function upTween() {
        this.tweener = TweenMax.to(obj, time*0.25, {ease:Power0.easeNone, y:originY - dist, onComplete:(function () {
            if(!this.killTweener) downTween.bind(this)();
        }).bind(this)});
    };

    //아래로 내려가기
    function downTween() {
        this.tweener = TweenMax.to(obj, time*0.5, {ease:Power0.easeNone, y:originY + dist, onComplete:(function () {
            if(!this.killTweener) originTween.bind(this)();
        }).bind(this)});
    }

    //원래 자리로 돌아가기
    function originTween() {
        this.tweener = TweenMax.to(obj, time*0.25, {ease:Power0.easeNone, y:originY, onComplete:(function () {
            if(repeatTime >= 1) {
                repeatTime--;
                if(!this.killTweener) em.floatByY(obj, time, dist, repeatTime, returnFunc);
            }
            else {
                if(!this.killTweener) if(returnFunc) returnFunc();
                this.reset();
            }
        }).bind(this)});
    }
};

em.reset = function () {
    if(this.tweener) this.tweener.kill(false);
    this.tweener = null;
    this.killTweener = false;
};