var GameManage = /** @class */ (function () {
    function GameManage() {
        this.isInitManages = false;
    }
    GameManage.Instance = function () {
        if (this.instance == null) {
            this.instance = new GameManage();
        }
        return this.instance;
    };
    ;
    GameManage.prototype.InitManages = function () {
        //初始化微信小游戏
        // Laya.MiniAdpter.init();
        //设计分辨率
        Config.isAlpha = true;
        Laya.init(750, 1334, Laya.WebGL);
        //设置舞台背景
        Laya.stage.bgColor = 'none';
        //水平对齐方式，水平居中
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        //垂直对齐方式，垂直居中
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        //按照宽度
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        //横屏
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //禁用多点触控
        Laya.MouseManager.multiTouchEnabled = false;
        //调试--帧率统计
        //Laya.Stat.show(0, 0);
        //设置帧率fast-60帧(默认)，slow-30帧，mouse-30，帧sleep-1帧
        Laya.stage.frameRate = "fast";
        //调用DebugPanel调试面板
        //Laya.DebugPanel.init();
        this.mRoot = new Laya.View();
        this.mRoot.width = Laya.stage.width;
        this.mRoot.height = Laya.stage.height;
        this.mRoot.centerX = 0;
        this.mRoot.centerY = 0;
        Laya.stage.addChild(this.mRoot);
        this.mRootStage = [];
        EventManage.Instance().Init();
        TimeManage.Instance().Init();
        ControllerManage.Instance().Init();
        ResourceManage.Instance().Init();
        this.isInitManages = true;
    };
    GameManage.prototype.Reset = function () {
        this.mRoot.destroy();
        while (this.mRootStage.length > 0) {
            this.mRootStage.shift().destroy();
        }
        this.isInitManages = false;
        this.StartGame();
    };
    //开始游戏
    GameManage.prototype.StartGame = function () {
        if (!this.isInitManages)
            this.InitManages();
        EventManage.Instance().Broadcast(EventEnum.start_game);
    };
    //重置游戏
    GameManage.prototype.ResetGame = function () {
        //清除管理器
        EventManage.Instance().Reset();
        TimeManage.Instance().Reset();
        ControllerManage.Instance().Reset();
        ResourceManage.Instance().Reset();
        this.Reset();
    };
    //再玩一次
    GameManage.prototype.AgainGame = function () {
        ControllerManage.Instance().mGameController.ResetGame();
    };
    //暂停游戏
    GameManage.prototype.PauseGame = function () {
        Laya.stage.frameRate = "sleep";
    };
    //播放游戏
    GameManage.prototype.PlayGame = function () {
        Laya.stage.frameRate = "fast";
    };
    GameManage.prototype.OnGameBegin = function (msg) {
        console.log('on game begin ');
        EventManage.Instance().Broadcast(EventEnum.net_user_info, msg);
    };
    GameManage.prototype.OnUpdateData = function (_id, _score) {
        console.log('set update data' + _score);
        EventManage.Instance().Broadcast(EventEnum.net_update_score, { id: _id, score: _score });
    };
    GameManage.prototype.OnGameOver = function (ret) {
        console.log('on game over ' + ret);
        if (ret > 0) {
            EventManage.Instance().Broadcast(EventEnum.over_game);
            Laya.SoundManager.stopMusic();
        }
        else {
            EventManage.Instance().Broadcast(EventEnum.over_game, "fail");
            Laya.SoundManager.stopMusic();
        }
    };
    return GameManage;
}());
//# sourceMappingURL=GameManage.js.map