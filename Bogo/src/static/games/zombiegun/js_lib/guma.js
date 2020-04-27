////////////////////////////ver.0.0.1//////////////////////////////////////////
////////This script need pixi.js library(ver 3.x) and TweenMax library/////////
////////////////////////////ver.0.0.2//////////////////////////////////////////
////////1) button : add scale type - "scaleDown", "scaleUp", "none"(defaut)////
///////////////////////////////////////////////////////////////////////////////
////////////////////////////ver.0.0.3//////////////////////////////////////////
////////1) buttonManager : deprecated//////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var GUMA = GUMA || {};

GUMA.txt2JsonConverter = function(){
	this.fileReader = new XMLHttpRequest();
	
	this.files = [];
	
	this.jsonObjects = {};
	
	this.state = undefined;
	
	this.onceCallBack = null;
	
	this._onUpdate = this.onUpdate.bind(this);

	this.onUpdate();
};

GUMA.txt2JsonConverter.constructor = GUMA.txt2JsonConverter;

GUMA.txt2JsonConverter.prototype.add = function(key, url){
	var fileKeyPath = {};
	fileKeyPath.key = key;
	fileKeyPath.url = url;
	
	this.files.push(fileKeyPath);
};

GUMA.txt2JsonConverter.prototype.load = function(){	
	if(this.files.length <= 0){
		this.state = "loadComplete";
		return;
	}
	
	var self = this;
	var fileReader = this.fileReader;
	var file = this.files.shift();
	
	this.fileReader.open("GET", file.url, true);
	this.fileReader.onreadystatechange = txt2JsonObj;
	this.fileReader.send(null);
	function txt2JsonObj(){
		if (fileReader.readyState === 4) {
			if (fileReader.status === 200 || this.target.status == 0) {
				var jsonText = fileReader.responseText;
				var jsonObj = JSON.parse(jsonText);
				var keyName = file.key;
				self.jsonObjects[keyName] = jsonObj;
				self.load();
			}
		}
	}
};

GUMA.txt2JsonConverter.prototype.once = function(funcName){
	this.onceCallBack = funcName;
};

GUMA.txt2JsonConverter.prototype.onUpdate = function(){
	if(this.state !== "loadComplete")
		window.requestAnimationFrame(this._onUpdate);
	else {
		this.onceCallBack.apply();
	}
};

GUMA.txtJsonConverter = new GUMA.txt2JsonConverter();
///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Button///////////////////////////////////////////////////////////
GUMA.button = function(parent, url, px, py, str_scaleType, ax, ay, sx, sy){
	if(str_scaleType === undefined) str_scaleType = "none";//"scaleDown", "scaleUp", "none"
	if(ax === undefined) ax = 0.5;
	if(ay === undefined) ay = 0.5;
	if(sx === undefined) sx = 1;
	if(sy === undefined) sy = 1;

	this.sprite = PIXI.Sprite.fromFrame(url);
	this.sprite.position.set(px, py);
	this.sprite.anchor.set(ax, ay);
	this.sprite.scale.set(sx, sy);
	this.sprite.interactive = true;
	
	parent.addChild(this.sprite);
	
	this.tweenTime = 0.1;
	this.scaleDown_x = this.sprite.scale.x - 0.1;//default minimum scale
	this.scaleDown_y = this.sprite.scale.x - 0.1;
	this.scaleUp_x = this.sprite.scale.x + 0.2;
	this.scaleUp_y = this.sprite.scale.y + 0.2;
	this.effTint = 0x808080;
	this.originTint = this.sprite.tint;
	this.originScaleX = this.sprite.scale.x;
	this.originScaleY = this.sprite.scale.y;
	
	if(this.originScaleX < 0)
		this.scaleDown_x = this.originScaleX + 0.1;	
	else
		this.scaleDown_x = this.originScaleX - 0.1;

	if(this.originScaleY < 0)
		this.scaleDown_y = this.originScaleY + 0.1;
	else
		this.scaleDown_y = this.originScaleY - 0.1;

	this.timeLine = new TimelineLite();

	this.scale_type = str_scaleType;
	
	this.init();
};

GUMA.button.constructor = GUMA.button;

GUMA.button.prototype.setScaleType = function(str_scaleType){
	this.scale_type = str_scaleType;
};

GUMA.button.prototype.setOriginScale = function(x, y){
	if(x === undefined) x = this.originScaleX;
	if(y === undefined) y = x;
	this.sprite.scale.set(x, y);
	this.originScaleX = x;
	this.originScaleY = y;


	if(this.originScaleX < 0)
		this.scaleDown_x = this.originScaleX + 0.1;	
	else
		this.scaleDown_x = this.originScaleX - 0.1;

	if(this.originScaleY < 0)
		this.scaleDown_y = this.originScaleY + 0.1;
	else
		this.scaleDown_y = this.originScaleY - 0.1;
};

GUMA.button.prototype.setOriginTint = function(tint_value){
	this.originTint = tint_value;
	this.sprite.tint = tint_value;
};

GUMA.button.prototype.setCallback = function(callBack, THIS){
	if(callBack === undefined) return;
	if(THIS !== undefined)
		callBack = callBack.bind(THIS);
	
	this.sprite.on("click", callBack);
	this.sprite.on("tap", callBack);
};

GUMA.button.prototype.init = function(){
	var self = this;
	this.sprite.interactive = true;
	
	this.sprite.on("mousedown", function(){
		if(self.scale_type === "scaleDown")
			TweenLite.to(this, self.tweenTime, {scaleX:self.scaleDown_x, scaleY:self.scaleDown_y, ease:Power1.easeOut});
		else if(self.scale_type === "scaleUp")
			TweenLite.to(this, self.tweenTime, {scaleX:self.scaleUp_x, scaleY:self.scaleUp_y, ease:Power1.easeOut});

		this.tint = self.effTint;
	});
	
	this.sprite.on("mouseup", function(e){
		this.tint = self.originTint;
		TweenLite.to(this, self.tweenTime, {scaleX:self.originScaleX, scaleY:self.originScaleY, ease:Power1.easeOut});
	});
	
	this.sprite.on("mouseupoutside", function(e){
		this.tint = self.originTint;
		TweenLite.to(this, self.tweenTime, {scaleX:self.originScaleX, scaleY:self.originScaleY, ease:Power1.easeOut});
	});
	
	this.sprite.on("touchstart", function(){
		if(self.scale_type === "scaleDown")
			TweenLite.to(this, self.tweenTime, {scaleX:self.scaleDown_x, scaleY:self.scaleDown_y, ease:Power1.easeOut});
		else if(self.scale_type === "scaleUp")
			TweenLite.to(this, self.tweenTime, {scaleX:self.scaleUp_x, scaleY:self.scaleUp_y, ease:Power1.easeOut});
		this.tint = self.effTint;
	});
	
	this.sprite.on("touchend", function(e){
		TweenLite.to(this, self.tweenTime, {scaleX:self.originScaleX, scaleY:self.originScaleY, ease:Power1.easeOut});
		this.tint = self.originTint;
	});
	
	this.sprite.on("touchendoutside", function(e){
		TweenLite.to(this, self.tweenTime, {scaleX:self.originScaleX, scaleY:self.originScaleY, ease:Power1.easeOut});
		this.tint = self.originTint;
	});
};

Object.defineProperties(GUMA.button.prototype, {
	visible: {
		get: function(){return this.sprite.visible;},
		set: function(value){this.sprite.visible = value}
	},
	position: {
		get: function(){return this.sprite.position;}
	},
	scale: {
		get: function(){return this.sprite.scale;}
	}
});

GUMA.button.prototype.setDownAction = function(callBack, THIS){
	if(callBack === undefined) return;
	if(THIS !== undefined)
		callBack = callBack.bind(THIS);

	this.sprite.on("mousedown", callBack);
	this.sprite.on("touchstart", callBack);
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////Scroll View///////////////////////////////////////////////////////////
/**
 * 17.05.25
 * anchor는 x, y 0.5를 기준으로 함.
 * 9slice 도 쓸 수 있도록 적용.
 * 굳이 slot class(GUMA.scrollSlot)를 쓸 필요 없음.
 * scrollView 인스턴스의 viewList에 slot으로 쓰고 싶은 애들을 넣어줘야 함.
 * 행, 열 숫자 설정할 수 있도록 업데이트.
 * */
GUMA.scrollView = function(parent, width, height, x, y, scroll_type){
	var self = this;
	/////explain////////
	//type: horizontal///
	//limitPos             this.position.x
	//|   <------>scroll move    |
	//|==========================|======render area=======
	//|                          |
	////////////////////
	this.position = {x:0, y:0};
	this.position.x = x;
	this.position.y = y;
	
	this.width = width;
	this.height = height;

	this.scrollContainer = new PIXI.Container();
	this.scrollContainer.position.set(this.position.x, this.position.y);

	this.viewArea = new PIXI.Graphics();
	this.viewArea.beginFill(0x808080, 0.8);
	this.viewArea.drawRect(this.position.x, this.position.y, width, height);
	this.viewArea.endFill();
	
	this.scrollContainer.mask = this.viewArea;
	
	parent.addChild(this.scrollContainer);
	parent.addChild(this.viewArea);

	this.scrollContainer.interactive = true;

	this.viewLists = [];
	if(scroll_type === undefined) scroll_type = this.scrollType.Horizontal;
	else{
		if(scroll_type === "Vertical" || scroll_type === "vertical")
			scroll_type = this.scrollType.Vertical;
		else
			scroll_type = this.scrollType.Horizontal;
	}
	this.type = scroll_type;
	this.center_point = (this.type === this.scrollType.Horizontal) ? this.position.x + width : this.position.y + height;
	this.limitPos = 0;
	
	this.vector = {x:0, y:0};
	this.interval_x = 0;
	this.interval_y = 0;
	
	this.padding = 0;
	this.padded_width = 0;
	this.padded_height = 0;

	this.moveCall_horizontal = {right: false, left: false};//움직였니 아니니.
	this.moveCall_vertical = {up: false, down: false};//움직였니 아니니.
	
	this.scrollContainer.on("mousedown", onDragStart);
	this.scrollContainer.on("touchstart", onDragStart);
	this.scrollContainer.on("mouseup", onDragEnd);
	this.scrollContainer.on("touchend", onDragEnd);
	this.scrollContainer.on("mouseupoutside", onDragEnd);
    this.scrollContainer.on("touchendoutside", onDragEnd);
    this.scrollContainer.on("mousemove", onDragMove);
    this.scrollContainer.on("touchmove", onDragMove);

    this.moveDist = 0;

	function onDragStart(event){
    	this.data = event.data;

    	this.dragging = true;

    	self.vector = {x:this.position.x-this.data.global.x, y:this.position.y-this.data.global.y};
	}

	function onDragEnd(){
	    this.dragging = false;
	    this.data = null;
	    self.bMove = false;
    }

	var prev_pos = 0; var cur_pos = 0; var pixel = 0;
	function onDragMove(){
	    if (this.dragging){
	        switch(self.type){
	        	case self.scrollType.Horizontal:
	        		this.position.x = this.data.global.x + self.vector.x;
	        		if(this.position.x < self.limitPos) this.position.x = self.limitPos;
	        		if(this.position.x > self.position.x) this.position.x = self.position.x;
	        		cur_pos = this.position.x;
                    pixel = cur_pos - prev_pos;
	        		if(pixel*pixel>10*10) self.bMove = true;
	        		prev_pos = cur_pos;
	        		break;
	    		case self.scrollType.Vertical:
	        		this.position.y = this.data.global.y + self.vector.y;
	        		if(this.position.y < self.limitPos) this.position.y = self.limitPos;
	        		if(this.position.y > self.position.y) this.position.y = self.position.y;
                    cur_pos = this.position.y;
                    pixel = cur_pos - prev_pos;
                    if(pixel*pixel>10*10) self.bMove = true;
                    prev_pos = cur_pos;
	        		break;
	        }
	    }
	}
};

GUMA.scrollView.constructor = GUMA.scrollView;

GUMA.scrollView.prototype.scrollType = {
	Vertical : 0,
	Horizontal : 1
};

GUMA.scrollView.prototype.setList = function(_interval_x, _interval_y, _fixNum, _padding, _fixX, _fixY){
	if(this.viewLists.length === 0) return;
	var i = 0;
	var length = this.viewLists.length;
    var flag_x = (_fixX===undefined) ? (this.viewLists[0].width/2)|0:_fixX;
    var flag_y = (_fixY===undefined) ? (this.viewLists[0].height/2)|0:_fixY;
    var start_x = flag_x; var start_y = flag_y;

	var width = 0;
	var height = 0;

	this.padding = _padding;

	if(length !== 0){
		this.interval_x = this.viewLists[0].width+_interval_x;
		this.interval_y = this.viewLists[0].height+_interval_y;

		switch(this.type){
		case this.scrollType.Horizontal:
			for(i=0;i<length;++i){
                this.viewLists[i].position.x = start_x;
                this.viewLists[i].position.y = start_y;
                width = this.viewLists[i].width;

                start_y += this.interval_y;

				if((i+1)%_fixNum === 0){
                    start_x += (this.interval_x);
                    start_y = flag_y;
                }
			}

			if(this.viewArea.width < this.scrollContainer.width){
				var minus = this.scrollContainer.width - this.width;
				this.limitPos = this.position.x - minus - this.padding;
			} else 
				this.limitPos = this.position.x;
		break;
		case this.scrollType.Vertical:
			for(i=0;i<length;++i){
                this.viewLists[i].position.x = start_x;
                this.viewLists[i].position.y = start_y;
                height = this.viewLists[i].height;

                start_x += this.interval_x;

				if((i+1)%_fixNum === 0){
                    start_x = flag_x;
                    start_y += (this.interval_y);
                }
			}

			if(this.viewArea.height < this.scrollContainer.height){
				var minus = this.scrollContainer.height - this.height;
				this.limitPos = this.position.y - minus - this.padding;
			} else 
				this.limitPos = this.position.y;
		break;
		}
	}

    this.scrollContainer.position.set(this.position.x, this.position.y);
};

GUMA.scrollView.prototype.pushList = function(listObject){
	if(listObject.constructor !== GUMA.scrollSlot) throw "Unvaliable child type. Check its type is GUMA.scrollSlot";
	this.viewLists.push(listObject);
};

GUMA.scrollView.prototype.calculatePadding = function(padding){
	if(this.viewLists.length === 0) return;

    var width = this.viewLists[0].width;
    var height = this.viewLists[0].height;
	
	this.padded_width = (width-padding*2)/width;
	if(this.padded_width>1) this.padded_width = 1;
	this.padded_height = (height-padding*2)/height;
	if(this.padded_height>1) this.padded_height = 1;
};

GUMA.scrollView.prototype.scrollMove = function(dir, moveDist){
	switch(this.type){
		case this.scrollType.Horizontal:
		if(dir === "right"){
			this.scrollContainer.position.x -= moveDist;
			if(this.scrollContainer.position.x < this.limitPos) this.scrollContainer.position.x = this.limitPos;
			if(this.scrollContainer.position.x > this.position.x) this.scrollContainer.position.x = this.position.x;
		} else if(dir === "left"){
			this.scrollContainer.position.x += moveDist;
			if(this.scrollContainer.position.x < this.limitPos) this.scrollContainer.position.x = this.limitPos;
			if(this.scrollContainer.position.x > this.position.x) this.scrollContainer.position.x = this.position.x;
		}
		break;
		case this.scrollType.Vertical:
		if(dir === "up"){
			this.scrollContainer.position.y += moveDist;
			if(this.scrollContainer.position.y < this.limitPos) this.scrollContainer.position.y = this.limitPos;
			if(this.scrollContainer.position.y > this.position.y) this.scrollContainer.position.y = this.position.y;
		} else if(dir === "down"){
			this.scrollContainer.position.y -= moveDist;
			if(this.scrollContainer.position.y < this.limitPos) this.scrollContainer.position.y = this.limitPos;
			if(this.scrollContainer.position.y > this.position.y) this.scrollContainer.position.y = this.position.y;
		}
		break;
	}
};

GUMA.scrollView.prototype.moveCheck = function(){
	switch(this.type){
		case this.scrollType.Horizontal:
		if(this.scrollContainer.position.x === this.limitPos){
			this.moveCall_horizontal.left = false;
			this.moveCall_horizontal.right = true;
			return this.moveCall_horizontal;
		} else if(this.scrollContainer.position.x === this.position.x){
			this.moveCall_horizontal.left = true;
			this.moveCall_horizontal.right = false;
			return this.moveCall_horizontal;
		} else {
			this.moveCall_horizontal.left = true;
			this.moveCall_horizontal.right = true;
			return this.moveCall_horizontal;
		}
		break;

		case this.scrollType.Vertical:
		if(this.scrollContainer.position.y === this.limitPos){
			this.moveCall_vertical.up = false;
			this.moveCall_vertical.down = true;
			return this.moveCall_vertical;
		} else if(this.scrollContainer.position.y === this.position.y){
			this.moveCall_vertical.up = true;
			this.moveCall_vertical.down = false;
			return this.moveCall_vertical;
		} else {
			this.moveCall_vertical.up = true;
			this.moveCall_vertical.down = true;
			return this.moveCall_vertical;
		}
		break;
	}
};

GUMA.scrollView.prototype.setCenterSlot = function(slot_id){
	switch(this.type){
		case this.scrollType.Horizontal:
		
		break;

		case this.scrollType.Vertical:
		break;
	}
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////scroll slot///////////////////////////////////////////////////////////
GUMA.scrollSlot = function(parent, url){
	if(parent.constructor !== GUMA.scrollView) throw "Unvaliable parent type. Check its type is GUMA.scrollView";

	this.sprite = new PIXI.Sprite.fromFrame(url);//슬롯의 배경이 되는 스프라이트.
	this.sprite.anchor.set(0.5, 0.5);
	
	parent.scrollContainer.addChild(this.sprite);
	parent.pushList(this);
};

GUMA.scrollSlot.constructor = GUMA.scrollSlot;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////new Scroll////////////////////////////////////////////////////////////
GUMA.scrollView_2 = function(parent, width, height, x, y, scroll_type){
    var self = this;
    /////explain////////
    //type: horizontal///
    //limitPos             this.position.x
    //|   <------>scroll move    |
    //|==========================|======render area=======
    //|                          |
    ////////////////////
    this.position = {x:0, y:0};
    this.position.x = x;
    this.position.y = y;

    this.width = width;
    this.height = height;

    // this.scrollContainer = new PIXI.Container();
    // this.scrollContainer.position.set(this.position.x, this.position.y);
    this.scroll = new PIXI.Graphics();
    this.scroll.beginFill(0x808080, 0.8);
    this.scroll.drawRect(this.position.x, this.position.y, width, height);
    this.scroll.endFill();
    this.scroll.interactive = true;

    this.viewArea = new PIXI.Graphics();
    this.viewArea.beginFill(0x808080, 0.8);
    this.viewArea.drawRect(this.position.x, this.position.y, width, height);
    this.viewArea.endFill();

    this.scrollContainer.mask = this.viewArea;

    parent.addChild(this.scrollContainer);
    parent.addChild(this.viewArea);

    this.scrollContainer.interactive = true;

    this.viewLists = [];
    if(scroll_type === undefined) scroll_type = this.scrollType.Horizontal;
    else{
        if(scroll_type === "Vertical" || scroll_type === "vertical")
            scroll_type = this.scrollType.Vertical;
        else
            scroll_type = this.scrollType.Horizontal;
    }
    this.type = scroll_type;
    this.center_point = (this.type === this.scrollType.Horizontal) ? this.position.x + width : this.position.y + height;
    this.limitPos = 0;

    this.vector = {x:0, y:0};
    this.interval_x = 0;
    this.interval_y = 0;

    this.padding = 0;
    this.padded_width = 0;
    this.padded_height = 0;

    this.moveCall_horizontal = {right: false, left: false};//움직였니 아니니.
    this.moveCall_vertical = {up: false, down: false};//움직였니 아니니.

    this.scroll.on("mousedown", onDragStart);
    this.scroll.on("touchstart", onDragStart);
    this.scroll.on("mouseup", onDragEnd);
    this.scroll.on("touchend", onDragEnd);
    this.scroll.on("mouseupoutside", onDragEnd);
    this.scroll.on("touchendoutside", onDragEnd);
    this.scroll.on("mousemove", onDragMove);
    this.scroll.on("touchmove", onDragMove);

    function onDragStart(event){
        this.data = event.data;

        this.dragging = true;

        self.vector = {x:this.position.x-this.data.global.x, y:this.position.y-this.data.global.y};
    }

    function onDragEnd(){
        this.dragging = false;
        this.data = null;
    }

    function onDragMove(){
        if (this.dragging){
            switch(self.type){
                case self.scrollType.Horizontal:
                    this.position.x = this.data.global.x + self.vector.x;
                    if(this.position.x < self.limitPos) this.position.x = self.limitPos;
                    if(this.position.x > self.position.x) this.position.x = self.position.x;
                    break;
                case self.scrollType.Vertical:
                    this.position.y = this.data.global.y + self.vector.y;
                    if(this.position.y < self.limitPos) this.position.y = self.limitPos;
                    if(this.position.y > self.position.y) this.position.y = self.position.y;
                    break;
            }
        }
    }
};

GUMA.scrollView_2.prototype.setList = function(_interval_x, _interval_y, _fixNum, _padding){
    if(this.viewLists.length === 0) return;
    var i = 0;
    var length = this.viewLists.length;
    var flag_x = this.viewLists[0].width/2;
    var flag_y = this.viewLists[0].height/2;
    var start_x = flag_x; var start_y = flag_y;

    var width = 0;
    var height = 0;

    this.padding = _padding;

    if(length !== 0){
        // this.interval_x = _interval_x;
        // this.interval_y = _interval_y;

        switch(this.type){
            case this.scrollType.Horizontal:
                for(i=0;i<length;++i){
                    this.viewLists[i].position.x = start_x;
                    this.viewLists[i].position.y = start_y;
                    width = this.viewLists[i].width;

                    start_y += _interval_y;

                    if((i+1)%_fixNum === 0){
                        start_x += (width+_interval_x);
                        start_y = flag_y;
                    }
                }

                if(this.viewArea.width < this.scrollContainer.width){
                    var minus = this.scrollContainer.width - this.width;
                    this.limitPos = this.position.x - minus - this.padding;
                } else
                    this.limitPos = this.position.x;
                break;
            case this.scrollType.Vertical:
                for(i=0;i<length;++i){
                    this.viewLists[i].position.x = start_x;
                    this.viewLists[i].position.y = start_y;
                    height = this.viewLists[i].height;

                    start_x += _interval_x;

                    if((i+1)%_fixNum === 0){
                        start_x = flag_x;
                        start_y += (height+_interval_y);
                    }
                }

                if(this.viewArea.height < this.scrollContainer.height){
                    var minus = this.scrollContainer.height - this.height;
                    this.limitPos = this.position.y - minus - this.padding;
                } else
                    this.limitPos = this.position.y;
                break;
        }
    }
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////about PIXI////////////////////////////////////////////////////////////
Object.defineProperties(PIXI.Sprite.prototype, {
	scaleX: {
	     get: function () { return this.scale.x; },
	     set: function (v) { this.scale.x = v; }
	},
	scaleY: {
	     get: function () { return this.scale.y; },
	     set: function (v) { this.scale.y = v; }
	}
});//pixi.js의 sprite에 greensock tweenmax scale을 적용하기 위한 프로퍼티 설정.

Object.defineProperties(PIXI.Container.prototype, {
	scaleX: {
		get: function () { return this.scale.x; },
		set: function (v) { this.scale.x = v; }
	},
	scaleY: {
	    get: function () { return this.scale.y; },
	    set: function (v) { this.scale.y = v; }
	}
});//container 용

PIXI.extras.BitmapText.prototype.updateTextDefault = PIXI.extras.BitmapText.prototype.updateText;
PIXI.extras.BitmapText.prototype.updateText = function(){
    this.updateTextDefault();
    switch(this.align) {
        case 'center':
            this.pivot.x = this.textWidth * 0.5;
        break;
        case 'right':
            this.pivot.x = this.textWidth;
        break;
        default:
            this.pivot.x = 0;
        break;
    }
};//bitmapFont

createBitmapFont = function ( fontszname, text, pos, aligns ){
    if(aligns==undefined) aligns  = 'center';
    var tx1 = new PIXI.extras.BitmapText(text, { font:fontszname, align: aligns});
    tx1.position.set(pos.x,pos.y);
    return tx1;
};
////////////////////////add/////////////////////////////////
Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};