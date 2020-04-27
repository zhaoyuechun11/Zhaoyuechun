GAME.jumpPoint1 = 0;
GAME.jumpPoint2 = 0;

GAME.changeMoveTime = 0.5;
GAME.inTime = 0.2;

GAME.zombie = function(){
	this.stageManager = GAME.engineInst.stageManager;
	this.spine  = new PIXI.spine.Spine(spines.walkers);
	this.cloneSpine = new PIXI.spine.Spine(spines.walkers);//for jump zombie
	this.spine_beShot = new PIXI.spine.Spine(spines.beShot);
	this.clone_beShot = new PIXI.spine.Spine(spines.beShot);
	
	this.spine.addChild(this.spine_beShot);
	this.cloneSpine.addChild(this.clone_beShot);
	
	this.spine_beShot.position.y = -300;
	this.clone_beShot.position.y = -300;

	this.type = 0;//일반, 점프, 강화, 덩치, 사람
	this.position = -1;//left: 0, right: 1
	this.hitCnt = 0;
	
	this.startPos = {x:0, y:0};
	this.destPos = {x:0, y:0};
	this.layerChangePos = {x:0, y:0};
	
	this.cloneStartPos = {x:0, y:0};
	this.cloneDestPos = {x:0, y:0};
	this.cloneLayerChangePos = {x:0, y:0};
	
	this.startScale = {x:0, y:0};
	this.destScale = {x:0, y:0};
	
	this.startLayer = undefined;
	this.changeLayer = undefined;
	
	this.moveTime = undefined;

	this.txtHitCnt = FontLoad(this.spine, this.hitCnt.toString(), 0, -500
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"70px", fill:'#ffffff', dropShadow:true, dropShadowColor:'#000000', dropShadowDistance:4});
	this.txtHitCnt.visible = false;

	this.bJump1 = false;
	this.bJump2 = false;
	
	this.bCanShot = false;
	this.death = false;
	
	this.tween = undefined;
	this.cloneTween = undefined;

	this.arrIdx = 0;
	this.alive = false;

	this.bApproach = false;
	this.jumpFlag = 0;//점프 포인트와 비교해 점프 타이밍을 체크하기 위한 변수.
	this.jumpSpeed = 1.2;//default:1.2

    var self = this;
};

GAME.zombie.constructor = GAME.zombie;

GAME.zombie.prototype.comeOut = function(){
	var self = this;
	
	switch(this.type){
	case GAME.zombieType.normal:
		GAME.playSpine(this.spine, "zombie_1_idle");
		break;
	case GAME.zombieType.jump:
		GAME.playSpine(this.spine, "zombie_3_idle");
		break;
	case GAME.zombieType.enhance:
		GAME.playSpine(this.spine, "zombie_2_idle");
		break;
	case GAME.zombieType.hulk:
		GAME.playSpine(this.spine, "zombie_4_in");
		this.spine.state.addListener({
			complete:function(){
                GAME.playSpine(self.spine, "zombie_4_idle");
                self.approach();
                self.spine.state.clearListeners();
			}
		});
		break;
	case GAME.zombieType.human:
		GAME.playSpine(this.spine, "human_idle");
		break;
	}
	
	if(this.type !== GAME.zombieType.hulk){
		TweenMax.to(this.spine, GAME.inTime, {x:this.layerChangePos.x, y:this.layerChangePos.y, ease:Power0.easeNone, onComplete:function(){
			self.approach();
		}});
		
		if(this.type === GAME.zombieType.jump){
            TweenMax.to(this.cloneSpine, GAME.inTime, {x:this.cloneLayerChangePos.x, y:this.cloneLayerChangePos.y, ease:Power0.easeNone, onComplete:function(){
				self.approach();
			}});
		}
	}
};

GAME.zombie.prototype.approach = function(){
	if(this.type === GAME.zombieType.jump){
		this.cloneSpine.displayGroup = this.changeLayer;
		this.cloneTween = TweenMax.to(this.cloneSpine, this.moveTime, {x:this.cloneDestPos.x, y:this.cloneDestPos.y, scaleX:this.destScale.x, scaleY:this.destScale.y, ease:Power1.easeIn
			/*,onCompleteParams:[this], onComplete:this.killYou*/});
	}
	
	this.bCanShot = true;
	this.spine.displayGroup = this.changeLayer;

	this.tween = TweenMax.to(this.spine, this.moveTime, {x:this.destPos.x, y:this.destPos.y, scaleX:this.destScale.x, scaleY:this.destScale.y, ease:Power1.easeIn
		,onCompleteParams:[this], onComplete:this.killYou});
	this.bApproach = true;
};

GAME.zombie.prototype.killYou = function(THIS){
	if(GAME.engineInst.gameState !== GAME.gameState.STATE_PLAY) return;

	if(THIS.type === GAME.zombieType.human){
		THIS.death = true;
		THIS.spine.visible = false;
		return;
	}
	SESoundPlay(SE_ZOMBIE_WIN);
	
	//heart system start//
	THIS.init();
	THIS.death = true;

	// --GAME.cur_life;
	// if(GAME.cur_life<0) GAME.cur_life = 0;
	GAME.view.heart.brokenHeart(--GAME.cur_life);
	// console.log("cur_life_zombie:"+GAME.cur_life);
    GAME.playSpine(GAME.view.bloodAnim_over, "elevator_dead");

	if(GAME.cur_life<=0){
		TweenMax.killAll();
		GAME.engineInst.state = GAME.state.STATE_OVER;
		GAME.engineInst.gameState = GAME.gameState.STATE_NONE;
		//GAME.view.gameOver("blood");
		// ---------------- 这里是结束的地方 ---------------- //
		//GAME.stageFloor
		if ( window.parent != null ) {
			window.parent.postMessage({
			  cmd: "GameOver",
			  msg: {
				score: 0, // 如果是星星数，也是这个分数
				level: GAME.stageFloor
			  }
			}, "*");
		  }
	}
	//heart system end//
};

GAME.zombie.prototype.setZombie = function(type, moveTime, zOrder, position, hitCnt){
	if(hitCnt === undefined) hitCnt = 1;

	var rand = Math.random();
	
	this.type = type;
	this.position = position;
	this.moveTime = moveTime;
	
	switch(this.position){
	case GAME.left:
		this.startPos.x = this.pos_scale.leftStartX;
		this.startPos.y = this.pos_scale.startY;
		this.destPos.x = this.pos_scale.leftStartX;
		this.destPos.y = this.pos_scale.destY;
		this.layerChangePos.x = this.pos_scale.leftChangeX;
		this.layerChangePos.y = this.pos_scale.startY;
		
		this.cloneStartPos.x = this.pos_scale.rightStartX;
		this.cloneStartPos.y = this.pos_scale.startY;
		this.cloneDestPos.x = this.pos_scale.rightStartX;
		this.cloneDestPos.y = this.pos_scale.destY;
		this.cloneLayerChangePos.x = this.pos_scale.rightChangeX;
		this.cloneLayerChangePos.y = this.pos_scale.startY;
		break;
	case GAME.right:
		this.startPos.x = this.pos_scale.rightStartX;
		this.startPos.y = this.pos_scale.startY;
		this.destPos.x = this.pos_scale.rightStartX;
		this.destPos.y = this.pos_scale.destY;
		this.layerChangePos.x = this.pos_scale.rightChangeX;
		this.layerChangePos.y = this.pos_scale.startY;
		
		this.cloneStartPos.x = this.pos_scale.leftStartX;
		this.cloneStartPos.y = this.pos_scale.startY;
		this.cloneDestPos.x = this.pos_scale.leftStartX;
		this.cloneDestPos.y = this.pos_scale.destY;
		this.cloneLayerChangePos.x = this.pos_scale.leftChangeX;
		this.cloneLayerChangePos.y = this.pos_scale.startY;
		break;
	case GAME.center:
		this.startPos.x = GAME.iCenterSizeX;
		this.startPos.y = this.pos_scale.startY;
		this.destPos.x = GAME.iCenterSizeX;
		this.destPos.y = this.pos_scale.destY;
		break;
	}
	
	this.destScale.x = this.pos_scale.destScale.x;
	this.destScale.y = this.pos_scale.destScale.y;
	
	this.hitCnt = hitCnt;
	
	switch(this.type){
	case GAME.zombieType.jump:
		this.cloneSpine.position.set(this.cloneStartPos.x, this.cloneStartPos.y);
		this.cloneSpine.scale.x = this.pos_scale.startScale.x;
		this.cloneSpine.scale.y = this.pos_scale.startScale.y;
		this.cloneSpine.displayGroup = this.stageManager.backLayer;
		this.cloneSpine.zOrder = zOrder;

		GAME.jumpPoint1 = this.moveTime * 0.25;
		GAME.jumpPoint2 = this.moveTime * 0.5;

		if(rand < 0.5){
			this.cloneSpine.scale.x *= -1;
		}

		this.stageManager.jumpZombies.push(this);
		break;
	case GAME.zombieType.enhance:
	case GAME.zombieType.hulk:
		this.txtHitCnt.visible = true;
		this.txtHitCnt.text = this.hitCnt;
		break;
	}

	this.changeLayer = this.stageManager.zombieLayer;

	this.spine.position.set(this.startPos.x, this.startPos.y);
	this.spine.scale.x = this.pos_scale.startScale.x;
	this.spine.scale.y = this.pos_scale.startScale.y;
	this.spine.displayGroup = this.stageManager.backLayer;
	this.spine.zOrder = zOrder;
	
	if(rand < 0.5){
		this.spine.scale.x *= -1;
		this.destScale.x *= -1;
		this.txtHitCnt.scale.x = -1;
	}
};

GAME.zombie.prototype.pos_scale = {
	leftStartX : GAME.iCenterSizeX-100,
	rightStartX : GAME.iCenterSizeX+100,
		
	leftChangeX : GAME.iCenterSizeX-30,
	rightChangeX : GAME.iCenterSizeX+30,

	startY : GAME.iCenterSizeY-230,
	destY : GAME.iCenterSizeY+500,
		
	startScale : {x:0.3, y:0.3},
	destScale : {x:1.2, y:1.2}
};

GAME.zombie.prototype.jump = function(){
	var self = this;
	var animSpine = (this.spine.visible === true) ? this.spine : this.cloneSpine;
	var visibleSpine = (animSpine === this.spine) ? this.cloneSpine : this.spine;
	// console.log("zombie_jump_up");
	GAME.playSpine(animSpine, "zombie_3_jump_1", false, 0, false, this.jumpSpeed + GAME.jumpSpeed_revision);//up
    animSpine.state.clearListeners();
	animSpine.state.addListener({
		complete:function(){
			var zombie = self;
            animSpine.visible = false;
            zombie.position = (zombie.position === GAME.left) ? GAME.right : GAME.left;

			if(zombie.death){
				visibleSpine.visible = false;
				return;
			}
			GAME.playSpine(visibleSpine, "zombie_3_jump_2");//down
            animSpine.state.clearListeners();
		}
	});
};

GAME.zombie.prototype.hit = function(){
	var self = this;
	--this.hitCnt;
    this.spine.state.clearListeners();
    this.cloneSpine.state.clearListeners();
	//to do : hit point setting
	if(this.hitCnt > 0){
		this.txtHitCnt.text = this.hitCnt;
		switch(this.type){
		case GAME.zombieType.enhance:
			GAME.playSpine(this.spine, "zombie_2_hit");
			this.shotEffect(this.spine_beShot);
			this.spine.state.addListener({
				complete:function(){
                    var zombie = self;
                    GAME.playSpine(zombie.spine, "zombie_2_idle");
                    zombie.spine.state.clearListeners();
				}
			});
			break;
		case GAME.zombieType.hulk:
			GAME.playSpine(this.spine, "zombie_4_hit");
			this.shotEffect(this.spine_beShot);
            this.spine.state.addListener({
                complete:function(){
                    var zombie = self;
                    GAME.playSpine(zombie.spine, "zombie_4_idle");
                    zombie.spine.state.clearListeners();
                }
            });
			break;
		}
	} else {
		// this.tween.kill({x:true, y:true, scaleX:true, scaleY:true}, this.spine);
		this.tween.kill(null, this.spine);
        // TweenMax.killTweensOf(this);
        // this.death = true;
		switch(this.type){
		case GAME.zombieType.normal:
            this.death = true;
			GAME.playSpine(this.spine, "zombie_1_hit");
			SESoundPlay(SE_ZOMBIE_DIE_1);
			this.shotEffect(this.spine_beShot);
            this.spine.state.addListener({
                complete:function(){
                    var zombie = self;
                    zombie.spine.visible = false;
                    zombie.spine.state.clearListeners();
                }
            });
			break;
		case GAME.zombieType.jump:
            this.death = true;
			var animSpine = (this.spine.visible === true) ? this.spine : this.cloneSpine;
			var shotSpine = (animSpine === this.spine) ? this.spine_beShot : this.clone_beShot;
			this.cloneTween.kill({x:true, y:true, scaleX:true, scaleY:true}, this.cloneSpine);
            // console.log("jumpZombie_hit_start");
			GAME.playSpine(animSpine, "zombie_3_hit");
			SESoundPlay(SE_ZOMBIE_DIE_4);
			this.shotEffect(shotSpine);
            animSpine.state.addListener({
                complete:function(){
                	// console.log("jumpZombie_hit_end");
                    var zombie = self;
                    zombie.spine.visible = false;
                    zombie.cloneSpine.visible = false;
                    zombie.spine.state.clearListeners();
                }
            });
			break;
		case GAME.zombieType.enhance:
            this.death = true;
			GAME.playSpine(this.spine, "zombie_2_hit");
			SESoundPlay(SE_ZOMBIE_DIE_3);
			this.shotEffect(this.spine_beShot);
            this.spine.state.addListener({
                complete:function(){
                    var zombie = self;
                    zombie.spine.visible = false;
                    zombie.spine.state.clearListeners();
                }
            });
			break;
		case GAME.zombieType.hulk:
            this.death = true;
			GAME.playSpine(this.spine, "zombie_4_hit");
			SESoundPlay(SE_ZOMBIE_DIE_2);
			this.shotEffect(this.spine_beShot);
            this.spine.state.addListener({
                complete:function(){
                    var zombie = self;
                    zombie.spine.visible = false;
                    zombie.spine.state.clearListeners();
                }
            });
			break;
		case GAME.zombieType.human:
		    this.death = true;
		    if(GAME.cur_life<=0) return;
            SESoundPlay(SE_HUMAN_DIE);
            this.shotEffect(this.spine_beShot);
            GAME.view.heart.brokenHeart(--GAME.cur_life);
            // console.log("cur_life: "+GAME.cur_life);
            GAME.playSpine(this.spine, "human_hit");

            if(GAME.cur_life<=0){
                TweenMax.killAll();
                GAME.engineInst.state = GAME.state.STATE_OVER;
                GAME.engineInst.gameState = GAME.gameState.STATE_NONE;
		//GAME.view.gameOver("blood");
		// ---------------- 这里是结束的地方 ---------------- //
		//GAME.stageFloor
				
		if ( window.parent != null ) {
		  window.parent.postMessage({
		    cmd: "GameOver",
		    msg: {
		      score: GAME.stageFloor, // 如果是星星数，也是这个分数
		      level: 0
		    }
		  }, "*");
		}
		return;
            }

            this.spine.state.addListener({
               complete:function(){
                   var zombie = self;
                   if(GAME.cur_life>0){
                       // zombie.death = true;
                       zombie.spine.visible = false;
                   }else{//gameover
					   GAME.playSpine(zombie.spine, "human_dead");
                       zombie.spine.state.clearListeners();
					   zombie.spine.state.addListener({
						   complete:function(){
                               zombie.spine.state.clearListeners();
							   zombie.spine.visible = false;

                               GAME.view.gameOver();
						   }
					   });

                       // TweenMax.killAll();
                       // GAME.engineInst.state = GAME.state.STATE_OVER;
                       // GAME.engineInst.gameState = GAME.gameState.STATE_NONE;
				   }
               }
            });
			break;
		}
	}
};

GAME.zombie.prototype.init = function(){
	this.type = 0;
	this.position = -1;
	this.hitCnt = 0;
	
	this.txtHitCnt.visible = false;
	this.txtHitCnt.scale.x = 1;
	
	this.bJump1 = false;
	this.bJump2 = false;
	
	this.bCanShot = false;
	this.death = false;

	this.startPos = {x:0, y:0};
	this.destPos = {x:0, y:0};
	this.layerChangePos = {x:0, y:0};
	
	this.cloneStartPos = {x:0, y:0};
	this.cloneDestPos = {x:0, y:0};
	this.cloneLayerChangePos = {x:0, y:0};
	
	this.startScale = {x:0, y:0};
	this.destScale = {x:0, y:0};
	
	if(this.tween !== undefined)
		this.tween.kill(null, this.spine);

	if(this.cloneTween !== undefined)
		this.cloneTween.kill(null, this.cloneSpine);

	this.tween = undefined;
	this.cloneTween = undefined;

	//spine Init
	this.spine.skeleton.setToSetupPose();
	this.cloneSpine.skeleton.setToSetupPose();

    this.spine.state.clearTrack(0);
    this.cloneSpine.state.clearTrack(0);
    this.spine.state.clearListeners();
    this.cloneSpine.state.clearListeners();

	this.spine.visible = false;
	this.cloneSpine.visible = false;
	this.spine_beShot.visible = false;

	this.arrIdx = 0;
	this.alive = false;

	this.bApproach = false;
	this.jumpFlag = 0;
};

GAME.zombie.prototype.shotEffect = function(spine){
	var randText = (1+((Math.random() * 3)|0)).toString();
	var effectTxt = "hit_eff_"+randText;
	GAME.playSpine(spine, effectTxt);
};

GAME.zombie.prototype.changeTween = function(){
	if(this.alive)return;
	if(this.tween === undefined)
		this.moveTime = GAME.changeMoveTime;
	else{
		this.tween = TweenMax.to(this.spine, GAME.changeMoveTime, {x:this.destPos.x, y:this.destPos.y, scaleX:this.destScale.x, scaleY:this.destScale.y, ease:Circ.easeIn
		,onCompleteParams:[this], onComplete:this.killYou});
	}
	this.alive = true;
};

GAME.zombie.prototype.jumpUpdate = function(deltaTime){
	// console.log("zombie_jump_1");
	if(!this.bApproach || this.death) return;
    // console.log("zombie_jump_2");
	this.jumpFlag += deltaTime;
	if(this.jumpFlag >= GAME.jumpPoint2){
		if(this.bJump2) return;
		this.jump();
		this.bJump2 = true;
	} else if(this.jumpFlag >= GAME.jumpPoint1){
		if(this.bJump1) return;
		this.jump();
		this.bJump1 = true;
	}
};