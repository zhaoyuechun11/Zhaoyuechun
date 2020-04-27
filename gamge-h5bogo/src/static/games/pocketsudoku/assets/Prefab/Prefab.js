

/**
* Miss
* @param {Phaser.Game} aGame A reference to the currently running game.
* @param {Number} aX The x coordinate (in world space) to position the Sprite at.
* @param {Number} aY The y coordinate (in world space) to position the Sprite at.
* @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
* @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
*/
function Prefab(aGame, aX, aY, aKey, aFrame) {
	Phaser.Sprite.call(this, aGame, aX, aY, aKey || 'data02', aFrame == undefined || aFrame == null? 'miss' : aFrame);
	this.anchor.setTo(0.5, 0.5);
	this.fLive = true;
}

/** @type Phaser.Sprite */
var Prefab_proto = Object.create(Phaser.Sprite.prototype);
Prefab.prototype = Prefab_proto;
Prefab.prototype.constructor = Prefab;

/* --- end generated code --- */
//-- user code here --
Prefab.prototype.start = function(temp,target)
{
	this.name ="skip";
	this.inputEnabled  = false;
    switch(temp)
	{
		case _EFFECT_IMAGE.ONETIME:
			
			this.x = this.game.width /2;
			var tween1 = this.game.add.tween(this.position).to({y:600}, 800, Phaser.Easing.Elastic.Out,false,400);
			var tween2 = this.game.add.tween(this).to({alpha:0.5}, 500, Phaser.Easing.Linear.Out,false,0);			
			
			tween2.onComplete.add(this.end,this);
			tween1.chain(tween2);
			tween1.start();
			break;
		case _EFFECT_IMAGE.GOOD:
			this.x = this.game.width /2;
			this.y = 560;
			this.scale.setTo(4,4);
			var tween1 = this.game.add.tween(this.scale).to({x:1.2,y:1.2}, 600, Phaser.Easing.Linear.None,false,0);
			var tween2 = this.game.add.tween(this).to({alpha:0.5}, 300, Phaser.Easing.Linear.Out,false,600);						
			
			tween1.chain(tween2);
			tween2.onComplete.add(this.gosound,this);
			tween2.onComplete.add(this.end,this);			
			
			tween1.start();
			break;			
		case _EFFECT_IMAGE.GO:
			this.x = this.game.width /2;
			var tween1 = this.game.add.tween(this.position).to({y:600}, 600, Phaser.Easing.Elastic.Out,false,400);
			var tween2 = this.game.add.tween(this).to({alpha:1}, 300, Phaser.Easing.Linear.Out,false,0);						
			
			tween1.chain(tween2);
			tween2.onComplete.add(this.gosound,this);
			tween2.onComplete.add(this.readyend,this);			
			
			tween1.start();
			break;			
		case _EFFECT_IMAGE.LINEMAKE:		
			this.angle = target.normalAngle*180/Math.PI;	
			this.height =0;						
			this.game.add.tween(this).to( {height: target.length-78}, 100, Phaser.Easing.Linear.Out,true);
			break;
		case _EFFECT_IMAGE.LINEKILL:		
			var tween = this.game.add.tween(this).to( {height: 0}, 100, Phaser.Easing.Linear.Out, true,500);
			tween.onComplete.add(this.kill,this);
			
			break;
			
		case _EFFECT_IMAGE.KILL:		
			this.alpha = 0;
			var tween1 = this.game.add.tween(this).to({alpha:1}, 100, Phaser.Easing.Linear.Out,false,0);
			var tween2 = this.game.add.tween(this).to({alpha:1}, 800, Phaser.Easing.Linear.Out,false,0);
			tween1.chain(tween2);			
			tween2.onComplete.add(this.kill,this);
			tween1.start();
			break;			
			
		case _EFFECT_IMAGE.ONOFF:
			
			this.alpha = 1;
			var tween1 = this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,false,0);
			var tween2 = this.game.add.tween(this).to({alpha:1}, 100, Phaser.Easing.Linear.Out,false,0);
			var tween3 = this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,false,0);
			var tween4 = this.game.add.tween(this).to({alpha:1}, 100, Phaser.Easing.Linear.Out,false,0);
			var tween5 = this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,false,0);
			
			tween1.chain(tween2);
			tween2.chain(tween3);
			tween3.chain(tween4);
			tween4.chain(tween5);
			tween5.onComplete.add(this.kill,this);
			tween1.start();
			break;
			
		case _EFFECT_IMAGE.MISS: 			
			_FX.Start(_FX.SE_ERROR);
			this.x = this.game.width /2;
			this.y = 560;
			this.scale.setTo(4,4);
			var tween1 = this.game.add.tween(this.scale).to({x:1.2,y:1.2}, 600, Phaser.Easing.Linear.None,false,0);
			var tween2 = this.game.add.tween(this).to({alpha:0.5}, 300, Phaser.Easing.Linear.Out,false,600);						
			
			tween1.chain(tween2);
			tween2.onComplete.add(this.end,this);
			tween1.start();
			break;

		case _EFFECT_IMAGE.MISSNUMBER: 			
			_FX.Start(_FX.SE_ERROR);
			this.alpha = 1.0;
			this.scale.setTo(0.3,0.3);
			var tempposition = this.position.y - 100;			
			this.game.add.tween(this).to( { alpha: 0.2}, 600, Phaser.Easing.Linear.None, true,0);			
			var tween = this.game.add.tween(this.position).to( { y: tempposition}, 600, Phaser.Easing.Linear.None, true,0);			
			tween.onComplete.add(this.kill,this);
			break;

	}
};
Prefab.prototype.lineend = function()
{
	this.fLive  = false;
		
	var tween = this.game.add.tween(this).to( {height: 0}, 50, Phaser.Easing.Linear.Out, true,0);
	tween.onComplete.add(this.kill,this);
	
};

Prefab.prototype.readyend = function()
{

	this.game.add.tween(this).to({alpha:0}, 300, Phaser.Easing.Linear.Out,true,300);	
	tween = this.game.add.tween(this.scale).to({x:3,y:3}, 300, Phaser.Easing.Linear.Out,true,300);
	tween.onComplete.add(this.kill,this);
};

Prefab.prototype.end = function()
{
	this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,true,0);
	tween = this.game.add.tween(this.scale).to({x:3,y:3}, 100, Phaser.Easing.Linear.Out,true,0);
	tween.onComplete.add(this.kill,this);
};
Prefab.prototype.gosound = function()
{

};
