'use strict';

var _bombEffecter = _bombEffecter||{};

_bombEffecter.Instance = (function ()
{
    var _Instance = {};
    const ARRAY_COUNT = 5;
    var bomb_animation_name = [ "bomb_spring", "bomb_summer", "bomb_autumn", "bomb_winter" ];
    var bomb_autumn_spine = new Array(ARRAY_COUNT);
    var bomb_spring_spine = new Array(ARRAY_COUNT);
    var bomb_summer_spine = new Array(ARRAY_COUNT);
    var bomb_winter_spine = new Array(ARRAY_COUNT);
    var autumn_index = 0;
    var spring_index = 0;
    var summer_index = 0;
    var winter_index = 0;

    _Instance.Ready = function () {
        for(var i = 0; i < ARRAY_COUNT; i++) {
            bomb_autumn_spine[i] = MG.game.add.spine(-1000, 0, 'bomb_autumn');
            bomb_spring_spine[i] = MG.game.add.spine(-1000, 0, 'bomb_spring');
            bomb_summer_spine[i] = MG.game.add.spine(-1000, 0, 'bomb_summer');
            bomb_winter_spine[i] = MG.game.add.spine(-1000, 0, 'bomb_winter');
        }
    };

    _Instance.Init = function () {
        for(var i = 0; i < ARRAY_COUNT; i++) {
            bomb_autumn_spine[i].position.setTo(-1000, 0);
            bomb_spring_spine[i].position.setTo(-1000, 0);
            bomb_summer_spine[i].position.setTo(-1000, 0);
            bomb_winter_spine[i].position.setTo(-1000, 0);
        }
        autumn_index = 0;
        spring_index = 0;
        summer_index = 0;
        winter_index = 0;
    };

    _Instance.Start_Bomb_Effect = function (_x, _y) {

        var inx = parseInt((stageManager.GetSeason12(ballManager.Get_Current_Months_Count()) - 1) / 3);

        switch(bomb_animation_name[inx].toString()) {
            case "bomb_autumn":
                bomb_autumn_spine[autumn_index].position.setTo(_x, _y);
                bomb_autumn_spine[autumn_index].setAnimationByName(0, "bomb_autumn", false);
                if(++autumn_index >= ARRAY_COUNT) autumn_index = 0;
                break;

            case "bomb_spring":
                bomb_spring_spine[spring_index].position.setTo(_x, _y);
                bomb_spring_spine[spring_index].setAnimationByName(0, "bomb_spring", false);
                if(++spring_index >= ARRAY_COUNT) spring_index = 0;
                break;

            case "bomb_summer":
                bomb_summer_spine[summer_index].position.setTo(_x, _y);
                bomb_summer_spine[summer_index].setAnimationByName(0, "bomb_summer", false);
                if(++summer_index >= ARRAY_COUNT) summer_index = 0;
                break;

            case "bomb_winter":
                bomb_winter_spine[winter_index].position.setTo(_x, _y);
                bomb_winter_spine[winter_index].setAnimationByName(0, "bomb_winter", false);
                if(++winter_index >= ARRAY_COUNT) winter_index = 0;
                break;
        }
    };

    return _Instance;
}
)();