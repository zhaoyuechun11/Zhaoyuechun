var iMaxSizeX = 720;
var iMaxSizeY = 1280;

var iCenterSizeX = iMaxSizeX/2;
var iCenterSizeY = iMaxSizeY/2;

var isChrome = false;
var isIE11 = false;
var isIE = false;

var bMGCHEAT = false;//common
var strGamePath = strGamePath||"";//common
var kMGMenu = undefined;

var user_id = undefined;
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
	
	if(userAgent.indexOf("msie ") != -1)
		isIE = true;
	else if(userAgent.indexOf("chrome") != -1)
		isChrome = true;
	else if(userAgent.indexOf("trident") != -1)
		isIE11 = true;
}

var renderer = PIXI.autoDetectRenderer(iMaxSizeX, iMaxSizeY);
renderer.backgroundColor = 0xffffff;//0x2e85ed(파랑)

var bPhone;	// 폰인지 아닌지 체크.
if (/Android/i.test(navigator.userAgent)) {
    bPhone = true;
} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    bPhone = true;
} else {
    bPhone = false;
}

var bRotation = false;

$(window).resize(resize);
window.onorientationchange = resize;

var objDiv;
if(yahooIN !== undefined){
    objDiv = document.getElementById("game_area");
    objDiv.appendChild(renderer.view);
    $("#game_mask").css("background-image", "url(\"https://game.jp/img/Gameplaybg_0007.gif\")");
} else {
    document.body.appendChild(renderer.view);
    document.body.appendChild(document.getElementById("turn"));
}
resize();

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

    if(lc===undefined) lc = ((bw/2)|0)-1;
    if(rc===undefined) rc = ((bw/2)|0)-1;
    if(tc===undefined) tc = ((bh/2)|0)-1;
    if(bc===undefined) bc = ((bh/2)|0)-1;
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
        _spr.children[i].texture = new PIXI.Texture(tex, _spr.children[i]._texture._frame);
    }
}

function SlicedSpriteChangeTexture_01(_sliceSpr, _texture){
    for(var i=0,imax = 9;i<imax;++i){
        _sliceSpr.children[i].texture = new PIXI.Texture(_texture, _sliceSpr.children[i]._texture._frame);
    }
}

function SpinePlay(spine, x, y, aniName, trackIndex, loop)
{
	if(trackIndex === undefined) trackIndex = 0;
	if(loop === undefined) loop = false;
	spine.visible = true;
	spine.alpha = 1;
	if(x != null) spine.position.x = x;
	if(y != null) spine.position.y = y;
	// spine.state.clearTracks();				//
	spine.state.setAnimation(trackIndex, aniName, loop);
}

function SpinePlay_1(spine, aniName, trackIndex, loop){
    if(trackIndex === undefined) trackIndex = 0;
    if(loop === undefined) loop = false;
    spine.visible = true;
    spine.alpha = 1;
    spine.state.timeScale = 1;

    spine.state.setAnimation(trackIndex, aniName, loop);
}
////////////////////////FONT////////////////////////////////////////
function FontLoad(parent, str, x, y, style, ax, ay, limitWidth)
{
	if(limitWidth === undefined) limitWidth = 0;
	if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;
	var txt = new PIXI.Text(str, style);
	parent.addChild(txt);
	txt.anchor.set(ax, ay);
	txt.position.x = x;
	txt.position.y = y;
	
	if(limitWidth > 0 && txt.width > limitWidth) //
		txt.scale.set(limitWidth/txt.width);

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
// LoadDataInClient();

function Data(){
	this.iVer = 1;
	this.bSoundSE = true;
	this.bSoundBGM = true;
	this.bFirstPlay = true;
	this.iUserOwnGun = 0;
	this.iUserOwnGold = 0;
	// this.iShowAdTime = 0;
	this.iBestFloor = 0;
	this.iClimbFloor = 0;
	this.arrBuyRecords = [true];//
	this.greappoint = 0;//유저 greappoint
	// this.iHeart = 0;//좀비 건에는 하트 시스템 없음.
	// this.fHeartTime = 0;//좀비 건에는 하트 시스템 없음.

	this.userRank = undefined;

	this.gold_ad_time_1 = 0;
	this.gold_ad_time_2 = 0;
	this.gold_ad_time_3 = 0;
}

function InitData()
{
	kData.iVer = 1;
	kData.bSoundSE = true;
	kData.bSoundBGM = true;
	kData.bFirstPlay = true;
	kData.iUserOwnGun = 0;
	kData.iUserOwnGold = 0;
	// kData.iShowAdTime = 0;
	kData.iBestFloor = 0;
    kData.iClearFloor = 0;

	kData.arrBuyRecords = [true];//배열 초기화

	kData.userRank = undefined;

	kData.gold_ad_time_1 = 0;
    kData.gold_ad_time_2 = 0;
    kData.gold_ad_time_3 = 0;

	SaveDataInClient();
}

function SaveDataInClient()
{
	if(yahooIN == undefined) {
		var strJson = JSON.stringify(kData);
		localStorage.setItem("Neo_ZombieGun.gamegrape.co.kr", strJson);
		saveLocal("Neo_ZombieGun.gamegrape.co.kr");///netBase.js function//
	}
}

function LoadDataInClient()
{
	if(yahooIN == undefined) {
		var strJson = localStorage.getItem("Neo_ZombieGun.gamegrape.co.kr");
		if (strJson != null) {
			kData = JSON.parse(strJson);
			if (kData.iVer === undefined || kData.iVer != SAVE_VER) //
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
var SE_ZOMBIE_DIE_1 = 1;
var SE_ZOMBIE_DIE_2 = 2;
var SE_HUMAN_DIE = 3;
var SE_ELEVATOR_MOVE = 4;
var SE_ELEVATOR_ARRIVE = 5;
var SE_ELEVATOR_OPEN = 6;
var SE_ELEVATOR_CLOSE = 7;
var SE_SIREN_RED = 8;
var SE_SIREN_BLUE = 9;
var SE_SPEEDUP = 10;
var SE_ZOMBIE_WIN = 11;
var SE_GAMEOVER = 12;
var SE_GUN_0 = 13;
var SE_GUN_1 = 14;
var SE_GUN_2 = 15;
var SE_GUN_3 = 16;
var SE_GUN_4 = 17;
var SE_GUN_5 = 18;
var SE_GUN_6 = 19;
var SE_GUN_7_1 = 20;
var SE_GUN_7_2 = 21;
var SE_ZOMBIE_DIE_3 = 22;
var SE_ZOMBIE_DIE_4 = 23;
var SE_LifeDown = 24;

var iBGMCurrent = -1;
// var iBGMOld = -1;

// var soundCtrl = [];
// var bgm_title;

function BGMSoundPlay(index, loop)
{
    if(kData.bSoundBGM == false) return;
    if(loop === undefined) loop = true;
    if(arrBGM[index].playing()) return;

    arrBGM[index]._loop = loop;
    arrBGM[index].play();
    iBGMCurrent = index;
}

function BGMSoundStop()
{
	if(kData.bSoundBGM == false) return;
	if(iBGMCurrent == -1) return;
    arrBGM[iBGMCurrent].stop();
}

function BGMSoundPause()
{
	if(iBGMCurrent == -1) return;
    if(iBGMCurrent != -1)
        arrBGM[iBGMCurrent].pause();
}

function SESoundPlay(index, loop)
{
    if(!kData.bSoundSE) return;
    if(loop === undefined) loop = false;

    arrSE[index]._loop = loop;
    arrSE[index].play();
}

function SESoundStop(index)
{
    // for(var i=0;i<arrSE.length;++i) {
    //     arrSE[i].stop();
    // }
    arrSE[index].stop();
}

function SESoundPause()
{
    for(var i=0;i<arrSE.length;++i) {
            arrSE[i].pause();
    }
}

function SESoundResume()
{
	if(kData.bSoundSE == true) {
		for(var i=0;i<arrSE.length;++i) {
            arrSE[i].play();
		}
	}
}

function SoundPause()
{
	BGMSoundPause();
    SESoundPause();
}

/////////////////////////

///////////////////////////////////
///////////need data///////////////
///////////////////////////////////

var tbImgGame = [
                 strGamePath+"img/back_2.png",
                 strGamePath+"img/back.png",
                 strGamePath+"img/gun_range.png",
                 strGamePath+"img/touch_area.png",
                 strGamePath+"img/grade_all.png",
                 strGamePath+"img/grade_violence.png",
                 ////ui_atlas////////
                 strGamePath+"img/atlas/zombie_ui-0.json",
                 strGamePath+"img/atlas/zombie_ui-1.json",
                 strGamePath+"img/atlas/zombie_ui-2.json"
                 ////////////////////
             ];

var tbImgGame_jp = [
    strGamePath+"img/back_2.png",
    strGamePath+"img/back.png",
    strGamePath+"img/gun_range.png",
    strGamePath+"img/touch_area.png",
	//////atlas////////
    strGamePath+"img_jp/atlas/zombie_ui_jp-0.json",
    strGamePath+"img_jp/atlas/zombie_ui_jp-1.json"
];

var tbSoundName = [
                   ["sound/BGM.mp3", "sound/BGM.ogg"],//0
                   ["sound/Click.mp3", "sound/Click.ogg"],//1
                   ["sound/ZombieDie1.mp3", "sound/ZombieDie1.ogg"],//2
                   ["sound/ZombieDie2.mp3", "sound/ZombieDie2.ogg"],//3
                   ["sound/HumanDie.mp3", "sound/HumanDie.ogg"],//4
                   ["sound/ElevatorMove.mp3", "sound/ElevatorMove.ogg"],//5
                   ["sound/ElevatorStop.mp3", "sound/ElevatorStop.ogg"],//6
                   ["sound/ElevatorOpen.mp3", "sound/ElevatorOpen.ogg"],//7
                   ["sound/ElevatorClose.mp3", "sound/ElevatorClose.ogg"],//8
                   ["sound/RedSiren.mp3", "sound/RedSiren.ogg"],//9
                   ["sound/BlueSiren.mp3", "sound/BlueSiren.ogg"],//10
                   ["sound/SpeedUp.mp3", "sound/SpeedUp.ogg"],//11
                   ["sound/ZombieWin.mp3", "sound/ZombieWin.ogg"],//12
                   ["sound/GameOver.mp3", "sound/GameOver.ogg"],//13
                   ["sound/Gun001.mp3", "sound/Gun001.ogg"],//14
                   ["sound/Gun002.mp3", "sound/Gun002.ogg"],//15
                   ["sound/Gun003.mp3", "sound/Gun003.ogg"],//16
                   ["sound/Gun004.mp3", "sound/Gun004.ogg"],//17
                   ["sound/Gun005.mp3", "sound/Gun005.ogg"],//18
                   ["sound/Gun006.mp3", "sound/Gun006.ogg"],//19
                   ["sound/Gun007.mp3", "sound/Gun007.ogg"],//20
                   ["sound/Gun008.mp3", "sound/Gun008.ogg"],//21
                   ["sound/Gun008_2.mp3", "sound/Gun008_2.ogg"],//22
                   ["sound/ZombieDie3.mp3", "sound/ZombieDie3.ogg"],//23
                   ["sound/ZombieDie4.mp3", "sound/ZombieDie4.ogg"],//24
                   ["sound/LifeDown.mp3", "sound/LifeDown.ogg"]//25
                   ];

//////////////////////test browser active//////////////////////////
var bPrev_bgmOnOff = false;
var bPrev_SEOnOff = false
window.addEventListener('focus', function() {
    console.log("focus event");
    if(engine.state === GAME.state.STATE_TITLE && kData.bSoundBGM)
        BGMSoundPlay(0, true);
    // kData.bSoundBGM = bPrev_bgmOnOff;
    // kData.bSoundSE = bPrev_SEOnOff;
}, false);

//윈도우창을 닫을때 이벤트.
window.addEventListener('blur', function() {
    console.log("blur");
    SoundPause();
    // bPrev_bgmOnOff = kData.bSoundBGM;
    // bPrev_SEOnOff = kData.bSoundSE;
    // kData.bSoundBGM = false;
    // kData.bSoundSE = false;

}, false);

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
		if(engine.state === GAME.state.STATE_TITLE && kData.bSoundBGM)
			BGMSoundPlay(0, true);
	}
}

document.addEventListener(visibilityChange, handleVisibilityChange, false);//success~~~~!!!!!
/////////////////////////////////////////////////////////////////////////////////////////////////////
function Timer(parent, fontStyle, coolTime, px, py, ax, ay){//coolTime : seconds
    if(px === undefined) px = 0;
    if(py === undefined) py = 0;
    if(ax === undefined) ax = 0.5;
    if(ay === undefined) ay = 0.5;

    this.txt_coolTime = FontLoad(parent, "00:00", px, py
        , fontStyle, ax, ay);

    // this.coolEndTime = 0;
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
        this.minutes = (this.remainTime/60) | 0;
        this.hours = (this.minutes/60) | 0;
        this.days = (this.hours/60) | 0;
        this.seconds = (this.remainTime % 60) | 0;

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

Timer.prototype.checkRemainTime = function(_this){
    if(this.remainTime<=0){
        this.remainTime = 0;
        if(this.cb_ableFunction === undefined) return;
        this.cb_ableFunction(_this);
    }
};

// Timer.prototype.setCoolEndTime = function(endTime){
//     if(endTime === undefined){
//         this.curTime = Date.now() * 0.001;
//         this.coolEndTime = this.curTime + this.coolTime;
//     } else {
//         this.coolEndTime = endTime;
//     }
// };