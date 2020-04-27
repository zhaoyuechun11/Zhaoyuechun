/**
 * Created by admin on 2017-12-29.
 */
var GraphicManager = (function () {
    function GraphicManager() {
    }
    GraphicManager.drawRect = function (w, h, col) {
        var g = new PIXI.Graphics();
        (!col)?g.beginFill(0X00FF00, 1):g.beginFill(col, 1);
        g.drawRect(0, 0, w, h);
        g.endFill();
        return g;
    };
    GraphicManager.drawCircle = function (r, col) {
        var g = new PIXI.Graphics();
        (!col)?g.beginFill(0X00FF00, 1):g.beginFill(col, 1);
        g.drawCircle(0, 0, r);
        g.endFill();
        return g;
    };
    return GraphicManager;
}());
