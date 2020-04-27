/**
 * js, css 로딩
 * Created by juho on 2016-11-22.
 */

if(location.host.indexOf('192.168.0') < 0){
    //RES_DIR_COMMON = JS_SERVER + '/game/global_pixi/human/';
    RES_DIR_COMMON = JS_SERVER + '/game/global_pixi/';
    COMMON_IMG_PATH = COMMON_IMG_PATH + '_pixi/human/';
    COMMON_JS_PATH = COMMON_JS_PATH + '_pixi/';
}

var RES_DIR_IMG = 'BugsMatch/' + GAME_IMG_PATH + 'image/';
var RES_DIR_JSON = RES_DIR_IMG + 'json/';
var RES_DIR_PNG = RES_DIR_IMG + 'png/';
var RES_DIR_SPINE = RES_DIR_IMG + 'spine/';
var RES_DIR_SOUND = 'BugsMatch/' + GAME_IMG_PATH + 'sound/';

// 소스버전
var IMG_VERSION = CACHE_VER;
var SOUND_VERSION = CACHE_VER;

// JS 목록
var jsArr = [
	// Common Library
    COMMON_JS_PATH + 'jquery-3.1.1.min.js',
    COMMON_JS_PATH + 'TweenMax.min.js',
    COMMON_JS_PATH + 'howler.min.js',
    COMMON_JS_PATH + 'stats.min.js',
    COMMON_JS_PATH + 'pixi4.min.js',
    COMMON_JS_PATH + 'human.min.js',

    // 보안
    COMMON_JS_PATH + 'js/security/XORcipher.js',

	// Game Javascript Files
	GAME_JS_PATH + 'BugsMatch/js/core/GC.js',
	GAME_JS_PATH + 'BugsMatch/js/core/MovieClip.js',
	GAME_JS_PATH + 'BugsMatch/js/core/NumberText.js',
	GAME_JS_PATH + 'BugsMatch/js/core/Util.js',
	GAME_JS_PATH + 'BugsMatch/js/main.js',
    GAME_JS_PATH + 'BugsMatch/js/play/GameScene.js'
];

var jsTotal = jsArr.length;
var loadCount = 0;
var loadingDiv = document.createElement("div");
loadingDiv.id = 'loading';
document.body.appendChild(loadingDiv);

loadcssfile(COMMON_JS_PATH + 'css/style.css');
loaded();

// load javascript
function loaded(){
    if(loadCount < jsTotal){
        include(jsArr[loadCount] + '?ver='+CACHE_VER, loaded);
        loadCount++;
        if(loadCount == jsTotal){
            $(document).ready(function() {
                document.getElementById("loading").style.display = "none";
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