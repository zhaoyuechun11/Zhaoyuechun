/**
 * Created by admin on 2018-06-22.
 */
gc.SpineManager = function () {
    PIXI.Container.call(this);

    this.spineObjList = [];
    this.animate();
};

gc.SpineManager.constructor = gc.SpineManager;
gc.SpineManager.prototype = Object.create(PIXI.Container.prototype);

//배열 추가
gc.SpineManager.prototype.pushList = function (obj) {
    this.spineObjList.push(obj);
};

//배열 오브젝트 제거
gc.SpineManager.prototype.removeObj = function (obj) {
    for(var i=0; i<this.spineObjList.length; i++) {
        if(this.spineObjList[i] === obj) {
            this.spineObjList.splice(i, 1);
            break;
        }
    }
};

//배열 초기화
gc.SpineManager.prototype.resetList = function () {
    this.spineObjList = [];
};

//이미지까지 초기화하는 애니 실행
gc.SpineManager.prototype.setupPlayAnimate = function (obj, aniname, loop) {
    this.resetAnimateFull(obj);
    if(aniname == "item_appear") obj.state.timeScale = 2;
    var aniObj = obj.state.setAnimation(0, aniname, loop);

    if(aniname == "cha_landing")
        obj.state.addAnimation(0, "cha_basic", true, aniObj.animationEnd);//착지 성공 후 서있는 애니 실행
    else if(aniname == "portal_appear")
        obj.state.addAnimation(0, "portal_normal", true, aniObj.animationEnd);//포탈 생성 후 기본 애니 실행
    else if(aniname == "item_appear")
        obj.state.addAnimation(0, "item_normal", true, aniObj.animationEnd);//아이템 생성 후 기본 애니 실행
};

//트랙만 초기화 하고 제거하고 애니 실행
gc.SpineManager.prototype.playAnimate = function (obj, aniname, loop) {
    this.resetAnimate(obj);
    var aniObj = obj.state.setAnimation(0, aniname, loop);
};

gc.SpineManager.prototype.resetAnimate = function (obj) {
    obj.state.clearTracks();
};

//발판의 경우 최초 세팅 이미지가 다를 수 있으므로(장애물 발판의 경우) 맨 위의 발판 이미지만 최초 이미지로 설정시킴
gc.SpineManager.prototype.resetAnimateFull = function(obj) {
    this.resetAnimate(obj);
    obj.skeleton.setToSetupPose();
};

//스파인 리스너
gc.SpineManager.prototype.setSpineListener = function (obj) {
    obj.state.addListener({
        start:(function (t) {
            if(t.animation.name == "item_normal") {
                obj.state.timeScale = 1;
            }
            else if(t.animation.name == "t_perfect" || t.animation.name == "t_good" || t.animation.name == "t_excellent") {
                obj.state.timeScale = 1.3;
                obj.update(0.02);
            }
            else if(t.animation.name == "item_get") {
                obj.state.timeScale = 4;
            }
            else if(t.animation.name == "t_fever") {
                obj.state.timeScale = 1.5;
                gc.item.onFeverEffect();
            }
        }).bind(this),
        event:(function (t, event) {
            if (t.animation.name == "cha_fail_over" && event.data.name == "cha_event1") {
                gc.game.checkDepth(gc.game.myCha.img.x);//이벤트를 받을 때 유저 오브젝트 이미지 위치로 레이어 설정
            }
            else if(t.animation.name == "cha_fail_over2" && event.data.name == "cha_event1") {
                if(!gc.game.onWarn) {
                    if (gc.game.obstacle.offLight) gc.game.setMidContainer(0);//유저가 가장 위에 있게
                    else gc.game.setMidContainer(1);//유저가 가장 아래로..발판 뒤로 보내기 위함
                }
            }
            else if(t.animation.name == "firework") {
                if(gc.onFx) {
                    var volume = 0;
                    if(event.data.name == "event_fire1") volume = 1;
                    else if(event.data.name == "event_fire2") volume = 0.6;
                    else if(event.data.name == "event_fire3") volume = 0.9;
                    else if(event.data.name == "event_fire4") volume = 0.4;

                    GD.soundPlay('sound_firework1', volume + 0.2);
                    GD.soundPlay('sound_firework2', volume);
                    GD.soundPlay('sound_firework3', volume);
                }
            }
        }).bind(this),
        complete: (function (t) {
            var resetList = ["item_get", "item_gauge", "t_perfect", "t_excellent", "t_good", "t_fever", "scoreEf", "lyto_happy", "lyto_danger"];
            for(var i=0; i<resetList.length; i++) {
                if(t.animation.name == resetList[i]) {
                    this.resetAnimate(obj);
                    break;
                }
            }

            if(t.animation.name == 'intro') {
                if(gc.intro && gc.intro.bg) {
                    var time = this.getEventTime(gc.intro.bg, 'intro', 'event_loop');
                    gc.intro.introAnimateLoop(obj, time);
                }
            }
            else if(t.animation.name == "scoreEf") {
                gc.game.scoreEfOver();
            }
            else if(t.animation.name == "cut") {
                gc.cutScene.cutAnimateOver(obj);
                this.removeSpineListener(obj);
                removeObject(obj);
            }
            else if(t.animation.name == 'firework') {
                this.removeSpineListener(obj);
            }
            else if(t.animation.name == "t_fever") {
                gc.item.offFeverEffect();
            }
            else {
                var gameoverList = ["cha_fail_over", "cha_fail_over2", "cha_fail_hit", "cha_fail_miss"];
                for(var i=0; i<gameoverList.length; i++) {
                    if(t.animation.name == gameoverList[i]) {
                        gameOver();
                        break;
                    }
                }
            }
        }).bind(this),
        end:(function (t) {
            var removeList = ["item_get", "item_gauge", "t_perfect", "t_excellent", "t_good", "t_fever", "scoreEf", "lyto_happy", "lyto_danger"];
            for(var i=0; i<removeList.length; i++) {
                if(t.animation.name == removeList[i]) {
                    //캐릭터 이모티콘 비활성화 설정
                    if(t.animation.name == "lyto_happy" || t.animation.name == "lyto_danger")
                        gc.game.myCha.onEmo = false;
                    removeObject(obj);
                    break;
                }
            }
        }).bind(this)
    });
};

//이벤트 타임 찾기
gc.SpineManager.prototype.getEventTime = function (obj, ani, event) {
    //인트로 애니메이션 루프타임 찾기
    var time;
    if(obj) {
        var data = obj.skeleton.data;
        var ani = data.findAnimation(ani);
        for (var i = 0; i < ani.timelines.length; i++) {
            if (ani.timelines[i].events) {
                var ev = ani.timelines[i];
                for (var j = 0; j < ev.events.length; j++) {
                    if (ev.events[j].data.name == event) {
                        time = ev.events[j].time;
                    }
                }
            }
        }
    }

    return time;
}

//리스너 제거
gc.SpineManager.prototype.removeSpineListener = function (obj) {
    obj.state.clearListeners();
};

//애니메이션 실행 시 자동 업데이트
gc.SpineManager.prototype.animate = function () {
    requestAnimationFrame(this.animate.bind(this));

    for(var i=0; i<this.spineObjList.length; i++) {
        if(this.spineObjList[i]) {
            if(this.spineObjList[i].state.getCurrent(0) !== null) {
                this.spineObjList[i].update(0.01);
            }
        }
        else {
            this.spineObjList.splice(i, 1);
            break;
        }
    }
};

gc.SpineManager.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};