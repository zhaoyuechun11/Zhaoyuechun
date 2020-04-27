/**
 * Created by admin on 2018-04-05.
 */
gc.GameScene = function () {
    PIXI.Container.call(this);

    this.touchBg = new PIXI.Sprite.fromFrame("bg1.png");//터치 감지 배경
    this.bg = [new PIXI.Sprite.fromFrame("bg1.png"), new PIXI.Sprite.fromFrame("bg1.png")];
    this.bgWall = [new PIXI.Sprite.fromFrame("bg1_1.png"), new PIXI.Sprite.fromFrame("bg1_1.png"),
        new PIXI.Sprite.fromFrame("bg1_2.png"), new PIXI.Sprite.fromFrame("bg1_2.png")];
    this.bgLight = new PIXI.spine.Spine(GD.loader.resources["portal1"].spineData);//배경 위쪽 빛나는 이펙트
    this.soundBtn = new PIXI.Sprite.fromFrame("bt_option.png");
    this.scoreText = new gc.NumberText("c_score", 'center', -4);

    this.comboNumImg = new gc.NumberText('t_combo', 'right', -4);
    this.comboImg = new PIXI.Sprite.fromFrame("t_combo.png");
    //결과 폭죽
    this.firework = new PIXI.spine.Spine(GD.loader.resources['scoreEf1000'].spineData);
    this.firework.autoUpdate = false;
    gc.spineManager.pushList(this.firework);
    gc.spineManager.setSpineListener(this.firework);

    gc.somi = new gc.Somi();

    this.obstacle = new gc.Obstacle();
    gc.resultView = new gc.ResultView();
    gc.resultView.on("GOTO_MAINPAGE", onIntro);

    this.bgContainer = new PIXI.Container();
    this.blackoutContainer = this.obstacle.initBlackoutContainer();//장애물 컨테이너
    this.birdContainer = this.obstacle.initBirdContainer();//장애물 컨테이너
    this.midContainer = new PIXI.Container();//발판, 블랙아웃, 새, 플레이어 ㅓㄴ테이너 설정
    this.playerContainer = new PIXI.Container();
    this.uiContainer = new PIXI.Container();
    this.comboContainer = new PIXI.Container();
    gc.cutScene = new gc.CutScene();
    this.cutContainer = gc.cutScene.init();
    gc.item = new gc.ItemManager();

    this.warningBg = new PIXI.Sprite.fromFrame("effect_danger.png");
};

gc.GameScene.constructor = gc.GameScene;
gc.GameScene.prototype = Object.create(PIXI.Container.prototype);

gc.GameScene.prototype.setGameBgImage = function () {
    var bgNames = ['bg2', "bg1", "bg3", "bg4", "bg5"];
    var i;
    for(i=0; i<this.bg.length; i++) {
        this.bg[i].texture = PIXI.Texture.fromFrame(bgNames[gc.chapter-1] + '.png');
    }

    for(i=0; i<this.bgWall.length; i++) {
        if(gc.chapter == 2) this.bgWall[i].visible = true;
        else this.bgWall[i].visible = false;
    }

    gc.spineManager.setupPlayAnimate(this.bgLight, 'map_light', true);
    this.bgLight.x = gc.width*0.5;


    this.bg[0].y = 0;
    this.bg[1].y = this.bg[0].y - this.bg[1].height;
    this.bgWall[0].x = -this.bgWall[0].width/3;
    this.bgWall[1].x = this.bgWall[0].x;
    this.bgWall[1].y = this.bgWall[0].y - (this.bgWall[1].height + 1000);
    this.bgWall[2].x = gc.width - this.bgWall[2].width/3;
    this.bgWall[2].y = gc.height/2;
    this.bgWall[3].x = this.bgWall[2].x;
    this.bgWall[3].y = this.bgWall[2].y - (this.bgWall[3].height + 1000);
};

gc.GameScene.prototype.init = function () {
    this.reset();

    this.setGameBgImage();//배경 이미지 설정

    this.itemContainer = gc.item.init();

    //사운드 버튼.. 임시로 좌표만
    this.soundBtn.anchor.set(0.5);
    this.soundBtn.x = gc.width - 60;
    this.soundBtn.y = 60;
    bm.buttonEvent(this.soundBtn, true, this.clickSoundBtn.bind(this));

    //소미 생성
    this.somi = gc.somi.init();

    //점수 획득 이펙트
    this.comboImg.anchor.y = 0.5;
    this.comboNumImg.y = -20;

    //점수 부착
    this.addScore();

    this.touchBg.alpha = 0;
    bm.buttonEvent(this.touchBg, false, this.touchStart.bind(this), null, this.touchEnd.bind(this));

    //진행률
    if(!gc.progress) gc.progress = new gc.Progress();
    gc.progress.setEndStep(gc.chapter);
    gc.progress.resetNowStep();
    this.progressContainer = gc.progress.init();
    this.offUI();

    //다음 맵 정보
    if(!gc.maps) gc.maps = new gc.Map();
    gc.maps.setChapterFloorList();
    gc.maps.init();
    gc.maps.initFootHolds(gc.progress.nowStep, 1, 'basic');//최초 유저가 서있을 발판 만들기

    //중력(점프) 설정
    if(!gc.gravity) gc.gravity = new gc.Gravity();
    gc.gravity.reset();

    //유저 캐릭터 설정
    this.initMyCha();

    //점프 파워 충전 이펙트
    this.effectFoot = new PIXI.spine.Spine(GD.loader.resources["ef1"].spineData);
    this.effectHead = new PIXI.spine.Spine(GD.loader.resources["ef2"].spineData);


    this.bgContainer.addChild(this.bg[0]);
    this.bgContainer.addChild(this.bg[1]);
    this.bgContainer.addChild(this.bgWall[0]);
    this.bgContainer.addChild(this.bgWall[1]);
    this.bgContainer.addChild(this.bgWall[2]);
    this.bgContainer.addChild(this.bgWall[3]);
    this.bgContainer.addChild(this.bgLight);
    this.playerContainer.addChild(this.myCha.img);
    this.uiContainer.addChild(this.scoreText);
    this.uiContainer.addChild(this.soundBtn);
    this.uiContainer.addChild(this.progressContainer);
    this.comboContainer.addChild(this.comboNumImg);
    this.comboContainer.addChild(this.comboImg);
    this.addChild(this.touchBg);
    this.addChild(this.bgContainer);
    this.addChild(this.midContainer);
    this.addChild(this.uiContainer);
    this.addChild(this.cutContainer);

    //처음 들어온 경우 강제로 튜토리얼 보기.. 터치하면 게임 플레이
    var localTuto = LocalStorage.storageGet("gameN_naver_wonderland_tuto", "N");
    if(localTuto == "N") gc.tutorial.onGameTutorial();
    else this.initCallback();
};

//처음 들어온 유저인 경우 튜토리얼을 먼저 봐야하므로 init 콜백함수 생성하여 게임 시작
gc.GameScene.prototype.initCallback = function () {
    this.uiContainer.addChild(this.somi);
    this.uiContainer.addChild(this.itemContainer);
    LocalStorage.storageSet("gameN_naver_wonderland_tuto", "Y");//로컬 스토리지 튜토리얼 확인 값 변경
    if(gc.chapter == 1) {
        this.startSomiTweener = TweenMax.from(this.somi, 0.7, {y:gc.height, onComplete:(function () {//소미 올리기
            this.startSomiTweener = null;
            if(gc.onFx) {
                GD.soundPlay('sound_help');
                GD.soundPlay('sound_flap');
            }
            this.startSomiEf = em;
            this.startSomiEf.floatByY(this.somi, 0.5, 20, 3, (function () {
                gc.somi.disappearSomi();
                this.startSomiEf.reset();
                this.startSomiEf = null;
            }).bind(this));
        }).bind(this)});

        TweenMax.delayedCall(0.3, (function () {//스타트 컷씬
            gc.cutScene.onCutScene(0);
        }).bind(this));
    }
    else {//테스트용
        if(gc.onFx) GD.soundPlay('sound_flap');
        this.startSomiEf = em;
        this.startSomiEf.floatByY(this.somi, 0.5, 20, 3, (function () {
            gc.somi.disappearSomi();
            this.startSomiEf.reset();
            this.startSomiEf = null;
        }).bind(this));
        gc.cutScene.skipBg.interactive = true;
    }
};

//UI화면 보이기
gc.GameScene.prototype.onUI = function () {
    this.scoreText.x = gc.width/2;
    this.scoreText.y = 110;
    this.progressContainer.x = gc.width*0.5 - gc.progress.progressbar.width*0.5;
    this.progressContainer.y = 250;
    this.itemContainer.y = 250 - 70;

    TweenMax.from(this.scoreText, 0.5, {y:this.scoreText.y - 500});
    TweenMax.from(this.progressContainer, 0.5, {y:this.progressContainer.y - 500});
    TweenMax.from(this.itemContainer, 0.5, {y:this.itemContainer.y - 500});
};
//UI화면 안보이게하기
gc.GameScene.prototype.offUI = function () {
    this.scoreText.x = gc.width/2;
    this.scoreText.y = -110;
    this.progressContainer.x = gc.width*0.5 - gc.progress.progressbar.width*0.5;
    this.progressContainer.y = -250;
    this.itemContainer.x = 40;
    this.itemContainer.y = -200;
};

//배경 스크롤, 좌표 설정
gc.GameScene.prototype.scrollBackground = function (moveTime, dist) {
    var i;
    var runtime = 0;
    var ticker = new PIXI.ticker.Ticker();
    ticker.stop();
    ticker.add((function (deltaTime) {
        runtime += deltaTime;

        for(i=0; i<this.bg.length; i++) {
            if(this.bg[i].y >= gc.height) {
                if(i==0) this.bg[i].y = this.bg[1].y - this.bg[i].height;
                else this.bg[i].y = this.bg[0].y - this.bg[i].height;
            }
            this.bg[i].y += dist/(35*3);
        }

        if(runtime >= moveTime*50) {
            ticker.stop();
            ticker.remove();
        }
    }).bind(this));
    ticker.start();

    for(i=0; i<this.bgWall.length; i++) {
        TweenMax.to(this.bgWall[i], moveTime, {y:this.bgWall[i].y + parseInt(dist), onComplete:(function (i) {
            if(this.bgWall[i].y >= gc.height) {
                if(i%2 == 0) this.bgWall[i].y = this.bgWall[i+1].y - (this.bgWall[i].height +1000);
                else this.bgWall[i].y = this.bgWall[i-1].y - (this.bgWall[i].height +1000);
            }
        }).bind(this, i)});
    }
};

//발판, 장애물, 유저 레이어 순서 설정
gc.GameScene.prototype.setMidContainer = function (type) {//type0: 기본, 암전 1:유저가 가장 아래 2:발판사이에 유저
    var i;
    var mapConList = [];
    //발판 컨테이너 스텝 별 내림차순 정렬(점점 작아지게)
    mapConList = gc.maps.mapContainers.sort(function (a, b) {
        return b.step - a.step;
    });

    if(type == 0) {//기본, 암전.. 유저가 가장 위에 있음
        for(i=0; i<mapConList.length; i++) {
            this.midContainer.addChild(mapConList[i].center);
        }
        this.midContainer.addChild(this.blackoutContainer);
        this.blackoutContainer.addChild(this.birdContainer);
        this.midContainer.addChild(this.playerContainer);
    }
    else if(type == 1) {//유저가 가장 아래
        this.midContainer.addChild(this.playerContainer);
        for(i=0; i<mapConList.length; i++) {
            this.midContainer.addChild(mapConList[i].center);
        }
        this.midContainer.addChild(this.blackoutContainer);
        this.blackoutContainer.addChild(this.birdContainer);
    }
    else {
        for(i=0; i<mapConList.length; i++) {
            //발판을 내림차순으로 정렬했기 때문에 유저를 먼저 붙인 후 발판을 붙임
            if(mapConList[i].step == this.myCha.step) this.midContainer.addChild(this.playerContainer);
            this.midContainer.addChild(mapConList[i].center);
        }
        this.midContainer.addChild(this.blackoutContainer);
        this.blackoutContainer.addChild(this.birdContainer);
    }
};

//추가될 점수 계산
gc.GameScene.prototype.setAddScore = function (result) {
    var score = 0;
    if(result == 'good') score = 1;
    else if(result == 'nice') score = 2;
    else if(result == 'perfect') score = 3;
    //콤보계산
    if(result == 'perfect') this.combo++;
    else this.combo = -1;
    //점수 최대치 설정
    if(this.combo > 0) score += this.combo;
    if(score > 10) score = 10;

    return score;
};

//점수 추가
gc.GameScene.prototype.addScore = function (addScore) {
    var prescore = this.score;//점수 강조 이펙트 체크를 위함
    if(addScore) {
        this.score += addScore;

        //점프발판 회수 체크.. 현재 발판 정보 변경 전
        if(gc.maps.nowFootholdPos.info.skillType == "jump") this.jumpFhCnt++;
        if(this.jumpFhCnt >= 5) this.fever = false;

        //스텝을 증가시킬것인지 여부
        var addstep = true;
        //현재 발판 정보가 바뀌기 전.
        if(gc.maps.nextFootholdPos.info.skillType == "jump") {//올라간 발판이 jump발판일 경우
            if(this.jumpFhCnt < 4 && gc.progress.nowStep+1 == gc.progress.endStep-2) {
                if(this.fever) addstep = false;
            }
        }

        if(addstep) gc.progress.addStep();//진행바 스텝 증가
        this.checkScoreEffect(prescore);//점수 강조 체크

        //점수 획득 이펙트
        if(this.scoreEf) this.scoreEf.kill();
        this.scoreEf = null;

        //콤보 텍스트 이미지
        this.setComboImg();
    }
    this.scoreText.setValue(this.score);
    if(this.mainScoreEfNum) this.mainScoreEfNum.setValue(this.score);
};

//콤보 이미지 설정
gc.GameScene.prototype.setComboImg = function () {
    removeObject(this.comboContainer);
    this.comboContainer.alpha = 1;
    this.comboContainer.x = this.myCha.img.x;
    this.comboContainer.y = this.myCha.img.y - 50;
    this.comboNumImg.setValue(this.combo);


    this.scoreEf = TweenMax.to(this.comboContainer, 2, {y:this.myCha.img.y - 120, alpha: 0, onComplete:(function () {
        removeObject(this.comboContainer);
    }).bind(this)});

    if(this.combo > 0) this.addChild(this.comboContainer);
};

//스테이지 완료 점수 추가
gc.GameScene.prototype.addChapterClearScore = function () {
    var addscore = 0;
    if(gc.chapter == 1) addscore = 150;
    else if(gc.chapter == 2) addscore = 250;
    else if(gc.chapter == 3 || gc.chapter == 4 || gc.chapter == 5) addscore = 300;
    this.score += addscore;
    this.scoreText.setValue(this.score);
};

//유저 캐릭터 생성
gc.GameScene.prototype.initMyCha = function () {
    if(!gc.characters) gc.characters = new gc.Characters();
    gc.characters.reset();
    //캐릭터 위에 나타날 이모티콘(아이템, 방해물, 특수블럭)
    var emo = new PIXI.spine.Spine(GD.loader.resources['jumpTxt'].spineData);
    emo.autoUpdate = false;
    gc.spineManager.pushList(emo);
    gc.spineManager.setSpineListener(emo);

    this.myCha = {img:null, emo:emo, onEmo:false, status:"stand", x:0, y:0, step: 0, combo:-1, jumpDir: 1};
    this.myCha.img = gc.characters.init(0);
    this.myCha.status = "stand";
    this.myCha.x = gc.maps.nowFootholdPos.x;
    this.myCha.y = gc.maps.nowFootholdPos.y;
    this.myCha.img.x = this.myCha.x;
    this.myCha.img.y = this.myCha.y;
    this.myCha.jumpDir = 1;
    this.myCha.emo.y = -130;

    gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_basic", true);
    this.setPlayerStandScale();
    this.resetCharacterEmoticon();//이모티콘 설정 초기화
};

//유저 이모티콘 타입 설정
gc.GameScene.prototype.setCharacterEmoType = function (type) {//type 0:기쁨, 1:위험
    this.emoType = type;
};

//유저 이모티콘 설정 초기화
gc.GameScene.prototype.resetCharacterEmoticon = function () {
    removeObject(this.myCha.emo);
    this.myCha.onEmo = false;
    this.emoType = -1;
};

//유저 이모티콘 실행
gc.GameScene.prototype.onCharacterEmoticon = function () {
    if(this.myCha) {
        if (!this.myCha.onEmo) {
            if (this.emoType == 0) {//아이템 생성됨
                this.myCha.onEmo = true;
                gc.spineManager.setupPlayAnimate(this.myCha.emo, 'lyto_happy', false);
                this.myCha.img.addChild(this.myCha.emo);
            }
            else if (this.emoType == 1) {//특수발판, 방해물 생성됨
                this.myCha.onEmo = true;
                gc.spineManager.setupPlayAnimate(this.myCha.emo, 'lyto_danger', false);
                this.myCha.img.addChild(this.myCha.emo);
            }
        }
    }
    this.emoType = -1;//이모티콘 실행 후 타입 초기화
};

//유저가 바라볼 방향
gc.GameScene.prototype.setPlayerStandScale = function () {
    // if(this.myCha.jumpDir == 1) this.myCha.img.scale.x = -1;//오른쪽 바라보기
    // else this.myCha.img.scale.x = 1;//왼쪽 바라보기
    this.myCha.img.scale.x = -this.myCha.jumpDir;//캐릭터 기본 방향이 왼쪽을 보고있어서 점프방향의 반대로 설정
    this.myCha.emo.scale.x = -this.myCha.jumpDir;
};

//발판이 낮아졌을 때의 경고
gc.GameScene.prototype.onWarning = function () {
    var scale = 2;
    this.warningBg.scale.x = scale;
    this.warningBg.scale.y = scale;
    this.warningTweener = null;
    upAlpha.bind(this)(this.warningTweener);
    this.onWarn =true;

    var lightTime = 0.5;

    this.warningBg.alpha = 0.3;

    function upAlpha(tweener) {
        tweener = TweenMax.to(this.warningBg, lightTime, {ease:Power0.easeNone, alpha:1, onComplete:(function () {
            downAlpha.bind(this)(tweener);
        }).bind(this)});
    }

    function downAlpha(tweener) {
        this.warningBg.alpha = 1;
        tweener = TweenMax.to(this.warningBg, lightTime, {ease:Power0.easeNone, alpha:0.3, onComplete:(function () {
            if(this.onWarn) upAlpha.bind(this)(tweener);
        }).bind(this)});
    }

    this.uiContainer.addChildAt(this.warningBg, 0);
};

//경고 끄기
gc.GameScene.prototype.offWarning = function () {
    if(this.warningTweener) this.warningTweener.kill(false);//경고 트위너 제거
    this.warningTweener = null;
    this.onWarn = false;

    removeObject(this.warningBg)
};

//화면 갱신.. 발판 내리기, 발판 폭파
gc.GameScene.prototype.setBackground = function () {
    if(gc.item.onItemImg) {
        gc.item.getItemImg();
        this.onJumpResultMessage(3);//피버 텍스트
        this.fever = true;
    }

    var onCut = false;//컷씬이 보일것인가
    var wait = false;//소미가 나오는 동안 멈추기 위함

    //일반 발판 이미지인데 속성이 점프인 경우 이미지 변경.. 현재 서있는 발판 정보를 저장하기 전이기 때문에 다음발판(방금 올라선 발판)으로 체크
    if (gc.maps.nextFootholdPos.info.skillType == "jump") gc.maps.checkFeverFootHold();

    gc.maps.setNowFootHoldPos();//유저가 발판에 올라선 후 발판 좌표 저장.. 현재 발판 정보 변경
    gc.maps.pullDownFootHolds();//발판, 유저 내리기

    if(gc.onFx) {
        if (gc.maps.nowFootholdPos.info.imgType == "300" && gc.maps.nowFootholdPos.info.skillType == "jump")
            GD.soundPlay("sound_bonusblock");//점프발판에 올라선 사운드
    }

    //발판 생성
    if(gc.progress.nowStep+1 == gc.progress.endStep-1) {//발판 생성..챕터의 마지막 발판은 무조건 기본 발판
        wait = true;
        gc.maps.initFootHolds(gc.progress.nowStep+1, 1, 'basic');
    }
    else if(gc.progress.nowStep+1 == gc.progress.endStep-2) {//마지막 발판 직전은 무조건 점프발판
        if (gc.chapter == 5) {
            console.log("Jump stool", gc.progress.nowStep+1, gc.progress.endStep-2)
            gc.maps.initFootHolds(gc.progress.nowStep + 1, 1, "jump");
        }
        else gc.maps.initFootHolds(gc.progress.nowStep + 1, 1);
    }
    else {
        gc.maps.initFootHolds(gc.progress.nowStep+1, 1);
        if(gc.maps.nextFootholdPos.info.skillType == "ice" || gc.maps.nextFootholdPos.info.skillType == "slide")
            this.onSpecialMessage(1);
    }

    //만들어진 발판이 화면 사이드 밖으로 나갔는지 체크
    gc.maps.checkFootHoldsOutofScene();

    this.obstacle.removeFarBirds();//멀리 있는 새 제거

    if(onCut) {
        //특수발판, 장애물이 처음 발생했을때.. 동시에 이뤄지면 어떡할것인가
        this.addChild(this.cutContainer);
        gc.cutScene.onCutScene(1, checkDelayResume.bind(this))//타입, 리턴 함수
    }
    else {
        checkDelayResume.bind(this)();
    }

    function checkDelayResume() {
        if(wait) TweenMax.delayedCall(0.1, resumeSetBackground.bind(this));
        else resumeSetBackground.bind(this)();
    };


    this.onSlideFootHold = false;
    function resumeSetBackground() {
        if (gc.maps.nowFootholdPos.info.skillType == "jump") {
            this.myCha.status = "inJump";//점프 중 상태로 변경
            TweenMax.delayedCall(0.15, (function () {
                this.jumpPlayer();
                gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_touchoff", true);
                gc.maps.jumpAnimate();
            }).bind(this));
        }
        else {
            this.myCha.status = "stand";
            this.setInteractive(true);
        }//터치 제어

        //슬라이드 발판 여부 설정
        var delayTime = 0.3;
        TweenMax.delayedCall(delayTime, (function () {
            this.slideBlockAct();//현재 발판이 슬라이드 발판이면 다음 발판으로 미끄러짐


            //발판 전체 가라앉기
            if(gc.sink) {
                gc.maps.sink = true;
            }
        }).bind(this));
    }

    //포탈 이미지 화면에 붙이기
    if (gc.progress.nowStep+1 == gc.progress.endStep-1) {//챕터의 마지막 발판이 생겼을 경우
        if (this.portal) {
            removeObject(this.portal);
            this.removeSpineListener(this.portal);
        }
        this.portal = null;

        // var name = "portal" + gc.chapter;
        var name = "portal1";
        if(!this.portal) {
            this.portal = new PIXI.spine.Spine(GD.loader.resources[name].spineData);
            this.portal.autoUpdate = false;
            gc.spineManager.pushList(this.portal);
            gc.spineManager.setSpineListener(this.portal);
        }
        this.portal.scale.x = 1;
        this.portal.scale.y = 1;
        this.portal.x = gc.maps.nextFootholdPos.x;
        this.portal.y = gc.maps.nextFootholdPos.y - 50;
        gc.spineManager.setupPlayAnimate(this.portal, "portal_appear", false);

        if(gc.chapter != 5) {
            var con = gc.maps.findContainer(gc.maps.nextFootholdPos.info.step);
            con.center.addChild(this.portal);

            TweenMax.delayedCall(0.3, (function () {//소미 포탈로 이동
                gc.somi.portalSomi();
            }).bind(this));
        }
        else {
            gc.somi.sitOnLastFootHold(gc.maps.nextFootholdPos.x, gc.maps.nextFootholdPos.y - 50);
        }
    }

    //소미 설정
    if(gc.progress.nowStep+1 == gc.progress.endStep - 3) {//클리어 발판까지 2칸 남았을 경우
        gc.somi.appearSomi();
    }
};

//서있는 발판이 슬라이딩 발판이면 미끄러지기
gc.GameScene.prototype.slideBlockAct = function () {
    var i;
    this.onSlideFootHold = false;
    for(i=0; i<gc.maps.allFootHolds.length; i++) {
        if(gc.maps.allFootHolds[i].step == this.myCha.step && gc.maps.allFootHolds[i].stair == "top") {
            if(gc.maps.allFootHolds[i].skillType == "slide") {
                this.onSlideFootHold = true;
                break;
            }
        }
    }
};

//-----------------------------장애물 발생 여부
//새 장애물
gc.GameScene.prototype.setObstacleBird = function (moveDist, moveTime) {//새가 움직일 거리
    var onObstacle = false;
    for(var i=0; i<gc.maps.birdTiming.length; i++) {
        if(gc.maps.birdTiming[i] == gc.progress.nowStep+1) {
            onObstacle = true;
        }
    }

    //현재/다음 발판이 점프발판이면 취소
    if(gc.maps.nowFootholdPos.info.skillType == "jump" || gc.maps.nextFootholdPos.info.skillType == "jump")
        onObstacle = false;

    if(onObstacle) {
        this.setCharacterEmoType(1);//새가 나올 시 캐릭터 놀람 이모티콘 설정
        this.onObstacleBird(moveDist, moveTime);
    }
};

gc.GameScene.prototype.onObstacleBird = function (moveDist, moveTime) {
    var bird = this.obstacle.findBird();
    bird.step = this.myCha.step+1;
    bird.center.x = gc.maps.nextFootholdPos.x;
    bird.center.y = gc.maps.nextFootholdPos.y;
    bird.img.x = 0;
    bird.img.y = 0;

    TweenMax.from(bird.center, moveTime, {y:bird.center.y + moveDist, onComplete:(function () {
        TweenMax.delayedCall(0.1, (function () {
            var birdDist = bird.img.y + 140;
            TweenMax.to(bird.img, 0.3, {y:birdDist});
            bird.isFly = true;
            gc.spineManager.setupPlayAnimate(bird.img, "animation", true);
        }).bind(this));
    }).bind(this)});

    this.birdContainer.addChildAt(bird.center, 0);
};

//암전 장애물
gc.GameScene.prototype.setObstacleBlackout = function () {//정전 여부
    if(gc.maps.nowFootholdPos.info.skillType != 'jump') {
        var onObstacle = false;
        for(var i=0; i<gc.maps.blackoutTiming.length; i++) {
            if(gc.maps.blackoutTiming[i] == gc.progress.nowStep) {
                onObstacle = true;
                break;
            }
        }
        //엔딩컷 전에는 슬로우 모션이 되야하므로.
        if(gc.chapter == 5 && gc.progress.endStep - gc.progress.nowStep == 2) onObstacle = false;
        if(gc.maps.nowFootholdPos.info.skillType == "jump") onObstacle = false;//점프발판을 밟고있는경우

        if(onObstacle) this.obstacle.offLight = true;
        else this.obstacle.offLight = false;

        if (this.obstacle.offLight) {
            this.setCharacterEmoType(1);//암전 시 캐릭터 놀람 이모티콘 설정
            this.onSpecialMessage(2);
            this.obstacle.offGameLight();
        }
    }
};

//--------------터치 이벤트
gc.GameScene.prototype.touchStart = function () {
    //점프 준비중 애니메이션으로
    //서있는 상태일 때
    if(this.myCha.status == "stand") {
        this.chargeVolume = 0.3;
        if(gc.onFx) {
            //이벤트 아이디 확인을 위한 번호 저장
            this.gaugeId = GD.soundPlay("sound_gauge", this.chargeVolume, false, this.soundGaugeCallback.bind(this));
        }

        this.myCha.status = "readyJump";//점프 준비 상태로 변경
        gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_touchon", false);
        gc.maps.waitJumpAnimate();

        if(this.guideLineCnt[gc.chapter-1] > 0) this.guideLineCnt[gc.chapter-1]--;

    }
};

gc.GameScene.prototype.touchEnd = function () {
    //점프하는 이미지
    if(this.myCha.status == "readyJump") {
        var cancel = false;
        if(cancel) {
            this.cancelCharge();
        }
        else {
            GD.soundStop("sound_gauge");
            this.setInteractive(false);//터치 제어

            removeObject(this.effectFoot);
            removeObject(this.effectHead);
            this.myCha.status = "inJump";//점프 중 상태로 변경
            this.jumpPlayer();
            gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_touchoff", true);
            gc.maps.jumpAnimate();
        }
    }

    gc.gravity.resetGuideLight();
};

//충전 사운드 이벤트 콜백함수
gc.GameScene.prototype.soundGaugeCallback = function (id) {
    if(id == this.gaugeId) {
        if (this.myCha.status == "readyJump") {
            if (this.chargeVolume < 1) this.chargeVolume += 0.1;
            if(gc.onFx){
                this.gaugeId = GD.soundPlay("sound_gauge", this.chargeVolume, false, this.soundGaugeCallback.bind(this));
            }
        }
    }
};

//충전 취소.. 보류 기능
gc.GameScene.prototype.cancelCharge = function () {
    this.myCha.status = "stand";
    gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_basic", true);
    gc.gravity.resetPow();
    gc.maps.cancelJump();
    removeObject(this.effectFoot);
    removeObject(this.effectHead);
};

//플레이어 충전 이펙트 보이기
gc.GameScene.prototype.onChargeEffect = function () {
    gc.spineManager.setupPlayAnimate(this.effectFoot, "ef", true);
    gc.spineManager.setupPlayAnimate(this.effectHead, "ef", true);
    this.effectFoot.skeleton.setToSetupPose();
    this.effectHead.skeleton.setToSetupPose();
    this.effectFoot.x = this.myCha.x;
    this.effectFoot.y = this.myCha.y;
    this.effectHead.x = this.myCha.x;
    this.effectHead.y = this.myCha.y - 50;

    var time = 0.3;//발판 움직이는 시간보다 좀 더 짧게
    TweenMax.from(this.effectFoot, time, {x:this.myCha.img.x, y:this.myCha.img.y});
    TweenMax.from(this.effectHead, time, {x:this.myCha.img.x, y:this.myCha.img.y});
    this.playerContainer.addChildAt(this.effectFoot, 0);
    this.playerContainer.addChild(this.effectHead);
};

//사운드 버튼 클릭
gc.GameScene.prototype.clickSoundBtn = function () {
    if(this.myCha.status != "readyJump") {
        gc.soundPopup.onSoundPopup();
    }
};

//점프 대기중 상태 체크
gc.GameScene.prototype.checkInJumpWait = function () {
    if(this.myCha.status == "readyJump") {
        gc.gravity.addPow();
    }
};

//얼음 블록 터질때 유저가 얼음 발판에 있는지 확인
gc.GameScene.prototype.checkPlayerInIceFootHold = function (fhStep) {
    if(this.myCha.step == fhStep) {
        if(this.myCha.status != "inJump" && this.myCha.status != "over") {
            this.myCha.status = 'over';
            removeObject(this.effectFoot);
            removeObject(this.effectHead);
            gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_over", false);
        }
    }
};

//슬라이드 발판에 서있는지 확인
gc.GameScene.prototype.checkOnSlide = function () {
    if(!gc.pauseGame) {
        var frame = 60 * 5;//60프레임이라 보고 5초당 해당 거리만큼 움직여라
        var vx = gc.maps.nowFootholdPos.info.fhWidth;
        var vy = gc.maps.nowFootholdPos.info.fhHeight;
        if (this.myCha.jumpDir == -1) vx = -vx;

        if (this.onSlideFootHold) {
            if (this.myCha.status == "stand") {
                gc.maps.setNowFootHoldPos();//발판 좌표 재설정
                this.myCha.x += vx / frame;
                this.myCha.y -= vy / frame;
                this.myCha.img.x = this.myCha.x;
                this.myCha.img.y = this.myCha.y;
                gc.maps.setFootHoldDist();//다음 발판까지 거리 설정

                var result = gc.gravity.checkInSameFootHold();

                if (result.result == "danger" || result.result == "weak" || result.result == "too much") {
                    this.myCha.status = 'over';
                    if (result.result == "danger")
                        gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_over", false);
                    else if (result.result == "weak")
                        gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_hit", false);
                    else if (result.result == "too much")
                       gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_over2", false);
                }
            }
        }
    }
};

//점프하기
gc.GameScene.prototype.jumpPlayer = function () {
    if(gc.onFx) GD.soundPlay("sound_jump");
    gc.maps.sink = false;// 테스트용
    this.offWarning();//발판이 낮아서 배경 경고나오는 것 종료

    //터치하면 이모티콘 제거
    this.resetCharacterEmoticon();

    var result = {};
    if(gc.maps.nowFootholdPos.info.skillType == "jump") {
        gc.gravity.chargePow = gc.maps.footHoldGap;
        result = gc.gravity.calcJumpResult();
    }
    else {
        result = gc.gravity.calcJumpResult();
        this.jumpFhCnt = 0;
    }

    var movetime = 0.4;
    var vx = result.vx;
    var vy = result.vy;

    if(result.result == "weak") {//벽에 부딪치는 경우 목표 x좌표의 조정
        vx += gc.gravity.calcSideGapWithPlayer(this.myCha.x + vx);//유저와 다음발판 줄기 사이의 거리
    }

    //점프할 최대 높이
    var topY = vy - (this.myCha.y - vy)*0.05;
    var upGoalX = 0;
    var upGoalY = topY;
    if(result.result == "too much") upGoalX = vx*0.68;
    else upGoalX = vx*0.6;

    var startUpX = this.myCha.x;
    var startUpY = this.myCha.y;
    //올라선 발판이 점프발판인 경우 유저 오브젝트 이미지의 좌표로 계산
    if(gc.maps.nowFootholdPos.info.skillType == "jump") startUpY = this.myCha.img.y;

    var startDownX = startUpX + upGoalX;
    var startDownY = startUpY + upGoalY;

    this.myCha.x += vx;
    this.myCha.y += vy;

    var landingAniY =  (this.myCha.img.y + vy) * 0.95;
    var landingAniX =  (this.myCha.img.x + vx) * 0.8;

    //마지막 챕터의 마지막 점프
    var gameAllClear = false;
    if(gc.chapter == 5 && gc.progress.endStep - gc.progress.nowStep == 2) {
        movetime *= 5;
        gameAllClear = true;
    }

    var upTweener = TweenMax.to(this.myCha.img, movetime*0.6, {
        ease: Power0.easeNone,
        bezier: {
            type:"quadratic",
            values:[{x: startUpX, y: startUpY},
                {x: (startUpX + upGoalX*0.2), y: startUpY + upGoalY*0.9},
                {x: (startUpX + upGoalX), y: startUpY + upGoalY}]
        },
        onUpdate:(function () {
            this.checkHitWithBird(upTweener);
        }).bind(this),
        onComplete:(function () {
            if(!gameAllClear) downTween.bind(this)();
            else {//게임을 모두 클리어했을 때 점수 추가할 시간이 없으므로 점수 추가시키고 게임 끝 애니 보이기
                var score = this.setAddScore(result.result);
                this.score += score;
                this.addChapterClearScore();
                this.gameAllClear();
            }
        }).bind(this)
    });

    function downTween(){
        var isLandingAni = (result.result == "perfect" || result.result == "nice" || result.result == "good");

        var downGoalX = vx - upGoalX;
        var downGoalY = (topY - vy);
        var downTime = movetime*0.3;
        var inSameFoothold = gc.gravity.checkInSameFootHold();

        if(inSameFoothold != "stand")
        {
            if(!isLandingAni){//다음 발판에 올라가지 못함
                if(result.result != "danger") {
                    if (result.result != "too much") {
                        this.checkDepth(this.myCha.x);
                    }
                    else {// 벽에 부딪침
                        this.checkDepth(this.myCha.x + downGoalX);
                        downGoalY = -(gc.height - this.myCha.img.y);
                        downGoalX = vx * 0.5;
                        downTime = movetime * 0.7;
                    }
                }
            }
        }

        var downTweener = TweenMax.to(this.myCha.img, downTime, {
            ease: Power0.easeNone,
            bezier:{
                type:"quadratic",
                values:[{x: startDownX, y: startDownY},

                    {x: (startDownX + downGoalX*0.85), y: (startDownY - downGoalY*0.1)},

                    {x: startDownX + downGoalX, y: startDownY - downGoalY}]},
            onUpdate: (function () {
                this.checkHitWithBird(downTweener);

                // - 착지에 가까운 위치에 도달했을 때 애니메이션 변경
                if(isLandingAni === true && this.myCha.img.y >= landingAniY){
                    if(this.myCha.img.x >= landingAniX) {
                        isLandingAni = false;
                        gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_landing", false);
                    }
                }
            }).bind(this),
            onComplete: (function () {
                if (result.result == "perfect" || result.result == "nice" || result.result == "good") {
                    //퍼펙트 강조 텍스트
                    if(result.result == "perfect" && gc.maps.nowFootholdPos.info.skillType != 'jump') {
                        this.onJumpResultMessage(0);//퍼펙트 텍스트
                    }
                    else if(result.result == "nice") {
                        this.onJumpResultMessage(1);//나이스(엑설런트) 텍스트
                    }
                    else if(result.result == "good") {
                        this.onJumpResultMessage(2);//굿 텍스트
                    }

                    //유저가 바라볼 방향 설정
                    this.myCha.jumpDir = gc.maps.initFootholdInfo.dir;
                    this.setPlayerStandScale();
                    //유저가 서있는 스텝 정보 갱신
                    this.myCha.step = gc.progress.nowStep+1;

                    gc.gravity.resetPow();
                    gc.maps.jumpIn();//올라선 발판 안착 애니메이션

                    //암전 취소
                    this.obstacle.onGameLight();

                    if(gc.maps.nowFootholdPos.info.skillType == "jump") this.onSpecialMessage(0);//뛰었던 발판이 점프발판
                    else {//아이템 게이지 충전
                        var addItemValue = 0;
                        if(result.result == "perfect") addItemValue = 2.5;
                        else if(result.result == "nice" || result.result == "good") addItemValue = 1;
                        gc.item.addCharge(addItemValue);
                    }

                    //점수 추가, 점수 이펙트 여부, 발판 생성(챕터 클리어)
                    var score = this.setAddScore(result.result);
                    this.addScore(score);
                }
                else {//덜 뛰거나 더 뛰었을 때
                    gc.maps.setNowFootHoldPos();//유저가 발판에 올라선 후 발판 좌표 저장
                    //미리 체크해둠
                    if (inSameFoothold == "stand") {//제자리에 올라갔을 때
                        this.combo = -1;
                        this.myCha.status = "stand";
                        this.setPlayerStandScale();
                        gc.maps.setFootHoldDist();
                        gc.gravity.resetPow();
                        gc.maps.jumpIn();//올라선 발판 안착 애니메이션

                        TweenMax.delayedCall(0.1, (function () {
                            this.setInteractive(true);//터치 제어
                        }).bind(this));
                        gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_basic", true);
                    }
                    else {//허공에 떨어질 때
                        this.myCha.status = 'over';
                        if(result.result == "danger") {
                            if(gc.onFx) GD.soundPlay("sound_dangling");

                            //약하게 뛰어서 흔들거리다 떨어질 경우 뒤쪽으로 떨어지기..
                            if(gc.maps.footHoldGap < gc.gravity.chargePow)//멀리 뛰어서 휘청
                                gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_over", false);
                            else//덜뛰어서 휘청
                                gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_miss", false);
                        }//발판에서 떨어짐
                        else if(result.result == "weak"){
                            if(gc.onFx) GD.soundPlay("sound_wallhit");
                            gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_hit", false);
                            var ef = this.onHitEffect();
                            ef.x = this.myCha.img.x;
                            ef.y = this.myCha.img.y;
                            this.midContainer.addChild(ef);
                            var nextfhCon = gc.maps.findContainer(gc.maps.nextFootholdPos.info.step);
                            gc.maps.swingContainer(nextfhCon, gc.maps.nextFootholdPos.info.step);//벽에 부딪친 발판 흔들리기
                        }//벽에 부딪침
                        else if(result.result == "too much") {
                            if(gc.onFx) GD.soundPlay("sound_falling");
                            removeObject(gc.game.myCha.img);
                            gameOver();
                        }//허공에 떨어짐
                    }
                }
            }).bind(this)
        })
    }
};

//새와 부딪침 처리
gc.GameScene.prototype.checkHitWithBird = function (tween) {
    var isHitBird = this.obstacle.checkHitWithBird();//새와 부딪쳤는지 체크
    if (isHitBird) {
        if(gc.onFx) GD.soundPlay("sound_birdhit");
        tween.kill();
        gc.spineManager.setupPlayAnimate(this.myCha.img, "cha_fail_hit", false);
    }
};

//레이어 처리
gc.GameScene.prototype.checkDepth = function(checkX){
    if(this.obstacle) {
        if(this.obstacle.offLight) this.setMidContainer(0);//암전상태일때는 유저가 가장 위에 보임
        else {
            var px = checkX;//this.myCha.img.x;
            var fh = gc.maps.nextFootholdPos;
            if(this.myCha.jumpDir == 1) {//오른쪽으로 뛸 때
                if (px <= fh.x) this.setMidContainer(2);//발판 사이에 떨어짐
                else this.setMidContainer(1);//너무 멀리 뜀
            }
            else {//왼쪽으로 뛸 때
                if (px <= fh.x) this.setMidContainer(1);//너무 멀리 뜀
                else this.setMidContainer(2);//발판 사이에 떨어짐
            }
        }
    }
};

//점수 강조 체크
gc.GameScene.prototype.checkScoreEffect = function (preScore) {
    var prescore = preScore;
    var nowscore = this.score;

    //1000단위 변화 체크
    var preUnit = Math.floor(prescore/1000);
    var nowUnit = Math.floor(nowscore/1000);
    if(preUnit != nowUnit) {
        this.onScoreEffect("1000");
        return;
    }
    else {
        prescore -= preUnit*1000;
        nowscore -= nowUnit*1000;

        //100단위 체크
        preUnit = Math.floor(prescore/100);
        nowUnit = Math.floor(nowscore/100);
        if(preUnit != nowUnit) {
            this.onScoreEffect("100");
            return;
        }
        else {
            prescore -= preUnit*100;
            nowscore -= nowUnit*100;

            //50단위 체크
            preUnit = Math.floor(prescore/50);
            nowUnit = Math.floor(nowscore/50);
            if(preUnit != nowUnit) {
                this.onScoreEffect("50");
                return;
            }
        }
    }

    this.checkChapterOver();//해당 챕터가 완료되었는지 체크
};

//벽에 부딪치는 이펙트
gc.GameScene.prototype.onHitEffect = function () {
    var ef = new PIXI.spine.Spine(GD.loader.resources["cha_hit"].spineData);
    ef.skeleton.setToSetupPose();
    ef.state.timeScale = 1.2;
    ef.state.setAnimation(0, "cha_hit", false, 0);

    return ef;
};

//점수 강조 이펙트
gc.GameScene.prototype.onScoreEffect = function (type) {
    this.scoreText.alpha = 0;
    var soundName = "sound_" + type;
    if(gc.onFx) GD.soundPlay(soundName);

    //점수 강조 이펙트 생성
    if(this.scoreEfBg.length == 0) {
        var list = ["scoreEf50", "scoreEf100", "scoreEf1000"];
        for(var i=0; i<3; i++) {
            this.scoreEfBg[i] = new PIXI.spine.Spine(GD.loader.resources[list[i]].spineData);
            this.scoreEfBg[i].autoUpdate = false;
            gc.spineManager.pushList(this.scoreEfBg[i]);
            gc.spineManager.setSpineListener(this.scoreEfBg[i]);
        }
    }

    var index = 0;
    if(type == "100") index = 1;
    else if(type == "1000") index = 2;
    gc.spineManager.setupPlayAnimate(this.scoreEfBg[index], "scoreEf", false);
    this.scoreEfBg[index].x = this.scoreText.x;
    this.scoreEfBg[index].y = this.scoreText.y + 30;

    //강조할 점수 텍스트
    if(!this.mainScoreEfNum) {
        this.scoreNumContainer = new PIXI.Container();
        this.scoreNumContainer.x = this.scoreText.x;
        this.scoreNumContainer.y = this.scoreText.y + 15;

        this.mainScoreEfNum = new gc.NumberText("c_score", 'center', -4);
        this.mainScoreEfNum.setValue(0);

        this.scoreNumContainer.addChild(this.mainScoreEfNum);
    }

    this.uiContainer.addChild(this.scoreEfBg[index]);

    //점수 텍스트 이펙트
    this.mainScoreEfNum.setValue(this.score);
    this.scoreNumContainer.x = this.scoreText.x;
    this.scoreNumContainer.y = this.scoreText.y-30;
    var time1 = 0.4, time2 = 0.1, time3 = 0.3;
    TweenMax.from(this.scoreNumContainer, time1, {y:this.scoreNumContainer.y - 220, onComplete:(function () {
        TweenMax.to(this.scoreNumContainer, time2, {y:this.scoreNumContainer.y - 20});
    }).bind(this)});
    TweenMax.fromTo(this.scoreNumContainer.scale, time1, {ease:Power0.easeNone, x:4.8, y:4.8, alpha:0}, {x:1.4, y:1.4, alpha:1, onComplete:(function () {
        TweenMax.to(this.scoreNumContainer.scale, time2, {ease:Power0.easeNone, x:1.7, y:1.7});
    }).bind(this)});
    this.uiContainer.addChild(this.scoreNumContainer);
    this.checkChapterOver();//해당 챕터가 완료되었는지 체크
};

//점프 결과 강조 텍스트(퍼펙트, 피버)
gc.GameScene.prototype.onJumpResultMessage = function (type) {//0:퍼펙트 1:나이스(엑설런트) 2:굿 3:피버
    //메세지를 만들지 않은 상태일 경우 메세지 생성
    if(!this.jumpMessage) {
        this.jumpMessage = new PIXI.spine.Spine(GD.loader.resources["jumpTxt"].spineData);
        this.jumpMessage.autoUpdate = false;
        gc.spineManager.pushList(this.jumpMessage);
        gc.spineManager.setSpineListener(this.jumpMessage);
    }

    this.jumpMessage.x = gc.width*0.5;
    this.jumpMessage.y = 450;
    if(type == 0) {//퍼펙트 점프
        if(gc.onFx) GD.soundPlay('sound_perfect');
        gc.spineManager.setupPlayAnimate(this.jumpMessage, "t_perfect", false);
        // gc.spineManager.playAnimate(this.jumpMessage, "t_perfect", false);
        this.uiContainer.addChild(this.jumpMessage);
        gc.item.onBgEffect();
    }
    else if(type == 1) {//나이스(엑설런트) 점프
        if(gc.onFx) GD.soundPlay('sound_perfect');
        gc.spineManager.setupPlayAnimate(this.jumpMessage, "t_excellent", false);
        // gc.spineManager.playAnimate(this.jumpMessage, "t_good", false);
        this.uiContainer.addChild(this.jumpMessage);
    }
    else if(type == 2) {//굿 점프
        if(gc.onFx) GD.soundPlay('sound_perfect');
        gc.spineManager.setupPlayAnimate(this.jumpMessage, "t_good", false);
        // gc.spineManager.playAnimate(this.jumpMessage, "t_good", false);
        this.uiContainer.addChild(this.jumpMessage);
    }
    else if(type == 3) {//피버
        if(gc.onFx) GD.soundPlay('sound_fevertext');
        gc.spineManager.setupPlayAnimate(this.jumpMessage, "t_fever", false);
        // gc.spineManager.playAnimate(this.jumpMessage, "t_fever", false);
        this.uiContainer.addChild(this.jumpMessage);
    }
};

//게임 상태 메세지 이펙트
gc.GameScene.prototype.onStateMessage = function (type) {
    var name = "";
    if(type == 0) name = "t_begin";//처음 시작
    else if(type == 1) name = "t_again";//챕터 시작
    else if(type == 2) name = "t_gameover";//게임오버

    if(!this.messageText) this.messageText = new PIXI.Sprite.fromFrame(name + ".png");
    else this.messageText.texture = PIXI.Texture.fromFrame(name + ".png");

    this.messageText.x = gc.width/2;
    this.messageText.y = gc.height/2;
    this.messageText.alpha = 1;

    //챕터1시작 시
    if(type == 0) {
        gc.cutScene.clearCutScene();
        if(gc.onFx) GD.soundPlay("sound_start");
    }
    else if(type == 1) {//새로운 챕터 시작시
        if(gc.onFx) GD.soundPlay("sound_newtheme");
    }

    //컷씬 터치 이벤트 끄기
    if(type == 0 || type == 1) gc.cutScene.skipBg.interactive = false;

    if(type < 2) {//게임 시작, 새로운 챕터 시작
        this.messageText.anchor.x = 0.5;
        this.messageText.anchor.y = 1;

        var time = 0.4;
        TweenMax.from(this.messageText, time, {ease:Power0.easeNone, y:this.messageText.y + 40, alpha:0});
        time = 0.3;
        new em.bumpToY(this.messageText, time, 0.1, returnMessage.bind(this));
    }
    else if(type == 2) {//게임오버
        this.messageText.anchor.set(0.5);
        new em.bumpFromToX(this.messageText, 0.3, 0, 1.1, 1, returnMessage.bind(this));
    }

    //이펙트가 끝난 후 리턴 함수
    function returnMessage() {
        if(type < 2) {
            TweenMax.delayedCall(0.5, (function () {
                TweenMax.to(this.messageText, time, {y:this.messageText.y + 40, alpha:0, onComplete:(function () {
                    removeObject(this.messageText);
                }).bind(this)});
            }).bind(this));
        }
        else if(type == 2) {//게임오버
            this.addResult(0);//네이버 결과 저장
        }
    }

    this.uiContainer.addChild(this.messageText);
};

//특수발판 상황, 암점 상황 메세지
gc.GameScene.prototype.onSpecialMessage = function (type) {
    var name = "";
    if(type == 0) name = "t_lucky";//점프발판
    else if(type == 1) name = "t_watchout";//얼음, 슬라이드발판
    else if(type == 2) name = "t_sodark";//암전

    if(type == 0 || type == 1) {//점프발판, 얼음, 슬라이드 발판
        if (!this.specialMessage) this.specialMessage = new PIXI.Sprite.fromFrame(name + ".png");
        else this.specialMessage.texture = PIXI.Texture.fromFrame(name + ".png");

        if(this.specialEf) this.specialEf.kill();
        this.specialEf = null;

        var time = 0.5;
        if(type == 1 || type == 2) time = 1;
        this.specialMessage.alpha = 1;
        this.specialMessage.anchor.set(0.5);
        this.specialMessage.x = this.myCha.img.x;
        this.specialMessage.y = this.myCha.img.y - 80;

        this.specialEf = TweenMax.to(this.specialMessage, time, {ease:Power0.easeNone, y:this.specialMessage.y-70, alpha:0, onComplete:returnMessage.bind(this)});
        this.uiContainer.addChild(this.specialMessage);
    }
    else if(type == 2) {//암전
        if(!this.blackoutMessage) this.blackoutMessage = new PIXI.Sprite.fromFrame(name + ".png");
        this.blackoutMessage.anchor.set(0.5);
        this.blackoutMessage.alpha = 1;
        this.blackoutMessage.x = gc.width/2;
        this.blackoutMessage.y = gc.height/3;

        new em.bumpFromToX(this.blackoutMessage, 0.3, 0, 1.2, 1, (function () {
            TweenMax.to(this.blackoutMessage, 0.5, {alpha:0, onComplete:(function () {
                removeObject(this.blackoutMessage);
            }).bind(this)});
        }).bind(this));

        this.uiContainer.addChild(this.blackoutMessage);
    }

    //사운드 처리
    if(gc.onFx) {
        if(type == 1) GD.soundPlay('sound_watchout');
        else if(type == 2) GD.soundPlay('sound_dark');
    }

    //이펙트가 끝난 후 리턴 함수
    function returnMessage() {
        removeObject(this.specialMessage);
    }
};

//챕터 완료 확인
gc.GameScene.prototype.checkChapterOver = function () {
    if(gc.progress.nowStep == gc.progress.endStep-1) this.chapterClear = true;//본인이 서있던 발판을 카운트 해야하므로 endstep-1
    else this.chapterClear = false;

    if(this.chapterClear) {
        if(gc.onFx) GD.soundPlay("sound_clear");
        this.obstacle.resetBirds();

        //스테이지별 추가 점수
        this.addChapterClearScore();

        var light = new PIXI.Sprite.fromFrame("light1.png");
        light.anchor.set(0.5);
        light.x = this.portal.x;
        light.y = this.portal.y;
        this.addChild(light);
        var time = 2;
        TweenMax.fromTo(light.scale, time, {x:0, y:0}, {x:30, y:30, onComplete:(function () {//포탈에서 빛 나오기
            //다음 챕터 설정
            gc.chapter++;
            this.setNextChapterScene();
            var con = gc.maps.findContainer(gc.maps.nowFootholdPos.info.step);
            con.center.addChild(this.portal);
            this.portal.x = gc.maps.nowFootholdPos.x;
            this.portal.y = gc.maps.nowFootholdPos.y - 50;

            light.x = this.portal.x;
            light.y = this.portal.y;
            TweenMax.to(light.scale, time/2, {x:0, y:0, onComplete:(function () {//포탈로 빛 들어가기
                removeObject(light);

                //포탈에서 유저 나오기
                var ef = this.onHitEffect();
                ef.x = this.portal.x;
                ef.y = this.portal.y;
                this.playerContainer.addChild(this.myCha.img);
                this.midContainer.addChild(ef);
                TweenMax.from(this.myCha.img.scale, 0.3, {x:0, y:0, onComplete:(function () {
                    TweenMax.to(this.portal.scale, 0.1, {x:0, y:0});
                }).bind(this)});
                //소미 흔들거리다 올라가기
                if(gc.onFx) GD.soundPlay('sound_flap');
                this.startSomiEf = em;
                this.startSomiEf.floatByY(this.somi, 0.5, 20, 3, (function () {
                    gc.somi.disappearSomi();
                    this.startSomiEf.reset();
                    this.startSomiEf = null;
                }).bind(this));
                gc.cutScene.skipBg.interactive = true;
            }).bind(this)})
        }).bind(this)});
    }
    else {
        this.setBackground();//발판 내리기, 다음 발판 생성
    }
};

//다음 챕터 화면으로 갱신
gc.GameScene.prototype.setNextChapterScene = function () {
    this.offUI();
    this.setGameBgImage();//배경 이미지 설정
    gc.somi.resetSomi();
    this.uiContainer.addChild(this.somi);


    this.onSlideFootHold = false;
    gc.maps.sink = false;//테스트용
    gc.maps.resetAllFootHold();
    gc.maps.reset();//발판 초기화
    gc.progress.setEndStep();//스테이지별 스텝 설정
    gc.progress.resetNowStep();//진행바 초기화
    gc.maps.setChapterFloorList();//챕터별 발판 종류, 크기, 방해물 등 설정

    gc.maps.initFootHolds(gc.progress.nowStep, 1, 'basic');
    gc.game.myCha.step = 0;//현재 유저의 스텝 초기화
    this.myCha.status = "stand";
    this.myCha.x = gc.maps.nowFootholdPos.x;
    this.myCha.y = gc.maps.nowFootholdPos.y;
    this.myCha.img.x = this.myCha.x;
    this.myCha.img.y = this.myCha.y;
    this.myCha.jumpDir = 1;
    this.setPlayerStandScale();
    removeObject(this.myCha.img);
};

//--------------------이벤트 활성화
gc.GameScene.prototype.setInteractive = function (bool) {
    this.touchBg.interactive = bool;
    this.soundBtn.interactive = bool;/*네이버 연동 후 활성화 시키기*/
};

//스코어 이펙트 콜백 함수
gc.GameScene.prototype.scoreEfOver = function () {
    var time = 0.3;
    TweenMax.to(this.scoreNumContainer, time, {ease: Power0.easeNone, y: this.scoreText.y});
    TweenMax.to(this.scoreNumContainer.scale, time, {
        ease: Power0.easeNone, x: 1, y: 1, onComplete: (function () {
            removeObject(this.scoreNumContainer);
            this.scoreText.alpha = 1;
        }).bind(this)
    });
};

gc.GameScene.prototype.removeSpineListener = function (obj) {
    obj.state.clearListeners();
};

//게임 끝나고 텍스트 띄우기
gc.GameScene.prototype.onContinue = function () {
    if(!this.t_continue) this.t_continue = new PIXI.Sprite.fromFrame("t_tobe.png");
    this.t_continue.anchor.set(0.5);
    this.t_continue.x = gc.width/2;
    this.t_continue.y = gc.height/2 + 250;
    this.uiContainer.addChild(this.t_continue);
};

//게임 완전 클리어
gc.GameScene.prototype.gameAllClear = function () {
    this.setInteractive(false);

    var light = new PIXI.Sprite.fromFrame("light1.png");
    light.anchor.set(0.5);
    light.x = this.portal.x;
    light.y = this.portal.y;
    this.uiContainer.addChild(light);
    var time = 2;
    //빛 퍼지기
    TweenMax.fromTo(light.scale, time, {x:0, y:0}, {x:30, y:30, onComplete:(function () {
        this.uiContainer.addChild(this.somi);
        GD.bgmStop();
        if(gc.onFx) GD.soundPlay('sound_allclear');
        this.addResult(1);//네이버 결과 저장
    }).bind(this)});

    //소미 애니메이션
    TweenMax.delayedCall(time*0.6, (function () {
        removeObject(light);
        var g = GraphicManager.drawRect(gc.width, gc.height, "0X000000");
        g.alpha = 0.7;
        this.uiContainer.addChild(g);

        gc.maps.cleanContainer();
        gc.spineManager.resetAnimateFull(this.myCha.img);
        removeObject(this.myCha.img);


        //폭죽 터지기
        this.firework.x = gc.width*0.5 + 60;
        this.firework.y = gc.height*0.5 - 250;
        gc.spineManager.setupPlayAnimate(this.firework, "firework", true);
        this.uiContainer.addChild(this.firework);

        this.somi.x = gc.width*0.5;
        this.somi.y = gc.height*0.5 - 150;
        gc.spineManager.setupPlayAnimate(this.somi, "ending", false);
        this.uiContainer.addChild(this.somi);
    }).bind(this));
};

gc.GameScene.prototype.setFlag = function () {
    var spineTimeScale = (gc.pauseGame)?0:1;
    this.myCha.img.state.timeScale = spineTimeScale;
    this.myCha.emo.state.timeScale = spineTimeScale;
    this.somi.state.timeScale = spineTimeScale;
    if(this.portal) this.portal.state.timeScale = spineTimeScale;
    if(this.jumpMessage) this.jumpMessage.state.timeScale = spineTimeScale;
    for(var i=0;i<this.scoreEfBg.length; i++) this.scoreEfBg[i].state.timeScale = spineTimeScale;
    for(var i=0; i<gc.maps.allFootHolds.length; i++) gc.maps.allFootHolds[i].img.state.timeScale = spineTimeScale;
    if(gc.item) {
        if(gc.item.itemImg) gc.item.itemImg.state.timeScale = spineTimeScale;
        if(gc.item.bgEf) gc.item.bgEf.state.timeScale = spineTimeScale;
    }
    this.setInteractive(!gc.pauseGame);
};

gc.GameScene.prototype.addResult = function (resultType) {
    DataManager.gameEnd(this.score, gc.stage);
    resumeResult.bind(this)(this.score,0,0,"DIAMOND",2,2);


/*    GamePocket.Sdk.Ranking.addMyScore(this.score, (function(response) {
        //this.loadingHide();
        if (response.code === GamePocket.Sdk.ResponseCode.SUCCESS) {
            var ranking = response.result;
            //console.log("랭킹을 남긴 사용자 수 : " + ranking.countOfAllUsers);
            //console.log("" + ranking.percentile);
            //console.log("" + ranking.group);
            //console.log("" + ranking.groupIcon);
            //console.log("" + ranking.score);
            resumeResult.bind(this)(this.score,ranking.score,"",ranking.groupIcon,1);
            // this.onResultView(this.score,ranking.score,"",ranking.groupIcon,1);
        } else {
            if(response.code == GamePocket.Sdk.ResponseCode.NOT_FOUND_GAME || response.code == GamePocket.Sdk.ResponseCode.NO_AUTHENTICATION){
                resumeResult.bind(this)(this.score,0,0,"DIAMOND",2,2);
                // this.onResultView(this.score,0,0,"DIAMOND",2,2);
            }else{
                resumeResult.bind(this)(this.score,0,0,"DIAMOND",2,1);
                // this.onResultView(this.score,0,0,"DIAMOND",2,1);
            }
            //console.log(response.code);
        }//fail process
    }).bind(this));*/

    function resumeResult(score, bestScore, rank, group, type, message) {
        if(resultType == 0) {//클리어 실패
            TweenMax.delayedCall(2, (function (score, bestScore, rank, group, type, message) {
                this.onResultView(score, bestScore, rank, group, type, message);
            }).bind(this, score, bestScore, rank, group, type, message));
        }
        else if(resultType == 1) {//게임 클리어
            var touchBg = new PIXI.Sprite();
            touchBg.width = gc.width;
            touchBg.height = gc.height;
            //3초 후 결과 볼 수 있음
            TweenMax.delayedCall(3, (function () {
                touchBg.interactive = true;
            }).bind(this));
            //터치 이벤트 적용
            bm.buttonEvent(touchBg, false, (function (score, bestScore, rank, group, type, message) {
                gc.spineManager.resetAnimateFull(this.firework);
                gc.spineManager.removeSpineListener(this.firework);
                this.onResultView(score, bestScore, rank, group, type, message);
            }).bind(this, score, bestScore, rank, group, type, message));
            this.addChild(touchBg);
        }
    }

    //로컬 테스트용
    // resumeResult.bind(this)(this.score,0,0,"DIAMOND",2, 1);
};

gc.GameScene.prototype.onResultView = function (score, bestScore, rank, group, type, message) {
    gc.chapter = 1;
    //gc.resultView.init(score, bestScore, rank, group, type, message);
    //GD.stage.addChild(gc.resultView);
    // ---------------- 这里是结束的地方 ---------------- //
    //score

    if ( window.parent != null ) {
      window.parent.postMessage({
        cmd: "GameOver",
        msg: {
          score: score, // 如果是星星数，也是这个分数
          level: 0
        }
      }, "*");
    }


  gc.progressType = 0;
};

gc.GameScene.prototype.reset = function () {
    TweenMax.killAll();
    gc.gravity = null;
    gc.maps = null;
    this.progressContainer = null;//진행률 컨테이너
    this.scoreEfBg = [];
    this.chapterClear = true;//처음 발판 생성시 기본 좌표에 생성하기 위함
    this.onWarn = false;//발판이 낮을때 경고 표시여부
    this.fever = false;

    this.removeChildren();
    this.playerContainer.removeChildren();

    if(this.portal) removeObject(this.portal);
    this.portal = null;
    this.myCha = null;

    this.combo = -1;
    this.score = 0;
    this.chargeVolume = 0.3;
    this.jumpStep = 1;//현재 스텝과 다음 스텝의 차이
    this.onSlideFootHold = false;//슬라이드 발판 위에 있는지 여부
    this.initItem = null;//아이템을 생성해야하는지 여부
    this.jumpFhCnt = 0;//점프발판 회수

    this.guideLineCnt = [10, 9, 8, 7, 6];//챕터별 가이드라인이 나올 회수
};

gc.GameScene.prototype.pause = function () {
    gc.pauseGame = true;
    for(var i=0; i<gc.cutScene.cutList.length; i++) {
        gc.cutScene.cutList[i].img.state.timeScale = 0;
    }
    this.setFlag();
    TweenMax.pauseAll();
    // console.log("일시정지");
};

gc.GameScene.prototype.resume = function () {
    gc.pauseGame = false;
    this.setFlag();
    for(var i=0; i<gc.cutScene.cutList.length; i++) {
        gc.cutScene.cutList[i].img.state.timeScale = 1;
    }
    TweenMax.resumeAll();
    // console.log("계속하기");
};

gc.GameScene.prototype.updateTransform = function() {
    try {
        this.checkInJumpWait();
        this.checkOnSlide();
        if(gc.maps) gc.maps.sinkScene();//테스트용 발판 가라앉기
        if(this.obstacle) this.obstacle.flyBird();

        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};
