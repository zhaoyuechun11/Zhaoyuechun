'use strict';

function BuffBall() {
    this.index = 0;
    this.mySpeed = MG.gameSheetsData["BuffBallSpeed"];
    this.isActive = false;
    this.myVelocity = new Phaser.Point();
    this.buffType = "";
    this.myBall;
    this.mySpine;
    // this.skillEvent;
    this.speedEvent;
    this.blinkEvent;
    this.shakeEvent;
    this.savePosition = {x:0, y:0};
}

BuffBall.prototype.GetBallBody = function () {
    return this.myBall;
};

BuffBall.prototype.SetBuffType = function (_str) {
    this.buffType = _str;
};

BuffBall.prototype.VisibleBall = function (b) {
    this.myBall.visible = b;
};

BuffBall.prototype.Create = function (inx) {
    this.index = inx;
    this.myBall = MG.game.add.sprite(-1000, -1000, "blank");
    this.mySpine = MG.game.add.spine(0, 0, 'enemy_balls');
    this.mySpine.setAnimationByName(0, "item_box_idle", true);

    this.myBall.scale.setTo(50);            // 충돌체 scale
    this.mySpine.scale.setTo(0.02);        // 보여지는 spine animation scale

    // this.myBall.scale.setTo(1);            // 충돌체 scale
    // this.mySpine.scale.setTo(1);        // 보여지는 spine animation scale
    this.myBall.anchor.setTo(0.5);

};

BuffBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    this.myBall.enableBody = true;

    // this.myBall.body.collideWorldBounds = true;
    // this.myBall.body.onWorldBounds = new Phaser.Signal();
};

BuffBall.prototype.Create_Events = function () {
    // this.skillEvent = MG.game.time.create(false);
    // this.skillEvent.loop(Phaser.Timer.SECOND * 2, this.Skill, this);
    this.speedEvent = MG.game.time.create(false);
    this.speedEvent.loop(Phaser.Timer.SECOND * 0.5, this.ConstrainVelocity, this);
    this.blinkEvent = MG.game.time.create(false);
    // this.shakeEvent = MG.game.time.create(false);
    // this.shakeEvent.loop(Phaser.Timer.SECOND * 0.001, this.Shake_Playing, this);
};

BuffBall.prototype.GetIndex = function () {
    return this.index;
};

BuffBall.prototype.ActiveBall = function () {
    // MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    // this.myBall.enableBody = true;
    this.isActive = true;
    this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100));
    this.mySpine.position.setTo(0,0);
    this.myBall.addChild(this.mySpine);
    this.SetVelocity(false);
    // this.skillEvent.start();
};

// BuffBall.prototype.Active_Blink_Mode = function (_active) {
//     if(_active) {
//         this.Blink_Mode();
//     } else {
//         MG.game.time.events.stop(this.blinkEvent);
//         this.VisibleBall(true);
//     }
// };

BuffBall.prototype.Blink_Mode = function () {
    this.VisibleBall(this.myBall.visible ? false:true);
    this.blinkEvent = MG.game.time.events.add(300, this.Blink_Mode, this);
};

BuffBall.prototype.Active_Shake_Mode = function (_active) {
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

BuffBall.prototype.Shake_Playing = function () {
    if(getRandomIntInclusive(0, 3) == 0) {
        this.myBall.position.setTo(this.savePosition.x, this.savePosition.y);
    } else {
        var _rndX = getRandomIntInclusive(-3, 3);
        var _rndY = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + _rndX, this.myBall.position.y + _rndY);
    }
};

BuffBall.prototype.SetVelocity = function (_move) {
    if(_move) {
        this.myVelocity.x = parseInt((this.mySpeed * isUseSlowItem) * 0.5);
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

// BuffBall.prototype.Skill = function () {
// console.log("===== Skill Event ======");
// };

BuffBall.prototype.ConstrainVelocity = function () {

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


BuffBall.prototype.KillBall = function(isBuff){
    this.Active_Shake_Mode(false);
    this.isActive = false;
    this.speedEvent.stop();
    if(StorageManager.prototype.get('isSfx') && stateManager.IsFeverMode() == false) MG.PlayAudio('se_crash');
    if(isBuff == false) this.myBall.position.setTo(-1000, -1000);
    this.myBall.body.velocity.setTo(0, 0);
    this.myBall.body.bounce.set(0);
    this.myBall.enableBody = false;
    if(isBuff) this.KillAnimation();
};

BuffBall.prototype.KillAnimation = function () {
    // this.buffType = "fever";
    switch(this.buffType)
    {
        case "super":
            isPlaying_SuperItem = true;
            this.mySpine.setAnimationByName(0, "item_box_open_super", false);
            break;

        case "stop":
            this.mySpine.setAnimationByName(0, "item_box_open_stop", false);
            break;

        case "lifeUp":
            this.mySpine.setAnimationByName(0, "item_box_open_life_up", false);
            buffItemManager.ScreenAnimation(true);
            break;

        case "timePlus":
            this.mySpine.setAnimationByName(0, "item_box_open_time_plus", false);
            buffItemManager.ScreenAnimation(true);
            break;

        case "fever":
            //currentScene = "fever";
            this.mySpine.setAnimationByName(0, "item_box_open_fever", false);
            break;
    }

    MG.game.world.bringToTop(this.mySpine);

    this.mySpine.state.onComplete = function () {
        if(this.buffType == "lifeUp" || this.buffType == "timePlus") buffItemManager.ScreenAnimation(false);
        buffItemManager.ActiveBuff(this.buffType);
    }.bind(this)
};
