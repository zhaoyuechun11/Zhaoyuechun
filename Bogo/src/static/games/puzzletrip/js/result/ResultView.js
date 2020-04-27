gc.ResultView = function() {
    PIXI.Container.call(this);

    this.darkBg = new PIXI.Graphics();
    this.darkBg.lineStyle(1, 0x000, 1);
    this.darkBg.beginFill(0x000, 0.8);
    this.darkBg.drawRect(0, 0, gc.width, gc.height);
    this.darkBg.endFill();
    this.darkBg.interactive = true;
    this.setTouchEnd(this.darkBg);

    this.bg = PIXI.Sprite.fromFrame("popup_bg1.png");
    this.bg.anchor.set(0.5);
    this.bg.x = gc.width/2;
    this.bg.y = gc.height/2;

    this.scoreTxt = new gc.NumberText("c_score_0","center",0,null,null,"c_score_11");
    this.scoreTxt.x = 0;
    this.scoreTxt.y = -130;
    this.scoreTxt.setValue(1000000);
    this.bg.addChild(this.scoreTxt);

    this.bestScoreTxt = new gc.NumberText("c_score2_0","center",0,null,null,"c_score2_11");
    this.bestScoreTxt.x = 0;
    this.bestScoreTxt.y = 20;
    this.bg.addChild(this.bestScoreTxt);

    this.gropImg = PIXI.Sprite.fromFrame("popup_icon_1.png");
    this.gropImg.anchor.set(0.5);
    this.gropImg.scale.set(0.4);
    this.gropImg.x = 30;
    this.gropImg.y = 97;
    this.bg.addChild(this.gropImg);

    this.reStartBtn = PIXI.Sprite.fromFrame("popup_bt_retry.png");
    this.reStartBtn.anchor.set(0.5);
    this.reStartBtn.y = 220;
    this.bg.addChild(this.reStartBtn);
    this.setTouchStartAction(this.reStartBtn, function () {
        this.requestCloseWindow();
    },this);

    this.errorMessageTxt = new PIXI.Text("Failed to save game points.\nPlease join the game once again",{fontSize:'24px',fontWeight : 'bold'});
    this.errorMessageTxt.anchor.set(0.5);
    this.errorMessageTxt.x = 0;
    this.errorMessageTxt.y = 50;
    this.bg.addChild(this.errorMessageTxt);

};
gc.ResultView.constructor = gc.ResultView;
gc.ResultView.prototype = Object.create(PIXI.Container.prototype);

// 초기화
gc.ResultView.prototype.init = function(score, bestScore, rank, group,type,message)
{
    this.removeAll();

    if(score <=0){
        this.scoreTxt.setValue(0);
    }else{
        this.scoreTxt.setValue(score);
    }

    if(bestScore <=0){
        this.bestScoreTxt.setValue(0);
    }else{
        this.bestScoreTxt.setValue(bestScore);
    }

    var flag = false;
    if(false) {
        if (group == "DIAMOND") {
            flag = true;
            this.gropImg.texture = PIXI.Texture.fromFrame("popup_icon_1.png");
        } else if (group == "GOLD") {
            flag = true;
            this.gropImg.texture = PIXI.Texture.fromFrame("popup_icon_2.png");
        } else if (group == "SILVER") {
            flag = true;
            this.gropImg.texture = PIXI.Texture.fromFrame("popup_icon_3.png");
        } else if (group == "BRONZE") {
            flag = true;
            this.gropImg.texture = PIXI.Texture.fromFrame("popup_icon_4.png");
        }
    }else{
        try {
            flag = true;
            this.gropImg.texture = PIXI.Texture.fromImage(group);
        }catch(e){
            flag = false;
        }
    }

    if(flag){
        this.gropImg.visible = true;
    }else{
        this.gropImg.visible = false;
    }

    this.initPage(type,message);
    this.addChild(this.darkBg);
    this.addChild(this.bg);
    this.setInteractive(true);

};

gc.ResultView.prototype.initPage = function (type,message) {
    if(type == 1){
        this.bg.texture = PIXI.Texture.fromFrame("popup_bg1.png");
        this.scoreTxt.x = 0;
        this.scoreTxt.y = -130;
        this.reStartBtn.y = 220;
        this.bestScoreTxt.visible = true;
        //this.gropImg.visible = true;
        this.errorMessageTxt.visible = false;
    }else{
        if(message == 1){
            this.errorMessageTxt.text = "Failed to save game points.\nPlease join the game once again";
        }else{
            this.errorMessageTxt.text =  'Points will not be saved \nwhen non-logged in.';
        }
        this.bg.texture = PIXI.Texture.fromFrame("popup_bg4.png");
        this.scoreTxt.x = 0;
        this.scoreTxt.y = -60;
        this.reStartBtn.y = 155;
        this.bestScoreTxt.visible = false;
        this.gropImg.visible = false;
        this.errorMessageTxt.visible = true;
    }
};

gc.ResultView.prototype.requestCloseWindow = function(){
    this.setInteractive(false);
    this.removeChildren();
    this.emit("GOTO_MAINPAGE");
};

gc.ResultView.prototype.removeAll = function () {
    this.removeChildren();
};

gc.ResultView.prototype.setInteractive = function(bool){
    this.reStartBtn.interactive = bool;
};

gc.ResultView.prototype.updateTransform = function() {
    PIXI.Container.prototype.updateTransform.call( this );
};
