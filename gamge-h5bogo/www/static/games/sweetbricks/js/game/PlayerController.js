var playergame;
var playercursor;
PlayerController = function(game) {
    this.updatecnt=0;
	this.game = game;
	playergame=game;

	this.gameState = game.state.states[game.state.current];
	this.utilities = this.gameState.utilities;
	this.massiveController = this.gameState.massiveController;

};

PlayerController.prototype = {
	// constants
	struggleDuration: 500,	// duration of cop struggle animation (on PC)
	struggleVelocity: 180,	// velocity applied for the duration of cop struggle (on PC)
	moveSpeed: 550, //250,				// X velocity that player vehicle moves when FOLLOW_TOUCH is set to true
	followTouchSpeed: 800,//150,		// X velocity that player vehicle tracks touch point when FOLLOW_TOUCH is set to true
	followTouchDeadZone: 10,	// player vehicle will follow touch location if X distance is less than this value
	roadBounds: {
		min:170, //90,
		max:720-170, //230
	},							// min and max range that player vehicle's 'x' property can have
	
	init: function()
	{
        if(dm) console.log("- PlayerController.init");
        endgameonoff = false;  //게임종료 아님으로 (시간도달,체크배경도달)

        //this.upperbar = this.game.add.sprite(xc, 40, 'game_b', 'start_road_4.png');//상단바
        //this.upperbar.anchor.setTo(0.5,0.5);
        
		//this.game.input.enabled=true;
		//this.applyStruggleTimer = 0;	// timer (in milliseconds) that counts down while cop is truggling
		//this.struggleDirection = 0;		// value that gets multiplied by cop struggle velocity delta (-1 or 1)
		
		//leap 뛰어오르기
		//this.playerLeap = this.game.add.sprite(0, 0, 'sprite_atlas');
        //this.playerLeap = this.game.add.sprite(0, 0, 'game_a', 'my_car_3.png'); //뛸때 애니
		//this.playerLeap.animations.add('player_leap', ['player_leap.png']);
		//this.playerLeap.animations.stop('player_leap');

		// this.playerLeap.reset(
         //    this.massiveController.xLanePositions[1],
         //    this.game.world.height + this.playerLeap.height
        // );
		// this.playerLeap.anchor.setTo(0.5, 0.5);
		// this.playerLeap.kill();
		
		if(this.game.device.desktop)
		{
			this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
			this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.qKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);

            this.aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this.dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

            this.oneKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            this.twoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            this.threeKey = this.game.input.keyboard.addKey(Phaser.Keyboard.THREE);
        }
        //this.gameState.onMistake.add(this.onMistake, this);

        //mistake4 = [0,1,2,3];

        //mistake4 = [0,1,2,3];//실수카운트를 저장, 초기값은 싱글모드
        //mistake4_sort=[0,0,0,0]; //임시데이터 랭크용
        //mistake4_myrank=0;
        //sortMistake4();
        //getMyRank();

        uigame.time.events.loop(Phaser.Timer.QUARTER, this.utilities.updateFxNormal, this);
    },


	destroy: function()
	{//게임재시작1-4
        if(dm) console.log("- PlayerController.destroy");

		this.gameState = null;
		this.utilities = null;
		this.massiveController = null;
		this.attachedVehicle = null;
		this.playerLeap = null;
		
		if(this.game.device.desktop)
		{
			this.leftKey = null;
			this.rightKey = null;
			this.debugKey = null;
		}
		this.game = null;
	},
	update: function()
	{
        // if(this.updatecnt<10) {
        //     console.log("- PlayerController.update "+this.updatecnt);
        //     this.updatecnt+=1;
        // }
		if(!this.gameState.gameBegun)
			return;
		

        if(this.gameState.gameOver)
        {
            // stop player movement when game is over
            //this.attachedVehicle.body.velocity.x = 0;
            return;
        }

        // // process input
        // if(mistaking) {
        //     this.attachedVehicle.body.velocity.x = 0;
        //     return;
        // }

        if(this.game.device.desktop)
        {

            //spaceKey
            //if(this.spaceKey.isDown) {
            //if(Paddle===undefined) return;
            if(game.state.current !== "game") return;

            if(this.qKey.isDown && false){ //잠궈놨음
                //if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
                    this.gameState.onCopyBalls.dispatch();
                    this.gameState.onReleaseBalls.dispatch();
                //}
            }else if(this.dKey.isDown && false){//잠궈놨음
                if(dmCollision===true){
                    dmCollision=false;
                    this.game.debug.reset();
                }else{
                    dmCollision=true;
                }
            }else if(game.input.keyboard.isDown(Phaser.Keyboard.NUMPAD_DECIMAL)){ //개발메뉴
                //ctrl+shift+h//'dev'메뉴//데브메뉴//
                //return; //치트키끄기
                //if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)
                //   &&
                if(game.input.keyboard.isDown(Phaser.Keyboard.CONTROL)) {
                    var stgame = uigame.state.states.game;
                    stgame.uiController.uiDev.visible=true;

                }
                //ctrl+shift+h//'dev'메뉴//데브메뉴//
            }else if(game.input.keyboard.isDown(Phaser.Keyboard.F)){
                //'h'key
                //var stgame = uigame.state.states.game;
                //stgame.uiController.uiDev.visible=true;
                //'h'key
            }
        }
        else {
            if(this.game.input.activePointer.isDown) //터치모드
            {
                    if(this.game.input.activePointer.x < this.game.world.centerX) {
                        //if(uigame.state.states.game.uiController.btnleft.input.isDragged) {
                            //if (reverseMode) this.moveRight(); //리버스모드
                            //else this.moveLeft(); //노말모드
                        //}
                    }
                    else {
                        //if(uigame.state.states.game.uiController.btnright.input.isDragged) {
                            //if (reverseMode) this.moveLeft(); //리버스모드
                            //else this.moveRight(); //노말모드
                        //}
                    }
                //}//follow_touch
            }
            else {
                //this.attachedVehicle.angle = 0;
                //this.attachedVehicle.body.velocity.x = 0;
            }
        }//if(this.game.device.desktop)

	},
			
	postUpdate: function()
	{
        // // if(this.updatecnt<10) {
        // //     console.log("- PlayerController.postUpdate");
        // //     this.updatecnt+=1;
        // // }
        //
        // // restrain player vehicle's x position so it stays within the road
        // if(this.attachedVehicle)
        // {
		 //    //플레이어 이동 범위를 제어한다.
			// if(this.attachedVehicle.x < this.roadBounds.min)
			// 	this.attachedVehicle.x = this.roadBounds.min;
			// else if(this.attachedVehicle.x > this.roadBounds.max)
			// 	this.attachedVehicle.x = this.roadBounds.max;
        // }
        //
        // // handle vehicle-to-vehicle collisions
        // if(!DEBUG) {    this.game.physics.arcade.collide(this.attachedVehicle, //신코드
        //                     this.massiveController.vehicles,
        //                     this.collisionHandler, //==paddleHitBallHandler
        //                     null,
        //                     this
        //             );
        //
        //             //this.game.physics.collide(this.attachedVehicle, //구코드
        //             // this.massiveController.vehicles,
        //             // this.collisionHandler,
        //             // null,
        //             // this);
        //
        //             this.game.physics.arcade.overlap(this.attachedVehicle, //신코드
        //                 this.massiveController.boosters,
        //                 this.overlapHandler, //==paddleHitBallHandler
        //                 null,
        //                 this
        //             );
        // }
	},
	
	collisionHandler: function(attachedVehicle, roadVehicle) //충돌시
	{

	},
     overlapHandler: function(attachedVehicle, roadVehicle) //트리거시 오버랩시 //부스터 오버랩
    {
        if(!mistaking) {

        }
    },
	moveRight: function()
	{
        if(dm) console.log("- PlayerController.moveRight");

		if(//this.applyStruggleTimer === 0 &&
            this.attachedVehicle.x < this.roadBounds.max) {
            this.attachedVehicle.body.velocity.x = this.moveSpeed;
            //인풋회전처리
            if(this.attachedVehicle.angle<0) this.attachedVehicle.angle=0;
            else if(this.attachedVehicle.angle<10) this.attachedVehicle.angle+=2.5;
            else this.attachedVehicle.angle = 10;
            //인풋회전처리
        }
		else {
            this.attachedVehicle.body.velocity.x = 0;
            this.attachedVehicle.angle=0;
        }
	},
	
	moveLeft: function()
	{
        if(dm) console.log("- PlayerController.moveLeft");


		if(//this.applyStruggleTimer === 0 &&
            this.attachedVehicle.x > this.roadBounds.min) {
            this.attachedVehicle.body.velocity.x = -this.moveSpeed;
            //인풋회전처리
            if(this.attachedVehicle.angle>0) this.attachedVehicle.angle=0;
            else if(this.attachedVehicle.angle>-10) this.attachedVehicle.angle-=2.5;
            else this.attachedVehicle.angle = -10;
            //인풋회전처리
        }
		else {
            this.attachedVehicle.body.velocity.x = 0;
            this.attachedVehicle.angle=0;
        }
	},

	attachToVehicle: function(vehicle)//- UIController.onGameBegun이후 한번 호출, motorcycle_police
	{
        if(dm) console.log("- PlayerController.attachToVehicle("+ vehicle.name +")");

		if(this.attachedVehicle)
			this.massiveController.restoreVehicleToCache(this.attachedVehicle);

		//this.attachedVehicle = this.massiveController.cachedVehicles[vehicle.name + '_player'];
		this.attachedVehicle = this.massiveController.cachedVehicles[ vehicle.name];


		this.attachedVehicle.reset(vehicle.x, vehicle.y);
		this.attachedVehicle.lane = vehicle.lane;
		
		this.massiveController.vehicles.bringToTop(this.attachedVehicle);//레이어상위로이동
		
		this.massiveController.restoreVehicleToCache(vehicle);
		vehicle.inputEnabled = false;
		this.playerLeap.kill();
	},
    attachToVehicle_edit: function(vehiclename)//- UIController.onGameBegun이후 한번 호출, motorcycle_police
    {
        if(dm) console.log("- PlayerController.attachToVehicle_new("+ vehiclename +")");
        this.attachedVehicle = this.massiveController.cachedVehicles[ vehiclename];
        this.attachedVehicle.reset(playerx, playery);
        this.attachedVehicle.lane = 1;
        this.massiveController.vehicles.bringToTop(this.attachedVehicle);//레이어상위로이동
    },

    attachToVehicle_edit_fx: function()
    {
        //자동차 사이드 이펙트
        var grp = uigame.add.group();
        this.attachedVehicle.addChild(grp);
        this.attachedVehicle.fxside = grp;
        //옆구리
        var fx1 = uigame.add.sprite(-1, 20, 'game_a', 'booster_eff_2.png');
        fx1.blendMode = Phaser.blendModes.ADD;
        fx1.scale.setTo(0.75,0.75);
        fx1.anchor.setTo(0.5,0.5);
        this.attachedVehicle.fxside.addChild(fx1);
        this.attachedVehicle.fxside.visible=false;

        //앞쪽 헤드 이펙트
        var grp2 = uigame.add.group();
        this.attachedVehicle.addChild(grp2);
        this.attachedVehicle.fxhead = grp2;
        var fx3 = uigame.add.sprite(-1, -50, 'game_a', 'booster_eff_1.png');
        fx3.blendMode = Phaser.blendModes.ADD;
        fx3.scale.setTo(1,1);
        fx3.anchor.setTo(0.5,0.5);
        this.attachedVehicle.fxhead.addChild(fx3);
        //뒤쪽 트레일
        var fx2 = uigame.add.sprite(0, 80, 'game_a', 'booster_eff_3.png');
        //fx2.blendMode = Phaser.blendModes.SCREEN;
        fx2.scale.setTo(1,1);
        fx2.anchor.setTo(0.5,0.5);

        this.attachedVehicle.fxhead.addChild(fx2);
        this.attachedVehicle.fxhead.visible=false;

        //그룹fxnormal
        var grpfxnormal = uigame.add.group();
        this.attachedVehicle.addChild(grpfxnormal);
        this.attachedVehicle.fxnormal = grpfxnormal;
        var fxnormal = uigame.add.sprite(0, 60, 'game_a', 'speed_eff.png');
        //fx2.blendMode = Phaser.blendModes.SCREEN;
        fxnormal.scale.setTo(1,1);
        fxnormal.alpha=0.8;
        fxnormal.anchor.setTo(0.5,0.5);

        this.attachedVehicle.fxnormal.addChild(fxnormal);
        this.attachedVehicle.fxnormal.visible=false;


    },
    beginfxhead: function()
    {
        this.attachedVehicle.fxhead.visible=true;
        //알파등장
        TweenMax.fromTo( this.attachedVehicle.fxhead,
            0.15, //time
            {
                alpha: 1
            }, {
                alpha: 0.5,
                ease: Sine.easeInOut,//ease: Linear.easeNone,
                yoyo:true,
                repeat:-1,
                delay: 0//car1.delay
                //onStart:function () { grp.num123[3].visible=true; },
                //onComplete: function () {}
            }
        );
    },
    beginfxside: function()
    {
        this.attachedVehicle.fxside.visible=true;
        //알파등장
        TweenMax.fromTo( this.attachedVehicle.fxside,
            0.1, //time
            {
                alpha: 1
            }, {
                alpha: 0,
                ease: Sine.easeInOut,//ease: Linear.easeNone,
                //yoyo:true,
                //repeat:1,
                delay: 0//car1.delay
                //onStart:function () { grp.num123[3].visible=true; },
                //onComplete: function () {}
            }
        );
    },
    endfx: function () {
        TweenMax.killTweensOf(this.attachedVehicle.fxhead);
        TweenMax.killTweensOf(this.attachedVehicle.fxside);
        this.attachedVehicle.fxhead.visible=false;
        this.attachedVehicle.fxside.visible=false;

    },
    // beginfxnormal: function()
    // {
    //     this.attachedVehicle.fxnormal.visible=true;
    //     //알파등장
    //     TweenMax.fromTo( this.attachedVehicle.fxnormal,
    //         0.15, //time
    //         {
    //             alpha: 1
    //         }, {
    //             alpha: 0.5,
    //             ease: Sine.easeInOut,//ease: Linear.easeNone,
    //             yoyo:true,
    //             repeat:-1,
    //             delay: 0,//car1.delay
    //             //onStart:function () { grp.num123[3].visible=true; },
    //             onComplete: function () {}
    //         }
    //     );
    // },
    // endfxnormal: function () {
    //     TweenMax.killTweensOf(this.attachedVehicle.fxnormal);
    //     this.attachedVehicle.fxnormal.visible=false;
    // },
    // copStruggle: function(direction)
    // {
    //     if(dm) console.log("- PlayerController.copStruggle("+ direction +")");
    //
		// if(this.attachedVehicle)
		// {
		// 	this.struggleDirection = direction;
		// 	this.attachedVehicle.animations.play(direction < 0 ? 'swerve_right' : 'swerve_left');
		// }
    // },
    // onMistake: function()
    // {
    //
    // },
                              //updateGoalBG: 에서 endgameonoff=true; 해준다( playtime_bias초과시, playtime_all_cur+4초과시)
    updateGoal: function () { //endgameonoff==true일때 PlayerController.update()안에서 업데이트
	    if(this.attachedVehicle.y>-100) {
	        //게임오버되고 연출시, 속도가0으로 되서 나가지 못하는 경우가 발생
            // if (endgameonoff && cars_velocity < cars_velocity_max) {
             //    cars_velocity_max = 800;
            // }
            //this.attachedVehicle.y -= (cars_velocity * 0.07);

            this.attachedVehicle.y -= (cars_velocity_max * 0.07);
        }
	    else {
	        //차량이 위로 -100까지 넘어 이동 완료되면
	        if(!uigame.state.states.game.gameOver) {
                this.attachedVehicle.y = -100;

                //if(bSoundSE) SE_Run.mute = true;

                uigame.state.states.game.endGame(); //한번만 호출하려는 의도(ongameover, 인풋할당) //현재 안사용
            }

        }
    }
};
