/**
 * Created by NeoHan on 2017-03-02.
 */
var btndelay_onoff = false;

//랭킹결과장 업데이트 처리
function updateMenuState() {
    // //console.log("--updateMenuState()--");
    // if (uigame.state.states.menu.uiresult.visible) {
    //     if (true) {
    //         uigame.state.states.menu.uiresult.dlgbg9.rsbtn.tx.text = "TIME: " + float2int(timer20sec > 0 ? timer20sec : 0);
    //
    //         //기다리다가 1번 실행
    //         if (mode20sec && timer20sec < 0) {
    //
    //             var myrankidx = net_userallfin.indexOf(net_yourname);//등수알기
    //             var addMD = myrankidx == 0 ? 4
    //                 : myrankidx == 1 ? 3
    //                     : myrankidxs == 2 ? 2
    //                         : 1;
    //             var decMd = 0;
    //             decMd += net_userallfin[3] == undefined ? -1 : 0;
    //             decMd += net_userallfin[2] == undefined ? -1 : 0;
    //             decMd += net_userallfin[1] == undefined ? -1 : 0;
    //
    //             //메달저장
    //             var v = addMD + decMd;
    //             kData.WinCnt = (kData.WinCnt + (addMD + decMd));
    //             kData.DayMedal = (kData.DayMedal + (addMD + decMd));
    //             kData.CumulMedal = (kData.CumulMedal + (addMD + decMd));
    //             //networkManager.ForcedSaveData(); //in updateMenuState
    //             if (dm) console.log("save Medal-- win:" + kData.WinCnt + ", dayMd:" + kData.DayMedal + ", allMd:" + kData.CumulMedal);
    //
    //             mode20sec = false;//종료타이머가 끝났을때
    //
    //             //강제나가기
    //             if (matchmode) {
    //                 socket.emit('leaveRoom'); //타이머가0
    //             }
    //
    //             uimode = uimodeset.select;
    //             uigame.state.game.state.start('menu');
    //             //강제나가기
    //         }
    //     }
    // }//결과창 나올때
    //
    // whiteshopguard.visible = false;
}

function printdebug() {
    if (dm) return;
    uigame.debug.geom(debugrect, 'rgba(255,0,0,0.5)');

    if (debugsprite != undefined) {
        uigame.debug.spriteInfo(debugsprite, 32, 32);
        debugrect.x = debugsprite.worldPosition.x;
        debugrect.y = debugsprite.worldPosition.y;

    }
    uigame.debug.text(
        'circlepos : ' + debugrect.x + ", " + debugrect.y
        , 0, 1270
    );
}
//--UI 디버그 기능 용도---
var style25debug = {
    font: "25px Conv_PassionOne-Regular",
    fill: "#ffffff",
    align: "center",
    stroke: '#182601',
    strokeThickness: 6
};

function createUI9a(pack, ui9name, posx, posy, w, h, l, r, t, b) {
    var ui9b = new PhaserNineSlice.NineSlice(
        uigame,                 //Phaser.Game
        posx,                      //x
        posy,                      //y
        pack,                  //atlas key //pack이름
        ui9name,      //Image frame //png이름,
        w,                    //width
        h,                    //height
        {top: t, bottom: b, left: l, right: r}
    );
    ui9b.anchor.setTo(0.5, 0.5);//ui9b.resize(100,200);//ui9b.scale.setTo(0.5,0.5);

    return ui9b;
}

//노말버튼생성
//버튼그림, 위치xy, 나인패치,이미지 둘다 가능
function createbtn(spr, tx, icon, x, y, soundonoff) { //버튼생성
    // if(spr==undefined) {
    //     spr = loadUI9('yes_nine', x, y, 243, 107); //샵오케이버튼
    // }
    spr.anchor.setTo(0.5, 0.5);

    spr.sx = spr.scale.x;
    spr.sy = spr.scale.y;

    if (x == undefined) x = 0;
    if (y == undefined) y = 0;
    //if(szx9==undefined) szx9=243;
    //if(szy9==undefined) szy9=107;
    //if(tx==undefined) tx=GetString("ok");

    if (icon != undefined) {
        icon.anchor.setTo(0.5, 0.5);
        spr.addChild(icon);
        spr.icon = icon;
    } else {
        spr.icon = undefined;
    }

    if (tx != undefined) {
        tx.anchor.setTo(0.5, 0.5);
        spr.addChild(tx);
        spr.tx = tx;
    } else {
        spr.tx = undefined;
    }


    if (soundonoff !== undefined) {
        spr.soundonoff = soundonoff;
    } else {
        spr.soundonoff = true;
    }

    spr.inputEnabled = true;
    spr.x = x;
    spr.y = y;

    spr.isdown = false; //눌려졋는지 체크하는 게 목적
    spr.tw;

    spr.isLock = false; //버튼잠김 --->소리,애니 전부 안되게 하는 목적

    spr.fnok = function () {
        if (dm) console.log("click run" + ", xy:" + spr.x + "," + spr.y);
    };
    spr.fndown = function () {
        if (dm) console.log("down key" + ", xy:" + spr.x + "," + spr.y);
    };
    spr.fnup = function () {
        if (dm) console.log("up key" + ", xy:" + spr.x + "," + spr.y);
    };

    spr.events.onInputOver.add(function () {        //호버
        if (spr.isLock) return;
        spr.isdown = false;
        //호버시 빨간색으로 변하게 하는 테스트 코드
        //spr.tint = ColorSet.red;
        //호버시 빨간색으로 변하게 하는 테스트 코드
        if (dm) console.log("onInputOver" + ", xy:" + spr.x + "," + spr.y);

        //spr.tint = ColorSet.red;

    }, this);
    spr.events.onInputOut.add(function () {        //취소
        if (spr.isLock) return;
        spr.isdown = false;

        if (spr.tw != undefined) spr.tw.stop();
        spr.tw = uigame.add.tween(spr.scale);
        spr.tw.to({x: spr.sx, y: spr.sy}, 0.3, Phaser.Easing.Linear.None);
        spr.tw.start();
        if (dm) console.log("onInputOut" + ", xy:" + spr.x + "," + spr.y);

        //spr.tint = ColorSet.blue;

    }, this);
    spr.events.onInputUp.add(function () {   //업 클릭
        if (spr.isLock) return;
        //이중클릭방지
        if (btndelay_onoff === false) {
            btndelay_onoff = true;
            TweenMax.delayedCall(0.25, function () {
                btndelay_onoff = false;
            });
        } else {
            return;
        }
        //이중클릭방지

        if (spr.tw != undefined) spr.tw.stop();
        spr.tw = uigame.add.tween(spr.scale);
        spr.tw.to({x: spr.sx, y: spr.sy}, 0.3, Phaser.Easing.Linear.None);
        spr.tw.start();
        if (dm) console.log("onInputUp" + ", xy:" + spr.x + "," + spr.y);
        if (spr.isdown && spr.fnok != undefined) spr.fnok(spr.slotId);
        spr.isdown = false;
        if (spr.fnup != undefined) spr.fnup();
        //spr.tint = ColorSet.yellow;
    }, this);

    spr.events.onInputDown.add(function () { //다운
        if (spr.isLock) return;
        //if (btndelay_onoff === true) return; //이중클릭방지

        //버튼사운드
        if (kData.bSoundSE && spr.soundonoff) SE_Click.play();
        //버튼이미지변경
        spr.isdown = true;
        if (spr.tw != undefined) spr.tw.stop();
        spr.tw = uigame.add.tween(spr.scale);
        spr.tw.to({x: (spr.sx * 1.1), y: (spr.sy * 1.1)}, 0.3, Phaser.Easing.Linear.None);
        spr.tw.start();
        if (dm) console.log("onInputDown" + ", xy:" + spr.x + "," + spr.y);
        if (spr.fndown != undefined) spr.fndown();
        //spr.tint = ColorSet.cyan;
    }, this);

    spr.onDelete = function(){
        if(spr.icon !== undefined) spr.icon.destroy();
        if(spr.tx !== undefined) spr.tx.destroy();
        spr.fnok = null;
    };

    return spr;
}
//-----------------------------------------------------------------스타트화면(레벨선택화면)
function createUISelectLevel() {
    var grp = uigame.add.group();
    //grp.alpha = 0.5;
    //grp.scale.set(1,1);
    //grp.x=100;
    grp.position.set(xc, yc);

    grp.z_stagging=false;

    grp._i = 0;
    grp._x4 = 4;
    grp._y4 = 4;

    //그라데이션배경
    var dlbg = createUI9a('atlas_bb_ui-0', 'select_bg.png', 0, 0, 720, 1280, 2, 2, 0, 0);
    grp.dlbg = dlbg;
    //grp.dlbg.alpha= 0.25;
    grp.addChild(dlbg);
    //그라데이션배경

    //맨위 배경바
    var top = uigame.add.sprite(0, -500, "atlas_bb-0", "top.png");
    top.anchor.setTo(0.5, 1);
    dlbg.addChild(top);//debug_Sprite(top);
    //맨위 배경바

    //상단별바 시작
    dlbg.sTopStarBg = createUI9a('atlas_bb_ui-0', 'select_heart_bg.png',
        70, -580,//바위치
        218, 50, //바크기
        20, 20, 0, 0);
    dlbg.sTopStarBg.anchor.setTo(0.5, 0.5);
    dlbg.addChild(dlbg.sTopStarBg);//debug_Sprite(dlbg.sTopStarBg);
    var sTopStar = uigame.add.sprite(-88, -2, "atlas_bb_ui-0", "select_level.png");
    sTopStar.anchor.setTo(0.5, 0.5);
    dlbg.sTopStarBg.addChild(sTopStar);//debug_Sprite(sTopStar);
    var txTopStar = uigame.add.text(19, 2, "000/000", style_bb_topstar);
    txTopStar.anchor.setTo(0.5, 0.5);
    dlbg.sTopStarBg.txTopStar = txTopStar;
    dlbg.sTopStarBg.addChild(txTopStar); //debug_Sprite(txTopStar);
    //상단별바 완성

    //레벨이 확충됬을 경우 늘려준다
    grp.copyAddUserData = function () {
        console.log("diff!! kData.userStarArray.length:" + kData.userData.length);

        //새갯수 만큼 초기화 배열 생성(초기화 0레벨만 오픈상태로)
        var _tempArray = [];
        for (var i = 0; i < LEVEL_MAX; ++i) {
            _tempArray[i] = -1;
        }
        _tempArray[0] = 0;

        //유저레벨(kData)-->_userStarArray로 복사한다.
        var star0index = -1; //현재하고 잇는레벨 인덱스저장용
        for (var i = 0; i < kData.userData.length; ++i) {
            if (kData.userData[i] === 0) star0index = i;   //플레이 중인 레벨이 있으면 저장
            _tempArray[i] = kData.userData[i];   //유저별 복사
        }
        if (star0index === -1) _tempArray[kData.userData.length] = 0; //플레이 중인게 없으면, 레벨 한개를 오픈해준다.

        kData.userData = _tempArray; //최종 이식 복사
    };
    //전체 별갯수 가져오기
    grp.getMyStar = function () {
        if(typeof(kData) === 'undefined' || typeof(kData.userData) === 'undefined') return;
        var ret = 0;

        //레벨길이 검사
        if (kData.userData.length < LEVEL_MAX) { //레벨이 확충됬을 경우 늘려준다
            grp.copyAddUserData();
        }

        for (var i = 0; i < LEVEL_MAX; i++) {
            var star3 = kData.userData[i];
            if( star3 !== -1           //클리어레벨인 경우
            && (i + 1) % LV4x4 !== 0){ //보너스아닌 경우
                ret += star3;
            }
        }
        return ret;
    };
    grp.getAllStar = function () {
        var ret=0;
        for (var i = 0; i < LEVEL_MAX; i++) {
            if((i + 1) % LV4x4 !== 0) {
                ret += 3;
            }
        }
        return ret;
    };

    //4x4아이콘 초기 생성 배치
    grp._w4x4 = 520; //전체 길이(아이콘 중점 사이)
    grp._h4x4 = 650; //전체 길이(아이콘 중점 사이)
    grp._spn_x=0;
    grp._spn_y=0;
    dlbg.sIcons = [];
    for (grp._i = 0; grp._i < LV4x4; grp._i++) {
        var lv1 = CreateLevel1IconUI();
        lv1.x = (
                (grp._i % grp._x4)      //몇x칸 로컬좌표(4개로 나눈 나머지)
                * (grp._w4x4 / (4 - 1)) //전체폭 1/3 값
            )
            - (grp._w4x4 * 0.5);    //중앙이동을 위한 절반 옵셋
        lv1.y = (
                float2int_fast(grp._i / grp._y4)//몇행(몫)
                * (grp._h4x4 / (4 - 1)) //전체높이 1/3 값
            )
            - (grp._h4x4 * 0.5)     //중앙이동을 위한 절반 옵셋
            - 50; //offsetF
        lv1.sOn.tx.text = grp._i;
        dlbg.sIcons.push(lv1);
        dlbg.addChild(lv1);
    }
    //4x4아이콘 초기 생성 배치

    //일반레벨언락스파인-------------
    grp.spine_unlock_n = this.game.add.spine(0, 0, "stage_lock_ani");
    grp.addChild(grp.spine_unlock_n);
    spn_unlock_n = grp.spine_unlock_n;

    //--스파인상태설정
    spn_unlock_n.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("spn_unlock_n.trackindex:0");
                break;
            case 1:
                if(dm) console.log("spn_unlock_n.trackindex:1");
                break;
            case 2:
                if(dm) console.log("spn_unlock_n.trackindex:2");
                break;
            case 3:
                if(dm) console.log("spn_unlock_n.trackindex:3");
                break;
            case 4:
                if(dm) console.log("spn_unlock_n.trackindex:4");
                //empty만 순차실행 안됨, 딜레이없이 실행 되버린다.
                //spn_page_lock.visible = false;//여기서 스파인숨김시 다른 애니들이 다 작동안함
                spn_unlock_n.visible=false;
                if(gotonext===true){
                    gotonext=false;
                    //다음레벨로 가기-----------------------------------------
                    curLevel = kData.openedBak;
                    curLevelFake = curLevel + 1 - Math.floor(curLevel / LV4x4); //레벨선택창에서
                    //-----로그인 상태 체크-----------in CreateLevel1IconUI
                    if(loginTF === 1){          //로그인회원
                        if (proto.serPos === 0              //모비서비스
                            ||proto.serPos === 1) {              //야후서비스
                            if (kData.iHeart<= 0) { //하트가 바닥이면 in CreateLevel1IconUI
                                //우선상점나오게
                                uigame.state.states.menu.uishop.onRefreshShop();
                                uigame.state.states.menu.uishop.onOpen();
                                return;
                                //우선상점나오게
                            }else {
                                //하트소멸은 다음단계에서하므로
                                //다음단계로
                            }
                        }
                    }else{
                        if (networkManager.networkState === NET_STATE.LOCALHOST) { //로컬서비스
                            //다음단계로
                        }else{ //비회원  //게스트모드
                            //
                            if(kData.iHeart<=0) { //CreateLevel1IconUI
                                networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),//상점
                                    function () {
                                        networkManager.JoinMember();
                                    },
                                    function () {
                                    }
                                );
                                return;
                            }else{
                                //하트소멸은 다음단계에서하므로
                            }
                        }
                    }
                    //-----로그인 상태 체크------------in CreateLevel1IconUI //노말아이콘

                    //자동진행시
                    uigame.state.states.menu.uiselectlevel.spMask_sel.visible=true;//더블클릭막기
                    setTimeout(function () {
                        uigame.state.states.menu.uiselectlevel.spMask_sel.visible=false;//더블클릭풀기
                        uigame.state.start('game');
                        //uiSelectLevel.visible을 true로//this.uiStartLevel.onActiveLv();
                        if (dm) console.log("start game!!!");
                    }, 250); //--> clickGameMode
                    //다음레벨로 가기-----------------------------------------
                }
                break;
        }
    };

    //--스파인상태설정

    // //--스파인애니설정
    // spn_unlock_n.visible = true;
    // spn_unlock_n.x = grp._spn_x+200;
    // spn_unlock_n.y = grp._spn_y+200;
    // spn_unlock_n.addAnimationByName(4, "stage_lock_out", false);
    // //spn_unlock_n.addAnimationByName(4, "empty", false);
    // //--스파인애니설정
    //일반레벨언락스파인-------------

    //보너스레벨언락스파인-------------
    grp.spine_unlock_b = this.game.add.spine(0, 0, "bonus_stage_lock_ani");
    grp.addChild(grp.spine_unlock_b);
    spn_unlock_b = grp.spine_unlock_b;

    spn_unlock_b.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("spn_unlock_n.trackindex:0");
                break;
            case 1:
                if(dm) console.log("spn_unlock_n.trackindex:1");
                break;
            case 2:
                if(dm) console.log("spn_unlock_n.trackindex:2");
                break;
            case 3:
                if(dm) console.log("spn_unlock_n.trackindex:3");
                break;
            case 4:
                if(dm) console.log("spn_unlock_n.trackindex:4");
                //empty만 순차실행 안됨, 딜레이없이 실행 되버린다.
                //spn_page_lock.visible = false;//여기서 스파인숨김시 다른 애니들이 다 작동안함
                spn_unlock_b.visible=false;
                //--------------------------------------------
                if(gotonext===true){
                    gotonext=false;
                    //다음레벨로 가기-----------------------------------------
                    curLevel = kData.openedBak;
                    curLevelFake = curLevel + 1 - Math.floor(curLevel / LV4x4); //레벨선택창에서
                    //-----로그인 상태 체크-----------in CreateLevel1IconUI
                    if(loginTF === 1){          //로그인회원
                        if (proto.serPos === 0              //모비서비스
                            ||proto.serPos === 1) {              //야후서비스
                            if (kData.iHeart<= 0) { //하트가 바닥이면 in CreateLevel1IconUI
                                //우선상점나오게
                                uigame.state.states.menu.uishop.onRefreshShop();
                                uigame.state.states.menu.uishop.onOpen();
                                return;
                                //우선상점나오게
                            }else {
                                //하트소멸은 다음단계에서하므로
                                //다음단계로
                            }
                        }
                    }else{
                        if (networkManager.networkState === NET_STATE.LOCALHOST) { //로컬서비스
                            //다음단계로
                        }else{ //비회원  //게스트모드
                            //
                            if(kData.iHeart<=0) { //CreateLevel1IconUI
                                networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),//상점
                                    function () {
                                        networkManager.JoinMember();
                                    },
                                    function () {
                                    }
                                );
                                return;
                            }else{
                                //하트소멸은 다음단계에서하므로
                            }
                        }
                    }
                    //-----로그인 상태 체크------------in CreateLevel1IconUI //보너스아이콘

                    //자동진행시
                    uigame.state.states.menu.uiselectlevel.spMask_sel.visible=true;//더블클릭막기
                    setTimeout(function () {
                        uigame.state.states.menu.uiselectlevel.spMask_sel.visible=false;//더블클릭풀기
                        uigame.state.start('game');
                        //uiSelectLevel.visible을 true로//this.uiStartLevel.onActiveLv();
                        if (dm) console.log("start game!!!");
                    }, 250); //--> clickGameMode
                    //다음레벨로 가기-----------------------------------------
                }
                //--------------------------------------------
                break;
        }
    };
    //보너스레벨언락스파인-------------

    //좌우버튼 왼쪽버튼
    dlbg.sLeft = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_select_arrow.png"),
        undefined,
        undefined,
        -201, 450,
        undefined
    );
    dlbg.sLeft.anchor.setTo(0.5, 0.5);
    dlbg.addChild(dlbg.sLeft);//debug_Sprite(dlbg.sLeft);
    dlbg.sLeft.fnok = function () {
        if (curLevel - LV4x4 < 0) return;
        if(dm) console.log("left");
        curLevel -= LV4x4;
        grp.onUpdatePage(curLevel); //왼쪽
    };
    //오른쪽버튼
    dlbg.sRight = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_select_arrow.png"),
        undefined,
        undefined,
        201, 450,
        undefined
    );
    dlbg.sRight.sx = -1;
    dlbg.sRight.anchor.setTo(0.5, 0.5);
    dlbg.sRight.scale.setTo(-1, 1);
    dlbg.addChild(dlbg.sRight);//debug_Sprite(dlbg.sRight);
    //좌우버튼
    dlbg.sRight.fnok = function () {
        if(mask_page_lock.visible===true) return;
        var curpage = Math.floor(curLevel / LV4x4)+1; //0,0,1,2,3 -->0,1,2,3, 하려고 +1
        var maxpage = Math.floor(LEVEL_MAX / LV4x4);

        //if (curLevel + LV4x4 > LEVEL_MAX - 1) return;
        if(curpage>maxpage-1) return;
        if(dm)  console.log("right");
        curLevel += LV4x4;
        grp.onUpdatePage(curLevel);//오른쪽
    };

    //페이지잠금 창 (스파인)
    grp.z_spine_page_lock=uigame.add.spine(0, 0, "page_lock_ani"); //스파인오브젝트생성
    grp.addChild(grp.z_spine_page_lock);
    spn_page_lock = grp.z_spine_page_lock;//글로벌저장

    //페이지잠금 정보 그룹(부모)
    grp.z_page_lock = uigame.add.group();
    grp.z_page_lock.position.setTo(0,30);
    grp.addChild( grp.z_page_lock);
    page_lock_spr = grp.z_page_lock;

    //페이지잠금별
    grp.z_page_lock.z_lock_life = uigame.add.sprite(-50, 0, 'atlas_bb_ui-0', "life.png");
    grp.z_page_lock.z_lock_life.anchor.setTo(0.5,0.5);
    grp.z_page_lock.addChild(grp.z_page_lock.z_lock_life);

    //페이지잠금별수텍스트
    grp.z_page_lock.z_lock_num = uigame.add.text(30, 0, "42", style_bb_star_lock);
    grp.z_page_lock.z_lock_num.anchor.setTo(0.5,0.5);
    grp.z_page_lock.addChild(grp.z_page_lock.z_lock_num);


    grp.z_spine_page_lock.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("spn_page_lock.trackindex:0");
                //grp.visible = false; //다시 안나오는 문제가 잇어서 주석처리
                break;
            case 1:
                if(dm) console.log("spn_page_lock.trackindex:1");
                break;
            case 2:
                if(dm) console.log("spn_page_lock.trackindex:2");
                break;
            case 3:
                if(dm) console.log("spn_page_lock.trackindex:3");
                break;
            case 4:
                console.log("spn_page_lock.trackindex:4");
                //empty는 딜레이없이 실행 되버린다. //이런식 호출 spn_page_lock.setAnimationByName(4, "empty", false);
                //spn_page_lock.visible = false;//여기서 스파인숨김시 다른 애니들이 다 작동안함
                mask_page_lock.visible=false;
                kData.userDataPage[mask_page_lock_index]=1;
                break;

        }


    };

    //페이지표시
    dlbg.txPageBg = createUI9a('atlas_bb_ui-0', 'select_page.png', 0, 448, 270,  70, 20, 20, 20, 20);
    dlbg.addChild(dlbg.txPageBg); //debug_Sprite(dlbg.txPageBg);

    dlbg.txPage = uigame.add.text(0, 448+3, "0/0", style_bb_page);
    dlbg.txPage.anchor.setTo(0.5, 0.5);
    dlbg.addChild(dlbg.txPage); //debug_Sprite(dlbg.txPage);


    dlbg.uisoundonoff = createUISoundOnOff(); //버튼그림 임시초기화//사운드버튼
    dlbg.addChild(dlbg.uisoundonoff);//debug_Sprite(dlbg.uisoundonoff);
    MainsprJpSoundRoot = dlbg;
    globaluisoundonoff = dlbg.uisoundonoff;

    if (firsttime && bPhone) {
        //dlbg.uisoundonoff.visible = false; //첫시작시 숨기기
        titlesprJPSoundRoot.addChild(globaluisoundonoff);
        globaluisoundonoff.position.setTo(290, 550);
       //dlbg.uisoundonoff.visible = true;

    }
    //else {
        if (kData.bSoundBGM) {
            if (dlbg.uisoundonoff.icon.visible) dlbg.uisoundonoff.icon.visible = false; //사운드켜기 상태표시
        } else {
            if (!dlbg.uisoundonoff.icon.visible) dlbg.uisoundonoff.icon.visible = true; //사운드끄기 상태표시
        }
    //}
    //멀티버튼//플레이버튼
    var txmulti = uigame.add.text(0, 0,
        "",//GetString("multi play"),
        style60_multiplay);
    txmulti.anchor.setTo(0.5, 0.5);

    var btmulti = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_select_multy.png"),
        txmulti,
        undefined,
        0, 570,//중앙멀티버튼 //150, 400,//기존멀티버튼위치
        //243, 107,
        style60_multiplay
    );//debug_Sprite(btmulti);
    btmulti.isLock = true;
    btmulti.alpha=0;
    btmulti.name = "multibutton";
    btmulti.fnok_inner = function () {
    };
    btmulti.fnok = function () {
        //gamestate = GameState.selectmode;
        statemode = StateMode.begin;
        grp.visible = false;
        btmulti.fnok_inner();
    };
    btmulti.grp = grp;

    dlbg.btmulti = btmulti;

    // //싱글버튼제거---
    //dlbg.addChild(btsingle);
    // //싱글버튼제거---

    dlbg.addChild(btmulti);
    dlbg.name = "startshopdialog";

    //맨밑에 사탕그림 띄우기
    var _etc = uigame.add.sprite(-360, 457, 'atlas_bb_ui-0', "select_candy.png"); //debug_Sprite(_etc);
    dlbg.addChild(_etc);

    //스파인 언락 마스크
    grp.z_spinemask = uigame.add.sprite(0, -50, 'white1x1'); //포지션
    grp.z_spinemask.name = 'spinemask';
    grp.z_spinemask.width = 720;
    grp.z_spinemask.height = 900;
    grp.z_spinemask.tint = ColorSet.red;
    grp.z_spinemask.alpha = 0;//0.555;
    grp.z_spinemask.anchor.setTo(0.5, 0.5);
    grp.z_spinemask.inputEnabled = true;
    grp.addChild( grp.z_spinemask);
    grp.z_spinemask.visible =true;

    mask_page_lock=grp.z_spinemask; //전역에 저장
    //스파인 언락 마스크

    //에스피마스크-레벨선택
    var spMask_sel = uigame.add.sprite(0, 0, 'white1x1');
    spMask_sel.name = 'spMask_selectlevel';
    spMask_sel.width = 720;
    spMask_sel.height = 1280;
    spMask_sel.tint = ColorSet.blue;
    spMask_sel.alpha = 0;//0.555;
    spMask_sel.anchor.setTo(0.5, 0.5);
    spMask_sel.inputEnabled = true;
    grp.spMask_sel = spMask_sel;
    grp.addChild(spMask_sel);
    grp.spMask_sel.visible = false;
    //에스피마스크-레벨선택

    grp.onUpdatePage = function (gotolevel) { //페이지업데이트, 페이지리플레쉬 페이지새로고침


        //kdata undefined생태면 초기화를 한다. 업데이트가 안되서
        if (typeof(kData) === 'undefined' || typeof(kData.userData) === 'undefined') {
            kData.userData = []; //in initData
            for (var i = LEVEL_MAX - 1; i >= 0; --i) kData.userData[i] = -1;
            kData.userData[0] = 0; //0레벨 오픈
            //kData.userDataScore = []; //in initData
            //for (var i = LEVEL_MAX-1; i >= 0; -- i)  kData.userDataScore[i] = 0;
        }
        //언디파인 생태면 초기화를 한다. 업데이트가 안되서

        //현재 금방 오픈된 페이지 표시하려고,
        for (var i = LEVEL_MAX - 1; i >= 0; --i) {
            if (i - 1 >= 0) {
                if(kData.userData[i-1] != -1   //앞레벨값이 0~이상이고
                    && kData.userData[i] === -1) { // 지정레벨이 락상태면
                    if (kData.userData[i - 1] === 0) {
                        //앞레벨이 0인경우는 정상 // 3,3,3,0,-1 이므로
                    } else {
                        //지정레벨을 -1에서 0으로 변환 //3,3,3,-1 이므로
                        kData.userData[i] = 0;
                    }
                }
            }
        }
        
        //마지막 오픈된 레벨 인덱스 구하기 1차(0인경우)
        lastOpenedId = -1;
        for (var i = LEVEL_MAX - 1; i >= 0; --i) {
            if(lastOpenedId === -1 && kData.userData[i]===0) lastOpenedId = i;
        }
        //마지막 오픈된 레벨 인덱스 구하기 2차(0보다 큰경우)
        if(lastOpenedId === -1) {
            for (var i = LEVEL_MAX - 1; i >= 0; --i) {
                if (kData.userData[i] > -1) lastOpenedId = i;
            }
        }

        //레벨1버튼클릭시 인덱스가 curLevel에 저장 되므로,
        //현재페이지, 최대페이지 구하기
        var curpage = Math.floor(curLevel / LV4x4) + 1; //0,1,2,3 -->1,2,3, 하려고 +1
        var maxpage = Math.floor(LEVEL_MAX / LV4x4);

        //첫1페이지시 왼쪽버튼 사리지게
        if (curpage === 1) dlbg.sLeft.visible = false;
        else  dlbg.sLeft.visible = true;

        //마지막 페이지 maxpage시 오른쪽버튼 사리지게
        if (curpage > maxpage - 1) dlbg.sRight.visible = false;
        else  dlbg.sRight.visible = true;

        //가려는 레벨이 범위에 벗어나면 안되게
        if (gotolevel < 0 || gotolevel > LEVEL_MAX - 1) return;

        var page = Math.floor(gotolevel / LV4x4); //가야할 페이지, 0~시작
        var pagemax = Math.floor(LEVEL_MAX / LV4x4); //가야할 페이지,
        if (dm) console.log("page:" + page);

        //grp.dlbg.indicator.setIndicatorByPage(page);

        grp.dlbg.txPage.text = (page + 1) //현재페이지
            + "/"
            + pagemax;        //최대페이지

        //아이콘 등장 스태거적용
        if (grp.z_stagging === false) {
            grp.z_stagging = true;
            TweenMax.staggerFrom(grp.dlbg.sIcons, 0.15,
                {
                    alpha: 0,
                    //rotation:0.2,
                    //ease: Linear.easeNone,
                    ease: Power1.easeOut,//ease:Elastic.easeOut,
                    delay: 0 //첫시작1번만
                },
                0.03,//callNextTween
                function () {
                    grp.z_stagging = false;
                }//onCompleteAll
            );
        }


        for (grp._i = 0; grp._i < LV4x4; grp._i++) {

            var lvicon = grp.dlbg.sIcons[grp._i]; //아이콘1개 가져오기
            var lvidx = (page * LV4x4) + grp._i;  //페이지기준 --> 레벨 인덱스 가져오기
            var savelv1 = -1; //별갯수저장용

            savelv1 = kData.userData[lvidx];   //레벨1개 별갯수 저장 데이터 가져오기

            if (grp._i === LV4x4 - 1) {
                //보너스레벨 아이콘 처리----------
                //0:lock, 1:clear, 2:current, 3:bonus_lock, 4:bonus_clear, 5:bonus_current 6:bonus_playing
                if (savelv1 > 0)                            //깻던 레벨, 1~3개 이면
                {
                    //에러감시
                    if(typeof(bubble_levels)==='undefined') console.log("bubble_levels == undefined");
                    if(typeof(bubble_levels[lvidx])==='undefined') console.log("bubble_levels[] == undefined, "+lvidx);
                    if(typeof(bubble_levels[lvidx].option)==='undefined'){
                        pageOption = [0,0,0,0,0,0];
                        console.log("bubble_levels[lvidx].option == undefined");
                    }
                    else{
                        if(typeof(bubble_levels[lvidx].option[2])==='undefined') console.log("bubble_levels[lvidx].option[2] == undefined");
                        pageOption = bubble_levels[lvidx].option;
                    }
                    //에러감시

                    var remainheart=pageOption[2]-savelv1;
                    if (remainheart <= 0) {
                        //남은하트가 없으면 클리어
                        lvicon.onActiveIcon(4); //보너스클리어상태
                        lvicon.onSetLvIdx(lvidx);
                    } else {
                        //남은하트가 있으면 표시
                        lvicon.onActiveIcon(6); //보너스오픈만 된상태
                        lvicon.onSetHeart(remainheart);
                        lvicon.onSetLvIdx(lvidx);
                    }

                } else if (savelv1 === 0)                   //진행중인 보너스(못깬)
                {
                    //예외처리: 일반 레벨아이콘 두개 열리는 문제를 1개로 줄일려고
                    if(lastOpenedId===lvidx) {
                        lvicon.onActiveIcon(5); //보너스 오픈,선택된 상태
                        lvicon.onSetLvIdx(lvidx);

                        //오픈연출-보너스-1회성
                        if(kData.openedBak!==lvidx) {
                            spn_unlock_b.visible = true;
                            spn_unlock_b.x = lvicon.x;
                            spn_unlock_b.y = lvicon.y;
                            spn_unlock_b.addAnimationByName(4, "bonus_stage_lock_out", true);
                            kData.openedBak = lvidx; //저장
                        }
                        //오픈연출-보너스-1회성

                    }else{
                        //var remainheart = bubble_levels[lvidx].option[2] - savelv1;
                        var remainheart = pageOption[2] - savelv1;
                        lvicon.onActiveIcon(6); //보너스오픈만 된상태
                        lvicon.onSetHeart(remainheart);
                        lvicon.onSetLvIdx(lvidx);
                    }
                    //예외처리: 일반 레벨아이콘 두개 열리는 문제를 1개로 줄일려고
                } else                                      //잠긴 보너스
                {
                    lvicon.onActiveIcon(3); //bonuslock //0:lock, 1:clear, 2:current, 3:bonus_lock, 4:bonus_clear, 5:bonus_current 6:bonus_playing
                }
                //보너스레벨 아이콘 처리----------
            } else {
                //일반레벨 아이콘 업데이트--------
                if (savelv1 > 0)                            //깻던 레벨, 1~3개 이면
                {
                    lvicon.onActiveIcon(1); //오픈 모양 아이콘
                    lvicon.onSetStar(savelv1); //별갯수
                    lvicon.onSetLvIdx(lvidx); //0~시작되는  index레벨번호저장
                    lvicon.onSetLvNum(lvidx + 1 - page); //눈에 표시되는 페이크 레벨 1~15,보너스,16~30,보너스 //lvicon.onSetLvNum(lvidx + 1)
                    lvicon.onSetIcon(lvidx + 1);         //미니맵
                } else if (savelv1 === 0)                   //진행중인 레벨(못깬)
                {

                    //예외처리: 보너스 레벨아이콘에서 두개 열리는 문제를 1개로 줄일려고
                    if(lastOpenedId===lvidx) {
                        lvicon.onActiveIcon(2); //선택된 모양 아이콘
                        lvicon.onSetStar(0);
                        lvicon.onSetLvIdx(lvidx);
                        lvicon.onSetLvNum(lvidx + 1 - page); //눈에 표시되는 페이크 레벨 1~15,보너스,16~30,보너스 //lvicon.onSetLvNum(lvidx + 1)
                        lvicon.onSetIcon(lvidx + 1);         //미니맵

                        //오픈연출-보너스-1회성
                        if(kData.openedBak!==lvidx) {
                            spn_unlock_n.visible = true;
                            spn_unlock_n.x = lvicon.x;
                            spn_unlock_n.y = lvicon.y;
                            spn_unlock_n.addAnimationByName(4, "stage_lock_out", false);
                            kData.openedBak = lvidx;//저장
                        }
                        //오픈연출-보너스-1회성

                    }else{
                        //강제로 일반레벨 열기, 일반레벨에서는 여기까지  오면 안됨
                        lvicon.onActiveIcon(1);  //오픈 모양 아이콘
                        lvicon.onSetStar(0);
                        lvicon.onSetLvIdx(lvidx);
                        lvicon.onSetLvNum(lvidx + 1 - page); //눈에 표시되는 페이크 레벨 1~15,보너스,16~30,보너스 //lvicon.onSetLvNum(lvidx + 1)
                        lvicon.onSetIcon(lvidx + 1);         //미니맵
                    }
                    //예외처리: 보너스 레벨아이콘에서 두개 열리는 문제를 1개로 줄일려고

                } else                                      //안열린 레벨
                {
                    lvicon.onActiveIcon(0); //lock //0:lock, 1:clear, 2:current, 3:bonus_lock, 4:bonus_clear, 5:bonus_current 6:bonus_playing
                }
                //일반레벨 아이콘 업데이트--------
            }
        }

        //페이지 잠금 작동처리 //스파인
        var curpgidx = Math.floor(curLevel / LV4x4);
        var mystar = grp.getMyStar();
        var allstar = grp.getAllStar();
        var curpgstate = kData.userDataPage[curpgidx];

        grp.z_page_lock.z_lock_num.text = needStar[curpgidx];

        if (needStar[curpgidx]<=mystar) {
            //나의 별량이 많을때
            if(curpgstate!==1) { //0이거나 -1이면
                //닫혀진상태에서 열림상태로
                spn_page_lock.visible = true;
                mask_page_lock.visible = true;
                //spn_page_lock.setAnimationByName(0, "empty", false);
                //spn_page_lock.setAnimationByName(0, "page_lock_idle", false);
                spn_page_lock.setAnimationByName(4, "page_lock_out", false); //여기서 마스크숨김 //위치:grp.z_spine_page_lock.state.onComplete
                //spn_page_lock.setAnimationByName(4, "empty", false);
                mask_page_lock_index = curpgidx;//스파인에서 처리하게끔 넘긴다

                setTimeout(function () {
                    if(kData.bSoundSE) SE_Page_Open.play(); //페이지잠금해제사운드
                }, 750); //0.5초 뒤

                //TweenMax.fromTo( page_lock_spr.scale, 0.15, {x:1, y:1}, {x:1.5, y:1.5, ease: Linear.easeNone, delay: 0.2} );
                //TweenMax.fromTo( page_lock_spr, 0.15, {alpah:1}, {alpha: 0, ease: Linear.easeNone, delay: 0.2} );

                //TweenMax.set(page_lock_spr.scale, {x:1, y:1});
                //TweenMax.to( page_lock_spr.scale, 0.15, {x:1.5, y:1.5, ease: Linear.easeNone, delay: 0.2} );

                if (TweenMax.isTweening(page_lock_spr)) TweenMax.killTweensOf(page_lock_spr);
                TweenMax.set(page_lock_spr, {alpha:1});
                TweenMax.to( page_lock_spr, 0.75, {alpha: 0, ease: Linear.easeNone, delay: 0.2} );
            }else {
                //열린상태로 계속
                spn_page_lock.visible = false;
                mask_page_lock.visible = false;
                spn_page_lock.setAnimationByName(0, "empty", false);

                if (TweenMax.isTweening(page_lock_spr)) TweenMax.killTweensOf(page_lock_spr);
                page_lock_spr.alpha = 0;
            }
        }else if(needStar[curpgidx]>=mystar){
            //닫혀진상태로 계속 //내별이 적을때
            spn_page_lock.visible = true;
            mask_page_lock.visible = true;
            spn_page_lock.setAnimationByName(1, "page_lock_idle", false);

            if (TweenMax.isTweening(page_lock_spr)) TweenMax.killTweensOf(page_lock_spr);
            page_lock_spr.alpha = 1;
        }
        //페이지잠금 작동처리 //스파인


    };//onUpdatePage

    //인디케이터표시
    // dlbg.indicator = CreateUIIndicator();
    // dlbg.addChild(dlbg.indicator);
    // dlbg.indicator.y = 450;


    return grp;
}
//예스노 메세지 박스 생성
function createUIYesNo(xp, yp, yesnomode) {
    var grp = uigame.add.group();
    //grp.alpha = 0.5;
    // //grp.scale.set(1,1);
    // //grp.x=100;

    //투명배경
    var darkbg = uigame.add.sprite(xc, yc, 'white1x1');
    darkbg.name = 'darkbgyesno';
    grp.bg = darkbg;
    grp.addChild(darkbg);

    darkbg.width = 720;
    darkbg.height = 1280;
    darkbg.tint = ColorSet.black;
    darkbg.alpha = 0.5;
    darkbg.anchor.setTo(0.5, 0.5);
    grp.addChild(darkbg);
    darkbg.inputEnabled = true;
    //투명배경

    if (xp == undefined) xp = xc;
    if (yp == undefined) yp = yc;
    //원본슬라이스
    //var resultbg9 = loadUI9('popup_message_nine', xp,yp, 571, 421); //결과창
    //테스트슬라이스//
    var resultbg9 = createUI9a('ui0', 'popup_message.png', xp, yp, 571, 421, 42, 52, 50, 57); //결과창
    //debug_Sprite(resultbg9);
    resultbg9.scale.setTo(0.5, 0.5);

    //원본슬라이스
    //var inresultbg9 = loadUI9('list_ready_nine', -3,-62, 468, 203); //결과이너창
    //테스트슬라이스
    var inresultbg9 = createUI9a('ui0', 'list_ready.png', -3, -62, 468, 203, 14, 14, 14, 14); //결과이너창
    //debug_Sprite(inresultbg9);

    var txComment = uigame.add.text(0, -58, "알 수 없는 에러가\n발생하여 시스템에\n문제가 생겼습니다.", {
            font: "30px Conv_PassionOne-Regular",
            fill: hex2str(ColorSet.white),
            align: "center",
            stroke: '#3C2B00',
            strokeThickness: 6
        }
    );
    txComment.anchor.setTo(0.5, 0.5);
    //debug_Sprite(txComment);

    resultbg9.addChild(inresultbg9);
    resultbg9.addChild(txComment);

    //버튼예스
    var txok = uigame.add.text(0, 0, GetString("yes"), style60);
    txok.anchor.setTo(0.5, 0.5);
    //var ybt = createbtn( loadUI9('yes_nine', 0, 0, 225, 109),
    var singlepos = yesnomode ? 125 : 0;
    var ybt = createbtn(createUI9a('ui0', 'btn_message_ok.png', 0, 0, 225, 109, 24, 32, 24, 32),//오케이버튼
        txok,
        undefined,
        singlepos, 110,
        //243, 107,
        style60
    );
    //debug_Sprite(ybt);
    ybt.fnok = function () {
        if (dm) console.log("yes!!!");
    };
    resultbg9.addChild(ybt);
    resultbg9.ok = ybt;

    if (yesnomode) { //싱글버튼모드면 노버튼생성안함
        //버튼노
        var txno = uigame.add.text(0, 0, GetString("no"), style60);
        txno.anchor.setTo(0.5, 0.5);
        //var nbt = createbtn( loadUI9('no_nine', 0, 0, 225, 109),
        var nbt = createbtn(createUI9a('ui0', 'btn_message_no.png', 0, 0, 225, 109, 24, 32, 24, 32),//노버튼
            txno,
            undefined,
            -125, 110,
            style60
        );
        //debug_Sprite(nbt);
        nbt.fnok = function () {
            if (dm) console.log("no!!!");
        };
        resultbg9.addChild(nbt);
        resultbg9.no = nbt;
    }

    resultbg9.txt = txComment;
    grp.addChild(resultbg9);
    return grp;
}
//구매결과창생성
function createUIShopResult() {
    var grp = uigame.add.group();
    //grp.alpha = 0.5;
    // //grp.scale.set(1,1);
    // //grp.x=100;

    //투명배경
    var darkbg = uigame.add.sprite(xc, yc, 'white1x1');
    darkbg.name = 'darkbgshopresult';
    grp.bg = darkbg;
    darkbg.width = 720;
    darkbg.height = 1280;
    darkbg.tint = ColorSet.black;
    darkbg.alpha = 0.5;
    darkbg.anchor.setTo(0.5, 0.5);
    darkbg.inputEnabled = true;
    grp.addChild(darkbg);
    //투명배경

    //다이얼로그
    var dlgbg9 = createUI9a('atlas_bb_ui_dlg-0', 'popup_message.png', xc, yc, 571, 421, 42, 52, 50, 57); //샵결과창
    dlgbg9.scale.setTo(1, 1);
    grp.dlgbg9 = dlgbg9;
    grp.addChild(dlgbg9);
    //이너창
    var inresultbg9 = createUI9a('atlas_bb_ui-0', 'list_shop_2.png', 0, -92, 363, 150, 20, 20, 0, 0);  //샵배경

    //하트그림
    var sprGold = uigame.add.sprite(-117, -150, 'atlas_bb_ui-0', "heart_2.png");

    //debug_Sprite(sprGold);
    //코인갯수
    var txCnt = uigame.add.bitmapText(157, -145, 'shop_no-export', "x8", 70, undefined);
    txCnt.anchor.setTo(1, 0.5);
    grp.txCnt = txCnt;//debug_Sprite(txCnt);

    var txComment = uigame.add.text(0, 25, GetString("gotcoin", 8), style_40_result);
    txComment.anchor.setTo(0.5, 0.5);
    grp.txComment = txComment;//debug_Sprite(txComment);

    var ybt = createbtn(createUI9a('atlas_bb_ui-0', 'btn_yes.png', 0, 0, 275, 108, 55, 55, 0, 0),
        uigame.add.text(0, 0, GetString("ok"), style55_ok_big),
        undefined,
        0,
        128,
        style60
    );//debug_Sprite(ybt);
    ybt.fnok = function () {
        if (dm) console.log("yes!!!");
        grp.visible = false;
    };

    dlgbg9.addChild(inresultbg9);
    dlgbg9.addChild(sprGold);
    dlgbg9.addChild(txCnt);
    dlgbg9.addChild(txComment);
    dlgbg9.addChild(ybt);
    //resultbg9.addChild(nbt);

    dlgbg9.ok = ybt;
    //resultbg9.no=nbt;
    dlgbg9.txt = txComment;
    dlgbg9.txtcnt = txCnt;
    dlgbg9.sprgold = sprGold;


    grp.onRefreshShopResult = function (itemcount, pngname) {
        grp.txCnt.text = "x" + itemcount;
        grp.txComment.text = GetString("gotcoin", itemcount);
        grp.dlgbg9.sprgold.loadTexture('atlas_bb_ui-0', pngname);
    };

    grp.onOpen = function () {
        if(kData.bSoundSE) SE_Popup_ON.play();
        onFadein(grp.bg, 0.75);
        onFadeinScale(grp.dlgbg9, function () {
        });
        grp.visible = true;
    };

    return grp;
}
//클릭시 disable버튼으로 변경,타이머 버튼 등장
function createbtnDisable(x, y, onoff, btn, btnD, fn) {

    var grp = uigame.add.group();
    grp.x = x;
    grp.y = y;

    grp.btn = btn;
    grp.btnD = btnD;

    grp.addChild(btn);
    grp.addChild(btnD);

    btnD.inputEnabled = false;

    if (onoff) {
        btn.visible = true;
        btnD.visible = false;
    } else {
        btn.visible = false;
        btnD.visible = true;
    }

    btn.fnok = function () {
        var condition = true;
        if (condition) {
            btn.visible = false;
            btnD.visible = true;
            if (fn) fn();
        }
    };

    btnD.fnok = function () {
        // var condition = true;
        // if(condition) {
        //     btn.visible = true;
        //     btnD.visible = false;
        //
        // }
    };
    //debug_Sprite(grp); //err
    return grp;
}

//샵슬롯1개 생성
//     slotname, 슬롯bg인자  string
//     img,      하트그림png string
//     cnt,      획득갯수    string
//     btbg,     버튼배경    string
//     bttx,     버튼text   string
//     btimg,    버튼배경    string
//     membersonly,
//     heartindex


// s3.slgold   //------골드 그림
// s3.slcnt    //------골드 갯수
// s3.btntx    //-----버튼 텍스트
// s3.btnicon  //-----버튼 이미지
// s3.member   //-----회원전용텍스트
// s3.btn      //활성버튼
// s3.btnD     //비활성버튼(시계버튼)
function createSlotShop1(slotname, img, cnt, btbg, bttx, btimg, membersonly, heartindex) {
    //슬롯배경
    var png = slotname === 'slot0' ? 'list_shop_1.png'//샵슬롯-맨위
        : slotname === 'slot1' ? 'list_shop_2.png'     //샵슬롯
            : 'list_shop_2.png';
    var s3 = createUI9a('atlas_bb_ui-0', png, 0, 0, 598, 150, 20, 20, 0, 0);  //샵배경

    s3.heartindex = heartindex;
    //debug_Sprite(s3);

    //코인그림
    var slgold = uigame.add.sprite(-160, -1, 'atlas_bb_ui-0', img); //여기말고 따로 로딩한다
    s3.addChild(slgold);
    slgold.anchor.setTo(0.5, 0.5);
    s3.slgold = slgold; //------골드 그림
    //debug_Sprite(slgold);

    //코인갯수
    var slcnt = uigame.add.bitmapText(54, -20, 'shop_no-export', cnt, 70, undefined);
    slcnt.anchor.setTo(1, 0.5);
    s3.slcnt = slcnt; //------골드 갯수
    s3.addChild(slcnt); //debug_Sprite(slcnt);

    //구매버튼 활성버튼-----------------
    var btn = createbtn(createUI9a('atlas_bb_ui-0', btbg, 0, 0, 210, 86, 45, 56, 0, 0),
        (bttx === undefined ? undefined : uigame.add.text(0, 0, bttx, style_45_price)),  //회원전용 경우(ad도 포함)
        (btimg === undefined ? undefined : uigame.add.sprite(0, 0, 'atlas_bb_ui-0', btimg)),//광고전용 경우
        0, 0,
        style60
    );
    s3.btn = btn; //<<---활성버튼
    //무비아이콘이 밑으로 조금 내려와서 올림
    if (btn.icon !== undefined) btn.icon.y = -7;
    //구매버튼 활성버튼-----------------

    //시계버튼 비활성버튼-----------
    var btnD = createbtn(createUI9a('atlas_bb_ui-0', 'btn_shop_3.png', 0, 0, 210, 86, 45, 56, 0, 0),
        uigame.add.text(0, 0, (shopListData[heartindex].Price !== 0 ? bttx : "00:00"), style_45_price),
        undefined,
        0, 0,
        style60
    );
    s3.btnD = btnD; //<<---비활성버튼
    //시계버튼 비활성버튼-----------

    //슬롯 전용 버튼 기능------
    s3.setBtnOn = function () { //클릭시 ->버튼활성되고
        s3.btPurchase.btn.visible = true; //btPurchase는 버튼2개를 가지고 잇는 오브젝트
        s3.btPurchase.btnD.visible = false;//btPurchase는 버튼2개를 가지고 잇는 오브젝트
    };
    s3.setBtnOff = function () { //클릭시 ->버튼비활성되고
        s3.btPurchase.btn.visible = false;
        s3.btPurchase.btnD.visible = true;
        var aa = s3.btPurchase.btnD.tx.text;
        if(dm) console.log(aa);
    };
    //슬롯 전용 버튼 기능------

    //돈이 부족하면 오프
    s3.onRefreshSlot1 = function () {
        if (loginTF === 1) {                                          //로그인상태

            if (proto.serPos === 0              //모비서비스
                ||proto.serPos === 1) {              //야후서비스
                //grp.pttx.text = getMoneyFormatFromNum(kData.greappoint);
                if (kData.greappoint < shopListData[s3.heartindex].Price) {
                    s3.setBtnOff();
                } else {
                    s3.setBtnOn();
                }
            }
        }
        else//if(loginTF == 0){ //비로그인
        {
            if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스

            } else {//비회원

            }
        }

    };

    //슬롯전용버튼이므로 btn과 btnD가 있다
    s3.btnfnok = function () { //상점버튼클릭시

        //shop모드별대응
        var uiresult;
        var uiplus;
        var uishop;
        if(uishopinmenu) {
            uishop =  uigame.state.states.menu.uishop;
            uiresult = uigame.state.states.menu.uishopresult;
            uiplus = uigame.state.states.menu.uishopplus;
        }
        else
        {
            uishop =  uigame.state.states.game.uiController.uishop;
            uiresult = uigame.state.states.game.uiController.uishopresult;
            uiplus = uigame.state.states.game.uiController.uiMain.z_shopplus;
        }
        //shop모드별대응



        //혜관님광고클릭시---
        if (shopListData[s3.heartindex].pType === "ad_1") {
            //this.txt_pay.visible = false;
            console.log("혜관님광고클릭1!!");
            if (isApp) window.parent.postMessage({adStatus: 0}, "*");//전면 광고
        } else if(shopListData[s3.heartindex].pType === "ad_2"){
            console.log("혜관님광고클릭2!!");
            if (isApp) window.parent.postMessage({adStatus: 1}, "*");//비디오 광고
        }
        //혜관님광고클릭시---

        if (loginTF === 1) {                                             //로그인상태
            if (proto.serPos === 0              //모비서비스
            ||proto.serPos === 1)              //야후서비스
            {
                s3.setBtnOn(); //바이하트에서 광고버튼이면 꺼짐으로 바꿈

                // //버튼상태 바꾸기-----
                // if(shopListData[s3.heartindex].Price ===0) { //광고버튼
                //     //로컬모드에서 가짜 타이머돌기 //클릭시 꺼짐
                //     //s3.setBtnOn();//원래주석인데, 풀면 일반버튼됨
                //     curDate = Date.now();
                //     kData.btn1TimeStamp = parseInt(curDate.toString().substring(0, 10));//kData.btn1TimeStamp
                //     networkManager.ForcedSaveData();
                // }
                // else
                // {   //일반버튼
                //     s3.setBtnOn();
                // }
                // //버튼상태 바꾸기-----

                //다른버튼들 활성,비활성한다.
                for (var i = 0; i < 4; i++) {
                    //돈이 부족하면 오프
                    uigame.state.states.menu.uishop.slots[i].onRefreshSlot1(); //가진포인트가 적으면, 비활성 시킨다
                }

                //이미 클릭한 뒤라 체크 할필요 없음: s3.btPurchase.btn.visible===true
                heartController.BuyHeart(s3.heartindex);


                //에스피마스크실행-샵
                uigame.state.states.menu.uishop.spMask.visible = true;
                setTimeout(function () {
                    uigame.state.states.menu.uishop.spMask.visible = false;
                }, 500);
                //에스피마스크실행-샵
            }//모비,야후

        }
        else if(loginTF === 0){ //비로그인
            if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
                //로컬서비스는 가짜 결제로
                uiresult.onRefreshShopResult( shopListData[s3.heartindex].Quantity, shopListData[s3.heartindex].icon );

                uiresult.onOpen();//로컬에서 구매
                //if (bSoundSE) SE_BuyItem.play();            //아이템 구매 사운드           --아이템을 구매하였을 때 사운드


                //원래 하트추가는 networkManager.Payment에서 하는데...
                //하트 가짜 충전(포인트,광고 전부다)
                kData.iHeart+= str2int(shopListData[s3.heartindex].Quantity);//로컬호스트상태
                uiplus.onRefresh();

                //버튼상태 바꾸기-----
                if(shopListData[s3.heartindex].Price ===0) { //광고버튼
                    s3.setBtnOff();
                    //로컬모드에서 가짜 타이머돌기 //클릭시 꺼짐
                    //s3.setBtnOn();//원래주석인데, 풀면 일반버튼됨
                    curDate = Date.now();
                    if(s3.heartindex==2) kData.btn1TimeStamp = parseInt(curDate.toString().substring(0, 10));//kData.btn1TimeStamp
                    if(s3.heartindex==3) kData.btn2TimeStamp = parseInt(curDate.toString().substring(0, 10));//kData.btn1TimeStamp
                }
                else
                {   //일반버튼
                    s3.setBtnOn();
                }
                //버튼상태 바꾸기-----

            } else {
                //비회원비로그인상태
                s3.setBtnOn();
                if(shopListData[s3.heartindex].Price ===0) { //광고버튼시
                    if (dm) console.log("Payment-피씨모드:" + GetShpMsg("gotogpg"));//구글플레이로(b_isAD = true;)
                    //비로그인시 광고 클릭//
                    s3.setBtnOff();
                    kData.iHeart+= str2int(shopListData[s3.heartindex].Quantity);//비로그인상태
                    curDate = Date.now();
                    if(s3.heartindex==2) kData.btn1TimeStamp = parseInt(curDate.toString().substring(0, 10));//kData.btn1TimeStamp
                    if(s3.heartindex==3) kData.btn2TimeStamp = parseInt(curDate.toString().substring(0, 10));//kData.btn1TimeStamp

                    if(false) {
                        networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg("gotogpg"),
                            function () {
                                networkManager.JumpGooglePlay();
                            },
                            function () {
                            }
                        );
                    }
                }else{
                    //비로그인시 포인트 클릭//
                    if (dm) console.log("포인트클릭시:" + GetShpMsg("signup"));
                    networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),//상점
                        function () {
                            networkManager.JoinMember();
                        },
                        function () {
                        }
                    );
                }
                uiplus.onRefresh();
            }

            networkManager.ForcedSaveData();//로그인때는 buyheart에서 저장

            //비회원일때, 로컬일때
            //에스피마스크실행-샵
            uishop.spMask.visible = true;
            setTimeout(function () {


                uishop.spMask.visible = false;
            }, 500);
            //에스피마스크실행-샵
        }
    };
    //버튼2개를 교대로 온오프한다.
    var btPurchase = createbtnDisable(180, 0, true, btn, btnD, s3.btnfnok);//x, y, onoff, btn, btnD, fn //function(){console.log("-----");}
    s3.addChild(btPurchase);
    s3.btPurchase = btPurchase;

    //코리안폰트스타일로 변경 //샾슬롯
    switch(CURRENT_LANGUAGE) {
        case LANGUAGE_ENG:
            break;
        case LANGUAGE_JPN:
            break;
        case LANGUAGE_KOR:
            style_30_member = {                         //하트샵슬롯"회원전용"
                font: "bold 30px gulim",
                fill: hex2str(ColorSet.white),
                align: "center",
                stroke: ColorSet.black,
                strokeThickness: 6
            };
            break;
    }
    //코리안폰트스타일로 변경

    var txmember = uigame.add.text(-208, -33, membersonly, style_30_member);
    txmember.anchor.setTo(0.5, 0.5);
    s3.addChild(txmember);
    s3.member = txmember; //-----회원전용텍스트
    //debug_Sprite(member);
    //debug_Sprite(btn);
    //debug_Sprite(btnD);
    return s3;
}

//샵아이템배열
// var shopitemlist = [
//     {id: "", icon: "heart_1.png", quantity: "5", price: "200", buttonicon: "", member: GetString("memberonly")},
//     {id: "", icon: "heart_3.png", quantity: "25", price: "1000", buttonicon: "", member: GetString("memberonly")},
//     {id: "", icon: "heart_1.png", quantity: "5", price: "0", buttonicon: "ad.png", member: ""},  //그림버튼
//     {id: "", icon: "heart_3.png", quantity: "7", price: "0", buttonicon: "movie.png", member: ""}    //그림버튼
// ];

// if(dm) console.log("~ ~ sHeartShop.itemList: "
// +sHeartShop.itemList["0"]["icon"]+", "
// +sHeartShop.itemList["0"]["tx"]+", "
// +sHeartShop.itemList["0"]["button"]+", "
// +sHeartShop.itemList["0"]["value"]+", "
// );

function createUIShop() {
    var grp = uigame.add.group();

    //grp.scale.setTo(0.5,0.5);
    //grp.alpha = 0.5;
    //grp.scale.set(1,1);            //grp.x=100;

    //투명배경
    var bg = uigame.add.sprite(0, 0, 'white1x1');
    bg.name = 'bguishop';
    grp.bg = bg;
    grp.addChild(bg);
    bg.width = 720;
    bg.height = 1280;
    bg.tint = ColorSet.black;
    bg.alpha = 0.5;
    bg.anchor.setTo(0.5, 0.5);
    bg.inputEnabled = true;
    //투명배경

    //삽배경다이얼로그
    // var dlgbg9 = createUI9a('ui0', 'popup_shop.png', xc, yc, 656, 981, 40, 40, 150, 180); //샵배경
    // grp.dlgbg9 = uigame.add.sprite(xc, yc, 'atlas_bb_ui_dlg-0', 'popup_shop.png');
    // grp.dlgbg9.anchor.setTo(0.5, 0.5);
    // grp.dlgbg9.scale.setTo(1, 1);
    // grp.addChild(grp.dlgbg9);//debug_Sprite(dlgbg9);

    //상하로 나뉜 배경
    grp.dlgbg9 = uigame.add.group();
    grp.position.setTo(xc,yc);
    grp.dlgbg9.scale.setTo(1, 1);
    grp.addChild(grp.dlgbg9);//debug_Sprite(dlgbg9);

    grp.dlgbg9_b = uigame.add.sprite(0, 145, 'atlas_bb_ui_dlg-0', 'popup_shop_bottom.png');
    grp.dlgbg9_b.anchor.setTo(0.5, 0.5);
    grp.dlgbg9.addChild(grp.dlgbg9_b); //debug_Sprite(grp.dlgbg9_b);

    grp.dlgbg9_t = uigame.add.sprite(0, -347, 'atlas_bb_ui_dlg-0', 'popup_shop_top.png');
    grp.dlgbg9_t.anchor.setTo(0.5, 0.5);
    grp.dlgbg9.addChild(grp.dlgbg9_t); //debug_Sprite(grp.dlgbg9_t);
    //상하로 나뉜 배경

    //샵타이틀
    var title = uigame.add.text(0, -395, 'HEART SHOP', style_shoptitle);
    //var title = uigame.add.sprite(-7, -430, 'ui0', 'title_shop.png');
    title.anchor.setTo(0.5, 0.5);
    grp.dlgbg9.addChild(title); //debug_Sprite(title);

    //샵dlg안의 포인트bg
    //var pt = uigame.add.sprite(-4, -253, 'ui0', 'point.png');
    var pt = createUI9a('atlas_bb_ui-0', 'point_bg.png', 20, -253, 257, 69, 24, 24, 24, 24);
    pt.anchor.setTo(0.5, 0.5);
    pt.inputEnabled = true;
    grp.dlgbg9.addChild(pt); //debug_Sprite(pt);

    pt.events.onInputDown.add(function () { //다운 //포인트클릭시
        if (dm) console.log("포인트클릭시:" + GetShpMsg("signup"));
        if (loginTF == 0) { //게스트모드
            if (networkManager.networkState == NET_STATE.LOCALHOST) {//로컬서비스

            } else {//비회원
                networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'), //상점 포인트클릭
                    function () {
                        networkManager.JoinMember();
                    },
                    function () {
                    }
                );
            }
        }
    }, this);


    //샵포인트 동전그림
    grp.spPoint = uigame.add.sprite(-120, 1, 'atlas_bb_ui-0', 'point.png');
    grp.spPoint.anchor.setTo(0.5, 0.5);
    grp.spPoint.scale.setTo(1, 1);
    pt.addChild(grp.spPoint);
    //debug_Sprite(grp.spPoint);



    //코리안폰트스타일로 변경 //엠코인표시
    switch(CURRENT_LANGUAGE)
    {
        case LANGUAGE_ENG:
            break;
        case LANGUAGE_JPN:
            break;
        case LANGUAGE_KOR:
            if(loginTF===0) {
                style45_shoppoint = {                             //하트샵 포인트값,"회원전용"
                    font: "bold 45px gulim",
                    fill: hex2str(ColorSet.white),
                    align: "center",
                    stroke: '#7D0000',
                    strokeThickness: 6
                };
            }
            break;
    }
    //코리안폰트스타일로 변경

    //샵dlg안의 포인트text
    var pttx = uigame.add.text(115, 3, '1,110,000', style45_shoppoint);
    pttx.anchor.setTo(1, 0.5);
    grp.pttx = pttx;
    pt.addChild(pttx);////debug_Sprite(pttx);


    grp.slots = [];


    if(nvmode==false) {
      //   var tx = "x"+shopListData[i].Quantity; //갯수가져오기
      //  var btn = ""+shopListData[i].Price+"P"; //포인트가져오기
      // var q = ""+shopListData[i].Quantity;
    }

    //샵슬롯1개 생성
//     slotname, 슬롯bg인자  string
//     img,      하트그림png string
//     cnt,      획득갯수    string
//     btbg,     버튼배경    string
//     bttx,     버튼text   string
//     btimg,    버튼배경    string
//     membersonly,
//     heartindex



    // if(shopListData.length ===1){
    //     shopListData[0].icon="heart_1.png";
    //     shopListData[0].pType = "point";
    //     shopListData[0].Price = 10;
    //     shopListData[0].Quantity = 1;
    //     shopListData[1] = shopListData[0];
    //     shopListData[2] = shopListData[0];
    //     shopListData[3] = shopListData[0];
    // }

    if(shopListData.length ===1){
        shopListData = [
            {icon:"heart_1.png", pType:"point", Price:10, Quantity:3},
            {icon:"heart_2.png", pType:"point", Price:20, Quantity:6},
            {icon:"heart_3.png", pType:"ad_1", Price:0, Quantity:9},
            {icon:"heart_4.png", pType:"ad_2", Price:0, Quantity:12},
        ]

    }

// s3.slgold   //------골드 그림
// s3.slcnt    //------골드 갯수
// s3.btntx    //-----버튼 텍스트
// s3.btnicon  //-----버튼 이미지
// s3.member   //-----회원전용텍스트

    //슬롯0
    var s0 = createSlotShop1('slot1',//'slot0',
        //구입물품 아이콘
        shopListData[0].icon,
        //갯수표시
        "x"+shopListData[0].Quantity,
        //버튼배경
        'btn_shop_2.png',//'btn_shop_1.png',
        //가격표시
        (shopListData[0].pType.indexOf("ad_")>-1 && shopListData[0].pType.indexOf("_1")>-1?"AD"//text
        :shopListData[0].Price === 0? undefined
        :shopListData[0].Price+"P"),
        //동영상광고아이콘
        (shopListData[0].pType.indexOf("ad_")>-1 && shopListData[0].pType.indexOf("_2")>-1?"movie.png"
        :undefined),
        //회원전용텍스트
        (shopListData[0].pType.indexOf("member")>-1?GetString("memberonly")
        :shopListData[0].pType.indexOf("point")>-1?""
        :""),
        0
    );//onRefreshInitShop에서 바뀜
    grp.dlgbg9.addChild(s0);
    s0.position.setTo(0, -178 + 45);
    grp.slots.push(s0);

    //슬롯1
    var s1 = createSlotShop1('slot1',//'slot0',
        //구입물품 아이콘
        shopListData[1].icon,
        //갯수표시
        "x"+shopListData[1].Quantity,
        //버튼배경
        'btn_shop_2.png',//'btn_shop_1.png',
        //가격표시
        (shopListData[1].pType.indexOf("ad_")>-1 && shopListData[1].pType.indexOf("_1")>-1?"AD"//text
        :shopListData[1].Price === 0? undefined
        :shopListData[1].Price+"P"),
        //동영상광고아이콘
        (shopListData[1].pType.indexOf("ad_")>-1 && shopListData[1].pType.indexOf("_2")>-1?"movie.png"
        :undefined),
        //회원전용텍스트
        (shopListData[1].pType.indexOf("member")>-1?GetString("memberonly")
        :shopListData[1].pType.indexOf("point")>-1?""
        :""),
        1
    );//onRefreshInitShop에서 바뀜
    grp.dlgbg9.addChild(s1);
    s1.position.setTo(0, -35 + 45);
    grp.slots.push(s1);

    //슬롯2
    var s2 = createSlotShop1('slot1',
        //구입물품 아이콘
        shopListData[2].icon,
        //갯수표시
        "x"+shopListData[2].Quantity,
        //버튼배경
        'btn_shop_2.png',
        //가격표시
        (shopListData[2].pType.indexOf("ad_")>-1 && shopListData[2].pType.indexOf("_1")>-1?"AD"//text
        :shopListData[2].Price === 0? undefined
        :shopListData[2].Price+"P"),
        //동영상광고아이콘
        (shopListData[2].pType.indexOf("ad_")>-1 && shopListData[2].pType.indexOf("_2")>-1?"movie.png"
        :undefined),
        //회원전용텍스트
        (shopListData[2].pType.indexOf("member")>-1?GetString("memberonly")
        :shopListData[2].pType.indexOf("point")>-1?""
        :""),
        2
    );   //onRefreshInitShop에서 바뀜
    grp.dlgbg9.addChild(s2);
    s2.position.setTo(0, 109 + 45);
    grp.slots.push(s2);

    //remainText1 = s2.btnD.tx;//타임버튼연결,타임글자연결

    //슬롯3
    var s3 = createSlotShop1('slot1',
        shopListData[3].icon,
        //갯수표시
        "x"+shopListData[3].Quantity,
        //버튼배경
        'btn_shop_2.png',
        //가격표시
        (shopListData[3].pType.indexOf("ad_")>-1 && shopListData[3].pType.indexOf("_1")>-1?"AD"//text
        :shopListData[3].Price === 0? undefined
        :shopListData[3].Price+"P"),
        //동영상광고아이콘
        (shopListData[3].pType.indexOf("ad_")>-1 && shopListData[3].pType.indexOf("_2")>-1?"movie.png"
        :undefined),
        //회원전용텍스트
        (shopListData[3].pType.indexOf("member")>-1?GetString("memberonly")
        :shopListData[3].pType.indexOf("point")>-1?""
        :""),
        3
    );//onRefreshInitShop에서 바뀜
    grp.dlgbg9.addChild(s3);
    s3.position.setTo(0, 252 + 45);
    grp.slots.push(s3);

    //remainText2 = s3.btnD.tx;//타임버튼연결,타임글자연결
    //상점4개버튼함수


    //오케이버튼
    var btnok = createbtn(createUI9a('atlas_bb_ui-0', 'btn_yes.png', 0, 0, 275, 108, 55, 55, 0, 0),
        uigame.add.text(0, 0, GetString("ok"), style55_ok_big),
        undefined,
        0,
        442,
        style60
    );
    grp.dlgbg9.addChild(btnok);

    btnok.fnok = function () {
        if(kData.bSoundSE) SE_Popup_OFF.play();

        uigame.state.states.menu.uishop.spMask.visible = true; //범용 샵마스크 나오기
        // setTimeout(function () {
        //     uigame.state.states.menu.uishop.spMask.visible = false;
        // }, 500);
        //범용 샵마스킹테스트

        // var stgame = uigame.state.states.game;
        // var dlg =stgame.uiController.uiGameOver.z_dlg;
        // var bg = stgame.uiController.uiGameOver.z_bg;

        //TweenMax.delayedCall(0.5,function() {

        onFadeout(grp.bg, 0.75);
        onFadeoutScale(grp.dlgbg9, function () {
            if(typeof(uigame.state.states.menu.uishop) !== 'undefined') {
                uigame.state.states.menu.uishop.spMask.visible = false;//범용 샵마스크 사라지기
            }

            grp.visible = false; //상점UI패널 숨기기

            if(typeof(uigame.state.states.game.uiController) !== 'undefined'
                && uigame.state.states.game.uiController !== null
            ) {
                //메인메뉴시 일시정지 속도목구
                var stgame = uigame.state.states.game;
                stgame.uiController.uipause.visible = false;
                ispausemode = false; //메인창-일시정지닫기-->인풋풀기
                stgame.massiveController.onPauseLoadVelocity();
                //메인메뉴시 일시정지 속도 목구
            }

        });

        //});

    };

    grp.onRefreshInitShop = function () { //상점 그림,골드, 이름,회원전용 리프레쉬
        //버튼4개의 글자,이미지를 테이블데이터에서 가져와서 업데이트 
        for (var i = 0; i < 4; i++) {
            // //------골드 그림
            // grp.slots[i].slgold.loadTexture('atlas_bb_ui-0', shopListData[i].icon);
            // //------골드 갯수
            // grp.slots[i].slcnt.text = "x" + shopListData[i].Quantity;
            // //-----포인트 버튼 텍스트
            // if (grp.slots[i].btn.tx !== undefined) { //버튼의 텍스트가 있으면
            //     if (i === 2) { //ad만 예외처리
            //         grp.slots[2].btn.tx.text = "AD";
            //         //grp.slots[2].btnD.tx.text = "00:00";
            //     } else {
            //         grp.slots[i].btn.tx.text = getMoneyFormatFromNum(shopListData[i].Price) + "P";
            //         grp.slots[i].btnD.tx.text = getMoneyFormatFromNum(shopListData[i].Price) + "P";
            //     }
            // }
            //-----ad,mov 아이콘적용
            //if (grp.slots[i].btnicon !== undefined) { //버튼의 이미지가 있으면
            //    grp.slots[i].btnicon.loadTexture('atlas_bb_ui-0', shopListData[i].icon);  //-----버튼 이미지
            //}
            //-----슬롯왼쪽위 회원전용 텍스트
            //grp.slots[i].member.text = shopListData[i].icon;   //-----회원전용텍스트
        }
        //-----중앙위 회원포인트값Text
        if (loginTF === 1) {                                          //로그인상태
            if (proto.serPos === 0              //모비서비스
                ||proto.serPos === 1) {              //야후서비스
                grp.pttx.text = getMoneyFormatFromNum(kData.greappoint);
            }
        } else { //비로그인

            if (networkManager.networkState == NET_STATE.LOCALHOST) {//로컬서비스
                //grp.pttx.text = "로컬-local";
                //grp.pttx.text = kData.greappoint;
                grp.pttx.text = GetString("memberonly");
            } else {                                                 //비로그인서비스
                grp.pttx.text = GetString("memberonly");
            }

        }
        //grp.slots[0].btn.tx.text = "sdsfsf";
        //grp.slots[0].btn.visible = false;
        //grp.slots[0].btnD.visible = true;
    };
    grp.onRefreshShop = function () { //상점 포인트금액과 값을 비교 검사
        if(uishopinmenu){
            remainText1inmenu = grp.slots[2].btnD.tx;//타임버튼연결,타임글자연결
            remainText2inmenu = grp.slots[3].btnD.tx;//타임버튼연결,타임글자연결
        }else{
            remainText1ingame = grp.slots[2].btnD.tx;//타임버튼연결,타임글자연결
            remainText2ingame = grp.slots[3].btnD.tx;//타임버튼연결,타임글자연결
        }
        if (loginTF === 1) {                                          //로그인상태
            if (proto.serPos === 0              //모비서비스
                ||proto.serPos === 1) {              //야후서비스
                for (var i = 0; i < 4; i++) {
                    //grp.slots[i].onRefreshSlot1(); //가진포인트가 적으면, 비활성 시킨다
                    //if(kData.btn1TimeStamp!=null) grp.slots[2].setBtnOff();
                    //if(kData.btn2TimeStamp!=null) grp.slots[3].setBtnOff();
                }
            }
        }
        else//if(loginTF == 0){ //비로그인
        {
            if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스

            } else {//비회원
                //비회원이면 비황성은 여기서 하지 말자
                // for (var i = 0; i < 4; i++) {
                //     if(shopListData[i].pType==="member") grp.slots[i].btnoff();
                // }
            }
        }
        //모든리프레쉐ㅐ
        if(uishopinmenu){
            remainText1inmenu = grp.slots[2].btnD.tx;//타임버튼연결,타임글자연결
            remainText2inmenu = grp.slots[3].btnD.tx;//타임버튼연결,타임글자연결
        }else{
            remainText1ingame = grp.slots[2].btnD.tx;//타임버튼연결,타임글자연결
            remainText2ingame = grp.slots[3].btnD.tx;//타임버튼연결,타임글자연결
        }
        for (var i = 0; i < 4; i++) {
            grp.slots[i].onRefreshSlot1(); //가진포인트가 적으면, 비활성 시킨다
            if(kData.btn1TimeStamp!=null) grp.slots[2].setBtnOff();
            if(kData.btn2TimeStamp!=null) grp.slots[3].setBtnOff();
        }
    };

    grp.onGetList = function () {
        //샵리스트가져오기
        networkManager.GetShoplist(ShopType.HEART, function () {
            if (networkManager.networkState == NET_STATE.LOCALHOST) return;

            for (var i = 0; i < 4; ++i) {

                if (true) {
                    if (loginTF == 1) { //로그인상태
                        if (servicePos == 0) { //모비서비스
                            //shopitemlist[i].quantity = shopListData[i].Quantity.toString();   //------구입하트갯수
                            //shopitemlist[i].price = shopListData[i].Price.toString();         //-----소모포인트 버튼텍스트
                            //shopitemlist[i].member = "";

                        }
                    } else {//if(loginTF == 0){ //비로그인
                        if (networkManager.networkState == NET_STATE.LOCALHOST) {//로컬서비스

                        } else {//비회원
                            //shopitemlist[i].quantity = shopListData[i].Quantity.toString();   //------구입하트갯수
                            //shopitemlist[i].price = shopListData[i].Price.toString();         //-----소모포인트 버튼텍스트
                            if(i===0 || i===1) { //4개 슬롯이 회원전용 표시가 될수 있으므로
                                //shopitemlist[i].member = GetString("memberonly");
                            }
                        }
                    }
                }
            }
            uigame.state.states.menu.uishop.onRefreshInitShop(); //내테이블에서 가져오기
            uigame.state.states.menu.uishop.onRefreshShop();     //부족하면 disable
        });//networkManager.GetShoplist(
    };

    grp.onOpen = function () {

        if(kData.bSoundSE) SE_Popup_ON.play();
        onFadein(grp.bg, 0.75);
        onFadeinScale(grp.dlgbg9, function () {
        });
        grp.visible = true;
    };

    //에스피마스크-상점
    var spMask = uigame.add.sprite(xc, yc, 'white1x1');
    spMask.name = 'spMask_shop';
    spMask.width = 600;
    spMask.height = 1000;
    spMask.tint = ColorSet.blue;
    spMask.alpha = 0;//0.555;
    spMask.anchor.setTo(0.5, 0.5);
    spMask.inputEnabled = true;
    grp.spMask = spMask;
    grp.addChild(spMask);
    grp.spMask.visible = false;
    //에스피마스크-상점


    return grp;
}
function createUIShopPlusButton( xoff, yoff) {
    // //createUI9사용시 상점버튼 메뉴자체가 사라져버려서 안사용
    // var dlgbg9 = createUI9a('atlas_bb_ui-0', 'select_heart_bg.png',
    //     0, 0,
    //     218, 50,
    //     20, 20, 0,  0);
    // //createUI9사용시 상점버튼 메뉴자체가 사라져버려서 안사용

    if(typeof(xoff) === 'undefined') xoff = 0;
    if(typeof(yoff) === 'undefined') yoff = 0;

    var dlgbg9 = uigame.add.sprite(165+xoff, 60+yoff, 'atlas_bb_ui-0', 'select_heart_bg_edited.png');
    dlgbg9.anchor.setTo(0.5, 0.5);

    var heart1 = uigame.add.sprite(-100, 0, 'atlas_bb_ui-0', 'select_heart.png');
    heart1.anchor.setTo(0.5, 0.5);
    dlgbg9.addChild(heart1);

    /*var btnshop = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_plus.png'),
        undefined,
        undefined,
        85,
        0,
        style60
    );

    dlgbg9.addChild(btnshop);*/

    var txgold = uigame.add.text(-97, 2, iHeartInitData, style_shopplusheart);
    txgold.anchor.setTo(0.5, 0.5);
    dlgbg9.txgold = txgold;
    dlgbg9.addChild(txgold); //debug_Sprite(txgold);
    txtHeartCnt = txgold; //하트갯수 8



    /*var txtime = uigame.add.text(-5, 2, "MAX", style_bb_topstar);
    txtime.anchor.setTo(0.5, 0.5);
    dlgbg9.addChild(txtime);
    dlgbg9.txtime = txtime;

    txtHeartTimeCnt = txtime; //하트타이머 "max", 00:00*/

    //클릭영역확대용
    var coll = uigame.add.sprite(-100, 4, 'white1x1');
    coll.name = 'coll';
    coll.width = 280;
    coll.height = 80;
    coll.alpha = 0.0;
    coll.anchor.setTo(0.5, 0.5);
    //coll.inputEnabled = true; //true일때 버튼클릭시 +버튼작동 안되서 끔
    //btnshop.addChild(coll);
    //debug_Sprite(coll);


    /*btnshop.fnok = function () {
        console.log("----------btnshop.fnok-----------");
        if(typeof(uigame.state.states.menu.uishop) !== 'undefined') {
            if(nvmode===true) {
                //네이버모드
                if (naverShop.visible) {
                    naverShop.visible=false;
                } else {
                    naverShop.Show(cbNaverShopReward);
                }
            }else{
                //모비모드
                if (uigame.state.states.menu.uishop.visible) {
                    uigame.state.states.menu.uishop.visible = false;
                } else {
                    uigame.state.states.menu.uishop.onRefreshShop();
                    //uigame.state.states.menu.uishop.visible = true;
                    uigame.state.states.menu.uishop.onOpen();
                }
            }//모비모드
        }//in menumode

        if(typeof(uigame.state.states.game.uiController) !== 'undefined'
        && uigame.state.states.game.uiController !== null
        //&& typeof(uigame.state.states.game.uiController.uishop) !== 'undefined'
        ) {
            if(nvmode===true) {
                //네이버모드
                if (naverShop2.visible) {
                    naverShop2.visible=false;
                } else {
                    naverShop2.Show(cbNaverShopReward);
                }
            }else{
                //모비모드
                if (uigame.state.states.game.uiController.uishop.visible) {
                    uigame.state.states.game.uiController.uishop.visible = false;
                } else {
                    uigame.state.states.game.uiController.uishop.onRefreshShop();
                    //uigame.state.states.menu.uishop.visible = true;
                    uigame.state.states.game.uiController.uishop.onOpen();

                    //일시정지모드
                    var stgame = uigame.state.states.game;
                    ispausemode = true;                               //메인창-일시정지클릭-->인풋잠금
                    stgame.massiveController.onPauseSaveVelocity(); //속도저장
                    //일시정지모드
                }
            }//모비모드
        }//in gamemode

    };//in fnok*/

    dlgbg9.onRefresh = function () { //샵플러스 하트갯수 리플레쉬
        try {
            uigame.state.states.menu.uishopplus.txgold.text = getMoneyFormatFromNum(kData.iHeart);
            //dlgbg9.txgold.text = kData.iHeart;
        }
        catch (err) {
            if (dm) console.log("kData.iHeart == err");
        }
    };

    return dlgbg9;
}

function createUISoundOnOff() {
    var btnsound = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_sound.png'),
        undefined,
        uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_sound_off.png'),
        0,
        0,
        style60
    );
    btnsound.anchor.setTo(0.5, 0.5);
    btnsound.scale.setTo(1, 1);
    btnsound.fnok = function () {
        if (btnsound.icon.visible) {
            btnsound.icon.visible = false; //사운드켜기
            kData.bSoundBGM = true;
            kData.bSoundSE = true;
            selectBGM("BGM_ALL", true);
            // BGM_ALL.mute = false;
            // //확인사살
            // BGM_Game_Nomal.mute = true;
            // //SE_Run.mute = true;
        } else {
            btnsound.icon.visible = true; //사운드끄기
            kData.bSoundBGM = false;
            kData.bSoundSE = false;
            selectBGM("BGM_ALL", true);
            // BGM_ALL.mute = true;
            // //확인사살
            // BGM_Game_Nomal.mute = true;
            // //SE_Run.mute = true;

        }
    };
    return btnsound;
}
//-------스타일-------------
//결과창 타이틀
var style35 = {                         //지워질 예정
    font: "30px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#A40B80',
    strokeThickness: 6
};

var style_40_result = {                          //하트샵슬롯 결과창 메세지
    font: "40px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#6A005F',
    strokeThickness: 6
};

var style_45_price = {                          //하트샵슬롯 가격
    font: "45px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#007130',
    strokeThickness: 6
};

var style_30_member = {                         //하트샵슬롯"회원전용"
    font: "30px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: ColorSet.black,
    strokeThickness: 6
};

var style55_ok_big = {                              //하트샵 ok 큰버튼
    font: "55px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#007130',
    strokeThickness: 10
};

var style45_shoppoint = {                             //하트샵 포인트값,"회원전용"
    font: "45px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#7D0000',
    strokeThickness: 6
};

var style_shoptitle = {                         //하트샵타이틀
    font: "60px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#7D0000',
    strokeThickness: 10
};


var style_shopplusheart = {                         //하트샵플러스버튼 하트갯수
    font: "30px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#A40B80',
    strokeThickness: 6
};
var style_35_stage = {                            //메인게임stage, score
    font: "35px Conv_FZHPFW_GB1",
    fill: '#9426ad',
    align: "center",
    stroke: hex2str(ColorSet.white),
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_25_stageNumber_sky = {                            //메인게임stage 000,
    font: "25px Conv_FZHPFW_GB1",
    fill: '#25b1cb',
    align: "center",
    stroke: '#e6fbff',
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};

var style_30_stage = {                            //메인게임 score
    font: "25px Conv_FZHPFW_GB1",
    fill: '#9426ad',
    align: "center",
    stroke: hex2str(ColorSet.white),
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_40_Warning = {
    font: "40px Conv_FZHPFW_GB1",
    fill: '#FF0000',
    align: "center",
    stroke: hex2str(ColorSet.white),
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_30_stageNumber = {                            //메인게임 score 000
    font: "25px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#9426ad',
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_topstar = {                            //하트샵플러스버튼 max타이머, 별바갯수
    font: "30px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    //stroke: '#3C2B00',
    //strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_star_lock = {
    font: "45px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    //stroke: '#3C2B00',
    //strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_score_start = {
    font: "40px Conv_FZHPFW_GB1",
    fill: '#FFF72A',
    align: "center",
    stroke: '#A035B4',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_heartcount1_bonus = {
    font: "48px Conv_FZHPFW_GB1",
    fill: '#FFF72A',
    align: "center",
    stroke: '#005982',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "right"
};
var style_heartcount2_bonus = {
    font: "30px Conv_FZHPFW_GB1",
    fill: '#FFFFFF',
    align: "center",
    stroke: '#005982',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "left"
};
var style_bb_number_start = {
    font: "40px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#A035B4',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_stage_start = {
    font: "50px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#9426AD',
    strokeThickness: 12,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_stage_ingame = {
    font: "32px Conv_FZHPFW_GB1",
    fill: '#9426AD',
    align: "center",
    stroke: hex2str(ColorSet.white),
    strokeThickness: 8,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_hcnt1_b = {
    font: "40px Conv_FZHPFW_GB1",
    fill: '#fff72a',
    align: "center",
    stroke: '#005982',
    strokeThickness: 8,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_hcnt2_b = {
    font: "32px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke:'#005982',
    strokeThickness: 8,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};

var style_bb_timer_ingame = {
    font: "30px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#9426AD',
    strokeThickness: 8,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_stage_start_b = {
    font: "50px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#005982',
    strokeThickness: 12,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_yes = {
    font: "50px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#007130',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_no = {
    font: "50px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#7F2D00',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_doyougetheart = {
    font: "35px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#6a005f',
    strokeThickness: 7,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_plus3 = {
    font: "60px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.yellow),
    align: "center",
    stroke: '#9626ad',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_continue = {
    font: "60px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#7F2D00',
    strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_help = {
    font: "32px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#7F2D00',
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_floatingscore = {
    font: "32px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#A40B80',
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};

var style_bb_lv1 = {
    font: "32px Conv_FZHPFW_GB1",
    fill: "#F95588",//hex2str(ColorSet.white),
    align: "center",
    stroke: '#F95588',
    strokeThickness: 1,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_bonusheart = {
    font: "27px Conv_FZHPFW_GB1",
    fill: "#FFF72a",//hex2str(ColorSet.white),
    align: "center",
    stroke: '#9426ad',
    strokeThickness: 5,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_bb_page = {
    font: "43px Conv_FZHPFW_GB1",
    fill: hex2str(ColorSet.white),
    align: "center",
    //stroke: '#A40B80',
    //strokeThickness: 10,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_title = {
    font: "60px Conv_PassionOne-Regular",
    fill: "#ffffff",
    //align: "center" //each line
    boundsAlignH: "left",
    boundsAlignV: "middle"
};
var style_title_yellow = {
    font: "60px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.yellow),
    //align: "center" //each line
    boundsAlignH: "left",
    boundsAlignV: "middle"
};
//스타일 결과등수 슬롯 -- 보석카운트
var style_gem = {
    font: "60px Conv_PassionOne-Regular",
    fill: "#ffffff",
    stroke: "#030303",
    strokeThickness: 10,
    align: "center", //each line
    boundsAlignH: "center",
    boundsAlignV: "middle"

};
// 스타일 결과등수 슬롯 -- 이름
var style_result_name = {
    font: "60px Conv_PassionOne-Regular",
    fill: "#303030",
    //align: "center" //each line
    boundsAlignH: "left",
    boundsAlignV: "middle"
};
//스타일 나의 결과등수
var style_my_rank_only = {
    font: "60px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.white),
    //align: "center" //each line
    boundsAlignH: "left",
    boundsAlignV: "middle"
};
//스타일 결과등수 슬롯 -- 정보창
var style_result_comment = {
    font: "40px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.black),
    stroke: hex2str(ColorSet.black),
    strokeThickness: 2,
    align: "center", //each line
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_chat = {
    font: "25px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.black),
    align: "center",
    stroke: hex2str(ColorSet.black),
    strokeThickness: 2,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
var style_siderank = {
    font: "30px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#3C2B00',
    strokeThickness: 6,
    boundsAlignH: "center",
    boundsAlignV: "middle"
};
//--

var style40 = {
    font: "40px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#182601',
    strokeThickness: 6
};
var style45 = {
    font: "45px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#182601',
    strokeThickness: 6
};
var style60 = {
    font: "60px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.white),
    align: "center",
    stroke: '#182601',
    strokeThickness: 6
};
var style60_multiplay = {
    font: "60px Conv_FZHPFW_GB1",
    fill: '#A40B80',
    align: "center",
    stroke: hex2str(ColorSet.white),
    strokeThickness: 10
};
var style80 = {
    font: "80px Conv_PassionOne-Regular",
    fill: hex2str(ColorSet.white),
    align: "center"
};
//--
//-------스타일-------------

//---상대검색창 만들기------------------------------
function createUIMatchSearch() {
    var grp = uigame.add.group();

    //전체 프레임
    var dlgbg9 = createUI9a('match0', 'bg.png', xc, yc, 720, 1280, 5, 5, 5, 5); //매칭배경창
    dlgbg9.name = 'dlgbg9';
    //dlgbg9.alpha=0.5;
    grp.dlgbg9 = dlgbg9;
    grp.addChild(dlgbg9);//debug_Sprite(dlgbg9);

    //파랑 상단 타이틀바
    var titlebg = createUI9a('match0', 'top.png', 0, -583, 720, 114, 5, 5, 5, 5); //매칭타이틀
    titlebg.name = 'titlebg9';
    dlgbg9.titlebg = titlebg;
    dlgbg9.addChild(titlebg);//debug_Sprite(titlebg);

    //라이벌레이싱 상단 타이틀
    var titletx = uigame.add.text(-328, -588, GetString("sweetbricks"), style_title);
    titletx.anchor.setTo(0.0, 0.5);
    titletx.name = 'titletx';
    dlgbg9.titletx = titletx;
    dlgbg9.addChild(titletx);//debug_Sprite(titletx);

    //타이틀 닫기버튼
    var btnx = createbtn(uigame.add.sprite(0, 0, 'match0', 'btn_close.png'),
        undefined, //tx
        undefined, //img
        314, -590,
        undefined
    );//debug_Sprite(btnx);
    dlgbg9.addChild(btnx);
    dlgbg9.btnx = btnx;

    //회전 이미지 "loading.png"
    var searchsp = uigame.add.sprite(0, -392, 'match0', "loading.png");
    searchsp.anchor.setTo(0.5, 0.5);
    TweenMax.fromTo( searchsp, //object
        70, //time
        {
            rotation: 0
        },
        {
            rotation: 360,
            ease: Linear.easeNone,
            repeat: -1
            // onComplete:function () {
            //     if(dm) console.log("---");
            // }

        }
    );
    dlgbg9.addChild(searchsp);//debug_Sprite(searchsp);

    //코맨트 "대전상대를 찾는 중"
    var searchtx = uigame.add.text(0, -492, GetString("finduser"), style_result_comment);
    searchtx.anchor.setTo(0.5, 0.5);
    dlgbg9.searchtx = searchtx;
    dlgbg9.addChild(searchtx);//debug_Sprite(rs_commenttx);
    //코맨트 "대전상대를 찾는 중"

    //게임스타트 버튼
    //var startbg = createUI9a('match0', 'bg_info_white.png', 0, 531, 680, 114, 5, 5, 5, 5);
    var startbg = createUI9a('match0', 'btn_start.png', 0, 531, 680, 114, 15, 15, 15, 15);
    startbg.name = 'startbg';
    //startbg.tint = ColorSet.uigreenbtn; //이젠 그린색 필요없음

    var starttx = uigame.add.text(0, 0, GetString("gamestart"), style_title_yellow);
    starttx.anchor.setTo(0.5, 0.5);
    dlgbg9.starttx = starttx;

    var startbtn = createbtn(startbg,
        starttx,
        undefined,
        0,
        531,
        undefined
    );
    dlgbg9.startbtn = startbtn; // //MenuState안에 this.uifind.dlgbg9.startbtn.fnok에서 정의
    dlgbg9.addChild(startbtn);//debug_Sprite(rs_info_btn);

    grp.onSetReady = function () {
        dlgbg9.startbtn.visible = false;
        //dlgbg9.startbtn.visible = true;//스타트버튼강제켜기

        //var i=0;
        //while (i<5) {
        //for (var i = 1; i <= 5; ++i) {
        //     (function (n) {
        //         setTimeout(function () {
        //             console.log(n);
        //
        //         }, 1000);
        //     }(i));
        //}
        // }
    };

    grp.onSetStart = function () {
        dlgbg9.startbtn.visible = true;   //MenuState안에 this.uifind.dlgbg9.startbtn.fnok에서 정의
    };

    //게임스타트 버튼


    //선수리스트
    var ybegin = -225; //y배치값
    var yadd = 185;   //y오프셋값
    var xp = 0;
    var yp = [ybegin, ybegin + yadd, ybegin + (yadd * 2), ybegin + (yadd * 3)];
    var slots = [undefined, undefined, undefined, undefined];
    //var slotscolora = [undefined, undefined, undefined, undefined];
    dlgbg9.slots = slots;
    //dlgbg9.slotscolora = slotscolora;
    var slot1;

    //선수 찾기 - 나 
    slot1 = createSlotSearch1(xp, yp[0], 0);
    slot1.tint = ColorSet.uioliv;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uired;
    //slotscolora[0] = ColorSet.uired;
    slot1.txname.text = "you";

    dlgbg9.slots[0] = slot1;
    dlgbg9.addChild(slot1);

    //선수 찾기 - 두번째
    slot1 = createSlotSearch1(xp, yp[1], 1);
    slot1.tint = ColorSet.white;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uiblue;
    //slotscolora[1] = ColorSet.uiblue;
    slot1.txname.text = "guest" + uigame.rnd.integerInRange(0, 10);

    dlgbg9.slots[1] = slot1;
    dlgbg9.addChild(slot1);

    //선수 찾기 - 세번째
    slot1 = createSlotSearch1(xp, yp[2], 2);
    slot1.tint = ColorSet.white;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uigreen;
    //slotscolora[2] = ColorSet.uigreen;
    slot1.txname.text = "guest" + uigame.rnd.integerInRange(0, 10);

    dlgbg9.slots[2] = slot1;
    dlgbg9.addChild(slot1);

    //선수 찾기 - 네번째
    slot1 = createSlotSearch1(xp, yp[3], 3);
    slot1.tint = ColorSet.white;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uipurple;
    //slotscolora[3] = ColorSet.uipurple;
    slot1.txname.text = "guest" + uigame.rnd.integerInRange(0, 10);

    dlgbg9.slots[3] = slot1;
    dlgbg9.addChild(slot1);

    //초기화
    //사용자액자 //dlgbg9.slots[1].youframe9.tint = ColorSet.lightgrey;
    //사용자액자 //dlgbg9.slots[2].youframe9.tint = ColorSet.lightgrey;
    //사용자액자 //dlgbg9.slots[3].youframe9.tint = ColorSet.lightgrey;
    dlgbg9.slots[1].txname.text = "";
    dlgbg9.slots[2].txname.text = "";
    dlgbg9.slots[3].txname.text = "";

    //grp.dlgbg9.slots[1].youframe9.tint=dlgbg9.slotscolora[1];
    //grp.dlgbg9.slots[1].txname.text="";

    return grp;
}

//---랭킹 결과창 생성하기------------------------------
function createUIMatchResult() {
    var grp = uigame.add.group();

    grp._i = 0;
    grp._j = 0;
    grp._k = 0;
    var dlgbg9 = createUI9a('match0', 'bg.png', xc, yc, 720, 1280, 5, 5, 5, 5); //매칭배경창
    dlgbg9.name = 'dlgbg9';
    //dlgbg9.alpha=0.5;
    //dlgbg9.scale.set(0.5,0.5);
    grp.dlgbg9 = dlgbg9;
    grp.addChild(dlgbg9);//debug_Sprite(dlgbg9);

    //타이틀바
    var titlebg = createUI9a('match0', 'top.png', 0, -583, 720, 114, 5, 5, 5, 5); //매칭타이틀
    titlebg.name = 'titlebg9';
    dlgbg9.titlebg = titlebg;
    dlgbg9.addChild(titlebg);//debug_Sprite(titlebg);

    var titletx = uigame.add.text(-328, -588, GetString("sweetbricks"), style_title);
    titletx.anchor.setTo(0.0, 0.5);
    titletx.name = 'titletx';
    dlgbg9.titletx = titletx;
    dlgbg9.addChild(titletx);//debug_Sprite(titletx);

    // //타이틀 닫기버튼
    // var btnx = createbtn(uigame.add.sprite(0, 0, 'match0', 'btn_close.png'),
    //     undefined, //tx
    //     undefined, //img
    //     314, -590,
    //     undefined
    // );//debug_Sprite(btnx);
    // dlgbg9.btnx = btnx;
    // dlgbg9.addChild(btnx);

    //나의랭크정보창
    var resultbg = createUI9a('match0', 'bg_info_white.png', 0, -442, 680, 141, 5, 5, 5, 5);
    resultbg.name = 'resultbg';
    resultbg.tint = ColorSet.darkgrey;
    dlgbg9.resultbg = resultbg;
    dlgbg9.addChild(resultbg);//debug_Sprite(resultbg);

    //"나의랭크정보는" 텍스트
    var resulttx = uigame.add.text(-292, -438, GetString("gameresult"), style_my_rank_only);
    resulttx.anchor.setTo(0.0, 0.5);
    dlgbg9.resulttx = resulttx;
    dlgbg9.addChild(resulttx);//debug_Sprite(resulttx);

    //나의랭크 1st, 2nd, 3rd, 4th 스프라이트
    var resultsp = uigame.add.sprite(182, -445, 'match0', 'result_1.png');
    resultsp.anchor.setTo(0.5, 0.5);
    dlgbg9.resultsp = resultsp;
    dlgbg9.addChild(resultsp); //debug_Sprite(resultsp);


    // //----------------------
    // //게임스타트 버튼
    // var startbg = createUI9a('match0', 'bg_info_white.png', 0, 531, 680, 114,   5, 5, 5, 5);
    // startbg.name = 'startbg';
    // startbg.tint = ColorSet.uigreenbtn;
    //
    // var starttx = uigame.add.text(0, 0, GetString("gamestart"), style_title );
    // starttx.anchor.setTo(0.5,0.5);
    // dlgbg9.starttx = starttx;
    //
    // var startbtn = createbtn( startbg,
    //     starttx,
    //     undefined,
    //     0,
    //     531,
    //     undefined
    // );
    // dlgbg9.startbtn = startbtn; // //MenuState안에 this.uifind.dlgbg9.startbtn.fnok에서 정의
    // dlgbg9.addChild(startbtn);//debug_Sprite(rs_info_btn);
    // //----------------------

    //결과상태코멘트창
    var rs_infobg = createUI9a('match0', 'bg_info_white.png', 0, 0, 680, 114, 5, 5, 5, 5); // 배경:잠시만 기다려주세요
    rs_infobg.name = 'resultbg';
    rs_infobg.tint = ColorSet.darkgrey;
    //dlgbg9.rs_infobg = rs_infobg;
    dlgbg9.addChild(rs_infobg);//debug_Sprite(rs_infobg);

    //결과상태코멘트텍스트
    var rs_commenttx = uigame.add.text(0, 0, GetString("waitmoment"), style_result_comment);  //text:잠시만 기다려주세요
    rs_commenttx.anchor.setTo(0.5, 0.5);
    //dlgbg9.rs_commenttx = rs_commenttx;
    //rs_infobg.addChild(rs_commenttx);//debug_Sprite(rs_commenttx);

    var rsbtn = createbtn(rs_infobg,
        rs_commenttx,
        undefined,
        0,
        551,
        undefined
    );
    dlgbg9.rsbtn = rsbtn;
    dlgbg9.addChild(rsbtn);

    //랭킹슬롯들 위치값
    var ybegin = -225; //y배치값
    var yadd = 205;   //y오프셋값
    var xp = 0;
    var yp = [ybegin, ybegin + yadd, ybegin + (yadd * 2), ybegin + (yadd * 3)];
    //랭킹슬롯들 배열
    var slots = [undefined, undefined, undefined, undefined];
    dlgbg9.slots = slots;

    // true, 'red',  xp, yp[0],
    var slot1;

    //1등슬롯----------------------------------------
    slot1 = createSlotRank1(xp, yp[0], 0);
    slot1.tint = ColorSet.uioliv;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uired;
    slot1.txcnt.text = "x4";
    slot1.txname.text = "";
    //slot1.txscore.text = getMoneyFormatFromNum(1200);
    slot1.sp1st.loadTexture('match0', 'result_win.png');

    dlgbg9.slots[0] = slot1;
    dlgbg9.addChild(slot1);

    //2등슬롯----------------------------------------
    slot1 = createSlotRank1(xp, yp[1], 1);
    slot1.tint = ColorSet.white;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uiblue;
    slot1.txcnt.text = "x3";
    slot1.txname.text = "";
    //slot1.txscore.text = getMoneyFormatFromNum(1000);
    slot1.sp1st.loadTexture('match0', 'result_lose.png');

    dlgbg9.slots[1] = slot1;
    dlgbg9.addChild(slot1);

    //3등슬롯----------------------------------------
    slot1 = createSlotRank1(xp, yp[2], 2);
    slot1.tint = ColorSet.white;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uigreen;
    slot1.txcnt.text = "x2";
    slot1.txname.text = "";
    //slot1.txscore.text = getMoneyFormatFromNum(800);
    slot1.sp1st.loadTexture('match0', 'result_3.png');

    dlgbg9.slots[2] = slot1;
    dlgbg9.addChild(slot1);

    //4등슬롯----------------------------------------
    slot1 = createSlotRank1(xp, yp[3], 3);
    slot1.tint = ColorSet.white;
    //사용자액자 //slot1.youframe9.tint = ColorSet.uipurple;
    slot1.txcnt.text = "x1";
    slot1.txname.text = "";
    //slot1.txscore.text = getMoneyFormatFromNum(600);
    slot1.sp1st.loadTexture('match0', 'result_4.png');

    dlgbg9.slots[3] = slot1;
    dlgbg9.addChild(slot1);


    grp.onRefreshResult = function () { // uiresult 최종랭킹업데이트
        //net_resultname4[_i_]=data[_i_].uid;
        //net_resultrank4[_i_]=data[_i_].rank-1;


        //GAME RESULT: 내랭킹업데이트--------------------------
        if(dm) console.log("grp.onRefreshResult = function ()");
        return;

        //내등수업데이트
        if (net_userallfin == undefined) {
        }
        var myrankidx = net_userallfin.indexOf(net_yourname);
        var namepic1 = picsMyResultRank[myrankidx];

        if (dm) console.log(myrankidx);
        if (dm) console.log(namepic1);

        if (true) grp.dlgbg9.resultsp.loadTexture('match0', namepic1); //나의 등수결과 맨위 업데이트

        //GAME RESULT: 내랭킹업데이트--------------------------

        //선수숫자를 파악한다
        var playercount = 0;
        for (_k_ = 0; _k_ < 4; _k_++) {
            if (net_userallfin[_k_] != undefined) playercount += 1;
        }
        //잠시만기다려주세요-->GAME START
        //disabled:ColorSet.uigray;//enabled: ColorSet.uigreenbtn;
        var curplayercount = 0;
        //4개 슬롯 업데이트
        for (_k_ = 0; _k_ < 4; _k_++) {
            if (net_userallfin[_k_] != undefined) {
                //슬롯을 선수로 채우기
                //선수가 존재할 경우
                //사용자액자 //grp.dlgbg9.slots[_k_].youframe9.tint = uigame.state.states.menu.uifind.dlgbg9.slotscolora[_k_]; //선수사진색
                grp.dlgbg9.slots[_k_].txname.text = net_userallfin[_k_];                                           //슬롯의 선수이름

                //win,lose출력 예외처리---
                if (playercount > 2) { //3~4명경우 1st,2nd,3rd,4th
                    grp.dlgbg9.slots[_k_].sp1st.loadTexture('match0', picsMyResultRank[_k_]);
                } else {             //1~2명인경우, win,lose
                    grp.dlgbg9.slots[_k_].sp1st.loadTexture('match0', picsMyResultRank_2[_k_]);
                }
                //win,lose예외처리---

                grp.dlgbg9.slots[_k_].onActiveRank(true);

                //grp.dlgbg9.slots[_k_].sp1st.visible = true;                                                     //기울어진 랭킹표시
                //grp.dlgbg9.slots[_k_].yougem.visible = true;                                                    //보석아이콘
                ////grp.dlgbg9.slots[_k_].txscore.visible = true;                                                    //스코어텍스트
                //grp.dlgbg9.slots[_k_].txname.visible = true;                                                    //선수이름
                _i_ = playercount - _k_; //보석갯수 //전체선수갯수 - 인덱스 = 보석갯수
                if (_k_ == myrankidx) {
                    //내 획득보석(메달) 가져오기
                    medaladded = _i_;
                }
                grp.dlgbg9.slots[_k_].txcnt.text = "x" + _i_;
                //grp.dlgbg9.slots[_k_].txcnt.visible = true;                                                    //획득보석 갯수
                curplayercount += 1;
            } else {
                grp.dlgbg9.slots[_k_].onActiveRank(false);
                //빈슬롯 처리
                //선수가 undefined인 경우
                //사용자액자 //grp.dlgbg9.slots[_k_].youframe9.tint = ColorSet.lightgrey;                                      //선수사진색
                grp.dlgbg9.slots[_k_].txname.text = "";                                                         //슬롯의 선수이름
                //grp.dlgbg9.slots[_k_].sp1st.visible = false;                                                    //기울어진 랭킹표시
                //grp.dlgbg9.slots[_k_].yougem.visible = false;                                                   //보석아이콘
                ////grp.dlgbg9.slots[_k_].txscore.visible = false;                                                    //스코어텍스트
                //grp.dlgbg9.slots[_k_].txname.visible = false;                                                    //선수이름
                _i_ = playercount - _k_; //보석갯수
                grp.dlgbg9.slots[_k_].txcnt.text = "x" + _i_;
                //grp.dlgbg9.slots[_k_].txcnt.visible = false;                                                    //획득보석 갯수
            }
        }
        //내랭킹 슬롯만 올리브색으로
        for (_k_ = 0; _k_ < 4; _k_++) {
            if (_k_ === myrankidx)
                grp.dlgbg9.slots[_k_].tint = ColorSet.uioliv;
            else
                grp.dlgbg9.slots[_k_].tint = ColorSet.white;
        }
        //[나, 선수1, 선수2, undefined] 이렇게 넣는다--------------

        //grp.dlgbg9.rsbtn.tint = ColorSet.uigreenbtn;//이젠 그린색 필요없음
        grp.dlgbg9.rsbtn.tx.text = "TIME: " + 5;
        grp.dlgbg9.rsbtn.tx.setStyle(style_title); //힌색 , 폰트60 크게

    };//onRefresh()

    return grp;
}

//---결과랭킹창의 슬롯1개 만들기-----------------------
function createSlotRank1(xpos, ypos, indexslot) {
    //슬롯0--나
    var youbg9;

    youbg9 = createUI9a('match0', 'list_empty.png', xpos, ypos, 680, 161, 10, 10, 10, 20);
    youbg9.name = 'youbg9';

    //액자
    //사용자액자 //var youframe9;
    //사용자액자 //youframe9 = createUI9a('match0', 'list_empty.png', -260, 0, 161, 161, 10, 10, 10, 20);
    //사용자액자 //youframe9.name = 'youframe9';
    //사용자액자 //youbg9.youframe9 = youframe9;
    //사용자액자 //youbg9.addChild(youframe9);//debug_Sprite(youpic9);

    //캐릭터사진
    //var youpic = uigame.add.sprite(-258, 0, 'match0', 'user_character.png');
    var youpic = undefined;
    var upperline = undefined;
    if (indexslot === undefined) indexslot = 0;
    switch (indexslot) {
        case 0:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_1.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_1.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        case 1:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_2.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_2.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        case 2:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_3.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_3.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        case 3:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_4.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_4.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        default:
            break;
    }
    youbg9.upperline = upperline;
    youbg9.addChild(upperline);//debug_Sprite(upperline); //<----------------

    youbg9.dis_upperline = createUI9a('match0', 'list_5.png', 0, -49, 676, 62, 50, 163, 0, 0); //비활성용 상단바를 여기다 놔야 레이어 순서가 맞음
    youbg9.addChild(youbg9.dis_upperline);

    youbg9.bgsp1st = uigame.add.sprite(-340, -124, 'match0', 'result_bg.png'); //다크그레이 다이얼로그
    youbg9.addChild(youbg9.bgsp1st); //debug_Sprite(youbg9.bgsp1st);

    //나의랭크 1st, 2nd, 3rd, 4th 스프라이트
    //var sp1st = game.add.sprite(-43, -63, 'match0', 'result_1.png');
    var sp1st = uigame.add.sprite(-5, -100, 'match0', 'result_1.png'); // 다크그레이 위에 놓일 랭킹 스프라이트
    sp1st.anchor.setTo(0.5, 0.5);
    sp1st.scale.setTo(0.65, 0.65);
    //sp1st.rotation = -0.2;
    youbg9.sp1st = sp1st;
    youpic.addChild(sp1st);//debug_Sprite(sp1st);

    youpic.anchor.setTo(0.5, 0.5);
    youbg9.youpic = youpic;
    youbg9.addChild(youpic);//debug_Sprite(youpic); //<---------------- 캐릭터 사진

    //보석
    var yougem = uigame.add.sprite(210, 0, 'match0', 'jewel.png');
    yougem.anchor.setTo(0.5, 0.5);
    youbg9.yougem = yougem;
    youbg9.addChild(yougem);//debug_Sprite(yougem);

    var txcnt = uigame.add.text(207, 28, "x1", style_gem);
    txcnt.anchor.setTo(0.0, 0.5);
    txcnt.name = 'txcnt';
    youbg9.txcnt = txcnt;
    youbg9.addChild(txcnt);//debug_Sprite(txcnt);

    var txname = uigame.add.text(-147, -0, "YOU", style_result_name);
    txname.anchor.setTo(0.0, 0.5);
    txname.name = 'txname';
    youbg9.txname = txname;
    youbg9.addChild(txname);//debug_Sprite(txname);

    // var txscore = uigame.add.text(190, 32, "0,000,000,000", style_result_score);
    // txscore.anchor.setTo(1, 0.5);
    // txscore.name = 'txscore';
    // youbg9.txscore = txscore;
    // youbg9.addChild(txscore);//debug_Sprite(txscore);

    youbg9.dis_youpic = game.add.sprite(-258, 0, 'match0', 'user_5.png');
    youbg9.dis_youpic.anchor.setTo(0.5, 0.5);
    youbg9.addChild(youbg9.dis_youpic);

    //활성
    youbg9.dis_youpic.visible = false;
    youbg9.dis_upperline.visible = false;
    youbg9.tint = ColorSet.white;

    youbg9.onActiveRank = function (onoff) {
        if (onoff) {
            //슬롯활성
            youbg9.dis_youpic.visible = false;
            youbg9.dis_upperline.visible = false;
            youbg9.txname.visible = true;
            youbg9.tint = ColorSet.white;

            youbg9.sp1st.visible = true;
            youbg9.yougem.visible = true;
            youbg9.txcnt.visible = true;
        } else {
            //슬롯비활성
            youbg9.dis_youpic.visible = true;
            youbg9.dis_upperline.visible = true;
            youbg9.txname.visible = false;
            youbg9.tint = ColorSet.lightgrey;

            youbg9.sp1st.visible = false;
            youbg9.yougem.visible = false;
            youbg9.txcnt.visible = false;
        }

    };

    return youbg9;
}

//--검색창의 슬롯1개 만들기--------------------------------
function createSlotSearch1(xpos, ypos, indexslot) {
    //슬롯0--나
    var youbg9;

    youbg9 = createUI9a('match0', 'list_empty.png', xpos, ypos, 680, 161, 10, 10, 10, 20);
    youbg9.name = 'youbg9';

    //액자
    //사용자액자 //var youframe9;
    //사용자액자 //youframe9 = createUI9a('match0', 'list_empty.png', -260, 0, 161, 161, 10, 10, 10, 20);

    //사용자액자 //youframe9.name = 'youframe9';
    //사용자액자 //youbg9.youframe9 = youframe9;
    //사용자액자 //youbg9.addChild(youframe9);//debug_Sprite(youpic9);

    //캐릭터사진
    //var youpic = uigame.add.sprite(-258, 0, 'match0', 'user_character.png');
    var youpic = undefined;
    var upperline = undefined;
    if (indexslot === undefined) indexslot = 0;
    switch (indexslot) {
        case 0:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_1.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_1.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        case 1:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_2.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_2.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        case 2:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_3.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_3.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        case 3:
            youpic = game.add.sprite(-258, 0, 'match0', 'user_4.png');//'user_character.png'
            upperline = createUI9a('match0', 'list_4.png', 0, -49, 676, 62, 50, 163, 0, 0);
            break;
        default:
            break;
    }

    youpic.anchor.setTo(0.5, 0.5);
    youbg9.youpic = youpic;
    youbg9.addChild(youpic);//debug_Sprite(youpic);


    youbg9.upperline = upperline;
    youbg9.addChild(upperline);//debug_Sprite(upperline);

    youbg9.dis_upperline = createUI9a('match0', 'list_5.png', 0, -49, 676, 62, 50, 163, 0, 0);
    youbg9.addChild(youbg9.dis_upperline);


    var txname = uigame.add.text(-147, 0, "YOU", style_result_name);
    txname.anchor.setTo(0.0, 0.5);
    txname.name = 'txname';
    youbg9.txname = txname;
    youbg9.addChild(txname);//debug_Sprite(txname);

    youbg9.dis_youpic = game.add.sprite(-258, 0, 'match0', 'user_5.png');
    youbg9.dis_youpic.anchor.setTo(0.5, 0.5);
    youbg9.addChild(youbg9.dis_youpic);

    //활성
    youbg9.dis_youpic.visible = false;
    youbg9.dis_upperline.visible = false;
    youbg9.tint = ColorSet.white;

    youbg9.onActive = function (onoff) {
        if (onoff) {
            //슬롯활성
            youbg9.dis_youpic.visible = false;
            youbg9.dis_upperline.visible = false;
            youbg9.txname.visible = true;
            youbg9.tint = ColorSet.white;
        } else {
            //슬롯비활성
            youbg9.dis_youpic.visible = true;
            youbg9.dis_upperline.visible = true;
            youbg9.txname.visible = false;
            youbg9.tint = ColorSet.lightgrey;
        }

    };

    return youbg9;
}

//---일시정지창------------------------------
function createUIPause() {
    var grp = uigame.add.group();
    // grp.position.setTo(xc,yc);

    //투명배경
    var bg = uigame.add.sprite(xc, yc, 'white1x1');
    bg.name = 'bguipause';
    grp.bg = bg;
    grp.addChild(bg);
    bg.inputEnabled = true;
    bg.width = 720;
    bg.height = 1280;
    bg.tint = ColorSet.black;
    bg.alpha = 0.5;
    bg.anchor.setTo(0.5, 0.5);
    //투명배경

    //var dlgbg9 = createUI9a('ui0', 'popup_message.png', xc, yc, 564, 300, 42, 52, 50, 57);//일시정지배경창
    var dlgbg9 = uigame.add.sprite(xc, yc, 'atlas_bb_ui_dlg-0', 'popup_pause.png');
    dlgbg9.anchor.setTo(0.5, 0.5);
    dlgbg9.name = 'dlgbg9';
    grp.dlgbg9 = dlgbg9;
    grp.addChild(dlgbg9); //debug_Sprite(dlgbg9);

    //닫기X버튼(일시정지)
    var btnx = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_close.png'),
        undefined, //tx
        undefined, //img
        223, -193,
        undefined
    );//debug_Sprite(btnx);
    dlgbg9.addChild(btnx);
    dlgbg9.btnx = btnx;

    //뒤로가기버튼(일시정지)
    var btnback = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_pause_replay.png'),
        undefined, //tx
        undefined, //img
        -97, -73,
        undefined
    ); //debug_Sprite(btnback);
    dlgbg9.addChild(btnback);
    dlgbg9.btnback = btnback;

    //사운드버튼(일시정지)
    var btnsound = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_pause_sound.png'),
        undefined, //tx
        uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_pause_sound_off.png'), //img
        -97, 91,
        undefined
    ); //debug_Sprite(btnsound);
    dlgbg9.addChild(btnsound);
    dlgbg9.btnsound = btnsound;
    btnsound.onoff = true;
    btnsound.icon.visible = false;

    //홈버튼(일시정지)
    var btnhome = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_pause_home.png'),
        undefined, //tx
        undefined, //img
        97, -73,
        undefined
    ); //debug_Sprite(btnhome);
    dlgbg9.addChild(btnhome);
    dlgbg9.btnhome = btnhome;

    //도움말(일시정지)
    var btnhelp = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_pause_item.png'),
        undefined, //tx
        undefined, //img
        97, 91,
        undefined
    ); //debug_Sprite(btnhelp);
    dlgbg9.addChild(btnhelp);
    dlgbg9.btnhelp = btnhelp;


    dlgbg9.btnsound.fnok = function () { //일시정지 사운드버튼 클릭
        //배경음온오프


        if (kData.bSoundBGM) {
            dlgbg9.btnsound.icon.visible = true; //사운드끄기
            kData.bSoundBGM = false;
            kData.bSoundSE = false;
            SE_HurryUp.mute=true;//
            selectBGM("BGM_Game_Nomal", true);
            // BGM_Game_Nomal.mute = true;
            // //확인사살
            // BGM_ALL.mute = true;
            // //SE_Run.mute = true;
        }
        else {
            dlgbg9.btnsound.icon.visible = false; //사운드켜기
            kData.bSoundBGM = true;
            kData.bSoundSE = true;
            selectBGM("BGM_Game_Nomal", true);
            // BGM_Game_Nomal.mute = false;
            // //확인사살
            // BGM_ALL.mute = true;
            // //SE_Run.mute = true;
        }
    };

    dlgbg9.btnhome.fnok = function () {//넷 중간 나가기// 일시메뉴에서 나가기
        SE_HurryUp.mute=true;
        if (matchmode) {
            socket.emit('leaveRoom'); //일시정지후 나가기
        }
        mode20sec = false;
        ispausemode = false; //홈버튼클릭->인풋잠금풀기

        uigame.state.states.game.onGameOver.dispatch();
        uigame.state.game.state.start('menu');
    };

    dlgbg9.btnhelp.fnok = function () {//헬프버튼클릭시
        var stgame = uigame.state.states.game;
        if (stgame.uiController.uiHelp.visible === false) { //헬프창 나오기
            stgame.uiController.uiHelp.onActiveHp();
        }
        // if (stgame.uiController.uipause.visible === true) { //일시정지 닫기
        //     stgame.uiController.uipause.visible = false;
        // }

    };

    grp.onActivePs = function () {
        onFadein(grp.bg, 0.75);
        onFadeinScale(grp.dlgbg9, function () {

        });
    };
    //닫기이벤트는 this.uipause.dlgbg9.btnx.fnok = function ()
    return grp;
}
function create20sec() {
    var text20Sec = uigame.add.text(0, 0, "", {
        font: "60px Conv_PassionOne-Regular",//백업 font: "40px Conv_PassionOne-Regular",
        fill: hex2str(ColorSet.white),
        align: "center",
        stroke: '#3C2B00',
        strokeThickness: 6
    });
    text20Sec.anchor.setTo(0.5, 0.5);
    text20Sec.x = xc;
    text20Sec.y = 200;
    return text20Sec;
}
//신호등321
function createLight123() {
    var grp = uigame.add.group();

    return grp;
}
//출발 비트맵 숫자 123
function createNumber123() {
    var grp = uigame.add.group();

    return grp;
}
//포그폭탄이펙트
function createFX_bomb() {
    var grp = uigame.add.group();

    return grp;
}

//미사일 공격 이펙트
function createFX_missile() {
    var grp = uigame.add.group();

    return grp;
}
//오른쪽 미니맵 표시
function createUIMiniMap() {
    var grp = uigame.add.group();

    return grp;
}



//페이지 인디케이터 생성
function CreateUIIndicator() { //bb
    // var grp = uigame.add.group();
    // grp.x = 0;
    // grp.y = 0;
    //
    // grp.txNameOn = "select_page.png";
    // grp.txNameOff = "select_page_1.png";
    //
    // //인디케이터배열설정/
    // grp.PAGE_MAX = LEVEL_MAX / LV4x4; //count이다 index아님
    //
    // grp.IndiPage = 10; //= PAGE_MAX;
    //
    // grp.IndiLength = 420; //픽셀x
    // grp.IndiGrid1 = grp.IndiLength / (grp.IndiPage - 1);
    // grp.LengthHalf = grp.IndiLength * 0.5; //중간지점픽셀x
    // //grp.sprIndicator = [];
    // grp._pageby10 = 0;
    //
    // grp._i = 0;
    //
    // //인디케이터 초기 생성
    // for (grp._i = 0; grp._i < grp.IndiPage; grp._i++) {
    //     grp.sprIndicator[grp._i] = uigame.add.sprite(
    //         -grp.LengthHalf + (grp.IndiGrid1 * grp._i),     //x
    //         0,                                              //y
    //         'atlas_bb_ui-0',                                //아틀라스
    //         grp._i === 0 ? grp.txNameOn : grp.txNameOff);   //png이름
    //     grp.sprIndicator[grp._i].anchor.setTo(0.5, 0.5);
    //
    //     grp.addChild(grp.sprIndicator[grp._i]);
    // }
    // //인디케이터 초기 생성
    //
    // //인디케이터업데이트
    // grp.setIndicatorByPage = function (pg) {
    //     grp._pageby10 = pg % 10;//폐이지 열개씩가 1세트이므로,, 나머지 값이 위치가 된다
    //     for (grp._i = 0; grp._i < grp.IndiPage; grp._i++) {
    //         if (grp._i == grp._pageby10) {
    //             if (dm) console.log("setIndicatorByPage--txNameOn(0):" + grp.txNameOn);
    //             if (grp.sprIndicator[grp._i] !== undefined || grp.sprIndicator[grp._i] !== null)
    //                 grp.sprIndicator[grp._i].loadTexture('atlas_bb_ui-0', grp.txNameOn);
    //         }
    //         else {
    //             if (dm) console.log("setIndicatorByPage--txNameOn(!0):" + grp.txNameOff);
    //             if (grp.sprIndicator[grp._i] !== undefined || grp.sprIndicator[grp._i] !== null)
    //                 grp.sprIndicator[grp._i].loadTexture('atlas_bb_ui-0', grp.txNameOff);
    //         }
    //     }
    // };
    // //인디케이터업데이트
    //
    // return grp;
}

//레벨선택창 안의  레벨아이콘1개생성
function CreateLevel1IconUI() {
    var grp = uigame.add.group();
    grp.x = 0;
    grp.y = 0;

    grp.z_index = 0;
    //레벨1 보통 버튼
    // grp.sOn = createbtn(createUI9a('atlas_bb_ui-0', 'btn_stage.png', 0, 0, 158, 200, 45, 45, 45, 45),
    //     uigame.add.text(0, -68, "000", style_bb_lv1),
    //     uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_star_empty.png"),
    //     0, 0,
    //     style_bb_lv1
    // );
    grp.sOn = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_stage.png"),
        uigame.add.text(0, -68, "000", style_bb_lv1),
        uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_star_empty.png"),
        0, 0,
        style_bb_lv1
    );
    grp.sOn.icon.scale.setTo(1, 1); //미니맵사이즈 //미니맵스케일
    grp.addChild(grp.sOn);

    // ///미니맵 칼라
    // grp.sOn.icon.scale.setTo(3, 3); //미니맵사이즈 //미니맵스케일
    // grp.sOn.icon.tint = ColorSet.red;
    // grp.sOn.icon.alpha = 0.55;
    // grp.addChild(grp.sOn);

    //별3개 만들기
    grp.sOn.sStar1 = uigame.add.sprite(-40, 64, 'atlas_bb_ui-0', "select_star.png");
    grp.sOn.sStar1.anchor.setTo(0.5, 0.5);
    grp.sOn.addChild(grp.sOn.sStar1);//debug_Sprite(sStar1);

    grp.sOn.sStar2 = uigame.add.sprite(0, 64, 'atlas_bb_ui-0', "select_star.png");
    grp.sOn.sStar2.anchor.setTo(0.5, 0.5);
    grp.sOn.addChild(grp.sOn.sStar2);//debug_Sprite(sStar2);

    grp.sOn.sStar3 = uigame.add.sprite(40, 64, 'atlas_bb_ui-0', "select_star.png");
    grp.sOn.sStar3.anchor.setTo(0.5, 0.5);
    grp.sOn.addChild(grp.sOn.sStar3);//debug_Sprite(sStar3);

    //현재 레벨
    grp.sSelected = uigame.add.sprite(0, -2, 'atlas_bb_ui-0', "stage_new_1.png");
    grp.sSelected.animations.add('idle', ['stage_new_1.png', 'stage_new_2.png']);
    grp.sSelected.anchor.setTo(0.5, 0.5);
    grp.addChild(grp.sSelected);//debug_Sprite(sStar1);

    //레벨1 보통 버튼

    //배경클릭시
    grp.sOn.fnok = function () { //레벨선택버튼
        if(game.state.states[game.state.current].key === 'game') return;
        curLevel = grp.z_index;
        curLevelFake = curLevel + 1 - Math.floor(curLevel / LV4x4); //레벨선택창에서
        if(dm) console.log("curLevel:"+curLevel+",  curLevelFake:"+curLevelFake);
        //-----로그인 상태 체크-----------in CreateLevel1IconUI
        if(loginTF === 1){          //로그인회원
            if (proto.serPos === 0              //모비서비스
            ||proto.serPos === 1) {              //야후서비스
                if (kData.iHeart<= 0) { //하트가 바닥이면 in CreateLevel1IconUI
                    //우선상점나오게
                    uigame.state.states.menu.uishop.onRefreshShop();
                    uigame.state.states.menu.uishop.onOpen();
                    return;
                    //우선상점나오게
                }else {
                    //하트소멸은 다음단계에서하므로
                    //다음단계로
                }
            }
        }else{
            if (networkManager.networkState === NET_STATE.LOCALHOST) { //로컬서비스
                //다음단계로
            }else{ //비회원  //게스트모드
                //
                if(kData.iHeart<=0) { //CreateLevel1IconUI
                    networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),//상점
                        function () {
                            networkManager.JoinMember();
                        },
                        function () {
                        }
                    );
                    return;
                }else{
                    //하트소멸은 다음단계에서하므로
                }
            }
        }
        //-----로그인 상태 체크------------in CreateLevel1IconUI

        //클릭시

        //var a = game.state.states[game.state.current];
        //var b = game.state.states[game.state.current].key;
        uigame.state.states.menu.uiselectlevel.spMask_sel.visible = true;//더블클릭막기
        setTimeout(function () {
            uigame.state.states.menu.uiselectlevel.spMask_sel.visible = false;//더블클릭풀기
            uigame.state.start('game');
            //uiSelectLevel.visible을 true로//this.uiStartLevel.onActiveLv();
            if (dm) console.log("start game!!!");
        }, 250); //--> clickGameMode

    };

    //일반보통레벨 아이콘 Disable
    grp.sOff = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_stage_disable.png");
    grp.sOff.anchor.setTo(0.5, 0.5);//grp.addChild(sOff);
    grp.addChild(grp.sOff); //debug_Sprite(sOff);
    //grp.sLockD = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "lock.png");
    //grp.sLockD.anchor.setTo(0.5, 0.5);
    //grp.sOff.addChild(grp.sLockD);

    //보너스레벨 배경+타이틀 부분
    //grp.sBonus = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_stage_bonus.png"); //보너스배경
    //grp.sBonus.anchor.setTo(0.5, 0.5);
    grp.sBonus = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_stage_bonus.png"),//보너스배경
        undefined,
        undefined,
        0, 0,
        style_bb_lv1
    );

    grp.addChild(grp.sBonus);
    grp.sBonusSP1 = uigame.add.sprite(0, -26, 'atlas_bb_ui-0', "select_bonus_label.png");//보너스타이틀배경
    grp.sBonusSP1.anchor.setTo(0.5, 0.5);
    grp.sBonus.addChild(grp.sBonusSP1);
    grp.sBonusSP2 = uigame.add.sprite(0, -32, 'atlas_bb_ui-0', "select_bonus_title.png");//bonus stage 문자
    grp.sBonusSP2.anchor.setTo(0.5, 0.5);
    grp.sBonus.addChild(grp.sBonusSP2);
    
    //보너스레벨 클리어 가지
    grp.z_panel_c = uigame.add.group();
    grp.sBonus.addChild(grp.z_panel_c);
    grp.sBonusClearM = uigame.add.sprite(0, 53, 'atlas_bb_ui-0', 'select_bonus_medal.png');
    grp.sBonusClearM.anchor.setTo(0.5, 0.5);
    grp.z_panel_c.addChild(grp.sBonusClearM);
    grp.sBonusClearC = uigame.add.sprite(0, 53, 'atlas_bb_ui-0', 'select_bonus_cleared.png');
    grp.sBonusClearC.anchor.setTo(0.5, 0.5);
    grp.z_panel_c.addChild(grp.sBonusClearC);

    //보너스레벨 하트수치 가지
    grp.z_panel_h = uigame.add.group();
    grp.sBonus.addChild(grp.z_panel_h);
    grp.sBonusSP3 = createUI9a('atlas_bb_ui-0', 'select_bonus_info.png', 0, 57, 120, 46, 25, 25, 0, 0);//하트배경
    grp.sBonusSP3.anchor.setTo(0.5, 0.5);
    grp.z_panel_h.addChild(grp.sBonusSP3);
    grp.sBonusSP4 = uigame.add.sprite(-20, 57, 'atlas_bb_ui-0', 'select_bonus_block.png');//하트상자아이콘
    grp.sBonusSP4.anchor.setTo(0.5, 0.5);
    grp.z_panel_h.addChild(grp.sBonusSP4);
    grp.sBonusTx = uigame.add.text(32, 59, "0", style_bb_bonusheart);
    grp.sBonusTx.anchor.setTo(0.5, 0.5);
    grp.z_panel_h.addChild(grp.sBonusTx);

    //보너스레벨 락걸린부분
    grp.sLockBonus = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_stage_bonus_disable.png");
    grp.sLockBonus.anchor.setTo(0.5, 0.5);
    grp.addChild(grp.sLockBonus);
    grp.sLockBonusSP = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "select_bonus_title.png");
    grp.sLockBonusSP.anchor.setTo(0.5, 0.5);
    grp.sLockBonusSP.scale.setTo(0.85, 0.85);
    grp.sLockBonus.addChild(grp.sLockBonusSP);


    grp.sBonus.fnok = function () { //레벨선택버튼
        curLevel = grp.z_index;
        curLevelFake = curLevel + 1 - Math.floor(curLevel / LV4x4); //보너스아이콘 클릭시 in 레벨선택창
        if(dm) console.log("curLevel:"+curLevel+",  curLevelFake:"+curLevelFake);
        //보너스클릭시
        uigame.state.states.menu.uiselectlevel.spMask_sel.visible=true;//더블클릭막기
        setTimeout(function () {
            uigame.state.states.menu.uiselectlevel.spMask_sel.visible=false;//더블클릭풀기
            uigame.state.start('game');
            //uiSelectLevel.visible을 true로//this.uiStartLevel.onActiveLv();
            if (dm) console.log("start game!!!");
        }, 250); //--> clickGameMode
    };

    //레벨1버튼 Disable

    //아이콘 초기화
    grp.sOn.visible = true;
    grp.sSelected.visible = false;
    grp.sOff.visible = false;
    grp.sBonus.visible = false;
    grp.sLockBonus.visible = false;
    grp.sSelected.visible = false;

    grp.onActiveIcon = function (onoff) { //0:lock, 1:clear, 2:current, 3:bonus_lock, 4:bonus_clear, 5:bonus_current 6:bonus_playing
        switch (onoff) {
            case 0:                   //lock
                grp.sOn.visible = false;
                grp.sOff.visible = true;
                grp.sBonus.visible = false;
                grp.sLockBonus.visible = false;
                grp.sSelected.visible = false;
                break;
            case 1:                   //clear
                grp.sOn.visible = true;
                grp.sOff.visible = false;
                grp.sBonus.visible = false;
                grp.sLockBonus.visible = false;
                grp.sSelected.visible = false;
                break;
            case 2:                  //currnet
                grp.sOn.visible = true;
                grp.sOff.visible = false;
                grp.sBonus.visible = false;
                grp.sLockBonus.visible = false;
                grp.sSelected.visible = true;
                grp.sSelected.animations.play('idle', 5, true, undefined); //loop
                break;
            case 3:                   //bonus_lock
                grp.sOn.visible = false;
                grp.sOff.visible = false;
                grp.sBonus.visible = false;
                grp.sLockBonus.visible = true;
                grp.sSelected.visible = false;
                break;
            case 4:                   //bonus_clear
                grp.sOn.visible = false;
                grp.sOff.visible = false;
                grp.sBonus.visible = true;

                grp.z_panel_c.visible = true; //클리어 가지
                grp.z_panel_h.visible = false; //하트 가지

                grp.sLockBonus.visible = false;
                grp.sSelected.visible = false;
                break;
            case 5:                  //bonus_current
                grp.sOn.visible = false;
                grp.sOff.visible = false;
                grp.sBonus.visible = true;

                grp.z_panel_c.visible = false; //클리어 가지
                grp.z_panel_h.visible = true; //하트 가지

                grp.sLockBonus.visible = false;
                grp.sSelected.visible = true;
                grp.sSelected.animations.play('idle', 5, true, undefined); //loop
                break;
            case 6:                  //bonus_playing
                grp.sOn.visible = false;
                grp.sOff.visible = false;
                grp.sBonus.visible = true;

                grp.z_panel_c.visible = false; //클리어 가지
                grp.z_panel_h.visible = true; //하트 가지

                grp.sLockBonus.visible = false;
                grp.sSelected.visible = false;
                break;
            default:
                break;
        }
    };
    grp.onSetHeart = function (count) {
        grp.sBonusTx.text = count;
    };
    grp.onSetStar = function (starcount) { //0:lock, 1:clear, 2:ing
        switch (starcount) {
            case 0:
                grp.sOn.sStar1.loadTexture('atlas_bb_ui-0', "select_star_empty.png");
                grp.sOn.sStar2.loadTexture('atlas_bb_ui-0', "select_star_empty.png");
                grp.sOn.sStar3.loadTexture('atlas_bb_ui-0', "select_star_empty.png");
                break;
            case 1:
                grp.sOn.sStar1.loadTexture('atlas_bb_ui-0', "select_star.png");
                grp.sOn.sStar2.loadTexture('atlas_bb_ui-0', "select_star_empty.png");
                grp.sOn.sStar3.loadTexture('atlas_bb_ui-0', "select_star_empty.png");
                break;
            case 2:
                grp.sOn.sStar1.loadTexture('atlas_bb_ui-0', "select_star.png");
                grp.sOn.sStar2.loadTexture('atlas_bb_ui-0', "select_star.png");
                grp.sOn.sStar3.loadTexture('atlas_bb_ui-0', "select_star_empty.png");
                break;
            case 3:
                grp.sOn.sStar1.loadTexture('atlas_bb_ui-0', "select_star.png");
                grp.sOn.sStar2.loadTexture('atlas_bb_ui-0', "select_star.png");
                grp.sOn.sStar3.loadTexture('atlas_bb_ui-0', "select_star.png");
                break;
            default:
                break;
        }
    };
    grp.onSetLvIdx = function(lvidx){
        grp.z_index = lvidx;
    };
    grp.onSetLvNum = function (lvnum) { //lvnum=lvidx+1
        grp.sOn.tx.text = lvnum;
    };
    grp.onSetIcon = function (lvnum) { //lvnum=lvidx+1
        //PngList_minimap[0]은 001.png에서 시작, lvnum은 1부터 시작

        grp.sOn.icon.loadTexture(PngList_minimap[lvnum - 1].name);

    };
    return grp;
}

//컴포넌트 하트,패들,뒷배경
function createUIlifeStar() {
    var grp = uigame.add.group();
    //grp.position.set(xc, yc);
    //var ret = uigame.add.sprite(0, 0, "atlas_bb_ui-0", "life_bg.png");
    //ret.anchor.setTo(0.5, 0.5); //debug_Sprite(ret);

    grp.z_star=[];
    grp.z_star.push(uigame.add.sprite( -40, 2, "atlas_bb_ui-0", "life.png"));
    grp.z_star.push(uigame.add.sprite( 29, 2, "atlas_bb_ui-0", "life.png"));
    grp.z_star.push(uigame.add.sprite(98, 2, "atlas_bb_ui-0", "life.png"));

    grp.z_star[0].anchor.setTo(0.5, 0.5); //debug_Sprite(ret.z_star[0]);
    grp.addChild(grp.z_star[0]);
    grp.z_star[1].anchor.setTo(0.5, 0.5); //debug_Sprite(ret.z_star[1]);
    grp.addChild(grp.z_star[1]);
    grp.z_star[2].anchor.setTo(0.5, 0.5);// debug_Sprite(ret.z_star[2]);
    grp.addChild(grp.z_star[2]);

    //별갯수를 업데이트하는
    grp.onSetLife = function (lifes) {
        switch (lifes){
            case 3:
                grp.z_star[0].loadTexture('atlas_bb_ui-0', 'life.png'); //텍스쳐교체,텍스쳐교환,텍스쳐체인지
                grp.z_star[1].loadTexture('atlas_bb_ui-0', 'life.png');
                grp.z_star[2].loadTexture('atlas_bb_ui-0', 'life.png');
                break;
            case 2:
                grp.z_star[0].loadTexture('atlas_bb_ui-0', 'life.png');
                grp.z_star[1].loadTexture('atlas_bb_ui-0', 'life.png');
                grp.z_star[2].loadTexture('atlas_bb_ui-0', 'life_disable.png');
                break;
            case 1:
                grp.z_star[0].loadTexture('atlas_bb_ui-0', 'life.png');
                grp.z_star[1].loadTexture('atlas_bb_ui-0', 'life_disable.png');
                grp.z_star[2].loadTexture('atlas_bb_ui-0', 'life_disable.png');
                break;
            case 0:
                grp.z_star[0].loadTexture('atlas_bb_ui-0', 'life_disable.png');
                grp.z_star[1].loadTexture('atlas_bb_ui-0', 'life_disable.png');
                grp.z_star[2].loadTexture('atlas_bb_ui-0', 'life_disable.png');
                break;
            default:

                break;
        }
    };//grp.onSetLife

    grp.onMoveLife = function (lifes) { //상단메뉴에서 별 사라짐
        //별사라지는 spine스파인 작동
        var stgame = uigame.state.states.game;
        stgame.uiController.uiDropStar.x=xc;
        stgame.uiController.uiDropStar.y=xc;
        if(kData.bSoundSE) SE_Star_off.play();  //패들이 죽어서 별점이 줄어들때
        switch (lifes){
            case 3:
                break;
            case 2:
                stgame.uiController.uiDropStar.position.setTo(455,45);
                stgame.uiController.uiDropStar.visible = true;
                stgame.uiController.uiDropStar.z_spine.setAnimationByName(1, "heart_bomb_out", false);
                stgame.uiController.uiDropStar.z_spine.addAnimationByName(0, "empty", false);
                break;
            case 1:
                //grp.z_life.z_star[1]
                stgame.uiController.uiDropStar.position.setTo(384,45);
                stgame.uiController.uiDropStar.visible = true;
                stgame.uiController.uiDropStar.z_spine.setAnimationByName(1, "heart_bomb_out", false);
                stgame.uiController.uiDropStar.z_spine.addAnimationByName(0, "empty", false);
                break;
            case 0:
                //grp.z_life.z_star[0]
                stgame.uiController.uiDropStar.position.setTo(315,45);
                stgame.uiController.uiDropStar.visible = true;
                stgame.uiController.uiDropStar.z_spine.setAnimationByName(1, "heart_bomb_out", false);
                stgame.uiController.uiDropStar.z_spine.addAnimationByName(0, "empty", false);
                break;
            default:
                break;
        }
    };//별제거 애니

    return grp;
}

//컴포넌트 SCORE: 1000          //위치xy, local위치xy, 앞이름, 스타일1, 스타일2, 피봇1, 피봇2
function createUITextAndNumber(x, y, xx, yy, name, namestyle, numberstyle, p1x, p1y, p2x, p2y, useShadow) {
    ret = uigame.add.text(x, y, name, namestyle);
    ret.anchor.setTo(p1x, p1y); //debug_Sprite(ret);
    if(useShadow) ret.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);

    ret.z_number = uigame.add.text(xx, yy, "0 ", numberstyle);
    ret.z_number.anchor.setTo(p2x, p2y); //debug_Sprite(ret.z_number);
    if(useShadow) ret.z_number.setShadow(5, 5, 'rgba(0,0,0,0.5)', 5);
    ret.addChild(ret.z_number);

    return ret;
}


function CreateUIBackground(index) { //게임메인 배경

    var grp = uigame.add.group();
    grp.position.set(xc, yc);

    grp.texarr = [
        'back_img_1.png', //  0- 49 //배경벽지
        'back_img_2.png', // 50- 99
        'back_img_3.png', //100-149
        'back_img_4.png', //150-199
        'back_img_5.png', //200-249

        'back_img_6.png', //250-299
        'back_img_7.png' //300-349
    ];

    //타일배경
    //grp.z_dlbg = uigame.add.tileSprite(0, 0, 720, 1280, 'atlas_bb_ui_dlg-0', grp.texarr[index]);
    //스프라이트배경
    grp.z_dlbg = uigame.add.sprite(0, 0, 'atlas_bb_wallpaper-0', grp.texarr[index]);
    grp.z_dlbg.anchor.setTo(0.5, 0.5);
    grp.z_dlbg.scale.setTo(2.0,2.0);
    grp.addChild(grp.z_dlbg);

    //셀로판 x 컨트롤
    // grp.z_cellophane =  createUI9a('atlas_bb_ui-0', 'touch.png', 0, yc-125, 650, 240, 10, 10, 10, 10);
    // grp.z_cellophane.anchor.setTo(0.5, 0.5);
    // grp.addChild(grp.z_cellophane);//debug_Sprite(grp.z_cellophane);`
    //셀로판 xy 컨트롤
    grp.z_cellophane =  createUI9a('atlas_bb_ui-0', 'touch.png', 0, yc-75, 650, 140, 10, 10, 10, 10);
    grp.z_cellophane.anchor.setTo(0.5, 0.5);
    grp.addChild(grp.z_cellophane); //debug_Sprite(grp.z_cellophane);

    grp.onSetTex = function (idx) {
        //var bgidx = float2int(idx/50);
        var bgidx = idx%grp.texarr.length;
        if(dm) console.log( "wallpaper index:"+ bgidx);
        if(bgidx>(grp.texarr.length-1)) bgidx=(grp.texarr.length-1);
        grp.z_dlbg.loadTexture('atlas_bb_wallpaper-0', grp.texarr[bgidx]); //교체
    };


    return grp;
}
function  CreateUIProgress(progspr, progbgspr, px, py) {
    var grp = uigame.add.group();
    grp.position.setTo(px, py);
    grp.old_bias=-1;
    //프로그래스바 배경
    grp.z_progressbg = progbgspr;
    grp.z_progressbg.anchor.setTo(0,0);//항상 anchor.setTo(0,0);으로 되어야 한다.
    grp.addChild(grp.z_progressbg);
    //프로그래스바
    grp.z_progress = progspr;
    grp.z_progress.anchor.setTo(0,0);//항상 anchor.setTo(0,0);으로 되어야 한다.
    grp.addChild(grp.z_progress);
    //프로그래스바 마스크
    grp.z_w = grp.z_progress.width;
    grp.z_h = grp.z_progress.height;
    grp.z_mask = uigame.add.graphics(0, 0); //마스크 생성
    grp.z_mask.beginFill(0xffffff);         //마스크 보이는영역(흰색)
    grp.z_mask.drawRect(0, 0, grp.z_w, grp.z_h);    //마스크 구역생성
    grp.z_progress.mask = grp.z_mask;       //마스크 할당
    grp.z_progress.addChild(grp.z_mask);    //마스크 계층구조

    grp.onUpdatePr = function(bias){
        if(grp.old_bias!== bias) {//업데이트 줄일 려고
            grp.z_mask.scale.x = bias;
            grp.old_bias = bias
        }
    };
    return grp;
}
function CreateUIProgressWithindicator(progressbar, arron, arroff, arrindi, arrbias, arryoff){
    //                //
    //arrindi = [allblockcount ];

    var grp = uigame.add.group();
    grp.z_progindi = progressbar;
    grp.addChild(grp.z_progindi);
    grp.z_cnt=0;

    var arrprop;//임시데이터


    grp.z_timer = uigame.add.text(-31+20, -558, "00:00", style_bb_timer_ingame);//style_shopplusheart);
    grp.z_timer.anchor.setTo(0.5, 0.5);
    grp.addChild(grp.z_timer); //debug_Sprite(grp.z_timer);

    //선을 먼저 처리
    if(typeof(arrindi) === 'undefined') grp.z_arrindi=undefined;
    else {
        grp.z_arrindi = arrindi;//저장
        arrprop =  grp.z_arrindi;
        for (var k in arrprop){
            //debug_Sprite(arrprop[k]);
            arrprop[k].anchor.setTo(0.5,0.5);
            grp.z_progindi.addChild(arrprop[k]);
        }
    }
    
    //별
    if(typeof(arron) === 'undefined') grp.z_arron=undefined;
    else{
        grp.z_arron = arron;//저장
        grp.z_cnt = grp.z_arron.length;//저장
        arrprop = grp.z_arron;
        for (var k in arrprop){
            //debug_Sprite(arrprop[k]);
            arrprop[k].anchor.setTo(0.5,0.5);
            grp.z_progindi.addChild(arrprop[k]);
        }
    }

    //별off
    if(typeof(arroff) === 'undefined') grp.z_arroff=undefined;
    else {
        grp.z_arroff = arroff;//저장
        arrprop = grp.z_arroff;
        for (var k in arrprop){
            //debug_Sprite(arrprop[k]);
            arrprop[k].anchor.setTo(0.5,0.5);
            grp.z_progindi.addChild(arrprop[k]);
        }
    }

    //선배치x bias값들
    if(typeof(arrbias) === 'undefined') grp.z_arrbias=undefined;
    else {
        grp.z_arrbias = arrbias;//저장
        var idx;
        for (idx in arrprop){
            grp.z_arron[idx].x = grp.z_arrbias[idx]*grp.z_progindi.z_w;
            grp.z_arroff[idx].x = grp.z_arrbias[idx]*grp.z_progindi.z_w;
            grp.z_arrindi[idx].x = grp.z_arrbias[idx]*grp.z_progindi.z_w;
        }
    }

    //y값들
    if(typeof(arryoff) === 'undefined') grp.z_arryoff=undefined;
    else {
        grp.z_arryoff = arryoff;//저장
        arrprop =  grp.z_arron;
        for (var idy in arrprop){ arrprop[idy].y=grp.z_arryoff[0];}
        arrprop =  grp.z_arroff;
        for (var idy in arrprop){ arrprop[idy].y=grp.z_arryoff[1];}
        arrprop =  grp.z_arrindi;
        for (var idy in arrprop){ arrprop[idy].y=grp.z_arryoff[2];}
    }

    //값트윈오브젝트
    grp.z_tweenSec = uigame.add.group();
    grp.z_tweenSec.position.setTo(135+50,18+50);//프로그래스바좌측상단이 기본값이므로, 옾셋지정

    grp.z_tweenSec.z_inity = grp.z_tweenSec.y;//초기 위치값 Y저장

    grp.z_progindi.addChild(grp.z_tweenSec);
    grp.z_tweenSec_Num = uigame.add.bitmapText(0, 0, 'combo_no-export', "+0", 60, undefined);//비트맵폰트 크기가 71
    grp.z_tweenSec_Num.anchor.setTo(1,0.72);//위치잡기
    //grp.z_tweenSec_Num.alpha=0.7;
    grp.z_tweenSec.addChild(grp.z_tweenSec_Num);
    grp.z_tweenSec_Sec = uigame.add.sprite(0, 0, "atlas_bb_ui-0", "combo_sec.png");
    grp.z_tweenSec_Sec.anchor.setTo(0,0.5);//위치잡기
    //grp.z_tweenSec_Sec.alpha=0.7;
    grp.z_tweenSec.addChild(grp.z_tweenSec_Sec);
    //값트윈오브젝트

    grp.tempstarcnt=0;

    grp.onUpdateProg = function(bias){

        if(grp.z_progindi.old_bias!==bias) {//업데이트 줄일 려고
            grp.z_progindi.onUpdatePr(bias);
            grp.tempstarcnt=0;
            for (var i = 0; i < grp.z_cnt; i++) {
                if (grp.z_arrbias[i] <= bias) { //현재타임보다 작거나 같으면
                    //활성
                    grp.z_arron[i].visible = true;
                    grp.z_arroff[i].visible = false;
                    grp.tempstarcnt+=1;
                } else {
                    //비활성
                    grp.z_arron[i].visible = false;
                    grp.z_arroff[i].visible = true;
                }
            }
            curMyStars=grp.tempstarcnt;
        }//업데이트 줄임
    };//fn

    // grp.onGetMedalByBias = function(bias){
    //     grp.tempstarcnt=0;
    //     for (var i = 0; i < grp.z_cnt; i++) {
    //         if (grp.z_arrbias[i] <= bias) { //현재타임보다 작거나 같으면
    //             //활성
    //             grp.tempstarcnt+=1;
    //         } else {
    //             //비활성
    //         }
    //     }
    //     return grp.tempstarcnt;
    // };//fn
    //
    // grp.onUpdateForce = function(count){
    //     var forcebias = grp.z_arrbias[3-count];
    //     grp.z_progindi.onUpdatePr(forcebias);
    //     for (var i = 0; i < grp.z_cnt; i++) {
    //         if(i<count){
    //             grp.z_arron[i].visible = true;
    //             grp.z_arroff[i].visible = false;
    //         } else {
    //             //비활성
    //             grp.z_arron[i].visible = false;
    //             grp.z_arroff[i].visible = true;
    //         }
    //     }
    //     curMyStars=count;
    // };//fn


    grp.onGetStar = function(){
        var ret=0;
        for (var i = 0; i < grp.z_cnt; i++) {
            if(grp.z_arron[i].visible === true){
                ret+=1;
            }
        }
        return ret;
    };//fn

    grp.onTweenSec = function(num){
        grp.z_tweenSec_Num.text = "+"+num;
        var sc1 = grp.z_tweenSec;

        // // //플로팅스코어텍스트 애니메이션-------------------//in runTweenCombo
        // TweenMax.set(sc1, {alpha: 1, y: sc1.z_inity});
        // TweenMax.to(sc1, 0.5, {
        //     y: "-=25", alpha: 0, ease: Linear.easeNone, onComplete: function () {
        //         //sc1.kill();
        //     }
        // });
        // // //플로팅스코어텍스트 애니메이션--------------

        //콤보트윈---------------------
        //전 트윈 제거
        if (TweenMax.isTweening(sc1)) {
            TweenMax.killTweensOf(sc1);
        }
        //콤보 숫자 적용
        //this.uiCombo.onSetNumber(curComboCount);
        //위치고정도 필요없어서 주석
        //this.uiCombo.position.setTo(this.uiCombo.z_xinit, this.uiCombo.y_xinit);
        //보이기
        //this.uiCombo.onShow();

        sc1.visible= true;
        TweenMax.set(sc1.scale, {x: 0.8, y:0.8});
        TweenMax.to(sc1.scale, 0.5, {
            //y: "-=100",
            x: 1.0,
            y: 1.0,
            ease: Elastic.easeOut,//ease: Linear.easeNone,
            onComplete: function () { sc1.visible=false; },
            //onUpdate: function () { console.log(combo.y); }
            dealy:0
        });
        //콤보트윈-----------------------
    };//fn

    grp.onTweenSec_Hide = function(){
        grp.z_tweenSec.visible=false;
    };//fn

    grp.onUpdateTime = function(txt){
        grp.z_timer.text = txt;
    };//fn
    return grp;
}

function CreateUIMainGame() { //게임메인 창
    var grp = uigame.add.group();
    grp.position.set(xc, yc);

    if(modeOption[0]===2) grp.z_mainmode = "bonus";
    else grp.z_mainmode = "normal";

    //보너스노드생성
    grp.z_bonus = uigame.add.group();
    grp.addChild(grp.z_bonus);
    //노말노드생성
    grp.z_normal = uigame.add.group();
    grp.addChild(grp.z_normal);

    //보너스 상단배경
    grp.z_top_b = uigame.add.sprite(0, -500, "atlas_bb_ui-0", "top_bonus.png");
    grp.z_top_b.anchor.setTo(0.5, 1);
    grp.z_bonus.addChild(grp.z_top_b);
    //노말 상단배경
    grp.z_top_n = uigame.add.sprite(0, -500, "atlas_bb_ui-0", "top.png");
    grp.z_top_n.anchor.setTo(0.5, 1);
    grp.z_normal.addChild(grp.z_top_n);
    //노말 인게임 스테이지번호
    grp.z_stageName = createUITextAndNumber(103+20, -608, 10, 0, " STAGE", style_bb_stage_ingame, style_bb_stage_ingame,  1, 0.5, 0, 0.5, false);
    grp.z_normal.addChild(grp.z_stageName); //debug_Sprite( grp.z_stageName);
    grp.z_stageName.z_number.text="";
    //노말 인게임 프로그래스바+타이머 배경
    grp.z_infobg = createUI9a('atlas_bb_ui-0', 'info.png', 70+20, -561, 323, 46, 27, 27, 0, 0);
    grp.z_normal.addChild(grp.z_infobg); //debug_Sprite(grp.z_infobg);



    //보너스 상단 타이틀
    grp.z_top_title_b = uigame.add.sprite(-54, -630, "atlas_bb_ui-0", "bonus_title.png");
    grp.z_bonus.addChild(grp.z_top_title_b);//debug_Sprite(grp.z_top_title_b);
    //보너스 하트 상단 배경
    grp.z_infobg_b = createUI9a('atlas_bb_ui-0', 'info_bonus.png', 70+20, -556, 303, 56, 27, 27, 27, 27);
    grp.z_bonus.addChild(grp.z_infobg_b); //debug_Sprite(grp.z_infobg_b);
    //보너스 하트 아이콘
    grp.z_top_icon_b = uigame.add.sprite(-15-10, -579, "atlas_bb_ui-0", "bonus_block.png");
    grp.z_bonus.addChild(grp.z_top_icon_b);//debug_Sprite(grp.z_top_icon_b);
    //보너스 인게임 하트 갯수
    grp.z_heartcnt_b = createUITextAndNumber(114+20, -553, 0, 0, "2", style_bb_hcnt1_b, style_bb_hcnt2_b,  1, 0.5, 0, 0.5, false);
    grp.z_bonus.addChild(grp.z_heartcnt_b); //debug_Sprite( grp.z_heartcnt_b);
    grp.z_heartcnt_b.text = kData.userData[curLevel];
    grp.z_heartcnt_b.z_number.text="/"+modeOption[2]; //grp.z_heartcnt_b.z_number.text="/22";

    // //인게음 타이머//프로그래스바로 이동하려고
    // grp.z_timer = uigame.add.text(-31, -558, "00:00", style_bb_timer_ingame);//style_shopplusheart);
    // grp.z_timer.anchor.setTo(0.5, 0.5);
    // grp.z_normal.addChild(grp.z_timer); //debug_Sprite(grp.z_timer);

    // // //프로그래스바 오브젝트
    // grp.prog = CreateUIProgress(
    //     createUI9a('atlas_bb_ui-0', 'gage.png', 0, 0, 196, 30, 15, 15, 0, 0),//프로그래스바
    //     createUI9a('atlas_bb_ui-0', 'gage_bg.png', 0, 0, 196, 30, 15, 15, 0, 0),//바 배경
    //     27,
    //     -576
    // );
    // grp.prog.onUpdate(0.5);
    // grp.z_normal.addChild(grp.prog);
    // // //프로그래스바 오브젝트

    grp.z_prog = CreateUIProgressWithindicator(
        //프로그래스바
        CreateUIProgress(
            createUI9a('atlas_bb_ui-0', 'gage.png', 0, 0, 196, 30, 15, 15, 0, 0),//프로그래스바
            createUI9a('atlas_bb_ui-0', 'gage_bg.png', 0, 0, 196, 30, 15, 15, 0, 0),//바 배경
            27+20,
            -576
        ),
        //별ON
        [
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_star.png"),
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_star.png"),
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_star.png")
        ],
        //별OFF
        [
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_star_disable.png"),
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_star_disable.png"),
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_star_disable.png")
        ],
        [
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_line.png"),
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_line.png"),
            uigame.add.sprite(0, 0, "atlas_bb_ui-0", "gage_line.png")
        ],
        allstarbias, //[0.1, 0.2, 0.5],//각별의 위치(비율값)//프로그래스바설정(시간라인)
        [-6, -6, 16] //별on위치,별off위치,실선위치-->y값(로컬배치이동값)
    );
    grp.z_prog.onUpdateProg(1);
    grp.z_prog.onTweenSec_Hide();
    if(dm) console.log("grp.z_prog.onGetStar()=="+grp.z_prog.onGetStar());
    grp.z_normal.addChild(grp.z_prog);
    //지울것들-----------

    //라이프별
    //grp.z_lifestar=createUIlifeStar();
    //grp.z_lifestar.position.setTo(-4, -597);
    //grp.z_lifestar.alpha=0.1;
    //grp.addChild(grp.z_lifestar);
    //스코어 넘버 생성
    //grp.z_scoreNumber = createUITextAndNumber(-19, -536, 8, 0, "SCORE:", style_30_stage, style_30_stageNumber, 1, 0.5, 0, 0.5, false);
    //grp.addChild(grp.z_scoreNumber); //debug_Sprite(grp.z_scoreNumber);
    //지울것들-----------

    grp.z_warning = CreateUIWarning();
    uiWarningGlobal = grp.z_warning;
    grp.z_warning.onHide();
    grp.z_warning.position.setTo(0, -470);
    grp.z_warning.z_xinit = 0;
    grp.z_warning.z_yinit = -470;
    grp.addChild(grp.z_warning);

    grp.z_itemsel = CreateUIItemSelected();
    grp.z_itemsel.position.setTo(0, -390);
    grp.addChild(grp.z_itemsel);

    grp.z_combo = CreateUICombo();//콤보생성
    grp.z_combo.onHide();
    grp.z_combo.position.setTo(10, -430);
    grp.z_combo.z_xinit = 10;
    grp.z_combo.z_yinit = -450;
    grp.addChild(grp.z_combo);

    grp.z_shopplus = createUIShopPlusButton();
    grp.z_shopplus.position.setTo(-xc+165,-yc+60);
    grp.addChild(grp.z_shopplus);

    //일시정지버튼 생성
    grp.z_pause = createbtn(uigame.add.sprite(0, 0, 'atlas_bb-0', "btn_pause.png"),
        undefined,
        undefined,
        291+20, -588,
        undefined
    );

    grp.onShow = function (mode) {
        //switch (mode){
        switch (grp.z_mainmode){
            case 'normal':
                grp.z_normal.visible = true;
                grp.z_bonus.visible = false;
                break;
            case 'bonus':
                grp.z_normal.visible = false;
                grp.z_bonus.visible = true;
                break;
        }
    };


    grp.onUpdateBonusHeart = function () {
        grp.z_heartcnt_b.text = kData.userData[curLevel];
        grp.z_heartcnt_b.z_number.text = modeOption[2];
    };

    grp.addChild(grp.z_pause);//debug_Sprite(grp.z_pause);
    return grp;
}

function _createUIDlgBg_bb( uppername ){
    //팝업 다이얼로그 배경만 생성한다.(버튼,타이틀 제외
    var grp = uigame.add.group();
    grp.position.set(xc, yc);
    //투명배경
    grp.z_bg = uigame.add.sprite(0, 0, 'white1x1');
    grp.z_bg.name = 'bguipause';
    grp.addChild(grp.z_bg);
    grp.z_bg.inputEnabled = true;
    grp.z_bg.width = 720;
    grp.z_bg.height = 1280;
    grp.z_bg.tint = ColorSet.black;
    grp.z_bg.alpha = 0.5;
    grp.z_bg.anchor.setTo(0.5, 0.5);
    //투명배경

    grp.z_dlg = uigame.add.group();
    grp.z_dlg.position.set(0, 0);
    grp.addChild(grp.z_dlg);

    if(uppername==='uigameover') { //게임오버용bg
        //전체판(1개짜리)
        grp.z_dlgall = uigame.add.sprite(0, 0, 'atlas_bb_ui_dlg-0', 'popup_over.png'); //기본위치로 사용됨
        grp.z_dlgall.anchor.setTo(0.5, 0.5);
        grp.z_dlgall.name = 'dlgbg9';
        grp.z_dlg.addChild(grp.z_dlgall); //debug_Sprite(grp.z_dlgall);
        grp.z_dlgall.alpha =1;

        grp.z_dlgmelt = uigame.add.sprite(0, -260, 'atlas_bb_ui_dlg-0','popup_over_deco.png');
        grp.z_dlgmelt.anchor.setTo(0.5, 0.5);
        grp.z_dlgmelt.name = 'dlgbg9';
        grp.z_dlgmelt.alpha=1;
        grp.z_dlg.addChild(grp.z_dlgmelt); //debug_Sprite(grp.z_dlgmelt);
    }else if(uppername==='uistart'){ //레벨클리어배경,레벨스타트배경
        //(2개짜리-노말)
        grp.z_normalbg = uigame.add.group();
        grp.z_dlg.addChild(grp.z_normalbg);
        //하판
        grp.z_dlgdown = uigame.add.sprite(0, 54, 'atlas_bb_ui_dlg-0', 'popup_start_bottom.png');
        grp.z_dlgdown.anchor.setTo(0.5, 0.5);
        grp.z_dlgdown.name = 'dlgbg9';
        grp.z_normalbg.addChild(grp.z_dlgdown); //debug_Sprite(grp.z_dlgdown);
        grp.z_dlgdown.alpha=1;
        //상판
        grp.z_dlgtop = uigame.add.sprite(0, -223, 'atlas_bb_ui_dlg-0', 'popup_start_top.png');
        grp.z_dlgtop.anchor.setTo(0.5, 1);
        grp.z_dlgtop.name = 'z_dlgtop';
        grp.z_normalbg.addChild(grp.z_dlgtop); //debug_Sprite(grp.z_dlgtop);
        grp.z_dlgtop.alpha=1;

        //(2개짜리-보너스)
        grp.z_bonusbg = uigame.add.group();
        grp.z_dlg.addChild(grp.z_bonusbg);
        //하판
        grp.z_dlgdown_b = uigame.add.sprite(0, 54+3, 'atlas_bb_ui_dlg-0', 'popup_bonus_bottom.png');
        grp.z_dlgdown_b.anchor.setTo(0.5, 0.5);
        grp.z_dlgdown_b.name = 'dlgbg9_b';
        grp.z_bonusbg.addChild(grp.z_dlgdown_b); //debug_Sprite(grp.z_dlgdown);
        grp.z_dlgdown_b.alpha=1;
        //상판
        grp.z_dlgtop_b = uigame.add.sprite(0, -223+5, 'atlas_bb_ui_dlg-0', 'popup_bonus_top.png');
        grp.z_dlgtop_b.anchor.setTo(0.5, 1);
        grp.z_dlgtop_b.name = 'z_dlgtop_b';
        grp.z_bonusbg.addChild(grp.z_dlgtop_b); //debug_Sprite(grp.z_dlgtop);
        grp.z_dlgtop_b.alpha=1;

    }else if(uppername==='uicontinue'){ //컨티뉴배경
        //(2개짜리)
        //하판
        grp.z_dlgdown = uigame.add.sprite(0, 54, 'atlas_bb_ui_dlg-0', 'popup_start_bottom.png');
        grp.z_dlgdown.anchor.setTo(0.5, 0.5);
        grp.z_dlgdown.name = 'dlgbg9';
        grp.z_dlg.addChild(grp.z_dlgdown); //debug_Sprite(grp.z_dlgdown);
        grp.z_dlgdown.alpha=1;
        //상판
        grp.z_dlgtop = uigame.add.sprite(0, -223, 'atlas_bb_ui_dlg-0', 'popup_start_top.png');
        grp.z_dlgtop.anchor.setTo(0.5, 1);
        grp.z_dlgtop.name = 'z_dlgtop';
        grp.z_dlg.addChild(grp.z_dlgtop); //debug_Sprite(grp.z_dlgtop);
        grp.z_dlgtop.alpha=1;
    }else if(uppername==='uihelp') { //도움말
        //전체판(1개짜리)
        grp.z_dlgdown = uigame.add.sprite(0, 80, 'atlas_bb_ui_dlg-0', 'popup_shop_bottom.png');
        grp.z_dlgdown.anchor.setTo(0.5, 0.5);
        grp.z_dlgdown.name = 'dlgbg9';
        grp.z_dlg.addChild(grp.z_dlgdown); //debug_Sprite(grp.z_dlgdown);
        grp.z_dlgdown.alpha =1;

        //상판
        grp.z_dlgtop = uigame.add.sprite(0, -310, 'atlas_bb_ui_dlg-0', 'popup_item_top.png');
        grp.z_dlgtop.anchor.setTo(0.5, 1);
        grp.z_dlgtop.name = 'z_dlgtop';
        grp.z_dlg.addChild(grp.z_dlgtop); //debug_Sprite(grp.z_dlgtop);
        grp.z_dlgtop.alpha=1;


    }
    return grp;
}
function CreateUIReadyG0() { //레디고
    var grp = uigame.add.group();
    grp.z_spine=uigame.add.spine(360, 640, "ready_go");
    grp.addChild(grp.z_spine);
    spn_readygo = grp.z_spine; //전역변수에 저장

    grp.z_spine.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("spn_readygo.trackindex:0");
                //grp.visible = false; //다시 안나오는 문제가 잇어서 주석처리
                break;
            case 1:
                if(dm) console.log("spn_readygo.trackindex:1");
                break;
        }
    };

    return grp;
}
function CreateUIDropStar() { //별사용 ////empty, heart_bomb_out

    var grp = uigame.add.group();

    grp.z_spine=uigame.add.spine(0, 0, "star_bomb");
    grp.addChild(grp.z_spine);
    spn_dropstar = grp.z_spine; //전역변수에 저장

    grp.z_spine.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("star_bomb.trackindex:0");
                //grp.visible = false;
                break;
            case 1:
                if(dm) console.log("star_bomb.trackindex:1");
                break;
        }
    };

    return grp;
}

function CreateUIDropHeart() { //하트사용 ////empty, heart_bomb_out
    var grp = uigame.add.group();

    grp.z_spine=uigame.add.spine(0, 0, "heart_bomb");
    grp.addChild(grp.z_spine);
    //spn_dropheart = grp.z_spine; //전역변수에 저장

    grp.z_spine.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("star_bomb.trackindex:0");
                //grp.visible = false;
                break;
            case 1:
                if(dm) console.log("star_bomb.trackindex:1");
                break;
        }
    };
    return grp;
}

function CreateUIStartLevel() { //레벨시작시 별보여주는 창
    var grp = _createUIDlgBg_bb('uistart');
    //var grp = _createUIDlgBg_bb('popup_over.png', 'popup_start_top.png');

    grp.z_startmode="normal";

    grp.z_normal = uigame.add.group();
    grp.z_dlg.addChild(grp.z_normal);

    grp.z_bonus = uigame.add.group();
    grp.z_dlg.addChild(grp.z_bonus);

    //미니맵배경
    grp.z_minibg = uigame.add.sprite(0, -53, 'atlas_bb_ui_dlg-0', 'start_map_bg_1.png');
    grp.z_minibg.anchor.setTo(0.5, 0.5);
    grp.z_minibg.name = 'z_minibg';
    grp.z_normal.addChild(grp.z_minibg); //debug_Sprite(grp.z_minibg);

    //미니맵모노 색상
    // grp.z_mini = uigame.add.sprite(0, 0, '001.png');
    // grp.z_mini.scale.setTo(2.75, 2.75);//grp.z_mini.scale.setTo(5.5, 5.5);//미니맵사이즈 118x102,미니맵스케일
    // grp.z_mini.anchor.setTo(0.5, 0.5);
    // grp.z_mini.name = 'z_minimap';
    // grp.z_mini.loadTexture('299.png');  //<----------------미니맵
    // grp.z_mini.scale.setTo(6, 6); //미니맵사이즈 //미니맵스케일
    // grp.z_mini.tint = ColorSet.red;
    // grp.z_mini.alpha = 0.55;
    // grp.z_minibg.addChild(grp.z_mini); //debug_Sprite(grp.z_minibg);
    //미니맵
    grp.z_mini = uigame.add.sprite(0, 0, '001.png');
    grp.z_mini.scale.setTo(2.75, 2.75);//grp.z_mini.scale.setTo(5.5, 5.5);//미니맵사이즈 118x102,미니맵스케일
    grp.z_mini.anchor.setTo(0.5, 0.5);
    grp.z_mini.name = 'z_minimap';
    grp.z_mini.loadTexture('299.png');                                                                        //<----------------미니맵
    grp.z_minibg.addChild(grp.z_mini); //debug_Sprite(grp.z_minibg);

    //별3개배경
    grp.z_star1 = uigame.add.sprite(-150, -371, 'atlas_bb_ui-0', 'start_star_1_empty.png');
    grp.z_star1.anchor.setTo(0.5, 0.5);
    grp.z_star1.name = 'z_star1';
    grp.z_normal.addChild(grp.z_star1); //debug_Sprite(grp.z_star1);
    grp.z_star3 = uigame.add.sprite(150, -371, 'atlas_bb_ui-0', 'start_star_3_empty.png');
    grp.z_star3.anchor.setTo(0.5, 0.5);
    grp.z_star3.name = 'z_star3';
    grp.z_normal.addChild(grp.z_star3); //debug_Sprite(grp.z_star3);
    grp.z_star2 = uigame.add.sprite(0, -393, 'atlas_bb_ui-0', 'start_star_2_empty.png');
    grp.z_star2.anchor.setTo(0.5, 0.5);
    grp.z_star2.name = 'z_star2';
    grp.z_normal.addChild(grp.z_star2); //debug_Sprite(grp.z_star2);
    //별3개
    grp.z_star1y = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'start_star_1.png');
    grp.z_star1y.anchor.setTo(0.5, 0.5);
    grp.z_star1y.name = 'z_star1';
    grp.z_star1.addChild(grp.z_star1y); //debug_Sprite(grp.z_star1y);
    grp.z_star3y = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'start_star_3.png');
    grp.z_star3y.anchor.setTo(0.5, 0.5);
    grp.z_star3y.name = 'z_star3';
    grp.z_star3.addChild(grp.z_star3y); //debug_Sprite(grp.z_star3y);
    grp.z_star2y = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'start_star_2.png');
    grp.z_star2y.anchor.setTo(0.5, 0.5);
    grp.z_star2y.name = 'z_star2';
    grp.z_star2.addChild(grp.z_star2y); //debug_Sprite(grp.z_star2y);

    //스테이지 넘버 생성
    grp.z_stageNumber = createUITextAndNumber(52, -244, 61, 0, " STAGE", style_bb_stage_start, style_bb_stage_start,  1, 0.5, 0.5, 0.5, false);
    grp.z_normal.addChild(grp.z_stageNumber);//debug_Sprite(grp.z_stageNumber);
    grp.z_stageNumber.z_number.text = "1"; //랜덤(0~3포함));<----------------레벨번호

    //스코어배경
    grp.z_scorebg = createUI9a('atlas_bb_ui_dlg-0', 'start_score_bg.png', 0, 141, 470, 80, 46, 46, 20, 20);
    grp.z_normal.addChild(grp.z_scorebg); //debug_Sprite(grp.z_scorebg);
    //스코어 넘버 생성
    grp.z_scoreNumber = createUITextAndNumber(140, 3, 0, 0, "BASIC MODE", style_bb_score_start, style_bb_number_start,  1, 0.5, 1, 0.5, false);
    grp.z_scorebg.addChild(grp.z_scoreNumber);//debug_Sprite(grp.z_scoreNumber);
    grp.z_scoreNumber.z_number.text = "";
    grp.z_scoreNumber.z_number.z_max=0;
    grp.z_scoreNumber.z_number.z_num=0;

    //보너스모드-타이틀
    grp.z_bonus_title = uigame.add.sprite(0, -335, 'atlas_bb_ui-0', 'bouns_title.png');
    grp.z_bonus_title.anchor.setTo(0.5, 0.5);
    grp.z_bonus.addChild(grp.z_bonus_title);

    //보너스스테이지 넘버 생성
    grp.z_stageNumber_b= createUITextAndNumber(52, -244, 61, 0, " STAGE", style_bb_stage_start_b, style_bb_stage_start_b,  1, 0.5, 0.5, 0.5, false);
    grp.z_bonus.addChild(grp.z_stageNumber_b);//debug_Sprite(grp.z_stageNumber);
    grp.z_stageNumber_b.z_number.text = "1"; //랜덤(0~3포함));<----------------레벨번호
    grp.z_stageNumber_b.alpha=0;

    //보너스모드_미니맵
    grp.z_minibg_b = uigame.add.sprite(0, -63, 'atlas_bb_ui-0', 'bonus_image.png');
    grp.z_minibg_b.anchor.setTo(0.5, 0.5);
    grp.z_minibg_b.name = 'z_minibg';
    grp.z_bonus.addChild(grp.z_minibg_b); //debug_Sprite(grp.z_minibg);

    //보너스모드_스코어배경
    grp.z_scorebg_b = createUI9a('atlas_bb_ui-0', 'start_score_bg_bonus.png', 0, 141, 470, 80, 46, 46, 20, 20);
    grp.z_bonus.addChild(grp.z_scorebg_b); //debug_Sprite(grp.z_scorebg);
    grp.z_bonus_hminmap = uigame.add.sprite(-60-10, 0, 'atlas_bb_ui-0', 'result_bonus_block.png');
    grp.z_bonus_hminmap.anchor.setTo(0.5, 0.5);//debug_Sprite(grp.z_bonus_hminmap);
    grp.z_scorebg_b.addChild(grp.z_bonus_hminmap);
    //보너스모드_넘버 생성
    grp.z_scoreNumber_b = createUITextAndNumber(60+20, 3, 0, 7, "14", style_heartcount1_bonus, style_heartcount2_bonus,  1, 0.5, 0, 0.5, false);
    grp.z_scorebg_b.addChild(grp.z_scoreNumber_b);//debug_Sprite(grp.z_scoreNumber);
    grp.z_scoreNumber_b.z_number.text = "/99";                                                                 //<--------------스코어

    grp.z_scoreNumber_b.z_number.z_max=0;
    grp.z_scoreNumber_b.z_number.z_num=0;

    //보너스모드-모든 하트 클리어
    grp.z_allcollected = uigame.add.text(0, 5, "ALL COLLECTED", style_heartcount1_bonus);
    grp.z_allcollected.anchor.setTo(0.5,0.5);
    grp.z_scorebg_b.addChild(grp.z_allcollected);

    //예스버튼
    grp.z_btyes = createbtn(createUI9a('atlas_bb_ui-0', 'btn_yes_message.png', 0, 0, 210, 95, 45, 45, 45, 45),
        uigame.add.text(0, 0,  GetString("yes"), style_bb_yes),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        122, 241,
        style_bb_lv1
    );//debug_Sprite(grp.z_btyes);
    grp.z_dlg.addChild(grp.z_btyes);


    //노버튼
    grp.z_btno = createbtn(createUI9a('atlas_bb_ui-0', 'btn_no_message.png', 0, 0, 210, 95, 45, 45, 45, 45),
        uigame.add.text(0, 0,  GetString("no"), style_bb_no),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        -122, 241,
        style_bb_lv1
    );//debug_Sprite(grp.z_btno);
    grp.z_dlg.addChild(grp.z_btno);

    //하트소모연출리소스 //레벨시작창
    grp.z_spnHeart = CreateUIDropHeart();//하트파괴
    grp.z_spnHeart.visible = false;//debug_Sprite(this.uiDropStar);
    grp.z_spnHeart.x = 550;
    grp.z_spnHeart.y = 850;
    //하트소모연출리소스 //레벨시작창

    //에스피마스크-레벨시작시
    grp.z_mask = uigame.add.sprite(0, 0, 'white1x1');
    grp.z_mask.name = 'spMask_selectlevel';
    grp.z_mask.width = 720;
    grp.z_mask.height = 1280;
    grp.z_mask.tint = ColorSet.blue;
    grp.z_mask.alpha = 0;//0.555;
    grp.z_mask.anchor.setTo(0.5, 0.5);
    grp.z_mask.inputEnabled = true;
    grp.addChild(grp.z_mask);
    grp.z_mask.visible = false;
    //에스피마스크-레벨시작시

    // grp.z_btyes.fnok = function () { };

    grp.z_btno.fnok = function () {
        if(kData.bSoundSE) SE_Popup_OFF.play();
        if(false) {
            var dlg = grp.z_dlg;
            var bg = grp.z_bg;

            onFadeout(bg, 0.75);
            onFadeoutScale(dlg, function () {
                grp.visible = false;
                grp.z_mask.visible = false;
                uigame.state.states.game.onGameOver.dispatch();
                uigame.state.game.state.start('menu');
            });
            grp.z_mask.visible = true;
        }
        // //치트코드 -- 모든레벨 오픈 in CreateUIStartLevel
        // kData.userData = []; //in uiSelectLevel.onUpdatePage //cheat Mode
        // for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userData[i] = 3;
        // kData.userData[LEVEL_MAX-1]=0; //0레벨 오픈
        // networkManager.ForcedSaveData();
        // //치트코드 -- 모든레벨 오픈 in CreateUIStartLevel

        //
        //uigame.state.states.game.onGameOver.dispatch();
        uigame.state.game.state.start('menu');

    };
    grp.onSetSt = function (lvidx, time, starcount) { //수치들 입력해두기

        var sends={};

        if((lvidx + 1) % LV4x4 === 0) isBonusLvId = true;
        else isBonusLvId = false;

        if(isBonusLvId===true){
            if(kData.userData[lvidx+1]===-1) {
                kData.userData[lvidx+1]=0;
				if(nvmode===true){
				    sends.userData=kData.userData;//네이버저장하기
	                if(typeof GamePocket.Sdk !== 'undefined') {
	                    networkManager.AppDataPut(JSON.stringify(sends));
	                }
				}else{
                	networkManager.ForcedSaveData(); //처리 //CreateUIStartLevel.onSetSt
				}

            }
        }



        if(modeOption[0]===2) grp.z_startmode = "bonus";
        else grp.z_startmode = "normal";

        if(dm) console.log("isBonusLvId:"+isBonusLvId+", ");

        //보너스모드면 시작시 서버저장하트갯수 출력
        if(modeOption[0]===2){                        //보너스모드
            if(kData.userData[lvidx] < modeOption[2]){ //레벨하트갯수
                //grp.z_scoreNumber_b.z_number.text = kData.userData[lvidx];
                grp.z_bonus_hminmap.visible=true;
                grp.z_scoreNumber_b.visible=true;
                grp.z_scoreNumber_b.z_number.text = "/"+modeOption[2];
                grp.z_scoreNumber_b.text = kData.userData[lvidx];
                grp.z_allcollected.visible = false;

                grp.z_cleared=false;
            }else{
                grp.z_bonus_hminmap.visible=false;
                grp.z_scoreNumber_b.visible=false;
                //보너스모드-모든 하트 클리어
                grp.z_allcollected.visible=true;
                grp.z_cleared=true;
            }
        }

        switch (starcount) {
            case 0:
                grp.z_star1y.visible = false;
                grp.z_star2y.visible = false;
                grp.z_star3y.visible = false;
                break;
            case 1:
                grp.z_star1y.visible = true;
                grp.z_star2y.visible = false;
                grp.z_star3y.visible = false;
                break;
            case 2:
                grp.z_star1y.visible = true;
                grp.z_star2y.visible = true;
                grp.z_star3y.visible = false;
                break;
            case 3:
                grp.z_star1y.visible = true;
                grp.z_star2y.visible = true;
                grp.z_star3y.visible = true;
                break;
            default:
                break;
        }

        //grp.z_stageNumber.z_number.text = lvidx+1; //1~16, 17~32, ...
        //페이크 레벨번호 가져오기
        grp.z_stageNumber.z_number.text = lvidx + 1 - Math.floor(lvidx / LV4x4); //0~15,16, 16~30,31, ...
        grp.z_stageNumber_b.z_number.text = lvidx + 1 - Math.floor(lvidx / LV4x4); //0~15,16, 16~30,31, ...




        var ss = number_pad1(lvidx+1, 3) + ".png";
        grp.z_mini.loadTexture(ss);

        grp.z_scoreNumber.z_number.text = "";
        grp.z_scoreNumber.z_number.z_max = "";

        switch(grp.z_startmode){
            case "normal":
                grp.z_normalbg.visible=true;
                grp.z_normal.visible=true;
                grp.z_bonusbg.visible=false;
                grp.z_bonus.visible=false;
                break;
            case "bonus":
                grp.z_normalbg.visible=false;
                grp.z_normal.visible=false;
                grp.z_bonusbg.visible=true;
                grp.z_bonus.visible=true;
                break;
        }

    };
    grp.onActiveSt = function () { //트윈으로 등장하기
        if(!SE_HurryUp.isPlaying) {
            SE_HurryUp.play();
            SE_HurryUp.mute=true;
        }
        if(false && retrymode){
            //리트라이삭제 //--리트라이모드진입시---창이 안나오고 게임 진입
            //리트라이삭제 retrymode=false;
            //리트라이삭제 //스타트화면 닫기용 트윈 오브젝트
            //리트라이삭제 var stgame = uigame.state.states.game;
            //리트라이삭제 TweenMax.delayedCall(0.25,function() {
            //리트라이삭제     stgame.uiController.uiStartLevel.visible = false;
            //리트라이삭제     stgame.uiController.uiStartLevel.z_mask.visible = false;
            //리트라이삭제
            //리트라이삭제     TweenMax.delayedCall(0.5,function() { stgame.massiveController.introShow(); });
            //리트라이삭제     //레디고플레이
            //리트라이삭제
            //리트라이삭제     stgame.uiController.uiReadyGo.visible = true;
            //리트라이삭제     stgame.uiController.uiReadyGo.z_spine.setAnimationByName(1, "ready_go_ani", false); //리트라이 모드 in uistartlevel.onActiveLv
            //리트라이삭제     stgame.uiController.uiReadyGo.z_spine.addAnimationByName(0, "empty", false);
            //리트라이삭제     //
            //리트라이삭제
            //리트라이삭제
            //리트라이삭제     //stgame.massiveController.introShow();
            //리트라이삭제 });
            //리트라이삭제
            //리트라이삭제 //시작창 사라진 후, 인트로 시작
            //리트라이삭제 TweenMax.delayedCall(0.1,function(){
            //리트라이삭제     stgame.gameBegun = true;
            //리트라이삭제     //uigame.state.states.game.gameBegun = true;
            //리트라이삭제     uimode = uimodeset.ingame;
            //리트라이삭제     // uigame.state.states.game.onGameBegin.dispatch();
            //리트라이삭제     stgame.onGameBegin.dispatch();
            //리트라이삭제     timer20sec=alonemode?9:time20secMax;
            //리트라이삭제 });//delay
            //리트라이삭제 //--리트라이모드진입시---
        }else {
            //--일반모드진입시-------
            //트윈버젼
            var dlg = grp.z_dlg;
            var bg = grp.z_bg;

            selectBGM("BGM_ALL", false);

            grp.visible = true;
            grp.z_mask.visible = true; //시작


            //트윈버젼
            if(kData.bSoundSE) SE_Popup_ON.play();
            onFadein(bg, 0.75);
            onFadeinScale(dlg, function () {
                TweenMax.delayedCall(0.3, function () {
                    grp.z_mask.visible = false;

                    //if(bSoundSE) SE_Win.play();//트윈사운드

                    if(modeOption[0]===2) {
                    }else{

                        //게임 시작전 상단메뉴 업데이트
                        var ui = uigame.state.states.game.uiController.uiMain;
                        ui.z_prog.onUpdateProg(playtime_clock / playtime_clock_max); //in onActiveSt
                        var t = float2int(playtime_clock);
                        ui.z_prog.onUpdateTime(convertTimeFormatFromSec(t - 1)); //항상 타임+1로 처리하는데, 여기서만 +1값이 나와서
                        //게임 시작전 상단메뉴 업데이트

                        //메인메뉴 레벨 표시
                        //ui.z_stageName.z_number.text = (curLevel+1)+" ";//this.stageText.text = (curLevel+1)+" ";
                        ui.z_stageName.z_number.text = (curLevelFake)+" ";//this.stageText.text = (curLevel+1)+" ";
                        //메인메뉴 레벨 표시
                    }

                });
            });
            //별-----------
            //스코어트윈, 텍스트트윈,
            if(false) {
                // grp.z_scoreNumber.z_number.text = "0";
                // TweenMax.fromTo(grp.z_scoreNumber.z_number,
                //     0.5,
                //     {
                //         z_num: 0
                //     }, {
                //         z_num: grp.z_scoreNumber.z_number.z_max,
                //         ease: Linear.easeNone,//ease:Power1.easeOut,//ease: Bounce.easeOut,//ease: Elastic.easeOut,
                //         //yoyo:true,
                //         //repeat:1,
                //         onComplete: function () {
                //         },
                //         onStart: function () {
                //         },
                //         onUpdate: function () {
                //             grp.z_scoreNumber.z_number.text = getMoneyFormatFromNum(grp.z_scoreNumber.z_number.z_num);
                //         },
                //         delay: 0.2
                //     }
                // );
            }
            if(true) {
                //grp.z_scoreNumber.z_number.z_num = grp.z_scoreNumber.z_number.z_max;
                //grp.z_scoreNumber.z_number.text = getMoneyFormatFromNum(grp.z_scoreNumber.z_number.z_num);
            }
            //--일반모드진입시-------
        }



    };//grp.onActiveCl

    return grp;
}

function CreateUIClearLevel() { //레벨1개 클리어시 //클리어창//
    var grp = _createUIDlgBg_bb('uistart');//'uiclear'

    //grp.z_clearmode="normal"; //'bonus'
    grp.z_cleared=true;
    
    grp.z_normal = uigame.add.group();
    grp.z_dlg.addChild(grp.z_normal);

    grp.z_bonus = uigame.add.group();
    grp.z_dlg.addChild(grp.z_bonus);

    //노말모드-별3개배경
    grp.z_star1 = uigame.add.sprite(-150, -371, 'atlas_bb_ui-0', 'start_star_1_empty.png');
    grp.z_star1.anchor.setTo(0.5, 0.5);
    grp.z_star1.name = 'z_star1';
    grp.z_normal.addChild(grp.z_star1); //debug_Sprite(grp.z_star1);
    grp.z_star3 = uigame.add.sprite(150, -371, 'atlas_bb_ui-0', 'start_star_3_empty.png');
    grp.z_star3.anchor.setTo(0.5, 0.5);
    grp.z_star3.name = 'z_star3';
    grp.z_normal.addChild(grp.z_star3); //debug_Sprite(grp.z_star3);
    grp.z_star2 = uigame.add.sprite(0, -393, 'atlas_bb_ui-0', 'start_star_2_empty.png');
    grp.z_star2.anchor.setTo(0.5, 0.5);
    grp.z_star2.name = 'z_star2';
    grp.z_normal.addChild(grp.z_star2); //debug_Sprite(grp.z_star2);
    // //노말모드 별3개
    // grp.z_star1y = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'start_star_1.png');
    // grp.z_star1y.anchor.setTo(0.5, 0.5);
    // grp.z_star1y.name = 'z_star1';
    // grp.z_star1.addChild(grp.z_star1y); //debug_Sprite(grp.z_star1y);
    // grp.z_star3y = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'start_star_3.png');
    // grp.z_star3y.anchor.setTo(0.5, 0.5);
    // grp.z_star3y.name = 'z_star3';
    // grp.z_star3.addChild(grp.z_star3y); //debug_Sprite(grp.z_star3y);
    // grp.z_star2y = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'start_star_2.png');
    // grp.z_star2y.anchor.setTo(0.5, 0.5);
    // grp.z_star2y.name = 'z_star2';
    // grp.z_star2.addChild(grp.z_star2y); //debug_Sprite(grp.z_star2y);

    //노말모드-별애니
    grp.z_spine_star=uigame.add.spine(0, +60, "popup_star_ani");
    grp.z_normal.addChild(grp.z_spine_star);
    spn_star = grp.z_spine_star; //전역변수에 저장

    grp.z_spine_star.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("spn_readygo.trackindex:0");
                //grp.visible = false; //다시 안나오는 문제가 잇어서 주석처리
                break;
            case 1:
                if(dm) console.log("spn_readygo.trackindex:1");
                break;
        }
    };

    //공용-클리어 메세지
    grp.z_spine_clear=uigame.add.spine(0, +60, "popup_star_ani");
    grp.z_dlg.addChild(grp.z_spine_clear);
    spn_clear = grp.z_spine_clear; //전역변수에 저장

    grp.z_spine_clear.state.onComplete = function (trackIndex, count) {
        switch (trackIndex) {
            case 0:
                if(dm) console.log("spn_readygo.trackindex:0");
                //grp.visible = false; //다시 안나오는 문제가 잇어서 주석처리
                break;
            case 1:
                if(dm) console.log("spn_readygo.trackindex:1");
                break;
        }
    };

    //보너스모드-타이틀
    grp.z_bonus_title = uigame.add.sprite(0, -335, 'atlas_bb_ui-0', 'bouns_title.png');
    grp.z_bonus_title.anchor.setTo(0.5, 0.5);
    grp.z_bonus.addChild(grp.z_bonus_title);


    //노말모드-스테이지숫자
    grp.z_stageNumber = createUITextAndNumber(52, -244, 61, 0, " STAGE", style_bb_stage_start, style_bb_stage_start,  1, 0.5, 0.5, 0.5, false);
    grp.z_normal.addChild(grp.z_stageNumber);//debug_Sprite(grp.z_stageNumber);
    grp.z_stageNumber.z_number.text = "1"; //랜덤(0~3포함));<----------------레벨번호

    //보너스모드-스테이지숫자
    grp.z_stageNumber_b = createUITextAndNumber(52, -244, 61, 0, " STAGE", style_bb_stage_start_b, style_bb_stage_start_b,  1, 0.5, 0.5, 0.5, false);
    grp.z_bonus.addChild(grp.z_stageNumber_b);//debug_Sprite(grp.z_stageNumber);
    grp.z_stageNumber_b.z_number.text = "1"; //랜덤(0~3포함));<----------------레벨번호
    grp.z_stageNumber_b.alpha=0;

    //노말모드-스코어배경
    grp.z_scorebg = createUI9a('atlas_bb_ui_dlg-0', 'start_score_bg.png', 0, 125, 470, 80, 46, 46, 20, 20);
    grp.z_normal.addChild(grp.z_scorebg); //debug_Sprite(grp.z_scorebg);
    //노말모드-스코어 넘버 생성
    grp.z_scoreNumber = createUITextAndNumber(-41, 3, 220, 0, "TIME ", style_bb_score_start, style_bb_number_start,  1, 0.5, 1, 0.5, false);
    grp.z_scorebg.addChild(grp.z_scoreNumber);//debug_Sprite(grp.z_scoreNumber);
    grp.z_scoreNumber.z_number.text = "8888";                                                                 //<--------------스코어
    grp.z_scoreNumber.z_number.z_num=0;
    grp.z_scoreNumber.z_number.z_max=0;

    //보너스모드-스코어배경
    grp.z_scorebg_b = createUI9a('atlas_bb_ui-0', 'start_score_bg_bonus.png', 0, 125, 470, 80, 46, 46, 20, 20);
    grp.z_bonus.addChild(grp.z_scorebg_b); //debug_Sprite(grp.z_scorebg);
    grp.z_bonus_hminmap = uigame.add.sprite(-60-10, 124, 'atlas_bb_ui-0', 'result_bonus_block.png');
    grp.z_bonus_hminmap.anchor.setTo(0.5, 0.5);//debug_Sprite(grp.z_bonus_hminmap);
    grp.z_bonus.addChild(grp.z_bonus_hminmap);


    //보너스모드-스코어 넘버 생성
    grp.z_scoreNumber_b = createUITextAndNumber(60+20, 3, 0, 7, "14", style_heartcount1_bonus, style_heartcount2_bonus,  1, 0.5, 0, 0.5, false);
    grp.z_scorebg_b.addChild(grp.z_scoreNumber_b);//debug_Sprite(grp.z_scoreNumber);
    grp.z_scoreNumber_b.z_number.text = "/99";                                                                 //<--------------스코어
    grp.z_scoreNumber_b.z_number.z_num=0;
    grp.z_scoreNumber_b.z_number.z_max=0;

    //보너스모드-모든 하트 클리어
    grp.z_allcollected = uigame.add.text(0, 5, "ALL COLLECTED", style_heartcount1_bonus);
    grp.z_allcollected.anchor.setTo(0.5,0.5);
    grp.z_scorebg_b.addChild(grp.z_allcollected);



    //예스버튼
    grp.z_btyes = createbtn(createUI9a('atlas_bb_ui-0', 'btn_yes_message.png', 0, 0,  210, 95, 45, 45, 45, 45),
        uigame.add.text(0, 0,  GetString("ok"), style_bb_yes),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        0, 241,
        style_bb_lv1
    );//debug_Sprite(grp.z_btyes);
    grp.z_dlg.addChild(grp.z_btyes);

    //다시하기버튼
    grp.z_btretry = createbtn(
        //createUI9a('atlas_bb_ui-0', 'btn_no_message.png', 0, 0, 238, 108, 45, 45, 45, 45),
        uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_replay.png'),
        undefined,//uigame.add.text(0, 0,  GetString("no"), style_bb_no),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        -170, 241,
        style_bb_lv1
    );//debug_Sprite(grp.z_btno);
    grp.z_dlg.addChild(grp.z_btretry);

    //다음레벨버튼
    grp.z_btnext = createbtn(
        //createUI9a('atlas_bb_ui-0', 'btn_no_message.png', 0, 0, 238, 108, 45, 45, 45, 45),
        uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'btn_next.png'),
        undefined,//uigame.add.text(0, 0,  GetString("no"), style_bb_no),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        +170, 241,
        style_bb_lv1
    );//debug_Sprite(grp.z_btno);
    grp.z_dlg.addChild(grp.z_btnext);


    // //퍼펙트클리어시
    // grp.z_perfect = uigame.add.sprite(0, -144, 'atlas_bb_ui-0', 'result_perfect.png');
    // grp.z_perfect.anchor.setTo(0.5, 0.5);
    // grp.z_perfect.name = 'z_perfect';
    // grp.z_dlg.addChild(grp.z_perfect); //debug_Sprite(grp.z_perfect);
    // //그냥클리어시
    // grp.z_stage = uigame.add.sprite(0, -144, 'atlas_bb_ui-0', 'result_stage.png');
    // grp.z_stage.anchor.setTo(0.5, 0.5);
    // grp.z_stage.name = 'z_stage';
    // grp.z_dlg.addChild(grp.z_stage); //debug_Sprite(grp.z_stage);
    //
    // grp.z_selectMsg = grp.z_perfect;
    //
    // //클리어 글자그림
    // grp.z_clear = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', 'result_clear.png');
    // grp.z_clear.anchor.setTo(0.5, 0.5);
    // grp.z_clear.name = 'z_clear';
    // grp.z_dlg.addChild(grp.z_clear); //debug_Sprite(grp.z_clear);

    //에스피마스크-레벨시작시
    grp.z_mask = uigame.add.sprite(0, 0, 'white1x1');
    grp.z_mask.name = 'spMask_selectlevel';
    grp.z_mask.width = 720;
    grp.z_mask.height = 1280;
    grp.z_mask.tint = ColorSet.blue;
    grp.z_mask.alpha = 0;//0.555;
    grp.z_mask.anchor.setTo(0.5, 0.5);
    grp.z_mask.inputEnabled = true;
    grp.addChild(grp.z_mask);
    grp.z_mask.visible = false;
    //에스피마스크-레벨시작시

    grp.z_btyes.fnok = function () { //클리어시
        if('menu'!== uigame.state.current) {
            var stgame = uigame.state.states.game;
            var dlg =stgame.uiController.uiClearLevel.z_dlg;
            var bg = stgame.uiController.uiClearLevel.z_bg;

            var mask = stgame.uiController.uiClearLevel.z_mask;
            mask.visible = true;

            TweenMax.delayedCall(0.5,function() {
                if(kData.bSoundSE) SE_Popup_OFF.play();
                onFadeout(bg, 0.75);
                onFadeoutScale(dlg, function () {
                    mask.visible = false;
                    ispausemode = false;//클리어창-오케이클릭->인풋잠금풀기
                    uimode = uimodeset.select;
                    uigame.state.game.state.start('menu');
                });
            });
        }//==menu
    };

    grp.z_btretry.fnok = function () {
        if(kData.bSoundSE) SE_Popup_OFF.play();
        ispausemode = false;//클리어창-리트라이클릭->인풋잠금풀기

        //var mask = stgame.uiController.uiClearLevel.z_mask;
       //mask.visible = true;

        if(false) {
            var dlg = grp.z_dlg;
            var bg = grp.z_bg;

            onFadeout(bg, 0.75);
            onFadeoutScale(dlg, function () {
                grp.visible = false;
                grp.z_mask.visible = false;
                ispausemode = false;
            });
           // grp.z_mask.visible = true;
        }
        uigame.state.states.game.onGameOver.dispatch();
        //setTimeout(function () {
        //uigame.state.states.menu.uiselectlevel.spMask_sel.visible=false;//더블클릭풀기
        uigame.state.start('game');
        //리트라이삭제 retrymode=true;
        //}, 250); //--> clickGameMode
    };

    grp.z_btnext.fnok = function () {
        if(false) { //예전백업
            if (kData.bSoundSE) SE_Popup_OFF.play();
            ispausemode = false;//클리어창-다음클릭->인풋잠금풀기
            // if (false) {
            //     var dlg = grp.z_dlg;
            //     var bg = grp.z_bg;
            //
            //     onFadeout(bg, 0.75);
            //     onFadeoutScale(dlg, function () {
            //         grp.visible = false;
            //         grp.z_mask.visible = false;
            //         ispausemode = false;
            //     });
            //     grp.z_mask.visible = true;
            // }
            uigame.state.states.game.onGameOver.dispatch();
            if (curLevel < LEVEL_MAX - 1) {
                curLevel += 1;
                uigame.state.start('game');
                gotonext=false;
            } else {
                //올클리어
            }
        }
        if(true) {
            grp.z_mask.visible = true;
            //다음칸 레벨이 별이 1개 이상이면
            var fastnext=true;
            if (curLevel < LEVEL_MAX - 1) {
                if (kData.userData[curLevel + 1] > -1) fastnext = true; //다음칸 열어 있음
                else fastnext = false;  //다음칸 닫혀있는 상태
                if(modeOption[0]===2) {
                    fastnext = false;
                }
            }else{
                //다 깬상태이므로
                //다시 제자리르 오픈
                //애초에 넥스트 버튼이 숨김 되서 안들어 온다.
            }
            
            
            if(fastnext) {
                if (kData.bSoundSE) SE_Popup_OFF.play();
                ispausemode = false;//클리어창-다음클릭->인풋잠금풀기

                uigame.state.states.game.onGameOver.dispatch();
                if (curLevel < LEVEL_MAX - 1) {
                    curLevel += 1;
                    uigame.state.start('game');
                } else {
                    //올클리어
                }
                gotonext = false;
            }else {
                if ('menu' !== uigame.state.current) {
                    gotonext = true;//btnext클릭시 다음레벨로 가는 매크로 시작
                    if(modeOption[0]===2) gotonext = false;
                    //레벨선택화면의 onUpdatePage 스파인 애니가 끝나면 스타트창이 나오게 진행
                    var stgame = uigame.state.states.game;
                    var dlg = stgame.uiController.uiClearLevel.z_dlg;
                    var bg = stgame.uiController.uiClearLevel.z_bg;
                    var bg = stgame.uiController.uiClearLevel.z_bg;
                    var mask = stgame.uiController.uiClearLevel.z_mask;
                    TweenMax.delayedCall(0.5, function () {
                        if (kData.bSoundSE) SE_Popup_OFF.play();
                        onFadeout(bg, 0.75);
                        onFadeoutScale(dlg, function () {
                            mask.visible = false;
                            ispausemode = false;//클리어창-오케이클릭->인풋잠금풀기
                            uimode = uimodeset.select;
                            uigame.state.game.state.start('menu');
                        });
                    });
                }//==menu
            }//fastnext==false

        }

    };

    grp.onSetCl = function (lvidx, time) {


        // if(clearmode===undefined) grp.z_clearmode ="normal"; //"bouns"
        // else grp.z_clearmode = clearmode;

        //보너스 모드 구별
        // if(modeOption[0]===2) grp.z_clearmode = "bonus";
        // else grp.z_clearmode = "normal";

        // if(cleared===undefined) grp.z_cleared=true;
        // else grp.z_cleared=cleared;

        //에러감시
        if(typeof(kData) === 'undefined') console.log("kData == undefined");
        if(typeof(kData.userData) === 'undefined') console.log("kData.userData == undefined, "+lvidx);
        if(typeof(kData.userData[lvidx]) === 'undefined') console.log("kData.userData[lvidx] == undefined, "+lvidx);
        if(typeof(modeOption) === 'undefined') console.log("modeOption == undefined");
        if(typeof(modeOption[2]) === 'undefined') console.log("modeOption[2]");
        //에러감시

        if(time==="") return;

        if(dm) console.log("kData.userData[lvidx]:"+kData.userData[lvidx]+", modeOption[2]:"+modeOption[2]);
        //보너스모드 클리어 구별
        // if(modeOption[0]===2                        //보너스모드
        // && kData.userData[lvidx] >= modeOption[2]){ //레벨하트갯수
        //     grp.z_cleared=true;
        //     grp.z_scoreNumber_b.z_number.text = kData.userData[lvidx];
        //     //grp.z_scoreNumber_b.z_number.text = modeOption[2];
        // }else{
        //     grp.z_cleared=false;
        // }

        if(modeOption[0]===2){
            //보너스모드시 - UI요소 활성화
            grp.z_normalbg.visible = false;
            grp.z_normal.visible = false;
            grp.z_bonusbg.visible = true;
            grp.z_bonus.visible = true;

            if(grp.z_cleared) {
                grp.z_bonus_hminmap.visible = false;
                grp.z_scoreNumber_b.visible = false;
                grp.z_allcollected.visible = true;
                grp.z_allcollected.alpha = 0;
            }else{
                grp.z_bonus_hminmap.visible = true;
                grp.z_scoreNumber_b.visible = true;
                grp.z_bonus_hminmap.alpha = 0;
                grp.z_scoreNumber_b.alpha = 0;
                grp.z_allcollected.visible = false;
            }
        }else{
            //일반모드 - UI요소 활성화
            if(kData.userData[lvidx]<curMyStars)kData.userData[lvidx] = curMyStars;

            grp.z_normalbg.visible = true;
            grp.z_normal.visible = true;
            grp.z_bonusbg.visible = false;
            grp.z_bonus.visible = false;
            grp.z_scoreNumber.z_number.text = time;
            grp.z_scoreNumber.alpha=0;//트윈하므로
        }

        if(modeOption[0]===2){
            //보너스 수집하트수 적으면
            if(kData.userData[lvidx] < modeOption[2]){ //레벨하트갯수
                //grp.z_scoreNumber_b.z_number.text = kData.userData[lvidx];
                grp.z_bonus_hminmap.visible=true;
                grp.z_scoreNumber_b.visible=true;
                grp.z_scoreNumber_b.z_number.text = "/"+modeOption[2];
                grp.z_scoreNumber_b.text = kData.userData[lvidx];
                grp.z_allcollected.visible = false;

                grp.z_cleared=false;
            }else{
            //보너스 수집하트수 완료시
                grp.z_bonus_hminmap.visible=false;
                grp.z_scoreNumber_b.visible=false;
                //보너스모드-모든 하트 클리어
                grp.z_allcollected.visible=true;
                grp.z_cleared=true;
            }
        }

        // switch (curMyStars) {
        //     case 0:
        //         grp.z_star1.visible = false;
        //         grp.z_star2.visible = false;
        //         grp.z_star3.visible = false;
        //         break;
        //     case 1:
        //         grp.z_star1.visible = true;
        //         grp.z_star2.visible = false;
        //         grp.z_star3.visible = false;
        //         break;
        //     case 2:
        //         grp.z_star1.visible = true;
        //         grp.z_star2.visible = true;
        //         grp.z_star3.visible = false;
        //         break;
        //     case 3:
        //         grp.z_star1.visible = true;
        //         grp.z_star2.visible = true;
        //         grp.z_star3.visible = true;
        //         break;
        //     default:
        //         break;
        // }
        grp.z_star1.visible = true;
        grp.z_star2.visible = true;
        grp.z_star3.visible = true;

        grp.z_stageNumber.z_number.text = lvidx + 1 - Math.floor(lvidx / LV4x4); //0~15,16, 16~30,31, ...
        grp.z_stageNumber_b.z_number.text = lvidx + 1 - Math.floor(lvidx / LV4x4); //0~15,16, 16~30,31, ...
    };
    grp.onActiveCl = function (perfect, other) {
        //kData.iHeart +=1;
        //MainUI.z_shopplus.onRefresh(); //선택창만 업데이트해준다
        MainUI.z_shopplus.txgold.text = getMoneyFormatFromNum(kData.iHeart);//shopplus증가
        if(kData.userData[curLevel]<curLives) {
            kData.userData[curLevel] = curLives;
        }
        // if(kData.userDataScore[curLevel]<curScore) {
        //     kData.userDataScore[curLevel] = curScore;
        // }


        var stars=0;
        for (var i = 0; i < LEVEL_MAX; i++) {
            var star3 = kData.userData[i];
            if( star3 !== -1           //클리어레벨인 경우
                && (i + 1) % LV4x4 !== 0){ //보너스아닌 경우
                stars += star3;
            }
        }
        //console.log("local->score: " +stars);
        if(nvmode===true) {
            if (typeof GamePocket.Sdk !== 'undefined') {
                //네이버랭킹기록
                networkManager.RankingAdd(stars, function () {
                        networkManager.RankingGet(function (_data) {
                                console.log("get->score: " + _data.score + ", group:" + _data.group);
                            }
                        );
                    } //fn
                );
                //네이버랭킹기록
                var sends = {};
                sends.userData = kData.userData;//네이버저장하기
                if (typeof GamePocket.Sdk !== 'undefined') {
                    networkManager.AppDataPut(JSON.stringify(sends));
                }
            }
        }else{
            networkManager.ForcedSaveData(); //처리 //in onActiveCl
        }
        ispausemode = true; //클리어창-뜰때->인풋잠금시작

        if(other) {
            //오버창확인사살
            TweenMax.killTweensOf(uigame.state.states.game.uiController.uiGameOver);
            uigame.state.states.game.uiController.uiGameOver.visible = false;
            //컨티뉴창확인사살
            TweenMax.killTweensOf(uigame.state.states.game.uiController.uiContinue);
            uigame.state.states.game.uiController.uiContinue.visible = false;
        }
        //perfect=false; //강제퍼펙트
        if(perfect===true){
            //grp.z_stage.visible =false;
            //grp.z_perfect.visible = true;
            //grp.z_selectMsg = grp.z_perfect;

            setTimeout(function () { //스파인애니생성
                spn_clear.visible = true;
                spn_clear.setAnimationByName(1, "popup_perfect_clear_in", false);
                spn_clear.addAnimationByName(0, "popup_perfect_clear_idle", false);
            }, 750);

        }else{
            //grp.z_stage.visible =true;
            //grp.z_perfect.visible = false;
            //grp.z_selectMsg = grp.z_stage;
            setTimeout(function () {
                spn_clear.visible = true;
                spn_clear.setAnimationByName(1, "popup_stage_clear_in", false);
                spn_clear.addAnimationByName(0, "popup_stage_clear_idle", false);
            }, 750);
        }


        //마지막스테이지면
        if(curLevel<LEVEL_MAX-1){
            grp.z_btnext.visible = true;
        }else{ //올클리어
            grp.z_btnext.visible = false;
        }

        //트윈버젼
        var dlg = grp.z_dlg;
        var bg = grp.z_bg;

        grp.visible = true;
        grp.z_mask.visible = true; //시작


        //트윈버젼
        if(kData.bSoundSE) SE_Popup_ON.play();
        onFadein(bg, 0.75);
        onFadeinScale(dlg, function () {
            TweenMax.delayedCall(0.5, function () {
                grp.z_mask.visible = false;
            });
        });

        if(modeOption[0]===2){
            //보너스모드이면, 완전하트 클리어시 All Collected 등장
            if(grp.z_cleared) {
                var _r =  grp.z_allcollected;
                TweenMax.set(_r, {alpha: 0});
                TweenMax.to(_r, 0.5, {
                    alpha: 1,
                    ease: Linear.easeNone,
                    onStart: function(){if(kData.bSoundSE) SE_Win.play();},//트윈사운드
                    delay:0.75
                });
            }else{                          // 하트그림과 14/99 텍스트 보여주기
                var _r1 = grp.z_bonus_hminmap;
                var _r2 = grp.z_scoreNumber_b;
                TweenMax.set(_r1, {alpha: 0});
                TweenMax.to(_r1, 0.5, {
                    alpha: 1,
                    ease: Linear.easeNone,
                    onStart: function(){if(kData.bSoundSE) SE_Win.play();},//트윈사운드
                    delay:0.75
                });
                TweenMax.set(_r2, {alpha: 0});
                TweenMax.to(_r2, 0.5, {
                    alpha: 1,
                    ease: Linear.easeNone,
                    delay:0.75
                });

            }
        }else{
            //노말모드이면 별애니등장, 시간결과등장
            var st=100;
            var ot=400;
            switch (curMyStars) {
                case 1:
                    setTimeout(function () { if (kData.bSoundSE) SE_Star_Get.play();}, st);//별획득//별박히는
                    setTimeout(function () {
                        spn_star.visible = true;
                        spn_star.setAnimationByName(1, "popup_result_star_idle_1", false);
                        spn_star.setAnimationByName(1, "popup_result_star_in_1", false);
                    }, 250);
                    break;

                case 2:
                    setTimeout(function () { if (kData.bSoundSE) SE_Star_Get.play();}, st);//별획득//별박히는
                    setTimeout(function () { if (kData.bSoundSE) SE_Star_Get.play();}, st+ot);//별획득//별박히는
                    setTimeout(function () {
                        spn_star.visible = true;
                        spn_star.setAnimationByName(1, "popup_result_star_idle_2", false);
                        spn_star.setAnimationByName(1, "popup_result_star_in_2", false);
                    }, 250);
                    break;

                case 3:
                    setTimeout(function () { if (kData.bSoundSE) SE_Star_Get.play();}, st);//별획득//별박히는
                    setTimeout(function () { if (kData.bSoundSE) SE_Star_Get.play();}, st+ot);//별획득//별박히는
                    setTimeout(function () { if (kData.bSoundSE) SE_Star_Get.play();}, st+ot+ot);//별획득//별박히는
                    setTimeout(function () {
                        spn_star.visible = true;
                        spn_star.setAnimationByName(1, "popup_result_star_idle_3", false);
                        spn_star.setAnimationByName(1, "popup_result_star_in_3", false);
                    }, 250);
                    break;
            }
            var _n =  grp.z_scoreNumber; //보통레벨 클리어 타임
            TweenMax.set(_n, {alpha: 0});
            TweenMax.to(_n, 0.5, {
                alpha: 1,
                ease: Linear.easeNone,
                onStart: function(){if(kData.bSoundSE) SE_Win.play();},//트윈사운드
                //onComplete: function () { combo.onHide(); },
                //onUpdate: function () { console.log(combo.y); }
                delay:0.75
            });
            //노말모드이면 별애니등장, 시간결과등장
        }
    };//grp.onActiveCl
    return grp;
}

function CreateUIGameOver() {
    var grp = _createUIDlgBg_bb('uigameover');
    //예스버튼
    grp.z_btyes = createbtn(createUI9a('atlas_bb_ui-0', 'btn_yes_message.png', 0, 0, 210, 95, 45, 45, 45, 45),
        uigame.add.text(0, 0,  GetString("ok"), style_bb_yes),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        0, 230,
        style_bb_lv1
    );//debug_Sprite(grp.z_btyes);
    grp.z_dlg.addChild(grp.z_btyes);

    //game글자
    grp.z_game_text = uigame.add.sprite(0, -112, 'atlas_bb_ui-0', 'over_game.png');
    grp.z_game_text.anchor.setTo(0.5, 0.5);
    grp.z_game_text.name = 'z_game_text';
    grp.z_dlg.addChild(grp.z_game_text); //debug_Sprite(grp.z_game_text);

    //over글자
    grp.z_over_text = uigame.add.sprite(0, 55, 'atlas_bb_ui-0', 'over_over.png');
    grp.z_over_text.anchor.setTo(0.5, 0.5);
    grp.z_over_text.name = 'z_over_text';
    grp.z_dlg.addChild(grp.z_over_text); //debug_Sprite(grp.z_over_text);

    //에스피마스크-레벨시작시
    grp.z_mask = uigame.add.sprite(0, 0, 'white1x1');
    grp.z_mask.name = 'spMask_selectlevel';
    grp.z_mask.width = 720;
    grp.z_mask.height = 1280;
    grp.z_mask.tint = ColorSet.blue;
    grp.z_mask.alpha = 0;//0.555;
    grp.z_mask.anchor.setTo(0.5, 0.5);
    grp.z_mask.inputEnabled = true;
    grp.addChild(grp.z_mask);
    grp.z_mask.visible = false;
    //에스피마스크-레벨시작시

    grp.z_btyes.fnok = function () { //게임오버시
        if('menu'!== uigame.state.current) {
            var stgame = uigame.state.states.game;
            var dlg =stgame.uiController.uiGameOver.z_dlg;
            var bg = stgame.uiController.uiGameOver.z_bg;


            TweenMax.delayedCall(0.5,function() {
                if(kData.bSoundSE) SE_Popup_OFF.play();
                onFadeout(bg, 0.75);
                onFadeoutScale(dlg, function () {
                    ispausemode=false;//게임오버 일시정지끄기
                    uimode = uimodeset.select;
                    uigame.state.game.state.start('menu');
                });
            });
        }
    };

    grp.onActiveGv = function (otheronoff) {
        if(otheronoff) {
            //클리어창확인사살
            TweenMax.killTweensOf(uigame.state.states.game.uiController.uiClearLevel);
            uigame.state.states.game.uiController.uiClearLevel.visible = false;
            //컨티뉴창확인사살
            TweenMax.killTweensOf(uigame.state.states.game.uiController.uiContinue);
            uigame.state.states.game.uiController.uiContinue.visible = false;
        }
        ispausemode=true;//게임오버 일시정지시작
        grp.z_game_text.visible = true;

        //트윈버젼
        var dlg = grp.z_dlg;
        var bg = grp.z_bg;

        grp.visible = true;
        grp.z_mask.visible = true; //시작
        //트윈버젼
        if(kData.bSoundSE) SE_Popup_ON.play();
        onFadein(bg, 0.75);
        onFadeinScale(dlg, function () {
            TweenMax.delayedCall(0.3, function () {
                grp.z_mask.visible = false;
            });
        });

        //게임글자,오버글자 트윈----------
        TweenMax.fromTo( grp.z_game_text.scale,
            0.5, //time
            {
                x: 0,
                y: 0

            }, {
                x: 1,
                y: 1,
                ease: Elastic.easeOut,
                //onComplete: fnEnd,
                onStart:function () { if(kData.bSoundSE) SE_GameOver.play();}, //게임오버 문구
                delay: 0.2
            }
        );
        TweenMax.fromTo( grp.z_over_text.scale,
            0.5, //time
            {
                x: 0,
                y: 0

            }, {
                x: 1,
                y: 1,
                ease: Elastic.easeOut,
                //onComplete: fnEnd,
                delay: 0.5
            }
        );
    };//grp.onActiveCl
    return grp;
}

function CreateUIContinue() { //컨티뉴창//계속하기창 생성

    var grp = uigame.add.group();

    grp.z_bg = uigame.add.sprite(xc, yc, 'white1x1');
    grp.z_bg.name = 'bguipause';
    grp.addChild(grp.z_bg);
    grp.z_bg.inputEnabled = true;
    grp.z_bg.width = 720;
    grp.z_bg.height = 1280;
    grp.z_bg.tint = ColorSet.black;
    grp.z_bg.alpha = 0.5;
    grp.z_bg.anchor.setTo(0.5, 0.5);

    grp.z_dlg = uigame.add.sprite(xc, yc, 'atlas_bb_ui_dlg-0', 'popup_continue.png');
    grp.z_dlg.anchor.setTo(0.5, 0.5);
    grp.z_dlg.name = 'dlgbg9';
    grp.addChild(grp.z_dlg); //debug_Sprite(grp.z_dlgdown);

    //grp.position.set(xc, yc);

    //예스버튼

    //코리안폰트스타일로 변경 //컨티뉴시 메세지
    switch(CURRENT_LANGUAGE)
    {
        case LANGUAGE_ENG:
            break;
        case LANGUAGE_JPN:
            break;
        case LANGUAGE_KOR:
            style_bb_doyougetheart = {
                font: "bold 35px gulim",
                fill: hex2str(ColorSet.white),
                align: "center",
                stroke: '#6a005f',
                strokeThickness: 6,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            break;
    }
    //코리안폰트스타일로 변경

    grp.z_btyes = createbtn(createUI9a('atlas_bb_ui-0', 'btn_yes_message.png', 0, 0, 210, 95, 45, 45, 45, 45),
        uigame.add.text(0, 0,  GetString("yes"), style_bb_yes),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        122, 120,//241,
        style_bb_lv1
    );//debug_Sprite(grp.z_btyes);
    grp.z_dlg.addChild(grp.z_btyes);

    //하트소모연출리소스 //컨티뉴창
    grp.z_spnHeart = CreateUIDropHeart();//하트파괴
    grp.z_spnHeart.visible = false;//debug_Sprite(this.uiDropStar);
    grp.z_spnHeart.x = 550;
    grp.z_spnHeart.y = 730;
    //하트소모연출리소스 //컨티뉴창
    
    //노버튼
    grp.z_btno = createbtn(createUI9a('atlas_bb_ui-0', 'btn_no_message.png', 0, 0, 210, 95, 45, 45, 45, 45),
        uigame.add.text(0, 0,  GetString("no"), style_bb_no),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        -122, 120,
        style_bb_lv1
    );//debug_Sprite(grp.z_btno);
    grp.z_dlg.addChild(grp.z_btno);
  
    // //패들배경
    // grp.z_minibg = uigame.add.sprite(0, -113, 'atlas_bb_ui_dlg-0', 'start_map_bg.png');
    // grp.z_minibg.anchor.setTo(0.5, 0.5);
    // grp.z_minibg.scale.set(1.15, 0.85);
    // grp.z_minibg.name = 'z_minibg';
    // grp.z_dlg.addChild(grp.z_minibg); //debug_Sprite(grp.z_minibg);
    // //패들
    // //grp.z_paddle = uigame.add.sprite(0, -130, 'atlas_bb_ui-0', 'continue_paddle.png');
    // grp.z_paddle = uigame.add.sprite(0, -130, 'atlas_bb-0', 'paddle_160.png');
    // grp.z_paddle.scale.set(1.75, 1.75);
    // grp.z_paddle.anchor.setTo(0.5, 0.5);
    // grp.z_paddle.name = 'z_paddle';
    // grp.z_dlg.addChild(grp.z_paddle); //debug_Sprite(grp.z_paddle);
    // //+3글자
    // grp.z_plus3 = uigame.add.text(0, -50,  "+3", style_bb_plus3); //debug_Sprite(grp.z_plus3);
    // grp.z_plus3.anchor.setTo(0.5,0.5);
    // grp.z_dlg.addChild(grp.z_plus3);



    grp.z_title = uigame.add.text(0, -135,  "CONTINUE?", style_bb_continue); //debug_Sprite(grp.z_title);
    grp.z_title.anchor.setTo(0.5,0.5);
    grp.z_dlg.addChild(grp.z_title);

    grp.z_txmsg = uigame.add.text(0, -20,
        GetString("doyougetlife", 1),
        //"あれ！ハートがないよ！\nチャージしますか？",
        //"Oh, no! No more heart!\nWould you charge the heart?",
        style_bb_doyougetheart); //debug_Sprite(grp.z_txmsg);
    grp.z_txmsg.anchor.setTo(0.5,0.5);
    grp.z_dlg.addChild(grp.z_txmsg);

    //에스피마스크-레벨시작시
    grp.z_mask = uigame.add.sprite(0, 0, 'white1x1');
    grp.z_mask.name = 'spMask_selectlevel';
    grp.z_mask.width = 720;
    grp.z_mask.height = 1280;
    grp.z_mask.tint = ColorSet.blue;
    grp.z_mask.alpha = 0.0;
    grp.z_mask.anchor.setTo(0.5, 0.5);
    grp.z_mask.inputEnabled = true;
    grp.addChild(grp.z_mask);
    grp.z_mask.visible = false;
    //에스피마스크-레벨시작시


    grp.z_btyes.fnok = function () { //컨티뉴 예스 --> 게임 라이프 충전
        var pass=true;
        var sends={};
        if(nvmode===true) {
            //네이버모드 하트가 0이면
            if(kData.iHeart<=0){
                //네이버모드
                if (naverShop2.visible) {
                    naverShop2.visible=false;
                } else {
                    naverShop2.Show(cbNaverShopReward);//네이버샵띄우기
                }
                return;
                //일시정지모드
            }else{
                kData.iHeart -= 1;//네이버컨티뉴
                sends.iHeart = kData.iHeart;//네이버저장하기
                if (typeof GamePocket.Sdk !== 'undefined') {
                    networkManager.AppDataPut(JSON.stringify(sends));
                }
            }

        }else{//개발서버모드 하트가 0이면
            if(kData.iHeart<=0) {
                uigame.state.states.game.uiController.uishop.onRefreshShop();
                //uigame.state.states.menu.uishop.visible = true;
                uigame.state.states.game.uiController.uishop.onOpen();

                //일시정지모드
                var stgame = uigame.state.states.game;
                ispausemode = true;                               //메인창-일시정지클릭-->인풋잠금
                stgame.massiveController.onPauseSaveVelocity(); //속도저장
                return;
            }else{
                
            }
        }

        //하트소비 연출(스파인) //컨티뉴 예스
        var stgame = uigame.state.states.game;
        stgame.uiController.uiContinue.z_spnHeart.visible = true;
        stgame.uiController.uiContinue.z_spnHeart.z_spine.setAnimationByName(1, "heart_bomb_out", false);
        ////stgame.uiController.uiContinue.z_spnHeart.z_spine.addAnimationByName(0, "empty", false);



        //-----로그인 상태 체크-----------in CreateUIContinue
        if(loginTF === 1){          //로그인회원
            if (proto.serPos === 0              //모비서비스
                ||proto.serPos === 1) {              //야후서비스
                if (kData.iHeart<=0) { //하트가 바닥이면 //in CreateUIContinue
                    //우선나가기
                    ispausemode = false; //컨티뉴-오케이->인풋잠금풀기
                    uigame.state.states.game.onGameOver.dispatch();
                    uigame.state.game.state.start('menu');
                    //우선나가기
                }else {
                    networkManager.
                    UseHeart(1, function () {
                        curLives = MaxLife; //in 컨티뉴UI 예스(모비서비스)
                        //var stgame = uigame.state.states.game;
                        //stgame.uiController.uiMain.z_lifestar.onSetLife(curLives); //컨티뉴 예스

                        stgame.massiveController.startContinue();
                    });
                    TweenMax.delayedCall( 0.1, function () {
                        if(kData.bSoundSE) SE_Heart.play(); //하트가 소모될때
                    });
                }
            }
        }else{
            // //우선나가기
            // ispausemode = false;
            // uigame.state.states.game.onGameOver.dispatch();
            // uigame.state.game.state.start('menu')
            // //우선나가기

            if (networkManager.networkState === NET_STATE.LOCALHOST) { //로컬서비스
                // curLives = MaxLife;  //in 컨티뉴UI 예스(로컬)
                // var stgame = uigame.state.states.game;
                // //stgame.uiController.uiMain.z_lifestar.onSetLife(curLives);//컨티뉴 예스
                // stgame.massiveController.startContinue();

                if(kData.iHeart<=0) {
                    pass = false;
                    networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),//상점
                        function () {
                            networkManager.JoinMember();
                        },
                        function () {
                        }
                    );
                }else{
                    pass = true;
                    networkManager.UseHeart(1, function () {
                        curLives = MaxLife; //in 컨티뉴UI 예스(모비서비스)
                        //var stgame = uigame.state.states.game;
                        //stgame.uiController.uiMain.z_lifestar.onSetLife(curLives); //컨티뉴 예스

                        stgame.massiveController.startContinue();
                    });
                    TweenMax.delayedCall( 0.1, function () {
                        if(kData.bSoundSE) SE_Heart.play(); //하트가 소모될때
                    });
                }


            }else{ //비회원  //게스트모드
                //
                if(kData.iHeart<=0) {
                    pass = false;
                    networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'),//상점
                        function () {
                            networkManager.JoinMember();
                        },
                        function () {
                        }
                    );
                }else{
                    pass = true;
                    networkManager.UseHeart(1, function () {
                        curLives = MaxLife; //in 컨티뉴UI 예스(모비서비스)
                        //var stgame = uigame.state.states.game;
                        //stgame.uiController.uiMain.z_lifestar.onSetLife(curLives); //컨티뉴 예스

                        stgame.massiveController.startContinue();
                    });
                    TweenMax.delayedCall( 0.1, function () {
                        if(kData.bSoundSE) SE_Heart.play(); //하트가 소모될때
                    });
                }
            }
        }
        //-----로그인 상태 체크-----------in CreateUIContinue

        if(pass) {
            //--다이얼로그 사라지기--
            var dlg = grp.z_dlg;
            var bg = grp.z_bg;
            if (kData.bSoundSE) SE_Popup_OFF.play();
            onFadeout(bg, 0.75);
            onFadeoutScale(dlg, function () {
                grp.visible = false;
                grp.z_mask.visible = false;
                ispausemode = false; //패들 고정시킨거 풀어줄려고
            });
            grp.z_mask.visible = true;
            //--다이얼로그 사라지기--
        }

    };
    grp.z_btno.fnok = function () { //컨티뉴 노클릭 --> 게임오버
        //--다이얼로그 사라지기--
        var dlg = grp.z_dlg;
        var bg = grp.z_bg;
        if(kData.bSoundSE) SE_Popup_OFF.play();
        onFadeout(bg, 0.75);
        onFadeoutScale(dlg, function () {
            grp.visible = false;
            grp.z_mask.visible = false;
            ispausemode = false; //컨티뉴-노클릭->인풋잠금풀기
            uigame.state.states.game.endGame(); //컨티뉴 노우
        });
        grp.z_mask.visible = true;
        //--다이얼로그 사라지기--
    };

    grp.onActiveCn = function (hideother) {
        if(hideother) {
            //클리어창확인사살
            TweenMax.killTweensOf(uigame.state.states.game.uiController.uiClearLevel);
            uigame.state.states.game.uiController.uiClearLevel.visible = false;
            //게임오버창확인사살
            TweenMax.killTweensOf(uigame.state.states.game.uiController.uiGameOver);
            uigame.state.states.game.uiController.uiGameOver.visible = false;
        }
        //--다이얼로그 등장하기--
        var dlg = grp.z_dlg;
        var bg = grp.z_bg;

        grp.visible = true;
        grp.z_mask.visible = true; //시작
        
        ispausemode=true; //컨티뉴창뜰때->인풋잠금시작
        if(kData.bSoundSE) SE_Popup_ON.play();
        onFadein(bg, 0.75);
        onFadeinScale(dlg, function () {
            TweenMax.delayedCall(0.3, function () {
                grp.z_mask.visible = false;
            });
        });
        //--다이얼로그 등장하기--
    };//grp.onActiveCl
    return grp;
}
function CreateHideHeart1() {
    var heart = uigame.add.sprite(0, 0, "atlas_bb_ani-0", "heart_ani_1.png");
    heart.anchor.setTo(0.5,0.5);
    heart.animations.add('hideheart', [
        'heart_ani_1.png',
        'heart_ani_2.png',
        'heart_ani_3.png',
        'heart_ani_4.png',
        'heart_ani_5.png',
        'heart_ani_6.png',
        'heart_ani_7.png',
        'heart_ani_8.png',
        'heart_ani_9.png',
        'heart_ani_10.png',
        'heart_ani_11.png'
    ]);
    //debug_Sprite(heart);
    return heart;
}
function CreateUIWarning() {//
    var grp = uigame.add.group();
    grp.z_xinit=0;
    grp.z_yinit=0;
    //grp.z_msg = createUITextAndNumber(-19, -536, 8, 0, "SCORE:", style_30_stage, style_30_stageNumber, 1, 0.5, 0, 0.5, false);
    grp.z_msg = uigame.add.text(0, 0, "HURRY UP", style_40_Warning);
    grp.z_msg.anchor.setTo(0.5,0.5);
    grp.z_msg.alpha = 0.5;
    grp.addChild(grp.z_msg); //debug_Sprite(grp.z_scoreNumber);

    grp.onHide = function () {
        SE_HurryUp.mute=true;
        if (TweenMax.isTweening(grp.z_msg)) TweenMax.killTweensOf(grp.z_msg);
        grp.visible = false;
    };
    grp.onShow = function () {
        if (kData.bSoundSE) {
           SE_HurryUp.mute=false;
        }

        grp.visible = true;
        if (TweenMax.isTweening(grp.z_msg)) TweenMax.killTweensOf(grp.z_msg);
        TweenMax.fromTo(grp.z_msg, 0.2, { alpha:0.5 }, { alpha:0, ease:Power1.easeOut, yoyo:true, repeat:-1, delay: 0 });
    };
    return grp;
}
function CreateUIItemSelected() {//
    var grp = uigame.add.group();
    grp.z_xinit=0;
    grp.z_yinit=0;
    //grp.z_msg = createUITextAndNumber(-19, -536, 8, 0, "SCORE:", style_30_stage, style_30_stageNumber, 1, 0.5, 0, 0.5, false);
    grp.z_arrspr = [
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_04.png"),//xx
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_04.png"),//01
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_07.png"),//02
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_09.png"),//03
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_03.png"),//04
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_02.png"),//05
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_01.png"),//06
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_06.png"),//07
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_08.png"),//08
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_05.png"),//09
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_10.png"),//10
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_11.png"),//11
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_13.png"),//12
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_12.png"),//13
        uigame.add.sprite(0, 0, "atlas_bb_ui-0", "item_14.png") //14
    ];

    for (var i = 0, len = grp.z_arrspr.length; i < len; i++) {
        grp.z_arrspr[i].anchor.setTo(0.5,0.5);
        grp.z_arrspr[i].alpha = 1;
        grp.z_arrspr[i].visible=false;
        grp.addChild(grp.z_arrspr[i]);
    }

    for (var arr1 in grp.z_arrspr) {

    }

    grp.onHide = function () {
        for (var arr1 in grp.z_arrspr) {
            if (TweenMax.isTweening(arr1)) TweenMax.killTweensOf(arr1);
        }
        grp.visible = false;
    };
    grp.onShow = function (idx) {
        grp.visible = true;
        var spr1 = grp.z_arrspr[idx];
        spr1.visible=true;
        if (TweenMax.isTweening(spr1)) TweenMax.killTweensOf(spr1);
        TweenMax.fromTo(spr1, 1.5, { alpha:1 }, { alpha:0, ease: Linear.easeNone, delay: 0 });
    };
    return grp;
}

function CreateUICombo() {//콤보생성
    var grp = uigame.add.group();
    grp.z_xinit=0;
    grp.z_yinit=0;
    grp.z_combo = uigame.add.sprite(-60*1.5, 0, "atlas_bb_ui-0", "combo.png");
    grp.z_combo.anchor.setTo(0.5,0.5);
    grp.z_combo.alpha=0.7;
    grp.addChild(grp.z_combo);
    grp.z_x00 = uigame.add.bitmapText(30*1.5, 0, 'combo_no-export', "x0", 71, undefined);//비트맵폰트 크기가 71
    grp.z_x00.align = 'left';
    grp.z_x00.anchor.setTo(0, 0.5);
    grp.z_x00.alpha=0.7;
    grp.addChild(grp.z_x00);

    grp.onSetNumber = function (cnt) {
        grp.z_x00.text = "x" + cnt;
        //grp.z_x00.text = "x" + uigame.rnd.integerInRange(1, 100);//페이저랜덤모드는 min,max를 포함;

        //grp.z_x00.text.x = uigame.width / 2 -  grp.z_x00.text.textWidth / 2;//중앙정열시
        //then whenever you set the text, you need to reposition it:
        // this.scoreText.setText('100');
        // this.scoreText.x = this.game.width / 2 - this.scoreText.textWidth / 2;
        //text.setText('test');
        //text.updateTransform();
        //text.position.x = 100 - text.textWidth / 2;

    };
    grp.onHide = function () {
        grp.visible = false;
    };
    grp.onShow = function () {
        grp.visible = true;
    };


    return grp;
}


function CreateNavi(){ //인디케이터
    var grp = uigame.add.group();
    grp.navCount=12;        //grp.navCount=6;
    grp.colCnt=0;        //grp.colCnt=0;
    grp.distCnt=-1;        //grp.distCnt=-1;
    grp.sprNav=[];        //grp.sprNav=[];
    grp.navOffset=30;        //grp.navOffset=25;
    grp._distOff=0;        //grp._distOff=0;
    grp._angle=20;        //grp._angle=20;
    grp.navRotOld=0;        //grp.navRotOld=0;
    grp.ColMinX=0;        //grp.ColMinX=0;
    grp.ColMaxX=720;        //grp.ColMaxX=720;
    grp.dir= 1;        //grp.dir= 1;

    for (var idx = 0; idx < grp.navCount; idx++) {
        grp.sprNav[idx] =uigame.add.sprite(0, -(idx*grp.navOffset), "atlas_bb-0", "point.png");
        grp.sprNav[idx].anchor.setTo(0.5,0.5);
        grp.sprNav[idx].scale.setTo((1.0-(idx*0.01))-0.25); //0.9부터 스케일 줄어들기

        var a = 0.75-((idx/(grp.navCount-1))*0.75);
        if(a>1.0) a=1.0;
        grp.sprNav[idx].alpha=a; // //0.9~부터 알파줄기
        //grp.sprNav[idx].alpha=1.0-(idx/(grp.navCount)); // //0.9~부터 알파줄기

        grp.addChild(grp.sprNav[idx]);
    }

    //업데이트에서 온패들모드시 작동 -->releaseStart로 배포-->this.navi.x(y)로 각도 찾기
    grp.onUpdateAngle = function (navRot) {
        if (grp._angle !== grp.navRotOld) {
            grp.navRotOld = grp._angle;

            var colCnt = 0;
            var distCnt=-1;
            
            for (var n = 0; n < grp.navCount; n++) {
                grp._distOff= grp.navOffset * n;            //35*현재갯수
                var xy = moveToAngle(grp._angle, grp._distOff);  //로컬회전위치
                var x = xy[0];                   //고정플레이어위치+오프셋
                var y = xy[1];                   //고정플레이어위치+오프셋

                if(false) {
                    //타일영역충돌시 처리---------------
                    //그리드범위벗어남처리

                    var gridpos = getGridPosition(x, y); //월드좌표->그리드좌표로 변환
                    // Make sure the grid position is valid
                    if (gridpos.x < 0) gridpos.x = 0;
                    if (gridpos.x >= level.columns) gridpos.x = level.columns - 1;
                    if (gridpos.y < 0) gridpos.y = 0;
                    if (gridpos.y >= level.rows) gridpos.y = level.rows - 1;

                    if (level.tiles[gridpos.x][gridpos.y].type !== -1) colCnt = 3;

                    if (colCnt > 2) {
                        if (distCnt === -1) {
                            distCnt = n;
                        }
                        grp.sprNav[n].x = navX;
                        grp.sprNav[n].y = navY;
                    } else {
                        grp.sprNav[n].x = x;
                        grp.sprNav[n].y = y;
                    }
                    //타일영역충돌시 처리---------------
                }else {
                    //여기다 이식
                    //console.log("xy:"+grp._angle+","+n+","+x+","+y);
                    grp.sprNav[n].x = x;
                    grp.sprNav[n].y = y;
                }                
                //if(n===0)console.log("[0].xy:"+grp.sprNav[n].x+","+grp.sprNav[n].y+",a:"+grp.sprNav[n].alpha);
                //if(n===1)console.log("[1].xy:"+grp.sprNav[n].x+","+grp.sprNav[n].y+",a:"+grp.sprNav[n].alpha);
                //if(n===2)console.log("[2].xy:"+grp.sprNav[n].x+","+grp.sprNav[n].y+",a:"+grp.sprNav[n].alpha);
            }//false
            
        }//회전값 변화가 있으면
        grp._angle+=(1*grp.dir);
        if(grp._angle>160) grp.dir= -1;
        if(grp._angle<20) grp.dir= 1;
    };
    grp.onShow = function () {
        grp.alpha = 0;
        grp.visible = true;
        if (TweenMax.isTweening(grp)) TweenMax.killTweensOf(grp);
        TweenMax.fromTo(grp, 0.5, {alpha: 0}, {alpha: 1, ease: Linear.easeNone});
    };
    grp.onHideNv = function () {
        if (TweenMax.isTweening(grp)) TweenMax.killTweensOf(grp);
        TweenMax.fromTo(grp,0.75,{alpha:1}, {alpha:0, ease: Linear.easeNone, onComplete:function(){grp.visible=false;}});
    };

    return grp;
}

function CreateUIHelp() {
    var grp = _createUIDlgBg_bb('uihelp');//'uiclear'

    grp.z_curpage = 0;
    grp.z_stagging = false;
    grp.z_title = uigame.add.text(0, -495,  "HELP", style_bb_continue); //debug_Sprite(grp.z_title);
    grp.z_title.anchor.setTo(0.5,0.5);
    grp.z_dlg.addChild(grp.z_title);

    //좌우버튼 왼쪽버튼
    grp.sLeft = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_select_arrow.png"),
        undefined,
        undefined,
        -200, 390,
        undefined
    );
    grp.sLeft.anchor.setTo(0.5, 0.5);
    grp.z_dlg.addChild(grp.sLeft); //debug_Sprite(grp.sLeft);
    grp.sLeft.fnok = function () {
        //왼쪽버튼작동
        if(0<=grp.z_curpage-1)
            grp.onPage(grp.z_curpage-1);  //아아템그림,설명 업데이트
    };

    //오른쪽버튼
    grp.sRight = createbtn(uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "btn_select_arrow.png"),
        undefined,
        undefined,
        200, 390,
        undefined
    );
    grp.sRight.sx = -1;
    grp.sRight.anchor.setTo(0.5, 0.5);
    grp.sRight.scale.setTo(-1, 1);
    grp.z_dlg.addChild(grp.sRight); //debug_Sprite(grp.sRight);
    grp.sRight.fnok = function () {
        //오른쪽버튼작동
        if(grp.z_table.length>grp.z_curpage+1)
            grp.onPage(grp.z_curpage+1);  //아아템그림,설명 업데이트

    };


    //도움말 코멘트
    grp.z_table = [
        [ 'item_4', 'item_7', 'item_9', 'item_3', 'item_2' ],
        [ 'item_1', 'item_6', 'item_8', 'item_5', 'item_none' ],
        [ 'item_10', 'item_11', 'item_13', 'item_12', 'item_14' ]
    ];

    //도움말 페이지배경
    grp.txPageBg = createUI9a('atlas_bb_ui-0', 'select_page.png', 0, 384, 270,  70, 20, 20, 20, 20);
    grp.z_dlg.addChild(grp.txPageBg); //debug_Sprite(grp.txPageBg);

    //도움말 페이지숫자
    grp.txPage = uigame.add.text(0, 384+3, "0/"+grp.z_table.length, style_bb_page);
    grp.txPage.anchor.setTo(0.5, 0.5);
    grp.z_dlg.addChild(grp.txPage); //debug_Sprite(dlbg.txPage);

    //도움말 슬록5개
    grp.z_slots=[];
    grp.z_slots.push(_createUIHelpSlot1());
    grp.z_slots.push(_createUIHelpSlot1());
    grp.z_slots.push(_createUIHelpSlot1());
    grp.z_slots.push(_createUIHelpSlot1());
    grp.z_slots.push(_createUIHelpSlot1());

    //도움말 업데이트
    grp.onPage = function(pg){
        //언어별 테스트
        //CURRENT_LANGUAGE = LANGUAGE_ENG; //CURRENT_LANGUAGE = LANGUAGE_JPN; //CURRENT_LANGUAGE = LANGUAGE_KOR;

        //스태거적용
        if(grp.z_stagging===false) {
            grp.z_stagging = true;
            TweenMax.staggerFrom(grp.z_slots, 0.2,
                {
                    alpha: 0, //rotation:0.2,
                    //ease: Linear.easeNone,//ease:Power1.easeOut,//ease:Elastic.easeOut,
                    delay: 0 //첫시작1번만
                },
                0.1,//callNextTween
                function () { grp.z_stagging = false;}//onCompleteAll
            );
        }
        grp.z_curpage = pg;
        for(var i=0; i<5; i++){
            if(grp.z_table[grp.z_curpage][i]==="item_none") { //테이블 값이 없으면 숨기고
                grp.z_slots[i].visible = false;
            }else {                                             //테이블 값이 있으면 출력
                grp.z_slots[i].visible = true;
                grp.z_slots[i].icon1_c.loadTexture('atlas_bb-0', grp.z_table[grp.z_curpage][i] + ".png");
                grp.z_slots[i].icon2_tx.text = GetString(grp.z_table[grp.z_curpage][i]);
            }
        }
        grp.txPage.text= ""+(pg+1)+"/"+grp.z_table.length;
    };

    //도움말 초기화 업데이트
    var offy= -300;
    for(var i=0; i<5; i++){
        grp.z_dlg.addChild(grp.z_slots[i]);
        grp.z_slots[i].y = offy+(140*i);
        grp.onPage(0);
    }


    //노버튼
    grp.z_btno = createbtn(uigame.add.sprite(0,0,'atlas_bb_ui-0', 'btn_close_item.png'),
        undefined,//uigame.add.text(0, 0,  GetString("no"), style_bb_no),
        undefined,//uigame.add.sprite(0, -5, 'atlas_bb_ui-0', "select_page_1.png"),
        288, -451,
        style_bb_lv1
    ); //debug_Sprite(grp.z_btno);
    grp.z_dlg.addChild(grp.z_btno);

    grp.z_btno.fnok = function () {
        var dlg = grp.z_dlg;
        var bg = grp.z_bg;
        if(kData.bSoundSE) SE_Popup_OFF.play();
        onFadeout(bg, 0.75);
        onFadeoutScale(dlg, function () {
            grp.visible = false;
            //grp.z_mask.visible = false;
        });
        //grp.z_mask.visible = true;

    };

    grp.onActiveHp = function () {

        grp.onPage(grp.z_curpage);  //아아템그림,설명 업데이트
        
        //트윈버젼
        var dlg = grp.z_dlg;
        var bg = grp.z_bg;

        grp.visible = true;
        //grp.z_mask.visible = true; //시작
        //트윈버젼
        if(kData.bSoundSE) SE_Popup_ON.play();
        onFadein(bg, 0.75);
        onFadeinScale(dlg, function () {
            TweenMax.delayedCall(0.5, function () {
                //grp.z_mask.visible = false;
            });
        });

    };

    return grp;
}

function _createUIHelpSlot1() {
    //코리안폰트스타일로 변경 //도움말표시
    switch(CURRENT_LANGUAGE) 
    {
        case LANGUAGE_ENG:
            break;
        case LANGUAGE_JPN:
            break;
        case LANGUAGE_KOR:
            style_bb_help = {
                font: "bold 32px gulim",
                fill: hex2str(ColorSet.white),
                align: "center",
                stroke: '#7F2D00',
                strokeThickness: 6,
                boundsAlignH: "center",
                boundsAlignV: "middle"
            };
            break;
    }
    //코리안폰트스타일로 변경

    var grp = uigame.add.group();
    grp.icon1_a = uigame.add.sprite(-203, 0, 'atlas_bb_ui-0', "item_1.png");
    grp.icon1_a.anchor.setTo(0.5,0.5);
    grp.icon1_b = uigame.add.sprite(0, 0, 'atlas_bb_ui-0', "item_bg.png");
    grp.icon1_b.anchor.setTo(0.5,0.5);
    grp.icon1_c = uigame.add.sprite(0, 0, 'atlas_bb-0', "item_1.png");
    grp.icon1_c.anchor.setTo(0.5,0.5);
    grp.addChild(grp.icon1_a); //debug_Sprite(grp.icon1_a);
    grp.icon1_a.addChild(grp.icon1_b);
    grp.icon1_b.addChild(grp.icon1_c);

    grp.icon2_a = uigame.add.sprite(71, 0, 'atlas_bb_ui-0', "item_2.png");
    grp.icon2_a.anchor.setTo(0.5,0.5);
    grp.icon2_tx = uigame.add.text(0, 0, "패들이 길어져요!", style_bb_help);
    grp.icon2_tx.anchor.setTo(0.5,0.5);
    grp.addChild(grp.icon2_a);// debug_Sprite(grp.icon2_a);
    grp.icon2_a.addChild(grp.icon2_tx);
    return grp;
}

var tweenGlobalNum=0;
function tweenText( textobj, addscore) { //this.scoreText //텍스트트윈스코어트윈점수트윈텍스트
    if(textobj===undefined || textobj===null) {
        console.log("tweenText(null,...)");
        return;
    }
    var start = tweenGlobalNum;//var start = curScore;
    textobj.z_num = tweenGlobalNum;//textobj.z_num = curScore;
    tweenGlobalNum += addscore;

    if (TweenMax.isTweening(textobj))
        TweenMax.killTweensOf(textobj);

    TweenMax.fromTo( textobj,
        1.5,
        {
            z_num:start //시작값
        }, {
            z_num:tweenGlobalNum,
            ease: Linear.easeNone,//ease:Power1.easeOut,//ease: Bounce.easeOut,//ease: Elastic.easeOut,
            //yoyo:true,
            //repeat:1,
            //onComplete: function () {  },
            //onStart: function () { },
            onUpdate: function () {
                textobj.text = getMoneyFormatFromNum(textobj.z_num);
                if(dm) console.log("istweening:"+ TweenMax.isTweening(textobj));
            },
            delay: 0.2
        }
    );
}

function CreateUIDev() {
    var grp = uigame.add.group();
    grp.position.set(xc, yc);
    var xb=-360+50;
    var yb=640-50;
    var xoff=100;
    var yoff=50;
    var xgrid=0;
    var ygrid=0;
    //예스버튼

    grp.z_arr=[];
    for(var ya=0; ya<2; ya++){
        for(var xa=0; xa<7; xa++){
            xgrid=0; ygrid=0;
            var btn0 = createbtn(createUI9a('atlas_bb_ui-0', '_alpha1_4x4.png', 0, 0, 100, 50, 2, 2, 2, 2),
                uigame.add.text(0, 0,  "dev1", {}), undefined, xb+(xoff*xa), yb-(yoff*ya), undefined);
            btn0.alpha=0.25;
            if(ya%2===0){
                btn0.tint = (xa%2===0?ColorSet.white:ColorSet.red); //첫째행
            }else{
                btn0.tint = (xa%2===1?ColorSet.white:ColorSet.red); //위로 2째행
            }
            grp.addChild(btn0);
            grp.z_arr.push(btn0);
        }
    }
    grp.z_arr[0].tx.text='close';
    grp.z_arr[0].fnok = function () {
        grp.visible = false;
    };
    grp.z_arr[1].tx.text='init';
    grp.z_arr[1].fnok = function () {
        curLevel=0;
        kData.userData = undefined;         //개발자버튼
        kData.userDataPage = undefined; //개발자버튼
        InitData();
        networkManager.ForcedSaveData();//개발자버튼

    };
    grp.z_arr[2].tx.text='';
    grp.z_arr[2].fnok = function () {
    };
    grp.z_arr[3].tx.text='balls';
    grp.z_arr[3].fnok = function () {
        var stgame = uigame.state.states.game;
        stgame.massiveController.onCopyBalls();
        stgame.massiveController.onReleaseBalls();
    };
    grp.z_arr[4].tx.text='';
    grp.z_arr[4].fnok = function () {
    };
    grp.z_arr[5].tx.text='';
    grp.z_arr[5].fnok = function () {
    };
    grp.z_arr[6].tx.text='unlo14';
    grp.z_arr[6].fnok = function () {
        // for (var i = LEVEL_MAX - 1; i >= 0; --i) kData.userData[i] = -1;
        // for (var i = 0; i <40; i++) kData.userData[i] = 1;

        //치트코드 //16까지//개발치트//개발자치트
        for (var i = LEVEL_MAX - 1; i >= 0; --i) {
            //if(i<45) kData.userData[i] = 2;
            if (i <14) { //보너스언락연출시작
                //페이지 열리기전 조건
                if (i < 9) kData.userData[i] = 3;
                else  kData.userData[i] = 2;
            }
            //if(i<3) kData.userData[i] = 2;
            //if(i<LEVEL_MAX-1) kData.userData[i] = 3;
            else kData.userData[i] = -1;
        }
    };
    grp.z_arr[7].tx.text='coll';
    grp.z_arr[7].fnok = function () {
        if(dmCollision===true){
            dmCollision=false;
            this.game.debug.reset();F
        }else{
            dmCollision=true;
        }
    };
    grp.z_arr[13].tx.text='unlock';
    grp.z_arr[13].fnok = function () {
        for (var i = LEVEL_MAX - 1; i >= 0; --i) {
            if (i < 310) kData.userData[i] = 3;
            else  kData.userData[i] = 1;
        }
        kData.userData[LEVEL_MAX - 1] = 0; //0레벨 오픈
    };

    grp.onSetDv = function () {

    };
    grp.onActiveDv = function () {


    };

    return grp;
}