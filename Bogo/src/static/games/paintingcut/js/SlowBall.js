'use strict';

function SlowBall() {
    this.mySpeed = MG.gameSheetsData["SlowBallSpeed"];
    this.kill_animation = [ "slow_ball_bomb_spring", "slow_ball_bomb_summer", "slow_ball_bomb_autumn", "slow_ball_bomb_winter" ];
    this.isActive = false;
    this.myVelocity = new Phaser.Point();
    this.myBall;
    this.mySpine;
    // this.skillEvent;
    this.speedEvent;
    this.blinkEvent;
    this.shakeEvent;
    this.savePosition = {x:0, y:0};
}

SlowBall.prototype.GetBallBody = function () {
    return this.myBall;
};

SlowBall.prototype.VisibleBall = function (b) {
    this.myBall.visible = b;
};

SlowBall.prototype.Create = function () {
    this.myBall = MG.game.add.sprite(-1000, -1000, "blank");
    this.mySpine = MG.game.add.spine(0, 0, 'enemy_balls');
    this.mySpine.setAnimationByName(0, "slow_ball_idle", true);
    this.myBall.scale.setTo(35);            // 충돌체 scale
    this.mySpine.scale.setTo(0.028);        // 보여지는 spine animation scale
    this.myBall.anchor.setTo(0.5);
};

SlowBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    this.myBall.enableBody = true;
    // this.myBall.body.damping = 0;
    // this.myBall.body.mass = 0.1;
};

SlowBall.prototype.Create_Events = function () {
// this.skillEvent = MG.game.time.create(false);
    // this.skillEvent.loop(Phaser.Timer.SECOND * 2, this.Skill, this);
    this.speedEvent = MG.game.time.create(false);
    this.speedEvent.loop(Phaser.Timer.SECOND * 0.5, this.ConstrainVelocity, this);
    // this.blinkEvent = MG.game.time.create(false);
    // this.blinkEvent.loop(Phaser.Timer.SECOND * 0.25, this.Blink_Mode, this);
    // this.shakeEvent = MG.game.time.create(false);
    // this.shakeEvent.loop(Phaser.Timer.SECOND * 0.001, this.Shake_Playing, this);
};

SlowBall.prototype.ActiveBall = function (_active) {
    // MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    // this.myBall.enableBody = true;
    this.isActive = true;
    this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100));
    this.mySpine.position.setTo(0,0);
    this.myBall.addChild(this.mySpine);
    this.SetVelocity(_active);
};

SlowBall.prototype.SetVelocity = function (_move) {
    if(_move) {
        this.myVelocity.x = MG.game.rnd.integerInRange(parseInt((this.mySpeed * isUseSlowItem) * 0.25), parseInt((this.mySpeed * isUseSlowItem) * 0.75));
        this.myVelocity.y = (this.mySpeed * isUseSlowItem) - this.myVelocity.x;
        if (MG.game.rnd.integerInRange(1, 2) === 1) this.myVelocity.x *= -1;
        if (MG.game.rnd.integerInRange(1, 2) === 1) this.myVelocity.y *= -1;
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

SlowBall.prototype.Active_Blink_Mode = function (_active) {
    if(_active) {
        this.blinkEvent.start();
    } else {
        this.blinkEvent.pause();
        this.VisibleBall(true);
    }
};

SlowBall.prototype.Blink_Mode = function () {
    this.VisibleBall(this.myBall.visible ? false:true);
};

// SlowBall.prototype.Skill = function () {
//     console.log("===== Skill Event ======");
// };

SlowBall.prototype.Active_Shake_Mode = function (_active) {
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

SlowBall.prototype.Shake_Playing = function () {
    if(getRandomIntInclusive(0, 3) == 0) {
        this.myBall.position.setTo(this.savePosition.x, this.savePosition.y);
    } else {
        var _rndX = getRandomIntInclusive(-3, 3);
        var _rndY = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + _rndX, this.myBall.position.y + _rndY);
    }
};

SlowBall.prototype.ConstrainVelocity = function () {
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


SlowBall.prototype.KillBall = function(){
    this.Active_Shake_Mode(false);
    this.isActive = false;
    this.speedEvent.stop();
    if(StorageManager.prototype.get('isSfx') && stateManager.IsFeverMode() == false) MG.PlayAudio('se_crash');
    this.myBall.body.velocity.setTo(0, 0);
    this.myBall.body.bounce.set(0);
    this.KillAnimation();
};

SlowBall.prototype.KillAnimation = function () {
    bombEffecter.Start_Bomb_Effect(this.myBall.position.x, this.myBall.position.y);
    MG.game.add.tween(this.myBall).to({ alpha: 0}, 200, Phaser.Easing.Linear.None, true).onComplete.add(function () {
        this.myBall.position.setTo(-1000, -1000);
        this.myBall.alpha = 1;
    }, this);
};