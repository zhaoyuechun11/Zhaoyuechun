var iMaxSizeX = 720;
var iMaxSizeY = 1280;

var iCenterSizeX = iMaxSizeX/2;
var iCenterSizeY = iMaxSizeY/2;

var isChrome = false;
var isIE11 = false;
var isIE = false;

var bMGCHEAT = false;//common
var strGamePath = strGamePath||"";//common
var kMGMenu = undefined;//common

var yahooIN = yahooIN||undefined;
var biPhone = false;

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

detectBrowser();

function detectBrowser(){
	var userAgent = navigator.userAgent.toLowerCase();
	
	if(userAgent.indexOf("msie ") != -1)//explorer edge 미만.
		isIE = true;
	else if(userAgent.indexOf("chrome") != -1)
		isChrome = true;
	else if(userAgent.indexOf("trident") != -1)
		isIE11 = true;
}

var renderer = PIXI.autoDetectRenderer(iMaxSizeX, iMaxSizeY);
renderer.backgroundColor = 0xffffff;//0x2e85ed(파랑)



var bRotation = false;

var bPhone;	// 폰인지 아닌지 체크.
if (/Android/i.test(navigator.userAgent)) {
    bPhone = true;
} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    bPhone = true;
} else {
    bPhone = false;
}

$(window).resize(resize);	// jquery를 사용한다.
window.onorientationchange = resize;

var objDiv;
if(yahooIN !== undefined){
    objDiv = document.getElementById("game_area");
    objDiv.appendChild(renderer.view);
   // $("#game_mask").css("background-image", "url(\"https://game.jp/img/Gameplaybg_0002.gif\")");
} else {
    document.body.appendChild(renderer.view);
    document.body.appendChild(document.getElementById("turn"));
}

resize(); // 최초 한번 리사이즈를 해주고 변동사항이 있을경우 리사이즈를 계속 해준다.
// /**
//  * font load start
//  * */
// window.WebFontConfig = {
//     active: function() {
//         // console.log("hihi");
//     },
//     custom: {
//         families:[GAME.webFontName[lang]],
//         urls: [strGamePath+'./font/fonts.css']
//     }
// };
//
// (function() {
//     var wf = document.createElement('script');
//     wf.src = wf.src = strGamePath+"../Common/webfont.js";
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s);
// })();
// /**
//  * font load end
//  * */

// if(yahooIN===undefined) document.body.appendChild(renderer.view);

function resize()
{
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

function SpriteLoad(parent, url, px, py, ax, ay)
{
	if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;
	// var spr = SpritePool.getInstance().get(url);
	var spr = new PIXI.Sprite.fromFrame(url);
	spr.position.x = px;
	spr.position.y = py;
	spr.anchor.x = ax;
	spr.anchor.y = ay;
	
	parent.addChild(spr);
	
	return spr;
}

function SpriteSliceLoad(parent, url, px, py, w, h, lc, rc, tc, bc, ax, ay)
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

function SlicedSpriteChangeTexture(_spr,_textureURL) {
    var tex = new PIXI.Texture.fromFrame(_textureURL);

    for(var i=0,imax = 9;i<imax;++i){
        _spr.children[i].texture = new PIXI.Texture(tex, _spr.children[i]._texture.frame);
    }
}

function SlicedSpriteChangeTexture_01(_sliceSpr, _texture){
    for(var i=0,imax = 9;i<imax;++i){
        _sliceSpr.children[i].texture = new PIXI.Texture(_texture, _sliceSpr.children[i]._texture.frame);
    }
}

function SlicedSpriteChangeTexture_02(_sliceSpr, _sliceSpr_2){
    for(var i=0,imax = 9;i<imax;++i){
        _sliceSpr.children[i].texture = _sliceSpr_2.children[i].texture;
    }
}

function getDist(targetPos, startPos) {
	var a = (targetPos.x - startPos.x) * (targetPos.x - startPos.x);
	var b = (targetPos.y - startPos.y) * (targetPos.y - startPos.y);
	
	return Math.sqrt(a+b);
}

function SpinePlay(spine, x, y, aniName, trackIndex, loop)
{
	if(trackIndex === undefined) trackIndex = 0;
	if(loop === undefined) loop = false;
	spine.visible = true;
	spine.alpha = 1;
	if(x != undefined) spine.position.x = x;
	if(y != undefined) spine.position.y = y;

	spine.state.setAnimation(trackIndex, aniName, loop);
}

function SpinePlay_1(spine, aniName, trackIndex, loop){
    if(trackIndex === undefined) trackIndex = 0;
    if(loop === undefined) loop = false;
    spine.visible = true;
    spine.alpha = 1;

    spine.state.setAnimation(trackIndex, aniName, loop);
}

function FontLoad(parent, str, x, y, style, ax, ay, limitWidth)
{
	if(limitWidth === undefined) limitWidth = 0;
	if(ax === undefined) ax = 0.5;
    if(ay === undefined) ay = 0.5;

	var txt = new PIXI.Text(str, style);
	txt.anchor.set(ax, ay);
	txt.position.x = x;
	txt.position.y = y;
	
	if(limitWidth > 0 && txt.width > limitWidth) // 자동으로 사이즈를 줄여준다.
		txt.scale.set(limitWidth/txt.width);
	
	parent.addChild(txt);
	
	return txt;
}

function fontLimited(_pixiTextObj, _text, _limitWidth){
    _pixiTextObj.scale.set(1);
    _pixiTextObj.text = _text;
    if(_limitWidth>0 && _pixiTextObj.width>_limitWidth){
        _pixiTextObj.scale.set(_limitWidth/_pixiTextObj.width);
    }
}
//////save && load///////
var kData = new Data();
var SAVE_TIME_INIT = 10;
var SAVE_VER = 1;

function Data(){
	this.iVer = 1;
	this.bSoundBGM = true;
	this.bSoundSE = true;
	this.iHighScore = 0;//개인 최고 점수
	this.iRankScore = 0;//서버에 날릴 랭킹 스코어
	this.iGemCount = 0;
	this.greappoint = 0;

    //endTime
    this.gameMoney_add_time_1 = 0;
    this.gameMoney_add_time_2 = 0;
    this.gameMoney_add_time_3 = 0;

    // this.lastSeverTime = 0;

	this.bonusGemEndTime = 0;
}

// 데이터 초기화..
function InitData()
{
	kData.bSoundBGM = true;
	kData.bSoundSE = true;
	kData.iHighScore = 0;
	kData.iRankScore = 0;
	kData.iGemCount = 0;
    kData.gameMoney_add_time_1 = 0;
    kData.gameMoney_add_time_2 = 0;
    kData.gameMoney_add_time_3 = 0;

    // kData.lastSeverTime = 0;

    kData.bonusGemEndTime = 0;
    SaveDataInClient();
}

function SaveDataInClient(){
    if(yahooIN===undefined){
        var strJson = JSON.stringify(kData);
        localStorage.setItem("Neo_Dash.gamegrape.co.kr", strJson);
        saveLocal("Neo_Dash.gamegrape.co.kr");
    }
}

function LoadDataInClient(){
    if(yahooIN===undefined){
        var strJson = localStorage.getItem("Neo_Dash.gamegrape.co.kr");
        if(strJson != null)
        {
            kData = JSON.parse(strJson);
            if(kData.iVer === undefined || kData.iVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
                InitData();
        }
        else
            InitData();
    }
}
/////////////////////////

/////////sound///////////
var arrBGM = [];
var arrSE = [];

var BGM_BG = 0;
var SE_BUTTON = 0;
var SE_CHU = 1;
var SE_DROP = 2;
var SE_GETGEM = 3;
var SE_ICEHIT = 4;
var SE_ICEBROKEN = 5;
var SE_BOOMTALE = 6;
var SE_MOVE = 7;
var SE_DOOR = 8;
var SE_TALEMOVE = 9;
var SE_SUPRISE = 10;
var SE_DASH = 11;
var SE_CONGRATULATION = 12;
var SE_WALL = 13;
var SE_CONFUSE = 14;
var SE_EGGHIT = 15;
var SE_HALFSIGN = 16;
var SE_ITEMBOXHIT= 17;
var SE_NEWBEST = 18;
var SE_POWERUP = 19;
var SE_ITEMDROP = 20;


var iBGMCurrent = -1;

function BGMSoundPlay(index, loop)
{
	if(loop === undefined) loop = true;
	
	if(kData.bSoundBGM === false) return;
	if(arrBGM[index].playing()) return;
	
	iBGMCurrent = index;
    arrBGM[iBGMCurrent]._loop = loop;
    arrBGM[iBGMCurrent].play();
}

function BGMSoundStop()
{
	if(kData.bSoundBGM === false) return;
	if(iBGMCurrent === -1) return;
	
	arrBGM[iBGMCurrent].stop();
}

function BGMSoundPause()
{
	if(iBGMCurrent === -1) return;
	arrBGM[iBGMCurrent].pause();
}

function BGMSoundResume()
{
    arrBGM[iBGMCurrent].play();
}

function SESoundPlay(index, loop)
{
	if(loop === undefined) loop = false;
	if(kData.bSoundSE == false) return;
	if(arrSE[index] == null) return;

    arrSE[index]._loop = loop;
    return arrSE[index].play();
}

function SESoundStop(index)
{
	if(kData.bSoundSE == false) return;
	if(arrSE[index] == null) return;
	
	arrSE[index].stop();
}

function SESoundPause()
{
	for(var i=0;i<arrSE.length;++i)
	{
		if(arrSE[i] != null && arrSE[i].playing == true)
			arrSE[i].pause();
	}
}

function SESoundResume()
{
	if(kData.bSoundSE == true)
	{
		for(var i=0;i<arrSE.length;++i)
		{
			if(arrSE[i] != null && arrSE[i].paused == true)
				arrSE[i].play();
		}
	}
}

function SoundPause()
{
	BGMSoundPause();
	SESoundPause();
}

function SoundResume()
{
	BGMSoundResume();
	SESoundResume();
}

/////////////////////////

///////////////////////////////////
///////////need data///////////////
///////////////////////////////////
var test_resourceVer = "0.001";
var tbImgGame = [
    strGamePath+"img/game_back.png",
    strGamePath+"img/back_line_1.png",
    strGamePath+"img/back_line_2.png",
    strGamePath+"img/back_line_3.png",
    strGamePath+"img/grade_all.png",
    strGamePath+"img/white.png",
    strGamePath+"img/power_up_eff.png",
	////atlas////
	strGamePath+"img/atlas/ui-0.json?ver="+test_resourceVer
];
///////////sound activation control////////////////
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

window.addEventListener('focus', function() {
    BGMSoundPlay(0, true);
}, false);

//윈도우창을 닫을때 이벤트.
window.addEventListener('blur', function() {
    console.log("blur");
    BGMSoundPause();
    // if(GAME.view !== undefined && engine !==undefined){
    //     if(engine.state !== engine.gameState.STATE_TITLE){
    //         if(!GAME.view.sprPausePopBG.visible)
    //             showPausePop();
    //     }
    // }//pause

}, false);

var focusOnOff = true;
function handleVisibilityChange() {
    console.log("hidden");
	if (document[hidden]) {
        BGMSoundPause();
		focusOnOff = false;
	} else {
        if(GAME.engine.state === GAME.engine.gameState.STATE_OVER) return;
		BGMSoundPlay(0, true);
		focusOnOff = true;
	}
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);//success~~~~!!!!!

var areYouReallySure = false;
var internalLink = false;
function areYouSure() {
    if(allowPrompt){
        if (!areYouReallySure && !internalLink && true) {
            areYouReallySure = true;
            var confMessage = "***************************************\n\n 기다리세요 !!! \n\n우리 사이트에는 그누보드,영카트를 위한 다양한 스킨과 홈페이지 운영에 유용한 많은 솔루션을 소개하고 있습니다.\n\n\n더 머물기를 원하시면 *취소* 버튼을 클릭하세요.\n\n***************************************"
            return confMessage;
        }
    }else{
        allowPrompt = true;
    }
}

var allowPrompt = true;

function test_00() {
    // if(allowPrompt){
    //
    //     if (!areYouReallySure && !internalLink && true) {
    //         console.log("helleoeooe");
    //         // areYouReallySure = true;
    //         // var confMessage = "***************************************\n\n 기다리세요 !!! \n\n우리 사이트에는 그누보드,영카트를 위한 다양한 스킨과 홈페이지 운영에 유용한 많은 솔루션을 소개하고 있습니다.\n\n\n더 머물기를 원하시면 *취소* 버튼을 클릭하세요.\n\n***************************************"
    //         // return confMessage;
    //         return 1;
    //     }
    // } else {
    //     allowPrompt = true;
    // }
    // console.log("hiaa");
    return 1;
}
// window.onbeforeunload = test_00;

// window.addEventListener("beforeunload", function () {
//     alert("wait!!");
//     console.log("wait");
// });

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Timer(parent, fontStyle, coolTime, px, py, ax, ay){//coolTime : seconds
    if(px === undefined) px = 0;
    if(py === undefined) py = 0;
    if(ax === undefined) ax = 0.5;
    if(ay === undefined) ay = 0.5;

    this.txt_coolTime = FontLoad(parent, "00:00", px, py
        , fontStyle, ax, ay);

    this.coolEndTime = 0;
    this.coolTime = coolTime;
    this.remainTime = 0;
    this.curTime = 0;
    this.days = 0;
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.remainTime = undefined;

    this.cb_ableFunction = undefined;

    this.bEndCool = false;

    this.txt_coolTime.visible = false;
}

Timer.constructor = Timer;

Timer.prototype.update = function(){
    if(this.remainTime > 0){
        this.minutes = Math.floor(this.remainTime / 60);
        this.hours = Math.floor(this.minutes/60);
        this.days = Math.floor(this.hours/24);
        this.seconds = Math.floor(this.remainTime % 60);

        if(this.days>0){
            this.txt_coolTime.text = this.days.toString()+"D";
        } else if(this.hours>0){
            this.txt_coolTime.text = this.hours.toString()+"H";
        } else {
            if(this.minutes < 10)
                this.minutes = "0" + this.minutes.toString();
            else
                this.minutes = this.minutes.toString();
            if(this.seconds < 10)
                this.seconds = "0" + this.seconds.toString();
            else
                this.seconds = this.seconds.toString();
            this.txt_coolTime.text =  this.minutes + ":" + this.seconds;
        }
    }
};

Timer.prototype.checkRemainTime = function(THIS){
    if(this.remainTime<=0){
        this.remainTime = 0;
        if(this.cb_ableFunction === undefined) return;
        this.cb_ableFunction(THIS);
    }
};

Timer.prototype.setCoolEndTime = function(endTime){
    if(endTime === undefined){
        this.curTime = Date.now() * 0.001;
        this.coolEndTime = this.curTime + this.coolTime;
    } else {
        this.coolEndTime = endTime;
    }
};