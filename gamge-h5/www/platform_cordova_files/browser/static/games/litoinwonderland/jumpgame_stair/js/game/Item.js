/**
 * Created by admin on 2018-06-25.
 */
gc.ItemManager = function () {
    PIXI.Container.call(this);
    this.bg = new PIXI.Sprite.fromFrame("gauge_bg.png");
    this.bgGauge = new PIXI.Sprite.fromFrame("gauge.png");
    this.maskBg = GraphicManager.drawRect(this.bgGauge.width, this.bgGauge.height);
    this.itemList = ["fever"];
    this.itemImg = new PIXI.spine.Spine(GD.loader.resources["item"].spineData);
    this.feverEfTweener = [];
    gc.spineManager.pushList(this.itemImg);
    gc.spineManager.setSpineListener(this.itemImg);
};

gc.ItemManager.constructor = gc.ItemManager;
gc.ItemManager.prototype = Object.create(PIXI.Container.prototype);

//기본 세팅
gc.ItemManager.prototype.init = function () {
    this.reset();

    this.bgGauge.mask = this.maskBg;
    this.setMaskPos();

    this.addChild(this.bg);
    this.addChild(this.bgGauge);
    this.addChild(this.maskBg);

    return this;
};

//피버 게이지 추가
gc.ItemManager.prototype.addCharge = function (value) {
    // if(gc.progress.endStep - gc.progress.nowStep == 3) this.nowGauge = this.maxGauge;

    this.nowGauge += value;
    if(this.maskTweener) this.maskTweener.kill();//마스크 움직임 정지
    var y = this.maskBg.y;
    this.setMaskPos();
    this.maskTweener = TweenMax.from(this.maskBg, 0.1, {y:y});
};

//피버 게이지 감소
gc.ItemManager.prototype.reduceCharge = function () {
    this.nowGauge = 0;
    if(this.maskTweener) this.maskTweener.kill();//마스크 움직임 정지
    this.setMaskPos();
    this.maskTweener = TweenMax.from(this.maskBg, 2, {y:0});
    // console.log("아이템 충전 줄이기");
};

//아이템 생성 가능 여부
gc.ItemManager.prototype.checkItemGauge = function () {
    if(this.nowGauge >= this.maxGauge) return true;
    else return false;
};

//아이템 종류 선택
gc.ItemManager.prototype.chooseItem = function () {
    var rand = Math.floor(Math.random()*this.itemList.length);
    var item = this.itemList[rand];

    return item;
};

//아이템 이미지 배경에 붙임
gc.ItemManager.prototype.onItem = function (item) {
    this.onItemImg = true;
    //스킨적용 필요.. 추후 아이템 추가시 파라매터로 받아온 아이템 종류에 따른스킨 적용

    this.itemImg.autoUpdate = false;
    gc.spineManager.setupPlayAnimate(this.itemImg, "item_appear", false);
    this.addChild(this.itemImg);

    if(gc.onFx) GD.soundPlay('sound_feverappear');

    return this.itemImg;
};

//아이템 획득
gc.ItemManager.prototype.getItemImg = function () {
    this.onItemImg = false;
    this.itemImg.autoUpdate = false;
    gc.spineManager.setupPlayAnimate(this.itemImg, "item_get", false);

    //스킨 이름 확인법.. obj.skeleton.skin.name
    //아이템 획득, 피버모드 사운드
    if(gc.onFx) {
        //추후 아이템 추가시 스킨을 확인하여 어떤 아이템인지 확인
        GD.soundPlay("sound_feverget");//아이템 먹은 소리
        GD.soundPlay("sound_fevermode");//피버모드 소리
    }
};

//게이지 마스크 위치 설정
gc.ItemManager.prototype.setMaskPos = function () {
    var minPos = this.bgGauge.height;
    var gap = (minPos - 15)/this.maxGauge;
    var dist = gap * this.nowGauge;
    if(dist > this.bgGauge.height) dist = minPos;
    this.maskBg.y = minPos - dist;
};

//게이지 배경 이펙트
gc.ItemManager.prototype.onBgEffect = function () {
    if(!this.bgEf) {
        this.bgEf = new PIXI.spine.Spine(GD.loader.resources["item"].spineData);
        gc.spineManager.pushList(this.bgEf);
        this.bgEf.autoUpdate = false;
        gc.spineManager.setSpineListener(this.bgEf);
    }
    this.bgEf.x = this.bg.x + this.bg.width*0.5;
    this.bgEf.y = this.bg.y + this.bg.height*0.5;
    gc.spineManager.setupPlayAnimate(this.bgEf, "item_gauge", false);
    this.addChild(this.bgEf);
};

//피버 별 이펙트
gc.ItemManager.prototype.onFeverEffect = function () {
    if(this.feverEfTweener.length == 0) this.makeFeverEffectImg();

    var delayTime = 0.1, moveTime, target = null, posX, startY, endY, scale;
    for(var i=0; i<this.feverEfTweener.length; i++) {
        TweenMax.delayedCall(delayTime*i, (function (i) {
            scale = setRandScale();
            moveTime = 2 + Math.random()*2;//별이 보이는 시간: 3~5초
            target = this.feverEfTweener[i].img;
            //시작좌표, 끝좌표
            posX = setRandPosX();
            target.x = posX;
            startY = gc.height + target.height;
            endY = -target.height;
            //이미지 크기
            target.scale.x = scale;
            target.scale.y = scale;
            this.feverEfTweener[i].tweener = TweenMax.fromTo(target, moveTime, {y:startY, rotation:0}, {y:endY, rotation:Math.PI*6});
            gc.game.bgContainer.addChild(target);
        }).bind(this, i));
    }
    //타겟 이미지 크기 설정
    function setRandScale() {
        var scale  = 1, rand;
        rand = Math.floor(Math.random()*100);
        if(rand < 30) scale = 0.3;
        else if(rand < 60) scale = 0.5;
        else if(rand < 90) scale = 0.8;

        return scale;
    };

    //타겟 이미지 x좌표 설정
    function setRandPosX() {
        var pos, rand;
        rand = Math.floor(Math.random()*100);
        if(rand < 20) pos = Math.random()*(gc.width/2 - (target.width)) + gc.width/4;//가운데
        else if(rand < 60) pos = Math.random()*(gc.width/3 - (target.width)) + target.width/2;//외쪽 사이드
        else pos = Math.random()*(gc.width/3 - (target.width)) + target.width/2 + gc.width*0.7;//오른쪽 사이드

        return pos;
    };
};

//피버 별 없애기
gc.ItemManager.prototype.offFeverEffect = function () {
    // GD.soundStop('sound_fevermode');//피버모드 사운드 끄기.. 사운드 길이를 줄이기로
    for(var i=0; i<this.feverEfTweener.length; i++) {
        if(this.feverEfTweener[i].tweener) this.feverEfTweener[i].tweener.kill();
        this.feverEfTweener[i].tweener = null;
        removeObject(this.feverEfTweener[i].img);
    }
};

//피버 별 이펙트 이미지 생성
gc.ItemManager.prototype.makeFeverEffectImg = function () {
    var img = null, name = "fever_star";
    for (var i = 0; i < 20; i++) {
        name = "fever_star" + (Math.floor(Math.random()*4)+1);
        img = new PIXI.Sprite.fromFrame(name + ".png");
        img.anchor.set(0.5);
        this.feverEfTweener[i] = {tweener:null, img:img};
    }
};

//피버 상태 초기화
gc.ItemManager.prototype.reset = function () {
    this.offFeverEffect();
    this.maxGauge = 21;
    this.nowGauge = 0;
    this.onItemImg = false;

    this.maskTweener = null;
};

gc.ItemManager.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};