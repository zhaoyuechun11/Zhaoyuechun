
var gc = {
    width:720,
    height:1130,
    soundFlag:true,
    bgmFlag:true,
    soundPopup:null,
    isPaused:false,
    gameOver:false,
    intro:0,
    state:"intro",
    introPage:null,
    localTest:false,
    flag:0,
    isLowPhone:false,
    game:null,
    sessionId:null,
    playSeq:null,
    phoneType:"ad",
    deviceStopFlag:false,
    GAME_ID:"NAVER-PUZZLETRIP",
    storagebgm:"naverpuzzletripbgm",
    storagesound:"naverpuzzletripsound",
    gameType:0,
    gameId:2,
    startDatetime:null,
    game_idx:null,
    arrays:{}
};

function getSessionId()
{
    if(gc.localTest)
    {
        return "test";
    }
    else
    {
        return gc.sessionId;
        //var obj = OcbApplicationJS.getAuthInfo();
        //var alertMsg = '';
        //for( var k in obj)
        //{
        //    alertMsg += ("send data => " + k + " : " + obj[k] + "\n");
        //}
        ////alert(alertMsg);
        //if(obj.auth == '0') return '';
        //else return obj.session;
    }
};

function setAuthInfo(authObj){
    var isAuth = false;
    if(authObj){
        var obj = JSON.parse(authObj);
        if(obj.auth == '0'){
            gc.sessionId = '';
        }else{
            gc.sessionId = obj.session;
        }
        isAuth = isValidAuth(obj);
    }else{
        gc.sessionId = null;
    }

    if(isAuth){
        gc.onGame();
    }else{
        try{
            var msg =  "This is a service that requires authentication.\nDo you want to authenticate yourself？\n\n※It is a service that can participate only by mobile phone authentication. Re-authentication is required for other authentication statuses.";
            OcbApplicationJS.showPopupT3("OK CASHBAG", msg, "startAuth", "stopAuth");
        }catch(e){
            gc.log('authPopup cancel');
        }
    }
};

function isValidAuth(authInfo){
    try{
        if(authInfo.session == 'undefined' || authInfo.session == ""){
            return false;
        }else if(authInfo.type == 'undefined'){
            return false;
        }else if(authInfo.type == "01" || authInfo.type == "62"){
            return true;
        }
    }catch(e){

    }
    return false;
};

function startAuth(){
    //schemeJS.authIntegration('KMC');
};

function stopAuth(){
    //OcbApplicationJS.requestCloseWindow();
};

gc.pauseMusic = function () {
    Howler.mute(true);
};

gc.resumeMusic = function () {
    Howler.mute(false);
};

// 로컬스토리지에 게임정보 반환
gc.getStorage = function(item){
    var value = localStorage.getItem('#'+gc.GAME_ID+'@'+item);
    if(value == undefined) return null;
    return value;
};

// 로컬스토리지에 게임정보 저장
gc.setStorage = function(item, value){
    localStorage.setItem('#'+gc.GAME_ID+'@'+item, value);
};

gc.onBackKey = function () {
    GD.soundAllStop();
};

gc.deviceResume = function () {
    gc.deviceStopFlag = false;
    if(gc.bgmFlag && GD.AGENT != "ios"){
        GD.bgmStop();
        if(!gc.gameOver)
            GD.bgmPlay(1);
    }
};

gc.deviceStop = function () {
    gc.deviceStopFlag = true;
    GD.soundAllStop();
};

gc.stopAllEffectSound = function () {

    for(var i in GD.sound){
        if(i != "sound_bgm")
            GD.sound[i].stop();
    }
};

// 화면크기변경
GD.resize = function(){
    if(GD.renderer){
        var widthToHeight = gc.width / gc.height;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        //if(gc.phoneType == "io")newHeight -= 20;
        var newWidthToHeight = newWidth / newHeight;
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        if($('#gamecontainer')[0]){
            var gameContainer = document.getElementById('gamecontainer');
            gameContainer.style.color = "#FF0000";
            if (newWidthToHeight > widthToHeight) {
                newWidth = newHeight * widthToHeight;
                gameContainer.style.width = newWidth + 'px';
                gameContainer.style.height = newHeight + 'px';
                GD.renderer.view.style.width = newWidth + 'px';
                GD.renderer.view.style.height = newHeight + 'px';
            } else {
                newHeight = newWidth / widthToHeight;
                gameContainer.style.width = newWidth + 'px';
                gameContainer.style.height = newHeight + 'px';
                GD.renderer.view.style.width = newWidth + 'px';
                GD.renderer.view.style.height = newHeight + 'px';
            }
        }else{
            GD.renderer.view.style.position = "absolute";
            GD.renderer.view.style.width = window.innerWidth + "px";
            GD.renderer.view.style.height = window.innerHeight + "px";
            GD.renderer.view.style.display = "block";
        }
    }

    setTimeout(function () {
        GD.setOrientationGuide();
    },500);
    //TweenMax.delayedCall(0.5, function () {
    //    GD.setOrientationGuide();
    //});
    //GD.setOrientationGuide();
};


GD.setOrientationGuide = function(){

    var rank_layout = document.getElementById('rank_layout');
    if(rank_layout && rank_layout.style.display != 'none' && com){
        GD.renderer.view.style.display = 'none';
        GD.showOrientation(false);
        return;
    }

    var p1 = window.innerWidth / window.innerHeight;
    var p2 = GD.width / GD.height;
    if (p2 > 1){
        GD.orientationType = 'phone rotate_x';
    }else{
        GD.orientationType = 'phone rotate_y';
    }

    if(p1 > 1 && p2 < 1 || p1 < 1 && p2 > 1){
        GD.showOrientation(true);
    }else{
        GD.showOrientation(false);
    }

    if(GD.renderer){
        var widthToHeight = gc.width / gc.height;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        //if(gc.phoneType == "io")newHeight -= 20;
        var newWidthToHeight = newWidth / newHeight;
        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        if($('#gamecontainer')[0]){
            var gameContainer = document.getElementById('gamecontainer');
            gameContainer.style.color = "#FF0000";
            if (newWidthToHeight > widthToHeight) {
                newWidth = newHeight * widthToHeight;
                gameContainer.style.width = newWidth + 'px';
                gameContainer.style.height = newHeight + 'px';
                GD.renderer.view.style.width = newWidth + 'px';
                GD.renderer.view.style.height = newHeight + 'px';
            } else {
                newHeight = newWidth / widthToHeight;
                gameContainer.style.width = newWidth + 'px';
                gameContainer.style.height = newHeight + 'px';
                GD.renderer.view.style.width = newWidth + 'px';
                GD.renderer.view.style.height = newHeight + 'px';
            }
        }else{
            GD.renderer.view.style.position = "absolute";
            GD.renderer.view.style.width = window.innerWidth + "px";
            GD.renderer.view.style.height = window.innerHeight + "px";
            GD.renderer.view.style.display = "block";
        }
    }

};

// 방향가이드 설정
GD.showOrientation  = function($bool){
    // 화면사이즈에 따라 회전문구 삭제
    var list = [
        "Z300C","TF701T","TF700T","TF103C","TF101-1B251A","TA2506 10BK","SM-T805","SM-T800","SM-T677","SM-T670","SM-P900",
        "SMP-605","SMP-600","SMART-TV","SmartTV","SM-905","SHW-M480W","SHW-M380","SHV-E230","SGP771","SGP311","QM0101",
        "Q109","MZ68","MZ601","MX1080","MID 1065-8","MID 1042-8","ME102A","LGV940","LGV700N","GT-P5110","FZ-A1","AT105","A10-70",
        "10QS","10ES"
    ];
    var i = list.length;
    while(i--){
        if(navigator.userAgent.match(list[i])) return;
    }

    var orientationGuide;
    var arrowDiv;
    var textDiv;
    var yesText;
    var noText;
    var guideText;
    if(GD.isMobile){
        var len = document.getElementsByClassName('xy_wrap').length;
        if($bool){
            gc.isPaused = true;
            TweenMax.pauseAll();
            orientationGuide = GD.orientationGuide;
            if (orientationGuide == null) {
                // 배경
                orientationGuide = document.createElement('div');
                orientationGuide.style.backgroundColor = '#ff7e17';
                orientationGuide.style.position = "absolute";
                orientationGuide.style.left = 0;
                orientationGuide.style.top = 0;
                orientationGuide.style.right = 0;
                orientationGuide.style.bottom = 0;
                orientationGuide.style.margin = 'auto';
                orientationGuide.setAttribute("class", 'xy_wrap');
                GD.orientationGuide = orientationGuide;

                // 화살표
                arrowDiv = document.createElement('div');
                arrowDiv.setAttribute("class", 'xy_info');

                // 폰이미지
                textDiv = document.createElement('div');
                textDiv.setAttribute("class", GD.orientationType);

                // yes text
                yesText = document.createElement('span');
                yesText.setAttribute("class", 'yes');

                // no text
                noText = document.createElement('span');
                noText.setAttribute("class", 'no');

                orientationGuide.appendChild(arrowDiv);
                arrowDiv.appendChild(textDiv);
                arrowDiv.appendChild(yesText);
                arrowDiv.appendChild(noText);

                // 가이드 내용
                guideText = document.createElement('p');
                guideText.style.left = "0px";
                guideText.style.right = "0px";
                guideText.style.padding = '15px';
                guideText.style.lineHeight = '130%';
                guideText.style.color = '#FFFFFF';
                guideText.style.position = 'absolute';
                if(GD.lang == "en"){
                    guideText.style.fontSize = "18px";
                    guideText.innerHTML = 'Please rotate your device.';
                }else{
                    var message;
                    switch (GD.lang){
                        case 'jp':
                            message = 'お使いの携帯電話を 回転させて 下ください。';
                            break;
                        case 'en':
                            message = 'ROTATE YOUR PHONE';
                            break;
                        case 'cn':
                            message = '请关闭屏幕自动旋转功能。';
                            break;
                        default :
                            if(window.innerWidth > 480){
                                message =  'If the screen does not switch, turn on the auto rotate function.';
                            }else{
                                message =  'If the screen does not switch,<br>turn on the auto rotate function.';
                            }
                            break;
                    }
                    guideText.innerHTML = message;
                }
                arrowDiv.appendChild(guideText);
            }
            if(len == 0){
                document.body.appendChild(orientationGuide);
                GD.orientationChange(true);
                GD.renderer.view.style.visibility = 'hidden';
            }
        }else{
            if(len > 0){
                gc.isPaused = false;
                TweenMax.resumeAll();
                document.body.removeChild(GD.orientationGuide);
                GD.orientationChange(false);
                GD.renderer.view.style.visibility = 'visible';
            }
        }
    }
};

//window.onresize = GD.resize;