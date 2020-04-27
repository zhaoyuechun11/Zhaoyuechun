function MapManager(){
	this.mapContainer = new PIXI.Container();
	this.mapContainer.displayList = new PIXI.DisplayList();

	this.blockLayer = new PIXI.DisplayGroup(0, false);
	this.pengLayer = new PIXI.DisplayGroup(1, false);
	this.upperLayer = new PIXI.DisplayGroup(2, false);
	// this.upperLayer_up = new PIXI.DisplayGroup(3, false);

	this.blocks = [];//게임에 사용되는 일반 블럭들...
    this.blocks.length = 100;
	this.shelterBlocks = [];//진행하는 동안 추가되는 쉼터
	this.startShelterBlocks = [];//최초로 시작하는 쉽터

	this.block_type = {
		TYPE_NORMAL : 10,
		TYPE_SHELTER : 20,
		TYPE_START : 30
	};
	
	this.patterns = undefined;//블록 패턴 정보
	this.balances = undefined;//각 블록 흔들리고 떨어지는 시간 정보
	this.gimmickBalance = undefined;//각 블록에 gimmick(gem포함)이 붙을 확률 정보
	
	this.setDoor = -1;

	this.appearArea = 1;
	this.gimmickLevel = 1;
	
	this.iceObsIdx = 0;
}

MapManager.prototype.setPatternBlock = function(flagPos, loopNum, init){
	//dir:: - 0: right, 1: left;
	if(init === undefined) init = false;
	// var i = 0;
	var flagPos = {x:flagPos.x, y:flagPos.y};

	var availablePatterns = [];
	// this.appearArea = 2;//test
	for(i=0;i<this.patterns.length;++i){
		if(this.patterns[i].appearArea <= this.appearArea){
			availablePatterns.push(this.patterns[i].pattern);
		}
	}
	
	var vibeTime = undefined;
	var fallenTime = undefined;
	
	//get blockBalance
    if(this.appearArea>=this.balances.length){
        vibeTime = this.balances[this.balances.length-1].TimeShake;
        fallenTime = this.balances[this.balances.length-1].TimeDrop;
    } else {
        for(i=0;i<this.balances.length;++i){
            if(this.appearArea === this.balances[i].Id){
                vibeTime = this.balances[i].TimeShake;
                fallenTime = this.balances[i].TimeDrop;
                break;
            }
        }
    }

	
	var gimmickData = undefined;
	//get gimmickBalance
    // this.gimmickLevel = 100;//test
    if(this.gimmickLevel>=(this.gimmickBalance.length-1)){
        gimmickData = this.gimmickBalance[this.gimmickBalance.length-1];
    } else {
        for(i=0;i<this.gimmickBalance.length;++i){
            if(this.gimmickLevel === this.gimmickBalance[i].Id) {
                gimmickData = this.gimmickBalance[i];
                break;
            }
        }
    }

    var tempNum = (GAME.penguin.normalBlockIdx>=75) ? 0:50;
    if(init) tempNum = 0;

    while(loopNum>0){
		var randIdx = Math.floor(Math.random()*availablePatterns.length);
		// randIdx = availablePatterns.length-1;//test
		// var num = this.blocks.length;
		// console.log("num: "+num);
		var usePattern = availablePatterns[randIdx];
		
		if(!init){
			if(Math.random() > 0.49) usePattern = this.patternChange(usePattern);
		} else {
			init = false;
		}
		
		var find3 = false;//갈림길을 찾아랏!!
		var forkedBlock = null;

		var j = 0;
		var pairPatterns =[]; var block = undefined;

		var length = usePattern.length;
		
		for(i=0; i<length;++i){
            block = GAME.getBlock();
            block.init();
            this.blocks[tempNum++] = block;
			block.setType(GAME.blockType.NORMAL, fallenTime, vibeTime, GAME.check_blockNum);

            ++GAME.check_blockNum;
            ++GAME.gimmickBlockIdx;
            // console.log("blockIdx: "+GAME.gimmickBlockIdx);
            // console.log("check_blockNum: "+GAME.check_blockNum);

            if(GAME.gimmickBlockIdx>=100) GAME.gimmickBlockIdx = 0;

            if(GAME.check_blockNum === kData.iHighScore){//default:kData.iHighScore
                block.bHighBlock = true;
                GAME.sprFlag_00.visible = true;
                block.spr.addChild(GAME.sprFlag_00);
                GAME.sprFlag_00.scale.x = block.spr.scale.x;
                GAME.sprFlag_00.position.set(-40, -100);
                // console.log("set flag");
            }//최고 기록 블럭에 깃발 박기...

			if(!find3){
				switch(usePattern[i]){
				case 0:
					block.setPosition(flagPos, right);
					
					if(!GAME.engine.bCallGimmick)
						block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
						
					if(this.setDoor < 0 && GAME.engine.bCallGimmick)
						this.checkGimmick(block, gimmickData, GAME.gimmickBlockIdx);
					else {
						++this.setDoor;
						if(this.setDoor === 10)
							this.setDoor = -1;
					}
					
					flagPos.x = block.spr.position.x;
                    flagPos.y = block.spr.position.y;
					break;
				case 1:
					block.setPosition(flagPos, left);
					
					if(!GAME.engine.bCallGimmick){
						block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
						block.spr.scale.x = -1;
					}
					
					if(this.setDoor < 0 && GAME.engine.bCallGimmick)
						this.checkGimmick(block, gimmickData, GAME.gimmickBlockIdx);
					else {
						++this.setDoor;
						if(this.setDoor === 10)
							this.setDoor = -1;
					}

                    flagPos.x = block.spr.position.x;
                    flagPos.y = block.spr.position.y;
					break;
				case 3://갈림길 생성 케이스
					pairPatterns = []; j=0;
					block.setPosition(flagPos, right);
					
					if(!GAME.engine.bCallGimmick)
						block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
					
					if(this.setDoor < 0 && GAME.engine.bCallGimmick)
						this.checkGimmick(block, gimmickData, GAME.gimmickBlockIdx);
					else {
						++this.setDoor;
						if(this.setDoor === 10)
							this.setDoor = -1;
					}
					
					this.createPair(block, flagPos, left);
                    flagPos.x = block.spr.position.x;
                    flagPos.y = block.spr.position.y;
					forkedBlock = block;
					find3 = true;
					// var a = i+1;
					for(a = i+1;a<usePattern.length;++a){
						if(a+1 >= usePattern.length
								|| usePattern[a+1] === 3) break;
						if(usePattern[a+1]!==3){
							pairPatterns.push(usePattern[a]);
						}
					}
					pairPatterns.reverse();
					break;
				case 4:
					pairPatterns = []; j=0;
					block.setPosition(flagPos, left);
					
					if(!GAME.engine.bCallGimmick){
						block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
						block.spr.scale.x = -1;
					}
					
					if(this.setDoor < 0 && GAME.engine.bCallGimmick)
						this.checkGimmick(block, gimmickData, GAME.gimmickBlockIdx);
					else {
						++this.setDoor;
						if(this.setDoor === 10)
							this.setDoor = -1;
					}
					
					this.createPair(block, flagPos, right);
                    flagPos.x = block.spr.position.x;
                    flagPos.y = block.spr.position.y;
					forkedBlock = block;
					find3 = true;
					// var a = i+1;
					for(a = i+1;a<usePattern.length;++a){
						if(a+1 >= usePattern.length
								|| usePattern[a+1] === 4) break;
						if(usePattern[a+1]!==4){
							pairPatterns.push(usePattern[a]);
						}
					}
					pairPatterns.reverse();
					break;
				}
			} else {//여기가 갈림길 놓는 곳
				if(j < pairPatterns.length){
					switch(usePattern[i]){
					case 0:
						block.setPosition(flagPos, right);
						
						if(!GAME.engine.bCallGimmick)
							block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
						
						if(this.setDoor < 0 && GAME.engine.bCallGimmick)
							this.checkGimmick(block, gimmickData, GAME.gimmickBlockIdx);
						else {
							++this.setDoor;
							if(this.setDoor === 10)
								this.setDoor = -1;
						}
						
						var dir = (pairPatterns[j++] === 0) ? right:left;
						this.createPair(block, forkedBlock.pair.spr.position, dir);
                        flagPos.x = block.spr.position.x;
                        flagPos.y = block.spr.position.y;
						forkedBlock = block;
						break;
					case 1:
						block.setPosition(flagPos, left);
						
						if(!GAME.engine.bCallGimmick){
							block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
							block.spr.scale.x = -1;
						}
						
						if(this.setDoor < 0 && GAME.engine.bCallGimmick)
							this.checkGimmick(block, gimmickData, GAME.gimmickBlockIdx);
						else {
							++this.setDoor;
							if(this.setDoor === 10)
								this.setDoor = -1;
						}
						
						var dir = (pairPatterns[j++] === 0) ? right:left;
						this.createPair(block, forkedBlock.pair.spr.position, dir);
                        flagPos.x = block.spr.position.x;
                        flagPos.y = block.spr.position.y;
						forkedBlock = block;
						break;
					}
				} else {
					switch(usePattern[i]){
					case 0:
						block.setPosition(flagPos, right);
						
						if(!GAME.engine.bCallGimmick)
							block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");

                        flagPos.x = block.spr.position.x;
                        flagPos.y = block.spr.position.y;
						break;
					case 1:
						block.setPosition(flagPos, left);
						
						if(!GAME.engine.bCallGimmick){
							block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
							block.spr.scale.x = -1;
						}

                        flagPos.x = block.spr.position.x;
                        flagPos.y = block.spr.position.y;
						break;
					case 3:
						block.setPosition(flagPos, right);
						
						if(!GAME.engine.bCallGimmick)
							block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");

						flagPos.x = block.spr.position.x;
						flagPos.y = block.spr.position.y;
						find3 = false;
						break;
					case 4:
						block.setPosition(flagPos, left);
						
						if(!GAME.engine.bCallGimmick){
							block.spr.texture = PIXI.Texture.fromFrame("skip_tile.png");
							block.spr.scale.x = -1;
						}

						flagPos.x = block.spr.position.x;
						flagPos.y = block.spr.position.y;
						find3 = false;
						break;
					}
				}
			}

            if(GAME.cloud_interval<=GAME.check_blockNum&&GAME.check_blockNum%GAME.cloud_interval===0){
                GAME.arr_alertBlocks.push(block);
                block.alertCount = GAME.check_blockNum;
            }

		}//for문 끝...

		--loopNum;
	}
};

MapManager.prototype.createShelter = function(flagPos, dir){
    this.shelterBlocks.length = 0;
	if(dir === undefined) dir = {x:0, y:0};
	else if(dir === 0) dir = right;
	else if(dir === 1) dir = left;

	var i, j = 0; var block = undefined;
	for(i = 0 ; i < 16 ; ++i){
        block = GAME.getBlock();
        block.init();
        this.shelterBlocks[i] = block;
		this.shelterBlocks[i].setType(GAME.blockType.SHELTER);
	}
	
	//1)기준블럭먼저깔고
	var flagBlock;
	var flagBlocks =[];
	for(i = 0 ; i < 4 ; ++i){
		if(i === 0){
			this.shelterBlocks[i].setPosition(flagPos, dir);
			
			flagBlock = this.shelterBlocks[i];
			flagBlocks.push(flagBlock);
			flagPos = flagBlock.spr.position;
			continue;
		}
		this.shelterBlocks[i].setPosition(flagPos, left);
		
		if(GAME.engine.bCallGimmick)
			this.checkGimmick(this.shelterBlocks[i]);//쉼터에서 보석나오게 할 목적의 코드...
		
		flagBlock = this.shelterBlocks[i];
		flagBlocks.push(flagBlock);
		flagPos = flagBlock.spr.position;
	}
	//zOrder 정렬
	//2)기준블럭에 맞춰서 나머지(12개)블럭 깐다.
	for(i = 0 ; i < 4 ; ++i){
		var flagNum = (3*i) + 4;
		flagBlock = flagBlocks[i];
		for(j = 0 ; j < 3 ; ++j){
			this.shelterBlocks[flagNum + j].setPosition(flagBlock.spr.position, right);
			
			if(GAME.engine.bCallGimmick)
				this.checkGimmick(this.shelterBlocks[flagNum + j]);
			
			flagBlock = this.shelterBlocks[flagNum + j];
		}
	}
	
	//set goalBlock;
	this.shelterBlocks[0].bGoalBlock = true;
	//set exitBlock;
	this.shelterBlocks[15].bExitBlock = true;
};

MapManager.prototype.moveMapCon = function(dir){
	this.mapContainer.position.x += dir.x;
	this.mapContainer.position.y += dir.y;
};

var map_i = 0; var map_length = 0;
MapManager.prototype.update = function(){
    map_length = this.blocks.length;
    for(map_i=0;map_i<map_length;++map_i){
        if(this.blocks[map_i] === undefined) continue;
        this.blocks[map_i].update();
    }
};

MapManager.prototype.createPair = function(pairBlock, flagPos, dir){
    var block = GAME.getBlock();
    block.init();
    pairBlock.pair = block;
	pairBlock.pair.setType(GAME.blockType.NORMAL, pairBlock.fallenTime, pairBlock.vibeTime);
	pairBlock.pair.setPosition(flagPos, dir);

	if(pairBlock.bHighBlock){
	    GAME.sprFlag_01.visible = true;
	    pairBlock.pair.spr.addChild(GAME.sprFlag_01);
	    GAME.sprFlag_01.scale.x = pairBlock.pair.spr.scale.x;
        GAME.sprFlag_01.position.set(-40, -100);
    }
};

MapManager.prototype.patternChange = function(patternArray){
	var i = 0;
	var returnArray = [];
	for(i=0;i<patternArray.length;++i){
		switch(patternArray[i]){
		case 0:
			returnArray.push(1);
			break;
		case 1:
			returnArray.push(0);
			break;
		case 3:
			returnArray.push(4);
			break;
		case 4:
			returnArray.push(3);
			break;
		}
	}
	
	return returnArray;
};

MapManager.prototype.createStartShelter = function(flagPos){
    // console.log("createStartShelter");
	var i, j = 0;
	var num = 23; var child = undefined; var block = undefined;
	for(i = 0 ; i < num ; ++i){
        block = GAME.getBlock();
        block.init();
        this.startShelterBlocks[i] = block;
        GAME.arr_depthInvincibile[i] = block;
		this.startShelterBlocks[i].setType(GAME.blockType.SHELTER);
        this.startShelterBlocks[i].arr_idx = i;
	}

	var flagBlock;
	var flagBlocks =[];
	for(i = 0 ; i < 5 ; ++i){
		if(i === 0){
			this.startShelterBlocks[i].setPosition(flagPos);
			flagBlock = this.startShelterBlocks[i];
			flagBlocks.push(flagBlock);
			flagPos = flagBlock.spr.position;
			
			this.shelterBlocks.push(flagBlock);
			continue;
		}
		this.startShelterBlocks[i].setPosition(flagPos, left);
		flagBlock = this.startShelterBlocks[i];
		flagBlocks.push(flagBlock);
		flagPos = flagBlock.spr.position;
		
		this.shelterBlocks.push(flagBlock);
		
		if(i===4){
            child = GAME.getInvincibile();
            // child.displayGroup = this.blockLayer;
            flagBlock.bMoved = false;
            flagBlock.spr.addChild(child);
            child.anchor.set(0.5);
            child.position.set(0, -70);
            flagBlock.hitCnt = 30;
		}
	}
	
	var limit = 4;
	var flagNum = 5;
	var push_index = 0;

	for(i = 0 ; i < 5 ; ++i){
		flagNum += j;
		flagBlock = flagBlocks[i];
		if(i>2)limit = 3;
		for(j = 0 ; j < limit ; ++j){
			this.startShelterBlocks[flagNum + j].setPosition(flagBlock.spr.position, right);
			flagBlock = this.startShelterBlocks[flagNum + j];
			
			this.shelterBlocks.push(flagBlock);
			
			if(GAME.engine.bDash){
				if(flagNum+j>16 && flagNum+j<20){
					flagBlock.spr.texture = PIXI.Texture.fromFrame("goal_tile.png");
					flagBlock.bDash = true;
				}
			} else {
				if(flagNum+j === 19)
					flagBlock.spr.texture = PIXI.Texture.fromFrame("start_tile.png");
			}
			
			if(j === 3 || i === 4){
                child = GAME.getInvincibile();
                // child.displayGroup = this.blockLayer;
				flagBlock.bMoved = false;
				flagBlock.spr.addChild(child);
				child.anchor.set(0.5);
				child.position.set(0, -70);
                flagBlock.hitCnt = 30;
                // if(j===3) GAME.arr_depthInvincibile[push_index++] = child;
			}
		}
	}
	//set exitBlock;
	this.startShelterBlocks[19].bStartBlock = true;
};

var gem = 0; var piece = 0; var rock = 0; var block = 0; var question = 0; var door = 0; var egg = 0;
MapManager.prototype.getGimmickType = function(gimmickData, blockIdx){//기믹 나올 확률 적용 함수.
    /**
     * case 별 테스트 코드 시작
     * *///test
    // var returnObj = {type : 0, hitCnt: 0};///test
    // switch(blockIdx){
    //     case 4:
    //         // ++this.setDoor;
    //         // returnObj.type = GAME.gimmick_type.TYPE_SEA;
    //         returnObj.type = GAME.gimmick_type.TYPE_EGG;
    //         returnObj.hitCnt = 1;
    //         break;
    //     case 9:
    //         returnObj.type = GAME.gimmick_type.TYPE_EGG;
    //         returnObj.hitCnt = 1;
    //         // returnObj.type = GAME.gimmick_type.TYPE_RANDOM_OBS;
    //         // returnObj.hitCnt = 1;
    //         break;
    //     case 25:
    //         // returnObj.type = GAME.gimmick_type.TYPE_EGG;
    //         // returnObj.hitCnt = 1;
    //         returnObj.type = GAME.gimmick_type.TYPE_EGG;
    //         returnObj.hitCnt = 1;
    //         break;
    //     case 30:
    //         ++this.setDoor;
    //         returnObj.type = GAME.gimmick_type.TYPE_SEA;
    //         // returnObj.type = GAME.gimmick_type.TYPE_EGG;
    //         // returnObj.hitCnt = 1;
    //         break;
    //     case 40:
    //         // ++this.setDoor;
    //         // returnObj.type = GAME.gimmick_type.TYPE_SEA;
    //         // returnObj.type = GAME.gimmick_type.TYPE_RANDOM_OBS;
    //         // returnObj.hitCnt = 1;
    //         // returnObj.type = GAME.gimmick_type.TYPE_EGG;
    //         // returnObj.hitCnt = 1;
    //         break;
    //     default:
    //         return undefined;
    //         break;
    // }
    // return returnObj;
    /**
     * case 별 테스트 코드 끝
     * */
    // console.log("getGimmickType");
	var rand = Math.random();

	gem = 0; piece = 0; rock = 0; block = 0; question = 0; door = 0; egg = 0;
	
	if(gimmickData === undefined){//쉼터 보석 확률 용
		gem = 0.1;
	} else {
		gem = gimmickData.Gem * 0.01;
		piece = gimmickData.Piece * 0.01;
		rock = gimmickData.Rock * 0.01;
		block = gimmickData.Block * 0.01;
		question = gimmickData.Question * 0.01;
		door = gimmickData.Door * 0.01;
		egg = gimmickData.Egg * 0.01;
	}

	// console.log("gem: "+gem);
	// console.log("piecs: "+piece);
	// console.log("rock: "+rock);
	// console.log("block: "+block);
	// console.log("question: "+question);
	// console.log("door: "+door);
	// console.log("egg: "+egg);

	if(gimmickData !== undefined && blockIdx < 5) return undefined;//최초 5칸 앞에선 기믹 안나오게~
    if(blockIdx===GAME.arr_targetIdx[0]) {
        GAME.arr_targetIdx.shift();
        return undefined;//고래꼬리의 target block이 될 블럭 인덱스면 넘어간다~
    }

	if(blockIdx === undefined) blockIdx = 0;
	
	var min = 0;
	var max = 0;
	var returnObj = { type : 0, hitCnt: 0};

	// gem = 1;//test
	if(gem!==0){
		max = gem;
		if(rand>=min && rand<max){
            // console.log("gimmick_gem");

            returnObj.type = GAME.gimmick_type.TYPE_GEM;
			return returnObj;
		}
		min = max;
	}

	if(egg!==0){
	    if(min!=0) max = min + egg;
	    else max = egg;

	    if(rand>=min && rand<max){
            // console.log("gimmick_egg");

            this.iceObsIdx = blockIdx;
            returnObj.type = GAME.gimmick_type.TYPE_EGG;
            returnObj.hitCnt = 1;
            return returnObj;
        }

        min = max;
    }

	if(piece!==0){
		if(min!==0) max = min + piece;
		else max = piece;
		
		if(rand>=min && rand<max){
            // console.log("gimmick_piece");

            this.iceObsIdx = blockIdx;
			returnObj.type = GAME.gimmick_type.TYPE_NORMAL_OBS;
			returnObj.hitCnt = 1;
			return returnObj;
		}
		min = max;
	}
    // min = 0;//test
    // rock = 1;//test
	if(rock!==0){
		if(min!==0) max = min + rock;
		else max = rock;

		if(rand>=min && rand<max){
            // console.log("gimmick_rock");

            this.iceObsIdx = blockIdx;
			returnObj.type = GAME.gimmick_type.TYPE_NORMAL_OBS;
			returnObj.hitCnt = 2;
			return returnObj;
		}
		min = max;
	}
    // min = 0;//test
    // block = 0.5;//test
	if(block!==0){
		if(min!==0) max = min + block;
		else max = block;
		
		if(rand>=min && rand<max){
            // console.log("gimmick_block");

            this.iceObsIdx = blockIdx;
			returnObj.type = GAME.gimmick_type.TYPE_NORMAL_OBS;
			returnObj.hitCnt = 3;
			return returnObj;
		}
		min = max;
	}
    // min = 0;//test
    // question = 1;//test
	if(question!==0){
		if(min!==0) max = min + question;
		else max = question;
		
		if(rand>=min && rand<max){
            // console.log("gimmick_question");
            this.iceObsIdx = blockIdx;
			returnObj.type = GAME.gimmick_type.TYPE_RANDOM_OBS;
            returnObj.hitCnt = 1;
			return returnObj;
		}
		min = max;
	}
    // min = 0;//test
    // door = 0.9;//test
	if(door!==0 && blockIdx < 75 && blockIdx >= (this.iceObsIdx+2)){//점프 거리 10->25m로 증가하면서 생성 위치 변경..
		if(min!==0) max = min + door;
		else max = door;
		
		if(rand>=min && rand<max){
            // console.log("blockIdx: "+blockIdx);
            var targetIdx = blockIdx + 25;
            if(targetIdx<=99) GAME.arr_targetIdx.push(targetIdx);//25칸 앞의 블럭 인덱스 저장.
            // console.log("target_idx: "+targetIdx);
            // console.log("check_blockNum: "+GAME.check_blockNum);
            this.iceObsIdx = 0;
			++this.setDoor;
			
			returnObj.type = GAME.gimmick_type.TYPE_SEA;
			return returnObj;
		}
	}
	
	return undefined;
};

MapManager.prototype.checkGimmick = function(block, gimmickData, blockIdx){
    if(block.bHighBlock) return;//최고 깃발용 블럭이라면 기믹따윈 뱌뱌~

	var gimmickSetObj = this.getGimmickType(gimmickData, blockIdx);
	if(gimmickSetObj !== undefined)
		GAME.gimmickManager.addGimmick(gimmickSetObj.type, gimmickSetObj.hitCnt, block);
};

MapManager.prototype.initGame = function(){
	//container 초기화
	this.mapContainer.position.x = 0;
	this.mapContainer.position.y = 0;

	this.blocks = [];
	this.blocks.length = 100;
	this.shelterBlocks = [];
	this.startShelterBlocks = [];

	//난이도 초기화
	this.appearArea = 1;
	this.gimmickLevel = 1;

    //최고 블럭 체크 값 초기화
    if(GAME.sprFlag_00.parent!=undefined||GAME.sprFlag_00.parent!=null)
        GAME.sprFlag_00.parent.removeChild(GAME.sprFlag_00);
    if(GAME.sprFlag_01.parent!=undefined||GAME.sprFlag_01.parent!=null)
        GAME.sprFlag_01.parent.removeChild(GAME.sprFlag_01);

    GAME.sprFlag_00.visible = false;
	GAME.sprFlag_01.visible = false;

    GAME.check_blockNum = 0;
    GAME.gimmickBlockIdx = 0;

    GAME.arr_alertBlocks.length = 0;//구름 알림판 초기화
    GAME.arr_targetIdx.length = 0;//고래꼬리 타겟 블럭 기믹생성방지 배열 초기화.

	this.iceObsIdx = 0;
};

MapManager.prototype.allBlocksPause = function () {
    var blocks_length = this.blocks.length;
    var block = undefined;
    for(i=0;blocks_length;++i){
        block = this.blocks[i];
        if(block === undefined) break;
        if(block !== GAME.penguin.prev_block){
            if(block.vibeTween !== undefined)
                block.vibeTween.pause();
            if(block.fallenTween !== undefined)
                block.fallenTween.pause();
        }
    }
};

MapManager.prototype.allBlocksResume = function () {
    var blocks_length = GAME.penguin.normalBlockIdx;
    var block = undefined;
    for(i=0;blocks_length;++i){
        block = this.blocks[i];
        if(block === undefined) break;
        if(block !== GAME.penguin.prev_block){
            if(block.vibeTween !== undefined){
                block.vibeTween.resume();
                // console.log("i: "+i);
            }
            if(block.fallenTween !== undefined){
                block.fallenTween.resume();
                // console.log("i_fallen: "+i);
            }
        }
    }
};

MapManager.prototype.getUpperBlock = function (_deathPeng) {//_deathPeng : 죽은 펭귄
    // var length = 0; var i = 0;
    // var compareValue = GAME.penguin.pengCon.position.y;
    // var block = undefined;
    // var deathPengCnt = 0;
    // length = GAME.arr_pengGroup.length;
    // // console.log("pengGroup_length: "+length);
    //
    // for(i=0;i<length;++i){
    //     if(_deathPeng===GAME.arr_pengGroup[i]){
    //         deathPengCnt = i;
    //     }
    // }
    //
    // if(GAME.penguin.normalBlockIdx<=10){
    //     length = this.shelterBlocks.length;
    //     for(i=0;i<length;++i){
    //         if(this.shelterBlocks[i].spr.position.y>compareValue+30){
    //             // console.log("shelter");
    //             this.shelterBlocks[i].spr.displayGroup = this.upperLayer;
    //             // console.log("peng: "+GAME.penguin.pengCon.position.y);
    //             // console.log("shel: "+this.shelterBlocks[i].spr.position.y);
    //         }
    //     }
    // }
    //
    // if(GAME.penguin.normalBlockIdx==0&&GAME.engine.blockCount>0) length = GAME.mapManager.blocks.length;
    // else length = GAME.penguin.normalBlockIdx-deathPengCnt;
    //
    // for(i=(GAME.penguin.normalBlockIdx<=30)?0:GAME.penguin.normalBlockIdx-30;i<length;++i){
    //     block = this.blocks[i];
    //     if(block.spr.position.y>=compareValue){
    //         block.spr.displayGroup = this.upperLayer;
    //         if(block.pair!=undefined)
    //             block.pair.spr.displayGroup = this.upperLayer;
    //     }
    // }
    // // console.log("upper_length: "+length);
    //
    // if(deathPengCnt===0){
    //     length = GAME.arr_pengGroup.length;
    //     for(i=1;i<length;++i) {
    //         GAME.arr_pengGroup[i].pengCon.displayGroup = this.upperLayer;
    //     }
    // }//일반 펭귄이 죽었을 때 아기 펭귄 위로 블럭이 올라오는 것 방지.
    //
    // // this.getSuperBlock();
    var compareValue = _deathPeng.pengCon.position.y;
    var target = undefined; var target_idx = 0;

    var length = this.shelterBlocks.length;
    for(i=0;i<length;++i){
        target = this.shelterBlocks[i];
        if(target.spr.position.y>compareValue+30){
            target.spr.displayGroup = this.upperLayer;
        }
    }

    length = this.blocks.length;
    for(i=(GAME.penguin.normalBlockIdx<=30)?0:GAME.penguin.normalBlockIdx-30;i<length;++i){
        target = this.blocks[i];
        if(target === undefined) continue;
        if(target.spr.position.y>compareValue){
            target.spr.displayGroup = this.upperLayer;
            if(target.pair!=undefined)
                target.pair.spr.displayGroup = this.upperLayer;
        }
    }

    length = GAME.arr_pengGroup.length;
    for(i=0;i<length;++i){
        target = GAME.arr_pengGroup[i];
        if(target != _deathPeng) continue;
        target_idx = i;
        break;
    }

    for(i=target_idx+1;i<length;++i){
        target = GAME.arr_pengGroup[i];
        if(target === undefined) break;
        target.pengCon.displayGroup = this.upperLayer;
    }
};

// MapManager.prototype.getSuperBlock = function () {
//     // console.log("getSuperBlock");
//     var length = this.shelterBlocks.length;
//     for(i=0;i<length;++i){
//         if(this.shelterBlocks[i].spr.displayGroup!=this.upperLayer) continue;
//         this.shelterBlocks[i].spr.displayGroup = this.upperLayer_up;
//     }
//
//     length = this.blocks.length;
//     for(i=0;i<length;++i){
//         if(this.blocks[i]===undefined) continue;
//         if(this.blocks[i].spr.displayGroup!=this.upperLayer) continue;
//         this.blocks[i].spr.displayGroup = this.upperLayer_up;
//     }
// };

MapManager.prototype.backToBlockLayer = function () {
    var length = this.blocks.length;
    var target = undefined;
    for(i=0;i<length;++i){
        target = this.blocks[i];
        if(target === undefined) continue;
        // if(target.spr.displayGroup === this.upperLayer)
            target.spr.displayGroup = this.blockLayer;
            if(target.pair != undefined)
                target.pair.spr.displayGroup = this.blockLayer;
    }

    length = this.shelterBlocks.length;
    for(i=0;i<length;++i){
        target = this.shelterBlocks[i];
        // if(target.spr.displayGroup === this.upperLayer)
            target.spr.displayGroup = this.blockLayer;
    }

    length = GAME.arr_pengGroup.length;
    for(i=0;i<length;++i){
        target = GAME.arr_pengGroup[i];
        if(target === undefined) break;
        target.pengCon.displayGroup = this.pengLayer;
    }
};
