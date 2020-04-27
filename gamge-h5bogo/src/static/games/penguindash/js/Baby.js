/**
 * Created by ggumak on 2017-04-05.
 */
function Baby(_type) {
    this.pengCon = new PIXI.Container();

    this.spine = new PIXI.spine.Spine(spines.penguin);
    this.shadowSpine = new PIXI.spine.Spine(spines.shadow);

    this.pengCon.addChild(this.shadowSpine);
    this.pengCon.addChild(this.spine);
    this.pengCon.scale.set(0.8);

    this.upOffset = -30;
    // this.zOffset = -20;
    // this.zOffset_shadow = -18;

    GAME.mapManager.mapContainer.addChild(this.pengCon);
    this.pengCon.displayGroup = GAME.mapManager.pengLayer;
    this.pengCon.pivot.set(0.5);

    this.onBlock = undefined;//밟고있는 블럭이 떨어지나 안떨어지나 체크 용.

    this.pengCon.visible = false;
    this.type = _type;
    this.group_idx = -1;//GAME.arr_pengGroup내에서 index
    this.nextPeng = undefined;//바로 뒤에 따라붙는 펭귄.
    this.frontPeng = undefined;//순서상 내 앞의 펭귄.

    this.prev_dir = undefined;
    this.prev_pos = {x:0, y:0};

    this.setSpine();
}

Baby.prototype.init = function (_block) {
    this.prev_dir = undefined;
    this.nextPeng = undefined;
    this.nextPeng = undefined;
    this.prev_pos.x = 0; this.prev_pos.y = 0;
    this.onBlock = _block;
    // this.group_idx = GAME.arr_pengGroup.length-1;
    this.pengCon.position.x = _block.spr.position.x;
    this.pengCon.position.y = _block.spr.position.y + this.upOffset;
    this.pengCon.displayGroup = GAME.mapManager.pengLayer;
    this.pengCon.visible = true;
    var rand = randRangeFromInt(1, 4);
    this.type = GAME.pengType["baby_"+rand];
    this.playSpine("shadow_move", 0, 0, false, this.shadowSpine);
    this.setPengAnimation("penguin_idle", this.type, true);
};

Baby.prototype.normalMove = function (_dir, _block) {
    if(_dir === undefined) return;
    // if(this.pengCon.displayGroup !== GAME.mapManager.blockLayer)
    //     this.pengCon.displayGroup = GAME.mapManager.blockLayer;

    if(this.nextPeng != undefined)
        this.nextPeng.normalMove(this.prev_dir, this.onBlock);

    this.onBlock = _block;
    this.prev_dir = _dir;
    this.prev_pos.x = this.pengCon.position.x;
    this.prev_pos.y = this.pengCon.position.y;

    if(_dir === 0){//dir == 0 : right, dir == 1 : left
        this.spine.scale.x = 1;
        TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+right.x, y:this.pengCon.position.y+right.y});
        this.setPengAnimation("penguin_move1_fast", this.type);
        this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
        SESoundPlay(SE_MOVE);
    } else if(_dir === 1){
        this.spine.scale.x = -1;
        TweenMax.to(this.pengCon, 0.1, {x:this.pengCon.position.x+left.x, y:this.pengCon.position.y+left.y});
        this.setPengAnimation("penguin_move1_fast", this.type);
        this.playSpine("shadow_move", 1, 0, false, this.shadowSpine);
        SESoundPlay(SE_MOVE);
    }
};

Baby.prototype.setSpine = function(){
    var closure = this;
    this.spine.state.addListener({
        complete:function(entry){
            var peng = closure;
            switch(entry.animation.name){
                case "penguin_move1_fast":
                    if(peng.onBlock===GAME.mapManager.shelterBlocks[0]){
                        peng.setPengAnimation("penguin_move6_win", peng.type, true);
                        // peng.pengCon.displayGroup = GAME.mapManager.upperLayer;
                    } else
                        peng.setPengAnimation("penguin_idle", peng.type, true);
                    break;
                case "penguin_move4_fallen":
                    // --GAME.iCurBabyCnt;//아기 펭귄 수 감소.
                    this.visible = false;
                    break;
            }
        }
    });
};

Baby.prototype.setPengAnimation = function(_animationName, _type, _loop, _timeScale){
    if(_loop === undefined) loop = false;
    if(_timeScale === undefined) _timeScale = 1;

    this.setSkinByAnimName(_animationName, _type);

    if(_type === GAME.pengType.normal||_type === GAME.pengType.power||_type === GAME.pengType.chaos)
        this.spine.skeleton.setAttachment("muffler", "muffler");
    else//아기 펭귄들
        this.spine.skeleton.setAttachment("muffler", "empty_muffler");

    this.playSpine(_animationName, _timeScale, 0, _loop);
};

Baby.prototype.playSpine = function(animationName, timeScale, trackIdx, loop, _spine){
    if(trackIdx === undefined) trackIdx = 0;
    if(loop === undefined) loop = false;
    if(timeScale === undefined) timeScale = 1;
    if(_spine === undefined) _spine = this.spine;

    _spine.visible = true;
    _spine.alpha = 1;

    _spine.state.timeScale = timeScale;
    _spine.state.setAnimation(trackIdx, animationName, loop);
};

Baby.prototype.setSkinByAnimName = function (_animationName, _type) {
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

Baby.prototype.update = function () {
    if(this.onBlock!=undefined){
        if(this.onBlock.bFallen){
            this.shadowSpine.visible = false;
            // GAME.arr_pengGroup[this.group_idx].nextPeng = undefined;
            // this.nextPeng = undefined;
            // this.frontPeng.nextPeng = undefined;
            // for(i=0;i<GAME.arr_pengGroup.length;++i){
            //     if(this===GAME.arr_pengGroup[i]) GAME.arr_pengGroup.splice(i, 1);
            // }
            // --GAME.iCurBabyCnt;
            this.death();
            // console.log("GAME.icurBabyCnt_create: "+GAME.iCurBabyCnt);
            this.setPengAnimation("penguin_move4_fallen", this.type);
            this.onBlock = undefined;
        }
    }
};

Baby.prototype.death = function () {
    // console.log("baby_death");

    if(this.frontPeng!=undefined) this.frontPeng.nextPeng = undefined;
    for(i=0;i<GAME.arr_pengGroup.length;++i){
        if(this===GAME.arr_pengGroup[i]) GAME.arr_pengGroup.splice(i, 1);
    }

    for(i=0;i<GAME.arr_waitBabies.length;++i){
        if(this===GAME.arr_waitBabies[i]) GAME.arr_waitBabies.splice(i, 1);
    }

    GAME.mapManager.getUpperBlock(this);
    --GAME.iCurBabyCnt;

    if(this.nextPeng!=undefined) this.nextPeng.death();
};

Baby.prototype.meetWhale = function (_targetBlock, _blocks) {
    // console.log("baby_meetwhale");
    this.onBlock = _targetBlock;
    this.prev_dir = undefined;

    var targetPos = {x:_targetBlock.spr.position.x, y:_targetBlock.spr.position.y+this.upOffset};
    this.setPengAnimation("penguin_move7_jump", this.type, true);
    this.shadowSpine.visible = false;
    TweenMax.to(this.pengCon, 2, {x:targetPos.x, y:targetPos.y});
    TweenMax.to(this.pengCon, 1, {scaleX:4, scaleY:4, yoyo:true, repeat:1, onCompleteParams:[this, _blocks, _targetBlock],onComplete:function (_this, _blocks, _target) {
        _this.shadowSpine.visible = true;
        _this.setPengAnimation("penguin_idle", _this.type, true);

        if(_this === GAME.arr_pengGroup[GAME.arr_pengGroup.length-1]){
            for(i=0;i<_blocks.length;++i){
                _blocks[i].bJump = false;
                _blocks[i].bUpdate = true;
            }

            GAME.engine.blockCount += GAME.jump_BlockCnt;
            GAME.view.updateCount();
            // GAME.engine.checkHighScore();
            GAME.engine.checkClounAlert();
            GAME.changeRoutine(GAME.engine.blockCount);

            GAME.engine.camSpeed = 1;

            _target.bUpdate = true;
        }
    }});

    if(this === GAME.arr_pengGroup[GAME.arr_pengGroup.length-1]){
        for(i=0;i<_blocks.length;++i){
            _blocks[i].bJump = false;
            _blocks[i].bUpdate = true;
        }
    }
};