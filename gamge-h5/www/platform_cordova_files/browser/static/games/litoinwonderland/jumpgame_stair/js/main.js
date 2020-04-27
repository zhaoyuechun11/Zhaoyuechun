/**
 * Created by admin on 2018-04-05.
 */
(function() {
    // 언어설정
    GD.leng = 'ko';
    GD.isDebug = false;
    // Canvas 화면설정
    GD.isOrientationFixed = false;//모바일에서 세로게임을 가로로 돌렸을때 알림 화면 나오게하기
    GD.init(720, 1230, 0, 0, 0xFFFFFF);

    //모바일 체크
    mobileCheck();
    checkIphone();
    //이미지 로드
    loadImage();
})();

//이미지 로드
function loadImage() {
    //메달 업적이미지
    // GD.loader.add('game_medal_1', RES_DIR_IMG + "mission_0001.png");

    //PNG 이미지 로드
    // GD.loader.add('game_bg1', RES_DIR_PNG + "bg1.png");
    GD.loader.add('game_grade', RES_DIR_PNG + "common_game_grade.png");

    //JSON 이미지 로드
    GD.loader.add(RES_DIR_JSON + "naver/" + "naver_result.json");
    GD.loader.add(RES_DIR_JSON + "naver/" + "naver_browserAlert.json");
    GD.loader.add(RES_DIR_JSON + "popup/" + "popup_sound.json");
    GD.loader.add(RES_DIR_JSON + "popup/" + "popup_tutorial.json");
    GD.loader.add(RES_DIR_JSON + "intro/" + "intro.json");
    GD.loader.add(RES_DIR_JSON + "game/" + "bg_1.json");
    GD.loader.add(RES_DIR_JSON + "game/" + "bg_2.json");
    GD.loader.add(RES_DIR_JSON + "game/" + "bg_3.json");
    GD.loader.add(RES_DIR_JSON + "game/" + "game_ui.json");
    GD.loader.add(RES_DIR_JSON + "game/" + "fever_star.json");
    //튜토리얼
    // if(GD.leng == 'ko'){GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial1.json");}
    // else{GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial1_"+GD.leng+".json");}

    //spine 이미지 로드
    GD.loader.add('intro', RES_DIR_SPINE  + "intro/" + "intro.json");//인트로
    GD.loader.add('tutorial', RES_DIR_SPINE  + "tutorial/" + "tutorial.json");//튜토리얼
    GD.loader.add('cut_start', RES_DIR_SPINE  + "cutScene/" + "cut.json");//컷씬

    GD.loader.add('cha1', RES_DIR_SPINE  + "character/" + "lyto.json");
    GD.loader.add('somi', RES_DIR_SPINE  + "character/" + "somi.json");
    GD.loader.add('bird3', RES_DIR_SPINE  + "bird/" + "bird3.json");

    GD.loader.add('foothold1', RES_DIR_SPINE  + "foothold/" + "foothold_2.json");
    GD.loader.add('foothold2', RES_DIR_SPINE  + "foothold/" + "foothold_5.json");
    GD.loader.add('foothold3', RES_DIR_SPINE  + "foothold/" + "foothold_3.json");
    GD.loader.add('foothold4', RES_DIR_SPINE  + "foothold/" + "foothold_4.json");
    GD.loader.add('foothold5', RES_DIR_SPINE  + "foothold/" + "foothold_1.json");

    GD.loader.add('foothold_ice', RES_DIR_SPINE  + "foothold/" + "foothold_ice.json");
    GD.loader.add('foothold_rail', RES_DIR_SPINE  + "foothold/" + "foothold_rail.json");
    GD.loader.add('foothold_jump', RES_DIR_SPINE  + "foothold/" + "foothold_jump.json");

    GD.loader.add('item', RES_DIR_SPINE  + "effect/" + "item.json");
    GD.loader.add('cha_hit', RES_DIR_SPINE  + "effect/" + "cha_hit.json");
    GD.loader.add('ef1', RES_DIR_SPINE  + "effect/" + "ef1.json");
    GD.loader.add('ef2', RES_DIR_SPINE  + "effect/" + "ef2.json");
    GD.loader.add('target', RES_DIR_SPINE  + "effect/" + "target.json");
    GD.loader.add('jumpTxt', RES_DIR_SPINE  + "effect/" + "text.json");
    GD.loader.add('scoreEf50', RES_DIR_SPINE  + "effect/" + "text2.json");
    GD.loader.add('scoreEf100', RES_DIR_SPINE  + "effect/" + "text3.json");
    GD.loader.add('scoreEf1000', RES_DIR_SPINE  + "effect/" + "firework.json");
    GD.loader.add('portal1', RES_DIR_SPINE  + "portal/" + "portal1.json");

    //사운드 로드
    GD.loader.load(loadSound);
    GD.showProgress();
}

//사운드 로드
function loadSound(){
    //bgm
    var soundList = [
        'sound_bgm'
    ];
    //effect
    var effectList = [
        'sound_effects'
    ];

    if(GD.soundType == 1) soundList = soundList.concat(effectList);//bgm과 이펙트 사운드가 분리되어 관리될 경우 하나의 배열로 합침

    if(soundList.length == 0) {
        onAssetsLoaded();
        return;
    }
    GD.loadSound(soundList, onAssetsLoaded);
}

//로드 완료
function onAssetsLoaded() {
    // 로딩화면 삭제
    GD.hideProgress();
    if(location.host.indexOf('192.168.0') >= 0 || location.host.indexOf('demo') >= 0) gc.IS_LOCAL = true;
    if(!gc.spineManager) gc.spineManager = new gc.SpineManager();
    if(!gc.tutorial) gc.tutorial = new gc.Tutorial();
    onIntro();
    lodingOverFlag = true;
}

function onOptionOpen(){
    gc.game.pause();
}

function onOptionClose(){
    gc.game.resume();
}

// 인트로
function onIntro(){
    //사운드 팝업
    if(!gc.soundPopup) gc.soundPopup = new gc.PopupSound();

    //개별 인트로
    if(gc.game) {
        TweenMax.killAll();
        removeObject(gc.game);
    }
    gc.game = null;

    removeObject(gc.intro);
    gc.intro = null;
    if(!gc.intro) gc.intro = new gc.Intro();
    gc.intro.init();
    GD.stage.addChild(gc.intro);
}

// 게임
function onGame(){
    gc.gameOver = false;
    if(gc.intro) {
        gc.intro.reset();
        removeObject(gc.intro);
    }
    gc.intro = null;

    removeObject(gc.game);
    gc.game = null;
    if(!gc.game) gc.game = new gc.GameScene();
    GD.stage.addChild(gc.game);
    gc.game.init();

    GD.bgmStop();
    if(gc.onBgm) GD.bgmPlay(0.8);
    DataManager.gameStart();
}

//게임오버
function gameOver() {
    if(!gc.gameOver) {
        if (gc.onFx) GD.soundPlay("sound_gameover");
        gc.game.onStateMessage(2);

        removeObject(gc.game.myCha.img);
        GD.bgmStop();
    }
    gc.gameOver = true;
}

//오브젝트 지우기
function removeObject(obj) {
    //어디에 붙어있던 부모를 찾아서 지우므로 어디에 붙어있는지 몰라도 됨.
    if(obj && obj.parent) obj.parent.removeChild(obj);
};

//모바일 여부 체크
function mobileCheck()
{
    var mobileKeyWords = ['iphone', 'ipod', 'blackberry', 'android', 'windows ce', 'lg', 'mot', 'samsung', 'sonyericsson', 'meego', 'nokia', 'webos', 'opera mini', 'opera mobi', 'iemobile'];

    gc.IS_MOBILE = false;
    var browerAgent = navigator.userAgent.toLowerCase();
    for (var i = 0; i < mobileKeyWords.length; ++i)
    {
        if (browerAgent.indexOf(mobileKeyWords[i]) != -1)
        {
            gc.IS_MOBILE = true;
            break;
        }
    }
};

function checkIphone()
{
    var mobileKeyWords = ['iphone', 'ipod'];
    gc.IS_IPHONE = false;
    var browerAgent = navigator.userAgent.toLowerCase();
    for(var i=0; i<mobileKeyWords.length; i++) {
        if (browerAgent.indexOf(mobileKeyWords[i]) != -1)
        {
            gc.IS_IPHONE = true;
            break;
        }
    }
};