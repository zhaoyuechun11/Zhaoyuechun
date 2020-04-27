var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GamePattern = /** @class */ (function (_super) {
    __extends(GamePattern, _super);
    function GamePattern() {
        var _this = _super.call(this) || this;
        _this.mGameMode = null;
        _this.mGameController = null;
        _this.xIndex = -1;
        _this.yIndex = -1;
        _this.isSelected = false;
        _this.isClear = false;
        return _this;
    }
    GamePattern.prototype.Init = function (x, y) {
        this.mGameMode = ControllerManage.Instance().mGameController.mGameMode;
        this.mGameController = ControllerManage.Instance().mGameController;
        this.xIndex = x;
        this.yIndex = y;
        this.isSelected = false;
        this.isClear = false;
        this.x = 92 * x;
        this.y = 92 * y;
        this.on(laya.events.Event.MOUSE_DOWN, this, this.Click.bind(this));
    };
    GamePattern.prototype.SetEmpty = function () {
        this.icon.visible = false;
        this.img_shine_bg.visible = false;
    };
    GamePattern.prototype.SetIcon = function (ico) {
        this.icon.source = ResourceManage.Instance().GetRes(ico);
    };
    GamePattern.prototype.Click = function () {
        if (this.isSelected)
            return;
        EventManage.Instance().Broadcast(EventEnum.game, ["selected", this]);
    };
    GamePattern.prototype.setSelected = function (isSelected) {
        this.isSelected = isSelected;
    };
    GamePattern.prototype.SetClear = function () {
        this.isClear = false;
    };
    return GamePattern;
}(ui.GameUI.PatternUI));
//# sourceMappingURL=GamePattern.js.map