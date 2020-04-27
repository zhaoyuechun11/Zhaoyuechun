/**
 * Created by admin on 2018-04-05.
 */
gc.Gravity = function () {
    PIXI.Container.call(this);

    this.gravity = 9.8;
    this.chargePow = 0;

    if(this.jumpAngle >= 0) this.jumpAngle -= Math.PI/180;
    this.guideLight = [];
};

gc.Gravity.constructor = gc.Gravity;
gc.Gravity.prototype = Object.create(PIXI.Container.prototype);

gc.Gravity.prototype.addPow = function () {
    var prePow = this.chargePow;
    var limit = 70;
    var addPow = this.setChargeVelocity();

    var result = this.calcJumpResult(this.chargePow);
    if(result.result == "perfect" || result.result == "nice" || result.result == "good") {
        if(gc.chapter == 1) addPow *= 0.5;
        else if(gc.chapter == 2) addPow *= 0.7;
        else if(gc.chapter == 3) addPow *= 0.8;
        else if(gc.chapter == 4) addPow *= 0.9;
    }

    this.chargePow += addPow;

    //일정 파워 이상 충전했을 때 충전 이펙트 보이기
    if(prePow < limit && this.chargePow >= limit) {
        gc.game.onChargeEffect();
    }

    if(this.chargePow >= 1500) this.chargePow = 1500;

    //가이드라인 설정..남은 가이드라인 카운트가 있는 경우
    if(gc.game.guideLineCnt[gc.chapter-1] > 0) {
        var alpha = gc.game.guideLineCnt[gc.chapter-1]*0.1;
        this.setGuideLine(this.chargePow, alpha);
    }
};

//충전되는 속도 조절
gc.Gravity.prototype.setChargeVelocity = function () {
    var velocity = 8;
    if(this.chargePow > 1000) velocity = 8*1.5*1.5*1.5*1.5;
    else if(this.chargePow > 500) velocity = 8*1.5*1.5*1.5;
    else if(this.chargePow > 300) velocity = 8*1.5*1.5;
    else if(this.chargePow > 100) velocity = 8*1.5;
    else velocity = 8;

    return velocity;
};

gc.Gravity.prototype.resetPow = function () {
    this.chargePow = 0;
};

//점프 결과 값 계산
gc.Gravity.prototype.calcJumpResult = function (pow) {
    if(gc.perfect) this.chargePow = gc.maps.footHoldGap;
    var result = null;
    var vx, vy;
    var chargePow = pow||this.chargePow;

    vx = (gc.maps.footHoldGapX) * (chargePow / gc.maps.footHoldGap);
    vx = (gc.game.myCha.jumpDir == 1) ? vx : -vx;
    vy = -(gc.maps.footHoldGapY) * (chargePow / gc.maps.footHoldGap);

    //유저가 도달할 위치
    var px = gc.game.myCha.x + vx;
    var py = gc.game.myCha.y + vy;

    //발판 히트 영역 확인
    var hitClone = gc.maps.nextFootholdPos.info.hitArea.clone();
    var inside = this.checkInside("nextFh", px, py, hitClone);

    //거리 체크할 발판 좌표
    var fhX = gc.maps.nextFootholdPos.x, fhY = gc.maps.nextFootholdPos.y;
    var dist = Math.sqrt((px-fhX)*(px-fhX) + (py-fhY)*(py-fhY));

    if(inside) {//범위내에 올라갔을 때
        //y좌표 수정.. 블럭 가운데 라인에 있게끔하기
        hitClone = gc.maps.nextFootholdPos.info.hitArea.clone();
        if(gc.game.myCha.jumpDir == 1) py = fhY - (px - fhX);
        else py = fhY - (fhX - px);
        dist = Math.sqrt((px-fhX)*(px-fhX) + (py-fhY)*(py-fhY));

        //좌표를 옮긴 후 다시 체크
        inside = this.checkInside("nextFh", px, py, hitClone);
        if(inside) {
            vx = px - gc.game.myCha.x;
            vy = py - gc.game.myCha.y;

            if(dist <= 10) result = "perfect";
            else if(dist <= 25) result = "nice";
            else result = "good";
        }
        else {//좌표를 옮긴 후 발판에서 떨어지는 경우
            result = this.checkFalldown("nextFh", px, py).result;
        }
    }
    else {//범위내에 올라가지 못했을 때
        result = this.checkFalldown("nextFh", px, py).result;
    }

    return {result:result, vx:vx, vy:vy};
};

//발판 줄기와 유저의 목적지 사이 거리.. 유저가 더 가야할 거리
gc.Gravity.prototype.calcSideGapWithPlayer = function (px) {
    var moveDist = 0;

    var fh = gc.maps.nextFootholdPos.info;
    var fhName = gc.maps.fhNames[fh.imgType];
    var imgName = null;
    if(fh.imgType == 0) {//버섯
        imgName = "foothold_side0";
    }
    else if(fh.imgType == 1) {//책
        if(gc.game.myCha.jumpDir == 1) imgName = "foothold"+(fh.skin+1)+"_side1";
        else imgName = "foothold"+(fh.imgType+1)+"_side2";
    }
    else if(fh.imgType == 2) {//컵
        imgName = "foothold_side0";
    }
    else if(fh.imgType == 3) {//모자
        imgName = "foothold_side0";
    }
    else if(fh.imgType == 4) {//트럼프 카드
        if(gc.game.myCha.jumpDir == 1) imgName = "foothold"+(fh.skin+1)+"_side1";
        else imgName = "foothold"+(fh.imgType+1)+"_side2";
    }
    else if(fh.imgType == 100) {//얼음
        if(gc.game.myCha.jumpDir == 1) imgName = "ice_side1";
        else imgName = "ice_side2";
    }
    else if(fh.imgType == 200) {//슬라이드
        if(gc.game.myCha.jumpDir == 1) imgName = "foothold_rail_side1";
        else imgName = "foothold_rail_side2";
    }
    else if(fh.imgType == 300) {//점프
        imgName = "foothold_jump_back2";
    }

    //아틀라스 파일에 있는 이미지 각각의 정보를 통해 정보 가져오기
    var atlasData = GD.loader.resources[fhName].spineAtlas;
    var region = atlasData.findRegion(imgName);
    var fhWidth = region.originalWidth*0.7;
    var gap = Math.abs(fh.img.x - px);//유저와 발판 사이 거리
    if(gap > fhWidth) moveDist = gap- fhWidth;
    if(gc.game.myCha.jumpDir == -1) moveDist *= -1;

    return moveDist;
};

//발판 위에 올라섰는지 확인
gc.Gravity.prototype.checkInside = function (checkFh, px, py, hitClone) {
    var i;
    if(checkFh == "nextFh") {//다음 발판에 올라섰는지 확인
        for(i=0; i<hitClone.points.length; i++) {
            if(i%2 == 0) hitClone.points[i] += gc.maps.nextFootholdPos.x;
            else hitClone.points[i] += gc.maps.nextFootholdPos.y;
        }
    }
    else if(checkFh == "nowFh") {//현재 발판에 올라섰는지 확인
        for(i=0; i<hitClone.points.length; i++) {
            if(i%2 == 0) hitClone.points[i] += gc.maps.nowFootholdPos.x;
            else hitClone.points[i] += gc.maps.nowFootholdPos.y;
        }
    }

    return hitClone.contains(px, py);
};

//떨어지는 경우 분리
gc.Gravity.prototype.checkFalldown = function(checkFh, px, py) {
    var hitClone, danger, dist, fh, result;

    if(checkFh == "nextFh") {fh = gc.maps.nextFootholdPos;}
    else if(checkFh == "nowFh") {fh = gc.maps.nowFootholdPos;}

    hitClone = fh.info.dangerArea.clone();
    danger = this.checkInside(checkFh, px, py, hitClone);
    dist = Math.abs(px - fh.x);//발판과 유저 사이 거리

    if(danger) result = "danger";
    else if(dist > fh.info.fhWidth) result = "too much";
    else {
        if(gc.game.myCha.jumpDir == 1) {
            if (px <= fh.x) result = "weak";
            else result = "too much";
        }
        else {
            if (px <= fh.x) result = "too much";
            else result = "weak";
        }
    }

    return {result:result};
};

//제자리 점프 체크
gc.Gravity.prototype.checkInSameFootHold = function () {
    var result = null;
    var px = gc.game.myCha.x;
    var py = gc.game.myCha.y;

    var hitClone = gc.maps.nowFootholdPos.info.hitArea.clone();
    var inside = this.checkInside("nowFh", px, py, hitClone);

    if(inside) result = "stand";
    else result = this.checkFalldown("nowFh", px, py);

    return result;
};

//점프경로 저장.. 뛸때마다 계산 or 미리 만들어두고 좌표만 조금씩 바꾸기
gc.Gravity.prototype.setGuideLine = function (pow, alpha) {
    this.resetGuideLight();
    var px, py;
    var vx, vy;
    //목적지 좌표 구하기
    px = gc.game.myCha.x;
    py = gc.game.myCha.y;
    var result = this.calcJumpResult(pow);
    vx = Math.abs(result.vx);
    if(gc.game.myCha.jumpDir == -1) vx *= -1;
    vy = result.vy;
    // 벽에 부딪치는 경우 목표 x좌표의 조정
    if(result.result == "weak") vx += this.calcSideGapWithPlayer(px + vx);//유저와 다음발판 줄기 사이의 거리

    var topY = vy - (py - vy)*0.05;
    var upGoalX = 0;
    var upGoalY = topY;
    if(result.result == "too much") upGoalX = vx*0.68;
    else upGoalX = vx*0.6;
    //시작 좌표
    var startUpX = px;
    var startUpY = py;
    if(gc.maps.nowFootholdPos.info.skillType == "jump") startUpY = this.myCha.img.y;
    var startDownX = startUpX + upGoalX;
    var startDownY = startUpY + upGoalY;
    //꼭대기 좌표
    var peakX = startUpX + upGoalX;
    var peakY = startUpY + upGoalY;
    var downGoalX = vx - upGoalX;
    var downGoalY = (topY - vy);
    var isLandingAni = (result.result == "perfect" || result.result == "nice" || result.result == "good");
    if(!isLandingAni){//다음 발판에 올라가지 못함
        if(result.result != "danger") {
            if(result.result == "too much") {
                downGoalY = -(gc.height - peakY);
                downGoalX = vx * 0.5;
            }
        }
    }
    //목표 좌표
    var endX = startDownX + downGoalX;
    var endY = startDownY - downGoalY;

    var onGuide = true;
    if(result.result == "too much") {
        if(gc.game.myCha.jumpDir == 1 && endX <= gc.maps.nextFootholdPos.x) onGuide = false;
        else if(gc.game.myCha.jumpDir == -1 && endX >= gc.maps.nextFootholdPos.x) onGuide = false;
    }

    if (onGuide) {
        var i, i_len;
        //위로 올라갈 때 경로
        var upLine = new PIXI.Graphics();
        upLine.lineStyle(10, 0x0000ff);
        upLine.moveTo(px, py);
        upLine.quadraticCurveTo((startUpX + upGoalX * 0.2), (startUpY + upGoalY * 0.9), peakX, peakY);
        var points = upLine.currentPath.shape.points;
        points = this.setUseGuidePoint(points); //점이 너무 많으니 걸러내기
        //올라가는 가이드 라인
        var light = null;
        for (i = points.length - 1; i > 0; i -= 2) {
            //점 이미지 그리기
            light = null;
            light = this.findGuideLight();
            light.img.texture = PIXI.Texture.fromFrame('guide.png');
            light.img.x = points[i - 1];
            light.img.y = points[i];
            light.img.alpha = alpha;
            var childCnt = gc.game.midContainer.children.length;
            gc.game.midContainer.addChildAt(light.img, childCnt-1);
        }

        //내려올 때 경로
        var downLine = new PIXI.Graphics();
        downLine.lineStyle(5, 0x0000ff);
        downLine.moveTo(peakX, peakY);
        downLine.quadraticCurveTo((startDownX + downGoalX * 0.85), (startDownY - downGoalY * 0.1), endX, endY);

        points = downLine.currentPath.shape.points;
        points.splice(0, 2);
        points = this.setUseGuidePoint(points);
        points.push(endX);
        points.push(endY);
        //내려가는 가이드라인
        if(result.result == "too much") i= 2;
        else i = 2;
        for (i, i_len = points.length; i < i_len; i += 2) {
            //점 이미지 그리기
            light = null;
            light = this.findGuideLight();
            light.img.x = points[i];
            light.img.y = points[i + 1];
            light.img.alpha = alpha;
            if(gc.game.myCha.jumpDir == 1) {
                if(light.img.x >= gc.maps.nextFootholdPos.x + gc.maps.nextFootholdPos.info.fhWidth*0.2)
                    gc.game.midContainer.addChildAt(light.img, 0);
                else gc.game.midContainer.addChild(light.img);
            }
            else {
                if(light.img.x >= gc.maps.nextFootholdPos.x - gc.maps.nextFootholdPos.info.fhWidth*0.2)
                    gc.game.midContainer.addChild(light.img);
                else gc.game.midContainer.addChildAt(light.img, 0);
            }
            //빛 이미지 설정
            light.img.texture = PIXI.Texture.fromFrame('guide.png');
        }
        //마지막 빛 이미지 변경
        if(result.result != "too much" && result.result != 'weak') {
            light.img.texture = PIXI.Texture.fromFrame('guide2.png');
        }
    }
};

//사용할 점 리스트 추리기
gc.Gravity.prototype.setUseGuidePoint = function (list) {
    var points = list;
    var dist = 0;

    for(var i=points.length-2; i>=3; i-=2) {
        for(var j=0; j<i; j+=2) {
            dist = Math.pow((points[i] - points[j]), 2) + Math.pow((points[i+1] - points[j+1]), 2);
            if(dist <= Math.pow(50,2)) {
                points.splice(j, 2);
            }
        }
    }

    return points;
};

//레이어 처리
gc.Gravity.prototype.checkDepth = function(checkX){
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

//가이드라인 이미지 생성
gc.Gravity.prototype.findGuideLight = function () {
    var light = null;

    for(var i=0; i<this.guideLight.length; i++) {
        if(!this.guideLight[i].isWork) {
            light = this.guideLight[i];
            light.isWork = true;
            break;
        }
    }

    if(light === null) {
        this.guideLight.push({img: new PIXI.Sprite.fromFrame("guide.png"), isWork:true});
        this.guideLight[this.guideLight.length-1].img.anchor.x = 0.5;
        this.guideLight[this.guideLight.length-1].img.anchor.y = 1;
        light = this.guideLight[this.guideLight.length-1];
    }

    return light;
};

//가이드라인 이미지 초기화
gc.Gravity.prototype.resetGuideLight = function () {
    for(var i=0; i<this.guideLight.length; i++) {
        removeObject(this.guideLight[i].img);
        this.guideLight[i].isWork = false;
    }
};

gc.Gravity.prototype.reset = function () {
    this.resetPow();
};

gc.Gravity.prototype.updateTransform = function() {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch(e) {

    }
};