// 程序入口
var Main = /** @class */ (function () {
    function Main() {
        GameManage.Instance().StartGame();
        MessageProxy.Instance().InitProxy();
    }
    return Main;
}());
new Main();
//# sourceMappingURL=Main.js.map