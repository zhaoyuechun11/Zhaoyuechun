/**
 * 로딩 할 js파일 목록
 * Created by juho on 2016-08-24.
 */

var RES_DIR = '';
var RES_DIR_JSON = './image/json/';
var RES_DIR_PNG = './image/png/';
var RES_DIR_COMMON = './image/common/';
var RES_DIR_SOUND = './sound/';
var VERSION = '1.0.3';
var IMG_VERSION = VERSION;

var jsArr = [
	// Common Library
    'js/lib/pixi.min.js',
	'js/lib/TweenMax.min.js',
	'js/lib/jquery-1.12.3.min.js',
	'js/lib/howler.min.js',

    'js/net/NetworkManager.js',//
    'js/lib/gibberish-aes.js',

	// Game Javascript Files
	'js/data/MessageData.js',

    'js/core/GC.js',
    'js/core/Util.js',


    'js/game/KegUseView.js',
    'js/game/Theme.js',
    'js/game/Game.js',
    'js/game/GameUI.js',


    'js/game/Message.js',
    'js/game/Combo.js',
    'js/game/IceBlock.js',
    'js/game/Block.js',
    'js/game/Cup.js',
    'js/game/ObstacleEffect.js',
    'js/game/HyperEffectBlock.js',
    'js/game/HyperEffect.js',
    'js/game/GameNEffect.js',


    'js/game/EffectBlock.js',
    'js/game/Effect3.js',
    'js/game/Effect2.js',
    'js/game/Effect1.js',
    'js/game/CoconutEffect.js',
    'js/game/BasicEffect.js',
    'js/game/ClearFruit.js',
    'js/game/FireFruit.js',
    'js/game/AllClearAni.js',
    'js/game/JuiceItemBlock.js',
    'js/game/JuiceItem.js',

    'js/game/BoxItem.js',
    'js/game/HammerItem.js',
    'js/game/GloveItem.js',
    'js/game/GameGuide.js',
    'js/game/MissionHelpPopup.js',
    'js/game/ShufflePopup.js',
    'js/game/MissionClearPopup.js',
    'js/game/MissionPopup.js',
    'js/game/ResultPopup.js',
    'js/game/OptionPopup.js',
    'js/game/Tutorial.js',
    'js/game/IntroFruit.js',
    'js/game/Intro.js',
    'js/game/IntroSoundPopup.js',
    'js/game/LocalContinuePopup.js',
    'js/game/Timer.js',
    'js/game/ProgressView.js',

    'js/game/LoadingView.js',
    'js/game/NumberText.js',
    'js/game/MovieClip.js',
    'js/game/Gauge.js',
    'js/game/SoundLoader.js',

    'js/LocalStorageManager.js',
    'js/IceMapData.js',


    'js/main.js',
];

var jsTotal = jsArr.length;
var loadCount = 0;
var loadingDiv = document.createElement("div");
loadcssfile(RES_DIR + 'css/main.css');
loadingDiv.id = 'loading';
document.body.appendChild(loadingDiv);

loaded();

// load javascript
function loaded(){
	if(loadCount < jsTotal){
		include(RES_DIR + jsArr[loadCount] + '?ver='+VERSION, loaded);
		loadCount++;
		if(loadCount == jsTotal){
			$(document).ready(function() {
				var userAgent = navigator.userAgent;
				var osInfo = "and";
				if(userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPod") != -1 || userAgent.indexOf("iPad") != -1) {
					osInfo = "ios";
				}
				if(osInfo == 'ios'){
					try {
						OcbiOSJS.swipeBackEnabled(false);   // iOS의 경우 게임중 swipe back 기능 disable
					} catch (err) {
						return;
					}
				}
				document.getElementById("loading").style.display = "none";
			});
		}
	}
}

// include javascript
function include(url, callback){
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.onload = callback;
	head.appendChild(script);
}

// load css
function loadcssfile(filename) {
	var fileref = document.createElement("link");
	fileref.setAttribute("rel", "stylesheet");
	fileref.setAttribute("type", "text/css");
	fileref.setAttribute("href", filename);
	if (typeof fileref != "undefined") document.getElementsByTagName("head")[0].appendChild(fileref)
}