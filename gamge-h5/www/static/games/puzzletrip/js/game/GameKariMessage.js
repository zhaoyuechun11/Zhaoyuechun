gc.GameKariMessage = function(){
    PIXI.Container.call(this);

    this.showMessage = true;

    this.messageTimer = null;
    this.timeoutTimer = null;
    this.mesTime = 8000;
    this.removeTime = 4000;
    this.messageText = [[],['Hello, Nice to meet you!','  You have to check \nthe number of times left!',' Drag six puzzles \n and get out the special puzzles!','If you have 8 puzzles,\nyou have a more powerful puzzle','Purple puzzles \ncan be made with three shoes.'],
        ['Nha Hao！', 'Lance Ninh Kao Xing!','  You have to check \nthe number of times left!',' Drag six puzzles \n and get out the special puzzles!','  If you have 8 puzzles,\nyou have a more powerful puzzle','Purple puzzles \ncan be made with three shoes.'],
        ['Ahlan and Saffron!','사룹두 두벨리캅','  You have to check \nthe number of times left!',' Drag six puzzles \n and get out the special puzzles!','  If you have 8 puzzles,\nyou have a more powerful puzzle','Purple puzzles \ncan be made with three shoes.'],
        ['Beast! ',' Shepherd','  You have to check \nthe number of times left!',' Drag six puzzles \n and get out the special puzzles!','  If you have 8 puzzles,\nyou have a more powerful puzzle','Purple puzzles\ncan be made with three shoes.'],
        ['Rice cake!','엉셩띠드부 꼬네뜨','  You have to check \nthe number of times left!',' Drag six puzzles \n and get out the special puzzles!','  If you have 8 puzzles,\nyou have a more powerful puzzle','Purple puzzles \ncan be made with three shoes.'],
        ['Up!','Muette Prazar!','  You have to check \nthe number of times left!',' Drag six puzzles \n and get out the special puzzles!','  If you have 8 puzzles,\nyou have a more powerful puzzle','Purple puzzles \ncan be made with three shoes.'],
        ['Hi!','Nice to miti!','  You have to check \nthe number of times left!',' Drag six puzzles \n and get out the special puzzles!','  If you have 8 puzzles,\nyou have a more powerful puzzle','Purple puzzles \ncan be made with three shoes.']];

    this.uiSpeechs1 = [[],['ui_speech_0001.png','ui_speech_0002.png'],['ui_speech_0003.png','ui_speech_0004.png'],['ui_speech_0005.png','ui_speech_0006.png']
                        ,['ui_speech_0007.png','ui_speech_0008.png'],['ui_speech_0009.png','ui_speech_0010.png'],['ui_speech_0011.png','ui_speech_0012.png']
                        ,['ui_speech_0013.png','ui_speech_0014.png']];
    this.uiSpeechs2 = ['ui_speech_0015.png','ui_speech_0016.png','ui_speech_0017.png','ui_speech_0018.png'];

    this.messageBg = PIXI.Sprite.fromFrame("ui_speech_0001.png");
    this.messageBg.x = GD.width/2;
    this.messageBg.y = GD.height*0.1;
    this.messageBg.anchor.set(0.5,0.5);

    //this.messageTextSprite = new PIXI.Text('',{fontSize:'18px',fontWeight : 'bold'});
    //this.messageTextSprite.x = GD.width/2;
    //this.messageTextSprite.y = GD.height*0.095;
    //this.messageTextSprite.anchor.set(0.5,0.5);

};

//ㅇㅇㅇㅇ
gc.GameKariMessage.constructor = gc.GameKariMessage;
gc.GameKariMessage.prototype = Object.create(PIXI.Container.prototype);

gc.GameKariMessage.prototype.startMessage = function () {
    this.messageTimer = setInterval(function () {
        if(this.showMessage)
            this.startTime();
    }.bind(this),this.mesTime);
}

gc.GameKariMessage.prototype.startTime = function () {
    if(gc.isPaused) return;
    var num = (Math.floor(Math.random()*10000))%6;

    if(num < 2){
        this.messageBg.texture = PIXI.Texture.fromFrame(this.uiSpeechs1[Math.ceil(this.parent.stageNum/2)][num]);
    }else{
        this.messageBg.texture = PIXI.Texture.fromFrame(this.uiSpeechs2[num-2]);
    }

    //this.messageTextSprite.text = this.messageText[Math.ceil(this.parent.stageNum/2)][num]+"";
    this.addChild(this.messageBg);
    //this.addChild(this.messageTextSprite);
    this.timeoutTimer = setTimeout(function () {
        //this.removeChild(this.messageTextSprite);
        this.removeChild(this.messageBg);
    }.bind(this),this.removeTime);
}

gc.GameKariMessage.prototype.stopAllTime = function(){
    clearInterval(this.messageTimer);
    clearTimeout(this.timeoutTimer);
}

gc.GameKariMessage.prototype.updateTransform = function() {

    PIXI.Container.prototype.updateTransform.call(this);
};