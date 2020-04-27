function GetString(key, data)
{
    switch(Define.LANGUAGE)
    {
        case Enum.LANGUAGE.EN:
            if(data === undefined)
                return Define.tbString[key].en.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].en.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case Enum.LANGUAGE.JP:
            if(data === undefined)
                return Define.tbString[key].ja.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].ja.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
        case Enum.LANGUAGE.KR:
            if(data === undefined)
                return Define.tbString[key].ko.replace(/{E}/gi, "\n");
            else
                return Define.tbString[key].ko.replace("{V}", data.toString()).replace(/{E}/gi, "\n");
            break;
    }
    return "";
}


window.onload = function () {
    //'use strict';
    var game
        , mg = window[''];

    if(Define.LANDSCAPE === true)
        game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');
    else
        game = new Phaser.Game(720, 1280, Phaser.AUTO, 'game');


    game.state.add('boot', mg.Boot);
    game.state.add('preloader', mg.Preloader);
    // game.state.add('menu', mg.Menu)
    game.state.add('title', mg.Title);
    game.state.add('game', mg.Game);

    game.state.start('boot');

};

ResourcesManager = function (game) {
    this.game = game;
};
ResourcesManager.prototype = {
    preload: function () {
    },
    create: function () {
    },
    update: function () {
    },
    loader: function (res) {
        var pack = res;
        for(var method in pack) {
            pack[method].forEach(function(args) {
                var loader = this.game.load[method];
                loader && loader.apply(this.game.load, args);
            }, this);
        }
    }
};

ResourcesManager.MoviLoad ={
    'image': [
        ['preloaderLogoMono', 'assets/atlas/load/movi_01.png?v='+Define.IMG_VER],
        ['preloaderLogoColor', 'assets/atlas/load/movi_02.png?v='+Define.IMG_VER],
        ['preloaderLogoText', 'assets/atlas/load/movi_03.png?v='+Define.IMG_VER],
        ['loading_banner', 'assets/atlas/load/Loading_banner.png?v='+Define.IMG_VER],
        ['loading02', 'assets/atlas/load/loading02.png?v='+Define.IMG_VER],
        ['zhuye002', 'assets/atlas/load/zhuye002.png?v='+Define.IMG_VER]
    ]
};
//
ResourcesManager.Preloader = {
    "bitmapFont": [
        ["font", "assets/font/font-export.png", "assets/font/font-export.xml"],
        ["condition", "assets/font/font_condition-export.png", "assets/font/font_condition-export.xml"],
        ["move", "assets/font/font_play_move-export.png", "assets/font/font_play_move-export.xml"],
        ["world", "assets/font/font_play_world-export.png", "assets/font/font_play_world-export.xml"],
        ["shop", "assets/font/font_shop-export.png", "assets/font/font_shop-export.xml"],
        ["stage_no", "assets/font/font_stage_no-export.png", "assets/font/font_stage_no-export.xml"],
        ["world_no", "assets/font/font_world_no-export.png", "assets/font/font_world_no-export.xml"],
        ["title", "assets/font/font_title-export.png", "assets/font/font_title-export.xml"]
    ],
    "text": [//textFile load //json 으로 파싱할 텍스트 파일 로드.
        //["question_easy", "datafile/questionBank_easy.txt?v="+Define.TABLE_VER]
    ],
    'image': [
        ['icon_01', 'assets/atlas/shop/icon_0001.png?v='+Define.IMG_VER],
        ['icon_02', 'assets/atlas/shop/icon_0002.png?v='+Define.IMG_VER],
        ['logo-enclave', 'assets/atlas/shop/icon_0003.png?v='+Define.IMG_VER],

        /*['oven_hint_ghost', 'assets/img/hint.png?v='+Define.IMG_VER],
        ['white', 'assets/img/white.png?v='+Define.IMG_VER],
        ['hollow', 'assets/img/hollow.png?v='+Define.IMG_VER],
        ['back_line_1', 'assets/img/back_line_1.png?v='+Define.IMG_VER],
        ['bg', 'assets/img/bg.png?v='+Define.IMG_VER],
        ['top_select', 'assets/img/top_select.png?v='+Define.IMG_VER],
        ['btn_arrow1', 'assets/img/btn_arrow1.png?v='+Define.IMG_VER],
        ['btn_arrow2', 'assets/img/btn_arrow2.png?v='+Define.IMG_VER],
        ['btn_arrow2_bg', 'assets/img/btn_arrow2_bg.png?v='+Define.IMG_VER],
        ['btn_arrow3', 'assets/img/btn_arrow3.png?v='+Define.IMG_VER],
        ['btn_page_normal', 'assets/img/btn_page_normal.png?v='+Define.IMG_VER],
        ['btn_page_selected', 'assets/img/btn_page_selected.png?v='+Define.IMG_VER],
        ['baby_base', 'assets/img/baby_base.png?v='+Define.IMG_VER],
        ['text_world', 'assets/img/text_world.png?v='+Define.IMG_VER],
        ['panel_select', 'assets/img/panel_select.png?v='+Define.IMG_VER],
        ['popup_message', 'assets/img/popup_message.png?v='+Define.IMG_VER],
        ['popup_tutorial', 'assets/img/tutorial_img.png?v='+Define.IMG_VER],
        ['tutorial_1', 'assets/img/tutorial_1.png?v='+Define.IMG_VER],
        ['tutorial_2', 'assets/img/tutorial_2.png?v='+Define.IMG_VER],
        ['tutorial_3', 'assets/img/tutorial_3.png?v='+Define.IMG_VER],
        ['star_ready_1', 'assets/img/star_ready_1.png?v='+Define.IMG_VER],
        ['star_ready_1_empty', 'assets/img/star_ready_1_empty.png?v='+Define.IMG_VER],
        ['btn_ready_blue', 'assets/img/btn_ready_blue.png?v='+Define.IMG_VER],
        ['btn_ready_red', 'assets/img/btn_ready_red.png?v='+Define.IMG_VER],
        ['text_back', 'assets/img/text_back.png?v='+Define.IMG_VER],
        ['text_hurryup', 'assets/img/text_hurryup.png?v='+Define.IMG_VER],
        ['text_no', 'assets/img/text_no.png?v='+Define.IMG_VER],
        ['text_select', 'assets/img/text_select.png?v='+Define.IMG_VER],
        ['text_start', 'assets/img/text_start.png?v='+Define.IMG_VER],
        ['text_thanks', 'assets/img/text_thanks.png?v='+Define.IMG_VER],
        ['title', 'assets/img/title.png?v='+Define.IMG_VER],
        ['title_1', 'assets/img/title_1.png?v='+Define.IMG_VER],
        ['title_tutorial', 'assets/img/title_tutorial.png?v='+Define.IMG_VER],
        ['panel_1', 'assets/img/panel_1.png?v='+Define.IMG_VER],
        ['panel_2', 'assets/img/panel_2.png?v='+Define.IMG_VER],
        ['heart', 'assets/img/heart.png?v='+Define.IMG_VER],
        ['heart_hint', 'assets/img/heart_hint.png?v='+Define.IMG_VER],
        ['btn_plus', 'assets/img/btn_plus.png?v='+Define.IMG_VER],
        ['btn_plus_shop', 'assets/img/btn_plus_shop.png?v='+Define.IMG_VER],
        ['btn_close', 'assets/img/btn_close.png?v='+Define.IMG_VER],
        ['btn_retry', 'assets/img/btn_retry.png?v='+Define.IMG_VER],
        ['btn_retry', 'assets/img/btn_retry.png?v='+Define.IMG_VER],
        ['btn_next', 'assets/img/btn_next.png?v='+Define.IMG_VER],
        ['result_perfect', 'assets/img/result_perfect.png?v='+Define.IMG_VER],
        ['result_stage', 'assets/img/result_stage.png?v='+Define.IMG_VER],
        ['reward', 'assets/img/reward.png?v='+Define.IMG_VER],
        ['stage_star', 'assets/img/stage_star.png?v='+Define.IMG_VER],
        ['star', 'assets/img/star.png?v='+Define.IMG_VER],
        ['star_play', 'assets/img/star_play.png?v='+Define.IMG_VER],
        ['star_play_empty', 'assets/img/star_play_empty.png?v='+Define.IMG_VER],
        ['top', 'assets/img/top.png?v='+Define.IMG_VER],
        ['top_0', 'assets/img/top_0.png?v='+Define.IMG_VER],
        ['top_1', 'assets/img/top_1.png?v='+Define.IMG_VER],
        ['top_2', 'assets/img/top_2.png?v='+Define.IMG_VER],
        ['top_3', 'assets/img/top_3.png?v='+Define.IMG_VER],
        ['top_4', 'assets/img/top_4.png?v='+Define.IMG_VER],
        ['top_5', 'assets/img/top_5.png?v='+Define.IMG_VER],
        ['bg_0', 'assets/img/bg_0.png?v='+Define.IMG_VER],
        ['bg_1', 'assets/img/bg_1.png?v='+Define.IMG_VER],
        ['bg_2', 'assets/img/bg_2.png?v='+Define.IMG_VER],
        ['bg_3', 'assets/img/bg_3.png?v='+Define.IMG_VER],
        ['bg_4', 'assets/img/bg_4.png?v='+Define.IMG_VER],
        ['bg_5', 'assets/img/bg_5.png?v='+Define.IMG_VER],
        ['black_alpha_1', 'assets/img/black_alpha_1.png?v='+Define.IMG_VER],
        ['black_alpha_2', 'assets/img/black_alpha_2.png?v='+Define.IMG_VER],
        ['arrow', 'assets/img/arrow.png?v='+Define.IMG_VER],
        ['bottom', 'assets/img/bottom.png?v='+Define.IMG_VER],
        ['hollow_whale', 'assets/img/hollow_whale.png?v='+Define.IMG_VER],

        ['block_h2', 'assets/img/block_h2.png?v='+Define.IMG_VER],
        ['block_h3', 'assets/img/block_h3.png?v='+Define.IMG_VER],
        ['block_v2', 'assets/img/block_v2.png?v='+Define.IMG_VER],
        ['block_v3', 'assets/img/block_v3.png?v='+Define.IMG_VER],
        ['mainblock_shadow', 'assets/img/mainblock_shadow.png?v='+Define.IMG_VER],
        ['mainblock_clear_shadow', 'assets/img/mainblock_clear_shadow.png?v='+Define.IMG_VER],
        ['shadow_h2', 'assets/img/shadow_h2.png?v='+Define.IMG_VER],
        ['shadow_h3', 'assets/img/shadow_h3.png?v='+Define.IMG_VER],
        ['shadow_v', 'assets/img/shadow_v.png?v='+Define.IMG_VER],
        ['block_1_1_add', 'assets/img/block_1_1_add.png?v='+Define.IMG_VER],
        ['block_1_1_add_2', 'assets/img/block_1_1_add_2.png?v='+Define.IMG_VER],
        ['block_1_1_add_3', 'assets/img/block_1_1_add_3.png?v='+Define.IMG_VER],
        ['block_1_2_add', 'assets/img/block_1_2_add.png?v='+Define.IMG_VER],
        ['block_1_2_add_2', 'assets/img/block_1_2_add_2.png?v='+Define.IMG_VER],
        ['block_1_2_add_3', 'assets/img/block_1_2_add_3.png?v='+Define.IMG_VER],
        ['block_1_3_add', 'assets/img/block_1_3_add.png?v='+Define.IMG_VER],
        ['block_1_3_add_2', 'assets/img/block_1_3_add_2.png?v='+Define.IMG_VER],
        ['block_1_3_add_3', 'assets/img/block_1_3_add_3.png?v='+Define.IMG_VER],
        ['block_1_4_add', 'assets/img/block_1_4_add.png?v='+Define.IMG_VER],
        ['block_1_4_add_2', 'assets/img/block_1_4_add_2.png?v='+Define.IMG_VER],
        ['block_1_4_add_3', 'assets/img/block_1_4_add_3.png?v='+Define.IMG_VER],

        ['btn_restart', 'assets/img/btn_restart.png?v='+Define.IMG_VER],
        ['btn_hint', 'assets/img/btn_hint.png?v='+Define.IMG_VER],
        ['btn_sound_off', 'assets/img/btn_sound_off.png?v='+Define.IMG_VER],
        ['btn_sound_off_title', 'assets/img/btn_sound_off_title.png?v='+Define.IMG_VER],
        ['btn_sound_on', 'assets/img/btn_sound_on.png?v='+Define.IMG_VER],
        ['btn_sound_on_title', 'assets/img/btn_sound_on_title.png?v='+Define.IMG_VER],
        ['btn_quit', 'assets/img/btn_quit.png?v='+Define.IMG_VER],
        ['btn_tutorial', 'assets/img/btn_tutorial.png?v='+Define.IMG_VER],
        ['flag', 'assets/img/flag.png?v='+Define.IMG_VER],
        ['speech', 'assets/img/speech.png?v='+Define.IMG_VER],
        ['moves', 'assets/img/moves.png?v='+Define.IMG_VER],
        ['condition', 'assets/img/condition.png?v='+Define.IMG_VER],
        ['gage', 'assets/img/gage.png?v='+Define.IMG_VER],
        ['grade', 'assets/img/grade.png?v='+Define.IMG_VER],
        ['sign', 'assets/img/sign.png?v='+Define.IMG_VER],
        ['hint_arrow', 'assets/img/hint_arrow.png?v='+Define.IMG_VER],
        ['finger', 'assets/img/finger.png?v='+Define.IMG_VER],

        ['circle_mask', 'assets/img/circle_mask.png?v='+Define.IMG_VER],
        ['transpenguin', 'assets/img/transpenguin.png?v='+Define.IMG_VER],

        ['btn_shop_blue', 'assets/img/btn_shop_blue.png?v='+Define.IMG_VER],
        ['btn_shop_blue_disable', 'assets/img/btn_shop_blue_disable.png?v='+Define.IMG_VER],
        ['btn_shop_green', 'assets/img/btn_shop_green.png?v='+Define.IMG_VER],
        ['list_1', 'assets/img/list_1.png?v='+Define.IMG_VER],
        ['list_2', 'assets/img/list_2.png?v='+Define.IMG_VER],
        ['mcoin1', 'assets/img/mcoin1.png?v='+Define.IMG_VER],
        ['mcoin2', 'assets/img/mcoin2.png?v='+Define.IMG_VER],
        ['movie', 'assets/img/movie.png?v='+Define.IMG_VER],
        ['popup_shop', 'assets/img/popup_shop.png?v='+Define.IMG_VER],
        ['panel_shop', 'assets/img/panel_shop.png?v='+Define.IMG_VER],
        ['shop_jewel_1', 'assets/img/shop_jewel_1.png?v='+Define.IMG_VER],
        ['shop_jewel_2', 'assets/img/shop_jewel_2.png?v='+Define.IMG_VER],
        ['shop_jewel_3', 'assets/img/shop_jewel_3.png?v='+Define.IMG_VER]*/

        ['back_line_1', 'assets/img/back_line_1.png?v='+Define.IMG_VER],
        ['top_0', 'assets/img/top_0.png?v='+Define.IMG_VER],
        ['top_1', 'assets/img/top_1.png?v='+Define.IMG_VER],
        ['top_2', 'assets/img/top_2.png?v='+Define.IMG_VER],
        ['top_3', 'assets/img/top_3.png?v='+Define.IMG_VER],
        ['top_4', 'assets/img/top_4.png?v='+Define.IMG_VER],
        ['top_5', 'assets/img/top_5.png?v='+Define.IMG_VER],
        ['bg_0', 'assets/img/bg_0.png?v='+Define.IMG_VER],
        ['bg_1', 'assets/img/bg_1.png?v='+Define.IMG_VER],
        ['bg_2', 'assets/img/bg_2.png?v='+Define.IMG_VER],
        ['bg_3', 'assets/img/bg_3.png?v='+Define.IMG_VER],
        ['bg_4', 'assets/img/bg_4.png?v='+Define.IMG_VER],
        ['bg_5', 'assets/img/bg_5.png?v='+Define.IMG_VER]
    ],
    'spritesheet': [
        ['sparkle_h2', 'assets/img/block_1_1_eff.png?v='+Define.IMG_VER, 113, 57, 6],
        ['sparkle_h3', 'assets/img/block_1_2_eff.png?v='+Define.IMG_VER, 170, 57, 6],
        ['sparkle_v2', 'assets/img/block_1_3_eff.png?v='+Define.IMG_VER, 113, 57, 6],
        ['sparkle_v3', 'assets/img/block_1_4_eff.png?v='+Define.IMG_VER, 170, 57, 6]
    ],
    'atlas': [
        ['atlas-0', 'assets/atlas/atlas-0.png?v='+Define.IMG_VER, 'assets/atlas/atlas-0.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY],
        ['atlas-1', 'assets/atlas/atlas-1.png?v='+Define.IMG_VER, 'assets/atlas/atlas-1.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY]
    ],
    'spine': [
        ['aurora', 'assets/spine/aurora.json?v='+Define.IMG_VER],
        ['baby_all', 'assets/spine/baby_all.json?v='+Define.IMG_VER],
        ['block_eff', 'assets/spine/block_eff.json?v='+Define.IMG_VER],
        ['captain', 'assets/spine/captain.json?v='+Define.IMG_VER],
        ['cha', 'assets/spine/cha.json?v='+Define.IMG_VER],
        ['egloo', 'assets/spine/egloo.json?v='+Define.IMG_VER],
        ['pet', 'assets/spine/pet.json?v='+Define.IMG_VER],
        ['mission_complete', 'assets/spine/mission_complete.json?v='+Define.IMG_VER],
        ['heart', 'assets/spine/heart.json?v='+Define.IMG_VER],
        ['stage_clear_eff', 'assets/spine/stage_clear_eff.json?v='+Define.IMG_VER],
        ['title', 'assets/spine/title.json?v='+Define.IMG_VER]
    ],
    'audio': [
        ['BGM_Game', [
            'assets/sound/BGM_Game.mp3?v='+Define.SND_VER,
            'assets/sound/BGM_Game.ogg?v='+Define.SND_VER],'bgm'],
        ['BGM_Title', [
            'assets/sound/BGM_Title.mp3?v='+Define.SND_VER,
            'assets/sound/BGM_Title.ogg?v='+Define.SND_VER],'bgm'],
        ['SE_Click', [
            'assets/sound/SE_Click.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Click.ogg?v='+Define.SND_VER]],
        ['SE_PopupOn', [
            'assets/sound/SE_PopupOn.mp3?v='+Define.SND_VER,
            'assets/sound/SE_PopupOn.ogg?v='+Define.SND_VER]],
        ['SE_PopupOff', [
            'assets/sound/SE_PopupOff.mp3?v='+Define.SND_VER,
            'assets/sound/SE_PopupOff.ogg?v='+Define.SND_VER]],
        ['SE_Heart', [
            'assets/sound/SE_Heart.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Heart.ogg?v='+Define.SND_VER]],
        ['SE_Screen_Close', [
            'assets/sound/SE_Screen_Close.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Screen_Close.ogg?v='+Define.SND_VER]],
        ['SE_PageMove', [
            'assets/sound/SE_PageMove.mp3?v='+Define.SND_VER,
            'assets/sound/SE_PageMove.ogg?v='+Define.SND_VER]],
        ['SE_MISSION_OK', [
            'assets/sound/SE_MISSION_OK.mp3?v='+Define.SND_VER,
            'assets/sound/SE_MISSION_OK.ogg?v='+Define.SND_VER]],
        ['SE_BabyPenguin_On', [
            'assets/sound/SE_BabyPenguin_On.mp3?v='+Define.SND_VER,
            'assets/sound/SE_BabyPenguin_On.ogg?v='+Define.SND_VER]],
        ['SE_BlockMove', [
            'assets/sound/SE_BlockMove.mp3?v='+Define.SND_VER,
            'assets/sound/SE_BlockMove.ogg?v='+Define.SND_VER]],
        ['SE_BlockCrash', [
            'assets/sound/SE_BlockCrash.mp3?v='+Define.SND_VER,
            'assets/sound/SE_BlockCrash.ogg?v='+Define.SND_VER]],
        ['SE_HeroMove', [
            'assets/sound/SE_HeroMove.mp3?v='+Define.SND_VER,
            'assets/sound/SE_HeroMove.ogg?v='+Define.SND_VER]],
        ['SE_HeroWaiting', [
            'assets/sound/SE_HeroWaiting.mp3?v='+Define.SND_VER,
            'assets/sound/SE_HeroWaiting.ogg?v='+Define.SND_VER]],
        ['SE_HeroEscape', [
            'assets/sound/SE_HeroEscape.mp3?v='+Define.SND_VER,
            'assets/sound/SE_HeroEscape.ogg?v='+Define.SND_VER]],
        ['SE_Block_Click', [
            'assets/sound/SE_Block_Click.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Block_Click.ogg?v='+Define.SND_VER]],
        ['SE_Star_Off', [
            'assets/sound/SE_Star_Off.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Star_Off.ogg?v='+Define.SND_VER]],
        ['SE_Hint', [
            'assets/sound/SE_Hint.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Hint.ogg?v='+Define.SND_VER]],
        ['SE_Star', [
            'assets/sound/SE_Star.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Star.ogg?v='+Define.SND_VER]],
        ['SE_Change', [
            'assets/sound/SE_Change.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Change.ogg?v='+Define.SND_VER]],
        ['SE_StageClear', [
            'assets/sound/SE_StageClear.mp3?v='+Define.SND_VER,
            'assets/sound/SE_StageClear.ogg?v='+Define.SND_VER]]
    ]
};

ResourcesManager.MenuLoader ={

};

ResourcesManager.GameLoader ={

};


window[''] = window[''] || {};
window[''].ResourcesManager = ResourcesManager;





// kData 안에 현금재화 항목의 이름으로
// 클라에서 누적 시킨 뒤 서버에 저장
var CASH_DATA_NAME = 'coin';

// kData 안에 랭킹점수 항목의 이름으로
// 클라에서 누적 시킨 뒤 서버에 저장
var RANKVAL_DATA_NAME = 'RankVal';

// kData 내부에 하트관련된 항목의 이름으로.
var HEART_COUNT = 'life';
var HEART_TIME = 'lifeTime';

// kData 내부의 Greap 포인트 항목
var GREAP_POINT = 'greappoint';

// kData 내부의 TimeStamp
var TIME_STAMP = 'timeSTAMP';

// netbase 참조하여 넣어줘야합니다.
var MYGIDX = 25;

// Server State Enum
var NET_STATE = {
    LOCALHOST : 100,
    TEST_SERVER : 200, // Dev,Test 둘 다
    RUN_SERVER : 400
};

var ShopType = {
    HEART : 1,
    GAMEMONEY : 2
};

var MODAL_BUTTON_TYPE = {
    OKONLY : 1,
    OKCANCEL : 2
};

//var networkManager = new NetworkManager();
//
// // 화면 닫을 시 강제 저장 --  조금 더 정보조사 필요
// $(window).bind("beforeunload" , function () {
//     console.log('quit Save Data');
//     if(proto.actk != null)
//         networkManager.ForcedSaveData();
// });

// 서버 통신 중 버튼 못 누르게 제어하려는 panel (최상단)
// var sNetworkLoading = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'point.png');
/** sTopContainer는 통신하기 전에 설정해 주면 됩니다.
 * ex)
 sTopContainer = sTopContainer
 * netowkrManager.LoadData( callback );
 */
var sTopContainer = null;
/*
// 서버 통신 시작시 버튼 제어관련
function NetworkingWait() {
    // sNetworkLoading.scale.setTo(MG.game.world.width, MG.game.world.height);
    // 메인 panel이 sGane 아닐 경우 변경
    // res 셋팅은 gameviewsetting 때 정리해준다.
    // proto 에 gidx 입력
    if(proto.gidx == 0 && networkManager.networkState == NET_STATE.TEST_SERVER){
        // 게임에 따라 다르게 설정해야함
        setGidx(MYGIDX);
    }

    if(sTopContainer === undefined || sTopContainer == null){
        // if(sGame !== undefined && sNetworkLoading !== undefined){
        // sGame.addChild(sNetworkLoading);
        networkManager.fSaveTimer = 0;
        // }
    }else{
        // sTopContainer.addChild(sNetworkLoading);
        networkManager.fSaveTimer = 0;
    }

    // sNetworkLoading.alpha = 0;
    // sNetworkLoading.visible = true;
}

// 서버에서 통신 완료
function NetworkingEnd() {
    //sNetworkLoading.visible = false;
}

function NetworkManager(){
    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    this.networkState = NET_STATE.LOCALHOST;
    this.fSaveTimer = 0;
    this.fSaveTimeTick = 10;
    this.iSaveStackMax = 4;

    // 서버 호출 가능  : true;
    // 서버에서 호출 중 : false
    this.bAbleConnetingServer = true;
    this.saveStack = [];

    // 강제 저장관련 스택
    this.forcedSaveStack = [];
    this.isSaveRankVal = [];

    // 하트 소모관련
    this.bHeartUseCalled = false;
    this.heartUseStack = [];

    // 데이터 로드 관련
    this.bCalledDataLoading = false;
    this.loadDataStack = [];

    // modal cb func
    this.cb_ModalOK = null;
    this.cb_ModalCancel = null;

    var link = document.location.href;

    // 사용 서버 분기
    if(link.indexOf('localhost') != -1){
        this.networkState = NET_STATE.LOCALHOST;
        console.log('localhost');
        // }else if(link.indexOf('www.LAMPgame.com') != -1){
        //     this.networkState = NET_STATE.RUN_SERVER;
        // console.log('RunServer');
    }else{
        this.networkState = NET_STATE.RUN_SERVER;
        //console.log('TestServer');
    }

    // privete method
    var UploadData = function () {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  UploadData() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        if(!networkManager.bAbleConnetingServer) return;

        NetworkingWait();
        networkManager.bAbleConnetingServer = false;

        //cb_saveCompleteFunc = cb_func;

        if(networkManager.networkState != NET_STATE.RUN_SERVER) {
            // save data in local
            // SaveDataInClient();
            //StorageManager.prototype.SetStorageData();
            networkManager.ForcedSaveData();
        }else{
            if(loginTF == 1){
                // 랭킹 정보는 저장하지 않습니다.
                var sendData = networkManager.saveStack.pop();
                savecall(sendData,null,uData.nJewelryCount);
            }else{
                // 실서버 이면서 로그인이 되지 않았을 때
                // SaveDataInClient();
                //StorageManager.prototype.SetStorageData();
                networkManager.ForcedSaveData();
            }
        }
    };

    var ForcedUploadData = function () {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ForcedUploadData() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        if(!networkManager.bAbleConnetingServer) return;

        NetworkingWait();
        networkManager.bAbleConnetingServer = false;

        var SendData = networkManager.forcedSaveStack.pop();
        var b_isRankingSave = networkManager.isSaveRankVal.pop();

        if(networkManager.networkState != NET_STATE.RUN_SERVER){
            // SaveDataInClient();
            networkManager.SaveDataComplete();
        }else{
            if(loginTF == 1){
                if(b_isRankingSave)
                    savecall(SendData,RANKVAL_DATA_NAME,uData.nJewelryCount);
                else
                    savecall(SendData,null,uData.nJewelryCount);
            }else{
                // 실서버 이면서 로그인이 되지 않았을 때
                // SaveDataInClient();
                networkManager.SaveDataComplete();
            }
        }
    };

    // public method
    NetworkManager.prototype.Update = function () {
        if(!networkManager.bAbleConnetingServer) return;

        if(networkManager.bCalledDataLoading && networkManager.loadDataStack.length > 0){
            //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.Update() 1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            networkManager.bCalledDataLoading = false;
            networkManager.LoadData(networkManager.loadDataStack.pop());
        }else if(networkManager.bHeartUseCalled && networkManager.heartUseStack.length > 0){
            //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.Update() 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            networkManager.UseHeart([0].use_Heart,networkManager.heartUseStack[0].cb_func);
        }else if(networkManager.forcedSaveStack != null && networkManager.forcedSaveStack.length > 0){
            //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.Update() 3 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            ForcedUploadData();
        }else{
            if(networkManager.bAbleConnetingServer && networkManager.saveStack.length >= 1)
                networkManager.fSaveTimer += deltaTime;

            if(networkManager.saveStack.length >= networkManager.iSaveStackMax){
                networkManager.fSaveTimer = 0;
                UploadData();
            }else if(networkManager.fSaveTimer >= networkManager.fSaveTimeTick){
                networkManager.fSaveTimer = 0;
                UploadData();
            }
        }
    };

    // 2017-02-07 Save Callback Func은 없어도 될거라 생각하고 지움
    // 일반적으로 서버에 세이브 하려할 때 호출
    // ====================== 업데이트 예정 ========================
    // 유저의 호출타이머를 따로 만들어서 save가 잦은 경우와 많지 않은 경우의 시간을 변경
    // =============================================================
    NetworkManager.prototype.SaveData = function() {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.SaveData() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        // 추가 세이브 데이터를 기다리기 위해 [통신 최적화]
        networkManager.fSaveTimer = 0;

        // 서버와 통신 중 세이브가 들어오면 무시함.
        // %필수 : 게임 종료 혹은 포커스를 잃었을 경우 세이브는 강제세이브로 따로 만들어야 할 듯
        if(networkManager.bAbleConnetingServer)
            networkManager.saveStack.push($.extend({}, uData));
    };

    // 강제 네트워크 저장.
    // Init 단계 혹은 게임 강제 종료 단계
    // 랭킹 저장
    // 제화 구매 및 제화 사용
    // =================== 업데이트 예정 ===================
    // =====================================================
    // _b_saveRank : 랭킹 저장이 필요할 때 true 그외 null, 혹은 false
    // _cb_func : 콜백
    var CB_ForcedSaveCompleteFunc = null;
    NetworkManager.prototype.ForcedSaveData = function (_b_saveRank,_cb_func) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.ForcedSaveData() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        if(_b_saveRank === undefined || _b_saveRank == null)
            _b_saveRank = false;

        if(_cb_func !== undefined && _cb_func != null)
            CB_ForcedSaveCompleteFunc = _cb_func;
        else
            CB_ForcedSaveCompleteFunc = null;

        if(!networkManager.bAbleConnetingServer){
            networkManager.forcedSaveStack.push($.extend({}, uData));
            networkManager.isSaveRankVal.push($.extend({}, _b_saveRank));
            return;
        }

        NetworkingWait();
        networkManager.bAbleConnetingServer = false;
        networkManager.fSaveTimer = 0;

        //cb_saveCompleteFunc = cb_func;

        if(servicePos == 0){
            if(networkManager.networkState != NET_STATE.RUN_SERVER) {
                // save data in local
                // SaveDataInClient();
                networkManager.SaveDataComplete();
            }else{
                if(loginTF == 1){
                    if(_b_saveRank)
                        savecall(uData,RANKVAL_DATA_NAME,uData.nJewelryCount);
                    else
                        savecall(uData,null,uData.nJewelryCount);
                }else{
                    // 실서버 이면서 로그인이 되지 않았을 때
                    // SaveDataInClient();
                    networkManager.SaveDataComplete();
                }
            }
        }else if(servicePos == 1){
            // 야후 대응
            if(_b_saveRank)
                savecall(uData,RANKVAL_DATA_NAME,uData.nJewelryCount);
            else
                savecall(uData,null,uData.nJewelryCount);
        }
    };

    // 저장 완료
    // netbase 에서만 호출
    //
    NetworkManager.prototype.SaveDataComplete = function (_data) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.SaveDataComplete() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        if(networkManager.saveStack.length > 0)
            networkManager.saveStack = [];

        NetworkingEnd();
        networkManager.bAbleConnetingServer = true;

        if(networkManager.networkState != NET_STATE.LOCALHOST){
            if(_data != null && _data.rank != null){
                //rankingPopupData = _data.rank;

                // 콜백 함수는 따로 만들어서 사용 합니다
                //networkManager.LoadRanking(CB_ShowRanking);
            }

            if(_data !== undefined && _data != null){
                // console.log(_data.data['gamemoney']);
                // gamemoney 관련 현제 단계에서는 계산이 아직 안됨
                // 서버에 상점 작업 완료시 수정 예정
                // uData[CASH_DATA_NAME] = _data.data['gamemoney'];
                // uData[HEART_TIME] = _data.data['nextHtime'];
                // uData[HEART_COUNT] = _data.data['nHeart'];

                // 클라 데이터 분리하지 않았을 경우 주석 처리
                // kData[TIME_STAMP] = _data.data[TIME_STAMP];

                // if(servicePos == 0)
                //     SaveDataInClient();

                //kData[CASH_DATA_NAME] = kData[CASH_DATA_NAME];
            }
        }

        if(CB_ForcedSaveCompleteFunc != null){
            CB_ForcedSaveCompleteFunc();
            CB_ForcedSaveCompleteFunc = null;
        }
        // if(cb_saveCompleteFunc !== undefined)
        //     cb_saveCompleteFunc();
    };

    // callback load complete
    var cb_loadCompleteFunc;
    // 로드 데이터
    // DB에 있는 데이터 긁어 오기
    // ex)
    // networkManager.LoadData(function(){
    //    ...
    // });
    // cb_func : 로드 끝난 뒤 실행 될 함수, null 가능
    //
    NetworkManager.prototype.LoadData = function (cb_func) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.LoadData() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

        if(!networkManager.bAbleConnetingServer) {
            networkManager.bCalledDataLoading = true;

            if(cb_func === undefined)
                cb_func = null;

            networkManager.loadDataStack.push(cb_func);
            return;
        }

        NetworkingWait();

        if(cb_func !== undefined && cb_func != null)
            cb_loadCompleteFunc = cb_func;
        else
            cb_loadCompleteFunc = null;

        networkManager.bAbleConnetingServer = false;

        // LoadDataInClient();

        // if(networkManager.networkState != NET_STATE.RUN_SERVER){
        //     networkManager.LoadDataComplete();
        // }else{
        if(loginTF == 1)
            dataLoading();
        else{
            networkManager.LoadDataComplete();
            // 실서버 이면서 로그인이 되지 않았을 때
        }
        // }
    };

    // 로드 완료
    // netbase에서만 호출
    NetworkManager.prototype.LoadDataComplete = function (_data) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.LoadDataComplete() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        //if(networkManager.networkState != NET_STATE.RUN_SERVER) return;

        if(loginTF == 1){
            if(_data['save'] != null)
            {
                // 각자 수정해야 할 부분
                // kData.iCash 는 현금 결제관련 제화.
                uData = JSON.parse(_data['save']);

                console.log("----------- uData.level = " + uData.level.toString());

                StorageManager.prototype.InitStorageData(false);
                //LoadDataOnlyClient();

                // kData[CASH_DATA_NAME] = JSON.parse(_data['gamemoney']);
                // kData[HEART_TIME] = _data['nextHtime'];
                // kData[HEART_COUNT] = _data['nHeart'];
                // kData[GREAP_POINT] = _data['greappoint'];

                // 클라 데이터 분리하지 않았을 경우 주석 처리
                // kData.calcedTimeStamp = _data['timeSTAMP'] - kData[TIME_STAMP];

                //console.log(kData.iCash);
                //if(uData.nVer === undefined || uData.nVer != SAVE_VER) // 버젼이 없거나 버젼이 다르면 세이브를 초기화 시킨다.
                //InitData();
            }else{
                // 로그인 하였지만, 서버에 게임 데이터가 없는 경우이다. 클라 데이터 초기화 하고 서버에도 올리자.


                // 기존에 로컬에 저장한게 있는지 체크 후 세이브
                //this.InitStorageData(true);
                //StorageManager.prototype.SetStorageData();//LoadDataInClient();

                // kData[CASH_DATA_NAME] = JSON.parse(_data['gamemoney']);
                // kData[HEART_TIME] = _data['nextHtime'];
                // kData[HEART_COUNT] = _data['nHeart'];
                // kData[GREAP_POINT] = _data['greappoint'];

                networkManager.ForcedSaveData();
            }
        }

        if(cb_loadCompleteFunc !== undefined && cb_loadCompleteFunc != null){
            cb_loadCompleteFunc(_data);
            cb_loadCompleteFunc = null;
        }

        networkManager.bAbleConnetingServer = true;
        NetworkingEnd();
    };

    // var cb_SaveRankingComplete;
    // 랭킹 저장
    // NetworkManager.prototype.SaveRaking = function () {
    //     // localhost에서는 scr/network/control.do  가 없기 때문에 호출 불가
    //     rankingPopupData = null;
    //
    //     networkManager.ForcedSaveData(true);
    // };

    //var cb_LoadRankingComplete;
    // 랭킹 데이터 불러오기
    // cb_func : 랭킹 로드 끝나는 시점에 실행되는 함수, null 가능
    // ex)
    // networkManager.LoadRanking(function(){
    //    ...
    // });
    // NetworkManager.prototype.LoadRanking = function (cb_func) {
    //     if(!networkManager.bAbleConnetingServer) return;
    //
    //     if(networkManager.networkState == NET_STATE.LOCALHOST){
    //         sRanking.visible = true;
    //         //cb_func();
    //         alert('localhost에서는 랭킹 호출이 불가능 합니다.');
    //         return;
    //     }
    //
    //     NetworkingWait();
    //     networkManager.bAbleConnetingServer = false;
    //     networkManager.fSaveTimer = 0;
    //
    //     rankingData = null;
    //
    //     cb_LoadRankingComplete = cb_func;
    //     getRankingList();
    // };

    // 로드 랭킹 완료
    // netbase에서만 사용
        // NetworkManager.prototype.LoadRankingComplete = function (_data) {
        //     if(loginTF == 1){
        //         rankingData = _data.data;
        //
        //         // 데일리 랭킹 초기화
        //         if(rankingData.day === undefined || rankingData.day == null || rankingData.day.length == 0){
        //             kData[RANKVAL_DATA_NAME] = 0;
        //         }else{
        //             var bCheckMyData = false;
        //             for(var i=0,imax=rankingData.day.length;i<imax;++i){
        //                 if(rankingData.day[i]['user_id'] == rankingData.myid){
        //                     bCheckMyData = true;
        //                     break;
        //                 }
        //             }
        //
        //             if(!bCheckMyData)
        //                 kData[RANKVAL_DATA_NAME] = 0;
        //         }
        //     }
        //     else
        //         rankingData = _data;
        //
        //     networkManager.bAbleConnetingServer = true;
        //     NetworkingEnd();
        //
        //     if(cb_LoadRankingComplete !== undefined && cb_LoadRankingComplete != null){
        //         cb_LoadRankingComplete();
        //         cb_LoadRankingComplete = null;
        //     }
        // };

    var cb_useHeartComplete;
    // 하트 사용
    // 서버에서 계산 한 뒤 받아 오고 uData에 저장.
    // ex)
    // networkManager.UseHeart(1, function(){
    //    ...
    // });
    // _useCount : 사용 갯수
    // _cb_func : 하트 사용 완료 시점에 실행 되는 함수
    NetworkManager.prototype.UseHeart = function (_useCount,_cb_func) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.UseHeart() ~~_useCount = " + _useCount);
        if(!networkManager.bAbleConnetingServer){
            networkManager.bHeartUseCalled = true;
            networkManager.heartUseStack.push(new HeartUseStackData(_useCount,_cb_func));
            return;
        }

        NetworkingWait();
        networkManager.bAbleConnetingServer = false;

        if(_useCount === undefined || _useCount == null)
            _useCount = 1;

        if(_cb_func !== undefined && _cb_func != null)
            cb_useHeartComplete = _cb_func;
        else
            cb_useHeartComplete = null;

        // if(networkManager.networkState != NET_STATE.RUN_SERVER){
        //     if(kData[HEART_COUNT] == iHeartChargeMax) // iHeartChargeMax 는 따로 지정
        //         kData[HEART_TIME] = fHeartChargeTime; // fHeartChargeTime 는 따로 지정
        //     kData[HEART_COUNT] -= _useCount;
        //
        //     networkManager.UseHeartComplete();
        // }else{
        //     if(loginTF == 1){
        //         heartUse(_useCount);
        //     }else{
        //         if(kData[HEART_COUNT] == iHeartChargeMax) // iHeartChargeMax 는 따로 지정
        //             kData[HEART_TIME] = fHeartChargeTime; // fHeartChargeTime 는 따로 지정
        //
        //         kData[HEART_COUNT] -= _useCount;
        //         networkManager.UseHeartComplete();
        //     }
        // }
    };

    // 하트 소모 완료
    // netbase에서만 사용
    NetworkManager.prototype.UseHeartComplete = function (_data) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.UseHeartComplete() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ " + _data);
        networkManager.bHeartUseCalled = false;
        networkManager.heartUseStack = [];

        // if(networkManager.networkState == NET_STATE.RUN_SERVER && loginTF == 1){
        //     // 데이터 적용
        //     kData[HEART_TIME] = _data.data['nextHtime'];
        //     kData[HEART_COUNT] = _data.data['nHeart'];
        // }

        NetworkingEnd();
        networkManager.bAbleConnetingServer = true;

        networkManager.ForcedSaveData();

        // 콜백 함수 있는지 체크
        if(cb_useHeartComplete !== undefined && cb_useHeartComplete !=null){
            cb_useHeartComplete();
            cb_useHeartComplete = null;
        }
    };

    var cb_func_getshoppinglist;
    // 상점 리스트 호출
    // ex)
    // networkManager.GetShoplist(ShopType.HEART, function(){
    //    ...
    // });
    // 서버DB에 테이블 들어가 있는지 체크(서버팀장님께 문의하면 됩니다.)
    // _shopTyop    : ShopSype enum 형 처리 되어 있음
    // cb_func      : 상점 리스트 불러온 뒤 실행될 함수
    NetworkManager.prototype.GetShoplist = function (_shopType, cb_func) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.GetShoplist() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        if(!networkManager.bAbleConnetingServer)
            return;

        networkManager.bAbleConnetingServer = false;
        NetworkingWait();

        if(_shopType === undefined || _shopType == null)
            _shopType = ShopType.HEART;

        if(networkManager.networkState == NET_STATE.LOCALHOST){
            if(cb_func !== undefined && cb_func != null)
                cb_func_getshoppinglist = cb_func;
            else
                cb_func_getshoppinglist = null;
            networkManager.GetShoppingListComplete();
        }else{
            // test server는 무조건 로그아웃 상점으로 표시 됨
            if(cb_func !== undefined && cb_func != null)
                cb_func_getshoppinglist = cb_func;
            else
                cb_func_getshoppinglist = null;
            marketList(_shopType);
        }
    };

    // 상점 리스트 호출 완료
    // netbase에서만 호출
    NetworkManager.prototype.GetShoppingListComplete = function (_data) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.GetShoppingListComplete() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        networkManager.bAbleConnetingServer = true;
        NetworkingEnd();

        if(_data === undefined || _data == null){
            if(cb_func_getshoppinglist !== undefined && cb_func_getshoppinglist !== null){
                cb_func_getshoppinglist();
                cb_func_getshoppinglist = null;
            }
        }else{
            shopListData = _data;

            if(cb_func_getshoppinglist !== undefined && cb_func_getshoppinglist !== null){
                cb_func_getshoppinglist();
                cb_func_getshoppinglist = null;
            }
        }
    };

    // 구매 요청
    // ex)
    // networkManager.Payment(shopListData[_index].mkidx, function(){
    //    ...
    // });
    // shopListData에 있는 mkidx를 넣어 주어야 합니다.
    // _mkidx   : 상점 리스트 불러 왔을 때 shopListData에 넣어져 있는 mkidx.
    // cb_func  : 구매 완료 한 뒤 호출되는 함수
    NetworkManager.prototype.Payment = function (_mkidx, cb_func) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.Payment() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        if(_mkidx === undefined || _mkidx == null){
            alert('Purchase index error\nversion' + VERSION);
            return;
        }

        networkManager.ForcedSaveData(false,function () {
            if(_mkidx === undefined || _mkidx == null)
                return false;

            if(!networkManager.bAbleConnetingServer)
                return;

            networkManager.bAbleConnetingServer = false;
            NetworkingWait();

            if(networkManager.networkState == NET_STATE.LOCALHOST){
                if(cb_func !== undefined && cb_func != null)
                    cb_loadCompleteFunc = cb_func;
                else
                    cb_loadCompleteFunc = null;
                networkManager.GetShoppingListComplete();
            }else{
                // test server는 무조건 로그아웃 상점으로 표시 됨
                if(cb_func !== undefined && cb_func != null)
                    cb_loadCompleteFunc = cb_func;
                else
                    cb_loadCompleteFunc = null;

                //if(apkTF == 1){
                mkPayment(_mkidx);
                //}else{

                //   }
            }
        });
    };

    var cb_GetServerTimeComplete;
    // 서버 시간 받아 오기
    // ex)
    // networkManager.GetServerTime(function(){
    //    ...
    // });
    // cb_func  : 서버 시간 받아온 뒤 실행 되는 함수
    NetworkManager.prototype.GetServerTime = function (cb_func) {
        if(cb_func !== undefined && cb_func != null)
            cb_GetServerTimeComplete = cb_func;
        else
            cb_GetServerTimeComplete = null;

        if(networkManager.networkState != NET_STATE.LOCALHOST){
            getTimestamp();
        }else{
            networkManager.GetServerTimeComplete();
        }
    };

    // 서버 시간 받아오기 완료
    // netbase에서만 호출
    // _data['Timestamp'] -> 초단위로 옴 ( /1000 할 필요 없습니다)
    NetworkManager.prototype.GetServerTimeComplete = function (_data) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.GetServerTimeComplete() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        var retData = null;
        if(_data !== undefined && _data != null){
            retData = _data['Timestamp'];
        }

        if(cb_GetServerTimeComplete !== undefined && cb_GetServerTimeComplete != null){
            cb_GetServerTimeComplete(retData);
            cb_GetServerTimeComplete = null;
        }
    };

    // 게임정보 받아오기..
    var cb_GetGameInfoComplete;
    NetworkManager.prototype.GetGameInfo = function (cb_func) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.GetGameInfo() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        cb_GetGameInfoComplete = cb_func;
        if(networkManager.networkState != NET_STATE.LOCALHOST){
            baseinfoCall();
        }else{
            networkManager.GetGameInfoComplete();
        }
    };

    // 게임정보 받아오기 완료
    // netbase에서만 호출
    NetworkManager.prototype.GetGameInfoComplete = function (_data) {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.GetGameInfoComplete() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        if(cb_GetGameInfoComplete !== undefined){
            cb_GetGameInfoComplete(_data);
            cb_GetGameInfoComplete = undefined;
        }
    };

    // 회원가입으로 점프
    // ex) networkManager.JoinMember();
    NetworkManager.prototype.JoinMember = function () {
        //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  NetworkManager.prototype.JoinMember() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        if(networkManager.networkState == NET_STATE.RUN_SERVER && loginTF == 0){
            //networkManager.ForcedSaveData();
            networkManager.ForcedSaveData(false,function () {
                memberCall();
            });
        }
    };

    NetworkManager.prototype.JumpGooglePlay = function () {
        googleplaypopCall();
    };

    NetworkManager.prototype.ModalCall = function (_modalType,_msg,_okfunc,_cancelfunc) {
        ShowPopup(false);

        b_okTF = false;

        switch (_modalType){
            case MODAL_BUTTON_TYPE.OKONLY:
                b_okTF = false;
                break;
            case MODAL_BUTTON_TYPE.OKCANCEL:
                b_okTF = true;
                break;
        }

        networkManager.cb_ModalOK = _okfunc;
        networkManager.cb_ModalCancel = _cancelfunc;

        msgModalSET(_msg,b_okTF);
    };
}
*/

// 랭킹 관련 데이터
// var rankingData = new RankingData();
// function RankingData() {
//
//     this.TF = 0;
//
//     this.my_day_rank = 0;
//     this.my_day_score = 0;
//
//     this.my_all_rank = 0;
//     this.my_all_score = 0;
//
//     this.myid = "";
//
//     this.day = [];
//     this.all = [];
// }

// var rankingPopupData = new RankingPopupData();
// function RankingPopupData() {
//     // "rank":{"oldRank":1,"newRank":1,"oldScore":47,"newScore":52}}
//     // oldRank, oldCuRank 가 0으로 오는건 rankup 표시를 안하면 됨 -> 첫 저장이므로 랭크 업과는 다름
//     // 데일리 랭킹 관련
//     this.oldRank = 0;
//     this.newRank = 0;
//
//     this.oldScore = 0;
//     this.newScore = 0;
//
//     // 종합 랭킹 관련
//     this.oldCuRank = 0;
//     this.newCuRank = 0;
//
//     this.oldCuScore = 0;
//     this.newCuScore = 0;
// }

// 하트 관련 스텍 데이터
function HeartUseStackData(_use_Heart, _cb_func) {
    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  HeartUseStackData() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    this.use_Heart = 0;
    this.cb_func = null;

    if(_use_Heart !== undefined && _use_Heart != null)
        this.use_Heart = _use_Heart;

    if(_cb_func !== undefined && _cb_func != null)
        this.cb_func =_cb_func;
}

var shopListData = [new ShopListData()];
function ShopListData() {
    //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  ShopListData() ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // 로그아웃
    // {"TF":1,
    // "data":[{"mkidx":21,"mtype":"logout","pType":"member","Quantity":5,"Price":0},{"mkidx":22,"mtype":"loginout","pType":"ad_1","Quantity":5,"Price":0},
    // {"mkidx":23,"mtype":"loginout","pType":"ad_2","Quantity":20,"Price":0},{"mkidx":24,"mtype":"loginout","pType":"ad_3","Quantity":60,"Price":0}]}

    // 로그인
    // {"TF":1,"actk":"zy32DLjr688Obv0tQY58i0BzYyojyvzbEPYvMfwSLyvgyD7c2K9dP+xy7CuG6PcyEwnxo9+lhr1v0PUFWIn78Z8yQsbr50DbXv5YrX88Nipq7ocXFJxbRrkkDZXUx3CA","data":[{"mkidx":20,"mtype":"login","pType":"point","Quantity":5,"Price":200},
    // {"mkidx":22,"mtype":"loginout","pType":"ad_1","Quantity":5,"Price":0},{"mkidx":23,"mtype":"loginout","pType":"ad_2","Quantity":20,"Price":0},{"mkidx":24,"mtype":"loginout","pType":"ad_3","Quantity":60,"Price":0}]}

    this.mkidx = 0;
    this.mtype = "";
    this.pType = ""; // member : 회원가입 , point : greap 포인트, ad_1~3 : 광고
    this.Quantity = 0;
    this.Price = 0;
    this.icon = "";

}


//'Resque_isBgm,Resque_isSfx,nBestCombo,nBestScore'
Define.StorageDataKey = ["Resque_nVer","Resque_isBgm", "Resque_isSfx", "Resque_moveData", "Resque_level", "Resque_heart", "mCoin", "Resque_PenguinArray", "Resque_JewelryCoolTime"];

// // package everything you need into an object.
// var saveObject = {
//     Resque_level: 5,
//     highScore: 3742
// };
//
// // localStorage only works with strings, so JSON.stringify first.
//localStorage.setItem("save", JSON.stringify(saveObject));

StorageManager = function (game) {
    this.game = game;
    this.StorageData = {};

    this.StorageData['Resque_nVer'] = 0;
    this.StorageData['Resque_isBgm'] = true;
    this.StorageData['Resque_isSfx'] = true;
    this.StorageData['Resque_moveData'] = [[0], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.StorageData['Resque_level'] = [0];
    this.StorageData['Resque_heart'] = { x: MG.Resque_heartFirstCnt };
    this.StorageData['Resque_PenguinArray'] = [];
    this.StorageData['Resque_JewelryCoolTime'] = [];


    // console.log(this.StorageData);
    // console.log(JSON.stringify(this.StorageData));

    this.isLocal = false;
};
StorageManager.prototype = {
    preload: function () {
    },
    create: function () {

    },
    init: function () {
        var that = this;
        this.getDataAllString();
        /*if(Define.SERVICE === Enum.SERVICE_CODE.MOVI_KR)
        {
            this.isLocal = true;
        }

        if(this.isLocal === false)
        {
            MG.networkManager.refresh(function(){
                if(MG.networkManager.isLogin === true)
                {
                    MG.networkManager.AppDataGet(that.getDataAllString(), function(data){
                        if(data.code === 0) {
                            if(data.Resque_nVer === undefined)
                            {
                                MG.networkManager.AppDataPut(JSON.stringify(this.StorageData),function (response) {

                                });
                            }
                            else
                            {
                                this.StorageData['Resque_isBgm'] = data.Resque_isBgm;
                                this.StorageData['Resque_isSfx'] = data.Resque_isSfx;
                                this.StorageData['Resque_moveData'] = data.Resque_moveData;
                                this.StorageData['Resque_level'] = data.Resque_level;
                                this.StorageData['Resque_heart'] = data.Resque_heart;
                                this.StorageData['Resque_PenguinArray'] = data.Resque_PenguinArray;
                                this.StorageData['Resque_JewelryCoolTime'] = data.Resque_JewelryCoolTime;
                            }
                        }
                        else
                        {
                            this.loadData();
                        }
                    });
                }
                else
                {
                    this.loadData();
                }

            });
            return;
        }*/

        this.loadData();



    },
    loadData : function()
    {
        console.log('window.localStorage '+window.localStorage);
        if(window.localStorage !== undefined)
        {
            for(var i=0; i < Define.StorageDataKey.length; i++)
            {
                var value = this.get(Define.StorageDataKey[i]);
                if(value !== undefined && value !== null)
                    this.StorageData[Define.StorageDataKey[i]] = value;
            }
        }
        else
        {
            console.log('window.Define.StorageDataKey.length '+Define.StorageDataKey.length);
            for(var i=0; i < Define.StorageDataKey.length; i++)
            {
                this.set(Define.StorageDataKey[i], this.StorageData[Define.StorageDataKey[i]]);
            }

        }
    },
    getDataAllString : function () {
        var strKeys = '';
        for(var i=0; i < Define.StorageDataKey.length; i++)
        {
            strKeys+=(Define.StorageDataKey[i]+ (i===(Define.StorageDataKey.length-1)? '':",") );
        }
        return strKeys;
    },
    availability: function () {

        if(!(!(typeof(window.localStorage) === 'undefined'))) {
            console.log('localStorage not available');
            return null;
        }

    },
    get : function(key) {
        /*if(MG.networkManager.isLogin === true)
        {
            return;
        }*/
        if(loginTF == 1) return;





        this.availability();
        try {
            return JSON.parse(window.localStorage.getItem(key));
        }
        catch(e) {
            return window.localStorage.getItem(key);
        }
    },
    setPut : function(putData) {
        /*if(MG.networkManager.isLogin === true)
        {
            var putData = {};
            putData[key] = value;
            MG.networkManager.AppDataPut(JSON.stringify(putData));
            return;
        }*/

        this.availability();
        try {

            //window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch(e) {
            console.log('e '+e);
            if(e == QUOTA_EXCEEDED_ERR) {
                console.log('localStorage quota exceeded');
            }
        }
    },
    set : function(key, value) {
        /*if(MG.networkManager.isLogin === true)
        {
            var putData = {};
            putData[key] = value;
            MG.networkManager.AppDataPut(JSON.stringify(putData));
            return;
        }*/
        if(loginTF == 1) networkManager.ForcedSaveData();

        this.availability();
        try {

            window.localStorage.setItem(key, JSON.stringify(value));
        }
        catch(e) {
            console.log('e '+e);
            if(e == QUOTA_EXCEEDED_ERR) {
                console.log('localStorage quota exceeded');
            }
        }
    },
    set_json : function(putData, callback ) {
        var jsonString = JSON.stringify(putData);
        /*if(MG.networkManager.isLogin === true)
        {
            // var putData = {};
            // putData[key] = value;
            MG.networkManager.AppDataPut(jsonString, callback);
            return;
        }*/
        this.availability();
        JSON.parse(jsonString, function(key, value) {

            if (key === '') { return value; }
            console.log(key + " = " + value);
            try {

                window.localStorage.setItem(key, JSON.stringify(value));
            }
            catch(e) {
                console.log('e '+e);
                if(e == QUOTA_EXCEEDED_ERR) {
                    console.log('localStorage quota exceeded');
                }
            }

        });
    },
    remove : function(key) {
        this.availability();
        window.localStorage.removeItem(key);
    },

    clear : function() {
        this.availability();
        window.localStorage.clear();
    },
    update: function () {
    },
    // 비로그인 시 로컬저장
    SetStorageData: function ()
    {
        if(StorageManager.prototype.get('Resque_nVer') == null)
        {
            this.InitStorageData(true);            // 처음 실행한거다. 초기 데이터를 만들자
            // 처음 실행이면 튜토리얼 플레이...
            //stateManager.onPlayTutorial();
        }

        uData.nVer = StorageManager.prototype.get("Resque_nVer");
        uData.isBgm = StorageManager.prototype.get("Resque_isBgm");
        uData.isSfx = StorageManager.prototype.get("Resque_isSfx");
        uData.moveData = StorageManager.prototype.get("Resque_moveData");
        uData.level = StorageManager.prototype.get("Resque_level");
        uData.heart = StorageManager.prototype.get("Resque_heart");
        uData.PenguinArray = StorageManager.prototype.get("Resque_PenguinArray");
        uData.JewelryCoolTime = StorageManager.prototype.get("Resque_JewelryCoolTime");

        //networkManager.ForcedSaveData();
        if(loginTF == 1) networkManager.ForcedSaveData();
    },

    // 비로그인 시 여기로..
    // true : 처음하는거다 초기화
    // false: 서버에서 로딩한 데이터를 로컬데이터에 복사해준다.
    InitStorageData: function(_init) {
        if(_init) {
            StorageManager.prototype.set("Resque_nVer", 0);
            StorageManager.prototype.set("Resque_isBgm", true);
            StorageManager.prototype.set("Resque_isSfx", true);
            StorageManager.prototype.set("Resque_moveData", [[0], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]);
            StorageManager.prototype.set("Resque_level", [0]);
            StorageManager.prototype.set("Resque_heart", { x: MG.heartFirstCnt });
            StorageManager.prototype.set("Resque_PenguinArray", []);
            StorageManager.prototype.set("Resque_JewelryCoolTime", []);
        } else {
            StorageManager.prototype.set("Resque_nVer", uData.nVer);
            StorageManager.prototype.set("Resque_isBgm", uData.isBgm);
            StorageManager.prototype.set("Resque_isSfx", uData.isSfx);
            StorageManager.prototype.set("Resque_moveData", uData.moveData);
            StorageManager.prototype.set("Resque_level", uData.level);
            StorageManager.prototype.set("Resque_heart", uData.heart);
            StorageManager.prototype.set("Resque_PenguinArray", uData.PenguinArray);
            StorageManager.prototype.set("Resque_JewelryCoolTime", uData.JewelryCoolTime);
        }
    }
};



//===============================================================================
// Phaser Text 기능 확장.
//===============================================================================
Phaser.Text.prototype.ReSize = function(limit_width, limit_height){
// if(txt != undefined) this.text = txt;
    this.scale.set(1);
    if(this.width > limit_width) {
        if(limit_height === undefined)
            this.scale.set(limit_width/this.width);
        else if(limit_width/this.width <= limit_height/this.height)
            this.scale.set(limit_width/this.width);
    }
    if(limit_height != undefined && this.height > limit_height) {
        if(limit_width/this.width > limit_height/this.height)
            this.scale.set(limit_height/this.height);
    }
};

Phaser.Text.prototype.ChangeTextColor = function(_colorValue){
    if(_colorValue == undefined) _colorValue = "#FFFFFF";
    this.colors = [];
    this.addColor(_colorValue, 0);

    for(var i=0;i<this.text.length;++i){
        if(this.text[i] == "["){
            if(this.text[i+7] == "]"){ // 컬러색일경우
                var ec = 0;//this.text.slice(0, i+8).split(/(?:\r\n|\r|\n)/).length - 1;
                var color = "#"+this.text.slice(i+1, i+7);
                this.text = this.text.replace(this.text.slice(i, i+8), "");
                this.addColor(color, i-ec);
            }else if(this._text[i+1] == "-"){
                var ec = 0;//this.text.slice(0, i+3).split(/(?:\r\n|\r|\n)/).length - 1;
                this.text = this.text.replace(this.text.slice(i, i+3), "");
                /*if(_colorValue===undefined)this.addColor("#"+this.tint.toString(16), i-ec);
                else this.addColor(_colorValue, i-ec);*/
                this.addColor(_colorValue, i-ec);
            }
        }
    }
};

Phaser.Text.prototype.SetGradation = function(c1, c2){
    var grd = this.context.createLinearGradient(0, 0, 0, this.height);
    grd.addColorStop(0, c1);
    grd.addColorStop(1, c2);
    this.fill = grd;
};

//=============================================================================
// c#용 string.format부분 대체용.
//=============================================================================
var	string = function(){};
if (!string.Format) {
    string.Format = function(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

var tickNow;
var tickLast = Date.now();
var deltaTime = 0;
function updateTick()
{
    tickNow = Date.now();
    deltaTime = (tickNow - tickLast) * 0.001;
    tickLast = tickNow;
}
function leadingZeros(n, digits){
    var zero = '';
    n = n.toString();

    if (n.length < digits){
        for (var i = 0; i < digits - n.length; i++)
            zero += '0';
    }
    return zero + n;
}
var iMathFloor = 0;
function Mathfloor(n)
{
    iMathFloor = n|0;
    if(iMathFloor < 0)
        return Math.floor(n);

    return iMathFloor;
}
var findArrayIndex = function (array, predicateFunction) {
    var length = array == null ? 0 : array.length;
    if (!length) {
        return -1;
    }
    var index = -1;
    for (var i = 0; i < array.length; ++i) {
        if(predicateFunction(array[i])) {
            index = i;
            break;
        }
    }
    return index;
}
/*
function ADContent(x, y){
    this.aa = x;
    this.bb = y;

    ADContent.prototype.ShowLog = function()
    {
        console.log("==== aa : " + this.aa);
        console.log("==== bb : " + this.bb);
    }
}

var ta = new ADContent(1, 1);
var tb = new ADContent(2, 2);

ta.ShowLog();
tb.ShowLog();*/
MGButton = function (game) {
    this.game = game;
};
MGButton.prototype = {
    preload: function () {

    },
    create: function () {
    },
    createAtlas: function (x, y, text, atlasName, over, click, out, down, callOver, callOut, callDown) {
        if(out === undefined)
            out = over;

        if(down === undefined)
            down = over;

        var isOut = false;
        var button = this.game.add.button(x, y, atlasName, undefined, this.game, over, out, down);
        if(text !== undefined)
        {
            text.x = button.width/2;
            text.y = button.height/2;
            //text.anchor.set(0, 0);
            button.addChild(text);
        }

        button.baseScaleX = 1;
        button.baseScaleY = 1;
        button.scale.set(1);

        button.onInputOver.add(function(){
            button.alpha = 0.9;
            isOut = false;
            if(callOver !== undefined)callOver();
        }, this);
        button.onInputOut.add(function(){
            button.alpha = 1;
            isOut = true;
            if(callOut !== undefined)callOut();
        }, this);
        button.onInputDown.add(function(){
            button.alpha = 1;
            button.tint = 0xFDFCDAFF;
            if(callDown !== undefined)callDown();

        }, this);
        button.onInputUp.add(function(){
            button.alpha = 1;
            button.tint = 0xffffff;
            if(isOut === true) return;
            //var Xscale = button.scale.x;
            //var Yscale = button.scale.y;
            this.game.add.tween(button.scale).from( { x: button.baseScaleX*1.1, y: button.baseScaleY*1.1 }, 200, Phaser.Easing.Bounce.Out, true).onComplete.add(function () {
                button.scale.setTo(button.baseScaleX, button.baseScaleY);
                button.alpha = 1;
                if(click !== undefined)click();
            }, this);
        }, this);

        return button;
    },
    /*SetButtonScale: function (sx, sy) {
        button.baseScaleX = sx;
        button.baseScaleY = sy;
        button.scale.set(sx, sy);
    },*/
    // data : {top: 20, bottom:  20, left: 20, right: 20}
    createText: function (x, y, w, h, text ,atlasName,  frame, data, click,  callOver, callOut, callDown) {
        var isOut = false;
        var button;
        if(data === undefined)
        {
            button = this.game.add.button(x, y, atlasName, click, this.game, frame, frame, frame);
        }
        else
        {
            button = new PhaserNineSlice.NineSlice(
                this.game,                      //Phaser.Game
                x,                              //x
                y,                              //y
                atlasName,                       //atlas key //pack이름
                frame,      			         //Image frame //png이름,
                w,                           //width
                h,                           //height
                {top: data.top, bottom:  data.bottom, left: data.left, right: data.right}
            );
            button.anchor.setTo(0.5, 0.5);//ui9b.resize(100,200);//ui9b.scale.setTo(0.5,0.5);



            this.game.add.existing(button);
        }
        button.inputEnabled = true;
        //button.input.start(0, true);
        button.input.useHandCursor = true;
        //this.button.setFrames(frame, out, down, frame);

        if(text !== undefined)
        {
            //text.x = this.button.width/2;
            //text.y = this.button.height/2;
            text.anchor.set(0.5, 0.5);
            button.addChild(text);
        }
        button.events.onInputOver.add(function(){
            isOut = false;
            button.alpha = 0.9;
            //this.game.add.tween(this.button).to({tint: 0x757575}, 500, Phaser.Easing.Exponential.Out, true);
            if(callOver !== undefined) callOver();
        }, this);
        button.events.onInputOut.add(function(){
            isOut = true;
            button.alpha = 1;
            //this.game.add.tween(this.button).to({tint: 0xffffff}, 10, Phaser.Easing.Linear.None, true);
            //this.game.add.tween(this.button).to({tint: 0xffffff}, 500, Phaser.Easing.Exponential.Out, true);
            if(callOut !== undefined) callOut();
        }, this);
        button.events.onInputDown.add(function(){
            button.alpha = 1;
            button.tint = 0xFDFCDAFF;
            if(callDown !== undefined)callDown();
        }, this);
        button.events.onInputUp.add(function(){
            button.alpha = 1;
            button.tint = 0xffffff;
            if(isOut === true) return;
            this.game.add.tween(button.scale).from( { x: button.scale.x*1.1, y: button.scale.y*1.1 }, 200, Phaser.Easing.Bounce.Out, true).onComplete.add(function () {
                button.scale.setTo(button.scale.x, button.scale.y);
                button.alpha = 1;
                if(click !== undefined)click();
            }, this);


        }, this);
        return button;
    },
    over: function () {

    },
    out: function () {

    },
    down: function () {

    },
    up: function () {

    },
    update: function () {
    }
};
'use strict';
var console = { log: function() {}, warn: function(){} };

function MoviGame() {
    var args = Array.prototype.slice.call(arguments);// arguments을 배열로 바꾼다.
    var callback = args.pop();// 마지막 인자는 콜백 함수
    var modules = (args[0] && typeof args[0] === "string") ? args : args[0];// 모듈은 배열로 전달될 수도있고 개별 인자로 전달 될 수도 있습니다.
    // 함수가 생성자로 호출되도록 보장(new를 강제하지 않는 패턴)
    if (!(this instanceof MoviGame)) return new MoviGame(modules, callback);
    // "this객체에 모듈을 추가" : 모듈이 없거나 "*"(전부)이면 사용 가능한 모든 모듈을 사용한다는 의미입니다.
    if (!modules || modules === '*' || modules[0] === '*') {
        modules = [];
        for (var i in MoviGame.Modules) {
            if (MoviGame.modules.hasOwnProperty(i)) {
                modules.push(i);
            }
        }
    }
    // 필요한 모듈들을 초기화
    for (var i=0, m_length=modules.length; i<m_length; i+=1) {
        MoviGame.modules[modules[i]](this);
    }
    // 콜백 함수 호출
    callback(this);
    //==================================================================================
    // 여기서 부터 변수선언..
    //==================================================================================
    this.state = Enum.MOVI_STATE.PreLoader;
    // Phaser
    this.game = null;
    this.resourcesManager = null;
    this.networkManager = null;
    this.MGButton = null;
    this.version = Define.VERSION;
    this.storage = null;

    this._sound = null;
    this._bgm = null;

    this.firstPortrait = false;
    this.firstLandScape = false;

    this.callReSize = null;


    this.gameSheetsData = null;

    this.stage_num = 0; //터치시 입장할 스테이지
    this.heartAddTime = 300; //하트 획득 시간
    this.heartMax = 10; //하트 최대값
    this.heartFirstCnt = 10; // 하트 초기값
    this.heart = { x: this.heartFirstCnt }; // 하트값(힌트아이템 분리 고려해서 객체로 선언)
    //this.hintFirstCnt = 100; //힌트 초기 개수
    this.hint = this.heart; // 힌트값
    this.level = [0]; // 월드별 최대 클리어 스테이지
    this.moveData = [[0], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []]; //스테이지별 플레이 기록
    this.mCoin = 9999; //사용자 보유 코인값
    this.PenguinArray = []; //펭귄새끼 구조한 페이지 저장용
    this.JewelryCoolTime = []; //상점 쿨타임 저장

    this.oldWindowWidth = 0;
    this.oldWindowHeight = 0;
}

// 필요한 프로토타입 프로퍼티들을 추가
MoviGame.prototype = {
    name: "Penguin Rescue Party",//

    getName: function () {
        return this.name;
    },
    getServiceString: function () {
        return Define.SERVICE == Enum.SERVICE_CODE.MOVI_KR ? 'movi' :
            Define.SERVICE == Enum.SERVICE_CODE.YAHOO ? 'yahoo' :
                Define.SERVICE == Enum.SERVICE_CODE.NAVER ? 'naver' :
                    'none';
    },
    Initialize : function(game)
    {
        // 디바이스 구분.
        if (/Android/i.test(navigator.userAgent))
            Define.DEVICE = Enum.DEVICE_STATE.ANDROID;
        else if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
            Define.DEVICE = Enum.DEVICE_STATE.IOS;
        else
            Define.DEVICE = Enum.DEVICE_STATE.PC;

        // 접속경로 구분.
        if(document.location.href.indexOf('game.jp') > -1)
            Define.SERVICE = Enum.SERVICE_CODE.MOVI_JP;
        else if(document.location.href.indexOf('yahoo-net.jp') > -1)
            Define.SERVICE = Enum.SERVICE_CODE.YAHOO;
        else if(document.location.href.indexOf('naver.com') > -1)
            Define.SERVICE = Enum.SERVICE_CODE.NAVER;
        else
            Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR;

        this.game = game;
        // Prevent certain keys from propagating to the browser:
        var arrPreventedKeys = [
            Phaser.Keyboard.SPACEBAR,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT
        ];
        this.game.input.keyboard.addKeyCapture(arrPreventedKeys);

        this.resourcesManager = game.plugins.add(ResourcesManager);
        this.MGButton = game.plugins.add(MGButton);
        this.game.plugins.add(PhaserSpine.SpinePlugin);
        //this.networkManager = NetworkManager(this.getServiceString(), function() { });
        this.storage = game.plugins.add(StorageManager);

        /*this.moveData = this.storage.StorageData['moveData'];
        this.level = this.storage.StorageData['level'];
        this.heart = this.storage.StorageData['heart'];
        this.PenguinArray = this.storage.StorageData['PenguinArray'];
        this.JewelryCoolTime = this.storage.StorageData['JewelryCoolTime'];*/

        this.initScreenSize();
    },
    initScreenSize: function(){
        var that = this;
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        this.firstPortrait = Define.LANDSCAPE;
        this.firstLandScape = !Define.LANDSCAPE;

        if (this.game.device.desktop) {
            //데스크탑환경
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;    //축소확대 비율유지
            this.game.pageAlignHorizontally = false;//game.stage.scale.pageAlignHorizontally = true;
            this.game.pageAlignVertically = false;//game.stage.scale.pageAlignVertically = true;
            this.game.scale.parentIsWindow = true;//지우니간 폭만 맞고 길이가 길어지는 화면이 됨
        }
        else {
            var landscape = false;
            this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

            if(window.orientation !== undefined)
            {
                if(window.orientation === 0)
                {
                    landscape = false;
                }
                else
                    landscape = true;
            }
            else
            {
                if(Define.staticWidth < Define.staticHeight)
                {
                    landscape = false;
                }else
                {
                    landscape=  true;//this.game.scale.forceLandscape;
                }
            }


            var ratio_w = parseFloat(Define.staticWidth / this.game.width);
            var ratio_h = parseFloat(Define.staticHeight / this.game.height);


            if (landscape === true) {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "block" : "none";
                this.firstLandScape = true;
            }
            else {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "none" : "block";
                this.firstPortrait = true;
            }
            this.game.scale.setUserScale(ratio_w, ratio_h);
        }

        window.addEventListener("orientationchange", function() {
            that.reScreenSize();

        });
        this.game.scale.setResizeCallback(function(scale, parentBounds) {
            that.reScreenSize();
        });

    },
    callBackReSize : function (callback) {

        this.callReSize = function() {
            if(callback !== undefined)
                callback(this.isLandscape);
        };
        //callback = this.callReSize;
    },
    reScreenSize : function () {
        var landscape = false;

        var ratio_w = 1;
        var ratio_h = 1;

        if(this.oldWindowWidth == window.innerWidth && this.oldWindowHeight == window.innerHeight){
            return;
        }

        this.oldWindowWidth = window.innerWidth;
        this.oldWindowHeight = window.innerHeight;

        if(!this.game.device.desktop){// && !this.game.device.iOS) {
            //일반적인 안드로이드
            if(window.orientation !== undefined)
            {
                if(window.orientation === 0)
                {
                    landscape = false;
                }
                else
                    landscape = true;
            }
            else
            {
                if(window.innerWidth < window.innerHeight)
                {
                    landscape = false;
                }else
                {
                    landscape=  true;//this.game.scale.forceLandscape;
                }
            }
            var ratio_w = parseFloat(Define.staticWidth / this.game.width);
            var ratio_h = parseFloat(Define.staticHeight / this.game.height);

            if(window.innerWidth < window.innerHeight)
            {
                landscape = false;
            }else
            {
                landscape=  true;//this.game.scale.forceLandscape;
            }



            if (landscape === false) {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "none" : "block";
                if(this.firstPortrait === false)
                {
                    location.reload();
                }
                if(Define.LANDSCAPE === true)
                    this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height));
                else
                    this.game.scale.setUserScale(ratio_w, ratio_h);
            }
            else {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "block" : "none";
                if(this.firstLandScape === false)
                {
                    location.reload();
                }
                if(Define.LANDSCAPE === false)
                    this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height));
                else
                    this.game.scale.setUserScale(ratio_w, ratio_h);

            }
        }
        this.game.scale.refresh();
        if(this.callReSize !== null)
            this.callReSize(landscape);
    },
};

MoviGame.modules = {
    utils : function (box) {
        box.Init = function() {
            console.log("  utils  ==");
        };
        box.GetSecondsToTimeString = function(s) {
            var min = Math.floor(s/60);
            var sec = Math.floor(s%60);
            var strMin = (min >= 10) ? min.toString():"0"+min;
            var strSec = (sec >= 10) ? sec.toString():"0"+sec;
            return (strMin+':' +strSec);
        };
        box.AddSprite = function(parent, x, y, atlas, imgName, color, alpha, ax, ay, width, height) {
            var spr;
            if(atlas != undefined)
                spr = this.game.add.sprite(x, y, atlas, imgName);
            else
                spr = this.game.add.sprite(x, y, imgName);
            if(color != undefined) spr.tint = color;
            if(alpha != undefined) spr.alpha = alpha;
            if(ax == undefined)  spr.anchor.x = 0.5;
            else     spr.anchor.x = ax;
            if(ay == undefined)  spr.anchor.y = 0.5;
            else     spr.anchor.y = ay;
            if(width != undefined) spr.width = width;
            if(height != undefined) spr.height = height;
            parent.addChild(spr);
            return spr;
        };
        box.AddSpriteNine = function(parent, x, y, atlas, imgName, w, h, style, ax, ay, color){
            var spr = new PhaserNineSlice.NineSlice(MG.game, x, y, atlas, imgName, w, h, style);
            if(ax == undefined) spr.anchor.x = 0.5;
            else				spr.anchor.x = ax;
            if(ay == undefined) spr.anchor.y = 0.5;
            else				spr.anchor.y = ay;
            if(color != undefined) spr.tint = color;
            parent.addChild(spr);
            return spr;
        };
        box.AddText = function(parent, x, y, txt, fontStyle, ax, ay) {
            var txt = MG.game.add.text(x, y, txt, fontStyle);
            if(ax == undefined) txt.anchor.x = 0.5;
            else 				txt.anchor.x = ax;
            if(ay == undefined)	txt.anchor.y = 0.5;
            else 				txt.anchor.y = ay;
            parent.addChild(txt);
            return txt;
        };
        box.textNumberCounting = function(text, cur_number, add_number, aniTime){
            var nFrameTime = 10;
            var nAdd = 0;
            var isEnd = false;
            var nFrame = parseInt(aniTime/nFra0meTime);
            var totalNum = cur_number + add_number;
            var increase_time;
            text.setText(MG.GetSecondsToTimeString(cur_number));

            increase_time = this.game.time.events.loop(10, function(){
                nAdd += (add_number / nFrame);

                if(nAdd+cur_number < totalNum)
                {
                    text.setText((cur_number +nAdd).toLocaleString());
                }
                else {
                    text.setText(totalNum.toLocaleString());
                    this.game.time.events.remove(increase_time);
                }

            }, this);
        };
        box.googleSheetsToData = function(sheetData)
        {

            var dicData = sheetData.substring(6); // json: ==> 제거
            console.log(dicData);
            //JSON.stringify(dicData);
            return JSON.parse(dicData);

        }
        box.loadGameSheetsData = function(sheet,google, callback)
        {
            var that = this;
            //this.gameSheetsData = [];

            if(google === false)
            {
                that.gameSheetsData = that.googleSheetsToData(Define.SHEET_LOCAL_STRING);
                if(callback !== undefined)
                {
                    callback(response);
                }
                return;
            }

            var url = "https://spreadsheets.google.com/feeds/list/" +
                Define.GOOGLE_SPREADSHEET_ID + "/" +sheet+
                "/public/basic?alt=json";
            jQuery(function($){
                $.ajax({
                    type: "GET",
                    url: url,
                    dataType:"jsonp"
                }).done(function ( response ) {


                    var jsonString = JSON.stringify(response);
                    var tbString = JSON.parse(jsonString);
                    var strSheet = tbString.feed.entry[0].content.$t;

                    that.gameSheetsData = that.googleSheetsToData(strSheet);
                    if(callback !== undefined)
                    {
                        callback(response);
                    }
                    console.log(that.gameSheetsData);
                }).fail(function () {
                    that.gameSheetsData = that.googleSheetsToData(Define.SHEET_LOCAL_STRING);
                    if(callback !== undefined)
                    {
                        callback(response);
                    }
                });
            });
        };
    },
    audio: function (box) {
        this.isSfx = false;
        this.isBGM = false;

        box.Init = function() {

        };
        box.AudioInit = function() {

            //--크롬예외처리(안드로이드 사운드 예외처리)------------------
            if (this.game.device.android
                && this.game.device.chrome
                && this.game.device.chromeVersion >= 55) {

                this.game.sound.setTouchLock();

                this.game.input.touch.addTouchLockCallback(function () {
                    if (this.noAudio                  //크롬 안드로이드 모드--> false로 들어옴
                        //|| !this.touchLocked        //크롬 안드로이드 모드---> false로 들어옴
                        || this._unlockSource !== null   //크롬 안드로이드 모드---> null로 들어옴
                    ) {
                        return true;
                    }
                    if (this.usingWebAudio) {
                        // Create empty buffer and play it
                        // The SoundManager.update loop captures the state of it and then resets touchLocked to false

                        var buffer = this.context.createBuffer(1, 1, 22050);
                        this._unlockSource = this.context.createBufferSource();
                        this._unlockSource.buffer = buffer;
                        this._unlockSource.connect(this.context.destination);

                        if (this._unlockSource.start === undefined) {
                            this._unlockSource.noteOn(0);
                        }
                        else {
                            this._unlockSource.start(0);
                        }
                        //Hello Chrome 55!
                        if (this._unlockSource.context.state === 'suspended') {
                            this._unlockSource.context.resume();
                        }
                    }

                    //  We can remove the event because we've done what we needed (started the unlock sound playing)
                    return true;

                }, this.game.sound, true);

            }
            //--크롬예외처리(안드로이드 사운드 예외처리)------------------

            this.isSfx = this.storage.StorageData['isSfx'];
            this.isBGM = this.storage.StorageData['isBGM'];

            if(this.isSfx === undefined)this.isSfx = true;
            if(this.isBGM === undefined)this.isBGM = true;

            //
            this._sound = [];
            this._bgm = [];

            var audioList = ResourcesManager.Preloader['audio'];
            audioList.forEach(function(args) {
                if(args[2] === 'bgm')
                {
                    this._bgm[args[0]] = this.game.add.audio(args[0],1,true);
                }
                else
                {
                    this._sound[args[0]] = this.game.add.audio(args[0]);
                }


            }, this);

        };

        box.AudioSwitch = function(on) {
            this.isSfx = !on;
            this.isBGM = !on;

            this.storage.set('isSfx', this.isSfx );
            this.storage.set('isBGM', this.isBGM );

        };


        box.PlayAudio = function(sound) {
            if(this.isSfx)
            {
                if(this._sound && this._sound[sound]) {
                    this._sound[sound].play();
                }
            }
        };
        box.StopAudio  = function(sound) {
            this._sound[sound].stop();
        };
        box.PlayBgm  = function(bgm, loop) {
            if(this.isBGM)
            {
                if(this._bgm && this._bgm[bgm]) {
                    if(loop === undefined)
                        loop = false;
                    // play: function (marker, position, volume, loop, forceRestart)
                    this._bgm[bgm].play('',0,1,loop);
                }
            }
        };
        box.StopBgm  = function(bgm) {
            this._bgm[bgm].stop();
        };
    }
};
window[''] = window[''] || {};
window[''].MoviGame = MoviGame;



'use strict';
// utils, sound
var MG = MoviGame('utils','audio', function() { });

var first_save_data = false;

function Data(){
    this.nVer = 0;
    this.isBGM = true;
    this.isSfx = true;
    this.moveData = [[0], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    this.level = [0];
    this.heart = { x: MG.heartFirstCnt };
    this.PenguinArray = [];
    this.JewelryCoolTime = [];
}

var uData = new Data();     // 기본 게임 데이터

function Boot() {}

Boot.prototype = {

    preload: function () {

        MG.Initialize(this.game);
        MG.resourcesManager.loader(ResourcesManager.MoviLoad);
    },

    create: function () {
        var that = this;
        console.log(" ============================= ");
        console.log(" Name  :"+MG.getName());
        console.log(" GIDX :  "+Define.GIDX );
        console.log(" service : "+ Define.SERVICE+" ( 0:movi, 1:yahoo, 2:naver ) ");
        console.log(" service : "+  MG.getServiceString());
        console.log(" ============================= ");
        this.stage.backgroundColor = $("body").css("background-color");
        this.game.time.events.add(100, function () {
            that.game.state.start('preloader');
        });
        /*networkManager.GetGameInfo(function (_data) {
            if(_data != undefined) {
                //uData.iHeartChargeMax = _data['baseHeart'];
                //uData.iHeartInitData = _data['initHeart'];
                //uData.fHeartChargeTime = _data['Heartrefill'];
                //uData.iCoinInitData = _data['money_base'];
            }
            // if(loginTF == 0)
            //     LoadDataInClient();

            // if(bPhone == true) {
            // kData.bSoundBGM = false;
            // kData.bSoundSE = false;
            // }
            // update();
        });*/

        if(loginTF == 0) {
            StorageManager.prototype.SetStorageData();
        } else {
            networkManager.LoadData();
        }
    }
};

window[''] = window[''] || {};
window[''].Boot = Boot;

//var map = [
//    "[{\"p\":12,\"a\":0,\"l\":2},{\"p\":2,\"a\":1,\"l\":3}]",
//];
//
//var ppp = JSON.parse(map[0]);
//console.log("==== : " + ppp.length);






'use strict';
function Preloader() {
    this.ready = false;
    this.loadingText = null;
    this.sprLoad = null;
}

Preloader.prototype = {

    preload: function () {
        this.grpLoad = this.game.add.group();

        this.grpLoad.x = this.game.width/2;
        this.grpLoad.y = this.game.height/2-120;


        //MG.networkManager.refresh();


        this.stage.backgroundColor = '#FFFFFF';

        this.sprLoad = [];

        /*this.sprLoad[0] = this.add.sprite(0, 0, 'preloaderLogoMono');
        this.sprLoad[0].anchor.setTo(0.5, 0.5);

        this.sprLoad[1] = this.add.sprite(-117, 0, 'preloaderLogoColor'); //마스크적용-위치
        this.sprLoad[1].anchor.setTo(0, 0.5);                                      //마스크적용-피봇
        this.load.setPreloadSprite(this.sprLoad[1]);

        this.sprLoad[2] = this.add.sprite(0, 170, 'preloaderLogoText');
        this.sprLoad[2].anchor.setTo(0.5, 0.5);*/

        this.loading_banner = this.add.sprite(0, this.game.height - this.grpLoad.y, 'loading_banner');
        this.loading_banner.anchor.setTo(0.5, 1);

        /*this.loadingText = this.add.text(0, 250, "99%", { font: "23px Arial", fill: "#2E85ED", align: "center" });
        this.loadingText.anchor.setTo(0.5, 0.5);

        this.load.onLoadStart.add(this.onLoadStart, this);                       //game.load도 동일
        this.load.onFileComplete.add(this.onFileComplete, this);*/
        this.load.onLoadComplete.add(this.onLoadComplete, this);


        /*this.grpLoad.addChild(this.sprLoad[0]);
        this.grpLoad.addChild(this.sprLoad[1]);
        this.grpLoad.addChild(this.sprLoad[2]);*/
        this.grpLoad.addChild(this.loading_banner);
        //this.grpLoad.addChild(this.loadingText);

        MG.stateThis = this;
        // 이미지 로드
        MG.resourcesManager.loader(ResourcesManager.Preloader);

        this.zhuye002  = this.add.sprite(0, 0, 'zhuye002', null, this.grpLoad);

        this.zhuye002.anchor.set(.5),
            this.zhuye002.scale.set(.1),
            this.zhuye002.rotation = 20,
            this.tween ? this.tween.kill() : this.tween = new TimelineLite,
            this.tween.to(this.zhuye002, 1, {
                rotation: 0, ease: Sine.easeOut
            }),
            this.tween.call(this.showLocoText.bind(this)),
            TweenMax.to(this.zhuye002.scale, 1, {x: 0.5, y: 0.5});
    },

    showLocoText: function () {
        TweenMax.to(this.zhuye002, 0.2, {
            x: 50, ease: Sine.easeIn
        });

        this.loading02  = this.add.sprite(-70, -30, 'loading02', null, this.grpLoad);
        this.loading02.anchor.set(.5);
        this.loading02.scale.set(.2);
        //this.loading02.alpha = 0;
        /*TweenMax.to(this.loading02, 1, {
            alpha: 1, ease: Sine.easeOut
        });*/

        TweenMax.to(this.loading02.scale, 0.3, {x: 0.6, y: 0.6, ease: Sine.easeOut, onComplete:(function () {
                TweenMax.to(this.loading02.scale, 0.2, {x: 0.5, y: 0.5, onComplete:(function () {

                    }).bind(this)});
            }).bind(this)});
    },

    onLoadStart: function() {
        this.loadingText.setText("0%");
        //console.log("loading_start ");
    },
    onFileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        this.loadingText.setText(progress + "%");
    },

    onLoadComplete: function () {
        var that = this;
        this.ready = true;
        // 리소스 로드 완료후 오디오 셋팅
        MG.AudioInit();

        /*MG.loadGameSheetsData(1, Define.GOOGLE_SHEETS_DATA, function(rep){
            that.game.time.events.add(300, function () {
                MG.moveData = uData.moveData;
                MG.level = uData.level;
                MG.heart = uData.heart;
                MG.PenguinArray = uData.PenguinArray;
                MG.JewelryCoolTime = uData.JewelryCoolTime;

                console.log('PlayTime = '+MG.gameSheetsData["PlayTime"]);
                console.log('FeverTime = '+MG.gameSheetsData["FeverTime"]);
                console.log('NoteCreate[0] '+ MG.gameSheetsData['NoteCreate'][0]);
                console.log('NoteCreate[0] '+ MG.gameSheetsData['NoteCreate'][0]);
                console.log('MG.gameSheetsData[InSul][0].Max  '+ MG.gameSheetsData['InSul'][0].Max);

                //that.nInSulCount = MG.gameSheetsData['InSul'][that.nInSulGrade].Max;

                that.game.state.start('title');
                that.destroy();
            });
        });*/
        MG.moveData = uData.moveData;
        MG.level = uData.level;
        MG.heart = uData.heart;
        MG.PenguinArray = uData.PenguinArray;
        MG.JewelryCoolTime = uData.JewelryCoolTime;

        if (this.tween) this.tween.kill();
        this.zhuye002.destroy(true, true);
        if (this.loading02) this.loading02.destroy(true, true);

        this.game.state.start('title');
        this.destroy();
        //모든 스프라이트 생성
        //모든 스프라이트 생성
    },

    create: function () {
        //this.sprLoad[1].cropEnabled = false;
    },


    update: function () {
        //this.loadingText.setText("100%");
        if (this.ready) {
            // console.log('Ready ===  ');
            // this.game.state.start('game');
        }
    },
    destroy :function () {
        console.log("  >>>>  destroy  <<<<");
        /*this.sprLoad.forEach(function (t) {
            t.destroy();
        });

        this.loadingText.destroy();*/
    }
};




window[''] = window[''] || {};
window[''].Preloader = Preloader;



'use strict';

function Title() {
    this.grpPopup = null;
}

Title.prototype = {
    preload: function () {
        this.grpDaruma = [];
    },
    create: function () {
        this.gTitle = this.game.add.group();
        if(!this.game.device.desktop) MG.PlayBgm('BGM_Title', true);
        MG.AudioSwitch(this.game.device.desktop);
        var title = this.game.add.spine(this.game.world.centerX, this.game.world.centerY, 'title');
        this.gTitle.addChild(title);
        var muteON = MG.MGButton.createAtlas(0, 0, undefined, "atlas-1", MG.isSfx === true?"btn_sound_on_title.png":"btn_sound_off_title.png"
            ,function(){
                MG.AudioSwitch(MG.isSfx);
                switch(MG.isSfx === true)
                {
                    case true:
                        muteON.loadTexture("atlas-1", "btn_sound_on_title.png");
                        break;
                    case false:
                        muteON.loadTexture("atlas-1", "btn_sound_off_title.png");
                        break;
                }
                if(MG.isBGM === true)
                    MG.PlayBgm('BGM_Title', true);
                else
                    MG.StopBgm('BGM_Title');
            }.bind(this)
        ); //붙여질 그림
        muteON.anchor.setTo(0.5);
        title.children[title.skeleton.findSlotIndex("btn_sound")].addChild(muteON); //타겟노드에 그림 붙이기
        //var grade = MG.AddSprite(this.gTitle, 0, 0, "atlas-1", "grade.png"); //붙여질 그림
        //title.children[title.skeleton.findSlotIndex("grade")].addChild(grade); //타겟노드에 그림 붙이기
        title.setAnimationByName(0, "in", false);
        title.addAnimationByName(0, "idle", true);
        var bar = MG.AddSprite(this.gTitle, this.game.world.centerX, this.game.world.centerY+370, "atlas-0", "hollow.png", undefined, undefined, 0.5, 0.5, 360, 160);
        /*var bar_text = this.game.add.text(this.game.world.centerX, this.game.world.centerY+40, GetString("start"), { font: "48px Arial", fill: "#000" });
        bar_text.anchor.set(0.5, 0.5);
        bar.addChild(bar_text);*/
        bar.inputEnabled = true;
        bar.events.onInputUp.add(function(){
            this.gTitle.remove();
            this.game.state.start('game');
        }, this);
        /*MG.AddText(this.gTitle, this.game.world.centerX, this.game.world.centerY+620, "Copyright Ⓒ 2018 GAME Co.,Ltd All rights reserved",
            { font: "bold 17px Arial", fill:"#000000", wordWrap:true, wordWrapWidth:720, align: "center" });*/
    },
    update: function () {
        
    }
};

window[''] = window[''] || {};
window[''].Title = Title;






function ShopContent() {
    MG.gHeartshop = MG.game.add.group();
    MG.gHeartcharge = MG.game.add.group();
    MG.gHeartshop.visible = false;
    MG.gHeartcharge.visible = false;
    MG.gHeartshop.x = MG.game.world.centerX;
    MG.gHeartshop.y = MG.game.world.centerY;
    MG.gHeartcharge.x = MG.game.world.centerX;
    MG.gHeartcharge.y = MG.game.world.centerY;

    var backAlpha = MG.AddSprite(MG.gHeartshop, 0, 0, "atlas-0", "white.png", undefined, 0.83, 0.5, 0.5, 720, 1280);
    backAlpha.tint = 0x000000;
    backAlpha.inputEnabled = true;
    var backAlpha2 = MG.AddSprite(MG.gHeartcharge, 0, 0, "atlas-0", "white.png", undefined, 0.83, 0.5, 0.5, 720, 1280);
    backAlpha2.tint = 0x000000;
    backAlpha2.inputEnabled = true;

    var popupBG = MG.AddSprite(MG.gHeartshop, 0, 0, "atlas-0", "popup_shop.png");
    var title = MG.AddSprite(MG.gHeartshop, 0, -400, "atlas-1", "title.png"); //팝업 명칭 들어갈 얼음조각
    var title_1 = MG.AddSprite(MG.gHeartshop, 0, -480, "atlas-0", "title_1.png"); //얼음조각 위에 올릴 눈더미
    var startMove = MG.game.add.bitmapText(0, -55, "title", "HEART SHOP", 80); //팝업 명칭 비트맵폰트 선언
    startMove.anchor.setTo(0.5);
    title.addChild(startMove);
    /*var movicoin = MG.AddSpriteNine(MG.gHeartshop, 0, -320, 'panel_shop', '', 304, 78, {top: 0, bottom: 0, left: 45, right: 45});
    var mcoin1 = MG.AddSprite(MG.gHeartshop, -135, -320, undefined, "mcoin1");
    var mcoinCnt = MG.game.add.bitmapText(0, -335, "font", "0", 60);
    mcoinCnt.anchor.setTo(0.5);
    MG.gHeartshop.addChild(mcoinCnt);
    mcoinCnt.text = MG.mCoin.toLocaleString();
    var coin_plus = MG.MGButton.createAtlas(135, -320, undefined, "btn_plus_shop", undefined
        ,function(){
            MG.PlayAudio('SE_Click');
            console.log("log1=======");
        }.bind(this)
    );
    coin_plus.anchor.set(0.5, 0.5);
    MG.gHeartshop.addChild(coin_plus);*/
    // 충전 확인 팝업
    var ChargeBG = MG.AddSprite(MG.gHeartcharge, 0, 0, "atlas-1", "popup_message.png"); //배경 스프라이트
    ChargeBG.inputEnabled = true;
    var Chargetitle = MG.AddSprite(ChargeBG, 0, -240, "atlas-1", "title.png"); //팝업 명칭 들어갈 얼음조각
    var Chargetitle_1 = MG.AddSprite(ChargeBG, 0, -320, "atlas-0", "title_1.png"); //얼음조각 위에 올릴 눈더미
    var ChargestartMove = MG.game.add.bitmapText(0, -55, "title", "", 80); //팝업 명칭 비트맵폰트 선언
    ChargestartMove.anchor.setTo(0.5);
    Chargetitle.addChild(ChargestartMove);
    MG.AddSpriteNine(ChargeBG, 0, -90, "atlas-1", "list_1.png", 360, 143, {top: 35, bottom: 35, left: 35, right: 35}); //보석 배경 스프라이트
    var ChargeJewel = MG.AddSprite(ChargeBG, 0, -90, "atlas-1", "shop_jewel_1.png");
    var ChargeJewelNum = MG.game.add.bitmapText(50, -150, "shop", "0", 60);
    ChargeBG.addChild(ChargeJewelNum);
    var ChargeText = MG.AddText(ChargeBG, 0, 30, "",
        { font: "32px Arial", fontWeight:'bold', stroke: "#1b6bb7", strokeThickness: 5, fill: "#FFFFFF", align: "center" });
    var btn_ready_blue = MG.MGButton.createAtlas(0, 145, undefined, "atlas-0", "btn_ready_blue.png"
        ,function(){
            MG.PlayAudio('SE_Click');
            MG.PlayAudio('SE_PopupOff');
            MG.gHeartcharge.visible = false;
        }.bind(this)
    );
    btn_ready_blue.anchor.set(0.5, 0.5);
    ChargeBG.addChild(btn_ready_blue);
    var blue_OK = MG.game.add.bitmapText(0, -10, "title", "OK", 60);
    blue_OK.anchor.setTo(0.5);
    btn_ready_blue.addChild(blue_OK);
    // mCoin 충전 팝업

    // Close 버튼
    var btn_close = MG.MGButton.createAtlas(0, 380, undefined, "atlas-1", "btn_shop_green.png"
        ,function(){
            MG.PlayAudio('SE_Click');
            MG.PlayAudio('SE_PopupOff');
            MG.gHeartshop.visible = false;
            /*Game.ClosePopup(MG.gHeartshop, function () {
            }.bind(this));*/
        }.bind(this)
    );
    btn_close.anchor.set(0.5, 0.5);
    MG.gHeartshop.addChild(btn_close);
    var btn_close_OK = MG.game.add.bitmapText(0, -20, "title", "OK", 80);
    btn_close_OK.anchor.setTo(0.5);
    btn_close.addChild(btn_close_OK);

    //nIndex: 아이템 순서
    //jewel: 획득 보석 개수
    //priceType: 지불할 재화 타입
    //money: 지불할 재화양
    //bonus: 보너스 여부

    ShopContent.Init = function(nIndex, jewel, priceType, money, bonus)
    {
        //항목별 설정
        var jewel_back1 = MG.AddSpriteNine(MG.gHeartshop, 0, (140*nIndex)-180, "atlas-1", "list_1.png", 564, 143, {top: 35, bottom: 35, left: 35, right: 35});
        var jewel_back2 = MG.AddSpriteNine(MG.gHeartshop, 0, (140*nIndex)-180, "atlas-1", "list_2.png", 564, 143, {top: 35, bottom: 35, left: 35, right: 35});
        var jewel_num = MG.game.add.bitmapText(0, (140*nIndex)-200, "shop", "X"+jewel, 80);
        jewel_num.anchor.setTo(0.5);
        MG.gHeartshop.addChild(jewel_num);
        var jewel_button = MG.MGButton.createAtlas(150, 20, undefined, "atlas-0", "btn_shop_blue.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                switch (priceType)
                {
                    case "Movi":
                        if(MG.mCoin > money) {
                            MG.mCoin -= money;
                            MG.storage.set('mCoin', MG.mCoin );
                        } else {}
                        break;
                    case "Cash":
                        break;
                    case "Banner":
                        MG.JewelryCoolTime[nIndex] = Date.now() + 600000;
                        MG.storage.set('JewelryCoolTime', MG.JewelryCoolTime );
                        break;
                    case "Movie":
                        MG.JewelryCoolTime[nIndex] = Date.now() + 600000;
                        MG.storage.set('JewelryCoolTime', MG.JewelryCoolTime );
                        break;
                }
                MG.heart.x += jewel;
                MG.storage.set('heart', MG.heart );
                MG.PlayAudio('SE_PopupOn');
                switch (jewelType.key)
                {
                    case "shop_jewel_1.png":
                        ChargeJewel.loadTexture("atlas-1", "shop_jewel_1.png");
                        break;
                    case "shop_jewel_1.png":
                        ChargeJewel.loadTexture("atlas-0", "shop_jewel_2.png");
                        break;
                    case "shop_jewel_3.png":
                        ChargeJewel.loadTexture("atlas-0", "shop_jewel_3.png");
                        break;
                }
                //mcoinCnt.text = MG.mCoin.toLocaleString();
                ChargeJewelNum.text = "X"+jewel;
                ChargeText.setText("heart" + jewel + "Dog is charged.");
                MG.gHeartcharge.visible = true;
            }.bind(this)
        );
        jewel_button.anchor.set(0.5, 0.5);
        jewel_num.addChild(jewel_button);
        var AdCnt = MG.game.add.bitmapText(0, -20, "font", "", 80);
        AdCnt.anchor.setTo(0.5);
        jewel_button.addChild(AdCnt);
        AdCnt.visible = false;
        if(priceType == "Banner" || priceType == "Movie") {
            MG.game.time.events.loop(Phaser.Timer.SECOND, function() {
                if(0 < MG.JewelryCoolTime[nIndex]-Date.now()) {
                    jewel_cnt.visible = false;
                    AdCnt.visible = true;
                    jewel_button.inputEnabled = false;
                    jewel_button.loadTexture("atlas-1", "btn_shop_blue_disable.png");
                    AdCnt.text = leadingZeros(Math.floor(((MG.JewelryCoolTime[nIndex]-Date.now())/1000) / 60), 2) + ":" + leadingZeros(Math.floor(((MG.JewelryCoolTime[nIndex]-Date.now())/1000) % 60), 2);
                }else{
                    jewel_cnt.visible = true;
                    AdCnt.visible = false;
                    jewel_button.inputEnabled = true;
                    jewel_button.loadTexture("atlas-0", "btn_shop_blue.png");
                }
            }, MG);
        }

        switch (jewel)
        {
            case 5:
                var jewelType = MG.AddSprite(jewel_num, -150, 20, "atlas-1", "shop_jewel_1.png");
                break;
            case 10:
                var jewelType = MG.AddSprite(jewel_num, -150, 20, "atlas-0", "shop_jewel_2.png");
                break;
            case 25:
                var jewelType = MG.AddSprite(jewel_num, -150, 20, "atlas-0", "shop_jewel_3.png");
                break;
        }
        switch (priceType)
        {
            case "Movi":
                jewel_back2.visible = false;
                MG.AddText(jewelType, -50, -30, "Members Only",
                    { font: "24px Arial", fontWeight:'bold', stroke: "#000000", strokeThickness: 5, fill: "#FFFFFF", align: "center" });
                MG.AddSprite(jewel_button, -50, 0, "atlas-0", "mcoin2.png");
                var jewel_cnt = MG.game.add.bitmapText(30, -20, "world", money, 70);
                jewel_cnt.anchor.setTo(0.5);
                jewel_button.addChild(jewel_cnt);
                break;
            case "Cash":
                jewel_back2.visible = false;
                MG.AddSprite(jewel_button, -50, 0, "atlas-0", "mcoin2.png");
                var jewel_cnt = MG.game.add.bitmapText(30, -20, "world", money, 70);
                jewel_cnt.anchor.setTo(0.5);
                jewel_button.addChild(jewel_cnt);
                break;
            case "Banner":
                jewel_back1.visible = false;
                var jewel_cnt = MG.game.add.bitmapText(0, -20, "world", "AD", 70);
                jewel_cnt.anchor.setTo(0.5);
                jewel_button.addChild(jewel_cnt);
                break;
            case "Movie":
                jewel_back1.visible = false;
                var jewel_cnt = MG.AddSprite(jewel_button, 0, 0, "atlas-0", "movie.png");
                break;
        }

        function jewelryCounter() {
        }
    }
}

var queue = function(){
    this.datas = [];
};
queue.prototype.isEmpty = function(){
    //console.log("===1"+", "+log_deltatime());
    return this.datas.length==0?true:false;
};
queue.prototype.Count = function(){
    //console.log("===2"+", "+log_deltatime());
    return this.datas.length;
};
queue.prototype.Enqueue = function(element){
    //console.log("===3"+", "+log_deltatime());
    this.datas.push(element);
};
queue.prototype.Dequeue = function(){
    //console.log("===4"+", "+log_deltatime());
    element = this.peek();
    this.datas.shift();
    return element;
};
queue.prototype.peek = function(){
    //console.log("===5"+", "+log_deltatime());
    element = this.datas[0]==undefined?null:this.datas[0];
    return element;
};
queue.prototype.toArray = function(){
    //console.log("===6"+", "+log_deltatime());
    return this.datas;
};
queue.prototype.delAll = function(){
    //console.log("===7"+", "+log_deltatime());
    this.datas = [];
};

park = function(source, _width, _height) {
    //console.log("===8"+", "+log_deltatime());
    this.MAX_CAR_NUM = 30;
    this.width;
    this.height;
    this.count;
    this.Prepark = null;
    this.car;
    this.move;
    this.pos = []; //index of the object's head
    this.alignment = []; //0 for hor, 1 for ver
    this.length = [];
    this.occupancy = [];
    for(var i=0;i<36;++i)
        this.occupancy[i] = 0;

    if(source == undefined && _width == undefined && _height == undefined)
    {
        //this.pos = [];
        //this.alignment = [];
        //this.length = [];
        //this.occupancy = [];
        this.width = 6;
        this.height = 6;
        this.count = 0;
    }
    else if(source == undefined && _width != undefined && _height != undefined)
    {
        //this.pos = [];
        //this.alignment = [];
        //this.length = [];
        //this.occupancy = [];
        this.width = _width;
        this.height = _height;
        this.count = 0;
    }
    else if(source != undefined && _width == undefined && _height == undefined)
    {
        var strss = source.split(':');
        var str1 = strss[0];
        var str2 = strss[1];
        var str1_1 = str1.split('x')[0].replace('{', '0');
        var str1_2 = str1.split('x')[1];
        this.width = parseInt(str1_1, 10);
        this.height = parseInt(str1_2, 10);
        str2 = str2.slice(0, str2.length - 1);
        var str2_s = str2.split(',');
        this.count = str2_s.length;
        //this.pos = [];
        //this.alignment = [];
        //this.length = [];
        //this.occupancy = [];
        for(var i = 0; i < str2_s.length; i++)
        {
            var item = str2_s[i].split('-');
            this.pos[i] = parseInt(item[0], 10);
            this.alignment[i] = parseInt(item[1], 10);
            this.length[i] = parseInt(item[2], 10);
            var current_pos = this.pos[i];
            for (var k = 0; k < this.length[i]; k++)
            {
                this.occupancy[current_pos] = i + 1;
                if (this.alignment[i] == 1)
                    current_pos += this.width;
                else
                    current_pos++;
            }
        }
    }
};
park.prototype = {
    Clone: function() {
        //console.log("===9"+", "+log_deltatime());
        var clone = new park();
        clone.width = this.width;
        clone.height = this.height;
        clone.count = this.count;
        clone.occupancy = [];
        for (var i = 0; i < this.count; i++)
        {
            clone.pos[i] = this.pos[i];
            clone.alignment[i] = this.alignment[i];
            clone.length[i] = this.length[i];
        }

        for (var i = 0; i < this.width * this.height; i++)
        {
            clone.occupancy[i] = this.occupancy[i];
        }
        return clone;
    },
    isGoal: function() {
        //console.log("===10"+", "+log_deltatime());
        if (this.pos[0] == (this.width * 3 - 2))
            return true;
        else
            return false;
    },
    clean: function() {
        //console.log("===11"+", "+log_deltatime());
        this.count = 0;
        for (var i = 0; i < this.pos.length; i++)
        {
            this.pos[i] = this.alignment[i] = this.length[i] = 0;
        }
        for (var i = 0; i < this.occupancy.length; i++)
        {
            this.occupancy[i] = 0;
        }
    },
    delete: function(idx) {
        //console.log("===12"+", "+log_deltatime());
        if (this.count > idx && this.count > 1 && idx > 0)
        {
            for (var i = idx; i < this.count - 1; i++)
            {
                this.pos[i] = this.pos[i + 1];
                this.alignment[i] = this.alignment[i + 1];
                this.length[i] = this.length[i + 1];
            }
            this.count--;
            this.pos[this.count] = 0;
            this.alignment[this.count] = 0;
            this.length[this.count] = 0;
            for (var i = 0; i < this.occupancy.length; i++)
            {
                this.occupancy[i] = 0;
            }
            for (var i = 0; i < this.count; i++)
            {
                var current_pos = this.pos[i];
                for (var k = 0; k < this.length[i]; k++)
                {
                    this.occupancy[current_pos] = i + 1;
                    if (this.alignment[i] == 1)
                        current_pos += this.width;
                    else
                        current_pos++;
                }
            }
        }
        else
        {
            if (idx == 0)
            {
                //MessageBox.Show("첫번째 블럭은 지울수 없습니다.  Error"+", "+log_deltatime());
                return;
            }
        }
    },
    add: function(_pos, _alignment, _length) {
        //console.log("===13"+", "+log_deltatime());
        var i = this.count;
        this.pos[i] = _pos;
        this.alignment[i] = _alignment;
        this.length[i] = _length;
        var current_pos = this.pos[i];
        for (var k = 0; k < this.length[i]; k++)
        {
            this.occupancy[current_pos] = i + 1;
            if (this.alignment[i] == 1)
                current_pos += this.width;
            else
                current_pos++;
        }
        this.count++;
    },
    ToString: function() {
        var res = "{" + this.width.toString() + "x" + this.height.toString() + ":";
        for (var i = 0; i < this.count; i++)
        {
            res += this.pos[i].toString() + "-" + this.alignment[i].toString() + "-" + this.length[i].toString();
            if (i < this.count - 1) res += ",";
        }
        res += "}";
        return res;
    },
    GetHashCode: function() {
        //console.log("===14"+", "+log_deltatime());
        var hash = 0;
        for (var i = 0; i < this.count; i++)
        {
            hash *= 6;
            if (this.alignment[i] == 0)
            {
                hash += (this.pos[i] % this.width);
            }
            else
            {
                hash += Math.floor(this.pos[i] / this.width);
            }
        }
        return hash;
    }
};

/*var tpark = new park();
//console.log("===== : " + tpark.ToString());*/


var movesList = function() {
    //console.log("===15"+", "+log_deltatime());
    this.count = 0;
    this.car_ind = [];
    this.dir = []; //0 for head direction, 1 for tail
};
if (!movesList.movesList) {
    movesList.movesList = function (Start) {
        //console.log("===16"+", "+log_deltatime());
        this.count = 0;
        this.car_ind = [];
        this.dir = [];
    }
}

var	parkLogic = function() {};
if (!parkLogic.generatePark) {
    parkLogic.generatePark = function(w, h, c, threeRate) {
        //console.log("===17"+", "+log_deltatime());
        var triednum = 0;
        var res = new park();
        res.width = w;
        res.height = h;
        res.pos = [];
        res.alignment = [];
        res.length = [];
        res.occupancy = [];
        // creating primary car (car #1)
        res.alignment[0] = 0;
        res.length[0] = 2;
        var startpos = Math.floor(Math.random()*(w - 2+1));
        res.pos[0] = w * 2 + startpos;
        res.occupancy[w * 2 + startpos + 1] = res.occupancy[w * 2 + startpos] = 1;
        res.count++;
        var randRate = [];
        for (var i = 0; i < threeRate; i++)
        {
            randRate[i] = 1;
        }
        // creating other cars
        while (res.count < c)
        {
            var pos = Math.floor((Math.random()*(w * h)));
            var alignment = Math.floor(Math.random());
            var length = 2 + randRate[Math.floor(Math.random()*100)];
            var valid_pos = true;
            var current_pos = pos;
            for (var i = 0; i < length; i++)
            {
                if ((alignment == 0) && (w - (pos % w) < length))
                {
                    valid_pos = false;
                    break;
                } // checking if horizontal cars aren't too close to the right edge
                if (current_pos >= res.occupancy.length)
                {
                    valid_pos = false;
                    break;
                }
                if (res.occupancy[current_pos] > 0)
                {
                    valid_pos = false;
                    break;
                }
                if (alignment == 1)
                    current_pos += w;
                else
                    current_pos++;
            }
            if (valid_pos)
            {
                var j = res.count++;
                res.pos[j] = pos;
                res.alignment[j] = alignment;
                res.length[j] = length;
                current_pos = pos;
                for (var i = 0; i < length; i++)
                {
                    res.occupancy[current_pos] = j + 1;
                    if (alignment == 1)
                        current_pos += w;
                    else
                        current_pos++;
                }
            }
            triednum++;
            if (triednum > 1000)
                return null;
        }
        return res;
    };
}
if(!parkLogic.generateMoves) {
    parkLogic.generateMoves = function(p) {
        //console.log("===18"+", "+log_deltatime());
        var L = new movesList();
        for (var i = 0; i < p.count; i++)
        {
            if (p.alignment[i] == 0)
            {
                // horizontal car
                for (var k = 0; k < p.width; k++)
                {
                    if ((p.pos[i] % p.width) + p.length[i] + k < p.width)
                    {
                        if (p.occupancy[p.pos[i] + p.length[i] + k] == 0)
                        {
                            var j = L.count;
                            L.car_ind[j] = i;
                            L.dir[j] = 1 + k;
                            L.count++;
                        }
                        else break;
                    }
                    else break;
                }

                for (var k = 0; k > -p.width; k--)
                {
                    if ((p.pos[i] % p.width) + k > 0)
                    {
                        if (p.occupancy[p.pos[i] - 1 + k] == 0)
                        {
                            var j = L.count;
                            L.car_ind[j] = i;
                            L.dir[j] = -1 + k;
                            L.count++;
                            L.count++;
                        }
                        else break;
                    }
                    else break;
                }
            }
            else
            {
                // vertical car
                for (var k = 0; k < p.height; k++)
                {
                    if (p.pos[i] + p.length[i] * (p.width) + k * p.width < (p.width * p.height))
                    {
                        if (p.occupancy[p.pos[i] + p.length[i] * (p.width) + k * p.width] == 0)
                        {
                            var j = L.count;
                            L.car_ind[j] = i;
                            L.dir[j] = 1 + k;
                            L.count++;
                        }
                        else break;
                    }
                    else break;
                }
                for (var k = 0; k > -p.height; k--)
                {
                    if (p.pos[i] + k * p.width > p.width - 1)
                    {
                        if (p.occupancy[p.pos[i] - p.width + k * p.width] == 0)
                        {
                            var j = L.count;
                            L.car_ind[j] = i;
                            L.dir[j] = -1 + k;
                            L.count++;
                        }
                        else break;
                    }
                    else break;
                }
            }
        }
        return L;
    }
}
if(!parkLogic.makeMove) {
    parkLogic.makeMove = function(p, car, dir) {
        //console.log("===19"+", "+log_deltatime());
        // clearing old car occupancy
        if (p.alignment[car] == 0)
        {
            for (var i = 0; i < p.length[car]; i++) p.occupancy[p.pos[car] + i] = 0;
            p.pos[car] += dir;
            for (var i = 0; i < p.length[car]; i++) p.occupancy[p.pos[car] + i] = car + 1;
        }
        else
        {
            for (var i = 0; i < p.length[car]; i++) p.occupancy[p.pos[car] + i * p.width] = 0;
            p.pos[car] += dir * p.width;
            for (var i = 0; i < p.length[car]; i++) p.occupancy[p.pos[car] + i * p.width] = car + 1;
        }
        p.Prepark = null;
        return p;
    }
}
if(!parkLogic.checkMove) {
    parkLogic.checkMove = function (p, car, dir) {
        ////console.log("===20"+", "+log_deltatime());
        var l = this.generateMoves(p);
        for (var i = 0; i < l.count; i++)
        {
            if ((car == l.car_ind[i]) && (dir == l.dir[i]))
                return true;
        }
        return false;
    }
}
var parkSpaceLogic = function() {};
if (!parkSpaceLogic.StartSearch) {
    parkSpaceLogic.StartSearch = function(Start) {
        //console.log("===21"+", "+log_deltatime());
        var D = {};
        var distance_counter = 0;
        var has_nodes = false;
        current = new queue();
        current.Enqueue(Start);
        while (current.datas.length > 0) // exit loop when current nodes are empty (graph is fully searched)
        {
            neighbours = new queue();
            has_nodes = false;
            while (current.datas.length > 0) // iterating through current nodes
            {
                var node = current.Dequeue();
                var node_hash = node.GetHashCode();
                if (node_hash in D)
                    continue; // bail if node was searched before
                has_nodes = true;
                D[node_hash] = 0;
                if (node.isGoal())
                {
                    D = {};
                    tList = [];
                    tList.push(node);
                    var now = new park;
                    now = node;
                    while (true)
                    {
                        var prev = now.Prepark;
                        if (prev == null)
                        {
                            break;
                        }
                        tList.push(prev);
                        now = prev;
                    }
                    solutions = new queue();
                    for (var i = 0; i < tList.length; i++)
                    {
                        solutions.Enqueue(tList[tList.length-i-1]);
                    }
                    solutions.Dequeue();
                    return solutions;
                }
                // end of state checking
                var L = parkLogic.generateMoves(node);
                for (var i = 0; i < L.count; i++)
                {
                    var clone = node.Clone();
                    var next_node = parkLogic.makeMove(clone, L.car_ind[i], L.dir[i]);
                    if (next_node.GetHashCode() in D)
                        continue; // bail if node was searched before
                    next_node.Prepark = node;
                    next_node.car = L.car_ind[i];
                    next_node.move = L.dir[i];
                    neighbours.Enqueue(next_node);
                }
            }
            current = neighbours;
            if (has_nodes)
            {
                distance_counter++;
            }
        }
        D = {};
        return null;
    }
};
'use strict';

function Game() {}

Game.prototype = {
    preload: function () {
        //this.game.load.bitmapFont('font_play_move-export', 'assets/font/font_play_move-export.png', 'assets/font/font_play_move-export.xml');
    },
    create: function () {
        //console.log(parkLogic.generatePark(6, 6, 3, 40));

        this.gGlobal = this.game.add.group();
        this.gMenu = this.game.add.group();
        this.levelThumbsGroup = this.game.add.group();
        this.gGame = this.game.add.group();
        this.gGameBG = this.game.add.group();
        this.gShadow = this.game.add.group();
        this.gBread = this.game.add.group();
        this.gGameAlpha1 = this.game.add.group();
        this.gGameAlpha2 = this.game.add.group();
        this.gClear = this.game.add.group();
        this.gGameStart = this.game.add.group();
        this.gGameReward = this.game.add.group();
        this.gTutorial = this.game.add.group();
        this.gIngame = this.game.add.group();
        this.gHeart = this.game.add.group();
        this.gGhost = this.game.add.group();
        this.gGlobal.visible = true;
        this.gMenu.visible = true;
        this.gGame.visible = false;
        this.gGameAlpha1.visible = false;
        this.gGameAlpha2.visible = false;
        this.gClear.visible = false;
        this.gGameStart.visible = false;
        this.gGameReward.visible = false;
        this.gTutorial.visible = false;
        this.gIngame.visible = false;
        this.gHeart.visible = false;
        this.gGhost.visible = false;
        this.gClear.x = this.game.world.centerX;
        this.gClear.y = this.game.world.centerY;
        this.gGameStart.x = this.game.world.centerX;
        this.gGameStart.y = this.game.world.centerY;
        this.gGameReward.x = this.game.world.centerX;
        this.gGameReward.y = this.game.world.centerY;
        this.gTutorial.x = this.game.world.centerX;
        this.gTutorial.y = this.game.world.centerY;
        this.gIngame.x = this.game.world.centerX;
        this.gIngame.y = this.game.world.centerY;

        this.touchSprite = null; // 터치한 블록
        this.touchRect = null; // 터치한 블록의 이동범위
        this.Sprite_preX = null; // 터치한 블록의 초기 X값
        this.Sprite_preY = null; // 터치한 블록의 초기 Y값

        this.timedelay = 300; // 초기화 된 상태에서 시간을 계속 체크.
        this.Ingamebutton = 0; //스테이지 플레이버튼 구분자
        this.block_eff = null; // 블록 충돌 효과 관리
        this.inputTime = performance.now(); // 마지막 마우스 입력 시간 계속 관리
        this.popupCount = 0; // 열린 팝업 숫자 관리
        // 1 = 재시작
        // 2 = 힌트
        // 3 = 돌아가기
        this.curBgm = null;

        this.thumbRows = 5;
        this.thumbCols = 4;
        var thumbWidth = 127;
        var thumbHeight = 142;
        var thumbWSpacing = 30;
        var thumbHSpacing = 15;

        //메뉴배경
        this.MenuBG = MG.AddSprite(this.gGlobal, this.game.world.centerX, this.game.world.centerY, undefined, 'back_line_1', undefined, undefined, 0.5, 0.5, this.game.width, this.game.height);
        this.top = MG.AddSprite(this.gGlobal, this.game.world.centerX, 85, undefined, 'top_0', undefined, undefined, 0.5, 0.5, this.game.width, 180);
        this.aurora = this.game.add.spine(this.game.world.centerX, this.game.world.centerY, 'aurora');
        this.aurora.addAnimationByName(0, "aurora", true);
        this.gGlobal.addChild(this.aurora);
        MG.AddSprite(this.gMenu, this.game.world.centerX, 194, "atlas-1", 'top_select.png');
        MG.AddSprite(this.gMenu, 116, 786, "atlas-0", 'bg.png', undefined, undefined, 0.5, 0.5, 232, 988);
        MG.AddSprite(this.gMenu, this.game.width-116, 786, "atlas-0", 'bg.png', undefined, undefined, 0.5, 0.5, -232, 988);
        //화면전환용 이펙트 정의
        this.easter = MG.AddSprite(this.game.world, this.game.world.centerX, this.game.world.centerY, "atlas-0", "circle_mask.png", undefined, undefined, 0.5, 0.5, this.game.width*60, this.game.height*60);
        this.trans = MG.AddSprite(this.game.world, this.game.world.centerX, this.game.world.centerY, "atlas-0", "transpenguin.png");
        this.trans.visible = false;

        this.worlds = 18;
        this.pages = 10;
        //월드: parseInt(MG.level/(this.thumbRows * this.thumbCols * this.pages))
        //스테이지: MG.level%(this.thumbRows * this.thumbCols * this.pages)
        //페이지: parseInt((MG.level%(this.thumbRows * this.thumbCols * this.pages))/(this.thumbRows * this.thumbCols))
        this.currentWorld = parseInt(MG.level[MG.level.length-1]/(this.thumbRows * this.thumbCols * this.pages));
        if(this.currentWorld>this.worlds-1){
            this.currentWorld = this.worlds-1;
        }
        this.currentPage = parseInt(MG.level[this.currentWorld]/(this.thumbRows * this.thumbCols));
        if(this.currentPage>this.pages-1){
            this.currentPage = this.pages-1;
        }
        this.gHeart.visible = true;
        //월드 넘버
        this.text_world = MG.AddSprite(this.gMenu, this.game.world.centerX, this.game.world.centerY-370, "atlas-0", 'text_world.png', undefined, undefined, 0.5, 0.5, 155, 36);
        this.txtWorld = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY-382, "world_no", "", 60);
        this.txtWorld.anchor.setTo(0.5);
        this.gMenu.addChild(this.txtWorld);
        //획득 별 개수
        /*this.star = MG.AddSprite(this.gMenu, this.game.world.centerX, this.game.world.centerY-268, undefined, 'star');
        this.txtStarCnt = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY-285, "world", "", 80);
        this.txtStarCnt.anchor.setTo(0.5);
        this.gMenu.addChild(this.txtStarCnt);*/
        //음소거
        this.MenuMuteON = MG.MGButton.createAtlas(this.game.world.centerX+310, this.game.world.centerY-590, undefined, "atlas-1", MG.isSfx === true?"btn_sound_on_title.png":"btn_sound_off_title.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                MG.AudioSwitch(MG.isSfx);
                switch(MG.isSfx === true)
                {
                    case true:
                        this.MenuMuteON.loadTexture("atlas-1", "btn_sound_on_title.png");
                        break;
                    case false:
                        this.MenuMuteON.loadTexture("atlas-1", "btn_sound_off_title.png");
                        break;
                }
                if(MG.isBGM === false) {
                    if(this.curBgm != null) MG.StopBgm(this.curBgm);
                }
                else {
                    if(this.curBgm != null) MG.PlayBgm(this.curBgm, true);
                }
            }.bind(this)
        );
        this.MenuMuteON.anchor.set(0.5, 0.5);
        this.gMenu.addChild(this.MenuMuteON);
        //world left button
        this.world_left = MG.MGButton.createAtlas(this.game.world.centerX-150, this.game.world.centerY-370, undefined, "atlas-0", 'btn_arrow3.png');
        this.world_left.anchor.set(0.5, 0.5);
        this.gMenu.addChild(this.world_left);
        this.world_left.arrow = 1;
        this.world_left.events.onInputUp.add(this.worldArrow, this);
        //world right button
        this.world_right = MG.MGButton.createAtlas(this.game.world.centerX+150, this.game.world.centerY-370, undefined, "atlas-0", 'btn_arrow3.png');
        this.world_right.anchor.set(0.5, 0.5);
        this.gMenu.addChild(this.world_right);
        this.world_right.baseScaleX = -1;
        this.world_right.scale.set(this.world_right.baseScaleX, this.world_right.baseScaleY);
        //this.world_right.width *= -1;
        this.world_right.arrow = -1;
        this.world_right.events.onInputUp.add(this.worldArrow, this);
        // 신규 월드 열렸을 때 느낌표
        this.sign = MG.AddSprite(this.world_right, -20, -43, "atlas-0", 'sign.png');
        this.sign.num = 0;
        this.sign.visible = false;
        //펭귄새끼 없을 때 뜨는 메세지
        this.RPmessage = MG.AddSpriteNine(this.gMenu, this.game.world.centerX, this.game.world.centerY-490, "atlas-0", "panel_select.png", 640, 66, {top: 15, bottom: 15, left: 15, right: 15});
        this.RPmessage2 = MG.AddSprite(this.gMenu, this.game.world.centerX, this.game.world.centerY-490, "atlas-0", 'text_select.png');
        //월드별 획득한 별에 따라 구조된 펭귄새끼
        this.ResquePenguin = [];
        for(var i=this.pages-1;i>=0;i--) {
            MG.AddSprite(this.gMenu, 63 + (65 * i), this.game.world.centerY-421, "atlas-0", 'baby_base.png');
            this.ResquePenguin[i] = this.game.add.spine(65 + (65 * i), this.game.world.centerY-430, "baby_all");
            this.PenguinAttatch(this.ResquePenguin[i], i);
            this.gMenu.addChild(this.ResquePenguin[i]);
            this.ResquePenguin[i].pop = 0;
        }
        //stage left button
        this.bg_left = MG.AddSprite(this.gMenu, this.game.world.centerX-257, this.game.world.centerY+572, "atlas-1", 'btn_arrow2_bg.png');
        this.stage_left = MG.MGButton.createAtlas(this.game.world.centerX-257, this.game.world.centerY+572, undefined, "atlas-0", 'btn_arrow2.png');
        this.stage_left.anchor.set(0.5, 0.5);
        this.gMenu.addChild(this.stage_left);
        this.stage_left.arrow = 1;
        this.stage_left.visible = true;
        if(this.currentPage==0){
            this.stage_left.visible = false;
        }
        this.stage_left.events.onInputUp.add(this.stageArrow, this);
        //stage right button
        this.bg_right = MG.AddSprite(this.gMenu, this.game.world.centerX+257, this.game.world.centerY+572, "atlas-1", 'btn_arrow2_bg.png');
        this.stage_right = MG.MGButton.createAtlas(this.game.world.centerX+257, this.game.world.centerY+572, undefined, "atlas-0", 'btn_arrow2.png');
        this.stage_right.anchor.set(0.5, 0.5);
        this.gMenu.addChild(this.stage_right);
        this.stage_right.baseScaleX = -1;
        this.stage_right.scale.set(this.stage_right.baseScaleX, this.stage_right.baseScaleY);
        //this.stage_right.width *= -1;
        this.stage_right.arrow = -1;
        this.stage_right.visible = true;
        if(this.currentPage==this.pages-1){
            this.stage_right.visible = false;
        }
        this.stage_right.events.onInputUp.add(this.stageArrow, this);

        /*this.scrollingMap = this.game.add.tileSprite(0, 305, this.pages * this.game.width, 845, "hollow");
        this.scrollingMap.inputEnabled = true;
        this.scrollingMap.input.enableDrag(false);
        this.scrollingMap.input.allowVerticalDrag = false;
        this.gMenu.addChild(this.scrollingMap);
        this.scrollingMap.input.boundsRect = new Phaser.Rectangle(this.game.width - this.scrollingMap.width, this.game.height - this.scrollingMap.height, this.scrollingMap.width * 2 - this.game.width, this.scrollingMap.height * 2 - this.game.height);*/

        this.levelThumb = [];
        var levelLength = thumbWidth*this.thumbCols+thumbWSpacing*(this.thumbCols-1);
        var levelHeight = thumbWidth*this.thumbRows+thumbHSpacing*(this.thumbRows-1);
        for(var l = 0; l < 3; l++){//3페이지
            var offsetX = (this.game.width-levelLength)/2+this.game.width*l;
            var offsetY = (this.game.height-levelHeight)/2 + 90;
            // looping through each level thumbnails
            for(var i = 0; i < this.thumbRows; i ++){
                for(var j = 0; j < this.thumbCols; j ++){
                    // which level does the thumbnail refer?
                    var levelNumber = i*this.thumbCols+j+l*(this.thumbRows*this.thumbCols) + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages);
                    // adding the thumbnail, as a button which will call thumbClicked function if clicked
                    this.levelThumb[(levelNumber%(this.thumbRows * this.thumbCols * this.pages))] = new this.StageInfo(this, this.levelThumbsGroup, offsetX+j*(thumbWidth+thumbWSpacing), offsetY+i*(thumbHeight+thumbHSpacing), this.thumbClicked.bind(this));
                    // adding the thumbnail, as a button which will call thumbClicked function if clicked
                    //var levelThumb = this.game.add.button(Menu_ROW + j * (thumbWidth + offsetX), Menu_COL + i * (thumbHeight + offsetY), "oven_whitebread", this.thumbClicked, this);
                    // custom attribute
                    //levelThumb.levelNumber = levelNumber;
                    //this.levelThumbsGroup.addChild(levelThumb);
                    this.gMenu.add(this.levelThumbsGroup);
                    // adding the level thumb to the group
                    /*var style = {
                        font: "46px Arial",
                        fill: "#000000",
                        align: "center"
                    };
                    var levelText = this.game.add.text(levelThumb.x+30,levelThumb.y+30,levelThumb.levelNumber,style);*/
                    //levelText.ChangeTextColor();
                    //levelText.SetGradation("#00FF00", "#000000");
                    /*levelText.ReSize(100);*/
                }
            }
        }
        //해당페이지로 이동
        //this.levelThumbsGroup.x = this.currentPage * this.game.width * -1;
        this.levelThumbsGroup.x = this.game.width * -1;//원위치

        //http://www.emanueleferonato.com/2016/04/08/create-a-html5-level-select-screen-controlled-by-swipe-new-feature-navigation-with-page-thumbnails/참조
        /*this.scrollingMap.events.onDragStart.add(function(){
            this.scrollingMap.startPosition = this.scrollingMap.x;
            this.scrollingMap.currentPosition = this.scrollingMap.x;
        }, this);
        this.scrollingMap.events.onDragStop.add(function(sprite, pointer){
            // if there wasn't any scroll, we can say it wasn't a drag so the player clicked a level
            if(this.scrollingMap.startPosition == this.scrollingMap.x){
                if(pointer.x >= 60 && pointer.x <= 660 && pointer.y >= 382 && pointer.y <= 1142) {
                    var currentStage = parseInt((pointer.y - 382)/152)*this.thumbCols+parseInt((pointer.x - 60)/150)+this.currentPage*(this.thumbRows*this.thumbCols); //포인터 위치 기반으로 스테이지 계산
                    if(MG.moveData[this.currentWorld][currentStage] != undefined) {
                        MG.stage_num = currentStage + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages);
                        this.thumbClicked();
                    }
                }
            }
            else{
                if(this.scrollingMap.startPosition - this.scrollingMap.x > this.game.width / 8){
                    this.changePage(1);
                }
                else{
                    if(this.scrollingMap.startPosition - this.scrollingMap.x < -this.game.width / 8){
                        this.changePage(-1);
                    }
                    else{
                        this.changePage(0);
                    }
                }
            }
        }, this);*/

        this.page_normal = [];
        for (var i = 0; i < this.pages; i++)
        {
            this.page_normal[i] = MG.AddSprite(this.gMenu, 180 + (40 * i), this.game.world.centerY+572, "atlas-1", 'btn_page_normal.png');
            this.page_normal[i].num = i;
            this.page_normal[i].inputEnabled = true;
            this.page_normal[i].events.onInputUp.add(this.stageArrow, this);
        }

        //게임배경
        this.field = MG.AddSprite(this.gGame, 21, 372, undefined, 'bg_0', undefined, undefined, 0, 0);
        var lightning_arrow = MG.AddSprite(this.field, 630, 280, "atlas-0", 'arrow.png');
        lightning_arrow.alpha = 1.0;
        var lightning_tween1 = this.game.add.tween(lightning_arrow)
            .to( {alpha: 0.2}, 1500, Phaser.Easing.Linear.None)
            .to( {alpha: 0.6}, 1500, Phaser.Easing.Linear.None)
            .start();
        lightning_tween1.onComplete.add(function (){
            lightning_tween1.start();
        }.bind(this));
        MG.AddSprite(this.gGame, this.game.world.centerX, 296, "atlas-0", 'top.png');
        this.gGame.addChild(this.gGameBG);
        MG.AddSprite(this.gGameBG, 0, 334, "atlas-0", 'bottom.png', undefined, undefined, 0, 0);
        //이글루&펭귄&물개
        this.egloo = this.game.add.spine(110, 300, 'egloo');
        this.egloo.addAnimationByName(0, "egloo", true);
        this.gGame.addChild(this.egloo);
        this.character = MG.AddSprite(this.gGame, 267, 320, "atlas-0", 'hollow.png');
        this.captain = this.game.add.spine(0, 0, 'captain');
        this.captain.scale.setTo(0.57, 0.57);
        this.captain.addAnimationByName(0, "idle", true);
        this.character.addChild(this.captain);
        this.character.inputEnabled = true;
        this.character.events.onInputUp.add(function(){
            MG.PlayAudio('SE_HeroMove');
            var cap_ani = this.captain.setAnimationByName(1, "touch", false);
            cap_ani.onComplete = function (trackIndex) {
                switch(trackIndex){
                    case 0:
                        break;
                    case 1:
                        this.captain.addAnimationByName(0, "idle", true);
                        break;
                }
            }.bind(this);
            var cha_ani = this.cha.setAnimationByName(1, "touch", false);
            cha_ani.onComplete = function (trackIndex) {
                switch(trackIndex){
                    case 0:
                        break;
                    case 1:
                        this.cha.addAnimationByName(0, "idle", true);
                        break;
                }
            }.bind(this);
            //this.captain.setMixByName("touch", "idle", 0);
            //this.cha.setMixByName("touch", "idle", 0);
        }, this);
        this.pet = this.game.add.spine(365, 300, 'pet');
        this.pet.scale.setTo(0.66, 0.66);
        this.pet.addAnimationByName(0, "idle", true);
        this.gGame.addChild(this.pet);
        //스테이지 이름
        MG.AddSprite(this.gGame, 80, 63, "atlas-0", 'flag.png');
        this.stage_title = this.game.add.bitmapText(this.game.world.centerX-340, this.game.world.centerY-655, "font", "WORLD", 50);
        this.stage_title.tint = 0xfddd5a;
        this.stage_title_num = this.game.add.bitmapText(this.game.world.centerX-280, this.game.world.centerY-595, "font", "", 50);
        this.stage_title_num.anchor.setTo(0.5);
        this.gGame.addChild(this.stage_title);
        this.gGame.addChild(this.stage_title_num);
        //이동횟수&획득 별 UI
        MG.AddSprite(this.gGame, this.game.world.centerX+225, this.game.world.centerY-415, "atlas-0", 'moves.png');
        var gage = MG.AddSprite(this.gGame, this.game.world.centerX+226, this.game.world.centerY-373, "atlas-0", 'gage.png');
        this.gageMask = MG.game.add.graphics(0, 0);
        this.gageMask.beginFill();
        this.gageMask.drawRect(gage.x-gage.width/2, gage.y-gage.height/2, gage.width, gage.height);
        this.gageMask.endFill();
        this.gGame.addChild(this.gageMask);
        gage.mask = this.gageMask;
        //이동 횟수
        this.move_text = this.game.add.bitmapText(this.game.world.centerX+230, this.game.world.centerY-437, "move", "", 80);
        this.move_text.anchor.setTo(0.5);
        this.gGame.addChild(this.move_text);
        //최소 이동 횟수
        this.min_move_text = this.game.add.bitmapText(this.game.world.centerX+252, this.game.world.centerY-360, "condition", "", 80);
        this.min_move_text.anchor.setTo(0.5);
        this.gGame.addChild(this.min_move_text);
        MG.AddSprite(this.min_move_text, 0, 25, "atlas-0", 'condition.png');
        //이동 별
        MG.AddSprite(this.gGame, this.game.world.centerX+252, gage.y-1, "atlas-0", 'star_play_empty.png');
        MG.AddSprite(this.gGame, this.game.world.centerX+200, gage.y-1, "atlas-0", 'star_play_empty.png');
        this.starX3 = MG.AddSprite(this.gGame, this.game.world.centerX+252, gage.y-1, "atlas-0", 'star_play.png');
        this.starX2 = MG.AddSprite(this.gGame, this.game.world.centerX+200, gage.y-1, "atlas-0", 'star_play.png');
        this.starX1 = MG.AddSprite(this.gGame, this.game.world.centerX+148, gage.y-1, "atlas-0", 'star_play.png');
        //튜토리얼
        var tutorial = MG.MGButton.createAtlas(this.game.world.centerX+325, this.game.world.centerY-600, undefined, "atlas-0", 'btn_tutorial.png'
            ,function(){
                MG.PlayAudio('SE_Click');
                this.OpenPopup(this.gTutorial, this.gGameAlpha1);
            }.bind(this)
        );
        tutorial.anchor.set(0.5, 0.5);
        this.gGameBG.addChild(tutorial);


        //새로하기
        var restart = MG.MGButton.createAtlas(this.game.world.centerX-250, this.game.world.centerY+550, undefined, "atlas-1", 'btn_restart.png'
            ,function(){
                MG.PlayAudio('SE_Click');
                this.gHeart.visible = true;
                this.game.world.bringToTop(this.gHeart);
                this.Ingamebutton = 1;
                this.gIngame.startMove.text = "RETRY";
                this.gIngame.startText.setText(GetString("reGame"));
                this.gIngame.heart.visible = true;
                this.gIngame.heart.loadTexture("atlas-0", "heart_hint.png");
                this.gIngame.YES.x =  -(this.gIngame.heart.width+15)/2;
                this.gIngame.heart.x = (this.gIngame.YES.textWidth+15)/2;
                this.OpenPopup(this.gIngame, this.gGameAlpha1);
            }.bind(this)
        );
        restart.anchor.set(0.5, 0.5);
        this.gGameBG.addChild(restart);
        //힌트버튼
        this.ovenhint = MG.MGButton.createAtlas(this.game.world.centerX-84, this.game.world.centerY+550, undefined, "atlas-1", 'btn_hint.png'
            ,function(){
                MG.PlayAudio('SE_Click');
                this.Ingamebutton = 2;
                this.gIngame.startMove.text = "HINT";
                this.gIngame.startText.setText(GetString("heart"));
                this.gIngame.heart.visible = true;
                this.gIngame.heart.loadTexture("atlas-0", "movie.png");
                this.gIngame.YES.x =  -(this.gIngame.heart.width+15)/2;
                this.gIngame.heart.x = (this.gIngame.YES.textWidth+15)/2;
                this.OpenPopup(this.gIngame, this.gGameAlpha1);
            }.bind(this)
        );
        this.ovenhint.anchor.set(0.5, 0.5);
        this.gGameBG.addChild(this.ovenhint);
        //음소거
        this.muteON = MG.MGButton.createAtlas(this.game.world.centerX+84, this.game.world.centerY+550, undefined, "atlas-1", MG.isSfx === true?"btn_sound_on.png":"btn_sound_off.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                MG.AudioSwitch(MG.isSfx);
                this.muteON.loadTexture("atlas-1", MG.isSfx === true?"btn_sound_on.png":"btn_sound_off.png");
                if(MG.isBGM === false) {
                    if(this.curBgm != null) MG.StopBgm(this.curBgm);
                }
                else {
                    if(this.curBgm != null) MG.PlayBgm(this.curBgm, true);
                }
            }.bind(this)
        );
        this.muteON.anchor.set(0.5, 0.5);
        this.gGameBG.addChild(this.muteON);
        //뒤로가기
        var backmenu = MG.MGButton.createAtlas(this.game.world.centerX+250, this.game.world.centerY+550, undefined, "atlas-1", 'btn_quit.png'
            ,function(){
                MG.PlayAudio('SE_Click');
                this.Ingamebutton = 3;
                this.gIngame.startMove.text = "EXIT";
                this.gIngame.startText.setText(GetString("exitGame"));
                this.gIngame.heart.visible = false;
                this.gIngame.YES.visible = true;
                this.gIngame.YES.x = 0;
                this.OpenPopup(this.gIngame, this.gGameAlpha1);
            }.bind(this)
        );
        backmenu.anchor.set(0.5, 0.5);
        this.gGameBG.addChild(backmenu);

        this.GameAlphaPopup1();
        this.GameAlphaPopup2();
        this.ClearPopup();
        this.HeartshopPopup();
        this.GameStartPopup();
        this.GameRewardPopup();
        this.TutorialPopup();
        this.IngamePopup();
        this.HeartMenu();
        this.ShowMenu();
        this.HideMenu();
        this.curBgm = 'BGM_Title';
        MG.PlayBgm(this.curBgm, true);

    },
    changePage: function(page){
        this.currentPage += page;
        if(this.currentPage < 0) {
            this.currentPage = 0;
            page = 0;
        }
        if(this.currentPage > this.pages-1) {
            this.currentPage = this.pages-1;
            page = 0;
        }
        var tween = this.game.add.tween(this.scrollingMap).to({
            x: this.currentPage * -this.game.width
        }, 300, Phaser.Easing.Cubic.None, true);
        var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
        //var dist = page == -1 ? 0 : (-720*2);
        if(page == -1)
            var dist = 0;
        else if(page == 1)
            var dist = -720*2;
        else
            var dist = -720*1;
        buttonsTween.to({
            x: dist
        }, 400, Phaser.Easing.Cubic.None);
        buttonsTween.start();
        if(page != 0) MG.PlayAudio('SE_PageMove');
        buttonsTween.onStart.add(this.ShowMenu.bind(this));
        buttonsTween.onComplete.add(this.HideMenu.bind(this));
    },
    StageInfo: function(pGame, parent, x, y, callback)
    {
        //배경
        var spr = MG.AddSprite(parent, x, y+80, "atlas-0", "hollow.png", undefined, undefined, 0.0, 0.0);
        spr.inputEnabled = true;
        spr.events.onInputUp.add(callback, pGame);
        //펭귄
        var penguin = pGame.game.add.spine(60, 15, 'baby_all');
        //별
        var stage_star = MG.AddSprite(parent, 21, 23, "atlas-0", "stage_star.png", undefined, undefined, 0.0, 0.0);
        var sprStar = [];
        for(var i=0;i < 3;i++) {
            sprStar[i] = MG.AddSprite(parent, 21 + i * 28, 23, "atlas-0", "star_play.png", undefined, undefined, 0.0, 0.0);
            sprStar[i].visible = false;
        }
        //스테이지 숫자
        var txtStage = pGame.game.add.bitmapText(65, -75, "stage_no", "", 42);
        //MG.game.add.text(65, -75, "", {font: "32px Arial", fontWeight:'bold', stroke: "#1b6bb7", strokeThickness: 5, fill: "#ffffff", align: "center"});
        txtStage.anchor.set(0.5);
        //txtStage.ReSize(100);

        spr.addChild(penguin);
        spr.addChild(stage_star);
        spr.addChild(sprStar[0]);
        spr.addChild(sprStar[1]);
        spr.addChild(sprStar[2]);
        spr.addChild(txtStage);

        parent.addChild(spr);

        this.ShowInfo = function(StageNum, iClearCnt)
        {
            txtStage.text = (StageNum%(pGame.thumbRows * pGame.thumbCols * pGame.pages))+1;
            spr.num = StageNum;
            pGame.PenguinAttatch(penguin, parseInt((StageNum%(pGame.thumbRows * pGame.thumbCols * pGame.pages))/(pGame.thumbRows * pGame.thumbCols)));
            txtStage.visible = false;
            stage_star.visible = false;
            for(var i=0;i < 3;i++) {
                sprStar[i].visible = false;
            }
            if(StageNum >= 0) {
                if(iClearCnt != undefined) {
                    spr.visible = true;
                    txtStage.visible = true;
                    stage_star.visible = true;

                    for(var i=0;i < 3;i++) {
                        if(iClearCnt > i) {
                            sprStar[i].visible = true;
                        }
                    }
                    if(iClearCnt > 2) {
                        penguin.state.clearTracks();
                        penguin.addAnimationByName(0, "idle_stage", true);
                    }else if(iClearCnt >= 1) {
                        penguin.state.clearTracks();
                        penguin.addAnimationByName(0, "idle_stage_egg", true);
                    }
                    spr.inputEnabled = true;
                }
                else {
                    penguin.state.clearTracks();
                    penguin.addAnimationByName(0, "stage_egg_lock_idle", true);
                    spr.inputEnabled = false;

                    //MG.levelData[StageNum] = 0;
                    //networkManager.AppDataPut(JSON.stringify(tdata));
                    //networkManager.ForcedSaveData();
                }
                if(StageNum%(pGame.thumbRows * pGame.thumbCols * pGame.pages) == MG.level[pGame.currentWorld] && StageNum%(pGame.thumbRows * pGame.thumbCols * pGame.pages) < (pGame.thumbRows * pGame.thumbCols * pGame.pages)) {
                    penguin.state.clearTracks();
                    penguin.addAnimationByName(0, "stage_egg_normal_idle", true);
                    //console.log(pGame.game.rnd.integerInRange(0, 2000));
                    txtStage.visible = false;
                    stage_star.visible = false;
                }
            }
        };
    },
    worldArrow: function(button){
        var pre_currentPage = this.currentPage;
        // touching right arrow and still not reached last page
        if(button.arrow == (-1) && this.currentWorld<this.worlds-1){
            this.currentWorld++;
        }
        // touching left arrow and still not reached first page
        if(button.arrow == 1 && this.currentWorld>0){
            this.currentWorld--;
        }
        if(MG.level[this.currentWorld] != undefined) {
            this.currentPage = parseInt(MG.level[this.currentWorld]/(this.thumbRows * this.thumbCols));
            if(this.currentPage >= this.pages) this.currentPage = this.pages-1;
        }
        else if(MG.level[this.currentWorld] == undefined) {
            this.currentPage = 0;
        }
        if(pre_currentPage != this.currentPage) {
            this.page_normal[pre_currentPage].loadTexture("atlas-1", "btn_page_normal.png");
        }
        MG.PlayAudio('SE_PageMove');
        this.ShowMenu();
        this.HideMenu();
        /*var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
        var dist = this.currentPage < pre_currentPage ? 0 : (-720*2);
        buttonsTween.to({
            x: dist
        }, 400, Phaser.Easing.Cubic.None);
        buttonsTween.start();
        MG.PlayAudio('SE_PageMove');
        buttonsTween.onStart.add(this.ShowMenu.bind(this));
        buttonsTween.onComplete.add(this.HideMenu.bind(this));*/
    },
    stageArrow: function(button){
        var pre_currentPage = this.currentPage;
        if(button.frameName != "btn_page_selected.png") {
            this.page_normal[this.currentPage].loadTexture("atlas-1", "btn_page_normal.png");
        }else return;
        if(button.frameName == "btn_arrow2.png") {
            // touching right arrow and still not reached last page
            if (button.arrow == (-1) && this.currentPage < this.pages - 1) {
                this.currentPage++;
            }
            // touching left arrow and still not reached first page
            if (button.arrow == 1 && this.currentPage > 0) {
                this.currentPage--;
            }
        }
        if(button.frameName == "btn_page_normal.png") {
            this.currentPage = button.num;
        }
        var buttonsTween = this.game.add.tween(this.levelThumbsGroup);
        var dist = this.currentPage < pre_currentPage ? 0 : (-720*2);
        buttonsTween.to({
            x: dist
        }, 400, Phaser.Easing.Cubic.None);
        buttonsTween.start();
        MG.PlayAudio('SE_PageMove');
        buttonsTween.onStart.add(this.ShowMenu.bind(this));
        buttonsTween.onComplete.add(this.HideMenu.bind(this));
    },
    thumbClicked: function(button) {
        MG.PlayAudio('SE_Click');
        MG.stage_num = button.num;
        this.gGameStart.startText.text = (parseInt(MG.stage_num/(this.thumbRows * this.thumbCols * this.pages))+1)+"-"+((MG.stage_num%(this.thumbRows * this.thumbCols * this.pages))+1);
        this.gGameStart.startWorld.x = 0 - (this.gGameStart.startText.textWidth)/2;
        this.gGameStart.startText.x = 0 + (this.gGameStart.startWorld.textWidth)/2; //클리어한 스테이지 좌표 관리
        this.gGameStart.star_ready_1.loadTexture("atlas-1", "star_ready_1_empty.png");
        this.gGameStart.star_ready_1.scale.setTo(0.9);
        this.gGameStart.star_ready_2.loadTexture("atlas-1", "star_ready_1_empty.png");
        this.gGameStart.star_ready_2.scale.setTo(1.0);
        this.gGameStart.star_ready_3.loadTexture("atlas-1", "star_ready_1_empty.png");
        this.gGameStart.star_ready_3.scale.setTo(0.9);
        if(this.MovetoLevel(parseInt(MG.stage_num / (this.thumbRows * this.thumbCols * this.pages)), MG.stage_num % (this.thumbRows * this.thumbCols * this.pages)) >= 1) {
            this.gGameStart.star_ready_1.loadTexture("atlas-0", "star_ready_1.png");
            this.gGameStart.star_ready_1.scale.setTo(0.9);
        }
        if(this.MovetoLevel(parseInt(MG.stage_num / (this.thumbRows * this.thumbCols * this.pages)), MG.stage_num % (this.thumbRows * this.thumbCols * this.pages)) >= 2) {
            this.gGameStart.star_ready_2.loadTexture("atlas-0", "star_ready_1.png");
            this.gGameStart.star_ready_2.scale.setTo(1.0);
        }
        if(this.MovetoLevel(parseInt(MG.stage_num / (this.thumbRows * this.thumbCols * this.pages)), MG.stage_num % (this.thumbRows * this.thumbCols * this.pages)) >= 3) {
            this.gGameStart.star_ready_3.loadTexture("atlas-0", "star_ready_1.png");
            this.gGameStart.star_ready_3.scale.setTo(0.9);
        }
        this.OpenPopup(this.gGameStart, this.gGameAlpha1);
    },
    ShowMenu: function()
    {
        this.gGameAlpha1.alpha = 0.0;
        this.gGameAlpha1.visible = true;
        var back_line = ['back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', 'back_line_1', ];
        this.MenuBG.loadTexture(back_line[this.currentWorld]);
        this.top.loadTexture("top_"+(this.currentWorld%6)); //월드에 따른 메뉴선택 배경
        this.OpenNewWorld();
        /*for(var L = 0; L < 3; L++){//3페이지
            // looping through each level thumbnails

            for(var i = 0; i < this.thumbRows; i ++){
                for(var j = 0; j < this.thumbCols; j ++){
                    // which level does the thumbnail refer?
                    var pg = (this.currentPage-1) + L;//3개페이지중1개
                    if(pg<0) pg=0;
                    var lv = i*this.thumbCols+j+pg*(this.thumbRows*this.thumbCols) + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages);
                    var levelNumber = i*this.thumbCols+j+L*(this.thumbRows*this.thumbCols) + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages);
                    this.levelThumb[(L * 20)+i*this.thumbCols+j].ShowInfo(lv, this.MovetoLevel(parseInt(lv / (this.thumbRows * this.thumbCols * this.pages)), lv % (this.thumbRows * this.thumbCols * this.pages)));
                }
            }
        }
        //this.levelThumbsGroup.x = this.currentPage * this.game.width * -1;*/

        if(MG.PenguinArray != null) {
            if(MG.PenguinArray.length>0) {
                this.game.world.bringToTop(this.gGameReward);
                MG.PlayAudio('SE_MISSION_OK');
                //this.gGameReward.complet.state.clearTracks();
                var complete_in = this.gGameReward.complet.setAnimationByName(1, "mission_complete_in", false);
                this.OpenPopup(this.gGameReward, this.gGameAlpha2);
                complete_in.onComplete = function (trackIndex) {
                    switch(trackIndex){
                        case 0:
                            break;
                        case 1:
                            this.gGameReward.complet.addAnimationByName(0, "mission_complete_idle", true);
                            this.gGameReward.intro.setText(GetString("baby_"+(MG.PenguinArray[0]+1)));
                            this.gGameReward.reward.setText(GetString("baby_"+(MG.PenguinArray[0]+1)+"_profile"));
                            this.PenguinAttatch(this.gGameReward.captain, MG.PenguinArray[0]);
                            this.gGameReward.captain.setAnimationByName(0, "idle_in_mission_com", false);
                            this.gGameReward.captain.addAnimationByName(0, "idle_mission_com", true);
                            this.ResquePenguin[MG.PenguinArray[0]].alpha = 1.0;
                            MG.PlayAudio('SE_BabyPenguin_On');
                            this.ResquePenguin[MG.PenguinArray[0]].state.clearTracks();
                            this.ResquePenguin[MG.PenguinArray[0]].addAnimationByName(0, "idle_top_open", false, 1000);
                            this.ResquePenguin[MG.PenguinArray[0]].addAnimationByName(0, "idle_top", true);
                            this.ResquePenguin[MG.PenguinArray[0]].state.onComplete = function () {
                                this.gGameReward.btn_ready_blue.visible = true;
                            }.bind(this);
                            this.ResquePenguin[MG.PenguinArray[0]].pop = 0;
                            MG.PenguinArray.shift();
                            MG.storage.set('PenguinArray', MG.PenguinArray );
                            break;
                    }
                }.bind(this);
            }
        }

        this.world_left.visible = true;
        this.world_right.visible = true;
        this.bg_left.visible = true;
        this.bg_right.visible = true;
        this.stage_left.visible = true;
        this.stage_right.visible = true;
        if (this.currentWorld == this.worlds - 1) {
            this.world_right.visible = false;
        }
        if (this.currentWorld < (this.worlds - 1) && MG.moveData[(this.currentWorld+1)].length == 0) {
            this.world_right.visible = false;
        }
        if (this.currentWorld == 0) {
            this.world_left.visible = false;
        }
        if (this.currentPage == this.pages - 1) {
            this.bg_right.visible = false;
            this.stage_right.visible = false;
        }
        if (this.currentPage == 0) {
            this.bg_left.visible = false;
            this.stage_left.visible = false;
        }

        for (var i = 0; i < this.pages; i++)
        {
            this.page_normal[i].loadTexture("atlas-1", "btn_page_normal.png");
        }
        this.page_normal[this.currentPage].loadTexture("atlas-1", "btn_page_selected.png");

        //this.txtStarCnt.text = this.WorldStarNum(this.currentWorld) + " / " + (this.thumbRows * this.thumbCols * this.pages * 3); //월드별 별 개수 표시
        this.txtWorld.text = (this.currentWorld+1); //월드 넘버
        for(var i=0;i<this.pages;i++){
            if(this.PageClearNum(this.currentWorld, i) == (this.thumbRows * this.thumbCols)) {
                this.ResquePenguin[i].alpha = 1.0;
                if(this.PageStarNum(this.currentWorld, i) == (this.thumbRows * this.thumbCols * 3) && this.ResquePenguin[i].pop == 0) {
                    //i번 펭귄새끼를 보여준다
                    this.ResquePenguin[i].addAnimationByName(0, "idle_top", true);
                }else {
                    this.ResquePenguin[i].addAnimationByName(0, "idle_top_egg", true);
                }
            }else {
                //i번 펭귄새끼를 숨긴다
                //this.ResquePenguin[i].setToSetupPose();
                this.ResquePenguin[i].alpha = 0.0;
            }
        }
        //구조한 펭귄새끼가 없으면 메세지 띄우기
        this.RPmessage.visible = true;
        this.RPmessage2.visible = true;
        for(var i=0;i<this.pages;i++){
            if(this.PageClearNum(this.currentWorld, i) == (this.thumbRows * this.thumbCols)) {
                this.RPmessage.visible = false;
                this.RPmessage2.visible = false;
                break;
            }
        }
        this.text_world.x = this.game.world.centerX - (this.txtWorld.textWidth+15)/2;
        this.txtWorld.x = this.game.world.centerX + (this.text_world.width+15)/2; //월드 넘버 좌표 관리
        if(this.currentWorld == this.sign.num) this.sign.visible = false; //신규월드 알림창 관리
        this.MenuMuteON.loadTexture("atlas-1", MG.isSfx === true?"btn_sound_on_title.png":"btn_sound_off_title.png"); // menu 사운드 버튼 관리
    },
    HideMenu: function () {
        this.gGameAlpha1.visible = false;
        this.levelThumbsGroup.x = this.game.width * -1;//원위치

        for(var l = 0; l < 3; l++){//3페이지
            // looping through each level thumbnails
            for(var i = 0; i < this.thumbRows; i ++){
                for(var j = 0; j < this.thumbCols; j ++){
                    // which level does the thumbnail refer?
                    var pg = (this.currentPage-1) + l;//3개페이지중1개
                    if(pg<0) pg=0;
                    if(pg>9) pg=9;
                    var levelNumber = i*this.thumbCols+j+pg*(this.thumbRows*this.thumbCols) + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages);
                    this.levelThumb[(l * this.thumbRows*this.thumbCols)+i*this.thumbCols+j].ShowInfo(levelNumber, this.MovetoLevel(parseInt(levelNumber / (this.thumbRows * this.thumbCols * this.pages)), levelNumber % (this.thumbRows * this.thumbCols * this.pages)));
                }
            }
        }

        //console.log("----------------------------hidemenu");
        // for(var l = 0; l < this.pages; l++){
        //     // looping through each level thumbnails
        //     for(var i = 0; i < this.thumbRows; i ++){
        //         for(var j = 0; j < this.thumbCols; j ++){
        //             // which level does the thumbnail refer?
        //             var levelNumber = i*this.thumbCols+j+l*(this.thumbRows*this.thumbCols) + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages);
        //             if(levelNumber < (this.currentPage + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages))
        //                 && levelNumber > ((this.thumbRows * this.thumbCols) + this.currentPage + this.currentWorld * (this.thumbRows * this.thumbCols * this.pages)))
        //             {
        //                 this.levelThumb[(levelNumber%(this.thumbRows * this.thumbCols * this.pages))].HideInfo();
        //             }
        //         }
        //     }
        // }
    },
    StartGame: function() {

        this.CompareArray = [];
        this.OvenHintOn = 0;

        var HORIZONTAL = 0;
        var VERTICAL = 1;
        var tileSize = 113; //타일 사이즈
        this.ROW_SPACE = this.field.x; //가로 여백
        this.COL_SPACE = this.field.y; //세로 여백
        if((parseInt(MG.stage_num/(this.thumbRows * this.thumbCols * this.pages))%6) == 0) {
            this.field.loadTexture("bg_0");
        }else {
            this.field.loadTexture("bg_"+(parseInt(MG.stage_num/(this.thumbRows * this.thumbCols * this.pages))%6));
        } //월드에 따른 게임판 배경
        this.captain.addAnimationByName(0, "idle", true);
        this.pet.addAnimationByName(0, "idle", true);
        this.inputTime = performance.now(); //마우스 입력시간 초기화
        this.move = 0; // 움직임 횟수 초기화
        this.min_move_text.x = this.game.world.centerX+252; //condition위치 초기화
        MG.StopBgm(this.curBgm);
        this.curBgm = 'BGM_Game';
        MG.PlayBgm(this.curBgm, true);
        this.muteON.loadTexture("atlas-1", MG.isSfx === true?"btn_sound_on.png":"btn_sound_off.png");

        var levelArray = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];
        var that = this;
        //게이지 초기화
        this.gageMask.clear();
        this.gageMask.beginFill();
        this.gageMask.drawRect(this.game.world.centerX+148, this.game.world.centerY-380, 156, 14);
        this.gageMask.endFill();

        this.carsArray = JSON.parse(map[MG.stage_num]);
        this.ovenhint.inputEnabled = true;
        this.isSolved = false; // 퍼즐 탈출여부 확인
        this.gGameAlpha1.visible = false;
        this.gGameAlpha2.visible = false;
        //this.hintCnt.setText(MG.hint.x);
        //this.OpenHint();

        this.minimum_count = min_map[MG.stage_num]-1;
        this.stage_title_num.text = (parseInt(MG.stage_num/(this.thumbRows * this.thumbCols * this.pages))+1) + "-" + (MG.stage_num%(this.thumbRows * this.thumbCols * this.pages)+1);
        this.move_text.text = this.move;
        this.min_move_text.text = this.minimum_count;
        //최소이동 별 크기 초기화
        this.starX3.angle = 0;
        this.starX3.scale.setTo(1);
        this.starX2.angle = 0;
        this.starX2.scale.setTo(1);
        // 블럭충돌 스파인 초기화
        this.block_eff_h = this.game.add.spine(this.game.world.centerX, this.game.world.centerY, 'block_eff');
        this.block_eff_v = this.game.add.spine(this.game.world.centerX, this.game.world.centerY, 'block_eff');
        this.block_eff_h.angle = 0;
        this.block_eff_v.angle = 90;
        this.gBread.addChild(this.block_eff_h);
        this.gBread.addChild(this.block_eff_v);
        //1,2,3 스테이지용 손가락
        var finger = MG.AddSprite(that.gBread, 190, 715, "atlas-1", "finger.png");
        finger.visible = false;

        // now it's time to add all cars
        this.carShadow = [];
        this.carSprite = [];
        this.carEffect = [];
        this.offset = new Phaser.Point(0, 10);
        this.rndSprite_h2 = [undefined, undefined, undefined, undefined, undefined, undefined, "block_1_1_add.png", "block_1_1_add.png", "block_1_1_add_2.png", "block_1_1_add_2.png", "block_1_1_add_2.png", "block_1_1_add_3.png"];
        this.rndSprite_h3 = [undefined, undefined, undefined, undefined, undefined, undefined, "block_1_2_add.png", "block_1_2_add.png", "block_1_2_add_2.png", "block_1_2_add_2.png", "block_1_2_add_2.png", "block_1_2_add_3.png"];
        this.rndSprite_v2 = [undefined, undefined, undefined, undefined, undefined, undefined, "block_1_3_add.png", "block_1_3_add.png", "block_1_3_add_2.png", "block_1_3_add_2.png", "block_1_3_add_2.png", "block_1_3_add_3.png"];
        this.rndSprite_v3 = [undefined, undefined, undefined, undefined, undefined, undefined, "block_1_4_add.png", "block_1_4_add.png", "block_1_4_add_2.png", "block_1_4_add_2.png", "block_1_4_add_2.png", "block_1_4_add_3.png"];
        for(var i=this.carsArray.length-1;i>=0;i--) {
            // to keep the code clear, I assign carsArray[i] to a variable simply called "car"
            var car = this.carsArray[i];
            car.row = parseInt(car.p / 6);
            car.col = car.p % 6;
            if(car.l == 2)
                car.spr = tileSize * 2;
            else
                car.spr = tileSize * 3;
            // looping through car length
            for (var j = 0; j < car.l; j++) {
                // if the car is horizontal
                if (car.a == HORIZONTAL) {
                    // setting levelArray items overlapped by the car to 1 (not empty);
                    levelArray[car.row][car.col + j] = 1;
                }
                // if the car is vertical... (I know I could have used "else" but being a tutorial it looks better this way)
                if (car.a == VERTICAL) {
                    // setting levelArray items overlapped by the car to 1 (not empty);
                    levelArray[car.row + j][car.col] = 1;
                }
            }
            //그림자 추가
            if (car.a == HORIZONTAL) {
                this.carShadow[i] = MG.AddSprite(this.gShadow, (tileSize * car.col + tileSize * car.a + this.ROW_SPACE) + this.offset.x, (tileSize * car.row + this.COL_SPACE) + tileSize + this.offset.y, car.l == 2?"atlas-0":"atlas-1", car.l == 2?"shadow_h2.png":"shadow_h3.png", undefined, undefined, 0.0, 0.0);
            }
            if (car.a == VERTICAL) {
                this.carShadow[i] = MG.AddSprite(this.gShadow, (tileSize * car.col + tileSize * car.a + this.ROW_SPACE) - (tileSize) + this.offset.x, (tileSize * car.row + this.COL_SPACE) + (tileSize * car.l) + this.offset.y, "atlas-1", "shadow_v.png", undefined, undefined, 0.0, 0.0);
            }
            //블럭 스프라이트
            //this.carSprite[i] = this.game.add.sprite(tileSize * car.col + tileSize * car.a + this.ROW_SPACE, tileSize * car.row + this.COL_SPACE, car.a == HORIZONTAL?"block_h"+car.l:"block_v"+car.l);
            this.carSprite[i] = MG.AddSprite(this.gBread, tileSize * car.col + tileSize * car.a + this.ROW_SPACE, tileSize * car.row + this.COL_SPACE, "atlas-0", car.a == HORIZONTAL?"block_h"+car.l+".png":"block_v"+car.l+".png", undefined, undefined, 0.0, 0.0);

            this.carSprite[i].num = i;

            if(i == 0) {
                //첫번째 블럭은 whale 이미지로 교체
                this.carShadow[0].loadTexture("atlas-0", "mainblock_shadow.png");
                this.carSprite[0].loadTexture("atlas-0", "hollow_whale.png");
                this.cha = this.game.add.spine(101, 60, 'cha');
                this.cha.setAnimationByName(0, "idle", true);
                this.carSprite[0].addChild(this.cha);
            } else {
                //얼음블럭에만 반짝임 애니메이션 효과
                this.carEffect[i] = MG.AddSprite(this.carSprite[i], 0, 0, undefined, car.a == HORIZONTAL?"sparkle_h"+car.l:"sparkle_v"+car.l, undefined, undefined, 0.0, 0.0);
                this.carEffect[i].scale.set(2);
                this.carEffect[i].animations.add("sparkle");
                //this.carSprite[i].addChild(this.carEffect[i]);
                //두번째 블럭부터는 확률적으로 장식용 스프라이트 추가
                var Helix_Fossil = MG.AddSprite(this.carSprite[i], this.carSprite[i].width/2, tileSize/2, "atlas-0", "block_1_1_add.png");
                if(car.a == HORIZONTAL) {
                    if(car.l == 2) {
                        switch(this.rndSprite_h2[this.game.rnd.integerInRange(0, this.rndSprite_h2.length-1)]){
                            case "block_1_1_add.png":
                                Helix_Fossil.loadTexture("atlas-0", "block_1_1_add.png");
                                break;
                            case "block_1_1_add_2.png":
                                Helix_Fossil.loadTexture("atlas-0", "block_1_1_add_2.png");
                                break;
                            case "block_1_1_add_3.png":
                                Helix_Fossil.loadTexture("atlas-1", "block_1_1_add_3.png");
                                break;
                            default :
                                Helix_Fossil.loadTexture( "atlas-0", "hollow.png");
                                break;
                        }
                    }else {
                        switch(this.rndSprite_h3[this.game.rnd.integerInRange(0, this.rndSprite_h3.length-1)]){
                            case "block_1_2_add.png":
                                Helix_Fossil.loadTexture("atlas-1", "block_1_2_add.png");
                                break;
                            case "block_1_2_add_2.png":
                                Helix_Fossil.loadTexture("atlas-0", "block_1_2_add_2.png");
                                break;
                            case "block_1_2_add_3.png":
                                Helix_Fossil.loadTexture("atlas-0", "block_1_2_add_3.png");
                                break;
                            default :
                                Helix_Fossil.loadTexture( "atlas-0", "hollow.png");
                                break;
                        }
                    }
                }else {
                    if(car.l == 2) {
                        switch(this.rndSprite_v2[this.game.rnd.integerInRange(0, this.rndSprite_v2.length-1)]){
                            case "block_1_3_add.png":
                                Helix_Fossil.loadTexture("atlas-1", "block_1_3_add.png");
                                break;
                            case "block_1_3_add_2.png":
                                Helix_Fossil.loadTexture("atlas-0", "block_1_3_add_2.png");
                                break;
                            case "block_1_3_add_3.png":
                                Helix_Fossil.loadTexture("atlas-0", "block_1_3_add_3.png");
                                break;
                            default :
                                Helix_Fossil.loadTexture( "atlas-0", "hollow.png");
                                break;
                        }
                    }else {
                        switch(this.rndSprite_v3[this.game.rnd.integerInRange(0, this.rndSprite_v3.length-1)]){
                            case "block_1_4_add.png":
                                Helix_Fossil.loadTexture("atlas-1", "block_1_4_add.png");
                                break;
                            case "block_1_4_add_2.png":
                                Helix_Fossil.loadTexture("atlas-1", "block_1_4_add_2.png");
                                break;
                            case "block_1_4_add_3.png":
                                Helix_Fossil.loadTexture("atlas-0", "block_1_4_add_3.png");
                                break;
                            default :
                                Helix_Fossil.loadTexture( "atlas-0", "hollow.png");
                                break;
                        }
                    }
                }
            }
            // car sprite will be rotated by 90 degrees if the car is VERTICAL and by 0 degrees if the car is HORIZONTAL
            this.carSprite[i].angle = 90 * car.a;
            // Assigning to car sprite some custom data, adding them as an object. We'll store car position, direction and length
            this.carSprite[i].data = {
                row: car.row,
                col: car.col,
                a: car.a,
                l: car.l
            };
            // the car has input enabled
            this.carSprite[i].inputEnabled = true;
            // the car can be dragged
            this.carSprite[i].input.enableDrag();
            // the car will snap to a tileSize * tileSize grid but only when it's released
            this.carSprite[i].input.enableSnap(tileSize, tileSize, false, true, this.ROW_SPACE, this.COL_SPACE);
            // when the car starts to be dragged, call startDrag function
            this.carSprite[i].events.onDragStart.add(startDrag);
            // when the car stops to be dragged, call stopDrag function
            this.carSprite[i].events.onDragStop.add(stopDrag);
            // if car direction is VERTICAL then prevent the sprite to be dragged horizontally
            if (car.a == VERTICAL) {
                this.carSprite[i].input.allowHorizontalDrag = false;
            }
            // if car direction is HORIZONTAL then prevent the sprite to be dragged vertically
            if (car.a == HORIZONTAL) {
                this.carSprite[i].input.allowVerticalDrag = false;
            }
            this.gShadow.addChild(this.carShadow[i]);
            this.gBread.addChild(this.carSprite[i]);
        }
        this.gGame.addChild(this.gShadow);
        this.gGame.addChild(this.gBread);
        this.gBread.addChild(this.block_eff_h);
        this.gBread.addChild(this.block_eff_v);
        this.gGame.sendToBack(this.gShadow);
        this.gGame.moveUp(this.gShadow);
        this.gGame.bringToTop(this.gGameBG);
        /*this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(function () {
            this.gBread.destroy(true, true);
            MG.stage_num--;
            this.StartGame();
        }, this);
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(function () {
            this.gBread.destroy(true, true);
            MG.stage_num++;
            this.StartGame();
        }, this);*/

        function startDrag(s) {
            // send previous position of block
            // 터치한 블록이 무엇인지 저장
            that.touchSprite = s;
            that.Sprite_preX = s.x;
            that.Sprite_preY = s.y;
            that.pre_pos = (s.data.row*6) + s.data.col;
            //터치한 블록 외의 블록 터치 비활성화(동시 입력 막음)
            for(var i = 0; i <= that.carSprite.length-1; i++) {
                that.carSprite[i].input.enabled = false;
            }
            s.input.enabled = true;
            if(s.frameName == "hollow_whale.png") {
                that.cha.setAnimationByName(0, "move", true);
                MG.PlayAudio('SE_HeroMove');
            }else {
                that.carEffect[that.touchSprite.num].animations.play("sparkle", 12, false);
                MG.PlayAudio('SE_Block_Click');
                MG.PlayAudio('SE_BlockMove');
            }
            //s.width = s.width * 0.95;
            //s.height = s.height * 0.95;
            // declaring some variables here because I am using them
            var i;
            var from;
            var to;
            // if the car is horizontal...
            if (s.data.a == HORIZONTAL) {
                // from is the leftmost column occupied by the car
                from = s.data.col;
                // to is the rightmost column occupied by the car
                to = s.data.col + s.data.l - 1;
                // now we are going from the leftmost column backward until column zero, the first column
                for (i = s.data.col - 1; i >= 0; i--) {
                    // if it's an empty spot, then we update "from" position
                    if (levelArray[s.data.row][i] == 0) {
                        from = i;
                    }
                    // otherwise we exit the loop
                    else {
                        break;
                    }
                }
                // now we are going from the rightmost column forward until column five, the last column
                for (i = s.data.col + s.data.l; i < 6; i++) {
                    // if it's an empty spot, then we update "to" position
                    if (levelArray[s.data.row][i] == 0) {
                        to = i;
                    }
                    // otherwise we exit the loop
                    else {
                        break;
                    }
                }
                // at this time, we assign the car a bounding box which will limit its movements. Think about it as a fence,
                // the car cannot cross the fence
                s.input.boundsRect = new Phaser.Rectangle(from * tileSize+that.ROW_SPACE, s.y, (to - from + 1) * tileSize, tileSize);
                that.touchRect = s.input.boundsRect;
            }
            // the same thing applies to verical cars, just remember this time they are rotated by 90 degrees
            if (s.data.a == VERTICAL) {
                from = s.data.row;
                to = s.data.row + s.data.l - 1;
                for (i = s.data.row - 1; i >= 0; i--) {
                    if (levelArray[i][s.data.col] == 0) {
                        from = i;
                    } else {
                        break;
                    }
                }
                for (i = s.data.row + s.data.l; i < 6; i++) {
                    if (levelArray[i][s.data.col] == 0) {
                        to = i;
                    } else {
                        break;
                    }
                }
                s.input.boundsRect = new Phaser.Rectangle(s.x, from * tileSize+that.COL_SPACE, s.x + s.data.l * tileSize, (to - from + 2 - s.data.l) * tileSize);
                that.touchRect = s.input.boundsRect;
            }
        }
// function to be called when a car is not dragged anymore. "s" is the reference of the car itself
        function stopDrag(s) {
            if (that.touchSprite.angle == 0) {
                that.carShadow[that.touchSprite.num].x = that.touchSprite.x + that.offset.x;
                that.carShadow[that.touchSprite.num].y = that.touchSprite.y + that.touchSprite.height + that.offset.y;
            }
            if (that.touchSprite.angle == 90) {
                that.carShadow[that.touchSprite.num].x = that.touchSprite.x - that.touchSprite.height + that.offset.x;
                that.carShadow[that.touchSprite.num].y = that.touchSprite.y + that.touchSprite.width + that.offset.y;
            }
            //s.width = s.width / 0.95;
            //s.height = s.height / 0.95;
            for(var i = 0; i <= that.carSprite.length-1; i++) {
                that.carSprite[i].input.enabled = true;
            }
            // here we just update levelArray items according to the car we moved.
            that.touchSprite = null;
            that.touchRect = null;
            if(s.frameName == "hollow_whale.png") {
                if(levelArray[2][that.carSprite[0].data.col+2] == 1||levelArray[2][that.carSprite[0].data.col+3] == 1||levelArray[2][that.carSprite[0].data.col+4] == 1||levelArray[2][that.carSprite[0].data.col+5] == 1){
                    var cap_ani = that.captain.setAnimationByName(1, "touch", false);
                    cap_ani.onComplete = function (trackIndex) {
                        switch(trackIndex){
                            case 0:
                                break;
                            case 1:
                                that.captain.addAnimationByName(0, "idle", true);
                                break;
                        }
                    }.bind(this);
                    var cha_ani = that.cha.setAnimationByName(1, "touch", false);
                    cha_ani.onComplete = function (trackIndex) {
                        switch(trackIndex){
                            case 0:
                                break;
                            case 1:
                                that.cha.addAnimationByName(0, "idle", true);
                                break;
                        }
                    }.bind(this);
                }
            }
            // first, we set to zero all items where the car was initially placed
            for (var i = 0; i < s.data.l; i++) {
                if (s.data.a == HORIZONTAL) {
                    levelArray[s.data.row][s.data.col + i] = 0;
                }
                if (s.data.a == VERTICAL) {
                    levelArray[s.data.row + i][s.data.col] = 0;
                }
            }
            // then we set to 1 all items where the car is placed now
            if (s.data.a == HORIZONTAL) {
                s.data.col = (s.x-that.ROW_SPACE) / tileSize;
                for (i = 0; i < s.data.l; i++) {
                    levelArray[s.data.row][s.data.col + i] = 1;
                }
            }
            if (s.data.a == VERTICAL) {
                s.data.row = (s.y-that.COL_SPACE) / tileSize;
                for (i = 0; i < s.data.l; i++) {
                    levelArray[s.data.row + i][s.data.col] = 1;
                }
            }
            if(that.pre_pos != (s.data.row*6) + s.data.col) { //빵이 움직였으면
                if(finger.visible == false) that.move++; // 1,2,3 스테이지 가이드 떴을 때는 move 안늘어나도록 처리

                if(that.move > that.minimum_count*3) {
                    MG.heart.x--;
                    if (MG.heart.x <= 0){
                        // ---------------- 这里是结束的地方 ---------------- //
                        //MG.level
                        if ( window.parent != null ) {
                            window.parent.postMessage({
                                cmd: "GameOver",
                                msg: {
                                    score: 0, // 如果是星星数，也是这个分数
                                    level: MG.level
                                }
                            }, "*");
                        }
                    }
                    return;
                }

                that.gageMask.clear();
                that.gageMask.beginFill();
                that.gageMask.drawRect(that.game.world.centerX+148, that.game.world.centerY-380, 156-(52/that.minimum_count*that.move), 14);
                that.gageMask.endFill();
                that.move_text.text = that.move;
                if(that.move == that.minimum_count+1) {
                    MG.PlayAudio('SE_Star_Off');
                    MG.game.add.tween(that.starX3).to({angle: 270}, 600, Phaser.Easing.Linear.None, true, 300);
                    MG.game.add.tween(that.starX3.scale).to({x: 0, y: 0}, 600, Phaser.Easing.Back.In, true, 300).onComplete.add(function() {
                        that.min_move_text.x = that.game.world.centerX+200;
                        that.min_move_text.text = that.minimum_count * 2;
                    }, this);
                } //별 2개 조건
                if(that.move == that.minimum_count * 2) {
                    MG.PlayAudio('SE_Star_Off');
                    MG.game.add.tween(that.starX2).to({angle: 270}, 600, Phaser.Easing.Linear.None, true, 300);
                    MG.game.add.tween(that.starX2.scale).to({x: 0, y: 0}, 600, Phaser.Easing.Back.In, true, 300).onComplete.add(function() {
                        that.min_move_text.x = that.game.world.centerX+148;
                        that.min_move_text.text = that.minimum_count * 3;
                    }, this);
                } //별 1개 조건
            }
            that.carsArray[findArrayIndex(that.carsArray, function(obj) { return obj.p === that.pre_pos; })].row = s.data.row;
            that.carsArray[findArrayIndex(that.carsArray, function(obj) { return obj.p === that.pre_pos; })].col = s.data.col;
            that.carsArray[findArrayIndex(that.carsArray, function(obj) { return obj.p === that.pre_pos; })].p = (s.data.row*6) + s.data.col; //carsArray 갱신
            if(that.OvenHintOn == 1) {
                if (that.pre_pos == that.CompareArray[0][0] && (s.data.row * 6) + s.data.col == that.CompareArray[0][1]) {
                    that.CompareArray.shift();
                    that.gGhost.destroy(true, true);
                    that.arrow.destroy();
                    if(levelArray[2][that.carSprite[0].data.col+2] == 1||levelArray[2][that.carSprite[0].data.col+3] == 1||levelArray[2][that.carSprite[0].data.col+4] == 1||levelArray[2][that.carSprite[0].data.col+5] == 1){
                        that.hint_ghost();
                    }
                } // 빵이 힌트 위치에 들어가면 힌트 갱신
                if (that.pre_pos == that.CompareArray[0][0]) {
                    that.CompareArray[0][0] = (s.data.row * 6) + s.data.col;
                } // 빵이 힌트 위치에 안 들어가면 위치 갱신
            }
            /*var SolveCon = false;
            for(var i = carSprite.data.col+2;i < 6; i++) {
                if(levelArray[2][i] == 0)
                    SolveCon = true;
                else if(levelArray[2][i] == 1)
                    SolveCon = false;
                break;
            }*/
            //클리어 조건을 만족했을 때
            if (levelArray[2][that.carSprite[0].data.col+2] != 1&&levelArray[2][that.carSprite[0].data.col+3] != 1&&levelArray[2][that.carSprite[0].data.col+4] != 1&&levelArray[2][that.carSprite[0].data.col+5] != 1) {
                //1, 2, 3번 스테이지일 때
                if(MG.stage_num == 0 || MG.stage_num == 1 || MG.stage_num == 2) {
                    for(var i = 1; i <= that.carSprite.length-1; i++) {
                        that.carSprite[i].input.enabled = false;
                    }
                    that.ovenhint.inputEnabled = false;
                    that.gBread.bringToTop(finger);
                    finger.visible = true;
                    var finger_tween = MG.game.add.tween(finger).to( { x: '+113' }, 1000, Phaser.Easing.Linear.None, true, 300);
                    finger_tween.onComplete.add(function (){
                        finger.x = 207;
                        finger_tween.start();
                    }.bind(this));
                    that.carSprite[0].events.onDragStop.add(function () {
                        finger.visible = false;
                        that.ovenhint.inputEnabled = true;
                        puzzleSolved();
                    });
                }else {
                    //그 외 스테이지일 때
                    puzzleSolved();
                }
            }
        }
        function puzzleSolved(must) {
            if (must || (levelArray[2][that.carSprite[0].data.col+2] != 1&&levelArray[2][that.carSprite[0].data.col+3] != 1&&levelArray[2][that.carSprite[0].data.col+4] != 1&&levelArray[2][that.carSprite[0].data.col+5] != 1)) {
                //고래 탈출 전 준비
                that.isSolved = true;
                that.captain.setAnimationByName(0, "clear", true);
                that.pet.setAnimationByName(0, "clear", true);
                that.carShadow[0].loadTexture("atlas-0", "mainblock_clear_shadow.png");
                that.gClear.stage.alpha = 0.0;
                that.gClear.retry.visible = false;
                that.gClear.home.visible = false;
                that.gClear.nextG.visible = false;
                that.game.input.enabled = false;
                var clear_ani = that.cha.setAnimationByName(0, "clear_in", false);
                clear_ani.onComplete = function () {
                    MG.PlayAudio('SE_HeroEscape');
                    that.cha.addAnimationByName(0, "clear", true);
                    //that.move++;
                    //that.gageMask.clear();
                    //that.gageMask.beginFill();
                    //that.gageMask.drawRect(that.game.world.centerX+148, that.game.world.centerY-380, 156-(52/that.minimum_count*that.move), 14);
                    //that.gageMask.endFill();
                    //that.move_text.text = that.move;
                    MG.game.add.tween(that.carShadow[0]).to({ x: 1500 }, 1950, Phaser.Easing.Sinusoidal.In, true);
                    MG.game.add.tween(that.carSprite[0]).to({ x: 1500 }, 1950, Phaser.Easing.Sinusoidal.In, true).onComplete.add(function (){ //고래 탈출 후
                        if(MG.isSfx == true) {
                            MG.StopBgm('BGM_Game');
                        }
                        levelArray[2][that.carSprite[0].data.col] = levelArray[2][that.carSprite[0].data.col+1] = 0;
                        that.game.input.enabled = true;
                        that.gClear.clearText.text = that.stage_title_num.text;
                        that.gClear.clearWorld.x = 0 - (that.gClear.clearText.textWidth)/2;
                        that.gClear.clearText.x = 0 + (that.gClear.clearWorld.textWidth)/2; //클리어 스테이지 좌표 관리
                        //that.gClear.moveText.setText("MOVE "+that.move);
                        that.gClear.star_1.loadTexture("atlas-1", "star_ready_1_empty.png");
                        that.gClear.star_1.scale.setTo(0.9);
                        that.gClear.star_2.loadTexture("atlas-1", "star_ready_1_empty.png");
                        that.gClear.star_2.scale.setTo(1.0);
                        that.gClear.star_3.loadTexture("atlas-1", "star_ready_1_empty.png");
                        that.gClear.star_3.scale.setTo(0.9);
                        that.gClear.stage.loadTexture("atlas-1", "result_stage.png");
                        var clear_num = 1;
                        that.gClear.star_1.loadTexture("atlas-0", "star_ready_1.png");
                        that.gClear.star_1.alpha = 0.0;
                        that.gClear.star_1.scale.set(4);
                        that.gClear.bringToTop(that.gClear.star_1);
                        that.star1 = MG.game.add.tween(that.gClear.star_1.scale).to({x: 0.9, y: 0.9}, 600, Phaser.Easing.Exponential.In, true);
                        that.star1.onComplete.add(function(){MG.PlayAudio('SE_Star')}, this);
                        MG.game.add.tween(that.gClear.star_1).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true, 300);
                        if(that.move <= that.minimum_count*2) {
                            clear_num++;
                            that.gClear.star_2.loadTexture("atlas-0", "star_ready_1.png");
                            that.gClear.star_2.alpha = 0.0;
                            that.gClear.star_2.scale.set(4);
                            that.gClear.bringToTop(that.gClear.star_2);
                            that.star2 = MG.game.add.tween(that.gClear.star_2.scale).to({x: 1, y: 1}, 600, Phaser.Easing.Back.In, true, 300);
                            that.star2.onComplete.add(function(){MG.PlayAudio('SE_Star')}, this);
                            MG.game.add.tween(that.gClear.star_2).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true, 600);
                        }
                        if(that.move <= that.minimum_count) {
                            clear_num++;
                            that.gClear.star_3.loadTexture("atlas-0", "star_ready_1.png");
                            that.gClear.star_3.alpha = 0.0;
                            that.gClear.star_3.scale.set(4);
                            that.gClear.bringToTop(that.gClear.star_3);
                            that.star3 = MG.game.add.tween(that.gClear.star_3.scale).to({x: 0.9, y: 0.9}, 600, Phaser.Easing.Back.In, true, 600);
                            that.star3.onComplete.add(function(){MG.PlayAudio('SE_Star')}, this);
                            MG.game.add.tween(that.gClear.star_3).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true, 900);
                            that.gClear.stage.loadTexture("atlas-1", "result_perfect.png");
                        }
                        that.gClear.effect.visible = false;
                        var egg_page = parseInt((MG.stage_num%(that.thumbRows * that.thumbCols * that.pages))/(that.thumbRows * that.thumbCols));
                        that.PenguinAttatch(that.gClear.egg, egg_page);
                        switch(that.MovetoLevel(parseInt(MG.stage_num / (that.thumbRows * that.thumbCols * that.pages)), MG.stage_num % (that.thumbRows * that.thumbCols * that.pages))){
                            //클리어 팝업의 중앙 펭귄
                            case 0:
                                that.gClear.egg.setAnimationByName(0, "stage_clear_egg", true);
                                that.gClear.effect.visible = true;
                                break;
                            case 1:
                                that.gClear.egg.setAnimationByName(0, "idle_egg", true);
                                if(clear_num == 3) {
                                    that.gClear.effect.visible = true;
                                }
                                break;
                            case 2:
                                that.gClear.egg.setAnimationByName(0, "idle_egg", true);
                                if(clear_num == 3) {
                                    that.gClear.effect.visible = true;
                                }
                                break;
                            case 3:
                                that.gClear.egg.setAnimationByName(0, "idle", true);
                                break;
                        }
                        that.gClear.effect.onEvent.add(function (i, e) {
                            if(that.gClear.effect.visible) {
                                switch(e.data.name) {
                                    case "change":
                                        that.PenguinAttatch(that.gClear.egg, egg_page);
                                        MG.PlayAudio('SE_Change');
                                        if(clear_num == 3) {
                                            that.gClear.egg.setAnimationByName(0, "idle", true);
                                        }else {
                                            that.gClear.egg.setAnimationByName(0, "idle_egg", true);
                                        }
                                        break;
                                }
                            }
                        });
                        //CLEAR 문자&버튼 트윈 적용
                        var effect_delay = 300 + 300*clear_num;
                        that.gClear.addChild(that.gClear.effect);
                        that.game.time.events.add(effect_delay, function() {
                            that.gClear.effect.addAnimationByName(0, "stage_clear_eff", false);
                        }, that);
                        that.gClear.effect.state.onComplete = function () {
                            that.gClear.addChild(that.gClear.stage);
                            that.gClear.stage.scale.set(4);
                            var stagetext = MG.game.add.tween(that.gClear.stage.scale).to({x: 1.0, y: 1.0}, 600, Phaser.Easing.Exponential.In, true);
                            MG.PlayAudio('SE_StageClear');
                            MG.game.add.tween(that.gClear.stage).to({alpha: 1}, 100, Phaser.Easing.Linear.None, true, 300);
                            stagetext.onComplete.add(function() {
                                if(that.move > that.minimum_count*3) {
                                    MG.heart.x--;
                                    if (MG.heart.x <= 0){
                                        // ---------------- 这里是结束的地方 ---------------- //
                                        //MG.level
                                        if ( window.parent != null ) {
                                            window.parent.postMessage({
                                              cmd: "GameOver",
                                              msg: {
                                                score: 0, // 如果是星星数，也是这个分数
                                                level: MG.level
                                              }
                                            }, "*");
                                          }
                                        return;
                                    }
                                }

                                that.game.time.events.add(500, function() {
                                    that.gClear.retry.visible = true;
                                    that.gClear.home.visible = true;
                                    if((MG.stage_num+1)%(that.thumbRows * that.thumbCols * that.pages) == 0) //200 스테이지 클리어시 next버튼 안 보이도록
                                        that.gClear.nextG.visible = false;
                                    else
                                        that.gClear.nextG.visible = true;
                                }, this);
                            }, this);
                        }.bind(this);

                        var pre_PageStar = that.PageStarNum(that.currentWorld, that.currentPage); //클리어 이전 별개수 계산
                        if(MG.moveData[parseInt(MG.stage_num / (that.thumbRows * that.thumbCols * that.pages))][MG.stage_num % (that.thumbRows * that.thumbCols * that.pages)] == 0 || MG.moveData[parseInt(MG.stage_num / (that.thumbRows * that.thumbCols * that.pages))][MG.stage_num % (that.thumbRows * that.thumbCols * that.pages)] >= that.move) {
                            //최소이동 데이터 갱신
                            MG.moveData[parseInt(MG.stage_num / (that.thumbRows * that.thumbCols * that.pages))][MG.stage_num % (that.thumbRows * that.thumbCols * that.pages)] = that.move;
                            MG.storage.set('moveData', MG.moveData );
                        }
                        if((MG.stage_num%(that.thumbRows * that.thumbCols * that.pages)) == MG.level[that.currentWorld]) {
                            MG.moveData[parseInt(MG.stage_num / (that.thumbRows * that.thumbCols * that.pages))][(MG.stage_num % (that.thumbRows * that.thumbCols * that.pages))+1] = 0;
                            MG.level[that.currentWorld]++;
                            MG.storage.set('moveData', MG.moveData );
                            MG.storage.set('level', MG.level );
                        } // 최대 클리어 레벨 갱신
                        var PageStar = that.PageStarNum(that.currentWorld, that.currentPage); //클리어 이후 별개수 계산
                        if(pre_PageStar != PageStar && PageStar == (that.thumbRows * that.thumbCols * 3)) { //클리어 이전&이후 별개수 비교해서 이번 클리어로 펭귄 구조요건을 충족시키면
                            MG.PenguinArray.push(that.currentPage);
                            MG.storage.set('PenguinArray', MG.PenguinArray );
                            that.ResquePenguin[that.currentPage].pop = 1;
                        }
                        that.gHeart.visible = true; //하트 메뉴 표시
                        //that.currentWorld = parseInt((MG.stage_num+1)/(that.thumbRows * that.thumbCols * that.pages));
                        //that.currentPage = parseInt(MG.stage_num+1%(that.thumbRows * that.thumbCols * that.pages)/(that.thumbRows * that.thumbCols));
                        that.OpenPopup(that.gClear, that.gGameAlpha1);
                        that.currentPage = parseInt(((MG.stage_num+1)%(that.thumbRows * that.thumbCols * that.pages))/(that.thumbRows * that.thumbCols));
                        if(that.currentPage > 9) that.currentPage = 9;
                    }, this);
                }.bind(this);
            }
        }
    },
    GameAlphaPopup1: function () {
        //make the backAlpha of the message box
        var backAlpha = MG.AddSprite(this.gGameAlpha1, this.game.world.centerX, this.game.world.centerY, "atlas-0", "white.png", undefined, undefined, 0.5, 0.5, this.game.width, this.game.height);
        backAlpha.tint = 0x000000;
        backAlpha.inputEnabled = true;
    },
    GameAlphaPopup2: function () {
        //make the backAlpha of the message box
        var alpha_1 = MG.AddSpriteNine(this.gGameAlpha2, 360, 293, "atlas-0", "black_alpha_1.png", 720, 22, {top: 0, bottom: 0, left: 6, right: 6});
        alpha_1.tint = 0x000000;
        alpha_1.inputEnabled = true;
        var alpha_2 = MG.AddSpriteNine(this.gGameAlpha2, 360, 792, 'atlas-0', "black_alpha_2.png", 720, 976, {top: 6, bottom: 6, left: 6, right: 6});
        alpha_2.tint = 0x000000;
        alpha_2.inputEnabled = true;
    },
    ClearPopup: function () {
        //make the back of the message box
        this.gClear.star_ready_1 = MG.AddSprite(this.gClear, -143, -310, "atlas-1", "star_ready_1_empty.png");
        this.gClear.star_ready_1.scale.setTo(0.9);
        this.gClear.star_ready_2 = MG.AddSprite(this.gClear, 0, -320, "atlas-1", "star_ready_1_empty.png");
        this.gClear.star_ready_2.scale.setTo(1.0);
        this.gClear.star_ready_3 = MG.AddSprite(this.gClear, 143, -310, "atlas-1", "star_ready_1_empty.png");
        this.gClear.star_ready_3.scale.setTo(0.9);
        this.gClear.clearWorld = this.game.add.bitmapText(0, -220, "font", "WORLD ", 64);
        this.gClear.clearWorld.tint = 0xfddd5a;
        this.gClear.clearWorld.anchor.setTo(0.5);
        this.gClear.addChild(this.gClear.clearWorld);
        this.gClear.clearText = this.game.add.bitmapText(0, -220, "font", "", 64);
        this.gClear.clearText.anchor.setTo(0.5);
        this.gClear.addChild(this.gClear.clearText);
        this.gClear.stage = MG.AddSprite(this.gClear, 0, -100, "atlas-1", "result_stage.png");
        this.gClear.effect = this.game.add.spine(0, 145, 'stage_clear_eff');
        this.gClear.addChild(this.gClear.effect);
        this.gClear.egg = this.game.add.spine(0, 205, 'baby_all');
        this.gClear.addChild(this.gClear.egg);
        this.gClear.star_1 = MG.AddSprite(this.gClear, -143, -310, "atlas-1", "star_ready_1_empty.png");
        this.gClear.star_1.scale.setTo(0.9);
        this.gClear.star_2 = MG.AddSprite(this.gClear, 0, -320, "atlas-1", "star_ready_1_empty.png");
        this.gClear.star_2.scale.setTo(1.0);
        this.gClear.star_3 = MG.AddSprite(this.gClear, 143, -310, "atlas-1", "star_ready_1_empty.png");
        this.gClear.star_3.scale.setTo(0.9);
        this.gClear.retry = MG.MGButton.createAtlas(-170, 340, undefined, "atlas-0", "btn_retry.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                if(MG.heart.x > 0) {
                    this.HeartSpineAnimation(this.gClear.retry, 0, 0, "big", function () {
                        this.ClosePopup(this.gClear, this.gGameAlpha1, function () {
                            this.gHeart.visible = false;
                            this.gShadow.destroy(true, true);
                            this.gBread.destroy(true, true);
                            this.StartGame();
                        }.bind(this));
                    }.bind(this));
                }else {
                    MG.PlayAudio('SE_PopupOn');
                    MG.gHeartshop.visible = true;
                }
            }.bind(this)
        );
        this.gClear.retry.anchor.set(0.5, 0.5);
        this.gClear.addChild(this.gClear.retry);
        this.gClear.retry.onInputUp.add(this.PreventDouble, this);
        this.gClear.home = MG.MGButton.createAtlas(0, 340, undefined, "atlas-0", "hollow.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                this.ClosePopup(this.gClear, this.gGameAlpha1, function () {
                    this.gHeart.visible = true;
                    this.gMenu.visible = true;
                    this.gGame.visible = false;
                    this.gShadow.destroy(true, true);
                    this.gBread.destroy(true, true);
                    this.ShowMenu();
                    this.HideMenu();
                    MG.StopBgm(this.curBgm);
                    this.curBgm = 'BGM_Title';
                    MG.PlayBgm('BGM_Title', true);
                }.bind(this));
            }.bind(this)
        );
        this.gClear.home.anchor.set(0.5, 0.5);
        this.gClear.addChild(this.gClear.home);
        MG.AddSpriteNine(this.gClear.home, 0, 0, "atlas-0", "btn_ready_blue.png", 140, 106, {top: 80, bottom: 55, left: 0, right: 0});
        this.gClear.home.onInputUp.add(this.PreventDouble, this);
        this.gClear.homeText = this.game.add.bitmapText(0, -22, "world", "OK", 80);
        this.gClear.homeText.anchor.setTo(0.5);
        this.gClear.home.addChild(this.gClear.homeText);
        this.gClear.nextG = MG.MGButton.createAtlas(170, 340, undefined, "atlas-0", "btn_next.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                if(MG.heart.x > 0) {
                    this.HeartSpineAnimation(this.gClear.nextG, 0, 0, "big", function () {
                        this.ClosePopup(this.gClear, this.gGameAlpha1, function () {
                            this.gHeart.visible = false;
                            this.gShadow.destroy(true, true);
                            this.gBread.destroy(true, true);
                            MG.stage_num++;
                            this.StartGame();
                        }.bind(this));
                    }.bind(this));
                }else {
                    MG.PlayAudio('SE_PopupOn');
                    MG.gHeartshop.visible = true;
                }
            }.bind(this)
        );
        this.gClear.nextG.anchor.set(0.5, 0.5);
        this.gClear.addChild(this.gClear.nextG);
        this.gClear.nextG.onInputUp.add(this.PreventDouble, this);
    },
    GameStartPopup: function () {
        this.gGameStart.star_ready_1 = MG.AddSprite(this.gGameStart, -143, -310, "atlas-0", "star_ready_1.png");
        this.gGameStart.star_ready_1.scale.setTo(0.9);
        this.gGameStart.star_ready_2 = MG.AddSprite(this.gGameStart, 0, -320, "atlas-0", "star_ready_1.png");
        this.gGameStart.star_ready_2.scale.setTo(1.0);
        this.gGameStart.star_ready_3 = MG.AddSprite(this.gGameStart, 143, -310, "atlas-0", "star_ready_1.png");
        this.gGameStart.star_ready_3.scale.setTo(0.9);
        this.gGameStart.startWorld = this.game.add.bitmapText(0, -220, "font", "WORLD ", 64);
        this.gGameStart.startWorld.tint = 0xfddd5a;
        this.gGameStart.startWorld.anchor.setTo(0.5);
        this.gGameStart.addChild(this.gGameStart.startWorld);
        this.gGameStart.startText = this.game.add.bitmapText(0, -220, "font", "", 64);
        this.gGameStart.startText.anchor.setTo(0.5);
        this.gGameStart.addChild(this.gGameStart.startText);
        this.gGameStart.captain = this.game.add.spine(0, 110, 'captain');
        this.gGameStart.captain.addAnimationByName(0, "idle", true);
        this.gGameStart.addChild(this.gGameStart.captain);
        this.gGameStart.pet = this.game.add.spine(120, 100, 'pet');
        this.gGameStart.pet.addAnimationByName(0, "idle", true);
        this.gGameStart.addChild(this.gGameStart.pet);
        this.gGameStart.speech = MG.AddSprite(this.gGameStart, 180, -120, "atlas-1", 'speech.png');
        this.gGameStart.hurryup = MG.AddSprite(this.gGameStart, 180, -125, "atlas-0", 'text_hurryup.png');
        MG.AddSprite(this.gGameStart, 0, 200, "atlas-1", 'text_start.png');
        this.gGameStart.btn_ready_red = MG.MGButton.createAtlas(-120, 340, undefined, "atlas-0", "btn_ready_red.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                this.ClosePopup1(this.gGameStart, this.gGameAlpha1, function () {}.bind(this));
            }.bind(this)
        );
        this.gGameStart.btn_ready_red.anchor.set(0.5, 0.5);
        this.gGameStart.addChild(this.gGameStart.btn_ready_red);
        //MG.AddSpriteNine(this.gGameStart.btn_ready_red, 0, 0, 'btn_ready_red', '', 225, 106, {top: 80, bottom: 55, left: 0, right: 0});
        var spr = MG.AddSprite(this.gGameStart.btn_ready_red, 0, 0, "atlas-1", "text_back.png");
        spr.scale.set(0.9);
        this.gGameStart.btn_ready_blue = MG.MGButton.createAtlas(120, 340, undefined, "atlas-0", "btn_ready_blue.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                if(MG.heart.x > 0) {
                    this.HeartSpineAnimation(this.gGameStart.btn_ready_blue, 65, 0, "small", function () {
                        this.ClosePopup(this.gGameStart, this.gGameAlpha1, function () {
                            this.gHeart.visible = false;
                            this.gMenu.visible = false;
                            this.gGame.visible = true;
                            this.StartGame();
                        }.bind(this));
                    }.bind(this));
                }else {
                    MG.PlayAudio('SE_PopupOn');
                    MG.gHeartshop.visible = true;
                }
            }.bind(this)
        );
        this.gGameStart.btn_ready_blue.anchor.set(0.5, 0.5);
        this.gGameStart.addChild(this.gGameStart.btn_ready_blue);
        this.gGameStart.btn_ready_blue.onInputUp.add(this.PreventDouble, this);
        MG.AddSprite(this.gGameStart.btn_ready_blue, 77, 0, "atlas-0", "heart_hint.png");
        this.gGameStart.YES = this.game.add.bitmapText(-23, -15, "title", "START", 60);
        this.gGameStart.YES.anchor.setTo(0.5);
        this.gGameStart.btn_ready_blue.addChild(this.gGameStart.YES);
        //this.gGameStart.popupBG.angle = 90;
        //this.gGameStart.btn_ready_blue.angle -= this.gGameStart.popupBG.angle;
    },
    GameRewardPopup: function () {
        this.gGameReward.complet = this.game.add.spine(0, -100, 'mission_complete');
        this.gGameReward.addChild(this.gGameReward.complet);
        this.gGameReward.captain = this.game.add.spine(0, 170, 'baby_all');
        this.gGameReward.addChild(this.gGameReward.captain);
        //this.gGameReward.speech = MG.AddSprite(this.gGameReward, 180, -60, undefined, 'speech');
        //this.gGameReward.thanks = MG.AddSprite(this.gGameReward, 180, -65, undefined, 'text_thanks');
        //this.gGameReward.reward = MG.AddSprite(this.gGameReward, 0, 200, undefined, 'text_reward');
        this.gGameReward.intro = MG.AddText(this.gGameReward, 0, -60, "",
            { font: "32px Arial", fontWeight:'bold', stroke: "#1b6bb7", strokeThickness: 5, fill: "#FFFFFF", align: "center" }); //텍스트(내용은 Define에서 함수로 받아옴)
        this.gGameReward.reward = MG.AddText(this.gGameReward, 0, 410, "",
            { font: "24px Arial", fontWeight:'bold', stroke: "#1b6bb7", strokeThickness: 5, fill: "#FFFFFF", align: "center" }); //텍스트(내용은 Define에서 함수로 받아옴)
        this.gGameReward.btn_ready_blue = MG.MGButton.createAtlas(0, 550, undefined, "atlas-0", "btn_ready_blue.png");
        this.gGameReward.btn_ready_blue.anchor.set(0.5, 0.5);
        this.gGameReward.addChild(this.gGameReward.btn_ready_blue);
        this.gGameReward.btn_ready_blue.visible = false;
        this.gGameReward.btn_ready_blue.events.onInputUp.add(function () {
            MG.PlayAudio('SE_Click');
            this.ClosePopup1(this.gGameReward, this.gGameAlpha2, function () {
                if(MG.PenguinArray != null) {
                    if(MG.PenguinArray.length>0) { //표시할 펭귄이 더 있으면 구조 팝업 띄우는 동시에 상단 펭귄 UFO 스파인 작동
                        this.game.world.bringToTop(this.gGameReward);
                        MG.PlayAudio('SE_MISSION_OK');
                        //this.gGameReward.complet.state.clearTracks();
                        var complete_in = this.gGameReward.complet.setAnimationByName(1, "mission_complete_in", false);
                        this.OpenPopup(this.gGameReward, this.gGameAlpha2);
                        complete_in.onComplete = function (trackIndex) {
                            switch(trackIndex){
                                case 0:
                                    break;
                                case 1:
                                    this.gGameReward.complet.addAnimationByName(0, "mission_complete_idle", true);
                                    this.gGameReward.intro.setText(GetString("baby_"+(MG.PenguinArray[0]+1)));
                                    this.gGameReward.reward.setText(GetString("baby_"+(MG.PenguinArray[0]+1)+"_profile"));
                                    this.PenguinAttatch(this.gGameReward.captain, MG.PenguinArray[0]);
                                    this.gGameReward.captain.setAnimationByName(0, "idle_in_mission_com", false);
                                    this.gGameReward.captain.addAnimationByName(0, "idle_mission_com", true);
                                    this.ResquePenguin[MG.PenguinArray[0]].alpha = 1.0;
                                    MG.PlayAudio('SE_BabyPenguin_On');
                                    this.ResquePenguin[MG.PenguinArray[0]].state.clearTracks();
                                    this.ResquePenguin[MG.PenguinArray[0]].addAnimationByName(0, "idle_top_open", false, 1000);
                                    this.ResquePenguin[MG.PenguinArray[0]].addAnimationByName(0, "idle_top", true);
                                    this.ResquePenguin[MG.PenguinArray[0]].state.onComplete = function () {
                                        this.gGameReward.btn_ready_blue.visible = true;
                                    }.bind(this);
                                    this.ResquePenguin[MG.PenguinArray[0]].pop = 0;
                                    MG.PenguinArray.shift();
                                    MG.storage.set('PenguinArray', MG.PenguinArray );
                                    break;
                            }
                        }.bind(this);
                    }
                }
            }.bind(this));
        }, this);
        this.gGameReward.YES = this.game.add.bitmapText(-0, -15, "title", "OK", 70);
        this.gGameReward.YES.anchor.setTo(0.5);
        this.gGameReward.btn_ready_blue.addChild(this.gGameReward.YES);
    },
    HeartshopPopup: function() {
        ShopContent();
        ShopContent.Init(0, 5, "Banner");
        ShopContent.Init(1, 25, "Movie");
        ShopContent.Init(2, 5, "Banner");
        ShopContent.Init(3, 10, "Movie");
        this.game.world.bringToTop(this.gHeart);
    },
    TutorialPopup: function () {
        MG.AddSprite(this.gTutorial, 0, -360, "atlas-0", "title_tutorial.png");
        MG.AddSprite(this.gTutorial, 0, 15, "atlas-0", "tutorial_img.png");
        MG.AddSprite(this.gTutorial, -160, -30, "atlas-0", "tutorial_1.png");
        MG.AddSprite(this.gTutorial, 45, -30, "atlas-0", "tutorial_2.png");
        MG.AddSprite(this.gTutorial, 210, -30, "atlas-1", "tutorial_3.png");
        MG.AddText(this.gTutorial, 0, 390, GetString("tuto_1"), { font: "30px Arial", fontWeight:'bold', stroke: "#1b6bb7", strokeThickness: 5, fill: "#FFFFFF", align: "center" });
        this.gTutorial.btn_close = MG.MGButton.createAtlas(300, -580, undefined, "atlas-0", "btn_close.png"
            ,function(){
                MG.PlayAudio('SE_Click');
                this.ClosePopup1(this.gTutorial, this.gGameAlpha1, function () {}.bind(this));
            }.bind(this)
        );
        this.gTutorial.btn_close.anchor.set(0.5, 0.5);
        this.gTutorial.addChild(this.gTutorial.btn_close);
    },
    IngamePopup: function () {
        this.gIngame.popupBG = MG.AddSprite(this.gIngame, 0, 0, "atlas-1", "popup_message.png"); //배경 스프라이트
        this.gIngame.BGcrop = new Phaser.Rectangle(0, 100, this.gIngame.popupBG.width, this.gIngame.popupBG.height);
        this.gIngame.popupBG.crop(this.gIngame.BGcrop);
        this.gIngame.title = MG.AddSprite(this.gIngame, 0, -190, "atlas-1", "title.png"); //팝업 명칭 들어갈 얼음조각
        this.gIngame.title_1 = MG.AddSprite(this.gIngame, 0, -270, "atlas-0", "title_1.png"); //얼음조각 위에 올릴 눈더미
        this.gIngame.startMove = this.game.add.bitmapText(0, -55, "title", "", 80); //팝업 명칭 비트맵폰트 선언
        this.gIngame.startMove.anchor.setTo(0.5);
        this.gIngame.title.addChild(this.gIngame.startMove);
        this.gIngame.startText = MG.AddText(this.gIngame, 0, -60, "",
            { font: "32px Arial", fontWeight:'bold', stroke: "#1b6bb7", strokeThickness: 5, fill: "#FFFFFF", align: "center" }); //텍스트(내용은 Define에서 함수로 받아옴)
        this.gIngame.btn_ready_red = MG.MGButton.createAtlas(-130, 80, undefined, "atlas-0", "btn_ready_red.png"//NO버튼
            ,function(){ //NO버튼 클릭시
                MG.PlayAudio('SE_Click');
                this.ClosePopup1(this.gIngame, this.gGameAlpha1, function () {
                    this.gHeart.visible = false;
                }.bind(this));
            }.bind(this)
        );
        this.gIngame.btn_ready_red.anchor.set(0.5, 0.5);
        this.gIngame.addChild(this.gIngame.btn_ready_red);
        MG.AddSprite(this.gIngame.btn_ready_red, 0, 0, "atlas-0", "text_no.png");
        this.gIngame.btn_ready_blue = MG.MGButton.createAtlas(130, 80, undefined, "atlas-0", "btn_ready_blue.png"
            ,function(){ //YES버튼 클릭시
                MG.PlayAudio('SE_Click');
                switch(this.Ingamebutton){
                    case 1: //재시작
                        if(MG.heart.x > 0) {
                            this.HeartSpineAnimation(this.gIngame.btn_ready_blue, 65, 0, "small", function () {
                                this.ClosePopup(this.gIngame, this.gGameAlpha1, function () {
                                    this.gHeart.visible = false;
                                    this.gShadow.destroy(true, true);
                                    this.gBread.destroy(true, true);
                                    this.StartGame();
                                }.bind(this));
                            }.bind(this));
                        }else {
                            MG.PlayAudio('SE_PopupOn');
                            MG.gHeartshop.visible = true;
                        }
                        break;
                    case 2: //힌트 사용
                        this.ClosePopup1(this.gIngame, this.gGameAlpha1, function () {
                            this.gHeart.visible = false;
                            this.OvenHintOn = 1;
                            //this.hintCnt.setText(MG.hint.x);
                            this.ovenhint.inputEnabled = false;
                            this.gGhost = this.game.add.group(); //수정 필요
                            this.OpenHint();
                            this.hint_ghost();
                        }.bind(this));
                        break;
                    case 3: //돌아가기
                        this.ClosePopup(this.gIngame, this.gGameAlpha1, function () {
                            this.gHeart.visible = true;
                            this.gMenu.visible = true;
                            this.gGame.visible = false;
                            this.gShadow.destroy(true, true);
                            this.gBread.destroy(true, true);
                            this.ShowMenu();
                            this.HideMenu();
                            MG.StopBgm(this.curBgm);
                            this.curBgm = 'BGM_Title';
                            MG.PlayBgm('BGM_Title', true);
                            /*for(var i=0;i<this.gBread.children.length;+i)
                            {
                                this.gBread.children[i].destroy();
                            }*/
                            //console.log("this.gBread : " + this.gBread.children.length);
                        }.bind(this));
                        break;
                }
            }.bind(this)
        );
        this.gIngame.btn_ready_blue.anchor.set(0.5, 0.5);
        this.gIngame.addChild(this.gIngame.btn_ready_blue);
        this.gIngame.btn_ready_blue.onInputUp.add(this.PreventDouble, this);
        this.gIngame.heart = MG.AddSprite(this.gIngame.btn_ready_blue, 0, 0, "atlas-0", "white.png");
        this.gIngame.YES = this.game.add.bitmapText(0, -15, "title", "YES", 70);
        this.gIngame.YES.anchor.setTo(0.5);
        this.gIngame.btn_ready_blue.addChild(this.gIngame.YES);
    },
    HeartMenu: function() {
        //하트 메뉴
        this.heartcount = MG.AddSprite(this.gHeart, 158, 54, "atlas-0", 'panel_1.png');
        //MG.AddSpriteNine(this.gHeart, this.game.world.centerX-190, this.game.world.centerY-580, 'panel_1', '', 302, 93, {top: 0, bottom: 0, left: 20, right: 20});
        this.heartsprite = MG.AddSprite(this.heartcount, -100, -15, "atlas-1", 'heart.png');
        /*this.btn_plus = MG.MGButton.createAtlas(100, -20, undefined, "atlas-0", 'btn_plus.png'
            ,function(){
                MG.PlayAudio('SE_Click');
                //this.OpenPopup(MG.gHeartshop);
                MG.PlayAudio('SE_PopupOn');
                MG.gHeartshop.visible = true;
            }.bind(this)
        );
        this.btn_plus.anchor.set(0.5, 0.5);
        this.heartcount.addChild(this.btn_plus);*/
        this.txtLifeCnt = this.game.add.bitmapText(0, -14, "world_no", "", 60);
        this.txtLifeCnt.anchor.setTo(0.5);
        this.heartsprite.addChild(this.txtLifeCnt);
        /*this.txtLifeTime = this.game.add.bitmapText(0, -35, "font", "", 70);
        this.txtLifeTime.anchor.setTo(0.5);
        this.txtLifeTime.tint = 0xfa9705;
        this.heartcount.addChild(this.txtLifeTime);*/
        //console.log(this.game.cache.getBitmapFont("font_border")["font"]);
    },
    OpenPopup: function (popup, backalpha) {
        if(backalpha != undefined) {
            backalpha.alpha = 0.83;
            backalpha.visible = true;
            this.popupCount++;
        }
        popup.visible = true;
        popup.scale.set(0, 0);
        MG.PlayAudio('SE_PopupOn');
        this.game.add.tween(popup.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Elastic.Out, true);
    },
    ClosePopup1: function (popup, backalpha, callback) {
        MG.PlayAudio('SE_PopupOff');
        if(this.popupCount == 1) backalpha.visible = false;
        this.popupCount--;
        popup.visible = false;
        callback();
        /*this.game.add.tween(popup.scale).to({x: 0.3, y: 0.3}, 300, Phaser.Easing.Quintic.Out, true).onComplete.add(function() {
            if(this.popupCount == 1) backalpha.visible = false;
            this.popupCount--;
            popup.visible = false;
            callback();
        }, this);*/
    },
    ClosePopup: function (popup, backalpha, callback) {
        //this.easter.scale.setTo(60, 60);
        var ClosePopup = this.game.add.tween(this.easter.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Linear.None, true);
        ClosePopup.onStart.add(function() {
            MG.PlayAudio('SE_Screen_Close');
        }, this);
        ClosePopup.onComplete.add(function() {
            this.trans.visible = true;
            this.game.add.tween(this.easter.scale).to({x: 60, y: 60}, 1000, Phaser.Easing.Linear.None, true, 500).onStart.add(function() {
                this.trans.visible = false;
                if(this.popupCount == 1) backalpha.visible = false;
                this.popupCount--;
                popup.visible = false;
                callback();
            }, this);
        }, this);
    },
    Transition: function() {
        var easter = MG.AddSprite(this.game.world, this.game.world.centerX, this.game.world.centerY, "atlas-0", "circle_mask.png", undefined, undefined, 0.5, 0.5, this.game.width*60, this.game.height*60);
        var ClosePopup = this.game.add.tween(easter.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Linear.None, true);
        ClosePopup.onComplete.add(function() {
            easter.destroy();
        }, this);
    },
    PreventDouble: function(button) {
        button.inputEnabled = false;
        this.game.time.events.add(3000, function() {
            button.inputEnabled = true;
        }, this);
    },
    OpenHint: function () {
        var parkString = "";
        for (var i = 0; i < this.carsArray.length; i++)
        {
            var car = this.carsArray[i];
            if(i==0)
                parkString = "{6x6:" + car.p + "-" + car.a + "-" + car.l;
            else if(i==this.carsArray.length-1)
                parkString += "," + car.p + "-" + car.a + "-" + car.l +"}";
            else
                parkString += ","+ car.p + "-" + car.a + "-" + car.l;
        }
        var pl = new park(parkString);
        this.solutions = parkSpaceLogic.StartSearch(pl); //calculate solution

        for(var i=0;i<this.solutions.datas.length;i++) {
            for (var j=0;j<this.solutions.datas[i].pos.length;j++) {
                if (this.solutions.datas[i].Prepark.pos[j] != this.solutions.datas[i].pos[j]) {
                    this.CompareArray[i] = [this.solutions.datas[i].Prepark.pos[j], this.solutions.datas[i].pos[j], this.solutions.datas[i].length[j]];
                } else continue;
            }
        }
    },
    hint_ghost: function () {

        var tileSize = 113; //타일 사이즈
        var that = this;

        var data = this.CompareArray[0][1] - this.CompareArray[0][0];
        var car = [];
        car.row = parseInt(this.CompareArray[0][1] / 6);
        car.col = this.CompareArray[0][1] % 6;
        if(Math.abs(data) < 6)
            car.a = 0;
        else if(Math.abs(data) >= 6)
            car.a = 1;
        if(Math.abs(data) == data)
            car.d = 0;
        else if(Math.abs(data) != data)
            car.d = 180;
        // 이동할 빵 이외의 빵은 입력 잠금
        this.selected = findArrayIndex(this.carSprite, function(obj) { return obj.x === (tileSize * (that.CompareArray[0][0] % 6)) + tileSize * car.a + that.ROW_SPACE && obj.y === tileSize * parseInt(that.CompareArray[0][0] / 6) + that.COL_SPACE && obj.angle === car.a * 90; });
        for(var i = 0; i <= that.carSprite.length-1; i++) {
            that.carSprite[i].input.enabled = false;
        }
        this.carSprite[this.selected].inputEnabled = true;
        // hint_ghost_left 세팅
        this.hint_ghost_left = MG.AddSprite(this.gGhost, tileSize * car.col + tileSize * car.a + this.ROW_SPACE, tileSize * car.row + this.COL_SPACE, "atlas-0", 'hint.png', undefined, undefined, 0, 0);
        this.hint_ghost_left.angle = 90 * car.a;
        this.arrow = MG.AddSprite(this.carSprite[this.selected], (tileSize * this.CompareArray[0][2])/2, tileSize/2, "atlas-0", 'hint_arrow.png', undefined, undefined, 0.5, 0.5);
        // hint_ghost_right 세팅
        if(car.a == 0) {
            this.hint_ghost_right = MG.AddSprite(this.gGhost, tileSize * car.col + this.ROW_SPACE + (tileSize * this.CompareArray[0][2]), tileSize * car.row + this.COL_SPACE, "atlas-0", 'hint.png', undefined, undefined, 0, 0);
            this.hint_ghost_right.scale.x *= -1;
            this.arrow.angle = (90 * car.a) + car.d;
        } else if(car.a == 1) {
            this.hint_ghost_right = MG.AddSprite(this.gGhost, tileSize * car.col + tileSize * car.a + this.ROW_SPACE, tileSize * car.row + this.COL_SPACE + (tileSize * this.CompareArray[0][2]), "atlas-0", 'hint.png', undefined, undefined, 0, 0);
            this.hint_ghost_right.scale.x *= -1;
            this.arrow.angle = (90 * car.a) + car.d - 90;
        }
        this.hint_ghost_right.angle = 90 * car.a;
        MG.PlayAudio('SE_Hint');
        this.gBread.addChild(this.gGhost);
    },
    OpenNewWorld: function() {
        for(var i=1;i<=this.worlds;i++) {
            if(MG.moveData[i-1][199] > 0 && MG.moveData[i][0] == undefined) {
                MG.moveData[i][0] = 0;
                MG.level[i] = 0;
                this.sign.visible = true;
                this.sign.num = i;
            }
        }
    },
    HeartSpineAnimation: function (parent, x, y, type, callback) {
        var heart = this.game.add.spine(x, y, 'heart'); //스파인생성
        parent.addChild(heart);
        heart.addAnimationByName(0, "heart_out", false); //애니호출
        //MG.heart.x--;
        MG.storage.set('heart', MG.heart );
        MG.PlayAudio('SE_Heart');
        //this.game.input.enabled = false;
        /*heart.state.onstart = function (){
            this.gMenu.setAll('input.enabled', false);
            this.gGame.setAll('input.enabled', false);
        };*/
        heart.state.onComplete = function () {
            heart.state.clearTracks();
            heart.parent.removeChild(heart);
            callback();
            //this.game.input.enabled = true;
        }.bind(this);
    },
    MovetoLevel: function (a, b) {
        if(MG.moveData[a][b] > 0) {
            if(MG.moveData[a][b] <= min_map[a*200+b]-1) return 3;
            if(MG.moveData[a][b] <= min_map[a*200+b]*2) return 2;
            else return 1;
        }
        else
            return MG.moveData[a][b];
    },
    WorldStarNum: function(a) {
        //현재 월드 총 별개수 계산
        var starsum = 0;
        for(var i=0;i<MG.moveData[a].length;i++) {
            starsum += this.MovetoLevel(a, i);
        }
        return starsum;
    },
    PageStarNum: function(a, b) {
        //현재 페이지 총 별개수 계산
        var starsum = 0;
        for(var i=b*this.thumbRows*this.thumbCols;i<(b*this.thumbRows*this.thumbCols)+(this.thumbRows*this.thumbCols);i++) {
            if(this.MovetoLevel(a, i) != undefined) starsum += this.MovetoLevel(a, i);
            else continue;
        }
        return starsum;
    },
    PageClearNum: function(a, b) {
        //현재 페이지 클리어 스테이지 계산
        var starsum = 0;
        for(var i=b*this.thumbRows*this.thumbCols;i<(b*this.thumbRows*this.thumbCols)+(this.thumbRows*this.thumbCols);i++) {
            if(this.MovetoLevel(a, i) > 1) starsum += 1;
            else continue;
        }
        return starsum;
    },
    PenguinAttatch: function(parent, number) {
        parent.setToSetupPose();
        switch(number){
            case 0:
                parent.skeleton.setAttachment("baby", "baby_1");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2", "eye_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                parent.skeleton.setAttachment("baby_1_flower", "baby_1_flower");
                break;
            case 1:
                parent.skeleton.setAttachment("baby", "baby_2");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2", "eye_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                break;
            case 2:
                parent.skeleton.setAttachment("baby", "baby_3");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2_2", "eye_2_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                break;
            case 3:
                parent.skeleton.setAttachment("baby", "baby_4");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2", "eye_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                break;
            case 4:
                parent.skeleton.setAttachment("baby", "baby_5");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2", "eye_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                break;
            case 5:
                parent.skeleton.setAttachment("baby", "baby_6");
                break;
            case 6:
                parent.skeleton.setAttachment("baby", "baby_7");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2", "eye_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                break;
            case 7:
                parent.skeleton.setAttachment("baby", "baby_8");
                break;
            case 8:
                parent.skeleton.setAttachment("baby", "baby_9");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2", "eye_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                break;
            case 9:
                parent.skeleton.setAttachment("baby", "baby_10");
                parent.skeleton.setAttachment("eye_1", "eye_1");
                parent.skeleton.setAttachment("eye_2", "eye_2");
                parent.skeleton.setAttachment("eye_3", "eye_3");
                break;
        }
    },
    update: function () {

        if(this.touchSprite != null) {
            //그림자가 블록 따라다니도록
            if (this.touchSprite.angle == 0) {
                this.carShadow[this.touchSprite.num].x = this.touchSprite.x + this.offset.x;
                this.carShadow[this.touchSprite.num].y = this.touchSprite.y + this.touchSprite.height + this.offset.y;
            }
            if (this.touchSprite.angle == 90) {
                this.carShadow[this.touchSprite.num].x = this.touchSprite.x - this.touchSprite.height + this.offset.x;
                this.carShadow[this.touchSprite.num].y = this.touchSprite.y + this.touchSprite.width + this.offset.y;
            }
            //블럭간 충돌 이펙트 관리
            if(this.touchSprite.angle == 0 && this.touchSprite.width != this.touchRect.width && this.Sprite_preX != this.touchSprite.x) {
                if(this.touchSprite.x == this.touchRect.x) {
                    MG.PlayAudio('SE_BlockCrash');
                    this.block_eff_h.x = this.touchRect.x;
                    this.block_eff_h.y = this.touchRect.y+this.touchRect.height/2;
                    this.block_eff_h.setAnimationByName(0, "block_eff", false);
                    this.Sprite_preX = this.touchSprite.x;
                }
                if(this.touchSprite.x == (this.touchRect.x + this.touchRect.width - this.touchSprite.width)) {
                    MG.PlayAudio('SE_BlockCrash');
                    this.block_eff_h.x = this.touchRect.x+this.touchRect.width;
                    this.block_eff_h.y = this.touchRect.y+this.touchRect.height/2;
                    this.block_eff_h.setAnimationByName(0, "block_eff", false);
                    this.Sprite_preX = this.touchSprite.x;
                }
            }else if(this.touchSprite.angle == 90 && this.touchSprite.height != this.touchRect.height && this.Sprite_preY != this.touchSprite.y) {
                if(this.touchSprite.y == this.touchRect.y) {
                    MG.PlayAudio('SE_BlockCrash');
                    this.block_eff_v.x = this.touchRect.x-this.touchSprite.height/2;
                    this.block_eff_v.y = this.touchRect.y;
                    this.block_eff_v.setAnimationByName(0, "block_eff", false);
                    this.Sprite_preY = this.touchSprite.y;
                }
                if(this.touchSprite.y == (this.touchRect.y + this.touchRect.height - this.touchSprite.height)) {
                    MG.PlayAudio('SE_BlockCrash');
                    this.block_eff_v.x = this.touchRect.x-this.touchSprite.height/2;
                    this.block_eff_v.y = this.touchRect.y+this.touchRect.height - this.touchSprite.height + this.touchSprite.width;
                    this.block_eff_v.setAnimationByName(0, "block_eff", false);
                    this.Sprite_preY = this.touchSprite.y;
                }
            }
        }

        //마우스 입력 없을시 아이들 연출
        if(this.carSprite != null) {
            this.game.input.onDown.add(function(){
                this.inputTime = performance.now();
            }, this);
            if(performance.now() >= this.inputTime + 5000 && this.isSolved == false) {
                MG.PlayAudio('SE_HeroWaiting');
                this.cha.setAnimationByName(0, "idle_2", false);
                this.cha.addAnimationByName(0, "idle", true);
                this.inputTime = performance.now();
            }
        }
        //하트 충전 시간 관리
        if(MG.heart.x < MG.heartMax) {
            this.timedelay -= deltaTime;
            if(this.timedelay <= 0){
                MG.heart.x++;
                MG.storage.set('heart', MG.heart );
                this.timedelay += MG.heartAddTime;
                var tdata = {};
                tdata.heart = MG.heart.x;
                //networkManager.AppDataPut(JSON.stringify(tdata));
            }
        }
        else{
            this.timedelay = MG.heartAddTime;
        }
        this.txtLifeCnt.text = MG.heart.x.toString();
        /*if(MG.heart.x < MG.heartMax)
            this.txtLifeTime.text = leadingZeros(Mathfloor(this.timedelay/60), 2) + ":" + leadingZeros(Mathfloor(this.timedelay%60), 2);
        else
            this.txtLifeTime.text = "MAX";*/
        updateTick();
        //NetworkManager.prototype.Update();
    }
};

window[''] = window[''] || {};
window[''].Game = Game;





