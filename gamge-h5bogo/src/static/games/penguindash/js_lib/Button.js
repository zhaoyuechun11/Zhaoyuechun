// 부모, 주소, 포지션x, 포지션y, 스케일타입, 스케일x, 스케일y, 앵커x, 앵커y, 
function Button(parent, url, px, py, str_scaleType, sx, sy, ax, ay, _slice){
	if(str_scaleType === undefined) str_scaleType = "none";//"scaleDown", "scaleUp", "none"
	if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;
	if(sx === undefined) sx = 1;
	if(sy === undefined) sy = 1;
	this.tweenTime = 0.2;
	this.slice = _slice;
	
	this.main = new PIXI.Container();
	if(this.slice == undefined)
	{
		this.sprite = PIXI.Sprite.fromFrame(url);
		this.sprite.anchor.set(ax, ay);
		this.originTint = this.sprite.tint;
	}
	else
	{
		this.sprite = _slice;
		this.originTint = 0xffffff;
	}
	this.main.position.set(px, py);
	this.main.scale.set(sx, sy);
	this.originScaleX = sx;
	this.originScaleY = sy;
	
	if(this.originScaleX < 0){
		this.addScaleX = 0.1;
	}
	else{
		this.addScaleX = -0.1;
	}
	if(this.originScaleY < 0){
		this.addScaleY = 0.1;
	}
	else{
		this.addScaleY = -0.1;
	}
	this.main.addChild(this.sprite);
	parent.addChild(this.main);
	this.effTint = 0x808080;
	this.scale_type = str_scaleType;

	this.init();
}

Button.prototype.setScaleType = function(str_scaleType){
	this.scale_type = str_scaleType;
};

// Button.prototype.setOriginScale = function(x, y){
// 	if(x === undefined) x = this.originScaleX;
// 	if(y === undefined) y = x;
// 	this.sprite.scale.set(x, y);
// 	this.originScaleX = x;
// 	this.originScaleY = y;

// 	if(this.originScaleX < 0)	this.scaleDown_x = this.originScaleX + 0.1;	
// 	else						this.scaleDown_x = this.originScaleX - 0.1;
// 	if(this.originScaleY < 0)	this.scaleDown_y = this.originScaleY + 0.1;
// 	else						this.scaleDown_y = this.originScaleY - 0.1;
// }
Button.prototype.setOriginTint = function(tint_value){
	this.originTint = tint_value;
	this.sprite.tint = tint_value;
};

Button.prototype.setCallback = function(callBack, THIS){
	if(callBack === undefined) return;
	if(THIS !== undefined)
		callBack = callBack.bind(THIS);
	
	this.main.on("click", callBack);
	this.main.on("tap", callBack);
};

Button.prototype.init = function(){
	var self = this;
	this.main.interactive = true;
	
	this.main.on("mousedown", function(){
		var THIS = self;
		if(THIS.scale_type === "scaleDown")
			TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX+THIS.addScaleX, scaleY:THIS.originScaleY+THIS.addScaleY, ease:Power1.easeOut});
		else if(THIS.scale_type === "scaleUp")
			TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX-THIS.addScaleX, scaleY:THIS.originScaleY-THIS.addScaleY, ease:Power1.easeOut});
		
		if(THIS.slice == undefined)
			THIS.sprite.tint = THIS.effTint;
		else
		{
			for(var i=0;i<THIS.sprite.children.length;++i)
				THIS.sprite.children[i].tint = THIS.effTint;
		}
	});
	
	this.main.on("mouseup", function(e){
		var THIS = self;
	//	THIS.sprite.tint = THIS.originTint;
		TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX, scaleY:THIS.originScaleY, ease:Power1.easeOut});
		
		if(THIS.slice == undefined)
			THIS.sprite.tint = THIS.originTint;
		else
		{
			for(var i=0;i<THIS.sprite.children.length;++i)
				THIS.sprite.children[i].tint = THIS.originTint;
		}
	});
	
	this.main.on("mouseupoutside", function(e){
		var THIS = self;
	//	THIS.sprite.tint = THIS.originTint;
		TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX, scaleY:THIS.originScaleY, ease:Power1.easeOut});
		
		if(THIS.slice == undefined)
			THIS.sprite.tint = THIS.originTint;
		else
		{
			for(var i=0;i<THIS.sprite.children.length;++i)
				THIS.sprite.children[i].tint = THIS.originTint;
		}
	});
	
	this.main.on("touchstart", function(){
		var THIS = self;
		if(THIS.scale_type === "scaleDown")
			TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX+THIS.addScaleX, scaleY:THIS.originScaleY+THIS.addScaleY, ease:Power1.easeOut});
		else if(THIS.scale_type === "scaleUp")
			TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX-THIS.addScaleX, scaleY:THIS.originScaleY-THIS.addScaleY, ease:Power1.easeOut});
	//	THIS.sprite.tint = THIS.effTint;
		if(THIS.slice == undefined)
			THIS.sprite.tint = THIS.effTint;
		else
		{
			for(var i=0;i<THIS.sprite.children.length;++i)
				THIS.sprite.children[i].tint = THIS.effTint;
		}
	});
	
	this.main.on("touchend", function(e){
		var THIS = self;
		TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX, scaleY:THIS.originScaleY, ease:Power1.easeOut});
	//	THIS.sprite.tint = THIS.originTint;
		if(THIS.slice == undefined)
			THIS.sprite.tint = THIS.originTint;
		else
		{
			for(var i=0;i<THIS.sprite.children.length;++i)
				THIS.sprite.children[i].tint = THIS.originTint;
		}
	});
	
	this.main.on("touchendoutside", function(e){
		var THIS = self;
		TweenLite.to(this, THIS.tweenTime, {scaleX:THIS.originScaleX, scaleY:THIS.originScaleY, ease:Power1.easeOut});
	//	THIS.sprite.tint = THIS.originTint;
		if(THIS.slice == undefined)
			THIS.sprite.tint = THIS.originTint;
		else
		{
			for(var i=0;i<THIS.sprite.children.length;++i)
				THIS.sprite.children[i].tint = THIS.originTint;
		}
	});
};

Object.defineProperties(Button.prototype, {
	visible: {
		get: function(){return this.main.visible;},
		set: function(value){this.main.visible = value}
	},
	position: {
		get: function(){return this.main.position;}
	},
	scale: {
		get: function(){return this.main.scale;}
	}
});

Button.prototype.setDownAction = function(callBack, THIS){
	if(callBack === undefined) return;
	if(THIS !== undefined)
		callBack = callBack.bind(THIS);

	this.main.on("mousedown", callBack);
	this.main.on("touchstart", callBack);
};