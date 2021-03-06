/**
 * Created by ggumak on 2017-02-28.
 */
var GAME = GAME || {};

GAME.table_language = undefined;//언어 테이블
GAME.ui_message = undefined;//message Popup
GAME.ui_gemShop = undefined;//gem shop
GAME.ui_ranking = undefined;

GAME.bonusGemCnt = 3;//게임 오버창에서 보너스로 주는 보석의 수.
GAME.bonusCool = 60*30;//보너스 쿨타임...(seconds)

GAME.ranking_startY = 20;//

GAME.buttonShield = undefined;//

GAME.language = "en";//"kr", "jp"

GAME.fontName = {
    kr:"Apache",
    en:"Apache",
    jp:"BOKUTACHI"
};

GAME.webFontName = {
    ko:"Apache",
    en:"Apache",
    ja:"BOKUTACHI"
};

GAME.payType = {
    cash: 0,
    ad: 1,
    point: 2
};

GAME.curServerTime = 0;

GAME.blockType = {
    NORMAL: 10,
    SHELTER: 20,
    START: 30//이어하기 용...
};

//펭귄 상태...혼란/파워업
GAME.pengType = {
    normal: "_normal",
    chaos: "_chaos",
    power: "_power",
    baby_1: "_baby_1",
    baby_2: "_baby_2",
    baby_3: "_baby_3",
    baby_4: "_baby_4"
};

//////////////////////////////////////
GAME.engine = undefined;
GAME.view = undefined;
GAME.penguin = undefined;
GAME.gimmickManager = undefined;
GAME.mapManager = undefined;

/////document event에서 쓸 전역 변수....////
var screenWidth = undefined;
var halfScreenWidth = undefined;

/**
 * 방향 enum
 * */
GAME.dir = {
    right : 0,
    left : 1
};

/**
 * 배경 색 변환(반복 패턴에 쓸 변수 모음)
 * */
GAME.interval = 200;//반복 간격.
GAME.flag_routine = 3;//반복의 기준이 되는 카운트 예)3이면 3번에 한번 씩 처음으로 되돌아 간다는 의미.
GAME.loopCount = 0;//routine이 몇 번 반복 되었는지 체크...
GAME.tick = 1;//첫 상태는 1로 정함. tick 1로 시작.

GAME.changeRoutine = function (compareValue) {
    if(compareValue >= ((GAME.interval*GAME.tick)+(GAME.flag_routine*GAME.interval)*GAME.loopCount)){
        GAME.tick++;
        if(GAME.tick > GAME.flag_routine){
            GAME.tick = 1;
            ++GAME.loopCount;
        }
        /**
         * routine callback or logic 을 넣어 준다.
         * */
        switch(GAME.tick){
            case 1://낮
                // console.log("call day1");
                sprMoon.visible = false;
                sprStar.visible = false;
                sprBG_sunset.visible = false;
                TweenMax.to(sprBG_night, 2, {alpha:0});
                break;
            case 2://저녁
                // console.log("call day2");
                sprBG_sunset.visible = true;
                sprBG_sunset.alpha = 0;
                TweenMax.to(sprBG_sunset, 2, {alpha:1});
                break;
            case 3://밤
                // console.log("call day3");
                sprMoon.visible = true;
                sprStar.visible = true;
                sprBG_night.visible = true;
                sprBG_night.alpha = 0;
                TweenMax.to(sprBG_night, 2, {alpha:1});
                break;
        }
    }
};

/**
 * 최고 기록 선정 카운트
 * */
GAME.sprFlag_00 = undefined;//깃발 스프라이트
GAME.sprFlag_01 = undefined;//갈림길용 깃발 스프라이트
GAME.check_blockNum = 0;//최고기록 스프라이트/ 구름 알림판 에서 사용.

/**
 * 펭귄 이모티콘 케이스 정리
 * */
GAME.exclamation = "1";//느낌표.
GAME.question = "2";//물음표.
GAME.skeleton = "3";//해골.
GAME.wing = "4";//날개.
GAME.power = "5";//파워업.
GAME.chaos = "6";//혼란.
GAME.question_reverse = "7";//물음표 반전..

GAME.waitForInputTime = 0;//입력 대기시간
GAME.waitForInputFlag = 5;//second, 물음표 스파인 띄울 시간.

/**
 * 구름 알림판
 * */
GAME.sp_cloudAlert = undefined;
GAME.cloud_interval = 50;//50칸 마다 한번씩...
GAME.arr_alertBlocks = [];//구름 알림판의 기준이 될 위치와 카운트?

/**
 * 점수 갱신 관련
 * */
GAME.sp_newScore = undefined;
GAME.bRenewHighScore = false;

/**
 * game save tick
 * */
GAME.flag_saveTick = 10;
GAME.saveTick = 0;

/**
 * 랜덤 아이템 관련...
 * */
GAME.itemType = {
    power:0,
    chaos:1,
    gem:2,
    nothing:3
};

GAME.chaosTime = 0;//혼란 시간...(seconds)
GAME.flagChaosTime = 5;//혼란 최대 시간...(seconds)
GAME.powerTime = 0;//파워 업 시간...(seconds)
GAME.flagPowerTime = 5;//파워업 최대 시간...(seconds)

/**
 * gimmick Type 정리....
 * */
GAME.gimmick_type = {
    TYPE_GEM : 100,
    TYPE_NORMAL_OBS : 200,
    TYPE_RANDOM_OBS : 300,
    TYPE_SEA : 400,
    TYPE_POWER : 500,
    TYPE_CHAOS : 600,
    TYPE_EGG : 700
};

/**
 * block 구조 변경 작업.
 * */
GAME.arr_blocks = [];
GAME.iMaxBlockCnt = 200;
GAME.iCurBlockIdx = 0;
GAME.arr_blocks.length = GAME.iMaxBlockCnt;//push가 배열의 length property에 맞춰 동작해 인덱스 70부터 들어감....

GAME.getBlock = function () {
    ++GAME.iCurBlockIdx;
    if(GAME.iCurBlockIdx===GAME.iMaxBlockCnt) GAME.iCurBlockIdx = 0;
    return GAME.arr_blocks[GAME.iCurBlockIdx];
};

GAME.arr_invincibile = [];//무적블록 풀...
GAME.iMaxInvincibileCnt = 8;
GAME.iCurInvincibileCnt = 0;
GAME.arr_blocks.length = GAME.iMaxInvincibileCnt;

GAME.getInvincibile = function () {
    ++GAME.iCurInvincibileCnt;
    if(GAME.iCurInvincibileCnt===GAME.iMaxInvincibileCnt) GAME.iCurInvincibileCnt = 0;
    // console.log("index: "+GAME.iCurInvincibileCnt);
    return GAME.arr_invincibile[GAME.iCurInvincibileCnt];
};


/**
 * gimmick 구조 변경 작업.
 * */
GAME.arr_gimmicks =[];
GAME.iMaxGimmickCnt = 40;
GAME.iCurGimmickIdx = 0;
GAME.arr_gimmicks.length = GAME.iMaxGimmickCnt;

GAME.arr_jumpBlocks = [];//고래 꼬리로 점프하는 애들만 모으는 배열..
GAME.gimmickBlockIdx = 0;//기믹생성 플래그 변수..

GAME.getGimmick = function () {
    ++GAME.iCurGimmickIdx;
    if(GAME.iCurGimmickIdx===GAME.iMaxGimmickCnt) GAME.iCurGimmickIdx = 0;
    return GAME.arr_gimmicks[GAME.iCurGimmickIdx];
};

/**
 * 아기 펭귄 pool
 * */
GAME.arr_babies = [];//모든 아기펭귄 집합.
GAME.iMaxBabyCnt = 4;//아기 펭귄의 최대 수.
GAME.iSpareBabyCnt = 4;//여분의 아기 펭귄 수.
GAME.iCurBabyCnt = 0;
GAME.arr_babies.length = GAME.iMaxBabyCnt+GAME.iSpareBabyCnt;
GAME.babyIndex = 0;

GAME.arr_pengGroup = [];//기본 펭귄과 아기 펭귄의 그룹 배열.
GAME.arr_waitBabies = [];//따라가길 기다리는 아기펭귄.

GAME.getBaby = function () {
    /**
     * check in pengGroup
     * */
    var bGet = false;
    while(!bGet){
        bGet = true;
        for(var i=0;i<GAME.arr_pengGroup.length;++i){
            if(GAME.arr_pengGroup[i]===GAME.arr_babies[GAME.babyIndex]) {
                bGet = false;
                break;
            }
        }

        if(!bGet){
            ++GAME.babyIndex;
            if(GAME.babyIndex===GAME.arr_babies.length) GAME.babyIndex = 0;
        } else {
            return GAME.arr_babies[GAME.babyIndex];
        }
    }
};

/**
 * 펭귄 점프 관련
 * */
GAME.jump_targetBlock = undefined;//Jump 뛸 때 타겟이 되는 블럭.
GAME.jump_BlockCnt = 25;//고래 점프로 이동하는 블럭의 수.

/**
 * 아이템 상자 아이템별 출현 확률 정리.
 * */
GAME.item_nothing = 0.2;
GAME.item_chaos = 0.15;
GAME.item_gem = 0.2;
GAME.item_power = 0.45;

/**
 * 기타 등등..
 * */
GAME.showBonusGem = 0;//팁&보너스 팝업에서 보너스 보석 획득 확률.
GAME.shelterGem = 0;//쉼터에서 보석이 생성될 확률.
GAME.arr_depthInvincibile = [];//시작 쉼터에서 펭귄 이동에 따라 layer가 바뀔 블럭들...
GAME.sp_death_emoticon = undefined;//펭귄 죽음 연출 스파인.
// GAME.targetIdx = -1;//gimmick 고래꼬리의 타겟이 될 수 있는 블럭 인덱스. 이 블럭 위에는 gimmick이 생성되지 않는 걸로!
GAME.arr_targetIdx = [];//gimmick 고래꼬리의 타겟이 될 수 있는 블럭 인덱스 배열. 이 블럭 위에는 gimmick이 생성되지 않는 걸로!
GAME.targetIdx_cnt = 0;

GAME.first_sealCnt = 0;//게임을 켜고 처음 물개에 죽었을 때 무조건 물개에 대한 팁 팝업이 뜰지 말지 판단할 카운트.
GAME.first_chaosCnt = 0;//게임을 켜고 처음 혼란 상태로 죽었을 때 무조건 물개에 대한 팁 팝업이 뜰지 말지 판단할 카운트.

GAME.prev_pauseState = -1;//일시정지 상태에서 낙하산타고 내려오는 애니메이션이 뿌려지는 상태를 저장하는 변수. 이 변수에 따라..일시정지 창, 랭킹 창을 닫을 때 분기 처리를 함...



