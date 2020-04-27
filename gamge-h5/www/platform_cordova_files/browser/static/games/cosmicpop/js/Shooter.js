//state_game_init_once()   공배열초기화
//state_game_set_once()    게임시작/재시작 newgame, loadlevel
//shootBubble()            클릭하는 순간 초기화
//clickTab(e)              레벨버튼클릭

//var window_onload = function() {
//init()->main()->window.requestAnimationFrame(main);
// Get the canvas and context
var mainOnce = true;
var updateOnce = true;
var updateFpsOnce = true;
var updateFpsOnce2 = true;
var renderOnce = true;
var drawFrameOnce = true;
var reposTilesOnce = true;
var renderPlayerOnce = true;

var canvas; //= document.getElementById("viewport");
var context; //= canvas.getContext("2d");

// Timing and frames per second
var lastframe = 0;
var fpstime = 0;
var framecount = 0;
var fps = 0;

var initialized = false;


var SzBall = 56; //버블텍스쳐크기
// Level
var level = {
    x: -228, //4,           // X position //레벨시작꼭지점
    y: 30, //83,          // Y position //레벨시작꼭지점
    width: 0, // Width, gets calculated
    height: 0, // Height, gets calculated
    columns: 21, // Number of tile columns
    rows: 21, // Number of tile rows
    tilewidth: SzBall, // Visual width of a tile
    tileheight: SzBall, // Visual height of a tile
    rowheight: 48, //34,  // Height of a row
    radius: 28, //20,     // Bubble collision radius
    tiles: [], // The two-dimensional tile array
    tilesBak: [], //회전시 Temp복사용 배열
    tilesspnBak:[],//회전시 SpnTemp복사용 배열
    //추가
    midxCenter: 0,      //맵중앙위치(타일왼쪽모퉁이가 아닌 중앙좌표)
    midyCenter: 0,
    midGridx: 0,
    midGridy: 0,
    midx: 0,
    midy: 0,
    id: 0, //map           //level:1로딩은 id:1로 해야함
    need: 0,
    bead: 0,
    tweenGridx:0,
    tweenGridy:0

        //추가

};
var usedRows = level.rows - 3; //실배치된 최대 행수

var busterAtt = {
    begin:0,
    run:1,
    end:2,
    none:3
};
// Define a tile class
var Tile = function (x, y, type, shift) {
    this.x = x; //grid
    this.y = y; //grid
    this.type = type;
    this.removed = false;
    //this.shift = shift;
    this.shiftx = 0;
    this.shifty = 0;
    this.velocity = 0;
    this.alpha = 1;
    this.processed = false;
    this.centerangle = 0;
    this.tweenangle=0;
    this.tweendestx=0;
    this.tweendesty=0;
    this.pivotx = 0; //각버블의 회전에 필요한 절대좌표위치
    this.pivoty = 0;
    this.txfx = false; //버블당 점수판 사용여부
    this.initx = 0;    //position.x 절대좌표값
    this.inity = 0;    //position.y 절대좌표값
    this.idadd=-1;
    this.idfuel=-1;
    this.idstar=-1;
};

// Player
var player = {
    x: 0,
    y: 0,
    angle: 0,
    tiletype: 0,
    bubble: {
        x: 0,
        y: 0,
        angle: 0,
        speed: 1000,
        dropspeed: 200, //300, //900,
        tiletype: 0,
        visible: false
    },
    nextbubble: {
        x: 0,
        y: 0,
        tiletype: 0
    },
    next1bubble1: {
        x: 0,
        y: 0,
        tiletype: 0
    },
    nextbubble2: {
        x: 0,
        y: 0,
        tiletype: 0
    },
    nextbubble3: {
        x: 0,
        y: 0,
        tiletype: 0
    },

    busterpre: false,
    buster: false,
    //busterstate: busterAtt.end,
    bustertime: 0, //0~1사이값
    bustergridx:-1,
    bustergridy:-1,
    //bustercount:0,
    star: 0,
    playtime: 0,
    playscore: 0,

    retrycount: 0,
    ballcount: 0,

};


// Neighbor offset table
var neighborsoffsets = [[[1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]], // Even row tiles
                            [[1, 0], [1, 1], [0, 1], [-1, 0], [0, -1], [1, -1]]]; // Odd row tiles

var neighborsbusteroffsets = [
        [
            [2, 0], [1, 1], [1, 2], [0, 2], [-1, 2], [-2, 1],
            [-2, 0], [-2, -1], [-1, -2], [0, -2], [1, -2], [1, -1]
        ], // Even row tiles(짝수라인)

        [
            [2, 0], [2, 1], [1, 2], [0, 2], [2, -1], [-1, 1],
            [-2, 0], [-1, -1], [-1, -2], [0, -2], [1, -2], [2, -1]
        ] // Odd row tiles(홀수라인)
    ];

// Number of different colors
//var bubblecolors = 7;
//var bubblecolors = bbDic.violet;//bbColorArr.length;

// Game states
var BSstates = {
    init: 0,
    ready: 1,
    shootbubble: 2,
    removecluster: 3,
    gameover: 4,
    finale: 5,
    tweencollision:6
};
var BSstate_ = BSstates.init;

function whatisBSstate_(st) {
    return (
        st == BSstates.init ? "init" 
        : st == BSstates.ready ? "ready" 
        : st == BSstates.shootbubble ? "shootbubble"
        : st == BSstates.removecluster ? "removecluster" 
        : st == BSstates.gameover ? "gameover" 
        : st == BSstates.finale ? "finale" 
        : st == BSstates.tweencollision ? "collision" 
        : "none"
    );
}
//var gamestateOld=null;
function debug_ChangedState() {
    if (BSstate_ != gameStateOld) {
        if(dm) console.log("-- BSstate_: " + whatisBSstate_(BSstate_));
        gameStateOld = gameStateOld;
    }
}

// Score
var score = 0;
var combocount = 0;
var turncounter = 0;
var turnsnapcounter = 0;

var rowoffset = 0;

// Animation variables
var AnimState = {
    begin: 0,
    run: 1
};
var animationstate = AnimState.begin;
var animationtime = 0;

// Clusters
var showcluster = false;
var cluster = [];
var floatingclusters = [];
var tweencluster1=[];
var tweencluster2=[];

// Images
var images = [];
var bubbleimage = [];
var BStilesMask = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //0
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //1
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //2
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //3
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //4
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //5
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //6
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //7
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //8
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //9
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //10
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //11
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //12
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //13
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //14
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //15
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //16
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //17
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //18
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //19
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //20
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //21
    ];
//스프라이트용 배열
var BStiles = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //0
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //1
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //2
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //3
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //4
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //5
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //6
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //7
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //8
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //9
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //10
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //11
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //12
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //13
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //14
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //15
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //16
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //17
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //18
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //19
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //20
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //21
    ];
var BSfinale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
var BSfinaleCount = BSfinale.length;

var FXtiles = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //0
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //1
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //2
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //3
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //4
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //5
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //6
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //7
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //8
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //9
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //10
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //11
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //12
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //13
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //14
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //15
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //16
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //17
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //18
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //19
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //20
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //21
    ];
var FXfinale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                
var TXtiles = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //0
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //1
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //2
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //3
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //4
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //5
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //6
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //7
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //8
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //9
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //10
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //11
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //12
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //13
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //14
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //15
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //16
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //17
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //18
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //19
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //20
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], //21
    ];
var TXfinale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

//참고 itemStarArr //itemFuelArr //itemAddArr //spnStar //spnFuel //spnAddBall //변수생성
//별배열초기화
var itemStarArrIdx=0;
var itemStarArr=[0,1,2];
//연료 배열초기화
var itemFuelArrIdx=0;
var itemFuelArr=[0,1,2,3,4,5,6,7,8,9,
                 0,1,2,3,4,5,6,7,8,9,
                 0,1,2,3,4,5,6,7,8,9,
                 0,1,2,3,4,5,6,7,8,9,
                 0,1,2,3,4,5,6,7,8,9];
//추가버블용 배열초기화
var itemAddArrIdx=0;
var itemAddArr=[0,1,2,3,4,5,6,7,8,9,
                0,1,2,3,4,5,6,7,8,9];

// Image loading global variables
var loadcount = 0;
var loadtotal = 0;
var preloaded = false;

var contBS;
var sprBS;
// Load images
function loadImages(imagefiles) {
    // Initialize variables
    loadcount = 0;
    loadtotal = imagefiles.length;
    preloaded = false;

    // Load the images
    var loadedimages = [];
    for (var i = 0; i < imagefiles.length; i++) {
        // Create the image object
        var image = new Image();

        // Add onload event handler
        image.onload = function () {
            loadcount++;
            if (loadcount == loadtotal) {
                // Done loading
                preloaded = true;
            }
        };

        // Set the source url of the image
        image.src = imagefiles[i];

        // Save to the image array
        loadedimages[i] = image;
    }

    // Return an array of images
    return loadedimages;
}

// Initialize the game
//    function init() {
//        if(dm) console.log("--init by once--");
//        // Load images
//        //images = loadImages(["js/bubble-sprites.png"]);
//        //images = loadImages(["js/bubble-sprites_392x56.png"]);
//        
//        bubbleimage = images[0];
//    
//        // Add mouse events
//        //canvas.addEventListener("mousemove", onMouseMove);
//        //canvas.addEventListener("mousedown", onMouseDown);
//        
//        // Initialize the two-dimensional tile array
//        for (var i=0; i<level.columns; i++) { //15
//            level.tiles[i] = [];
//            for (var j=0; j<level.rows; j++) { //14->15
//                // Define a tile type and a shift parameter for animation
//                level.tiles[i][j] = new Tile(i, j, 0, 0); //x, y, type, shift
//            }
//        }
//              //620         //15            //40              //40/2    
//        level.width = level.columns * level.tilewidth + level.tilewidth/2;
//              //482           //14            //34              //40
//        level.height = (level.rows-1) * level.rowheight + level.tileheight;
//        
//        //추가:전체그리드중심구하기
//        level.midGridx = Math.floor(level.columns/2.0);
//        level.midGridy = Math.floor(level.rows/2.0);
//        //level.midGridy = Math.floor(usedRows/2.0);
//        var midxy = getTileCoordinate(level.midGridx, level.midGridy);
//        level.midx = midxy.tilex;
//        level.midy = midxy.tiley;
//        //추가:전체그리드중심구하기
//        
//        // Init the player
//               //x:294
//        player.x = level.x + level.width/2 - level.tilewidth/2;
//               //y:565 
//        //player.y = level.y + level.height;
//        player.y = 1115;
//        player.angle = 90;
//        player.tiletype = 0;
//
//                          //x:214
//        player.nextbubble.x = player.x - 2 * level.tilewidth;
//                          //y:565 
//        player.nextbubble.y = player.y;
//        
//        
//        // Clear the canvas
//        context.clearRect(0, 0, canvas.width, canvas.height);
//        if(dm) console.log("--canva size:"+canvas.width+","+canvas.height);
//
//        if(dm) console.log("--init by once --fin--");
//        // New game
//        newGame();
//        
//        // Enter main loop
//        main(0);
//    }

//    // Main loop
//    function main(tframe) {
//        //------
//        if(dm) console.log();
//        
//        //------
//        
//        
//        if(mainOnce){
//            if(dm) console.log("--main() by once--");
//            mainOnce=false;
//            if(dm) console.log("--main() by once--fin--");
//        }
//        // Request animation frames
//        window.requestAnimationFrame(main); //루핑
//        if (!initialized) //initializing update~
//        {
//            //---------------//Preloader-------------------------
//            //delayTime(500);
//            // Draw the frame
//            drawFrame();                                                        //배경프레임과 타이틀
//            //delayTime(500);
//            // Draw a progress bar
//            //프로그래스바 테두리
//            var loadpercentage = loadcount/loadtotal;
//            context.strokeStyle = "#ff8080";//핑크
//            context.lineWidth=3;
//            context.strokeRect(18.5, 0.5 + canvas.height - 51, canvas.width-37, 32);
//            //프로그래스바
//            //context.fillStyle = "#ff8080";//핑크
//            //context.fillRect(18.5, 0.5 + canvas.height - 51, loadpercentage*(canvas.width-37), 32);
//            
//            //delayTime(100);
//            // Draw the progress text
//            var loadtext = "Loaded " + loadcount + "/" + loadtotal + " images";
//            context.fillStyle = "#000000";//검정
//            context.font = "16px Verdana";
//            context.fillText(loadtext, 18, 0.5 + canvas.height - 63);
//            //delayTime(500);
//            
//            //로딩후 뜸들이기
//            if (preloaded) {
//                // Add a delay for demonstration purposes
//                setTimeout(function(){initialized = true;}, 1000);
//            }
//            //delayTime(100);
//        } else {
//            // Update and render the game
//            if(updateOnce)
//            {
//                if(dm) console.log("--update()--loop");
//                updateOnce=false;
//            }
//            update_shooter(tframe);
//            render();
//        }
//    }

// Update the game state
var shoot_once=false;
var tweencollisiongotoready=false;  //충돌트윈후 ready모드로
var tweencollisiongotofinale=false; //충돌트윈후 게임오버모드로
//3개이상이면 트윈모드로 안간다.
//일반충돌트윈 셋팅은 이렇게
//tweencollisiongotoready=false;
//twncol = TwnCol.begin;
//setBSstate_(BSstates.tweencollision);

var bStoneAdd = true;

// case Game.PLAY:  안에서 돌고 잇음
function update_shooter(tframe) {

    var dt = (tframe - lastframe) / 1000;
    lastframe = tframe;


    // Update the fps counter
    //var deb1 = "--update: tframe(lastframe):" + tframe + ", dt:"+dt;
    //var deb2 = "--update2: tframe(lastframe):" + tframe + ", dt:"+dt;
    //        if(updateFpsOnce==false)
    //        {
    //            if(updateFpsOnce2) if(dm) console.log(deb2); //updateFpsOnce2=false;
    //        }
    //        if(updateFpsOnce) if(dm) console.log(deb1);

    updateFps(dt);

    if (BSstate_ == BSstates.ready) {
        if(bShieldRot && typeSD != TypeSD.none) stateShield(dt); //방어막회전
        // Game is ready for player input
        //--clickScreen()-->shootBubble()
        //스톤장착
        //if(dm) console.log("~ ~ turnsnapcounter:"+turnsnapcounter);
        if(bStoneAdd
           &&turnsnapcounter>0 //새게임시 버린공의 갯수가 1개이상이면 운석 생성모드
           &&combocount==0
           &&delaycountStoneCreation==false //==0 //bool형으로 변경
          ){
            bStoneAdd = false;
            var addStonePos;
            
            //운석조건스톤조건
            //1  ~ 18 운석없음 스톤없음
            //19 ~ 54 운석1개 
            //55 ~ 99 운석2개
            //100~300 운석3개
            //<19 //<55 //<100
            var lvNumber = kData.curLevel + 1;
            if(lvNumber<20){

            }else if(lvNumber<55){  //운석1개 생성
                addStonePos = getStoneRespawnPos(0); //배열[0]번째부터
                level.tiles[addStonePos.x][addStonePos.y].type = bbDic.stone1;
                tweenStone1Add(addStonePos.x,addStonePos.y, sprTweenStone1);
                
            }else if(lvNumber<100){  //운석2개 생성
                addStonePos = getStoneRespawnPos(0);
                level.tiles[addStonePos.x][addStonePos.y].type = bbDic.stone1;
                tweenStone1Add(addStonePos.x,addStonePos.y, sprTweenStone1);

                addStonePos = getStoneRespawnPos(2);//배열[2]번째부터
                level.tiles[addStonePos.x][addStonePos.y].type = bbDic.stone1;
                tweenStone1Add(addStonePos.x,addStonePos.y, sprTweenStone2);
                
            }else{                   //운석3개 생성
                addStonePos = getStoneRespawnPos(0);
                level.tiles[addStonePos.x][addStonePos.y].type = bbDic.stone1;
                tweenStone1Add(addStonePos.x,addStonePos.y, sprTweenStone1);

                addStonePos = getStoneRespawnPos(2);//배열[2]번째부터
                level.tiles[addStonePos.x][addStonePos.y].type = bbDic.stone1;
                tweenStone1Add(addStonePos.x,addStonePos.y, sprTweenStone2);

                addStonePos = getStoneRespawnPos(4);//배열[4]번째부터
                level.tiles[addStonePos.x][addStonePos.y].type = bbDic.stone1;
                tweenStone1Add(addStonePos.x,addStonePos.y, sprTweenStone3);
            }
        

        }        

    } else if (BSstate_ == BSstates.shootbubble) { //공 발사
        bStoneAdd=true;        
        // Bubble is moving
        stateShootBubble(dt);
    } else if (BSstate_ == BSstates.tweencollision){
        //충돌트윈처리-----------------------------
        stateTweenCollision(dt);
        //충돌트윈처리-----------------------------
    } else if (BSstate_ == BSstates.removecluster) { //클러스터찾기로 같은색 3개이상 되었으면
        // Remove cluster and drop tiles
        stateRemoveCluster(dt);
    } else if (BSstate_ == BSstates.finale) { //게임오버나 게임클리어시
        stateFinale(dt);
    } else if (BSstate_ == BSstates.gameover) { //게임오버상태처리-----------
        if(dm) console.log("BSstate_: " + whatisBSstate_(BSstate_));
        var resetBuster = false;
        if(dm) console.log("~ ~ BSstates.gameover.cancelBusterSpine");
    }
    //debug_ChangedState(BSstate_);
} //update_shooter()

//참고 lvNumber // cShield_ // attArrSD // shieldsetVisible // stateShield(dt) //hieldst=ShieldSt.begin;
function setBSstate_(newgamestate) {
    if(dm) console.log("--setBSstate_()--" + whatisBSstate_(BSstate_));
    BSstate_ = newgamestate;
    
    switch(newgamestate) {
        case BSstates.ready:
            if(usedballcounter !=0 &&  usedballcounter%3==0){
                if(dm) console.log("~ ~ usedballcounter:"+usedballcounter+", remaindiv3:"+usedballcounter%3);
                shieldst=ShieldSt.begin; //-->stateShield(dt) //쉴드회전충전!!
                bShieldRot=true;
                dirSD=DirSD.none;
                desttimeSD = 0.12;//0.25;
            }
            break;
        default:
            break;
    }

    animationstate = AnimState.begin;
    animationtime = 0;
    //debug_GridAttr();//setBSstate_()
    //debug_GridSpineAttr();
}

function stateShootBubble(dt) {
    //        //버블스파인fx인덱스용
    //        ClFxIdx=0;
    
    if(shoot_once){ //if(animationstate == AnimState.begin){
        SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);
        shoot_once=false;//animationstate = AnimState.run;
    }
    
    // Bubble is moving
    // Move the bubble in the direction of the mouse
    var busterSpeed = player.buster ? 1.5 : 1; //버스터모드속도1.5배
    player.bubble.x += busterSpeed * dt * player.bubble.speed * Math.cos(degToRad(player.bubble.angle));
    player.bubble.y += busterSpeed * dt * player.bubble.speed * -1 * Math.sin(degToRad(player.bubble.angle));


    //g_left.x=54; //충돌라인--
    //g_upper.y=115; 
    //g_right.x=654;
    //g_lower.y=1020; 

    if (player.bubble.x < ColMinX) { //왼쪽벽 충돌
        SESoundPlay(se.RockBounce);
        player.bubble.angle = 180 - player.bubble.angle;
        player.bubble.x = ColMinX;
        SpinePlay(
            spnCol[DIR.left],
            player.bubble.x, player.bubble.y,
            bbDicFx[player.bubble.tiletype],
            1,
            false,
            SpnInit.none
        );
    } else if (player.bubble.x + level.tilewidth > ColMaxX) { //오른쪽벽 충돌
        SESoundPlay(se.RockBounce);
        player.bubble.angle = 180 - player.bubble.angle;
        player.bubble.x = ColMaxX - level.tilewidth;
        SpinePlay(
            spnCol[DIR.right],
            player.bubble.x+level.tilewidth, player.bubble.y,
            bbDicFx[player.bubble.tiletype],
            1,
            false,
            SpnInit.none
        );
    }

    if (player.bubble.y < ColMinY) { //천장에 충돌// 공이 상승하면 y작아지므로, 더 작아지면 레벨구역 벗어나게 된다.
        //--원본 충돌시 스톱
        //// Top collision
        //player.bubble.y = level.y;
        //snapBubble();              //발사공 월드포지션을 그리드포지션으로 변환, 같은색 3개이상 찾기, 턴5회때 라인추가,
        //return;//원래는 종료시점
        //--원본

        //--상단충돌바운스처리
        SESoundPlay(se.RockBounce);
        player.bubble.angle = 360 - player.bubble.angle;
        player.bubble.y = ColMinY;
        SpinePlay(
            spnCol[DIR.top],
            player.bubble.x-w2, player.bubble.y,
            bbDicFx[player.bubble.tiletype],
            1,
            false,
            SpnInit.none
        );        

    }
    //--추가 하단충돌바운스처리
    //if(player.bubble.y>level.y+level.height)

    if (player.bubble.y + level.tileheight > ColMaxY) {

        //처음 쏠때 하단 충돌할때
        if (player.bubble.angle > 0 && player.bubble.angle < 180) return;

        //하단 충돌시 바운스
        //player.bubble.angle = 360 - player.bubble.angle;
        //player.bubble.y = ColMaxY-level.tileheight;//

        //하단통과시
        if (player.bubble.y + level.tileheight > iMaxSizeY) {
            combocount = 0;
            turnsnapcounter++; //턴 증가 //1개이상이면 운석생성 가능

            if(player.ballcount!=0) nextBubble(); //하단충돌시
            
            if(player.buster){ //총알이 하단통과시 버스터모드
                player.buster = false;
                player.busterpre = false;                
                cancelBusterSpine(); //하단통과시 버스터모드 중지
                resetBuster(); //0값으로 초기화
            }

            if(checkGameoverBulletZero()){//총알떨어지고하단충돌
                stfin = StFin.continuous;
                setBSstate_(BSstates.finale);
                
                //총알이 없는 우주선 상태로 만든다.
                SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);
                SpinePlayerBubble.visible = false;//날아다니는 공에 붙는 버스터스파인
                mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[0]); //null                      
                
                return;
            }else{
                busterBeforeAD=false;  //총알0시 버스터모드백업용도
                setBSstate_(BSstates.ready); //하단통과시 총알있는경우
            }
            //return;//원래는 종료
        }

    }
    //--추가

    // Collisions with other tiles
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            var tile = level.tiles[i][j];

            // Skip empty tiles
            if (tile.type < 0) { //빈타일은 넘어감
                continue;
            }

            // Check for intersections
            //var coord = getTileCoordinate(i, j); //타일1 그리드->월드좌표(좌상단) 넘겨준다
            //                     공중심xy, 타일1반지름, 타일1중심xy, 타일1반지름
            if (circleIntersection(player.bubble.x + level.tilewidth / 2,
                    player.bubble.y + level.tileheight / 2,
                    level.radius * 0.5,
                    tile.initx+level.tilewidth*0.5, //coord.tilex + level.tilewidth / 2,
                    tile.inity+level.tileheight*0.5,//coord.tiley + level.tileheight / 2,
                    level.radius)) {

                // Intersection with a level bubble
                snapBubble(); //발사공 월드포지션을 그리드포지션으로 변환, 같은색 3개이상 찾기, 턴5회때 라인추가,
                return;
            }
        }
    }
}

//참고 lvNumber // cShield_ // attArrSD // shieldsetVisible // stateShield(dt) //hieldst=ShieldSt.begin;
function stateShield(dt){
    switch(shieldst) {
        case ShieldSt.begin: //1번만 실행
            olddegIdx=degIdxSD;
            var next;
            if(dirSD==DirSD.clock){//오른쪽버튼 누를때, 평상시
                next = degIdxSD+1;    
                degIdxSD=next>degArrSD.length-1?0:next; //인덱스를 범위 안으로    
            }else if(dirSD==DirSD.rclock){ //왼쪽버튼 누를때,(특별한 경우)
                next = degIdxSD-1;    
                degIdxSD=next<0?degArrSD.length-1:next; //인덱스를 범위 안으로    
            }else{ //if(dirSD==DirSD.none)
                //next = Math.floor(generateRandomNumber(0, attArrSD[0].length));
                var rand01 = Math.floor(generateRandomNumber(0,2));
                if(rand01==0){
                    next = degIdxSD+1;
                }else{
                    next = degIdxSD-1;
                }
                degIdxSD=next<0?degArrSD.length-1
                        :next>degArrSD.length-1?0
                        :next; //인덱스를 범위 안으로    
            }
            
            shieldst = ShieldSt.running;
            curtimeSD=0;
            
            //디버깅출력
            if(dm) console.log("~ ~ shield.begin: dt:"+dt
                        +", old:"+degArrSD[olddegIdx]
                        +", dest:"+degArrSD[degIdxSD]
                       );
            
            var str = "";
            var len = attArrSD[typeSD][degIdxSD].length;
            for (var i=0; i<len; i++) {
                var offsetidx = attArrSD[typeSD][degIdxSD][i];
                str += (", ["+i+"]"+offsetArrSD[offsetidx][0]+","+offsetArrSD[offsetidx][1]);
            }
            
            if(dm) console.log("~ ~ attArrSD.print:" + str
                        +", level.mid:"+level.midGridx +","+level.midGridy
                       );
            //디버깅출력
            break;
            
        case ShieldSt.running: //계속 update
            //if(dm) console.log("~ ~ shield.running: dt:"+dt);
            curtimeSD+=dt;
            var timeBias=curtimeSD/desttimeSD;      //보간용 시간비율
            var degDT = destdegSD*timeBias;         //시간대비 보간각 가져오기
            var olddeg = degArrSD[olddegIdx];       //예전각도 가져오기
            var curdegSD;
            if(dirSD==DirSD.clock){//오른쪽버튼 누를때, 평상시
                curdegSD=olddeg+degDT;              //출발각도+(0~60)도
                if(degDT>=destdegSD){               //60도보다 크면//보간각도가 60도 초과하면 완료각으로
                    shieldst = ShieldSt.end;
                    curdegSD=degArrSD[degIdxSD]         //현재 절대각도
                    if(dm) console.log("~ ~ shield.curdeg: "+curdegSD
                                +", olddeg:"+olddeg
                                +", cshield.deg:"+radToDeg(cShield_.rotation)
                               );
                    cShield_.rotation=(degToRad(curdegSD)); //방어막 회전중
                    cShield_ray_.rotation=cShield_.rotation;
                }else{
                    cShield_.rotation=(degToRad(curdegSD)); //방어막 회전중
                    cShield_ray_.rotation=cShield_.rotation;
                }
                
            }else if(dirSD==DirSD.rclock){
                curdegSD=olddeg-degDT;              //출발각도-(0~60)도
                if(degDT>=destdegSD){               //60도보다 크면//보간각도가 60도 초과하면 완료각으로
                    shieldst = ShieldSt.end;
                    curdegSD=degArrSD[degIdxSD]         //현재 절대각도
                    if(dm) console.log("~ ~ shield.curdeg: "+curdegSD
                                +", olddeg:"+olddeg
                                +", cshield.deg:"+radToDeg(cShield_.rotation)
                               );
                    cShield_.rotation=(degToRad(curdegSD)); //방어막 회전중
                    cShield_ray_.rotation=cShield_.rotation;
                }else{
                    cShield_.rotation=(degToRad(curdegSD)); //방어막 회전중
                    cShield_ray_.rotation=cShield_.rotation;
                }
                
            }else{ //if(dirSD==DirSD.none)
                if(olddeg>degArrSD[degIdxSD]){
                    degDT=(olddeg-degArrSD[degIdxSD])*timeBias;
                    curdegSD = olddeg-degDT;//출발각도+(0~60)도
                }else if(olddeg<degArrSD[degIdxSD]){
                    degDT=(degArrSD[degIdxSD]-olddeg)*timeBias;
                    curdegSD = olddeg+degDT;//출발각도+(0~60)도
                }else{
                    curdegSD = olddeg;
                }
                if(degDT>=destdegSD){ //60도보다 크면 //각도가 60도 초과하면 완료각으로
                    shieldst = ShieldSt.end;
                    curdegSD=degArrSD[degIdxSD]         //현재 절대각도
                    if(dm) console.log("~ ~ shield.curdeg: "+curdegSD
                                +", olddeg:"+olddeg
                                +", cshield.deg:"+radToDeg(cShield_.rotation)
                               );
                    cShield_.rotation=(degToRad(curdegSD)); //방어막 회전중
                    cShield_ray_.rotation=cShield_.rotation;
                }else{
                    cShield_.rotation=(degToRad(curdegSD)); //방어막 회전중
                    cShield_ray_.rotation=cShield_.rotation;
                }
            }
            
                
            break;
            
        case ShieldSt.end:
            if(dm) console.log("~ ~ shield.end: dt:"+dt);
            bShieldRot=false;
            shieldst=ShieldSt.none;
            break;
    
        default:
            break;
    } //switch
}


var fcUsed = false;
//코어 소리 작동시
var coreIdx = 0;

var fci = 0;
var fcj = 0;
var fcTotalCnt = 0;

function stateRemoveCluster(dt) // 클러스터제거
{
    if(dm) console.log("--stateRemoveCluster()--");
    if (animationstate == AnimState.begin) { //한번만 실행후 //상태가 바뀔때 0으로 초기화되므로
        
//            if (checkGameOver()) { //밑줄에 닿는지
//                stfin = StFin.none;
//                setBSstate_(BSstates.finale);
//                return;
//            }
        
//        if(true){
//            //이사--> 클러스터가 쌓여있을경우 점수계산
//            if (cluster.length >= 3 || FoundFuel || FoundAddBall) {
                // Remove the cluster
        
                //버스터모드 끄기
                //버블 점수계산
                //버블 텍스트 On
                //버블 이펙트 On
                //UI업데이트
                //스코어계산점수계산
        
                var pointBase = pointBaseCount * 20; //같은색 숫자만 취합 점수
                //콤보시 같은색 점수 + 버블갯수만큼 콤보점수 더함
                var pointCombo = pointBase + (combocount * 10 * pointBaseCount);
                //버블점수판 클러스터
                clusterPointText = 20 + (combocount * 10); //텍스트 출력용 //버블점수+콤보
                
                if(player.buster) //버스터모드시 점수
                {
                    //player.playscore += pointBase;
                    player.playscore += (cluster.length * 500); //클러스터 갯수*300 점수
                    if(dm) console.log("~ ~ stateRemoveCluster()->cancelBusterSpine");
                    
                    deltaBuster = cluster.length * 0.02; //버스터증가,연료증가
                    
                    cancelBusterSpine();resetBuster(); //버블과 충돌시 버스터모드 중지
                    
                    var len = cluster.length;
                    for (var c1 = 0; c1 < len; c1++) {
                        //TXtiles[cluster[c1].x][cluster[c1].y].text = clusterPointText + 500; //버블점수+콤보+버스터점수
                        TXtiles[cluster[c1].x][cluster[c1].y].text = 500; //버블점수+콤보+버스터점수
                        cluster[c1].txfx = true;
                    }
                } else //평상시
                {
                    player.playscore += (pointBase + pointCombo);
                    player.playscore += cluster.length * 100;
                    deltaBuster = cluster.length * 0.02; //버스터증가,연료증가
                    if(dm) console.log("~ ~ stateRemoveCluster().deltaBuster ==" + deltaBuster);
                    guiset_addFuelBar(); //클러스터3개 이상시
                    if(dm) console.log("deltaBuster(clusters):" + deltaBuster);
                    //버블점수판 일반 클러스터
                    for (var c1 = 0; c1 < pointBaseCount; c1++) {
                        TXtiles[cluster[c1].x][cluster[c1].y].text = clusterPointText; //버블점수+콤보
                        cluster[c1].txfx = true;
                    }
                }
                TxScore.text = getMoneyFormatFromNum(player.playscore);//클러스터제거시
                //setScaleTextWidth(TxScore);
                //-->stateRemoveCluster(dt)로
                //setBSstate_(BSstates.removecluster);

                if(dm) console.log("combocount: " + combocount);

                combocount += 1;
//                //return;
//            }
//            //이사-->             
//        } //if(true)
        
        resetRemoved(); //전체 그리드 제거체크항목 off
        clcnt = 0;
        clIdx = 0;
        coreIdx = 0;
        //cllength = cluster.length;
        fclcnt = 0;
        //fclIdx = 0;
        fcUsed = false;
        fci = 0;
        fcj = 0;
        //fcllength=0;//밑에서 초기화
        if(dm) console.log("~ ~ inspect 118:");
        //debug_GridAttr();
        // Mark the tiles as removed
        for (var i = 0; i < cluster.length; i++) {
            // Set the removed flag                             //findCluster()로 찾은 같은색 배열이므로
            cluster[i].removed = true; //같은색 클러스터는 제거될 상태이므로, 활성
        }
        // Add cluster score//특수아이템까지 들어가 있어서 끔
        //score += cluster.length * 100;                          //제거된 공1개당 100점


        // Find floating clusters
        floatingclusters = findFloatingClusters();

        //fcllength = floatingclusters.length;

        //if(dm) console.log("---floatingCluster:"+whatisClusters(floatingclusters));

        //var midx = level.midx + level.tilewidth/2;
        //var midy = level.midy + level.tileheight/2;

        fcTotalCnt = 0;
        if (floatingclusters.length > 0) {
            // Setup drop animation
            for (var i = 0; i < floatingclusters.length; i++) {
                for (var j = 0; j < floatingclusters[i].length; j++) {
                    var tile = floatingclusters[i][j];
                    //tile.velocity = player.bubble.dropspeed;
                    tile.velocity = player.bubble.dropspeed * generateRandomNumber(0.5, 1.5);
                    fcTotalCnt += 1;
                }
            }
        }
        //버스터연료채우기
        deltaBuster = fcTotalCnt * 0.02; //플로팅  갯수만큼 연료 획둑
        guiset_addFuelBar(); //플로팅 갯수만큼 연료 업데이트한다.
        if(dm) console.log("deltaBuster(floatingclusters):" + deltaBuster);
        //스코어점수올리기
        player.playscore += fcTotalCnt * 300; //플로팅  갯수 점수
        TxScore.text = getMoneyFormatFromNum(player.playscore); //클러스터제거시
        //setScaleTextWidth(TxScore);
        //다음단계로

        if(dm) console.log("~ ~ inspect 118a:");
        //debug_GridAttr();
        
        //클러스터에서 고르고 버블스파인플레이 -- 터짐이펙트
        var clustercount = cluster.length;
        for (var i = 0; i < clustercount; i++) {
            var selc = cluster[i];
            var selx = selc.x;
            var sely = selc.y;
            if(selc.type!=bbDic.core)
                selc.type = bbDic.cluster;
            SpinePlay(FXtiles[selx][sely],
                null, null,
                "normal_bubble_bomb",
                0,
                false,
                SPINE_INIT_NONE);

            //SESoundPlay(se.RockBoom);

            //ClFxIdx+=1;
        }
        
        if(player.bustergridx!=-1){//버스터 1개터짐
            var bx = player.bustergridx;
            var by = player.bustergridy;
            if( level.tiles[bx][by].type == -1){
                if(dm) console.log("~ ~ buster boom 2: xy:"+bx+", "+by);
                var px = level.tiles[bx][by].pivotx;
                var py = level.tiles[bx][by].pivoty;
                SpinePlay(spnBusterBoom,
                    px, py,
                    BusterAni.boom,
                    0,
                    false,
                    SPINE_INIT_NONE);
                player.bustergridx=-1;
                player.bustergridy=-1;
                
            }
        }
        if(player.buster)
        SESoundPlay(se.MeteoBoom);//SESoundPlay(se.MeteoBoom);
        else
        SESoundPlay(se.RockBoom); //클러스터사운드1회 -->뒤로이동:181
        
        if(dm) console.log("~ ~ inspect 119:");
        //debug_GridAttr();
        
        //플로팅 클러스터 사운드처리
        var soundcount=0;
        var lenA = floatingclusters.length;
        
            //클러스터에서 고르고 버블스파인플레이 -- 터짐이펙트
        if (FoundCore){ //stateRemoveCluster().AnimState.begin
            SpinePlay(mainCoreFx, null, null, coreStar.idle, 1, true);
            shieldsetVisible(false);
            
        //코어 터지면 1번
        if (coreIdx == 0) {
            //SESoundPlay(se.MeteoBoom);
            SESoundPlay(se.SaveFriend);
            if(dm) console.log("SESoundPlay(se.SaveFriend)-------------------------------------");
            coreIdx = 1;
        }            
        }else{    
            if(lenA>0){
                for (var i = 0; i < lenA; i++) {
                    soundcount += floatingclusters[i].length;
                }
                if(dm) console.log("~ ~ soundcount:"+soundcount);
                if(soundcount==1) {
                    //setTimeout(SESoundPlay(se.RockOut),1000); //SESoundPlay(se.RockOut);
                    TweenMax.delayedCall(
                        0.5, //tilem
                        function(){
                            SESoundPlay(se.RockOut);
                        }
                    );
                }else if(soundcount==2) setTimeout(
                    function(){
                        SESoundPlay(se.RockOut2);
                    },
                    500);//SESoundPlay(se.RockOut2);
                else if(soundcount==3) setTimeout(
                    function(){
                        SESoundPlay(se.RockOut3);
                    },
                    500);//SESoundPlay(se.RockOut3);
                else if(soundcount>3) setTimeout(
                    function(){
                        SESoundPlay(se.RockOut4)
                    },
                    500);//SESoundPlay(se.RockOut4);
            }
        }//FoundCore
        animationstate = AnimState.run;
        busterx2=false;
    }

    if (animationstate == AnimState.run) {

//        if (FoundCore) {
//            //코어 터지면 1번
//            if (coreIdx == 0) {
//                //SESoundPlay(se.MeteoBoom);
//                SESoundPlay(se.SaveFriend);
//                coreIdx = 1;
//            }
//        }
        //클러스터에서 고르고 버블스파인플레이
        // Pop bubbles
        var tilesleft = false; //클러스터,플로팅 안에 버블이 남았는지 체크(안남았으면  false)
        var len =cluster.length;
        var addbuster=0; //한번더처리하려고
        for (var i = 0; i < len; i++) {
            var tile = cluster[i];
            
            if (tile.type >= 0 
                && tile.type!=bbDic.core //그리드속성은 코어쪽을 13으로 복구햇다 그런데..여기서는 계속 클러스터배열을 사용하므로 이렇게
               ) {
                tilesleft = true; //버블 발견, 클러스터 안에서
                
                if (tile.idadd != -1 && tile.alpha == 1 ) { 
                    tweenAddball(itemAddArr[tile.idadd],//클러스트안에서 바로제거시
                                itemAddArr[tile.idadd].x,
                                itemAddArr[tile.idadd].y
                    );
                    tile.idadd=-1;
                    if(dm) console.log("~ ~ removecluster.additem:");
                }else if(tile.idfuel != -1 && tile.alpha == 1 ) { //snapbubble(). addtile
                    addbuster += 0.5;

                    //deltaBuster = 0.5;  //추가연료 획득
                    //guiset_addFuelBar(); //이웃에 연료버블이 있으면

                    // if(!player.buster) {
                    //     console.log("chk(+0.5) buster==false:"+deltaBuster
                    //         +", busterpre:" + player.busterpre
                    //         +", bustertime:" + player.bustertime
                    //     );
                    // }else{
                    //     console.log("chk(+0.5) buster==true:"+deltaBuster
                    //         +", busterpre:" + player.busterpre
                    //         +", bustertime:" + player.bustertime
                    //     );
                    // }
                    tweenFuel(itemFuelArr[tile.idfuel],//클러스트안에서 바로제거시
                        itemFuelArr[tile.idfuel].x,
                        itemFuelArr[tile.idfuel].y
                    );
                    tile.idfuel=-1;
                    if(dm) console.log("~ ~ removecluster.fuel:");

                    //번개연료 따로 처리준비
                    //addbuster += deltaBuster;
                    //번개연료 따로 처리준비


                }else if(tile.idstar != -1 && tile.alpha == 1 ) { //snapbubble(). addtile
                    player.star+=1; //클러스터
                    if(dm) console.log("~ ~ tweenstar a:"+player.star );
                    tweenStar(itemStarArr[tile.idstar],//클러스트안에서 바로제거시
                            itemStarArr[tile.idstar].x,
                            itemStarArr[tile.idstar].y
                    );
                    tile.idstar=-1;
                    
                    if(dm) console.log("~ ~ removecluster.fuel:");
                }
                
                // Alpha animation
                tile.alpha -= dt * 1.5; //15;


                //추가 - 각도에 따른 쉬프트
                var dtMove = moveToAngle(tile.centerangle, dt * tile.velocity);
                //if(dm) console.log("dtMove:xy:"+dtMove[0]+","+dtMove[1]);
                tile.shiftx += dtMove[0];
                tile.shifty += dtMove[1];
                //추가 - 각도에 따른 쉬프트
                //이동추가

                //위치리셋
                //알파0 이거나, 
                if (
                    tile.alpha <= 0 || (tile.y * level.rowheight + tile.shift > (level.rows - 1) * level.rowheight + level.tileheight)

                    // 한마디로 맨밑으로 벗어나면
                    // 출발y위치+변동거리> 행 //(타일y그리드값 * 1행높이값) + 이동거리 > ((전체그리드줄수-1) * 1행높이)+ 공1타일픽셀높이값
                ) {
                    //BStiles[tile.x][tile.y].visible = false;
                    BStiles[tile.x][tile.y].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture;
                    tile.type = -1;
                    //tile.shift = 0;
                    tile.shiftx = 0;
                    tile.shifty = 0;
                    tile.alpha = 1;
                    tile.velocity = player.bubble.dropspeed;
                    //if(dm) console.log("stateRemoveCluster.alpha=0 xy:"+tile.x+","+tile.y);
                    //if(dm) console.log("stateRemoveCluster.idadd:"+tile.idadd+", idfuel:"+tile.idfuel);
                }
                //if(dm) console.log("xy:"+tile.x+","+tile.y+", a:"+tile.alpha);
                //if(i==0)SESoundPlay(se.RockOut);
            }
        }
        if(addbuster>0){
            deltaBuster += addbuster;
            if(deltaBuster >= 1
            &&player.busterpre == true
            &&player.buster == true
            ){
                deltaBuster = 0.98;
            }



            guiset_addFuelBar();

            if(!player.buster) {
                if(dm) console.log("chk(addbuster) buster==false:"+deltaBuster
                    +", busterpre:" + player.busterpre
                    +", bustertime:" + player.bustertime
                );
            }else{
                if(dm) console.log("chk(addbuster) buster==true:"+deltaBuster
                    +", busterpre:" + player.busterpre
                    +", bustertime:" + player.bustertime
                );
            }
            addbuster = 0;
        }
        
        if(false) { //한번에 처리하려다 여기선 여러번 실행되므로 주석
            if (cluster.length > 0) {//1번실행위해서
                //쌓인 버스터수치만 여기서 따로 처리해보자--------------
                player.bustertime += addbuster;
                if (addbuster >= 1) busterx2 = true;
                else busterx2 = false;
                guiset_addFuelBar();//쌓인 버스터수치만 여기서 따로 처리해보자
                console.log("chk player.bustertime:" + player.bustertime);
                //쌓인 버스터수치만 여기서 따로 처리해보자--------------
            }
        }

        //버블스파인 클러스터->플로팅 으로 처리 넘어 갈때 딜레이
        dtBBSpineCluster += deltaTime;
        if (dtBBSpineCluster > 0.4) { 
            dtBBSpineCluster = 0;
            bBBSpineCluster = false;
            bBBSpineFloating = true;
        }

        //if(dm) console.log("bBBSpineFloating:"+ bBBSpineFloating+", dtBBSpineCluster:"+dtBBSpineCluster);
        // Drop bubbles
        if (!bBBSpineFloating) //클러스터모드일때 다음 진행 금지, floating모드는 넘거감
        {
            //tilesleft=true;
            BSstate_ = BSstates.removecluster;
            animationstate = AnimState.run;
            return; //의심코드 ==->=로 고침
        }

        //플로팅클러스터 중에서 고르고 버블스파인플레이 -- 터짐이펙트

        var len = floatingclusters.length;
        for (var i = 0; i < len; i++) {
            var lencnt = floatingclusters[i].length;
            for (var j = 0; j < lencnt; j++) {
                var tile = floatingclusters[i][j];

                if (tile.type >= 0) { //버블이면 이동처리한다.
                    tilesleft = true; //버블발견체크, 플로팅클러스터 안에서

                    // Accelerate dropped tiles
                    //tile.velocity += dt * 70;//700;
                    //tile.shift += dt * tile.velocity;

                    //                        //플로팅클러스터스파인처리
                    //                        if(!fcUsed){//1회성 용도
                    //                            tile.type = bbDic.floatingcluster;
                    //                            SpinePlay( FXtiles[tile.x][tile.y],
                    //                                null, null,
                    //                                "normal_bubble_bomb",
                    //                                0,
                    //                                false,
                    //                                SPINE_INIT_NONE);
                    //                        }
                    if (!fcUsed) { //플로팅클러스터완료가 아니면
                        //전역인덱스로 플로팅1 고른다.

                        //시간지연
                        dtBBSpineFloating += deltaTime;
                        if (dtBBSpineFloating > 0.2) {

                            dtBBSpineFloating = 0;
                            //시간지연

                            //플로팅사운드처리---------------------------
                            //SESoundPlay(se.RockOut);
                            //if(dm) console.log("se.RockOut:"+fci+","+fcj );

                            var fcBB1 = floatingclusters[fci][fcj];
                            fcBB1.type = bbDic.floatingcluster;   //속성13으로

                            SpinePlay(FXtiles[fcBB1.x][fcBB1.y],
                                null, null,
                                "normal_bubble_bomb",
                                0,
                                false,
                                SPINE_INIT_NONE);

                            //버블점수판
                            TXtiles[fcBB1.x][fcBB1.y].text = 300; //플로팅버블점수
                            fcBB1.txfx = true;

                            //지연시간이 되면,  다음 플로팅클러스터의 x,y값을 지정하고, 끝이면 종료체크(fcUsed)
                            fcj += 1; //y값인덱스증가 
                            if (fcj > floatingclusters[fci].length - 1) {
                                fci += 1;
                                fcj = 0; //x값인덱스증가 
                                if (fci > floatingclusters.length - 1) {
                                    fcUsed = true;
                                    //                                    BSstate_ == BSstates.removecluster;
                                    //                                    animationstate == AnimState.run;
                                }
                            }
                            //인덱스 증가처리

                            if (fcBB1.idadd != -1) {
                                //즉석사라짐 추가//
                                SpinePlay(itemAddArr[fcBB1.idadd].spn,null, null, "empty", 0, true);
                                
//                                //트윈사라짐
//                                tweenAddball(itemAddArr[fcBB1.idadd], //플로팅 클러스트안에서 순차 제거시
//                                            itemAddArr[fcBB1.idadd].x,
//                                            itemAddArr[fcBB1.idadd].y
//                                );
                            
                                fcBB1.idadd=-1;
                                if(dm) console.log("~ ~ removeFloating.additem:");
                            }else if(fcBB1.idfuel != -1) { //snapbubble(). addtile
                                //즉석사라짐 추가//
                                SpinePlay(itemFuelArr[fcBB1.idfuel].spn,null, null, "empty", 0, true);
                                
//                                //트윈사라짐
//                                tweenFuel(itemFuelArr[fcBB1.idfuel],//플로팅 클러스트안에서 순차 제거시
//                                    itemFuelArr[fcBB1.idfuel].x,
//                                    itemFuelArr[fcBB1.idfuel].y
//                                );
                                
                                fcBB1.idfuel=-1;
                                if(dm) console.log("~ ~ removeFloating.fuel:");
                            }else if(fcBB1.idstar != -1) { //snapbubble(). addtile
                                if(!FoundCore){
                                    //player.star+=1;//플로팅클러스터시 //먹으면 안되므로
                                    
                                    //즉석사라짐 추가//
                                    SpinePlay(itemStarArr[fcBB1.idstar].spn,null, null, "empty", 0, true);
                                    
//                                    //트윈사라짐
//                                    tweenStar(itemStarArr[fcBB1.idstar],//플로팅 클러스트안에서 순차 제거시
//                                            itemStarArr[fcBB1.idstar].x,
//                                            itemStarArr[fcBB1.idstar].y
//                                    );
                                }else{//if(FoundCore)//stateRemoveCluster().animrun.
                                    SpinePlay(itemStarArr[fcBB1.idstar].spn,null, null, "empty", 0, true);
                                }
                                fcBB1.idstar=-1;
                                if(dm) console.log("~ ~ removeFloating.star:(not tween)");
                            }                                                     
                            
                        } //시간지연

                    }


                    //추가 - 각도에 따른 쉬프트
                    var dtMove = moveToAngle(tile.centerangle, dt * tile.velocity);
                    //if(dm) console.log(dtMove[0]+","+dtMove[1]);
                    tile.shiftx += dtMove[0];
                    tile.shifty += dtMove[1];
                    //추가 - 각도에 따른 쉬프트

                    // Alpha animation
                    tile.alpha -= dt * 1; //8;

//                    //완전사라짐
//                    if (tile.alpha < 0) {
//                        tile.alpha = 0;
//                        BStiles[tile.x][tile.y].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture;
//
//                    }

                    //리셋////알파0 이거나, //완전사라짐을 의미
                    if(tile.alpha <= 0
                    || (tile.y * level.rowheight + tile.shifty > (level.rows - 1) * level.rowheight + level.tileheight)
                        // 한마디로 맨밑으로 벗어나면
                        // 출발y위치+변동거리> 행 //(타일y그리드값 * 1행높이값) + 이동거리 > ((전체그리드줄수-1) * 1행높이)+ 공1타일픽셀높이값
                    ) {
                        
                        //if(dm) console.log("~ ~ ---------------------------               -------------------------------------:"+tile.type);
                        //타이밍이 늦게 사라지는 지점이라 유의할것
//                        if(tile.idfuel != -1){ //플로팅상태에서 이동중 알파0나, 하단통과시
//                            if(dm) console.log("~ ~ ---------------------------        a       -------------------------------------:");
//                            SpinePlay(itemFuelArr[tile.idfuel].spn, null, null, "empty", 0, true);//플로팅클러스터 알파0시
//                            itemFuelArr[tile.idfuel].visible = false;
//                            tile.idfuel=-1;
//                            if(dm) console.log("-- stateRemoveCluster .run .floatingcluster .!fcUsed: tile.type==fuel");
//                        }else if(tile.idadd != -1){
//                            if(dm) console.log("~ ~ ---------------------------        b       -------------------------------------:");
//                            SpinePlay(itemAddArr[tile.idadd].spn, null, null, "empty", 0, true);//플로팅클러스터 알파0시
//                            itemAddArr[tile.idadd].visible = false;
//                            tile.idadd=-1;
//                            if(dm) console.log("-- stateRemoveCluster .run. floatingcluster .!fcUsed: tile.type==addball");
//                        }else if(tile.idstar != -1){ //stateRemoveCluster().animstate.run
//                            if(dm) console.log("~ ~ ---------------------------        c       -------------------------------------:");
//                            SpinePlay(itemStarArr[tile.idstar].spn, null, null, "empty", 0, true);//플로팅클러스터 알파0시
//                            itemStarArr[tile.idstar].visible = false;
//                            tile.idstar=-1;
//                            if(dm) console.log("-- stateRemoveCluster .run .floatingcluster .!fcUsed: tile.type==star");
//                        }                        
                        if(dm) console.log("--------------- 알파가 0이거나, 화면밑으로 사라질때 -----------------type:"+tile.type);
                        BStiles[tile.x][tile.y].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture;
                        tile.type = -1; //플로팅클러스터1의 마지막 속성변환
                        //tile.shift = 0;
                        tile.shiftx = 0;
                        tile.shifty = 0;
                        tile.alpha = 1;
                        tile.velocity = player.bubble.dropspeed;
                        //BStiles[tile.x][tile.y].visible = false;
                         
                    }
                    //if(dm) console.log("xy:"+tile.x+","+tile.y+", a:"+tile.alpha);
                }

            }
        }
        //fcUsed =true;//1회성 용도
        //클러스터,플로팅클러스터에 버블이 비워져있으면, 실행
        //레벨속에 버블속성을 검사
        //여기서 tileleft는 플로팅클러스터임
        
        if (!tilesleft) { //플로팅 클러스터 안에서 버블이 없을때
            if(player.ballcount!=0) nextBubble();
            var tilefound = false; //전체 레벨속에 버블이 있는지 검사
            for (var i = 0; i < level.columns; i++) {
                for (var j = 0; j < level.rows; j++) {
                    if (level.tiles[i][j].type != -1) {
                        tilefound = true;
                        break;
                    }
                }
            }
            //부스터끄기
            if(player.buster){ //플로팅에서 버블 없는 경우
                player.buster = false;
                player.busterpre = false;
                cancelBusterSpine();
            }
            warningDeadline();
            if (tilefound) { //레벨에 타일이 있으면 //계속 플레이
                if (checkGameoverBulletZero()) { //총알 갯수 0체크
                    stfin = StFin.continuous;
                    setBSstate_(BSstates.finale);
                    
                     //우주선총알없게
                    SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);

                    //player.busterstate = busterAtt.end;
                    SpinePlayerBubble.visible = false;//날아다니는 공에 붙는 버스터스파인
                    mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[0]); //null
                    
                    return;
                }else{
                     busterBeforeAD=false;  //총알0시 버스터모드백업용도
                }
                setBSstate_(BSstates.ready); //클러스터제거후, 레벨에 타일이 있으면서, 총알이 있는 경우
            } else { //타일 다 없애면
                stfin = StFin.begin; //피날레시작설정
                setBSstate_(BSstates.finale);
            }
        }
    }
}

//mainmenuTopStar3
function tweenStar(obj, xp, yp){ //별트윈
    //이동트윈
    if(dm) console.log("~ ~ tweenStar.player.star:"+player.star);
    var idx = player.star-1;
    var xd = mainmenuTopStar3[idx].x;
    var yd = mainmenuTopStar3[idx].y;
    SpinePlay(obj.spn,null,null, "item_star_idle", 0, true);
    var bzPath = [
        {
            x: xp,
            y: yp,
            scaleX: 3,//2,
            scaleY: 3,//2
        }, //, scale:2},
        {
            x: xp+(xd-xp)*0.33, //x: xp2,
            y: yp+(yd-yp)*0.33,//y: yp-50,
            scaleX: 5,//1.5,
            scaleY: 5//1.5

        }, //, scale:1},
        {
            x: xp+(xd-xp)*0.66, //x: xd2,
            y: yp+(yd-yp)*0.66, //y: yp+50,//yd-((yd-yp)*0.75),
            scaleX: 3,
            scaleY: 3

        }, //, scale:2},
        {
            x: xd,
            y: yd,
            scaleX: 0.5,
            scaleY: 0.5

        } //, scale:1}
    ];
    var distTime = distance2D(xp,yp,xd,yd) * 0.0008;//0.00075;
    if(dm) console.log("~ ~ tweenStar.distTime:"+distTime +" --> 0.3" );
    //if(distTime>0.3) distTime=0.3;

    TweenMax.to(
        obj,
        distTime, //0.001,
        {
            bezier: {
                //type:"cubic",
                type: "soft", //강추
                //autoRotate:true,
                values: bzPath,
            },
            onStart: function(){
                SESoundPlay(se.GetStar);
            },
//            onUpdate:
//                function(){ },
            onComplete: function(){ //tweenAddball종료시
                obj.scaleX=1;
                obj.scaleY=1;
                SpinePlay(obj.spn, null, null, "empty", 0, true);
                mainmenuTopStar3[idx].texture = SpritePool.getInstance().get(getPathMiniStar(true)).texture;
//                SpinePlay(itemAddArr[BStiles[nx][ny].idadd].spn, null, null, "empty", 0, true);//플로팅클러스터 알파0시
//                itemAddArr[BStiles[nx][ny].idadd].visible = false;
//                BStiles[nx][ny].idadd=-1;                
                TweenMax.fromTo(
                    mainmenuTopStar3[idx], //obj
                    0.1, //time
                    {
                        scaleX: 1,
                        scaleY: 1
                    }, { //메달트윈
                        scaleX: 1.5,
                        scaleY: 1.5,
                        //ease:Power1.easeOut,
                        //ease: Elastic.easeOut,
                        ease:Linear.easeNone,
                        yoyo:true,
                        repeat:1,
                        delay: 0,
                        onComplete: function (){

                        },
                        onStart: function(){
                            SESoundPlay(se.InputStar);
                        }
                    }
                );
                
            },//oncompltet
            ease: Linear.easeNone,
            //ease: Power0.easeOut
            //ease: Sine.easeOut
        }
    );
}
////
function tweenAddball(obj, xp, yp){ //연료트윈
    //이동트윈
    
    //var xp2= iCenterSizeX>xp?xp+10:xp-10;
    var xd = tx_remainBall.x;
    //var xd2= iCenterSizeX>xp?xd+10:xd-10;
    var yd= tx_remainBall.y;
    //var xpos =  xp>xd?xd+((xp-xd)*0.25):xd-((xd-xp)*0.25);   
    SpinePlay(obj.spn,null,null, "item_thunder_idle", 0, true);
    var bzPath = [
        {
            x: xp,
            y: yp,
            scaleX: 3,
            scaleY: 3
        }, //, scale:2},
        {
            x: xp+(xd-xp)*0.33, //x: xp2,
            y: yp+(yd-yp)*0.33,//y: yp-50,
            scaleX: 5,
            scaleY: 5

        }, //, scale:1},
        {
            x: xp+(xd-xp)*0.66, //x: xd2,
            y: yp+(yd-yp)*0.66, //y: yp+50,//yd-((yd-yp)*0.75),
            scaleX: 3,
            scaleY: 3

        }, //, scale:2},
        {
            x: xd,
            y: yd,
            scaleX: 0.5,
            scaleY: 0.5

        } //, scale:1}
    ];
    var distTime = distance2D(xp,yp,xd,yd) * 0.0008;//0.00075;
    if(dm) console.log("~ ~ tweenAddball.distTime:"+distTime +" --> 0.3" );
    //if(distTime>0.3) distTime=0.3;

    TweenMax.to(
        obj,
        distTime, //0.001,
        {
            bezier: {
                //type:"cubic",
                type: "soft", //강추
                //autoRotate:true,
                values: bzPath,
            },
            onStart: function(){
                SESoundPlay(se.GetItem);
            },
//            onUpdate:
//                function(){ },
            onComplete: function(){ //tweenAddball종료시
                obj.scaleX=1;
                obj.scaleY=1;                
                SpinePlay(obj.spn, null, null, "empty", 0, true);
//                SpinePlay(itemAddArr[BStiles[nx][ny].idadd].spn, null, null, "empty", 0, true);//플로팅클러스터 알파0시
//                itemAddArr[BStiles[nx][ny].idadd].visible = false;
//                BStiles[nx][ny].idadd=-1;                
                TweenMax.fromTo(
                    tx_remainBall, //obj
                    0.1, //time
                    {
                        scaleX: 1,
                        scaleY: 1
                    }, { //메달트윈
                        scaleX: 1.5,
                        scaleY: 1.5,
                        //ease:Power1.easeOut,
                        //ease: Elastic.easeOut,
                        ease:Linear.easeNone,
                        yoyo:true,
                        repeat:1,
                        delay: 0,
                        onComplete: function (){
                            if(dm) console.log("~ ~ tweenAddball.Oncomplete:");
                        },
                        onStart: function(){
                            SESoundPlay(se.InputItem);
                        }
                    }
                );
                tweenTextBall();  
                
            },//oncompltet
            ease: Linear.easeNone,
            //ease: Power0.easeOut
            //ease: Sine.easeOut
        }
    );
}

function tweenFuel(obj, xp, yp){ //연료트윈
    //이동트윈
    
    var xd = mainFuelIcon.x;
    var yd= mainFuelIcon.y;
    SpinePlay(obj.spn,null,null, "item_thunder_idle", 0, true);
    //var xpos =  xp>xd?xd+((xp-xd)*0.25):xd-((xd-xp)*0.25);   
    var bzPath = [
        {
            x: xp,
            y: yp,
            scaleX: 2,
            scaleY: 2
        }, //, scale:2},
        {
            x: xp+(xd-xp)*0.33, //x: xp,
            y: yp+(yd-yp)*0.33, //y: yp-50,
            scaleX: 3.5,
            scaleY: 3.5

        }, //, scale:1},
        {
            x: xp+(xd-xp)*0.66, //x: xd,
            y: yp+(yd-yp)*0.66, //y: yp+50,//yd-((yd-yp)*0.75),
            scaleX: 2,
            scaleY: 2

        }, //, scale:2},
        {
            x: xd,
            y: yd,
            scaleX: 0.5,
            scaleY: 0.5

        } //, scale:1}
    ];
    var distTime = distance2D(xp,yp,xd,yd) * 0.0008;//0.00075;
    if(dm) console.log("~ ~ tweenFuel.distTime:"+distTime+" --> 0.3" );
    //if(distTime>0.3) distTime=0.3;
    
    TweenMax.to(
        obj,
        distTime, //0.001,
        {
            bezier: {
                //type:"cubic",
                type: "soft", //강추
                //autoRotate:true,
                values: bzPath,
            },
            onStart: function(){
                SESoundPlay(se.GetItem);
            },

//            onUpdate:
//                function(){ },
            onComplete: function(){ //tweenFuel종료시
                obj.scaleX=1;
                obj.scaleY=1;
                SpinePlay(obj.spn, null, null, "empty", 0, true);
                TweenMax.fromTo(
                    mainFuelIcon, //obj
                    0.1, //time
                    {
                        scaleX: 1,
                        scaleY: 1
                    }, { //메달트윈
                        scaleX: 1.5,
                        scaleY: 1.5,
                        //ease:Power1.easeOut,
                        //ease: Elastic.easeOut,
                        ease:Linear.easeNone,
                        yoyo:true,
                        repeat:1,
                        delay: 0,
                        onComplete: function (){

                            if(dm) console.log("~ ~ tweenFuel.Oncomplete:"+0);
                        },
                        onStart: function(){
                            SESoundPlay(se.InputItem);
                        }
                    }
                );
                
            },//oncompltet
            //ease: Linear.easeNone,
            ease: Power0.easeOut
            //ease: Sine.easeOut
        }
    );
}

//충돌트윈변수들
var destdist=20;
var desttime = 0.1;   //전체튕김시간
var curtime=0;
var tweenCTMax=1.5; //전체트윈종료시간
var shotCornerX;    //트윈될 타일의 왼쪽위
var shotCornerY;    //트윈될 타일의 왼쪽위
var tweenstep=0;    //트윈 단계별 구분// 0,충돌시밖으로 1,다시안으로 2,종료
var TwnCol = {begin:0, running:1, end:2, none:3};
var twncol = TwnCol.begin;                                  //-->stateTweenCollision(dt)

//방어막변수들
var ShieldSt = {begin:0, running:1, end:2, none:3};
var shieldst = ShieldSt.begin;                              //-->stateShield(dt)
var bShieldRot = false;
var DirSD={clock:0, rclock:1, none:2};
var dirSD=DirSD.clock;

//----------------충돌트윈----------------------------------------------------------------------------------
function stateTweenCollision(dt){
    switch(twncol) {
        case TwnCol.begin: //1번만 실행
            //초기화전에 예외처리들
            if(player.buster||FoundCore) { //충돌트윈 시작시 버스터상태, 코어발견상태
                twncol = TwnCol.end; //맨뒤로 가라
                break;
            }            
            ////트윈초기화----------------시작
            var shotTile = level.tiles[level.tweenGridx][level.tweenGridy];
            var shotCentX = shotTile.pivotx;
            var shotCentY = shotTile.pivoty;
            shotCornerX = shotTile.initx;      //position.x 절대좌표값
            shotCornerY = shotTile.inity;
            //debug_Obj(BStiles[level.tweenGridx][level.tweenGridy], InfoPos.on, MovePos.on );
            var len = tweencluster1.length;
            for (var i = 0; i < len; i++) {
                var tile = tweencluster1[i];
                tile.tweenangle = getAngle(
                    shotCentX,
                    shotCentY,
                    tile.pivotx,
                    tile.pivoty
                );

                var dtMove = moveToAngle(tile.tweenangle, destdist);
                tile.tweendestx = dtMove[0];
                tile.tweendesty = dtMove[1];

                tweenstep=0;
            }        
            var len = tweencluster2.length;
            for (var i = 0; i < len; i++) {
                var tile = tweencluster2[i];
                tile.tweenangle = getAngle(
                    shotCentX,
                    shotCentY,
                    tile.pivotx,
                    tile.pivoty
                );

                var dtMove = moveToAngle(tile.tweenangle, destdist*0.5);
                tile.tweendestx = dtMove[0];
                tile.tweendesty = dtMove[1];

                tweenstep=0;
            }        
            ////트윈초기화----------------완료
            curtime=0;
            twncol = TwnCol.running;
            break;
        case TwnCol.running: //계속 update
           //----------트윈 실행 중-----------
            curtime+=dt;
            var timeBias = curtime/desttime;

            var len = tweencluster1.length;
            for (var i = 0; i < len; i++) {
                var tile = tweencluster1[i];

                //쓸떼없는 계산을 하는 곳
//                var dtMove = moveToAngle(tile.tweenangle,  timeBias*destdist);
//                var dist = distance2D(
//                    shotCornerX,
//                    shotCornerY,
//                    tile.initx+tile.shiftx,
//                    tile.inity+tile.shifty
//                );            
                //쓸떼없는 계산을 하는 곳
                
                if(tweenstep==0){
                    tile.shiftx = tile.tweendestx * timeBias;      //밖으로 퍼저나간다.
                    tile.shifty = tile.tweendesty * timeBias;
                }else if(tweenstep==1){
                    tile.shiftx = tile.tweendestx * (1-timeBias);  //중앙으로 모인다
                    tile.shifty = tile.tweendesty * (1-timeBias);
                }else{
                    tile.shiftx = 0;
                    tile.shifty = 0;
                }
            }//1차 트윈
            
            var len = tweencluster2.length;
            for (var i = 0; i < len; i++) {
                var tile = tweencluster2[i];

                //쓸떼없는 계산을 하는 곳                
//                var dtMove = moveToAngle(tile.tweenangle, timeBias*destdist);
//                var dist = distance2D(
//                    shotCornerX,
//                    shotCornerY,
//                    tile.initx+tile.shiftx,
//                    tile.inity+tile.shifty
//                );            
                //쓸떼없는 계산을 하는 곳
                
                if(tweenstep==0){
                    tile.shiftx = tile.tweendestx * timeBias;    //밖으로 퍼저나간다.
                    tile.shifty = tile.tweendesty * timeBias;
                }else if(tweenstep==1){
                    tile.shiftx = tile.tweendestx * (1-timeBias);//중앙으로 모인다
                    tile.shifty = tile.tweendesty * (1-timeBias);
                }else{
                    tile.shiftx = 0;
                    tile.shifty = 0;
                }
    //            if(dm) console.log(
    //                "tw2:["+i+"]"
    //                +", tweenstep:"+tweenstep
    //
    //            );            
            }//2차 트윈
            if(tweenstep==0 && timeBias>=1){ //밖으로 다 퍼졋으니 다음단계
                //되돌아오기
                curtime=0;  //다시시작해야해서 시간을 0으로
                tweenstep=1;
            }else if(tweenstep==1 && timeBias>=1){ //안으로 다 모였으니 종료로
                curtime=0; //혹시 몰라 초기화
                tweenstep=2;//트윈종료로 가자
            }else if(tweenstep==2){
                twncol = TwnCol.end;
            }
            //----------트윈 실행 중-----------
            break;
            
        case TwnCol.end:
            if(dm) console.log("~ ~ twncol==TwnCol.end-->tweencollisiongotoready:"+tweencollisiongotoready);
            if(tweencollisiongotoready){        //충돌트윈끝나고 readymode로 가려고 한다.
                setBSstate_(BSstates.ready);    //충돌트윈끝나고 readymode로 가려고 한다.
                tweencollisiongotoready=false;//readymode로 가게 됬으니, 초기화
            }else if(tweencollisiongotofinale){
                setBSstate_(BSstates.finale);
                tweencollisiongotofinale=false;
            }else{
                //버스터모드 //트윈안한 상태고 클러스터,제거 모드로 가려고 한다.
                //버블1개만 배치 상태   
                setBSstate_(BSstates.removecluster); //-->stateRemoveCluster(dt) //if (cluster.length >= 3 || FoundFuel || FoundAddBall) 
            }        
            break;
    
        default:
            break;
    } //switch

}
//----------------충돌트윈----------------------------------------------------------------------------------

function showBall5(){
    //var len = mainmenuBottomBall5.length;
    for (var i=0; i<2; i++) {
//        if(mainmenuBottomBall5[i].visible == false){
//            mainmenuBottomBall5[i].visible = true;
//        }
        mainmenuBottomBall5[i].alpha = 1;
    }
}
function hideBall5(){
    //var len = mainmenuBottomBall5.length;
    for (var i=0; i<2; i++) {
//        if(mainmenuBottomBall5[i].visible == true){
//            mainmenuBottomBall5[i].visible = false;
//        }
        mainmenuBottomBall5[i].alpha = 0.25;
    }
}
var StFinSn=111;
var StFin = {
    begin:     StFinSn,
    running:   StFinSn+1,
    end:       StFinSn+2,
    none:      StFinSn+3,
    continuous:StFinSn+4
};
var stfin = StFin.begin;
var timeFinale = 0;       //피날레 하고 종료하는 시간
var curFinale =0;
var timeFinaleNone = 0.5; //피날레없이 종료하는 시간
var curFinaleNone=0;
var shoot1Time = 0.18;//대충정함   0.1+0.15;      //var senddelaymax = 0.01; //쏘기 바로 전 딜레이
                                //var sendtimemax = 0.15;

var countFinaleOld;

//var oldballcount=-1;
//----------------피날레----------------------------------------------------------------------------------
function stateFinale(dt){
    switch(stfin) {
        case StFin.begin: //피날레초기화
            //--
            if(dm) console.log("------------finale(begin)-------------------");
            hideBall5();
            if(sprNav[0].visible){                                          
                for(var n1=0; n1<navCount; n1++){sprNav[n1].visible=false;} //피날레전 네비 숨기기
            }            
            timeFinale = (player.ballcount*shoot1Time)+0.25;   //피날레 종료시간
            countFinaleOld = player.ballcount;              
            curFinale=0;                                    //피날래 전체 누적시간
            sendactidx = 0;                                 //피날레 총알 숫자 인덱스
            stfin = StFin.running;
            //--
            SpinePlay(
                spnRemain, null, null, 
                AniRemain.run,// current ani
                0, //goto state
                true
            );            
            
            break;
            
        case StFin.running:
            //--
            curFinale+=dt;
            tx_remainBall.text = player.ballcount;
  
            shootFinale1(dt);                               //피날레 남은 총알시간만큼만 반복
             
//            if(dm) console.log("--------------curFinale:" + curFinale
//                        +", timeFinale:" + timeFinale
//                       );
            if(curFinale>timeFinale){
                tx_remainBall.text = 0; //0이 자동으로 되지만 1로 나온적도 잇다고 하니
                stfin = StFin.end;
            }else{
                //if(dm) console.log("~ ~ curFinale:"+curFinale+", "+whatisBSstate_(BSstate_));
            }
            //--
            break;
            
        case StFin.end: //피날레마무리
            //--
            if(dm) console.log("------------finale(end)-------------------");
            hideFinale();
            gameClearSetting();
            setBSstate_(BSstates.ready);  //피날레까지 하고, 여기가 끝이므로 맨앞으로 간다.          
            //--
            SpinePlay(
                spnRemain, null, null, 
                AniRemain.normal,// current ani
                0, //goto state
                true
            );            
            break;
        case StFin.none: //게임오버, 밑줄오버
            //--
            if(dm) console.log("------------finale(none)-------------------");
            hideFinale();
            curFinaleNone+=dt;
            if(curFinaleNone>timeFinaleNone){
                curFinaleNone=0;
                //조건에 맞는 결과 출력
                 //총알공을 가지고 있는 상태//공이 라인에 꽉 찼다
                
                //var resetBuster = false;
                //cancelBusterSpine(resetBuster); //게임오버 //finish_Game(); 맨위쪽은 주석으로 하고 여기로 넣음
                if(player.buster){ //피날레, 공이 라인데 닿아 게임오버
                    player.buster = false; //공이 선에 닿았을때
                    player.busterpre = false;
                    cancelBusterSpine();
                }
                SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);

                SpinePlayerBubble.visible = false;    //날아다니는 공에 붙는 버스터스파인            
                
                gameState = Game.STOP;
                //tx_ok_gameover.text=TX.tx_ok_gameover;
                if(dm) console.log("~ ~ stateFinale.none: 밑줄gameover");
                selectPopUpUISingle(Pop.GameOver); //게임오버창
                SESoundPlay(se.Defeat);
                
                //버스터모드끄기
                player.buster = false;
                player.busterpre = false;                
                cancelBusterSpine(); //하단통과시 버스터모드 중지
                resetBuster(); //0값으로 초기화
                
                //setBSstate_(BSstates.ready);            
            }else{
                if(dm) console.log("~ ~ curFinaleNone:"+curFinaleNone+", "+whatisBSstate_(BSstate_));
            }            
            //--
            break;
        case StFin.continuous: //게임오버, 총알부족
            //--
            if(dm) console.log("------------finale(none)-------------------");
            hideFinale();
            curFinaleNone+=dt;
            
            if(curFinaleNone>timeFinaleNone){
                curFinaleNone=0;
                //조건에 맞는 결과 출력
                SprPlayerBubble.visible = false;
                if (player.retrycount == 0) {
                    //재시작없이 공이 떨어졌다.
                    gameState = Game.STOP;
                    //폰트 갱신 문제로 
                    //tx_title_ADBAll.text=TX.tx_title_ADBAll;
                    //tx_ADBAll.text=TX.tx_ADBAll;
                    //tx_ok_ADBAll.text=TX.tx_ok_ADBAll;
                    //tx_no_ADBAll.text=TX.tx_no_ADBAll;
                    //tx_ball_ADBALL.text=TX.tx_ball_ADBALL;
                    selectPopUpUISingle(Pop.ADBall); //광고선택창
                    sHeartShop.timer.onShow();
                } else {
                    //재시작했는데 공이 떨어졋다.
                    //var resetBuster = false;
                    //cancelBusterSpine(resetBuster); //게임오버 //finish_Game(); 맨위쪽은 주석으로 하고 여기로 넣음
                   // kData.userHeartCount -= 1; //재시작후 버블이 없을때
                    gameState = Game.STOP;
                    //게임오버모드
//                    tx_ok_gameover.text=TX.tx_ok_gameover;
//                    if(dm) console.log("~ ~ StateFinale.continu: bullet 0");
//                    selectPopUpUISingle(Pop.GameOver); //게임오버창
//                    SESoundPlay(se.defeat);
                    //충알충전모드
                    //tx_title_ADBAll.text=TX.tx_title_ADBAll;
                    //tx_ADBAll.text=TX.tx_ADBAll;
                    //tx_ok_ADBAll.text=TX.tx_ok_ADBAll;
                    //tx_no_ADBAll.text=TX.tx_no_ADBAll;
                    //tx_ball_ADBALL.text=TX.tx_ball_ADBALL;
                    selectPopUpUISingle(Pop.ADBall); //광고선택창
                    sHeartShop.timer.onShow();
                }                
                //setBSstate_(BSstates.ready);     
            }else{
                if(dm) console.log("~ ~ curFinaleNone:"+curFinaleNone+", "+whatisBSstate_(BSstate_));
            }            
            //--
            break;            
        default:
            break;
    }

}
//----------------피날레----------------------------------------------------------------------------------

var senddelaymax = 0.1; //쏘기 바로 전 딜레이
var sendtimemax = 0.15;
var sendcurtime = 0;
var sendactidx = 0; //총알 갯수에 비레
var sendidx3;           //3개 안에서 돈다.


var sendactive = [false,false,false,false,false,false,false,false,false,false];
var sendtimesdest =0.2;
//var a=[],i=0;for(;i<100;)a[i++]=0;
var sendtimes = [0,0,0,0,0,0,0,0,0,0];
var senddestx = [0,0,0,0,0,0,0,0,0,0]; //[player.x,player.x,player.x]; 초기화 먼저 되므로..0
var senddesty = [0,0,0,0,0,0,0,0,0,0];
var sendids = [0,0,0,0,0,0,0,0,0,0];
var senddelay = [0,0,0,0,0,0,0,0,0,0];
var sendbiasdest = [0,0,0,0,0,0,0,0,0,0];
var sendboomstep =[0,0,0,0,0,0,0,0,0,0];

function shootFinale1(dt){
    //if(player.ballcount<=0) return; 여기서리턴하면 안됨
    if(sendcurtime==0 && player.ballcount>0) {
        if (dm) console.log(
            "~ ~ shootCurTime:" + sendcurtime
            + ", shootTime:" + sendtimemax
            + ", ballcount:" + player.ballcount
        );
        //var SPINE_INIT_NONE = 0;
        //var SPINE_INIT_SLOTS = 1;
        //var SPINE_INIT_BONES = 2;
        //var SPINE_INIT_ALL = 3;
        //SpinePlay(mainPlayer, null, null, AniShip.fire, 7, false, SPINE_INIT_NONE);
        SpinePlay(mainPlayer, null, null, AniShip.fire, 7, false, SPINE_INIT_ALL);
        SESoundPlay(se.RockShoot); //운석발사음
        sendidx3 = (sendactidx) % BSfinaleCount; //0,1,2,반복 //총알스프라이트 인덱스

        sendactive[sendidx3] = true; //10개짜리배열을 계속 돌면서 활성화한다.

        sendactidx += 1;

        var TexNum = Math.floor(generateRandomNumber(1, 6));//1~~(n-1)까지 랜덤값 리턴 
        BSfinale[sendidx3].texture = SpritePool.getInstance().get(bbArr[TexNum]).texture;
        BSfinale[sendidx3].visible = true;          //텍스쳐 보이기
        BSfinale[sendidx3].x = player.x;            //위치 초기화
        BSfinale[sendidx3].y = player.y;            //위치 초기화

        //senddestx[sendidx3] = player.x;
        var dtMove = moveToAngle(generateRandomNumber(90 - 15, 90 + 15), player.y); //이동거리
        senddestx[sendidx3] = dtMove[0] + player.x;
        senddesty[sendidx3] = dtMove[1] + player.y;

        sendtimes[sendidx3] = 0;                      //시간 초기화
        senddelay[sendidx3] = 0;                      //딜레이 초기화

        sendboomstep[sendidx3] = -1;                     //폭발단계스텝

        sendbiasdest[sendidx3] = generateRandomNumber(0.55, 0.7);   // 터질목적지(맨위)까지의 비율

        player.ballcount -= 1;

        if (player.ballcount >= 0) {
            tx_remainBall.text = player.ballcount;
        }
        else
        { //볼갯수가 -값은 비정상// 여기에 도달 할수 가 없다
            tx_remainBall.text = 0;
        }
        
        if(dm) console.log(
            "~ ~(after) shootCurTime:"+sendcurtime
            +", shootTime:"+sendtimemax
            +", ballcount:"+player.ballcount
            +", sendidx3:"+sendidx3
            +", sendactidx:"+sendactidx
            +", BSfinale[].vis:"+ BSfinale[sendidx3].visible
            +", TexNum:"+ TexNum
        );
    }
    //쏘는 전체 시간 관리
                    //0.15
    if(sendcurtime>sendtimemax) sendcurtime = 0;
    else sendcurtime += dt;

    for (var i=0; i<BSfinaleCount; i++) {
        if(sendactive[i]){
                            //0.1
            if(senddelay<senddelaymax){ //쏘기 바로 전 딜레이
                senddelay+=dt;
            }else{
                                            //0.2
                var bias1 = sendtimes[i]/sendtimesdest;
                var xdist = (senddestx[i] - player.x)*bias1; 
                var ydist = (senddesty[i] - player.y)*bias1;
//                if(i==1){
//                    if(dm) console.log(
//                                "~ ~ xydist:"+xdist
//                                +", senddestx[i]"+senddestx[i]
//                                +", player.x:"+player.x
//                                +", bias1:"+bias1
//                               );
//                }
                BSfinale[sendidx3].x = player.x+xdist;            //위치 초기화
                BSfinale[sendidx3].y = player.y+ydist;            //위치 초기화

                sendtimes[i] += dt;
          
                //if(bias1>=0.9){                                     //목적지 도착 //<--여기까지 오면 안됨
                if(bias1>=sendbiasdest[i]&& BSfinale[sendidx3].visible){ //랜점지정 목적지 도착                                     //목적지 도착 //여기까지 오면 안됨
                        sendactive[i]=false;
                        BSfinale[sendidx3].visible = false;
                        sendboomstep[i]=0;
                        TXfinale[i].x = BSfinale[i].x;
                        TXfinale[i].y = BSfinale[i].y;
                        TXfinale[i].alpha=1;
                        TXfinale[i].visible = true;
                        SpinePlay(FXfinale[i],
                            BSfinale[i].x, BSfinale[i].y,
                            "normal_bubble_bomb",
                            0,
                            false,
                            SPINE_INIT_NONE);
                        SESoundPlay(se.RockBoom);
                        //FXfinale[sendidx3].visible = true;
                }
 
                //
            }//if(senddelay<senddelaymax){
            
        } //if(sendactive[i]){
        if(sendboomstep[i]!=-1){
            switch(sendboomstep[i]) {
                case 0:
                    
                    TXfinale[i].y -= dt * ScoreVelocity;
                    var curdist = BSfinale[i].y - TXfinale[i].y; //현재총이동거리
                    TXfinale[i].alpha = getAlphaByDist(curdist, ScoreDestDist, alphaMultiple); //거리별 알파값을 구한다.
                    if (BSfinale[i].y - ScoreDestDist > TXfinale[i].y) { //최대이동거리 넘으면 초기화
                        sendboomstep[i]=1;
                        TXfinale[i].visible = false;
                        TXfinale[i].y = -100;
                        TXfinale[i].alpha = 1;
                    }
//                    if(i==0){
//                        if(dm) console.log(
//                            "~ ~ sendboomstep:["+i+"]:"+sendboomstep[i]
//                            +", dt:"+dt
//                            +", TXfinale[i].y:"+TXfinale[i].y
//                            +", curdist:"+curdist
//                        );
//                    }
                    break;
                case 1:
                    player.playscore += 2000;//남은총알 버블점수
                    //최종점수로 상단메뉴별3(에너지바포함) 마지막 업데이트
                    guiset_processStarBar();
                    TxScore.text = getMoneyFormatFromNum(player.playscore); //in shootFinale1
                    //setScaleTextWidth(TxScore);
                    sendboomstep[i]=-1;
                    break;
                default:
                    break;
            } //switch(sendboomstep[i])    
        }
    } //for
} //fn  shootFinale1          

function gameClearSetting(){
    
    //레벨클리어게임클리어----------------------------------------
    //var resetBuster = false;
    //cancelBusterSpine(false); //문제가 있어서 수동으로 처리
    //finish_Game();
    if(dm) console.log("~ ~ var resetBuster = false.cancelBusterSpine");
    
    if(player.buster){ //레벨클리어시
        player.buster = false;//총알바닥시
        player.busterpre = false;
        cancelBusterSpine();
    }
    
    SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);
    SpinePlayerBubble.visible = false;//날아다니는 공에 붙는 버스터스파인
    mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[0]); //null       
    
    //점수계산점수환산자료-----------------
    //추가장전해서 쏴서 사용한 구슬(-값이면 남은 총알)
    //var addBB =     usedballcounter -  needscore_levels[kData.curLevel+1].bead;

    //기본장전총알
    //var baseBB =    needscore_levels[kData.curLevel+1].bead; 

    //맵에 배치된 버블 갯수
    //var leveBBCnt = bubble_levels[kData.curLevel+1].balls.length;

    //player.playscore += player.ballcount * 500;//남은버블점수


    //최종점수로 상단메뉴별3(에너지바포함) 마지막 업데이트
    guiset_processStarBar();
    TxScore.text = getMoneyFormatFromNum(player.playscore);
    //setScaleTextWidth(TxScore);
    //점수계산점수환산자료-----------------


    //클리어창뜨기-----------------
    TxScore_Clear.text = getMoneyFormatFromNum(player.playscore);
    //Star3_Clear[0];
    txLvNum_Clear.text = kData.curLevel + 1;
    //                    if(dm) console.log(
    //                        "clear star123:"
    //                        +mainmenuTopStar3OnOff[0]+","
    //                        +mainmenuTopStar3OnOff[1]+","
    //                        +mainmenuTopStar3OnOff[2]+","
    //                    );

    //SpStar3_Condition[0].texture = SpritePool.getInstance().get("img2/popup_star_1.png").texture;
    //SpStar3_Condition[1].texture = SpritePool.getInstance().get("img2/popup_star_2_empty.png").texture;

    
//원본    
//    Star3_Clear[0].texture = mainmenuTopStar3OnOff[0] ? SpritePool.getInstance().get("img2/popup_star_1.png").texture : SpritePool.getInstance().get("img2/popup_star_1_empty.png").texture;
//    Star3_Clear[1].texture = mainmenuTopStar3OnOff[1] ? SpritePool.getInstance().get("img2/popup_star_2.png").texture : SpritePool.getInstance().get("img2/popup_star_2_empty.png").texture;
//    Star3_Clear[2].texture = mainmenuTopStar3OnOff[2] ? SpritePool.getInstance().get("img2/popup_star_3.png").texture : SpritePool.getInstance().get("img2/popup_star_3_empty.png").texture;

//수정본
    if(player.star==1){
        Star3_Clear[0].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_1.png").texture;
        Star3_Clear[1].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_2_empty.png").texture;
        Star3_Clear[2].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_3_empty.png").texture;
    }else if(player.star==2){
        Star3_Clear[0].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_1.png").texture;
        Star3_Clear[1].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_2.png").texture;
        Star3_Clear[2].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_3_empty.png").texture;
    }else if(player.star==3){
        Star3_Clear[0].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_1.png").texture;
        Star3_Clear[1].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_2.png").texture;
        Star3_Clear[2].texture = SpritePool.getInstance().get(strGamePath+"img2/popup_star_3.png").texture;
    }

    //tx_nowname_Clear.text = TX.tx_nowname_Clear;
    //tx_title_Clear.text = TX.tx_title_Clear;
    //tx_replay_Clear.text = TX.tx_replay_Clear;
    //tx_ok_Clear.text = TX.tx_ok_Clear;
    //tx_next_clear.text = TX.tx_next_clear;
    //tx_title_Clear.text = TX.tx_title_Clear;

    selectPopUpUISingle(Pop.Clear);
    SESoundPlay(se.Victory);
    //클리어창뜨기-----------------

    //데이터저장 - 레벨언락,점수 저장-----------
    //별카운트 구하기
//    var starSum = 0;
//    starSum += mainmenuTopStar3OnOff[0] ? 1 : 0;
//    starSum += mainmenuTopStar3OnOff[1] ? 1 : 0;
//    starSum += mainmenuTopStar3OnOff[2] ? 1 : 0;
    if (kData.userStarArray[kData.curLevel] < player.star) kData.userStarArray[kData.curLevel] = player.star;
    kData.userScoreArray[kData.curLevel] = player.playscore;

    //다음레벨 언락
    if (kData.userStarArray[kData.curLevel + 1] == -1) {
        kData.userStarArray[kData.curLevel + 1] = 0;
    }
    SaveDataInClient();
    networkManager.ForcedSaveData();
    //데이터저장 - 레벨언락,점수 저장-----------
}

var busterBeforeAD=false; //예전버스터백업//총알떨어진상태의
var busterAfterAD=false; //광고클릭으로 총알충전했는지
var delaycountStoneCreation=false;//0; //운석생성무한딜레이 끄기

function debug_GridAttr() {
    var s = "";
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            var tile = level.tiles[i][j]; //레벨1속의 공1 가져온다.
            if (tile.type == -1) {
                s += "-, ";
            } else {
                s += (tile.type + ", ");
            }
        }
        s += "\n";
    }
    if(dm) console.log(s);
}
function debug_GridSpineAttr() {
    var s;
    s= "idadd:\n";
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            var tile = level.tiles[i][j]; //레벨1속의 공1 가져온다.
            s+=(tile.idadd==-1?"-":tile.idadd)+", ";
        }
        s += "\n";
    }
    s += "idfuel:\n";
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            var tile = level.tiles[i][j]; //레벨1속의 공1 가져온다.
            s+=(tile.idfuel==-1?"-":tile.idfuel)+", ";
        }
        s += "\n";
    }
    s += "idstar:\n";
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            var tile = level.tiles[i][j]; //레벨1속의 공1 가져온다.
            s+=(tile.idstar==-1?"-":tile.idstar)+", ";
        }
        s += "\n";
    }    
    
    if(dm) console.log(s);
}
function debug_GridRot() {
    var s_angle = "";
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            var tile = level.tiles[i][j]; //레벨1속의 공1 가져온다.
            s_angle += (Math.floor(tile.centerangle * 0.1) + ", ");
        }
        s_angle += "\n";
    }
    if(dm) console.log(s_angle);
}
//월드포지션을 그리드포지션으로 변환, 같은색 3개이상 찾기, 턴5회때 라인추가,
// Snap bubble to the grid
function snapBubble() { //in stateShootBubble(dt)
    if(dm) console.log("--snapBubble()--");
    //debug_GridAttr();
    // Get the grid position
    //player.bubble.x, 
    //player.bubble.y +-----+
    //                |     |
    //                |  +  | centerx, centery
    //                |     |
    //                +-----+
    var centerx = player.bubble.x + level.tilewidth / 2;
    var centery = player.bubble.y + level.tileheight / 2;
    var gridpos = getGridPosition(centerx, centery); //월드좌표->그리드좌표
    // Make sure the grid position is valid
    if (gridpos.x < 0) {
        gridpos.x = 0;
    }

    if (gridpos.x >= level.columns) {
        gridpos.x = level.columns - 1;
    }

    if (gridpos.y < 0) {
        gridpos.y = 0;
    }

    if (gridpos.y >= level.rows) {
        gridpos.y = level.rows - 1;
    }

    //-값일때 스탭6에러가 남, 그래서 보간
    //        if (player.bubble.angle < 0)
    //        {
    //            player.bubble.angle = 360 + player.bubble.angle;
    //        }
    while (player.bubble.angle < 0) {
        player.bubble.angle = 360 + player.bubble.angle;
    }
    if(dm) console.log("~ ~ player.angle:"+player.bubble.angle);
    var angle6 = player.bubble.angle / 60.0;
    
    
    var step6 = Math.floor(angle6); //쏘는쪽이 아닌 맞는쪽 기준으로 볼 것
    if (step6 > 5) step6 = 0;
    //step6은 공이 들어오는 각도의 문
    //          step4 
    //            ↓
    //예308도    +---+
    // step5 ↘ /     \ ↙ step3 예270도
    //        +  (B)  +
    // step0 ↗ \     / ↖ step2 예164도
    // 예35도    +---+
    //            ↑
    //           step1(들어오는 공방향)     

     //쏜 공의 그리드가 빈칸이면(true), 아니면 계속 밑줄 검사(지금은->6방향으로 검사)
    // Check if the tile is empty
    if(dm) console.log("----------stepAngle:" + step6 + ", angle:" + player.bubble.angle); //스탭앵글 -값 이상함
    var addtile = false;
    var xoff = 0;

    if (step6 == 1) // step1 ↑
    { //↓방향으로 빈곳찾기 //위->아래 검색해서 빈 곳 찾기 //원본 
        var isRight = level.tiles[gridpos.x][gridpos.y].pivotx - centerx; //-값이면 왼쪽에 박힘
        if (level.tiles[gridpos.x][gridpos.y].type != -1) { //스냅된 칸이 채워져 있는 칸이면
            if(dm) console.log("----------Found Filled Grid(step1):" + gridpos.x + "," + gridpos.y + ", searching Blandk Grid");
//            //원본소스
//            // Tile is not empty, shift the new tile downwards
//            if (level.tiles[gridpos.x][gridpos.y].type != -1) {              //스냅된 칸이 채워져 있는 칸이면
//                // Tile is not empty, shift the new tile downwards
//                for (var newrow=gridpos.y+1; newrow<level.rows; newrow++) { //밑줄로 이동 하면서
//                    if (level.tiles[gridpos.x][newrow].type == -1)          //비워져 있으면 저장
//                    {
//                        gridpos.y = newrow;
//                        addtile = true;                                     //빈칸찾음!!
//                        break;
//                    }
//                }
//            } else {
//                addtile = true;                                             //빈칸찾음!!
//            }
//            //원본소스
            for (var newrow = gridpos.y + 1; newrow < level.rows; newrow++) { //밑줄로 이동 하면서
                var tilerow = newrow % 2; //1이면 +0.5칸이동 행이다.

                if (isRight < 0) { //착지장소그리드가 플레이어공의 왼쪽이냐 //-값이면 왼쪽에 박힘
                    if (tilerow == 1) xoff = 0; //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사
                    else xoff = 1; //홀수행 이면
                } else {
                    if (tilerow == 1) xoff = -1; //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사
                    else xoff = 0; //홀수행 이면
                }
                if (level.tiles[gridpos.x + xoff][newrow].type == -1) //비워져 있으면 저장
                {
                    if(dm) console.log(
                        "~ ~ ~ ~ ~ 어라이블(step1):" + gridpos.x + "," + gridpos.y + ", 1GridDown:" + gridpos.x + xoff + "," + newrow + ", tilerow:" + tilerow + ", isRight:" + isRight
                    );
                    gridpos.x = gridpos.x + xoff;
                    gridpos.y = newrow;
                    addtile = true; //빈칸찾음!!
                    break;
                }
                //

            }
        } else {
            addtile = true; //빈칸찾음!!
        }
    } else if (step6 == 0) { //step0 ↗//예외처리
        if (level.tiles[gridpos.x][gridpos.y].type != -1) { //스냅된 칸이 채워져 있는 칸이면
//          //낮은 각으로 오는 버블 한번 처리
            if(player.bubble.angle<45
               && level.tiles[gridpos.x-1][gridpos.y].type == -1){
                gridpos.x = gridpos.x-1;
                gridpos.y = gridpos.y;
                addtile = true; //빈칸찾음!!
                if(dm) console.log("'~ ~ ~ ~ ~ (step4)-aa-xy:" + gridpos.x + "," + gridpos.y);
            }
//            
            //착지지점처리--//tilerow 0이면 +0줄, 1이면 짝수행(+0.5줄)
            xoff = 0;
            for (var newrow = gridpos.y + 1; newrow < level.rows; newrow++) { //밑줄로 이동 하면서
                var tilerow = (newrow + rowoffset) % 2; //1이면 +0.5칸이동 행이다.
                if (tilerow == 1) { //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사
                    xoff += 1;
                    if (level.tiles[gridpos.x - xoff][newrow].type == -1 && !addtile) {
                        if(dm) console.log("'~ ~ ~ ~ ~ (step0)-a-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        gridpos.x -= xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!

                    }
                    break;
                } else {
                    // //+0.0칸 행이면, 먼저 같은 행 oldxoff칸을 조사    
                    if (level.tiles[gridpos.x - xoff][newrow].type == -1 && !addtile) //비워져 있으면 저장
                    {
                        if(dm) console.log("~ ~ ~ ~ ~ (step0)-b-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        gridpos.y -= xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!

                        break;
                    }
                }
            }
            //착지지점처리--
        } else {
            addtile = true; //빈칸찾음!!
        }
    } else if (step6 == 2) { //↖ step2 //예외처리
        if (level.tiles[gridpos.x][gridpos.y].type != -1) { //스냅된 칸이 채워져 있는 칸이면
//          //낮은 각으로 오는 버블 한번 처리
            if(player.bubble.angle>135
               && level.tiles[gridpos.x+1][gridpos.y].type == -1){
                gridpos.x = gridpos.x+1;
                gridpos.y = gridpos.y;
                addtile = true; //빈칸찾음!!
                if(dm) console.log("~ ~ ~ ~ ~ (step4)-aa-xy:" + gridpos.x + "," + gridpos.y);
            }            
            //착지지점처리--//tilerow 0이면 +0줄, 1이면 짝수행(+0.5줄)
            xoff = 0;
            for (var newrow = gridpos.y + 1; newrow < level.rows; newrow++) { //밑줄로 이동 하면서
                var tilerow = (newrow + rowoffset) % 2; //1이면 +0.5칸이동 행이다.
                if (tilerow == 1) { // //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사

                    if (level.tiles[gridpos.x + xoff][newrow].type == -1 && !addtile) {
                        if(dm) console.log("~ ~ ~ ~ ~ (step2)-a-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        //'~ ~ ~ ~ ~ 2-a-xy:13,18 ,tilerow:1, Searched: 13, 19 
                        //'~ ~ ~ ~ ~ 2-a-xy:10,16, tilerow:1, Searched:10, 17 
                        gridpos.x += xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!
                    }
                    break;
                } else {
                    xoff += 1;
                    // //+0.0칸 행이면, 먼저 같은 행 oldxoff칸을 조사    
                    if (level.tiles[gridpos.x + xoff][newrow].type == -1 && !addtile) //비워져 있으면 저장
                    {
                        if(dm) console.log("~ ~ ~ ~ ~ (step2)-b-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        gridpos.x += xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!

                        break;
                    }
                }
            }
            //착지지점처리--
        } else {
            addtile = true; //빈칸찾음!!
        }

    } else if (
        step6 == 4  // ↓
        //        || step6 == 3 // ↙ step3
        //        || step6 == 5 //step5 ↘
    ) { //↑아래 ->위 검색해서 빈 곳 찾기 
        var isRight = level.tiles[gridpos.x][gridpos.y].pivotx - centerx; //-값이면 왼쪽에 박힘
        if (level.tiles[gridpos.x][gridpos.y].type != -1) { //스냅된 칸이 채워져 있는 칸이면
            if(dm) console.log("----------Found Filled Grid(step4):" + gridpos.x + "," + gridpos.y + ", searching Blandk Grid");
            // Tile is not empty, shift the new tile downwards
            for (var newrow = gridpos.y - 1; newrow>=0; newrow--) { //밑줄로 이동 하면서
                var tilerow = newrow % 2; //1이면 +0.5칸이동 행이다.

                if (isRight < 0) { //착지장소그리드가 플레이어공의 왼쪽이냐 //-값이면 왼쪽에 박힘
                    if (tilerow == 1) xoff = 0; //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사
                    else xoff = 1; //홀수행 이면
                } else {
                    if (tilerow == 1) xoff = -1; //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사
                    else xoff = 0; //홀수행 이면
                }
                if (level.tiles[gridpos.x + xoff][newrow].type == -1) //비워져 있으면 저장
                {
                    if(dm) console.log("~ ~ ~ ~ ~ 어라이블(step4):" + gridpos.x + "," + gridpos.y + ", 1GridDown:" + gridpos.x + xoff + "," + newrow + ", tilerow:" + tilerow + ", isRight:" + isRight);
                    gridpos.x = gridpos.x + xoff;
                    gridpos.y = newrow;
                    addtile = true; //빈칸찾음!!
                    break;
                }
                //

            }
        } else {
            addtile = true; //빈칸찾음!!
        }        
    } else if (step6 == 5) { //step5 ↘ //예외처리
        if (level.tiles[gridpos.x][gridpos.y].type != -1) { //스냅된 칸이 채워져 있는 칸이면
            if(dm) console.log("----------Found Filled Grid(step5), searching Blandk Grid");
            //착지지점처리--//tilerow 0이면 +0줄, 1이면 짝수행(+0.5줄)
            xoff = 0;
            for (var newrow = gridpos.y - 1; newrow>=0; newrow--) { //밑줄로 이동 하면서
                var tilerow = (newrow + rowoffset) % 2; //1이면 +0.5칸이동 행이다.
                if (tilerow == 1) { //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사
                    xoff += 1;
                    if (level.tiles[gridpos.x - xoff][newrow].type == -1) {
                        if(dm) console.log("'~ ~ ~ ~ ~ (step5)-a-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        gridpos.x -= xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!

                    }
                    break;
                } else {
                    // //+0.0칸 행이면, 먼저 같은 행 oldxoff칸을 조사    
                    if (level.tiles[gridpos.x - xoff][newrow].type == -1) //비워져 있으면 저장
                    {
                        if(dm) console.log("~ ~ ~ ~ ~ (step5)-b-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        gridpos.y -= xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!

                        break;
                    }
                }
            }
            //착지지점처리--            
        } else {
            addtile = true; //빈칸찾음!!
        }
    } else if (step6 == 3) { // ↙ step3  //예외처리
        if (level.tiles[gridpos.x][gridpos.y].type != -1) { //스냅된 칸이 채워져 있는 칸이면
            if(dm) console.log("----------Found Filled Grid(step3), searching Blandk Grid");
            //착지지점처리--//tilerow 0이면 +0줄, 1이면 짝수행(+0.5줄)
            xoff = 0;
            for (var newrow = gridpos.y - 1;newrow>=0; newrow--) { //밑줄로 이동 하면서
                var tilerow = (newrow + rowoffset) % 2; //1이면 +0.5칸이동 행이다.
                if (tilerow == 1) { // //+0.5칸 행이면, 먼저 같은 행 x-1칸을 조사

                    if (level.tiles[gridpos.x + xoff][newrow].type == -1 && !addtile) {
                        if(dm) console.log("'~ ~ ~ ~ ~ (step3)-a-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        //'~ ~ ~ ~ ~ 2-a-xy:13,18 ,tilerow:1, Searched: 13, 19 
                        //'~ ~ ~ ~ ~ 2-a-xy:10,16, tilerow:1, Searched:10, 17 
                        gridpos.x += xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!
                    }
                    break;
                } else {
                    xoff += 1;
                    // //+0.0칸 행이면, 먼저 같은 행 oldxoff칸을 조사    
                    if (level.tiles[gridpos.x + xoff][newrow].type == -1 && !addtile) //비워져 있으면 저장
                    {
                        if(dm) console.log("~ ~ ~ ~ ~ (step3)-b-xy:" + gridpos.x + "," + gridpos.y + ", tilerow:" + tilerow + ", Searched:" + (gridpos.x + xoff) + ", " + newrow);
                        gridpos.x += xoff;
                        gridpos.y = newrow;
                        addtile = true; //빈칸찾음!!

                        break;
                    }
                }
            }
            //착지지점처리--            
        } else {
            addtile = true; //빈칸찾음!!
        }
    }


    // Add the tile to the grid
    if (addtile) {
        // Hide the player bubble
        player.bubble.visible = false; //플레이어공은 사라지고
        SprPlayerBubble.visible = false;

        // Set the tile
        var ballAtt = player.bubble.tiletype;
        if (player.buster) ballAtt = -1; //bbDic.empty; //그리드에 속성 입력 //.push

        level.tiles[gridpos.x][gridpos.y].type = ballAtt; //그리드에 속성 입력
        
        warningDeadline();

        //트윈쪽에서 중심알려고 가져가는중
        level.tweenGridx = gridpos.x;
        level.tweenGridy = gridpos.y;
            

        //if(dm) console.log(debug_GridAttr());
        //추가 - 스냅된 후 초기화
        var tile = level.tiles[gridpos.x][gridpos.y];
        //level.tiles[gridpos.x][gridpos.y].shift = 0;
        tile.shiftx = 0;
        tile.shifty = 0;
        tile.alpha = 1;
        tile.velocity = player.bubble.dropspeed;
        //추가 - 스냅된 후 초기화

        //배경맵에 픽시버블추가--텍스쳐만 리프레쉬
        //일반적인 경우 그리드속성이 바뀌어서, 텍스쳐On으로 한다.
        if(player.buster
         &&ballAtt == -1){ //버스터모드일경우만 -1이므로 예외처리
            if(dm) console.log("~ ~ buster bubble found:"+gridpos.x+", "+ gridpos.y);
            player.bustergridx=gridpos.x;
            player.bustergridy=gridpos.y;
            BStiles[gridpos.x][gridpos.y].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture;
        }else{
            BStiles[gridpos.x][gridpos.y].texture = SpritePool.getInstance().get(bbArr[ballAtt]).texture;
        }
        BStiles[gridpos.x][gridpos.y].visible = true;
        //위치리프레쉬
        //var coord = getTileCoordinate(gridpos.x, gridpos.y);   
        //BStiles[gridpos.x][gridpos.y].x = coord.x;
        //BStiles[gridpos.x][gridpos.y].y = coord.y;
        //픽시공추가--

        //            // Check for game over
        //            if (checkGameOver()) {
        //                return;
        //            }

        //버블1 착지 추가후 배치된 버블과 속성관련 예외처리-------------------------------
        var tilerow = (gridpos.y + rowoffset) % 2; // Even or odd row
        var n = neighborsoffsets[tilerow]; // Get the neighbor offsets for the specified tile
        //--코어위치의 버블색 바꾸기--B----------------------------------
        FoundCore = false; //코어위치의 버블색 바꾸기
        FoundFuel = false; //연료
        FoundAddBall = false; //추가탄환
        FoundStar = false;
        FoundStone = false;
        Balls_Fuel = [];
        Balls_Add = [];
        Balls_Star = [];
        Balls_Stone=[];
        isShieldRound=false;
        
        for (var i = 0; i < n.length; i++) {
            var nx = gridpos.x + n[i][0]; // Neighbor coordinate
            var ny = gridpos.y + n[i][1];
            var neibtile = level.tiles[nx][ny];
            if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) // Make sure the tile is valid
            {
                //코어볼에 붙었는지 검사(조치는 나중에)
                var len = attArrSD[typeSD][degIdxSD].length; //방어막 갯수/회전별 배열리스트
                for (var ar=0; ar<len; ar++) {
                    var offsetidx = attArrSD[typeSD][degIdxSD][ar]; //갯수와 회전에 맞는 배열의그리드과 이웃그리드위치비교
                    var gx = offsetArrSD[offsetidx][0]+level.midGridx;
                    var gy = offsetArrSD[offsetidx][1]+level.midGridy;
                    if(gridpos.x==gx && gridpos.y==gy){
                        FoundCore = true; //코어충돌(새 방어막 시스템)
                        if(dm) console.log("----FoundCore: " + level.tiles[nx][ny].type);
                        //사운드나중에하려고우선끔
                        //SESoundPlay(se.ShieldHit);
                    }
                }
                len = attArrSD[0][3].length; //방어막근처인지(+2,-2범위인지)
                for (var ar=0; ar<len; ar++) {
                    var offsetidx = attArrSD[0][3][ar]; //갯수와 회전에 맞는 배열의그리드과 이웃그리드위치비교
                    var gx = offsetArrSD[offsetidx][0]+level.midGridx;
                    var gy = offsetArrSD[offsetidx][1]+level.midGridy;
                    if(gridpos.x==gx && gridpos.y==gy){
                        isShieldRound = true; //코어충돌(새 방어막 시스템)
                    }
                }
                
                
//                if (level.tiles[nx][ny].type == bbDic.core){//CoreIndex) { //예전 코어볼 인식
//                    FoundCore = true; //코어충돌(예전 큰운석 시스템)
//                    if(dm) console.log("----FoundCore: " + level.tiles[nx][ny].type);
//                }
                if (neibtile.type == bbDic.stone2) { //암석2에 붙엇을때 //snapbubble(). addtile
                    FoundStone = true;
                    Balls_Stone.push({x:nx,y:ny}); //암석2 추가
                    //사운드나중에하려고우선끔
                    SESoundPlay(se.StoneBoom);
                }
                
                if (neibtile.type == bbDic.stone1) { //암석1에 붙엇을때 //snapbubble(). addtile
                    BStiles[nx][ny].texture = SpritePool.getInstance().get(bbArr[bbDic.stone2]).texture;
                    BStiles[nx][ny].visible = true;
                    neibtile.type = bbDic.stone2;
                    //사운드나중에하려고우선끔
                    SESoundPlay(se.StoneBroken);
                }
                
                if (neibtile.type == bbDic.fuel) { //연료볼에 붙었는지 검사(연료볼배열에 추가) //snapbubble(). addtile
                    FoundFuel = true;
                    Balls_Fuel.push({x:nx,y:ny}); //연료볼추가
                    deltaBuster += 0.5;  //추가연료 획득
                    guiset_addFuelBar(); //이웃에 연료버블이 있으면
                    if(dm) console.log("----snapBubble.addtile.FoundFuel: " + level.tiles[nx][ny].type);
                    
                    //SpinePlay(itemFuelArr[BStiles[nx][ny].idfuel].spn, null, null, "empty", 0, false);//연료획득
                    tweenFuel(itemFuelArr[neibtile.idfuel],//맨처음 도착해서 연료볼에 붙어 트윈
                            itemFuelArr[neibtile.idfuel].x,
                            itemFuelArr[neibtile.idfuel].y
                    );
                    neibtile.idfuel=-1;
                }
                
                //총알추가볼에 붙었는지 검사(총알추가볼배열에 추가)
                if (neibtile.type == bbDic.addball) {
                    FoundAddBall = true;
                    Balls_Add.push({x:nx,y:ny}); //추가볼추가
                    //발사체충전3개
                    player.ballcount += 3;
                    //tx_remainBall.text = player.ballcount; //add
                    SpinePlay(
                        spnRemain, null, null, 
                        AniRemain.run,// current ani
                        NextAniRemain.normal, //goto state
                        false
                    );                    
                    if(dm) console.log("----snapBubble.addtile.FoundAddBall: " + level.tiles[nx][ny].type);
                    
                    //SpinePlay(itemAddArr[BStiles[nx][ny].idadd].spn, null, null, "empty", 0, false);//볼획득                    
                    tweenAddball(itemAddArr[neibtile.idadd],//맨처음 도착해서 추가볼에 붙어 트윈
                            itemAddArr[neibtile.idadd].x,
                            itemAddArr[neibtile.idadd].y
                    );
                    neibtile.idadd=-1;
                }
                
                //별이 붙었는지 검사
                if (neibtile.type == bbDic.star) { //snapbubble().addtile
                    FoundStar = true;
                    player.star+=1; //별에 붙엇을때
                    Balls_Star.push({x: nx,y:ny}); //추가볼추가
                    //발사체충전3개
                    if(dm) console.log("----snapBubble.addtile.FoundStar: " + level.tiles[nx][ny].type
                                +", neibtile.idstar:" +neibtile.idstar
                               );
                    if(dm) console.log("~ ~ tweenstar b:"+player.star );
                    //SpinePlay(itemAddArr[BStiles[nx][ny].idadd].spn, null, null, "empty", 0, false);//볼획득                    
                    tweenStar(itemStarArr[neibtile.idstar],  //맨처음 도착해서 별에 붙어서 트윈
                            itemStarArr[neibtile.idstar].x,
                            itemStarArr[neibtile.idstar].y
                    );
                    neibtile.idstar=-1;
                }

            }
        }

        if (FoundCore) {//레벨클리어조건은 코어가 클러스터 내에서 찾아질때 //snapBubble().addtile
            //--코어위치의 버블색 바꾸기--B----------------------------------
            setColorCenterBall(ballAtt); //내버블의 색으로 칠한다.
            //내버블은 사라지게 한다.
            //BStiles[gridpos.x][gridpos.y].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture;
            //debug_GridAttr();
            //코어터치시 별습득
            player.star+=1;//코어터치시 예외처리 
            if(dm) console.log("~ ~ level.midxCenter:"+level.midxCenter
                        +", level.midyCenter:"+level.midyCenter);
            itemStarArr[2].x = level.midxCenter;
            itemStarArr[2].y = level.midyCenter;
            SpinePlay(itemStarArr[2].spn,null, null, "item_star_idle2", 0, true);
            if(dm) console.log("~ ~ tweenstar c:"+player.star );
            //별 마지막1개
            tweenStar(itemStarArr[2],//코어
                        level.midxCenter,
                        level.midyCenter
            );
                      
        }
        //버블추가후 배치된 버블과 예외처리 1차--끝-----------------------------

        if(player.buster){
            cluster = [];
            pointBaseCount = 0;
        }else{
            // Find clusters                            matchtype, reset, skipremoved
            cluster = findCluster(gridpos.x, gridpos.y, true, true, false); //쏜공과 연결된 같은색 리스트
            pointBaseCount = cluster.length; //같은색 점수를 취합하려고, 텍스트트윈 갯수로 이용
            if(pointBaseCount<3){ //같은색 갯수가 2~0개면 초기화
                cluster=[];
                pointBaseCount=0;
            }
            
        }
        
        //버블1 추가후 배치된 버블과 예외처리 2차-------------------------------
        //클러스터에 아이템버블 추가
        if (FoundFuel) {
            for (var b = 0; b < Balls_Fuel.length; b++) {
                cluster.push(level.tiles[Balls_Fuel[b].x][Balls_Fuel[b].y]);
            }
        }
        
        if (FoundAddBall) {
            for (var b = 0; b < Balls_Add.length; b++) {
                cluster.push(level.tiles[Balls_Add[b].x][Balls_Add[b].y]);
            }
        }
        
        if (FoundStar) {
            for (var b = 0; b < Balls_Star.length; b++) {
                cluster.push(level.tiles[Balls_Star[b].x][Balls_Star[b].y]);
            }
        }        
        if (FoundStone) {
            for (var b = 0; b < Balls_Stone.length; b++) {
                cluster.push(level.tiles[Balls_Stone[b].x][Balls_Stone[b].y]);
            }
        }        
        
        if(player.buster){ //버스터시 버블충돌 배열 처리---------------------------
            //cluster = []; //버스터인경우 같은색 버블들 초기화
            //주변6 포함
            
            for (var i = 0; i < n.length; i++){
                var nx = gridpos.x + n[i][0]; // Neighbor coordinate
                var ny = gridpos.y + n[i][1];
                if (nx >= 0
                    && nx < level.columns
                    && ny >= 0
                    && ny < level.rows){ // Make sure the tile is valid
                
                    if (level.tiles[nx][ny].type != -1 && level.tiles[nx][ny].type != bbDic.core){
                        cluster.push(level.tiles[nx][ny]);
                        //추가총알이면 총알추가
                        if(level.tiles[nx][ny].type == bbDic.addball){
                            player.ballcount += 3;
                            //tx_remainBall.text = player.ballcount; //add
                            tweenTextBall();  
                            SpinePlay(
                                spnRemain, null, null, 
                                AniRemain.run,// current ani
                                NextAniRemain.normal, //goto state
                                false
                            );                            
                        }else if(level.tiles[nx][ny].type == bbDic.fuel) { //snapbubble(). addtile. buster. 이웃1차
                            deltaBuster += 0.5;//추가연료 획득
                            guiset_addFuelBar(); //이웃에 연료버블이 있으면
                        }else if(level.tiles[nx][ny].type == bbDic.star //addtile //buster
                                 && !FoundStar) {//근접접촉시 중복되어 idstar==-1에러가 나온다
                            player.star+=1; //buster시
                            if(dm) console.log("~ ~ buster시 player.star:"+player.star);
                            if(dm) console.log("~ ~ buster시 nx,ny:"+nx+","+ny);
                            if(dm) console.log("~ ~ buster시 level.tiles[nx][ny].idstar:"+level.tiles[nx][ny].idstar);
                            if(dm) console.log("~ ~ buster시 level.tiles[nx][ny].idstar.x:"+itemStarArr[level.tiles[nx][ny].idstar].x);
                            if(dm) console.log("~ ~ tweenstar d:"+player.star );
                            tweenStar(itemStarArr[level.tiles[nx][ny].idstar],//클러스트안에서 바로제거시
                                    itemStarArr[level.tiles[nx][ny].idstar].x,
                                    itemStarArr[level.tiles[nx][ny].idstar].y
                            );
                            level.tiles[nx][ny].idstar = -1;
                        }
                    }
                }
            }
            
            //주변12 포함
            var nBuster = neighborsbusteroffsets[tilerow];
            for (var i = 0; i < nBuster.length; i++) {
                var nx = gridpos.x + nBuster[i][0]; // Neighbor coordinate
                var ny = gridpos.y + nBuster[i][1];
                if (nx >= 0
                    && nx < level.columns 
                    && ny >= 0 
                    && ny < level.rows){ // Make sure the tile is valid
                
                    if (level.tiles[nx][ny].type != -1){
                        cluster.push(level.tiles[nx][ny]);
                        //추가총알이면 총알추가
                        if(level.tiles[nx][ny].type == bbDic.addball){
                            player.ballcount += 3;
                            //tx_remainBall.text = player.ballcount; //add
                            tweenTextBall();  
                            SpinePlay(
                                spnRemain, null, null, 
                                AniRemain.run,// current ani
                                NextAniRemain.normal, //goto state
                                false
                            );                            
                        //추가연료면 연료추가    
                        }else if(level.tiles[nx][ny].type == bbDic.fuel) { //snapbubble() .addtile. buster. 이웃2차
                            deltaBuster += 0.5; //추가연료 획득
                            guiset_addFuelBar(); //이웃에 연료버블이 있으면
                        }                       
                    }
                }
            }
            if(dm) console.log("~ ~ a1b:"+cluster.length);
        }
        
        //충돌트윈처리준비과정------------------------------------
        if(cluster.length<3
           && !FoundFuel 
           && !FoundAddBall
           && !FoundStar
           && !FoundStone
           && !FoundCore
           && !player.buster
        ){
            tweencluster1 = []; //충돌트윈용
            tweencluster2 = []; //충돌트윈용

            //주변6 포함
            for (var i = 0; i < n.length; i++) {
                var nx = gridpos.x + n[i][0]; // Neighbor coordinate
                var ny = gridpos.y + n[i][1];
                if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) // Make sure the tile is valid
                {
                    if (level.tiles[nx][ny].type != -1)
                        tweencluster1.push(level.tiles[nx][ny]);
                }
            }
            if(dm) console.log("~ ~ a1a: tweencollision array1 create");
            //주변12 포함
            var nBuster = neighborsbusteroffsets[tilerow];
            for (var i = 0; i < nBuster.length; i++) {
                var nx = gridpos.x + nBuster[i][0]; // Neighbor coordinate
                var ny = gridpos.y + nBuster[i][1];
                if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) // Make sure the tile is valid
                {
                    if (level.tiles[nx][ny].type != -1)
                        tweencluster2.push(level.tiles[nx][ny]);
                }
            }
            if(dm) console.log("~ ~ a1a: tweencollision array2 create");
        }
        //충돌트윈처리준비------------------------------------
        
        //다음클러스터를 처리하기위한 준비
        if (cluster.length>=3
            ||FoundFuel
            ||FoundAddBall
            ||FoundStar
            ||FoundCore
            ||FoundStone
            ||player.buster
           ){
            //setBSstate_(BSstates.tweencollision); //->stateTweenCollision()
            //tweencollisiongotoready=false; //트윈끝나고 readymode로, 안가려고한다.
            setBSstate_(BSstates.removecluster);
            if(dm) console.log("~ ~ a1: goto removecluster");
            return;
        }

        //버블1 추가후 배치된 버블과 예외처리 2차--끝-------------------------------
        
    } //if (addtile)
    
    // No clusters found 
    //여기는 배치만 됨 트윈되어야함
    combocount = 0;
    turnsnapcounter++; //턴 증가 //1개이상이면 운석생성 가능
    //        //맨위 라인 추가,행추가,버블추가 //지금 사용안하므로 
    //        if (turnsnapcounter >= 5) {
    //            // Add a row of bubbles
    //            addBubbles();
    //            turnsnapcounter = 0;
    //            rowoffset = (rowoffset + 1) % 2;
    //            
    //            if (checkGameOver()) {
    //                return;
    //            }
    //        }

    //      // Check for game over
    if( isShieldRound && !FoundCore){
        SESoundPlay(se.ShieldHit); //방어막영역(+2,-2)
    }
    else{
        SESoundPlay(se.RockHit); //여기는 일반적으로 아무일없이 도착했을때 소리
    }
    //밑으로이동
  
    if (checkGameOver()) { //밑줄에 닿는지
        stfin = StFin.none;
        setBSstate_(BSstates.finale);
        return;
    }
    if (checkGameoverBulletZero()) { //총알버블이 없으면
        stfin = StFin.continuous;
        //setBSstate_(BSstates.finale);
        
        
        if(player.buster){ //총알이 없는 경우 아주아주 가끔 총알이 있는 상태로 나오는경우가 있어서 초기화
            if(player.bustertime==1) busterBeforeAD=true; //백업
            
            player.buster = false;//총알바닥시
            player.busterpre = false;
            cancelBusterSpine();
        }
        
        //총알이 없는 우주선 상태로 만든다.
        SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_SLOTS);
        SpinePlayerBubble.visible = false;//날아다니는 공에 붙는 버스터스파인
        mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[0]); //null        
        
        tweencollisiongotofinale=true; //트윈끝나고 readymode로, 가려고 한다.//반대의경우는 false로, twncol = TwnCol.end;
        twncol = TwnCol.begin;        //트윈1회 초기화 실행하려고 한다.
        setBSstate_(BSstates.tweencollision);
        return;
    }else{
        busterBeforeAD=false;  //총알0시 버스터모드백업용도
    } 
    if(player.ballcount!=0) nextBubble();
    if(dm) console.log("~ ~ snapbubble().cancelBusterSpine");
    if(player.buster) {
        cancelBusterSpine(); //맵에 버블이 고정되는 경우 버스터모드 중지
        player.buster = false;
        player.busterpre = false;    
    }
    
    tweencollisiongotoready=true; //트윈끝나고 readymode로, 가려고 한다.
                                  //반대의경우는 false로, twncol = TwnCol.end;
    twncol = TwnCol.begin;        //트윈1회 초기화 실행하려고 한다.
    setBSstate_(BSstates.tweencollision);
    if(dm) console.log("~ ~ a2: goto tweencollision");
    //->stateTweenCollision(dt)로 여기는 그냥 밖으로 나가므로 트윈안함
    //setBSstate_(BSstates.tweencollision);
}

function checkGameOver(){ //그리드y축 맨마지막줄만 체크해서 버블이 있으면 종료
    if(dm) console.log("--checkGameOver()--");
    // Check for game over
    for (var i = 0; i < level.columns; i++) {
        // Check if there are bubbles in the bottom row
        if (level.tiles[i][level.rows - 1].type != -1) { 
            // Game over
            if(player.ballcount!=0) nextBubble(); //checkGameOver
            
            //setBSstate_(BSstates.gameover);
            return true;
        }
    }
    return false;
}
function warningDeadline(){
    if(dm) console.log("warningDeadline");
    var isExist=false;
    for (var i = 0; i < level.columns; i++) {
        // Check if there are bubbles in the bottom row
        if (level.tiles[i][level.rows - 2].type != -1) { 
            isExist = true;
        }
    }    
    if(isExist){
            SpinePlay(deadLine,
                null,
                null,
                laser.begin,
                2, false
            );
            deadLine.active=true;
            if(DangerMode==Dmode.idle){
                DangerMode=Dmode.begin;
            }

    }
    else{
        if(deadLine.active){
            SpinePlay(deadLine,
                null,
                null,
                laser.end,
                0, false
            );
            deadLine.active=false;
            //SEDangerReset();
            DangerMode = Dmode.end;

        }
        else{
            
        }
//        deadLine.skeleton.setAttachment("line_4", null);
        
    }
}

function checkGameoverBulletZero() {
    if(dm) console.log("--checkBulletCount()--" + player.ballcount + ", " + player.retrycount);
    if (player.ballcount < 1) {
        // Game over
        //nextBubble(); //checkGameoverBulletZero
        SprPlayerBubble.visible = false;
        
         //setBSstate_(BSstates.gameover);
        return true;
    }
    return false;
}
//라인추가,행추가,버블추가
function addBubbles() {
    if(dm) console.log("--addBubbles()--");
    // Move the rows downwards
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows - 1; j++) {
            //            [맨밑줄-j] <= [맨밑줄-j-1] 색 복사
            level.tiles[i][level.rows - 1 - j].type = level.tiles[i][level.rows - 1 - j - 1].type;
        }
    }

    // Add a new row of bubbles at the top
    for (var i = 0; i < level.columns; i++) {
        // Add random, existing, colors
        // 맨윗줄 1라인 전체 렌덤 할당
        level.tiles[i][0].type = getExistingColor(); //기존 레벨에 있는 색중에서 랜덤 고르기
    }
}

function isSpecialBubble(idx) {
    var result = false;
    if (
        idx == bbDic.rand //랜덤버블
        || idx > bbDic.violet //색상을 벗어난 버블
        || idx == -1 //빈버블
    ) result = true;
    return result;
}
// Find the remaining colors
function findColors() {
    if(dm) console.log("--findColors()--");
    var foundcolors = [];
    var colortable = []; //색발견 체크용
    //0번은 칼라는 없지만, 생성해야 편해서 크기는 +1
    
    for (var i = 0; i < bbDic.violet; i++) {
        colortable.push(false); //색발견 체크용 초기화 [false,false,...false]하고, 같은 타입이 있으면 [0~]=true;
    }

    // Check all tiles
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            var tile = level.tiles[i][j]; //레벨1속의 공1 가져온다.
            //if (tile.type >= 0) {                   //공색1이 있는 경우만
            if (!isSpecialBubble(tile.type)) {
                if (!colortable[tile.type]) { //색발견 체크용 배열속 검사하여, 체크없는 경우
                    colortable[tile.type] = true; //색발견 체크용 배열 체크됬다고 기록,
                    foundcolors.push(tile.type); //있는 색만 기록한 리턴용배열
                }
            }
        }
    }

    return foundcolors; //중복 없는 색만 있는 배열 리턴
}

// Find cluster at the specified tile location
// --쏜 결과--
//    (Z) (Y)
//      (B)
//
// --먼저 쏜 공 주위 검색후 같은색 B를 클러스터에 추가
//    (4) (5)
//  (3)  B  (0)
//    (2) (1)
//
// --(검색한 공은 false처리로 중복검사 피함)
// --배열 역순으로 체크, 같은 색이면 Y를 클러스터에 추가, 주변 검사
//    (3)  Y (0)
//  ( ) (2) (1)
//    ( ) ( )
//
// --(검색한 공은 false처리로 중복검사 피함)
// --배열 마지막 공 순서로, 같은 색이면 Z를 클러스터에 추가, 주변 검사
//(3)  Z  (0) ( )
//  (2) (1) ( )
//    ( ) ( )
function findCluster(tx, ty, matchtype, reset, skipremoved) {
    // Reset the processed flags
    if (reset) {
        resetProcessed(); //모든 grid들의 처리결과를 초기화(false) 한다.
    }

    // Get the target tile. Tile coord must be valid.
    var targettile = level.tiles[tx][ty];

    // Initialize the toprocess array with the specified tile
    var toprocess = [targettile]; //처리해야될 공을 배열로 변환;
    targettile.processed = true;
    var foundcluster = [];

    while (toprocess.length > 0) {
        var currenttile = toprocess.pop(); //가변현재그리드, Pop the last element from the array

        if (currenttile.type == -1 
            //|| currenttile.type == bbDic.core //무조건 끊어져잇는걸 검사해야한다...코어는 검사하면 안된다.
           ) 
        { //가변현재그리드에 공이 없으면 이번 스텝 넘기기
            continue; // Skip processed and empty tiles
        }

        // Skip tiles with the removed flag
        // 연결이 끊긴 클러스터 제거시 사용
        if ( skipremoved //skipremoved모드일 경우에,
            && currenttile.removed //matchtype true모드로 찾아진 클러스터들은
        ) { //stateRemoveCluster()에서 removed를 true로 설정되어지므로.
            //if(dm) console.log("----topprocess[last]xy: removed");
            continue;
        }


        // Check if current tile has the right type, if matchtype is true
        // 공1 쏜 후, 동일 3색 이상 찾을때
        if (!matchtype //매치가 껴져 있으면 무조건 실행
            || (currenttile.type == targettile.type) // 공1이 처음지정한 공과 같은색이면 여기서 처리
//            || (currenttile.type == bbDic.fuel)     //추가연료 예외처리
//            || (currenttile.type == bbDic.addball)  //추가총알 예외처리 
        ){
//            if(currenttile.type == bbDic.fuel){
//                deltaBuster = 0.2;
//                guiset_addFuelBar(); //이웃에 연료버블이 있으면
//            }else if(currenttile.type == bbDic.addball){
//                player.ballcount += 3;
//                tx_remainBall.text = player.ballcount;
//            }
            
            
            // Add current tile to the cluster
            //matchtype이 true면   처음 쏜 색과 같은 공들의 집합 이고
            //matchtype이 false면  그냥  연결된 어떤 공들의 집합 이다.
            foundcluster.push(currenttile);
            //if(dm) console.log("----topprocess[last]xy: foundcluster(+1).length:"+foundcluster.length);

            // Get the neighbors of the current tile
            var neighbors = getNeighbors(currenttile); // 6방향 이웃리스트 생성
            //if(dm) console.log("----neighbors:"+neighbors.length + ", " + whatisNeighbors(neighbors) );

            // Check the type of each neighbor
            for (var i = 0; i < neighbors.length; i++) { //찾은 이웃리스트을 처리할것만 처리배열에 넣는다.
                if (!neighbors[i].processed) { //같은색이웃이므로(matchtype이 on일때 ), 검사 안한 이웃이면 추가하고, 검사체크로 한다. 
                    // Add the neighbor to the toprocess array
                    toprocess.push(neighbors[i]); //주변검사할 이웃들 등록(검사 안한 것들만)
                    neighbors[i].processed = true; //이웃당사자는 검사체크
                }
            }
            //if(dm) console.log("----topprocess+!proceesed:"+toprocess.length+", 이웃.cnt:"+neighbors.length);
        }
        //다른색 공, 빈공 이면 여기까지 온다.
    }
    // Return the found cluster
    return foundcluster;
}

// Find floating clusters
function findFloatingClusters() {
    if(dm) console.log("--findFloatingClusters()--");
    // Reset the processed flags
    resetProcessed(); //검사체크 초기화

    var foundclusters = [];

    if(dm) console.log("~ ~ before findFloatingClusters():");
    //debug_GridAttr();
    // Check all tiles
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            var tile = level.tiles[i][j];
            if (!tile.processed) {
                // Find all attached tiles
                var foundcluster = findCluster(i, j, false, false, true); //-1속성기준으로 분리된 덩어리를 만든다.
                //reset모드 off,
                //match모드 off,
                //skipremoved모드 on

                // There must be a tile in the cluster
                if (foundcluster.length <= 0) {
                    continue;
                }

                // Check if the cluster is floating
                var floating = true;
                for (var k = 0; k < foundcluster.length; k++) {
                    if (foundcluster[k].type == bbDic.core)//속성13으로 된 코어 7개를 검사해서 제외한다.
                    //if (foundcluster[k].x == level.midGridx && foundcluster[k].y == level.midGridy)//실제코어충돌검사
                    ////if (foundcluster[k].y == 0)
                    {
                        if(dm) console.log("found centerCluster!!");
                        // Tile is attached to the roof
                        floating = false;
                        break;
                    }
                }

                if (floating) {
                    // Found a floating cluster
                    if(dm) console.log("~ ~ foundcluster.type:"+foundcluster.type);
                    foundclusters.push(foundcluster);
                }
            }
        }
    }
    var flen = foundclusters.length;
    var str="";
    for (var i = 0; i < flen; i++) {
        var len1 = foundclusters[i].length;
        str+=("i=="+i+"\n");
        for (var j = 0; j < len1; j++) {
            str+=", ["+j+ "],"+(foundclusters[i][j].type)+",xy:"+foundclusters[i][j].x+","+foundclusters[i][j].y;
        }
        str+="\n";
    }
    if(dm) console.log("after findFloatingClusters:"+str);
    return foundclusters;
}

// Reset the processed flags
function resetProcessed() {
    if(dm) console.log("--resetProcessed()--");
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            level.tiles[i][j].processed = false;
        }
    }
}

// Reset the removed flags
function resetRemoved() {
    if(dm) console.log("--resetRemoved()--");
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            level.tiles[i][j].removed = false;
        }
    }
}

// Get the neighbors of the specified tile
function getNeighbors(tile) {
//    if(dm) console.log("--getNeighbors()--");
    var tilerow = (tile.y + rowoffset) % 2; // Even or odd row
    var neighbors = [];

    // Get the neighbor offsets for the specified tile
    var n = neighborsoffsets[tilerow];

    // Get the neighbors
    for (var i = 0; i < n.length; i++) {
        // Neighbor coordinate
        var nx = tile.x + n[i][0];
        var ny = tile.y + n[i][1];

        // Make sure the tile is valid
        if (nx >= 0 && nx < level.columns && ny >= 0 && ny < level.rows) {
            neighbors.push(level.tiles[nx][ny]);
        }
    }
    return neighbors;
}

function updateFps(dt) {
    //--update: tframe(lastframe):1259.23899999907, dt:1.25923899999907 bubble-shooter-example.js:292
    //--update2: tframe(lastframe):1275.2479999981006, dt:0.016008999999030493 bubble-shooter-example.js:288

    //--updateFps()--, framecount:0, fpstime:0, dt:1.25923899999907 bubble-shooter-example.js:778
    //--updateFps()2--, framecount:1, fpstime:1.25923899999907, dt:0.016008999999030493 

    var deb2 = "--updateFps()2--, framecount:" + framecount + ", fpstime:" + fpstime + ", dt:" + dt;
    var deb1 = "--updateFps()--, framecount:" + framecount + ", fpstime:" + fpstime + ", dt:" + dt;

    if (updateFpsOnce == false) {
        if (updateFpsOnce2) {
            if(dm) console.log(deb2);
            updateFpsOnce2 = false;
        }
    }
    if (updateFpsOnce) {
        if(dm) console.log(deb1);
        updateFpsOnce = false;
    }

    if (fpstime > 0.25) {
        // Calculate fps
        fps = Math.round(framecount / fpstime);
        // Reset time and framecount
        fpstime = 0;
        framecount = 0;
    }

    // Increase time and framecount
    fpstime += dt;
    framecount++;
}

// Draw text that is centered
function drawCenterText(text, x, y, width) {
    var textdim = context.measureText(text);
    context.fillText(text, x + (width - textdim.width) / 2, y);
}

// Render the game
function render() {
    if (renderOnce) {
        if(dm) console.log("--render()--loop");
        renderOnce = false;
    }

    // Render tiles
    //reposTiles();
    reposTiles1Time();
    reposTilesNormal();
    reposTilesCluster();
    reposTilesFloating();
    // Render cluster
    if (showcluster) {
        renderCluster(cluster, 255, 128, 128);

        for (var i = 0; i < floatingclusters.length; i++) {
            var col = Math.floor(100 + 100 * i / floatingclusters.length);
            renderCluster(floatingclusters[i], col, col, col);
        }
    }


    // Render player bubble
    renderPlayer();
}
// Render tiles
var w2 = level.tilewidth * 0.5;
var h2 = level.tileheight * 0.5;
var dtBBSpineCluster = 0;
var dtBBSpineFloating = 0;
//    function reposTiles() {
//        if(reposTilesOnce)
//        {
//            //reposTilesFnOnce();
//            if(dm) console.log("--reposTiles()--loop");
//            reposTilesOnce=false;
//        }
//        // Top to bottom
//        for (var j=0; j<level.rows; j++) {
//            for (var i=0; i<level.columns; i++) {
//                // Get the tile
//                var tile = level.tiles[i][j];
//                thisBubbleX = j;
//                thisBubbleY = i;
//                // Get the shift of the tile for animation
//                //var shift = tile.shift;
//                //추가 각도이용
//                var shiftx = tile.shiftx;
//                var shifty = tile.shifty;
//                //추가 각도이용
//                
//                // Calculate the tile coordinates
//                var coord = getTileCoordinate(i, j);                                                                    //타일1 그리드->월드좌표(좌상단) 넘겨준다
//                
//                //버블스파인속성  //렌더링시 위치입력
//                if(tile.type==bbDic.cluster){
//                    //버블스파인
//                    BStiles[i][j].alpha=0;
//                    reposBubbleSpine(
////                        coord.tilex + shiftx + (level.tilewidth*0.5),
////                        coord.tiley + shifty + (level.tilewidth*0.5),
//                        coord.tilex + w,
//                        coord.tiley + h,
//                        tile.type);
//                    //버블스파인
//                    dtBBSpineCluster+=deltaTime;
//                    if(dtBBSpineCluster>2)
//                    {
//                        bBBSpineCluster = false;
//                        bBBSpineFloating = true;
//                    }
//                }
//                //버블스파인속성  //렌더링시 위치입력
//                // Check if there is a tile present
//                else if (tile.type > bbDic.rand && tile.type< bbDic.floatingcluster) {
//                        // Support transparency
//                        //var spralpha = tile.alpha;
//                        // Draw the tile using the color
//                        //drawBubble(coord.tilex, coord.tiley + shift, tile.type);
//                        //추가 각도이용
//                        //BStiles[i][j].alpha=0.25;
//                        BStiles[i][j].alpha=tile.alpha;
//                        reposBubble(coord.tilex + shiftx, coord.tiley + shifty, tile.type);
//                        //추가 각도이용
//                        //context.restore();
//                }
//            }
//        }
//    }

function reposTiles1Time() {
    if (reposTilesOnce) {
        //reposTilesFnOnce();
        if(dm) console.log("--reposTiles()--loop");

        reposTilesOnce = false;
        //debug_Obj(TXtiles[8][8], InfoPos.on, MovePos.on);

        ////        테스트코드
        //        level.tiles[8][8].txfx = true;
        //        for (var j = 0; j < level.rows; j++) {
        //            for (var i = 0; i < level.columns; i++) {
        //                level.tiles[i][j].txfx = true;
        //                TXtiles[i][j].text = i+j;
        //            }
        //        }
        ////        테스트코드

    }
}

function getAlphaMultipleGlobal(WantPosNormalized) {
    //--알파가 1~0로 변해 가야한다고 할때
    //--알파값1을 어느정도시간 유지하고 싶을때, 2을 곱하면 2~1~0으로 되서, 
    //--알파1이상은 1로 처리하면, 거리상 위치 0~1로 볼때 0 ~ 0.5 ~ 1으로  0.5부터 시작할수 있음

    //--여기서는 배수(2를 말함)를 계산
    var wantStart = WantPosNormalized; //--원하는 위치(0~1)       //0.25
    var revertS = 1.0 - wantStart; //--위치 반전             //0.75
    var aMultiple = Math.pow(revertS, -1); //-- -1승 곧 알파에 쓸 배수//1.33
    return aMultiple;
}

function getAlphaByDist(CurDist, DestDist, DelayMultiple) {
    //--알파가 1~0로 변해 가야한다고 할때
    //--알파값1을 어느정도시간 유지하고 싶을때, 2을 곱하면 2~1~0으로 되서, 
    //--알파1이상은 1로 처리하면, 거리상 위치 0~1로 볼때 0 ~ 0.5 ~ 1으로  0.5부터 시작할수 있음

    //--여기서는 알파1이상을 처리
    //현재총이동거리  //최대이동거리 //알파딜레이배수==alphaMultiple
    var curalpha = 1 - (CurDist / DestDist);
    var resultAlpha = Math.min(1.0, curalpha * DelayMultiple);
    return resultAlpha;
}

function reposTilesNormal() {
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            // Get the tile
            var tile = level.tiles[i][j];
            thisBubbleX = j;
            thisBubbleY = i;
            // Get the shift of the tile for animation
            //var shift = tile.shift;
            //추가 각도이용
            var shiftx = tile.shiftx;
            var shifty = tile.shifty;
            //추가 각도이용

            // Calculate the tile coordinates
            //var coord = getTileCoordinate(i, j); //타일1 그리드->월드좌표(좌상단) 넘겨준다

            if (tile.type > bbDic.rand && tile.type < bbDic.floatingcluster) {
                BStiles[i][j].alpha = tile.alpha;
                reposBubble(tile.initx + shiftx,      //position.x 절대좌표값 + 이동delta값
                            tile.inity + shifty,
                            tile.type); //reposBubble(coord.tilex + shiftx, coord.tiley + shifty, tile.type);
            }

            if (tile.txfx == true) { //버블점수판 이동
                if (TXtiles[i][j].visible == false) TXtiles[i][j].visible = true;
                
                TXtiles[i][j].y -= deltaTime * ScoreVelocity;
                var curdist = tile.pivoty - TXtiles[i][j].y; //현재총이동거리
                TXtiles[i][j].alpha = getAlphaByDist(curdist, ScoreDestDist, alphaMultiple); //거리별 알파값을 구한다.
                if (tile.pivoty - ScoreDestDist > TXtiles[i][j].y) { //최대이동거리 넘으면 초기화
                    tile.txfx = false;
                    TXtiles[i][j].visible = false;
                    TXtiles[i][j].y = tile.pivoty;
                    TXtiles[i][j].alpha = 1;
                }
            }
        } //for i
    } //for j
}

function reposTilesCluster() {
    // Top to bottom
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            // Get the tile
            var tile = level.tiles[i][j];
            thisBubbleX = j;
            thisBubbleY = i;

            var shiftx = tile.shiftx;
            var shifty = tile.shifty;

            //var coord = getTileCoordinate(i, j); //타일1 그리드->월드좌표(좌상단) 넘겨준다

            //버블스파인속성  //렌더링시 위치입력
            if (tile.type == bbDic.cluster) {
                if (FoundCore) { //inreposTilesCluster()

                }
                //버블스파인
                BStiles[i][j].alpha = 0;
                reposBubbleSpine( //==reposBubbl()
                    tile.initx + w2,//coord.tilex + w2,       //position.x 절대좌표값 + 이동delta값
                    tile.inity + h2,//coord.tiley + h2,
                    tile.type);
            }
        }
    }
}

function reposTilesFloating() {
    // Top to bottom
    for (var j = 0; j < level.rows; j++) {
        for (var i = 0; i < level.columns; i++) {
            // Get the tile
            var tile = level.tiles[i][j];
            thisBubbleX = j;
            thisBubbleY = i;

            var shiftx = tile.shiftx;
            var shifty = tile.shifty;

            // Calculate the tile coordinates
            //var coord = getTileCoordinate(i, j); //타일1 그리드->월드좌표(좌상단) 넘겨준다

            if (tile.type == bbDic.floatingcluster) {
                BStiles[i][j].alpha = 0;
                reposBubbleSpine( //==reposBubbl()
                    tile.initx + w2 + shiftx,//coord.tilex + w2 + shiftx,
                    tile.inity + h2 + shifty,//coord.tiley + h2 + shifty,
                    tile.type);
            }
        }
    }
}

// Render cluster Dummy
function renderCluster(cluster, r, g, b) { //더미렌더링용
    for (var i = 0; i < cluster.length; i++) {
        // Calculate the tile coordinates
        var coord = getTileCoordinate(cluster[i].x, cluster[i].y); //타일1 그리드->월드좌표(좌상단) 넘겨준다

        //검정 십자가 표시 //클러스터 디스플레이요
        var szpiv = 10;
        var crossPivot = new PIXI.Graphics(); //spritemode //스프라이트 피봇만들기
        crossPivot.beginFill(ColorSet.black);
        crossPivot.drawRect(-szpiv, 0, szpiv * 2, 1);
        crossPivot.drawRect(0, -szpiv, 1, szpiv * 2);
        sGameMain.addChild(crossPivot);
        crossPivot.x = coord.tilex + level.tilewidth*0.5;
        crossPivot.y = coord.tiley + level.tileheight*0.5;


        // Draw the tile using the color9
        //context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        //context.fillRect(coord.tilex+level.tilewidth/4, coord.tiley+level.tileheight/4, level.tilewidth/2, level.tileheight/2);

    }
}
function tweenStone1Add(gridx, gridy, spr1){
    var destXY = getTileCoordinate( gridx, gridy);//왼쪽위 좌표
    destXY.tilex+=level.tilewidth*0.5;
    destXY.tiley+=level.tileheight*0.5;
    
    var ang = getAngleFromPos(
            level.midxCenter,
            level.midyCenter,
            destXY.tilex,
            destXY.tiley
    );
    var moveArr= moveToAngle(ang, 200);
    var beginXY={
        x:destXY.tilex+moveArr[0],
        y:destXY.tiley+moveArr[1]
    };

       //이동트윈
    TweenMax.fromTo(
        spr1, //object
        0.35, //time 
        {
            x:beginXY.x, //,                       //pos
            y:beginXY.y                       //pos
        }, {
            x: destXY.tilex, //pos
            y: destXY.tiley,
            ease: Bounce.easeOut,
            //ease:Power0.easeNone,
            //ease:Power1.easeOut,
            //ease:Elastic.easeOut,
            //ease:Linear.easeNone,
            //yoyo:true,
            //repeat:1,
            onStart: function(){
                SESoundPlay(se.StoneHit);
            },
            onComplete:
            function(){
                spr1.x=-1000;
                spr1.y=-1000;
                BStiles[gridx][gridy].texture = SpritePool.getInstance().get(bbArr[bbDic.stone1]).texture;
            },
            delay:0
        }
    ); 
}

//돌이 붙을 장소를 찾아내려고
function getStoneRespawnPos(offset){
    var iB = 0;
    var off = offset==undefined?0:offset;
    //var degArr = [0, 60, 120, 180, 240, 300];
    var degArr = [240, 300, 0, 60, 120, 180]; //앞면 먼저 검사하게 하려고
    
    var len = degArr.length;
    var deg;
    
    while (iB<9) {
        iB += 2;
        
        //6 회전 업데이트회전
        //var deg = ((iB%6)/6)*360;
        for(var i=0;i<len;i++){
            if(iB>5){
                if(degArr[i]==0||degArr[i]==180){
                    continue;
                }
            }
            
            var offsetDeg = (i+off);
            offsetDeg = offsetDeg%6;
            deg = degArr[offsetDeg];
            
            var gridXY = rotateGrid(level.midGridx+iB, level.midGridy, deg); //그리드xy, 회전각도 --> 그리드x`,y`
            var att = level.tiles[gridXY.x][gridXY.y].type; 
            var pixelXY = getTileCoordinate( gridXY.x, gridXY.y);

            var nei = getNeighbors(level.tiles[gridXY.x][gridXY.y]);
            nei.push(level.tiles[gridXY.x][gridXY.y]);  //중앙 1타일 추가하고
            var neilen = nei.length; //7이어야 하는데,6인경우도 있어서
            
//            var neistr="";
            if(nei.length>0){
                for(var n=neilen-1;n>=0;n--){                    //역순으로 검사
//                    if(dm) console.log("~ ~ n1:"+n+", len:"+nei.length);
//                    neistr+=(nei[n].type+",");
                    if(nei[n].type == -1){

//                        //debug
//                        var pixelXY = getTileCoordinate( nei[n].x, nei[n].y);
//                        var container  = new PIXI.Container();
//                        container.x = pixelXY.tilex+(level.tilewidth*0.5);
//                        container.y = pixelXY.tiley+(level.tileheight*0.5);
//                        debug_Obj(container, InfoPos.on, MovePos.on);
//                        sGameMainUI.addChild(container);
//                        //debug

                        return {x:nei[n].x,y:nei[n].y};
                    };
                }
            }
            // if(dm) console.log("~ ~ FoundStone--gridrot:"+gridXY.x+","+gridXY.y
            //             +", source:"+(level.midGridx+iB)+","+level.midGridy
            //             +", deg:"+deg
            //             +", att:"+att
            //             +", iB:"+iB
            //             +", nei:"+neistr
            //            );
            
            //코어정면과 후면검사
            //          [frontIndex,backIndex]
            var frontback = [14,6];
            if(iB==4){
                frontback = [14,6];
            }else if(iB==8){
                frontback = [16,4];
            }else if(iB==10){
                frontback = [18,2];
            }
            if(iB==4
            || iB==8
            || iB==10){
                //level.tiles[10][16].type = bbDic.stone1;
                //level.tiles[10][4].type = bbDic.stone1;
                var fblen=frontback.length;
                for(var fb=0; fb<fblen; fb++){
                    var nei2 = getNeighbors(level.tiles[10][frontback[fb]]);
                    nei2.push(level.tiles[10][frontback[fb]]);  //중앙 1타일 추가하고
                    var nei2len = nei2.length; //7이어야 하는데,6인경우도 있어서

                    var nei2str="";
                    if(nei2.length>0){
                        for(var n=nei2len-1;n>=0;n--){                    //역순으로 검사
                            //if(dm) console.log("~ ~ n1:"+n+", len:"+nei2.length);
                            nei2str+=(nei2[n].type+",");
                            if(nei2[n].type == -1){

//                                //debug
//                                var pixelXY = getTileCoordinate( nei2[n].x, nei2[n].y);
//                                var container  = new PIXI.Container();
//                                container.x = pixelXY.tilex+(level.tilewidth*0.5);
//                                container.y = pixelXY.tiley+(level.tileheight*0.5);
//                                debug_Obj(container, InfoPos.on, MovePos.on);
//                                sGameMainUI.addChild(container);
//                                //debug

                                return {x:nei2[n].x,y:nei2[n].y};
                            };
                        }
                    }
                }//for fb
            }

        }
    }
    return undefined;
}
var old_navActiveCount=0;
var old_navColor=-1;
// Render the player bubble
function renderPlayer() {
    if (renderPlayerOnce) {
        if(dm) console.log("--renderPlayerOnce()--loop");
        renderPlayerOnce = false;
    }
    //    //공중앙          //상단왼쪽
    //var centerx = player.x + level.tilewidth/2;
    //var centery = player.y + level.tileheight/2;

    //SpArrow.rotation = degToRad(180 - player.angle);
    //if (SpArrow.visible) SpArrow.visible = false;

    //navRot = degToRad(player.angle);
    navRot = player.angle;
    if (navRot != navRotOld) {
        navRotOld = navRot;
        //if(dm) console.log("navRot:" + navRot);
        //var w2 = level.tilewidth * 0.5;
        
        var rot2 = -1;
        //네비작동처리---------------------------------------------------------------------
        var cnt = navCount; //30
        var colCnt = 0;
        var distCnt=-1;
        for (var n = 0; n < cnt; n++) {
            var distOff = navOffset * n;            //35*현재갯수
            var xy = moveToAngle(navRot, distOff);  //로컬회전위치
            var x = navX + xy[0];                   //고정플레이어위치+오프셋
            var y = navY + xy[1];                   //고정플레이어위치+오프셋

            //네비영역벗어남처리
            if (x - w2 < ColMinX) { //왼쪽벽 충돌
                //rot2 = 180 - navRot;
                x = (2 * ColMinX) + (level.tilewidth) - x;
                colCnt += 1;
            }

            if (x + w2 > ColMaxX) { //오른쪽벽 충돌
                //rot2 = 180 - navRot;
                x = (2 * ColMaxX) - (level.tilewidth) - x;
                colCnt += 1;
            }
            if (y - w2 < ColMinY) { //천장에 충돌// 공이 상승하면 y작아지므로, 더 작아지면 레벨구역 벗어나게 된다.
                //rot2 = 360 - navRot;
                //y = ColMinY-w2;
                y = (2 * ColMinY) + (level.tilewidth) - y;
                colCnt += 1;
            }
            //네비영역벗어남처리

            //그리드범위벗어남처리
            var gridpos = getGridPosition(x, y); //월드좌표->그리드좌표로 변환
            // Make sure the grid position is valid
            if (gridpos.x < 0) {
                gridpos.x = 0;
            }
            if (gridpos.x >= level.columns) {
                gridpos.x = level.columns - 1;
            }
            if (gridpos.y < 0) {
                gridpos.y = 0;
            }
            if (gridpos.y >= level.rows) {
                gridpos.y = level.rows - 1;
            }
        
            if (level.tiles[gridpos.x][gridpos.y].type != -1) colCnt = 3;
            //            //타일충돌처리
            if (colCnt > 2) {
                if(distCnt==-1){
                    distCnt=n;
                }
                sprNav[n].x = navX;
                sprNav[n].y = navY;
            } else {
                sprNav[n].x = x;
                sprNav[n].y = y;
            }
            
        }
        if(old_navActiveCount!=distCnt || old_navColor!=player.bubble.tiletype ){
            var str="";
            for (var n = 0; n < distCnt; n++) {
                var a= 1-(n/distCnt);
                sprNav[n].alpha = a;
                //sprNav[n].tint = bbDicTint[player.bubble.tiletype];
                str+=(a+",");
            }
            old_navActiveCount=distCnt;
            old_navColor=player.bubble.tiletype;
            //if(dm) console.log("~ ~ alpha:"+str);
        } //if
        //네비작동처리------------------------------------------------------------

    }
    //플레이어버블 그리기
    if (player.bubble.visible) {
        //drawBubble(player.bubble.x, player.bubble.y, player.bubble.tiletype);
        //drawBubblePlayer(player.bubble.x, player.bubble.y, player.bubble.tiletype);
        SprPlayerBubble.x = player.bubble.x;
        SprPlayerBubble.y = player.bubble.y;
        //if(dm) console.log("SprPlayerBubbleXY:"+player.bubble.x+","+player.bubble.y);
        if (SprPlayerBubble.visible == false) SprPlayerBubble.visible = true; //꺼진상태면 켜주고
    } else {
        if (SprPlayerBubble.visible == true) SprPlayerBubble.visible = false; //켜진상태면 꺼준다
    }
}


// Get the tile coordinate //타일1 그리드->월드좌표(좌상단) 넘겨준다
function getTileCoordinate(column, row) {
    //시작점 + (칸수*1타일칸)
    var tilex = level.x + column * level.tilewidth;

    // X offset for odd or even rows
    if ((row + rowoffset) % 2) {
        tilex += level.tilewidth / 2;
    }

    var tiley = level.y + row * level.rowheight;
    return {
        tilex: tilex,
        tiley: tiley
    };
}

// Get the closest grid position  //타일1 월드좌표(좌상단)->그리드 좌표 넘겨준다
function getGridPosition(x, y) {
    var gridy = Math.floor((y - level.y) / level.rowheight);

    // Check for offset
    var xoffset = 0;
    if ((gridy + rowoffset) % 2) {
        xoffset = level.tilewidth / 2;
    }
    var gridx = Math.floor(((x - xoffset) - level.x) / level.tilewidth);
    return {
        x: gridx,
        y: gridy
    };
}

// Draw the bubble
function reposBubble(x, y, index) {
    if (index < 0
        // || index >= bubblecolors
    )
        return;

    // Draw the bubble sprite
    //context.drawImage(bubbleimage, index * SzBall, 0, SzBall, SzBall, x, y, level.tilewidth, level.tileheight);//버블이미지//버블텍스쳐

    //BStiles[thisBubbleY][thisBubbleX].texture = SpritePool.getInstance().get(bbArr[index]).texture;
    //BStiles[thisBubbleY][thisBubbleX].visible = true;
    BStiles[thisBubbleY][thisBubbleX].x = x;
    BStiles[thisBubbleY][thisBubbleX].y = y;
    
    //제거될
    //var idadd = BStiles[thisBubbleY][thisBubbleX].idadd;
    var idadd = level.tiles[thisBubbleY][thisBubbleX].idadd;
    
    if(idadd!=-1){
        itemAddArr[idadd].x = x+ws;
        itemAddArr[idadd].y = y+hs;
    }
    //var idfuel = BStiles[thisBubbleY][thisBubbleX].idfuel;
    var idfuel = level.tiles[thisBubbleY][thisBubbleX].idfuel;
    
    if(idfuel!=-1){
        itemFuelArr[idfuel].x = x+ws;
        itemFuelArr[idfuel].y = y+hs;
    }
    
    var idstar = level.tiles[thisBubbleY][thisBubbleX].idstar;
    if(idstar!=-1){
        itemStarArr[idstar].x = x+ws;
        itemStarArr[idstar].y = y+hs;
    }    
    //제거될
//    
//    if(level.tiles[thisBubbleY][thisBubbleX].type == bbDic.addball){
//        if(dm) console.log("~ ~ addballxy:"+
//        BStiles[thisBubbleY][thisBubbleX].cont.x
//        +","+BStiles[thisBubbleY][thisBubbleX].cont.y);
//    }
    
}

function reposBubbleSpine(x, y, index) {
    if (index < 0
        // || index >= bubblecolors
    )
        return;

    // Draw the bubble sprite
    //context.drawImage(bubbleimage, index * SzBall, 0, SzBall, SzBall, x, y, level.tilewidth, level.tileheight);//버블이미지//버블텍스쳐

    //BStiles[thisBubbleY][thisBubbleX].texture = SpritePool.getInstance().get(bbArr[index]).texture;
    //BStiles[thisBubbleY][thisBubbleX].visible = true;

    FXtiles[thisBubbleY][thisBubbleX].x = x;
    FXtiles[thisBubbleY][thisBubbleX].y = y;
}

// Start a new game
function newGame() {
    
    if(dm) console.log("--newGame()--");
    firstRed=true;
    // Reset score
    score = 0;
    TxScore.text = "0";
    turnsnapcounter = 0; //새게임시작
    delaycountStoneCreation=false;//운석생성무한딜레이 끄기
    rowoffset = 0;

    //추가---
    player.playtime = 0;
    player.buster = false; //뉴게임 버스터모드 초기화
    player.busterpre = false; //뉴게임 버스터모드 초기화
    
    player.bustertime = 1;
    player.playscore = 0;
    player.retrycount = 0;
    player.star=0;

    //mainBuster.visible = false;
    mainCoreFx.visible = false;
    
    usedballcounter = 0;

    //튜터리얼 관련 세팅 --로드전
    tutshootcount=0;
    nextcount=0;

    if(kData.tutorialpoint<4){ //튜터 1단계 초기화
        kData.tutorialpoint=0;
    }else if(kData.tutorialpoint<7){ //튜터 2단계 초기화
        kData.tutorialpoint=4;
    }
    SaveDataInClient();
    networkManager.ForcedSaveData();//튜터단계저장목적
    
    sGameMainUI.tut.visible=false;
    sGameMainUI.tutbg.visible=false;
    sGameMainUI.tut.right.interactive = false;//클릭이 안되는경우가 있어서
    sGameMainUI.tut.left.interactive = false;//클릭이 안되는경우가 있어서
    if(dm) console.log("~ ~ sGameMainUI.tut.visible:"+sGameMainUI.tut.visible
                +", sGameMainUI.tutbg.visible:"+sGameMainUI.tutbg.visible);
    //튜터리얼 관련 세팅 --로드전

    hideFinale();
    showBall5();
    //추가---

    // Set the BSstate_ to ready
    setBSstate_(BSstates.ready); //뉴게임시 초기화

    // Create the level
    //createLevel();
    loadLevel();
    loadLevelSetSpr(); //추가

    //방어막조건쉴드조건
    //1  ~ 18 방어막없음 스톤없음
    //19 ~ 54 방어막1개 
    //55 ~ 99 방어막2개
    //100~300 방어막3개
    //<19 //<55 //<100
    //참고 lvNumber // cShield_ // attArrSD // shieldsetVisible // stateShield(dt) //hieldst=ShieldSt.begin;
    var lvNumber = kData.curLevel + 1;
    if(lvNumber<19){
        typeSD = TypeSD.none; //shieldsetVisible()//stateShield(dt)
    }else if(lvNumber<55){
        typeSD = TypeSD.one; //shieldsetVisible()//stateShield(dt)
    }else if(lvNumber<100){
        typeSD = TypeSD.two; //shieldsetVisible()//stateShield(dt)
    }else{
        typeSD = TypeSD.three; //shieldsetVisible()//stateShield(dt)
    }    

    degIdxSD=0;
    olddegIdx=5;
    cShield_.rotation=degToRad(0);
    cShield_ray_.rotation=cShield_.rotation;
    shieldsetVisible(true);

    
    //이동좌우버튼 초기화
    BtnL.alpha = 1;
    BtnR.alpha = 1;

    guiset_setOffStar3(); //상단메뉴바 별3개 끄기
    guiset_setPosStar3(); //상단메뉴바 별3개 위치계산

    // Init the next bubble and set the current bubble
    nextBubble(); //초기화로 0이므로, 넥스트공->플레이어공, 랜덤공->넥스트공 복사 1회
    nextBubble(); //초기화로 0이므로, 넥스트공->플레이어공, 랜덤공->넥스트공 복사 2회
    nextBubble(); //초기화로 0이므로, 넥스트공->플레이어공, 랜덤공->넥스트공 복사 2회
    

    
    mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]); //newgame

    if(dm) console.log("--newGame()--fin--");
}


function initLevel() {
    if(dm) console.log("--initLevel()--midxy:" + level.midGridx + "," + level.midGridy);

    for (var j = 0; j < level.rows; j++) { //0~13 //rows=14
        for (var i = 0; i < level.columns; i++) {
            //기존배열값 초기화--------
            var tile = level.tiles[i][j];
            tile.type = -1;
            
            tile.idadd = -1;
            tile.idstar = -1;
            tile.idfuel = -1;
            
            tile.alpha = 1;
            //level.tiles[i][j].shift = 0;
            tile.shiftx = 0;
            tile.shifty = 0;
            tile.velocity = player.bubble.dropspeed;

            var co = getTileCoordinate(i, j); //타일월드좌표 //레벨초기화
            var centerx = co.tilex + level.tilewidth * 0.5;
            var centery = co.tiley + level.tileheight * 0.5;

            tile.centerangle = getAngle(
                level.midxCenter,
                level.midyCenter,
                centerx,
                centery
            );

            //텍스트이펙트
            tile.txfx = false;
            TXtiles[i][j].x = centerx;
            TXtiles[i][j].y = centerx;
            //텍스트이펙트

            //기존배열값 초기화-------------



        }
    }
    //debug_GridAttr();
}

function initCenterBall() {
    var x = level.midGridx;
    var y = level.midGridy;
    var ax = [x, x + 1, x - 1, x, x - 1, x, x - 1];
    var ay = [y, y, y, y + 1, y + 1, y - 1, y - 1];
    for (var i = 0; i < ax.length; i++) {
        var tile = level.tiles[ax[i]][ay[i]]
        tile.type = bbDic.core;// CoreIndex; //임시코드
        tile.alpha = 1;
        tile.shiftx = 0;
        tile.shifty = 0;
        tile.centerangle = 0;
        tile.velocity = player.bubble.dropspeed;

        //색이 안보이게
        BStiles[ax[i]][ay[i]].alpha = 0.0;
    }
}

function setColorCenterBall(index) //코어전체(7개)를 바꾼다
{
    var x = level.midGridx;
    var y = level.midGridy;
    var ax = [x, x + 1, x - 1, x, x - 1, x, x - 1];
    var ay = [y, y, y, y + 1, y + 1, y - 1, y - 1];
    for (var i = 0; i < ax.length; i++) {
        level.tiles[ax[i]][ay[i]].type = index;
        BStiles[ax[i]][ay[i]].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture;
    }
}

//var starGen1=false;
//var StarGen2=false;
var starSeed=1;

function starRandom01(){
    starSeed = starSeed==1?0:1;
    return starSeed;
}
var CntCalc={};
    CntCalc.color=0;
    CntCalc.x=0;
    CntCalc.stone=0;
    CntCalc.fuel=0;
    CntCalc.addball=0;



function loadLevel() //레벨로드
{
    if(dm) console.log("--loadLevel()--midxy:" + level.midGridx + "," + level.midGridy);
    
    //별생성준비
//    starGen1=false;
//    StarGen2=false;
//    starSeed=starRandom01();
//    //starRot=starRotRandom();
//    if(dm) console.log("~ ~ starSeed:"+starSeed);
//    //if(dm) console.log("~ ~ starRot:"+starRot);
    
    initLevel();
    initCenterBall();

    //level.id = needscore_levels[kData.curLevel + 1].map; //CurLevel 0~시작,
    //level.id = needscore_levels[kData.curLevel + 1].id; //CurLevel 0~시작,
    level.id = kData.curLevel + 1; //CurLevel 0~시작,
    level.bead = 0;//needscore_levels[kData.curLevel + 1].bead;
    level.need = 0;//needscore_levels[kData.curLevel + 1].need;

    fixedBubbleCount = 0;
    if(dm) console.log(
                "~ ~ level.id:"+level.id
                +", level.bead:"+level.bead
                +", level.need:"+level.need
               );
    var ballcnt = bubble_levels[level.id].balls.length;
    var balls = bubble_levels[level.id].balls;
    var vx = 0;
    var vy = 0;
    
    itemAddArrIdx=0;
    itemFuelArrIdx=0;

    //
    // + bbDic.rand~bbDic.violet * 1 (구슬개수 * 1)
    // + bbDic.x      *2.5           (방해물 * 2.5)
    // + bbDic.stone1 *1.5           (운석 * 1.5)
    // + bbDic.fuel   *(-5)          (에너지 * -5)
    // + bbDic.addball*(-1)          (추가구슬 * -1)

    CntCalc.color=0;
    CntCalc.x=0;
    CntCalc.stone=0;
    CntCalc.fuel=0;
    CntCalc.addball=0;

    for (var i = 0; i < ballcnt; i++) {
        var x = balls[i].x;
        var y = balls[i].y;
        var at = balls[i].att;
        var tile = level.tiles[x][y];
        //if(dm) console.log("xy:"+x+","+y);
        if (at == bbDic.x) {
            fixedBubbleCount += 1;//특정속성버블 갯수 기록

            CntCalc.x+=1; //count
        }
        if(at == 0) {
            tile.type = randRangeFromInt(1, 5);

            CntCalc.color+=1; //count
        }
        else if(at == bbDic.addball){
            tile.idadd = itemAddArrIdx;    //loadLevelSetSpr
            tile.idfuel = -1;
            tile.idstar = -1;
            itemAddArrIdx+=1;
            
            tile.type = at;

            CntCalc.addball+=1; //count
        }else if(at == bbDic.fuel){
            tile.idadd = -1;
            tile.idfuel = itemFuelArrIdx;    //loadLevelSetSpr  
            tile.idstar = -1;
            itemFuelArrIdx+=1;            
            
            tile.type = at;

            CntCalc.fuel+=1; //count
        }else{
            tile.idadd = -1;
            tile.idstar = -1;
            tile.idfuel = -1;
            tile.type = at;
            if(at>bbDic.rand && at<=bbDic.violet){
                CntCalc.color+=1;
            }
        }

//        if(i==0||i==1||i==2){ //테스트로 3개 스톤 배치
//            
//            tile.idadd = -1;
//            tile.idstar = -1;
//            tile.idfuel = -1;
//            tile.type = bbDic.stone1;
//        }

        tile.alpha = 1;
        tile.shiftx = 0;
        tile.shifty = 0;
        tile.velocity = player.bubble.dropspeed;

    }

    starSeed=starRandom01(); //반전위치 구별하기 위한 스위치
    //starRot=starRotRandom();
    var starArr1=[]; //24개
    var starArr2=[]; //24개 4구역    3구역
    //중심선기준으로 4등분한다. 1,4, 또는 2와3
    // +---+---+ starSeed==0이면 1구역,4구역 24개, 24개
    // | 1 | 2 | starSeed==1이면 2구역,3구역 24개, 24개
    // +---+---+
    // | 3 | 4 |
    // +---+---+
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            //교체가능 속성들    red:1, blue:2, yellow:3, green:4, violet:5, noused6:6, x:7
            if(starSeed==0){
                if(i<10 && j<10){
                //if(i<8 && j<8 && i>3 && j>3 ){
                    var tile = level.tiles[i][j];
                    if(tile.type>bbDic.rand && tile.type<bbDic.fuel){ //색속성과 돌속성은 다 가져 오기(그리드좌표만)
                            starArr1.push({x:i,y:j});
                    }
                    
                }else if(i>10 && j>10){
                    var tile = level.tiles[i][j];
                    if(tile.type>bbDic.rand && tile.type<bbDic.fuel){ //색속성과 돌속성은 다 가져 오기(그리드좌표만)
                            starArr2.push({x:i,y:j});
                    }
                }
            }else{
                if(i<10 && j>10){
                    var tile = level.tiles[i][j];
                    if(tile.type>bbDic.rand && tile.type<bbDic.fuel){ //색속성과 돌속성은 다 가져 오기(그리드좌표만)
                            starArr1.push({x:i,y:j});
                    }
                }else if(i>10 && j<10){
                    var tile = level.tiles[i][j];
                    if(tile.type>bbDic.rand && tile.type<bbDic.fuel){ //색속성과 돌속성은 다 가져 오기(그리드좌표만)
                            starArr2.push({x:i,y:j});
                    }
                }
            }
        }
    }

    //별스파인 지정
    var idx1rnd = Math.floor(generateRandomNumber(0, starArr1.length));//1~~(n-1)까지 랜덤값 리턴;
    var idx2rnd = Math.floor(generateRandomNumber(0, starArr2.length));//1~~(n-1)까지 랜덤값 리턴;
    var star1rnd = starArr1[idx1rnd];
    var star2rnd = starArr2[idx2rnd];
    
    if(dm) console.log("~ ~ kData.tutorialpoint:"+kData.tutorialpoint
                +", kData.curLevel+1:"+(kData.curLevel+1));

    if(kData.tutorialpoint<4     //튜터첫시작일때
       && (kData.curLevel+1)==1 ){    //레벨1일때
       //튜터리얼모드면서 1레벨이면
//        star1rnd.x=8;
//        star1rnd.y=10;
//        star2rnd.x=8;
//        star2rnd.y=11;
        level.tiles[8][10].type = bbDic.star;
        level.tiles[8][11].type = bbDic.star;

        level.tiles[8][10].idstar = 0;
        level.tiles[8][11].idstar = 1;

        level.tiles[8][10].idadd = -1;
        level.tiles[8][11].idadd = -1;

        level.tiles[8][10].idfuel = -1;
        level.tiles[8][11].idfuel = -1;     
        if(dm) console.log("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ kData.curLevel+1==1레벨");
    }else if(kData.tutorialpoint<7     //튜터첫시작일때
       && (kData.curLevel+1)==2){     //레벨2일때
    
        level.tiles[9][13].type = bbDic.star;
        level.tiles[10][13].type = bbDic.star;

        level.tiles[9][13].idstar = 0;
        level.tiles[10][13].idstar = 1;

        level.tiles[9][13].idadd = -1;
        level.tiles[10][13].idadd = -1;

        level.tiles[9][13].idfuel = -1;
        level.tiles[10][13].idfuel = -1;         
    }else{
        // if((kData.curLevel+1)==270){
        //     //마지막 레벨
        //     var xa=9;
        //     var xb=10;
        //     var ya=13;
        //     var yb=13;
        //
        //     level.tiles[xa][ya].type = bbDic.star;
        //     level.tiles[xb][yb].type = bbDic.star;
        //
        //     level.tiles[xa][ya].idstar = 0;
        //     level.tiles[xb][yb].idstar = 1;
        //
        //     level.tiles[xa][ya].idadd = -1;
        //     level.tiles[xb][yb].idadd = -1;
        //
        //     level.tiles[xa][ya].idfuel = -1;
        //     level.tiles[xb][yb].idfuel = -1;
        //
        // }else {
            //일반 레벨
            level.tiles[star1rnd.x][star1rnd.y].type = bbDic.star;
            level.tiles[star2rnd.x][star2rnd.y].type = bbDic.star;

            level.tiles[star1rnd.x][star1rnd.y].idstar = 0;
            level.tiles[star2rnd.x][star2rnd.y].idstar = 1;

            level.tiles[star1rnd.x][star1rnd.y].idadd = -1;
            level.tiles[star2rnd.x][star2rnd.y].idadd = -1;

            level.tiles[star1rnd.x][star1rnd.y].idfuel = -1;
            level.tiles[star2rnd.x][star2rnd.y].idfuel = -1;
        // }
        // if(dm) console.log("~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ kData.curLevel+1==1레벨 외"+(kData.curLevel+1));
    }
    
//    level.tiles[10][16].type = bbDic.stone1; //테스트// 특정위치 스톤배치
//    level.tiles[10][4].type = bbDic.stone1; //테스트// 특정위치 스톤배치
    itemStarArrIdx=3; //2만 할당햇지만 3개로 지정
    
//    var starStr1 = convertStr2ArrXY1D(starArr1);
//    var starStr2 = convertStr2ArrXY1D(starArr2);
//    if(dm) console.log("~ ~ star1생성배열:"+starStr1);
//    if(dm) console.log("~ ~ star2생성배열:"+starStr2);
    var bb1 =(CntCalc.color * 1)          //구슬갯수
                + (CntCalc.x * 2.5)       //방해물
                + (CntCalc.stone * 1.5)   //운석
                + (CntCalc.fuel * -5)     //에너지
                + (CntCalc.addball * -1); //추가구슬
    var bb2 = bb1*3;
    var bb3 = Math.sqrt(bb2);
    var bb4 = Math.floor(bb3);

    bb4 = bb1<33?15:bb4;

    player.ballcount = bb4;



    // player.ballcount = (
    //     (
    //         (
    //             (CntCalc.color * 1)
    //             + (CntCalc.x * 2.5)
    //             + (CntCalc.stone * 1.5)
    //             + (CntCalc.fuel * -5)
    //             + (CntCalc.addball * -1)
    //         )
    //         * 3
    //     )
    //     ^(1/2)
    // );
    //player.ballcount = needscore_levels[kData.curLevel + 1].bead;

    //playScoreMax = needscore_levels[kData.curLevel + 1].need;
    tx_remainBall.text = player.ballcount; //newgame



    //debug_GridAttr();
}

function loadLevelSetSpr() {
    hideItemBubble();
//    itemAddArrIdx=0;
//    itemFuelArrIdx=0;
    //버블 그리드스파인그리드 만들기
    var w2 = level.tilewidth * 0.5; //반타일 길이
    var h2 = level.tileheight * 0.5; //반타일 길이

    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            if(BStilesMask[i][j]){

                var coord = getTileCoordinate(i, j); //레벨스파인초기화
                //레벨로딩시 모든버블스파인 위치 초기화
                FXtiles[i][j].visible = true;
                FXtiles[i][j].alpha = 1;
                FXtiles[i][j].position.x = coord.tilex + w2;
                FXtiles[i][j].position.y = coord.tiley + h2;
                //레벨로딩시 모든버블텍스쳐 위치 초기화
                TXtiles[i][j].visible = false;
                TXtiles[i][j].alpha = 1;
                TXtiles[i][j].position.x = coord.tilex + w2; //+ (TXtiles[i][j].width*0.5);
                TXtiles[i][j].position.y = coord.tiley + h2;

                //버블텍스쳐
                //var index = level.tiles[i][j].type;
                var tile = level.tiles[i][j];
                if (tile.type < 0
                    // || tile.type >= bubblecolors
                ) {
                    BStiles[i][j].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture;
                    BStiles[i][j].visible = true;
                    //continue;
                }else{

                    BStiles[i][j].texture = SpritePool.getInstance().get(bbArr[tile.type]).texture;
                    BStiles[i][j].visible = true;
                    // if(dm) console.log("~ ~ level.tiles[i][j]:"+level.tiles[i][j].type);
                    // if(dm) console.log("~ ~ level.tiles[i]:"+i);
                    // if(dm) console.log("~ ~ level.tiles[j]:"+j);
                    // if(dm) console.log("~ ~ bbArr[tile.type]:"+bbArr[tile.type]);
                    switch(tile.type) {
                        case bbDic.addball:
                            var itm = itemAddArr[tile.idadd];    //loadLevelSetSpr
                            //BStiles[i][j].idadd = itemAddArrIdx;    //loadLevelSetSpr
                            SpinePlay(itm.spn,null,null, "item_thunder_idle2", 0, true);
                            //itemAddArrIdx+=1;
                            break;
                        case bbDic.fuel: //loadLevelSetSpr(). level.tiles[i][j].type이 연료
                            var itm = itemFuelArr[tile.idfuel];    //loadLevelSetSpr
                            //BStiles[i][j].idfuel = itemFuelArrIdx;    //loadLevelSetSpr  
                            SpinePlay(itm.spn,null,null, "item_thunder_idle2", 0, true);
                            //itemFuelArrIdx+=1;
                            break;
                        case bbDic.star: //loadLevelSetSpr(). level.tiles[i][j].type이 별속성
                            var itm = itemStarArr[tile.idstar];    //loadLevelSetSpr
                            if(dm) console.log("~ ~ itemStarArr[tile.idstar]:"+tile.idstar);
                            //BStiles[i][j].idfuel = itemFuelArrIdx;    //loadLevelSetSpr  
                            SpinePlay(itm.spn,null,null, "item_star_idle2", 0, true);
                            //itemFuelArrIdx+=1;
                            break;
                        default:
                            //BStiles[i][j].idfuel=-1;
                            //BStiles[i][j].idadd=-1;
                            break;
                    } //sw
                } //if (tile.type
            }//BStilesMask[i][j]
            
        } //for j
    } //for i
    
    //버블아이템스파인 나머지 처리
    //참고 itemStarArr //itemFuelArr //itemAddArr //spnStar //spnFuel //spnAddBall //사용하고 나머지 하이드
//    여긴별아이템    
//    var istarlen=itemStarArr.length;
//    for (var sc=0; sc<istarlen; sc++) {
//        SpinePlay(itemStarArr[sc].spn,null, null, "empty", 0, true);
//    }
 
    //안사용하는 add,fuel을 하이드 시킨다.(확인사살)
    if(dm) console.log("~ ~ itemAddArrIdx:"+itemAddArrIdx);
    if(dm) console.log("~ ~ itemFuelArrIdx:"+itemFuelArrIdx);
    var iaddlen =itemAddArr.length;
    for (var sc=itemAddArrIdx; sc<iaddlen; sc++) {
        SpinePlay(itemAddArr[sc].spn, null, null, "empty", 0, false); //loadspr
    }  
    var ifuellen =itemFuelArr.length;
    for (var sc=itemFuelArrIdx; sc<ifuellen; sc++) {
        SpinePlay(itemFuelArr[sc].spn, null, null, "empty", 0, false);
    }   
    
    //피날레 스프라이트 만들기
    var BSfinaleInitX = 366-level.tilewidth/2; //중앙기준이므로 공왼쪽모퉁이로 마춰줌
    var BSfinaleInitY = 1049-level.tileheight/2; //중점기준이므로 공왼쪽모퉁이로 마춰줌
    for (var i = 0; i < BSfinaleCount; i++) {
        BSfinale[i] = SpriteLoad(contBS, bbArr[bbDic.empty], BSfinaleInitX, BSfinaleInitY, 0.0, 0.0);
    }
    //버블아이템스파인 나머지 처리
    //sGameMainUI.alpha=0.5;
    
    //debug_GridAttr();
    //debug_GridSpineAttr();
}
function showItemBubble(){
    var istarlen=itemStarArr.length;
    for (var sc=0; sc<istarlen; sc++) {
        SpinePlay(itemStarArr[sc].spn,null, null, "item_star_idle2", 0, true);
        
    }
    var iaddlen =itemAddArr.length;
    for (var sc=0; sc<iaddlen; sc++) {
        if(dm) console.log("~ ~ objadd:"+sc);
        SpinePlay(itemAddArr[sc].spn, null, null, "item_thunder_idle2", 0, true);//show
        
//        itemAddArr[sc].visible = false;
//        itemAddArr[sc].alpha = 0;
    }  
    var ifuellen =itemFuelArr.length;
    for (var sc=0; sc<ifuellen; sc++) {
        if(dm) console.log("~ ~ objfuel:"+sc);
        SpinePlay(itemFuelArr[sc].spn, null, null, "item_thunder_idle2", 0, true);
//        itemFuelArr[sc].visible = false;
//        itemFuelArr[sc].alpha = 0;
    }      
}
function hideItemBubble(){
    var istarlen=itemStarArr.length;
    for (var sc=0; sc<istarlen; sc++) {
        SpinePlay(itemStarArr[sc].spn,null, null, "empty", 0, false);
    }
    var iaddlen =itemAddArr.length;
    for (var sc=0; sc<iaddlen; sc++) {
        //if(dm) console.log("~ ~ objadd:"+sc);
        SpinePlay(itemAddArr[sc].spn, null, null, "empty", 0, false); //hide
//        itemAddArr[sc].visible = false;
//        itemAddArr[sc].alpha = 0;
    }  
    var ifuellen =itemFuelArr.length;
    for (var sc=0; sc<ifuellen; sc++) {
        //if(dm) console.log("~ ~ objfuel:"+sc);
        SpinePlay(itemFuelArr[sc].spn, null, null, "empty", 0, false);
//        itemFuelArr[sc].visible = false;
//        itemFuelArr[sc].alpha = 0;
    }      
}

function initLevelShift() {
    for (var i = 0; i < level.columns; i++) { //21
        for (var j = 0; j < level.rows; j++) { //21
            level.tiles[i][j].shiftx = 0;
            level.tiles[i][j].shifty = 0;
        }
    }
}
//그리드 속성 회전(한번에)
var Rot = {
    Right: 300,
    Left: 60
};
var ws=level.tilewidth * 0.5;
var hs=level.tileheight * 0.5;

function rotateLevel(rotVal) {
    //속성임시배열초기화
    for (var i = 0; i < level.columns; i++) { //21
        for (var j = 0; j < level.rows; j++) { //21
            level.tilesBak[i][j].type=-1;
            level.tilesBak[i][j].idadd=-1;
            level.tilesBak[i][j].idfuel=-1;
            level.tilesBak[i][j].idstar=-1;
        }
    }
    //회전 후, tilesBak에 저장
    for (var i = 0; i < level.columns; i++) { //21
        for (var j = 0; j < level.rows; j++) { //21
            var sourc = level.tiles[i][j];
            if (sourc.type > -1) {
                var xy = rotateGrid(i, j, rotVal); //그리드1 회전
                var tilebk = level.tilesBak[xy.x][xy.y];
                tilebk.type = sourc.type; //배열에 저장
                tilebk.idadd = sourc.idadd;
                tilebk.idfuel = sourc.idfuel;
                tilebk.idstar = sourc.idstar;

                //if(dm) console.log("source:"+i+","+j+", rot:"+xy.x +", "+xy.y +", att:"+ att );
            }
        }
    }
    //회전 저장한 값을 복원(복사)
    var idadd=0;//그냥 인덱스순서는 무시하고 갯수만 맞추려고 하는 인덱스
    var idfuel=0;
    var idstar=0;
    for (var i = 0; i < level.columns; i++) {
        for (var j = 0; j < level.rows; j++) {
            if(BStilesMask[i][j]){
                //var index = level.tilesBak[i][j].type; //백업배열(회전계산된) -> 배열
                var tilbk = level.tilesBak[i][j]; //백업배열(회전계산된) -> 배열 //tilbk.type
                var tilsour = level.tiles[i][j];
                tilsour.type = tilbk.type;
                tilsour.idadd = tilbk.idadd;
                tilsour.idfuel = tilbk.idfuel;
                tilsour.idstar = tilbk.idstar;
                //var co = getTileCoordinate(i, j); //타일월드좌표
                var centerx = tilsour.initx + ws;       //position.x 절대좌표값 + 중앙delta값 //co.tilex + level.tilewidth / 2;
                var centery = tilsour.inity + hs;
                tilsour.centerangle = getAngle(
                    level.midxCenter, //level.midx,
                    level.midyCenter, //level.midy,
                    centerx,
                    centery
                );

                if (tilbk.type < 0
                    // || tilbk.type >= bubblecolors
                ) {
                    BStiles[i][j].texture = SpritePool.getInstance().get(bbArr[bbDic.empty]).texture; //빈배열 채우기
                    BStiles[i][j].visible = true;
                    //메모리 아끼려고 추가버블,연료아이템 이렇게 처리
    //                BStiles[i][j].idadd=-1;
    //                BStiles[i][j].idfuel=-1;
                    //continue;
                }else{
                    BStiles[i][j].texture = SpritePool.getInstance().get(bbArr[tilbk.type]).texture; //속성배열 채우기
                    BStiles[i][j].visible = true;

                    //메모리 아끼려고 추가버블,연료아이템 이렇게 처리
                    if(tilbk.type==bbDic.addball){
    //                    BStiles[i][j].idfuel=-1;
    //                    BStiles[i][j].idadd=idadd; //새로운 위치에 다시 입력
                        itemAddArr[tilbk.idadd].x=BStiles[i][j].x+ws;
                        itemAddArr[tilbk.idadd].y=BStiles[i][j].y+hs;
                        idadd+=1;
                    }else if(tilbk.type==bbDic.fuel){
    //                    BStiles[i][j].idfuel=idfuel; //새로운 위치에 다시 입력
    //                    BStiles[i][j].idadd=-1;
                        itemFuelArr[tilbk.idfuel].x=BStiles[i][j].x+ws;
                        itemFuelArr[tilbk.idfuel].y=BStiles[i][j].y+hs;
                        idfuel+=1;
                    }else if(tilbk.type==bbDic.star){ //rotateLevel
                        itemStarArr[tilbk.idstar].x=BStiles[i][j].x+ws;
                        itemStarArr[tilbk.idstar].y=BStiles[i][j].y+hs;
                        idstar+=1;
                    }
                }
            }//BStilesMask[i][j]
            
        }
    }
    //debug_GridAttr();//회전시
    //debug_GridSpineAttr();
} //rotateLevel(rotVal)

//그리드 속성 회전(deltaTime)
//속성그리드의 shiftx,shifty값으로 이동을 시켜, 속성을 그대로 인데, 텍스쳐만 이동하여 렌더링을 한다.
//이동이 완료되면 shiftx,shifty값으로 초기화하고, rotateLevel(각도)로 실제 속성그리드 회전을 한다.
var d_rotx = -1;
var d_roty = -1;

function rotateAniLevel(rotVal) {
    //속성임시배열초기화
    for (var i = 0; i < level.columns; i++) { //21
        for (var j = 0; j < level.rows; j++) { //21
            level.tilesBak[i][j].type = -1;
        }
    }
    //회전 후, tilesBak에 저장
    for (var i = 0; i < level.columns; i++) { //21
        for (var j = 0; j < level.rows; j++) { //21
            var att = level.tiles[i][j].type;
            if (att > -1) {
                //var xy = rotateGrid(i, j, rotVal);      //그리드1 회전
                //미리저장된 중심피봇을 기준으로 각도만큼 회전
                if (d_rotx == -1) d_rotx = i;
                if (d_roty == -1) d_roty = j;
                var rotV = rotateAniGrid(i, j, rotVal);
                level.tiles[i][j].shiftx = rotV[0] - level.tiles[i][j].pivotx;
                level.tiles[i][j].shifty = rotV[1] - level.tiles[i][j].pivoty;
                //BStiles[i][j].x = rotV[0];
                //BStiles[i][j].y = rotV[1];
                //if(d_rotx==i && d_roty==j) if(dm) console.log("grid[]:"+i+","+j+", rotv:"+rotV[0] +", "+rotV[1] +", att:"+ att );
                //level.tilesBak[xy.x][xy.y].type = att;  //배열에 저장

            }
        }
    }
} //rotateAniLevel(rotVal)


function rotateGrid(grX, grY, rotV) //그리드xy, 회전각도 --> 그리드x`,y`
{
    //var co = getTileCoordinate(grX, grY); //타일월드좌표
    var px = level.tiles[grX][grY].initx + level.tilewidth * 0.5; //position.x 절대좌표값 + 중앙elta값//co.tilex + level.tilewidth * 0.5; //타일중심 월드좌표
    var py = level.tiles[grX][grY].inity + level.tileheight * 0.5;                                 //co.tiley + level.tileheight * 0.5;

    var rv = rotateFromPos(
        level.midxCenter,
        level.midyCenter,
        px,
        py,
        rotV
    ); //중점기준으로 회전[0,1]로 값을 계산해서 넘겨줌

    return getGridPosition(rv[0], rv[1]); //회전된 위치값{x:,y:}을 그리드로
}
//회전업데이트회전
function rotateAniGrid(grX, grY, rotV) //그리드xy, 회전각도 --> 그리드x`,y`
{
    //var co = getTileCoordinate(grX, grY);      //타일월드좌표
    //var px = co.tilex+level.tilewidth*0.5;      //타일중심 월드좌표
    //var py = co.tiley+level.tileheight*0.5;
    var px = level.tiles[grX][grY].pivotx;
    var py = level.tiles[grX][grY].pivoty;
    var rv = rotateFromPos(
        level.midxCenter,
        level.midyCenter,
        px,
        py,
        rotV
    ); //중점기준으로 회전
    return rv; //회전된 위치값을 그리드로
}

//    function createLevel() //Old레벨생성 //사용안함
//    {
//        if(dm) console.log("--createLevel()--midxy:"+level.midGridx+","+level.midGridy);
//        
//        var xMin=1;
//        var yMin=1;
//        var xMax=level.columns-2;
//        var yMax=level.rows-2;
//        
//        //var debs="";
//        // Create a level with random tiles
//        for (var j=0; j<level.rows; j++) {                                          //0~13 //rows=14
//            var randomtile = randRange(0, bubblecolors-1);                          //0~6, //bubblecolors=7
//            var count = 0;
//            for (var i=0; i<level.columns; i++) {                                   //0~14 //colums=15
//                //1줄당 공2개 동일색 쌍으로 생성 되게 끔
//                if (count >= 2*2) {//고유색 생성된 공의 갯수 2이상이면
//                    // Change the random tile
//                    var newtile = randRange(0, bubblecolors-1);                     //0~6, //bubblecolors=7
//                    // Make sure the new tile is different from the previous tile
//                    if (newtile == randomtile) {
//                        newtile = (newtile + 1) % bubblecolors;                     //0+1%7=>1 6+1%7=>0
//                    }
//                    randomtile = newtile;
//                    count = 0;
//                }
//                count++; //같은 색상으로 0~1까지 2개까지 증가
//                
//                //한줄채우기
//                //if (j < 1)                                             //0~6 //level.rows/2=7
//                
//                //절반채우기    
//                //if (j < level.rows/2)                                             //0~6 //level.rows/2=7
//                
//                //지정한 만큼만
//                //if(j < usedRows)
//                
//                //19x19 가용영역에서 18x18만 생성
//                if(j>yMin+1 && j<yMax-1 && i>xMin+5 && i<xMax-5  )    
//                {
//                    level.tiles[i][j].type = randomtile;
//                    
//                    //생성시 초기화
//                    var tile = level.tiles[i][j];
//                    tile.alpha = 1;
//                    //level.tiles[i][j].shift = 0;
//                    tile.shiftx = 0;
//                    tile.shifty = 0;
//                    tile.centerangle = 0;
//                    tile.velocity = player.bubble.dropspeed;
//                    //생성시 초기화
//                    
//                    //debs+="i:"+i+",j:"+j+",t:"+randomtile+", ";
//                } else {
//                    level.tiles[i][j].type = -1;
//                    //debs+="i:"+i+",j:"+j+",t:-, ";
//                }
//            }
//            //debs+="\n";
//        }
//        
//        //if(dm) console.log("--createLevel()--\n"+debs);
//    }

var firstRed=true;

var oldexistcolornext = 0;
var oldexistcolornext2 = 0;

// Create a random bubble for the player
function nextBubble() {
    if(dm) console.log("--nextBubble()--");

    //--------맵에 존재하는 색으로 교체--------
    player.tiletype = player.nextbubble.tiletype;
    existingcolors = findColors(); //레벨1에서 사용된 색들(중복없는 색 배열)
    var bubbletype = bbDic.red; //1로 초기화

    ExistColorCount = existingcolors.length;

    var isExist = false;
    if (existingcolors.length > 0) {
        for(var i=0; i<existingcolors.length; i++){
            if(player.tiletype == existingcolors[i]) {//사용된 색 중에서 1개
                isExist = true;
            }
        }
    }
    if(!isExist){//없는색이 플레이어버블로 올라갈 예정
        if (existingcolors.length > 0) player.nextbubble.tiletype = existingcolors[0]; //레벨에 있는 색으로
        else player.nextbubble.tiletype = bbDic.red;
    }
    //--------맵에 존재하는 색으로 교체--------

    // Set the current bubble
    player.tiletype = player.nextbubble.tiletype;
    player.bubble.tiletype = player.nextbubble.tiletype;
    player.bubble.x = player.x;
    player.bubble.y = player.y;
    
    for (var n = 0; n < navCount; n++) {
        //sprNav[n].alpha = 0.1;
        //sprNav[n].tint = bbDicTint[0];
        sprNav[n].tint = bbDicTint[player.bubble.tiletype];
    }

    //player.bubble.visible = true;
    player.bubble.visible = false; //평상시 스파인버블 보이기에 shoot할때 버블을 true, next는 버블을 false로

    mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]); //next

    
        
    // Get a random type from the existing colors
    if (nextcolor2 == undefined) nextcolor2 = getExistingColor();
    nextcolor = nextcolor2; //레벨1 존재하는 공의 색으로
    nextcolor2 = getExistingColor(); //레벨1 존재하는 공의 색으로

//    //다음 공들이 맵에 배치 안되어 잇으면 강제로 색변경한다.
//    var ccnt = existingcolors.length;
//    if(ccnt>0){
//        var chknext=false;
//        var chknext2=false;
//        for (var i = 0; i < len; i++) {
//            if(existingcolors[i]==nextcolor2) chknext2=true;
//            if(existingcolors[i]==nextcolor) chknext=true;
//        }
//        if(!chknext){ //존재하는 버블색중에 없으면 강제 생성
//            nextcolor=existingcolors[0];    
//        }
//        if(!chknext2){//존재하는 버블색중에 없으면 강제 생성
//            nextcolor2=existingcolors[ccnt-1];    
//        }
//    }    
    
    
    //플레이어 칼라가 덮어쓰기 전 상태
    if(existingcolors.length>1
       && nextcolor==player.nextbubble.tiletype
       && nextcolor2==player.nextbubble.tiletype)
    {
        if(existingcolors.length==2){
            nextcolor2 = existingcolors[0]==nextcolor2?existingcolors[1]:existingcolors[0];
        }else if(ExistColorCount==3){
            nextcolor2 = existingcolors[0]==nextcolor2?existingcolors[1]
            :existingcolors[1]==nextcolor2?existingcolors[2]
            :existingcolors[0];
        }else{
            nextcolor2 = getExistingColor();
        }
    }

    


    


    // Set the next bubble
    player.nextbubble.tiletype = nextcolor;

    

    //업데이트에서 여기로 옮김
    SprPlayerBubble.texture = SpritePool.getInstance().get(bbArr[player.tiletype]).texture;
    //SprPlayerBubbleNext.texture =  SpritePool.getInstance().get(bbArr[nextcolor]).texture;
    //업데이트에서 여기로 옮김

    //-하단메뉴-다음버블0
    if(dm) console.log("-- nextcolor:" + nextcolor + ", nextcolor2" + nextcolor2);
    mainmenuBottomBall5[0].texture = SpritePool.getInstance().get(bbArr[nextcolor]).texture;
    mainmenuBottomBall5[1].texture = SpritePool.getInstance().get(bbArr[nextcolor2]).texture;
    var len = mainmenuBottomBall5.length;
    for (var i = 0; i < len; i++) { // i=0은 가진공 2번째공
        if (player.ballcount < i + 2) //가진 공 갯수만큼만 보이고, 나머진 숨기기
        {
            if (mainmenuBottomBall5[i].visible == true)
                mainmenuBottomBall5[i].visible = false;
        } else {
            if (mainmenuBottomBall5[i].visible == false)
                mainmenuBottomBall5[i].visible = true;
        }

    }

    //-하단메뉴-다음버블1
}
//    function nextBubbleNot_Buster()
//    {
//        player.bubble.x = player.x;
//        player.bubble.y = player.y;
//        player.bubble.visible = true;
//        SprPlayerBubble.texture =  SpritePool.getInstance().get(bbArr[player.tiletype]).texture;
//    }
var existingcolors=[];
// Get a random existing color

function getExistingColor() {
    //원래로컬인데...사용하려고 전역으로 뺌
    existingcolors = findColors(); //레벨1에서 사용된 색들(중복없는 색 배열)
    var bubbletype = bbDic.red; //1로 초기화
    
    ExistColorCount = existingcolors.length;
        
    if (existingcolors.length > 0) {
        bubbletype = existingcolors[randRange(0, existingcolors.length - 1)]; //사용된 색 중에서 1개
    }
    
    var s = convertStr2Arr1D(existingcolors);
    if(dm) console.log("getExistingColor: " + bubbletype + ", color:" + s);
    
    if(firstRed){
        if(kData.curLevel+1==1 || kData.curLevel+1==2){
            bubbletype=1;
//            player.tiletype=1;
//            player.bubble.tiletype=3;
//            player.nextbubble.tiletype=3;
            firstRed = false;
        }
    } 
    return bubbletype;
}

// Get a random int between low and high, inclusive
function randRange(low, high) {
    return Math.floor(low + Math.random() * (high - low + 1));
}

// Shoot the bubble
function shootBubble() {

    //bool형으로 변경해서 주석처리
    //if(delaycountStoneCreation>0){ //광고봤을때 3개중1개 카운트만큼 딜레이주려고
    //    delaycountStoneCreation-=1;
    // }
    //bool형으로 변경해서 주석처리
    
    for (var n = 0; n < navCount; n++) {
        sprNav[n].alpha = 0.1;
        sprNav[n].tint = bbDicTint[0];
        //sprNav[n].tint = bbDicTint[player.bubble.tiletype];
    }
    
    if(player.busterpre){ //스파인이 버스터로 미리 변경되어져 잇음
        player.buster = true; //쏘는 순간에 버스터 속성 켠다  
        SpinePlay(SpinePlayerBubble, null, null, BusterAni.idle, 1, true);
    } 
    
    // Shoot the bubble in the direction of the mouse
    //발사!! 플레이어 위치, 각도가 버블로 복사되는 타이밍
    player.bubble.x = player.x;
    player.bubble.y = player.y;
    player.bubble.angle = player.angle;
    player.bubble.tiletype = player.tiletype;

    SpinePlay(mainPlayer, null, null, AniShip.fire, 7, false, SPINE_INIT_NONE);
    player.bubble.visible = true; //nextBubble()안에 있던걸 옮겨줌
    mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[0]); //null

    //볼카운트처리
    usedballcounter += 1;
    player.ballcount -= 1;
    tx_remainBall.text = player.ballcount; //shoot
    SpinePlay(
        spnRemain, null, null, 
        AniRemain.run,// current ani
        NextAniRemain.normal, //goto state
        false
    );    
    //볼카운트처리


    dtBBSpineCluster = 0;
    bBBSpineCluster = true;
    bBBSpineFloating = false;

    if(dm) console.log("shootBubbleXY:" + player.bubble.x + "," + player.bubble.y + ", ballcount:" + player.ballcount + ", used:" + usedballcounter);
    // Set the BSstate_
    setBSstate_(BSstates.shootbubble);
    shoot_once = true;
}

// Check if two circles intersect
//--------------------------공A중심xy, 공A반지름, 공B중심xy, 공B반지름
function circleIntersection(x1, y1, r1, x2, y2, r2) {
    // Calculate the distance between the centers
    var dx = x1 - x2;
    var dy = y1 - y2;
    var len = Math.sqrt(dx * dx + dy * dy);

    if (len < r1 + r2) {
        // Circles intersect
        return true;
    }

    return false;
}

// Convert radians to degrees
function radToDeg(angle) {
    return angle * (180 / Math.PI);
}

// Convert degrees to radians
function degToRad(angle) {
    return angle * (Math.PI / 180);
}

function moveToAngle(angle, dist) {
    var ret = [0, 0];
    ret[0] = dist * Math.cos(degToRad(angle));
    ret[1] = dist * -1 * Math.sin(degToRad(angle));
    return ret;
}

function getAngle(centerX, centerY, X, Y) {
    //   (0,0)+---+
    //        |   |
    //        +---+(625,625)
    var mouseangle = radToDeg(Math.atan2(centerY - Y, X - centerX));
    //              (90)
    //          179  |    
    //      (-180)--중심--(0) Math.floor(mouseangle)시
    //          -179 |
    //             (-90)

    //if (mouseangle < 0) { mouseangle = 180 + (180 + mouseangle); }
    //수정        
    while (mouseangle < 0) {
        mouseangle = 360 + mouseangle;
    }
    //수정        
    while (mouseangle > 360) {
        mouseangle = mouseangle - 360;
    }
    //               (90)
    //                 |    
    //         (180)--중심--(0) Math.floor(mouseangle)시
    //                 |
    //               (270)

    return mouseangle;
}

// On mouse movement
function onMouseMove(e) {
    // Get the mouse position
    //   (0,0)+----------------+
    //        |                |
    //        |                |
    //        |      +(294,565)|
    //        +----------------+(625,625)
    var pos = getMousePos(canvas, e);

    // Get the mouse angle
    var mouseangle = radToDeg(Math.atan2((player.y + level.tileheight / 2) - pos.y, pos.x - (player.x + level.tilewidth / 2)));
    //        radToDeg: 결과
    //              (90)
    //          179  |    
    //      (-180)--중심--(0) Math.floor(mouseangle)시
    //          -179 |
    //             (-90)

    //마이너스 보간 // Convert range to 0, 360 degrees
    if (mouseangle < 0) {
        mouseangle = 180 + (180 + mouseangle);
    }
    //        mouseangle: 1차 변환 결과
    //               (90)
    //                 |    
    //         (180)--중심--(0) Math.floor(mouseangle)시
    //                 |
    //               (270)
    //        if(dm) console.log("convert Angle: "+ mouseangle);                                 //0 ~ 360

    //최대,최소 크롭 // Restrict angle to 8, 172 degrees
    var lbound = 8;
    var ubound = 172;
    if (mouseangle > 90 && mouseangle < 270) {
        // Left
        if (mouseangle > ubound) {
            mouseangle = ubound;
        }
    } else {
        // Right
        if (mouseangle < lbound || mouseangle >= 270) {
            mouseangle = lbound;
        }
    }
    //        mouseangle: 2차 변환 결과
    //               (90)
    //                 |    
    //         (172)--중심--(2)
    //        if(dm) console.log("player.anngle: "+ mouseangle);
    // Set the player angle

    player.angle = mouseangle; //crop min:8, max:172
    

}

//    // On mouse button click
//    function onMouseDown(e) {
//        // Get the mouse position
//        var pos = getMousePos(canvas, e);
//        
//        if (BSstate_ == BSstates.ready) {
//            if(dm) console.log("--player.angle:"+player.angle+"--------------------------");
//            shootBubble();
//        } else if (BSstate_ == BSstates.gameover) {
//            newGame();
//        }
//    }

// Get the mouse position
function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: Math.round((e.clientX - rect.left) / (rect.right - rect.left) * canvas.width),
        y: Math.round((e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height)
    };
}

// Call init to start the game
//init();
//};