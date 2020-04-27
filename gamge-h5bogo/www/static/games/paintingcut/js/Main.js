Define.LANDSCAPE = false;

 window.onload = function () {
    //'use strict';
    var game
        , mg = window[''];

   if(Define.LANDSCAPE === true)
       game = new Phaser.Game(1280, 720, Phaser.CANVAS, 'game');
   else
       game = new Phaser.Game(720, 1280, Phaser.CANVAS, 'game');


    game.state.add('boot', mg.Boot);
    game.state.add('preloader', mg.Preloader);
    // game.state.add('menu', mg.Menu);
    game.state.add('game', mg.Game);

    game.state.start('boot');

};