MenuState = function (game) {
    this.game = game;
};

MenuState.prototype = {
    game: null, // typeof Phaser.Game
    text: null, // typeof Phaser.Text
    logo: null, // typeof Phaser.Sprite
    grpTitleScreen: null,
    grpsprJPSound:null,
    uiselectlevel: null,
    uishopplus: null,
    uishop: null,
    uifind: null,
    uiresult: null,
    uishopresult: null,
    uidev: null,
    hide2: null,
    hide3: null,
    hide4: null,
    title_spine: null,
    whiteshop: null,
    _i: 0,
    _j: 0,
    _e: 1,
    _existname: false,

    start: function () { //실행안됨
        console.log("- MenuState.start");
    },

    create: function () {//게임시작1-4
        //networkManager.GetShoplist(ShopType.HEART, function () { });
        //console.log("- MenuState.created"); //press to play 정지화면

        //배경음악첫시작//첫사운드
        /*if(bPhone&&firsttime) {
            kData.bSoundBGM = false;
            kData.bSoundSE = false;
        }*/
        if(firsttime) {
            if (!BGM_ALL.isPlaying) {
                BGM_ALL.play();
                if(kData.bSoundBGM===false)
                    BGM_ALL.mute=true;//추가//소리수정
            }
            if (!BGM_Game_Nomal.isPlaying){
                BGM_Game_Nomal.play();
                BGM_Game_Nomal.mute=true;//추가//소리수정
            }
        }
        if(uimode === uimodeset.result){
            //if(bSoundBGM)
                selectBGM("BGM_Game_Ranking", false);
        }else{
            //if(bSoundBGM)
                selectBGM("BGM_ALL", false);
        }
        //---게임첫화면 새로추가---------------------------- <<
        this.grpTitleScreen = this.game.add.group();

        if (firsttime) {
            //스파인타이틀 MenuState에 추가
            this.title_spine = this.game.add.spine(360, 640, "title_spine");
            this.grpTitleScreen.addChild(this.title_spine);
            spn_title_spine = this.title_spine;


            //타이틀스파인은 track 1로 호출시 사라지게 한다.
            this.title_spine.state.onComplete = function (trackIndex, count) {
                switch (trackIndex) {
                    case 0:
                        if(dm) console.log("-------------- track 0: emptytrack ------------------");
                        break;
                    case 1:
                        if(dm) console.log("-------------- track 1: emptytrack ------------------");
                        //setTimeout( function () { title_spine.visible=false; }, 500 );//0.5초뒤
                        break;
                }
            };

            /*var version = "Ver 1.0.1b";
            this.txVersion = this.add.text(710, 1250, version, {font: "17px Arial", fill: "#000000", align: "center"});
            this.txVersion.anchor.setTo(1, 0.5);*/

            //야후추가 //타이틀화면중 저작권표시
            /*var tx_copyrightcontext = undefined;
            if (document.location.href.indexOf("game.jp") > -1) {
                tx_copyrightcontext = "(C) RECOM Co.,Ltd. 2017 All Rights Reserved.";
                this.txCopyright = this.add.text(xc, 1250, tx_copyrightcontext, {
                    font: "17px Arial",
                    fill: "#000000",
                    align: "center"
                });
                this.txCopyright.anchor.setTo(0.5, 0.5);
            }else if (document.location.href.indexOf("neolith") > -1) {
            //}else if (document.location.href.indexOf("localhost") > -1) { //테스트
                tx_copyrightcontext = "";
                this.txCopyright = this.add.text(xc, 1250, tx_copyrightcontext, {
                    font: "17px Arial",
                    fill: "#000000",
                    align: "center"
                });
                this.txCopyright.anchor.setTo(0.5, 0.5);
            } else {
                tx_copyrightcontext = "Copyright Ⓒ 2017 Game Corp. All rights reserved";
                this.txCopyright = this.add.text(xc, 1250, tx_copyrightcontext, {
                    font: "17px Arial",
                    fill: "#000000",
                    align: "center"
                });
                this.txCopyright.anchor.setTo(0.5, 0.5);
            }*/
            //야후추가 //저작권
            if (nvmode === true
                || document.location.href.indexOf("movigame.com") > 0
                || document.location.href.indexOf("local") > 0
            ) {
                this.allgrade = this.game.add.sprite(0, 0, 'all.png');
                this.allgrade.anchor.setTo(0.5, 0.5);
                this.allgrade.position.setTo(xc + 285, yc - 555);
                allusermark = this.allgrade;
            }
        }

        if (firsttime) {
            //첫시작일 때만 타이틀스파인 플레이 되게 한다.
            this.title_spine.setAnimationByName(0, "title_in", false);
            this.title_spine.addAnimationByName(0, "title_idle", true);


        } else {
            //this.txCopyright.visible=false;
            //this.txVersion.visible=false;
            //this.allgrade.visible=false;
            //this.title_spine.setAnimationByName(0, "empty", false);
            //this.title_spine.visible=false;
            //다시 앞으로 오면 정지화면 되게 한다.
            //스테이지클리어시 오므로
            //임시데이터라 애니가없는 문제가 잇어서
            //this.racing_title_ani.addAnimationByName(0, "title_stop", false)
            //이걸로 문제해결
            //this.title_spine.addAnimationByName(0, "title_idle", true);;
        }

        //스파인타이틀추가
        //debug_Sprite(titletx);
        //--게임첫화면 새로추가---------------------------- >>

        // // //어디서나 클릭시 넘가가게
        // this.game.input.onDown.addOnce(this.advanceToGame, this);
        // // //err: not a function// this.game.input.keyboard.addOnce(this, this.advanceToGame);
        // this.game.input.keyboard.addCallbacks(this, this.advanceToGame);

        if (firsttime) {
            //예전 타이틀없는 버젼
            if (false) {
                //스타트샵// this.game.input.onDown.addOnce(this.showUISelectLevel, this);
                // //err: not a function// this.game.input.keyboard.addOnce(this, this.showUIFind);
                //스타트샵// this.game.input.keyboard.addCallbacks(this, this.showUISelectLevel);
            }
            //타이틀있는 버젼
            if (true) {
                //networkManager.GetShoplist(ShopType.HEART, function () { });
                this.game.input.onDown.addOnce(this.showUISelectLevelWithTitle, this);
                // //err: not a function// this.game.input.keyboard.addOnce(this, this.showUIFind);
                this.game.input.keyboard.addCallbacks(this, this.showUISelectLevelWithTitle);
            }
        }


        this.grpsprJPSound = this.game.add.group();
        this.grpsprJPSound.position.setTo(xc, yc);
        titlesprJPSoundRoot = this.grpsprJPSound;
        //새로추가 - 스타트샵---------
        this.uiselectlevel = createUISelectLevel();        //this.uiselectlevel.dlgbg9.scale.set(0.5,0.5);


        // kData.userData = [];
        // for (var i = LEVEL_MAX-1; i >= 0; -- i) kData.userData[i] = -1;
        // for (var i = 0; i <20; i++) kData.userData[i] = uigame.rnd.integerInRange(1, 3);
        // kData.userData[20]=0; //0레벨 오픈

        if(false) {
            this.uiselectlevel.dlbg.btmulti.fninsert = function () { //멀티버튼클릭시

                //--------------------
                matchmode = true;
                //matchUImode=true;
                uimode = uimodeset.matchfind;

                //내정보전달
                //이름자동생성
                if (net_yourname_source == "user") {
                    net_yourname = net_yourname_source + uigame.rnd.integerInRange(0, 9999); //999포함
                }
                //자동이름으로 로그인시작
                socket.emit('loginINFO', {"uid": net_yourname, "saveData": saveData});  //넷 멀티버튼 누를때 로그인하는

                //방진입
                setTimeout(function () {
                        socket.emit('radyRoomIn', {"uid": net_yourname}); //소켓아이오, 방 진입
                    }, 500 //0.5초 뒤
                ); //--> clickGameMode


                //멀티모드는 검색창 나오게

                //멀티모드로
                net_usercount = 1;//유저카운트는 1로 초기화 한후에 다이얼로그 띄우기
                var stmenu = uigame.state.states.menu;
                stmenu.showUIFind();
                //멀티모드 전환

                if (dm) console.log("fnmulti");
                //------------------
            };
        }
        this.uiselectlevel.visible = false;



        //this.uiDev = CreateUIDev();
        //this.uiDev.visible=false;

        //새로추가 - 스타트샵-------------
        uishopinmenu = true;
        this.uishop = createUIShop();
        this.uishop.visible = false;//초기화 삽ui 숨기기
        this.uishop.onRefreshInitShop();

        this.uishopresult = createUIShopResult();
        this.uishopresult.visible = false;


        this.uishopplus = createUIShopPlusButton();
        this.uishopplus.visible = false;//초기화 삽플러스ui 숨기기

        if(false) {
            //새로추가 - 검색창---------------
            this.uifind = createUIMatchSearch();
            //this.uifind.dlgbg9.slots[0].onActive(false);
            this.uifind.dlgbg9.slots[1].onActive(false);
            this.uifind.dlgbg9.slots[2].onActive(false);
            this.uifind.dlgbg9.slots[3].onActive(false);
            //uifind 스타트버튼
            this.uifind.dlgbg9.startbtn.fnok = function () {

                //matchUImode=false;//서치상태 끄는 용도
                uimode = uimodeset.select;//result나 find로 나올수 있으나 우선 임시적으로

                uigame.state.states.menu.advanceToGame();
                if (dm) console.log("find and start");

                //playtime_cur=0; //유저 검색창에서 스타트버튼//플레이타임
                playtime_bias = 0;
                socket.emit('compulsionGo');            //넷 스타트버튼으로 강제진행
            };

            //멀티닫기버튼
            this.uifind.dlgbg9.btnx.fnok = function () { //넷 멀티메뉴에서 바로 나가기

                if (matchmode) {
                    socket.emit('leaveRoom'); //방에서 시작전에 스타트샵으로 나갈때
                }
                uimode = uimodeset.select;
                uigame.state.game.state.start('menu'); //검색창 닫고, 맨앞으로
            };

            this.uifind.visible = false;
            this.uifind.onSetReady();
            //새로추가 - 검색창---------

            //새로추가 - 랭킹결과창----------------------------------------------------------
            this.uiresult = createUIMatchResult();
            this.uiresult.visible = false;
            //this.uiresult.visible = true;//제작중에 강제로 보기

            //랭킹결과창ok버튼
            this.uiresult.dlgbg9.rsbtn.fnok = function () {
            };

            //새로추가 - 랭킹결과창-------------


            //menu상태로 바뀌엇을때 실행: 랭킹결과창 보이기
            if (uimode == uimodeset.result) {           //경기 끝 났을때
                if (matchmode) {                     //넷 경기 끝 났을때

                    //대기시간 기본 5초, 내랭킹기준으로 차등
                    //grp.dlgbg9.rsbtn.tx.text = "TIME: " + 5;
                    var myrankidx = net_userall.indexOf(net_yourname);
                    this.uiresult.onRefreshResult();
                    this.uiresult.visible = true;

                    //BGM_Game_Nomal.mute = false; //게임중음악중지
                    selectBGM("BGM_Game_Nomal", true); //in 네트워크 결과창
                    //uimode = uimodeset.retry;
                    //uigame.state.game.state.start('menu');
                } else {                              //싱글 경기 끝 났을때
                    uimode = uimodeset.select;
                    uigame.state.game.state.start('menu'); //여기까지 안음
                }

                //menu상태로 바뀌엇을때 실행: 재시작창 보이기
            } else if (uimode == uimodeset.retry) {

                matchmode = true;
                //matchUImode=true;
                uimode = uimodeset.matchfind;

                this.uiselectlevel.visible = false;
                this.uifind.visible = true;
                this.uisoundonoff.visible = false;//사운드강제숨기기
                this.uiresult.visible = false;
                //menu상태로 바뀌엇을때 실행: 디폴트--스타트샵보이기
            } else {
                //네트워크매치이면 시작부분 부터
                //싱글모드이면
                //if (firsttime != false) this.showUIStartShop();//바로출력

                if (firsttime) {
                    firsttime = false;
                }
                else this.showUISelectLevel();//바로출력


            }

            //this.uiStartLevel = CreateUIStartLevel();
        }//false

        //상점막이
        this.whiteshop = uigame.add.sprite(xc, yc, 'white1x1');
        this.whiteshop.width = 720;
        this.whiteshop.height = 1280;
        this.whiteshop.tint = ColorSet.red;
        this.whiteshop.alpha =0.0;
        this.whiteshop.anchor.setTo(0.5, 0.5);
        this.whiteshop.name = "whiteshop";//레이싱레디
        this.whiteshop.inputEnabled = true;
        this.whiteshop.events.onInputDown.add(function () {console.log("whiteshop"); }  );
        this.whiteshop.visible =false;
        whiteshopguard = this.whiteshop;
        //상점막이
		if(nvmode===true){
	        this.naver = uigame.add.group();
	        naverShop = new NaverShop(uigame, this.naver);//원본
            //this.naver.addChild(naverShop.main); //혜관님 수정본
	        naverShop.loadImg();
		}
        //uigame.time.events.loop(Phaser.Timer.SECOND, updateMenuState, this);

        this.txDebug =  uigame.add.text(0, 0, "", style_debug); //레벨선택화면 디버그용
        this.txDebug.anchor.setTo(1,1);
        this.txDebug.position.setTo(720,1280-50);
        this.txDebug.name="menustate";
        txdebug = this.txDebug;
        //

        if (firsttime===false) {
            //this.spn_
            this.showUISelectLevel();
        }
        //if(dm) hsDebug.onSet("aasaa", 1234);
        //if(dm) hsDebug.onSet("d23", 100.11);
    }, //create

    update: function () {
        //console.log("----- memustate.update -----");
        //넷 선수찾기
        if (uimode == uimodeset.matchfind && matchmode) { //네트워크모드에서만

            if (net_usercount == 2) vsmode = true;
            else vsmode = false;

            //playtime_cur=0; //유저 검색창 업데이트//플레이타임
            playtime_bias=0;
            // //강제싱글모드-----------------
            // alonemode=true; //강제 시작
            // timer20sec=alonemode?9:time20secMax;
            // net_usercount = 2;
            // vsmode = true;
            // var othername = "user" + uigame.rnd.integerInRange(0, 9999);
            // net_name4 = [net_yourname,othername,undefined,undefined]; //사이드UI상 이름들 //로그인서치할때순위?
            // net_userall=[net_yourname,othername,undefined,undefined]; //순위정렬 이름들
            // net_userallfin=[net_yourname,othername,undefined,undefined]; //순위정렬 이름들
            // net_userallkill=[          0,        0,undefined,undefined]; //
            // uimode = uimodeset.select;//result나 find로 나올수 있으나 우선 임시적으로
            // uigame.state.states.menu.advanceToGame();
            // return;
            // //강제싱글모드-----------------------

            alonemode = false;
            //싱글모드 생성준비  10초 대기
            matchupsingle += this.game.time.elapsed;
            //console.log("matchupsingle:"+matchupsingle+", matchupsinglemax:"+matchupsinglemax);

            // //소켓아이오 없이 가능하게 처리
            // //로컬상태에서는 여기서 "user"
            // //로그인상태에서는 "rambo119
            // if(net_yourname.includes(net_yourname_source)
            //     && net_userall[0]==undefined
            // ){
            //정상인경우도 여기에 도달함!!!
            //     //소켓아이오에러인경우 "rambo119-e"로 변환하고, "rambo119-e-e-e-e"를 방지
            //     if(net_yourname[net_yourname.length-1] !== "e"
            //     && net_yourname[net_yourname.length-2] !== "-"
            //     ) {
            //         net_yourname += "-e";
            //     }
            //     net_name4[0] = net_yourname;
            //     net_userall[0] = net_yourname;
            // }
            // //소켓아이오 없이 가능하게 처리

            if (matchupsingle > matchupsinglemax
                && net_userall[1] === undefined
                && (net_userall[0] === net_yourname)
            ) { //10후면 싱글모드 강제 진입

                //혼자하는모드에서 네트워크종료
                socket.emit('leaveRoom');   //얼론모드 시작시

                alonemode = true; //강제 시작

                net_usercount = 2;
                vsmode = true;
                var othername = "user" + uigame.rnd.integerInRange(0, 9999);
                net_name4 = [net_yourname, othername, undefined, undefined]; //사이드UI상 이름들 //로그인서치할때순위?
                net_userall = [net_yourname, othername, undefined, undefined]; //순위정렬 이름들
                net_userallfin = [net_yourname, othername, undefined, undefined]; //순위정렬 이름들
                net_userallkill = [0, 0, undefined, undefined]; //
                uimode = uimodeset.select;//result나 find로 나올수 있으나 우선 임시적으로


                uigame.state.states.menu.advanceToGame();
            }
            //싱글모드 생성준비


            // console.log("matchupdatetime:"+matchupdatetime);
            matchupdatetime += this.game.time.elapsed;
            if (matchupdatetime > matchupdatetimemax) //1초단위 업데이트
            {
                //내이름이 없으면 리턴
                for (this._i = 0; this._i < 4; this._i++) {
                    if (net_name4[this._i] === net_yourname) this._existname = true;
                }
                if (!this._existname) return;

                matchupdatetime = 0;
                if (net_usercount > 1) {
                    //스타트버튼 나오게
                    if (this.uifind.dlgbg9.startbtn.visible === false) this.uifind.onSetStart(); //MenuState안에 this.uifind.dlgbg9.startbtn.fnok에서 정의
                }
                if (net_usercount > 0) {
                    //선수들 리스트 업데이트
                    this._e = 1;

                    for (this._i = 0; this._i < 4; this._i++) {
                        if (this._i === 0) this._e = 1;
                        //내자신 정보를 맨위로
                        if (net_yourname === net_name4[this._i]) {
                            //사용자액자 //this.uifind.dlgbg9.slots[0].youframe9.tint = this.uifind.dlgbg9.slotscolora[0];
                            this.uifind.dlgbg9.slots[0].txname.text = net_name4[this._i];
                            this.uifind.dlgbg9.slots[this._e].onActive(true);
                        }
                        else {//다른 선수들만
                            if (this._e < 4) {
                                if (net_name4[this._i] !== undefined && this._i < net_usercount) {
                                    if (net_name4[this._i] !== this.uifind.dlgbg9.slots[this._e].txname.text) {
                                        //사용자액자 //this.uifind.dlgbg9.slots[this._e].youframe9.tint = this.uifind.dlgbg9.slotscolora[this._e];
                                        this.uifind.dlgbg9.slots[this._e].txname.text = net_name4[this._i];
                                        this.uifind.dlgbg9.slots[this._e].onActive(true);
                                    }
                                }
                                else {
                                    if (net_name4[this._i] === undefined || net_name4[this._i] !== this.uifind.dlgbg9.slots[this._e].txname.text) {
                                        //사용자액자 //this.uifind.dlgbg9.slots[this._e].youframe9.tint = ColorSet.lightgrey;
                                        this.uifind.dlgbg9.slots[this._e].txname.text = "";
                                        this.uifind.dlgbg9.slots[this._e].onActive(false);

                                    }
                                }
                                this._e += 1;
                            }
                        }//다른 선수들만
                    } //for
                }
            }
            if (net_started) {

            }
        }

        // //넷 결과보기
        // if (uimode == uimodeset.result && matchmode) {
        //     if (net_usercount == 2) vsmode = true;
        //     else vsmode = false;
        //
        //     matchupdatetime += this.game.time.elapsed;
        //     if (matchupdatetime > matchupdatetimemax) //1초단위 업데이트
        //     {
        //         this.uiresult.onRefresh();
        //         matchupdatetime = 0;
        //     }
        // }

        if (uimode == uimodeset.result && matchmode) {

        }
        //if(hsdm) hsDebug.onSet("mn","");
        // if(hsdm) hsDebug.onAdd("ielapsed", this.game.time.elapsed*0.001);
        if(hsdm) hsDebug.onUpdateHash();


    },//update

    //menustate.create에서 인풋을 입력하면 이걸 실행한다.
    showUISelectLevel: function () {  //메뉴상태에서 스타트샵을 띄우기
        if (dm) console.log("- MenuState.showUISelectLevel");
        alonemode = false;

        MainsprJpSoundRoot.addChild(globaluisoundonoff);
        globaluisoundonoff.position.setTo(290, -588);

        this.uiselectlevel.visible = true;
        //this.uiselectlevel.onUpdatePage(curLevel);//레벨선택창보이기


        //lastOpenedId = -1; 첫시작시
        //lastOpenedId = 현재플레이레벨; 진행중

        //마지막 오픈된 레벨 인덱스 구하기 1차(0인경우)
        //0(오픈시작)이 없으면 보너스레벨을 지정해버리는 문제가 있어 안사용
        var templast1=-1;
        for (var i = LEVEL_MAX - 1; i >= 0; --i) {
            if(templast1 === -1 && kData.userData[i]===0) templast1 = i;
        }
        
        //마지막 오픈된 레벨 인덱스 구하기 2차(0보다 큰경우)
        //현재 사용중인 방법
        var templast2=-1;
        for (var i = LEVEL_MAX - 1; i >= 0; --i) {
            if (templast2 === -1 && kData.userData[i] > -1) templast2 = i;
        }
        if(dm) console.log("templast1:"+templast1+", templast2:"+templast2+", lastOpenedId:"+lastOpenedId);

        if(templast2>lastOpenedId) lastOpenedId = templast2;
        
        curLevel = lastOpenedId; //여기서 마지막레벨과 현재레벨 일치시켜버린다

        this.uiselectlevel.onUpdatePage(lastOpenedId);//레벨선택창보이기
        this.grpTitleScreen.visible = false;

        //playtime_cur= 0; //in showUISelectLevel//플레이타임
        playtime_bias=0;

        var mystars = 0;
        mystars = this.uiselectlevel.getMyStar();
        var allstars = this.uiselectlevel.getAllStar();
        if(allstars !== undefined)
            this.uiselectlevel.dlbg.sTopStarBg.txTopStar.text = mystars+"/"+allstars;



        net_name4 = [undefined, undefined, undefined, undefined]; //사이드UI상 이름들 //로그인서치할때순위?
        net_userall = [undefined, undefined, undefined, undefined]; //순위정렬 이름들
        net_userallfin = [undefined, undefined, undefined, undefined]; //순위정렬 이름들
        net_userallkill = [undefined, undefined, undefined, undefined]; //


        //this.uiselectlevel.dlbg.uisoundonoff.visible = true;//사운드버튼 보이기
        this.uiselectlevel.dlbg.uisoundonoff.position.setTo(290, -588);

        if (kData.bSoundBGM) {
            if (this.uiselectlevel.dlbg.uisoundonoff.icon.visible)
                this.uiselectlevel.dlbg.uisoundonoff.icon.visible = false; //사운드켜기 상태표시
        } else {
            if (!this.uiselectlevel.dlbg.uisoundonoff.icon.visible)
                this.uiselectlevel.dlbg.uisoundonoff.icon.visible = true; //사운드끄기 상태표시
        }
        //사운드버튼 보이기

        mode20sec = false; //종료타이머 게임 시작시 초기화(스타트샵)
        timer20sec = time20secMax;///스타트샵시작시 초기화
        matchupsingle = 0; //uifind삽 싱글용 타이머

        if (true) {//샵플러스버튼도 활성화
            this.uishopplus.onRefresh();
            this.uishopplus.visible = true;
            uigame.state.states.menu.uishop.onGetList();
        }

        //hide1.visible  = false;//라이벌레이싱 2d title
        //err this.game.input.keyboard.addCallbacks(); // clear keyboard callback
        //err this.game.input.keyboard.stop(); //이건 키보드를 먹통으로 하닌거이니 조심

        //키보드먹통해결책
        var keyboard = this.game.input.keyboard;
        keyboard.onDownCallback = keyboard.onUpCallback = keyboard.onPressCallback = null;

        //addonce는 한번하고 사라지는것같은 null로 넘어옴
        //this.game.input.onDown.remove(this.advanceToGame, this); // clear mouse callback
        //
        // TODO: Find out why switching to fullscreen doesn't work well on desktop (offsets window).
        if (this.game.device.desktop === false) {
            //테스트주석// this.game.scale.startFullScreen(); //크롬모바일모드로 할때 에러가 나서 고침
        }
        //this.game.state.start('game');
    },
    showUISelectLevelWithTitle: function () {
        firsttime=false;
        // //치트코드 -- 모든레벨 오픈 in showUISelectLevelWithTitle

        // if(whereServerNet===NET_STATE.DEV_SERVER) {
        //     kData.userData = []; //in uiSelectLevel.onUpdatePage //cheat Mode
        //     for (var i = LEVEL_MAX - 1; i >= 0; --i) kData.userData[i] = 3;
        //     kData.userData[LEVEL_MAX - 1] = 0; //0레벨 오픈
        //     networkManager.ForcedSaveData();
        // }
        // //치트코드 -- 모든레벨 오픈 in showUISelectLevelWithTitle

        if (kData.bSoundSE) SE_Click.play();         //시작 클릭음                 --타이틀에서 스타트 버튼을 눌렀을 때 나오는 클릭음
        if (loginTF === 1) {                                          //로그인상태
            //if (proto.serPos == 0) {                                   //모비서비스

            //------------------------
            //첫시작시 타이틀 사라지기

            //메모리로더에서 에러가 나서 주석처리
            this.title_spine.setAnimationByName(0, "title_out", false);
            this.title_spine.addAnimationByName(1, "empty", false);//emptytrack
            //메모리로더에서 에러가 나서 주석처리




            //첫시작시 레벨선택화면으로
            setTimeout(function () { if('menu'=== uigame.state.current) {
                    console.log("menu=== uigame.state.current");
                    uigame.state.states.menu.showUISelectLevel();
                }else{
                    console.log("menu!== uigame.state.current");
                }
            }, 500);//1초뒤
            //}
        }
        else//if(loginTF == 0){ //비로그인
        {
            if (networkManager.networkState === NET_STATE.LOCALHOST) {//로컬서비스
                //------------------------
                //첫시작시 타이틀 사라지기

                //메모리로더에서 에러가 나서 주석처리
                this.title_spine.setAnimationByName(0, "title_out", false);
                this.title_spine.addAnimationByName(1, "empty", false);//emptytrack
                //메모리로더에서 에러가 나서 주석처리

                //첫시작시 스타트샵 등장
                setTimeout(function () { if('menu'=== uigame.state.current) {
                         if(dm) console.log("menu=== uigame.state.current");
                         uigame.state.states.menu.showUISelectLevel();
                     }else{
                         if(dm) console.log("menu!== uigame.state.current");
                     }
                }, 500);//1초뒤
                //------------------------

            } else {//비회원
                // //비회원나가기처리-----
                // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetShpMsg('signup'), //타이틀
                //     function () {
                //         networkManager.JoinMember();
                //     },
                //     function () {
                //         uigame.input.onDown.addOnce(uigame.state.states.menu.showUISelectLevelWithTitle, uigame.state.states.menu);
                //         // //err: not a function// this.game.input.keyboard.addOnce(this, this.showUIFind);
                //         uigame.input.keyboard.addCallbacks(uigame.state.states.menu, uigame.state.states.menu.showUISelectLevelWithTitle);
                //     }
                // );
                // //비회원나가기처리----

                //------------------------
                //첫시작시 타이틀 사라지기
                //메모리로더에서 에러가 나서 주석처리
                this.title_spine.setAnimationByName(0, "title_out", false);
                this.title_spine.addAnimationByName(1, "empty", false);//emptytrack
                //메모리로더에서 에러가 나서 주석처리

                //첫시작시 스타트샵 등장
                setTimeout(function () { if('menu'=== uigame.state.current) {
                        console.log("menu=== uigame.state.current");
                        uigame.state.states.menu.showUISelectLevel();
                    }else{
                        console.log("menu!== uigame.state.current");
                    }
                }, 500);//1초뒤
                //------------------------

            }//비회원
        }


    },

    showUIFind: function () { //메뉴상태에서 검색창을 띄우기
        if (dm) console.log("- MenuState.goUIFind");
        this.uifind.visible = true;
        this.uisoundonoff.visible = false;//사운드강제숨기기
        this.uiresult.visible = false;
        //err this.game.input.keyboard.addCallbacks(); // clear keyboard callback
        //err this.game.input.keyboard.stop(); //이건 키보드를 먹통으로 하닌거이니 조심

        //키보드먹통해결책
        var keyboard = this.game.input.keyboard;
        keyboard.onDownCallback = keyboard.onUpCallback = keyboard.onPressCallback = null;

        //addonce는 한번하고 사라지는것같은 null로 넘어옴
        //this.game.input.onDown.remove(this.advanceToGame, this); // clear mouse callback
        //
        // TODO: Find out why switching to fullscreen doesn't work well on desktop (offsets window).
        if (this.game.device.desktop === false) {
            //테스트주석//this.game.scale.startFullScreen(); //크롬모바일모드로 할때 에러가 나서 고침
        }

        //this.game.state.start('game');


    },


    advanceToGame: function () {//게임시작1-5
        if (dm) console.log("- MenuState.advanceToGameed");
        this.grpTitleScreen.visible = false;
        //err this.game.input.keyboard.addCallbacks(); // clear keyboard callback
        //err this.game.input.keyboard.stop(); //이건 키보드를 먹통으로 하닌거이니 조심
        //키보드먹통해결책

        //var keyboard = this.game.input.keyboard;
        var keyboard = uigame.input.keyboard;
        keyboard.onDownCallback = keyboard.onUpCallback = keyboard.onPressCallback = null;

        //addonce는 한번하고 사라지는것같은 null로 넘어옴
        //this.game.input.onDown.remove(this.advanceToGame, this); // clear mouse callback
        //
        // TODO: Find out why switching to fullscreen doesn't work well on desktop (offsets window).
        //if(this.game.device.desktop === false){//데스크탑에서 에러뜸--> Uncaught TypeError: Cannot read property 'device' of null
        //this.game.stage.scale.startFullScreen();//크롬모바일모드로 할때 에러가 나서 주석처리
        //}

        //this.game.stage.disableVisibilityChange = true; //포커스잃엇을때 정지시킨다


        //if(false)
        //this.game.state.start('game');

        uigame.state.start('game');

        // if(true){
        //     net_started=true;                               //네트워크게임모드 진입
        //     //matchUImode=false;                              //서치ui 중지 용도
        //     uimode=uimodeset.matchfind;
        //
        //     if( uigame.state.states.menu.uifind.visible == true) {
        //         //다른선수가 강제진행시, 또는 자동 진행시 ui업데이트
        //         uimode=uimodeset.select;
        //         uigame.state.states.menu.uifind.visible = false;
        //         uigame.state.states.menu.advanceToGame();
        //     }
        // }

    },

    showUIResult: function () {
        if (dm) console.log("- MenuState.showUIResult");

        this.uiresult.visible = true; //여긴안오는것같음
        //err this.game.input.keyboard.addCallbacks(); // clear keyboard callback
        //err this.game.input.keyboard.stop(); //이건 키보드를 먹통으로 하닌거이니 조심

        //키보드먹통해결책
        var keyboard = this.game.input.keyboard;
        keyboard.onDownCallback = keyboard.onUpCallback = keyboard.onPressCallback = null;

        //addonce는 한번하고 사라지는것같은 null로 넘어옴
        //this.game.input.onDown.remove(this.advanceToGame, this); // clear mouse callback
        //
        // TODO: Find out why switching to fullscreen doesn't work well on desktop (offsets window).
        if (this.game.device.desktop === false) {
            //테스트주석//this.game.scale.startFullScreen(); //크롬모바일모드로 할때 에러가 나서 고침
        }

        //this.game.state.start('game');
    },

    shutdown: function () {//메뉴상태제거 //게임시작1-6 메뉴파괴후 --> GameState.create로
        //console.log("- MenuState.shutdowned");//ready메뉴가 나온다


        //this.uiselectlevel = createUISelectLevel();
        this.uiselectlevel.spine_unlock_n.destroy(true);
        this.uiselectlevel.spine_unlock_b.destroy(true);
        this.uiselectlevel.dlbg.sLeft.destroy(true);
        this.uiselectlevel.dlbg.sRight.destroy(true);
        this.uiselectlevel.z_page_lock.z_lock_life.destroy(true);
        this.uiselectlevel.z_spine_page_lock.destroy(true);
        this.uiselectlevel.dlbg.txPageBg.destroy(true);
        this.uiselectlevel.dlbg.txPage .destroy(true);
        this.uiselectlevel.dlbg.uisoundonoff.destroy(true);
        this.uiselectlevel.dlbg.btmulti .destroy(true);
        this.uiselectlevel.spMask_sel.destroy(true);
        for (var i = 0; i < LV4x4; i++) {
            this.uiselectlevel.dlbg.sIcons[i].sOn.sStar1.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sOn.sStar2.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sOn.sStar3.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sSelected.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sOn.icon.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sOn.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sOff.destroy(true);

            this.uiselectlevel.dlbg.sIcons[i].sBonusTx.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sLockBonus.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sBonusClearM.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sBonusSP1.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sBonusSP2.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sBonusSP3.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].sBonusSP4.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].z_panel_h.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].z_panel_c.destroy(true);

            this.uiselectlevel.dlbg.sIcons[i].sBonus.destroy(true);
            this.uiselectlevel.dlbg.sIcons[i].destroy(true);
        }
        this.uiselectlevel.dlbg.sTopStarBg.txTopStar.destroy(true);
        this.uiselectlevel.dlbg.sTopStarBg.destroy(true);
        this.uiselectlevel.dlbg.destroy(true);




        this.text = null;
        this.logo = null;
        if(this.title_spine!==null) this.title_spine.destroy(true);

        if(this.grpTitleScreen !== null)
            this.grpTitleScreen.destroy(true);
        //this.dude.destroy()


        if(this.uiselectlevel !== null)
            this.uiselectlevel.destroy(true);
        if(this.uishopplus !== null)
            this.uishopplus.destroy(true);
        if(this.uishop !== null)
            this.uishop.destroy(true);

        if(this.uifind !== null)
            this.uifind.destroy(true);

        if(this.uiresult !== null)
            this.uiresult.destroy(true);

        if(this.uishopresult !== null)
            this.uishopresult.destroy(true);

        if(this.uidev !== null)
            this.uidev.destroy(true);

        if(this.whiteshop !== null)
            this.whiteshop.destroy(true);

        this._i = null;
        this._j = null;
        this._e = null;
        this._existname = null;


        //this.game.world.removeAll();
        this.game = null;

    }


};
