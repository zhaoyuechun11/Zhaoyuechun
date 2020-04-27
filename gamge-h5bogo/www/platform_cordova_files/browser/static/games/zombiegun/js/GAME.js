/**
 * Created by ggumak on 2017-03-07.
 */
var GAME = GAME || {};

GAME.bMobile = false;
GAME.viewContainer = undefined;
GAME.gunData = undefined;

GAME.language = "en";//"kr"//"jp"
GAME.fontName = {
    kr:"HYSUPM",
    en:"HYSUPM",
    jp:"BOKUTACHI"
};

//////////table 정리//////////////////
GAME.table_modalMsg = undefined;
GAME.table_language = undefined;

GAME.tint_btn_disabled = 0x808080;
GAME.fill_txt_disabled = 0xa3a39e;
GAME.stroke_txt_disabled = 0x000000;

GAME.iMaxSizeX = 720;
GAME.iMaxSizeY = 1280;

GAME.iCenterSizeX = GAME.iMaxSizeX/2;
GAME.iCenterSizeY = GAME.iMaxSizeY/2;

GAME.state = {
    STATE_NONE : 0,
    STATE_TITLE : 100,
    STATE_GAME : 101,
    STATE_PAUSE : 102,
    STATE_OVER : 103,
    STATE_REPLAY : 104,
    STATE_TUTO : 105
};

GAME.gameState = {
    STATE_NONE : 0,
    STATE_PLAY : 201,
    STATE_UPSTAIR : 202,
    STATE_SPEEDUP : 203
};

GAME.bPushKeyboard = false;//keyboard 연속 눌림 방지
GAME.bPushKeyboard_left = false;
GAME.bPushKeyboard_right = false;
GAME.bGetButton = false;//ui버튼이 먼저 동작하게 하기 위한 변수

GAME.bShop = false;//사격장에서 총 쏘기 위한 변수
GAME.bChangeGun = false;

GAME.gunShopContainer = undefined;

GAME.showAdTerm = 900;//게임오버창에서 광고를 볼 수 있는 시간 쿨타임//단위 : 초
GAME.view = undefined;

GAME.curServerTime = 0;


//////////flag 종류 모음/////////
GAME.bPushKeyboard = false;//keyboard 연속 눌림 방지
GAME.bPushKeyboard_left = false;
GAME.bPushKeyboard_right = false;
GAME.bGetButton = false;//ui버튼이 먼저 동작하게 하기 위한 변수

GAME.bShop = false;//사격장인지 아닌지(총쏘기 위함)
GAME.bChangeGun = false;//총바꾸는 동안 총을 쏘지 못하게 하는 변수.
GAME.bContinue = false;//이어하기인지 아닌지....맵효과 뿌리기 용..
GAME.bPrevMapEff = false;//이어하기 전에 mapEff가
GAME.iPrevMapEff = -1;//이어하기 전 맵 효과 번호

GAME.bGetAll = false;
GAME.iNextGetGunNum = 0;//다음에 획득할 수 있는 총의 번호.1)최초게임시작/2)새로운 총 획득/3)총 구입 시 번호 갱신.
GAME.data_getNextGun = undefined;

// GAME.bPauseExit = false;//나가기 창 호출 상황이 일시정지인지 게임오버창인지 구분하기 위한 변수.

function checkNextGunSlot() {
    console.log("checkNextGunSlot");
    var i; var getCount = 0;
    for(i=0;i<kData.arrBuyRecords.length;++i){
        if(kData.arrBuyRecords[i]){
            ++getCount;
            if(getCount===kData.arrBuyRecords.length)
                GAME.bGetAll = true;
            continue;
        }
        GAME.iNextGetGunNum = i;
        GAME.data_getNextGun = GAME.gunData[i];
        break;
    }
}

function setUnlockGunData() {
    if(GAME.bGetAll) return;
    GAME.view.txt_buff_single.visible = false;
    GAME.view.txt_buff_0.visible = false;
    GAME.view.txt_buff_1.visible = false;

    var descNum = 0;
    var value = 0;
    GAME.view.txt_unlock_name.text = GAME.table_language[GAME.data_getNextGun.name][GAME.language];

    GAME.view.spr_gun.texture = PIXI.Texture.fromFrame("gun_shop_slot_"+(GAME.iNextGetGunNum+1).toString()+".png");

    for(i=0;i<2;++i){
        type = GAME.data_getNextGun["skill"+(i+1).toString()];
        if(type === -1) break;
        ++descNum;
    }

    switch (descNum){
        case 1:
            value = GAME.data_getNextGun.value1;
            GAME.view.txt_buff_single.text = GAME.table_language["gunbuff"+GAME.data_getNextGun.skill1.toString()][GAME.language];
            GAME.view.txt_buff_single.text = GAME.view.txt_buff_single.text.replace("{0}", value.toString());
            GAME.view.txt_buff_single.visible = true;

            switch(GAME.data_getNextGun.skill1){
                case 100://돈 획득량 증가.
                    GAME.view.txt_buff_single.style.fill = "#99CC00";
                    break;
                case 101://층 이동 요금 할인.
                    GAME.view.txt_buff_single.style.fill = "#FFCC00";
                    break;
                case 102://라이프 증가.
                    GAME.view.txt_buff_single.style.fill = "#0066FF";
                    break;
                case 103://라이프 감소.
                    GAME.view.txt_buff_single.style.fill = "#FF0000";
                    break;
            }
            break;
        case 2:
            value = GAME.data_getNextGun.value1;
            GAME.view.txt_buff_0.text = GAME.table_language["gunbuff"+GAME.data_getNextGun.skill1.toString()][GAME.language];
            GAME.view.txt_buff_0.text = GAME.view.txt_buff_0.text.replace("{0}", value.toString());
            GAME.view.txt_buff_0.visible = true;

            switch(GAME.data_getNextGun.skill1){
                case 100://돈 획득량 증가.
                    GAME.view.txt_buff_0.style.fill = "#99CC00";
                    break;
                case 101://층 이동 요금 할인.
                    GAME.view.txt_buff_0.style.fill = "#FFCC00";
                    break;
                case 102://라이프 증가.
                    GAME.view.txt_buff_0.style.fill = "#0066FF";
                    break;
                case 103://라이프 감소.
                    GAME.view.txt_buff_0.style.fill = "#FF0000";
                    break;
            }

            value = GAME.data_getNextGun.value2;
            GAME.view.txt_buff_1.text = GAME.table_language["gunbuff"+GAME.data_getNextGun.skill2.toString()][GAME.language];
            GAME.view.txt_buff_1.text = GAME.view.txt_buff_1.text.replace("{0}", value.toString());
            GAME.view.txt_buff_1.visible = true;

            switch(GAME.data_getNextGun.skill2){
                case 100://돈 획득량 증가.
                    GAME.view.txt_buff_1.style.fill = "#99CC00";
                    break;
                case 101://층 이동 요금 할인.
                    GAME.view.txt_buff_1.style.fill = "#FFCC00";
                    break;
                case 102://라이프 증가.
                    GAME.view.txt_buff_1.style.fill = "#0066FF";
                    break;
                case 103://라이프 감소.
                    GAME.view.txt_buff_1.style.fill = "#FF0000";
                    break;
            }
            break;
    }
}

function userGetNextGun() {
    // kData.arrBuyRecords[GAME.iNextGetGunNum] = true;
    checkNextGunSlot();
    // setUnlockGunData();
}
