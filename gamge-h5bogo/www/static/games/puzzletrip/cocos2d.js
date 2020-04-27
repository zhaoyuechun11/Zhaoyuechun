/**
 * js, css 로딩
 * Created by juho on 2016-11-22.
 */

if(location.host.indexOf('192.168.0') < 0){
    //RES_DIR_COMMON = JS_SERVER + '/game/global_pixi/human/';
    //COMMON_IMG_PATH = COMMON_IMG_PATH + '_pixi/human/';
    //COMMON_JS_PATH = COMMON_JS_PATH + '_pixi/human/';

    //RES_DIR_COMMON = JS_SERVER + '/game/global_pixi/human/';
    //COMMON_IMG_PATH = '../../common/js/arcade/puzzletrip/human/';
    //COMMON_JS_PATH = '../../common/js/arcade/puzzletrip/human/';
}

var CACHE_VER = '1.0.11';

var RES_DIR_IMG = GAME_IMG_PATH + 'image/';
var RES_DIR_JSON = RES_DIR_IMG + 'json/';
var RES_DIR_PNG = RES_DIR_IMG + 'png/';
var RES_DIR_SPINE = RES_DIR_IMG + 'spine/';
var RES_DIR_SOUND = GAME_IMG_PATH + 'sound/';

// 소스버전
var IMG_VERSION = CACHE_VER;
var SOUND_VERSION = CACHE_VER;

COMMON_IMG_PATH = "human/";
COMMON_JS_PATH = "human/";

// JS 목록
var jsArr = [
    // Common Library
    COMMON_JS_PATH + 'jquery-3.1.1.min.js',
    COMMON_JS_PATH + 'TweenMax.min.js',
    COMMON_JS_PATH + 'howler.min.js',
    COMMON_JS_PATH + 'stats.min.js',
    COMMON_JS_PATH + 'pixi4.min.js',
    COMMON_JS_PATH + 'pixi-spine.js',
    COMMON_JS_PATH + 'human.min.js',

    // 보안
    COMMON_JS_PATH + 'js/security/XORcipher.js',

    // Game Javascript Files
    GAME_JS_PATH + 'js/core/Util.js',
    GAME_JS_PATH + 'js/core/GC.js',
    GAME_JS_PATH + 'js/core/MovieClip.js',//
    GAME_JS_PATH + 'js/core/NumberText.js',//
    GAME_JS_PATH + 'js/game/GameStage.js',//
    GAME_JS_PATH + 'js/game/GameBuilding.js',//
    GAME_JS_PATH + 'js/game/GameGuied.js',//
    GAME_JS_PATH + 'js/game/GamePlayPage.js',//
    GAME_JS_PATH + 'js/game/GamePopup.js',//
    //GAME_JS_PATH + 'js/game/GameStageChange.js',
    GAME_JS_PATH + 'js/game/GameEdingPage.js',//
    GAME_JS_PATH + 'js/game/GameKariMessage.js',//
    GAME_JS_PATH + 'js/game/GameStageClearPopup.js',//
    GAME_JS_PATH + 'js/tutorial/GameTutorial.js',//
    GAME_JS_PATH + 'js/game/GameIntro.js',//
    GAME_JS_PATH + 'js/game/GameSoundPopup.js',//
    GAME_JS_PATH + 'js/game/GameMainSoundPopup.js',//
    GAME_JS_PATH + 'js/game/GameScoreEffectContianer.js',//
    GAME_JS_PATH + 'js/net/NetworkManager.js',//
    GAME_JS_PATH + 'js/result/ResultView.js',//
    GAME_JS_PATH + 'js/result/NoHeartPopup.js',//
    GAME_JS_PATH + 'js/result/ResultNumberText.js',//
    GAME_JS_PATH + 'js/common/DataLoadingView.js',//
    GAME_JS_PATH + 'js/common/Loader.js',//
    GAME_JS_PATH + 'js/main.js',//

    ////GAME_JS_PATH + 'game.min.js',
];

var jsTotal = jsArr.length;
var loadCount = 0;
//var loadingDiv = document.createElement("div");
//loadingDiv.id = 'loading';
//document.body.appendChild(loadingDiv);

loadcssfile(COMMON_JS_PATH+'css/style.css?ver='+CACHE_VER);
//loadcssfile(COMMON_JS_PATH + 'css/style.css');
loaded();

// load javascript
function loaded(){
    if(loadCount < jsTotal){
        include(jsArr[loadCount] + '?ver='+CACHE_VER, loaded);
        loadCount++;
        if(loadCount == jsTotal){
            $(document).ready(function() {
                //var userAgent = navigator.userAgent;
                //var osInfo = "and";
                //if(userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPod") != -1 || userAgent.indexOf("iPad") != -1) {
                //    osInfo = "ios";
                //}
                //if(osInfo == 'ios'){
                //    try {
                //        OcbiOSJS.swipeBackEnabled(false);   // iOS의 경우 게임중 swipe back 기능 disable
                //    } catch (err) {
                //        return;
                //    }
                //}
                //document.getElementById("loading").style.display = "none";
                GD.resize();
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