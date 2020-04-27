//
// 번호                8
// 게임명              코즈믹팝
// 하트 보유 최대치     5
// 하트 초기 지급량     20
// 재화 초기지급량       0
// 하트 충전 시간(초)   600
// 아이템1 초기지급량	  0
// 아이템2 초기지급량	  0
// 아이템3 초기지급량	  0
// 하트 지급량-P       5
// 하트 지급량-S       5
// 하트 지급량-M       20
// 하트 지급량-L       60
// 하트 구매 가격-P    100
// 하트 구매 가격-S    100
// 하트 구매 가격-M    300
// 하트 구매 가격-L    500
// 재화 지급량-P
// 재화 지급량-S
// 재화 지급량-M
// 재화 지급량-L
// 재화 구매 가격-P
// 재화 구매 가격-S
// 재화 구매 가격-M
// 재화 구매 가격-L
// 버프 지급량-P
// 버프 지급량-S
// 버프 지급량-M
// 버프 지급량-L
// 버프 구매 가격-P
// 버프 구매 가격-S
// 버프 구매 가격-M
// 버프 구매 가격-L
var yahooIN=yahooIN||undefined;
if(typeof yahooIN === 'undefined') yahooIN=undefined;

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


var iMaxSizeX = 720;
var iMaxSizeY = 1280;
var iCenterSizeX = iMaxSizeX >> 1;
var iCenterSizeY = iMaxSizeY >> 1;
var ux = -iCenterSizeX; //링크시 벌어지는 컨테이터 피봇 옵셋 보간용
var uy = -iCenterSizeY;
var renderer = PIXI.autoDetectRenderer(iMaxSizeX, iMaxSizeY);

// yahooIN modifier : kook : 일본대응.
var filter = "win16|win32|win64|macintel|mac";
var bMobile = (filter.indexOf(navigator.platform.toLowerCase())<0);
//$('game_area').appendTo($('.container'));
var objDiv;
var strGamePath = strGamePath || "";

if(yahooIN != undefined) {
    objDiv = document.getElementById("game_area");
//	objDiv.style = "display:inline-block";
//	if (bMobile == false)
//		objDiv.style.width = "360px";
//	else {
//		objDiv.style.width = "100%";
//		objDiv.setAttribute("align", "center");
//	}
//	objDiv.style.height = "640px";
    objDiv.appendChild(renderer.view); // modifier : kook : 일본대응.
//	$("#game").css("height", "640px");
    $("#game_mask").css("background-image", "url(\"https://game.jp/img/Gameplaybg_0008.gif\")");
}

$(window).resize(resize);	// jquery를 사용한다.
window.onorientationchange = resize; // 화면이 리사이즈되면 리사이즈 함수를 콜한다.
resize(); // 최초 한번 리사이즈를 해주고 변동사항이 있을경우 리사이즈를 계속 해준다.

// 윈도우창 포커스가 돌아올때 처리 사운드 관련 처리를 해준다.
/*
abort: 이미지 로딩이 중단될 경우 실행된다.
blur: 엘리먼트가 입력 포커스를 잃어버릴 경우 실행된다.
change: 폼 엘리먼트가 포커스를 잃고 값이 변경될 경우 실행된다.
click: 마우스 버튼이 눌렸다 떼어질 때 실행된다. mouseup 이벤트가 이어서 발생한다. 기본 동작 방식을 취소하려면 false를 반환한다.
dblclick: 마우스가 더블클릭될 때 실행된다.
error: 이미지 로딩 오류가 일어날 경우 실행된다.
focus: 엘리먼트가 입력 포커스를 얻을 경우 실행된다.
keydown: 키가 눌렸을 때 실행된다. 취소하려면 false를 반환한다.
keypress: 키가 눌렸을 때 실행된다. keydown 이벤트가 이어서 발생한다. 취소하려면 false를 반환한다.
keyup: 키에서 손을 뗐을 때 실행된다. keypress 이벤트가 이어서 발생한다.
mousedown: 마우스 버튼이 눌렸을 때 실행된다.
mousemove: 마우스가 이동할 경우 실행된다.
mouseout: 마우스가 엘리먼트에서 벗어났을 때 실행된다.
mouseover: 마우스가 엘리먼트 위로 이동할 때 실행된다.
mouseup: 마우스 버튼에서 손을 뗐을 때 실행된다.
resize: 윈도우 크기가 변경될 경우 실행된다.
select: 텍스트가 선택됐을 때 실행된다.
reset: 폼 초기화가 요청됐을 때 실행된다. 초기화를 방지하려면 false를 반환한다.
submit: 폼 제출이 요청됐을 때 실행된다. 제출을 방지하려면 false를 반환한다.
load: 문서 로딩이 완료됐을 때 실행된다.
unload: 문서나 프레임셋이 사라졌을 때 실행된다.
*/
window.addEventListener('focus', function() {
    if(bSoundBGM_bak) {
        kData.bSoundSE = false;
        kData.bSoundBGM = false;
        SoundPause();
    }else{
        kData.bSoundSE = true;
        kData.bSoundBGM = true;
        SoundResume();
    }
}, false);

// 윈도우창을 닫을때 이벤트.
window.addEventListener('blur', function() {
	//SoundPause();
    bSoundBGM_bak = kData.bSoundBGM;
    bSoundSE_bak = kData.bSoundSE;
	SoundPauseByBlur();
}, false);

//Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

function handleVisibilityChange() {
    if (document[hidden]) {
        SoundPause();
    } else {
        SoundResume();
    }
}

//Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
}else{
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

//end 사운드 제어.

/*window.addEventListener('dblclick', function() {
	alert("dblclick!");
}, false);

window.addEventListener('change', function() {
	alert("change!");
}, false);*/

//$(window).onbeforeunload(unload);	// jquery를 사용한다.
//window.onbeforeunload = unload;
//야후추가<appendChild
if(yahooIN === undefined)
    document.body.appendChild(renderer.view);
//야후추가>
var stage = new PIXI.Container();
var sLoading = new PIXI.Container();
var sTitle = new PIXI.Container();
var sGame = new PIXI.Container();
var sGameMain = new PIXI.Container();
var sGameMainUI = new PIXI.Container();
var sGameTemp = new PIXI.Container();
var sGameUISetting = new PIXI.Container();
var sGameUICondition = new PIXI.Container();
var sGameUIExit = new PIXI.Container();
var sGameUIADBall = new PIXI.Container();
var sGameUIADHeart = new PIXI.Container(); 
var sGameUIGameOver = new PIXI.Container(); 
var sGameUIClear = new PIXI.Container(); 
var sGameUISelectLevel = new PIXI.Container(); 
var sGameUISelectIcon = new PIXI.Container(); 
//var sBottomInfo = new PIXI.Container(); 
var sMenuGoldShop = new PIXI.Container();
var sMenuGoldShopPage1 = new PIXI.Container();
var sMenuGoldShopPage2 = new PIXI.Container();
var sMenuGemShop = new PIXI.Container();
var sMenuGemShopPage1 = new PIXI.Container();
var sMenuGemShopPage2 = new PIXI.Container();
var sMenuGemShopPopup = new PIXI.Container();
var sMenuOption = new PIXI.Container();
var sADView1 = new PIXI.Container();
var sADView2 = new PIXI.Container();
var sUpgradePopup = new PIXI.Container();
var sTutorial = new PIXI.Container();

var sMenuGemShopPopup = new PIXI.Container();


var sprReplayClear;
var sprNextClear;
var sprminusnext; //버튼하고 같이 사라지려고
var sprminusreplay;

//---하트샵 글로벌 변수-------------------
var sHeartShop = new PIXI.Container();      //하트샵 루트 parent
sHeartShop.onInitialized=false;             //하트샵 초기화 전 상태

var sHeartTw = new PIXI.Container();        //날아다니는 하트 Container(트윈용)

//날아다니는 하트(스파인데이터)
var spnHeartTw;                             //spnHeartTw = new PIXI.spine.Spine(res.heart_bomb.spineData);
var HEART_COOL_TIME = 60*10;
var coolTimeHeart = HEART_COOL_TIME;

//접속모드에 따른 결제모드
var BillMode = {
    greap:0,
    greapguest:1,
    yahoo:2,
    none:3
};
var Billing = BillMode.greapguest;               //기본 접속모드

//인덱스를 모드스트링으로 변환
var Bill2Str = {
    "0":"greap",
    "1":"greapguest",
    "2":"yahoo",
    "3":"none"
};
//---하트샵 글로벌 변수-----------------------


stage.addChild(sLoading);
//피엔지리스트
var tbImgGame = [
//"img/bgm_btn.png",//move
//"img/btn_off.png",//move
 strGamePath+"img/bubble_0_empty.png",
 strGamePath+"img/bubble_1.png",
 strGamePath+"img/bubble_2.png",
 strGamePath+"img/bubble_3.png",
 strGamePath+"img/bubble_4.png",
 strGamePath+"img/bubble_5.png",
 strGamePath+"img/bubble_6.png",
 strGamePath+"img/bubble_7.png",//del
 strGamePath+"img/bubble_8.png",//del
//del "img/bubble_count.png",//mov -->스파인형식으로
strGamePath+"img/core_bubble_2.png",
//del "img/equip_bubble.png",//del
 strGamePath+"img/fuel_gauge_1.png",
 strGamePath+"img/fuel_gauge_2.png",
 strGamePath+"img/fuel_gauge_2_mask.png",
 strGamePath+"img/fuel_icon.png",    //move
 strGamePath+"img/gauge_star.png",   //del
//"img/heart.png",        //move
//"img/heart_add.png",    //move
//"img/heart_ui.png",     //move
//del "img/main_ui_1.png",//move
//del "img/main_ui_2.png",
strGamePath+"img2/navi.png",
strGamePath+"img/move_arrow_btn.png",
//"img/pause_btn.png",                //move
//"img/popup_ad_view_heart.png",
//"img/popup_ad_view_heart_add.png",
//"img/popup_ad_view_ui.png",
//"img/popup_bgm_btn.png",
//"img/popup_btn_1.png",
//"img/popup_btn_2.png",
//"img/popup_btn_3.png",
//"img/popup_btn_4.png",
//"img/popup_btn_5.png",
//"img/popup_off.png",
//"img/popup_sound_btn.png",
//"img/popup_stage_info.png",
//"img/popup_stage_select_btn.png",
//"img/popup_stage_star_1.png",       //move
//"img/popup_stage_star_2.png",       //move
//"img/popup_stage_star_3.png",       //move
//"img/popup_stage_star_slot_1.png",  //del
//"img/popup_stage_star_slot_2.png",  //del
//"img/popup_stage_star_slot_3.png",  //del
//"img/popup_ui_1.png",   //move
//"img/popup_ui_2.png",   //del
//"img/popup_ui_3.png",   //move
//"img/G_Loading.png",
    strGamePath+"img/shield.png",
    strGamePath+"img/shield_eff.png",
//"img/sound_btn.png",    //move
//"img/stage_select_hexagon.png",
//"img/stage_select_lock.png",
//"img/stage_select_slot_1.png",
//"img/stage_select_slot_2.png",
//"img/stage_select_star.png",
//"img/stage_select_under_ui_1.png",
//"img/stage_select_under_ui_2.png",
//"img/star.png",
//"img/star_ui.png",                  //move
//"img/time_gauge_1.png",             //del
//"img/time_gauge_2.png",             //del
//"img/time_gauge_2_mask.png",        //del
    strGamePath+"img/white.png",
    strGamePath+"img/White1x1Alpha1.png",
//"img/arrow_bubble.png",             //del
//"img/popup_stage_star_1_gray.png",  //move
//"img/popup_stage_star_3_gray.png",  //move
//"img/popup_stage_star_2_gray.png",  //move
//"img/gauge_star_gray.png",
    
 strGamePath+"img/tut_left.png",
 strGamePath+"img/tut_alien.png",
 strGamePath+"img/tut_star.png",
 strGamePath+"img/tut_shield.png",


    strGamePath+"img2/asm_select_bg_1.png",
    strGamePath+"img2/ad_burble.png",
//"img2/ad_burble_bg.png",      //스파인속에 포함되므로 삭제
    strGamePath+"img2/ad_heart.png",
//"img2/ad_heart_bg.png",      //스파인속에 포함되므로 삭제
//"img2/ad_heart_plus.png",      //스파인속에 포함되므로 삭제
    strGamePath+"img2/btn_next.png",
    strGamePath+"img2/btn_no.png",
    strGamePath+"img2/btn_ok.png",
//"img2/btn_play.png",
//"img2/btn_play_1.png",
//"img2/btn_play_2.png",
 strGamePath+"img2/btn_replay.png",
 strGamePath+"img2/btn_tutorial.png",
 strGamePath+"img2/bubble_crack_1.png",
 strGamePath+"img2/bubble_crack_2.png",
 strGamePath+"img2/bubble_thunder.png",
 strGamePath+"img2/clear.png",
 strGamePath+"img2/exit_heart.png",
//"img2/exit_heart_bg.png",      //스파인속에 포함되므로 삭제
//"img2/fuel_gauge_1.png",      //중복이미지삭제
//"img2/fuel_gauge_2.png",      //중복이미지삭제
 strGamePath+"img2/fuel_icon.png",           //"img/fuel_icon.png"
 strGamePath+"img2/gameover.png",            //"img/popup_ui_2.png" //게임오버창
 strGamePath+"img2/main_ui.png",             //"img/main_ui_1.png",
 strGamePath+"img2/menu_btn.png",            //"img/pause_btn.png"
//"img2/left.png",              //스파인속에 포함되므로 삭제
 strGamePath+"img2/perfect.png",
 strGamePath+"img2/popup.png",               //"img/popup_ui_1.png"
 strGamePath+"img2/popup_bg.png",            //클리어,광고
 strGamePath+"img2/popup_score_bg.png",      //클리어
 strGamePath+"img2/popup_stage.png",         //선택
 strGamePath+"img2/popup_stage_bg.png",      //선택
 strGamePath+"img2/popup_star_1.png",        //클리어 //"img/popup_stage_star_1.png",
 strGamePath+"img2/popup_star_1_empty.png",  //클리어 //"img/popup_stage_star_1_gray.png"
 strGamePath+"img2/popup_star_2.png",        //클리어 //"img/popup_stage_star_2.png",
 strGamePath+"img2/popup_star_2_empty.png",  //클리어 //"img/popup_stage_star_2_gray.png",
 strGamePath+"img2/popup_star_3.png",        //클리어 //"img/popup_stage_star_3.png",
 strGamePath+"img2/popup_star_3_empty.png",  //클리어 //"img/popup_stage_star_3_gray.png",
 strGamePath+"img2/popup_title.png",         //클리어,광고,설정
//"img2/right.png",             //스파인속에 포함되므로 삭제
 strGamePath+"img2/select_arrow.png",
//"img2/select_bg_1.png",         
//"img2/select_bg_2.png",         
 strGamePath+"img2/select_bgm_off.png",      //"img/btn_off.png",
 strGamePath+"img2/select_bgm_on.png",       //"img/bgm_btn.png",
 strGamePath+"img2/select_heart.png",        //"img/heart.png"
 strGamePath+"img2/select_heart_plus.png",   //"img/heart_add.png"
 strGamePath+"img2/select_level.png",
 strGamePath+"img2/select_page.png",
 strGamePath+"img2/select_page_1.png",
 strGamePath+"img2/select_sound_off.png",
 strGamePath+"img2/select_sound_on.png",
 strGamePath+"img2/select_stage.png",
 strGamePath+"img2/select_stage_bg.png",
 strGamePath+"img2/select_stage_grey.png",
 strGamePath+"img2/select_stage_star.png",
 strGamePath+"img2/select_top.png",
 strGamePath+"img2/select_top_bg.png",       //"img/heart_ui.png", "img/star_ui.png", 2번사용
 strGamePath+"img2/setting_bg.png",
//"img2/setting_bgm_off.png",
 strGamePath+"img2/setting_bgm_on.png",
 strGamePath+"img2/setting_exit.png",
 strGamePath+"img2/setting_line.png",
//"img2/setting_sound_off.png",
 strGamePath+"img2/setting_sound_on.png",    //"img/sound_btn.png",
//"img2/setting_x.png",
 strGamePath+"img2/setting_x_bgm.png",
 strGamePath+"img2/setting_x_sound.png",
 strGamePath+"img2/stage.png",               //클리어
 strGamePath+"img2/tutorial.png",            //튜터리얼

 strGamePath+"img2/btn_message_no.png",
 strGamePath+"img2/btn_shop_1.png",
 strGamePath+"img2/btn_shop_2.png",
 strGamePath+"img2/btn_shop_ok.png",
 strGamePath+"img2/heart_bg.png",
 strGamePath+"img2/heart_no_1.png",
 strGamePath+"img2/heart_no_2.png",
 strGamePath+"img2/heart_no_3.png",
 strGamePath+"img2/heart_no_4.png",
 strGamePath+"img2/list_1.png",
 strGamePath+"img2/list_2.png",
 strGamePath+"img2/point.png",
 strGamePath+"img2/popup_message.png",
 strGamePath+"img2/popup_shop.png",
 strGamePath+"img2/shop_ad.png",
 strGamePath+"img2/shop_bg.png",
 strGamePath+"img2/shop_down.png",
 strGamePath+"img2/shop_movie.png",
//"img2/shop_no.png",
 strGamePath+"img2/title_shop.png",
 strGamePath+"img2/message.png",
 strGamePath+"img2/popup_shop_result.png",
 strGamePath+"img2/heart_btn_1.png",
 strGamePath+"img2/btn_shop_cooltime.png",
 strGamePath+"img2/coin.png",
 strGamePath+"img2/btn_point.png",
 strGamePath+"img2/sound_iphone_off.png",
 strGamePath+"img2/sound_iphone_on.png",
 strGamePath+"img/all.png",
 
     strGamePath+"imgminimap/map_000.png", //더미용
     strGamePath+"imgminimap/map_001.png", //여기서부터 미니맵
     strGamePath+"imgminimap/map_002.png",
     strGamePath+"imgminimap/map_003.png",
     strGamePath+"imgminimap/map_004.png",
     strGamePath+"imgminimap/map_005.png",
     strGamePath+"imgminimap/map_006.png",
     strGamePath+"imgminimap/map_007.png",
     strGamePath+"imgminimap/map_008.png",
     strGamePath+"imgminimap/map_009.png",
     strGamePath+"imgminimap/map_010.png",
     strGamePath+"imgminimap/map_011.png",
     strGamePath+"imgminimap/map_012.png",
     strGamePath+"imgminimap/map_013.png",
     strGamePath+"imgminimap/map_014.png",
     strGamePath+"imgminimap/map_015.png",
     strGamePath+"imgminimap/map_016.png",
     strGamePath+"imgminimap/map_017.png",
     strGamePath+"imgminimap/map_018.png",
     strGamePath+"imgminimap/map_019.png",
     strGamePath+"imgminimap/map_020.png",
     strGamePath+"imgminimap/map_021.png",
     strGamePath+"imgminimap/map_022.png",
     strGamePath+"imgminimap/map_023.png",
     strGamePath+"imgminimap/map_024.png",
     strGamePath+"imgminimap/map_025.png",
     strGamePath+"imgminimap/map_026.png",
     strGamePath+"imgminimap/map_027.png",
     strGamePath+"imgminimap/map_028.png",
     strGamePath+"imgminimap/map_029.png",
     strGamePath+"imgminimap/map_030.png",
     strGamePath+"imgminimap/map_031.png",
     strGamePath+"imgminimap/map_032.png",
     strGamePath+"imgminimap/map_033.png",
     strGamePath+"imgminimap/map_034.png",
     strGamePath+"imgminimap/map_035.png",
     strGamePath+"imgminimap/map_036.png",
     strGamePath+"imgminimap/map_037.png",
     strGamePath+"imgminimap/map_038.png",
     strGamePath+"imgminimap/map_039.png",
     strGamePath+"imgminimap/map_040.png",
     strGamePath+"imgminimap/map_041.png",
     strGamePath+"imgminimap/map_042.png",
     strGamePath+"imgminimap/map_043.png",
     strGamePath+"imgminimap/map_044.png",
     strGamePath+"imgminimap/map_045.png",
     strGamePath+"imgminimap/map_046.png",
     strGamePath+"imgminimap/map_047.png",
     strGamePath+"imgminimap/map_048.png",
     strGamePath+"imgminimap/map_049.png",
     strGamePath+"imgminimap/map_050.png",
     strGamePath+"imgminimap/map_051.png",
     strGamePath+"imgminimap/map_052.png",
     strGamePath+"imgminimap/map_053.png",
     strGamePath+"imgminimap/map_054.png",
     strGamePath+"imgminimap/map_055.png",
     strGamePath+"imgminimap/map_056.png",
     strGamePath+"imgminimap/map_057.png",
     strGamePath+"imgminimap/map_058.png",
     strGamePath+"imgminimap/map_059.png",
     strGamePath+"imgminimap/map_060.png",
     strGamePath+"imgminimap/map_061.png",
     strGamePath+"imgminimap/map_062.png",
     strGamePath+"imgminimap/map_063.png",
     strGamePath+"imgminimap/map_064.png",
     strGamePath+"imgminimap/map_065.png",
     strGamePath+"imgminimap/map_066.png",
     strGamePath+"imgminimap/map_067.png",
     strGamePath+"imgminimap/map_068.png",
     strGamePath+"imgminimap/map_069.png",
     strGamePath+"imgminimap/map_070.png",
     strGamePath+"imgminimap/map_071.png",
     strGamePath+"imgminimap/map_072.png",
     strGamePath+"imgminimap/map_073.png",
     strGamePath+"imgminimap/map_074.png",
     strGamePath+"imgminimap/map_075.png",
     strGamePath+"imgminimap/map_076.png",
     strGamePath+"imgminimap/map_077.png",
     strGamePath+"imgminimap/map_078.png",
     strGamePath+"imgminimap/map_079.png",
     strGamePath+"imgminimap/map_080.png",
     strGamePath+"imgminimap/map_081.png",
     strGamePath+"imgminimap/map_082.png",
     strGamePath+"imgminimap/map_083.png",
     strGamePath+"imgminimap/map_084.png",
     strGamePath+"imgminimap/map_085.png",
     strGamePath+"imgminimap/map_086.png",
     strGamePath+"imgminimap/map_087.png",
     strGamePath+"imgminimap/map_088.png",
     strGamePath+"imgminimap/map_089.png",
     strGamePath+"imgminimap/map_090.png",
     strGamePath+"imgminimap/map_091.png",
     strGamePath+"imgminimap/map_092.png",
     strGamePath+"imgminimap/map_093.png",
     strGamePath+"imgminimap/map_094.png",
     strGamePath+"imgminimap/map_095.png",
     strGamePath+"imgminimap/map_096.png",
     strGamePath+"imgminimap/map_097.png",
     strGamePath+"imgminimap/map_098.png",
     strGamePath+"imgminimap/map_099.png",
     strGamePath+"imgminimap/map_100.png",
     strGamePath+"imgminimap/map_101.png",
     strGamePath+"imgminimap/map_102.png",
     strGamePath+"imgminimap/map_103.png",
     strGamePath+"imgminimap/map_104.png",
     strGamePath+"imgminimap/map_105.png",
     strGamePath+"imgminimap/map_106.png",
     strGamePath+"imgminimap/map_107.png",
     strGamePath+"imgminimap/map_108.png",
     strGamePath+"imgminimap/map_109.png",
     strGamePath+"imgminimap/map_110.png",
     strGamePath+"imgminimap/map_111.png",
     strGamePath+"imgminimap/map_112.png",
     strGamePath+"imgminimap/map_113.png",
     strGamePath+"imgminimap/map_114.png",
     strGamePath+"imgminimap/map_115.png",
     strGamePath+"imgminimap/map_116.png",
     strGamePath+"imgminimap/map_117.png",
     strGamePath+"imgminimap/map_118.png",
     strGamePath+"imgminimap/map_119.png",
     strGamePath+"imgminimap/map_120.png",
     strGamePath+"imgminimap/map_121.png",
     strGamePath+"imgminimap/map_122.png",
     strGamePath+"imgminimap/map_123.png",
     strGamePath+"imgminimap/map_124.png",
     strGamePath+"imgminimap/map_125.png",
     strGamePath+"imgminimap/map_126.png",
     strGamePath+"imgminimap/map_127.png",
     strGamePath+"imgminimap/map_128.png",
     strGamePath+"imgminimap/map_129.png",
     strGamePath+"imgminimap/map_130.png",
     strGamePath+"imgminimap/map_131.png",
     strGamePath+"imgminimap/map_132.png",
     strGamePath+"imgminimap/map_133.png",
     strGamePath+"imgminimap/map_134.png",
     strGamePath+"imgminimap/map_135.png",
     strGamePath+"imgminimap/map_136.png",
     strGamePath+"imgminimap/map_137.png",
     strGamePath+"imgminimap/map_138.png",
     strGamePath+"imgminimap/map_139.png",
     strGamePath+"imgminimap/map_140.png",
     strGamePath+"imgminimap/map_141.png",
     strGamePath+"imgminimap/map_142.png",
     strGamePath+"imgminimap/map_143.png",
     strGamePath+"imgminimap/map_144.png",
     strGamePath+"imgminimap/map_145.png",
     strGamePath+"imgminimap/map_146.png",
     strGamePath+"imgminimap/map_147.png",
     strGamePath+"imgminimap/map_148.png",
     strGamePath+"imgminimap/map_149.png",
     strGamePath+"imgminimap/map_150.png",
     strGamePath+"imgminimap/map_151.png",
     strGamePath+"imgminimap/map_152.png",
     strGamePath+"imgminimap/map_153.png",
     strGamePath+"imgminimap/map_154.png",
     strGamePath+"imgminimap/map_155.png",
     strGamePath+"imgminimap/map_156.png",
     strGamePath+"imgminimap/map_157.png",
     strGamePath+"imgminimap/map_158.png",
     strGamePath+"imgminimap/map_159.png",
     strGamePath+"imgminimap/map_160.png",
     strGamePath+"imgminimap/map_161.png",
     strGamePath+"imgminimap/map_162.png",
     strGamePath+"imgminimap/map_163.png",
     strGamePath+"imgminimap/map_164.png",
     strGamePath+"imgminimap/map_165.png",
     strGamePath+"imgminimap/map_166.png",
     strGamePath+"imgminimap/map_167.png",
     strGamePath+"imgminimap/map_168.png",
     strGamePath+"imgminimap/map_169.png",
     strGamePath+"imgminimap/map_170.png",
     strGamePath+"imgminimap/map_171.png",
     strGamePath+"imgminimap/map_172.png",
     strGamePath+"imgminimap/map_173.png",
     strGamePath+"imgminimap/map_174.png",
     strGamePath+"imgminimap/map_175.png",
     strGamePath+"imgminimap/map_176.png",
     strGamePath+"imgminimap/map_177.png",
     strGamePath+"imgminimap/map_178.png",
     strGamePath+"imgminimap/map_179.png",
     strGamePath+"imgminimap/map_180.png",
     strGamePath+"imgminimap/map_181.png",
     strGamePath+"imgminimap/map_182.png",
     strGamePath+"imgminimap/map_183.png",
     strGamePath+"imgminimap/map_184.png",
     strGamePath+"imgminimap/map_185.png",
     strGamePath+"imgminimap/map_186.png",
     strGamePath+"imgminimap/map_187.png",
     strGamePath+"imgminimap/map_188.png",
     strGamePath+"imgminimap/map_189.png",
     strGamePath+"imgminimap/map_190.png",
     strGamePath+"imgminimap/map_191.png",
     strGamePath+"imgminimap/map_192.png",
     strGamePath+"imgminimap/map_193.png",
     strGamePath+"imgminimap/map_194.png",
     strGamePath+"imgminimap/map_195.png",
     strGamePath+"imgminimap/map_196.png",
     strGamePath+"imgminimap/map_197.png",
     strGamePath+"imgminimap/map_198.png",
     strGamePath+"imgminimap/map_199.png",
     strGamePath+"imgminimap/map_200.png",
     strGamePath+"imgminimap/map_201.png",
     strGamePath+"imgminimap/map_202.png",
     strGamePath+"imgminimap/map_203.png",
     strGamePath+"imgminimap/map_204.png",
     strGamePath+"imgminimap/map_205.png",
     strGamePath+"imgminimap/map_206.png",
     strGamePath+"imgminimap/map_207.png",
     strGamePath+"imgminimap/map_208.png",
     strGamePath+"imgminimap/map_209.png",
     strGamePath+"imgminimap/map_210.png",
     strGamePath+"imgminimap/map_211.png",
     strGamePath+"imgminimap/map_212.png",
     strGamePath+"imgminimap/map_213.png",
     strGamePath+"imgminimap/map_214.png",
     strGamePath+"imgminimap/map_215.png",
     strGamePath+"imgminimap/map_216.png",
     strGamePath+"imgminimap/map_217.png",
     strGamePath+"imgminimap/map_218.png",
     strGamePath+"imgminimap/map_219.png",
     strGamePath+"imgminimap/map_220.png",
     strGamePath+"imgminimap/map_221.png",
     strGamePath+"imgminimap/map_222.png",
     strGamePath+"imgminimap/map_223.png",
     strGamePath+"imgminimap/map_224.png",
     strGamePath+"imgminimap/map_225.png",
     strGamePath+"imgminimap/map_226.png",
     strGamePath+"imgminimap/map_227.png",
     strGamePath+"imgminimap/map_228.png",
     strGamePath+"imgminimap/map_229.png",
     strGamePath+"imgminimap/map_230.png",
     strGamePath+"imgminimap/map_231.png",
     strGamePath+"imgminimap/map_232.png",
     strGamePath+"imgminimap/map_233.png",
     strGamePath+"imgminimap/map_234.png",
     strGamePath+"imgminimap/map_235.png",
     strGamePath+"imgminimap/map_236.png",
     strGamePath+"imgminimap/map_237.png",
     strGamePath+"imgminimap/map_238.png",
     strGamePath+"imgminimap/map_239.png",
     strGamePath+"imgminimap/map_240.png",
     strGamePath+"imgminimap/map_241.png",
     strGamePath+"imgminimap/map_242.png",
     strGamePath+"imgminimap/map_243.png",
     strGamePath+"imgminimap/map_244.png",
     strGamePath+"imgminimap/map_245.png",
     strGamePath+"imgminimap/map_246.png",
     strGamePath+"imgminimap/map_247.png",
     strGamePath+"imgminimap/map_248.png",
     strGamePath+"imgminimap/map_249.png",
     strGamePath+"imgminimap/map_250.png",
     strGamePath+"imgminimap/map_251.png",
     strGamePath+"imgminimap/map_252.png",
     strGamePath+"imgminimap/map_253.png",
     strGamePath+"imgminimap/map_254.png",
     strGamePath+"imgminimap/map_255.png",
     strGamePath+"imgminimap/map_256.png",
     strGamePath+"imgminimap/map_257.png",
     strGamePath+"imgminimap/map_258.png",
     strGamePath+"imgminimap/map_259.png",
     strGamePath+"imgminimap/map_260.png",
     strGamePath+"imgminimap/map_261.png",
     strGamePath+"imgminimap/map_262.png",
     strGamePath+"imgminimap/map_263.png",
     strGamePath+"imgminimap/map_264.png",
     strGamePath+"imgminimap/map_265.png",
     strGamePath+"imgminimap/map_266.png",
     strGamePath+"imgminimap/map_267.png",
     strGamePath+"imgminimap/map_268.png",
     strGamePath+"imgminimap/map_269.png",
     strGamePath+"imgminimap/map_270.png",
     strGamePath+"imgminimap/map_271.png",
     strGamePath+"imgminimap/map_272.png",
     strGamePath+"imgminimap/map_273.png",
     strGamePath+"imgminimap/map_274.png",
     strGamePath+"imgminimap/map_275.png",
     strGamePath+"imgminimap/map_276.png",
     strGamePath+"imgminimap/map_277.png",
     strGamePath+"imgminimap/map_278.png",
     strGamePath+"imgminimap/map_279.png",
     strGamePath+"imgminimap/map_280.png",
     strGamePath+"imgminimap/map_281.png",
     strGamePath+"imgminimap/map_282.png",
     strGamePath+"imgminimap/map_283.png",
     strGamePath+"imgminimap/map_284.png",
     strGamePath+"imgminimap/map_285.png",
     strGamePath+"imgminimap/map_286.png",
     strGamePath+"imgminimap/map_287.png",
     strGamePath+"imgminimap/map_288.png",
     strGamePath+"imgminimap/map_289.png",
     strGamePath+"imgminimap/map_290.png",
     strGamePath+"imgminimap/map_291.png",
     strGamePath+"imgminimap/map_292.png",
     strGamePath+"imgminimap/map_293.png",
     strGamePath+"imgminimap/map_294.png",
     strGamePath+"imgminimap/map_295.png",
     strGamePath+"imgminimap/map_296.png",
     strGamePath+"imgminimap/map_297.png",
     strGamePath+"imgminimap/map_298.png",
     strGamePath+"imgminimap/map_299.png",
     strGamePath+"imgminimap/map_300.png",
     strGamePath+"imgminimap/map_301.png",
     strGamePath+"imgminimap/map_302.png",
     strGamePath+"imgminimap/map_303.png",
     strGamePath+"imgminimap/map_304.png",
     strGamePath+"imgminimap/map_305.png",
     strGamePath+"imgminimap/map_306.png",
     strGamePath+"imgminimap/map_307.png",
     strGamePath+"imgminimap/map_308.png",
     strGamePath+"imgminimap/map_309.png",
     strGamePath+"imgminimap/map_310.png",
     strGamePath+"imgminimap/map_311.png",
     strGamePath+"imgminimap/map_312.png",
     strGamePath+"imgminimap/map_313.png",
     strGamePath+"imgminimap/map_314.png",
     strGamePath+"imgminimap/map_315.png",
     strGamePath+"imgminimap/map_316.png",
     strGamePath+"imgminimap/map_317.png",
     strGamePath+"imgminimap/map_318.png",
     strGamePath+"imgminimap/map_319.png",
     strGamePath+"imgminimap/map_320.png",
     strGamePath+"imgminimap/map_321.png",
     strGamePath+"imgminimap/map_322.png",
     strGamePath+"imgminimap/map_323.png",
     strGamePath+"imgminimap/map_324.png",
     strGamePath+"imgminimap/map_325.png",
     strGamePath+"imgminimap/map_326.png",
     strGamePath+"imgminimap/map_327.png",
     strGamePath+"imgminimap/map_328.png",
     strGamePath+"imgminimap/map_329.png",
     strGamePath+"imgminimap/map_330.png",
     strGamePath+"imgminimap/map_331.png",
     strGamePath+"imgminimap/map_332.png",
     strGamePath+"imgminimap/map_333.png",
     strGamePath+"imgminimap/map_334.png",
     strGamePath+"imgminimap/map_335.png",
     strGamePath+"imgminimap/map_336.png",
     strGamePath+"imgminimap/map_337.png",
     strGamePath+"imgminimap/map_338.png",
     strGamePath+"imgminimap/map_339.png",
     strGamePath+"imgminimap/map_340.png",
     strGamePath+"imgminimap/map_341.png",
     strGamePath+"imgminimap/map_342.png",
     strGamePath+"imgminimap/map_343.png",
     strGamePath+"imgminimap/map_344.png",
     strGamePath+"imgminimap/map_345.png",
     strGamePath+"imgminimap/map_346.png",
     strGamePath+"imgminimap/map_347.png",
     strGamePath+"imgminimap/map_348.png",
     strGamePath+"imgminimap/map_349.png",
     strGamePath+"imgminimap/map_350.png",
     strGamePath+"imgminimap/map_351.png",
     strGamePath+"imgminimap/map_352.png",
     strGamePath+"imgminimap/map_353.png",
     strGamePath+"imgminimap/map_354.png",
     strGamePath+"imgminimap/map_355.png",
     strGamePath+"imgminimap/map_356.png",
     strGamePath+"imgminimap/map_357.png",
     strGamePath+"imgminimap/map_358.png",
     strGamePath+"imgminimap/map_359.png",
     strGamePath+"imgminimap/map_360.png",
     strGamePath+"imgminimap/map_361.png",
     strGamePath+"imgminimap/map_362.png",
     strGamePath+"imgminimap/map_363.png",
     strGamePath+"imgminimap/map_364.png",
     strGamePath+"imgminimap/map_365.png",
     strGamePath+"imgminimap/map_366.png",
     strGamePath+"imgminimap/map_367.png",
     strGamePath+"imgminimap/map_368.png",
     strGamePath+"imgminimap/map_369.png",
     strGamePath+"imgminimap/map_370.png",
     strGamePath+"imgminimap/map_371.png",
     strGamePath+"imgminimap/map_372.png",
     strGamePath+"imgminimap/map_373.png",
     strGamePath+"imgminimap/map_374.png",
     strGamePath+"imgminimap/map_375.png",
     strGamePath+"imgminimap/map_376.png",
     strGamePath+"imgminimap/map_377.png",
     strGamePath+"imgminimap/map_378.png",
     strGamePath+"imgminimap/map_379.png",
     strGamePath+"imgminimap/map_380.png",
     strGamePath+"imgminimap/map_381.png",
     strGamePath+"imgminimap/map_382.png",
     strGamePath+"imgminimap/map_383.png",
     strGamePath+"imgminimap/map_384.png",
     strGamePath+"imgminimap/map_385.png",
     strGamePath+"imgminimap/map_386.png",
     strGamePath+"imgminimap/map_387.png",
     strGamePath+"imgminimap/map_388.png",
     strGamePath+"imgminimap/map_389.png",
     strGamePath+"imgminimap/map_390.png",
     strGamePath+"imgminimap/map_391.png",
     strGamePath+"imgminimap/map_392.png",
     strGamePath+"imgminimap/map_393.png",
     strGamePath+"imgminimap/map_394.png",
     strGamePath+"imgminimap/map_395.png",
     strGamePath+"imgminimap/map_396.png",
     strGamePath+"imgminimap/map_397.png",
     strGamePath+"imgminimap/map_398.png",
     strGamePath+"imgminimap/map_399.png",
     strGamePath+"imgminimap/map_400.png",
     strGamePath+"imgminimap/map_401.png",
     strGamePath+"imgminimap/map_402.png",
     strGamePath+"imgminimap/map_403.png",
     strGamePath+"imgminimap/map_404.png",
     strGamePath+"imgminimap/map_405.png",
     strGamePath+"imgminimap/map_406.png",
     strGamePath+"imgminimap/map_407.png",
     strGamePath+"imgminimap/map_408.png",
     strGamePath+"imgminimap/map_409.png",
     strGamePath+"imgminimap/map_410.png",
     strGamePath+"imgminimap/map_411.png",
     strGamePath+"imgminimap/map_412.png",
     strGamePath+"imgminimap/map_413.png",
     strGamePath+"imgminimap/map_414.png",
     strGamePath+"imgminimap/map_415.png",
     strGamePath+"imgminimap/map_416.png",
     strGamePath+"imgminimap/map_417.png",
     strGamePath+"imgminimap/map_418.png",
     strGamePath+"imgminimap/map_419.png",
     strGamePath+"imgminimap/map_420.png",
     strGamePath+"imgminimap/map_421.png",
     strGamePath+"imgminimap/map_422.png",
     strGamePath+"imgminimap/map_423.png",
     strGamePath+"imgminimap/map_424.png",
     strGamePath+"imgminimap/map_425.png",
     strGamePath+"imgminimap/map_426.png",
     strGamePath+"imgminimap/map_427.png",
     strGamePath+"imgminimap/map_428.png",
     strGamePath+"imgminimap/map_429.png",
     strGamePath+"imgminimap/map_430.png",
     strGamePath+"imgminimap/map_431.png",
     strGamePath+"imgminimap/map_432.png",
     strGamePath+"imgminimap/map_433.png",
     strGamePath+"imgminimap/map_434.png",
     strGamePath+"imgminimap/map_435.png",
     strGamePath+"imgminimap/map_436.png",
     strGamePath+"imgminimap/map_437.png",
     strGamePath+"imgminimap/map_438.png",
     strGamePath+"imgminimap/map_439.png",
     strGamePath+"imgminimap/map_440.png",
     strGamePath+"imgminimap/map_441.png",
     strGamePath+"imgminimap/map_442.png",
     strGamePath+"imgminimap/map_443.png",
     strGamePath+"imgminimap/map_444.png",
     strGamePath+"imgminimap/map_445.png",
     strGamePath+"imgminimap/map_446.png",
     strGamePath+"imgminimap/map_447.png",
     strGamePath+"imgminimap/map_448.png",
     strGamePath+"imgminimap/map_449.png",
     strGamePath+"imgminimap/map_450.png"
];



//---뉴---
//컨테이너리스트
var conShip = new PIXI.Container();
var conBG = new PIXI.Container();
var arr9Level = [];

//var fontRiff='Conv_RifficFree-Bold';
//var fontShow='Showcard Gothic';
var fontShow='Conv_HMKMRHD_NumberEng';

//클리어화면
var tx_nowname_Clear;
var TxScore_Clear;
var TxScore_Clear_tween={
    score:0
};
var Star3_Clear=[];
var txLvNum_Clear;

//셋팅화면
var SpXBGM_Setting;
var SpXSFX_Setting;

//조건화면
var SpStar3_Condition=[];
var TxNeed_Condition;
var TxNow_Condition;
var TxNow_Condition_tween={
    score:0
};
var TxTitle_Condition;

//선택화면
var TxtHeartSelectLevel;
var TxtStarSelectLevel;
var TxPageSelectLevel;
var randStageSelect;     //랜덤반짝


//메인화면
var txScoreTitle;
var txFuelTitle; //연료바 타이틀
var txFuelPro;
var tx_remainTitle;
var tx_remainBall; //남은 공수
var tx_remainBall_tween={
    score:0
};
var spnRemain;
//var mStar1On=false; //별1 텍스쳐 온오프
//var mStar2On=false;
//var mStar3On=false;
//var mStar1Cond=0; //별1 조건
//var mStar2Cond=0;
//var mStar3Cond=0;
var fixedBubbleCount=0;
var mainmenuTopStar3 = [];                       //별스프라이트
var mainmenuTopStar3PosX = [0,0,0];              //need기준 실제스코어값 --> 배치포지션으로컨버팅
var mainmenuTopStar3OnOff = [false,false,false]; //현재 활성화상태
var mainmenuBottomBall5 = [];
var sGameBG; //우주배경 //회전되는 스파인
var spine_title; //첫화면 게임타이틀
var ABCD = {a:0, b:1};
var space = ABCD.a;
var BtnR;
var BtnL;
var BtnRspn;
var BtnLspn;
var mainFuelIcon;



//------------------------------방어막gm-----------------
var rotMode=false;
var rotMax=0;
var rotMaxTime=0.5;
var rotCur=0;
var rotCurTime=0;
var TypeSD = {one:0,two:1,three:2,none:3}; //방어막 종류 설정
var typeSD = TypeSD.none;    //현재방어막 종류
var curtimeSD=0;            //방어막 회전한 시간 합계
var desttimeSD=0.5;//0.25;        //방어막 회전가능 전체 시간
var destdegSD=60;           //회전 목표 각도(타임bias로 계산될 회전각도)
var curdegSD=0;             //현재 회전에 쓰이는 절대 각도값
var degIdxSD=0;             //다음 회전절대값을 나타내는 인덱스
var olddegIdx=5;            //예전 회전절대값을 나타내는 인덱스
var degArrSD=[0, 60, 120, 180, 240, 300];//방어막 인덱스

//로딩바 전역변수 설정
var sLoading = new PIXI.Container();
var loadingcount=0;           //로딩    카운트
var loadingcountmax =438;      //로딩맥스 카운트
var loadingscalemax = 223;//481;    //스케일 480보다 1많게

//--방어막옵셋 그리드용----------------------------
//                 8     9     10  
//              (-1,-2)(0,-2)(1,-2)
//           7                       11 
//       (-2,-1)                   (1,-1)
//   6                                     0       
// (-2,0)              (0,0)             (2,0)
//          5                         1  
//       (-2,1)                     (1,1)
//               4       3      2
//             (-1,2)  (0,3)  (1,2)
var offsetArrSD=[ //짝수행 neighborsbusteroffsets를 가져다 씀
//             0→     1↘      2↘      3↓       ↙4       ↙5
            [2, 0], [1, 1], [1, 2], [0, 2], [-1, 2], [-2, 1],
//             ←6       ↖7        ↖8        ↑9      10↗      11↗ 
            [-2, 0], [-2, -1], [-1, -2], [0, -2], [1, -2], [1, -1]
    ];
//--방어막 테이블 그리드용----------------------------
//참고 lvNumber // cShield_ // attArrSD // shieldsetVisible // stateShield(dt) //hieldst=ShieldSt.begin;
var attArrSD=[
                [   //방어막 1개
                    [2, 3, 4, 5, 6, 7, 8, 9,10], //0     (c)→
                    [0, 4, 5, 6, 7, 8, 9,10,11], //60    (c)↘
                    [0, 1, 2, 6, 7, 8, 9,10,11], //120  ↙(c)
                    [0, 1, 2, 3, 4, 8, 9,10,11], //180  ←(c)
                    [0, 1, 2, 3, 4, 5, 6,10,11], //240  ↖(c)
                    [0, 1, 2, 3, 4, 5, 6, 7, 8]  //300   (c)↗
                ],
                [   //방어막 2개
                    [2, 3, 4, 8, 9,10], //0     (c)→ 
                    [0, 4, 5, 6,10,11], //60    (c)↘
                    [0, 1, 2, 6, 7, 8], //120  ↙(c)
                    [2, 3, 4, 8, 9,10], //0     (c)→ 
                    [0, 4, 5, 6,10,11], //60    (c)↘
                    [0, 1, 2, 6, 7, 8], //120  ↙(c)                    
                ],
                [   //방어막 3개
                    [2, 6,10], //0     (c)→ 
                    [0, 4, 8], //60    (c)↘
                    [2, 6,10], //120  ↙(c)
                    [0, 4, 8], //0     (c)→ 
                    [2, 6,10], //60    (c)↘
                    [0, 4, 8], //120  ↙(c)                    
                ],
                [   //방어막 없는경우
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11], //0     (c)→ 
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11], //60    (c)↘
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11], //120  ↙(c)
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11], //0     (c)→ 
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11], //60    (c)↘
                    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11]  //120  ↙(c)                    
                ]    
            ];
//------------------------------방어막gm-----------------

var TxScore;
var TxStage;            //메인 스테이지 넘버
var MyStageName = "STAGE ";
var mainCoreBallSpr;          //코어
var cAlien;                 //코어방어막속 외계인 컨테이너
var shieldspn;

var cShield_;
var cShieldA;               //코어방어막 컨테이너
var cShieldB;               //코어방어막 컨테이너
var cShieldC1;               //코어방어막 컨테이너
var cShieldC2;               //코어방어막 컨테이너
var sprShieldA;
var sprShieldB;
var sprShieldC1;
var sprShieldC2;

var cShield_ray_;
var cShieldA_ray;
var cShieldB_ray;
var cShieldC1_ray;
var cShieldC2_ray;
var sprShieldA_ray;
var sprShieldB_ray;
var sprShieldC1_ray;
var sprShieldC2_ray;

var spnCoreFx;
var mainCoreFx;                //코어이펙트
var mainSpaceBG;
var mainPlayer;             //spine우주선
//var mainPlayerBubble; //밑에서 재정의
//var mainBuster;             //우주선 버스터 버튼
var guideLine;              //spine가이드벽
var deadLine;              //spine데드라인
var mainmenuStarGuage;
//var Score_Mask;
var Fuel_Mask;
var mainmenuFuelGuage;

var ScoreMax = 297;
var StarCurrent = 297;
var FuelMax = 253;
var FuelCurrent = 253;
var playScoreMax = 60;
var playTimeMax = 60;
var busterTimeMax=1;
var deltaBuster=0; 
var usedballcounter = 0; //유저가 사용했던 볼수
var nextcolor;
var nextcolor2;

var spnFxBurst;
var spnAlien;

var bBBSpineCluster = false;
var bBBSpineFloating = false;

var spnStar;
var spnFuel;
var spnAddBall;
var spnBusterBoom;
var spnRLRotation; //좌우회전버튼
var spnRemain_s;
var spnSelectStage_s;
var SpinePlayerBubble;//날아다니는 공에 붙는 버스터스파인
var SprPlayerBubble;

var spnCol_s;//new PIXI.spine.Spine(spnCol_s);
var spnCol=[];
var DIR={
    top:0,
    left:1,
    right:2,
    down:3
};

var sprTweenStone1;
var sprTweenStone2;
var sprTweenStone3;

var alphaMultiple=1;
var ScoreVelocity = 100;
var ScoreDestDist = 50;                            //최대이동거리  
var clusterPointText = 0;

var sprNav=[];
var navX=0; //player버블위치(좌상)+반타일
var navY=0;
var navRot=90;
var navRotOld=-1;
var navDist=0;
var navOffset=35;
var navCount=30;
var navAfter=2;

var ColMinX = 60; //level.x //상단충돌,하단충돌,좌우충돌
var ColMinY = 115; //level.y
var ColMaxX = 660; //level.x+level.width
var ColMaxY = 1020; //level.y+level.height    

//삭제될 데이터들
var iItemBaseDmg=100;
var thisBubbleX;
var thisBubbleY;
var SpArrow;
//var SprPlayerBubbleNext;
//삭제될 데이터들

//웹폰트문제를 해결하기 위해서 text오브젝트를 전역으로 함
var verNum;
var tx_title_Clear;
var tx_replay_Clear;
var tx_ok_Clear;
var tx_copyright;
var tx_next_clear;
var sprPopA_Clear;
var sprPopB_Clear;

var sprMinmap_condition;
var tx_needname_condition;
var tx_nowname_condition;
var TxStage_Condition;
var tx_ok_condition;
var tx_no_condition;

var tx_title_setting;
var tx_ok_setting;

var txMinus;
var tx_title_Exit;
var tx_Giveup;
var tx_ok_Exit;
var tx_no_Exit;

var tx_title_ADBAll;
var tx_ADBAll;
var tx_ok_ADBAll;
var tx_no_ADBAll;
var tx_ball_ADBALL;

var tx_title_ADHEART;
var tx_ADHEART;
var tx_ok_ADHEART;
var tx_no_ADHEART;

var tx_ok_gameover;

var TxStageTitle;

// var LOCALE = {
//     exit:
//     {
//         kr:'게임을\n포기하시겠습니까?',
//         en:'Give Up?'
//     },
//     adbubble:
//     {
//         kr:'광고를 보면 버블이\n충전됩니다.',
//         en:'Charge Bubble?'
//     },
//     adheart:
//     {
//         kr:'광고를 보면 하트가\n충전됩니다.',
//         en:'Charge Heart?'
//     }
// };

// var TX = {
//     verNum: "1.0.01",
//     tx_copyright:"Copyright Ⓒ 2017 RECOM KOREA Corp. All rights reserved",
//     //클리어창 텍스트
//     //tx_title_Clear:  "STAGE",
//     tx_replay_Clear: "REPLAY",
//     //tx_nowname_Clear: "SCORE",
//     //tx_ok_Clear:     "OK",
//     tx_next_clear:   "NEXT",
//
//     //조건창 텍스트
//     tx_needname_condition: "NEED",
//     //tx_nowname_condition: "SCORE",
//     //TxStage_Condition: "STAGE",
//     //tx_ok_condition: "OK",
//     //tx_no_condition: "NO",
//
//     //셋팅 텍스트
//     //tx_title_setting: "SETTING",
//     //tx_ok_setting: "OK",
//
//     //나가기 텍스트
//     //tx_title_Exit: "EXIT",
//     //tx_Giveup: LOCALE.exit.kr,//"Give up the game?",
//     //tx_ok_Exit: "OK",
//     //tx_no_Exit: "NO",
//     txMinus: "-1",
//
//     //버블충전운석충전총알충전 텍스트
//     //tx_title_ADBAll: "CONTINUE",
//     //tx_ADBAll: "하트1개로 추가구슬을\n지급받으시겠습니까?",
//     //tx_ok_ADBAll: "OK",
//     //tx_no_ADBAll: "NO",
//     //tx_ball_ADBALL: "15",
//
//     //하트충전 텍스트
//     //tx_title_ADHEART: "CONTINUE",
//     //tx_ADHEART: "광고를 보면 하트가\n충전됩니다.",
//     //tx_ok_ADHEART: "OK",
//     //tx_no_ADHEART: "NO",
//
//     //게임오버텍스트
//     //tx_ok_gameover: "OK",
//
//     //메인메뉴
//     //TxStageTitle: "STAGE",
//
//     //남은버블타이틀
//     TxremainTitle: "Balls",
//
//     //메인연료타이틀
//     txFuelTile: "Buster Mode",
//     txFuelPro: "0%",
//
//
// //    sGameMainUI.tutbg
// //    sGameMainUI.tut
// //    sGameMainUI.tut.dialog
// //    sGameMainUI.tut.txt
// //    sGameMainUI.tut.ok
//     //튜터리얼메세지
//     //tutmsg_3ball:   "버블을 발사해서\n같은색 버블을\n3개 이상 모아 보세요",
//     //tutmsg_rotleft: "왼쪽으로\n회전해 보세요",
//     //tutmsg_star:    "별을\n획득하세요",
//     //tutmsg_midstar: "가운데\n버블을 맞춰\n친구를 구하세요",
//     //tutmsg_energy:  "버블을 터트려\n에너지를 모으세요",
//     //tutmsg_buster:  "버스터모드로\n별을 획득해보세요",
//     //tutmsg_midstar2:"가운데\n버블을 맞춰\n친구를 구하세요",
//     //tutmsg_fuel:    "에너지를\n채워줘요",        //10
//     //tutmsg_addball: "버블 3개가\n추가 돼요",     //19
//     //tutmsg_shield:  "실드가\n회전하면서\n방해를 해요",//20
//     //tutmsg_stone:   "운석은\n2번 부딪히면\n파괴돼요",//37
//     //tutmsg_ok:      "OK",
//
//     //메인스코어
//     //txScoreTitle: "SCORE"
//
//     };
//웹폰트문제를 해결하기 위해서 전역으로 함

var TUTICON ={
    empty:    strGamePath+"img/White1x1Alpha1.png",
    ball:     strGamePath+"img/bubble_3.png",
    left:     strGamePath+"img/tut_left.png",
    alien:    strGamePath+"img/tut_alien.png",
    star:     strGamePath+"img/tut_star.png",
    addball:  strGamePath+"img/bubble_7.png",
    fuel:     strGamePath+"img/bubble_8.png",
    stone:    strGamePath+"img2/bubble_crack_1.png",
    shield:   strGamePath+"img/tut_shield.png",
};


//
//
// var Charge ={ heart:0, ball:1 }
// var chargemode = Charge.ball;

//인디케이터배열설정/
var LEVEL_MAX= 450;//var LEVEL_MAX= 270;
var PAGE_MAX= LEVEL_MAX/9; //count이다 index아님

var IndiPage=10; //= PAGE_MAX;

var IndiLength = iMaxSizeX*0.5;
var IndiGrid1 = IndiLength/(IndiPage-1);
var PageHalf = IndiPage * 0.5;
var LengthHalf = IndiLength * 0.5;
var xOff =  PageHalf * IndiLength;
var sprIndicator=[];
//인디케이터배열설정

var curMaxLevel=2; //플레이해야될 레벨(안깬 레벨)
var curPlayLevel=2; //플레이해야될 레벨(안깬 레벨)
var curPage=0;

var bgmOffMarkinSel; //x스프라이트
var sfxOffMarkinSel; //x스프라이트

var bSelectModeOnce=false; //선택화면 1번만 실행

var isShieldRound=false; //코어주변 +2-2 영역인지
var FoundCore=false;    //코어위치의 버블색 바꾸기
var FoundFuel=false;    //연료발견
var FoundAddBall=false; //추가탄환발견
var FoundStar=false; //별발견
var FoundStone=false; //암석발견
var FoundForStone=false; //암석들어갈곳
var Balls_Fuel=[];
var Balls_Add=[];
var Balls_Star=[];
var Balls_Stone=[];
//점수계산에필요한 변수들;
var pointBaseCount=0;

var EnableClick=true; //버튼두번클릭방지용도

function isTouchDevice(){
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}
var MOUSE=0;
var TOUCH=1;
var InputMode= isTouchDevice()===true ? TOUCH:MOUSE;
var TcState = {
    start:0,
    move:1,
    end:2
};

var touchstate = TcState.end;

var bbDicFx = [
    "empty",
    "active_ani_red",
    "active_ani_blue",
    "active_ani_yellow",
    "active_ani_green",
    "active_ani_pupple"
    ];

var bbDicTint = [ //방향 네비게이터 컬러
    0xFFFFFF,
    0xFF0226,
    0x15F8FE,
    0xFDF806,
    0x07FF41,
    0xEB36FF
    ];

var bbDic = {
    rand:     0, //"img/bubble_1.png",        //0
    red :     1, //"img/bubble_3.png",        //1
    blue :    2, //"img/bubble_5.png",        //2
    yellow :  3, //"img/bubble_4.png",        //3
    green :   4, //"img/bubble_1.png",        //4
    violet :  5, //"img/bubble_2.png",        //5
    noused6:  6, //"img/bubble_1.png",        //6  -안사용함
    x :       7, //"img/bubble_6.png",        //7  방해물
    fuel :    8, //"img2/bubble_thunder.png"  //8  에너지
    addball : 9, //"img/bubble_7.png",        //9  추가구슬
    
    star : 10, //"img/bubble_7.png",          //10  별
    stone1: 11, //"img2/bubble_crack_1.png",  //11  암석1
    stone2: 12, //"img2/bubble_crack_2.png",  //12  암석2
    
    floatingcluster: 13, //"img/bubble_1.png",//13 플로팅클러스터
    cluster: 14, //"img/bubble_1.png",        //14 클러스터
    buster:  15,                              //15 부스터총알 터지기용
    core:    16, //"img/bubble_0_empty.png",  //16
    empty :  17, //"img/bubble_0_empty.png"   //17
};
//예:bbArr[bbDic.red]
var bbArr = [
    strGamePath+"img/bubble_1.png",         //0 //랜덤
    strGamePath+"img/bubble_3.png",         //1 //red
    strGamePath+"img/bubble_5.png",         //2 //blue
    strGamePath+"img/bubble_4.png",         //3 //yellow
    strGamePath+"img/bubble_1.png",         //4 //green
    strGamePath+"img/bubble_2.png",         //5 //violet
    strGamePath+"img/bubble_1.png",         //6  안사용함
    strGamePath+"img/bubble_6.png",         //7  방해물
    strGamePath+ "img2/bubble_thunder.png",  //8  에너지
    strGamePath+"img/bubble_6.png",         //9  추가구슬

    strGamePath+"img/bubble_6.png",         //10  별
    strGamePath+"img2/bubble_crack_1.png",  //11  암석1
    strGamePath+"img2/bubble_crack_2.png",  //12  암석2

    strGamePath+"img/bubble_1.png",         //10 플로팅클러스터
    strGamePath+"img/bubble_1.png",         //11 클러스터
    strGamePath+"img/bubble_0_empty.png",   //12
    strGamePath+"img/bubble_0_empty.png",   //13
    strGamePath+"img/bubble_0_empty.png"    //14
];

//안사용
//var bbColorDic = {
//    red :    1, //"img/bubble_3.png",     //2  //1
//    blue :   2, //"img/bubble_5.png",     //4  //2
//    yellow : 3, //"img/bubble_4.png",     //3  //3
//    green :  4, //"img/bubble_1.png",     //0  //4
//    violet : 5, //"img/bubble_2.png",     //1  //5
//};

//예전꺼 스파인
//var bbSpineArr =[ //우주선 소유의 버블 슬롯 네임
//    null,       //랜덤타입속성, 쓸모없는 값
//    "bubble_4", //red
//    "bubble_1", //blue
//    "bubble_5", //yellow
//    "bubble_2", //green
//    "bubble_3"  //violet
//];
//바뀐 스파인용
var bbSpineArr =[ //우주선 소유의 버블 슬롯 네임
    null,       //랜덤타입속성, 쓸모없는 값
    "bubble_3", //red
    "bubble_5", //blue
    "bubble_4", //yellow
    "bubble_1", //green
    "bubble_2"  //violet
];


//var mainPlayerBubble = FbbSpineArr[bbDic.red];       //spineBubble이름

//안사용
//var bbColorArr = [
//    1, //"img/bubble_3.png",     //2  //1
//    2, //"img/bubble_5.png",     //4  //2
//    3, //"img/bubble_4.png",     //3  //3
//    4, //"img/bubble_1.png",     //0  //4
//    5, //"img/bubble_2.png",     //1  //5
//];

//var  EmptyIndex = bbArr.length-1;
//var  CoreIndex = bbArr.length-2;
//디버그용
var d_TxScore=0;
var d_TxStage=0;
//var d_Score_Mask=0;
var d_Fuel_Mask=0;
var d_timerGlobal;
var d_Txstate;
var d_TxAngle;
var d_TxTurnSnapCounter;
var Dev_InfoOnOff = false;
var Dev_OnOff=true; //개발자메뉴
var sDevCon = new PIXI.Container();
var Dev_BtnArr = [];

//디버그용

//---뉴---

//========================================================================
// 언어 이미지  설정
var LANGUAGE_ENG = 0;
var LANGUAGE_JPN = 1;
var LANGUAGE_KOR = 2;
var CURRENT_LANGUAGE = LANGUAGE_ENG;
var tbTTF = {"ko":"Conv_HMKMRHD_NumberEng", "ja":"Conv_HMKMRHD_NumberEng", "en":"Conv_HMKMRHD_NumberEng"};
var tbNumTTF = "Passion One";

//


var tbString_json = "{\"tuto01\":{\"en\":\"Shoot bubbles and{E}match 3 or more{E}of the same color\",\"jp\":\"バブルを発射して{E}同じ色のバブルを{E}3つ以上合わせてみよう\",\"kr\":\"버블을 발사해서{E}같은색 버블을{E}3개 이상 모아보세요\"},\"tuto02\":{\"en\":\"Rotate{E} to the left\",\"jp\":\"左側に{E}回転してみよう\",\"kr\":\"왼쪽으로{E}회전해 보세요\"},\"tuto03\":{\"en\":\"Get stars\",\"jp\":\"星を獲得しよう\",\"kr\":\"별을 획득하세요\"},\"tuto04\":{\"en\":\"Hit the center{E}bubble and{E}rescue friend\",\"jp\":\"真ん中の{E}バブルに当てて{E}友達を救い出そう\",\"kr\":\"가운데{E}버블을 맞춰{E}친구를 구하세요\"},\"tuto05\":{\"en\":\"Collect energy{E}by poping bubbles\",\"jp\":\"バブルを弾けさせて{E}エネルギーを集めよう\",\"kr\":\"버블을 터트려{E}에너지를 모으세요\"},\"tuto06\":{\"en\":\"Get stars{E}in Burstar mode\",\"jp\":\"バスターモードで{E}星を獲得してみよう\",\"kr\":\"버스터모드로{E}별을 획득해보세요\"},\"tuto07\":{\"en\":\"Charge energy\",\"jp\":\"エネルギーが{E}チャージされるよ\",\"kr\":\"에너지를{E}채워줘요\"},\"tuto08\":{\"en\":\"Three bubbles{E}will be added\",\"jp\":\"バブル3つが{E}追加されるよ\",\"kr\":\"버블 3개가{E}추가돼요\"},\"tuto09\":{\"en\":\"Shield is{E}rotate and interfere\",\"jp\":\"シールドは回転して{E}邪魔をしてきます{E}うまくよけよう\",\"kr\":\"실드가{E}회전하면서{E}방해를 해요\"},\"tuto10\":{\"en\":\"Meteorite is{E}hit twice to break\",\"jp\":\"隕石は{E}バブルを2回当てれば{E}壊せるよ\",\"kr\":\"운석은{E}2번 부딪쳐야{E}부서져요\"},\"stage\":{\"en\":\"STAGE\",\"jp\":\"STAGE\",\"kr\":\"STAGE\"},\"score\":{\"en\":\"SCORE\",\"jp\":\"SCORE\",\"kr\":\"SCORE\"},\"exit\":{\"en\":\"EXIT\",\"jp\":\"EXIT\",\"kr\":\"EXIT\"},\"giveup\":{\"en\":\"Do you {E}give up{E} the game?\",\"jp\":\"ゲームをやめますか？\",\"kr\":\"게임을{E}포기하시겠습니까?\"},\"continue\":{\"en\":\"CONTINUE\",\"jp\":\"CONTINUE\",\"kr\":\"CONTINUE\"},\"use1heart\":{\"en\":\"Can I have{E} an additional{E} ball with 1 heart?\",\"jp\":\"ハートを{E}1個使用して{E}続けますか?\",\"kr\":\"하트 1개로 추가구슬을{E}지급받으시겠습니까?\"},\"yes\":{\"en\":\"YES\",\"jp\":\"YES\",\"kr\":\"YES\"},\"no\":{\"en\":\"NO\",\"jp\":\"NO\",\"kr\":\"NO\"},\"heartshop\":{\"en\":\"HEART SHOP\",\"jp\":\"ハートショップ\",\"kr\":\"HEART SHOP\"},\"signup\":{\"en\":\"SIGN UP\",\"jp\":\"会員登録\",\"kr\":\"회원가입\"},\"purfin\":{\"en\":\"Purchase is completed.\",\"jp\":\"購入を完了しました。\",\"kr\":\"구매를 완료하였습니다\"},\"purcancel\":{\"en\":\"Purchase canceled\",\"jp\":\"購入をキャンセルしました。\",\"kr\":\"구매가 취소되었습니다\"},\"gotosignup\":{\"en\":\"Would you like to go {E}to the membership page?\",\"jp\":\"会員登録ページに{E}移動しますか?\",\"kr\":\"회원가입 페이지로{E}이동하시겠습니까?\"},\"membersonly\":{\"en\":\"MEMBERS\",\"jp\":\"会員専用\",\"kr\":\"회원전용\"},\"ok\":{\"en\":\"OK\",\"jp\":\"OK\",\"kr\":\"OK\"},\"settings\":{\"en\":\"SETTINGS\",\"jp\":\"設定\",\"kr\":\"SETTINGS\"},\"gotheart\":{\"en\":\"I got {V} hearts!\",\"jp\":\"ハートを{V}個ゲットしたよ！\",\"kr\":\"하트를 {V}개 획득했어요!\"},\"login\":{\"en\":\"LOGIN\",\"jp\":\"ログイン\",\"kr\":\"LOGIN\"},\"MSHOP\":{\"en\":\"M SHOP\",\"jp\":\"M SHOP\",\"kr\":\"M SHOP\"},\"MGM_Title\":{\"en\":\"Cosmic Pop\",\"jp\":\"Cosmic Pop\",\"kr\":\"코스믹 팝\"},\"MGM_Contents\":{\"en\":\"Bubble shooter game.{E}Invite you to mysterious world.\",\"jp\":\"回る！回る！回る！360度回転しながら、{E} バブルを撃ちまくれ!{E} 今までにない新感覚発射系パズル！\",\"kr\":\"아래에서 위로 쏘는 시시한 버블은 이제 NO~{E}360도로 회전하면 사방에서 쏘는 뉴 버블~{E}신비한 버블의 세계로 당신을 초대합니다.\"}}";
var tbString = JSON.parse(tbString_json);

// 샵메세지
var tbShpMsg_json = "{\"signup\":{\"en\":\"Members only!<br/>Would you like to go to the sign up page?\",\"jp\":\"会員専用になります。<br/>会員登録をしますか?\",\"kr\":\"회원전용!<br/>회원가입 하시겠습니까?\"},\"gotogpg\":{\"en\":\"Only available in the Moby Games app.<br/>Would you like to go to the Moby Games app?\",\"jp\":\"モビーゲームアプリのみ購入で きます。<br/>モビーゲームアプリに移動しますか？\",\"kr\":\"모비게임 앱에서만 구매 가능합니다.<br/>모비게임 앱으로 이동하시겠습니까?\"},\"lowpoint\":{\"en\":\"Not enough points!\",\"jp\":\"ポイントが足りません!\",\"kr\":\"포인트가 부족합니다!\"}}";
//

var tbShpMsg = JSON.parse(tbShpMsg_json);
//
function GetString(key, data)
{
    if(data === undefined) data = null;
    switch(CURRENT_LANGUAGE)
    {
        case LANGUAGE_ENG:
            if(data == null)
                return tbString[key].en.replace(/{E}/gi, "\n");
            else
                return tbString[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case LANGUAGE_JPN:
            if(data == null)
                return tbString[key].jp.replace(/{E}/gi, "\n");
            else
                return tbString[key].jp.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case LANGUAGE_KOR:
            if(data == null)
                return tbString[key].kr.replace(/{E}/gi, "\n");
            else
                return tbString[key].kr.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
    }
	
	return "";
}
function GetShpMsg(key, data)
{
    if(data === undefined) data = null;
    switch(CURRENT_LANGUAGE)
    {
        case LANGUAGE_ENG:
            if(data == null)
                return tbShpMsg[key].en.replace(/{E}/gi, "\n");
            else
                return tbShpMsg[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case LANGUAGE_JPN:
            if(data == null)
                return tbShpMsg[key].jp.replace(/{E}/gi, "\n");
            else
                return tbShpMsg[key].jp.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case LANGUAGE_KOR:
            if(data == null)
                return tbShpMsg[key].kr.replace(/{E}/gi, "\n");
            else
                return tbShpMsg[key].kr.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
    }

    return "";
}

//=============================================================================
// 스프라이트 생성 관련
//=============================================================================
function SpriteLoad(parent, url, px, py, ax, ay)
{
	if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;
	
	//var spr = SpritePool.getInstance().get(url);
    
    //에러예외처리 //지울것
    var spr;
    try {
        spr = SpritePool.getInstance().get(url);
    } catch (e) {
        //오류:"img2/heart_no_2png"
        spr = SpritePool.getInstance().get("img2/heart_no_2.png");
    }
    //에러예외처리 //지울것


	spr.position.x = px;
	spr.position.y = py;
	spr.anchor.x = ax;
	spr.anchor.y = ay;
	
	if(parent) parent.addChild(spr);
	
	return spr;
}

function FontLoad(parent, str, x, y, ax, ay, style, limitWidth)
{
	if(limitWidth === undefined) limitWidth = 0;
	var txt = new PIXI.Text(str, style);
	txt.anchor.set(ax, ay);
	txt.position.x = x;
	txt.position.y = y;
	
	if(limitWidth > 0 && txt.width > limitWidth) // 자동으로 사이즈를 줄여준다.
		txt.scale.set(limitWidth/txt.width);

    if(parent) parent.addChild(txt);
	
	return txt;
}

function BitmapFontLoad(parent, str, x, y, ax, ay, style, limitWidth)
{
	if(limitWidth === undefined) limitWidth = 0;
	var txt = new PIXI.extras.BitmapText(str, style);
	if(limitWidth > 0 && txt.width > limitWidth) // 자동으로 사이즈를 줄여준다.
		txt.scale.set(limitWidth/txt.width);
	txt.position.x = x - (txt.width*ax);
	txt.position.y = y - (txt.height*ay);
	
	parent.addChild(txt);
	
	return txt;
}

var SpnInit = {
    none:0,
    slot:1,
    bone:2,
    all:3
}
var SPINE_INIT_NONE = 0;
var SPINE_INIT_SLOTS = 1;
var SPINE_INIT_BONES = 2;
var SPINE_INIT_ALL = 3;
function SpinePlay(spine, x, y, aniName, trackIndex, loop, initType)
{
	if(trackIndex === undefined) trackIndex = 0;
	if(loop === undefined) loop = false;
	if(initType === undefined) initType = SPINE_INIT_ALL;
	spine.visible = true;
	spine.alpha = 1;
	if(x != null) spine.position.x = x;
	if(y != null) spine.position.y = y;

	switch(initType)
	{
	case SPINE_INIT_NONE:
		break;
	case SPINE_INIT_SLOTS:
		spine.skeleton.setSlotsToSetupPose();
		break;
	case SPINE_INIT_BONES:
		spine.skeleton.setBonesToSetupPose();
		break;
	case SPINE_INIT_ALL:
		spine.skeleton.setToSetupPose();		// 아래 슬롯 및 본 두개다 초기화.
		break;
	}
	spine.state.clearTracks();	// 애니메이션 초기화.
	spine.state.setAnimationByName(trackIndex, aniName, loop);
//	spine.state.timeScale = 1;
//	spine.skeleton.setSlotsToSetupPose();	// 슬롯만 초기화.
//	spine.skeleton.setBonesToSetupPose();	// 본만 초기화.	
//	spine.state.update(0);
}

//하울러사운드-------
var iBGMCurrent = -1;
var iBGMOld = -1;
var soundCtrl = [];
var BGM_Title = 0;
//하울러사운드-------

//=============================================================================
// 폰트 관련 로딩..
//=============================================================================
window.WebFontConfig = {
    active: function() {
    },
    custom: {
        families:[tbTTF[lang]],
        urls: [strGamePath+'./css/font.css']
    }
};

(function() {
    var wf = document.createElement('script');
    wf.src = wf.src = strGamePath+"../Common/webfont.js";
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();
//=============================================================================
// 사운드 관련 변수
//=============================================================================
//var tbSoundName = new Array(
////		["sound/BGM_Fever.ogg", "sound/BGM_Fever.mp3"],
////		["sound/BGM_Game.ogg", "sound/BGM_Game.mp3"],               //--
////		["sound/BGM_Title.ogg", "sound/BGM_Title.mp3"],             //--
////		
////		["sound/SE_Achievements.ogg", "sound/SE_Achievements.mp3"],
////		["sound/SE_bonusCount.ogg", "sound/SE_bonusCount.mp3"],
////		["sound/SE_bonusend.ogg", "sound/SE_bonusend.mp3"],
////		["sound/SE_bonusfly.ogg", "sound/SE_bonusfly.mp3"],
////		["sound/SE_Button.ogg", "sound/SE_Button.mp3"],
////		["sound/SE_buy.ogg", "sound/SE_buy.mp3"],
////		["sound/SE_empty.ogg", "sound/SE_empty.mp3"],
////		["sound/SE_num.ogg", "sound/SE_num.mp3"],
////		["sound/SE_Shop.ogg", "sound/SE_Shop.mp3"],
////		["sound/SE_Shuriken.ogg", "sound/SE_Shuriken.mp3"],
////		["sound/SE_Shurikenfly.ogg", "sound/SE_Shurikenfly.mp3"],
////		["sound/SE_yo.ogg", "sound/SE_yo.mp3"],
////		["sound/VOICE_Nyan.ogg", "sound/VOICE_Nyan.mp3"]
//    //--
//    ["sound/Bgm.mp3", "sound/Bgm.ogg"],                 //0
//    ["sound/BusterStart.mp3", "sound/BusterStart.ogg"], //1
//    ["sound/Click.mp3", "sound/Click.ogg"],             //2
//    ["sound/Defeat.mp3", "sound/Defeat.ogg"],           //3
//    ["sound/MeteoBoom.mp3", "sound/MeteoBoom.ogg"],     //4
//    ["sound/Move.mp3", "sound/Move.ogg"],               //5
//    ["sound/RockBoom.mp3", "sound/RockBoom.ogg"],       //6
//    ["sound/RockBounce.mp3", "sound/RockBounce.ogg"],   //7
//    ["sound/RockHit.mp3", "sound/RockHit.ogg"],         //8
//    ["sound/RockOut.mp3", "sound/RockOut.ogg"],         //9
//    ["sound/RockShoot.mp3", "sound/RockShoot.ogg"],     //10
//    ["sound/StageOpen.mp3", "sound/StageOpen.ogg"],     //11
//    ["sound/Victory.mp3", "sound/Victory.ogg"]          //12
//    //--
//);
//바로전백업
//var tbBGMName = new Array(
//    ["sound/Bgm.mp3", "sound/Bgm.ogg"]                  //0
//);
//var tbSEName = new Array(
//    ["sound/BusterStart.mp3", "sound/BusterStart.ogg"], //0
//    ["sound/Click.mp3", "sound/Click.ogg"],             //1
//    ["sound/Defeat.mp3", "sound/Defeat.ogg"],           //2
//    ["sound/MeteoBoom.mp3", "sound/MeteoBoom.ogg"],     //3
//    ["sound/Move.mp3", "sound/Move.ogg"],               //4
//    ["sound/RockBoom.mp3", "sound/RockBoom.ogg"],       //5
//    ["sound/RockBounce.mp3", "sound/RockBounce.ogg"],   //6
//    ["sound/RockHit.mp3", "sound/RockHit.ogg"],         //7
//    ["sound/RockOut.mp3", "sound/RockOut.ogg"],         //8
//    ["sound/RockShoot.mp3", "sound/RockShoot.ogg"],     //9
//    ["sound/StageOpen.mp3", "sound/StageOpen.ogg"],     //10
//    ["sound/VistrGamePath+ctory.mp3", "sound/Victory.ogg"]          //11
//);

//새로운사운드
// var tbBGMName = new Array(
//     [strGamePath+"sound/bgm.mp3", strGamePath+"sound/bgm.ogg"]
//     );

var tbSEName = [
    [strGamePath+"sound/bgm.ogg"           ,strGamePath+"sound/bgm.mp3"             ],
    [strGamePath+"sound/BusterStart.ogg"   ,strGamePath+"sound/BusterStart.mp3"     ], //0
    [strGamePath+"sound/Click.ogg"         ,strGamePath+"sound/Click.mp3"           ],             //1
    [strGamePath+"sound/Defeat.ogg"        ,strGamePath+"sound/Defeat.mp3"          ],           //2
    [strGamePath+"sound/MeteoBoom.ogg"     ,strGamePath+"sound/MeteoBoom.mp3"       ],     //3
    [strGamePath+"sound/Move.ogg"          ,strGamePath+"sound/Move.mp3"            ],               //4
    [strGamePath+"sound/RockBoom.ogg"      ,strGamePath+"sound/RockBoom.mp3"        ],       //5
    [strGamePath+"sound/RockBounce.ogg"    ,strGamePath+"sound/RockBounce.mp3"      ],   //6
    [strGamePath+"sound/RockHit.ogg"       ,strGamePath+"sound/RockHit.mp3"         ],         //7
    [strGamePath+"sound/RockOut.ogg"       ,strGamePath+"sound/RockOut.mp3"         ],         //8
    [strGamePath+"sound/RockShoot.ogg"     ,strGamePath+"sound/RockShoot.mp3"       ],     //9
    [strGamePath+"sound/StageOpen.ogg"     ,strGamePath+"sound/StageOpen.mp3"       ],     //10
    [strGamePath+"sound/Victory.ogg"       ,strGamePath+"sound/Victory.mp3"         ],         //11
    [strGamePath+"sound/GetItem.ogg"       ,strGamePath+"sound/GetItem.mp3"         ],         //12
    [strGamePath+"sound/GetStar.ogg"       ,strGamePath+"sound/GetStar.mp3"         ],         //13
    [strGamePath+"sound/SaveFriend.ogg"    ,strGamePath+"sound/SaveFriend.mp3"      ],   //14
    [strGamePath+"sound/ShieldHit.ogg"     ,strGamePath+"sound/ShieldHit.mp3"       ],     //15
    [strGamePath+"sound/StoneBoom.ogg"     ,strGamePath+"sound/StoneBoom.mp3"       ],     //16
    [strGamePath+"sound/StoneBroken.ogg"   ,strGamePath+"sound/StoneBroken.mp3"     ], //17
    [strGamePath+"sound/StoneHit.ogg"      ,strGamePath+"sound/StoneHit.mp3"        ],        //18
    [strGamePath+"sound/RockOut2.ogg"      ,strGamePath+"sound/RockOut2.mp3"        ],         //19
    [strGamePath+"sound/RockOut3.ogg"      ,strGamePath+"sound/RockOut3.mp3"        ],         //20
    [strGamePath+"sound/RockOut4.ogg"      ,strGamePath+"sound/RockOut4.mp3"        ],         //21
    [strGamePath+"sound/SE_Heart.ogg"      ,strGamePath+"sound/SE_Heart.mp3"        ],         //22
    [strGamePath+"sound/InputStar.ogg"     ,strGamePath+"sound/InputStar.mp3"       ],         //23
    [strGamePath+"sound/InputItem.ogg"     ,strGamePath+"sound/InputItem.mp3"       ],         //24
    [strGamePath+"sound/Danger.ogg"        ,strGamePath+"sound/Danger.mp3"          ],             //25
    [strGamePath+"sound/SE_ClickMove.ogg"  ,strGamePath+"sound/SE_ClickMove.mp3"    ],  //26
    [strGamePath+"sound/SE_ClickNo.ogg"    ,strGamePath+"sound/SE_ClickNo.mp3"      ],       //27
    [strGamePath+"sound/SE_Start.ogg"      ,strGamePath+"sound/SE_Start.mp3"        ]            //28
    ];
// var tbSEName = [
//     [strGamePath+"sound/bgm.mp3"             ,strGamePath+"sound/bgm.ogg"           ],
//     [strGamePath+"sound/BusterStart.mp3"     ,strGamePath+"sound/BusterStart.ogg"   ], //0
//     [strGamePath+"sound/Click.mp3"           ,strGamePath+"sound/Click.ogg"         ],             //1
//     [strGamePath+"sound/Defeat.mp3"          ,strGamePath+"sound/Defeat.ogg"        ],           //2
//     [strGamePath+"sound/MeteoBoom.mp3"       ,strGamePath+"sound/MeteoBoom.ogg"     ],     //3
//     [strGamePath+"sound/Move.mp3"            ,strGamePath+"sound/Move.ogg"          ],               //4
//     [strGamePath+"sound/RockBoom.mp3"        ,strGamePath+"sound/RockBoom.ogg"      ],       //5
//     [strGamePath+"sound/RockBounce.mp3"      ,strGamePath+"sound/RockBounce.ogg"    ],   //6
//     [strGamePath+"sound/RockHit.mp3"         ,strGamePath+"sound/RockHit.ogg"       ],         //7
//     [strGamePath+"sound/RockOut.mp3"         ,strGamePath+"sound/RockOut.ogg"       ],         //8
//     [strGamePath+"sound/RockShoot.mp3"       ,strGamePath+"sound/RockShoot.ogg"     ],     //9
//     [strGamePath+"sound/StageOpen.mp3"       ,strGamePath+"sound/StageOpen.ogg"     ],     //10
//     [strGamePath+"sound/Victory.mp3"         ,strGamePath+"sound/Victory.ogg"       ],         //11
//     [strGamePath+"sound/GetItem.mp3"         ,strGamePath+"sound/GetItem.ogg"       ],         //12
//     [strGamePath+"sound/GetStar.mp3"         ,strGamePath+"sound/GetStar.ogg"       ],         //13
//     [strGamePath+"sound/SaveFriend.mp3"      ,strGamePath+"sound/SaveFriend.ogg"    ],   //14
//     [strGamePath+"sound/ShieldHit.mp3"       ,strGamePath+"sound/ShieldHit.ogg"     ],     //15
//     [strGamePath+"sound/StoneBoom.mp3"       ,strGamePath+"sound/StoneBoom.ogg"     ],     //16
//     [strGamePath+"sound/StoneBroken.mp3"     ,strGamePath+"sound/StoneBroken.ogg"   ], //17
//     [strGamePath+"sound/StoneHit.mp3"        ,strGamePath+"sound/StoneHit.ogg"      ],        //18
//     [strGamePath+"sound/RockOut2.mp3"        ,strGamePath+"sound/RockOut2.ogg"      ],         //19
//     [strGamePath+"sound/RockOut3.mp3"        ,strGamePath+"sound/RockOut3.ogg"      ],         //20
//     [strGamePath+"sound/RockOut4.mp3"        ,strGamePath+"sound/RockOut4.ogg"      ],         //21
//     [strGamePath+"sound/SE_Heart.mp3"        ,strGamePath+"sound/SE_Heart.ogg"      ],         //22
//     [strGamePath+"sound/InputStar.mp3"       ,strGamePath+"sound/InputStar.ogg"     ],         //23
//     [strGamePath+"sound/InputItem.mp3"       ,strGamePath+"sound/InputItem.ogg"     ],         //24
//     [strGamePath+"sound/Danger.mp3"          ,strGamePath+"sound/Danger.ogg"        ],             //25
//     [strGamePath+"sound/SE_ClickMove.mp3"    ,strGamePath+"sound/SE_ClickMove.ogg"  ],  //26
//     [strGamePath+"sound/SE_ClickNo.mp3"      ,strGamePath+"sound/SE_ClickNo.ogg"    ],       //27
//     [strGamePath+"sound/SE_Start.mp3"        ,strGamePath+"sound/SE_Start.ogg"      ]            //28
// ];
var Dmode = {begin:0,run:1,end:2,idle:3};
var DangerMode = Dmode.idle;

var bgm = {
    title:0
};
var se = {
    BusterStart:1,
    Click:2,
    Defeat:3,
    MeteoBoom:4,
    Move:5,
    RockBoom:6,
    RockBounce:7,
    RockHit:8,
    RockOut:9,
    RockShoot:10,
    StageOpen:11, //안사용
    Victory:12,

    GetItem:13,
    GetStar:14,
    SaveFriend:15,
    ShieldHit:16,
    StoneBoom:17,
    StoneBroken:18,
    StoneHit:19,

    RockOut2:20,
    RockOut3:21,
    RockOut4:22,

    SE_Heart:23,

    InputStar:24,
    InputItem:25,
    Danger:26,

    SE_ClickMove:27,
    SE_ClickNo:28,
    SE_Start:29,
};
//사운드리스트


//


var bSoundBGM_bak = true; //kData.bSoundBGM //배경음변수
var bSoundSE_bak = true;  //kData.bSoundSE //효과음변수
//var bSoundLoad = false;



function BGMSoundPlay(index, loop)
{
	// if(loop === undefined) loop = true;
	//
	// if(kData.bSoundBGM == false) return;
	//
	// if(iBGMCurrent != -1 && iBGMCurrent != index){
     //    if(arrBGM[iBGMCurrent].playing == true)
     //        arrBGM[iBGMCurrent].stop();
    // }else{
	//     index = 0;
    // }
    //
	// iBGMCurrent = index;
    // //iBGMCurrent = 0;
    //
	// arrBGM[iBGMCurrent].play();
	// arrBGM[iBGMCurrent].loop = loop;
    //하울러사운드--------------
    if(soundCtrl.length==0) return;
    if(kData.bSoundBGM == false) return;
    if(loop === undefined) loop = true;
    if(iBGMCurrent == index && soundCtrl[iBGMCurrent].playing() == true) return;
    if(iBGMCurrent != -1)
        soundCtrl[iBGMCurrent].stop();

    iBGMCurrent = index;
    soundCtrl[iBGMCurrent]._loop = loop;
    soundCtrl[iBGMCurrent].play();
    //하울러사운드--------------
}

function BGMSoundStop()
{
	// if(kData.bSoundBGM == false) return;
	// if(iBGMCurrent == -1) return;
	//
	// if(arrBGM[iBGMCurrent].playing == true)
	// 	arrBGM[iBGMCurrent].reset();
}

function BGMSoundPause()
{
    // if(arrBGM[iBGMCurrent] == null) return;
	// if(iBGMCurrent == -1) return;
    //
	// if(arrBGM[iBGMCurrent].playing == true)
	// 	arrBGM[iBGMCurrent].paused = true;
    //하울러사운드--------------
    if(iBGMCurrent != -1)
        soundCtrl[0].pause();
    //하울러사운드--------------
}

function BGMSoundResume()
{
    // if(arrBGM[iBGMCurrent] == null) return;
    //
    // if(iBGMCurrent != -1)
    // {
		// if(kData.bSoundBGM == true)
		// {
		// 	if(arrBGM[iBGMCurrent].paused == true)
		// 		arrBGM[iBGMCurrent].paused = false;
		// 	//
		// 	else if(arrBGM[iBGMCurrent].paused == false){
    //              BGMSoundPlay(iBGMCurrent);
    //         }
    //         //
    //     }
    // }
    // else       //첫실행일때는 그냥 실행한다.
    // {
    //     BGMSoundPlay(iBGMCurrent);
    // }
    //하울러사운드--------------
    if(kData.bSoundBGM == false) return;
    kData.bSoundBGM=true;
    if(iBGMCurrent == -1){
        BGMSoundPlay(BGM_Title); //배경음인덱스저장
        //if(state == STATE_TITLE){ BGMSoundPlay(BGM_Title);
        //else if(state == STATE_GAME)  BGMSoundPlay(BGM_Game);
        return;
    }
    if(soundCtrl[BGM_Title].playing() == true) return;
    soundCtrl[BGM_Title].play();
    //하울러사운드--------------
}
var stop = false;
function SESoundPlay(index, loop)
{
	// if(loop === undefined) loop = false;
	// if(kData.bSoundSE == false) return;
	// if(arrSE[index] == null) return;
	//
	// if(arrSE[index].playing == true)
	// 	arrSE[index].reset();
	// arrSE[index].play();
	// arrSE[index].loop = loop;
    //하울러사운드--------------
    if(!kData.bSoundSE)
        return;

    if(stop)
        soundCtrl[index].stop();

    soundCtrl[index].play();
    return;
    //하울러사운드--------------
}

function SESoundStop(index)
{
	// if(kData.bSoundSE == false) return;
	// if(arrSE[index] == null) return;
	//
	// arrSE[index].reset();
}

function SESoundPause()
{
	// for(var i=0;i<arrSE.length;++i)
	// {
	// 	if(arrSE[i] != null && arrSE[i].playing == true)
	// 		arrSE[i].paused = true;
	// }
    //하울러사운드--------------
    //배경음1개이므로
    for(var i=0,imax=soundCtrl.length-1;i<imax;++i)
        if(soundCtrl[i+1].playing())
            soundCtrl[i+1].pause();
    return;
    //하울러사운드--------------
}
function SEDangerPause(){
    if(dm) console.log("SEDangerReset");
    //arrSE[se.Danger].reset();
    if(soundCtrl.length==0) return;
    //경고효과음
    if(kData.bSoundSE === false) return;
    if(soundCtrl[se.Danger].playing) soundCtrl[se.Danger].stop();
}
function SEDangerPlay(){
    // if(dm) console.log("SEDangerPlay");
    // if(kData.bSoundSE == false) return;
    // if(arrSE[se.Danger].playing == true) {
    //     //arrSE[se.Danger].reset();
    //     arrSE[se.Danger].paused = false;
    // }else{
    //     arrSE[se.Danger].play();
    //     arrSE[se.Danger].loop = true;
    // }
    if(kData.bSoundSE === false) return;
    if(!soundCtrl[se.Danger].playing())
        soundCtrl[se.Danger].play();

}
function SESoundResume()
{
	// if(kData.bSoundSE == true)
	// {
	// 	for(var i=0;i<arrSE.length;++i)
	// 	{
	// 		if(arrSE[i] != null && arrSE[i].paused == true)
	// 			arrSE[i].paused = false;
	// 	}
	// }
}

function SoundPause() //사운드함수정지
{
	BGMSoundPause();
	SESoundPause();
}
function SoundPauseByBlur() //사운드함수정지
{
    BGMSoundPause();
    SESoundPause();
    //kData.bSoundBGM = false;
    //if(bgmOffMarkinSel!=undefined)bgmOffMarkinSel.visible = true;


    SEDangerPause();

    // if(bgmOffMarkinSel!=undefined)bgmOffMarkinSel.visible = true;
    // kData.bSoundSE = false;
    // sfxOffMarkinSel.visible = true;
}

function SoundResume() //사운드함수켜기
{
//	if(gameState == STATE_GAME_PAUSE) return;
	BGMSoundResume();
	SESoundResume();//없음
}
//=============================================================================
// 화면이 리사이즈되면 처리한다.
//=============================================================================
var bPhone;	// 폰인지 아닌지 체크.
if (/Android/i.test(navigator.userAgent)) {
    bPhone = true;
} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    bPhone = true;
} else {
    bPhone = false;
}
var bRotation = false;

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

function resize(){
//	console.log("window.w : " + $(window).width());
//	console.log("window.h : " + $(window).height());
//	console.log("document.w : " + $(document).width());
//	console.log("document.h : " + $(document).height());
//	console.log("screen.w : " + screen.width);	// 이건 모니터 사이즈
//	console.log("screen.h : " + screen.height);	// 이건 모니터 사이즈.

    var w, h, per;	// modifier : kook : 일본대응. : yahooIN
    w = window.innerWidth;
    h = window.innerHeight;

    if(bPhone == true && w > h && bRotation == false){
        bRotation = true;
        document.getElementById("turn").style.display="block";
        return;
    }else if(w <= h && bRotation == true){
        bRotation = false;
        document.getElementById("turn").style.display="none";
    }

    if(w * iMaxSizeY <= h * iMaxSizeX){
        per = (w * iMaxSizeY) / (h * iMaxSizeX);
        renderer.view.style.position = "absolute";	// "absolute"가 셋팅되어 있으면 가운데 정렬이 되지 않는다.
        renderer.view.style.width = "100%";
        renderer.view.style.height = (per*100) + "%";
        renderer.view.style.left = "0px";
        renderer.view.style.top = (1-per) * h / 2 + "px"
    }else{ // 게임 사이즈보다 세로가 더 클경우 자동확대되는것을 방지한다.
        if(((h * iMaxSizeX) / (w * iMaxSizeY)*100) >= 80){
            renderer.view.style.position = "absolute"; // 이 옵션을 사용할경우 윈도우 사이즈에 맞게 스케일링이 되어 버린다.
            renderer.view.style.width = "100%";
            renderer.view.style.height = "100%";
            renderer.view.style.left = "0px";
            renderer.view.style.top = "0px";
        }else{
            per = (h * iMaxSizeX) / (w * iMaxSizeY);
            renderer.view.style.position = "absolute";
            renderer.view.style.width = (per*100) + "%";
            renderer.view.style.height = "100%";
            renderer.view.style.left = (1-per) * w / 2 + "px";
            renderer.view.style.top = "0px";
        }
    }
}
//=============================================================================
// 타이머 관련
//=============================================================================
var tickNow;
var tickLast = Date.now();
var deltaTime = 0;
function updateTick()
{
	tickNow = Date.now();
	deltaTime = (tickNow - tickLast) * 0.001;
	tickLast = tickNow;
}
//=============================================================================
//점수 카운트 관련
//=============================================================================
function lerp(minNum, maxNum, t){ //t 값은 0~1사이의 값을 가집니다.
	var _num;
	if(t>=1){
		_num = maxNum;
		return Math.floor(_num);
	}
	
	_num = (maxNum - minNum)*t + minNum;
	
	return Math.floor(_num);
}//t 값 구성 방법 : updateTick()을 이용 , 쌓이는 시간 변수 += deltaTime, t = 쌓이는 시간 변수 / 맥스지점까지 도달하는데 걸리는 시간 입니다.
//=============================================================================
// 자릿수에 맞게 0값을 앞에 넣기..
//=============================================================================
function leadingZeros(n, digits){
	var zero = '';
	n = n.toString();
	
	if (n.length < digits){
		for (var i = 0; i < digits - n.length; i++)
		zero += '0';
	}
	return zero + n;
}

function RandomMix(random, mixCnt)
{
	var temp, r1, r2;
	
	for(var i=0;i<mixCnt;++i)
	{
		r1 = Math.floor(Math.random() * random.length);
		r2 = Math.floor(Math.random() * random.length);
		
		temp = random[r1];
		random[r1] = random[r2];
		random[r2] = temp;
	}
}
//=============================================================================
//	세이브 관련
//=============================================================================
var kData = new Data();
var clientData = new ClientData(); //상점용추가

var SAVE_TIME_INIT = 10;
var SAVE_VER = 1;
//LoadData();
//LoadDataInClient();//임시로 사용중

function Data(){
    this.iVer;
    //--뉴--
    this.curLevel;
    this.curPage;
    this.userStarArray;
    this.userScoreArray;
    this.tutorialpoint;
    //--뉴--
    this.iHeart;
    this.fHeartTime;
    this.greappoint;
    //
    this.bSoundBGM;
    this.bSoundSE;
    this.iSaveTimeStamp;
    this.btncooltime;

    this.btnTimeStamp;
}
function ClientData() {
    // this.bSoundBGM;
    // this.bSoundSE;
    // this.iSaveTimeStamp;
    // this.btncooltime;//AD쿨타임자동저장
}

function Data_bak(){
	this.iVer;
	this.bSoundBGM;
	this.bSoundSE;
    //--뉴--
    this.curLevel;
    this.curPage;
    this.userStarArray;
    this.userScoreArray;
    this.iHeart;
    this.tutorialpoint;
    this.greappoint;
    //--뉴--
}
function InitData()
{
    kData.iVer = SAVE_VER;
    //--뉴--
    kData.curLevel=0;
    kData.curPage=0;
    //kData.userStarArray = new Array(LEVEL_MAX);
    kData.userStarArray = [];
    for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userStarArray[i] = -1;
    kData.userStarArray[0]=0; //0레벨 오픈
    //kData.userScoreArray = new Array(LEVEL_MAX);
    kData.userScoreArray = [];
    for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userScoreArray[i] = 0;
    kData.tutorialpoint=0;        //0단계
    kData.greappoint=0; //예전 그레이프포인트저장소
    //--뉴--
    kData.iHeart = iHeartInitData;
    kData.fHeartTime = fHeartChargeTime;
    kData.greappoint = 0;

    kData.bSoundBGM = true;
    kData.bSoundSE = true;
    kData.iSaveTimeStamp = 0;
    kData.btncooltime=[0,0,0,0]; //AD쿨타임자동저장

    kData.btnTimeStamp=[null,null,null,null];

    SaveOnlyClientData();
    networkManager.ForcedSaveData();
}
// // 데이터 초기화..
// function InitData()
// {
// 	kData.iVer = SAVE_VER;
// 	kData.bSoundBGM = true;
// 	kData.bSoundSE = true;
//
//     //--뉴--
//     kData.curLevel=0;
//     kData.curPage=0;
//     kData.userStarArray = new Array(LEVEL_MAX);
//     for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userStarArray[i] = -1;
//     kData.userStarArray[0]=0; //0레벨 오픈
//     kData.userScoreArray = new Array(LEVEL_MAX);
//     for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userScoreArray[i] = 0;
//     kData.userHeartCount = 17;
//     kData.tutorialpoint=0;//0단계
//     kData.userPointCount=12345;
//     //--뉴--
// 	SaveData();
// }

function InitOnlyClientData(){ //in LoadDataInClient
    if(yahooIN === undefined) {
        //kData.bSoundBGM = true;
        //kData.bSoundSE = true;
        kData.iSaveTimeStamp = 0;
        kData.btncooltime = [0, 0, 0, 0];//AD쿨타임자동저장
        SaveOnlyClientData();
    }
}

//function SaveData()
function SaveDataInClient() //로컬저장 예)사운드온오프시 저장 //gamemain.js 에서 예전savedata대용으로 막사용한다.
{
// //    쿠키--------------
// 	var strJson = JSON.stringify(kData);
// 	$.cookie('Neo_Cosmic.gamegrape.co.kr', strJson, {expires: 9999});
//    
//  로컬스토리지 --------------
// 	var strJson = JSON.stringify(kData);
// 	localStorage.setItem('Neo_Cosmic.gamegrape.co.kr', strJson);


    if(yahooIN === undefined) { //야후추가<> 로컬저장끄기
        //새로 작성중
        var strJson = JSON.stringify(kData);
        var strJsonClientData = JSON.stringify(clientData);
        localStorage.setItem('CosmicPop_ClientData.grape.co.kr', strJsonClientData); //저장
        if (dm) console.log('SaveDataInClient');
        if (dm) console.log(strJsonClientData);

        saveLocal('CosmicPop_kdata.gamegrape.co.kr');
        //$.cookie('Neo_Neglect.gamegrape.co.kr', strJson, {expires: 9999});
    }
}

function LoadDataInClient()//기존 LoadData() 변형 // //사용 in networkManager.loaddata 또는 LoadDataComplete
{
// //    쿠키   --------------
// 	var strJson = $.cookie('Neo_Cosmic.gamegrape.co.kr');
// 	if(strJson != null)
// 	{
// 		kData = JSON.parse(strJson);
// 		if(kData.userPointCount==undefined) kData.userPointCount=12345;
// 		if(kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
// 			InitData();
// 		else if(kData.bTutorial == true)
// 			InitData();
//         //CurLevel = kData.curLevel;
//         console.log("LoadData().kData.curLevel:"+kData.curLevel);
// 	}
// 	else
// 		InitData();
    if(yahooIN == undefined) { //야후추가<> 로컬로드끄기
//  로컬스토리지--------------
        var strJson = localStorage.getItem('CosmicPop_kdata.gamegrape.co.kr'); //로드
        var strJsonClientData = localStorage.getItem('CosmicPop_ClientData.grape.co.kr'); //로드
        if (strJson != null) {
            kData = JSON.parse(strJson);

            if (kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
                InitData();
            //	else if(kData.bTutorial == true)
            //		InitData();
        }
        else
            InitData();

        if (strJsonClientData != null) {
            clientData = JSON.parse(strJsonClientData);

            if (clientData === undefined)
                InitOnlyClientData();
        }
    }
}
function SaveOnlyClientData() //networkManager.GetServerTime용 콜백속에 //in InitData //in InitOnlyClientData
{
    if(yahooIN == undefined) {
        var strJsonClientData = JSON.stringify(clientData);
        localStorage.setItem('CosmicPop_ClientData.grape.co.kr', strJsonClientData);//저장

        if (dm) console.log('SaveOnlyClientData');
        if (dm) console.log(strJsonClientData);
    }
}
function LoadOnlyClientData() { //gamemain.js->cbLogoComplete()안에서 networkManager.LoadData용 콜백속에
    if(yahooIN == undefined) {
        var strJson = localStorage.getItem('CosmicPop_ClientData.grape.co.kr'); //로드

        if (strJson == null)
            InitOnlyClientData();
        else
            clientData = JSON.parse(strJson);

        if (dm) console.log('LoadOnlyClientData');
        if (dm) console.log(strJson);
    }
}
//=============================================================================
// SpritePool을 관리한다. 남이 사용하던거 카피함..
//=============================================================================
function SpritePool ()
{
    if (SpritePool._isBirth)
        throw new Error("This class is a singleton!");
    else
    {
        SpritePool._instance = this;
        SpritePool._isBirth = true;
    };
    var _pool = [];
    this.get = function (frameId)
    {
        for (var i in _pool)
        {
            if (_pool[i].texture === PIXI.TextureCache[frameId])
            return _pool.splice(i, 1)[0];
        }
        return PIXI.Sprite.fromFrame(frameId);
    };
    this.recycle = function (sprite)
    {
        _pool.push(sprite);
    }
};
SpritePool._isBirth = false;
SpritePool.getInstance = function ()
{
    return SpritePool._instance != null ? SpritePool._instance : new SpritePool();
};
//=============================================================================
//버튼 스케일링
//=============================================================================
Object.defineProperties(PIXI.Sprite.prototype, {
	scaleX: {
	     get: function () { return this.scale.x; },
	     set: function (v) { this.scale.x = v; }
	},
	scaleY: {
	     get: function () { return this.scale.y; },
	     set: function (v) { this.scale.y = v; }
	}
});//pixi.js의 sprite에 greensock tweenmax scale을 적용하기 위한 프로퍼티 설정.

function scaleUp(){ //크기 키우기
	TweenMax.to(this, 0.2, {scaleX:1.05, scaleY:1.05, ease:Back.easeOut.config(5.0)});
}

function restoreScale(){ //크기 되돌리기
	TweenMax.to(this, 0.2, {scaleX:1, scaleY:1, ease:Linear()});
}

// TweenPlay(sStar, 1, 0, null, {alpha: 1}, false, PIXI.tween.Easing.outQuad());
// linear, inQuad, outQuad, inOutQuad, inCubic, outCubic, inOutCubic
// inQuart, outQuart, inOutQuart, inQuint, outQuint, inOutQuint
// inSine, outSine, inOutSine, inExpo, outExpo, inOutExpo, inCirc, outCirc, inOutCirc,
/*
var Easing = {
  linear: function(){return function(t){return t;};},
  inQuad: function(){return function(t){return t*t;};},
  outQuad: function(){return function(t){return t*(2-t);};},
  inOutQuad: function(){return function(t){t *= 2;if ( t < 1 ) return 0.5 * t * t;return - 0.5 * ( --t * ( t - 2 ) - 1 );};},
  inCubic: function(){return function(t){return t * t * t;};},
  outCubic: function(){return function(t){return --t * t * t + 1;};},
  inOutCubic: function(){return function(t){t *= 2;if ( t < 1 ) return 0.5 * t * t * t;t -= 2return 0.5 * ( t * t * t + 2 );};},
  inQuart: function(){return function(t){return t * t * t * t;};},
  outQuart: function(){return function(t){return 1 - ( --t * t * t * t );};},
  inOutQuart: function(){return function(t){t *= 2;if ( t < 1) return 0.5 * t * t * t * t;t -= 2;return - 0.5 * ( t * t * t * t - 2 );};},
  inQuint: function(){return function(t){return t * t * t * t * t;};},
  outQuint: function(){return function(t){return --t * t * t * t * t + 1;};},
  inOutQuint: function(){return function(t){t *= 2;if ( t < 1 ) return 0.5 * t * t * t * t * t;t -= 2;return 0.5 * ( t * t * t * t * t + 2 );};},
  inSine: function(){return function(t){return 1 - Math.cos( t * Math.PI / 2 );};},
  outSine: function(){return function(t){return Math.sin( t * Math.PI / 2 );};},
  inOutSine: function(){return function(t){return 0.5 * ( 1 - Math.cos( Math.PI * t));};},
  inExpo: function(){return function(t){return t === 0 ? 0 : Math.pow( 1024, t - 1 );};},
  outExpo: function(){return function(t){return t === 1 ? 1 : 1 - Math.pow( 2, - 10 * t );};},
  inOutExpo: function(){return function(t){if ( t === 0 ) return 0;if ( t === 1 ) return 1;t *= 2;if ( t < 1 ) return 0.5 * Math.pow( 1024, t - 1 );return 0.5 * ( - Math.pow( 2, - 10 * ( t - 1 ) ) + 2 );};},
  inCirc: function(){return function(t){return 1 - Math.sqrt( 1 - t * t );};},
  outCirc: function(){return function(t){return Math.sqrt( 1 - ( --t * t ) );};},
  inOutCirc: function(){return function(t){t *= 2;if ( t < 1) return - 0.5 * ( Math.sqrt( 1 - t * t) - 1);return 0.5 * ( Math.sqrt( 1 - (t - 2) * (t - 2)) + 1);};},
  inElastic: function(a = 0.1,p = 0.4){return function(t){let s;if ( t === 0 ) return 0;if ( t === 1 ) return 1;if ( !a || a < 1 ) { a = 1; s = p / 4; }else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );return - ( a * Math.pow( 2, 10 * (t-1) ) * Math.sin( ( (t-1) - s ) * ( 2 * Math.PI ) / p ) );};},
  outElastic: function(a = 0.1,p = 0.4){return function(t){let s;if ( t === 0 ) return 0;if ( t === 1 ) return 1;if ( !a || a < 1 ) { a = 1; s = p / 4; }else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );return ( a * Math.pow( 2, - 10 * t) * Math.sin( ( t - s ) * ( 2 * Math.PI ) / p ) + 1 );};},
  inOutElastic: function(a = 0.1,p = 0.4){return function(t){let s;if ( t === 0 ) return 0;if ( t === 1 ) return 1;if ( !a || a < 1 ) { a = 1; s = p / 4; }else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );t *= 2;if ( t < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( t - 1 ) ) * Math.sin( ( (t-1) - s ) * ( 2 * Math.PI ) / p ) );return a * Math.pow( 2, -10 * ( t - 1 ) ) * Math.sin( ( (t-1) - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;};},
  inBack: function(v){return function(t){let s = v || 1.70158;return t * t * ( ( s + 1 ) * t - s );};},
  outBack: function(v){return function(t){let s = v || 1.70158;return --t * t * ( ( s + 1 ) * t + s ) + 1;};},
  inOutBack: function(v){return function(t){let s =  (v || 1.70158) * 1.525;t *= 2;if ( t < 1 ) return 0.5 * ( t * t * ( ( s + 1 ) * t - s ) );return 0.5 * ( ( t - 2 ) * (t-2) * ( ( s + 1 ) * (t-2) + s ) + 2 );};},
  inBounce: function(){return function(t){return 1 - Easing.outBounce()( 1 - t );};},
  outBounce: function(){return function(t){if ( t < ( 1 / 2.75 ) ) {return 7.5625 * t * t;} else if ( t < ( 2 / 2.75 ) ) {t = ( t - ( 1.5 / 2.75 ) );return 7.5625 * t * t + 0.75;} else if ( t < ( 2.5 / 2.75 ) ) {t = (t - ( 2.25 / 2.75 ));return 7.5625 * t * t + 0.9375; } else {t -= ( 2.625 / 2.75 );return 7.5625 * t * t + 0.984375; }};},
  inOutBounce: function(){return function(t){if ( t < 0.5 ) return Easing.inBounce()( t * 2 ) * 0.5;return Easing.outBounce()( t * 2 - 1 ) * 0.5 + 0.5;};},
  customArray: function(arr){if(!arr)return Easing.linear();return function(t){//todo: convert array => ease return t;}}
};
export default Easing;
 */
// 트윈할 오브젝트, 플레이타임, 딜레이타임, from, to, 루프 여부, easing메쏘드
// function TweenPlay(obj, playtime, delaytime, from, to, loop, easing, callback)
// {
// 	var tween = PIXI.tweenManager.createTween(obj);
// 	tween.time = playtime * 1000;
// 	tween.delay = delaytime * 1000;
// 	tween.easing = easing;
// 	if(from != null)	tween.from(from);
//     if(to != null)		tween.to(to);
// 	tween.loop = loop;
// 	tween.start();
//
// 	if(callback != undefined)
// 		tween.on('end', callback);
//
// 	return tween;
// }
//=============================================================================
// 숫자 관련 로직 
//=============================================================================
function XPlus(iA, iB)
{
	var max = Math.max(iA.length, iB.length);
	var iC = [];
	for(var i=0;i<max;++i)
	{
		if(iC[i] === undefined) iC[i] = 0;
		
		if(iA[i] != null && iB[i] != null)
			iC[i] += iA[i] + iB[i];
		else{
			if(iA[i] != null)	iC[i] += iA[i];
			else				iC[i] += iB[i];
		}
		// 올림 처리..
		if(iC[i] >= 10) // 올림작업
		{
			iC[i+1] = Math.floor(iC[i] / 10);
			iC[i] = iC[i] % 10;
		}
	}
	
	return iC;
}

// 캐쉬나 아이템 구매시 이 비교문으로 비교후에 구매를 할수 있을때 구매한다.
function IsXMinus(iA, iB)
{
	if(iA.length < iB.length) // 오른쪽이 자릿수가 맞으면 마이너스를 할수 없다
		return false;
	else if(iA.length == iB.length) // 값이 같을경우 비교해서 왼쪽이 크면 true, 오른쪽이 크면 false;
	{
		for(var i=iA.length-1;i>=0;--i)
		{
			if(iA[i] > iB[i])
				return true;
			else if(iA[i] > iB[i])
				return false;
		}
	}
	else
		return true;
		
	return true;
}

function XMinus(iA, iB)
{
	if(iA.length < iB.length)	return [0];	// 오른쪽이 클경우 0으로 처리한다. 
		
	var max = Math.max(iA.length, iB.length); // iA가 같거나 무조건 커야 한다.
	var iC = [];
	for(var i=0;i<max;++i)
	{
		if(iC[i] === undefined) iC[i] = 0;
		
		if(iA[i] != null && iB[i] != null)
			iC[i] = iC[i] + iA[i] - iB[i];
		else{
			if(iA[i] != null)	iC[i] += iA[i];
			else				iC[i] += iB[i];
		}

		if(iC[i] < 0) // 올림작업
		{
			iC[i] = 10 + iC[i];
			iC[i+1] = -1;
		}		
	}
	
	// 앞쪽에 0이 들어가게 되면 빼준다.
	for(var i=iC.length-1;i>0;--i)
	{
		if(iC[i] == 0)
			iC.pop();
		else
			break;
	}
	
	// 0보다 작을경우 0을 반환한다.
	for(var i=iC.length-1;i>=0;--i)
		if(iC[i] < 0)
			return [0];
	
	return iC;
}

function XMultiply(iA, iB)
{
	var iS = [];
	for(var i=0;i<iB.length;++i)
	{
		var iC = [];
		for(var j=0;j<i;++j) // 10의배수 자릿수 설정..
			iC[j] = 0;
		for(var j=0;j<iA.length;++j)
		{
			if(iC[j+i] === undefined) iC[j+i] = 0;
			iC[j+i] += iB[i] * iA[j];
			if(iC[j+i] >= 10) // 올림작업
			{
				iC[j+i+1] = Math.floor(iC[j+i] / 10);
				iC[j+i] = iC[j+i] % 10;
			}
		}
		iS = XPlus(iS, iC);
	}
	
	return iS;
}

// 소수점이나 지수갑으로 들어온값으로 계산한다.
function XMultiplyEx(iA, iT)
{
	var iS = [];
	var iB = [];
	var multiply = 0;
	if(iT.toString().indexOf(".") >= 0) // 소수점일경우..
	{
		multiply = iT.toString().length - (iT.toString().indexOf(".") + 1);
		iT = Math.floor(iT * Math.pow(10, multiply));
	}
	iB = XNumToNum(iT);
	
	for(var i=0;i<iB.length;++i)
	{
		var iC = [];
		for(var j=0;j<i;++j) // 10의배수 자릿수 설정..
			iC[j] = 0;
		for(var j=0;j<iA.length;++j)
		{
			if(iC[j+i] === undefined) iC[j+i] = 0;
			iC[j+i] += iB[i] * iA[j];
			if(iC[j+i] >= 10) // 올림작업
			{
				iC[j+i+1] = Math.floor(iC[j+i] / 10);
				iC[j+i] = iC[j+i] % 10;
			}
		}
		iS = XPlus(iS, iC);
	}
	
	if(multiply > 0)
		for(var i=0;i<multiply;++i)
			iS.shift();
	
	return iS;
}


// 문자열을 숫자로 변경.
function XStringToNum(str)
{
	var iT = [];
	var is = 0;
	for(var i=0;i<str.length;++i)
	{
		is = str.length - 1 - i;
		iT[i] = parseInt(str.slice(is, is+1)); // 거꾸로 넣는다.
	}
	return iT;
}

function XNumToNum(num)
{
	var str = num.toString();
	var iT = [];
	var is = 0;
	for(var i=0;i<str.length;++i)
	{
		is = str.length - 1 - i;
		iT[i] = parseInt(str.slice(is, is+1)); // 거꾸로 넣는다.
	}
	return iT;
}
/*
function XNumViewString(iA)
{
	var str = "";
	for(var i=iA.length-1;i>=0;--i)
		str += iA[i];
	return str;
}
*/
// 단위처리..
function XNumViewString(iA)
{
	var str = "";
	var res = "";
	var len = iA.length;
	for(var i=len-1;i>=0;--i)
		str += iA[i];
	
	if(len >= 4)
	{
		switch(len%3)
		{
		case 0:
			res += str.slice(0,3) + "." + str.slice(3,4);
			break;
		case 1:
			res += str.slice(0,1) + "." + str.slice(1,2);
			break;
		case 2:
			res += str.slice(0,2) + "." + str.slice(2,3);
			break;
		}
		len--;
		if(Math.floor(len/3) <= 26)
			res += String.fromCharCode(64 + Math.floor(len/3));
		else
			res += String.fromCharCode(64 + (Math.floor(len/3)-26)) + String.fromCharCode(64 + (Math.floor(len/3)-26));
	}
	else
		res = str;
	return res;
}

function XNumViewStringComma(iA)
{
	var str = "";
	var len = iA.length;
	for(var i=len-1;i>=0;--i)
	{
		str += iA[i];
		if(i!=0 && i%3 == 0)
			str += ",";
	}
	return str;
}
//딕셔너리
var AniRemain ={
    run:   "bullet_ui_effect_active",
    normal:"bullet_ui_effect_idle",
    hide:  "empty"
}
var NextAniRemain ={
    run:   1,
    normal:2,
    hide:  3
}
var AniBtnSpn = {
    hide_l:"empty",
    disable_l:"arrow_btn_disable",
    normal_l:"arrow_btn_idle",
    press_l:"arrow_btn_touch",
    hide_r:"empty",
    disable_r:"arrow_btn_disable2",
    normal_r:"arrow_btn_idle2",
    press_r:"arrow_btn_touch2",
}
var StateBtnSpn = {
    hide_r:1,
    disable_r:2,
    normal_r:3,
    press_r:4,
    hide_l:5,
    disable_l:6,
    normal_l:7,
    press_l:8,
};
var AniSpace = {
    stopA:"space_rotation_1",  //-- 우주 배경의 기본 위치
    stopB:"space_rotation_2",  //-- 우주 배경이 왼쪽으로 이동한 후 정지된 상태
    stopC:"space_rotation_3",  //-- 우주 배경이 오른쪽으로 이동한 후 정지된 상태
    A2B:"space_rotation_1_to_2", //-- 우주 배경이 기본에서 왼쪽으로 이동
    A2C:"space_rotation_1_to_3", //-- 우주 배경이 기본에서 오른쪽으로 이동
    B2A:"space_rotation_2_to_1", //-- 우주 배경이 왼쪽에서 기본으로 다시 이동(이동 방향은 왼쪽)
    C2A:"space_rotation_3_to_1" //-- 우주 배경이 오른쪽에서 기본으로 다시 이동(이동 방향은 오른쪽)    
}
var AniShip = {
    aim:"ship_aiming",  //-- 우주선이 운석(버블)을 발사하기 전 조준할 때 나오는 연출. 조준 시에는 우주선의 각도를 조절하는 방식
    l_buster:"ship_buster_move_1",  // -- 우주선이 버스터 모드일 때 왼쪽으로 이동하는 연출
    r_buster:"ship_buster_move_2",  // -- 우주선이 버스터 모드일 때 오른쪽으로 이동하는 연출
    charge:"ship_charge",  // -- 우주선이 운석을 발사한 후 운석을 다시 충전할 때 나오는 연출
    bust:"ship_idle_buster",  // -- 버스터 모드 발동시의 연출
    idle:"ship_idle_normal",  // -- 우주선의 정지 동작
    l:"ship_move_1",  // -- 우주선이 왼쪽으로 이동하는 연출
    r:"ship_move_2",  // -- 우주선이 오른쪽으로 이동하는 연출
    fire:"ship_shot"  // -- 우주선이 운석을 발사하는 연출  
}
var AniShip_Bubble = {
    blue:"bubble_1",
    green:"bubble_2",
    violet:"bubble_3",
    red:"bubble_4",
    yellow:"bubble_5"
}
var coreStar = {
    idle:"core_bubble_eff_idle", // -- 게임의 중심에 있는 큰 운석이 빛나는 연출이 유지되는 애니메이션
    lightmode: "core_bubble_eff_in", // -- 게임의 중심에 있는 큰 운석이 빛나는 연출이 시작되는 애니메이션
}
var laser = {
    idle: "dead_line_idle", //-- 데드라인(깨뜨려야 할 운석이 닿으면 게임 오버가 되는 붉은 경계선)이 유지되는 연출
    begin:"dead_line_in", //-- 데드라인이 생성되는 연출
    end:"dead_line_out" //-- 데드라인이 사라지는 연출
}
var border = {
    idle: "guard_line_idle", //-- 가드라인(운석이 튕기게 되는 경계선)이 유지되는 연출
    begin: "guard_line_in", //-- 가드라인이 생성되는 연출
    end: "guard_line_out" //-- 가드라인이 사라지는 연출
}
var IndicPath = {
//    on:"img/stage_select_under_ui_1.png",
//    off:"img/stage_select_under_ui_2.png"
    on: strGamePath+"img2/select_page.png",
    off: strGamePath+"img2/select_page_1.png"
}
var BusterAni = {
    boom:"buster_bubble_bomb_eff",
    idle:"buster_bubble_idle_eff"
}

function SpriteSliceLoad(parent, url, px, py, w, h, lc, rc, tc, bc, ax, ay)
{
    var main = new PIXI.Container();
    var tex = new PIXI.Texture.fromFrame(url);
    var bw = tex.width;
    var bh = tex.height;

    if(lc===undefined) lc = Mathfloor(bw/2)-1;
    if(rc===undefined) rc = Mathfloor(bw/2)-1;
    if(tc===undefined) tc = Mathfloor(bh/2)-1;
    if(bc===undefined) bc = Mathfloor(bh/2)-1;
    if(ax===undefined) ax = 0.5;
    if(ay===undefined) ay = 0.5;

    var TL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y, lc, tc)));
    TL.position.set((-w*ax), (-h*ay));
    var TC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y, bw-lc-rc, tc)));
    TC.position.set((-w*ax)+lc, (-h*ay));
    TC.scale.set((w-lc-rc)/(bw-lc-rc), 1);
    var TR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y, rc, tc)));
    TR.position.set((-w*ax)+w-rc, (-h*ay));
    var CL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y+tc, lc, bh-tc-bc)));
    CL.position.set((-w*ax), (-h*ay)+tc);
    CL.scale.set(1, (h-tc-bc)/(bh-tc-bc));
    var CC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y+tc, bw-lc-rc, bh-tc-bc)));
    CC.position.set((-w*ax)+lc, (-h*ay)+tc);
    CC.scale.set((w-lc-rc)/(bw-lc-rc), (h-tc-bc)/(bh-tc-bc));
    var CR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y+tc, rc, bh-tc-bc)));
    CR.position.set((-w*ax)+w-rc, (-h*ay)+tc);
    CR.scale.set(1, (h-tc-bc)/(bh-tc-bc));
    var BL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y+(bh-bc), lc, bc)));
    BL.position.set((-w*ax), (-h*ay)+h-bc);
    var BC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y+(bh-bc), bw-lc-rc, bc)));
    BC.position.set((-w*ax)+lc, (-h*ay)+h-bc);
    BC.scale.set((w-lc-rc)/(bw-lc-rc), 1);
    var BR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y+(bh-bc), rc, bc)));
    BR.position.set((-w*ax)+w-rc, (-h*ay)+h-bc);

    main.addChild(TL);
    main.addChild(TC);
    main.addChild(TR);
    main.addChild(CL);
    main.addChild(CC);
    main.addChild(CR);
    main.addChild(BL);
    main.addChild(BC);
    main.addChild(BR);
    main.position.set(px, py);
    parent.addChild(main);
    return main;
}


function SpriteSliceLoadNew(
    parent,
    url,
    px, py,
    ax, ay,
    lc, rc,
    tc, bc,
    w, h
){
    var main = new PIXI.Container();
    var tex = new PIXI.Texture.fromFrame(url);
    var bw = tex.width;
    var bh = tex.height;

    if(lc===undefined) lc = Mathfloor(bw/2)-1;
    if(rc===undefined) rc = Mathfloor(bw/2)-1;
    if(tc===undefined) tc = Mathfloor(bh/2)-1;
    if(bc===undefined) bc = Mathfloor(bh/2)-1;
    if(ax===undefined) ax = 0.5;
    if(ay===undefined) ay = 0.5;

    var TL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y, lc, tc)));
    TL.position.set((-w*ax), (-h*ay));
    var TC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y, bw-lc-rc, tc)));
    TC.position.set((-w*ax)+lc, (-h*ay));
    TC.scale.set((w-lc-rc)/(bw-lc-rc), 1);
    var TR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y, rc, tc)));
    TR.position.set((-w*ax)+w-rc, (-h*ay));
    var CL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y+tc, lc, bh-tc-bc)));
    CL.position.set((-w*ax), (-h*ay)+tc);
    CL.scale.set(1, (h-tc-bc)/(bh-tc-bc));
    var CC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y+tc, bw-lc-rc, bh-tc-bc)));
    CC.position.set((-w*ax)+lc, (-h*ay)+tc);
    CC.scale.set((w-lc-rc)/(bw-lc-rc), (h-tc-bc)/(bh-tc-bc));
    var CR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y+tc, rc, bh-tc-bc)));
    CR.position.set((-w*ax)+w-rc, (-h*ay)+tc);
    CR.scale.set(1, (h-tc-bc)/(bh-tc-bc));
    var BL = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x, tex.frame.y+(bh-bc), lc, bc)));
    BL.position.set((-w*ax), (-h*ay)+h-bc);
    var BC = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+lc, tex.frame.y+(bh-bc), bw-lc-rc, bc)));
    BC.position.set((-w*ax)+lc, (-h*ay)+h-bc);
    BC.scale.set((w-lc-rc)/(bw-lc-rc), 1);
    var BR = new PIXI.Sprite(new PIXI.Texture(tex.baseTexture, new PIXI.Rectangle(tex.frame.x+(bw-rc), tex.frame.y+(bh-bc), rc, bc)));
    BR.position.set((-w*ax)+w-rc, (-h*ay)+h-bc);

    main.addChild(TL);
    main.addChild(TC);
    main.addChild(TR);
    main.addChild(CL);
    main.addChild(CC);
    main.addChild(CR);
    main.addChild(BL);
    main.addChild(BC);
    main.addChild(BR);
    main.position.set(px, py);
    parent.addChild(main);
    return main;
}
var iMathFloor = 0; //야후추가<
function Mathfloor(n)
{
    iMathFloor = n|0;
    if(iMathFloor < 0)
        return Math.floor(n);

    return iMathFloor;
}//야후추가>

//지엠타이머<시작
var curDate;
var passedSec; //=현시간-저장시간
var remainSec; //남은시간 int 20
var remainStr; //남은시간 string '00:20'
//var remainText1=undefined;
//var remainText2=undefined;
var remainText = [undefined,undefined,undefined,undefined];

//var remainBtn1=undefined;
//var remainBtn2=undefined;
var remainBtn = [undefined,undefined,undefined,undefined];

var dbTEXT = undefined;
var btnTimerInterval = setInterval(btnTimer, 1000);//clearInterval(btnTimerInterval);

//var clicktimer1 = false;
//var clicktimer2 = false;
var clicktimer=[false,false,false,false];//

var d_plus1=0; //슬롯인덱스확인용
//var d_plus2=0; //슬롯인덱스확인용


function btnTimer() { //지엠타이머
    //startBtnTimer(0);
    //decresseBtnTimer(0);
    //startBtnTimer(1);
    //decresseBtnTimer(1);
    startBtnTimer(2);
    decreaseBtnTimer(2);
    startBtnTimer(3);
    decreaseBtnTimer(3);
    debugBtnTimer(false);

}
function startBtnTimer( idx) {
    if(clicktimer[idx]===true) { //하트컨에서  true해주면 여기서 끝다
        //교체 if(kData.btn1TimeStamp===null) {// 하트컨트롤러 networkManager.GetServerTimer가 작동 안되는것 같아서 대안으로
        networkManager.GetServerTime(function (_time) { kData.btnTimeStamp[idx] = _time;  });
        if(typeof kData.btnTimeStamp !== 'undefined'
            && typeof kData.btnTimeStamp[idx] !== 'undefined'
        ) {
            clicktimer[idx]=false;
            setTimeout(function () {
                networkManager.ForcedSaveData();//스타트후
            }, 1000);

        }
    }
}
function debugBtnTimer( isOn ){
    if(isOn===false) return;
    //if(isOn===undefined) return;
    if(typeof dbTEXT === 'undefined') {
        //console.log('dbTEXT === undefined');
        return;
    }
    if(isOn){

        dbTEXT.text = (""
            +"selected idx:"+d_plus1+"\n"
            +"stmp[0]:"+(kData.btnTimeStamp[0] === undefined ? "undef" : kData.btnTimeStamp[0]) + ", "+ (remainText[0] === undefined ? "undef" : remainText[0].text) + "\n"
            +"stmp[1]:"+(kData.btnTimeStamp[1] === undefined ? "undef" : kData.btnTimeStamp[1]) + ", "+ (remainText[1] === undefined ? "undef" : remainText[1].text) + "\n"
            +"stmp[2]:"+(kData.btnTimeStamp[2] === undefined ? "undef" : kData.btnTimeStamp[2]) + ", "+ (remainText[2] === undefined ? "undef" : remainText[2].text) + "\n"
            +"stmp[3]:"+(kData.btnTimeStamp[3] === undefined ? "undef" : kData.btnTimeStamp[3]) + ", "+ (remainText[3] === undefined ? "undef" : remainText[3].text) + "\n"

        );
    }else{
        dbTEXT.text="";
    }
}
function decreaseBtnTimer( idx ) {

   // console.trace(kData);


    if(kData.btnTimeStamp[idx]!==undefined //초기화전
        && kData.btnTimeStamp[idx]!==null) //초기화후
    {
        //방법1:로컬에서 현재시간을 받을경우 1
        curDate = Date.now();
        passedSec = (parseInt(curDate.toString().substring(0, 10))-kData.btnTimeStamp[idx]);
        //방법2:서버에서 현재시간을 다시 받을 경우 2 (1초마다 받아야 하므로)
        // networkManager.GetServerTime(function (_time) { passedSec = _time-kData.btn1TimeStamp; });

        //시간차감 //remainSec는 20이면 20초를 말함
        remainSec = fHeartChargeTime - passedSec;
        //0이하면 초기화
        if(remainSec<=0){
            remainSec=0;
            kData.btnTimeStamp[idx]=null; //잔여타임0이면 저장타임을 null로
        }
        //00:00형식으로
        remainStr = convertTimeFormatFromSec(remainSec);
        //텍스트가 활성화면 업데이트
        if(remainText[idx]!==undefined && remainText[idx].visible) {
            remainText[idx].text = remainStr;
        }
        //00:00을 보여주고 충전처리//저장타임이 null(잔여0)//서버에서 따로 충전
        if(kData.btnTimeStamp[idx]===null){
            networkManager.ForcedSaveData();
            setTimeout(
                function () {
                    if(remainBtn[idx]!==undefined) {
                        //모드별 버튼배열이다.
                        //원래는 [1]에 게스트모드시 버튼이 들어가야한다.없어서 회원버튼으로
                        remainBtn[idx].arr[Billing].visible = true; //현재사용중인 일반버튼 다시 활성화
                        remainBtn[idx].visible = false;             //타이머버튼은 비화렁
                    }
                },
                500
            );
        }
    }
}