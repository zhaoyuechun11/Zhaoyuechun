/**
 * Created by admin on 2018-05-18.
 */
gc.Obstacle = function () {
    PIXI.Container.call(this);

    this.birds = [];
    this.blackout = null;
    this.offLight = false;

    this.blackoutCon = new PIXI.Container();
    this.birdCon = new PIXI.Container();
};

gc.Obstacle.constructor = gc.Obstacle;
gc.Obstacle.prototype = Object.create(PIXI.Container.prototype);

//------------초기화
gc.Obstacle.prototype.initBirdContainer = function () {
    this.birdCon.removeChildren();
    this.resetBirds();

    return this.birdCon;
};
gc.Obstacle.prototype.initBlackoutContainer = function () {
    this.blackoutCon.removeChildren();
    this.offLight = false;

    return this.blackoutCon;
};

//사용할 새 생성
gc.Obstacle.prototype.findBird = function () {
    var i;
    var bird = null;

    for (i = 0; i < this.birds.length; i++) {
        if (!this.birds[i].isWork) {
            bird = this.birds[i];
            this.birds[i].isWork = true;
            break;
        }
    }

    if (!bird) {
        bird = {
            center: new PIXI.Container(),
            img: new PIXI.spine.Spine(GD.loader.resources['bird3'].spineData),
            step:null,
            isWork:true,
            isFly:false
        }

        //히트영역 저장
        var element = bird;
        var img = element.img;
        var bounds = new pixi_spine.core.SkeletonBounds();
        bounds.update(img.skeleton, true);

        var hitboxVertex  = Array.prototype.slice.call(bounds.polygons[0]);
        bird.hitArea = new PIXI.Polygon(hitboxVertex);

        bird.center.addChild(bird.img);

        this.birds.push(bird);
    }
    gc.spineManager.resetAnimateFull(bird.img);

    return bird;
};

//모든 새 초기화
gc.Obstacle.prototype.resetBirds = function () {
    var i = 0;
    for(i=0; i<this.birds.length; i++) {
        this.resetBird(this.birds[i]);
    }
};

//멀리있는 새 초기화
gc.Obstacle.prototype.removeFarBirds = function () {
    for(var i=0; i<this.birds.length; i++) {
        if(this.birds[i].isWork && (gc.game.myCha.step - this.birds[i].step) >=2) {
            this.resetBird(this.birds[i]);
        }
    }
};
//새 한마리씩 없애기
gc.Obstacle.prototype.resetBird = function (bird) {
    bird.img.rotation = 0;
    bird.img.scale.x = 1;
    bird.img.x = 0;
    bird.img.y = 0;
    bird.step = null;
    bird.isWork = false;
    bird.isFly = false;
    bird.center.rotation = 0;
    removeObject(bird.center);
};

//새 날아다니기
gc.Obstacle.prototype.flyBird = function () {
    for(var i=0; i<this.birds.length; i++) {
        if(this.birds[i].isWork && this.birds[i].isFly) {
            var preAngle = this.birds[i].center.rotation;
            this.birds[i].center.rotation += Math.PI/60;//2초에 한바퀴.. 60프레임 기준
            if(this.birds[i].center.rotation >= Math.PI*2) {
                this.birds[i].center.rotation -= Math.PI*2;
            }

            this.birds[i].img.rotation = -this.birds[i].center.rotation;//1초에 한바퀴
            if(this.birds[i].img.rotation < 0) this.birds[i].img.rotation += Math.PI*2;
        }
    }
};

//새와 유저 부딪침 체크
gc.Obstacle.prototype.checkHitWithBird = function () {
    var isCollide = false;

    var bx, by;//새 좌표
    var dx, dy, dist;

    for(var i=0; i<this.birds.length; i++) {
        if(this.birds[i].isWork) {
            var checkBird = checkBirdRotate(this.birds[i]);//해당 새를 충돌 체크할지 여부
            if (checkBird) {
                bx = this.birds[i].img.worldTransform.tx;
                by = this.birds[i].img.worldTransform.ty;
                dx = Math.abs(gc.game.myCha.img.worldTransform.tx - bx);
                dy = Math.abs(gc.game.myCha.img.worldTransform.ty - by);
                dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 70) {
                    isCollide = true;
                    this.birds[i].isFly = false;
                    break;
                }
            }
        }
    }

    //새의 현재 회전 각도를 파악하여 해당 새를 충돌 체크할지 여부
    function checkBirdRotate(bird) {
        var check = false;
        var br = bird.center.rotation;//새 회정 각도
        if(gc.game.myCha.jumpDir == 1) {//오른쪽 방향으로 뛸 때 0~90, 180~270도에서만 충돌
            if(br >0 && br < Math.PI*0.5) check = true;
            else if(br > Math.PI && br < Math.PI*1.5) check = true;
        }
        else {//왼쪽 방향으로 뛸때 90~180, 270~360도에서만 충돌
            if(br >0.5 && br < Math.PI) check = true;
            else if(br > Math.PI*1.5 && br < Math.PI*2) check = true;
        }

        return check;
    }

    return isCollide;
};

//암전
gc.Obstacle.prototype.offGameLight = function () {
    if(!this.blackout) this.blackout = GraphicManager.drawRect(gc.width, gc.height, "0X000000");
    var time = 0.2;
    TweenMax.from(this.blackout, time, {alpha:0});
    this.blackoutCon.addChildAt(this.blackout, 0);
    this.offLight = true;
};

gc.Obstacle.prototype.onGameLight = function () {
    if(this.blackout) removeObject(this.blackout);
    this.offLight = false;
};

gc.Obstacle.prototype.updateTransform = function () {
    try {
        PIXI.Container.prototype.updateTransform.call(this);
    } catch (e) {

    }
};