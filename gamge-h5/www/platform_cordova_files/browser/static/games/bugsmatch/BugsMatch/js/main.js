/**
 * Created by juho on 2016-03-28.
 */

(function() {
    // 언어설정
    GD.leng = 'en';
    GD.isDebug = false;
    // Canvas 화면설정
    GD.init(720, 1230, 0, 0, 0xFFFFFF);


    //PNG==========================================================================================
    GD.loader.add('game_bg1', RES_DIR_PNG + "bg1.png");
    GD.loader.add('game_bg2', RES_DIR_PNG + "bg2.png");
    GD.loader.add('game_bg3', RES_DIR_PNG + "bg3.png");
    GD.loader.add('game_bg4', RES_DIR_PNG + "bg4.png");


    //메달 업적이미지
    GD.loader.add('game_medal_1', RES_DIR_IMG + "mission_0001.png");
    GD.loader.add('game_medal_2', RES_DIR_IMG + "mission_0002.png");
    GD.loader.add('game_medal_3', RES_DIR_IMG + "mission_0003.png");
    GD.loader.add('game_medal_4', RES_DIR_IMG + "mission_0004.png");

    //JSON====================================================================================
    //인트로
    GD.loader.add(RES_DIR_JSON + 'intro/' + 'intro.json');
    //튜토리얼
    if(GD.leng == 'ko'){GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial1.json");}
    else{GD.loader.add(RES_DIR_JSON + "tutorial/" + "tutorial1_"+GD.leng+".json");}
    GD.loader.add(RES_DIR_JSON + 'tutorial/' + 'tutorialUI.json');
    //숫자
    GD.loader.add(RES_DIR_JSON + 'number/' + 'basic_number.json');
    GD.loader.add(RES_DIR_JSON + 'number/' + 'comnumber.json');
    GD.loader.add(RES_DIR_JSON + 'number/' + 'countdown.json');
    //게임
    GD.loader.add(RES_DIR_JSON + 'game/' + 'fever_bg.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'warning_bg.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'block_item.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'blockopen.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'gametext.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'match_effect.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'game_timebar.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'bugs.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'button.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'fever_danger_text.json');
    GD.loader.add(RES_DIR_JSON + 'game/' + 'warningbar.json');

    GD.loader.load(loadSound);
    //GD.loader.load(onAssetsLoaded);
    GD.showProgress();

    function loadSound(loader, resource){
        // 사운드 목록 설정
        var soundList = ['sound_bgm'];//bgm
        var effectList = [//effect
            'sound_bomb',
            'sound_correct',
            'sound_count',
            'sound_error',
            'sound_fever',
            'sound_fever_BG',
            'sound_gameover',
            'sound_hint',
            'sound_levelup',
            'sound_select',
            'sound_start',
            'sound_timewarning',
            'sound_skip_bt',
            'sound_block_line'
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
        GD.tutorial.init(1, 'tutorial_');
        GD.tutorial.closeBtn.y = 1085;

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
        //console.log('main start');
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