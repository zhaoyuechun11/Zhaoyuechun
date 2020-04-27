'use strict';

var _buffItemManager = _buffItemManager||{};
var inOrder_iter = -1;

_buffItemManager.Instance = (function () {
    var _Instance = {};
    var type_array = ['super', 'stop', 'lifeUp', 'timePlus', 'fever'];
    var buffItem_spine;
    var screen_animation;

    _Instance.Ready = function () {
        buffItem_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'buff_item_info');
        this.Deactive_BuffItem();

        var font_style = { font: "30px Arial", fill: "#ffffff", align: "center", fontWeight: "bold" };
        var stop_item_info_text = MG.game.add.text(0, 0, GetString("SUPER"), font_style);
        stop_item_info_text.anchor.setTo(0.5);
        stop_item_info_text.strock = '#395d7b';
        stop_item_info_text.strokeThickness = 4;
        var super_item_info_text = MG.game.add.text(0, 0, GetString("STOP", MG.gameSheetsData["StopSkillTime"]), font_style);
        super_item_info_text.anchor.setTo(0.5);
        super_item_info_text.strock = '#395d7b';
        super_item_info_text.strokeThickness = 4;
        var stop_item_node = FindSpineNode(buffItem_spine, "item_info_text_2");
        var super_item_node = FindSpineNode(buffItem_spine, "item_info_text_1");
        stop_item_node.addChild(stop_item_info_text);
        super_item_node.addChild(super_item_info_text);

        // 스크린 4면 가장자리 이펙트
        screen_animation = new ScreenOutline_Animation(250);
        screen_animation.LoadingSprite();
    };

    _Instance.ScreenAnimation = function (_isStart) {
        if(_isStart) {
            screen_animation.Start_SpriteAnimation();
        } else {
            screen_animation.Stop_SpriteAnimation();
        }
    };

    // 버프 아이템 실행
    _Instance.ActiveBuff = function (buffType) {
         // buffType = "stop";      // dEBUG..
        switch(buffType)
        {
            case "super":
                if(currentScene == "game") {
                    isSuperItem = true;
                    this.Active_Super_BuffItem();
                }
                break;

            case "stop":
                if(stateManager.onStopSkill()) {
                    this.Active_Stop_BuffItem();
                    ballManager.StopSkill_Start();
                }
                break;

            case "lifeUp":
                gHeart++;
                assetManager.UpdateHeartText();
                break;

            case "timePlus":
                assetManager.AddTime(30);
                break;

            case "fever":
                if(stateManager.onFeverMode()) feverManager.SuccessFever();
                break;
        }
    };

    _Instance.Get_BuffItem_Type = function () {
        if(MG.gameSheetsData["BuffCreation"] == "random") {
            return RandomSet_BuffType();
        } else if(MG.gameSheetsData["BuffCreation"] == "inOrder"){
            return InOrder_BuffType();
        } else {
            return MG.gameSheetsData["BuffCreation"];
        }
    };

    function RandomSet_BuffType() {
        var returnTypeStr;
        var addInt = 0;
        var rndInt = getRandomIntInclusive(1, 100);

        // 무적 -> 정지 -> 실드 -> 시간 -> 피버 순으로 처리
        if(rndInt > 0 && rndInt <= MG.gameSheetsData["SuperRatio"]) returnTypeStr = "super";
        addInt = MG.gameSheetsData["SuperRatio"];
        if(rndInt > addInt && rndInt <= addInt + MG.gameSheetsData["StopRatio"]) returnTypeStr = "stop";
        addInt += MG.gameSheetsData["StopRatio"];
        if(rndInt > addInt && rndInt <= addInt + MG.gameSheetsData["ShieldRatio"]) returnTypeStr = "lifeUp";
        addInt += MG.gameSheetsData["ShieldRatio"];
        if(rndInt > addInt && rndInt <= addInt + MG.gameSheetsData["TimeUpRatio"]) returnTypeStr = "timePlus";
        addInt += MG.gameSheetsData["TimeUpRatio"];
        if(rndInt > addInt && rndInt <= addInt + MG.gameSheetsData["FeverRatio"]) returnTypeStr = "fever";

        return returnTypeStr;
    }

    function InOrder_BuffType() {
        if(++inOrder_iter >= type_array.length) inOrder_iter = 0;
        return type_array[inOrder_iter];
    }

    // function getRandomIntInclusive(min, max) {
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    _Instance.EndDrawLine_CallBack = function () {
        if(isSuperItem) {
            this.Deactive_BuffItem();
            isSuperItem = false;
        }
    };

    function FindSpineNode ( SpineObj, NodeName ) {
        return SpineObj.children[SpineObj.skeleton.findSlotIndex(NodeName)];
    }

    //////////////////////////////////////////
    // Spine Animation
    //////////////////////////////////////////

    _Instance.Active_Stop_BuffItem = function () {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_item_show');
        buffItem_spine.visible = true;
        buffItem_spine.setAnimationByName(0, 'item_ani_stop_in', true);
        MG.game.world.bringToTop(buffItem_spine);
        buffItem_spine.state.onComplete = function () {
            currentScene = 'game';
            buffItem_spine.setAnimationByName(0, 'item_ani_stop_idle', true);
        };
    };

    _Instance.Deactive_BuffItem = function () {
        buffItem_spine.visible = false;
    };

    _Instance.Active_Super_BuffItem = function () {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_item_show');
        //currentScene = 'super_buffItem';
        buffItem_spine.visible = true;
        buffItem_spine.setAnimationByName(0, 'item_ani_super_in', true);
        MG.game.world.bringToTop(buffItem_spine);
        buffItem_spine.state.onComplete = function () {
            currentScene = 'game';
            buffItem_spine.setAnimationByName(0, 'item_ani_super_idle', true);
        };
    };

    return _Instance;
}
)();