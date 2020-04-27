var GameController = /** @class */ (function () {
    function GameController() {
        this.mLineArray = [];
        this.mDoEmpty = [];
        this.mComboTime = 0;
        this.mComboNum = 0;
        this.candyClearNum = 0;
        this.delayTime = 100;
        this.isRepeatLoop = false;
        this.roleAni = new Laya.Animation();
        this.points = [];
        this.mGameMode = new GameMode();
        this.AddListener();
    }
    GameController.prototype.AddListener = function () {
        EventManage.Instance().AddListener(EventEnum.preLoad_complete, this.EnterGame.bind(this));
        EventManage.Instance().AddListener(EventEnum.game, this.Processor.bind(this));
        EventManage.Instance().AddListener(EventEnum.net_update_score, this.NetUpdateScore.bind(this));
        EventManage.Instance().AddListener(EventEnum.net_user_info, this.NetUserInfo.bind(this));
    };
    GameController.prototype.Test = function () {
        // console.log("Test");
        // EventManage.Instance().Broadcast(EventEnum.over_game);
    };
    GameController.prototype.EnterGame = function () {
        this.mGameView = new GameView();
        //this.mGameView.width=Laya.stage.width;
        //this.mGameView.height=Laya.stage.height;
        GameManage.Instance().mRoot.addChild(this.mGameView);
        Common.AddClickListener(this.mGameView.testBtn, this.Test.bind(this), false);
        this.roleAni.loadImages(this.aniUrls("ax", 22));
        this.roleAni.on(Laya.Event.COMPLETE, this, this.onComplete);
        this.roleAni.visible = false;
        this.roleAni.pivotX = 128;
        this.roleAni.pivotY = 128;
        this.roleAni.scale(0.7, 0.7, false);
        this.roleAni.pos(365, 134);
        this.mGameView.addChild(this.roleAni);
        Laya.timer.loop(2500, this, this.LinkTip);
    };
    GameController.prototype.ResetGame = function () {
        this.candyClearNum = 0;
        Laya.timer.clearAll(this);
        this.roleAni.removeSelf();
        this.mGameView.destroy();
        this.EnterGame();
    };
    GameController.prototype.Processor = function (type, args) {
        switch (type) {
            case "selected":
                this.Processor2selected(args);
                break;
        }
    };
    GameController.prototype.aniUrls = function (aniName, length) {
        var urls = [];
        for (var i = 0; i < length; i++) {
            //动画资源路径要和动画图集打包前的资源命名对应起来
            urls.push("Frame/" + aniName + (i + 1) + ".png");
        }
        return urls;
    };
    GameController.prototype.Processor2selected = function (obj) {
        var _this = this;
        if (this.mTipFirst != null) {
            this.mTipFirst.img_shine_bg.visible = false;
            this.mTipSecond.img_shine_bg.visible = false;
        }
        Laya.timer.clear(this, this.loopAnimate1);
        this.isRepeatLoop = false;
        Laya.timer.loop(2500, this, this.LinkTip);
        if (this.mSelected == null) {
            // obj.icon.gray=true;
            obj.setSelected(true);
            obj.img_shine_bg.visible = true;
            this.mTween = Laya.Tween.to(obj.icon, { scaleX: 1.2, scaleY: 1.2 }, 500, Laya.Ease.elasticOut);
            obj.img_shine_bg.scaleX = 1.73;
            obj.img_shine_bg.scaleY = 1.73;
            Laya.timer.frameLoop(1, this, this.loopAnimate, [obj]);
            this.mSelected = obj;
            this.mSecondSelected = null;
            Laya.SoundManager.playSound("sounds/dida.mp3", 1);
        }
        else {
            this.mSecondSelected = obj;
            var isCheckLinked = this.IsCheckLinked(this.mSelected, obj);
            if (!isCheckLinked) {
                // this.mSelected.icon.gray=false;
                // obj.icon.gray=true;
                Laya.SoundManager.playSound("sounds/dida.mp3", 1);
                this.mTween.complete();
                this.mSelected.setSelected(false);
                this.mSelected.img_shine_bg.visible = false;
                this.mSelected.icon.scaleX = 1;
                this.mSelected.icon.scaleY = 1;
                obj.setSelected(true);
                obj.img_shine_bg.visible = true;
                this.mTween = Laya.Tween.to(obj.icon, { scaleX: 1.2, scaleY: 1.2 }, 500, Laya.Ease.elasticOut);
                Laya.timer.frameLoop(1, this, this.loopAnimate, [obj]);
                obj.img_shine_bg.scaleX = 1.73;
                obj.img_shine_bg.scaleY = 1.73;
                this.mSelected = obj;
            }
            else {
                Laya.SoundManager.playSound("sounds/tgxc.mp3", 1);
                var currentTime = Date.parse(new Date().toString());
                if (currentTime - this.mComboTime < 2500 && this.mComboTime != 0) {
                    Laya.SoundManager.playSound("sounds/combo1.mp3", 1);
                    this.mComboNum += 1;
                    this.mGameView.lbl_combo_num.text = this.mComboNum + "";
                    this.mGameView.lbl_combo_num.visible = true;
                    this.mGameView.img_combo.visible = true;
                    this.mGameView.lbl_combo_num.scaleX = 0;
                    this.mGameView.lbl_combo_num.scaleY = 0;
                    this.mGameView.img_combo.scaleX = 0;
                    this.mGameView.img_combo.scaleY = 0;
                    Laya.Tween.to(this.mGameView.lbl_combo_num, { scaleX: 1, scaleY: 1 }, 800, Laya.Ease.elasticOut, null, 0, true, true);
                    Laya.Tween.to(this.mGameView.img_combo, { scaleX: 1, scaleY: 1 }, 800, Laya.Ease.elasticOut, null, 0, true, true);
                    Laya.timer.clear(this, this._loop);
                    Laya.timer.once(2500, this, this._loop);
                    this.mGameView.aniBoom.play(0, false);
                    this.mGameView.aniBoom.on(laya.events.Event.COMPLETE, this, function () {
                        _this.mGameView.aniBoom.removeSelf();
                    });
                }
                else {
                    this.mComboNum = 0;
                }
                this.mComboTime = currentTime;
                this.mTween = Laya.Tween.to(obj.icon, { scaleX: 1.2, scaleY: 1.2 }, 500, Laya.Ease.elasticOut);
                obj.img_shine_bg.visible = true;
                Laya.timer.frameLoop(1, this, this.loopAnimate, [obj, this.mSelected]);
                obj.img_shine_bg.scaleX = 1.73;
                obj.img_shine_bg.scaleY = 1.73;
                obj.setSelected(true);
                var isFirst = true;
                if (isFirst) {
                    this.mDoEmpty.push(this.mSelected);
                    this.mDoEmpty.push(this.mSecondSelected);
                    isFirst = false;
                }
                else {
                    Laya.timer.once(this.delayTime, this, function () {
                        _this.mDoEmpty.push(_this.mSelected);
                        _this.mDoEmpty.push(_this.mSecondSelected);
                    });
                }
                this.Connect(this.points, this.ConnectOver.bind(this));
                var a = new AniView();
                this.mGameView.addChild(a);
                var b = new AniView();
                this.mGameView.addChild(b);
                a.pos(obj.x - 85, obj.y + 73);
                a.start();
                b.pos(this.mSelected.x - 85, this.mSelected.y + 73);
                b.start();
                this.mSelected = null;
                this.mSecondSelected = null;
            }
        }
    };
    GameController.prototype._loop = function () {
        var _this = this;
        Laya.Tween.to(this.mGameView.lbl_combo_num, { scaleX: 0, scaleY: 0.0 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, function () {
            _this.mGameView.lbl_combo_num.visible = false;
        }));
        Laya.Tween.to(this.mGameView.img_combo, { scaleX: 0, scaleY: 0 }, 500, Laya.Ease.strongOut, Laya.Handler.create(this, function () {
            _this.mGameView.img_combo.visible = false;
        }));
    };
    GameController.prototype.onComplete = function () {
        this.roleAni.visible = false;
    };
    GameController.prototype.loopAnimate = function (pg1, pg2) {
        pg1.img_shine_bg.rotation += 3;
        if (pg2 != null)
            pg2.img_shine_bg.rotation += 3;
    };
    GameController.prototype.ConnectOver = function () {
        var _this = this;
        console.log(this.mSelected);
        for (var i = 0; i < this.mDoEmpty.length; i++) {
            this.mDoEmpty[i].SetClear();
            this.mGameView.mPatternList.splice(this.mGameView.mPatternList.indexOf(this.mDoEmpty[i]), 1);
        }
        Laya.timer.once(this.delayTime, this, function () {
            //连接结束隐藏icon和背景图
            for (var i = 0; i < _this.mDoEmpty.length; i++)
                _this.mDoEmpty[i].SetEmpty();
            _this.mDoEmpty = [];
            _this.IsCheckLock();
            //连接结束隐藏连接线
            for (var i = 0; i < _this.mLineArray.length; i++)
                _this.mLineArray[i].destroy();
        });
        //this.mGameView.clip_pb1.visible = true;
        //this.mGameView.clip_pb1.clipWidth = Math.floor((this.candyClearNum += 2 / this.mGameView.candySum) * 162);
        var score = Math.floor((this.candyClearNum += 2 / this.mGameView.candySum) * 100);
        MessageProxy.Instance().SendPostScore(score);
        if (this.IsCheckGameOver()) {
            Laya.SoundManager.stopMusic();
            //EventManage.Instance().Broadcast(EventEnum.over_game);
        }
    };
    GameController.prototype.ConsoleLogPoints = function (arr) {
        //var arr=this.points;
        console.log("points:");
        for (var i = 0; i < arr.length; i++) {
            console.log("[" + arr[i].xIndex + "," + arr[i].yIndex + "]");
        }
    };
    GameController.prototype.CheckPoint = function (p) {
        return !p.icon.visible;
    };
    GameController.prototype.IsCheckLinked = function (p1, p2) {
        if (p1.icon.source != p2.icon.source)
            return false;
        this.points = [];
        if (this.LineLink(p1, p2)) {
            this.points.unshift(p1);
            this.points.push(p2);
            this.ConsoleLogPoints(this.points);
            console.log("1线");
            return true;
        }
        else if (this.LineLinkTwo(p1, p2)) {
            this.points.unshift(p1);
            this.points.push(p2);
            this.ConsoleLogPoints(this.points);
            console.log("2线");
            return true;
        }
        else if (this.LineLinkThree(p1, p2)) {
            this.points.unshift(p1);
            this.points.push(p2);
            this.ConsoleLogPoints(this.points);
            console.log("3线");
            return true;
        }
        return false;
    };
    GameController.prototype.LineLink = function (p1, p2) {
        //（1）0转角连通（直线连通）：两个图片的纵坐标或横坐标相等，且两者连线间没有其他图案阻隔。
        if (p1.xIndex == p2.xIndex || p1.yIndex == p2.yIndex) {
            if (Math.abs(p1.xIndex - p2.xIndex) + Math.abs(p1.yIndex - p2.yIndex) <= 1)
                return true;
            if (p1.xIndex == p2.xIndex) {
                var yOffset = Math.abs(p1.yIndex - p2.yIndex);
                var min = p1.yIndex < p2.yIndex ? p1 : p2;
                for (var i = 1; i < yOffset; i++) {
                    if (!this.CheckPoint(this.mGameMode.checkerboard[min.xIndex][min.yIndex + i]))
                        return false;
                }
                return true;
            }
            if (p1.yIndex == p2.yIndex) {
                var xOffset = Math.abs(p1.xIndex - p2.xIndex);
                var min = p1.xIndex < p2.xIndex ? p1 : p2;
                for (var i = 1; i < xOffset; i++) {
                    if (!this.CheckPoint(this.mGameMode.checkerboard[min.xIndex + i][min.yIndex]))
                        return false;
                }
                return true;
            }
        }
        else
            return false;
    };
    GameController.prototype.LineLinkTwo = function (p1, p2) {
        //（2）1转角连通（2直线连通）：两个图片的纵坐标和横坐标都不相等。
        if (p1.xIndex == p2.xIndex || p1.yIndex == p2.yIndex)
            return false;
        var p3 = this.mGameMode.checkerboard[p1.xIndex][p2.yIndex];
        var p4 = this.mGameMode.checkerboard[p2.xIndex][p1.yIndex];
        if (this.CheckPoint(p3) && this.LineLink(p1, p3) && this.LineLink(p2, p3)) {
            this.points.push(p3);
            return true;
        }
        if (this.CheckPoint(p4) && this.LineLink(p1, p4) && this.LineLink(p2, p4)) {
            this.points.push(p4);
            return true;
        }
        return false;
    };
    GameController.prototype.LineLinkThree = function (p1, p2) {
        //（3）2转角连通（3直线连通）
        var tempArr = [];
        for (var i = p1.xIndex - 1; i >= 0; i--) {
            var temp = this.mGameMode.checkerboard[i][p1.yIndex];
            if (this.CheckPoint(temp))
                tempArr.push(temp);
            else
                break;
        }
        for (var i = p1.xIndex + 1; i < this.mGameMode.horizontalCount; i++) {
            var temp = this.mGameMode.checkerboard[i][p1.yIndex];
            if (this.CheckPoint(temp))
                tempArr.push(temp);
            else
                break;
        }
        for (var i = p1.yIndex - 1; i >= 0; i--) {
            var temp = this.mGameMode.checkerboard[p1.xIndex][i];
            if (this.CheckPoint(temp))
                tempArr.push(temp);
            else
                break;
        }
        for (var i = p1.yIndex + 1; i < this.mGameMode.verticalCount; i++) {
            var temp = this.mGameMode.checkerboard[p1.xIndex][i];
            if (this.CheckPoint(temp))
                tempArr.push(temp);
            else
                break;
        }
        for (var i = 0; i < tempArr.length; i++) {
            if (this.LineLinkTwo(tempArr[i], p2)) {
                this.points.unshift(tempArr[i]);
                return true;
            }
        }
        return false;
    };
    GameController.prototype.Connect = function (arr, fun) {
        console.log(arr.length);
        var p1 = arr.shift();
        if (arr.length == 0) {
            fun();
            return;
        }
        this.DrawLink(new Laya.Point(p1.x + p1.icon.x, p1.y + p1.icon.y), new Laya.Point(arr[0].x + arr[0].icon.x, arr[0].y + arr[0].icon.y));
    };
    GameController.prototype.DrawLink = function (from, to) {
        var line = new Laya.Clip();
        line.skin = "Frame/sd1.png";
        this.mGameView.checkerboard.addChild(line);
        this.mLineArray.push(line);
        // line.sizeGrid = "1,1,1,1";
        line.x = from.x;
        line.y = from.y;
        line.width = 0;
        line.height = 0;
        line.clipWidth = 1;
        // line.clipHeight = 40;
        line.anchorY = 0.5;
        var verticalLength = 0;
        if (from.x > to.x) {
            line.rotation = 180;
        }
        else if (from.y < to.y) {
            line.rotation = 90;
            verticalLength = 8;
            line.y -= verticalLength;
        }
        else if (from.y > to.y) {
            line.rotation = -90;
            verticalLength += 8;
            line.y += verticalLength;
        }
        var distance = Math.abs(from.x - to.x) + Math.abs(from.y - to.y) + verticalLength * 1.7;
        var n = 3;
        Laya.timer.loop(20, this, function () {
            if (n < 10) {
                n += 1;
                line.skin = "Frame/sd" + (Math.floor(n % 4)) + ".png";
            }
        });
        laya.utils.Tween.to(line, { clipWidth: distance }, 5, null, Laya.Handler.create(this, this.Connect, [this.points, this.ConnectOver.bind(this)]));
    };
    GameController.prototype.IsCheckLock = function () {
        if (this.mGameMode.checkerboard.length > 9) {
            return false;
        }
        var tempPattern = [];
        for (var i = 0; i < this.mGameMode.checkerboard.length; i++) {
            for (var j = 0; j < this.mGameMode.checkerboard[i].length; j++) {
                if (this.mGameMode.checkerboard[i][j].isClear)
                    tempPattern.push(this.mGameMode.checkerboard[i][j]);
            }
        }
        for (var i = 0; i < tempPattern.length; i++) {
            for (var j = i + 1; j < tempPattern.length; j++) {
                if (this.IsCheckLinked(tempPattern[i], tempPattern[j])) {
                    return false;
                }
            }
        }
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
        return true;
    };
    /**
     * 提示用户可以连接的糖果
     */
    GameController.prototype.LinkTip = function () {
        if (this.isRepeatLoop == true) {
            return;
        }
        for (var i = 0; i < this.mGameView.mPatternList.length; i++) {
            for (var j = i + 1; j < this.mGameView.mPatternList.length; j++) {
                if (this.IsCheckLinked(this.mGameView.mPatternList[i], this.mGameView.mPatternList[j])) {
                    this.mTipFirst = this.mGameView.mPatternList[i];
                    this.mTipSecond = this.mGameView.mPatternList[j];
                    this.mTipFirst.img_shine_bg.scale(1.7, 1.7);
                    this.mTipSecond.img_shine_bg.scale(1.7, 1.7);
                    this.mTipFirst.img_shine_bg.visible = true;
                    this.mTipSecond.img_shine_bg.visible = true;
                    Laya.timer.frameLoop(1, this, this.loopAnimate1, [this.mTipFirst, this.mTipSecond]);
                    return;
                }
            }
        }
    };
    GameController.prototype.loopAnimate1 = function (pg1, pg2) {
        if (pg1 != this.mSelected) {
            pg1.img_shine_bg.rotation += 3;
        }
        if (pg2 != null && pg2 != this.mSelected)
            pg2.img_shine_bg.rotation += 3;
        this.isRepeatLoop = true;
    };
    GameController.prototype.IsCheckGameOver = function () {
        for (var i = 0; i < this.mGameMode.checkerboard.length; i++)
            for (var j = 0; j < this.mGameMode.checkerboard[i].length; j++) {
                if (this.mGameMode.checkerboard[i][j].isClear)
                    return false;
            }
        return true;
    };
    //同步进入
    GameController.prototype.NetUpdateScore = function (data) {
        this.mGameView.SetScore(data.id, data.score / 100);
        if (data.id > 0 && data.score / 100 == 0.7 || data.score / 100 == 0.8 || data.score / 100 == 0.9) {
            this.roleAni.play(null, false);
        }
        else if (data.id > 0 && data.score / 100 == 1) {
            //EventManage.Instance().Broadcast(EventEnum.over_game,"fail");
        }
    };
    //设置用户信息
    GameController.prototype.NetUserInfo = function (msg) {
        console.log(msg.data);
        this.mGameView.playerName1.text = msg.data[0].userName;
        this.mGameView.playerName2.text = msg.data[1].userName;
        this.mGameView.img_player1_icon.skin = msg.data[0].userHead;
        this.mGameView.img_player2_icon.skin = msg.data[1].userHead;
    };
    return GameController;
}());
//# sourceMappingURL=GameController.js.map