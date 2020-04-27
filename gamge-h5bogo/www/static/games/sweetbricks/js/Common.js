/**
 * Created by NeoHan on 2017-05-18.
 */

//var networkTF=networkTF || 0;
var nvmode=false;
var gotonext=false;

var uigame;

var naverShop;
var naverShop2;

var uishopinmenu = false;

var bSoundSE = false;//소리수정
var bSoundBGM = false;//소리수정
var bSoundSE_bak = false;
var bSoundBGM_bak = false;
// //소리수정 추가
// var bSoundSE = false;
// var bSoundBGM = false;
// var bSoundSE_bak = false;
// var bSoundBGM_bak = false;

//광고혜관님설정-----
var isApp = isApp || false;
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

eventer(messageEvent,function(e) {
    if(e.data==="true"){
        isApp = true;
    }
},false);

window.parent.postMessage("callApk", "*");
//광고혜관님설정-----

//광고혜관님설정----------지워야 할 코드
// window.onerror = function(msg, url, linenumber) {
//     alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
//     return true;
// };
//광고혜관님설정-----ㄴ-----지워야 할 코드


var curBGM = "BGM_ALL";

function selectBGM(bgmname, restart) { //"BGM_ALL" "BGM_Game_Nomal" "BGM_Game_Ranking"
    switch (bgmname){
        case "BGM_ALL":
            BGM_ALL.mute = kData.bSoundBGM ? false : true; //in selectBGM
            BGM_Game_Nomal.mute = true;              //in selectBGM
            BGM_Game_Ranking.mute = true;            //in selectBGM
            curBGM = "BGM_ALL";

            if(restart) {
                if (BGM_ALL.mute === false) {
                    BGM_ALL.restart(undefined, undefined, undefined, true);
                }
            }
        break;

        case "BGM_Game_Nomal":
            BGM_ALL.mute = true;                            //in selectBGM
            BGM_Game_Nomal.mute = kData.bSoundBGM ? false : true; //in selectBGM
            BGM_Game_Ranking.mute = true;                   //in selectBGM
            curBGM = "BGM_Game_Nomal";
            if(restart) {
                if (BGM_Game_Nomal.mute === false) {
                    BGM_Game_Nomal.restart(undefined, undefined, undefined, true);
                }
            }
        break;

        case "BGM_Game_Ranking":
            BGM_ALL.mute = true;                              //in selectBGM
            BGM_Game_Nomal.mute = true;                       //in selectBGM
            BGM_Game_Ranking.mute = kData.bSoundBGM ? false : true; //in selectBGM
            curBGM = "BGM_Game_Ranking";
            if(restart) {
                if (BGM_Game_Ranking.mute === false) {
                    BGM_Game_Ranking.restart(undefined, undefined, undefined, true);
                }
            }
        break;

        default:
            BGM_ALL.mute = true;          //in selectBGM
            BGM_Game_Nomal.mute = true;   //in selectBGM
            BGM_Game_Ranking.mute = true; //in selectBGM
        break;
    }
}

var ispausemode = false;



var touchscreen=false;
var touchfirst=false; //모바일 터치1 체크용
var touched=false;
var released=true;
//var ending_fin_begin=false;
//var ending_fin=false;

var _steps = {
        none:0,
        begin:1,
        step1:2,
        step2:3,
        step3:4,
        end:5

};
var ending_step = _steps.none;
//bb variable----------------------------------------
// var bubble_levels = [
//     { id:0,
//         balls: [
//             {x:2, y:17, att:1},
//             {x:3, y:17, att:1},
//             {x:6, y:1, att:2}
//         ]
//     },
//     { id:1,
//         balls: [
//             {x:4, y:5, att:0},
//             {x:5, y:5, att:0}
//         ]
//     }
// ];

// console.log(
//     "id:"+bubble_levels[0].id
//     +", length:"+ bubble_levels.length
//     +", ball[0].x:"+bubble_levels[0].balls[0].x
//     +", ball[0].y:"+bubble_levels[0].balls[0].y
//     +", ball[0].a:"+bubble_levels[0].balls[0].a
//     +", ball[0].length:"+bubble_levels[0].balls.length
// );


var iHeartChargeMax = 10;
var iHeartInitData = 10;
var fHeartChargeTime = 10;       // 광고충전 타임

//게임전역변수,전역게임변수
var LV4x4 = 16; //아이콘 선택창 갯수
//var LEVEL_MAX = 240;
var LEVEL_MAX = 320;
var curPage = 0;
var curLevel = 0;
var curLevelFake = "1";
var playedLevel = 0;
//var curScore = 0;
var curLives = 0;
var MaxLife =1;
var curMyStars=0;

var lastOpenedId=-1;

var isBonusLvId = false;

var _combotemp=0;//불공,관통공 임시콤보저장소

var enablePlayTime=false;

var BonusLineCount = -1;
var BonusHeartCount = -1;
var BonusHeartPerLine = -1;
var BonusHeartRemain = -1;
var BonusHeartShare = -1;
var BonusGridxArr=[0,1,2,3,4,5,6,7,8,9,10];
var BonusXArr=[];
//var BonusGridIdx=0;
var RemainAccum=0;
var BonusLocated=-1;

var intro_fin=false;

//리트라이삭제 var retrymode = false;

//var ScoreBc0 = 50;

//var ScoreBcHP2 = 50; //초코블록1단계 접촉 획득점수
//var ScoreBcHP1 = 60;
//var ScoreBcHP0 = 80;

//var ScoreBear2 = 90; //곰젤리 1단계 제거시 획득점수
//var ScoreBear1 = 100;
//var ScoreBear0 = 110;

//var ScoreGold0 = 120; //무적블록 접촉시 획득점수
//var ScoreGoldx = 1000;

//var ScoreITem = 500;

//타일배치시 시작점과 타일 크기
var strtx = 60;
var strty = 149;
var szx = 60; //60x11타일=660, 660+30왼쪽+30오른쪽==720
var szy = 32;
var endx = strtx+(11*szx);

var Paddle=undefined; //this.paddle
var BoundLeftOffsetByPaddle=undefined; //this.boundLeftOffsetByPaddle
var BoundRightOffsetByPaddle=undefined; //this.boundRightOffsetByPaddle
var BoundTopOffsetByPaddle=undefined;
var BoundBottomOffsetByPaddle=undefined;
var moveSpeed = 1500;//550;
var moveSpeedupdown = 0.5;//550;
var ItemsPercent = 0.10; //0.10:10퍼센트, 0.05는 5퍼센트
var ItemsPercentBonus = 0.05; //0.10:10퍼센트, 0.05는 5퍼센트
var timeStepHorizontal = 25;//125=0.125초 //250=0.25초
var timeStepMoveOff = 4;//이동거리

var curVelocity = 400;
var VelocityInit = 400; //속도최대
var VelocityMax = 1000;  //속도최소
var VelocityAdd =5;     //속도초당증가량


var PadAttr_bullet = false; //생성
var ThreeState = {
    begin:0,
    run:1,
    end:2,
    none:3

};
var titlesprJPSoundRoot;
var MainsprJpSoundRoot;
var globaluisoundonoff;

var guntimer = 0;   //초단위로 차감
var guntimemax = 20; //슈팅모드최대시간//총알모드최대시간
var guntimeroldbak = 0;
var gunstate = ThreeState.none;
var warning_min_time=10;

var VelocityRedBear0=100;
var VelocityRedBear1=150;
var VelocityRedBear2=200;

var VelocityGreenBear0=100;
var VelocityGreenBear1=75;
var VelocityGreenBear2=50;

var StartBearLevel = 31; //곰등장레벨//레벨index+1이다
//StartBearLevel = 1; //곰등장레벨 치트 수치
var DontStartBearLevel = [1,2,3,4,5,6,7,8,9,10,100,200]; //곰등장레벨//레벨index+1이다
var isUseBear=false;

var BearTimeMax = 1;

var curLines=0;
var seamlessLines=0;

var curComboCount=0;
var uiComboGlobal=undefined;
var uiProgGlobal=undefined;
var MainUI=undefined;
var aroundtile=undefined; //폭발공 주변 처리용
var uiWarningGlobal=undefined;

var allblockcount=0;
var allstarbias=[0.1, 0.2, 0.5];
var goldcnt = 0; //블록카운트-골드
var chococnt= 0; //블록카운트-초코
var normalcnt=0; //블록카운트-노말


var medalbefore1sec=0;//클리어시 예전메달(예전별)하고 다를 복구해주려고

var gridszx=11;
var gridszy=18;

var bbLevel=[];
var bbLevel_coloronly=[];

var InputMode={
    mouse:0,
    keyboard:1
};

var isClearBonus=false;
var finalClearBonus=false;

var inputmode=InputMode.mouse;

var _BGame = {
    se_brickDeath:0,
    se_powerdown:0,
    se_powerup:0,
    se_recover:0
};

var PadSize = {
    nerf:0,
    normal:1,
    long:2,
    longa:3,
    longaa:4
};

var PadAttr = {
    normal: 0,   //0
    fixed: 1     //2
    //bullet: 2,   //1

};

var r180 = 3.14159;
var rr180 = -3.14159;

var pad_tw;

var ItemType = [
    undefined,    //0 없음
    "item_4.png", //1 //패들 확대 (1단계씩)
    "item_7.png", //2 //공 복사
    "item_9.png", //3 //총알모드
    "item_3.png", //4 //접착모드
    "item_2.png", //5 //블록 관통
    "item_1.png", //6 //공 불덩이 (폭발)
    "item_6.png", //7 //공 확대 (1단계씩)
    "item_8.png", //8 //공 느리게 (1단계씩)
    "item_5.png", //9 //블록 hp=1
    "item_10.png",//10//패들 축소
    "item_11.png",//11//패들 축소(강제)
    "item_13.png",//12//공 빠르게(4단계)
    "item_12.png",//13//공 축소
    "item_14.png" //14//죽기
];

var modeOption = [0,0,0,0,0,0];
var pageOption = [0,0,0,0,0,0];

var scrollTimeVertical = 32000;

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

var needStar =[
    0,//01
    40,//02
    85,//03
    130,//04
    175,//05
    220,//06
    265,//07
    310,//08
    355,//09
    400,//10
    445,//11
    490,//12
    535,//13
    580,//14
    625,//15
    670,//16
    715,//17
    760,//18
    805,//19
    850//20
];


var BallType = {
    normal_n: 0,
    normal_s: 1,
    normal_b: 2,
    through_n: 3,
    through_s: 4,
    through_b: 5,
    bomb_n: 6,
    bomb_s: 7,
    bomb_b: 8,
    throughbomb_n: 9,
    throughbomb_s: 10,
    throughbomb_b: 11
};

var burstBrickTime=0;


//bb variable----------------------------------------

//var se_bgm;
//var se_yes;
//var se_no;




//var boostering = false; //지금부스터모드
var boosteringBak = false;
var boostSumTimer = 0; //28개 최대치 //7개 습득-->//타이머로 바꿈 일반:46초, //
var mistakingLastCar = undefined;
var collide_left = true;
var cars_velocity_booster = 800;
var cars_velocity_max = 600;
var cars_velocity_min = 400;
var cars_velocity = 0;
var cars_baisVelocity = 1.0; //리스폰용
var spawnTimerMax = 0.8;
//var timeplay; //난이도설정용 누적시간

//--UI 디버그 기능 용도---
var dm = false;
var hsdm = false;
var txdebug = undefined;
var dmCollision=false;

var debugrect = new Phaser.Circle(0, 0, 20);
//var debugrect = new Phaser.Rectangle( 2, 2, 2, 2 ) ;
var debuggraphic;
var debugsprite;

var reverseTimeLife = 5; //리버스반전 모드 지속시간
var reverseTime = 0;
var reverseMode = false;

//시간제한및 타이머
var playtime_all_base = 60;
var playtime_clock_max = 60;  //게임에서 사용중인 맥스 타이머
var playtime_clock = 0;       //게임에서 사용중인 감소하는 타이머
var bonusmovetimer=0;
var bonusmovetimermax=32; //임시 초기화
//var playtime_all = 0; //in Common//누적플레이타임
var playtime_cur = 0; //in Common//플레이타임
var playtime_all_cur = 0;
var playtime_bias = 0;

var mode20sec = false; //종료 타이머 선언
var time20secMax = 15;
var timer20sec = time20secMax;
var timestamp;

//플레이어 위치
var playerx = 361;
var playery = 950;

//폭발블록 사운드 딜레이 처리용도
var _chk1_SE_Brick_Extinction_F = false;
var _chk2_SE_Brick_Extinction_F = false;

var picsMyResultRank = [
    'result_1.png',
    'result_2.png',
    'result_3.png',
    'result_4.png'
];
var picsMyResultRank_2 = [
    'result_win.png',
    'result_lose.png'
];

var charpicpng = [
    "character_icon_1.png", //개,   빨강
    "character_icon_2.png", //황소, 파랑
    "character_icon_3.png", //토끼, 보라
    "character_icon_4.png"  //카멜, 녹색
];
var chardlgpngs = [
    ["move_character_1_1.png", "move_character_1_2.png"], //o,x
    ["move_character_2_1.png", "move_character_2_2.png"], //o,x
    ["move_character_3_1.png", "move_character_3_2.png"], //o,x
    ["move_character_4_1.png", "move_character_4_2.png"], //o,x
];
var charnamekey = [
    ["dog"],
    ["bull"],
    ["rabit"],
    ["chameleon"],
];
var facestate = {
    "start_o": "00",
    "goal_o": "01",
    "goal_x": "02",
    "reverse_o": "03",
    "fog_o": "04",
    "missile_o": "05",
    "reverse_x": "06",
    "fog_x": "07",
    "missile_x": "08",
    "booster_o": "09",
    "overtake_o": "10", //추월
    "mistake_x": "11"
};
//내아이디:ids[0]
var ids = [ //선수들 그림 리스트를 랜덤으로 넣어둔 것
    [0, 1, 2, 3],
    [3, 2, 1, 0],
    [1, 3, 0, 2],
    [2, 0, 3, 1],
];
//랜덤아이디 정하기
var rndid;// = game.rnd.integerInRange(0, 3); //랜덤(0~3포함)

//이번경기 획득메달
var medaladded = 0;

//나의 아이디
//var myid;//=ids[rndid][0];

//네트워크ui모드관련 값들
var firsttime = true;
var vsmode = false;//2인대전모드
var matchmode = false;//매치,대전모드
var alonemode = false;
//var matchUImode=false;//게임이 아닌 UI만 나오는 모드
var youinroom = false;//내가 방에 들어왓는지
var matchupdatetimemax = 1000; //리플레시 최대치 시간
var matchupdatetime = 0;
var matchupsinglemax = 15000;
var matchupsingle = 0;
var net_started = false; //네트워크 게임 시작
//var retryrematch=false;
//var resultmode=false;

var uimodeset = {
    matchfind: 0,
    retry: 1,
    result: 2,
    select: 3,
    ingame: 4

};
//var uimode=uimodeset.retry;
//var uimode=uimodeset.result;
var uimode = uimodeset.matchfind;

//게임오버
var endgameonoff = false;  //게임종료(시간도달,체크배경도달==true)

var itemidx = {
    fogbomb: 0,
    reverse: 1,
    missile: 2,
    none: 3
};

//var mistake4 = [0,1,2,3];
var mistake4 = [0, 0.5, 1.5, 2.5];//실수카운트를 저장, 초기값은 싱글모드
var mistake4_sort = [0, 0, 0, 0];
var mistake4_myrank = 0;
var mistake4_otherrank = 0;

var userselected = -1; //유저를 공격시 선택한 유저의 인덱스

var itemidxSelected = itemidx.none;

var Side4TimeMax = 1500;
var Side4Time = 0;

//꼴지모드켜기위한 등수체크
var _side4_myrank = 0;
var _side4_myrank_old = 0;
var _side4_allcount = 0;
var modelastbottom = false;
var bzPath = [undefined, undefined, undefined, undefined];


//적AI패턴에서 사용되는 전역변수들
var ec1Time = 1.5;
var ecAngle = 5;
var ecTurnTime = 0.2;
var ec1TimeDelay = ec1Time - (ecTurnTime * 2);
var ecFollowAIDirOld = 0;
var ecFollowAIDir = 0;
var ecFollowAIDist = 0;

//스파인 전역변수
var spn_title_spine;
var spn_readygo;
var spn_dropstar;
var spn_star;
var spn_clear;
var spn_page_lock;
var spn_paddle_out;
var spn_unlock_n;
var page_lock_spr;
var mask_page_lock;
var mask_page_lock_index; //userDataPage을 찾아가기위한 임시데이터
//var spn_dropheart //2개 사용//스타트레벨창에서, 컨티뉴창에서

//효과음 변수명
var BGM_ALL;
var BGM_Game_Nomal;
var BGM_Game_Ranking;

var SE_Click;

var SE_Ball;
var SE_BearJelly_Produce;
var SE_BearJelly_Transform;
var SE_Brick_Extinction;

var SE_BrickShell_Remove;
var SE_InvincibleBrick_Blow;
var SE_Item_Bad;
var SE_Item_Good;
var SE_Paddle_Apper;
var SE_Popup_OFF;
var SE_Popup_ON;
var SE_Star_Get;
var SE_Transform;

//새로추가 //효과음 변수명
var SE_BearJelly_Hit;
var SE_Fire;
var SE_GameOver;
var SE_Go;
var SE_Heart;
var SE_InvincibleBrick_Blow_01;
var SE_Magnet;
var SE_Paddle_Dead;
var SE_Ready;
var SE_Score;
var SE_Shot;
var SE_Star_off;
var SE_Brick_Extinction_F;
var SE_Win;
//새로추가 //효과음 변수명

//새로추가2 //효과음 변수명
var SE_HurryUp;
var SE_HurryUp2;
var SE_Heart_Brick_Extinction;
var SE_Page_Open;
var SE_Brick_Drop;
//새로추가2 //효과음 변수명

// var GameState = {
//     init: 0,
//     selectmode: 1,
//     selectplayer: 2,
//     play: 3,
//     result: 4
// };

var StateMode = {
    begin: 0,
    run: 1,
    end: 2
};
//gamestate = GameState.init;
statemode = StateMode.begin;


var whiteshopguard;

function playSound_Emotion4(charid, ox) {
    // var charpicpng = [
    //     "character_icon_1.png", //개,   빨강
    //     "character_icon_2.png", //황소, 파랑
    //     "character_icon_3.png", //토끼, 보라
    //     "character_icon_4.png"  //카멜, 녹색
    // ];
    switch (charid) {
        case 0: //개,   빨강
            if (ox == 0) {
                if (kData.bSoundSE) SE_HappyDog.play();           //강아지 기쁨                 --말풍선 등장
            } else {
                if (kData.bSoundSE) SE_AngerDog.play();           //강아지 분노                 --말풍선 등장
            }
            break;
        case 1: //황소, 파랑
            if (ox == 0) {
                if (kData.bSoundSE) SE_HappyBull.play();          //황소 기쁨                   --말풍선 등장
            } else {
                if (kData.bSoundSE) SE_AngerBull.play();          //황소 분노                   --말풍선 등장
            }
            break;
        case 2: //토끼, 보라
            if (ox == 0) {
                if (kData.bSoundSE) SE_HappyRabbit.play();        //토끼 기쁨                   --말풍선 등장
            } else {
                if (kData.bSoundSE) SE_AngerRabbit.play();        //토끼 분노                   --말풍선 등장
            }
            break;
        case 3: //카멜, 녹색
            if (ox == 0) {
                if (kData.bSoundSE) SE_HappyChameleon.play();     //카멜레온 기쁨               --말풍선 등장
            } else {
                if (kData.bSoundSE) SE_AngerChameleon.play();     //카멜레온 분노               --말풍선 등장
            }
            break;
        default:
            if(dm) console.log("playSound_Emotion4 == default break");
            break;
    }
}


var item3full = [false, false, false];
var oppnent3btn = [undefined, undefined, undefined];
var item3btn = [undefined, undefined, undefined];


function debug_Sprite(spr) {
    console.log("debug_Sprite()");
    spr.inputEnabled = true;
    spr.input.enableDrag(false, false, false);//lockCenter, bringToTop, pixelPerfect.....
    spr.events.onInputUp.add(function (s) {
            debugsprite = spr;
            console.log('clicked',
                ", name:" + s.name,
                ", rendid:" + s.renderOrderID,
                ", x:" + s.x,
                ", y:" + s.y
            );
            //debugsprite.angle+=10;
            //printdebug();
        }
    );
}
function delayHitCount_Change( oBear, oBall, vDestHit ) {
//히트카운트 증가
    if (oBall.name.indexOf('ball') > -1){  //곰과 공 충돌
        oBear.z_hitcount =-1;
        //var b0 = oBear;
        setTimeout(function () { oBear.z_hitcount = vDestHit; console.log(oBear.name+"'s hitcount = "+oBear.z_hitcount); }, 500); //히트카운트 딜레이 증가 //다음단계로 가게끔
    }else {                               //곰과 총알 충돌
        oBear.z_hitcount =-1;
        //var b1 = oBear;
        setTimeout(function () { oBear.z_hitcount = vDestHit; console.log(oBear.name+"'s hitcount = "+oBear.z_hitcount); }, 250);//히트카운트 딜레이 증가 //다음단계로 가게끔
    }
//히트카운트 증가
}
