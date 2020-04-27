/**
 * Created by admin on 2016-10-24.
 */
gc.GameScene = function(){
    PIXI.Container.call(this);
    var gap = 5;
    this.mapmatrixXpos = [];
    this.mapmatrixYpos = [];
    for(var i=0; i<6; i++) this.mapmatrixXpos[i] = 30 + 53 + (106+gap)*i;
    for(var i=0; i<8; i++) this.mapmatrixYpos[i] = 1140 - 110 - (106+gap)*i;
    this.card = [];
    this.flipmc = [];
    this.fliplightmc = [];
    this.explodemc = [];

    this.declareObjects();
    this.manageEvent();
};

gc.GameScene.constructor = gc.GameScene;
gc.GameScene.prototype = Object.create(PIXI.Container.prototype);

gc.GameScene.prototype.declareObjects = function () {
    //텍스트 이미지
    this.textimg = new PIXI.Sprite.fromFrame('start.png');
    this.three = new PIXI.Sprite.fromFrame('count_3.png');
    this.two = new PIXI.Sprite.fromFrame('count_2.png');
    this.one = new PIXI.Sprite.fromFrame('count_1.png');
    //배경에 필히 붙어있는 기본 UI
    this.gamebg = new PIXI.Sprite(GD.loader.resources['game_bg1'].texture);
    this.skipbtn = new PIXI.Sprite.fromFrame('timebar_button.png');
    this.fevereffectbg = new PIXI.Sprite.fromFrame('feverlight1.png');
    this.fevereffect_text = new PIXI.Sprite.fromFrame('feverfont.png');
    this.dangerffectbar = new PIXI.Sprite.fromFrame('warning_bar.png');
    this.dangerffect_text = new PIXI.Sprite.fromFrame('warning.png');
    this.dangereffect_skeleton = new PIXI.Sprite.fromFrame('warning_s1.png');
    this.danger_shadow = new PIXI.Sprite.fromFrame('warning_bg.png');
    this.gametimebarbg = new PIXI.Sprite.fromFrame('game_timebarBg.png');
    this.gametimebar = new PIXI.Sprite.fromFrame('game_timebar.png');
    this.timermask = new PIXI.Graphics();
    this.timermask.clear();
    this.timermask.beginFill(0xffffff, 1);
    //this.timerrect = this.timermask.drawRoundedRect(this.gametimebar.x-this.gametimebar.width/2, this.gametimebar.y-this.gametimebar.height/2, this.gametimebar.width,this.gametimebar.height, 20);
    this.timerrect = this.timermask.drawRoundedRect(this.gametimebar.x-this.gametimebar.width*1.5, this.gametimebar.y-this.gametimebar.height/2, this.gametimebar.width,this.gametimebar.height, 20);
    this.timermask.endFill();
    this.gametimebar.mask = this.timermask;
    this.levelnumimg = new gc.NumberText('basicNum_00', 'center', 0);
    this.scorenumimg = new gc.NumberText('basicNum_00', 'left', -5);
    this.missionnumimg = new gc.NumberText('basicNum_00', 'center', 0);
    //컨테이너(레이어)
    this.cardContainer = new PIXI.Container();
    this.movieclipContainer = new PIXI.Container();
    this.explodeContainer = new PIXI.Container();
    this.bgeffectContainer = new PIXI.Container();
    this.textContainer = new PIXI.Container();
    //카드 생성
    var s1 = [];//카드
    var s2 = [];//카드 뒷면 mc
    var s3 = [];//라이트 mc
    var s4 = [];//폭발 mc
    var s5 = [];
    for(var i=0; i<this.mapmatrixXpos.length; i++){
        s1 = [];
        s2 = [];
        s3 = [];
        s4 = [];
        for(var j=0; j<this.mapmatrixYpos.length; j++){
            s1.push(new PIXI.Sprite.fromFrame('blockOpen_0_0001.png'));
            s2.push(new gc.MovieClip('blockOpen_0_00', 1, 3,2));
            s3.push(new gc.MovieClip('blockOpenLight_00', 1, 4, 2));
            s4.push(new gc.MovieClip('match_effect_00', 1, 11, 1));
        }
        this.card.push(s1);
        this.flipmc.push(s2);
        this.fliplightmc.push(s3);
        this.explodemc.push(s4);
    }

    this.attachObjects();
};

gc.GameScene.prototype.attachObjects = function () {
    //배경에 기본으로 붙어있는
    this.addChild(this.gamebg);
    this.gamebg.addChild(this.gametimebarbg);
    this.gamebg.addChild(this.gametimebar);
    this.gametimebar.addChild(this.timermask);
    this.gamebg.addChild(this.skipbtn);
    this.gamebg.addChild(this.levelnumimg);
    this.gamebg.addChild(this.scorenumimg);
    this.gamebg.addChild(this.missionnumimg);
    //컨테이너 부착
    this.addChild(this.cardContainer);
    this.addChild(this.movieclipContainer);
    this.addChild(this.explodeContainer);
    this.addChild(this.bgeffectContainer);
    this.addChild(this.textContainer);
    this.bgeffectContainer.addChild(this.fevereffect_text);
    this.bgeffectContainer.addChild(this.fevereffectbg);
    this.bgeffectContainer.addChild(this.dangerffectbar);
    this.bgeffectContainer.addChild(this.dangerffect_text);
    this.bgeffectContainer.addChild(this.dangereffect_skeleton);
    this.bgeffectContainer.addChild(this.danger_shadow);
    this.textContainer.addChild(this.textimg);
    this.textContainer.addChild(this.three);
    this.textContainer.addChild(this.two);
    this.textContainer.addChild(this.one);
    for(var i=0; i<this.mapmatrixXpos.length; i++){
        for(var j=0; j<this.mapmatrixYpos.length; j++){
            this.card[i][j].interactive = false;
            this.setCardAction(i,j);//카드를 눌렸을 때의 작동
            this.cardContainer.addChild(this.card[i][j]);
            this.movieclipContainer.addChild(this.flipmc[i][j]);
            this.movieclipContainer.addChild(this.fliplightmc[i][j]);
            this.explodeContainer.addChild(this.explodemc[i][j]);
        }
    }
};

gc.GameScene.prototype.setScore = function (incase) {
    this.addpoint = 50 + (20*this.level-1);
    this.addpoint += this.matchcnt*100;
    if(incase=='hint') this.addpoint = 0;
    if(incase=='bomb') this.addpoint = 300;
    if(this.fever) this.addpoint *= 2;
    DataManager.point('point', gc.game.addpoint, Date.now().toString()); // 획득 점수 저장
    this.score += this.addpoint;
    this.scorenumimg.setValue(this.score);
}

gc.GameScene.prototype.manageEvent = function () {

};

gc.GameScene.prototype.init = function() {
    //console.log('init gamescene');

    this.getmedal1 = false;
    this.getmedal2 = false;
    this.getmedal3 = false;//4는 누적이므로 플래그 필요 없음

    this.isbgm = true;

    this.start = false;
    this.choice = [false, false];
    this.choicecardindex = [];
    this.checkmatch = false;
    this.matchresult = false;//매칭 결과..맞춤, 못맞춤
    this.flipwaitrate = 0.1;//카드가 뒤집히고 나서 사라지거나 다시 뒤집힐 시간
    this.waittimer = true;//작업중일 때 시간 멈춰두기 위한 타이머
    this.gameover = false;
    this.stageclear = false;
    this.matchrate = 2;
    this.matchcnt = 0;
    this.match = false; //콤보 유지 여부 확인 flag
    this.flip = false;//카드가 뒤집히는 중인지
    this.drop = false;//카드가 떨어지는 중인지
    this.increase = false;//카드가 올라와야 하는지
    this.insituation = false;//피버모드 혹은 위험 상태
    this.indanger = false;//층이 7층 이상
    this.fever = false;//4콤보 부터
    this.pausegame = false;
    this.makeItem = false; //아이템을 만들 수 있는지
    this.inccnt = 0; //올라온 층 수
    this.usehint = false;
    this.hintrate = 2;//힌트로 카드를 보여줄 시간
    this.hintindex = [];//선택한 힌트 인덱스
    this.bombindex = [];//선택한 힌트 인덱스
    this.setBasicUiPos();
    this.setStartValue();//초기 시작 값 설정
    this.setCard();
    this.setRandCardType();
    this.countdown = false;
    this.isdangersound = false;

    this.blockCardActive();
    this.resetChoice();
    this.timer = setInterval(this.GameTimer.bind(this), 33.333);
};

gc.GameScene.prototype.setBasicUiPos = function () {
    //console.log('init ui pos');
    //텍스트 이미지 위치
    this.textimg.anchor.set(0.5);
    this.textimg.x = gc.width/2;
    this.textimg.y = gc.height/2;
    this.textimg.scale.x = 0;
    this.textimg.scale.y = 0;
    this.three.anchor.set(0.5);
    this.three.x = gc.width/2;
    this.three.y = gc.height/2;
    this.two.anchor.set(0.5);
    this.two.x = this.three.x;
    this.two.y = this.three.y;
    this.one.anchor.set(0.5);
    this.one.x = this.three.x;
    this.one.y = this.three.y;
    //타이머 위치
    this.gametimebarbg.anchor.set(0.5);
    this.gametimebarbg.x = gc.width/2;
    this.gametimebarbg.y = 1170;
    this.gametimebar.anchor.set(0.5);
    this.gametimebar.position = this.gametimebarbg;
    //스킵버튼
    this.skipbtn.anchor.set(0.5);
    this.skipbtn.x = this.gametimebarbg.x+this.gametimebarbg.width/2-20;
    this.skipbtn.y = this.gametimebarbg.y;
    this.skipbtn.interactive = false;
    //숫자 이미지 위치
    this.levelnumimg.x = 170;
    this.levelnumimg.y = 20;
    this.scorenumimg.x = this.levelnumimg.x-10;
    this.scorenumimg.y = this.levelnumimg.y+55;
    this.missionnumimg.x = 500;
    this.missionnumimg.y = this.levelnumimg.y;
    //배경 이펙트
    this.fevereffect_text.anchor.set(0.5);
    this.fevereffect_text.alpha = 0;
    this.fevereffect_text.x = gc.width/2;
    this.fevereffect_text.y = 300;
    this.fevereffectbg.alpha = 0;

    this.dangerffectbar.anchor.set(0.5);
    this.dangerffectbar.x = gc.width/2;
    this.dangerffectbar.y = 165;
    this.dangerffectbar.scale.y = 0.95;
    this.dangerffectbar.alpha = 0;
    this.dangerffect_text.anchor.set(0.5);
    this.dangerffect_text.alpha = 0;
    this.dangerffect_text.x = this.dangerffectbar.x;
    this.dangerffect_text.y = this.dangerffectbar.y;
    this.dangereffect_skeleton.anchor.set(0.5);
    this.dangereffect_skeleton.x = this.dangerffect_text.x;
    this.dangereffect_skeleton.y = this.dangerffect_text.y;
    this.dangereffect_skeleton.alpha = 0;
    this.danger_shadow.alpha = 0;
    //카드 위치
    for(var i=0; i<this.mapmatrixXpos.length; i++){
        for(var j=0; j<this.mapmatrixYpos.length; j++){
            this.card[i][j].anchor.set(0.5);
            this.card[i][j].x = this.mapmatrixXpos[i];
            this.card[i][j].y = this.mapmatrixYpos[j];
            this.flipmc[i][j].anchor.set(0.5);
            this.flipmc[i][j].loop =false;
            this.flipmc[i][j].stop();
            this.flipmc[i][j].x = this.mapmatrixXpos[i];
            this.flipmc[i][j].y = this.mapmatrixYpos[j];
            this.flipmc[i][j].alpha = 0;
            this.fliplightmc[i][j].anchor.set(0.5);
            this.fliplightmc[i][j].loop =false;
            this.fliplightmc[i][j].stop();
            this.fliplightmc[i][j].x = this.mapmatrixXpos[i];
            this.fliplightmc[i][j].y = this.mapmatrixYpos[j];
            this.fliplightmc[i][j].alpha = 0;
            this.explodemc[i][j].anchor.set(0.5);
            this.explodemc[i][j].loop =false;
            this.explodemc[i][j].stop();
            this.explodemc[i][j].x = this.mapmatrixXpos[i];
            this.explodemc[i][j].y = this.mapmatrixYpos[j];
            this.explodemc[i][j].alpha = 0;
        }
    }
    this.skipButtonAction();
};

gc.GameScene.prototype.skipButtonAction = function () {
    if(gc.IS_MOBILE) {
        this.skipbtn.touchend = (function(e){
            e.stopPropagation();
            this.skipButtonActive();
        }).bind(this);
    }else{
        this.skipbtn.mouseup = this.skipbtn.touchend = (function(e){
            e.stopPropagation();
            this.skipButtonActive();
        }).bind(this);
    }
};

gc.GameScene.prototype.skipButtonActive = function () {
    //console.log('안눌려지게 했지!!!!!!!');
    //if(this.start && !this.flip && !this.drop && !this.waittimer && !this.pausegame && !this.stageclear && !this.gameover) {
    //    GD.soundPlay('sound_skip_bt');
    //
    //    this.setLeftTime();
    //    this.increaseFloor();//층 올리기 함수
    //    this.increase = false;
    //}
};

gc.GameScene.prototype.setStartValue = function () {
    this.level = 1;
    this.score = 0;
    this.addpoint = 0;
    this.levelnumimg.setValue(this.level);
    this.scorenumimg.setValue(this.score);
    this.basetime;
    this.setMission();
    this.setLeftTime();//층이 올라오기까지 남은 시간
};

gc.GameScene.prototype.setMission = function () {
    if(this.level == 1) this.mission = 8;
    else if(this.level == 2) this.mission = 11;
    else if(this.level == 3) this.mission = 13;
    else if(this.level>=4 && this.level<=8) this.mission = 10 + 2*(this.level-1);
    else if(this.level<=9) this.mission = 24;
    else this.mission = 26 + 2*(this.level-10);
    this.missionnumimg.setValue(this.mission);
};

gc.GameScene.prototype.setLeftTime = function () {
    if(this.level<=2) this.basetime = 8;
    else if(this.level<=4) this.basetime = 7;
    else if(this.level<=6) this.basetime = 6;
    else if(this.level<=8) this.basetime = 5;
    //else if(this.level<=12) this.basetime = 6;
    //else if(this.level<=13) this.basetime = 5;
    else this.basetime = 4;
    this.lefttime = this.basetime;
};

gc.GameScene.prototype.setCard = function () {
    var floor;
    switch(this.level){
        case 1:
        case 6:
        case 10:
            floor = 3;
            break;
        case 2:
        case 7:
        case 11:
            floor = 4;
            break;
        default :
            floor = 5;
            break;
    }

    //초기 카드 보이는 라인 설정
    for(var i=0; i<this.card.length; i++){
        for(var j=0; j<this.card[i].length; j++) {
            if(j<floor) {
                this.card[i][j].alpha = 1;
                this.card[i][j].work = true;
            }else{
                this.card[i][j].alpha = 0;
                this.card[i][j].work = false;
            }
            this.card[i][j].flip = false;//뒤집혔는지 확인.. 다시 클릭 하지 못하게 하기 위함
        }
    }
};

gc.GameScene.prototype.setRandCardType = function () {
    var rand;
    var randtype;//카드 이미지 타입
    var name1 = 'blockOpen_';
    var name2 = '_01.png';
    var fullname;
    for(var i=0; i<this.card.length; i++) {
        for (var j = 0; j < this.card[i].length; j++) {
            if(this.card[i][j].work) {
                rand = Math.floor(Math.random()*100);
                randtype = this.setCardType(rand);
                this.card[i][j].type = randtype;
                fullname = name1 + randtype + name2;
                this.card[i][j].texturename = fullname;
            }
        }
    }

    for(var i=0; i<this.card.length; i++) {
        for (var j = 0; j < this.card[i].length; j++) {
            if(this.card[i][j].work) {
                this.card[i][j].texture = PIXI.Texture.fromFrame(this.card[i][j].texturename);
            }
        }
    }
};
//레벨에 따른 이미지 타입 선정
gc.GameScene.prototype.setCardType = function (rand) {
    var range = Math.floor(100/(this.level+1));
    var typerange = this.level+1;
    if(this.level>8) typerange = 9;//벌레 종류
    var type = 1;
    for(var i=0; i<typerange; i++){
        if(rand>=range*i && rand<=range*(i+1)){
            type = i+1;
            break;
        }
    }
    //if(this.level <= 10) type = 1;
    return type;
};

gc.GameScene.prototype.setCardActive = function () {
    //console.log('카드 작동')
    for(var i=0; i<this.card.length; i++){
        for(var j=0; j<this.card[i].length; j++){
            if(this.card[i][j].work) this.card[i][j].interactive = true;
        }
    }
    this.skipbtn.interactive = true;
    this.waittimer = false;
};

gc.GameScene.prototype.blockCardActive = function () {
    //console.log('카드 정지')
    for(var i=0; i<this.card.length; i++){
        for(var j=0; j<this.card[i].length; j++){
            this.card[i][j].interactive = false;
        }
    }
    this.skipbtn.interactive = false;
    this.waittimer = true;
};

gc.GameScene.prototype.setCardAction = function (i,j) {
    if(gc.IS_MOBILE) {
        this.card[i][j].touchend = (function(e){
            e.stopPropagation();
            this.chooseBlock(i,j);
        }).bind(this);
    }else{
        this.card[i][j].mouseup = this.card[i][j].touchend = (function(e){
            e.stopPropagation();
            this.chooseBlock(i,j);
        }).bind(this);
    }
};

gc.GameScene.prototype.resetChoice = function () {
    for (var i = 0; i < 2; i++) {
        gc.game.choice[i] = false;
        gc.game.choicecardindex[i] = [];
    }
};

gc.GameScene.prototype.refreshChoiceInfo = function () {
    for(var i=0; i<this.choice.length; i++){
        if(this.choice[i]){
            this.choicecardindex[i][1]++;
        }
    }
};

gc.GameScene.prototype.chooseBlock = function (i,j) {
    //console.log(GD.isBgmSound);
//interactive -> false, 카드뒤집기 Mc부착.. 실제 카드 보이기, 선택(choice, choicecardindex) 배열 설정
    if(!this.pausegame) {
        if(this.start) {
            //console.log('선택', i, j);
            if (!this.choice[0]) {
                GD.soundPlay('sound_select');

                this.blockCardActive();
                this.choice[0] = true;
                this.choicecardindex[0] = [i, j];
            } else {
                if (this.choicecardindex[0][0] != i || this.choicecardindex[0][1] != j) {
                    if (this.card[i][j].type != 22) GD.soundPlay('sound_select');

                    //다른 카드 눌렸을 때
                    this.blockCardActive();
                    this.choice[1] = true;
                    this.choicecardindex[1] = [i, j];
                } else {
                    //매치 아이템을 다시 눌렸을 때.. 선택 취소
                    if (this.card[i][j].type == 22) {
                        this.card[i][j].flip = false;
                        this.card[i][j].texture = PIXI.Texture.fromFrame('blockOpen_22_0001.png');
                        this.choice[0] = false;
                        this.choicecardindex[0] = [];
                    }
                }
            }

            //카드 열기
            if (this.choice[0] && this.choice[1] && this.card[this.choicecardindex[0][0]][this.choicecardindex[0][1]].type == 22 && this.card[this.choicecardindex[1][0]][this.choicecardindex[1][1]].type > 20) {
                //매치 아이템 다음으로 아이템 선택 안되게 하기
                this.choice[1] = false;
                this.choicecardindex[1] = [];
                this.setCardActive();
            } else {
                if (this.choice[0]) {
                    if (!this.card[i][j].flip) {
                        //console.log('뒤집기 시작')
                        this.flip = true;
                        this.card[i][j].flip = true;
                        if (this.card[i][j].type > 20) {
                            var name1 = 'blockOpen_';
                            var name2 = '_0002.png';
                            var fullname;
                            fullname = name1 + this.card[i][j].type + name2;
                            this.card[i][j].texture = PIXI.Texture.fromFrame(fullname);
                            if (this.card[i][j].type == 22) {
                                this.useMatch();
                            }
                            else if (this.card[i][j].type == 23) {
                                this.hintindex = [i, j];
                                this.useHint();

                            }
                            else if (this.card[i][j].type == 21) {
                                this.useBomb(i, j);
                            }
                        } else {
                            this.card[i][j].alpha = 0;
                            this.card[i][j].texture = PIXI.Texture.fromFrame(gc.game.card[i][j].texturename);
                            this.flipmc[i][j].gotoAndPlay(0);
                            this.flipmc[i][j].alpha = 1;
                            this.flipmc[i][j].onComplete = function () {
                                //console.log('뒤집기 라이트');
                                this.alpha = 0;
                                gc.game.openFlipLightMc(i, j);
                            };
                        }
                    }
                }
            }
        }
    }
};

gc.GameScene.prototype.useMatch = function () {
    GD.soundPlay('sound_select')

    //console.log('use MATCH');
    if(!this.choice[1]) {
        this.setCardActive();
        this.flip = false;
    }
    if(this.choice[0] && this.choice[1]) this.checkMatchCard();
};

gc.GameScene.prototype.useHint = function () {
    GD.soundPlay('sound_hint');

    this.resetChoice();
    var cnt = 0;
    //console.log('use HINT');
    this.usehint = true;
    for(var i=0; i<this.card.length; i++){
        for(var j=0; j<this.card[i].length; j++){
            if(this.card[i][j].work && this.card[i][j].type<21 && !this.card[i][j].flip) {
                cnt++;
                this.openFlipMc_Hint(i,j);
            }
        }
    }
    if(cnt==0){
        //console.log('뒤집을거 없음');
        this.usehint = false;
        this.resetCard(this.hintindex[0],this.hintindex[1]);
        this.dropCard('hint');
    }
};

gc.GameScene.prototype.useBomb = function (i,j) {
    GD.soundPlay('sound_bomb');

    //console.log('use BOMB');
    this.resetChoice();

    //오픈되어있는 카드 뒤집기
    for(var x=0; x<this.card.length; x++){
        for(var y=0; y<this.card[x].length; y++){
            if(this.card[x][y].work){
                if(this.card[x][y].type<21 && this.card[x][y].flip) {
                    this.card[x][y].texture = PIXI.Texture.fromFrame('blockOpen_0_0001.png');
                    this.card[x][y].flip = false;
                }
            }
        }
    }

    var fullcnt = 0;
    var cnt = 0;
    var s = [];
    this.matchresult = true;
    this.bombindex = [i, j];
    if (i != 0 && i != this.card.length - 1) {//양쪽 끝 라인이 아닐때
        if (j != this.card[i].length - 1) {//위층에 터질 카드 수 체크
            if (this.card[i - 1][j + 1].work && this.card[i - 1][j + 1].type<21) {
                fullcnt++;
                s.push([i - 1, j + 1]);
            }
            if (this.card[i][j + 1].work && this.card[i][j + 1].type<21) {
                fullcnt++;
                s.push([i, j + 1]);
            }
            if (this.card[i + 1][j + 1].work && this.card[i + 1][j + 1].type<21) {
                fullcnt++;
                s.push([i + 1, j + 1]);
            }
        }
        if (j != 0) {//아래층 터질 카드 수 체크
            if (this.card[i - 1][j - 1].work && this.card[i - 1][j - 1].type<21) {
                fullcnt++;
                s.push([i - 1, j - 1]);
            }
            if (this.card[i][j - 1].work && this.card[i][j - 1].type<21) {
                fullcnt++;
                s.push([i, j - 1]);
            }
            if (this.card[i + 1][j - 1].work && this.card[i + 1][j - 1].type<21) {
                fullcnt++;
                s.push([i + 1, j - 1]);
            }
        }
        //양 옆 카드 체크
        if (this.card[i - 1][j].work && this.card[i - 1][j].type<21) {
            fullcnt++;
            s.push([i - 1, j]);
        }
        if (this.card[i + 1][j].work && this.card[i + 1][j].type<21) {
            fullcnt++;
            s.push([i + 1, j]);
        }
    } else {
        if (i == 0) {//첫 라인일 경우
            if (j != this.card[i].length - 1) {//위층에 터질 카드 수 체크
                if (this.card[i][j + 1].work && this.card[i][j + 1].type<21) {
                    fullcnt++;
                    s.push([i, j + 1]);
                }
                if (this.card[i + 1][j + 1].work && this.card[i + 1][j + 1].type<21) {
                    fullcnt++;
                    s.push([i + 1, j + 1]);
                }
            }
            if (j != 0) {//아래층 터질 카드 수 체크
                if (this.card[i][j - 1].work && this.card[i][j - 1].type<21) {
                    fullcnt++;
                    s.push([i, j - 1]);
                }
                if (this.card[i + 1][j - 1].work) {
                    fullcnt++;
                    s.push([i + 1, j - 1]);
                }
            }
            if (this.card[i + 1][j].work && this.card[i + 1][j].type<21) {
                fullcnt++;
                s.push([i + 1, j]);
            }//오른쪽 카드 체크
        } else {//맨 끝 라인
            if (j != this.card[i].length - 1) {//위층에 터질 카드 수 체크
                if (this.card[i - 1][j + 1].work && this.card[i - 1][j + 1].type<21) {
                    fullcnt++;
                    s.push([i - 1, j + 1]);
                }
                if (this.card[i][j + 1].work && this.card[i][j + 1].type<21) {
                    fullcnt++;
                    s.push([i, j + 1]);
                }
            }
            if (j != 0) {//아래층 터질 카드 수 체크
                if (this.card[i - 1][j - 1].work && this.card[i - 1][j - 1].type<21) {
                    fullcnt++;
                    s.push([i - 1, j - 1]);
                }
                if (this.card[i][j - 1].work && this.card[i][j - 1].type<21) fullcnt++;
                s.push([i, j - 1]);
            }
            if (this.card[i - 1][j].work && this.card[i - 1][j].type<21) {//왼쪽 카드 체크
                fullcnt++;
                s.push([i - 1, j]);
            }
        }
    }

    for (var i = 0; i < s.length; i++) {
        cnt++;
        this.explodeCard_Bomb(s[i], fullcnt, cnt);
    }
    if (s.length == 0) {
        //터뜨릴게 없을 때
        this.resetCard(i, j);
        this.bombindex = [];
        this.dropCard('bomb');
    }
};

gc.GameScene.prototype.openFlipMc_Hint = function (i,j) {
    this.card[i][j].alpha = 0;
    this.card[i][j].texture = PIXI.Texture.fromFrame(this.card[i][j].texturename);
    this.flipmc[i][j].gotoAndPlay(0);
    this.flipmc[i][j].alpha = 1;
    this.flipmc[i][j].onComplete = function () {
        this.alpha = 0;
        gc.game.openFlipLightMc_Hint(i,j);
    };
};

gc.GameScene.prototype.openFlipLightMc_Hint = function (i,j) {
    this.fliplightmc[i][j].alpha = 1;
    this.fliplightmc[i][j].gotoAndPlay(0);
    this.fliplightmc[i][j].onComplete = function () {
        this.alpha = 0;
        gc.game.card[i][j].alpha = 1;
    };
};

gc.GameScene.prototype.openFlipLightMc = function (i,j) {
    this.fliplightmc[i][j].alpha = 1;
    this.fliplightmc[i][j].gotoAndPlay(0);
    this.fliplightmc[i][j].onComplete = function () {
        //console.log('카드 오픈 라이트 완료');
        this.alpha = 0;
        gc.game.card[i][j].alpha = 1;
        if(!gc.game.choice[1]) {
            //console.log('뒤집기 완료!! 카드 작동 시키기!!!')
            gc.game.setCardActive();
            gc.game.flip = false;
        }
        if(gc.game.choice[0] && gc.game.choice[1]) gc.game.checkMatchCard();
    };
};

//카드 다시 뒤집어 두기
gc.GameScene.prototype.closeCard_Hint = function () {
    var fullcnt = 0;
    var cnt = 0;
    for(var i=0; i<this.card.length; i++) {
        for (var j = 0; j < this.card[i].length; j++) {
            if (this.card[i][j].work && this.card[i][j].type < 21) {fullcnt++;}
        }
    }

    for(var i=0; i<this.card.length; i++){
        for(var j=0; j<this.card[i].length; j++){
            if(this.card[i][j].work && this.card[i][j].type<21){
                cnt++;
                this.card[i][j].alpha = 0;
                this.card[i][j].texture = PIXI.Texture.fromFrame('blockOpen_0_0001.png');
                this.fliplightmc[i][j].textures.reverse();
                this.fliplightmc[i][j].gotoAndPlay();
                this.closeFlip_Hint(i,j, fullcnt, cnt);
            }
        }
    }
};

gc.GameScene.prototype.closeFlip_Hint = function (i,j, fullcnt, cnt) {
    this.flipmc[i][j].alpha = 1;
    this.flipmc[i][j].textures.reverse();
    this.flipmc[i][j].gotoAndPlay(0);
    this.flipmc[i][j].onComplete = function () {
        gc.game.card[i][j].alpha = 1;//카드 이미지 보이기
        gc.game.card[i][j].flip = false;//카드 이미지 보이기
        this.alpha = 0;

        if(fullcnt==cnt) {
            if(gc.game.hintindex[0]!=undefined && gc.game.hintindex[1]!=undefined) gc.game.resetCard(gc.game.hintindex[0],gc.game.hintindex[1]);
            gc.game.flip = false;
            gc.game.dropCard('hint');
        }
    };
};

gc.GameScene.prototype.closeCard = function () {
    //GD.soundPlay('sound_error');

    var cnt = 0;
    var i1, i2, j1, j2;
    i1 = gc.game.choicecardindex[0][0];
    j1 = gc.game.choicecardindex[0][1];
    i2 = gc.game.choicecardindex[1][0];
    j2 = gc.game.choicecardindex[1][1];
    //카드 이미지 교체
    this.card[i1][j1].alpha = 0;
    this.card[i2][j2].alpha = 0;
    this.card[i1][j1].texture = PIXI.Texture.fromFrame('blockOpen_0_0001.png');
    this.card[i2][j2].texture = PIXI.Texture.fromFrame('blockOpen_0_0001.png');
    //뒤집기 효과
    this.fliplightmc[i1][j1].alpha = 1;
    this.fliplightmc[i1][j1].textures.reverse();
    this.fliplightmc[i1][j1].gotoAndPlay(0);
    this.fliplightmc[i1][j1].onComplete = function () {
        this.alpha = 0;
        cnt++;
        gc.game.closeFlipMc(i1,j1, cnt);
    };

    this.fliplightmc[i2][j2].textures.reverse();
    this.fliplightmc[i2][j2].gotoAndPlay(0);
    this.fliplightmc[i2][j2].onComplete = function () {
        this.alpha = 0;
        cnt++;
        gc.game.closeFlipMc(i2,j2,cnt);
    };
};

gc.GameScene.prototype.closeFlipMc = function (i,j, callcnt) {
    this.flipmc[i][j].alpha = 1;
    this.flipmc[i][j].textures.reverse();
    this.flipmc[i][j].gotoAndPlay(0);
    this.flipmc[i][j].onComplete = function () {
        gc.game.card[i][j].alpha = 1;//카드 이미지 보이기
        gc.game.card[i][j].flip = false;//카드 이미지 보이기
        this.alpha = 0;
        if(callcnt == 2){
            //console.log('카드 복귀')
            gc.game.resetChoice();//선택 정보 초기화
            gc.game.setCardActive();
            gc.game.flip = false;
        }
    };
};

gc.GameScene.prototype.closeCard_Increase = function () {
    //console.log('close by increase');
    var cnt = 0;
    var fullcnt = 0;

    //뒤집을 카드 수 체크
    for(var i=0; i<this.card.length; i++) {if (this.card[i][0].type < 21) {fullcnt++;}}

    //뒤집기
    for(var i=0; i<this.card.length; i++){
        if(this.card[i][0].type<21) {
            this.card[i][0].alpha = 0;
            this.card[i][0].texture = PIXI.Texture.fromFrame('blockOpen_0_0001.png');
            this.fliplightmc[i][0].alpha = 1;
            this.fliplightmc[i][0].textures.reverse();
            this.fliplightmc[i][0].gotoAndPlay(0);
            this.fliplightmc[i][0].onComplete = function () {
                cnt++;
                this.alpha = 0;
                if (cnt == fullcnt) gc.game.closeCard_Increase2();
            };
        }
    }
};

gc.GameScene.prototype.closeCard_Increase2 = function () {
    //console.log('close by increase');
    var cnt = 0;
    var fullcnt = 0;
    for(var i=0; i<this.card.length; i++) {if (this.card[i][0].type < 21) {fullcnt++;}}

    for(var i=0; i<this.card.length; i++){
        if(this.card[i][0].type<21) {
            this.flipmc[i][0].alpha = 1;
            this.flipmc[i][0].gotoAndPlay(0);
            this.flipmc[i][0].textures.reverse();
            this.flipmc[i][0].onComplete = function () {
                cnt++;
                this.alpha = 0;
                if (cnt == fullcnt) gc.game.closeCard_Increase3();
            };
        }
    }
};

gc.GameScene.prototype.closeCard_Increase3 = function () {
    for(var i=0; i<this.card.length; i++){
        this.card[i][0].alpha = 1;
        this.card[i][0].flip = false;
        this.card[i][0].alpha = 1;
    }
    this.setCardActive();
};

gc.GameScene.prototype.checkMatchCard = function () {
    var i1, i2, j1, j2;
    i1 = this.choicecardindex[0][0];
    j1 = this.choicecardindex[0][1];
    i2 = this.choicecardindex[1][0];
    j2 = this.choicecardindex[1][1];
    if (this.card[i1][j1].type==this.card[i2][j2].type || this.card[i1][j1].type==22 || this.card[i2][j2].type==22) {//this.card[i][j].type==22은 매칭 아이템
        this.matchresult = true;
        this.explodeCard();
        GD.soundPlay('sound_correct');
    } else {
        this.matchresult = false;
        GD.soundPlay('sound_error');
    }
    this.checkmatch = true;
};

//짝을 맞췄을 때 폭발 이펙트
gc.GameScene.prototype.explodeCard_Bomb = function (arr, fullcnt, cnt) {
    this.explodemc[arr[0]][arr[1]].alpha = 1;
    this.explodemc[arr[0]][arr[1]].gotoAndPlay(0);
    this.explodemc[arr[0]][arr[1]].onComplete = function () {
        this.alpha = 0;
        gc.game.resetCard(arr[0],arr[1]);
        if(fullcnt==cnt) {
            gc.game.resetCard(gc.game.bombindex[0],gc.game.bombindex[1]);
            gc.game.bombindex = [];
            gc.game.dropCard('bomb');
        }
    };
};

gc.GameScene.prototype.explodeCard = function () {
    this.drop = true;
    var i1, i2, j1, j2;
    i1 = gc.game.choicecardindex[0][0];
    j1 = gc.game.choicecardindex[0][1];
    i2 = gc.game.choicecardindex[1][0];
    j2 = gc.game.choicecardindex[1][1];
    var cnt = 0;

    //터지는 이펙트
    this.explodemc[i1][j1].alpha = 1;
    this.explodemc[i1][j1].gotoAndPlay(0);
    this.explodemc[i1][j1].onComplete = function () {
        this.alpha = 0;
        cnt++;
        gc.game.resetCard(i1,j1);
        if(cnt==2) gc.game.dropCard();//떨어질 카드가 있으면 떨어뜨리고, 없으면 choice초기화,interval 세팅
    };

    this.explodemc[i2][j2].alpha = 1;
    this.explodemc[i2][j2].gotoAndPlay(0);
    this.explodemc[i2][j2].onComplete = function () {
        this.alpha = 0;
        cnt++;
        gc.game.resetCard(i2,j2);
        if(cnt==2) gc.game.dropCard();
    };
};

gc.GameScene.prototype.dropCard = function (incase) {
    //모든 카드의 위쪽을 체크하여 정보 이동
    var dropfullcnt = 0;//떨어질 블럭 전체 수
    var dropcnt = 0;//내려온 블럭
    var s = [];//블럭 인덱스 저장
    for(var i=0; i<this.card.length; i++){
        for(var j=0; j<this.card[i].length; j++){
            if(!this.card[i][j].work){
                for(var k=j+1; k<this.card[i].length; k++){
                    if(this.card[i][k].work){
                        //this.dropEach(i,j,k);
                        s.push([i,j,k]);//i:라인, j:내려와야 할 지점, k:내려오기 시작하는 지점
                        this.card[i][j].type = this.card[i][k].type;
                        this.card[i][j].texturename = this.card[i][k].texturename;
                        this.card[i][j].texture = this.card[i][k].texture;
                        this.card[i][j].flip = false;
                        this.card[i][j].work = true;
                        this.card[i][k].work = false;
                        this.card[i][j].alpha = 1;
                        this.card[i][k].alpha = 0;
                        dropfullcnt++;
                        break;
                    }
                }
            }
        }
    }

    if(dropfullcnt!=0){
        for(var i=0; i< s.length; i++){
            dropcnt++;
            //console.log(dropfullcnt, dropcnt)
            this.dropEach(s[i],dropfullcnt,dropcnt, incase);
        }
    }else {//내려올 카드가 없을 때
        if(incase!='hint' && incase!='bomb') {
            if (this.match) {
                this.matchcnt++;
                this.matchrate = 2;
                if (this.matchcnt > 3) {
                    this.fever = true;
                    this.insituation = true;
                    if(this.matchcnt == 4) this.feverTextEffect();
                }
                this.comboEffect();
            }
            this.match = true;
            this.manageMedal();
        }
        //console.log(this.matchcnt, '콤보');
        //this.checkOffBgEffect();
        this.checkInDanger();
        if(incase!='hint' && incase!='bomb') this.mission--;
        this.missionnumimg.setValue(this.mission);
        if (this.mission == 0) {
            this.stageClear();
        }
        else {
            this.resetChoice();
            //console.log('카드 떨구기2')
            this.setCardActive();
            this.drop = false;
            this.flip = false;
        }
    }

    //this.checkInDanger();

    //점수 처리
    if(incase== undefined) this.setScore('basic');
    else this.setScore(incase);
};

gc.GameScene.prototype.dropEach = function (s, dropfullcnt, dropcnt, incase) {//s:라인, 내려오게 될 위치, 내려오기 시작하는 위치
    TweenMax.from(this.card[s[0]][s[1]], 0.05, {x:this.mapmatrixXpos[s[0]], y:this.mapmatrixYpos[s[2]], onComplete:(function () {
        if(dropcnt==dropfullcnt){
            //콤보
            if(incase!='hint' && incase!='bomb') {
                if (this.match) {
                    this.matchcnt++;
                    this.matchrate = 2;
                    if (this.matchcnt > 3) {
                        this.fever = true;
                        this.insituation = true;
                        if(this.matchcnt == 4) this.feverTextEffect();
                    }
                    this.comboEffect();
                }
                this.match = true;
                this.manageMedal();
            }
            //미션 처리
            if(incase!='hint' && incase!='bomb') this.mission--;
            this.missionnumimg.setValue(this.mission);
            if(this.mission == 0) {this.stageClear();}
            else{
                //선택 초기화, interval 처리
                this.resetChoice();
                //console.log('카드 떨구기1')
                this.setCardActive();
                this.drop = false;
                this.flip = false;
            }
            //this.checkOffBgEffect();
            this.checkInDanger();
        }
    }).bind(this)});
};

//카드 정보 초기화
gc.GameScene.prototype.resetCard = function (i,j) {
    this.card[i][j].flip = false;
    this.card[i][j].work = false;
    this.card[i][j].texture = PIXI.Texture.fromFrame('blockOpen_0_0001.png');
    this.card[i][j].alpha = 0;
};

gc.GameScene.prototype.comboEffect = function () {
    var comboimg1 = new PIXI.Sprite.fromFrame('combo.png');
    var comboimg2 = new gc.NumberText('comNum_00', 'center', -4);
    comboimg1.anchor.set(0.5);
    comboimg1.x = gc.width/2;
    comboimg1.y = 400;
    comboimg2.setValue(this.matchcnt);
    comboimg2.x = 0;
    comboimg2.y = 20;
    comboimg1.addChild(comboimg2);
    this.textContainer.addChild(comboimg1);

    TweenMax.to(comboimg1, 0.5, {y:comboimg1.y-70, alpha:0, onComplete:(function () {
        this.textContainer.removeChild(comboimg1);
    }).bind(this)});
};

gc.GameScene.prototype.resetCombo = function () {
    this.matchrate = 2;
    this.matchcnt = 0;
    this.match = false;
    this.fever = false;

    GD.soundStop('sound_fever_BG');
    if(!this.isbgm) {
        //console.log('bgm on')
        this.isbgm = true;
        GD.bgmPlay();
        this.checkInDanger();
    }
};

//경고 상황 체크
gc.GameScene.prototype.checkInDanger = function () {
    //console.log('check in danger')
    var danger = false;

    for(var i=0; i<this.card.length; i++){
        if(this.card[i][6].work) {
            danger = true;
        }
    }


    if(danger){
        this.indanger = true;
        this.insituation = true;
    }else{
        this.indanger = false;
        GD.soundStop('sound_timewarning');
        this.isdangersound = false;
    }

    //console.log('danger', this.indanger);
    if(this.indanger && !this.fever){
        if(!this.isdangersound) GD.soundPlay('sound_timewarning', 1, true);
        this.isdangersound = true;
    }
};

gc.GameScene.prototype.increaseFloor = function () {
    GD.soundPlay('sound_block_line');

    this.blockCardActive();
    this.inccnt++;
    var incfullcnt = 0;
    var inccnt = 0;
    var inctime = 0.25;
    var name1 = 'blockOpen_';
    var name2 = '_01.png';
    var rand, randtype, fullname;
    var itemratio, itempos, itemkind, range;

    //게임오버 체크
    for(var i=0; i<this.card.length; i++){
        var topfloor = this.card[i].length-1;
        if(this.card[i][topfloor].work) {
            this.gameover = true;
            this.gameOver();
            break;
        }
    }
    if(!this.gameover) {
        for(var i=0; i<this.flipmc.length; i++){
            for(var j=0; j<this.flipmc[i].length; j++) {
                this.flipmc[i][j].gotoAndStop(0);
                this.flipmc[i][j].alpha = 0;
            }
        }
        for(var i=0; i<this.fliplightmc.length; i++){
            for(var j=0; j<this.fliplightmc[i].length; j++) {
                this.fliplightmc[i][j].gotoAndStop(0);
                this.fliplightmc[i][j].alpha = 0;
            }
        }

        for(var j=this.card[0].length-1; j>=0; j--){//윗줄부터
            if(j==0){
                //아이템 생성
                itemratio = Math.floor(Math.random()*100);
                if(this.level<=9) range = 50;
                else if(this.level<=10) range = 40;
                else if(this.level<=11) range = 30;
                else range = 20;

                if(itemratio<=range) {
                    this.makeItem = true;
                    itempos = Math.floor(Math.random()*6);
                    itemkind = Math.floor(Math.random()*3)+21;
                }
            }
            for(var i=0; i<this.card.length; i++){//옆 라인으로
                if(j!=0){
                    if(this.card[i][j-1].work){
                        incfullcnt++;
                        this.card[i][j].type = this.card[i][j - 1].type;
                        this.card[i][j].texturename = this.card[i][j - 1].texturename;
                        this.card[i][j].flip = this.card[i][j - 1].flip;
                        this.card[i][j].work = true;
                        this.card[i][j].texture = this.card[i][j - 1].texture;
                        this.card[i][j].alpha = 1;
                        TweenMax.from(this.card[i][j], inctime, {
                            x: this.card[i][j - 1].x, y: this.card[i][j - 1].y, onComplete: (function () {
                                inccnt++;
                                if (inccnt == incfullcnt) {
                                    this.refreshChoiceInfo();
                                    //console.log('층 올리기1')
                                    this.setCardActive();
                                }
                            }).bind(this)
                        });
                    }
                }else{
                    incfullcnt++;
                    rand = Math.floor(Math.random() * 100);
                    randtype = this.setCardType(rand);

                    //아이템 적용
                    if(this.makeItem){
                        if(i==itempos){
                            randtype = itemkind;
                            name2 = '_0001.png';
                        }else{
                            name2 = '_01.png';
                        }
                    }else{
                        name2 = '_01.png';
                    }

                    this.card[i][j].type = randtype;
                    fullname = name1 + randtype + name2;
                    this.card[i][j].texturename = fullname;

                    this.card[i][j].flip = false;
                    this.card[i][j].work = true;
                    this.card[i][j].texture = PIXI.Texture.fromFrame(this.card[i][j].texturename);
                    this.card[i][j].alpha = 1;

                    TweenMax.from(this.card[i][j], inctime, {
                        x: this.card[i][j].x, y: this.card[i][j].y + 106, onComplete: (function () {
                            inccnt++;
                            if (inccnt == incfullcnt) {
                                this.refreshChoiceInfo();
                                //console.log('층 올리기2')

                                TweenMax.from(this.card[0][0], 0.4, {onComplete:(function () {//0.4초 후에 카드 덮고 작동 시작
                                    gc.game.closeCard_Increase();
                                }).bind(this)});
                            }
                        }).bind(this)
                    })
                }
            }
        }

        this.checkInDanger();
    }
};

gc.GameScene.prototype.stageClear = function () {
    GD.soundPlay('sound_levelup');

    this.stageclear = true;
    this.level++;
    this.levelnumimg.setValue(this.level);
    this.blockCardActive();
    this.resetChoice();

    //배경 변경
    var bgname;
    if(this.level%4==0) bgname = 'game_bg4';
    else bgname = 'game_bg' + (this.level%4);
    this.gamebg.texture = GD.loader.resources[bgname].texture;

    this.inccnt = 0;
    this.textimg.scale.x = 1;
    this.textimg.scale.y = 1;
    this.textimg.texture = PIXI.Texture.fromFrame('levelup.png');
    this.textimg.alpha = 1;

    //타임바 위치 초기화
    TweenMax.to(this.timerrect, 0.5, {x:this.gametimebar.x-this.gametimebar.width*1.5});

    TweenMax.from(this.textimg.scale, 0.3, {x:1.5, y:1.5, onComplete:(function () {
        TweenMax.to(this.textimg.scale, 0.3, {x:1.2, y:1.2, onComplete:(function () {
            TweenMax.to(this.textimg.scale, 0.3, {x:1, y:1, onComplete:(function () {
                TweenMax.to(this.textimg, 0.5, {alpha:0, onComplete:(function () {
                    this.setCard();
                    this.setRandCardType();
                    this.setMission();
                    this.setLeftTime();
                    //this.checkOffBgEffect();
                    this.checkInDanger();
                    this.textimg.alpha = 0;
                    this.textimg.scale.x = 0;
                    this.textimg.scale.y = 0;
                    this.textimg.texture = PIXI.Texture.fromFrame('start.png');
                    this.start = false;
                    this.stageclear = false;
                }).bind(this)});
            }).bind(this)});
        }).bind(this)});
    }).bind(this)});

    this.hintindex = [];
    this.flipwaitrate = 0.1;
    this.insituation = false;
    this.indanger = false;
    this.fever = false;
    this.matchcnt = 0;
    this.match = false;
    this.flip = false;
    this.drop = false;
    this.increase = false;
    this.fevereffectbg.alpha = 0;
    this.danger_shadow.alpha = 0;
    this.dangerffectbar.alpha = 0;

    this.isdangersound = false;
    GD.soundStop('sound_fever_BG');
    GD.soundStop('sound_timewarning');

    this.manageMedal();
};

gc.GameScene.prototype.gameOver = function () {
    this.textimg.scale.x = 1;
    this.textimg.scale.y = 1;
    this.textimg.texture = PIXI.Texture.fromFrame('gameover.png');
    this.textimg.alpha = 0;
    GD.soundPlay('sound_gameover');
    TweenMax.to(this.textimg, 1, {alpha:1});
    TweenMax.fromTo(this.textimg.scale, 0.3, {x:4,y:4}, {x:0.8,y:0.8, onComplete:(function () {
        TweenMax.to(this.textimg.scale, 0.2, {x:1, y:1, onComplete:(function () {
            TweenMax.to(this.textimg, 0.5, {onComplete:(function () {
                this.onResult();
            }).bind(this)});
        }).bind(this)});
    }).bind(this)});
    this.blockCardActive();
    clearInterval(this.timer);
};

//타임업 사운드가 끝나고 결과창으로 이동
gc.GameScene.prototype.onResult = function () {
    //console.log('on result');
    GD.bgmStop();
    GD.soundStop('sound_timewarning');
    GD.soundStop('sound_fever_BG');
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

gc.GameScene.prototype.startCountdown = function () {
    GD.bgmStop();
    this.isbgm = true;
    GD.bgmPlay();
    //console.log('play bgm')

    var time = 1;
    this.three.alpha = 0;
    this.two.alpha = 0;
    this.one.alpha = 0;
    this.textimg.alpha = 0;
    GD.soundPlay('sound_count');
    TweenMax.to(this.three, time, {alpha:1});
    TweenMax.from(this.three.scale, time, {x:3, y:3, onComplete:(function () {
        this.three.alpha = 0;
        GD.soundPlay('sound_count');
        TweenMax.to(this.two, time, {alpha:1});
        TweenMax.from(this.two.scale, time, {x:3, y:3, onComplete:(function () {
            this.two.alpha = 0;
            GD.soundPlay('sound_count');
            TweenMax.to(this.one, time, {alpha:1});
            TweenMax.from(this.one.scale, time, {x:3, y:3, onComplete:(function () {
                this.one.alpha = 0;
                this.closeCard_Hint();
                GD.soundPlay('sound_start');
                TweenMax.to(this.textimg, 0.5, {alpha:1});
                TweenMax.to(this.textimg.scale, 0.5, {x:1, y:1, onComplete:(function () {
                    TweenMax.to(this.textimg, 0.1, {alpha:0});
                    TweenMax.to(this.textimg.scale, 0.1, {x:3, y:3, onComplete:(function () {
                        this.countdown = false;
                        this.start = true;
                        //console.log('게임 시작')
                        this.setCardActive();
                    }).bind(this)});
                }).bind(this)});
            }).bind(this)});
        }).bind(this)});
    }).bind(this)});
};

//피버 텍스트 이펙트
gc.GameScene.prototype.feverTextEffect = function () {
    GD.bgmStop();
    this.isbgm = false;
    if(GD.isBgmSound) GD.soundPlay('sound_fever_BG', 1, true);
    GD.soundPlay('sound_fever');
    this.isdangersound = false;
    GD.soundStop('sound_timewarning');

    this.fevereffect_text.y = 350;
    this.fevereffect_text.alpha = 1;
    this.fevereffect_text.scale.x = 1;
    this.fevereffect_text.scale.y = 1;
    TweenMax.from(this.fevereffect_text, 0.7, {y:100, onComplete:(function () {
        TweenMax.to(this.fevereffect_text.scale, 0.2, {x:1.1, y:1.1, onComplete:(function () {
            TweenMax.to(this.fevereffect_text.scale, 0.5, {x:1, y:1});
            TweenMax.to(this.fevereffect_text, 0.5, {y:350});
        }).bind(this)});
    }).bind(this)});

    TweenMax.from(this.fevereffect_text, 0.9, {alpha:0, onComplete:(function () {
        TweenMax.to(this.fevereffect_text, 0.5, {alpha:0});
    }).bind(this)});
};

gc.GameScene.prototype.GameTimer = function () {
    var now = Date.now();
    if(this.lasttime==undefined) this.lasttime = now;

    if(!this.start){
        if(!this.pausegame) {
            if(!this.countdown) {
                this.countdown = true;
                this.startCountdown();
            }
        }
    }else {
        //층을 올리기 위한 타이머
        if (this.lefttime > 0) {
            //if(!this.waittimer && !this.stageclear && !this.pausegame) {this.lefttime -= (now-this.lasttime)/1000;}
            if(!this.usehint && !this.stageclear && !this.pausegame) {this.lefttime -= (now-this.lasttime)/1000;}
        } else {
            this.setLeftTime();//층 올리기 시간 초기화
            this.increase = true;
        }
        //this.timerrect.x = this.gametimebar.width * (this.lefttime / this.basetime) - this.gametimebar.width;//타이머가 줄어들기
        if(!this.stageclear) this.timerrect.x = this.gametimebar.width * ((this.basetime-this.lefttime) / this.basetime);//타이머가 늘어나기
        //카드를 뒤집거나 내리기 까지 기다림 시간
        if(this.checkmatch && !this.stageclear){
            if (this.flipwaitrate>0) {
                if(!this.matchresult) {this.flipwaitrate -= (now-this.lasttime)/1000;}
            } else {
                this.checkmatch = false;
                this.flipwaitrate = 0.1;
                this.closeCard();
                this.resetCombo();
            }
        }
        //힌트를 보여줄 시간
        if(this.usehint){
            if(this.hintrate>0) this.hintrate -= (now-this.lasttime)/1000;
            else{
                this.usehint = false;
                this.hintrate = 2;
                this.closeCard_Hint();
            }
        }
    }
    //배경 이펙트 깜빡이기
    if(!this.gameover) {
        if (!this.insituation) {
            this.blinkrate = 0;
            this.fevereffectbg.alpha = 0;
            this.fevereffect_text.alpha = 0;
            this.dangereffect_skeleton.alpha = 0;
            this.dangerffectbar.alpha = 0;
            this.dangerffect_text.alpha = 0;
            this.danger_shadow.alpha = 0;
        } else {
            if(!this.indanger && !this.fever) this.insituation = false;//상황 초기화
            if(this.indanger || this.fever) {
                if(this.blinkrate > 0) {
                    if(!this.pausegame) {this.blinkrate -= (now - this.lasttime) / 1000;}
                }else{
                    this.blinkrate = 0.15;
                    if(this.fever){
                        this.fevereffectbg.alpha = 1;
                        if(this.fevereffectbg.texture == PIXI.Texture.fromFrame('feverlight1.png')) this.fevereffectbg.texture = PIXI.Texture.fromFrame('feverlight2.png');
                        else this.fevereffectbg.texture = PIXI.Texture.fromFrame('feverlight1.png');

                        this.danger_shadow.alpha = 0;
                        this.dangereffect_skeleton.alpha = 0;
                        this.dangerffect_text.alpha = 0;
                        this.dangerffectbar.alpha = 0;
                    }else{
                        this.danger_shadow.alpha = 1;
                        this.dangerffectbar.alpha = 1;
                        //if(this.dangerffectbar.alpha<=0) this.dangerffectbar.alpha = 1;
                        //else this.dangerffectbar.alpha -= 0.25;
                        if(this.dangerffect_text.alpha<=0.5) this.dangerffect_text.alpha = 1;
                        else this.dangerffect_text.alpha -= 0.25;
                        this.dangereffect_skeleton.alpha = 1;
                        if(this.dangereffect_skeleton.texture == PIXI.Texture.fromFrame('warning_s1.png')) this.dangereffect_skeleton.texture = PIXI.Texture.fromFrame('warning_s2.png');
                        else this.dangereffect_skeleton.texture = PIXI.Texture.fromFrame('warning_s1.png');

                        this.fevereffectbg.alpha = 0;//피버 배경 이펫트 끄기
                    }
                }
            }
        }

        //콤보 체크를 위한 타이머
        if (this.matchrate > 0) {
            if (!this.waittimer && !this.stageclear && !this.pausegame) {
                if (this.match) this.matchrate -= (now - this.lasttime) / 1000;
            }
        } else {
            this.resetCombo();
        }

        if(this.increase){
            //console.log('증가')
            if(!this.flip && !this.drop) {
                this.increaseFloor();//층 올리기 함수
                this.increase = false;
            }
        }
    }
    this.lasttime = now;
};

//옵션 버튼을 눌렸을 때 일시정지, 계속 설정
gc.GameScene.prototype.pause = function () {
    this.pausegame = true;
    TweenMax.pauseAll(true,true,true);
};

gc.GameScene.prototype.resume = function () {
    this.pausegame = false;
    TweenMax.resumeAll();
    GD.soundStop('sound_fever_BG');
    if(this.fever) {
        if(GD.isBgmSound) {GD.soundPlay('sound_fever_BG', 1, true);}
    }
};

//메달(업적) 관리==================================================================================================
gc.GameScene.prototype.manageMedal = function () {
    if(this.level == 2 && !this.getmedal1) {
        DataManager.addMedal(1);
        this.getmedal1 = true;
        //console.log('get medal 1.. 레벨 2!!!!!!!!!!!!!');
    }
    else if(this.level == 9 && !this.getmedal3) {
        DataManager.addMedal(3);
        this.getmedal3 = true;
        //console.log('get medal 3.. 레벨 9!!!!!!!!!');
    }
    else if(this.matchcnt==7 && !this.getmedal2) {
        DataManager.addMedal(2);
        this.getmedal2 = true;
        //console.log('get medal 2.. 콤보 7회!!!!!!!!!');
    }
    else if(this.matchresult){
        DataManager.addMedal(4);
        //console.log('get medal 4');
    }
};

gc.GameScene.getInstance = function(){
    if(!gc.game) gc.game = new gc.GameScene();
    return gc.game;
};