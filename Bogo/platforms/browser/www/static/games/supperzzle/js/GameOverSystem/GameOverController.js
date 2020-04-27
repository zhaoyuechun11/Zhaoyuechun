var GameOverController = /** @class */ (function () {
    function GameOverController() {
        this.targetInterval = 15;
        this.rotations = 15;
        this.rate = 25;
        this.rateOffset = 3;
        this.AddListener();
    }
    GameOverController.prototype.AddListener = function () {
        EventManage.Instance().AddListener(EventEnum.over_game, this.GameOver.bind(this));
    };
    GameOverController.prototype.GameOver = function (type) {
        this.mGameOverView = new GameOverView();
        this.mGameOverView.show();
        GameManage.Instance().mRootStage.push(this.mGameOverView);
        // Common.AddClickListener(this.mGameOverView.lblAgain, this.AgainBtnClick.bind(this));
        console.log("GameOver");
        for (var key in Dialog.manager) { //Dialog.manager.popupEffectHandler
            if (Dialog.manager.hasOwnProperty(key)) {
                var element = this.mGameOverView[key];
                if (key == "showEffect")
                    console.log(key + "=" + element);
            }
        }
        if (type != null) {
            Laya.SoundManager.playSound("sounds/over.mp3", 1);
            this.mGameOverView.img_result_state.skin = "Frame/lose.png";
            this.mGameOverView.img_guangquan.skin = "Frame/guangquan2.png";
            this.mGameOverView.img_win_star.visible = false;
        }
        else {
            Laya.SoundManager.playSound("sounds/win.mp3", 1);
            this.mGameOverView.img_result_state.skin = "Frame/win.png";
            this.mGameOverView.img_guangquan.skin = "Frame/guangquan.png";
            Laya.Tween.to(this.mGameOverView.img_win_star, { scaleX: 1, scaleY: 1 }, 1000, Laya.Ease.elasticOut);
        }
        this.startAnimation();
        this.mGameOverView.sp_back.on(Laya.Event.MOUSE_DOWN, this, function () {
            console.log("OverClick");
            MessageProxy.Instance().SendGameOver();
        });
    };
    GameOverController.prototype.AgainBtnClick = function () {
        console.log("AgainBtnClick");
        Laya.timer.clear(this, this.loopAnimate);
        this.mGameOverView.destroy();
        GameManage.Instance().AgainGame();
    };
    GameOverController.prototype.ReturnBtnClick = function () {
        console.log("ReturnBtnClick");
        GameManage.Instance().ResetGame();
    };
    //背景转动
    GameOverController.prototype.startAnimation = function () {
        Laya.timer.frameLoop(1, this, this.loopAnimate);
    };
    GameOverController.prototype.loopAnimate = function () {
        this.mGameOverView.img_guangquan.rotation += 2;
    };
    return GameOverController;
}());
//# sourceMappingURL=GameOverController.js.map