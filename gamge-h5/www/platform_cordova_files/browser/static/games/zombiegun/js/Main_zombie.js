var STATE_NONE = 0;
var STATE_LOAD = 10000;
var STATE_GAME = 20000;

var state = STATE_NONE;

var testInit = undefined;
var addUserGold = undefined;
var infiniteContinue = undefined;
var bInfiniteCont = false;//debug

var str_version = "0.3.5";

var deltaTime = 0;
var curTime = Date.now();
var lastTime = Date.now();

function checkDeltaTime(){
	curTime = Date.now();
	deltaTime = (curTime - lastTime) * 0.001;
	lastTime = curTime;
}

var touch_area_left = undefined;
var touch_area_right = undefined;

var loader = PIXI.loader;
var stage = new PIXI.Container();
var engine;
var spines = {};

///set loading bar start///
var sLoading = new PIXI.Container();

var loadingcount=0;           //로딩    카운트
var loadingcountmax =40;      //로딩맥스 카운트

var loadingscalemax = 223;    //스케일 480보다 1많게 //이수치는 건드리지말것
var sprLogo = undefined;
var sprLogoBg = undefined;
var sprLogoProg = undefined;
var sprLogoMask = undefined;

var txtLoading = undefined;
var dummyFont = undefined;
///set loading bar end///

var lang = "en";

$(document).ready(function(){
	update();
});

loader.add(strGamePath+"img/movi_01.png", strGamePath+"img/movi_01.png");
loader.add(strGamePath+"img/movi_02.png", strGamePath+"img/movi_02.png");
loader.add(strGamePath+"img/movi_03.png", strGamePath+"img/movi_03.png");
loader.once("complete", temp);
loader.load();

var converter = GUMA.txtJsonConverter;

function temp() {
    setGidx(MYGIDX);
    networkManager.LoadData(function(_data){
        if (_data !== null && _data!==undefined) user_id = _data.user_id;
        else user_id = "GUEST";//rb,.로컬

        // kMGMenu = new MGMenu(MGM_VERTICAL, GAME.table_language["MGM_Title"][GAME.language], GAME.table_language["MGM_Contents"][GAME.language], ["DAILY", "TOTAL"], 4, 'greappoint');
        // kMGMenu.load(user_id);
        // stage.addChild(kMGMenu.main);

        if(lang==="ja"){
            GAME.language = "jp";
        }else{
            if(lang==="ko") GAME.language = "kr";
            else if(lang==="en") GAME.language = lang;
        }

        /**
         * font load start
         * */
        window.WebFontConfig = {
            active: function() {
                // console.log("hihi");
            },
            custom: {
                families:[GAME.fontName[GAME.language]],
                urls: [strGamePath+'./font/HYSUPB/hy_sup_b.css']
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



        function start() {
            converter.add("levelData", strGamePath+"dataFile/levelData.txt");
            converter.add("patternData", strGamePath+"dataFile/patternData.txt");
            converter.add("gunData", strGamePath+"dataFile/gunData.txt");
            converter.add("languageData", strGamePath+"dataFile/languageData.txt");
            converter.add("modalMsgData", strGamePath+"dataFile/modal_msgData.txt");
            converter.once(loadResource);
            converter.load();
        }

        if(loginTF === 1){
            networkManager.GetShoplist(ShopType.GAMEMONEY, start);
        }else{
            networkManager.GetServerTime(function(timeStamp){
                GAME.curServerTime = timeStamp;
                networkManager.GetShoplist(ShopType.GAMEMONEY, start);
            });
        }
    });
}

function loadResource(){
	/**
	 * 언어 대응 스타트
	 * */
	// if(lang==="ja"){
	// 	loader.add(tbImgGame_jp);
     //    loader.add("beShot", "./spine_jp/beShot/gun_hit_eff.json");
     //    loader.add("bloodEffect", "./spine_jp/bloodEffect/bood_eff.json");
     //    loader.add("elevator", "./spine_jp/elevator/elevator_animation.json");
     //    loader.add("gun_1", "./spine_jp/gun/gun_1_action.json");
     //    loader.add("title", "./spine/title/title_ani.json");
     //    loader.add("txtGameOver", "./spine_jp/textGameOver/text_game_over.json");
     //    loader.add("txtSpeedUp", "./spine_jp/textSpeedUp/text_speedup.json");
     //    loader.add("target", "./spine_jp/target/target.json");
     //    loader.add("walkers", "./spine_jp/walkers/enemy_human_all.json");
     //    loader.add("blueSiren", "./spine_jp/siren_blue/elevator_siren_blue.json");
     //    loader.add("redSiren", "./spine_jp/siren_red/elevator_siren_red.json");
     //    loader.add("tutoKeyboard", "./spine_jp/tutoKeyboard/tutorial_key_board.json");
     //    loader.add("sparkle", "./spine_jp/sparkle/popup_eff.json");
     //    loader.add("newBest", "./spine_jp/newBest/new_best_eff.json");
     //    loader.add("heart", "./spine_jp/heart/heart_life.json");
     //    loader.add("line", "./spine_jp/electronicLine/back_ground_eff.json");
     //    loader.add("rankUp", "./spine_jp/rankUp/rank_up_eff.json");
     //    GAME.language = "jp";
	// }else{
     //    loader.add(tbImgGame);
     //    loader.add("beShot", "./spine/beShot/gun_hit_eff.json");
     //    loader.add("bloodEffect", "./spine/bloodEffect/bood_eff.json");
     //    loader.add("elevator", "./spine/elevator/elevator_animation.json");
     //    loader.add("gun_1", "./spine/gun/gun_1_action.json");
     //    loader.add("title", "./spine/title/title_ani.json");
     //    loader.add("txtGameOver", "./spine/textGameOver/text_game_over.json");
     //    loader.add("txtSpeedUp", "./spine/textSpeedUp/text_speedup.json");
     //    loader.add("target", "./spine/target/target.json");
     //    loader.add("walkers", "./spine/walkers/enemy_human_all.json");
     //    loader.add("blueSiren", "./spine/siren_blue/elevator_siren_blue.json");
     //    loader.add("redSiren", "./spine/siren_red/elevator_siren_red.json");
     //    loader.add("tutoKeyboard", "./spine/tutoKeyboard/tutorial_key_board.json");
     //    loader.add("sparkle", "./spine/sparkle/popup_eff.json");
     //    loader.add("newBest", "./spine/newBest/new_best_eff.json");
     //    loader.add("heart", "./spine/heart/heart_life.json");
     //    loader.add("line", "./spine/electronicLine/back_ground_eff.json");
     //    loader.add("rankUp", "./spine/rankUp/rank_up_eff.json");
    //
     //    if(lang==="ko") GAME.language = "kr";
     //    else if(lang==="en") GAME.language = lang;
	// }

    loader.add(tbImgGame);
    loader.add("beShot", strGamePath+"spine/beShot/gun_hit_eff.json");
    loader.add("bloodEffect", strGamePath+"spine/bloodEffect/bood_eff.json");
    loader.add("elevator", strGamePath+"spine/elevator/elevator_animation.json");
    loader.add("gun_1", strGamePath+"spine/gun/gun_1_action.json");
    loader.add("title", strGamePath+"spine/title/title_ani.json");
    loader.add("txtGameOver", strGamePath+"spine/textGameOver/text_game_over.json");
    loader.add("txtSpeedUp", strGamePath+"spine/textSpeedUp/text_speedup.json");
    loader.add("target", strGamePath+"spine/target/target.json");
    loader.add("walkers", strGamePath+"spine/walkers/enemy_human_all.json");
    loader.add("blueSiren", strGamePath+"spine/siren_blue/elevator_siren_blue.json");
    loader.add("redSiren", strGamePath+"spine/siren_red/elevator_siren_red.json");
    loader.add("tutoKeyboard", strGamePath+"spine/tutoKeyboard/tutorial_key_board.json");
    loader.add("sparkle", strGamePath+"spine/sparkle/popup_eff.json");
    loader.add("newBest", strGamePath+"spine/newBest/new_best_eff.json");
    loader.add("heart", strGamePath+"spine/heart/heart_life.json");
    loader.add("line", strGamePath+"spine/electronicLine/back_ground_eff.json");
    loader.add("rankUp", strGamePath+"spine/rankUp/rank_up_eff.json");
    loader.add("gunUnlock", strGamePath+"spine/gun_unlock_ani.json");

    if(lang==="ja"){
        GAME.language = "jp";
    }else{
        if(lang==="ko") GAME.language = "kr";
        else if(lang==="en") GAME.language = lang;
    }

    // GAME.language = "en";//test
    /**
     * 언어 대응 엔드
     * */

	loader.add("bitmapNum", strGamePath+"font/floor_number_export.xml");
	loader.add("FloorFont", strGamePath+"font/floor_number_2_export.xml");
	loader.add("shopBitFont", strGamePath+"font/shop_no_export.xml");
	loader.add("rankNum", strGamePath+"font/rankNum.xml");

    GAME.table_language = converter.jsonObjects.languageData;
    GAME.table_modalMsg = converter.jsonObjects.modalMsgData;

    kMGMenu = new MGMenu(MGM_VERTICAL, GAME.table_language["MGM_Title"][GAME.language], GAME.table_language["MGM_Contents"][GAME.language], ["DAILY", "TOTAL"], 4, 'greappoint');
    kMGMenu.load(user_id);


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


    txtLoading = FontLoad(sLoading, "0%", 360, 750
        , {fontFamily:"Arial", fontSize:"23px", fill:"#2e85ed"});

    dummyFont = FontLoad(sLoading, "0%", -100, -100
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"23px", fill:"#2e85ed"});

    stage.addChild(sLoading);
    //--프로그래스바시작--                      <----여기서부터 복사시작
    // var resources = PIXI.loader.resources;

    //로딩바작동
    loader.on(
        "progress",
        function (loader, resources){
            loadingcount+=1;
            var progbias=loadingcount/loadingcountmax;
            var prog = progbias*100;
            //progFore.scale.x=progbias;

            var progcrop = prog<1?1:prog>100?100:prog;
            txtLoading.text = ""+ (progcrop|0)+"%";
            dummyFont.text = ""+ (progcrop|0)+"%";
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
	
	loader.once("complete", loadTextData);
	
	state = STATE_LOAD;
	// update();
}

function loadTextData(loader, res){
	spines.beShot = res.beShot.spineData;
	spines.bloodEffect = res.bloodEffect.spineData;
	spines.elevator = res.elevator.spineData;
	spines.gun_1 = res.gun_1.spineData;
	spines.title = res.title.spineData;
	spines.txtGameOver = res.txtGameOver.spineData;
	spines.txtSpeedUp = res.txtSpeedUp.spineData;
	spines.target = res.target.spineData;
	spines.walkers = res.walkers.spineData;
	spines.blueSiren = res.blueSiren.spineData;
	spines.redSiren = res.redSiren.spineData;
	spines.tutoKeyboard = res.tutoKeyboard.spineData;
	spines.sparkle = res.sparkle.spineData;
	spines.newBest = res.newBest.spineData;
	spines.heart = res.heart.spineData;
	spines.line = res.line.spineData;
	spines.rankUp = res.rankUp.spineData;
	spines.gunUnlock = res.gunUnlock.spineData;


    //howler
    arrBGM.push(new Howl({src:[strGamePath+"sound/BGM.mp3", strGamePath+"sound/BGM.ogg"]}));
    arrSE[SE_BUTTON] = new Howl({src:[strGamePath+"sound/Click.mp3", strGamePath+"sound/Click.ogg"]});
    arrSE[SE_ZOMBIE_DIE_1] = new Howl({src:[strGamePath+"sound/ZombieDie1.mp3", strGamePath+"sound/ZombieDie1.ogg"]});
    arrSE[SE_ZOMBIE_DIE_2] = new Howl({src:[strGamePath+"sound/ZombieDie2.mp3", strGamePath+"sound/ZombieDie2.ogg"]});
    arrSE[SE_HUMAN_DIE] = new Howl({src:[strGamePath+"sound/HumanDie.mp3", strGamePath+"sound/HumanDie.ogg"]});
    arrSE[SE_ELEVATOR_MOVE] = new Howl({src:[strGamePath+"sound/ElevatorMove.mp3", strGamePath+"sound/ElevatorMove.ogg"]});
    arrSE[SE_ELEVATOR_ARRIVE] = new Howl({src:[strGamePath+"sound/ElevatorStop.mp3", strGamePath+"sound/ElevatorStop.ogg"]});
    arrSE[SE_ELEVATOR_OPEN] = new Howl({src:[strGamePath+"sound/ElevatorOpen.mp3", strGamePath+"sound/ElevatorOpen.ogg"]});
    arrSE[SE_ELEVATOR_CLOSE] = new Howl({src:[strGamePath+"sound/ElevatorClose.mp3", strGamePath+"sound/ElevatorClose.ogg"]});
    arrSE[SE_SIREN_RED] = new Howl({src:[strGamePath+"sound/RedSiren.mp3", strGamePath+"sound/RedSiren.ogg"]});
    arrSE[SE_SIREN_BLUE] = new Howl({src:[strGamePath+"sound/BlueSiren.mp3", strGamePath+"sound/BlueSiren.ogg"]});
    arrSE[SE_SPEEDUP] = new Howl({src:[strGamePath+"sound/SpeedUp.mp3", strGamePath+"sound/SpeedUp.ogg"]});
    arrSE[SE_ZOMBIE_WIN] = new Howl({src:[strGamePath+"sound/ZombieWin.mp3", strGamePath+"sound/ZombieWin.ogg"]});
    arrSE[SE_GAMEOVER] = new Howl({src:[strGamePath+"sound/GameOver.mp3", strGamePath+"sound/GameOver.ogg"]});
    arrSE[SE_GUN_0] = new Howl({src:[strGamePath+"sound/Gun001.mp3", strGamePath+"sound/Gun001.ogg"]});
    arrSE[SE_GUN_1] = new Howl({src:[strGamePath+"sound/Gun002.mp3", strGamePath+"sound/Gun002.ogg"]});
    arrSE[SE_GUN_2] = new Howl({src:[strGamePath+"sound/Gun003.mp3", strGamePath+"sound/Gun003.ogg"]});
    arrSE[SE_GUN_3] = new Howl({src:[strGamePath+"sound/Gun004.mp3", strGamePath+"sound/Gun004.ogg"]});
    arrSE[SE_GUN_4] = new Howl({src:[strGamePath+"sound/Gun005.mp3", strGamePath+"sound/Gun005.ogg"]});
    arrSE[SE_GUN_5] = new Howl({src:[strGamePath+"sound/Gun006.mp3", strGamePath+"sound/Gun006.ogg"]});
    arrSE[SE_GUN_6] = new Howl({src:[strGamePath+"sound/Gun007.mp3", strGamePath+"sound/Gun007.ogg"]});
    arrSE[SE_GUN_7_1] = new Howl({src:[strGamePath+"sound/Gun008.mp3", strGamePath+"sound/Gun008.ogg"]});
    arrSE[SE_GUN_7_2] = new Howl({src:[strGamePath+"sound/Gun008_2.mp3", strGamePath+"sound/Gun008_2.ogg"]});
    arrSE[SE_ZOMBIE_DIE_3] = new Howl({src:[strGamePath+"sound/ZombieDie3.mp3", strGamePath+"sound/ZombieDie3.ogg"]});
    arrSE[SE_ZOMBIE_DIE_4] = new Howl({src:[strGamePath+"sound/ZombieDie4.mp3", strGamePath+"sound/ZombieDie4.ogg"]});
    arrSE[SE_LifeDown] = new Howl({src:[strGamePath+"sound/LifeDown.mp3", strGamePath+"sound/LifeDown.ogg"]});


	touch_area_left = SpriteLoad(stage, strGamePath+"img/touch_area.png", 0, 0, 0, 0);
	touch_area_right = SpriteLoad(stage, strGamePath+"img/touch_area.png", 360, 0, 0, 0);

	touch_area_left.alpha = 0;
	touch_area_right.alpha = 0;

	touch_area_left.interactive = true;
	touch_area_right.interactive = true;

    loadComplete();
}
var dummySecondFont = undefined;
function loadComplete(){
	var converter = GUMA.txtJsonConverter;

	// loader.once("complete", loadOtherSound);
    if(yahooIN !== undefined) {
        if (/Android/i.test(navigator.userAgent)) {
            biPhone = false;
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            biPhone = true;
        } else {
            biPhone = false;
        }
    }

    GAME.gunData = converter.jsonObjects.gunData;
    // GAME.table_language = converter.jsonObjects.languageData;
    // GAME.table_modalMsg = converter.jsonObjects.modalMsgData;

    dummySecondFont = FontLoad(stage, "dummy", -100, -100,
        {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#09eef6", stroke:"#000000", strokeThickness:5});

	GAME.engineInst = new GAME.engine();
	engine = GAME.engineInst;
	var stageManager = engine.stageManager;
	stageManager.patterns = converter.jsonObjects.patternData;
	stageManager.levelData = converter.jsonObjects.levelData;
	stageManager.createPool(30);
	
	var view = GAME.view;
	view.gunData = converter.jsonObjects.gunData;
	view.maxGunIdx = view.gunData.length-1;
	view.curShowNum = kData.iUserOwnGun;
	view.buyRecords = kData.arrBuyRecords;

    //common
    // kMGMenu = new MGMenu(MGM_VERTICAL, GAME.table_language["MGM_Title"][GAME.language], GAME.table_language["MGM_Contents"][GAME.language], ["DAILY", "TOTAL"], 4, 'greappoint');
    // kMGMenu.load(user_id);
    stage.addChild(kMGMenu.main);

    if(yahooIN===undefined) kMGMenu.HideMenu();
    //common

	stage.removeChild(sLoading);
	stage.removeChild(dummySecondFont);

	engine.stageManager.init();
	engine.stageManager.createStage();

    /**
     * sprJPSound
     * */
    //title 화면 사운드 버튼 대응
    // yahooIN = true;//test
    // biPhone = true;//test
    // if(yahooIN!==undefined&&biPhone){
    //     BGMSoundStop();
    //     // SESoundStop();
    //
    //     kData.bSoundBGM = false;
    //     kData.bSoundSE = false;
    //     SaveDataInClient();
    //
    //     GAME.view.soundOn_title.visible = false;
    //     GAME.view.soundOff_title.visible = true;
    // }

    if(bPhone){
        BGMSoundStop();
        // SESoundStop();

        kData.bSoundBGM = false;
        kData.bSoundSE = false;
        SaveDataInClient();

        GAME.view.soundOn_title.visible = false;
        GAME.view.soundOff_title.visible = true;
    }
    /**
     * sprJPSound
     * */

	GAME.view.showTitle();
	//test start
	// testInit = FontLoad(stage, "세이브초기화", 10, 60
	// 		, {fontFamily:'HYSUPM', fontSize:"20px", fill:'#ffffff', fontWeight:"bold"}, 0, 0);
	// testInit.interactive = true;
	// testInit.on("click", InitData);
	// testInit.on("tap", InitData);
    //
    // addUserGold = FontLoad(stage, "유저골드1000추가", 10, 90
    //     , {fontFamily:'HYSUPM', fontSize:"20px", fill:'#ffffff', fontWeight:"bold"}, 0, 0);
    // addUserGold.interactive = true;
    // addUserGold.on("click", addGold);
    // addUserGold.on("tap", addGold);
    // function addGold(){
    //     kData.iUserOwnGold += 1000;
    // }
    //
    // infiniteContinue = FontLoad(stage, "이어하기창 계속띄우기: false", 10, 120
     //    , {fontFamily:'HYSUPM', fontSize:"20px", fill:'#ffffff', fontWeight:"bold"}, 0, 0);
    // infiniteContinue.interactive = true;
    // infiniteContinue.on("click", infiniteCont);
    // infiniteContinue.on("tap", infiniteCont);
    //
    // function infiniteCont(){
	// 	bInfiniteCont = !bInfiniteCont;
	// 	if(bInfiniteCont)
	// 		infiniteContinue.text = "이어하기창 계속띄우기: true";
	// 	else
     //        infiniteContinue.text = "이어하기창 계속띄우기: false";
    // }
    //test End

    kData.arrBuyRecords.length = GAME.gunData.length;

    //퀄업 이전 플레이어의 최고층 검수 및 총기 해금
    var i;
    for(i=0;i<kData.arrBuyRecords.length;++i){
        if(GAME.gunData[i].floor<=kData.iBestFloor){
            kData.arrBuyRecords[i] = true;
        }
    }

    networkManager.ForcedSaveData(false, function () {
        checkNextGunSlot();
        setUnlockGunData();
        state = STATE_GAME;
    });

    // /**
    //  * sprJPSound
    //  * */
    // //title 화면 사운드 버튼 대응
    // // yahooIN = true;//test
    // // biPhone = true;//test
    // if(yahooIN!==undefined&&biPhone){
    //     BGMSoundStop();
    //     // SESoundStop();
    //
    //     kData.bSoundBGM = false;
    //     kData.bSoundSE = false;
    //     SaveDataInClient();
    //
    //     GAME.view.soundOn_title.visible = false;
    //     GAME.view.soundOff_title.visible = true;
    // }
    // /**
    //  * sprJPSound
    //  * */
}

function update(){
	checkDeltaTime();
	
	switch(state){
	case STATE_NONE:
		break;
	case STATE_LOAD:
		break;
	case STATE_GAME:
		engine.update();
		break;
	}

    if(document.body.scrollTop !== 0) // yahooIN : 모바일페이지에서 화면이 올라가는증상을 해결함.
        document.body.scrollTop = 0;

	renderer.render(stage);
	requestAnimationFrame(update);
}
