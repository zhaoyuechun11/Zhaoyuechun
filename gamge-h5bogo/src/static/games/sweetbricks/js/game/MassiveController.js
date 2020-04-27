MassiveController = function (game) {
    this.spawncnt = 0;
    this.updatecnt = 0;
    this.game = game;
    this.h = game.height;
    this.gameState = game.state.states[game.state.current];
    this.utilities = this.gameState.utilities;


    //bb---------------------------------------------------------------<<생성

        this.targetxy = {x:0, y:0},
        this.RedorGreen;
        this.prev,//
        this.last,//ball.body.position;
        this.dirc,//같은 방향
        this.dirr,//반전


        this.mskl,
        this.mskr,
        this.mskllen,
        this.mskrlen,
        this.msklmax,
        this.mskrmax,
        this.mskloff,
        this.mskroff,
        this.mskldir,
        this.mskrdir,

        this._mskx, //업데이트용 변수
        this._msky,
        this._mxobj,
        this._mski,

        this._i=0,//i,j,k, ijk
        this._j=0,
        this._k=0,
        this._m=0,
        this._n=0,
        this._o=0,
        this._p=0,
        this._pos,
        this._ai=0,
        this._aj=0,

        this._tmptile=0;
        this._tmpcolor=0;
        //this._tmptile_y=0;

        this._ri=0, //릴리즈할때 사용
        this._rk=0,

        this._xa=0, //폭발공 아이템 사용시
        this._xb=0,
        this._ya=0,
        this._yb=0,
        this._cntliving=0,

        this.ball,
        this.paddle,
        this.paddlePosY=1000, //패들 높이값 1120
        this.attrTimer=60, //속성타이머
        this.padatt = PadAttr.normal, //속성ㅊ
        this.padsize = PadSize.normal, //길이
        this.padsizeold = PadSize.normal,
        this.ballstate = BallType.normal_n, //속성 //초기화
        this.tiles = [],
        // this.livesText = 0,
        //this.introText = 0,
        this.introboxcap=0;
        //this.introbox=0;
        //this.scoreText = null,
        this.stageText = null,
        this._sideblk = null,
        this.uiCombo = null,

        this.background = 0,
        this.ballOnPaddle = true, //선언
        this.ballOnPaddleTweening = false, //선언
        //this.ballsize = 1, //0 작음, 1 노말, 2 큼
        //this.lives = 3,//선언
        //this.livesUI = null,
        //this.score = 0,
        //this.intro_fin = false;

        this.navi = null,

        this.DtSec = 0;

        //새로추가된
        //this.currentLevel = 0,
        this.countDownTime = 3,
        this.countDownTimeElapsed = 0,
        this.countDondTick = 1,
        this.isCountDownOff = false,
        this.paddleNerfTime = 6000,
        bbLevel = [],      //113버젼 모든레벨
        bbLevel_coloronly = [],      //113버젼 모든레벨
        this.background = 0,           //배경 그림
        //this.isPaddleNerfed=false,   //isSmall //this.padsize = PadSize.nerf;
        this.bricks = [],              //113버젼 플레이레벨 //지워질예정
        this.brickCount = 0,
        this.bricksWithItems = [], //블록이름만 저장 //dropOneItems: 에서 랜덤아이템제공
        this.dropItemLimit = 5,//4,//3, //5개===0빈것,1네가티브,2,포지티브,3복제공,4,총알
        this.tile1width = 0,
        this.tile1height = 0,
        this.balls = 0,//피직스볼
        this.trails = 0,
        this.ballInitialX = 0,
        this.ballInitialY = 0,
        //this.ballSpeed = 220,
        this.ballMaxVel = 300,

        this.redbeardelaytimer = -1,
        this.redbeardelaymax = 5,

        this.redBearVel=70;
        this.redBears = 0,//적색곰
        this.redbeartimer = -1, //생성
        //this.redbeartimemax = 7,

        this.greenBearVel=70;
        this.greenBears = 0,//녹색곰
        this.greenbeartimer = -1, //생성
        //this.greenbeartimemax = 7,

        this.bounds3 = [],
        this.boundLeftOffsetByPaddle = 0,
        this.boundRightOffsetByPaddle = 0,

        this.fixedballs = [],


        this.bullets,
        this.SHOT_DELAY = 300,//200,                   // milliseconds (10 bullets/second)
        this.BULLET_SPEED = 700,                 // pixels/second
        this.lastBulletShotAt = 0,
        //this.gunpos = [{x: -23, y: -20}, {x: 23, y: -20}],

        this.gunpos = [[31, -20], [66,-20], [107,-20], [146, -20], [188, -20]], //총배치y는 -12
        this.bulletx=this.gunpos[1][0];
        this.bullety=this.gunpos[1][1];
        guntimer = 0,   //초단위로 차감
        //this.guntimeroldbak = 0,
        gunstate = ThreeState.none,
        this.temp_delete_dup_count = 0,

        this.releasetimer = 0,
        this.releasetimemax = 5,//tick

        //this.maxwithoutgold=0;
        //this.curwithoutgold=0;
        this.countgold =0;
        this.countgoldcur =0;

        //this.ballsCount = 0,

        this.se_brickDeath = 0,
        this.se_powerdown = 0,
        this.se_powerup = 0,
        this.se_recover = 0,
        //새로추가된


        this.defaultTextOptions = {
            font: "20px Arial",
            align: "left",
            fill: "#ffffff"
        },

        this.boldTextOptions = {
            font: "40px Arial",
            fill: "#ffffff",
            align: "center"
        },

        //ending_fin=false;
        //ending_fin_begin=false;
        ending_step=_steps.none; //in massive

        //공발사, 공-패들죽음, 총알죽음, 충돌(총알-블록, 패들-공, 아이템-패들)
        this.helpers = {
            /**
             * Releases ball from the paddle.
             */
            release: function () { //클릭시
                if(dm) console.log('--release--');

                return;
            },

            /**
             * Ball went out of bounds.
             */
            death: function (ball1) { //적곰//녹곰들도 사용중이다 //공이 죽거나 곰이 죽으면 호출

                //현재볼1을 죽이고, 남은 갯수==0이면 게임오버
                if(dm) console.log("-------------------------death():"+ball1.name+", "+ball1.x+", "+ball1.y);
                ball1.kill();
                this.setTrails(); //in death

                
                if (this.balls.countLiving() <= 0) { //공이없어서 패들사망으로-----
                    this.death_Force();
                } //공이없어서 패들사망으로-----
            },

            deathbullet1: function (bullet1) {
                bullet1.kill();
            },

            /**
             * Game over, all lives lost.
             */
            gameOver: function (ball1) {
                ball1.body.velocity.setTo(0, 0);
                //this.introText.text = "Game Over!";
                //this.introText.visible = true;
            },



            /**
             * Callback for when ball collides with Tiles.
             */
            ballCollideWithTile: function (ball, tile) { //볼과타일충돌

                if(dm) console.log("collide "+tile.name);
                //     var a =ball.body.prev;
                //     var b =ball.body.position;
                //     var c =ball.body.preRotation;
                //     var d =ball.body.rotation;
                if (ball.body.velocity.y > 0) {
                    if (ball.body.velocity.y < 845) ball.body.velocity.y += uigame.rnd.integerInRange(-5, 15);
                    else ball.body.velocity.y += uigame.rnd.integerInRange(-15, 5); //최고속일때 줄인다
                } else {
                    if (ball.body.velocity.y > -845) ball.body.velocity.y += uigame.rnd.integerInRange(-15, 5);
                    else ball.body.velocity.y += uigame.rnd.integerInRange(-5, 15); //최고속일때 줄인다
                }

                if(dm) console.log("collide:"+tile.name);
                //죽은속성이면 처리
                if(tile.z_step<0) return;

                //먼저 폭발공처리
                _chk1_SE_Brick_Extinction_F = false;
                _chk2_SE_Brick_Extinction_F = false;
                
                //볼속성 폭발공이때 블록처리
                if(this.ballstate === BallType.bomb_n
                    ||this.ballstate === BallType.bomb_s
                    ||this.ballstate === BallType.bomb_b) {

                    //첫번째 this블록제거-----
                    if(kData.bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴 //1/3차
                    //stgame.massiveController.tiles.bringToTop(tile);//브링투탑

                    //에러감시//에러체크//
                    if(typeof(bbLevel) === 'undefined') console.log("bbLevel == undefined");
                    if(typeof(bbLevel[tile.z_y]) === 'undefined') console.log("bbLevel[] == undefined, "+tile.z_y);
                    if(typeof(bbLevel[tile.z_y][tile.z_x]) === 'undefined') console.log("bbLevel[][] == undefined, "+tile.z_z);
                    //에러감시
                    bbLevel[tile.z_y][tile.z_x]=-1; //타일 속성배열에서 초기화
                    tile.z_step=-1;
                    //하트블록도 태워버린다.
                    tile.animations.play('fire', 25, false, true);

                    tile.body.enable=false;

                    if(modeOption[0]===2 &&tile.z_isheart) {
                        if (kData.userData[curLevel] < modeOption[2]) {
                            if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                            kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                            //kData.iHeart+=1;
                            MainUI.z_shopplus.onRefresh();
                            //하트증가
                        }else{
                            kData.userData[curLevel]=modeOption[2];
                            if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                        }
                        MainUI.z_heartcnt_b.text=kData.userData[curLevel];//보너스모드
                        MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                        if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                    }

                    this.runTweenCombo(1); //폭발공으로 점수

                    //무적이 아니면, 아이템드롭시도
                    if (tile.z_color!==9 && this.bricksWithItems.indexOf(tile.name) > -1) {
                        //this.bricksWithItems.pop(tile.name);
                        if(dm) console.log("this.bricksWithItems.length:"+this.bricksWithItems.length);
                        this.dropOneItems(tile.x, tile.y);
                    }
                    //첫번째 this블록제거-----

                    //x그리드 11개 y그리드 18개
                    
                    //오른쪽,왼쪽용 좌표
                    this._xa = tile.z_x + 1;
                    this._xb = tile.z_x - 1;
                    var masscon = uigame.state.states.game.massiveController;

                    //오른쪽 폭발공주변
                    aroundtile = bbLevel[tile.z_y][this._xa];
                    if (this._xa < 11
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {
                        var delay1a = bbLevel[tile.z_y][this._xa];
                        bbLevel[tile.z_y][this._xa].z_step -= 1;
                        _chk1_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }
                        setTimeout(function () { delay1a.animations.play('fire', 25, false, true);
                        }, 150);
                        setTimeout(function () { masscon.runTweenCombo(1);//폭발공으로 점수
                        }, 150);

                    }

                    //왼쪽 폭발공 주변
                    aroundtile = bbLevel[tile.z_y][this._xb];
                    if (this._xb > -1
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {

                        var delay2a = bbLevel[tile.z_y][this._xb];
                        bbLevel[tile.z_y][this._xb].z_step -= 1;
                        _chk1_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }

                        setTimeout(function () { delay2a.animations.play('fire', 25, false, true);
                            //if(bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                        }, 150);
                        setTimeout(function () { masscon.runTweenCombo(1);//폭발공으로 점수
                        }, 150);
                    }
                    
                    //위쪽 ,아래쪽 좌표
                    this._ya = tile.z_y + 1;
                    this._yb = tile.z_y - 1;
                    //위쪽 폭발공 주변
                    if(this._ya < 18) aroundtile = bbLevel[this._ya][tile.z_x];
                    if (this._ya < 18
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {
                        var delay3a = bbLevel[this._ya][tile.z_x];
                        bbLevel[this._ya][tile.z_x].z_step -= 1;
                        _chk1_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }

                        setTimeout(function () {
                            delay3a.animations.play('fire', 25, false, true);
                            //if(bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                        }, 150);
                        setTimeout(function () {
                            masscon.runTweenCombo(1);//폭발공으로 점수
                        }, 150);
                    }
                    //아래쪽 폭발공주변
                    if(this._yb > -1) aroundtile = bbLevel[this._yb][tile.z_x];
                    if (this._yb > -1
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {
                        var delay4a = bbLevel[this._yb][tile.z_x];
                        bbLevel[this._yb][tile.z_x].z_step -= 1;
                        _chk1_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }

                        setTimeout(function () {
                            delay4a.animations.play('fire', 25, false, true);
                            //if(bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                        }, 150);
                        setTimeout(function () {
                            masscon.runTweenCombo(1);//폭발공으로 점수
                        }, 150);
                    }
                    //--2/3차 폭발사운드처리
                    if(_chk1_SE_Brick_Extinction_F){
                        setTimeout(function () {
                            if(kData.bSoundSE) SE_Brick_Extinction_F_a.play();//블록폭발파괴
                        }, 150);
                    }


                    //대각선-왼 위쪽 폭발공주변
                    if(this._xb > -1 && this._ya < 18) aroundtile = bbLevel[this._ya][this._xb];
                    if (this._xb > -1 && this._ya < 18
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {
                        var delay1 = bbLevel[this._ya][this._xb];
                        bbLevel[this._ya][this._xb].z_step -= 1;
                        _chk2_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }

                        setTimeout(function () {
                            delay1.animations.play('fire', 25, false, true);
                           ////if(bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                        }, 300);
                        setTimeout(function () {
                             masscon.runTweenCombo(1);//폭발공으로 점수
                        }, 300);
                    }
                    //대각선-왼 아래쪽 폭발공주변
                    if(this._xb > -1 && this._yb > -1) aroundtile = bbLevel[this._yb][this._xb];
                    if (this._xb > -1 && this._yb > -1
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {
                        var delay2 = bbLevel[this._yb][this._xb];
                        bbLevel[this._yb][this._xb].z_step -= 1;
                        _chk2_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }

                        setTimeout(function () {
                            delay2.animations.play('fire', 25, false, true);
                           //if(bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                        }, 300);
                        setTimeout(function () {
                             masscon.runTweenCombo(1);//폭발공으로 점수
                         }, 300);
                    }
                    //대각선-오른 위쪽 폭발공주변
                    if(this._xa < 11 && this._ya < 18) aroundtile = bbLevel[this._ya][this._xa];
                    if (this._xa < 11 && this._ya < 18
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {
                        var delay3 = bbLevel[this._ya][this._xa];
                        bbLevel[this._ya][this._xa].z_step -= 1;
                        _chk2_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];//보너스모드 별 모두
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }

                        setTimeout(function () {
                            delay3.animations.play('fire', 25, false, true);
                           //if(bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                        }, 300);
                        setTimeout(function () {
                             masscon.runTweenCombo(1);//폭발공으로 점수
                        }, 300);
                    }
                    //대각선-오른 아래쪽 폭발공주변
                    if(this._xa < 11 && this._yb > -1) aroundtile = bbLevel[this._yb][this._xa];
                    if (this._xa < 11 && this._yb > -1
                        && aroundtile !== -1 && aroundtile.alive && aroundtile.z_step >= 0
                    ) {
                        var delay4 = bbLevel[this._yb][this._xa];
                        bbLevel[this._yb][this._xa].z_step -= 1;
                        _chk2_SE_Brick_Extinction_F=true;

                        if(modeOption[0]===2 && aroundtile.z_isheart) {
                            if (kData.userData[curLevel] < modeOption[2]) {
                                if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                //kData.iHeart+=1;
                                MainUI.z_shopplus.onRefresh();
                            }else{
                                kData.userData[curLevel]=modeOption[2];
                                if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                            }
                            MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                            MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                            if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                        }

                        setTimeout(function () {
                            delay4.animations.play('fire', 25, false, true);
                            //if(bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                        }, 300);
                        setTimeout(function () {
                            masscon.runTweenCombo(1);//폭발공으로 점수
                        }, 300);
                    }
                    //--3/3차 폭발사운드처리
                    if(_chk2_SE_Brick_Extinction_F){
                         setTimeout(function () {
                            if(kData.bSoundSE) SE_Brick_Extinction_F_b.play();//블록폭발파괴
                        }, 300);
                    }
                    //폭발공처리 BallType.bomb_n BallType.bomb_s BallType.bomb_b
                }else if(tile.z_color===9) {
                    //무적타일처리
                    //무적타일반짝이기                     //'block_gold.png'//무적//레벨21번(인덱스20) 무적
                    tile.animations.play('show0', 15, false, undefined); //1time
                    // this.runTweenCombo(ScoreGold0, tile.x, tile.y, 1); //무적타일 번쩍거림
                    if(kData.bSoundSE) SE_InvincibleBrick_Blow.play();//무적블록
                }else if(tile.z_color===8) {
                    //'block_choco_3.png'//하드//레벨11번(인덱스10)
                    //초코릿타일 벗기기
                    switch (tile.z_step) {
                        case 2:
                            tile.animations.play('show0', 15, false, undefined); //1time
                            tile.z_step = 1;
                            if(kData.bSoundSE) SE_BrickShell_Remove.play();//초코블록
                            //타일점수text올라가기
                            // this.runTweenCombo(ScoreBcHP2, tile.x, tile.y, 1); //초코블록 점수2
                            break;

                        case 1:
                            tile.animations.play('show1', 15, false, undefined); //1time
                            tile.z_step = 0;
                            if(kData.bSoundSE) SE_BrickShell_Remove.play();//초코블록
                            //타일점수text올라가기
                            // this.runTweenCombo(ScoreBcHP1, tile.x, tile.y, 1); //초코블록 점수1
                            break;

                        case 0:
                            tile.z_step = -1;
                            var stgame = uigame.state.states.game;
                            stgame.massiveController.tiles.bringToTop(tile);//레이어상위로이동
                            bbLevel[tile.z_y][tile.z_x]=-1;
                            //tile.animations.play('kill', 25, false, true); //1time //kill
                            tile.animations.play('kill_choco', 25, false, true); //1time //kill //초코
                            tile.body.enable=false;

                            if(modeOption[0]===2 &&tile.z_isheart) {
                                if (kData.userData[curLevel] < modeOption[2]) {
                                    if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                    kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                    //kData.iHeart+=1;
                                    MainUI.z_shopplus.onRefresh();
                                }else{
                                    kData.userData[curLevel]=modeOption[2];
                                    if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                                }
                                MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                                MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                                if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                            }

                            if(kData.bSoundSE) SE_Brick_Extinction.play();//블록파괴
                            //아이템이 있으면 아이템드롭
                            if (this.bricksWithItems.indexOf(tile.name) > -1) {
                                //this.bricksWithItems.pop(tile.name);
                                if(dm) console.log("this.bricksWithItems.length:"+this.bricksWithItems.length);
                                this.dropOneItems(tile.x, tile.y);
                            }
                            //타일점수text올라가기
                            this.runTweenCombo(1); //초코블록 점수0

                            break;
                    }
                }else {
                    //일반블록처리//타일점수text올라가기
                    this.runTweenCombo(1); //일반블록 점수

                    if(modeOption[0]===2 &&tile.z_isheart) {
                        if (kData.userData[curLevel] < modeOption[2]) {
                            if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                            kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                            //kData.iHeart+=1;
                            MainUI.z_shopplus.onRefresh();
                        }else{
                            kData.userData[curLevel]=modeOption[2];
                            if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                        }
                        MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                        MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                        if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                    }

                    //일반블록이 아이템있으면
                    //아이템떨어뜨리기
                    tile.z_step = -1;
                    if (this.bricksWithItems.indexOf(tile.name) > -1) {//아이템할당 타일이름이면
                        //this.bricksWithItems.pop(tile.name);
                        if(dm) console.log("this.bricksWithItems.length:"+this.bricksWithItems.length);
                        this.dropOneItems(tile.x, tile.y);
                    }
                    //폭발공은 위쪽에서 처리되고 있어서
                    // if(this.ballstate === BallType.bomb_n
                    // ||this.ballstate === BallType.bomb_s
                    // ||this.ballstate === BallType.bomb_b) {
                    //     bbLevel[tile.z_y][tile.z_x]=-1;
                    //     tile.animations.play('fire', 25, false, true);
                    //     tile.body.enable=false;
                    //
                    //     if(bSoundSE) SE_Brick_Extinction.play();//블록파괴
                    // }else {
                        var stgame = uigame.state.states.game;
                        stgame.massiveController.tiles.bringToTop(tile);//레이어상위로이동


                        //에러감시//에러체크//
                        //if(typeof(bbLevel) === 'undefined') console.log("bbLevel == undefined");
                        //if(typeof(bbLevel[tile.z_y]) === 'undefined') console.log("bbLevel[] == undefined, "+tile.z_y);
                        //if(typeof(bbLevel[tile.z_y][tile.z_x]) === 'undefined') console.log("bbLevel[][] == undefined, "+tile.z_z);
                        //에러감시

                        bbLevel[tile.z_y][tile.z_x]=-1;
                        if(tile.z_isheart){
                            tile.animations.play('kill_heart', 25, false, true);//일반블록중하트
                        }else {
                            tile.animations.play('kill', 25, false, true); //1time //kill
                        }
                        tile.body.enable=false;


                        if(kData.bSoundSE) SE_Brick_Extinction.play();//블록파괴
                    //} //폭발공이면 처리
                    //tile.kill();

                    //this.curwithoutgold-=1;
                    if(dm) console.log("this.tiles.countLiving(): " + this.tiles.countLiving());

                }
                this.debugTiles();
            },

            bulletCollideWithTile: function (bullet, tile) { //오리지날추가 함수
                if(dm) console.log("coll bullet:" + bullet.name + ", tile:" + tile.name);

                if (kData.bSoundSE) SE_Click.play();//블록파괴음

                if(tile.z_color===9) { //'block_gold.png'//무적//레벨21번(인덱스20) 무적
                    tile.animations.play('show0', 15, false, undefined); //1time
                    if(kData.bSoundSE) SE_InvincibleBrick_Blow.play();//무적블록
                }else if(tile.z_color===8) { //'block_choco_3.png'//하드//레벨11번(인덱스10)초코블록
                    switch (tile.z_step) {
                        case 2:
                            tile.animations.play('show0', 15, false, undefined); //1time
                            tile.z_step = 1;
                            if(kData.bSoundSE) SE_BrickShell_Remove.play();//초코블록
                            // this.runTweenCombo(ScoreBcHP2, tile.x, tile.y, 1); //총알로 초코블록 파괴2
                            break;
                        case 1:
                            tile.animations.play('show1', 15, false, undefined); //1time
                            tile.z_step = 0;
                            if(kData.bSoundSE) SE_BrickShell_Remove.play();//초코블록
                            // this.runTweenCombo(ScoreBcHP1, tile.x, tile.y, 1); //총알로 초코블록 파괴1
                            break;
                        case 0:
                            tile.z_step = -1;
                            var stgame = uigame.state.states.game;
                            stgame.massiveController.tiles.bringToTop(tile);//레이어상위로이동
                            //tile.animations.play('kill', 25, false, true); //1time //kill

                            if(modeOption[0]===2 &&tile.z_isheart) {
                                if (kData.userData[curLevel] < modeOption[2]) {
                                    if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                                    kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                                    //kData.iHeart+=1;
                                    MainUI.z_shopplus.onRefresh();
                                }else{
                                    kData.userData[curLevel]=modeOption[2];
                                    if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                                }
                                MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                                MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                                if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                            }

                            tile.animations.play('kill_choco', 25, false, true); //1time //kill //초코
                            tile.body.enable=false;
                            bbLevel[tile.z_y][tile.z_x]=-1;


                            if(kData.bSoundSE) SE_Brick_Extinction.play();//블록파괴
                            //this.runTweenCombo(ScoreBcHP0, tile.x, tile.y, 1); //총알로 초코블록 파괴0
                            TweenMax.killTweensOf(tile);

                            break;
                        default:
                            if(dm) console.log("tile.z_step.default!!");
                            break;
                    }//초코블록단계별
                }else {
                    // this.runTweenCombo(10, tile.x, tile.y, 1); //총알로 일반블록

                    //보통블록일경우만 아이템 생성
                    tile.z_step = -1;
                    if (this.bricksWithItems.indexOf(tile.name) > -1) {//아이템할당 타일이름이면
                        //this.bricksWithItems.pop(tile.name);
                        this.dropOneItems(tile.x, tile.y);
                    }
                    var stgame = uigame.state.states.game;
                    stgame.massiveController.tiles.bringToTop(tile);//레이어상위로이동

                    if(modeOption[0]===2 &&tile.z_isheart) {
                        if (kData.userData[curLevel] < modeOption[2]) {
                            if(dm) console.log("heart increased - old:"+kData.userData[curLevel]+",cur:"+(kData.userData[curLevel]+1)+", name:"+tile.name);
                            kData.userData[curLevel]+=1;//보너스모드,하트블록이면 보너스하트습득
                            //kData.iHeart+=1;
                            MainUI.z_shopplus.onRefresh();
                        }else{
                            kData.userData[curLevel]=modeOption[2];
                            if(dm) console.log("heart over!!!!"+", name:"+tile.name);
                        }
                        MainUI.z_heartcnt_b.text=kData.userData[curLevel];
                        MainUI.z_heartcnt_b.z_number.text="/"+modeOption[2];
                        if (kData.bSoundSE) SE_Item_Good.play();//하트획득사운드
                    }

                    tile.animations.play('kill', 25, false, true); //1time //kill
                    tile.body.enable=false;
                    bbLevel[tile.z_y][tile.z_x]=-1;

                    if(kData.bSoundSE) SE_Brick_Extinction.play();//블록파괴
                    TweenMax.killTweensOf(tile);

                }
                //bullet.kill();
                bullet.body.enable = false;
                bullet.animations.play('kill', 25, false, true); //1time

                this.debugTiles();
            },

            bulletCollideWithBounds3: function (bullet, tile) {
                //bullet.kill();
                bullet.body.enable = false;
                bullet.animations.play('kill', 25, false, true); //1time
                if(kData.bSoundSE) SE_Ball.play();//임시소리
            },

            ballCollideWithBounds3: function (ball, wall) {
                if (kData.bSoundSE) SE_Ball.play();
                if(Math.abs(ball.body.angle)>2.8) {//공이 왼쪽벽 충돌시(수평각 범위로)
                    if (ball.body.angle<0) {//-160도↖//상승방향
                        //console.log("ball angle:"+ball.body.angle+", --> " +(ball.body.angle+0.1));
                        uigame.physics.arcade.velocityFromRotation(ball.body.angle + 0.1, curVelocity, ball.body.velocity); //라디언값 됨
                    }else{//160도↙ //하강뱡향 방향문자( ← → ↑ ↓ ↗ ↙ ↖ ↘ )
                        //console.log("ball angle:"+ball.body.angle+", --> " +(ball.body.angle-0.1));
                        uigame.physics.arcade.velocityFromRotation(ball.body.angle - 0.1, curVelocity, ball.body.velocity); //라디언값 됨
                    }
                }else if(Math.abs(ball.body.angle)<0.349066) {//오른쪽벽충돌(수평각 범위로)
                    if (ball.body.angle < 0) {//-20도↗ //상승뱡향
                        //console.log("ball angle:"+ball.body.angle+", --> " +(ball.body.angle-0.1));
                        uigame.physics.arcade.velocityFromRotation(ball.body.angle - 0.1, curVelocity, ball.body.velocity); //라디언값 됨
                    } else {//20도↘ //하강방향
                        //console.log("ball angle:"+ball.body.angle+", --> " +(ball.body.angle+0.1));
                        uigame.physics.arcade.velocityFromRotation(ball.body.angle + 0.1, curVelocity, ball.body.velocity); //라디언값 됨
                    }
                }

            },
            bearsCollideWithBounds4: function (bear, bound) { //적곰,녹곰 테두리 충돌
               if(dm) console.log("---------bear-coll(xy):" + bear.x+","+bear.y+", ---bound:"+bound.x+","+bound.y+", vel:"+bear.body.speed);

                if(bear.x>360+200){//오른쪽위치에 있을 경우
                    if(bear.body.velocity.x>0) bear.body.velocity.x=(-bear.body.velocity.x);
                }else if(bear.x<360-200){//왼쪽
                    if(bear.body.velocity.x<0) bear.body.velocity.x=(-bear.body.velocity.x);
                }
                //(786-130)*0.5=328 --> 운동장height/2
                //(786-130)*0.5+130= 458 0-->운동장중심y
                if(bear.y>458+200){
                    if(bear.body.velocity.y>0) bear.body.velocity.y=(-bear.body.velocity.y);
                }else if(bear.y<458-200){
                    if(bear.body.velocity.y<0) bear.body.velocity.y=(-bear.body.velocity.y);
                }

               if(bound.x===360){//충돌박스 위아래
                    switch (bound.y){
                        case 130://위
                            if(130 > bear.y-bear.body.halfHeight) bear.y = 130+30-bear.body.halfHeight;
                            //bear.body.velocity.y += 100;
                        break;
                        case 786://아래
                            if(786 < bear.y+bear.body.halfHeight) bear.y = 786-30+bear.body.halfHeight;
                            //bear.body.velocity.y -= 100;
                        break;
                    }

                }else if(bound.y===1280){//충돌박스 왼쪽,오른쪽
                    switch (bound.x){
                        case 0://왼쪽
                            if(0 > bear.x-bear.body.halfWidth) bear.x = 0+30-bear.body.halfWidth;
                            //bear.body.velocity.x += 100;
                            break;
                        case 720://오른쪽
                            if(692 < bear.x+bear.body.halfWidth) bear.x = 692-30+bear.body.halfWidth;
                            //bear.body.velocity.x -= 100;
                            break;
                    }
                }

                if (kData.bSoundSE) SE_Ball.play();
                //벽충돌시 각도설정
                TweenMax.fromTo( bear.scale, 0.025, //time
                    { x: 1, y: 1 },
                    { //메달트윈
                        x: 1.2,
                        y: 1.2,
                        repeat: 1,
                        ease: Linear.easeNone, //ease: Power1.easeInOut, //ease: Elastic.easeOut,
                        yoyo: true,
                        //onComplete: fnEnd,
                        delay: 0
                    }
                );
            },
            bearsCollideWithBounds4_prev: function (bear, bound) {//여러번 호출됨(3번까지도)
            },
            bearsCollideWithBalls: function (bear, ball) { //적곰, 녹곰 공충돌 곰충돌

                //공충돌회전각
                // var dircByPoint = Phaser.Math.angleBetweenPoints(ball.body.prev, ball.body.position);
                // var dirrByPoint = Phaser.Math.angleBetweenPoints(this.last, this.prev); //반전
                // console.log("radian: point="+dircByPoint
                //     +", reverse="+dirrByPoint
                //     +", angle(ball)="+ball.body.angle
                //     +", angle(ball_reverse)="+ (
                //             ball.body.angle>0?(ball.body.angle%Math.PI)-Math.PI:(ball.body.angle%Math.PI)+Math.PI
                //     )+", angle(bear)="+bear.body.angle);

                if(dm) console.log("---------acccum:" + bear.z_accum+", hit:"+ bear.z_hitcount );
                var isRed = bear.z_color==="red";

                var isBullet = ball.name.indexOf('ball') === -1; //이름에 'ball' 안포함이면 총알이다
                //총알제거
                if (isBullet){
                    ball.body.enable = false;
                    ball.animations.play('kill', 25, false, true); //1time
                }
                //총알제거


                switch (bear.z_hitcount){
                    case 0: //1번째스킨변신 0-->2-->4
                        //공충돌회전각

                        // if (isBullet){
                        //     this.dirc = generateRandomNumber(-Math.PI, Math.PI);
                        //     this.dirr = this.dirc > 0 ? (this.dirc % Math.PI) - Math.PI : (this.dirc % Math.PI) + Math.PI;
                        // }else {
                            this.dirc = ball.body.angle; //=== Phaser.Math.angleBetweenPoints(ball.body.prev, ball.body.position);
                            this.dirr = ball.body.angle > 0 ? (ball.body.angle % Math.PI) - Math.PI : (ball.body.angle % Math.PI) + Math.PI;
                        // }
                        uigame.physics.arcade.velocityFromRotation( this.dirr+1, curVelocity, ball.body.velocity);//공속도

                        //라디안,각도비교// 0.0174533rad=1deg, 0.0523599rad=3deg //1rad=57deg, 2rad=114deg, 0.1rad=5.7deg

                        //degree값으로 제어하려면
                        //var _degree = Phaser.Math.radToDeg(this.dirc);
                        //uigame.physics.arcade.velocityFromAngle(_degree, 400, ball.body.velocity); //각도값을 넣어줘야함

                        //새로운 적곰 탄생
                        if(isRed) { //적곰이면 분화1번, 새복제곰만들고, 속도,히트카운트2,무한트윈,물리를 적용한다.
                            var bearnew0;
                            bearnew0 = this.redBears.getFirstDead();
                            bearnew0.revive();
                            bearnew0.body.enable = true;
                            bearnew0.alpha = 1;
                            bearnew0.reset(bear.x, bear.y);
                            //이동속도지정
                            uigame.physics.arcade.velocityFromRotation(this.dirc + 0.2, this.redBearVel*1.5, bearnew0.body.velocity);//새적곰속도지정

                            bearnew0.animations.play('div_0', 15, false, undefined); //1time
                            //물리속성지정
                            bearnew0.body.setSize(bearnew0.width - 20, bearnew0.height - 20, 10, 10);//bearnew0.body.setSize(bear1.width / bearnew0.scale.x, bearnew0.height / bearcase0.scale.y);
                            delayHitCount_Change(bearnew0, ball, 2);

                            TweenMax.killTweensOf(bearnew0); //기존트윈 삭제
                            TweenMax.fromTo( bearnew0, 10, { rotation: 0 }, { rotation: 6.28, ease:Linear.easeNone, repeat: -1 } );//곰 360 회전
                        }//if(isRed)

                        //기존곰 분화 애니(적곰,녹곰 공용)
                        if(isRed) uigame.camera.shake(0.005*0.75, 500);//카메라 흔들림
                        else  uigame.camera.shake(0.005*0.5, 500);//카메라 흔들림

                        bear.animations.play('div_0', 15, false, undefined); //1time
                        if(kData.bSoundSE) SE_BearJelly_Hit.play(); //곰젤리 맞았을때

                        if(isRed) {
                            //기존 적곰, 물리크기변경, 속도변경
                            bear.body.setSize(bear.width - 20, bear.height - 20, 10, 10);
                            uigame.physics.arcade.velocityFromRotation(this.dirc-0.2, this.redBearVel*1.5, bear.body.velocity);//기존적곰속도
                            delayHitCount_Change(bear, ball, 2);
                        }else{
                            //기존 녹곰 물리크기변경, 속도변경
                            bear.body.setSize(bear.width - 20, bear.height - 20, 10, 10);
                            uigame.physics.arcade.velocityFromRotation(this.dirc-0.2, this.greenBearVel*0.75, bear.body.velocity);//기존녹곰속도
                            //녹곰위치보정
                            if(bear.x>360+200){//오른쪽위치에 있을 경우
                                if(bear.body.velocity.x>0) bear.body.velocity.x=(-bear.body.velocity.x);
                            }else if(bear.x<360-200){//왼쪽
                                if(bear.body.velocity.x<0) bear.body.velocity.x=(-bear.body.velocity.x);
                            }
                            //(786-130)*0.5=328 --> 운동장height/2
                            //(786-130)*0.5+130= 458 0-->운동장중심y
                            if(bear.y>458+200){
                                if(bear.body.velocity.y>0) bear.body.velocity.y=(-bear.body.velocity.y);
                            }else if(bear.y<458-200){
                                if(bear.body.velocity.y<0) bear.body.velocity.y=(-bear.body.velocity.y);
                            }
                            //녹곰위치보정

                            //녹곰이면 2번 맞고 변하게
                            switch (bear.z_accum){ //총알2번 맞고 다음스킨으로 바뀌게 하려고
                                case 0:
                                    //if(bSoundSE) SE_BearJelly_Hit.play(); //곰젤리 맞았을때
                                    //임시흔들림방지 uigame.camera.shake(0.005, 500);//카메라 흔들림
                                    bear.z_accum=1;
                                    delayHitCount_Change(bear, ball, 2);
                                    break;
                                case 1:
                                case 2://예외 누적충돌
                                case 3://예외 누적충돌
                                case 4://예외 누적충돌
                                    //임시흔들림방지 uigame.camera.shake(0.005, 500);//카메라 흔들림
                                    delayHitCount_Change(bear, ball, 2);
                                    var b3 = bear;
                                    setTimeout(function () { b3.z_accum=0; }, 750);
                                    break;
                            }
                        }

                        break; //case 0:

                    case 2: //2번째스킨변신
                        //공충돌회전각
                        if (isBullet){
                            this.dirc = generateRandomNumber(-Math.PI, Math.PI);
                            this.dirr = this.dirc > 0 ? (this.dirc % Math.PI) - Math.PI : (this.dirc % Math.PI) + Math.PI;
                        }else {
                            this.dirc = ball.body.angle; //=== Phaser.Math.angleBetweenPoints(ball.body.prev, ball.body.position);
                            this.dirr = ball.body.angle > 0 ? (ball.body.angle % Math.PI) - Math.PI : (ball.body.angle % Math.PI) + Math.PI;
                        }
                        uigame.physics.arcade.velocityFromRotation( this.dirr+1, curVelocity, ball.body.velocity);//공속도

                        if(isRed) {
                            //적곰이면 분화2번, 새복제곰만들고, 속도,히트카운트4,무한트윈,물리를 적용한다.
                            var bearnew1 = bear1 = this.redBears.getFirstDead();
                            bearnew1.revive();
                            bearnew1.reset(bear.x, bear.y);
                            bearnew1.body.enable=true;
                            bearnew1.alpha=1;
                            bearnew1.animations.play('div_1', 15, false, undefined); //1time
                            bearnew1.body.setSize(bearnew1.width - 20, bearnew1.height - 20, 10, 10);//bearnew1.body.setSize(bearnew1.width / bearnew1.scale.x, bearnew1.height / bearnew1.scale.y);

                            // if(isBullet)
                            //     accelerateToXYFromLocal(bearnew1, bearnew1.body.velocity.x, bearnew1.body.velocity.y, this.redBearVel*2);//새적곰속도지정
                            // else
                                 uigame.physics.arcade.velocityFromRotation( this.dirc + 0.2, this.redBearVel*2, bearnew1.body.velocity);//새적곰속도지정

                            delayHitCount_Change(bearnew1, ball, 4);

                            TweenMax.killTweensOf(bearnew1);
                            TweenMax.fromTo( bearnew1, 10, { rotation: 0 }, { rotation: 6.28, ease:Linear.easeNone, repeat: -1 } );
                        }//if isRed

                        if(isRed) uigame.camera.shake(0.005*0.5, 500);//카메라 흔들림
                        else uigame.camera.shake(0.005*0.75, 500);//카메라 흔들림
                        //기존곰 분화 애니(적곰,녹곰 공용)
                        bear.animations.play('div_1', 15, false, undefined); //1time
                        //if(bSoundSE) SE_BearJelly_Transform.play();
                        if(kData.bSoundSE) SE_BearJelly_Hit.play(); //곰젤리 맞았을때

                        if(isRed) { //기존 적곰, 물리크기변경, 속도변경
                            bear.body.setSize(bear.width - 20, bear.height - 20, 10, 10);
                            // if(isBullet)
                            //     accelerateToXYFromLocal(bear, bear.body.velocity.x, bear.body.velocity.y, this.redBearVel*2); //기존적곰속도
                            // else
                                uigame.physics.arcade.velocityFromRotation(this.dirc-0.2, this.redBearVel*2, bear.body.velocity); //기존적곰속도
                            delayHitCount_Change(bear, ball, 4);
                        }else{     //녹곰이면 5번 맞고 변하게
                            bear.body.setSize(bear.width - 40, bear.height - 40, 20, 20)
                            // if(isBullet)
                            //     accelerateToXYFromLocal(bear, bear.body.velocity.x, bear.body.velocity.y, this.redBearVel*2);//기존녹곰속도
                            // else
                                uigame.physics.arcade.velocityFromRotation(this.dirc-0.2, this.greenBearVel*0.5, bear.body.velocity);//기존녹곰속도
                            //녹곰위치보정
                            if(bear.x>360+200){//오른쪽위치에 있을 경우
                                if(bear.body.velocity.x>0) bear.body.velocity.x=(-bear.body.velocity.x);
                            }else if(bear.x<360-200){//왼쪽
                                if(bear.body.velocity.x<0) bear.body.velocity.x=(-bear.body.velocity.x);
                            }
                            //(786-130)*0.5=328 --> 운동장height/2
                            //(786-130)*0.5+130= 458 0-->운동장중심y
                            if(bear.y>458+200){
                                if(bear.body.velocity.y>0) bear.body.velocity.y=(-bear.body.velocity.y);
                            }else if(bear.y<458-200){
                                if(bear.body.velocity.y<0) bear.body.velocity.y=(-bear.body.velocity.y);
                            }
                            //녹곰위치보정

                            switch (bear.z_accum){ //총알2번 맞고 다음스킨으로 바뀌게 하려고
                                case 0:
                                    bear.z_accum=1;
                                    delayHitCount_Change(bear, ball, 2);
                                    break;
                                case 1:
                                    bear.z_accum=2; //초기화
                                    delayHitCount_Change(bear, ball, 2);
                                    break;
                                case 2:
                                    bear.z_accum=3; //초기화
                                    delayHitCount_Change(bear, ball, 2);
                                    break;
                                case 3:
                                case 4://예외 누적충돌
                                case 5://예외 누적충돌
                                case 6://예외 누적충돌
                                    bear.z_accum=0; //초기화
                                    bear.z_hitcount=-1;

                                    this.dropOneItems(bear.x, bear.y);

                                    bear.body.setSize(bear.width-80, bear.height-80, 40, 40);//녹곰전용 크기조절

                                    //녹곰죽기----
                                    bear.body.velocity.set(0);
                                    bear.body.enable=false;
                                    TweenMax.fromTo( bear,0.5,{alpah:1},{alpha:0,ease:Linear.easeNone,
                                        onComplete: function () {
                                            bear.kill();
                                            if(dm) console.log("kill greenbear:"+bear.name);
                                            //bear.animations.play('kill', 15, false, true); //1time
                                        }
                                    });
                                    //녹곰죽기----
                                    break;
                            }
                        }//녹곰처리

                        break;//case 2:

                    case 4: //적곰만 해당, 스킨은 안 바뀌고 죽는 애니만
                        //공충돌회전각
                        // if (isBullet){
                        //     this.dirc = generateRandomNumber(-Math.PI, Math.PI);
                        //     this.dirr = this.dirc > 0 ? (this.dirc % Math.PI) - Math.PI : (this.dirc % Math.PI) + Math.PI;
                        //     uigame.physics.arcade.velocityFromRotation( this.dirc-0.2, bear.body.speed, bear.body.velocity);
                        //     uigame.physics.arcade.velocityFromRotation( this.dirr+1, ball.body.speed, ball.body.velocity);
                        // }else {
                            this.dirc = ball.body.angle; //=== Phaser.Math.angleBetweenPoints(ball.body.prev, ball.body.position);
                            this.dirr = ball.body.angle > 0 ? (ball.body.angle % Math.PI) - Math.PI : (ball.body.angle % Math.PI) + Math.PI;
                            uigame.physics.arcade.velocityFromRotation(this.dirc-0.2, bear.body.speed, bear.body.velocity);
                            uigame.physics.arcade.velocityFromRotation( this.dirr+1, ball.body.speed, ball.body.velocity);
                        // }
                        if(isRed)
                            uigame.camera.shake(0.005*0.25, 500);//카메라 흔들림
                        else
                            uigame.camera.shake(0.005, 500);//카메라 흔들림
                        if(kData.bSoundSE) SE_BearJelly_Hit.play(); //곰젤리 맞았을때

                        this.dropOneItems(bear.x, bear.y);
                        bear.body.setSize(bear.width-20, bear.height-20, 10, 10); //적곰전용 크기조절
                        bear.z_hitcount=-1;
                        //적곰죽기----
                        bear.body.velocity.set(0);
                        bear.body.enable=false;
                        TweenMax.fromTo( bear,0.5,{alpah:1},{alpha:0,ease:Linear.easeNone,
                            onComplete: function () {
                                bear.kill();
                                if(dm) console.log("kill :"+bear.name);
                                //bear.animations.play('kill', 15, false, true); //1time
                            }
                        });
                        //적곰죽기----

                        break;
                }//switch (bear.z_hitcount)
            },//bearsCollideWithBalls()

            /**
             * Callback for when ball collides with the players paddle.
             */

            ballCollideWithPaddle: function (paddle, ball) { //262버젼

                //온패들상태, 공1개가 있으면 시작상태이므로 취소
                //if(this.ballOnPaddle && this.ball===ball) return;

                //물리찾기1
                // var a =ball.body.prev; //angleBetweenPoints 으로 앵글값찾기
                // var b =ball.body.position;
                // var c =ball.body.preRotation;
                // var d =ball.body.rotation;
                // var e = uigame.physics.arcade.angleToXY(ball, a.x, a.y);
                // var f = Phaser.Math.radToDeg(e);
                // var g = ball.body.checkCollision;
                // var h = ball.body.facing; //velocity의존적 //NONE: 0, LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4,
                // var i = paddle.body.facing; //velocity의존적  //NONE: 0, LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4,

                playtime_clock+=curComboCount;//콤보시간충전
                if(playtime_clock>=playtime_clock_max+1) { //in ballcollidepaddle
                    //맥스타임이면
                    playtime_clock=playtime_clock_max+1; //in ballcollidepaddle
                }
                else {
                     //맥스타임이 아니면
                    if(curComboCount>0) uiProgGlobal.onTweenSec(curComboCount);
                }
                curComboCount = 0; //패들충돌시

                //console.log("coll ball:" + ball.name + "," + "paddle:" + paddle.name);

                //반사각설정 각도기준
                var ag = uigame.physics.arcade.angleBetween(paddle, ball);
                //console.log("paddle-ball-angle:",ag);
                if(ag>0) ag=ag*-1;
                uigame.physics.arcade.velocityFromRotation(ag, curVelocity, ball.body.velocity);

                //console.log("ball.vel:"+ball.body.velocity+", pos:"+ball.position+", isb:"+ball.body.enable+", isp:"+paddle.body.enable);
                //console.log("--end--");
                //패들 반사각설정 옵셋기준
                // var diff = 0;
                // //패들충돌시 각도설정
                // // Super simplistic bounce physics for the ball movement
                // if (ball.x < paddle.x) {
                //     //  Ball is on the left-hand side
                //     diff = paddle.x - ball.x;                   //포지션 차이값(양수)
                //     //ball.body.velocity.x = (-10 * diff);
                //     ball.body.velocity.x = (-10 * (diff + 25));   //(차+25)*-10으로 속도를 넣어준다
                // } else if (ball.x > paddle.x) {
                //     //  Ball is on the right-hand side
                //     diff = ball.x - paddle.x;
                //     //ball.body.velocity.x = (10 * diff);
                //     ball.body.velocity.x = (10 * (diff + 25));
                // } else {
                //     //  Ball is perfectly in the middle
                //     //  Add a little random X to stop it bouncing straight up!
                //     //ball.body.velocity.x = 2 + Math.random() * 8;
                //     ball.body.velocity.x = 10 + Math.random() * 8;
                // }
                // ball.body.velocity.y -= 10;


                switch (this.padatt) {
                    case PadAttr.fixed:         //2 //패들에 접착 시작한다
                        //if(dm) console.log(ball.body.velocity);
                        if(kData.bSoundSE) SE_Magnet.play(); //공 접착시
                        if(dm) console.log("-------------- catch velocity: "
                            +ball.body.velocity.x
                            +","+ball.body.velocity.y
                        );
                        if(dm) console.log("-------------- ball.x.y: "+ball.x+","+ball.y);

                        var yb=ball.y;
                        var pb=paddle.y-(paddle.body.halfHeight*0.5);
                        if(ball.y<paddle.y-(paddle.body.halfHeight*0.5)) { //패들이 밑쪽, 공이 위쪽
                            ball.body.velocity.set(0);
                            ball.z_balltype=BallType.fixed;
                            var curoff = ball.x - paddle.x;
                            var p = (paddle.body.halfWidth)-ball.body.halfWidth;
                            var m = -(paddle.body.halfWidth)+ball.body.halfWidth;
                            if(curoff>0){
                                if(curoff>p) ball.z_xoff=p;
                                else ball.z_xoff= curoff;
                            }else{
                                if(curoff<m) ball.z_xoff=m;
                                else ball.z_xoff= curoff;
                            }
                            var curoffy = ball.y - paddle.y;
                            //var py = paddle.body.halfHeight+ball.body.halfHeight;
                            //박스두배크기 충돌일경우
                            //var my = -(paddle.body.halfHeight*0.5)-ball.body.halfHeight;
                            //박스1배크기 충돌경우
                            var my = -(paddle.body.halfHeight)-ball.body.halfHeight;
                            //if(curoffy>0){
                            //    if(curoff>p) ball.z_xoff=p;
                            //    else ball.z_xoff= curoff;
                            //}else{
                                //if(curoff<m)
                                    ball.z_yoff=my-6;//6픽셀더위로
                                //else ball.z_xoff= curoff;
                            //}
                            this.fixedballs.push(ball);
                            ball.body.velocity.set(0);
                        }

                        break;
                    default:
                        if (kData.bSoundSE) SE_Ball.play();
                        break;
                }
                this.moveVertical();
            },
            ballCollideWithPaddle_prev: function (paddle, ball) {
                //물리찾기2
                //온패들상태, 공1개가 있으면 시작상태이므로 취소
                //if(this.ballOnPaddle && this.ball===ball) return;

                var a = ball.body.checkCollision;
                var b = ball.body.facing; // NONE: 0, LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4,
                var c = paddle.body.facing; // NONE: 0, LEFT: 1, RIGHT: 2, UP: 3, DOWN: 4,
                var aa = ball;
            },

            itemCollideWithPaddle: function (paddle, item) { //아이템 먹은후 변화 //262버젼 //아이템분화
                //itmidx = uigame.rnd.weightedPick([7,13,5,6,14]);
                if(curLives===0) return;

                MainUI.z_itemsel.onShow(item.itmidx);

                switch (item.itmidx) { //아이템습득,아이템획득
                    // case 0:
                    //     itemEffectName = undefined;
                    //     break;
                    case 1:         //1 //패들 확대 (1단계씩)
                        this.onReleaseBalls();
                        this.setPadSizeLocal(1);
                        if (kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 2:         //2 //공 복사
                        this.onReleaseBalls();
                        if (this.padatt === PadAttr.fixed) { //접착모드시 기존공을 가지고 잇으면 쏴버리고, 복제한다.
                            this.onReleaseBalls(); //
                            var v1 = this;
                            setTimeout(function () {
                                v1.copyBalls();
                            }, 500);
                        } else if (this.ballOnPaddle) {  //첫시작상태이면 쏴버리고, 복제한다.
                            this.onReleaseStart(); //복사아이템습득시 in itemCollideWithPaddle
                            var v1 = this;
                            setTimeout(function () {
                                v1.copyBalls();
                            }, 500);
                        }
                        else this.copyBalls(); //복제공모드
                        if (kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 3:         //3 //총알모드
                        this.onReleaseBalls();
                        this.setPadSizeDirect(this.padsize);
                        gunstate = ThreeState.begin;
                        //코드를 이곳으로 우선 가져왔음
                        guntimer = guntimemax;
                        //this.guntimeroldbak = this.game.time.now; //현재시간 백업
                        gunstate = ThreeState.run;
                        //상태를 run으로 바꾼다
                        PadAttr_bullet = true; //아이템습득


                        //총구켜기
                        this.paddle.z_left.reset(-this.bulletx, -5);
                        this.paddle.z_right.reset(this.bulletx, -5);
                        this.paddle.z_left.visible = true;
                        this.paddle.z_right.visible = true;
                        //총구켜기
                        if (kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 4:         //4 //접착모드
                        this.padatt = PadAttr.fixed;
                        this.setPadSizeDirect(this.padsize);
                        this.releasetimer = this.releasetimemax;
                        if (kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 5:         //5 //블록 관통
                        this.onReleaseBalls();
                        //this.ballstate = BallType.through_n;
                        //
                        if (this.ballstate === BallType.normal_s) this.setBallStateDirect(BallType.through_s);          //노말-->관통
                        else if (this.ballstate === BallType.normal_n) this.setBallStateDirect(BallType.through_n);
                        else if (this.ballstate === BallType.normal_b) this.setBallStateDirect(BallType.through_b);
                        else if (this.ballstate === BallType.bomb_s) this.setBallStateDirect(BallType.throughbomb_s);//폭발속성-->폭관
                        else if (this.ballstate === BallType.bomb_n) this.setBallStateDirect(BallType.throughbomb_n);
                        else if (this.ballstate === BallType.bomb_b) this.setBallStateDirect(BallType.throughbomb_b);
                        //else if(this.ballstate===BallType.through_s) this.setBallStateDirect(BallType.through_s);//관통속성-->관통
                        //else if(this.ballstate===BallType.through_n) this.setBallStateDirect(BallType.through_n);
                        //else if(this.ballstate===BallType.through_b) this.setBallStateDirect(BallType.through_b);
                        // else if(this.ballstate===BallType.throughbomb_s) this.setBallStateDirect(BallType.throughbomb_s);//폭관통-->폭관통
                        // else if(this.ballstate===BallType.throughbomb_n) this.setBallStateDirect(BallType.throughbomb_n);
                        // else if(this.ballstate===BallType.throughbomb_b) this.setBallStateDirect(BallType.throughbomb_b);

                        if (kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 6:         //6 //공 불덩이 (폭발)
                        this.onReleaseBalls();
                        //this.ballstate = BallType.bomb_n;
                        //
                        if (this.ballstate === BallType.normal_s) this.setBallStateDirect(BallType.bomb_s);                //노말-->폭발
                        else if (this.ballstate === BallType.normal_n) this.setBallStateDirect(BallType.bomb_n);
                        else if (this.ballstate === BallType.normal_b) this.setBallStateDirect(BallType.bomb_b);
                        // else if(this.ballstate===BallType.bomb_s) this.setBallStateDirect(BallType.throughbomb_s);//폭발속성-->폭발
                        // else if(this.ballstate===BallType.bomb_n) this.setBallStateDirect(BallType.throughbomb_n);
                        // else if(this.ballstate===BallType.bomb_b) this.setBallStateDirect(BallType.throughbomb_b);
                        else if (this.ballstate === BallType.through_s) this.setBallStateDirect(BallType.throughbomb_s);//관통속성-->폭관통
                        else if (this.ballstate === BallType.through_n) this.setBallStateDirect(BallType.throughbomb_n);
                        else if (this.ballstate === BallType.through_b) this.setBallStateDirect(BallType.throughbomb_b);
                        // else if(this.ballstate===BallType.throughbomb_s) this.setBallStateDirect(BallType.throughbomb_s);//폭관-->폭관
                        // else if(this.ballstate===BallType.throughbomb_n) this.setBallStateDirect(BallType.throughbomb_n);
                        // else if(this.ballstate===BallType.throughbomb_b) this.setBallStateDirect(BallType.throughbomb_b);

                        if (kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 7:         //7 //공 확대 (1단계씩)
                        this.onReleaseBalls();
                        if (this.ballstate === BallType.normal_s) {
                            this.setBallStateDirect(BallType.normal_n);                //노말-->노말
                            this.setBallsPosOffset();
                        } else if (this.ballstate === BallType.normal_n) {
                            this.setBallStateDirect(BallType.normal_b);
                            this.setBallsPosOffset();
                            //}else if(this.ballstate===BallType.normal_b) {this.setBallStateDirect(BallType.normal_b);
                        } else if (this.ballstate === BallType.bomb_s) {
                            this.setBallStateDirect(BallType.bomb_n);               //폭발속성-->폭발
                            this.setBallsPosOffset();
                        } else if (this.ballstate === BallType.bomb_n) {
                            this.setBallStateDirect(BallType.bomb_b);
                            this.setBallsPosOffset();
                            //}else if(this.ballstate===BallType.bomb_b) {this.setBallStateDirect(BallType.bomb_b);
                        } else if (this.ballstate === BallType.through_s) {
                            this.setBallStateDirect(BallType.through_n);       //관통속성-->관통
                            this.setBallsPosOffset();
                        } else if (this.ballstate === BallType.through_n) {
                            this.setBallStateDirect(BallType.through_b);
                            this.setBallsPosOffset();
                            //}else if(this.ballstate===BallType.through_b) {this.setBallStateDirect(BallType.through_b);
                        } else if (this.ballstate === BallType.throughbomb_s) {
                            this.setBallStateDirect(BallType.throughbomb_n);    //폭관-->폭관
                            this.setBallsPosOffset();
                        } else if (this.ballstate === BallType.throughbomb_n) {
                            this.setBallStateDirect(BallType.throughbomb_b);
                            this.setBallsPosOffset();
                            //}else if(this.ballstate===BallType.throughbomb_b) {this.setBallStateDirect(BallType.throughbomb_b);
                        }

                        if(kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 8:         //8 //공 느리게 (1단계씩)
                        curVelocity=VelocityInit;
                        this.balls.forEach(function (n) {
                            if (n.alive) {
                                // //속도줄이기
                                // var vmax = Math.abs(n.body.velocity.x)>Math.abs(n.body.velocity.y)?n.body.velocity.x:n.body.velocity.y;
                                // var vbias = 270/vmax;
                                // if(vbias<0) vbias*=(-1);
                                // n.body.velocity.x = n.body.velocity.x * vbias;
                                // n.body.velocity.y = n.body.velocity.y * vbias;
                                // //속도줄이기
                                var ang = accelerateToXYFromLocal(n, n.body.velocity.x, n.body.velocity.y, curVelocity);
                            }
                        }, this);

                        if(kData.bSoundSE) SE_Item_Good.play();
                        break;
                    case 9:         //9 //블록 hp=1
                        //초코블록만 껍질 벗기기
                        this.tiles.forEach(function (n) {
                            if (n.alive && n.z_color===8 && n.z_step>0) {
                                n.z_step=0; //2:은박,1:반은박,0:초코블록
                                n.animations.play('show1', 15, false, undefined); //1time
                            }//if n.alive
                        }, this);
                        if(kData.bSoundSE) SE_Item_Good.play();
                        break;

                    case 10:         //10//패들 축소
                        this.onReleaseBalls();
                        this.setPadSizeLocal(-1);//this.nerfPaddle();
                        if(kData.bSoundSE) SE_Item_Bad.play();
                        break;

                    case 11:        //11//패들 축소(강제)
                        this.onReleaseBalls();
                        this.setPadSizeDirect(PadSize.nerf);
                        if(kData.bSoundSE) SE_Item_Bad.play();
                        break;

                    case 12:        //12//공 빠르게(4단계)
                        curVelocity+=200;
                        if(curVelocity>VelocityMax) curVelocity = VelocityMax;
                        if(kData.bSoundSE) SE_Item_Bad.play();

                        //---볼전체속도를 빠르게 한다.----

                        this.balls.forEach(function (n) {
                            if (n.alive) {
                                //커스텀버젼
                                var ang = accelerateToXYFromLocal(n, n.body.velocity.x, n.body.velocity.y, curVelocity);
                                //포인트인자버전 마찰력같은게 생겨서 에러
                                //this.targetxy = {x:n.body.velocity.x, y:n.body.velocity.y};
                                //var ang = game.physics.arcade.accelerateToObject(n, this.targetxy, curVelocity, 1000, 1000);
                                //xy인자버젼 -- 마찰력같은게 생겨서 에러
                                //var ang = game.physics.arcade.accelerateToXY(n, n.x+n.body.velocity.x, n.y+n.body.velocity.y, curVelocity);
                                //console.log("-------------angle:"+ang);

                            }
                        }, this);
                        //---볼전체속도를 빠르게 한다.----
                        break;

                    case 13:        //13//공 축소
                        if(kData.bSoundSE) SE_Item_Bad.play();
                        this.onReleaseBalls();
                        // BallType = { normal, small, big, through_n, through_s, through_b, bomb_n, bomb_s, bomb_b };
                        if(this.ballstate===BallType.normal_n) this.setBallStateDirect(BallType.normal_s); //축소습득
                        else if(this.ballstate===BallType.through_n) this.setBallStateDirect(BallType.through_s);
                        else if(this.ballstate===BallType.bomb_n) this.setBallStateDirect(BallType.bomb_s);
                        //

                        //if(this.ballstate===BallType.normal_s) this.setBallStateDirect(BallType.normal_n);                //노말-->노말
                        //else
                        if(this.ballstate===BallType.normal_n) this.setBallStateDirect(BallType.normal_s);
                        else if(this.ballstate===BallType.normal_b) this.setBallStateDirect(BallType.normal_n);
                        //else if(this.ballstate===BallType.bomb_s) this.setBallStateDirect(BallType.bomb_n);               //폭발속성-->폭발
                        else if(this.ballstate===BallType.bomb_n) this.setBallStateDirect(BallType.bomb_s);
                        else if(this.ballstate===BallType.bomb_b) this.setBallStateDirect(BallType.bomb_n);
                        //else if(this.ballstate===BallType.through_s) this.setBallStateDirect(BallType.bomb_n);            //관통속성-->관통
                        else if(this.ballstate===BallType.through_n) this.setBallStateDirect(BallType.through_s);
                        else if(this.ballstate===BallType.through_b) this.setBallStateDirect(BallType.through_n);
                        //else if(this.ballstate===BallType.throughbomb_s) this.setBallStateDirect(BallType.throughbomb_n);   //폭관-->폭관
                        else if(this.ballstate===BallType.throughbomb_n) this.setBallStateDirect(BallType.throughbomb_s);
                        else if(this.ballstate===BallType.throughbomb_b) this.setBallStateDirect(BallType.throughbomb_n);
                        break;

                    case 14:        //14//죽기
                        if(kData.bSoundSE) SE_Item_Bad.play();
                        //예전죽기 아이템
                        //this.death_Force();
                        //예전죽기 아이템

                        //현재초기화아이템
                        this.onReleaseBalls();
                        // BallType = { normal, small, big, through_n, through_s, through_b, bomb_n, bomb_s, bomb_b };
                        if(this.ballstate!==BallType.normal_n) {
                            this.setBallStateDirect(BallType.normal_n);
                            this.setBallsPosOffset();
                        }
                        this.setPadSizeDirect(PadSize.normal);

                        //총구 사라지기
                        this.setBulletOffset();
                        guntimer=0;
                        gunstate = ThreeState.end;
                        PadAttr_bullet = false; //in 아이템14(죽는아이템)
                        this.paddle.z_left.visible=false;
                        this.paddle.z_right.visible=false;
                        //총구 사라지기

                        //현재초기화아이템
                        //
                        break;
                } //switch (item.itemEffectName)
                item.kill();
            } ,//itemCollideWithPaddle

            overlapHandler: function(ball, tile) { //트리거//오버랩
                if(tile.z_color==-1) return;//1번만 실행목적
                if(tile.z_step==-1) return;
                //if(tile.z_color===9) this.countgold-=1;//무적블록이면 차감(오버랩

                //아이템떨어뜨리기
                if (this.bricksWithItems.indexOf(tile.name) > -1) {//아이템할당 타일이름이면
                    //this.bricksWithItems.pop(tile.name);
                    this.dropOneItems(tile.x, tile.y);
                }
                var stgame = uigame.state.states.game;
                stgame.massiveController.tiles.bringToTop(tile);//레이어상위로이동
                tile.animations.play('kill', 25, false, true); //1time //kill
                tile.body.enable=false;
                bbLevel[tile.z_y][tile.z_x]=-1;
                tile.z_step=-1;

                if(kData.bSoundSE) SE_Brick_Extinction.play();
                //tile.kill();

                tile.z_color = -1;//1번만 실행목적

                this.runTweenCombo(1); //폭발공으로 점수

            },//overlapHandler
            overlapHandler_through: function(ball, tile) { //트리거//오버랩
                if(tile.z_color==-1) return;//1번만 실행목적
                if(tile.z_step==-1) return;
                //if(tile.z_color===9) this.countgold-=1;//무적블록이면 차감(오버랩

                //관통폭발 처리---------------------------------- 1/3
                //아이템떨어뜨리기
                if (this.bricksWithItems.indexOf(tile.name) > -1) {//아이템할당 타일이름이면
                    //this.bricksWithItems.pop(tile.name);
                    this.dropOneItems(tile.x, tile.y);
                }
                tile.animations.play('fire', 25, false, true); //1time //kill
                tile.body.enable=false;
                tile.z_step=-1;
                //에러감시
                if(typeof(bbLevel) === 'undefined') console.log("bbLevel == undefined");
                if(typeof(bbLevel[tile.z_y]) === 'undefined') console.log("bbLevel[] == undefined, "+tile.z_y);
                if(typeof(bbLevel[tile.z_y][tile.z_x]) === 'undefined') console.log("bbLevel[][] == undefined, "+tile.z_x);
                //에러감시

                bbLevel[tile.z_y][tile.z_x]=-1;

                if(kData.bSoundSE) SE_Brick_Extinction_F.play();//블록폭발파괴
                //tile.kill();

                this.runTweenCombo(1); //폭발공으로 점수

                tile.z_color = -1;//1번만 실행목적
                //관통폭발공처리-------------------------------------


                //x 11개 y 18개
                this._xa = tile.z_x+1;
                this._xb = tile.z_x-1;

                _chk1_SE_Brick_Extinction_F = false;
                _chk2_SE_Brick_Extinction_F = false;

                _combotemp=0;
                //오른쪽
                if(this._xa<11&&bbLevel[tile.z_y][this._xa]!==-1&&bbLevel[tile.z_y][this._xa].alive){
                    var delay1a =  bbLevel[tile.z_y][this._xa];
                    _chk1_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay1a.animations.play('kill', 25, false, true);
                        delay1a.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 150);
                    _combotemp+=1;
                }
                //왼쪽
                if(this._xb>-1&&bbLevel[tile.z_y][this._xb]!==-1&&bbLevel[tile.z_y][this._xb].alive){
                    var delay2a =  bbLevel[tile.z_y][this._xb];
                    _chk1_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay2a.animations.play('kill', 25, false, true);
                        delay2a.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 150);
                    _combotemp+=1;
                }
                this._ya = tile.z_y+1;
                this._yb = tile.z_y-1;
                //위쪽
                if(this._ya<18&&bbLevel[this._ya][tile.z_x]!==-1&&bbLevel[this._ya][tile.z_x].alive){
                    var delay3a =  bbLevel[this._ya][tile.z_x];
                    _chk1_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay3a.animations.play('kill', 25, false, true);
                        delay3a.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 150);
                    _combotemp+=1;
                }
                //아래쪽
                if(this._yb>-1&&bbLevel[this._yb][tile.z_x]!==-1&&bbLevel[this._yb][tile.z_x].alive){
                    var delay4a =  bbLevel[this._yb][tile.z_x];
                    _chk1_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay4a.animations.play('kill', 25, false, true);
                        delay4a.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 150);
                    _combotemp+=1;
                }
                //소리취합
                if(_chk1_SE_Brick_Extinction_F){   //--2/3차 폭발사운드처리
                    setTimeout(function () {
                        if(kData.bSoundSE) SE_Brick_Extinction_F_a.play();//블록폭발파괴
                        _chk1_SE_Brick_Extinction_F=false;
                    }, 150);
                }
                //콤보취합
                if(_combotemp>0) {

                    setTimeout(function () {
                        var masscon = uigame.state.states.game.massiveController;
                        masscon.runTweenCombo(_combotemp);
                    }, 150);
                }

                _combotemp=0;
                //왼 위쪽
                if(this._xb>-1 && this._ya<18&&bbLevel[this._ya][this._xb]!==-1&&bbLevel[this._ya][this._xb].alive){
                    var delay1 =  bbLevel[this._ya][this._xb];
                    _chk2_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay1.animations.play('kill', 25, false, true);
                        delay1.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 300);
                    _combotemp+=1;
                }
                //왼 아래쪽
                if(this._xb>-1 && this._yb>-1&&bbLevel[this._yb][this._xb]!==-1&&bbLevel[this._yb][this._xb].alive){
                    var delay2 = bbLevel[this._yb][this._xb];
                    _chk2_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay2.animations.play('kill', 25, false, true);
                        delay2.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 300);
                    _combotemp+=1;
                }
                //오른 위쪽
                if(this._xa<11 && this._ya<18&&bbLevel[this._ya][this._xa]!==-1&&bbLevel[this._ya][this._xa].alive){
                    var delay3 = bbLevel[this._ya][this._xa];
                    _chk2_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay3.animations.play('kill', 25, false, true);
                        delay3.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 300);
                    _combotemp+=1;
                }
                //오른 아래쪽
                if(this._xa<11 && this._yb>-1&&bbLevel[this._yb][this._xa]!==-1&&bbLevel[this._yb][this._xa].alive){
                    var delay4 = bbLevel[this._yb][this._xa];
                    _chk2_SE_Brick_Extinction_F = true;
                    setTimeout(function () {
                        delay4.animations.play('kill', 25, false, true);
                        delay4.body.enable=false;
                        //if(bSoundSE) SE_Brick_Extinction.play();
                        }, 300);
                    _combotemp+=1;
                }
                //사운드2차취합
                if(_chk2_SE_Brick_Extinction_F){   //--2/3차 폭발사운드처리
                    setTimeout(function () {
                        if(kData.bSoundSE) SE_Brick_Extinction_F_a.play();//블록폭발파괴
                        _chk2_SE_Brick_Extinction_F=false;
                    }, 300);
                }
                //콤보2차취합
                if(_combotemp>0) {

                    setTimeout(function () {
                        var masscon = uigame.state.states.game.massiveController;
                        masscon.runTweenCombo(_combotemp);
                    }, 300);
                }
                
                //관통폭발공처리------------------------------------------------





            }//overlapHandler_through
        } //this.helpers
    //bb--------------------------------------------------------------->>
};

MassiveController.prototype = {

    numLanes: 4,					// number of lanes
    xLanePositions: [181, 303, 421, 542],	// x locations of the three lanes
    _a: 0,
    _b: 0,

    init: function () {//게임시작2-3, 게임재시작2-3 //매시브초기화 //massive init mass init

        enablePlayTime=false;
        this.RedorGreen=0;
        //디버그그래픽스
        //this.rect = new Phaser.Rectangle( 100, 100, 100, 100 ) ;
        this.circle = new Phaser.Circle( 0, 0, 10 ) ;
        //this.point = new Phaser.Point( 100, 280 ) ;
        //디버그그래픽스

        if (dm) console.log("- MassiveController.init");

        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // curScore = 0; //massi.. init
        // curLives = 3; //massi.. init

        PadAttr_bullet=false; //in init
        this.padatt = PadAttr.normal;
        this.padsize = PadSize.normal;
        this.padsizeold = PadSize.normal;
        this.ballstate = BallType.normal_n;
        this.tiles = [];
        this.ballOnPaddle = true; //초기화init
        this.redbeartimer = -1; //초기화
        this.greenbeartimer = -1; //초기화

        playtime_all_cur = playtime_all;

        this.gameState.onGameOver.add(this.onGameOver, this); //골인 내랭킹 트로피 연출
        //this.gameState.onMistake.add(this.onMistake, this);
       // this.gameState.onMistakeRecover.add(this.onMistakeRecover, this);
        this.gameState.onReleaseBalls.add(this.onReleaseBalls, this);
        this.gameState.onCopyBalls.add(this.onCopyBalls, this);

        this.gameState.onGameBegin.add(this.onGameBegun, this);

        this.gameState.onFinishLevelUI.add(this.onFinishLevelUI, this);

        //텍스쳐애니
        //uigame.time.events.loop(Phaser.Timer.QUARTER, this.utilities.setForEachTexutrAni, this); //사이렌자동차애니
        uigame.time.events.loop(Phaser.Timer.SECOND*2, this.updateBallVelocity, this);//2초당업데이트(볼속도,곰수기록)
        uigame.time.events.loop(Phaser.Timer.HALF, this.attrTimerDecrease, this);  //속성타이머 //초당업데이트


        uigame.time.events.loop(
           timeStepHorizontal,//25,
           this.moveLoopHorizontal, this);  //블록이동업데이트//블럭이동초당업데이트

        //uigame.time.events.loop(Phaser.Timer.SECOND*modeoption[3]*0.1, this.moveVerticalTime, this);  //패들충돌시에 이동하므로
        //uigame.time.events.loop(Phaser.Timer.SECOND, this.moveVerticalTime, this);  //패들충돌시에 이동하므로
        //bb----------------------------------------------------------<< create
        this.se_brickDeath = _BGame.se_brickDeath;
        this.se_powerdown = _BGame.se_powerdown;
        this.se_powerup = _BGame.se_powerup;
        this.se_recover = _BGame.se_recover;


        //인덱스게임에서 실행
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        // All walls collide except the bottom
        //this.game.physics.arcade.checkCollision.down = false;
        //인덱스게임에서 실행

        //새로추가된 //113
        this.initGameVars(); //lives, score, curLevel 초기화
        this.initLevel();
        this.createSoundsAndMusic();

        //this.game.add.sprite(0, 0, 'bg');
        //this.background = this.game.add.tileSprite(0, 0, 800, 600, "background");
        //this.background = this.game.add.sprite(0,0,"background");

        //게임값들  리셋
        //this.ballsCount = 0;
        this.countDownTime = 3;
        this.countDownTimeElapsed = 0;

        this.game.camera.setSize(this.game.world.width, this.game.world.height);
        //remove the camera bounds so we can shake it later ;)
        this.game.camera.bounds = null;

        this.createPaddle();
        this.paddle.visible = false; //in init
        //새로추가된 //113


        //여기로 이사옴
        this.tiles = this.game.add.group();//113 this.bricks = this.game.add.group();
        this.tiles.enableBody = true;
        this.tiles.physicsdBodyType = Phaser.Physics.ARCADE;

        if(dm) console.log("curLevel:"+curLevel);
        this.copyLevel(curLevel);//113 //메시브 init
        this.tiles.visible = false; //타일숨기기

        this.bounds3 = this.game.add.group();
        this.createBounds3Sprite();

        this.bounds4 = this.game.add.group();
        this.createBounds4Sprite();

        this.trails = this.game.add.group(); //피직스볼 처음 생성
        this.createtrailsSprite();

        //this.trails.z_p[ ID ][ POS ][0];
        //this.trails.z_p[ ID ][ POS ][1];

        //ball 1 --> 5, total 5
        //ball 2 --> 4, total 8
        //ball 3 --> 3, total 9
        //ball 4 --> 2, total 8
        //ball 5 --> 1, total 5

        this.balls = this.game.add.group(); //피직스볼 처음 생성
        this.createballsSprite();


        this.bullets = this.game.add.group(); //총알 생성
        this.createbulletsSprite();

        this.redBears = this.game.add.group(); //적곰생성
        this.createbearsRSprite();
        this.greenBears = this.game.add.group();//녹곰생성
        this.createbearsGSprite();

        this.navi = CreateNavi();
        this.navi.x= game.world.centerX;
        this.navi.y= this.paddlePosY;// - this.paddle.body.halfHeight - this.ball.body.halfHeight;
        //볼의바디를 계산하니 에러

        this.navi.visible = false; //초기화 숨기기

        this.copyBall1(); //패들위에 공을 배치

        this.ball.visible = false;
        //this.game.input.onDown.add(this.helpers.release, this);

        //여기도 이동
        this.items = this.game.add.group();

        this.tiles_score = this.game.add.group();
        //this.createTileScore(this.tiles_score);

        this.createHUD(); //113

        //bb---------------------------------------------------------->>
    },
    onGameBegun: function () { //게임메인ui보이기, 스코어:, 스테이지: 업데이트, 블록타일 보이기

        // 메인ui 구조
        // uiMain.z_life[3]
        //              [0].z_star
        //              [0].z_paddle
        //       .z_stageNumber
        //       .z_scoreNumber

        //메인메뉴 레벨 표시
        var ui = uigame.state.states.game.uiController.uiMain;
        MainUI=uigame.state.states.game.uiController.uiMain;
        ////this.scoreText = ui.z_scoreNumber.z_number;  //텍스트 오브젝트 가져오기
        this.stageText = ui.z_stageName;  //텍스트 오브젝트 가져오기
        //this.stageText.z_number.text = (curLevel+1)+" ";//this.stageText.text = (curLevel+1)+" ";
        //메인메뉴 레벨 표시

        curLives = MaxLife; //in onGameBegun
        //curScore = 0;
        curLines = 0;
        curComboCount = 0; //onGameBegun
        seamlessLines = 0;
        //this.livesUI = ui.z_lifestar;
        //this.livesUI.onSetLife(curLives);//in onGameBegin

        this.tiles.visible = true;

        this.uiCombo = ui.z_combo;
        uiComboGlobal = ui.z_combo;
        uiProgGlobal = ui.z_prog;


    },



    create: function () {
        if (dm) console.log("- MassiveController.create(new update)");

    },



    attrCountDecrease:function () {
        if(this.padatt === PadAttr.fixed) {

        }else{

        }
    },

    moveLoopHorizontal:function() { //블록이동초당업데이트함수//좌우스크롤//마스크스크롤//블록이동수평

        if(modeOption[0]!==0) return; 
        if(this.mskllen===0 && this.mskrlen===0) return; //마스크가 있는지

        if(//this.ballOnPaddle||
            this.gameState.gameOver
            || ispausemode
        ) return;

        //console.log("(0.025sec) moveLoop: mskloff="+this.mskloff +", msklmax:"+this.msklmax);
        if(this.mskldir===true) {//왼쪽 사라지기
            this.mskloff +=timeStepMoveOff; //min 0, max 240
            if(this.mskloff>this.msklmax) {//err:한칸부족하게 넘어감
                this.mskloff = this.msklmax;
                this.mskldir=false;              //마스크왼쪽으로만 이동방향체크
            }
        }else{                  //왼쪽 등장하기(0 -> -max)
            this.mskloff -=timeStepMoveOff;
            if(this.mskloff<0) {
                this.mskloff = 0;
                this.mskldir=true;               //마스크왼쪽으로만 이동방향체크
            }
        }
        if(this.mskrdir===true) {//오른쪽 사라지기
            this.mskroff -=timeStepMoveOff; //min 0, max -240
            if(this.mskroff<0){
                this.mskroff = 0;
                this.mskrdir=false;
            }
        }else{                  //오른쪽 등장하기(0 -> -max)
            this.mskroff +=timeStepMoveOff;
            if(this.mskroff>this.mskrmax) {
                this.mskroff = this.mskrmax;
                this.mskrdir=true;
            }

        }
        for (this._i = 0; this._i < this.mskllen; this._i++) {
            this._mskx=this.mskl[this._i][0];
            this._msky=this.mskl[this._i][1];
            this._mxobj = bbLevel[this._msky][this._mskx];
            if(this._mxobj !== -1)
                this._mxobj.x = this._mxobj.z_initx-this.mskloff;
        }
        for (this._i = 0; this._i < this.mskrlen; this._i++) {
            this._mskx=this.mskr[this._i][0];
            this._msky=this.mskr[this._i][1];
            this._mxobj = bbLevel[this._msky][this._mskx];
            if(this._mxobj !== -1)
                this._mxobj.x = this._mxobj.z_initx+this.mskroff;
        }

    },

    debugTiles:function(){
        //그리드속성출력(타일색상번호)
        // level 100(index99)    // level 1(index0)
        // 9 9 9 9 9 9 9 9 9 9 9 // - - - - - - - - - - -
        // 9 9 9 9 9 9 9 9 9 9 9 // - - - - - - - - - - -
        // 3 1 3 3 3 1 3 3 3 1 3 // - - - - - - - - - - -
        // 1 1 3 3 1 3 1 3 1 3 1 // - - - - - - - - - - -
        // 3 1 9 9 1 3 1 9 1 9 1 // - 0 - 2 - 4 - 6 - 0 -
        // 3 1 9 9 1 3 1 3 1 3 1 // - - 1 - 3 - 5 - 7 - -
        // 3 1 3 3 1 3 1 3 1 3 1 // - 0 - 2 - 4 - 6 - 0 -
        // 3 1 3 3 1 3 1 3 1 3 1 // - - 1 - 3 - 5 - 7 - -
        // 3 1 3 3 1 3 1 3 1 3 1 // - 0 - 2 - 4 - 6 - 0 -
        // 3 1 3 3 1 3 1 3 1 3 1 // - - 1 - 3 - 5 - 7 - -
        // 3 1 9 9 1 3 1 9 1 3 1 // - 0 - 2 - 4 - 6 - 0 -
        // 3 1 9 9 1 3 1 9 1 3 1 // - - 1 - 3 - 5 - 7 - -
        // 3 1 9 9 1 3 1 9 1 3 1 // - 0 - 2 - 4 - 6 - 0 -
        // 3 1 3 3 1 3 1 3 1 3 1 // - - 1 - 3 - 5 - 7 - -
        // 3 1 3 3 1 3 1 3 1 3 1 // - - - - - - - - - - -
        // 1 1 1 3 3 1 3 3 3 1 9 // - - - - - - - - - - -
        // 9 9 9 3 3 3 3 3 3 9 9 // - - - - - - - - - - -
        // 9 9 9 3 3 3 3 3 9 9 9 // - - - - - - - - - - -
        if(true) {
            var strarr1 = "";
            for (this._j = 0; this._j < gridszy; this._j++) { //y
                for (this._i = 0; this._i < gridszx; this._i++) { //x
                    if (bbLevel[this._j][this._i] === -1) {
                        strarr1 += "- ";
                    } else {
                        strarr1 += (bbLevel[this._j][this._i].z_color + " ");
                    }

                }
                strarr1 += "\n";
            }
            if(dm) console.log("----info1:\n" + strarr1);
            //그리드출력(현재 타일색상번호)

            // var strarr1_s = "";
            // for (this._j = 0; this._j < gridszy; this._j++) { //y
            //     for (this._i = 0; this._i < gridszx; this._i++) { //x
            //         if (bbLevel_coloronly[this._j][this._i] === -1) {
            //             strarr1_s += "- ";
            //         } else {
            //             strarr1_s += (bbLevel_source[this._j][this._i] + " ");
            //         }
            //
            //     }
            //     strarr1_s += "\n";
            // }
            // console.log("----info1_s:\n" + strarr1_s);
            //그리드출력(첫배치 타일색상번호)
        }


        if(false) {
        //그리드좌표출력(그리드xy)
        //( 0, 0) ( 1, 0) ... (10, 0)
        //( 0, 1) ( 1, 1) ....
        // .................. (10,17)
            var strarr2 = "";
            var vx = 0;
            var vy = 0;
            for (this._j = 0; this._j < gridszy; this._j++) { //y
                for (this._i = 0; this._i < gridszx; this._i++) { //x
                    if (bbLevel[this._j][this._i] === -1) {
                        strarr2 += "(  ,  ) ";
                    } else {
                        vx = bbLevel[this._j][this._i].z_x;
                        vy = bbLevel[this._j][this._i].z_y;
                        if (vx < 10) vx = " " + vx;
                        if (vy < 10) vy = " " + vy;
                        strarr2 += ( "(" + vx + "," + vy + ") ");
                    }
                }
                strarr2 += "\n";
            }
            if(dm) console.log("----info2:\n" + strarr2);
            //그리드출력(그리드xy)
        }
    },

    update_bbLeve:function(){

    },

    moveVertical:function() { //블록수직이동//패들충돌이후//블록스크롤
        if(modeOption[0]!==1) return; //0:노말 1:하강모드 2:보너스

        if (//this.ballOnPaddle||
        this.gameState.gameOver
        || ispausemode
        ) return;


        if (curLines < 3) { //전체 1칸씩 이동 //4칸만 이동
            for (this._i = 0; this._i < gridszx; this._i++) { //x
                for (this._j = 0; this._j < gridszy; this._j++) { //y
                    if (bbLevel[this._j][this._i] !== -1) {
                        bbLevel[this._j][this._i].y += szy;
                    }
                }
            }
            curLines += 1;
        } else {//기본4칸이동이후
            // y축 기준 맨밑칸이 빈칸이 있으면//이동
            var isEmpty=false;
            var ylast = gridszy - 1;
            for (this._i = 0; this._i < gridszx; this._i++) { //
                //x0번 컬럼라인 검사
                isEmpty = bbLevel[ylast][this._i] === -1;//-1이면 true, 아니면 false
                if (isEmpty) {//밑줄이 타일이 없으면
                         //y축 전체 1줄 밑으로
                    for (this._j = gridszy - 2; this._j>=0; this._j--) { //예:4,3,2,1,(0)제외
                        //타일1개 이동
                        bbLevel[this._j][this._i].y += szy;

                        //타일1개 그리드 좌표저장 속성 변경//밑으로 y축으로 이동
                        bbLevel[this._j][this._i].z_y = bbLevel[this._j][this._i].z_y+1;

                        //그리드1개 덮어쓰기(밑으로이동하므로)
                        bbLevel[this._j+1][this._i] = bbLevel[this._j][this._i];
                        bbLevel[this._j][this._i] = -1;                           //예전 그리드 삭제
                    }
                }
            }
            // y축 기준 맨밑칸이 빈칸이 있으면//이동
        }
        if(kData.bSoundSE) SE_Brick_Drop.play(); //벽돌내려올때
        if(dm) console.log("----moveVertical:curLines:"+curLines);
    },
    moveVerticalTime:function() { //블록수직이동//시간//블록스크롤

        //seamlessLines+=1;

        if(modeOption[1]<=seamlessLines){
            finalClearBonus = true;
        }

        if(finalClearBonus===true
        && ((modeOption[1]+18)<=seamlessLines||this.tiles.countLiving()===1)) {
            isClearBonus = true;
            return;
        }

        //x0            x1
        // :             :
        //x0            x1
        //밑으로 이동후, 다음컬럼을 이동
        for (this._i = 0; this._i < gridszx; this._i++) { //
            // console.log("this._i:"+this._i+", this._j:"+this._j);
            //y=0값 맨밑 블록 검사해서 temp저장 //0
            //맨밑줄에 있는 블록(gridszy - 1)을 가르킴
            if(bbLevel[gridszy - 1][this._i]!==-1) {
                this._tmptile = bbLevel[gridszy - 1][this._i];
            }else{
                this._tmptile = -1;
                //console.log("bbLevel[][]값이 -1이다. xy:"+this._i+","+(gridszy - 1));
            }

            //1컬럼 전체 1밑으로 이동
            for (this._j = gridszy - 2; this._j>=0; this._j--) { //예:4,3,2,1,(0)제외
                //타일1개 이동
                // console.log("-- gridxy:"+this._i
                //     +","+this._j
                //     +", y1:"+ bbLevel[this._j][this._i].y
                //     +"--before");
                bbLevel[this._j][this._i].y += szy;
                // console.log("-- gridxy:"
                //     +this._i
                //     +","+this._j
                //     +", y1:" +bbLevel[this._j][this._i].y
                //     +"--after");

                //타일1개 그리드 좌표저장 속성 변경//밑으로 y축으로 이동
                bbLevel[this._j][this._i].z_y = bbLevel[this._j][this._i].z_y+1;

                //그리드1개 덮어쓰기(밑으로이동하므로)
                bbLevel[this._j+1][this._i] = bbLevel[this._j][this._i];
                bbLevel[this._j][this._i] = -1;                           //예전 그리드 삭제
            }//1컬럼 전체 1밑으로
            
            //y축 맨 윗줄 타일 제거
            if(this._tmptile!==-1) this._tmptile.kill();

            //if(this._tmptile!==-1) {
                //블록이 있으면 그대로 위로 이동
                // bbLevel[0][this._i]=this._tmptile;
                // bbLevel[0][this._i].y = strty;
                // bbLevel[0][this._i].z_y = 0;

                // console.log("--seamlessLines:" +seamlessLines
                //     +", curX:" + this._i
                //     +", bbLevel_coloronly:" + ((gridszy-1)-(seamlessLines%gridszy))
                //     +", gridszy:" + gridszy
                //     +", istile: object"
                // );
            //}else{

                //블록생성-기존그리드위치에
                //(gridszy-1)-->맨밑줄기준 삼아
                //(seamlessLines%gridszy)-->이동한 줄수만큼 빼준다 //1줄 이동이면-->그리드 9행->8행의 속성값을 참고
                //움직이지 않는 원본 그리드에서 다음 칼라를 가져온다
                this._tmpcolor = bbLevel_coloronly[((gridszy-1)-(seamlessLines%gridszy))][this._i];

            // //디버깅
            // console.log("--seamlessLines:" +seamlessLines
            //     +", curX:" + this._i
            //     +", bbLevel_coloronly:" + ((gridszy-1)-(seamlessLines%gridszy))
            //     +", gridszy:" + gridszy
            //     +", this.color:" + this._tmpcolor
            //
            // );//디버깅


            if(-1 !== this._tmpcolor    //속성(컬러)값이 있고
            && finalClearBonus===false  //보너스클리어가 아니면
            ) {

                    this._tmptile = this.tiles.getFirstDead();

                    if(this._tmptile !== null) {

                    }else{
                        this._tmptile = this.createTile1(0, this._i, this._tmpcolor);
                        if(dm) console.log(" this.tiles.getFirstDead()값이 null이다. xy:"+this._i+","+0);
                    }

                    this._tmptile.revive();
                    this._tmptile.body.enable = true;
                    this._tmptile.alpha = 1;
                    this._tmptile.z_color = this._tmpcolor;
                    this._tmptile.z_step = 0;

                    this._tmptile.loadTexture(
                        'atlas_bb-0',
                        (this._tmpcolor === 0 ? 'block_white.png'
                            : this._tmpcolor === 1 ? 'block_crimson.png'
                                : this._tmpcolor === 2 ? 'block_red.png'		//오렌지
                                    : this._tmpcolor === 3 ? 'block_yellow.png'
                                        : this._tmpcolor === 4 ? 'block_green.png'
                                            : this._tmpcolor === 5 ? 'block_lightblue.png'     //하늘색
                                                : this._tmpcolor === 6 ? 'block_deepblue.png'     //파랑
                                                    : this._tmpcolor === 7 ? 'block_pupple.png'  //보라
                                                        : this._tmpcolor === 8 ? 'block_choco_3.png'   //하드
                                                            : this._tmpcolor === 9 ? 'block_gold.png'    //무적
                                                                : 'block_white.png')
                    );

                    this._tmptile.reset(strtx + (this._i * szx), strty);

                    bbLevel[0][this._i] = this._tmptile;
                    //bbLevel[0][this._i].z_y=0;
                    bbLevel[0][this._i].y = strty;
                    bbLevel[0][this._i].z_x = this._i;
                    bbLevel[0][this._i].z_y = 0;

                //} //타일이 -1일때 처리



                //블록생성

                //블록그리드값추가
                //bbLevel[0][this._i]=this._tmptile;
                //블록그리드값추가
            }//배열컬러값체크 //y축 맨 윗줄로 이동처리

            //this.debugTiles();
            if(kData.bSoundSE) SE_Brick_Drop.play(); //벽돌내려올때
            // console.log("this._ai:"+this._i+", this._aj:"+this._j+"--last");
        }//_i 즉 x값반복

        //----------하트를 심을 블록들을 고른다.--시작--------- y==0만 업데이트 //타임에 따라
        BonusXArr=[];
        var xidx = 0;
        //var yremain=0;//나머지를 누적치시킬 변수
        //for (var iy = 11 - 1; iy >= 0; iy--) {//맨밑에서 위로 오라오면서
            //for (var ix = 0; ix <11; ix++) { //모든 x에 대해서

        //1줄당 평균치 하트갯수 지정
        var xcnt = BonusHeartPerLine + (RemainAccum<=BonusHeartRemain?1:0);

        //1줄을 블록만 콜렉션
        for (var ix = 0; ix <11; ix++) {
            if(bbLevel[0][ix]!==-1) BonusXArr.push(ix);
        }

        //1줄 콜렉션 섞기
        BonusXArr = Phaser.ArrayUtils.shuffle(BonusXArr);
        //지정하트갯수보다 블록수가 적으면, 블럭수에 맞춘다
        if(BonusXArr.length<xcnt) xcnt = BonusXArr.length;

        for (var ix = 0; ix <xcnt; ix++) {
            xidx=BonusXArr[ix];
            if(bbLevel[0][xidx]!==-1){

                bbLevel[0][xidx].loadTexture('atlas_bb-0', 'block_heart.png');
                bbLevel[0][xidx].z_isheart = true;

                BonusLocated+=1;//이동
                if(dm) console.log("BonusLocated(ing):"+BonusLocated +", xy:"+xidx +",0");
                
                // BonusGridIdx+=1;
                // if(BonusGridIdx>=11) BonusGridIdx=0;
            }
        }//ix
        RemainAccum+=1;//한줄 움직이기 때문에//1개 추가됬다고 생각하고// 나머지의 누적치 +1증가

        //}//iy
        //----------하트를 심을 블록들을 고른다.--끝---------

        seamlessLines+=1;
    },

    attrTimerDecrease:function(){ //초당업데이트함수
        if( this.gameState.gameOver //여기서는 인풋정지용도
            || ispausemode
        ) return;
        //총알체크
        if(guntimer>0) {
            guntimer-=1;
            if(dm) console.log("guntimer:"+guntimer);
        }

        //초당속도증가
        if(!this.ballOnPaddle) {
            curVelocity += VelocityAdd;
            if (curVelocity > VelocityMax) curVelocity = VelocityMax;
            //if(hsdm) hsDebug.onSet("v", curVelocity);
        }
        if(modeOption[0]!==2
        //&& curLevel+1>=StartBearLevel) { //in attrTimerDecrease
        &&  isUseBear) { //in attrTimerDecrease
            if(this.redBears.countLiving()>0){
                if(dm) console.log("--bears--");
                var p="";
                this.redBears.forEach(function (n) {
                    if (n.alive){
                        if(dm) console.log(""+n.name+","+n.z_hitcount+", enable:"+n.body.enable);
                    }
                }, this);
            }
            if (this.redBears.countLiving() === 0 && this.greenBears.countLiving() === 0) {
                if (0 === this.RedorGreen) {

                    //적곰체크 초당
                    if (this.redbeartimer > 0) {              //곰이없고, 대기시간이 남은 상황
                        this.redbeartimer -= 1;
                    } else if (this.redbeartimer === 0) {     //곰이없고, 대기시간이 0 상황
                        this.onReleaseRedBear();                //적곰소환

                        this.RedorGreen = (this.RedorGreen+1) % 2;// uigame.rnd.integerInRange(0, 1); //적곰과 녹곰중에서 선택한다.
                        if (this.RedorGreen === 0) {
                            this.redbeartimer = BearTimeMax; //대기시간 충전
                            this.greenbeartimer = -1;
                        } else {
                            this.redbeartimer = -1;
                            this.greenbeartimer = BearTimeMax; //대기시간충전
                        }
                    } else {
                        //마이너스상황
                    }
                } else {//rnd===1

                    //녹곰체크 초당
                    if (this.greenbeartimer > 0) {              //곰이없고, 대기시간이 남은 상황
                        this.greenbeartimer -= 1;
                    } else if (this.greenbeartimer === 0) {     //곰이없고, 대기시간이 0 상황
                        this.onReleaseGreenBear();                //녹곰소환

                        this.RedorGreen = (this.RedorGreen+1) % 2;//uigame.rnd.integerInRange(0, 1); //적곰과 녹곰중에서 고른다.
                        if (this.RedorGreen === 0) {
                            this.redbeartimer = BearTimeMax;
                            this.greenbeartimer = -1;
                        } else {
                            this.redbeartimer = -1;
                            this.greenbeartimer = BearTimeMax;
                        }

                    } else {
                        //마이너스상황
                    }

                }//if rnd
            }//bearcount
            if(dm) console.log("redtime:"+this.redbeartimer+", green:"+this.greenbeartimer);

        }//curLevel+1>=StartBearLevel //보너스를 제외한모드, 곰사용가능한 모드,

        //console.log("-------------blockCountAll:"+this.tiles.countLiving()+",Gold:"+this.countgoldcur);


            //엔딩시작체크 및 타일수체크
        if(ending_step === _steps.none){ //초당체크
            //골드블록숫자 만큼 블록이 남으면 남은 블록갯수 감시
            this._cntliving = this.tiles.countLiving();
            //현재블럭숫자가 초기골드블록보다 적을때
            if( ((modeOption[0]===0 || modeOption[0]===1) && this._cntliving<=this.countgold)
                || ( modeOption[0]===2 && isClearBonus===true )) {
                //골드갯수체크
                var gcnt = 0;
                this.tiles.forEach(function (n) {
                    if (n.alive && n.z_color === 9) {         //무적9//초코블록8
                        gcnt += 1;                            //현재골드블록만 숫자세기
                    }
                }, this);
                this.countgoldcur = gcnt;
                //클리어조건 달성
                if ( ((modeOption[0]===0 || modeOption[0]===1) && this._cntliving <= this.countgoldcur)
                    || ( modeOption[0]===2 && isClearBonus===true)) { //현재블록갯수<=현재골드갯수이면(골드만 남앗으면)

                    //레벨클리어조건이 됨
                    this.hideTrails();//25버전 트레일 숨기기 --- 레벨 클리어시

                    //엔딩연출시작
                    ending_step = _steps.begin; //다시 여기 진입못하게

                    curVelocity = 0; //2초당업데이트에서 속도가 남아서 움직이므로, endgame에 넣엇엇는데...안되는 경우가 잇어서 여기로

                    this.ballOnPaddleTweening = true;             //패들정지용도

                    //클리어-무적블록 폭발연출
                    this.onStopObjAll(); //볼,아이템,적곰,총알 정지
                    this.onBurstObjAll();
                    var massive = uigame.state.states.game.massiveController;

                    setTimeout(function () {

                        spn_paddle_out.x = Paddle.x;
                        spn_paddle_out.y = Paddle.y;
                        spn_paddle_out.setAnimationByName(4, "paddle_out", false);

                        if (TweenMax.isTweening(Paddle)) TweenMax.killTweensOf(Paddle);
                        Paddle.visible = false;
                    },
                        burstBrickTime
                    );

                    setTimeout(function () {
                        //massive.playanimPadDeath(massive.padsize);//패들사망연출 //게임클리어

                        // setTimeout(function () {
                        //     if (TweenMax.isTweening(Paddle)) TweenMax.killTweensOf(Paddle);
                        //     Paddle.visible = false;
                        // }, 0.25);
                        ending_step = _steps.end;
                    }, burstBrickTime + 500);
                    //클리어-무적블록 폭발연출

                }//현재블록수<=현재골드 이면 클리어연출진행
            }//현블록갯수<=초기골드


        }
        //엔딩연출끝단계에 도달시 ui출력
        if( ending_step === _steps.end) {
            this.ballOnPaddleTweening=false; //패들정지풀기용도
            this.gameState.gameOver=true;//여기서는 인풋정지용도, 초당 업데이트도 중지됨

            //tweenText( this.scoreText, +1000);

            var fn = this.finishLevelUI; //클리어 초당 업데이트
            setTimeout(function () {
                if (game.state.current !== "game") return;
                fn();
            }, 0.75);

        }

        //1초전 메달 복구 해주려고 초당업데이트 맨나중에 저장
        //medalbefore1sec = MainUI.z_prog.onGetMedalByBias(playtime_clock / playtime_clock_max);


        if(dm) console.log( "(1sec) isRed: "+this.RedorGreen);
        if(dm) console.log( "(1sec) redTime: "+this.redbeartimer +", greenTime:"+this.greenbeartimer );
        if(dm) console.log( "(1sec) tiles:"+ this.tiles.countLiving() +", gold:"+ this.countgold);
        if(dm) console.log( "(1sec) balltype:"
            + (this.ballstate===BallType.normal_n?"normal_n"
                :this.ballstate===BallType.normal_s?"normal_s"
                :this.ballstate===BallType.normal_b?"normal_b"
                :this.ballstate===BallType.through_n?"through_n"
                :this.ballstate===BallType.through_s?"through_s"
                :this.ballstate===BallType.through_b?"through_b"
                :this.ballstate===BallType.bomb_n?"bomb_n"
                :this.ballstate===BallType.bomb_s?"bomb_s"
                :this.ballstate===BallType.bomb_b?"bomb_b"
                :this.ballstate===BallType.throughbomb_n?"throughbomb_n"
                :this.ballstate===BallType.throughbomb_s?"throughbomb_s"
                :this.ballstate===BallType.throughbomb_b?"throughbomb_b"
                :"err")
            +", padtype:"
            + (this.padatt===PadAttr.normal?"normal"
                :this.padatt===PadAttr.fixed?"fixed"
                :"err")
        );

    },
    updateBallVelocity:function() { //2초당업데이트
        if(this.gameState.gameOver
            || this.ballOnPaddle
            || ispausemode
        ) return;
        //공속도 업데이트
        this.balls.forEach(function (n) { if (n.alive) { //모든 볼의 속도를 증가시켜주려고
                accelerateToXYFromLocal(n, n.body.velocity.x, n.body.velocity.y, curVelocity);
            }
        }, this);
        //곰갯수체크
        //var aa = this.redBears.countLiving();//곰생성추적 2초업데이트
        //var ab = this.greenBears.countLiving();//곰생성추적 2초업데이트
        //console.log("update red:"+aa+", green:"+ab);
    },


    finishLevelUI: function(){ //초당검사에서 클리어창오픈
        if(game.state.current!=="game") return;
        var stgame = uigame.state.states.game;
        if (stgame.uiController.uiClearLevel.visible === false) {
            selectBGM("none", true);
            //stgame.uiController.uiClearLevel.onSetCl( curLevel, (convertTimeFormatFromSec(float2int(playtime_clock) - 1)));
            //var _medal = MainUI.z_prog.onGetMedalByBias(playtime_clock / playtime_clock_max);
            //if(medalbefore1sec>_medal){//메달복구
            //
            //}
            stgame.uiController.uiClearLevel.onSetCl( curLevel, MainUI.z_prog.z_timer.text);
            stgame.uiController.uiClearLevel.onActiveCl(curMyStars>=3?true:false, true);
        }

    },


    startContinue: function() {
          //this.livesUI.onSetLife(curLives); //in startContinue

            this.paddle.visible = false; //in start continue
            TweenMax.delayedCall( 0.25,
                function () {
                    //시작연출-레디고
                    var stgame = uigame.state.states.game;
                    //console.log("introshow in starcontinue");
                    TweenMax.delayedCall(0.5,function() { stgame.massiveController.introShow(); });//인트로시작1?
                    //레디고플레이
                    stgame.uiController.uiReadyGo.visible = true;
                    stgame.uiController.uiReadyGo.z_spine.setAnimationByName(1, "ready_go_ani", false); //in startContinue
                    //엠프티에러//stgame.uiController.uiReadyGo.z_spine.addAnimationByName(0, "empty", false);

                    //stgame.massiveController.introShow();
                    //시작연출-레디고
                }
            );
    },

    onFinishLevelUI: function(){//비어있음

    },

    onStopObjAll: function(){
        //공속도0
        this.balls.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(0);
            }//if n.alive
        }, this);
        //아이템속도0
        this.items.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(0);
            }//if n.alive
        }, this);
        //총알속도0
        this.bullets.forEach(function (n) {//총알제거 //총알은 바로 제거
            if (n.alive) {
                n.kill();// n.body.velocity.set(0);
            }
        }, this);
        //총알끄기,총알속성끄기
        guntimer=0;
        gunstate = ThreeState.end;
        PadAttr_bullet=false; //in onStopObjAll
        
        //총구끄기
        this.paddle.z_left.visible=false;
        this.paddle.z_right.visible=false;
        //총구끄기
        
        //적곰속도0
        this.redBears.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(0);
            }
        }, this);
        //녹곰속도0
        this.greenBears.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(0);
            }
        }, this);
    },
    onPauseSaveVelocity: function(){
        if(dm) console.log("----onPauseSaveVelocity---");
        //공속도0
        this.balls.forEach(function (n) {
            if (n.alive) {
                n.z_velx = n.body.velocity.x;
                n.z_vely = n.body.velocity.y;
                n.body.velocity.set(0);
            }//if n.alive
        }, this);
        //아이템속도0
        this.items.forEach(function (n) {
            if (n.alive) {
                n.z_velx = n.body.velocity.x;
                n.z_vely = n.body.velocity.y;
                n.body.velocity.set(0);
            }//if n.alive
        }, this);
        //총알속도0
        // this.bullets.forEach(function (n) {//총알제거 //총알은 바로 제거
        //     if (n.alive) {
        //         n.z_velx = n.body.velocity.x;
        //         n.z_vely = n.body.velocity.y;
        //         n.body.velocity.set(0);
        //     }
        // }, this);
        // var stgame = uigame.state.states.game;
        // stgame.massiveController.bullets.forEach(function (n) {//총알제거 //총알은 바로 제거
        //     if (n.alive) {
        //         n.kill();// n.body.velocity.set(0);
        //     }
        // }, stgame.massiveController);
        this.bullets.forEach(function (n) {//총알제거 //총알은 바로 제거
            if (n.alive) {
                n.kill();// n.body.velocity.set(0);
            }
        }, this);

        //적곰속도0
        this.redBears.forEach(function (n) {
            if (n.alive) {
                n.z_velx = n.body.velocity.x;
                n.z_vely = n.body.velocity.y;
                n.body.velocity.set(0);
            }
        }, this);
        //녹곰속도0
        this.greenBears.forEach(function (n) {
            if (n.alive) {
                n.z_velx = n.body.velocity.x;
                n.z_vely = n.body.velocity.y;
                n.body.velocity.set(0);
            }
        }, this);
    },
    onPauseLoadVelocity: function(){
        if(dm) console.log("----onPauseLoadVelocity---");
        //공속도0
        this.balls.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(n.z_velx, n.z_vely);
            }//if n.alive
        }, this);
        //아이템속도0
        this.items.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(n.z_velx, n.z_vely);
            }//if n.alive
        }, this);
        // //총알속도0
        // this.bullets.forEach(function (n) {//총알제거 //총알은 바로 제거
        //     if (n.alive) {
        //         n.body.velocity.set(n.z_velx, n.z_vely);
        //     }
        // }, this);

        //적곰속도0
        this.redBears.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(n.z_velx, n.z_vely);
            }
        }, this);
        //녹곰속도0
        this.greenBears.forEach(function (n) {
            if (n.alive) {
                n.body.velocity.set(n.z_velx, n.z_vely);
            }
        }, this);
    },
    onBurstObjAll: function(){
        //공속도0
        var i=0;
        var masscon = uigame.state.states.game.massiveController;
        this.balls.forEach(function (n) {
            if (n.alive) {
                n.kill();
                // i+=35;
                // setTimeout(function () {
                //     n.animations.play('killpoint', 25, false, true);
                //     if(bSoundSE) SE_Brick_Extinction.play();
                //     }, i);
            }//if n.alive
        }, this);
        burstBrickTime=this.tiles.countLiving()*50;
        this.tiles.forEach(function (n) {
            if (n.alive) {
                i+=50;
                setTimeout(function () {
                    n.animations.play('killpoint', 25, false, true);
                    // masscon.runTweenCombo(ScoreGold0, n.x, n.y, 1);           //남은 블록 점수
                    if(kData.bSoundSE) SE_InvincibleBrick_Blow_01.play(); //엔딩 무적블록터지는 연출사운드
                }, i);
            }//if n.alive
        }, this);
        //아이템속도0
        this.items.forEach(function (n) {
            if (n.alive) {
                n.kill();
                // i+=35;
                // setTimeout(function () {
                //     n.animations.play('killpoint', 25, false, true);
                //     if(bSoundSE) SE_Brick_Extinction.play();
                // }, i);

            }//if n.alive
        }, this);
        //총알속도0
        this.bullets.forEach(function (n) {//총알제거
            if (n.alive) {
                n.kill();
                //n.body.velocity.set(0);
            }
        }, this);
        //적곰속도0
        this.redBears.forEach(function (n) {
            if (n.alive) {
                n.kill();
                //n.body.velocity.set(0);
            }
        }, this);
        //녹곰속도0
        this.greenBears.forEach(function (n) {
            if (n.alive) {
                n.kill();
                //n.body.velocity.set(0);
            }
        }, this);
        ending_step = _steps.step1;
        //burstBrickTime=i;
    },
    onGameOverUI: function(){ //게임오버창오픈
        if(game.state.current!=="game") return;
        var stgame = uigame.state.states.game;
        if (stgame.uiController.uiGameOver.visible === false) {
            selectBGM("none", true);
            stgame.uiController.uiGameOver.onActiveGv();
        }
    },

    onReleaseStart: function(){
        if(!uigame.state.states.game.gameBegun) return;
        //if(!this.gameState.gameBegun) return;
        if(this.gameState.gameOver) return;

        var gg = uigame.state.states.game;
        if(intro_fin === false) return;

        if(dm) console.log('--onReleaseStart--');

        if (this.ballOnPaddle) { //패들시작모드일때

            this.initTrails(); //25버전개조-트레일초기화
            this.setTrails(); //25버전개조-트레일

            this.ballOnPaddle = false;
            this.ballOnPaddleTweening=true;

            //공통적용//물리크기설정
            //1://
            this.paddle.body.setSize(this.paddle.width / this.paddle.scale.x, this.paddle.height / this.paddle.scale.y);

            //2://
            // var szx=this.paddle.width / this.paddle.scale.x;
            // var szy=(this.paddle.height / this.paddle.scale.y)*3;
            // var offx=0;
            // var offy=0;
            // this.paddle.body.setSize(szx, szy, offx, offy);
            //2://

            this.boundLeftOffsetByPaddle = 28 + this.paddle.body.halfWidth;
            this.boundRightOffsetByPaddle = 720 - 28 - this.paddle.body.halfWidth;

            BoundLeftOffsetByPaddle=this.boundLeftOffsetByPaddle;
            BoundRightOffsetByPaddle=this.boundRightOffsetByPaddle;

            BoundTopOffsetByPaddle= this.paddlePosY-110;
            BoundBottomOffsetByPaddle=this.paddlePosY+110;

            //공통적용


            if(inputmode===InputMode.keyboard) {
                this.ballOnPaddleTweening=false;
            }else{
                //마우스모드일때만 트윈연출모드
                var pd = this.paddle;
                var ipx = this.game.input.x;
                // TweenMax.to(pd, 0.5, {
                //     x: ipx, ease: Linear.easeNone, onComplete: function () {
                //         gg.massiveController.ballOnPaddleTweening = false;
                //     }
                // });
                TweenMax.to(pd, 0.5, {
                    x: xc, ease: Linear.easeNone, onComplete: function () {
                        gg.massiveController.ballOnPaddleTweening = false;
                    }
                });
            }


            curVelocity = VelocityInit;
            playtime_cur =0; //in massive..OnReleaseStart()//플레이타임
            var ag = uigame.physics.arcade.angleBetween(this.paddle, this.ball);

            //미친다

            if(dm) console.log("this.navi._angle:"+this.navi._angle);

            // html:0-->phaser:360
            // html:90-->phaser:270
            // htm1:180         180
            uigame.physics.arcade.velocityFromAngle( (360-this.navi._angle),  curVelocity, this.ball.body.velocity ); //각도
            // var rad = Phaser.Math.degToRad(this.navi._angle);
            // uigame.physics.arcade.velocityFromRotation(
            //     rad,
            //     curVelocity,
            //     this.ball.body.velocity
            // );//라디언
            //this.introText.visible = false;
            //애니볼이면 //ball.animations.play('spin');
            if(curLives===MaxLife               //첫 시작부터
            //&& curLevel+1>=StartBearLevel       //등장가능레벨
            && isUseBear
            && modeOption[0]!==2                //일반모드
            ) {   //곰시작가능레벨부터 in onReleaseStart
                // BearTimeMax = float2int(40 - ((curLevel + 1) / 10));
                // BearTimeMax = float2int(40 - ((curLevel + 1) / 10));

                this.RedorGreen=0;
                if(0===this.RedorGreen){
                    this.redbeartimer = BearTimeMax; //적곰 타이머 첫시작
                }else{
                    this.greenbeartimer = BearTimeMax; //녹곰 타이머 첫시작
                }

            }
            this.navi.onHideNv();

            //ending_fin=false;
            //ending_fin_begin=false;
            ending_step = _steps.none;

            enablePlayTime=true;
        }else {
            //예외처리: 게임오버상태에서 다시 시작처리
            if (curLives === 0) { //라이프가 없을때 클릭시(볼 릴리즈 타이밍) in onReleaseStart
                if(dm) console.log("-------------- crazy err!!! --------------------");
                uigame.state.states.game.endGame(); //벽돌게임오버 in onReleaseStart
            }else{
                //점착속성처리
                this.onReleaseBalls();
            }
        }
    },

    onReleaseBalls: function() {
        if(dm) console.log('--onReleaseBalls--');
        if(this.padatt === PadAttr.fixed) {
            this._rk = this.fixedballs.length;
            if (this._rk > 0) {
                for (this._ri = 0; this._ri < this._rk; this._ri++) {
                    // if(false) {
                    //     this.fixedballs[this._ri].body.velocity.set(
                    //         curVelocity * (this.fixedballs[this._rk].z_xoff / this.paddle.body.halfWidth), //generateRandomNumber(-75, 75), //-592 417
                    //         -700  //generateRandomNumber(-150, -150) //-350 -310
                    //     );
                    // }
                    if(this.fixedballs[this._ri].alive) {
                        var ag = uigame.physics.arcade.angleBetween(this.paddle, this.fixedballs[this._ri]);
                        uigame.physics.arcade.velocityFromRotation(ag, curVelocity, this.fixedballs[this._ri].body.velocity);

                        if(dm) console.log("-------------- shoot velocity: "+this.fixedballs[this._ri].body.velocity.x+","+this.fixedballs[this._ri].body.velocity.y);
                    }
                }

                this.fixedballs=[];
                //릴리스카운트 감소시키고 0이면 처리
                if(this.releasetimer>0) this.releasetimer-=1;
                if(this.releasetimer===0){                          //부착속성이 소멸햇으면
                    if(PadAttr.normal!==this.padatt) {              //패들이 노말속성이 아니면 노말속성으로
                        this.padatt = PadAttr.normal;
                        this.setPadSizeDirect(this.padsize);
                    }
                }
            }//배열크기 0보다 크면


        }//부착속성이면
    },

    //예전 플로팅스코어를 수정하여 콤보메세지로 사용
    runTweenCombo: function(combos) {
        if(ending_step !== _steps.none) return;
        if(modeOption[0]===2) return;
        //curScore += score;
        //스코어보드 업데이트
        //this.scoreText.text = getMoneyFormatFromNum(curScore)+" "; //in runTweenCombo

        if(false) {
            // //플로팅스코어텍스트 애니메이션
            // if (x1 === undefined || y1 === undefined) return;
            //
            // var sc1 = this.tiles_score.getFirstDead();//부활시킬 한개를 가져온다.
            // if (sc1 !== null && sc1 !== undefined) { //이상없으면
            //     sc1.revive();//"alive"상태로
            //     sc1.text = score;
            //     TweenMax.set(sc1, {alpha: 1, x: x1, y: y1});
            //     TweenMax.to(sc1, 0.5, {
            //         y: "-=100", alpha: 0, ease: Linear.easeNone, onComplete: function () {
            //             sc1.kill();
            //         }
            //     });
            // }
            // //플로팅스코어텍스트 애니메이션
        }
        curComboCount+=combos;
        if(combos!==undefined && combos>0){ //콤보텍스트 애니
            //전 트윈 제거
            if (TweenMax.isTweening(this.uiCombo)) {
                TweenMax.killTweensOf(this.uiCombo);
            }
            //콤보 숫자 적용
            this.uiCombo.onSetNumber(curComboCount);
            //위치고정도 필요없어서 주석
            //this.uiCombo.position.setTo(this.uiCombo.z_xinit, this.uiCombo.y_xinit);
            //보이기
            this.uiCombo.onShow();

            //트윈적용
            //var combo = this.uiCombo;
            //로컬이동트윈
            // TweenMax.set(combo, {alpha: 1});
            // TweenMax.to(combo, 0.5, {
            //     //y: "-=100",
            //     alpha: 0,
            //     ease: Linear.easeNone,
            //     onComplete: function () { combo.onHide(); },
            //     //onUpdate: function () { console.log(combo.y); }
            //     dealy:0
            // });
            TweenMax.set(uiComboGlobal.scale, {x: 0.8, y:0.8});
            TweenMax.to(uiComboGlobal.scale, 0.5, {
                //y: "-=100",
                x: 1.0,
                y: 1.0,
                ease: Elastic.easeOut,//ease: Linear.easeNone,
                onComplete: function () { uiComboGlobal.onHide(); },
                //onUpdate: function () { console.log(combo.y); }
                dealy:0
            });

            // playtime_clock+=curComboCount;
            // if(playtime_clock>=playtime_clock_max+1) {
            //     //맥스타임이면
            //     playtime_clock=playtime_clock_max+1;
            // }else {
            //     //맥스타임이 아니면
            //     uiProgGlobal.onTweenSec(curComboCount);
            // }
        }
        //플로팅스코어텍스트 애니메이션
    },
    onCopyBalls: function() {
        //this.helpers.releaseAll();
        if(dm) console.log('--onCopyBalls--');
        this.copyBalls(); //in onCopyballs
    },
    onReleaseRedBear: function(){ //적곰풀기
        this.releaseBear("red");
    },
    onReleaseGreenBear: function(){ //적곰풀기
        this.releaseBear("green");
    },
    releaseBear: function (bearcolor) {
        if(kData.bSoundSE) SE_BearJelly_Produce.play();

        var bear1;
        if(bearcolor==="red") bear1 = this.redBears.getFirstDead();
        else bear1 = this.greenBears.getFirstDead();//bearcolor==="green"

        bear1.body.enable=true; //죽을때 false이므로, 살아날때 true
        bear1.alpha=1;

        var xp = uigame.rnd.integerInRange(xc-100, xc+100);
        var yp = uigame.rnd.integerInRange(yc, yc-200);
        bear1.reset(xp,yp);
        bear1.z_hitcount=0;

        var ag = uigame.physics.arcade.angleToXY(bear1, xc, yc-100);

        //애니메이션 실행
        if(bearcolor==="red") {
            uigame.physics.arcade.velocityFromRotation( ag, this.redBearVel, bear1.body.velocity);
            bear1.animations.play('redbearshow', 35, false, undefined); //1time
        }
        else{
            uigame.physics.arcade.velocityFromRotation( ag, this.greenBearVel, bear1.body.velocity);
            bear1.animations.play('greenbearshow', 35, false, undefined); //1time
        }
        //물리크기
        bear1.body.setSize(bear1.width - 40, bear1.height - 40, 20, 20);

        TweenMax.killTweensOf(bear1);
        TweenMax.fromTo( bear1, 10, { rotation: 0 }, { rotation: 6.28, ease:Linear.easeNone, repeat: -1 } );//곰트윈 //적곰,녹곰
        bear1.body.enable=true;
        bear1.alpha=1;
    },

    randloop: function () { //부스터 쿨타임 랜덤 루프 //아직 안사용
        this.rndidx += 1;
        if (this.rndidx > 9) this.rndidx = 0;
        return this.rndarr[this.rndidx];
    },

    //구조: 캐쉬배열에 같은이름으로 갯수만큼저장
    //cachedVehicles = {
    //    key1:[sprA1, sprA2, sprA3,...], <--loopcount
    //    key2:[sprB1, sprB2, sprB3,...],
    //    key3:...
    //}
    //'game_a'
    cacheVehicle: function (atlas, key, loopcount) {
        if (dm) console.log("- MassiveController.cacheVehicle(" + key + ")");
        this.cachedVehicles[key] = [];
        this.vehicleSpawnList.push(key);
        // cache a vehicle of each type per lane - this is enough since there can't be more than one vehicle per lane
        for (this._i2 = 0; this._i2 < loopcount; ++this._i2) {
            this.tmpVehicle = this.vehicles.create(0, 0, atlas, key);
            //var anim = this.tmpVehicle.animations.add(key, [key + '.png']);

            //rb
            this.game.physics.enable(this.tmpVehicle, Phaser.Physics.ARCADE);
            //this.tmpVehicle.body.collideWorldBounds = true;
            //this.tmpVehicle.body.checkWorldBounds = true;
            this.tmpVehicle.body.bounce.set(1);//(1);
            //this.paddle.body.immovable = true;
            //rb

            //this.tmpVehicle.body.setSize(anim.currentFrame.sourceSizeW, anim.currentFrame.sourceSizeH);
            this.tmpVehicle.body.setSize(this.tmpVehicle.body.width - 20, this.tmpVehicle.body.height - 20, 10, 10);

            this.tmpVehicle.anchor.setTo(0.5, 0.5);
            this.tmpVehicle.lane = -1;
            this.tmpVehicle.name = key;
            this.tmpVehicle.angle = 0;
            this.tmpVehicle.inWorld = false;
            this.tmpVehicle.isPlayerVehicle = false;
            this.tmpVehicle.initialDifficulty = 0; // necessary to slow down vehicle when 'powerup_slow' powerup is collected
            this.tmpVehicle.checkWorldBounds = true;

            this.tmpVehicle.frm = 0;
            this.tmpVehicle.frmmax = 2;

            //작동안되서 주석처리
            // this.tmpVehicle.events.onEnterBounds.add(function () { if (dm) console.log("----onEnterBounds----" + this.tmpVehicle.name); }, this);
            // this.tmpVehicle.events.onKilled.add(function () { if (dm) console.log("----onKilled----" + this.tmpVehicle.name); }, this);
            // this.tmpVehicle.events.onRevived.add(function () { if (dm) console.log("----onRevived----" + this.tmpVehicle.name); }, this);
            // this.tmpVehicle.events.onAddedToGroup.add(function () { if (dm) console.log("----onAddedToGroup: ----" + this.tmpVehicle.name); }, this);
            //작동안되서 주석처리

            this.tmpVehicle.kill();

            if (true) { //리스토어 이벤트
                this.tmpVehicle.events.onOutOfBounds.add(this.restoreVehicleToCache, this);
            }
            if (false) { //리스토어 콜솔로그
                this.tmpVehicle.events.onOutOfBounds.add(function () {
                    if (dm) console.log("----onOutOfBounds----" + this.tmpVehicle.name);
                }, this);
            }
            this.cachedVehicles[key].push(this.tmpVehicle);
        }
    },
    //sprite 1개를 캐쉬배열에 저장한다. key1:[spr1],
    cachePlayerVehicle: function (key) {
        if (dm) console.log("- MassiveController.cachePlayerVehicle(" + key + ")");

        this.tmpVehicle = this.vehicles.create(0, 0, 'game_a', key);
        //var anim = this.tmpVehicle.animations.add(key, [key + '.png']);
        //rb
        this.game.physics.enable(this.tmpVehicle, Phaser.Physics.ARCADE);
        this.tmpVehicle.body.collideWorldBounds = true;
        this.tmpVehicle.body.bounce.set(1);//(1);

        //this.paddle.body.immovable = true;
        //rb

        //this.tmpVehicle.body.setSize(anim.currentFrame.sourceSizeW, anim.currentFrame.sourceSizeH);
        this.tmpVehicle.body.setSize(this.tmpVehicle.body.width - 20, this.tmpVehicle.body.height - 20, 10, 10);
        //this.tmpVehicle.body.setSize(100, 50, 50, 25);

        this.tmpVehicle.anchor.setTo(0.5, 0.5);
        this.tmpVehicle.lane = -1;
        this.tmpVehicle.name = key;
        this.tmpVehicle.inWorld = false;
        this.tmpVehicle.isPlayerVehicle = true;
        this.tmpVehicle.kill();
        this.cachedVehicles[key] = this.tmpVehicle;
    },
    //sprite 1개를 캐쉬배열에 저장한다. key1:[spr1],
    cacheBooster: function (key)//<--cachePlayerVehicle복제품 //캐쉬부스터
    {
        this.tmpBooster = this.boosters.create(0, 0, 'game_a', key);
        //var anim = this.tmpVehicle.animations.add(key, [key + '.png']);
        //rb
        this.game.physics.enable(this.tmpBooster, Phaser.Physics.ARCADE);
        this.tmpBooster.body.collideWorldBounds = true;
        this.tmpBooster.body.bounce.set(1);//(1);

        //this.paddle.body.immovable = true;
        //rb

        //this.tmpVehicle.body.setSize(anim.currentFrame.sourceSizeW, anim.currentFrame.sourceSizeH);
        this.tmpBooster.body.setSize(this.tmpBooster.body.width - 20, this.tmpBooster.body.height - 20, 10, 10);
        //this.tmpVehicle.body.setSize(100, 50, 50, 25);

        this.tmpBooster.anchor.setTo(0.5, 0.5);
        this.tmpBooster.lane = -1;
        this.tmpBooster.name = key;
        this.tmpBooster.inWorld = false;
        this.tmpBooster.isPlayerVehicle = true;
        this.tmpBooster.kill();
        this.cachedBoosters[key] = this.tmpBooster;
        // //--
        // var pic = uigame.add.sprite(0, 0, 'game_a', 'gauge_1.png');
        // pic.anchor.setTo(0.5, 0.5);
        // this.tmpVehicle.addChild(pic);
        // //--
        if (true) { //리스토어 이벤트 //부스터는 트리거박스(오버랩)이다보니 작동 안됨
            this.tmpBooster.events.onOutOfBounds.add(this.restoreBoosterToCache, this);
        }
    },

    canSpawnVehicle: function () //라인이 꽉차면 스폰을 안한다.
    {
        return this.numAvailableLanes > 0;//---------------------------------------------------
    },

    spawnVehicle: function (key, occupiesLane, isPlayerVehicle, lane, aistyle, aidir)//스폰비클
    {
        this.spawncnt += 1;
        if (dm) console.log("- MassiveController.spawnVehicle(" + key + ", " + occupiesLane + ", " + isPlayerVehicle + "), spawncnt:" + this.spawncnt);

        //안사용
        if (isPlayerVehicle) this.tmpVehicle = this.cachedVehicles[key];
        else this.tmpVehicle = this.cachedVehicles[key].pop();
        //안사용

        this.tmpVehicle.lane = lane; //this.tmpVehicle.lane = this.availableLanes[this._lane];

        this.tmpVehicle.reset(this.xLanePositions[this.tmpVehicle.lane], this.yPositionSpawnOffset);


        cars_baisVelocity = 100.0 / cars_velocity; //리스폰용
        this.tmpVehicle.body.velocity.y = cars_velocity;

        if (occupiesLane) {
            this.lanesInUse[this.tmpVehicle.lane] = true;
            this.gameState.onVehicleSpawned.dispatch(this.tmpVehicle);
        }
    },

    restoreVehicleToCache: function (vehicle)//리스토어 함수 //해당차량을 제거한다.
    {
        if (dm) console.log("- MassiveController.restoreVehicleToCache(" + vehicle.name + ", xy:" + vehicle.x + "," + vehicle.y + ")");
        if (0 > vehicle.y) return; //화면상단 위에 있으면 리턴
        TweenMax.killTweensOf(vehicle);
        vehicle.kill();
        vehicle.inWorld = false;

        if (this.cachedVehicles && !vehicle.isPlayerVehicle) //적 차량이면
            this.cachedVehicles[vehicle.name].push(vehicle); //전체차량캐쉬에 저장

        // don't affect lanes in use for intro truck, prevents double spawn on middle lane
        if (vehicle !== this.introTruck)                     //모든차량(인트로트럭만 빼고)
        {
            if (this.lanesInUse && !vehicle.isPlayerVehicle) //적차량이면
                this.lanesInUse[vehicle.lane] = false;       //사용 차선을 꺼준다
        }
        else
            this.introTruck = null;                         //인트로트럭이면 인트로트럭 차량을 없애준다

        if (dm) console.log("restored " + vehicle.name + " to cache");
    },

    //부스터는 트리거박스(오버랩)이다보니 작동 안됨
    restoreBoosterToCache: function (booster)//리스토어 함수 //부스터 제거한다.
    {

    },
    //헷갈리게 해서 안사용
    // onPauseModeBegin: function () {
    //     ispausemode=true;
    //     this.onPauseSaveVelocity();
    // },
    // onPauseModeEnd: function () {
    //     ispausemode=false;
    //     this.onPauseLoadVelocity();
    // },

    onGameOver: function () { //모든차량속도0
        //여기서 에러 발생
        //if (dm) console.log("- MassiveController.onGameOver(vehicles.length:" + this.vehicles.length + ")");

        // when game is over stop all vehicles
        //this.vehicles.forEachAlive(this.utilities.zeroVelocity, null); //onGameOver
    },
    // onMistake: function () {
    //     if (dm) console.log("- MassiveController.onMistake(vehicles.length:" + this.vehicles.length + ")");
    //
    //     this.vehicles.forEachAlive(this.utilities.reverseVelocity, null); //onMistake
    //
    //
    // },
    // onMistakeRecover: function () {
    //     if (dm) console.log("----MassiveController.onMistake(vehicles.length:" + this.vehicles.length + ")");
    //
    //     this.vehicles.forEachAlive(this.utilities.reverseVelocity, null); //onMistakeRecover
    // },

    followPaddle: function(){
        this.ball.body.velocity.set(0);
        this.ball.x = this.paddle.x;//-this.ball.body.halfWidth;
        //패들노말 이동시 공배치
        this.ball.y = this.paddle.y - this.paddle.body.halfHeight - this.ball.body.halfHeight;
        //패들2배높이 이동시 공배치
        //this.ball.y = this.paddle.y - (this.paddle.body.halfHeight/2) - this.ball.body.halfHeight;
    },

    update: function () { //메인업데이트//매시브업데이트//메시브업데이트//massupdate //람보에러
        //true;

        // if(this.updatecnt<10) {
        //     console.log("- MassiveController.update "+this.updatecnt);
        //     this.updatecnt+=1;
        // }
        //return;

        if (ispausemode) return;

        // var s="";
        // this.balls.forEach(function (n) {
        //     if (n.alive) {
        //         s+= ("a -- "+n.name+"(xy:"+n.x+","+n.y+", vel:"+n.body.velocity+")" + ", pd:"+this.paddle.x+","+this.paddle.y);
        //     }
        // }, this);
        // console.log(s);


        if (this.gameState.gameBegun
            && !this.gameState.gameOver) {

            this.DtSec = this.game.time.elapsed * 0.001;

            //console.log("playtime_clock:"+playtime_clock+", playtime_cur:"+playtime_cur);
            if(playtime_clock<0){
                uigame.state.states.game.endGame();
            }
            if(playtime_clock<warning_min_time){
                if(modeOption[0]!==2 && uiWarningGlobal.visible===false) uiWarningGlobal.onShow();
            }

            //초당속도증가
            // curVelocity+=(this.DtSec*10);
            // console.log("curVelocity:"+curVelocity);
            // if(curVelocity>VelocityMax) curVelocity = VelocityMax;

            //적곰과 테두리
            this.game.physics.arcade.collide(
                this.redBears,
                this.bounds4,
                this.helpers.bearsCollideWithBounds4, //적곰 테두리충돌
                null,
                this
            );
            //녹곰과 테두리
            this.game.physics.arcade.collide(
                this.greenBears,
                this.bounds4,
                this.helpers.bearsCollideWithBounds4, //녹곰 테두리충돌
                null,
                this
            );

            if (!this.ballOnPaddle) {

                if(enablePlayTime) {
                    playtime_cur += this.DtSec;
                    playtime_clock-=this.DtSec;//게임에서 사용중인 감소하는 타이머
                    bonusmovetimer -= this.DtSec;
                    if(modeOption[0]===2) {//0:노말 1:하강모드 2:보너스
                        //-------------보너스 스테이지 수직 이동-------------
                        // if (this.ballOnPaddle                  //공쏘기전
                        //     || this.gameState.gameOver             //게임오버상태
                        //     || ispausemode                         //메뉴정지상태
                        //     || !uigame.state.states.game.gameBegun //게임시작안된상태
                        // ) return;
                        if(bonusmovetimer<=0) {
                            this.moveVerticalTime();
                            bonusmovetimer=bonusmovetimermax;
                        }
                        //-------------보너스 스테이지 수직 이동-------------
                    }else{
                        //프로그래스업데이트
                        if(ending_step === _steps.none){
                            uiProgGlobal.onUpdateProg(playtime_clock / playtime_clock_max);//in update
                            uiProgGlobal.onUpdateTime(
                                convertTimeFormatFromSec(
                                    float2int(playtime_clock)
                                )
                            );
                        }
                    }

                }//플레이타임

                this.onsavePosTrails(); //25버전개조--- 업데이트에서 저장
                this.onupdateSetPosTrail(); //25버전개조--- 업데이트에서 배치

                // Check collisions
                //볼과패들 충돌
                this.game.physics.arcade.collide(this.balls,
                    //this.game.physics.arcade.collide(   this.ball,
                    this.paddle,
                    this.helpers.ballCollideWithPaddle, //==paddleHitBallHandler
                    function(p,b){
                        //if(20<Math.abs(p.x-p.oldx){
                        //console.log("ball.vel_prev:"+b.body.velocity+", pos:"+b.position+", isb:"+b.body.enable+", isp:"+p.body.enable);
                        //console.log("ball.vel_prev: abs:"+Math.abs(p.x-p.oldx)+", "+Math.abs(p.y-p.oldy));
                        //console.log("padatt:"+( this.padatt===PadAttr.fixed? "fixed":"not fixed"));

                        if (this.padatt !== PadAttr.fixed) {//접착이 아니면
                            if (1 < Math.abs(p.x - p.oldx) || 1 < Math.abs(p.y - p.oldy)) {
                                //console.log(p.name+",old:"+p.body.prev.x+",cur:"+p.body.position.x+", "+b.name);
                                var s = b.body.velocity.x + "," + b.body.velocity.y;
                                b.y = p.y - p.body.halfHeight - b.body.halfHeight;
                                if (b.body.velocity.y > 0) {
                                    b.body.velocity.y = (-1 * b.body.velocity.y);
                                }
                                //console.log("_prev b.vel: old:" + s + ", new:" + b.body.velocity.x + "," + b.body.velocity.y);
                            }
                        }

                        //console.log("ball.vel_prev: end");
                    },
                    this
                );


                if (this.ballstate === BallType.through_n
                    || this.ballstate === BallType.through_s
                    || this.ballstate === BallType.through_b) {
                    this.game.physics.arcade.overlap(this.balls,
                        this.tiles,
                        this.helpers.overlapHandler,
                        null,
                        this
                    );
                } else if (this.ballstate === BallType.throughbomb_n
                    || this.ballstate === BallType.throughbomb_s
                    || this.ballstate === BallType.throughbomb_b) {
                    this.game.physics.arcade.overlap(this.balls,
                        this.tiles,
                        this.helpers.overlapHandler_through,
                        null,
                        this
                    );
                } else {
                    //볼과블럭 충돌
                    this.game.physics.arcade.collide(this.balls,
                        //this.game.physics.arcade.collide(   this.ball,
                        this.tiles,
                        this.helpers.ballCollideWithTile, //==ballHitBrickHandler
                        null,
                        this
                    );
                }

                //아이템과 패들 충돌
                this.game.physics.arcade.collide(this.items,
                    this.paddle,
                    this.helpers.itemCollideWithPaddle, //==ballHitBrickHandler
                    null,
                    this
                );
                //총알과 타일 충돌
                this.game.physics.arcade.collide(
                    this.bullets,
                    this.tiles,
                    this.helpers.bulletCollideWithTile,
                    null,
                    this
                );
                //볼과 테투리
                this.game.physics.arcade.collide(
                    this.balls,
                    this.bounds3,
                    this.helpers.ballCollideWithBounds3,
                    null,
                    this
                );
                //총알과 테두리
                this.game.physics.arcade.collide(
                    this.bullets,
                    this.bounds3,
                    this.helpers.bulletCollideWithBounds3,
                    null,
                    this
                );
                //총알과 적곰
                this.game.physics.arcade.collide(
                    this.redBears,
                    this.bullets,
                    this.helpers.bearsCollideWithBalls,
                    null,
                    this
                );
                //총알과 녹곰
                this.game.physics.arcade.collide(
                    this.greenBears,
                    this.bullets,
                    this.helpers.bearsCollideWithBalls,
                    null,
                    this
                );

                //공과 적곰
                this.game.physics.arcade.overlap(
                    this.redBears,
                    this.balls,
                    this.helpers.bearsCollideWithBalls, //적곰 공충돌
                    null,
                    this
                );

                //공과 녹곰
                this.game.physics.arcade.overlap(
                    this.greenBears,
                    this.balls,
                    this.helpers.bearsCollideWithBalls, //녹곰 공충돌
                    null,
                    this
                );
                if (gunstate === ThreeState.run) {

                    if (guntimer === 0 //백업시간과 현재시간의 차 == 시간이다.
                    ) { //게임오버시
                        //if (this.game.time.now - this.guntimeroldbak > this.guntimemax) {
                        gunstate = ThreeState.end;
                        PadAttr_bullet = false; //시간초과
                        //총구끄기
                        this.paddle.z_left.visible = false;
                        this.paddle.z_right.visible = false;
                        //총구끄기
                    } else {
                        this.shootBullet();
                    }
                } //this.gunstate == ThreeState.run

            }//온패들모드이 아니면 //충돌이벤트 함수들
            //bb---------------------------------------------------------------->>
            // var s="";
            // this.balls.forEach(function (n) {
            //     if (n.alive) {
            //         s+= ("c -- "+n.name+"(xy:"+n.x+","+n.y+", vel:"+n.body.velocity+")" + ", pd:"+this.paddle.x+","+this.paddle.y);
            //     }
            // }, this);
            // console.log(s);
            
            if (game.input.activePointer.isDown || game.input.pointer1.isDown) {
                //마우스클릭
                inputmode = InputMode.mouse;
            }else if(this.leftKey.isDown || this.rightKey.isDown || this.upKey.isDown || this.downKey.isDown || this.spaceKey.isDown) {
                //키보드클릭
                inputmode = InputMode.keyboard;
            }
            if (this.ballOnPaddle) { //패들시작모드일때
                //공쏘기전 게임상황
                this.followPaddle(); //온패들모드시 이동시 //t2
                if(this.navi.visible) {
                    this.navi.onUpdateAngle();
                    this.paddle.x = xc;
                    this.paddle.y = this.paddlePosY;
                    //이스다운이벤트,이즈다운이벤트
                    if(inputmode===InputMode.mouse) {
                        //터치입력
                        if (game.input.activePointer.isDown
                            || (game.input.pointer1.isUp && touched === true)) {
                            if (kData.bSoundSE) SE_Fire.play(); //공 발사시
                            //모바일에서만 터치 카운드
                            touchfirst=true; //in update ballonpaddle
                            this.onReleaseStart(); //처음쏘기
                        }
                    }else if(inputmode===InputMode.keyboard){
                        //키보드 입력
                        if(this.spaceKey.isDown){
                             if (kData.bSoundSE) SE_Fire.play();
                             this.onReleaseStart(); //처음쏘기
                        }
                    }
                }//네비 보일때

                // hsDebug.onSet("touchfirst", touchfirst);//
                // hsDebug.onSet("point1isup", game.input.pointer1.isUp);//
                // hsDebug.onSet("point1isdown", game.input.pointer1.isDown);//
                // hsDebug.onSet("activeisup", game.input.activePointer.isUp);//
                // hsDebug.onSet("activeisdown", game.input.activePointer.isDown);//
                // hsDebug.onUpdateHash();

                //
            }else {
                //온패들모드가 아닐때 //공쏜 후의 게임상황 //게임중, 접착속성이면 따라 이동
                this.paddle.oldx=this.paddle.x;
                this.paddle.oldy=this.paddle.y;//상하추가
                if(this.padatt === PadAttr.fixed) {
                    this._j = this.fixedballs.length;
                    if (this._j > 0) {
                        for (this._i = 0; this._i < this._j; this._i++) {
                            this.fixedballs[this._i].x = this.paddle.x+this.fixedballs[this._i].z_xoff;
                            this.fixedballs[this._i].y = this.paddle.y+this.fixedballs[this._i].z_yoff+5;//상하추가
                        }
                    }
                }

                //온패들모드이면 작동안돼어야하므로 여기로 이동 ////잇풋에 따른 패들이동
                if(inputmode===InputMode.mouse) {
                    //일반 마우스 이동시
                    if (!this.ballOnPaddleTweening){ //발사시 트윈으로 패들이 움직일때는 제외

                         if(touchscreen){
                             //터치스크린모드
                             if(touchfirst===true){
                                 //첫터치상태면 스킵처리 //모바일에서만 예외처리
                                 if(game.input.pointer1.isUp) touchfirst=false;
                             }else {
                                 //일반 터치 이동 모드
                                 if(game.input.pointer1.isDown)
                                    this.paddle.x = this.game.input.x;
                                    //this.paddle.y = this.game.input.y-88;//상하추가
                                    //console.log("paddle.xy:"+this.paddle.x+","+this.paddle.y);
                             }

                         }else{
                             //일반 마우스 이동 모드
                             this.paddle.x = this.game.input.x;
                             //this.paddle.y = this.game.input.y-88;//상하추가
                            // console.log("paddle.xy:"+this.paddle.x+","+this.paddle.y);
                         }


                    }


                    if(this.paddle.x < this.boundLeftOffsetByPaddle) {
                        this.paddle.x = this.boundLeftOffsetByPaddle;
                    }else if(this.paddle.x > this.boundRightOffsetByPaddle) {
                        this.paddle.x = this.boundRightOffsetByPaddle;
                    }

                    if(this.paddle.y > BoundBottomOffsetByPaddle) {
                        this.paddle.y = BoundBottomOffsetByPaddle;
                    }else if(this.paddle.y < BoundTopOffsetByPaddle) {
                        this.paddle.y = BoundTopOffsetByPaddle;
                    }

                    //이스다운이벤트,이즈다운이벤트
                    if ((game.input.activePointer.isDown && released === true) //순간 마우스 다운 이벤트//이함수 끝에서 업데이트
                        || (game.input.pointer1.isUp && touched === true)) { //순간 터치 업 이벤트////이함수 끝에서 업데이트
                        //접착패들과 접착공 갯수가 있을때
                        if (this.padatt === PadAttr.fixed && this.fixedballs.length > 0) {
                            if (kData.bSoundSE) SE_Fire.play();
                            this.onReleaseBalls(); //접착모드에서 쏘기
                        } //공 발사시

                    }
                    //일반 마우스 이동시

                    // hsDebug.onSet("touchfirst", touchfirst);
                    // hsDebug.onSet("point1isup", game.input.pointer1.isUp);
                    // hsDebug.onSet("point1isdown", game.input.pointer1.isDown);
                    // hsDebug.onSet("activeisup", game.input.activePointer.isUp);
                    // hsDebug.onSet("activeisdown", game.input.activePointer.isDown);
                    // hsDebug.onUpdateHash();

                }else if(inputmode===InputMode.keyboard) {
                    //일반 키보드 이동시
                    if(this.leftKey.isDown) {
                        if( Paddle.x>BoundLeftOffsetByPaddle) {
                            Paddle.body.velocity.x = -moveSpeed;
                        }
                        else {
                            Paddle.x = BoundLeftOffsetByPaddle;
                            Paddle.body.velocity.x = 0;
                        }

                    }else if(this.rightKey.isDown){
                        if( Paddle.x<BoundRightOffsetByPaddle) {
                            Paddle.body.velocity.x = moveSpeed;
                        }
                        else {
                            Paddle.x = BoundRightOffsetByPaddle;
                            Paddle.body.velocity.x = 0;
                        }
                    }else if(this.spaceKey.isDown){
                        //접착패들과 접착공 갯수가 있을때
                        if (this.padatt === PadAttr.fixed && this.fixedballs.length > 0) {
                            if (kData.bSoundSE) SE_Fire.play();
                            this.onReleaseBalls(); //접착모드에서 쏘기
                        } //공 발사시
                    }else if(this.upKey.isDown){
                        // if(Paddle.y>BoundTopOffsetByPaddle) {//상단범위(값보다 크면)
                        //     Paddle.body.velocity.y = -moveSpeed*moveSpeedupdown;
                        // } else {
                        //     Paddle.y = BoundTopOffsetByPaddle;
                        //     Paddle.body.velocity.y = 0;
                        // }
                    }else if(this.downKey.isDown){
                        // if(Paddle.y<BoundBottomOffsetByPaddle) {//하단단범위(값보다 작으면)
                        //     Paddle.body.velocity.y = moveSpeed*moveSpeedupdown
                        // } else {
                        //     Paddle.y = BoundBottomOffsetByPaddle;
                        //     Paddle.body.velocity.y = 0;
                        // }
                    }else{
                        //if( Paddle.x>BoundRightOffsetByPaddle) BoundRightOffsetByPaddle
                        if(Paddle.body.velocity.x!==0)
                            Paddle.body.velocity.x = 0;
                        if(Paddle.body.velocity.x!==0)
                            Paddle.body.velocity.y = 0;
                    }

                }
              }//온패들모드가 아닐때


        }//gamebegun

        if(game.input.pointer1.isDown) {
            touched = true;
            if(touchscreen===false) touchscreen = true; //1번만 체크한다
        }
        else touched = false;
        if(game.input.activePointer.isDown) {
            released = false;
        }
        else released = true;
    },

    render: function () { //물리디버깅, 충돌박스디버그, 물리디버그
        //return;
        if(dmCollision) {
            uigame.debug.bodyInfo(this.paddle, 32, 32);
            uigame.debug.body(this.paddle);
            this.tiles.forEachAlive(this.game.debug.body, this.game.debug);
            this.redBears.forEachAlive(this.game.debug.body, this.game.debug);
            this.greenBears.forEachAlive(this.game.debug.body, this.game.debug);
            this.balls.forEachAlive(this.game.debug.body, this.game.debug);
            this.bounds4.forEachAlive(this.game.debug.body, this.game.debug);
            this.bullets.forEachAlive(this.game.debug.body, this.game.debug);

            uigame.debug.geom( this.circle, 'rgba(0,255,0,0.5)' ) ;
            this.circle.x = this.paddle.worldPosition.x;
            this.circle.y = this.paddle.worldPosition.y;

        }
    },//render


    //bb-----------------------------------------------------------<< method
    initGameVars: function () {
        curLives = MaxLife; //initGameVars()
        //if(this.livesUI!==null) this.livesUI.onSetLife(curLives); //널에러
        this.score = 0;
        this.initLevelVars();
    },
    initLevelVars: function () {
        this.countDownTime = 3;
        this.countDownTimeElapsed = 0;
        this.countDownsecondTick = 1;
        this.isCountDownOff = false;

        this.padsize = PadSize.normal;//this.isPaddleNerfed = false;

        this.paddleNerfTime = 6000;
    },

    //패들이 +1,-1로 상태를 변화시킨다
    setPadSizeLocal: function (sizedt) {
        //패들상태
        this.padsizeold = this.padsize;
        switch (this.padsize) {
            case PadSize.nerf:
                if (sizedt > 0) this.setPadSizeDirect(PadSize.normal);
                break;
            case PadSize.normal:
                if (sizedt < 0) this.setPadSizeDirect(PadSize.nerf);
                else if(sizedt > 0) this.setPadSizeDirect(PadSize.long);
                break;
            case PadSize.long:
                if (sizedt < 0) this.setPadSizeDirect(PadSize.normal);
                else if(sizedt > 0) this.setPadSizeDirect(PadSize.longa);
                break;
            case PadSize.longa:
                if (sizedt < 0) this.setPadSizeDirect(PadSize.long);
                else if(sizedt > 0) this.setPadSizeDirect(PadSize.longaa);
                break;
            case PadSize.longaa:
                if (sizedt < 0) this.setPadSizeDirect(PadSize.longa);
                break;
            default:
                this.setPadSizeDirect(PadSize.normal);
                break;
        }
    },
    setPadSizeDirect: function (sz) {
        //패들상태
        this.padsizeold = this.padsize;
        this.padsize = sz;

        if(kData.bSoundSE) SE_Transform.play();

        switch (sz) {
            case PadSize.nerf:
                if(PadAttr.fixed === this.padatt) {
                    this.paddle.animations.play('paddle_80j', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }else{
                    this.paddle.animations.play('paddle_80n', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }

                    //총구켜기
                    this.setBulletOffset();
                if(PadAttr_bullet) {
                    this.paddle.z_left.reset( -this.bulletx, -5);
                    this.paddle.z_right.reset( this.bulletx, -5);
                    //총구켜기
                }
                break;
            case PadSize.normal:
                if(PadAttr.fixed === this.padatt){
                    this.paddle.animations.play('paddle_160j', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }else{
                    this.paddle.animations.play('paddle_160n', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }

                    //총구켜기
                    this.setBulletOffset();
                if(PadAttr_bullet) {
                    this.paddle.z_left.reset( -this.bulletx, -5);
                    this.paddle.z_right.reset( this.bulletx, -5);
                    //총구켜기
                }
                break;
            case PadSize.long:
                if(PadAttr.fixed === this.padatt){
                    this.paddle.animations.play('paddle_240j', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }else{
                    this.paddle.animations.play('paddle_240n', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }

                    //총구켜기
                    this.setBulletOffset();
                if(PadAttr_bullet) {
                    this.paddle.z_left.reset( -this.bulletx, -5);
                    this.paddle.z_right.reset( this.bulletx, -5);
                    //총구켜기
                }
                break;
            case PadSize.longa:
                if(PadAttr.fixed === this.padatt){
                    this.paddle.animations.play('paddle_320j', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }else{
                    this.paddle.animations.play('paddle_320n', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }

                    //총구켜기
                    this.setBulletOffset();
                if(PadAttr_bullet) {
                    this.paddle.z_left.reset( -this.bulletx, -5);
                    this.paddle.z_right.reset( this.bulletx, -5);
                    //총구켜기
                }
                break;
            case PadSize.longaa:
                if(PadAttr.fixed === this.padatt){
                    this.paddle.animations.play('paddle_400j', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }else{
                    this.paddle.animations.play('paddle_400n', 35, false, undefined); //1time
                    pad_tw=this.paddle.scale;
                    TweenMax.fromTo(pad_tw, 0.35, {x:1.2}, {x:1, ease:Elastic.easeOut});
                }

                    //총구켜기
                    this.setBulletOffset();
                if(PadAttr_bullet) {
                    this.paddle.z_left.reset( -this.bulletx, -5);
                    this.paddle.z_right.reset( this.bulletx, -5);
                    //총구켜기
                }
                  break;
            default:
                this.paddle.loadTexture('atlas_bb-0', 'paddle_160.png'); //longaaa

                    //총구켜기
                    this.setBulletOffset();
                if(PadAttr_bullet) {
                    this.paddle.z_left.reset( -this.bulletx, -5);
                    this.paddle.z_right.reset( this.bulletx, -5);
                    //총구켜기
                }
                break;
        }

        //공통적용
        this.paddle.body.enable = true;
        //this.paddle.body.setSize(this.paddle.width / this.paddle.scale.x, this.paddle.height / this.paddle.scale.y);
        //1://
        this.paddle.body.setSize(this.paddle.width / this.paddle.scale.x, this.paddle.height / this.paddle.scale.y);

        //2://
        // var szx=this.paddle.width / this.paddle.scale.x;
        // var szy=(this.paddle.height / this.paddle.scale.y)*3;
        // var offx=0;
        // var offy=0;
        // this.paddle.body.setSize(szx, szy, offx, offy);

        this.boundLeftOffsetByPaddle = 28 + this.paddle.body.halfWidth;
        this.boundRightOffsetByPaddle = 720 - 28 - this.paddle.body.halfWidth;

        BoundLeftOffsetByPaddle=this.boundLeftOffsetByPaddle;
        BoundRightOffsetByPaddle=this.boundRightOffsetByPaddle;

        //공통적용

    },

    //-----패들죽이기---
    playanimPadDeath: function (sz) {
        //패들상태
        this.padsizeold = this.padsize;
        this.padsize = sz;

        //총구 사라지기
        this.setBulletOffset();
        guntimer=0;
        gunstate = ThreeState.end;
        PadAttr_bullet = false; //in playanimPadDeath
        this.paddle.z_left.visible=false;
        this.paddle.z_right.visible=false;

        if(kData.bSoundSE) SE_Paddle_Dead.play();//패들죽기//임시

        //공통적용
        //this.paddle.body.setSize(this.paddle.width / this.paddle.scale.x, this.paddle.height / this.paddle.scale.y);
        //1://
        this.paddle.body.setSize(this.paddle.width / this.paddle.scale.x, this.paddle.height / this.paddle.scale.y);

        //2://
        // var szx=this.paddle.width / this.paddle.scale.x;
        // var szy=(this.paddle.height / this.paddle.scale.y)*2;
        // var offx=0;
        // var offy=szy*0.5;
        // this.paddle.body.setSize(szx, szy, offx, offy);


        this.boundLeftOffsetByPaddle = 28 + this.paddle.body.halfWidth;
        this.boundRightOffsetByPaddle = 720 - 28 - this.paddle.body.halfWidth;

        BoundLeftOffsetByPaddle=this.boundLeftOffsetByPaddle;
        BoundRightOffsetByPaddle=this.boundRightOffsetByPaddle;

        //공통적용

        switch (sz) {
            case PadSize.nerf:
                this.paddle.animations.play('paddle_80n_death', 10, false, true); //1time //kill
                this.paddle.z_effect.revive();
                this.paddle.z_effect.position.setTo(this.paddle.x, this.paddle.y);
                this.paddle.z_effect.animations.play('paddle_effect', 10, false, true);
                break;

            case PadSize.normal:
                this.paddle.animations.play('paddle_160n_death', 10, false, true); //1time //kill
                this.paddle.z_effect.revive();
                this.paddle.z_effect.position.setTo(this.paddle.x, this.paddle.y);
                this.paddle.z_effect.animations.play('paddle_effect', 10, false, true);
                break;

            case PadSize.long:
                this.paddle.animations.play('paddle_240n_death', 10, false, true); //1time //kill
                this.paddle.z_effect.revive();
                this.paddle.z_effect.position.setTo(this.paddle.x, this.paddle.y);
                this.paddle.z_effect.animations.play('paddle_effect', 10, false, true);
                break;

            case PadSize.longa:
                this.paddle.animations.play('paddle_320n_death', 10, false, true); //1time //kill
                this.paddle.z_effect.revive();
                this.paddle.z_effect.position.setTo(this.paddle.x, this.paddle.y);
                this.paddle.z_effect.animations.play('paddle_effect', 10, false, true);
                break;

            case PadSize.longaa:
                this.paddle.animations.play('paddle_400n_death', 10, false, true); //1time //kill
                this.paddle.z_effect.revive();
                this.paddle.z_effect.position.setTo(this.paddle.x, this.paddle.y);
                this.paddle.z_effect.animations.play('paddle_effect', 10, false, true);
                break;

            default:
                this.paddle.animations.play('paddle_160n_death', 10, false, true); //1time //kill
                this.paddle.z_effect.revive();
                this.paddle.z_effect.position.setTo(this.paddle.x, this.paddle.y);
                this.paddle.z_effect.animations.play('paddle_effect', 10, false, true);
        }
        enablePlayTime=false;
    },
    //-----패들죽이기---

    // BallType = {
    //     normal: 0,
    //     small: 1,
    //     big: 2,
    //     through_n: 3,
    //     through_s: 4,
    //     through_b: 5,
    //     bomb_n: 6,
    //     bomb_s: 7,
    //     bomb_b: 8
    // };
    setBallStateDirect: function (val_state) { //볼강제변경
        this.ballstate = val_state;
        switch (val_state) {
            //노말--------------------------------------
            case BallType.normal_n:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_normal_middle.png'); //노말중
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_normal_middle.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.normal_s:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_normal_small.png'); //노말소
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_normal_small.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.normal_b:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_normal_big.png'); //노말대
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_normal_big.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            //통과 --------------------------------------
            case BallType.through_n:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_special_middle.png'); //관통중
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_normal_middle_special.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.through_s:
                // this.paddle.loadTexture('atlas_bb-0', 'ball_special_small.png'); //관통소
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_normal_small_special.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.through_b:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_special_big.png'); //관통대
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_normal_big_special.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            //폭발--------------------------------------
            case BallType.bomb_n:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_fire_middle.png'); //폭발중
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        //n.loadTexture('atlas_bb-0', 'ball_fire_middle_ani_1.png'); //노말중
                        n.animations.play('fire_normal', 10, true, undefined); //loop
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.bomb_s:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_fire_small.png'); //폭발소
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        //n.loadTexture('atlas_bb-0', 'ball_fire_small_ani_1.png'); //노말중
                        n.animations.play('fire_small', 10, true, undefined); //loop
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.bomb_b:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_fire_big.png'); //폭발대
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        //n.loadTexture('atlas_bb-0', 'ball_fire_big_ani_1.png'); //노말중
                        n.animations.play('fire_big', 10, true, undefined); //loop
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            //관통 + 폭발--------------------------------------
            case BallType.throughbomb_n:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_fire_middle.png'); //폭발중
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_fire_middle_special.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.throughbomb_s:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_fire_small.png'); //폭발소
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_fire_small_special.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            case BallType.throughbomb_b:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_fire_big.png'); //폭발대
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_fire_big_special.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
            ///-------------------
            default:
                //this.paddle.loadTexture('atlas_bb-0', 'ball_normal_middle.png'); //longaaa
                this.balls.forEach(function (n) {
                    if (n.alive) {
                        n.loadTexture('atlas_bb-0', 'ball_normal_middle.png'); //노말중
                        n.body.setSize(n.width, n.height);
                    }
                }, this);
                break;
        }//switch

        this.changeTrails(this.ballstate);
    },

    setBallsPosOffset: function () { //볼강제변경
        //lefttop: 28, 130   //righttop: 692, 130
        var coltop=130;
        var colleft=28;
        var colright=692;
        this.balls.forEach(function (n) {
            if (n.alive) {
                if(n.y<coltop+n.body.halfHeight){
                   n.y=coltop+n.body.halfHeight;
                }else if(n.x<colleft+n.body.halfWidth){
                    n.x=colleft+n.body.halfWidth;
                }else if(n.x>colright-n.body.halfWidth){
                    n.x=colleft-n.body.halfWidth;
                }
            }
        }, this);
    },


    //레벨들,레벨모음
    //정보 모비릭스 벽돌깨기 왕: x:11,y:19-> 11x18로변경
    //첫레벨 위에서부터 [1]~[8]행
    initLevel: function () {

        //curLevel = 0; //계속 0으로 해서 로딩하게 함;;

        var r = 'red';
        var b = 'blue';
        var o = 'orange';
        var g = 'green';
        var X = null;

        //you can uncoment the dev level and or/add a level of your own
        //powerUps are not picked from the values bellow but set with: this.dropItemLimit
        //기획-원하는크기 x:11 y:18

        bbLevel = [
                //0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10,// x:11개
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //0
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //1
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //2
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //3
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //4
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //5
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //6
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //7
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //8
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //9
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //10
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //11
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //12
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //13
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //14
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //15
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //16
                [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]  //17 //y:18개
            ];
        bbLevel_coloronly = [
            //0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10,// x:11개
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //0
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //1
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //2
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //3
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //4
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //5
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //6
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //7
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //8
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //9
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //10
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //11
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //12
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //13
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //14
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //15
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1], //16
            [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1]  //17 //y:18개
        ];

    },
    createSoundsAndMusic: function () {
        // this.au_brickDeath = this.game.add.audio('brickDeath');
        // this.au_countdownBlip = this.game.add.audio('countdownBlip');
        // this.au_powerdown = this.game.add.audio('powerdown');
        // this.au_powerup = this.game.add.audio('powerup');
        // this.au_recover = this.game.add.audio('recover');
    },
    createPaddle: function () {
        // Setup the player -- paddle
        this.paddle = this.game.add.sprite(game.world.centerX, this.paddlePosY, "atlas_bb-0", "paddle_160.png");//패들위치
        Paddle = this.paddle;
        //총구생성
        this.paddle.z_left=this.game.add.sprite(0, 0, "atlas_bb-0", "gun.png");
        this.paddle.z_left.anchor.set(0.5);
        this.paddle.z_right=this.game.add.sprite(0, 0, "atlas_bb-0", "gun.png");
        this.paddle.z_right.anchor.set(0.5);
        this.paddle.addChild(this.paddle.z_left);
        this.paddle.addChild(this.paddle.z_right);
        this.paddle.z_left.reset( -this.bulletx, -5);
        this.paddle.z_right.reset( this.bulletx, -5);
        this.paddle.z_left.visible=false;
        this.paddle.z_right.visible=false;
        //총구생성
        
        // this.bullety=this.gunpos[1][1];
        // bullet.reset( this.paddle.x + this.bulletx, this.paddle.y + this.bullety ); //총구 위치로


        //this.paddle.animations.play('paddle80n', 35, false, undefined); //1time
        this.paddle.animations.add('paddle_80n', [ //소형 패들 노말
            'paddle_80.png',
            'paddle_80_white.png',
            'paddle_80.png',
            'paddle_80_white.png',
            'paddle_80.png',
            'paddle_80_white.png',
            'paddle_80.png',
            'paddle_80_white.png',
            'paddle_80.png'
        ]);
        this.paddle.animations.add('paddle_160n', [
            'paddle_160.png',
            'paddle_160_white.png',
            'paddle_160.png',
            'paddle_160_white.png',
            'paddle_160.png',
            'paddle_160_white.png',
            'paddle_160.png',
            'paddle_160_white.png',
            'paddle_160.png'
        ]);
        this.paddle.animations.add('paddle_240n', [
            'paddle_240.png',
            'paddle_240_white.png',
            'paddle_240.png',
            'paddle_240_white.png',
            'paddle_240.png',
            'paddle_240_white.png',
            'paddle_240.png',
            'paddle_240_white.png',
            'paddle_240.png'
        ]);
        this.paddle.animations.add('paddle_320n', [
            'paddle_320.png',
            'paddle_320_white.png',
            'paddle_320.png',
            'paddle_320_white.png',
            'paddle_320.png',
            'paddle_320_white.png',
            'paddle_320.png',
            'paddle_320_white.png',
            'paddle_320.png'
        ]);
        this.paddle.animations.add('paddle_400n', [
            'paddle_400.png',
            'paddle_400_white.png',
            'paddle_400.png',
            'paddle_400_white.png',
            'paddle_400.png',
            'paddle_400_white.png',
            'paddle_400.png',
            'paddle_400_white.png',
            'paddle_400.png'
        ]);
        this.paddle.animations.add('paddle_80j', [ //소형 패들 부착
            'paddle_80_magnet.png',
            'paddle_80_white.png',
            'paddle_80_magnet.png',
            'paddle_80_white.png',
            'paddle_80_magnet.png',
            'paddle_80_white.png',
            'paddle_80_magnet.png',
            'paddle_80_white.png',
            'paddle_80_magnet.png'
        ]);
        this.paddle.animations.add('paddle_160j', [
            'paddle_160_magnet.png',
            'paddle_160_white.png',
            'paddle_160_magnet.png',
            'paddle_160_white.png',
            'paddle_160_magnet.png',
            'paddle_160_white.png',
            'paddle_160_magnet.png',
            'paddle_160_white.png',
            'paddle_160_magnet.png'
        ]);
        this.paddle.animations.add('paddle_240j', [
            'paddle_240_magnet.png',
            'paddle_240_white.png',
            'paddle_240_magnet.png',
            'paddle_240_white.png',
            'paddle_240_magnet.png',
            'paddle_240_white.png',
            'paddle_240_magnet.png',
            'paddle_240_white.png',
            'paddle_240_magnet.png'
        ]);
        this.paddle.animations.add('paddle_320j', [
            'paddle_320_magnet.png',
            'paddle_320_white.png',
            'paddle_320_magnet.png',
            'paddle_320_white.png',
            'paddle_320_magnet.png',
            'paddle_320_white.png',
            'paddle_320_magnet.png',
            'paddle_320_white.png',
            'paddle_320_magnet.png'
        ]);
        this.paddle.animations.add('paddle_400j', [
            'paddle_400_magnet.png',
            'paddle_400_white.png',
            'paddle_400_magnet.png',
            'paddle_400_white.png',
            'paddle_400_magnet.png',
            'paddle_400_white.png',
            'paddle_400_magnet.png',
            'paddle_400_white.png',
            'paddle_400_magnet.png'
        ]);

        //죽기애니------------
        //this.paddle.animations.play('paddle_80n_death', 35, false, undefined); //1time
        this.paddle.animations.add('paddle_80n_death', [ //소형 패들 노말
            'paddle_80_white.png',
            'paddle_80.png',
            'paddle_80_bomb.png'
        ]);
        this.paddle.animations.add('paddle_160n_death', [
            'paddle_160_white.png',
            'paddle_160.png',
            'paddle_160_bomb.png'
        ]);
        this.paddle.animations.add('paddle_240n_death', [
            'paddle_240_white.png',
            'paddle_240.png',
            'paddle_240_bomb.png'
        ]);
        this.paddle.animations.add('paddle_320n_death', [
            'paddle_320_white.png',
            'paddle_320.png',
            'paddle_320_bomb.png'
        ]);
        this.paddle.animations.add('paddle_400n_death', [
            'paddle_400_white.png',
            'paddle_400.png',
            'paddle_400_bomb.png'
        ]);
        //죽기애니------------

        this.paddle.name = "paddle";
        this.paddle.anchor.setTo(0.5, 0.5);
        this.game.physics.enable(this.paddle, Phaser.Physics.ARCADE);
        this.paddle.body.collideWorldBounds = true;
        this.paddle.body.bounce.set(1);
        this.paddle.body.immovable = true;

        this.paddle.z_effect = this.game.add.sprite(-100, -100, "atlas_bb-0", 'paddle_bomb_1.png');
        this.paddle.z_effect.anchor.setTo(0.5, 0.5);
        this.paddle.z_effect.animations.add('paddle_effect', [
            'paddle_bomb_1.png',
            'paddle_bomb_2.png',
            'paddle_bomb_3.png',
            'paddle_bomb_4.png',
            'paddle_bomb_5.png',
            'paddle_bomb_6.png'
        ]);
        this.paddle.z_effect.kill();
        //공통적용
        //this.paddle.body.setSize(this.paddle.width / this.paddle.scale.x, this.paddle.height / this.paddle.scale.y);
        //1://
        this.paddle.body.setSize(this.paddle.width / this.paddle.scale.x, this.paddle.height / this.paddle.scale.y);

        //2://
        // var szx=this.paddle.width / this.paddle.scale.x;
        // var szy=(this.paddle.height / this.paddle.scale.y)*2;
        // var offx=0;
        // var offy=szy*0.5;
        // this.paddle.body.setSize(szx, szy, offx, offy);

        this.boundLeftOffsetByPaddle = 28 + this.paddle.body.halfWidth;
        this.boundRightOffsetByPaddle = 720 - 28 - this.paddle.body.halfWidth;

        BoundLeftOffsetByPaddle=this.boundLeftOffsetByPaddle;
        BoundRightOffsetByPaddle=this.boundRightOffsetByPaddle;
        //공통적용

        //---패들 클리어시 사라짐 스파인---
        this.z_spine_paddle_out=uigame.add.spine(0, 0, "paddle_out"); //스파인오브젝트생성
        this.z_spine_paddle_out.x = this.paddle.x;
        this.z_spine_paddle_out.y = this.paddle.y;
        this.z_spine_paddle_out.state.onComplete = function (trackIndex, count) {
            switch (trackIndex) {
                case 0:
                    if(dm) console.log("spn_paddle_out.trackindex:0");
                    break;
                case 1:
                    if(dm) console.log("spn_paddle_out.trackindex:1");
                    break;
                case 2:
                    if(dm) console.log("spn_paddle_out.trackindex:2");
                    break;
                case 3:
                    if(dm) console.log("spn_paddle_out.trackindex:3");
                    break;
                case 4:
                    if(dm) console.log("spn_paddle_out.trackindex:4");
                    //empty만 순차실행 안됨, 딜레이없이 실행 되버린다.
                    //spn_page_lock.visible = false;//여기서 스파인숨김시 다른 애니들이 다 작동안함
                    spn_paddle_out.visible=false;
                    break;
            }
        };
        spn_paddle_out = this.z_spine_paddle_out;//글로벌저장
        //---패들 클리어시 사라짐 스파인---
    },//in createPaddle
    createHUD: function () {
        intro_fin = false;
        // Setup score text
        //this.scoreText = this.game.add.text(32, 1200, "score: 0", this.defaultTextOptions);
        //this.livesText = this.game.add.text(620, 1250, "lives: 3", this.defaultTextOptions); //1/2차생성
        //this.introText = this.game.add.text(game.world.centerX, 700, "START", this.boldTextOptions);//스타트생성
        //this.introText.anchor.setTo(0.5, 0.5);
        
        //인트로용 - 패들박스생성
        // this.introbox = this.game.add.sprite(xc, this.game.world.height, 'atlas_bb-0', 'boxcover.png');
        // this.introbox.anchor.setTo(0.5, 0);
        // this.introbox.visible = false;
        this.intropaddle = this.game.add.sprite(xc, this.game.world.height, 'atlas_bb-0', 'paddle_160.png');
        this.intropaddle.anchor.setTo(0.5, 0.5);
        this.intropaddle.visible = false;
        this.introboxcap = this.game.add.sprite(xc, this.game.world.height, 'atlas_bb_ui-0', 'box.png');
        this.introboxcap.anchor.setTo(0.5, 0);
        this.introboxcap.visible = false;


    },

    introShow: function () { //패들 등장 트윈 //시작창닫고, 딜레이콜로 호출 //시작연출-패들등장
        if('menu'=== uigame.state.current) return;//
        if(dm) console.log("-----------introShow------------");
        //TweenMax.killTweensOf(this.introbox);
        TweenMax.killTweensOf(this.intropaddle);
        TweenMax.killTweensOf(this.introboxcap);

        var p = this.paddle;
        var b = this.ball;
        //var ib = this.introbox;
        var ip = this.intropaddle;
        var ic = this.introboxcap;
        var iboxfin = intro_fin;

        this.intropaddle.x = xc;

        //패들,박스같이 등장
        TweenMax.fromTo( this.intropaddle, 0.25, {y:1280+26}, {y:1192+26-56, ease: Linear.easeNone,  delay: 0.5,
            onStart:function() {
                ip.visible=true;
                ic.visible=true;
            }
        }); //박스
        //this.introboxcap.alpha=0.5;//디버깅용도
        TweenMax.fromTo( this.introboxcap, 0.25, {y:1280}, {y:1192-60,  ease:Linear.easeNone,  delay: 0.5}); //뚜껑


        //박스열기
        //TweenMax.fromTo( this.introbox,  0.25, {y:1192}, {y:1149, ease: Power1.easeOut,  delay: 0.25+0.5}); //뚜껑
        //패들나오기
        TweenMax.fromTo( this.intropaddle,  0.25, {y:1192+26-56}, {y:1000, ease:Linear.easeNone,  delay: 0.5+0.5}); //패들 //Elastic.easeOut
        //박스들어가기
        //TweenMax.fromTo( this.introbox,  0.4, {y:1149}, {y:1280, ease: Power1.easeOut,  delay: 1+0.5}); //박스
        TweenMax.fromTo( this.introboxcap,  0.4, {y:1192-60}, {y:1280,  ease:Linear.easeNone,  delay: 1+0.5}); //박스

        //모든 오브젝트 사라지기
        TweenMax.delayedCall(2.0, function () {
            if('menu'=== uigame.state.current) return;//
            //ib.visible = false;
            ip.visible = false;
            ic.visible = false;
            p.visible = true;
            b.visible = true;
            var gg = uigame.state.states.game;
            gg.massiveController.ballOnPaddle = true; //false라 켠다
            gg.massiveController.paddle.x = xc;
            if(gg.massiveController.balls.countLiving()===0) {
                var aball = gg.massiveController.balls.getFirstDead();  //공1개를 살린다.
                aball.reset(xc,yc);                   //공1 중앙으로 이동후
                aball.revive();                       //공1 부활
                this.ball = aball; //애니볼이면 //ball.animations.stop();
            }

            gg.massiveController.setBallStateDirect(BallType.normal_n);

            gg.massiveController.resetBullets();

            //gg.massiveController.setPadSizeDirect(PadSize.normal);
            gg.massiveController.padsize = PadSize.normal;
            gg.massiveController.padatt = PadAttr.normal;
            gg.massiveController.paddle.loadTexture('atlas_bb-0', 'paddle_160.png');
            gg.massiveController.paddle.revive();
            gg.massiveController.paddle.x = xc;
            intro_fin = true;

            //-----
            gg.massiveController.navi.onShow();

        });
        TweenMax.delayedCall(0.65, function () {
            if('menu'=== uigame.state.current) return;//
            if (kData.bSoundSE) SE_Paddle_Apper.play();
        });
    }, //시작연출-패들등장

    death_Force: function () {
        curComboCount = 0;
        //패들사망처리----------death_force랑 동일
        this.onReleaseBalls();
        this.items.forEach(function (n) { //드롭된 아이템 제거
            if (n.alive) {
                n.kill();
            }
        }, this);

        this.balls.forEach(function (n) { //공 제거
            if (n.alive) {
                n.kill();
            }
        }, this);

        this.setTrails(); //in death_force

        this.redBears.forEach(function (n) {//적곰제거
            if (n.alive) {
                n.kill();
            }
        }, this);
        
        this.greenBears.forEach(function (n) {//녹곰제거
            if (n.alive) {
                n.kill();
            }
        }, this);

        this.bullets.forEach(function (n) {//총알제거
            if (n.alive) {
                n.kill();
            }
        }, this);

        guntimer=0;
        gunstate = ThreeState.end;
        PadAttr_bullet=false; //in playanimPadDeath

        //총구끄기
        this.paddle.z_left.visible=false;
        this.paddle.z_right.visible=false;
        //총구끄기

        //---블록갯수체크----
        this._cntliving = this.tiles.countLiving();
        //골드갯수체크
        var gcnt = 0;
        this.tiles.forEach(function (n) {
            if (n.alive && n.z_color === 9) {         //무적9//초코블록8
                gcnt += 1;                            //현재골드블록만 숫자세기
            }
        }, this);
        this.countgoldcur = gcnt;
        if (this._cntliving <= this.countgoldcur)  //현재블록갯수<=현재골드갯수이면(골드만 남앗으면)
            return;
        //---블록갯수체크----


        this.playanimPadDeath(this.padsize); //in death

        curLives-=1; //죽음
        if(curLives<0) curLives=0;

        TweenMax.delayedCall( 0.75,//0.25,
            function () {
                if('menu'=== uigame.state.current) return;
                //생명차감 연출
                //var stgame = uigame.state.states.game;
                //stgame.massiveController.livesUI.onSetLife(curLives); //in death
                //별숨김// stgame.massiveController.livesUI.onMoveLife(curLives);  //상단메뉴에서 별 사라짐
                //생명차감 연출
            }
        );

        if (curLives === 0) { //다음 라이프 없으면 게임오버 in death
            //블록갯수체크는 위에서
            //
            //블록갯수체크는 위에서
            TweenMax.delayedCall( 1.75,//0.5,
                function () {
                    if('menu'=== uigame.state.current) return;

                    // if(modeOption[0]===2){//보너스에서 게임오버
                    //     var stgame = uigame.state.states.game;
                    //     if (stgame.uiController.uiGameOver.visible === false) {
                    //         selectBGM("none", true);
                    //         stgame.uiController.uiGameOver.onActiveGv();
                    //     }
                    //
                    // }else {
                        //컨티뉴-메뉴
                        var stgame = uigame.state.states.game;
                        if (stgame.uiController.uiContinue.visible === false) {
                            if (kData.iHeart <= 0){
                                // ---------------- 这里是结束的地方 ---------------- //
                                //kData.openedBak
                                if ( window.parent != null ) {
                                    window.parent.postMessage({
                                      cmd: "GameOver",
                                      msg: {
                                        score: 0, // 如果是星星数，也是这个分数
                                        level: kData.openedBak
                                      }
                                    }, "*");
                                  }
                                return;
                            }
                            stgame.uiController.uiContinue.onActiveCn(true);
                        }
                        //컨티뉴-메뉴
                    // }

                }
            );
        } else { //공 죽고, 다음공이 남으면 계속 이어하기
            //this.paddle.visible = false; //in death
            TweenMax.delayedCall( 1.75,//0.5,
                function () {
                    //시작연출-죽고다시할때
                    if('menu'=== uigame.state.current) return;
                    console.log("introshow in death_Force");

                    var stgame = uigame.state.states.game;
                    stgame.massiveController.introShow();

                    // if(false) {
                    //     TweenMax.delayedCall(0.5,function() {
                    //         if('menu'=== uigame.state.current) return;
                    //         console.log("introshow in death_Force");
                    //         stgame.massiveController.introShow();
                    //     });
                    //
                    //     //레디고플레이
                    //     stgame.uiController.uiReadyGo.z_spine.setAnimationByName(1, "ready_go_ani", false);//in death
                    //     stgame.uiController.uiReadyGo.z_spine.addAnimationByName(0, "empty", false);
                    //     //
                    // }

                    //stgame.massiveController.introShow();
                    //시작연출-죽고다시할때
                }
            );
        }//생명이 남앗을때
        //패들사망처리----------death_force랑 동일
    },

    copyLevel: function (levelindex) { //레벨로딩,타일로딩,블록로딩,블럭로딩

        //블록레벨 설정------------------------------------------
        //reset bricks
        // Creating a tile group
        //제1안
        //this.tiles.destroy();//bricks                   //기존 제거

        //제2안
        this.tiles.forEach(function (n) {
            if (n.alive) {
                n.kill();
            }
        }, this);

        if(dm) console.log("countDead:" + this.tiles.countDead()); //0으로 출력


        //제3안
        //this.tiles.kill();

        //this.tiles = this.game.add.group();//113 this.bricks = this.game.add.group();
        //this.tiles.enableBody = true;
        //this.tiles.physicsdBodyType = Phaser.Physics.ARCADE;

        //var Level = bbLevel;  //113버젼 모든레벨

        uigame.state.states.game.bgController.Background.onSetTex(levelindex);
        touchfirst = false; //in copylevel
        //레벨가져오기
        var _level;
        var _len;
        var _i;
        var _j;
        var _color;
        var _tile1;
        var _tilecount_colored = 0;

        var _over = false;

        //블록 저장 그리드 초기화
        for (_i = 0; _i < gridszx; _i++) {
            for (_j = 0; _j < gridszy; _j++) {
                bbLevel[_j][_i] = -1;           //초기화 in initLevel: function () {
                bbLevel_coloronly[_j][_i] = -1;
            }
        }

        //this.maxwithoutgold = 0;
        //this.curwithoutgold = 0;
        this.countgold = 0;
        this.countgoldcur = 0;

        //모드설정--
        modeOption = bubble_levels[levelindex].option; //0:노말 1:하강모드 2:보너스

        if (modeOption === undefined) modeOption = [0, 0, 0, 0, 0, 0];
        //modeOption = [1,0,0,0,0,0];//지울것
        //modeOption = [2,30,0,0,0,0];//지울것

        isClearBonus = false;
        finalClearBonus = false;

        switch (modeOption[0]) {
            case 0:
                //노말모드
                break;
            case 1:
                //하강모드
                break;
            case 2:
                //보너스하강모드
                break;
            default:
                //예외
                break;
        }
        //모드설정--

        _level = bubble_levels[levelindex];
        _len = bubble_levels[levelindex].balls.length;
        for (_i = 0; _i < _len; _i++) {

            var randomTileNumber = Math.floor(Math.random() * 6);

            // _tile1 = this.tiles.create(
            //     strtx + (_level.balls[_i].x * szx),                 //x
            //     strty + (_level.balls[_i].y * szy),                 //y
            //     "atlas_bb-0",
            //     "block_pubble.png"        //key //텍스쳐 오브젝트이름
            // );

            _color = _level.balls[_i][2]; //칼라속성

            _tile1 = this.tiles.create(
                strtx + (_level.balls[_i][0] * szx),                 //x속성
                strty + (_level.balls[_i][1] * szy),                 //y속성
                'atlas_bb-0',
                (_color === 0 ? 'block_white.png'
                    : _color === 1 ? 'block_crimson.png'
                        : _color === 2 ? 'block_red.png'		//오렌지
                            : _color === 3 ? 'block_yellow.png'
                                : _color === 4 ? 'block_green.png'
                                    : _color === 5 ? 'block_lightblue.png'     //하늘색
                                        : _color === 6 ? 'block_deepblue.png'     //파랑
                                            : _color === 7 ? 'block_pupple.png'  //보라
                                                : _color === 8 ? 'block_choco_3.png'   //하드
                                                    : _color === 9 ? 'block_gold.png'    //무적
                                                        : 'block_white.png')
            );
            _tile1.z_initx = strtx + (_level.balls[_i][0] * szx);
            _tile1.z_inity = strty + (_level.balls[_i][1] * szy);
            _tile1.z_x = _level.balls[_i][0]; //그리드(타일)좌표 입력
            _tile1.z_y = _level.balls[_i][1];

            _tile1.z_color = _color;
            _tile1.z_step = 0;
            _tile1.body.bounce.set(1);
            _tile1.body.immovable = true;
            _tile1.anchor.setTo(0.5, 0.5); //피봇-->중심으로
            _tile1.body.enable = true;

            _tile1.z_isheart=false;

            if (_color === 9) {
                this.countgold += 1; //블록카운트-골드
                this.countgoldcur += 1;
            } //무적블록수 갯수 합산

            //칼라블록 개수 계산 //아이템 렌덤생성시 사용
            if (_color !== 9) _tilecount_colored += 1;

            _tile1.name = 'brick' + (_i);
            if (_i === 0) { //첫타일이면
                this.tile1width = _tile1.width;
                this.tile1height = _tile1.height;
            }

            //공통 애니 설정
            //'block_bomb_white.png',
            _tile1.animations.add('kill', [//보통블록터짐애니
                // 'block_bomb_type_2_1.png',
                // 'block_bomb_type_2_2.png',
                // 'block_bomb_type_2_3.png',
                // 'block_bomb_type_2_4.png',
                // 'block_bomb_type_2_5.png',
                // 'block_bomb_type_2_6.png',
                // 'block_bomb_type_2_7.png',
                // 'block_bomb_type_2_8.png',
                // 'block_bomb_type_2_9.png',
                // 'block_bomb_type_2_10.png'
                'block_bomb_1.png',
                'block_bomb_2.png',
                'block_bomb_3.png',
                'block_bomb_4.png',
                'block_bomb_5.png',
                'block_bomb_6.png',
                'block_bomb_7.png',
                'block_bomb_8.png',
                'block_bomb_9.png',
                'block_bomb_10.png'
            ]);
            _tile1.z_onkill = function () {
                var emitter = this.game.add.emitter(0, 0, 100);
                emitter.makeParticles('brick-dust');
                emitter.x = _tile1.x + this.width * 0.5;
                emitter.y = _tile1.y + this.height * 0.5;
                emitter.minParticleSpeed.setTo(-50 * SCALE, -50 * SCALE);
                emitter.maxParticleSpeed.setTo(50 * SCALE, 50 * SCALE);
                emitter.minParticleScale = 1 * SCALE;
                emitter.maxParticleScale = 1.5 * SCALE;
                emitter.start(true, 300, null, 10);

                this.game.time.events.add(2000, function () {
                        emitter.destroy();
                    }
                );
            };

            //_tile1.animations.add('fire', ['block_fire.png', 'block_fire_75.png', 'block_fire_50.png', 'block_fire_25.png']);
            _tile1.animations.add('fire', [ //불타는 블록애니
                'block_bomb_fire_1.png',
                'block_bomb_fire_2.png',
                'block_bomb_fire_3.png',
                'block_bomb_fire_4.png',
                'block_bomb_fire_5.png',
                'block_bomb_fire_6.png',
                'block_bomb_fire_7.png'
            ]);

            _tile1.animations.add('killpoint', [//총알터짐애니
                'shot_bomb_ani_1.png',
                'shot_bomb_ani_2.png',
                'shot_bomb_ani_3.png'
            ]);

            _tile1.animations.add('kill_choco', [ //초코 블록애니
                'choco_block_bomb_1.png',
                'choco_block_bomb_2.png',
                'choco_block_bomb_3.png',
                'choco_block_bomb_4.png',
                'choco_block_bomb_5.png',
                'choco_block_bomb_6.png',
                'choco_block_bomb_7.png',
                'choco_block_bomb_8.png',
                'choco_block_bomb_9.png',
                'choco_block_bomb_10.png'
            ]);
            _tile1.animations.add('kill_heart', [ //하트 블록애니
                'heart_block_bomb_1.png',
                'heart_block_bomb_2.png',
                'heart_block_bomb_3.png',
                'heart_block_bomb_4.png',
                'heart_block_bomb_5.png',
                'heart_block_bomb_6.png',
                'heart_block_bomb_7.png',
                'heart_block_bomb_8.png',
                'heart_block_bomb_9.png',
                'heart_block_bomb_10.png',
                'heart_block_bomb_11.png',
                'heart_block_bomb_12.png'
            ]);
            //타일속성에 따라 처리
            switch (_color) {
                case 8:
                    _tile1.animations.add('show0', ['block_bomb_white.png', 'block_choco_2.png']);
                    _tile1.animations.add('showdefault', ['block_choco_3.png']); //레벨11번(인덱스10)
                    //sprite.animations.currentAnim.onComplete.add(function () {	console.log('animation complete');}, this);
                    //var anim = m.animations.play('mole_go_out', 24, false);       anim.onComplete.add(this.stopBunny, this);},
                    _tile1.animations.add('show1', ['block_bomb_white.png', 'block_choco_1.png']);
                    //anim.onComplete.add(_tile1.kill(), this);
                    _tile1.z_step = 2;//초기화
                    break;
                case 9:
                    _tile1.animations.add('show0', [ //레벨21번(인덱스20) 무적
                        'block_gold.png',
                        'block_gold_ani_1.png',
                        //'block_gold_ani_2.png',
                        'block_gold_ani_3.png',
                        //'block_gold_ani_4.png',
                        'block_gold_ani_5.png',
                        //'block_gold_ani_6.png',
                        'block_gold_ani_7.png',
                        //'block_gold_ani_8.png',
                        'block_gold_ani_9.png',
                        'block_gold.png'
                    ]);
                    break;

                default:
                    break;
            }//switch (_color)
            // 배열속에 그리드속성 저장--------
            bbLevel[_level.balls[_i][1]][_level.balls[_i][0]] = _tile1;//타일그리드첫저장
            bbLevel_coloronly[_level.balls[_i][1]][_level.balls[_i][0]] = _tile1.z_color;//타일속성그리드첫저장
            // 배열속에 그리드속성 저장--------

        }//for (_i=0 //level.ball카운트만큼

        //--블록수로 시간생성하기-------------
        //--전체블록tn--
        allblockcount = this.tiles.countLiving();////블록카운트-전체
        //--골드블록, 초코블록 세기--
        goldcnt = 0; //블록카운트-골드
        chococnt= 0; //블록카운트-초코
        normalcnt=0; //블록카운트-노말
        this.tiles.forEach(function (n) {
            if (n.alive){
                if(n.z_color === 9) {      //무적9
                    goldcnt+=1;          //골드 숫자
                }else if(n.z_color === 8) { //초코블록8
                    chococnt+=1;         //초코 숫자
                }else{
                    normalcnt+=1;
                }
            }
        }, this);
        //this.countgoldcur = goldcnt;

        if(goldcnt<chococnt+normalcnt){
            playtime_clock_max = allblockcount*3;
            allstarbias=[0
                , (allblockcount*1)/playtime_clock_max
                , (allblockcount*2.2)/playtime_clock_max
            ];
        }else{
            playtime_clock_max = allblockcount*3*1.2;
            allstarbias=[0
                , (allblockcount*1*1.2)/playtime_clock_max
                , (allblockcount*2.2*1.2)/playtime_clock_max
            ];
        }
        //--블록수로 시간생성하기-------------
        playtime_clock = playtime_clock_max + 1; //in copylevel

        bonusmovetimermax = modeOption[3] * 0.1;
        bonusmovetimer = bonusmovetimermax + 1;
        BearTimeMax = Math.floor(allblockcount*0.5);

        //curLevelFake = curLevel + 1 - Math.floor(curLevel / LV4x4);
        if(-1!==DontStartBearLevel.indexOf(curLevelFake)) isUseBear = false;
        else isUseBear = true;
        //console.log("isUseBear:"+isUseBear);

        switch (modeOption[0]) {
            case 0:
                //노말모드
                break;
            case 1:
                //하강모드
                break;
            case 2:
                //보너스하강모드
                //안보이는 영역에 블록 1개를 생성해서  게임 종료되는 것 방지
                var _fartile = this.createTile1(-10, -10, 0);
                _fartile.revive();
                _fartile.body.enable = true;
                _fartile.alpha = 1;
                _fartile.z_color = this._tmpcolor;
                _fartile.z_step = 0;
                break;
            default:
                //예외
                break;
        }


        // //테스트
        // this.leveloption = bubble_levels[levelindex].mask_test;

        this.mskl = bubble_levels[levelindex].mask_left;
        this.mskr = bubble_levels[levelindex].mask_right;
        //예외처리
        if (this.mskl === undefined) this.mskl = [];
        if (this.mskr === undefined) this.mskr = [];

        this.mskllen = this.mskl.length;
        this.mskrlen = this.mskr.length;
        this.msklmax = 0;
        this.mskrmax = 720;
        this.mskloff = 0;
        this.mskroff = 0;

        this.mskldir = false;//방향
        this.mskrdir = false;//방향

        for (_i = 0; _i < this.mskllen; _i++) {
            this._mskx = this.mskl[_i][0];
            this._msky = this.mskl[_i][1];
            this._mxobj = bbLevel[this._msky][this._mskx];
            if (this.msklmax < this._mxobj.x) {
                this.msklmax = this._mxobj.x; //1번째칸위치기준 옵셋 //다음칸까지 가야하므로 --1
            }
        }
        for (_i = 0; _i < this.mskrlen; _i++) {
            this._mskx = this.mskr[_i][0];
            this._msky = this.mskr[_i][1];
            this._mxobj = bbLevel[this._msky][this._mskx];
            if (this.mskrmax > this._mxobj.x) {
                //this.mskrmax =  this._mxobj.x - (strtx+(11*szx))+strtx; //11번째칸위치기준 옵셋//다음칸까지 가야하므로 ++1
                this.mskrmax = this._mxobj.x;
            }
        }
        var w = strtx + (11 * szx);
        this.mskrmax = Math.abs(this.mskrmax - w);

        if (dm) console.log("load level(copy level)");
        //레벨가져오기



        //modeOption[] 변수들 설명
        //modeOption = [0,1,2,3,4,5]----------설명
        //             [0]모드
        //              0:노말
        //              1:하강모드
        //              2:보너스
        //modeOption = [0,1,2,3,4,5]----------
        //               [1]라인수(수직스크롤)
        //modeOption = [0,1,2,3,4,5]----------
        //                 [2]하트갯수
        //modeOption = [0,1,2,3,4,5]----------
        //                   [3]수직속도(1:0.1초 10:1초)
        //modeOption = [0,1,2,3,4,5]----------더미인덱스
        //                     [4]곰생성시간(초)
        //modeOption = [0,1,2,3,4,5]----------
        //                       [5]미정

        //보너스모드하트배치, 보너스하트배치 랜덤 생성--시작------------------------------------------
        if (modeOption[0] === 2) {//보너스모드인경우
            BonusLineCount = modeOption[1]; //보너스스테이지 이동할 라인수
            //BonusHeartCount = modeOption[2]; //총하트수
            var userheart = kData.userData[curLevel]>0?kData.userData[curLevel]:0;
            BonusHeartCount = modeOption[2]-userheart; //보너스스테이지 총하트수

            //ui는 생성이 안된 상태이므로 업데이트는 여기서 하면 안됨

            //BonusLineCount+18-->총이동 라인수
            BonusHeartRemain = BonusHeartCount % (BonusLineCount+18);   //나머지
            BonusHeartShare  = BonusHeartCount - BonusHeartRemain; //전체라인에 들어갈 하트총수
            BonusHeartPerLine = BonusHeartShare / (BonusLineCount+18);  //라인1개당 들어갈 하트수

            //중복없는 랜덤 배열
            BonusGridxArr = Phaser.ArrayUtils.shuffle(BonusGridxArr);

            //console.log("bbLevel:\n"+convertStr2Arr2D(bbLevel));
            //console.log("bbLevel_coloronly:\n"+convertStr2Arr2D(bbLevel_coloronly));

            //----------하트를 심을 블록들을 고른다.--시작---------초기화 하트배치 현재레벨전체
            BonusXArr=[];
            var xidx = 0;
            RemainAccum=0;//나머지의 +1 누적치
            BonusLocated=0;//배치된 보너스하트 전체 누적치
            //for (var iy = 18 - 1; iy >= 0; iy--) {//맨밑에서 위로 오라오면서
            for (var iy= 0; iy <18; iy++) { //모든 x에 대해서
                //1줄당 평균치 하트갯수 지정                 '<='가 1개더하트가 배치되서 '<'바꿈
                var xcnt = BonusHeartPerLine + (RemainAccum<BonusHeartRemain?1:0);

                //1줄을 블록만 콜렉션
                for (var ix = 0; ix <11; ix++) {
                    if(bbLevel[iy][ix]!==-1) BonusXArr.push(ix);
                }
                //1줄 콜렉션 섞기
                BonusXArr = Phaser.ArrayUtils.shuffle(BonusXArr);
                //지정하트갯수보다 블록수가 적으면, 블럭수에 맞춘다
                if(BonusXArr.length<xcnt) xcnt = BonusXArr.length;
                
                for (var ix = 0; ix <xcnt; ix++) {
                    xidx=BonusXArr[ix];
                    if(bbLevel[iy][xidx]!==-1){

                        bbLevel[iy][xidx].loadTexture('atlas_bb-0', 'block_heart.png');
                        bbLevel[iy][xidx].z_isheart = true;
                        BonusLocated+=1; //첫배치
                        if(dm) console.log("BonusLocated(first):"+BonusLocated +", xy:"+xidx+","+iy);
                        // BonusGridIdx+=1;
                        // if(BonusGridIdx>=11) BonusGridIdx=0;
                    }
                }//ix
                RemainAccum+=1;//첫배치
            }//iy
            //----------하트를 심을 블록들을 고른다.--끝---------첫 전체레벨처리
            
            // //블록 저장 그리드 초기화
            // for (_i = 0; _i < gridszx; _i++) {
            //     for (_j = 0; _j < gridszy; _j++) {
            //         bbLevel[_i][_j] = -1;
            //         bbLevel_source[_i][_j] = -1;
            //     }
            // }
        }
        //보너스모드 하드 랜덤 생성--끝------------------------------------------
        
        //reset items
        //this.items.destroy();
        //this.items = this.game.add.group();
        this.bricksWithItems = [];//블록이름만 저장 //dropOneItems: 에서 랜덤아이템제공
        //clearTimeout(this.recoverTimeout); //줄어든 패들 원상태로

        //---랜덤용 아이템 배치(아이템이름없이 블록에 배치만 한다)------------------------------
        //아이템확률,아이템확율,
        //일반모드인경우
        var _per=modeOption[0]===2?ItemsPercentBonus:ItemsPercent;
        dropItemLimit = float2int(_tilecount_colored * _per) + 1;

        //var dropItemLimit = float2int(_tilecount_colored);
        if(dm) console.log("dropItemLimit:"+dropItemLimit);

        //전체블록을 템갯수만큼 나눈 공간(블록갯수)
        var brickPartLimit = Math.floor(this.tiles.countLiving() / dropItemLimit); // 15/3==>5 //블록 갯수에 비례해서 많아지게

        //템1공간의 시작 지점
        var brickStartLimit = 1;                                                 //초기화==1  //루핑끝나면 16으로

        //템1공간의 끝나는 지점(처음끝은 첫공간의 크기로)
        var brickEndLimit = brickPartLimit;                                      //초기화==5  //루핑끝나면 20으로

        //+brickStartLimit
        //|              +brickEndLimit
        //|              |
        //+---템1공간-----+    +----템2공간----+    +----템3공간----+    +...
        //+-dropItemLimit-+   +-dropItemLimit-+    +-dropItemLimit-+   +...

        //아이템 갯수만큼, 템1공간을 1번씩 나아긴다.
        for (var dropCount = 0; dropCount < dropItemLimit; dropCount++) {        //3번 반복
            //랜덤생성시  처음,끝(둘다포함) 범위로 지정
            var randomBrick = this.getRandomInt(brickStartLimit, brickEndLimit);  //입력1,5-->2리턴
            //아이템드롭//아이템획득//리스트
            this.bricksWithItems.push("brick" + randomBrick);                          //"blick2"저장 //블록이름만 저장 //dropOneItems: 에서 랜덤아이템제공

            brickStartLimit = brickEndLimit + 1;                                 // 5+1 -->6 //다음구간 시작인덱스
            brickEndLimit += brickPartLimit;                                     // 5+5 -->10//다음구간 끝 인덱스
        }

        if(dm) console.log("-----------------------------------bricksWithItems.len:"+this.bricksWithItems.length);
        if(dm) console.log("-----------------------------------bricks.len:"+_len);

        //---랜덤용 아이템 배치(아이템이름없이 블록에 배치만 한다)------------------------------
    },

    createTile1 : function( _xg, _yg, _acolor ){
        var xp = strtx + (_xg * szx);
        var yp = strty + (_yg * szy);
        var _atile1 = this.tiles.create(
            xp,
            yp,
            'atlas_bb-0',
            (_acolor === 0 ? 'block_white.png'
                : _acolor === 1 ? 'block_crimson.png'
                    : _acolor === 2 ? 'block_red.png'		//오렌지
                        : _acolor === 3 ? 'block_yellow.png'
                            : _acolor === 4 ? 'block_green.png'
                                : _acolor === 5 ? 'block_lightblue.png'     //하늘색
                                    : _acolor === 6 ? 'block_deepblue.png'     //파랑
                                        : _acolor === 7 ? 'block_pupple.png'  //보라
                                            : _acolor === 8 ? 'block_choco_3.png'   //하드
                                                : _acolor === 9 ? 'block_gold.png'    //무적
                                                    : 'block_white.png')
        );
        _atile1.z_initx = xp;
        _atile1.z_inity = yp;
        _atile1.z_x=_xg; //그리드(타일)좌표 입력
        _atile1.z_y=_yg;

        _atile1.z_color = _acolor;
        _atile1.z_step = 0;
        _atile1.body.bounce.set(1);
        _atile1.body.immovable = true;
        _atile1.anchor.setTo(0.5,0.5); //피봇-->중심으로
        _atile1.body.enable=true;

        if(_acolor === 9 ) {
            this.countgold += 1;
            this.countgoldcur += 1;
        } //무적블록수 갯수 합산

        //칼라블록 개수 계산 //아이템 렌덤생성시 사용
        //if(_acolor!==0 || _acolor!==8) _tilecount_colored+=1;

        _atile1.name = 'brick' + (new Date());

        //공통 애니 설정
        //'block_bomb_white.png',
        _atile1.animations.add('kill', [//보통블록터짐애니
            // 'block_bomb_type_2_1.png',
            // 'block_bomb_type_2_2.png',
            // 'block_bomb_type_2_3.png',
            // 'block_bomb_type_2_4.png',
            // 'block_bomb_type_2_5.png',
            // 'block_bomb_type_2_6.png',
            // 'block_bomb_type_2_7.png',
            // 'block_bomb_type_2_8.png',
            // 'block_bomb_type_2_9.png',
            // 'block_bomb_type_2_10.png'
            'block_bomb_1.png',
            'block_bomb_2.png',
            'block_bomb_3.png',
            'block_bomb_4.png',
            'block_bomb_5.png',
            'block_bomb_6.png',
            'block_bomb_7.png',
            'block_bomb_8.png',
            'block_bomb_9.png',
            'block_bomb_10.png'
        ]);
        _atile1.z_onkill = function () {
            var emitter = this.game.add.emitter(0, 0, 100);
            emitter.makeParticles('brick-dust');
            emitter.x = _atile1.x + this.width * 0.5;
            emitter.y = _atile1.y + this.height * 0.5;
            emitter.minParticleSpeed.setTo(-50 * SCALE, -50 * SCALE);
            emitter.maxParticleSpeed.setTo(50 * SCALE, 50 * SCALE);
            emitter.minParticleScale = 1 * SCALE;
            emitter.maxParticleScale = 1.5 * SCALE;
            emitter.start(true, 300, null, 10);

            this.game.time.events.add(2000, function () {
                    emitter.destroy();
                }
            );
        };

        //_tile1.animations.add('fire', ['block_fire.png', 'block_fire_75.png', 'block_fire_50.png', 'block_fire_25.png']);
        _atile1.animations.add('fire', [ //불타는 블록애니
            'block_bomb_fire_1.png',
            'block_bomb_fire_2.png',
            'block_bomb_fire_3.png',
            'block_bomb_fire_4.png',
            'block_bomb_fire_5.png',
            'block_bomb_fire_6.png',
            'block_bomb_fire_7.png'
        ]);

        _atile1.animations.add('killpoint', [//총알터짐애니
            'shot_bomb_ani_1.png',
            'shot_bomb_ani_2.png',
            'shot_bomb_ani_3.png'
        ]);

        _atile1.animations.add('kill_choco', [ //초코 블록애니
            'choco_block_bomb_1.png',
            'choco_block_bomb_2.png',
            'choco_block_bomb_3.png',
            'choco_block_bomb_4.png',
            'choco_block_bomb_5.png',
            'choco_block_bomb_6.png',
            'choco_block_bomb_7.png',
            'choco_block_bomb_8.png',
            'choco_block_bomb_9.png',
            'choco_block_bomb_10.png'
        ]);

        //타일속성에 따라 처리
        switch (_acolor) {
            case 8:
                _atile1.animations.add('show0', ['block_bomb_white.png','block_choco_2.png']);
                _atile1.animations.add('showdefault', ['block_choco_3.png']); //레벨11번(인덱스10)
                //sprite.animations.currentAnim.onComplete.add(function () {	console.log('animation complete');}, this);
                //var anim = m.animations.play('mole_go_out', 24, false);       anim.onComplete.add(this.stopBunny, this);},
                _atile1.animations.add('show1', ['block_bomb_white.png', 'block_choco_1.png']);
                //anim.onComplete.add(_tile1.kill(), this);
                _atile1.z_step = 2;//초기화
                break;
            case 9:
                _atile1.animations.add('show0', [ //레벨21번(인덱스20) 무적
                    'block_gold.png',
                    'block_gold_ani_1.png',
                    //'block_gold_ani_2.png',
                    'block_gold_ani_3.png',
                    //'block_gold_ani_4.png',
                    'block_gold_ani_5.png',
                    //'block_gold_ani_6.png',
                    'block_gold_ani_7.png',
                    //'block_gold_ani_8.png',
                    'block_gold_ani_9.png',
                    'block_gold.png'
                ]);
                break;

            default:
                break;
        }//switch (_acolor)
        return _atile1;
    },

    createTileScore: function ( grp ) {
        var _i=0;
        var _len= 198;
        var _tilescore1;
        for (_i = 0; _i < _len; _i++) {
            _tilescore1 = uigame.add.text(0, 0, "", style_bb_floatingscore, grp);
            _tilescore1.anchor.setTo(0.5,0.5);

            var xoff = uigame.rnd.integerInRange(-300, 300);
            var yoff = uigame.rnd.integerInRange(-300, 300);
            _tilescore1.position.setTo(xc+xoff,yc+yoff);

        }//for (_i
        grp.forEach(function (n) {
            if (n.alive) {
                n.kill();
            }
        }, this);
    },
    gotoLevel: function (idx) {
        curLevel = idx;
        curLevelFake = curLevel + 1 - Math.floor(curLevel / LV4x4);
        if(dm) console.log("curLevel:"+curLevel+",  curLevelFake:"+curLevelFake);

        if (idx < 0) curLevel = 0;
        else if (idx >= bubble_levels.length) curLevel = bubble_levels.length - 1;
        else curLevel = idx;

        this.copyLevel(curLevel); // 메시브 gotolevel
        this.resetBalls();      //사용안함
        this.initLevelVars();
        this.resetCountDown(); //없음
        this.resetBullets();

        this.setPadSizeDirect(PadSize.normal);//gotolevel;
        //this.levelText.content = 'level: ' + (curLevel + 1);
    },
    resetBullets: function () {
        this.bullets.callAll('kill');
        gunstate = ThreeState.none;
        PadAttr_bullet= false; //in resetBullet
        this.paddle.z_left.visible = false;
        this.paddle.z_right.visible = false;
    },

    resetCountDown: function () {
        return;

        this.countDown.revive();
        this.countDown.play("counter_three");
        this.countDownTime = 3;
        this.countDownTimeElapsed = 0;
        this.countDownsecondTick = 1;
        this.isCountDownOff = false;
    },

    //볼을 모두죽이고 1개만 살린다.
    resetBalls: function () {//볼을 전체 하이드, nextlevel,prevlevel에서 사용 //안사용
        this.balls.callAll('kill'); //피직스볼 초기화 삭제

        var aball = this.balls.getFirstDead();        //공1개를 가져오기(보이지않는다)

        aball.x = this.paddle.x;
        aball.y = this.paddle.y;

        aball.revive();
        aball.reset(xc,yc);

        this.ball = aball; //애니볼이면 //ball.animations.stop();
        this.followPaddle(); //in resetBalls

        this.ball = aball;
    },

    // reset1ballWithPaddle: function (vball, vpaddle) {
    //     //vpaddle.body.y를 사용하니 위로 올라간 위치로 나와서 수정
    //     //미친다
    //     this.ball=vball;
    //     vball.body.velocity.set(0);
    //     var x = vpaddle.x;// - vball.body.halfWidth;
    //     var y = vpaddle.y - vpaddle.body.halfHeight - vball.body.halfHeight;
    //     vball.reset( x, y );
    //
    // },

    copyBalls: function () {//공복제모드시
        this.ballInitialX = this.game.world.centerX;
        this.ballInitialY = this.paddlePosY - 16;//this.ballInitialY = this.paddle.y - 16;
        if (this.balls.countLiving() < 32) {
            //2승수로 복제하기------------------
            var px = [];
            var py = [];
            var vx = [];
            var vy = [];
            this.balls.forEachAlive(function(n) {
                px.push(n.x);
                py.push(n.y);
                var maxranx = Math.abs(n.body.velocity.x * 0.2);
                var maxrany = Math.abs(n.body.velocity.y * 0.2);
                var ranx = generateRandomNumber(-maxranx, maxranx);
                var rany = generateRandomNumber(-maxrany, maxrany);
                vx.push(n.body.velocity.x + ranx);
                vy.push(n.body.velocity.y + rany);
            }, this);
            var len;
            for(i=0, len=px.length; i<len; i++){
                var ballnew = this.balls.getFirstDead();//복제공모드
                ballnew.z_itemtype = 0;
                ballnew.reset(px[i]+1,py[i]+1);
                ballnew.body.velocity.set(vx[i],vy[i]);
            }
            //2승수로 복제하기-----------------------

            this.setBallStateDirect(this.ballstate);//공텍스쳐교체

            this.setTrails(); //25버전개조---in copyballs
        }
    },
    //스프라이트 볼 생성하고 나서, 사용
    copyBall1: function () {  //active는 복제공모드(속도 지정)을 한다.
        //위치값 초기 설정
        this.ballInitialX = this.game.world.centerX;
        this.ballInitialY = this.paddlePosY - 16;//this.ballInitialY = this.paddle.y - 16;

        //공1개를 살린다.
        var ball1 = this.balls.getFirstDead();//리스타트모드

        ball1.body.velocity.setTo(0);
        ball1.revive(); //공을 "alive"상태로
        ball1.reset(xc,yc);

        this.ball = ball1; //애니볼이면 //ball.animations.stop();
        //패들위에 위치를 잡는다
        this.followPaddle(); //in copyBall1 //t1

        this.navi.x= game.world.centerX;
        //this.navi.y= this.paddlePosY - (this.paddle.body.halfHeight/2) - this.ball.body.halfHeight;
        this.navi.y= this.paddlePosY - this.paddle.body.halfHeight -this.ball.body.halfHeight;
        //공1개를 살린다.
        this.setBallStateDirect(BallType.normal_n);
        gunstate = ThreeState.none;

        this.setTrails();//25버전개조---in copyBall1

    },
    initTrails: function () {
        this.trails.z_idxacum  = [0,0,0,0,0];//누적인덱스// 생성시 누적 위치가 없으면 안나오게
        this.trails.z_idxoff  = 0;//현재인덱스
        this.trails.z_idxaddstep= 1;
        this.trails.z_trailstep    = 5;
        //this.trails.z_len     =15;
        this.trails.z_ballcnt = 0;

        this.changeTrails(BallType.normal_n);
        //this.trails.z_type = BallType.normal_n;

    },
    setTrails: function () {
        //25버전개조---   개조 한것을 볼갯수에 맞게 트레일이 보이게 세팅한다.
        //var _t=0;
        //현재 트레일 가지 개수를 저장
        this.trails.z_ballcnt = this.balls.countLiving();
        if(this.trails.z_ballcnt>5 || this.trails.z_ballcnt===0){
            //공이 없거나 5개 넘으면 트레일 숨기기
            //25버전개조 - 전부 하이드
            for (var k = 0; k < 5; k++) {
                for (var i = 0; i < 5; i++) {
                    if(this.trails.z_obj[k][i].visible === true) {
                        this.trails.z_obj[k][i].visible = false;
                    }//트레일a가 보이면 숨기기
                }//5번 반복
            }//5번 반복
        }else {

            //트레일1줄의 공갯수
            this.trails.z_trailstep = this.trails.z_ballcnt === 1 ? 5
                : this.trails.z_ballcnt === 2 ? 4
                : this.trails.z_ballcnt === 3 ? 3
                : this.trails.z_ballcnt === 4 ? 2
                : this.trails.z_ballcnt === 5 ? 1
                : 0;
            //this.trails.z_trailstep = 5-(this.trails.z_ballcnt-1);//공1개면 5, 공5개면 1

            this.hideTrails();

            //25버전개조 - 해당트레일만 보이게
            for (var k = 0; k < this.trails.z_ballcnt; k++) {
                //for (var i = 0; i < this.trails.z_trailstep; i++) {
                for (var i = 0; i < 5; i++) {
                    if(this.trails.z_obj[k][i].visible === false) {
                        //if(i===0) this.trails.z_obj[k][i].tint = ColorSet.red; //25버전개조--- 빨강색
                        //if(i===1) this.trails.z_obj[k][i].tint = ColorSet.blue; //25버젼개조--- 파랑색
                        this.trails.z_obj[k][i].alpha = 0.25-(i*0.05);
                        this.trails.z_obj[k][i].visible = true;
                        this.trails.z_obj[k][i].position.setTo(-100,-100);
                    }//트레일a가 보이면 숨기기
                }//5번 반복
            }//5번 반복

        }//볼카운트가 5이하면
    },
    hideTrails: function () {
        //25버전개조 - 트레일 전부 하이드
        for (var k = 0; k < 5; k++) {
            for (var i = 0; i < 5; i++) {
                if(this.trails.z_obj[k][i].visible === true) {
                    this.trails.z_obj[k][i].visible = false;
                }//트레일a가 보이면 숨기기
            }//5번 반복
        }//5번 반복
    },
    changeTrails: function (val_state) {//25버전개조 - 트레일 전부 텍스쳐 교체 ==setBallStateDirect(
        if(this.trails.z_type === val_state) return;
        this.trails.z_type = val_state;
        //-------------------------------------------------------------------
        switch (val_state) {
            //노말--------------------------------------
            case BallType.normal_n:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_normal_middle.png');
                    }
                }
                break;
            case BallType.normal_s:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_normal_small.png');
                    }
                }
                break;
            case BallType.normal_b:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_normal_big.png');
                    }
                }
                break;
            //통과 --------------------------------------
            case BallType.through_n:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_normal_middle_special.png');
                    }
                }
                break;
            case BallType.through_s:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_normal_small_special.png');
                    }
                }
                break;
            case BallType.through_b:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_normal_big_special.png');
                    }
                }
                break;
            //폭발--------------------------------------
            case BallType.bomb_n:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_fire_middle_ani_1.png');
                    }
                }
                break;
            case BallType.bomb_s:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_fire_small_ani_1.png');
                    }
                }
                break;
            case BallType.bomb_b:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_fire_big_ani_1.png');
                    }
                }
                break;
            //관통 + 폭발--------------------------------------
            case BallType.throughbomb_n:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_fire_middle_special.png');
                    }
                }
                break;
            case BallType.throughbomb_s:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_fire_small_special.png');
                    }
                }
                break;
            case BallType.throughbomb_b:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_fire_big_special.png');
                    }
                }
                break;
            ///-------------------
            default:
                for (var k = 0; k < 5; k++) {
                    for (var i = 0; i < 5; i++) {
                        this.trails.z_obj[k][i].loadTexture('atlas_bb-0', 'ball_normal_middle.png');
                    }
                }
                break;
        }//switch
        //-------------------------------------------------------------------
    },
    onsavePosTrails: function() {
        // 지정된 무조건 공위치 저장
        if(this.balls.countLiving()>5) return;
        this.balls.forEachAlive(function(n) {
            if(n.z_posidx===-1) {
                n.z_posarr[0][0] = n.x;
                n.z_posarr[0][1] = n.y;
                n.z_posidx=0;
                n.z_accum=0;
            }else{
                n.z_posarr[n.z_posidx][0] = n.x;
                n.z_posarr[n.z_posidx][1] = n.y;
                n.z_posidx+=1;
                n.z_accum+=1;
                if(n.z_posidx>4) n.z_posidx=0;
            }
        }, this);
        //  console.log("--");
    },
    onupdateSetPosTrail: function() {
        //----------------

        if(this.balls.countLiving()>5) return;
        var old04=[-1,-1,-1,-1,-1];
        var old0;
        var old1;
        var old2;
        var old3;
        var old4;
        this._i;
        this._j=0;//-->trailcount
        this._k=0;//old0
        this._m=0;//old1
        this._n=0;//old2
        this._o=0;//old3
        this._p=0;//old4
        var _cnt=0;
        this.balls.forEachAlive(function(n) { //볼의 갯수만큼
            //if(_cnt>this.trails.z_trailstep-1) return;//잘못된 연산

            old04[0]=n.z_posidx-1;
            if(old04[0]<0) old04[0]=5+old04[0];
            old04[1]=n.z_posidx-2;
            if(old04[1]<0) old04[1]=5+old04[1];
            old04[2]=n.z_posidx-3;
            if(old04[2]<0) old04[2]=5+old04[2];
            old04[3]=n.z_posidx-4;
            if(old04[3]<0) old04[3]=5+old04[3];
            old04[4]=n.z_posidx-5;
            if(old04[4]<0) old04[4]=5+old04[4];

            for(this.j=0; this.j<5; this.j++) {//트레일 최대 5단계
                if (n.z_accum === -1) {
                    this.trails.z_obj[_cnt][this.j].x = -100;
                    this.trails.z_obj[_cnt][this.j].y = -100;
                } else if (n.z_accum === 0) {
                    if(this.j===0){
                        this.trails.z_obj[_cnt][this.j].x = n.z_posarr[old04[this.j]][0];
                        this.trails.z_obj[_cnt][this.j].y = n.z_posarr[old04[this.j]][1];
                    }else{
                        this.trails.z_obj[_cnt][this.j].x = -100;
                        this.trails.z_obj[_cnt][this.j].y = -100;
                    }
                } else if (n.z_accum === 1) {
                    if(this.j<=1) {
                        this.trails.z_obj[_cnt][this.j].x = n.z_posarr[old04[this.j]][0];
                        this.trails.z_obj[_cnt][this.j].y = n.z_posarr[old04[this.j]][1];
                    }else{
                        this.trails.z_obj[_cnt][this.j].x = -100;
                        this.trails.z_obj[_cnt][this.j].y = -100;
                    }
                } else if (n.z_accum === 2) {
                    if(this.j<=2) {
                        this.trails.z_obj[_cnt][this.j].x = n.z_posarr[old04[this.j]][0];
                        this.trails.z_obj[_cnt][this.j].y = n.z_posarr[old04[this.j]][1];
                    }else{
                        this.trails.z_obj[_cnt][this.j].x = -100;
                        this.trails.z_obj[_cnt][this.j].y = -100;
                    }
                } else if (n.z_accum === 3) {
                    if(this.j<=3) {
                        this.trails.z_obj[_cnt][this.j].x = n.z_posarr[old04[this.j]][0];
                        this.trails.z_obj[_cnt][this.j].y = n.z_posarr[old04[this.j]][1];
                    }else{
                        this.trails.z_obj[_cnt][this.j].x = -100;
                        this.trails.z_obj[_cnt][this.j].y = -100;
                    }
                } else if (n.z_accum === 4) {
                    if(this.j<=4) {
                        this.trails.z_obj[_cnt][this.j].x = n.z_posarr[old04[this.j]][0];
                        this.trails.z_obj[_cnt][this.j].y = n.z_posarr[old04[this.j]][1];
                    }else{
                        this.trails.z_obj[_cnt][this.j].x = -100;
                        this.trails.z_obj[_cnt][this.j].y = -100;
                    }
                } else if (n.z_accum >= 5) {
                    if(this.j<this.trails.z_trailstep) { //25개버전--- 전체 작동하는 중
                        this.trails.z_obj[_cnt][this.j].x = n.z_posarr[old04[this.j]][0];
                        this.trails.z_obj[_cnt][this.j].y = n.z_posarr[old04[this.j]][1];
//                        this.trails.z_obj[_cnt][old04[this.j]].x = n.z_posarr[old04[this.j]][0];
//                        this.trails.z_obj[_cnt][old04[this.j]].y = n.z_posarr[old04[this.j]][1];
                    }else{
                        if(this.trails.z_obj[_cnt][this.j].y !== -100) {
                            this.trails.z_obj[_cnt][this.j].x = -100;
                            this.trails.z_obj[_cnt][this.j].y = -100;
                        }
                    }
                }

            }
            _cnt+=1;
        }, this);
        //----------------
    },
    dropOneItems: function (dropItemInitialX, dropItemInitialY) { //아이템 떨구기 //아이템 항목지정하는것
        var itmidx = uigame.rnd.integerInRange(1, ItemType.length - 1); //랜덤(0~3포함)

        //아이템드롭하기//속성랜덤
        if(modeOption[0]===2){
            //보너스스테이지
            itmidx = uigame.rnd.weightedPick([1, 2, 3, 7]);
        }else {
            if (curLevelFake >= 1 && curLevelFake <= 9) {
                itmidx = uigame.rnd.weightedPick([1, 2, 3, 4, 5, 6]);
            } else if (curLevelFake === 10) {
                itmidx = uigame.rnd.weightedPick([2, 3, 9]);
            // } else if (curLevelFake === 100 || curLevelFake === 200 || curLevelFake === 300) {
            //     return;
            } else { //11~319
                //기본랜덤 그대로
            }
        }
        // case 1:         //1 //패들 확대 (1단계씩)
        // case 2:         //2 //공 복사
        // case 3:         //3 //총알모드
        // case 4:         //4 //접착모드
        // case 5:         //5 //블록 관통
        // case 6:         //6 //공 불덩이 (폭발)
        // case 7:         //7 //공 확대 (1단계씩)
        // case 8:         //8 //공 느리게 (1단계씩)
        // case 9:         //9 //블록 hp=1
        // case 10:         //10//패들 축소
        // case 11:        //11//패들 축소(강제)
        // case 12:        //12//공 빠르게(4단계)
        // case 13:        //13//공 축소
        // case 14:        //14//죽기

        //itmidx = uigame.rnd.weightedPick([1,2,3,4]);
        //itmidx = uigame.rnd.weightedPick([7,6,9]);//공확대+불공+hp1
        //itmidx = uigame.rnd.weightedPick([12]);   //공속빠르게
        //itmidx = uigame.rnd.weightedPick([10,1]); //패들축소+패들확대
        //itmidx = uigame.rnd.weightedPick([2]);    //공복사만
        //itmidx = uigame.rnd.weightedPick([3,5,6]);//총알+관통+불공
        //itmidx = uigame.rnd.weightedPick([5,6]);  //관통+불공만
        //itmidx = uigame.rnd.weightedPick([4]);    //접착만
        //itmidx = uigame.rnd.weightedPick([3]);    //총알만
        //itmidx = uigame.rnd.weightedPick([5]);    //관통만
        //itmidx = uigame.rnd.weightedPick([7]);    //빅볼만

        if(modeOption[0]===2) {                      //보너스모드면,  //폭발,관통 아이템 중지
            if (itmidx === 6 || itmidx === 5) itmidx = 1;
        }else if( modeOption[0]===1){                //드롭모드       //폭발 중지
            if(itmidx===6) itmidx=1;
        }else if(this.mskllen>0 || this.mskrlen>0){  //수평이동모드 //폭발 아이템 중지
            if(itmidx===6) itmidx=1;
        }

        var dropItem;
        //var xp=this.getRandomInt(32, this.game.world.width - 64);
        //var yp = -32;

        //랜덤x 포지션//아이템 떨이질때
        var offxmax = this.tile1width * 0.5;
        var offx = generateRandomNumber(-offxmax, offxmax);
        var offymax = this.tile1height * 0.5;
        var offy = generateRandomNumber(-offymax, offymax);

        if (dropItemInitialY + offy > 1280 - (this.tile1width*1.5)) {
            dropItemInitialY = 1280;
            offy = -(this.tile1width*1.5);
        } else if (dropItemInitialY + offy < (this.tile1width*1.5)){
            dropItemInitialY = 0;
            offy = this.tile1width*1.5;
        }
        dropItem = this.game.add.sprite(dropItemInitialX + offx, dropItemInitialY+offy,
            'atlas_bb-0',//'tiles',
            ItemType[itmidx]//typeFrame
        );
        //dropItem.enableBody = true;
        //dropItem.physicsdBodyType = Phaser.Physics.ARCADE;
        dropItem.anchor.set(0.5);
        dropItem.checkWorldBounds = true;
        this.game.physics.enable(dropItem, Phaser.Physics.ARCADE);
        dropItem.body.collideWorldBounds = true;
        dropItem.body.bounce.set(1);
        //dropItem.events.onOutOfBounds.add(this.helpers.death, this);

        var tempCount = 0;
        if (this.items.countLiving() > 0) {
            tempCount = this.items.countLiving();
        }
        dropItem.name = 'item' + (tempCount + 1);

        //custom property
        dropItem.itmidx = itmidx;

        // dropItem.body.x = dropItemInitialX;
        // dropItem.body.y = dropItemInitialY;
        dropItem.body.velocity.y = 300;

        TweenMax.killTweensOf(dropItem);
        TweenMax.fromTo( dropItem.scale,
            0.15, //time
            {
                x: 1,
                y: 1,

            }, { //메달트윈
                x: 0.75,
                y: 0.75,
                ease: Linear.easeNone,
                yoyo:true,
                repeat:-1,
                //onComplete: fnEnd,
                //onComplete: function(){ runFadeinScale(con);},
                //onStart: function(){ },
                //onUpdate: function(){},
                //delay: 0.2
            }
        );
        //dropItem.animations.add('killpoint', ['shot_bomb_ani_1.png', 'shot_bomb_ani_2.png', 'shot_bomb_ani_3.png']);

        this.items.add(dropItem);

    },
    setBallVelocity: function (tempBall, thisball) { //공1개의 xy속도 지정한다. //복제시
        // //tempBall.body.velocity.x = this.initialDirection * this.ballSpeed;
        // //tempBall.body.velocity.y = this.ballSpeed;
        // var maxranx = Math.abs(thisball.body.velocity.x * 0.2);
        // var maxrany = Math.abs(thisball.body.velocity.y * 0.2);
        // var ranx = generateRandomNumber(-maxranx, maxranx);
        // var rany = generateRandomNumber(-maxrany, maxrany);
        // tempBall.body.velocity.x = thisball.body.velocity.x + ranx;
        // tempBall.body.velocity.y = thisball.body.velocity.y + rany;

    },
    ballUpdate: function (ball) { //113버젼// update안에서 this.balls.forEachAlive안에서 실행된 함수
        //
        //     //볼이 텍스쳐 애니//ball.animations.play('rotate');
        //
        //     //지하영역으로 가면
        //     if (ball.body.y > this.game.world.height + ball.body.height) {
        //
        //         ball.body.x = this.ballInitialX;
        //         ball.body.y = this.ballInitialY;
        //         ball.body.velocity.x = 0;
        //         ball.body.velocity.y = 0;
        //
        //         ball.kill();
        //         this.ballsCount -= 1;
        //
        //         if (this.ballsCount <= 0) {
        //
        //             this.takeOneLifeDown();
        //
        //             //clear and reset some stuff when player drops the ball and lose a lige
        //             this.items.callAll('kill');
        //             this.padsize = PadSize.normal; //this.isPaddleNerfed = false;
        //
        //         }
        //
        //     }
        //     return;
        //     //벽충돌시 각도설정 아님
        //     //왼쪽 내부벽 충돌인식
        //     if (ball.body.x < this.wallWidth) {
        //         ball.body.x = this.wallWidth;
        //         ball.body.velocity.x *= -1;
        //     }
        //     //오른쪽 내부벽 충돌인식
        //     if (ball.body.x > this.game.world.width - this.wallWidth - ball.body.width) {
        //         ball.body.x = this.game.world.width - this.wallWidth - ball.body.width;
        //         ball.body.velocity.x *= -1;
        //     }
        //     //위쪽 내부벽 충돌
        //     if (ball.body.y < 16) {
        //         ball.body.velocity.y = Math.abs(ball.body.velocity.y);
        //     }
        //     //최고 속도 도달
        //     if (ball.body.velocity.x > this.ballMaxVel) {
        //         ball.body.velocity.x = this.ballMaxVel;
        //     }
        //     if (ball.body.velocity.y > this.ballMaxVel) {
        //         ball.body.velocity.y = this.ballMaxVel;
        // }
    },

    getRandomInt: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    createballsSprite: function () {
        for (var i = 0; i < 64; i++) {
            //스프라이트생성
            //var aball = this.game.add.sprite(this.ballInitialX, this.ballInitialY, "ball");
            var aball = this.game.add.sprite(this.ballInitialX, this.ballInitialY, "atlas_bb-0", "ball_normal_middle.png");
            aball.animations.add('hit_normal', ['ball_normal_middle_white.png', 'ball_normal_middle.png']);
            aball.animations.add('hit_small', ['ball_normal_small_white.png', 'ball_normal_small.png']);
            aball.animations.add('hit_big', ['ball_white_big.png', 'ball_normal_big.png']);
            aball.animations.add('fire_big', [
                'ball_fire_big_ani_1.png',
                'ball_fire_big_ani_2.png',
                'ball_fire_big_ani_3.png',
                'ball_fire_big_ani_4.png'
            ]);
            aball.animations.add('fire_normal', [
                'ball_fire_middle_ani_1.png',
                'ball_fire_middle_ani_2.png',
                'ball_fire_middle_ani_3.png',
                'ball_fire_middle_ani_4.png'
            ]);
            aball.animations.add('fire_small', [
                'ball_fire_small_ani_1.png',
                'ball_fire_small_ani_2.png',
                'ball_fire_small_ani_3.png',
                'ball_fire_small_ani_4.png'
            ]);
            aball.animations.add('killpoint', [
                'shot_bomb_ani_1.png',
                'shot_bomb_ani_2.png',
                'shot_bomb_ani_3.png'
            ]);

            //애니 테스트// aball.animations.play('fire_big', 20, true, undefined); //loop
            //애니 테스트// aball.animations.play('fire_normal', 20, true, undefined); //loop
            //애니 테스트// aball.animations.play('fire_small', 20, true, undefined); //loop

            //this.ballsize = 1;

            //var aball = this.game.add.sprite(this.ballInitialX, this.ballInitialY, "ball_other");
            aball.z_balltype = BallType.normal_n;
            aball.anchor.set(0.5);
            //물리설정
            aball.checkWorldBounds = true;
            this.game.physics.enable(aball, Phaser.Physics.ARCADE);
            aball.body.collideWorldBounds = true;
            aball.body.bounce.set(1);
            aball.x=360;
            aball.y=1000;
            aball.body.velocity.setTo(0);
            aball.events.onOutOfBounds.add(this.helpers.death, this);
            //이름설정
            aball.name = 'ball' + (i + 1);
            //25버전개조---볼1 생성시 각각 저장배열생성
            aball.z_posarr=[[0,0],[0,0],[0,0],[0,0],[0,0]];
            aball.z_posidx=-1;
            aball.z_accum=-1;
            //그룹에 등록
            this.balls.add(aball);
            aball.kill();            // 초기상태를 죽기로 변환
        }
    },
    createtrailsSprite: function () {
        //25버전개조--- 개조 시도(트레일 스프라이트 생성시)
        this.trails.z_idxacum  = [0,0,0,0,0];//누적인덱스// 생성시 누적 위치가 없으면 안나오게
        this.trails.z_idxoff  = 0;//현재인덱스
        this.trails.z_idxaddstep= 1;
        this.trails.z_trailstep    = 5;
        //this.trails.z_len     =15;
        this.trails.z_ballcnt = 0;
        this.trails.z_type = BallType.normal_n;

        this.trails.z_balls = [ //실제 공이 들어갈 배열
            null, null, null, null, null
        ];
        this.trails.z_obj=[     //트레일용 공이 들어갈 배열
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ];
        this.trails.z_pos=[
            [[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0]],
            [[0,0],[0,0],[0,0],[0,0],[0,0]]
        ];

        for (var k = 0; k < 5; k++) {
            for (var i = 0; i < 5; i++) {
                //스프라이트생성
                var traila = this.game.add.sprite(this.ballInitialX, this.ballInitialY, "atlas_bb-0", "ball_normal_middle.png");
                traila.anchor.set(0.5);
                traila.position.setTo(360, 1000);
                traila.alpha = 0.25;
                traila.name = 'trail' + (i + 1);

                this.trails.add(traila);            //그룹에 등록

                //traill.kill();            // 초기상태를 죽기로 변환
                traila.visible = false;

                this.trails.z_obj[k][i] = traila;
                //console.log(k);
                //console.log(i);
            }
        }
    },
    createbearsGSprite: function () { //녹곰 작은곰-->큰곰으로 성장
        for (var i = 0; i < 32; i++) {
            //스프라이트생성
            var greenBear = this.game.add.sprite(0, 0, "atlas_bb-0", "jelly_80_green.png");
            greenBear.z_hitcount=0;
            greenBear.z_accum=0;
            greenBear.z_color="green";
            greenBear.animations.add('greenbearshow', [
                'mini_bear_ani_1.png',
                'mini_bear_ani_2.png',
                'mini_bear_ani_3.png',
                'mini_bear_ani_4.png',
                'mini_bear_ani_5.png',
                'mini_bear_ani_6.png',
                'mini_bear_ani_7.png',
                'mini_bear_ani_8.png',
                'mini_bear_ani_9.png',
                'mini_bear_ani_10.png',
                'mini_bear_ani_11.png',
                'mini_bear_ani_12.png',
                'mini_bear_ani_13.png',
                "jelly_80_green.png"
            ]);
            greenBear.animations.add('hit_0', [ //소
                'jelly_80_green.png',
                'jelly_80_green_w25.png',
                'jelly_80_green_w50.png',
                'jelly_80_green_w75.png',
                'jelly_80_white.png',
            ]);
            greenBear.animations.add('hit_1', [ //중
                'jelly_160_green.png',
                'jelly_160_green_w25.png',
                'jelly_160_green_w50.png',
                'jelly_160_green_w75.png',
                'jelly_160_white.png'
            ]);
            greenBear.animations.add('kill', [ //대
                'jelly_240_green.png',
                'jelly_240_green_w25.png',
                'jelly_240_green_w50.png',
                'jelly_240_green_w75.png',
                'jelly_240_white.png'
            ]);

            greenBear.animations.add('div_0', [ //분열0
                'jelly_160_white.png',
                'jelly_160_green_w75.png',
                'jelly_160_green_w50.png',
                'jelly_160_green_w25.png',
                'jelly_160_green.png',
                'jelly_160_green_w25.png',
                'jelly_160_green_w50.png',
                'jelly_160_green_w75.png',
                'jelly_160_white.png',
                'jelly_160_green_w75.png',
                'jelly_160_green_w50.png',
                'jelly_160_green_w25.png',
                'jelly_160_green.png'
            ]);
            greenBear.animations.add('div_1', [ //분열1
                'jelly_240_white.png',
                'jelly_240_green_w75.png',
                'jelly_240_green_w50.png',
                'jelly_240_green_w25.png',
                'jelly_240_green.png',
                'jelly_240_green_w25.png',
                'jelly_240_green_w50.png',
                'jelly_240_green_w75.png',
                'jelly_240_white.png',
                'jelly_240_green_w75.png',
                'jelly_240_green_w50.png',
                'jelly_240_green_w25.png',
                'jelly_240_green.png'

            ]);
            //애니 테스트 aball.animations.play('hit_normal', 15, false, undefined); //1time

            greenBear.anchor.set(0.5);
            //물리설정
            greenBear.checkWorldBounds = true;
            this.game.physics.enable(greenBear, Phaser.Physics.ARCADE);
            greenBear.body.setSize(greenBear.body.width - 50, greenBear.body.height - 50, 25*2, 25*2);
            greenBear.body.collideWorldBounds = true;
            greenBear.body.bounce.set(1);
            greenBear.events.onOutOfBounds.add(this.helpers.death, this);
            //이름설정
            greenBear.name = 'greenBear' + (i + 1);
            //그룹에 등록
            this.greenBears.add(greenBear);
            greenBear.kill();            // 초기상태를 죽기로 변환
        }
    },
    createbearsRSprite: function () { //적색곰 큰곰-->작은곰으로 성장
        for (var i = 0; i <32; i++) {
            //스프라이트생성
            var redBear = this.game.add.sprite(0, 0, "atlas_bb-0", "jelly_160_red.png");
            redBear.z_hitcount=0;
            redBear.z_accum=0;
            redBear.z_color="red";
            redBear.animations.add('redbearshow', [
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
                'bear_ani_13.png',
                "jelly_160_red.png"
            ]);
            redBear.animations.add('hit_0', [ //대 //적곰 히트 애니 생성
                'jelly_160_red.png',
                'jelly_160_red_w25.png',
                'jelly_160_red_w50.png',
                'jelly_160_red_w75.png',
                'jelly_160_white.png'
            ]);
            redBear.animations.add('hit_1', [ //중
                'jelly_80_red.png',
                'jelly_80_red_w25.png',
                'jelly_80_red_w50.png',
                'jelly_80_red_w75.png',
                'jelly_80_white.png'
            ]);
            redBear.animations.add('kill', [ //소
                'jelly_40_red.png',
                'jelly_40_red_w25.png',
                'jelly_40_red_w50.png',
                'jelly_40_red_w75.png',
                'jelly_40_red.png'
            ]);
            redBear.animations.add('div_0', [ //분열0
                'jelly_80_white.png',
                'jelly_80_red_w75.png',
                'jelly_80_red_w50.png',
                'jelly_80_red_w25.png',
                'jelly_80_red.png',
                'jelly_80_red_w25.png',
                'jelly_80_red_w50.png',
                'jelly_80_red_w75.png',
                'jelly_80_white.png',
                'jelly_80_red_w75.png',
                'jelly_80_red_w50.png',
                'jelly_80_red_w25.png',
                'jelly_80_red.png'
            ]);
            redBear.animations.add('div_1', [ //분열1
                'jelly_40_white.png',
                'jelly_40_red_w75.png',
                'jelly_40_red_w50.png',
                'jelly_40_red_w25.png',
                'jelly_40_red.png',
                'jelly_40_red_w25.png',
                'jelly_40_red_w50.png',
                'jelly_40_red_w75.png',
                'jelly_40_white.png',
                'jelly_40_red_w75.png',
                'jelly_40_red_w50.png',
                'jelly_40_red_w25.png',
                'jelly_40_red.png'
            ]);
            //애니 테스트 aball.animations.play('hit_normal', 15, false, undefined); //1time

            redBear.anchor.set(0.5);
            //물리설정
            redBear.checkWorldBounds = true;
            this.game.physics.enable(redBear, Phaser.Physics.ARCADE);
            redBear.body.setSize(redBear.body.width - 50, redBear.body.height - 50, 25, 25);
            redBear.body.collideWorldBounds = true;
            redBear.body.bounce.set(1);

            redBear.events.onOutOfBounds.add(this.helpers.death, this);
            //이름설정
            redBear.name = 'redBear' + (i + 1);
            //그룹에 등록
            this.redBears.add(redBear);
            redBear.kill();            // 초기상태를 죽기로 변환
        }
    },
    createbulletsSprite: function () {
        for (var i = 0; i < 64; i++) {
            //스프라이트생성
            var bullet1 = this.game.add.sprite(this.ballInitialX, this.ballInitialY, "atlas_bb-0", "shot_ed0.png");
            bullet1.anchor.set(0.5);
            bullet1.animations.add('idle', [
                'shot_ed0.png',
                'shot_ed1.png',
                'shot_ed2.png'
            ]);
            bullet1.animations.add('kill', [
                'shot_bomb_ani_1.png',
                'shot_bomb_ani_2.png',
                'shot_bomb_ani_3.png'
            ]);
            //물리설정
            bullet1.checkWorldBounds = true;
            this.game.physics.enable(bullet1, Phaser.Physics.ARCADE);
            //bullet1.body.collideWorldBounds = true;
            bullet1.body.bounce.set(1);
            bullet1.body.setSize(bullet1.width*0.5, bullet1.height*0.5, bullet1.width*0.25, bullet1.height*0.25);//총알물리크기조절
            bullet1.events.onOutOfBounds.add(this.helpers.deathbullet1, this);
            bullet1.body.mass=0.001;//총알질량
            //이름설정
            bullet1.name = 'bullet' + (i + 1);
            //그룹에 등록
            this.bullets.add(bullet1);
            //초기상태 하이드
            bullet1.kill();
        }
    },

    createBounds3Sprite: function () {
        //테두리 3개생성----
        var bounds3_top = this.game.add.sprite(0, 0, "white1x1");
        var bounds3_left = this.game.add.sprite(0, 0, "white1x1");
        var bounds3_right = this.game.add.sprite(0, 0, "white1x1");

        bounds3_top.scale.setTo(720 - 28 - 28, 28);
        bounds3_left.scale.setTo(28, 1280);
        bounds3_right.scale.setTo(28, 1280);

        bounds3_top.anchor.setTo(0.5, 1);
        bounds3_left.anchor.setTo(0, 1);
        bounds3_right.anchor.setTo(1, 1);

        bounds3_top.reset(720 * 0.5, 130);
        bounds3_left.reset(0, 1280);
        bounds3_right.reset(720, 1280);

        bounds3_top.alpha = 0.0;
        bounds3_left.alpha = 0.0;
        bounds3_right.alpha = 0.0;

        this.game.physics.enable(bounds3_top, Phaser.Physics.ARCADE);
        this.game.physics.enable(bounds3_left, Phaser.Physics.ARCADE);
        this.game.physics.enable(bounds3_right, Phaser.Physics.ARCADE);

        bounds3_top.body.immovable = true;
        bounds3_left.body.immovable = true;
        bounds3_right.body.immovable = true;

        bounds3_top.body.bounce.set(1);
        bounds3_left.body.bounce.set(1);
        bounds3_right.body.bounce.set(1);

        bounds3_top.name = "bounds3_top";
        bounds3_left.name = "bounds3_left";
        bounds3_right.name = "bounds3_right";

        this.bounds3.add(bounds3_top);
        this.bounds3.add(bounds3_left);
        this.bounds3.add(bounds3_right);
        //테두리 3개생성----

        //좌우 앏은벽 생성
        this.bounds3.sideL = uigame.add.sprite(-346+359, 640+640, "atlas_bb_ui-0", "wall_left.png");
        this.bounds3.sideL.anchor.setTo(0.5, 1);
        this.bounds3.sideL.scale.setTo(1,116);
        this.bounds3.addChild(this.bounds3.sideL); //debug_Sprite(this.bounds3.sideL);
        this.bounds3.sideR = uigame.add.sprite(346+360, 640+640, "atlas_bb_ui-0", "wall_left.png");
        this.bounds3.sideR.anchor.setTo(0.5, 1);
        this.bounds3.sideR.scale.setTo(-1,116);
        this.bounds3.addChild(this.bounds3.sideR); //debug_Sprite(this.bounds3.sideR);
    },
    createBounds4Sprite: function () {
        //테두리 3개생성----
        var bounds3_top = this.game.add.sprite(0, 0, "white1x1");
        var bounds3_left = this.game.add.sprite(0, 0, "white1x1");
        var bounds3_right = this.game.add.sprite(0, 0, "white1x1");
        var bounds3_down = this.game.add.sprite(0, 0, "white1x1"); //debug_Sprite(bounds3_down);

        bounds3_top.scale.setTo(720 - 28 - 28, 28);
        bounds3_left.scale.setTo(28, 1280);
        bounds3_right.scale.setTo(28, 1280);
        bounds3_down.scale.setTo(720 - 28 - 28, 28);

        bounds3_top.anchor.setTo(0.5, 1);
        bounds3_left.anchor.setTo(0, 1);
        bounds3_right.anchor.setTo(1, 1);
        bounds3_down.anchor.setTo(0.5, 0);

        bounds3_top.reset(720 * 0.5, 130);
        bounds3_left.reset(0, 1280);
        bounds3_right.reset(720, 1280);
        bounds3_down.reset(720 * 0.5, 786);

        bounds3_top.tint = ColorSet.orange;
        bounds3_left.tint = ColorSet.orange;
        bounds3_right.tint = ColorSet.orange;
        bounds3_down.tint = ColorSet.orange;

        bounds3_top.alpha = 0.0;
        bounds3_left.alpha = 0.0;
        bounds3_right.alpha = 0.0;
        bounds3_down.alpha = 0.0;

        this.game.physics.enable(bounds3_top, Phaser.Physics.ARCADE);
        this.game.physics.enable(bounds3_left, Phaser.Physics.ARCADE);
        this.game.physics.enable(bounds3_right, Phaser.Physics.ARCADE);
        this.game.physics.enable(bounds3_down, Phaser.Physics.ARCADE);

        bounds3_top.body.immovable = true;
        bounds3_left.body.immovable = true;
        bounds3_right.body.immovable = true;
        bounds3_down.body.immovable = true;

        bounds3_top.body.bounce.set(1);
        bounds3_left.body.bounce.set(1);
        bounds3_right.body.bounce.set(1);
        bounds3_down.body.bounce.set(1);

        bounds3_top.name = "bounds3_top";
        bounds3_left.name = "bounds3_left";
        bounds3_right.name = "bounds3_right";
        bounds3_down.name = "bounds3_right";

        this.bounds4.add(bounds3_top);
        this.bounds4.add(bounds3_left);
        this.bounds4.add(bounds3_right);
        this.bounds4.add(bounds3_down);
        //테두리 3개생성----
    },
    setBulletOffset:function () {
        switch (this.padsize){
            case PadSize.nerf:
                this.bulletx = this.gunpos[0][0];
                this.bullety = this.gunpos[0][1];
                break;
            case PadSize.normal:
                this.bulletx = this.gunpos[1][0];
                this.bullety = this.gunpos[1][1];
                break;
            case PadSize.long:
                this.bulletx = this.gunpos[2][0];
                this.bullety = this.gunpos[2][1];
                break;
            case PadSize.longa:
                this.bulletx = this.gunpos[3][0];
                this.bullety = this.gunpos[3][1];
                break;
            case PadSize.longaa:
                this.bulletx = this.gunpos[4][0];
                this.bullety = this.gunpos[4][1];
                break;
            default:
                this.bulletx = this.gunpos[1][0];
                this.bullety = this.gunpos[1][1];
                break;
        }
    },

    //2.발사 이벤트처리 메소드 함수
    shootBullet: function () {//총알발사
        if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;// 바로전딜레이타임 변수 초기화
        if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;// 딜레이 미만이면 거부
        this.lastBulletShotAt = this.game.time.now;// 바로전딜레이타임 변수에 현재 시간 저장
        //bullet1
        var bullet = this.bullets.getFirstDead();//킬상태인 총알 가져오기
        if (bullet === null || bullet === undefined) return;// 총알상태가 이상하면 거부
        bullet.revive();// 총알을 "alive"상태로
        bullet.checkWorldBounds = true;//총알은 월드를 벗어나면 kill상태가 된다. phaser가 플래그를 통해 관리하고 잇다
        bullet.outOfBoundsKill = true;//내가 따로 월드좌표를 이용해서 kill상태로 할수있다.
        bullet.reset( this.paddle.x + this.bulletx, this.paddle.y + this.bullety ); //총구 위치로
        bullet.body.enable = true; //총알쏠때 true
        bullet.body.velocity.x = 0;//발사
        bullet.body.velocity.y = -this.BULLET_SPEED;
        bullet.animations.play('idle', 25, true, undefined); //loop
        //총알소환

        //bullet2
        var bullet2 = this.bullets.getFirstDead();//킬상태인 총알 가져오기
        if (bullet2 === null || bullet2 === undefined) return;// 총알상태가 이상하면 거부
        bullet2.revive();// 총알을 "alive"상태로
        bullet2.checkWorldBounds = true;//총알은 월드를 벗어나면 kill상태가 된다. phaser가 플래그를 통해 관리하고 잇다
        bullet2.outOfBoundsKill = true;//내가 따로 월드좌표를 이용해서 kill상태로 할수있다.
        bullet2.reset( this.paddle.x - this.bulletx, this.paddle.y + this.bullety); //총구 위치로
        bullet2.body.enable = true; //총알쏠때 true
        bullet2.body.velocity.x = 0;//발사
        bullet2.body.velocity.y = -this.BULLET_SPEED;
        bullet2.animations.play('idle', 25, true, undefined); //loop
        //총알소환
        if(kData.bSoundSE) SE_Shot.play(); //총알,미사일 발사 소리
    },
    //bb----------------------------------------------------------->>
    destroy: function () {
        //console.log("----MassiveController destroy!!----");

        this.game = null;
        this.gameState = null;
        this.utilities = null;
        this.vehicles = null;
        this.cachedVehicles = null;
        this.cachedBoosters = null;
        this.vehicleSpawnList = null;
        this.initialBike = null;
        this.introTruck = null;
        this.tmpVehicle = null;
        this.lanesInUse = null;
        this.availableLanes = null;

        //----매시브제거--------------------------
        this.spawncnt  = null;
        this.updatecnt  = null;
        this.game  = null;
        this.h  = null;
        //this.massiveController.gameState  = null;
        this.utilities  = null;
        this.targetxy  = null;
        this.RedorGreen = null;
        this.prev = null;
        this.last = null;
        this.dirc = null;
        this.dirr = null;

        this.mskl = null;
        this.mskr = null;
        this.mskllen = null;
        this.mskrlen = null;
        this.msklmax = null;
        this.mskrmax = null;
        this.mskloff = null;
        this.mskroff = null;
        this.mskldir = null;
        this.mskrdir = null;

        this._mskx = null;
        this._msky = null;
        this._mxobj = null;
        this._mski = null;

        this._i = null;
        this._j = null;
        this._k = null;
        this._m = null;
        this._n = null;
        this._o = null;
        this._p = null;
        this._pos = null;
        this._ai = null;
        this._aj = null;

        this._tmptile = null;
        this._tmpcolor = null;
        this._ri = null;
        this._rk = null;

        this._xa = null;
        this._xb = null;
        this._ya = null;
        this._yb = null;
        this._cntliving = null;

        this.ball.destroy(true);
        this.paddle.destroy(true);
        this.paddlePosY = null;
        this.attrTimer = null;
        this.padatt = null;
        this.padsize = null;
        this.padsizeold = null;
        this.ballstate = null;
        this.tiles.destroy(true);
        this.introboxcap = null;
        console.log("---remove");
        if(typeof this.stageText === 'undefined' || this.stageText === null) return;
        this.stageText.destroy(true);
        this._sideblk = null,
        this.uiCombo.destroy(true);

        //this.massiveController.background.destroy(true);
        this.ballOnPaddle = null;
        this.ballOnPaddleTweening = null;
        this.navi.destroy(true);
        this.DtSec  = null;

        this.countDownTime = null;
        this.countDownTimeElapsed = null;
        this.countDondTick = null;
        this.isCountDownOff = null;
        this.paddleNerfTime = null;

        //this.massiveController.bricks = null;
        this.brickCount = null;
        this.bricksWithItems=[];
        this.dropItemLimit = null;
        this.tile1width = null;
        this.tile1height = null;
        this.balls.destroy(true);
        this.trails.destroy(true);
        this.ballInitialX = null;
        this.ballInitialY = null;

        this.ballMaxVel = null;

        this.redbeardelaytimer = null;
        this.redbeardelaymax = null;

        this.redBearVel = null;
        this.redBears.destroy(true);
        this.redbeartimer = null;

        this.greenBearVel = null;
        this.greenBears.destroy(true);
        this.greenbeartimer = null;

        this.bounds3.destroy(true);
        this.boundLeftOffsetByPaddle = null;
        this.boundRightOffsetByPaddle = null;

        this.fixedballs=[];

        this.bullets.destroy(true);
        this.SHOT_DELAY = null;
        this.BULLET_SPEED = null;
        this.lastBulletShotAt = null;


        this.gunpos = null;
        this.bulletx = null;
        this.bullety = null;
        this.temp_delete_dup_count = null;

        this.releasetimer = null;
        this.releasetimemax = null;
        this.countgold = null;
        this.countgoldcur = null;

        this.se_brickDeath = null;
        this.se_powerdown = null;
        this.se_powerup = null;
        this.se_recover = null;

        this.defaultTextOptions = null;

        this.boldTextOptions = null;
    }

};
//MassiveController끝
