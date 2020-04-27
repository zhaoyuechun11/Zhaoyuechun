GAME.basic_heartCnt = 2;
GAME.flag_life = 2;
GAME.cur_life = 0;
GAME.max_hearCount = 5;

function Heart(parent){
	this.heartContainer = new PIXI.Container();
	this.heartContainer.position.set(iMaxSizeX-100, iCenterSizeY+80);
	parent.addChild(this.heartContainer);
	this.arr_hearts = [];
	var i = 0; var hearts = undefined;
	var startY = 50;
	var intervalY = -100;
	for(i=0;i<GAME.max_hearCount;++i){
		hearts = new PIXI.spine.Spine(spines.heart);
		hearts.scale.set(0.8, 0.8);
		this.arr_hearts.push(hearts);
		this.heartContainer.addChild(hearts);
		// SpinePlay(hearts, 50, startY, "heart_idle", 0, true);
        hearts.position.set(50, startY);
		startY += intervalY;
	}
}

Heart.constructor = Heart;

Heart.prototype.showHeart = function(){
	this.heartContainer.visible = true;
};

Heart.prototype.hideHeart = function(){
	this.heartContainer.visible = false;
};

Heart.prototype.brokenHeart = function(brokenIdx){
    if(brokenIdx<0){
        return;
    }
	SESoundPlay(SE_LifeDown);
	GAME.playSpine(this.arr_hearts[brokenIdx], "heart_broken_ani", false, 0);
	GAME.playSpine(GAME.view.L_hand, "gun_1_hit");
	GAME.playSpine(GAME.view.R_hand, "gun_1_hit");
};

Heart.prototype.initHeart = function(){
    // console.log("initHeart");
	var i = 0; var heart = undefined;
	for(i=0;i<GAME.max_hearCount;++i){
		heart = this.arr_hearts[i];
		SpinePlay(heart, heart.position.x, heart.position.y, "heart_idle", 0, true);
		heart.visible = false;
	}

	for(i=0;i<GAME.flag_life;++i){
		this.arr_hearts[i].visible = true;
	}

	GAME.cur_life = GAME.flag_life;
};
