var Browser = Laya.Browser;
var MessageProxy = /** @class */ (function () {
    function MessageProxy() {
        //this.InitProxy();
    }
    MessageProxy.Instance = function () {
        if (this.s_instance == null) {
            this.s_instance = new MessageProxy();
        }
        return this.s_instance;
    };
    ;
    MessageProxy.prototype.InitProxy = function () {
        var self = this;
        Browser.window.addEventListener('message', function (event) {
            console.log('receive message listener');
            self.OnReceiveMessage(event.data);
        });
        this._users = [];
    };
    MessageProxy.prototype.PostMessage = function (data) {
        if (Browser.window.parent) {
            Browser.window.parent.postMessage(data, "*");
        }
    };
    MessageProxy.prototype.SendPostScore = function (score) {
        this.PostMessage({
            cmd: "SendGameData",
            data: score
        });
    };
    MessageProxy.prototype.SendGameReady = function () {
        this.PostMessage({
            cmd: "GameLoadReady"
        });
    };
    MessageProxy.prototype.SendGameOver = function () {
        this.PostMessage({
            cmd: "GameOver"
        });
    };
    MessageProxy.prototype.AddListenter = function (listener) {
        this._listener = listener;
    };
    MessageProxy.prototype.RemoveListener = function () {
        this._listener = null;
    };
    MessageProxy.prototype.OnReceiveMessage = function (message) {
        console.log('on receive message');
        console.log(message);
        var self = this;
        switch (message.cmd) {
            case 'UpdateData':
                {
                    if (self._users.length == 2) {
                        if (message.data.userId == self._users[0].userId) {
                            GameManage.Instance().OnUpdateData(0, message.data.userScore);
                        }
                        else {
                            GameManage.Instance().OnUpdateData(1, message.data.userScore);
                        }
                    }
                }
                break;
            case "GameResult":
                {
                    GameManage.Instance().OnGameOver(message.data);
                }
                break;
            case "GameBegin":
                {
                    console.log(message.data);
                    self._users = message.data;
                    GameManage.Instance().OnGameBegin(message);
                }
            default:
                break;
        }
        if (self._listener) {
            console.log('call back listener ');
            self._listener(message.data);
        }
    };
    return MessageProxy;
}());
//# sourceMappingURL=MessageProxy.js.map