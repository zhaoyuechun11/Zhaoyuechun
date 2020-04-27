// 지정 아이콘의 언락을 해준다. 별0개면 현재, 별1개이상이면 언락..3개이상이면 락해버린다.
//                                  0~
function setunlockLevelIcon(lvCon, lvNum, starCount) {
    lvCon.bg.texture = SpritePool.getInstance().get(getLockBG(LockIconBG.unlock)).texture;
    //var idxLvBmp = needscore_levels[lvNum + 1].map;
    //var idxLvBmp = needscore_levels[lvNum + 1].id;
    var idxLvBmp = lvNum + 1;
    lvCon.minimap.texture = SpritePool.getInstance().get(getPathMinimap(idxLvBmp)).texture;
    switch (starCount) {
    case 0: //현재 플레이중인 레벨
        lvCon.hex.visible = true;
        lvCon.minimap.visible = true;
        lvCon.star1.visible = false;
        lvCon.star2.visible = false;
        lvCon.star3.visible = false;
        lvCon.lock.visible = false;
        lvCon.num.text = (lvNum + 1).toString();
        lvCon.num.alpha = 1;

        break;
    case 1:
        lvCon.hex.visible = true;
        lvCon.minimap.visible = true;
        lvCon.star1.visible = true;
        lvCon.star2.visible = false;
        lvCon.star3.visible = false;
        lvCon.lock.visible = false;
        lvCon.num.text = (lvNum + 1).toString();
        lvCon.num.alpha = 1;

        break;
    case 2:
        lvCon.hex.visible = true;
        lvCon.minimap.visible = true;
        lvCon.star1.visible = true;
        lvCon.star2.visible = true;
        lvCon.star3.visible = false
        lvCon.lock.visible = false;
        lvCon.num.text = (lvNum + 1).toString();

        lvCon.num.alpha = 1;
            
        break;
    case 3:
        lvCon.hex.visible = true;
        lvCon.minimap.visible = true;
        lvCon.star1.visible = true;
        lvCon.star2.visible = true;
        lvCon.star3.visible = true;
        lvCon.lock.visible = false;
        lvCon.num.text = (lvNum + 1).toString();
        lvCon.num.alpha = 1;

        break;
    default: //비정상이므로 잠김상태로
        lvCon.hex.visible = false;
        lvCon.minimap.visible = false;
        lvCon.star1.visible = false;
        lvCon.star2.visible = false;
        lvCon.star3.visible = false;
        lvCon.lock.visible = true;
        lvCon.num.text = (lvNum + 1).toString();
        lvCon.num.alpha = 0.25;

        break;
    }

}

function createLevelIcon(name1) {
    //컨테이너 만들고 레벨아이콘텍스쳐들을 링크 시킨다, 결과 컨테이너 리턴
    var cont = new PIXI.Container();
    //    {
    //        debug_Obj(cont, InfoPos.on, MovePos.on);
    //        cont.name = name1;
    //    }
    //    //-레벨 아이콘 bg
    var pathBG = getLockBG(LockIconBG.unlock);
    cont.bg = SpriteLoad(cont, pathBG, 0, 0);
    var spnSelectStage = new PIXI.spine.Spine(spnSelectStage_s); //남음버블배경
    cont.bgFx = spnSelectStage;
    cont.addChild(spnSelectStage);
    
    spnSelectStage.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
        case 1:
            SpinePlay(spnSelectStage, null, null, "empty", 0, false, SpnInit.all);
            break;
        }
    };
    
    SpinePlay(spnSelectStage, null, null, "empty", 0, false, SpnInit.none);
    //debug_Sprite(cont.bg, InfoPos.on, MovePos.on);
    
    //    //-레벨 헥사
    var pathHex = getLockHex(LockIconBG.unlock);
    cont.hex = SpriteLoad(cont, pathHex, 0, 3);
    //debug_Sprite(cont.hex, InfoPos.on, MovePos.on);
    
    //-레벨 미니맵
    var pathMinmap = getPathMinimap(0);
    cont.minimap = SpriteLoad(cont, pathMinmap, 0, 0);
    //debug_Sprite(cont.minimap, InfoPos.on, MovePos.on);
    
    //    //-레벨 별1
    var pathStar1 = getLockStar(LockIconBG.unlock);
    cont.star1 = SpriteLoad(cont, pathStar1, -43, 99  );
    //debug_Sprite(cont.star1, InfoPos.on, MovePos.on);
    
    //    //-레벨 별2
    var pathStar2 = getLockStar(LockIconBG.unlock);
    cont.star2 = SpriteLoad(cont, pathStar2, 0, 99 );
    //debug_Sprite(cont.star2, InfoPos.on, MovePos.on);
    
    //    //-레벨 별3
    var pathStar3 = getLockStar(LockIconBG.unlock);
    cont.star3 = SpriteLoad(cont, pathStar3, 43, 99);
    //debug_Sprite(cont.star3, InfoPos.on, MovePos.on);
    
    //    //-레벨 열쇠 아이콘
    var pathLock = getLockLock(LockIconBG.lock);
    cont.lock = SpriteLoad(cont, pathLock, 0, 0);
//    cont.lock.x = 2;
//    cont.lock.y = -2; //cont.lock.alpha=0.5;
    //debug_Sprite(cont.lock, InfoPos.on, MovePos.on);
    
    //    //-레벨 숫자
    var levelname = FontLoad(cont, ".", 94, -100, 1, 0.5, {
        font: '30px ' + fontShow,
        fill: '#ffffff',
        align: "center",
        stroke: '#5e0aad',
        lineJoin:"round",
        strokeThickness: 8
    }, 320);
    cont.num = levelname;
//    levelname.x = -96;
//    levelname.y = -97;
    //debug_Obj(levelname, InfoPos.on, MovePos.on);

    cont.interactive = true;

    function clickGrey(e) //클릭시 색변환 이벤트
    {
        mouseBTN = 1;
        if (!cont.lock.visible) SESoundPlay(se.Click);
        cont.hex.tint = ColorSet.lightgrey;
        cont.star1.tint = ColorSet.lightgrey;
        cont.star2.tint = ColorSet.lightgrey;
        cont.star3.tint = ColorSet.lightgrey;
        cont.lock.tint = ColorSet.lightgrey;
        cont.bg.tint = ColorSet.lightgrey;
        cont.num.tint = ColorSet.lightgrey;
    }

    function clickWhite(e) //클릭시 색변환 이벤트
    {
        mouseBTN = 0;
        cont.hex.tint = ColorSet.white;
        cont.star1.tint = ColorSet.white;
        cont.star2.tint = ColorSet.white;
        cont.star3.tint = ColorSet.white;
        cont.lock.tint = ColorSet.white;
        cont.bg.tint = ColorSet.white;
        cont.num.tint = ColorSet.white;
    }

    function clickTab(e) //클릭레벨클릭선택레벨선택
    {

        if(dm) console.log("cont.num.text:" + cont.num.text);
        //임시데이터변형코드
        var idx = Number(cont.num.text) - 1;
        if (kData.userStarArray[idx] != -1) //언락된 레벨 클릭시
        {
            //                //kData.userStarArray[idx]=randRangeFromInt(1,3); //현재레벨 별클리어
            //                //kData.userStarArray[idx+1]=0;                    //다음레벨 언락
            //                if(idx >= LEVEL_MAX-1) //마지막 레벨 도달
            //                {   
            //                    setSelectPageByNumber(idx);//지정레벨에 맞는 페이지를 업데이트한다.
            //                }
            //                else
            //                {   
            //                    setSelectPageByNumber(idx+1);//지정레벨에 맞는 페이지를 업데이트한다.
            //                }
            kData.curLevel = idx;
            SaveDataInClient();

            //레벨클릭시 조건창 세팅---------------------
            //현재 저장된 별 상태 //조건별텍스쳐교환
            switch (kData.userStarArray[idx]) {
            case 0:
                SpStar3_Condition[0].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_1_empty.png").texture;
                SpStar3_Condition[1].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_2_empty.png").texture;
                SpStar3_Condition[2].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_3_empty.png").texture;
                break;

            case 1:
                SpStar3_Condition[0].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_1.png").texture;
                SpStar3_Condition[1].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_2_empty.png").texture;
                SpStar3_Condition[2].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_3_empty.png").texture;
                break;

            case 2:
                SpStar3_Condition[0].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_1.png").texture;
                SpStar3_Condition[1].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_2.png").texture;
                SpStar3_Condition[2].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_3_empty.png").texture;
                break;

            case 3:
                SpStar3_Condition[0].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_1.png").texture;
                SpStar3_Condition[1].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_2.png").texture;
                SpStar3_Condition[2].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_3.png").texture;
                break;

            default:
                SpStar3_Condition[0].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_1_empty.png").texture;
                SpStar3_Condition[1].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_2_empty.png").texture;
                SpStar3_Condition[2].texture = SpritePool.getInstance().get( strGamePath+"img2/popup_star_3_empty.png").texture;
                break;
            }

//            TxNeed_Condition.text = getMoneyFormatFromNum(
//                needscore_levels[kData.curLevel + 1].need
//            );
            try {
                TxNow_Condition.text = getMoneyFormatFromNum(
                    kData.userScoreArray[kData.curLevel]
                );
            } catch (e) {
                TxNow_Condition.text = -1;
            }

            TxTitle_Condition.text = kData.curLevel + 1;
            //var idxLvBmp = needscore_levels[kData.curLevel + 1].map;
            //var idxLvBmp = needscore_levels[kData.curLevel + 1].id;
            var idxLvBmp = kData.curLevel + 1;
            sprMinmap_condition.texture = SpritePool.getInstance().get(getPathMinimap(idxLvBmp)).texture;

            //레벨선택창에서 클릭시, 하트가 부족하면 광고창 띄우기
            if (kData.iHeart <= 0) {
                //tx_title_ADHEART.text=TX.tx_title_ADHEART;
                //tx_ADHEART.text=TX.tx_ADHEART;
                //tx_ok_ADHEART.text=TX.tx_ok_ADHEART;
                //tx_no_ADHEART.text=TX.tx_no_ADHEART;

                //sHeartShop.onShow();
                //selectPopUpUISingle(Pop.ADHeart); //--> clickOk_ADHeart(e)
            } else //하트가 충분하면 플레이조건창 띄우기
            {
                //tx_needname_condition.text = TX.tx_needname_condition;
                //tx_nowname_condition.text =  TX.tx_nowname_condition;
                //TxStage_Condition.text =     TX.TxStage_Condition;
                //tx_ok_condition.text =       TX.tx_ok_condition;
                //tx_no_condition.text =       TX.tx_no_condition;

                selectPopUpUISingle(Pop.Condition); //-->clickOk_Condition(e)
            }


            //gameState = Game.SET;
        }

    }

    if (InputMode == MOUSE) cont.on('click', clickTab);
    if (InputMode == MOUSE) cont.on('mousedown', clickGrey);
    if (InputMode == MOUSE) cont.on('mouseup', clickWhite);
    if (InputMode == MOUSE) cont.on('mouseupoutside', clickWhite);

    if (InputMode == TOUCH) cont.on('tap', clickTab);
    if (InputMode == TOUCH) cont.on('touchstart', clickGrey);
    if (InputMode == TOUCH) cont.on('touchend', clickWhite);
    if (InputMode == TOUCH) cont.on('touchendoutside', clickWhite);

    return cont;
}

function setlockLevelIcon(lvCon, lvNum) {
    lvCon.bg.texture = SpritePool.getInstance().get(getLockBG(LockIconBG.lock)).texture;
    lvCon.hex.visible = false;
    lvCon.minimap.visible = false;
    lvCon.star1.visible = false;
    lvCon.star2.visible = false;
    lvCon.star3.visible = false;
    lvCon.lock.visible = true;
    lvCon.num.text = (lvNum + 1).toString();
    if(lvCon.lock.visible) lvCon.num.alpha = 0.25;
    else lvCon.num.alpha = 1;
    //lvCon.num.stroke = ColorSet.darkgrey;
}


function setIndicator(thispage) {
    //인디케이터처리 전체
    //if(dm) console.log("PAGE_MAX:"+PAGE_MAX+", iPage:"+iPage+", iPageOld:"+iPageOld);
//    for (var i = 0; i < PAGE_MAX; i++) {
//        if (i == thispage) sprIndicator[i].texture = SpritePool.getInstance().get(IndicPath.on).texture;
//        else sprIndicator[i].texture = SpritePool.getInstance().get(IndicPath.off).texture;
//    }
    
    var pageB=thispage%10;
    for (var i = 0; i < IndiPage; i++) {
        if (i == pageB) sprIndicator[i].texture = SpritePool.getInstance().get(IndicPath.on).texture;
        else sprIndicator[i].texture = SpritePool.getInstance().get(IndicPath.off).texture;
    }
    //    //인디케이터처리
    //    sprIndicator[iPage].texture = SpritePool.getInstance().get("img/Dot_01.png").texture;
    //    if(iPageOld!=-1 && iPage!=iPageOld )sprIndicator[iPageOld].texture = SpritePool.getInstance().get("img/Dot_00.png").texture;
    //    iPageOld=iPage;
    //    //인디케이터처리

}

//레벨9개 아이콘 출력!! 지정레벨에 맞는 페이지를 업데이트한다.
function setSelectPageByNumber(gotolevel) {
    //var curMaxLevel=2; 전역
    var LvPerPg = 9; //페이지당 레벨수

    //0페이지~8페이지 //0레벨~89레벨
    var gotopage = Math.floor(gotolevel / LvPerPg); //페이지 상의 시작 레벨
    curPage = gotopage;

    setIndicator(gotopage); //

    //kData.userStarArray[0]=1;
    //kData.userStarArray[1]=1;

    //TxPageSelectLevel

    var debug_lv9 = "kData.userStarArray[~9]: ";
    if(kData.userStarArray==undefined || kData.userStarArray==null)  InitData(); //레벨선택창에서 에러시
    for (var i = 0; i < LvPerPg; i++) {
        var lvicon = arr9Level[i];
        var lvNum = (gotopage * LvPerPg) + i;

        //레벨1 저장 데이터 가져오기---------
        kData.userStarArray[lvNum];
        var savelv1 = kData.userStarArray[lvNum];
        debug_lv9 += "[" + lvNum + "]:" + kData.userStarArray[lvNum] + ",";
        //레벨1 저장 데이터 가져오기---------


        if (savelv1 > StarCount.zero) //깻던 레벨
        {
            setunlockLevelIcon(lvicon, lvNum, savelv1);
        } else if (savelv1 == StarCount.zero) //진행중인 레벨(못깬)
        {
            setunlockLevelIcon(lvicon, lvNum, StarCount.zero);
        } else //안열린 레벨
        {
            setlockLevelIcon(lvicon, lvNum);
        }
    }
    //if(dm) console.log(debug_lv9);
}

function clickLeftPage(e) {
    var LvPerPg = 9;
    //curPage = curPage - 1 < 0 ? 0 : curPage - 1; //첫페이지시 앞으로 막기
    curPage = curPage - 1 < 0 ? PAGE_MAX - 1 : curPage - 1;  //첫페이지시 마지막페이지로
    if(dm) console.log("clickLeftPage, curPlayLevel:" + curPlayLevel + ", curPage:" + curPage + ", gotolv:" + curPage * LvPerPg);
    TxPageSelectLevel.text= (curPage+1)+"/"+PAGE_MAX;
    setSelectPageByNumber(curPage * LvPerPg);
    // TweenMax.delayedCall(
    //     0.5, //tilem
    //     twinkleStage
    // );
}

function clickRightPage(e) {
    var LvPerPg = 9;
    //curPage = curPage + 1 >= PAGE_MAX ? PAGE_MAX - 1 : curPage + 1; //최대페이지시 뒤로 막기
    curPage = curPage + 1 >= PAGE_MAX ? 0 : curPage + 1;              //최대페이지시 첫페이지로
    if(dm) console.log("clickRightPage, curPlayLevel:" + curPlayLevel + ", curPage:" + curPage + ", gotolv:" + curPage * LvPerPg);
    TxPageSelectLevel.text= (curPage+1)+"/"+PAGE_MAX;
    setSelectPageByNumber(curPage * LvPerPg);
    
    // TweenMax.delayedCall(
    //     0.5, //tilem
    //     twinkleStage
    // );
}
function twinkleStage(){
    randStageSelect = Math.floor(generateRandomNumber(0, 10));//
    if(randStageSelect<9){
        if(arr9Level[randStageSelect].hex.visible==true){
            SpinePlay(arr9Level[randStageSelect].bgFx, null, null, "stage_slot_ani", 1, false, SpnInit.all);
        }
    }
}

function soundBGMOnOff() {
    //음악 온오프
    if (kData.bSoundBGM)
    //BGMSoundPlay(0,true);
        BGMSoundResume();
    else
        BGMSoundPause();
}

function clickBgmOffMarkinSel(e) //선택창에서 음악온오프
{
    //클릭버튼 활성,비활성
    kData.bSoundBGM = kData.bSoundBGM ? false : true;
    bgmOffMarkinSel.visible = kData.bSoundBGM ? false : true;
    //음악 온오프
    soundBGMOnOff();
    SaveDataInClient();
    if(dm) console.log("clickBgmOffMarkinSel");
}

function clickSfxOffMarkinSel(e) //선택창에서 효과음온오프
{
    kData.bSoundSE = kData.bSoundSE ? false : true;
    sfxOffMarkinSel.visible = kData.bSoundSE ? false : true;
    if(dm) console.log("clickSfxOffMarkinSel");
}

function clickPauseInMainUI(e) {
    if(dm) console.log("click pause");
    //sGame.addChild(sGameUIGameOver);
    //tx_title_setting.text =  TX.tx_title_setting;
    //tx_ok_setting.text =  TX.tx_ok_setting;
        
    if (kData.bSoundBGM) SpXBGM_Setting.visible = false;
    else SpXBGM_Setting.visible = true;
    
    if (kData.bSoundSE) SpXSFX_Setting.visible = false;
    else SpXSFX_Setting.visible = true;
    
    selectPopUpUISingle(Pop.Setting);
}

function clickLeftMov(e)
{
    if (BSstate_ == BSstates.ready && !rotMode && BtnL.active) {//rotmode에서 interactive onoff하는중
            //--배경회전처리
            if (player.busterpre)
                SpinePlay(mainPlayer, null, null, AniShip.l_buster, 6, true);
            else 
                SpinePlay(mainPlayer, null, null, AniShip.l, 1, true);

            switch (space) {
            case ABCD.a:
                SpinePlay(sGameBG, null, null, AniSpace.A2B, 2, false, SPINE_INIT_NONE);
                space = ABCD.b;
                break;
            case ABCD.b:
                SpinePlay(sGameBG, null, null, AniSpace.B2A, 1, false, SPINE_INIT_NONE);
                space = ABCD.a;
                break;
            }
            mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);//left

            if(dm) {
                var rVal = space == ABCD.a ? "ABCD.a" : "ABCD.b";
                if(dm) console.log(rVal);
            }

            //rotateLevel(Rot.Left);
            //rotateAniLevel(Rot.Left);

            //맵회전애니을위한 세팅
            rotCurTime = 0;
            rotMax = 60;
            rotMode = true;

            //방어막 회전 세팅
            bShieldRot = true;
            shieldst=ShieldSt.begin; //-->stateShield(dt)
            dirSD = DirSD.rclock;
            desttimeSD = 0.5;

            //이동사운드
            SESoundPlay(se.Move);

            if(deadLine.active){
                SpinePlay(deadLine, null, null, laser.end, 0, false, SPINE_INIT_NONE);
                deadLine.active = false;
//                SEDangerReset();
                if(DangerMode==Dmode.run) {
                    DangerMode = Dmode.end;
                    SEDangerPause();
                }//끄기모드 진입
            }
            if(kData.tutorialpoint==1){


                if(dm) console.log("~ ~ kData.tutorialpoint=2");
                tut1state = TutState.end;
//                TweenMax.delayedCall( 1.25, function () {
//                    tut1state = TutState.end;
//                    //kData.tutorialpoint=2;
//                    //tutshootcount=2; 
//                    //nextcount=2; //tweenTutShow에서 tutshootcount=nextcount
//                    //kData.tutorialpoint = 1;
//                    //sGameMainUI.tut.left.interactive=true;
//                });                  
            }
      
            //if( player.bustertime < busterTimeMax) mainBuster.visible = false;//이젠이동시소모안하므로
    }
    if(dm) console.log("click move left");


}

function clickRightMov(e)
{
    if (BSstate_ == BSstates.ready && !rotMode && BtnR.active) {
        

        //if (player.bustertime <= 0) return;
        //deltaBuster = player.buster ? 0 : -0.1;
        //guiset_addFuelBar();

        if (player.busterpre) SpinePlay(mainPlayer, null, null, AniShip.r_buster, 6, true);
        else SpinePlay(mainPlayer, null, null, AniShip.r, 1, true);
        switch (space) {
        case ABCD.a:
            SpinePlay(sGameBG, null, null, AniSpace.A2C, 2, false, SPINE_INIT_NONE);
            space = ABCD.b;
            break;
        case ABCD.b:
            SpinePlay(sGameBG, null, null, AniSpace.C2A, 1, false, SPINE_INIT_NONE);
            space = ABCD.a;
            break;
        }

        mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);//right

        var rVal = space == ABCD.a ? "ABCD.a" : "ABCD.b";
        if(dm) console.log(rVal);
        //rotateLevel(Rot.Right);
        //rotateAniLevel(Rot.Right);

        //맵회전애니을위한 세팅
        rotCurTime = 0;
        rotMax = -60;
        rotMode = true;

        //방어막 회전 세팅
        bShieldRot = true;
        shieldst=ShieldSt.begin; //-->stateShield(dt)        
        dirSD = DirSD.clock;
        desttimeSD = 0.5;

        //이동사운드
        SESoundPlay(se.Move);

        if(deadLine.active){
            SpinePlay(deadLine, null, null, laser.end, 0, false, SPINE_INIT_NONE);
            deadLine.active = false;
//            SEDangerReset();
            if(DangerMode==Dmode.run) {
                DangerMode = Dmode.end;
                SEDangerPause();
            }//끄기모드 진입
        }

        //if( player.bustertime < busterTimeMax) mainBuster.visible = false;//이젠이동시 소모안하므로
    }
    if(dm) console.log("click move right");
}

function clickReplay_Clear(e) {
    if(sHeartShop.onTweeing) return;
    if(EnableClick) {
        EnableClick = false;

        if(kData.iHeart<=0){
            sHeartShop.onShow();
        }else {
            //kData.iHeart -= 1;
            //heartController.UseHeart(1,function(){});
            zerocondition = false;
            if(dm) console.log("kData.iHeart-=1");

            //하트트윈처리 clear replay
            sHeartTw.onSetMode(HeartMode.clearretry);
            HeartDestFn[HeartMode.clearretry] = clickReplay_Clear_after;
            sHeartTw.onBegin(); //replayclear
            //하트트윈처리
        }
        setTimeout(function () {
            EnableClick = true;
        }, 1000);
    }
}
function clickReplay_Clear_after(){
    SaveDataInClient();
    //networkManager.ForcedSaveData();//서버에 저장

    gameState = Game.SET;

    TweenMax.delayedCall( 0.05, function () { //});
    selectPopUpUI(Pop.MainUI);
    });

    if(dm) console.log("clickReplay_Clear");

    // if(kData.userHeartCount<0)kData.userHeartCount=0;
    // sHeartShop.timer.onSetTimer(kData.userHeartCount);
    sHeartShop.timer.onHide();
}

function clickOk_Clear(e) {
    if(sHeartShop.onTweeing) return;

    SaveDataInClient();
    networkManager.ForcedSaveData();//서버에 저장

    kData.curLevel += 1;
    bSelectModeOnce = false;
    gameState = Game.SELECT;
    if(dm) console.log("clickOk_Clear");

    // if(kData.userHeartCount<0)kData.userHeartCount=0;
    // sHeartShop.timer.onSetTimer(kData.userHeartCount);

    sHeartShop.timer.onHide();
}

function clickNext_Clear(e) {
    if(sHeartShop.onTweeing) return;
    if(EnableClick) {
        EnableClick = false;

        SaveDataInClient();
        //networkManager.ForcedSaveData();//서버에 저장

        if (kData.iHeart <= 0) {
            sHeartShop.onShow();
        } else {
            //kData.iHeart -= 1;
            //heartController.UseHeart(1, function () {});
            if (kData.iHeart < 0) kData.iHeart = 0;
            sHeartShop.timer.onSetTimer(kData.iHeart);

            //하트트윈처리 clear next
            sHeartTw.onSetMode(HeartMode.clearnext);
            HeartDestFn[HeartMode.clearnext] = clickNext_Clear_after;
            sHeartTw.onBegin(); //next
            //하트트윈처리
        }
        setTimeout(function () {
            EnableClick = true;
        }, 1000);
    }

}
function clickNext_Clear_after() {
    var nextlevel = kData.curLevel + 1;
    if(nextlevel>LEVEL_MAX-1){
        bSelectModeOnce = false;
        gameState = Game.SELECT;
        if(dm) console.log("clickOk_Clear");
        return;
    }
    if(dm) console.log("~ ~ kData.curLevel+1:"+(kData.curLevel)
        +", nextLevel+1:"+(kData.curLevel+1)
    );

    kData.curLevel += 1;
    gameState = Game.SET;

    //selectPopUpUI(Pop.MainUI);
    TweenMax.delayedCall( 0.05, function () { //});
    deselectPopUpUISingle(Pop.Clear);
    });

    if(kData.userStarArray[nextlevel]==0)zerocondition=true;
    else zerocondition=false;
    if(dm) console.log("clickNext_Clear"+", zerocondition:"+zerocondition);



    sHeartShop.timer.onHide();
}



function clickBGM_Setting(e) {
    //버튼 활성,비활성
    kData.bSoundBGM = kData.bSoundBGM ? false : true;
    SpXBGM_Setting.visible = kData.bSoundBGM ? false : true;
    //음악 온오프
    soundBGMOnOff();
    SaveDataInClient();
    if(dm) console.log("clickBGM_Setting");
}

function clickSFX_Setting(e) {
    kData.bSoundSE = kData.bSoundSE ? false : true;
    SpXSFX_Setting.visible = kData.bSoundSE ? false : true;
    if(dm) console.log("clickSFX_Setting");
    if(!kData.bSoundSE) SEDangerPause();
}

function clickSelect_Setting(e) {
    //txMinus.text = TX.txMinus;
    //tx_title_Exit.text = TX.tx_title_Exit;
    //tx_Giveup.text = TX.tx_Giveup;
    //tx_ok_Exit.text = TX.tx_ok_Exit;
    //tx_no_Exit.text = TX.tx_no_Exit;
    
    deselectPopUpUISingle(Pop.Setting);
    selectPopUpUISingle(Pop.Exit);
}

function clickOk_Setting(e) {
    deselectPopUpUISingle(Pop.Setting);
    if(dm) console.log("clickOk_Setting");
    sHeartShop.timer.onHide();
}
var zerocondition = false;
function clickOk_Condition(e) //조건창에서 게임모드 진입 //need //now
{
    if(sHeartShop.onTweeing) return;
    if(EnableClick) {
        EnableClick = false;
        if (kData.iHeart <= 0) {
            sHeartShop.onShow();
        } else {
            //kData.iHeart -= 1;
            //heartController.UseHeart(1, function () {
            //});
            if (dm) console.log("kData.iHeart-=1");
            if (kData.iHeart < 0) kData.iHeart = 0;
            //sHeartShop.timer.onSetTimer(kData.iHeart);

            //하트트윈처리 condition
            sHeartTw.onSetMode(HeartMode.start);
            HeartDestFn[HeartMode.start] = clickOk_Condition_after;
            sHeartTw.onBegin();//condition
            //하트트윈처리
        }
        setTimeout(function () {
            EnableClick = true;
        }, 1000);
    }
}
function clickOk_Condition_after(){
    if(kData.userStarArray[curPlayLevel]==0)zerocondition=true;
    else zerocondition=false;
    if(dm) console.log("zerocondition:"+zerocondition);

    if(dm) console.log("clickOk_Condition");

    gameState = Game.SET;
    TweenMax.delayedCall( 0.05, function () { //});
        selectPopUpUI(Pop.MainUI);
    });
    sHeartShop.timer.onHide();
}

function clickNo_Condition(e) //조건창 닫고, 다시 복귀
{
    if(sHeartShop.onTweeing) return;
    if(EnableClick) {
        EnableClick = false;
        deselectPopUpUISingle(Pop.Condition);
        if (dm) console.log("clickNo_Condition");
        setTimeout(function () {
            EnableClick = true;
        }, 1000);
    }
}

function clickOk_Exit(e) {
    SEDangerPause();
    bSelectModeOnce = false;
    //kData.userHeartCount -= 1; //exit창에서 ok눌렀을때
    gameState = Game.SELECT;
    if(dm) console.log("clickOk_Exit");
}

function clickNo_Exit(e) //나가기 닫고, 다시 복귀
{
    deselectPopUpUISingle(Pop.Exit);
    if(dm) console.log("clickNo_Exit");
}
function tweenTextBall(){ //총알을 먹엇을때와 피날레이벤트시
    TweenMax.fromTo(tx_remainBall_tween,
                    0.5,
                    {
                        score:str2int(tx_remainBall.text)
                    }, 
                    {
                        score:player.ballcount,
                        ease:Linear.easeNone,
                        onUpdate: function(){
                            tx_remainBall.text = Math.floor(tx_remainBall_tween.score);
                        },
                        onComplete: function(){
                            tx_remainBall.text = player.ballcount;
                        },        
                        delay: 0
                    }
    ); 
}
var temp_bullet0state=false;
function clickOk_ADBall(e) //수락//충전운석충전버블충전공충전
{
    if(sHeartShop.delaybtn==false) {
        sHeartShop.delaybtn=true;
        TweenMax.delayedCall(1,function(){sHeartShop.delaybtn=false;});
    }else {
        return;
    }
    console.log("clickOk_ADBall");
    if(kData.iHeart<=0){
        sHeartShop.onShow();
    }else {
        //kData.iHeart-=1;
        heartController.UseHeart(1,function(){});
        if(dm) console.log("kData.iHeart-=1");
        if(kData.iHeart<0)kData.iHeart=0;
        sHeartShop.timer.onSetCount(kData.iHeart);

        //하트트윈처리 ad ball
        sHeartTw.onSetMode(HeartMode.retry);
        HeartDestFn[HeartMode.retry] = clickOk_ADBall_after;
        sHeartTw.onBegin();//adball
        //하트트윈처리
    }
    if(dm) console.log("clickOk_ADBall");

}
function clickOk_ADBall_after(){

    player.buster = false;
    player.busterpre = false;

    player.ballcount += 15;
    player.retrycount += 1;
    tweenTextBall();
    //tx_remainBall.text = player.ballcount;
    nextBubble();

    busterAfterAD = true;//ad를 본것을 저장
    delaycountStoneCreation = true;//3; //운석생성무한딜레이 끄기

    //운석생성딜레이주기
    turnsnapcounter = 0;
    combocount = 1;


    setBSstate_(BSstates.ready); //충전운석광고클릭시, 처음상태으로
    gameState = Game.PLAY;

    //운석발생횟수초기화

    sHeartShop.timer.onHide();
    deselectPopUpUISingle(Pop.ADBall);

}

function clickNo_ADBall(e) //거절//충전운석충전버블충전공충전
{
    //player.retrycount += 1;
    deselectPopUpUISingle(Pop.ADBall);

    gameState = Game.STOP;
    //tx_ok_gameover.text=TX.tx_ok_gameover;

    selectPopUpUISingle(Pop.GameOver); //게임오버창
    SESoundPlay(se.Defeat);
    
    //버스터모드끄기
    player.buster = false;
    player.busterpre = false;                
    cancelBusterSpine(); //하단통과시 버스터모드 중지
    resetBuster(); //0값으로 초기화
    sHeartShop.timer.onHide();
}


function clickOk_ADHeart(e) { //하트0시 호출
    if(EnableClick) {
        EnableClick=false;
        // kData.userHeartCount += 5;
        // sHeartShop.timer.onSetCount(kData.userHeartCount);//TxtHeartSelectLevel.text = kData.userHeartCount;
        //
        // if (kData.userHeartCount > 0) {
        //     selectPopUpUINone_SelectMode(); //현재 켜진 다이얼로그를 닫기
        // }
        // if(dm) console.log("clickOk_ADHeart");
        // //TweenMax.delayedCall( 0.75, function () {EnableClick=true;});
        // setTimeout( function(){EnableClick=true;}, 750 );

        selectPopUpUINone_SelectMode();//현재 켜진 다이얼로그를 닫기
        sHeartShop.onShow();
        setTimeout( function(){EnableClick=true;}, 100 );
    }
}
function clickHeartinSel(e){
    if(dm) console.log("clickHeartinSel를 호출해서는 안돼는데 호출함!!!");
    // tx_title_ADHEART.text=TX.tx_title_ADHEART;
    // tx_ADHEART.text=TX.tx_ADHEART;
    // tx_ok_ADHEART.text=TX.tx_ok_ADHEART;
    // tx_no_ADHEART.text=TX.tx_no_ADHEART;
    // selectPopUpUISingle(Pop.ADHeart);
}

function clickNo_ADHeart(e) {
    selectPopUpUINone_SelectMode();
    if(dm) console.log("clickNo_ADHeart");
}

function clickOk_GameOver(e) {
    bSelectModeOnce = false;
    gameState = Game.SELECT;
    if(dm) console.log("clickOk_GameOver");

    //경고음 사운드 소리 끄기
    SEDangerPause();
    DangerMode = Dmode.idle;

    /////////
    heartController.UseHeart(1,function(){});

    if (kData.iHeart <= 0){
        // ---------------- 这里是结束的地方 ---------------- //
        //getTotalStar();
        //kData.curLevel
        if ( window.parent != null ) {
            window.parent.postMessage({
              cmd: "GameOver",
              msg: {
                score: 0, // 如果是星星数，也是这个分数
                level: kData.curLevel
              }
            }, "*");
          }
    }
}
//function finish_Game()
//{
//    cancelBuster();
//    
//}
function getTotalStar() {
    //별저장파일 변환 컨버젼 컨버팅
    var ret = 0;
    //유저레벨갯수과 새래벨갯수 비교
    if(kData.userStarArray.length==LEVEL_MAX)
        console.log("equal!! kData.userStarArray.length:"+kData.userStarArray.length);
    else{
        //갯수가 다르면
        console.log("diff!! kData.userStarArray.length:"+kData.userStarArray.length);
        //새갯수 만큼 초기화 배열 생성(초기화 0레벨만 오픈상태로)
        var _userStarArray = new Array(LEVEL_MAX);
        for (var i = 0; i<LEVEL_MAX; ++i) { _userStarArray[i] = -1; }
        _userStarArray[0] = 0;

        //유저레벨(kData)-->_userStarArray로 복사한다.
        var star0index=-1; //현재하고 잇는레벨 인덱스저장용
        for (var i = 0; i<kData.userStarArray.length; ++i) {
            if(kData.userStarArray[i]==0) star0index=i;   //현재하고 잇는 레벨 저장
            _userStarArray[i] = kData.userStarArray[i];//유저별 복사
        }
        if(star0index==-1) _userStarArray[kData.userStarArray.length] == 0; //확장된 레벨 한개를 오픈해준다.

        kData.userStarArray = _userStarArray;
    }
    //별저장파일 변환 컨버젼 컨버팅

    for (var i = 0; i < LEVEL_MAX; i++) {
        var star3 = kData.userStarArray[i];
        if (star3 != -1) ret += star3;
    }
    return ret;
}

function getPathMiniStar(OnOff) {
    //return OnOff ? "img2/select_level.png" : "img2/select_level.png"
    return OnOff ?  strGamePath+"img2/select_level.png" :  strGamePath+"img/White1x1Alpha1.png"
}
var dragSkip = false; //버튼클릭시 취소해주려고
function dragScreen(e) {
    if (gameState != Game.PLAY) return;
//    if (mouseBTN == 1) dragSkip = true;
    //1 번 비정상,
    //2번 정상
//    TcState =
//    start:0,
//    move:1,
//    end:2

    if (touchstate == TcState.end) {
        if(dm) console.log("TcState.start");
        touchstate = TcState.start;
    }
    if (touchstate == TcState.start) {
        if(dm) console.log("TcState.move");
        touchstate = TcState.move;
    }
    

    var pos = e.data.getLocalPosition(this.parent);
    //if(dm) console.log("drag: "+ pos.x+", "+pos.y);

    // Get the mouse position
    //   (0,0)+----------------+
    //        |                |
    //        |                |
    //        |      +(294,565)|
    //        +----------------+(625,625)
    //var pos = getMousePos(canvas, e);

    // Get the mouse angle
    var mouseangle = radToDeg(Math.atan2((player.y + level.tileheight / 2) - pos.y, pos.x - (player.x + level.tilewidth / 2)));
    //        radToDeg: 결과
    //              (90)
    //          179  |    
    //      (-180)--중심--(0) Math.floor(mouseangle)시
    //          -179 |
    //             (-90)

    //마이너스 보간 // Convert range to 0, 360 degrees
    if (mouseangle < 0) {
        mouseangle = 180 + (180 + mouseangle);
    }
    //        mouseangle: 1차 변환 결과
    //               (90)
    //                 |    
    //         (180)--중심--(0) Math.floor(mouseangle)시
    //                 |
    //               (270)
    //        if(dm) console.log("convert Angle: "+ mouseangle);                                 //0 ~ 360

    //최대,최소 크롭 // Restrict angle to 8, 172 degrees
    var lbound = 8;
    var ubound = 172;
    if (mouseangle > 90 && mouseangle < 270) {
        // Left
        if (mouseangle > ubound) {
            mouseangle = ubound;
        }
    } else {
        // Right
        if (mouseangle < lbound || mouseangle >= 270) {
            mouseangle = lbound;
        }
    }
    //        mouseangle: 2차 변환 결과
    //               (90)
    //                 |    
    //         (172)--중심--(2)
    //        if(dm) console.log("player.anngle: "+ mouseangle);
    // Set the player angle
    
    if(kData.tutorialpoint==100){           //일반모드 마우스제어
//        if(dm) console.log("~ ~ dragScreen:"+2);
        player.angle = mouseangle; //crop min:8, max:172    

    }else{
        //튜터각도                                    //튜터마우스제어
        if(kData.tutorialpoint==0&&(kData.curLevel+1)==1)  //쓰리쿠션방지
        {
            if(dm) console.log("~ ~ sGameMainUI.tut.visible:"+sGameMainUI.tut.visible);
            if(dm) console.log("~ ~ sGameMainUI.tutbg.visible:"+sGameMainUI.tutbg.visible);
            if(dm) console.log("~ ~ dragScreen:a");
            if (mouseangle < 70) mouseangle = 70;
            if (mouseangle > 110) mouseangle = 110;
            player.angle = mouseangle;
        }else if(kData.tutorialpoint==1&&(kData.curLevel+1)==1){//왼쪽회전,클릭방지 in dragScreen
            if(dm) console.log("~ ~ dragScreen:b");
            player.angle = mouseangle;
        }else if(kData.tutorialpoint==2&&(kData.curLevel+1)==1){//별2개 in dragScreen
            if (mouseangle < 92) mouseangle = 92;
            if (mouseangle > 97) mouseangle = 97;            
            player.angle = mouseangle;
            if(dm) console.log("~ ~ dragScreen:c");
        }else if(kData.tutorialpoint==3&&(kData.curLevel+1)==1){//코어 in dragScreen
            if (mouseangle < 87) mouseangle = 87;
            if (mouseangle > 97) mouseangle = 97;
            player.angle = mouseangle;
            if(dm) console.log("~ ~ dragScreen:d");
        }else if(kData.tutorialpoint==4&&(kData.curLevel+1)==2){ //버스터모드시작 in dragScreen
            //if (mouseangle < 60) mouseangle = 60;
            //if (mouseangle > 120) mouseangle = 120;
            player.angle = mouseangle;
            if(dm) console.log("~ ~ dragScreen:f");
        }else if(kData.tutorialpoint==5&&(kData.curLevel+1)==2){ //버스터별 in dragScreen
            if (mouseangle < 88) mouseangle = 88;
            if (mouseangle > 94) mouseangle = 94;
            player.angle = mouseangle;
            if(dm) console.log("~ ~ dragScreen:g");
        }else if(kData.tutorialpoint==6&&(kData.curLevel+1)==2){ //코어클리어2 in dragScreen
            if (mouseangle < 84) mouseangle = 84;
            if (mouseangle > 97) mouseangle = 97;
            player.angle = mouseangle;
            if(dm) console.log("~ ~ dragScreen:h");
        }else{                            //
            player.angle = mouseangle; 
            if(dm) console.log("~ ~ dragScreen:i");
        }
        
        
    }// 튜터리얼모드 각도 제어
    
    if(pos.y>mainPlayer.y+20){
        for (var n = 0; n < navCount; n++) {
            sprNav[n].alpha = 0;
        }
    }

    
    //if(dm) console.log("player.anngle: "+ mouseangle);
} //dragScreen(e)
var tutshootcount=0;
var nextcount=0;
function clickScreen(e) {
    deltaBuster=0;//초기화
    // console.log( "click, busterpre:"+player.busterpre
    //     +", buster:"+player.buster
    //     +", bustertime:"+player.bustertime);
    if(dm) console.log("clickScreen");
    if (gameState != Game.PLAY) return;
    if(dm) console.log("clickScreen1");
//    if (dragSkip) {
//        dragSkip = false; //여기서 가끔 막히므로 뚫어줌
//        return;
//    } 
    if(dm) console.log("clickScreen2");
    if (touchstate == TcState.move || touchstate == TcState.start) {
        if(dm) console.log("TcState.move->TcState.end");
        touchstate = TcState.end;
    }
    if(dm) console.log("clickScreen3");
    var pos = e.data.getLocalPosition(this.parent);
    // Get the mouse position`
    //var pos = getMousePos(canvas, e);
    if(dm) console.log("clickScreen: " + pos.x + ", " + pos.y);
    if (BSstate_ == BSstates.ready && !rotMode && BtnR.active) {
        if(dm) console.log("--player.angle:" + player.angle + "--------------------------");
        SESoundPlay(se.RockShoot); //운석발사음
        if(kData.tutorialpoint==100||kData.tutorialpoint == undefined||kData.tutorialpoint>6 ){//설명창만 나오는 튜터리얼, 일반게임모드
            if(kData.tutorialpoint==7&&(kData.curLevel+1)==10){//연료에너지등장 10lv, tutpt = 7
                TweenMax.delayedCall( 1.25, function () {tut1state = TutState.end;});
            }else if(kData.tutorialpoint==8&&(kData.curLevel+1)==19){//실드보호막등장 19lv, tutpt = 8
                TweenMax.delayedCall( 1.25, function () {tut1state = TutState.end;});
            }else if(kData.tutorialpoint==9&&(kData.curLevel+1)==20){//운석등장 20lv, tutpt = 9
                TweenMax.delayedCall( 1.25, function () {tut1state = TutState.end;});
            }else if(kData.tutorialpoint==10&&(kData.curLevel+1)==23){//추가볼아이템등장 23lv, tutpt = 10
                TweenMax.delayedCall( 1.25, function () {tut1state = TutState.end;});
            }
            if(dm) console.log("~ ~ clickScreen() kData.tutorialpoint==??");
            shootBubble();
            timerIdle = 0; //idle시간 체크용도
        }else{
            //튜터리얼 첫 시작
            //튜터클릭
            if(kData.tutorialpoint==0&&(kData.curLevel+1)==1&&tutshootcount==0&&nextcount==0){ //in clickScreen
                if(dm) console.log("~ ~ clickScreen() a");
                shootBubble();
                timerIdle = 0; //idle시간 체크용도
                nextcount=1;//바로 바꾸어, 루프 못 들어오게
                TweenMax.delayedCall( 1.25, function () {
                    tut1state = TutState.end;
                    //tutshootcount=2; 
                     //tweenTutShow에서 tutshootcount=nextcount
                    //kData.tutorialpoint = 1;
                    //sGameMainUI.tut.left.interactive=true;
                });
            }else if(kData.tutorialpoint==1&&(kData.curLevel+1)==1&&tutshootcount==1&&nextcount==1){ //in clickScreen
                //클릭(발사)방지
                if(dm) console.log("~ ~ clickScreen() b");
            }else if(kData.tutorialpoint==2&&(kData.curLevel+1)==1&&tutshootcount==2&&nextcount>=2){//별2개//&&nextcount==2){//별2개  //in clickScreen
                shootBubble();
                timerIdle = 0; //idle시간 체크용도
                nextcount=3;//바로 바꾸어, 루프 못 들어오게
                TweenMax.delayedCall( 1.25, function () {
                    tut1state = TutState.end;
                    //nextcount=3;
                    //kData.tutorialpoint =3;
                });
                //tutshootcount=3;
                
                if(dm) console.log("~ ~ clickScreen() c");
            }else if(kData.tutorialpoint==3&&(kData.curLevel+1)==1&&tutshootcount==3&&nextcount>=3){//코어클리어 // &&nextcount==3){//코어클리어  //in clickScreen
                shootBubble();
                timerIdle = 0; //idle시간 체크용도
                //nextcount=1;//바로 바꾸어, 루프 못 들어오게
                TweenMax.delayedCall( 1.25, function () {
                    if(dm) console.log("kData.tutorialpoint=4로 변환");
                    tut1state = TutState.end;
                    //nextcount=0;
                   });
                zerocondition = true;
                // kData.userHeartCount+=1; //tut lv1
                // sHeartShop.timer.onSetCount(kData.userHeartCount);
                SaveDataInClient();//1레벨 튜터 저장
                //tutshootcount=0;
                if(dm) console.log("~ ~ clickScreen() d");
            }else if(kData.tutorialpoint==4&&(kData.curLevel+1)==2&&nextcount==0){//버스터모드시작 //&&tutshootcount==0  //in clickScreen
                if(tut1state === TutState.run1) {//문제지점 //레벨2에서 런모드
                    shootBubble();
                    timerIdle = 0; //idle시간 체크용도
                    nextcount = 1;//바로 바꾸어, 루프 못 들어오게
                    tut1state = TutState.run2;//문제지점 //run2로 변경
                    TweenMax.delayedCall(1.25, function () {
                        tut1state = TutState.end;
                        //nextcount=1;
                        //kData.tutorialpoint=5;
                    });
                    //tutshootcount=1;

                    if (dm) console.log("~ ~ clickScreen() e");
                }
                
            }else if(kData.tutorialpoint==5&&(kData.curLevel+1)==2&&tutshootcount==1&&nextcount>=1){//버스터모드별2개  //in clickScreen
                if(tut1state === TutState.run1) {//문제지점 //레벨2에서 런모드
                    shootBubble();
                    timerIdle = 0; //idle시간 체크용도
                    nextcount = 2;//바로 바꾸어, 루프 못 들어오게
                    tut1state = TutState.run2;//문제지점 //run2로 변경
                    TweenMax.delayedCall(1.25, function () {
                        tut1state = TutState.end;
                        //nextcount=2;
                        //kData.tutorialpoint=6;//딜레이콜로 왔음
                    });
                    //tutshootcount=2;

                    if (dm) console.log("~ ~ clickScreen() f");
                }
            }else if(kData.tutorialpoint==6&&(kData.curLevel+1)==2&&tutshootcount==2&&nextcount>=2){//코어클리어2  //in clickScreen //문제지점
                if(tut1state === TutState.run1) {//문제지점 //레벨2에서 런모드
                    shootBubble();
                    timerIdle = 0; //idle시간 체크용도
                    tut1state = TutState.run2;//문제지점 //run2로 변경
                    TweenMax.delayedCall(1.25, function () {
                        tut1state = TutState.end;
                        nextcount = 0;
//                    kData.tutorialpoint=7;
//                    SaveData();//2레벨 튜터 저장
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;
                    });
                    if (dm) console.log("~ ~ clickScreen() g");
                    zerocondition = true;
                    // kData.userHeartCount+=1; //tut lv2
                    // sHeartShop.timer.onSetCount(kData.userHeartCount);
                    SaveDataInClient();//1레벨 튜터 저장
                }
            }else{
                //튜터리얼진행중에 여기서는, 발사 못하게 해야하므로,
                //튜터리얼 완료일때만 진행
                if(dm) console.log("~ ~ click except: A  -->"
                            +" ,kdata:"+kData.tutorialpoint
                            +", tutshootcount:"+tutshootcount
                            +", nextcount:"+nextcount
                               );
                
                if((kData.curLevel+1)==1&&kData.tutorialpoint>3){
                    shootBubble();
                    timerIdle = 0; //idle시간 체크용도
                }
            }

        }

    } else if (BSstate_ == BSstates.gameover) {
        newGame();
    }

}

function clickBuster(e) //버스터클릭버스터
{
//    if (BSstate_ == BSstates.ready) {
//        if(dm) console.log("--click spine:" + this.name);
//        SpinePlay(mainPlayer, null, null, AniShip.bust, 0, true);
//        mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);//buster
//        //if (SpArrow.visible == false) SpArrow.visible = true;
      
//        //SpinePlay(mainPlayer, null, null, AniShip.aim, 0, true);
//        mainBuster.visible = false;
//        player.buster = true;
//        SpinePlayerBubble.visible = true;
//        SESoundPlay(se.buster);
//    }
}

function cancelBusterSpine() {
    SpinePlay(mainPlayer, null, null, AniShip.idle, 0, true, SPINE_INIT_ALL); //버스터취소
    
    if(player.ballcount <=0 ) mainPlayer.skeleton.setAttachment("bubble", null);//next
    mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);//next
    //player.buster = false;
    //mainBuster.visible = true; //강제버스터조건달성
    SpinePlayerBubble.visible = false; //날아다니는 공에 붙는 버스터스파인
    //SpinePlay(SpinePlayerBubble, null, null, BusterAni.boom, 0, true);
}
function resetBuster(){
    deltaBuster = 0;
    guiset_setFuelBar(); //연료초기화    
}


var Pop = {
    MainUI: 0,
    //Temp:1,
    ADBall: 2,
    ADHeart: 3,
    Clear: 4,
    Condition: 5,
    Exit: 6,
    GameOver: 7,
    //SelectIcon:8,
    SelectLevel: 9,
    Setting: 10,
    None: 11
};
Object.defineProperties(PIXI.Container.prototype, {
	scaleX: {
	     get: function () { return this.scale.x; },
	     set: function (v) { this.scale.x = v; }
	},
	scaleY: {
	     get: function () { return this.scale.y; },
	     set: function (v) { this.scale.y = v; }
	}
});
function twScaleIn(obj){
    //스케일트윈
    TweenMax.fromTo(
        obj,
        0.7, //time
        { //start
            scaleX: 0.75, //sprite가능
            scaleY: 0.75 //sprite가능
            //scale:0.5
        },
        { //end
            scaleX: 1, //sprite가능
            scaleY: 1, //sprite가능
            //scale:1,
            //ease:Power1.easeOut,
            ease: Elastic.easeOut,
            //ease:Linear.easeNone,
            //yoyo:true,
            //repeat:1,
            delay: 0.2,
            onComplete: function (){
                if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                if(dm) console.log("~ ~ twMaxOnstart:"+0);
            }
        }
    );
}
function twAlpahIn(obj){
    //스케일트윈
    TweenMax.fromTo(
        obj,
        0.35, //time
        {
            alpha: 0,

        },
        {
            alpha: 1,
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //yoyo:true,
            //repeat:1,
            delay: 0.2,
            onComplete: function (){
                if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                if(dm) console.log("~ ~ twMaxOnstart:"+0);
            }
        }
    );
}
function twAlpahOut(obj){
    TweenMax.fromTo(
        obj,
        0.25, //time
        {
            alpha: 1
        },
        {
            alpha: 0,
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //yoyo:true,
            //repeat:1,
            delay: 0.1,
            onComplete: function (){
                obj.visible = false;
                obj.alpha=1;
            },
            onStart: function(){
            }
        }
    );
}


function selectPopUpUI(nexPop) {
    switch (nexPop) {
        case Pop.MainUI:
            if (sGameMainUI.visible == false) {
                sGameMainUI.visible = true; //-------on
//                var ct = sGameMainUI;
//                //twScaleIn(ct.bg);
//                twAlpahIn(ct);                
            }
            if (sGameUIADBall.visible == true) {
                sGameUIADBall.visible = false;
                
//                var ct = sGameUIADBall;
//                twAlpahOut(ct);
            }
            if (sGameUIADHeart.visible == true) {
                sGameUIADHeart.visible = false;
                
//                var ct = sGameUIClear;
//                twAlpahOut(ct);
            }
            if (sGameUIClear.visible == true) {
                sGameUIClear.visible = false;
                
//                var ct = sGameUIADHeart;
//                twAlpahOut(ct);
            }
            if (sGameUICondition.visible == true) {
                sGameUICondition.visible = false;
                
//                var ct = sGameUICondition;
//                twAlpahOut(ct);
            }
            if (sGameUIExit.visible == true) {
                sGameUIExit.visible = false;
                
//                var ct = sGameUIExit;
//                twAlpahOut(ct);
            }
            if (sGameUIGameOver.visible == true) {
                sGameUIGameOver.visible = false;
                
//                var ct = sGameUIGameOver;
//                twAlpahOut(ct);
            }
            if (sGameUISelectLevel.visible == true) {
                sGameUISelectLevel.visible = false;
                
//                var ct = sGameUISelectLevel;
//                twAlpahOut(ct);
            }
            if (sGameUISetting.visible == true) {
                sGameUISetting.visible = false;
                
//                var ct = sGameUISetting;
//                twAlpahOut(ct);
            }
            break;
         case Pop.SelectLevel:
            if (sGameMainUI.visible == true){
                sGameMainUI.visible = false;
                
//                var ct = sGameMainUI;
//                twAlpahOut(ct);
            }
            if (sGameUIADBall.visible == true) {
                sGameUIADBall.visible = false;
                
//                var ct = sGameUIADBall;
//                twAlpahOut(ct);
            }
            if (sGameUIADHeart.visible == true) {
                sGameUIADHeart.visible = false;
                
//                var ct = sGameUIADHeart;
//                twAlpahOut(ct);
            }
            if (sGameUIClear.visible == true) {
                sGameUIClear.visible = false;
                
//                var ct = sGameUIClear;
//                twAlpahOut(ct);
            }
            if (sGameUICondition.visible == true) {
                sGameUICondition.visible = false;
                
//                var ct = sGameUICondition;
//                twAlpahOut(ct);
            }
            if (sGameUIExit.visible == true) {
                sGameUIExit.visible = false;
                
//                var ct = sGameUIExit;
//                twAlpahOut(ct);
            }
            if (sGameUIGameOver.visible == true) {
                sGameUIGameOver.visible = false;
                
//                var ct = sGameUIGameOver;
//                twAlpahOut(ct);
            }
            if (sGameUISelectLevel.visible == false) {
                sGameUISelectLevel.visible = true; //-------on
                //스테이지반짝
 
                
//                var ct = sGameUISelectLevel;
//                //twScaleIn(ct.bg);
//                twAlpahIn(ct);
            }
            if (sGameUISetting.visible == true) {
                sGameUISetting.visible = false;
                
//                var ct = sGameUISetting;
//                twAlpahOut(ct);
            }
            break;
            
        default:
            break;            
    }
}

function selectPopUpUINone_SelectMode() {
        if (sGameMainUI.visible == true) {
            //sGameMainUI.visible = false;
            var ct = sGameMainUI;
            twAlpahOut(ct);            
        }
        if (sGameUIADBall.visible == true) {
            //sGameUIADBall.visible = false;
            var ct = sGameUIADBall;
            twAlpahOut(ct);            

        }
        if (sGameUIADHeart.visible == true) {
            //sGameUIADHeart.visible = false;
            var ct = sGameUIADHeart;
            twAlpahOut(ct);            

        }
        if (sGameUIClear.visible == true) {
            //sGameUIClear.visible = false;
            var ct = sGameUIClear;
            twAlpahOut(ct);            

        }
        if (sGameUICondition.visible == true) {
            //sGameUICondition.visible = false;
            var ct = sGameUICondition;
            twAlpahOut(ct);            
        }
        if (sGameUIExit.visible == true) {
            //sGameUIExit.visible = false;
            var ct = sGamesGameUIExitMainUI;
            twAlpahOut(ct);            

        }
        if (sGameUIGameOver.visible == true) {
            //sGameUIGameOver.visible = false;
            var ct = sGameUIGameOver;
            twAlpahOut(ct);            
        }
        //if(sGameUISelectLevel.visible == true) {
        //    sGameUISelectLevel.visible = false;
        //}
        if (sGameUISetting.visible == true) {
            //sGameUISetting.visible = false;
            var ct = sGameUISetting;
            twAlpahOut(ct);            
        }
}

function deselectPopUpUISingle(nexPop) {
    switch (nexPop) {
//    case Pop.MainUI:
//        if (sGameMainUI.visible == true) sGameMainUI.visible = false;
//        break;

    case Pop.ADBall:
        if (sGameUIADBall.visible == true){
            sGameUIADBall.visible = false;
            
//            var ct = sGameUIADBall;
//            twAlpahOut(ct);  
        }
        break;

//    case Pop.ADHeart:
//        if (sGameUIADHeart.visible == true) sGameUIADHeart.visible = false;
//        break;

    case Pop.Clear:
        if (sGameUIClear.visible == true) {
            sGameUIClear.visible = false;
            
//            var ct = sGameUIClear;
//            twAlpahOut(ct);
        }
        break;

    case Pop.Condition:
        if (sGameUICondition.visible == true){
            sGameUICondition.visible = false;
            
//            var ct = sGameUICondition;
//            twAlpahOut(ct);            
        }
        break;

    case Pop.Exit:
        if (sGameUIExit.visible == true){
            sGameUIExit.visible = false;
            
//            var ct = sGameUIExit;
//            twAlpahOut(ct);            
        }
        break;

//    case Pop.GameOver:
//        if (sGameUIGameOver.visible == true) sGameUIGameOver.visible = false;
//        break;

//    case Pop.SelectLevel:
//        if (sGameUISelectLevel.visible == true) sGameUISelectLevel.visible = false;
//        break;

    case Pop.Setting:
        if (sGameUISetting.visible == true){
            //sGameUISetting.visible = false;
            var ct = sGameUISetting;
            twAlpahOut(ct);  
        }
        break;

//    case Pop.None:
//        break;

    default:
        break;
    }
}
function tweenPopClear(){
 //별1스케일트윈
    TweenMax.fromTo(
        Star3_Clear[0], //obj
        0.5, //time
        {
            scaleX: 0.1,
            scaleY: 0.1,
        }, { //메달트윈
            scaleX: 1,
            scaleY: 1,
            //ease:Power1.easeOut,
            ease: Elastic.easeOut,
            //ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.5
        }
    );  
    //별1알파트윈
    TweenMax.fromTo(
        Star3_Clear[0], //obj
        0.25, //time
        {
            alpha:0
        }, { //메달트윈
            alpha:1,
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.5
        }
    ); 
    //별2스케일트윈
    TweenMax.fromTo(
        Star3_Clear[1], //obj
        0.5, //time
        {
            scaleX: 0.1,
            scaleY: 0.1,
        }, { //메달트윈
            scaleX: 1,
            scaleY: 1,
            //ease:Power1.easeOut,
            ease: Elastic.easeOut,
            //ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.55
        }
    );  
    //별2알파트윈
    TweenMax.fromTo(
        Star3_Clear[1], //obj
        0.25, //time
        {
            alpha:0
        }, { //메달트윈
            alpha:1,
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.55
        }
    );     
  //별3스케일트윈
    TweenMax.fromTo(
        Star3_Clear[2], //obj
        0.5, //time
        {
            scaleX: 0.1,
            scaleY: 0.1,
        }, { //메달트윈
            scaleX: 1,
            scaleY: 1,
            //ease:Power1.easeOut,
            ease: Elastic.easeOut,
            //ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.6
        }
    );  
    //별3알파트윈
    TweenMax.fromTo(
        Star3_Clear[2], //obj
        0.25, //time
        {
            alpha:0
        }, { //메달트윈
            alpha:1,
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.6
        }
    );              
    //스케일트윈
    TweenMax.fromTo(
        sprPopA_Clear, //obj
        0.5, //time
        {
            scaleX: 0.1,
            scaleY: 0.1,
        }, { //메달트윈
            scaleX: 1,
            scaleY: 1,
            //ease:Power1.easeOut,
            ease: Elastic.easeOut,
            //ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.7
        }
    );  
    //알파트윈
    TweenMax.fromTo(
        sprPopA_Clear, //obj
        0.25, //time
        {
            alpha:0
        }, { //메달트윈
            alpha:1,
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.7
        }
    );                
   //스케일트윈
    TweenMax.fromTo(
        sprPopB_Clear, //obj
        0.5, //time
        {
            scaleX: 0.1,
            scaleY: 0.1,
        }, { //메달트윈
            scaleX: 1,
            scaleY: 1,
            //ease:Power1.easeOut,
            ease: Elastic.easeOut,
            //ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.75
        }
    );  
    //알파트윈
    TweenMax.fromTo(
        sprPopB_Clear, //obj
        0.25, //time
        {
            alpha:0
        }, { //메달트윈
            alpha:1,
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);
            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            delay: 0.75
        }
    );
    TxScore_Clear.text="0";
    TweenMax.fromTo(TxScore_Clear_tween,0.5,
                    {score:0}, 
                    {score:player.playscore,
                     ease:Linear.easeNone,
                     onUpdate: function(){
                         TxScore_Clear.text = getMoneyFormatFromNum(TxScore_Clear_tween.score);
                     },
                     delay: 0.75
                    }
    );    
}

function tweenPopCondition(){
    TxNow_Condition.text="0";
    TweenMax.fromTo(
        TxNow_Condition_tween,
        0.5, //time
        {
            score:0
        }, { //메달트윈
            score:kData.userScoreArray[kData.curLevel],
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            onComplete: function (){
                //if(dm) console.log("~ ~ twMaxOncomplete:"+0);

            },
            onStart: function(){
                //if(dm) console.log("~ ~ twMaxOnstart:"+0);
            },
            onUpdate: function(){
                //if(dm) console.log("~ ~ twMaxOnUpdate:"+getMoneyFormatFromNum(TxScore_Clear_tween.score));
                TxNow_Condition.text = getMoneyFormatFromNum(TxNow_Condition_tween.score);
            },
            delay: 0.5
        }
    );    
}

function selectPopUpUISingle(nexPop) {
    switch (nexPop) {
    //    case Pop.MainUI:
    //        if (sGameMainUI.visible == false) sGameMainUI.visible = true;
    //        break;

    case Pop.ADBall:
        if (sGameUIADBall.visible == false){
            sGameUIADBall.visible = true;
            
            var ct = sGameUIADBall;
            twScaleIn(ct.bg);
            twAlpahIn(ct);
        }

        break;

    case Pop.ADHeart:
        if (sGameUIADHeart.visible == false) {
            sGameUIADHeart.visible = true;
            
            var ct = sGameUIADHeart;
            twScaleIn(ct.bg);
            twAlpahIn(ct);            
        }
        break;

    case Pop.Clear:
        if (sGameUIClear.visible == false) {
            if(kData.iHeart<=0) {
                sprReplayClear.visible = false;
                sprNextClear.visible = false;
                // sprminusnext.visible = false;
                // sprminusreplay.visible = false;
            }else{
                 sprReplayClear.visible=true;
                 sprNextClear.visible=true;
                 // sprminusnext.visible = true;
                 // sprminusreplay.visible = true;

             }


            sGameUIClear.visible = true;
            var nextlevel = kData.curLevel + 1;
            if(nextlevel>LEVEL_MAX-1) sprNextClear.visible = false;
            else sprNextClear.visible= true;


            // if(zerocondition==true){
            //     kData.userHeartCount+=1; //
            // }
            if(dm) console.log("sGameUIClear.visible==true"+", zerocondition:"+zerocondition);
            if(kData.iHeart<0)kData.iHeart=0;
            sHeartShop.timer.onSetTimer(kData.iHeart);

            var ct = sGameUIClear;
            twScaleIn(ct.bg);
            twAlpahIn(ct);
    //sprPopA_Clear = SpriteLoad(cont.bg, "img2/perfect.png", 0, -120  );    
    //sprPopA_Clear = SpriteLoad(cont.bg, "img2/stage.png", 0, -120  );
    ////debug_Sprite(spr, InfoPos.on, MovePos.on);
    //sprPopB_Clear = SpriteLoad(cont.bg, "img2/clear.png", 0, 16  );
            if(player.star<3){
                sprPopA_Clear.texture = SpritePool.getInstance().get( strGamePath+"img2/stage.png").texture;
            }else{
                sprPopA_Clear.texture = SpritePool.getInstance().get( strGamePath+"img2/perfect.png").texture;
            }
            tweenPopClear();

            sHeartShop.timer.onShow();
   
         }
        break;

    case Pop.Condition:
        if (sGameUICondition.visible == false) {
            sGameUICondition.visible = true;
            
            var ct = sGameUICondition;
            twScaleIn(ct.bg);
            twAlpahIn(ct);
            tweenPopCondition();
            
        }
        break;

    case Pop.Exit:
        if (sGameUIExit.visible == false){
            sGameUIExit.visible = true;
            var ct = sGameUIExit;
            //twScaleIn(ct.bg);
            //twAlpahIn(ct);  
//            var ct = sGameUIExit;
//            twScaleIn(ct.bg);
//            twAlpahIn(ct)
        }
        break;

    case Pop.GameOver:
        if (sGameUIGameOver.visible == false){
            sGameUIGameOver.visible = true;
            
            var ct = sGameUIGameOver;
            twScaleIn(ct.bg);
            twAlpahIn(ct)
            
        }
        break;

//    case Pop.SelectLevel:
//        if (sGameUISelectLevel.visible == false) sGameUISelectLevel.visible = true;
//        break;

    case Pop.Setting:
        if (sGameUISetting.visible == false) {

            sGameUISetting.visible = true;
            twScaleIn(sGameUISetting.bg);
            twAlpahIn(sGameUISetting);
            if(dm) console.log("~ ~ tw Setting:");
            //sHeartShop.timer.onShow();
        }
        break;

    case Pop.None:
        break;

    default:
        break;
    }
}
//function guiset_processFuelBar()//업데이트
//{
//    if(Fuel_Mask)
//    {
//        if(player.buster)
//        {
//            //if(dm) console.log("-----bustertime:"+player.bustertime+", scale:"+Fuel_Mask.scale.x);
//            if(deltaBuster>0){
//                player.bustertime -= deltaBuster;
//                deltaBuster = 0;
//                var FuelCur = FuelMax*(player.bustertime / busterTimeMax);
//                Fuel_Mask.scale.x = FuelCur<1 ? 1 : FuelCur;//1픽셀스케일보다 작으면 보이는 문제가 있어서
//                if(player.bustertime<0) player.bustertime=0;
//                
//                if(player.bustertime==0)
//                {
//                    cancelBusterSpine();
//                    Fuel_Mask.scale.x = 1;
//                }
//            }
//        }
//    }
//}
function guiset_addFuelBar() //버스터타임 증감 업데이트 할때 사용
{

    if (Fuel_Mask) {
        player.bustertime += deltaBuster;
        if(dm) console.log("~ ~ deltaBuster:"+deltaBuster);
        if(player.bustertime>1) player.bustertime = 1;
        var FuelCur = FuelMax * (player.bustertime / busterTimeMax);

        //1픽셀스케일보다 작으면 보이는 문제가 있어서 1을 유지
        var curBarScale  = FuelCur < 1 ? 1 : FuelCur > FuelMax ? FuelMax : FuelCur;
        //Fuel_Mask.scale.x = curBarScale;
        //연료바트윈
        var fuelbartween = TweenMax.to(
            Fuel_Mask,
            0.15,
            {
                scaleX:curBarScale,
                //repeat:10,
                //yoyo:true,
                //onRepeat:onRepeat,
                //repeatDelay:0.5,
                ease:Linear.easeNone
                // onComplete:function () {
                //         console.log( ", busterpre:"+player.busterpre
                //         +", buster:"+player.buster
                //         +", bustertime:"+player.bustertime
                //     );
                // }
            }
        );    
        
        var pro = floatFixed((FuelCur/FuelMax)*100, 0);
        txFuelPro.text = pro+"%";
        //버스터 버튼 보이기
        if (curBarScale == FuelMax) {
            //if(player.busterstate == busterAtt.none;)//
            if(!player.busterpre){
                //부스터모드 켜기
                if(dm) console.log("-- buster begin");
                //player.busterstate = busterAtt.begin;
                player.busterpre = true; //연료 꽉차서, 버스터활성
                SpinePlay(mainPlayer, null, null, AniShip.bust, 0, true);
                mainPlayer.skeleton.setAttachment("bubble", bbSpineArr[player.tiletype]);//buster
                //mainBuster.visible = false;
                //player.bustercount +=1;
                SpinePlayerBubble.visible = true;//날아다니는 공에 붙는 버스터스파인
                SESoundPlay(se.BusterStart);
                
                //player.bustertime = 0;
                //Fuel_Mask.scale.x = 1;    
                //부스터모드 켜기
            }
            
        }
        if (player.bustertime <= 0.01) {        //0값일경우 스케일1로 처리
            player.bustertime = 0;
            Fuel_Mask.scale.x = 1;
            txFuelPro.text = "0%";
        } 
    }
}

function guiset_setFuelBar() //연료 초기화
{
    if (Fuel_Mask) {
        player.bustertime = deltaBuster;
        var FuelCur = FuelMax * (player.bustertime / busterTimeMax);
        Fuel_Mask.scale.x = FuelCur < 1 ? 1 : FuelCur; //1픽셀스케일보다 작으면 보이는 문제가 있어서
        var pro = floatFixed((FuelCur/FuelMax)*100, 0);
        txFuelPro.text = pro+"%";
        //0값일경우 스케일 처리
        if (player.bustertime <= 0) {
            player.bustertime = 0;
            Fuel_Mask.scale.x = 1;
            txFuelPro.text = "0%";
        }

    }
}

function guiset_processStarBar() //상단스타3, 프로그래스바 제어
{
//    if (Score_Mask) {
//        var StarBias = player.playscore / (needscore_levels[kData.curLevel + 1].need * 1.2);
//        var StarCur = ScoreMax * StarBias;
//        Score_Mask.scale.x = StarCur < 1 ? 1 : StarCur; //최소 스케일 1로;
//
//        //var s="star3: ";
//        for (var i = 0; i < 3; i++) {
//            if (!mainmenuTopStar3OnOff[i] && mainmenuTopStar3PosX[i] < player.playscore) {
//                mainmenuTopStar3[i].texture = SpritePool.getInstance().get(getPathMiniStar(true)).texture;
//                mainmenuTopStar3OnOff[i] = true;
//            }
//            //s+="["+i+"]"+mainmenuTopStar3OnOff[i]+",";
//        }
//        //if(dm) console.log(s);
//
//        //--별처리
//    }

}

function guiset_setOffStar3() {
    mainmenuTopStar3OnOff[0] = false;
    mainmenuTopStar3OnOff[1] = false;
    mainmenuTopStar3OnOff[2] = false;
    mainmenuTopStar3[0].texture = SpritePool.getInstance().get(getPathMiniStar(false)).texture;
    mainmenuTopStar3[1].texture = SpritePool.getInstance().get(getPathMiniStar(false)).texture;
    mainmenuTopStar3[2].texture = SpritePool.getInstance().get(getPathMiniStar(false)).texture;
}

function guiset_setPosStar3() {
//    var maxLen = needscore_levels[kData.curLevel + 1].need * 1.2;
//    //별위치에 필요한 스코어값 계산
//    mainmenuTopStar3PosX[0] = 20 * bubble_levels[kData.curLevel + 1].balls.length;
//    mainmenuTopStar3PosX[1] = needscore_levels[kData.curLevel + 1].need * 0.8;
//    mainmenuTopStar3PosX[2] = needscore_levels[kData.curLevel + 1].need;
//    //별위치계산
//    mainmenuTopStar3[0].x = mainmenuStarGuage.x + (ScoreMax * (mainmenuTopStar3PosX[0] / maxLen));
//    mainmenuTopStar3[1].x = mainmenuStarGuage.x + (ScoreMax * (mainmenuTopStar3PosX[1] / maxLen));
//    mainmenuTopStar3[2].x = mainmenuStarGuage.x + (ScoreMax * (mainmenuTopStar3PosX[2] / maxLen));
}

//개발메뉴 온오프
function checkDevBtn() {
    if(networkManager.networkState != NET_STATE.RUN_SERVER){
        ////런서버에서 치트를 막으려면 여기에 넣어둘것
    }
    if (Dev_OnOff) {
        Dev_OnOff = false;
        for (var i = 0; i < Dev_BtnArr.length; i++) {
            Dev_BtnArr[i].visible = Dev_OnOff;
            //            if(dm) console.log("--checkDevBtn.x:" + Dev_BtnArr[i].x);
        }


    } else {
        Dev_OnOff = true;
        for (var i = 0; i < Dev_BtnArr.length; i++) {
            Dev_BtnArr[i].visible = Dev_OnOff;
            //          if(dm) console.log("--checkDevBtn.x:" + Dev_BtnArr[i].x);
        }

    }
    if(dm) console.log("--checkDevBtn:" + Dev_OnOff + ", Dev_BtnArrCount:" + Dev_BtnArr.length);
}

function clickInitDevBtn(e) {
    InitData();//개발초기
    if(dm) console.log("--clickInitBtn");
}
function clickUnlockDevBtn(e) {
    if(networkManager.networkState != NET_STATE.RUN_SERVER){
        ////런서버에서 치트를 막으려면 여기에 넣어둘것
    }
    //치트모든레벨클리어
    kData.curLevel=0;
    kData.curPage=0;
    kData.userStarArray = new Array(LEVEL_MAX);
    for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userStarArray[i] = 1;
    kData.userScoreArray = new Array(LEVEL_MAX);
    for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userScoreArray[i] = 0;
    kData.iHeart = 17;
    kData.tutorialpoint=100;
    //--뉴--    
    SaveDataInClient();
    networkManager.ForcedSaveData();//서버에 저장
    if(dm) console.log("--clickInitBtn");
}
function clickBulletDevBtn(e) {
    if(networkManager.networkState != NET_STATE.RUN_SERVER){
        //런서버에서 치트를 막으려면 여기에 넣어둘것
    }
    player.ballcount +=20;
    tweenTextBall();     
    //tx_remainBall.text = player.ballcount;
    if(dm) console.log("--clickBulletBtn");
}
function clickBusterDevBtn(e) {
    if(networkManager.networkState != NET_STATE.RUN_SERVER){
        //런서버에서 치트를 막으려면 여기에 넣어둘것
    }
    player.bustertime = 1;
    Fuel_Mask.scale.x = FuelMax;
    txFuelPro.text = "100%";
    player.busterpre=true; //개발자모드 버스터모드 강제활성
    tweenTextBall();        
    //tx_remainBall.text = player.ballcount;
    if(dm) console.log("--clickBulletBtn");
}
function clickFuel99DevBtn(e) {
    if(networkManager.networkState != NET_STATE.RUN_SERVER){
        //런서버에서 치트를 막으려면 여기에 넣어둘것
    }
    player.bustertime = 0.9;
    Fuel_Mask.scale.x = FuelMax*0.9;
    txFuelPro.text = "90%";
    tweenTextBall();        
    //tx_remainBall.text = player.ballcount;
    if(dm) console.log("--clickBulletBtn");
}
function clickHeart1DevBtn(e) {
    if(networkManager.networkState != NET_STATE.RUN_SERVER){
        //런서버에서 치트를 막으려면 여기에 넣어둘것
    }
    heartController.UseHeart(kData.iHeart-1,function(){}); //전체하트소모, 1개빼고
    SaveDataInClient();
    sHeartShop.timer.onSetCount(1);

    if(dm) console.log("--clickHeart1DevBtn");
}
function reAddChildDevBtn() {
    stage.removeChild(sDevCon);
    stage.addChild(sDevCon);
}

function checkDevBtn_Info() {

    if (Dev_InfoOnOff) {
        Dev_InfoOnOff = false;
    } else {
        Dev_InfoOnOff = true;
    }
    if(dm) console.log("--checkDev_InfoOnOff:" + Dev_InfoOnOff);
}
//개발메뉴 온오프

var timerIdle=0;
function update_TimerIdle(){
    timerIdle+=deltaTime;
    
}

function update_DebugInfo() {

    //    if(TxScore) //점수판 작동 되는지 테슽
    //    {
    //        if(!TxScore.visible) TxScore.visible = false;    
    //        d_TxScore+=deltaTime;
    //        var score = 12345+Math.floor(d_TxScore);
    //        TxScore.text = score.toString();
    //    }
    //디버그정보 보기, 숨기기
    if (Dev_InfoOnOff) { //개발정보온오프
        if (d_timerGlobal) {
            if (!d_timerGlobal.visible) d_timerGlobal.visible = true;
        }

        if (d_Txstate) {
            if (!d_Txstate.visible) d_Txstate.visible = true;
        }

        if (d_TxAngle) {
            if (!d_TxAngle.visible) d_TxAngle.visible = true;
        }

        if (d_TxTurnSnapCounter) {
            if (!d_TxTurnSnapCounter.visible) d_TxTurnSnapCounter.visible = true;
        }
    } else {
        if (d_timerGlobal) {
            if (d_timerGlobal.visible) d_timerGlobal.visible = false;
        }

        if (d_Txstate) {
            if (d_Txstate.visible) d_Txstate.visible = false;
        }

        if (d_TxAngle) {
            if (d_TxAngle.visible) d_TxAngle.visible = false;
        }

        if (d_TxTurnSnapCounter) {
            if (d_TxTurnSnapCounter.visible) d_TxTurnSnapCounter.visible = false;
        }
        return;
    }
    if (d_timerGlobal) d_timerGlobal.text = secondsToTime(tickLast * 0.001);
    if (d_Txstate) d_Txstate.text = whatisGameState();
    if (d_TxAngle) d_TxAngle.text = "player.angle:" + Math.floor(player.angle);
    if (d_TxTurnSnapCounter) {
        d_TxTurnSnapCounter.text = "turnsnapcounter:" + turnsnapcounter.toString() 
            + " ,usedballcounter:" + usedballcounter.toString()
            +" ";
    }
}
//10레벨-연료에너지등장
//19레벨-실드보호막등장
//20레벨-운석등장
//37레벨-추가버블등장

//sGameMainUI.tutbg
//sGameMainUI.tut
//sGameMainUI.tut.dialog
//sGameMainUI.tut.txt
//sGameMainUI.tut.ok
function clickTutorial(){
    if(dm) console.log("~ ~ tutorial-step:"+kData.tutorialpoint);
    if(kData.tutorialpoint==1){
        SpinePlay(BtnLspn, null, null, AniBtnSpn.press_r, 1, false, SpnInit.none);
        TweenMax.delayedCall( 0.7, function () { //});
            SpinePlay(BtnLspn, null, null, AniBtnSpn.press_r, 1, false, SpnInit.none);
        });
        TweenMax.delayedCall( 1.4, function () { //});
            SpinePlay(BtnLspn, null, null, AniBtnSpn.press_r, 1, false, SpnInit.none);
        });

    }
    tweenTutHide();
}

var tutArr=[];
var TutState={ begin:0, run:1, end:2, run1:3, run2:4 };
var tut1state = TutState.begin;

var tutVal={
    scalex:0
};
var tutready=false;

function initTutorial(){
    if(dm) console.log("~ ~ initTutorial()");
    var tutpoint = kData.tutorialpoint;
    var curLv=kData.curLevel+1;
    
    if(tutpoint==undefined
    || tutpoint==100){
        // 튜터리얼 수료시 종료
        if(dm) console.log("~ ~ initTutorial:1");
        sGameMainUI.tutbg.visible = false;
        sGameMainUI.tut.visible = false;
        tutready=false;
    }else{
        
        if(dm) console.log("~ ~ kData.tutorialpoint:"+kData.tutorialpoint+", kData.curLevel+1:"+(kData.curLevel+1));
        if(curLv==1 && tutpoint<4){//튜터리얼 1레벨 첨부터 시작 //in initTutorial

            kData.tutorialpoint=0;
            sGameMainUI.tutbg.visible = true;
            sGameMainUI.tut.visible = true;
            sGameMainUI.tut.scale.x=0;
            sGameMainUI.tut.alpha = 0;
            sGameMainUI.tutbg.alpha = 0;                  
            tutready=true;
            tut1state = TutState.begin;
            if(dm) console.log("~ ~ initTutorial:2 lv1:"+curLv+", tutready:"+tutready);
        }else if(curLv==2 && tutpoint<7){//튜터리얼 2레벨 첨부터 시작 //in initTutorial

            kData.tutorialpoint=4;
            sGameMainUI.tutbg.visible = true;
            sGameMainUI.tut.visible = true;
            sGameMainUI.tut.scale.x=0;
            sGameMainUI.tut.alpha = 0;
            sGameMainUI.tutbg.alpha = 0;                  
            tutready=true;
            tut1state = TutState.begin;
            if(dm) console.log("~ ~ initTutorial:2 lv2:"+curLv+", tutready:"+tutready);
        }else if(curLv==10 //연료등장 10lv, tutpt=7
                && tutpoint==7){
            kData.tutorialpoint=7;
            sGameMainUI.tutbg.visible = true;
            sGameMainUI.tut.visible = true;
            sGameMainUI.tut.scale.x=0;
            sGameMainUI.tut.alpha = 0;
            sGameMainUI.tutbg.alpha = 0;                  
            tutready=true;
            if(dm) console.log("~ ~ initTutorial:2 lv10:"+curLv+", tutready:"+tutready);
         }else if(curLv==19 //실드보호막등장 19lv, tutpt = 8
                && tutpoint==8){

            kData.tutorialpoint=8;
            sGameMainUI.tutbg.visible = true;
            sGameMainUI.tut.visible = true;
            sGameMainUI.tut.scale.x=0;
            sGameMainUI.tut.alpha = 0;
            sGameMainUI.tutbg.alpha = 0;                  
            tutready=true;
            if(dm) console.log("~ ~ initTutorial:2 lv10:"+curLv+", tutready:"+tutready);
        }else if(curLv==20 //운석등장 20lv, tutpt = 9
                && tutpoint==9){

            kData.tutorialpoint=9;
            sGameMainUI.tutbg.visible = true;
            sGameMainUI.tut.visible = true;
            sGameMainUI.tut.scale.x=0;
            sGameMainUI.tut.alpha = 0;
            sGameMainUI.tutbg.alpha = 0;                  
            tutready=true;
            if(dm) console.log("~ ~ initTutorial:2 lv10:"+curLv+", tutready:"+tutready);
        }else if(curLv==23 //추가볼아이템등장 23lv, tutpt = 10
                && tutpoint==10){

            kData.tutorialpoint=10;
            sGameMainUI.tutbg.visible = true;
            sGameMainUI.tut.visible = true;
            sGameMainUI.tut.scale.x=0;
            sGameMainUI.tut.alpha = 0;
            sGameMainUI.tutbg.alpha = 0;                  
            tutready=true;
            if(dm) console.log("~ ~ initTutorial:2 lv10:"+curLv+", tutready:"+tutready);
        }else{
            //닫기 //다른 레벨들을 클릭시
            sGameMainUI.tutbg.visible = false;
            sGameMainUI.tut.visible = false;
            tutready=false;
            if(dm) console.log("~ ~ initTutorial:3 lv3~:"+curLv+", tutready:"+tutready);
        }
    }
//    //전체튜터끄기
//    sGameMainUI.tutbg.visible = false;
//    sGameMainUI.tut.visible = false;
//    tutready=false;

}
function tweenTutShow(){
    sGameMainUI.tut.scale.x=0;
    sGameMainUI.tut.alpha = 0;
    sGameMainUI.tutbg.alpha = 0;        
    sGameMainUI.tut.visible = true;
    sGameMainUI.tutbg.visible = true;
    
    tutVal.scalex=0;
    
    if(dm) console.log("tweenTutShow()");
    
    var tween = TweenMax.to(
        tutVal,
        0.15,
        {
            scalex:1,
            //onRepeat:onRepeat,
            //repeatDelay:0.5,
            onUpdate: function(){
//                if(dm) console.log(
//                    "~ ~ tweenTutShow().update - tutVal:"+tutVal.scalex
//                    +", thisScale:"+sGameMainUI.tut.scale.x
//                );
                sGameMainUI.tut.scale.x = tutVal.scalex;
                sGameMainUI.tut.alpha = tutVal.scalex;
                sGameMainUI.tutbg.alpha = tutVal.scalex*0.25;   
            },
            onComplete: function(){
                sGameMainUI.tut.scale.x=1;
                sGameMainUI.tut.alpha = 1;
                sGameMainUI.tutbg.alpha = 0.25;
                tutshootcount = nextcount;
            },
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            delay: 0.0
        }
    );    
}
function tweenTutHide(){
    sGameMainUI.tut.scale.x=1;
    sGameMainUI.tut.alpha = 1;
    sGameMainUI.tutbg.alpha = 0.25;    
    tutVal.scalex=1;
    
    if(dm) console.log("tweenTutHide()");
    
    var tween = TweenMax.to(
        tutVal,
        0.25,
        {
            scalex:0,
            //onRepeat:onRepeat,
            //repeatDelay:0.5,
            onUpdate: function(){
//                if(dm) console.log(
//                    "~ ~ tweenTutShow().update - tutVal:"+tutVal.scalex
//                    +", thisScale:"+sGameMainUI.tut.scale.x
//                );
                sGameMainUI.tut.scale.x = tutVal.scalex;
                sGameMainUI.tut.alpha = tutVal.scalex;
                sGameMainUI.tutbg.alpha = tutVal.scalex*0.25;
            },
            onComplete: function(){
                sGameMainUI.tut.visible = false;
                sGameMainUI.tutbg.visible = false;
                if(2===(kData.curLevel+1)) tut1state = TutState.run1; //문제지점//ok버튼클릭 //2레벨에서만 되게 //팝업뜨면 run으로 되고, run1에서 슈팅만 되게
            },
            //ease:Power1.easeOut,
            //ease: Elastic.easeOut,
            ease:Linear.easeNone,
            //ease: Bounce.easeOut,
            //yoyo:true,
            //repeat:1,
            delay: 0.0
        }
    );    
}
function runTutorial(){
    //if(dm) console.log("~ ~ runTutorial.a");
    if(!tutready) return;
    //if(dm) console.log("~ ~ runTutorial.b");
    var tutpoint = kData.tutorialpoint;
    //튜터상태
    switch(tutpoint) {
        case undefined:
            break;
        case 0:
            if(1==(kData.curLevel+1)){ //1레벨 튜터리얼UI(버블발사,같은색3개이상 UI 출력)
                switch(tut1state) {
                    case TutState.begin:
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                        sGameMainUI.tut.txt.text=GetString("tuto01");
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.ball).texture;
                        tweenTutShow();
                        tut1state = TutState.run;
                        sGameMainUI.tut.right.interactive = true;
                        sGameMainUI.tut.left.interactive = true;
                        break;
                    case TutState.run:
                        //---------------슈팅 버블1
                        break;
                    case TutState.end:
                        kData.tutorialpoint = 1;
                        
                        tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end0:"+tutpoint);
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;
                        break;
                    default:
                        break;
                }
            }
            break;
        case 1:
            if(1==(kData.curLevel+1)){ //1레벨 튜터리얼UI(왼쪽으로 회전UI 출력)
                switch(tut1state) {
                    case TutState.begin:
                        sGameMainUI.tut.txt.text=GetString("tuto02");//TX.tutmsg_rotleft;
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.left).texture;
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);

                        tweenTutShow();
                        tut1state = TutState.run;
                        sGameMainUI.tut.right.interactive = true;
                        sGameMainUI.tut.left.interactive = false;                        
                        break;
                    case TutState.run:
                        //---------------왼쪽회전1번
                        break;
                    case TutState.end://딜레이콜로 여기로 온다
                        //tutshootcount==2
                        nextcount=2;
                        kData.tutorialpoint=2;
                        tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end1:");
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;                          
                        break;
                    default:
                        break;
                }
            }            
            break;
        case 2:
            if(1==(kData.curLevel+1)){ //1레벨 튜터리얼UI(별을 획득하세요 UI 출력)
                switch(tut1state) {
                    case TutState.begin:
                        sGameMainUI.tut.txt.text=GetString("tuto03");//TX.tutmsg_star;
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.star).texture;
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                        tweenTutShow();
                        tut1state = TutState.run;
                        sGameMainUI.tut.right.interactive = true;
                        sGameMainUI.tut.left.interactive = true;                        
                        break;
                    case TutState.run:
                        //---------------별2개 맞추기
                        break;
                    case TutState.end:
                        kData.tutorialpoint = 3;
                        tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end2");
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;                        
                        break;
                    default:
                        break;
                }   
            }            
            break;
        case 3:
            if(1==(kData.curLevel+1)){  //1레벨 튜터리얼UI(가운데친구를맞춰친구를 구해 UI 출력)
                switch(tut1state) {
                    case TutState.begin:
                        sGameMainUI.tut.txt.text=GetString("tuto04");//TX.tutmsg_midstar;
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.alien).texture;
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                        tweenTutShow();
                        tut1state = TutState.run;
                        sGameMainUI.tut.right.interactive = true;
                        sGameMainUI.tut.left.interactive = true;                        
                        break;
                    case TutState.run:
                        //코어 맞추기
                        break;
                    case TutState.end:
                        //kData.tutorialpoint = 4;
                        //tut1state = TutState.begin;
                        kData.tutorialpoint=4;
                        SaveDataInClient();//1레벨 튜터 저장
                        if(dm) console.log("~ ~ runTutorial.end3:");
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;                        
                        break;
                    default:
                        break;
                }
            }            
            break;
        case 4:
          if(2==(kData.curLevel+1)){ //2레벨 튜터리얼UI(버블터트려 에너지모아 UI 출력)
               switch(tut1state) {
                    case TutState.begin:
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                        sGameMainUI.tut.txt.text=GetString("tuto05");////TX.tutmsg_energy;
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.ball).texture;
                        tweenTutShow();
                        tut1state = TutState.run;
                        sGameMainUI.tut.right.interactive = true;
                        sGameMainUI.tut.left.interactive = true;
                        break;
                    case TutState.run:
                        //---------------버스터모드시작
                        break;
                    case TutState.end:
                        kData.tutorialpoint=5; //딜레이콜로이동
                        tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end4");
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;
                        break;
                    default:
                        break;
                }            
            }
            break;
        case 5:
            if(2==(kData.curLevel+1)){ //2레벨 튜터리얼UI(버스터모드로 별획득해 UI 출력)
                switch(tut1state) {
                    case TutState.begin:
                        sGameMainUI.tut.right.interactive = true;
                        sGameMainUI.tut.left.interactive = true;
                        sGameMainUI.tut.txt.text=GetString("tuto06");//TX.tutmsg_buster;
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.star).texture;
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);

                        tweenTutShow();
                        tut1state = TutState.run;
                        break;
                    case TutState.run:
                        //---------------버스터모드별2시작
                        break;
                    case TutState.end:
                        kData.tutorialpoint=6; //딜레이코롤이동
                        tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end5:");
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;                          
                        break;
                    default:
                        break;
                }
            }
            break;
        case 6:
            if(2==(kData.curLevel+1)){ //2레벨 튜터리얼UI(가운데친구를맞춰친구를 구해 UI 출력) //문제지점
                switch(tut1state) {
                    case TutState.begin:
                        sGameMainUI.tut.right.interactive = true;
                        sGameMainUI.tut.left.interactive = true;
                        sGameMainUI.tut.txt.text=GetString("tuto04");//TX.tutmsg_midstar2;
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.alien).texture;
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                            
                        tweenTutShow();
                        tut1state = TutState.run;
                        break;
                    case TutState.run:
                        //---------------코어클리어2
                        break;
                    case TutState.end:
                        //kData.tutorialpoint=7;딜레이콜로이동
                        //SaveData();
                        kData.tutorialpoint=7;
                        SaveDataInClient();//2레벨 튜터 저장
                        tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end6:");
                        sGameMainUI.tut.right.interactive = false;
                        sGameMainUI.tut.left.interactive = false;

                        break;
                    default:
                        break;
                    }
            }            
            break;
          case 7:
                //10레벨-연료에너지등장
                //19레벨-실드보호막등장
                //20레벨-운석등장
                //37레벨-추가버블등장
            if(10==(kData.curLevel+1)){
                switch(tut1state) {
                    case TutState.begin:
                        sGameMainUI.tut.txt.text=GetString("tuto07");//TX.tutmsg_fuel;
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.fuel).texture;
                        tut1state = TutState.run;
                        break;
                    case TutState.run:
                        tweenTutShow();
                        tut1state = TutState.end;
                        //---------------//10레벨-연료에너지등장
                        break;
                    case TutState.end:
                        kData.tutorialpoint = 8;
                        SaveDataInClient();
                        //tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end:"+tutpoint);
                        tut1state = TutState.begin;
                        break;
                    default:
                        break;
                    }            
            }
            break;
          case 8:
                    //10레벨-연료에너지등장
                    //19레벨-실드보호막등장
                    //20레벨-운석등장
                    //37레벨-추가버블등장
            if(19==(kData.curLevel+1)){ 
                    switch(tut1state) {
                        case TutState.begin:
                            sGameMainUI.tut.txt.text=GetString("tuto09");//TX.tutmsg_shield;
                            if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                            sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.shield).texture;
                            tut1state = TutState.run;
                            break;
                        case TutState.run:
                            tweenTutShow();
                            tut1state = TutState.end;
                            //---------------//19레벨-실드보호막등장
                            break;
                        case TutState.end:
                            kData.tutorialpoint = 9;
                            SaveDataInClient();
                            tut1state = TutState.begin;
                            if(dm) console.log("~ ~ runTutorial.end:"+tutpoint);
                            break;
                        default:
                            break;
                    }
                }
                break;
          case 9:
                if(20==(kData.curLevel+1)){ 
                    switch(tut1state) {
                        case TutState.begin:

                            if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                            sGameMainUI.tut.txt.text=GetString("tuto10");//TX.tutmsg_stone;
                            sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.stone).texture;
                            tweenTutShow();
                            tut1state = TutState.end;
                            break;
                        case TutState.run:
                            //---------------//20레벨-운석등장
                            break;
                        case TutState.end:
                            kData.tutorialpoint = 10;
                            SaveDataInClient();
                            tut1state = TutState.begin;
                            if(dm) console.log("~ ~ runTutorial.end:"+tutpoint);
                            break;
                        default:
                            break;
                    }
                }            
                break;
          case 10:
                if(23==(kData.curLevel+1)){  //추가볼아이템등장
                switch(tut1state) {
                    case TutState.begin:
                        sGameMainUI.tut.txt.text=GetString("tuto08");//TX.tutmsg_addball;
                        if(dm) console.log("~ ~ runTutorial.begin:"+tutpoint);
                        sGameMainUI.tut.icon.texture = SpritePool.getInstance().get(TUTICON.addball).texture;
                        tweenTutShow();
                        tut1state = TutState.end;
                        break;
                    case TutState.run:
                        //---------------//37레벨-추가버블등장
                        break;
                    case TutState.end:
                        kData.tutorialpoint = 100;
                        SaveDataInClient();
                        //tut1state = TutState.begin;
                        if(dm) console.log("~ ~ runTutorial.end:"+tutpoint);
                        tut1state = TutState.begin;
                        break;
                    default:
                        break;
                    }
                }            
                break;            
        default:
            break;
    }
    
}