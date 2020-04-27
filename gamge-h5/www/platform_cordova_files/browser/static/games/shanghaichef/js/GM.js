function ShowToast(type, msg){
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "4000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
//	toastr.options["timeOut"] = time;
    var per = parseFloat(renderer.view.style.width);
    per = per * 0.8;
    toastr[type](msg).css("width", per + "%");
}



var yahooIN=yahooIN||undefined;
var yahooTest= (yahooTest === undefined) ? undefined : yahooTest;
var strGamePath = strGamePath || "";

var iMaxSizeX = 720;//570;
var iMaxSizeY = 1280;//640;//760;
var iCenterSizeX = iMaxSizeX >> 1;
var iCenterSizeY = iMaxSizeY >> 1;
var renderer = PIXI.autoDetectRenderer(iMaxSizeX, iMaxSizeY);

var COINPERSECOND = 1;	//스테이지 클리어시 남은시간 1초당 보너스 금액
var STAR_3 = 0.3;	//스테이지 클리어시 별등급 1이 100일경우 남은시간 30%초과일때 별 3개
var STAR_2 = 0.2;	//스테이지 클리어시 별등급 1이 100일경우 남은시간 20%초과일때 별 2개
var fPlayTimeAdd = 1;	//블럭한쌍 클리어시 추가되는 시간
var ITEM1_PAY = 800;	//아이템 1번 구매 가격
var ITEM2_PAY = 800;	//아이템 2번 구매 가격
var ITEM3_PAY = 800;	//아이템 3번 구매 가격
var ITEM4_PAY = 800;	//아이템 4번 구매 가격
var AD_REWARD_COIN = 200;	//동영상 광고 시청후 지급되는 코인
var AD_REWARD_LIFE = 5;	//동영상 광고 시청후 지급되는 라이프
var AD_REWARD_ITEM = 3;	//동영상 광고 시청후 지급되는 아이템
var ITEM_MAX = 99;	//아이템 최대 갯수
var ITEM1_USE_TIME_ADD = 10;	//아이템1번 타임아이템 사용시 추가되는 시간
var FIRST_COIN = 2000;	//최초 지급 코인 수
var FIRST_LIFE = 10;	//최초 지급 하트 수
var FIRST_ITEM = 3;	//최초 지급 아이템 수
var COIN_MAX = 99999;	//최대 코인 개 수
var LIFE_CHARGE_MAX = 5; // 최대 자동 충전
//var LIFE_MAX = 99;	//최대 하트 개 수
var LIFE_ADD_TIME = 10;	//하트 자동 충전 시간 (분)
var STAGE_CLEAR_REWARD = 10;	//스테이지 클리어 시 지급 코인
var AD_COIN_COOL_TIME = 10;	//코인 광고 쿨타임
var AD_LIFE_COOL_TIME = 5;	//하트 광고 쿨타임
var AD_ITEM_COOL_TIME = 10;
var COMBO_TIME = 3; // 연속콤보 허용시간

var POPUP_TYPE = {
    GAME_START : 0,
    GAME_CLEAR : 1,
    GAME_FAIL : 2,
    GAME_SETTING : 3,
    GAME_GIVEUP : 4,
    GAME_GIVEUPANDREPLAY : 5,
    GAME_TUTORIAL : 6,
    GAME_HEART_SHOP :7,
    GAME_GOLD_SHOP :8,
    GAME_CONFIRM_HEART_SHOP : 9,
    GAME_CONFIRM_GOLD_SHOP : 10,
    GAME_CHARGE_HEART : 11,
    GAME_CHARGE_GOLD : 12,
};

$(window).resize(resize);	// jquery를 사용한다.
window.onorientationchange = resize; // 화면이 리사이즈되면 리사이즈 함수를 콜한다.
resize(); // 최초 한번 리사이즈를 해주고 변동사항이 있을경우 리사이즈를 계속 해준다.

// yahooIN modifier : kook : 일본대응.
var filter = "win16|win32|win64|macintel|mac";
var bMobile = (filter.indexOf(navigator.platform.toLowerCase())<0);
//$('game_area').appendTo($('.container'));
var objDiv;
// var strGamePath = strGamePath || "";
if(yahooIN !== undefined) {
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
    $("#game_mask").css("background-image", "url(\"https://movigame.jp/img/Gameplaybg_0004.gif\")");
}else{
    document.body.appendChild(renderer.view);
}

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
//================================================================
//사운드 제어.
var btnTitleSound = undefined;
window.addEventListener('focus', function() {
    if(servicePos == 1 && btnTitleSound !== undefined ){
        if(state <= STATE_TITLE)
            btnTitleSound.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound.png");

        SoundResume();
    }else if(servicePos == 0){
        SoundResume();
    }

}, false);

//윈도우창을 닫을때 이벤트.
window.addEventListener('blur', function() {
    if(servicePos == 1 && btnTitleSound !== undefined){
        if(state <= STATE_TITLE)
            btnTitleSound.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound_off.png");

        SoundPause();
    }else if(servicePos == 0){
        SoundPause();
    }

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

// if(yahooIN === undefined)
//     document.body.appendChild(renderer.view);

function handleVisibilityChange() {
if (document[hidden]) {
 SoundPause();
} else {
 SoundResume();
}
}

PIXI.extras.BitmapText.prototype.updateTextDefault = PIXI.extras.BitmapText.prototype.updateText;
PIXI.extras.BitmapText.prototype.updateText = function(){
    this.updateTextDefault();
    switch(this.align) {
        case 'center':
            this.pivot.x = this.textWidth * 0.5;
            break;
        case 'right':
            this.pivot.x = this.textWidth;
            break;
        default:
            this.pivot.x = 0;
            break;
    }
};

//Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
    console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
	// Handle page visibility change   
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
//end 사운드 제어.

var stage = new PIXI.Container();
var sLoading = new PIXI.Container();
var sTitle = new PIXI.Container();
var sGame = new PIXI.Container();
sGame.interative = true;
var sGameEffect = new PIXI.Container();
sGameEffect.name = "sGameEffect [Container]";
var sPopupBase = new  PIXI.Container();
var sPopupFrame = [new  PIXI.Container(),null,new  PIXI.Container(),new  PIXI.Container()];
var sPopupGameStart = new  PIXI.Container();
var sPopupGameClear = new  PIXI.Container();
var sPopupGameFail = new  PIXI.Container();
var sPopupHeartAD = new PIXI.Container();
var sPopupItemGet = new PIXI.Container();
var sPopupJoinMember = new PIXI.Container();

//var sPopupClose = new PIXI.Container();
var sPopupPause = new PIXI.Container();
var sPopupReplay = new PIXI.Container();
var sPopupSound = new PIXI.Container();
var sPopupExit = new PIXI.Container();
var sPopupCharge = new PIXI.Container();
var sPopupTutorial = new PIXI.Container();
var sStageSelect = new PIXI.Container();
var sShop = new PIXI.Container();
var sTutorial = new PIXI.Container();

stage.addChild(sLoading);

var blockImgGame = [
                     "block/block_01.png",
                     "block/block_02.png",
                     "block/block_03.png",
                     "block/block_04.png",
                     "block/block_05.png",
                     "block/block_06.png",
                     "block/block_07.png",
                     "block/block_08.png",
                     "block/block_09.png",
                     "block/block_10.png",
                     "block/block_11.png",
                     "block/block_12.png",
                     "block/block_13.png",
                     "block/block_14.png",
                     "block/block_15.png",
                     "block/block_16.png",
                     "block/block_17.png",
                     "block/block_18.png",
                     "block/block_19.png",
                     "block/block_20.png",
                     "block/block_21.png",
                     "block/block_22.png",
                     "block/block_23.png",
                     "block/block_24.png",
                     "block/block_25.png",
                     "block/block_26.png",
                     "block/block_27.png",
                     "block/block_28.png",
                     "block/block_29.png",
                     "block/block_30.png",
                     "block/block_31.png",
                     "block/block_32.png",
                     "block/block_33.png",
                     "block/block_34.png",
                     "block/block_35.png",
                     "block/block_36.png",
                     "block/block_37.png",
                     "block/block_38.png",
                     "block/block_39.png",
                     "block/block_40.png",
                     "block/block_41.png",
                     "block/block_42.png",
                     "block/block_43.png",
                     "block/block_44.png",
                     "block/block_45.png",
                     "block/block_46.png",
                     "block/block_47.png",
                     "block/block_48.png",
                     "block/block_49.png",
                     "block/block_50.png",
                     "block/block_51.png",
                     "block/block_52.png",
                     "block/block_53.png",
                     "block/block_54.png",
                     "block/block_55.png",
                     "block/block_56.png",
                     "block/block_57.png",
                     "block/block_58.png",
                     "block/block_59.png",
                     "block/block_60.png",
                     "block/block_61.png",
                     "block/block_62.png",
                     "block/block_63.png",
                     "block/block_64.png",	// 방해블럭
                     "block/block_65.png"	// 블럭 뒷면
];

var tbImgGame = [];
tbImgGame['ko'] = [
    'atlas_ko/GameResource_0.json',
    'atlas_ko/GameResource_1.json'
];
tbImgGame['ja'] = [
    'atlas_ja/GameResource_0.json',
    'atlas_ja/GameResource_1.json'
];
tbImgGame['en'] = [
    'atlas_en/GameResource_0.json',
    'atlas_en/GameResource_1.json'
];
//========================================================================
// 언어 이미지  설정
var tbTTF = {"ko":'Conv_FZHPFW_eng', "ja":'Bokutachi', "en":'Conv_FZHPFW_eng'};
var ShopNumTTF = "shop_no-export";
var ComboNumTTF = "combo_no-export";

// 국가별 언어 설정
var tbString_json = "{\"tutorial000\":{\"en\":\"First select by clicking{E}on the bill! If the line{E}bending straight is{E}concatenated twice{E}or less, success!\",\"ja\":\"ブロックをクリックして選択！{E}直線が曲がっている点を{E}２つ以下でつなげば成功！\",\"ko\":\"먼저 패를 클릭해서 선택!{E}직선으로 꺾이는 선이{E}2회 이하로 연결되면 성공!\"},\"tutorial001\":{\"en\":\"Failure if a straight{E}line isconnected more{E}than three times!\",\"ja\":\"直線が曲がっている点が{E}３つ以上でつなぐのはだめ。\",\"ko\":\"직선으로 꺾이는 선이{E}3회 이상으로 연결되면 실패!\"},\"tutorial002\":{\"en\":\"Combo if you quickly{E}remove blocks{E}within time limit!\",\"ja\":\"制限時間内にブロックを{E}除去できればコンボ！\",\"ko\":\"제한시간 내 블록을{E}빠르게 제거하면 콤보!\"},\"tutorial003\":{\"en\":\"5 Remove one desired{E}tag regardless of{E}the number of times{E}you can achieve combo!\",\"ja\":\"５コンボ達成すれば{E}好きなブロックを１つ消せる！\",\"ko\":\"5콤보를 달성하면{E}꺾이는 횟수에 상관없이{E}원하는 패를 1개 제거!\"},\"popupgiveup\":{\"en\":\"Would you like to{E}end the game or not?\",\"ja\":\"ゲームをやめますか？\",\"ko\":\"게임을 포기하시겠습니까?\"},\"popupreplay\":{\"en\":\"Would you like to{E}replay the game?\",\"ja\":\"ゲームをやり直しますか？\",\"ko\":\"게임을 다시 시작하시겠습니까?\"},\"shop002\":{\"en\":\"Time {E} play time increased by {V} seconds!\",\"ja\":\"時計{E}プレイ時間を{V}秒増加\",\"ko\":\"타임{E}플레이 시간{V}초 증가!\"},\"shop003\":{\"en\":\"Bomb {E} 3 pairs of tags randomly removed!\",\"ja\":\"爆弾{E}パネル3ペアをランダムで消す\",\"ko\":\"폭탄{E}패 3쌍 랜덤 제거!\"},\"shop004\":{\"en\":\"Hint {E} Tile display that can be erased.\",\"ja\":\"ヒント{E}消せる札を表示する\",\"ko\":\"힌트{E}지울 수 있는 패 표시!\"},\"shop005\":{\"en\":\"Mix {E} whole bills\",\"ja\":\"シャッフル{E}消せる札がない時に札を混ぜる\",\"ko\":\"섞기{E}전체 패 섞기!\"},\"shop006\":{\"en\":\"Let's purchase useful items for the game {E} (explanation of the effect{E}when clicking the icon)\",\"ja\":\"ゲームに役立つアイテムを購入しよう！{E}(アイコンクリックしたら効果の説明)\",\"ko\":\"게임에 도움이 되는 아이템을 구매해보세요.{E}(아이콘을 클릭하면 효과에 대한 설명이 나와요.)\"},\"ok\":{\"en\":\"OK\",\"ja\":\"OK\",\"ko\":\"OK\"},\"yes\":{\"en\":\"YES\",\"ja\":\"YES\",\"ko\":\"YES\"},\"no\":{\"en\":\"NO\",\"ja\":\"NO\",\"ko\":\"NO\"},\"retry\":{\"en\":\"RETRY\",\"ja\":\"RETRY\",\"ko\":\"RETRY\"},\"giveup\":{\"en\":\"GIVE UP\",\"ja\":\"GIVE UP\",\"ko\":\"GIVE UP\"},\"stageselect\":{\"en\":\"SELECT STAGE\",\"ja\":\"SELECT STAGE\",\"ko\":\"SELECT STAGE\"},\"close\":{\"en\":\"CLOSE\",\"ja\":\"閉じる\",\"ko\":\"닫기\"},\"start\":{\"en\":\"START\",\"ja\":\"START\",\"ko\":\"START\"},\"back\":{\"en\":\"BACK\",\"ja\":\"BACK\",\"ko\":\"BACK\"},\"get\":{\"en\":\"GET\",\"ja\":\"GET\",\"ko\":\"획득\"},\"ablecard\":{\"en\":\"Possible tags\",\"ja\":\"ペア数\",\"ko\":\"가능패\"},\"item\":{\"en\":\"ITEM\",\"ja\":\"ITEM\",\"ko\":\"ITEM\"},\"only_account\":{\"en\":\"Members Only\",\"ja\":\"会員専用\",\"ko\":\"회원전용\"},\"heart\":{\"en\":\"heart\",\"ja\":\"heart\",\"ko\":\"하트\"},\"gold\":{\"en\":\"gold\",\"ja\":\"gold\",\"ko\":\"골드\"},\"shop_get\":{\"en\":\"{V} Earn\",\"ja\":\"{V}個獲得\",\"ko\":\"{V}개 획득!\"},\"charge_heart\":{\"en\":\"Lack of Heart {E} Do you want to charge?\",\"ja\":\"ハートが足りません。{E}チャージしますか？\",\"ko\":\"하트가 모자랍니다.{E}충전하시겠습니까?\"},\"charge_gold\":{\"en\":\"Lack of Gold {E} Do you want to charge?\",\"ja\":\"ゴールドが足りません。{E}チャージしますか？\",\"ko\":\"골드가 모자랍니다.{E}충전하시겠습니까?\"},\"combo\":{\"en\":\"COMBO\",\"ja\":\"COMBO\",\"ko\":\"COMBO\"},\"reward\":{\"en\":\"REWORD\",\"ja\":\"REWORD\",\"ko\":\"REWORD\"},\"record\":{\"en\":\"RECORD\",\"ja\":\"RECORD\",\"ko\":\"RECORD\"},\"bonus\":{\"en\":\"BONUS\",\"ja\":\"BONUS\",\"ko\":\"BONUS\"},\"stage\":{\"en\":\"STAGE\",\"ja\":\"STAGE\",\"ko\":\"STAGE\"},\"goldshop\":{\"en\":\"GOLD SHOP\",\"ja\":\"GOLD SHOP\",\"ko\":\"GOLD SHOP\"},\"heartshop\":{\"en\":\"HEART SHOP\",\"ja\":\"HEART SHOP\",\"ko\":\"HEART SHOP\"},\"setting\":{\"en\":\"SETTING\",\"ja\":\"設定\",\"ko\":\"SETTING\"},\"charge\":{\"en\":\"CHARGE\",\"ja\":\"CHARGE\",\"ko\":\"CHARGE\"},\"tutorial\":{\"en\":\"TUTORIAL\",\"ja\":\"チュートリアル\",\"ko\":\"TUTORIAL\"},\"full\":{\"en\":\"FULL\",\"ja\":\"FULL\",\"ko\":\"FULL\"},\"login\":{\"en\":\"LOGIN\",\"ja\":\"ログイン\",\"ko\":\"로그인\"},\"signup\":{\"en\":\"Members only!<br/>Would you like to go to the sign up page?\",\"ja\":\"会員専用<br/>会員登録をしますか?\",\"ko\":\"회원전용!<br/>회원가입 하시겠습니까?\"},\"gotogpg\":{\"en\":\"Only available in the Moby Games app.<br/>Would you like to go to the Moby Games app?\",\"ja\":\"モビーゲームアプリのみ購入で きます。<br/>モビーゲームアプリに移動しますか？\",\"ko\":\"모비게임 앱에서만 구매 가능합니다.<br/>모비게임 앱으로 이동하시겠습니까?\"},\"lowpoint\":{\"en\":\"Not enough points!\",\"ja\":\"ポイントが足りません!\",\"ko\":\"포인트가 부족합니다!\"},\"MGM_Title\":{\"en\":\"SHANGHAI Chef\",\"ja\":\"PANDA Chef\",\"ko\":\"상하이 쉐프\"},\"MGM_Contents\":{\"en\":\"Match all the identical mahjong tiles.{E}Find and connect two identical food tiles.\",\"ja\":\"食べ物合わせてレッツクッキング！{E}たくさんの料理を作っちゃおう！{E}素早く作って目指せ三ツ星レストラン！\",\"ko\":\"같은 패를 찾는 짝맞추기 게임!{E}당신의 손은 눈보다 빠를 수 있습니까?{E}어떤 블록을 이을 수 있을지 찾아보아요!\"}}";

var tbString = JSON.parse(tbString_json);
function GetString(key, data)
{
	/*if(data === undefined) data = null;
	switch(lang)
	{
		case 'en':*/
			if(data == null)
				return tbString[key].en.replace(/{E}/gi, "\n");
			else
				return tbString[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
			/*break;
		case 'ja':
			if(data == null)
				return tbString[key].ja.replace(/{E}/gi, "\n");
			else
				return tbString[key].ja.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
			break;
		case 'ko':
			if(data == null){
                return tbString[key].ko.replace(/{E}/gi, "\n");
            }
			else
				return tbString[key].ko.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
			break;
	}*/
	
	return "";
}
//=============================================================================
// 스프라이트 생성 관련
//=============================================================================
function PIXIGraphics(parent, color, alpha, startx,starty,endx,endy) {
    if(startx === undefined)
        startx = 0;
    if(starty === undefined)
        starty = 0;
    if(endx === undefined)
        endx = iMaxSizeX;
    if(endy === undefined)
        endy = iMaxSizeY;

    var spr = new PIXI.Graphics();
    parent.addChild(spr);

    spr.position.set(0,0);
    spr.lineStyle(0);

    spr.clear();
    spr.beginFill(color,alpha);
    spr.moveTo(startx,starty);
    spr.lineTo(endx, starty);
    spr.lineTo(endx, endy);
    spr.lineTo(startx, endy);

    return spr;
}

/*function PopupEventChage(_okFunc, _cancelFunc, _oktarget, _canceltarget) {
    if(_oktarget === undefined || _oktarget == null)
        _oktarget = btnGooglePlayJumpOK;

    if(_canceltarget === undefined || _canceltarget == null)
        _canceltarget = btnGooglePlayJumpCANCEL;

    _oktarget.position.x = 120;
    if(!_oktarget.visible){
        _oktarget.visible = true;
    }

    if(!_canceltarget.visible){
        _canceltarget.visible = true;
    }

    _oktarget._events['click'][0].fn = _okFunc;
    _oktarget._events['tap'].fn = _okFunc;

    _canceltarget._events['click'][0].fn = _cancelFunc;
    _canceltarget._events['tap'].fn = _cancelFunc;
}

function PopupEventChage_single(_target, _func, _b_isGoogleJumpPanel) {
    if(_target === undefined)
        console.log('you must input the target');
    if(_b_isGoogleJumpPanel === undefined || _b_isGoogleJumpPanel == null)
        _b_isGoogleJumpPanel= false;

    if(_b_isGoogleJumpPanel){
        _target.position.x = 0;
        btnGooglePlayJumpCANCEL.visible = false;
    }

    _target._events['click'][0].fn = _func;
    _target._events['tap'].fn = _func;
}*/

function SpriteLoad(parent, url, px, py, ax, ay)
{
    if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;

	if(url.indexOf('.png') <= -1)
	    url += ".png";

	var spr = SpritePool.getInstance().get(url);

	spr.position.x = px;
	spr.position.y = py;
	spr.anchor.x = ax;
	spr.anchor.y = ay;

	parent.addChild(spr);
	
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
	
	parent.addChild(txt);
	
	return txt;
}
var iMathFloor = 0;
function Mathfloor(n)
{
    iMathFloor = n|0;
    if(iMathFloor < 0)
        return Math.floor(n);

    return iMathFloor;
}

/*function SpriteSliceLoad(parent, url, px, py, w, h, lc, rc, tc, bc, ax, ay)
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
}*/

// 부모, 텍스쳐위치, positon.x, position.y, anchon.x, anchon.y, leftCut, rightCut, topCut, bottomCut, width, height, option
function SpriteSliceLoadNew(parent, url, px, py, ax, ay, lc, rc, tc, bc, w, h)
{
    var main = new PIXI.Container();
    var tex = new PIXI.Texture.fromFrame(url);
    var bw = tex.width;
    var bh = tex.height;

    if(lc===undefined) lc = Math.floor(bw/2)-1;
    if(rc===undefined) rc = Math.floor(bw/2)-1;
    if(tc===undefined) tc = Math.floor(bh/2)-1;
    if(bc===undefined) bc = Math.floor(bh/2)-1;
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

function SlicedSpriteChangeTexture(_sliceSpr, _sliceSpr_2){
	for(var i=0,imax = 9;i<imax;++i){
		_sliceSpr.children[i].texture = _sliceSpr_2.children[i].texture;
	}
}

/*function NineSliceWithCreateSprite(parent, url, posX, posY, aliX, aliY, top, bot, left, right, width, height) {
	var spr = SpriteLoad(parent,url,posX,posY,aliX,aliY);
	return NineSlice(spr,top,bot,left,right,width,height);
}

function NineSlice(spr, top, bot, left, right, width, height) {
	// 계산
    var OriginWidth = spr.width;
    var OriginHeight = spr.height;

	var p_sprCenterStartPoint_X = left;
    var p_sprCenterStartPoint_Y = top;
	var p_sprCenterWidth = spr.width - left - right;
	var p_sprCenterHeight = spr.height - top - bot;

	var p_slicedCalcedWidth = width - left - right;
    var p_slicedCalcedHeight = height - left - right;


	if(p_sprCenterHeight <= 0 || p_sprCenterWidth <= 0) return spr;

    var imageURL = spr.texture.baseTexture.imageUrl;
    var p_container = new PIXI.Container();

    spr.parent.addChild(p_container);
    p_container.position.set(spr.x,spr.y);

    // center
    var p_center = spr;
    p_container.addChild(p_center);
    p_center.position.set(0,0);
    NineSilceDataInput(p_center,p_sprCenterStartPoint_X,p_sprCenterStartPoint_Y,p_sprCenterWidth,p_sprCenterHeight);
    p_center.width = p_slicedCalcedWidth;
    p_center.height = p_slicedCalcedHeight;

	// left top
    var p_left_top = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_left_top,0,0,left,top);
    p_container.addChild(p_left_top);
    p_left_top.anchor.set(1,1);
    p_left_top.position.set(-(p_slicedCalcedWidth / 2),-(p_slicedCalcedHeight / 2));
    p_left_top.width = left;
    p_left_top.height = top;

    // top
    var p_top = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_top,left,0,p_sprCenterWidth,top);
    p_container.addChild(p_top);
    p_top.anchor.set(0.5,1);
    p_top.position.set(0,-(p_slicedCalcedHeight/2));
    p_top.width = p_slicedCalcedWidth;
    p_top.height = top;

    // right top
    var p_right_top = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_right_top, p_sprCenterWidth + left, 0, right,top);
    p_container.addChild(p_right_top);
    p_right_top.anchor.set(0,1);
    p_right_top.position.set((p_slicedCalcedWidth / 2),-(p_slicedCalcedHeight/2));
    p_right_top.width = right;
    p_right_top.height = top;

    // left
    var p_left = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_left, 0, top, left, p_sprCenterHeight);
    p_container.addChild(p_left);
    p_left.anchor.set(1,0.5);
    p_left.position.set(-(p_slicedCalcedWidth / 2),0);
    p_left.width = left;
    p_left.height = p_slicedCalcedHeight;

    // right
    var p_right = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_right,  p_sprCenterWidth + left , top, right, p_sprCenterHeight);
    p_container.addChild(p_right);
    p_right.anchor.set(0,0.5);
    p_right.position.set((p_slicedCalcedWidth / 2),0);
    p_right.width = right;
    p_right.height = p_slicedCalcedHeight;

    // left_bottom
    var p_left_bottom = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_left_bottom,0,top + p_sprCenterHeight,left,bot);
    p_container.addChild(p_left_bottom);
    p_left_bottom.anchor.set(1,0);
    p_left_bottom.position.set(-(p_slicedCalcedWidth / 2),(p_slicedCalcedHeight / 2));
    p_left_bottom.width = left;
    p_left_bottom.height = bot;

    // bottom
    var p_bottom = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_bottom,left,top + p_sprCenterHeight,p_sprCenterWidth,bot);
    p_container.addChild(p_bottom);
    p_bottom.anchor.set(0.5,0);
    p_bottom.position.set(0,(p_slicedCalcedHeight / 2));
    p_bottom.width = p_slicedCalcedWidth;
    p_bottom.height = bot;

    // right_bottom
    var p_right_bottom = SpritePool.getInstance().get(imageURL);
    NineSilceDataInput(p_right_bottom,p_sprCenterWidth + left, p_sprCenterHeight + top,right,bot);
    p_container.addChild(p_right_bottom);
    p_right_bottom.anchor.set(0,0);
    p_right_bottom.position.set((p_slicedCalcedWidth / 2),(p_slicedCalcedHeight / 2));
    p_right_bottom.width = right;
    p_right_bottom.height = bot;

    return p_container;
}

function NineSilceDataInput(_spr,_x,_y,_width,_height) {
    if(!_spr.visible)
    	_spr.visible = true;

    var rectFrame = new PIXI.Rectangle(_x,_y,_width,_height);
    var textureData = new PIXI.Texture(_spr.texture.baseTexture,rectFrame);

    _spr.texture = textureData;
}*/

var SPINE_INIT_NONE = 0;
var SPINE_INIT_SLOTS = 1;
var SPINE_INIT_BONES = 2;
var SPINE_INIT_ALL = 3;

function SpinePlay(spine, x, y, aniName, trackIndex, loop, initType)
{
    if(trackIndex === undefined) trackIndex = 0;
    if(loop === undefined) loop = false;
    if(initType === undefined) initType = SPINE_INIT_NONE;

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
    spine.state.setAnimation(trackIndex, aniName, loop);
//	spine.state.timeScale = 1;
//	spine.skeleton.setSlotsToSetupPose();	// 슬롯만 초기화.
//	spine.skeleton.setBonesToSetupPose();	// 본만 초기화.
//	spine.state.update(0);
}
//=============================================================================
// 폰트 로드.
//=============================================================================
/*window.WebFontConfig = {
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
})();*/
//=============================================================================
// 사운드 관련 변수
//=============================================================================
var tbSoundName = [
    [strGamePath+"sound/BGM_Main.ogg",strGamePath+"sound/BGM_Main.mp3"],
    [strGamePath+"sound/BGM_Game.ogg",strGamePath+"sound/BGM_Game.mp3"],

    [strGamePath+"sound/SE_ClickStart.ogg",strGamePath+"sound/SE_ClickStart.mp3"],
    [strGamePath+"sound/SE_Click.ogg",strGamePath+"sound/SE_Click.mp3"],
    [strGamePath+"sound/SE_ClickBad.ogg",strGamePath+"sound/SE_ClickBad.mp3"],
    [strGamePath+"sound/SE_ClickPage.ogg",strGamePath+"sound/SE_ClickPage.mp3"],

    [strGamePath+"sound/SE_OpenStage.ogg",strGamePath+"sound/SE_OpenStage.mp3"],
    [strGamePath+"sound/SE_Heart.ogg",strGamePath+"sound/SE_Heart.mp3"],
    [strGamePath+"sound/SE_BuyItem.ogg",strGamePath+"sound/SE_BuyItem.mp3"],

    [strGamePath+"sound/SE_Ready.ogg",strGamePath+"sound/SE_Ready.mp3"],
    [strGamePath+"sound/SE_Go.ogg",strGamePath+"sound/SE_Go.mp3"],
    [strGamePath+"sound/SE_ClickTile.ogg",strGamePath+"sound/SE_ClickTile.mp3"],
    [strGamePath+"sound/SE_MatchTile.ogg",strGamePath+"sound/SE_MatchTile.mp3"],

    [strGamePath+"sound/SE_ItemTime.ogg",strGamePath+"sound/SE_ItemTime.mp3"],
    [strGamePath+"sound/SE_ItemBoom.ogg",strGamePath+"sound/SE_ItemBoom.mp3"],
    [strGamePath+"sound/SE_ItemHint.ogg",strGamePath+"sound/SE_ItemHint.mp3"],
    [strGamePath+"sound/SE_ItemShuffle.ogg",strGamePath+"sound/SE_ItemShuffle.mp3"],

    [strGamePath+"sound/SE_PigEat.ogg",strGamePath+"sound/SE_PigEat.mp3"],
    [strGamePath+"sound/SE_FullCombo.ogg",strGamePath+"sound/SE_FullCombo.mp3"],
    [strGamePath+"sound/SE_StageClear.ogg",strGamePath+"sound/SE_StageClear.mp3"],
    [strGamePath+"sound/SE_Victory.ogg",strGamePath+"sound/SE_Victory.mp3"],

    [strGamePath+"sound/SE_GetStar1.ogg",strGamePath+"sound/SE_GetStar1.mp3"],
    [strGamePath+"sound/SE_GetStar2.ogg",strGamePath+"sound/SE_GetStar2.mp3"],
    [strGamePath+"sound/SE_GetStar3.ogg",strGamePath+"sound/SE_GetStar3.mp3"],

    [strGamePath+"sound/SE_TimeLow_Loop.ogg",strGamePath+"sound/SE_TimeLow_Loop.mp3"],
    [strGamePath+"sound/SE_TimeOver.ogg",strGamePath+"sound/SE_TimeOver.mp3"],
    [strGamePath+"sound/SE_GameOver.ogg",strGamePath+"sound/SE_GameOver.mp3"],

    [strGamePath+"sound/SE_PopupOn.ogg",strGamePath+"sound/SE_PopupOn.mp3"],
    [strGamePath+"sound/SE_PopupOff.ogg",strGamePath+"sound/SE_PopupOff.mp3"]
];
var BGM_BG_Main = 0;
var BGM_BG_Game = 1;

var SE_CLICK_START = 2;
var SE_CLICK = 3;
var SE_CLICK_BAD = 4;
var SE_CLICK_PAGE = 5;

var SE_OPEN_STAGE = 6;
var SE_HEART = 7;
var SE_BUY_ITEM = 8;

var SE_READY = 9;
var SE_GO = 10;
var SE_CLICK_TILE = 11;
var SE_MATCH_TILE = 12;

var SE_ITEM_TIME = 13;
var SE_ITEM_BOMB = 14;
var SE_ITEM_HINT = 15;
var SE_ITEM_SHUFFLE = 16;

var SE_PIG_EAT = 17;
var SE_FULL_COMBO = 18;
var SE_STAGE_CLEAR = 19;
var SE_VICTORY = 20;

var SE_GETSTAR_1 = 21;
var SE_GETSTAR_2 = 22;
var SE_GETSTAR_3 = 23;

var SE_TIMELOW = 24;
var SE_TIMEOVER = 25;
var SE_GAMEOVER = 26;

var SE_POPUP_ON = 27;
var SE_POPUP_OFF = 28;

var arrBGM = [];
var arrSE = [];
var iBGMCurrent = -1;
var soundCtrl = [];
var loadComplete = false;

//var bSoundLoad = false;
function BGMSoundPlay(index, loop)
{
    if(!loadComplete)
        return;

    if(servicePos == 0){
        if(!clientData.bSoundBGM)
            return;
    }else{
        if(!kData.bSoundBGM)
            return;
    }

    if(iBGMCurrent != -1)
        soundCtrl[iBGMCurrent].stop();

    soundCtrl[index].play();
    iBGMCurrent = index;
}

function BGMSoundStop()
{
}

function BGMSoundPause()
{
    if(!loadComplete)
        return;

    if(iBGMCurrent != -1)
        soundCtrl[iBGMCurrent].pause();
}

function BGMSoundResume()
{
    if(!loadComplete)
        return;

    if(servicePos == 0){
        if(!clientData.bSoundBGM)
            return;
    }else{
        if(!kData.bSoundBGM)
            return;
    }


    if(soundCtrl[iBGMCurrent] != null && soundCtrl[iBGMCurrent].playing())
        return;

    if(iBGMCurrent != -1)
        soundCtrl[iBGMCurrent].play();
}

function SESoundPlay(index, loop)
{
    if(!loadComplete)
        return;

    if(servicePos == 0){
        if(!clientData.bSoundSE)return;
    }else{
        if(!kData.bSoundSE)return;
    }

    soundCtrl[index].play();
}

function SESoundStop(index)
{
    if(!loadComplete)
        return;

    if(servicePos == 0){
        if(!clientData.bSoundSE) return;
    }else{
        if(!kData.bSoundSE) return;
    }

	if(soundCtrl[index] == null) return;

    soundCtrl[index].stop();
}

function SESoundPause()
{
    if(!loadComplete)
        return;

    for(var i=2,imax=soundCtrl.length;i<imax;++i)
        if(soundCtrl[i].playing())
            soundCtrl[i].pause();
}

function SESoundResume()
{
    // for(var i=2,imax=soundCtrl.length;i<imax;++i)
    //     if(soundCtrl[i].playing())
    //         soundCtrl[i].pause();
}

function SoundPause()
{
	BGMSoundPause();
	SESoundPause();
}

function SoundResume()
{
    var gameState=gameState||undefined;

    if(gameState !== undefined)
	    if(gameState == STATE_GAME_PAUSE)return;

	BGMSoundResume();
	SESoundResume();
}
//=============================================================================
// 화면이 리사이즈되면 처리한다.
//=============================================================================
function resize()
{
    var w, h, per;	// modifier : kook : 일본대응. : yahooIN
    w = window.innerWidth;
    h = window.innerHeight;

    if(w * iMaxSizeY <= h * iMaxSizeX){
        renderer.view.style.position = "absolute";	// "absolute"가 셋팅되어 있으면 가운데 정렬이 되지 않는다.
        renderer.view.style.width = "100%";
        renderer.view.style.height = "100%";
        renderer.view.style.left = "0px";
        renderer.view.style.top = "0px";
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
	kData.lastTick = tickNow = Date.now();
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
//	세이브 관련
//=============================================================================
var kData = new Data();
var clientData = new ClientData();

var SAVE_TIME_INIT = 7;
var SAVE_VER = 1;
// 4 :
// 5 : clearFullCombStage 추가

var fSaveTime = SAVE_TIME_INIT; // 세이브 타임이 10초가 지날때 세이브를 한번씩 한다.
// LoadDataInClient();
function Data(){
	this.iVer;
	this.bFirst;
	this.clearStage;
	this.clearFullCombStage;
	this.coin;
	this.life;
    this.item1Cnt;
    this.item2Cnt;
    this.item3Cnt;
    this.item4Cnt;
    this.lastTick;	// 라이프 생성과 연관이 있다.
    //this.lifeTime;

    this.greappoint;

    this.calcedTimeStamp;

    this.fCooltime_Heart = [];
    this.fCooltime_Gamemoney = [];

    if(yahooIN !== undefined){
        this.bSoundBGM;
        this.bSoundSE;

        this.timeSTAMP;
    }
}

function ClientData() {
    this.bSoundBGM;
    this.bSoundSE;

    this.timeSTAMP;
}

// 데이터 초기화..
function InitData()
{
	kData.iVer = SAVE_VER;
	kData.bFirst = true;

	kData.clearStage = [0];//1,2,3,1,2,3,1,2,3,1,2,3,1,2,1,2,-1];
    kData.clearFullCombStage = [0];
	kData.coin = iCoinInitData;
	kData.life = iHeartInitData;
	kData.item1Cnt = FIRST_ITEM;
	kData.item2Cnt = FIRST_ITEM;
	kData.item3Cnt = FIRST_ITEM;
	kData.item4Cnt = FIRST_ITEM;
	kData.lastTick = 0;
	//kData.lifeTime = fHeartChargeTime;
    kData.greappoint = 0;

    kData.calcedTimeStamp = 0;

    if(yahooIN !== undefined){
        kData.timeSTAMP = 0;
        kData.bSoundBGM = true;
        kData.bSoundSE = true;
    }else{
        clientData.timeSTAMP = 0;
        clientData.bSoundBGM = true;
        clientData.bSoundSE = true;
    }

    kData.fCooltime_Heart = [0,0,0,0];
    kData.fCooltime_Gamemoney = [0,0,0,0];

	networkManager.ForcedSaveData();
}

function initDataClientData() {
    if(yahooIN !== undefined){
        kData.timeSTAMP = 0;
        kData.bSoundBGM = true;
        kData.bSoundSE = true;
    }else{
        clientData.bSoundBGM = true;
        clientData.bSoundSE = true;
        clientData.timeSTAMP = 0;
    }
}

function SaveDataInClient(_bGetTime)
{
    if(yahooIN === undefined){
        if(loginTF == 0){
            if(_bGetTime !== undefined && _bGetTime != null && !_bGetTime){
                var strJson = JSON.stringify(kData);
                var strJsonClientData = JSON.stringify(clientData);

                localStorage.setItem('Neo_Shanghai.gamegrape.co.kr', strJson);
                localStorage.setItem('Neo_ShanghaiClient.gamegrape.co.kr', strJsonClientData);
            }else{
                networkManager.GetServerTime(function (_time) {
                    clientData[TIME_STAMP] = _time;

                    var strJson = JSON.stringify(kData);
                    var strJsonClientData = JSON.stringify(clientData);

                    localStorage.setItem('Neo_Shanghai.gamegrape.co.kr', strJson);
                    localStorage.setItem('Neo_ShanghaiClient.gamegrape.co.kr', strJsonClientData);
                });
            }
        }else{
            var strJson = JSON.stringify(kData);
            var strJsonClientData = JSON.stringify(clientData);

            localStorage.setItem('Neo_Shanghai.gamegrape.co.kr', strJson);
            localStorage.setItem('Neo_ShanghaiClient.gamegrape.co.kr', strJsonClientData);
        }

        saveLocal('Neo_Shanghai.gamegrape.co.kr');
    }
}

function LoadDataInClient()
{
    if(yahooIN === undefined){
        var strJson = localStorage.getItem('Neo_Shanghai.gamegrape.co.kr');
        var strJsonClientData = localStorage.getItem('Neo_ShanghaiClient.gamegrape.co.kr');

        if(strJsonClientData != null)
            clientData = JSON.parse(strJsonClientData);

//	var strJson = $.cookie('Neo_Shanghai.gamegrape.co.kr');
        if(strJson != undefined)
        {
            kData = JSON.parse(strJson);
            if(kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
                InitData();
        }
        else
        {
            InitData();
        }
    }else{
        InitData();
    }
}

function LoadDataOnlyClient() {
    if(yahooIN == undefined){
        var strJsonClientData = localStorage.getItem('Neo_ShanghaiClient.gamegrape.co.kr');

        if(strJsonClientData != null)
            clientData = JSON.parse(strJsonClientData);
        else
            initDataClientData();
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
	// TweenMax.to(this, 0.2, {scaleX:1.05, scaleY:1.05, ease:Back.easeOut.config(5.0)});
    TweenMax.to(this.scale, 0.2, {x:1.05, y:1.05, ease:Back.easeOut.config(5.0)});
}

function scaleUpNineSliced() {
    // if(this.children.length <= 9) return;
    //
    // for(var i=0,imax=this.children.length;i<imax;++i)
    //         TweenMax.to(this, 0.2, {scaleX:1.05, scaleY:1.05, ease:Power1.easeOut});
    TweenMax.to(this.scale, 0.2, {x:1.05, y:1.05, ease:Quad.easeInOut});
    // this.transform.scale.set(1.05,1.05);
    // TweenLite.to(this, 0.2, {scaleX:1.05, scaleY:1.05, ease:Power1.easeOut});
}

function scaleDownNineSliced() {
    this.transform.scale.set(1,1);
}

function restoreScale(){ //크기 되돌리기
	TweenMax.to(this.scale, 0.2, {x:1, y:1, ease:Linear()});
}

function ScaleUpFlipHorizontal() {
    TweenMax.to(this, 0.2, {scaleX:-1.05, scaleY:1.05, ease:Back.easeOut.config(5.0)});
}

function restoreScaleFlipHorizontal() {
    TweenMax.to(this, 0.2, {scaleX:-1, scaleY:1, ease:Linear()});
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
function TweenPlay(obj, playtime, delaytime, from, to, loop, easing)
{
	var tween = PIXI.tweenManager.createTween(obj);
	tween.time = playtime * 1000;
	tween.delay = delaytime * 1000;
	tween.easing = easing;
	if(from != null)	tween.from(from);
    if(to != null)		tween.to(to);
	tween.loop = loop;
	tween.start();
}

//=============================================================================
// 게임 검색 알고리즘..
//=============================================================================
var LINE_NONE 			= 0x0000;	// 라인이 생성안될경우.
var LINE1_UP 				= 0x0001;	// 한줄짜리 세로.
var LINE1_DOWN 			= 0x0002;	// 한줄짜리 가로.
var LINE1_RIGHT	 		= 0x0003;
var LINE1_LEFT			= 0x0004;
    
// 2번째 블럭이 오른쪽 아래에 있을경우
var LINE2_RIGHT_DOWN		= 0x0032;
var LINE2_DOWN_RIGHT		= 0x0023;
// 2번째 블럭이 왼쪽 위에 있을경우
var LINE2_UP_LEFT			= 0x0014;
var LINE2_LEFT_UP			= 0x0041;
// 2번째 블럭이 오른쪽 위에 있을경우
var LINE2_UP_RIGHT		= 0x0013;
var LINE2_RIGHT_UP		= 0x0031;
// 2번째 블럭이 왼쪽 아래에 있을경우
var LINE2_DOWN_LEFT		= 0x0024;
var LINE2_LEFT_DOWN		= 0x0042;
    
// 같은x줄 위로 검사
var LINE3_UP_RIGHT_DOWN	= 0x0132;
var LINE3_UP_LEFT_DOWN	= 0x0142;
// 같은x줄 아래로 검사
var LINE3_DOWN_RIGHT_UP	= 0x0231;
var LINE3_DOWN_LEFT_UP	= 0x0241;
// 같은y줄 왼쪽으로 검사
var LINE3_LEFT_DOWN_RIGHT	= 0x0423;
var LINE3_LEFT_UP_RIGHT	= 0x0413;
// 같은y줄 오른쪽으로 검사
var LINE3_RIGHT_DOWN_LEFT	= 0x0324;
var LINE3_RIGHT_UP_LEFT	= 0x0314;
    
// 2번째 블럭이 오른쪽 아래에 있을경우
var LINE3_RIGHT_DOWN_RIGHT= 0x0323;
var LINE3_DOWN_RIGHT_DOWN	= 0x0232;
// 2번째 블럭이 왼쪽 위에 있을 경우
var LINE3_LEFT_UP_LEFT	= 0x0414;
var LINE3_UP_LEFT_UP		= 0x0141;
// 2번째 블럭이 왼쪽 아래에 있을경우
var LINE3_LEFT_DOWN_LEFT	= 0x0424;
var LINE3_DOWN_LEFT_DOWN	= 0x0242;
// 2번째 블럭이 오른쪽 위에 있을경우
var LINE_RIGHT_UP_RIGHT	= 0x0313;
var LINE_UP_RIGHT_UP		= 0x0131;

function isMatch(y1, x1, y2, x2)
{
    var iGapX, iGapY;
	
	iGapX = x2 - x1;
	iGapY = y2 - y1;
	
	// 열이 같고 행이 틀린경우
	// 0
	// |
	// 0
	if(iGapX == 0 && iGapY != 0)
	{
        m_iLineType = checkMatchLine1_Y(y1, y2, x1);
		if(m_iLineType > LINE_NONE)
		{
			// 성공메세지를 리턴한다.
			iLineState = 1;	// 한줄짜리 라인
			return true;
		}
		else {
            m_iLineType = checkMatchLine3_Y(y1, y2, x1);
			if(m_iLineType > LINE_NONE)
			{
				iLineState = 3;
				return true;
			}
		}

	}
	// 열이 틀리고 행이 같은경우
	// 0 --- 0
	else if(iGapX != 0 && iGapY == 0)
	{
        m_iLineType = checkMatchLine1_X(y1, x1, x2);
		if(m_iLineType > LINE_NONE)
		{
            // switch (m_iLineType){
            //     case LINE1_LEFT:
            //         break;
            //     case LINE1_RIGHT:
            //         break;
            // }

			iLineState = 1;	// 한줄짜리 라인
			return true;
		}
		else {
            m_iLineType = checkMatchLine3_X(y1, x1, x2);
			if(m_iLineType > LINE_NONE)
			{
				iLineState = 3;	// 세줄짜리 라인
				return true;
			}
		}
	}
	// 형과 열이 모두 틀릴경우
	// 0--
	//   ㅣ
	//   0
	else 
	{
        m_iLineType = checkMatchLine2(y1, x1, y2, x2);
		if(m_iLineType > LINE_NONE)
		{
			iLineState = 2;	// 두줄짜리 라인
			return true;
		}
		else {
            m_iLineType = checkMatchLine3(y1, x1, y2, x2, iGapY, iGapX);
			if(m_iLineType > LINE_NONE)
			{
				iLineState = 3;	// 세줄짜리 라인
				return true;
			}
			else {
                m_iLineType = checkMatchLine3_2(y1, x1, y2, x2, m_iLineType);
				if(m_iLineType > LINE_NONE)
				{
					iLineState = 3;	// 세줄짜리 라인
					return true;
				}
			}
		}
	}
	
	return false;
}

//열이 같고 행이 틀린경우 위, 아래로 검사한다.
//0
//|
//0
function checkMatchLine1_Y(y1, y2, x)
{
	if(y1 < y2)	// 시작행보다 끝행의 값이 클 경우
	{
		for(var y=y1+1;y<y2;++y)
		{
			if(sprBlock[y][x].visible == false) continue;
			else return LINE_NONE;	// 블럭이 막힐경우
		}
		return LINE1_DOWN;
	}
	else {		// 시작행보다 끝행이 값이 작을 경우
		for(var y=y1-1;y>y2;--y)
		{
			if(sprBlock[y][x].visible == false) continue;
			else return LINE_NONE;
		}
		return LINE1_UP;
	}
	return LINE_NONE;
}

//열이 틀리고 행이 같을경우 좌, 우로 검사한다.
//0---0
function checkMatchLine1_X(y, x1, x2)
{
	if(x1 < x2)
	{
		for(var x=x1+1;x<x2;++x)
		{
			if(sprBlock[y][x].visible == false) continue;
			else return LINE_NONE;
		}
		return LINE1_RIGHT;
	}
	else {
		for(var x=x1-1;x>x2;--x)
		{
			if(sprBlock[y][x].visible == false) continue;
			else return LINE_NONE;
		}
		return LINE1_LEFT;
	}
	
	return LINE_NONE;
}

//0----
//|   |
//----0
function checkMatchLine2(y1, x1, y2, x2)
{
	var iTemp1, iTemp2;
	
	// 
	if(y1 < y2)
	{
		iTemp1 = checkMatchLine1_Y(y1, y2+1, x1);	// y2+1을 해주는 이유는 해당위치의 인덱스까지 검사를 해줘야 해서 해주는것이다.
		iLineX1 = x1;
		iLineY1 = y2;
	}
	else
	{
		iTemp1 = checkMatchLine1_Y(y1, y2-1, x1);
		iLineX1 = x1;
		iLineY1 = y2;
	}
	iTemp2 = checkMatchLine1_X(y2, x1, x2);
	if(iTemp1 > LINE_NONE && iTemp2 > LINE_NONE)
	{
		return ((iTemp1<<4)|iTemp2);
	}
	
 
	if(x1 < x2)
	{
		iTemp1 = checkMatchLine1_X(y1, x1, x2+1);
		iLineX1 = x2;
		iLineY1 = y1;
	}
	else
	{
		iTemp1 = checkMatchLine1_X(y1, x1, x2-1);
		iLineX1 = x2;
		iLineY1 = y1;
	}
	iTemp2 = checkMatchLine1_Y(y1, y2, x2);
	if(iTemp1 > LINE_NONE && iTemp2 > LINE_NONE)
 {
     return ((iTemp1<<4)|iTemp2);
 }
	
	return LINE_NONE;
}

//세로기준으로 Line3개로 연결되는지 체크.
//----0----
//|       |
//----0----
function checkMatchLine3_Y(y1, y2, x)
{
	var iTemp;
	// 세로기준으로 왼쪽으로 검사한다.
	for(var i=x-1;i>=0;--i)
	{
		if(sprBlock[y1][i].visible == false && sprBlock[y2][i].visible == false)
		{
         iTemp = checkMatchLine1_Y(y1, y2, i);
			if(iTemp > LINE_NONE)
			{
				iLineX1 = i;
				iLineY1 = y1;
				iLineX2 = i;
				iLineY2 = y2;
				return ((LINE1_LEFT<<8)|(iTemp<<4)|LINE1_RIGHT);
			}
		}
		else {
			break;
		}
	}
	
	// 세로기준으로 오른쪽으로 검사한다.
	for(var i=x+1;i<BLOCK_WIDTH;++i)
	{
		if(sprBlock[y1][i].visible == false && sprBlock[y2][i].visible == false)
		{
			iTemp = checkMatchLine1_Y(y1, y2, i);
			if(iTemp > LINE_NONE)
			{
				iLineX1 = i;
				iLineY1 = y1;
				iLineX2 = i;
				iLineY2 = y2;
				return ((LINE1_RIGHT<<8)|(iTemp<<4)|LINE1_LEFT);
			}
		}
		else {
			break;
		}
	}
	
	return false;;
}

//가로기준으로 Line3개로 연결되는지 체크.
//-------
//|     |
//0     0
//|     |
//-------
function checkMatchLine3_X(y, x1, x2)
{
	var iTemp;
	// 가로기준으로 위쪽으로 검사한다.
	for(var i=y-1;i>=0;--i)
	{
		if(sprBlock[i][x1].visible == false && sprBlock[i][x2].visible == false)
		{
			iTemp = checkMatchLine1_X(i, x1, x2);
			if(iTemp > LINE_NONE)
			{
				iLineX1 = x1;
				iLineY1 = i;
				iLineX2 = x2;
				iLineY2 = i;
				return ((LINE1_UP<<8)|(iTemp<<4)|LINE1_DOWN);
			}
		}
		else {
			break;
		}

	}
	
	// 가로기준으로 아래쪽으로 검사한다.
	for(var i=y+1;i<BLOCK_HEIGHT;++i)
	{
		if(sprBlock[i][x1].visible == false && sprBlock[i][x2].visible == false)
		{
			iTemp = checkMatchLine1_X(i, x1, x2);
			if(iTemp > LINE_NONE)
			{
				iLineX1 = x1;
				iLineY1 = i;
				iLineX2 = x2;
				iLineY2 = i;
				return ((LINE1_DOWN<<8)|(iTemp<<4)|LINE1_UP);
			}
		}
		else {
			break;
		}
		
	}
	
	return false;;
}

//패1과 패2 사이에서 라인 3개로 연결되는가 체크.
function checkMatchLine3(y1, x1, y2, x2, gy, gx)
{
	var ie;
	// 패2가 오른쪽 아래에 있을경우
	if(gy > 0 && gx > 0)
	{
		// 오른쪽으로 검사
		// 1--
		//   |
		//   ---2
		for(ie=1;ie<gx;++ie)
		{
			if(sprBlock[y1][x1+ie].visible == false)
			{
				if(checkMatchLine1_Y(y1, y2+1, x1+ie) > LINE_NONE)
				{
					if(checkMatchLine1_X(y2, x1+ie, x2) > LINE_NONE)
					{
						iLineX1 = x1+ie;
						iLineY1 = y1;
						iLineX2 = x1+ie;
						iLineY2 = y2;
						return ((LINE1_RIGHT<<8)|(LINE1_DOWN<<4)|LINE1_RIGHT);	// 검색 성공
					}
				}
			}
			else break;
		}
		
		// 아래쪽으로 검사
		// 1
		// |
		// ------
		//      |
		//      2
		for(ie=1;ie<gy;++ie)
		{
			if(sprBlock[y1+ie][x1].visible == false)
			{
				if(checkMatchLine1_X(y1+ie, x1, x2+1) > LINE_NONE)
				{
					if(checkMatchLine1_Y(y1+ie, y2, x2) > LINE_NONE)
					{
					//	NSLog(@"==checkMatchLine3 : 패2가 오른쪽아래 : 아래쪽으로 검사");
						iLineX1 = x1;
						iLineY1 = y1+ie;
						iLineX2 = x2;
						iLineY2 = y1+ie;
						return ((LINE1_DOWN<<8)|(LINE1_RIGHT<<4)|LINE1_DOWN);	// 검색 성공
					}
				}
			}
			else break;
		}
		
		return -1;
	}
	// 패2가 왼쪽 아래에 있을경우
	else if(gy > 0 && gx < 0) // 패2가 왼쪽 아래에 있을경우
	{
		gx = Math.abs(gx);
		// 왼쪽으로 검사
		//   --1
		//   |
		//2---
		for(ie=1;ie<gx;++ie)
		{
			if(sprBlock[y1][x1-ie].visible == false)
			{
				if(checkMatchLine1_Y(y1, y2+1, x1-ie) > LINE_NONE)
				{
					if(checkMatchLine1_X(y2, x1-ie, x2) > LINE_NONE)
					{
					//	NSLog(@"==checkMatchLine3 : 패2가 왼쪽아래 : 왼쪽으로 검사");
						iLineX1 = x1-ie;
						iLineY1 = y1;
						iLineX2 = x1-ie;
						iLineY2 = y2;
						return ((LINE1_LEFT<<8)|(LINE1_DOWN<<4)|LINE1_LEFT);	// 검색 성공
					}
				}
			}
			else break;
		}
		
		// 아래쪽으로 검사
		//      1
		//      |
		// ------
		// |
		// 2
		for(ie=1;ie<gy;++ie)
		{
			if(sprBlock[y1+ie][x1].visible == false)
			{
				if(checkMatchLine1_X(y1+ie, x1, x2-1) > LINE_NONE)
				{
					if(checkMatchLine1_Y(y1+ie, y2, x2) > LINE_NONE)
					{
					//	NSLog(@"==checkMatchLine3 : 패2가 왼쪽아래 : 아래쪽으로 검사");
						iLineX1 = x1;
						iLineY1 = y1+ie;
						iLineX2 = x2;
						iLineY2 = y1+ie;
						return ((LINE1_DOWN<<8)|(LINE1_LEFT<<4)|LINE1_DOWN);	// 검색 성공
					}
				}
			}
			else break;
		}
		return -2;
	}
	// 패2가 오른쪽 위에 있다.
	else if(gy < 0 && gx > 0)
	{
		// 오른쪽으로 검사
		//   ---2
		//   |
		// 1--		
		for(ie=1;ie<gx;++ie)
		{
			if(sprBlock[y1][x1+ie].visible == false)
			{
				if(checkMatchLine1_Y(y1, y2-1, x1+ie) > LINE_NONE)
				{
					if(checkMatchLine1_X(y2, x1+ie, x2) > LINE_NONE)
					{
					//	NSLog(@"==checkMatchLine3 : 패2가 오른쪽위 : 오른쪽으로 검사");
						iLineX1 = x1+ie;
						iLineY1 = y1;
						iLineX2 = x1+ie;
						iLineY2 = y2;
						return ((LINE1_RIGHT<<8)|(LINE1_UP<<4)|LINE1_RIGHT);	// 검색 성공
					}
				}
			}
			else break;
		}
		
		// 위쪽으로 검사
		//      2
		//      |
		// ------
		// |
		// 1
		gy = Math.abs(gy);
		for(ie=1;ie<gy;++ie)
		{
			if(sprBlock[y1-ie][x1].visible == false)
			{
				if(checkMatchLine1_X(y1-ie, x1, x2+1) > LINE_NONE)
				{
					if(checkMatchLine1_Y(y1-ie, y2, x2) > LINE_NONE)
					{
					//	NSLog(@"==checkMatchLine3 : 패2가 오른쪽위 : 위쪽으로 검사");
						iLineX1 = x1;
						iLineY1 = y1-ie;
						iLineX2 = x2;
						iLineY2 = y1-ie;
						return ((LINE1_UP<<8)|(LINE1_RIGHT<<4)|LINE1_UP);	// 검색 성공
					}
				}
			}
			else break;
		}
		
		return -3;
	}
	// 패2가 왼쪽 위에 있을경우
	else
	{
		gx = Math.abs(gx);
		// 왼쪽으로 검사
		// 2--
		//   |
		//   ---1
		for(ie=1;ie<gx;++ie)
		{
			if(sprBlock[y1][x1-ie].visible == false)
			{
				if(checkMatchLine1_Y(y1, y2-1, x1-ie) > LINE_NONE)
				{
					if(checkMatchLine1_X(y2, x1-ie, x2) > LINE_NONE)
					{
					//	NSLog(@"==checkMatchLine3 : 패2가 왼쪽위 : 왼쪽으로 검사");
						iLineX1 = x1-ie;
						iLineY1 = y1;
						iLineX2 = x1-ie;
						iLineY2 = y2;
						return ((LINE1_LEFT<<8)|(LINE1_UP<<4)|LINE1_LEFT);	// 검색 성공
					}
				}
			}
			else break;
		}
		
		// 위쪽으로 검사
		// 2
		// |
		// ------
		//      |
		//      1
		gy = Math.abs(gy);
		for(ie=1;ie<gy;++ie)
		{
			if(sprBlock[y1-ie][x1].visible == false)
			{
				if(checkMatchLine1_X(y1-ie, x1, x2-1) > LINE_NONE)
				{
					if(checkMatchLine1_Y(y1-ie, y2, x2) > LINE_NONE)
					{
					//	NSLog(@"==checkMatchLine3 : 패2가 왼쪽위 : 위쪽으로 검사");
						iLineX1 = x1;
						iLineY1 = y1-ie;
						iLineX2 = x2;
						iLineY2 = y1-ie;
						return ((LINE1_UP<<8)|(LINE1_LEFT<<4)|LINE1_UP);	// 검색 성공
					}
				}
			}
			else break;
		}
	}
	
	return -4;
}
						
function checkMatchLine3_2(y1, x1, y2, x2, type)
{
	var n;
	var iTemp1, iTemp2, iTemp3;
	// type : 두번째 선택된 블럭의 위치에 따라 타입이 달라진다.
	//	-1 : RIGHT_DOWN
	//	-2 : LEFT_DOWN
	//  -3 : RIGHT_UP
	//	-4 : LEFT_UP
	// 위로 검사
	switch(type)
	{
		case -1:case -2: n = y1-1; break;
		case -3:case -4: n = y2-1; break;
	}
	for(var i=n;i>=0;--i)
	{
		iTemp1 = checkMatchLine1_Y(y1, i-1, x1);
		if(iTemp1 > LINE_NONE)
		{
			iTemp2 = checkMatchLine1_X(i, x1, x2);
			if(iTemp2 > LINE_NONE)
			{
				iTemp3 = checkMatchLine1_Y(i-1, y2, x2);
				if(iTemp3 > LINE_NONE)
				{
				//	NSLog(@"==checkMatchLine3_2 : 위로검사에 걸림");
					iLineX1 = x1;
					iLineY1 = i;
					iLineX2 = x2;
					iLineY2 = i;
					return ((iTemp1<<8)|(iTemp2<<4)|iTemp3);
				}
				else {
					break;
				}
			}
			else {
				continue;	// 가로검색은 하다가 안되면 계속한다.
			}
		}
		else {	// 자기 위로 블럭이 없는동안까지 체크한다.
			break;
		}
	}
	
	// 아래로 검사
	switch(type)
	{
		case -1:case -2: n = y2+1; break;
		case -3:case -4: n = y1+1; break;
	}
	for(var i=n;i<BLOCK_HEIGHT;++i)
	{
		iTemp1 = checkMatchLine1_Y(y1, i+1, x1);
		if(iTemp1 > LINE_NONE)
		{
			iTemp2 = checkMatchLine1_X(i, x1, x2);
			if(iTemp2 > LINE_NONE)
			{
				iTemp3 = checkMatchLine1_Y(i+1, y2, x2);
				if(iTemp3 > LINE_NONE)
				{
				//	NSLog(@"==checkMatchLine3_2 : 아래로 검사에 걸림");
					iLineX1 = x1;
					iLineY1 = i;
					iLineX2 = x2;
					iLineY2 = i;
					return ((iTemp1<<8)|(iTemp2<<4)|iTemp3);
				}
				else {
					break;
				}
			}
			else {
				continue;	// 가로검색은 하다가 안되면 계속한다.
			}
		}
		else {	// 자기 위로 블럭이 없는동안까지 체크한다.
			break;
		}
	}
	
	// 왼쪽으로 검사
	switch(type)
	{
		case -1:case -3: n = x1-1; break;
		case -2:case -4: n = x2-1; break;
	}
	for(var i=n;i>=0;--i)
	{
		iTemp1 = checkMatchLine1_X(y1, x1, i-1);
		if(iTemp1 > LINE_NONE)
		{
			iTemp2 = checkMatchLine1_Y(y1, y2, i);
			if(iTemp2 > LINE_NONE)
			{
				iTemp3 = checkMatchLine1_X(y2, i-1, x2);
				if(iTemp3 > LINE_NONE)
				{
				//	NSLog(@"==checkMatchLine3_2 : 왼쪽으로 검사에 걸림");
					iLineX1 = i;
					iLineY1 = y1;
					iLineX2 = i;
					iLineY2 = y2;
					return ((iTemp1<<8)|(iTemp2<<4)|iTemp3);
				}
				else {
					break;
				}
			}
			else {
				continue;	// 가로검색은 하다가 안되면 계속한다.
			}
		}
		else {	// 자기 위로 블럭이 없는동안까지 체크한다.
			break;
		}
	}
	
	// 오른쪽으로 검사
	switch(type)
	{
		case -1:case -3: n = x2+1; break;
		case -2:case -4: n = x1+1; break;
	}
	for(var i=n;i<BLOCK_WIDTH;++i)
	{
		iTemp1 = checkMatchLine1_X(y1, x1, i+1);
		if(iTemp1 > LINE_NONE)
		{
			iTemp2 = checkMatchLine1_Y(y1, y2, i);
			if(iTemp2 > LINE_NONE)
			{
				iTemp3 = checkMatchLine1_X(y2, i+1, x2);
				if(iTemp3 > LINE_NONE)
				{
				//	NSLog(@"==checkMatchLine3_2 : 오른쪽 검사에 걸림");
					iLineX1 = i;
					iLineY1 = y1;
					iLineX2 = i;
					iLineY2 = y2;
					return ((iTemp1<<8)|(iTemp2<<4)|iTemp3);
				}
				else {
					break;
				}
			}
			else {
				continue;	// 가로검색은 하다가 안되면 계속한다.
			}
		}
		else {	// 자기 위로 블럭이 없는동안까지 체크한다.
			break;
		}
	}
	
	return LINE_NONE;
}