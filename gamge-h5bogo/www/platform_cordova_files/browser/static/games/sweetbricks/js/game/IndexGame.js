/**
 * Created by NeoHan on 2017-04-11.
 */
// Gameplay Toggles
//DEBUG = false;
//DEBUG = false;
//var firstRunLandscape;
//var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameContainer',
//var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.CANVAS, 'gameContainer',

var screenWidth = window.screen.width; //retrieve current document width
var screenHeight = window.screen.height;
var first_width = window.innerWidth;
var first_height = window.innerHeight;


var isPotrait = true;

if(first_width > first_height)
{
    first_width = window.innerHeight;
    first_height = window.innerWidth;
    isPotrait = false;
}

var game = new Phaser.Game(720, 1280, Phaser.AUTO, 'gameContainer',
    {
        preload: preload,
        create: create,
        resizeCallback: resizeCallback
        //onSizeChange: onSizeChange
    },
    false, //transparent //true:첫로고화면에서 검정배경나옴
    true //antialias //true:픽셀 부드럽게 //false:픽셀 각지게 보이게
);


game.name = "sweet_bricks";
uigame = game;

var GAME_WIDTH = 720;
var GAME_HEIGHT = 1280;
//game.usespaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
function preload() {
    // Prevent certain keys from propagating to the browser:
    var arrPreventedKeys = [
        Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT
    ];

    game.input.keyboard.addKeyCapture(arrPreventedKeys);

    game.input.maxPointers = 2;

    //game.stage.disableVisibilityChange = false; //포커스외부클릭시 멈춤
    game.stage.disableVisibilityChange = true; //포커스무시 그냥 실행



    //물리등록
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    game.physics.arcade.checkCollision.up = false;
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;
    if (dm) console.log(game.physics.arcade.bounds);

    //백그라운드 칼라
    game.stage.backgroundColor = ColorSet.white;// ColorSet.black;


    if (!game.device.desktop) {

        game.scale.enterIncorrectOrientation.add(handleIncorrect);
        game.scale.leaveIncorrectOrientation.add(handleCorrect);
    }

    if (this.game.device.desktop) {
        //데스크탑환경
        if (document.location.href.indexOf("game.jp") > 0)
            this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        else
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;    //축소확대 비율유지

        //false이면 전체비율을 폭에 맞춤//폭 크면 높이 길고, 폭 작으면 높이 작음 //
        //true이면 전체비율을 폭,높이에 둘다맞춤
        this.scale.parentIsWindow = true;

        game.pageAlignHorizontally = false;
        game.pageAlignVertically = false;
    }//데스크탑
    else {
        //강제해상도 지정
        this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        //--------------리사이즈함수에서 가져옴
        if(game.device.iOS) {
            if(isPotrait === false)
            {
                //디버그 dddd
                // boottxt += ("\ndevice.chrome:"+game.device.chrome+"\n");
                // var bb= is_chrome;
                //
                // boottxt += ("\nischrome:"+bb+"\n");
                //디버그 dddd

                //크롬 예외처리 //랜드스케이프에서 포트레이트로 갈때 사이즈 보간(주소창크기)
                //if(is_chrome)
                if (!game.device.mobileSafari) {
                    first_width += 76;
                }
            }
            inh = first_height;
            inw = first_width;
        }else{
            inh = window.innerHeight;
            inw = window.innerWidth;
        }

        var ratio = parseFloat(inh / inw);
        var ratio_w = parseFloat(inw / GAME_WIDTH);
        var ratio_h = parseFloat(inh / GAME_HEIGHT);
        game.scale.setUserScale(ratio_w, ratio_h);


        if (isPotrait) {
            document.getElementById("turn").style.display = "none";
        }
        else {
            if(bPhone) {
                document.getElementById("turn").style.display = "block";
            }
        }
        //--------------리사이즈함수에서 가져옴
    }//모바일환경
    game.scale.refresh();

    //--크롬예외처리(안드로이드 사운드 예외처리)------------------
    if (this.game.device.android
        && this.game.device.chrome
        && this.game.device.chromeVersion >= 55) {

        this.game.sound.setTouchLock();

        this.game.input.touch.addTouchLockCallback(function () {
            if (this.noAudio                  //크롬 안드로이드 모드--> false로 들어옴
                //|| !this.touchLocked        //크롬 안드로이드 모드---> false로 들어옴
                || this._unlockSource !== null   //크롬 안드로이드 모드---> null로 들어옴
            ) {
                return true;
            }
            if (this.usingWebAudio) {
                // Create empty buffer and play it
                // The SoundManager.update loop captures the state of it and then resets touchLocked to false

                var buffer = this.context.createBuffer(1, 1, 22050);
                this._unlockSource = this.context.createBufferSource();
                this._unlockSource.buffer = buffer;
                this._unlockSource.connect(this.context.destination);

                if (this._unlockSource.start === undefined) {
                    this._unlockSource.noteOn(0);
                }
                else {
                    this._unlockSource.start(0);
                }

                //Hello Chrome 55!
                if (this._unlockSource.context.state === 'suspended') {
                    this._unlockSource.context.resume();
                }
            }

            //  We can remove the event because we've done what we needed (started the unlock sound playing)
            return true;

        }, this.game.sound, true);

    }
    //--크롬예외처리(안드로이드 사운드 예외처리)------------------


    if (document.location.href.indexOf("neolith") > -1) {
    //if (document.location.href.indexOf("localhost") > -1) {//테스트
        game.load.image('preloaderLogoMono', 'assets/preloader/Neo_Loading_01.png');
        game.load.image('preloaderLogoColor', 'assets/preloader/Neo_Loading_02.png');
        game.load.image('preloaderLogoText', 'assets/preloader/Neo_Loading_03.png');
        game.load.image('loading02', 'assets/preloader/loading02.png');
        game.load.image('zhuye002', 'assets/preloader/zhuye002.png');
    }else{
        game.load.image('preloaderLogoMono', 'assets/preloader/movi_01.png');
        game.load.image('preloaderLogoColor', 'assets/preloader/movi_02.png');
        game.load.image('preloaderLogoText', 'assets/preloader/movi_03.png');
        game.load.image('loading02', 'assets/preloader/loading02.png');
        game.load.image('zhuye002', 'assets/preloader/zhuye002.png');
    }


}//preload

function create() {
    var that = this;
    //리사이즈
    this.game.scale.setResizeCallback(this.resizeCallback, this);

    game.state.add('preloader', LoadState, true);
    game.state.add('menu', MenuState);
    game.state.add('game', GameState);

    //샵설정값들
    sGame = uigame.add.group();
    sNetworkLoading = uigame.add.group();
    sPopupHeart = uigame.add.group();             // 하트 표시
    sPopupHeartShop = uigame.add.group();        // 하트 샵
    sPopupHeartShopConfirm = uigame.add.group(); // 하트 충전 완료
    sPopupHeartChargeGuide = uigame.add.group(); // 차지 유도 //ui없는 컨테이너
    //샵설정값들

    heartController = new HeartController();//하트컨트롤러 생성

}
//아이폰 해상도 스케일
function getIOSBias(){
    // //아이폰대응,애플대응
    // //아이폰5&6                 //pixelratio:2 //screen:320x568  //inner:720x1280
    // //아이패드 air2(실2048x1536) //pixelratio:2 //screen:768x1024 //inner:768x1280
    // //아이폰7(실1334x750)        //pixelratio:2 //screen:375x667  //inner:720x1280
    var innerx= window.innerWidth;
    var innery= window.innerHeight;
    var scrx = window.screen.width;
    var scry = window.screen.height;
    var xbias;
    var ybias;
    var yoff; //주소창크기만큼
    xbias = scrx/innerx;
    //스위치문
    switch (scrx) {
        case 320:                           //아이폰5&6
            yoff=60;
            if(uigame.device.mobileSafari) yoff+=yoff;
            ybias=(scry-yoff)/innery;
            break;
        case 375:                           //아이폰7(실1334x750)
            yoff=69;
            if(uigame.device.mobileSafari) yoff+=(yoff*0.8);
            ybias=(scry-yoff)/innery;
            break;
        case 768:                           //아이패드 air2(실2048x1536)
            yoff=60;
            ybias=(scry-yoff)/innery;
            break;
        default:
            yoff=60;
            if(uigame.device.mobileSafari) yoff+=yoff;
            ybias=(scry-yoff)/innery;
            break;
    }
    return{x:xbias,y:ybias};
}
//안드로이드 해상도 스케일
function getAndroidBias() {
    var xbias = window.innerWidth / 720;
    var ybias = window.innerHeight / 1280
    return{x:xbias,y:ybias};
}
//--회전경고//회전권유-----
function handleIncorrect(){//사용안함

}
function handleCorrect(){//사용안함

}

function resizeCallback(scale, parentBounds) {
    if(!game.device.desktop && !game.device.iOS) {
        //일반적인 안드로이드
        inh = window.innerHeight;
        inw = window.innerWidth;

        if (inh > inw) {
            document.getElementById("turn").style.display = "none";
        }
        else {
            if(bPhone) {
                document.getElementById("turn").style.display = "block";
            }
        }
        var ratio = parseFloat(inh / inw);
        var ratio_w = parseFloat(inw / GAME_WIDTH);
        var ratio_h = parseFloat(inh / GAME_HEIGHT);

        game.scale.setUserScale(ratio_w, ratio_h);
        if (inh > inw) {

            document.getElementById("turn").style.display = "none";
        }
        else {
            if(bPhone) {
                document.getElementById("turn").style.display = "block";
            }
        }
    }
}
