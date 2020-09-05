
// -- user code here --
// user
//var textload;
//var g_group;
/* --- start generated code --- */

// Generated by Phaser Editor 1.4.3 (Phaser v2.6.2)


/**
 * Preloader.
 */
function Preloader() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Preloader_proto = Object.create(Phaser.State.prototype);
Preloader.prototype = Preloader_proto;
Preloader.prototype.constructor = Preloader;

Preloader.prototype.init = function () {

};
Preloader.prototype.preload = function () {
	
	this.load.spine("Title_spine","assets/titlespine/sudoku_title.json");
	this.load.spine("CheckBtn_spine","assets/titlespine/btn_check_ani.json");
	
	this.load.pack('preloader', 'assets/pack.json');	
	
	this.fGroup = this.add.group();	
	this.fmovi_backtile = this.add.sprite(0, 0, 'backtile', null, this.fGroup);
	this.fmovi_backtile.scale.setTo(25,40);
	this.fmovi_game = this.add.sprite(360, 655, 'movi_game', null, this.fGroup);
	this.fmovi_game.anchor.setTo(0.5, 0.5);	
	this.fmovi_banner = this.add.sprite(0, 1180, 'Loading_banner', null, this.fGroup);	
	/*this.fback        = this.add.sprite(250, 360, 'loadback', null, this.fGroup);
	this.floadprocess = this.add.sprite(250, 360, 'loadprocess', null, this.fGroup);
	
	this.fText = this.add.text(360, 720, '1%', {"font":"bold 32px","fill":"#2E85ED","align":"center"}, this.fGroup);	
	this.fText.pivot.setTo(0.5, 0.5);
	this.fText.anchor.setTo(0.5, 0.5);

	this.load.setPreloadSprite(this.floadprocess, 0);

	this.fFileComplete = this.load.onFileComplete.add(this.fileComplete,this);*/

	this.zhuye002  = this.add.sprite(720/2, 1280/2, 'zhuye002', null, this.fGroup);

	this.zhuye002.anchor.set(.5),
	this.zhuye002.scale.set(.1),
	this.zhuye002.rotation = 20,
	this.tween ? this.tween.kill() : this.tween = new TimelineLite,
	this.tween.to(this.zhuye002, 1, {
		rotation: 0, ease: Sine.easeOut
	}),
	this.tween.call(this.showLocoText.bind(this)),
	TweenMax.to(this.zhuye002.scale, 1, {x: 0.5, y: 0.5});

	this.fLoadComplete=  this.load.onLoadComplete.add(this.loadEnd,this);
};

Preloader.prototype.showLocoText = function () {
	TweenMax.to(this.zhuye002, 0.2, {
		x: 720/2 + 50, ease: Sine.easeIn
	});

	this.loading02  = this.add.sprite(720/2 - 70, 610, 'loading02', null, this.fGroup);
	this.loading02.anchor.set(.5);
	this.loading02.scale.set(.2);
	//this.loading02.alpha = 0;
	/*TweenMax.to(this.loading02, 1, {
		alpha: 1, ease: Sine.easeOut
	});*/

	TweenMax.to(this.loading02.scale, 0.3, {x: 0.6, y: 0.6, ease: Sine.easeOut, onComplete:(function () {
		TweenMax.to(this.loading02.scale, 0.2, {x: 0.5, y: 0.5, onComplete:(function () {

		}).bind(this)});
	}).bind(this)});
};

Preloader.prototype.create = function () {
	
};
/* --- end generated code --- */
// -- user code here --
Preloader.prototype.doinit = function()
{
};
Preloader.prototype.fileComplete = function(progress, cacheKey, success, totalLoaded, totalFiles) 
{ 
	this.fText.setText(progress + "%");	
}; 
Preloader.prototype.loadEnd = function()
{
	_FX.Load(this.game);
	this.game.clearBeforeRender = false;
	//this.fFileComplete.detach();
	this.fLoadComplete.detach();		
	this.fmovi_game.destroy(true, true);
	this.fmovi_banner.destroy(true, true);
	//this.fback.destroy(true, true);
	//this.floadprocess.destroy(true, true);

	if (this.tween) this.tween.kill();
	this.zhuye002.destroy(true, true);
	if (this.loading02) this.loading02.destroy(true, true);
	this.game.state.start("Menu");	
};