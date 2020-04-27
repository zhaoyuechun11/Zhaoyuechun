gc.GameStageClearPopup = function(){
    PIXI.Container.call(this);

    this.countryArry = ["","pic_korea.png","pic_china.png","pic_egypt.png","pic_greece.png","pic_france.png","pic_brazil.png","pic_america.png"];
    this.countryTextArray = ["","result_korea.png","result_china.png","result_egypt.png","result_greece.png","result_france.png","result_brazil.png","result_america.png"];

    this.popupBG = new PIXI.Sprite(GD.loader.resources['uishadow'].texture);
    this.popupBG.alpha = 0.8;

    this.bg = PIXI.Sprite.fromFrame("result_korea.png");
    this.bg.anchor.set(0.5);
    this.bg.x = GD.width/2;
    this.bg.y = GD.height/2;

    this.countryText = PIXI.Sprite.fromFrame("result_korea.png");
    this.countryText.anchor.set(0.5,0.5);
    this.countryText.x = GD.width/2-360;
    this.countryText.y = 250-GD.height/2;

    this.countryPic = PIXI.Sprite.fromFrame("pic_korea.png");
    this.countryPic.anchor.set(0.5,0.5);
    this.countryPic.x = GD.width/2-360;
    this.countryPic.y = 510-GD.height/2;

    this.resultList = PIXI.Sprite.fromFrame("result_list.png");
    this.resultList.anchor.set(0.5,0.5);
    this.resultList.x = GD.width/2-360;
    this.resultList.y = 800-GD.height/2;

    this.bonusMove = new gc.NumberText("result_moves_","left",0);
    this.bonusMove.x = 335-360;
    this.bonusMove.y = 770-GD.height/2;

    this.bonusClear = new gc.NumberText("result_clear_","center",0);
    //this.bonusClear.anchor.set(0.5);
    this.bonusClear.x = GD.width/2-360;
    this.bonusClear.y = 900-GD.height/2;

    //this.init();
};

gc.GameStageClearPopup.constructor = gc.GameStageClearPopup;
gc.GameStageClearPopup.prototype = Object.create(PIXI.Container.prototype);

gc.GameStageClearPopup.prototype.show = function (move,clearScore) {
    this.removeChildren();

    var stageNum = Math.ceil((this.parent.stageNum-1)/2);
    this.countryText.texture = PIXI.Texture.fromFrame(this.countryTextArray[stageNum]);
    this.countryPic.texture = PIXI.Texture.fromFrame(this.countryArry[stageNum]);
    this.bonusMove.setValue(move);
    this.bonusClear.setValue(clearScore);

    this.addChild(this.popupBG);
    this.addChild(this.bg);
    this.bg.addChild(this.countryText);
    this.bg.addChild(this.countryPic);
    this.bg.addChild(this.resultList);
    this.bg.addChild(this.bonusMove);
    this.bg.addChild(this.bonusClear);

}

gc.GameStageClearPopup.prototype.remove = function () {
    this.removeChildren();
}

gc.GameStageClearPopup.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};