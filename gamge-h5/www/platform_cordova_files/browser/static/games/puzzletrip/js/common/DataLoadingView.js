gc.DataLoadingView = function()
{
    PIXI.Container.call(this);
};
gc.DataLoadingView.constructor = gc.DataLoadingView;
gc.DataLoadingView.prototype = Object.create(PIXI.Container.prototype);

gc.DataLoadingView.prototype.init = function()
{
    var bg = new PIXI.Graphics();
    bg.lineStyle(0);
    bg.beginFill(0x000000, 0.7);
    bg.drawRect(0, 0, 720, 1190);
    bg.endFill();
    this.addChild(bg);

    this.loadCircle = new gc.MovieClip("puzzle_loading000",1,7,0.5,0);
    //this.loadCircle = PIXI.Sprite.fromFrame("btn_identify.png");
    this.loadCircle.anchor.set(0.5,0.5);
    this.loadCircle.x = GD.width/2;
    this.loadCircle.y = GD.height/2;
    this.addChild(this.loadCircle);
};

gc.DataLoadingView.prototype.updateTransform = function()
{
    PIXI.Container.prototype.updateTransform.call( this );
    //this.loadCircle.rotation += 0.1;
};
