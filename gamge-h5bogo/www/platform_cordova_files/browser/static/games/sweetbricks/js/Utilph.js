//페이저에서 속도 변속 //speed값으로 변속 시키기
function accelerateToXYFromLocal(obj1, localx, localy, speed) {
    //          +          //          |
    //  -3.14   |          //  |       local--
    //     +----+----+ 0   //  obj1--   (xy)
    //  +3.14   |          //  (xy)
    //          +
    //var angle = Math.atan2((obj1.y+gotoy) - obj1.y, (obj1.x+gotox)- obj1.x);
    var angle = Math.atan2(localy, localx);
    obj1.body.velocity.x = Math.cos(angle) * speed;
    obj1.body.velocity.y = Math.sin(angle) * speed;
    return angle;
}

//그룹내에서 죽은것을만 Destroy한다.
function cleanUp(grp)
{
    var aCleanup = [];
    grp.forEachDead(function(item){
        aCleanup.push(item);
    });

    var i = aCleanup.length - 1;
    while(i > -1)
    {
        var getitem = aCleanup[i];
        getitem.destroy();
        i--;
    }
}

function ref_phaser() {
    var dir = Phaser.Math.angleBetweenPoints(ball.body.prev, ball.body.position); //위치값으로 방향알기 //라디안값
}

function _ref_phaser_memory() { //메모리관리
    //모두 종료시 제거하는 예제
    function shutdown() {
        //destroy bitmap text
        this.creditText = null;

        //destroy tween
        if (this.creditTween) {
            this.creditTween.onComplete.removeAll();
            this.creditTween.stop();
            this.creditTween = null;
        }
        //destroy sound
        if (this.clickSnd) {
            this.clickSnd.stop();
            this.clickSnd = null;
        }
        //destroy button
        if (this.soundButton) {
            this.soundButton.kill();
            this.soundButton = null;
        }
        //destroy sprite
        if (this.backing) {
            this.backing.destroy();
            this.backing = null;
        }
        if (dm) console.log('destroy TitleMenu');
    }

    function onebyone_pool() {
        //일반 오브젝트 메모리관리----------
        //1.초기화
        var enemies = game.add.group();
        for (var i = 0; i < 8; i++) {
            enemies.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'baddie');
        }

        //2.제거
        var _remove1 = enemies.getFirstAlive();         //(child.alive===true)인것 가져오기
        if (_remove1) {
            _remove1.kill();
        }              //살아있으면 Kill

        //3.할당
        var _create1 = enemies.getFirstExists(false);   //있는지 없는지 모르지만 가져오기, 자동생성(false)없이 가져오기
        if (_create1) {
            _create1.revive();
        }            //존재하면 생성

        //4.갯수파악
        if (dm) console.log(enemies.countLiving());
    }

    //총알 메모리 관리 ----------------
    //https://gamemechanicexplorer.com/#bullets-1
    function bullet_pool() {
        //프리로드
        function preload() {
            this.game.load.image('bullet', '/assets/gfx/bullet.png');
            //옵션4: 곡사포--------------
            this.game.load.image('ground', '/assets/gfx/ground.png');
            this.game.load.spritesheet('explosion', '/assets/gfx/explosion.png', 128, 128);
            //옵션4: 곡사포--------------
        }

        //1.초기화
        function create() {
            this.SHOT_DELAY = 100;                   // milliseconds (10 bullets/second)
            this.BULLET_SPEED = 500;                 // pixels/second

            //꼭 택1
            //--------------------------선택1: 발사 총알 1개일경우
            this.NUMBER_OF_BULLETS = 1;
            //--------------------------선택1: 발사 총알 1개일경우
            //--------------------------선택2: 전체 총알 발사
            //this.NUMBER_OF_BULLETS = 20;
            //--------------------------선택2: 전체 총알 발사

            //옵션4: 곡사포--------------
            this.GRAVITY = 980; // pixels/second/second
            //옵션4: 곡사포--------------


            this.gun = this.game.add.sprite(50, this.game.height / 2, 'bullet'); //총만들기
            this.gun.anchor.setTo(0.5, 0.5);                                   //총만들기

            this.bulletPool = this.game.add.group(); //총알그룹생성
            for (var i = 0; i < this.NUMBER_OF_BULLETS; i++) {

                var bullet = this.game.add.sprite(0, 0, 'bullet');// 각각 총알 생성, 그룹에 추가
                this.bulletPool.add(bullet);

                bullet.anchor.setTo(0.5, 0.5);            //총알 중심에 피봇 설정

                this.game.physics.enable(bullet, Phaser.Physics.ARCADE);            // 총알 물리 적용
                bullet.kill();            // 초기상태를 죽기로 변환
            }

            //옵션3: 총신이 겨냥해야할경우----------------
            // Simulate a pointer click/tap input at the center of the stage
            // when the example begins running.
            this.game.input.activePointer.x = this.game.width / 2;
            this.game.input.activePointer.y = this.game.height / 2;
            //옵션3: 총신이 겨냥해야할경우----------------

            //옵션4: 곡사포---------------
            // Turn on gravity
            game.physics.arcade.gravity.y = this.GRAVITY;
            // Create some ground
            this.ground = this.game.add.group();
            for (var x = 0; x < this.game.width; x += 32) {
                // Add the ground blocks, enable physics on each, make them immovable
                var groundBlock = this.game.add.sprite(x, this.game.height - 32, 'ground');
                this.game.physics.enable(groundBlock, Phaser.Physics.ARCADE);
                groundBlock.body.immovable = true;
                groundBlock.body.allowGravity = false;
                this.ground.add(groundBlock);
            }
            // Create a group for explosions
            this.explosionGroup = this.game.add.group();
            // Simulate a pointer click/tap input at the center of the stage
            // when the example begins running.
            this.game.input.activePointer.x = this.game.width / 2;
            this.game.input.activePointer.y = this.game.height / 2 - 100;
            //옵션4: 곡사포---------------
        }

        //2.발사 이벤트처리 메소드 함수
        function shootBullet() {
            if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;// 바로전딜레이타임 변수 초기화
            if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;// 딜레이 미만이면 거부
            this.lastBulletShotAt = this.game.time.now;// 바로전딜레이타임 변수에 현재 시간 저장
            var bullet = this.bulletPool.getFirstDead();//킬상태인 총알 가져오기
            if (bullet === null || bullet === undefined) return;// 총알상태가 이상하면 거부

            bullet.revive();// 총알을 "alive"상태로

            bullet.checkWorldBounds = true;//총알은 월드를 벗어나면 kill상태가 된다. phaser가 플래그를 통해 관리하고 잇다
            bullet.outOfBoundsKill = true;//내가 따로 월드좌표를 이용해서 kill상태로 할수있다.

            bullet.reset(this.gun.x, this.gun.y); //총구 위치로

            //꼭 택1
            //선택1,2: 직선슈팅1발,여러발 경우--------------------------
            bullet.body.velocity.x = this.BULLET_SPEED;//발사
            bullet.body.velocity.y = 0;
            //선택1,2: 직선슈팅1발,여러발 경우--------------------------
            //선택3,4: 겨냥슈팅,곡사포 경우--------------------------
            bullet.rotation = this.gun.rotation;
            bullet.body.velocity.x = Math.cos(bullet.rotation) * this.BULLET_SPEED;// Shoot it in the right direction
            bullet.body.velocity.y = Math.sin(bullet.rotation) * this.BULLET_SPEED;
            //선택3,4: 겨냥슈팅,곡사포 경우--------------------------

        }

        //3.발사 작동시 업데이트 함수
        _GameState.prototype.update = function () {

            //옵션3: 겨냥슈팅 경우-------------------
            // Aim the gun at the pointer.
            // All this function does is calculate the angle using
            // Math.atan2(yPointer-yGun, xPointer-xGun)
            this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);
            //옵션3: 겨냥슈팅 경우-------------------
            //옵션4:곡사포------------------------
            // Check if bullets have collided with the ground
            this.game.physics.arcade.collide(this.bulletPool, this.ground, function (bullet, ground) {
                this.getExplosion(bullet.x, bullet.y);// Create an explosion
                bullet.kill();// Kill the bullet
            }, null, this);
            this.bulletPool.forEachAlive(function (bullet) {            // Rotate all living bullets to match their trajectory
                bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
            }, this);
            this.gun.rotation = this.game.physics.arcade.angleToPointer(this.gun);
            //옵션4:곡사포------------------------


            if (this.game.input.activePointer.isDown) {
                this.shootBullet();
            }
        };
    }
}

function _ref_phaser_timer() {
    var utiljs_game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example',
        {
            preload: function () { },
            create: function () { },
            render: function () { }
        },
        false, //transparent //true:첫로고화면에서 검정배경나옴
        true //antialias //true:픽셀 부드럽게 //false:픽셀 각지게 보이게
    );

//1초에 한번 ++1 타이머
    game.time.events.loop(Phaser.Timer.SECOND,
        updateCounter,
        this
    );
    function updateCounter() {
        counter++;
    }

//2초에 한번씩(10회만) 타이머
    game.time.events.repeat(Phaser.Timer.SECOND * 2,
        10,
        _createBall,
        this
    );
    function _createBall() { //  A bouncey ball sprite just to visually see what's going on.
        var ball = game.add.sprite(game.world.randomX, 0, 'ball');
        game.physics.enable(ball, Phaser.Physics.ARCADE);
    }

//4초에 페이드아웃 실행  타이머
    game.time.events.add(
        Phaser.Timer.SECOND * 4,
        fadePicture,
        this
    );
    function fadePicture() {
        game.add.tween(picture).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
    }

//2초 커스텀타이머   타이머
    var total = 0;
    timer = game.time.create(false);
    timer.loop(2000, updateCounter2sec, this);
    timer.start();
    function updateCounter2sec() {
        total++;
    }

//0.25~1초 타이머배열 생성후 클릭시 삭제   타이머
    var counters = [];
    var text = [];
    var timerEvents = [];
    var i = 9;
    for (var i = 0; i < 10; i++) {
        counters[i] = 0;
        //  Here we create our timer events. They will be set to loop at a random value between 250ms and 1000ms
        timerEvents[i] = game.time.events.loop(game.rnd.integerInRange(250, 1000),
            updateCounter,
            this,
            i
        );
    }
    //클릭시 타이머 1개 제거
    game.input.onDown.add(removeCounter, this);//  Click to remove
    function removeCounter() {
        if (i >= 0) {
            game.time.events.remove(timerEvents[i]);        //  Removes the timer, starting with the top one and working down
            i--;
        }
        if (dm) console.log("Queued events: " + game.time.events.length);
    }

//슬라이드 커스텀타이머
    pictureA = game.add.sprite(game.world.centerX, game.world.centerY, 'picture1');
    pictureB = game.add.sprite(game.world.centerX, game.world.centerY, 'picture2');
    timer = game.time.create(false); //  Create our Timer
    timer.add(3000, fadePictures, this);//  Set a TimerEvent to occur after 3 seconds
    timer.start();
    function fadePictures() {
        var tween; //  Cross-fade the two pictures
        if (pictureA.alpha === 1) {
            tween = game.add.tween(pictureA).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
            game.add.tween(pictureB).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
        }
        else {
            game.add.tween(pictureA).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true);
            tween = game.add.tween(pictureB).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true);
        }
        tween.onComplete.add(changePicture, this); //When the cross-fade is complete we swap the image being shown by the now hidden picture
    }

    function changePicture() {
        if (pictureA.alpha === 0) {
            pictureA.loadTexture('picture' + current);
        }
        else {
            pictureB.loadTexture('picture' + current);
        }
        current++;      //다음단계 그림들로 교체
        if (current > 7) {
            current = 1;
        }
        timer.add(3000, fadePictures, this);    //  And set a new TimerEvent to occur after 3 seconds
    }
}//_ref_phaser_timer

function _ref_phaser_random() {
    var images = game.cache.getKeys(Phaser.Cache.IMAGE);//로딩한 이미지 배열 가져오기
    var img = game.rnd.pick(images);//배열에서 이미지 랜덤 선택

    var randx = game.world.randomX; //스크린 랜덤x
    var randy = game.world.randomY; //스크린 랜덤y
    var tempSprite = game.add.sprite(randx, randy, img);


    tempSprite.inputEnabled = true;                         //-----------------드래그 상위로 이동
    tempSprite.input.enableDrag(
        false,  //lockCenter ==무조건 가운데 정렬
        true    //레이어 상위로 이동
    );
    //( enableDrag 인자들
    // lockCenter,
    // bringToTop,
    // pixelPerfect,
    // alphaThreshold,
    // boundsRect,
    // boundsSprite
    //)
}

//로컬->월드좌표:debugrect.x = debugsprite.worldPosition.x;
//월드로컬변환,월드좌표->로컬좌표로변환 //작동 제대로 안함
function worldToLocal(x, y, obj) {
    var lx = x;
    var ly = y;
    var parent = obj;
    while (parent != null && !(parent instanceof Phaser.World)) {
        lx -= parent.position.x;
        ly -= parent.position.y;
        parent = parent.parent;
    }
    return {x: lx, y: ly};
}
if(false) {
    function ref_problem() {
        ///----------------------------
        ////실제 문제코드//프로토타입사용
        BallObject = function (game, x, y) {
            Phaser.Sprite.call(this, game, x, y, 'basketball');
        };
        BallObject.prototype = Object.create(Phaser.Sprite.prototype);
        BallObject.prototype.constructor = BallObject;
        ///----------------------------
        ////문제코드//프로토타입사용
        classABC = function () {
        };
        classABC.prototype.myMethod1 = function () {
            console.log('myMethod');
        };
        classABC.prototype.myMethod2 = function () {
            console.log('myMethod2');
        };
        ////----------------------------
        //플로토타입,클래스 사용 안하는 개선코드
        var myMethod1F = function () {
            console.log('myMethod1');
        };
        var myMethod2F = function () {
            console.log('myMethod2');
        };
        classABC = function () {
            return {myMethod1: myMethod1F, myMethod2: myMethod2F}
        };
        // 페이저 추천방법(개선코드)---------------------------
        // instead of "game.time.now", "physicsElapsed"
        // use       "game.time.time
        // 페이저 추천방법(개선코드)--------------------------
        // 트윈이 다 로드된후 실행된다.
        // use game.time.events.add(1, fadeIn);
        ///----------------------------
    }
} //if !undefined

//페이저 사운드 로딩-시작
if(false) {
    function playMusic() {
        this.game.asyncLoad('song', 'song.mp3', function () {
            var music = this.game.add.audio('song');
            music.play();
        });
    }
    function asyncLoad(cacheKey, path, onLoad) {
        this.game.load.audio(cacheKey, path);
        this.game.load.start();
        // start the loader
        var index = window.setInterval(function () {
            if (this.game.load.isLoading) {
                return;
            }
            onLoad();
            window.clearInterval(index);
        }, 1000);
    }
} //if !undefined

//페이저 //y값순으로 링크순서변경 //배열셔플, 배열섞기, 배열소트, 배열정렬
if(false) {
    var locs = [];
    for (var i = 0; i < 16; i++) {
        locs.push((i * 32) + Math.random()); //[0.3, 32.9, 64.2, ....]
    }
    locs = Phaser.ArrayUtils.shuffle(locs); //[448.5, 224.2, 320.7 ....]

    grpA = game.add.group();
    for (var i = 0; i < 16; i++) { grpA.create(400, locs[i], 'someSprite', 0); }
    game.input.onDown.addOnce(sort, this);

    function sort() {     //그룹A소트 -- y값순서와 링크순서 동일(0,1,2,3..)
        grpA.sort('y', Phaser.Group.SORT_ASCENDING);
    }
} //if 'undefined'

//랜덤시드
if(false){
    game.rnd.sow([123]);
    console.log('A');
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());

    game.rnd.sow([0]);
    console.log('B');
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());

    game.rnd.sow([123]);
    console.log('C');
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
    console.log(game.rnd.integer());
}

//https://phaser.io/examples/v2/groups/depth-sort에서  createUniqueLocation()
//화면 범위에서 램덤 그리드(32x32)200개 고르기
if(false) {
    var sss="";
    var locs=[];
    //200개 생성(전체그리드 25x??(15이상)
    var xgrd=0;
    var ygrd=0;
    var w=game.world.width;
    var h=game.world.height;
    var rx=0;
    var ry=0;

    for (var i = 0; i < 200; i++) {
        //유니크 위치함수
        do {
            // 0    15   31 32   47   63
            // +----------+ +----------+
            // |   grid0  | |   grid1  |
            // |    +     | |    +     |
            // |          | |          |
            // +----------+ +----------+
            rx=game.world.randomX; //화면 랜덤 위치
            ry=game.world.randomY; //화면 랜덤 위치
            // 16       32+16     64+16
            xgrd = Phaser.Math.snapTo(rx, 32) / 32; //0~15->0, 16~47->1, 48~79->2
            ygrd = Phaser.Math.snapTo(ry, 32) / 32; //0~15->0, 16~47->1, 48~79->2

            if (ygrd > 17) {ygrd = 17;}  //고유번호 생성을 위해서는 그리드가 일정해야
            var idx = (ygrd * 17) + xgrd;//고유번호 생성 //중복확인될 번호

        } while (locs.indexOf(idx) !== -1);//생성고유번호가 중복이면 다시 생성

        locs.push(idx);                  //고유번호를 배열에 저장
        //console.log(convertStr2Arr1D(locs)); //배열디버그

        //그리드->화면좌표계변환
        //var position =[32*xgrd, 32*ygrd];//위치생성
        //group.create(x * 32, y * 32, 'trees', game.rnd.integerInRange(0, 7));

        sss+=(
            "rxy:" + number_pad3(rx, 4)
            +"," + number_pad3(ry, 4)
            +",gridxy:" + number_pad3(xgrd, 4)
            +"," + number_pad3(ygrd, 4)+"\n"
        );

    }//for
    console.log(sss);


    function getRandGridArr( count, grdszx, grdszy) {
        for (var i = 0; i < count; i++) {
            //유니크 위치함수
            do {
                rx=game.world.randomX; //화면 랜덤 위치
                ry=game.world.randomY; //화면 랜덤 위치
                // 16       32+16     64+16
                xgrd = Phaser.Math.snapTo(rx, 32) / 32; //0~15->0, 16~47->1, 48~79->2
                ygrd = Phaser.Math.snapTo(ry, 32) / 32; //0~15->0, 16~47->1, 48~79->2

                xgrd=uigame.rnd.integerInRange(0, 3); //랜덤(0~3포함)
                ygrd=uigame.rnd.integerInRange(0, 3); //랜덤(0~3포함)


                if (ygrd > 17) {ygrd = 17;}  //고유번호 생성을 위해서는 그리드가 일정해야
                var idx = (ygrd * 17) + xgrd;//고유번호 생성 //중복확인될 번호

            } while (locs.indexOf(idx) !== -1);//생성고유번호가 중복이면 다시 생성

            locs.push(idx);                  //고유번호를 배열에 저장
            //console.log(convertStr2Arr1D(locs)); //배열디버그

            //그리드->화면좌표계변환
            //var position =[32*xgrd, 32*ygrd];//위치생성
            //group.create(x * 32, y * 32, 'trees', game.rnd.integerInRange(0, 7));

            sss+=(
                "rxy:" + number_pad3(rx, 4)
                +"," + number_pad3(ry, 4)
                +",gridxy:" + number_pad3(xgrd, 4)
                +"," + number_pad3(ygrd, 4)+"\n"
            );

        }//for
    }
} //if !undefined