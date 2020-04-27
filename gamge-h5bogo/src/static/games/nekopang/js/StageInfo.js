


var STAGE_CLOSE = 0;	// 스테이지 클로즈
var STAGE_OPEN = 1;		// 스테이지 오픈..

var CAT_NONE = 0;		// 고양이 없음
var CAT_GET_NEW = 1;	// 고양이 얻은상태 new.. 포토존에서 사용
var CAT_GET_NEW2 = 2;	// 고양이 얻은상태 new.. 앨범에서 사용
var CAT_GET = 3;		// 고양이 얻은상태..

StageInfo = function(parent, x, y, callback)
{
	this.main = new PIXI.Container();
	this.main.position.set(x, y);
	this.open = new PIXI.Container();
	this.openBG = SpriteLoad(this.open, "btn_stage.png", 0, -10, 0.5, 0);
	this.mapBG = new PIXI.Container();
	this.openBG.addChild(this.mapBG);
	this.block = [];		// 맵속성이 쌓이는 곳이다.
	for(var y=0;y<MAX_TILE_Y;++y) {
		this.block[y] = [];
		for (var x=0;x<MAX_TILE_X;++x) {
			this.block[y][x] = SpriteLoad(this.mapBG, "map/tile_normal.png", -38 + (x*8), 40 + (y*8));
			this.block[y][x].scale.set(0.1);
			this.block[y][x].visible = false;
		}
	}
	this.openStage = FontLoad(this.openBG, "001", -50, 30, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'20px', fontWeight:'bold', align:'center', fill:'#06b2a3'});
	SpriteLoad(this.openBG, "select_paw1.png", -63, 157, 0.5, 0);
	SpriteLoad(this.openBG, "select_paw1.png", -21, 157, 0.5, 0);
	SpriteLoad(this.openBG, "select_paw1.png", 21, 157, 0.5, 0);
	SpriteLoad(this.openBG, "select_paw1.png", 63, 157, 0.5, 0);
	this.clear = [];
	this.clear[0] = SpriteLoad(this.openBG, "select_paw2.png", -63, 157, 0.5, 0);
	this.clear[1] = SpriteLoad(this.openBG, "select_paw2.png", -21, 157, 0.5, 0);
	this.clear[2] = SpriteLoad(this.openBG, "select_paw2.png", 21, 157, 0.5, 0);
	this.clear[3] = SpriteLoad(this.openBG, "select_paw2.png", 63, 157, 0.5, 0);
	this.clear[0].visible = false;
	this.clear[1].visible = false;
	this.clear[2].visible = false;
	this.clear[3].visible = false;
	SpriteLoad(this.open, "select_pin.png", 0, 0, 0.5, 0.5);
//	this.perup = SpriteSliceLoad(this.openBG, "select_badge.png", -50, 100, 130, 72);
//	FontLoad(this.perup, "촬영\n성공률", -25, -3, 0.5, 0.5,
//		{fontFamily:'VERDANAB', fontSize:'18px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});
	this.close = SpriteLoad(this.main, "btn_stage_block.png", 0, -10, 0.5, 0);
	
	this.open.interactive = true;
	this.open.on('mousedown', callback);
	this.open.on('touchstart', callback);
	
	TweenMax.fromTo(this.openBG, 1,
		{rotation:-0.03},
		{yoyo:true, repeat:-1, rotation:0.03, ease:Power0.easeNone});
	
	this.main.addChild(this.open);
	parent.addChild(this.main);
}

StageInfo.prototype.SetInfo = function(stage, type, bRateup, iClearCnt){
	this.openStage.text = leadingZeros((stage+1), 3);
	switch(type)
	{
	case STAGE_CLOSE:
		this.open.visible = false;
		this.close.visible = true;
		break;
//	case STAGE_OPEN_ANI:
//		break;
	case STAGE_OPEN:
		this.open.visible = true;
		this.close.visible = false;
	//	this.perup.visible = bRateup;
		for(var i=0;i<4;++i)
		{
			if(i < iClearCnt)	this.clear[i].visible = true;
			else				this.clear[i].visible = false;
		}

		switch(tbBlockPos[stage]){
			case 0:this.mapBG.position.set(0, 0);break;
			case 1:this.mapBG.position.set(-4, 0);break;
			case 2:this.mapBG.position.set(4, 0);break;
		}
		switch(tbBlockHPos[stage]){
			case 0:this.mapBG.position.set(this.mapBG.position.x, 0);break;
			case 1:this.mapBG.position.set(this.mapBG.position.x, -4);break;
			case 2:this.mapBG.position.set(this.mapBG.position.x, 4);break;
		}

		for(var y=0;y<MAX_TILE_Y;++y) {
			for (var x=0;x<MAX_TILE_X;++x) {
				if((tbMap[stage][y][x] & CC) == CC)
					this.block[y][x].visible = true;
				else
					this.block[y][x].visible = false;
			}
		}
		break;
	}
}