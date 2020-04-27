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
var AniView = /** @class */ (function (_super) {
    __extends(AniView, _super);
    function AniView() {
        return _super.call(this) || this;
    }
    AniView.prototype.start = function () {
        this.ani.play(0, false);
        this.ani.on(laya.events.Event.COMPLETE, this, this.complete);
    };
    AniView.prototype.complete = function () {
        this.removeSelf();
    };
    return AniView;
}(ui.GameUI.AniViewUI));
//# sourceMappingURL=AniView.js.map