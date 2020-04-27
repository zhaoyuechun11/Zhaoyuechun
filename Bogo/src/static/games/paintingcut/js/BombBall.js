'use strict';

function BombBall() {
    this.index = 0;
    this.mySpeed = MG.gameSheetsData["BombBallSpeed"];
    this.isActive = false;
    this.myVelocity = new Phaser.Point();
    this.myBall;
    this.mySpine;
    // this.skillEvent;
    this.speedEvent;
    this.moveDir;
    this.blinkEvent;
    this.shakeEvent;
    this.savePosition = {x:0, y:0};
}

BombBall.prototype.GetBallBody = function () {
    return this.myBall;
};

BombBall.prototype.VisibleBall = function (b) {
    this.myBall.visible = b;
};

BombBall.prototype.Create = function (inx) {
    this.index = inx;
    this.myBall = MG.game.add.sprite(-1000, -1000, "blank");
    this.mySpine = MG.game.add.spine(0, 0, 'enemy_balls');
    this.mySpine.setAnimationByName(0, "bomb_idle", true);
    //this.myBall.addChild(this.mySpine);
    this.myBall.scale.setTo(35);            // 충돌체 scale
    this.mySpine.scale.setTo(0.028);        // 보여지는 spine animation scale
    this.myBall.anchor.setTo(0.5);
};

BombBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    this.myBall.enableBody = true;
};

BombBall.prototype.Create_Events = function () {
    // this.skillEvent = MG.game.time.create(false);
    // this.skillEvent.loop(Phaser.Timer.SECOND * 2, this.Skill, this);
    this.speedEvent = MG.game.time.create(false);
    //this.speedEvent.loop(Phaser.Timer.SECOND * 0.5, this.ConstrainVelocity, this);
    // this.blinkEvent = MG.game.time.create(false);
    // this.blinkEvent.loop(Phaser.Timer.SECOND * 0.25, this.Blink_Mode, this);
    // this.shakeEvent = MG.game.time.create(false);
    // this.shakeEvent.loop(Phaser.Timer.SECOND * 0.001, this.Shake_Playing, this);
};

BombBall.prototype.GetIndex = function () {
    return this.index;
};

BombBall.prototype.ActiveBall = function (_active) {
    // MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    // this.myBall.enableBody = true;
    this.isActive = true;
    this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100));
    this.mySpine.position.setTo(0,0);
    this.myBall.addChild(this.mySpine);
    this.moveDir = MG.game.rnd.integerInRange(1, 2);
    this.SetVelocity(_active);
    // this.skillEvent.start();
};

BombBall.prototype.SetVelocity = function (_move) {
    if(_move) {
        switch(this.moveDir) {
            case 1:
                this.myVelocity.x = this.mySpeed * isUseSlowItem;
                this.myVelocity.y = 0;
                this.myVelocity.x *= -1;
                break;

            case 2:
                this.myVelocity.x = 0;
                this.myVelocity.y = this.mySpeed * isUseSlowItem;
                this.myVelocity.y *= -1;
                break;
        }
        this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y);
        this.myBall.body.bounce.set(1);
        this.speedEvent.start();
    } else {
        this.myVelocity.x = 0;
        this.myVelocity.y = 0;
        this.myBall.body.velocity.setTo(this.myVelocity.x, this.myVelocity.y);
        this.myBall.body.bounce.set(0);
        this.speedEvent.pause();
    }
};

BombBall.prototype.Active_Blink_Mode = function (_active) {
    if(_active) {
        this.blinkEvent.start();
    } else {
        this.blinkEvent.pause();
        this.VisibleBall(true);
    }
};

BombBall.prototype.Blink_Mode = function () {
    this.VisibleBall(this.myBall.visible ? false:true);
};

// BombBall.prototype.Skill = function () {
// console.log("===== Skill Event ======");
// };

BombBall.prototype.Active_Shake_Mode = function (_active) {
    if(_active) {
        this.savePosition.x = this.myBall.position.x;
        this.savePosition.y = this.myBall.position.y;
        this.shakeEvent = MG.game.time.create(false);
        this.shakeEvent.loop(Phaser.Timer.SECOND * 0.001, this.Shake_Playing, this);
        this.shakeEvent.start();
    } else {
        if(this.shakeEvent != undefined) {
            this.shakeEvent.stop();
            //this.myBall.position.setTo(this.savePosition.x, this.savePosition.y);
        }
    }
};

BombBall.prototype.Shake_Playing = function () {
    if(getRandomIntInclusive(0, 3) == 0) {
        this.myBall.position.setTo(this.savePosition.x, this.savePosition.y);
    } else {
        var _rndX = getRandomIntInclusive(-3, 3);
        var _rndY = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + _rndX, this.myBall.position.y + _rndY);
    }
};

BombBall.prototype.ConstrainVelocity = function () {

    if(this.isActive === false) return;

    var angle, currVelocitySqr, vx, vy;

    vx = this.myBall.body.velocity.x;
    vy = this.myBall.body.velocity.y;

    currVelocitySqr = vx * vx + vy * vy;

    // if (currVelocitySqr > this.mySpeed * this.mySpeed) {
    angle = Math.atan2(vy, vx);

    vx = Math.cos(angle) * (this.mySpeed * isUseSlowItem);
    vy = Math.sin(angle) * (this.mySpeed * isUseSlowItem);

    this.myBall.body.velocity.x = vx;
    this.myBall.body.velocity.y = vy;
    // }
};

BombBall.prototype.KillBall = function() {
    // if(isUseHeart)
    // {
    //     ballManager.ShakeCamera();
    //     assetManager.UseHeart();        // 보통은 FigureManager에서 처리해준다.
    // }
    this.Active_Shake_Mode(false);
    this.isActive = false;
    this.speedEvent.stop();
    if(StorageManager.prototype.get('isSfx') && stateManager.IsFeverMode() == false) MG.PlayAudio('se_crash');
    this.myBall.body.velocity.setTo(0, 0);
    this.myBall.body.bounce.set(0);
    this.KillAnimation();
};

BombBall.prototype.KillAnimation = function () {
    this.mySpine.setAnimationByName(0, "bomb_out", false);
    this.mySpine.state.onComplete = function () {
        this.myBall.position.setTo(-1000, -1000);
    }.bind(this)
};