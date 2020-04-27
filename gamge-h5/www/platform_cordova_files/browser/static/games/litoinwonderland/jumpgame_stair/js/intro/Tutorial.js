/**
 * Created by admin on 2018-06-29.
 */
gc.Tutorial = function () {
    PIXI.Container.call(this);
    this.tuto_spine = new PIXI.spine.Spine(GD.loader.resources["tutorial"].spineData);
    this.bg = new PIXI.Sprite.fromFrame("tutorial_popup_bg.png");
    this.bgBlack = GraphicManager.drawRect(gc.width, gc.height, "0X000000");
    this.closeBtn = new PIXI.Sprite.fromFrame("tutorial_btn_exit.png");

    this.init();
};

gc.Tutorial.constructor = gc.Tutorial;
gc.Tutorial.prototype = Object.create(PIXI.Container.prototype);

//------------초기화
gc.Tutorial.prototype.init = function () {
    bm.buttonEvent(this.bgBlack, false, this.offTutorial.bind(this));

    this.bg.anchor.set(0.5);
    this.bg.x = gc.width*0.5;
    this.bg.y = gc.height*0.5;

    this.closeBtn.anchor.set(0.5);
    this.closeBtn.y = 400;
    this.closeBtn.interactive = true;
    bm.buttonEvent(this.closeBtn, true, this.offTutorial.bind(this));

    this.bgBlack.alpha = 0.7;
};

gc.Tutorial.prototype.onIntroTutorial = function () {
    this.tuto_spine.x = 0;
    this.tuto_spine.y = -5;
    var time = 0.1;
    TweenMax.fromTo(this.bg.scale, time, {x:0, y:0}, {x:1.05, y:1.05, onComplete:(function () {
        TweenMax.to(this.bg.scale, time/2, {x:1, y:1, onComplete:(function () {
            this.bg.scale.x = 1;
            this.bg.scale.y = 1;
            gc.spineManager.setupPlayAnimate(this.tuto_spine, 'tutorial_popup', true);
        }).bind(this)});
    }).bind(this)});

    this.bgBlack.interactive = false;
    this.addChild(this.bgBlack);
    this.addChild(this.bg);
    this.bg.addChild(this.tuto_spine);
    this.bg.addChild(this.closeBtn);
    GD.stage.addChild(this);
};

gc.Tutorial.prototype.onGameTutorial = function () {
    this.tuto_spine.x = gc.width*0.5;
    this.tuto_spine.y = gc.height*0.5 - 5;
    gc.spineManager.setupPlayAnimate(this.tuto_spine, 'tutorial_ingame', true);

    this.bgBlack.interactive = true;
    this.addChild(this.bgBlack);
    this.addChild(this.tuto_spine);
    GD.stage.addChild(this);
};

//튜토리얼 닫기
gc.Tutorial.prototype.offTutorial = function () {

    if(gc.intro) {
        var time = 0.1;
        this.bg.scale.x = 1;
        this.bg.scale.y = 1;
        TweenMax.to(this.bg.scale, time, {x:1.1, y:1.1, onComplete:(function () {
            TweenMax.to(this.bg.scale, time/2, {x:0, y:0, onComplete:(function () {
                cleanTutorialScene.bind(this)();
                gc.intro.setInteractive(true);
            }).bind(this)});
        }).bind(this)});
    }
    if(gc.game) {
        cleanTutorialScene.bind(this)();
        gc.game.initCallback();
    }

    function cleanTutorialScene() {
        this.removeChildren();
        this.bg.removeChildren();
        removeObject(this);
    }
};

gc.Tutorial.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};