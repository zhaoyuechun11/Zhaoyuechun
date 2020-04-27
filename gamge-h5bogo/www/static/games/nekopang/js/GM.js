
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

var iMaxSizeX = 720;
var iMaxSizeY = 1280;
var iCenterSizeX = iMaxSizeX >> 1;
var iCenterSizeY = iMaxSizeY >> 1;
var renderer = PIXI.autoDetectRenderer(iMaxSizeX, iMaxSizeY);

// yahooIN modifier : kook : 일본대응.
//var filter = "win16|win32|win64|macintel|mac";
//var bMobile = (filter.indexOf(navigator.platform.toLowerCase())<0);
//$('game_area').appendTo($('.container'));
var objDiv;
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
	$("#game_mask").css("background-image", "url(\"https://game.jp/img/Gameplaybg_0009.gif\")");
}

//$("<meta name="apple-mobile-web-app-capable" content="yes">").appendTo($('.head'));

$(window).resize(resize);	// jquery를 사용한다.
window.onorientationchange = resize; // 화면이 리사이즈되면 리사이즈 함수를 콜한다.
resize(); // 최초 한번 리사이즈를 해주고 변동사항이 있을경우 리사이즈를 계속 해준다.

//$("#game_area").attr("tabindex", -1).focus();
//document.getElementById("game_area").scrollIntoView();
//jQuery("#game_area")[0].scrollIntoView();
//$('#match').trigger('focus');

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
window.addEventListener('focus', function() {
	SoundResume();
}, false);

//윈도우창을 닫을때 이벤트.
window.addEventListener('blur', function() {
	SoundPause();
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
	if(document[hidden])
		SoundPause();
	else
	 	SoundResume();
}

//Warn if the browser doesn't support addEventListener or the Page Visibility API
if (typeof document.addEventListener === "undefined" || typeof document[hidden] === "undefined") {
	console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
} else {
	// Handle page visibility change   
	document.addEventListener(visibilityChange, handleVisibilityChange, false);
}
//end 사운드 제어.
if(yahooIN == undefined)
	document.body.appendChild(renderer.view);

var stage = new PIXI.Container();
var sLoading = new PIXI.Container();
var sTitle = new PIXI.Container();
var sStageSelect = new PIXI.Container();
var sStageInfo = new PIXI.Container();
var sStageInfoSub = new PIXI.Container();
var sStageInfoMap = new PIXI.Container();
var sAlbumInfo = new PIXI.Container();
var sAlbumInfoSub = new PIXI.Container();
var sGoal = new PIXI.Container();
var sGame = new PIXI.Container();
var sMap = new PIXI.Container();
var sRoad = new PIXI.Container();
var sItem = new PIXI.Container();
var sBlock = new PIXI.Container();	// 블럭배치..
var sBlock2 = new PIXI.Container();	// 검정색
var sBlock3 = new PIXI.Container();	// 블럭배치..

var sShufflePopup = new PIXI.Container();
var sFilm = new PIXI.Container();
var sTurnOver = new PIXI.Container();
var sTurnOverSub = new PIXI.Container();
var sGameOver = new PIXI.Container();
var sGameOverSub = new PIXI.Container();
var sPhotoTime = new PIXI.Container();
var sPhotoResult = new PIXI.Container();
var sWarningPopup = new PIXI.Container();
var sOption = new PIXI.Container();
var sResultCatInfo = new PIXI.Container();

stage.addChild(sLoading);

var tbImgGame = [
	"/atlas-0.json",
	"/atlas-1.json",
	"/atlas-2.json"
];

//========================================================================
// 언어 이미지  설정
var LANGUAGE_ENG = 0;
var LANGUAGE_JPN = 1;
var LANGUAGE_KOR = 2;
// 언어 코드입니다. ko : 한국 , ja : 일본 , en : 영어
var tbLang = {"ko":LANGUAGE_KOR, "ja":LANGUAGE_JPN, "en":LANGUAGE_ENG};
var CURRENT_LANGUAGE = LANGUAGE_ENG;
var tbTTF = {"ko":'VERDANAB', "ja":'JAPAN_TTF', "en":'VERDANAB'};
var tbSPINE = {"ko":'spine', "ja":'spine_jp', "en":'spine'};
var tbATLAS = {"ko":'atlas', "ja":'atlas_jp', "en":'atlas'};

function GetString(key, data)
{
	/*switch(CURRENT_LANGUAGE)
	{
		case LANGUAGE_ENG:*/
			if(data === undefined)
				return tbString[key].en.replace(/{E}/gi, "\n");
			else
				return tbString[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
	/*		break;
		case LANGUAGE_JPN:
			if(data === undefined)
				return tbString[key].jp.replace(/{E}/gi, "\n");
			else
				return tbString[key].jp.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
			break;
		case LANGUAGE_KOR:
			if(data === undefined)
				return tbString[key].kr.replace(/{E}/gi, "\n");
			else
				return tbString[key].kr.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
			break;
	}
	
	return "";*/
}
//=============================================================================
// 콤마찍기
//=============================================================================
function GetComma(n) {
	var c = 0; //표시자리
	var d = ".";
	var t = ",";
	var s = n < 0 ? "-" : "",
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
		j = (j = i.length) > 3 ? j % 3 : 0;
	return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
//=============================================================================
// 스프라이트 생성 관련
//=============================================================================
function SpriteLoad(parent, url, px, py, ax, ay)
{
	if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;
	var spr = PIXI.Sprite.fromFrame(url);
	spr.position.x = px;
	spr.position.y = py;
	spr.anchor.x = ax;
	spr.anchor.y = ay;
	
	parent.addChild(spr);
	
	return spr;
}

//부모, 텍스쳐위치, positon.x, position.y, width, height, leftCut, rightCut, topCut, bottomCut, anchon.x, anchon.y
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

function SlicedSpriteChangeTexture(_sliceSpr, _sliceSpr_2){
	for(var i=0,imax = 9;i<imax;++i){
		_sliceSpr.children[i].texture = _sliceSpr_2.children[i].texture;
	}
}

function FontScale(txt, limitWidth)
{
	txt.scale.set(1);
	if(txt.width > limitWidth)
		txt.scale.set(limitWidth/txt.width);
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

function BitmapFontLoad(parent, str, x, y, ax, ay, style, limitWidth)
{
	if(limitWidth === undefined) limitWidth = 0;
	var txt = new PIXI.extras.BitmapText(str, style);
	txt.anchor.set(ax, ay);
	txt.position.x = x;
	txt.position.y = y;
	
	if(limitWidth > 0 && txt.width > limitWidth) // 자동으로 사이즈를 줄여준다.
		txt.scale.set(limitWidth/txt.width);
	
	parent.addChild(txt);
	
	return txt;
}

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
	if(x != undefined) spine.position.x = x;
	if(y != undefined) spine.position.y = y;

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
	
	for(var i=0;i<spine.state.tracks.length;++i){
		if(spine.state.tracks[i] != null)
			spine.state.clearTrack(spine.state.tracks[i].trackIndex);
	}
	spine.state.setAnimation(trackIndex, aniName, loop);
//	spine.state.timeScale = 1;
//	spine.skeleton.setSlotsToSetupPose();	// 슬롯만 초기화.
//	spine.skeleton.setBonesToSetupPose();	// 본만 초기화.	
//	spine.state.update(0);
}

function SpineStop(spine)
{
	spine.visible = false;
	for(var i=0;i<spine.state.tracks.length;++i){
		if(spine.state.tracks[i] != null)
			spine.state.clearTrack(spine.state.tracks[i].trackIndex);
	}
}
//=============================================================================
// 폰트 로드.
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
// yahooIN : modifier : kook : 일본대응 : strGamePath추가.
var tbSoundName = [
	[strGamePath+"sound/BGM_Title.mp3", strGamePath+"sound/BGM_Title.ogg"],
	[strGamePath+"sound/BGM_Game.mp3", strGamePath+"sound/BGM_Game.ogg"],

	[strGamePath+"sound/SE_ButtonClick.mp3", strGamePath+"sound/SE_ButtonClick.ogg"],
	[strGamePath+"sound/SE_CameraShot.mp3", strGamePath+"sound/SE_CameraShot.ogg"],
	[strGamePath+"sound/SE_CatFind.mp3", strGamePath+"sound/SE_CatFind.ogg"],
	[strGamePath+"sound/SE_Excellent.mp3", strGamePath+"sound/SE_Excellent.ogg"],
	[strGamePath+"sound/SE_Go.mp3", strGamePath+"sound/SE_Go.ogg"],
	[strGamePath+"sound/SE_Good.mp3", strGamePath+"sound/SE_Good.ogg"],
	[strGamePath+"sound/SE_Great.mp3", strGamePath+"sound/SE_Great.ogg"],
	[strGamePath+"sound/SE_Heart.mp3", strGamePath+"sound/SE_Heart.ogg"],
	[strGamePath+"sound/SE_Hint.mp3", strGamePath+"sound/SE_Hint.ogg"],
	[strGamePath+"sound/SE_Item1.mp3", strGamePath+"sound/SE_Item1.ogg"],
	[strGamePath+"sound/SE_Item2.mp3", strGamePath+"sound/SE_Item2.ogg"],
	[strGamePath+"sound/SE_LastItem.mp3", strGamePath+"sound/SE_LastItem.ogg"],
	[strGamePath+"sound/SE_Obstacle_Bush.mp3", strGamePath+"sound/SE_Obstacle_Bush.ogg"],
	[strGamePath+"sound/SE_Obstacle_Cage.mp3", strGamePath+"sound/SE_Obstacle_Cage.ogg"],
	[strGamePath+"sound/SE_Obstacle_Fireplug.mp3", strGamePath+"sound/SE_Obstacle_Fireplug.ogg"],
	[strGamePath+"sound/SE_Obstacle_Glass.mp3", strGamePath+"sound/SE_Obstacle_Glass.ogg"],
	[strGamePath+"sound/SE_Obstacle_TrashCan.mp3", strGamePath+"sound/SE_Obstacle_TrashCan.ogg"],
	[strGamePath+"sound/SE_PageTransitions.mp3", strGamePath+"sound/SE_PageTransitions.ogg"],
	[strGamePath+"sound/SE_PhotoFailed.mp3", strGamePath+"sound/SE_PhotoFailed.ogg"],
	[strGamePath+"sound/SE_PhotoPrinting.mp3", strGamePath+"sound/SE_PhotoPrinting.ogg"],
	[strGamePath+"sound/SE_PhotoPrints.mp3", strGamePath+"sound/SE_PhotoPrints.ogg"],
	[strGamePath+"sound/SE_PhotoSuccess.mp3", strGamePath+"sound/SE_PhotoSuccess.ogg"],
	[strGamePath+"sound/SE_PlayerMove.mp3", strGamePath+"sound/SE_PlayerMove.ogg"],
	[strGamePath+"sound/SE_PopupOff.mp3", strGamePath+"sound/SE_PopupOff.ogg"],
	[strGamePath+"sound/SE_PopupOn.mp3", strGamePath+"sound/SE_PopupOn.ogg"],
	[strGamePath+"sound/SE_PuzzleMatching.mp3", strGamePath+"sound/SE_PuzzleMatching.ogg"],
	[strGamePath+"sound/SE_PuzzleNotMatch.mp3", strGamePath+"sound/SE_PuzzleNotMatch.ogg"],
	[strGamePath+"sound/SE_Ready.mp3", strGamePath+"sound/SE_Ready.ogg"],
	[strGamePath+"sound/SE_Shuffle.mp3", strGamePath+"sound/SE_Shuffle.ogg"],
	[strGamePath+"sound/SE_StageClear.mp3", strGamePath+"sound/SE_StageClear.ogg"],
	[strGamePath+"sound/SE_StageFail.mp3", strGamePath+"sound/SE_StageFail.ogg"]];
var BGM_Title = 0;
var BGM_Game = 1;

var SE_ButtonClick = 0;
var SE_CameraShot = 1;
var SE_CatFind = 2;
var SE_Excellent = 3;
var SE_Go = 4;
var SE_Good = 5;
var SE_Great = 6;
var SE_Heart = 7;
var SE_Hint = 8;
var SE_Item1 = 9;
var SE_Item2 = 10;
var SE_LastItem = 11;
var SE_Obstacle_Bush = 12;
var SE_Obstacle_Cage = 13;
var SE_Obstacle_Fireplug = 14;
var SE_Obstacle_Glass = 15;
var SE_Obstacle_TrashCan = 16;
var SE_PageTransitions = 17;
var SE_PhotoFailed = 18;
var SE_PhotoPrinting = 19;
var SE_PhotoPrints = 20;
var SE_PhotoSuccess = 21;
var SE_PlayerMove = 22;
var SE_PopupOff = 23;
var SE_PopupOn = 24;
var SE_PuzzleMatching = 25;
var SE_PuzzleNotMatch = 26;
var SE_Ready = 27;
var SE_Shuffle = 28;
var SE_StageClear = 29;
var SE_StageFail = 30;

var arrBGM = [];
var arrSE = [];
var iBGMCurrent = -1;
var bHideSound = false;
function BGMSoundPlay(index, loop)
{
	if(kData.bSoundBGM == false) return;
	if(loop === undefined) loop = true;
	if(iBGMCurrent != -1)
		arrBGM[iBGMCurrent].stop();

	iBGMCurrent = index;
	arrBGM[iBGMCurrent]._loop = loop;
	arrBGM[iBGMCurrent].play();
}

function BGMSoundStop()
{
	if(kData.bSoundBGM == false) return;
	if(iBGMCurrent == -1) return;

	if(arrBGM[iBGMCurrent].playing() == true)
		arrBGM[iBGMCurrent].stop();
}

function BGMSoundPause()
{
	if(iBGMCurrent != -1)
		arrBGM[iBGMCurrent].pause();
}

function BGMSoundResume()
{
	if(kData.bSoundBGM == false) return;
	if(iBGMCurrent == -1){
		if(state == STATE_TITLE || state == STATE_STAGE){
			BGMSoundPlay(BGM_Title);
		}else if(state == STATE_GAME)
			BGMSoundPlay(BGM_Game);
		return;
	}
	if(arrBGM[iBGMCurrent].playing() == true) return;

	arrBGM[iBGMCurrent].play();
}

function SESoundPlay(index, loop, volume)
{
	if(kData.bSoundSE == false) return;
	if(bHideSound == true) return;
	if(arrSE[index] === undefined) return;
	if(loop === undefined) loop = false;
	if(volume === undefined) volume = 1;

	arrSE[index]._loop = loop;
//	if(index != SE_freeHope)
		arrSE[index].id = arrSE[index].play();
//	else
//		arrSE[index].id = arrSE[index].play('sp1');
	arrSE[index].vol = volume;
	arrSE[index].volume(volume, arrSE[index].id);
}

function SESoundStop(index)
{
	if(kData.bSoundSE == false) return;
	if(arrSE[index] == undefined) return;

	if(arrSE[index].playing() == true)
		arrSE[index].stop();
}

function SESoundFade(index, endVolume, time)
{
	if(kData.bSoundSE == false) return;
	if(arrSE[index] == undefined) return;
	if(arrSE[index].playing() == false) return;

	arrSE[index].fade(arrSE[index].vol, endVolume, time, arrSE[index].id);
	arrSE[index].vol = endVolume;
}

function SESoundPause(index)
{
	if(kData.bSoundSE == false) return;

	if(index === undefined) {
		for (var i = 0; i < arrSE.length; ++i) {
			if (arrSE[i].playing() == true)
				arrSE[i].fade(arrSE[i].vol, 0, 10, arrSE[i].id);
		}
	}else{
		if (arrSE[index].playing() == true)
			arrSE[index].fade(arrSE[index].vol, 0, 10, arrSE[index].id);
	}
}

function SESoundResume(index)
{
	if(kData.bSoundSE == false) return;
	if(bHideSound == true) return;

	if(index === undefined) {
		for (var i = 0; i < arrSE.length; ++i) {
			if (arrSE[i].playing() == true)
				arrSE[i].fade(0, arrSE[i].vol, 10, arrSE[i].id);
		}
	}else{
		if (arrSE[index].playing() == true)
			arrSE[index].fade(0, arrSE[index].vol, 10, arrSE[index].id);
	}
}

function SoundPause()
{
	bHideSound = true;
	BGMSoundPause();
	SESoundPause();
}

function SoundResume()
{
	bHideSound = false;
//	if(gameState == STATE_GAME_PAUSE) return;
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
	tickNow = Date.now();
	deltaTime = (tickNow - tickLast) * 0.001;
	tickLast = tickNow;
}
//=============================================================================
// 초를 시간으로 표시
//=============================================================================
function GetTime(v)
{
	return GetMM(v) + ":" + GetSS(v);
}
function GetMM(v)
{
	return leadingZeros(Mathfloor(v/60), 2);
}
function GetSS(v)
{
	return leadingZeros(Mathfloor(v%60), 2);
}
//=============================================================================
//점수 카운트 관련
//=============================================================================
/*
function lerp(minNum, maxNum, t){ //t 값은 0~1사이의 값을 가집니다.
	var _num;
	if(t>=1){
		_num = maxNum;
		return Mathfloor(_num);
	}
	
	_num = (maxNum - minNum)*t + minNum;
	
	return Mathfloor(_num);
}//t 값 구성 방법 : updateTick()을 이용 , 쌓이는 시간 변수 += deltaTime, t = 쌓이는 시간 변수 / 맥스지점까지 도달하는데 걸리는 시간 입니다.
*/
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
		r1 = Mathfloor(Math.random() * random.length);
		r2 = Mathfloor(Math.random() * random.length);
		
		temp = random[r1];
		random[r1] = random[r2];
		random[r2] = temp;
	}
}

var iMathFloor = 0;
function Mathfloor(n)
{
	iMathFloor = n|0;
	if(iMathFloor < 0)
		return Math.floor(n);

	return iMathFloor;
}
//=============================================================================
//	세이브 관련
//=============================================================================
var kData = new Data();

var SAVE_TIME_INIT = 10;
var SAVE_VER = 0;
//LoadDataInClient();
function Data(){
	this.iVer;
	this.bSoundBGM;
	this.bSoundSE;

	this.iCash;
	this.iMoviPoint;
	this.iLife;
	this.fLifeTime;
	this.fServerTime;

	this.iStageMax;			// 진행한 최고 스테이지..
	this.iCatSelect;		// 선택한 고양이..
	
	this.iCatGet;			// 고양이를 획득했는지 체크.
	this.iClearStage;		// 스테이지 상태..
	this.dicAlbumNew;		// 고양이 앨범 new처리용..
	this.iCatGetCnt;		// 고양이 획득 갯수
	this.iStageScoreMax;	// 큰점수를 저장해 놓는다.
	this.iTutorial;

	this.fADTime;
	this.timeSTAMP;
	this.calcedTimeStamp;
}

// 데이터 초기화..
function InitData()
{
	var i, k;
	kData = new Data();
	kData.iVer = SAVE_VER;
	kData.bSoundBGM = true;
	kData.bSoundSE = true;
	
	kData.iLife = iLifeFirstCnt;
	kData.fLifeTime = 0;
	kData.fServerTime = 0;
	
	kData.iStageMax = 0;
	kData.iCatSelect = [-1, -1, -1, -1];	// -1은 미선택, 그외는 선택된 고양이..
	
	// 새로 추가하는 변수들..
	kData.iCatGet = [];
	kData.iClearStage = [];
	kData.iStageScoreMax = [];
	for(i=0;i<300;++i)
	{
		kData.iCatGet[i] = [];	// 2차원배열 선언..
		kData.iClearStage[i] = STAGE_CLOSE;	// 스테이지가 오픈되었는제 체크한다.
	//	kData.iClearStage[i] = STAGE_OPEN;	// todo : 임시로 오픈함.
		for(k=0;k<4;++k)
			kData.iCatGet[i][k] = CAT_NONE;
		kData.iCatGet[i][4] = 0;	// 고양이 몇개 얻었는지 체크한다.
        kData.iCatGet[i][5] = 0;	// 고양이 얻는거 실패 횟수를 체크한다.
		kData.iStageScoreMax[i] = 0;
	}
	kData.iClearStage[0] = STAGE_OPEN;

	kData.dicAlbumNew = [{}, {}, {}, {}, {}, {}];
//	kData.dicAlbumNew[0][0] = 0;
//	kData.dicAlbumNew[0][5] = 0;
//	kData.iCatGet[0][0] = CAT_GET_NEW;	// 임시로 오픈..
//	kData.iCatGet[1][1] = CAT_GET_NEW;
	kData.iCatGetCnt = [0, 0, 0, 0, 0, 0];
	kData.iTutorial = [0, 0, 0, 0, 0];	// 튜토리얼 진행여부 체크.
	kData.fADTime = [-1, -1, -1, -1];

	SaveDataInClient();
	networkManager.ForcedSaveData();
}

// modifier : kook : 일본대응
function SaveDataInClient()
{
	if(yahooIN == undefined) {
		var strJson = JSON.stringify(kData);
		//console.log("=== SaveDataInClient() : " + strJson);
		localStorage.setItem('Neo_NekoPang.game.com', strJson);
		saveLocal('Neo_NekoPang.game.com');
	}
}

function LoadDataInClient()
{
	/*if(yahooIN == undefined) {
		var strJson = localStorage.getItem('Neo_NekoPang.game.com');
		//console.log("=== LoadDataInClient() : " + strJson);
		if (strJson != undefined) {
			kData = JSON.parse(strJson);
			if (kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
				InitData();
		}
		else*/
			InitData();
	//}
}

//=============================================================================
//버튼 스케일링
//=============================================================================
Object.defineProperties(PIXI.Container.prototype, {
	sx: {
		get:function(){return this.scale.x;},
		set:function(v){this.scale.x=v;}
	},
	sy: {
	    get:function(){return this.scale.y;},
	    set:function(v){this.scale.y=v;}
	},
	as: {
		get:function(){return this.scale.y;},
		set:function(v){this.scale.x=v;this.scale.y=v;}
	}
});//container 용

function scaleUp(){ //크기 키우기
	TweenMax.to(this, 0.2, {sx:1.05, sy:1.05, ease:Back.easeOut.config(5.0)});
}

function restoreScale(){ //크기 되돌리기
	TweenMax.to(this, 0.2, {sx:1, sy:1, ease:Linear()});
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
// 트윈할 오브젝트, 플레이타임, 딜레이타임, from, to, 루프 여부, easing메쏘드
function TweenPlay(obj, playtime, delaytime, from, to, loop, easing, callback)
{
	var tween = PIXI.tweenManager.createTween(obj);
	tween.time = playtime * 1000;
	tween.delay = delaytime * 1000;
	tween.easing = easing;
	if(from != null)	tween.from(from);
    if(to != null)		tween.to(to);
	tween.loop = loop;
	tween.start();
	
	if(callback != undefined)
		tween.on('end', callback);
	
	return tween;
}
 */