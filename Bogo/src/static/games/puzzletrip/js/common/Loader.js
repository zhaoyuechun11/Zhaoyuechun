gc.Loader = function()
{
    PIXI.Container.call(this);


};
gc.Loader.constructor = gc.Loader;
gc.Loader.prototype = Object.create(PIXI.Container.prototype);


gc.Loader.prototype.init = function()
{
    this.background = null;
    this.loadingBar = null;
    this.ready = false;
    this.tween = null;

    var bg = new PIXI.Graphics();
    bg.beginFill(0x000, 1);
    bg.drawRect(0, 0, GD.width, GD.height);
    bg.endFill();
    this.addChild(bg);

    var frames = [];
    for(var i = 1; i <= 1; ++i)
    {
        frames.push(PIXI.Sprite.fromImage(RES_DIR_IMG + "special_airplane_ani" + i + ".png"));
    }
    this.character = new PIXI.extras.AnimatedSprite(frames);
    this.character.loop = true;
    this.character.animationSpeed = 0.3;
    this.character.anchor.set(0.5);
    this.character.scale.set(0.5);
    this.character.x = GD.width * 0.5;
    this.character.y = GD.height * 0.5;
    this.addChild(this.character);
    this.character.gotoAndStop(0);

    this.count = 0;

    this.tween = TweenMax.to(this.character,0.5,{y:"-=50",repeat:-1,yoyo:true});

};

gc.Loader.prototype.killAni = function () {
    try {
        this.tween.kill(false);
    }catch(e){

    }
};

gc.Loader.prototype.updateTransform = function()
{
    PIXI.Container.prototype.updateTransform.call(this);

    //this.count++;
    //
    //if(this.count % 3 == 0)
    //{
    //    var num = parseInt(this.count / 3);
    //    this.character.gotoAndStop(num);
    //}
    //
    //if(this.count > 21)
    //{
    //    this.count = 0;
    //}
}


