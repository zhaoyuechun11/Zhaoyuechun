var STATE_NONE = 0;
var STATE_LOAD = 10000;
var STATE_GAME = 20000;

var state = STATE_NONE;

var left = {x:-59.5, y:-34.5};
var right = {x:59.5, y:-34.5};

var engine = undefined;
var sprBG = undefined;//게임의 배경이 되는 이미지.....

var sprBG_sunset = undefined;
var sprBG_night = undefined;

var sprIces_0 = undefined;
var sprIces_1 = undefined;
var sprStar = undefined;
var sprMoon = undefined;

var sp_cloud1;
var sp_cloud2;
var sp_cloud3;
var sp_cloud4;
var sp_cloud5;

var spines = {};

var stage = new PIXI.Container();

var fileReader = new XMLHttpRequest();

var user_id = undefined;
var yahooIN = yahooIN||undefined;

var loader = PIXI.loader;

var sLoading = new PIXI.Container();

var loadingcount=0;           //로딩    카운트
var loadingcountmax = 116-16;      //로딩맥스 카운트
var loadingscalemax = 223;    //스케일 480보다 1많게 //이수치는 건드리지말것
var sprLogo = undefined;
var sprLogoBg = undefined;
var sprLogoProg = undefined;
var sprLogoMask = undefined;
var curServerTime = 0;
var lang = "en";

function setPreLoad(){
    loader.add(strGamePath+"img/movi_01.png", strGamePath+"img/movi_01.png");
    loader.add(strGamePath+"img/movi_02.png", strGamePath+"img/movi_02.png");
    loader.add(strGamePath+"img/movi_03.png", strGamePath+"img/movi_03.png");

    loader.once("complete", callNetworkManager);
    loader.load();
    state = STATE_LOAD;
}

function callNetworkManager(){
    setGidx(MYGIDX);

	networkManager.LoadData(function(_data){
	    /*switch(lang){
            case "ja": GAME.language = "jp"; break;
            case "ko": GAME.language = "kr"; break;
            case "en": GAME.language = "en"; break;
        }*/
        GAME.language = "en";

        /**
         * font load start
         * */
        window.WebFontConfig = {
            active: function() {
                // console.log("hihi");
            },
            custom: {
                families:[GAME.fontName[GAME.language]],
                urls: [strGamePath+'./font/fonts.css']
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
        /**
         * font load end
         * */

        if (_data !== null && _data !== undefined) user_id = _data.user_id;
        else user_id = "GUEST";//rb,.로컬

        // kMGMenu = new MGMenu(MGM_VERTICAL, GAME.table_language["MGM_Title"][GAME.language], GAME.table_language["MGM_Contents"][GAME.language], ["DAILY", "TOTAL"], 3, 'greappoint');
        // kMGMenu.load(user_id);
        // stage.addChild(kMGMenu.main);
        console.log(GAME.language);
        if(loginTF === 1){
            networkManager.GetShoplist(ShopType.GAMEMONEY, cb_networkLoadData);
        }
        else {
            networkManager.GetServerTime(function(timeStamp){
                GAME.curServerTime = timeStamp;
                console.log(state);
                networkManager.GetShoplist(ShopType.GAMEMONEY, cb_networkLoadData);
            });
        }
	});
}

var dummyFontLoad = undefined;
var tableLoader = undefined;
function cb_networkLoadData(){


    /**
     * 로딩 바 작업.
     * */
    var logoy = 510;
    var namey = 680;

    sprLogo = SpriteLoad(sLoading, strGamePath+"img/movi_03.png", iCenterSizeX, namey);
    sprLogoBg = SpriteLoad(sLoading,strGamePath+"img/movi_01.png", iCenterSizeX, logoy);
    sprLogoProg = SpriteLoad(sLoading, strGamePath+"img/movi_02.png", iCenterSizeX, logoy);
    sprLogoProg.alpha = 0;
    sprLogoMask = new PIXI.Graphics();
    sprLogoMask.lineStyle(0);

    sprLogoProg.mask = sprLogoMask;

    var progW_half = sprLogoProg.width / 2;
    var progH_half = sprLogoProg.height / 2;
    sprLogoMask.moveTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);

    txtLoading = FontLoad(sLoading, "0%", 360, 750, {font:"23px Arial", fill:"#2e85ed"});
    dummyFontLoad = FontLoad(stage, "0%", -100, -100, {font:"23px "+GAME.fontName[GAME.language], fill:"#2e85ed"});

    stage.addChild(sLoading);
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
            dummyFontLoad.text = txtLoading.text;
            // if(progcrop > 50)
            //     console.log('stop 50>');

            if(loadingcount==0)txtLoading.text="0%";
            if(typeof sprLogoMask !== "undefined"            //마스크로딩이 완료되면 나오게
                && sprLogoMask) {
                // sprLogoMask.scale.x = scalexcrop;

                sprLogoMask.clear();
                sprLogoMask.beginFill(0xffffff,1);
                sprLogoMask.moveTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
                sprLogoMask.lineTo(sprLogoProg.x - progW_half + (sprLogoProg.width * progbias), sprLogoProg.y - progH_half);
                sprLogoMask.lineTo(sprLogoProg.x - progW_half + (sprLogoProg.width * progbias), sprLogoProg.y + progH_half);
                sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);

                if(sprLogoProg.alpha<1) sprLogoProg.alpha=1; //보라색로고가 나오게
            }
            // //디버그용도 -->
            // //여기서 오브젝트 카운트를 알 수 있고,
            // //사운드는 나중에 로딩 될 수 있음, 그래서 타이틀 등장시 오브젝트카운트틀 사용하면 적당
            //
            //  var text = ("loading:"+resources.url+"\n");
             // text += (`progress: ${loader.progress}`+"\n");
             // text += (loadingcount+"\n");
             // console.log("progress:"+ text);
             // console.log("loadingcount:"+loadingcount);
             // txtLoading.text=loadingcount; //
            // //디버그용도
        }
    );

    tableLoader = GUMA.txtJsonConverter;
    tableLoader.add("balanceData", strGamePath+"dataFile/balanceData.txt");
    tableLoader.add("gimmickData", strGamePath+"dataFile/gimmickData.txt");
    tableLoader.add("mapData", strGamePath+"dataFile/mapData.txt");
    tableLoader.add("tipData", strGamePath+"dataFile/tipData.txt");
    tableLoader.add("languageData", strGamePath+"dataFile/languageData.txt");
    tableLoader.add("modalData", strGamePath+"dataFile/modal_msgData.txt");
    // tableLoader.add("imgData", "./dataFile/imgData.txt");
    tableLoader.once(cb_loadResources);
    tableLoader.load();
}

function cb_loadResources() {
    // GAME.mapManager.balances = tableLoader.jsonObjects.balanceData;
    // GAME.mapManager.gimmickBalance = tableLoader.jsonObjects.gimmickData;
    // GAME.mapManager.patterns = tableLoader.jsonObjects.mapData;
    // GAME.view.tips = tableLoader.jsonObjects.tipData;
    GAME.table_language = tableLoader.jsonObjects.languageData;
    GAME.table_modalMsg = tableLoader.jsonObjects.modalData;

    kMGMenu = new MGMenu(MGM_VERTICAL, GAME.table_language["MGM_Title"][GAME.language], GAME.table_language["MGM_Contents"][GAME.language], ["DAILY", "TOTAL"], 3, 'greappoint');
    kMGMenu.load(user_id);
    // stage.addChild(kMGMenu.main);

    //image
    for(var i = 0 ; i<tbImgGame.length;++i)
        loader.add(tbImgGame[i], tbImgGame[i]);
    //spine
    loader.add("sp_penguin", strGamePath+"spine/penguin/penguin_animation.json");
    loader.add("sp_iceObstacle", strGamePath+"spine/ice_obstacle/block_animation.json");
    loader.add("sp_sea", strGamePath+"spine/sea/enemy_animation.json");
    loader.add("sp_cloud1", strGamePath+"spine/cloud/cloud_1.json");
    loader.add("sp_cloud2", strGamePath+"spine/cloud/cloud_2.json");
    loader.add("sp_cloud3", strGamePath+"spine/cloud/cloud_3.json");
    loader.add("sp_cloud4", strGamePath+"spine/cloud/cloud_4.json");
    loader.add("sp_cloud5", strGamePath+"spine/cloud/cloud_5.json");
    loader.add("gem", strGamePath+"spine/jewel_charge_eff.json");
    loader.add("emoticon", strGamePath+"spine/imoticon_all.json");
    loader.add("enemy_emoticon", strGamePath+"spine/enemy_imoticon_all.json");
    loader.add("cloudAlert", strGamePath+"spine/flying_score_board.json");
    loader.add("newScore_effect", strGamePath+"spine/new_score_ani.json");
    loader.add("shock_eff", strGamePath+"spine/shock_eff.json");
    loader.add("egg", strGamePath+"spine/egg_animation.json");
    loader.add("end_bubble", strGamePath+"spine/death_emoticon.json");
    loader.add("sp_title", strGamePath+"spine/title/title.json");
    loader.add("sp_start", strGamePath+"spine/startBtn/start_btn.json");

    /**
     * 언어 대응 시작
     * */
    // if(GAME.language === "jp"){
    //     loader.add("sp_rankUp", "spine_jp/rankUp/rank_up_eff.json");
    // } else {
    //     loader.add("sp_rankUp", "./spine/rankUp/rank_up_eff.json");
    // }
    loader.add("sp_rankUp", strGamePath+"spine/rankUp/rank_up_eff.json");
    /**
     * 언어 대응 끝
     * */
    loader.add("sp_shadow", strGamePath+"spine/shadow/shadow_animation.json");
    //bitmapFont
    loader.add("bitmapNum", strGamePath+"font/num_export.xml");//quality up 이후 삭제 예정
    loader.add("shopBitNum", strGamePath+"font/shop_no_export.xml");
    loader.add("rankNum", strGamePath+"font/no_export.xml");

    //howler
    arrBGM.push(new Howl({src:[strGamePath+"sound/BackgroundMusic.mp3", strGamePath+"sound/BackgroundMusic.ogg"]}));//배경음, 주인공 추락/물개에 당할 시 꺼줌. 재시작, 타이틀 이동 재실행.
    arrSE[SE_BUTTON] = new Howl({src:[strGamePath+"sound/ButtonClick.mp3", strGamePath+"sound/ButtonClick.ogg"]});//버튼 클릭, 광고버튼의 경우 쿨타임으로 비활성화여도 클릭 시 소리남.
    arrSE[SE_CHU] = new Howl({src:[strGamePath+"sound/ChuChu.mp3", strGamePath+"sound/ChuChu.ogg"]});//물개에 빨려 들어가서 하트 나올 때
    arrSE[SE_DROP] = new Howl({src:[strGamePath+"sound/Drop.mp3", strGamePath+"sound/Drop.ogg"]});//떨어질 때
    arrSE[SE_GETGEM] = new Howl({src:[strGamePath+"sound/GetGem.mp3", strGamePath+"sound/GetGem.ogg"]});//보석 먹을 때
    arrSE[SE_ICEBROKEN] = new Howl({src:[strGamePath+"sound/IceBreak.mp3", strGamePath+"sound/IceBreak.ogg"]});//얼음이 부서질 때
    arrSE[SE_ICEHIT] = new Howl({src:[strGamePath+"sound/IceHit.mp3", strGamePath+"sound/IceHit.ogg"]});//얼음이 부서지지 않고 그냥 때릴 때
    arrSE[SE_BOOMTALE] = new Howl({src:[strGamePath+"sound/Jump.mp3", strGamePath+"sound/Jump.ogg"]});//고래꼬리로 쳐 올릴 때  효과음
    arrSE[SE_MOVE] = new Howl({src:[strGamePath+"sound/MoveTile.mp3", strGamePath+"sound/MoveTile.ogg"]});//이동음
    arrSE[SE_DOOR] = new Howl({src:[strGamePath+"sound/OpenDoor.mp3", strGamePath+"sound/OpenDoor.ogg"]});//문 흔들릴 때
    arrSE[SE_TALEMOVE] = new Howl({src:[strGamePath+"sound/Spin.mp3", strGamePath+"sound/Spin.ogg"]});//꼬리로 날아가는 동안
    arrSE[SE_SUPRISE] = new Howl({src:[strGamePath+"sound/Surprise.mp3", strGamePath+"sound/Surprise.ogg"]});//낙사 떨어지기 직전 당황 할 때
    arrSE[SE_DASH] = new Howl({src:[strGamePath+"sound/SkipTurn.mp3", strGamePath+"sound/SkipTurn.ogg"]});//dash 상태에서 방향을 꺾을 때
    arrSE[SE_CONGRATULATION] = new Howl({src:[strGamePath+"sound/Congratulation.mp3", strGamePath+"sound/Congratulation.ogg"]});//축하(부활, 쉼터도착) 시 출력
    arrSE[SE_WALL] = new Howl({src:[strGamePath+"sound/WallHit.mp3", strGamePath+"sound/WallHit.ogg"]});//무적 블럭 칠 때
    arrSE[SE_CONFUSE] = new Howl({src:[strGamePath+"sound/Confuse.mp3", strGamePath+"sound/Confuse.ogg"]});//혼란 상태일 때 반복.
    arrSE[SE_EGGHIT] = new Howl({src:[strGamePath+"sound/EggHit.mp3", strGamePath+"sound/EggHit.ogg"]});//알 깰 때
    arrSE[SE_HALFSIGN] = new Howl({src:[strGamePath+"sound/HalfSign.mp3", strGamePath+"sound/HalfSign.ogg"]});//구름알림판
    arrSE[SE_ITEMBOXHIT] = new Howl({src:[strGamePath+"sound/ItemBoxHit.mp3", strGamePath+"sound/ItemBoxHit.ogg"]});//아이템박스 때릴 때
    arrSE[SE_NEWBEST] = new Howl({src:[strGamePath+"sound/NewBest.mp3", strGamePath+"sound/NewBest.ogg"]});//새로운 기록 새웠을 때
    arrSE[SE_POWERUP] = new Howl({src:[strGamePath+"sound/PowerUp.mp3", strGamePath+"sound/PowerUp.ogg"]});//파워업 상태일 때 반복
    arrSE[SE_ITEMDROP] = new Howl({src:[strGamePath+"sound/ItemDrop.mp3", strGamePath+"sound/ItemDrop.ogg"]});//아이템 떨어질 때


    loader.on(
        "progress",
        function (loader, resources){
            loadingcount+=1;
            var progbias=loadingcount/loadingcountmax;
            var prog = progbias*100;
            var progcrop = prog<1?1:prog>100?100:prog;
            txtLoading.text = ""+ Math.floor(progcrop)+"%";
            if(loadingcount==0)txtLoading.text="0%";
            var scalex = loadingscalemax*progbias;
            var scalexcrop = scalex<1?1:scalex>loadingscalemax?loadingscalemax:scalex;

            if(typeof sprLogoMask !== "undefined"            //마스크로딩이 완료되면 나오게
                && sprLogoMask) {
                sprLogoMask.scale.x = scalexcrop;
                if(sprLogoProg.alpha<1) sprLogoProg.alpha=1; //보라색로고가 나오게
            }
        }
    );

    loader.once("complete", cbLoadComplete);
    loader.load();
}

var deltaTime = 0;
var curTime = Date.now();
var lastTime = Date.now();

var startPos = {x:iCenterSizeX, y:iCenterSizeY+200};

function checkDeltaTime(){
	curTime = Date.now();
	deltaTime = (curTime - lastTime) * 0.001;
	lastTime = curTime;
}

//version check
var version = "3.0.1";

//test init data
var txtInitData;

//test dash 1000
var txtDash1000;

//test infiniteRebirth
var txtInfinite;
var bInfinite = false;

var txtShowTip;

function update(){
	
	checkDeltaTime();

	switch(state){
	case STATE_NONE:

		setPreLoad();
		break;
	case STATE_LOAD:
		break;
	case STATE_GAME:
        console.log('STATE_GAME');
		engine.update();
		break;
	}

    if(document.body.scrollTop !== 0) // yahooIN : 모바일페이지에서 화면이 올라가는증상을 해결함.
        document.body.scrollTop = 0;

	requestAnimationFrame(update);
	renderer.render(stage);
}

$(document).ready(function(){

    update();
});

function cbLoadComplete(loader, res){
    // console.log("LoadComplete");
	sprBG = SpriteLoad(stage, strGamePath+'img/back_line_1.png', iCenterSizeX, iCenterSizeY);
	sprBG_sunset = SpriteLoad(stage, strGamePath+'img/back_line_2.png', iCenterSizeX, iCenterSizeY);
	sprBG_night = SpriteLoad(stage, strGamePath+'img/back_line_3.png', iCenterSizeX, iCenterSizeY);

	sprStar = SpriteLoad(stage, "star.png", iCenterSizeX, iCenterSizeY);
	sprStar.scale.set(2.8, 2);
	sprStar.visible = false;

	sprMoon = SpriteLoad(stage, "moon.png", iCenterSizeX+100, iCenterSizeY-400);
	sprMoon.blendMode = PIXI.BLEND_MODES.SCREEN;
	sprMoon.visible = false;

    sprIces_0 = SpriteLoad(stage, "back_obj_1.png", 0, iCenterSizeY, 0, 0.5);
    sprIces_1 = SpriteLoad(stage, "back_obj_2.png", iMaxSizeX, iCenterSizeY, 1, 0.5);

	sprBG.scale.x = iMaxSizeX;
    sprBG_sunset.scale.x = iMaxSizeX;
    sprBG_night.scale.x = iMaxSizeX;
	sprBG.visible = false;
	sprBG_sunset.visible = false;
    sprBG_night.visible = false;

    //깃발
    GAME.sprFlag_00 = new PIXI.Sprite.fromFrame("flag.png");
    GAME.sprFlag_01 = new PIXI.Sprite.fromFrame("flag.png");

	spines.penguin = res.sp_penguin.spineData;

	spines.iceObstacle = res.sp_iceObstacle.spineData;
	spines.sea = res.sp_sea.spineData;

	spines.cloud1 = res.sp_cloud1.spineData;
	spines.cloud2 = res.sp_cloud2.spineData;
	spines.cloud3 = res.sp_cloud3.spineData;
	spines.cloud4 = res.sp_cloud4.spineData;
	spines.cloud5 = res.sp_cloud5.spineData;
	
	spines.shadow = res.sp_shadow.spineData;
	spines.rankUp = res.sp_rankUp.spineData;
	spines.startBtn = res.sp_start.spineData;
    spines.title = res.sp_title.spineData;
    spines.gem = res.gem.spineData;
    spines.emoticon = res.emoticon.spineData;
    spines.enemy_emoticon = res.enemy_emoticon.spineData;
    spines.egg = res.egg.spineData;
    spines.gimmick_death_emoticon = res.end_bubble.spineData;

    /**
     * 하나만 필요한건 바로 만들어 쓰는 걸로?
     * */
    /**
     * 구름 알림판 생성.
     * */
    GAME.sp_cloudAlert = new PIXI.spine.Spine(res.cloudAlert.spineData);
    GAME.txt_cloudMeter = FontLoad(GAME.sp_cloudAlert.children[GAME.sp_cloudAlert.skeleton.findSlotIndex("text")], "m", 65, -5.5, {font:"30px "+GAME.fontName[GAME.language], fill:"#FCFF00"}, 1, 0.5);
    GAME.txt_cloudBlockNum = FontLoad(GAME.sp_cloudAlert.children[GAME.sp_cloudAlert.skeleton.findSlotIndex("text")], "9,999", 45, 0, {font:"50px "+GAME.fontName[GAME.language], fill:"#FCFF00"}, 1, 0.5);
    GAME.txt_cloudMeter.scale.y = -1;
    GAME.txt_cloudBlockNum.scale.y = -1;

    GAME.sp_cloudAlert.scale.set(0.8);
    GAME.sp_cloudAlert.state.addListener({
       complete:function (entry) {
           switch(entry.animation.name){
               case "flying_score_board_special_in":
                   SpinePlay_1(GAME.sp_cloudAlert, "flying_score_board_special_idle", 0, true);
                   // SESoundPlay(SE_HALFSIGN);
                   break;
           }
       }
    });
    GAME.sp_death_emoticon = new PIXI.spine.Spine(res.end_bubble.spineData);

    /**
     * 점수 갱신 스파인 세팅
     * */
    GAME.sp_newScore = new PIXI.spine.Spine(res.newScore_effect.spineData);
    GAME.sp_shockEff = new PIXI.spine.Spine(res.shock_eff.spineData);

    sp_cloud1 = new PIXI.spine.Spine(spines.cloud1);
	sp_cloud2 = new PIXI.spine.Spine(spines.cloud2);
	sp_cloud3 = new PIXI.spine.Spine(spines.cloud3);
	sp_cloud4 = new PIXI.spine.Spine(spines.cloud4);
	sp_cloud5 = new PIXI.spine.Spine(spines.cloud5);
	
	stage.addChild(sp_cloud1);
	stage.addChild(sp_cloud2);
	stage.addChild(sp_cloud3);
	stage.addChild(sp_cloud4);
	stage.addChild(sp_cloud5);

    sp_cloud1.state.addListener({
       complete:function(){
           var randY =(iCenterSizeY-300)+(Math.random()*600);
           SpinePlay(sp_cloud1, iCenterSizeX, randY, "cloud_1");
       }
    });

    sp_cloud2.state.addListener({
        complete:function(){
            var randY =(iCenterSizeY-300)+(Math.random()*600);
            SpinePlay(sp_cloud2, iCenterSizeX, randY, "cloud_2");
        }
    });

    sp_cloud3.state.addListener({
        complete:function(){
            var randY =(iCenterSizeY-300)+(Math.random()*600);
            SpinePlay(sp_cloud3, iCenterSizeX, randY, "cloud_3");
        }
    });

    sp_cloud4.state.addListener({
        complete:function(){
            var randY =(iCenterSizeY-300)+(Math.random()*600);
            SpinePlay(sp_cloud4, iCenterSizeX, randY, "cloud_4");
        }
    });

    sp_cloud5.state.addListener({
        complete:function(){
            var randY =(iCenterSizeY-300)+(Math.random()*600);
            SpinePlay(sp_cloud5, iCenterSizeX, randY, "cloud_5");
        }
    });

	engine = new Engine();
	GAME.engine = engine;

    GAME.mapManager.balances = tableLoader.jsonObjects.balanceData;
    GAME.mapManager.gimmickBalance = tableLoader.jsonObjects.gimmickData;
    GAME.mapManager.patterns = tableLoader.jsonObjects.mapData;
    GAME.view.tips = tableLoader.jsonObjects.tipData;
    // GAME.table_language = tableLoader.jsonObjects.languageData;
    // GAME.table_modalMsg = tableLoader.jsonObjects.modalData;

    engine.highScore = kData.iHighScore;
    engine.gemCount = kData.iGemCount;
    // engine.showAdTime = kData.iShowAdTime;

    GAME.view.init();
    GAME.view.updateGemCnt();
    engine.possibleDash();
    engine.initGame(startPos);

    engine.state = engine.gameState.STATE_TITLE;

    stage.addChild(GAME.mapManager.mapContainer);
    stage.addChild(GAME.view.viewContainer);
    stage.addChild(GAME.view.shieldContainer);

    //common
    // kMGMenu = new MGMenu(MGM_VERTICAL, GAME.table_language["MGM_Title"][GAME.language], GAME.table_language["MGM_Contents"][GAME.language], ["DAILY", "TOTAL"], 3, 'greappoint');
    // kMGMenu.load(user_id);
    stage.addChild(kMGMenu.main);

    if(yahooIN===undefined) kMGMenu.HideMenu();//default

    if (/Android/i.test(navigator.userAgent)) {
        biPhone = false;
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        biPhone = true;
    } else {
        biPhone = false;
    }
    //common

    stage.addChild(sTopContainer);///networkManager 최상단 컨테이너...
    stage.removeChild(sLoading);

    /**
     * test key start //test
     * */
    // txtInitData = FontLoad(GAME.view.viewContainer, "데이터 초기화", 0, 125,//test
    //     {font:"20px "+GAME.fontName[GAME.language], fill:'#ffffff', stroke:"#000000", strokeThickness:3, fontWeight:"bold"}, 0, 0);
    // txtInitData.interactive = true;
    //
    // txtInitData.on("click", InitData);
    // txtInitData.on("tap", InitData);
    //
    // txtDash1000 = FontLoad(GAME.view.viewContainer, "Dash1000", 0, 155,//test
    //     {font:"20px "+GAME.fontName[GAME.language], fill:'#ffffff', stroke:"#000000", strokeThickness:3}, 0, 0);
    // txtDash1000.interactive = true;
    //
    // function cb_dash1000(){
    //     TweenMax.to(txtDash1000, 0.3, {scaleX:1, scaleY:1, ease:Power1.easeOut});
    //     dash1000();
    // }
    //
    // txtDash1000.on("click", cb_dash1000);
    // txtDash1000.on("tap", cb_dash1000);
    //
    // txtInfinite = FontLoad(GAME.view.viewContainer, "InfiniteRebirth", 0, 185,//test
    //     {font:"20px "+GAME.fontName[GAME.language], fill:'#ffffff', stroke:"#000000", strokeThickness:3}, 0, 0);
    // txtInfinite.interactive = true;
    //
    // function cb_infinite(){
    //     TweenMax.to(txtInfinite, 0.3, {scaleX:1, scaleY:1, ease:Power1.easeOut});
    //     infiniteRebirth();
    // }
    //
    // txtInfinite.on("click", cb_infinite);
    // txtInfinite.on("tap", cb_infinite);
    //
    // txtShowTip = FontLoad(GAME.view.viewContainer, "showTipPop", 0, 250,//test
    //     {font:"20px "+GAME.fontName[GAME.language], fill:'#ffffff', stroke:"#000000", strokeThickness:3}, 0, 0);
    // txtShowTip.interactive = true;
    //
    // txtShowTip.on("click", cb_showTipPop);
    // txtShowTip.on("tap", cb_showTipPop);

    var test_idx = 0;
    function cb_showTipPop(){
        GAME.view.sprTipIcon.texture = GAME.view.tipTextures[test_idx];

        ++test_idx;

        var test_textID = test_idx;

        if(test_idx>14){
            GAME.view.sprTipPopBG.visible = false;
            test_idx = 0;
            return;
        }

        if(test_textID<10) test_textID = "0"+test_textID.toString();
        else test_textID = test_textID.toString();

        GAME.view.tipFont.text = GAME.table_language["tip"+test_textID][GAME.language];

        GAME.view.sprTipPopBG.visible = true;
    }
    /**
     * test key end //test
     * */

    var randY = (iCenterSizeY-300)+(Math.random()*600);
    SpinePlay(sp_cloud1, iCenterSizeX, randY, "cloud_1");
    randY = Math.random()*(iMaxSizeY-300);
    SpinePlay(sp_cloud2, iCenterSizeX, randY, "cloud_2");
    randY = Math.random()*(iMaxSizeY-300);
    SpinePlay(sp_cloud3, iCenterSizeX, randY, "cloud_3");
    randY = Math.random()*(iMaxSizeY-300);
    SpinePlay(sp_cloud4, iCenterSizeX, randY, "cloud_4");
    randY = Math.random()*(iMaxSizeY-300);
    SpinePlay(sp_cloud5, iCenterSizeX, randY, "cloud_5");

    /**
     * sprJPSound
     * */
    // yahooIN = true;//test
    // biPhone = true;//test
    // if(yahooIN!==undefined&&biPhone){
    //     console.log("biPhone: "+biPhone);
    //     GAME.view.btn_titleSound.sprite.visible = true;
    //     BGMSoundStop();
    //     kData.bSoundBGM = false;
    //     kData.bSoundSE = false;
    //     setTitleSoundBtn();
    // }

    if(bPhone){
        GAME.view.btn_titleSound.sprite.visible = true;
        BGMSoundStop();
        kData.bSoundBGM = false;
        kData.bSoundSE = false;
        setTitleSoundBtn();
    }

    /**
     * sprJPSound
     * */

    // var test_imgLoad = SpriteLoad(stage, "shop_no.png", iCenterSizeX, iCenterSizeY);//test

    state = STATE_GAME;
}

//test
function dash1000(){
	engine.bDash = true;
	engine.dashCount = 1000;
	engine.dashGem = 0;
}

function infiniteRebirth(){
	bInfinite = !bInfinite;
	
	if(bInfinite){
		GAME.view.contGem = 0;
		txtInfinite.text = "InfiniteRebirth:On";
	} else {
		GAME.view.contGem = 10;
		txtInfinite.text = "InfiniteRebirth:Off";
	}
}

function setTitleSoundBtn() {
    if(GAME.view.btn_titleSound===undefined) return;
    GAME.view.btn_titleSound.sprite.texture = (kData.bSoundBGM) ? GAME.view.tex_soundOrigin : GAME.view.tex_soundDisable;
}