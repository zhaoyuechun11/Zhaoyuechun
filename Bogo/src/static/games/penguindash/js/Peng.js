function Penguin(engine, _type){
    if(_type === undefined) _type = GAME.pengType.normal;
	this.engine = engine;
	
	this.position = new PIXI.Point();
	this.direction = new PIXI.Point();

	this.pengCon = new PIXI.Container();
	this.spine = new PIXI.spine.Spine(spines.penguin);
	this.shadowSpine = new PIXI.spine.Spine(spines.shadow);

    this.pengCon.addChild(this.shadowSpine);
    this.pengCon.addChild(this.spine);
    this.pengCon.addChild(GAME.sp_death_emoticon);
    GAME.sp_death_emoticon.position.set(130, -210);

	this.stateMap = {
		STATE_NONE : 0,
		STATE_IDLE : 1,
		STATE_MOVE : 2
	};
	this.state = this.stateMap.STATE_IDLE;
	
	this.floorState = {
		ON_NORMAL : 0,
		ON_SHELTER : 1
	};
	this.stepOn = this.floorState.ON_SHELTER;
	
	this.onBlock = undefined;
	this.gimmickBlock = undefined;

	this.upOffset = -30;
	// this.zOffset = -20;
	// this.zOffset_shadow = -18;
	
	//dash
	this.prevBlockDir = -1;
	this.callCount = 0;

	this.tutoCount = 2;//튜토리얼 지우기 위한 카운트
	this.moveCount = 0;
	
	this.bKilledSeal = false;//물개에 죽을 경우 물개 팁 나오게 하는 변수.
    this.bKilledChaos = false;//혼란 상태에 죽었을 경우 혼란 팁 나오게 하는 변수.
	this.bJumpWhale = false;//점프 중 블럭에 의한 사망 방지.

    this.type = _type;
    this.setSpine(this.type);

    //emoticon spine
    this.spine_emoticon = new PIXI.spine.Spine(spines.emoticon);
    this.spine.addChild(this.spine_emoticon);
    this.spine_emoticon.position.set(-35, -115);
    this.spine_emoticon.skeleton.setAttachment("add_1", "add_1");
    this.spine_emoticon.scale.x = -1;
    this.spine_emoticon.visible = false;

    this.spine_emoticon.state.addListener({
        complete:function (entry) {
            if(entry.animation.name === "imoticon_out") GAME.penguin.spine_emoticon.visible = false;
        }
    });

    //power or chaos
    this.buff = GAME.itemType.nothing;

    this.spr_powerEff = SpriteLoad(this.spine, strGamePath+"img/power_up_eff.png", 0, -40);
    this.spr_powerEff.blendMode = PIXI.BLEND_MODES.SCREEN;
    this.spr_powerEff.scale.set(1.2);

    //shock_eff
    this.spine.addChild(GAME.sp_shockEff);
    GAME.sp_shockEff.position.set(40, -50);

    this.normalBlockIdx = 0;

    this.prev_block = undefined;
    this.prev_dir = undefined;
    this.prev_pos = {x:0, y:0};

    this.nextPeng = undefined;//바로 뒤에 따라붙는 펭귄.

    this.call_chaosCount = 0;//버프 꺼지는 알림 한번 호출 위한 카운트
    this.call_powerCount = 0;//버프 꺼지는 알림 한번 호출 위한 카운트

    this.call_powerSoundCnt = 0;//파워업 사운드 한번 호출용 카운트

    // this.pengCon.addChild(GAME.circle);
    // GAME.circle.visible = false;
    // GAME.mapManager.mapContainer.mask = GAME.circle;
}

Penguin.prototype.init = function(startPos, parent, layer, onBlock){
	this.callCount = 0;
	this.prevBlockDir = -1;
    // this.pengCon.visible = true;

	this.state = this.stateMap.STATE_IDLE;
	this.stepOn = this.floorState.ON_SHELTER;
	this.gimmickBlock = undefined;

	this.backToNormal();
    this.setPengAnimation("penguin_idle", GAME.pengType.normal, true, 1);
    /**
     * animation list
     * penguin_idle
     * penguin_move1_fast
     * penguin_move2_block_fast
     * penguin_move3_dash //normal type 만 있음.
     * penguin_move4_fallen
     * penguin_move5_resurrection //normal type 만 있음.
     * penguin_move5_resurrection_2 //normal type 만 있음.
     * penguin_move6_win
     * penguin_move7_jump
     * */
    this.buff = GAME.itemType.nothing;

	if(parent !== undefined){
        parent.addChild(this.pengCon);
	}

	if(layer !== undefined){
	    this.pengCon.displayGroup = layer;
	}
	
	if(onBlock === undefined) onBlock = GAME.mapManager.startShelterBlocks[0];
	
	this.onBlock = onBlock;
	
    this.pengCon.scale.x = 1;
    this.pengCon.position.set(startPos.x, startPos.y);
    // this.pengCon.zOrder = this.onBlock.spr.zOrder + this.zOffset;

	this.position.x = startPos.x;
	this.position.y = startPos.y;
	
	this.direction.x = startPos.x;
	this.direction.y = startPos.y;

	if(engine.state === engine.gameState.STATE_REPLAY){
        // this.pengCon.renderable = true;
        this.setPengAnimation("penguin_move5_resurrection", this.type);
    }
    this.pengCon.renderable = true;

	this.playSpine("shadow_move", 0, 0, false, this.shadowSpine);
    this.spine_emoticon.visible = false;

    this.tutoCount = 2;
	this.moveCount = 0;
	
	this.bKilledSeal = false;
	this.bKilledChaos = false;
	this.bJumpWhale = false;

    this.normalBlockIdx = 0;

    this.prev_block = undefined;
    this.prev_dir = undefined;

    this.nextPeng = undefined;

    this.call_powerSoundCnt = 0;
    // GAME.circle.visible = false;
};

var move_gimmicks = undefined;
var move_shiftGimmick = undefined;
var move_i = 0; var move_j = 0; var move_length = 0;
var move_startShelters = undefined;
var move_movingBlock = undefined;
Penguin.prototype.move = function(dir){
	if(this.state !== this.stateMap.STATE_IDLE) return;
	this.state = this.stateMap.STATE_MOVE;

	// if(this.pengCon.displayGroup != GAME.mapManager.pengLayer)
	//     this.pengCon.displayGroup = GAME.mapManager.pengLayer;

	if(this.buff === GAME.itemType.chaos) dir =  (dir === 1) ? 0 : 1;
	
	if(dir===0){
		this.direction.x = this.position.x+right.x;
		this.direction.y = this.position.y+right.y;
	} else if(dir===1){
		this.direction.x = this.position.x+left.x;
		this.direction.y = this.position.y+left.y;
	}

    move_gimmicks = GAME.gimmickManager.gimmicks;
	move_length = move_gimmicks.length;
	
	if(move_length !== 0){
		for(move_i=0;move_i<move_length;++move_i){
			if(getDist(this.direction, move_gimmicks[move_i].position)<=5){
				if(move_i!==0){//안깨고 안먹고 안밟고 간 넘들이 있다.~
					for(move_j=0;move_j<move_i;++move_j){
						move_shiftGimmick = move_gimmicks.shift();
					}
					move_i=0;
				}
				
				this.gimmickBlock = move_gimmicks[move_i];
				// console.log("set Gimmick");
				// console.log("move_j: "+move_j);
				break;
			}
		}
	}

    move_startShelters = GAME.mapManager.startShelterBlocks;
	move_movingBlock = undefined;
	move_length = move_startShelters.length;
	for(move_i=0;move_i<move_length;++move_i){
		if(getDist(this.direction, move_startShelters[move_i].spr.position)<=35){
            move_movingBlock = move_startShelters[move_i];
		}
	}

	if(this.gimmickBlock !== undefined){
        switch(this.gimmickBlock.type){
            case GAME.gimmick_type.TYPE_NORMAL_OBS:
            case GAME.gimmick_type.TYPE_RANDOM_OBS:
            case GAME.gimmick_type.TYPE_EGG:
                if(this.type !== GAME.pengType.power){
                    this.gimmickBlock.checkState(this);
                    this.gimmickBlock = undefined;
                    if(dir === 0){//dir == 0 : right, dir == 1 : left
                        this.pengCon.scale.x = 1;
                        TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(right.x/2), y:this.pengCon.position.y+(right.y/2), onCompleteParams:[this], onComplete:function(THIS){
                            THIS.state = THIS.stateMap.STATE_IDLE;
                        }, yoyo:true, repeat:1});
                    } else if(dir === 1){
                        this.pengCon.scale.x = -1;
                        TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(left.x/2), y:this.pengCon.position.y+(left.y/2), onCompleteParams:[this], onComplete:function(THIS){
                            THIS.state = THIS.stateMap.STATE_IDLE;
                        }, yoyo:true, repeat:1});
                    }
                    this.setPengAnimation("penguin_move2_block_fast", this.type);
                    this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
                } else {// power up 상태~
                    switch(this.gimmickBlock.type){
                        case GAME.gimmick_type.TYPE_NORMAL_OBS:
                            break;
                        case GAME.gimmick_type.TYPE_RANDOM_OBS:
                            this.gimmickBlock.itemType = GAME.itemType.nothing;
                            break;
                    }
                    this.normalMove(dir);
                }
                break;
            case GAME.gimmick_type.TYPE_GEM:
                this.normalMove(dir);
                /**
                 * 보석 획득 연출
                 * */
                ++kData.iGemCount;
                var flyGem = this.gimmickBlock.spr;
                var pos_x = flyGem.parent.position.x;
                var pos_y = flyGem.parent.position.y + this.gimmickBlock.gemOffset;
                var offset_x = GAME.mapManager.mapContainer.position.x|0;
                var offset_y = GAME.mapManager.mapContainer.position.y|0;
                GAME.view.viewContainer.addChild(flyGem);
                flyGem.displayGroup = GAME.view.uiLayer;
                pos_x += offset_x; pos_y += offset_y;
                flyGem.position.set(pos_x, pos_y);
                var flagPos = undefined;
                if(pos_x>iCenterSizeX) flagPos =  moveToAngle(150, 300);
                else flagPos = moveToAngle(70, 300);

                flagPos.x += pos_x; flagPos.y += pos_y;

                TweenMax.to(this.gimmickBlock.spr, 0.8, {scaleX:1.05, scaleY:1.05, bezier:{values:[
                    {x:pos_x, y:pos_y},
                    flagPos, {x:75, y:68}
                ], autoRotate:false}, ease: Power1.easeIn, onComplete:function(){
                    flyGem.parent.removeChild(flyGem);
                    ++engine.gemCount;
                    GAME.view.updateGemCnt();
                    SpinePlay(GAME.view.spine_gem, -105, 0, "jewel_charge_eff");
                }});
                /**
                 * 보석 획득 연출 종료
                 * */
                break;
            case GAME.gimmick_type.TYPE_SEA:
                if(this.sealEventCheck()){//물개랑 부딪혔다면
                    if(this.type !== GAME.pengType.power){
                        if(dir === 0){//dir == 0 : right, dir == 1 : left
                            this.pengCon.scale.x = 1;
                            TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(right.x/2), y:this.pengCon.position.y+(right.y/2), onCompleteParams: [this], onComplete:this.meetSeal, yoyo:true, repeat:1});
                        } else if(dir === 1){
                            this.pengCon.scale.x = -1;
                            TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(left.x/2), y:this.pengCon.position.y+(left.y/2), onCompleteParams: [this], onComplete:this.meetSeal, yoyo:true, repeat:1});
                        }
                        this.setPengAnimation("penguin_move2_block_fast", this.type);
                        this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
                    } else {
                        SpinePlay_1(this.gimmickBlock.spine, "enemy_death", 0, true);
                        SpinePlay_1(GAME.sp_shockEff, "shock_eff", 0, false);
                        this.normalMove(dir);
                        /**
                         * 물개 날라가는 연출 시작
                         * */
                        var flyGem = this.gimmickBlock.spine;
                        var pos_x = flyGem.parent.position.x;
                        var pos_y = flyGem.parent.position.y + this.gimmickBlock.upOffset;
                        var offset_x = GAME.mapManager.mapContainer.position.x|0;
                        var offset_y = GAME.mapManager.mapContainer.position.y|0;
                        GAME.view.viewContainer.addChild(flyGem);
                        flyGem.displayGroup = GAME.view.uiLayer;
                        pos_x += offset_x; pos_y += offset_y;
                        flyGem.position.set(pos_x, pos_y);
                        var destPos = undefined;

                        if(dir === 0){
                            destPos = {x:700, y:-5};
                        } else {
                            destPos = {x:-5, y:-5};
                        }

                        TweenMax.to(this.gimmickBlock.spine, 1.2, {scaleX:this.gimmickBlock.spine.scale.x * 3, scaleY:3, x:destPos.x, y:destPos.y
                            , onCompleteParams:[this.gimmickBlock.spine], onComplete:function(spine){
                                spine.visible = false;
                            }/*, ease:Power4.easeIn*/});
                        /**
                         * 물개 날라가는 연출 끝.
                         * */
                    }
                } else if(this.whaleEventCheck()){//고래랑 부딪혔다면~
                    this.bJumpWhale = true;
                    GAME.gimmickManager.gimmicks.shift();

                    this.gimmickBlock.whaleAction();
                    ++engine.blockCount;
                    GAME.view.updateCount();
                    // engine.checkHighScore();
                    engine.checkClounAlert();
                    GAME.changeRoutine(engine.blockCount);
                    this.gimmickBlock = undefined;
                    var blocks = GAME.mapManager.blocks;
                    // GAME.jump_targetBlock;
                    var updateBlock;

                    for(i=0;i<26;++i){//10m에서 25m로 증가
                        if(i === 25){
                            GAME.jump_targetBlock = blocks[this.normalBlockIdx++];
                            break;
                        }

                        updateBlock = blocks[this.normalBlockIdx++];
                        updateBlock.bJump = true;
                        GAME.arr_jumpBlocks[i] = updateBlock;
                    }

                    this.onBlock = undefined;
                    GAME.engine.renewMap();

                    if(dir === 0){//dir == 0 : right, dir == 1 : left
                        this.pengCon.scale.x = 1;
                        TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(right.x/2), y:this.pengCon.position.y+(right.y/2), onComplete:this.whaleJump});
                    } else if(dir === 1){
                        this.pengCon.scale.x = -1;
                        TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(left.x/2), y:this.pengCon.position.y+(left.y/2), onComplete:this.whaleJump});
                    }

                    this.setPengAnimation("penguin_move1_fast", this.type);
                    this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
                } else {
                    // this.gimmickBlock.spine.zOrder = this.gimmickBlock.prevZOrder;
                    this.normalMove(dir);
                    this.gimmickBlock.inOutName = (this.gimmickBlock.spine.state.tracks[0] != null) ? "enemy_in_out" : "tale_in_out";
                    this.gimmickBlock.playSpine(this.gimmickBlock.inOutName, 0);
                }
                break;
            case GAME.gimmick_type.TYPE_CHAOS:
                this.normalMove(dir);
                this.setChaosState();
                this.gimmickBlock.spine.visible = false;
                break;
            case GAME.gimmick_type.TYPE_POWER:
                this.normalMove(dir);
                this.setPowerState();
                this.gimmickBlock.spine.visible = false;
                break;
        }
	} else {
		if(move_movingBlock != undefined){
			if(move_movingBlock.bMoved){
                this.normalMove(dir);
            } else {
				if(dir === 0){//dir == 0 : right, dir == 1 : left
					this.pengCon.scale.x = 1;
					TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(right.x/2), y:this.pengCon.position.y+(right.y/2), onCompleteParams:[this], onComplete:function(THIS){
						THIS.state = THIS.stateMap.STATE_IDLE;
					}, yoyo:true, repeat:1});

				} else if(dir === 1){
					this.pengCon.scale.x = -1;
					TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+(left.x/2), y:this.pengCon.position.y+(left.y/2), onCompleteParams:[this], onComplete:function(THIS){
						THIS.state = THIS.stateMap.STATE_IDLE;
					}, yoyo:true, repeat:1});
                    // this.setPengAnimation("penguin_move2_block_fast", this.type);
					// this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
				}

                this.setPengAnimation("penguin_move2_block_fast", this.type);
                this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
                /**
                 * 여기가 무적블럭....
                 * */
                if(move_movingBlock.hitCnt != undefined){
                    --move_movingBlock.hitCnt;
                    if(move_movingBlock.hitCnt === 0){
                        move_movingBlock.spr.visible = false;

                        for(i=0;i<move_startShelters.length;++i){
                            if(move_movingBlock === move_startShelters[i]){
                                GAME.mapManager.startShelterBlocks.splice(i, 1);
                            }
                        }
                    }
                }

                SESoundPlay(SE_WALL);
			}
		} else 
			this.normalMove(dir);
	}
};

var step_block = undefined; var step_shelterBlocks = undefined;

var check_i; var check_j;
Penguin.prototype.checkNormalBlock = function (_block) {
    if(getDist(_block.spr.position, this.pengCon.position) <= -this.upOffset
        && _block.spr.position.x === this.pengCon.position.x){
        this.onBlock = _block;
        this.prev_block = _block;
        _block.bUpdate = true;

        if(GAME.arr_waitBabies.length!==0){
            for(check_i=0;check_i<GAME.arr_pengGroup.length;++check_i){
                if(GAME.arr_pengGroup[check_i].nextPeng!==undefined) continue;
                for(check_j=0;check_j<GAME.arr_waitBabies.length;++check_j){
                    if(GAME.arr_pengGroup[check_i].prev_pos.x === GAME.arr_waitBabies[check_j].pengCon.position.x
                        && GAME.arr_pengGroup[check_i].prev_pos.y === GAME.arr_waitBabies[check_j].pengCon.position.y){
                        GAME.arr_pengGroup[check_i].nextPeng = GAME.arr_waitBabies[check_j];
                        GAME.arr_pengGroup[check_i].nextPeng.frontPeng = GAME.arr_pengGroup[check_i];
                        GAME.arr_waitBabies.splice(0, check_j+1);
                        console.log("wait_length: "+GAME.arr_waitBabies.length);
                        break;
                    }
                    // break;
                }

            }
        }

        ++this.normalBlockIdx;
        if(this.normalBlockIdx === GAME.mapManager.blocks.length) this.normalBlockIdx = 0;

        // this.pengCon.zOrder = this.onBlock.spr.zOrder + this.zOffset;
        ++GAME.engine.blockCount;
        GAME.view.updateCount();
        // engine.checkHighScore();
        engine.checkClounAlert();
        engine.renewMap();
        GAME.changeRoutine(engine.blockCount);

        return true;
    }
    return false;
};

var step_i = 0; var step_j = 0; var step_length0 = 0; var step_length1 = 0;
Penguin.prototype.stepBlock = function(THIS){//충돌 체크
    // console.log("stepBlock");
	if(THIS.gimmickBlock !== undefined){
		THIS.gimmickBlock.checkState(THIS);
		THIS.gimmickBlock = undefined;
	}
	
	THIS.position.x = THIS.pengCon.position.x;
	THIS.position.y = THIS.pengCon.position.y;
	
	step_block = GAME.mapManager.blocks[THIS.normalBlockIdx];
	// console.log("normalIdx: "+THIS.normalBlockIdx);
    step_shelterBlocks = (engine.blockCount!==0) ? GAME.mapManager.shelterBlocks : GAME.mapManager.startShelterBlocks;
    // if(testconsole === "dash_0"){
    //     console.log(THIS.normalBlockIdx);
    //     // console.log("step_shelterBlocks_length: "+step_shelterBlocks.length);
    //     console.log("step_block.x: "+step_block.spr.position.x);
    //     // console.log("step_block.y: "+step_block.spr.position.y);
    //
    //     console.log("peng.x: "+THIS.pengCon.position.x);
    //     // console.log("peng.y: "+THIS.pengCon.position.y);
    // }

	if(THIS.stepOn === THIS.floorState.ON_NORMAL){
		if(step_block.pair === undefined){//갈림길 블록이 아닌 경우
            if(!THIS.checkNormalBlock(step_block)){
                step_shelterBlocks = GAME.mapManager.shelterBlocks;
                step_length0 = step_shelterBlocks.length;
                for(step_i=0 ; step_i < step_length0 ; ++step_i){
                    if(getDist(step_shelterBlocks[step_i].spr.position, THIS.pengCon.position) <= -THIS.upOffset
                        && step_shelterBlocks[step_i].spr.position.x === THIS.pengCon.position.x){//shelter 위에 있다
                        THIS.stepOn = THIS.floorState.ON_SHELTER;
                        THIS.onBlock = step_shelterBlocks[step_i];
                        THIS.prev_block = THIS.onBlock;
                        // THIS.pengCon.zOrder = THIS.onBlock.spr.zOrder + THIS.zOffset;
                        // console.log("hahaha");

                        if(engine.state !== engine.gameState.STATE_DASH){
                            // GAME.penguin.pengCon.displayGroup = GAME.mapManager.upperLayer;
                            THIS.setPengAnimation("penguin_move6_win", THIS.type, true);
                            SESoundPlay(SE_CONGRATULATION);
                            THIS.state = THIS.stateMap.STATE_IDLE;
                        } else {
                            THIS.state = THIS.stateMap.STATE_IDLE;
                        }

                        return;
                    }

                    if(step_i === (step_length0-1)){//여기에 걸리면 shelter 밖
                        // console.log("fallen0");
                        THIS.shadowSpine.visible = false;
                        THIS.gameOver();
                    }
                }
            }
		} else {//갈림길 블록인 경우
            if(!THIS.checkNormalBlock(step_block)){
                if(!THIS.checkNormalBlock(step_block.pair)){
                    // console.log("fallen1");
                    THIS.shadowSpine.visible = false;
                    THIS.gameOver();
                }
            }
		}
	} else if (THIS.stepOn === THIS.floorState.ON_SHELTER){
	    step_length0 = step_shelterBlocks.length;
        for(step_i=0 ; step_i < step_length0 ; ++step_i){
            if(getDist(step_shelterBlocks[step_i].spr.position, THIS.pengCon.position) <= -THIS.upOffset
                && step_shelterBlocks[step_i].spr.position.x === THIS.pengCon.position.x){//shelter 위에 있다
                THIS.onBlock = step_shelterBlocks[step_i];
                THIS.prev_block = THIS.onBlock;

                if(THIS.onBlock.bStartBlock) GAME.view.showScore();
                if(THIS.onBlock.bDash) GAME.view.showDashPop();
                // console.log("hahahahahahahahaha");
                // THIS.pengCon.zOrder = THIS.onBlock.spr.zOrder + THIS.zOffset;

                if(THIS.moveCount<2)
                    ++THIS.moveCount;
                if(THIS.tutoCount === THIS.moveCount){
                    GAME.view.bShowTuto = false;
                    GAME.view.hideTutorial();
                }
                break;
            }

            if(step_i === (step_length0-1)){//여기에 안걸리면 shelter 밖
                //일반 타일 위인지 확인
                if(getDist(step_block.spr.position, THIS.pengCon.position) <= -THIS.upOffset
                    && step_block.spr.position.x === THIS.pengCon.position.x){
                    // console.log("1");
                    GAME.view.closeDashPop();
                    GAME.view.bShowTuto = false;
                    GAME.view.hideTutorial();

                    THIS.stepOn = THIS.floorState.ON_NORMAL;
                    THIS.onBlock = step_block;
                    THIS.prev_block = THIS.onBlock;
                    step_block.bUpdate = true;

                    ++THIS.normalBlockIdx;
                    // console.log("normal_i_1: "+THIS.normalBlockIdx);
                    if(THIS.normalBlockIdx === GAME.mapManager.blocks.length) THIS.normalBlockIdx = 0;

                    // THIS.pengCon.zOrder = THIS.onBlock.spr.zOrder + THIS.zOffset;
                    ++engine.blockCount;
                    step_length1 = GAME.arr_depthInvincibile.length;
                    if(GAME.engine.blockCount===1){
                        for(step_j=0;step_j<step_length1;++step_j){
                            GAME.arr_depthInvincibile[step_j].spr.displayGroup = GAME.mapManager.upperLayer;
                        }
                    }//펭귄 움직임에 맞춰 무적 블럭 뎁스 조절.

                    GAME.view.updateCount();
                    // engine.checkHighScore();
                    engine.checkClounAlert();
                    engine.renewMap();
                    GAME.changeRoutine(engine.blockCount);
                } else {
                    // console.log("2");
                    // console.log("fallen3");
                    THIS.shadowSpine.visible = false;
                    THIS.gameOver();
                }
            }
        }
    }

    // var test = undefined;
    // if(THIS.onBlock != undefined){
    //     console.log("============");
    //     test = (THIS.onBlock.spr.displayGroup===GAME.mapManager.blockLayer)?"blockLayer":"upperLayer";
    //     console.log("pengStepBlock.display: "+test);
    // }
	THIS.state = THIS.stateMap.STATE_IDLE;
	if(THIS.pengCon.onBlock===undefined) return;
	if(THIS.pengCon.displayGroup === GAME.mapManager.pengLayer)return;
	// console.log("set");
	if(THIS.pengCon.onBlock.spr.displayGroup!=GAME.mapManager.blockLayer) THIS.pengCon.displayGroup = GAME.mapManager.displayGroup;
	// else THIS.pengCon.displayGroup = GAME.mapManager.pengLayer;
};

Penguin.prototype.playSpine = function(animationName, timeScale, trackIdx, loop, _spine){
	if(trackIdx === undefined) trackIdx = 0;
	if(loop === undefined) loop = false;
	if(timeScale === undefined) timeScale = 1;
	if(_spine === undefined) _spine = this.spine;

	_spine.visible = true;
	_spine.alpha = 1;
	
	_spine.state.timeScale = timeScale;
    _spine.state.setAnimation(trackIdx, animationName, loop);
};

Penguin.prototype.update = function(){
	if(this.onBlock !== undefined){
		if(this.onBlock.bFallen){
			if(this.bKilledSeal) return;
			if(this.bJumpWhale) return;
			
			this.state = this.stateMap.STATE_MOVE;//조작 불가로 두기위한 상태값 변화.
			this.shadowSpine.visible = false;
			// console.log("fallen4");
			this.onBlock = undefined;
			this.gameOver();
		}
	}

	if(this.buff === GAME.itemType.chaos){
	    GAME.chaosTime += deltaTime;
        if(this.call_chaosCount===0&&(GAME.flagChaosTime-GAME.chaosTime<=1)){
            this.call_chaosCount=1;//버프 꺼지는 알림 한번 호출 위한 카운트
            TweenMax.to(this.spine_emoticon, 0.25, {alpha:0.5, repeat:-1, yoyo:true});
        }

	    if(GAME.chaosTime >= GAME.flagChaosTime){
	        this.backToNormal();
        }
    }

    if(this.buff === GAME.itemType.power){
	    GAME.powerTime += deltaTime;
	    if(this.call_powerCount===0&&(GAME.flagPowerTime-GAME.powerTime<=1)){
            this.call_powerCount=1;
            TweenMax.to(this.spine_emoticon, 0.25, {alpha:0.5, repeat:-1, yoyo:true})
        }

        if(GAME.powerTime>=GAME.flagPowerTime){
	        this.backToNormal();
        }
    }//default
};

Penguin.prototype.gameOver = function(){
    SESoundStop(SE_CONFUSE);
    SESoundStop(SE_POWERUP);

    kData.iRankScore = GAME.engine.blockCount;

    if(this.type === GAME.pengType.chaos) this.bKilledChaos = true;

    GAME.engine.state = GAME.engine.gameState.STATE_OVER;
    GAME.engine.prevState = GAME.engine.gameState.STATE_OVER;

    GAME.mapManager.getUpperBlock(this);
    GAME.mapManager.allBlocksPause();
    GAME.engine.checkHighScore();

    if(GAME.view.sprDashPopBG.visible)
        GAME.view.sprDashPopBG.visible = false;

	GAME.view.hideMobileBtn();

	++GAME.engine.callTipCnt;
	
	if(GAME.engine.callConCnt>=0)
		++GAME.engine.callConCnt;

    this.setPengAnimation("penguin_move4_fallen", this.type);
    // console.log("pengGroup.length: "+GAME.arr_pengGroup.length);
    this.pengCon.addChild(GAME.sp_death_emoticon);
    var tempDist = distance2D(GAME.engine.camera.x, GAME.engine.camera.y, GAME.penguin.pengCon.position.x, GAME.penguin.pengCon.position.y);
    // console.log("dist: "+distance2D(GAME.engine.camera.x, GAME.engine.camera.y, GAME.penguin.pengCon.position.x, GAME.penguin.pengCon.position.y));
    // console.log("peng.x: "+GAME.penguin.pengCon.position.x);
    // console.log("camera.x: "+GAME.engine.camera.x);

    if(tempDist>=220){
        GAME.sp_death_emoticon.scale.x = -1;
        GAME.sp_death_emoticon.position.x = -130;
    }

    this.playSpine("fallen_emoticon", 1, 0, false, GAME.sp_death_emoticon);

	SESoundPlay(SE_SUPRISE);
	BGMSoundStop();
};

Penguin.prototype.meetSeal = function(THIS){
	// THIS.pengCon.visible = false;
	// THIS.shadowSpine.visible = false;
    THIS.pengCon.renderable = false;
	
	++THIS.engine.callTipCnt;
	
	THIS.bKilledSeal = true;
	THIS.gimmickBlock.gameOver();
};

Penguin.prototype.sealEventCheck = function(){
    return this.gimmickBlock.bSeal;
};

Penguin.prototype.whaleJump = function () {
    GAME.engine.bPengJumping = true;
    GAME.engine.camSpeed = 3;
};

Penguin.prototype.meetWhale = function(_target, _blocks){
	this.pengCon.scale.x = 1;
	var targetPos = {x:_target.spr.position.x, y:_target.spr.position.y + this.upOffset};
	this.position.x = targetPos.x;
	this.position.y = targetPos.y;

    this.setPengAnimation("penguin_move7_jump", this.type, true);
	
	TweenMax.to(this.pengCon, 2, {x:targetPos.x, y:targetPos.y});
	this.shadowSpine.visible = false;
	SESoundPlay(SE_TALEMOVE, true);

	TweenMax.to(this.pengCon, 1, {scaleX:5, scaleY:5, yoyo:true, repeat:1, onCompleteParams:[this, _blocks, _target], onComplete:function(_this, _blocks, _target){
        _this.setPengAnimation("penguin_idle", _this.type, true);
        if(_this === GAME.arr_pengGroup[GAME.arr_pengGroup.length-1]){
            for(i;i<_blocks.length;++i){
                _blocks[i].bJump = false;
                _blocks[i].bUpdate = true;
            }

            GAME.engine.blockCount += GAME.jump_BlockCnt;
            GAME.view.updateCount();
            // engine.checkHighScore();
            engine.checkClounAlert();
            GAME.changeRoutine(engine.blockCount);

            GAME.engine.camSpeed = 1;

            _target.bUpdate = true;
        }

        _this.bJumpWhale = false;
        _this.state = _this.stateMap.STATE_IDLE;

        engine.camSpeed = 1;

		SESoundStop(SE_TALEMOVE);

		_this.shadowSpine.visible = true;
	}});

	this.onBlock = _target;
	this.prev_block = this.onBlock;
	this.gimmickBlock = undefined;
	this.prev_dir = undefined;
};

Penguin.prototype.whaleEventCheck = function(){
    return this.gimmickBlock.bWhale;
};

Penguin.prototype.normalMove = function(dir){
    if(this.nextPeng != undefined){
        // console.log("nextPeng_move");
        this.nextPeng.normalMove(this.prev_dir, this.onBlock);
    }

    if(this.type === GAME.pengType.power&&this.call_powerSoundCnt==0){
        // BGMSoundPause();
        SESoundPlay(SE_POWERUP, true);
        this.call_powerSoundCnt = 1;
    }

    // if(this.pengCon.displayGroup !== GAME.mapManager.blockLayer)
    //     this.pengCon.displayGroup = GAME.mapManager.blockLayer;
    // if(this.onBlock.spr.displayGroup!=)

    // this.prev_block = this.onBlock;
    this.onBlock = undefined;
    this.prev_dir = dir;
    this.prev_pos.x = this.pengCon.position.x;
    this.prev_pos.y = this.pengCon.position.y;

	if(dir === 0){//dir == 0 : right, dir == 1 : left
		this.pengCon.scale.x = 1;
		TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+right.x, y:this.pengCon.position.y+right.y
			, onCompleteParams: [this], onComplete:this.stepBlock});
        this.setPengAnimation("penguin_move1_fast", this.type);
		this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
		SESoundPlay(SE_MOVE);
	} else if(dir === 1){
		this.pengCon.scale.x = -1;
		TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+left.x, y:this.pengCon.position.y+left.y
			, onCompleteParams: [this], onComplete:this.stepBlock});
        this.setPengAnimation("penguin_move1_fast", this.type);
		this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
		SESoundPlay(SE_MOVE);
	}
};

Penguin.prototype.dash = function(targetBlock){
	this.state = this.stateMap.STATE_MOVE;

	if(this.prevBlockDir != targetBlock.dir)//꺾일 때마다 사운드 출력~
		SESoundPlay(SE_DASH);
	
	dir = targetBlock.dir;
	this.prevBlockDir = dir;

	if(dir === 0){//dir == 0 : right, dir == 1 : left
		this.pengCon.scale.x = 1;
	} else if(dir === 1){
		this.pengCon.scale.x = -1;
	}
	
	TweenMax.to(this.pengCon, 0.04, {x:targetBlock.spr.position.x, y:targetBlock.spr.position.y + this.upOffset
		, onCompleteParams: [this], onComplete:this.stepBlock});
	
	if(this.callCount<1){//callCount : if문 안의 내용을 딱 한번만 진행하기 위한 변수..
		this.shadowSpine.visible = false;
        this.setPengAnimation("penguin_move3_dash", this.type, true);
		++this.callCount;
	}
};

Penguin.prototype.setPengAnimation = function(_animationName, _type, _loop, _timeScale){
    if(_loop === undefined) loop = false;
    if(_timeScale === undefined) _timeScale = 1;

    this.setSkinByAnimName(_animationName, _type);

    if(_type === GAME.pengType.normal||_type === GAME.pengType.power||_type === GAME.pengType.chaos)
        this.spine.skeleton.setAttachment("muffler", "muffler");
    else//아기 펭귄들
        this.spine.skeleton.setAttachment("muffler", "empty_muffler");

    this.playSpine(_animationName, _timeScale, 0, _loop);
};

Penguin.prototype.setSkinByAnimName = function (_animationName, _type) {
    this.spine.skeleton.setSlotsToSetupPose();
    switch(_animationName){
        case "penguin_idle":
            this.spine.skeleton.setAttachment("cha_ani_1", "cha_ani_1"+_type);
            break;
        case "penguin_move1_fast":
            this.spine.skeleton.setAttachment("cha_ani_1", "cha_ani_1"+_type);
            this.spine.skeleton.setAttachment("cha_ani_2", "cha_ani_2"+_type);
            break;
        case "penguin_move2_block_fast":
            this.spine.skeleton.setAttachment("cha_ani_1", "cha_ani_1"+_type);
            this.spine.skeleton.setAttachment("cha_ani_2", "cha_ani_2"+_type);
            this.spine.skeleton.setAttachment("cha_ani_3", "cha_ani_3"+_type);
            break;
        // case "penguin_move3_dash"://attach 대상이 아님.
        //     break;
        case "penguin_move4_fallen":
            this.spine.skeleton.setAttachment("cha_ani_1", "cha_ani_1"+_type);
            this.spine.skeleton.setAttachment("cha_ani_4", "cha_ani_4"+_type);
            this.spine.skeleton.setAttachment("cha_ani_5", "cha_ani_5"+_type);
            break;
        // case "penguin_move5_resurrection"://attach 대상이 아님.
        //     break;
        // case "penguin_move5_resurrection_2"://attach 대상이 아님.
        //     break;
        case "penguin_move6_win":
            this.spine.skeleton.setAttachment("cha_ani_1", "cha_ani_1"+_type);
            this.spine.skeleton.setAttachment("cha_ani_1_2", "cha_ani_1"+_type);
            this.spine.skeleton.setAttachment("cha_ani_6_2", "cha_ani_6"+_type);
            this.spine.skeleton.setAttachment("cha_front", "cha_front"+_type);
            break;
        case "penguin_move7_jump":
            this.spine.skeleton.setAttachment("cha_ani_1", "cha_ani_1"+_type);
            this.spine.skeleton.setAttachment("cha_ani_1_2", "cha_ani_1"+_type);
            this.spine.skeleton.setAttachment("cha_ani_6_2", "cha_ani_6"+_type);
            this.spine.skeleton.setAttachment("cha_ani_6", "cha_ani_6"+_type);
            break;
    }

    if(_type === GAME.pengType.normal||_type === GAME.pengType.power||_type === GAME.pengType.chaos)
        this.spine.skeleton.setAttachment("muffler", "muffler");
    else//아기 펭귄들
        this.spine.skeleton.setAttachment("muffler", "empty_muffler");
};

Penguin.prototype.showEmoticon = function (_case) {
    // console.log("peng_showEmoticon");
    TweenMax.killTweensOf(this.spine_emoticon);
    if(this.buff === GAME.itemType.power) {
        if(GAME.powerTime!=0) return;
    }

    if(this.buff === GAME.itemType.chaos) {
        if(GAME.chaosTime!=0) return;
    }

    this.spine_emoticon.skeleton.setSlotsToSetupPose();
    this.spine_emoticon.skeleton.setAttachment("add_1", "add_"+_case);
    SpinePlay_1(this.spine_emoticon, "imoticon_in", 0, false);
};

Penguin.prototype.backToNormal = function () {
    // console.log("backToNormal");
    if(this.buff === GAME.itemType.chaos){
        GAME.chaosTime = 0;
        GAME.view.backToOringinPos_mBtn();
        SESoundStop(SE_CONFUSE);
    } else {//power
        GAME.powerTime = 0;
        this.spr_powerEff.visible = false;
        SESoundStop(SE_POWERUP);
    }

    this.type = GAME.pengType.normal;
    this.buff = GAME.itemType.nothing;

    if(this.spine.state.animation !== undefined)
        this.setSkinByAnimName(this.spine.state.tracks[0].animation.name, this.type);

    SpinePlay_1(GAME.penguin.spine_emoticon, "imoticon_out", 0, false);

    this.call_chaosCount = 0;
    this.call_powerCount = 0;
    this.call_powerSoundCnt = 0;


};

Penguin.prototype.setChaosState = function () {
    if(arrSE[SE_POWERUP].playing()) arrSE[SE_POWERUP].stop();

    this.buff = GAME.itemType.chaos;
    this.type = GAME.pengType.chaos;
    this.setSkinByAnimName(this.spine.state.tracks[0].animation.name, this.type);
    this.showEmoticon(GAME.chaos);

    GAME.view.chaos_Mbtn_pos();
    GAME.powerTime = 0;
    GAME.chaosTime = 0;//먹을 때마다 초기화;
    SESoundPlay(SE_ITEMDROP);
    SESoundPlay(SE_CONFUSE, true);
};

Penguin.prototype.setPowerState = function () {
    if(arrSE[SE_CONFUSE].playing()) arrSE[SE_CONFUSE].stop();

    this.buff = GAME.itemType.power;
    this.type = GAME.pengType.power;

    this.spr_powerEff.visible = true;

    // this.setSkinByAnimName(this.spine.state.tracks[0].animation.name, this.type);
    this.setPengAnimation("penguin_move6_win", this.type, true, 1);
    SESoundPlay(SE_CONGRATULATION);
    this.showEmoticon(GAME.power);

    GAME.powerTime = 0;
    GAME.chaosTime = 0;//먹을 때마다 초기화;
};

Penguin.prototype.setSpine = function(_type){
    if(_type === GAME.pengType.normal||_type === GAME.pengType.power||_type === GAME.pengType.chaos){
        this.spine.state.addListener({
            complete:function(entry){
                switch(entry.animation.name){
                    case "penguin_move1_fast":
                        GAME.penguin.setPengAnimation("penguin_idle", GAME.penguin.type, true);
                        break;
                    case "penguin_move2_block_fast":
                        GAME.penguin.setPengAnimation("penguin_idle", GAME.penguin.type, true);
                        break;
                    case "penguin_move4_fallen":
                        if(engine.possibleContinue()){//부활팝업조건만족
                            kData.iRankScore = GAME.engine.blockCount;
                            bPayRank = true;
                            networkManager.ForcedSaveData(true, function () {
                                GAME.view.showContPop();
                            });
                            // networkManager.SaveRaking();
                            // GAME.view.showContPop();
                        } else {
                            kData.iRankScore = GAME.engine.blockCount;
                            networkManager.ForcedSaveData(true, function () {
                                if(GAME.first_chaosCnt===0&&GAME.penguin.bKilledChaos){
                                    GAME.view.showTipPop();
                                    return;
                                }

                                if(engine.callTipCnt<5){
                                    GAME.view.showOverPop();
                                } else {
                                    engine.callTipCnt = 0;
                                    // rand = Math.random();
                                    // if(rand<(1-GAME.showBonusGem)) GAME.view.showTipPop();
                                    // else GAME.view.showBonusPop();
                                    GAME.view.showTipPop();
                                }
                            });
                        }
                        break;
                    case "penguin_move5_resurrection"://낙하산타고 내려오는 애니메이션.
                        switch(GAME.engine.state){
                            case GAME.engine.gameState.STATE_PAUSE:
                                switch(GAME.engine.prevState){
                                    case GAME.engine.gameState.STATE_REPLAY:
                                        GAME.penguin.setPengAnimation("penguin_idle", GAME.penguin.type, true);
                                        break;
                                    case GAME.engine.gameState.STATE_OVER:
                                        GAME.penguin.setPengAnimation("penguin_move5_resurrection_2", GAME.penguin.type, true);
                                        break;
                                }
                                GAME.prev_pauseState = GAME.engine.prevState;
                                GAME.engine.prevState = GAME.engine.gameState.STATE_GAME;
                                break;
                            case GAME.engine.gameState.STATE_REPLAY:
                                GAME.penguin.setPengAnimation("penguin_idle", GAME.penguin.type, true);
                                GAME.view.bShowTuto = true;
                                GAME.view.showTutorial();
                                GAME.engine.state = GAME.engine.gameState.STATE_GAME;
                                break;
                            case GAME.engine.gameState.STATE_OVER:
                                GAME.penguin.setPengAnimation("penguin_move5_resurrection_2", GAME.penguin.type, true);
                                GAME.view.showMobileBtn();
                                GAME.engine.state = GAME.engine.gameState.STATE_GAME;
                                break;
                        }
                        break;
                }
            },

            event:function (entry, event) {//fallen
                SpinePlay_1(GAME.penguin.spine_emoticon, "imoticon_out");
                if(event.data.name === "fallen"){
                    if(GAME.penguin.type === GAME.pengType.power)
                        GAME.penguin.spr_powerEff.visible = false;

                    SESoundPlay(SE_DROP);
                }
            }
        });
    }
};