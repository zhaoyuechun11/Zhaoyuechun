(function() {
    // Canvas 화면설정
    GD.init(gc.width, gc.height, 0, 0, 0xFFFFFF);

    this.loading = new GD.Progress();
    this.loading.show();
    GD.stage.addChild(this.loading);
    //this.loading.init();

    // 업적이미지
    //GD.loader.add('game_medal_1', RES_DIR_IMG + "mission_0001.png");
    //GD.loader.add('game_medal_2', RES_DIR_IMG + "mission_0002.png");
    //GD.loader.add('game_medal_3', RES_DIR_IMG + "mission_0003.png");
    //GD.loader.add('game_medal_4', RES_DIR_IMG + "mission_0004.png");

    GD.loader.add('help1', RES_DIR_IMG + "intro_tutorial/help_page_0001.png");
    GD.loader.add('help2', RES_DIR_IMG + "intro_tutorial/help_page_0002.png");
    GD.loader.add('help3', RES_DIR_IMG + "intro_tutorial/help_page_0003.png");
    GD.loader.add('help4', RES_DIR_IMG + "intro_tutorial/help_page_0004.png");

    //GD.loader.add('popupmap', RES_DIR_IMG + "stagechange/popup_map.png");
    GD.loader.add('uishadow', RES_DIR_IMG + "ui_shadow.png");
    GD.loader.add('stage1', RES_DIR_IMG + "stage_1.png");
    GD.loader.add('stage2', RES_DIR_IMG + "stage_2.png");
    GD.loader.add('stage3', RES_DIR_IMG + "stage_3.png");
    GD.loader.add('stage4', RES_DIR_IMG + "stage_4.png");
    GD.loader.add('stage5', RES_DIR_IMG + "stage_5.png");
    GD.loader.add('stage6', RES_DIR_IMG + "stage_6.png");
    GD.loader.add('stage7', RES_DIR_IMG + "stage_7.png");
    GD.loader.add('stage8', RES_DIR_IMG + "stage_8.png");
    GD.loader.add('stage9', RES_DIR_IMG + "stage_9.png");
    GD.loader.add('stage10', RES_DIR_IMG + "stage_10.png");
    GD.loader.add('stage11', RES_DIR_IMG + "stage_11.png");
    GD.loader.add('stage12', RES_DIR_IMG + "stage_12.png");
    GD.loader.add('stage13', RES_DIR_IMG + "stage_13.png");
    GD.loader.add('stage14', RES_DIR_IMG + "stage_14.png");


    GD.loader.add(RES_DIR_IMG + "gameLodingPage.json");

    GD.loader.add(RES_DIR_IMG + "daytonight/daytonight1.json");
    GD.loader.add(RES_DIR_IMG + "daytonight/daytonight2.json");
    GD.loader.add(RES_DIR_IMG + "daytonight/daytonight3.json");
    GD.loader.add(RES_DIR_IMG + "daytonight/daytonight4.json");
    GD.loader.add(RES_DIR_IMG + "intro.json");
    GD.loader.add(RES_DIR_IMG + "effect.json");
    GD.loader.add(RES_DIR_IMG + "gameblock.json");
    //GD.loader.add(RES_DIR_IMG + "itemblock.json");

    //GD.loader.add(RES_DIR_IMG + "stage/stageBg1.json");
    //GD.loader.add(RES_DIR_IMG + "stage/stageBg2.json");

    GD.loader.add(RES_DIR_IMG + "game_result.json");
    GD.loader.add(RES_DIR_IMG + "stage/puzzleBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/koreaBuilding.json");
    GD.loader.add(RES_DIR_IMG + "stage/koreaBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/chinaBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/chinaBuilding.json");
    GD.loader.add(RES_DIR_IMG + "stage/egyptBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/egyptBuilding.json");
    GD.loader.add(RES_DIR_IMG + "stage/greeceBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/greeceBuilding.json");
    GD.loader.add(RES_DIR_IMG + "stage/americaBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/americaBuilding.json");
    GD.loader.add(RES_DIR_IMG + "stage/franceBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/franceBuilding.json");
    GD.loader.add(RES_DIR_IMG + "stage/brazilBlock.json");
    GD.loader.add(RES_DIR_IMG + "stage/stageClear.json");
    GD.loader.add(RES_DIR_IMG + "stage/brazilBuilding.json");
    //GD.loader.add(RES_DIR_IMG + "stagechange/stageChange.json");
    GD.loader.add(RES_DIR_IMG + "stagechange/endingpage.json");
    //GD.loader.add(RES_DIR_IMG + "countryFlagAndMoveCount.json");
    //GD.loader.add(RES_DIR_IMG + "transport.json");
    GD.loader.add(RES_DIR_IMG + "transport2.json");
    GD.loader.add(RES_DIR_IMG + "kariNormal/ui_speech.json");

    //GD.loader.add(RES_DIR_IMG + "intro_tutorial/introandtutorial.json");
    GD.loader.add('tutoriaSpine',RES_DIR_IMG + "intro_tutorial/skeleton.json");
    GD.loader.add('spineCharacter',RES_DIR_IMG+'skeleton.json');
    GD.loader.add('clearSpine',RES_DIR_IMG + "stageclear/skeleton.json");
    GD.loader.add('failSpine',RES_DIR_IMG + "stagefail/skeleton.json");
    GD.loader.add('kariNormal',RES_DIR_IMG + "kariNormal/skeleton.json");
    GD.loader.add('moveLineSpine',RES_DIR_IMG + "movelinespine/skeleton.json");

    //GD.loader.load(loadSound);
    GD.loader.load(onLoaded);

    GD.gameId = "PUZZLE_TRIP";

    if(!gc.localTest) {
        //OcbApplicationJS.titleViewSetTitle('퍼즐트립');
        //OcbApplicationJS.registerBackKeyListener('gc.onBackKey');
        //// 모바일 켜기
        //OcbApplicationJS.registerOnResumeCallback("gc.deviceResume");
        //// 모바일 끄기
        //OcbApplicationJS.registerOnStopCallback("gc.deviceStop");
    }

    var loading = null;

    function onLoaded(){
        var filter = "win16|win32|win64|mac";
        if(navigator.platform)
        {
            if(0 > filter.indexOf(navigator.platform.toLowerCase()))
            {
                if(navigator.userAgent.match(/Android 4./)) {
                    gc.isLowPhone = true;
                }else{
                    gc.isLowPhone = false;
                }

                if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
                    gc.phoneType = "io";
                }

                //if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || parseInt(navigator.userAgent.match(/Android [\d+\.]{3,5}/)[0].replace('Android ', '')) < 5)
                //{
                //    gc.soundFlag = false;
                //    GD.AGENT = "ios";
                //    this.loading.hide();
                //    GD.stage.removeChild(this.loading);
                //    onIntro();
                //    return;
                //}
            }
        }
        //gc.isLowPhone = true;
        loadSound();
    }

    // 사운드 로딩
    function loadSound(){
        var soundList = ["sound_bgm"];
        var effectList = [
            "sound_start",
            "sound_gameover",
            "sound_clear",
            "sound_puzzle_mix",
            "sound_sp_puzzle_mix",
            "sound_mvminus",
            "sound_mvplus",
            "sound_stage",
            "sound_drag01",
            "sound_drag02",
            "sound_drag03",
            "sound_drag04",
            "sound_drag05",
            "sound_drag06",
            "sound_drag07",
            "sound_drag08",
            "sound_drag09",
            "sound_drag010",
            "sound_drag_max",
            "sound_puzzle",
            "sound_block",
            "sound_sp_puzzle",
            "sound_helicopter",
            "sound_train",
            "sound_airplane",
            "sound_ship",
            "sound_foot",
            "sound_fever",
            "sound_flag",
            "sound_boattrans",
            "sound_camera"
        ];
        if(GD.soundType == 1) soundList = soundList.concat(effectList);
        GD.loadSound(soundList, onAssetsLoaded);
    }

    function onAssetsLoaded()
    {
        // 로딩화면 삭제
        //GD.hideProgress();

        this.loading.hide();
        GD.stage.removeChild(this.loading);
        lodingOverFlag = true;
        onIntro();
    }

    // 인트로
    function onIntro(){
        var soundFlag = gc.getStorage(gc.storagesound);
        var bgmFlag = gc.getStorage(gc.storagebgm);
        if(soundFlag){
            if(soundFlag == "true"){
                gc.soundFlag = true;
            }else{
                gc.soundFlag = false;
            }
        }
        if(bgmFlag){
            if(bgmFlag == "true"){
                gc.bgmFlag = true;
            }else{
                gc.bgmFlag = false;
            }
        }


        //this.loading.killAni();
        GD.stage.removeChildren();

        gc.state = "intro";
        if(!gc.introPage){
            gc.introPage = new gc.GameIntro();
            gc.introPage.on("GAMESTART_EVENT",gc.onGame.bind(this));
        }
        gc.introPage.init();
        GD.stage.addChild(gc.introPage);

        //if(!gc.localTest){
        //    OcbApplicationJS.requestAuthInfo("setAuthInfo");
        //}else {
        //    gc.onGame();
        //}
    }

    gc.onGame = function(){
        GD.stage.removeChildren();

        gc.gameOver = false;
        if(!gc.soundPopup) {
            gc.soundPopup = new gc.GameSoundPopup();
            gc.soundPopup.on("CLOSE_SOUND_POPUP",onOptionClose);
            if(gc.soundPopup.parent)GD.stage.removeChild(gc.soundPopup);
        }

        var soundSprite = PIXI.Sprite.fromFrame("sound_btn_on.png");
        soundSprite.anchor.set(0.5,0.5);
        soundSprite.x = GD.width*0.94;
        soundSprite.y = GD.height*0.04;
        soundSprite.interactive = true;
        soundSprite.mousedown = soundSprite.touchstart = (function (e) {
            e.stopPropagation();
            onOptionOpen();
            gc.soundPopup.init();
            GD.stage.addChild(gc.soundPopup);
        });

        if(GD.AGENT == "ios"){
            soundSprite.x = GD.width+500;
        }

        gc.soundBt = soundSprite;
        gc.state = "game";

        // 게임
        if(!gc.game){
            gc.game = new gc.GamePlayPage();
            gc.game.on("GOTO_MAINPAGE",onIntro.bind(this));
        }
        gc.game.init();
        GD.stage.addChild(gc.game);

        // 공통 옵션버튼
        //GD.commonOption = GD.CommonOption.getInstance('w');
        //GD.commonOption.on('OPTION_OPEN_EVENT', onOptionOpen);
        //GD.commonOption.on('OPTION_CLOSE_EVENT', onOptionClose);
        //GD.commonOption.on('GAME_RESTART', gameRestart);
        //GD.commonOption.init();
        //GD.stage.addChild(GD.commonOption);

        GD.stage.addChild(soundSprite);

        //GD.bgmPlay();
    }

    function onOptionOpen(){
        gc.isPaused = true;
        gc.game.pauseGame();
    }

    function onOptionClose(){
        gc.isPaused = false;
        gc.game.resumeGame();
    }

    // 게임 재시작
    function gameRestart(){
        if(gc.flag == 0) {
            gc.flag = 1;
            onIntro();
        }
    }
})();