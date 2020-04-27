GAME.stageLevel = 1;
GAME.stageFloor = 1;
GAME.bestFloor = 1;
GAME.stageGold = 0;//한 stage당 획득하는 골드
GAME.accStageGold = 0;//gameOver 전 스테이지까지 획득한 총 골드의 양
GAME.skipGold = 0;//skip한 층을 클리어했을 시 받을 골드의 양.
GAME.skipStageFloor = 11;//floorSelect시에 설정한 stageFloor
GAME.skipStageLevel = 3;

GAME.zombiesZOrder = 0;

GAME.left = 0;
GAME.right = 1;
GAME.center = 2;
//add things;
GAME.up = 3;
GAME.down = 4;

GAME.zombieType = {
		normal : 1,
		jump : 2,
		enhance : 3,
		hulk : 4,
		human : 5
};

GAME.tutoShotPattern = [0, 1, 0, 1];
GAME.tutoStep = 0;
GAME.tutoIdx = 0;

//add things
GAME.insertTime = 0.25;
GAME.jumpSpeed_revision = 0;//점프 좀비 애니메이션속도 보정치.

GAME.stageManager = function(engine){
	this.engine = engine;
	this.patterns = undefined;
	this.levelData = undefined;
	
	this.accTime = GAME.insertTime;
	this.flagTime = GAME.insertTime;
	
	this.zombies = [];
	
	this.leftEnemies = [];
	this.rightEnemies = [];
	
	this.jumpZombies = [];
	
	this.stagePattern = undefined;
	this.stageEndCnt = 0;
	
	this.floorContainer = new PIXI.Container();
	this.floorContainer.displayList = new PIXI.DisplayList();
	
	this.backLayer = new PIXI.DisplayGroup(0, false);
	this.corriderLayer = new PIXI.DisplayGroup(1, false);
	this.zombieLayer = new PIXI.DisplayGroup(2, true);
	// this.elevatorLayer = new PIXI.DisplayGroup(3, false);
	
	this.sprBack = SpriteLoad(this.floorContainer, strGamePath+"img/back_2.png", iCenterSizeX+3, iCenterSizeY-315);
	this.sprBack.displayGroup = this.backLayer;
	this.sprBack.zOrder = 1000;
	this.sprCorrider = SpriteLoad(this.floorContainer, strGamePath+"img/back.png", iCenterSizeX, iCenterSizeY);
	this.sprCorrider.displayGroup = this.corriderLayer;
	
	this.revisionTime = 0;
	
	this.delayedCnt = 2;
	
	this.leftDelayCnt = 0;
	this.rightDelayCnt = 0;
	
	this.leftSequence = 0;
	this.rightSequence = 0;

	this.curPattern = undefined;
	this.curMoveTime = 0;

    this.banCount = 2;
    // this.banIndex = -1;//2층 동안 나오지 못할 패턴의 인덱스
	this.arr_banIndex = [];

	this.people = [];
};
GAME.stageManager.constructor = GAME.stageManager;

GAME.stageManager.prototype.init = function(){
	GAME.stageLevel = 1;
	if(!kData.bFirstPlay)
		GAME.stageFloor = 1;
	else
		GAME.stageFloor = 0;

	GAME.jumpSpeed_revision = 0;
};

// var testPattern = [1, 0, 1, 0];//test

GAME.stageManager.prototype.createStage = function(){
	var i = 0;
	var length = this.zombies.length;
	for(i=0;i<length;++i){
		this.zombies[i].init();
	}
	
	GAME.zombiesZOrder = 0;
	
	this.leftEnemies.length = 0;
	this.rightEnemies.length = 0;
	this.jumpZombies.length = 0;
	this.people.length = 0;

	this.leftDelayCnt = 0;
	this.rightDelayCnt = 0;
	this.leftSequence = 0;
	this.rightSequence = 0;
	
	this.accTime = 0.5;

    i = 0;
    length = this.patterns.length;
    var availablePatterns = [];
    for(i=0;i<length;++i){
        if(this.patterns[i].level <= GAME.stageLevel){
            if(GAME.stageLevel>=3 && this.patterns[i].level === 1) continue;
            availablePatterns.push(this.patterns[i]);
        }
    }

    var lvData = undefined;
    length = this.levelData.length;

    if(GAME.stageLevel > length)
        GAME.stageLevel = length;

    for(i=0;i<this.levelData.length;++i){
        if(this.levelData[i].level === GAME.stageLevel){
            lvData = this.levelData[i];
        }
    }
    GAME.jumpSpeed_revision = 1 - lvData.time;

	//ban index setting start
	var randIdx = 0;
	var flag = true;

	if(this.arr_banIndex.length!=0){
		while(flag){
            randIdx = ((Math.random()*availablePatterns.length)|0);
            for(i=0;i<this.arr_banIndex.length;++i){
                if(randIdx === this.arr_banIndex[i]) break;
                if(i===this.arr_banIndex.length-1){
                    if(this.banCount===0) this.arr_banIndex.shift();
                	if(this.arr_banIndex.length!=2) this.arr_banIndex.push(randIdx);
                    flag = false;
                }
            }
		}
	}else{//최초등록
        randIdx = ((Math.random()*availablePatterns.length)|0);
        this.arr_banIndex.push(randIdx);
	}
    //ban index setting start

    // console.log("randIdx: "+randIdx);
    // console.log("banIndex0: "+this.arr_banIndex[0]);
    // console.log("banIndex1: "+this.arr_banIndex[1]);
    // console.log("banIndex2: "+this.arr_banIndex[2]);
    // console.log("banCount: "+this.banCount);
    // console.log("=======================");

    if(this.curPattern === undefined){
        this.revisionTime = lvData.time * availablePatterns[randIdx].speed;
        this.stagePattern = availablePatterns[randIdx].pattern;

        //left, right swap
		if(Math.random()<0.5){
			length = this.stagePattern.length;
			var tempPattern = this.stagePattern;
			for(i=0;i<length;++i){

				if(tempPattern[i] === -1) continue;

				if(tempPattern[i] === 1) tempPattern[i] = 6;
                else if(tempPattern[i] === 2) tempPattern[i] = 7;
                else if(tempPattern[i] === 3) tempPattern[i] = 8;
                else if(tempPattern[i] === 6) tempPattern[i] = 1;
                else if(tempPattern[i] === 7) tempPattern[i] = 2;
                else if(tempPattern[i] === 8) tempPattern[i] = 3;

                else if(tempPattern[i] >= 100 && tempPattern[i] < 200){
					tempPattern[i] = 200 + (tempPattern[i]-100);
				}

                else if(tempPattern[i] >= 200 && tempPattern[i] < 300){
                    tempPattern[i] = 100 + (tempPattern[i]-200);
				}
			}

			this.stagePattern = tempPattern;
		}

		--this.banCount;
		if(this.banCount<0) this.banCount = 2;

    }else{//이어 하기 상태~
        this.stagePattern = this.curPattern;
        this.revisionTime = this.curMoveTime;
    }

	if(kData.bFirstPlay){
		this.stagePattern = [1, 6, 1, 6, 3, 8];
		this.revisionTime = 3;
		this.flagTime = 0.5;
		this.accTime = this.flagTime;
	}else{
        this.flagTime = lvData.time * GAME.insertTime;
        this.accTime = this.flagTime;

        // this.stagePattern = testPattern;
    }

	length = this.stagePattern.length;
	for(i=0;i<length;++i){
		var zombie = this.stagePattern[i];
		if(zombie === 1){
			this.zombies[i].setZombie(GAME.zombieType.normal, this.revisionTime, GAME.zombiesZOrder++, GAME.left);
			this.leftEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
		} else if(zombie === 2) {
			this.zombies[i].setZombie(GAME.zombieType.jump, this.revisionTime, GAME.zombiesZOrder++, GAME.left);
			this.leftEnemies[i] = this.zombies[i];
			this.rightEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
			this.floorContainer.addChild(this.zombies[i].cloneSpine);
		} else if(zombie === 3) {
			this.zombies[i].setZombie(GAME.zombieType.human, this.revisionTime, GAME.zombiesZOrder++, GAME.left);
			this.leftEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
			this.people.push(this.zombies[i]);
			this.zombies[i].arrIdx = i;
		} else if(zombie === 6) {
			this.zombies[i].setZombie(GAME.zombieType.normal, this.revisionTime, GAME.zombiesZOrder++, GAME.right);
			this.rightEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
		} else if(zombie === 7) {
			this.zombies[i].setZombie(GAME.zombieType.jump, this.revisionTime, GAME.zombiesZOrder++, GAME.right);
			this.leftEnemies[i] = this.zombies[i];
			this.rightEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
			this.floorContainer.addChild(this.zombies[i].cloneSpine);
		} else if(zombie === 8) {
			this.zombies[i].setZombie(GAME.zombieType.human, this.revisionTime, GAME.zombiesZOrder++, GAME.right);
			this.rightEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
			this.people.push(this.zombies[i]);
			this.zombies[i].arrIdx = i;
		} else if(zombie >= 10 && zombie <= 99) {
			this.zombies[i].setZombie(GAME.zombieType.hulk, this.revisionTime, GAME.zombiesZOrder++, GAME.center, zombie);
			this.leftEnemies[i] = this.zombies[i];
			this.rightEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
		} else if(zombie >= 100 && zombie < 200) {
			this.zombies[i].setZombie(GAME.zombieType.enhance, this.revisionTime, GAME.zombiesZOrder++, GAME.left, zombie - 100);
			this.leftEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
		} else if(zombie >= 200 && zombie < 300) {
			this.zombies[i].setZombie(GAME.zombieType.enhance, this.revisionTime, GAME.zombiesZOrder++, GAME.right, zombie - 200);
			this.rightEnemies[i] = this.zombies[i];
			this.floorContainer.addChild(this.zombies[i].spine);
		}
	}
	this.stageEndCnt = (this.leftEnemies.length < this.rightEnemies.length) ? this.rightEnemies.length :this.leftEnemies.length;

	this.curPattern = undefined;
};

GAME.stageManager.prototype.createPool = function(length){
	var i = 0;
	for(i=0;i<length;++i){
		this.zombies[i] = new GAME.zombie();
	}
};

GAME.stageManager.prototype.insertZombie = function(){
	this.accTime += deltaTime;
	
	if(this.accTime < this.flagTime) return;
	
	if(kData.bFirstPlay && GAME.tutoStep < GAME.tutoShotPattern.length){
		++GAME.tutoStep;
		setTimeout(function(){
			GAME.view.shotTuto(GAME.tutoShotPattern[GAME.tutoIdx++]);
			
			if(!GAME.bMobile && GAME.tutoIdx >= GAME.tutoShotPattern.length){
				setTimeout(function(){
					GAME.view.shotTuto(2);
				}, 1000);
			}
		}, 1500);
	}
	
	var endSequence = (this.leftSequence>this.rightSequence) ? this.leftSequence : this.rightSequence;
	if(endSequence >= this.stageEndCnt){/*this.stageEndCnt*/
		return;
	}
	
	var leftEnemy = undefined;
	if(this.leftDelayCnt === 0) leftEnemy = this.leftEnemies[this.leftSequence++];
	if(this.leftDelayCnt>0) --leftDelayCnt;
	
	var rightEnemy = undefined;
	if(this.rightDelayCnt === 0) rightEnemy = this.rightEnemies[this.rightSequence++];
	if(this.rightDelayCnt>0) --rightDelayCnt;
	
	var i = 0;
	while(i<2){
		if(i===0){
			if(leftEnemy != undefined){
				leftEnemy.comeOut();
				if(leftEnemy.type === GAME.zombieType.Human) this.leftDelayCnt = this.delayedCnt;
				break;
			}
		} else {
			if(rightEnemy != undefined){
				rightEnemy.comeOut();
				if(rightEnemy.type === GAME.zombieType.Human) this.rightDelayCnt = this.delayedCnt;
				break;
			}
		}
		++i;
	}
	this.accTime = 0;
};


GAME.stageManager.prototype.update = function(){
	var i = 0;
	var length = this.jumpZombies.length;

	for(i=0;i<length;++i){
		this.jumpZombies[i].jumpUpdate(deltaTime);
	}

	if(kData.bFirstPlay) return;

	length = this.people.length;
	for(i=0;i<length;++i){
		this.checkFront(this.people[i], this.people[i].arrIdx);
	}
};

GAME.stageManager.prototype.hit = function(direction){
	// var i = 0;
	// var length = 0;
	// var zombie = undefined;
	if(direction === 0){//left
		for(i=0;i<this.leftEnemies.length;++i){
			if(this.leftEnemies[i] === undefined || this.leftEnemies[i].death || !this.leftEnemies[i].bCanShot) continue;
			if(this.leftEnemies[i].spine.visible || this.leftEnemies[i].cloneSpine.visible){
				if(this.leftEnemies[i].position === GAME.left || this.leftEnemies[i].position === GAME.center){
                    this.leftEnemies[i].hit();
					break;
				}
			}
		}
	} else { //right
		// var length = this.rightEnemies.length;
		// var zombie = undefined;
		for(i=0;i<this.rightEnemies.length;++i){
			// zombie = this.rightEnemies[i];
			if(this.rightEnemies[i] === undefined || this.rightEnemies[i].death || !this.rightEnemies[i].bCanShot) continue;
			if(this.rightEnemies[i].spine.visible || this.rightEnemies[i].cloneSpine.visible){
				if(this.rightEnemies[i].position === GAME.right || this.rightEnemies[i].position === GAME.center){
                    this.rightEnemies[i].hit();
					break;
				}
			}
		}
	}
};

var death_leftLength = 0; var death_rightLength = 0; var death_i = 0;
GAME.stageManager.prototype.allDeath = function(){
	death_leftLength = this.leftEnemies.length;
	death_rightLength = this.rightEnemies.length;
	
	for(death_i=0;death_i<death_leftLength;++death_i){
		if(this.leftEnemies[death_i] !== undefined){
			if(!this.leftEnemies[death_i].death) return false;
		}
	}
	
	for(death_i=0;death_i<death_rightLength;++death_i){
		if(this.rightEnemies[death_i] !== undefined){
			if(!this.rightEnemies[death_i].death) return false;
		}
	}
	
	if(kData.bFirstPlay){
		GAME.view.hideTutorial();
		kData.bFirstPlay = false;
		SaveDataInClient();
	}
	return true;
};

GAME.stageManager.prototype.checkFront = function(woman, index){
	if(woman.position === GAME.left){
		for(i=index-1;i>=0;--i){
			if(this.leftEnemies[i] === undefined) continue;
			if(!this.leftEnemies[i].death) return;
		}
	} else {
		for(i=index-1;i>=0;--i){
			if(this.rightEnemies[i] === undefined) continue;
			if(!this.rightEnemies[i].death) return;
		}
	}
	
	woman.changeTween();
};

GAME.stageManager.prototype.skipStage = function(upDown){
	var length = this.levelData.length;

	if(GAME.skipStageFloor !== 1){
		GAME.skipStageLevel = (GAME.skipStageFloor+4) * 0.2;
	}

	switch(upDown){
		case GAME.up:
			// ++GAME.skipStageLevel;//stage level 값
            GAME.skipStageLevel += 2;
			GAME.stageFloor = GAME.skipStageLevel * 5 - 4;

			//최대 층 안 넘어가게
			if(GAME.stageFloor>kData.iBestFloor){
				// --GAME.skipStageLevel;
                GAME.skipStageLevel -= 2;
				GAME.stageFloor = GAME.skipStageLevel * 5 - 4;
			}//default//local&&test sever에선 주석처리//실서버에서만 적용...

			//101층 안 넘어가게
			if(GAME.stageFloor>71){
                GAME.skipStageLevel-=2;//stage level 값
                GAME.stageFloor = 71;
			}

            if(GAME.skipStageLevel >= this.levelData[length-1].level)
                GAME.skipStageLevel = this.levelData[length-1].level;
		break;
		case GAME.down:
			GAME.skipStageLevel-=2
			if(GAME.skipStageLevel < 3){
				GAME.skipStageLevel = 3;
			}
			GAME.stageFloor = GAME.skipStageLevel * 5 - 4;
		break;
	}

    GAME.skipStageFloor = GAME.stageFloor;
	GAME.stageLevel = GAME.skipStageLevel;
	GAME.view.setSelectPopText();
};//cancel 하면 init(), skip하면 createStage->redsiren