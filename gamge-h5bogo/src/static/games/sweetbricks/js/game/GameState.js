GameState = function(game) {
	this.updatecnt=0;
	this.game = game;
	this.utilities = new Utilities();
	// only initialize once (high score counter)
	this.maxDistance = 0;
	// ensure collisions always register, even if objects overlap by a large number of pixels
	this.game.physics.OVERLAP_BIAS = 99999;

	//지울것
    this.rKey=0;
    this.pKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

    //this.bgmonoff=true;
    //this.music=0;
    //this.pauseonoff=false;
	//지울것



};//GameState = function(game) 생성

GameState.prototype = {
    //변수들 생성
	playerVehicleYOffset: 100,		// attached vehicle distance from center of screen

    init: function () {
        if(dm) console.log("- GameState.init");

    },
	create: function() //-->init-->update
	{ //게임시작2-1, 게임재시작2-1 //인트로 애니전 리소스준비한다.

        if(dm) console.log("- GameState.create");

        //selectBGM("BGM_Game_Nomal", true);
        // if(bSoundBGM){//bSoundSE=false;
        //     BGM_Game_Nomal.mute=false;
        //     BGM_ALL.mute=true;
        // }else{
        //     BGM_Game_Nomal.mute=true;
        //     BGM_ALL.mute=true;
        // }

        //랜덤 생성 1,2,3,4 캐릭터선정
        rndid=uigame.rnd.integerInRange(0, 3); //랜덤(0~3포함)

        //게임 변수들 초기화
        playtime_all = playtime_all_base;
        //playtime_cur= 0; //in GameState.create()//플레이타임
        playtime_all_cur = 0;
        playtime_bias=0;

        curVelocity = VelocityInit;

        //alonemode=false;
        timer20sec=time20secMax;

		this.gameBegun = false;
		this.gameOver = false;			//endGame 1번만 실행하려는 목적인거 같음

        //timeplay = 0;//난이도설정용 누적시간

		this.introCompleted = false;
		//this.onIntroComplete = new Phaser.Signal();
		this.onGameBegin = new Phaser.Signal();
		this.onGameOver = new Phaser.Signal(); //골인 내랭킹 트로피 연출
        //this.onMistake = new Phaser.Signal();
        //this.onMistakeRecover = new Phaser.Signal();
		this.onVehicleSpawned = new Phaser.Signal();
        this.onReleaseBalls = new Phaser.Signal();
        this.onCopyBalls = new Phaser.Signal();
        this.onFinishLevelUI = new  Phaser.Signal();



        this.bgController = this.game.plugins.add(BGController);		// road renders first
        this.massiveController = this.game.plugins.add(MassiveController);	// then vehicles (playerController also depends on this, need to spawn it first)
		this.powerupController = this.game.plugins.add(PowerupController);	// then powerups
		this.playerController = this.game.plugins.add(PlayerController);	// then player
		this.uiController = this.game.plugins.add(UIController);			// then UI

        //ui입력받고 실행하게끔 하려고 여기 주석처리
		//this.playIntroAnimation(); //create시 호출되고 안에서--> gamebegin:실행


		//P key 클릭시 이벤트
		this.pKey.onDown.add( function() {
            	if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
					if (kData.iHeart <= 0){
						return;
					}
                    var stgame = uigame.state.states.game;
                    stgame.uiController.uipause.visible = true;

                    ispausemode = true;                               //메인창-일시정지클릭-->인풋잠금
                    stgame.massiveController.onPauseSaveVelocity(); //속도저장

                    stgame.uiController.uipause.onActivePs();

                    //TweenMax.pauseAll(true, true);//트윈맥스일시정지

                    if (kData.bSoundBGM) {
                        if (stgame.uiController.uipause.dlgbg9.btnsound.icon.visible)
                            stgame.uiController.uipause.dlgbg9.btnsound.icon.visible = false; //사운드켜기 상태표시
                    } else {
                        if (!stgame.uiController.uipause.dlgbg9.btnsound.icon.visible)
                            stgame.uiController.uipause.dlgbg9.btnsound.icon.visible = true; //사운드끄기 상태표시
                    }

                    //키입력시 사운드출력
                    if (kData.bSoundSE) SE_Click.play();
                    //키입력시 사운드출력
                }
			} //func
        );//onDown


	},//create
	
	shutdown: function() {//게임상태제거//게임재시작1-2//
        if(dm) console.log("- GameState.shutdown");

		//this.onIntroComplete.dispose();		this.onIntroComplete = null;
		this.onGameBegin.dispose();			this.onGameBegin = null;
		this.onGameOver.dispose();			this.onGameOver = null;
		//this.onMistake.dispose();           this.onMistake = null;
       // this.onMistakeRecover.dispose();           this.onMistakeRecover = null;
		this.onVehicleSpawned.dispose();	this.onVehicleSpawned = null;
		this.introTween = null;
		this.leapTween = null;
		this.bgController = null;

			//this.massiveController.helpers = null;
		//----매시브제거--------------------------
		this.massiveController = null;

		this.powerupController = null;
		this.playerController = null;
		this.uiController = null;
		this.game.plugins.removeAll();
		this.game = null;
		//this.music = null;
	},
	
	// play intro animation
	playIntroAnimation: function() //create안에서 호출
	{
        this.introDuration = 5000;
		this.blockintro = this.game.add.sprite(this.game.world.width-50, 0, 'atlas_bb-0', 'block_deepblue.png');
        this.introTween = this.game.add.tween(this.blockintro);
        this.introTween.to({y: this.game.world.centerY + 100}, this.introDuration, Phaser.Easing.Quadratic.Out, true);
        this.introTween.onComplete.add(this.introComplete, this);
	    //신호등,카운트다운 등장했던곳
        //차량출발이펙트 등장

        this.gameBegin();
        //cars_velocity=0;
        //this.introTween.onComplete.add(this.introComplete, this);
	},
	
	// wait till player clicks the initial bike before starting the game
	introComplete: function() //playIntroAnimation안에서 호출
	{
        if(dm) console.log("- GameState.introComplete");
		this.introCompleted = true;
        //
		// this.massiveController.initialBike.inputEnabled = true;
		// this.massiveController.initialBike.input.useHandCursor = true;
		//
		// if(DEBUG) {
		// 	this.playLeapAnimation();
		// }
		// else {	this.game.input.onDown.addOnce(this.playLeapAnimation, this);
         //    //키보드 작동 되므로, 트럭을 스폰하려고 하므로 우선껏음
		// 	//this.game.input.keyboard.addCallbacks(this, this.playLeapAnimation);
		// }
		
		//this.onIntroComplete.dispatch(); //다른스테이트들의 함수호출(ui컨트롤러 핑거아이콘 트윈)
	},
	
	// play animation where player jumps from truck to bike
	playLeapAnimation: function() //introComplete안에서 키입력시 호출
	{
        if(dm) console.log("- GameState.playLeapAnimation");

        //err this.game.input.keyboard.addCallbacks(); // clear keyboard callback
        //this.game.input.keyboard.stop(); //키보드먹통
        //키보드먹통해결책
        var keyboard = this.game.input.keyboard;
        keyboard.onDownCallback = keyboard.onUpCallback = keyboard.onPressCallback = null;

		this.game.input.onDown.remove(this.playLeapAnimation, this); // clear mouse callback

		//this.massiveController.introTruck.kill();

		//this.massiveController.spawnVehicle("enemy_car_big_1.png", false, false); //this.massiveController.spawnVehicle('truck', false, false);

		//this.massiveController.tmpVehicle.reset(this.massiveController.introTruck.x, this.massiveController.introTruck.y);
		//this.massiveController.introTruck = this.massiveController.tmpVehicle;

		//this.playerController.playerLeap.reset(this.game.world.centerX, this.game.world.centerY + (this.truckYOffset - 20));
		//this.leapTween.start();
	},

	//시작UI가 있으서 거기에서 처리 this.uiStartLevel = CreateUIStartLevel();
    gameBegin: function() //playIntroAnimation안에서 호출
	{
        if(dm) console.log("- GameState.beginGame");


		if(!this.gameBegun)
		{
			this.gameBegun = true;

			uimode = uimodeset.ingame;

            //if(bSoundSE) SE_Run.mute = false;//자동차음켜기
            //else SE_Run.mute = true; //자동차음끄기

            this.onGameBegin.dispatch();
            //timeplay = 0;//난이도설정용 누적시간

            timer20sec=alonemode?9:time20secMax;

            //출발시 카메라흔들림,이펙트 호출
            //uigame.camera.shake(0.005, 500);//카메라 흔들림
            //uigame.state.states.game.playerController.beginfxside();
            //if(bSoundSE) SE_Accel.play();              //차 가속하는 소리            --차가 출발할 때 나오는 효과음, 부딪히거나 미사일 맞은 후 다시 가속 할 때도 출력
            
            //출발가속 이펙트3번
            //setTimeout( function () { uigame.state.states.game.playerController.beginfxside();
            //    },250//500,750
            //);

		}
	},

    mistakeGame: function(){
        if(dm) console.log("- GameState.mistakeGame");

        //this.onMistake.dispatch();
        TweenMax.delayedCall(
            2.5, //tilem //1.5초->에서 2.5초로 변경
            function () {
            }
        );
    },

    gotoResult: function () { //랭킹결과창으로 가기 //인게임에서 게임종료시(일시정시중 나가는 경우도 포함되니 주의)
        uigame.state.states.menu.uifind.visible=false;
        uimode = uimodeset.result;
        uigame.state.states.menu.uiresult.onRefreshResult();
        this.game.state.start('menu');
    },

    //한번만 호출하려는 의도(onGameOver), 인풋입력할당도, 사운드끄기
	endGame: function() //PlayerController.updateGoal:에서 호출됨 //플레이어가 y값 -100까지 도달 햇을때
	{
        if(dm) console.log("- GameState.endGame");

		if(this.gameOver) return; //endGame 1번만 실행하려는 목적인거 같음 //업데이트구문 일부 정지시킴

        if(alonemode) { //얼론모드에서 종료시작
            mode20sec=true; //얼론모드에서 종료시작
            timer20sec = 9; //얼론모드에서 종료시작
        }

        //3차수정
        //in onGameOverUI 게임오버창에서 끄고 있으므로
		//2차 수정
        //selectBGM("none", true);
		//1차 소스
        // if(bSoundBGM){//bSoundSE=false;
        //     //BGM_Awards.play();
        //     BGM_Game_Nomal.mute=true;
        //     BGM_ALL.mute=true;
        // }else{
        //     BGM_Game_Nomal.mute=true;
        //     BGM_ALL.mute=true;
        // }

		if(this.distance > this.maxDistance)
		{
			this.highScore = true;
			this.maxDistance = this.distance;
		}
		else
		{
			this.highScore = false;
		}

		this.gameOver = true; //endGame 1번만 실행하려는 목적인거 같음

        this.massiveController.onStopObjAll();//컨티뉴때문에 앞으로
        this.massiveController.onGameOverUI(); //게임오버UI창


		this.onGameOver.dispatch(); //UIController.onGameOver     에서 ui트로피연출
                                    //MassiveController.onGameOver에서 모든차 속도 0로
                                    //PowerupController.onGameOver에서 모든파워업 속도 0로
	},
	
	restartGame: function()
	{ //게임재시작1-1
        if(dm) console.log("- GameState.restartGame");

		this.game.input.onDown.remove(this.restartGame, this); // clear mouse callback
        //err this.game.input.keyboard.addCallbacks(); // clear keyboard callback
        //this.game.input.keyboard.stop(); //키보드 먹통
        //키보드먹통해결책
        var keyboard = this.game.input.keyboard;
        keyboard.onDownCallback = keyboard.onUpCallback = keyboard.onPressCallback = null;

        //this.game.state.start('game'); //<--게임재반복
        this.game.state.start('menu');   //<--게임재반복,메뉴로 가기
	},
	
	slowDown: function()//powerupcontroller에서 오버랩시 호출,update안에서 계속호출
	{
        if(dm) console.log("- GameState.slowDown");

		this.isSlowingDown = true; // don't update difficulty while it's being tweened
		this.slowDownTimer = 0;
		this.slowDownDifficulty = this.difficulty;
	},
	
	// calmDown: function()//powerupcontroller에서 오버랩시 호출,update안에서 계속호출
	// {
     //    if(dm) console.log("- GameState.calmDown");
    //
	// 	this.struggleDifficulty -= this.struggleDifficultyDampen;
	// 	if(this.struggleDifficulty < 0) this.struggleDifficulty = 0;
	// 	// cancel / reset struggle
	// 	this.uiController.cancelStruggle();
	// 	this.struggleTimer = 0;
	// },
	
	starCollected: function()//powerupcontroller에서 오버랩시 호출,update안에서 계속호출
	{
		// TODO: Implement
        if(dm) console.log("- GameState.starCollected");
	},
	
	update: function()
	{

		if(this.gameOver) //게임오버이후 처리
		{
			cars_velocity = 0;
			return;
		}


        if(true) { //게임시작이후 처리
		//if(this.gameBegun) { //게임시작이후 처리
            // increase distance score
            this._elapsedSeconds = this.game.time.elapsed / 1000; //tick-->sec //시간

            if (endgameonoff) {  //게임종료(시간도달,체크배경도달)
                //속도0
            }





        }//if(this.gameBegun)
	},//update



	

};//GameState.prototype

Object.defineProperty(GameState.prototype, "playerSprite", {

    get: function () {
        return this.playerController.attachedVehicle;
    }

});
//('preloader', LoadState, true);
//('menu',      MenuState);
//('game',      GameState);