/**
 * Created by juho on 2016-03-28.
 */

(function() {
    // 언어설정
    GD.leng = 'ko';
    GD.isDebug = false;
    // Canvas 화면설정
    GD.init(720, 1230, 0, 0, 0xFFFFFF);


    //PNG==========================================================================================
    //게임
    GD.loader.add('game_bg', RES_DIR_PNG + "game/" + "game_bg_0001.png");
    GD.loader.add('game_bg_fever', RES_DIR_PNG + "game/" + "game_bg_fever_0001.png");
    GD.loader.add('game_table', RES_DIR_PNG + "game/" + "game_table_0001.png");
    GD.loader.add('ready_bg', RES_DIR_PNG + "game/" + "ready_bg_0001.png");
    GD.loader.add('shadow_bg', RES_DIR_PNG + "game/" + "shadow_bg.png");
    //메달 업적이미지
    GD.loader.add('game_medal_1', RES_DIR_IMG + "game_medal_0001.png");
    GD.loader.add('game_medal_2', RES_DIR_IMG + "game_medal_0002.png");
    GD.loader.add('game_medal_3', RES_DIR_IMG + "game_medal_0003.png");
    GD.loader.add('game_medal_4', RES_DIR_IMG + "game_medal_0004.png");

    //JSON====================================================================================
    //숫자
    GD.loader.add(RES_DIR_JSON + "number/" + "number.json");
    //게임
    GD.loader.add(RES_DIR_JSON + "game/" + "game_icon.json");
    GD.loader.add(RES_DIR_JSON + "game/" + "game_text.json");
    //애니메이션
    GD.loader.add(RES_DIR_JSON + "ani/" + "bomb_item_effect.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "clear_effect.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "cookie.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "eraser_item_effect.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "fever_effect1.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "fever_effect2_1.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "fever_effect2_2.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "fever_effect2_3.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "fever_effect2_4.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "item_effect.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "momo_fever.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "momo_normal.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "shushu_fever.json");
    GD.loader.add(RES_DIR_JSON + "ani/" + "shushu_normal.json");
    //인트로
    GD.loader.add(RES_DIR_JSON + "intro/" + "intro.json");
    //튜토리얼
    GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorialUI.json");
    if(GD.leng == 'ko'){
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial1.json");
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial2.json");
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial3.json");
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial4.json");
    }else{
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial1_"+GD.leng+".json");
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial2_"+GD.leng+".json");
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial3_"+GD.leng+".json");
        GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial4_"+GD.leng+".json");
    }


    GD.loader.load(loadSound);
    GD.showProgress();

    function loadSound(loader, resource){
        // 사운드 목록 설정
        var soundList = ['sound_bgm'];
        var effectList = [
            'sound_fever',
            'sound_match_1',
            'sound_match_2',
            'sound_match_3',
            'sound_match_fever',
            'sound_ready',
            'sound_start',
            'sound_gameover',
            'sound_momotime',
            'sound_use'
        ];
        if(GD.soundType == 1) soundList = soundList.concat(effectList);
        GD.loadSound(soundList, onAssetsLoaded);
    }

    function onAssetsLoaded() {
        // 로딩화면 삭제
        GD.hideProgress();
        onIntro();

        mobileChcck();
    }

    // 인트로
    function onIntro(){
        GD.stage.removeChildren();

        // 공통 튜토리얼
        GD.tutorial = GD.Tutorial.getInstance();
        GD.tutorial.init(7, 'tutorial_', 'help_prev', 'help_next');
        GD.tutorial.setPrevButtonPos(60, GD.height/2);
        GD.tutorial.setNextButtonPos(GD.width-60, GD.height/2);
        //GD.tutorial.setCloseButtonPos(x, y);

        // 인트로
        var space = 270, posY = 1070;

        gc.intro = GD.CommonIntro.getInstance('w', 'intro_bg');
        gc.intro.initHelp('intro_help_btn', GD.width/2-space, posY);
        gc.intro.initSound('intro_option_btn', GD.width/2+space, posY);
        gc.intro.initStart('intro_start_btn', GD.width/2, posY, function(){
            GD.fullScreen();
            onGame();
        }, this);
        gc.intro.init();
        GD.stage.addChild(gc.intro);
    }

    // 게임
    function onGame(){
        GD.stage.removeChildren();
        // 게임
        gc.game = gc.GameScene.getInstance();
        gc.game.init();
        GD.stage.addChild(gc.game);

        // 공통 옵션버튼
        GD.commonOption = GD.CommonOption.getInstance('w');
        GD.commonOption.on('OPTION_OPEN_EVENT', onOptionOpen);
        GD.commonOption.on('OPTION_CLOSE_EVENT', onOptionClose);
        GD.commonOption.on('GAME_RESTART', gameRestart);
        GD.commonOption.init();
        GD.stage.addChild(GD.commonOption);

        GD.bgmPlay(0.8);
    }

    function onOptionOpen(){
        gc.game.pause();
    }

    function onOptionClose(){
        gc.game.resume();
    }

    //모바일 여부 체크
    function mobileChcck()
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
    }

    // 게임 재시작
    function gameRestart(){
        onIntro();
    }
})();