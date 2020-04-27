/**
 * Created by admin on 2018-06-19.
 */
gc.CutScene = function () {
    PIXI.Container.call(this);
    this.skipBg = new PIXI.Sprite();
    bm.buttonEvent(this.skipBg, false, this.skipCutScene.bind(this));
};

gc.CutScene.constructor = gc.CutScene;
gc.CutScene.prototype = Object.create(PIXI.Container.prototype);

//------------초기화
gc.CutScene.prototype.init = function () {
    this.reset();
    this.skipBg.width = gc.width;
    this.skipBg.height = gc.height;
    this.addChildAt(this.skipBg, 0);

    return this;
};

//컷씬 스킵
gc.CutScene.prototype.skipCutScene = function () {
    if (this.cutTweener) this.cutTweener.kill(false);
    if(this.cutType == 0) {//스타트 컷씬
        var info = this.findCut(this.cutType);
        //컷씬 닫기
        if (!this.offCut) {
            this.offSlide(info.img);
            return;
        }
    }

    //소미가 아직 제자리로 올라가는 중
    if(gc.game.startSomiTweener) {
        gc.game.startSomiTweener.kill(false);
        gc.game.startSomiTweener = null;
        if(gc.onFx) {
            GD.soundPlay('sound_help');
            GD.soundPlay('sound_flap');
        }
        gc.somi.disappearSomi();
        // console.log("kill startSomiTweener 아직 자리에 못감")
    }
    //소미가 이미 자리에서 흔들리고 있음
    if(gc.game.startSomiEf) {
        // console.log("startSomiEf 소미 흔들리는 중");
        if(gc.game.startSomiEf.tweener) {
            // console.log("kill startSomiEf tweener 소미 흔들리기 죽이기");
            gc.game.startSomiEf.killTweener = true;
            gc.game.startSomiEf.tweener.kill(false);
            gc.somi.disappearSomi();
        }
        gc.game.startSomiEf.reset();
        gc.game.startSomiEf = null;
    }

    this.cutType = null;
    this.skipBg.interactive = false;
};

//컷씬 열림, 닫힘
gc.CutScene.prototype.onSlide = function (obj) {
    this.cutTweener = TweenMax.from(obj, 0.3, {x:gc.width*2});
};

gc.CutScene.prototype.offSlide = function (obj) {
    if(this.cutTweener) this.cutTweener.kill(false);//컷씬 강제 종료를 위함
    this.cutTweener = TweenMax.to(obj, 0.05, {x:obj.x - 20, onComplete:(function () {
        this.cutTweener = null;
        TweenMax.to(obj, 0.2, {x:gc.width*2.5, onComplete:(function () {
            var info = this.findObjectInfo(obj);
            if(info) {
                if(info.callback) info.callback();
                removeObject(info.img);
            }
        }).bind(this)});
    }).bind(this)});
    this.offCut = true;
};

//콜백함수가 있는지 확인
gc.CutScene.prototype.findObjectInfo = function (obj) {
    var info = null;
    for(var i=0; i<this.cutList.length; i++) {
        if(obj == this.cutList[i].img) {
            info = this.cutList[i];
            break;
        }
    }

    return info;
};

//필요한 컷씬 찾기
gc.CutScene.prototype.findCut = function (type, callBack) {
    var cut = null;
    for(var i=0; i<this.cutList.length; i++) {
        if(this.cutList[i].type == type) {
            cut = this.cutList[i];
            // cut.callback = callBack;
            break;
        }
    }

    if(!cut) {
        cut = this.makeCut(type, callBack);
    }

    return cut;
};

//컷씬 정보 만들기
gc.CutScene.prototype.makeCut = function (type, callBack) {
    var info = {}, cut_img, imgName;

    if(type == 0) {
        imgName = "cut_start";
    }
    cut_img = new PIXI.spine.Spine(GD.loader.resources[imgName].spineData);

    info = {type:type, img:cut_img, callback:callBack};
    this.cutList.push(info);
    return info;
};

//컷씬 실행
gc.CutScene.prototype.onCutScene = function (type, callBack) {
    this.skipBg.interactive = true;
    if(type == 0) {//게임 스타트 컷씬
        this.onStartCut(type, callBack);
    }
    this.cutType = type;
};

//게임 처음 시작할 때 소미 잡혀가는 컷
gc.CutScene.prototype.onStartCut = function (type, callBack) {
    var info = this.findCut(type, callBack);
    info.img.x = gc.width;
    info.img.y = gc.height*0.5;
    this.addChild(info.img);
    gc.spineManager.setSpineListener(info.img);
    this.onSlide(info.img);
    this.onCutAnimate(type, info.img);
};

//컷씬이 끝난 후 컷씬 사라지기
gc.CutScene.prototype.cutAnimateOver = function (obj) {
    if (!this.offCut) this.offSlide(obj);
    // else console.log("cutAnimateOver", "이미 컷 닫히는중");

};

//컷씬 애니메이션
gc.CutScene.prototype.onCutAnimate = function (type, obj) {
    var aniname = "cut";
    if(type == 0) aniname == "cut";
    gc.spineManager.setupPlayAnimate(obj, aniname, false);
};

//붙어있는 모든 컷씬 떼기
gc.CutScene.prototype.clearCutScene = function () {
    if(this.cutList) {
        for (var i = 0; i < this.cutList.length; i++) {
            gc.spineManager.removeSpineListener(this.cutList[i].img);
            gc.spineManager.resetAnimateFull(this.cutList[i].img);
            removeObject(this.cutList[i].img);
        }
    }
};

//------------리셋
gc.CutScene.prototype.reset = function () {
    this.cutList = [];
    this.offCut = false;//컷씬 닫힘 여부
    this.cutType = null;//현재 실행되고있는 컷씬 타입

};

gc.CutScene.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};