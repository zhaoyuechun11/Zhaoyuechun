PowerupController = function (game) {
    this.updatecnt = 0;
    this.game = game;
    this.gameState = game.state.states[game.state.current];
    this.utilities = this.gameState.utilities;
};

PowerupController.prototype = {
    powerupsInFront: false,		// boolean that determines whether powerups are positioned in front, or behind vehicles
    positionOffsetEasy: 25,		// distance between vehicle and powerup when difficulty == 0
    positionOffsetHard: 50,		// distance between vehicle and powerup when difficulty == 1

    init: function () {
        if (dm) console.log("- PowerupController.init");
        if (false) {
            this.powerups = this.game.add.group();	// group of powerups used for collision and rendering
            this.tmpPowerup = null;					// temporary storage for powerup operations (to reduce garbage)
            this.cachedPowerups = {};				// hash map of an powerups indexable by key

            this.cachePowerup('bear', "atlas_bb-0", "ani_idle", [
                'bear_ani_1.png',
                'bear_ani_2.png',
                'bear_ani_3.png',
                'bear_ani_4.png',
                'bear_ani_5.png',
                'bear_ani_6.png',
                'bear_ani_7.png',
                'bear_ani_8.png',
                'bear_ani_9.png',
                'bear_ani_10.png',
                'bear_ani_11.png',
                'bear_ani_12.png',
                'bear_ani_13.png'
            ]);
            this.cachePowerup('itemjam', "atlas_bb-0", "ani_idle", ["item_3.png"]);
            this.cachePowerup('blocktw', "atlas_bb-0", "ani_idle", [
                'block_gold_ani_1.png', //"atlas_bb-0"
                'block_gold_ani_2.png',
                'block_gold_ani_3.png',
                'block_gold_ani_4.png',
                'block_gold_ani_5.png',
                'block_gold_ani_6.png',
                'block_gold_ani_7.png',
                'block_gold_ani_8.png',
                'block_gold_ani_9.png'
            ]);
            //this.tmpPowerup.animations.stop('powerup_star_1'); //바로전 생성한 애니메이션에 대해 스톱

            this.gameState.onGameOver.add(this.onGameOver, this); //골인 내랭킹 트로피 연출
            //this.gameState.onMistake.add(this.onMistake, this);
            this.gameState.onVehicleSpawned.add(this.onVehicleSpawned, this);

            this.spawnPowerup_xy('bear', 680, 200);
            this.tmpPowerup.animations.play('ani_idle', 15, false, undefined); //1time
            var bear = this.tmpPowerup;
            this.tmpPowerup.events.onAnimationComplete.add(function () {
                //this.tmpPowerup.animations.frame=13;
                setTimeout(function () { bear.animations.play('ani_idle', 15, false, undefined); //1time
                }, 1000);

            }, this);

            this.spawnPowerup_xy('itemjam', 680, 350);
            this.tmpPowerup.animations.play('ani_idle', 15, true, undefined); //loop

            this.spawnPowerup_xy('blocktw', 680, 400);
            this.tmpPowerup.animations.play('ani_idle', 15, true, undefined); //loop
            //this.tmpPowerup.animations.play('ani_twinkle', 15, false, true); //hide
        }
    },

    //-----------------
    destroy: function () {   //게임재시작1-5
        if (dm) console.log("- PowerupController.destroy");//게임재시작1-4

        this.powerups = null;
        this.tmpPowerup = null;
        this.cachedPowerups = null;
        this.gameState = null;
        this.utilities = null;
        this.game = null;
    },

    // TODO: add support for multiple frame animations for powerups.
    //		 currently, animationData takes in an array of frame names
    cachePowerup: function (powerupKey, atlasName, aniName, aniData) {

        if (dm) console.log("- PowerupController.cachePowerup_Ani(" + powerupKey + ", " + aniData + ")");

        this.tmpPowerup = this.powerups.create(0, 0, atlasName, aniData[0]); //스프라이트생성
        this.tmpPowerup.kill(); //초기화용도,끄기
        var anim = this.tmpPowerup.animations.add(aniName, aniData);         //애니메이션생성

        //rb
        this.game.physics.enable(this.tmpPowerup, Phaser.Physics.ARCADE);
        this.tmpPowerup.body.collideWorldBounds = true;
        this.tmpPowerup.body.bounce.set(1);
        //this.paddle.body.immovable = true;
        //rb

        this.tmpPowerup.body.setSize(anim.currentFrame.sourceSizeW, anim.currentFrame.sourceSizeH);
        this.tmpPowerup.anchor.setTo(0.5, 0.5);
        this.tmpPowerup.initialDifficulty = 0; // necessary to slow down vehicle when 'powerup_slow' powerup is collected
        this.tmpPowerup.outOfBoundsKill = true;
        this.tmpPowerup.inWorld = false;
        this.tmpPowerup.name = powerupKey;
        this.cachedPowerups[powerupKey] = this.tmpPowerup;

    },

    //스폰후 오브젝트에 붙이기
    spawnPowerup: function (powerupKey, vehicleToAttach) {
        if (dm) console.log("- PowerupController.spawnPowerup(" + powerupKey + ", " + vehicleToAttach + ")");

        this.tmpPowerup = this.cachedPowerups[powerupKey];
        // can't have more than one of the same type active at once
        if (!this.tmpPowerup.alive) {
            var offset = vehicleToAttach.body.height / 2;
            //20					//50						//0 or 1
            offset += this.utilities.lerp(this.positionOffsetEasy, this.positionOffsetHard, this.gameState.difficulty);
            if (this.powerupsInFront) offset *= -1;							  //앞위치이면 -y값으로 변경
            this.tmpPowerup.reset(vehicleToAttach.x, vehicleToAttach.y + offset);//난이도에 따라 기본차량y높이+난이도별y
            this.tmpPowerup.body.velocity.y = vehicleToAttach.body.velocity.y; //차량속도를 아이템에 그대로 적용
            this.tmpPowerup.initialDifficulty = this.gameState.difficulty;    //아이템난이도에 저장
        }
    },
    spawnPowerup_xy: function (powerupKey, xpos, ypos) {
        if (dm) console.log("- PowerupController.spawnPowerup_xy(" + powerupKey + ")");

        this.tmpPowerup = this.cachedPowerups[powerupKey];
        if (!this.tmpPowerup.alive) {
            this.tmpPowerup.reset(xpos, ypos);

        }
    },


    //시그날 //해당오브젝트에 맞는 아이템 스폰시도
    onVehicleSpawned: function (vehicle) {
        if (dm) console.log("- PowerupController.onVehicleSpawned(" + vehicle.name + ")");

        switch (vehicle.name) {
            case 'motorcycle_police':
                //if (DEBUG) console.log("Motorcycle spawned - creating CALM POWERUP");
                this.spawnPowerup('powerup_calm', vehicle);
                break;
            case 'car_police':
                //if (DEBUG) console.log("Police Car spawned - creating STAR POWERUP");
                this.spawnPowerup('powerup_star', vehicle);
                break;
            case 'truck':
                //if (DEBUG) console.log("Truck spawned - creating SLOW POWERUP");
                this.spawnPowerup('powerup_slow', vehicle);
                break;
        }
    }
    ,

    onGameOver: function ()//모든파워업0
    {
        if (dm) console.log("- PowerupController.onGameOver");
        // when game is over stop all vehicles
        this.powerups.forEachAlive(this.utilities.zeroVelocity, null); //gameover
    }
    ,

    // onMistake: function () {
    //     if (dm) console.log("- PowerupController.onMistake");
    //     // when game is over stop all vehicles
    //     //this.powerups.forEachAlive(this.utilities.zeroVelocity, null );
    // },

    update: function () {},
    postUpdate: function () {},

//플레이이와 아이템이 오버랩시
//     checkPowerupCollected: function (powerup) {
//         //console.log("- PowerupController.checkPowerupCollected("+powerup.name+")");
//
//         if (this.game.physics.arcade.overlap(this.gameState.playerSprite, powerup))
//         //if(this.game.physics.overlap(this.gameState.playerSprite, powerup))
//         {
//             switch (powerup.name) {
//                 case 'powerup_calm':
//                     this.gameState.calmDown();
//                     break;
//                 case 'powerup_slow':
//                     this.gameState.slowDown();
//                     break;
//                 case 'powerup_star':
//                     this.gameState.starCollected();
//                     break;
//             }
//             powerup.kill();
//         }
//     },
}
;
