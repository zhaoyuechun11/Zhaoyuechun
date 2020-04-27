//var Block = Block || {};
var BT_NEKO_1 = 0;		// 고양이
var BT_NEKO_2 = 1;
var BT_NEKO_3 = 2;
var BT_NEKO_4 = 3;
var BT_NEKO_5 = 4;
var BT_NEKO_MAX = 5;		// 고양이 랜덤 처리.
var BT_ITEM_WIDTH = 5;		// 아이템1
var BT_ITEM_HEIGHT = 6;		// 이이템2
var BT_ITEM_BOMB = 7;		// 아이템3
var BT_ITEM_CROSS = 8;		// 아이템4
var BT_ITEM_RAINBOW = 9;	// 아이템5
var BT_ITEM0 = 10;			// 이동벽
var BT_ITEM1 = 11;			// 고정벽
var BT_ITEM2 = 12;			// 무적벽.
var BT_ITEM3 = 13;			// 구름모양.
var BT_HERO = 14;			// 주인공.
var BT_BOX = 15;			// 산물박스.

var BT_ITEM_NONE = 20;		// 아무것도 없는 상태..
var BT_ITEM4 = 21;			// 액자모양의 블럭 

var BS_NONE = 0;
var BS_MOVE_DOWN_CENTER = 5;
var BS_MOVE_DOWN_LEFT = 10;
var BS_MOVE_DOWN_RIGHT = 15;
var BS_MOVE_DOWN_BOUNCE_SET = 20;
var BS_MOVE_DOWN_BOUNCE = 21;
var BS_MOVE_LEFT = 25;
var BS_MOVE_RIGHT = 30;
var BS_MOVE_TOP = 35;
var BS_MOVE_BOTTOM = 40;
var BS_MOVE_LEFT2 = 41;		// 캐릭터가 움직일때 사용한다.
var BS_MOVE_RIGHT2 = 42;
var BS_MOVE_TOP2 = 43;
var BS_MOVE_BOTTOM2 = 44;
var BS_BOMB_SET = 45;
var BS_BOMB_ING = 50;
var BS_BOMB_END = 55;
var BS_ITEM_BOMB_SET = 60;	// 아이템에 의해 터질때 잠시 대기..
var BS_ITEM_BOMB_ING = 65;	// 

var BLOCK_START_SPEED = 6;
var BLOCK_MAX_SPEED = 20;
var BLOCK_SPEED = 12;//8;
var HERO_SPEED = 4.8;//2.4;
var GRAVITY_ADD = 0.5; 

Block = function(parent, cbDragStart, cbDragMove, cbDragEnd, spineHeroData, spineBlockData)
{
	this.state = BS_NONE;
	this.oldType = 0;
	this.type = Mathfloor(Math.random() * BT_NEKO_MAX);	// 초반 생성할때 블럭을 아무블럭으로 생성한다.
	this.type2 = BT_ITEM_NONE;
	this.touch = true;	// 블럭을 손으로 이동가능한가.
	this.move = true;	// 블럭이 밑으로 떨어지는가.
	this.hp = 0;		// hp가 있는 블럭이 있다.
	this.ix = 0;		// 배열 인덱스값을 저장한다.
	this.iy = 0;
	this.it = 0;		// kBlock의 인덱스값..
	this.time = 0;
	this.timeMax = 0;
	this.speed = BLOCK_START_SPEED;
	this.gravity = 1;
	this.x = iCenterSizeX;	// 나중에 스파인사용때문에 x, y를 따로 둔다.
	this.y = iCenterSizeY;
	this.sprMain = new PIXI.Container();
	parent.addChild(this.sprMain);
	this.spr = SpriteLoad(this.sprMain, "block/cat_block_1.png", 0, 0);//this.x, this.y);
	this.spr.interactive = true;
	this.spr_block = SpriteLoad(this.spr, "block/cage_block.png", 0, 0);
	this.spr_block.visible = false;
	this.spr.on('mousedown', cbDragStart.bind(this));
	this.spr.on('touchstart', cbDragStart.bind(this));
	this.spr.on('mousemove', cbDragMove);
	this.spr.on('touchmove', cbDragMove);
	this.spr.on('mouseup', cbDragEnd.bind(this));
	this.spr.on('touchend', cbDragEnd.bind(this));

	this.spine_Hero = new PIXI.spine.Spine(spineHeroData);
	this.spine_Hero.state.addListener({complete:this.cbSpineHeroComplete.bind(this)});
	this.sprMain.addChild(this.spine_Hero);
//	SpinePlay(this.spine_Hero, undefined, undefined, "girl_character_idle_1", 1, true);
	this.idleMax = Mathfloor(2 + (Math.random() * 3));
	this.spine_Hero.visible = false;

//	this.spr.displayGroup = sZorder;
//	this.spr.zOrder = 11;
//	this.spine_Hero.displayGroup = sZorder;
//	this.spine_Hero.zOrder = 12;

	this.SetBlock();
}

Block.prototype.cbSpineHeroComplete = function(entry)
{
	if(this.spine_Hero.visible == false) return;
	
	switch(entry.trackIndex){
	case 1:
		this.spine_Hero.state.timeScale = 1;
		if(Mathfloor(entry.trackTime/entry.animationEnd) == this.idleMax)
			SpinePlay(this.spine_Hero, undefined, undefined, "girl_character_idle_2", 2, false);
		break;
	case 2:
		this.spine_Hero.state.timeScale = 1;
		this.idleMax = Mathfloor(2 + (Math.random() * 3));
		SpinePlay(this.spine_Hero, undefined, undefined, "girl_character_idle_1", 1, true);
		break;
	case 3:	// 실패 애니메이션
		this.spine_Hero.state.timeScale = 1;
		SpinePlay(this.spine_Hero, undefined, undefined, "girl_character_failed_idle", 0, true);
		break;
	}
}

Block.prototype.Update = function()
{
	switch(this.state)
	{
	case BS_NONE:	// 아무짓도 하지 않는다.
		break;
	case BS_MOVE_DOWN_CENTER:
		this.y += this.speed;		
		this.speed += this.gravity;
		this.gravity += GRAVITY_ADD;
		if(this.speed > BLOCK_MAX_SPEED)
			this.speed = BLOCK_MAX_SPEED;
		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_DOWN_LEFT:
		this.x -= this.speed;
		this.y += this.speed;
		this.speed += this.gravity;
		this.gravity += GRAVITY_ADD;
		if(this.speed > BLOCK_MAX_SPEED)
			this.speed = BLOCK_MAX_SPEED;
		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_DOWN_RIGHT:
		this.x += this.speed;
		this.y += this.speed;
		this.speed += this.gravity;
		this.gravity += GRAVITY_ADD;
		if(this.speed > BLOCK_MAX_SPEED)
			this.speed = BLOCK_MAX_SPEED;
		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_DOWN_BOUNCE_SET:
		var bounce = new TimelineLite();
		bounce.append(new TweenMax(this.sprMain, 0.15,
				{y:this.sprMain.position.y + 10, sx:1.1, sy:0.9, ease:Linear.easeNone}));
		bounce.append(new TweenMax(this.sprMain, 0.15,
				{y:this.sprMain.position.y, sx:1, sy:1, ease:Linear.easeNone, onComplete:this.cbTweenBounce.bind(this)}));
		this.state = BS_MOVE_DOWN_BOUNCE;
		break;
	case BS_MOVE_DOWN_BOUNCE:
		break;
	case BS_MOVE_LEFT:
		this.x -= BLOCK_SPEED;
		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_RIGHT:
		this.x += BLOCK_SPEED;
		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_TOP:
		this.y -= BLOCK_SPEED;
		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_BOTTOM:
		this.y += BLOCK_SPEED;
		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_LEFT2:
//		this.x -= HERO_SPEED;
//		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_RIGHT2:
//		this.x += HERO_SPEED;
//		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_TOP2:
//		this.y -= HERO_SPEED;
//		this.SetPosition(this.x, this.y);
		break;
	case BS_MOVE_BOTTOM2:
//		this.y += HERO_SPEED;
//		this.SetPosition(this.x, this.y);
		break;
	case BS_BOMB_SET:
		this.time = 0;
		this.state = BS_BOMB_ING;
		break;
	case BS_BOMB_ING:
		this.time += deltaTime;
		if(this.time >= this.timeMax) {
			switch(this.type) {
				case BT_NEKO_1:
					SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), 5);
					SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], this.x, this.y, "cat_blck_1_bomb", 1, false, SPINE_INIT_ALL);
					break;
				case BT_NEKO_2:
					SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), 1);
					SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], this.x, this.y, "cat_blck_2_bomb", 1, false, SPINE_INIT_ALL);
					break;
				case BT_NEKO_3:
					SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), 3);
					SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], this.x, this.y, "cat_blck_3_bomb", 1, false, SPINE_INIT_ALL);
					break;
				case BT_NEKO_4:
					SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), 4);
					SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], this.x, this.y, "cat_blck_4_bomb", 1, false, SPINE_INIT_ALL);
					break;
				case BT_NEKO_5:
					SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), 2);
					SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], this.x, this.y, "cat_blck_5_bomb", 1, false, SPINE_INIT_ALL);
					break;
				case BT_ITEM3:
					SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], this.x, this.y, "grass_block_action", 1, false, SPINE_INIT_ALL);
					break;
				default:
					SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], this.x, this.y, "armor_block_bomb", 1, false, SPINE_INIT_ALL);
					break;
			}
			if(++ispine_block_bomb_eff_cnt >= ispine_block_bomb_eff_max)
				ispine_block_bomb_eff_cnt = 0;
			this.spr.visible = false;
			this.state = BS_BOMB_END;
		}
		break;
	case BS_BOMB_END:
		break;
	case BS_ITEM_BOMB_SET:
		this.time = 0;
		this.state = BS_ITEM_BOMB_ING;
		break;
	case BS_ITEM_BOMB_ING:
		this.time += deltaTime;
		if(this.time >= 1)
		{
			this.state = BS_BOMB_SET;
		}
		break;
	}
}

Block.prototype.cbTweenBounce = function()
{
	this.sprMain.scale.set(1);
	this.state = BS_NONE;
}

Block.prototype.SetItem = function(_type)
{
	switch(_type)
	{
		case ITEM1:	// 이동벽 hp1
			this.hp = 1;
			this.SetBlock(BT_ITEM0);
			break;
		case ITEM2:	// 이동벽 hp2
			this.hp = 2;
			this.SetBlock(BT_ITEM0);
			break;
		case ITEM3:	// 이동벽 hp3
			this.hp = 3;
			this.SetBlock(BT_ITEM0);
			break;
		case ITEM4:	// 고정벽 hp1
			this.hp = 1;
			this.SetBlock(BT_ITEM1);
			break;
		case ITEM5:	// 고정벽 hp2
			this.hp = 2;
			this.SetBlock(BT_ITEM1);
			break;
		case ITEM6:	// 고정벽 hp3
			this.hp = 3;
			this.SetBlock(BT_ITEM1);
			break;
		case ITEM7:	// 무적벽(안깨지는 블럭)
			this.hp = -1;
			this.SetBlock(BT_ITEM2);
			break;
		case ITEM8:	// 수풀 : 주인공하고 부딪히면 없어진다.
			this.hp = -1;
			this.SetBlock(BT_ITEM3);
			break;
		case ITEM9:	// 고정 케이지
			this.hp = 2;
			this.SetBlock(undefined, BT_ITEM4);
			break;
		case ITEM14:
			this.hp = 1;
			this.SetBlock(BT_ITEM_HEIGHT, undefined, false);
			break;
		case ITEM15:
			this.hp = 1;
			this.SetBlock(BT_ITEM_WIDTH, undefined, false);
			break;
		case ITEM16:
			this.hp = 1;
			this.SetBlock(BT_ITEM_CROSS, undefined, false);
			break;
		case ITEM17:
			this.hp = 1;
			this.SetBlock(BT_ITEM_BOMB, undefined, false);
			break;
		case ITEM18:
			this.hp = 1;
			this.SetBlock(BT_ITEM_RAINBOW, undefined, false);
			break;
	}
}

Block.prototype.HeroVisible = function()
{
	var i=0;
	this.spr.visible = true;
	if(this.spine_Hero.visible == true){
		this.spine_Hero.visible = false;
		for(i=0;i<this.spine_Hero.state.tracks.length;++i)
			if(this.spine_Hero.state.tracks[i] != null)
				this.spine_Hero.state.clearTrack(this.spine_Hero.state.tracks[i].trackIndex);
	}
}

Block.prototype.SetBlock = function(_type, _type2, bScore)
{
	if(_type != undefined) {
		this.oldType = this.type;
		this.type = _type;
	}

	if(_type2 === undefined)
		_type2 = BT_ITEM_NONE;
	this.type2 = _type2;
	
	switch(this.type)
	{
		case BT_NEKO_1:
			this.HeroVisible();
			if(this.type2 == BT_ITEM_NONE){
				this.touch = true;
				this.move = true;
				this.spr_block.visible = false;
				this.hp = 1;
			}
			else{
				this.touch = false;
				this.move = false;
				this.spr_block.visible = true;
			}
			break;
		case BT_NEKO_2:
			this.HeroVisible();
			if(this.type2 == BT_ITEM_NONE){
				this.touch = true;
				this.move = true;
				this.spr_block.visible = false;
				this.hp = 1;
			}
			else{
				this.touch = false;
				this.move = false;
				this.spr_block.visible = true;
			}
			break;
		case BT_NEKO_3:
			this.HeroVisible();
			if(this.type2 == BT_ITEM_NONE){
				this.touch = true;
				this.move = true;
				this.spr_block.visible = false;
				this.hp = 1;
			}
			else{
				this.touch = false;
				this.move = false;
				this.spr_block.visible = true;
			}
			break;
		case BT_NEKO_4:
			this.HeroVisible();
			if(this.type2 == BT_ITEM_NONE){
				this.touch = true;
				this.move = true;
				this.spr_block.visible = false;
				this.hp = 1;
			}
			else{
				this.touch = false;
				this.move = false;
				this.spr_block.visible = true;
			}
			break;
		case BT_NEKO_5:
			this.HeroVisible();
			if(this.type2 == BT_ITEM_NONE){
				this.touch = true;
				this.move = true;
				this.spr_block.visible = false;
				this.hp = 1;
			}
			else{
				this.touch = false;
				this.move = false;
				this.spr_block.visible = true;
			}
			break;
		case BT_ITEM0:
			this.HeroVisible();
			this.touch = false;
			this.move = true;
			break;
		case BT_ITEM1:
			this.HeroVisible();
			this.touch = false;
			this.move = false;
			break;
		case BT_ITEM2:
			this.hp = -1; // 무적..
			this.HeroVisible();
			this.touch = false;
			this.move = true;
			break;
		case BT_ITEM3:
			this.hp = -1;	// 무적..
			this.HeroVisible();
			this.touch = false;
			this.move = false;
			break;
		case BT_ITEM_WIDTH:
			if(bScore === undefined)
				SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), this.oldType);
			this.HeroVisible();
			this.hp = 1;
			this.touch = true;
			this.move = true;
			break;
		case BT_ITEM_HEIGHT:
			if(bScore === undefined)
				SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), this.oldType);
			this.HeroVisible();
			this.hp = 1;
			this.touch = true;
			this.move = true;
			break;
		case BT_ITEM_BOMB:
			if(bScore === undefined)
				SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), this.oldType);
			this.HeroVisible();
			this.hp = 1;
			this.touch = true;
			this.move = true;
			break;
		case BT_ITEM_CROSS:
			if(bScore === undefined)
				SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), this.oldType);
			this.HeroVisible();
			this.hp = 1;
			this.touch = true;
			this.move = true;
			break;
		case BT_ITEM_RAINBOW:
			if(bScore === undefined)
				SetScoreAni(this.x, this.y, (50 + (iComboCnt*((iComboCnt*5)-5))) + (Mathfloor(iComboCnt/5)*50), this.oldType);
			this.HeroVisible();
			this.hp = 1;
			this.touch = true;
			this.move = true;
			break;
		case BT_HERO:
			this.hp = -1;
			this.touch = false;
			this.move = false;
			break;
		case BT_BOX:
			this.HeroVisible();
			this.hp = -1;
			this.touch = false;
			this.move = false;
			break;
	}
	this.SetView();
}

Block.prototype.SetDamage = function(time)
{
	if(this.hp > 0)
	{
		this.hp--;
	//	if(this.hp == 0)
	//		this.state = BS_ITEM_BOMB_SET;
		if(this.hp == 0) {
			if(time == undefined)
				this.timeMax = 0;
			else
				this.timeMax = time;
			this.state = BS_BOMB_SET;	// 나중에 아이템에 의해 터지는 부분은 보정해야 한다.
		}
	}
	
	switch(this.type)
	{
		case BT_NEKO_1:
		case BT_NEKO_2:
		case BT_NEKO_3:
		case BT_NEKO_4:
		case BT_NEKO_5:
			if(this.hp == 1) {
				SESoundPlay(SE_Obstacle_Cage);
				this.SetBlock(this.type, BT_ITEM_NONE);
			}
			else
				this.SetView();
		//	return this;
			break;
		case BT_ITEM0:
			this.SetView();
			break;
		case BT_ITEM1:
			this.SetView();
			break;
		case BT_ITEM2:	// 무적블럭
			break;
		case BT_ITEM3:	// 구름헤어블럭
			break;
		case BT_ITEM_WIDTH:
			return this;
			break;
		case BT_ITEM_HEIGHT:
			return this;
			break;
		case BT_ITEM_BOMB:
			return this;
			break;
		case BT_ITEM_CROSS:
			return this;
			break;
		case BT_ITEM_RAINBOW:
			return this;
			break;
		case BT_HERO:	// 무적
			break;
		case BT_BOX:	// 무적..
			break;
	}
	
	return undefined;
}

Block.prototype.SetAroundDamage = function()
{	
	switch(this.type)
	{
		case BT_NEKO_1:
		case BT_NEKO_2:
		case BT_NEKO_3:
		case BT_NEKO_4:
		case BT_NEKO_5:
			this.SetView();
			break;
		case BT_ITEM0:
			if(this.hp > 0)
			{
				SESoundPlay(SE_Obstacle_TrashCan);
				this.hp--;
				if(this.hp == 0)
					this.state = BS_BOMB_SET;
			}
			this.SetView();
			break;
		case BT_ITEM1:
			if(this.hp > 0)
			{
				SESoundPlay(SE_Obstacle_Fireplug);
				this.hp--;
				if(this.hp == 0)
					this.state = BS_BOMB_SET;
			}
			this.SetView();
			break;
		case BT_ITEM2:	// 무적블럭
			break;
		case BT_ITEM3:	// 구름헤어블럭
			break;
		case BT_ITEM_WIDTH:
			break;
		case BT_ITEM_HEIGHT:
			break;
		case BT_ITEM_BOMB:
			break;
		case BT_ITEM_CROSS:
			break;
		case BT_ITEM_RAINBOW:
			break;
		case BT_HERO:	// 무적
			break;
		case BT_BOX:	// 무적..
			break;
	}
}

Block.prototype.SetView = function(_type)
{
	if(_type != undefined)
		this.type = _type;
	
	switch(this.type)
	{
		case BT_NEKO_1:
			this.spr.texture = PIXI.Texture.fromFrame('block/cat_block_1.png');
			if(this.hp > 1)
				this.spr_block.visible = true;
			else
				this.spr_block.visible = false;
			break;
		case BT_NEKO_2:
			this.spr.texture = PIXI.Texture.fromFrame('block/cat_block_2.png');
			if(this.hp > 1)
				this.spr_block.visible = true;
			else
				this.spr_block.visible = false;
			break;
		case BT_NEKO_3:
			this.spr.texture = PIXI.Texture.fromFrame('block/cat_block_3.png');
			if(this.hp > 1)
				this.spr_block.visible = true;
			else
				this.spr_block.visible = false;
			break;
		case BT_NEKO_4:
			this.spr.texture = PIXI.Texture.fromFrame('block/cat_block_4.png');
			if(this.hp > 1)
				this.spr_block.visible = true;
			else
				this.spr_block.visible = false;
			break;
		case BT_NEKO_5:
			this.spr.texture = PIXI.Texture.fromFrame('block/cat_block_5.png');
			if(this.hp > 1)
				this.spr_block.visible = true;
			else
				this.spr_block.visible = false;
			break;
		case BT_ITEM0:
			if(this.hp > 0)
				this.spr.texture = PIXI.Texture.fromFrame('block/dustbox_block_hp'+this.hp+'.png');
			break;
		case BT_ITEM1:
			if(this.hp > 0)
				this.spr.texture = PIXI.Texture.fromFrame('block/fire_water_block_hp'+this.hp+'.png');
			break;
		case BT_ITEM2:
			this.spr.texture = PIXI.Texture.fromFrame('block/stone_block.png');
			break;
		case BT_ITEM3:
			this.spr.texture = PIXI.Texture.fromFrame('block/grass_block.png');
			break;
		case BT_ITEM_WIDTH:
			this.spr.texture = PIXI.Texture.fromFrame('block/bomb_block_2.png');
			break;
		case BT_ITEM_HEIGHT:
			this.spr.texture = PIXI.Texture.fromFrame('block/bomb_block_1.png');
			break;
		case BT_ITEM_BOMB:
			this.spr.texture = PIXI.Texture.fromFrame('block/bomb_block_4.png');
			break;
		case BT_ITEM_CROSS:
			this.spr.texture = PIXI.Texture.fromFrame('block/bomb_block_3.png');
			break;
		case BT_ITEM_RAINBOW:
			this.spr.texture = PIXI.Texture.fromFrame('block/bomb_block_5.png');
			break;
		case BT_HERO:
			this.spr.visible = false;
			this.spine_Hero.visible = true;
			this.spine_Hero.state.timeScale = 1;
			SpinePlay(this.spine_Hero, undefined, undefined, "girl_character_idle_1", 1, true);
			break;
		case BT_BOX:
			this.spr.texture = PIXI.Texture.fromFrame('block/goal_cat.png');
			break;
	}
}

Block.prototype.SetPosition = function(x, y)
{
	this.x = x;
	this.y = y;
	this.sprMain.position.set(x, y);
}

Block.prototype.SetVisible = function(flag)
{
	// 나중에 상태에 따라 visible을 시키는게 달라진다.
	this.sprMain.visible = flag;
}

Block.prototype.IsVisible = function()
{
	// 나중에 상태에 따라 다르다.
	return this.sprMain.visible;
}
/*
Block.prototype.cbSpineEnd = function(entry)
{
	switch(entry.trackIndex){
	case 1:
		this.state = BS_BOMB_END;
	//	this.spine_block_bomb_eff.visible = false;
		break;
	}	
}
	*/




/*
var tbShop_json = "[{\"icon\":\"film_no_1.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":100,\"reward\":5,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_2.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":300,\"reward\":25,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_3.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":500,\"reward\":55,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_4.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":1000,\"reward\":130,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_1.png\",\"bg\":\"list_1.png\",\"market\":1,\"pType\":\"point\",\"Price\":100,\"reward\":5,\"login\":1,\"membersOnly\":1,\"btnbg\":\"btn_shop_1.png\"},{\"icon\":\"film_no_3.png\",\"bg\":\"list_1.png\",\"market\":1,\"pType\":\"point\",\"Price\":600,\"reward\":40,\"login\":1,\"membersOnly\":1,\"btnbg\":\"btn_shop_1.png\"},{\"icon\":\"film_no_1.png\",\"bg\":\"list_2.png\",\"market\":1,\"pType\":\"ad_1\",\"Price\":0,\"reward\":5,\"login\":0,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_3.png\",\"bg\":\"list_2.png\",\"market\":1,\"pType\":\"ad_2\",\"Price\":0,\"reward\":30,\"login\":0,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"}]";
var tbShop = JSON.parse(tbShop_json);

Shop = function(parent)
{
//	this.market = 0;
//	this.bLogin = true;
	this.main = new PIXI.Container();
	parent.addChild(this.main);
	//===============================================================================
	// 필름샵 구성 (야후용)
	this.shop_Yahoo = new PIXI.Container();
	// 검은색 배경
	var spr = SpriteLoad(this.shop_Yahoo, "white.png", iCenterSizeX/4, iCenterSizeY/4);
	spr.scale.set(iMaxSizeX, iMaxSizeY);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', this.cbButtonWhite);
	spr.on('tap', this.cbButtonWhite);

	spr = SpriteSliceLoad(this.shop_Yahoo, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 950);
	var spr2 = SpriteLoad(spr, "title.png", 0, -412);
	FontLoad(spr2, GetString("FILMSHOP"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 810);

	// 상단 포인트
	var spr3 = SpriteSliceLoad(spr2, "point_bg.png", 0, -350, 300, 60);
	spr3.interactive = true;
	spr3.on('click', this.cbButtonLogin.bind(this));
	spr3.on('tap', this.cbButtonLogin.bind(this));
	this.sprPointIcon = SpriteLoad(spr3, "point.png", -150, 0);
	this.txtPoint = FontLoad(spr3, "0", 10, 2, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', padding:2, stroke:'#005653', strokeThickness:6});
	this.btnPointBuy = new Button(spr3, "btn_plus.png", 150, 0, this.cbButtonPointBuy, "scaleDown");
	this.btnPointBuy.visible = false;

	// 메뉴구성.
	this.sprBG = [];
	this.sprBGType = [];
	this.btnBG = [];
	this.btnBGType = [];
	this.icon = [];
	this.iconM = [];
	this.txtRewardNum = [];
	this.txtPrice = [];
	this.sprPrice = [];
	this.txtMembersOnly = [];
	this.sprBGType[0] = SpriteSliceLoad(this.main, "list_1.png", 0, 0, 610, 150);
	this.sprBGType[1] = SpriteSliceLoad(this.main, "list_2.png", 0, 0, 610, 150);
	this.sprBGType[0].visible = false;
	this.sprBGType[1].visible = false;
	this.btnBGType[0] = SpriteSliceLoad(this.main, "btn_shop_1.png", 0, 0, 186, 82);
	this.btnBGType[1] = SpriteSliceLoad(this.main, "btn_shop_2.png", 0, 0, 186, 82);
	this.btnBGType[2] = SpriteSliceLoad(this.main, "btn_shop_cooltime.png", 0, 0, 186, 82);
	this.btnBGType[0].visible = false;
	this.btnBGType[1].visible = false;
	this.btnBGType[2].visible = false;
	for(var i=0;i<4;++i){
		this.sprBG[i] = SpriteSliceLoad(spr2, tbShop[i].bg, 0, -230 + (145*i), 610, 150);
		this.icon[i] = SpriteLoad(this.sprBG[i], tbShop[i].icon, -170, -3);
		this.txtRewardNum[i] = BitmapFontLoad(this.sprBG[i], "x"+tbShop[i].reward, 5, -15, 0.5, 0.5,
				{font:'65px shop_no', align:'center', tint: 0xffffff});
		this.btnBG[i] = SpriteSliceLoad(this.sprBG[i], tbShop[i].btnbg, 0, 0, 186, 82);
		var spr4 = new Button(this.sprBG[i], "btn_start.png", 185, 0, eval("this.cbButtonClick"+i+".bind(this)"), "scaleDown", 1, 1, 0.5, 0.5, this.btnBG[i]);
		this.iconM[i] = SpriteLoad(spr4.sprite, "gold_1.png", 0, 5);
		this.iconM[i].scale.set(0.6);
		this.iconM[i].visible = false;
		this.txtPrice[i] = FontLoad(spr4.sprite, tbShop[i].Price, 0, -5, 0.5, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'32px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#015754', strokeThickness:6});
		this.sprPrice[i] = SpriteLoad(spr4.sprite, "shop_movie.png", 0, -5);
		this.sprPrice[i].visible = false;
		this.txtMembersOnly[i] = FontLoad(this.sprBG[i], GetString("MembersOnly"), -230, -45, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'25px', fontWeight:'bold', align:'center', fill:'#ffffff', padding:2, stroke:'#000000', strokeThickness:4});
	}

	// todo : kook : 일본대응 임시 추가.
//	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 810);
//	for(var ii=0;ii<9;++ii){
//		spr2.children[ii].tint = 0x000000;
//		spr2.children[ii].alpha = 0.8;
//	}
//	spr2.interactive = true;
//	FontLoad(spr2, "COMING SOON", 0, 0, 0.5, 0.5,
//		{fontFamily:tbTTF[lang], fontSize:'70px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	// todo : kook : 일본대응 임시 추가. end

	// OK버튼
	spr3 = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 250, 97);
	FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 0, 340, this.cbButtonClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
	this.main.addChild(this.shop_Yahoo);
	//===============================================================================
	// 성공 팝업구성.
	this.popup_success = new PIXI.Container();
	spr = SpriteLoad(this.popup_success, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX, iMaxSizeY);
	spr.tint = 0x000000;
	spr.alpha = 0.7;
	spr.interactive = true;
	spr.on('click', this.cbButtonWhite);
	spr.on('tap', this.cbButtonWhite);

	spr = SpriteSliceLoad(this.popup_success, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 410);
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, -3, 620, 350);
	spr3 = SpriteSliceLoad(spr2, "list_1.png", 0, -90, 350, 140);
	this.popup_success_icon = SpriteLoad(spr3, "film_no_1.png", 0, -5);
	this.popup_success_txtRewardNum = BitmapFontLoad(spr3, "x60", 160, -45, 1, 0.5,
			{font:'50px shop_no', align:'center', tint: 0xffffff});
	this.popup_success_txtContents = FontLoad(spr2, "하트 50개 획득!", 0, 15, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00887B', strokeThickness:8});

	spr3 = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 250, 97);
	FontLoad(spr3, "OK", 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 0, 110, this.cbButtonPopupSuccessClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
	this.popup_success.visible = false;
	this.main.addChild(this.popup_success);
	//===============================================================================
	// 에러 팝업구성.
	this.popupState = 0;	// 0:로그인경고창..
	this.popup_error = new PIXI.Container();
	spr = SpriteLoad(this.popup_error, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX, iMaxSizeY);
	spr.tint = 0x000000;
	spr.alpha = 0.7;
	spr.interactive = true;
	spr.on('click', this.cbButtonWhite);
	spr.on('tap', this.cbButtonWhite);

	spr = SpriteSliceLoad(this.popup_error, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 410);
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, -3, 620, 350);
	this.popup_error_txtContents = FontLoad(spr2, "", 0, -60, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00887B', strokeThickness:8});

	spr3 = SpriteSliceLoad(spr2, "btn_no.png", 0, 0, 250, 97);
	FontLoad(spr3, GetString("NO"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_no.png", -150, 110, this.cbButtonPopupErrorClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
	spr3 = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 250, 97);
	FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 150, 110, this.cbButtonPopupErrorOK.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
	this.popup_error.visible = false;
	this.main.addChild(this.popup_error);
	//===============================================================================
	// 캐쉬샵 구성 (야후용)
	/!*
	if(proto.serPos == 1){
		this.shop_Cash = new PIXI.Container();
		// 검은색 배경
		spr = SpriteLoad(this.shop_Cash, "white.png", iCenterSizeX/4, iCenterSizeY/4);
		spr.scale.set(iMaxSizeX, iMaxSizeY);
		spr.tint = 0x000000;
		spr.alpha = 0.4;
		spr.interactive = true;
		spr.on('click', this.cbButtonWhite);
		spr.on('tap', this.cbButtonWhite);

		spr = SpriteSliceLoad(this.shop_Cash, "popup_gold_top.png", iCenterSizeX, iCenterSizeY - 495 + 30, 660, 100);
		FontLoad(spr, GetString("MSHOP"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
		spr2 = SpriteSliceLoad(this.shop_Cash, "popup_gold_bottom.png", iCenterSizeX, iCenterSizeY + 50 + 30, 660, 990);

		// 상단 포인트
		spr3 = SpriteSliceLoad(spr2, "gold_bg.png", 0, -450, 300, 60);
		SpriteLoad(spr3, "gold_2.png", -150, 0);
		this.txtMPoint = FontLoad(spr3, "0", 10, 2, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff'});

		// 메뉴구성.
		this.txtMRewardNum = [];
		this.txtDiscount = [];
		this.txtMPrice = [];
		var tbTMRewardNum = [200, 650, 2300, 4100, 8100, 18000];
		var tbTMDiscount = [0, 8, 21, 36, 36, 36];
		var tbTMPrice = [240, 720, 2300, 3600, 6800, 10200];
		for(var i=0;i<6;++i){
			spr3 = SpriteSliceLoad(spr2, "list_3.png", 0, -330 + (124*i), 610, 112);
			SpriteLoad(spr3, "gold_2.png", -240, 0);
			this.txtMRewardNum[i] = FontLoad(spr3, GetComma(tbTMRewardNum[i]), -180, -15, 0, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
			spr = FontLoad(spr3, "BONUS", -180, 25, 0, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'24px', fontWeight:'bold', align:'center', fill:'#35495c'});
			this.txtDiscount[i] = FontLoad(spr, "+" + tbTMDiscount[i] + "%", spr.width + 5, 0, 0, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'24px', fontWeight:'bold', align:'center', fill:'#ffff00'});
			spr = SpriteSliceLoad(spr3, "btn_gold.png", 0, 0, 190, 70);
			var spr4 = new Button(spr3, "btn_gold.png", 185, 0, eval("this.cbButtonMClick"+i+".bind(this)"), "scaleDown", 1, 1, 0.5, 0.5, spr);
			this.txtMPrice[i] = FontLoad(spr4.sprite, "￥" + GetComma(tbTMPrice[i]), 0, 0, 0.5, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'30px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#5f6e7c', strokeThickness:5});
		}
		// OK버튼
		spr3 = SpriteSliceLoad(spr2, "btn_ok_gold.png", 0, 0, 250, 97);
		FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
		new Button(spr2, "btn_ok_gold.png", 0, 420, this.cbButtonClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);

		this.shop_Cash.visible = false;
		this.main.addChild(this.shop_Cash);
		//===============================================================================
		// 캐쉬샵 성공 팝업구성.
		this.popup_Msuccess = new PIXI.Container();
		spr = SpriteLoad(this.popup_Msuccess, "white.png", iCenterSizeX, iCenterSizeY);
		spr.scale.set(iMaxSizeX, iMaxSizeY);
		spr.tint = 0x000000;
		spr.alpha = 0.7;
		spr.interactive = true;
		spr.on('click', this.cbButtonWhite);
		spr.on('tap', this.cbButtonWhite);

		spr = SpriteSliceLoad(this.popup_Msuccess, "popup_message_gold.png", iCenterSizeX, iCenterSizeY, 560, 410);
		spr3 = SpriteSliceLoad(spr, "list_3.png", 0, -90, 350, 130);
		this.popup_Msuccess_sprIcon = SpriteLoad(spr3, "gold_2.png", 0, 0);
		this.popup_Msuccess_txtRewardNum = FontLoad(spr3, "18,000", 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
		this.popup_Msuccess_sprIcon.position.set(-this.popup_Msuccess_txtRewardNum.width/2 - 5, 0);
		this.popup_Msuccess_txtRewardNum.position.set(this.popup_Msuccess_sprIcon.width/2 + 5, 0);
		this.popup_Msuccess_txtContents = FontLoad(spr, "하트 50개 획득!", 0, 25, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00887B', strokeThickness:8});

		spr3 = SpriteSliceLoad(spr, "btn_ok_gold.png", 0, 0, 250, 97);
		FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
		new Button(spr, "btn_start.png", 0, 120, this.cbButtonPopupMSuccessClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
		this.popup_Msuccess.visible = false;
		this.main.addChild(this.popup_Msuccess);
	}
	*!/
	this.main.visible = false;
}

Shop.prototype.Update = function()
{
	if(kShop.main.visible == true){
		for(i=0;i<4;++i) {
			if(kData.fADTime[i] != -1){
				if((Date.now() - kData.fADTime[i])/1000 < 600)
					kShop.txtPrice[i].text = GetTime(Mathfloor(600 - ((Date.now() - kData.fADTime[i]) / 1000)));
				else {
					kData.fADTime[i] = -1;
					this.SetMenu(tbShop[i + 4].pType, i);
					//SaveDataInClient();
				//	networkManager.ForcedSaveData();
				}
			}
		}
	}
}

Shop.prototype.SetMenu = function(type, i)
{
	switch (type) {
		case "member":
		case "point":
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			if(proto.serPos == 0){
				this.txtPrice[i].text;
				this.txtPrice[i].position.set(0, -5);
				this.iconM[i].visible = true;
				this.iconM[i].position.set((-this.txtPrice[i].width/2), -5);
				this.txtPrice[i].position.set(this.iconM[i].width/2, -5);
				this.txtMembersOnly[i].visible = true;
				SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[0]);
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[0]);
			}else{
				this.iconM[i].visible = true;
				this.iconM[i].position.set((-this.txtPrice[i].width/2), -5);
				this.txtPrice[i].position.set(this.iconM[i].width/2, -5);
				this.txtMembersOnly[i].visible = false;
				SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			}
			break;
		case "ad_1":
			this.iconM[i].visible = false;
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			this.txtPrice[i].text = "AD";
			this.txtMembersOnly[i].visible = false;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			if(kData.fADTime[i] == -1)
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			else
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[2]);
			break;
		case "ad_2":
			this.iconM[i].visible = false;
			this.txtMembersOnly[i].visible = false;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			if(kData.fADTime[i] == -1) {
				this.txtPrice[i].visible = false;
				this.sprPrice[i].visible = true;
				this.sprPrice[i].texture = PIXI.Texture.fromFrame("shop_movie.png");
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			}
			else {
				this.txtPrice[i].visible = true;
				this.sprPrice[i].visible = false;
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[2]);
			}
			break;
		case "ad_3":
			this.iconM[i].visible = false;
			this.txtPrice[i].visible = false;
			this.sprPrice[i].visible = true;
			this.sprPrice[i].texture = PIXI.Texture.fromFrame("shop_down.png");
			this.txtMembersOnly[i].visible = false;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			break;
		case "pay":
			this.iconM[i].visible = false;
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			this.txtPrice[i].text += "￥";
			this.txtMembersOnly[i].visible = true;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			break;
	}
}

Shop.prototype.Show = function()
{
	SESoundPlay(SE_ButtonClick);
	if(this.main.visible == true) return;
	/!*if(networkManager.networkState != NET_STATE.LOCALHOST) {
		networkManager.GetShoplist(ShopType.HEART, function () {
			SESoundPlay(SE_PopupOn);
			this.main.visible = true;
			this.shop_Yahoo.visible = true;	// 현재는 한개만 사용하고 있음. 일본, 국내 다 같이 사용..
			TweenMax.fromTo(this.shop_Yahoo.children[0], 0.5, {alpha: 0},
				{alpha: 0.9, ease: Linear.easeNone});
			TweenMax.fromTo(this.shop_Yahoo.children[1], 1, {as: 0.5},
				{as: 1, ease: Elastic.easeOut});

			var i = 0;
			if (loginTF == 1) {	// 로그인상태..
				switch (proto.serPos) {
					case 0: // 글로벌버젼
						this.txtPoint.text = GetComma(kData.iMoviPoint);
						this.btnPointBuy.visible = false;
						this.sprPointIcon.texture = PIXI.Texture.fromFrame("point.png");
						for (i = 0; i < 4; ++i) {
							this.icon[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
							this.txtPrice[i].text = GetComma(shopListData[i].Price);
							this.SetMenu(shopListData[i].pType, i);
							this.txtRewardNum[i].text = "x" + shopListData[i].Quantity;
						}
						break;
					case 1: // 야후버젼
						this.txtPoint.text = GetComma(kData.iMoviPoint);
						this.btnPointBuy.visible = true;
						this.sprPointIcon.texture = PIXI.Texture.fromFrame("gold_1.png");
						for (i = 0; i < 4; ++i) {
							this.icon[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
							this.txtPrice[i].text = GetComma(shopListData[i].Price);
							this.SetMenu(shopListData[i].pType, i);
							this.txtRewardNum[i].text = "x" + shopListData[i].Quantity;
						}
						break;
				}
			} else { // 로그아웃 상태..
				this.btnPointBuy.visible = false;
				this.sprPointIcon.texture = PIXI.Texture.fromFrame("point.png");
				this.txtPoint.text = GetString("Login");
				for (i = 0; i < 4; ++i) {
					this.icon[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
					this.txtPrice[i].text = GetComma(shopListData[i].Price);
					this.SetMenu(shopListData[i].pType, i);
					this.txtRewardNum[i].text = "x" + shopListData[i].Quantity;
				}
			}
		}.bind(this));
	}else{	// 로컬에서 사용할때 처리..*!/
		this.main.visible = true;
		this.shop_Yahoo.visible = true;	// 현재는 한개만 사용하고 있음. 일본, 국내 다 같이 사용..
		TweenMax.fromTo(this.shop_Yahoo.children[0], 0.5, {alpha: 0},
			{alpha: 0.9, ease: Linear.easeNone});
		TweenMax.fromTo(this.shop_Yahoo.children[1], 1, {as: 0.5},
			{as: 1, ease: Elastic.easeOut});

		this.btnPointBuy.visible = false;
		this.sprPointIcon.texture = PIXI.Texture.fromFrame("point.png");
		for (var i = 0; i < 4; ++i) {
			this.icon[i].texture = PIXI.Texture.fromFrame(tbShop[i + 4].icon);
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			this.txtPrice[i].text = GetComma(tbShop[i + 4].Price);
			this.SetMenu(tbShop[i + 4].pType, i);
			this.txtRewardNum[i].text = "x" + tbShop[i + 4].reward;
		}
		this.txtPoint.text = GetString("Login");
//	}
}

Shop.prototype.ShowPopup = function(type)
{
	switch(type){
		case 0:	// 로그인하지 않았을때 포인트 버튼을 눌렀을경우
			//kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
			/!*networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL,GetString('signup'),
				function(){networkManager.JoinMember();},
				function(){}
			);*!/
		//	this.popupState = 0;
		//	this.popup_error.visible = true;
		//	this.popup_error_txtContents.text = GetString("PopupLogin");
			break;
		case 1: // 포인트가 모자랄때 포인트 버튼을 눌렀을 경우.
			this.popupState = 1;
			this.popup_error.visible = true;
			this.popup_error_txtContents.text = GetString("PopupLogin");
			break;
		case 2: // apk접속이 아닐경우 광고클릭시 apk를 설치하라는 메세지 출력..
			this.popupState = 2;
			this.popup_error.visible = true;
			this.popup_error_txtContents.text = GetString("PopupLogin");
			break;
	}
}

Shop.prototype.cbButtonPointBuy = function()
{
	location.href = yahooInappURL;
}

Shop.prototype.cbButtonLogin = function()
{
	if(loginTF == 0)
		this.ShowPopup(0);
}

Shop.prototype.cbButtonClick0 = function(){this.cbButtonClick(0);}
Shop.prototype.cbButtonClick1 = function(){this.cbButtonClick(1);}
Shop.prototype.cbButtonClick2 = function(){this.cbButtonClick(2);}
Shop.prototype.cbButtonClick3 = function(){this.cbButtonClick(3);}
Shop.prototype.cbButtonClick = function(i)
{
	if(networkManager.networkState != NET_STATE.LOCALHOST) {
		if (shopListData[i].pType == "point") {	// 포인트일경우..비로그인과 로그인을 비교해서 출력해준다.
			if (loginTF != 0) {	// 로그인상태일때 포인터를 비교해서
				if (kData.iMoviPoint >= shopListData[i].Price)	// 포인트가 많이 있으면 결제 진행, 없으면 포인트 없음 팝업창 띄우기
					this.ShowPopupSuccess(i);
				else {
				//	if(yahooIN === undefined)
				//		kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
				//	else
				//		kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
				//	networkManager.ModalCall(MODAL_BUTTON_TYPE.OKONLY,GetString('lowpoint'),
				//		function(){}
				//	);
				}
			} else {// 비로그인일경우 팝업창을 띄워 로그인 및 회원가입을 유도한다.
				this.ShowPopup(0);
			}
		} else if (shopListData[i].pType == "ad_1" || shopListData[i].pType == "ad_2") {
			if (kData.fADTime[i] == -1)
				this.ShowPopupSuccess(i);
		} else if (shopListData[i].pType == "member"){
			this.ShowPopup(0);
		} else {
			this.ShowPopupSuccess(i);
		}
	}else{
		if(tbShop[i + 4].pType == "ad_1" || tbShop[i + 4].pType == "ad_2"){
			if(kData.fADTime[i] == -1) {
				kData.fADTime[i] = Date.now();	// 나중에 광고가 끝난다음에 시간을 셋팅하게 변경하던가 한다.
				kShop.txtPrice[i].text = "10:00";
				kShop.txtPrice[i].visible = true;
				kShop.sprPrice[i].visible = false;
				SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);

				kData.iLife += tbShop[i + 4].reward;
				kShop.popup_success.visible = true;
				kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(tbShop[i].icon);
				kShop.popup_success_txtRewardNum.text = "x" + tbShop[i + 4].reward;
				kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", tbShop[i + 4].reward);
			}
		}else{
			kData.iLife += tbShop[i + 4].reward;
			kShop.popup_success.visible = true;
			kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(tbShop[i].icon);
			kShop.popup_success_txtRewardNum.text = "x" + tbShop[i + 4].reward;
			kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", tbShop[i + 4].reward);
		}
		//SaveDataInClient();
		//networkManager.ForcedSaveData();
	}
}

// pType : point,pay,ad_1,ad_2,ad_3,member
Shop.prototype.ShowPopupSuccess = function(i)
{
	networkManager.Payment(shopListData[i].mkidx, function () {
		if (loginTF == 1) {	// 로그인상태
			kShop.txtPoint.text = GetComma(kData.iMoviPoint);
			if(shopListData[i].pType == "point") {
				if (kData.iMoviPoint >= shopListData[i].Price)
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[0]);
				else
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);
			}else if(shopListData[i].pType == "ad_1" || shopListData[i].pType == "ad_2"){
				if(apkTF == 1) {	// 광고 상품일경우 타이머체크
					kData.fADTime[i] = Date.now();	// 나중에 광고가 끝난다음에 시간을 셋팅하게 변경하던가 한다.
					kShop.txtPrice[i].text = "10:00";
					kShop.txtPrice[i].visible = true;
					kShop.sprPrice[i].visible = false;
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);
				}
			}

			kShop.popup_success.visible = true;
			kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(shopListData[i].icon);
			kShop.popup_success_txtRewardNum.text = "x" + shopListData[i].Quantity;
			kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", shopListData[i].Quantity);
		//	SaveDataInClient();
		} else {	// 로그아웃상태..
			if(shopListData[i].pType == "ad_1" || shopListData[i].pType == "ad_2"){
				if(apkTF == 1) {	// 광고 상품일경우 타이머체크
					kData.fADTime[i] = Date.now();	// 나중에 광고가 끝난다음에 시간을 셋팅하게 변경하던가 한다.
					kShop.txtPrice[i].text = "10:00";
					kShop.txtPrice[i].visible = true;
					kShop.sprPrice[i].visible = false;
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);
				}
			}

			kData.iLife += shopListData[i].Quantity;
			kShop.popup_success.visible = true;
			kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(tbShop[i].icon);
			kShop.popup_success_txtRewardNum.text = "x" + shopListData[i].Quantity;
			kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", shopListData[i].Quantity);
		//	SaveDataInClient();
		}
		networkManager.ForcedSaveData();
	});
}

Shop.prototype.cbButtonPopupErrorClose = function()
{
	this.popup_error.visible = false;
}

Shop.prototype.cbButtonPopupErrorOK = function()
{
	switch(this.popupState){
		case 0:
		//	networkManager.JoinMember();
			this.popup_error.visible = false;
			break;
		case 1:
			this.popup_error.visible = false;
			break;
		case 2:
			this.popup_error.visible = false;
			break;
	}
}

Shop.prototype.cbButtonPopupSuccessClose = function()
{
	this.popup_success.visible = false;
}

Shop.prototype.cbButtonClose = function()
{
	SESoundPlay(SE_PopupOff);
	TweenMax.fromTo(kShop.shop_Yahoo.children[0], 0.2, {alpha:0.9},
		{alpha:0, ease:Linear.easeNone});
	TweenMax.fromTo(kShop.shop_Yahoo.children[1], 0.2, {as:1},
		{as:0, ease:Linear.easeNone, onComplete:this.cbTweenClose.bind(this)});
}

Shop.prototype.cbTweenClose = function()
{
	this.main.visible = false;
	CloseWarningPopup();
}

Shop.prototype.cbButtonWhite = function()
{
	// 검은색 알파 배경 클릭이라 아무짓도 하지 않는다.
}

//=================================================================================================
Shop.prototype.ShowCashShop = function()
{

}
// 일본상점
Shop.prototype.cbButtonMClick0 = function(){this.cbButtonClick(0);}
Shop.prototype.cbButtonMClick1 = function(){this.cbButtonClick(1);}
Shop.prototype.cbButtonMClick2 = function(){this.cbButtonClick(2);}
Shop.prototype.cbButtonMClick3 = function(){this.cbButtonClick(3);}
Shop.prototype.cbButtonMClick4 = function(){this.cbButtonClick(4);}
Shop.prototype.cbButtonMClick5 = function(){this.cbButtonClick(5);}
Shop.prototype.cbButtonMClick = function(i)
{
}

Shop.prototype.cbButtonPopupMSuccessClose = function()
{

}*/

