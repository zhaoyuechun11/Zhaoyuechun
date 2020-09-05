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
var EventManage = /** @class */ (function (_super) {
    __extends(EventManage, _super);
    function EventManage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EventManage.Instance = function () {
        if (this.instance == null)
            this.instance = new EventManage();
        return this.instance;
    };
    ;
    EventManage.prototype.Init = function () {
    };
    EventManage.prototype.Reset = function () {
        EventManage.instance.offAll();
        EventManage.instance.destroy();
        EventManage.instance = null;
    };
    EventManage.prototype.Broadcast = function (e, arg) {
        if (arg === void 0) { arg = null; }
        EventManage.Instance().event(EventEnum[e], arg);
    };
    EventManage.prototype.AddListener = function (e, fun) {
        EventManage.Instance().on(EventEnum[e], this, fun);
    };
    EventManage.prototype.RemoveListener = function (e, fun) {
        EventManage.Instance().off(EventEnum[e], this, fun);
    };
    return EventManage;
}(Laya.Sprite));
//# sourceMappingURL=EventManage.js.map