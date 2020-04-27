/**
 * Created by admin on 2016-10-24.
 */
gc.GameScene = function(){
    PIXI.Container.call(this);
    this.lastEventTime = undefined;    //클릭이 일어난 시간
//120
    this.cookieMatrixPos = [[75,550], [170,550], [265,550], [360,550], [455,550], [550,550], [645,550],
        [75,645], [170,645], [265,645], [360,645], [455,645], [550,645], [645,645],
        [75,740], [170,740], [265,740], [360,740], [455,740], [550,740], [645,740],
        [75,835], [170,835], [265,835], [360,835], [455,835], [550,835], [645,835],
        [75,935], [170,935], [265,935], [360,935], [455,935], [550,935], [645,935],
        [75,1030], [170,1030], [265,1030], [360,1030], [455,1030], [550,1030], [645,1030],
        [75,1125], [170,1125], [265,1125], [360,1125], [455,1125], [550,1125], [645,1125]];
    this.cookieNumMatrix = [];
    this.cookieMatrix = [];

    this.itemEffectMc = [];

    this.bombAnerge = 0;
    this.bombfull = 50;

    this.fixArr1 = [];
    this.fixArr2 = [];

    this.readytxt = true;
    this.starttxt = false;
    this.playGame = false;

    this.addPoint = 0;

    this.itemIndex = undefined;
    this.itemIndex1 = undefined;
    this.itemIndex2 = undefined;
    this.itemIndexes = [];

    this.canClick = false;

    this.hint = [];
    this.giveHint = false;

    this.bundle = [];

    this.prestageMode = 'normal';
    this.stageMode = 'normal';

    this.chance = 60;

    this.useItem = false;
    this.remembers = [];//=아이템과 같은 쿠키 저장

    this.combo = 0;
    this.restComboTime = 0;
    this.lastTime = undefined;

    this.totalCombo = 0;    //콤보 3회 이상.. 메달1, 콤보 100회 이상.. 메달4
    this.champagneCombo = 0;    //샴페인 아이템 10회.. 메달2
    this.bombCombo = 0; //폭탄 아이템 10회.. 메달3
    this.getMedal1 = false;
    this.getMedal2 = false;
    this.getMedal3 = false;
    this.getMedal4 = false;

    this.callfevercnt = 0;
    this.lastEnd = false;   //라스트팡인 경우 timeup이 안뜨게 하기 위함

    this.bumpscale = 0.01;
    this.pauseMode = false;
    this.pauseTime = 0;

    this.exceptSound = false; //모드가 바뀌는 동안 =아이템 사용 시 피버 사운드 한 번만 알리기 위함
};

gc.GameScene.constructor = gc.GameScene;
gc.GameScene.prototype = Object.create(PIXI.Container.prototype);

gc.GameScene.prototype.init = function() {
    this.readytxt = true;
    this.starttxt = false;
    this.declareObjects();
    this.setBG();
    this.readyGame();
    this.fever = setInterval(this.setFever.bind(this), 33.333);

    this.test = true;
    this.explode();
    this.stageMode = 'fever';
    this.actFever(); //첫 피버 때 버벅임 해결을 위해 미리 한 번 호출해 줌
    //기본 모드로 복귀
    this.stageMode = 'normal';
    this.normalMode();
};

//오브젝트 생성
gc.GameScene.prototype.declareObjects = function () {
    this.bomb = new PIXI.Sprite.fromFrame('bomb_0001.png');
    this.bombgauge = new PIXI.Sprite.fromFrame('bomb_gauge_bar_0001.png');
    this.chanceImg= new  gc.NumberText('score_num_', 'center', -4);
    this.readyBG = new PIXI.Sprite(GD.loader.resources['ready_bg'].texture);
    this.readyImg = new PIXI.Sprite.fromFrame('ready_0001.png');
    this.startImg = new PIXI.Sprite.fromFrame('start_0001.png');
    this.gameoverImg = new PIXI.Sprite.fromFrame('gameover.png');
    for(var i=0; i<this.cookieMatrixPos.length; i++) {
        this.cookieMatrix[i] = new PIXI.Sprite.fromFrame('cookie_0001.png');
        this.itemEffectMc[i] = new gc.MovieClip('item_effect_00', 1, 14, 0.2);
    }
    this.gameBG = new PIXI.Sprite(GD.loader.resources['game_bg'].texture);
    this.gameTable = new PIXI.Sprite(GD.loader.resources['game_table'].texture);
    this.shadow = new PIXI.Sprite(GD.loader.resources['shadow_bg'].texture);
    this.fevereffect1 = new gc.MovieClip('fever_effect_1_00', 1, 23, 0.3, true);
    this.fevereffect2 = new gc.MovieClip('fever_effect_2_00', 1, 29, 0.3, true);
    this.normalmomo = new gc.MovieClip('momo_normal_00', 1, 50, 0.3);
    this.fevermomo = new gc.MovieClip('momo_fever_00', 1, 43, 0.3);
    this.normalshushu = new gc.MovieClip('shushu_normal_00', 1, 12, 0.3);
    this.fevershushu = new gc.MovieClip('shushu_fever_00', 1, 17, 0.3);
    this.timeup = new PIXI.Sprite.fromFrame('momotime_0001.png');
    this.scoreTxt= new  gc.NumberText('score_num_', 'center', -4);
    this.crossEffect1 = new PIXI.Sprite.fromFrame('line_clear_effect.png');
    this.crossEffect2 = new PIXI.Sprite.fromFrame('line_clear_effect.png');
    this.superfeverText = new PIXI.Sprite.fromFrame('super_fever_0001.png');
    this.feverText = new PIXI.Sprite.fromFrame('fever_0001.png');
};

//게임 세팅=================================================================================================
gc.GameScene.prototype.readyGame = function() {
    if(this.readytxt) {
        GD.soundPlay('sound_ready');
        this.readyBG.anchor.set(0.5);
        this.readyBG.position.x = GD.width / 2;
        this.readyBG.position.y = GD.height / 2;
        this.addChild(this.readyBG);

        this.readyImg.anchor.set(0.5);
        this.readyImg.position = this.readyBG.position;
        this.readyImg.scale.x = 0;
        this.readyImg.scale.y = 0;
        TweenMax.to(this.readyImg.scale, 0.8, {x:1, y:1});
        this.addChild(this.readyImg);

        this.readytxt = false;
        this.starttxt = true;
        setTimeout(this.startGame.bind(this), 1000);
    }
};

gc.GameScene.prototype.startGame = function() {
    if(this.starttxt){
        GD.soundPlay('sound_start');
        this.readyImg.visible = false;
        this.startImg.anchor.set(0.5);
        this.startImg.position = this.readyImg.position;
        this.startImg.scale.x = 0;
        this.startImg.scale.y = 0;
        TweenMax.to(this.startImg.scale, 0.5, {x:1.2, y:1.2});
        this.addChild(this.startImg);

        setTimeout(this.playStart.bind(this),600);
    }
};

gc.GameScene.prototype.setItemEffect = function () {
    for(var i=0; i<this.cookieMatrix.length; i++) this.cookieMatrix[i].removeChild(this.itemEffectMc[i]);

    for(var i=0; i<this.cookieMatrixPos.length; i++){
        this.itemEffectMc[i].anchor.set(0.5);
        this.itemEffectMc[i].stop();
        this.itemEffectMc[i].alpha = 0;
        this.cookieMatrix[i].addChild(this.itemEffectMc[i]);
    }
};

gc.GameScene.prototype.playStart = function(){
    this.removeChild(this.readyImg);
    this.removeChild(this.startImg);
    this.readyBG.visible = false;
    this.setCookies();
};

gc.GameScene.prototype.setBG = function() {
    this.gameTable.position.y = 470;

    this.addChild(this.gameBG);

    this.setFeverEffect2();
    this.setMomo();
    this.setShushu();

    this.gameBG.addChild(this.gameTable);
    this.setBomb();
    this.setChance();
    this.makeShadow();
    this.setScore();
    this.setFeverEffect1();
};

gc.GameScene.prototype.makeShadow = function () {
    this.shadowContainer.addChild(this.shadow);
    this.shadow.alpha = 0;
};

gc.GameScene.prototype.setFeverEffect1 = function() {

    this.fevereffect1.anchor.set(0.5);
    this.fevereffect1.position.x = gc.width/2;
    this.fevereffect1.position.y = 600;
    this.addChild(this.fevereffect1);
    this.fevereffect1.alpha = 0;
};

gc.GameScene.prototype.setFeverEffect2 = function() {
    this.fevereffect2.anchor.set(0.5);
    this.fevereffect2.position.x = gc.width/2;
    this.fevereffect2.position.y = 288.5;
    this.gameBG.addChild(this.fevereffect2);
    this.fevereffect2.alpha = 0;
};

gc.GameScene.prototype.setMomo = function() {
    this.normalmomo.position.x = gc.width / 2;
    this.normalmomo.position.y = 220;
    this.gameBG.addChild(this.normalmomo);

    this.fevermomo.position.x = this.normalmomo.x;
    this.fevermomo.position.y = this.normalmomo.y;
    this.fevermomo.alpha = 0;
    this.fevermomo.stop();
    this.gameBG.addChild(this.fevermomo);
};

gc.GameScene.prototype.setShushu = function() {
    this.normalshushu.position.x = gc.width / 4;
    this.normalshushu.position.y = 300;
    this.gameBG.addChild(this.normalshushu);

    this.fevershushu.position.x = this.normalshushu.x;
    this.fevershushu.position.y = this.normalshushu.y;
    this.fevershushu.alpha = 0;
    this.fevershushu.stop();
    this.gameBG.addChild(this.fevershushu);
};

gc.GameScene.prototype.normalMode = function () {
    console.log('normal');
    this.fevermomo.alpha = 0;
    this.fevermomo.stop();
    this.normalmomo.alpha = 1;
    this.normalmomo.play();
    this.fevershushu.alpha = 0;
    this.fevershushu.stop();
    this.normalshushu.alpha = 1;
    this.normalshushu.play();
};

gc.GameScene.prototype.otherMode = function () {
    console.log('other');
    this.normalmomo.alpha = 0;
    this.normalmomo.stop();
    this.fevermomo.alpha = 1;
    this.fevermomo.play();
    this.normalshushu.alpha = 0;
    this.normalshushu.stop();
    this.fevershushu.alpha = 1;
    this.fevershushu.play();
};

gc.GameScene.prototype.setChance = function () {
    if(this.explodeContainer == undefined) {
        this.explodeContainer = new PIXI.Container();
        this.explodeContainer.position = this.gameBG.position;
        this.explodeContainer.width = this.gameBG.width;
        this.explodeContainer.height = this.gameBG.height;
        this.addChild(this.explodeContainer);
    }

    this.shadowContainer = new PIXI.Container();
    this.addChild(this.shadowContainer);

    if(this.explodeContainer2 == undefined) {
        this.explodeContainer2 = new PIXI.Container();
        this.explodeContainer2.position = this.gameBG.position;
        this.explodeContainer2.width = this.gameBG.width;
        this.explodeContainer2.height = this.gameBG.height;
        this.addChild(this.explodeContainer2);
    }

    this.chanceImg.x = 55;
    this.chanceImg.y = 45;
    this.chanceImg.scale.x = 0.8;
    this.chanceImg.scale.y = 0.8;

    this.rangeChance();
};

//남은 기회 표시
gc.GameScene.prototype.rangeChance = function () {
    this.chanceImg.setValue(this.chance);
};

//라스트팡(남은 아이템 클리어)=======================================================================================
gc.GameScene.prototype.lastPang = function () {
    this.lastEnd = true;
    this.itemOver = false;

    this.scanIndex = undefined;
    this.useItem = false;

    var count = 0;
    for(var i=0; i<this.cookieNumMatrix.length; i++){
        if(this.cookieNumMatrix[i] > 6){
            this.scanIndex = i;
            this.useItem = true;
            if (this.cookieNumMatrix[i] == 10) {this.actBomb(i);}
            else if (this.cookieNumMatrix[i] == 9) {this.actEqual(i);}
            else if (this.cookieNumMatrix[i] == 8) {
                this.crossIndex = i;
                this.actCross(i);
            }
            break;
        } else {count++;}
    }
    if(count == this.cookieNumMatrix.length) {
        this.itemOver = true;
        this.checkMatching3();
    }
};

//게임오버===========================================================================================================
gc.GameScene.prototype.setGameOver = function(){
    this.canClick = false;
    this.playGame = false;
    this.checkLeftItem();
    if(this.lastEnd) {
        this.timeup.anchor.set(0.5);
        this.timeup.position.x = this.gameBG.width / 2;
        this.timeup.position.y = GD.height/2+50;
        this.timeup.scale.x = 0;
        this.timeup.scale.y = 0;
        this.addChild(this.timeup);
        GD.soundPlay('sound_momotime');
        this.canClick = false;
        this.removeChild(this.hintMc1);
        this.removeChild(this.hintMc2);
        if (this.real1 != undefined) {this.real1.alpha = 1;}
        if (this.real2 != undefined) {this.real2.alpha = 1;}
        this.reachmax = false;
        this.incdgree = 0.15;
        this.stageMode = 'momotime';
        this.playGame = false;
        this.otherMode();
        this.actfeverEffect();
        this.momotime = setInterval(this.showMomoTime.bind(this), 33.333);
    }
    else {//아이템이 없으면 모모타임 이미지, 소리 없이 끝내기
        this.lastPang();

    }
};

gc.GameScene.prototype.checkLeftItem = function () {
    this.lastEnd = false;
    for(var i=0; i<this.cookieNumMatrix.length; i++){
        if(this.cookieNumMatrix[i]>7) {
            this.lastEnd = true;
        }
    }
};

gc.GameScene.prototype.showMomoTime = function () {
    if(this.reachmax && this.timeup.scale.x <= 1) {
        this.incdgree = 0;
        setTimeout(this.delay.bind(this), 1000);
        clearInterval(this.momotime);
    }

    if(this.timeup.scale.x >= 1.3){
        this.incdgree *= -1;
        this.reachmax = true;
    }
    this.timeup.scale.x += this.incdgree;
    this.timeup.scale.y += this.incdgree;
};

gc.GameScene.prototype.delay = function () {
    this.dropmomotime = setInterval(this.dropMomoTime.bind(this),33.333);
};

gc.GameScene.prototype.dropMomoTime = function () {
    this.timeup.scale.y = 1.2;
    this.timeup.position.y += 70;

    if(this.timeup.position.y >= gc.height+this.timeup.height){
        this.removeChild(this.timeup);
        //모모타임이 되고 나서 제일 첫 lastpang
        this.lastPang();
        clearInterval(this.dropmomotime);
    }
};

gc.GameScene.prototype.setScore = function(){
    this.scoreTxt.x = 355;
    this.scoreTxt.y = 45;
    this.scoreTxt.scale.x = 0.8;
    this.scoreTxt.scale.y = 0.8;

    this.score = 0;
    this.scoreTxt.setValue(this.score);

    this.shadowContainer.addChild(this.chanceImg);
    this.shadowContainer.addChild(this.scoreTxt);
};

gc.GameScene.prototype.setBomb = function() {
    this.bomb.anchor.set(0.5);
    this.bomb.x = 69;
    this.bomb.y = 211;
    //this.bomb.alpha = 0;

    this.bombgauge.anchor.x = 0.5;
    this.bombgauge.anchor.y = 1;
    this.bombgauge.position.x = 69;
    this.bombgauge.position.y = 448;

    this.addChild(this.bombgauge);
    this.addChild(this.bomb);
};

gc.GameScene.prototype.setCookies = function() {
    for(var i=0; i<this.cookieMatrixPos.length; i++){
        if(this.cookieNumMatrix[i] < 7 || this.cookieNumMatrix[i] == undefined) {
            this.cookieNumMatrix[i] = parseInt(Math.random() * 6 + 1);
        }
    }

    if(this.checkMatching1()){
        this.setCookies();
    }else{  //맞는게 없을 때
        for(var i=0; i<this.cookieNumMatrix.length; i++) {
            this.drawCookie(this.cookieNumMatrix[i], i);
        }
        this.giveHint = false;
        if(this.playGame) this.findHint();
    }
};

gc.GameScene.prototype.drawCookie = function (cookieNum, index) {
    switch (cookieNum) {
        case 1:
            this.cookieMatrix[index].texture = PIXI.Texture.fromFrame('cookie_0001.png');
            break;
        case 2:
            this.cookieMatrix[index].texture = PIXI.Texture.fromFrame('cookie_0002.png');
            break;
        case 3:
            this.cookieMatrix[index].texture = PIXI.Texture.fromFrame('cookie_0003.png');
            break;
        case 4:
            this.cookieMatrix[index].texture = PIXI.Texture.fromFrame('cookie_0004.png');
            break;
        case 5:
            this.cookieMatrix[index].texture = PIXI.Texture.fromFrame('cookie_0005.png');
            break;
        case 6:
            this.cookieMatrix[index].texture = PIXI.Texture.fromFrame('cookie_0006.png');
            break;
        default :
            this.cookieMatrix[index].texture = this.cookieMatrix[index].texture;
    }

    this.cookieMatrix[index].anchor.set(0.5);
    this.cookieMatrix[index].scale.x = 0.85;
    this.cookieMatrix[index].scale.y = 0.85;
    this.cookieMatrix[index].position.x = this.cookieMatrixPos[index][0];
    this.cookieMatrix[index].position.y = this.cookieMatrixPos[index][1];
    if(this.cookieNumMatrix[index] < 7) TweenMax.from(this.cookieMatrix[index], 0.1, {y:this.cookieMatrixPos[index][1]-30});
    this.cookieMatrix[index].flag = 1;
    if(this.cookieNumMatrix[index] != 9) this.cookieMatrix[index].remember = 0;  //Equal아이템이 나왔을 때 없앨 번호 기억을 위함
    this.cookieMatrix[index].buttonMode = true;
    this.cookieMatrix[index].interactive = true;

    if(!gc.IS_MOBILE)
    {
        this.cookieMatrix[index].mousedown = this.cookieMatrix[index].touchstart = (function(e){
            e.stopPropagation();
            this.getTouchStartPosition(index);
        }).bind(this);

        this.cookieMatrix[index].mouseupoutside = this.cookieMatrix[index].touchendoutside = (function(e){
            e.stopPropagation();
            this.getTouchEndPosition(index);
        }).bind(this);
    }
    else
    {
        this.cookieMatrix[index].touchstart = (function(e){
            e.stopPropagation();
            if(gc.IS_MOBILE) {
                this.previousX = e.data.getLocalPosition(this.parent).x;
                this.previousY = e.data.getLocalPosition(this.parent).y;
            }
            this.getTouchStartPosition(index);
        }).bind(this);

        this.cookieMatrix[index].touchendoutside = (function(e){
            e.stopPropagation();
            if(gc.IS_MOBILE) {
                this.currentX = e.data.getLocalPosition(this.parent).x;
                this.currentY = e.data.getLocalPosition(this.parent).y;
            }
            this.getTouchEndPosition(index);
        }).bind(this);
    }

    this.gameBG.addChild(this.cookieMatrix[index]);

    if(index == 48){
        this.playGame = true;
        this.canClick = true;
        if(this.lastEventTime == undefined) this.lastEventTime = Date.now();
        if(this.sethint == undefined) this.sethint = setInterval(this.setHint.bind(this), 33.333);
        if(this.bum == undefined) this.bum = setInterval(this.bump.bind(this), 33.333);
        this.setItemEffect();
        this.setFeverText();
        //맞출 블럭이 없어 새로 그려졌을 때 아이템 강조 이펙트 작동을 위함
        this.stopItemAccentEffect();
        this.playItemAccentEffect();
    }
};

//힌트==========================================================================================
gc.GameScene.prototype.setHint = function () {
    var now = Date.now();
    if(!this.pauseMode) {
        if(this.pauseTime != 0){
            this.lastEventTime += Math.abs(now - this.pauseTime);
            this.pauseTime = 0;
        }
        if (Math.abs(this.lastEventTime - now) / 1000 >= 5) {
            if (!this.giveHint && this.playGame) this.showHint();
        }
    }else{
        if(this.pauseTime == 0) this.pauseTime = now;
    }
};

gc.GameScene.prototype.findHint = function () {
    var temp = undefined;
    var index = undefined;
    var check1 = undefined;
    var check2 = undefined;
    this.hint = [];
    //오른쪽 맨 끝 열은 체크안해도 됨
    for(var i=0; i<6; i++){
        for(var j=0; j<7; j++){
            index = i + j*7;
            temp = this.cookieNumMatrix[index];
            this.cookieNumMatrix[index] = this.cookieNumMatrix[index+1];
            this.cookieNumMatrix[index+1] = temp;
            check1 = this.checkMatching1();
            this.cookieNumMatrix[index+1] = this.cookieNumMatrix[index];
            this.cookieNumMatrix[index] = temp;
            if(check1) this.hint.push([index, index+1]);
        }
    }

    //맨 아래 행은 체크 안해도 됨
    for(var i=0; i<7; i++){
        for(var j=0; j<6; j++){
            index = i+ j*7;
            temp = this.cookieNumMatrix[index];
            this.cookieNumMatrix[index] = this.cookieNumMatrix[index+7];
            this.cookieNumMatrix[index+7] = temp;
            check2 = this.checkMatching1();
            this.cookieNumMatrix[index+7] = this.cookieNumMatrix[index];
            this.cookieNumMatrix[index] = temp;
            if(check2) this.hint.push([index, index+7]);
        }
    }

    //맞춰지는 블럭 없을 때 다시 그리기
    if(this.hint.length == 0){
        for(var i=0; i<this.cookieMatrix.length; i++){
            if(this.cookieNumMatrix[i]<7) this.gameBG.removeChild(this.cookieMatrix[i]);
        }
        this.setCookies();
    }
};

gc.GameScene.prototype.showHint = function(){
    this.giveHint = true;
    var texturename1, texturename2;
    var randHint = parseInt(Math.random() * this.hint.length);
    var texturenum1 = this.cookieNumMatrix[this.hint[randHint][0]];
    var texturenum2 = this.cookieNumMatrix[this.hint[randHint][1]];
    if(this.cookieNumMatrix[this.hint[randHint][0]] < 7) texturename1 = 'cookie_' + texturenum1 + '_00';
    if(this.cookieNumMatrix[this.hint[randHint][1]] < 7) texturename2 = 'cookie_' + texturenum2 + '_00';

    this.removeChild(this.hintMc1);
    this.removeChild(this.hintMc2);
    if(this.real1 != undefined) this.real1.alpha = 1;
    if(this.real2 != undefined) this.real2.alpha = 1;

    if(this.cookieNumMatrix[this.hint[randHint][0]] < 7) {
        this.hintMc1 = new gc.MovieClip(texturename1, 1, 8, 0.2);
        this.hintMc1.anchor.set(0.5);
        this.hintMc1.scale.x = 0.85;
        this.hintMc1.scale.y = 0.85;
        this.hintMc1.position.x = this.cookieMatrixPos[this.hint[randHint][0]][0];
        this.hintMc1.position.y = this.cookieMatrixPos[this.hint[randHint][0]][1]-12;
        this.addChild(this.hintMc1);
        this.real1 = this.cookieMatrix[this.hint[randHint][0]];
        this.real1.alpha = 0;
    }

    if(this.cookieNumMatrix[this.hint[randHint][1]] < 7) {
        this.hintMc2 = new gc.MovieClip(texturename2, 1, 8, 0.2);
        this.hintMc2.anchor.set(0.5);
        this.hintMc2.scale.x = 0.85;
        this.hintMc2.scale.y = 0.85;
        this.hintMc2.position.x = this.cookieMatrixPos[this.hint[randHint][1]][0];
        this.hintMc2.position.y = this.cookieMatrixPos[this.hint[randHint][1]][1]-12;
        this.addChild(this.hintMc2);
        this.real2 = this.cookieMatrix[this.hint[randHint][1]];
        this.real2.alpha = 0;
    }
};

//선택한 마우스 포인트 저장
gc.GameScene.prototype.getTouchStartPosition = function(index) {
    if(!gc.IS_MOBILE){
        var e = window.event;
        this.previousX = e.clientX;
        this.previousY = e.clientY;
    }
    if(this.canClick && this.playGame) this.scanCookieNum(index);
};

//끝난 마우스 포인트 저장, 스와핑 방향 검사
gc.GameScene.prototype.getTouchEndPosition = function(index) {
    if(!gc.IS_MOBILE){
        var e = window.event;
        this.currentX = e.clientX;
        this.currentY = e.clientY;
    }
    if(this.canClick && this.playGame) this.swap(index);
};

//클릭한 쿠키의 인덱스가 아이템인 겨우 아이템 작동
gc.GameScene.prototype.scanCookieNum = function (index) {
    if(this.cookieNumMatrix[index]>6) {
        this.scanIndex = index;
        if(this.chance>0) {
            this.chance--;
            this.rangeChance();
        }
        this.useItem = true;

        this.lastEventTime = Date.now();
        this.giveHint = false;
        this.removeChild(this.hintMc1);
        this.removeChild(this.hintMc2);
        if(this.real1 != undefined) this.real1.alpha = 1;
        if(this.real2 != undefined) this.real2.alpha = 1;

        if (this.cookieNumMatrix[index] == 10) {
            if (this.canClick) this.actBomb(index);
        } else if (this.cookieNumMatrix[index] == 9) {
            if (this.canClick) this.actEqual(index);
        } else if (this.cookieNumMatrix[index] == 8) {
            this.crossIndex = index;
            if (this.canClick) this.actCross(index);
        }
        this.combo++;
        this.totalCombo++;
        if(this.combo>=15) {this.stageMode = 'superfever';}
        else if(this.combo>=5){
            this.stageMode = 'fever';
            this.callfevercnt = 0;
        } else{this.stageMode = 'normal';}
        this.lastTime = Date.now();
        this.restComboTime = 3;
        this.canClick = false;
    }else this.useItem = false;
};

//스와핑==================================================================================
gc.GameScene.prototype.swap = function(clickIndex){
    var gapX = this.currentX - this.previousX;
    var gapY = this.currentY - this.previousY;

    //힌트 movieclip삭제
    this.removeChild(this.hintMc1);
    this.removeChild(this.hintMc2);
    //힌트애니메이션동안 안보였던 원래 텍스쳐 보이게 하기
    if(this.real1 != undefined) this.real1.alpha = 1;
    if(this.real2 != undefined) this.real2.alpha = 1;

    //왼쪽 쿠키랑 바꾸기
    if((gapX<0) && (Math.abs(gapX)>Math.abs(gapY))){
        if(clickIndex%7 != 0){
            this.lastEventTime = Date.now();
            this.canClick = false;
            this.swapLeft(clickIndex);
            return;
        }
    }
    //오른쪽
    if((gapX>0) && (Math.abs(gapX)>Math.abs(gapY))){
        if((clickIndex%7) != 6 || (clickIndex==0)){
            this.lastEventTime = Date.now();
            this.canClick = false;
            this.swapRight(clickIndex);
            return;
        }
    }
     //위쪽
    if((gapY<0) && (Math.abs(gapX)<Math.abs(gapY))){
        if(clickIndex > 6){
            this.lastEventTime = Date.now();
            this.canClick = false;
            this.swapUp(clickIndex);
            return;
        }
    }
    //아래쪽
    if((gapY>0) && (Math.abs(gapX)<Math.abs(gapY))){
        if(clickIndex < 42){
            this.lastEventTime = Date.now();
            this.canClick = false;
            this.swapDown(clickIndex);
        }
    }
};

gc.GameScene.prototype.swapLeft = function (selectIndex) {
    var tempTexture1, tempTexture2;
    var tempRemember;
    //텍스쳐 저장
    tempTexture1 = this.cookieMatrix[selectIndex].texture;
    tempTexture2 = this.cookieMatrix[selectIndex-1].texture;

    //매칭 확인을 위해 쿠키 번호 바꾸기
    var tempNum = this.cookieNumMatrix[selectIndex];
    this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex-1];
    this.cookieNumMatrix[selectIndex-1] = tempNum;

    //매칭 확인
    this.checkMatching2(selectIndex);
    this.fixArr1 = this.memories;
    this.itemIndex1 = this.itemIndex;
    this.checkMatching2(selectIndex-1);
    this.fixArr2 = this.memories;
    this.itemIndex2 = this.itemIndex;

    //맞는게  없을 때
    if((this.fixArr1.length == 0) && (this.fixArr2.length == 0)){
        //쿠키 번호 복구
        tempNum = this.cookieNumMatrix[selectIndex];
        this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex-1];
        this.cookieNumMatrix[selectIndex-1] = tempNum;

        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex-1].texture = tempTexture1;

        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {x:this.cookieMatrixPos[selectIndex-1][0], onComplete: (function () {
            this.cookieMatrix[selectIndex].texture = tempTexture1;
            TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {x:this.cookieMatrixPos[selectIndex-1][0]});
        }.bind(this))});

        TweenMax.from(this.cookieMatrix[selectIndex-1], 0.1, {x:this.cookieMatrixPos[selectIndex][0], onComplete:(function () {
            this.cookieMatrix[selectIndex-1].texture = tempTexture2;
            TweenMax.from(this.cookieMatrix[selectIndex-1], 0.1, {x:this.cookieMatrixPos[selectIndex][0], onComplete:(function(){
                this.canClick = true;
            }.bind(this))});
        }.bind(this))});
        this.lastEventTime = Date.now();
        this.giveHint = false;
    } else {//맞춰졌을 때

        this.chance--;
        if(this.fixArr1.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.fixArr2.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.combo>=15) {this.stageMode = 'superfever';}
        else if(this.combo>=5){
            this.stageMode = 'fever';
            this.callfevercnt = 0;
        } else{this.stageMode = 'normal';}
        this.lastTime = Date.now();
        this.restComboTime = 3;
        this.rangeChance();
        //스와핑 효과 보이기
        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex - 1].texture = tempTexture1;
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {x: this.cookieMatrixPos[selectIndex - 1][0], onComplete:(function () {
            for(var i=0; i<this.fixArr1.length; i++) this.cookieMatrix[this.fixArr1[i]].alpha = 0;
        }.bind(this))});
        TweenMax.from(this.cookieMatrix[selectIndex - 1], 0.1, {x: this.cookieMatrixPos[selectIndex][0], onComplete:(function () {
            for(var i=0; i<this.fixArr2.length; i++) this.cookieMatrix[this.fixArr2[i]].alpha = 0;
        }.bind(this))});

        //remember값 교환
        tempRemember = this.cookieMatrix[selectIndex].remember;
        this.cookieMatrix[selectIndex].remember = this.cookieMatrix[selectIndex-1].remember;
        this.cookieMatrix[selectIndex-1].remember = tempRemember;

        //경우에 상관없이 explode() 실행.. 객체 의미 없음
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {onComplete:(function () {
            this.explode();
        }.bind(this))});
    }
};

gc.GameScene.prototype.swapRight = function (selectIndex) {
    var tempTexture1, tempTexture2;
    var tempRemember;
    //텍스쳐 저장
    tempTexture1 = this.cookieMatrix[selectIndex].texture;
    tempTexture2 = this.cookieMatrix[selectIndex+1].texture;

    //매칭 확인을 위해 쿠키 번호 바꾸기
    var tempNum = this.cookieNumMatrix[selectIndex];
    this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex+1];
    this.cookieNumMatrix[selectIndex+1] = tempNum;

    //매칭 확인
    this.checkMatching2(selectIndex);
    this.fixArr1 = this.memories;
    this.itemIndex1 = this.itemIndex;
    this.checkMatching2(selectIndex+1);
    this.fixArr2 = this.memories;
    this.itemIndex2 = this.itemIndex;

    //맞는게  없을 때
    if((this.fixArr1.length == 0) && (this.fixArr2.length == 0)) {

        //쿠키 번호 복구
        tempNum = this.cookieNumMatrix[selectIndex];
        this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex + 1];
        this.cookieNumMatrix[selectIndex + 1] = tempNum;

        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex+1].texture = tempTexture1;

        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {x:this.cookieMatrixPos[selectIndex+1][0], onComplete: (function () {
            this.cookieMatrix[selectIndex].texture = tempTexture1;
            TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {x:this.cookieMatrixPos[selectIndex+1][0]});
        }.bind(this))});

        TweenMax.from(this.cookieMatrix[selectIndex+1], 0.1, {x:this.cookieMatrixPos[selectIndex][0], onComplete:(function () {
            this.cookieMatrix[selectIndex+1].texture = tempTexture2;
            TweenMax.from(this.cookieMatrix[selectIndex+1], 0.1, {x:this.cookieMatrixPos[selectIndex][0], onComplete:(function(){
                this.canClick = true;
            }.bind(this))});
        }.bind(this))});
        this.lastEventTime = Date.now();
        this.giveHint = false;
    } else{//맞춰졌을 때

        this.chance--;
        if(this.fixArr1.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.fixArr2.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.combo>=15) {this.stageMode = 'superfever';}
        else if(this.combo>=5){
            this.stageMode = 'fever';
            this.callfevercnt = 0;
        } else{this.stageMode = 'normal';}
        this.lastTime = Date.now();
        this.restComboTime = 3;
        this.rangeChance();
        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex + 1].texture = tempTexture1;
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {x: this.cookieMatrixPos[selectIndex + 1][0], onComplete:(function () {
            for(var i=0; i<this.fixArr1.length; i++) this.cookieMatrix[this.fixArr1[i]].alpha = 0;
        }.bind(this))});
        TweenMax.from(this.cookieMatrix[selectIndex + 1], 0.1, {x: this.cookieMatrixPos[selectIndex][0], onComplete:(function () {
            for(var i=0; i<this.fixArr2.length; i++) this.cookieMatrix[this.fixArr2[i]].alpha = 0;
        }.bind(this))});

        //remember값 교환
        tempRemember = this.cookieMatrix[selectIndex].remember;
        this.cookieMatrix[selectIndex].remember = this.cookieMatrix[selectIndex+1].remember;
        this.cookieMatrix[selectIndex+1].remember = tempRemember;

        //경우에 상관없이 explode() 실행.. 객체 의미 없음
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {onComplete:(function () {
            this.explode();
        }.bind(this))});
    }
};

gc.GameScene.prototype.swapUp = function (selectIndex) {
    var tempTexture1, tempTexture2;
    var tempRemember;
    //텍스쳐 저장
    tempTexture1 = this.cookieMatrix[selectIndex].texture;
    tempTexture2 = this.cookieMatrix[selectIndex-7].texture;

    //매칭 확인을 위해 쿠키 번호 바꾸기
    var tempNum = this.cookieNumMatrix[selectIndex];
    this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex-7];
    this.cookieNumMatrix[selectIndex-7] = tempNum;

    //매칭 확인
    this.checkMatching2(selectIndex);
    this.fixArr1 = this.memories;
    this.itemIndex1 = this.itemIndex;
    this.checkMatching2(selectIndex-7);
    this.fixArr2 = this.memories;
    this.itemIndex2 = this.itemIndex;

    //맞는게  없을 때
    if((this.fixArr1.length == 0) && (this.fixArr2.length == 0)) {
        //쿠키 번호 복구
        tempNum = this.cookieNumMatrix[selectIndex];
        this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex - 7];
        this.cookieNumMatrix[selectIndex - 7] = tempNum;

        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex-7].texture = tempTexture1;

        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {y:this.cookieMatrixPos[selectIndex-7][1], onComplete: (function () {
            this.cookieMatrix[selectIndex].texture = tempTexture1;
            TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {y:this.cookieMatrixPos[selectIndex-7][1]});
        }.bind(this))});

        TweenMax.from(this.cookieMatrix[selectIndex-7], 0.1, {y:this.cookieMatrixPos[selectIndex][1], onComplete:(function () {
            this.cookieMatrix[selectIndex-7].texture = tempTexture2;
            TweenMax.from(this.cookieMatrix[selectIndex-7], 0.1, {y:this.cookieMatrixPos[selectIndex][1], onComplete:(function(){
                this.canClick = true;
            }.bind(this))});
        }.bind(this))});
        this.lastEventTime = Date.now();
        this.giveHint = false;
    } else{//맞춰졌을 때

        this.chance--;
        if(this.fixArr1.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.fixArr2.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.combo>=15) {this.stageMode = 'superfever';}
        else if(this.combo>=5){
            this.stageMode = 'fever';
            this.callfevercnt = 0;
        } else{this.stageMode = 'normal';}
        this.lastTime = Date.now();
        this.restComboTime = 3;
        this.rangeChance();
        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex-7].texture = tempTexture1;
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {y:this.cookieMatrixPos[selectIndex-7][1], onComplete:(function () {
            for(var i=0; i<this.fixArr1.length; i++) this.cookieMatrix[this.fixArr1[i]].alpha = 0;
        }.bind(this))});
        TweenMax.from(this.cookieMatrix[selectIndex-7], 0.1, {y:this.cookieMatrixPos[selectIndex][1], onComplete:(function () {
            for(var i=0; i<this.fixArr2.length; i++) this.cookieMatrix[this.fixArr2[i]].alpha = 0;
        }.bind(this))});

        //remember값 교환
        tempRemember = this.cookieMatrix[selectIndex].remember;
        this.cookieMatrix[selectIndex].remember = this.cookieMatrix[selectIndex-7].remember;
        this.cookieMatrix[selectIndex-7].remember = tempRemember;

        //경우에 상관없이 explode() 실행.. 객체 의미 없음
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {onComplete:(function () {
            this.explode();
        }.bind(this))});
    }
};

gc.GameScene.prototype.swapDown = function (selectIndex) {
    var tempTexture1, tempTexture2;
    var tempRemember;
    //텍스쳐 저장
    tempTexture1 = this.cookieMatrix[selectIndex].texture;
    tempTexture2 = this.cookieMatrix[selectIndex+7].texture;

    //매칭 확인을 위해 쿠키 번호 바꾸기
    var tempNum = this.cookieNumMatrix[selectIndex];
    this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex+7];
    this.cookieNumMatrix[selectIndex+7] = tempNum;

    //매칭 확인
    this.checkMatching2(selectIndex);
    this.fixArr1 = this.memories;
    this.itemIndex1 = this.itemIndex;
    this.checkMatching2(selectIndex+7);
    this.fixArr2 = this.memories;
    this.itemIndex2 = this.itemIndex;

    //맞는게  없을 때
    if((this.fixArr1.length == 0) && (this.fixArr2.length == 0)) {

        //쿠키 번호 복구
        tempNum = this.cookieNumMatrix[selectIndex];
        this.cookieNumMatrix[selectIndex] = this.cookieNumMatrix[selectIndex + 7];
        this.cookieNumMatrix[selectIndex + 7] = tempNum;

        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex+7].texture = tempTexture1;

        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {y:this.cookieMatrixPos[selectIndex+7][1], onComplete: (function () {
            this.cookieMatrix[selectIndex].texture = tempTexture1;
            TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {y:this.cookieMatrixPos[selectIndex+7][1]});
        }.bind(this))});

        TweenMax.from(this.cookieMatrix[selectIndex+7], 0.1, {y:this.cookieMatrixPos[selectIndex][1], onComplete:(function () {
            this.cookieMatrix[selectIndex+7].texture = tempTexture2;
            TweenMax.from(this.cookieMatrix[selectIndex+7], 0.1, {y:this.cookieMatrixPos[selectIndex][1], onComplete:(function(){
                this.canClick = true;
            }.bind(this))});
        }.bind(this))});
        this.lastEventTime = Date.now();
        this.giveHint = false;
    } else{//맞춰졌을 때

        this.chance--;
        if(this.fixArr1.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.fixArr2.length != 0) {
            this.combo++;
            this.totalCombo++;
        }
        if(this.combo>=15) {this.stageMode = 'superfever';}
        else if(this.combo>=5){
            this.stageMode = 'fever';
            this.callfevercnt = 0;
        } else{this.stageMode = 'normal';}
        this.lastTime = Date.now();
        this.restComboTime = 3;
        this.rangeChance();
        this.cookieMatrix[selectIndex].texture = tempTexture2;
        this.cookieMatrix[selectIndex + 7].texture = tempTexture1;
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {y: this.cookieMatrixPos[selectIndex + 7][1], onComplete:(function () {
            for(var i=0; i<this.fixArr1.length; i++) this.cookieMatrix[this.fixArr1[i]].alpha = 0;
        }.bind(this))});
        TweenMax.from(this.cookieMatrix[selectIndex + 7], 0.1, {y: this.cookieMatrixPos[selectIndex][1], onComplete:(function () {
            for(var i=0; i<this.fixArr2.length; i++) this.cookieMatrix[this.fixArr2[i]].alpha = 0;
        }.bind(this))});

        //remember값 교환
        tempRemember = this.cookieMatrix[selectIndex].remember;
        this.cookieMatrix[selectIndex].remember = this.cookieMatrix[selectIndex+7].remember;
        this.cookieMatrix[selectIndex+7].remember = tempRemember;

        //경우에 상관없이 explode() 실행.. 객체 의미 없음
        TweenMax.from(this.cookieMatrix[selectIndex], 0.1, {onComplete:(function () {
            this.explode();
        }.bind(this))});
    }
};

//폭발==============================================================================================
//더이상 터질게 없을 때
gc.GameScene.prototype.explode = function () {
    var makeBomb = false;
    var explodeEqual = false;
    var explodeBomb = false;
    this.explodetime = 0.3;

    //= 아이템 체크
    if(this.scanIndex != undefined) {
        if (this.cookieNumMatrix[this.scanIndex] == 9) {explodeEqual = true;}
        if (this.cookieNumMatrix[this.scanIndex] == 10) {explodeBomb = true;}
    }

    //크로스 아이템 이펙트
    if(this.crossIndex != undefined){
        this.crossEffect1.anchor.set(0.5);
        this.crossEffect1.position.x = this.cookieMatrixPos[this.crossIndex][0];
        this.crossEffect1.position.y = this.cookieMatrixPos[21][1];
        this.crossEffect1.height = 720;
        this.crossEffect2.anchor.set(0.5);
        this.crossEffect2.position.x = this.cookieMatrixPos[3][0];
        this.crossEffect2.position.y = this.cookieMatrixPos[this.crossIndex][1];
        this.crossEffect2.height = 720;
        this.crossEffect2.transform.rotation = Math.PI/2;
        var crossMc = new gc.MovieClip('eraser_effect_00', 1, 7, 0.3);
        crossMc.anchor.set(0.5);
        crossMc.position.x = this.cookieMatrixPos[this.crossIndex][0];
        crossMc.position.y = this.cookieMatrixPos[this.crossIndex][1];
        crossMc.loop = false;

        this.explodeContainer.addChild(this.crossEffect1);
        this.explodeContainer.addChild(this.crossEffect2);
        this.explodeContainer.addChild(crossMc);
        crossMc.onComplete = function () {
            gc.game.explodeContainer.removeChild(crossMc);
        };
        TweenMax.to(this.crossEffect1.scale, this.explodetime, {x:1, y:0.6, alpha:1});
        TweenMax.to(this.crossEffect2.scale, this.explodetime, {x:1, y:0.6, alpha:1});
    }

    if(explodeBomb){
        var bombMc = new gc.MovieClip('bomb_effect_00', 1, 9, 0.3);
        bombMc.anchor.set(0.5);
        bombMc.position.x = this.cookieMatrixPos[this.scanIndex][0];
        bombMc.position.y = this.cookieMatrixPos[this.scanIndex][1];
        bombMc.loop = false;
        this.explodeContainer.addChild(bombMc);
    }

    //기본 폭발 이미지.. 모든 폭발에 적용
    for(var i=0; i<this.cookieMatrix.length; i++){
        if(this.cookieMatrix[i].flag == 0){
            //폭탄아이템 생성 조건
            this.bombAnerge++;
            if(this.bombAnerge >= this.bombfull) {
                makeBomb = true;
                this.setBombItem();
                this.bombAnerge -= this.bombfull;
            }

            var explodeMc = new gc.MovieClip('clear_effect_00', 1, 9, 0.4);
            explodeMc.anchor.set(0.5);
            explodeMc.position.x = this.cookieMatrixPos[i][0];
            explodeMc.position.y = this.cookieMatrixPos[i][1];
            explodeMc.alpha = 1;
            explodeMc.loop = false;
            if(!explodeEqual) {this.explodeContainer.addChild(explodeMc);
            }else{this.explodeContainer2.addChild(explodeMc);}
        }
    }
    this.scanIndex = undefined;

    //mask 폭탄 게이지 보이는 화면
    var gap = this.bombgauge.height/this.bombfull;
    if(this.thing == undefined) {
        this.thing = new PIXI.Graphics();
        this.thing.position.x = 0;
        this.thing.position.y = 0;
        this.bombgauge.addChild(this.thing);
        this.bombgauge.mask = this.thing;
        this.thing.lineStyle(0);

        this.thing.clear();
        this.thing.beginFill(0xffffff, 1);
        this.maskRect = this.thing.drawRect(-14, -this.bombgauge.height+gap*(this.bombfull-this.bombAnerge), this.bombgauge.width, this.bombgauge.height, 10);
        this.thing.endFill();
    }

    //점수 부여
    for(var i=0; i<this.cookieMatrix.length; i++){
        if(this.cookieMatrix[i].flag == 0) {this.addScore(i)}
    }

    //폭발 사운드 처리
    if(!explodeEqual && !this.test)this.manageSound();

    this.settingItem();

    //점수 합산
    if(!this.test) DataManager.point('point', this.addPoint, Date.now().toString()); // 획득 점수 저장
    this.score += this.addPoint;
    this.addPoint = 0;

    this.scoreTxt.setValue(this.score);

    //터지는 이미지 시간 작용
    this.explodetime = 0.3;
    if(this.crossIndex != undefined) {this.crossIndex = undefined;}
    if(explodeEqual) {this.explodetime = 0.15*(this.remembers.length+2);}

    if(makeBomb) {
        //폭탄 생성 이펙트
        this.cookieMatrix[this.randBombIndex].alpha = 0;
        var fakebomb = new  PIXI.Sprite.fromFrame('bomb_0002.png');
        fakebomb.anchor.set(0.5);
        fakebomb.x = this.bomb.x;
        fakebomb.y = this.bomb.y;
        this.addChild(fakebomb);
        this.restComboTime = 3;
        TweenMax.to(fakebomb.scale, 0.3, {x:1.3, y:1.3, onComplete:(function () {
            TweenMax.to(fakebomb.scale, 0.2, {x:1, y:1, onComplete:(function () {
                TweenMax.to(fakebomb, 1, {rotation:90, x:this.cookieMatrixPos[this.randBombIndex][0], y:this.cookieMatrixPos[this.randBombIndex][1], onComplete:(function () {
                    this.removeChild(fakebomb);
                    this.cookieMatrix[this.randBombIndex].alpha = 1;
                    this.explodeOver();
                }).bind(this)},0);
            }).bind(this)});
        }).bind(this)});
        //TweenMax.to(fakebomb, 1.2, {rotation:90, x:this.cookieMatrixPos[this.randBombIndex][0], y:this.cookieMatrixPos[this.randBombIndex][1], onComplete:(function () {
        //    this.removeChild(fakebomb);
        //    this.cookieMatrix[this.randBombIndex].alpha = 1;
        //    this.explodeOver();
        //}).bind(this)},0);

        this.bomb.texture = PIXI.Texture.fromFrame('bomb_0002.png');
        TweenMax.to(this.maskRect, 0.1, {y:-this.bombgauge.height, onComplete:(function () {
            TweenMax.to(this.maskRect, 0.1, {y:-this.bombgauge.height+gap*this.bombfull, onComplete:(function () {
                TweenMax.to(this.maskRect, 0.1, {y:-this.bombgauge.height+gap*(this.bombfull-this.bombAnerge), onComplete:(function () {
                    this.bomb.texture = PIXI.Texture.fromFrame('bomb_0001.png');
                }).bind(this)});
            }).bind(this)});
        }).bind(this)});
    } else {
        TweenMax.to(this.maskRect, 0.1, {y:-this.bombgauge.height+gap*(this.bombfull-this.bombAnerge)});
        this.explodeOver();
    }
    //폭발 이미지 제거
    TweenMax.to(this.cookieMatrix[0], this.explodetime, {onComplete: (function() {
        this.explodeContainer.removeChildren();
        if(this.explodeContainer2 != undefined)this.explodeContainer2.removeChildren();
    }.bind(this))});

    //메달 획득 확인
    this.manageMedal();
};

//폭발 후 쿠키 떨어뜨리는 역할
gc.GameScene.prototype.explodeOver = function () {
    //터질때 발생하는 작업 전체 종료 후 쿠키 떨구기
    TweenMax.to(this.cookieMatrix[0], this.explodetime, {onComplete: (function() {
        this.dropCookie();
    }.bind(this))});
};

//소리===================================================================================================
gc.GameScene.prototype.manageSound = function () {
    if(this.prestageMode == this.stageMode){
        this.exceptSound = false;
        this.basicSound();
    }else{
        //모드 변화 시
        if(this.stageMode == 'superfever' || this.stageMode == 'fever') {
            if(!this.exceptSound) {this.exceptSound = true;}
            else{GD.soundPlay('sound_match_fever');}
        } else{
            //모모타임일 때
            if(this.stageMode == 'momotime') {this.momoSound();}
            else{this.basicSound();}//피버모드가 풀렸을 때
        }
    }
};

gc.GameScene.prototype.basicSound = function () {
    //기본 블럭 사운드
    if(!this.useItem){
        if (this.stageMode == 'normal') {
            if (this.combo == 1) GD.soundPlay('sound_match_1');
            else if (this.combo == 3)GD.soundPlay('sound_match_2');
            else GD.soundPlay('sound_match_3');
        } else {GD.soundPlay('sound_match_fever');}
        return;
    }else{
        //아이템 사운드
        GD.soundPlay('sound_use');
        this.useItem = false;
        return;
    }
};

gc.GameScene.prototype.momoSound = function () {
    //기본 블럭 사운드
    if(!this.useItem){
        if (this.prestageMode == 'normal') {
            if (this.combo == 1) GD.soundPlay('sound_match_1');
            else if (this.combo == 3) GD.soundPlay('sound_match_2');
            else GD.soundPlay('sound_match_3');
        } else {GD.soundPlay('sound_match_fever')};
        return;
    }else{
        //아이템 사운드
        GD.soundPlay('sound_use');
        this.useItem = false;
        return;
    }
};

//점수===================================================================================================
gc.GameScene.prototype.addScore = function (i) {
    if(this.stageMode == 'normal') {this.normalPoint(i);}
    else if(this.stageMode == 'fever'){this.feverPoint(i);}
    else if(this.stageMode == 'superfever'){this.superfeverPoint(i);}
    else {  //모모타임 점수
        if(this.prestageMode == 'normal'){this.normalPoint(i);}
        else if(this.prestageMode == 'fever'){this.feverPoint(i);}
        else if(this.prestageMode == 'superfever'){this.superfeverPoint(i);}
    }
};

gc.GameScene.prototype.normalPoint = function (i) {
    if(this.cookieNumMatrix[i]<7) {this.addPoint += 100;}
    else {
        if(this.cookieNumMatrix[i] == 10) {this.addPoint += 450;}
        if(this.cookieNumMatrix[i] == 9) {this.addPoint += 350;}
        if(this.cookieNumMatrix[i] == 8) {this.addPoint += 250;}
    }
};

gc.GameScene.prototype.feverPoint = function (i) {
    if(this.cookieNumMatrix[i]<7) {this.addPoint += 200;}
    else {
        if(this.cookieNumMatrix[i] == 10) {this.addPoint += 600;}
        if(this.cookieNumMatrix[i] == 9) {this.addPoint += 550;}
        if(this.cookieNumMatrix[i] == 8) {this.addPoint += 350;}
    }
}

gc.GameScene.prototype.superfeverPoint = function (i) {
    if(this.cookieNumMatrix[i]<7) {
        this.addPoint += 300;}
    else {
        if(this.cookieNumMatrix[i] == 10) {this.addPoint += 900;}
        if(this.cookieNumMatrix[i] == 9) {this.addPoint += 700;}
        if(this.cookieNumMatrix[i] == 8) {this.addPoint += 500;}
    }
};

//아이템====================================================================================
gc.GameScene.prototype.settingItem = function(){
    if(this.itemIndex1 != undefined){
        if(this.fixArr1.length >=5){
            this.setEqualItem('origin');
        } else if(this.fixArr1.length >=4){
            this.setCrossItem('origin');
        }

        this.cookieMatrix[this.itemIndex1].alpha = 1;
        this.cookieMatrix[this.itemIndex1].flag = 1;
        this.itemIndex1 = undefined;
    }

    if(this.itemIndex2 != undefined){
        if(this.fixArr2.length >=5){
            this.setEqualItem('other');
        } else if(this.fixArr2.length >=4){
            this.setCrossItem('other');
        }

        this.cookieMatrix[this.itemIndex2].alpha = 1;
        this.cookieMatrix[this.itemIndex2].flag = 1;
        this.itemIndex2 = undefined;
    }
};

gc.GameScene.prototype.setBombItem = function(){
    this.randBombIndex = parseInt(Math.random()*14);
    if(this.cookieMatrix[this.randBombIndex].flag != 0 && this.cookieNumMatrix[this.randBombIndex] <7) {
        this.cookieMatrix[this.randBombIndex].texture = PIXI.Texture.fromFrame('bomb_item_0001.png');
        this.cookieNumMatrix[this.randBombIndex] = 10;
        this.matchItemSize(this.randBombIndex);
    }else this.setBombItem();
};

gc.GameScene.prototype.setEqualItem = function(thing){
    var itemName = 'cookie2_000';
    var fullItemName;
    switch (thing) {
        case 'origin':
            this.cookieMatrix[this.itemIndex1].remember = this.cookieNumMatrix[this.itemIndex1];
            fullItemName = itemName+this.cookieMatrix[this.itemIndex1].remember+'.png';
            this.cookieMatrix[this.itemIndex1].texture = PIXI.Texture.fromFrame(fullItemName);
            this.cookieNumMatrix[this.itemIndex1] = 9;
            this.matchItemSize(this.itemIndex1);
            break;
        case 'other':
            this.cookieMatrix[this.itemIndex2].remember = this.cookieNumMatrix[this.itemIndex2];
            fullItemName = itemName+this.cookieMatrix[this.itemIndex2].remember+'.png';
            this.cookieMatrix[this.itemIndex2].texture = PIXI.Texture.fromFrame(fullItemName);
            this.cookieNumMatrix[this.itemIndex2] = 9;
            this.matchItemSize(this.itemIndex2);
            break;
    }
};

gc.GameScene.prototype.setCrossItem = function(thing){
    switch (thing) {
        case 'origin':
            this.cookieMatrix[this.itemIndex1].texture = PIXI.Texture.fromFrame('eraser_0001.png');
            this.cookieNumMatrix[this.itemIndex1] = 8;
            this.matchItemSize(this.itemIndex1);
            break;
        case 'other':
            this.cookieMatrix[this.itemIndex2].texture = PIXI.Texture.fromFrame('eraser_0001.png');
            this.cookieNumMatrix[this.itemIndex2] = 8;
            this.matchItemSize(this.itemIndex2);
            break;
    }
};

gc.GameScene.prototype.matchItemSize = function (index) {
    var min = 2;
    var max = 0;
    for(var i=0; i<this.cookieMatrix.length; i++){
        if(this.cookieMatrix[i].scale.x < min){min = this.cookieMatrix[i].scale.x}
    }
    if(min == 0.85){
        for(var i=0; i<this.cookieMatrix.length; i++){
            if(this.cookieMatrix[i].scale.x > max){max = this.cookieMatrix[i].scale.x}
        }
    }

    if(min != 0.85) {
        this.cookieMatrix[index].scale.x = min;
        this.cookieMatrix[index].scale.y = min;
    }else {
        this.cookieMatrix[index].scale.x = max;
        this.cookieMatrix[index].scale.y = max;
    }
    this.getItemIndex();
};

gc.GameScene.prototype.bump = function () {
    if(this.itemIndexes.length > 0) {
        if(this.cookieMatrix[this.itemIndexes[0]].scale.x >= 1 || this.cookieMatrix[this.itemIndexes[0]].scale.x <= 0.85){
            if(this.cookieMatrix[this.itemIndexes[0]].scale.x > 1) this.cookieMatrix[this.itemIndexes[0]].scale.x = 1;
            if(this.cookieMatrix[this.itemIndexes[0]].scale.x < 0.85) this.cookieMatrix[this.itemIndexes[0]].scale.x = 0.85;
            this.bumpscale *= -1;
        }
        this.cookieMatrix[this.itemIndexes[0]].scale.x += this.bumpscale;
        this.cookieMatrix[this.itemIndexes[0]].scale.y += this.bumpscale;
    }
    for(var i=0; i<this.itemIndexes.length; i++){
        this.cookieMatrix[this.itemIndexes[i]].scale.x = this.cookieMatrix[this.itemIndexes[0]].scale.x
        this.cookieMatrix[this.itemIndexes[i]].scale.y = this.cookieMatrix[this.itemIndexes[0]].scale.x;
    }
};

gc.GameScene.prototype.getItemIndex = function () {
    this.itemIndexes = [];
    for(var i=0; i<this.cookieNumMatrix.length; i++){
        if(this.cookieNumMatrix[i]>6){
            this.itemIndexes.push(i);
        }
    }
};

gc.GameScene.prototype.actBomb = function(actIndex){
    this.bombCombo++;
    //본인
    this.cookieMatrix[actIndex].flag = 0;
    this.cookieMatrix[actIndex].remember = 0;
    this.cookieMatrix[actIndex].alpha = 0;

    //첫번째 열이 아님
    if(actIndex%7 != 0) {
        //왼쪽 위
        if(actIndex-7-1 >= 0) {
            //대상이 아이템 블럭이 아님
            if(this.cookieNumMatrix[actIndex - 7 - 1] < 7) {
                this.cookieMatrix[actIndex - 7 - 1].flag = 0;
                this.cookieMatrix[actIndex - 7 - 1].alpha = 0;
                this.cookieMatrix[actIndex - 7 - 1].remember = 0;
            }
        }
        //왼쪽 아래
        if(actIndex+7-1 <= 48) {
            //대상이 아이템 블럭이 아님
            if(this.cookieNumMatrix[actIndex + 7 - 1] < 7) {
                this.cookieMatrix[actIndex + 7 - 1].flag = 0;
                this.cookieMatrix[actIndex + 7 - 1].alpha = 0;
                this.cookieMatrix[actIndex + 7 - 1].remember = 0;
            }
        }
        //왼쪽
        if(actIndex-1 >= 0) {
            //대상이 아이템 블럭이 아님
            if(this.cookieNumMatrix[actIndex - 1] < 7) {
                this.cookieMatrix[actIndex - 1].flag = 0;
                this.cookieMatrix[actIndex - 1].alpha = 0;
                this.cookieMatrix[actIndex - 1].remember = 0;
            }
        }
    }
    //위
    if(actIndex-7 >= 0){
        if(this.cookieNumMatrix[actIndex - 7] < 7) {
            this.cookieMatrix[actIndex - 7].flag = 0;
            this.cookieMatrix[actIndex - 7].alpha = 0;
            this.cookieMatrix[actIndex - 7].remember = 0;
        }
    }
    //아래
    if(actIndex+7 <= 48){
        if(this.cookieNumMatrix[actIndex + 7] < 7) {
            this.cookieMatrix[actIndex + 7].flag = 0;
            this.cookieMatrix[actIndex + 7].alpha = 0;
            this.cookieMatrix[actIndex + 7].remember = 0;
        }
    }

    //오른쪽 끝 열이 아님
    if(actIndex%7 != 6) {
        //오른쪽 위
        if (actIndex - 7 + 1 >= 0) {
            //대상이 아이템 블럭이 아님
            if (this.cookieNumMatrix[actIndex - 7 + 1] < 7) {
                this.cookieMatrix[actIndex - 7 + 1].flag = 0;
                this.cookieMatrix[actIndex - 7 + 1].alpha = 0;
                this.cookieMatrix[actIndex - 7 + 1].remember = 0;
            }
        }
        //오른쪽 아래
        if (actIndex + 7 + 1 <= 48) {
            //대상이 아이템 블럭이 아님
            if (this.cookieNumMatrix[actIndex + 7 + 1] < 7) {
                this.cookieMatrix[actIndex + 7 + 1].flag = 0;
                this.cookieMatrix[actIndex + 7 + 1].alpha = 0;
                this.cookieMatrix[actIndex + 7 + 1].remember = 0;
            }
        }
        //오른쪽
        if (actIndex + 1 <= 48) {
            //대상이 아이템 블럭이 아님
            if (this.cookieNumMatrix[actIndex + 1] < 7) {
                this.cookieMatrix[actIndex + 1].flag = 0;
                this.cookieMatrix[actIndex + 1].alpha = 0;
                this.cookieMatrix[actIndex + 1].remember = 0;
            }
        }
    }
    //아이템 사용시 강조 이펙트 제거를 위함
    this.stopItemAccentEffect();
    this.playItemAccentEffect();
    this.explode();
};

gc.GameScene.prototype.explodeEqual = function () {
    var explodeMc = new gc.MovieClip('clear_effect_00', 1, 9, 0.4);
    explodeMc.onComplete = function() {gc.game.explodeContainer2.removeChild(explodeMc);};
    explodeMc.anchor.set(0.5);
    explodeMc.position.x = this.cookieMatrixPos[this.remembers[0]][0];
    explodeMc.position.y = this.cookieMatrixPos[this.remembers[0]][1];
    explodeMc.alpha = 1;
    explodeMc.scale.x = 1.3;
    explodeMc.scale.y = 1.3;
    explodeMc.loop = false;
    this.explodeContainer2.addChild(explodeMc);
};

gc.GameScene.prototype.rise = function () {
    var fakeCookie = new PIXI.Sprite.fromFrame('cookie_1_0001.png');
    fakeCookie.texture = this.cookieMatrix[this.remembers[0]].texture;
    fakeCookie.anchor.set(0.5);
    fakeCookie.position.x = this.cookieMatrixPos[this.remembers[0]][0];
    fakeCookie.position.y = this.cookieMatrixPos[this.remembers[0]][1];
    this.explodeContainer2.addChild(fakeCookie);
    this.manageSound();

    this.cookieMatrix[this.remembers[0]].alpha = 0;
    this.cookieMatrix[this.remembers[0]].flag = 0;
    this.cookieMatrix[this.remembers[0]].remember = 0;
    TweenMax.to(fakeCookie.scale, 0.1,{x:1.15, y:1.15, onComplete:(function () {
        this.explodeEqual();

        this.remembers.splice(0, 1);
        if(this.remembers.length>0) setTimeout(this.rise.bind(this),100);
        else{
            this.explodeContainer2.removeChildren();
            this.explode();
            this.shadow.alpha = 0;
        }
    }).bind(this)});
};

gc.GameScene.prototype.actEqual = function(actIndex){
    this.remembers = [];
    this.tempRemembers = [];    // 쿠키가 커진 후 크기 돌려놓기 위함
    //본인
    this.cookieMatrix[actIndex].flag = 0;
    this.remembers.push(actIndex);

    for (var i = 0; i < this.cookieNumMatrix.length; i++) {
        if (this.cookieNumMatrix[i] == this.cookieMatrix[actIndex].remember) {
            this.cookieMatrix[i].flag = 0;
            this.remembers.push(i);
            this.tempRemembers.push(i);
        }
    }

    this.shadow.alpha = 1;
    //아이템 사용시 강조 이펙트 제거를 위함
    this.stopItemAccentEffect();
    this.playItemAccentEffect();
    //순서대로 커지게 만들기
    this.rise();
};

gc.GameScene.prototype.actCross = function(actIndex){
    this.champagneCombo++;
    //본인
    this.cookieMatrix[actIndex].flag = 0;
    this.cookieMatrix[actIndex].remember = 0;
    this.cookieMatrix[actIndex].alpha = 0;

    var colIndex = actIndex%7;  //몇번째 열인지 체크
    for(var i=0; i<7; i++){
        if(this.cookieMatrix[i * 7 + colIndex].flag != 0) {
            if (this.cookieNumMatrix[i * 7 + colIndex] < 7) {
                this.cookieMatrix[i * 7 + colIndex].flag = 0;
                this.cookieMatrix[i * 7 + colIndex].alpha = 0;
                this.cookieMatrix[i * 7 + colIndex].remember = 0;
            }
        }
    }

    var rowIndex = Math.floor(actIndex/7);  //몇번째 열인지 체크
    for(var i=0; i<7; i++){
        if(this.cookieMatrix[rowIndex * 7 + i].flag != 0) {
            if (this.cookieNumMatrix[rowIndex * 7 + i] < 7) {
                this.cookieMatrix[rowIndex * 7 + i].flag = 0;
                this.cookieMatrix[rowIndex * 7 + i].alpha = 0;
                this.cookieMatrix[rowIndex * 7 + i].remember = 0;
            }
        }
    }
    //아이템 사용시 강조 이펙트 제거를 위함
    this.stopItemAccentEffect();
    this.playItemAccentEffect();
    this.explode();
};

//쿠키 메우기==================================================================
gc.GameScene.prototype.dropCookie = function(){
    var index;
    var lineCount = 0;  //한 열의 빈 블럭 수 카운트
    var dropCount = 0;  //한 열의 내려온 블럭 수 카운트(완전히 내려온 후 카운트)
    var fullCount = 0;  //떨어질 블럭 전체 수 카운트(빈 공간 + 새로 떨어질 블럭 수)
    var dropIndexes = [];   //떨어질 블럭 인덱스

    for(var i=0; i<7; i++){
        lineCount = 0;
        //기존 블럭 내리기
        for(var j=6; j>=0; j--){
            index = j*7+i;
            if(this.cookieMatrix[index].flag == 0){
                lineCount++;
                this.cookieMatrix[index].alpha = 1;
                this.cookieMatrix[index].flag = 1;
            }else{
                if(lineCount > 0) {
                    fullCount++;
                    dropIndexes.push(index + lineCount * 7);
                    //내려올 블럭: (index + lineCount * 7), 복사해올 블럭: (index)
                    this.cookieMatrix[index + lineCount * 7].texture = this.cookieMatrix[index].texture;
                    this.cookieMatrix[index + lineCount * 7].remember = this.cookieMatrix[index].remember;
                    this.cookieMatrix[index].remember = 0;
                    this.cookieNumMatrix[index + lineCount * 7] = this.cookieNumMatrix[index];
                    this.cookieNumMatrix[index] = 0;

                    //아이템이 내려올 때 크기 복사
                    if(this.cookieNumMatrix[index + lineCount * 7] > 7) this.matchItemSize(index + lineCount * 7);
                    else{
                        this.cookieMatrix[index + lineCount * 7].scale.x = 0.85;
                        this.cookieMatrix[index + lineCount * 7].scale.y = 0.85;
                    }

                    TweenMax.from(this.cookieMatrix[index + lineCount * 7], 0.3, {
                        y: this.cookieMatrixPos[index][1], onComplete: (function () {
                            dropCount++;
                            if(dropCount == fullCount && !this.canClick) {
                                //이전 스테이지모드 저장
                                if(this.stageMode != 'momotime') this.prestageMode = this.stageMode;
                                this.checkAgain();
                            }
                            else {
                                this.lastEventTime = Date.now();
                            }
                        }.bind(this))
                    });
                }
            }
        }

        //새로운 쿠키 내리기
        for(var j= lineCount-1; j>=0; j--){
            index = j*7+i;
            fullCount++;
            this.cookieNumMatrix[index] = parseInt(Math.random()*6+1);
            this.cookieMatrix[index].texture = PIXI.Texture.fromFrame('cookie_000'+ this.cookieNumMatrix[index] + '.png');
            this.cookieMatrix[index].scale.x = 0.85;
            this.cookieMatrix[index].scale.y = 0.85;
            this.cookieMatrix[index].remember = 0;
            this.cookieMatrix[index].alpha = 1;
            this.cookieMatrix[index].flag = 1;
            TweenMax.from(this.cookieMatrix[index], 0.3, {y:this.gameTable.position.y+this.cookieMatrix[index].height/2, onComplete: (function (){
                dropCount++;
                if(dropCount == fullCount && !this.canClick) {
                    //이전 스테이지모드 저장
                    if(this.stageMode != 'momotime') this.prestageMode = this.stageMode;
                    this.checkAgain();
                }
                else {
                    this.lastEventTime = Date.now();
                }
            }.bind(this))});
        }
    }
    //내려올 블럭이 아이템일 경우 아이템 강조 이펙트도 같이 움직이기 위함
    this.stopItemAccentEffect();
    this.playItemAccentEffect();
    this.getItemIndex();

    //객체 의미 없음
    TweenMax.from(this.cookieMatrix[0], 0.3, {onComplete: (function (){
        this.restComboTime = 3; //=아이템 블럭이 많으면 다음 콤보까지 시간 부족.. 블럭 다 떨어지고 초기화

        //힌트 저장을 위함
        this.giveHint = false;
        if(!this.checkMatching1() && this.playGame) {
            this.checkAgain();
            this.findHint();
        }
        ////게임 종료
        //if(this.chance<=0 && !this.haveEmpty) this.setGameOver();
    }.bind(this))});
};

gc.GameScene.prototype.checkAgain = function(){
    for(var i=0; i<this.cookieMatrixPos.length; i++) {
        this.cookieMatrix[i].position.x = this.cookieMatrixPos[i][0];
        this.cookieMatrix[i].position.y = this.cookieMatrixPos[i][1];
    }
    this.checkMatching3();
};

//아이템 강조 이펙트 설정======================================================================
gc.GameScene.prototype.playItemAccentEffect = function () {
    for(var i=0; i<this.cookieNumMatrix.length; i++){
        if(this.cookieNumMatrix[i] > 7 && this.cookieMatrix[i].flag == 1){
            this.itemEffectMc[i].alpha = 1;
            this.itemEffectMc[i].play();
        }
    }
};

gc.GameScene.prototype.stopItemAccentEffect = function () {
    for(var i=0; i<this.itemEffectMc.length; i++) {
        this.itemEffectMc[i].stop();
        this.itemEffectMc[i].alpha = 0;
    }
};

//매칭확인=============================================================================
//처음 그릴때 매칭 되는 거 없게 하기 위함
gc.GameScene.prototype.checkMatching1= function(){
    //가로 체크
    var num1 = undefined;
    var num2 = undefined;
    var countRow = 0;
    var countCol = 0;
    var index1 = undefined;
    var index2 = undefined;
    //가로(행) 매칭 체크
    for(var i=0; i<7; i++){
        num1 = this.cookieNumMatrix[i*7];
        countRow = 0;
        for(var j=0; j<7; j++){
            index1 = j+i*7;
                if (num1 <7 && this.cookieNumMatrix[index1] == num1) {
                    countRow++;
                } else {
                    num1 = this.cookieNumMatrix[index1];
                    countRow = 1;
                }
            if (countRow >= 3) {
                return true;
            }
        }
    }

    //세로(열) 매칭 체크
    for(var i=0; i<7; i++){
        countCol = 0;
        num2 = this.cookieNumMatrix[i];
        for(var j=0; j<7; j++){
            index2 = j*7+i;
                if (num2<7 && this.cookieNumMatrix[index2] == num2) {
                    countCol++;
                } else {
                    num2 = this.cookieNumMatrix[index2];
                    countCol = 1;
                }
            if (countCol >= 3) {
                return true;
            }
        }
    }
    return false;
};

//스와핑 후 매칭 확인
gc.GameScene.prototype.checkMatching2 = function (checkingIndex){
    this.l_c = 0;
    this.r_c = 0;
    this.u_c = 0;
    this.d_c = 0;
    this.itemIndex = undefined;
    this.memories = [];
    if(this.cookieNumMatrix[checkingIndex] < 7) {
        //왼쪽 파트
        for (var i = checkingIndex; i >= Math.floor(checkingIndex / 7) * 7; i--) {
            if (this.cookieNumMatrix[i] == this.cookieNumMatrix[checkingIndex]) {
                this.l_c++;
            } else {
                break;
            }
        }
        //오른쪽 파트
        for (var i = checkingIndex; i <= Math.floor(checkingIndex / 7 + 1) * 7 - 1; i++) {
            if (this.cookieNumMatrix[i] == this.cookieNumMatrix[checkingIndex]) {
                this.r_c++;
            } else {
                break;
            }
        }
        //위쪽 파트
        for (var i = checkingIndex; i >= 0; i -= 7) {
            if (this.cookieNumMatrix[i] == this.cookieNumMatrix[checkingIndex]) {
                this.u_c++;
            } else {
                break;
            }
        }
        //아래쪽 파트
        for (var i = checkingIndex; i < this.cookieMatrix.length; i += 7) {
            if (this.cookieNumMatrix[i] == this.cookieNumMatrix[checkingIndex]) {
                this.d_c++;
            } else {
                break;
            }
        }
    }
    //매칭 쿠키 확인
    if(this.l_c+this.r_c -1 >= 3){  //맞춰진 가로 수가 3개 이상이면
        //가로 4개 이상
        if(this.l_c+this.r_c -1 >= 4) this.itemIndex = checkingIndex;

        for(var i=checkingIndex-this.l_c+1; i <= checkingIndex + this.r_c-1; i++){
            this.cookieMatrix[i].flag = 0;
            this.memories.push(i);
        }
        if(this.u_c+this.d_c-1 >= 3){   //맞춰진 세로 수가 3개 이상이면
            for(var i=checkingIndex-(this.u_c-1)*7; i <= checkingIndex+(this.d_c-1)*7; i+=7){
                if(i != checkingIndex) {
                    this.cookieMatrix[i].flag = 0;
                    this.memories.push(i);
                }
            }
            //십자 모양
            this.itemIndex = checkingIndex;
        }
        return true;
    }else if(this.l_c+this.r_c -1 < 3 && this.u_c+this.d_c-1 >= 3) { //가로 개수가 3개 미만이고, 세로 개수가 3개 이상
        for(var i=checkingIndex-(this.u_c-1)*7; i <= checkingIndex+(this.d_c-1)*7; i+=7){
            this.cookieMatrix[i].flag = 0;
            this.memories.push(i);
        }
        //세로 4개 이상
        if(this.memories.length>=4) this.itemIndex = checkingIndex;
        return true;
    }else{  //맞는게 없을 때
        return false;
    }
};

//모든 쿠키 내리고 나서 다시 매칭 확인
gc.GameScene.prototype.checkMatching3 = function(){
    this.bundle = [];   //매칭되는 모든 배열을 저장하기 위한 배열
    for (var j = 0; j < this.cookieMatrix.length; j++) {
        this.l_c = 0;
        this.r_c = 0;
        this.u_c = 0;
        this.d_c = 0;
        this.itemIndex = undefined;
        this.memories = [];

        if (this.cookieMatrix[j].flag != 0 && this.cookieNumMatrix[j]<7) {
            //왼쪽 파트
            for (var i = j; i >= Math.floor(j / 7) * 7; i--) {
                if (this.cookieNumMatrix[i] == this.cookieNumMatrix[j]) {
                    this.l_c++;
                } else {
                    break;
                }
            }
            //오른쪽 파트
            for (var i = j; i <= Math.floor(j / 7 + 1) * 7 - 1; i++) {
                if (this.cookieNumMatrix[i] == this.cookieNumMatrix[j]) {
                    this.r_c++;
                } else {
                    break;
                }
            }
            //위쪽 파트
            for (var i = j; i >= 0; i -= 7) {
                if (this.cookieNumMatrix[i] == this.cookieNumMatrix[j]) {
                    this.u_c++;
                } else {
                    break;
                }
            }
            //아래쪽 파트
            for (var i = j; i < this.cookieMatrix.length; i += 7) {
                if (this.cookieNumMatrix[i] == this.cookieNumMatrix[j]) {
                    this.d_c++;
                } else {
                    break;
                }
            }

            //매칭 쿠키 확인
            if (this.l_c + this.r_c - 1 >= 3) {  //맞춰진 가로 수가 3개 이상이면
                for (var i = j - this.l_c + 1; i <= j + this.r_c - 1; i++) {
                    this.memories.push(i);
                }

                if (this.u_c + this.d_c - 1 >= 3) {   //맞춰진 세로 수가 3개 이상이면
                    for (var i = j - (this.u_c - 1) * 7; i <= j + (this.d_c - 1) * 7; i += 7) {
                        if (i != j) {
                            this.memories.push(i);
                        }
                    }
                }
            } else if (this.l_c + this.r_c - 1 < 3 && this.u_c + this.d_c - 1 >= 3) { //가로 개수가 3개 미만이고, 세로 개수가 3개 이상
                for (var i = j - (this.u_c - 1) * 7; i <= j + (this.d_c - 1) * 7; i += 7) {
                    this.memories.push(i);
                }
            }
        }
        this.bundle[j] = this.memories;
    }

    var bundleCount = 0;
    for (var i = 0; i < this.bundle.length; i++) {
        if (this.bundle[i].length == 0) {
            bundleCount++;
        }
    }
    //맞춰진 블럭이 있을때
    if (bundleCount != this.bundle.length) this.searchingMaxLength();
    else {
        this.haveEmpty = false;
        for (var i = 0; i < this.cookieMatrix.length; i++) {
            if (this.cookieMatrix[i].flag == 0) this.haveEmpty = true;
        }
        if (this.haveEmpty) this.explode();
        else {
            if (this.playGame) {
                this.canClick = true;
            }
            else {
                if (this.itemOver) {
                    this.PlayOver();//게임이 완전히 끝났을 때
                } else {
                    this.lastPang();//횟수는 끝났으나 아이템이 남아있으면 터뜨리기}
                }
            }

            //게임 종료
            if (this.playGame && this.chance <= 0 && !this.haveEmpty) this.setGameOver();
        }
    }
};

gc.GameScene.prototype.PlayOver = function () {
    this.gameoverImg.anchor.set(0.5);
    this.gameoverImg.x = GD.width/2;
    this.gameoverImg.y = GD.height/2;
    this.addChild(this.gameoverImg);

    TweenMax.to(this.gameoverImg.scale, 0.5, {x:1, y:1, onComplete:(function () {
        TweenMax.to(this.gameoverImg.scale, 0.3, {x:1.2, y:1.2});
    }).bind(this)});
    TweenMax.from(this.gameoverImg, 0.5, {y:GD.height+this.gameoverImg.height});

    this.giveHint = true;
    this.canClick = false;
    this.normalmomo.stop();
    this.fevermomo.stop();
    this.normalshushu.stop();
    this.fevershushu.stop();
    this.fevereffect1.stop();
    this.fevereffect2.stop();
    GD.soundPlay('sound_gameover');
    setTimeout(this.onResult.bind(this),1000);
};

//타임업 사운드가 끝나고 결과창으로 이동
gc.GameScene.prototype.onResult = function () {
    GD.bgmStop();
    gc.game = null;
    //GD.commonOption.finish(this.score);
    // ---------------- 这里是结束的地方 ---------------- //
    //this.score

    if ( window.parent != null ) {
        window.parent.postMessage({
          cmd: "GameOver",
          msg: {
            score: this.score, // 如果是星星数，也是这个分数
            level: 0
          }
        }, "*");
      }
};

//맞춰진 배열에서 가장 긴 배열에 아이템을 넣기 위한 함수
gc.GameScene.prototype.searchingMaxLength = function(){
    var maxLength = 0;
    var maxLengthIndex = undefined;
    for(var i=0; i<this.bundle.length; i++){
        if(this.bundle[i].length > maxLength) {
            maxLength = this.bundle[i].length;
            maxLengthIndex = i;
        }
    }

    for (var i = 0; i < this.bundle[maxLengthIndex].length; i++) {
        this.cookieMatrix[this.bundle[maxLengthIndex][i]].flag = 0;
        this.cookieMatrix[this.bundle[maxLengthIndex][i]].alpha = 0;
        this.cookieMatrix[this.bundle[maxLengthIndex][i]].remember = 0;
    }

    if(this.bundle[maxLengthIndex].length >= 4) {
        if (this.bundle[maxLengthIndex].length >= 5) {
            this.cookieMatrix[maxLengthIndex].remember = this.cookieNumMatrix[maxLengthIndex];

            var itemName = 'cookie2_000';
            var fullItemName = itemName+this.cookieMatrix[maxLengthIndex].remember+'.png';
            this.cookieMatrix[maxLengthIndex].texture = PIXI.Texture.fromFrame(fullItemName);

            this.cookieNumMatrix[maxLengthIndex] = 9;
        }else if (this.bundle[maxLengthIndex].length >= 4) {
            this.cookieMatrix[maxLengthIndex].texture = PIXI.Texture.fromFrame('eraser_0001.png');
            this.cookieNumMatrix[maxLengthIndex] = 8;
        }
        this.cookieMatrix[maxLengthIndex].flag = 1;
        this.cookieMatrix[maxLengthIndex].alpha = 1;
    }


    this.combo++;
    this.totalCombo++;
    if(this.stageMode != 'momotime') {
        if(this.combo>=15) {this.stageMode = 'superfever';}
        else if(this.combo>=5){
            this.stageMode = 'fever';
            this.callfevercnt = 0;
        } else{this.stageMode = 'normal';}
    }
    this.lastTime = Date.now();
    this.restComboTime = 3;
    this.checkMatching3();
};

//피버모드=======================================================================================================
gc.GameScene.prototype.setFeverText = function () {
    this.superfeverText.anchor.set(0.5);
    this.superfeverText.position.x = gc.width / 2;
    this.superfeverText.position.y = this.gameTable.position.y;
    this.superfeverText.scale.x = 0;
    this.superfeverText.scale.y = 0;
    this.addChild(this.superfeverText);

    this.feverText.anchor.set(0.5);
    this.feverText.position.x = gc.width / 2;
    this.feverText.position.y = this.gameTable.position.y;
    this.feverText.scale.x = 0;
    this.feverText.scale.y = 0;
    this.addChild(this.feverText);
};

gc.GameScene.prototype.setFever = function () {
    if(!this.pauseMode) {
        var now = Date.now();
        if (this.lastTime == undefined) this.lastTime = now;
        if (this.playGame) {
            if (this.restComboTime > 0) {this.restComboTime -= (now - this.lastTime) / 1000;}
            else {
                this.combo = 0;
                this.restComboTime = 0;
                this.lastTime = undefined;
                if(this.stageMode != 'normal') this.prestageMode = this.stageMode;
                this.stageMode = 'normal';
                this.callfevercnt = 0;
            }
            if (this.prestageMode != this.stageMode && this.callfevercnt == 0) {this.actFever();}
            this.lastTime = now;
        }
    }else this.lastTime = Date.now();
};

gc.GameScene.prototype.actFever = function () {
    this.callfevercnt++;
    if(this.stageMode == 'normal'){
        this.normalMode();
        this.gameBG.texture = GD.loader.resources['game_bg'].texture;
        this.fevereffect1.alpha = 0;
        this.fevereffect2.alpha = 0;
    } else{
        this.otherMode();
        this.actfeverEffect();
    }
};

gc.GameScene.prototype.actfeverEffect = function(){
    if(this.test){
        this.fevereffect1.y = -200;
        this.fevereffect2.y = -200;
    }else {
        this.gameBG.texture = GD.loader.resources['game_bg_fever'].texture;
        this.fevereffect1.y = 465;
        this.fevereffect2.y = 345;
    }
    this.fevereffect1.alpha = 1;
    this.fevereffect2.alpha = 1;
    this.fevereffect2.scale.y = 1.5;
    if(!this.test)if (this.stageMode != 'momotime') GD.soundPlay('sound_fever');
    if (this.stageMode == 'superfever') {
        this.superfeverText.alpha = 1;
        TweenMax.to(this.superfeverText.scale, 0.5, {
            x: 1, y: 1, alpha: 1, onComplete: (function () {
                TweenMax.to(this.superfeverText, 0.7, {
                    onComplete: (function () {
                        this.superfeverText.scale.x = 0;
                        this.superfeverText.scale.y = 0;
                        this.superfeverText.alpha = 0;
                    }).bind(this)
                });
            }).bind(this)
        });
    } else if (this.stageMode == 'fever') {
       this.feverText.alpha = 1;
        TweenMax.to(this.feverText.scale, 0.5, {
            x: 1, y: 1, alpha: 1, onComplete: (function () {
                TweenMax.to(this.feverText, 0.7, {
                    onComplete: (function () {
                        this.feverText.scale.x = 0;
                        this.feverText.scale.y = 0;
                        this.feverText.alpha = 0;
                        if(this.test) {
                            this.test = false;
                            this.stageMode = 'normal';
                        }
                    }).bind(this)
                });
            }).bind(this)
        });
    }
};

// 일시정지
gc.GameScene.prototype.pause = function(){
    this.pauseMode = true;
    this.setInteractive(false);
};

// 게임진행
gc.GameScene.prototype.resume = function(){
    this.pauseMode = false;
    this.setInteractive(true);
};

// 버튼 이벤트 설정
gc.GameScene.prototype.setInteractive = function(bool){
    for(var i=0; i<this.cookieMatrix.length; i++){ this.cookieMatrix[i].interactive = bool;}
    if(this.pauseMode){
        this.fevereffect1.stop();
        this.fevereffect2.stop();
        this.normalmomo.stop();
        this.fevermomo.stop();
        this.normalshushu.stop();
        this.fevershushu.stop();
        if(this.giveHint){
            this.hintMc1.stop();
            this.hintMc2.stop();
        }
    }else{
        this.fevereffect1.play();
        this.fevereffect2.play();
        if(this.stageMode == 'normal') {this.normalMode();}
        else{this.otherMode();}
        if(this.giveHint){
            this.hintMc1.play();
            this.hintMc2.play();
        }
    }
};

//메달(업적) 관리==================================================================================================
gc.GameScene.prototype.manageMedal = function () {
    if(this.totalCombo >= 100 && !this.getMedal4) {
        DataManager.addMedal(4);
        this.getMedal4 = true;
    } else if(this.totalCombo >= 3 && !this.getMedal1) {
        DataManager.addMedal(1);
        this.getMedal1 = true;
    }else if(this.champagneCombo >= 10 && !this.getMedal2) {
        DataManager.addMedal(2);
        this.getMedal2 = true;
    }else if(this.bombCombo >= 10 && !this.getMedal3) {
        DataManager.addMedal(3);
        this.getMedal3 = true;
    }
};

gc.GameScene.getInstance = function(){
    if(!gc.game) gc.game = new gc.GameScene();
    return gc.game;
};