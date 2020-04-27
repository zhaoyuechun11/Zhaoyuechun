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
var GameView = /** @class */ (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        var _this = _super.call(this) || this;
        _this.mGameMode = null;
        _this.checkerboard = null;
        _this.mPatternList = [];
        _this.width = Laya.stage.width;
        _this.height = Laya.stage.height;
        _this.Init();
        return _this;
    }
    GameView.prototype.Init = function () {
        this.checkerboard = new Laya.View();
        var tempPattern = [];
        this.mGameMode = ControllerManage.Instance().mGameController.mGameMode;
        this.mGameMode.checkerboard = [];
        for (var i = 0; i < this.mGameMode.horizontalCount; i++) {
            var verticalCount = [];
            for (var j = 0; j < this.mGameMode.verticalCount; j++) {
                var pattern = new GamePattern();
                verticalCount[j] = pattern;
                this.checkerboard.addChild(pattern);
                pattern.Init(i, j);
                if (i == 0 || j == 0 || i == this.mGameMode.horizontalCount - 1 || j == this.mGameMode.verticalCount - 1)
                    pattern.SetEmpty();
                else {
                    this.mPatternList.push(pattern);
                    tempPattern.push(pattern);
                }
            }
            this.mGameMode.checkerboard[i] = verticalCount;
        }
        this.candySum = tempPattern.length;
        while (tempPattern.length > 0) {
            //1-26
            var iconName = "Icon/" + Common.Random(7) + ".png";
            var temp1 = tempPattern[Common.Random(tempPattern.length - 1)];
            tempPattern.splice(tempPattern.indexOf(temp1), 1);
            var temp2 = tempPattern[Common.Random(tempPattern.length - 1)];
            if (tempPattern.length == 1)
                temp2 = tempPattern[0];
            tempPattern.splice(tempPattern.indexOf(temp2), 1);
            temp1.SetIcon(iconName);
            temp2.SetIcon(iconName);
            temp1.isClear = true;
            temp2.isClear = true;
        }
        this.checkerboard.centerX = 0;
        this.checkerboard.centerY = 0;
        this.addChild(this.checkerboard);
        var imgReady = new Laya.Image;
        var readyDL = new Dialog;
        imgReady.centerX = 0;
        imgReady.centerY = 0;
        imgReady.skin = "Frame/ready.png";
        Laya.timer.once(900, this, function () {
            imgReady.scale(2, 2);
            imgReady.skin = "Frame/go.png";
            Laya.Tween.to(imgReady, { scaleX: 1, scaleY: 1 }, 100);
        });
        this.addChild(readyDL);
        this.addChild(imgReady);
        Laya.SoundManager.playSound("sounds/readyGo.mp3", 1, Laya.Handler.create(this, this.musicComplete, [imgReady, readyDL]));
        this.SetScore(0, 0.01);
        this.SetScore(1, 0.01);
        Laya.timer.once(2000, this, function () {
            imgReady.removeSelf();
            readyDL.removeSelf();
        });
        MessageProxy.Instance().SendGameReady();
        Laya.stage.on(Laya.Event.VISIBILITY_CHANGE, this, function () {
            if (Laya.stage.isVisibility) {
                Laya.SoundManager.playMusic("sounds/happyMisic2.mp3", 0);
            }
            else {
                Laya.SoundManager.stopMusic();
            }
        });
    };
    GameView.prototype.musicComplete = function (ViewA, DlB) {
        ViewA.removeSelf();
        DlB.removeSelf();
        Laya.SoundManager.playMusic("sounds/happyMisic2.mp3", 0);
    };
    GameView.prototype.SetScore = function (id, score) {
        if (id == 0) {
            this.clip_pb1.visible = true;
            this.clip_pb1.clipWidth = score * 162;
            console.log(this.clip_pb1.clipWidth);
        }
        else {
            this.clip_pb2.visible = true;
            this.clip_pb2.clipWidth = score * 162;
            console.log(this.clip_pb2.clipWidth);
        }
    };
    return GameView;
}(ui.GameUI.GameUI));
//# sourceMappingURL=GameView.js.map