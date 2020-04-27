/*Created by admin on 2018-04-05.*/
gc.Map = function () {
    PIXI.Container.call(this);
    this.allFootHolds = [];//모든 발판
    this.quakeTweeners = [];//흔들리고 있는 발판 리스트
    this.nextfhFloor = 2;//건너가야 할 발판 높이

    //발판 종류 리스트
    this.fhNames = [];
    this.fhNames[0] = "foothold1";//챕터1
    this.fhNames[1] = "foothold2";//챕터2
    this.fhNames[2] = "foothold3";//챕터3
    this.fhNames[3] = "foothold4";//챕터4
    this.fhNames[4] = "foothold5";//챕터4
    this.fhNames[100] = "foothold_ice";
    this.fhNames[200] = "foothold_rail";
    this.fhNames[300] = "foothold_jump";

    this.mapContainers = [];

    this.sink = false;//발판 가라앉기.. 테스트용
};

gc.Map.constructor = gc.Map;
gc.Map.prototype = Object.create(PIXI.Container.prototype);

//최초 본인이 서있을 발판 생성
gc.Map.prototype.init = function () {
    this.allFootHolds = [];//모든 발판
    this.reset();
};

//챕터별 발판 높이, 종류, 방해물 타이밍 설정
gc.Map.prototype.setChapterFloorList = function () {
    var mapSkinTypeList = stageMaker.setStageMapSkinType();//스킨 타입으로 발판 종류 분리.. 챕터별 기본 발판 이미지는 생성할때 구분
    var mapFloorList = stageMaker.setStageMapFloor();
    this.birdTiming = stageMaker.setObstacleBirdTiming();//새 방해물 타이밍 설정
    this.blackoutTiming = stageMaker.setObstacleBlacoutTiming();//새 방해물 타이밍 설정
    this.mapFootholdData = [];
    for(var i=0; i<mapSkinTypeList.length; i++) {
        this.mapFootholdData.push({step:i, skin:mapSkinTypeList[i], floor:mapFloorList[i]});
    }
};

//생성될 발판 정보 변경.. 피버(점프발판)
gc.Map.prototype.changeMapFootHoldData = function (step) {
    var i;
    for(i=0; i<this.mapFootholdData.length; i++) {
        // if(this.mapFootholdData[i].step - step >= 0 && this.mapFootholdData[i].step - step < 5) {
        if(this.mapFootholdData[i].step - step == 0) {
            this.mapFootholdData[i].skin = 301;//속성만 점프발판이고 밟았을 때 이미지가 점프발판으로 바뀌게 하기 위함
        }
        if(this.mapFootholdData[i].step - step > 0 && this.mapFootholdData[i].step - step < 5) {
            if(this.mapFootholdData[i].step != gc.progress.endStep-1) this.mapFootholdData[i].skin = 300;//마지막 발판은 기본 발판
        }
    }
};

//발판 생성
gc.Map.prototype.initFootHolds = function (step, dist, skilltype) {
    var i;
    //챕터별 사용할 발판 선정
    var fhImgType = gc.chapter-1;//발판 이미지 타입

    /*챕터 이미지가 안나왔으므로.*/
    if(fhImgType >= 5) fhImgType = Math.floor(Math.random()*5);

    //아이템 생성 체크
    if(gc.item.checkItemGauge()) {
        if(step != 0 && step != gc.progress.endStep-1) {//첫 발판과 마지막 발판에는 아이템 생성 안됨
            gc.item.reduceCharge();
            var item = gc.item.chooseItem();//아이템 선택
            if(item == "fever") this.changeMapFootHoldData(step);
        }
    }

    //발판 타입 설정
    var fhSkillType = skilltype;//발판 기능 종류(기본, 점프, 얼음, 슬라이드)
    var fhInfo = this.findInitFootHoldInfo(step);

    if(!skilltype) {
        if(fhInfo.skin < 100) fhSkillType = 'basic';
        else if(fhInfo.skin == 100) fhSkillType = 'ice';
        else if(fhInfo.skin == 200) fhSkillType = 'slide';
        else if(fhInfo.skin == 300 || fhInfo.skin == 301) fhSkillType = 'jump';
    }

    if(fhSkillType == "ice") fhImgType = 100;
    else if(fhSkillType == "slide") fhImgType = 200;
    else if(fhSkillType == "jump") fhImgType = 300;
    if(fhInfo.skin == 301) fhImgType = gc.chapter-1;//가짜 점프발판 이미지는 기본 발판 이미지

    //발판의 스킨 타입 설정
    var skinName = ["foothold1_skin", "foothold2_skin", "foothold3_skin"];//스킨 이름
    var pngName = ["foothold1", "foothold2", "foothold3"];//스킨에 따라 이미지 이름 바꿔주기.. 발판 크기(fhWidth) 설정 위함
    var skinIndex = 0;
    if(fhInfo.skin <= 2) skinIndex = fhInfo.skin;

    //발판 높이
    if(this.firstFh) this.nextfhFloor = this.initFootholdInfo.floor;//각 챕터 첫 발판.. 최소 4층
    else this.nextfhFloor = 4 + fhInfo.floor;//최소 4개 + 기본 차 + 추가 차이
    this.initFootholdInfo.floor = this.nextfhFloor;

    //다음 발판 생성 방향 설정.. 같은 방향으로 2번 이상 갔을 때만 방향 전환 가능.
    if(this.sameDirCnt >= 2) this.nextDir = (Math.floor(Math.random()*2) == 0)? 1:-1;
    if(this.preDir == this.nextDir) {
        this.sameDirCnt++;
    }
    else {
        this.sameDirCnt = 0;
        this.preDir = this.nextDir;
    }

    //챕터가 끝나기 전에 점프 발판이 생길 경우 발판이 생성될 좌표가 꼬임.. 미리 현재 좌표를 가장 마지막에 생성된 발판위치로 저장
    if(this.nowFootholdPos.info) {
        if(this.nowFootholdPos.info.step == step) {
            this.setNowFootHoldPos();
        }
    }
    //발판 생성
    var footholds = [];//아래쪽 발판부터 생성
    for(i=0; i<this.nextfhFloor; i++) {
        footholds.push(this.findFootHold(fhImgType, skinName[skinIndex], skinIndex, pngName[skinIndex], fhSkillType, this.nextDir));
        footholds[footholds.length-1].stair = (i == this.nextfhFloor-1)?"top":i;
        footholds[footholds.length-1].step = step;
    }

    //유저가 생성되기 전일 경우
    if(this.firstFh) {
        this.setNowFootHoldPos();
    }

    this.attachFootHold(footholds, dist);

    if(item) {
        var itemImg = gc.item.onItem(item);
        itemImg.x = this.nextFootholdPos.x-40;
        itemImg.y = this.nextFootholdPos.y - 270;

        //캐릭터 이모티콘 타입 설정(아이템 생성).. 이모티콘 상황이 겹칠 경우를 대비하여 설정과 실행을 분리
        if(gc.game.emoType != 1) gc.game.setCharacterEmoType(0);//새, 암전을 미리 체크했으므로 조건 추가
        //아이템 생성될 때 플레이어 이모티콘 이펙트
        // gc.game.onCharacterEmoticon(0);
    }
    //캐릭터 이모티콘 타입 설정(방해발판 생성)
    if(fhSkillType == "ice" || fhSkillType == "slide") gc.game.setCharacterEmoType(1);

    //발판 생성 사운드
    if(gc.onFx) {
        if(!this.firstFh) {
            GD.soundPlay("sound_newblock");
        }
    }
    this.firstFh = false;
};

//생성할 발판 정보 찾기
gc.Map.prototype.findInitFootHoldInfo = function (step) {
    var info = null;
    for(var i=0; i<this.mapFootholdData.length; i++) {
        if(this.mapFootholdData[i].step == step) {
            info = this.mapFootholdData[i];
            break;
        }
    }

    return info;
};

//현재 유저 위치와 다음 발판 사이 거리 계산
gc.Map.prototype.setFootHoldDist = function () {
    if(gc.game.myCha) {
        this.footHoldGapX = Math.abs(gc.game.myCha.x - this.nextFootholdPos.x);
        this.footHoldGapY = Math.abs(gc.game.myCha.y - this.nextFootholdPos.y);
        this.footHoldGap = Math.sqrt(this.footHoldGapX * this.footHoldGapX + this.footHoldGapY * this.footHoldGapY) + this.nextfhFloor * 20;
    }
};

//사용가능한 발판 찾기
gc.Map.prototype.findFootHold = function (imgType, skinName, skinIndex, mainImgName, skillType, dir) {
    var fh = null;
    var size = null;
    for (var i = 0; i < this.allFootHolds.length; i++) {
        size = null;
        if (!this.allFootHolds[i].isWork) {
            if (this.allFootHolds[i].imgType == imgType && this.allFootHolds[i].skillType == skillType) {
                // console.log("기존 발판", i, "imgType", this.fhNames[imgType], "skillType", skillType);
                fh = this.allFootHolds[i];
                size = this.setFootHoldSize(fh.imgType, mainImgName);
                if(size) {
                    fh.fhWidth = size.width;
                    fh.fhHeight = size.height;
                }
                this.setFootHoldSkin(fh, skinName, skinIndex);
                this.setFootHoldPolygons(fh);
                fh.isWork = true;
                fh.dir = dir;
                break;
            }
        }
    }

    if(!fh) fh = this.makeFootHold(imgType, skinName, skinIndex, mainImgName, skillType, dir);
    return fh;
};

//발판 오브젝트 만들기
gc.Map.prototype.makeFootHold = function (imgType, skinName, skinIndex, mainImgName, skillType, dir) {
    // console.log("발판 정보", "imgType", imgType, "skinName", skinName, "png", mainImgName, "skillType", skillType, "dir", dir)
    var size = null;
    var fhWidth, fhHeight;
    if(imgType == 100) {//얼음 발판
        fhWidth = 90;
        fhHeight = 45;
    }
    else if(imgType == 200) {//슬라이드 발판
        fhWidth = 90;
        fhHeight = 45;
    }
    else if(imgType == 300) {//점프 발판
        fhWidth = 90;
        fhHeight = 45;
    }

    var fhName = this.fhNames[imgType];

    //발판 크기 설정
    size = this.setFootHoldSize(imgType, mainImgName);
    if(size) {
        fhWidth = size.width;
        fhHeight = size.height;
    }

    this.allFootHolds.push({
        img: new PIXI.spine.Spine(GD.loader.resources[fhName].spineData),
        imgType: imgType,
        skillType: skillType,
        fhWidth: fhWidth,
        fhHeight :fhHeight,
        dir: dir,
        step: null,
        stair: null,
        isWork: true
    });
    this.setSpineListener(this.allFootHolds[this.allFootHolds.length-1].img);//애니메이션 완료 리스너 설정

    this.setFootHoldSkin(this.allFootHolds[this.allFootHolds.length-1], skinName, skinIndex);
    this.setFootHoldPolygons(this.allFootHolds[this.allFootHolds.length-1]);

    return this.allFootHolds[this.allFootHolds.length-1];
};

//발판 너비 설정
gc.Map.prototype.setFootHoldSize = function (imgType, mainImgName) {
    var w = null, h = null;
    if(imgType != 100 && imgType != 200 && imgType != 300) {
        var fhName = this.fhNames[imgType];
        var atlasData = GD.loader.resources[fhName].spineAtlas;
        var region = atlasData.findRegion(mainImgName);
        w = region.originalWidth * 0.5;
        h = region.originalHeight * 0.5;
        return {width:w, height:h};
    }
    return false;
};

//발판 스킨 설정
gc.Map.prototype.setFootHoldSkin = function (fh, skinName, skinIndex) {
    fh.skin = skinIndex;//스킨 인덱스 저장..벽에 부딪칠 때 더 가야하는 거리 측정 위함
    if(fh.imgType != 100 && fh.imgType != 200 && fh.imgType != 300) {
        var skeleton = fh.img.skeleton;
        skeleton.setSkin(null);
        skeleton.setSkinByName(skinName);
        skeleton.setSlotsToSetupPose();
    }
};

//발판 히트영역 도형 설정
gc.Map.prototype.setFootHoldPolygons = function (fh) {
    if(fh.imgType != 100 && fh.imgType != 200 && fh.imgType != 300) {
        if (fh.hitArea) fh.hitArea = null;
        if (fh.dangerArea) fh.dangerArea = null;
    }

    if(!fh.hitArea && !fh.dangerArea) {
        var img = fh.img;
        var bounds = new pixi_spine.core.SkeletonBounds();
        bounds.update(img.skeleton, true);

        var hitbox1Vertex = Array.prototype.slice.call(bounds.polygons[0]);
        var hitbox2Vertex = Array.prototype.slice.call(bounds.polygons[1]);
        fh.hitArea = new PIXI.Polygon(hitbox1Vertex);
        fh.dangerArea = new PIXI.Polygon(hitbox2Vertex);

        // var g = new PIXI.Graphics();
        // fh.img.addChild(g);
        // g.alpha = 0.5;
        // g.beginFill(0X00FF00);
        // g.drawPolygon(hitbox1Vertex);
        // g.endFill();
        //
        // g.beginFill(0X0000FF);
        // g.drawPolygon(hitbox2Vertex);
        // g.endFill();
    }
};

//현재 발판 위치 저장
gc.Map.prototype.setNowFootHoldPos = function () {
    for(var i=this.allFootHolds.length-1; i>=0; i--) {
        if(this.firstFh && this.allFootHolds[i].stair == "top") {//첫 발판 생성 시
            this.nowFootholdPos = {
                info: this.allFootHolds[i],
                x: this.baseX,
                y: this.allFootHolds[i].img.y
            };
            break;
        }
        else {
            if(gc.game.myCha) {
                if (this.allFootHolds[i].step == gc.game.myCha.step && this.allFootHolds[i].stair == "top") {
                    this.nowFootholdPos = {//실제 이미지 좌표가 아닌 값만 바꿔야 하는 경우기 있기 때문에 x, y 좌표 따로 저장
                        info:this.allFootHolds[i],
                        x: this.allFootHolds[i].img.x,
                        y: this.allFootHolds[i].img.y
                    };
                    break;
                }
            }
        }
    }
};

//발판 내리기
gc.Map.prototype.pullDownFootHolds = function () {
    // console.log("발판 내리기");
    var i;
    var moveTime = 0.35;
    var moveDist = (this.baseY - this.nowFootholdPos.info.fhHeight*3) - this.nowFootholdPos.y;
    gc.game.scrollBackground(moveTime, moveDist);
    this.nowFootholdPos.y -= moveDist;
    var moveList = [];

    //발판 내리기
    for(i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].isWork) {
            this.allFootHolds[i].img.y += moveDist;
            moveList.push(this.allFootHolds[i].img);
        }
    }

    if(gc.game.portal) {
        gc.game.portal.y += moveDist;
        moveList.push(gc.game.portal);
    }

    //유저 내리기
    gc.game.myCha.y += moveDist;
    var pushPlayer = false;//유저를 완전히 내릴지 여부
    var lastjump = (gc.progress.endStep - gc.progress.nowStep == 2) || false;
    if(gc.chapter == 5 && lastjump) pushPlayer = true;//마지막 챕터
    if(this.nowFootholdPos.info.skillType != "jump") pushPlayer = true;
    //피버모드 마지막 발판을 밟았을 경우
    if(this.nowFootholdPos.info.skillType == "jump" && lastjump && gc.game.jumpFhCnt >= 4)
        pushPlayer = true;

    if(pushPlayer) {
        gc.game.myCha.img.y = gc.game.myCha.y;
        moveList.push(gc.game.myCha.img);//점프타입 발판에 올라선 경우 내려가는 애니 없이 바로 이미지 내리기
    }
    else {//점프발판(피버모드)을 뛰고 있는 경우
        var time = 0.15;//점프발판 자동 점프 딜레이 시간
        TweenMax.to(gc.game.myCha.img, time, {y:gc.game.myCha.y - moveDist*(0.3)});
    }

    //새 장애물 내리기
    for(i=0; i<gc.game.obstacle.birds.length; i++) {
        if(gc.game.obstacle.birds[i].isWork) {
            gc.game.obstacle.birds[i].center.y += moveDist;
            moveList.push(gc.game.obstacle.birds[i].center);
        }
    }

    this.setNowFootHoldPos();//유저가 서있는 발판 좌표저장
    if(moveList.length > 0) this.inPulldownFh = true;

    for(i=0; i<moveList.length; i++) {
        TweenMax.from(moveList[i], moveTime, {y:moveList[i].y - moveDist, onComplete:(function (i) {
            if(i == moveList.length-1) {
                this.resetFootHoldsData();//보이지 않는 발판 정보 초기화
                this.removeUnusedFootHolds();//발판을 내리고 나서 쓰이지 않는 발판 제거
                this.inPulldownFh = false;
            }
        }).bind(this, i)});
    }
};

//발판 부착
gc.Map.prototype.attachFootHold = function (fhs, dist) {
    var i;
    var initEf = false;
    var vx = null;
    var con = null;

    for(i=fhs.length-1; i>=0; i--) {//위에서 부터
        fhs[i].img.scale.x = 1;
        if(fhs[i].skillType == "slide") {
            if(fhs[i].dir == 1) fhs[i].img.scale.x = -1;
        }

        vx = (this.nowFootholdPos.info.fhWidth + fhs[i].fhWidth)*(0.8)*dist;
        if(this.initFootholdInfo.dir == -1) vx *= -1;
        if(this.firstFh) vx = 0;

        fhs[i].img.x = this.nowFootholdPos.x + vx;
        fhs[i].img.y = this.baseY - 65*(i);

        //맨 아래 발판 생성시 좌표, 정보 저장
        if(i == 0) {
            this.initFootholdInfo.x = fhs[i].img.x;
            this.initFootholdInfo.dir = fhs[i].dir;
            this.initFootholdInfo.step = fhs[i].step;
        }

        //맨 위 발판 생성시 다음 발판 위치로 저장
        if(fhs[i].stair == "top") {
            this.nextFootholdPos.info = fhs[i];
            this.nextFootholdPos.x = fhs[i].img.x;
            this.nextFootholdPos.y = fhs[i].img.y;
            gc.spineManager.setupPlayAnimate(fhs[i].img, "foothold_basic", true);
        }
        else {
            if(gc.chapter == 2 || gc.chapter == 3 || gc.chapter == 4) {
                if(fhs[i].imgType < 100) {
                    //기둥 줄기 스킨 설정
                    var nameList = ["foothold_side1_skin", "foothold_side2_skin", "foothold_side3_skin"];
                    var skinIndex = Math.floor((fhs.length - (i-1))%3);
                    var skinName = nameList[skinIndex];
                    this.setFootHoldSkin(fhs[i], skinName, skinIndex);
                }
            }

            gc.spineManager.playAnimate(fhs[i].img, "bg_basic", true);
        }
    }
    if(!this.inPulldownFh) this.setNowFootHoldPos();//유저가 서있는 발판 저장
    this.setFootHoldDist();//현재 유저 위치와 도달해야 할 발판 사이 거리

    //생성 이펙트 발생 여부
    for(i=fhs.length-1; i>=0; i--) {
        initEf = this.checkInitEffect(fhs[i]);

        if(initEf) {
            var moveTime = 0.3;
            if(i == 0) {//장애물 발생 설정
                gc.game.setObstacleBird(fhs.length*fhs[i].fhHeight, moveTime);
            }
            TweenMax.delayedCall(0.03*((fhs.length-1) - i), (function (i) {
                TweenMax.from(fhs[i].img, moveTime, {y:fhs[i].img.y + fhs.length*fhs[i].fhHeight, onComplete:(function (i) {
                        this.updateTransform();
                    if(fhs[i].stair == "top") gc.spineManager.playAnimate(fhs[i].img, "foothold_basic2", false);
                    else gc.spineManager.playAnimate(fhs[i].img, "bg_basic2", false);

                    if(i == fhs.length-1) {//발판이 모두 올라온 후 암전 발생 설정
                        gc.game.setObstacleBlackout();
                        gc.game.onCharacterEmoticon();//이모티콘 실행 처리
                    }
                }).bind(this, i)});

                //필요한 컨테이너 찾기
                con = this.findContainer(fhs[i].step);
                con.center.addChildAt(fhs[i].img, 0);//위쪽 발판부터 붙이기
                gc.game.setMidContainer(0);//레이어 설정
            }).bind(this, i));
        }
        else {
            //필요한 컨테이너 찾기
            con = this.findContainer(fhs[i].step);
            con.center.addChildAt(fhs[i].img, 0);//위쪽 발판부터 붙이기
            gc.game.setMidContainer(0);//레이어 설정
        }
    }
};

//화면에 붙일 때 떨어지는 애니 여부
gc.Map.prototype.checkInitEffect = function (target) {
    var onEf = true;
    if(this.firstFh) {
        onEf = false;
    }

    return onEf;
};

//얼음 발판 폭파 타이머
gc.Map.prototype.setQuakeFootHolds = function (step) {
    var i;
    var list = [];
    for(i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].isWork && this.allFootHolds[i].step == step) {
            if(this.allFootHolds[i].skillType == "ice") {
                list.push(this.allFootHolds[i]);
            }
        }
    }

    for(i=0; i<list.length; i++) {
        this.earthquakeFootholds(list[i], list[i].img.x, true);//3초간 발판 흔들기
    }
};

//얼음 흔들림 취소
gc.Map.prototype.stopQuakeFootHold = function (fh) {
    for(var i=0; i<this.quakeTweeners.length; i++) {
        if(this.quakeTweeners[i].fh == fh) {

            this.quakeTweeners[i].tween.kill();
            this.quakeTweeners[i].explodeDelay.kill();
            this.quakeTweeners.splice(i, 1);
            break;
        }
    }
};

//모든 얼음 흔들림 취소
gc.Map.prototype.resetQuakeFootHolds = function () {
    for(var i=0; i<this.quakeTweeners.length; i++) {
        this.quakeTweeners[i].tween.kill();
        this.quakeTweeners[i].explodeDelay.kill();
    }
    this.quakeTweeners = [];
};

//3초간 발판 흔들기.. 0.1초동안 한 방향으로 움직임->30번 움직이면 3초
gc.Map.prototype.earthquakeFootholds = function (fh, xPos, firstQuake) {
    var aimX;

    var tweener = this.findQuakeTween(fh, xPos, firstQuake);
    if(firstQuake) {
        var explodeTime = 3;
        tweener.explodeDelay = TweenMax.delayedCall(explodeTime, (function () {
            gc.spineManager.playAnimate(tweener.fh.img, "foothold_burst", false);
            gc.game.checkPlayerInIceFootHold(tweener.fh.step);
        }).bind(this));
    }
    firstQuake = false;

    if(tweener) {
        if (tweener.cnt % 2 == 0) aimX = tweener.centerX + 0.2 * tweener.cnt;
        else aimX = tweener.centerX - 0.2 * tweener.cnt;

        tweener.tween = TweenMax.to(tweener.fh.img, 0.1, {
            x: aimX, onComplete: (function () {
                tweener.cnt++;
                if(tweener.cnt < 28) this.earthquakeFootholds(tweener.fh, xPos, firstQuake);
                else fh.img.x = xPos;
            }).bind(this)
        });
    }
};

//흔들리고 있는 트위너 찾기
gc.Map.prototype.findQuakeTween = function (fh, xPos, firstQuake) {
    var tween = null;
    for(var i=0; i<this.quakeTweeners.length; i++) {
        if(fh == this.quakeTweeners[i].fh) {
            tween = this.quakeTweeners[i];
            break;
        }
    }

    if(!tween && firstQuake) {
        this.quakeTweeners.push({tween:null, fh:fh, centerX:xPos, cnt:0, explodeDelay:null});
        tween = this.quakeTweeners[this.quakeTweeners.length-1];
    }

    return tween;
};

//유저가 벽에 부딪친 발판 컨테이너 흔들리기
gc.Map.prototype.swingContainer = function (con, step) {
    var center = new PIXI.Sprite();
    var fhs = [], movetime = 0.2, degree = Math.PI/72, startDir, i, tweener;
    //모든 발판 중 흔들려야할 발판 찾기
    for(i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].isWork) {
            if(this.allFootHolds[i].step == step) {
                fhs.push(this.allFootHolds[i].img);
            }
        }
    }
    //기준점 좌표 설정
    center.x = fhs[0].x;
    center.y = gc.height;

    //흔들릴 발판 부모 변경
    for(i=0; i<fhs.length; i++) {
        fhs[i].x = 0;
        fhs[i].y -= gc.height;
        center.addChild(fhs[i]);
    }
    con.center.addChild(center);

    //유저의 진행 방향에 따라 흔들리기 시작 방향 설정
    if(gc.game.myCha.jumpDir == 1) {
        startDir = 1;
        swingRight.bind(this)();
    }
    else {
        startDir = -1;
        swingLeft.bind(this)();
    }

    //오른쪽으로 휘청이기
    function swingRight() {
        tweener = TweenMax.to(center, movetime, {ease:Power0.easeNone, rotation:degree, onComplete:(function () {
            TweenMax.to(center, movetime, {ease:Power0.easeNone, rotation:0, onComplete:(function () {
                if(startDir == -1) reduceDegree.bind(this)();
                if(degree >= Math.PI/720) swingLeft.bind(this)();
            }).bind(this)});
        }).bind(this)});
    }

    //왼쪽으로 휘청이기
    function swingLeft() {
        tweener = TweenMax.to(center, movetime, {ease:Power0.easeNone, rotation:-degree, onComplete:(function () {
            TweenMax.to(center, movetime, {ease:Power0.easeNone, rotation:0, onComplete:(function () {
                if(startDir == 1) reduceDegree.bind(this)();
                if(degree >= Math.PI/720) swingRight.bind(this)();
            }).bind(this)});
        }).bind(this)});
    }

    //흔들리는 정도, 시간 줄이기
    function reduceDegree() {
        if(degree < Math.PI/720) {
            degree = 0;
            tweener.kill();
            tweener = null;
        }
        else {
            degree -= Math.PI/360;
            movetime -= 0.004;
        }
    };
};

//유저가 점프해서 자리에 안착
gc.Map.prototype.jumpIn = function () {
    for(var i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].step == gc.game.myCha.step) {
            if(this.allFootHolds[i].stair == "top") {
                // console.log("유저가 안착한 발판");
                gc.spineManager.playAnimate(this.allFootHolds[i].img, "foothold_basic2", false);
                break;
            }
        }
    }
};

//보이지 않는 발판 정보 초기화
gc.Map.prototype.resetFootHoldsData = function () {
    var i=0;
    var resetList = [];
    for(i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].isWork) {
            //내 스텝보다 발판 스텝이 낮고, 화면 밖에 있는 경우
            if(this.allFootHolds[i].step < gc.game.myCha.step && this.allFootHolds[i].img.y >= gc.height + 300) {
                if(this.allFootHolds[i].skillType == "ice") this.stopQuakeFootHold(this.allFootHolds[i]);//흔들리고 있는 발판 취소
                resetList.push(this.allFootHolds[i]);
            }
        }
    }

    for(i=0; i<resetList.length; i++) {
        resetList[i].isWork = false;
        resetList[i].step = null;
        resetList[i].stair = null;
        resetList[i].dir = null;
    }
};

//폭파된 발판 정보 초기화
gc.Map.prototype.resetIceFootHoldData = function (obj) {
    var i;
    var fh = null;
    for(i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].img == obj) {
            fh = this.allFootHolds[i];
            break;
        }
    }

    if(fh) {
        fh.isWork = false;
        fh.step = null;
        fh.stair = null;
        fh.dir = null;
    }
};

//모든 발판 초기화
gc.Map.prototype.resetAllFootHold = function () {
    for(var i=0; i<this.allFootHolds.length; i++) {
        this.allFootHolds[i].isWork = false;
        this.allFootHolds[i].step = null;
        this.allFootHolds[i].stair = null;
        this.allFootHolds[i].dir = null;
    }
};

//발판 다시 그리기
gc.Map.prototype.removeUnusedFootHolds = function () {
    for(var i=0; i<this.allFootHolds.length; i++) {
        if(!this.allFootHolds[i].isWork) removeObject(this.allFootHolds[i].img);
    }
};

//현재 서있는 발판 찾아서 점프 대기 상태 애니 실행
gc.Map.prototype.waitJumpAnimate = function () {
    for(var i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].isWork) {
            if(this.allFootHolds[i].step == gc.game.myCha.step && this.allFootHolds[i].stair == "top") {
                gc.spineManager.playAnimate(this.allFootHolds[i].img, "foothold_on", false);
                break;
            }
        }
    }
};

//일반 발판 이미지인데 속성이 점프인 발판 이미지 변경
gc.Map.prototype.checkFeverFootHold = function () {
    var changeImg = false;
    var dir = 1, fh, con;
    for(var i=this.allFootHolds.length-1; i>=0; i--) {
        if(this.allFootHolds[i].skillType == "jump") {
            if(this.allFootHolds[i].imgType != 300) {
                removeObject(this.allFootHolds[i].img);
                //점프발판 생성, 기존 이미지 좌표로 위치 설정,
                dir = this.allFootHolds[i].dir;
                fh = this.findFootHold(300, "", 0, "", "jump", dir);
                fh.img.x = this.allFootHolds[i].img.x;
                fh.img.y = this.allFootHolds[i].img.y;
                fh.step = this.allFootHolds[i].step;
                fh.stair = this.allFootHolds[i].stair;
                con = this.findContainer(fh.step);
                con.center.addChildAt(fh.img, 0);//위에서 부터 붙이기
                if(fh.stair == "top") gc.spineManager.playAnimate(fh.img, "foothold_basic2", false);
                else gc.spineManager.playAnimate(fh.img, "bg_basic2", false);

                this.allFootHolds.splice(i, 1);//기존에 있던 발판 정보까지 제거
            }
        }
    }
};

//유저가 점프했던 발판 복구
gc.Map.prototype.jumpAnimate = function () {
    for(var i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].isWork) {
            if(this.allFootHolds[i].step == gc.game.myCha.step && this.allFootHolds[i].stair == "top") {
                // console.log("유저가 뛴 발판");
                if(this.allFootHolds[i].skillType == "jump") gc.spineManager.playAnimate(this.allFootHolds[i].img, "foothold_basic3", false);
                else gc.spineManager.playAnimate(this.allFootHolds[i].img, "foothold_basic2", false);
                break;
            }
        }
    }

};

//점프 취소
gc.Map.prototype.cancelJump = function () {
    for(var i=0; i<this.allFootHolds.length; i++) {
        if(this.allFootHolds[i].isWork) {
            if(this.allFootHolds[i].step == gc.game.myCha.step) {
                gc.spineManager.setupPlayAnimate(this.allFootHolds[i].img, "foothold_basic", true);
            }
        }
    }
};

//발판이 화면 사이드 밖으로 나갔는지 체크
gc.Map.prototype.checkFootHoldsOutofScene = function () {
    // console.log("발판 사이드 아웃 확인");
    this.resetQuakeFootHolds();//흔들림 멈추기
    var i;
    var moveTime = 0.3;
    var maxPos = this.baseX + 440;
    var moveList = [];
    var isOut = false;
    if(this.nextFootholdPos.x < this.baseX || this.nextFootholdPos.x > maxPos) {
        // console.log("발판 사이드로 나갔음");
        isOut = true;
        var outDist = 0;
        if(this.nextFootholdPos.x < this.baseX) {//화면 왼쪽 바깥에 발판이 생겼을 때
            outDist = this.nextFootholdPos.x - this.baseX;
        }
        else if(this.nextFootholdPos.x > maxPos) {//화면 오른쪽 바깥에 발판이 생겼을 때
            outDist = this.nextFootholdPos.x - (maxPos);
        }

        //바뀔 현재 좌표와 다음 발판 좌표 변경
        this.nowFootholdPos.x -= outDist;
        this.nextFootholdPos.x -= outDist;

        //추가점수 텍스트 옮기기
        TweenMax.to(gc.game.comboContainer, moveTime, {x: this.nowFootholdPos.x});
        //특수 이펙트 텍스트 옮기기
        if(gc.game.specialMessage) TweenMax.to(gc.game.specialMessage, moveTime, {x: this.nowFootholdPos.x});

        //발판 옮기기
        for(i=0; i < this.allFootHolds.length; i++) {
            this.allFootHolds[i].img.x -= outDist;
            moveList.push(this.allFootHolds[i].img);
            // TweenMax.to(this.allFootHolds[i].img, moveTime, {x: this.allFootHolds[i].img.x - outDist});
        }
        gc.game.myCha.x -= outDist;
        gc.game.myCha.img.x = gc.game.myCha.x;
        moveList.push(gc.game.myCha.img);

        //아이템 옮기기
        if(gc.item.onItemImg) {
            gc.item.itemImg.x -= outDist;
            moveList.push(gc.item.itemImg);
        }

        //새 장애물이 있는 경우 함께 이동
        for(i=0; i<gc.game.obstacle.birds.length; i++) {
            if(gc.game.obstacle.birds[i].isWork) {
                gc.game.obstacle.birds[i].center.x -= outDist;
                moveList.push(gc.game.obstacle.birds[i].center);
            }
        }
    }

    if(isOut) {
        for(i=0; i<moveList.length; i++) {
            TweenMax.from(moveList[i], moveTime, {x: moveList[i].x + outDist});
        }

        TweenMax.delayedCall(moveTime+0.1, (function () {
            this.setQuakeFootHolds(gc.game.myCha.step);
        }).bind(this));
    }
    else {
        this.setQuakeFootHolds(gc.game.myCha.step);
    }
};

//-----------애니메이션 완료 리스너
gc.Map.prototype.setSpineListener = function (obj) {
    obj.state.addListener({
        complete: (function (t) {
            if(t.animation.name == "foothold_basic2") {//발판 튕기기
                gc.spineManager.playAnimate(obj, "foothold_basic", true);
            }
            else if(t.animation.name == "bg_basic2") {//줄기 발판 튕기기
                gc.spineManager.playAnimate(obj, "bg_basic", true);
            }
            else if(t.animation.name == "bg_basic3") {//줄기 발판 튕기기
                gc.spineManager.playAnimate(obj, "foothold_basic", true);
            }
            else if(t.animation.name == "foothold_burst") {//발판 폭파 애니
                removeObject(obj);
                this.resetIceFootHoldData(obj);
            }
        }).bind(this)
    });
};

//필요한 컨테이너 찾기
gc.Map.prototype.findContainer = function (step) {
    var i;
    var con = null;
    for(i=0; i<this.mapContainers.length; i++) {
        if(this.mapContainers[i].step == parseInt(step) || this.mapContainers[i].center.children.length == 0) {//스텝이 같거나 컨테이너에 차일드가 없을 때
            this.mapContainers[i].step = parseInt(step);
            con = this.mapContainers[i];
            break;
        }
    }

    if(!con) {
        this.mapContainers.push({step:step, center:new PIXI.Container()});
        con = this.mapContainers[this.mapContainers.length-1];
    }
    return con;
};

//컨테이너 초기화
gc.Map.prototype.cleanContainer = function () {
    for(var i=0; i<this.mapContainers.length; i++) {
        this.mapContainers[i].center.removeChildren();
        this.mapContainers[i].step = -1;
    }
};

//리셋
gc.Map.prototype.reset = function () {
    this.cleanContainer();
    this.preDir = 0;
    this.nextDir = 1;
    this.sameDirCnt = 0;
    this.baseX = 140;
    this.baseY = 1160;
    this.nowFootholdPos = {info:null, x:this.baseX, y:this.baseY};//유저가 서있는 발판 좌표
    this.nextFootholdPos = {info:null, x:0, y:0};//건너가야할 발판 좌표
    this.initFootholdInfo = {x:this.baseX, y:this.baseY, dir:1, step:0, floor:4};//생성되는 발판 정보

    this.footHoldGapX = 0;
    this.footHoldGapY = 0;
    this.footHoldGap = 0;//다음 발판까지의 거리..기본 거리*층수

    this.firstFh = true;//각 챕터의 첫번째 발판인지 여부
    this.inPulldownFh = false;//발판 내리는 중
};

//발판 가라앉기
gc.Map.prototype.sinkScene = function () {
    if(!gc.pauseGame) {
        if (this.sink && !this.inPulldownFh) {
            var sink = true;
            if (this.nowFootholdPos.info.skillType == "jump") sink = false;
            if (sink) {
                var i, dist = 0.3;
                //발판 내리기
                for (i = 0; i < this.allFootHolds.length; i++) {
                    if (this.allFootHolds[i].isWork && this.allFootHolds[i].step == gc.game.myCha.step) {
                        this.allFootHolds[i].img.y += dist;
                    }
                }
                this.nowFootholdPos.y += dist;
                // this.nextFootholdPos.y += dist;

                //새 내리기
                if (gc.game.obstacle) {
                    for (i = 0; i < gc.game.obstacle.birds.length; i++) {
                        if(gc.game.obstacle.birds[i].isWork && gc.game.obstacle.birds[i].step == gc.game.myCha.step)
                            gc.game.obstacle.birds[i].center.y += dist;
                    }
                }

                //유저 내리기
                var preChaPos = gc.game.myCha.y;
                gc.game.myCha.y += dist;
                gc.game.myCha.img.y = gc.game.myCha.y;//발판 내려가는 중에는 안내려감
                this.setFootHoldDist();

                //발판이 낮아졌다는 경고 표시
                var warningPos = 1050;
                if(preChaPos <= warningPos && gc.game.myCha.y >= warningPos) {
                    gc.game.onWarning();
                    //플레이어 이모티콘 실행
                    gc.game.resetCharacterEmoticon();
                    gc.game.setCharacterEmoType(1);
                    gc.game.onCharacterEmoticon();
                }

                if (gc.game.myCha.img.y > gc.height) {
                    //게임 오버
                    this.sink = false;
                    gc.game.setInteractive(false);
                    gc.spineManager.setupPlayAnimate(gc.game.myCha.img, 'cha_fail_over2', false);
                    // gameOver();
                }
            }
        }
    }
};

gc.Map.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};