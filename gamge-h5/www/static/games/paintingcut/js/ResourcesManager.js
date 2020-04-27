
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
    'image': [
        ['lineDot', 'assets/atlas/lineDot.png?v='+Define.IMG_VER],
        ['lineDot_SuperBuff', 'assets/atlas/lineDot_SuperBuff.png?v='+Define.IMG_VER],
        ['lineDot90_SuperBuff', 'assets/atlas/lineDot90_SuperBuff.png?v='+Define.IMG_VER],
        ['touch_ring', 'assets/atlas/touch_ring.png?v='+Define.IMG_VER],
        ['finger_flick', 'assets/atlas/finger_flick.png?v='+Define.IMG_VER],
        ['blank', 'assets/atlas/blank.png?v='+Define.IMG_VER],
        ['wall', 'assets/atlas/lineDot.png?v='+Define.IMG_VER],
        ['warningBG', 'assets/atlas/BG/warningBG.png?v='+Define.IMG_VER],
        ['blackTexture', 'assets/atlas/BG/BG_black.png?v='+Define.IMG_VER]
    ],
    'atlas': [
        ['atlas_UI', 'assets/atlas/ui/ui.png?v='+Define.IMG_VER, 'assets/atlas/ui/ui.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY],
        ['atlas_BG', 'assets/atlas/BG_Atlas.png?v='+Define.IMG_VER, 'assets/atlas/BG_Atlas.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY],
        ['atlas_topBG', 'assets/atlas/top_Atlas.png?v='+Define.IMG_VER, 'assets/atlas/top_Atlas.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY],
        ['atlas_bottomBG', 'assets/atlas/bottom_Atlas.png?v='+Define.IMG_VER, 'assets/atlas/bottom_Atlas.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY],
        ['atlas_pencil', 'assets/atlas/pencil.png?v='+Define.IMG_VER, 'assets/atlas/pencil.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY],
        ['atlas_tutorial', 'assets/atlas/tutorials/tutorial.png?v='+Define.IMG_VER, 'assets/atlas/tutorials/tutorial.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY],
        ['atlas_bomb', 'assets/atlas/bomb.png?v='+Define.IMG_VER, 'assets/atlas/bomb.json?v='+Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY]
    ],
    'spine': [
        ['basic_game_animation', 'assets/spine/ready_go_clear.json?v='+Define.IMG_VER],
        ['fever_text', 'assets/spine/fever_text.json?v='+Define.IMG_VER],
        ['fever_roller', 'assets/spine/fever_roller.json?v='+Define.IMG_VER],
        ['title', 'assets/spine/title.json?v='+Define.IMG_VER],
        ['months_animation', 'assets/spine/months_paper.json?v='+Define.IMG_VER],
        ['enemy_balls', 'assets/spine/enemy_ball.json?v='+Define.IMG_VER],
        ['bomb_autumn', 'assets/spine/bomb_autumn.json?v='+Define.IMG_VER],
        ['bomb_spring', 'assets/spine/bomb_spring.json?v='+Define.IMG_VER],
        ['bomb_summer', 'assets/spine/bomb_summer.json?v='+Define.IMG_VER],
        ['bomb_winter', 'assets/spine/bomb_winter.json?v='+Define.IMG_VER],
        ['item_slot', 'assets/spine/item_slot.json?v='+Define.IMG_VER],
        ['shield_broken', 'assets/spine/shield_broken.json?v='+Define.IMG_VER],
        ['shield_broken_ui', 'assets/spine/shield_broken_ui.json?v='+Define.IMG_VER],
        ['time_top_icon', 'assets/spine/time_icon.json?v='+Define.IMG_VER],
        ['oops_time_broken', 'assets/spine/oops_time_broken.json?v='+Define.IMG_VER],
        ['buff_item_info', 'assets/spine/item_eff.json?v='+Define.IMG_VER]
    ],
    'audio': [
        ['se_click', [
            'assets/sound/SE_Click.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Click.ogg?v='+Define.SND_VER]],
        ['se_clear', [
            'assets/sound/SE_Clear.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Clear.ogg?v='+Define.SND_VER]],
        ['se_crash', [
            'assets/sound/SE_Crash.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Clear.ogg?v='+Define.SND_VER]],
        ['se_popup_on', [
            'assets/sound/SE_PopupOn.mp3?v='+Define.SND_VER,
            'assets/sound/SE_PopupOn.ogg?v='+Define.SND_VER]],
        ['se_popup_off', [
            'assets/sound/SE_PopupOff.mp3?v='+Define.SND_VER,
            'assets/sound/SE_PopupOff.ogg?v='+Define.SND_VER]],
        ['se_item_show', [
            'assets/sound/SE_ItemShow.mp3?v='+Define.SND_VER,
            'assets/sound/SE_ItemShow.ogg?v='+Define.SND_VER]],
        ['se_item_idle', [
            'assets/sound/SE_ItemIdle.mp3?v='+Define.SND_VER,
            'assets/sound/SE_ItemIdle.ogg?v='+Define.SND_VER]],
        ['se_line_super', [
            'assets/sound/SE_Line_Super.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Line_Super.ogg?v='+Define.SND_VER]],
        ['se_stop_relent', [
            'assets/sound/SE_Stop_Relent.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Stop_Relent.ogg?v='+Define.SND_VER]],
        ['se_shield', [
            'assets/sound/SE_Shield.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Shield.ogg?v='+Define.SND_VER]],
        ['se_hurryUp', [
            'assets/sound/SE_HurryUp.mp3?v='+Define.SND_VER,
            'assets/sound/SE_HurryUp.ogg?v='+Define.SND_VER]],
        ['se_time_over', [
            'assets/sound/SE_TimeOver.mp3?v='+Define.SND_VER,
            'assets/sound/SE_TimeOver.ogg?v='+Define.SND_VER]],
        ['se_tear', [
            'assets/sound/SE_Tear.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Tear.ogg?v='+Define.SND_VER]],
        ['se_newRecord', [
            'assets/sound/SE_NewRecord.mp3?v='+Define.SND_VER,
            'assets/sound/SE_NewRecord.ogg?v='+Define.SND_VER]],
        ['se_increase', [
            'assets/sound/SE_Increase.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Increase.ogg?v='+Define.SND_VER]],
        ['se_fever_play', [
            'assets/sound/SE_Fever_Play.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Fever_Play.ogg?v='+Define.SND_VER]],
        ['se_fever_play_01', [
            'assets/sound/SE_Fever_Play_01.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Fever_Play_01.ogg?v='+Define.SND_VER]],
        ['se_fever_play_02', [
            'assets/sound/SE_Fever_Play_02.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Fever_Play_02.ogg?v='+Define.SND_VER]],
        ['se_fever_ready', [
            'assets/sound/SE_Fever_Ready.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Fever_Ready.ogg?v='+Define.SND_VER]],
        ['se_item_get', [
            'assets/sound/SE_ItemGet.mp3?v='+Define.SND_VER,
            'assets/sound/SE_ItemGet.ogg?v='+Define.SND_VER]],
        ['se_land_get', [
            'assets/sound/SE_LandGet.mp3?v='+Define.SND_VER,
            'assets/sound/SE_LandGet.ogg?v='+Define.SND_VER]],
        ['se_line', [
            'assets/sound/SE_Line.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Line.ogg?v='+Define.SND_VER]],
        ['se_start', [
            'assets/sound/SE_Start.mp3?v='+Define.SND_VER,
            'assets/sound/SE_Start.ogg?v='+Define.SND_VER]],
        ['bgm_title', [
            'assets/sound/BGM_Title.mp3?v='+Define.SND_VER,
            'assets/sound/BGM_Title.ogg?v='+Define.SND_VER],'bgm'],
        ['bgm_game', [
            'assets/sound/BGM_Game.mp3?v='+Define.SND_VER,
            'assets/sound/BGM_Game.ogg?v='+Define.SND_VER],'bgm']
    ],
    'bitmapFont':[
        ['uiFont', 'assets/atlas/font/font-export.png?v='+Define.IMG_VER, 'assets/atlas/font/font-export.xml?v='+Define.IMG_VER],
        ['uiFontBlack', 'assets/atlas/font/font-export-black.png?v='+Define.IMG_VER, 'assets/atlas/font/font-export-black.xml?v='+Define.IMG_VER],
        ['numberFont_Pink', 'assets/atlas/font/font_time-export.png?v='+Define.IMG_VER, 'assets/atlas/font/font_time-export.xml?v='+Define.IMG_VER],
        ['numberFont_Shop', 'assets/atlas/font/font_shop-export.png?v='+Define.IMG_VER, 'assets/atlas/font/font_shop-export.xml?v='+Define.IMG_VER],
        ['numberFont_1fbb99', 'assets/atlas/font/font_1fbb99-export.png?v='+Define.IMG_VER, 'assets/atlas/font/font_1fbb99-export.xml?v='+Define.IMG_VER],
        ['numberFont_mission', 'assets/atlas/font/mission_no-export.png?v='+Define.IMG_VER, 'assets/atlas/font/mission_no-export.xml?v='+Define.IMG_VER]
    ]
};

ResourcesManager.MenuLoader ={

};

ResourcesManager.GameLoader ={

};


window[''] = window[''] || {};
window[''].ResourcesManager = ResourcesManager;



