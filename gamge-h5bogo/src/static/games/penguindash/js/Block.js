function Block(){
	this.spr = new PIXI.Sprite();
	this.spr.anchor.set(0.5);
		
	this.type = undefined;
	
	this.bFallen = false;
	this.fallenDist = 300;
	this.fallenTime = 0;
	
	this.vibeTime = 0;
	this.deltaTime =0;
	
	this.dir = undefined;
	this.bJump = false;//펭귄 점프 중 떨어짐 방지
	
	this.events = {};
	this.addEvent("vibeBlock", this.vibeBlock);
	this.addEvent("fallenBlock", this.fallenBlock);
	
	this.bMoved = true;

	this.pair = undefined;

	this.bUpdate = false;
	this.bDash = false;
	this.bStartBlock = false;
	this.bHighBlock = false;//최고 기록 깃발 꽂을 넘~

	this.vibeTween = undefined;
	this.fallenTween = undefined;

	this.position = {x:0, y:0};
}

Block.prototype.init = function(){
    this.pair = undefined;
    this.spr.visible = false;
    // this.spr.zOrder = 0;
    this.spr.tint = 16777215;
    this.spr.scale.x = 1;
    this.spr.displayGroup = GAME.mapManager.blockLayer;

    this.bFallen = false;
    this.bJump = false;//펭귄 점프 중 떨어짐 방지
    this.bMoved = true;

    this.fallenTime = 0;
    this.vibeTime = 0;
    this.deltaTime =0;

    this.bUpdate = false;
    this.bDash = false;
    this.bStartBlock = false;
    this.bHighBlock = false;

    this.events = {};
    this.addEvent("vibeBlock", this.vibeBlock);
    this.addEvent("fallenBlock", this.fallenBlock);

    this.vibeTween = undefined;
    this.fallenTween = undefined;

    TweenMax.killTweensOf(this.spr);

    this.position.x = 0;
    this.position.y = 0;

    if(this.spr.children.length != 0){
        //this.spr.removeChildAt(0);//gimmick 제거....
        this.spr.removeChildren();//gimmick 및 깃발 제거...
    }
};

Block.prototype.setBlock = function(parent, layer){
    // parent.addChild(this.spr);
    this.spr.displayGroup = layer;

	this.state = this.block_state.IDLE;
};

Block.prototype.update = function(){
    if(GAME.engine.state === GAME.engine.gameState.STATE_OVER) return;

    if(this.pair !== undefined){
        if(this.pair.bUpdate){
            if(this.pair.type === GAME.blockType.NORMAL){
                if(this.pair.bJump) return;

                this.pair.deltaTime += deltaTime;

                if(this.pair.deltaTime>=this.pair.vibeTime){
                    this.pair.callOnce("vibeBlock", this.pair);
                }

                if(this.pair.deltaTime>=this.pair.fallenTime){
                    this.pair.callOnce("fallenBlock", this.pair);
                }
            }
            return;
        }
    }

    if(!this.bUpdate) return;

	if(this.type === GAME.blockType.NORMAL){
		if(this.bJump) return;
		
		this.deltaTime +=deltaTime;
		
		if(this.deltaTime>=this.vibeTime){
			this.callOnce("vibeBlock", this);
		}
		
		if(this.deltaTime>=this.fallenTime){
			this.callOnce("fallenBlock", this);
		}
	}
};

Block.prototype.setType = function(blockType, _fallenTime, _vibeTime, _block_idx){//type에 따라 vibeTime, fallenTime 설정(170403)
	this.type = blockType;
	this.idx = _block_idx;
	this.spr.visible = true;

	switch(blockType){
	case GAME.blockType.NORMAL:
		this.spr.texture = PIXI.Texture.fromFrame('base_way.png');
        this.fallenTime = _fallenTime;
        this.vibeTime = _vibeTime;
		break;
	case GAME.blockType.SHELTER:
		this.spr.texture = PIXI.Texture.fromFrame('base.png');
		break;
	case GAME.blockType.START://이어하기 용
		this.spr.texture = PIXI.Texture.fromFrame('start_tile.png');
		
		this.spr.position.x = this.position.x;
		this.spr.position.y = this.position.y;
		this.spr.visible = true;

        this.vibeTime = 0;
        this.fallenTime = 0;

        this.bUpdate = false;
        this.bFallen = false;
		
		break;
	}
};

Block.prototype.setPosition = function(flagPosition, dir, _rebirth){
	if(dir === undefined) dir = {x:0, y:0};
	
	if(dir.x === left.x) this.dir = 1;
	else this.dir = 0;

	if(_rebirth === undefined) _rebirth = false;
	if(!_rebirth) GAME.mapManager.mapContainer.addChildAt(this.spr, 0);
	this.spr.position.set(flagPosition.x + dir.x, flagPosition.y + dir.y);

    this.position.x = flagPosition.x + dir.x;
    this.position.y = flagPosition.y + dir.y;
	
	// this.spr.zOrder = -this.spr.position.y;
};

Block.prototype.block_state = {
	IDLE : 1000,
	HITED : 2000,
	FALLEN : 3000
};

Block.prototype.addEvent = function(eventName, eventFunc){
	this.events[eventName] = {
		callCount:0,
		callFunc:eventFunc
	};//덮어쓰기 가능
};

Block.prototype.callOnce = function(eventName, arg){
	if(this.events[eventName].callCount >= 1) return;
	
	this.events[eventName].callFunc(arg);
	++this.events[eventName].callCount;
};

Block.prototype.vibeBlock = function(THIS){
	// /*THIS.vibeTween = */TweenMax.to(THIS.spr, 0.5, {x:THIS.spr.position.x-5, y:THIS.spr.position.y, onCompleteParams:[THIS],
     //    onComplete:function(_this){
     //    // console.log("block_vibeBlock");
     //    _this.vibeTween = TweenMax.to(_this.spr, 0.5, {x:_this.spr.position.x+10, y:_this.spr.position.y, repeat :-1, yoyo:true});
	// }});
    THIS.vibeTween = TweenMax.to(THIS.spr, 0.5, {x:THIS.spr.position.x+10, y:THIS.spr.position.y, repeat:-1, yoyo:true});
};

Block.prototype.fallenBlock = function(THIS){
	THIS.bFallen = true;
	THIS.spr.tint = 0x808080;
	THIS.fallenTween = TweenMax.to(THIS.spr, 0.5, {x:THIS.spr.position.x, y:THIS.spr.position.y + THIS.fallenDist, onComplete:THIS.destroy, onCompleteParams:[THIS]} );
};

Block.prototype.destroy = function(THIS){
    // console.log("block_destroy: "+THIS.idx);
    THIS.bUpdate = false;
    // THIS.payType = undefined;
	THIS.spr.visible = false;
};

