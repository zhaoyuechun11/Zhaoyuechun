/**
 * Created by admin on 2018-04-05.
 */
/*기본 세팅*/
gc.SAMPLE = function () {
    PIXI.Container.call(this);
};

gc.SAMPLE.constructor = gc.SAMPLE;
gc.SAMPLE.prototype = Object.create(PIXI.Container.prototype);

//------------초기화
gc.SAMPLE.prototype.init = function () {
};

//------------이벤트 활성화
gc.SAMPLE.prototype.setInteractive = function (bool) {

};

//------------리셋
gc.SAMPLE.prototype.reset = function () {

};

gc.SAMPLE.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};