gc.GameStageChange = function(){
    PIXI.Container.call(this);

    this.stagePoint = [[0,0],[-268,0],[-190,50],[160,-30],[180,60],[260,90],[-1060,-190],[-860,90]];                   //나라 위치 포이트
    this.stageRotation = [0,0,-Math.PI/4,-(Math.PI/2+0.2915),-Math.PI/2+0.321,-Math.PI/2+0.1974,Math.PI/2+0.195,-Math.PI/2+0.8685];     //비행기 나는 각도
    this.stageCountryFlagPosition = [[0,0],[0.2,0.78],[0.4,0.78],[0.6,0.78],[0.8,0.78],[0.294,0.885],[0.5,0.885],[0.71,0.885]];    //나라 국기 위치

    this.countryFlagContainer = new PIXI.Container();

    this.mapBG = PIXI.Sprite.fromFrame("popup_bg.png");                     //팝업 배경
    this.mapBG.anchor.set(0.5,0.5);
    this.mapBG.x = GD.width/2;
    this.mapBG.y = GD.height*0.4;
    this.addChild(this.mapBG);

    this.map = new PIXI.Sprite(GD.loader.resources['popupmap'].texture);            //세계지도
    this.map.scale.x = 0.8;
    this.map.scale.y = 0.8;

    this.map.x = -268;
    this.map.y = 30;

    this.addChild(this.map);

    this.stagePopup = PIXI.Sprite.fromFrame("popup_page.png");                      //스테지 팝업
    this.stagePopup.anchor.set(0.5,0.5);
    this.stagePopup.x = GD.width/2;
    this.stagePopup.y = GD.height/2;
    this.addChild(this.stagePopup);

    this.addChild(this.countryFlagContainer);

    this.countryText = PIXI.Sprite.fromFrame("popup_nation_0001.png");              //다음 나라 텍스트
    this.countryText.anchor.set(0.5,0.5);
    this.countryText.x = GD.width/2;
    this.countryText.y = GD.height*0.35;
    //this.addChild(this.countryText);

    this.airplane = PIXI.Sprite.fromFrame("popup_airplane.png");                    //비행기
    this.airplane.anchor.set(0.5,0.5);
    this.airplane.x = GD.width/2;
    this.airplane.y = GD.height*0.4;
    this.airplane.scale.x = 0.5;
    this.airplane.scale.y = 0.5;
    this.addChild(this.airplane);

    this.airplaneTween = null;
    this.mapTween = null;
    this.countryFlagTween = null;
    this.tweemTime = 2;
    this.delayTime = 0.5;

};

gc.GameStageChange.constructor = gc.GameStageChange;
gc.GameStageChange.prototype = Object.create(PIXI.Container.prototype);
//초기화
gc.GameStageChange.prototype.init = function () {
    this.removeChildren();
    this.addChild(this.mapBG);
    this.addChild(this.map);
    this.addChild(this.stagePopup);
    this.addChild(this.countryFlagContainer);
    this.addChild(this.countryText);
    this.addChild(this.airplane);
}
//스다트 무브
gc.GameStageChange.prototype.startMove = function (stageNum) {

    if(stageNum >= 7){
        this.showFinalCountryFlag();
        return;
    }
    this.showCountryFlag(stageNum);

}

//무브 앤딩 에니메이션
gc.GameStageChange.prototype.endingAnimation = function () {

    stageNum = 1;

    this.countryText.alpha = 0;
    this.airplane.scale.x = 1;
    this.airplane.scale.y = 1;
    TweenMax.from(this.airplane.scale,this.delayTime,{x:0.5,y:0.5,ease:Linear.easeNone});
    this.mapTween = TweenMax.to(this.map,this.tweemTime,{delay:this.delayTime,x:this.stagePoint[1][0],y:this.stagePoint[1][1]});
    this.airplaneTween = TweenMax.to(this.airplane,this.tweemTime,{delay:this.delayTime,rotation:-Math.PI/2});
    TweenMax.to(this.airplane.scale,this.delayTime,{delay:this.delayTime+this.tweemTime,x:0.5,y:0.5,onComplete:(function () {
        this.parent.showEndingPage();
    }).bind(this),ease:Linear.easeNone});
}

gc.GameStageChange.prototype.showPlaneMove = function (stageNum) {
    this.airplane.scale.x = 1;
    this.airplane.scale.y = 1;
    var string = stageNum+1;
    this.countryText.texture = PIXI.Texture.fromFrame("popup_nation_000"+string+".png");

    TweenMax.from(this.airplane.scale,this.delayTime,{delay:0.2,x:0.5,y:0.5,ease:Linear.easeNone});
    this.mapTween = TweenMax.to(this.map,this.tweemTime,{delay:this.delayTime+0.2,x:this.stagePoint[stageNum+1][0],y:this.stagePoint[stageNum+1][1]});
    this.airplaneTween = TweenMax.to(this.airplane,this.tweemTime,{delay:this.delayTime+0.2,rotation:this.stageRotation[stageNum+1],onComplete:(function (stageNum) {
        //this.showCountryFlag(stageNum);
    }).bind(this),onCompleteParams:[stageNum]});
    TweenMax.to(this.airplane.scale,this.delayTime,{delay:this.delayTime+this.tweemTime,x:0.5,y:0.5,onComplete:(function (stageNum) {
        this.showCountryText();
    }).bind(this),onCompleteParams:[stageNum],ease:Linear.easeNone});
}

gc.GameStageChange.prototype.showCountryText = function () {

    TweenMax.from(this.countryText.scale,1,{delay:0.3,x:1.2,y:1.2,onComplete:(function () {
        this.parent.stageChangeOver();
        this.removeChild(this.countryText);
    }).bind(this),onStart:(function () {
        this.addChild(this.countryText);
    }).bind(this)});
}

//게임 클리어 나라 국기
gc.GameStageChange.prototype.showFinalCountryFlag = function () {
    var countryFlag = PIXI.Sprite.fromFrame("popup_flag_0007.png");
    countryFlag.anchor.set(0.5,0.5);
    countryFlag.x = GD.width*this.stageCountryFlagPosition[7][0];
    countryFlag.y =GD.height*this.stageCountryFlagPosition[7][1];
    this.countryFlagContainer.addChild(countryFlag);
    if(gc.soundFlag)
    GD.soundPlay("sound_flag");
    this.countryFlagTween = TweenMax.to(countryFlag.scale,0.2,{repeat:3,yoyo:true,x:1.5,y:1.5,onComplete:(function () {
        this.endingAnimation();
    }).bind(this)});
}

//나라 국기 그리기
gc.GameStageChange.prototype.showCountryFlag = function (stageNum) {
    var countryFlag = PIXI.Sprite.fromFrame("popup_flag_000"+stageNum+".png");
    countryFlag.anchor.set(0.5,0.5);
    countryFlag.x = GD.width*this.stageCountryFlagPosition[stageNum][0];
    countryFlag.y =GD.height*this.stageCountryFlagPosition[stageNum][1];
    this.countryFlagContainer.addChild(countryFlag);
    if(gc.soundFlag)
    GD.soundPlay("sound_flag");
    this.countryFlagTween = TweenMax.to(countryFlag.scale,0.2,{repeat:3,yoyo:true,x:1.5,y:1.5,onComplete:(function (stageNum) {
        this.showPlaneMove(stageNum);
    }).bind(this),onCompleteParams:[stageNum]});
}

gc.GameStageChange.prototype.updateTransform = function() {
    PIXI.Container.prototype.updateTransform.call(this);
};