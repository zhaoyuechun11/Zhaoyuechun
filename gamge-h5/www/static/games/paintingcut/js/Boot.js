'use strict';
// utils, sound
var MG = MoviGame('utils','audio', function() { });

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
    }
};

window[''] = window[''] || {};
window[''].Boot = Boot;





