MGButton = function (game) {
    this.game = game;
};
MGButton.prototype = {
    preload: function () {

    },
    create: function () {
    },
    createAtlas: function (x, y, text , atlasName,  over, click, out, down, callOver, callOut, callDown) {

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
            this.game.add.tween(button.scale).from( { x: 1.1, y: 1.1 }, 200, Phaser.Easing.Bounce.Out, true).onComplete.add(function () {
                button.scale.setTo(1);
                button.alpha = 1;
                if(click !== undefined)click();
            }, this);
        }, this);

        return button;
    },
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
            this.game.add.tween(button.scale).from( { x: 1.1, y: 1.1 }, 200, Phaser.Easing.Bounce.Out, true).onComplete.add(function () {
                button.scale.setTo(1);
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