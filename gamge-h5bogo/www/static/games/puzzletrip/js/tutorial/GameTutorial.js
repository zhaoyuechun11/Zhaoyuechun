gc.GameTutorial = function(){
    PIXI.Container.call(this);

    this.pageNum = 1;
    this.type = 0;
    this.isfirst = false;

    //배경
    this.tutorialBg = new PIXI.Sprite(GD.loader.resources['help1'].texture);
    this.addChild(this.tutorialBg);

    //다음 버튼
    this.helpnext = PIXI.Sprite.fromFrame("help_next.png");
    this.helpnext.anchor.set(0.5,0.5);
    this.helpnext.x = GD.width*0.9;
    this.helpnext.y = GD.height*0.95;
    this.addChild(this.helpnext);

    //전 버튼
    this.helpperv = PIXI.Sprite.fromFrame("help_prev.png");
    this.helpperv.anchor.set(0.5,0.5);
    this.helpperv.x = GD.width*0.1;
    this.helpperv.y = GD.height*0.95;
    this.addChild(this.helpperv);

    //게임 스다트 버튼
    this.startBt = PIXI.Sprite.fromFrame("help_start.png");
    this.startBt.anchor.set(0.5,0.5);
    this.startBt.x = GD.width/2;
    this.startBt.y = GD.height*0.95;
    this.addChild(this.startBt);

    this.tutorialContianer = new PIXI.Container();
    this.addChild(this.tutorialContianer);

    //처음페이지 에니메이션
    this.tutorialAni = new PIXI.spine.Spine(GD.loader.resources['tutoriaSpine'].spineData);
    this.tutorialAni.state.addAnimation(0,'animation',false,0);
    this.tutorialAni.x = GD.width/2;
    this.tutorialAni.y = GD.height*0.43;
    this.tutorialContianer.addChild(this.tutorialAni);
    this.tutorialAni.state.addListener({
        complete:(function (track, event) {
            this.animation.state.setAnimation(0,'flag_1',false,0);
            this.animation.skeleton.setToSetupPose();
        }).bind(this)
    });

    //처음페이지 캐릭터 에니메이션
    this.animation = new PIXI.spine.Spine(GD.loader.resources['spineCharacter'].spineData);
    this.animation.state.addAnimation(0,'flag_1',false,0);
    this.animation.x = GD.width/2;
    this.animation.y = GD.height*0.42;
    this.animation.scale.x = 0.5;
    this.animation.scale.y = 0.5;
    this.animation.state.addListener({
        complete:(function (track, event) {
            if(!this.isfirst){
                this.isfirst = true;
            }else {
                this.tutorialAni.state.setAnimation(0, 'animation', false, 0);
                this.tutorialAni.skeleton.setToSetupPose();
            }
        }).bind(this)
    });
    this.tutorialContianer.addChild(this.animation);

    //게임 스다트 버튼
    this.setTouchStartAction(this.startBt, function () {
        this.setInteractive(false);
        this.emit('TUTORIAL_POPUP_CLOSE_EVENT');
    },this);

    this.helpnext.interactive = true;
    this.setTouchStartAction(this.helpnext, function () {
        this.pageNum++;
        this.tutorialBg.texture = GD.loader.resources['help'+this.pageNum].texture;
        if(this.pageNum == 4){
            this.helpnext.visible = false;
            this.helpnext.interactive = false;
        }
        if(this.pageNum > 1){
            this.removeChild(this.tutorialContianer);
            this.helpperv.visible = true;
            this.helpperv.interactive = true;
        }
    },this);

    this.helpperv.visible = false;
    this.helpperv.interactive = true;
    this.setTouchStartAction(this.helpperv, function () {
        this.pageNum--;
        this.tutorialBg.texture = GD.loader.resources['help'+this.pageNum].texture;
        if(this.pageNum == 1){
            this.addChild(this.tutorialContianer);
            this.helpperv.visible = false;
            this.helpperv.interactive = false;
        }
        if(this.pageNum < 4){
            this.helpnext.visible = true;
            this.helpnext.interactive = true;
        }
    },this);
};

gc.GameTutorial.constructor = gc.GameTutorial;
gc.GameTutorial.prototype = Object.create(PIXI.Container.prototype);

//게임전 게임중 나타나는 버튼 타입
gc.GameTutorial.prototype.changeBtType = function (type) {
    this.type = type;
    if(this.type == 0){
        this.startBt.texture = PIXI.Texture.fromFrame("help_start.png");
    }else{
        this.startBt.texture = PIXI.Texture.fromFrame("help_close.png");
    }
};

gc.GameTutorial.prototype.initPage = function () {
    this.setInteractive(true);
    this.helpnext.visible = true;
    this.helpperv.visible = false;
    this.tutorialBg.texture = GD.loader.resources['help1'].texture;
    this.addChild(this.tutorialContianer);
    this.pageNum = 1;

    this.startBt.texture = PIXI.Texture.fromFrame("help_close.png");
};

gc.GameTutorial.prototype.setInteractive = function (bool) {
    this.helpnext.interactive = bool;
    this.helpperv.interactive = bool;
    this.startBt.interactive = bool;
};

gc.GameTutorial.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);

};