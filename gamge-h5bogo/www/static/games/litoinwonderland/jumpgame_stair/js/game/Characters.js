/**
 * Created by admin on 2018-04-05.
 */
gc.Characters = function () {
    PIXI.Container.call(this);
    this.charNames = [
        'cha1'
    ];
    this.chaList = [];
};

gc.Characters.constructor = gc.Characters;
gc.Characters.prototype = Object.create(PIXI.Container.prototype);

gc.Characters.prototype.init = function (myCha) {
    this.makeCharacters();

    return this.chaList[myCha];
};

//캐릭터 만들어두기
gc.Characters.prototype.makeCharacters = function () {
    var i = 0;
    for(i = 0; i<this.charNames.length; i++) {
        this.chaList[i] = new PIXI.spine.Spine(GD.loader.resources[this.charNames[i]].spineData);
        gc.spineManager.setSpineListener(this.chaList[i]);
    }
};

//------------리셋
gc.Characters.prototype.reset = function () {
    if(gc.game.myCha) {
        gc.spineManager.setupPlayAnimate(gc.game.myCha.img, "cha_basic", true);
    }
};

gc.Characters.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};