/**
 * Created by admin on 2018-05-15.
 */
gc.Progress = function () {
    PIXI.Container.call(this);

    this.mainContainer = new PIXI.Container();
    this.fillContainer = new PIXI.Container();
    this.progressDia =  new PIXI.spine.Spine(GD.loader.resources["target"].spineData);
    this.progressbar = new PIXI.Sprite.fromFrame("navigation_bg.png");
    this.progresspin = new PIXI.Sprite.fromFrame("navigation_bar.png");

    //가이드라인 진행률 채우기
    this.fill_s = new PIXI.Sprite.fromFrame('navigation_bg1.png');//시작점
    this.fill_m = new PIXI.Sprite.fromFrame('navigation_bg2.png');//중간
    this.fill_l = new PIXI.Sprite.fromFrame('navigation_bg3.png');//끝

    this.setEndStepList();
    this.nowStep = 0;
};

gc.Progress.constructor = gc.Progress;
gc.Progress.prototype = Object.create(PIXI.Container.prototype);

//진행 바 이미지 전달
gc.Progress.prototype.init = function() {
    this.setEndStepList();
    this.setEndStep();
    this.progressDia.x = this.progressbar.width + 30;
    gc.spineManager.setupPlayAnimate(this.progressDia, "target", true);

    this.progressbar.anchor.y = 0.5;
    this.progresspin.anchor.x = 0.5;
    this.progresspin.anchor.y = 0;
    this.progresspin.y = 5;

    //채우기 이미지 시작 이미지
    this.fill_s.anchor.x = 1;
    this.fill_s.anchor.y = 0.5;
    //채우기 이미지 끝 이미지
    this.fill_l.anchor.y = 0.5;
    //채우기 이미지 중간 이미지
    this.fill_m.anchor.y = 0.5;

    this.setNowPosition();

    this.mainContainer.addChild(this.progressDia);
    this.mainContainer.addChild(this.progressbar);
    this.mainContainer.addChild(this.progresspin);
    this.mainContainer.addChild(this.fillContainer);

    return this.mainContainer;
};

//발판 개수 설정
gc.Progress.prototype.setEndStepList = function () {
    this.endStepList = [30, 50, 60, 60, 60];//발판 총 개수
    if(gc.progressType == 1) this.endStepList = [5, 5, 5, 5, 5];
};

//진행바 목표점 설정
gc.Progress.prototype.setEndStep = function() {//현재 챕터 1부터 시작
    this.endStep = this.endStepList[gc.chapter-1];
};

//현재 스텝
gc.Progress.prototype.addStep = function() {
    this.nowStep++;
    this.setNowPosition();
};

//현재 스텝 초기화
gc.Progress.prototype.resetNowStep = function () {
    this.nowStep = 0;
    this.setNowPosition();
};

//현재 진행률에 맞춘 좌표
gc.Progress.prototype.setNowPosition = function () {
    this.progresspin.x = this.progressbar.width/this.endStep * this.nowStep;
    if(this.nowStep != 0) {
        var moveTime = 0.2;
        TweenMax.from(this.progresspin, moveTime, {x:this.progressbar.width/this.endStep * (this.nowStep-1)});
        TweenMax.to(this.progresspin.scale, moveTime/2, {x:1.2, y:1.2, onComplete:(function () {
            TweenMax.to(this.progresspin.scale, moveTime/2, {x:1, y:1});
        }).bind(this)});
    }

    this.setFillImage();//진행바 채우는 이미지 설정
};

gc.Progress.prototype.setFillImage = function () {
    this.fill_l.x = this.progresspin.x;
    this.fill_m.width = this.fill_l.x - this.fill_s.x;

    this.fillContainer.addChild(this.fill_s);
    this.fillContainer.addChild(this.fill_m);
    this.fillContainer.addChild(this.fill_l);
};

gc.Progress.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};