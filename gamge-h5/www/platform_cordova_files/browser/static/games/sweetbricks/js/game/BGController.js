BGController = function (game) {
    this.updatecnt = 0;
    this.game = game;
    this.gameState = game.state.states[game.state.current];
    this.utilities = this.gameState.utilities;
};

BGController.prototype = {
    bias_v: 0.048,
    minRoadSpeed: 2 * 5,
    maxRoadSpeed: 15 * 5,

    startTimeLen: 3,
    goalTimeLen: 3,

    starTime: 3,

    init: function () { //게임시작2-2, 게임재시작2-2
        if (dm) console.log("- BGController.init");
        //블록깨기-----------
        this.Background = CreateUIBackground(0);
        //블록깨기-----------
    },

    destroy: function () { //게임재시작1-7
        //console.log("--- BGController.destroy----");

        if(typeof this.Background.z_cellophane === 'undefined' || this.Background.z_cellophane === null) return;
        this.Background.z_cellophane.destroy(true);
        this.Background.texarr=[];

        var bglen = this.Background.texarr.length;
        this.Background.z_dlbg.destroy(true);

        this.game = null;
        this.gameState = null;
        this.utilities = null;


        //this.road = null;
    },

    update: function () { },

    updateStartBG: function () {

    },
    updateGoalBG: function () {

    },
    updateBooster: function () {

    }

};
