function UI_ranking(parent){
    this.popupShield = new PIXI.Graphics();
    parent.addChild(this.popupShield);
    this.popupShield.beginFill(0x000000, 0.5);
    this.popupShield.drawRect(0, 0, iMaxSizeX, iMaxSizeY);
    this.popupShield.endFill();
    this.popupShield.interactive = true;

    this.spr_bg = SpriteSliceLoad(this.popupShield, "pop_bg.png", iCenterSizeX, iCenterSizeY, 626, 1145, 10, 10, 10, 10);
    this.btn_confirm = new GUMA.button(this.spr_bg, "btn_back.png", 0, 470);
    this.btn_confirm.setCallback(this.closePop);

    this.txt_confirm = FontLoad(this.btn_confirm.sprite, GAME.table_language["select03"][GAME.language], 0, 0
        , {font:"bold 35px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});//확인

    this.txt_title = FontLoad(this.spr_bg, GAME.table_language["ranking01"][GAME.language], 0, -520
        , {font:"bold 65px "+GAME.fontName[GAME.language], fill:"#ffffff"});

    this.dailyContainer = new PIXI.Container();
    this.totalContainer = new PIXI.Container();
    this.dailyContainer.position.y = -305;
    this.totalContainer.position.y = -305;

    this.spr_bg.addChild(this.dailyContainer);
    this.spr_bg.addChild(this.totalContainer);

    this.slice_daily = SpriteSliceLoad(this.spr_bg, "tab.png", -130, -410, 316, 85);
    this.slice_total = SpriteSliceLoad(this.spr_bg, "tab.png", 130, -410, 316, 85);

    this.txt_daily = FontLoad(this.slice_daily, GAME.table_language["ranking02"][GAME.language], 0, 0
        , {font:"40px "+GAME.fontName[GAME.language], fill:"#d2d0d0", fontWeight:"bold"});
    this.txt_total = FontLoad(this.slice_total, GAME.table_language["ranking03"][GAME.language], 0, 0
        , {font:"40px "+GAME.fontName[GAME.language], fill:"#d2d0d0", fontWeight:"bold"});

    this.slice_daily.interactive = true;
    this.slice_total.interactive = true;

    this.slice_daily.on("click", function () {
        SESoundPlay(SE_BUTTON);
        GAME.ui_ranking.showDaily();
    });
    this.slice_daily.on("tap", function () {
        SESoundPlay(SE_BUTTON);
        GAME.ui_ranking.showDaily();
    });

    this.slice_total.on("click", this.showTotal);
    this.slice_total.on("tap", this.showTotal);

    this.slice_onDaily = SpriteSliceLoad(this.spr_bg, "btn_tab.png", -130, -410, 322, 93);
    this.slice_onTotal = SpriteSliceLoad(this.spr_bg, "btn_tab.png", 130, -410, 322, 93);
    this.slice_onDaily.interactive = true;
    this.slice_onTotal.interactive = true;

    this.txt_onDaily = FontLoad(this.slice_onDaily, GAME.table_language["ranking02"][GAME.language], 0, -2
        , {font:"40px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5, fontWeight:"bold"});
    this.txt_onTotal = FontLoad(this.slice_onTotal, GAME.table_language["ranking03"][GAME.language], 0, -2
        , {font:"40px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5, fontWeight:"bold"});

    this.slice_onDaily.visible = false;
    this.slice_onTotal.visible = false;

    //make RankUp Container
    this.user_rank = 0;//daily/total 통합. 일일/종합 보여주는 함수에서 rankingPopupData의 newRank/newCuRank로 setting
    this.rankUpContainer = new PIXI.Container();

    // this.rankUpShield = new PIXI.Graphics();//랭크업 이미지 강재로 보게 하기 위한 그래픽스....
    // this.rankUpContainer.addChild(this.rankUpShield);
    // this.rankUpShield.beginFill(0xff00ff, 0.5);
    // this.rankUpShield.drawRect(-iCenterSizeX, -iCenterSizeY, iMaxSizeX, iMaxSizeY-200);
    // this.rankUpShield.endFill();
    // this.rankUpShield.interactive = true;

    this.spr_bg.addChild(this.rankUpContainer);
    this.rankUpContainer.position.y = 100;

    this.spine_rankUp = new PIXI.spine.Spine(spines.rankUp);
    this.rankUpContainer.addChild(this.spine_rankUp);
    this.spine_rankUp.position.set(0, -190);

    this.spine_rankUp.state.addListener({
        complete:function(entry){
            switch(entry.animation.name){
                case "rank_up_eff_in":
                    setTimeout(function(){
                        var spine = GAME.ui_ranking.spine_rankUp;
                        SpinePlay(spine, spine.position.x, spine.position.y, "rank_up_eff_out", 0, false);
                        TweenMax.to(GAME.ui_ranking.spr_arrow, 1, {alpha:0});
                    }, 500);
                    break;
                case "rank_up_eff_out":
                    if(GAME.ui_ranking.user_rank>3){
                        GAME.ui_ranking.rankUpContainer.visible = false;
                        GAME.ui_ranking.spr_effectShielder.visible = false;
                    }else{
                        var ui_ranking = GAME.ui_ranking;
                        if(ui_ranking.user_rank>0) ui_ranking.spr_Medal.texture = ui_ranking["tex_Medal_"+ui_ranking.user_rank.toString()];
                        GAME.ui_ranking.spr_Medal.visible = true;
                        ui_ranking.spr_Medal.scale.set(1.3, 1.3);
                        TweenMax.to(ui_ranking.spr_Medal, 0.5, {scaleX:1, scaleY:1, onComplete:function(){
                            setTimeout(function(){
                                GAME.ui_ranking.spr_Medal.visible = false;
                                GAME.ui_ranking.rankUpContainer.visible = false;
                                GAME.ui_ranking.spr_effectShielder.visible = false;
                            }, 500);
                        }});
                    }

                    break;
            }
        }
    });

    this.spr_arrow = SpriteLoad(this.rankUpContainer, "rank_arrow.png", 50, 0);
    this.bit_oldRank = createBitmapFont("50px RankNum", "456", {x:-50, y:-10}, "right");
    this.bit_newRank = createBitmapFont("50px RankNum", "123", {x:50, y:-10}, "left");
    this.spr_arrow.addChild(this.bit_oldRank);
    this.spr_arrow.addChild(this.bit_newRank);

    this.rankUpContainer.visible = false;

    this.tex_me = SpriteSliceLoad(this.spr_bg, "panel_me.png", 0, 0, 578, 106, 9, 9, 9, 9);
    this.tex_empty = SpriteSliceLoad(this.spr_bg, "panel_empty.png", 0, 0, 578, 106, 9, 9, 9, 9);
    this.tex_first = SpriteSliceLoad(this.spr_bg, "panel_top.png", 0, 0, 578, 106, 9, 9, 9, 9);
    this.tex_other = SpriteSliceLoad(this.spr_bg, "panel_other.png", 0, 0, 578, 106, 9, 9, 9, 9);

    this.tex_me.visible = false;
    this.tex_empty.visible = false;
    this.tex_first.visible = false;
    this.tex_other.visible = false;

    this.spr_Medal = SpriteLoad(this.spr_bg, "medal_1.png", 0, 0);
    this.tex_Medal_1 = new PIXI.Texture.fromFrame("medal_1.png");
    this.tex_Medal_2 = new PIXI.Texture.fromFrame("medal_2.png");
    this.tex_Medal_3 = new PIXI.Texture.fromFrame("medal_3.png");
    this.spr_Medal.visible = false;

    this.tex_1st = new PIXI.Texture.fromFrame("medal_1_small.png");
    this.tex_2nd = new PIXI.Texture.fromFrame("medal_2_small.png");
    this.tex_3rd = new PIXI.Texture.fromFrame("medal_3_small.png");

    this.startY = GAME.ranking_startY;
    this.firstInterval = 142;
    this.interval = 125;

    this.arr_dailySlots = [];
    this.arr_totalSlots = [];
    this.arr_posY = [];

    this.bit_RankNumber = createBitmapFont("50px RankNum", "123", {x:0, y:0}, "center");
    this.bit_RankNumber.visible = false;

    this.makeSlots();

    this.bShowDailyEffect = false; //rankUp을 한 경우에만 true가 된다..
    this.bShowTotalEffect = false; //rankUp을 한 경우에만 true가 된다..
    this.bFlag_showAgain = false;

    this.dailyContainer.visible = false;
    this.totalContainer.visible = false;
    this.slice_onDaily.visible = false;
    this.slice_onTotal.visible = false;

    SpinePlay(this.spine_rankUp, this.spine_rankUp.position.x, this.spine_rankUp.position.y, "rank_up_eff_in", 0, false);
    this.popupShield.visible = false;
    // this.spr_bg.scale.y = 0;

    this.spr_effectShielder = SpriteLoad(this.spr_bg, "white.png", 0, 0);
    this.spr_effectShielder.width = iMaxSizeX;
    this.spr_effectShielder.height = iMaxSizeY;
    this.spr_effectShielder.interactive = true;
    this.spr_effectShielder.visible = false;
    this.spr_effectShielder.alpha = 0;
}

UI_ranking.constructor = UI_ranking;

UI_ranking.prototype.makeSlots = function(){
    var i = 0; var newSlot = undefined;

    for(i=0;i<6;++i){//daily set
        newSlot = new UI_ranking_slot(this, this.dailyContainer, i);
        newSlot.spr_bg.position.y = this.startY;

        this.arr_posY[i] = this.startY;//daily, total 위치 같으니까 한번만...

        if(i !== 0)
            this.startY += this.interval;
        else
            this.startY += this.firstInterval;

        if(i === 0) {
            newSlot.spr_medal = SpriteLoad(newSlot.spr_bg, "medal_1_small.png", -210, 5);
            SlicedSpriteChangeTexture_02(newSlot.spr_bg, this.tex_first);
        }
        else if(i === 1)
            newSlot.spr_medal = SpriteLoad(newSlot.spr_bg, "medal_2_small.png", -210, 5);
        else if(i === 2)
            newSlot.spr_medal = SpriteLoad(newSlot.spr_bg, "medal_3_small.png", -210, 5);

        this.arr_dailySlots[i] = newSlot;
        this.dailyContainer.addChild(newSlot.spr_bg);
    }///set Daily

    this.daily_signUp = new UI_ranking_slot(this, this.dailyContainer, -1);
    this.daily_signUp.spr_bg.visible = false;

    this.startY = GAME.ranking_startY;

    for(i=0;i<6;++i){//total set
        newSlot = new UI_ranking_slot(this, this.totalContainer, i);
        newSlot.spr_bg.position.y = this.startY;

        if(i !== 0)
            this.startY += this.interval;
        else
            this.startY += this.firstInterval;

        if(i === 0) {
            newSlot.spr_medal = SpriteLoad(newSlot.spr_bg, "medal_1_small.png", -210, 5);
            SlicedSpriteChangeTexture_02(newSlot.spr_bg, this.tex_first);
        }
        else if(i === 1)
            newSlot.spr_medal = SpriteLoad(newSlot.spr_bg, "medal_2_small.png", -210, 5);
        else if(i === 2)
            newSlot.spr_medal = SpriteLoad(newSlot.spr_bg, "medal_3_small.png", -210, 5);

        this.arr_totalSlots[i] = newSlot;
        this.totalContainer.addChild(newSlot.spr_bg);
    }//set Total

    this.total_signUp = new UI_ranking_slot(this, this.totalContainer, -1);
    this.total_signUp.spr_bg.visible = false;
};

UI_ranking.prototype.setInit = function(){
    this.spr_Medal.visible = false;//medal 이미지 visible 초기화
    this.rankUpContainer.visible = false;//rankUp container visible 초기화
    // this.spine_rankUp.skeleton.setToSetupPose();
    // this.spine_rankUp.state.clearTrack(0);
};

UI_ranking.prototype.showDaily = function(){
    // SESoundPlay(SE_BUTTON);
    var ui_ranking = GAME.ui_ranking;
    SpinePlay(ui_ranking.spine_rankUp, ui_ranking.spine_rankUp.position.x, ui_ranking.spine_rankUp.position.y, "empty", 0, false);
    ui_ranking.setInit();

    ui_ranking.dailyContainer.visible = true;
    ui_ranking.totalContainer.visible = false;
    ui_ranking.slice_onDaily.visible = true;
    ui_ranking.slice_onTotal.visible = false;

    if(rankingPopupData!=null)
        ui_ranking.user_rank = rankingPopupData.newRank;
    // ui_ranking.bShowDailyEffect = true;//test
    if(!ui_ranking.bShowDailyEffect) return;

    ui_ranking.arr_dailySlots[0].spr_bg.visible = false;
    ui_ranking.showRankUpEffect("daily");
};

UI_ranking.prototype.showTotal = function () {
    SESoundPlay(SE_BUTTON);
    var ui_ranking = GAME.ui_ranking;
    SpinePlay(ui_ranking.spine_rankUp, ui_ranking.spine_rankUp.position.x, ui_ranking.spine_rankUp.position.y, "empty", 0, false);
    ui_ranking.setInit();

    ui_ranking.dailyContainer.visible = false;
    ui_ranking.totalContainer.visible = true;
    ui_ranking.slice_onDaily.visible = false;
    ui_ranking.slice_onTotal.visible = true;

    if(rankingPopupData!=null)
        ui_ranking.user_rank = rankingPopupData.newCuRank;
    // ui_ranking.bShowTotalEffect = true;//test
    if(!ui_ranking.bShowTotalEffect) return;

    ui_ranking.arr_totalSlots[0].spr_bg.visible = false;
    ui_ranking.showRankUpEffect("total");
};

UI_ranking.prototype.update = function(){
    for(this.i=0;this.i<this.length;++this.i){
        this.arr_slots[this.i].update(deltaTime);
    }
};

UI_ranking.prototype.checkRanking = function(){//networkManager의 CB_showRanking 역할
    // console.log("checkServerRanking");
    networkManager.LoadRanking(GAME.ui_ranking.cb_setRankingPop);
};

UI_ranking.prototype.showPop = function(){
    if(engine.state !== engine.gameState.STATE_PAUSE) {
        engine.prevState = engine.state;
        engine.state = engine.gameState.STATE_PAUSE;
    }

    GAME.ui_ranking.arr_dailySlots[0].spr_bg.visible = true;
    GAME.ui_ranking.arr_totalSlots[0].spr_bg.visible = true;

    if(rankingPopupData !== null && rankingPopupData !== undefined){
        if(GAME.ui_ranking.bShowDailyEffect && rankingPopupData.newRank == 1) GAME.ui_ranking.arr_dailySlots[0].spr_bg.visible = false;
        if(GAME.ui_ranking.bShowTotalEffect && rankingPopupData.newCuRank == 1) GAME.ui_ranking.arr_totalSlots[0].spr_bg.visible = false;
    }

    GAME.ui_ranking.popupShield.visible = true;
    GAME.ui_ranking.showDaily();
    // TweenLite.to(GAME.ui_ranking.spr_bg, 0.3, {scaleY:1, onComplete:GAME.ui_ranking.showDaily});
};

UI_ranking.prototype.closePop = function(){
    SESoundPlay(SE_BUTTON);

    // GAME.ui_ranking.spr_bg.scale.y = 0;
    GAME.ui_ranking.popupShield.visible = false;
    // GAME.ui_ranking.spine_rankUp.skeleton.setToSetupPose();

    GAME.ui_ranking.bShowDailyEffect = false;
    GAME.ui_ranking.bShowTotalEffect = false;

    GAME.ui_ranking.arr_dailySlots[0].spr_bg.visible = true;
    GAME.ui_ranking.arr_totalSlots[0].spr_bg.visible = true;//tween이 끝나기 전에 창을 닫을 수 있어

    if(!GAME.view.sprPausePopBG.visible) engine.state = engine.prevState;

    if(GAME.prev_pauseState===GAME.engine.gameState.STATE_REPLAY){
        GAME.view.bShowTuto = true;
        GAME.view.showTutorial();
    } else if(GAME.prev_pauseState===GAME.engine.gameState.STATE_OVER){
        GAME.View.showMobileBtn();
    }

    GAME.prev_pauseState = -1;
};

// 랭킹 팝업 보여주기 전 선행작업 netBase.js 의 getRankingList 이후 call...
UI_ranking.prototype.cb_setRankingPop = function(){//NetworkManager.js의 rankingData...
    var day_length = rankingData.day.length;
    var total_length = rankingData.all.length;
    var dummy = undefined; var dummy1 = undefined; var idx = 0;

    for(i=0;i<GAME.ui_ranking.arr_dailySlots.length;++i){
        dummy = GAME.ui_ranking.arr_dailySlots[i];
        dummy1 = GAME.ui_ranking.arr_totalSlots[i];
        dummy.spr_bg.visible = false;
        dummy1.spr_bg.visible = false;

        if(dummy.spr_medal !== undefined)
            dummy.spr_medal.visible = false;
        if(dummy1.spr_medal !== undefined)
           dummy1.spr_medal.visible = false;
    }

    GAME.ui_ranking.daily_signUp.spr_bg.visible = false;
    GAME.ui_ranking.total_signUp.spr_bg.visible = false;
    //checkLoginState start
    if(loginTF === 0){//logout 상태
        //set Daily
        if(day_length!==0){//다른 기록이 있을 경우//1~5위까지 출력 6자리에 회원가입...
            for(i=0;i<day_length;++i){
                dummy = GAME.ui_ranking.arr_dailySlots[i];
                dummy.spr_bg.visible = true;
                dummy1 = rankingData.day[i];
                dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score);
            }
            if(day_length>5) day_length = 5;
            GAME.ui_ranking.daily_signUp.spr_bg.position.y = GAME.ui_ranking.arr_posY[day_length];
            GAME.ui_ranking.daily_signUp.spr_bg.visible = true;
        }else{//다른 기록이 없는 경우
            GAME.ui_ranking.arr_dailySlots[0].setSlot(1);
            GAME.ui_ranking.daily_signUp.spr_bg.position.y = GAME.ui_ranking.arr_posY[1];
            GAME.ui_ranking.daily_signUp.spr_bg.visible = true;
        }
        //set total
        if(total_length!==0){//다른 기록이 있을 경우//있는대로 출력하고 마지막칸에 출력
            for(i=0;i<total_length;++i){
                dummy = GAME.ui_ranking.arr_totalSlots[i];
                dummy.spr_bg.visible = true;
                dummy1 = rankingData.all[i];
                dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score);
            }
            if(total_length>5) total_length = 5;
            GAME.ui_ranking.total_signUp.spr_bg.position.y = GAME.ui_ranking.arr_posY[total_length];
            GAME.ui_ranking.total_signUp.spr_bg.visible = true;
        }else{//다른 기록이 없는 경우
            GAME.ui_ranking.arr_totalSlots[0].setSlot(1);
            GAME.ui_ranking.total_signUp.spr_bg.position.y = GAME.ui_ranking.arr_posY[1];
            GAME.ui_ranking.total_signUp.spr_bg.visible = true;
        }
    }else{//greap login 상태
        //자신의 데이터 유무 체크...
        var bEmpty_daily = true; var bEmpty_total = true;//해당 값이 false라면 해당 카테고리에 내 정보가 없다.
        for(i=0;i<total_length;++i){
            if(rankingData.myid !== rankingData.all[i].user_id) continue;
            if(rankingData.my_all_score === 0) break;
            bEmpty_total = false;
            break;
        }

        if(!bEmpty_total){
            for(i=0;i<day_length;++i){
                if(rankingData.myid !== rankingData.day[i].user_id) continue;
                if(rankingData.my_day_score === 0) break;//점수가 빵이면 그 카테고리에 대해 해당 유저는 미등록 상태...
                bEmpty_daily = false;
                break;
            }
        }
        //내 기록이 있는 경우...total
        if(!bEmpty_total){
            for(i=0;i<total_length;++i){
                dummy = GAME.ui_ranking.arr_totalSlots[i];
                dummy1 = rankingData.all[i];
                if(dummy1.user_id !== rankingData.myid){
                    dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score);
                }else{
                    dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score, true);
                }
            }
        }else{//내 기록이 없는 경우....
            if(total_length!==0){
                for(i=0;i<total_length;++i){
                    dummy = GAME.ui_ranking.arr_totalSlots[i];
                    dummy.spr_bg.visible = true;
                    dummy1 = rankingData.all[i];
                    dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score);
                }
                idx = total_length;
                if(idx >= GAME.ui_ranking.arr_totalSlots.length) idx = GAME.ui_ranking.arr_totalSlots.length-1;
                GAME.ui_ranking.arr_totalSlots[idx].setSlot(undefined, rankingData.myid, undefined, false, true);//마지막에 자기 슬롯 출력...
            }else{//어떤 기록도 없는 경우
                GAME.ui_ranking.arr_totalSlots[0].setSlot(1);
                GAME.ui_ranking.arr_totalSlots[1].setSlot(undefined, rankingData.myid, undefined, false, true);
            }
        }

        if(!bEmpty_daily){
            for(i=0;i<day_length;++i){
                dummy = GAME.ui_ranking.arr_dailySlots[i];
                dummy1 = rankingData.day[i];
                if(dummy1.user_id !== rankingData.myid){
                    dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score);
                }else{
                    dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score, true);
                }
            }
        }else{
            if(day_length !== 0){
                for(i=0;i<day_length;++i){
                    dummy = GAME.ui_ranking.arr_dailySlots[i];
                    dummy.spr_bg.visible = true;
                    dummy1 = rankingData.day[i];
                    dummy.setSlot(dummy1.rank, dummy1.user_id, dummy1.score);
                }
                idx = day_length;
                if(idx >= GAME.ui_ranking.arr_dailySlots.length) idx = GAME.ui_ranking.arr_dailySlots.length-1;
                GAME.ui_ranking.arr_dailySlots[idx].setSlot(undefined, rankingData.myid, undefined, false, true);//마지막에 자기 슬롯 출력...
            }else{//어떤 기록도 없는 경우
                GAME.ui_ranking.arr_dailySlots[0].setSlot(1);
                GAME.ui_ranking.arr_dailySlots[1].setSlot(undefined, rankingData.myid, undefined, false, true);
            }

        }
    }

    /**
     * test
     * */
    // rankingPopupData = {oldRank:5, newRank:2, oldCuRank:10, newCuRank:8, oldScore:20, newScore:20};
    /**
     * test end
     * */

    if(rankingPopupData !== null && !GAME.ui_ranking.bFlag_showAgain){
        if(rankingPopupData.oldScore !== 0){//oldScore가 0이면 최초 등록...
            if(rankingPopupData.oldRank !== rankingPopupData.newRank){
                GAME.ui_ranking.bShowDailyEffect = true;
            }
        }

        if(rankingPopupData.oldCuScore !== 0){
            if(rankingPopupData.oldCuRank !== rankingPopupData.newCuRank){
                GAME.ui_ranking.bShowTotalEffect = true;
            }
        }

        if(GAME.ui_ranking.bShowDailyEffect||GAME.ui_ranking.bShowTotalEffect)
            GAME.ui_ranking.bFlag_showAgain = true;//false로 초기화는 engine.initGame();에서..
    }

    GAME.ui_ranking.showPop();
};

UI_ranking.prototype.showRankUpEffect = function(_type){
    this.spr_arrow.alpha = 1;
    this.spr_effectShielder.visible = true;
    this.rankUpContainer.visible = true;
    if(_type==="daily"){
        this.bit_oldRank.text = rankingPopupData.oldRank.toString();
        this.bit_newRank.text = rankingPopupData.newRank.toString();
        this.bShowDailyEffect = false;
        if(this.user_rank != 1){
            // console.log("no 1");
            this.arr_dailySlots[0].spr_bg.visible = true;
            // this.rankUpContainer.visible = true;
            SpinePlay(this.spine_rankUp, this.spine_rankUp.position.x, this.spine_rankUp.position.y,"rank_up_eff_in", 0, false);
        }else{
            // console.log("no 2");
            this.arr_dailySlots[0].spr_bg.scale.set(1.2, 1.2);
            setTimeout(function () {
                GAME.ui_ranking.arr_dailySlots[0].spr_bg.visible = true;
                TweenMax.to(GAME.ui_ranking.arr_dailySlots[0].spr_bg, 0.5, {
                    scaleX: 1, scaleY: 1, onComplete: function () {
                        // console.log("no2-1");
                        // GAME.ui_ranking.rankUpContainer.visible = true;
                        SpinePlay(GAME.ui_ranking.spine_rankUp, GAME.ui_ranking.spine_rankUp.position.x, GAME.ui_ranking.spine_rankUp.position.y
                            , "rank_up_eff_in", 0, false);
                    }
                });
            }, 100);
        }
    }else{
        this.bit_oldRank.text = rankingPopupData.oldCuRank.toString();
        this.bit_newRank.text = rankingPopupData.newCuRank.toString();
        this.bShowTotalEffect = false;
        if(this.user_rank != 1){
            // console.log("no 3");
            this.arr_totalSlots[0].spr_bg.visible = true;
            // this.rankUpContainer.visible = true;
            SpinePlay(this.spine_rankUp, this.spine_rankUp.position.x, this.spine_rankUp.position.y,"rank_up_eff_in", 0, false);
        }else {
            // console.log("no 4");
            this.arr_totalSlots[0].spr_bg.scale.set(1.2, 1.2);
            setTimeout(function () {
                GAME.ui_ranking.arr_totalSlots[0].spr_bg.visible = true;
                TweenMax.to(GAME.ui_ranking.arr_totalSlots[0].spr_bg, 0.5, {
                    scaleX: 1, scaleY: 1, onComplete: function () {
                        GAME.ui_ranking.arr_totalSlots[0].spr_bg.visible = true;
                        SpinePlay(GAME.ui_ranking.spine_rankUp, GAME.ui_ranking.spine_rankUp.position.x, GAME.ui_ranking.spine_rankUp.position.y
                            , "rank_up_eff_in", 0, false);
                    }
                });
            }, 100);
        }
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UI_ranking_slot(parentObject, parent, _slotNum){
    this.parentObject = parentObject;
    if(_slotNum>=0){
        this.slotNum = _slotNum;
        this.spr_bg = SpriteSliceLoad(parent, "panel_empty.png", 0, 0, 578, 106, 9, 9, 9, 9);

        this.txt_userRank = FontLoad(this.spr_bg, "userRank", -210, 0
            , {font:"35px "+GAME.fontName[GAME.language], fill:"#626262"});

        this.txt_userName = FontLoad(this.spr_bg, "userName", 0, 0
            , {font:"35px Arial", fill:"#000000", fontWeight:"bold"}, 0.5, 0.5, 300);

        this.txt_userRecord = FontLoad(this.spr_bg, "userRecord", 280, 0
            , {font:"35px "+GAME.fontName[GAME.language], fill:"#626262"}, 1, 0.5, 110);

        this.slice_edge = SpriteSliceLoad(this.spr_bg, "panel_effect_me.png", 0, 0, 606, 134, 20, 20, 20, 20);
        this.slice_edge.visible = false;
    }else{//회원 가입 버튼 만들 경우...
        this.slotNum = _slotNum;
        this.btn_confirm = new GUMA.button(parent, "btn_sign.png", 0, 0);
        this.btn_confirm.setCallback(function(){
            // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_modalMsg["signup"][GAME.language]
            //     , networkManager.JoinMember, null);
            kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
        });
        this.spr_bg = this.btn_confirm.sprite;

        this.slice_edge = SpriteSliceLoad(this.spr_bg, "panel_effect_sign.png", 0, 0, 604, 134, 24, 24, 24, 24);
        this.txt_signUp = FontLoad(this.spr_bg, GAME.table_language["ranking04"][GAME.language], 80, 0
            , {font:"40px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#000000", strokeThickness:5}, 1, 0.5);
    }
}

UI_ranking_slot.constructor = UI_ranking_slot;

UI_ranking_slot.prototype.setSlot = function(rank, name, record, bMe, bEmpty){
    this.spr_bg.visible = true;
    this.slice_edge.visible = false;

    if(bMe === undefined) bMe = false;
    if(bEmpty === undefined) bEmpty = false;

    if(rank!==undefined) {
        switch(rank){
            case 1:
                this.spr_medal.visible = true;
                this.txt_userRank.visible = false;
                break;
            case 2:
                this.spr_medal.texture = this.parentObject.tex_2nd;
                this.spr_medal.visible = true;
                this.txt_userRank.visible = false;
                break;
            case 3:
                this.spr_medal.texture = this.parentObject.tex_3rd;
                this.spr_medal.visible = true;
                this.txt_userRank.visible = false;
                break;
            default:
                //this.spr_medal.visible = false;
                this.txt_userRank.visible = true;
                this.txt_userRank.text = rank.toString();
                break;
        }
    }else{
        this.txt_userRank.text = "***";
    }


    if(name!==undefined) this.txt_userName.text = name;
    else this.txt_userName.text = "No Data";

    fontLimited(this.txt_userName, this.txt_userName.text, 300);

    if(record!==undefined) this.txt_userRecord.text = record.formatMoney(0)+" m";
    else this.txt_userRecord.text = "No Data";

    fontLimited(this.txt_userRecord, this.txt_userRecord.text, 110);

    //edge setting
    if(bMe) this.slice_edge.visible = true;
    else this.slice_edge.visible = false;

    //set Texture
    if(this.slotNum === 0) return;//1등 칸은 텍스쳐 고정

    if(bMe){
        SlicedSpriteChangeTexture_02(this.spr_bg, this.parentObject.tex_me);
        this.slice_edge.visible = true;
    } else if (bEmpty){
        SlicedSpriteChangeTexture_02(this.spr_bg, this.parentObject.tex_empty);
    } else {
        SlicedSpriteChangeTexture_02(this.spr_bg, this.parentObject.tex_other);
    }
};