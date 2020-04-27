'use strict';

function SplitBall() {
    this.mySpeed = MG.gameSheetsData["SplitBallSpeed"];
    this.kill_animation = [ "split_ball_bomb_spring", "split_ball_bomb_summer", "split_ball_bomb_autumn", "split_ball_bomb_winter" ];
    this.isActive = false;
    this.myVelocity = new Phaser.Point();
    this.myBall;
    this.mySpine;
    // this.skillEvent;
    this.speedEvent;
    this.splitCount = 0;
    this.blinkEvent;
    this.shakeEvent;
    this.savePosition = {x:0, y:0};
}

SplitBall.prototype.GetBallBody = function () {
    return this.myBall;
};

SplitBall.prototype.VisibleBall = function (b) {
    this.myBall.visible = b;
};

SplitBall.prototype.IsVisibleBall = function () {
    return this.myBall.visible;
};

SplitBall.prototype.Create = function () {
    this.myBall = MG.game.add.sprite(-1000, -1000, "blank");
    this.mySpine = MG.game.add.spine(0, 0, 'enemy_balls');
    this.mySpine.setAnimationByName(0, "split_ball_big_idle", true);
    this.SetScale();
    this.mySpine.scale.setTo(0.028);        // 보여지는 spine animation scale
    this.myBall.anchor.setTo(0.5);
};

SplitBall.prototype.Create_Physics = function () {
    MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    this.myBall.enableBody = true;
    this.myBall.body.setSize(1.2, 1);     // 충돌체 크기
};

SplitBall.prototype.Create_Events = function () {
    this.speedEvent = MG.game.time.create(false);
    this.speedEvent.loop(Phaser.Timer.SECOND * 0.5, this.ConstrainVelocity, this);
    // this.blinkEvent = MG.game.time.create(false);
    // this.blinkEvent.loop(Phaser.Timer.SECOND * 0.25, this.Blink_Mode, this);
    // this.shakeEvent = MG.game.time.create(false);
    // this.shakeEvent.loop(Phaser.Timer.SECOND * 0.001, this.Shake_Playing, this);
};

SplitBall.prototype.SetScale = function () {
    switch(this.splitCount)
    {
        case 0:
            this.myBall.scale.setTo(87.5);            // 부모 scale
            break;

        case 1:
            this.myBall.scale.setTo(52.5);
            break;

        case 2:
            this.myBall.scale.setTo(17.5);
            break;
    }
};

SplitBall.prototype.Active_Blink_Mode = function (_active) {
    if(_active) {
        this.blinkEvent.start();
    } else {
        this.blinkEvent.pause();
        this.VisibleBall(true);
    }
};

SplitBall.prototype.Blink_Mode = function () {
    this.VisibleBall(this.myBall.visible ? false:true);
};

SplitBall.prototype.Active_Shake_Mode = function (_active) {
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

SplitBall.prototype.Shake_Playing = function () {
    if(getRandomIntInclusive(0, 3) == 0) {
        this.myBall.position.setTo(this.savePosition.x, this.savePosition.y);
    } else {
        var _rndX = getRandomIntInclusive(-3, 3);
        var _rndY = getRandomIntInclusive(-3, 3);
        this.myBall.position.setTo(this.myBall.position.x + _rndX, this.myBall.position.y + _rndY);
    }
};

SplitBall.prototype.SetSplitCount = function (count) {
    this.splitCount = count;
    this.SetScale();
};

SplitBall.prototype.IsActive = function () {
    return this.isActive;
};

SplitBall.prototype.SetActiveBlooen = function (b) {
    this.isActive = b;
};

SplitBall.prototype.ActiveBall = function (_active) {
    // MG.game.physics.enable(this.myBall, Phaser.Physics.ARCADE);
    // this.myBall.enableBody = true;
    this.isActive = true;
    this.myBall.position.setTo(MG.game.rnd.integerInRange(100, MG.game.world.width - 100), MG.game.rnd.integerInRange(300, MG.game.world.height - 100));
    this.mySpine.position.setTo(0,0);
    this.myBall.addChild(this.mySpine);
   // this.SetVelocity(_active);
    // this.skillEvent.start();
};

SplitBall.prototype.Action_Split = function (_move, _x, _y) {
    this.isActive = true;
    this.myBall.position.setTo(_x, _y);
    this.mySpine.position.setTo(0,0);
    this.myBall.addChild(this.mySpine);
    this.SetVelocity(_move);
};

SplitBall.prototype.SetVelocity = function (_move) {
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




SplitBall.prototype.SetSpritePosition = function (posX, posY) {
    // this.isActive = _view;
    this.myBall.position.setTo(posX, posY);
    // this.mySpine.position.setTo(0,0);
    // this.myBall.addChild(this.mySpine);

};

// SplitBall.prototype.SetRandomVelocity = function (vX, vY) {
//     this.myBall.position.setTo(posX, posY);
// }


// SplitBall.prototype.Skill = function () {
//     if(uiManager.GetCompletePercent() > 25 && this.splitCount === 0)
//     {
//         // 1st
//         this.splitCount++;
//         this.ActiveSplit();
//     }
//     if(uiManager.GetCompletePercent() > 50 && this.splitCount === 1)
//     {
//         // 2nd
//         this.splitCount++;
//         this.ActiveSplit();
//     }
// };

SplitBall.prototype.ConstrainVelocity = function () {
    var angle, vx, vy;//currVelocitySqr

    vx = this.myBall.body.velocity.x;
    vy = this.myBall.body.velocity.y;

    //currVelocitySqr = vx * vx + vy * vy;

    // if (currVelocitySqr > this.mySpeed * this.mySpeed) {
    angle = Math.atan2(vy, vx);

    vx = Math.cos(angle) * (this.mySpeed * isUseSlowItem);
    vy = Math.sin(angle) * (this.mySpeed * isUseSlowItem);

    this.myBall.body.velocity.x = vx;
    this.myBall.body.velocity.y = vy;
    // }
};

SplitBall.prototype.PlayAnimation = function (aniName, isLoop) {
////////////////////////////////////////////TEST/////////////////////////////////////////////////////
    //this.mySpine.setAnimationByName(0, aniName, isLoop);
    //----------------------------------------------------------------------------------
    this.mySpine.setAnimationByName(0, aniName, isLoop);
/////////////////////////////////////////////TEST////////////////////////////////////////////////////
};

// SplitBall.prototype.ActiveSplitAnimation = function () {
//     this.mySpine.setAnimationByName(0, "split_ball_big_out", false);
//     //this.mySpine.state.onComplete = function () {
//         //ballManager.ActiveSplitSkill();
//
//         this.splitCount++;
//         this.SetScale();
//     //};
// };

SplitBall.prototype.ActiveSplitSkill = function () {
    this.splitCount++;
    this.SetScale();
};

SplitBall.prototype.KillBall = function(){
    this.Active_Shake_Mode(false);
    this.isActive = false;
    // this.skillEvent.stop();
    this.speedEvent.stop();
    if(StorageManager.prototype.get('isSfx') && stateManager.IsFeverMode() == false) MG.PlayAudio('se_crash');
    this.myBall.body.velocity.setTo(0, 0);
    this.myBall.body.bounce.set(0);
    this.KillAnimation();
};

SplitBall.prototype.KillAnimation = function () {
    bombEffecter.Start_Bomb_Effect(this.myBall.position.x, this.myBall.position.y);
    MG.game.add.tween(this.myBall).to({ alpha: 0}, 200, Phaser.Easing.Linear.None, true).onComplete.add(function () {
        this.myBall.position.setTo(-1000, -1000);
        this.myBall.alpha = 1;
    }, this);
};