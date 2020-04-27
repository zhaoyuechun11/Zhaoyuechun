/**
 * Created by admin on 2018-06-14.
 */
gc.Somi = function () {
    PIXI.Container.call(this);

    this.somi = new PIXI.spine.Spine(GD.loader.resources["somi"].spineData);
};

gc.Somi.constructor = gc.Somi;
gc.Somi.prototype = Object.create(PIXI.Container.prototype);

gc.Somi.prototype.setSpineListener = function (obj) {
    var somiEventOn = false;
    if(obj == this.somi) {
        var data = obj.skeleton.data;
        var ani = data.findAnimation("ending");
        for (var i = 0; i < ani.timelines.length; i++) {
            if (ani.timelines[i].events) {
                var ev = ani.timelines[i];
                for (var j = 0; j < ev.events.length; j++) {
                    if (ev.events[j].data.name == "loop") {
                        var time = ev.events[j].time;
                    }
                }
            }
        }
    }

    obj.state.addListener({
        event: (function (t, event) {
            if (t.animation.name == "ending" && event.data.name == "loop") {
                somiEventOn = true;
                gc.game.onContinue();
            }
            else if (t.animation.name == "ending" && event.data.name == "event_ending") {
                if(gc.onFx) {
                    if(!somiEventOn) GD.soundPlay('sound_hit');
                }
            }
        }),
        complete: (function (t) {
            if (t.animation.name == "ending") {
                if(somiEventOn) {
                    this.somiEndingAnimateLoop(obj, time);
                }
            }
        }).bind(this)
    });
};

gc.Somi.prototype.removeSpineListener = function (obj) {
    obj.state.removeListener();
};

gc.Somi.prototype.init = function () {
    this.setSpineListener(this.somi);
    this.resetSomi();
    gc.spineManager.setupPlayAnimate(this.somi, "somi", true);

    return this.somi;
};

//화면 밖으로 날아가기
gc.Somi.prototype.disappearSomi = function () {
    // console.log('소미 화면 밖으로 올라가기');
    this.resetSomi();
    TweenMax.to(this.somi, 1, {y:-110, onComplete:(function () {
        //유저가 생성된 후 건너가야 할 발판 생성
        gc.maps.initFootHolds(gc.progress.nowStep+1, 1);
        gc.maps.setFootHoldDist();//유저와 다음 발판 사이 거리 계산

        var message = (gc.chapter == 1)?0:1;
        gc.game.onStateMessage(message);//게임 시작 문구
        gc.game.setInteractive(true);
        gc.game.onUI();
    }).bind(this)});
};

//화면으로 나타나기
gc.Somi.prototype.appearSomi = function () {
    this.resetSomi();
    TweenMax.from(this.somi, 1, {y:-250});
    if(gc.onFx) GD.soundPlay('sound_flap');//새가 등장하는 소리
};

//포탈로 넘어가기
gc.Somi.prototype.portalSomi = function () {
    if(gc.chapter != 5) {
        TweenMax.to(this.somi, 0.3, {x: gc.game.portal.x, y: gc.game.portal.y + 40, onComplete: (function () {
            if(gc.onFx) GD.soundPlay('sound_birdout');//새가 포탈로 들어가는 소리
            TweenMax.to(this.somi.scale, 0.1, {x: 0, y: 0, onComplete:(function () {
                var ef = gc.game.onHitEffect();
                this.setSpineListener(ef);
                ef.x = gc.game.portal.x;
                ef.y = gc.game.portal.y;
                gc.game.uiContainer.addChild(ef);
                removeObject(this.somi);
            }).bind(this)});
        }).bind(this)});
    }
};

//마지막 발판 위에 앉아있기
gc.Somi.prototype.sitOnLastFootHold = function (x, y) {
    TweenMax.to(this.somi, 1, {x:x, y:y});
};

//소미 상태 초기화
gc.Somi.prototype.resetSomi = function () {
    this.somi.scale.x = 1;
    this.somi.scale.y = 1;
    this.somi.rotation = 0;

    this.somi.x = gc.width*0.5;
    this.somi.y = 350;
};

//소미 애니메이션
gc.Somi.prototype.somiEndingAnimateLoop = function (obj, time) {
    obj.state.clearTracks();
    var update = time;
    var aniname = "ending";
    obj.state.setAnimation(0, aniname, false, 0);
    obj.state.update(update);
    obj.state.apply(obj.skeleton);
};

gc.Somi.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};