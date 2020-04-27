// 게임상태를 나타낸다.
var STATE_NONE = 0;
var STATE_LOADING_SET = 10;
var STATE_LOADING = 20;
var STATE_TITLE = 40;
var STATE_GAME = 60;
var STATE_GAME_INIT = 1000;
var STATE_GAME_SET = 1020;
var STATE_GAME_READY = 1025;
var STATE_GAME_PLAY = 1030;
var STATE_GAME_CLEAR_ANI = 1040;
var STATE_GAME_CLEAR = 1050;
var STATE_GAME_CLEAR_END = 1060;
var STATE_GAME_OVER_ANI = 1070;
var STATE_GAME_OVER = 1080;
var STATE_GAME_LEVELUP = 1090;

renderer.backgroundColor = 0xffffff; // 백그라운드 컬러를 변경한다.
var VERSION = "1.0.4";
var bMGCHEAT = false;	// yahooIN : 추가.

var state = STATE_LOADING_SET;	// 게임을 상태를 나타내며..현상태로 해당 함수를 콜한다.
var gameState = STATE_GAME_INIT;
var nextState = STATE_NONE;		// 우선 임시로 놓는다.

var fTimeDelay = 0;
var fTimeDelayMax = 0;

var txtLoading;
var iLoadingCnt = 0;
var iLoadingCntDelay = 0;
//================================================================================
// 여기서부터 변수를 선언한다.
//세이브쪽으로 옮겨야 함.
var nMySecondPerDmg = [0];		// 초당 데미지
// 거북이 체력..
var iCharacterDirection = 0;	// 레프트 라이트 처리..
var fClickTime = 0;
var fClickTimeMax = 0.1;
var bClickPush = false;

var txtMyMoney;
var txtMyMoney2;
var txtMyCash;
var txtMyClickDmg;
var txtNextClickDmg;
var txtShurikenLv;
var txtMySecondDmg;
var txtNextSecondDmg;
var txtKunaiLv;

//var txtNextButMoney;

var TOAD_NONE = 0;
var TOAD_IN = 1;
var TOAD_IDLE = 2;
var TOAD_OUT = 3;
var sprToadGauge;
var sprToadGaugeMask;
var txtToadHP;
var txtToadLevel;
var iToadState = TOAD_NONE;
var nToadHP = [0];
var iToadHPMax = 0;

var spine_neko_character;
var spine_neko_shadow;
var spine_Shuriken = [];
var iShurikenCnt = 0;
var iShurikenCntMax = 40;
var spine_Kunai = [];
var iKunaiCnt = 0;
var iKunaiCntMax = 10;
var sprCash = [];
var iCashCnt = 0;
var iCashCntMax = 5;

var sprSoundBGM;
var sprSoundSE;

var sprPopupWhite;
var sprGoldShopShuriken;
var txtGlodShopAD;
var spine_GlodShopShuriken;
var sprGlodShopShurikenStar = [];
//var txtGlodShopShurikenName;
var txtGlodShopShurikenInfo;
var txtGlodShopShurikenBuy;
var sprShurikenDisable;
var sprShurikenMax;
var sprShurikenButton;
var sprCollectionShuriken = [];

var sprGoldShopKunai;
var spine_GoldShopKunai;
var sprGoldShopKunaiStar = [];
//var txtGlodShopKunaiName;
var txtGlodShopKunaiInfo;
var txtGoldShopKunaiBuy;
var sprKunaiDisable;
var sprKunaiMax;
var sprKunaiButton;
var sprCollectionKunai = [];

var txtDPS;
var sprFeverBtn;
var spine_fever_eff1;
var spine_fever_eff2;
//var sprRebirth;
var txtRebirth;
var fDPSTime = 0;
var nDPS = [0];

//var nGoldShopAD = [];
//var fGoldShopADTime;

var sprGemShopBtn = [];
var sprGemShopBtnDis = [];
var sprGemShopBuy = [];
var txtGemShopBuy = [];
var txtGemShopBtn = [];
var txtGemShopCurrentLv = [];
var txtGemShopNextLv = [];
var txtGetShopPopupCash;

// Cash Shop 관련 변수
var txtGreapPoint;
var sprCashIcon = [];
var txtOnlyClient = [];
var sprCashBuyBtn = [];
var sprCashMIcon = [];
var txtCashQuantity = [];
var txtCashValue = [];
var sprCashBtnImg = [];
var txtCashCooltime = [];

// Cash Shop Confirm 관련
var sprCashConfirmImg;
var txtCashConfirmValue;
var txtCashConfirmData;

var txtOption1 = [];
var txtOption2 = [];

// 광고 관려
var iADState = 0;		// 광고 상태
var fADTimeDelay = 0;	// 광고 시간
var iADType = 0;		// 광고의 종류
var txtAD1;
var txtAD2;
var txtADCount;
var sprADIcon1;
var sprADIcon2;

var sprFeverGauge;
var sprFeverMask;
var iFeverState = 0;
var iFeverCnt = 0;
var iFeverCntOld = 0;
var fFeverTime;
var spine_under_coin;
var spineBGCoinState = 0;
var fBGCoinTime = 0;
var spine_under_coin_fever;

var spine_light_bug;

var spine_coin = [];
var iCoinCnt = 0;
var iCoinCntMax = 30;

var txtScore = [];
var iScoreCnt = 0;
var iScoreCntMax = 30;
var sprRebirthWhite;

var txtTutoContents;
var iTutorialState = 0;
var fTutoTime;
var spine_tutorial_popup;
var spine_tutorial_arrow_2;

var txtUpgradeTitile;
var txtUpgradeContents;
var spine_UpgradeIcon = [];
var iUpgradePopupState = 0;
var fUpgradePopupTime;
var sprPopupNew;

var iNewState = 0;
var iNewType = 0;
var fNewTime = 0;

var iBreakthroughState = 0;
var txtBreakthrough;
var sprBreakthroughBG;

var spine_touchMeShuriken;
var spine_touchMeKunai;

var dictionary_buttonPress = {};
// 버튼 관련
dictionary_buttonPress['b_shuriken'] = false;
dictionary_buttonPress['b_kunai'] = false;
dictionary_buttonPress['timemax_shuriken'] = 1;
dictionary_buttonPress['timemax_kunai'] = 1;
dictionary_buttonPress['time_shuriken'] = 0;
dictionary_buttonPress['time_kunai'] = 0;
// 터치 스파인 관련
dictionary_buttonPress['b_shuriken_touchMe'] = false;
dictionary_buttonPress['b_kunai_touchMe'] = false;
dictionary_buttonPress['timemax_shuriken_touchMe'] = 5;
dictionary_buttonPress['timemax_kunai_touchMe'] = 5;
dictionary_buttonPress['time_shuriken_touchMe'] = 0;
dictionary_buttonPress['time_kunai_touchMe'] = 0;

// 랭킹 관련
var RANKING_STATE = {
	DAILY : 0,
	TOTAL : 1
};
var state_ranking = RANKING_STATE.DAILY;
var sprRank_RankingMyEff;
var sprRank_RankingTaps = [];
var txtRank_RankingTaps = [];
var sprRank_PanelList = [];
var txtRank_UserRankList = [];
var txtRank_UserNameList = [];
var txtRank_RankingPointList = [];
var sprRank_RankingMedalList = [];
var txtRank_SignUp;
var sprRank_Medal;
var spineRank_RankUp;
var txtRank_RankChange = [];

// 로딩 관련 변수
var loadingcount=0;           //로딩    카운트
var loadingcountmax = 63;      //로딩맥스 카운트
var loadingscalemax = 236;    //스케일 480보다 1많게

// window.document.fonts.ready.then(function () {
//     if(document.fonts.check('1em ' + tbTTF[lang])){
//         if(loginTF == 0){
//             LoadDataInClient();
//             update();
//         }else{
//             update();
//         }
//     }
// });

var interval_font_id;

$(document).ready(function () {
    /*txtTest = FontLoad(stage, 'testtext' , -2000,-2000, 0.5,0.5,
        {font: '30px ' + tbPopupTitleTTF[lang],
            fill: '#2e85ed'});
    txtTest2 = FontLoad(stage, 'testtext' , -2000,-2000, 0.5,0.5,
        {font: '30px ' + tbTTF[lang],
            fill: '#2e85ed'});
    renderer.render(stage);*/

    // alert('IOS ? :: ' + iOS() );
    //if(iOS()){
    //    setTimeout(function () {
            if(loginTF == 0){
                LoadDataInClient();
                update();
            }else{
                update();
            }
    //    },1000);
    //}else{
    //    interval_font_id = setInterval("interval_readytofont()",100);
	//}
});

/*function iOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];
    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()){ return true; }
        }
    }
    return false;
}

function interval_readytofont(){
	// alert( tbTTF[lang] + " loaded :: " + document.fonts.check("1px "+ tbTTF[lang]));
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    if(is_chrome){
        if(document.fonts.check("1px "+ tbTTF[lang])){
            clearInterval(interval_font_id);

            if(loginTF == 0){
                LoadDataInClient();
                update();
            }else{
                update();
            }
        }
	}else{
        if(loginTF == 0){
            LoadDataInClient();
            update();
        }else{
            update();
        }
	}
}*/

// 업데이트함수를 호출하고 지속적으로 업데이트함수를 콜한다.

function update()
{
	switch(state)
	{
		case STATE_NONE:
			break;
		case STATE_LOADING_SET:
            // 회사 로고 이미지를 로딩한다.
            var loader = PIXI.loader;
            loader.add("Loading/loading_color.png", "Loading/loading_color.png");
            loader.add("Loading/loading_grey.png", "Loading/loading_grey.png");
            loader.add("Loading/movi_name.png", "Loading/movi_name.png");

            loader.once('complete',cbLogoComplete);
            loader.load();
            // renderer.backgroundColor = 0x2e85ed;

            txtLoading = new PIXI.Text('Loading', {
                //font: 'bold 30px Arial',
                font: '30px Arial',
                fill: '#2e85ed'
            });

            txtLoading.anchor.set(0.5, 0.5);
            txtLoading.position.x = 360;
            txtLoading.position.y = 730;
            txtLoading.text = "0%";
            stage.addChild(sLoading);
            sLoading.addChild(txtLoading);

            //--프로그래스바시작--                      <----여기서부터 복사시작
            var resources = PIXI.loader.resources;

            //로딩바작동
            loader.on(
                "progress",
                function (loader, resources){
                    loadingcount+=1;
                    var progbias=loadingcount/loadingcountmax;
                    var prog = progbias*100;
                    //progFore.scale.x=progbias;

                    var progcrop = prog<1?1:prog>100?100:prog;
                    txtLoading.text = ""+ Math.floor(progcrop)+"%";
                    if(loadingcount==0)txtLoading.text="0%";
                    var scalex = loadingscalemax*progbias;
                    var scalexcrop = scalex<1?1:scalex>loadingscalemax?loadingscalemax:scalex;
                    if(typeof sprLogoMask !== "undefined"            //마스크로딩이 완료되면 나오게
                        && sprLogoMask) {

                        sprLogoMask.clear();
                        sprLogoMask.beginFill(0xffffff,1);
                        sprLogoMask.moveTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
                        sprLogoMask.lineTo(sprLogoProg.x - progW_half + (sprLogoProg.width * progbias), sprLogoProg.y - progH_half);
                        sprLogoMask.lineTo(sprLogoProg.x - progW_half + (sprLogoProg.width * progbias), sprLogoProg.y + progH_half);
                        sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);

                        if(sprLogoProg.alpha<1) sprLogoProg.alpha=1; //보라색로고가 나오게
                    }
                    // //디버그용도 -->
                    // 여기서 오브젝트 카운트를 알 수 있고,
                    // 사운드는 나중에 로딩 될 수 있음, 그래서 타이틀 등장시 오브젝트카운트틀 사용하면 적당
                    //
                    //  var text = (`loading: ${resources.url}`+"\n");
                    //  text += (`progress: ${loader.progress}`+"\n");
                    //  text += (loadingcount+"\n");
                    //  console.log("progress:"+ text);
                    // txtLoading.text=loadingcount; //
                    // //디버그용도
                }
            );

            //pixi3
            // loader.load(function () {
            // txtLoading.text = "100%";
            // sprLogoMask.scale.x = loadingscalemax;
            // }
            // );
            //pixi3

            //pixi4
            // loader.load(
            //     function () {
            //         var progbias = loadingcount / loadingcountmax;
            //         var prog = progbias * 100;
            //         //progFore.scale.x=progbias;
            //
            //         var progcrop = prog < 1 ? 1 : prog > 100 ? 100 : prog;
            //         txtLoading.text = "" + Math.floor(progcrop) + "%";
            //         if (loadingcount == 0) txtLoading.text = "0%";
            //         var scalex = loadingscalemax * progbias;
            //         var scalexcrop = scalex < 1 ? 1 : scalex > loadingscalemax ? loadingscalemax : scalex;
            //         if (typeof sprLogoMask !== "undefined"            //마스크로딩이 안되면 안나오게
            //             && sprLogoMask) {
            //             sprLogoMask.scale.x = scalexcrop;
            //             if (sprLogoProg.alpha < 1) sprLogoProg.alpha = 1; //보라색로고가 나오는 경우를 막기 위해
            //         }
            //     }
            // );
            //pixi4
            //--프로그래스바완료--                            <----여기서부터 복사끝

            state = STATE_LOADING;
			break;
		case STATE_LOADING:
			//updateLoading();
			break;

		case STATE_TITLE: // 타이틀화면에서 키입력이 있기까지 대기한다.
			break;

		case STATE_GAME:
			switch(gameState)
			{
				case STATE_GAME_INIT:
					BGMSoundPlay(BGM_Game);
					TweenLite.to(sTitle, 0.2, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTitleOff});
					// TweenPlay(sTitle, 0.5, 0, null, {alpha: 0}, false, PIXI.tween.Easing.outQuad(), cbTweenTitleOff);
					sGame.visible = true;
					stage.addChildAt(sGame, 0);
					gameState = STATE_GAME_SET;
				case STATE_GAME_SET: // 게임을 셋팅한다.
					GameSet();
				//	UpdateTutorial();
					UpdateInfo();
					fTimeDelay = 0;
					gameState = STATE_GAME_READY;
					break;
				case STATE_GAME_READY: // 블럭이 위에서 아래로 내려오는 애니중..
					UpdateInfo();
				//	UpdateTutorial();
					gameState = STATE_GAME_PLAY;
					break;
				case STATE_GAME_PLAY:
					UpdateBreakthrough();
					UpdateInfo();
					UpdateButtonDownCheck();
					UpdateTutorial();
					UpdateAD();
					UpdateFeverGauge();
					UpdateBGCoin();
					UpdateUpgradePopup();
                    UpdateTouchMeCheck();
					break;
			}
			break;
	}

	requestAnimationFrame(update);
	renderer.render(stage);
	updateTick();
    UpdateSaveTick();

	networkManager.Update();

    if(b_initADGameMoney)
        ADGameMoneyUpdate();

	PIXI.tweenManager.update();
	fTimeDelay += deltaTime;
	fClickTime += deltaTime;	// 클릭관련처리.

	if(bClickPush)
		cbButtonClick();
}

function UpdateTouchMeCheck() {
	// if(!dictionary_buttonPress['b_shuriken_touchMe'] && !dictionary_buttonPress['b_kunai_touchMe'])
	// 	return;

	if(iFeverState > 0){
        if(spine_touchMeShuriken.visible)
            spine_touchMeShuriken.visible = false;

        if(spine_touchMeKunai.visible)
            spine_touchMeKunai.visible = false;

        return;
	}

	if(dictionary_buttonPress['b_shuriken_touchMe']){
		if(dictionary_buttonPress['time_shuriken_touchMe'] > dictionary_buttonPress['timemax_shuriken_touchMe']){
			if(!spine_touchMeShuriken.visible)
				SpinePlay(spine_touchMeShuriken,null,null,'animation',0,true);
            //spine_touchMeShuriken.visible = true;
			//SpinePlay(spine_touchMeShuriken,iCenterSizeX,iCenterSizeY,"animation",0,true);
		}else{
            if(spine_touchMeShuriken.visible)
                spine_touchMeShuriken.visible = false;

			dictionary_buttonPress['time_shuriken_touchMe'] += deltaTime;
		}
	}else{
		if(spine_touchMeShuriken.visible)
            spine_touchMeShuriken.visible = false;
	}

	if(dictionary_buttonPress['b_kunai_touchMe']){
        if(dictionary_buttonPress['time_kunai_touchMe'] > dictionary_buttonPress['timemax_kunai_touchMe']){
        	if(!spine_touchMeKunai.visible)
				SpinePlay(spine_touchMeKunai,null,null,'animation',0,true);
            //spine_touchMeShuriken.visible = true;
            //SpinePlay(spine_touchMeShuriken,iCenterSizeX,iCenterSizeY,"animation",0,true);
        }else{
            if(spine_touchMeKunai.visible)
                spine_touchMeKunai.visible = false;

            dictionary_buttonPress['time_kunai_touchMe'] += deltaTime;
        }
	}else{
        if(spine_touchMeKunai.visible){
            spine_touchMeKunai.visible = false;
		}
	}
}

function UpdateButtonDownCheck() {
	if(!dictionary_buttonPress['b_shuriken'] && !dictionary_buttonPress['b_kunai'])
		return;

	if(dictionary_buttonPress['b_shuriken']){
        if(dictionary_buttonPress['time_shuriken'] > dictionary_buttonPress['timemax_shuriken'])
            cbButtonUpgradeShuriken();
        else
            dictionary_buttonPress['time_shuriken'] += deltaTime;
	}
	else if(dictionary_buttonPress['b_kunai']){
		if(dictionary_buttonPress['time_kunai'] > dictionary_buttonPress['timemax_kunai'])
			cbButtonUpgradeKunai();
		else
			dictionary_buttonPress['time_kunai'] += deltaTime;
	}
}

function UpdateTutorial()
{
	switch(iTutorialState)
	{
	case 0:	// 아무짓도 하지 않는다.
		break;
	case 1:	// 튜토리얼 시작..
		sGame.addChild(sTutorial);

		//.position.set(iCenterSizeX, iCenterSizeY + 50);
		spine_tutorial_popup.visible = true;
		SpinePlay(spine_tutorial_popup, iCenterSizeX, iCenterSizeY + 50, "tutorial_popup_in", 0, false);
		txtTutoContents.text = GetString("tuto00");

		spine_tutorial_arrow_2.visible = false;
		spine_neko_shadow.visible = false;
		fTutoTime = 0;
		iTutorialState = 2;
		break;
	case 2:	// 터치 대기..
		break;
	case 3:
		txtTutoContents.text = GetString("tuto01");
		spine_tutorial_arrow_2.visible = true;
		spine_tutorial_arrow_2.alpha = 0;
		spine_tutorial_arrow_2.rotation = 3.14 / 180 * 20;
		SpinePlay(spine_tutorial_arrow_2, iCenterSizeX - 100, iCenterSizeY + 300, "animation", 0, true);
		TweenLite.to(spine_tutorial_arrow_2, 0.5, {alpha:1, ease:Quad.easeOut});
		// TweenPlay(spine_tutorial_arrow_2, 0.5, 0, null, {alpha:1}, false, PIXI.tween.Easing.outQuad());
		iTutorialState = 4;
		break;
	case 4:
		break;
	case 5:
		txtTutoContents.text = GetString("tuto02");
		iTutorialState = 6;
		break;
	case 6:
		break;
	case 7:
		txtTutoContents.text = GetString("tuto03");
		spine_tutorial_arrow_2.rotation = 3.14 / 180 * -20;
		SpinePlay(spine_tutorial_arrow_2, iCenterSizeX + 100, iCenterSizeY + 300, "animation", 0, true);
		iTutorialState = 8;
		break;
	case 8:
		break;
	case 9:
		txtTutoContents.text = GetString("tuto04");
		iTutorialState = 10;
		break;
	case 10:
		break;
	case 11:
		txtTutoContents.text = GetString("tuto05");
		spine_tutorial_arrow_2.rotation = 3.14 / 180;
		SpinePlay(spine_tutorial_arrow_2, iCenterSizeX, iCenterSizeY + 400, "animation", 0, true);
		iTutorialState = 12;
		break;
	case 12:
		break;
	case 13:
		txtTutoContents.text = GetString("tuto06");
		iTutorialState = 14;
		break;
	case 14:
		break;
	case 15:
		txtTutoContents.text = GetString("tuto07");
		SpinePlay(spine_tutorial_arrow_2, iCenterSizeX, iCenterSizeY - 300, "animation", 0, true);
		iTutorialState = 16;
		break;
	case 16:
		break;
	case 17:
		txtTutoContents.text = GetString("tuto08");
		iTutorialState = 18;
		break;
	case 18:
		break;
	case 19:
		txtTutoContents.text = GetString("tuto09");
		spine_tutorial_arrow_2.rotation = 3.14 / 180 * -90;
		SpinePlay(spine_tutorial_arrow_2, iCenterSizeX + 200, iCenterSizeY - 400, "animation", 0, true);
		iTutorialState = 20;
		break;
	case 20:
		break;
	case 21:
		txtTutoContents.text = GetString("tuto10");
		iTutorialState = 22;
		break;
	case 22:
		break;
	case 23:
		txtTutoContents.text = GetString("tuto11");
		TweenLite.to(spine_tutorial_arrow_2, 0.5, {alpha:0, ease:Quad.easeOut, onComplete:cbTweenTargetOff});
		// TweenPlay(spine_tutorial_arrow_2, 0.5, 0, null, {alpha:0}, false, PIXI.tween.Easing.outQuad(), cbTweenTargetOff);
		iTutorialState = 24;
		break;
	case 24:
		break;
	case 25:
		sGame.removeChild(sTutorial);
		spine_neko_shadow.visible = true;
		iTutorialState = 0;
		kData.bTutorial = false;
		SaveDataInClient();
		networkManager.SaveData();
		break;
	}

	fTutoTime += deltaTime;
}

function cbButtonTuto()
{
	switch(iTutorialState)
	{
	case 2:iTutorialState = 3;break;
	case 4:iTutorialState = 5;break;
	case 6:iTutorialState = 7;break;
	case 8:iTutorialState = 9;break;
	case 10:iTutorialState = 11;break;
	case 12:iTutorialState = 13;break;
	case 14:iTutorialState = 15;break;
	case 16:iTutorialState = 17;break;
	case 18:iTutorialState = 19;break;
	case 20:iTutorialState = 21;break;
	case 22:iTutorialState = 23;break;
	case 24:iTutorialState = 25;break;
	}
}

function cbButtonTutoSkip()
{
	iTutorialState = 25;
}

function UpdateToadHP()
{
	txtToadHP.text = XNumViewString(nToadHP) + " / " + XNumViewString(clientData.nToadHPMax);

	var iA = GetVaule(nToadHP, clientData.nToadHPMax);
    var scaleX = iA/iToadHPMax;
	PIXIGraphicsResize(sprToadGaugeMask,0x000000,1, 0,-1*(sprToadGauge.height/2), sprToadGauge.width * scaleX,sprToadGauge.height/2);
	// sprToadGaugeMask.scale.set(iA/iToadHPMax, 1);
}

function cbTweenTitleOff()
{
	sTitle.visible = false;
}

// 게임 시작할때마다 초기화.
function GameSet()
{
	if(kData.bTutorial == false)
	{
		spine_neko_shadow.visible = true;
		spine_neko_shadow.alpha = 0;
		TweenLite.to(spine_neko_shadow, 0.5, {alpha:1, ease:Quad.easeOut});
		// TweenPlay(spine_neko_shadow, 0.5, 0, null, {alpha:1}, false, PIXI.tween.Easing.outQuad());
	}
}

function cbButtonWhite()
{
	// 블랙 약간 투명부분이 터치가 통과하지 않게 막아준다.
	// 여기서는 뒤쪽 터치를 막기위한 용도이므로 아무짓도 하지 않는다.
}

function cbButtonSoundBGM()
{
	if(clientData.bSoundBGM == true)
	{
		clientData.bSoundBGM = false;
		BGMSoundPause();
	}
	else
	{
		clientData.bSoundBGM = true;
		BGMSoundResume();
	}
	SaveDataInClient();
	SetSoundIcon();
}

function cbButtonSoundSE()
{
	if(clientData.bSoundSE == true)
		clientData.bSoundSE = false;
	else
		clientData.bSoundSE = true;
	SaveDataInClient();
	SetSoundIcon();
}

function SetSoundIcon()
{
	if(clientData.bSoundBGM == true)
		sprSoundBGM.texture = SpritePool.getInstance().get("bgm_on.png").texture;
	else
		sprSoundBGM.texture = SpritePool.getInstance().get("bgm_off.png").texture;

	if(clientData.bSoundSE == true)
		sprSoundSE.texture = SpritePool.getInstance().get("se_on.png").texture;
	else
		sprSoundSE.texture = SpritePool.getInstance().get("se_off.png").texture;
}

function cbButtonCheatDataInit()
{
	SESoundPlay(SE_Button);
	InitData();
}

function cbButtonCheatDebug()
{
	SESoundPlay(SE_Button);
}

function cbButtonStart(e)
{
	if(state != STATE_TITLE) return;
	if(kData.bTutorial == true)
		iTutorialState = 1;
//	this.interactive = false;
	SESoundPlay(SE_Button);
	state = STATE_GAME;
	gameState = STATE_GAME_INIT;
}

//로딩이미지를 뿌리고 나서 생각해봐야 한다.
function updateLoading()
{
	if(++iLoadingCntDelay > 8)
	{
		iLoadingCntDelay = 0;
		if(++iLoadingCnt >= 4) iLoadingCnt = 0;
		switch(iLoadingCnt)
		{
			case 0:txtLoading.text = "Loading.";break;
			case 1:txtLoading.text = "Loading..";break;
			case 2:txtLoading.text = "Loading...";break;
			case 3:txtLoading.text = "Loading....";break;
		}
	}
}

var sprLogo;

var progW_half;
var progH_half;

var kMGMenu;	// yahooIN : 추가.
function cbLogoComplete()
{
    var logoy = 440;
    var namey = 610;
    sprLogo = SpritePool.getInstance().get("Loading/movi_name.png");
    sprLogo.anchor.set(0.5, 0.5);
    sprLogo.position.set(iCenterSizeX,namey);
    sLoading.addChild(sprLogo);

    sprLogoBg = SpritePool.getInstance().get("Loading/loading_grey.png");
    sprLogoBg.anchor.set(0.5, 0.5);
    sprLogoBg.position.set(iCenterSizeX,logoy);
    sLoading.addChild(sprLogoBg);

    sprLogoProg = SpritePool.getInstance().get("Loading/loading_color.png");
    sprLogoProg.anchor.set(0.5, 0.5);
    sprLogoProg.position.set(iCenterSizeX,logoy);
    sprLogoProg.alpha=0;
    sLoading.addChild(sprLogoProg);

    sprLogoMask = new PIXI.Graphics();
    sprLogoMask.lineStyle(0);

    sprLogoProg.mask = sprLogoMask;

    progW_half = sprLogoProg.width / 2;
    progH_half = sprLogoProg.height / 2;

    sprLogoMask.beginFill(0xffffff,1);
    sprLogoMask.moveTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);

    networkManager.LoadData(function (_data) {
		// 이미지 다운로드.
        var loader = PIXI.loader;
        for(var i=0;i<tbImgGame[lang].length;++i)
            loader.add(tbImgGame[lang][i], tbImgGame[lang][i]);

        // 수리검
        // for(var i=0,imax=25;i<imax;++i){
        //     var imgName = 'Shuriken/shuriken0';
        //     if(i+1 < 10){
        //         imgName += ('0' + (i+1)) + '.png';
        //         loader.add(imgName,imgName);
        //     }else{
        //         imgName += ('' + (i+1)) + '.png';
        //         loader.add(imgName,imgName);
        //     }
        // }
        // // 쿠나이
        // for(var i=0,imax=25;i<imax;++i){
        //     var imgName = 'Kunai/kunai0';
        //     if(i+1 < 10){
        //         imgName += ('0' + (i+1)) + '.png';
        //         loader.add(imgName,imgName);
        //     }else{
        //         imgName += ('' + (i+1)) + '.png';
        //         loader.add(imgName,imgName);
        //     }
        // }

//	for(var i=0;i<tbLanguageImage[CURRENT_LANGUAGE].length;++i)
//		loader.add(tbLanguageImage[CURRENT_LANGUAGE][i], tbLanguageImage[CURRENT_LANGUAGE][i]);
        loader.add('spine_touch_ani','spine_'+lang+'/touch_ani.json');
        loader.add('spine_ad_view_btn', 'spine_'+lang+'/ad_view_btn.json');
        loader.add('spine_coin', 'spine_'+lang+'/coin.json');
        loader.add('spine_Kunai', 'spine_'+lang+'/Kunai.json');
        loader.add('spine_light_bug', 'spine_'+lang+'/light_bug.json');
        loader.add('spine_neko_character', 'spine_'+lang+'/neko_character.json');
        loader.add('spine_neko_ninja_title', 'spine_'+lang+'/neko_ninja_title.json');
        loader.add('spine_neko_shadow', 'spine_'+lang+'/neko_shadow.json');
        loader.add('spine_Shuriken', 'spine_'+lang+'/Shuriken.json');
        loader.add('spine_toad', 'spine_'+lang+'/toad.json');
        loader.add('spine_tutorial_arrow_2', 'spine_'+lang+'/tutorial_arrow_2.json');
        loader.add('spine_tutorial_popup', 'spine_'+lang+'/tutorial_popup.json');
        loader.add('spine_under_coin', 'spine_'+lang+'/under_coin.json');
        loader.add('spine_under_coin_fever', 'spine_'+lang+'/under_coin_fever.json');
        loader.add('spine_rank_up_eff', 'spine_'+lang+'/rank_up_eff.json');

        loader.add('spine_fever_btn_eff_1','spine_'+lang+'/fever_btn_eff_1.json');
        loader.add('spine_fever_btn_eff_2','spine_'+lang+'/fever_btn_eff_2.json');

        // 이미지 폰트 로드
        loader.add('shop_no-export', './fonts/shop_no-export.xml');
        loader.add('no-export', './fonts/no-export.xml');

        for(var i=0,imax = tbSoundName.length;i<imax;++i){
        	if(i<2){
                soundCtrl[i] = new Howl({
                    src: tbSoundName[i],
					loop:true
                });
			}else{
        		if(i==2){
                    soundCtrl[i] = new Howl({
                        src: tbSoundName[i],
                        volume : 0.4,
                        loop:false
                    });
				}else{
                    soundCtrl[i] = new Howl({
                        src: tbSoundName[i],
                        loop:false
                    });
				}

			}
		}

        // bgm_title = new Howl({
        	// src:
		// })

        // loader.add([{name:"BGM_Title", url:tbSoundName[1]}]);	// 사운드 로드.
        // loader.add([{name:"BGM_Game", url:tbSoundName[0]}]);	// 사운드 로드.
        loader.once('complete',cbImageDownComplete);
        loader.load();

		// yahooIN : 추가.
		// 가로세로, 타이틀, 설명, 랭킹 ['DAILY', 'TOTAL'], 픽시버젼, kData 모비포인트 변수명
/*		kMGMenu = new MGMenu(MGM_VERTICAL, GetString("MGM_Title"), GetString("MGM_Contents"), [], 4, 'iMoviPoint');
		if (_data != null)
			kMGMenu.load(_data.user_id);
		else
			kMGMenu.load("GUEST");

		if(yahooIN === undefined && bMGCHEAT == false)
			kMGMenu.HideMenu();*/
    });
	//sprLogo = SpriteLoad(sLoading, "G_Loading.png", iCenterSizeX, iCenterSizeY);

}

function cbImageDownComplete(loader, res)
{
	stage.removeChild(sLoading);
	sprLogo.destroy(false, false);
	sLoading.visible = false;
	txtLoading.destroy(true, true);
	stage.addChild(sTitle);

    GameViewSetting(res);
	//stage.addChild(kMGMenu.main);// yahooIN : 추가.
    state = STATE_TITLE;

    // 사운드 처리
    // arrBGM[BGM_Game] = PIXI.audioManager.getAudio('BGM_Game');
    // arrBGM[BGM_Title] = PIXI.audioManager.getAudio('BGM_Title');
    BGMSoundPlay(BGM_Title);

//     var loader = PIXI.loader;
// //	loader.add({name:tbSoundName[0][0], url:tbSoundName[0]});
//     for(var i=2;i<tbSoundName.length;++i)
//         loader.add({name:tbSoundName[i][0], url:tbSoundName[i]});
//     loader.load(function(){
//         for(var i=2;i<tbSoundName.length;++i)
//             arrSE[i-2] = PIXI.audioManager.getAudio(tbSoundName[i][0]);
//
//         arrSE[SE_Achievements].volume = 0.5;
//     });

    ADGameMoney();
}

// 수리검의 텍스트 및 버튼 활성화 비활성화를 담당..DSP처리..등..
function UpdateInfo()
{
	if(sprShurikenMax.visible == false)
	{
		if((kData.iMyClickDmgLevel == 75 && kData.iMyClickDmgLevelSub == 5) == false)
		{
			if(IsXMinus(kData.nMyMoney, clientData.nNextClickDmgBuyMoney) == true)
			{
				sprGoldShopShuriken.texture = SpritePool.getInstance().get("weapon_btn_1.png").texture;
				sprShurikenButton.interactive = true;
				dictionary_buttonPress['b_shuriken_touchMe'] = true;
				sprShurikenDisable.visible = false;
			}
			else
			{
				sprGoldShopShuriken.texture = SpritePool.getInstance().get("weapon_btn_2.png").texture;
				sprShurikenButton.interactive = false;
                if(spine_touchMeShuriken.visible)
                	spine_touchMeShuriken.visible = false;
                CB_ButtonUp('shuriken');
				sprShurikenDisable.visible = true;
			}
		}
		else
		{
			sprGoldShopShuriken.texture = SpritePool.getInstance().get("weapon_btn_2.png").texture;
			sprShurikenButton.interactive = false;
            CB_ButtonUp('shuriken');
			sprShurikenDisable.visible = true;
			sprShurikenMax.visible = true;
		}
	}

	if(sprKunaiMax.visible == false)
	{
		if((kData.iMySecondDmgLevel == 75 && kData.iMySecondDmgLevelSub == 5) == false)
		{
			if(IsXMinus(kData.nMyMoney, clientData.nNextSecondDmgBuyMoney) == true)
			{
				sprGoldShopKunai.texture = SpritePool.getInstance().get("weapon_btn_1.png").texture;
				sprKunaiButton.interactive = true;
                dictionary_buttonPress['b_kunai_touchMe'] = true;
				sprKunaiDisable.visible = false;
			}
			else
			{
				sprGoldShopKunai.texture = SpritePool.getInstance().get("weapon_btn_2.png").texture;
				sprKunaiButton.interactive = false;
                if(spine_touchMeKunai.visible)
                    spine_touchMeKunai.visible = false;
				CB_ButtonUp('kunai');
				sprKunaiDisable.visible = true;
			}
		}
		else
		{
			sprGoldShopKunai.texture = SpritePool.getInstance().get("weapon_btn_2.png").texture;
			sprKunaiButton.interactive = false;
            CB_ButtonUp('kunai');
			sprKunaiDisable.visible = true;
			sprKunaiMax.visible = true;
		}
	}

	// 금액 설정..
	txtMyMoney.scale.set(1);
	txtMyMoney.text = XNumViewStringComma(kData.nMyMoney);
	txtMyMoney2.text = XNumViewString(kData.nMyMoney);
	if(txtMyMoney.width > 640) // 자동으로 사이즈를 줄여준다.
		txtMyMoney.scale.set(640/txtMyMoney.width);

	SetDifficulty();

	// DPS 시스템..처리..
	fDPSTime += deltaTime;
	if(fDPSTime >= 1)
	{
		fDPSTime -= 1;
		if(fDPSTime >= 1)
			fDPSTime = 0;
		txtDPS.text = XNumViewString(nDPS) + "\nDPS";
		nDPS = [0];
	}
}

function SetDifficulty()
{
	if(nDPS.length == 1 && nDPS[0] == 0) return;

	var iA = GetVaule(nDPS, clientData.nToadHPMax);
	var iB = GetVaule(clientData.nToadHPMax, nDPS);

	if(iB/iA > 600){
        txtRebirth.text = GetString('dps_message_5');
        txtRebirth.style = ({font:'30px ' + tbTTF[lang], fill:'#fd3d3d',
            stroke:'#000000', strokeThickness:5});
	}
	else if(iB/iA > 60){
        txtRebirth.text = GetString('dps_message_4');
        txtRebirth.style = ({font:'30px ' + tbTTF[lang], fill:'#fd7d00',
            stroke:'#000000', strokeThickness:5});
	}
	else if(iB/iA > 10){
		txtRebirth.text = GetString('dps_message_3');
        txtRebirth.style = ({font:'30px ' + tbTTF[lang], fill:'#faf100',
            stroke:'#000000', strokeThickness:5});
    }
	else if(iB/iA > 1){
        txtRebirth.text = GetString('dps_message_2');
        txtRebirth.style = ({font:'30px ' + tbTTF[lang], fill:'#32d94a',
            stroke:'#000000', strokeThickness:5});
	}
	else{
        txtRebirth.text = GetString('dps_message_1');
        txtRebirth.style = ({font:'30px ' + tbTTF[lang], fill:'#c4ffcc',
                stroke:'#000000', strokeThickness:5});
	}
}

function GetVaule(nA, nB)
{
	var iA = 0;
	var iPow = nA.length-1;
	if(nB.length - nA.length > 0)
		iPow -= (nB.length - 5);
	if(iPow > 4) iPow = 4;
	if(iPow > nA.length-1) iPow = nA.length-1;
	for(var i=nA.length-1;iPow>=0;--i)
	{
		iA += nA[i] * Math.pow(10, iPow);
		iPow--;
	}

	return iA;
}

function UpdateInfo2()
{
	// 수리검 셋팅.
	txtMyClickDmg.text = XNumViewString(clientData.nMyClickDmg) + "/TAP";
	txtNextClickDmg.text = XNumViewString(clientData.nNextClickDmg) + " / TAP";
	txtGlodShopShurikenBuy.text = XNumViewString(clientData.nNextClickDmgBuyMoney);
	for(var i=0;i<5;++i)
	{
		sprGlodShopShurikenStar[i].visible = false;
		if(i < kData.iMyClickDmgLevelSub)
			sprGlodShopShurikenStar[i].visible = true;
	}
	SpinePlay(spine_GlodShopShuriken, 110, -65, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
	spine_GlodShopShuriken.skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMyClickDmgLevel-1)%25)+1, 2));
	spine_GlodShopShuriken.scale.set(0.8, 0.8);
	txtShurikenLv.text = "No." + kData.iMyClickDmgLevel;

	// 쿠나이 셋팅..
	txtMySecondDmg.text = XNumViewString(clientData.nMySecondDmg) + "/DMG";
	txtNextSecondDmg.text = XNumViewString(clientData.nNextSecondDmg) + " / DMG";
	txtGoldShopKunaiBuy.text = XNumViewString(clientData.nNextSecondDmgBuyMoney);
	for(var i=0;i<5;++i)
	{
		sprGoldShopKunaiStar[i].visible = false;
		if(i < kData.iMySecondDmgLevelSub)
			sprGoldShopKunaiStar[i].visible = true;
	}
	SpinePlay(spine_GoldShopKunai, -110, -65, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
	spine_GoldShopKunai.skeleton.setAttachment("Kunai", "Kunai0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));
	spine_GoldShopKunai.scale.set(0.8, 0.8);
	txtKunaiLv.text = "No." + kData.iMySecondDmgLevel;
}

//게임화면 구성.
function GameViewSetting(res)
{
	//========================================================================
	// 변수 초기화 : 최초 한번만 초기화 한다.
//	fItemIncreateDmg *= 100;
//	fItemBuyMoney *= 10;

	//nToadHP = XMultiply(XNumToNum(iToadBase), clientData.nToadHPIncreate);
    CalcToadHPMax();
	//========================================================================
	// 타이틀화면 구성.
	spine_neko_ninja_title = new PIXI.spine.Spine(res.spine_neko_ninja_title.spineData);
	sTitle.addChild(spine_neko_ninja_title);
	spine_neko_ninja_title.state.addListener({
		complete:function(entry){
            switch(entry.trackIndex){
                case 1:
                    SpinePlay(spine_neko_ninja_title, iCenterSizeX, iCenterSizeY, "neko_ninja_title_idle", 0, true);
                    break;
            }
		}
	});
	SpinePlay(spine_neko_ninja_title, iCenterSizeX, iCenterSizeY, "neko_ninja_title_in", 1, false);

	spr = PIXIGraphics(sTitle,0x000000,0.0);
	spr.interactive = true;
	spr.on('click', cbButtonStart);
	spr.on('tap', cbButtonStart);
	/*FontLoad(sTitle, "Copyright Ⓒ 2017 Game. All rights reserved", 360, 1250, 0.5, 0.5,
    		{font:'17px Arial', fill:'#ffffff', align:"center"}, 0);
	//========================================================================
	// 버젼관리 및 치트키..
    FontLoad(sTitle, VERSION, iCenterSizeX + 350, iCenterSizeY + 621, 1, 0.5,
        {font:'15px Arial', fill:'#A0A0FF'});*/

    /*if(networkManager.networkState != NET_STATE.RUN_SERVER){
        var txt = FontLoad(sTitle, "Save initialization", iCenterSizeX, iCenterSizeY - 620, 0.5, 0.5,
            {font:'32px Passion One', fill:'#ffffff'});
        txt.interactive = true;
        txt.on('click', cbButtonCheatDataInit);
        txt.on('tap', cbButtonCheatDataInit);
        txt.on('mouseover', scaleUp);
        txt.on('tap', scaleUp);
        txt.on('mouseout', restoreScale);
        txt.on('touchend', restoreScale);
    }*/
	//========================================================================
	// 게임화면 구성.
	SpriteLoad(sGame, "back.png", iCenterSizeX, iCenterSizeY); // 백그라운드 위쪽

    spine_light_bug = new PIXI.spine.Spine(res.spine_light_bug.spineData);
    sGame.addChild(spine_light_bug);
    SpinePlay(spine_light_bug,iCenterSizeX,iCenterSizeY,'light_bug_idle',0,true);

	txt = FontLoad(sGame, "Debug", iCenterSizeX, iCenterSizeY - 620, 0.5, 0.5,
			{font:'32px Viga', fill:'#ffffff'});
	txt.interactive = true;
	txt.on('click', cbButtonCheatDebug);
	txt.on('tap', cbButtonCheatDebug);
	txt.on('mouseover', scaleUp);
	txt.on('tap', scaleUp);
	txt.on('mouseout', restoreScale);
	txt.on('touchend', restoreScale);

	spine_under_coin = new PIXI.spine.Spine(res.spine_under_coin.spineData);
	sGame.addChild(spine_under_coin);
	spine_under_coin.state.addListener({
		complete:function(entry){
            switch(entry.trackIndex){
                case 1: // 터치후에 다음 동작 처리.
                    spineBGCoinState = 2;
                    SpinePlay(spine_under_coin, null, null, "under_coin_1_idle", 0, true, SPINE_INIT_NONE);
                    break;
                case 2:
                    spineBGCoinState = 4;
                    SpinePlay(spine_under_coin, null, null, "under_coin_2_idle", 0, true, SPINE_INIT_NONE);
                    break;
                case 3:
                    spineBGCoinState = 6;
                    SpinePlay(spine_under_coin, null, null, "under_coin_3_idle", 0, true, SPINE_INIT_NONE);
                    break;
                case 4:
                    spine_under_coin.visible = false;
                    break;
            }
		}
	});

	spine_fever_eff2 = new PIXI.spine.Spine(res.spine_fever_btn_eff_2.spineData);
    spine_fever_eff2.visible = false;

	spine_fever_eff1 = new PIXI.spine.Spine(res.spine_fever_btn_eff_1.spineData);
	spine_fever_eff1.visible = false;

	spine_under_coin_fever = new PIXI.spine.Spine(res.spine_under_coin_fever.spineData);
	sGame.addChild(spine_under_coin_fever);
	spine_under_coin_fever.state.addListener({
		complete:function(entry){
            switch(entry.trackIndex){
                case 1: // 터치후에 다음 동작 처리.
                    SpinePlay(spine_under_coin_fever, null, null, "under_coin_fever_idle", 0, true, SPINE_INIT_NONE);
                    break;
                case 2:
                    spine_under_coin_fever.visible = false;
                    break;
            }
		}
	});
	spine_under_coin_fever.visible = false;

	for(var i=0;i<iCoinCntMax;++i)
	{
		spine_coin[i] = new PIXI.spine.Spine(res.spine_coin.spineData);
		sGame.addChild(spine_coin[i]);
		SpinePlay(spine_coin[i], null, null, "coin", 0, true)
		spine_coin[i].visible = false;
	}

	spine_neko_shadow = new PIXI.spine.Spine(res.spine_neko_shadow.spineData);
	sGame.addChild(spine_neko_shadow);
	spine_neko_shadow.state.addListener({
		event:function(entry,event){
            if(spine_neko_shadow.visible == false) return;

            spine_Kunai[iKunaiCnt].visible = true;
            spine_Kunai[iKunaiCnt].skeleton.setAttachment("Kunai", "Kunai0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));
            SpinePlay(spine_Kunai[iKunaiCnt], null, null, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_idle", 0, true, SPINE_INIT_NONE);
            spine_Kunai[iKunaiCnt].position.set(-20000, 0);	// 안보이게 설정.

            if(event.data.name.search("event_left") >= 0)
            {

                spine_Kunai[iKunaiCnt].position.set(spine_neko_character.position.x-220,spine_neko_character.position.y-140);
                TweenLite.to(spine_Kunai[iKunaiCnt], 0.3, {x:spine_neko_character.position.x-220, y: iCenterSizeY - 180, ease:Cubic.easeOut, onComplete:cbTweenKunai});

                // TweenPlay(spine_Kunai[iKunaiCnt], 0.3, 0,
                //     {x:spine_neko_character.position.x-220, y: spine_neko_character.position.y-140},
                //     {x:spine_neko_character.position.x-220, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenKunai);
            }
            else// if(event.data.name.search("event_right") >= 0)
            {
                spine_Kunai[iKunaiCnt].position.set(spine_neko_character.position.x+220,spine_neko_character.position.y-140);
                TweenLite.to(spine_Kunai[iKunaiCnt], 0.3, {x:spine_neko_character.position.x+220, y: iCenterSizeY - 180, ease:Cubic.easeOut, onComplete:cbTweenKunai});

                // TweenPlay(spine_Kunai[iKunaiCnt], 0.3, 0,
                //     {x:spine_neko_character.position.x+220, y: spine_neko_character.position.y-140},
                //     {x:spine_neko_character.position.x+220, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenKunai);
            }
            if(++iKunaiCnt >= iKunaiCntMax) iKunaiCnt = 0;
		}
	});
	SpinePlay(spine_neko_shadow, iCenterSizeX, iCenterSizeY + 455, "character_attack_shadow", 0, true);
    clientData.iSkillValue[2] = iSkillVauleIncreate[2] * (kData.iSkillLv[2]+1);

	spine_neko_shadow.state.timeScale = clientData.iSkillValue[2] / 100;
	spine_neko_shadow.visible = false;
	// 초당 데미지가 있을경우 활성화 시킨다.

	spine_neko_character = new PIXI.spine.Spine(res.spine_neko_character.spineData);
	sGame.addChild(spine_neko_character);
	spine_neko_character.state.addListener({
		complete:function(entry){
            switch(entry.trackIndex){
                case 1: // 터치후에 다음 동작 처리.
                    SpinePlay(spine_neko_character, null, null, "character_idle", 0, true);
                    break;
                case 2:
                    iFeverState = 2;
                    SpinePlay(spine_neko_character, null, null, "character_fever_attack", 0, true);

                    spine_under_coin_fever.visible = true;
                    SpinePlay(spine_under_coin_fever, iCenterSizeX, iCenterSizeY + 450, "under_coin_fever_in", 1, false);
                    break;
                case 3:
                    BGMSoundPlay(BGM_Game);
                    iFeverState = 0;
                    fFeverTime = 0;
                    iFeverCnt = 0;
                    spine_neko_shadow.visible = true;
                    TweenLite.to(spine_neko_shadow, 0.1, {alpha:1, ease:Linear.easeNone})
                    // TweenPlay(spine_neko_shadow, 0.1, 0, null, {alpha:1}, false, PIXI.tween.Easing.linear());
                    sprFeverGauge.visible = true;
                    TweenLite.to(sprFeverGauge, 0.1, {alpha:1, ease:Linear.easeNone})
                    // TweenPlay(sprFeverGauge, 0.1, 0, null, {alpha:1}, false, PIXI.tween.Easing.linear());
                    SpinePlay(spine_neko_character, null, null, "character_idle", 0, true);
                    break;
            }
		},
		event:function(entry,event){
			for(var i=0,imax=4;i<imax;++i){
                spine_Shuriken[iShurikenCnt].visible = true;
                spine_Shuriken[iShurikenCnt].skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));
                SpinePlay(spine_Shuriken[iShurikenCnt], null, null, "Shuriken_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_rotation", 0, true, SPINE_INIT_NONE);
                spine_Shuriken[iShurikenCnt].position.set(-20000, 0);	// 안보이게 설정.

                var r = Math.floor(Math.random() * 600);
				spine_Shuriken[iShurikenCnt].position.set(spine_neko_character.position.x - 300 + r,spine_neko_character.position.y-140);
				TweenLite.to(spine_Shuriken[iShurikenCnt], 0.3, {x:spine_neko_character.position.x - 300 + r, y: iCenterSizeY - 180, ease:Cubic.easeIn, onComplete:cbTweenShurikenFever});

                // if(event.data.name.search("e1") >= 0)
                // {
                //     TweenPlay(spine_Shuriken[iShurikenCnt], 0.3, 0,
                //         {x:spine_neko_character.position.x - 300 + r, y: spine_neko_character.position.y-140},
                //         {x:spine_neko_character.position.x - 300 + r, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenShurikenFever);
                // }
                // else if(event.data.name.search("e2") >= 0)
                // {
                //     // spine_Shuriken[iShurikenCnt].position.set(spine_neko_character.position.x - 300 + r,spine_neko_character.position.y-140);
                //     // TweenLite.to(spine_Shuriken[iShurikenCnt].position, 0.3, {ease:Cubic.easeIn, onComplete:cbTweenShurikenFever});
                //
                //     TweenPlay(spine_Shuriken[iShurikenCnt], 0.3, 0,
                //         {x:spine_neko_character.position.x - 300 + r, y: spine_neko_character.position.y-140},
                //         {x:spine_neko_character.position.x - 300 + r, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenShurikenFever);
                // }
                // else if(event.data.name.search("e3") >= 0)
                // {
                //     TweenPlay(spine_Shuriken[iShurikenCnt], 0.3, 0,
                //         {x:spine_neko_character.position.x - 300 + r, y: spine_neko_character.position.y-140},
                //         {x:spine_neko_character.position.x - 300 + r, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenShurikenFever);
                // }
                // else// if(event.data.name.search("e4") >= 0)
                // {
                //     TweenPlay(spine_Shuriken[iShurikenCnt], 0.3, 0,
                //         {x:spine_neko_character.position.x - 300 + r, y: spine_neko_character.position.y-140},
                //         {x:spine_neko_character.position.x - 300 + r, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenShurikenFever);
                // }

                if(++iShurikenCnt >= iShurikenCntMax) iShurikenCnt = 0;
			}
		}
	});
	SpinePlay(spine_neko_character, iCenterSizeX, iCenterSizeY + 455, "character_idle", 0, true);

	// 캐릭터 게이지 설정..
	sprFeverGauge = SpriteLoad(spine_neko_character, "fever_ui.png", 0, -220);
	spr = SpriteLoad(sprFeverGauge, "fever_gauge.png", 0, 23);

	sprFeverMask = new PIXI.Graphics();
	spr.addChild(sprFeverMask);
	spr.mask = sprFeverMask;
	sprFeverMask.clear();
	sprFeverMask.beginFill(0x8bc5ff, 0.8);
    //sprFeverGauge.mask = sprFeverMask;

	sprFeverMask.moveTo(152, -50);
	sprFeverMask.lineTo(152, -50);
	sprFeverMask.lineTo(0, 200);


    spine_toad = new PIXI.spine.Spine(res.spine_toad.spineData);
    sGame.addChild(spine_toad);
    spine_toad.state.timeScale = 1;
    SpinePlay(spine_toad, iCenterSizeX, iCenterSizeY - 410, "toad_in", 1, false);
    spine_toad.state.addListener({
        complete:function(entry){
            switch(entry.trackIndex){
                case 1:
                    if(iToadState != TOAD_OUT)
                    {
                        iToadState = TOAD_IDLE;
                        spine_toad.state.timeScale = 1;
                        SpinePlay(spine_toad, null, null, "toad_idle", 0, true, SPINE_INIT_NONE);
                    }
                    break;
                case 2:
                    iToadState = TOAD_IN;
                    spine_toad.state.timeScale = 2;
                    SpinePlay(spine_toad, null, null, "toad_in", 1, false);
                    SetToadTint();
                    kData.iToadLevel++;
                    txtToadLevel.text = kData.iToadLevel.toString();
                    //clientData.nToadHPIncreate = XMultiplyEx(kData.iToadLevel,0.1);

					var calcData;

                    CalcToadHPMax();

                    UpdateToadHP();
                    SaveDataInClient();
                    networkManager.ForcedSaveData(false);
                    break;
            }
        }
    });
    iToadState = TOAD_IN;

    SetToadTint();
    sGame.addChild(spine_toad);

    SpriteLoad(sGame, "toad_hp_ui_2.png", iCenterSizeX + 30 - 160, iCenterSizeY - 184, 0, 0.5);
    sprToadGauge = SpriteLoad(sGame, "img_" +lang +"/toad_hp_gauge.png", iCenterSizeX + 30 - 155, iCenterSizeY - 185, 0, 0.5);

    sprToadGaugeMask = PIXIGraphics(sprToadGauge,0x000000,1, 0, -1*(sprToadGauge.height/2),sprToadGauge.width, sprToadGauge.height/2);
    // sprToadGaugeMask = SpriteLoad(sprToadGauge, "img_" +lang +"/toad_hp_gauge.png", 0, 0, 0, 0.5);
    sprToadGauge.mask = sprToadGaugeMask;

    txtToadHP = FontLoad(sGame, XNumViewString(nToadHP) + " / " + XNumViewString(clientData.nToadHPMax), iCenterSizeX + 30, iCenterSizeY - 185, 0.5, 0.5,
        {font:'14px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
    iToadHPMax = GetVaule(clientData.nToadHPMax, nToadHP);
    UpdateToadHP();
    spr = SpriteLoad(sGame, "toad_hp_ui_1.png", iCenterSizeX - 200, iCenterSizeY - 175, 0, 0.5);
    txtToadLevel = FontLoad(spr, kData.iToadLevel.toString(), 51, 0, 0.5, 0.5,
        {font:'28px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});

//	mask.pivot.set(0, 200);
//	mask.rotation = 10;

//	if(kData.bTutorial == true)
//		SpinePlay(spine_neko_character, iCenterSizeX, iCenterSizeY + 500, "character_attack_shadow", 0, true);
//	else
	for(var i=0;i<iKunaiCntMax;++i)
	{
		spine_Kunai.push(new PIXI.spine.Spine(res.spine_Kunai.spineData));
		spine_Kunai[i].state.addListener({
			complete:function(entry){
                switch(entry.trackIndex){
                    case 1: // 터지고 나서 사라지게 한다.
                        this.visible = false;
                        break;
                }
			}
		});
		sGame.addChild(spine_Kunai[i]);
		spine_Kunai[i].visible = false;
	}

	for(var i=0;i<iShurikenCntMax;++i)
	{
		spine_Shuriken.push(new PIXI.spine.Spine(res.spine_Shuriken.spineData));
		spine_Shuriken[i].state.addListener({
			complete:function(entry){
                switch(entry.trackIndex){
                    case 1: // 터지고 나서 사라지게 한다.
                        this.visible = false;
                        break;
                }
			}
		});
		sGame.addChild(spine_Shuriken[i]);
		spine_Shuriken[i].visible = false;
	}

	for(var i=0;i<iCashCntMax;++i)
	{
		sprCash.push(SpriteLoad(sGame, "jewel.png", iCenterSizeX, iCenterSizeY));
		sGame.addChild(sprCash[i]);
		sprCash[i].visible = false;
	}

	for(var i=0;i<iScoreCntMax;++i)
	{
		txtScore[i] = FontLoad(sGame, "0", 0, 0, 0.5, 0.5,
				{font:'32px ' + tbNumTTF, fill:'#ffffff'});
		sGame.addChild(txtScore[i]);
		txtScore[i].visible = false;
	}

	// 터치 영역 등록..버튼은 이 밑으로 등록을 시킨다.
	spr = PIXIGraphics(sGame,0x000000,0.0);
	// spr = SpriteLoad(sGame,'white.png',iCenterSizeX, iCenterSizeY);
	// spr.alpha = 0;
	// spr.scale.set(iMaxSizeX/5,iMaxSizeY/5);
	spr.interactive = true;
	spr.on('mousedown', cbButtonClickDown);
    spr.on('mouseup', cbButtonClickUp);
    spr.on('mouseupoutside', cbButtonClickUp);
    spr.on('mouseout', cbButtonClickUp);

	spr.on('touchstart', cbButtonClickDown);
	spr.on('touchend', cbButtonClickUp);
	spr.on('touchendoutside', cbButtonClickUp);

	/*
	spr = SpriteLoad(sGame, "under_btn.png", iCenterSizeX - 230, iCenterSizeY + 565);
	SpriteLoad(spr, "gold_icon.png", 0, 2);
	spr.interactive = true;
	spr.on('click', cbButtonMenuGoldShopShow);
	spr.on('tap', cbButtonMenuGoldShopShow);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);

	spr = SpriteLoad(sGame, "under_btn.png", iCenterSizeX, iCenterSizeY + 565);
	SpriteLoad(spr, "jewel_icon.png", 0, 2);
	spr.interactive = true;
	spr.on('click', cbButtonMenuGemShopShow);
	spr.on('tap', cbButtonMenuGemShopShow);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);

	spr = SpriteLoad(sGame, "under_btn.png", iCenterSizeX + 230, iCenterSizeY + 565);
	SpriteLoad(spr, "option_icon.png", 0, 2);
	spr.interactive = true;
	spr.on('click', cbButtonMenuOptionShow);
	spr.on('tap', cbButtonMenuOptionShow);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	*/
	// 오른쪽 버튼 셋팅
//	spr = SpriteLoad(sGame, "tap_btn_1.png", iCenterSizeX + 361, iCenterSizeY - 500, 1, 0.5);
	spr = SpriteLoad(sGame, "new_tap_btn_1.png", iCenterSizeX + 351, iCenterSizeY - 540, 1, 0.5);
	spr.interactive = true;
	spr.on('click', cbButtonMenuOptionShow);
	spr.on('tap', cbButtonMenuOptionShow);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
//	spr = SpriteLoad(sGame, "tap_btn_2.png", iCenterSizeX + 361, iCenterSizeY - 350, 1, 0.5);
	spr = SpriteLoad(sGame, "new_tap_btn_2.png", iCenterSizeX + 351, iCenterSizeY - 470, 1, 0.5);
	spr.interactive = true;
	spr.on('click', cbButtonMenuGoldShopShow);
	spr.on('tap', cbButtonMenuGoldShopShow);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
//	spr = SpriteLoad(sGame, "tap_btn_3.png", iCenterSizeX + 361, iCenterSizeY - 200, 1, 0.5);
	spr = SpriteLoad(sGame, "new_tap_btn_3.png", iCenterSizeX + 351, iCenterSizeY - 400, 1, 0.5);
	spr.interactive = true;
	spr.on('click', cbButtonMenuGemShopShow);
	spr.on('tap', cbButtonMenuGemShopShow);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	/*spr = SpriteLoad(sGame, 'ranking/btn_rank.png',iCenterSizeX + 351, iCenterSizeY - 330, 1,0.5);
    spr.interactive = true;
    spr.on('click', CB_ButtonMenuRanking);
    spr.on('tap', CB_ButtonMenuRanking);
    spr.on('mouseover', scaleUp);
    spr.on('tap', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);*/

    ShurikenCalc();
    KunaiCalc();

	// 수리검 셋팅.
	sprGoldShopShuriken = SpriteLoad(sGame, "weapon_btn_1.png", iCenterSizeX - 242, iCenterSizeY + 528);
	txtMyClickDmg = FontLoad(sprGoldShopShuriken, XNumViewString(clientData.nMyClickDmg) + "/TAP", -15, -50, 0.5, 0.5,
			{font:'24px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	FontLoad(sprGoldShopShuriken, GetString('level_up'), 0, 55, 0.5, 0.5,
			{font:'32px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:5});
	txtNextClickDmg = FontLoad(sprGoldShopShuriken, XNumViewString(clientData.nNextClickDmg) + " / TAP", 0, 82, 0.5, 0.5,
			{font:'20px ' + tbTTF[lang],fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	txtGlodShopShurikenBuy = FontLoad(sprGoldShopShuriken, XNumViewString(clientData.nNextClickDmgBuyMoney), 23, 12, 0.5, 0.5,
			{font:'28px ' + tbTTF[lang],fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	for(var i=0;i<5;++i)
	{
		sprGlodShopShurikenStar[i] = SpriteLoad(sprGoldShopShuriken, "weapon_star_1.png", 77 - (i*40), -92);
		sprGlodShopShurikenStar[i].visible = false;
		if(i < kData.iMyClickDmgLevelSub)
			sprGlodShopShurikenStar[i].visible = true;
	}
	spine_GlodShopShuriken = new PIXI.spine.Spine(res.spine_Shuriken.spineData);
	sprGoldShopShuriken.addChild(spine_GlodShopShuriken);
	spine_GlodShopShuriken.rotation = 3.14 / 180 * 45;
	SpinePlay(spine_GlodShopShuriken, 110, -65, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_idle", 0, true);//, SPINE_INIT_NONE);
	spine_GlodShopShuriken.skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMyClickDmgLevel-1)%25)+1, 2));
	spine_GlodShopShuriken.scale.set(0.8, 0.8);
	txtShurikenLv = FontLoad(sprGoldShopShuriken, "No." + kData.iMyClickDmgLevel, 110, -65 + 30, 0.5, 0.5,
			{font:'18px ' + tbTTF[lang],fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	sprShurikenButton = SpriteLoad(sprGoldShopShuriken, "white.png", 0, 40);
	sprShurikenButton.scale.set(210/4, 120/4);
	sprShurikenButton.tint = 0x000000;
	sprShurikenButton.alpha = 0;
	sprShurikenButton.interactive = true;
	//sprShurikenButton.on('click', cbButtonUpgradeShuriken);
	//sprShurikenButton.on('tap', cbButtonUpgradeShuriken);

	sprShurikenButton.on('mousedown',function() {CB_ButtonDown('shuriken',cbButtonUpgradeShuriken())})
		.on('touchstart',function() {CB_ButtonDown('shuriken',cbButtonUpgradeShuriken())})

		.on('mouseup',function() {CB_ButtonUp('shuriken')})
		.on('mouseout',function() {CB_ButtonUp('shuriken')})
    	.on('touchend',function() {CB_ButtonUp('shuriken')});

	sprShurikenDisable = SpriteLoad(sprGoldShopShuriken, "weapon_btn_3.png", 0, 0);
	sprShurikenDisable.visible = false;
	sprShurikenMax = SpriteLoad(sprGoldShopShuriken, "weapon_btn.png", 0, 43);
	FontLoad(sprShurikenMax, "LEVEL\nMAX", 0, 0, 0.5, 0.5,
			{font:'50px ' + tbTTF[lang], fill:'#ffffff', align:'center', stroke:'#67442f', strokeThickness:5});
	sprShurikenMax.visible = false;

	spine_touchMeShuriken = new PIXI.spine.Spine(res.spine_touch_ani.spineData);
	spine_touchMeKunai = new PIXI.spine.Spine(res.spine_touch_ani.spineData);

    sGame.addChild(spine_touchMeShuriken);
    spine_touchMeShuriken.position.set(sprGoldShopShuriken.x ,sprGoldShopShuriken.y);
    spine_touchMeShuriken.visible = false;

	// 쿠나이 셋팅..
	sprGoldShopKunai = SpriteLoad(sGame, "weapon_btn_1.png", iCenterSizeX + 242, iCenterSizeY + 528);
	txtMySecondDmg = FontLoad(sprGoldShopKunai, XNumViewString(clientData.nMySecondDmg) + "/DMG", -15, -50, 0.5, 0.5,
			{font:'24px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	FontLoad(sprGoldShopKunai, GetString('level_up'), 0, 55, 0.5, 0.5,
			{font:'32px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:5});
	txtNextSecondDmg = FontLoad(sprGoldShopKunai, XNumViewString(clientData.nNextSecondDmg) + " / DMG", 0, 82, 0.5, 0.5,
			{font:'20px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	txtGoldShopKunaiBuy = FontLoad(sprGoldShopKunai, XNumViewString(clientData.nNextSecondDmgBuyMoney), 23, 12, 0.5, 0.5,
			{font:'28px ' + tbTTF[lang],fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	for(var i=0;i<5;++i)
	{
		sprGoldShopKunaiStar[i] = SpriteLoad(sprGoldShopKunai, "weapon_star_1.png", -83 + (i*40), -92);
		sprGoldShopKunaiStar[i].visible = false;
		if(i < kData.iMySecondDmgLevelSub)
			sprGoldShopKunaiStar[i].visible = true;
	}
	spine_GoldShopKunai = new PIXI.spine.Spine(res.spine_Kunai.spineData);
	sprGoldShopKunai.addChild(spine_GoldShopKunai);
	spine_GoldShopKunai.rotation = 3.14 / 180 * 340;
	SpinePlay(spine_GoldShopKunai, -110, -65, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
	spine_GoldShopKunai.skeleton.setAttachment("Kunai", "Kunai0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));
	spine_GoldShopKunai.scale.set(0.8, 0.8);
	txtKunaiLv = FontLoad(sprGoldShopKunai, "No." + kData.iMySecondDmgLevel, -110, -65 + 30, 0.5, 0.5,
			{font:'18px ' +tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	sprKunaiButton = SpriteLoad(sprGoldShopKunai, "white.png", 0, 40);
	sprKunaiButton.scale.set(210/4, 120/4);
	sprKunaiButton.tint = 0x000000;
	sprKunaiButton.alpha = 0;
	sprKunaiButton.interactive = true;

	//sprKunaiButton.on('click', cbButtonUpgradeKunai);
	//sprKunaiButton.on('tap', cbButtonUpgradeKunai);

    sprKunaiButton.on('mousedown',function () {CB_ButtonDown('kunai',cbButtonUpgradeKunai())})
        .on('touchstart',function () {CB_ButtonDown('kunai',cbButtonUpgradeKunai())})

        .on('mouseup',function () {CB_ButtonUp('kunai')})
        .on('mouseout',function () {CB_ButtonUp('kunai')})
        .on('touchend',function () {CB_ButtonUp('kunai')});

	sprKunaiDisable = SpriteLoad(sprGoldShopKunai, "weapon_btn_3.png", 0, 0);
	sprKunaiDisable.visible = false;
	sprKunaiMax = SpriteLoad(sprGoldShopKunai, "weapon_btn.png", 0, 43);
	FontLoad(sprKunaiMax, "LEVEL\nMAX", 0, 0, 0.5, 0.5,
			{font:'50px' + tbTTF[lang], fill:'#ffffff', align:'center', stroke:'#67442f', strokeThickness:5});
	sprKunaiMax.visible = false;

    sGame.addChild(spine_touchMeKunai);
    spine_touchMeKunai.position.set(sprGoldShopKunai.x ,sprGoldShopKunai.y);
    spine_touchMeKunai.visible = false;
    //sGame.addChild(spine_neko_character);

	// DPS UI
	spr = SpriteLoad(sGame, "dps_ui.png", iCenterSizeX, iCenterSizeY + 585);
	txtDPS = FontLoad(spr, "0\nDPS", 0, 5, 0.5, 0.5,
			{font:'43px ' + tbTTF[lang], fill:'#ffffff', align:'center', stroke:'#000000', strokeThickness:4});
	//sprRebirth = SpriteLoad(spr, "message_1.png", 0, -68);
    txtRebirth = FontLoad(spr,GetString('dps_message_1'), 0, -75, 0.5, 0.5,
		{font:'30px ' + tbTTF[lang], fill:'#c4ffcc',
			stroke:'#000000', strokeThickness:5});

    sGame.addChild(spine_fever_eff2);
    spine_fever_eff2.position.set(iCenterSizeX,iCenterSizeY + 250);

    sprFeverBtn = SpriteLoad(spine_fever_eff2,'fever_btn.png', 0, 0);
    sprFeverBtn.interactive = true;
    sprFeverBtn.on('click',FeverOn);
    sprFeverBtn.on('tap',FeverOn);
    sprFeverBtn.on('mouseover', scaleUp);
    sprFeverBtn.on('tap', scaleUp);
    sprFeverBtn.on('mouseout', restoreScale);
    sprFeverBtn.on('touchend', restoreScale);

	sprFeverBtn.addChild(spine_fever_eff1);
    spine_fever_eff1.position.set(0,0);


	FontLoad(sprFeverBtn, GetString('fever_on'),0,0, 0.5,0.5,
		{font:'30px ' + tbTTF[lang], fill:'#ffd200',
			stroke:'#000000', strokeThickness:5});
    sprFeverBtn.visible = false;

	// 내 금액 최상단에 배치..
	spr = SpriteLoad(sGame, "gold_count_ui.png", iCenterSizeX, iCenterSizeY - 602);
	SpriteLoad(spr, "gold_icon.png", -320, -10);
	txtMyMoney = FontLoad(spr, XNumViewStringComma(kData.nMyMoney), 30, -5, 0.5, 0.5,
			{font:'54px ' + tbTTF[lang], fill:'#ffffff'});
	txtMyMoney2 = FontLoad(spr, XNumViewString(kData.nMyMoney), -350, 25, 0, 0.5,
			{font:'20px ' + tbTTF[lang], fill:'#ffffff', align:'left'});
/*
	spr = SpriteLoad(sBottomInfo, "jewel_bar.png", iCenterSizeX - 110, iCenterSizeY + 620 - 2);
	txtMyCash = FontLoad(spr,  XNumViewString(XNumToNum(kData.iCash)), 10, 0, 0.5, 0.5,
			{font:'20px Viga', fill:'#ffffff'});
	spr = SpriteLoad(sBottomInfo, "shuriken_bar.png", iCenterSizeX + 65, iCenterSizeY + 620 - 2);
	txtMyClickDmg = FontLoad(spr,  XNumViewString(clientData.nMyClickDmg), 20, 0, 0.5, 0.5,
			{font:'20px Viga', fill:'#ffffff'});
	spr = SpriteLoad(sBottomInfo, "kunai_bar.png", iCenterSizeX + 260, iCenterSizeY + 620 - 2);
	txtMySecondDmg = FontLoad(spr,  XNumViewString(clientData.nMySecondDmg), 20, 0, 0.5, 0.5,
			{font:'20px Viga', fill:'#ffffff'});
	sGame.addChild(sBottomInfo);
*/
	// 광고쪽 셋팅
	spine_ad_view_btn = new PIXI.spine.Spine(res.spine_ad_view_btn.spineData);
	sGame.addChild(spine_ad_view_btn);
	spine_ad_view_btn.state.addListener({
		complete:function (entry) {
            switch(entry.trackIndex){
                case 1: // 터치후에 다음 동작 처리.
                    iADState = 2;
                    SESoundPlay(SE_bonusend);
                    SpinePlay(spine_ad_view_btn, null, null, "ad_view_btn_idle", 0, true);
                    break;
            }
        }
	});

	spine_ad_view_btn.interactive = true;
	spine_ad_view_btn.on('click', cbButtonADClick);
	spine_ad_view_btn.on('tap', cbButtonADClick);
	txtADCount = FontLoad(spine_ad_view_btn, "10", 260, 0, 0.5, 0.5,
			{font:'67px ' + tbTTF[lang], fill:'#ff0000',
				stroke:'#000000', strokeThickness:5});
	txtADCount.visible = false;

	//===============================================
	// 단위돌파 구성..
    sprBreakthroughBG = SpriteLoad(sGame, 'white.png', iCenterSizeX, iCenterSizeY);
    sprBreakthroughBG.scale.set(iMaxSizeX, iMaxSizeY);
    sprBreakthroughBG.tint = 0x000000;
    sprBreakthroughBG.aplha = 0;

	txtBreakthrough = FontLoad(sGame, "123.0A", iCenterSizeX, iCenterSizeY + 1000, 0.5, 0.5,
			{font:'120px ' + tbTTF[lang], fill:'#ffff00'});
	//===============================================
	// 게인내 메뉴 골드샵 구성
    sprPopupWhite = PIXIGraphics(sGame,0x000000,0.0);
	sprPopupWhite.interactive = true;
	sprPopupWhite.on('click', cbButtonWhite);
	sprPopupWhite.on('tap', cbButtonWhite);
	sprPopupWhite.visible = false;
	/*
	SpriteLoad(sMenuGoldShop, "popup_ui_5.png", iCenterSizeX, iCenterSizeY);
	spr = SpriteLoad(sMenuGoldShop, "popup_message_box_1.png", iCenterSizeX, iCenterSizeY - 280);
	if(IsXMinus(clientData.nNextClickDmgBuyMoney, clientData.nNextSecondDmgBuyMoney) == true)
		nGoldShopAD = XMultiplyEx(clientData.nNextClickDmgBuyMoney, 0.5);
	else
		nGoldShopAD = XMultiplyEx(clientData.nNextSecondDmgBuyMoney, 0.5);
	txtGlodShopAD = FontLoad(spr, GetString("goldshopAD", "000.0AA"), -260, -7, 0, 0.5,
			{font:'30px HYB', fill:'#000000', align:"left"}, 320);
	spr2 = SpriteLoad(spr, "popup_btn_1.png", 170, -5);
	spr2.interactive = true;
	spr2.on('click', cbButtonGoldShopAD);
	spr2.on('tap', cbButtonGoldShopAD);
	spr2.on('mouseover', scaleUp);
	spr2.on('tap', scaleUp);
	spr2.on('mouseout', restoreScale);
	spr2.on('touchend', restoreScale);
	FontLoad(spr2, GetString("goldshopADBtn"), 0, 0, 0.5, 0.5,
			{font:'32px HYSANB', fill:'#ffffff', stroke:'#0070a4', strokeThickness:3});

	spr = SpriteLoad(sMenuGoldShop, "popup_message_box_3.png", iCenterSizeX, iCenterSizeY - 55);
	// 수리검 보여주기
	spine_GlodShopShuriken = new PIXI.spine.Spine(res.spine_Shuriken.spineData);
	spr.addChild(spine_GlodShopShuriken);
	spine_GlodShopShuriken.scale.set(1.5, 1.5);
	SpinePlay(spine_GlodShopShuriken, -180, -55, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
	spine_GlodShopShuriken.skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMyClickDmgLevel-1)%25)+1, 2));
	// 수리검 이름
	txtGlodShopShurikenName = FontLoad(spr, GetString("Shuriken" + kData.iMyClickDmgLevel), 80, -100, 0.5, 0.5,
			{font:'38px HYSANB', fill:'#000000', align:"left"}, 320);
	// 별표시..
	for(var i=0;i<5;++i)
	{
		sprGlodShopShurikenStar[i] = SpriteLoad(spr, "star.png", -65 + (i*70), -30);
		sprGlodShopShurikenStar[i].visible = false;

		if(i < kData.iMyClickDmgLevelSub)
			sprGlodShopShurikenStar[i].visible = true;
	}
	// 수리검 정보 표시
	txtGlodShopShurikenInfo = FontLoad(spr, XNumViewString(clientData.nMyClickDmg) + " / TAP ( Lv UP : " + XNumViewString(clientData.nNextClickDmg) + " )", 0, 40, 0.5, 0.5,
			{font:'26px HYSANB', fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	// 구매버튼 설정.
	spr2 = SpriteLoad(spr, "popup_btn_2.png", 0, 100);
	spr2.interactive = true;
	spr2.on('click', cbButtonUpgradeShuriken);
	spr2.on('tap', cbButtonUpgradeShuriken);
	spr2.on('mouseover', scaleUp);
	spr2.on('tap', scaleUp);
	spr2.on('mouseout', restoreScale);
	spr2.on('touchend', restoreScale);
	txtGlodShopShurikenBuy = FontLoad(spr2, XNumViewString(clientData.nNextClickDmgBuyMoney), 0, 0, 0.5, 0.5,
			{font:'34px HYSANB', fill:'#ffffff', stroke:'#000000', strokeThickness:4});

	spr = SpriteLoad(sMenuGoldShop, "popup_message_box_3.png", iCenterSizeX, iCenterSizeY + 255);
	// 수리검 보여주기
	spine_GlodShopKunai = new PIXI.spine.Spine(res.spine_Kunai.spineData);
	spr.addChild(spine_GlodShopKunai);
	spine_GlodShopKunai.scale.set(1.1, 1.1);
	SpinePlay(spine_GlodShopKunai, -180, -55, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
	spine_GlodShopKunai.skeleton.setAttachment("Kunai", "Kunai0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));
	// 수리검 이름
	txtGlodShopKunaiName = FontLoad(spr, GetString("Kunai" + kData.iMySecondDmgLevel), 80, -100, 0.5, 0.5,
			{font:'38px HYSANB', fill:'#000000', align:"left"}, 320);
	// 별표시..
	for(var i=0;i<5;++i)
	{
		sprGlodShopKunaiStar[i] = SpriteLoad(spr, "star.png", -65 + (i*70), -30);
		sprGlodShopKunaiStar[i].visible = false;

		if(i < kData.iMySecondDmgLevelSub)
			sprGlodShopKunaiStar[i].visible = true;
	}
	// 수리검 정보 표시
	txtGlodShopKunaiInfo = FontLoad(spr, XNumViewString(clientData.nMySecondDmg) + " / " + GetString("DMG") + "( Lv UP : " + XNumViewString(clientData.nNextSecondDmg) + " )", 0, 40, 0.5, 0.5,
			{font:'26px HYSANB', fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	// 구매버튼 설정.
	spr2 = SpriteLoad(spr, "popup_btn_2.png", 0, 100);
	spr2.interactive = true;
	spr2.on('click', cbButtonUpgradeKunai);
	spr2.on('tap', cbButtonUpgradeKunai);
	spr2.on('mouseover', scaleUp);
	spr2.on('tap', scaleUp);
	spr2.on('mouseout', restoreScale);
	spr2.on('touchend', restoreScale);
	txtGlodShopKunaiBuy = FontLoad(spr2, XNumViewString(clientData.nNextSecondDmgBuyMoney), 0, 0, 0.5, 0.5,
			{font:'34px HYSANB', fill:'#ffffff', stroke:'#000000', strokeThickness:4});

//	spr = SpriteLoad(sMenuGoldShop, "popup_ui_1_2.png", iCenterSizeX, iCenterSizeY - 425);
//	spr.interactive = true;
//	spr.on('click', cbButtonMenuGoldShopClose);
//	spr.on('tap', cbButtonMenuGoldShopClose);
//	SpriteLoad(spr, "popup_title_collection.png", -15, -30);
	sGame.addChild(sMenuGoldShop);
	sMenuGoldShop.visible = false;
	*/

	SpriteLoad(sMenuGoldShop, "popup_ui_5.png", iCenterSizeX, iCenterSizeY);
	SpriteLoad(sMenuGoldShop, "popup_title_collection.png", iCenterSizeX - 210, iCenterSizeY - 475);
	FontLoad(sMenuGoldShop, GetString('title_collection'),iCenterSizeX + 45, iCenterSizeY - 470 , 0.5,0.5,
		{ font:'60px ' + tbPopupTitleTTF[lang],align: 'center',
			fill:'#ffcc01',
			stroke:'#000000',strokeThickness:6});

	spr = SpriteLoad(sMenuGoldShop, "popup_btn.png", iCenterSizeX, iCenterSizeY + 470);
	spr.interactive = true;
	spr.on('click', cbButtonMenuGoldShopClose);
	spr.on('tap', cbButtonMenuGoldShopClose);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString('btn_close'), 0, -5, 0.5, 0.5,
			{font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});

	// 페이지 1
	spr = SpriteLoad(sMenuGoldShopPage1, "collection_popup.png", iCenterSizeX, iCenterSizeY - 10);
	spr2 = SpriteLoad(spr, "popup_count_ui.png", 20, -310);
	FontLoad(spr2, GetString('title_shuriken'), 0, 0, 0.5, 0.5,
		{font:'30px ' + tbTTF[lang],fill:'#ffffff', align:"left"});

	fontData = FontLoad(spr,GetString('popup_class_1'),-210, -245, 0.5,0.5,
		{font:'35px ' + tbTTF[lang], fill:'#f0fb78', align:'center'});
    fontData.rotation = Math.sin(-25 * Math.PI / 180);

    fontData = FontLoad(spr,GetString('popup_class_2'),-210, -45, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#f39210', align:'center'});
    fontData.rotation = Math.sin(-25 * Math.PI / 180);

    fontData = FontLoad(spr,GetString('popup_class_3'),-210, 155, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#f83902', align:'center'});
    fontData.rotation = Math.sin(-25 * Math.PI / 180);

    var floorData = [7,16];
    for(var iLevel = 0,iLevelMax = 3; iLevel<iLevelMax;++iLevel){
        var iWeaponNum = 0;

        var f_y = -235 + (iLevel*200);
        var f_x = 0;

        for(;iWeaponNum < 25;){
            var sprName = 'Shuriken/shuriken0';
            if(iWeaponNum < 9)
                sprName += '0';
            sprName += (iWeaponNum+1) + '.png';

            sprCollectionShuriken[iWeaponNum + (iLevel*25)] = SpriteLoad(spr, sprName);

            if(iLevel >= 1){
				spr_weapon_eff = SpriteLoad(sprCollectionShuriken[iWeaponNum + (iLevel*25)],'Weapon_Eff/eff_' + iLevel+ '.png',0,0);
				spr_weapon_eff.blendMode = PIXI.BLEND_MODES.ADD;
				spr_weapon_eff.alpha = 0.45;
            }

            if(iWeaponNum < floorData[0]){
                //1층
                f_x = -113 + (iWeaponNum*57);
                sprCollectionShuriken[iWeaponNum + (iLevel*25)].position.set(f_x,f_y);
            }else if(iWeaponNum >= floorData[0] && iWeaponNum < floorData[1]){
                // 2층
                f_x = -625 + (iWeaponNum*57);
                sprCollectionShuriken[iWeaponNum + (iLevel*25)].position.set(f_x,f_y + 57);
            }else{
                // 3층
                f_x = -1136 + (iWeaponNum*57);
                sprCollectionShuriken[iWeaponNum + (iLevel*25)].position.set(f_x,f_y + (57*2));
            }
            sprCollectionShuriken[iWeaponNum + (iLevel*25)].visible = false;

            iWeaponNum++;
		}

        // for(var i=0;i<7;++i)
        // {
        //     var sprName = 'Shuriken/shuriken0';
        //     if(iWeaponNum < 10)
        //         sprName += '0';
        //     sprName += iWeaponNum + '.png';
        //     sprCollectionShuriken[i + (iLevel*25)] = SpriteLoad(spr, sprName, -113 + (i*57), f_y);
        //     sprCollectionShuriken[i + (iLevel*25)].visible = false;
        //     iWeaponNum++;
        // }
        //
        // f_y += 57;
        // for(var i=0;i<9;++i)
        // {
        //     var sprName = 'Shuriken/shuriken0';
        //     if(iWeaponNum < 10)
        //         sprName += '0';
        //     sprName += iWeaponNum + '.png';
        //     sprCollectionShuriken[i+7 + (iLevel*25)] = SpriteLoad(spr, sprName, -227 + (i*57), f_y);
        //     sprCollectionShuriken[i+7+ (iLevel*25)].visible = false;
        //     iWeaponNum++;
        // }
        //
        // f_y += 57;
        // for(var i=0;i<9;++i)
        // {
        //     var sprName = 'Shuriken/shuriken0';
        //     if(iWeaponNum < 10)
        //         sprName += '0';
        //     sprName += iWeaponNum + '.png';
        //     sprCollectionShuriken[i+16+ (iLevel*25)] = SpriteLoad(spr, sprName, -227 + (i*57), f_y);
        //     sprCollectionShuriken[i+16+ (iLevel*25)].visible = false;
        //     iWeaponNum++;
        // }
	}
    //
    //
    // var iWeaponNum = 1;
    //
	// for(var i=0;i<7;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i] = SpriteLoad(spr, sprName, -113 + (i*57), -235);
	// 	sprCollectionShuriken[i].visible = false;
     //    iWeaponNum++;
	// }
	// for(var i=0;i<9;++i)
	// {
	// 	var sprName = 'Shuriken/shuriken0';
	// 	if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+7] = SpriteLoad(spr, sprName, -227 + (i*57), -235 + 57);
	// 	sprCollectionShuriken[i+7].visible = false;
     //    iWeaponNum++;
	// }
	// for(var i=0;i<9;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+16] = SpriteLoad(spr, sprName, -227 + (i*57), -235 + 57 + 57);
	// 	sprCollectionShuriken[i+16].visible = false;
     //    iWeaponNum++;
	// }
    //
    // iWeaponNum = 1;
    //
	// for(var i=0;i<7;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+25] = SpriteLoad(spr, sprName, -113 + (i*57), -35);
	// 	sprCollectionShuriken[i+25].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+32] = SpriteLoad(spr, sprName, -227 + (i*57), -35 + 57);
	// 	sprCollectionShuriken[i+32].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+41] = SpriteLoad(spr, sprName, -227 + (i*57), -35 + 57 + 57);
	// 	sprCollectionShuriken[i+41].visible = false;
	// }
    //
    // iWeaponNum = 1;
    //
	// for(var i=0;i<7;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+50] = SpriteLoad(spr, sprName, -113 + (i*57), 165);
	// 	sprCollectionShuriken[i+50].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+57] = SpriteLoad(spr, sprName, -227 + (i*57), 165 + 57);
	// 	sprCollectionShuriken[i+57].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
     //    var sprName = 'Shuriken/shuriken0';
     //    if(iWeaponNum < 10)
     //        sprName += '0';
     //    sprName += iWeaponNum + '.png';
	// 	sprCollectionShuriken[i+66] = SpriteLoad(spr, sprName, -227 + (i*57), 165 + 57 + 57);
	// 	sprCollectionShuriken[i+66].visible = false;
	// }

	// Page셋팅..
	FontLoad(sMenuGoldShopPage1, "1 / 2", iCenterSizeX, iCenterSizeY + 380, 0.5, 0.5,
			{font:'60px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	spr = SpriteLoad(sMenuGoldShopPage1, "popup_arrow_2.png", iCenterSizeX + 120, iCenterSizeY + 375);
	spr.interactive = true;
	spr.on('click', cbButtonGoldShopRight);
	spr.on('tap', cbButtonGoldShopRight);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);

	// 페이지 2
	spr = SpriteLoad(sMenuGoldShopPage2, "collection_popup.png", iCenterSizeX, iCenterSizeY - 10);
	spr2 = SpriteLoad(spr, "popup_count_ui.png", 20, -310);
	FontLoad(spr2, GetString('title_kunai'), 0, 0, 0.5, 0.5,
			{font:'30px ' + tbTTF[lang], fill:'#ffffff', align:"left"});

    fontData = FontLoad(spr,GetString('popup_class_1'),-210, -245, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#f0fb78', align:'center'});
    fontData.rotation = Math.sin(-25 * Math.PI / 180);

    fontData = FontLoad(spr,GetString('popup_class_2'),-210, -45, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#f39210', align:'center'});
    fontData.rotation = Math.sin(-25 * Math.PI / 180);

    fontData = FontLoad(spr,GetString('popup_class_3'),-210, 155, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#f83902', align:'center'});
    fontData.rotation = Math.sin(-25 * Math.PI / 180);

    for(var iLevel = 0,iLevelMax = 3; iLevel<iLevelMax;++iLevel) {
        var iWeaponNum = 0;

        var f_y = -235 + (iLevel * 200);
        var f_x = 0;

        for (; iWeaponNum < 25;) {
            var sprName = 'Kunai/kunai0';
            if (iWeaponNum < 9)
                sprName += '0';
            sprName += (iWeaponNum + 1) + '.png';

            sprCollectionKunai[iWeaponNum + (iLevel * 25)] = SpriteLoad(spr, sprName);

            if(iLevel >= 1){
                spr_weapon_eff = SpriteLoad(sprCollectionKunai[iWeaponNum + (iLevel*25)],'Weapon_Eff/eff_' + iLevel+ '.png',0,0);
                spr_weapon_eff.blendMode = PIXI.BLEND_MODES.ADD;
                spr_weapon_eff.alpha = 0.45;
            }

            if (iWeaponNum < floorData[0]) {
                //1층
                f_x = -113 + (iWeaponNum * 57);
                sprCollectionKunai[iWeaponNum + (iLevel * 25)].position.set(f_x, f_y);
            } else if (iWeaponNum >= floorData[0] && iWeaponNum < floorData[1]) {
                // 2층
                f_x = -625 + (iWeaponNum * 57);
                sprCollectionKunai[iWeaponNum + (iLevel * 25)].position.set(f_x, f_y + 57);
            } else {
                // 3층
                f_x = -1136 + (iWeaponNum * 57);
                sprCollectionKunai[iWeaponNum + (iLevel * 25)].position.set(f_x, f_y + (57 * 2));
            }

            sprCollectionKunai[iWeaponNum + (iLevel * 25)].visible = false;

            iWeaponNum++;
        }
    }
	// for(var i=0;i<7;++i)
	// {
	// 	sprCollectionKunai[i] = SpriteLoad(spr, "neko_foot_print.png", -113 + (i*57), -235);
	// 	sprCollectionKunai[i].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
	// 	sprCollectionKunai[i+7] = SpriteLoad(spr, "neko_foot_print.png", -227 + (i*57), -235 + 57);
	// 	sprCollectionKunai[i+7].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
	// 	sprCollectionKunai[i+16] = SpriteLoad(spr, "neko_foot_print.png", -227 + (i*57), -235 + 57 + 57);
	// 	sprCollectionKunai[i+16].visible = false;
	// }
	// for(var i=0;i<7;++i)
	// {
	// 	sprCollectionKunai[i+25] = SpriteLoad(spr, "neko_foot_print.png", -113 + (i*57), -35);
	// 	sprCollectionKunai[i+25].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
	// 	sprCollectionKunai[i+32] = SpriteLoad(spr, "neko_foot_print.png", -227 + (i*57), -35 + 57);
	// 	sprCollectionKunai[i+32].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
	// 	sprCollectionKunai[i+41] = SpriteLoad(spr, "neko_foot_print.png", -227 + (i*57), -35 + 57 + 57);
	// 	sprCollectionKunai[i+41].visible = false;
	// }
	// for(var i=0;i<7;++i)
	// {
	// 	sprCollectionKunai[i+50] = SpriteLoad(spr, "neko_foot_print.png", -113 + (i*57), 165);
	// 	sprCollectionKunai[i+50].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
	// 	sprCollectionKunai[i+57] = SpriteLoad(spr, "neko_foot_print.png", -227 + (i*57), 165 + 57);
	// 	sprCollectionKunai[i+57].visible = false;
	// }
	// for(var i=0;i<9;++i)
	// {
	// 	sprCollectionKunai[i+66] = SpriteLoad(spr, "neko_foot_print.png", -227 + (i*57), 165 + 57 + 57);
	// 	sprCollectionKunai[i+66].visible = false;
	// }

	// 페이지 설정
	FontLoad(sMenuGoldShopPage2, "2 / 2", iCenterSizeX, iCenterSizeY + 380, 0.5, 0.5,
        {font:'60px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	spr = SpriteLoad(sMenuGoldShopPage2, "popup_arrow.png", iCenterSizeX - 120, iCenterSizeY + 375);
	spr.interactive = true;
	spr.on('click', cbButtonGoldShopLeft);
	spr.on('tap', cbButtonGoldShopLeft);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);

	sMenuGoldShop.addChild(sMenuGoldShopPage1);
	sMenuGoldShop.addChild(sMenuGoldShopPage2);
	sMenuGoldShopPage2.visible = false;
	sGame.addChild(sMenuGoldShop);
	sMenuGoldShop.visible = false;

	//===============================================
	// 업그레이드 팝업 구성..
	SpriteLoad(sMenuGemShop, "popup_ui_5.png", iCenterSizeX, iCenterSizeY);
	SpriteLoad(sMenuGemShop, "popup_title_upgrade.png", iCenterSizeX - 180, iCenterSizeY - 475);
    FontLoad(sMenuGemShop, GetString('title_upgrade'),iCenterSizeX + 45, iCenterSizeY - 470 , 0.5,0.5,
        {font:'60px ' + tbPopupTitleTTF[lang], align: 'center',
            fill:'#ffcc01',
            stroke:'#000000',strokeThickness:6});

	spr = SpriteLoad(sMenuGemShop, "popup_btn.png", iCenterSizeX, iCenterSizeY + 470);
	spr.interactive = true;
	spr.on('click', cbButtonMenuGemShopClose);
	spr.on('tap', cbButtonMenuGemShopClose);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString('btn_close'), 0, -5, 0.5, 0.5,
			{font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});

	spr = SpriteLoad(sMenuGemShop, "popup_count_ui.png", iCenterSizeX + 10, iCenterSizeY - 360);
	SpriteLoad(spr, "popup_count_jewel.png", -85, 0);
	txtMyCash = FontLoad(spr,  XNumViewString(XNumToNum(kData.iCash)), 10, 5, 0.5, 0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff'});
	/*spr = SpriteLoad(spr, 'btn_plus.png', 85,0);
	spr.interactive = true;
	spr.on('click', function () {networkManager.GetShoplist(ShopType.GAMEMONEY, CB_CashChargePopup);});
    spr.on('tap', function () {networkManager.GetShoplist(ShopType.GAMEMONEY, CB_CashChargePopup);});
    spr.on('mouseover', scaleUp);
    spr.on('tap', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);*/

	// 페이지 1
	spr = SpriteLoad(sMenuGemShopPage1, "popup_message_box_1.png", iCenterSizeX, iCenterSizeY - 250);
	FontLoad(spr, GetString("gemshopRebirth"), -260, -7, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	spr2 = SpriteLoad(spr, "popup_btn_1.png", 170, -5);
	spr2.interactive = true;
	spr2.on('click', cbButtonGemShopRebirth);
	spr2.on('tap', cbButtonGemShopRebirth);
	spr2.on('mouseover', scaleUp);
	spr2.on('tap', scaleUp);
	spr2.on('mouseout', restoreScale);
	spr2.on('touchend', restoreScale);
	FontLoad(spr2, GetString("gemshopRebirthBtn"), 0, 0, 0.5, 0.5,
        {font:'32px ' + tbTTF[lang], fill:'#ffffff', stroke:'#0070a4', strokeThickness:4});
	// skill 0
	spr = SpriteLoad(sMenuGemShopPage1, "popup_message_box_2.png", iCenterSizeX, iCenterSizeY - 80);
	FontLoad(spr, GetString("gemshopM0"), -260, -40, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	txtGemShopCurrentLv[0] = FontLoad(spr, "Lv " + kData.iSkillLv[0] + " : " + clientData.iSkillValue[0] + "%", -260, 10, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtGemShopNextLv[0] = FontLoad(spr, "Lv UP : +" + ((Math.floor((kData.iSkillLv[0] + 1)/iSkillVauleLv0Division)+1)*iSkillVauleIncreate[0]) + "%", -260, 40, 0, 0.5,
        {font:'33px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	sprGemShopBtn[0] = SpriteLoad(spr, "popup_btn_3.png", 170, -3);
	sprGemShopBtnDis[0] = SpriteLoad(spr, "popup_btn_3_dark.png", 170, -5);
	sprGemShopBtnDis[0].visible = false;
	if(kData.iSkillLv[0] < iSkillLvMax[0])
	{
		sprGemShopBtn[0].interactive = true;
		//sprGemShopBtn[0].on('click', cbButtonGemShopBuy0);
		//sprGemShopBtn[0].on('tap', cbButtonGemShopBuy0);

        sprGemShopBtn[0].on('mousedown',function () {CB_ButtonDown('gemshop_shuriken_damage',cbButtonGemShopBuy0())})
            .on('touchstart',function () {CB_ButtonDown('gemshop_shuriken_damage',cbButtonGemShopBuy0())})

            .on('mouseup',function(){CB_ButtonUp('gemshop_shuriken_damage')})
            .on('mouseout',function(){CB_ButtonUp('gemshop_shuriken_damage')})
            .on('touchend',function(){CB_ButtonUp('gemshop_shuriken_damage')});

		sprGemShopBtn[0].on('mouseover', scaleUp);
		sprGemShopBtn[0].on('tap', scaleUp);
		sprGemShopBtn[0].on('mouseout', restoreScale);
		sprGemShopBtn[0].on('touchend', restoreScale);

		sprGemShopBuy[0] = SpriteLoad(sprGemShopBtn[0], "popup_btn_3_add.png", 0, -30);
		SpriteLoad(sprGemShopBuy[0], "popup_btn_jewel.png", -43, 0);
		txtGemShopBuy[0] = FontLoad(sprGemShopBuy[0], XNumViewString(XNumToNum((kData.iSkillLv[0] + 1) * iSkillCashBase[0])), 26, 0, 0.5, 0.5,
            {font:'25px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
		txtGemShopBtn[0] = FontLoad(sprGemShopBtn[0], GetString("LvUP"), 0, 28, 0.5, 0.5,
            {font:'30px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	else
	{
		sprGemShopBtn[0].interactive = false;
        CB_ButtonUp('gemshop_shuriken_damage');
		txtGemShopBtn[0] = FontLoad(sprGemShopBtn[0], GetString("MAX"), 0, 0, 0.5, 0.5,
            {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	// skill 1
	spr = SpriteLoad(sMenuGemShopPage1, "popup_message_box_2.png", iCenterSizeX, iCenterSizeY + 85);
	FontLoad(spr, GetString("gemshopM1"), -260, -40, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	txtGemShopCurrentLv[1] = FontLoad(spr, "Lv " + kData.iSkillLv[1] + " : " + clientData.iSkillValue[1] + "%", -260, 10, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtGemShopNextLv[1] = FontLoad(spr, "Lv UP : +" + ((Math.floor((kData.iSkillLv[1] + 1)/iSkillVauleLv0Division)+1)*iSkillVauleIncreate[1]) + "%", -260, 40, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	sprGemShopBtn[1] = SpriteLoad(spr, "popup_btn_3.png", 170, -3);
	sprGemShopBtnDis[1] = SpriteLoad(spr, "popup_btn_3_dark.png", 170, -5);
	sprGemShopBtnDis[1].visible = false;
	if(kData.iSkillLv[1] < iSkillLvMax[1])
	{
		sprGemShopBtn[1].interactive = true;
		//sprGemShopBtn[1].on('click', cbButtonGemShopBuy1);
		//sprGemShopBtn[1].on('tap', cbButtonGemShopBuy1);
        sprGemShopBtn[1].on('mousedown',function () {CB_ButtonDown('gemshop_kunai_damage',cbButtonGemShopBuy1())})
            .on('touchstart',function () {CB_ButtonDown('gemshop_kunai_damage',cbButtonGemShopBuy1())})

            .on('mouseup',function () {CB_ButtonUp('gemshop_kunai_damage')})
            .on('mouseout',function () {CB_ButtonUp('gemshop_kunai_damage')})
            .on('touchend',function () {CB_ButtonUp('gemshop_kunai_damage')});

		sprGemShopBtn[1].on('mouseover', scaleUp);
		sprGemShopBtn[1].on('tap', scaleUp);
		sprGemShopBtn[1].on('mouseout', restoreScale);
		sprGemShopBtn[1].on('touchend', restoreScale);
		sprGemShopBuy[1] = SpriteLoad(sprGemShopBtn[1], "popup_btn_3_add.png", 0, -30);
		SpriteLoad(sprGemShopBuy[1], "popup_btn_jewel.png", -43, 0);
		txtGemShopBuy[1] = FontLoad(sprGemShopBuy[1], XNumViewString(XNumToNum((kData.iSkillLv[1] + 1) * iSkillCashBase[1])), 26, 0, 0.5, 0.5,
            {font:'25px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
		txtGemShopBtn[1] = FontLoad(sprGemShopBtn[1], GetString("LvUP"), 0, 28, 0.5, 0.5,
            {font:'30px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	else
	{
		sprGemShopBtn[1].interactive = false;
        CB_ButtonUp('gemshop_kunai_damage');
		txtGemShopBtn[1] = FontLoad(sprGemShopBtn[1], GetString("MAX"), 0, 0, 0.5, 0.5,
            {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	// skill 2
	spr = SpriteLoad(sMenuGemShopPage1, "popup_message_box_2.png", iCenterSizeX, iCenterSizeY + 250);
	FontLoad(spr, GetString("gemshopM2"), -260, -40, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	txtGemShopCurrentLv[2] = FontLoad(spr, "Lv " + kData.iSkillLv[2] + " : " + clientData.iSkillValue[2] + "%", -260, 10, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtGemShopNextLv[2] = FontLoad(spr, "Lv UP : +" + iSkillVauleIncreate[2] + "%", -260, 40, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	sprGemShopBtn[2] = SpriteLoad(spr, "popup_btn_3.png", 170, -3);
	sprGemShopBtnDis[2] = SpriteLoad(spr, "popup_btn_3_dark.png", 170, -5);
	sprGemShopBtnDis[2].visible = false;
	if(kData.iSkillLv[2] < iSkillLvMax[2])
	{
		sprGemShopBtn[2].interactive = true;
		//sprGemShopBtn[2].on('click', cbButtonGemShopBuy2);
		//sprGemShopBtn[2].on('tap', cbButtonGemShopBuy2);
        sprGemShopBtn[2].on('mousedown',function () {CB_ButtonDown('gemshop_shadow_speed',cbButtonGemShopBuy2())})
            .on('touchstart',function () {CB_ButtonDown('gemshop_shadow_speed',cbButtonGemShopBuy2())})

            .on('mouseup',function () {CB_ButtonUp('gemshop_shadow_speed')})
            .on('mouseout',function () {CB_ButtonUp('gemshop_shadow_speed')})
            .on('touchend',function () {CB_ButtonUp('gemshop_shadow_speed')});


		sprGemShopBtn[2].on('mouseover', scaleUp);
		sprGemShopBtn[2].on('tap', scaleUp);
		sprGemShopBtn[2].on('mouseout', restoreScale);
		sprGemShopBtn[2].on('touchend', restoreScale);
		sprGemShopBuy[2] = SpriteLoad(sprGemShopBtn[2], "popup_btn_3_add.png", 0, -30);
		SpriteLoad(sprGemShopBuy[2], "popup_btn_jewel.png", -43, 0);
		txtGemShopBuy[2] = FontLoad(sprGemShopBuy[2], XNumViewString(XNumToNum(Math.pow(10,kData.iSkillLv[2]) * iSkillCashBase[2])), 26, 0, 0.5, 0.5,
            {font:'25px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
		txtGemShopBtn[2] = FontLoad(sprGemShopBtn[2], GetString("LvUP"), 0, 28, 0.5, 0.5,
            {font:'30px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	else
	{
		sprGemShopBtn[2].interactive = false;
        CB_ButtonUp('gemshop_shadow_speed');
		txtGemShopBtn[2] = FontLoad(sprGemShopBtn[2], GetString("MAX"), 0, 0, 0.5, 0.5,
            {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	// Page셋팅..
	FontLoad(sMenuGemShopPage1, "1 / 2", iCenterSizeX, iCenterSizeY + 380, 0.5, 0.5,
        {font:'60px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	spr = SpriteLoad(sMenuGemShopPage1, "popup_arrow_2.png", iCenterSizeX + 120, iCenterSizeY + 375);
	spr.interactive = true;
	spr.on('click', cbButtonGemShopRight);
	spr.on('tap', cbButtonGemShopRight);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);

	// 페이지 2
	// skill 3
	spr = SpriteLoad(sMenuGemShopPage2, "popup_message_box_2.png", iCenterSizeX, iCenterSizeY - 245);
	FontLoad(spr, GetString("gemshopM3"), -260, -40, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	txtGemShopCurrentLv[3] = FontLoad(spr, "Lv " + kData.iSkillLv[3] + " : " + clientData.iSkillValue[3] + "%", -260, 10, 0, 0.5,
        {font:'23px ' + tbTTF[lang] ,fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtGemShopNextLv[3] = FontLoad(spr, "Lv UP : +" + iSkillVauleIncreate[3] + "%", -260, 40, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	sprGemShopBtn[3] = SpriteLoad(spr, "popup_btn_3.png", 170, -3);
	sprGemShopBtnDis[3] = SpriteLoad(spr, "popup_btn_3_dark.png", 170, -5);
	sprGemShopBtnDis[3].visible = false;
	if(kData.iSkillLv[3] < iSkillLvMax[3])
	{
		sprGemShopBtn[3].interactive = true;
		//sprGemShopBtn[3].on('click', cbButtonGemShopBuy3);
		//sprGemShopBtn[3].on('tap', cbButtonGemShopBuy3);
        sprGemShopBtn[3].on('mousedown',function () {CB_ButtonDown('gemshop_shuriken_critical_damage',cbButtonGemShopBuy3())})
            .on('touchstart',function () {CB_ButtonDown('gemshop_shuriken_critical_damage',cbButtonGemShopBuy3())})

            .on('mouseup',function () {CB_ButtonUp('gemshop_shuriken_critical_damage')})
            .on('mouseout',function () {CB_ButtonUp('gemshop_shuriken_critical_damage')})
            .on('touchend',function () {CB_ButtonUp('gemshop_shuriken_critical_damage')});

		sprGemShopBtn[3].on('mouseover', scaleUp);
		sprGemShopBtn[3].on('tap', scaleUp);
		sprGemShopBtn[3].on('mouseout', restoreScale);
		sprGemShopBtn[3].on('touchend', restoreScale);
		sprGemShopBuy[3] = SpriteLoad(sprGemShopBtn[3], "popup_btn_3_add.png", 0, -30);
		SpriteLoad(sprGemShopBuy[3], "popup_btn_jewel.png", -43, 0);
		txtGemShopBuy[3] = FontLoad(sprGemShopBuy[3], XNumViewString(XNumToNum((kData.iSkillLv[3] + 1) * iSkillCashBase[3])), 26, 0, 0.5, 0.5,
			{font:'25px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
		txtGemShopBtn[3] = FontLoad(sprGemShopBtn[3], GetString("LvUP"), 0, 28, 0.5, 0.5,
            {font:'30px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	else
	{
		sprGemShopBtn[3].interactive = false;
        CB_ButtonUp('gemshop_shuriken_critical_damage');
		txtGemShopBtn[3] = FontLoad(sprGemShopBtn[3], GetString("MAX"), 0, 0, 0.5, 0.5,
            {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	// skill 4
	spr = SpriteLoad(sMenuGemShopPage2, "popup_message_box_2.png", iCenterSizeX, iCenterSizeY - 80);
	FontLoad(spr, GetString("gemshopM4"), -260, -40, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	txtGemShopCurrentLv[4] = FontLoad(spr, "Lv " + kData.iSkillLv[4] + " : " + clientData.iSkillValue[4] + "%", -260, 10, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtGemShopNextLv[4] = FontLoad(spr, "Lv UP : +" + iSkillVauleIncreate[4] + "%", -260, 40, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	sprGemShopBtn[4] = SpriteLoad(spr, "popup_btn_3.png", 170, -3);
	sprGemShopBtnDis[4] = SpriteLoad(spr, "popup_btn_3_dark.png", 170, -5);
	sprGemShopBtnDis[4].visible = false;
	if(kData.iSkillLv[4] < iSkillLvMax[4])
	{
		sprGemShopBtn[4].interactive = true;
		//sprGemShopBtn[4].on('click', cbButtonGemShopBuy4);
		//sprGemShopBtn[4].on('tap', cbButtonGemShopBuy4);
        sprGemShopBtn[4].on('mousedown',function () {CB_ButtonDown('gemshop_shuriken_critical_percent',cbButtonGemShopBuy4())})
            .on('touchstart',function () {CB_ButtonDown('gemshop_shuriken_critical_percent',cbButtonGemShopBuy4())})

            .on('mouseup',function () {CB_ButtonUp('gemshop_shuriken_critical_percent')})
            .on('mouseout',function () {CB_ButtonUp('gemshop_shuriken_critical_percent')})
            .on('touchend',function () {CB_ButtonUp('gemshop_shuriken_critical_percent')})

		sprGemShopBtn[4].on('mouseover', scaleUp);
		sprGemShopBtn[4].on('tap', scaleUp);
		sprGemShopBtn[4].on('mouseout', restoreScale);
		sprGemShopBtn[4].on('touchend', restoreScale);
		sprGemShopBuy[4] = SpriteLoad(sprGemShopBtn[4], "popup_btn_3_add.png", 0, -30);
		SpriteLoad(sprGemShopBuy[4], "popup_btn_jewel.png", -43, 0);
		txtGemShopBuy[4] = FontLoad(sprGemShopBuy[4], XNumViewString(XNumToNum((kData.iSkillLv[4] + 1) * iSkillCashBase[4])), 26, 0, 0.5, 0.5,
            {font:'25px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
		txtGemShopBtn[4] = FontLoad(sprGemShopBtn[4], GetString("LvUP"), 0, 28, 0.5, 0.5,
            {font:'30px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	else
	{
		sprGemShopBtn[4].interactive = false;
        CB_ButtonUp('gemshop_shuriken_critical_percent');
		txtGemShopBtn[4] = FontLoad(sprGemShopBtn[4], GetString("MAX"), 0, 0, 0.5, 0.5,
            {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	// skill 5
	spr = SpriteLoad(sMenuGemShopPage2, "popup_message_box_2.png", iCenterSizeX, iCenterSizeY + 85);
	FontLoad(spr, GetString("gemshopM5"), -260, -40, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	txtGemShopCurrentLv[5] = FontLoad(spr, "Lv " + kData.iSkillLv[5] + " : " +GetString("TAP") + " DMG * " + clientData.iSkillValue[5], -260, 10, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtGemShopNextLv[5] = FontLoad(spr, "Lv UP : +" + iSkillVauleIncreate[5], -260, 40, 0, 0.5,
        {font:'23px ' + tbTTF[lang] , fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	sprGemShopBtn[5] = SpriteLoad(spr, "popup_btn_3.png", 170, -3);
	sprGemShopBtnDis[5] = SpriteLoad(spr, "popup_btn_3_dark.png", 170, -5);
	sprGemShopBtnDis[5].visible = false;
	if(kData.iSkillLv[5] < iSkillLvMax[5])
	{
		sprGemShopBtn[5].interactive = true;
		//sprGemShopBtn[5].on('click', cbButtonGemShopBuy5);
		//sprGemShopBtn[5].on('tap', cbButtonGemShopBuy5);
        sprGemShopBtn[5].on('mousedown',function () {CB_ButtonDown('gemshop_fever_damage',cbButtonGemShopBuy5())})
            .on('touchstart',function () {CB_ButtonDown('gemshop_fever_damage',cbButtonGemShopBuy5())})

            .on('mouseup',function () {CB_ButtonUp('gemshop_fever_damage')})
            .on('mouseout',function () {CB_ButtonUp('gemshop_fever_damage')})
            .on('touchend',function () {CB_ButtonUp('gemshop_fever_damage')});

		//sprGemShopBtn[5].on('mouseover', scaleUp);
		//sprGemShopBtn[5].on('tap', scaleUp);
		//sprGemShopBtn[5].on('mouseout', restoreScale);
		//sprGemShopBtn[5].on('touchend', restoreScale);
		sprGemShopBuy[5] = SpriteLoad(sprGemShopBtn[5], "popup_btn_3_add.png", 0, -30);
		SpriteLoad(sprGemShopBuy[5], "popup_btn_jewel.png", -43, 0);
		txtGemShopBuy[5] = FontLoad(sprGemShopBuy[5], XNumViewString(XNumToNum((kData.iSkillLv[5] + 1) * iSkillCashBase[5])), 26, 0, 0.5, 0.5,
            {font:'25px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
		txtGemShopBtn[5] = FontLoad(sprGemShopBtn[5], GetString("LvUP"), 0, 28, 0.5, 0.5,
            {font:'30px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	else
	{
		sprGemShopBtn[5].interactive = false;
        CB_ButtonUp('gemshop_fever_damage');
		txtGemShopBtn[5] = FontLoad(sprGemShopBtn[5], GetString("MAX"), 0, 0, 0.5, 0.5,
            {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	// skill 6
	spr = SpriteLoad(sMenuGemShopPage2, "popup_message_box_2.png", iCenterSizeX, iCenterSizeY + 250);
	FontLoad(spr, GetString("gemshopM6"), -260, -40, 0, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"left"});
	txtGemShopCurrentLv[6] = FontLoad(spr, "Lv " + kData.iSkillLv[6] + " : " + clientData.iSkillValue[6] + " " + GetString("TAP"), -260, 10, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtGemShopNextLv[6] = FontLoad(spr, "Lv UP : -" + iSkillVauleIncreate[6] + " " + GetString("TAP"), -260, 40, 0, 0.5,
        {font:'23px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	sprGemShopBtn[6] = SpriteLoad(spr, "popup_btn_3.png", 170, -3);
	sprGemShopBtnDis[6] = SpriteLoad(spr, "popup_btn_3_dark.png", 170, -5);
	sprGemShopBtnDis[6].visible = false;
	if(kData.iSkillLv[6] < iSkillLvMax[6])
	{
		sprGemShopBtn[6].interactive = true;
		//sprGemShopBtn[6].on('click', cbButtonGemShopBuy6);
		//sprGemShopBtn[6].on('tap', cbButtonGemShopBuy6);

        sprGemShopBtn[6].on('mousedown',function () {CB_ButtonDown('gemshop_fever_gage',cbButtonGemShopBuy6())})
            .on('touchstart',function () {CB_ButtonDown('gemshop_fever_gage',cbButtonGemShopBuy6())})

            .on('mouseup',function () {CB_ButtonUp('gemshop_fever_gage')})
            .on('mouseout',function () {CB_ButtonUp('gemshop_fever_gage')})
            .on('touchend',function () {CB_ButtonUp('gemshop_fever_gage')});

		sprGemShopBtn[6].on('mouseover', scaleUp);
		sprGemShopBtn[6].on('tap', scaleUp);
		sprGemShopBtn[6].on('mouseout', restoreScale);
		sprGemShopBtn[6].on('touchend', restoreScale);
		sprGemShopBuy[6] = SpriteLoad(sprGemShopBtn[6], "popup_btn_3_add.png", 0, -30);
		SpriteLoad(sprGemShopBuy[6], "popup_btn_jewel.png", -43, 0);
		txtGemShopBuy[6] = FontLoad(sprGemShopBuy[6], XNumViewString(XNumToNum((kData.iSkillLv[6] + 1) * iSkillCashBase[6])), 26, 0, 0.5, 0.5,
            {font:'25px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
		txtGemShopBtn[6] = FontLoad(sprGemShopBtn[6], GetString("LvUP"), 0, 28, 0.5, 0.5,
            {font:'30px ' + tbTTF[lang] ,fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	else
	{
		sprGemShopBtn[6].interactive = false;
        CB_ButtonUp('gemshop_fever_gage');
		txtGemShopBtn[6] = FontLoad(sprGemShopBtn[6], GetString("MAX"), 0, 0, 0.5, 0.5,
            {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	}
	// 페이지 설정
	FontLoad(sMenuGemShopPage2, "2 / 2", iCenterSizeX, iCenterSizeY + 380, 0.5, 0.5,
        {font:'60px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	spr = SpriteLoad(sMenuGemShopPage2, "popup_arrow.png", iCenterSizeX - 120, iCenterSizeY + 375);
	spr.interactive = true;
	spr.on('click', cbButtonGemShopLeft);
	spr.on('tap', cbButtonGemShopLeft);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);

	// 새로하기 팝업창
    sMenuGemShopPopup.interactive = true;
    spr = PIXIGraphics(sMenuGemShopPopup,0x000000,0.6);
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);

	SpriteLoad(sMenuGemShopPopup, "popup_ui_1_1.png", iCenterSizeX, iCenterSizeY);
	spr = SpriteLoad(sMenuGemShopPopup, "popup_message_box_1.png", iCenterSizeX, iCenterSizeY - 345);
	FontLoad(spr, GetString("AddCash"), -90, -5, 0.5, 0.5,
			{font:'32px ' + tbTTF[lang], fill:'#000000', align:"left"});
	SpriteLoad(spr, "popup_btn_jewel.png", 50, -5);
	txtGetShopPopupCash = FontLoad(spr, "10", 95, -3, 0, 0.5,
			{font:'32px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});

	spr = SpriteLoad(sMenuGemShopPopup, "popup_message_box_5.png", iCenterSizeX, iCenterSizeY + 10);
	FontLoad(spr, GetString("Notice"), 0, -170, 0.5, 0.5,
        {font:'50px ' + tbTTF[lang], fill:'#ff0000', align:"left"});
	FontLoad(spr, GetString("RebirthContents"), 0, 20, 0.5, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#000000', align:"center"});

	spr = SpriteLoad(sMenuGemShopPopup, "popup_btn.png", iCenterSizeX - 160, iCenterSizeY + 340);
	spr.interactive = true;
	spr.on('click', cbButtonGemShopPopupRebirth);
	spr.on('tap', cbButtonGemShopPopupRebirth);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString("gemshopRebirthBtn"), 0, -5, 0.5, 0.5,
        {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	spr = SpriteLoad(sMenuGemShopPopup, "popup_btn.png", iCenterSizeX + 160, iCenterSizeY + 340);
	spr.interactive = true;
	spr.on('click', cbButtonGemShopPopupClose);
	spr.on('tap', cbButtonGemShopPopupClose);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString("NO"), 0, -5, 0.5, 0.5,
        {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});

	sMenuGemShopPopup.visible = false;
	sMenuGemShop.addChild(sMenuGemShopPage1);
	sMenuGemShop.addChild(sMenuGemShopPage2);
	sMenuGemShop.addChild(sMenuGemShopPopup);
	sMenuGemShopPage2.visible = false;
	sGame.addChild(sMenuGemShop);
	sMenuGemShop.visible = false;
	//===============================================
	// 옵션창 셋팅하기..
	SpriteLoad(sMenuOption, "popup_ui_5.png", iCenterSizeX, iCenterSizeY);
	SpriteLoad(sMenuOption, "popup_title_option.png", iCenterSizeX - 170, iCenterSizeY - 475);
    FontLoad(sMenuOption, GetString('title_option'),iCenterSizeX + 45, iCenterSizeY - 470 , 0.5,0.5,
        {font:'60px ' + tbPopupTitleTTF[lang], align: 'center',
            fill:'#ffcc01',
            stroke:'#000000',strokeThickness:6});

	spr = SpriteLoad(sMenuOption, "popup_message_box_4.png", iCenterSizeX, iCenterSizeY - 190);
	for(var i=0;i<7;++i)
	{
		spr2 = SpriteLoad(spr, "white.png", -100, -123 + (39*i));
		spr2.scale.set(520/6, 35/4);
		spr2.tint = 0xc3c3c3;
		FontLoad(spr, GetString("optionM" + i), -255, -123 + (39*i), 0, 0.5,
			{font:'22px ' + tbTTF[lang],fill:'#000000', align:"left"});
		txtOption1[i] = FontLoad(spr, "0", 255, -121 + (39*i), 1, 0.5,
            {font:'22px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	}
	spr = SpriteLoad(sMenuOption, "popup_message_box_4.png", iCenterSizeX, iCenterSizeY + 140);
	for(var i=0;i<8;++i)
	{
		spr2 = SpriteLoad(spr, "white.png", -100, -136 + (37*i));
		spr2.scale.set(520/6, 35/4);
		spr2.tint = 0xc3c3c3;
		FontLoad(spr, GetString("optionT" + i), -255, -136 + (37*i), 0, 0.5,
            {font:'22px ' + tbTTF[lang], fill:'#000000', align:"left"});
		txtOption2[i] = FontLoad(spr, "0", 255, -134 + (37*i), 1, 0.5,
            {font:'22px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:4});
	}

	spr = SpriteLoad(sMenuOption, "popup_btn.png", iCenterSizeX - 160, iCenterSizeY + 370);
	spr.interactive = true;
	spr.on('click', cbButtonSoundBGM);
	spr.on('tap', cbButtonSoundBGM);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, "BGM", -30, -5, 0.5, 0.5,
        {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	sprSoundBGM = SpriteLoad(spr, "bgm_on.png", 50, -8);

	spr = SpriteLoad(sMenuOption, "popup_btn.png", iCenterSizeX + 160, iCenterSizeY + 370);
	spr.interactive = true;
	spr.on('click', cbButtonSoundSE);
	spr.on('tap', cbButtonSoundSE);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, "SFX", -30, -5, 0.5, 0.5,
        {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	sprSoundSE = SpriteLoad(spr, "se_on.png", 50, -8);
	SetSoundIcon();

	spr = SpriteLoad(sMenuOption, "popup_btn.png", iCenterSizeX - 160, iCenterSizeY + 470);
	spr.interactive = true;
	spr.on('click', cbButtonMenuOptionTutorial);
	spr.on('tap', cbButtonMenuOptionTutorial);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString('title_tutorial'), 0, -5, 0.5, 0.5,
        {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});

	spr = SpriteLoad(sMenuOption, "popup_btn.png", iCenterSizeX + 160, iCenterSizeY + 470);
	spr.interactive = true;
	spr.on('click', cbButtonMenuOptionClose);
	spr.on('tap', cbButtonMenuOptionClose);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString('btn_close'), 0, -5, 0.5, 0.5,
        {font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});

	sGame.addChild(sMenuOption);
	sMenuOption.visible = false;
	//===============================================

	// CASH SHOP 팝업
    sMenuCashShop.interactive = true;
    spr = SpriteLoad(sMenuCashShop,'white.png', iCenterSizeX,iCenterSizeY);
    spr.scale.set(iMaxSizeX, iMaxSizeY);
    spr.tint = 0x000000;
    spr.alpha = 0.6;
    spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);

	SpriteLoad(sMenuCashShop, 'popup_shop.png', iCenterSizeX, iCenterSizeY);

	SpriteLoad(sMenuCashShop, 'popup_title_gemshop.png', iCenterSizeX - 170, iCenterSizeY - 430);
    FontLoad(sMenuCashShop, GetString('title_gemshop'),iCenterSizeX + 45, iCenterSizeY - 430 , 0.5,0.5,
        {font:'60px ' + tbPopupTitleTTF[lang], align: 'center',
            fill:'#ffcc01',
            stroke:'#000000',strokeThickness:6});

    spr = SpriteLoad(sMenuCashShop,'point.png',iCenterSizeX, iCenterSizeY -300);
    if(loginTF == 0){
        spr.on('click',function () {
			SESoundPlay(SE_Button);
		//	kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
            /*networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL,GetString('signup'),
                function () {
                    networkManager.JoinMember();
                },
                function () {
                }
            );*/
        });
        spr.on('tap',function () {
            SESoundPlay(SE_Button);
		//	kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
            /*networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL,GetString('signup'),
                function () {
                    networkManager.JoinMember();
                },
                function () {
                }
            );*/
            // 팝업 모달 띄우기
        });
        spr.interactive = true;
	}

    txtGreapPoint = FontLoad(spr,GetString('login'), 100,0, 1,0.5,
		{font:'30px ' + tbTTF[lang], fill:'#ffffff'});

    for(var i=0;i<4;++i){
		spr = SpriteLoad(sMenuCashShop, 'list_1.png', iCenterSizeX, iCenterSizeY - 180+(150*i), 0.5, 0.5);
		sprCashIcon[i] = SpriteLoad(spr, 'jewel_1.png', -170,0);
		txtOnlyClient[i] = FontLoad(sprCashIcon[i], GetString('shop_onlyclient'), -50, -20, 0.5,0.5,
			{font:'25px ' + tbTTF[lang], fill:'#ffffff',
				stroke:'#000000', strokeThickness:4});
		txtCashQuantity[i] = new PIXI.extras.BitmapText(iCashChargeValues[i].toString(), { font:'70px ' + ShopNumTTF,align:'right'});
		spr.addChild(txtCashQuantity[i]);
		txtCashQuantity[i].pivot.set(1,0.5);
		txtCashQuantity[i].position.set(-120, -50);
		sprCashBuyBtn[i] = SpriteLoad(spr,'btn_shop_1.png', 170,0);
		sprCashBuyBtn[i].interactive = true;
		sprCashBuyBtn[i].on('click',CB_BuyCash);
		sprCashBuyBtn[i].on('tap',CB_BuyCash);
		sprCashBuyBtn[i].datatype = i+1;
		sprCashBuyBtn[i].on('mouseover', scaleUp);
		sprCashBuyBtn[i].on('tap', scaleUp);
		sprCashBuyBtn[i].on('mouseout', restoreScale);
		sprCashBuyBtn[i].on('touchend', restoreScale);
		sprCashMIcon[i] = SpriteLoad(sprCashBuyBtn[i], 'gold_2.png', -60, -3);
		sprCashMIcon[i].scale.set(0.8);
		txtCashValue[i] = FontLoad(sprCashBuyBtn[i], '200P', 20, 0, 0.5,0.5,
			{font:'35px ' + tbTTF[lang], fill:'#ffffff'});
		sprCashBtnImg[i] = SpriteLoad(sprCashBuyBtn[i], 'shop_ad.png',0,-5);
		txtCashCooltime[i] = FontLoad(sprCashBuyBtn[i], '00:00',0,0, 0.5,0.5,
			{font:'30px ' + tbTTF[lang], fill:'#ffffff',
				storke:'#59493f', strokeThickness:4});
		txtCashCooltime[i].visible = false;

		/*if(servicePos == 0){
			// movi 홈
			spr = SpriteLoad(sMenuCashShop, 'list_1.png', iCenterSizeX, iCenterSizeY - 30, 0.5,0.5);
			spr2 = SpriteLoad(spr, 'jewel_4.png', -170,0);
			sprCashBuyBtn[i] = SpriteLoad(spr,'btn_shop_1.png', 170,0);
		}else{
			// 야후
			spr = SpriteLoad(sMenuCashShop, 'list_2.png', iCenterSizeX, iCenterSizeY - 30, 0.5,0.5);
			spr2 = SpriteLoad(spr, 'jewel_2.png', -170,0);
			sprCashBuyBtn[i] = SpriteLoad(spr,'btn_shop_2.png', 170,0);
		}*/
	}
    /*spr = SpriteLoad(sMenuCashShop, 'list_1.png', iCenterSizeX, iCenterSizeY - 180, 0.5,0.5);
    spr2 = SpriteLoad(spr, 'jewel_1.png', -170,0);
    txtOnlyClient[0] = FontLoad(spr2, GetString('shop_onlyclient'), -50, -20, 0.5,0.5,
        {font:'25px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#000000', strokeThickness:4});
    txtCashQuantity[0] = new PIXI.extras.BitmapText(iCashChargeValues[0].toString(), { font:'70px ' + ShopNumTTF,align:'right'});
    spr.addChild(txtCashQuantity[0]);
    txtCashQuantity[0].pivot.set(1,0.5);
    txtCashQuantity[0].position.set(-50 - (txtCashQuantity[0].width/2),-50);
    sprCashBuyBtn[0] = SpriteLoad(spr,'btn_shop_1.png', 170,0);
    sprCashBuyBtn[0].interactive = true;
    sprCashBuyBtn[0].on('click',CB_BuyCash);
    sprCashBuyBtn[0].on('tap',CB_BuyCash);
    sprCashBuyBtn[0].datatype = 1;
    sprCashBuyBtn[0].on('mouseover', scaleUp);
    sprCashBuyBtn[0].on('tap', scaleUp);
    sprCashBuyBtn[0].on('mouseout', restoreScale);
    sprCashBuyBtn[0].on('touchend', restoreScale);
    txtCashValue[0] = FontLoad(sprCashBuyBtn[0], '200P',0,0, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff'});
    //txtCashValue[0].visible = false;
    sprCashBtnImg[0] = FontLoad(sprCashBuyBtn[0], GetString('shop_joinclient'),0,0, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff',
			storke:'#59493f', strokeThickness:4});
    txtCashCooltime[0] = FontLoad(sprCashBuyBtn[0], '00:00',0,0, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff',
            storke:'#59493f', strokeThickness:4});
    txtCashCooltime[0].visible = false;
    //sprCashBtnImg[0].visible = false;

	if(servicePos == 0){
		// movi 홈
        spr = SpriteLoad(sMenuCashShop, 'list_1.png', iCenterSizeX, iCenterSizeY - 30, 0.5,0.5);
        spr2 = SpriteLoad(spr, 'jewel_4.png', -170,0);
        sprCashBuyBtn[1] = SpriteLoad(spr,'btn_shop_1.png', 170,0);
	}else{
		// 야후
        spr = SpriteLoad(sMenuCashShop, 'list_2.png', iCenterSizeX, iCenterSizeY - 30, 0.5,0.5);
        spr2 = SpriteLoad(spr, 'jewel_2.png', -170,0);
        sprCashBuyBtn[1] = SpriteLoad(spr,'btn_shop_2.png', 170,0);
	}

    txtOnlyClient[1] = FontLoad(spr2, GetString('shop_onlyclient'), -50, -20, 0.5,0.5,
        {font:'25px ' + tbTTF[lang], fill:'#ffffff',
            stroke:'#000000', strokeThickness:4});
    txtCashQuantity[1] = new PIXI.extras.BitmapText(iCashChargeValues[1].toString(), { font:'70px ' + ShopNumTTF,align:"right"});
    txtCashQuantity[1].pivot.set(1,0.5);
    spr.addChild(txtCashQuantity[1]);
    txtCashQuantity[1].position.set(-50 - (txtCashQuantity[1].width/2),-50);
    sprCashBuyBtn[1].interactive = true;
    sprCashBuyBtn[1].on('click',CB_BuyCash);
    sprCashBuyBtn[1].on('tap',CB_BuyCash);
    sprCashBuyBtn[1].datatype = 2;
    sprCashBuyBtn[1].on('mouseover', scaleUp);
    sprCashBuyBtn[1].on('tap', scaleUp);
    sprCashBuyBtn[1].on('mouseout', restoreScale);
    sprCashBuyBtn[1].on('touchend', restoreScale);
    txtCashValue[1] = FontLoad(sprCashBuyBtn[1], '100￥',0,0, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff'});
    //txtCashValue[1].visible = false;
    sprCashBtnImg[1] = FontLoad(sprCashBuyBtn[1], GetString('shop_joinclient'),0,0, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff',
            storke:'#59493f', strokeThickness:4});
    txtCashCooltime[1] = FontLoad(sprCashBuyBtn[1], '00:00',0,0, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff',
            storke:'#59493f', strokeThickness:4});
    txtCashCooltime[1].visible = false;
    //sprCashBtnImg[1].visible = false;

    spr = SpriteLoad(sMenuCashShop, 'list_2.png', iCenterSizeX, iCenterSizeY + 120, 0.5,0.5);
    SpriteLoad(spr, 'jewel_3.png', -170,0);
    txtCashQuantity[2] = new PIXI.extras.BitmapText(iCashChargeValues[2].toString(), { font:'70px ' + ShopNumTTF,align:'right'});
    txtCashQuantity[2].pivot.set(1,0.5);
    spr.addChild(txtCashQuantity[2]);
    txtCashQuantity[2].position.set(-50 - (txtCashQuantity[2].width/2),-50);
    sprCashBuyBtn[2] = SpriteLoad(spr,'btn_shop_2.png', 170,0);
    sprCashBuyBtn[2].interactive = true;
    sprCashBuyBtn[2].on('click',CB_BuyCash);
    sprCashBuyBtn[2].on('tap',CB_BuyCash);
    sprCashBuyBtn[2].datatype = 3;
    sprCashBuyBtn[2].on('mouseover', scaleUp);
    sprCashBuyBtn[2].on('tap', scaleUp);
    sprCashBuyBtn[2].on('mouseout', restoreScale);
    sprCashBuyBtn[2].on('touchend', restoreScale);
    txtCashValue[2] = FontLoad(sprCashBuyBtn[2], '300￥',0,0, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff'});
    //txtCashValue[2].visible = false;
    sprCashBtnImg[2] = SpriteLoad(sprCashBuyBtn[2], 'shop_ad.png',0,-5);
    //sprCashBtnImg[2].visible = false;
    txtCashCooltime[2] = FontLoad(sprCashBuyBtn[2], '00:00',0,0, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff',
            storke:'#59493f', strokeThickness:4});
    txtCashCooltime[2].visible = false;

    spr = SpriteLoad(sMenuCashShop, 'list_2.png', iCenterSizeX, iCenterSizeY + 270, 0.5,0.5);
    SpriteLoad(spr, 'jewel_4.png', -170,0);
    txtCashQuantity[3] = new PIXI.extras.BitmapText(iCashChargeValues[3].toString(), { font:'70px ' + ShopNumTTF,align:'right'});
    txtCashQuantity[3].pivot.set(1,0.5);
    spr.addChild(txtCashQuantity[3]);
    txtCashQuantity[3].position.set(-50 - (txtCashQuantity[3].width/2),-50);
    sprCashBuyBtn[3] = SpriteLoad(spr,'btn_shop_2.png', 170,0);
    sprCashBuyBtn[3].interactive = true;
    sprCashBuyBtn[3].on('click',CB_BuyCash);
    sprCashBuyBtn[3].on('tap',CB_BuyCash);
    sprCashBuyBtn[3].datatype = 4;
    sprCashBuyBtn[3].on('mouseover', scaleUp);
    sprCashBuyBtn[3].on('tap', scaleUp);
    sprCashBuyBtn[3].on('mouseout', restoreScale);
    sprCashBuyBtn[3].on('touchend', restoreScale);
    txtCashValue[3] = FontLoad(sprCashBuyBtn[3], '500￥',0,0, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff'});
    //txtCashValue[3].visible = false;
    sprCashBtnImg[3] = SpriteLoad(sprCashBuyBtn[3], 'shop_movie.png',0,-5);
    //sprCashBtnImg[3].visible = false;
    txtCashCooltime[3] = FontLoad(sprCashBuyBtn[3], '00:00',0,0, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff',
            storke:'#59493f', strokeThickness:4});
    txtCashCooltime[3].visible = false;*/

    spr = SpriteLoad(sMenuCashShop, 'btn_shop_ok.png', iCenterSizeX, iCenterSizeY + 410);
    spr.interactive = true;
    spr.on('click' , function () {sMenuCashShop.visible = false;});
    spr.on('tap' , function () {sMenuCashShop.visible = false;});
    spr.on('mouseover', scaleUp);
    spr.on('tap', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
	FontLoad(spr,GetString('btn_ok'),0,-5, 0.5,0.5,
        { font:'60px ' + tbTTF[lang], align: 'center',
    		fill:'#ffffff',
			stroke:'#67442f', strokeThickness:6});

	sGame.addChild(sMenuCashShop);
    sMenuCashShop.visible = false;
	// ==============================================

	// CashShop 컨펌 팝업
    spr = PIXIGraphics(sPopupCashConfirm,0x000000,0.6);
    spr.on('click', cbButtonWhite);
    spr.on('tap', cbButtonWhite);
    spr.interactive = true;

	spr = SpriteLoad(sPopupCashConfirm, 'popup_message.png', iCenterSizeX, iCenterSizeY);

	spr = SpriteLoad(spr, 'message_in.png', 0, -110);
    sprCashConfirmImg = SpriteLoad(spr,'jewel_4.png', 0,0);
    txtCashConfirmValue = new PIXI.extras.BitmapText("9,999", { font:'70px ' + ShopNumTTF, align:'right'});
    txtCashConfirmValue.pivot.set(0.5,0.5);
    spr.addChild(txtCashConfirmValue);
    txtCashConfirmValue.position.set(80-txtCashConfirmValue.width/2,-txtCashConfirmValue.height/2);
    txtCashConfirmData = FontLoad(sPopupCashConfirm, GetString('shop_cashconfirm',"9,999"),iCenterSizeX,iCenterSizeY + 20, 0.5,0.5,
		{font:'30px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#000000', strokeThickness:4});

    spr = SpriteLoad(sPopupCashConfirm, 'btn_shop_ok.png', iCenterSizeX,iCenterSizeY + 110);
    spr.on('click',function () {sPopupCashConfirm.visible = false;});
    spr.on('tap',function () {sPopupCashConfirm.visible = false;});
    spr.interactive = true;
    spr.on('mouseover', scaleUp);
    spr.on('tap', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr,GetString('btn_ok'),0,-5, 0.5,0.5,
        { font:'60px ' + tbTTF[lang],align: 'center',
            fill:'#ffffff',
            stroke:'#67442f', strokeThickness:6});

    sGame.addChild(sPopupCashConfirm);
    sPopupCashConfirm.visible = false;
    // ==============================================

	// AD 광고창 셋팅하기..
	// spr = SpriteLoad(sADView1, "white.png", iCenterSizeX, iCenterSizeY);
	// spr.scale.set(iMaxSizeX, iMaxSizeY);
	// spr.tint = 0x000000;
	// spr.alpha = 0.7;
	// spr.interactive = true;
	// spr.on('click', cbButtonWhite);
	// spr.on('tap', cbButtonWhite);
	//
	// SpriteLoad(sADView1, "popup_ui_1_1.png", iCenterSizeX, iCenterSizeY);
	// spr = SpriteLoad(sADView1, "popup_message_box_1.png", iCenterSizeX, iCenterSizeY - 345);
	// txtAD1 = FontLoad(spr, GetString("AddCash"), 0, -5, 0.5, 0.5,
	// 		{fontFamily:tbTTF[lang], fontSize:'32px', fill:'#000000', align:"left"});
	// sprADIcon1 = SpriteLoad(spr, "gold_icon.png", 0, 0);
	//
	// spr = SpriteLoad(sADView1, "popup_message_box_5.png", iCenterSizeX, iCenterSizeY + 10);
	// FontLoad(spr, GetString("Notice"), 0, -170, 0.5, 0.5,
	// 		{fontFamily:tbTTF[lang],fontSize:'50px', fill:'#ff0000', align:"left"});
	// FontLoad(spr, GetString("NoticeAD"), 0, -130, 0.5, 0.5,
	// 		{fontFamily:tbTTF[lang],fontSize:'32px', fill:'#ff0000', align:"left"});
	// FontLoad(spr, GetString("ADContents"), 0, 20, 0.5, 0.5,
	// 		{fontFamily:tbTTF[lang],fontSize:'32px', fill:'#000000', align:"center"});
	//
	// spr = SpriteLoad(sADView1, "popup_btn.png", iCenterSizeX - 160, iCenterSizeY + 340);
	// spr.interactive = true;
	// spr.on('click', cbButtonADView1OK);
	// spr.on('tap', cbButtonADView1OK);
	// spr.on('mouseover', scaleUp);
	// spr.on('tap', scaleUp);
	// spr.on('mouseout', restoreScale);
	// spr.on('touchend', restoreScale);
	// FontLoad(spr, GetString("Reward"), 0, -5, 0.5, 0.5,
	// 		{fontFamily:tbTTF[lang],fontSize:'40px', fill:'#ffffff', stroke:'#67442f', strokeThickness:4});
	// spr = SpriteLoad(sADView1, "popup_btn.png", iCenterSizeX + 160, iCenterSizeY + 340);
	// spr.interactive = true;
	// spr.on('click', cbButtonADView1Close);
	// spr.on('tap', cbButtonADView1Close);
	// spr.on('mouseover', scaleUp);
	// spr.on('tap', scaleUp);
	// spr.on('mouseout', restoreScale);
	// spr.on('touchend', restoreScale);
	// FontLoad(spr, GetString("NO"), 0, -5, 0.5, 0.5,
	// 		{fontFamily:tbTTF[lang],fontSIze:'40px', fill:'#ffffff', stroke:'#67442f', strokeThickness:4});

	// 2번째
    spr = PIXIGraphics(sADView2,0x000000,0.6);
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);

	SpriteLoad(sADView2, "popup_ui_1.png", iCenterSizeX, iCenterSizeY);
	spr = SpriteLoad(sADView2, "popup_message_box_1.png", iCenterSizeX, iCenterSizeY - 60);
	txtAD2 = FontLoad(spr, GetString("AddCash"), 0, -5, 0.5, 0.5,
        { font:'32px ' + tbTTF[lang], fill:'#000000', align:"left"});
	sprADIcon2 = SpriteLoad(spr, "gold_icon.png", 0, 0);

	spr = SpriteLoad(sADView2, "popup_btn.png", iCenterSizeX, iCenterSizeY + 70);
	spr.interactive = true;
	spr.on('click', cbButtonADView2OK);
	spr.on('tap', cbButtonADView2OK);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString("Reward"), 0, -5, 0.5, 0.5,
        { font:'40px ' + tbTTF[lang], fill:'#ffffff', stroke:'#67442f', strokeThickness:4});

	// sADView1.visible = false;
	sADView2.visible = false;
	// sGame.addChild(sADView1);
	sGame.addChild(sADView2);

    sprRebirthWhite = SpriteLoad(sGame,'white.png',iCenterSizeX, iCenterSizeY);
    sprRebirthWhite.scale.set(iMaxSizeX, iMaxSizeY);
    sprRebirthWhite.alpha = 0.0;
	//===============================================
	// 수리검 강화 및 쿠나이 강화시 팝업창..
//	spr = SpriteLoad(sUpgradePopup, "white.png", iCenterSizeX, iCenterSizeY);
//	spr.scale.set(iMaxSizeX, iMaxSizeY);
//	spr.tint = 0x000000;
//	spr.alpha = 0.7;
//	spr.interactive = true;
//	spr.on('click', cbButtonWhite);
//	spr.on('tap', cbButtonWhite);
	spr = SpriteLoad(sUpgradePopup, "popup_ui_2.png", iCenterSizeX, iCenterSizeY);
	spr2 = SpriteLoad(spr, "popup_message_box_1.png", 0, -170);
	sprPopupNew = SpriteLoad(spr2, "popup_new.png", -210, -10);
	txtUpgradeTitile = FontLoad(spr2, GetString('shuriken_upgrade') + '!', 100, -5, 0.5, 0.5,
        { font:'55px ' + tbTTF[lang], fill:'#ffffff', stroke:'#000000', strokeThickness:7});
	spr2 = SpriteLoad(spr, "popup_message_box_3.png", 0, 80);

	spine_UpgradeIcon[0] = new PIXI.spine.Spine(res.spine_Shuriken.spineData);
	spr2.addChild(spine_UpgradeIcon[0]);
	spine_UpgradeIcon[0].scale.set(1.5, 1.5);
	SpinePlay(spine_UpgradeIcon[0], -180, 0, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
	spine_UpgradeIcon[0].skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMyClickDmgLevel-1)%25)+1, 2));
	txtUpgradeContents = FontLoad(spr2, "No." + kData.iMyClickDmgLevel +"\n" + GetString("Shuriken" + kData.iMyClickDmgLevel), 70, 0, 0.5, 0.5,
        { font:'38px ' + tbTTF[lang], fill:'#000000', align:'center'});

	spine_UpgradeIcon[1] = new PIXI.spine.Spine(res.spine_Kunai.spineData);
	spr2.addChild(spine_UpgradeIcon[1]);
	spine_UpgradeIcon[1].scale.set(1.5, 1.5);
	SpinePlay(spine_UpgradeIcon[1], -180, 0, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
	spine_UpgradeIcon[1].skeleton.setAttachment("Kunai", "Kunai0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));

	sGame.addChild(sUpgradePopup);
	sUpgradePopup.visible = false;
	//===============================================
	// 튜토리얼 셋팅
    spr = PIXIGraphicsRect(sTutorial,0x000000,0.3, iCenterSizeX,iCenterSizeY,720,1280);
    spr.interactive = true;
    spr.on('click', cbButtonWhite); // 터치 막는 용도
    spr.on('tap', cbButtonTuto);

	spine_tutorial_popup = new PIXI.spine.Spine(res.spine_tutorial_popup.spineData);
	sTutorial.addChild(spine_tutorial_popup);
	spine_tutorial_popup.visible = false;
	txtTutoContents = FontLoad(spine_tutorial_popup, "", 0, 0, 0.5, 0.5,
        { font:'40px ' + tbTTF[lang], fill:'#ffffff', align:"center", lineHeight:50, dropShadow:true, dropShadowColor:'#000000', dropShadowDistance:4});

	spr = SpriteLoad(spine_tutorial_popup, "tutorial_popup_btn.png", -180, 180);
	spr.interactive = true;
	spr.on('click', cbButtonTutoSkip);
	spr.on('tap', cbButtonTutoSkip);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString("skip"), 0, 3, 0.5, 0.5,
        { font:'35px ' + tbTTF[lang], fill:'#ffffff', align:"center", dropShadow:true, dropShadowColor:'#000000', dropShadowDistance:4});
	spr = SpriteLoad(spine_tutorial_popup, "tutorial_popup_btn.png", 180, 180);
	spr.interactive = true;
	spr.on('click', cbButtonTuto);
	spr.on('tap', cbButtonTuto);
	spr.on('mouseover', scaleUp);
	spr.on('tap', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);
	FontLoad(spr, GetString("next"), 0, 3, 0.5, 0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff', align:"center", dropShadow:true, dropShadowColor:'#000000', dropShadowDistance:4});

	spine_tutorial_arrow_2 = new PIXI.spine.Spine(res.spine_tutorial_arrow_2.spineData);
	sTutorial.addChild(spine_tutorial_arrow_2);
	spine_tutorial_arrow_2.visible = false;

	//===============================================
	// 치트 관련.
    /*if(document.location.href.indexOf('dev') != -1 || document.location.href.indexOf('localhost') != -1){
        txt = FontLoad(sGame, "Gem Chit", iCenterSizeX - 350, iCenterSizeY - 500, 0, 0.5,
            {font:'32px ' + tbTTF[lang], fill:'#ffffff', align:"left"});
        txt.interactive = true;
        txt.on('click', cbButtonCheat1);
        txt.on('tap', cbButtonCheat1);
        txt.on('mouseover', scaleUp);
        txt.on('tap', scaleUp);
        txt.on('mouseout', restoreScale);
        txt.on('touchend', restoreScale);

        txt = FontLoad(sGame, "Money Cheat", iCenterSizeX - 350, iCenterSizeY - 500 + 40, 0, 0.5,
            {font:'32px ' + tbTTF[lang], fill:'#ffffff', align:"left"});
        txt.interactive = true;
        txt.on('click', cbButtonCheat2);
        txt.on('tap', cbButtonCheat2);
        txt.on('mouseover', scaleUp);
        txt.on('tap', scaleUp);
        txt.on('mouseout', restoreScale);
        txt.on('touchend', restoreScale);

        txt = FontLoad(sGame, "Incorporated cheat", iCenterSizeX - 350, iCenterSizeY - 500 + 80, 0, 0.5,
            {font:'32px ' + tbTTF[lang], fill:'#ffffff', align:"left"});
        txt.interactive = true;pen
        txt.on('click', cbButtonCheatFever);
        txt.on('tap', cbButtonCheatFever);
        txt.on('mouseover', scaleUp);
        txt.on('tap', scaleUp);
        txt.on('mouseout', restoreScale);
        txt.on('touchend', restoreScale);

        txt = FontLoad(sGame, 'Come on', iCenterSizeX - 350, iCenterSizeY - 500 + 120, 0, 0.5,
            {font:'32px ' + tbTTF[lang], fill:'#ffffff', align:"left"});
        txt.interactive = true;
        txt.on('click', cbAdCheat);
        txt.on('tap', cbAdCheat);
        txt.on('mouseover', scaleUp);
        txt.on('tap', scaleUp);
        txt.on('mouseout', restoreScale);
        txt.on('touchend', restoreScale);
	}*/

    //===============================================
    // 네트워크 로딩 화면.

    spr = PIXIGraphics(sNetworkLoading,0x000000,0.0);
    spr.interactive = true;
    spr.on('click',cbButtonWhite);
    spr.on('tep',cbButtonWhite);
    spr.on('mousedown', cbButtonWhite);
    spr.on('touchstart', cbButtonWhite);
    spr.on('mouseup', cbButtonWhite);
    spr.on('touchend', cbButtonWhite);

    FontLoad(sNetworkLoading,'Wait For Network Answer...',iCenterSizeX,iCenterSizeY, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff'});

    sNetworkLoading.visible = false;
    sNetworkLoading.interactive = true;

    //===============================================
    // 랭킹 화면.

    spr = PIXIGraphics(sRanking,0x000000,0.0);
    spr.interactive = true;
    spr.on('click',cbButtonWhite)
    spr.on('tep',cbButtonWhite)
    spr.on('mousedown', cbButtonWhite);
    spr.on('touchstart', cbButtonWhite);
    spr.on('mouseup', cbButtonWhite);
    spr.on('touchend', cbButtonWhite);

    spr = SpriteLoad(sRanking, 'ranking/popup.png',iCenterSizeX, iCenterSizeY);

    SpriteLoad(spr,'ranking/title.png', -180, -530);
    FontLoad(spr, GetString('title_ranking'), 45, -540 , 0.5,0.5,
        {font:'60px ' + tbPopupTitleTTF[lang],align: 'center',
            fill:'#ffcc01',
            stroke:'#000000',strokeThickness:6});

    sprtab = SpriteSliceLoad(spr,'ranking/tab.png',0,-380, 0.5,0.5, 10,10,10,10, 578,85);
    SpriteSlicedAlphaChange(sprtab,0.35);

    state_ranking = RANKING_STATE.DAILY;

    sprRank_RankingTaps[RANKING_STATE.DAILY] = SpriteLoad(spr,'ranking/btn_tab.png', -135, -380);
    sprRank_RankingTaps[RANKING_STATE.DAILY].alpha = 1;
    sprRank_RankingTaps[RANKING_STATE.DAILY].interactive = true;
    sprRank_RankingTaps[RANKING_STATE.DAILY].on('click',CB_ChangeRankingView);
    sprRank_RankingTaps[RANKING_STATE.DAILY].on('tap',CB_ChangeRankingView);
    sprRank_RankingTaps[RANKING_STATE.DAILY].btn_state = RANKING_STATE.DAILY;

    txtRank_RankingTaps[RANKING_STATE.DAILY] = FontLoad(spr,GetString('rank_daily'), -135, -380, 0.5,0.5,
        {font:'40px ' + tbPopupTitleTTF[lang],  fill:'#9e643f',
            stroke:'#47250c', strokeThickness:2});

    sprRank_RankingTaps[RANKING_STATE.TOTAL] = SpriteLoad(spr,'ranking/btn_tab.png', 135, -380);
    sprRank_RankingTaps[RANKING_STATE.TOTAL].alpha = 1;
    sprRank_RankingTaps[RANKING_STATE.TOTAL].interactive = true;
    sprRank_RankingTaps[RANKING_STATE.TOTAL].on('click',CB_ChangeRankingView);
    sprRank_RankingTaps[RANKING_STATE.TOTAL].on('tap',CB_ChangeRankingView);
    sprRank_RankingTaps[RANKING_STATE.TOTAL].btn_state = RANKING_STATE.TOTAL;

    txtRank_RankingTaps[RANKING_STATE.TOTAL] = FontLoad(spr,GetString('rank_total'), 135, -380, 0.5,0.5,
	    {font:'40px ' + tbPopupTitleTTF[lang], fill:'#ffffff',
    	    stroke:'#000000', strokeThickness:2});

    sprRank_PanelList[0] = SpriteLoad	(spr, 'ranking/panel_top.png', 0, - 250);
	txtRank_UserNameList[0] = FontLoad(sprRank_PanelList[0], 'USERNAME...' , -160,-5, 0,0.5,
		{font:'40px ' + tbTTF[lang],fill:'#584928', align:'left'});
	txtRank_RankingPointList[0] = FontLoad(sprRank_PanelList[0], '10,248', 240,-5, 1,0.5,
        {font:'40px ' + tbTTF[lang], fill:'#755d0c',  fontStyle: 'bold',align:'left'});
	txtRank_UserRankList[0] = FontLoad(sprRank_PanelList[0], '1', -220,-5, 0.5,0.5,
        {font:'40px ' + tbTTF[lang], fill:'#755d0c',  fontStyle: 'bold',align:'center'});
	sprRank_RankingMedalList[0] = SpriteLoad(sprRank_PanelList[0], 'ranking/medal_1_small.png', -220,0);

    for(var i=1,imax=6;i<imax;++i){
        sprRank_PanelList[i] = SpriteLoad(spr,'ranking/panel_other.png',0, -225 +(i*125));
        txtRank_UserNameList[i] = FontLoad(sprRank_PanelList[i], 'USERNAME...' , -160,-5, 0,0.5,
            {font:'40px Arial', fill:'#584928', align:'left'});
        txtRank_RankingPointList[i] = FontLoad(sprRank_PanelList[i], '10,248', 240,-5, 1,0.5,
            {font:'40px Arial', fill:'#755d0c',  fontStyle: 'bold',align:'left'});

        txtRank_UserRankList[i] = FontLoad(sprRank_PanelList[i], (i+1).toString(), -220,-5, 0.5,0.5,
            {font:'40px Arial',  fill:'#755d0c',  fontStyle: 'bold',align:'center'});

        if(i<3)
        	sprRank_RankingMedalList[i] = SpriteLoad(sprRank_PanelList[i], 'ranking/medal_' + (i+1) + '_small.png', -220,0);
	}

    sprRank_RankingMyEff = SpriteLoad(spr, 'ranking/panel_effect.png', 0,0);
    sprRank_RankingMyEff.visible = false;

    txtRank_SignUp = FontLoad(spr,GetString('sign_up'),iCenterSizeX,iCenterSizeY, 0.5,0.5,
		{font:'50px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#674430', strokeThickness:5});
    txtRank_SignUp.visible = false;

    sprBack = SpriteLoad(spr, 'ranking/btn_back.png', 0, + 520);
    sprBack.interactive = true;
    sprBack.on('click',function () {sRanking.visible = false;});
    sprBack.on('tap',function () {sRanking.visible = false;});
    sprBack.on('mouseover', scaleUp);
    sprBack.on('tap', scaleUp);
    sprBack.on('mouseout', restoreScale);
    sprBack.on('touchend', restoreScale);
    FontLoad(sprBack, GetString('btn_close'),0,-10, 0.5,0.5,
        {font:'50px ' + tbTTF[lang], fill:'#ffffff',
            stroke:'#000000', strokeThickness:2});

    btn_disableTouch = PIXIGraphics(sRankUp,0x000000,0.6);
    btn_disableTouch.interactive = true;
    btn_disableTouch.on('click',cbButtonWhite);
    btn_disableTouch.on('tap',cbButtonWhite);

    spineRank_RankUp = new PIXI.spine.Spine(res.spine_rank_up_eff.spineData);
    spineRank_RankUp.state.addListener({
    	complete:function (entry) {
			switch (entry.trackIndex){
				case 0:		// in_complete
                    SpinePlay(spineRank_RankUp,null,null,'rank_up_eff_idle',1,false);
					break
				case 1:		// idle_complete
                    SpinePlay(spineRank_RankUp,null,null,'rank_up_eff_out',2,false);
					break;
				case 2:
                    spineRank_RankUp.visible = false;
					break;
			}
        }
	});
    spineRank_RankUp.position.set(iCenterSizeX,iCenterSizeY);
    spineRank_RankUp.interactive = true;
    sRankUp.addChild(spineRank_RankUp);
    //spine_light_bug = new PIXI.spine.Spine(res.spine_light_bug.spineData);
    //spineRank_RankUp = SpriteLoad(sRankUp,'ranking/rankup_arrow.png',iCenterSizeX, iCenterSizeY - 150);
    //SpriteLoad(spineRank_RankUp,'ranking/rankup.png',0,80);

    txtRank_RankChange[0] = new PIXI.extras.BitmapText("0124", { font:RankNumTTF, align:'right'});
    spineRank_RankUp.addChild(txtRank_RankChange[0]);
    txtRank_RankChange[0].pivot.set(1,0.5);
    txtRank_RankChange[0].position.set(-60 - txtRank_RankChange[0].width, 270);

    SpriteLoad(spineRank_RankUp, 'ranking/rank_arrow.png', 0, 280); // →

    txtRank_RankChange[1] = new PIXI.extras.BitmapText("5678", { font:RankNumTTF, align:'left'});
    spineRank_RankUp.addChild(txtRank_RankChange[1]);
    txtRank_RankChange[1].pivot.set(0,0.5);
    txtRank_RankChange[1].position.set(60,270);

    sprRank_Medal = SpriteLoad(sRanking,'ranking/medal_1.png',iCenterSizeX,iCenterSizeY);
    sprRank_Medal.visible = false;

    //sRankUp.visible = false;

	sGame.addChild(sRanking);
    sRanking.addChild(sRankUp);
	sRanking.visible = false;
    sRankUp.visible = false;

    //===============================================

}

function CalcToadHPMax() {
    // if(kData.iToadLevel > 100)
    //     console.log('toad level 100 over!');

    if(kData.iToadLevel % 10 == 0){
        clientData.nToadHPIncreate = XMultiplyEx([2], Math.floor(kData.iToadLevel/10));
        //clientData.nToadHPIncreate = XMultiplyEx(clientData.nToadHPIncreate, 2);

        calcData = Math.pow(iToadBase,NumToXNum(clientData.nToadHPIncreate));

        clientData.nToadHPMax = XMultiplyEx(XNumToNum(calcData),10);
        nToadHP = XMultiplyEx(XNumToNum(calcData),10);
    }else{
        clientData.nToadHPIncreate = XPlus(XNumToNum(1),XNumToNum(Math.floor(kData.iToadLevel/10)));
        clientData.nToadHPIncreate = XMultiplyEx(clientData.nToadHPIncreate, 2);
        //clientData.nToadHPIncreate = XPlus(clientData.nToadHPIncreate,XNumToNum(1));

        calcData = Math.pow(iToadBase, Math.floor(NumToXNum(clientData.nToadHPIncreate)));

        restData = Math.floor(kData.iToadLevel%10);
        clientData.nToadHPMax = XMultiplyEx(XNumToNum(calcData), restData);
        nToadHP = XMultiplyEx(XNumToNum(calcData), restData);
    }

    iToadHPMax = GetVaule(clientData.nToadHPMax, nToadHP);
}

function CB_CashChargePopup() {
	if(loginTF == 0)
		txtGreapPoint.text = GetString('login');
	else
		txtGreapPoint.text = kData.greappoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	for(var i=0;i<4;++i){
		sprCashIcon[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon + ".png");
		txtCashQuantity[i].text = 'x' + shopListData[i].Quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
		if(shopListData[i].pType == "member" && loginTF == 0 && shopListData[i].pType.indexOf('ad') == -1)
			txtOnlyClient[i].visible = true;
		else
			txtOnlyClient[i].visible = false;

		if(shopListData[i].pType.indexOf('ad') > -1) {
			sprCashMIcon[i].visible = false;
			txtCashValue[i].visible = false;
			sprCashBtnImg[i].visible = true;

			if(shopListData[i].pType == "ad_1")
				sprCashBtnImg[i].texture = PIXI.Texture.fromFrame("shop_ad.png");
			else
				sprCashBtnImg[i].texture = PIXI.Texture.fromFrame("shop_movie.png");
		}else{
			sprCashMIcon[i].visible = true;
			txtCashValue[i].visible = true;
			sprCashBtnImg[i].visible = false;
		//	sprHeartBuyPay[i].visible = false;
			txtCashValue[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	}
	/*for(var i=0,imax=txtCashValue.length;i<imax;++i){
		if(i<=1){
            txtOnlyClient[i].visible = false;
            sprCashBtnImg[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'P';
		}

        txtCashValue[i].visible = false;
        sprCashBtnImg[i].visible = false
	}

	switch(servicePos){
		case 0: // Greap 홈페이지
			for(var i=0,imax= shopListData.length; i<imax;++i){

                txtCashQuantity[i].text = 'x' + shopListData[i].Quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");;
                sprCashBtnImg[i].visible = true;
			}

            switch (loginTF){
				case 0:
                    txtGreapPoint.text = GetString('login');

                    txtOnlyClient[0].visible = true;
                    txtOnlyClient[1].visible = true;

					break;
				case 1:
                    txtGreapPoint.text = kData.greappoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'P';
                    for(var i=0,imax=sprCashBtnImg.length;i<imax;++i){
                    	if(i <= 1)
                    		sprCashBtnImg[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'P';
					}
					break;
			}
			break;
		case 1: // 야후

            // txtGreapPoint.text = kData.greappoint + 'P';
            // login 되었을 때
            for(var i=0,imax=txtCashValue.length;i<imax;++i)
                txtCashValue[i].visible = true;
			break;
	}*/

	sMenuCashShop.visible = true;
}

function CB_BuyCash() {
    SESoundPlay(SE_Button);

	if(servicePos == 0 && loginTF == 1 && kData.greappoint < shopListData[this.datatype-1].Price){
        // greappoint가 부족하다는 팝업창 혹은 버튼 실패음
	//	if(yahooIN === undefined)
	//		kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
	//	else
	//		kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
        /*networkManager.ModalCall(MODAL_BUTTON_TYPE.OKONLY,GetString('lowpoint'),
            function () {
            },
            function () {
            }
        );*/
		// 팝업 모달 띄우기
		return;
	}

	var i_paymentDataType = this.datatype;
    if(shopListData[i_paymentDataType-1].pType == 'member'){
        // networkManager.JoinMember();
		// 회원가입 유도 모달
	//	kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
        /*networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL,GetString('signup'),
            function () {
                networkManager.JoinMember();
            },
            function () {
            }
        );*/
		// 팝업 모달 띄우기
    }else{
    	if(kData.fCooltime_Gamemoney[i_paymentDataType-1] > 0)
    		return;

        ADGameMoneyPay(i_paymentDataType-1);
        networkManager.Payment(shopListData[this.datatype-1].mkidx, function () {
            if(loginTF == 1){
                txtMyCash.text = kData.iCash;

                sprCashConfirmImg.texture = SpritePool.getInstance().get("jewel_" + i_paymentDataType +".png").texture;
                txtCashConfirmValue.text = shopListData[i_paymentDataType -1].Quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                txtCashConfirmData.text = GetString('shop_cashconfirm',shopListData[i_paymentDataType -1].Quantity);

                sPopupCashConfirm.visible = true;
                txtGreapPoint.text = kData.greappoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'P';
            }else{
                kData.iCash += shopListData[i_paymentDataType-1].Quantity;

                txtMyCash.text = kData.iCash;

                sprCashConfirmImg.texture = SpritePool.getInstance().get("jewel_" + i_paymentDataType +".png").texture;
                txtCashConfirmValue.text = shopListData[i_paymentDataType -1].Quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                txtCashConfirmData.text = GetString('shop_cashconfirm',shopListData[i_paymentDataType -1].Quantity);

                sPopupCashConfirm.visible = true;
            }

            UpdateGemShop();
            txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
        });
	}

	// if(loginTF == 0 && this.datatype == 1){
     //    // 회원 가입 점프가 필요함
	// 	// $(location).attr('href','http://game.com/member.do?lang='+lang);
     //    return;
	// }
}

function UpdateUpgradePopup()
{
	switch(iUpgradePopupState)
	{
	case 0:	// 아무짓도 하지 않는다.
		break;
	case 1:	// 화면에 보여준다.
		if(fUpgradePopupTime >= 1)
		{
			sUpgradePopup.tween = TweenPlay(sUpgradePopup, 0.3, 0, null, {x:iMaxSizeX, y:0}, false, PIXI.tween.Easing.inBack(), cbTweenTargetOff);
			iUpgradePopupState = 0;

			if(iNewState == 1)
				iNewState = 2;
		}
		fUpgradePopupTime += deltaTime;
		break;
	}

	switch(iNewState)
	{
	case 0:	// 아무짓도 하지 않는다.
		break;
	case 1:	// 업그레이드 팝업창이 나오고 나서 대기한다.
		break;
	case 2:	// 도감 show();
		cbButtonMenuGoldShopShow();
		if(iNewType == 0)
		{
			cbButtonGoldShopLeft();
			sprCollectionShuriken[kData.iMyClickDmgLevel-1].visible = false;
		}
		else
		{
			cbButtonGoldShopRight();
			sprCollectionKunai[kData.iMySecondDmgLevel-1].visible = false;
		}
		fNewTime = 0;
		iNewState = 3;
		break;
	case 3:	// 아이템이 찍히는 애니메이션을 해야 한다.
		if(fNewTime >= 1.5)
		{
			if(iNewType == 0)
			{
				sprCollectionShuriken[kData.iMyClickDmgLevel-1].visible = true;
				sprCollectionShuriken[kData.iMyClickDmgLevel-1].scale.set(3);
				TweenMax.to(sprCollectionShuriken[kData.iMyClickDmgLevel-1], 0.5, {scaleX:1, scaleY:1, ease:Back.easeOut.config(5.0)});
			}
			else
			{
				sprCollectionKunai[kData.iMySecondDmgLevel-1].visible = true;
				sprCollectionKunai[kData.iMySecondDmgLevel-1].scale.set(3);
				TweenMax.to(sprCollectionKunai[kData.iMySecondDmgLevel-1], 0.5, {scaleX:1, scaleY:1, ease:Back.easeOut.config(5.0)});
			}
			fNewTime = 0;
			iNewState = 4;
		}
		break;
	case 4:
		if(fNewTime >= 2)
		{
			cbButtonMenuGoldShopClose();
			iNewState = 0;
		}
		break;
	}

	fNewTime += deltaTime;
}

function ShowUpgradePopup(type)
{
	sUpgradePopup.visible = true;
	sUpgradePopup.position.set(iMaxSizeX, 0);
	if(sUpgradePopup.tween != undefined)
		sUpgradePopup.tween.stop();
	sUpgradePopup.tween = TweenPlay(sUpgradePopup, 0.3, 0, null, {x:0, y:0}, false, PIXI.tween.Easing.outBack());
	iUpgradePopupState = 1;
	fUpgradePopupTime = 0;

	if(type == 0)
	{
		txtUpgradeTitile.text = GetString('shuriken_upgrade');
		txtUpgradeTitile.position.set(0, -5);
		spine_UpgradeIcon[0].visible = true;
		spine_UpgradeIcon[1].visible = false;
		SpinePlay(spine_UpgradeIcon[0], -180, 0, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_idle", 0, false);//, SPINE_INIT_NONE);
		spine_UpgradeIcon[0].skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMyClickDmgLevel-1)%25)+1, 2));
		txtUpgradeContents.text = "No." + kData.iMyClickDmgLevel +"\n" + GetString("Shuriken" + kData.iMyClickDmgLevel);

		sprPopupNew.visible = false;
		if(kData.iOptionShurikenLvMax < kData.iMyClickDmgLevel)
		{
			sprPopupNew.visible = true;
			txtUpgradeTitile.position.set(100, -5);
			kData.iOptionShurikenLvMax = kData.iMyClickDmgLevel;
			// 도장 찍는 애니메이션 진행..
			SaveDataInClient();

			iNewState = 1;
			iNewType = 0;
		}
	}
	else
	{
		txtUpgradeTitile.text = GetString('kunai_upgrade') + '!';
		txtUpgradeTitile.position.set(0, -5);
		spine_UpgradeIcon[0].visible = false;
		spine_UpgradeIcon[1].visible = true;
		SpinePlay(spine_UpgradeIcon[1], -180, 0, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_idle", 0, false);//,
		spine_UpgradeIcon[1].skeleton.setAttachment("Kunai", "Kunai0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));
		txtUpgradeContents.text = "No." + kData.iMySecondDmgLevel +"\n" + GetString("Kunai" + kData.iMySecondDmgLevel);

		sprPopupNew.visible = false;
		if(kData.iOptionKunaiLvMax < kData.iMySecondDmgLevel)
		{
			sprPopupNew.visible = true;
			txtUpgradeTitile.position.set(100, -5);
			kData.iOptionKunaiLvMax = kData.iMySecondDmgLevel;
			// 도장 찍는 애니메이션 진행..
			SaveDataInClient();

			iNewState = 1;
			iNewType = 1;
		}
	}
}

function UpdateBGCoin()
{
	if(spine_under_coin.visible == false) return;

	switch(spineBGCoinState)
	{
	case 0:
		if(fBGCoinTime >= 0)
		{
			spine_under_coin.visible = true;
			spineBGCoinState = 1;
			fBGCoinTime = 0;
			SpinePlay(spine_under_coin, iCenterSizeX, iCenterSizeY + 450, "under_coin_1_in", 1, false);
		}
		else
			fBGCoinTime += deltaTime;
		break;
	case 1:	// 대기중..
		break;
	case 2:
		if(fBGCoinTime >= 5)
		{
			spineBGCoinState = 3;
			fBGCoinTime = 0;
			SpinePlay(spine_under_coin, iCenterSizeX, iCenterSizeY + 450, "under_coin_2_in", 2, false);
		}
		else
			fBGCoinTime += deltaTime;
		break;
	case 3:
		break;
	case 4:
		if(fBGCoinTime >= 5)
		{
			spineBGCoinState = 5;
			fBGCoinTime = 0;
			SpinePlay(spine_under_coin, iCenterSizeX, iCenterSizeY + 450, "under_coin_3_in", 3, false);
		}
		else
			fBGCoinTime += deltaTime;
		break;
	case 5:
		break;
	case 6:
		if(fBGCoinTime >= 5)
		{
			spineBGCoinState = 7;
			fBGCoinTime = 0;
			SpinePlay(spine_under_coin, iCenterSizeX, iCenterSizeY + 450, "under_coin_3_out", 4, false);
		}
		else
			fBGCoinTime += deltaTime;
		break;
	case 7:
		if(fBGCoinTime >= 5)
		{
			spineBGCoinState = 0;
			fBGCoinTime = 0;
		}
		else
			fBGCoinTime += deltaTime;
		break;
	}
}

function FeverOn() {
    iFeverState = 1;
    fFeverTime = 0;
    iFeverCnt = 0;
    TweenLite.to(spine_neko_shadow, 0.1, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
    TweenLite.to(sprFeverGauge, 0.1, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});

    // TweenPlay(spine_neko_shadow, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
    // TweenPlay(sprFeverGauge, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
    SpinePlay(spine_neko_character, null, null, "character_fever_in", 2, false);

    // button 치우기
    sprGoldShopShuriken.interactive = false;
    sprGoldShopKunai.interactive = false;

    TweenMax.to(sprGoldShopShuriken, 0.5 ,{x:-200,ease:Linear.easeNone});
    TweenMax.to(sprGoldShopKunai, 0.5,{x:720+200,ease:Linear.easeNone});
    //sprGlodShopShuriken.visible = false;

	TweenLite.to(spine_under_coin, 0.5, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
    // TweenPlay(spine_under_coin, 0.5, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
    SESoundPlay(BGM_Fever);

    spine_fever_eff2.visible = false;
}

var ttTime;
function UpdateFeverGauge()
{
	if(iFeverCnt != iFeverCntOld)
	{
		iFeverCntOld = iFeverCnt;

		sprFeverMask.clear();
		sprFeverMask.beginFill(0x8bc5ff, 0.8);

		sprFeverMask.moveTo(-152, -50);
		sprFeverMask.lineTo(-152 + (304 * (iFeverCnt / clientData.iSkillValue[6])), -50);
		sprFeverMask.lineTo(0, 200);
	}

	switch(iFeverState)
	{
	case 0:	// 피버모드가 아니다.
		if(iFeverCnt >= clientData.iSkillValue[6])
		{
			if(!spine_fever_eff1.visible){
				spine_fever_eff1.state.clearTracks();
				SpinePlay(spine_fever_eff1,null,null,'animation',0,true);
			}

			if(!spine_fever_eff2.visible){
				spine_fever_eff2.state.clearTracks();
				SpinePlay(spine_fever_eff2,null,null,'animation',0,true);
			}

			sprFeverGauge.visible = false;

            sprFeverBtn.visible = true;
		}
		break;
	case 1:	// 피버모드 진입 연출..
		break;
	case 2: // 5초동안 피버모드 발동..
		if(fFeverTime >= fFeverTimeMax)
		{
			iFeverState = 3;
			SpinePlay(spine_neko_character, null, null, "character_fever_out", 3, false);

            sprGoldShopShuriken.interactive = true;
            sprGoldShopKunai.interactive = true;

            CB_ButtonUp('kunai_touchMe');
            CB_ButtonUp('shuriken_touchMe');

            TweenMax.to(sprGoldShopShuriken,0.5,{x:iCenterSizeX - 242,ease:Linear.easeNone});
            TweenMax.to(sprGoldShopKunai,0.5,{x:iCenterSizeX + 242,ease:Linear.easeNone});

			spineBGCoinState = 0;
			fBGCoinTime = 0;
			spine_under_coin.visible = true;
			spine_under_coin.alpha = 0;
			SpinePlay(spine_under_coin_fever, null, null, "under_coin_fever_out", 2, false);
		//	TweenPlay(spine_under_coin_fever, 0.5, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
		}
		else
		{
			if(fFeverTime + deltaTime < fFeverTimeMax)
				ttTime = deltaTime;
			else
				ttTime = fFeverTimeMax - fFeverTime;
			fFeverTime += ttTime;

			var nV = XMultiplyEx(clientData.nMyClickDmg, ttTime*clientData.iSkillValue[5]/4);
			nDPS = XPlus(nDPS, nV);
			kData.nMyMoney = XPlus(kData.nMyMoney, nV);
			UpdateSound();
			kData.nOptionGlod = XPlus(kData.nOptionGlod, nV);
			nToadHP = XMinus(nToadHP, nV);
			UpdateToadHP();
			CreateCoin();
		}
		break;
	case 3:
		break;
	}
	// 피버체크..
//	if(bFeverMode == false)
//	{
		// character_fever_attack
		// character_fever_in
		// character_fever_out
//	}
}

function UpdateBreakthrough()
{
	switch(iBreakthroughState)
	{
	case 0:	// 아무짓도 하지 않는다.
        sprBreakthroughBG.alpha = 0;
		break;
	case 1: // 애니메이션을 시킨다.
		if(sprBreakthroughBG.tween1 != undefined)
			sprBreakthroughBG.tween1.stop();
		if(sprBreakthroughBG.tween2 != undefined)
			sprBreakthroughBG.tween2.stop();
		if(txtBreakthrough.tween1 != undefined)
			txtBreakthrough.tween1.stop();
		if(txtBreakthrough.tween2 != undefined)
			txtBreakthrough.tween2.stop();

		sprBreakthroughBG.tween1 = TweenPlay(sprBreakthroughBG, 0.3, 0, null, {alpha:0.8}, false, PIXI.tween.Easing.linear());
		sprBreakthroughBG.tween2 = TweenPlay(sprBreakthroughBG, 0.3, 1.3, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenBreakthrough);
		txtBreakthrough.text = XNumViewStringEx(clientData.iMyMoneyLengthNum);
		txtBreakthrough.position.set(iCenterSizeX, iCenterSizeY + 700);
		txtBreakthrough.tween1 = TweenPlay(txtBreakthrough, 0.3, 0, null, {y:iCenterSizeY}, false, PIXI.tween.Easing.inCubic());
		txtBreakthrough.tween2 = TweenPlay(txtBreakthrough, 0.3, 1.3, null, {y:iCenterSizeY - 700}, false, PIXI.tween.Easing.outCubic());
		iBreakthroughState = 2;
		break;
	case 2:
		break;
	}
}

function cbTweenBreakthrough()
{
	iBreakthroughState = 0;
}

// 돌파 사운드 처리..
function UpdateSound()
{
	if(kData.nMyMoney.length >= 4)
	{
		if(kData.nMyMoney.length >= clientData.iMyMoneyLengthNum + 3)
		{
			clientData.iMyMoneyLengthNum = (Math.floor(kData.nMyMoney.length/3) * 3) + 1;
			iBreakthroughState = 1;
			SESoundPlay(SE_num);
		}
	}
}

var bADSound = false;
function UpdateAD()
{
	if(iTutorialState > 0) return;

	switch(iADState)
	{
		case 0: // 수리검을 날릴건지 대기한다.
			fADTimeDelay += deltaTime;
			if(fADTimeDelay >= fADCreateTime)
			{
				SESoundPlay(SE_bonusfly);
				iADState = 1;
				fADTimeDelay = fADViewTime;
				bADSound = false;
				spine_ad_view_btn.visible = true;
				spine_ad_view_btn.alpha = 1;
				SpinePlay(spine_ad_view_btn, 65, iCenterSizeY, "ad_view_btn_in", 1, false);
			}
			break;
		case 1: // 수리검이 날아가는중..
			break;
		case 2: // 수리검이 박혔을때
			fADTimeDelay -= deltaTime;

			// 5초부터 사운드경고음이 들리게
			if(fADTimeDelay <= 10.99)
			{
				txtADCount.visible = true;
				txtADCount.text = Math.floor(fADTimeDelay);
			}

			if(fADTimeDelay <= 5)
			{
				if(fADTimeDelay > 4 &&  bADSound == true)
				{
					fADSound = false;
					SESoundPlay(SE_bonusCount);
				}
				else if(fADTimeDelay > 3 &&  bADSound == false)
				{
					fADSound = true;
					SESoundPlay(SE_bonusCount);
				}
				else if(fADTimeDelay > 2 &&  bADSound == true)
				{
					fADSound = false;
					SESoundPlay(SE_bonusCount);
				}
				else if(fADTimeDelay > 1 &&  bADSound == false)
				{
					fADSound = true;
					SESoundPlay(SE_bonusCount);
				}
				else if(fADTimeDelay > 0 &&  bADSound == true)
				{
					fADSound = false;
					SESoundPlay(SE_bonusCount);
				}
			}

		//	if(fADTimeDelay >= fADViewTime)
			if(fADTimeDelay <= 0)
			{
				iADState = 0;
				fADTimeDelay = 0;
				txtADCount.visible = false;
				TweenLite.to(spine_ad_view_btn, 0.1, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
				// TweenPlay(spine_ad_view_btn, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
			}
			break;
		case 3:	// 수리검을 클릭했을때..
			break;
	}
}

function cbButtonADClick()
{
	if(iADState <= 2)
	{
		iADState = 3;
		fADTimeDelay = 0;
		TweenLite.to(spine_ad_view_btn, 0.1, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
		// TweenPlay(spine_ad_view_btn, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);

		// if(Math.floor(Math.random() * 100) < iAD1Create)
		// {
		// 	iADType = Math.floor(Math.random() * 3);	// 광고 종류 선택..
		//
		// 	sADView1.visible = true;
		// 	TweenPlay(sADView1, 0.1, 0, null, {alpha:1}, false, PIXI.tween.Easing.linear());
		// 	switch(iADType)
		// 	{
		// 	case 0: // 횓득보석
		// 		txtAD1.text = GetString("AddCash") + " : " + (kData.iToadLevel * 10);
		// 		sprADIcon1.visible = true;
		// 		sprADIcon1.texture = SpritePool.getInstance().get("popup_btn_jewel.png").texture;
		// 		sprADIcon1.position.set(txtAD1.width/2+30, -5);
		// 		break;
		// 	case 1: // 획득 골드
		// 		var nG;
		// 		if(IsXMinus(clientData.nNextClickDmgBuyMoney, clientData.nNextSecondDmgBuyMoney) == true)
		// 			nG = XMultiplyEx(clientData.nNextClickDmgBuyMoney, 0.25);
		// 		else
		// 			nG = XMultiplyEx(clientData.nNextSecondDmgBuyMoney, 0.25);
		// 		txtAD1.text = GetString("AddGold") + " : " + XNumViewString(nG);
		// 		sprADIcon1.visible = true;
		// 		sprADIcon1.texture = SpritePool.getInstance().get("gold_icon.png").texture;
		// 		sprADIcon1.position.set(txtAD1.width/2+30, -5);
		// 		break;
		// 	case 2: // 인법 게이지 증가
		// 		txtAD1.text = GetString("AddGauge") + " : " + "MAX";
		// 		sprADIcon1.visible = false;
		// 		break;
		// 	}
		// }
		// else
		{
			iADType = Math.floor(Math.random() * 2);	// 광고 종류 선택..

			sADView2.visible = true;
			TweenLite.to(sADView2, 0.1, {alpha:1, ease:Linear.easeNone});
			// TweenPlay(sADView2, 0.1, 0, null, {alpha:1}, false, PIXI.tween.Easing.linear());
			switch(iADType)
			{
			case 0: // 횓득보석
				txtAD2.text = GetString("AddCash") + " : " + kData.iToadLevel;
				sprADIcon2.visible = true;
				sprADIcon2.texture = SpritePool.getInstance().get("popup_btn_jewel.png").texture;
				sprADIcon2.position.set(txtAD2.width/2+30, -5);
				break;
			case 1: // 획득 골드
				var nG;
				if(IsXMinus(clientData.nNextClickDmgBuyMoney, clientData.nNextSecondDmgBuyMoney) == true)
					nG = XMultiplyEx(clientData.nNextClickDmgBuyMoney, 0.1);
				else
					nG = XMultiplyEx(clientData.nNextSecondDmgBuyMoney, 0.1);
				txtAD2.text = GetString("AddGold") + " : " + XNumViewString(nG);
				sprADIcon2.visible = true;
				sprADIcon2.texture = SpritePool.getInstance().get("gold_icon.png").texture;
				sprADIcon2.position.set(txtAD2.width/2+30, -5);
				break;
		//	case 2: // 인법 게이지 증가
		//		txtAD2.text = GetString("AddGauge") + " : " + "10%";
		//		break;
			}
		}
	}
}

// 작은보상..
function cbButtonADView2OK()
{
	switch(iADType)
	{
	case 0: // 횓득보석
		kData.iCash += kData.iToadLevel;
		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		SaveDataInClient();
		break;
	case 1: // 획득 골드
		var nG;
		if(IsXMinus(clientData.nNextClickDmgBuyMoney, clientData.nNextSecondDmgBuyMoney) == true)
			nG = XMultiplyEx(clientData.nNextClickDmgBuyMoney, 0.1);
		else
			nG = XMultiplyEx(clientData.nNextSecondDmgBuyMoney, 0.1);
		kData.nMyMoney = XPlus(kData.nMyMoney, nG);
		UpdateSound();
		SaveDataInClient();
		break;
//	case 2: // 인법 게이지 증가 : 작은팝업창에서는 없어졌음..
//		break;
	}
	iADState = 0;
	fADTimeDelay = 0;
	// TweenPlay(sADView2, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
	TweenLite.to(sADView2, 0.1, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
}

// 광고 보기 : 큰보상..
// function cbButtonADView1OK()
// {
// 	switch(iADType)
// 	{
// 	case 0: // 횓득보석
// 		kData.iCash += kData.iToadLevel * 10;
// 		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
// 		SaveDataInClient();
// 		break;
// 	case 1: // 획득 골드
// 		var nG;
// 		if(IsXMinus(clientData.nNextClickDmgBuyMoney, clientData.nNextSecondDmgBuyMoney) == true)
// 			nG = XMultiplyEx(clientData.nNextClickDmgBuyMoney, 0.25);
// 		else
// 			nG = XMultiplyEx(clientData.nNextSecondDmgBuyMoney, 0.25);
// 		kData.nMyMoney = XPlus(kData.nMyMoney, nG);
// 		UpdateSound();
// 		SaveDataInClient();
// 		break;
// 	case 2: // 인법 게이지 MAX 증가
// 		iFeverCnt = clientData.iSkillValue[6];
// 		break;
// 	}
// 	iADState = 0;
// 	fADTimeDelay = 0;
// 	TweenPlay(sADView1, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
// }
//
// function cbButtonADView1Close()
// {
// 	iADState = 0;
// 	fADTimeDelay = 0;
// 	TweenPlay(sADView1, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
// }

var bRebirth = false;
function cbButtonGemShopPopupRebirth()
{
	if(bRebirth == false)
	{
		bRebirth = true;
		TweenLite.to(sprRebirthWhite, 0.5, {alpha:1, ease:Linear.easeNone, onComplete:cbTweenRebirthWhite});
		// TweenPlay(sprRebirthWhite, 0.5, 0, null, {alpha:1}, false, PIXI.tween.Easing.linear(), cbTweenRebirthWhite);
		setTimeout(cbTweenRebirthWhite2, 1500);
	}
}


// 환생 초기화
function cbTweenRebirthWhite()
{
	// 초기화 셋팅..
	bRebirth = false;
	//kData.iCash +=  Math.floor(Math.pow(kData.iToadLevel, 2) / 2 * iHeroRebirthCash);
	kData.iCash += Math.floor((kData.iToadLevel/2) * (kData.iToadLevel +1));
	txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));

	kData.iOptionRebirthCnt++;

	kData.nMyMoney = [0];
//	clientData.nMyClickDmg = XNumToNum(iItemBaseDmg);
	kData.iMyClickDmgLevel = 1;
	kData.iMyClickDmgLevelSub = 1;
	//kData.nBaseClickDmg = XNumToNum(iItemBaseDmg);
	//clientData.nMyClickDmg = XMultiplyEx(kData.nBaseClickDmg, clientData.iSkillValue[0]/100);
	//clientData.nNextClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * (kData.iMyClickDmgLevelSub + 1)), clientData.iSkillValue[0]/100);
    ShurikenCalc();
	clientData.nClickDmgMultiply = [2];
	//kData.nBaseClickDmgBuyMoney = XMultiply(kData.nBaseClickDmg, clientData.nClickDmgMultiply);
	//clientData.nNextClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney, fItemBuyMoney * (kData.iMyClickDmgLevelSub + 1));

	// 초당 데미지
//	clientData.nMySecondDmg = XNumToNum(iItemBaseDmg);
	kData.iMySecondDmgLevel = 1;
	kData.iMySecondDmgLevelSub = 1;
	// kData.nBaseSecondDmg = XNumToNum(iItemBaseDmg);
	// clientData.nMySecondDmg = XMultiplyEx(kData.nBaseSecondDmg, clientData.iSkillValue[1]/100);
	// clientData.nNextSecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * (kData.iMySecondDmgLevelSub + 1)), clientData.iSkillValue[1]/100);
    KunaiCalc();
	clientData.nSecondDmgMultiply = [2];
	// kData.nBaseSecondDmgBuyMoney = XMultiply(kData.nBaseSecondDmg, clientData.nSecondDmgMultiply);
	// clientData.nNextSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmgBuyMoney, fItemBuyMoney * (kData.iMySecondDmgLevelSub + 1));

	if(kData.RankVal === undefined)
		kData.RankVal = 0;

	kData.RankVal += (kData.iToadLevel-1);

	kData.iToadLevel = 1;
	clientData.nToadHPIncreate = [2];
    CalcToadHPMax();
	/*clientData.nToadHPMax = XMultiply(XNumToNum(iToadBase), clientData.nToadHPIncreate);
	nToadHP = XMultiply(XNumToNum(iToadBase), clientData.nToadHPIncreate);
	iToadHPMax = GetVaule(clientData.nToadHPMax, nToadHP);*/

	iToadState = TOAD_IN;
	spine_toad.state.timeScale = 2;
	SpinePlay(spine_toad, iCenterSizeX, iCenterSizeY - 410, "toad_in", 1, false);
	SetToadTint();

	clientData.iMyMoneyLengthNum = 1;
	sprShurikenMax.visible = false;
	sprKunaiMax.visible = false;

	networkManager.SaveRaking();

	CB_ButtonUp('kunai_touchMe');
	CB_ButtonUp('shuriken_touchMe');

	SaveDataInClient();

	cbButtonGemShopPopupClose();
	cbButtonMenuGemShopClose();
}

function cbTweenRebirthWhite2()
{
	// 여기서 화면정보를 갱신한다.
	txtToadLevel.text = kData.iToadLevel.toString();
	UpdateInfo2();
	// TweenPlay(sprRebirthWhite, 1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear());
	TweenLite.to(sprRebirthWhite, 1, {alpha:0, ease:Linear.easeNone});
}

function cbButtonGemShopPopupClose()
{
	TweenLite.to(sMenuGemShopPopup, 0.1, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
	// TweenPlay(sMenuGemShopPopup, 0.1, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
}

function cbButtonGemShopRight()
{
	sMenuGemShopPage1.visible = false;
	sMenuGemShopPage2.visible = true;
}

function cbButtonGemShopLeft()
{
	sMenuGemShopPage1.visible = true;
	sMenuGemShopPage2.visible = false;
}

// 수리검 데미지 증폭
function cbButtonGemShopBuy0()
{
	if(kData.iCash >= (kData.iSkillLv[0] + 1) * iSkillCashBase[0])
	{
		kData.iCash -= (kData.iSkillLv[0] + 1) * iSkillCashBase[0];
		clientData.iSkillValue[0] += ((Math.floor((kData.iSkillLv[0] + 1)/iSkillVauleLv0Division)+1)*iSkillVauleIncreate[0]);
		kData.iSkillLv[0]++;

		// if(kData.iMyClickDmgLevelSub > 1)
		// 	clientData.nMyClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * kData.iMyClickDmgLevelSub), clientData.iSkillValue[0]/100);
		// else if(kData.iMyClickDmgLevelSub == 1)
		// 	clientData.nMyClickDmg = XMultiplyEx(kData.nBaseClickDmg, clientData.iSkillValue[0]/100);
		// if(kData.iMyClickDmgLevelSub + 1 <= 5)
		// 	clientData.nNextClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * (kData.iMyClickDmgLevelSub + 1)), clientData.iSkillValue[0]/100);
		// else
		// 	clientData.nNextClickDmg = XMultiplyEx(XMultiply(kData.nBaseClickDmg, XNumToNum(3)), clientData.iSkillValue[0]/100);

        ShurikenCalc();
        networkManager.ForcedSaveData();
		//SaveDataInClient();

		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		UpdateInfo2();
		UpdateGemShop();
		SESoundPlay(SE_Achievements,true);
	}
	else
	{
		SESoundPlay(SE_empty);
	}
}

//쿠나이 데미지 증폭
function cbButtonGemShopBuy1()
{
	if(kData.iCash >= (kData.iSkillLv[1] + 1) * iSkillCashBase[1])
	{
		kData.iCash -= (kData.iSkillLv[1] + 1) * iSkillCashBase[1];
		clientData.iSkillValue[1] += ((Math.floor((kData.iSkillLv[1] + 1)/iSkillVauleLv1Division)+1)*iSkillVauleIncreate[1]);
		kData.iSkillLv[1]++;

		// if(kData.iMySecondDmgLevelSub > 1)
		// 	clientData.nMySecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * kData.iMySecondDmgLevelSub), clientData.iSkillValue[1]/100);
		// else if(kData.iMySecondDmgLevelSub == 1)
		// 	clientData.nMySecondDmg = XMultiplyEx(kData.nBaseSecondDmg, clientData.iSkillValue[1]/100);
		// if(kData.iMySecondDmgLevelSub + 1 <= 5)
		// 	clientData.nNextSecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * (kData.iMySecondDmgLevelSub + 1)), clientData.iSkillValue[1]/100);
		// else
		// 	clientData.nNextSecondDmg = XMultiplyEx(XMultiply(kData.nBaseSecondDmg, XNumToNum(3)), clientData.iSkillValue[1]/100);

		KunaiCalc();
        networkManager.ForcedSaveData();
		//SaveDataInClient();

		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		UpdateInfo2();
		UpdateGemShop();
        SESoundPlay(SE_Achievements,true);
	}
	else
	{
		SESoundPlay(SE_empty);
	}
}

//그림자 속도 증폭
function cbButtonGemShopBuy2()
{
	if(kData.iCash >= (Math.pow(10,kData.iSkillLv[2]) * iSkillCashBase[2]))
	{
		kData.iCash -= (Math.pow(10,kData.iSkillLv[2]) * iSkillCashBase[2]);
		clientData.iSkillValue[2] += iSkillVauleIncreate[2];
		spine_neko_shadow.state.timeScale = clientData.iSkillValue[2] / 100;
		kData.iSkillLv[2]++;

        networkManager.ForcedSaveData();
		//SaveDataInClient();
		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		UpdateInfo2();
		UpdateGemShop();
		SESoundPlay(SE_Achievements,true);
	}
	else
	{
		SESoundPlay(SE_empty);
	}
}

//수리검 크리티컬 증폭
function cbButtonGemShopBuy3()
{
	if(kData.iCash >= (kData.iSkillLv[3] + 1) * iSkillCashBase[3])
	{
		kData.iCash -= (kData.iSkillLv[3] + 1) * iSkillCashBase[3];
		clientData.iSkillValue[3] += iSkillVauleIncreate[3];
		kData.iSkillLv[3]++;

        networkManager.ForcedSaveData();
		//SaveDataInClient();
		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		UpdateGemShop();
		SESoundPlay(SE_Achievements,true);
	}
	else
	{
		SESoundPlay(SE_empty);
	}
}

//수리검 크리티컬 확률
function cbButtonGemShopBuy4()
{
	if(kData.iCash >= (kData.iSkillLv[4] + 1) * iSkillCashBase[4])
	{
		kData.iCash -= (kData.iSkillLv[4] + 1) * iSkillCashBase[4];
		clientData.iSkillValue[4] += iSkillVauleIncreate[4];
		kData.iSkillLv[4]++;

        networkManager.ForcedSaveData();
//		SaveDataInClient();
		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		UpdateGemShop();
		SESoundPlay(SE_Achievements,true);
	}
	else
	{
		SESoundPlay(SE_empty);
	}
}

//인법 피해량 증폭
function cbButtonGemShopBuy5()
{
	if(kData.iCash >= (kData.iSkillLv[5] + 1) * iSkillCashBase[5])
	{
		kData.iCash -= (kData.iSkillLv[5] + 1) * iSkillCashBase[5];
		clientData.iSkillValue[5] += iSkillVauleIncreate[5];
		kData.iSkillLv[5]++;

        networkManager.ForcedSaveData();
		//SaveDataInClient();
		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		UpdateGemShop();
		SESoundPlay(SE_Achievements,true);
	}
	else
	{
		SESoundPlay(SE_empty);
	}
}

//인법 게이지 단축
function cbButtonGemShopBuy6()
{
	if(kData.iCash >= (kData.iSkillLv[6] + 1) * iSkillCashBase[6])
	{
		kData.iCash -= (kData.iSkillLv[6] + 1) * iSkillCashBase[6];
		clientData.iSkillValue[6] -= iSkillVauleIncreate[6];
		kData.iSkillLv[6]++;

        networkManager.ForcedSaveData();
		//SaveDataInClient();
		txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
		UpdateGemShop();
		SESoundPlay(SE_Achievements,true);
	}
	else
	{
		SESoundPlay(SE_empty);
	}
}

function cbButtonGemShopRebirth()
{
	//txtGetShopPopupCash.text = XNumViewString(XNumToNum(Math.floor(Math.pow(kData.iToadLevel, 2) / 2 * iHeroRebirthCash)));
    txtGetShopPopupCash.text = XNumViewString(XNumToNum(Math.floor((kData.iToadLevel/2) * (kData.iToadLevel +1))));
	sMenuGemShopPopup.visible = true;
	TweenLite.to(sMenuGemShopPopup, 0.1, {alpha:1, ease:Linear.easeNone});
	// TweenPlay(sMenuGemShopPopup, 0.1, 0, null, {alpha:1}, false, PIXI.tween.Easing.linear());
}

function cbButtonMenuGemShopShow()
{
	SESoundPlay(SE_Shop);
	sprPopupWhite.visible = true;
	sprPopupWhite.alpha = 0;
	TweenLite.to(sprPopupWhite, 0.5, {alpha:0.5, ease:Linear.easeNone});
	// TweenPlay(sprPopupWhite, 0.5, 0, null, {alpha:0.5}, false, PIXI.tween.Easing.linear());

	sMenuGemShop.visible = true;
	sMenuGemShop.position.set(iMaxSizeX, 0);
	TweenLite.to(sMenuGemShop, 0.5, {x:0, y:0, ease:Back.easeOut});
	// TweenPlay(sMenuGemShop, 0.5, 0, null, {x:0, y:0}, false, PIXI.tween.Easing.outBack());

	UpdateGemShop();
}

function CB_ButtonMenuRanking() {
	SESoundPlay(SE_Shop);
    networkManager.LoadRanking(CB_ShowRanking);
    //sGame.add(sNetworkLoading);
}

var showRankingUP_day = false;
var showRankingUp_All = false;

function CB_ShowRanking() {
	if(rankingPopupData.oldRank != rankingPopupData.newRank)
        showRankingUP_day = true;

	if(rankingPopupData.oldCuRank != rankingPopupData.newCuRank)
        showRankingUp_All = true;

    CB_ChangeRankingView(RANKING_STATE.DAILY);

	if(!sRanking.visible)
    	sRanking.visible = true;
}

function CB_ChangeRankingView(_rankingState) {

    if(_rankingState.type == 'click' || _rankingState.type == 'tap')
        _rankingState = this.btn_state;

    state_ranking = _rankingState;
    switch (state_ranking){
        case RANKING_STATE.DAILY:
            sprRank_RankingTaps[RANKING_STATE.TOTAL].alpha = 0;
            sprRank_RankingTaps[RANKING_STATE.DAILY].alpha = 1;

            txtRank_RankingTaps[RANKING_STATE.TOTAL].style =
                {font:'40px ' + tbTTF[lang],  fill:'#9e643f',
                    stroke:'#47250c', strokeThickness:2};

            txtRank_RankingTaps[RANKING_STATE.DAILY].style =
                {font:'40px ' + tbTTF[lang], fill:'#ffffff',
                    stroke:'#000000', strokeThickness:2};
            // console.log('RANKING_STATE.DAILY');
            break;
        case RANKING_STATE.TOTAL:
            sprRank_RankingTaps[RANKING_STATE.TOTAL].alpha = 1;
            sprRank_RankingTaps[RANKING_STATE.DAILY].alpha = 0;

            txtRank_RankingTaps[RANKING_STATE.DAILY].style =
                {font:'40px ' + tbTTF[lang],  fill:'#9e643f',
                    stroke:'#47250c', strokeThickness:2};

            txtRank_RankingTaps[RANKING_STATE.TOTAL].style =
                {font:'40px ' + tbTTF[lang], fill:'#ffffff',
                    stroke:'#000000', strokeThickness:2};
            // console.log('RANKING_STATE.TOTAL');
            break;
    }

    ChangeRankingView();
}

// 랭킹 View 정리
function ChangeRankingView() {
    if(state_ranking == RANKING_STATE.DAILY)
        CheckingShowRankingView(rankingData.day);
    else
        CheckingShowRankingView(rankingData.all);
}

function CheckingShowRankingView(_rankingListData) {
    // _rankingListData = rankingData.day 아니면 rankingData.all
    var bHasMyRank = false;

    for(var i=0,imax= sprRank_PanelList.length;i<imax;++i){
        if(!sprRank_PanelList[i].visible)
            sprRank_PanelList[i].visible = true;
        sprRank_PanelList[i].interactive = false;

        if(i != 0)
            sprRank_PanelList[i].texture =
                SpritePool.getInstance().get('ranking/panel_other.png').texture;
        //sprRank_PanelList[i].on.clear

        if(_rankingListData !== undefined && _rankingListData != null){
            if(i < _rankingListData.length){
                if(_rankingListData[i]['rank'] !== undefined && _rankingListData[i]['rank'] != null && _rankingListData[i]['rank'] <= 3 && _rankingListData[i]['rank'] > 0){
                    sprRank_RankingMedalList[i].texture =
                        SpritePool.getInstance().get('ranking/medal_' + _rankingListData[i]['rank'] +'_small.png').texture;
                    sprRank_RankingMedalList[i].visible = true;

                    if(i == 0)
                        sprRank_PanelList[i].texture =
                            SpritePool.getInstance().get('ranking/panel_top.png').texture;
                }else if(sprRank_RankingMedalList[i] !== undefined && sprRank_RankingMedalList[i] != null)
                    sprRank_RankingMedalList[i].visible = false;

                txtRank_UserRankList[i].text = _rankingListData[i]['rank'];
                txtRank_UserNameList[i].text = _rankingListData[i]['user_id'];
                txtRank_RankingPointList[i].text = _rankingListData[i]['score'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                if(loginTF == 1 && rankingData.myid == _rankingListData[i]['user_id']){
                    bHasMyRank = true;

                	if(state_ranking == RANKING_STATE.DAILY){
                        if(rankingPopupData !== undefined && rankingPopupData != null){
                        	if(rankingPopupData.newRank > 0 && rankingPopupData.newRank <= 3){
                                sprRank_Medal.texture = PIXI.Sprite.fromFrame('ranking/medal_'+ rankingPopupData.newRank + '.png').texture;
                                sprRank_Medal.alpha = 0;
                                sprRank_Medal.visible = true;

                                TweenMax.to(sprRank_Medal, 2, {alpha:'1' , onComplete:CB_RankMedalViewComplete,ease:Linear.easeNone});
							}

                            if(rankingPopupData.oldRank != rankingPopupData.newRank && rankingPopupData.oldRank != 0 && rankingPopupData.newRank != 0
								&& showRankingUP_day){
                                // 랭킹 변동 있음 rank up 연출
                                txtRank_RankChange[0].text = rankingPopupData.oldRank.toString();
                                txtRank_RankChange[0].position.set(-60 - txtRank_RankChange[0].width, 270);
                                txtRank_RankChange[1].text = rankingPopupData.newRank.toString();

                                sRankUp.alpha = 1;
                                sRankUp.visible = true;

                                SpinePlay(spineRank_RankUp,null,null,'rank_up_eff_in',0,false);
                                TweenMax.to(sRankUp, 2, {alpha:'0', onComplete:sRankUpViewComplete ,ease:Linear.easeNone});

                                rankingPopupData.oldRank = null;
                                rankingPopupData.newRank = null;
                                rankingPopupData.oldScore = null;
                                rankingPopupData.newScore = null;
                                showRankingUP_day = false;
                            }
                        }
					}else if(state_ranking == RANKING_STATE.TOTAL){
                        if(rankingPopupData !== undefined && rankingPopupData != null){
                            if(rankingPopupData.newCuRank > 0 && rankingPopupData.newCuRank <= 3){
                                sprRank_Medal.texture = PIXI.Sprite.fromFrame('ranking/medal_'+ rankingPopupData.newCuRank + '.png').texture;
                                sprRank_Medal.alpha = 0;
                                sprRank_Medal.visible = true;

                                TweenMax.to(sprRank_Medal, 2, {alpha:'1' , onComplete:CB_RankMedalViewComplete,ease:Linear.easeNone});
                            }

                            if(rankingPopupData.oldCuRank != rankingPopupData.newCuRank && rankingPopupData.oldCuRank != 0 && rankingPopupData.newCuRank != 0 &&
                                showRankingUp_All){
                                // 랭킹 변동 있음 rank up 연출
                                txtRank_RankChange[0].text = rankingPopupData.oldCuRank.toString();
                                txtRank_RankChange[0].position.set(-60 - txtRank_RankChange[0].width, 270);
                                txtRank_RankChange[1].text = rankingPopupData.newCuRank.toString();

                                sRankUp.alpha = 1;
                                sRankUp.visible = true;

                                SpinePlay(spineRank_RankUp,null,null,'rank_up_eff_in',0,false);
                                TweenMax.to(sRankUp, 2, {alpha:'0', onComplete:sRankUpViewComplete ,ease:Linear.easeNone});

                                rankingPopupData.oldCuRank = null;
                                rankingPopupData.newCuRank = null;
                                rankingPopupData.oldCuScore = null;
                                rankingPopupData.newCuScore = null;

                                showRankingUp_All = false;
                            }
                        }
					}

                    sprRank_RankingMyEff.position.set(sprRank_PanelList[i].x,sprRank_PanelList[i].y -5);
                    sprRank_RankingMyEff.visible = true;

                    if(_rankingListData[i]['rank'] != 1){
                        sprRank_PanelList[i].texture =
                            SpritePool.getInstance().get('ranking/panel_me.png').texture;
                    }
                }

                if(i == sprRank_PanelList.length-1 && !bHasMyRank){
                    // 혹시 마지막일 경우
                    MyRankPanel(i);
                }
            }else{
                if(i == _rankingListData.length && !bHasMyRank){
                    if(sprRank_RankingMedalList[i] !== undefined && sprRank_RankingMedalList[i] != null)
                        sprRank_RankingMedalList[i].visible = false;

                    MyRankPanel(i);
                }else{
                    if(sprRank_RankingMedalList[i] !== undefined && sprRank_RankingMedalList[i] != null)
                        sprRank_RankingMedalList[i].visible = false;

                    sprRank_PanelList[i].visible = false;
                }
            }
        }else{
            // console.log('data is null');
            // rakning 데이터 못 받을 경우 모두 비활성화
            // 혹은 초기화되서 아무것도 없을 경우
            if(sprRank_RankingMedalList[i] !== undefined && sprRank_RankingMedalList[i] != null)
                sprRank_RankingMedalList[i].visible = false;
            sprRank_PanelList[i].visible = false;
        }
    }
}

function sRankUpViewComplete() {
    sRankUp.visible = false;
}

function CB_RankMedalViewComplete() {
	sprRank_Medal.visible = false;
}

function MyRankPanel(_iData) {
    sprRank_RankingMyEff.position.set(sprRank_PanelList[_iData].x,sprRank_PanelList[_iData].y -5);
    sprRank_RankingMyEff.visible = true;

    if(loginTF == 1){
        // rankingPopupData;

        sprRank_PanelList[_iData].texture =
            SpritePool.getInstance().get('ranking/panel_empty.png').texture;
        txtRank_UserRankList[_iData].text = '...';
        txtRank_UserNameList[_iData].text = rankingData.myid;
        txtRank_RankingPointList[_iData].text = '0';

    }else{
        // sign up
        sprRank_PanelList[_iData].texture =
            SpritePool.getInstance().get('ranking/btn_sign.png').texture;
        sprRank_PanelList[_iData].interactive = true;

        sprRank_PanelList[_iData].on('click',function () {
			networkManager.JoinMember();
        });
        sprRank_PanelList[_iData].on('tap',function () {
            networkManager.JoinMember();
        });

        txtRank_UserRankList[_iData].text = '';
        txtRank_UserNameList[_iData].text = '';
        txtRank_RankingPointList[_iData].text = '';

        txtRank_SignUp.position.set(sprRank_PanelList[_iData].x, sprRank_PanelList[_iData].y);
        txtRank_SignUp.visible = true;
    }
}

function UpdateGemShop()
{
	// skill 0
	txtGemShopCurrentLv[0].text = "Lv " + kData.iSkillLv[0] + " : " + clientData.iSkillValue[0] + "%";
	txtGemShopNextLv[0].text = "Lv UP : +" + ((Math.floor((kData.iSkillLv[0] + 1)/iSkillVauleLv0Division)+1)*iSkillVauleIncreate[0]) + "%";
	if(kData.iSkillLv[0] < iSkillLvMax[0])
	{
		txtGemShopBuy[0].text = XNumViewString(XNumToNum((kData.iSkillLv[0] + 1) * iSkillCashBase[0]));
	}
	else
	{
		if(sprGemShopBuy[0] != undefined)
			sprGemShopBuy[0].visible = false;
		sprGemShopBtn[0].interactive = false;
        CB_ButtonUp('gemshop_shuriken_damage');
		txtGemShopBtn[0].text = GetString("MAX");
		txtGemShopBtn[0].position.set(0, 0);
	}
	// skill 1
	txtGemShopCurrentLv[1].text = "Lv " + kData.iSkillLv[1] + " : " + clientData.iSkillValue[1] + "%";
	txtGemShopNextLv[1].text = "Lv UP : +" + ((Math.floor((kData.iSkillLv[1] + 1)/iSkillVauleLv0Division)+1)*iSkillVauleIncreate[1]) + "%";
	if(kData.iSkillLv[1] < iSkillLvMax[1])
	{
		txtGemShopBuy[1].text = XNumViewString(XNumToNum((kData.iSkillLv[1] + 1) * iSkillCashBase[1]));
	}
	else
	{
		if(sprGemShopBuy[1] != undefined)
			sprGemShopBuy[1].visible = false;
		sprGemShopBtn[1].interactive = false;
        CB_ButtonUp('gemshop_kunai_damage');
		txtGemShopBtn[1].text = GetString("MAX");
		txtGemShopBtn[1].position.set(0, 0);
	}
	// skill 2
	txtGemShopCurrentLv[2].text = "Lv " + kData.iSkillLv[2] + " : " + clientData.iSkillValue[2] + "%";
	txtGemShopNextLv[2].text = "Lv UP : +" + iSkillVauleIncreate[2] + "%";
	if(kData.iSkillLv[2] < iSkillLvMax[2])
	{
		txtGemShopBuy[2].text = XNumViewString(XNumToNum(Math.pow(10,kData.iSkillLv[2]) * iSkillCashBase[2]));
	}
	else
	{
		if(sprGemShopBuy[2] != undefined)
			sprGemShopBuy[2].visible = false;
		sprGemShopBtn[2].interactive = false;
        CB_ButtonUp('gemshop_shadow_speed');
		txtGemShopBtn[2].text = GetString("MAX");
		txtGemShopBtn[2].position.set(0, 0);
	}
	// skill 3
	txtGemShopCurrentLv[3].text = "Lv " + kData.iSkillLv[3] + " : " + clientData.iSkillValue[3] + "%";
	txtGemShopNextLv[3].text = "Lv UP : +" + iSkillVauleIncreate[3] + "%";
	if(kData.iSkillLv[3] < iSkillLvMax[3])
	{
		txtGemShopBuy[3].text = XNumViewString(XNumToNum((kData.iSkillLv[3] + 1) * iSkillCashBase[3]));
	}
	else
	{
        CB_ButtonUp('gemshop_shuriken_critical_damage');
		if(sprGemShopBuy[3] != undefined)
			sprGemShopBuy[3].visible = false;
		sprGemShopBtn[3].interactive = false;
		txtGemShopBtn[3].text = GetString("MAX");
		txtGemShopBtn[3].position.set(0, 0);
	}
	// skill 4
	txtGemShopCurrentLv[4].text = "Lv " + kData.iSkillLv[4] + " : " + clientData.iSkillValue[4] + "%";
	txtGemShopNextLv[4].text = "Lv UP : +" + iSkillVauleIncreate[4] + "%";
	if(kData.iSkillLv[4] < iSkillLvMax[4])
	{
		txtGemShopBuy[4].text = XNumViewString(XNumToNum((kData.iSkillLv[4] + 1) * iSkillCashBase[4]));
	}
	else
	{
        CB_ButtonUp('gemshop_shuriken_critical_percent');
		if(sprGemShopBuy[4] != undefined)
			sprGemShopBuy[4].visible = false;
		sprGemShopBtn[4].interactive = false;
		txtGemShopBtn[4].text = GetString("MAX");
		txtGemShopBtn[4].position.set(0, 0);
	}
	// skill 5
	txtGemShopCurrentLv[5].text = "Lv " + kData.iSkillLv[5] + " : " +GetString("TAP") + " DMG * " + clientData.iSkillValue[5];
	txtGemShopNextLv[5].text = "Lv UP : +" + iSkillVauleIncreate[5];
	if(kData.iSkillLv[5] < iSkillLvMax[5])
	{
		txtGemShopBuy[5].text = XNumViewString(XNumToNum((kData.iSkillLv[5] + 1) * iSkillCashBase[5]));
	}
	else
	{
		if(sprGemShopBuy[5] != undefined)
			sprGemShopBuy[5].visible = false;
		sprGemShopBtn[5].interactive = false;
        CB_ButtonUp('gemshop_fever_damage');
		txtGemShopBtn[5].text = GetString("MAX");
		txtGemShopBtn[5].position.set(0, 0);
	}
	// skill 6
	txtGemShopCurrentLv[6].text = "Lv " + kData.iSkillLv[6] + " : " + clientData.iSkillValue[6] + " " + GetString("TAP");
	txtGemShopNextLv[6].text = "Lv UP : -" + iSkillVauleIncreate[6] + " " + GetString("TAP");
	if(kData.iSkillLv[6] < iSkillLvMax[6])
	{
		txtGemShopBuy[6].text = XNumViewString(XNumToNum((kData.iSkillLv[6] + 1) * iSkillCashBase[6]));
	}
	else
	{
		if(sprGemShopBuy[6] != undefined)
			sprGemShopBuy[6].visible = false;
		sprGemShopBtn[6].interactive = false;
        CB_ButtonUp('gemshop_fever_gage');
		txtGemShopBtn[6].text = GetString("MAX");
		txtGemShopBtn[6].position.set(0, 0);
	}


	// 버튼 활성화 비활성화
	for(var i=0;i<=6;++i)
	{
		if(txtGemShopBtn[i].text.indexOf("MAX") == -1)
		{
			if((kData.iSkillLv[i] + 1) * iSkillCashBase[i] <= kData.iCash)
			{
				sprGemShopBtn[i].interactive = true;
				sprGemShopBtnDis[i].visible = false;
			}
			else
			{
                sprGemShopBtn[i].interactive = false;
				sprGemShopBtn[i].scale.set(1);
				sprGemShopBtnDis[i].visible = true;
			}
		}
	}
}

function cbButtonMenuGemShopClose()
{
	TweenLite.to(sprPopupWhite, 0.3, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
	TweenLite.to(sMenuGemShop, 0.3, {x:iMaxSizeX, y:0, ease:Back.easeIn, onComplete:cbTweenTargetOff});
	// TweenPlay(sprPopupWhite, 0.3, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
	// TweenPlay(sMenuGemShop, 0.3, 0, null, {x:iMaxSizeX, y:0}, false, PIXI.tween.Easing.inBack(), cbTweenTargetOff);
}
/*
// 골드샵 AD보고 보상 받기..
function cbButtonGoldShopAD()
{
	kData.nMyMoney = XPlus(kData.nMyMoney, nGoldShopAD);
	UpdateSound();
	SaveData();
}
*/

function CB_ButtonDown(_str,_callbackFunc){
	dictionary_buttonPress['b_'+_str] = true;
	_callbackFunc;
}

function CB_ButtonUp(_str) {
	dictionary_buttonPress[('b_' + _str)] = false;
	dictionary_buttonPress[('time_' + _str)] = 0;
}

function ShurikenCalc(_b_levelUp) {
	if(_b_levelUp === undefined) _b_levelUp = false;

	if(_b_levelUp){
        kData.nMyMoney = XMinus(kData.nMyMoney, clientData.nNextClickDmgBuyMoney);

        if(kData.iMyClickDmgLevelSub >= 5){
        	kData.iMyClickDmgLevel++;
        	kData.iMyClickDmgLevelSub = 1;
		}else{
            kData.iMyClickDmgLevelSub++;
		}
	}

	// 계산
	// iMyClickDmgLevel 		단계
	// iMyClickDmgLevelSub 		Lv

	if(kData.iMyClickDmgLevelSub == 1){
		if(kData.iMyClickDmgLevel > 1){
            if(_b_levelUp){
                var calcData = Math.floor(Math.pow(GOLDSHOP_STATUS_3, Math.floor((kData.iMyClickDmgLevel-1) / 25)));
                calcData = calcData * GOLDSHOP_STATUS_1;

                if(kData.iMyClickDmgLevel % 5 == 0){
                    calcData = calcData * GOLDSHOP_STATUS_2;
                }

                clientData.nMyClickDmg = XMultiplyEx(kData.nBaseClickDmg,calcData);

                kData.nBaseClickDmg = clientData.nMyClickDmg;

                var calcMoneyData = kData.iMyClickDmgLevel * GOLDSHOP_MONEY[0];
                kData.nBaseClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmg, calcMoneyData);

                ShowUpgradePopup(0);
			}

			if(clientData.nMyClickDmg.length == 1 && clientData.nMyClickDmg[0] == 1){
                clientData.nMyClickDmg = XMultiplyEx(kData.nBaseClickDmg, kData.iMyClickDmgLevelSub);
			}
            clientData.nNextClickDmg = XMultiplyEx(kData.nBaseClickDmg, (kData.iMyClickDmgLevelSub+1));

            var calcMoneyData = (kData.iMyClickDmgLevelSub+1) * GOLDSHOP_MONEY[1];
            clientData.nNextClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney, calcMoneyData);

            clientData.nMyClickDmg = XMultiplyEx(clientData.nMyClickDmg,(clientData.iSkillValue[0]/100));
            clientData.nNextClickDmg = XMultiplyEx(clientData.nNextClickDmg,(clientData.iSkillValue[0]/100));

		}else{
			// 1단계 1LV 일 경우
			clientData.nMyClickDmg = [1];
            kData.nBaseClickDmg = clientData.nMyClickDmg;
			clientData.nNextClickDmg = XMultiplyEx(kData.nBaseClickDmg, (kData.iMyClickDmgLevelSub+1));


			var calcMoneyData = kData.iMyClickDmgLevelSub * GOLDSHOP_MONEY[0];
			kData.nBaseClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmg, calcMoneyData);

			var calcMoneyData = (kData.iMyClickDmgLevelSub+1) * GOLDSHOP_MONEY[1];
            clientData.nNextClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney, calcMoneyData);

            clientData.nMyClickDmg = XMultiplyEx(clientData.nMyClickDmg,(clientData.iSkillValue[0]/100));
            clientData.nNextClickDmg = XMultiplyEx(clientData.nNextClickDmg,(clientData.iSkillValue[0]/100));
		}
	}else{
		clientData.nMyClickDmg = XMultiplyEx(kData.nBaseClickDmg, kData.iMyClickDmgLevelSub);

        //var calcMoneyData = kData.iMyClickDmgLevelSub * GOLDSHOP_MONEY[kData.iMyClickDmgLevelSub-1];
		//kData.nBaseClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney,calcMoneyData);

		if(kData.iMyClickDmgLevelSub >= 5) {
            // nextclick DMG 적용은 다르게
            var calcData = Math.floor(Math.pow(GOLDSHOP_STATUS_3, Math.floor((kData.iMyClickDmgLevel) / 25)));
            calcData = calcData * GOLDSHOP_STATUS_1;

            if((kData.iMyClickDmgLevel+1) % 5 == 0){
                calcData = calcData * GOLDSHOP_STATUS_2;
            }
            clientData.nNextClickDmg = XMultiplyEx(kData.nBaseClickDmg,calcData);

            var calcMoneyData = (kData.iMyClickDmgLevel+1) * GOLDSHOP_MONEY[0];
            clientData.nNextClickDmgBuyMoney = XMultiplyEx(clientData.nNextClickDmg,calcMoneyData);
        }else{
			clientData.nNextClickDmg = XMultiplyEx(kData.nBaseClickDmg,(kData.iMyClickDmgLevelSub+1));

			var calcMoneyData = (kData.iMyClickDmgLevelSub+1) * GOLDSHOP_MONEY[kData.iMyClickDmgLevelSub];
			clientData.nNextClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney,calcMoneyData);

		}

        clientData.nNextClickDmg = XMultiplyEx(clientData.nNextClickDmg,(clientData.iSkillValue[0]/100));
        clientData.nMyClickDmg = XMultiplyEx(clientData.nMyClickDmg,(clientData.iSkillValue[0]/100));
	}

	SaveDataInClient();
}

function KunaiCalc(_b_levelUp) {
    if(_b_levelUp === undefined) _b_levelUp = false;

    if(_b_levelUp){
        kData.nMyMoney = XMinus(kData.nMyMoney, clientData.nNextSecondDmgBuyMoney);

        if(kData.iMySecondDmgLevelSub >= 5){
            kData.iMySecondDmgLevel++;
            kData.iMySecondDmgLevelSub = 1;
        }else{
            kData.iMySecondDmgLevelSub++;
        }
    }

    // 계산
    // iMySecondDmgLevel 			단계
    // iMySecondDmgLevelSub 		Lv

    if(kData.iMySecondDmgLevelSub == 1){
        if(kData.iMySecondDmgLevel > 1){
            var calcData = Math.floor(Math.pow(GOLDSHOP_STATUS_3, Math.floor((kData.iMySecondDmgLevel-1) / 25)));
            calcData = calcData * GOLDSHOP_STATUS_1;

            if(kData.iMySecondDmgLevel % 5 == 0){
                calcData = calcData * GOLDSHOP_STATUS_2;
            }

            clientData.nMySecondDmg = XMultiplyEx(kData.nBaseSecondDmg,calcData);

            if(_b_levelUp){
                kData.nBaseSecondDmg = clientData.nMySecondDmg;

                var calcMoneyData = kData.iMySecondDmgLevel * GOLDSHOP_MONEY[0];
                kData.nBaseSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmg, calcMoneyData);

                ShowUpgradePopup(1);
            }

            if(clientData.nMySecondDmg.length == 1 && clientData.nMySecondDmg[0] == 1){
                clientData.nMySecondDmg = XMultiplyEx(kData.nBaseSecondDmg, kData.iMySecondDmgLevelSub);
            }
            clientData.nNextSecondDmg = XMultiplyEx(kData.nBaseSecondDmg, (kData.iMySecondDmgLevelSub+1));

            var calcMoneyData = (kData.iMySecondDmgLevelSub+1) * GOLDSHOP_MONEY[1];
            clientData.nNextSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmgBuyMoney, calcMoneyData);

            clientData.nMySecondDmg = XMultiplyEx(clientData.nMySecondDmg,(clientData.iSkillValue[1]/100));
            clientData.nNextSecondDmg = XMultiplyEx(clientData.nNextSecondDmg,(clientData.iSkillValue[1]/100));
        }else{
            // 1단계 1LV 일 경우
            clientData.nMySecondDmg = [1];

            kData.nBaseSecondDmg = clientData.nMySecondDmg;
            clientData.nNextSecondDmg = XMultiplyEx(kData.nBaseSecondDmg, (kData.iMySecondDmgLevelSub+1));

            var calcMoneyData = kData.iMySecondDmgLevelSub * GOLDSHOP_MONEY[0];
            kData.nBaseSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmg, calcMoneyData);

            var calcMoneyData = (kData.iMySecondDmgLevelSub+1) * GOLDSHOP_MONEY[1];
            clientData.nNextSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmgBuyMoney, calcMoneyData);

            clientData.nMySecondDmg = XMultiplyEx(clientData.nMySecondDmg,(clientData.iSkillValue[1]/100));
            clientData.nNextSecondDmg = XMultiplyEx(clientData.nNextSecondDmg,(clientData.iSkillValue[1]/100));
        }
    }else{
        clientData.nMySecondDmg = XMultiplyEx(kData.nBaseSecondDmg, kData.iMySecondDmgLevelSub);

        if(kData.iMySecondDmgLevelSub >= 5) {
            // nextclick DMG 적용은 다르게
            var calcData = Math.floor(Math.pow(GOLDSHOP_STATUS_3, Math.floor((kData.iMySecondDmgLevel) / 25)));
            calcData = calcData * GOLDSHOP_STATUS_1;

            if((kData.iMySecondDmgLevel+1) % 5 == 0){
                calcData = calcData * GOLDSHOP_STATUS_2;
            }
            clientData.nNextSecondDmg = XMultiplyEx(kData.nBaseSecondDmg,calcData);

            var calcMoneyData = (kData.iMySecondDmgLevel+1) * GOLDSHOP_MONEY[0];
            clientData.nNextSecondDmgBuyMoney = XMultiplyEx(clientData.nNextSecondDmg,calcMoneyData);

        }else{
            clientData.nNextSecondDmg = XMultiplyEx(kData.nBaseSecondDmg,(kData.iMySecondDmgLevelSub+1));

            var calcMoneyData = (kData.iMySecondDmgLevelSub+1) * GOLDSHOP_MONEY[kData.iMySecondDmgLevelSub];
            clientData.nNextSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmgBuyMoney,calcMoneyData);
        }

        clientData.nNextSecondDmg = XMultiplyEx(clientData.nNextSecondDmg,(clientData.iSkillValue[1]/100));
        clientData.nMySecondDmg = XMultiplyEx(clientData.nMySecondDmg,(clientData.iSkillValue[1]/100));

    }

    SaveDataInClient();
}

function cbButtonUpgradeShuriken()
{
	if(IsXMinus(kData.nMyMoney, clientData.nNextClickDmgBuyMoney) == true && (kData.iMyClickDmgLevel == 75 && kData.iMyClickDmgLevelSub == 5) == false)
	{
        if(IsXMinus(kData.nMyMoney, clientData.nNextSecondDmgBuyMoney) == true && (kData.iMySecondDmgLevel == 75 && kData.iMySecondDmgLevelSub == 5) == false)
            CB_ButtonUp('kunai_touchMe');

        //spine_touchMeShuriken.visible = false;
        CB_ButtonUp('shuriken_touchMe');

        ShurikenCalc(true);
		// kData.nMyMoney = XMinus(kData.nMyMoney, clientData.nNextClickDmgBuyMoney);
		//
		// if(++kData.iMyClickDmgLevelSub <= 5)
		// {
		// 	if(kData.iMyClickDmgLevelSub > 1)
		// 		clientData.nMyClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * kData.iMyClickDmgLevelSub), clientData.iSkillValue[0]/100);
		// 	else if(kData.iMyClickDmgLevelSub == 1)
		// 		clientData.nMyClickDmg = XMultiplyEx(kData.nBaseClickDmg, clientData.iSkillValue[0]/100);
		// }
		// else
		// {
		// 	kData.iMyClickDmgLevel++;
		// 	kData.iMyClickDmgLevelSub = 1;
		// 	clientData.nMyClickDmg = XMultiplyEx(XMultiply(kData.nBaseClickDmg, XNumToNum(3)), clientData.iSkillValue[0]/100);
		// 	kData.nBaseClickDmg = XMultiply(kData.nBaseClickDmg, XNumToNum(3));
		// 	clientData.nClickDmgMultiply = XMultiply(clientData.nClickDmgMultiply, XNumToNum(2));
		// 	kData.nBaseClickDmgBuyMoney = XMultiply(kData.nBaseClickDmg, clientData.nClickDmgMultiply);
		//
		// 	ShowUpgradePopup(0);
		// }
		//
		// if(kData.iMyClickDmgLevelSub + 1 <= 5)
		// {
		// 	clientData.nNextClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * (kData.iMyClickDmgLevelSub + 1)), clientData.iSkillValue[0]/100);
		// 	clientData.nNextClickDmgBuyMoney = XMultiplyEx(kData.nBaseClickDmgBuyMoney, fItemBuyMoney * (kData.iMyClickDmgLevelSub + 1));
		// }
		// else
		// {
		// 	clientData.nNextClickDmg = XMultiplyEx(XMultiply(kData.nBaseClickDmg, XNumToNum(3)), clientData.iSkillValue[0]/100);
		// 	clientData.nNextClickDmgBuyMoney = XMultiply(XMultiply(kData.nBaseClickDmg, XNumToNum(3)), XMultiply(clientData.nClickDmgMultiply, XNumToNum(2)));
		// }

		SESoundPlay(SE_buy);
		UpdateInfo2();
		SaveDataInClient();
	}
}

function cbButtonUpgradeKunai()
{
	if(IsXMinus(kData.nMyMoney, clientData.nNextSecondDmgBuyMoney) == true && (kData.iMySecondDmgLevel == 75 && kData.iMySecondDmgLevelSub == 5) == false)
	{
        CB_ButtonUp('kunai_touchMe');

        if(IsXMinus(kData.nMyMoney, clientData.nNextClickDmgBuyMoney) == true && (kData.iMyClickDmgLevel == 75 && kData.iMyClickDmgLevelSub == 5) == false)
            CB_ButtonUp('shuriken_touchMe');
		KunaiCalc(true);
		// kData.nMyMoney = XMinus(kData.nMyMoney, clientData.nNextSecondDmgBuyMoney);
		//
		// if(++kData.iMySecondDmgLevelSub <= 5)
		// {
		// 	if(kData.iMySecondDmgLevelSub > 1)
		// 		clientData.nMySecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * kData.iMySecondDmgLevelSub), clientData.iSkillValue[1]/100);
		// 	else
		// 		clientData.nMySecondDmg = XMultiplyEx(kData.nBaseSecondDmg, clientData.iSkillValue[1]/100);
		// }
		// else
		// {
		// 	kData.iMySecondDmgLevel++;
		// 	kData.iMySecondDmgLevelSub = 1;
		// 	clientData.nMySecondDmg = XMultiplyEx(XMultiply(kData.nBaseSecondDmg, XNumToNum(3)), clientData.iSkillValue[1]/100);
		// 	kData.nBaseSecondDmg = XMultiply(kData.nBaseSecondDmg, XNumToNum(3));
		// 	clientData.nSecondDmgMultiply = XMultiply(clientData.nSecondDmgMultiply, XNumToNum(2));
		// 	kData.nBaseSecondDmgBuyMoney = XMultiply(kData.nBaseSecondDmg, clientData.nSecondDmgMultiply);
		//
		// 	ShowUpgradePopup(1);
		// }
		//
		// if(kData.iMySecondDmgLevelSub + 1 <= 5)
		// {
		// 	clientData.nNextSecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * (kData.iMySecondDmgLevelSub + 1)), clientData.iSkillValue[1]/100);
		// 	clientData.nNextSecondDmgBuyMoney = XMultiplyEx(kData.nBaseSecondDmgBuyMoney, fItemBuyMoney * (kData.iMySecondDmgLevelSub + 1));
		// }
		// else
		// {
		// 	clientData.nNextSecondDmg = XMultiplyEx(XMultiply(kData.nBaseSecondDmg, XNumToNum(3)), clientData.iSkillValue[1]/100);
		// 	clientData.nNextSecondDmgBuyMoney = XMultiply(XMultiply(kData.nBaseSecondDmg, XNumToNum(3)), XMultiply(clientData.nSecondDmgMultiply, XNumToNum(2)));
		// }

	//	if(kData.bTutorial == false && spine_neko_shadow == false)
	//	{
	//		spine_neko_shadow.visible = true;
	//		spine_neko_shadow.alpha = 0;
	//		TweenPlay(spine_neko_shadow, 0.5, 0, null, {alpha:1}, false, PIXI.tween.Easing.outQuad());
	//	}

		SESoundPlay(SE_buy);
		UpdateInfo2();
		SaveDataInClient();
	}
}

function cbButtonMenuGoldShopShow()
{
	SESoundPlay(SE_Shop);
	sprPopupWhite.visible = true;
	sprPopupWhite.alpha = 0;
	TweenLite.to(sprPopupWhite, 0.5, {alpha:0.5, ease:Linear.easeNone});
	// TweenPlay(sprPopupWhite, 0.5, 0, null, {alpha:0.5}, false, PIXI.tween.Easing.linear());

	sMenuGoldShop.visible = true;
	sMenuGoldShop.position.set(iMaxSizeX, 0);
	TweenLite.to(sMenuGoldShop, 0.5, {x:0, y:0, ease:Back.easeOut});
	// TweenPlay(sMenuGoldShop, 0.5, 0, null, {x:0, y:0}, false, PIXI.tween.Easing.outBack());

	for(var i=0;i<75;++i)
	{
		if(kData.iMyClickDmgLevel >= i+1)
			sprCollectionShuriken[i].visible = true;
		else
			sprCollectionShuriken[i].visible = false;

		if(kData.iMySecondDmgLevel >= i+1)
			sprCollectionKunai[i].visible = true;
		else
			sprCollectionKunai[i].visible = false;
	}
	//UpdateGoldShop();
}
/*
function UpdateGoldShop()
{
	// 광고 관련.
//	if(IsXMinus(clientData.nNextClickDmgBuyMoney, clientData.nNextSecondDmgBuyMoney) == true)
//		nGoldShopAD = XMultiplyEx(clientData.nNextClickDmgBuyMoney, 0.5);
//	else
//		nGoldShopAD = XMultiplyEx(clientData.nNextSecondDmgBuyMoney, 0.5);
//	txtGlodShopAD.text = GetString("goldshopAD", XNumViewString(nGoldShopAD));
	// 수리검 관련
	SpinePlay(spine_GlodShopShuriken, -180, -55, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_idle", 0, false);
	spine_GlodShopShuriken.skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMyClickDmgLevel-1)%25)+1, 2));

//	txtGlodShopShurikenName.text = GetString("Shuriken" + kData.iMyClickDmgLevel);
	for(var i=0;i<5;++i)
	{
		sprGlodShopShurikenStar[i].visible = false;
		if(i < kData.iMyClickDmgLevelSub)
			sprGlodShopShurikenStar[i].visible = true;
	}
	if(kData.iMyClickDmgLevelSub > 0)
	{
		if(kData.iMyClickDmgLevelSub + 1 <= 5)
			clientData.nNextClickDmg = XMultiplyEx(XMultiplyEx(kData.nBaseClickDmg, fItemIncreateDmg * (kData.iMyClickDmgLevelSub + 1)), clientData.iSkillValue[0]/100);
		else
			clientData.nNextClickDmg = XMultiplyEx(XMultiply(kData.nBaseClickDmg, XNumToNum(3)), clientData.iSkillValue[0]/100);
	}
	txtGlodShopShurikenInfo.text = XNumViewString(clientData.nMyClickDmg) + " / TAP ( Lv UP : " + XNumViewString(clientData.nNextClickDmg) + " )";
	txtGlodShopShurikenBuy.text = XNumViewString(clientData.nNextClickDmgBuyMoney);

	// 쿠나이 관련
	SpinePlay(spine_GlodShopKunai, -180, -55, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_idle", 0, false);
	spine_GlodShopKunai.skeleton.setAttachment("Kunai", "Kunai0" + leadingZeros(((kData.iMySecondDmgLevel-1)%25)+1, 2));
//	txtGlodShopKunaiName.text = GetString("Kunai" + kData.iMySecondDmgLevel);
	for(var i=0;i<5;++i)
	{
		sprGlodShopKunaiStar[i].visible = false;
		if(i < kData.iMySecondDmgLevelSub)
			sprGlodShopKunaiStar[i].visible = true;
	}
	if(kData.iMySecondDmgLevelSub > 0)
	{
		if(kData.iMySecondDmgLevelSub + 1 <= 5)
			clientData.nNextSecondDmg = XMultiplyEx(XMultiplyEx(kData.nBaseSecondDmg, fItemIncreateDmg * (kData.iMySecondDmgLevelSub + 1)), clientData.iSkillValue[1]/100);
		else
			clientData.nNextSecondDmg = XMultiplyEx(XMultiply(kData.nBaseSecondDmg, XNumToNum(3)), clientData.iSkillValue[1]/100);
	}
	txtGlodShopKunaiInfo.text = XNumViewString(clientData.nMySecondDmg) + " / SECOND ( Lv UP : " + XNumViewString(clientData.nNextSecondDmg) + " )";
	txtGlodShopKunaiBuy.text = XNumViewString(clientData.nNextSecondDmgBuyMoney);

	txtMyClickDmg.text = XNumViewString(clientData.nMyClickDmg);
	txtMySecondDmg.text = XNumViewString(clientData.nMySecondDmg);
}
*/
function cbButtonGoldShopRight()
{
	sMenuGoldShopPage1.visible = false;
	sMenuGoldShopPage2.visible = true;
}

function cbButtonGoldShopLeft()
{
	sMenuGoldShopPage1.visible = true;
	sMenuGoldShopPage2.visible = false;
}

function cbButtonMenuGoldShopClose()
{
	TweenLite.to(sprPopupWhite, 0.3, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
	TweenLite.to(sMenuGoldShop, 0.3, {x:iMaxSizeX, y:0, ease:Back.easeIn, onComplete:cbTweenTargetOff});
	// TweenPlay(sprPopupWhite, 0.3, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
	// TweenPlay(sMenuGoldShop, 0.3, 0, null, {x:iMaxSizeX, y:0}, false, PIXI.tween.Easing.inBack(), cbTweenTargetOff);
}

function cbButtonMenuOptionShow()
{
	SESoundPlay(SE_Shop);
	sprPopupWhite.visible = true;
	sprPopupWhite.alpha = 0;
	TweenLite.to(sprPopupWhite, 0.5, {alpha:0.5, ease:Linear.easeNone});
	// TweenPlay(sprPopupWhite, 0.5, 0, null, {alpha:0.5}, false, PIXI.tween.Easing.linear());

	sMenuOption.visible = true;
	sMenuOption.position.set(iMaxSizeX, 0);
	TweenLite.to(sMenuOption, 0.5, {x:0, y:0, ease:Back.easeOut});
	// TweenPlay(sMenuOption, 0.5, 0, null, {x:0, y:0}, false, PIXI.tween.Easing.outBack());

	UpdateOption();
}

function UpdateOption()
{
	txtOption1[0].text = clientData.iSkillValue[0] + "%";
	txtOption1[1].text = clientData.iSkillValue[1] + "%";
	txtOption1[2].text = clientData.iSkillValue[2] + "%";
	txtOption1[3].text = clientData.iSkillValue[3] + "%";
	txtOption1[4].text = clientData.iSkillValue[4] + "%";
	txtOption1[5].text = clientData.iSkillValue[5] + "%";
	txtOption1[6].text = clientData.iSkillValue[6].toString();

	txtOption2[0].text = XNumViewString(kData.nOptionGlod);
	txtOption2[1].text = XNumViewString(XNumToNum(kData.iOptionCash));
	txtOption2[2].text = XNumViewString(XNumToNum(kData.iOptionClickCnt));
	txtOption2[3].text = XNumViewString(XNumToNum(kData.iOptionRebirthCnt));
	txtOption2[4].text = XNumViewString(XNumToNum(kData.iOptionToadCnt));
	txtOption2[5].text = "Lv " + kData.iOptionToadLvMax;
	txtOption2[6].text = "Lv " + kData.iOptionShurikenLvMax;
	txtOption2[7].text = "Lv " + kData.iOptionKunaiLvMax;
}

function cbButtonMenuOptionTutorial()
{
	iTutorialState = 1;
	cbButtonMenuOptionClose();
}

function cbButtonMenuOptionClose()
{
	TweenLite.to(sprPopupWhite, 0.3, {alpha:0, ease:Linear.easeNone, onComplete:cbTweenTargetOff});
	TweenLite.to(sMenuOption, 0.3, {x:iMaxSizeX, y:0, ease:Back.easeIn, onComplete:cbTweenTargetOff});
	// TweenPlay(sprPopupWhite, 0.3, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
	// TweenPlay(sMenuOption, 0.3, 0, null, {x:iMaxSizeX, y:0}, false, PIXI.tween.Easing.inBack(), cbTweenTargetOff);
}

var colorSlotList = ['body_color','body_light_color','arm_1_color','arm_1_light_color','arm_2_color','arm_2_light_color'];

function SetToadTint()
{
	// var tR = Math.floor(Math.random() * 255);
	// var tG = Math.floor(Math.random() * 255);
	// var tB = Math.floor(Math.random() * 255);
	var tR = Math.random();
	var tG = Math.random();
	var tB = Math.random();

	for(var i=0,imax=colorSlotList.length;i<imax;++i){
        var spine_toad_Slot = spine_toad.skeleton.findSlot(colorSlotList[i]);
        spine_toad_Slot.color.set(tR,tG,tB,1);
	}

	// tR = Math.floor(Math.random() * 255);
	// tG = Math.floor(Math.random() * 255);
	// tB = Math.floor(Math.random() * 255);
	// spine_toad.skeleton.findSlot("costume_glass").r = tR;
	// spine_toad.skeleton.findSlot("costume_glass").g = tG;
	// spine_toad.skeleton.findSlot("costume_glass").b = tB;
    //
	// tR = Math.floor(Math.random() * 255);
	// tG = Math.floor(Math.random() * 255);
	// tB = Math.floor(Math.random() * 255);
	// spine_toad.skeleton.findSlot("costume_hat").r = tR;
	// spine_toad.skeleton.findSlot("costume_hat").g = tG;
	// spine_toad.skeleton.findSlot("costume_hat").b = tB;
    //
	// tR = Math.floor(Math.random() * 255);
	// tG = Math.floor(Math.random() * 255);
	// tB = Math.floor(Math.random() * 255);
	// spine_toad.skeleton.findSlot("costume_neck").r = tR;
	// spine_toad.skeleton.findSlot("costume_neck").g = tG;
	// spine_toad.skeleton.findSlot("costume_neck").b = tB;

	var tRR = Math.floor(Math.random() * 4);
	if(tRR > 0)
		spine_toad.skeleton.setAttachment("costume_glass", "costume_glass_" + tRR);

	tRR = Math.floor(Math.random() * 5);
	if(tRR > 0)
		spine_toad.skeleton.setAttachment("costume_hat", "costume_hat_" + tRR);

	tRR = Math.floor(Math.random() * 4);
	if(tRR > 0)
		spine_toad.skeleton.setAttachment("costume_neck", "costume_neck_" + tRR);
}

// document.addEventListener('keydown', function(event){
// 	switch(event.which){
// 		case KEY_LEFT:case KEY_UP:case KEY_RIGHT:case KEY_DOWN:
// 			cbButtonClick();
// 		break;
// 	}
// });
//
// var touches = [];
// // stage.touchstart = mousedown();
// // stage.touchend = mouseup();
//
// var mousedown = function(event){
// 	var touch = {
// 		id: event.data.identifier
// 		// pos: event.data.getLocalPosition(this.view)
// 	};
//
//     touches.push(touch);
//
// 	var txtdata = "touches:\n";
//
// 	for(var i=0,imax=touches.length;i<imax;++i){
//         txtdata += touches[i].id + "\n";
// 	}
//
//     txtTestFont.text = txtdata;
// };
//
// var mouseup = function(event){
// 	for (var i = 0; i < touches.length; i++) {
// 		if(touches[i].id === event.data.identifier){
// 			touches.splice(i,1);
// 		}
// 	}
//
//     var txtdata = "touches:\n";
//
//     for(var i=0,imax=touches.length;i<imax;++i){
//         txtdata += touches[i].id + "\n";
//     }
//     txtTestFont.text = txtdata;
// };

function cbButtonClickDown()
{
	bClickPush = true;
	// cbButtonClick();
}

function cbButtonClickUp()
{
	bClickPush = false;
}

function cbButtonClick()
{
	if(kData.bTutorial)
		return;

	if(iFeverState > 0) return;	// 피버모드일경우 터치 제한
	if(fClickTime < fClickTimeMax) return;	// 0.1초 이하로 클릭할 경우 패스.
	fClickTime = 0;

	SESoundPlay(VOICE_Nyan);
	SESoundPlay(SE_Shurikenfly);
	spine_Shuriken[iShurikenCnt].visible = true;
	spine_Shuriken[iShurikenCnt].skeleton.setAttachment("Shuriken", "Shuriken0" + leadingZeros(((kData.iMyClickDmgLevel-1)%25)+1, 2));
	SpinePlay(spine_Shuriken[iShurikenCnt], null, null, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_rotation", 0, true, SPINE_INIT_NONE);
	spine_Shuriken[iShurikenCnt].position.set(-20000, 0);	// 안보이게 설정.

	if(iCharacterDirection == 0)
	{
        spine_Shuriken[iShurikenCnt].position.set(spine_neko_character.position.x+100, spine_neko_character.position.y-40);
        TweenLite.to(spine_Shuriken[iShurikenCnt], 0.3, {x:spine_neko_character.position.x+100, y: iCenterSizeY - 180, ease:Cubic.easeInOut, onComplete:cbTweenShuriken});
		// TweenPlay(spine_Shuriken[iShurikenCnt], 0.3, 0,
		// 		{x:spine_neko_character.position.x+100, y: spine_neko_character.position.y-40},
		// 		{x:spine_neko_character.position.x+100, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenShuriken);
		iCharacterDirection = 1;
		SpinePlay(spine_neko_character, null, null, "character_attack_1", 1, false);
	}
	else
	{
        spine_Shuriken[iShurikenCnt].position.set(spine_neko_character.position.x-100, spine_neko_character.position.y-40);
        TweenLite.to(spine_Shuriken[iShurikenCnt], 0.3, {x:spine_neko_character.position.x-100, y: iCenterSizeY - 180, ease:Cubic.easeInOut, onComplete:cbTweenShuriken});
		// TweenPlay(spine_Shuriken[iShurikenCnt], 0.3, 0,
		// 		{x:spine_neko_character.position.x-100, y: spine_neko_character.position.y-40},
		// 		{x:spine_neko_character.position.x-100, y: iCenterSizeY - 180}, false, PIXI.tween.Easing.inOutCubic(), cbTweenShuriken);
		iCharacterDirection = 0;
		SpinePlay(spine_neko_character, null, null, "character_attack_2", 1, false);
	}
	iFeverCnt++;
	kData.iOptionClickCnt++;
	if(++iShurikenCnt >= iShurikenCntMax) iShurikenCnt = 0;
}

function cbTweenKunai()
{
	if(iToadState == TOAD_IDLE)
	{
		SESoundPlay(SE_Shuriken);
		// 두꺼비 체력이 데미지 보다 많을경우
		if(IsXMinus(nToadHP, clientData.nMySecondDmg) == true)
		{
			kData.nMyMoney = XPlus(kData.nMyMoney, clientData.nMySecondDmg);
			kData.nOptionGlod = XPlus(kData.nOptionGlod, clientData.nMySecondDmg);
		}
		else
		{
			kData.nMyMoney = XPlus(kData.nMyMoney, nToadHP);
			kData.nOptionGlod = XPlus(kData.nOptionGlod, nToadHP);
		}
		UpdateSound();

		nToadHP = XMinus(nToadHP, clientData.nMySecondDmg);
		UpdateToadHP();
		if((nToadHP.length == 1 && nToadHP[0] == 0) == false)
			SpinePlay(spine_toad, null, null, "toad_damage", 1, false, SPINE_INIT_NONE);
		else
		{
			iToadState = TOAD_OUT;
			spine_toad.state.timeScale = 2;
			SpinePlay(spine_toad, null, null, "toad_out", 2, false, SPINE_INIT_BONES);

			// 두꺼비가 죽으면서 보석을 떨군다.
			sprCash[iCashCnt].visible = true;
			sprCash[iCashCnt].alpha = 1;
			sprCash[iCashCnt].position.set(-20000, 0);	// 안보이게 설정.

            sprCash[iCashCnt].position.set(iCenterSizeX,iCenterSizeY - 300);
            TweenLite.to(sprCash[iCashCnt], 0.5, {x:iCenterSizeX, y:spine_neko_character.position.y - 30, ease:Bounce.easeOut, onComplete:cbTweenCash});

			// TweenPlay(sprCash[iCashCnt], 0.5, 0,
			// 		{x:iCenterSizeX, y: iCenterSizeY - 300},
			// 		{x:iCenterSizeX, y: spine_neko_character.position.y - 30}, false, PIXI.tween.Easing.outBounce(), cbTweenCash);
			if(++iCashCnt >= iCashCntMax) iCashCnt = 0;
			kData.iCash += Math.ceil(kData.iToadLevel/10);
            UpdateGemShop();
			txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
			kData.iOptionCash += kData.iToadLevel;
			kData.iOptionToadCnt++;
			if(kData.iOptionToadLvMax < kData.iToadLevel)
				kData.iOptionToadLvMax = kData.iToadLevel;
            networkManager.SaveData();
			SESoundPlay(SE_yo);
		}
		CreateCoin();

		nDPS = XPlus(nDPS, clientData.nMySecondDmg);
	}
	SpinePlay(this.target, null, null, "Kunai_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_out", 1, false);
}

function CreateScoreEff(str, bCritical)
{
	if(txtScore[iScoreCnt].tween != undefined)
		txtScore[iScoreCnt].tween.stop();

	txtScore[iScoreCnt].visible = true;
	txtScore[iScoreCnt].text = str;
	if(bCritical == false)
		txtScore[iScoreCnt].style = {font:'32px ' + tbTTF[lang],fill:'#ffffff'};
	else
		txtScore[iScoreCnt].style = {font:'64px ' + tbTTF[lang], fill:'#ff0000'};
	txtScore[iScoreCnt].position.set(-20000, 0);	// 안보이게 설정.

	var r = 330 + Math.floor(Math.random() * 60);
	txtScore[iScoreCnt].tween = TweenPlay(txtScore[iScoreCnt], 1.5, 0,
			{alpha:1, x:r, y:iCenterSizeY + 160},
			{alpha:0.3, x:r, y:iCenterSizeY - 100}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
	if(++iScoreCnt >= iScoreCntMax) iScoreCnt = 0;
}

function CreateCoin(y)
{
	if(spine_coin[iCoinCnt].tween != undefined)
		spine_coin[iCoinCnt].tween.stop();
	//	TweenManager.removeTween(spine_coin[iCoinCnt].tween);

	spine_coin[iCoinCnt].visible = true;
	spine_coin[iCoinCnt].alpha = 1;
	spine_coin[iCoinCnt].position.set(-20000, 0);	// 안보이게 설정.

	var r = 150 + Math.floor(Math.random() * 420);
	spine_coin[iCoinCnt].tween = TweenPlay(spine_coin[iCoinCnt], 1.5, 0,
			{x:r, y:iCenterSizeY - 200},
			{x:r, y:iCenterSizeY + 450}, false, PIXI.tween.Easing.outBounce(), cbTweenCoin);
	if(++iCoinCnt >= iCoinCntMax) iCoinCnt = 0;
}

function cbTweenCoin()
{
	this.target.tween = TweenPlay(this.target, 1.5, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
}

function cbTweenShurikenFever()
{
	//if(iToadState == TOAD_IDLE)
	{
		//if((nToadHP.length == 1 && nToadHP[0] == 0) == false)
			SpinePlay(spine_toad, null, null, "toad_damage", 1, false, SPINE_INIT_NONE);
	}
	SpinePlay(this.target, null, null, "Shuriken_"+(Math.floor((kData.iMySecondDmgLevel-1)/25)+1)+"_out", 1, false);
}

function cbTweenShuriken()
{
	if(iToadState == TOAD_IDLE)
	{
		SESoundPlay(SE_Shuriken);
		// 크리티컬 확률 계산..
		if(Math.floor(Math.random() * 100) >= clientData.iSkillValue[4])	// 일반 데미지
		{
			if(IsXMinus(nToadHP, clientData.nMyClickDmg) == true)
			{
				kData.nMyMoney = XPlus(kData.nMyMoney, clientData.nMyClickDmg);
				kData.nOptionGlod = XPlus(kData.nOptionGlod, clientData.nMyClickDmg);
				nToadHP = XMinus(nToadHP, clientData.nMyClickDmg);
			}
			else
			{
				kData.nMyMoney = XPlus(kData.nMyMoney, nToadHP);
				kData.nOptionGlod = XPlus(kData.nOptionGlod, nToadHP);
				nToadHP = XMinus(nToadHP, nToadHP);
			}
			nDPS = XPlus(nDPS, clientData.nMyClickDmg);
			UpdateSound();
			UpdateToadHP();
			CreateScoreEff(XNumViewString(clientData.nMyClickDmg), false);
		}
		else // 크리티컬 데미지..
		{
			var nVC = XMultiplyEx(clientData.nMyClickDmg, clientData.iSkillValue[3] / 100);
			if(IsXMinus(nToadHP, nVC) == true)
			{
				kData.nMyMoney = XPlus(kData.nMyMoney, nVC);
				kData.nOptionGlod = XPlus(kData.nOptionGlod, nVC);
				nToadHP = XMinus(nToadHP, nVC);
			}
			else
			{
				kData.nMyMoney = XPlus(kData.nMyMoney, nToadHP);
				kData.nOptionGlod = XPlus(kData.nOptionGlod, nToadHP);
				nToadHP = XMinus(nToadHP, nToadHP);
			}
			nDPS = XPlus(nDPS, nVC);
			UpdateSound();
			UpdateToadHP();
			CreateScoreEff(XNumViewString(nVC), true);
		}

		if((nToadHP.length == 1 && nToadHP[0] == 0) == false)
			SpinePlay(spine_toad, null, null, "toad_damage", 1, false, SPINE_INIT_NONE);
		else
		{
			iToadState = TOAD_OUT;
			spine_toad.state.timeScale = 2;
			SpinePlay(spine_toad, null, null, "toad_out", 2, false, SPINE_INIT_BONES);

			// 두꺼비가 죽으면서 보석을 떨군다.
			sprCash[iCashCnt].visible = true;
			sprCash[iCashCnt].alpha = 1;
			sprCash[iCashCnt].position.set(-20000, 0);	// 안보이게 설정.

            sprCash[iCashCnt].position.set(iCenterSizeX,iCenterSizeY - 300);
            TweenLite.to(sprCash[iCashCnt].position, 0.5, {x:iCenterSizeX, y:spine_neko_character.position.y - 30, ease:Bounce.easeOut});
            TweenLite.to(sprCash[iCashCnt],0.5,{ease:Linear.easeNone, onComplete:cbTweenCash});
			// TweenPlay(sprCash[iCashCnt], 0.5, 0,
			// 		{x:iCenterSizeX, y: iCenterSizeY - 300},
			// 		{x:iCenterSizeX, y: spine_neko_character.position.y - 30}, false, PIXI.tween.Easing.outBounce(), cbTweenCash);
			if(++iCashCnt >= iCashCntMax) iCashCnt = 0;
            kData.iCash += Math.ceil(kData.iToadLevel/10);
            UpdateGemShop();
			txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
			kData.iOptionCash += kData.iToadLevel;
			kData.iOptionToadCnt++;
			if(kData.iOptionToadLvMax < kData.iToadLevel)
				kData.iOptionToadLvMax = kData.iToadLevel;

			SESoundPlay(SE_yo);
		}
		CreateCoin();
	}
	SpinePlay(this.target, null, null, "Shuriken_"+(Math.floor((kData.iMyClickDmgLevel-1)/25)+1)+"_out", 1, false);
}

function cbTweenCash()
{
	TweenLite.to(this.target, 0.5, {alpha:0 , ease:Linear.easeNone , onComplete:cbTweenTargetOff});
	// TweenPlay(this.target, 0.5, 0,
	// 		{alpha:1},
	// 		{alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
}

function cbButtonCheat1()
{
	if(kData.iCash > 0)
		kData.iCash += kData.iCash * 4;
	else
		kData.iCash += 1000;

	kData.iToadLevel += 100;

	txtMyCash.text = XNumViewString(XNumToNum(kData.iCash));
	SaveDataInClient();
}

function cbButtonCheat2()
{
	kData.nMyMoney = XMultiplyEx(kData.nMyMoney, 10);
	UpdateSound();
	SaveDataInClient();
}

function cbButtonCheatFever() {
    iFeverCnt = clientData.iSkillValue[6];
    SaveDataInClient();
}

function cbAdCheat() {
    iADState = 0;
    fADTimeDelay = fADCreateTime;
}

function cbTweenTargetOff()
{
	this.target.visible = false;
}

var b_initADGameMoney = false;
function ADGameMoney() {
    if(loginTF == 0) {
        networkManager.GetServerTime(function (_time) {
            if (clientData[TIME_STAMP] != null) {
                var lostTime = (_time - clientData[TIME_STAMP]);

                for(var i=0,imax= kData.fCooltime_Gamemoney.length;i<imax;++i){
                    if(kData.fCooltime_Gamemoney[i] > 0){
                        kData.fCooltime_Gamemoney[i] -= lostTime;

                        if(kData.fCooltime_Gamemoney[i] <= 0)
                            kData.fCooltime_Gamemoney[i] = 0;
                    }
                }
            }

            clientData[TIME_STAMP] = _time;
            SaveDataInClient();

            b_initADGameMoney = true;
        });
    }else{
        // 로그인 퇴어 있을 경우에는 하트는 받아오니 ADCoolTime만 정리
        for(var i=0,imax= kData.fCooltime_Gamemoney.length;i<imax;++i){
            if(kData.fCooltime_Gamemoney[i] > 0){
                kData.fCooltime_Gamemoney[i] -= kData.calcedTimeStamp;
                // Gamemoney 데이터를 쓰는 경우
                // kData.fCooltime_Gamemoney[i] -= kData,calcedTimeStamp;

                if(kData.fCooltime_Gamemoney[i] <= 0)
                    kData.fCooltime_Gamemoney[i] = 0;

                // Gamemoney 데이터를 쓰는 경우
                // if(kData.fCooltime_Gamemoney[i] <= 0)
                //    kData.fCooltime_Gamemoney[i] = 0;
            }
        }

        b_initADGameMoney = true;
    }
}

function ADGameMoneyUpdate() {
    for(var i=0;i<4;++i){
        if(kData.fCooltime_Gamemoney[i] > 0){
            kData.fCooltime_Gamemoney[i] -= deltaTime;

            var min = Math.floor(kData.fCooltime_Gamemoney[i] / 60);
            if(min < 10)
                min = '0' + min;
            var sec = Math.floor(kData.fCooltime_Gamemoney[i] % 60);
            if(sec < 10)
                sec = '0'+sec;

            sprCashBuyBtn[i].texture = PIXI.Texture.fromFrame('btn_shop_disable.png');

			txtCashValue[i].visible = false;
            sprCashBtnImg[i].visible = false;
            txtCashCooltime[i].text = min + ':' + sec;
            txtCashCooltime[i].visible = true;
        }else{
            if(txtCashCooltime[i].visible){
                sprCashBuyBtn[i].texture = PIXI.Texture.fromFrame('btn_shop_1.png');

				if(shopListData[i].pType.indexOf('ad') > -1)
					sprCashBtnImg[i].visible = true;
				else
					txtCashValue[i].visible = true;
                txtCashCooltime[i].visible = false;
            }
        }
    }
}

var ADCooltime_MAX = 600;
function ADGameMoneyPay(_payIndex) {
    if(shopListData[_payIndex].pType.indexOf('ad') != -1 && apkTF == 1)
		kData.fCooltime_Gamemoney[_payIndex] = ADCooltime_MAX;
}