// 게임상태를 나타낸다.
var STATE_NONE = 0;
var STATE_LOADING_SET = 10;
var STATE_LOADING = 20;
var STATE_TITLE = 40;
var STATE_STAGE = 45;
var STATE_STAGE_INFO = 50;
var STATE_GAME = 60;
var STATE_GAME_INIT = 1000;
var STATE_GAME_SET = 1020;
var STATE_GAME_READY = 1025;
var STATE_GAME_PLAY = 1030;
var STATE_GAME_CLEAR_STEP0 = 1040;	// 아이쳄이 날라가는 연출.
var STATE_GAME_CLEAR_STEP1 = 1041;	// 
var STATE_GAME_CLEAR_STEP2 = 1042;	// 
var STATE_GAME_CLEAR_STEP3 = 1043;	// 
var STATE_GAME_CLEAR_STEP4 = 1044;	// 
var STATE_GAME_CLEAR_STEP5 = 1045;	// 

var STATE_GAME_OVER_SET = 1060;	// 게임오버 연출 셋팅을 하고
var STATE_GAME_OVER_ING = 1065;	// 게임오버 연출을 보여주고
var STATE_TURN_OVER = 1070;	// 턴오버 팝업창을 보여준다.
var STATE_GAME_OVER = 1080;	// 게임오버 팝업창을 보여준다.

var STATE_FADE_IN = 2000;
var STATE_FADE_OUT = 2001;

renderer.backgroundColor = 0xffffff; // 백그라운드 컬러를 변경한다.
var VERSION = "1.0.8";
var bCHEAT = false;
var bMGCHEAT = false;	// yahooIN : 추가.

var state = STATE_LOADING_SET;	// 게임을 상태를 나타내며..현상태로 해당 함수를 콜한다.
var gameState = STATE_GAME_INIT;
var nextState = STATE_NONE;		// 우선 임시로 놓는다.
var oldState = STATE_NONE;

var fTimeDelay = 0;

//var txtLoading;
//================================================================================
// 여기서부터 변수를 선언한다.
var tt;
var BG_Map = [];		// 맵속성이 쌓이는 곳이다.
for(tt=0;tt<MAX_TILE_Y;++tt)
	BG_Map[tt] = [];
var BLOCK_Map = [];	// 블럭이 배치될 맵..
for(tt=0;tt<MAX_TILE_Y;++tt)
	BLOCK_Map[tt] = [];
var MOVE_NONE = 0;
var MOVE_ING = 1;
var CHECK_MOVE_Map = [];	// 움직이는 블럭을 체크한다.(0:안움직이는 상태, 1 : 움직이는 상태)
for(tt=0;tt<MAX_TILE_Y;++tt)
	CHECK_MOVE_Map[tt] = [];
var CHECK_Map = [];	// 움직이는 블럭을 체크한다.(0:안움직이는 상태, 1 : 움직이는 상태)
for(tt=0;tt<MAX_TILE_Y;++tt)
	CHECK_Map[tt] = [];
var HP_NONE = 0;
var HP_MINUS = 1;
var CHECK_HP_Map = [];	// 터지는 블럭 주변에 있는 hp블럭의 체력부분 체크.
for(tt=0;tt<MAX_TILE_Y;++tt)
	CHECK_HP_Map[tt] = [];
var BOMB_NONE = 0;
var BOMB_CHECK = 1;
var CHECK_BOMB_Map = [];	// 아이템에 의해 터졌을경우 체크를 한다.
for(tt=0;tt<MAX_TILE_Y;++tt)
	CHECK_BOMB_Map[tt] = [];
var sprStageMap = [];		// 스테이지 맵을 표시한다.
var tbCB = [];			// 블럭생성 위치
var START_X = iCenterSizeX - 384;
var START_Y = iCenterSizeY - 350;	// 블럭의 Y시작 좌표.
var kBlock = [];		// 게임상에 내려간 패..
var kBlockDeck = [];	// 생성할 블럭을 대기 시키기 위한 포인터 패..
var kHero;				// 주인공 포인터를 가지고 있는다.
var kBox;				// 박스 포인터.
var bHeroMoveUnBlock = false;

var bBlockMove = false;
var bBlockSort = false;
var iLCC = 0;	// LeftCheckCnt;
var iRCC = 0;	// RightCheckCnt;
var iTCC = 0;	// TopCheckCnt;
var iBCC = 0;	// BottomCheckCnt;
var iWC = 0;
var iHC = 0;
var iCCY = 0;
var iCCX = 0;
var iLCC2 = 0;	// LeftCheckCnt;
var iRCC2 = 0;	// RightCheckCnt;
var iTCC2 = 0;	// TopCheckCnt;
var iBCC2 = 0;	// BottomCheckCnt;
var iBOX = 0;

var bCursor = false;
var bDragStart = false;
var iDIY1 = 0;	// DragIndexY
var iDIX1 = 0;	// DragIndexX
var iDIY2 = 0;	// DragIndexY
var iDIX2 = 0;	// DragIndexX
var iDSY = 0;	// DragStartY
var iDSX = 0;	// DragStartX
var iDragDirection = -1;

var D_LEFT = 0;
var D_RIGHT = 1;
var D_TOP = 2;
var D_BOTTOM = 3;

var bRainbowSelect = false;
var iRainbowY = 0;	// index값을 저장한다.
var iRainbowX = 0;

var tRoad;				// 로드 위치를 배열로 가지고 잇는다.
var iHeroState = 0;		// 주인공 상태
var iHeroIndex = 0;		// 주인공이 움직인 위치..

var txtStage;
var iStage = 0;
var txtScore;
var txtBestScore;
var iScore = 0;
var iOldScore = -1;
var iTurnNum = 0;		// 내 남은 턴갯수.
var txtTurnNum;
var iRoadNum = 0;	// 남은 로드수.
var txtRoadNum;

var iComboCnt = 0;		// 54번 업적시스템에 사용.

//var sprCombo;
//var sprExcellent;
//var txtComboNum;

var sprFade;
var sprWhite;

var sprArrowLeft;
var sprArrowRight;
var iPage = 0;
var iPageMax = 25;
var txtPage;
var PAGE_CHILD_CNT = 12;
var kStageInfo = [];
var txtStageNo;

var sprStageInfoBG = [];
var sprStageInfoCat = [];
var sprStageInfoClip = [];
var sprPhotoResultAlbumBG = [];
var sprPhotoResultAlbumCat = [];
var sprPhotoResultAlbumClip = [];
var sprAlbumType = [];
var sprAlbumAllClear = [];
var sprAlbumNew = [];
var txtAlbumTypePer = [];
var sprAlbumBG = [];
var sprAlbumCat = [];
var sprAlbumCatNew = [];
var sprAlbumArrowLeft;
var sprAlbumArrowRight;
var iAlbumPage = 0;
var iAlbumPageMax = 50;
var txtAlbumPage;
var iAlbumType = 0;
var sprAlbumArrowNew = [];
var txtAlbumCatNum = [];

var sprBG = [];

//var sprTurnOverX2;
//var sprGameOverX2;
//var sprPhotoTimeX2;fltm
var txtWarningContents;

var PR_NONE = 0;
var PR_INIT = 1;
var PR_PICTURE_DOWN_ING = 2;
var PR_PICTURE_FADE_IN = 3;
var PR_SUCCESS_FAIL = 4;
var PR_SCORE = 5;
var PR_SCORE_BEST = 6;

var iPhotoResultState = PR_NONE;
var fPhotoResultTime = 0;
//var sprPhotoResultX2;
var txtPhotoResultSuccess;
var sPhoto = new PIXI.Container();
var sPhotoResultButton = new PIXI.Container();
var sprPhotoResultBG;
var sprPhotoResultCat;
var sprPhotoResultObject;
var sprPhotoResultNew;
var sprPhotoResultBest;
var txtPhotoResultScore;
var bPhotoResultSkip = false;
var btnReshoot = [];

var iCatGetIndex = -1;
var iCatGetPer = 0;
//var iCatGetPerMultiply = -1;	// 2배확률업..
var tbCatGetFailMax = [1, 2, 3, 4, 5, 6];

var HS_TIME_CHECK = 0;
var HS_HINT = 1;
var iHintState = HS_TIME_CHECK;
var fHintTime = 0;
var fHintTimeMax = 5;	// 30초동안 아무반응이 없으면 헬프를 해준다.
var spine_hint_eff = [];	// 총 5개정도 가지고 한다.
var tweenHint;
var tweenBlock;
var bHintInit = false;

var sprSoundBGM;
var sprSoundSE;

var iTutoState = 0;
var sprTutoArrow;
//var sprTutoBox;
//var txtTuto;

//var sprTutoBox2;
//var sprTutoItem = [];
//var txtTuto2;

var iOldCreateBlockType = -1;
var iLifeState = 1;
var txtLifeCnt = null;
//var txtLifeTime;

var txtGoalSkip;
var txtPhotoTimeSkip;

var iFilmState = 0;

var txtNotBlock;
//================================================================================
// 스파인 변수 및 데이터..
var spine_cursor;
var spine_item_bomb_eff = [];
var ispine_item_bomb_eff_cnt = 0;
var ispine_item_bomb_eff_max = 10;	// 10개정도로해서 관리한다.
var spine_foot_bomb_eff_small = [];
var ispine_foot_bomb_eff_small_cnt = 0;
var ispine_foot_bomb_eff_small_max = 50;//MAX_TILE_Y * MAX_TILE_X;
var spine_foot_bomb_eff_big = [];
var ispine_foot_bomb_eff_big_cnt = 0;
var ispine_foot_bomb_eff_big_max = 10;

var spine_ready_start;
var spine_nekopang_title;
var spine_goal_popup_ani;
var kShop;

var spine_block_bomb_eff = [];
var ispine_block_bomb_eff_cnt = 0;
var ispine_block_bomb_eff_max = 20;//MAX_TILE_Y * MAX_TILE_X;
var txtScoreAni = [];
var iScoreAniCnt = 0;
var iScoreAniMax = 50;//MAX_TILE_Y * MAX_TILE_X;

var spine_combo_ani;
var spine_heart_bomb;

// 업데이트함수를 호출하고 지속적으로 업데이트함수를 콜한다.
var lastTime = new Date;
var oldFps;
var txtFps;
var avgFps = 0;
var avgFpsCnt = 0;

$(document).ready(function() {
//	lang = 'ja';
	setGidx(MYGIDX);

    LoadDataInClient();
    update();

/*	if(networkManager.networkState != NET_STATE.LOCALHOST) {
		networkManager.GetGameInfo(function (data) {
		//	{"TF":1,"Heartrefill":600,"baseHeart":5,"initHeart":10,"money_base":0}
			fLifeAddTime = data.Heartrefill;	//라이프가 획득 시간
			iLifeMax = data.baseHeart;	//라이프 맥스값
			iLifeFirstCnt = data.initHeart;	//라이프 초기값
			if(loginTF == 0)
				LoadDataInClient();
			update();
		});
	}else{
		LoadDataInClient();
		update();
	}*/
	var fastLoadTxt = new PIXI.Text("", {fontFamily:tbTTF[lang], fontSize:'20px', fill:'#ffffff', stroke:'#000000', strokeThickness:6});
	fastLoadTxt.text = "0";
});

function update()
{
//	var i=0;
//	var bCheck = false;
	/*
	if(bCHEAT == true) {
		avgFpsCnt++;
		var nowTime = new Date;
		var fps = Mathfloor(1000 / (nowTime - lastTime));
		avgFps += fps;
		lastTime = nowTime;
		if (oldFps != fps) {
			oldFps = fps;
			if (txtFps != undefined) {
				txtFps.text = fps.toString();
				txtFps.text += "\nAvgFps : " + (Mathfloor(avgFps/avgFpsCnt*100)/100);
			}
		}
	}
	*/

	switch(state)
	{
		case STATE_NONE:
			break;
		case STATE_LOADING_SET:
			//--프로그래스바시작--                      <----여기서부터 복사시작
            var loader = PIXI.loader; //첫로더생성
            var resources = PIXI.loader.resources;

            //회사 로고 및 타이틀 로딩한다.
			loader.add("../Common/load/movi_01.png", strGamePath+"../Common/load/movi_01.png");
			loader.add("../Common/load/movi_02.png", strGamePath+"../Common/load/movi_02.png");
			loader.add("../Common/load/movi_03.png", strGamePath+"../Common/load/movi_03.png");
			loader.add("../Common/load/loading02.png", strGamePath+"../Common/load/loading02.png");
			loader.add("../Common/load/zhuye002.png", strGamePath+"../Common/load/zhuye002.png");
            loader.once('complete', cbLogoComplete); //cbLogoComplete->cbImageDownComplete(loader, res) //State.TITLE로 대기모드로-->GameViewSetting(res)
            loader.load();

            /*txtLoading = FontLoad(sLoading, '0%', iCenterSizeX, iCenterSizeY + 100, 0.5, 0.5,
				{fontFamily:'Arial', fontSize:'23px', fill:'#2E85ED', align:'center'});
            stage.addChild(sLoading);*/

            //로딩바작동
            loader.on(
                "progress",
                function (loader, resources){
                    loadingcount+=1;
                    var progbias=loadingcount/loadingcountmax;
                    var prog = progbias*100;
                    var progcrop = prog<1?1:prog>100?100:prog;
                    //txtLoading.text = Mathfloor(progcrop)+"%";
                    //if(loadingcount==0)txtLoading.text="0%";
                    var scalex = loadingscalemax*progbias;
                    var scalexcrop = scalex<1?1:scalex>loadingscalemax?loadingscalemax:scalex;
					if (typeof sprLogoMask !== "undefined"            //마스크로딩이 안되면 안나오게
						&& sprLogoMask) {
						sprLogoMask.clear();
						sprLogoMask.beginFill(0xff00ff, 1);
						sprLogoMask.drawRect(progSX, progSY, scalexcrop, progSH, 15);
						sprLogoMask.endFill();
						if (sprLogoProg.alpha < 1) sprLogoProg.alpha = 1; //보라색로고가 나오는 경우를 막기 위해
					}
                    // //디버그용도 -->
                    // 여기서 오브젝트 카운트를 알 수 있고,
                    // 사운드는 나중에 로딩 될 수 있음, 그래서 타이틀 등장시 오브젝트카운트틀 사용하면 적당
                    //
//                     var text = (`loading: ${resources.url}`+"\n");
//                     text += (`progress: ${loader.progress}`+"\n");
//                     text += (loadingcount+"\n");
//                     console.log("progress:"+ text);
//                     txtLoading.text=loadingcount; //
                    // //디버그용도
                }
            );

            loader.load(
                function () {
                //	console.log("======== loader.count : " + loader.count);
                    var progbias = loadingcount / loadingcountmax;
                    var prog = progbias * 100;
                    var progcrop = prog < 1 ? 1 : prog > 100 ? 100 : prog;
                    //txtLoading.text = Mathfloor(progcrop) + "%";
                    //if (loadingcount == 0) txtLoading.text = "0%";
                    var scalex = loadingscalemax * progbias;
                    var scalexcrop = scalex < 1 ? 1 : scalex > loadingscalemax ? loadingscalemax : scalex;
                    if (typeof sprLogoMask !== "undefined"            //마스크로딩이 안되면 안나오게
                        && sprLogoMask) {
						sprLogoMask.clear();
						sprLogoMask.beginFill(0xff00ff, 1);
						sprLogoMask.drawRect(progSX, progSY, scalexcrop, progSH, 15);
						sprLogoMask.endFill();
                        if (sprLogoProg.alpha < 1) sprLogoProg.alpha = 1; //보라색로고가 나오는 경우를 막기 위해
                    }
                }
            );
            state = STATE_LOADING;
            //--프로그래스바완료--                            <----여기서부터 복사끝
			break;
		case STATE_LOADING:
			break;

		case STATE_TITLE: // 타이틀화면에서 키입력이 있기까지 대기한다.
			break;
		case STATE_STAGE:
		//	kData.iClearStage[28] = STAGE_OPEN;
		//	kData.iClearStage[29] = STAGE_OPEN;
			break;
		case STATE_GAME:
			UpdateScore();
			switch(gameState)
			{
				case STATE_GAME_INIT:
					gameState = STATE_GAME_SET;
					BGMSoundPlay(BGM_Game);
					break;
				case STATE_GAME_SET:
					// 초기화 작업진행
					bCursor = false;
					spine_cursor.visible = false;
					sPhotoResult.visible = false;
					sResultCatInfo.visible = false;
					txtStage.text = GetString("STAGE2", (iStage+1));
					iScore = 0;
					iComboCnt = 0;

					if(sprTutoArrow.tween != null)
						sprTutoArrow.tween.kill();
					sprTutoArrow.visible = false;

					iHintState = HS_TIME_CHECK;
					fHintTime = 0;
					spine_hint_eff[0].visible = false;
					spine_hint_eff[1].visible = false;
					spine_hint_eff[2].visible = false;
					spine_hint_eff[3].visible = false;
					spine_hint_eff[4].visible = false;
					if(tweenHint != undefined)
						tweenHint.kill();
					bHintInit = false;

					// 도움말 셋팅
				//	SetHelp();
					SetStage();

					fTimeDelay = 0;
					bBlockMove = false;
					SESoundPlay(SE_Ready);
					SpinePlay(spine_ready_start, undefined, undefined, "ready_go", 1, false);
					gameState = STATE_GAME_READY;
					break;
				case STATE_GAME_READY:
					break;
				case STATE_GAME_PLAY:
					UpdateHint();
					UpdateBlock();
					UpdateCreateBlock();	// 블럭 생성 관리
					break;
				case STATE_GAME_CLEAR_STEP0: // 게임클리어처리하면서 클리어 애니메이션 문구를 보여준다.
					if(sOption.visible == true) break;
					SESoundPlay(SE_StageClear);
					kData.iClearStage[iStage+1] = STAGE_OPEN;
					kData.iStageMax = iStage+1;
					if(kData.iStageMax >= 300)
						kData.iStageMax = 299;
					networkManager.ForcedSaveData();
					BGMSoundPlay(BGM_Title);
					SpinePlay(spine_ready_start, undefined, undefined, "stage_clear", 2, false);
					gameState = STATE_GAME_CLEAR_STEP1;
					break;
				case STATE_GAME_CLEAR_STEP1:
					break;
				case STATE_GAME_CLEAR_STEP2:	// 화면에 남은 아이템블럭을 터트려준다.
					UpdateCreateBlock();	// 블럭 생성 관리
					UpdateBlock();			// 블럭 움직임을 컨트롤..
					if(fTimeDelay > 0.1)
					{
						var bCheck = false;
						for(var i=0;i<kBlock.length;++i)
						{
							if(kBlock[i].type >= BT_ITEM_WIDTH && kBlock[i].type <= BT_ITEM_RAINBOW)
							{
								bCheck = true;
								if(kBlock[i].hp > 0 && kBlock[i].state == BS_NONE){
									if (kBlock[i].type != BT_ITEM_RAINBOW)
										SetItemEffect(kBlock[i], 3);
									else {
										bRainbowSelect = true;
										iRainbowY = kBlock[i].iy;
										iRainbowX = kBlock[i].ix;
										SetItemEffect(kBlock[i], 3, Mathfloor(Math.random() * tbBlockTypeMax[iStage]));
									}
									break;
								}
							}
						}

						if(bCheck == true || bBlockMove == true) {
							fTimeDelay = 0;
							gameState = STATE_GAME_CLEAR_STEP2;
						}
						else if(bCheck == false) // 아이템이 한개도 없을때 바로 넘어가게 한다.
						{
							fTimeDelay = -1;
							if(iTurnNum > 0)
								gameState = STATE_GAME_CLEAR_STEP3;
							else
								gameState = STATE_GAME_CLEAR_STEP4;
						}
					}
					break;
				case STATE_GAME_CLEAR_STEP3: // 남은턴을 아이템으로 변경한다.
					if(fTimeDelay > 0.2){
						fTimeDelay = 0;
						var iR3 = 0;
						var cnt = 0;

						while(iTurnNum > 0)
						{
							iR3 = Mathfloor(Math.random()*kBlock.length);
							if(kBlock[iR3].type < BT_NEKO_MAX)
							{
								SESoundPlay(SE_LastItem);
								kBlock[iR3].SetBlock(BT_ITEM_WIDTH + Mathfloor(Math.random()*2), undefined, false);
								SetTurnAdd(-1);
								break;
							}

							if(++cnt > 20)
							{
								SetScoreAni(iCenterSizeX + 240, iCenterSizeY - 500, 5000, 0);
								SetTurnAdd(-1);
								break;
							}
						}

						if(iTurnNum <= 0)
						{
							fTimeDelay = 0;
							gameState = STATE_GAME_CLEAR_STEP2;
						}
					}
					break;
				case STATE_GAME_CLEAR_STEP4:
					if(fTimeDelay > 0.3)
					{
						sGoal.visible = true;
						txtGoalSkip.visible = true;
						sResultCatInfo.visible = true;
					//	sGoal.addChild(sResultCatInfo);
						SetResultCatInfo();
						if(iStage < 5 && kData.iTutorial[iStage] == 0)
							txtGoalSkip.visible = false;
					//	SpinePlay(spine_goal_popup_ani, iCenterSizeX, iCenterSizeY, "goal_popup_ani", 1, false);
						SpinePlay(spine_goal_popup_ani, iCenterSizeX, iCenterSizeY, "empty", 0, false, SPINE_INIT_ALL);
						gameState = STATE_GAME_CLEAR_STEP5;
					}
					break;
				case STATE_GAME_CLEAR_STEP5:
					break;
				case STATE_GAME_OVER_SET:
				//	if(iCatGetPerMultiply == iStage)
				//		sprTurnOverX2.visible = true;
				//	else
				//		sprTurnOverX2.visible = false;
					SESoundPlay(SE_PopupOn);
					sTurnOver.visible = true;
					sTurnOver.addChild(sFilm);
				//	sFilm.position.set(0, 160);
					TweenMax.fromTo(sTurnOver.children[0], 0.5, {alpha:0},
						{alpha:0.9, ease:Linear.easeNone});
					TweenMax.fromTo(sTurnOver.children[1], 1, {as:0.5},
						{as:1, ease:Elastic.easeOut});
					gameState = STATE_TURN_OVER;
					break;
				case STATE_GAME_OVER_ING:
					break;
				case STATE_TURN_OVER:	// 게임오버창이 떠서 대기중..
					break;
				case STATE_GAME_OVER:	// 게임오버창이 떠서 대기중..
					break;
				case STATE_FADE_IN:
					break;
				case STATE_FADE_OUT:
					break;
			}
			break;
	}

	UpdateLife();
	UpdateTuto();
	UpdateResult();
	updateTick();
	requestAnimationFrame(update);
	renderer.render(stage);
	if(networkManager != null)
		networkManager.Update();
	if(kShop != null)
		kShop.Update();
	fTimeDelay += deltaTime;
	if(document.body.scrollTop != 0) // yahooIN : 모바일페이지에서 화면이 올라가는증상을 해결함.
		document.body.scrollTop = 0;
}
/*
function SetHelp()
{
	switch(iStage){
		case 0:
			sprTutoBox2.visible = true;
			txtTuto2.text = GetString("help0");
			sprTutoItem[0].visible = true;
			sprTutoItem[1].visible = true;
			sprTutoItem[2].visible = true;
			sprTutoItem[0].texture = PIXI.Texture.fromFrame("block/dustbox_block_hp1.png");
			sprTutoItem[1].texture = PIXI.Texture.fromFrame("block/dustbox_block_hp2.png");
			sprTutoItem[2].texture = PIXI.Texture.fromFrame("block/dustbox_block_hp3.png");
			break;
		case 10:
			sprTutoBox2.visible = true;
			txtTuto2.text = GetString("help1");
			sprTutoItem[0].visible = true;
			sprTutoItem[1].visible = true;
			sprTutoItem[2].visible = true;
			sprTutoItem[0].texture = PIXI.Texture.fromFrame("block/fire_water_block_hp1.png");
			sprTutoItem[1].texture = PIXI.Texture.fromFrame("block/fire_water_block_hp2.png");
			sprTutoItem[2].texture = PIXI.Texture.fromFrame("block/fire_water_block_hp3.png");
			break;
		case 30:
			sprTutoBox2.visible = true;
			txtTuto2.text = GetString("help2");
			sprTutoItem[0].visible = true;
			sprTutoItem[1].visible = true;
			sprTutoItem[2].visible = true;
			sprTutoItem[0].texture = PIXI.Texture.fromFrame("map/ice_block_hp1.png");
			sprTutoItem[1].texture = PIXI.Texture.fromFrame("map/ice_block_hp2.png");
			sprTutoItem[2].texture = PIXI.Texture.fromFrame("map/ice_block_hp3.png");
			break;
		case 70:
			sprTutoBox2.visible = true;
			txtTuto2.text = GetString("help3");
			sprTutoItem[0].visible = false;
			sprTutoItem[1].visible = true;
			sprTutoItem[2].visible = false;
			sprTutoItem[1].texture = PIXI.Texture.fromFrame("block/cage_block.png");
			break;
		case 130:
			sprTutoBox2.visible = true;
			txtTuto2.text = GetString("help4");
			sprTutoItem[0].visible = false;
			sprTutoItem[1].visible = true;
			sprTutoItem[2].visible = false;
			sprTutoItem[1].texture = PIXI.Texture.fromFrame("block/grass_block.png");
			break;
		case 220:
			sprTutoBox2.visible = true;
			txtTuto2.text = GetString("help5");
			sprTutoItem[0].visible = false;
			sprTutoItem[1].visible = true;
			sprTutoItem[2].visible = false;
			sprTutoItem[1].texture = PIXI.Texture.fromFrame("block/stone_block.png");
			break;
		default:
			sprTutoBox2.visible = false;
			break;
	}
}
function UpdateTuto()
{
	var i;
	switch(iTutoState)
	{
		case 0:	// 아무짓도 하지 않는다.
			break;

		case 1:	// 1스테이지 팝업창하고 화살표를 셋팅해준다.
			sprTutoBox.visible = true;
			sprTutoBox.alpha = 0;
			sprTutoBox.position.set(iCenterSizeX, iCenterSizeY - 100);
			txtTuto.text = GetString("tuto0");
			TweenLite.to(sprTutoBox, 0.5, {alpha:1, ease:Power0.easeNone});

			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX - 200, iCenterSizeY + 50);
			sprTutoArrow.rotation = 11;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {x:sprTutoArrow.position.x}, {yoyo:true, repeat:-1, x:sprTutoArrow.position.x+20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax;	// 바로 힌트가 나오게 설정..
			iTutoState = 11;
			break;
		case 11:
			if(bBlockMove == true){
				sprTutoBox.visible = false;
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;
				kData.iTutorial[0] = 1;
				SaveDataInClient();

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;
		case 2:	// 2스테이지 셋팅..
			sprTutoBox.visible = true;
			sprTutoBox.alpha = 0;
			sprTutoBox.position.set(iCenterSizeX + 100, iCenterSizeY - 200);
			txtTuto.text = GetString("tuto1");
			TweenLite.to(sprTutoBox, 0.5, {alpha:1, ease:Power0.easeNone});

			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX - 153, iCenterSizeY - 110);
			sprTutoArrow.rotation = 0;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax;	// 바로 힌트가 나오게 설정..
			iTutoState = 21;
			break;
		case 21:
			if(bBlockMove == true){
				txtTuto.text = GetString("tuto11");
				TweenLite.to(sprTutoBox, 0.5, {x:sprTutoBox.position.x, y:sprTutoBox.position.y+100, ease:Power0.easeNone});
				sprTutoArrow.tween.kill();
				sprTutoArrow.position.set(iCenterSizeX - 153, iCenterSizeY - 10);
				sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
				BG_Map[6][3].SetItem(ITEM0);
				iTutoState = 22;
			}
			break;
		case 22:
			if(bBlockMove == false)
				iTutoState = 23;
			break;
		case 23:
			if(bBlockMove == true)
			{
				sprTutoBox.visible = false;
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;
				kData.iTutorial[1] = 1;
				SaveDataInClient();

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);

				iTutoState = 0;
			}
			break;
		case 3:	// 3스테이지 셋팅..
			sprTutoBox.visible = true;
			sprTutoBox.alpha = 0;
			sprTutoBox.position.set(iCenterSizeX, iCenterSizeY - 220);
			txtTuto.text = GetString("tuto2");
			TweenLite.to(sprTutoBox, 0.5, {alpha:1, ease:Power0.easeNone});

			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX, iCenterSizeY - 50);
			sprTutoArrow.rotation = 0;//3.14 / 180 * 90;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax;	// 바로 힌트가 나오게 설정..
			iTutoState = 31;
			break;
		case 31:
			if(bBlockMove == true){
				txtTuto.text = GetString("tuto21");
				TweenLite.to(sprTutoBox, 0.5, {x:sprTutoBox.position.x, y:sprTutoBox.position.y+50, ease:Power0.easeNone});
				sprTutoArrow.tween.kill();
				sprTutoArrow.rotation = 0;
				sprTutoArrow.position.set(iCenterSizeX, iCenterSizeY + 10);
				sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
				BG_Map[6][5].SetItem(ITEM0);
				iTutoState = 32;
			}
			break;
		case 32:
			if(bBlockMove == false)
				iTutoState = 37;
			break;
		case 37:
			if(bBlockMove == true)
			{
				sprTutoBox.visible = false;
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;
				kData.iTutorial[2] = 1;
				SaveDataInClient();

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;

		case 4:	// 4스테이지 셋팅..
			sprTutoBox.visible = true;
			sprTutoBox.alpha = 0;
			sprTutoBox.position.set(iCenterSizeX, iCenterSizeY - 250);
			txtTuto.text = GetString("tuto3");
			TweenLite.to(sprTutoBox, 0.5, {alpha:1, ease:Power0.easeNone});

			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX, iCenterSizeY - 117);
			sprTutoArrow.rotation = 0;//3.14 / 180 * 90;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});


			bHintInit = false;
			fHintTime = fHintTimeMax;	// 바로 힌트가 나오게 설정..
			iTutoState = 41;

			iHintState = HS_HINT;
			var block = [];
			block[0] = BLOCK_Map[5][4];
			block[1] = BLOCK_Map[5][5];
			block[2] = BLOCK_Map[5][6];
			block[3] = BLOCK_Map[6][5];
			block[4] = BLOCK_Map[7][5];
			for(i=0;i<block.length;++i)
			{
				spine_hint_eff[i].visible = true;
				spine_hint_eff[i].position.set(block[i].x, block[i].y);
			}
			tweenBlock = BLOCK_Map[4][5];
			tweenHint = TweenMax.fromTo(tweenBlock.sprMain, 0.5, {y:tweenBlock.y}, {yoyo:true, repeat:-1, y:tweenBlock.y + 10, ease:Power0.easeNone});
			break;
		case 41:
			if(bBlockMove == true){
				txtTuto.text = GetString("tuto31");
				TweenLite.to(sprTutoBox, 0.5, {x:sprTutoBox.position.x, y:sprTutoBox.position.y+150, ease:Power0.easeNone});
				sprTutoArrow.tween.kill();
				sprTutoArrow.position.set(iCenterSizeX, iCenterSizeY + 100);
				sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
				BG_Map[7][5].SetItem(ITEM0);
				iTutoState = 42;
			}
			break;
		case 42:
			if(bBlockMove == false)
				iTutoState = 43;
			break;
		case 43:
			if(bBlockMove == true)
			{
				sprTutoBox.visible = false;
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;
				kData.iTutorial[3] = 1;
				SaveDataInClient();

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);

				iTutoState = 0;
			}
			break;
		case 5:	// 5스테이지 셋팅..
			sprTutoBox.visible = true;
			sprTutoBox.alpha = 0;
			sprTutoBox.position.set(iCenterSizeX, iCenterSizeY + 250);
			txtTuto.text = GetString("tuto4");
			TweenLite.to(sprTutoBox, 0.5, {alpha:1, ease:Power0.easeNone});

			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX, iCenterSizeY - 100);
			sprTutoArrow.rotation = 0;//3.14 / 180 * 180;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y-20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax;	// 바로 힌트가 나오게 설정..
			iTutoState = 51;
			break;
		case 51:
			if(bBlockMove == true){
				txtTuto.text = GetString("tuto41");
				sprTutoArrow.tween.kill();
				sprTutoArrow.position.set(iCenterSizeX, iCenterSizeY - 50);
				sprTutoArrow.rotation = 0;
				sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
				BG_Map[5][5].SetItem(ITEM0);
				iTutoState = 52;
			}
			break;
		case 52:
			if(bBlockMove == false)
				iTutoState = 53;
			break;
		case 53:
			if(bCursor == true){
				txtTuto.text = GetString("tuto42");
				sprTutoArrow.tween.kill();
				sprTutoArrow.position.set(iCenterSizeX + 77, iCenterSizeY - 50);
				sprTutoArrow.rotation = 0;
				sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
				BG_Map[5][6].SetItem(ITEM0);
				iTutoState = 54;
			}
			break;
		case 54:
			if(bBlockMove == true)
			{
				sprTutoBox.visible = false;
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;
				kData.iTutorial[4] = 1;
				SaveDataInClient();

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;
	}
}
		 */
function UpdateTuto()
{
	var i;
	switch(iTutoState)
	{
		case 0:	// 아무짓도 하지 않는다.
			break;
		case 1:	// 1스테이지 팝업창하고 화살표를 셋팅해준다.
			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX - 270, iCenterSizeY + 225);
			sprTutoArrow.rotation = 11;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {x:sprTutoArrow.position.x}, {yoyo:true, repeat:-1, x:sprTutoArrow.position.x+20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax - 0.1;	// 바로 힌트가 나오게 설정..
			iTutoState = 11;
			break;
		case 11:
			if(bBlockMove == true){
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;
		case 2:	// 2스테이지 셋팅..
			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX - 230, iCenterSizeY + 30);
			sprTutoArrow.rotation = 11;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {x:sprTutoArrow.position.x}, {yoyo:true, repeat:-1, x:sprTutoArrow.position.x+20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax - 0.1;	// 바로 힌트가 나오게 설정..
			iTutoState = 21;
			break;
		case 21:
			if(bBlockMove == true){
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;
		case 3:	// 3스테이지 셋팅..
			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX - 40, iCenterSizeY - 70);
			sprTutoArrow.rotation = 0;//3.14 / 180 * 90;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax - 0.1;	// 바로 힌트가 나오게 설정..
			iTutoState = 31;
			break;
		case 31:
			if(bBlockMove == true){
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;
		case 4:	// 4스테이지 셋팅..
			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX, iCenterSizeY - 110);
			sprTutoArrow.rotation = 0;//3.14 / 180 * 90;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {y:sprTutoArrow.position.y}, {yoyo:true, repeat:-1, y:sprTutoArrow.position.y+20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax - 0.1;	// 바로 힌트가 나오게 설정..
			iTutoState = 41;

			iHintState = HS_HINT;
			var block = [];
			block[0] = BLOCK_Map[5][4];
			block[1] = BLOCK_Map[5][5];
			block[2] = BLOCK_Map[5][6];
			block[3] = BLOCK_Map[6][5];
			block[4] = BLOCK_Map[7][5];
			for(i=0;i<block.length;++i)
			{
				spine_hint_eff[i].visible = true;
				spine_hint_eff[i].position.set(block[i].x, block[i].y);
			}
			tweenBlock = BLOCK_Map[4][5];
			tweenHint = TweenMax.fromTo(tweenBlock.sprMain, 0.5, {y:tweenBlock.y}, {yoyo:true, repeat:-1, y:tweenBlock.y + 10, ease:Power0.easeNone});
			break;
		case 41:
			if(bBlockMove == true){
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;
		case 5:	// 5스테이지 셋팅..
			sprTutoArrow.visible = true;
			sprTutoArrow.position.set(iCenterSizeX + 270, iCenterSizeY + 107);
			sprTutoArrow.rotation = 3.14 / 180 * 90;
			sprTutoArrow.tween = TweenMax.fromTo(sprTutoArrow, 0.5, {x:sprTutoArrow.position.x}, {yoyo:true, repeat:-1, x:sprTutoArrow.position.x-20, ease:Power0.easeNone});

			bHintInit = false;
			fHintTime = fHintTimeMax - 0.1;	// 바로 힌트가 나오게 설정..
			iTutoState = 51;
			break;
		case 51:
			if(bBlockMove == true){
				sprTutoArrow.tween.kill();
				sprTutoArrow.visible = false;

				for(i=0;i<kBlock.length;++i)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM0);
				iTutoState = 0;
			}
			break;
	}
}

function UpdateHint()
{
	switch(iHintState){
		case HS_TIME_CHECK:
			if(bHintInit == true || bRainbowSelect == true) {
				bHintInit = false;
				fHintTime = 0;
			}
			if(fHintTime >= fHintTimeMax)
			{
				// 힌트쪽 셋팅한다.
				CheckHint();
				SESoundPlay(SE_Hint);
				iHintState = HS_HINT;
			}
			fHintTime += deltaTime;
			break;
		case HS_HINT:
			if(bHintInit == true || bRainbowSelect == true) {
				bHintInit = false;
				fHintTime = 0;
				iHintState = HS_TIME_CHECK;
				for(var i=0;i<spine_hint_eff.length;++i)
					spine_hint_eff[i].visible = false;
				if(tweenHint != undefined)
					tweenHint.kill();
				tweenBlock.SetPosition(START_X + (tweenBlock.ix*TILE_SIZE_X), START_Y + (tweenBlock.iy*TILE_SIZE_Y));
			}
			break;
	}
}

function CheckHint()
{
	var i=0;
	var y=0;
	var x=0;
	var type=0;
	var block = [];

	for(i=0;i<kBlock.length;++i)
	{
		if(kBlock[i].type < BT_NEKO_MAX && kBlock[i].type2 == BT_ITEM_NONE && BG_Map[kBlock[i].iy][kBlock[i].ix].itemType != ITEM13)
		{
			y = kBlock[i].iy;
			x = kBlock[i].ix;
			type = kBlock[i].type;
			tweenBlock = kBlock[i];
			if(BLOCK_Map[y-1][x] != undefined && BLOCK_Map[y-1][x].touch == true){// 위로 이동할수 있다면
				if(IsTypeMatch(y-1, x-1, type)) {
					if(IsTypeMatch(y-1, x-2, type)) // 좌 2개
					{
						if(IsTypeMatch(y-1, x+1, type)) // 좌2, 우1 : 총 4
						{
							if(IsTypeMatch(y-1, x+2, type)) // 좌2, 우2 : 총 5
							{
								block[0] = BLOCK_Map[y-1][x];
								block[1] = BLOCK_Map[y-1][x-1];
								block[2] = BLOCK_Map[y-1][x-2];
								block[3] = BLOCK_Map[y-1][x+1];
								block[4] = BLOCK_Map[y-1][x+2];
								tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
								break;
							}
							block[0] = BLOCK_Map[y-1][x];
							block[1] = BLOCK_Map[y-1][x-1];
							block[2] = BLOCK_Map[y-1][x-2];
							block[3] = BLOCK_Map[y-1][x+1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y-1][x];
						block[1] = BLOCK_Map[y-1][x-1];
						block[2] = BLOCK_Map[y-1][x-2];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y-1, x+1, type)) // 좌1, 우1
					{
						if(IsTypeMatch(y-1, x+2, type)) // 좌1, 우2
						{
							block[0] = BLOCK_Map[y-1][x];
							block[1] = BLOCK_Map[y-1][x-1];
							block[2] = BLOCK_Map[y-1][x+1];
							block[3] = BLOCK_Map[y-1][x+2];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y-1][x];
						block[1] = BLOCK_Map[y-1][x-1];
						block[2] = BLOCK_Map[y-1][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
						break;
					}
				}
				if(IsTypeMatch(y-1, x+1, type) && IsTypeMatch(y-1, x+2, type)) // 우 2개
				{
					block[0] = BLOCK_Map[y-1][x];
					block[1] = BLOCK_Map[y-1][x+1];
					block[2] = BLOCK_Map[y-1][x+2];
					tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
					break;
				}
				if(IsTypeMatch(y-2, x, type)){
					if(IsTypeMatch(y-3, x, type))	// 위 2개
					{
						if(IsTypeMatch(y-1, x-1, type) && IsTypeMatch(y-1, x-2, type)) // ┘ 모양
						{
							block[0] = BLOCK_Map[y-1][x];
							block[1] = BLOCK_Map[y-2][x];
							block[2] = BLOCK_Map[y-3][x];
							block[3] = BLOCK_Map[y-1][x-1];
							block[4] = BLOCK_Map[y-1][x-2];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
							break;
						}
						if(IsTypeMatch(y-1, x+1, type) && IsTypeMatch(y-1, x+2, type)) // ㄴ 모양
						{
							block[0] = BLOCK_Map[y-1][x];
							block[1] = BLOCK_Map[y-2][x];
							block[2] = BLOCK_Map[y-3][x];
							block[3] = BLOCK_Map[y-1][x+1];
							block[4] = BLOCK_Map[y-1][x+2];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y-1][x];
						block[1] = BLOCK_Map[y-2][x];
						block[2] = BLOCK_Map[y-3][x];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
						break;
					}

					if(IsTypeMatch(y-2, x-1, type) && IsTypeMatch(y-1, x-1, type)) // 왼쪽 사각형.
					{
						block[0] = BLOCK_Map[y-1][x];
						block[1] = BLOCK_Map[y-2][x];
						block[2] = BLOCK_Map[y-2][x-1];
						block[3] = BLOCK_Map[y-1][x-1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y-2, x+1, type) && IsTypeMatch(y-1, x+1, type)) // 오른쪽 사각형.
					{
						block[0] = BLOCK_Map[y-1][x];
						block[1] = BLOCK_Map[y-2][x];
						block[2] = BLOCK_Map[y-2][x+1];
						block[3] = BLOCK_Map[y-1][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y - 10, ease:Power0.easeNone});
						break;
					}
				}
			}


			if(BLOCK_Map[y+1][x] != undefined && BLOCK_Map[y+1][x].touch == true){// 아래로 이동할수 있다면
				if(IsTypeMatch(y+1, x-1, type)) {
					if(IsTypeMatch(y+1, x-2, type)) // 좌 2개
					{
						if(IsTypeMatch(y+1, x+1, type)) // 좌2, 우1 : 총 4
						{
							if(IsTypeMatch(y+1, x+2, type)) // 좌2, 우2 : 총 5
							{
								block[0] = BLOCK_Map[y+1][x];
								block[1] = BLOCK_Map[y+1][x-1];
								block[2] = BLOCK_Map[y+1][x-2];
								block[3] = BLOCK_Map[y+1][x+1];
								block[4] = BLOCK_Map[y+1][x+2];
								tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
								break;
							}
							block[0] = BLOCK_Map[y+1][x];
							block[1] = BLOCK_Map[y+1][x-1];
							block[2] = BLOCK_Map[y+1][x-2];
							block[3] = BLOCK_Map[y+1][x+1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y+1][x];
						block[1] = BLOCK_Map[y+1][x-1];
						block[2] = BLOCK_Map[y+1][x-2];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y+1, x+1, type)) // 좌1, 우1
					{
						if(IsTypeMatch(y+1, x+2, type)) // 좌1, 우2
						{
							block[0] = BLOCK_Map[y+1][x];
							block[1] = BLOCK_Map[y+1][x-1];
							block[2] = BLOCK_Map[y+1][x+1];
							block[3] = BLOCK_Map[y+1][x+2];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y+1][x];
						block[1] = BLOCK_Map[y+1][x-1];
						block[2] = BLOCK_Map[y+1][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
						break;
					}
				}

				if(IsTypeMatch(y+1, x+1, type) && IsTypeMatch(y+1, x+2, type)) // 우 2개
				{
					block[0] = BLOCK_Map[y+1][x];
					block[1] = BLOCK_Map[y+1][x+1];
					block[2] = BLOCK_Map[y+1][x+2];
					tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
					break;
				}

				if(IsTypeMatch(y+2, x, type)){
					if(IsTypeMatch(y+3, x, type))	// 아래 2개
					{
						if(IsTypeMatch(y+1, x-1, type) && IsTypeMatch(y+1, x-2, type)) // ㄱ 모양
						{
							block[0] = BLOCK_Map[y+1][x];
							block[1] = BLOCK_Map[y+2][x];
							block[2] = BLOCK_Map[y+3][x];
							block[3] = BLOCK_Map[y+1][x-1];
							block[4] = BLOCK_Map[y+1][x-2];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
							break;
						}
						if(IsTypeMatch(y+1, x+1, type) && IsTypeMatch(y+1, x+2, type)) //  모양
						{
							block[0] = BLOCK_Map[y+1][x];
							block[1] = BLOCK_Map[y+2][x];
							block[2] = BLOCK_Map[y+3][x];
							block[3] = BLOCK_Map[y+1][x+1];
							block[4] = BLOCK_Map[y+1][x+2];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y+1][x];
						block[1] = BLOCK_Map[y+2][x];
						block[2] = BLOCK_Map[y+3][x];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
						break;
					}

					if(IsTypeMatch(y+2, x-1, type) && IsTypeMatch(y+1, x-1, type)) // 왼쪽 사각형.
					{
						block[0] = BLOCK_Map[y+1][x];
						block[1] = BLOCK_Map[y+2][x];
						block[2] = BLOCK_Map[y+2][x-1];
						block[3] = BLOCK_Map[y+1][x-1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y+2, x+1, type) && IsTypeMatch(y+1, x+1, type)) // 오른쪽 사각형.
					{
						block[0] = BLOCK_Map[y+1][x];
						block[1] = BLOCK_Map[y+2][x];
						block[2] = BLOCK_Map[y+2][x+1];
						block[3] = BLOCK_Map[y+1][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {y:kBlock[i].y}, {yoyo:true, repeat:-1, y:kBlock[i].y + 10, ease:Power0.easeNone});
						break;
					}
				}
			}


			if(BLOCK_Map[y][x-1] != undefined && BLOCK_Map[y][x-1].touch == true){ // 왼쪽으로 이동할수 있다면
				if(IsTypeMatch(y-1, x-1, type)) {
					if(IsTypeMatch(y-2, x-1, type)) // 좌 2개
					{
						if(IsTypeMatch(y+1, x-1, type)) // 좌2, 우1 : 총 4
						{
							if(IsTypeMatch(y+2, x-1, type)) // 좌2, 우2 : 총 5
							{
								block[0] = BLOCK_Map[y][x-1];
								block[1] = BLOCK_Map[y-1][x-1];
								block[2] = BLOCK_Map[y-2][x-1];
								block[3] = BLOCK_Map[y+1][x-1];
								block[4] = BLOCK_Map[y+2][x-1];
								tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
								break;
							}
							block[0] = BLOCK_Map[y][x-1];
							block[1] = BLOCK_Map[y-1][x-1];
							block[2] = BLOCK_Map[y-2][x-1];
							block[3] = BLOCK_Map[y+1][x-1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y][x-1];
						block[1] = BLOCK_Map[y-1][x-1];
						block[2] = BLOCK_Map[y-2][x-1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y+1, x-1, type)) // 좌1, 우1
					{
						if(IsTypeMatch(y+2, x-1, type)) // 좌1, 우2
						{
							block[0] = BLOCK_Map[y][x-1];
							block[1] = BLOCK_Map[y-1][x-1];
							block[2] = BLOCK_Map[y+1][x-1];
							block[3] = BLOCK_Map[y+2][x-1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y][x-1];
						block[1] = BLOCK_Map[y-1][x-1];
						block[2] = BLOCK_Map[y+1][x-1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
						break;
					}
				}
				if(IsTypeMatch(y+1, x-1, type) && IsTypeMatch(y+2, x-1, type)) // 우 2개
				{
					block[0] = BLOCK_Map[y][x-1];
					block[1] = BLOCK_Map[y+1][x-1];
					block[2] = BLOCK_Map[y+2][x-1];
					tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
					break;
				}

				if(IsTypeMatch(y, x-2, type)){
					if(IsTypeMatch(y, x-3, type))	// 왼쪽 2개
					{
						if(IsTypeMatch(y-1, x-1, type) && IsTypeMatch(y-2, x-1, type)) // ┘ 모양
						{
							block[0] = BLOCK_Map[y][x-1];
							block[1] = BLOCK_Map[y][x-2];
							block[2] = BLOCK_Map[y][x-3];
							block[3] = BLOCK_Map[y-1][x-1];
							block[4] = BLOCK_Map[y-2][x-1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
							break;
						}
						if(IsTypeMatch(y+1, x-1, type) && IsTypeMatch(y+2, x-1, type)) // ㄴ 모양
						{
							block[0] = BLOCK_Map[y][x-1];
							block[1] = BLOCK_Map[y][x-2];
							block[2] = BLOCK_Map[y][x-3];
							block[3] = BLOCK_Map[y+1][x-1];
							block[4] = BLOCK_Map[y+2][x-1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y][x-1];
						block[1] = BLOCK_Map[y][x-2];
						block[2] = BLOCK_Map[y][x-3];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
						break;
					}

					if(IsTypeMatch(y-1, x-2, type) && IsTypeMatch(y-1, x-1, type)) // 왼쪽 사각형.
					{
						block[0] = BLOCK_Map[y][x-1];
						block[1] = BLOCK_Map[y][x-2];
						block[2] = BLOCK_Map[y-1][x-2];
						block[3] = BLOCK_Map[y-1][x-1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y+1, x-2, type) && IsTypeMatch(y+1, x-1, type)) // 오른쪽 사각형.
					{
						block[0] = BLOCK_Map[y][x-1];
						block[1] = BLOCK_Map[y][x-2];
						block[2] = BLOCK_Map[y+1][x-2];
						block[3] = BLOCK_Map[y+1][x-1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x - 10, ease:Power0.easeNone});
						break;
					}
				}
			}


			if(BLOCK_Map[y][x+1] != undefined && BLOCK_Map[y][x+1].touch == true){ // 오른쪽으로 이동할수 있다면
				if(IsTypeMatch(y-1, x+1, type)) {
					if(IsTypeMatch(y-2, x+1, type)) // 좌 2개
					{
						if(IsTypeMatch(y+1, x+1, type)) // 좌2, 우1 : 총 4
						{
							if(IsTypeMatch(y+2, x+1, type)) // 좌2, 우2 : 총 5
							{
								block[0] = BLOCK_Map[y][x+1];
								block[1] = BLOCK_Map[y-1][x+1];
								block[2] = BLOCK_Map[y-2][x+1];
								block[3] = BLOCK_Map[y+1][x+1];
								block[4] = BLOCK_Map[y+2][x+1];
								tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
								break;
							}
							block[0] = BLOCK_Map[y][x+1];
							block[1] = BLOCK_Map[y-1][x+1];
							block[2] = BLOCK_Map[y-2][x+1];
							block[3] = BLOCK_Map[y+1][x+1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y][x+1];
						block[1] = BLOCK_Map[y-1][x+1];
						block[2] = BLOCK_Map[y-2][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y+1, x+1, type)) // 좌1, 우1
					{
						if(IsTypeMatch(y+2, x+1, type)) // 좌1, 우2
						{
							block[0] = BLOCK_Map[y][x+1];
							block[1] = BLOCK_Map[y-1][x+1];
							block[2] = BLOCK_Map[y+1][x+1];
							block[3] = BLOCK_Map[y+2][x+1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y][x+1];
						block[1] = BLOCK_Map[y-1][x+1];
						block[2] = BLOCK_Map[y+1][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
						break;
					}
				}

				if(IsTypeMatch(y+1, x+1, type) && IsTypeMatch(y+2, x+1, type)) // 아래 2개
				{
					block[0] = BLOCK_Map[y][x+1];
					block[1] = BLOCK_Map[y+1][x+1];
					block[2] = BLOCK_Map[y+2][x+1];
					tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
					break;
				}

				if(IsTypeMatch(y, x+2, type)){
					if(IsTypeMatch(y, x+3, type))	// 왼쪽 2개
					{
						if(IsTypeMatch(y-1, x+1, type) && IsTypeMatch(y-2, x+1, type)) // ┘ 모양
						{
							block[0] = BLOCK_Map[y][x+1];
							block[1] = BLOCK_Map[y][x+2];
							block[2] = BLOCK_Map[y][x+3];
							block[3] = BLOCK_Map[y-1][x+1];
							block[4] = BLOCK_Map[y-2][x+1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
							break;
						}
						if(IsTypeMatch(y+1, x+1, type) && IsTypeMatch(y+2, x+1, type)) // ㄴ 모양
						{
							block[0] = BLOCK_Map[y][x+1];
							block[1] = BLOCK_Map[y][x+2];
							block[2] = BLOCK_Map[y][x+3];
							block[3] = BLOCK_Map[y+1][x+1];
							block[4] = BLOCK_Map[y+2][x+1];
							tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
							break;
						}
						block[0] = BLOCK_Map[y][x+1];
						block[1] = BLOCK_Map[y][x+2];
						block[2] = BLOCK_Map[y][x+3];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
						break;
					}

					if(IsTypeMatch(y-1, x+2, type) && IsTypeMatch(y-1, x+1, type)) // 왼쪽 사각형.
					{
						block[0] = BLOCK_Map[y][x+1];
						block[1] = BLOCK_Map[y][x+2];
						block[2] = BLOCK_Map[y-1][x+2];
						block[3] = BLOCK_Map[y-1][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
						break;
					}
					if(IsTypeMatch(y+1, x+2, type) && IsTypeMatch(y+1, x+1, type)) // 오른쪽 사각형.
					{
						block[0] = BLOCK_Map[y][x+1];
						block[1] = BLOCK_Map[y][x+2];
						block[2] = BLOCK_Map[y+1][x+2];
						block[3] = BLOCK_Map[y+1][x+1];
						tweenHint = TweenMax.fromTo(kBlock[i].sprMain, 0.5, {x:kBlock[i].x}, {yoyo:true, repeat:-1, x:kBlock[i].x + 10, ease:Power0.easeNone});
						break;
					}
				}
			}
		}
	}

	if(block.length == 0){
		for(i=0;i<kBlock.length;++i) {
			if (kBlock[i].type >= BT_ITEM_WIDTH && kBlock[i].type <= BT_ITEM_RAINBOW) {
				block[0] = kBlock[i];
				break;
			}
		}
	}

	for(i=0;i<block.length;++i)
	{
		spine_hint_eff[i].visible = true;
		spine_hint_eff[i].position.set(block[i].x, block[i].y);
	}
}

function SetScoreAni(px, py, score, type)
{
	iScore += score;
	txtScoreAni[iScoreAniCnt].visible = true;
	if(type < 1 || type > 5) type = 1;
	txtScoreAni[iScoreAniCnt]._font.name = "cat_block_"+type+"_number";
	txtScoreAni[iScoreAniCnt].text = score.toString();
	txtScoreAni[iScoreAniCnt].position.set(px, py-20);
	txtScoreAni[iScoreAniCnt].scale.set(0.5);
	txtScoreAni[iScoreAniCnt].alpha = 1;
	var timeline = new TimelineLite();
	timeline.append(new TweenMax(txtScoreAni[iScoreAniCnt], 0.15,
		{as:1, ease:Linear.easeNone}));
	timeline.append(new TweenMax(txtScoreAni[iScoreAniCnt], 0.15,
		{as:0.5, ease:Linear.easeNone}));
	timeline.append(new TweenMax(txtScoreAni[iScoreAniCnt], 0.2,
		{alpha:0.5, y:py-20-50, ease:Linear.easeNone, onComplete:cbTweenTargetOff}));

	if(++iScoreAniCnt >= iScoreAniMax)
		iScoreAniCnt = 0;
}

// 블럭 관리..
function UpdateBlock()
{
	if(kBlock.length == 0) return;
	if(bBlockMove == false) return;

	bHintInit = true;
	bBlockMove = false;
	if(bBlockSort == true)
	{
		bBlockSort = false;
		kBlock.sort(function(a,b){return a.iy-b.iy;});	// 하단부터 검색하기 위해서 소팅한다.
	}

	for(var i=kBlock.length-1;i>=0;--i)
	{
		kBlock[i].Update();
		switch(kBlock[i].state)
		{
		case BS_NONE:
		case BS_MOVE_DOWN_CENTER:
		case BS_MOVE_DOWN_LEFT:
		case BS_MOVE_DOWN_RIGHT:
			if(iHeroState > 0 && gameState == STATE_GAME_PLAY) break;
			if(kBlock[i].move == false)	break;
			if(kBlock[i].state != BS_NONE) bBlockMove = true;	// 블럭이 움직이고 잇는지 체크.
			if(kBlock[i].y >= START_Y + (kBlock[i].iy*TILE_SIZE_Y))
			{
				if(BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix] === undefined
						&& BG_Map[kBlock[i].iy + 1][kBlock[i].ix].mapType == CC)
				{
					// DOWN_CENTER
					CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix] = MOVE_NONE;
					BLOCK_Map[kBlock[i].iy][kBlock[i].ix] = undefined;
					CHECK_MOVE_Map[kBlock[i].iy + 1][kBlock[i].ix] = MOVE_ING;
					BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix] = kBlock[i];
					kBlock[i].iy = kBlock[i].iy + 1;
					if(kBlock[i].state == BS_NONE)
					{
						kBlock[i].speed = BLOCK_START_SPEED;
						kBlock[i].gravity = 1;
					}
					kBlock[i].state = BS_MOVE_DOWN_CENTER;
					kBlock[i].sprMain.scale.set(0.9, 1.1);
					kBlock[i].sprMain.rotation = 0;
					bBlockMove = true;
					bBlockSort = true;
				}
				else if(BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix - 1] === undefined
						&& BG_Map[kBlock[i].iy + 1][kBlock[i].ix - 1].mapType == CC)
				{
					for(var k=kBlock[i].iy;k>=0;--k)
					{
						if(BG_Map[k][kBlock[i].ix-1].bCB == true)
						{
							kBlock[i].state = BS_NONE;
							kBlock[i].sprMain.scale.set(1);
							kBlock[i].sprMain.rotation = 0;
							kBlock[i].SetPosition(START_X + (kBlock[i].ix*TILE_SIZE_X), START_Y + (kBlock[i].iy*TILE_SIZE_Y));
							break;
						}
						if(BLOCK_Map[k][kBlock[i].ix-1] === undefined) {
							if(k == 0 || BG_Map[k][kBlock[i].ix-1].mapType == SP){
								// DOWN_LEFT
								CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix] = MOVE_NONE;
								BLOCK_Map[kBlock[i].iy][kBlock[i].ix] = undefined;
								CHECK_MOVE_Map[kBlock[i].iy + 1][kBlock[i].ix - 1] = MOVE_ING;
								BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix - 1] = kBlock[i];
								kBlock[i].iy = kBlock[i].iy + 1;
								kBlock[i].ix = kBlock[i].ix - 1;
								if(kBlock[i].state == BS_NONE)
								{
									kBlock[i].speed = BLOCK_START_SPEED;
									kBlock[i].gravity = 1;
								}
								kBlock[i].state = BS_MOVE_DOWN_LEFT;
								kBlock[i].sprMain.scale.set(0.9, 1.1);
								kBlock[i].sprMain.rotation = 7;
								bBlockMove = true;
								bBlockSort = true;
								break;
							}
							else
								continue;
						}
						if(BLOCK_Map[k][kBlock[i].ix-1].move == true)
						{
							kBlock[i].state = BS_NONE;
							kBlock[i].sprMain.scale.set(1);
							kBlock[i].sprMain.rotation = 0;
							kBlock[i].SetPosition(START_X + (kBlock[i].ix*TILE_SIZE_X), START_Y + (kBlock[i].iy*TILE_SIZE_Y));
							break;
						}
						if(BLOCK_Map[k][kBlock[i].ix-1].move == false)
						{
							// DOWN_LEFT
							CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix] = MOVE_NONE;
							BLOCK_Map[kBlock[i].iy][kBlock[i].ix] = undefined;
							CHECK_MOVE_Map[kBlock[i].iy + 1][kBlock[i].ix - 1] = MOVE_ING;
							BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix - 1] = kBlock[i];
							kBlock[i].iy = kBlock[i].iy + 1;
							kBlock[i].ix = kBlock[i].ix - 1;
							if(kBlock[i].state == BS_NONE)
							{
								kBlock[i].speed = BLOCK_START_SPEED;
								kBlock[i].gravity = 1;
							}
							kBlock[i].state = BS_MOVE_DOWN_LEFT;
							kBlock[i].sprMain.scale.set(0.9, 1.1);
							kBlock[i].sprMain.rotation = 7;
							bBlockMove = true;
							bBlockSort = true;
							break;
						}
					}
				}
				else if(BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix + 1] === undefined
						&& BG_Map[kBlock[i].iy + 1][kBlock[i].ix + 1].mapType == CC)
				{
					for(var k=kBlock[i].iy;k>=0;--k)
					{
						if(BG_Map[k][kBlock[i].ix+1].bCB == true)
						{
							kBlock[i].state = BS_NONE;
							kBlock[i].sprMain.scale.set(1);
							kBlock[i].sprMain.rotation = 0;
							kBlock[i].SetPosition(START_X + (kBlock[i].ix*TILE_SIZE_X), START_Y + (kBlock[i].iy*TILE_SIZE_Y));
							break;
						}
						if(BLOCK_Map[k][kBlock[i].ix+1] === undefined){
							if(k == 0 || BG_Map[k][kBlock[i].ix+1].mapType == SP){
								// DOWN_RIGHT
								CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix] = MOVE_NONE;
								BLOCK_Map[kBlock[i].iy][kBlock[i].ix] = undefined;
								CHECK_MOVE_Map[kBlock[i].iy + 1][kBlock[i].ix + 1] = MOVE_ING;
								BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix + 1] = kBlock[i];
								kBlock[i].iy = kBlock[i].iy + 1;
								kBlock[i].ix = kBlock[i].ix + 1;
								if(kBlock[i].state == BS_NONE)
								{
									kBlock[i].speed = BLOCK_START_SPEED;
									kBlock[i].gravity = 1;
								}
								kBlock[i].state = BS_MOVE_DOWN_RIGHT;
								kBlock[i].sprMain.scale.set(0.9, 1.1);
								kBlock[i].sprMain.rotation = 12;
								bBlockMove = true;
								bBlockSort = true;
								break;
							}
							else
								continue;
						}
						if(BLOCK_Map[k][kBlock[i].ix+1].move == true)
						{
							kBlock[i].state = BS_NONE;
							kBlock[i].sprMain.scale.set(1);
							kBlock[i].sprMain.rotation = 0;
							kBlock[i].SetPosition(START_X + (kBlock[i].ix*TILE_SIZE_X), START_Y + (kBlock[i].iy*TILE_SIZE_Y));
							break;
						}
						if(BLOCK_Map[k][kBlock[i].ix+1].move == false)
						{
							// DOWN_RIGHT
							CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix] = MOVE_NONE;
							BLOCK_Map[kBlock[i].iy][kBlock[i].ix] = undefined;
							CHECK_MOVE_Map[kBlock[i].iy + 1][kBlock[i].ix + 1] = MOVE_ING;
							BLOCK_Map[kBlock[i].iy + 1][kBlock[i].ix + 1] = kBlock[i];
							kBlock[i].iy = kBlock[i].iy + 1;
							kBlock[i].ix = kBlock[i].ix + 1;
							if(kBlock[i].state == BS_NONE)
							{
								kBlock[i].speed = BLOCK_START_SPEED;
								kBlock[i].gravity = 1;
							}
							kBlock[i].state = BS_MOVE_DOWN_RIGHT;
							kBlock[i].sprMain.scale.set(0.9, 1.1);
							kBlock[i].sprMain.rotation = 12;
							bBlockMove = true;
							bBlockSort = true;
							break;
						}
					}
				}
				else if(kBlock[i].state != BS_NONE)
				{
					kBlock[i].state = BS_MOVE_DOWN_BOUNCE_SET;
					kBlock[i].sprMain.scale.set(1);
					kBlock[i].sprMain.rotation = 0;
					kBlock[i].SetPosition(START_X + (kBlock[i].ix*TILE_SIZE_X), START_Y + (kBlock[i].iy*TILE_SIZE_Y));
				}
			}
			break;
		case BS_MOVE_LEFT:
			bBlockMove = true;
			if(kBlock[i].x <= START_X + ((kBlock[i].ix-1)*TILE_SIZE_X))
			{
				BLOCK_Map[kBlock[i].iy][kBlock[i].ix-1] = kBlock[i];
				CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix-1] = MOVE_ING;
				kBlock[i].state = BS_NONE;
				kBlock[i].ix = kBlock[i].ix - 1;
				kBlock[i].SetPosition(START_X + (kBlock[i].ix*TILE_SIZE_X), kBlock[i].y);
				if(iHeroState == 1){
					iHeroState = 2;
					iRoadNum--;
					txtRoadNum.text = GetString("Turn", iRoadNum);
				}
			}
			break;
		case BS_MOVE_RIGHT:
			bBlockMove = true;
			if(kBlock[i].x >= START_X + ((kBlock[i].ix+1)*TILE_SIZE_X))
			{
				BLOCK_Map[kBlock[i].iy][kBlock[i].ix+1] = kBlock[i];
				CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix+1] = MOVE_ING;
				kBlock[i].state = BS_NONE;
				kBlock[i].ix = kBlock[i].ix + 1;
				kBlock[i].SetPosition(START_X + (kBlock[i].ix*TILE_SIZE_X), kBlock[i].y);
				if(iHeroState == 1){
					iHeroState = 2;
					iRoadNum--;
					txtRoadNum.text = GetString("Turn", iRoadNum);
				}
			}
			break;
		case BS_MOVE_TOP:
			bBlockMove = true;
			if(kBlock[i].y <= START_Y + ((kBlock[i].iy-1)*TILE_SIZE_Y))
			{
				bBlockSort = true;
				BLOCK_Map[kBlock[i].iy-1][kBlock[i].ix] = kBlock[i];
				CHECK_MOVE_Map[kBlock[i].iy-1][kBlock[i].ix] = MOVE_ING;
				kBlock[i].state = BS_NONE;
				kBlock[i].iy = kBlock[i].iy - 1;
				kBlock[i].SetPosition(kBlock[i].x, START_Y + (kBlock[i].iy*TILE_SIZE_Y));
				if(iHeroState == 1){
					iHeroState = 2;
					iRoadNum--;
					txtRoadNum.text = GetString("Turn", iRoadNum);
				}
			}
			break;
		case BS_MOVE_BOTTOM:
			bBlockMove = true;
			if(kBlock[i].y >= START_Y + ((kBlock[i].iy+1)*TILE_SIZE_Y))
			{
				bBlockSort = true;
				BLOCK_Map[kBlock[i].iy+1][kBlock[i].ix] = kBlock[i];
				CHECK_MOVE_Map[kBlock[i].iy+1][kBlock[i].ix] = MOVE_ING;
				kBlock[i].state = BS_NONE;
				kBlock[i].iy = kBlock[i].iy + 1;
				kBlock[i].SetPosition(kBlock[i].x, START_Y + (kBlock[i].iy*TILE_SIZE_Y));
				if(iHeroState == 1){
					iHeroState = 2;
					iRoadNum--;
					txtRoadNum.text = GetString("Turn", iRoadNum);
				}
			}
			break;
		case BS_MOVE_LEFT2:
		case BS_MOVE_RIGHT2:
		case BS_MOVE_TOP2:
		case BS_MOVE_BOTTOM2:
		case BS_MOVE_DOWN_BOUNCE_SET:
		case BS_MOVE_DOWN_BOUNCE:
		case BS_BOMB_SET:
		case BS_BOMB_ING:
		case BS_ITEM_BOMB_SET:
		case BS_ITEM_BOMB_ING:
			bBlockMove = true;
			break;
		case BS_BOMB_END:
			// 블럭을 없애버린다.
			bBlockMove = true;
			bBlockSort = true;
			CHECK_MOVE_Map[kBlock[i].iy][kBlock[i].ix] = MOVE_NONE;
			BLOCK_Map[kBlock[i].iy][kBlock[i].ix] = undefined;
			kBlockDeck.push(kBlock.slice(i, i+1)[0]);	// 데크에 포인터를 옮기고..
			kBlockDeck[kBlockDeck.length-1].SetVisible(false);
			kBlock.splice(i, 1);	// kBlock에서는 삭제한다.
			UpdateBlockIndex();
			break;
		}
	}

	if(bBlockMove == false)
	{
		CHECK_BOMB_Map_Init();
		if(iDragDirection == -1)	// 영웅이 움직일수 있는지 체크한다.
			CheckMoveHero();

		if(iHeroState == 2)	// 주인공이 움직임을 다 했을경우..
		{
			iHeroMoveCnt = 0;
			if(iHeroIndex < tRoad.length-2)
			{
				iHeroState = 0;
				kHero.spine_Hero.state.timeScale = 1;
				SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_idle_1", 1, true);
			}
			else
			{
				if(gameState == STATE_GAME_PLAY){
				//	if(sprTutoBox2.visible == true)
				//		sprTutoBox2.visible = false;
					gameState = STATE_GAME_CLEAR_STEP0;	// 게임클리어 처리..
					kHero.spine_Hero.state.timeScale = 1;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_goal", 0, true);
				}
				else if(gameState == STATE_GAME_CLEAR_STEP2)
				{
					if(CheckBlock() == false) {
						if (iTurnNum > 0)
							gameState = STATE_GAME_CLEAR_STEP3;
						else
							gameState = STATE_GAME_CLEAR_STEP4;
					}
				}
				return;
			}

			bBlockMove = true;
			return;
		}

		if(iHeroState == 0)
		{
			if(CheckBlock() == false)
			{
				// 콤보처리..
				if(iComboCnt >= 7) {
					SESoundPlay(SE_Excellent);
					SpinePlay(spine_combo_ani, undefined, undefined, "excellent_ani", 1, false);
				}
				else if(iComboCnt >= 5) {
					SESoundPlay(SE_Great);
					SpinePlay(spine_combo_ani, undefined, undefined, "great_ani", 1, false);
				}
				else if(iComboCnt >= 3) {
					SESoundPlay(SE_Good);
					SpinePlay(spine_combo_ani, undefined, undefined, "good_ani", 1, false);
				}
				iComboCnt = 0;

				if(iDragDirection >= 0)
				{
					SESoundPlay(SE_PuzzleNotMatch);
					switch(iDragDirection)
					{
						case D_LEFT:
							bBlockMove = true;
							BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_RIGHT;
							BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_LEFT;
							break;
						case D_RIGHT:
							bBlockMove = true;
							BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_LEFT;
							BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_RIGHT;
							break;
						case D_TOP:
							bBlockMove = true;
							BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_BOTTOM;
							BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_TOP;
							break;
						case D_BOTTOM:
							bBlockMove = true;
							BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_TOP;
							BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_BOTTOM;
							break;
					}
				}else if(iTurnNum == 0){
					gameState = STATE_GAME_OVER_SET;
				}else{	// 여기에서 맞을 블럭이 있는지 체크한다.
					if(CheckMatchBlock() == false){
						sShufflePopup.visible = true;
						sShufflePopup.alpha = 0;
						TweenLite.to(sShufflePopup, 0.5, {alpha:1, ease:Power0.easeNone, onComplete:cbTweenSufflePopup});
					}
				}
			}
			else
			{
				if(iDragDirection >= 0)	// 블럭을 이동시키면 턴을 감소시킨다.
					SetTurnAdd(-1);

				iComboCnt++;
			//	SetComboAni(iComboCnt)
			}
			iDragDirection = -1;
		}
	}
}

function IsTypeMatch(y, x, type)
{
	if(y < 0 || x < 0 || y >= MAX_TILE_Y || x >= MAX_TILE_X)
		return false;

	return BLOCK_Map[y][x] != undefined && type == BLOCK_Map[y][x].type;
}

// 블럭이 매치 되는치 확인한다.
function CheckMatchBlock()
{
	var i=0;
	var y=0;
	var x=0;
	var type=0;

	// 아이템이 있는지 검사.
	for(i=0;i<kBlock.length;++i){
		if(kBlock[i].type >= BT_ITEM_WIDTH && kBlock[i].type <= BT_ITEM_RAINBOW)
			return true;
	}

	for(i=0;i<kBlock.length;++i)
	{
		if(kBlock[i].type < BT_NEKO_MAX && kBlock[i].type2 == BT_ITEM_NONE)
		{
			y = kBlock[i].iy;
			x = kBlock[i].ix;
			type = kBlock[i].type;
			if(BLOCK_Map[y-1][x] != undefined && BLOCK_Map[y-1][x].touch == true){// 위로 이동할수 있다면
				if(IsTypeMatch(y-2, x, type)){
					if(IsTypeMatch(y-3, x, type))	// 위 2개
						return true;
					if(IsTypeMatch(y-2, x-1, type) && IsTypeMatch(y-1, x-1, type)) // 왼쪽 사각형.
						return true;
					if(IsTypeMatch(y-2, x+1, type) && IsTypeMatch(y-1, x+1, type)) // 오른쪽 사각형.
						return true;
				}
				if(IsTypeMatch(y-1, x-1, type)) {
					if(IsTypeMatch(y-1, x-2, type)) // 좌 2개
						return true;
					if(IsTypeMatch(y-1, x+1, type)) // 좌우 1개
						return true;
				}
				if(IsTypeMatch(y-1, x+1, type) && IsTypeMatch(y-1, x+2, type)) // 우 2개
					return true;
			}
			if(BLOCK_Map[y+1][x] != undefined && BLOCK_Map[y+1][x].touch == true){// 아래로 이동할수 있다면
				if(IsTypeMatch(y+2, x, type)){
					if(IsTypeMatch(y+3, x, type))	// 아래 2개
						return true;
					if(IsTypeMatch(y+2, x-1, type) && IsTypeMatch(y+1, x-1, type)) // 왼쪽 사각형.
						return true;
					if(IsTypeMatch(y+2, x+1, type) && IsTypeMatch(y+1, x+1, type)) // 오른쪽 사각형.
						return true;
				}
				if(IsTypeMatch(y+1, x-1, type)) {
					if(IsTypeMatch(y+1, x-2, type)) // 좌 2개
						return true;
					if(IsTypeMatch(y+1, x+1, type)) // 좌우 1개
						return true;
				}
				if(IsTypeMatch(y+1, x+1, type) && IsTypeMatch(y+1, x+2, type)) // 우 2개
					return true;
			}
			if(BLOCK_Map[y][x-1] != undefined && BLOCK_Map[y][x-1].touch == true){// 좌로 이동할수 있다면.
				if(IsTypeMatch(y, x-2, type)){
					if(IsTypeMatch(y, x-3, type))	// 좌 2개
						return true;
					if(IsTypeMatch(y-1, x-1, type) && IsTypeMatch(y-1, x-2, type)) // 위 사각형.
						return true;
					if(IsTypeMatch(y+1, x-1, type) && IsTypeMatch(y+1, x-2, type)) // 아래사각형.
						return true;
				}
				if(IsTypeMatch(y-1, x-1, type)){
					if(IsTypeMatch(y-2, x-1, type)) // 위 2개.
						return true;
					if(IsTypeMatch(y+1, x-1, type)) // 위아래 1개.
						return true;
				}
				if(IsTypeMatch(y+1, x-1, type) && IsTypeMatch(y+2, x-1, type)) // 아래 2개
					return true;
			}
			if(BLOCK_Map[y][x+1] != undefined && BLOCK_Map[y][x+1].touch == true){// 우로 이동할수 있다면.
				if(IsTypeMatch(y, x+2, type)){
					if(IsTypeMatch(y, x+3, type))	// 좌 2개
						return true;
					if(IsTypeMatch(y-1, x+1, type) && IsTypeMatch(y-1, x+2, type)) // 위 사각형.
						return true;
					if(IsTypeMatch(y+1, x+1, type) && IsTypeMatch(y+1, x+2, type)) // 아래사각형.
						return true;
				}
				if(IsTypeMatch(y-1, x+1, type)){
					if(IsTypeMatch(y-2, x+1, type)) // 위 2개.
						return true;
					if(IsTypeMatch(y+1, x+1, type)) // 위아래 1개.
						return true;
				}
				if(IsTypeMatch(y+1, x+1, type) && IsTypeMatch(y+2, x+1, type)) // 아래 2개
					return true;
			}
		}
	}
	return false;
}

// 두번 들어오는지 체크.
var iHeroMoveCnt = 0;
function CheckMoveHero()
{
	if(iHeroIndex < tRoad.length - 1)
	{
		var iHI = iHeroIndex + 1;

		// 다음에 가야 할곳에 블럭이 없을경우
		if(BG_Map[tRoad[iHI].y][tRoad[iHI].x].itemType == ITEM0)
		{
			// 캐릭을 움직인다.
			var yy = 0;
			var xx = 0;

			if(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x] === undefined)
			{
				yy = tRoad[iHeroIndex].y - tRoad[iHI].y;
				xx = tRoad[iHeroIndex].x - tRoad[iHI].x;
				iHeroState = 1;
				bBlockMove = true;
				bHeroMoveUnBlock = true;
				if(yy==0 && xx==-1)	// 오른쪽이동
				{
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_RIGHT2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_side_right", 0, true);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{x:START_X + (tRoad[iHI].x*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveRight2.bind(kHero)}));
				}
				else if(yy==0 && xx==1)
				{
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_LEFT2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_side_left", 0, true);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{x:START_X + (tRoad[iHI].x*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveLeft2.bind(kHero)}));
				}
				else if(yy==1 && xx==0)
				{
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_TOP2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_back", 0, true);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{y:START_Y + (tRoad[iHI].y*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveTop2.bind(kHero)}));
				}
				else
				{
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_BOTTOM2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_front", 0, true);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{y:START_Y + (tRoad[iHI].y*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveBottom2.bind(kHero)}));
				}
				SESoundPlay(SE_PlayerMove);
				iHeroMoveCnt++;
				iHeroIndex++;
			}
			else if(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].type == BT_ITEM3)
			{
				SESoundPlay(SE_Obstacle_Bush);
				yy = tRoad[iHeroIndex].y - tRoad[iHI].y;
				xx = tRoad[iHeroIndex].x - tRoad[iHI].x;
				iHeroState = 1;
				bBlockMove = true;
				if(yy==0 && xx==-1)	// 오른쪽이동
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_BOMB_SET;
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_RIGHT2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_side_right", 0, false);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{x:START_X + ((BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].ix)*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveRight2.bind(kHero)}));
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x] = undefined;
				}
				else if(yy==0 && xx==1)
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_BOMB_SET;
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_LEFT2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_side_left", 0, false);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{x:START_X + (BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].ix*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveLeft2.bind(kHero)}));
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x] = undefined;
				}
				else if(yy==1 && xx==0)
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_BOMB_SET;
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_TOP2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_back", 0, false);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{y:START_Y + (BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].iy*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveTop2.bind(kHero)}));
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x] = undefined;
				}
				else
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_BOMB_SET;
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_BOTTOM2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_front", 0, false);
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x] = undefined;
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{y:START_Y + (BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].iy*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveBottom2.bind(kHero)}));
				}
				SESoundPlay(SE_PlayerMove);
				iHeroMoveCnt++;
				iHeroIndex++;
			}
			else if(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].type <= BT_ITEM_RAINBOW
					&& BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].type2 == BT_ITEM_NONE)
			{
				yy = tRoad[iHeroIndex].y - tRoad[iHI].y;
				xx = tRoad[iHeroIndex].x - tRoad[iHI].x;
				iHeroState = 1;
				bBlockMove = true;
				if(yy==0 && xx==-1)	// 오른쪽이동
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_MOVE_LEFT2;
					TweenMax.to(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].sprMain, 0.6667/1.5,
						{x:START_X + ((BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].ix-1)*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveLeft2.bind(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x])});
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_RIGHT2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_side_right", 0, false);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{x:START_X + ((BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].ix)*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveRight2.bind(kHero)}));
				}
				else if(yy==0 && xx==1)
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_MOVE_RIGHT2;
					TweenMax.to(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].sprMain, 0.6667/1.5,
						{x:START_X + ((BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].ix+1)*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveRight2.bind(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x])});
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_LEFT2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_side_left", 0, false);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{x:START_X + (BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].ix*TILE_SIZE_X), ease:Linear.easeNone, onComplete:cbTweenMoveLeft2.bind(kHero)}));
				}
				else if(yy==1 && xx==0)
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_MOVE_BOTTOM2;
					TweenMax.to(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].sprMain, 0.6667/1.5,
						{y:START_Y + ((BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].iy+1)*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveBottom2.bind(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x])});
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_TOP2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_back", 0, false);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{y:START_Y + (BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].iy*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveTop2.bind(kHero)}));
				}
				else
				{
					BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].state = BS_MOVE_TOP2;
					TweenMax.to(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].sprMain, 0.6667/1.5,
						{y:START_Y + ((BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].iy-1)*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveTop2.bind(BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x])});
					BLOCK_Map[tRoad[iHeroIndex].y][tRoad[iHeroIndex].x].state = BS_MOVE_BOTTOM2;
					kHero.spine_Hero.state.timeScale = 1.5;
					SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_move_front", 0, false);
					var timeline = new TimelineLite();
					timeline.append(new TweenMax(kHero.sprMain, 0.1667/1.5,
						{alpha:1, ease:Linear.easeNone}));
					timeline.append(new TweenMax(kHero.sprMain, 0.5/1.5,
						{y:START_Y + (BLOCK_Map[tRoad[iHI].y][tRoad[iHI].x].iy*TILE_SIZE_Y), ease:Linear.easeNone, onComplete:cbTweenMoveBottom2.bind(kHero)}));
				}
				SESoundPlay(SE_PlayerMove);
				iHeroMoveCnt++;
				iHeroIndex++;
			}
		}
	}
}

function cbTweenMoveLeft2()
{
	bBlockMove = true;
	BLOCK_Map[this.iy][this.ix-1] = this;
	if(bHeroMoveUnBlock == true) {
		bHeroMoveUnBlock = false;
		BLOCK_Map[this.iy][this.ix] = undefined;
	}else {
		CHECK_MOVE_Map[this.iy][this.ix - 1] = MOVE_ING;
	}
	this.state = BS_NONE;
	this.ix = this.ix - 1;
	this.SetPosition(START_X + (this.ix*TILE_SIZE_X), this.y);
	if(iHeroState == 1){
		iHeroState = 2;
		iRoadNum--;
		txtRoadNum.text = GetString("Turn", iRoadNum);
	}
}

function cbTweenMoveRight2()
{
	bBlockMove = true;
	BLOCK_Map[this.iy][this.ix+1] = this;
	if(bHeroMoveUnBlock == true) {
		bHeroMoveUnBlock = false;
		BLOCK_Map[this.iy][this.ix] = undefined;
	}else {
		CHECK_MOVE_Map[this.iy][this.ix + 1] = MOVE_ING;
	}
	this.state = BS_NONE;
	this.ix = this.ix + 1;
	this.SetPosition(START_X + (this.ix*TILE_SIZE_X), this.y);
	if(iHeroState == 1){
		iHeroState = 2;
		iRoadNum--;
		txtRoadNum.text = GetString("Turn", iRoadNum);
	}
}

function cbTweenMoveTop2()
{
	bBlockMove = true;
	BLOCK_Map[this.iy-1][this.ix] = this;
	if(bHeroMoveUnBlock == true) {
		bHeroMoveUnBlock = false;
		BLOCK_Map[this.iy][this.ix] = undefined;
	}else {
		CHECK_MOVE_Map[this.iy - 1][this.ix] = MOVE_ING;
	}
	this.state = BS_NONE;
	this.iy = this.iy - 1;
	this.SetPosition(this.x, START_Y + (this.iy*TILE_SIZE_Y));
	if(iHeroState == 1){
		iHeroState = 2;
		iRoadNum--;
		txtRoadNum.text = GetString("Turn", iRoadNum);
	}
}

function cbTweenMoveBottom2()
{
	bBlockMove = true;
	BLOCK_Map[this.iy+1][this.ix] = this;
	if(bHeroMoveUnBlock == true) {
		bHeroMoveUnBlock = false;
		BLOCK_Map[this.iy][this.ix] = undefined;
	}else {
		CHECK_MOVE_Map[this.iy + 1][this.ix] = MOVE_ING;
	}
	this.state = BS_NONE;
	this.iy = this.iy + 1;
	this.SetPosition(this.x, START_Y + (this.iy*TILE_SIZE_Y));
	if(iHeroState == 1){
		iHeroState = 2;
		iRoadNum--;
		txtRoadNum.text = GetString("Turn", iRoadNum);
	}
};

// 블럭이 맵에 처음 배치될때 없어지지 않게 체크를 한번 해준다.
function CheckCreateBlock()
{
	var k = 0;
	var bOut = false;
	while(true)
	{
		bOut = true;
		for(var y=1;y<MAX_TILE_Y-1;++y)
		{
			for(var x=1;x<MAX_TILE_X-1;++x)
			{
				iLCC = 0;	// 좌검사
				iRCC = 0;	// 우검사
				iTCC = 0;	// 위검사
				iBCC = 0;	// 아래검사
				iBOX = 0;	// 박스가 되는지 검사..
				if(BLOCK_Map[y][x] != undefined && BLOCK_Map[y][x].type < BT_NEKO_MAX)
				{
					for(k=1;k<=2;++k)
					{
						if(x-k >= 1)
						{
							if(BLOCK_Map[y][x-k] != undefined && BLOCK_Map[y][x-k].type == BLOCK_Map[y][x].type)
								iLCC++;
							else
								break;
						}
					}
					if(iLCC >= 2)
					{
						bOut = false;
						BLOCK_Map[y][x-1].SetBlock((BLOCK_Map[y][x-1].type + 1) % tbBlockTypeMax[iStage]);
						continue;
					}
					for(k=1;k<=2;++k)
					{
						if(x+k <= MAX_TILE_X-1)
						{
							if(BLOCK_Map[y][x+k] != undefined && BLOCK_Map[y][x+k].type == BLOCK_Map[y][x].type)
								iRCC++;
							else
								break;
						}
					}
					if(iRCC >= 2)
					{
						bOut = false;
						BLOCK_Map[y][x+1].SetBlock((BLOCK_Map[y][x+1].type + 1) % tbBlockTypeMax[iStage]);
						continue;
					}
					for(k=1;k<=2;++k)
					{
						if(y-k >= 1)
						{
							if(BLOCK_Map[y-k][x] != undefined && BLOCK_Map[y-k][x].type == BLOCK_Map[y][x].type)
								iTCC++;
							else
								break;
						}
					}
					if(iTCC >= 2)
					{
						bOut = false;
						BLOCK_Map[y-1][x].SetBlock((BLOCK_Map[y-1][x].type + 1) % tbBlockTypeMax[iStage]);
						continue;
					}
					for(k=1;k<=2;++k)
					{
						if(y+k <= MAX_TILE_Y-1)
						{
							if(BLOCK_Map[y+k][x] != undefined && BLOCK_Map[y+k][x].type == BLOCK_Map[y][x].type)
								iBCC++;
							else
								break;
						}
					}
					if(iBCC >= 2)
					{
						bOut = false;
						BLOCK_Map[y+1][x].SetBlock((BLOCK_Map[y+1][x].type + 1) % tbBlockTypeMax[iStage]);
						continue;
					}

					if(BLOCK_Map[y][x+1] != undefined && BLOCK_Map[y][x+1].type == BLOCK_Map[y][x].type)
						iBOX++;
					if(BLOCK_Map[y+1][x] != undefined && BLOCK_Map[y+1][x].type == BLOCK_Map[y][x].type)
						iBOX++;
					if(BLOCK_Map[y+1][x+1] != undefined && BLOCK_Map[y+1][x+1].type == BLOCK_Map[y][x].type)
						iBOX++;
					if(iBOX >= 3)
					{
						bOut = false;
						BLOCK_Map[y][x].SetBlock((BLOCK_Map[y][x].type + 1) % tbBlockTypeMax[iStage]);
					//	continue;
					}
				}
			}
		}

		if(bOut == true) break;
	}
};

/**
 * @return {boolean}
 */
/*
function CheckBlock()
{
	var bCheck = false;
	var y;
	var x;
	var i = 0, k = 0;
	var listType = [];
	// 검색..
	for(y=0;y<MAX_TILE_Y;++y)
		for(x=0;x<MAX_TILE_X;++x)
			CHECK_Map[y][x] = -1;	// 초기화.

	for(y=1;y<MAX_TILE_Y-1;++y){
		for(x=1;x<MAX_TILE_X-1;++x){
			iLCC = 0;iRCC = 0;iTCC = 0;iBCC = 0;

			if(CHECK_MOVE_Map[y][x] == MOVE_ING && BLOCK_Map[y][x].type < BT_NEKO_MAX){
				CHECK_MOVE_Map[y][x] = MOVE_NONE;
				for(k=1;k<=2;++k){	// Left 검사
					if(x-k >= 1){
						if(BLOCK_Map[y][x-k] != undefined && BLOCK_Map[y][x-k].type == BLOCK_Map[y][x].type)
							iLCC++;
						else
							break;
					}
				}
				for(k=1;k<=2;++k){	// Right 검사
					if(x+k <= MAX_TILE_X-1){
						if(BLOCK_Map[y][x+k] != undefined && BLOCK_Map[y][x+k].type == BLOCK_Map[y][x].type)
							iRCC++;
						else
							break;
					}
				}
				for(k=1;k<=2;++k){	// Top 검사
					if(y-k >= 1){
						if(BLOCK_Map[y-k][x] != undefined && BLOCK_Map[y-k][x].type == BLOCK_Map[y][x].type)
							iTCC++;
						else
							break;
					}
				}
				for(k=1;k<=2;++k){	// Bottom 검사
					if(y+k <= MAX_TILE_Y-1){
						if(BLOCK_Map[y+k][x] != undefined && BLOCK_Map[y+k][x].type == BLOCK_Map[y][x].type)
							iBCC++;
						else
							break;
					}
				}

				if(iLCC + iRCC >= 2) {
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					for (i = 1; i <= iLCC; ++i)
						CHECK_Map[y][x - i] = BLOCK_Map[y][x].type;
					for (i = 1; i <= iRCC; ++i)
						CHECK_Map[y][x + i] = BLOCK_Map[y][x].type;
				}
				if(iTCC + iBCC >= 2) {
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					for (i = 1; i <= iTCC; ++i)
						CHECK_Map[y - i][x] = BLOCK_Map[y][x].type;
					for (i = 1; i <= iBCC; ++i)
						CHECK_Map[y + i][x] = BLOCK_Map[y][x].type;
				}
				// 사각형.
				if(iLCC == 1 && iTCC >= 1 && BLOCK_Map[y-1][x-1] != undefined && BLOCK_Map[y-1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y-1][x-1] = BLOCK_Map[y][x].type;
					CHECK_Map[y][x-1] = BLOCK_Map[y][x].type;
					for(i=1;i<=iTCC;++i)
						CHECK_Map[y - i][x] = BLOCK_Map[y][x].type;
				}
				else if(iLCC == 1 && iBCC >=1 && BLOCK_Map[y+1][x-1] != undefined && BLOCK_Map[y+1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y+1][x-1] = BLOCK_Map[y][x].type;
					CHECK_Map[y][x-1] = BLOCK_Map[y][x].type;
					for(i=1;i<=iBCC;++i)
						CHECK_Map[y + i][x] = BLOCK_Map[y][x].type;
				}
				else if(iRCC == 1 && iTCC >=1 && BLOCK_Map[y-1][x+1] != undefined && BLOCK_Map[y-1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y-1][x+1] = BLOCK_Map[y][x].type;
					CHECK_Map[y][x+1] = BLOCK_Map[y][x].type;
					for(i=1;i<=iTCC;++i)
						CHECK_Map[y - i][x] = BLOCK_Map[y][x].type;
				}
				else if(iRCC == 1 && iBCC >=1 && BLOCK_Map[y+1][x+1] != undefined && BLOCK_Map[y+1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y+1][x+1] = BLOCK_Map[y][x].type;
					CHECK_Map[y][x+1] = BLOCK_Map[y][x].type;
					for(i=1;i<=iBCC;++i)
						CHECK_Map[y + i][x] = BLOCK_Map[y][x].type;
				}
				else if(iTCC == 1 && iLCC >=1 && BLOCK_Map[y-1][x-1] != undefined && BLOCK_Map[y-1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y-1][x-1] = BLOCK_Map[y][x].type;
					CHECK_Map[y-1][x] = BLOCK_Map[y][x].type;
					for(i=1;i<=iLCC;++i)
						CHECK_Map[y][x-i] = BLOCK_Map[y][x].type;
				}
				else if(iTCC == 1 && iRCC >=1 && BLOCK_Map[y-1][x+1] != undefined && BLOCK_Map[y-1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y-1][x+1] = BLOCK_Map[y][x].type;
					CHECK_Map[y-1][x] = BLOCK_Map[y][x].type;
					for(i=1;i<=iRCC;++i)
						CHECK_Map[y][x+i] = BLOCK_Map[y][x].type;
				}
				else if(iBCC == 1 && iLCC >=1 && BLOCK_Map[y+1][x-1] != undefined && BLOCK_Map[y+1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y+1][x-1] = BLOCK_Map[y][x].type;
					CHECK_Map[y+1][x] = BLOCK_Map[y][x].type;
					for(i=1;i<=iLCC;++i)
						CHECK_Map[y][x-i] = BLOCK_Map[y][x].type;
				}
				else if(iBCC == 1 && iRCC >=1 && BLOCK_Map[y+1][x+1] != undefined && BLOCK_Map[y+1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					CHECK_Map[y][x] = BLOCK_Map[y][x].type;
					CHECK_Map[y+1][x+1] = BLOCK_Map[y][x].type;
					CHECK_Map[y+1][x] = BLOCK_Map[y][x].type;
					for(i=1;i<=iRCC;++i)
						CHECK_Map[y][x+i] = BLOCK_Map[y][x].type;
				}

				if(bCheck == true)
					listType.push(BLOCK_Map[y][x].type);
			}
		}
	}
	// 체크.
	iWC = 0;
	iHC = 0;
	for(y=1;y<MAX_TILE_Y-1;++y){
		for(x=1;x<MAX_TILE_X-1;++x){
			for(k=0;k<listType.length;++k){
				if(CHECK_Map[y][x] == listType[k]){
					iWC = 1;
					iHC = 1;
					CheckBlockType(y, x, listType[k]);

					if(iWC == 5 || iHC == 5)
						SetBombEx(BT_ITEM_RAINBOW);
					else if(iWC >= 3 && iHC >= 3)
						SetBombEx(BT_ITEM_CROSS);
					else if(iWC == 4)
						SetBombEx(BT_ITEM_HEIGHT);
					else if(iHC == 4)
						SetBombEx(BT_ITEM_WIDTH);
					else if(iWC >= 2 && iHC == 2)
						SetBombEx(BT_ITEM_BOMB);
					else if(iHC >= 2 && iWC == 2)
						SetBombEx(BT_ITEM_BOMB);
					else if(iHC == 3 || iWC == 3) {
						iCCY = -1;
						iCCX = -1;
						SetBombEx();
					}
				}
			}
		}
	}

	if(bCheck == true)
		SESoundPlay(SE_PuzzleMatching);
	return bCheck;
}

function SetBombEx(type)
{
	for(var y=1;y<MAX_TILE_Y-1;++y){
		for(var x=1;x<MAX_TILE_X-1;++x){
			if(iCCY == y && iCCX == x)
				SetBomb(y, x, type);
			else if(CHECK_Map[y][x] == -2)
				SetBomb(y, x);
		}
	}
}

function CheckBlockType(y, x, type)
{
	if(CHECK_Map[y][x] > -1) {
		CHECK_Map[y][x] = -2;
		if (CHECK_Map[y - 1][x] == type) {
			iHC++;
			if(iHC == 2 && iWC >= 2) {
				iCCY = y - 1;
				iCCX = x;
			}
			CheckBlockType(y - 1, x, type);
		}
		if (CHECK_Map[y + 1][x] == type) {
			iHC++;
			if(iHC == 2 && iWC >= 2) {
				iCCY = y + 1;
				iCCX = x;
			}
			CheckBlockType(y + 1, x, type);
		}
		if (CHECK_Map[y][x - 1] == type) {
			iWC++;
			if(iWC == 2 && iHC >= 2) {
				iCCY = y;
				iCCX = x  - 1;
			}
			CheckBlockType(y, x - 1, type);
		}
		if (CHECK_Map[y][x + 1] == type) {
			iWC++;
			if(iWC == 2 && iHC >= 2) {
				iCCY = y;
				iCCX = x + 1;
			}
			CheckBlockType(y, x + 1, type);
		}
	}
}
*/
function CheckBlock()
{
	var bCheck = false;
	var i = 0, k = 0, t = 0;
	for(var y=MAX_TILE_Y-1;y>0;--y)
	{
		for(var x=MAX_TILE_X-1;x>0;--x)	// 하단부터 검색한다.
		{
			iLCC = 0;iRCC = 0;iTCC = 0;iBCC = 0;
		//	iLCC2 = 0;iRCC2 = 0;iTCC2 = 0;iBCC2 = 0;

			if(CHECK_MOVE_Map[y][x] == MOVE_ING && BLOCK_Map[y][x].type < BT_NEKO_MAX){
				CHECK_MOVE_Map[y][x] = MOVE_NONE;

				for(k=1;k<=4;++k){	// Left 검사
					if(x-k >= 1){
						if(BLOCK_Map[y][x-k] != undefined && BLOCK_Map[y][x-k].type == BLOCK_Map[y][x].type)
							iLCC++;
						else
							break;
					}
				}

				for(k=1;k<=4;++k){	// Right 검사
					if(x+k <= MAX_TILE_X-1){
						if(BLOCK_Map[y][x+k] != undefined && BLOCK_Map[y][x+k].type == BLOCK_Map[y][x].type)
							iRCC++;
						else
							break;
					}
				}

				for(k=1;k<=4;++k){	// Top 검사
					if(y-k >= 1){
						if(BLOCK_Map[y-k][x] != undefined && BLOCK_Map[y-k][x].type == BLOCK_Map[y][x].type)
							iTCC++;
						else
							break;
					}
				}

				for(k=1;k<=4;++k){	// Bottom 검사
					if(y+k <= MAX_TILE_Y-1){
						if(BLOCK_Map[y+k][x] != undefined && BLOCK_Map[y+k][x].type == BLOCK_Map[y][x].type)
							iBCC++;
						else
							break;
					}
				}

				if(iLCC + iRCC >= 4){		// 무지개 아이템
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_RAINBOW);
					for(i=1;i<=iLCC;++i)
						SetBomb(y, x-i);
					for(i=1;i<=iRCC;++i)
						SetBomb(y, x+i);
				}else if(iTCC + iBCC >= 4){	// 무지개 아이템
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_RAINBOW);
					for(i=1;i<=iTCC;++i)
						SetBomb(y-i, x);
					for(i=1;i<=iBCC;++i)
						SetBomb(y+i, x);
				}else if(iLCC + iRCC >= 2 && iTCC + iBCC >= 2){	// 십자가 아이템
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_CROSS);
					for(i=1;i<=iLCC;++i)
						SetBomb(y, x-i);
					for(i=1;i<=iRCC;++i)
						SetBomb(y, x+i);
					for(i=1;i<=iTCC;++i)
						SetBomb(y-i, x);
					for(i=1;i<=iBCC;++i)
						SetBomb(y+i, x);
				}else if(iLCC + iRCC >= 3){	// 세로아이템
					bCheck = true;
					bBlockMove = true;

					iTCC2 = 0;
					iBCC2 = 0;
					var bTempCheck = false;
					for(t=1;t<=iLCC;++t){
						for(k=1;k<=4;++k){	// Top 검사
							if(x-t >= 1 && y-k >= 1){
								if(BLOCK_Map[y-k][x-t] != undefined && BLOCK_Map[y-k][x-t].type == BLOCK_Map[y][x].type)
									iTCC2++;
								else
									break;
							}
						}
						for(k=1;k<=4;++k){	// Bottom 검사
							if(x-t >= 1 && y+k <= MAX_TILE_Y-1){
								if(BLOCK_Map[y+k][x-t] != undefined && BLOCK_Map[y+k][x-t].type == BLOCK_Map[y][x].type)
									iBCC2++;
								else
									break;
							}
						}

						if(iTCC2 + iBCC2 >= 2){	// 십자생성..
							bTempCheck = true;
							SetBomb(y, x, BT_ITEM_CROSS);
							for(i=1;i<=iLCC;++i)
								SetBomb(y, x-i);
							for(i=1;i<=iRCC;++i)
								SetBomb(y, x+i);
							for(i=1;i<=iTCC2;++i)
								SetBomb(y-i, x-t);
							for(i=1;i<=iBCC2;++i)
								SetBomb(y+i, x-t);
							break;
						}
					}
					if(bTempCheck == false) {
						iTCC2 = 0;
						iBCC2 = 0;
						for (t = 1; t <= iRCC; ++t) {
							for (k = 1; k <= 4; ++k) {	// Top 검사
								if (x+t <= MAX_TILE_X - 1 && y - k >= 1) {
									if (BLOCK_Map[y-k][x+t] != undefined && BLOCK_Map[y-k][x+t].type == BLOCK_Map[y][x].type)
										iTCC2++;
									else
										break;
								}
							}
							for (k = 1; k <= 4; ++k) {	// Bottom 검사
								if (x+t <= MAX_TILE_X - 1 && y + k <= MAX_TILE_Y - 1) {
									if (BLOCK_Map[y+k][x+t] != undefined && BLOCK_Map[y+k][x+t].type == BLOCK_Map[y][x].type)
										iBCC2++;
									else
										break;
								}
							}

							if (iTCC2 + iBCC2 >= 2) {	// 십자생성..
								bTempCheck = true;
								SetBomb(y, x, BT_ITEM_CROSS);
								for (i = 1; i <= iLCC; ++i)
									SetBomb(y, x - i);
								for (i = 1; i <= iRCC; ++i)
									SetBomb(y, x + i);
								for (i = 1; i <= iTCC2; ++i)
									SetBomb(y - i, x + t);
								for (i = 1; i <= iBCC2; ++i)
									SetBomb(y + i, x + t);
								break;
							}
						}
					}

					if(bTempCheck == false) {
						SetBomb(y, x, BT_ITEM_HEIGHT);
						for (i = 1; i <= iLCC; ++i)
							SetBomb(y, x - i);
						for (i = 1; i <= iRCC; ++i)
							SetBomb(y, x + i);
					}
				}else if(iTCC + iBCC >= 3){ // 가로아이템
					// 한번 더 체크한다. 십자가 생길수 있는지..
					bCheck = true;
					bBlockMove = true;

					iLCC2 = 0;
					iRCC2 = 0;
					var bTempCheck = false;
					for(t=1;t<=iTCC;++t){
						for(k=1;k<=4;++k){	// Left 검사
							if(y - t >= 1 && x-k >= 1){
								if(BLOCK_Map[y-t][x-k] != undefined && BLOCK_Map[y-t][x-k].type == BLOCK_Map[y][x].type)
									iLCC2++;
								else
									break;
							}
						}

						for(k=1;k<=4;++k){	// Right 검사
							if(y - t >= 1 && x+k <= MAX_TILE_X-1){
								if(BLOCK_Map[y-t][x+k] != undefined && BLOCK_Map[y-t][x+k].type == BLOCK_Map[y][x].type)
									iRCC2++;
								else
									break;
							}
						}

						if(iLCC2 + iRCC2 >= 2){	// 십자생성..
							bTempCheck = true;
							SetBomb(y, x, BT_ITEM_CROSS);
							for(i=1;i<=iLCC2;++i)
								SetBomb(y-t, x-i);
							for(i=1;i<=iRCC2;++i)
								SetBomb(y-t, x+i);
							for(i=1;i<=iTCC;++i)
								SetBomb(y-i, x);
							for(i=1;i<=iBCC;++i)
								SetBomb(y+i, x);
							break;
						}
					}
					if(bTempCheck == false) {
						iLCC2 = 0;
						iRCC2 = 0;
						for(t=1;t<=iBCC;++t){
							for(k=1;k<=4;++k){	// Left 검사
								if(y+t <= MAX_TILE_Y-1 && x-k >= 1){
									if(BLOCK_Map[y+t][x-k] != undefined && BLOCK_Map[y+t][x-k].type == BLOCK_Map[y][x].type)
										iLCC2++;
									else
										break;
								}
							}

							for(k=1;k<=4;++k){	// Right 검사
								if(y+t <= MAX_TILE_Y-1 && x+k <= MAX_TILE_X-1){
									if(BLOCK_Map[y+t][x+k] != undefined && BLOCK_Map[y+t][x+k].type == BLOCK_Map[y][x].type)
										iRCC2++;
									else
										break;
								}
							}

							if(iLCC2 + iRCC2 >= 2){	// 십자생성..
								bTempCheck = true;
								SetBomb(y, x, BT_ITEM_CROSS);
								for(i=1;i<=iLCC2;++i)
									SetBomb(y+t, x-i);
								for(i=1;i<=iRCC2;++i)
									SetBomb(y+t, x+i);
								for(i=1;i<=iTCC;++i)
									SetBomb(y-i, x);
								for(i=1;i<=iBCC;++i)
									SetBomb(y+i, x);
								break;
							}
						}
					}

					if(bTempCheck == false) {
						SetBomb(y, x, BT_ITEM_WIDTH);
						for (i = 1; i <= iTCC; ++i)
							SetBomb(y - i, x);
						for (i = 1; i <= iBCC; ++i)
							SetBomb(y + i, x);
					}
				}
				// 사각형 처리..
				else if(BLOCK_Map[y-1][x-1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-1][x-1].type// 왼쪽 상단이 같은색일때 필수적으로 좌1, 하1이 같은색이어야 한다.
					&& BLOCK_Map[y][x-1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x-1].type && BLOCK_Map[y-1][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-1][x].type){
					bCheck = true;
					bBlockMove = true;
					if(BLOCK_Map[y][x-2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x-2].type)
						SetBomb(y, x-2);
					if(BLOCK_Map[y-1][x-2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-1][x-2].type)
						SetBomb(y-1, x-2);
					if(BLOCK_Map[y-2][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-2][x].type)
						SetBomb(y-2, x);
					if(BLOCK_Map[y-2][x-1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-2][x-1].type)
						SetBomb(y-2, x-1);
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y-1, x-1);
					SetBomb(y, x-1);
					SetBomb(y-1, x);
				}
				else if(BLOCK_Map[y+1][x-1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+1][x-1].type// 왼쪽 하단이 같은색일때 필수적으로 좌1, 하1이 같은색이어야 한다.
					&& BLOCK_Map[y][x-1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x-1].type && BLOCK_Map[y+1][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+1][x].type){
					bCheck = true;
					bBlockMove = true;
					if(BLOCK_Map[y][x-2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x-2].type)
						SetBomb(y, x-2);
					if(BLOCK_Map[y+1][x-2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+1][x-2].type)
						SetBomb(y+1, x-2);
					if(BLOCK_Map[y+2][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+2][x].type)
						SetBomb(y+2, x);
					if(BLOCK_Map[y+2][x-1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+2][x-1].type)
						SetBomb(y+2, x-1);
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y+1, x-1);
					SetBomb(y, x-1);
					SetBomb(y+1, x);
				}
				else if(BLOCK_Map[y-1][x+1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-1][x+1].type// 오른쪽 상단이 같은색일때 필수적으로 좌1, 하1이 같은색이어야 한다.
					&& BLOCK_Map[y][x+1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x+1].type && BLOCK_Map[y-1][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-1][x].type){
					bCheck = true;
					bBlockMove = true;
					if(BLOCK_Map[y][x+2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x+2].type)
						SetBomb(y, x+2);
					if(BLOCK_Map[y-1][x+2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-1][x+2].type)
						SetBomb(y-1, x+2);
					if(BLOCK_Map[y-2][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-2][x].type)
						SetBomb(y-2, x);
					if(BLOCK_Map[y-2][x+1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y-2][x+1].type)
						SetBomb(y-2, x+1);
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y-1, x+1);
					SetBomb(y, x+1);
					SetBomb(y-1, x);
				}
				else if(BLOCK_Map[y+1][x+1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+1][x+1].type// 오른쪽 하단이 같은색일때 필수적으로 좌1, 하1이 같은색이어야 한다.
					&& BLOCK_Map[y][x+1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x+1].type && BLOCK_Map[y+1][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+1][x].type){
					bCheck = true;
					bBlockMove = true;
					if(BLOCK_Map[y][x+2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y][x+2].type)
						SetBomb(y, x+2);
					if(BLOCK_Map[y+1][x+2] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+1][x+2].type)
						SetBomb(y+1, x+2);
					if(BLOCK_Map[y+2][x] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+2][x].type)
						SetBomb(y+2, x);
					if(BLOCK_Map[y+2][x+1] != undefined && BLOCK_Map[y][x].type == BLOCK_Map[y+2][x+1].type)
						SetBomb(y+2, x+1);
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y+1, x+1);
					SetBomb(y, x+1);
					SetBomb(y+1, x);
				}
					/*
				else if(iLCC == 1 && iTCC >=1 && BLOCK_Map[y-1][x-1] != undefined && BLOCK_Map[y-1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y-1, x-1);
					SetBomb(y, x-1);
					for(i=1;i<=iTCC;++i)
						SetBomb(y-i, x);
				}
				else if(iLCC == 1 && iBCC >=1 && BLOCK_Map[y+1][x-1] != undefined && BLOCK_Map[y+1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y+1, x-1);
					SetBomb(y, x-1);
					for(i=1;i<=iBCC;++i)
						SetBomb(y+i, x);
				}
				else if(iRCC == 1 && iTCC >=1 && BLOCK_Map[y-1][x+1] != undefined && BLOCK_Map[y-1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y-1, x+1);
					SetBomb(y, x+1);
					for(i=1;i<=iTCC;++i)
						SetBomb(y-i, x);
				}
				else if(iRCC == 1 && iBCC >=1 && BLOCK_Map[y+1][x+1] != undefined && BLOCK_Map[y+1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y+1, x+1);
					SetBomb(y, x+1);
					for(i=1;i<=iBCC;++i)
						SetBomb(y+i, x);
				}
				else if(iTCC == 1 && iLCC >=1 && BLOCK_Map[y-1][x-1] != undefined && BLOCK_Map[y-1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y-1, x-1);
					SetBomb(y-1, x);
					for(i=1;i<=iLCC;++i)
						SetBomb(y, x-i);
				}
				else if(iTCC == 1 && iRCC >=1 && BLOCK_Map[y-1][x+1] != undefined && BLOCK_Map[y-1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y-1, x+1);
					SetBomb(y-1, x);
					for(i=1;i<=iRCC;++i)
						SetBomb(y, x+i);
				}
				else if(iBCC == 1 && iLCC >=1 && BLOCK_Map[y+1][x-1] != undefined && BLOCK_Map[y+1][x-1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y+1, x-1);
					SetBomb(y+1, x);
					for(i=1;i<=iLCC;++i)
						SetBomb(y, x-i);
				}
				else if(iBCC == 1 && iRCC >=1 && BLOCK_Map[y+1][x+1] != undefined && BLOCK_Map[y+1][x+1].type == BLOCK_Map[y][x].type)
				{
					bCheck = true;
					bBlockMove = true;
					SetBomb(y, x, BT_ITEM_BOMB);
					SetBomb(y+1, x+1);
					SetBomb(y+1, x);
					for(i=1;i<=iRCC;++i)
						SetBomb(y, x+i);
				}*/
				else if(iLCC + iRCC == 2)	// 3개짜리 일때..
				{
					bCheck = true;
					bBlockMove = true;

					iTCC2 = 0;
					iBCC2 = 0;
					var bTempCheck = false;
					for(t=1;t<=iLCC;++t){
						for(k=1;k<=4;++k){	// Top 검사
							if(x-t >= 1 && y-k >= 1){
								if(BLOCK_Map[y-k][x-t] != undefined && BLOCK_Map[y-k][x-t].type == BLOCK_Map[y][x].type)
									iTCC2++;
								else
									break;
							}
						}
						for(k=1;k<=4;++k){	// Bottom 검사
							if(x-t >= 1 && y+k <= MAX_TILE_Y-1){
								if(BLOCK_Map[y+k][x-t] != undefined && BLOCK_Map[y+k][x-t].type == BLOCK_Map[y][x].type)
									iBCC2++;
								else
									break;
							}
						}

						if(iTCC2 + iBCC2 >= 2){	// 십자생성..
							bTempCheck = true;
							SetBomb(y, x, BT_ITEM_CROSS);
							for(i=1;i<=iLCC;++i)
								SetBomb(y, x-i);
							for(i=1;i<=iRCC;++i)
								SetBomb(y, x+i);
							for(i=1;i<=iTCC2;++i)
								SetBomb(y-i, x-t);
							for(i=1;i<=iBCC2;++i)
								SetBomb(y+i, x-t);
							break;
						}
					}
					if(bTempCheck == false) {
						iTCC2 = 0;
						iBCC2 = 0;
						for (t = 1; t <= iRCC; ++t) {
							for (k = 1; k <= 4; ++k) {	// Top 검사
								if (x+t <= MAX_TILE_X - 1 && y - k >= 1) {
									if (BLOCK_Map[y - k][x + t] != undefined && BLOCK_Map[y - k][x + t].type == BLOCK_Map[y][x].type)
										iTCC2++;
									else
										break;
								}
							}
							for (k = 1; k <= 4; ++k) {	// Bottom 검사
								if (x+t <= MAX_TILE_X - 1 && y + k <= MAX_TILE_Y - 1) {
									if (BLOCK_Map[y + k][x + t] != undefined && BLOCK_Map[y + k][x + t].type == BLOCK_Map[y][x].type)
										iBCC2++;
									else
										break;
								}
							}

							if (iTCC2 + iBCC2 >= 2) {	// 십자생성..
								bTempCheck = true;
								SetBomb(y, x, BT_ITEM_CROSS);
								for (i = 1; i <= iLCC; ++i)
									SetBomb(y, x - i);
								for (i = 1; i <= iRCC; ++i)
									SetBomb(y, x + i);
								for (i = 1; i <= iTCC2; ++i)
									SetBomb(y - i, x + t);
								for (i = 1; i <= iBCC2; ++i)
									SetBomb(y + i, x + t);
								break;
							}
						}
					}

					if(bTempCheck == false) {
						for (i = 0; i <= iLCC; ++i)
							SetBomb(y, x - i);
						for (i = 1; i <= iRCC; ++i)
							SetBomb(y, x + i);
					}
				}
				else if(iTCC + iBCC == 2)
				{
					bCheck = true;
					bBlockMove = true;

					iLCC2 = 0;
					iRCC2 = 0;
					var bTempCheck = false;
					for(t=1;t<=iTCC;++t){
						for(k=1;k<=4;++k){	// Left 검사
							if(y-t >= 1 && x-k >= 1){
								if(BLOCK_Map[y-t][x-k] != undefined && BLOCK_Map[y-t][x-k].type == BLOCK_Map[y][x].type)
									iLCC2++;
								else
									break;
							}
						}

						for(k=1;k<=4;++k){	// Right 검사
							if(y-t >= 1 && x+k <= MAX_TILE_X-1){
								if(BLOCK_Map[y-t][x+k] != undefined && BLOCK_Map[y-t][x+k].type == BLOCK_Map[y][x].type)
									iRCC2++;
								else
									break;
							}
						}

						if(iLCC2 + iRCC2 >= 2){	// 십자생성..
							bTempCheck = true;
							SetBomb(y, x, BT_ITEM_CROSS);
							for(i=1;i<=iLCC2;++i)
								SetBomb(y-t, x-i);
							for(i=1;i<=iRCC2;++i)
								SetBomb(y-t, x+i);
							for(i=1;i<=iTCC;++i)
								SetBomb(y-i, x);
							for(i=1;i<=iBCC;++i)
								SetBomb(y+i, x);
							break;
						}
					}
					if(bTempCheck == false) {
						iLCC2 = 0;
						iRCC2 = 0;
						for(t=1;t<=iBCC;++t){
							for(k=1;k<=4;++k){	// Left 검사
								if(y+t <= MAX_TILE_Y-1 && x-k >= 1){
									if(BLOCK_Map[y+t][x-k] != undefined && BLOCK_Map[y+t][x-k].type == BLOCK_Map[y][x].type)
										iLCC2++;
									else
										break;
								}
							}

							for(k=1;k<=4;++k){	// Right 검사
								if(y+t <= MAX_TILE_Y-1 && x+k <= MAX_TILE_X-1){
									if(BLOCK_Map[y+t][x+k] != undefined && BLOCK_Map[y+t][x+k].type == BLOCK_Map[y][x].type)
										iRCC2++;
									else
										break;
								}
							}

							if(iLCC2 + iRCC2 >= 2){	// 십자생성..
								bTempCheck = true;
								SetBomb(y, x, BT_ITEM_CROSS);
								for(i=1;i<=iLCC2;++i)
									SetBomb(y+t, x-i);
								for(i=1;i<=iRCC2;++i)
									SetBomb(y+t, x+i);
								for(i=1;i<=iTCC;++i)
									SetBomb(y-i, x);
								for(i=1;i<=iBCC;++i)
									SetBomb(y+i, x);
								break;
							}
						}
					}

					if(bTempCheck == false) {
						for (i = 0; i <= iTCC; ++i)
							SetBomb(y - i, x);
						for (i = 1; i <= iBCC; ++i)
							SetBomb(y + i, x);
					}
				}
				CHECK_HP_Map_Init();	// hp가 있는 블럭체크한 부분을 해지한다.
			}
		}
	}

	if(bCheck == true)
		SESoundPlay(SE_PuzzleMatching);
	return bCheck;
}

function SetBomb(y, x, type)
{
	if(type === undefined)
	{
		CHECK_MOVE_Map[y][x] = MOVE_NONE;
		if(BLOCK_Map[y][x] !== undefined)
			BLOCK_Map[y][x].SetDamage();
		/*
		if(BLOCK_Map[y][x] === undefined){
			console.log("========= y : " + y);
			console.log("========= x : " + x);
		}
		else
			BLOCK_Map[y][x].SetDamage();
			*/
	}
	else
		BLOCK_Map[y][x].SetBlock(type);
	BG_Map[y][x].SetDamage();
	SetAroundBlockMinusHP(y, x);
}

function CHECK_HP_Map_Init()
{
	for(var y=0;y<MAX_TILE_Y;++y)
		for(var x=0;x<MAX_TILE_X;++x)
			CHECK_HP_Map[y][x] = HP_NONE;
}

// 터질 블럭을 체크한다.
function SetAroundBlockMinusHP(y, x)
{
	// Left
	if(x-1 > 0 && BLOCK_Map[y][x-1] != undefined && CHECK_HP_Map[y][x-1] == HP_NONE)
	{
		BLOCK_Map[y][x-1].SetAroundDamage();
		CHECK_HP_Map[y][x-1] = HP_MINUS;
	}
	// Right
	if(x+1 < MAX_TILE_X-1 && BLOCK_Map[y][x+1] != undefined && CHECK_HP_Map[y][x+1] == HP_NONE)
	{
		BLOCK_Map[y][x+1].SetAroundDamage();
		CHECK_HP_Map[y][x+1] = HP_MINUS;
	}
	// Top
	if(y-1 > 0 && BLOCK_Map[y-1][x] != undefined && CHECK_HP_Map[y-1][x] == HP_NONE)
	{
		BLOCK_Map[y-1][x].SetAroundDamage();
		CHECK_HP_Map[y-1][x] = HP_MINUS;
	}
	// Bottom
	if(y+1 < MAX_TILE_Y-1 && BLOCK_Map[y+1][x] != undefined && CHECK_HP_Map[y+1][x] == HP_NONE)
	{
		BLOCK_Map[y+1][x].SetAroundDamage();
		CHECK_HP_Map[y+1][x] = HP_MINUS;
	}
}

var tbCreateBlockTable = [];//BT_NEKO_5, BT_NEKO_5, BT_NEKO_5];
function UpdateCreateBlock()
{
	if(gameState == STATE_GAME_PLAY && iHeroState != 0) return;
	var iR;

	for (var i = 0; i < tbCB.length; ++i) {
		if (BLOCK_Map[tbCB[i].y + 1][tbCB[i].x] === undefined) {
			kBlock.push(kBlockDeck.shift());
			UpdateBlockIndex();
			kBlock[kBlock.length - 1].ix = tbCB[i].x;
			kBlock[kBlock.length - 1].iy = tbCB[i].y + 1;
			CHECK_MOVE_Map[tbCB[i].y + 1][tbCB[i].x] = MOVE_ING;
			BLOCK_Map[tbCB[i].y + 1][tbCB[i].x] = kBlock[kBlock.length - 1];
			kBlock[kBlock.length - 1].SetVisible(true);
			kBlock[kBlock.length - 1].sprMain.alpha = 1;
			if(gameState == STATE_GAME_PLAY) {
				iR = Mathfloor(Math.random() * tbBlockTypeMax[iStage]);
				if(iOldCreateBlockType == iR)
					iR = Mathfloor(Math.random() * tbBlockTypeMax[iStage]);
				iOldCreateBlockType = iR;
				if(tbCreateBlockTable.length <= 0)
					kBlock[kBlock.length - 1].SetBlock(iR, BT_ITEM_NONE);
				else
					kBlock[kBlock.length - 1].SetBlock(tbCreateBlockTable.pop(), BT_ITEM_NONE);
			}
			else {
				iR = Mathfloor(Math.random() * BT_NEKO_MAX);
				if(iOldCreateBlockType == iR)
					iR = Mathfloor(Math.random() * BT_NEKO_MAX);
				iOldCreateBlockType = iR;
				kBlock[kBlock.length - 1].SetBlock(Mathfloor(Math.random() * BT_NEKO_MAX), BT_ITEM_NONE);
			}
			if (BLOCK_Map[tbCB[i].y + 2][tbCB[i].x] != undefined && BLOCK_Map[tbCB[i].y + 2][tbCB[i].x].y < START_Y + ((tbCB[i].y + 2) * TILE_SIZE_Y)) {
				kBlock[kBlock.length - 1].SetPosition(START_X + (tbCB[i].x * TILE_SIZE_X), BLOCK_Map[tbCB[i].y + 2][tbCB[i].x].y - TILE_SIZE_Y);
				kBlock[kBlock.length - 1].speed = BLOCK_Map[tbCB[i].y + 2][tbCB[i].x].speed;
				kBlock[kBlock.length - 1].gravity = BLOCK_Map[tbCB[i].y + 2][tbCB[i].x].gravity;
			}
			else {
				kBlock[kBlock.length - 1].SetPosition(START_X + (tbCB[i].x * TILE_SIZE_X), START_Y + (tbCB[i].y * TILE_SIZE_Y));
				kBlock[kBlock.length - 1].speed = BLOCK_START_SPEED;
				kBlock[kBlock.length - 1].gravity = 1;
			}

			kBlock[kBlock.length - 1].state = BS_MOVE_DOWN_CENTER;
			kBlock[kBlock.length - 1].sprMain.scale.set(0.9, 1.1);
			kBlock[kBlock.length - 1].sprMain.rotation = 0;
			bBlockMove = true;
		}
	}
}

function UpdateBlockIndex()
{
	for(var i=0;i<kBlock.length;++i)
		kBlock[i].it = i;
}

function UpdateScore()
{
	if(iOldScore == iScore) return;

	iOldScore = iScore;
	txtScore.text = GetString("SCORE2", GetComma(iScore));
}

function SetStage()
{
    var i = 0;
	var y = 0, x = 0;
	var createBlockCnt = 0;

	while(kBlock.length > 0)
	{
		kBlockDeck.push(kBlock.shift());
		kBlockDeck[kBlockDeck.length-1].SetVisible(false);
	}

	// 배경 셋팅
	for(i=0;i<sprBG.length;++i)
		sprBG[i].visible = false;
	sprBG[Mathfloor(iStage/50)].visible = true;

	switch(tbBlockPos[iStage]){
		case 0:START_X = iCenterSizeX - 384;break;
		case 1:START_X = iCenterSizeX - 384 - (TILE_SIZE_X/2);break;
		case 2:START_X = iCenterSizeX - 384 + (TILE_SIZE_X/2);break;
	}
	switch(tbBlockHPos[iStage]){
		case 0:START_Y = iCenterSizeY - 350;break;
		case 1:START_Y = iCenterSizeY - 350 - (TILE_SIZE_Y/2);break;
		case 2:START_Y = iCenterSizeY - 350 + (TILE_SIZE_Y/2);break;
	}

	// 맵을 배치..
	tbCB = [];	// 초기화.
	for(y=0;y<MAX_TILE_Y;++y)
	{
		for(x=0;x<MAX_TILE_X;++x)
		{
			CHECK_MOVE_Map[y][x] = MOVE_NONE;
			CHECK_HP_Map[y][x] = HP_NONE;
			CHECK_BOMB_Map[y][x] = BOMB_NONE;

			// 초기화.
			BG_Map[y][x].sprMap.visible = false;
			BG_Map[y][x].sprRoad.visible = false;
			BG_Map[y][x].SetItem(ITEM0);
			BLOCK_Map[y][x] = undefined;
			// 맵을 배치
			if((tbMap[iStage][y][x] & CB) == CB)
			{
				BG_Map[y][x].SetMap(tbMap[iStage][y][x] - CB);
				BG_Map[y][x].SetCB(true);
				tbCB[createBlockCnt] = new tbCreateBlock();
				tbCB[createBlockCnt].p = BG_Map[y][x];
				tbCB[createBlockCnt].y = y;
				tbCB[createBlockCnt].x = x;
				createBlockCnt++;
			}
			else
			{
				BG_Map[y][x].SetMap(tbMap[iStage][y][x]);
				BG_Map[y][x].SetCB(false);
				BG_Map[y][x].SetPosition(START_X + (x*TILE_SIZE_X), START_Y + (y*TILE_SIZE_Y));
			}

			if((tbMap[iStage][y][x] & CC) == CC)
			{
				kBlock.push(kBlockDeck.shift());
				kBlock[kBlock.length-1].iy = y;
				kBlock[kBlock.length-1].ix = x;
				BLOCK_Map[y][x] = kBlock[kBlock.length-1];
				kBlock[kBlock.length-1].SetVisible(true);
				kBlock[kBlock.length-1].SetBlock(Mathfloor(Math.random() * tbBlockTypeMax[iStage]), BT_ITEM_NONE);
				kBlock[kBlock.length-1].SetPosition(START_X + (x*TILE_SIZE_X), START_Y + (y*TILE_SIZE_Y));
				kBlock[kBlock.length-1].state = BS_NONE;
				kBlock[kBlock.length-1].sprMain.rotation = 0;
				kBlock[kBlock.length-1].sprMain.scale.set(1);
			}
		}
	}

	tRoad = JSON.parse(tbRoad[iStage]);
	tRoad.sort(function(a,b){return a.id-b.id;});	// 소팅한다.
	iRoadNum = tRoad.length - 2;	// 남은 길수..
	txtRoadNum.text = GetString("Turn", iRoadNum);
	iHeroIndex = 0;	// 캐릭터가 지나간 index값..
	for(i=0;i<tRoad.length;++i)
		BG_Map[tRoad[i].y][tRoad[i].x].SetRoad(tRoad[i].d, tRoad[i].id);
	BLOCK_Map[tRoad[0].y][tRoad[0].x].SetBlock(BT_HERO);
	kHero = BLOCK_Map[tRoad[0].y][tRoad[0].x];	// 주인공 포인터를 가지고 있는다.
	BLOCK_Map[tRoad[tRoad.length - 1].y][tRoad[tRoad.length - 1].x].SetBlock(BT_BOX); // 박스 배치
	kBox = BLOCK_Map[tRoad[tRoad.length - 1].y][tRoad[tRoad.length - 1].x];
	sRoad.addChild(BG_Map[kHero.iy][kHero.ix].sprRoad);
	sRoad.addChild(BG_Map[kBox.iy][kBox.ix].sprRoad);
	sBlock.addChild(kHero.sprMain);	// 주인공을 최상위로 올린다.

	var tItem = JSON.parse(tbItem[iStage]);	// 나중에 로직에 의해 바뀌어야 함.
	for(i=0;i<tItem.length;++i)
	{
		switch(tItem[i].d)
		{
			case ITEM1:		// 이동벽 hp1
			case ITEM2:		// 이동벽 hp2
			case ITEM3: 	// 이동벽 hp3
			case ITEM4: 	// 고정벽 hp1
			case ITEM5: 	// 고정벽 hp2
			case ITEM6: 	// 고정벽 hp3
			case ITEM7: 	// 무적블럭
			case ITEM8: 	// 구름모양
			case ITEM9:		// 고정케이지 hp1
			case ITEM14:	// 아이템 h
			case ITEM15:	// 아이템 w
			case ITEM16:	// 아이템 십자가
			case ITEM17:	// 아이템 발바닥
			case ITEM18:	// 아이템 무지개
				BLOCK_Map[tItem[i].y][tItem[i].x].SetItem(tItem[i].d);
				break;
			case ITEM10:
			case ITEM11:
			case ITEM12:
			case ITEM13:
				BG_Map[tItem[i].y][tItem[i].x].SetItem(tItem[i].d);
				break;
		}
	}
	UpdateBlockIndex();

	while(true){
		for(i=0;i<kBlock.length;++i)
			if(kBlock[i].type < BT_NEKO_MAX)
				kBlock[i].SetBlock(Mathfloor(Math.random() * tbBlockTypeMax[iStage]), BT_ITEM_NONE);
		CheckCreateBlock();
		if(CheckMatchBlock() == true)
			break;
	}

	// 고정케이지쪽만 재 셋팅한다.
	for(i=0;i<tItem.length;++i)
	{
		switch(tItem[i].d)
		{
			case ITEM9:	// 고정케이지 hp1
				BLOCK_Map[tItem[i].y][tItem[i].x].SetItem(tItem[i].d);
				break;
		}
	}

	switch(iStage){
		case 0:
			BLOCK_Map[4][3].SetBlock(BT_NEKO_1);BLOCK_Map[4][4].SetBlock(BT_NEKO_2);BLOCK_Map[4][5].SetBlock(BT_NEKO_3);BLOCK_Map[4][6].SetBlock(BT_NEKO_1);BLOCK_Map[4][7].SetBlock(BT_NEKO_3);BLOCK_Map[4][8].SetBlock(BT_NEKO_3);
			BLOCK_Map[5][3].SetBlock(BT_NEKO_1);BLOCK_Map[5][4].SetBlock(BT_NEKO_3);BLOCK_Map[5][5].SetBlock(BT_NEKO_2);BLOCK_Map[5][6].SetBlock(BT_NEKO_1);BLOCK_Map[5][7].SetBlock(BT_NEKO_2);BLOCK_Map[5][8].SetBlock(BT_NEKO_2);
			BLOCK_Map[7][3].SetBlock(BT_NEKO_1);BLOCK_Map[7][4].SetBlock(BT_NEKO_2);BLOCK_Map[7][5].SetBlock(BT_NEKO_1);BLOCK_Map[7][6].SetBlock(BT_NEKO_1);BLOCK_Map[7][7].SetBlock(BT_NEKO_2);BLOCK_Map[7][8].SetBlock(BT_NEKO_2);
			BLOCK_Map[8][3].SetBlock(BT_NEKO_1);BLOCK_Map[8][4].SetBlock(BT_NEKO_2);BLOCK_Map[8][5].SetBlock(BT_NEKO_3);BLOCK_Map[8][6].SetBlock(BT_NEKO_1);BLOCK_Map[8][7].SetBlock(BT_NEKO_3);BLOCK_Map[8][8].SetBlock(BT_NEKO_3);

			for(i=0;i<kBlock.length;++i){
				if(kBlock[i].type < BT_NEKO_MAX)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
			}
			BG_Map[7][3].SetItem(ITEM0);
			BG_Map[7][4].SetItem(ITEM0);
			break;
		case 1:
			BLOCK_Map[4][3].SetBlock(BT_NEKO_3);BLOCK_Map[4][4].SetBlock(BT_NEKO_1);BLOCK_Map[4][6].SetBlock(BT_NEKO_3);BLOCK_Map[4][7].SetBlock(BT_NEKO_3);
			BLOCK_Map[5][3].SetBlock(BT_NEKO_1);BLOCK_Map[5][4].SetBlock(BT_NEKO_2);BLOCK_Map[5][6].SetBlock(BT_NEKO_2);BLOCK_Map[5][7].SetBlock(BT_NEKO_2);
			BLOCK_Map[6][3].SetBlock(BT_NEKO_2);BLOCK_Map[6][4].SetBlock(BT_NEKO_1);BLOCK_Map[6][6].SetBlock(BT_NEKO_1);BLOCK_Map[6][7].SetBlock(BT_NEKO_1);
			BLOCK_Map[7][3].SetBlock(BT_NEKO_3);BLOCK_Map[7][4].SetBlock(BT_NEKO_1);BLOCK_Map[7][6].SetBlock(BT_NEKO_3);BLOCK_Map[7][7].SetBlock(BT_NEKO_3);
			BLOCK_Map[8][3].SetBlock(BT_NEKO_2);BLOCK_Map[8][4].SetBlock(BT_NEKO_2);BLOCK_Map[8][6].SetBlock(BT_NEKO_2);BLOCK_Map[8][7].SetBlock(BT_NEKO_2);
			BLOCK_Map[9][3].SetBlock(BT_NEKO_1);BLOCK_Map[9][4].SetBlock(BT_NEKO_1);BLOCK_Map[9][6].SetBlock(BT_NEKO_1);BLOCK_Map[9][7].SetBlock(BT_NEKO_1);

			for(i=0;i<kBlock.length;++i){
				if(kBlock[i].type < BT_NEKO_MAX)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
			}
			BG_Map[5][3].SetItem(ITEM0);
			BG_Map[5][4].SetItem(ITEM0);
			break;
		case 2:
			BLOCK_Map[4][3].SetBlock(BT_NEKO_1);BLOCK_Map[4][4].SetBlock(BT_NEKO_2);BLOCK_Map[4][5].SetBlock(BT_NEKO_1);BLOCK_Map[4][6].SetBlock(BT_NEKO_3);BLOCK_Map[4][7].SetBlock(BT_NEKO_2);BLOCK_Map[4][8].SetBlock(BT_NEKO_1);
			BLOCK_Map[5][3].SetBlock(BT_NEKO_3);									BLOCK_Map[5][5].SetBlock(BT_NEKO_3);BLOCK_Map[5][6].SetBlock(BT_NEKO_1);									BLOCK_Map[5][8].SetBlock(BT_NEKO_3);
			BLOCK_Map[6][3].SetBlock(BT_NEKO_2);									BLOCK_Map[6][5].SetBlock(BT_NEKO_1);BLOCK_Map[6][6].SetBlock(BT_NEKO_1);									BLOCK_Map[6][8].SetBlock(BT_NEKO_2);
			BLOCK_Map[7][3].SetBlock(BT_NEKO_3);BLOCK_Map[7][4].SetBlock(BT_NEKO_2);																		BLOCK_Map[7][7].SetBlock(BT_NEKO_2);BLOCK_Map[7][8].SetBlock(BT_NEKO_3);
			BLOCK_Map[8][3].SetBlock(BT_NEKO_1);BLOCK_Map[8][4].SetBlock(BT_NEKO_2);BLOCK_Map[8][5].SetBlock(BT_NEKO_3);BLOCK_Map[8][6].SetBlock(BT_NEKO_3);BLOCK_Map[8][7].SetBlock(BT_NEKO_2);BLOCK_Map[8][8].SetBlock(BT_NEKO_1);

			for(i=0;i<kBlock.length;++i){
				if(kBlock[i].type < BT_NEKO_MAX)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
			}
			BG_Map[4][5].SetItem(ITEM0);
			BG_Map[5][5].SetItem(ITEM0);
			break;
		case 3:
												BLOCK_Map[4][4].SetBlock(BT_NEKO_2);BLOCK_Map[4][5].SetBlock(BT_NEKO_1);BLOCK_Map[4][6].SetBlock(BT_NEKO_2);BLOCK_Map[4][7].SetBlock(BT_NEKO_3);
												BLOCK_Map[5][4].SetBlock(BT_NEKO_1);BLOCK_Map[5][5].SetBlock(BT_NEKO_3);BLOCK_Map[5][6].SetBlock(BT_NEKO_1);BLOCK_Map[5][7].SetBlock(BT_NEKO_2);
			BLOCK_Map[6][3].SetBlock(BT_NEKO_2);BLOCK_Map[6][4].SetBlock(BT_NEKO_3);BLOCK_Map[6][5].SetBlock(BT_NEKO_1);BLOCK_Map[6][6].SetBlock(BT_NEKO_2);BLOCK_Map[6][7].SetBlock(BT_NEKO_3);
												BLOCK_Map[7][4].SetBlock(BT_NEKO_2);BLOCK_Map[7][5].SetBlock(BT_NEKO_1);BLOCK_Map[7][6].SetBlock(BT_NEKO_3);
			BLOCK_Map[8][3].SetBlock(BT_NEKO_1);BLOCK_Map[8][4].SetBlock(BT_NEKO_2);BLOCK_Map[8][5].SetBlock(BT_NEKO_3);BLOCK_Map[8][6].SetBlock(BT_NEKO_1);
			BLOCK_Map[9][3].SetBlock(BT_NEKO_1);BLOCK_Map[9][4].SetBlock(BT_NEKO_3);BLOCK_Map[9][5].SetBlock(BT_NEKO_2);BLOCK_Map[9][6].SetBlock(BT_NEKO_1);

			for(i=0;i<kBlock.length;++i){
				if(kBlock[i].type < BT_NEKO_MAX)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
			}
			BG_Map[4][5].SetItem(ITEM0);
			BG_Map[5][5].SetItem(ITEM0);
			break;
		case 4:
																														BLOCK_Map[4][6].SetBlock(BT_NEKO_2);BLOCK_Map[4][7].SetBlock(BT_NEKO_1);BLOCK_Map[4][8].SetBlock(BT_NEKO_2);
																																							BLOCK_Map[5][7].SetBlock(BT_NEKO_1);BLOCK_Map[5][8].SetBlock(BT_NEKO_3);
			BLOCK_Map[6][3].SetBlock(BT_NEKO_1);BLOCK_Map[6][4].SetBlock(BT_NEKO_2);BLOCK_Map[6][5].SetBlock(BT_NEKO_1);									BLOCK_Map[6][7].SetBlock(BT_NEKO_3);BLOCK_Map[6][8].SetBlock(BT_NEKO_1);
			BLOCK_Map[7][3].SetBlock(BT_NEKO_2);BLOCK_Map[7][4].SetBlock(BT_NEKO_3);BLOCK_Map[7][5].SetBlock(BT_NEKO_1);									BLOCK_Map[7][7].SetBlock(BT_NEKO_1);BLOCK_Map[7][8].SetBlock(BT_NEKO_2);
			BLOCK_Map[8][3].SetBlock(BT_NEKO_3);BLOCK_Map[8][4].SetBlock(BT_NEKO_2);BLOCK_Map[8][5].SetBlock(BT_NEKO_3);									BLOCK_Map[8][7].SetBlock(BT_NEKO_1);BLOCK_Map[8][8].SetBlock(BT_NEKO_3);

			for(i=0;i<kBlock.length;++i){
				if(kBlock[i].type < BT_NEKO_MAX)
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetItem(ITEM13);
			}
			BG_Map[6][7].SetItem(ITEM0);
			BG_Map[6][8].SetItem(ITEM0);
			break;
	}
	fTimeDelay = 0;
//	BLOCK_Map[6][8].SetBlock(BT_ITEM_RAINBOW, undefined, false);
//	BLOCK_Map[6][4].SetBlock(BT_NEKO_4, undefined, false);
//	BLOCK_Map[6][5].SetBlock(BT_NEKO_4, undefined, false);
//	BLOCK_Map[7][3].SetBlock(BT_NEKO_4, undefined, false);
//	BLOCK_Map[7][4].SetBlock(BT_NEKO_5, undefined, false);
//	BLOCK_Map[7][5].SetBlock(BT_NEKO_4, undefined, false);
//	BLOCK_Map[7][6].SetBlock(BT_NEKO_4, undefined, false);
//	BLOCK_Map[8][4].SetBlock(BT_NEKO_3, undefined, false);
//	BLOCK_Map[8][5].SetBlock(BT_NEKO_4, undefined, false);
//	BLOCK_Map[8][6].SetBlock(BT_NEKO_4, undefined, false);
//	BLOCK_Map[6][6].SetBlock(BT_NEKO_1, undefined, false);
//	BLOCK_Map[9][6].SetBlock(BT_ITEM_WIDTH, undefined, false);
//	BLOCK_Map[9][4].SetBlock(BT_ITEM_HEIGHT, undefined, false);
//	BLOCK_Map[7][4].SetBlock(BT_ITEM_WIDTH, undefined, false);
//	BLOCK_Map[7][3].SetBlock(BT_ITEM_HEIGHT, undefined, false);
//	BLOCK_Map[9][8].SetBlock(BT_ITEM_WIDTH, undefined, false);
}

// 스파인 이펙트를 셋팅한다.
function SetSpineItemBombEffect(type, y, x)
{
	switch(type)
	{
	case BT_ITEM_WIDTH:
		SESoundPlay(SE_Item1);
	//	spine_item_bomb_eff[ispine_item_bomb_eff_cnt].rotation = 3.14 / 180 * 90;
		SpinePlay(spine_item_bomb_eff[ispine_item_bomb_eff_cnt], iCenterSizeX, y, "animation2", 1, false);
		if(++ispine_item_bomb_eff_cnt >= ispine_item_bomb_eff_max)
			ispine_item_bomb_eff_cnt = 0;
		break;
	case BT_ITEM_HEIGHT:
		SESoundPlay(SE_Item1);
	//	spine_item_bomb_eff[ispine_item_bomb_eff_cnt].rotation = 0;
		SpinePlay(spine_item_bomb_eff[ispine_item_bomb_eff_cnt], x, START_Y + (6.5*TILE_SIZE_Y), "animation", 1, false);
		if(++ispine_item_bomb_eff_cnt >= ispine_item_bomb_eff_max)
			ispine_item_bomb_eff_cnt = 0;
		break;
	case BT_ITEM_BOMB:
		SESoundPlay(SE_Item2);
		SpinePlay(spine_foot_bomb_eff_big[ispine_foot_bomb_eff_big_cnt], x, y, "animation", 1, false);
		if(++ispine_foot_bomb_eff_big_cnt >= ispine_foot_bomb_eff_big_max)
			ispine_foot_bomb_eff_big_cnt = 0;
		break;
	case BT_ITEM_CROSS:
		SESoundPlay(SE_Item1);
	//	spine_item_bomb_eff[ispine_item_bomb_eff_cnt].rotation = 3.14 / 180 * 90;
		SpinePlay(spine_item_bomb_eff[ispine_item_bomb_eff_cnt], iCenterSizeX, y, "animation2", 1, false);
		if(++ispine_item_bomb_eff_cnt >= ispine_item_bomb_eff_max)
			ispine_item_bomb_eff_cnt = 0;
	//	spine_item_bomb_eff[ispine_item_bomb_eff_cnt].rotation = 0;
		SpinePlay(spine_item_bomb_eff[ispine_item_bomb_eff_cnt], x, START_Y + (6.5*TILE_SIZE_Y), "animation", 1, false);
		if(++ispine_item_bomb_eff_cnt >= ispine_item_bomb_eff_max)
			ispine_item_bomb_eff_cnt = 0;
		break;
	case BT_ITEM_RAINBOW:
		SESoundPlay(SE_Item2);
		SpinePlay(spine_foot_bomb_eff_small[ispine_foot_bomb_eff_small_cnt], x, y, "animation", 1, false);
		if(++ispine_foot_bomb_eff_small_cnt >= ispine_foot_bomb_eff_small_max)
			ispine_foot_bomb_eff_small_cnt = 0;
		break;
	}
}

var tbItemScore = [1000, 1000, 1500, 1500, 2500];
function SetItemEffect(block, scoreType, rainbowType)
{
	var i = 0;

	switch(block.type)
	{
	case BT_ITEM_WIDTH:
		// 아이템 처리를 한다.
		bBlockMove = true;
		CHECK_BOMB_Map[block.iy][block.ix] = BOMB_CHECK;
		BG_Map[block.iy][block.ix].SetDamage();
		BLOCK_Map[block.iy][block.ix].SetDamage(0.2);
		SetScoreAni(BLOCK_Map[block.iy][block.ix].x, BLOCK_Map[block.iy][block.ix].y, tbItemScore[0]*scoreType, 1);
		SetSpineItemBombEffect(block.type, block.y, block.x);
		for(i=0;i<MAX_TILE_X;++i){
			if(CHECK_BOMB_Map[block.iy][i] == BOMB_NONE){
				CHECK_BOMB_Map[block.iy][i] = BOMB_CHECK;
				BG_Map[block.iy][i].SetDamage();
				if(BLOCK_Map[block.iy][i] != undefined) {
					var bb = BLOCK_Map[block.iy][i].SetDamage(0.2);
					if (bb != undefined) {
						if (bb.type != BT_ITEM_RAINBOW)
							SetItemEffect(bb, 2);
						else {
							bRainbowSelect = true;
							iRainbowY = bb.iy;
							iRainbowX = bb.ix;
							SetItemEffect(bb, 2, Mathfloor(Math.random() * tbBlockTypeMax[iStage]));
						}
					}
				}
			}
		}
		break;
	case BT_ITEM_HEIGHT:
		bBlockMove = true;
		CHECK_BOMB_Map[block.iy][block.ix] = BOMB_CHECK;
		BG_Map[block.iy][block.ix].SetDamage();
		BLOCK_Map[block.iy][block.ix].SetDamage(0.2);
		SetScoreAni(BLOCK_Map[block.iy][block.ix].x, BLOCK_Map[block.iy][block.ix].y, tbItemScore[1]*scoreType, 1);
		SetSpineItemBombEffect(block.type, block.y, block.x);
		for(i=0;i<MAX_TILE_Y;++i){
			if(CHECK_BOMB_Map[i][block.ix] == BOMB_NONE){
				CHECK_BOMB_Map[i][block.ix] = BOMB_CHECK;
				BG_Map[i][block.ix].SetDamage();
				if(BLOCK_Map[i][block.ix] != undefined) {
					var bb = BLOCK_Map[i][block.ix].SetDamage(0.2);
					if (bb != undefined) {
						if (bb.type != BT_ITEM_RAINBOW)
							SetItemEffect(bb, 2);
						else {
							bRainbowSelect = true;
							iRainbowY = bb.iy;
							iRainbowX = bb.ix;
							SetItemEffect(bb, 2, Mathfloor(Math.random() * tbBlockTypeMax[iStage]));
						}
					}
				}
			}
		}
		break;
	case BT_ITEM_BOMB:
		bBlockMove = true;
		CHECK_BOMB_Map[block.iy][block.ix] = BOMB_CHECK;
		BG_Map[block.iy][block.ix].SetDamage();
		BLOCK_Map[block.iy][block.ix].SetDamage(0.2);
		SetScoreAni(BLOCK_Map[block.iy][block.ix].x, BLOCK_Map[block.iy][block.ix].y, tbItemScore[2]*scoreType, 1);
		SetSpineItemBombEffect(block.type, block.y, block.x);
		for(var y=-1;y<=1;++y){
			for(var x=-1;x<=1;++x){
				if(CHECK_BOMB_Map[block.iy+y][block.ix+x] == BOMB_NONE){
					CHECK_BOMB_Map[block.iy+y][block.ix+x] = BOMB_CHECK;
					BG_Map[block.iy+y][block.ix+x].SetDamage(0.2);
					if(BLOCK_Map[block.iy+y][block.ix+x] != undefined) {
						var bb = BLOCK_Map[block.iy + y][block.ix + x].SetDamage();
						if (bb != undefined) {
							if (bb.type != BT_ITEM_RAINBOW)
								SetItemEffect(bb, 2);
							else {
								bRainbowSelect = true;
								iRainbowY = bb.iy;
								iRainbowX = bb.ix;
								SetItemEffect(bb, 2, Mathfloor(Math.random() * tbBlockTypeMax[iStage]));
							}
						}
					}
				}
			}
		}
		break;
	case BT_ITEM_CROSS:
		bBlockMove = true;
		CHECK_BOMB_Map[block.iy][block.ix] = BOMB_CHECK;
		BG_Map[block.iy][block.ix].SetDamage();
		BLOCK_Map[block.iy][block.ix].SetDamage(0.2);
		SetScoreAni(BLOCK_Map[block.iy][block.ix].x, BLOCK_Map[block.iy][block.ix].y, tbItemScore[3]*scoreType, 1);
		SetSpineItemBombEffect(block.type, block.y, block.x);
		for(i=0;i<MAX_TILE_X;++i){
			if(CHECK_BOMB_Map[block.iy][i] == BOMB_NONE){
				CHECK_BOMB_Map[block.iy][i] = BOMB_CHECK;
				BG_Map[block.iy][i].SetDamage();
				if(BLOCK_Map[block.iy][i] != undefined) {
					var bb = BLOCK_Map[block.iy][i].SetDamage(0.2);
					if (bb != undefined) {
						if (bb.type != BT_ITEM_RAINBOW)
							SetItemEffect(bb, 2);
						else {
							bRainbowSelect = true;
							iRainbowY = bb.iy;
							iRainbowX = bb.ix;
							SetItemEffect(bb, 2, Mathfloor(Math.random() * tbBlockTypeMax[iStage]));
						}
					}
				}
			}
		}
		for(var i=0;i<MAX_TILE_Y;++i){
			if(CHECK_BOMB_Map[i][block.ix] == BOMB_NONE){
				CHECK_BOMB_Map[i][block.ix] = BOMB_CHECK;
				BG_Map[i][block.ix].SetDamage();
				if(BLOCK_Map[i][block.ix] != undefined) {
					var bb = BLOCK_Map[i][block.ix].SetDamage(0.2);
					if (bb != undefined) {
						if (bb.type != BT_ITEM_RAINBOW)
							SetItemEffect(bb, 2);
						else {
							bRainbowSelect = true;
							iRainbowY = bb.iy;
							iRainbowX = bb.ix;
							SetItemEffect(bb, 2, Mathfloor(Math.random() * tbBlockTypeMax[iStage]));
						}
					}
				}
			}
		}
		break;
	case BT_ITEM_RAINBOW:
		if(bRainbowSelect == false) {
			bRainbowSelect = true;
			iRainbowY = block.iy;
			iRainbowX = block.ix;
			bCursor = true;
			spine_cursor.visible = true;
			spine_cursor.position.set(START_X + (block.ix * TILE_SIZE_X), START_Y + (block.iy * TILE_SIZE_Y));

			sBlock2.visible = true;
			for (i = 0; i < kBlock.length; ++i) {
				if (kBlock[i].type < BT_NEKO_MAX)
					sBlock3.addChild(kBlock[i].sprMain);
			}
			sBlock3.addChild(block.sprMain);
		}
		else
		{
			bBlockMove = true;
			bRainbowSelect = false;
			bCursor = false;
			spine_cursor.visible = false;

			sBlock2.visible = false;
			for (i = 0; i < kBlock.length; ++i) {
				if (kBlock[i].type < BT_NEKO_MAX)
					sBlock.addChild(kBlock[i].sprMain);
			}
			sBlock.addChild(BLOCK_Map[iRainbowY][iRainbowX].sprMain);
			sBlock.addChild(kHero.sprMain);

			// 레인보우 아이템 발동..처리..
			CHECK_BOMB_Map[iRainbowY][iRainbowX] = BOMB_CHECK;
			BG_Map[iRainbowY][iRainbowX].SetDamage();
			BLOCK_Map[iRainbowY][iRainbowX].SetDamage(0.2);

			for(i=0;i<kBlock.length;++i)
			{
				if(kBlock[i].type == rainbowType)
				{
				//	kData.iCatAchCnt[20]++;
				//	UpdateAchievements(20);
					CHECK_BOMB_Map[kBlock[i].iy][kBlock[i].ix] = BOMB_CHECK;
					BG_Map[kBlock[i].iy][kBlock[i].ix].SetDamage();
					kBlock[i].SetDamage(0.2);
					SetAroundBlockMinusHP(kBlock[i].iy, kBlock[i].ix);
					SetScoreAni(BLOCK_Map[block.iy][block.ix].x, BLOCK_Map[block.iy][block.ix].y, tbItemScore[4]*scoreType, 1);
					SetSpineItemBombEffect(block.type, kBlock[i].y, kBlock[i].x);
				}


			}
		}
		break;
	}
	//SaveDataInClient();
}

function CHECK_BOMB_Map_Init()
{
	for(var y=0;y<MAX_TILE_Y;++y)
		for(var x=0;x<MAX_TILE_X;++x)
			CHECK_BOMB_Map[y][x] = BOMB_NONE;
}

function SetTurn(num)
{
	iTurnNum = num;
	txtTurnNum.text = iTurnNum.toString();
}

function SetTurnAdd(num)
{
	iTurnNum += num;
	txtTurnNum.text = iTurnNum.toString();
}

//================================================================================
// 블럭을 클릭했을때 제어..
function cbDragStart(e)
{
	bHintInit = true;
	if(bBlockMove == true) return;
	if(this.touch == false && bRainbowSelect == false)	return;
	if(BG_Map[this.iy][this.ix].itemType == ITEM13) return;
	if(gameState != STATE_GAME_PLAY) return;

	// 초기화를 하기전에 체크를 먼저 한다.
//	if(kData.iCatAchCnt[41] < iOneTurnCnt)
//		kData.iCatAchCnt[41] = iOneTurnCnt;
//	iOneTurnCnt = 0;	// 초기화..
	if(bCursor == false){
		// 커서가 비활성화 이고 블럭을 눌렀으면 셋팅작업 시작..
		if(bDragStart == false){
			if(this.type < BT_ITEM_WIDTH){
				bDragStart = true;
				iDIY1 = this.iy;
				iDIX1 = this.ix;
				iDSY = e.data.global.y;
				iDSX = e.data.global.x;
			}else{
				// 아이템 셋팅을 한다.
				SetItemEffect(this, 1);
				if(this.type != BT_ITEM_RAINBOW)
					SetTurnAdd(-1);
			}
		}
	}else{
		if(bRainbowSelect == false){
			// 커서가 활성화 되어 있고 다른블럭일경우 바로 옆이면 스왑을 시켜준다.
			if(this.type >= BT_ITEM_WIDTH && this.type <= BT_ITEM_RAINBOW){
				bCursor = false;
				spine_cursor.visible = false;
				SetItemEffect(this, 1);
				if(this.type != BT_ITEM_RAINBOW)
					SetTurnAdd(-1);
			}
			else if((iDIY1 == this.iy && iDIX1 == this.ix) == false){
				if((Math.abs(iDIY1 - this.iy) == 1 && Math.abs(iDIX1 - this.ix) == 0) || (Math.abs(iDIY1 - this.iy) == 0 && Math.abs(iDIX1 - this.ix) == 1))
				{
					// 스왑시킨다.
					if(iDIX1 - this.ix == -1)	// 처음 눌린애가 right로 이동..
					{
						bBlockMove = true;
						bDragStart = false;
						iDragDirection = D_LEFT;

						iDIY2 = this.iy;
						iDIX2 = this.ix;
						this.state = BS_MOVE_LEFT;
						BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_RIGHT;
					//	kData.iCatAchCnt[51] = 0;
					}
					else if(iDIX1 - this.ix == 1)	// 처음눌린애가 left로 이동
					{
						bBlockMove = true;
						bDragStart = false;
						iDragDirection = D_RIGHT;

						iDIY2 = this.iy;
						iDIX2 = this.ix;
						this.state = BS_MOVE_RIGHT;
						BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_LEFT;
					//	kData.iCatAchCnt[50] = 0;
					}
					else if(iDIY1 - this.iy == -1)	// 처음눌린애가 bottom로 이동
					{
						bBlockMove = true;
						bDragStart = false;
						iDragDirection = D_TOP;

						iDIY2 = this.iy;
						iDIX2 = this.ix;
						this.state = BS_MOVE_TOP;
						BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_BOTTOM;
					//	kData.iCatAchCnt[49] = 0;
					}
					else if(iDIY1 - this.iy == 1)	// 처음눌린애가 top로 이동
					{
						bBlockMove = true;
						bDragStart = false;
						iDragDirection = D_BOTTOM;

						iDIY2 = this.iy;
						iDIX2 = this.ix;
						this.state = BS_MOVE_BOTTOM;
						BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_TOP;
					//	kData.iCatAchCnt[48] = 0;
					}
					bCursor = false;
					spine_cursor.visible = false;
				}else{
					bDragStart = true;
					iDIY1 = this.iy;
					iDIX1 = this.ix;
					iDSY = e.data.global.y;
					iDSX = e.data.global.x;
				}
			}
			else{
				bCursor = false;
				spine_cursor.visible = false;
			}
		}
		else // 레인보우 아이템 처리..
		{
			if(this.type < BT_NEKO_MAX){
				SetItemEffect(BLOCK_Map[iRainbowY][iRainbowX], 1, this.type);
				SetTurnAdd(-1);
			}else if(this.type == BT_ITEM_RAINBOW){
				if(iRainbowY == this.iy && iRainbowX == this.ix){ // 같은 레인보우아이템을 클릭했을경우.
					bRainbowSelect = false;
					bCursor = false;
					spine_cursor.visible = false;

					sBlock2.visible = false;
					for (i = 0; i < kBlock.length; ++i) {
						if (kBlock[i].type < BT_NEKO_MAX)
							sBlock.addChild(kBlock[i].sprMain);
					}
					sBlock.addChild(BLOCK_Map[iRainbowY][iRainbowX].sprMain);
					sBlock.addChild(kHero.sprMain);
				}else{	// 다른 레인보우 아이템을 클릭했을경우.
					bRainbowSelect = false;
					bCursor = false;
					spine_cursor.visible = false;
					SetItemEffect(this, 1);
				}
			}
		}
	}
}

function cbDragMove(e)
{
	if(bDragStart == true)
	{
		bCursor = false;
		spine_cursor.visible = false;

		if(START_X + (iDIX1*TILE_SIZE_X) - TILE_SIZE_X/2 >= e.data.global.x){
			if(BLOCK_Map[iDIY1][iDIX1 - 1] != undefined && BLOCK_Map[iDIY1][iDIX1 - 1].touch == true
				&& BG_Map[iDIY1][iDIX1 - 1].itemType != ITEM13){
				bBlockMove = true;
				iDragDirection = D_RIGHT;

				iDIY2 = iDIY1;
				iDIX2 = iDIX1 - 1;

				BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_LEFT;
				BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_RIGHT;
			}
			bDragStart = false;
		}
		else if(START_X + (iDIX1*TILE_SIZE_X) + TILE_SIZE_X/2 <= e.data.global.x)
		{
			if(BLOCK_Map[iDIY1][iDIX1 + 1] != undefined && BLOCK_Map[iDIY1][iDIX1 + 1].touch == true
				&& BG_Map[iDIY1][iDIX1 + 1].itemType != ITEM13){
				bBlockMove = true;
				iDragDirection = D_LEFT;

				iDIY2 = iDIY1;
				iDIX2 = iDIX1 + 1;
				BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_RIGHT;
				BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_LEFT;
			}
			bDragStart = false;
		}
		else if(START_Y + (iDIY1*TILE_SIZE_Y) - TILE_SIZE_Y/2 >= e.data.global.y)
		{
			if(BLOCK_Map[iDIY1 - 1][iDIX1] != undefined && BLOCK_Map[iDIY1 - 1][iDIX1].touch == true
				&& BG_Map[iDIY1 - 1][iDIX1].itemType != ITEM13){
				bBlockMove = true;
				iDragDirection = D_BOTTOM;

				iDIY2 = iDIY1 - 1;
				iDIX2 = iDIX1;
				BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_TOP;
				BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_BOTTOM;
			}
			bDragStart = false;
		}
		else if(START_Y + (iDIY1*TILE_SIZE_Y) + TILE_SIZE_Y/2 <= e.data.global.y)
		{
			if(BLOCK_Map[iDIY1 + 1][iDIX1] != undefined && BLOCK_Map[iDIY1 + 1][iDIX1].touch == true
				&& BG_Map[iDIY1 + 1][iDIX1].itemType != ITEM13){
				bBlockMove = true;
				iDragDirection = D_TOP;

				iDIY2 = iDIY1 + 1;
				iDIX2 = iDIX1;
				BLOCK_Map[iDIY1][iDIX1].state = BS_MOVE_BOTTOM;
				BLOCK_Map[iDIY2][iDIX2].state = BS_MOVE_TOP;
			}
			bDragStart = false;
		}
	}
}
function cbDragEnd()
{
	// 여기까지 오게 되면 커서를 활성화 시킨다.
	if(bDragStart == true)
	{
		bDragStart = false;
		bCursor = true;
		spine_cursor.visible = true;
		spine_cursor.position.set(START_X + (iDIX1*TILE_SIZE_X), START_Y + (iDIY1*TILE_SIZE_Y))
	}
}

function cbButtonWhite()
{
	// 블랙 약간 투명부분이 터치가 통과하지 않게 막아준다.
	// 여기서는 뒤쪽 터치를 막기위한 용도이므로 아무짓도 하지 않는다.
}

function cbButtonSoundBGM()
{
	if(kData.bSoundBGM == true)
	{
		kData.bSoundBGM = false;
		kData.bSoundSE = false;
		BGMSoundPause();
	}
	else
	{
		kData.bSoundBGM = true;
		kData.bSoundSE = true;
		BGMSoundResume();
	}
	networkManager.ForcedSaveData();
	SetSoundIcon();
}
/*
function cbButtonSoundSE()
{
	if(kData.bSoundSE == true)
		kData.bSoundSE = false;
	else
		kData.bSoundSE = true;
 networkManager.ForcedSaveData();
	SetSoundIcon();
}
*/
function SetSoundIcon()
{
	if(kData.bSoundBGM == true) {
		sprSoundBGM.sprite.texture = PIXI.Texture.fromFrame("btn_pause_sound.png");
		sprSoundSE.sprite.texture = PIXI.Texture.fromFrame("btn_pause_sound.png");
		if(yahooIN != undefined && biPhone == true)
			sprJPSound.sprite.texture = PIXI.Texture.fromFrame("btn_pause_sound.png");
	}
	else {
		sprSoundBGM.sprite.texture = PIXI.Texture.fromFrame("btn_pause_sound_off.png");
		sprSoundSE.sprite.texture = PIXI.Texture.fromFrame("btn_pause_sound_off.png");
		if(yahooIN != undefined && biPhone == true)
			sprJPSound.sprite.texture = PIXI.Texture.fromFrame("btn_pause_sound_off.png");
	}

//	if(kData.bSoundSE == true)
//		sprSoundSE.texture = PIXI.Texture.fromFrame("popup_btn_6_sound_on.png");
//	else
//		sprSoundSE.texture = PIXI.Texture.fromFrame("popup_btn_6_sound_off.png");
}

function cbButtonCheatDataInit()
{
	SESoundPlay(SE_ButtonClick);
	InitData();
}

//var sprLogo;
//로딩바 전역변수 설정
var loadingcount = 0;           //로딩    카운트
var loadingcountmax = 58;      //로딩맥스 카운트
var loadingscalemax = 0;    //스케일 480보다 1많게
var progSX;
var progSY;
var progSH;

var kMGMenu;	// yahooIN : 추가.
function cbLogoComplete()
{
	 // 로딩바 준비 셋팅                       <----여기서부터 복사시작
	var iSH = iCenterSizeY - 130;
	/*var spr = SpriteLoad(sLoading, strGamePath+"../Common/load/movi_01.png", iCenterSizeX, iSH);
	SpriteLoad(sLoading, strGamePath+"../Common/load/movi_03.png", iCenterSizeX, iSH + 170);
	sprLogoProg = SpriteLoad(sLoading, strGamePath+"../Common/load/movi_02.png", iCenterSizeX, iSH);
	sprLogoProg.alpha = 0;
	progSX = iCenterSizeX-(spr.width/2);
	progSY = iSH-(spr.height/2);
	progSH = spr.height;
	loadingscalemax = spr.width;
	sprLogoMask = new PIXI.Graphics();
	sprLogoMask.lineStyle(1, 0xff00ff, 1);
	sprLogoMask.beginFill(0xff00ff, 1);
	sprLogoMask.drawRect(progSX, progSY, 0, progSH, 15);
	sprLogoMask.endFill();
	sprLogoProg.mask = sprLogoMask;*/
	this.zhuye002 = SpriteLoad(sLoading, strGamePath+"../Common/load/zhuye002.png", iCenterSizeX, iCenterSizeY);

	this.zhuye002.anchor.set(.5),
		this.zhuye002.scale.set(.1),
		this.zhuye002.rotation = 20,
		this.tween ? this.tween.kill() : this.tween = new TimelineLite,
		this.tween.to(this.zhuye002, 1, {
			rotation: 0, ease: Sine.easeOut
		}),
		this.tween.call(showLocoText.bind(this)),
		TweenMax.to(this.zhuye002.scale, 1, {x: 0.5, y: 0.5});

	function showLocoText() {
		TweenMax.to(this.zhuye002, 0.2, {
			x: iCenterSizeX + 50, ease: Sine.easeIn
		});

		this.loading02 = SpriteLoad(sLoading, strGamePath+"../Common/load/loading02.png", iCenterSizeX - 70, 610);
		this.loading02.anchor.set(.5);
		this.loading02.scale.set(.2);
		//this.loading02.alpha = 0;
		/*TweenMax.to(this.loading02, 1, {
            alpha: 1, ease: Sine.easeOut
        });*/

		TweenMax.to(this.loading02.scale, 0.3, {x: 0.6, y: 0.6, ease: Sine.easeOut, onComplete:(function () {
				TweenMax.to(this.loading02.scale, 0.2, {x: 0.5, y: 0.5, onComplete:(function () {

					}).bind(this)});
			}).bind(this)});
	}

	// yahooIN : _data 추가
	networkManager.LoadData(function (_data) {
		var loader = PIXI.loader;
		var i = 0;
		for (i = 0; i < tbImgGame.length; ++i)
			loader.add(tbATLAS[lang]+tbImgGame[i], strGamePath+tbATLAS[lang]+tbImgGame[i]);//+"?v="+xxIVer);
		loader.add('spine_block_bomb_eff', strGamePath+tbSPINE[lang] + '/block_bomb_eff.json');
		loader.add('spine_nekopang_character', strGamePath+tbSPINE[lang] + '/nekopang_character.json');
		loader.add('spine_cursor', strGamePath+tbSPINE[lang] + '/cursor.json');
		loader.add('spine_foot_bomb_eff_big', strGamePath+tbSPINE[lang] + '/foot_bomb_eff_big.json');
		loader.add('spine_foot_bomb_eff_small', strGamePath+tbSPINE[lang] + '/foot_bomb_eff_small.json');
		loader.add('spine_item_bomb_eff', strGamePath+tbSPINE[lang] + '/item_bomb_eff.json');
		loader.add('spine_ready_start', strGamePath+tbSPINE[lang] + '/ready_start.json');
		loader.add('spine_nekopang_title', strGamePath+tbSPINE[lang] + '/nekopang_title.json');
		loader.add('spine_goal_popup_ani', strGamePath+tbSPINE[lang] + '/goal_popup_ani.json');
		loader.add('spine_hint_eff', strGamePath+tbSPINE[lang] + '/hint_eff.json');
		loader.add('spine_combo_ani', strGamePath+tbSPINE[lang] + '/combo_ani.json');
		loader.add('spine_heart_bomb', strGamePath+tbSPINE[lang] + '/heart_bomb.json');

		//bitmapFont
		loader.add("turn", strGamePath+"font/turn-export.xml");
		loader.add("shop_no", strGamePath+"font/shop_no-export.xml");
		loader.add("cat_block_1_number", strGamePath+"font/cat_block_1_number-export.xml");
		loader.add("cat_block_2_number", strGamePath+"font/cat_block_2_number-export.xml");
		loader.add("cat_block_3_number", strGamePath+"font/cat_block_3_number-export.xml");
		loader.add("cat_block_4_number", strGamePath+"font/cat_block_4_number-export.xml");
		loader.add("cat_block_5_number", strGamePath+"font/cat_block_5_number-export.xml");
		loader.add([{name: tbSoundName[0][0], url: tbSoundName[0]}]);	// 사운드 로드.
		loader.add([{name: tbSoundName[1][0], url: tbSoundName[1]}]);	// 사운드 로드.
//	loadingcountmax = loader._numToLoad;
		loader.once('complete', cbImageDownComplete);
		loader.load();

		// 랭귀지 설정
		CURRENT_LANGUAGE = tbLang[lang];
		// yahooIN : 추가.
		// 가로세로, 타이틀, 설명, 랭킹 ['DAILY', 'TOTAL'], 픽시버젼, kData 모비포인트 변수명
		kMGMenu = new MGMenu(MGM_VERTICAL, GetString("MGM_Title"), GetString("MGM_Contents"), [], 4, 'iMoviPoint');
		if (_data != null)
			kMGMenu.load(_data.user_id);
		else
			kMGMenu.load("GUEST");

		if(yahooIN === undefined && bMGCHEAT == false)
			kMGMenu.HideMenu();
	});
}

// yahooIN : 아래 두변수 추가.
var biPhone = false;
var sprJPSound;
function cbImageDownComplete(loader, res)
{
	if (this.tween) this.tween.kill();
	this.zhuye002.destroy(true, true);
	if (this.loading02) this.loading02.destroy(true, true);

	stage.removeChild(sLoading);
//	sprLogo.destroy(false, false);
	sLoading.destroy();
//	txtLoading.destroy(true, true);
	stage.addChild(sTitle);

	// modifier : kook : 일본대응 : 아이폰일경우 사운드가 초반에 출력되지 않아 임시로 셋팅한다.
	if(yahooIN != undefined) {
		if (/Android/i.test(navigator.userAgent)) {
			biPhone = false;
		} else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			biPhone = true;
		} else {
			biPhone = false;
		}
	}

	GameViewSetting(res); // 화면구성을 한다.
	stage.addChild(kMGMenu.main);// yahooIN : 추가.
	state = STATE_TITLE;
	fTimeDelay = 0;

	// 사운드 처리 : yahooIN : 사운드경로에 strGamePath를 추가한다.
	arrBGM[BGM_Title] = new Howl({src:tbSoundName[0][0]});
	arrBGM[BGM_Game] = new Howl({src:tbSoundName[1][0]});
	if(yahooIN != undefined && biPhone == true){// modifier : kook : 일본대응 : 임시방편..
		kData.bSoundBGM = true;
		cbButtonSoundBGM();
	}
	BGMSoundPlay(BGM_Title);

	var loader = PIXI.loader;
	for(var i=2;i<tbSoundName.length;++i)
		loader.add({name:tbSoundName[i][0], url:tbSoundName[i]});
	loader.load(function(){
		for(var i=2;i<tbSoundName.length;++i)
			arrSE[i-2] = new Howl({src:tbSoundName[i][0]});
	});
}
/*
function SetComboAni(combo)
{
	switch(combo)
	{
	case 0:
	case 1:
	case 2:
		break;
	case 3:
	case 4:
	case 5:
	//	SESoundPlay(SE_Combo);
		sCombo.visible = true;
		if(sCombo.tween != undefined)
			sCombo.tween.stop();
		sCombo.alpha = 1;
		sCombo.position.set(0, 0);
		sprExcellent.texture = PIXI.Texture.fromFrame("message_wow.png");
		txtComboNum.text = combo.toString();
		sCombo.tween = TweenPlay(sCombo, 1, 0, null, {y:-70, alpha:0.6}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
		break;
	case 6:
	case 7:
	case 8:
	//	SESoundPlay(SE_Combo);
		sCombo.visible = true;
		if(sCombo.tween != undefined)
			sCombo.tween.stop();
		sCombo.alpha = 1;
		sCombo.position.set(0, 0);
		sprExcellent.texture = PIXI.Texture.fromFrame("message_excellent.png");
		txtComboNum.text = combo.toString();
		sCombo.tween = TweenPlay(sCombo, 1, 0, null, {y:-70, alpha:0.6}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
		break;
	default: // 9콤보 이상.
	//	SESoundPlay(SE_Combo);
		sCombo.visible = true;
		if(sCombo.tween != undefined)
			sCombo.tween.stop();
		sCombo.alpha = 1;
		sCombo.position.set(0, 0);
		sprExcellent.texture = PIXI.Texture.fromFrame("message_fantastic.png");
		txtComboNum.text = combo.toString();
		sCombo.tween = TweenPlay(sCombo, 1, 0, null, {y:-70, alpha:0.6}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
		break;
	}

	sprCombo.position.set(iCenterSizeX - (txtComboNum.width/2), sprCombo.position.y);
}
*/
//게임화면 구성.
function GameViewSetting(res)
{
	//========================================================================
	// 변수 초기화 : 최초 한번만 초기화 한다.
	var i;
	var spr;
	var spr2;
	var spr3;
	var spr20;
	var btn;
//	InitAchievements();	// 업적시스템 초기화.
	//========================================================================
	// 타이틀화면 구성.
//	spr = SpriteLoad(sMenuGemShopPopup, "white.png", iCenterSizeX, iCenterSizeY);
//	spr.scale.set(iMaxSizeX, iMaxSizeY);
//	spr.tint = 0x000000;
//	spr.alpha = 0.0;
//	spr.interactive = true;
//	spr.on('click', cbButtonWhite2);
//	spr.on('tap', cbButtonWhite2);
	spine_nekopang_title = new PIXI.spine.Spine(res.spine_nekopang_title.spineData);
	spine_nekopang_title.interactive = true;
	spine_nekopang_title.on('click', cbButtonTitle);
	spine_nekopang_title.on('tap', cbButtonTitle);
	spine_nekopang_title.state.addListener({complete:function(entry){
		switch(entry.trackIndex){
			case 1:
				SpinePlay(spine_nekopang_title, iCenterSizeX, iCenterSizeY, "nekopang_title_idle", 0, true);
				break;
		}
	}});
	SpinePlay(spine_nekopang_title, iCenterSizeX, iCenterSizeY, "nekopang_title_in", 1, false);
	sTitle.addChild(spine_nekopang_title);

	// yahooIN :
	/*if(document.location.href.indexOf("game.com") > 0){
		FontLoad(sTitle, "Copyright Ⓒ 2017 Game Corp. All rights reserved", iCenterSizeX, iCenterSizeY + 610, 0.5, 0.5,
			{fontFamily: 'Arial', fontSize: '18px', fontWeight: 'bold', fill: '#000000', align: "center"});
	}else{
		FontLoad(sTitle, "(C)  Co.,Ltd. 2017 All Rights Reserved.", iCenterSizeX, iCenterSizeY + 610, 0.5, 0.5,
			{fontFamily:'Arial', fontSize:'18px', fontWeight:'bold', fill:'#000000', align:"center"});
	}*/

	if(yahooIN != undefined && biPhone == true)
		sprJPSound = new Button(sTitle, "btn_pause_sound.png", iCenterSizeX + 280, iCenterSizeY + 545, cbButtonSoundBGM, "scaleUp", 0.6, 0.6);
	//========================================================================
	// 스테이지 선택화면 구성
	spr = SpriteLoad(sStageSelect, "select_bg.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(2);
	new Button(sStageSelect, "album.png", iCenterSizeX + 200, iCenterSizeY - 580, cbButtonAlbum, "scaleDown");
	sprSoundSE = new Button(sStageSelect, "btn_pause_sound.png", iCenterSizeX + 300, iCenterSizeY - 580, cbButtonSoundBGM, "scaleDown", 0.6, 0.6);
	spr = SpriteSliceLoad(sStageSelect, "popup_select.png", iCenterSizeX, iCenterSizeY + 50, 670, 1150);
	spr2 = SpriteLoad(spr, "title.png", 0, -512);
	FontLoad(spr2, GetString("STAGESELECT"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 1010);
	sprArrowLeft = new Button(spr2, "btn_arrow.png", -220, 435, cbButtonArrowLeft, "scaleDown");
	sprArrowRight = new Button(spr2, "btn_arrow.png", 220, 435, cbButtonArrowRight, "scaleDown", -1, 1);
	spr3 = SpriteSliceLoad(spr2, "page.png", 0, 430, 280, 70);
	txtPage = FontLoad(spr3, "1 / 25", 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});

	kStageInfo[0] = new StageInfo(sStageSelect, iCenterSizeX - 200, iCenterSizeY - 385, cbButtonStageClick0);
	kStageInfo[1] = new StageInfo(sStageSelect, iCenterSizeX, iCenterSizeY - 385, cbButtonStageClick1);
	kStageInfo[2] = new StageInfo(sStageSelect, iCenterSizeX + 200, iCenterSizeY - 385, cbButtonStageClick2);
	kStageInfo[3] = new StageInfo(sStageSelect, iCenterSizeX - 200, iCenterSizeY - 170, cbButtonStageClick3);
	kStageInfo[4] = new StageInfo(sStageSelect, iCenterSizeX, iCenterSizeY - 170, cbButtonStageClick4);
	kStageInfo[5] = new StageInfo(sStageSelect, iCenterSizeX + 200, iCenterSizeY - 170, cbButtonStageClick5);
	kStageInfo[6] = new StageInfo(sStageSelect, iCenterSizeX - 200, iCenterSizeY + 45, cbButtonStageClick6);
	kStageInfo[7] = new StageInfo(sStageSelect, iCenterSizeX, iCenterSizeY + 45, cbButtonStageClick7);
	kStageInfo[8] = new StageInfo(sStageSelect, iCenterSizeX + 200, iCenterSizeY + 45, cbButtonStageClick8);
	kStageInfo[9] = new StageInfo(sStageSelect, iCenterSizeX - 200, iCenterSizeY + 260, cbButtonStageClick9);
	kStageInfo[10] = new StageInfo(sStageSelect, iCenterSizeX, iCenterSizeY + 260, cbButtonStageClick10);
	kStageInfo[11] = new StageInfo(sStageSelect, iCenterSizeX + 200, iCenterSizeY + 260, cbButtonStageClick11);
	ShowStageSelect();

//	spr = SpriteLoad(sStageSelect, "cat/1.png", iCenterSizeX, iCenterSizeY);
//	var filter = AsciiFilter();
//	var filter = new PIXI.filters.PixelateFilter();
//	var filters = [filter];
//	spr.filters = filters;
	spr = SpriteLoad(sFilm, "select_film.png", iCenterSizeX - 205, iCenterSizeY - 590);
	//new Button(spr, "btn_plus.png", 100, 7, cbButtonShop, "scaleDown");
	txtLifeCnt = FontLoad(spr, kData.iLife.toString(), -103, 5, 0.5, 0.5,
		{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#005752', strokeThickness:4, dropShadow:true, dropShadowColor:'#000000', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	//txtLifeTime = FontLoad(spr, "30:00", 0, 5, 0.5, 0.5,
	//	{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#000000', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	sStageSelect.addChild(sFilm);
	stage.addChild(sStageSelect);
	sStageSelect.visible = false;

	/*networkManager.GetServerTime(function (_time) {
		if(loginTF == 0){
			if(kData.fServerTime != null){
				var lostTime = (_time - kData.fServerTime);
				LostTime(lostTime);
			}
			kData.fServerTime = _time;
			networkManager.ForcedSaveData();
		}
		iLifeState = 1;
	});*/
	//========================================================================
	// 스테이지 정보 화면.
	spr = SpriteLoad(sStageInfo, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spr = SpriteSliceLoad(sStageInfoSub, "popup_select.png", 0, 50, 670, 900);
	spr2 = SpriteLoad(spr, "title.png", 0, -387);
	new Button(spr, "btn_close.png", 320, -430, cbButtonStageInfoClose, "scaleDown");
	txtStageNo = FontLoad(spr2, GetString("STAGE") + " 001", 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 760);
	spr3 = SpriteLoad(spr2, "start_map.png", 0, -210);
	spr3.addChild(sStageInfoMap);
	for(var y=0;y<MAX_TILE_Y;++y) {
		sprStageMap[y] = [];
		for (var x=0;x<MAX_TILE_X;++x) {
			sprStageMap[y][x] = SpriteLoad(sStageInfoMap, "map/tile_normal.png", -100 + (x*20), -135 + (y*20));
			sprStageMap[y][x].scale.set(0.24);
			sprStageMap[y][x].visible = false;
		}
	}
	SpriteLoad(spr2, "start_rope.png", -155, -50);
	spr3 = SpriteLoad(spr2, "start_rope.png", 155, -50);
	spr3.scale.set(-1, 1);

	spr20 = new PIXI.Container();
	spr2.addChild(spr20);
	spr20.position.set(-215, -30);
	spr20.rotation = 6.55;
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprStageInfoBG[0] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprStageInfoBG[0].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprStageInfoCat[0] = SpriteLoad(spr3, "cat/1.png", 0, 10, 0.5, 0);
	sprStageInfoCat[0].scale.set(0.6);
	sprStageInfoClip[0] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	TweenMax.fromTo(spr20, 1,
			{rotation:6.55-0.03},
			{yoyo:true, repeat:-1, rotation:6.55+0.03, ease:Power0.easeNone});

	spr20 = new PIXI.Container();
	spr2.addChild(spr20);
	spr20.position.set(-73, -5);
	spr20.rotation = 6.35;
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprStageInfoBG[1] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprStageInfoBG[1].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprStageInfoCat[1] = SpriteLoad(spr3, "cat/51.png", 0, 10, 0.5, 0);
	sprStageInfoCat[1].scale.set(0.6);
	sprStageInfoClip[1] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	TweenMax.fromTo(spr20, 1,
			{rotation:6.35-0.03},
			{yoyo:true, repeat:-1, rotation:6.35+0.03, ease:Power0.easeNone});

	spr20 = new PIXI.Container();
	spr2.addChild(spr20);
	spr20.position.set(73, -5);
	spr20.rotation = -6.35;
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprStageInfoBG[2] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprStageInfoBG[2].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprStageInfoCat[2] = SpriteLoad(spr3, "cat/151.png", 0, 10, 0.5, 0);
	sprStageInfoCat[2].scale.set(0.6);
	sprStageInfoClip[2] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	TweenMax.fromTo(spr20, 1,
			{rotation:-6.35-0.03},
			{yoyo:true, repeat:-1, rotation:-6.35+0.03, ease:Power0.easeNone});

	spr20 = new PIXI.Container();
	spr2.addChild(spr20);
	spr20.position.set(215, -30);
	spr20.rotation = -6.55;
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprStageInfoBG[3] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprStageInfoBG[3].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprStageInfoCat[3] = SpriteLoad(spr3, "cat/1.png", 0, 10, 0.5, 0);
	sprStageInfoCat[3].scale.set(0.6);
	sprStageInfoClip[3] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	TweenMax.fromTo(spr20, 1,
			{rotation:-6.55-0.03},
			{yoyo:true, repeat:-1, rotation:-6.55+0.03, ease:Power0.easeNone});

	spr3 = SpriteSliceLoad(spr2, "page.png", 0, 215, 430, 70);
	txtBestScore = FontLoad(spr3, GetString("SCORE") + " 1,000,000", 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'42px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	spr = SpriteSliceLoad(sStageInfoSub, "btn_start.png", 0, 0, 450, 97);
	FontLoad(spr, GetString("START"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 0, 310, cbButtonStageInfoStartAni, "scaleDown", 1, 1, 0.5, 0.5, spr);

	stage.addChild(sStageInfo);
	sStageInfoSub.position.set(iCenterSizeX, iCenterSizeY);
	sStageInfo.addChild(sStageInfoSub);
	sStageInfo.visible = false;
	//========================================================================
	// 앨범화면 구성.
	spr = SpriteLoad(sAlbumInfo, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spr = SpriteSliceLoad(sAlbumInfoSub, "popup_select.png", 0, 50, 670, 1150);
	spr2 = SpriteLoad(spr, "title.png", 0, -512);
	new Button(spr, "btn_close.png", 320, -550, cbButtonAlbumInfoClose, "scaleDown");
	FontLoad(spr2, GetString("ALBUM"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 1010);
	for(i=0;i<6;++i)
	{
		spr3 = SpriteLoad(spr2, "photo_bg"+(i+1)+".png", -250 + (i*100), -415);
		spr3.scale.set(0.18, 0.25);
	//	sprAlbumType[i] = SpriteLoad(spr2, "tab_album_normal.png", -250 + (i*100), -415);
		sprAlbumType[i] = new Button(spr2, "tab_album_normal.png", -250 + (i*100), -415, eval("cbButtonAlbumType"+i), "none");
		sprAlbumAllClear[i] = SpriteLoad(sprAlbumType[i].main, "album_clear.png", 0, -60);
		sprAlbumNew[i] = SpriteLoad(sprAlbumType[i].main, "exclamation.png", 30, -60);
		FontLoad(sprAlbumAllClear[i], GetString("ALLCLEAR"), -3, -14, 0.5, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'17px', fontWeight:'bold', align:'center', fill:'#ffffff', lineHeight:19, stroke:'#7C0103', strokeThickness:5});
		txtAlbumTypePer[i] = FontLoad(sprAlbumType[i].main, "100%", 0, 45, 0.5, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'30px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#41726F', strokeThickness:6});
	}
	SpriteSliceLoad(spr, "album_line.png", 0, -285, 610, 34, 24, 24, 31, 1);

	spr = SpriteLoad(spr2, "white.png", -155, -135);
	spr.scale.set(270/4, 280/4);
	spr.tint = 0x00B8A8;
	sprAlbumBG[0] = SpriteLoad(spr2, "photo_bg1.png", -155, -135);
	sprAlbumBG[0].scale.set(0.56, 0.56);
	spr3 = SpriteLoad(spr2, "album_photo.png", -155, -135);
	sprAlbumCat[0] = SpriteLoad(spr3, "cat/1.png", 0, -35);
	sprAlbumCatNew[0] = SpriteLoad(spr3, "exclamation.png", 120, -140);
	txtAlbumCatNum[0] = FontLoad(spr3, "STAGE.1-1", 0, 112, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#118D7F', stroke:'#ffffff', strokeThickness:4});

	spr = SpriteLoad(spr2, "white.png", 155, -135);
	spr.scale.set(270/4, 280/4);
	spr.tint = 0x00B8A8;
	sprAlbumBG[1] = SpriteLoad(spr2, "photo_bg1.png", 155, -135);
	sprAlbumBG[1].scale.set(0.56, 0.56);
	spr3 = SpriteLoad(spr2, "album_photo.png", 155, -135);
	sprAlbumCat[1] = SpriteLoad(spr3, "cat/1.png", 0, -35);
	sprAlbumCatNew[1] = SpriteLoad(spr3, "exclamation.png", 120, -140);
	txtAlbumCatNum[1] = FontLoad(spr3, "STAGE.1-2", 0, 112, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#118D7F', stroke:'#ffffff', strokeThickness:4});

	spr = SpriteLoad(spr2, "white.png", -155, 195);
	spr.scale.set(270/4, 280/4);
	spr.tint = 0x00B8A8;
	sprAlbumBG[2] = SpriteLoad(spr2, "photo_bg1.png", -155, 195);
	sprAlbumBG[2].scale.set(0.56, 0.56);
	spr3 = SpriteLoad(spr2, "album_photo.png", -155, 195);
	sprAlbumCat[2] = SpriteLoad(spr3, "cat/1.png", 0, -35);
	sprAlbumCatNew[2] = SpriteLoad(spr3, "exclamation.png", 120, -140);
	txtAlbumCatNum[2] = FontLoad(spr3, "STAGE.1-3", 0, 112, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#118D7F', stroke:'#ffffff', strokeThickness:4});

	spr = SpriteLoad(spr2, "white.png", 155, 195);
	spr.scale.set(270/4, 280/4);
	spr.tint = 0x00B8A8;
	sprAlbumBG[3] = SpriteLoad(spr2, "photo_bg1.png", 155, 195);
	sprAlbumBG[3].scale.set(0.56, 0.56);
	spr3 = SpriteLoad(spr2, "album_photo.png", 155, 195);
	sprAlbumCat[3] = SpriteLoad(spr3, "cat/1.png", 0, -35);
	sprAlbumCatNew[3] = SpriteLoad(spr3, "exclamation.png", 120, -140);
	txtAlbumCatNum[3] = FontLoad(spr3, "STAGE.1-4", 0, 112, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#118D7F', stroke:'#ffffff', strokeThickness:4});

	sprAlbumArrowLeft = new Button(spr2, "btn_arrow.png", -220, 435, cbButtonAlbumArrowLeft, "scaleDown");
	sprAlbumArrowNew[0] = SpriteLoad(sprAlbumArrowLeft.main, "exclamation.png", -40, -40);
	sprAlbumArrowRight = new Button(spr2, "btn_arrow.png", 220, 435, cbButtonAlbumArrowRight, "scaleDown", -1, 1);
	sprAlbumArrowNew[1] = SpriteLoad(sprAlbumArrowRight.main, "exclamation.png", 40, -40);
	spr3 = SpriteSliceLoad(spr2, "page.png", 0, 430, 280, 70);
	txtAlbumPage = FontLoad(spr3, "1 / 50", 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
//	UpdateAlbumUI();

//	spr = SpriteLoad(sStageSelect, "cat/1.png", iCenterSizeX, iCenterSizeY);
//	var filter = AsciiFilter();
//	var filter = new PIXI.filters.PixelateFilter();
//	var filters = [filter];
//	spr.filters = filters;

	stage.addChild(sAlbumInfo);
	sAlbumInfo.addChild(sAlbumInfoSub);
	sAlbumInfoSub.position.set(iCenterSizeX, iCenterSizeY);
	sAlbumInfo.visible = false;
	//========================================================================
	// 게임화면 구성.
	SetBG();
	txtStage = new PIXI.MultiStyleText(GetString("STAGE2", (iStage+1)), {
		def: { font: "bold 30px " + tbTTF[lang], fill: "#FFF498", align:'center', valign:'middle', stroke:'#000000', strokeThickness:5},
		c: { font: "bold 30px " + tbTTF[lang], fill:"#ffffff", align:'center', valign:'middle', stroke:'#000000', strokeThickness:5}
	});
	txtStage.anchor.set(0, 0.5);
	txtStage.position.set(iCenterSizeX - 350, iCenterSizeY - 605);
	sGame.addChild(txtStage);
//	FontLoad(sGame, "SCORE", iCenterSizeX - 90, iCenterSizeY - 605, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'21px', fontWeight:'bold', align:'center', fill:'#FFF498', stroke:'#000000', strokeThickness:5});
//	txtScore = FontLoad(sGame, GetComma(iScore), iCenterSizeX - 45, iCenterSizeY - 606, 0, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'30px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#000000', strokeThickness:5});
	txtScore = new PIXI.MultiStyleText(GetString("SCORE2", GetComma(1000000)), {
		def: { font: "bold 30px " + tbTTF[lang], fill: "#FFF498", align:'center', stroke:'#000000', strokeThickness:5},
		c: { font: "bold 30px " + tbTTF[lang], fill:"#ffffff", align:'center', stroke:'#000000', strokeThickness:5}
	});
	txtScore.anchor.set(0.5);
	txtScore.position.set(iCenterSizeX, iCenterSizeY - 605);
	sGame.addChild(txtScore);

	new Button(sGame, "album.png", iCenterSizeX + 215, iCenterSizeY - 590, cbButtonAlbum, "scaleDown");
	new Button(sGame, "pause.png", iCenterSizeX + 315, iCenterSizeY - 595, cbButtonOption, "scaleDown");
	spr = SpriteSliceLoad(sGame, "turn_bg.png", iCenterSizeX - 240, iCenterSizeY - 425, 230, 130);
	spr2 = SpriteLoad(spr, "cat.png", -50, 0);
	spr2.scale.set(0.35);
	txtRoadNum = new PIXI.MultiStyleText(GetString("Turn"), {
        		def: { font: "bold 25px " + tbTTF[lang], fill: "#ffffff", align:'center', stroke:'#000000', strokeThickness:5},
        		c: { font: "bold 25px " + tbTTF[lang], fill:"#FEFF04", align:'center', stroke:'#000000', strokeThickness:5}
		    });
	spr.addChild(txtRoadNum);
	txtRoadNum.position.set(-5, -32);
	spr = SpriteSliceLoad(sGame, "turn_bg.png", iCenterSizeX + 240, iCenterSizeY - 450, 225, 180);
	FontLoad(spr, "MOVES", 0, -50, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'30px', fontWeight:'bold', align:'center', fill:'#FEFF04', lineJoin:"round", stroke:'#000000', strokeThickness:5});
	txtTurnNum = BitmapFontLoad(spr, iTurnNum.toString(), 0, 20, 0.5, 0.5,
	{font:'88px turn', align:'center', tint: 0xffffff});

//	for(i=0;i<iAddTurnNumMax;++i)
//	{
//		txtAddTurnNum[i] = BitmapFontLoad(spr, "", -265 + (txtTurnNum.textWidth/2), -49, 0, 0.5,
//				{font:'80px yellow_number', align: 'center', tint: 0xffffff});
//		txtAddTurnNum[i].visible = false;
//	}
	//========================================================================
	// 맵 구성(sMap), 로드 구성(sRoad), sBGBlock구성.
	//========================================================================
	// 블럭구성.
	for(i=0;i<MAX_TILE_Y*MAX_TILE_X;++i)
	{
		kBlockDeck[i] = new Block(sBlock, cbDragStart, cbDragMove, cbDragEnd,
				res.spine_nekopang_character.spineData);
		kBlockDeck[i].SetVisible(false);
	}

	for(i=0;i<5;++i){
		spine_hint_eff[i] = new PIXI.spine.Spine(res.spine_hint_eff.spineData);
		sBlock.addChild(spine_hint_eff[i]);
		SpinePlay(spine_hint_eff[i], iCenterSizeX, iCenterSizeY, "hint_eff", 0, true);
		spine_hint_eff[i].visible = false;
	}

	for(var y=0;y<MAX_TILE_Y;++y)
		for(var x=0;x<MAX_TILE_X;++x)
			BG_Map[y][x] = new Map(START_X + (x*TILE_SIZE_X), START_Y + (y*TILE_SIZE_Y));

	spine_cursor = new PIXI.spine.Spine(res.spine_cursor.spineData);
	sBlock3.addChild(spine_cursor);
	SpinePlay(spine_cursor, iCenterSizeX, iCenterSizeY, "cursor_idle", 0, true);
	spine_cursor.visible = false;

	for(i=0;i<ispine_block_bomb_eff_max;++i)
	{
		spine_block_bomb_eff[i] = new PIXI.spine.Spine(res.spine_block_bomb_eff.spineData);
		sBlock3.addChild(spine_block_bomb_eff[i]);
		spine_block_bomb_eff[i].visible = false;
		spine_block_bomb_eff[i].state.addListener({complete:function(entry){
			switch(entry.trackIndex){
				case 1:
					this.visible = false;
					break;
			}
		}});
	}
//	SpinePlay(spine_block_bomb_eff[ispine_block_bomb_eff_cnt], 100, 100, "armor_block_bomb", 2, true);

	for(i=0;i<ispine_item_bomb_eff_max;++i)
	{
		spine_item_bomb_eff[i] = new PIXI.spine.Spine(res.spine_item_bomb_eff.spineData);
		sBlock3.addChild(spine_item_bomb_eff[i]);
		spine_item_bomb_eff[i].state.timeScale = 2;
		spine_item_bomb_eff[i].visible = false;
		spine_item_bomb_eff[i].state.addListener({complete:function(entry){
			switch(entry.trackIndex){
				case 1:
					this.visible = false;
					break;
			}
		}});
	}
	for(i=0;i<ispine_foot_bomb_eff_big_max;++i)
	{
		spine_foot_bomb_eff_big[i] = new PIXI.spine.Spine(res.spine_foot_bomb_eff_big.spineData);
		sBlock3.addChild(spine_foot_bomb_eff_big[i]);
		spine_foot_bomb_eff_big[i].state.timeScale = 2;
		spine_foot_bomb_eff_big[i].visible = false;
		spine_foot_bomb_eff_big[i].state.addListener({complete:function(entry){
			switch(entry.trackIndex){
				case 1:
					this.visible = false;
					break;
			}
		}});
	}
	for(i=0;i<ispine_foot_bomb_eff_small_max;++i)
	{
		spine_foot_bomb_eff_small[i] = new PIXI.spine.Spine(res.spine_foot_bomb_eff_small.spineData);
		sBlock3.addChild(spine_foot_bomb_eff_small[i]);
		spine_foot_bomb_eff_small[i].visible = false;
		spine_foot_bomb_eff_small[i].state.addListener({complete:function(entry){
			switch(entry.trackIndex){
				case 1:
					this.visible = false;
					break;
			}
		}});
	}
	for(i=0;i<iScoreAniMax;++i)
	{
		txtScoreAni[i] = BitmapFontLoad(sBlock3, "100", 0, 0, 0.5, 0.5,
			{font:'110px cat_block_1_number', align:'center', tint: 0xffffff});
		txtScoreAni[i].visible = false;
	}

	// 무지개 아이템용 셋팅..
	spr = SpriteLoad(sBlock2, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.6;
	spr = SpriteSliceLoad(sBlock2, "popup_tutorial.png", iCenterSizeX, iCenterSizeY - 440, 420, 220);
	FontLoad(spr, GetString("rainbow"), 0, 0, 0.5, 0.5,
		{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', lineHeight:'50', align:'center', fill:'#FEF89A', lineJoin:"round", stroke:'#005853', strokeThickness:7});
	sBlock2.visible = false;

	sGame.addChild(sMap);
	sGame.addChild(sRoad);
	sGame.addChild(sItem);
	sGame.addChild(sBlock); // 블럭이 상단UI보다 좀 위에 잇어서 위치변경.
	sGame.addChild(sBlock2);
	sGame.addChild(sBlock3);

	// 콤보 관련 셋팅
	spine_combo_ani = new PIXI.spine.Spine(res.spine_combo_ani.spineData);
	spine_combo_ani.position.set(iCenterSizeX, iCenterSizeY + 100);
	spine_combo_ani.state.addListener({complete:function(entry){
		switch(entry.trackIndex){
			case 1:
				this.visible = false;
				break;
		}
	}});
	sGame.addChild(spine_combo_ani);
	spine_combo_ani.visible = false;

	spine_ready_start = new PIXI.spine.Spine(res.spine_ready_start.spineData);
	spine_ready_start.position.set(iCenterSizeX, iCenterSizeY + 100);
	sGame.addChild(spine_ready_start);
	spine_ready_start.visible = false;
	spine_ready_start.state.addListener({complete:function(entry){
		switch(entry.trackIndex){
			case 1:	// 레디고
				this.visible = false;
			//	if(iStage < 5 && kData.iTutorial[iStage] == 0){
					switch(iStage){
						case 0:iTutoState = 1;break;
						case 1:iTutoState = 2;break;
						case 2:iTutoState = 3;break;
						case 3:iTutoState = 4;break;
						case 4:iTutoState = 5;break;
					}
			//	}
				bBlockMove = true;
				gameState = STATE_GAME_PLAY;
				break;
			case 2:	// 게임클리어.
				fTimeDelay = 0;
				gameState = STATE_GAME_CLEAR_STEP2;
				this.visible = false;
				break;
			case 3:	// 게임오버..
			//	if(iCatGetPerMultiply == iStage)
			//		sprGameOverX2.visible = true;
			//	else
			//		sprGameOverX2.visible = false;
				if (kData.iLife <= 0){
					// ---------------- 这里是结束的地方 ---------------- //
					//kData.iStageMax+1;
					if ( window.parent != null ) {
						window.parent.postMessage({
						  cmd: "GameOver",
						  msg: {
							score: kData.iStageMax, // 如果是星星数，也是这个分数
							level: 0
						  }
						}, "*");
					  }
					return;
				}
				sGameOver.visible = true;
				sGameOver.addChild(sFilm);
			//	sFilm.position.set(0, 140);
				SESoundPlay(SE_PopupOn);
				TweenMax.fromTo(sGameOver.children[0], 0.5, {alpha:0},
					{alpha:0.9, ease:Linear.easeNone});
				TweenMax.fromTo(sGameOver.children[1], 1, {as:0.5},
					{as:1, ease:Elastic.easeOut});
				gameState = STATE_GAME_OVER;
				break;
		}
	}});
	spine_ready_start.state.addListener({event:function(entry, event){
		if(event.data.name == "go")
			SESoundPlay(SE_Go);
	}});

	/*spine_ready_start.state.addListener({complete:function(entry){
		switch(entry.trackIndex){
			case 1:	// 레디고
				this.visible = false;
			/!*
				if(iStage < 5 && kData.iTutorial[iStage] == 0){
					switch(iStage){
						case 0:iTutoState = 1;break;
						case 1:iTutoState = 2;break;
						case 2:iTutoState = 3;break;
						case 3:iTutoState = 4;break;
						case 4:iTutoState = 5;break;
					}
				}*!/
				gameState = STATE_GAME_PLAY;
				break;
			case 2:	// 게임클리어.
				fTimeDelay = 0;
				gameState = STATE_GAME_CLEAR_STEP2;
				this.visible = false;
				break;
			case 3:	// 게임오버..
				//	if(iCatGetPerMultiply == iStage)
				//		sprGameOverX2.visible = true;
				//	else
				//		sprGameOverX2.visible = false;
				sGameOver.visible = true;
				sGameOver.addChild(sFilm);
				//	sFilm.position.set(0, 140);
				SESoundPlay(SE_PopupOn);
				TweenMax.fromTo(sGameOver.children[0], 0.5, {alpha:0},
					{alpha:0.9, ease:Linear.easeNone});
				TweenMax.fromTo(sGameOver.children[1], 1, {as:0.5},
					{as:1, ease:Elastic.easeOut});
				gameState = STATE_GAME_OVER;
				break;
		}
	}});*/

	// 윈 연출..
	spr = SpriteLoad(sGoal, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spine_goal_popup_ani = new PIXI.spine.Spine(res.spine_goal_popup_ani.spineData);
	sGoal.addChild(spine_goal_popup_ani);
	spine_goal_popup_ani.state.addListener({complete:function(entry){
		switch(entry.trackIndex){
			case 0:
				SpinePlay(spine_goal_popup_ani, iCenterSizeX, iCenterSizeY, "goal_popup_ani", 1, false);
				break;
			case 1:
				sGoal.visible = false;
				sPhotoTime.visible = true;
			//	sPhotoTime.addChild(sResultCatInfo);
				SetResultCatInfo();
				txtPhotoTimeSkip.visible = true;
				if(iStage < 5 && kData.iTutorial[iStage] == 0){
					kData.iTutorial[iStage] = 1;
					networkManager.ForcedSaveData();
					txtPhotoTimeSkip.visible = false;
				}
				break;
		}
	}});
	spine_goal_popup_ani.state.addListener({event:function(entry, event){
		if(event.data.name == "find")
			SESoundPlay(SE_CatFind);
	}});
//	SpinePlay(spine_goal_popup_ani, iCenterSizeX, iCenterSizeY, "goal_popup_ani", 0, false);
//	spine_goal_popup_ani.visible = false;
	txtGoalSkip = FontLoad(sGoal, GetString("SKIP"), iCenterSizeX + 340, iCenterSizeY + 600, 1, 0.5,
		{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#015852', strokeThickness:8});
	txtGoalSkip.interactive = true;
	txtGoalSkip.on('click', cbButtonGoal);
	txtGoalSkip.on('tap', cbButtonGoal);
	txtGoalSkip.on('mouseover', scaleUp);
	txtGoalSkip.on('tap', scaleUp);
	txtGoalSkip.on('mouseout', restoreScale);
	txtGoalSkip.on('touchend', restoreScale);
	sGoal.visible = false;
	sGame.addChild(sGoal);
	//========================================================================
	// 셔플 팝업창.
	spr = SpriteLoad(sShufflePopup, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spr = SpriteSliceLoad(sShufflePopup, "popup_select.png", iCenterSizeX, iCenterSizeY, 550, 150);
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, -2, 500, 100);
	txtNotBlock = FontLoad(spr2, GetString("NotBlock"), 0, 0, 0.5, 0.5,
		{fontFamily:tbTTF[lang], fontSize:'36px', fontWeight:'bold', align:'center', fill:'#FFFFFF', lineJoin:"round", lineHeight:39, stroke:'#00877c', strokeThickness:6});
	FontScale(txtNotBlock, 500);

	sGame.addChild(sShufflePopup);
//	sStageSelect.addChild(sShufflePopup);
	sShufflePopup.visible = false;
	//========================================================================
	// 튜토리얼 작업..
	sprTutoArrow = SpriteLoad(sGame, "tutorial_1.png", iCenterSizeX, iCenterSizeY);
	sprTutoArrow.visible = false;
//	sprTutoBox = SpriteSliceLoad(sGame, "popup_tutorial.png", iCenterSizeX, iCenterSizeY, 420, 220);
//	sprTutoBox.visible = false;
//	txtTuto = FontLoad(sprTutoBox, GetString("tuto0"), 0, 0, 0.5, 0.5,
//		{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', lineHeight:'50', align:'center', fill:'#FEF89A', lineJoin:"round", stroke:'#005853', strokeThickness:7});

//	sprTutoBox2 = SpriteSliceLoad(sGame, "popup_tutorial.png", iCenterSizeX, iCenterSizeY + 510, 520, 220);
//	sprTutoItem[0] = SpriteLoad(sprTutoBox2, "block/dustbox_block_hp1.png", -100, -50);
//	sprTutoItem[1] = SpriteLoad(sprTutoBox2, "block/dustbox_block_hp2.png", 0, -50);
//	sprTutoItem[2] = SpriteLoad(sprTutoBox2, "block/dustbox_block_hp3.png", 100, -50);
//	txtTuto2 = FontLoad(sprTutoBox2, GetString("help0"), 0, 50, 0.5, 0.5,
//		{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', lineHeight:'45', align:'center', fill:'#FEF89A', lineJoin:"round", stroke:'#005853', strokeThickness:7});
//	sprTutoBox2.visible = false;
//	sGame.addChild(sGoal);	// 튜토리얼보다 상위에 있어야 해서 여기서 한번더 올려준다.
	//========================================================================
	// 턴 오버 창
	spr = SpriteLoad(sTurnOver, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spr = SpriteSliceLoad(sTurnOverSub, "popup_over.png", 0, 0, 670, 760);
	spr2 = SpriteLoad(spr, "title_over.png", 0, -317);
	new Button(spr, "btn_close_over.png", 320, -360, cbButtonTurnOverClose, "scaleDown");
	FontLoad(spr2, GetString("TURNOVER"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 620);
	spr3 = SpriteLoad(spr2, "start_map.png", 0, -140);
	SpriteLoad(spr3, "shoes.png", 0, 0);
	FontLoad(spr3, "+10", 50, 50, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#FFFF01', stroke:'#4C7A77', strokeThickness:7});
//	sprTurnOverX2 = SpriteSliceLoad(spr3, "select_badge.png", -100, -110, 130, 72);
//	FontLoad(sprTurnOverX2, GetString("CatPer"), -25, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'18px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});
//	FontLoad(sprTurnOverX2, "X2", 28, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});

	txt = new PIXI.MultiStyleText(GetString("TurnOver0"), {
		def: { font: "bold 40px " + tbTTF[lang], fill: "#ffffff", align:'center', stroke:'#4C7A77', strokeThickness:8},
		c: { font: "bold 40px " + tbTTF[lang], fill:"#FFFF01", align:'center', stroke:'#4C7A77', strokeThickness:8}
    });
	txt.anchor.set(0.5);
	txt.position.set(0, 80);
	FontScale(txt, 600);
	spr2.addChild(txt);

	txt = new PIXI.MultiStyleText(GetString("TurnOver1"), {
		def: { font: "bold 25px " + tbTTF[lang], fill: "#008678", align:'center'},
		c: { font: "bold 25px " + tbTTF[lang], fill:"#EC6000", align:'center'}
    });
	txt.anchor.set(0.5);
	txt.position.set(0, 145);
	spr2.addChild(txt);

	btn = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 450, 97);
	SpriteLoad(btn, "film_1.png", 100, 0);
	FontLoad(btn, GetString("TurnAdd") + "      -1", 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 0, 240, cbButtonTurnOverYESAni, "scaleDown", 1, 1, 0.5, 0.5, btn);

	sGame.addChild(sTurnOver);
	sTurnOver.addChild(sTurnOverSub);
	sTurnOverSub.position.set(iCenterSizeX, iCenterSizeY);
//	sStageSelect.addChild(sTurnOver);
	sTurnOver.visible = false;
	//========================================================================
	// 게임오버 창.
	spr = SpriteLoad(sGameOver, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spr = SpriteSliceLoad(sGameOverSub, "popup_over.png", 0, 0, 670, 790);
	spr2 = SpriteLoad(spr, "title_over.png", 0, -332);
	new Button(spr, "btn_close_over.png", 320, -375, cbButtonGameOverClose, "scaleDown");
	FontLoad(spr2, GetString("GAMEOVER"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 650);
	spr3 = SpriteLoad(spr, "photo_bg1.png", 0, -20);

	SpriteLoad(spr3, "cat.png", 0, 0);
//	sprGameOverX2 = SpriteSliceLoad(spr3, "select_badge.png", -280, -220, 130, 72);
//	FontLoad(sprGameOverX2, GetString("CatPer"), -25, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'18px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});
//	FontLoad(sprGameOverX2, "X2", 28, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});

	btn = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 450, 97);
	SpriteLoad(btn, "film_1.png", 90, 0);
	FontLoad(btn, GetString("RETRY") + "     -1", 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 0, 255, cbButtonGameOverYESAni, "scaleDown", 1, 1, 0.5, 0.5, btn);

	sGame.addChild(sGameOver);
	sGameOver.addChild(sGameOverSub);
	sGameOverSub.position.set(iCenterSizeX, iCenterSizeY);
//	sStageSelect.addChild(sGameOver);
//	sTurnOver.addChild(sFilm);
	sGameOver.visible = false;
	//========================================================================
	// 포토타임 UI
	spr = SpriteLoad(sPhotoTime, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spr = SpriteSliceLoad(sPhotoTime, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 900);
	spr2 = SpriteLoad(spr, "title.png", 0, -387);
	FontLoad(spr2, GetString("PHOTOTIME"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 760);
	spr3 = SpriteLoad(spr, "photo_bg1.png", 0, -80);
	SpriteLoad(spr3, "cat.png", 0, 0);
	SpriteLoad(spr3, "board_character.png", -151, 96);
	spr4 = SpriteLoad(spr3, "photo_mask.png", -244 + 13, -244 + 13);
	spr4.scale.set(1, -1);
	spr4 = SpriteLoad(spr3, "photo_mask.png", 244 - 13, -244 + 13);
	spr4.scale.set(-1, -1);
	spr4 = SpriteLoad(spr3, "photo_mask.png", -244 + 13, 244 - 13);
	spr4 = SpriteLoad(spr3, "photo_mask.png", 244 - 13, 244 - 13);
	spr4.scale.set(-1, 1);
//	sprPhotoTimeX2 = SpriteSliceLoad(spr3, "select_badge.png", -280, -220, 130, 72);
//	FontLoad(sprPhotoTimeX2, GetString("CatPer"), -25, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'18px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});
//	FontLoad(sprPhotoTimeX2, "X2", 28, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});

//	btn = SpriteLoad(spr2, "btn_shoot.png", 0, 0, 320, 162);
//	SpriteLoad(btn, "btn_shoot.png", 0, 0);
//	spr = SpriteLoad(btn, "shoot_arrow.png", 0, -105);
//	FontLoad(btn, GetString("PHOTOSHOT"), 0, -120, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#742F08', strokeThickness:8});
	var btn2 = new Button(spr2, "btn_shoot.png", 0, 250, cbButtonPhotoTimeYES, "scaleDown", 1, 1, 0.5, 0.5);
	btn2.SetTween();
	txtPhotoTimeSkip = FontLoad(sPhotoTime, GetString("SKIP"), iCenterSizeX + 350, iCenterSizeY + 600, 1, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'40px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#015852', strokeThickness:8});
	txtPhotoTimeSkip.interactive = true;
	txtPhotoTimeSkip.on('click', cbButtonPhotoTimeSkip);
	txtPhotoTimeSkip.on('tap', cbButtonPhotoTimeSkip);
	txtPhotoTimeSkip.on('mouseover', scaleUp);
	txtPhotoTimeSkip.on('tap', scaleUp);
	txtPhotoTimeSkip.on('mouseout', restoreScale);
	txtPhotoTimeSkip.on('touchend', restoreScale);

	sGame.addChild(sPhotoTime);
//	sStageSelect.addChild(sPhotoTime);
	sPhotoTime.visible = false;
	//========================================================================
	// 포토결과창 UI
	spr = SpriteLoad(sPhotoResult, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
	spr = SpriteSliceLoad(sPhotoResult, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 900);
	spr2 = SpriteLoad(spr, "title.png", 0, -387);
	FontLoad(spr2, GetString("PHOTORESULT"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 760);

	spr3 = SpriteLoad(spr, "camera.png", -133, -280);
//	sprPhotoResultX2 = SpriteSliceLoad(spr3, "select_badge.png", -150, -15, 130, 72);
//	FontLoad(sprPhotoResultX2, GetString("CatPer"), -25, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'18px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});
//	FontLoad(sprPhotoResultX2, "X2", 28, -3, 0.5, 0.5,
//			{fontFamily:tbTTF[lang], fontSize:'28px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#500000', strokeThickness:8});
	spr3 = SpriteLoad(spr, "camera.png", 133, -280);
	spr3.scale.set(-1, 1);
	txtPhotoResultSuccess = SpriteLoad(spr, "result_success.png", 0, -290);

	sPhotoResult.addChild(sPhoto);
	sPhoto.position.set(iCenterSizeX, iCenterSizeY);
	spr = SpriteLoad(sPhoto, "white.png", 0, 0);
	spr.scale.set(440/4, 440/4);
	sprPhotoResultBG = SpriteLoad(sPhoto, "photo_bg1.png", 0, 0);
	sprPhotoResultBG.scale.set(0.85);
	SpriteLoad(sPhoto, "result_photo.png", 0, 0);
	sprPhotoResultCat = SpriteLoad(sprPhotoResultBG, "cat.png", 0, 80);
	sprPhotoResultObject = SpriteLoad(sprPhotoResultBG, "object_1.png", 0, 0);
	var g = new PIXI.Graphics();
	g.lineStyle(1, 0xff00ff, 1);
	g.beginFill(0xff00ff, 1);
	g.drawRect(iCenterSizeX-230, iCenterSizeY-230-20, 460, 460+30, 15);
	g.endFill();
	sPhotoResult.addChild(g);
	sPhoto.mask = g;

	sprPhotoResultNew = SpriteLoad(sPhotoResult, "new.png", iCenterSizeX-210, iCenterSizeY-180);
	txt = FontLoad(sprPhotoResultNew, GetString("NEW"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'30px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#742F08', strokeThickness:5});
	txt.rotation = -0.3;
//	sprPhotoResultNew.visible = false;

	txtPhotoResultScore = new PIXI.MultiStyleText(GetString("SCORE2", GetComma(10000000)), {
		def: { font: "bold 40px " + tbTTF[lang], fill: "#ffffff", align:'center', stroke:'#000000', strokeThickness:5},
		c: { font: "bold 40px " + tbTTF[lang], fill:"#FEFF04", align:'center', stroke:'#000000', strokeThickness:5}
    });
	txtPhotoResultScore.anchor.set(0.5);
	txtPhotoResultScore.position.set(iCenterSizeX, iCenterSizeY + 260);
	sPhotoResult.addChild(txtPhotoResultScore);

	sprPhotoResultBest = SpriteLoad(sPhotoResult, "best.png", iCenterSizeX+30+(txtPhotoResultScore.width/2), iCenterSizeY+200);
	txt = FontLoad(sprPhotoResultBest, "BEST", 0, 10, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'30px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#742F08', strokeThickness:8});

	spr3 = SpriteSliceLoad(sPhotoResultButton, "btn_start.png", 0, 0, 97, 97);
	SpriteLoad(spr3, "btn_result_home.png", 0, 0);
	new Button(sPhotoResultButton, "btn_start.png", iCenterSizeX-210, iCenterSizeY+350, cbButtonStageSelect, "scaleDown", 1, 1, 0.5, 0.5, spr3);
	sPhotoResult.addChild(sPhotoResultButton);

	spr3 = SpriteSliceLoad(sPhotoResultButton, "btn_reshoot.png", 0, 0, 270, 97);
	SpriteLoad(spr3, "btn_result_film.png", 80, 0);
	FontLoad(spr3, GetString("ReShoot") + "  -1", 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	btnReshoot[0] = new Button(sPhotoResultButton, "btn_start.png", iCenterSizeX, iCenterSizeY+350, cbButtonShotAni, "scaleDown", 1, 1, 0.5, 0.5, spr3);
	btnReshoot[1] = SpriteSliceLoad(sPhotoResultButton, "btn_reshoot_disable.png", iCenterSizeX, iCenterSizeY+350, 270, 97);
	FontLoad(btnReshoot[1], GetString("allcomplete"), 0, 3, 0.5, 0.5,
		{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', lineHeight:35, lineJoin:"round", stroke:'#e73490', strokeThickness:6});
	sPhotoResult.addChild(sPhotoResultButton);

	spr3 = SpriteSliceLoad(sPhotoResultButton, "btn_start.png", 0, 0, 97, 97);
	SpriteLoad(spr3, "btn_result_next.png", 0, 0);
	new Button(sPhotoResultButton, "btn_start.png", iCenterSizeX+210, iCenterSizeY+350, cbButtonNextStage, "scaleDown", 1, 1, 0.5, 0.5, spr3);
	sPhotoResult.addChild(sPhotoResultButton);

	iPhotoResultState = PR_NONE;

	sGame.addChild(sPhotoResult);
//	sStageSelect.addChild(sPhotoResult);
	sPhotoResult.visible = false;
	//========================================================================
	// 결과창쪽에 고양이 info정보를 보여준다.
	spr20 = new PIXI.Container();
	sResultCatInfo.addChild(spr20);
	spr20.position.set(iCenterSizeX - 10, iCenterSizeY - 620);
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprPhotoResultAlbumBG[0] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumBG[0].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprPhotoResultAlbumCat[0] = SpriteLoad(spr3, "cat/1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumCat[0].scale.set(0.6);
	sprPhotoResultAlbumClip[0] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	spr20.scale.set(0.63);
	TweenMax.fromTo(spr20, 1,
		{rotation:-0.03},
		{yoyo:true, repeat:-1, rotation:0.03, ease:Power0.easeNone});

	spr20 = new PIXI.Container();
	sResultCatInfo.addChild(spr20);
	spr20.position.set(iCenterSizeX + 90, iCenterSizeY - 620);
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprPhotoResultAlbumBG[1] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumBG[1].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprPhotoResultAlbumCat[1] = SpriteLoad(spr3, "cat/1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumCat[1].scale.set(0.6);
	sprPhotoResultAlbumClip[1] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	spr20.scale.set(0.63);
	TweenMax.fromTo(spr20, 1,
		{rotation:-0.03},
		{yoyo:true, repeat:-1, rotation:0.03, ease:Power0.easeNone});

	spr20 = new PIXI.Container();
	sResultCatInfo.addChild(spr20);
	spr20.position.set(iCenterSizeX + 190, iCenterSizeY - 620);
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprPhotoResultAlbumBG[2] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumBG[2].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprPhotoResultAlbumCat[2] = SpriteLoad(spr3, "cat/1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumCat[2].scale.set(0.6);
	sprPhotoResultAlbumClip[2] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	spr20.scale.set(0.63);
	TweenMax.fromTo(spr20, 1,
		{rotation:-0.03},
		{yoyo:true, repeat:-1, rotation:0.03, ease:Power0.easeNone});

	spr20 = new PIXI.Container();
	sResultCatInfo.addChild(spr20);
	spr20.position.set(iCenterSizeX + 290, iCenterSizeY - 620);
	spr = SpriteLoad(spr20, "white.png", 0, 10, 0.5, 0);
	spr.scale.set(130/4, 130/4);
	spr.tint = 0x00B8A8;
	sprPhotoResultAlbumBG[3] = SpriteLoad(spr20, "photo_bg1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumBG[3].scale.set(0.28, 0.28);
	spr3 = SpriteLoad(spr20, "start_photo.png", 0, 0, 0.5, 0);
	sprPhotoResultAlbumCat[3] = SpriteLoad(spr3, "cat/1.png", 0, 10, 0.5, 0);
	sprPhotoResultAlbumCat[3].scale.set(0.6);
	sprPhotoResultAlbumClip[3] = SpriteLoad(spr20, "start_clip1.png", 0, -10);
	spr20.scale.set(0.63);
	TweenMax.fromTo(spr20, 1,
		{rotation:-0.03},
		{yoyo:true, repeat:-1, rotation:0.03, ease:Power0.easeNone});
	sGame.addChild(sResultCatInfo);
	sResultCatInfo.visible = false;
	//========================================================================
	// 필름부족 팝업창..
	spr = SpriteLoad(sWarningPopup, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);

	spr = SpriteSliceLoad(sWarningPopup, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 410);
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, -3, 620, 350);
	txtWarningContents = FontLoad(spr2, GetString("FilmWarning"), 0, -60, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', lineJoin:"round", stroke:'#00887B', strokeThickness:8, padding:3});

	spr3 = SpriteSliceLoad(spr2, "btn_no.png", 0, 0, 250, 97);
	FontLoad(spr3, "NO", 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_no.png", -150, 110, cbButtonWarningPopupNO, "scaleDown", 1, 1, 0.5, 0.5, spr3);
	spr3 = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 250, 97);
	FontLoad(spr3, "YES", 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 150, 110, cbButtonWarningPopupYES, "scaleDown", 1, 1, 0.5, 0.5, spr3);
	sWarningPopup.visible = false;
	//========================================================================
	// 게임 옵션창 작업..
	spr = SpriteLoad(sOption, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);

	spr = SpriteSliceLoad(sOption, "popup_select.png", iCenterSizeX, iCenterSizeY, 560, 300);
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, -3, 510, 245);
	new Button(spr2, "btn_close.png", 260, -130, cbButtonOptionClose, "scaleDown");
	new Button(spr2, "btn_pause_replay.png", -160, 0, cbButtonReplay, "scaleDown");
	sprSoundBGM = new Button(spr2, "btn_pause_sound.png", 0, 0, cbButtonSoundBGM, "scaleDown");
	new Button(spr2, "btn_pause_home.png", 160, 0, cbButtonOptionHome, "scaleDown");
	SetSoundIcon();
	sGame.addChild(sOption);
//	sStageSelect.addChild(sOption);
	sOption.visible = false;
	//========================================================================
	// 페이드 인 아웃.
	stage.addChild(sTitle);
	stage.addChild(sGame);
	stage.addChild(sWarningPopup);
	kShop = new Shop(stage);	// 이건 위치를 변경해서 알아서 배치한다. 게임에 상항에 맞게 부모를 설정해준다.
	sGame.visible = false;
//	stage.addChild(sCatUI);
	sprFade = SpriteLoad(stage, "white.png", iCenterSizeX, iCenterSizeY);
	sprFade.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	sprFade.tint = 0x000000;
	sprFade.alpha = 0;
	sprFade.interactive = true;
	sprFade.on('click', cbButtonWhite);
	sprFade.on('tap', cbButtonWhite);
	sprFade.visible = false;

	sprWhite = SpriteLoad(stage, "white.png", iCenterSizeX, iCenterSizeY);
	sprWhite.scale.set(iMaxSizeX/4, iMaxSizeY/4);
	sprWhite.alpha = 0;
//	sprWhite.interactive = true;
//	sprWhite.on('click', cbButtonWhite);
//	sprWhite.on('tap', cbButtonWhite);
	sprWhite.visible = false;
	//========================================================================
	// 필름소모 연출.
	spine_heart_bomb = new PIXI.spine.Spine(res.spine_heart_bomb.spineData);
	spr = SpriteLoad(spine_heart_bomb, "white.png", 0, 0);
	spr.scale.set(iMaxSizeX/2, iMaxSizeY/2);
	spr.tint = 0x000000;
	spr.alpha = 0.0;
	spr.interactive = true;
	spr.on('click', cbButtonWhite);
	spr.on('tap', cbButtonWhite);
//	spr.visible = false;
	spine_heart_bomb.state.addListener({complete:function(entry){
		spine_heart_bomb.visible = false;
		switch(entry.trackIndex){
			case 1:
				cbButtonStageInfoStart();
				break;
			case 2:
				cbButtonTurnOverYES();
				break;
			case 3:
				cbButtonGameOverYES();
				break;
			case 4:
				cbButtonShot();
				break;
		}
	}});
	stage.addChild(spine_heart_bomb);
//	SpinePlay(spine_heart_bomb, iCenterSizeX + 140, iCenterSizeY + 400, "heart_bomb_out", 2, true);
//	SpinePlay(spine_heart_bomb, iCenterSizeX + 100, iCenterSizeY + 283, "heart_bomb_out", 0, true);
//	SpinePlay(spine_heart_bomb, iCenterSizeX + 90, iCenterSizeY + 296, "heart_bomb_out", 0, true);
//	SpinePlay(spine_heart_bomb, iCenterSizeX + 85, iCenterSizeY + 350, "heart_bomb_out", 0, true);
	spine_heart_bomb.visible = false;
	stage.addChild(sTopContainer);
	//========================================================================
	// 버젼관리 및 치트키..
//	var verNum = FontLoad(cont, "1.0", 710, 1261, 1, 0.5, { font: '15px ' + 로딩폰트, fill: '#A0A0FF' });
	/*var txt = FontLoad(sTitle, VERSION, iCenterSizeX + 350, iCenterSizeY + 630, 1, 0.5,
			{fontFamily:'Arial', fontSize:'15px', fill:'#000000'});
	txt.interactive = true;
	txt.on('click', cbButtonCheatOn1);
	txt.on('tap', cbButtonCheatOn1);*/

	var g = new PIXI.Graphics();
	g.lineStyle(1, 0xff00ff, 1);
	g.beginFill(0xff00ff, 1);
	g.drawRect(0, 0, 50, 50);
	g.endFill();
	g.alpha = 0;
	g.interactive = true;
	g.on('click', cbButtonCheatOn2);
	g.on('tap', cbButtonCheatOn2);
	sTitle.addChild(g);

	if(bCHEAT == true) {
		txt = FontLoad(sCheatPanel, "Save initialization", iCenterSizeX + 350, iCenterSizeY - 600, 1, 0.5,
			{fontFamily: tbTTF[lang], fontSize: '32px', fill: '#000000'});//, wordWrap:true, wordWrapWidth:200});
		txt.interactive = true;
		txt.on('click', cbButtonCheatDataInit);
		txt.on('tap', cbButtonCheatDataInit);
		txt.on('mouseover', scaleUp);
		txt.on('tap', scaleUp);
		txt.on('mouseout', restoreScale);
		txt.on('touchend', restoreScale);
		//===============================================
		// 치트 관련.
		txt = FontLoad(sCheatPanel, "NextStage", iCenterSizeX + 350, iCenterSizeY - 510, 1, 0.5,
			{fontFamily: tbTTF[lang], fontSize: '18px', fill: '#000000', align: "left"});
		txt.interactive = true;
		txt.on('click', cbButtonCheat1);
		txt.on('tap', cbButtonCheat1);
		txt.on('mouseover', scaleUp);
		txt.on('tap', scaleUp);
		txt.on('mouseout', restoreScale);
		txt.on('touchend', restoreScale);

		txt = FontLoad(sCheatPanel, "LifeAdd", iCenterSizeX + 350, iCenterSizeY - 480, 1, 0.5,
			{fontFamily: tbTTF[lang], fontSize: '18px', fill: '#000000', align: "left"});
		txt.interactive = true;
		txt.on('click', cbButtonCheat2);
		txt.on('tap', cbButtonCheat2);
		txt.on('mouseover', scaleUp);
		txt.on('tap', scaleUp);
		txt.on('mouseout', restoreScale);
		txt.on('touchend', restoreScale);

		txt = FontLoad(sCheatPanel, "HERO_CHEAT", iCenterSizeX + 350, iCenterSizeY - 450, 1, 0.5,
			{fontFamily: tbTTF[lang], fontSize: '18px', fill: '#000000', align: "left"});
		txt.interactive = true;
		txt.on('click', cbButtonCheat3);
		txt.on('tap', cbButtonCheat3);
		txt.on('mouseover', scaleUp);
		txt.on('tap', scaleUp);
		txt.on('mouseout', restoreScale);
		txt.on('touchend', restoreScale);

		txtFps = FontLoad(stage, "", 10, 10, 0, 0,
			{fontFamily:'Arial', fontSize:'20px', fill:'#ffffff', stroke:"#000000", strokeThickness:2}, 0);

		stage.addChild(sCheatPanel);
		sCheatPanel.visible = false;
	//	sCheatPanel.visible = true;
	//	window.alert("sometext");
	}
}

var iCheatOn = [];
var iCheatOnCheck = [1,1,1,2,2,1];
var sCheatPanel = new PIXI.Container();
function cbButtonCheatOn1()
{
	iCheatOn.push(1);
	if(iCheatOn.length == iCheatOnCheck.length){
		for(var i=0;i<iCheatOnCheck.length;++i){
			if(iCheatOn[i] != iCheatOnCheck[i]){
				iCheatOn = [];
			}
		}

		if(iCheatOn.length == iCheatOnCheck.length){
			iCheatOn = [];
			sCheatPanel.visible = true;
		}
	}
}
function cbButtonCheatOn2()
{
	iCheatOn.push(2);
	if(iCheatOn.length == iCheatOnCheck.length){
		for(var i=0;i<iCheatOnCheck.length;++i){
			if(iCheatOn[i] != iCheatOnCheck[i]){
				iCheatOn = [];
			}
		}

		if(iCheatOn.length == iCheatOnCheck.length){
			iCheatOn = [];
			sCheatPanel.visible = true;
		}
	}
}

/*
jQuery.jQueryAlert = function (msg) {
	var $messageBox = $.parseHTML('<div id="alertBox"></div>');
	$("body").append($messageBox);

	$($messageBox).dialog({
		open: $($messageBox).append(msg),
		title: "경고창",
		autoOpen: true,
		modal: true,
		buttons: {
			OK: function () {
				$("#alertBox").dialog("close");
			}
		}
	});
};

$(function () {
	$.jQueryAlert("메세지를 입력해주세요");
});
*/
function UpdateLife()
{
	switch(iLifeState)
	{
		case 1: // 초기화 된 상태에서 시간을 계속 체크.
			if(kData.iLife < iLifeMax) {
				kData.fLifeTime -= deltaTime;
				if(kData.fLifeTime <= 0){
					if (loginTF != 0) {
						networkManager.LoadData(undefined);
					}else{
						kData.iLife++;
						kData.fLifeTime += fLifeAddTime;
						networkManager.ForcedSaveData();
					}
					/*
					if(networkManager.networkState == NET_STATE.RUN_SERVER){
						// CheckButton은 게임에 따라 수정을 하면 될듯
						networkManager.LoadData(undefined);
					}
					else{
						kData.iLife++;
						kData.fLifeTime += fLifeAddTime;
						// CheckButton은 게임에 따라 수정을 하면 될듯
					//	CheckButton();
						networkManager.ForcedSaveData();
					}
					*/
				}
			}
			else{
				kData.fLifeTime = 0;
			}

			if (txtLifeCnt) txtLifeCnt.text = kData.iLife.toString();
			/*if(kData.iLife < iLifeMax)
				txtLifeTime.text = leadingZeros(Mathfloor(kData.fLifeTime/60), 2) + ":" + leadingZeros(Mathfloor(kData.fLifeTime%60), 2);
			else
				txtLifeTime.text = GetString("MAX");*/
			break;
	}
}

function LostTime(_iLostTime)
{
	if(kData.iLife >= iLifeMax)
		return;

	var addHeart = 0;
	while(_iLostTime >= fLifeAddTime){
		addHeart++;
		_iLostTime -= fLifeAddTime;
	}
	kData.fLifeTime -= _iLostTime;

	if(kData.fLifeTime < 0){
		addHeart++;
		kData.fLifeTime = fLifeAddTime + kData.fLifeTime;
	}

	kData.iLife += addHeart;
	if(kData.iLife > iLifeMax)
		kData.iLife = iLifeMax;

	networkManager.ForcedSaveData();
}

function SetResultCatInfo()
{
	for(var i=0;i<4;++i){
		if(kData.iCatGet[iStage][i] == CAT_NONE){
			sprPhotoResultAlbumBG[i].visible = false;
			sprPhotoResultAlbumCat[i].texture = PIXI.Texture.fromFrame("cat/"+((iStage%50)+1+(i*50))+".png");
			sprPhotoResultAlbumCat[i].tint = 0x000000;
			sprPhotoResultAlbumClip[i].texture = PIXI.Texture.fromFrame("start_clip1.png");
		}else{
			sprPhotoResultAlbumBG[i].visible = true;
			sprPhotoResultAlbumBG[i].texture = PIXI.Texture.fromFrame("photo_bg"+(Mathfloor(iStage/50)+1)+".png");
			sprPhotoResultAlbumCat[i].texture = PIXI.Texture.fromFrame("cat/"+((iStage%50)+1+(i*50))+".png");
			sprPhotoResultAlbumCat[i].tint = 0xffffff;
			sprPhotoResultAlbumClip[i].texture = PIXI.Texture.fromFrame("start_clip2.png");
		}
	}
}

function cbButtonGoal()
{
//	SESoundPlay(SE_CameraShot);
	sGoal.visible = false;
//	sPhotoTime.visible = true;
	iPhotoResultState = PR_INIT;
	sPhotoTime.visible = false;
	sPhotoResult.visible = true;
	sPhotoResult.addChild(sFilm);
//	sPhotoResult.addChild(sResultCatInfo);
	SetResultCatInfo();
//	sFilm.position.set(0, 0);
	bPhotoResultSkip = true;
}

function cbButtonStageSelect()
{
	BGMSoundPlay(BGM_Title);
	SetFade(STATE_STAGE);
}

function cbButtonShotAni()
{
	if(kData.iLife > 0) {
		if (spine_heart_bomb.visible == false) {
			btnReshoot[0].main.interactive = false;
			SESoundPlay(SE_Heart);
			SpinePlay(spine_heart_bomb, iCenterSizeX + 85, iCenterSizeY + 350, "heart_bomb_out", 4, false);
		}
	}else{
		SESoundPlay(SE_PopupOn);
		sWarningPopup.visible = true;
		iFilmState = 5;
		sWarningPopup.addChild(sFilm);
	//	sFilm.position.set(0, 0);
	}
}

function cbButtonShot()
{
	SESoundPlay(SE_ButtonClick);
	if(kData.iLife > 0) {
		networkManager.ForcedSaveData(false, function(){
			SESoundPlay(SE_Heart);
			networkManager.UseHeart(1, undefined);
			bPhotoResultSkip = false;
			iPhotoResultState = PR_INIT;
		});
	}
	else {
		SESoundPlay(SE_PopupOn);
		sWarningPopup.visible = true;
		iFilmState = 2;
		sWarningPopup.addChild(sFilm);
	//	sFilm.position.set(0, 0);
	}
}

function cbButtonNextStage()
{
	SESoundPlay(SE_ButtonClick);
	if(iStage < 300 - 1)
		iStage++;
	BGMSoundPlay(BGM_Title);
	SetFade(STATE_STAGE_INFO);
}

function UpdateResult()
{
	var bCatGet = false;
	var iR = 0;
	var iAlbumType = Mathfloor(iStage/50);

	switch(iPhotoResultState)
	{
		case PR_NONE:	// 아무짓도 하지 않음
			break;
		case PR_INIT:
			SESoundPlay(SE_CameraShot);
			iCatGetIndex = -1;
			if(kData.iCatGet[iStage][4] == 0 || kData.iCatGet[iStage][4] == 4)	// 고양이를 한개도 얻지 못했으면 100%확률..
				iCatGetPer = 100;
			else {
				if(tbCatGetFailMax[Mathfloor(iStage/50)] <= kData.iCatGet[iStage][5])
					iCatGetPer = 100;
				else {
				//	if(iCatGetPerMultiply == iStage) {
				//		iCatGetPer = 100 - 10 - (Mathfloor(iStage/50) * 5) ;
				//	}
				//	else {
					iCatGetPer = 100 - 20 - (Mathfloor(iStage/50) * 10);
				//	}
				}
			}

			if(Mathfloor(Math.random()*100) < iCatGetPer){
				bCatGet = true;
				// 어떤 고양이를 줄건지 정한다.
				while(true)
				{
					iR = Mathfloor(Math.random()*4);
					if(kData.iCatGet[iStage][4] < 4) {
						if (kData.iCatGet[iStage][iR] == CAT_NONE) {
							iCatGetIndex = iR;
							kData.iCatGet[iStage][iR] = CAT_GET_NEW;
							kData.iCatGet[iStage][4]++;	// 스테이지별 고양이 얻은거 갯수 추가.
							kData.iCatGetCnt[iAlbumType]++;	// 스테이지 타입별 고양이 얻는거 갯수 추가.
							kData.dicAlbumNew[iAlbumType][(iStage * 4) + iR] = 0;
							break;
						}
					}
					else{ // 다 얻은상태면 아무거나 보여준다.
						iCatGetIndex = iR;
						break;
					}
				}
				sprPhotoResultObject.visible = false;
				txtPhotoResultSuccess.texture = PIXI.Texture.fromFrame("result_success.png");
				sprPhotoResultCat.texture = PIXI.Texture.fromFrame("cat/"+((iStage%50)+1+(iCatGetIndex*50))+".png");
			}
			else{
				kData.iCatGet[iStage][5]++;
				txtPhotoResultSuccess.texture = PIXI.Texture.fromFrame("result_failed.png");
				sprPhotoResultObject.visible = true;
				sprPhotoResultObject.texture =  PIXI.Texture.fromFrame("object_"+Mathfloor(1+(Math.random()*6))+".png");
				sprPhotoResultCat.texture = PIXI.Texture.fromFrame("cat/"+((iStage%50)+1+(0*50))+".png");
			}
		//	SaveDataInClient();

			// 촬영 성공률 2배인지 체크.
		//	if(iCatGetPerMultiply == iStage)
		//		sprPhotoResultX2.visible = true;
		//	else
		//		sprPhotoResultX2.visible = false;
			// 성공인지 실패인지 체크.
			txtPhotoResultSuccess.visible = false;
			sPhotoResultButton.visible = false;
			sprPhotoResultBG.alpha = 0;
			sprPhotoResultBG.texture = PIXI.Texture.fromFrame("photo_bg"+Mathfloor(1+(iStage/50))+".png");
			sprPhotoResultNew.visible = false;
			sprPhotoResultBest.visible = false;
			txtPhotoResultScore.visible = false;

			fPhotoResultTime = 0;
		//	if(sprWhite.tween != undefined)
		//		TweenLite.killTweensOf(sprWhite.tween);
			if(sprWhite.tween != undefined)
				sprWhite.tween.kill();
			sprWhite.visible = true;
			sprWhite.alpha = 1;
			sprWhite.tween = TweenLite.to(sprWhite, 1, {alpha:0, ease:Power0.easeNone});
			sPhoto.visible = true;

			if(bPhotoResultSkip == true){
				txtPhotoResultSuccess.visible = true;
				sPhotoResultButton.visible = true;
				sprPhotoResultBG.visible = true;
				sprPhotoResultBG.alpha = 1;
				txtPhotoResultScore.visible = true;
				if(kData.iCatGet[iStage][iCatGetIndex] == CAT_GET_NEW){
					sprPhotoResultNew.visible = true;
					sprPhotoResultNew.scale.set(1);
					SetResultCatInfo();

					kData.iCatGet[iStage][iCatGetIndex] = CAT_GET_NEW2;
				}
				if(iScore > kData.iStageScoreMax[iStage]) {
					kData.iStageScoreMax[iStage] = iScore;
					sprPhotoResultBest.visible = true;
					sprPhotoResultBest.position.set(iCenterSizeX + 30 + (txtPhotoResultScore.width / 2), iCenterSizeY + 200);
				}
				txtPhotoResultScore.text = GetString("SCORE2", GetComma(Mathfloor(iScore)));
				iPhotoResultState = PR_NONE;
			}
			else {
				TweenMax.fromTo(sPhoto, 2,
					{y: 100},
					{y: iCenterSizeY, ease: Power0.easeNone, onComplete: cbTweenPhotoDownComplete});
				SESoundPlay(SE_PhotoPrinting);
				iPhotoResultState = PR_PICTURE_DOWN_ING;
			}

			if(kData.iCatGet[iStage][4] >= 4) {
				btnReshoot[0].visible = false;
				btnReshoot[1].visible = true;
			}else{
				btnReshoot[0].visible = true;
				btnReshoot[0].main.interactive = true;
				btnReshoot[1].visible = false;
			}
			networkManager.ForcedSaveData();
			break;
		case PR_PICTURE_DOWN_ING:
			break;
		case PR_PICTURE_FADE_IN:
			break;
		case PR_SUCCESS_FAIL:
			break;
		case PR_SCORE:
			break;
		case PR_SCORE_BEST:
			break;
	}

	fPhotoResultTime += deltaTime;
}

function cbTweenPhotoDownComplete()
{
	sprWhite.visible = false;
	TweenLite.to(sprPhotoResultBG, 1.5, {delay:0.5, alpha:1, ease:Power3.easeIn, onComplete:cbTweenPhotoFadeComplete});
	SESoundPlay(SE_PhotoPrints);
	iPhotoResultState = PR_PICTURE_FADE_IN;
}

function cbTweenPhotoFadeComplete()
{
	if(sprPhotoResultObject.visible == false)
		SESoundPlay(SE_PhotoSuccess);
	else
		SESoundPlay(SE_PhotoFailed);

	// 실패인지 성공인지 텍스쳐를 바꿔준다.
	txtPhotoResultSuccess.visible = true;
	txtPhotoResultSuccess.scale.set(2);
	TweenLite.to(txtPhotoResultSuccess, 0.2, {as:1, ease:Back.easeOut.config(1.7), onComplete:cbTweenPhotoSuccessFailComplete});

	// new를 보여줄지 정한다.
	sprPhotoResultNew.visible = false;
	if(kData.iCatGet[iStage][iCatGetIndex] == CAT_GET_NEW){
		sprPhotoResultNew.visible = true;
		sprPhotoResultNew.scale.set(2);
		SetResultCatInfo();
		TweenLite.to(sprPhotoResultNew, 0.2, {as: 1, ease: Back.easeOut.config(1.7)});

		kData.iCatGet[iStage][iCatGetIndex] = CAT_GET_NEW2;
		networkManager.ForcedSaveData();
	}

	// 점수를 보여준다.
	txtPhotoResultScore.visible = true;
	txtPhotoResultScore.text = GetString("SCORE2", GetComma(0));
	txtPhotoResultScore.scale.set(2);
	TweenLite.to(txtPhotoResultScore, 0.2, {as:1, ease:Back.easeOut.config(1.7)});

	iPhotoResultState = PR_SUCCESS_FAIL;
}

var TweenScore={score:0};
function cbTweenPhotoSuccessFailComplete()
{
	TweenMax.fromTo(TweenScore, 1,
		{score:0},
		{score:iScore, delay: 0.75, ease:Linear.easeNone,onComplete:cbTweenPhotoScoreComplete,
			onUpdate:function(){txtPhotoResultScore.text = GetString("SCORE2", GetComma(Mathfloor(TweenScore.score)));}}
	);
	iPhotoResultState = PR_SCORE;
}

function cbTweenPhotoScoreComplete()
{
	// Best를  보여줄지 정한다.
	if(iScore > kData.iStageScoreMax[iStage]) {
		kData.iStageScoreMax[iStage] = iScore;
		sprPhotoResultBest.visible = true;
		sprPhotoResultBest.scale.set(2);
		sprPhotoResultBest.position.set(iCenterSizeX + 30 + (txtPhotoResultScore.width / 2), iCenterSizeY + 200);
		TweenLite.to(sprPhotoResultBest, 0.2, {as: 1, ease: Back.easeOut.config(1.7)});
		networkManager.ForcedSaveData();
	}

	// 버튼을 보여준다.
	sPhotoResultButton.visible = true;
	sPhotoResultButton.alpha = 0;
	TweenLite.to(sPhotoResultButton, 0.2, {alpha:1, ease:Power0.easeNone});

	iPhotoResultState = PR_NONE;
}

function cbButtonPhotoTimeYES()
{
//	SESoundPlay(SE_ButtonClick);
//	SESoundPlay(SE_CameraShot);
	iPhotoResultState = PR_INIT;
	sPhotoTime.visible = false;
	sPhotoResult.visible = true;
	sPhotoResult.addChild(sFilm);
//	sPhotoResult.addChild(sResultCatInfo);
	SetResultCatInfo();
//	sFilm.position.set(0, 0);
	bPhotoResultSkip = false;
}

function cbButtonPhotoTimeSkip()
{
	SESoundPlay(SE_ButtonClick);
	iPhotoResultState = PR_INIT;
	sPhotoTime.visible = false;
	sPhotoResult.visible = true;
	sPhotoResult.addChild(sFilm);
//	sPhotoResult.addChild(sResultCatInfo);
	SetResultCatInfo();
//	sFilm.position.set(0, 0);
	bPhotoResultSkip = true;
}

function cbButtonGameOverYESAniEnd(){
	SpinePlay(spine_heart_bomb, iCenterSizeX + 90, iCenterSizeY + 296, "heart_bomb_out", 3, false);
}

function cbButtonGameOverYESAni()
{
	SESoundPlay(SE_ButtonClick);
	if(kData.iLife > 0) {
		networkManager.ForcedSaveData(false, function(){
			SESoundPlay(SE_Heart);
			networkManager.UseHeart(1, cbButtonGameOverYESAniEnd);
		});
	}else{
		SESoundPlay(SE_PopupOn);
		sWarningPopup.visible = true;
		iFilmState = 2;
		sWarningPopup.addChild(sFilm);
	//	sFilm.position.set(0, 0);
	}
}
//턴오버가 되었을때 턴오버창에서 추가이동 확보를 눌렀을때.
function cbButtonGameOverYES()
{
	sGameOver.visible = false;
	SetTurn(tbStageTurn[iStage]);
	SetFade(STATE_GAME);
}

function cbButtonGameOverClose()
{
	BGMSoundPlay(BGM_Title);
	SESoundPlay(SE_ButtonClick);
	// 클로즈를 누르게 되면 스테이지 셀렉트로 나가게 된다.
	sGameOver.visible = false;
	SetFade(STATE_STAGE);
}

function cbButtonTurnOverYESAniEnd(){
	SpinePlay(spine_heart_bomb, iCenterSizeX + 100, iCenterSizeY + 283, "heart_bomb_out", 2, false);
}

function cbButtonTurnOverYESAni()
{
	SESoundPlay(SE_ButtonClick);
	if(kData.iLife > 0) {
		networkManager.ForcedSaveData(false, function(){
			SESoundPlay(SE_Heart);
			networkManager.UseHeart(1, cbButtonTurnOverYESAniEnd);
		});
	}else{
		SESoundPlay(SE_PopupOn);
		sWarningPopup.visible = true;
		iFilmState = 2;
		sWarningPopup.addChild(sFilm);
	//	sFilm.position.set(0, 0);
	}
}

// 턴오버가 되었을때 턴오버창에서 추가이동 확보를 눌렀을때.
function cbButtonTurnOverYES()
{
	SESoundPlay(SE_PopupOff);
	SetTurn(10);
	TweenMax.fromTo(sTurnOver.children[0], 0.2, {alpha:0.9},
		{alpha:0, ease:Linear.easeNone});
	TweenMax.fromTo(sTurnOver.children[1], 0.2, {as:1},
		{as:0, ease:Linear.easeNone, onComplete:cbTweenTurnOverYES});

	// 블럭이 매칭 안되는지 체크한다.
	if(CheckMatchBlock() == false){
		sShufflePopup.visible = true;
		sShufflePopup.alpha = 0;
		TweenLite.to(sShufflePopup, 0.5, {alpha:1, ease:Power0.easeNone, onComplete:cbTweenSufflePopup});
	}
}

function cbTweenTurnOverYES()
{
	sTurnOver.visible = false;
	gameState = STATE_GAME_PLAY;
}

function cbButtonTurnOverClose()
{
	SESoundPlay(SE_PopupOff);
	TweenMax.fromTo(sTurnOver.children[0], 0.2, {alpha:0.9},
		{alpha:0, ease:Linear.easeNone});
	TweenMax.fromTo(sTurnOver.children[1], 0.2, {as:1},
		{as:0, ease:Linear.easeNone, onComplete:cbTweenTurnOverClose});
}

function cbTweenTurnOverClose()
{
	// 여기서는 클로즈를 시키고 . 게임오버창이 나오게 설정한다.
	sTurnOver.visible = false;
	SESoundPlay(SE_StageFail);
	SpinePlay(spine_ready_start, undefined, undefined, "failed", 3, false);
	kHero.spine_Hero.state.timeScale = 1;
	SpinePlay(kHero.spine_Hero, undefined, undefined, "girl_character_failed_in", 3, false);
	gameState = STATE_GAME_OVER_ING;
}

function cbButtonWarningPopupYES()
{
	SESoundPlay(SE_ButtonClick);
	sWarningPopup.visible = false;
	kShop.Show();
	kShop.main.addChild(sFilm);
//	sFilm.position.set(0, 0);
}

function cbButtonWarningPopupNO()
{
	SESoundPlay(SE_ButtonClick);
	sWarningPopup.visible = false;
	CloseWarningPopup();
}

function CloseWarningPopup()
{
	switch(iFilmState){
		case 1:	// 스테이지셀럭트 위치일때.
			sStageSelect.addChild(sFilm);
		//	sFilm.position.set(0, 0);
			break;
		case 2:	// 인포창이 있을때
			sStageInfo.addChild(sFilm);
		//	sFilm.position.set(0, 0);
			break;
		case 3:
			sTurnOver.addChild(sFilm);
			break;
		case 4:
			sGameOver.addChild(sFilm);
			break;
		case 5:
			sPhotoResult.addChild(sFilm);
			break;
	}
}

function cbButtonAlbumInfoClose()
{
	SESoundPlay(SE_PopupOff);
	TweenMax.fromTo(sAlbumInfo.children[0], 0.2, {alpha:0.9},
		{alpha:0, ease:Linear.easeNone});
	TweenMax.fromTo(sAlbumInfo.children[1], 0.2, {as:1},
		{as:0, ease:Linear.easeNone, onComplete:cbTweenAlbumInfoClose});
}

function cbTweenAlbumInfoClose()
{
	sAlbumInfo.visible = false;
}

function cbButtonStageInfoStartAniEnd(){
	SpinePlay(spine_heart_bomb, iCenterSizeX + 140, iCenterSizeY + 400, "heart_bomb_out", 1, false);
}

function cbButtonStageInfoStartAni()
{
	SESoundPlay(SE_ButtonClick);
	if(kData.iLife > 0) {
		networkManager.ForcedSaveData(false, function(){
			SESoundPlay(SE_Heart);
			networkManager.UseHeart(0, cbButtonStageInfoStartAniEnd);
		});
	}
	else {
		SESoundPlay(SE_PopupOn);
		sWarningPopup.visible = true;
		iFilmState = 2;
		sWarningPopup.addChild(sFilm);
	//	sFilm.position.set(0, 0);
	}
}

function cbButtonStageInfoStart()
{
	sGame.visible = false;
	SetTurn(tbStageTurn[iStage]);
	SetFade(STATE_GAME);
}

function cbButtonStageInfoClose()
{
	SESoundPlay(SE_PopupOff);
	TweenMax.fromTo(sStageInfo.children[0], 0.2, {alpha:0.9},
		{alpha:0, ease:Linear.easeNone});
	TweenMax.fromTo(sStageInfo.children[1], 0.2, {as:1},
		{as:0, ease:Linear.easeNone, onComplete:cbTweenStageInfoClose});
	sStageSelect.addChild(sFilm);
//	sFilm.position.set(0, 0);
}

function cbTweenStageInfoClose()
{
	sStageInfo.visible = false;
}

function cbButtonShop()
{
	SESoundPlay(SE_ButtonClick);
	kShop.Show();
	if(sStageInfo.visible == true)
		iFilmState = 2;
	else if(sTurnOver.visible == true)
		iFilmState = 3;
	else if(sGameOver.visible == true)
		iFilmState = 4;
	else if(sPhotoResult.visible == true)
		iFilmState = 5;
	else
		iFilmState = 1;
	kShop.main.addChild(sFilm);
//	sFilm.position.set(0, 0);
}

function cbButtonAlbum()
{
	if(gameState == STATE_GAME_PLAY || state == STATE_STAGE) {
		SESoundPlay(SE_ButtonClick);
		SESoundPlay(SE_PopupOn);
		sAlbumInfo.visible = true;
		stage.addChild(sAlbumInfo);
		UpdateAlbumUI();
		TweenMax.fromTo(sAlbumInfo.children[0], 0.5, {alpha: 0},
			{alpha: 0.9, ease: Linear.easeNone});
		TweenMax.fromTo(sAlbumInfo.children[1], 1, {as: 0.5},
			{as: 1, ease: Elastic.easeOut});
	}
}

function cbButtonOption()
{
	if(gameState == STATE_GAME_PLAY) {
		SESoundPlay(SE_ButtonClick);
		sOption.visible = true;
		sOption.alpha = 1;
	}
}

function cbButtonArrowLeft()
{
	SESoundPlay(SE_PageTransitions);
	--iPage;
	ShowStageSelect(iPage);
}

function cbButtonArrowRight()
{
	SESoundPlay(SE_PageTransitions);
	++iPage;
	ShowStageSelect(iPage);
}

function ShowArrow()
{
	sprArrowLeft.visible = true;
	sprArrowRight.visible = true;

	if(iPage == 0)
		sprArrowLeft.visible = false;
	if(iPage >= iPageMax-1)
		sprArrowRight.visible = false;
}

function ShowStageSelect(_page)
{
	var i;
	ShowArrow();
	if(kData.iStageMax >= 300)
		kData.iStageMax = 299;
	if(_page === undefined)
		iPage = Mathfloor(kData.iStageMax/PAGE_CHILD_CNT);
	else
		iPage = _page;
	txtPage.text = (iPage+1) + " / 25";

	var si = iPage*PAGE_CHILD_CNT;
	for(i=si;i<si+PAGE_CHILD_CNT;++i)
	{
		kStageInfo[i%PAGE_CHILD_CNT].SetInfo(i, kData.iClearStage[i], false, kData.iCatGet[i][4]);
	}
}

function cbButtonStageClick0(){cbButtonStageClick(0);}
function cbButtonStageClick1(){cbButtonStageClick(1);}
function cbButtonStageClick2(){cbButtonStageClick(2);}
function cbButtonStageClick3(){cbButtonStageClick(3);}
function cbButtonStageClick4(){cbButtonStageClick(4);}
function cbButtonStageClick5(){cbButtonStageClick(5);}
function cbButtonStageClick6(){cbButtonStageClick(6);}
function cbButtonStageClick7(){cbButtonStageClick(7);}
function cbButtonStageClick8(){cbButtonStageClick(8);}
function cbButtonStageClick9(){cbButtonStageClick(9);}
function cbButtonStageClick10(){cbButtonStageClick(10);}
function cbButtonStageClick11(){cbButtonStageClick(11);}
function cbButtonStageClick(s){
	SESoundPlay(SE_ButtonClick);
	iStage = s + (iPage * PAGE_CHILD_CNT);
	ShowStageInfo();
}

function ShowStageInfo()
{
	SESoundPlay(SE_PopupOn);
	txtStageNo.text = GetString("STAGE") + " " + leadingZeros(iStage+1, 3);
	sStageInfo.visible = true;
	TweenMax.fromTo(sStageInfo.children[0], 0.5, {alpha:0},
		{alpha:0.9, ease:Linear.easeNone});
	TweenMax.fromTo(sStageInfo.children[1], 1, {as:0.5},
		{as:1, ease:Elastic.easeOut});
	txtBestScore.text = GetString("SCORE") + " " + "0";
	if(txtBestScore.tween != undefined)
		txtBestScore.tween.kill();
	txtBestScore.tween = TweenMax.fromTo(TweenScore, 1,
		{score:0},
		{score:kData.iStageScoreMax[iStage], delay: 0.8, ease:Linear.easeNone,
			onUpdate:function(){txtBestScore.text = GetString("SCORE") + " " + GetComma(Mathfloor(TweenScore.score));}}
	);

//	txtBestScore.text = GetString("SCORE2", GetComma(kData.iStageScoreMax[iStage]));
	sStageInfo.addChild(sFilm);
//	sFilm.position.set(0, 0);
	for(var i=0;i<4;++i){
		if(kData.iCatGet[iStage][i] == CAT_NONE){
			sprStageInfoBG[i].visible = false;
			sprStageInfoCat[i].texture = PIXI.Texture.fromFrame("cat/"+((iStage%50)+1+(i*50))+".png");
			sprStageInfoCat[i].tint = 0x000000;
			sprStageInfoClip[i].texture = PIXI.Texture.fromFrame("start_clip1.png");
		}else{
			sprStageInfoBG[i].visible = true;
			sprStageInfoBG[i].texture = PIXI.Texture.fromFrame("photo_bg"+(Mathfloor(iStage/50)+1)+".png");
			sprStageInfoCat[i].texture = PIXI.Texture.fromFrame("cat/"+((iStage%50)+1+(i*50))+".png");
			sprStageInfoCat[i].tint = 0xffffff;
			sprStageInfoClip[i].texture = PIXI.Texture.fromFrame("start_clip2.png");
		}
	}

	switch(tbBlockPos[iStage]){
		case 0:sStageInfoMap.position.set(0, 0);break;
		case 1:sStageInfoMap.position.set(-10, 0);break;
		case 2:sStageInfoMap.position.set(10, 0);break;
	}
	switch(tbBlockHPos[iStage]){
		case 0:sStageInfoMap.position.set(sStageInfoMap.position.x, 0);break;
		case 1:sStageInfoMap.position.set(sStageInfoMap.position.x, -10);break;
		case 2:sStageInfoMap.position.set(sStageInfoMap.position.x, 10);break;
	}

	for(var y=0;y<MAX_TILE_Y;++y) {
		for (var x=0;x<MAX_TILE_X;++x) {
			if((tbMap[iStage][y][x] & CC) == CC)
				sprStageMap[y][x].visible = true;
			else
				sprStageMap[y][x].visible = false;
		}
	}
}

function cbButtonTitle()
{
	// modifier : kook : 일본대응 : 임시방편..
	if(yahooIN != undefined) {
		if(kData["bTermsOfUse"] === undefined) {
			kMGMenu.ShowTermsOfUse();
			return;
		}

		if(kMGMenu.attendanceTF == 1) // 출석이벤트 토스트 출력.
			kMGMenu.SetToastMsg(kMGMenu.GetString("attendance"));
	}

	spine_nekopang_title.interactive = false;
	SESoundPlay(SE_ButtonClick);
	BGMSoundPlay(BGM_Title);
	SetFade(STATE_STAGE);
}

function SetFade(_nextState)
{
	sprFade.visible = true;
	if(sprFade.tween != undefined)
		sprFade.tween.kill();
	//	TweenLite.killTweensOf(sprFade.tween);
	sprFade.tween = TweenLite.to(sprFade, 0.3, {alpha:1, ease:Power0.easeNone, onComplete:cbTweenFadeInComplete});
	oldState = state;
	state = STATE_FADE_IN;
	nextState = _nextState;
}

function cbTweenFadeInComplete()
{
	switch(nextState)
	{
		case STATE_STAGE:
			if(oldState == STATE_TITLE) {
				stage.removeChild(sTitle);
				kMGMenu.HideYahooIcon();
				txtNotBlock.text = "dummy";
				txtNotBlock.text = GetString("NotBlock");
			}
			else if(oldState == STATE_GAME)
				sGame.visible = false;
			sStageSelect.visible = true;
			sStageSelect.addChild(sFilm);
		//	sFilm.position.set(0, 0);
			sPhotoResult.visible = false;
			sResultCatInfo.visible = false;
			ShowStageSelect();
			sStageInfo.visible = false;
			sprFade.tween = TweenLite.to(sprFade, 0.3, {delay:0.1, alpha:0, ease:Power0.easeNone, onComplete:cbTweenTargetOff});
			state = nextState;
			break;
		case STATE_GAME:
			sStageInfo.visible = false;
			sStageSelect.visible = false;
			sGame.visible = true;
			sOption.visible = false;
			sprFade.tween = TweenLite.to(sprFade, 0.3, {delay:0.1, alpha:0, ease:Power0.easeNone, onComplete:cbTweenTargetOff});
			state = nextState;
			gameState = STATE_GAME_INIT;
			break;
		case STATE_STAGE_INFO:
			sGame.visible = false;
			sPhotoResult.visible = false;
			sResultCatInfo.visible = false;
			sStageSelect.visible = true;
			ShowStageSelect();
		//	sStageInfo.visible = true;
			ShowStageInfo();
			sprFade.tween = TweenLite.to(sprFade, 0.3, {delay:0.1, alpha:0, ease:Power0.easeNone, onComplete:cbTweenTargetOff});
			state = STATE_STAGE;
			break;
	}
}

function cbButtonOptionClose()
{
	SESoundPlay(SE_ButtonClick);
	TweenLite.to(sOption, 0.2, {alpha:0, ease:Power0.easeNone, onComplete:cbTweenTargetOff});
//	TweenPlay(sOption, 0.2, 0, null, {alpha:0}, false, PIXI.tween.Easing.linear(), cbTweenTargetOff);
}

function cbButtonReplay()
{
	SESoundPlay(SE_ButtonClick);
	BGMSoundPlay(BGM_Title);
	SetFade(STATE_STAGE_INFO);
}

function cbButtonOptionHome()
{
	SESoundPlay(SE_ButtonClick);
	BGMSoundPlay(BGM_Title);
	SetFade(STATE_STAGE);
}

function cbButtonAlbumArrowLeft()
{
	SESoundPlay(SE_PageTransitions);
	--iAlbumPage;
	UpdateAlbumUI();
}

function cbButtonAlbumArrowRight()
{
	SESoundPlay(SE_PageTransitions);
	++iAlbumPage;
	UpdateAlbumUI();
}

function ShowAlbumArrow()
{
	sprAlbumArrowLeft.visible = true;
	sprAlbumArrowRight.visible = true;

	if(iAlbumPage == 0)
		sprAlbumArrowLeft.visible = false;
	if(iAlbumPage >= iAlbumPageMax-1)
		sprAlbumArrowRight.visible = false;
}

function UpdateAlbumUI()
{
	var i;
	SetAlbumType();

	for(i=0;i<sprAlbumNew.length;++i)
	{
		if(Object.keys(kData.dicAlbumNew[i]).length > 0)
			sprAlbumNew[i].visible = true;
		else
			sprAlbumNew[i].visible = false;

		if(kData.iCatGetCnt[i] < 200)
		{
			txtAlbumTypePer[i].text = Mathfloor(kData.iCatGetCnt[i] / 200 * 100) + "%";
			txtAlbumTypePer[i]._style._stroke = "#41726F";
			sprAlbumAllClear[i].visible = false;
		}
		else
		{
			txtAlbumTypePer[i].text = Mathfloor(kData.iCatGetCnt[i] / 200 * 100) + "%";
			txtAlbumTypePer[i]._style._stroke = "#7C0103";
			sprAlbumAllClear[i].visible = true;
		}
	}

	ShowAlbumArrow();
	txtAlbumPage.text = (iAlbumPage+1) + " / 50";

	var si = iAlbumPage + (iAlbumType * 50);
	for(var i=0;i<4;++i)
	{
		if(kData.iCatGet[si][i] == CAT_NONE)
		{
			sprAlbumBG[i].visible = false;
			sprAlbumCat[i].texture = PIXI.Texture.fromFrame("cat/"+(iAlbumPage+(i*50)+1)+".png");
			sprAlbumCat[i].tint = 0x000000;
			sprAlbumCatNew[i].visible = false;
		}
		else
		{
			sprAlbumBG[i].visible = true;
			sprAlbumBG[i].texture = PIXI.Texture.fromFrame("photo_bg"+(Mathfloor(si/50)+1)+".png");
			sprAlbumCat[i].texture = PIXI.Texture.fromFrame("cat/"+(iAlbumPage+(i*50)+1)+".png");
			sprAlbumCat[i].tint = 0xffffff;
			if(kData.iCatGet[si][i] == CAT_GET_NEW2 || kData.iCatGet[si][i] == CAT_GET_NEW)
			{
				sprAlbumCatNew[i].visible = true;
				kData.iCatGet[si][i] = CAT_GET;
				delete kData.dicAlbumNew[iAlbumType][(iAlbumType*200)+(iAlbumPage*4)+i];	// 키값 삭제..
				networkManager.ForcedSaveData();
			}
			else
				sprAlbumCatNew[i].visible = false;
		}

		txtAlbumCatNum[i].text = "STAGE."+(si+1)+"-"+(i+1);//"No. " + leadingZeros(1+(iAlbumType*200)+(iAlbumPage*4)+i, 4);
	}

	// 화살표에 느낌표 붙이기 작업..
	sprAlbumArrowNew[0].visible = false;
	sprAlbumArrowNew[1].visible = false;
	for(var key in kData.dicAlbumNew[iAlbumType])
	{
		if(Mathfloor((parseInt(key)%200)/4) < iAlbumPage)
			sprAlbumArrowNew[0].visible = true;
		else if(Mathfloor((parseInt(key)%200)/4) > iAlbumPage)
			sprAlbumArrowNew[1].visible = true;
	}

}

function SetAlbumType()
{
	for(var i=0;i<sprAlbumType.length;++i)
	{
		if(i != iAlbumType)
			sprAlbumType[i].sprite.texture = PIXI.Texture.fromFrame("tab_album_normal.png");
		else
			sprAlbumType[i].sprite.texture = PIXI.Texture.fromFrame("tab_album_selected.png");
	}
}

function cbButtonAlbumType0()
{
	SESoundPlay(SE_ButtonClick);
	iAlbumType = 0;
	UpdateAlbumUI();
}

function cbButtonAlbumType1()
{
	SESoundPlay(SE_ButtonClick);
	iAlbumType = 1;
	SetAlbumType();
	UpdateAlbumUI();
}

function cbButtonAlbumType2()
{
	SESoundPlay(SE_ButtonClick);
	iAlbumType = 2;
	SetAlbumType();
	UpdateAlbumUI();
}

function cbButtonAlbumType3()
{
	SESoundPlay(SE_ButtonClick);
	iAlbumType = 3;
	SetAlbumType();
	UpdateAlbumUI();
}

function cbButtonAlbumType4()
{
	SESoundPlay(SE_ButtonClick);
	iAlbumType = 4;
	SetAlbumType();
	UpdateAlbumUI();
}

function cbButtonAlbumType5()
{
	SESoundPlay(SE_ButtonClick);
	iAlbumType = 5;
	SetAlbumType();
	UpdateAlbumUI();
}

function cbButtonCheat1()
{
	iHeroState = 2;
	iHeroMoveCnt = 0;
	iHeroIndex = tRoad.length;
	bBlockMove = true;
	UpdateBlock();
/*
	SESoundPlay(SE_ButtonClick);
	kData.iClearStage[iStage+1] = STAGE_OPEN;
	kData.iStageMax = iStage+1;
	iStage++;
	SaveDataInClient();
	SetFade(FADE_IN, STATE_GAME);
*/

//	if(CheckMatchBlock() == false)
//	{
//		sShufflePopup.visible = true;
//		sShufflePopup.alpha = 0;
//		TweenLite.to(sShufflePopup, 0.3, {alpha:1, ease:Power0.easeNone, onComplete:cbTweenSufflePopup});
//	}
//	iComboCnt = 0;
//	SpinePlay(kHero.spine_Hero, 0, 0, "girl_character_move_side_right", 0, true);
//	SetScoreAni(iCenterSizeX, iCenterSizeY + 40, 1000, 1);
}

function cbTweenSufflePopup()
{
	// 셔플 시도.
	TweenLite.to(sShufflePopup, 0.5, {delay:1, alpha:0, ease:Power0.easeNone, onComplete:cbTweenSuffleEnd});
//	for(var i=0;i<kBlock.length;++i) {
//		if(kBlock[i].type < BT_NEKO_MAX)
//			TweenLite.to(kBlock[i].sprMain, 0.3, {x:START_X + (kBlock[i].ix*TILE_SIZE_X), y:START_Y + (kBlock[i].iy*TILE_SIZE_Y), ease:Power0.easeNone});
//	}
}

function cbTweenSuffleEnd()
{
	var iCnt = 0;
	for(var i=0;i<kBlock.length;++i) {
		if(kBlock[i].type < BT_NEKO_MAX && kBlock[i].type2 == BT_ITEM_NONE){
			if(iCnt != 0)
				TweenLite.to(kBlock[i].sprMain, 0.3, {x:iCenterSizeX, y:iCenterSizeY, ease:Power0.easeNone});
			else{
				iCnt = 1;
				TweenLite.to(kBlock[i].sprMain, 0.301, {x:iCenterSizeX, y:iCenterSizeY, ease:Power0.easeNone, onComplete:cbTweenBlockSuffle});
			}
		}
	}
}

function cbTweenBlockSuffle()
{
	SESoundPlay(SE_Shuffle);
	while(true)
	{
		for(i=0;i<kBlock.length;++i)
			if(kBlock[i].type < BT_NEKO_MAX && kBlock[i].type2 == BT_ITEM_NONE)
				kBlock[i].SetBlock(Mathfloor(Math.random() * tbBlockTypeMax[iStage]), kBlock[i].type2);
		CheckCreateBlock();
		if(CheckMatchBlock() == true)
			break;
	}

	for(var i=0;i<kBlock.length;++i) {
		if(kBlock[i].type < BT_NEKO_MAX)
			TweenLite.to(kBlock[i].sprMain, 0.3, {x:START_X + (kBlock[i].ix*TILE_SIZE_X), y:START_Y + (kBlock[i].iy*TILE_SIZE_Y), ease:Power0.easeNone, onComplete:cbTweenBlockSuffleEnd});
	}
}

function cbTweenBlockSuffleEnd()
{
	sShufflePopup.visible = false;
}

function cbButtonCheat2()
{
	SESoundPlay(SE_ButtonClick);
	kData.iLife += 10;
//	sGoal.visible = true;
//	SpinePlay(spine_goal_popup_ani, iCenterSizeX, iCenterSizeY, "empty", 0, false);
}

function cbButtonCheat3()
{
	SESoundPlay(SE_ButtonClick);
	if(iHeroIndex+1 < tRoad.length-1){
		BLOCK_Map[tRoad[iHeroIndex+1].y][tRoad[iHeroIndex+1].x].SetBlock(BT_NEKO_1);
		bBlockMove = true;
	}
}

function cbTweenTargetOff()
{
	this.target.visible = false;
}

function SetBG()
{
    sprBG[0] = new PIXI.Container();
    SpriteLoad(sprBG[0], "BG/city_bg_2.png", iCenterSizeX, iCenterSizeY - 475);
    var spr = SpriteLoad(sprBG[0], "BG/city_bg.png", iCenterSizeX, iCenterSizeY + 165);
    spr.scale.set(iMaxSizeX/8, 1);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - 250, iCenterSizeY - 290);
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - 290, iCenterSizeY - 280);
    spr.scale.set(-0.6, 0.6);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - 320, iCenterSizeY - 255);
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - 260, iCenterSizeY - 265);
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - 130, iCenterSizeY - 280);
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - 80, iCenterSizeY - 270);
    spr.scale.set(-0.4, 0.4);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX + 150, iCenterSizeY - 260);
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX + 170, iCenterSizeY - 280);
    spr.scale.set(-0.4, 0.4);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX + 280, iCenterSizeY - 255);
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX + 350, iCenterSizeY - 265);
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX + 340, iCenterSizeY - 225);
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 68), iCenterSizeY - (iCenterSizeY-538));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 522), iCenterSizeY - (iCenterSizeY-496));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 705), iCenterSizeY - (iCenterSizeY-574));
    spr.scale.set(-0.7, 0.7);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 191), iCenterSizeY - (iCenterSizeY-661));
    spr.scale.set(0.65);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 611), iCenterSizeY - (iCenterSizeY-691));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 663), iCenterSizeY - (iCenterSizeY-670));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 161), iCenterSizeY - (iCenterSizeY-865));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[0], "BG/city_object_2.png", iCenterSizeX - (iCenterSizeX - 612), iCenterSizeY - (iCenterSizeY-824));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 102), iCenterSizeY - (iCenterSizeY-496));
    spr.scale.set(-1, 1);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 147), iCenterSizeY - (iCenterSizeY-528));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 577), iCenterSizeY - (iCenterSizeY-559));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 657), iCenterSizeY - (iCenterSizeY-539));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 246), iCenterSizeY - (iCenterSizeY-638));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 561), iCenterSizeY - (iCenterSizeY-705));
    spr.scale.set(-0.8, 0.8);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 653), iCenterSizeY - (iCenterSizeY-778));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 135), iCenterSizeY - (iCenterSizeY-801));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 64), iCenterSizeY - (iCenterSizeY-831));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[0], "BG/city_object_1.png", iCenterSizeX - (iCenterSizeX - 576), iCenterSizeY - (iCenterSizeY-880));
    spr.scale.set(-1, 1);

    sprBG[1] = new PIXI.Container();
    SpriteLoad(sprBG[1], "BG/park_bg_2.png", iCenterSizeX, iCenterSizeY - 475);
    spr = SpriteLoad(sprBG[1], "BG/park_bg.png", iCenterSizeX, iCenterSizeY + 165);
    spr.scale.set(iMaxSizeX/8, 1);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-99), iCenterSizeY-(iCenterSizeY-370));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-192), iCenterSizeY-(iCenterSizeY-365));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-150), iCenterSizeY-(iCenterSizeY-410));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-72), iCenterSizeY-(iCenterSizeY-555));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-89), iCenterSizeY-(iCenterSizeY-669));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-59), iCenterSizeY-(iCenterSizeY-712));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-198), iCenterSizeY-(iCenterSizeY-727));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-442), iCenterSizeY-(iCenterSizeY-380));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-637), iCenterSizeY-(iCenterSizeY-417));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-615), iCenterSizeY-(iCenterSizeY-477));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-573), iCenterSizeY-(iCenterSizeY-509));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-503), iCenterSizeY-(iCenterSizeY-568));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-537), iCenterSizeY-(iCenterSizeY-639));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[1], "BG/park_object_1.png", iCenterSizeX-(iCenterSizeX-649), iCenterSizeY-(iCenterSizeY-661));
    spr.scale.set(0.6);

    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-120), iCenterSizeY-(iCenterSizeY-387));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-59), iCenterSizeY-(iCenterSizeY-408));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-44), iCenterSizeY-(iCenterSizeY-531));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-176), iCenterSizeY-(iCenterSizeY-568));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-115), iCenterSizeY-(iCenterSizeY-609));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-245), iCenterSizeY-(iCenterSizeY-668));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-477), iCenterSizeY-(iCenterSizeY-358));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-507), iCenterSizeY-(iCenterSizeY-374));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-660), iCenterSizeY-(iCenterSizeY-376));
    spr.scale.set(0.3);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-601), iCenterSizeY-(iCenterSizeY-400));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-539), iCenterSizeY-(iCenterSizeY-498));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-677), iCenterSizeY-(iCenterSizeY-503));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-602), iCenterSizeY-(iCenterSizeY-715));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[1], "BG/park_object_2.png", iCenterSizeX-(iCenterSizeX-479), iCenterSizeY-(iCenterSizeY-803));
    spr.scale.set(0.9);

    sprBG[2] = new PIXI.Container();
    SpriteLoad(sprBG[2], "BG/fall_bg_2.png", iCenterSizeX, iCenterSizeY - 475);
    spr = SpriteLoad(sprBG[2], "BG/fall_bg.png", iCenterSizeX, iCenterSizeY + 165);
    spr.scale.set(iMaxSizeX/8, 1);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-235), iCenterSizeY-(iCenterSizeY-371));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-103), iCenterSizeY-(iCenterSizeY-441));
    spr.scale.set(-0.6, 0.6);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-95), iCenterSizeY-(iCenterSizeY-591));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-234), iCenterSizeY-(iCenterSizeY-729));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-514), iCenterSizeY-(iCenterSizeY-343));
    spr.scale.set(-0.4, 0.4);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-634), iCenterSizeY-(iCenterSizeY-389));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-544), iCenterSizeY-(iCenterSizeY-551));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-594), iCenterSizeY-(iCenterSizeY-669));
    spr.scale.set(-1, 1);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_1.png", iCenterSizeX-(iCenterSizeX-662), iCenterSizeY-(iCenterSizeY-822));
    spr.scale.set(1);

    spr = SpriteLoad(sprBG[2], "BG/fall_object_2.png", iCenterSizeX-(iCenterSizeX-58), iCenterSizeY-(iCenterSizeY-365));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_2.png", iCenterSizeX-(iCenterSizeX-147), iCenterSizeY-(iCenterSizeY-474));
    spr.scale.set(-0.7, 0.7);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_2.png", iCenterSizeX-(iCenterSizeX-31), iCenterSizeY-(iCenterSizeY-551));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_2.png", iCenterSizeX-(iCenterSizeX-83), iCenterSizeY-(iCenterSizeY-671));
    spr.scale.set(0.9);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_2.png", iCenterSizeX-(iCenterSizeX-680), iCenterSizeY-(iCenterSizeY-365));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_2.png", iCenterSizeX-(iCenterSizeX-416), iCenterSizeY-(iCenterSizeY-514));
    spr.scale.set(-0.5, 0.5);
    spr = SpriteLoad(sprBG[2], "BG/fall_object_2.png", iCenterSizeX-(iCenterSizeX-690), iCenterSizeY-(iCenterSizeY-580));
    spr.scale.set(1);

    sprBG[3] = new PIXI.Container();
    SpriteLoad(sprBG[3], "BG/ss_bg_2.png", iCenterSizeX, iCenterSizeY - 475);
    spr = SpriteLoad(sprBG[3], "BG/ss_bg.png", iCenterSizeX, iCenterSizeY + 165);
    spr.scale.set(iMaxSizeX/8, 1);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_1.png", iCenterSizeX-(iCenterSizeX-136), iCenterSizeY-(iCenterSizeY-363));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_1.png", iCenterSizeX-(iCenterSizeX-87), iCenterSizeY-(iCenterSizeY-397));
    spr.scale.set(-0.3, 0.3);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_1.png", iCenterSizeX-(iCenterSizeX-295), iCenterSizeY-(iCenterSizeY-697));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_1.png", iCenterSizeX-(iCenterSizeX-85), iCenterSizeY-(iCenterSizeY-840));
    spr.scale.set(-0.8, 0.8);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_1.png", iCenterSizeX-(iCenterSizeX-617), iCenterSizeY-(iCenterSizeY-381));
    spr.scale.set(-0.8, 0.8);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_1.png", iCenterSizeX-(iCenterSizeX-716), iCenterSizeY-(iCenterSizeY-562));
    spr.scale.set(0.7);

    spr = SpriteLoad(sprBG[3], "BG/ss_object_2.png", iCenterSizeX-(iCenterSizeX-123), iCenterSizeY-(iCenterSizeY-551));
    spr.scale.set(-0.9, 0.9);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_2.png", iCenterSizeX-(iCenterSizeX-195), iCenterSizeY-(iCenterSizeY-730));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_2.png", iCenterSizeX-(iCenterSizeX-679), iCenterSizeY-(iCenterSizeY-428));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[3], "BG/ss_object_2.png", iCenterSizeX-(iCenterSizeX-630), iCenterSizeY-(iCenterSizeY-752));
    spr.scale.set(1);

    sprBG[4] = new PIXI.Container();
    SpriteLoad(sprBG[4], "BG/nv_bg_2.png", iCenterSizeX, iCenterSizeY - 475);
    spr = SpriteLoad(sprBG[4], "BG/nv_bg.png", iCenterSizeX, iCenterSizeY + 165);
    spr.scale.set(iMaxSizeX/8, 1);
    spr = SpriteLoad(sprBG[4], "BG/nv_object_1.png", iCenterSizeX-(iCenterSizeX-138), iCenterSizeY-(iCenterSizeY-547));
	spr.scale.set(-1, 1);
    spr = SpriteLoad(sprBG[4], "BG/nv_object_1.png", iCenterSizeX-(iCenterSizeX-553), iCenterSizeY-(iCenterSizeY-357));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[4], "BG/nv_object_1.png", iCenterSizeX-(iCenterSizeX-654), iCenterSizeY-(iCenterSizeY-684));
    spr.scale.set(-1.5, 1.5);

    spr = SpriteLoad(sprBG[4], "BG/nv_object_2.png", iCenterSizeX-(iCenterSizeX-88), iCenterSizeY-(iCenterSizeY-368));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[4], "BG/nv_object_2.png", iCenterSizeX-(iCenterSizeX-206), iCenterSizeY-(iCenterSizeY-724));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[4], "BG/nv_object_2.png", iCenterSizeX-(iCenterSizeX-650), iCenterSizeY-(iCenterSizeY-451));
    spr.scale.set(-0.7, 0.7);

    spr = SpriteLoad(sprBG[4], "BG/nv_object_3.png", iCenterSizeX-(iCenterSizeX-58), iCenterSizeY-(iCenterSizeY-422));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[4], "BG/nv_object_3.png", iCenterSizeX-(iCenterSizeX-708), iCenterSizeY-(iCenterSizeY-599));
    spr.scale.set(-1, 1);

    sprBG[5] = new PIXI.Container();
    SpriteLoad(sprBG[5], "BG/rain_bg_2.png", iCenterSizeX, iCenterSizeY - 475);
    spr = SpriteLoad(sprBG[5], "BG/rain_bg.png", iCenterSizeX, iCenterSizeY + 165);
    spr.scale.set(iMaxSizeX/8, 1);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-43), iCenterSizeY-(iCenterSizeY-356));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-84), iCenterSizeY-(iCenterSizeY-359));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-123), iCenterSizeY-(iCenterSizeY-370));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-92), iCenterSizeY-(iCenterSizeY-374));
    spr.scale.set(0.3);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-212), iCenterSizeY-(iCenterSizeY-386));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-240), iCenterSizeY-(iCenterSizeY-406));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-26), iCenterSizeY-(iCenterSizeY-451));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-245), iCenterSizeY-(iCenterSizeY-467));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-143), iCenterSizeY-(iCenterSizeY-490));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-88), iCenterSizeY-(iCenterSizeY-519));
    spr.scale.set(0.8);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-9), iCenterSizeY-(iCenterSizeY-636));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-53), iCenterSizeY-(iCenterSizeY-683));
    spr.scale.set(0.6);

    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-511), iCenterSizeY-(iCenterSizeY-340));
    spr.scale.set(0.3);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-472), iCenterSizeY-(iCenterSizeY-349));
    spr.scale.set(0.3);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-541), iCenterSizeY-(iCenterSizeY-359));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-692), iCenterSizeY-(iCenterSizeY-361));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-626), iCenterSizeY-(iCenterSizeY-371));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-665), iCenterSizeY-(iCenterSizeY-391));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-602), iCenterSizeY-(iCenterSizeY-464));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-542), iCenterSizeY-(iCenterSizeY-485));
    spr.scale.set(0.3);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-666), iCenterSizeY-(iCenterSizeY-492));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-611), iCenterSizeY-(iCenterSizeY-630));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-395), iCenterSizeY-(iCenterSizeY-669));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-496), iCenterSizeY-(iCenterSizeY-689));
    spr.scale.set(0.7);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-371), iCenterSizeY-(iCenterSizeY-706));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_2.png", iCenterSizeX-(iCenterSizeX-666), iCenterSizeY-(iCenterSizeY-811));
    spr.scale.set(1);

    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-83), iCenterSizeY-(iCenterSizeY-355));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-22), iCenterSizeY-(iCenterSizeY-416));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-95), iCenterSizeY-(iCenterSizeY-460));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-184), iCenterSizeY-(iCenterSizeY-498));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-102), iCenterSizeY-(iCenterSizeY-657));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-623), iCenterSizeY-(iCenterSizeY-337));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-583), iCenterSizeY-(iCenterSizeY-346));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-674), iCenterSizeY-(iCenterSizeY-347));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-514), iCenterSizeY-(iCenterSizeY-359));
    spr.scale.set(0.4);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-665), iCenterSizeY-(iCenterSizeY-485));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-612), iCenterSizeY-(iCenterSizeY-626));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-552), iCenterSizeY-(iCenterSizeY-656));
    spr.scale.set(0.5);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_1.png", iCenterSizeX-(iCenterSizeX-374), iCenterSizeY-(iCenterSizeY-697));
    spr.scale.set(0.6);

    spr = SpriteLoad(sprBG[5], "BG/rain_object_3.png", iCenterSizeX-(iCenterSizeX-65), iCenterSizeY-(iCenterSizeY-565));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_3.png", iCenterSizeX-(iCenterSizeX-144), iCenterSizeY-(iCenterSizeY-607));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_3.png", iCenterSizeX-(iCenterSizeX-542), iCenterSizeY-(iCenterSizeY-452));
    spr.scale.set(0.6);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_3.png", iCenterSizeX-(iCenterSizeX-595), iCenterSizeY-(iCenterSizeY-517));
    spr.scale.set(1);
    spr = SpriteLoad(sprBG[5], "BG/rain_object_3.png", iCenterSizeX-(iCenterSizeX-455), iCenterSizeY-(iCenterSizeY-736));
    spr.scale.set(1);

    for(var i=0;i<6;++i) {
        sGame.addChild(sprBG[i]);
        sprBG[i].visible = false;
    }
}