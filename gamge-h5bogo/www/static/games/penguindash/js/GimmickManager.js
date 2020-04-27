function GimmickManager(){//얘가 장애물 확률 계산
	this.upOffset = -35;
	
	this.gimmicks = [];
}

GimmickManager.prototype.addGimmick = function(type, hitCnt, onBlock){	
    this.gimmicks.push(GAME.getGimmick());

	var position = {x: onBlock.spr.position.x, y: onBlock.spr.position.y + this.upOffset};
	this.gimmicks[this.gimmicks.length-1].init();
	this.gimmicks[this.gimmicks.length-1].set(type, position, hitCnt, onBlock);
};

GimmickManager.prototype.update = function(){
	if(this.gimmicks.length !== 0){
		if(this.gimmicks[0].type == GAME.gimmick_type.TYPE_SEA){
			if(!this.bDoorSound){
				if(getDist(GAME.penguin.position, this.gimmicks[0].position)<400){
					this.gimmicks[0].bDoorSound = true;
				}
			}
		}
	}
};

GimmickManager.prototype.initGame = function(){
    for(i=0;i<GAME.arr_gimmicks.length;++i){
        GAME.arr_gimmicks[i].init();
    }
    //배열 초기화~
	this.gimmicks.length = 0;
};



