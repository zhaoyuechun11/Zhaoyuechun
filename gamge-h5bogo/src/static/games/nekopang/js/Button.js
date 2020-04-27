var naverShop = new NaverShop();
function NaverShop() {
    this.main = new PIXI.Container();
    this.imgPath = Define.NS_IMAGE_URL;
    this.bLoad = false;
    this.gameList;
    this.cbReward;
    this.bInit = false;

    NaverShop.prototype.loadImg = function() {
        var loader = PIXI.loader;
        loader.add("btn_close.png", this.imgPath+"btn_close.png");
        loader.add("btn_ok.png", this.imgPath+"btn_ok.png");
        loader.add("btn_shop_1.png", this.imgPath+"btn_shop_1.png");
        loader.add("list_1.png", this.imgPath+"list_1.png");
        loader.add("point_bg_naver.png", this.imgPath+"point_bg_naver.png");
        loader.add("popup_green.png", this.imgPath+"popup_green.png");
        loader.add("shop_naver_film.png", this.imgPath+"shop_naver_film.png");
        loader.add("shop_naver_info.png", this.imgPath+"shop_naver_info.png");
        loader.once('complete', this.Init.bind(this)); //cbLogoComplete->cbImageDownComplete(loader, res) //State.TITLE로 대기모드로-->GameViewSetting(res)
        loader.load();
    }

    NaverShop.prototype.Init = function() {
        var spr = SpriteLoad(this.main, "white.png", iCenterSizeX, iCenterSizeY);
        spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
        spr.tint = 0x000000;
        spr.alpha = 0.9;
        spr.interactive = true;
        spr = SpriteSliceLoad(this.main, this.imgPath+"popup_green.png", iCenterSizeX, iCenterSizeY, 670, 950, 50, 50, 150, 50);
        //	var spr2 = SpriteLoad(spr, "title.png", 0, -412);
        FontLoad(spr, "Free charge", 0, -415, 0.5, 0.5,
            {fontFamily:"Arial", fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
        var spr2 = SpriteSliceLoad(spr, this.imgPath+"shop_naver_info.png", 0, -260, 580, 120);
        var spr3 = SpriteSliceLoad(spr2, this.imgPath+"point_bg_naver.png", 0, -55, 200, 60);
        this.sprTitleIcon = SpriteLoad(spr3, this.imgPath+"shop_naver_film.png", -80, 0);
        this.txtLifeCnt = FontLoad(this.sprTitleIcon, "10", -12, 0, 0.5, 0.5,
            {fontFamily:"Arial", fontSize:'38px', fontWeight:'bold', lineJoin:"round", align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});
        this.txtTime = FontLoad(spr3, "09:59", 20, 5, 0.5, 0.5,
            {fontFamily:"Arial", fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
        FontLoad(spr2, "You do not have enough film! So would you play this game? \\nI'll fill it with all the presents as a gift.~", 0, 15, 0.5, 0.5,
            {fontFamily:"Arial", fontSize:'20px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});

        new Button(spr, this.imgPath+"btn_close.png", 310, -450, this.cbButtonClose.bind(this), "scaleUp");

        this.sprIcon = [];
        this.txtTitle = [];
        this.txtContents = [];
        for(var i=0;i<3;++i) {
            spr2 = SpriteSliceLoad(spr, this.imgPath + "list_1.png", 0, -100 + (160*i), 600, 160);
            this.sprIcon[i] = SpriteLoad(spr2, this.imgPath + "btn_ok.png", -222, -5);
            this.txtTitle[i] = FontLoad(spr2, "Shanghai Chef", -150, -40, 0, 0.5,
                {fontFamily:"Arial", fontSize:'28px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});
            this.txtContents[i] = FontLoad(spr2, "Matching game to find the same hand! \\nCould your hand be faster than the eye? \\n Find out which block you can cross!", -150, 15, 0, 0.5,
                {fontFamily:"Arial", fontSize:'16px', fontWeight:'bold', align:'left', fill:'#000000'});

            spr3 = SpriteSliceLoad(spr2, this.imgPath + "btn_shop_1.png", 0, 0, 110, 110);
            var btn = new Button(spr2, this.imgPath + "btn_shop_1.png", 215, 0, eval("this.cbButtonClick"+i+".bind(this)"), "scaleUp", 1, 1, 0.5, 0.5, spr3);
            spr4 = SpriteLoad(spr3, this.imgPath+"shop_naver_film.png", 0, -17);
            spr4.scale.set(0.9);
            FontLoad(btn.sprite, "MAX", 0, -12, 0.5, 0.5,
                {fontFamily:"Arial", fontSize:'28px', fontWeight:'bold', lineJoin:"round", align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:5});
            FontLoad(btn.sprite, "Shortcuts", 0, 25, 0.5, 0.5,
                {fontFamily:"Arial", fontSize:'16px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00877c', strokeThickness:4});
        }

        spr3 = SpriteSliceLoad(spr, this.imgPath + "btn_ok.png", 0, 0, 200, 90);
        btn = new Button(spr, this.imgPath + "btn_ok.png", 0, 370, this.cbButtonClose.bind(this), "scaleUp", 1, 1, 0.5, 0.5, spr3);
        FontLoad(btn.sprite, "OK", 0, 0, 0.5, 0.5,
            {fontFamily:"Arial", fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});

        this.main.visible = false;
        stage.addChild(this.main);
        this.bInit = true;
    }

    NaverShop.prototype.cbButtonClick0 = function() {
        //	location.href = this.gameList[0].aLNK;
        window.open(this.gameList[0].aLNK);
        networkManager.SendShopSelect(this.gameList[0].gameinfoIdx);
        this.cbReward();
        this.cbButtonClose();
    }

    NaverShop.prototype.cbButtonClick1 = function() {
        //	location.href = this.gameList[1].aLNK;
        window.open(this.gameList[1].aLNK);
        networkManager.SendShopSelect(this.gameList[1].gameinfoIdx);
        this.cbReward();
        this.cbButtonClose();
    }

    NaverShop.prototype.cbButtonClick2 = function() {
        //	location.href = this.gameList[2].aLNK;
        window.open(this.gameList[2].aLNK);
        networkManager.SendShopSelect(this.gameList[2].gameinfoIdx);
        this.cbReward();
        this.cbButtonClose();
    }

    NaverShop.prototype.Update = function(cnt, time) {
        if(this.bInit == true && this.main.visible == true){
            this.txtLifeCnt.text = cnt;
            this.txtTime.text = time;
        }
    }

    NaverShop.prototype.Show = function(_cbReward) {
        this.cbReward = _cbReward;
        if(this.bLoad == false){
            networkManager.GetNaverShop(this.cbGetNaverShopComplete.bind(this));
        }else{
            this.main.visible = true;
        }
    }

    NaverShop.prototype.cbGetNaverShopComplete = function(gamelist) {
        this.gameList = gamelist;
        //RandomMix(this.gameList, 50);
        /*var options = {
            "Access-Control-Allow-Methods":"*",
            "Access-Control-Allow-Origin":"*"};
        var loader = PIXI.loader;
        loader.add(this.gameList[0].iconLNK, this.gameList[0].iconLNK, options);
        loader.add(this.gameList[1].iconLNK, this.gameList[1].iconLNK, options);
        loader.add(this.gameList[2].iconLNK, this.gameList[2].iconLNK, options);
        loader.once('complete', this.cbIconLoadComplete.bind(this));
        loader.load();*/
        this.cbIconLoadComplete();
    }

    NaverShop.prototype.cbIconLoadComplete = function() {
        for(var i=0;i<3;++i){
            this.sprIcon[i].texture = SpriteLoadBase64(this.gameList[i].iconNaver);
            this.txtTitle[i].text = this.gameList[i].gName;
            this.txtContents[i].text = this.gameList[i].gContents;
        }
        this.main.visible = true;
    }

    NaverShop.prototype.cbButtonClose = function() {
        this.main.visible = false;
    }
}


// 부모, 주소, 포지션x, 포지션y, 스케일타입, 스케일x, 스케일y, 앵커x, 앵커y,
Button = function(parent, url, px, py, callback, str_scaleType, sx, sy, ax, ay, _slice){
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
		this.addIdleX = 0.02;
	}
	else{
		this.addScaleX = -0.1;
		this.addIdleX = -0.02;
	}
	if(this.originScaleY < 0){
		this.addScaleY = 0.1;
		this.addIdleY = 0.02;
	}
	else{
		this.addScaleY = -0.1;
		this.addIdleY = -0.02;
	}
	this.main.addChild(this.sprite);
	parent.addChild(this.main);
	this.effTint = 0x808080;
	this.scale_type = str_scaleType;

	this.main.on("click", callback);
	this.main.on("tap", callback);
//	TweenMax.fromTo(this.sprite, 1, 
//			{scaleX:this.originScaleX - this.addIdleX, scaleY:this.originScaleY + this.addIdleY},
//			{yoyo:true, repeat:-1, scaleX:this.originScaleX + this.addIdleX, scaleY:this.originScaleY - this.addIdleY, ease:Power0.easeNone});
	this.init();
}

Button.prototype.SetTween = function(){
	TweenMax.fromTo(this.sprite, 0.5,
			{sx:this.originScaleX - this.addIdleX, sy:this.originScaleY - this.addIdleY},
			{yoyo:true, repeat:-1, sx:this.originScaleX + this.addIdleX, sy:this.originScaleY + this.addIdleY, ease:Power0.easeNone});
}

Button.prototype.setScaleType = function(str_scaleType){
	this.scale_type = str_scaleType;
}
/*
Button.prototype.setOriginScale = function(x, y){
	if(x === undefined) x = this.originScaleX;
	if(y === undefined) y = x;
	this.sprite.scale.set(x, y);
	this.originScaleX = x;
	this.originScaleY = y;


	if(this.originScaleX < 0)	this.scaleDown_x = this.originScaleX + 0.1;	
	else						this.scaleDown_x = this.originScaleX - 0.1;
	if(this.originScaleY < 0)	this.scaleDown_y = this.originScaleY + 0.1;
	else						this.scaleDown_y = this.originScaleY - 0.1;
}
Button.prototype.setCallback = function(callBack, THIS){
	if(callBack === undefined) return;
	if(THIS !== undefined)
		callBack = callBack.bind(THIS);
	
	this.main.on("click", callBack);
	this.main.on("tap", callBack);
}
*/
Button.prototype.init = function(){
	var self = this;
	this.main.interactive = true;
	
	this.main.on("mousedown", function(){
		var THIS = self;
		if(THIS.scale_type === "scaleDown")
			TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX+THIS.addScaleX, sy:THIS.originScaleY+THIS.addScaleY, ease:Power1.easeOut});
		else if(THIS.scale_type === "scaleUp")
			TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX-THIS.addScaleX, sy:THIS.originScaleY-THIS.addScaleY, ease:Power1.easeOut});
		
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
		TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX, sy:THIS.originScaleY, ease:Power1.easeOut});
		
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
		TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX, sy:THIS.originScaleY, ease:Power1.easeOut});
		
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
			TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX+THIS.addScaleX, sy:THIS.originScaleY+THIS.addScaleY, ease:Power1.easeOut});
		else if(THIS.scale_type === "scaleUp")
			TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX-THIS.addScaleX, sy:THIS.originScaleY-THIS.addScaleY, ease:Power1.easeOut});
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
		TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX, sy:THIS.originScaleY, ease:Power1.easeOut});
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
		TweenLite.to(this, THIS.tweenTime, {sx:THIS.originScaleX, sy:THIS.originScaleY, ease:Power1.easeOut});
	//	THIS.sprite.tint = THIS.originTint;
		if(THIS.slice == undefined)
			THIS.sprite.tint = THIS.originTint;
		else
		{
			for(var i=0;i<THIS.sprite.children.length;++i)
				THIS.sprite.children[i].tint = THIS.originTint;
		}
	});
}

Object.defineProperties(Button.prototype, {
	visible: {
		get: function(){return this.main.visible;},
		set: function(value){this.main.visible = value;}
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
}