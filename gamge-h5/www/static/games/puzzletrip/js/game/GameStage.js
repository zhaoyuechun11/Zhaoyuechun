gc.GameStage = function(){
    PIXI.Container.call(this);

    this.GamePlayPage = new gc.GamePlayPage();
    this.tutorialContianer = new gc.GameTutorial();
    this.soundPopup = new gc.GameMainSound();

};

gc.GameStage.constructor = gc.GameStage;
gc.GameStage.prototype = Object.create(PIXI.Container.prototype);

// 초기화
gc.GameStage.prototype.init = function(){

    this.mainPageContainer = new PIXI.Container();

    this.gameStartBt = PIXI.Sprite.fromFrame('intro_start_btn.png');
    this.gameStartBt.anchor.set(0.5,0.5);
    this.gameStartBt.y = GD.height * 0.885;
    this.gameStartBt.x = GD.width/2;

    this.gameHelpBt = PIXI.Sprite.fromFrame('intro_help_btn.png');
    this.gameHelpBt.anchor.set(0.5,0.5);
    this.gameHelpBt.y = GD.height * 0.828;
    this.gameHelpBt.x = GD.width*0.855;

    this.gameSoundBt = PIXI.Sprite.fromFrame('intro_option_btn.png');
    this.gameSoundBt.anchor.set(0.5,0.5);
    this.gameSoundBt.y = GD.height * 0.828;
    this.gameSoundBt.x = GD.width*0.16;

    this.gameBg = new PIXI.Sprite(GD.loader.resources['introbg'].texture);

    this.mainPageContainer.addChild(this.gameBg);
    this.mainPageContainer.addChild(this.gameStartBt);
    this.mainPageContainer.addChild(this.gameHelpBt);
    this.mainPageContainer.addChild(this.gameSoundBt);

    this.addChild(this.mainPageContainer);
    //게임 스다트 버튼
    this.gameStartBt.interactive = true;
    this.gameStartBt.mousedown = this.gameStartBt.touchstart = (function (e) {
        e.stopPropagation();
        this.gameStartBt.interactive = false;
        this.gameHelpBt.interactive = false;
        this.gameSoundBt.interactive =false;
        TweenMax.to(this.gameStartBt.scale,0.05,{x:1.1,y:1.1,onComplete:(function () {
            this.gameStartBt.scale.x = 1;
            this.gameStartBt.scale.y = 1;
            this.GamePlayPage.init();
            this.addChild(this.GamePlayPage);
            //gc.bgSound = true;
            GD.soundPlay('sound_bgm');
            if(!gc.bgSound){
                var flag = gc.totolSound;
                gc.totolSound = true;
                GD.soundStop("sound_bgm");
                gc.totolSound = flag;
            }
        }).bind(this),ease:Linear.easeInOut});
    }).bind(this);
    //게임 튜토리얼 버튼
    this.gameHelpBt.interactive = true;
    this.gameHelpBt.mousedown = this.gameHelpBt.touchstart = (function (e) {
        e.stopPropagation();

        this.gameHelpBt.interactive = false;
        TweenMax.to(this.gameHelpBt.scale,0.05,{x:1.1,y:1.1,onComplete:(function () {
            this.gameHelpBt.scale.x = 1;
            this.gameHelpBt.scale.y = 1;
            this.addChild(this.tutorialContianer);
        }).bind(this),ease:Linear.easeInOut});
    }).bind(this);
    //게임 사운드 버튼
    this.gameSoundBt.interactive = true;
    this.gameSoundBt.mousedown = this.gameSoundBt.touchstart = (function (e) {
        e.stopPropagation();

        this.gameSoundBt.interactive =false;
        TweenMax.to(this.gameSoundBt.scale,0.05,{x:1.1,y:1.1,onComplete:(function () {
            this.gameSoundBt.scale.x = 1;
            this.gameSoundBt.scale.y = 1;
            this.soundPopup.initBtType();
            this.addChild(this.soundPopup);
            this.gameSoundBt.interactive = true;
        }).bind(this),ease:Linear.easeInOut});

        //gc.isSound = !gc.isSound;
        //console.log(gc.isSound);
        //if(!gc.isSound){
        //    console.log(1111111111111);
        //    gc.soundMute()
        //}else{
        //    console.log(2222222222222);
        //    gc.soundUnMute();
        //}
    }).bind(this);

};

gc.GameStage.prototype.showTutu = function () {
    this.tutorialContianer.changeBtType(1);
    this.addChild(this.tutorialContianer);
};

gc.GameStage.prototype.removeTutu = function () {
    this.removeChild(this.tutorialContianer);
};

//튜토리얼 화면 부터 게임 시작
gc.GameStage.prototype.tutorialToGame = function () {

    GD.soundPlay('sound_bgm');
    gc.soundLoop('sound_bgm',true);
    if(!gc.bgSound){
        var flag = gc.totolSound;
        gc.totolSound = true;
        GD.soundStop("sound_bgm");
        gc.totolSound = flag;
    }

    this.removeChild(this.tutorialContianer);
    this.GamePlayPage.init();
    this.addChild(this.GamePlayPage);
    this.gameStartBt.interactive = false;

};

gc.GameStage.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};