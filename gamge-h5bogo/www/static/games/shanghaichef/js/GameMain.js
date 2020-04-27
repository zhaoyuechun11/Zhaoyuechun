// 게임상태를 나타낸다.
var STATE_NONE = 0;
var STATE_LOADING_SET = 10;
var STATE_LOADING = 20;
var STATE_TITLE = 40;
var STATE_GAME_SET = 50;
var STAGE_STAGE_SELECT = 55;
var STATE_GAME = 60;
var STATE_GAME_INIT = 1000;
var STATE_GAME_INIT2 = 1010;
var STATE_GAME_START = 1015; // 게임시작전 아이템 구매창..
var STATE_GAME_READYGO = 1016;
var STATE_GAME_TURNBLOCK = 1017;
var STATE_GAME_PLAY = 1020;
var STATE_GAME_CLEAR_ANI = 1025;
var STATE_GAME_CLEAR = 1030;
var STATE_GAME_TIME_OVER_ANI = 1035;
var STATE_GAME_FAILED = 1040;
var STATE_GAME_PAUSE = 1050;

var bMGCHEAT = false;

var kMGMenu = undefined;

var VERSION = "1.01";

var state = STATE_LOADING_SET;	// 게임을 상태를 나타내며..현상태로 해당 함수를 콜한다.
var gameState = STATE_GAME_INIT;
var nextState = STATE_NONE;		// 우선 임시로 놓는다.

var txtLoading;
var iLoadingCnt = 0;
var iLoadingCntDelay = 0;

var txtStage;
//var txtTime;

var iBlockCntType;
var iBlockCnt;

var fPlayTimeMax;
var fPlayTimeMaxStar; // 별용으로 게임에서 설정된 최고 시간을 넣어준다.
var fPlayTime;

var iSelX1 = -1;	// 처음 선택된 패 인덱스
var iSelY1 = -1;
var iSelX2 = -1;	// 처음 선택된 패 인덱스
var iSelY2 = -1;

var iSelComboX1 = -1;
var iSelComboY1 = -1;
var iSelComboX2 = -1;
var iSelComboY2 = -1;

var iLineX1 = 0;
var iLineY1 = 0;
var iLineX2 = 0;
var iLineY2 = 0;
var iLineState = 0;
var arrDeleteList = [];
var arrDeleteTime = [];
var graphicsLine = new PIXI.Graphics();
//graphicsLine.beginFill(0x00ff00);
//thing.clear();
//thing.lineStyle(10, 0xff0000, 1);
//thing.beginFill(0xffFF00, 0.5);
var iStage = 0;
var tempStage = 0;	// 100스테이지 이후 랜덤스테이지를 임시로 저장한다.
var bReplay = false;

var fStartDelay = 0;

var fTimeDelay = 0;
renderer.backgroundColor = 0xffffff; // 백그라운드 컬러를 변경한다.
var sprTimeGauge;
var sprGaugeMask;
var iGaugeMax = 238;

var sprHurryUp;

var txtTime;
var txtTotalPaeCnt;		// 남은패.
var iTotalPaeCnt = 0;
var txtSelectPaeCnt;	// 가능패.
var iSelectPaeCnt = 0;
var comboCount = 0; // 현재 콤보 카운트
var sprInGameStars = [];

var sprPause;
var bPause = false;

var txtItem1;
var txtItem2;
var txtItem3;
var txtItem4;
var sprItem1;
var sprItem2;
var sprItem3;
var sprItem4;
var sprItemBlock = [];
var txtItem1Ex;
var txtItem2Ex;
var txtItem3Ex;
var txtItem4Ex;
var txtItem1Ex2;
var txtItem2Ex2;
var txtItem3Ex2;
var txtItem4Ex2;

//shop itemBuy btn
var sprItemBuy1btn;
var sprItemBuy2btn;
var sprItemBuy3btn;
var sprItemBuy4btn;
var txtItemBuy1btn;
var txtItemBuy2btn;
var txtItemBuy3btn;
var txtItemBuy4btn;

var sprPopupItemBuy1btn;
var sprPopupItemBuy2btn;
var sprPopupItemBuy3btn;
var sprPopupItemBuy4btn;
var sprPopupItemBuy1btn_disable;
var sprPopupItemBuy2btn_disable;
var sprPopupItemBuy3btn_disable;
var sprPopupItemBuy4btn_disable;
var txtPopupItemBuy1btn;
var txtPopupItemBuy2btn;
var txtPopupItemBuy3btn;
var txtPopupItemBuy4btn;
var sprCoinPopupItem = [];

var sprADCoinbtn;
var sprADLifebtn;
var sprPopupADCoinbtn;
var sprPopupADLifebtn;

var bShopADItem = [false,false,false,false];

var bShopADCoin = false;
var bShopADLife = false;

var coinCoolTime = AD_COIN_COOL_TIME;
var lifeCoolTime = AD_LIFE_COOL_TIME;
var itemCoolTime = [AD_ITEM_COOL_TIME,AD_ITEM_COOL_TIME,AD_ITEM_COOL_TIME,AD_ITEM_COOL_TIME];
var comboTime = 0;

var bItem2Bomb = false;
var bItem3Hint = false;
var bComboBonus = false;

var txtPopupStage;
var txtResultReward;
var txtResultRecord;
var txtResultBonus;
var sprCoinReward;
var sprCoinBonus;
var sprStar = [];

var txtPopupTitle;
var txtPopupChargeTitle;
var txtPopupShopTitle;
var bIsHeartCharge = false;
var bisHeartShop = false;
var txtPopupShopPoint;
var list_iShopItem_heart = [5,5,20,60];
var list_iShopItem_gold = [1000,1000,6000,15000];
var txtShopItemCnt = [];
var list_sprPopupShopBtn = [];
var sprPopupShopBtn_disable = [];
var iSelectedShopItem;
var txtPopupShopPointOnlyOurClient = [];
//var sprPopupShopListContents = [];
var sprPopupShopContents = [];
var txtPopupShopContentsInBtn = [];
var sprPopupShopContentsInBtn = [];
var txtPopupShopContentsCooltime = [];
var sprPopupShopMCoins = [];

var txtItemInfo;

var sprPopupShopConfirm;
var txtPopupShopConfirm;
var txtPopupShopConfirmContent;

var mcCursor = [];
var mcHintCursor = [];

var mcTurnBlockOpen = [];
var mcTurnBlockClose = [];

var spine_time_eff;
var spine_item_use_eff;
var spine_bomb_eff = [];
var spine_eff = [];
var spine_failed_ani;
var spine_failed_ani_copy;

var spine_select_blocks = [];
var spine_hint_blocks = [];
var spine_combo_ani_big;
var spine_combo_ani_mini = [];

var spine_6_combo_ani_under = [];
var spine_6_combo_ani_up = [];

//var spine_star_eff_popup = [];
var fstar_eff_popup_time;
//var spine_result_btn_eff;
//var spine_lock_eff_data;
var spine_title_ani;
var spine_etc_message;
var spine_full_combo;
var spine_heart_bomb;
var spine_clear;
var spine_clear_stars = [];
var spine_blockBomb = [];

var txtComboCount = [];
var txtCombo = [];

var sprStage = [];
var sprStageSelectedStars = [];
var sprStageSelectFullCombo;
var iPageMax;
var iPage;
var PAGE_CHILD_CNT = 16;
var sprArrowLeft;
var sprArrowRight;
var txtPageInfo;

var txtShopCoinTimer;
var txtShopLifeTimer;
var txtPopupShopCoinTimer;
var txtPopupShopLifeTimer;

var btnTitleSound = undefined;
var sprSoundBGM;

var bHurryUpSoundPlay = false;
var fHurryUpSoundTime = 5;		// 5초 이하일경우.

var sprGameStartBtnStart;
var sprGameStartBtnStartLife;
var txtGameStartBtnStart;
var sprGameStartBtnBack;

var sprPopupItemGetItemIcon;
var txtPopupItemGetItemName;

var bStageSelectTouch = true;

var txtPopupTutorialTitle;
var sprPopupCharge;
var txtPopupChargeMsg;

var coinLifeView = new CoinLifeView(cbButtonShop, ShowPopupGameStart, UpdatePopupGameStart);
coinLifeView.init();	// 바로 초기화.작업진행.

var sprPopupExitYesButton;
var sprPopupRetryYesButton;

// Q-UP UI 작업 관련 추가
var sprInGame_BG = [];

var b_timeStop = false;
var sprLineHorizontal = [];
var sprLineVertical = [];
var sprLineAnchor = [];
var sprLineHorizontal_Combo = [];
var sprLineVertical_Combo = [];
var sprLineAnchor_Combo = [];

var loadingcount=0;           //로딩    카운트
var loadingcountmax = 66;      //로딩맥스 카운트
var loadingscalemax = 256;    //스케일 480보다 1많게

var interval_font_id;

$(document).ready(function () {
     // servicePos=1;	// 강제 야후페이지
    /*FontLoad(stage,'testText',-200,-200, 0.5,0.5,
        {font:'20px ' + tbTTF[lang], fill:'#ffffff',
            stroke:'#000000', strokeThickness:6});*/

    // alert('IOS ? :: ' + iOS() );
//    if(iOS()){
//        setTimeout(function () {

    LoadDataInClient();

    update();

  /*          networkManager.GetGameInfo(function (_data) {
            	if(_data != undefined) {
					iHeartChargeMax = _data['baseHeart'];
					iHeartInitData = _data['initHeart'];
					fHeartChargeTime = _data['Heartrefill'];
					iCoinInitData = _data['money_base'];
				}
                if(loginTF == 0)
                    LoadDataInClient();

                update();
            });*/
//        },1000);
//    }else{
//        interval_font_id = setInterval("interval_readytofont()",100);
//    }
});
/*
function iOS() {
    var iDevices = [
        'iPad Simulator',
        'iPhone Simulator',
        'iPod Simulator',
        'iPad',
        'iPhone',
        'iPod'
    ];
    if (!!navigator.platform) {
        while (iDevices.length) {
            if (navigator.platform === iDevices.pop()){ return true; }
        }
    }
    return false;
}

function interval_readytofont(){
    // alert( tbTTF[lang] + " loaded :: " + document.fonts.check("1px "+ tbTTF[lang]));
    renderer.render(stage);

    // alert(navigator.userAgent.toLowerCase());
    var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    var is_edge = navigator.userAgent.toLowerCase().indexOf('edge') > -1;
    if(is_edge){
        networkManager.GetGameInfo(function (_data) {
            clearInterval(interval_font_id);
            // alert(JSON.stringify(_data));
            iHeartChargeMax = _data['baseHeart'];
            iHeartInitData = _data['initHeart'];
            fHeartChargeTime = _data['Heartrefill'];
            iCoinInitData = _data['money_base'];

            if(loginTF == 0)
                LoadDataInClient();

            update();
        });
	}else if(is_chrome){
        if(document.fonts.check("1px "+ tbTTF[lang])){
            clearInterval(interval_font_id);
            networkManager.GetGameInfo(function (_data) {
                // alert(JSON.stringify(_data));
                iHeartChargeMax = _data['baseHeart'];
                iHeartInitData = _data['initHeart'];
                fHeartChargeTime = _data['Heartrefill'];
                iCoinInitData = _data['money_base'];

                if(loginTF == 0)
                    LoadDataInClient();

                update();
            });
        }
	}else{
        networkManager.GetGameInfo(function (_data) {
            clearInterval(interval_font_id);
            // alert(JSON.stringify(_data));
            iHeartChargeMax = _data['baseHeart'];
            iHeartInitData = _data['initHeart'];
            fHeartChargeTime = _data['Heartrefill'];
            iCoinInitData = _data['money_base'];

            if(loginTF == 0)
                LoadDataInClient();

            update();
        });
	}
}*/

// $(window).on("beforeunload", function () {
// 	// 탭이 닫히기 전에 호출
// 	return "good-bye";
// });

function update()
{
	switch(state)
	{
		case STATE_NONE:
			break;
		case STATE_LOADING_SET:
			// 회사 로고 이미지를 로딩한다.
			var loader = PIXI.loader;
			// loader.add("Loading/loading_color.png", "Loading/loading_color.png");
			// loader.add("Loading/loading_color_mask.png", "Loading/loading_color_mask.png");
			// loader.add("Loading/loading_grey.png", "Loading/loading_grey.png");
			// loader.add("Loading/loading_logo.png", "Loading/loading_logo.png");
            loader.add("Loading/loading_color.png", strGamePath+"Loading/loading_color.png");
            loader.add("Loading/loading_grey.png", strGamePath+"Loading/loading_grey.png");
            loader.add("Loading/movi_name.png", strGamePath+"Loading/movi_name.png");

			loader.once('complete',cbLogoComplete);
			loader.load();

			// ('Text01',
				// {fontFamily:tbTTF[lang], fontSize:'20px', fill:'#ffffff',
				// 	stroke:'#000000', strokeThickness:6});
            // fastFontLoadData.anchor.set(0.5,0.5);
            // fastFontLoadData.position.x = -300;
            // fastFontLoadData.position.y = -300;

            txtLoading = new PIXI.Text('Loading', {
                //font: 'bold 30px Arial',
                font: '30px Arial',
                fill: '#2e85ed'
            });
            txtLoading.anchor.set(0.5, 0.5);
            txtLoading.position.x = 360;
            txtLoading.position.y = 730;
            txtLoading.text = "0%";
            stage.addChild(sLoading);
            sLoading.addChild(txtLoading);

            //--프로그래스바시작--                      <----여기서부터 복사시작
            var resources = PIXI.loader.resources;

            //로딩바작동
            loader.on(
                "progress",
                function (loader, resources){
                    loadingcount+=1;
                    var progbias=loadingcount/loadingcountmax;
                    var prog = progbias*100;
                    //progFore.scale.x=progbias;

                    var progcrop = prog<1?1:prog>100?100:prog;
                    txtLoading.text = ""+ Math.floor(progcrop)+"%";

                    if(loadingcount==0)txtLoading.text="0%";
                    if(typeof sprLogoMask !== "undefined"            //마스크로딩이 완료되면 나오게
                        && sprLogoMask) {
                        // sprLogoMask.scale.x = scalexcrop;

                        sprLogoMask.clear();
                        sprLogoMask.beginFill(0xffffff,1);
                        sprLogoMask.moveTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
                        sprLogoMask.lineTo(sprLogoProg.x - progW_half + (sprLogoProg.width * progbias), sprLogoProg.y - progH_half);
                        sprLogoMask.lineTo(sprLogoProg.x - progW_half + (sprLogoProg.width * progbias), sprLogoProg.y + progH_half);
                        sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);

                        if(sprLogoProg.alpha<1) sprLogoProg.alpha=1; //보라색로고가 나오게
                    }
                    // //디버그용도 -->
                    // 여기서 오브젝트 카운트를 알 수 있고,
                    // 사운드는 나중에 로딩 될 수 있음, 그래서 타이틀 등장시 오브젝트카운트틀 사용하면 적당
                    //
                    //  var text = (`loading: ${resources.url}`+"\n");
                    //  text += (`progress: ${loader.progress}`+"\n");
                    //  text += (loadingcount+"\n");
                    //  console.log("progress:"+ text);
                    // txtLoading.text=loadingcount; //
                    // //디버그용도
                }
            );

            //pixi3
            // loader.load(function () {
            // txtLoading.text = "100%";
            // sprLogoMask.scale.x = loadingscalemax;
            // }
            // );
            //pixi3

            //pixi4
            // loader.load(
            //     function () {
            //         var progbias = loadingcount / loadingcountmax;
            //         var prog = progbias * 100;
            //         //progFore.scale.x=progbias;
            //
            //         var progcrop = prog < 1 ? 1 : prog > 100 ? 100 : prog;
            //         txtLoading.text = "" + Math.floor(progcrop) + "%";
            //         if (loadingcount == 0) txtLoading.text = "0%";
            //         var scalex = loadingscalemax * progbias;
            //         var scalexcrop = scalex < 1 ? 1 : scalex > loadingscalemax ? loadingscalemax : scalex;
            //         if (typeof sprLogoMask !== "undefined"            //마스크로딩이 안되면 안나오게
            //             && sprLogoMask) {
            //
            //             // sprLogoMask.scale.x = scalexcrop;
            //             if (sprLogoProg.alpha < 1) sprLogoProg.alpha = 1; //보라색로고가 나오는 경우를 막기 위해
            //         }
            //     }
            // );
            //pixi4
            //--프로그래스바완료--                            <----여기서부터 복사끝

			state = STATE_LOADING;
			break;
		case STATE_LOADING:
			break;

		case STATE_TITLE: // 타이틀화면에서 키입력이 있기까지 대기한다.
            break;

		case STATE_GAME_SET:
            stage.removeChild(sTitle);
			ShowStageSelect();

            kMGMenu.MoveMenu(120);

			state = STAGE_STAGE_SELECT;//STATE_GAME;
			break;
		case STAGE_STAGE_SELECT:
			break;
		case STATE_GAME:
			switch(gameState){
				case STATE_GAME_INIT:
					renderer.backgroundColor = 0x3c6291;

					gameState = STATE_GAME_INIT2;
					break;
				case STATE_GAME_INIT2:
                    sGame.visible = false;
					var ti;
					RandomBlockMix();
					// 초기화.
					iTotalPaeCnt = 0;
					bItem2Bomb = false;
					bItem3Hint = false;
					bComboBonus = false;
					comboTime = 0;
					comboCount = 0;

					if(iStage < 300)
						ti = iStage;
					else{
						if(bReplay == false)	tempStage = ti = Math.floor(100 + (Math.random() * 100));
						else					ti = tempStage;
						bReplay = false; // 초기화 작업..
					}

					var tbBlockCntType = [];

					if(tbStageInfo[ti][1] != 0) // 2개짜리 블럭이 없을경우 상태값을 바로 2로 점프한다.
						tbBlockCntType.push(0);
					if(tbStageInfo[ti][2] != 0)
						tbBlockCntType.push(2);
					if(tbStageInfo[ti][3] != 0)
						tbBlockCntType.push(6);
					if(tbStageInfo[ti][4] != 0)
						tbBlockCntType.push(12);
					iBlockCntType = tbBlockCntType.shift();
					iBlockCnt = 0;

					fPlayTimeMaxStar = fPlayTimeMax = fPlayTime = tbStageInfo[ti][0] + (tbStageInfo[ti][1] * fTime1) + ((tbStageInfo[ti][2] + tbStageInfo[ti][3] + tbStageInfo[ti][4]) * fTime2);

                    sprGaugeMask.clear();
                    sprGaugeMask.beginFill(0x8bc5ff,1);
                    sprGaugeMask.moveTo(-1 * (sprTimeGauge.width/2),sprTimeGauge.height/2);
                    sprGaugeMask.lineTo(-1 * (sprTimeGauge.width/2), -1 * (sprTimeGauge.height/2));
                    sprGaugeMask.lineTo(sprTimeGauge.width/2, -1 * (sprTimeGauge.height/2));
                    sprGaugeMask.lineTo(sprTimeGauge.width/2, (sprTimeGauge.height/2));

                    for(var i=0,imax=3;i<imax;++i)
                    	sprInGameStars[i].texture = PIXI.Texture.fromImage("inGame/time_star_1.png");

					bHurryUpSoundPlay = false;
					updateTime();
					updateItemFont();

					txtStage.text = GetString('stage') + ' ' + (iStage + 1);

                    iBlock_LockCnt = 0;

					for(var y=0;y<BLOCK_HEIGHT;++y){
						for(var x=0;x<BLOCK_WIDTH;++x){
							// kook : test
							//tbBlock[y][x] = test[y][x];//tbStageType[ti][y][x];
							tbBlock[y][x] = tbStageType[ti][y][x];
							switch(tbBlock[y][x])
							{
							case 0:
								tbBlock[y][x] = -1;
								break;
							case 1:
								switch(iBlockCntType)
								{
									case 0: // 0일경우 첫번째꺼를 카운팅한다.
										tbBlock[y][x] = randomBlock[iBlockCnt%BLOCK_MAX];
										if(++iBlockCnt >= tbStageInfo[ti][1])
										{
											iBlockCnt = 0;
											iBlockCntType++;
										}
										break;
									case 1:
										tbBlock[y][x] = randomBlock[iBlockCnt%BLOCK_MAX];
										if(++iBlockCnt >= tbStageInfo[ti][1])
											iBlockCntType = tbBlockCntType.shift();
										break;
									case 2:case 3:case 4:
										tbBlock[y][x] = randomBlock[iBlockCnt%BLOCK_MAX];
										if(++iBlockCnt >= tbStageInfo[ti][1] + tbStageInfo[ti][2])
										{
											iBlockCnt = tbStageInfo[ti][1];
											iBlockCntType++;
										}
										break;
									case 5:
										tbBlock[y][x] = randomBlock[iBlockCnt%BLOCK_MAX];
										if(++iBlockCnt >= tbStageInfo[ti][1] + tbStageInfo[ti][2])
											iBlockCntType = tbBlockCntType.shift();
										break;
									case 6:case 7:case 8:case 9:case 10:
										tbBlock[y][x] = randomBlock[iBlockCnt%BLOCK_MAX];
										if(++iBlockCnt >= tbStageInfo[ti][1] + tbStageInfo[ti][2] + tbStageInfo[ti][3])
										{
											iBlockCnt = tbStageInfo[ti][1] + tbStageInfo[ti][2];
											iBlockCntType++;
										}
										break;
									case 11:
										tbBlock[y][x] = randomBlock[iBlockCnt%BLOCK_MAX];
										if(++iBlockCnt >= tbStageInfo[ti][1] + tbStageInfo[ti][2] + tbStageInfo[ti][3])
											iBlockCntType = tbBlockCntType.shift();
										break;
									case 12:case 13:case 14:case 15:case 16:case 17:case 18:case 19:
										tbBlock[y][x] = randomBlock[iBlockCnt%BLOCK_MAX];
										if(++iBlockCnt >= tbStageInfo[ti][1] + tbStageInfo[ti][2] + tbStageInfo[ti][3] + tbStageInfo[ti][4])
										{
											iBlockCnt = tbStageInfo[ti][1] + tbStageInfo[ti][2] + tbStageInfo[ti][3];
											iBlockCntType++;
										}
										break;
								}
								iTotalPaeCnt++;
								break;
							case 2: // 방해블럭
								tbBlock[y][x] = BLOCK_LOCK;
								iBlock_LockCnt++;
								break;
							}
						}
					}

					// 블럭을 믹스시킨다.
					BlockMix(); // kook : test

					for(var y=0;y<BLOCK_HEIGHT;++y){
						for(var x=0;x<BLOCK_WIDTH;++x){
							if(tbBlock[y][x] == -1){
								sprBlock[y][x].visible = false;
							}
							else{
								// sprBlock[y][x].texture = SpritePool.getInstance().get(blockImgGame[tbBlock[y][x]]).texture;
								sprBlock[y][x].texture = PIXI.Texture.fromFrame(blockImgGame[tbBlock[y][x]]).texture;
								sprBlock[y][x].type = tbBlock[y][x];
								sprBlock[y][x].tint = 0xffffff;
								sprBlock[y][x].anchor.set(0.5,0.5);
								sprBlock[y][x].visible = true;
								sprBlock[y][x].interactive = false;
                                sprBlock[y][x].alpha = 1;
							}
						}
					}

					updateHint();
					updatePaeCntFont();
                    CalcChekingCombo();

					if(iTotalPaeCnt > 0 && iSelectPaeCnt == 0) // 맞출패가 없을경우 자동셔플을 한다.
						Item4Mix();

					ShowPopupGameStart();
					break;
				case STATE_GAME_START:
					break;
				case STATE_GAME_READYGO:
					ComboCheck(false);
					//fStartDelay += deltaTime;
					if(!sGame.visible ){
						BGMSoundPlay(BGM_BG_Game);

                        sStageSelect.visible = false;
                        sGame.visible = true;

                        for(var newy=0;newy<BLOCK_HEIGHT;++newy)
                            for(var newx=0;newx<BLOCK_WIDTH;++newx)
                                if((newy == 0 || newy == BLOCK_HEIGHT - 1 || newx == 0 || newx == BLOCK_WIDTH - 1) == false)
                                    sGame.addChild(sprBlock[newy][newx]);

                        fStartDelay = 0;

                        iTurnBlockCompCnt = 0;
                        fTurnBlockTime = 0;

                        if(kData.bFirst){
                            ShowPopup(true,POPUP_TYPE.GAME_TUTORIAL);
						}
						else{
                            ShowPopup(false);
                            spine_etc_message.visible= true;
                            SpinePlay(spine_etc_message,null,null,'ready_go',1,false);
						}
					}

					break;
				case STATE_GAME_TURNBLOCK:
                    TurnBlock(b_turnOpen,b_turnAnim);
					break;
				case STATE_GAME_PLAY:
                    for(var i=0;i<arrDeleteTime.length;++i)
					{
						arrDeleteTime[i] -= deltaTime;
						if(arrDeleteTime[i] < 0)
						{
							arrDeleteTime.shift();
							sprBlock[arrDeleteList.shift()][arrDeleteList.shift()].visible = false;
							sprBlock[arrDeleteList.shift()][arrDeleteList.shift()].visible = false;

							if(iSelX1 == -1){
                                // 빠르게 클릭할경우 커서가 옮겨간상태에서 지워지는 현상을 방지한다.
                                spine_select_blocks[0].visible = false;
                                spine_select_blocks[1].visible = false;
							}

                            for(var i=0,imax=sprLineVertical.length;i<imax;++i){
                                sprLineVertical[i].visible = false;
                                sprLineVertical_Combo[i].visible = false;
                            }

                            for(var i=0,imax=sprLineHorizontal.length;i<imax;++i){
                                sprLineHorizontal[i].visible = false;
                                sprLineHorizontal_Combo[i].visible = false;
                            }

                            for(var i=0,imax=sprLineAnchor.length;i<imax;++i){
                                sprLineAnchor[i].visible = false;
                                sprLineAnchor_Combo[i].visible = false;
                            }

							iTotalPaeCnt -= 2;
							updateHint();
							updatePaeCntFont();

							if(iTotalPaeCnt > 0 && iSelectPaeCnt == 0) // 맞출패가 없을경우 자동셔플을 한다.
								Item4Mix();
						}
					}

					// 시간 줄어드는 마스크
					sprGaugeMask.clear();
					sprGaugeMask.beginFill(0x8bc5ff,1);
                    sprGaugeMask.moveTo(-1 * (sprTimeGauge.width/2),sprTimeGauge.height/2);
                    sprGaugeMask.lineTo(-1 * (sprTimeGauge.width/2), -1 * (sprTimeGauge.height/2));
                    sprGaugeMask.lineTo((sprTimeGauge.width/2) - (sprTimeGauge.width *  (1- (fPlayTime / fPlayTimeMax))), -1 * (sprTimeGauge.height/2));
                    sprGaugeMask.lineTo((sprTimeGauge.width/2) - (sprTimeGauge.width * (1 - (fPlayTime / fPlayTimeMax))), (sprTimeGauge.height/2));

					if(fPlayTime/fPlayTimeMax <= STAR_3)
						sprInGameStars[2].texture = PIXI.Texture.fromImage("inGame/time_star_2.png");
					else
                        sprInGameStars[2].texture = PIXI.Texture.fromImage("inGame/time_star_1.png");

                    if(fPlayTime/fPlayTimeMax <= STAR_2)
                        sprInGameStars[1].texture = PIXI.Texture.fromImage("inGame/time_star_2.png");
                    else
                        sprInGameStars[1].texture = PIXI.Texture.fromImage("inGame/time_star_1.png");

					ClearCheck();
                    //updateComboFont();

					if(!b_timeStop)
						fPlayTime -= deltaTime;
					updateTime();

					if(fPlayTime <= 0)
					{
						fPlayTime = 0;

						updateTime();

						//sprGaugeMask.scale.set(iGaugeMax * fPlayTime / fPlayTimeMax, 1);

                        sprGaugeMask.clear();
                        sprGaugeMask.beginFill(0x8bc5ff,1);
                        sprGaugeMask.moveTo(-1 * (sprTimeGauge.width/2),sprTimeGauge.height/2);
                        sprGaugeMask.lineTo(-1 * (sprTimeGauge.width/2), -1 * (sprTimeGauge.height/2));
                        sprGaugeMask.lineTo(-1 * (sprTimeGauge.width/2), -1 * (sprTimeGauge.height/2));
                        sprGaugeMask.lineTo(-1 * (sprTimeGauge.width/2) , (sprTimeGauge.height/2));
                        sprInGameStars[0].texture = PIXI.Texture.fromImage("inGame/time_star_2.png");

						fTimeDelay = 0;
						BGMSoundPause();
						SESoundPlay(SE_TIMEOVER, true);
						SpinePlay(spine_etc_message, null, null, "time_over", 2, false);

						//mcHintCursor[0].visible = false;
						//mcHintCursor[1].visible = false;
						iSelX1 = -1;
						iSelY1 = -1;
                        spine_select_blocks[0].visible = false;
                        spine_select_blocks[1].visible = false;

						gameState = STATE_GAME_TIME_OVER_ANI;
					}else{
                        comboTime = ComboTimer(comboTime);
					}
					break;
				case STATE_GAME_CLEAR_ANI:

					if(spine_select_blocks[0].visible)
                        spine_select_blocks[0].visible = false;
					if(spine_select_blocks[1].visible)
                        spine_select_blocks[1].visible = false;
                    //updateComboFont();
					break;
				case STATE_GAME_CLEAR:
                    if(spine_select_blocks[0].visible)
                        spine_select_blocks[0].visible = false;
                    if(spine_select_blocks[1].visible)
                        spine_select_blocks[1].visible = false;

					UpdatePopupGameClear();
					break;
				case STATE_GAME_TIME_OVER_ANI:
                    if(spine_select_blocks[0].visible)
                        spine_select_blocks[0].visible = false;
                    if(spine_select_blocks[1].visible)
                        spine_select_blocks[1].visible = false;
					break;
				case STATE_GAME_FAILED:
                    if(spine_select_blocks[0].visible)
                        spine_select_blocks[0].visible = false;
                    if(spine_select_blocks[1].visible)
                        spine_select_blocks[1].visible = false;
					break;
			}
			break;
	}

	requestAnimationFrame(update);
	renderer.render(stage);

	updateComboFont();
	updateTick();

	if(coinLifeView != null)
		coinLifeView.update();

	if(networkManager != null)
		networkManager.Update();

    if(document.body.scrollTop != 0) // yahooIN : 모바일페이지에서 화면이 올라가는증상을 해결함.
        document.body.scrollTop = 0;

	fTimeDelay += deltaTime;
}

function SetSoundIcon()
{
	if(servicePos == 0){
        if(clientData.bSoundBGM == true) {
            sprSoundBGM.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound.png");
            if(yahooIN !== undefined && biPhone == true)
                btnTitleSound.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound.png");
        }
        else {
            sprSoundBGM.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound_off.png");
            if(yahooIN !== undefined && biPhone == true)
                btnTitleSound.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound_off.png");
        }
	}else{
        if(kData.bSoundBGM == true) {
            sprSoundBGM.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound.png");
            if(yahooIN !== undefined && biPhone == true)
                btnTitleSound.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound.png");
        }
        else {
            sprSoundBGM.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound_off.png");
            if(yahooIN !== undefined && biPhone == true)
                btnTitleSound.texture = PIXI.Texture.fromFrame("Popup/btn_set_sound_off.png");
        }
	}

}

// 9초에 한번씩 세이브를 하게 한다. (이상태로 유지시 36 (9 * 4) 초 당 한 번 씩 서버에 올라감)
// 17.03.07 제거
function updateSave()
{
	fSaveTime -= deltaTime;
	if(fSaveTime <= 0){
        fSaveTime = SAVE_TIME_INIT;
        networkManager.SaveData();
	}
}

var bIsNextStageButtonClicked = false;

function cbButtonNextStage()
{
    BlockSelectDisable();

    SESoundPlay(SE_CLICK);
    sGame.visible = false;
    BGMSoundPlay(BGM_BG_Main);
    iStage++;

    if(iStage >= 100)
        bReplay = true;

    ShowStageSelect();

    for(var i=0,imax=sprStageSelectedStars.length;i<imax;++i){
        if(i < kData.clearStage[iStage])
            sprStageSelectedStars[i].visible = true;
        else
            sprStageSelectedStars[i].visible = false;
    }

    if(kData.clearStage[iStage] >= 1)
    	sprStageSelectFullCombo.visible = true;
	else
        sprStageSelectFullCombo.visible = false;

    bIsNextStageButtonClicked = true;
    ShowPopup(false);
    state = STATE_GAME;
    gameState = STATE_GAME_INIT2;
}

function ButtonShowStageSelect() {
    BlockSelectDisable();

    SESoundPlay(SE_CLICK);
    BGMSoundPlay(BGM_BG_Main);
    ShowPopup(false);
    ShowStageSelect();
    state = STAGE_STAGE_SELECT;
}

function UpdatePopupGameStart()
{
	if(kData.life > 0)
	{
		sprGameStartBtnStart.visible = true;
		sprGameStartBtnBack.visible = true;
		txtGameStartBtnStart.text = GetString("start");
		sprGameStartBtnStart.position.x = iCenterSizeX + 144;
	}
	else
	{
		// 하트가 없을경우 처리..
		sprGameStartBtnStart.visible = true;
		sprGameStartBtnBack.visible = true;
        txtGameStartBtnStart.text = GetString("start");
		sprGameStartBtnStart.position.x = iCenterSizeX + 144;
	}
}

function ShowPopupGameStart()
{
	switch(gameState)
	{
		case STATE_GAME_PAUSE:
			sprGameStartBtnStart.visible = true;
			sprGameStartBtnBack.visible = false;
			txtGameStartBtnStart.text = GetString("close");
			sprGameStartBtnStart.position.x = iCenterSizeX;
			HidePause();
			break;
		case STATE_GAME_FAILED:
            ShowPopup(false);
			break;
		default:
			UpdatePopupGameStart();
			break;
	}

	txtPopupStage.text = GetString('stage') + ' ' + (iStage + 1);

	updateItemFont();
	coinLifeView.show(2);
	coinLifeView.updateFont();

	CheckItemEnableToBuy();

	if(spine_etc_message.visible)
		spine_etc_message.visible = false;
}

function HidePopupGameStart()
{
	sPopupBase.visible = false;
	sPopupGameStart.visible = false;
}

var iStarCnt = 0;
var tbStarAniDelay = [0.2, 0.6, 1.0, 1.3];
var clearAniDelay = 0.5;
var iIsFullCombo = 0;

function ShowPopupGameClear()
{
	coinLifeView.show(4);
	var fStar = fPlayTime / fPlayTimeMaxStar;

	txtPopupStage.text = GetString('stage') + ' ' + (iStage + 1);

	fstar_eff_popup_time = 0;

	if(fStar > STAR_3)
		iStarCnt = 3;
	else if(fStar > STAR_2)
		iStarCnt = 2;
	else
		iStarCnt = 1;

    if(iFullComboMax == comboCount)
        iIsFullCombo = 1;
    else
        iIsFullCombo = 0;

    for(var i=0,imax=sprStageSelectedStars.length;i<imax;++i){
		sprStageSelectedStars[i].visible = false;
    }
    sprStageSelectFullCombo.visible = false;

	if(kData.clearStage[iStage + 1] == null){// 스테이지 클리어후 다음스테이지를 오픈시킨다.
        kData.clearStage.push(-1);	// -1일경우 스테이지 셀럭트로 갔을경우 자물쇠 오픈 이벤트를 한다.
        kData.clearFullCombStage.push(-1);
	}


	if(kData.clearStage[iStage] <= iStarCnt){
        if(kData.clearStage[iStage] == 3 && kData.clearFullCombStage[iStage] >= 1)
	        kData.clearFullCombStage[iStage] = 1;
        else
            kData.clearFullCombStage[iStage] = iIsFullCombo;

        kData.clearStage[iStage] = iStarCnt;
	}

    fPlayTime += 0.99999; // 유저에게 보상을 1초 더 준다.

    fCurrent_delrayGoldCntTime = 0;
    countingCnt = 1;
    countUpGold_normalReward = 0;
    fCountUpTime = 0;
    iCountUpTimeReward = 0;

    CoinAdd(STAGE_CLEAR_REWARD + (Math.floor(fPlayTime) * COINPERSECOND));

	iPage = Math.floor((kData.clearStage.length-1) / PAGE_CHILD_CNT); // 페이지를 마지막것으로 셋팅한다.


	ShowPopup(true,POPUP_TYPE.GAME_CLEAR);
}

function UpdatePopupGameClear()
{
	fstar_eff_popup_time += deltaTime;
	for(var i=0;i<iStarCnt;++i)
	{
		if(spine_clear_stars[i].visible == false && fstar_eff_popup_time >= tbStarAniDelay[i]){
            SpinePlay(spine_clear_stars[i], null, null, "star_eff_" + (i+1));

            switch (i){
				case 0:
                    SESoundPlay(SE_GETSTAR_1);
					break;
                case 1:
                    SESoundPlay(SE_GETSTAR_2);
                    break;
                case 2:
                    SESoundPlay(SE_GETSTAR_3);
                    break;
			}
		}
	}

    if(spine_clear_stars[3].visible == false && fstar_eff_popup_time >= tbStarAniDelay[iStarCnt] && iIsFullCombo >= 1)
        spine_clear_stars[3].visible = true;

    if(spine_clear.visible == false && fstar_eff_popup_time >= (tbStarAniDelay[iStarCnt-1] + clearAniDelay)){
        SpinePlay(spine_clear,iCenterSizeX,iCenterSizeY,"clear_in",1,false);
    }

	ShowGoldCounting();
}

function ShowPopupFail()
{
	networkManager.UseHeart(1,function () {
		iIsFullCombo = 0;
		ShowHurryUp(false);
		InGameBackGroundChange(Math.floor(Math.random() * 4) +1);

		sprGameStartBtnStart.interactive = false;
		sprGameStartBtnBack.interactive = false;

		sprPopupItemBuy2btn.interactive = false;
		sprPopupItemBuy3btn.interactive = false;
		sprPopupItemBuy4btn.interactive = false;
		sprPopupItemBuy1btn.interactive = false;

		bInitBlockShakce = false;

		SpinePlay(spine_heart_bomb,iCenterSizeX + 144, iCenterSizeY + 404,'heart_bomb_in',1);

		coinLifeView.updateFont();
	});
	if (kData.life <= 0){
		// ---------------- 这里是结束的地方 ---------------- //
        // kData.clearStage.length - 1
        
        if ( window.parent != null ) {
            window.parent.postMessage({
              cmd: "GameOver",
              msg: {
                score: 0, // 如果是星星数，也是这个分数
                level: kData.clearStage.length - 1
              }
            }, "*");
          }
		return;
	}

    sPopupFrame[POPUP_TYPE.GAME_FAIL].removeChild(spine_failed_ani_copy);

	ShowPopup(true,POPUP_TYPE.GAME_FAIL);
    SESoundStop(SE_TIMELOW);
    bHurryUpSoundPlay = false;
	coinLifeView.show(3);

	// spine_failed_ani.visible = false;
    // spine_failed_ani.state.clearTracks();
    console.log(spine_failed_ani.visible);


    spine_failed_ani_copy = new PIXI.spine.Spine(spine_failed_ani.spineData);
    spine_failed_ani_copy.state.listeners = spine_failed_ani.state.listeners;
    sPopupFrame[POPUP_TYPE.GAME_FAIL].addChild(spine_failed_ani_copy);
	SpinePlay(spine_failed_ani_copy, iCenterSizeX, iCenterSizeY, "failed_ani_in",1,false);
//	sPopupClose.visible = true;


}

function HidePopupFail()
{

	//sPopupBase.visible = false;
	//sPopupGameFail.visible = false;
//	sPopupClose.visible = false;
}
/*
function cbButtonPopupClose()
{
	switch(gameState)
	{
		case STATE_GAME_START:
			cbButtonGameStart();
			break;
	}
}
*/
function cbButtonWhite()
{
//	if(this.cbNum !== undefined)
//		console.log(this.cbNum);
	// 블랙 약간 투명부분이 터치가 통과하지 않게 막아준다.
	// 여기서는 뒤쪽 터치를 막기위한 용도이므로 아무짓도 하지 않는다.
}

var ttTime = 0;
function updateTime()
{
	ttTime = fPlayTime+0.99999;
	txtTime.text = "";

	if(ttTime/60 <= 0)
    	txtTime.text += "0:";
	else
		txtTime.text += Math.floor(ttTime/60) + ":";

	if(ttTime%60 < 10)
		txtTime.text += "0" + Math.floor(ttTime%60);
	else
		txtTime.text += Math.floor(ttTime%60);

	if(fPlayTime < fHurryUpSoundTime){
		if(iSelX1 == -1 && !spine_hint_blocks[0].visible)
        	ShowHurryUp(true);
		else
            ShowHurryUp(false);
	}else{
        bInitBlockShakce = false;
        ShowHurryUp(false);
	}

	if(gameState == STATE_GAME_PLAY && clientData.bSoundSE == true)
	{
		if(bHurryUpSoundPlay == false && fPlayTime < fHurryUpSoundTime)
		{
			bHurryUpSoundPlay = true;
			SESoundPlay(SE_TIMELOW, true);
		}
		else if(bHurryUpSoundPlay == true && fPlayTime >= fHurryUpSoundTime)
		{
			bHurryUpSoundPlay = false;
			SESoundStop(SE_TIMELOW);
		}
	}
	else
	{
		bHurryUpSoundPlay = false;
		SESoundStop(SE_TIMELOW);
	}
}

var iFullComboMax = 0;
function CalcChekingCombo() {
    iFullComboMax = Math.floor(iTotalPaeCnt/2);
    iIsFullCombo = 0;
}

function updatePaeCntFont()
{
	txtTotalPaeCnt.text = iTotalPaeCnt.toString();
	txtSelectPaeCnt.text = iSelectPaeCnt.toString();
}

var comboFontTime = [];
var comboFontTimeMax = 0.02;

function updateComboFont(){
	if(state < STAGE_STAGE_SELECT) return;

	for(var i=0,imax = spine_combo_ani_mini.length;i<imax;++i){
        if(txtComboCount[i].visible){
            comboFontTime[i] += deltaTime;

        	if(comboFontTime[i] > comboFontTimeMax){
                sGameEffect.addChild(txtComboCount[i]);

                txtComboCount[i].position.x = (spine_combo_ani_mini[i].children[0].worldTransform.tx );
                txtComboCount[i].position.y = (spine_combo_ani_mini[i].children[0].worldTransform.ty -50);

                spine_combo_ani_mini[i].alpha -= 0.03;
                txtComboCount[i].alpha -= 0.03;
			}
        }
	}
}

function updateItemFont()
{
	// 게임중 아이템 갯수.
	txtItem1.text = kData.item1Cnt.toString();
	txtItem2.text = kData.item2Cnt.toString();
	txtItem3.text = kData.item3Cnt.toString();
	txtItem4.text = kData.item4Cnt.toString();

	// Shop 아이템 갯수.
	txtItem1Ex.text = kData.item1Cnt.toString();
	txtItem2Ex.text = kData.item2Cnt.toString();
	txtItem3Ex.text = kData.item3Cnt.toString();
	txtItem4Ex.text = kData.item4Cnt.toString();

	// Popup Shop 아이템 갯수.
	// txtItem1Ex2.text = kData.item1Cnt.toString();
	// txtItem2Ex2.text = kData.item2Cnt.toString();
	// txtItem3Ex2.text = kData.item3Cnt.toString();
	// txtItem4Ex2.text = kData.item4Cnt.toString();
}

function updateHint()
{
	var tCnt = 0;
	iSelectPaeCnt = 0; // 초기화.

	for(var y=0;y<BLOCK_HEIGHT;++y)
	{
		for(var x=0;x<BLOCK_WIDTH;++x)
		{
			tbBlockHint[y][x] = -1;	// 초기화.
			if(sprBlock[y][x].visible == false)
				tbBlockHint[y][x] = 0;	// 검사를 안해도 되게 수정.
		}
	}

	for(var y=0;y<BLOCK_HEIGHT;++y)
	{
		for(var x=0;x<BLOCK_WIDTH;++x)
		{
			if(tbBlockHint[y][x] == -1) // 미검사..
			{
				tbBlockHint[y][x] = 0;	// 검사했을때 0으로 체크.
				for(var yy=0;yy<BLOCK_HEIGHT;++yy)
				{
					for(var xx=0;xx<BLOCK_WIDTH;++xx)
					{
						if(tbBlockHint[yy][xx] == -1 && sprBlock[y][x].type < BLOCK_LOCK && sprBlock[y][x].type == sprBlock[yy][xx].type)
						{
							if(isMatch(y, x, yy, xx) == true)	// 매치가 성공되면 블럭을 없애준다.
							{
								tCnt++;
								tbBlockHint[y][x] = tCnt;
								tbBlockHint[yy][xx] = tCnt;
								iSelectPaeCnt += 2;

								yy = 1000;
								xx = 1000;
								break;
							}
						}
					}
				}
			}
		}
	}
}

function ShowComboEffect_mini(_y1,_x1,_y2,_x2,_bPigEffect) {
	if(_bPigEffect === undefined) _bPigEffect = false;

	var sel = -1;
	 for(var i=0,imax = spine_combo_ani_mini.length;i<imax;++i){
	 	if(!spine_combo_ani_mini[i].visible && i != sel){
	 		if(sel == -1){
                sel = i;
                //spine_combo_ani_mini[i].children[1].visible = false;
                SpinePlay(spine_combo_ani_mini[i],_x1,_y1,"combo_ani_mini",i);
                if(_bPigEffect){
					var tempComboText = comboCount - Math.floor(comboCount%5);
					tempComboText += 1;
					txtComboCount[i].text = tempComboText.toString();
				}else
                    txtComboCount[i].text = comboCount.toString();
			}
	 		else{
                SpinePlay(spine_combo_ani_mini[i],_x2,_y2,"combo_ani_mini",i);
                if(_bPigEffect){
                    var tempComboText = comboCount - Math.floor(comboCount%5);
                    tempComboText += 1;
                    txtComboCount[i].text = tempComboText.toString();
                }else
                    txtComboCount[i].text = comboCount.toString();
                return;
			}
		}
	 }
}

// 시간 추가 아이템
function cbButtonItem1()
{
    if(spine_combo_ani_big.visible) return;
	if(gameState != STATE_GAME_PLAY) return;

	if(kData.item1Cnt > 0)
	{
        spine_combo_ani_big.state.clearTracks();
        SpinePlay(spine_combo_ani_big,iCenterSizeX,iCenterSizeY,"combo_ani_big",2,true);
		SESoundPlay(SE_ITEM_TIME);
		SpinePlay(spine_item_use_eff, sprItem1.x, sprItem1.y, "animation");
		SpinePlay(spine_time_eff, null, null, "time_eff");

		kData.item1Cnt--;
		networkManager.ForcedSaveData();
		//SaveDataInClient();
		updateItemFont();

		fPlayTime += ITEM1_USE_TIME_ADD;
		if(fPlayTime > fPlayTimeMax)
			fPlayTimeMax = fPlayTime;
		updateTime();
	}
}

function BombEff(_y1,_x1,_y2,_x2) {
	var checkCnt = 0;

	for(var i=0,imax=spine_bomb_eff.length;i<imax;++i){
        if(!spine_bomb_eff[i].visible) {
        	if(checkCnt == 0){
                SpinePlay(spine_bomb_eff[i],_x1,_y1,"bomb_eff",i);
                checkCnt++;
			}else{
                SpinePlay(spine_bomb_eff[i],_x2,_y2,"bomb_eff",i);
                return;
			}
        }
	}

	// 만약 다 쓰고 잇다면 추가해야함.
}

function ComboBomb(_y1, _x1, _y2, _x2) {

	for(var i=0,imax=spine_6_combo_ani_under.length;i<imax;++i){
        sGame.addChild(spine_6_combo_ani_under[i]);
        if(i==0)
        	sGame.addChild(sprBlock[_y1][_x1])
		else
            sGame.addChild(sprBlock[_y2][_x2])
        sGame.addChild(spine_6_combo_ani_up[i]);
	}

	if(_x1 < _x2){
		// x1 왼쪽
        SpinePlay(spine_6_combo_ani_under[0],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_under",0);
        SpinePlay(spine_6_combo_ani_up[0],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_up",0);
        SpinePlay(spine_6_combo_ani_under[1],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_under",1);
        SpinePlay(spine_6_combo_ani_up[1],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_up",1);
	}else if(_x2 < _x1){
        SpinePlay(spine_6_combo_ani_under[0],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_under",0);
        SpinePlay(spine_6_combo_ani_up[0],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_up",0);
        SpinePlay(spine_6_combo_ani_under[1],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_under",1);
        SpinePlay(spine_6_combo_ani_up[1],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_up",1);
	}else{
		if(_y1 < _y2){
			// y1 왼쪽
            SpinePlay(spine_6_combo_ani_under[0],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_under",0);
            SpinePlay(spine_6_combo_ani_up[0],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_up",0);
            SpinePlay(spine_6_combo_ani_under[1],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_under",1);
            SpinePlay(spine_6_combo_ani_up[1],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_up",1);
		}else{
            SpinePlay(spine_6_combo_ani_under[0],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_under",0);
            SpinePlay(spine_6_combo_ani_up[0],sprBlock[_y2][_x2].x,sprBlock[_y2][_x2].y,"6_combo_ani_up",0);
            SpinePlay(spine_6_combo_ani_under[1],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_under",1);
            SpinePlay(spine_6_combo_ani_up[1],sprBlock[_y1][_x1].x,sprBlock[_y1][_x1].y,"6_combo_ani_up",1);
		}
	}
}

// 폭탄 아이템 [콤보 처리 1]
function cbButtonItem2()
{
	if(spine_combo_ani_big.visible) return;
	if(gameState != STATE_GAME_PLAY) return;

    // 커서 비할성화
	if(kData.item2Cnt > 0 && bItem2Bomb == false)
	{
        spine_combo_ani_big.state.clearTracks();
		SpinePlay(spine_combo_ani_big,iCenterSizeX,iCenterSizeY,"combo_ani_big",2,true);

		ComboCheck();

		var lastSelX1;
		var lastSelY1;
        var lastSelX2;
        var lastSelY2;

		if(iSelX1 != -1 && iSelY1 != -1){
            sprBlock[iSelY1][iSelX1].tint = 0xffffff;
            spine_select_blocks[0].visible = false;
            iSelX1 = -1;
            iSelY1 = -1;
		}
        //mcCursor[1].visible = false;

		sprItem2.interactive = false;

		SESoundPlay(SE_CLICK);
		SpinePlay(spine_item_use_eff, sprItem2.x, sprItem2.y, "animation");

		kData.item2Cnt--;
		//SaveDataInClient();
		networkManager.ForcedSaveData();
		updateItemFont();

		var dismatchBlockPos = [];
        var dismatchBlock = [];

        // 선행 작업 [매칭 안되는 것 먼저 처리]
        for(var y=0,ymax = sprBlock.length;y<ymax;++y)
            for(var x=0, xmax = sprBlock[y].length;x<xmax;++x){
				if(sprBlock[y][x].type >= 0 && sprBlock[y][x].type != BLOCK_LOCK && tbBlockHint[y][x] == 0 && sprBlock[y][x].visible){
                    dismatchBlockPos[dismatchBlockPos.length] =  (y*100) + (x);
                    dismatchBlock[dismatchBlock.length] = sprBlock[y][x].type;
				}
			}

        var loopCountMax = 0;
		if(dismatchBlock.length < 6){
            loopCountMax = Math.floor(dismatchBlock.length / 2)
		}
		else
            loopCountMax = 3

		for(var loopCount = 0;loopCount<loopCountMax;++loopCount){
            var rndSelect = Math.floor(Math.random() * dismatchBlock.length);

            var selectBlockPos = dismatchBlockPos.splice(rndSelect,1);
            var selectBlock = dismatchBlock.splice(rndSelect,1);
            selectBlockPos = selectBlockPos[0];
            var selectBlockPosX = selectBlockPos % 100;
            var selectBlockPosY= Math.floor(selectBlockPos / 100);
            selectBlock = selectBlock[0];

            var selectedBlock = [];
            for(var checki = 0, checkimax = dismatchBlock.length;checki < checkimax;++checki){
                if(dismatchBlock[checki] == selectBlock){
                    selectedBlock[selectedBlock.length] = checki;
                }
            }

            // 뽑은 인덱스 등 중에 고름 [ex) [0] = 2, [1] = 10]
            rndSelect = Math.floor(Math.random() * selectedBlock.length);
            var rndSelectedData = selectedBlock[rndSelect];
            var selectBlockPos_2 = dismatchBlockPos.splice(rndSelectedData,1);
            var selectBlock_2 = dismatchBlock.splice(rndSelectedData,1);

			selectBlockPos_2 = selectBlockPos_2[0];
            var selectBlockPosX_2 = selectBlockPos_2 % 100;
            var selectBlockPosY_2 = Math.floor(selectBlockPos_2 / 100);
            selectBlock_2 = selectBlock_2[0];

            sprBlock[selectBlockPosY][selectBlockPosX].interactive = false;
            sprBlock[selectBlockPosY_2][selectBlockPosX_2].interactive = false;
            arrDeleteTime.push(0.15);
            arrDeleteList.push(selectBlockPosY);	// 삭제 할 애들을 저장한다.
            arrDeleteList.push(selectBlockPosX);
            arrDeleteList.push(selectBlockPosY_2);
            arrDeleteList.push(selectBlockPosX_2);

            lastSelX1 = selectBlockPosX;
            lastSelY1 = selectBlockPosY;
            lastSelX2 = selectBlockPosX_2;
            lastSelY2 = selectBlockPosY_2;

            BombEff(sprBlock[selectBlockPosY][selectBlockPosX].y - 5,sprBlock[selectBlockPosY][selectBlockPosX].x - 5,
                sprBlock[selectBlockPosY_2][selectBlockPosX_2].y - 5,sprBlock[selectBlockPosY_2][selectBlockPosX_2].x - 5);

            //tbBlock[selectBlockPosY][selectBlockPosX] = -1;
            //tbBlock[selectBlockPosY_2][selectBlockPosX_2] = -1;
		}

		var matchCount = 3 - loopCountMax;
        if(matchCount > 0){

        	if(iTotalPaeCnt - 6 < 0 )
            	matchCount = (iTotalPaeCnt / 2);

        	var p_blockPos = [];
        	var p_blockData = [];

            var rndSelectedBlockData = [0,0];
            var rndSelectedBlockPos = [0,0];

        	for(var y=0,ymax = sprBlock.length;y<ymax;++y)
                for(var x=0, xmax = sprBlock[y].length;x<xmax;++x){
                    if(sprBlock[y][x].type >= 0 && sprBlock[y][x].type != BLOCK_LOCK&& sprBlock[y][x].visible && tbBlockHint[y][x] != 0){
                        p_blockPos[p_blockPos.length] =  (y*100) + (x);
                        p_blockData[p_blockData.length] = sprBlock[y][x].type;
                    }
                }

			// 연결 되는 패 중에서 선택을 해야 할 때..
            for(var lastloop = 0, lastloopMax = matchCount;lastloop<lastloopMax;++lastloop){
                if(iTotalPaeCnt <= 0) return;


                var rndBlockDataIndex = Math.floor(Math.random() * p_blockData.length);
                var temp_Data = p_blockData.splice(rndBlockDataIndex,1);
				rndSelectedBlockData[0] = temp_Data[0];
                temp_Data = p_blockPos.splice(rndBlockDataIndex,1);
				rndSelectedBlockPos[0] = temp_Data[0];

                for(var checkeri = 0,checkeriMax = p_blockData.length;checkeri<checkeriMax;++checkeri){
					if(rndSelectedBlockData[0] == p_blockData[checkeri]){
                        temp_Data = p_blockData.splice(checkeri,1);
                        rndSelectedBlockData[1] = temp_Data[0];
                        temp_Data = p_blockPos.splice(checkeri,1);
                        rndSelectedBlockPos[1] = temp_Data[0];
						break;
					}
				}

				var p_selectedBlockPosY = [0,0];
				var p_selectedBlockPosX = [0,0];

                var iSelectedIndexData = Math.floor(rndSelectedBlockPos[p_posCheckeri]);

                for(var p_posCheckeri = 0,p_posCheckeriMax = rndSelectedBlockPos.length;p_posCheckeri<p_posCheckeriMax; ++p_posCheckeri){
                	p_selectedBlockPosX[p_posCheckeri] = Math.floor(rndSelectedBlockPos[p_posCheckeri] % 100);
                    p_selectedBlockPosY[p_posCheckeri] = Math.floor(rndSelectedBlockPos[p_posCheckeri] / 100);
				}

                sprBlock[p_selectedBlockPosY[0]][p_selectedBlockPosX[0]].interactive = false;
                sprBlock[p_selectedBlockPosY[1]][p_selectedBlockPosX[1]].interactive = false;
                arrDeleteTime.push(0.15);
                arrDeleteList.push(p_selectedBlockPosY[1]);
                arrDeleteList.push(p_selectedBlockPosX[1]);
                arrDeleteList.push(p_selectedBlockPosY[0]);	// 삭제 할 애들을 저장한다.
                arrDeleteList.push(p_selectedBlockPosX[0]);

                lastSelX1 = p_selectedBlockPosX[0];
                lastSelY1 = p_selectedBlockPosY[0];
                lastSelX2 = p_selectedBlockPosX[1];
                lastSelY2 = p_selectedBlockPosY[1];

                BombEff( sprBlock[p_selectedBlockPosY[1]][p_selectedBlockPosX[1]].y - 2,sprBlock[p_selectedBlockPosY[1]][p_selectedBlockPosX[1]].x - 5,
                    sprBlock[p_selectedBlockPosY[0]][p_selectedBlockPosX[0]].y - 2, sprBlock[p_selectedBlockPosY[0]][p_selectedBlockPosX[0]].x - 5);

                	/*
            	if(txtTotalPaeCnt <= 0) return;

                var matchX = -1;
                var matchY = -1;
                var matchX_2 = -1;
                var matchY_2 = -1;

                var selectNum = Math.floor(Math.random() * (iSelectPaeCnt / 2))
                for(var hintY=0,hintYMax = tbBlockHint.length; hintY<hintYMax;++hintY){
                    if(matchY_2 != -1 && matchX_2 != -1)
                        break;

                    for(var hintX = 0,hintXMax = tbBlockHint[hintY].length; hintX<hintXMax;++hintX){
                        if(tbBlockHint[hintY][hintX] == selectNum){
                            if(matchX == -1 && matchY == -1){
                                matchX = hintX;
                                matchY = hintY;
                            }
                            else{
                                matchX_2 = hintX;
                                matchY_2 = hintY;
                                break;
                            }
                        }
                    }
                }

                sprBlock[matchY][matchX].interactive = false;
                sprBlock[matchY_2][matchX_2].interactive = false;
                arrDeleteTime.push(0.3);
                arrDeleteList.push(matchY);	// 삭제 할 애들을 저장한다.
                arrDeleteList.push(matchX);
                arrDeleteList.push(matchY_2);
                arrDeleteList.push(matchX_2);

                SpinePlay(GetBombEff(), sprBlock[matchY][matchX].x - 5, sprBlock[matchY][matchX].y - 2, "bomb_eff");
                SpinePlay(GetBombEff(), sprBlock[matchY_2][matchX_2].x - 5, sprBlock[matchY_2][matchX_2].y - 2, "bomb_eff");

                //tbBlock[matchY][matchX] = -1;
                //tbBlock[matchY_2][matchX_2] = -1;
                */
			}
			//tbBlockHint
		}

		ShowComboEffect_mini(sprBlock[lastSelY1][lastSelX1].y,sprBlock[lastSelY1][lastSelX1].x,sprBlock[lastSelY2][lastSelX2].y,sprBlock[lastSelY2][lastSelX2].x);
        // for(var totalTxt = 0;totalTxt<2;++totalTxt)
        //     for(var i=0,imax=txtComboCount.length;i<imax;++i)
        //         if(!txtComboCount[i].visible){
        //             switch(totalTxt){
        //                 case 0:
        //                     txtComboCount[i].position.set(sprBlock[lastSelY1][lastSelX1].x - 10,sprBlock[lastSelY1][lastSelX1].y - 70);
        //                     break;
        //                 case 1:
        //                     txtComboCount[i].position.set(sprBlock[lastSelY2][lastSelX2].x -10 ,sprBlock[lastSelY2][lastSelX2].y - 70);
        //                     break;
        //             }
        //
        //             txtComboCount[i].text = comboCount.toString();
        //             combo_txt_time[i] = 0.5;
        //             txtComboCount[i].visible = true;
        //             break;
        //         }

        ShowHurryUp(false);
        SESoundPlay(SE_ITEM_BOMB);
		/*
		// 선택된 커서를 없애고 다시 할수 잇게 해야 함.
		bItem2Bomb = true;
		if(iSelX1 != -1) // 선택된 블럭이 있을경우..해제시킴
		{
			sprBlock[iSelY1][iSelX1].tint = 0xffffff;
			mcCursor[0].visible = false;
			iSelX1 = -1;
			iSelY1 = -1;
		}*/
	}
}

// 힌트 아이템.
function cbButtonItem3()
{
    if(spine_combo_ani_big.visible) return;
	if(gameState != STATE_GAME_PLAY) return;

	if(bItem3Hint == true)
	{
		var tCnt = 0;
		for(var y=0;y<BLOCK_HEIGHT;++y)
		{
			for(var x=0;x<BLOCK_WIDTH;++x)
			{
				if(tbBlockHint[y][x] == 1)
				{
                    spine_hint_blocks[tCnt].state.clearTracks();
                    SpinePlay(spine_hint_blocks[tCnt],sprBlock[y][x].x,sprBlock[y][x].y,'block_select_idle',0,true);
					//mcHintCursor[tCnt].visible = true;
					//mcHintCursor[tCnt].position.set(sprBlock[y][x].x - 6, sprBlock[y][x].y - 6)
					tCnt++;
				}
			}
		}
	}
	else
	{
		if(kData.item3Cnt > 0 && iSelectPaeCnt >= 2)
		{
            spine_combo_ani_big.state.clearTracks();
            SpinePlay(spine_combo_ani_big,iCenterSizeX,iCenterSizeY,"combo_ani_big",2,true);

			if(iSelX1 != -1) // 선택된 블럭이 있을경우..해제시킴
			{
				sprBlock[iSelY1][iSelX1].tint = 0xffffff;
                spine_select_blocks[0].visible = false;
				iSelX1 = -1;
				iSelY1 = -1;
			}
			SESoundPlay(SE_ITEM_HINT);
			SpinePlay(spine_item_use_eff, sprItem3.x , sprItem3.y, "animation");

			kData.item3Cnt--;
			networkManager.ForcedSaveData();
			//SaveDataInClient();
			updateItemFont();

			// 힌트 아이템을 사용하면 블럭이 깜빡이게 수정한다..
			bItem3Hint = true;
            ShowHurryUp(false);
			var tCnt = 0;
			for(var y=0;y<BLOCK_HEIGHT;++y)
			{
				for(var x=0;x<BLOCK_WIDTH;++x)
				{
					if(tbBlockHint[y][x] == 1)
					{
                        spine_hint_blocks[tCnt].state.clearTracks();
                        SpinePlay(spine_hint_blocks[tCnt],sprBlock[y][x].x, sprBlock[y][x].y,'block_select_idle',0,true);
						//mcHintCursor[tCnt].visible = true;
						//mcHintCursor[tCnt].position.set(sprBlock[y][x].x - 6, sprBlock[y][x].y - 6)
						tCnt++;
					}
				}
			}
		}
	}
}

// 셔플 아이템.
function cbButtonItem4()
{
    if(spine_combo_ani_big.visible) return;
	if(gameState != STATE_GAME_PLAY) return;

	if(kData.item4Cnt > 0)
	{
        spine_combo_ani_big.state.clearTracks();
        SpinePlay(spine_combo_ani_big,iCenterSizeX,iCenterSizeY,"combo_ani_big",2,true);

		SpinePlay(spine_item_use_eff, sprItem4.x, sprItem4.y, "animation");

		kData.item4Cnt--;
		//SaveDataInClient();
		networkManager.ForcedSaveData();
		updateItemFont();

		Item4Mix();
	}
}

var b_turnOpen = false;
var b_turnAnim = false;
var b_mixEnd = false;
function Item4Mix()
{
    b_mixEnd = false;

    for(var newy=0;newy<BLOCK_HEIGHT;++newy)
        for(var newx=0;newx<BLOCK_WIDTH;++newx)
            if((newy == 0 || newy == BLOCK_HEIGHT - 1 || newx == 0 || newx == BLOCK_WIDTH - 1) == false)
            	sprBlock[newy][newx].interactive = false;

    fTurnBlockTime = 0;
    iTurnBlockCompCnt = 0;
    b_turnOpen = false;
    b_turnAnim = true;
    gameState = STATE_GAME_TURNBLOCK;

	SESoundPlay(SE_ITEM_SHUFFLE);

 //   TurnBlock(true);
}

function DoMixBlocks() {
    var mixcnt = 0;
    while(true)
    {
    	if(iTotalPaeCnt <= 2)
    		break;

        BlockMixItem(mixcnt);
        updateHint();
        if(iSelectPaeCnt > 0)
            break;

        mixcnt++;
    }

    for(var y=0;y<BLOCK_HEIGHT;++y)
    {
        for(var x=0;x<BLOCK_WIDTH;++x)
        {
            if(sprBlock[y][x].visible == true)
            {
                //sprBlock[y][x].texture = SpritePool.getInstance().get(tbImgGame[tbBlock[y][x]]).texture;
                sprBlock[y][x].type = tbBlock[y][x];
                sprBlock[y][x].tint = 0xffffff;
            }
        }
    }
    updatePaeCntFont();

    // 커서부분 초기화를 해줘야 한다.
    //mcHintCursor[0].visible = false;
    //mcHintCursor[1].visible = false;
    iSelX1 = -1;
    iSelY1 = -1;
    spine_select_blocks[0].visible = false;
    spine_select_blocks[1].visible = false;

    spine_combo_ani_big.visible = false;
    b_mixEnd = true;
}

// 회사 url로 점프.
//window.open("http://www.neolith.co.kr/", "_blank")
function cbButtonPause(e)
{
	switch(gameState)
	{
		case STATE_GAME_READYGO:
			spine_etc_message.state.timeScale = 0;
			SoundPause();
			SESoundPlay(SE_CLICK);
			//ShowPause();
            ShowPopup(true,POPUP_TYPE.GAME_SETTING);
			nextState = gameState;
			gameState = STATE_GAME_PAUSE;
			break;
		case STATE_GAME_PLAY:
			SoundPause();
			SESoundPlay(SE_CLICK);
			//ShowPause();
            ShowPopup(true,POPUP_TYPE.GAME_SETTING);
			nextState = gameState;
			gameState = STATE_GAME_PAUSE;
			break;
	}
}

function ShowPause()
{
}

function HidePause()
{
	sPopupBase.visible = false;
	sPopupPause.visible = false;
	sPopupSound.visible = false;
	sPopupExit.visible = false;
}

function cbButtonSoundBGM()
{
	if(servicePos == 0){
        clientData.bSoundBGM = !clientData.bSoundBGM;
        clientData.bSoundSE = !clientData.bSoundSE;

        if(clientData.bSoundBGM){
            SoundResume();
        }else{
            SoundPause();
        }
	}else{
		kData.bSoundBGM = !kData.bSoundBGM;
        kData.bSoundSE = !kData.bSoundSE;

        if(kData.bSoundBGM){
        	if(state <= STATE_TITLE)
        		BGMSoundPlay(BGM_BG_Main);
        	else
            	SoundResume();
        }else{
            SoundPause();
		}
	}

	SaveDataInClient();
	//networkManager.SaveData();
	SetSoundIcon();
}

function cbButtonSoundSE()
{
	if(clientData.bSoundSE == true)
		clientData.bSoundSE = false;
	else
		clientData.bSoundSE = true;
	SaveDataInClient();
	// networkManager.SaveData();
	SetSoundIcon();
}

function cbButtonPauseContinue()
{
	switch(nextState)
	{
		case STATE_GAME_READYGO:
			spine_etc_message.state.timeScale = 1;
			break;
		case STATE_GAME_PLAY:
			break;
	}

	SESoundPlay(SE_CLICK);
	HidePause();
	gameState = nextState;
	SoundResume();
}

function cbButtonPauseReplay()
{
    SESoundPlay(SE_CLICK);
	ShowPopup(false);
    gameState = STATE_GAME_INIT2;
}

function cbButtonPauseReplayNO()
{
	SESoundPlay(SE_CLICK);
	//sPopupPause.visible = true;
	//sPopupExit.visible = false;
    ShowPopup(true,POPUP_TYPE.GAME_SETTING);
}

function cbButtonPauseReplayYES()
{
	SESoundPlay(SE_CLICK);

	ShowPopup(true,POPUP_TYPE.GAME_GIVEUPANDREPLAY);
}

function BlockSelectDisable() {
    iSelX1 = -1;
    iSelY1 = -1;
    for(var i=0,imax=spine_select_blocks.length;i<imax;++i)
        if(spine_select_blocks[i].visible)
            spine_select_blocks[i].visible = false;
}

function PopupPauseReplay() {
    // spine_failed_ani.visible = false;

	BlockSelectDisable();

    SESoundPlay(SE_CLICK);
    BGMSoundPlay(BGM_BG_Main);

    if(iStage >= 100)
        bReplay = true;

    for(var i=0,imax=3;i<imax;++i){
        if(i < kData.clearStage[iStage])
            sprStageSelectedStars[i].visible = true;
        else
            sprStageSelectedStars[i].visible = false;
    }

    if(kData.clearFullCombStage[iStage] >= 1)
    	sprStageSelectFullCombo.visible = true;
	else
        sprStageSelectFullCombo.visible = false;

    sGame.visible = false;
    sStageSelect.visible = true;

    ShowPopup(true,POPUP_TYPE.GAME_START);
    state = STATE_GAME;
    gameState = STATE_GAME_INIT2;
    BGMSoundPlay(BGM_BG_Main);
}

function ShowPopupExit() {
    SESoundPlay(SE_CLICK);

    ShowPopup(true,POPUP_TYPE.GAME_GIVEUP);
}

function ButtonPauseExitYes() {
    BlockSelectDisable();

	SESoundPlay(SE_CLICK);
    BGMSoundPlay(BGM_BG_Main);
    // stage.removeChild(sGame);
    // stage.removeChild(sGameEffect);
	HidePause();
    ShowStageSelect();
    state = STAGE_STAGE_SELECT;
}

function cbButtonPauseExit()
{
	SESoundPlay(SE_CLICK);
	// stage.removeChild(sGame);
	HidePause();
	ShowStageSelect();
	state = STAGE_STAGE_SELECT;
}

var bClearFlag;
function ClearCheck()
{
	bClearFlag = true;
	for(var y=0;y<BLOCK_HEIGHT;++y)
	{
		for(var x=0;x<BLOCK_WIDTH;++x)
		{
			if(sprBlock[y][x].visible == true && sprBlock[y][x].type < BLOCK_LOCK)
			{
				bClearFlag = false;
				y = 100;
				x = 100;
				break;
			}
		}
	}

	if(bClearFlag == true)
	{
	//	BGMSoundPause();
	//	SESoundPlay(SE_STAGECLEAR);
	//	ShowPopupGameClear();
		if(iFullComboMax == comboCount){
			SESoundPlay(SE_FULL_COMBO);
			SpinePlay(spine_full_combo,iCenterSizeX,iCenterSizeY,"full_combo");
            bReplay = false;
            gameState = STATE_GAME_CLEAR_ANI;
		}else{
            SESoundPlay(SE_STAGE_CLEAR);
            SpinePlay(spine_etc_message, null, null, "stage_clear", 3, false);
            bReplay = false;
            gameState = STATE_GAME_CLEAR_ANI;
		}
	}
}

function RandomBlockMix()
{
	var temp, r1, r2;

	for(var i=0;i<100;++i)
	{
		r1 = Math.floor(Math.random() * BLOCK_MAX);
		r2 = Math.floor(Math.random() * BLOCK_MAX);

		temp = randomBlock[r1];
		randomBlock[r1] = randomBlock[r2];
		randomBlock[r2] = temp;
	}
}
/*
function BlockMix()
{
	var temp, y1, x1, y2, x2;

	for(var i=0;i<5000;++i)
	{
		y1 = Math.floor(1 + (Math.random() * (tbBlock.length - 2)));
		x1 = Math.floor(1 + (Math.random() * (tbBlock[y1].length - 2)));

		y2 = Math.floor(1 + (Math.random() * (tbBlock.length - 2)));
		x2 = Math.floor(1 + (Math.random() * (tbBlock[y2].length - 2)));

		if(tbBlock[y1][x1] >= 0 && tbBlock[y1][x1] < BLOCK_MAX && tbBlock[y2][x2] >= 0 && tbBlock[y2][x2] < BLOCK_MAX)
		{
			temp = tbBlock[y1][x1];
			tbBlock[y1][x1] = tbBlock[y2][x2];
			tbBlock[y2][x2] = temp;
		}
	}
}
*/
function BlockMix()
{
	var temp, r1, r2;
	var arrTemp = [];

	for(var y=0;y<BLOCK_HEIGHT;++y)
	{
		for(var x=0;x<BLOCK_WIDTH;++x)
		{
			if(tbBlock[y][x] >= 0 && tbBlock[y][x] < BLOCK_MAX)
			{
				arrTemp.push((y*100) + x);
			}
		}
	}

	for(var i=0;i<100;++i)
	{
		r1 = Math.floor(Math.random() * arrTemp.length)
		r2 = Math.floor(Math.random() * arrTemp.length)

		temp = tbBlock[Math.floor(arrTemp[r1]/100)][arrTemp[r1]%100];
		tbBlock[Math.floor(arrTemp[r1]/100)][arrTemp[r1]%100] = tbBlock[Math.floor(arrTemp[r2]/100)][arrTemp[r2]%100];
		tbBlock[Math.floor(arrTemp[r2]/100)][arrTemp[r2]%100] = temp;
	}
}

function BlockMixItem(mixCnt)
{
	var temp, r1, r2;
	var arrTemp = [];

	for(var y=0;y<BLOCK_HEIGHT;++y)
	{
		for(var x=0;x<BLOCK_WIDTH;++x)
		{
			if(mixCnt <= 10)
				if(sprBlock[y][x].visible == true && sprBlock[y][x].type < BLOCK_LOCK)
					arrTemp.push((y*100) + x);
			else
				if(sprBlock[y][x].visible == true && sprBlock[y][x].type < BLOCK_LOCK)
					arrTemp.push((y*100) + x);
		}
	}

	for(var i=0;i<100;++i)
	{
		r1 = Math.floor(Math.random() * arrTemp.length);
		r2 = Math.floor(Math.random() * arrTemp.length);

		temp = tbBlock[Math.floor(arrTemp[r1]/100)][arrTemp[r1]%100];
		tbBlock[Math.floor(arrTemp[r1]/100)][arrTemp[r1]%100] = tbBlock[Math.floor(arrTemp[r2]/100)][arrTemp[r2]%100];
		tbBlock[Math.floor(arrTemp[r2]/100)][arrTemp[r2]%100] = temp;
	}

	for(var i=0;i<arrTemp.length;++i)
	{
		//sprBlock[Math.floor(arrTemp[i]/100)][arrTemp[i]%100].texture = SpritePool.getInstance().get(tbImgGame[tbBlock[Math.floor(arrTemp[i]/100)][arrTemp[i]%100]]).texture;
		sprBlock[Math.floor(arrTemp[i]/100)][arrTemp[i]%100].type = tbBlock[Math.floor(arrTemp[i]/100)][arrTemp[i]%100];
		sprBlock[Math.floor(arrTemp[i]/100)][arrTemp[i]%100].tint = 0xffffff;
	}
}

function cbButtonBlock(e)
{
	if(gameState != STATE_GAME_PLAY) return;
	if(this.type == BLOCK_LOCK) return;

	if(iSelX1 == -1)
	{
		SESoundPlay(SE_CLICK_TILE);

		this.tint = 0x808080;
		iSelY1 = this.yy;	// 처음 선택된 인덱스가 없을경우 값을 저장하고.
		iSelX1 = this.xx;

        //sprBlock[]
		// 사천성 예비 작업 - 클릭하면 커지는 거
        //sprBlock[iSelY1][iSelX1].scale.x = 2;
        //sprBlock[iSelY1][iSelX1].scale.y = 2;
        //TweenPlay(sprBlock[iSelY1][iSelX1], 0,5, 0, null, {alpha: 0}, false, PIXI.tween.Easing.outQuad());

		// 힌트 아이템 사용시

		if(bItem3Hint == true)
		{
            // 힌트를 사용 했으면 둘 중에 아무거나 눌러도 터진다.
			var hintCheckedX = [-1,-1];
            var hintCheckedY = [-1,-1];

			for(var p_hintY = 0,p_hintYMax = tbBlockHint.length; p_hintY<p_hintYMax; ++p_hintY)
				for(var p_hintX = 0,p_hintXMax = tbBlockHint[p_hintY].length; p_hintX<p_hintXMax; ++p_hintX){
					if(tbBlockHint[p_hintY][p_hintX] == 1){
						if(hintCheckedX[0] == -1){
							hintCheckedX[0] = p_hintX;
							hintCheckedY[0] = p_hintY;
						}
						else{
							hintCheckedX[1] = p_hintX;
							hintCheckedY[1] = p_hintY;
							break;
						}
					}
				}

			if(iSelX1 == hintCheckedX[0] && iSelY1 == hintCheckedY[0]){
                iSelX2 = hintCheckedX[1];
                iSelY2 = hintCheckedY[1];
                cbButtonBlock();
                //console.log(hintCheckedY[1] + " , " + hintCheckedX[1]);
			}
			else if(iSelX1 == hintCheckedX[1] && iSelY1 == hintCheckedY[1]){
                iSelX2 = hintCheckedX[0];
                iSelY2 = hintCheckedY[0];
                cbButtonBlock();
                //console.log(hintCheckedY[0] + " , " + hintCheckedX[0]);
			}else{
				// 힌트에서 보여준거 말고 다른거 선택 시
                bItem3Hint = false;

                iSelY2 = this.yy;
                iSelX2 = this.xx;

                spine_combo_ani_big.visible = false;
                SpinePlay(spine_select_blocks[0], sprBlock[iSelY1][iSelX1].x, sprBlock[iSelY1][iSelX1].y, 'block_select_in', 1, false);
			}

            spine_hint_blocks[0].visible = false;
            spine_hint_blocks[1].visible = false;
            if(comboCount %5 !=0)
            	spine_combo_ani_big.visible = false;
			//mcHintCursor[0].visible = false;
			//mcHintCursor[1].visible = false;
		}
		else if(comboCount > 0 && comboCount % 5 == 0){
            bComboBonus = true;
            var p_tempTypeData = sprBlock[iSelY1][iSelX1].type;

            var p_listDismatchSelectedBlockPos = [];

            for(var p_blockCheckerY = 0,p_blockCheckerYMax = sprBlock.length;p_blockCheckerY < p_blockCheckerYMax; ++p_blockCheckerY)
            	for(var p_blockCheckerX = 0,p_blockCheckerXMax = sprBlock[p_blockCheckerY].length; p_blockCheckerX < p_blockCheckerXMax; ++p_blockCheckerX){
					if(p_tempTypeData == sprBlock[p_blockCheckerY][p_blockCheckerX].type && sprBlock[p_blockCheckerY][p_blockCheckerX].visible && sprBlock[p_blockCheckerY][p_blockCheckerX].tint != 0x808080){
						if(!isMatch(iSelY1,iSelX1,p_blockCheckerY,p_blockCheckerX)){
                            p_listDismatchSelectedBlockPos[p_listDismatchSelectedBlockPos.length] = (p_blockCheckerY * 100) + p_blockCheckerX;
						}
					}
				}

			if(p_listDismatchSelectedBlockPos.length <= 0)
                for(var p_blockCheckerY = 0,p_blockCheckerYMax = sprBlock.length;p_blockCheckerY < p_blockCheckerYMax; ++p_blockCheckerY)
                    for(var p_blockCheckerX = 0,p_blockCheckerXMax = sprBlock[p_blockCheckerY].length; p_blockCheckerX < p_blockCheckerXMax; ++p_blockCheckerX){
						if(p_tempTypeData == sprBlock[p_blockCheckerY][p_blockCheckerX].type && sprBlock[p_blockCheckerY][p_blockCheckerX].visible && sprBlock[p_blockCheckerY][p_blockCheckerX].tint != 0x808080)
							p_listDismatchSelectedBlockPos[p_listDismatchSelectedBlockPos.length] = (p_blockCheckerY * 100) + p_blockCheckerX;
                    }

			var rndSelectIndexData = Math.floor(Math.random() * p_listDismatchSelectedBlockPos.length);
			var tempPosData = p_listDismatchSelectedBlockPos[rndSelectIndexData];
			iSelX2 = tempPosData % 100;
			iSelY2 = Math.floor(tempPosData / 100);
            cbButtonBlock();
		}
		else
			SpinePlay(spine_select_blocks[0], sprBlock[iSelY1][iSelX1].x, sprBlock[iSelY1][iSelX1].y, 'block_select_in', 1, false);
	}
	else
	{
        if(bComboBonus == false)
        {
            if(this.tint != 0x808080)	// 두번째 다른넘을 선택했을때..처리..
            {
				// 힌트 아이템 사용시 강제로 할당 해주기 때문에
				if(bItem3Hint){
					bItem3Hint = false;
                }
				else{
                    iSelY2 = this.yy;	// 처음 선택된 인덱스가 없을경우 값을 저장하고.
                    iSelX2 = this.xx;
				}

                //console.log("1 : " + sprBlock[iSelY1][iSelX1].type + "\n2: " + sprBlock[iSelY2][iSelX2].type);

				// 검색 로직을 넣는다.
				if(sprBlock[iSelY1][iSelX1].type == sprBlock[iSelY2][iSelX2].type) // 블럭 타입이 같으면 처리한다.
				{
					if(isMatch(iSelY1, iSelX1, iSelY2, iSelX2) == true)	// 매치가 성공되면 블럭을 없애준다.
					{
						ComboCheck();

						ShowComboEffect_mini(sprBlock[iSelY1][iSelX1].y,sprBlock[iSelY1][iSelX1].x ,sprBlock[iSelY2][iSelX2].y ,sprBlock[iSelY2][iSelX2].x );
						// for(var totalTxt = 0;totalTxt<2;++totalTxt)
						// 	for(var i=0,imax=txtComboCount.length;i<imax;++i)
						// 		if(!txtComboCount[i].visible){
						// 			switch(totalTxt){
						// 				case 0:
						// 					txtComboCount[i].position.set(sprBlock[iSelY1][iSelX1].x - 10,sprBlock[iSelY1][iSelX1].y - 70);
						// 					break;
						// 				case 1:
                         //                    txtComboCount[i].position.set(sprBlock[iSelY2][iSelX2].x -10 ,sprBlock[iSelY2][iSelX2].y - 70);
						// 					break;
						// 			}
                        //
						// 			txtComboCount[i].text = comboCount.toString();
                         //            combo_txt_time[i] = 0.5;
                         //            txtComboCount[i].visible = true;
						// 			break;
						// 		}

						bItem3Hint = false;

						fPlayTime += fPlayTimeAdd;
						if(fPlayTime >= fPlayTimeMax)
							fPlayTime = fPlayTimeMax;

						SESoundPlay(SE_MATCH_TILE);
						// 선그리기

						switch(iLineState)
						{
							case 1:
                                DrawLineMatchBlocks(iSelX1,iSelX2,iSelY1,iSelY2);
								break;
							case 2:
                                DrawLineMatchBlocks(iSelX1,iLineX1,iSelY1,iLineY1);
                                DrawLineMatchBlocks(iLineX1,iSelX2,iLineY1,iSelY2);
                                DrawLineAnchorMatchBlocks(iSelX1,iLineX1,iSelX2,iSelY1,iLineY1,iSelY2);
								break;
							case 3:
                                DrawLineMatchBlocks(iSelX1,iLineX1,iSelY1,iLineY1);
                                DrawLineMatchBlocks(iLineX1,iLineX2,iLineY1,iLineY2);
                                DrawLineMatchBlocks(iLineX2,iSelX2,iLineY2,iSelY2);
                                DrawLineAnchorMatchBlocks(iSelX1,iLineX1,iLineX2,iSelY1,iLineY1,iLineY2);
                                DrawLineAnchorMatchBlocks(iLineX1,iLineX2,iSelX2,iLineY1,iLineY2,iSelY2);
								break;
						}
						sprBlock[iSelY2][iSelX2].tint = 0x808080;
                        SpinePlay(spine_select_blocks[1],sprBlock[iSelY2][iSelX2].x , sprBlock[iSelY2][iSelX2].y,'block_select_in',1,false);

						sprBlock[iSelY1][iSelX1].interactive = false;
						sprBlock[iSelY2][iSelX2].interactive = false;
						arrDeleteTime.push(0.15);		// 0.2초가 대기하다가 지운다.
						arrDeleteList.push(iSelY1);	// 삭제 할 애들을 저장한다.
						arrDeleteList.push(iSelX1);
						arrDeleteList.push(iSelY2);
						arrDeleteList.push(iSelX2);

                        SpineBlockBomb(sprBlock[iSelY1][iSelX1].x, sprBlock[iSelY1][iSelX1].y);
                        SpineBlockBomb(sprBlock[iSelY2][iSelX2].x, sprBlock[iSelY2][iSelX2].y);

						iSelX1 = -1;
						iSelY1 = -1;
						iSelX2 = -1;
						iSelY2 = -1;
					}
					else
					{
						sprBlock[iSelY1][iSelX1].tint = 0xffffff;
						iSelX1 = -1;
						iSelY1 = -1;
                        spine_select_blocks[0].visible = false;
					}
				}
				else
				{
					sprBlock[iSelY1][iSelX1].tint = 0xffffff;
					iSelX1 = -1;
					iSelY1 = -1;
                    spine_select_blocks[0].visible = false;

					// 다른블럭을 눌렀을경우 바로 매치가 되게 수정한
					SESoundPlay(SE_CLICK_TILE);

					this.tint = 0x808080;
					iSelY1 = this.yy;	// 처음 선택된 인덱스가 없을경우 값을 저장하고.
					iSelX1 = this.xx;

					SpinePlay(spine_select_blocks[0],sprBlock[iSelY1][iSelX1].x, sprBlock[iSelY1][iSelX1].y,'block_select_in',1,false);

					if(bItem3Hint == true)
					{
						spine_hint_blocks[0].visible = false;
                        spine_hint_blocks[1].visible = false;
					}
				}
			}
		}
		else // 콤보 보너스
		{
			if(this.tint != 0x808080)	// 두번째 다른넘을 선택했을때..처리..
			{
				//iSelY2 = this.yy;	// 처음 선택된 인덱스가 없을경우 값을 저장하고.
				//iSelX2 = this.xx;

				if(sprBlock[iSelY1][iSelX1].type == sprBlock[iSelY2][iSelX2].type) // 블럭 타입이 같으면 처리한다.
				{
                    ComboCheck();
                    // for(var totalTxt = 0;totalTxt<2;++totalTxt)
                    //     for(var i=0,imax=txtComboCount.length;i<imax;++i)
                    //         if(!txtComboCount[i].visible){
                    //             switch(totalTxt){
                    //                 case 0:
                    //                     txtComboCount[i].position.set(sprBlock[iSelY1][iSelX1].x - 10,sprBlock[iSelY1][iSelX1].y - 70);
                    //                     break;
                    //                 case 1:
                    //                     txtComboCount[i].position.set(sprBlock[iSelY2][iSelX2].x -10 ,sprBlock[iSelY2][iSelX2].y - 70);
                    //                     break;
                    //             }
                    //
                    //             txtComboCount[i].text = comboCount.toString();
                    //             combo_txt_time[i] = 0.5;
                    //             txtComboCount[i].visible = true;
                    //             break;
                    //         }

					fPlayTime += fPlayTimeAdd;
					if(fPlayTime >= fPlayTimeMax)
						fPlayTime = fPlayTimeMax;

					// SESoundPlay(SE_MATCH_TILE);
                    SESoundPlay(SE_PIG_EAT);
					//SESoundPlay(SE_ITEM2);
					sprBlock[iSelY2][iSelX2].tint = 0x808080;

                    iSelComboX1 = iSelX1;
                    iSelComboY1 = iSelY1;
                    iSelComboX2 = iSelX2;
                    iSelComboY2 = iSelY2;

					sprBlock[iSelY1][iSelX1].interactive = false;
					sprBlock[iSelY2][iSelX2].interactive = false;
					arrDeleteTime.push(0.2);		// 0.5초가 대기하다가 지운다.
					arrDeleteList.push(iSelY1);	// 삭제 할 애들을 저장한다.
					arrDeleteList.push(iSelX1);
					arrDeleteList.push(iSelY2);
					arrDeleteList.push(iSelX2);

                    spine_select_blocks[0].visible = false;
                    ComboBomb( iSelY1 , iSelX1,iSelY2, iSelX2);

                    // SpinePlay(GetBombEff(), sprBlock[iSelY1][iSelX1].x - 5, sprBlock[iSelY1][iSelX1].y - 2, "bomb_eff");
                    // SpinePlay(GetBombEff(), sprBlock[iSelY2][iSelX2].x - 5, sprBlock[iSelY2][iSelX2].y - 2, "bomb_eff");

					iSelX1 = -1;
					iSelY1 = -1;
					iSelX2 = -1;
					iSelY2 = -1;

					bComboBonus = false;
                    spine_combo_ani_big.visible = false;

                    for(var i=0,imax= 4;i<imax;++i)
                        sprItemBlock[i].visible = false
				}
				else
				{
					sprBlock[iSelY1][iSelX1].tint = 0xffffff;
                    spine_select_blocks[0].visible = false;
					iSelX1 = -1;
					iSelY1 = -1;

					// 다른블럭을 눌렀을경우 바로 매치가 되게 수정한
					SESoundPlay(SE_CLICK_TILE);

					this.tint = 0x808080;
					iSelY1 = this.yy;	// 처음 선택된 인덱스가 없을경우 값을 저장하고.
					iSelX1 = this.xx;

					SpinePlay(spine_select_blocks[0],sprBlock[iSelY1][iSelX1].x , sprBlock[iSelY1][iSelX1].y,'block_select_in',1,false);

					if(bItem3Hint == true)
					{
                        spine_hint_blocks[0].visible = false;
                        spine_hint_blocks[1].visible = false;
					}
				}
			}
		}
	}
}

var DRAW_LINE_TYPE = {
	HORIZONTAL : 1,
	VERTICAL : 2,
};

function GetSprLine(_line_type) {
    if(_line_type == DRAW_LINE_TYPE.HORIZONTAL){
        for(var i=0,imax = sprLineHorizontal.length;i<imax;++i){
            if (comboCount == 1){
                if(!sprLineHorizontal[i].visible)
                    return sprLineHorizontal[i];
			}else{
                if(!sprLineHorizontal_Combo[i].visible)
                    return sprLineHorizontal_Combo[i];
			}
		}
	}else if(_line_type == DRAW_LINE_TYPE.VERTICAL){
        for(var i=0,imax = sprLineVertical.length;i<imax;++i){
            if (comboCount == 1){
                if(!sprLineVertical[i].visible)
                    return sprLineVertical[i];
            }else{
                if(!sprLineVertical_Combo[i].visible)
                    return sprLineVertical_Combo[i];
            }
        }
	}
}

function GetSprLineAnchor() {
	for(var i=0,imax = sprLineAnchor.length;i<imax;++i){
        if (comboCount == 1){
			if(!sprLineAnchor[i].visible)
            	return sprLineAnchor[i];
        }else{
            if(!sprLineAnchor_Combo[i].visible)
                return sprLineAnchor_Combo[i];
		}
	}
}

function DrawLineAnchorMatchBlocks(_x1, _x2, _x3, _y1, _y2, _y3) {
	var spr = GetSprLineAnchor();

    spr.position.set(sprBlock[_y2][_x2].x, sprBlock[_y2][_x2].y);

    if(_x1 == _x2)
        spr.scale.set(((_x3 - _x2) / Math.abs((_x3 - _x2))),((_y1 - _y2) / Math.abs((_y1 - _y2))));
	else
        spr.scale.set(((_x1 - _x2) / Math.abs((_x1 - _x2))),((_y3 - _y2) / Math.abs((_y3 - _y2))));

    spr.visible = true;
}

function DrawLineMatchBlocks(_x1, _x2, _y1, _y2) {
    if(_y1 == _y2){
        // 가로
        if(_x1 < _x2){
            for(var idata = _x1+1,idataMax = _x2;idata < idataMax;++idata) {
				var spr = GetSprLine(DRAW_LINE_TYPE.HORIZONTAL);
				spr.position.set(sprBlock[_y1][idata].x, sprBlock[_y1][idata].y);
				spr.visible = true;
            }
        }else{
            for(var idata =_x2+1 ,idataMax = _x1;idata < idataMax;++idata) {
                spr = GetSprLine(DRAW_LINE_TYPE.HORIZONTAL);
                spr.position.set(sprBlock[_y1][idata].x, sprBlock[_y1][idata].y);
                spr.visible = true;
            }
        }
    }else{
        // 세로
        if(_y1 < _y2){
            for(var idata = _y1+1,idataMax = _y2;idata < idataMax;++idata) {
                var spr = GetSprLine(DRAW_LINE_TYPE.VERTICAL);
                spr.position.set(sprBlock[idata][_x1].x, sprBlock[idata][_x1].y);
                spr.visible = true;
            }
        }else{
            for(var idata = _y2+1,idataMax = _y1;idata < idataMax;++idata){
                spr = GetSprLine(DRAW_LINE_TYPE.VERTICAL);
                spr.position.set(sprBlock[idata][_x1].x, sprBlock[idata][_x1].y);
                spr.visible = true;
            }
        }
    }
}

var sprLogo;

var progW_half;
var progH_half;

function cbLogoComplete(){
    // 로딩바 준비 셋팅                       <----여기서부터 복사시작
    var logoy = 440;
    var namey = 610;
    sprLogo = SpritePool.getInstance().get(strGamePath+"Loading/movi_name.png");
    sprLogo.anchor.set(0.5, 0.5);
    sprLogo.position.set(iCenterSizeX,namey);
    sLoading.addChild(sprLogo);

    sprLogoBg = SpritePool.getInstance().get(strGamePath+"Loading/loading_grey.png");
    sprLogoBg.anchor.set(0.5, 0.5);
    sprLogoBg.position.set(iCenterSizeX,logoy);
    sLoading.addChild(sprLogoBg);

    sprLogoProg = SpritePool.getInstance().get(strGamePath+"Loading/loading_color.png");
    sprLogoProg.anchor.set(0.5, 0.5);
    sprLogoProg.position.set(iCenterSizeX,logoy);
    sprLogoProg.alpha=0;
    sLoading.addChild(sprLogoProg);

    sprLogoMask = new PIXI.Graphics();
    sprLogoMask.lineStyle(0);

    sprLogoProg.mask = sprLogoMask;

    progW_half = sprLogoProg.width / 2;
    progH_half = sprLogoProg.height / 2;

    sprLogoMask.beginFill(0xffffff,1);
    sprLogoMask.moveTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y - progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);
    sprLogoMask.lineTo(sprLogoProg.x - progW_half, sprLogoProg.y + progH_half);

    // sprLogoMask = SpritePool.getInstance().get("Loading/loading_color_mask.png");
    // sprLogoMask.anchor.set(0, 0.5);
    // sprLogoMask.position.set(iCenterSizeX - sprLogoProg.width/2 ,logoy);
    // sprLogoMask.scale.set(1,1);
    // sprLogoProg.mask = sprLogoMask;
    //
    // sLoading.addChild(sprLogoMask);

	//sprLogo = SpriteLoad(sLoading, "G_Loading.png", iCenterSizeX, iCenterSizeY);

    // modifier : kook : 일본대응 : 아이폰일경우 사운드가 초반에 출력되지 않아 임시로 셋팅한다.
    if(servicePos == 1) {
        if (/Android/i.test(navigator.userAgent)) {
            biPhone = false;
        } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            biPhone = true;
        } else {
            biPhone = false;
        }
    }

    networkManager.LoadData(function (_data) {
        kMGMenu = new MGMenu(MGM_VERTICAL, GetString("MGM_Title"), GetString("MGM_Contents"), [], 4, 'greappoint');

        if (_data != null)
            kMGMenu.load(_data.user_id);
        else
            kMGMenu.load("GUEST");

        if(yahooIN === undefined)
            kMGMenu.HideMenu();

        if(servicePos == 1)
        	MgmenuIntervalID = setInterval(Mgmenu_Interval,1000);

        // 이미지 다운로드.
        var loader = PIXI.loader;

        for(var i=0;i<tbImgGame[lang].length;++i)
            loader.add(tbImgGame[lang][i], strGamePath+tbImgGame[lang][i]);

        // 스파인 로딩
        loader.add('title_ani', strGamePath+'spine_'+lang+'/title_ani.json');
        loader.add('etc_message', strGamePath+'spine_'+lang+'/etc_message.json');
        loader.add('clear', strGamePath+'spine_'+lang+'/clear.json');
        loader.add('star_1', strGamePath+'spine_'+lang+'/star_1.json');
        loader.add('star_2', strGamePath+'spine_'+lang+'/star_2.json');
        loader.add('star_3', strGamePath+'spine_'+lang+'/star_3.json');
        loader.add('failed', strGamePath+'spine_'+lang+'/failed.json');
        loader.add('block_select', strGamePath+'spine_'+lang+'/block_select.json');
        loader.add('block_bomb',strGamePath+'spine_'+lang+'/block_bomb.json');
        loader.add('heart_bomb',strGamePath+'spine_'+lang+'/heart_bomb.json');
        loader.add('combo_ani_big',strGamePath+'spine_'+lang+'/combo_ani_big.json');
        loader.add('combo_ani_mini',strGamePath+'spine_'+lang+'/combo_ani_mini.json');
        loader.add('full_combo',strGamePath+'spine_'+lang+'/full_combo.json');
        loader.add('combo_ani_under',strGamePath+'spine_'+lang+'/6_combo_ani_under.json');
        loader.add('combo_ani_up',strGamePath+'spine_'+lang+'/6_combo_ani_up.json');
        loader.add('lock_eff', strGamePath+'spine_'+lang+'/lock_eff.json');

        loader.add('time_eff', strGamePath+'spine_'+lang+'/time_eff.json');
        loader.add('item_use_eff', strGamePath+'spine_'+lang+'/item_use_eff.json');
        loader.add('bomb_eff', strGamePath+'spine_'+lang+'/bomb_eff.json');

        // 이미지 넘버폰트 로딩
        loader.add('shop_no-export', strGamePath+'fonts/shop_no-export.xml');
        loader.add('combo_no-export', strGamePath+'fonts/combo_no-export.xml');

        // loader.add([{name:"BGM_BG", url:tbSoundName[0]}]);	// 사운드 로드.

        for(var i=0,imax = tbSoundName.length;i<imax;++i){
            if(i<2){
                soundCtrl[i] = new Howl({
                    src: tbSoundName[i][1],
                    loop:true
                });
            }else{
            	if(tbSoundName[i][1].indexOf('Loop') != -1){
                    soundCtrl[i] = new Howl({
                        src: tbSoundName[i][1],
                        loop:true
                    });
				}else{
                    soundCtrl[i] = new Howl({
                        src: tbSoundName[i][1],
                        loop:false
                    });
				}
            }
        }

        loader.once('complete',cbImageDownComplete);
        loader.load();

        // if (yahooIN != undefined || bMGCHEAT == true) {
        //     if (_data != null)
        //         kMGMenu.load(_data.user_id);
        //     else
        //         kMGMenu.load("GUEST");
        // }
    });
}

var pixiRes = undefined;
var biPhone = false;
// var b_titleSound = false;

function cbImageDownComplete(loader, res)
{
    loadComplete = true;
    pixiRes = res;
//	TweenMax.staggerTo(sprTitle, 1, {rotation:360, y:100}, 0.5);
//	var t1 = new TimelineMax({onUpdate:null, onUpdateScope:sTitle});
//	t1.staggerTo(sprTitle, 1, {rotation:360, y:100}, 0.5);
//	t1.to(sprTitle, 1, {x:400, repeat:10, yoyo:true, onRepeat:onRepeat, repeatDelay:0.5, ease:Linear.easeNone});//{x:400});
	//TweenMax.to(sprTitle, 2, {left:"100px", repeat:10, yoyo:true, onRepeat:onRepeat, repeatDelay:0.5, ease:Linear.easeNone});

    // 스파인 셋팅..// 나중에 속도 문제라든가 그런부분들이 생기면 다른곳에서 생성한다.
	spine_time_eff = new PIXI.spine.Spine(res.time_eff.spineData);
	spine_time_eff.state.addListener({
		complete:function(entry){
			if(comboCount == 0 || comboCount % 5 != 0)
            	spine_combo_ani_big.visible = false;
			spine_time_eff.visible = false;
		}
	});
	spine_time_eff.visible = false;

	spine_item_use_eff = new PIXI.spine.Spine(res.item_use_eff.spineData);
	spine_item_use_eff.state.addListener({complete:function(entry){spine_item_use_eff.visible = false;}});
	spine_item_use_eff.visible = false;

	for(var i=0,imax = 10;i<imax;++i){
		spine_bomb_eff.push(new PIXI.spine.Spine(res.bomb_eff.spineData));
        spine_bomb_eff[i].visible = false;

        spine_bomb_eff[i].state.addListener({
            complete:function(entry){
                if(comboCount == 0 || comboCount % 5 != 0)
                    spine_combo_ani_big.visible = false;

                if(spine_bomb_eff[entry.trackIndex].visible)
                    spine_bomb_eff[entry.trackIndex].visible = false;

                sprItem2.interactive = true;
            }
        });
	}

	for(var i=0,imax = 2;i<imax;++i){
		spine_6_combo_ani_under[i] = new PIXI.spine.Spine(res.combo_ani_under.spineData);
        spine_6_combo_ani_under[0].scale.set(-1,1);
        spine_6_combo_ani_under[i].state.addListener({
        	complete:function (entry) {
				spine_6_combo_ani_under[entry.trackIndex].visible = false;
				if(entry.trackIndex == 1){
                    ShowComboEffect_mini(sprBlock[iSelComboY1][iSelComboX1].y,sprBlock[iSelComboY1][iSelComboX1].x ,sprBlock[iSelComboY2][iSelComboX2].y ,sprBlock[iSelComboY2][iSelComboX2].x ,true);

                    iSelComboX1 = -1;
                    iSelComboY1 = -1;
                    iSelComboX2 = -1;
                    iSelComboY2 = -1;
				}
            },
			event:function (entry, event) {
        		//console.log(event.eventData);
				spine_6_combo_ani_up[entry.trackIndex].visible = false;
                sprBlock[iSelComboY1][iSelComboX1].visible = false;
                sprBlock[iSelComboY2][iSelComboX2].visible = false;
            }
		});
		spine_6_combo_ani_up[i] = new PIXI.spine.Spine(res.combo_ani_up.spineData);
        spine_6_combo_ani_up[0].scale.set(-1,1);

		spine_6_combo_ani_under[i].visible = false;
		spine_6_combo_ani_up[i].visible = false;
	}

	spine_etc_message = new PIXI.spine.Spine(res.etc_message.spineData);
	spine_etc_message.state.addListener({
		complete:function(entry){
			switch (entry.trackIndex){
				case 1: // ready~ go!
                    b_turnOpen = true;
                    b_turnAnim = true;
                    iTurnBlockCompCnt = 0;
					gameState = STATE_GAME_TURNBLOCK;
					break;
				case 2: // time-over
                    SESoundStop(SE_TIMELOW);
                    SESoundStop(SE_TIMEOVER);
                    SESoundPlay(SE_GAMEOVER);
                    ShowPopupFail();
                    gameState = STATE_GAME_FAILED;

                    networkManager.ForcedSaveData();
					break;
				case 3: // Game Clear
                    BGMSoundPause();
                    ShowPopupGameClear();
                    gameState = STATE_GAME_CLEAR;
                    if(iStarCnt<3)
                    	SESoundPlay(SE_VICTORY);
                    networkManager.ForcedSaveData();
					break;
			}
		},
		event : function (entry,event) {
			if(event.data.name == 'ready'){
                SESoundPlay(SE_READY);
			}else if(event.data.name == 'go'){
                SESoundPlay(SE_GO);
			}
        }
	});

	spine_full_combo = new PIXI.spine.Spine(res.full_combo.spineData);
	spine_full_combo.state.addListener({
		complete:function (entry) {
            SESoundPlay(SE_STAGE_CLEAR);
            SpinePlay(spine_etc_message, null, null, "stage_clear", 3, false);
            bReplay = false;
            gameState = STATE_GAME_CLEAR_ANI;
            spine_full_combo.visible = false;
        }
	});

    spine_heart_bomb = new PIXI.spine.Spine(res.heart_bomb.spineData);
    spine_heart_bomb.state.addListener({
    	complete:function (entry) {
    		switch(entry.trackIndex){
				case 1: // heart-in
                    SpinePlay(spine_heart_bomb,null, null,'heart_bomb_out',2);
                    SESoundPlay(SE_HEART);
					break;
				case 2: // heart-out
                    // heart_bomb -> GameStart
                    spine_heart_bomb.visible = false;
                    HidePopupGameStart();
                    spine_etc_message.state.timeScale = 1;
                    //SpinePlay(spine_etc_message, null, null, "ready_go", 1, false);
                    TurnBlock(false,false);
                    gameState = STATE_GAME_READYGO;

                    sprGameStartBtnStart.interactive = true;
                    sprGameStartBtnBack.interactive = true;

                    sprPopupItemBuy2btn.interactive = true;
                    sprPopupItemBuy3btn.interactive = true;
                    sprPopupItemBuy4btn.interactive = true;
                    sprPopupItemBuy1btn.interactive = true;

					break;
			}

        }
	});
    // 하트 -1 폰트
    // FontLoad(spine_heart_bomb,"-1", 50,0, 0.5,0.5,
    //     {fontFamily:'Conv_FZHPFW_eng', fontSize:'50px',fill:'#fe414b', align:'center',
    //         stroke:'#ffffff', strokeThickness:5});

    spine_clear = new PIXI.spine.Spine(res.clear.spineData);
    spine_clear.state.addListener({
        complete:function (entry) {
            switch(entry.trackIndex){
                case 1:
                    if(Current_Popup_State == POPUP_TYPE.GAME_CLEAR){
                        spine_clear.state.clearTracks();
                        SpinePlay(spine_clear,null,null,"clear_idle",0,true);
					}

                    // 별 체크
                    break;
            }
        }
    });

    spine_clear_stars[0] = new PIXI.spine.Spine(res.star_1.spineData);
    spine_clear_stars[1] = new PIXI.spine.Spine(res.star_2.spineData);
    spine_clear_stars[2] = new PIXI.spine.Spine(res.star_3.spineData);

    spine_failed_ani = new PIXI.spine.Spine(res.failed.spineData);
    spine_failed_ani.state.addListener({
        complete:function (entry) {
            switch(entry.trackIndex){
                case 0:
                    // loop
                    break;
                case 1:
					SpinePlay(spine_failed_ani_copy,null,null,'failed_ani_idle',0,true);
                    break;
            }
        }
    });

    spine_select_blocks[0] = new PIXI.spine.Spine(res.block_select.spineData);
    spine_select_blocks[0].state.addListener({
    	complete:function (entry) {
			switch(entry.trackIndex){
				case 1:
					if(iSelX1 == -1 && iSelY1 == -1)
                        spine_select_blocks[0].visible = false;
					else{
                        spine_select_blocks[0].state.clearTracks();
                        SpinePlay(spine_select_blocks[0],null,null,'block_select_idle',0,true);
					}

					break;
			}
        }
	});
    spine_select_blocks[1] = new PIXI.spine.Spine(res.block_select.spineData);
    spine_select_blocks[1].state.addListener({
        complete:function (entry) {
            switch(entry.trackIndex){
                case 1:
                    spine_select_blocks[1].visible = false;
                    //SpinePlay(spine_select_blocks[1],null,null,'block_select_idle',0,true);
                    break;
            }
        }
    });

    spine_select_blocks[0].visible = false;
    spine_select_blocks[1].visible = false;


    for(var i=0,imax=10;i<imax;++i){
        spine_blockBomb[i] = new PIXI.spine.Spine(res.block_bomb.spineData);
        spine_blockBomb[i].state.addListener({
            complete:function (entry) {
                spine_blockBomb[entry.trackIndex].visible = false;
            }
        });
        spine_blockBomb[i].visible = false;
	}

	spine_hint_blocks[0] = new PIXI.spine.Spine(res.block_select.spineData);
    spine_hint_blocks[1] = new PIXI.spine.Spine(res.block_select.spineData);

    spine_hint_blocks[0].visible = false;
    spine_hint_blocks[1].visible = false;

    spine_combo_ani_big = new PIXI.spine.Spine(res.combo_ani_big.spineData);
    spine_combo_ani_big.visible = false;

    for(var i=0;i<10;++i) {
        spine_combo_ani_mini[i] = new PIXI.spine.Spine(res.combo_ani_mini.spineData);
        spine_combo_ani_mini[i].state.addListener({
            start:function (entry) {
				txtComboCount[entry.trackIndex].position.set(-100,-100);
				txtComboCount[entry.trackIndex].visible = true;
            },
            complete: function (entry) {
                spine_combo_ani_mini[entry.trackIndex].visible = false;
                spine_combo_ani_mini[entry.trackIndex].alpha = 1;
                txtComboCount[entry.trackIndex].alpha = 1;
                txtComboCount[entry.trackIndex].visible = false;
                comboFontTime[entry.trackIndex] = 0;
            }
        });
        spine_combo_ani_mini[i].visible = false;
    }

	spine_title_ani = new PIXI.spine.Spine(res.title_ani.spineData);
    sTitle.addChild(spine_title_ani);

	spine_title_ani.state.addListener({complete:function(entry){
		switch(entry.trackIndex)
		{
			case 0:
				// loop
				break;
			case 1: // 이펙트 진행후에..
                spine_title_ani.state.clearTracks();
				SpinePlay(spine_title_ani, null, null, "title_ani_idle", 0, true)
				break;
		}
	}});
    SpinePlay(spine_title_ani, iCenterSizeX, iCenterSizeY, "title_ani_in", 1, false);
    spine_title_ani.interactive = true;
    spine_title_ani.on('click', cbButtonStart);
    spine_title_ani.on('tap', cbButtonStart);

    if(yahooIN !== undefined && biPhone){
		kData.bSoundBGM = false;
		kData.bSoundSE = false;
    }else if(yahooIN !== undefined && kData.bSoundBGM === undefined){
		kData.bSoundBGM = true;
		kData.bSoundSE = true;
	}

    /*if($(location).attr('href').indexOf('movigame.com') != -1){
        FontLoad(sTitle, "Copyright Ⓒ 2017 MoviGame Corp. All rights reserved", iCenterSizeX, iCenterSizeY+620, 0.5, 0.5,
            {font:'bold 17px Arial', fill:'#000000', align:"center"}, 0);
    }else{
        if(yahooIN !== undefined && biPhone == true){
	        if(kData.bSoundBGM)
                btnTitleSound = SpriteLoad(sTitle, "Popup/btn_set_sound.png", iCenterSizeX, iCenterSizeY + 450);
            else
                btnTitleSound = SpriteLoad(sTitle, "Popup/btn_set_sound_off.png", iCenterSizeX, iCenterSizeY + 450);

            btnTitleSound.interactive = true;
            btnTitleSound.on('click',cbButtonSoundBGM)
                .on('tap',cbButtonSoundBGM)
                .on('mousedown',scaleUp)
                .on('mouseover',scaleUp)
                .on('tap',scaleUp)
                .on('mouseout',restoreScale)
                .on('touchend',restoreScale);
        }

        FontLoad(sTitle, "(C) RECOM Co.,Ltd. 2017 All Rights Reserved.", iCenterSizeX, iCenterSizeY+620, 0.5, 0.5,
            {font:'bold 17px Arial', fill:'#000000', align:"center"}, 0);
	}

    var txtVersion = FontLoad(sTitle, VERSION, iCenterSizeX + 350, iCenterSizeY + 621, 1, 0.5,
        {font:'bold 15px Arial', fill:'#A0A0FF'});*/

	// 사운드 처리
	// arrBGM[BGM_BG_Main] = PIXI.audioManager.getAudio('BGM_BG');
	if(servicePos == 0 || (servicePos == 1 && !biPhone))
    	BGMSoundPlay(BGM_BG_Main);

    GameViewSetting(); // 화면구성을 한다.

    stage.addChild(sTitle);
    sTitle.interative = true;
	stage.addChild(kMGMenu.main);

    stage.removeChild(sLoading);
    sLoading.destroy();

    state = STATE_TITLE;
}

var MgmenuIntervalID = undefined;
var b_mgmenuInteractive = false;
function Mgmenu_Interval(){
	if(!b_mgmenuInteractive){
        if(kMGMenu !== undefined && kMGMenu.btnMenu !== undefined){
            b_mgmenuInteractive = true;

            kMGMenu.sMenu.interactive = true;
            kMGMenu.sNick.interactive = true;
            kMGMenu.sShop.interactive = true;
            kMGMenu.sRank.interactive = true;
            kMGMenu.sPopup.interactive = true;
            kMGMenu.sEvent.interactive = true;
            kMGMenu.sNotice.interactive = true;

            clearInterval(MgmenuIntervalID);
        }
	}
}

function SpineBlockBomb(_x,_y) {
	for(var i=0,imax = spine_blockBomb.length;i<imax;++i){
		if(!spine_blockBomb[i].visible){
            SpinePlay(spine_blockBomb[i], _x, _y, "block_bomb",i);
            break;
		}
	}
}

function cbButtonStart(e)
{
	if(yahooIN !== undefined){
        if(kData["bTermsOfUse"] === undefined) {
            kMGMenu.ShowTermsOfUse();
            return;
        }

        if(kMGMenu.attendanceTF == 1) // 출석이벤트 토스트 출력.
        if(kMGMenu.attendanceTF == 1) // 출석이벤트 토스트 출력.
            kMGMenu.SetToastMsg(kMGMenu.GetString("attendance"));
	}

    kMGMenu.HideYahooIcon();

	this.interactive = false;
    sStageSelect.visible = true;
	SESoundPlay(SE_CLICK_START);
	state = STATE_GAME_SET;
}

function cbButtonGameStart()
{
    gameState = STATE_GAME_START;

	switch(gameState)
	{
		case STATE_GAME_START:
			if(kData.life > 0)
			{
                SESoundPlay(SE_CLICK);

				networkManager.UseHeart(0,function () {
					iIsFullCombo = 0;
					ShowHurryUp(false);
					InGameBackGroundChange(Math.floor(Math.random() * 4) +1);

					sprGameStartBtnStart.interactive = false;
					sprGameStartBtnBack.interactive = false;

					sprPopupItemBuy2btn.interactive = false;
					sprPopupItemBuy3btn.interactive = false;
					sprPopupItemBuy4btn.interactive = false;
					sprPopupItemBuy1btn.interactive = false;

					bInitBlockShakce = false;

					SpinePlay(spine_heart_bomb,iCenterSizeX + 144, iCenterSizeY + 404,'heart_bomb_in',1);

					coinLifeView.updateFont();
				});
			}
			else
			{
				SESoundPlay(SE_CLICK_BAD);
				ShowPopup(true,POPUP_TYPE.GAME_CHARGE_HEART);
			}
			break;
		case STATE_GAME_PAUSE:
			SESoundPlay(SE_CLICK);
            ShowPopup(true,POPUP_TYPE.GAME_SETTING);
			break;
		case STATE_GAME_FAILED:
			SESoundPlay(SE_CLICK);
			HidePopupGameStart();
			ShowPopupFail();
			break;
	}
}

function cbButtonGameStartBack()
{
	SESoundPlay(SE_CLICK);
	SESoundPlay(SE_POPUP_OFF);
	HidePopupGameStart();
	ShowStageSelect();
	state = STAGE_STAGE_SELECT;
}

function checkBuyButton(pixiSprite, itemCnt, text){//pixiSprite: PIXI.Sprite 객체, itemCnt: 각 아이템의 겟수
	pixiSprite.texture = PIXI.Texture.fromFrame("shop/buy_btn_02.png");
	//	pixiSprite.interactive = true;
	text.visible = true;
}//각 아이템 겟수를 체크해서 상점의 아이템 구입 버튼의 비활성화 여부를 판단하는 함수.

function checkBuyButton2(pixiSprite, itemCnt, text){//pixiSprite: PIXI.Sprite 객체, itemCnt: 각 아이템의 겟수
		pixiSprite.texture = PIXI.Texture.fromFrame("buy_btn_1.png");
	//	pixiSprite.interactive = true;
		text.visible = true;
}//각 아이템 겟수를 체크해서 상점의 아이템 구입 버튼의 비활성화 여부를 판단하는 함수.

function CheckItemEnableToBuy() {
	if(kData.coin < ITEM1_PAY){
		if(sprPopupItemBuy1btn.visible){
            sprPopupItemBuy1btn.visible = false;
            sprPopupItemBuy1btn.interactive = false;
            sprPopupItemBuy2btn.visible = false;
            sprPopupItemBuy2btn.interactive = false;
            sprPopupItemBuy3btn.visible = false;
            sprPopupItemBuy3btn.interactive = false;
            sprPopupItemBuy4btn.visible = false;
            sprPopupItemBuy4btn.interactive = false;

            sprPopupItemBuy1btn_disable.visible = true;
            sprPopupItemBuy1btn_disable.interactive = true;
            sprPopupItemBuy2btn_disable.visible = true;
            sprPopupItemBuy2btn_disable.interactive = true;
            sprPopupItemBuy3btn_disable.visible = true;
            sprPopupItemBuy3btn_disable.interactive = true;
            sprPopupItemBuy4btn_disable.visible = true;
            sprPopupItemBuy4btn_disable.interactive = true;

            sprPopupItemBuy1btn_disable.addChild(sprCoinPopupItem[0]);
            sprPopupItemBuy2btn_disable.addChild(sprCoinPopupItem[1]);
            sprPopupItemBuy3btn_disable.addChild(sprCoinPopupItem[2]);
            sprPopupItemBuy4btn_disable.addChild(sprCoinPopupItem[3]);
		}
	}else{
		if(!sprPopupItemBuy1btn.visible){
            sprPopupItemBuy1btn.visible = true;
            sprPopupItemBuy1btn.interactive = true;
            sprPopupItemBuy2btn.visible = true;
            sprPopupItemBuy2btn.interactive = true;
            sprPopupItemBuy3btn.visible = true;
            sprPopupItemBuy3btn.interactive = true;
            sprPopupItemBuy4btn.visible = true;
            sprPopupItemBuy4btn.interactive = true;

            sprPopupItemBuy1btn_disable.visible = false;
            sprPopupItemBuy1btn_disable.interactive = false;
            sprPopupItemBuy2btn_disable.visible = false;
            sprPopupItemBuy2btn_disable.interactive = false;
            sprPopupItemBuy3btn_disable.visible = false;
            sprPopupItemBuy3btn_disable.interactive = false;
            sprPopupItemBuy4btn_disable.visible = false;
            sprPopupItemBuy4btn_disable.interactive = false;

            sprPopupItemBuy1btn.addChild(sprCoinPopupItem[0]);
            sprPopupItemBuy2btn.addChild(sprCoinPopupItem[1]);
            sprPopupItemBuy3btn.addChild(sprCoinPopupItem[2]);
            sprPopupItemBuy4btn.addChild(sprCoinPopupItem[3]);
		}
	}

    txtPopupItemBuy1btn.text = ITEM1_PAY.toString();
    txtPopupItemBuy2btn.text = ITEM2_PAY.toString();
    txtPopupItemBuy3btn.text = ITEM3_PAY.toString();
    txtPopupItemBuy4btn.text = ITEM4_PAY.toString();
}

function CheckItemMaxCount(_itemIndex, _itemCount) {
	switch(_itemIndex){
		case 0:
			if(kData.coin < ITEM1_PAY){
                //SlicedSpriteChangeTexture(sprPopupItemBuy1btn,"Popup/Shop/btn_shop_3.png");
				sprPopupItemBuy1btn.visible = false;
                sprPopupItemBuy1btn.interactive = false;

                sprPopupItemBuy1btn_disable.visible = true;
                sprPopupItemBuy1btn_disable.interactive = true;

                txtPopupItemBuy1btn.text = ITEM1_PAY.toString();
			}
			else{
                //sprPopupItemBuy1btn.texture = PIXI.Texture.fromFrame("buy_btn_1.png");
                sprPopupItemBuy1btn.visible = true;
                sprPopupItemBuy1btn.interactive = true;

                sprPopupItemBuy1btn_disable.visible = false;
                sprPopupItemBuy1btn_disable.interactive = false;

                txtPopupItemBuy1btn.text = ITEM1_PAY.toString();
			}
			break;
		case 1:
            if(kData.coin < ITEM2_PAY){
                sprPopupItemBuy2btn.visible = false;
                sprPopupItemBuy2btn.interactive = false;

                sprPopupItemBuy2btn_disable.visible = true;
                sprPopupItemBuy2btn.interactive = true;

                txtPopupItemBuy2btn.text = ITEM2_PAY.toString();
            }
            else{
                //sprPopupItemBuy2btn.texture = PIXI.Texture.fromFrame("buy_btn_1.png");
                sprPopupItemBuy2btn.visible = true;
                sprPopupItemBuy2btn.interactive = true;

                sprPopupItemBuy2btn_disable.visible = false;
                sprPopupItemBuy2btn.interactive = false;

                txtPopupItemBuy2btn.text = ITEM2_PAY.toString();
			}
			break;
		case 2:
            if(kData.coin < ITEM3_PAY){
                sprPopupItemBuy3btn.visible = false;
                sprPopupItemBuy3btn.interactive = false;

                sprPopupItemBuy3btn_disable.visible = true;
                sprPopupItemBuy3btn_disable.interactive = true;

                txtPopupItemBuy3btn.text = ITEM3_PAY.toString();
            }
            else{
                //sprPopupItemBuy3btn.texture = PIXI.Texture.fromFrame("buy_btn_1.png");
                sprPopupItemBuy3btn.visible = true;
                sprPopupItemBuy3btn.interactive = true;

                sprPopupItemBuy3btn_disable.visible = false;
                sprPopupItemBuy3btn_disable.interactive = false;

                txtPopupItemBuy3btn.text = ITEM3_PAY.toString();
			}
			break;
		case 3:
            if(kData.coin < ITEM4_PAY){
                sprPopupItemBuy4btn.visible = false;
                sprPopupItemBuy4btn.interactive = false;

                sprPopupItemBuy4btn_disable.visible = true;
                sprPopupItemBuy4btn_disable.interactive = true;

                txtPopupItemBuy4btn.text = ITEM4_PAY.toString();
            }
            else{
                //sprPopupItemBuy4btn.texture = PIXI.Texture.fromFrame("buy_btn_1.png");
                sprPopupItemBuy4btn.visible = true;
                sprPopupItemBuy4btn.interactive = true;

                sprPopupItemBuy4btn_disable.visible = false;
                sprPopupItemBuy4btn_disable.interactive = false;

                txtPopupItemBuy4btn.text = ITEM4_PAY.toString();
			}
			break;
	}
}

function cbButtonItem1Buy(_itemIndex)
{
    switch(_itemIndex){
		case 0:
            if(kData.coin < ITEM1_PAY){
                SESoundPlay(SE_CLICK_BAD);
                ShowPopup(true,POPUP_TYPE.GAME_CHARGE_GOLD);
                return;
            }else{
                sprPopupItemBuy1btn.interactive = false;
                kData.coin -= ITEM1_PAY;
			}
			break;
		case 1:
            if(kData.coin < ITEM2_PAY){
                SESoundPlay(SE_CLICK_BAD);
                ShowPopup(true,POPUP_TYPE.GAME_CHARGE_GOLD);
                return;
            }else{
                kData.coin -= ITEM2_PAY;
                sprPopupItemBuy2btn.interactive = false;
			}
			break;
        case 2:
            if(kData.coin < ITEM3_PAY){
                SESoundPlay(SE_CLICK_BAD);
                ShowPopup(true,POPUP_TYPE.GAME_CHARGE_GOLD);
                return;
            }else{
                kData.coin -= ITEM3_PAY;
                sprPopupItemBuy3btn.interactive = false;
			}
            break;
        case 3:
            if(kData.coin < ITEM4_PAY){
                SESoundPlay(SE_CLICK_BAD);
                ShowPopup(true,POPUP_TYPE.GAME_CHARGE_GOLD);
                return;
            }else{
                kData.coin -= ITEM4_PAY;
                sprPopupItemBuy4btn.interactive = false;
			}
            break;
	}

    CheckItemEnableToBuy();

    SESoundPlay(SE_BUY_ITEM);
	ItemAdd(_itemIndex,AD_REWARD_ITEM);
	networkManager.ForcedSaveData(false,cbCompleteItemBuyEnd);

    updateItemFont();
}

function cbCompleteItemBuyEnd() {
    sprPopupItemBuy1btn.interactive = true;
    sprPopupItemBuy2btn.interactive = true;
    sprPopupItemBuy3btn.interactive = true;
    sprPopupItemBuy4btn.interactive = true;
}

function PopupItemGetShow(_itemIndex) {
	switch(_itemIndex){
		case 0:
            if(kData.item1Cnt >= ITEM_MAX) return;
			break;
        case 1:
            if(kData.item2Cnt >= ITEM_MAX) return;
            break;
        case 2:
            if(kData.item3Cnt >= ITEM_MAX) return;
            break;
        case 3:
            if(kData.item4Cnt >= ITEM_MAX) return;
            break;
	}

	sPopupItemGet.visible = true;

    sprPopupItemBuy1btn.interactive = false;
    sprPopupItemBuy2btn.interactive = false;
    sprPopupItemBuy3btn.interactive = false;
    sprPopupItemBuy4btn.interactive = false;
    sprGameStartBtnStart.interactive = false;
	sprGameStartBtnBack.interactive = false;

    ItemAdd(_itemIndex,AD_REWARD_ITEM);
    SaveDataInClient();

    updateItemFont();

    switch(_itemIndex){
        case 0:
            sprPopupItemBuy1btn.texture = PIXI.Texture.fromFrame("disable_btn_4.png");
            CheckItemMaxCount(_itemIndex,kData.item1Cnt);
            break;
        case 1:
            sprPopupItemBuy2btn.texture = PIXI.Texture.fromFrame("disable_btn_4.png");
            CheckItemMaxCount(_itemIndex,kData.item2Cnt);
            break;
        case 2:
            sprPopupItemBuy3btn.texture = PIXI.Texture.fromFrame("disable_btn_4.png");
            CheckItemMaxCount(_itemIndex,kData.item3Cnt);
            break;
        case 3:
            sprPopupItemBuy4btn.texture = PIXI.Texture.fromFrame("disable_btn_4.png");
            CheckItemMaxCount(_itemIndex,kData.item4Cnt);
            break;
    }
}

function PopupItemGetOKFunc() {
    sPopupItemGet.visible = false;

    sprPopupItemBuy1btn.interactive = true;
    sprPopupItemBuy2btn.interactive = true;
    sprPopupItemBuy3btn.interactive = true;
    sprPopupItemBuy4btn.interactive = true;
    sprGameStartBtnStart.interactive = true;
    sprGameStartBtnBack.interactive = true;
}

function cbButtonItem2Buy()
{
	if(kData.coin >= ITEM2_PAY)
	{
		if(kData.item2Cnt < ITEM_MAX)
		{
			SESoundPlay(SE_CLICK);
			kData.coin -= ITEM2_PAY;
			kData.item2Cnt++;
			SaveDataInClient();
			updateItemFont();
			coinLifeView.updateFont();

			checkBuyButton(sprItemBuy2btn, kData.item2Cnt, txtItemBuy2btn);
			checkBuyButton2(sprPopupItemBuy2btn, kData.item2Cnt, txtPopupItemBuy2btn);
		}
		else
		{
			SESoundPlay(SE_CLICK_BAD);
		}
	}
	else
	{
		SESoundPlay(SE_CLICK_BAD);
	}
}

function cbButtonItem3Buy()
{
	if(kData.coin >= ITEM3_PAY)
	{
		if(kData.item3Cnt < ITEM_MAX)
		{
			SESoundPlay(SE_CLICK);
			kData.coin -= ITEM3_PAY
			kData.item3Cnt++;
			SaveDataInClient();
			updateItemFont();
			coinLifeView.updateFont();

			checkBuyButton(sprItemBuy3btn, kData.item3Cnt, txtItemBuy3btn);
			checkBuyButton2(sprPopupItemBuy3btn, kData.item3Cnt, txtPopupItemBuy3btn);
		}
		else
		{
			SESoundPlay(SE_CLICK_BAD);
		}
	}
	else
	{
		SESoundPlay(SE_CLICK_BAD);
	}
}

function cbButtonItem4Buy()
{
	if(kData.coin >= ITEM4_PAY)
	{
		if(kData.item4Cnt < ITEM_MAX)
		{
			SESoundPlay(SE_CLICK);
			kData.coin -= ITEM4_PAY
			kData.item4Cnt++;
			SaveDataInClient();
			updateItemFont();
			coinLifeView.updateFont();

			checkBuyButton(sprItemBuy4btn, kData.item4Cnt, txtItemBuy4btn);
			checkBuyButton2(sprPopupItemBuy4btn, kData.item4Cnt, txtPopupItemBuy4btn);
		}
		else
		{
			SESoundPlay(SE_CLICK_BAD);
		}
	}
	else
	{
		SESoundPlay(SE_CLICK_BAD);
	}
}

function CoinAdd(addMoney)
{
	kData.coin += addMoney;
	networkManager.ForcedSaveData();
}

function ItemAdd(_itemIndex, _addItemCount){
	switch (_itemIndex){
		case 0:
			kData.item1Cnt += _addItemCount;
			break;
        case 1:
            kData.item2Cnt += _addItemCount;
            break;
        case 2:
            kData.item3Cnt += _addItemCount;
            break;
        case 3:
            kData.item4Cnt += _addItemCount;
            break;
	}

    networkManager.ForcedSaveData();
}

function ComboCheck(_check) {
	if(_check === undefined) _check = true;

	if(_check){
        comboTime = COMBO_TIME;
        comboCount++;

        if(bShakingBlocks)
        	bShakingBlocks = false;
	}else{
		comboTime = 0;
		comboCount = 0;
	}

	if(comboCount!=0 && (comboCount%5) == 0){
        spine_combo_ani_big.state.clearTracks();
        SpinePlay(spine_combo_ani_big,iCenterSizeX,iCenterSizeY,"combo_ani_big",1,true);
        for(var i=0,imax= 4;i<imax;++i)
        	sprItemBlock[i].visible = true;
	}
}

function ComboTimer(_time){
	if(spine_combo_ani_big === undefined) return _time;
	if(spine_combo_ani_big.visible && comboCount%5==0) return _time;

    _time -= deltaTime;

	if(_time <= 0){
        comboCount = 0;
        bComboBonus = false;
        return 0;
	}

	return _time;
}

function InGameBackGround(_number) {
	if(_number === undefined) return;
	if(_number < 1 || _number > 4) return;

    sprInGame_BG[0] = SpriteLoad(sGame,"inGame/bg_" + _number + ".png",0,iCenterSizeY,0,0.5);
    sprInGame_BG[1] = SpriteLoad(sGame,"inGame/bg_" + _number + ".png",iCenterSizeX,iCenterSizeY,1,0.5);
    sprInGame_BG[1].scale.set(-1,1);

    sprInGame_BG[0].interative = true;
    sprInGame_BG[1].interative = true;

    var spr = SpriteLoad(sGame,"inGame/bg_blend.png",iCenterSizeX,iCenterSizeY);
    spr.blendMode = PIXI.BLEND_MODES.SOFT_LIGHT;
	spr.alpha = 0.45;
}

function InGameBackGroundChange(_number) {
    if(_number === undefined) _number = 1;
    if(_number < 1 || _number > 4) _number =1;

    sprInGame_BG[0].texture = PIXI.Texture.fromFrame("inGame/bg_" + _number + ".png");
    sprInGame_BG[1].texture = PIXI.Texture.fromFrame("inGame/bg_" + _number + ".png");
}

var bInitBlockShakce = false;
var bShakingBlocks = false;
var tbShakeBlocks = [];

// 블럭 흔들기
function ShowHurryUp(_bCheck) {
	if(_bCheck){
		if(!bInitBlockShakce){
            bInitBlockShakce = true;
            bShakingBlocks = true;
            for(var y = 0, ymax = sprBlock.length;y<ymax;++y){
                for(var x=0,xmax= sprBlock[y].length; x<xmax; ++x){
                    if(sprBlock[y][x].type >= 0){
                        if(sprBlock[y][x].visible){
                            tbShakeBlocks[tbShakeBlocks.length] = (y * 100) + x;
                            sprShakeBlock[y][x] = 0;
                        }else{
                            sprShakeBlock[y][x] = -1;
                        }
                    }else{
                        sprShakeBlock[y][x] = -1;
                    }
                }
            }

			for(var i=0,imax = tbShakeBlocks.length;i<imax;++i){
                var cho_x = tbShakeBlocks[i] % 100;
                var cho_y = Math.floor(tbShakeBlocks[i] / 100);
                HurryRepeatIn(cho_x,cho_y);
			}
		}
	}else{
        OriginRotationTween();
	}
}

function OriginRotationTween() {
    for(var i=0,imax = tbShakeBlocks.length;i<imax;++i){
        var cho_x = tbShakeBlocks[i] % 100;
        var cho_y = Math.floor(tbShakeBlocks[i] / 100);

        TweenMax.to(sprBlock[cho_y][cho_x],0.1,{rotation:0,repeatDelay:0});
    }
}

function HurryRepeatIn(x,y) {
	if(iSelX1 != -1) return;
	if(!bShakingBlocks) return;

	TweenMax.to(sprBlock[y][x],0.2,{rotation:-0.2,repeatDelay:0, onComplete:function () {
		HurryRepeatOut(x,y);
	}});
}

function HurryRepeatOut(x,y) {
    if(iSelX1 != -1) return;
    if(!bShakingBlocks) return;

	TweenMax.to(sprBlock[y][x],0.2,{rotation:0.2,repeatDelay:0, onComplete:function () {
		HurryRepeatIn(x,y)
	}});
}

var Current_Popup_State = POPUP_TYPE.GAME_START;
function ShowPopup(_b_show,_type) {
	if (_type == POPUP_TYPE.GAME_CHARGE_HEART || _type == POPUP_TYPE.GAME_CHARGE_GOLD)
		return;
	
	if(_type != POPUP_TYPE.GAME_TUTORIAL && _type != POPUP_TYPE.GAME_CLEAR && _type != POPUP_TYPE.GAME_FAIL){
        if(_b_show)
            SESoundPlay(SE_POPUP_ON);
        else{
        	if(state != STATE_GAME)
            	SESoundPlay(SE_POPUP_OFF);
		}
	}

    Current_Popup_State = _type;

    // all close about popup\
    sPopupBase.visible 		= _b_show;
    sPopupGameStart.visible = false;
    sPopupGameClear.visible = false;
    sPopupGameFail.visible 	= false;
    sPopupPause.visible 		= false;
    sPopupReplay.visible		= false;
    sPopupExit.visible 		= false;
    sPopupTutorial.visible	= false;
    sPopupCharge.visible		= false;

    sPopupFrame[POPUP_TYPE.GAME_START].visible 				= false;
    sPopupFrame[POPUP_TYPE.GAME_FAIL].visible 				= false;
    sPopupFrame[POPUP_TYPE.GAME_SETTING].visible 				= false;
    sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP].visible 			= false;
    sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP].visible = false;
	sPopupFrame[POPUP_TYPE.GAME_CHARGE_HEART].visible 		= false;

    if(_b_show){
        // popup base show
        switch (_type){
            case POPUP_TYPE.GAME_START:
            case POPUP_TYPE.GAME_CLEAR:
                for(var i=0,imax = spine_hint_blocks.length;i<imax;++i)
                    spine_hint_blocks[i].visible = false;

                spine_combo_ani_big.visible = false;
                for(var i=0,imax= 4;i<imax;++i)
                    sprItemBlock[i].visible = false;

            	spine_clear.visible = false;
            	for(var i=0,imax=spine_clear_stars.length;i<imax;++i)
            		spine_clear_stars[i].visible =false;

                sPopupFrame[POPUP_TYPE.GAME_START].visible = true;
                break;
            case POPUP_TYPE.GAME_FAIL:
                sPopupFrame[POPUP_TYPE.GAME_FAIL].visible = true;
                break;
            case POPUP_TYPE.GAME_SETTING:
            case POPUP_TYPE.GAME_GIVEUP:
            case POPUP_TYPE.GAME_GIVEUPANDREPLAY:
			case POPUP_TYPE.GAME_TUTORIAL:
                sPopupFrame[POPUP_TYPE.GAME_SETTING].visible = true;
                break;
			case POPUP_TYPE.GAME_HEART_SHOP:
			case POPUP_TYPE.GAME_GOLD_SHOP:


                if(list_sprPopupShopBtn[0]._events['click'] === undefined){
                    list_sprPopupShopBtn[0].on('click', function () {CB_PopupShopBtn(0,_type)});
                    list_sprPopupShopBtn[0].on('tap', function () {CB_PopupShopBtn(0,_type)});

                    list_sprPopupShopBtn[1].on('click', function () {CB_PopupShopBtn(1,_type)});
                    list_sprPopupShopBtn[1].on('tap', function () {CB_PopupShopBtn(1,_type)});

                    list_sprPopupShopBtn[2].on('click', function () {CB_PopupShopBtn(2,_type)});
                    list_sprPopupShopBtn[2].on('tap', function () {CB_PopupShopBtn(2,_type)});

                    list_sprPopupShopBtn[3].on('click', function () {CB_PopupShopBtn(3,_type)});
                    list_sprPopupShopBtn[3].on('tap', function () {CB_PopupShopBtn(3,_type)});
                }
				break;
			case POPUP_TYPE.GAME_CONFIRM_HEART_SHOP:
            case POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP:
				break;
			case POPUP_TYPE.GAME_CHARGE_HEART:
			case POPUP_TYPE.GAME_CHARGE_GOLD:
				sPopupFrame[POPUP_TYPE.GAME_CHARGE_HEART].visible = true;
                sPopupCharge.visible = true;
				break;
        }

        // popup contents show
        switch(_type) {
            case POPUP_TYPE.GAME_START:
                coinLifeView.show(2);
                txtItemInfo.text = GetString("shop006");
                sPopupGameStart.visible = true;
                break;
            case POPUP_TYPE.GAME_CLEAR:
                sPopupGameClear.visible = true;
                break;
            case POPUP_TYPE.GAME_FAIL:
                sPopupGameFail.visible = true;
                coinLifeView.show(3);
                break;
            case POPUP_TYPE.GAME_SETTING:
                txtPopupTitle.text = GetString('setting');
                sPopupPause.visible = true;
                break;
            case POPUP_TYPE.GAME_GIVEUP:
                txtPopupTitle.text = GetString('giveup');
                sPopupExit.visible = true;
                break;
            case POPUP_TYPE.GAME_GIVEUPANDREPLAY:
                txtPopupTitle.text = GetString('retry');
                sPopupReplay.visible = true;
            	break;
            case POPUP_TYPE.GAME_TUTORIAL:
            	if(kData.bFirst){
					b_timeStop = true;
				}
            	sPopupTutorial.visible = true;
            	break;
            case POPUP_TYPE.GAME_HEART_SHOP:

            	networkManager.GetShoplist(ShopType.HEART, function () {
                    //console.log(JSON.stringify(shopListData))
                    type_data = AD_TYPE.HEART;

                    txtPopupShopTitle.text = GetString('heartshop');
                    bisHeartShop = true;
				//	switch (servicePos){
				//		case 0:		// greap 페이지
							if(loginTF == 0){
								txtPopupShopPoint.text = GetString("login");
							}else{
								txtPopupShopPoint.text = kData.greappoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							}

							for(var i=0;i<4;++i){
								if(shopListData[i].pType == "member" && loginTF == 0 && shopListData[i].pType.indexOf('ad') == -1)
									txtPopupShopPointOnlyOurClient[i].visible = true;
								else
									txtPopupShopPointOnlyOurClient[i].visible = false;

								if(shopListData[i].pType.indexOf('ad') > -1) {
									sprPopupShopContentsInBtn[i].visible = true;
									txtPopupShopContentsInBtn[i].visible = false;
									if(shopListData[i].pType == "ad_1")
										sprPopupShopContentsInBtn[i].texture = PIXI.Texture.fromFrame("Popup/Shop/shop_ad.png");
									else
										sprPopupShopContentsInBtn[i].texture = PIXI.Texture.fromFrame("Popup/Shop/shop_movie.png");
									sprPopupShopMCoins[i].visible = false;
								}else{
									sprPopupShopContentsInBtn[i].visible = false;
									txtPopupShopContentsInBtn[i].visible = true;
									txtPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
									sprPopupShopMCoins[i].visible = true;
								//	sprPopupShopMCoins[i].position.set(-list_sprPopupShopBtn[i].width/2+40, -5);
								}

								if(kData.greappoint < shopListData[i].Price){
									list_sprPopupShopBtn[i].interactive = false;

									sprPopupShopBtn_disable[i].visible = true;
									sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsInBtn[i]);
									sprPopupShopBtn_disable[i].addChild(sprPopupShopContentsInBtn[i]);
									sprPopupShopBtn_disable[i].addChild(sprPopupShopMCoins[i]);
								}else{
									list_sprPopupShopBtn[i].interactive = true;

									sprPopupShopBtn_disable[i].visible = false;
									list_sprPopupShopBtn[i].visible = true;
									list_sprPopupShopBtn[i].addChild(txtPopupShopContentsInBtn[i]);
									list_sprPopupShopBtn[i].addChild(sprPopupShopContentsInBtn[i]);
									list_sprPopupShopBtn[i].addChild(sprPopupShopMCoins[i]);
								}

								if(shopListData[i].icon.indexOf('.png') == -1)
									shopListData[i].icon +=".png";

								sprPopupShopContents[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
								txtShopItemCnt[i].text = "x" + shopListData[i].Quantity;
							}
						/*	break;
						case 1:		// 야후
							txtPopupShopPoint.text = kData.greappoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							txtPopupShopPointOnlyOurClient[0].visible = false;
							txtPopupShopPointOnlyOurClient[1].visible = false;

							txtPopupShopContentsInBtn[0].visible = true;
							sprPopupShopContentsInBtn[0].visible = true;

							for(var i=1,imax=4;i<imax;++i){
								if(txtPopupShopContentsInBtn[i] != undefined)
									txtPopupShopContentsInBtn[i].visible = true;

								list_sprPopupShopBtn[i].texture = PIXI.Texture.fromFrame("Popup/Shop/list_1.png");

								//if(sprPopupShopContentsInBtn[i] != undefined)
								//    sprPopupShopContentsInBtn[i].visible = false;
							}
							break;
					}*/
                    /*for(var i=0,imax=4;i<imax;++i){
                    	if(servicePos == 0){
                    		switch (i){
                                case 0:
                                case 1:
                                    txtPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    sprPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    if(sprPopupShopMCoins[i] == null || sprPopupShopMCoins[i] === undefined){
                                        sprPopupShopMCoins[i] = SpriteLoad(list_sprPopupShopBtn[i],"Popup/coin.png",-list_sprPopupShopBtn[i].width/2+40,0);
                                        txtPopupShopContentsInBtn[i].position.x += 30;
                                        sprPopupShopContentsInBtn[i].position.x += 30;
                                        sprPopupShopMCoins[i].scale.set(0.7);
									}

                                    if(loginTF == 1){
                                        if(kData.greappoint < shopListData[i].Price){
                                            list_sprPopupShopBtn[i].interactive = false;

                                            sprPopupShopBtn_disable[i].visible = true;
                                            sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsInBtn[i]);
                                            sprPopupShopBtn_disable[i].addChild(sprPopupShopContentsInBtn[i]);
                                            sprPopupShopBtn_disable[i].addChild(sprPopupShopMCoins[i]);
                                        }else{
                                            list_sprPopupShopBtn[i].interactive = true;

                                            sprPopupShopBtn_disable[i].visible = false;
                                            list_sprPopupShopBtn[i].visible = true;
                                            list_sprPopupShopBtn[i].addChild(txtPopupShopContentsInBtn[i]);
                                            list_sprPopupShopBtn[i].addChild(sprPopupShopContentsInBtn[i]);
                                            list_sprPopupShopBtn[i].addChild(sprPopupShopMCoins[i]);
                                        }
                                    }else{
                                        sprPopupShopBtn_disable[i].visible = false;
                                    }
                                    break;
							}
						}else{ // servicePos == 1
                            txtPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            sprPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            if(sprPopupShopMCoins[i] == null || sprPopupShopMCoins[i] === undefined){
                                sprPopupShopMCoins[i] = SpriteLoad(list_sprPopupShopBtn[i],"Popup/coin.png",-list_sprPopupShopBtn[i].width/2+40,0);
                                txtPopupShopContentsInBtn[i].position.x += 30;
                                sprPopupShopContentsInBtn[i].position.x += 30;
                                sprPopupShopMCoins[i].scale.set(0.7);
                            }

                            if(kData.greappoint < shopListData[i].Price){
                                list_sprPopupShopBtn[i].interactive = false;

                                sprPopupShopBtn_disable[i].visible = true;
                                sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsInBtn[i]);
                                sprPopupShopBtn_disable[i].addChild(sprPopupShopContentsInBtn[i]);
                                sprPopupShopBtn_disable[i].addChild(sprPopupShopMCoins[i]);
                            }else{
                                list_sprPopupShopBtn[i].interactive = true;

                                sprPopupShopBtn_disable[i].visible = false;
                                list_sprPopupShopBtn[i].visible = true;
                                list_sprPopupShopBtn[i].addChild(txtPopupShopContentsInBtn[i]);
                                list_sprPopupShopBtn[i].addChild(sprPopupShopContentsInBtn[i]);
                                list_sprPopupShopBtn[i].addChild(sprPopupShopMCoins[i]);
                            }
						}

                        if(shopListData[i].icon.indexOf('.png') == -1)
                            shopListData[i].icon +=".png";

                        sprPopupShopContents[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
                        txtShopItemCnt[i].text = "x" + shopListData[i].Quantity;
                    }*/

                    list_sprPopupShopBtn[0]._events['click'].fn = function () {CB_PopupShopBtn(0,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};
                    list_sprPopupShopBtn[0]._events['tap'].fn = function () {CB_PopupShopBtn(0,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};

                    list_sprPopupShopBtn[1]._events['click'].fn = function () {CB_PopupShopBtn(1,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};
                    list_sprPopupShopBtn[1]._events['tap'].fn = function () {CB_PopupShopBtn(1,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};

                    list_sprPopupShopBtn[2]._events['click'].fn = function () {CB_PopupShopBtn(2,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};
                    list_sprPopupShopBtn[2]._events['tap'].fn = function () {CB_PopupShopBtn(2,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};

                    list_sprPopupShopBtn[3]._events['click'].fn = function () {CB_PopupShopBtn(3,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};
                    list_sprPopupShopBtn[3]._events['tap'].fn = function () {CB_PopupShopBtn(3,POPUP_TYPE.GAME_CONFIRM_HEART_SHOP);};

                    CheckItemEnableToBuy();
                    sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP].visible = true;
                });

            	break;
            case POPUP_TYPE.GAME_GOLD_SHOP:

            	networkManager.GetShoplist(ShopType.GAMEMONEY, function () {
                    //console.log(JSON.stringify(shopListData));
                    type_data = AD_TYPE.GAME_MONEY;

                    txtPopupShopTitle.text = GetString('goldshop');
                    bisHeartShop = false;

					if(loginTF == 0){
						txtPopupShopPoint.text = GetString("login");
					}else{
						txtPopupShopPoint.text = kData.greappoint.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
					}

					for(var i=0;i<4;++i){
						if(shopListData[i].pType == "member" && loginTF == 0 && shopListData[i].pType.indexOf('ad') == -1)
							txtPopupShopPointOnlyOurClient[i].visible = true;
						else
							txtPopupShopPointOnlyOurClient[i].visible = false;

						if(shopListData[i].pType.indexOf('ad') > -1) {
							sprPopupShopContentsInBtn[i].visible = true;
							txtPopupShopContentsInBtn[i].visible = false;
							if(shopListData[i].pType == "ad_1")
								sprPopupShopContentsInBtn[i].texture = PIXI.Texture.fromFrame("Popup/Shop/shop_ad.png");
							else
								sprPopupShopContentsInBtn[i].texture = PIXI.Texture.fromFrame("Popup/Shop/shop_movie.png");
							sprPopupShopMCoins[i].visible = false;
						}else{
							sprPopupShopContentsInBtn[i].visible = false;
							txtPopupShopContentsInBtn[i].visible = true;
							txtPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							sprPopupShopMCoins[i].visible = true;
							//	sprPopupShopMCoins[i].position.set(-list_sprPopupShopBtn[i].width/2+40, -5);
						}

						if(kData.greappoint < shopListData[i].Price){
							list_sprPopupShopBtn[i].interactive = false;

							sprPopupShopBtn_disable[i].visible = true;
							sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsInBtn[i]);
							sprPopupShopBtn_disable[i].addChild(sprPopupShopContentsInBtn[i]);
							sprPopupShopBtn_disable[i].addChild(sprPopupShopMCoins[i]);
						}else{
							list_sprPopupShopBtn[i].interactive = true;

							sprPopupShopBtn_disable[i].visible = false;
							list_sprPopupShopBtn[i].visible = true;
							list_sprPopupShopBtn[i].addChild(txtPopupShopContentsInBtn[i]);
							list_sprPopupShopBtn[i].addChild(sprPopupShopContentsInBtn[i]);
							list_sprPopupShopBtn[i].addChild(sprPopupShopMCoins[i]);
						}

						if(shopListData[i].icon.indexOf('.png') == -1)
							shopListData[i].icon +=".png";

						sprPopupShopContents[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
						txtShopItemCnt[i].text = "x" + shopListData[i].Quantity;
					}

                    /*for(var i=0,imax=4;i<imax;++i){
                        if(servicePos == 0){
                            switch (i){
                                case 0:
                                case 1:
                                    txtPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    sprPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                                    if(sprPopupShopMCoins[i] == null || sprPopupShopMCoins[i] === undefined){
										sprPopupShopMCoins[i] = SpriteLoad(list_sprPopupShopBtn[i],"Popup/coin.png",-list_sprPopupShopBtn[i].width/2+40,0);
										txtPopupShopContentsInBtn[i].position.x += 30;
										sprPopupShopContentsInBtn[i].position.x += 30;
										sprPopupShopMCoins[i].scale.set(0.7);
                                    }

                                    console.log(shopListData[i].Price);
                                    if(loginTF == 1){
                                        if(kData.greappoint < shopListData[i].Price){
                                        	list_sprPopupShopBtn[i].interactive = false;

                                            sprPopupShopBtn_disable[i].visible = true;
                                            sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsInBtn[i]);
                                            sprPopupShopBtn_disable[i].addChild(sprPopupShopContentsInBtn[i]);
                                            sprPopupShopBtn_disable[i].addChild(sprPopupShopMCoins[i]);
                                        }else{
                                            list_sprPopupShopBtn[i].interactive = true;

                                            sprPopupShopBtn_disable[i].visible = false;
                                            list_sprPopupShopBtn[i].visible = true;
                                            list_sprPopupShopBtn[i].addChild(txtPopupShopContentsInBtn[i]);
                                            list_sprPopupShopBtn[i].addChild(sprPopupShopContentsInBtn[i]);
                                            list_sprPopupShopBtn[i].addChild(sprPopupShopMCoins[i]);
                                        }
                                    }else{
                                        sprPopupShopBtn_disable[i].visible = false;
                                    }

                                    break;
                            }
                        }else{
                            txtPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            sprPopupShopContentsInBtn[i].text = shopListData[i].Price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            if(sprPopupShopMCoins[i] == null || sprPopupShopMCoins[i] === undefined){
                                sprPopupShopMCoins[i] = SpriteLoad(list_sprPopupShopBtn[i],"Popup/coin.png",-list_sprPopupShopBtn[i].width/2+40,0);
                                txtPopupShopContentsInBtn[i].position.x += 30;
                                sprPopupShopContentsInBtn[i].position.x += 30;
                                sprPopupShopMCoins[i].scale.set(0.7);
                            }

							if(kData.greappoint < shopListData[i].Price){
								list_sprPopupShopBtn[i].interactive = false;

								sprPopupShopBtn_disable[i].visible = true;
								sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsInBtn[i]);
								sprPopupShopBtn_disable[i].addChild(sprPopupShopContentsInBtn[i]);
								sprPopupShopBtn_disable[i].addChild(sprPopupShopMCoins[i]);
							}else{
								list_sprPopupShopBtn[i].interactive = true;

								sprPopupShopBtn_disable[i].visible = false;
								list_sprPopupShopBtn[i].visible = true;
								list_sprPopupShopBtn[i].addChild(txtPopupShopContentsInBtn[i]);
								list_sprPopupShopBtn[i].addChild(sprPopupShopContentsInBtn[i]);
								list_sprPopupShopBtn[i].addChild(sprPopupShopMCoins[i]);
							}
                        }

                        if(shopListData[i].icon.indexOf('.png') == -1)
                            shopListData[i].icon +=".png";

                        sprPopupShopContents[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
                        txtShopItemCnt[i].text = "x" + shopListData[i].Quantity;
                    }*/


                    // if(loginTF == 1){
                     //    if(kData.greappoint < shopListData[0].Price){
                     //        list_sprPopupShopBtn[0].interactive = false;
                    //
                     //        sprPopupShopBtn_disable[0].visible = true;
                     //        sprPopupShopBtn_disable[0].addChild(txtPopupShopContentsInBtn[0]);
                     //    }else{
                     //        list_sprPopupShopBtn[0].interactive = true;
                    //
                     //        sprPopupShopBtn_disable[0].visible = false;
                     //        list_sprPopupShopBtn[0].visible = true;
                     //        list_sprPopupShopBtn[0].addChild(txtPopupShopContentsInBtn[0]);
                     //    }
                    //
                     //    if(kData.greappoint < shopListData[1].Price){
                     //        list_sprPopupShopBtn[1].interactive = false;
                    //
                     //        sprPopupShopBtn_disable[1].visible = true;
                     //        sprPopupShopBtn_disable[1].addChild(txtPopupShopContentsInBtn[1]);
					// 	}else{
                     //        list_sprPopupShopBtn[1].interactive = true;
                    //
                     //        sprPopupShopBtn_disable[1].visible = false;
                     //        list_sprPopupShopBtn[1].visible = true;
                     //        list_sprPopupShopBtn[1].addChild(txtPopupShopContentsInBtn[1]);
					// 	}
                    // }else{
                     //    sprPopupShopBtn_disable[0].visible = false;
                     //    sprPopupShopBtn_disable[1].visible = false;
					// }

                    list_sprPopupShopBtn[0]._events['click'].fn = function () {CB_PopupShopBtn(0,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};
                    list_sprPopupShopBtn[0]._events['tap'].fn = function () {CB_PopupShopBtn(0,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};

                    list_sprPopupShopBtn[1]._events['click'].fn = function () {CB_PopupShopBtn(1,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};
                    list_sprPopupShopBtn[1]._events['tap'].fn = function () {CB_PopupShopBtn(1,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};

                    list_sprPopupShopBtn[2]._events['click'].fn = function () {CB_PopupShopBtn(2,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};
                    list_sprPopupShopBtn[2]._events['tap'].fn = function () {CB_PopupShopBtn(2,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};

                    list_sprPopupShopBtn[3]._events['click'].fn = function () {CB_PopupShopBtn(3,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};
                    list_sprPopupShopBtn[3]._events['tap'].fn = function () {CB_PopupShopBtn(3,POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP);};

                    sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP].visible = true;
                });

                break;
			case POPUP_TYPE.GAME_CONFIRM_HEART_SHOP:
				if(shopListData[iSelectedShopItem].pType == 'member'){
					kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
					sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP].visible = true;
					/*networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GetString('signup'),
						function () {
                            ShowPopup(false);
							networkManager.JoinMember();
                        },
						function () {
                            ShowPopup(false);
                        }
					);*/
				}else{
					if(servicePos == 0)
                    	coinLifeView.ADCooltime(iSelectedShopItem);

                    networkManager.Payment(shopListData[iSelectedShopItem].mkidx, function () {
                        if(loginTF == 0){
                            kData.life += shopListData[iSelectedShopItem].Quantity;
                            // 추가 사항 잇을 예정
						}

                        txtPopupShopConfirmContent.text = GetString("heart") + " " + GetString("shop_get", shopListData[iSelectedShopItem].Quantity);
                        if(servicePos == 0){
                            switch (iSelectedShopItem){
                                case 0:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/heart_no_1.png");
                                    break;
                                case 1:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/heart_no_4.png");
                                    break;
                                case 2:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/heart_no_1.png");
                                    break;
                                case 3:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/heart_no_3.png");
                                    break;
                            }
						}else{
                            sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/heart_no_" + (iSelectedShopItem + 1) + ".png");
						}


                        txtPopupShopConfirm.text = "x" + shopListData[iSelectedShopItem].Quantity;

                        sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP].visible = true;

                        SaveDataInClient(false);
                    });
				}
				//SaveDataInClient();

				break;
            case POPUP_TYPE.GAME_CONFIRM_GOLD_SHOP:
                if(shopListData[iSelectedShopItem].pType == 'member'){
					kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
					sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP].visible = true;
				}else{
                	if(servicePos == 0)
                    	coinLifeView.ADCooltime(iSelectedShopItem);

                    networkManager.Payment(shopListData[iSelectedShopItem].mkidx, function () {
                        if(loginTF == 0 ){
                            kData.coin += shopListData[iSelectedShopItem].Quantity;
                            // 추가 사항 있을 예정
						}

                        txtPopupShopConfirmContent.text = GetString("gold") + " " + GetString("shop_get", shopListData[iSelectedShopItem].Quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

                        if(servicePos == 0){
                            switch (iSelectedShopItem){
                                case 0:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/gold_no_1.png");
                                    break;
                                case 1:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/gold_no_4.png");
                                    break;
                                case 2:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/gold_no_1.png");
                                    break;
                                case 3:
                                    sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/gold_no_4.png");
                                    break;
                            }
                        }else{
                            sprPopupShopConfirm.texture = PIXI.Texture.fromFrame("Popup/Shop/gold_no_" + (iSelectedShopItem+1) + ".png");
                        }

                        txtPopupShopConfirm.text = "x" + shopListData[iSelectedShopItem].Quantity.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                        sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP].visible = true;

                        SaveDataInClient(false);
                    });
				}

                //SaveDataInClient();
                break;
            case POPUP_TYPE.GAME_CHARGE_HEART:
                txtPopupChargeMsg.text = GetString('charge_heart');
                sprPopupCharge.texture = PIXI.Texture.fromFrame("Popup/heart.png");
                bIsHeartCharge = true;
                break;
            case POPUP_TYPE.GAME_CHARGE_GOLD:
                txtPopupChargeMsg.text = GetString('charge_gold');
                sprPopupCharge.texture = PIXI.Texture.fromFrame("Popup/message_gold.png");
                bIsHeartCharge = false;
            	break;
        }
    }
}

function CB_PopupShopBtn(_number,_popup_type) {
	iSelectedShopItem = _number;
	SESoundPlay(SE_CLICK);
	ShowPopup(true,_popup_type);
}

var deleayGoldCounting = 0.02;
var fCurrent_delrayGoldCntTime = 0;
var countingCnt = 1;
var countUpGold_normalReward = 0;
var fCountUpTime = 0;
var iCountUpTimeReward = 0;

function ShowGoldCounting(_goldCount) {
    fCurrent_delrayGoldCntTime += deltaTime;

	if(deleayGoldCounting * countingCnt < fCurrent_delrayGoldCntTime){
        countingCnt++;
        countUpGold_normalReward++;
        if(countUpGold_normalReward >= STAGE_CLEAR_REWARD)
            countUpGold_normalReward = STAGE_CLEAR_REWARD;

        txtResultReward.text = countUpGold_normalReward.toString();

        txtResultRecord.text = "";

        fCountUpTime += 1.0;
        if(fCountUpTime >= fPlayTime)
            fCountUpTime = fPlayTime;

        if(fCountUpTime/60 < 10)
            txtResultRecord.text += "0" + Math.floor(fCountUpTime/60) + ":";
        else
            txtResultRecord.text += Math.floor(fCountUpTime/60) + ":";

        if(fCountUpTime%60 < 10)
            txtResultRecord.text += "0" + Math.floor(fCountUpTime%60);
        else
            txtResultRecord.text += Math.floor(fCountUpTime%60);

        iCountUpTimeReward =  Math.floor(fCountUpTime) * COINPERSECOND;
        txtResultBonus.text = iCountUpTimeReward.toString();
	}
}

function GameViewSetting()
{
    stage.addChild(sGame);

    // 스테이지 셀러트 페이지 구성
	var sprStageSelectMain = SpriteLoad(sStageSelect, "StageSelect/select.png", iCenterSizeX, iCenterSizeY);
	stage.addChild(sStageSelect);
    sStageSelect.visible = false;
    FontLoad(sStageSelect, GetString('stageselect'),iCenterSizeX,iCenterSizeY - 560,0.5,0.5,
        {font:'55px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#82302f',strokeThickness:5});

	// 스테이지 총 16개 셋팅..
	sprStage.push(new kStage( -217 + iCenterSizeX, -187 +iCenterSizeY, function(){cbButtonStageClick(0);}));
	sprStage.push(new kStage( -71 + iCenterSizeX,  -187 + iCenterSizeY, function(){cbButtonStageClick(1);}));
	sprStage.push(new kStage(74 + iCenterSizeX, -187 + iCenterSizeY, function(){cbButtonStageClick(2);}));
	sprStage.push(new kStage(220 + iCenterSizeX, -187 + iCenterSizeY, function(){cbButtonStageClick(3);}));

	sprStage.push(new kStage(-217 + iCenterSizeX, -10 + iCenterSizeY, function(){cbButtonStageClick(4);}));
	sprStage.push(new kStage(-71 + iCenterSizeX, -10 + iCenterSizeY, function(){cbButtonStageClick(5);}));
	sprStage.push(new kStage(74 + iCenterSizeX, -10 + iCenterSizeY, function(){cbButtonStageClick(6);}));
	sprStage.push(new kStage(220 + iCenterSizeX, -10 + iCenterSizeY, function(){cbButtonStageClick(7);}));

	sprStage.push(new kStage(-217 + iCenterSizeX, 165 + iCenterSizeY, function(){cbButtonStageClick(8);}));
	sprStage.push(new kStage(-71 + iCenterSizeX, 165 + iCenterSizeY, function(){cbButtonStageClick(9);}));
	sprStage.push(new kStage(74 + iCenterSizeX, 165 + iCenterSizeY, function(){cbButtonStageClick(10);}));
	sprStage.push(new kStage(220 + iCenterSizeX, 165 + iCenterSizeY, function(){cbButtonStageClick(11);}));

	sprStage.push(new kStage(-217 + iCenterSizeX, 341 + iCenterSizeY, function(){cbButtonStageClick(12);}));
	sprStage.push(new kStage(-71 + iCenterSizeX, 341 + iCenterSizeY, function(){cbButtonStageClick(13);}));
	sprStage.push(new kStage(74 + iCenterSizeX, 341 + iCenterSizeY, function(){cbButtonStageClick(14);}));
	sprStage.push(new kStage(220 + iCenterSizeX, 341 + iCenterSizeY, function(){cbButtonStageClick(15);}));

	sprArrowLeft = SpriteLoad(sStageSelect, "StageSelect/btn_page_arrow.png", iCenterSizeX - 218, iCenterSizeY + 500);
	sprArrowLeft.interactive = true;
	sprArrowLeft.on('click', cbButtonArrowLeft);
	sprArrowLeft.on('tap', cbButtonArrowLeft);
	sprArrowLeft.on('mouseover', scaleUp);
	sprArrowLeft.on('touchstart', scaleUp);
	sprArrowLeft.on('mouseout', restoreScale);
	sprArrowLeft.on('touchend', restoreScale);

	sprArrowRight = SpriteLoad(sStageSelect, "StageSelect/btn_page_arrow.png", iCenterSizeX + 220, iCenterSizeY + 500);
    sprArrowRight.scale.set(-1, 1);
	sprArrowRight.interactive = true;
	sprArrowRight.on('click', cbButtonArrowRight);
	sprArrowRight.on('tap', cbButtonArrowRight);
	sprArrowRight.on('mouseover', ScaleUpFlipHorizontal);
	sprArrowRight.on('tap', ScaleUpFlipHorizontal);
	sprArrowRight.on('mouseout', restoreScaleFlipHorizontal);
	sprArrowRight.on('touchend', restoreScaleFlipHorizontal);

    iPage = Math.floor((kData.clearStage.length-1) / PAGE_CHILD_CNT);

	var sprPageBackForm = SpriteSliceLoadNew(sStageSelect,"StageSelect/start_page.png",iCenterSizeX, iCenterSizeY + 495,0.5,0.5, 20,20,10,10,280,74);
	var iPageMax = iPage+1;

	txtPageInfo = FontLoad(sprPageBackForm, (iPage+1) + " / " + iPageMax, 0 ,0 ,0.5 ,0.5 ,
		{font:'40px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#59493f', strokeThickness:5});

	coinLifeView.initSprite();	// 초기화 셋팅을 한다.

    if(loginTF == 0) {
        networkManager.GetServerTime(function (_time) {
            if (clientData[TIME_STAMP] != null) {
                var lostTime = (_time - clientData[TIME_STAMP]);
                coinLifeView.LostTime(lostTime);
            }

            clientData[TIME_STAMP] = _time;
            SaveDataInClient();
        });
    }else{
        // 로그인 퇴어 있을 경우에는 하트는 받아오니 ADCoolTime만 정리
        for(var i=0,imax= kData.fCooltime_Heart.length;i<imax;++i){
            if(kData.fCooltime_Heart[i] > 0){
                kData.fCooltime_Heart[i] -= kData.calcedTimeStamp;
                // Gamemoney 데이터를 쓰는 경우
                kData.fCooltime_Gamemoney[i] -= kData.calcedTimeStamp;

                if(kData.fCooltime_Heart[i] <= 0)
                    kData.fCooltime_Heart[i] = 0;

                // Gamemoney 데이터를 쓰는 경우
                if(kData.fCooltime_Gamemoney[i] <= 0)
					kData.fCooltime_Gamemoney[i] = 0;
            }
        }
    }

    // 팝업 베이스 처리
    var spr = PIXIGraphics(sPopupBase,0x000000, 0.6, 0,0,iMaxSizeX,iMaxSizeY);
    //spr.cbNum = 0;
    spr.interactive = true;
    //spr.on('click', cbButtonWhite); // 터치 막는 용도
    //spr.on('tap', cbButtonWhite);

    sPopupBase.interactive = true;

    // popup frame들 부터 먼저 선언 해주고 [게임 스타트 팝업, 클리어]
    sPopupFrame[POPUP_TYPE.GAME_START].addChild(spine_clear);
    spine_clear.visible = false;
    SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_START],"Popup/popup.png",iCenterSizeX,iCenterSizeY + 160,0.5,0.5,55,55,65,65,684,710);
	SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_START],"Popup/popup_subject.png",iCenterSizeX,iCenterSizeY + 120,0.5,0.5, 35,35,35,35,620,400);
    SpriteLoad(sPopupFrame[POPUP_TYPE.GAME_START],"StageSelect/start_title.png",iCenterSizeX,iCenterSizeY-237);

    spine_clear_stars[3] = SpriteLoad(sPopupFrame[POPUP_TYPE.GAME_START],"StageSelect/combo-icon.png", iCenterSizeX + 280,iCenterSizeY -220,0.5,0.5);

    for(var i =0,imax=spine_clear_stars.length;i<imax;++i ){
        sPopupFrame[POPUP_TYPE.GAME_START].addChild(spine_clear_stars[i]);
        spine_clear_stars[i].visible = false;
	}

    spine_clear_stars[0].position.set(iCenterSizeX -150,iCenterSizeY-240);
    spine_clear_stars[1].position.set(iCenterSizeX,iCenterSizeY-290);
    spine_clear_stars[2].position.set(iCenterSizeX +150,iCenterSizeY-240);

    sprStageSelectedStars[0] = SpriteLoad(sPopupFrame[POPUP_TYPE.GAME_START],"StageSelect/result_star_1.png",iCenterSizeX -149,iCenterSizeY-258);
    sprStageSelectedStars[1] = SpriteLoad(sPopupFrame[POPUP_TYPE.GAME_START],"StageSelect/result_star_2.png",iCenterSizeX,iCenterSizeY-290,0.5,0.5);
    sprStageSelectedStars[2] = SpriteLoad(sPopupFrame[POPUP_TYPE.GAME_START],"StageSelect/result_star_1.png",iCenterSizeX +151,iCenterSizeY-258,0.5,0.5);
    sprStageSelectFullCombo = SpriteLoad(sPopupFrame[POPUP_TYPE.GAME_START],"StageSelect/combo-icon.png", iCenterSizeX + 280,iCenterSizeY -220,0.5,0.5);

    for(var i=0,imax=sprStageSelectedStars.length;i<imax;++i)
        sprStageSelectedStars[i].visible = false;
    sprStageSelectFullCombo.visible = false;

    txtPopupStage = FontLoad(sPopupFrame[POPUP_TYPE.GAME_START], "STAGE 1", iCenterSizeX, iCenterSizeY - 160, 0.5, 0.5,
        {font:'50px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#7f2d00',strokeThickness:7});
    sPopupBase.addChild(sPopupFrame[POPUP_TYPE.GAME_START]);

    // 팝업 프레임 -> Failed
    SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_FAIL],"Popup/popup_fail.png",iCenterSizeX,iCenterSizeY + 25, 0.5,0.5, 65,65,65,65,684,603);
    spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_FAIL],"Popup/title.png",iCenterSizeX,iCenterSizeY - 260, 0.5,0.5, 50,50,55,55,578,112);
    FontLoad(spr,"STAGE RESULT",0,0, 0.5,0.5,
		{font:'55px ' + tbTTF[lang],fill:'#ffffff',
			stroke:'#82302f', strokeThickness:5});
    SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_FAIL],"Popup/fail_bg.png",iCenterSizeX, iCenterSizeY - 25, 0.5,0.5, 35,35,35,35, 620, 335);
	spine_failed_ani.visible = false;
    sPopupFrame[POPUP_TYPE.GAME_FAIL].addChild(spine_failed_ani);
    sPopupBase.addChild(sPopupFrame[POPUP_TYPE.GAME_FAIL]);

    // 팝업 프레임 -> setting, give up, give up and replay
	SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_SETTING],"Popup/popup.png",iCenterSizeX, iCenterSizeY + 25, 0.5,0.5, 55,55,65,65, 592,447);
	spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_SETTING],"Popup/title.png", iCenterSizeX, iCenterSizeY - 190, 0.5,0.5, 50,50, 55,55, 486,112);
	txtPopupTitle = FontLoad(spr,GetString('setting'),0,-10, 0.5,0.5,
		{font:'45px ' + tbTTF[lang],fill:'#ffffff',
			stroke:'#82302f', strokeThickness:5});
	sPopupBase.addChild(sPopupFrame[POPUP_TYPE.GAME_SETTING]);

	// 팝업 프레임 -> Shop [gold, heart 동시 프레임]
    sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP] = new PIXI.Container();
	SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/popup.png", iCenterSizeX,iCenterSizeY  + 27, 0.5,0.5, 55,55, 65,65, 644,915);

	spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/title.png", iCenterSizeX, iCenterSizeY - 415, 0.5,0.5, 50,50, 55,55, 486,112);
	txtPopupShopTitle = FontLoad(spr,GetString('heartshop'),0,0, 0.5,0.5,
		{font:'52px ' + tbTTF[lang], fill:'#ffffff', align:'center',
		stroke:'#7f2d00', strokeThickness:5});

    spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/Shop/point.png", iCenterSizeX,iCenterSizeY - 310, 0.5,0.5, 74,64,0,0, 300,70);
	if(servicePos == 0){
        if(loginTF == 0){
            spr.interactive = true;
            spr.on('click',function () {
                SESoundPlay(SE_CLICK);
				kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
            });
            spr.on('tap', function () {
                SESoundPlay(SE_CLICK);
				kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
            });
        }
	}else{
        /*var spr2 = SpriteLoad(spr,"StageSelect/btn_plus", spr.width/2 +10, 5);
        spr2.interactive = true;
        spr2.on('click',function () {
        	networkManager.ForcedSaveData(false,function () {
                sNetworkLoading.visible = true;
                location.href = yahooInappURL;
            });

		});
        spr2.on('tap',function () {
            networkManager.ForcedSaveData(false,function () {
                sNetworkLoading.visible = true;
                location.href = yahooInappURL;
            });
        });
        spr2.on('mouseover',scaleUp);
        spr2.on('touchstart',scaleUp);
        spr2.on('mouseout',restoreScale);
        spr2.on('click',restoreScale);
        spr2.on('touchend',restoreScale);*/
	}

    txtPopupShopPoint = FontLoad(spr,GetString("login"), 32,0, 0.5,0.5,
		{font:'30px ' + tbTTF[lang], fill:'#fef9e7', align:'center',
			stroke:'#7f2d00',strokeThickness:5});

	for(var i=0;i<4;++i){
		spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/Shop/list_1.png", iCenterSizeX, iCenterSizeY - 190 + (150*i), 0.5,0.5, 30,30, 35,35, 595,150);
		sprPopupShopContents[i] = SpriteLoad(spr,"Popup/Shop/gold_no_1.png", -155,0);
		txtShopItemCnt[i] = new PIXI.extras.BitmapText("x5", { font:ShopNumTTF, align:'center'});
		spr.addChild(txtShopItemCnt[i]);
		txtShopItemCnt[i].position.set(-40,-60);
		txtPopupShopPointOnlyOurClient[i] = FontLoad(spr,GetString("only_account"), -220,-30, 0.5,0.5,
			{font:'25px ' + tbTTF[lang], fill:'#ffffff', align:'center',
				stroke:'#000000',strokeThickness:5});
		list_sprPopupShopBtn[i] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
		list_sprPopupShopBtn[i].interactive = true;

		sprPopupShopBtn_disable[i] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
		sprPopupShopBtn_disable[i].on('click',function () {
			//console.log('sprPopupShopBtn_disable[0]');
			SESoundPlay(SE_CLICK);
			if(yahooIN === undefined)
				kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
			else
				kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
		});
		sprPopupShopBtn_disable[i].on('tap',function () {
			//console.log('sprPopupShopBtn_disable[0]');
			SESoundPlay(SE_CLICK);
			if(yahooIN === undefined)
				kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
			else
				kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
		});
		sprPopupShopBtn_disable[i].on('mouseover',scaleUp);
		sprPopupShopBtn_disable[i].on('touchstart',scaleUp);
		sprPopupShopBtn_disable[i].on('mouseout',restoreScale);
		sprPopupShopBtn_disable[i].on('click',restoreScale);
		sprPopupShopBtn_disable[i].on('touchend',restoreScale);
		sprPopupShopBtn_disable[i].interactive = true;
		txtPopupShopContentsInBtn[i] = FontLoad(list_sprPopupShopBtn[i],"100", 25, -5, 0.5,0.5,
			{font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center'});
		sprPopupShopContentsInBtn[i] = SpriteLoad(list_sprPopupShopBtn[i],"Popup/Shop/shop_ad.png", 0,-5);
		txtPopupShopContentsCooltime[i] = FontLoad(list_sprPopupShopBtn[i], '00:00', 0,-5, 0.5,0.5,
			{font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center',
				stroke:'#1a1a0f', strokeThickness:7});
		txtPopupShopContentsCooltime[i].visible = false;
		sprPopupShopMCoins[i] = SpriteLoad(list_sprPopupShopBtn[i],"Popup/coin.png",-list_sprPopupShopBtn[i].width/2+40, -5);
		sprPopupShopMCoins[i].scale.set(0.7);
	}

	/*
	spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/Shop/list_1.png", iCenterSizeX, iCenterSizeY - 40, 0.5,0.5, 30,30, 35,35, 595,150);
	sprPopupShopContents[1] = SpriteLoad(spr,"Popup/Shop/gold_no_4.png", -155,0);

    txtShopItemCnt[1] = new PIXI.extras.BitmapText("x5", { font:ShopNumTTF, align:'center'});
    spr.addChild(txtShopItemCnt[1]);
    txtShopItemCnt[1].position.set(-40,-60);
    txtPopupShopPointOnlyOurClient[1] = FontLoad(spr,GetString("only_account"), -220,-30, 0.5,0.5,
        {font:'25px ' + tbTTF[lang], fill:'#ffffff', align:'center',
            stroke:'#000000',strokeThickness:5});

    if(servicePos == 0){
        list_sprPopupShopBtn[1] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
        sprPopupShopBtn_disable[1] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
	}else{
        list_sprPopupShopBtn[1] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
        sprPopupShopBtn_disable[1] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
	}
    list_sprPopupShopBtn[1].interactive = true;

    sprPopupShopBtn_disable[1].on('click',function () {
        console.log('sprPopupShopBtn_disable[1]');

        SESoundPlay(SE_CLICK);

        if(yahooIN === undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
        else
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
    });
    sprPopupShopBtn_disable[1].on('tap',function () {
        console.log('sprPopupShopBtn_disable[1]');

        SESoundPlay(SE_CLICK);

        if(yahooIN === undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
        else
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
    });
    sprPopupShopBtn_disable[1].on('mouseover',scaleUp);
    sprPopupShopBtn_disable[1].on('touchstart',scaleUp);
    sprPopupShopBtn_disable[1].on('mouseout',restoreScale);
    sprPopupShopBtn_disable[1].on('click',restoreScale);
    sprPopupShopBtn_disable[1].on('touchend',restoreScale);
    sprPopupShopBtn_disable[1].interactive = true;

    txtPopupShopContentsInBtn[1] = FontLoad(list_sprPopupShopBtn[1],"300", 0,-5, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center'});
	sprPopupShopContentsInBtn[1] = FontLoad(list_sprPopupShopBtn[1],"300P", 0,-5, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center'});
    txtPopupShopContentsCooltime[1] = FontLoad(list_sprPopupShopBtn[1], '00:00', 0,-5, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center',
            stroke:'#1a1a0f', strokeThickness:7});
    txtPopupShopContentsCooltime[1].visible = false;

    if(servicePos == 0){
        spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/Shop/list_2.png", iCenterSizeX, iCenterSizeY + 105, 0.5,0.5, 30,30, 35,35, 595,150);
	}else{
		spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/Shop/list_1.png", iCenterSizeX, iCenterSizeY + 105, 0.5,0.5, 30,30, 35,35, 595,150);
	}

    if(servicePos == 0){
        sprPopupShopContents[2] = SpriteLoad(spr,"Popup/Shop/gold_no_1.png", -155,0);
	}else{
        sprPopupShopContents[2] = SpriteLoad(spr,"Popup/Shop/gold_no_3.png", -155,0);
	}
    txtShopItemCnt[2] = new PIXI.extras.BitmapText("x20", { font:ShopNumTTF, align:'center'});
    spr.addChild(txtShopItemCnt[2]);
    txtShopItemCnt[2].position.set(-40,-60);

    if(servicePos == 0){
        list_sprPopupShopBtn[2] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_2.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
    }else{
        list_sprPopupShopBtn[2] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
    }
    list_sprPopupShopBtn[2].interactive = true;
    sprPopupShopBtn_disable[2] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
    sprPopupShopBtn_disable[2].visible = false;
    sprPopupShopBtn_disable[2].on('click',function () {
        SESoundPlay(SE_CLICK);

        if(yahooIN !== undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
    });
    sprPopupShopBtn_disable[2].on('tap',function () {
        SESoundPlay(SE_CLICK);

        if(yahooIN !== undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
    });
    sprPopupShopBtn_disable[2].on('mouseover',scaleUp);
    sprPopupShopBtn_disable[2].on('touchstart',scaleUp);
    sprPopupShopBtn_disable[2].on('mouseout',restoreScale);
    sprPopupShopBtn_disable[2].on('click',restoreScale);
    sprPopupShopBtn_disable[2].on('touchend',restoreScale);
    sprPopupShopBtn_disable[2].interactive = true;
    txtPopupShopContentsInBtn[2] = FontLoad(list_sprPopupShopBtn[2],"200", 0,-5, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center'});
    sprPopupShopContentsInBtn[2] = SpriteLoad(list_sprPopupShopBtn[2],"Popup/Shop/shop_ad.png", 0,-5);
    txtPopupShopContentsCooltime[2] = FontLoad(list_sprPopupShopBtn[2], '00:00', 0,-5, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center',
            stroke:'#1a1a0f', strokeThickness:7});
    txtPopupShopContentsCooltime[2].visible = false;

    if(servicePos == 0){
        spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/Shop/list_2.png", iCenterSizeX, iCenterSizeY + 255, 0.5,0.5, 30,30, 35,35, 595,150);
    }else{
        spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"Popup/Shop/list_1.png", iCenterSizeX, iCenterSizeY + 255, 0.5,0.5, 30,30, 35,35, 595,150);
    }
    sprPopupShopContents[3] = SpriteLoad(spr,"Popup/Shop/gold_no_4.png", -155,0);
    txtShopItemCnt[3] = new PIXI.extras.BitmapText("x60", { font:ShopNumTTF, align:'center'});
    spr.addChild(txtShopItemCnt[3]);
    txtShopItemCnt[3].position.set(-40,-60);

    if(servicePos == 0){
        list_sprPopupShopBtn[3] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_2.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
	}else {
        list_sprPopupShopBtn[3] = SpriteSliceLoadNew(spr, "Popup/Shop/btn_shop_1.png", 175, 0, 0.5, 0.5, 25, 25, 0, 0, 198, 88);
    }
    list_sprPopupShopBtn[3].interactive = true;
    sprPopupShopBtn_disable[3] = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",175,0, 0.5,0.5, 25,25, 0,0, 198,88);
    sprPopupShopBtn_disable[3].visible = false;
    sprPopupShopBtn_disable[3].on('click',function () {
        SESoundPlay(SE_CLICK);

        if(yahooIN !== undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
    });
    sprPopupShopBtn_disable[3].on('tap',function () {
        SESoundPlay(SE_CLICK);

        if(yahooIN !== undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
    });
    sprPopupShopBtn_disable[3].on('mouseover',scaleUp);
    sprPopupShopBtn_disable[3].on('touchstart',scaleUp);
    sprPopupShopBtn_disable[3].on('mouseout',restoreScale);
    sprPopupShopBtn_disable[3].on('click',restoreScale);
    sprPopupShopBtn_disable[3].on('touchend',restoreScale);
    sprPopupShopBtn_disable[3].interactive = true;
    txtPopupShopContentsInBtn[3] = FontLoad(list_sprPopupShopBtn[3],"400", 0,-5, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center'});

    sprPopupShopContentsInBtn[3] = SpriteLoad(list_sprPopupShopBtn[3],"Popup/Shop/shop_movie.png", 0, -5);
    txtPopupShopContentsCooltime[3] = FontLoad(list_sprPopupShopBtn[3], '00:00', 0,-5, 0.5,0.5,
        {font:'35px ' + tbTTF[lang], fill:'#ffffff' , align:'center',
            stroke:'#1a1a0f', strokeThickness:7});
    txtPopupShopContentsCooltime[3].visible = false;
*/
    for(var i=0,imax = list_sprPopupShopBtn.length;i<imax;++i){
        list_sprPopupShopBtn[i].on('mouseover', scaleUp);
        list_sprPopupShopBtn[i].on('touchstart', scaleUp);
        list_sprPopupShopBtn[i].on('mouseout', restoreScale);
        list_sprPopupShopBtn[i].on('touchend', restoreScale);
	}

    spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP],"StageSelect/btn_pink_large.png",iCenterSizeX, iCenterSizeY + 400, 0.5,0.5, 30,30, 0,0, 248,126);
    spr.on('click', function () {
		SESoundPlay(SE_CLICK);
		ShowPopup(false);
    });
    spr.on('tap', function () {
        SESoundPlay(SE_CLICK);
        ShowPopup(false);
    });
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);

    spr.interactive = true;
	FontLoad(spr,GetString("ok"),0,-10, 0.5,0.5,
        {font:'50px ' + tbTTF[lang], fill:'#ffffff' , align:'center',
			stroke:'#7d0000', strokeThickness:5});

    // if(servicePos==1){
    // 	// 야후 mcoin 표시
		// for(var i=0,imax = list_sprPopupShopBtn.length; i<imax; ++i){
    //         spr = SpriteLoad(txtPopupShopContentsInBtn[i],"MGM_gold.png",-(txtPopupShopContentsInBtn[i].width/2) -25,0);
    //         spr.scale.set(0.7);
		// }
    // }

    sPopupBase.addChild(sPopupFrame[POPUP_TYPE.GAME_HEART_SHOP]);

	// 팝업 프레임 구매 컨펌 골드, 하트
    sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP] = new PIXI.Container();
	SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP],"Popup/popup.png", iCenterSizeX, iCenterSizeY, 0.5,0.5, 55,55, 65,65, 581,429);
	spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP],"Popup/Shop/list_2.png", iCenterSizeX,iCenterSizeY - 100, 0.5,0.5, 30,30, 35,35, 363,150);
	sprPopupShopConfirm = SpriteLoad(spr,"Popup/Shop/gold_no_1.png", 0,-5);
	txtPopupShopConfirm = new PIXI.extras.BitmapText("x50", { font:ShopNumTTF, align:'right'});
    spr.addChild(txtPopupShopConfirm);
    txtPopupShopConfirm.position.set(160,-40);
    txtPopupShopConfirmContent = FontLoad(sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP],GetString("heart") + GetString("shop_get",5), iCenterSizeX,iCenterSizeY + 10, 0.5,0.5,
		{font:'30px ' + tbTTF[lang], fill:'#ffffff',
		stroke:'#59493f', strokeThickness:5});
    spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP],"StageSelect/btn_pink_large.png", iCenterSizeX, iCenterSizeY + 110, 0.5,0.5, 30,30, 0,0, 248,126);
    spr.on('click', function () {
        SESoundPlay(SE_CLICK);
        if(bIsHeartCharge)
            ShowPopup(true,POPUP_TYPE.GAME_HEART_SHOP);
        else
            ShowPopup(true,POPUP_TYPE.GAME_GOLD_SHOP);
    });
    spr.on('tap', function () {
        SESoundPlay(SE_CLICK);
        if(bIsHeartCharge)
            ShowPopup(true,POPUP_TYPE.GAME_HEART_SHOP);
        else
            ShowPopup(true,POPUP_TYPE.GAME_GOLD_SHOP);
    });
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    spr.interactive = true;
    FontLoad(spr,GetString("ok"), 0, -5, 0.5,0.5,
        {font:'50px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#7d0000', strokeThickness:5});
    sPopupBase.addChild(sPopupFrame[POPUP_TYPE.GAME_CONFIRM_HEART_SHOP]);

    // 팝업 프레임 [하트, 골드 충전 요구]
	sPopupFrame[POPUP_TYPE.GAME_CHARGE_HEART] = new PIXI.Container();
    SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_CHARGE_HEART],"Popup/popup.png",iCenterSizeX, iCenterSizeY + 25, 0.5,0.5, 55,55,65,65, 592,447);
    spr = SpriteSliceLoadNew(sPopupFrame[POPUP_TYPE.GAME_CHARGE_HEART],"Popup/title.png", iCenterSizeX, iCenterSizeY - 190, 0.5,0.5, 50,50, 55,55, 486,112);
    txtPopupChargeTitle = FontLoad(spr,GetString('charge'),0,-10, 0.5,0.5,
        {font:'60px ' + tbTTF[lang], fill:'#ffffff',
            stroke:'#82302f', strokeThickness:5});
    sPopupBase.addChild(sPopupFrame[POPUP_TYPE.GAME_CHARGE_HEART]);

    // 2016-12-28 Q-UP 기획 작업내역 있음 [게임 시작시 팝업 구성]
    // 팝업 스타트 구성.
	txtItemInfo = FontLoad(sPopupGameStart,GetString("shop006"),iCenterSizeX,iCenterSizeY - 20, 0.5,0.5,
		{font:'25px ' + tbTTF[lang], fill:'#fef6e7', align:'center',
			stroke:'#5a4a3d', strokeThickness:5});

	spr = SpriteLoad(sPopupGameStart,"StageSelect/start_item.png",iCenterSizeX -218,iCenterSizeY+ 170);

	spr2 = SpriteLoad(spr,"inGame/item_02.png",0,-70);
    spr2.interactive = true;
    spr2.on('mouseover',function () {txtItemInfo.text = GetString("shop003");});
    spr2.on('mouseout',function () {txtItemInfo.text = GetString("shop006");});
    spr2.on('click',function () {txtItemInfo.text = GetString("shop003");});
    spr2.on('tap',function () {txtItemInfo.text = GetString("shop003");});
    spr2.on('touchstart',scaleUp);
    spr2.on('mouseover',scaleUp);
    spr2.on('touchend',restoreScale);
    spr2.on('mouseout',restoreScale);
    spr2.on('click',restoreScale);

    FontLoad(spr,"+3", 30, -40,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f',strokeThickness:5},200);

    sprPopupItemBuy2btn_disable = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",0,84,0.5,0.5,25,25,0,0,142,108);
    sprPopupItemBuy2btn_disable.visible = false;
    sprPopupItemBuy2btn_disable.interactive = false;
    sprPopupItemBuy2btn_disable.on('click',function (){cbButtonItem1Buy(1);});
    sprPopupItemBuy2btn_disable.on('tap',function (){cbButtonItem1Buy(1);});

	sprPopupItemBuy2btn = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",0,84,0.5,0.5,25,25,0,0,142,108);
    sprPopupItemBuy2btn.interactive = true;
	sprPopupItemBuy2btn.on('click',function (){cbButtonItem1Buy(1);});
	sprPopupItemBuy2btn.on('tap',function (){cbButtonItem1Buy(1);});

    sprPopupItemBuy2btn.on('touchstart',scaleUp);
    sprPopupItemBuy2btn.on('mouseover',scaleUp);
    sprPopupItemBuy2btn.on('touchend',restoreScale);
    sprPopupItemBuy2btn.on('mouseout',restoreScale);

	txtItem2Ex = FontLoad(spr,"0",0,-8,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
			stroke:'#59493f',strokeThickness:3},200);
    sprCoinPopupItem[1] = SpriteLoad(sprPopupItemBuy2btn, "StageSelect/shop_gold.png", -30 , -10 ,0.5,0.5);
    txtPopupItemBuy2btn = FontLoad(sprCoinPopupItem[1], ITEM2_PAY.toString(), 50, 0, 0.5, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#fef6e7', align:"right",
            stroke:'#7d0000', strokeThickness:3,wordWrap:true, wordWrapWidth:200});

	spr = SpriteLoad(sPopupGameStart,"StageSelect/start_item.png",iCenterSizeX - 73,iCenterSizeY + 170);

	spr2 = SpriteLoad(spr,"inGame/item_03.png",0,-70);
    spr2.interactive = true;
    spr2.on('mouseover',function () {txtItemInfo.text = GetString("shop004");}) ;
    spr2.on('mouseout',function () {txtItemInfo.text = GetString("shop006");});
    spr2.on('click',function () {txtItemInfo.text = GetString("shop004");}) ;
    spr2.on('tap',function () {txtItemInfo.text = GetString("shop004");});
    spr2.on('touchstart',scaleUp);
    spr2.on('mouseover',scaleUp);
    spr2.on('tap',restoreScale);
    spr2.on('mouseout',restoreScale);
    spr2.on('click',restoreScale);

    FontLoad(spr,"+3", 30, -40,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f',strokeThickness:5},200);
	sprPopupItemBuy3btn = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",0,84,0.5,0.5,25,25,0,0,142,108);
	sprPopupItemBuy3btn.interactive = true;
	sprPopupItemBuy3btn.on('click',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(2)});
    sprPopupItemBuy3btn.on('tap',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(2)});
    sprPopupItemBuy3btn.on('touchstart',scaleUp);
    sprPopupItemBuy3btn.on('mouseover',scaleUp);
    sprPopupItemBuy3btn.on('touchend',restoreScale);
    sprPopupItemBuy3btn.on('mouseout',restoreScale);

    sprPopupItemBuy3btn_disable = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",0,84,0.5,0.5,25,25,0,0,142,108);
    sprPopupItemBuy3btn_disable.visible = false;
    sprPopupItemBuy3btn_disable.interactive = true;
    sprPopupItemBuy3btn_disable.on('click',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(2)});
    sprPopupItemBuy3btn_disable.on('tap',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(2)});

	txtItem3Ex = FontLoad(spr,"0",0,-8,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f',strokeThickness:3},200);
    sprCoinPopupItem[2] = SpriteLoad(sprPopupItemBuy3btn, "StageSelect/shop_gold.png",-30 , -10 ,0.5,0.5);
    txtPopupItemBuy3btn = FontLoad(sprCoinPopupItem[2], ITEM3_PAY.toString(), 50, 0, 0.5, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#fef6e7', align:"right",
            stroke:'#7d0000', strokeThickness:3,wordWrap:true, wordWrapWidth:200});


    spr = SpriteLoad(sPopupGameStart,"StageSelect/start_item.png",iCenterSizeX + 73,iCenterSizeY + 170);

    spr2 = SpriteLoad(spr,"inGame/item_04.png",0,-70);
    spr2.on('mouseover',function () {txtItemInfo.text = GetString("shop005");}) ;
    spr2.on('mouseout',function () {txtItemInfo.text = GetString("shop006");});
    spr2.on('click',function () {txtItemInfo.text = GetString("shop005");}) ;
    spr2.on('tap',function () {txtItemInfo.text = GetString("shop005");});
    spr2.on('touchstart',scaleUp);
    spr2.on('mouseover',scaleUp);
    spr2.on('touchend',restoreScale);
    spr2.on('mouseout',restoreScale);
    spr2.on('click',restoreScale);
    spr2.interactive = true;

    FontLoad(spr,"+3", 30, -40,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f',strokeThickness:5},200);
    sprPopupItemBuy4btn = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",0,84,0.5,0.5,25,25,0,0,142,108);
    sprPopupItemBuy4btn.interactive = true;
    sprPopupItemBuy4btn.on('click',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(3)});
    sprPopupItemBuy4btn.on('tap',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(3)});
    sprPopupItemBuy4btn.on('touchstart',scaleUp);
    sprPopupItemBuy4btn.on('mouseover',scaleUp);
    sprPopupItemBuy4btn.on('touchend',restoreScale);
    sprPopupItemBuy4btn.on('mouseout',restoreScale);

    sprPopupItemBuy4btn_disable = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",0,84,0.5,0.5,25,25,0,0,142,108);
    sprPopupItemBuy4btn_disable.visible = false;
    sprPopupItemBuy4btn_disable.interactive = true;
    sprPopupItemBuy4btn_disable.on('click',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(3)});
    sprPopupItemBuy4btn_disable.on('tap',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(3)});
    txtItem4Ex = FontLoad(spr,"0",0,-8,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f',strokeThickness:3},200);
    sprCoinPopupItem[3] = SpriteLoad(sprPopupItemBuy4btn, "StageSelect/shop_gold.png",-30 , -10 ,0.5,0.5);
    txtPopupItemBuy4btn = FontLoad(sprCoinPopupItem[3], ITEM4_PAY.toString(), 50, 0, 0.5, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#fef6e7', align:"right",
            stroke:'#7d0000', strokeThickness:3,wordWrap:true, wordWrapWidth:200});

    spr = SpriteLoad(sPopupGameStart,"StageSelect/start_item.png",iCenterSizeX + 218,iCenterSizeY + 170);

    spr2 = SpriteLoad(spr,"inGame/item_01.png",0,-70);
    spr2.on('mouseover',function () {txtItemInfo.text = GetString("shop002",ITEM1_USE_TIME_ADD);});
    spr2.on('mouseout',function () {txtItemInfo.text = GetString("shop006");});
    spr2.on('click',function () {txtItemInfo.text = GetString("shop002",ITEM1_USE_TIME_ADD);});
    spr2.on('tap',function () {txtItemInfo.text = GetString("shop002",ITEM1_USE_TIME_ADD);});
    spr2.on('touchstart',scaleUp);
    spr2.on('mouseover',scaleUp);
    spr2.on('touchend',restoreScale);
    spr2.on('mouseout',restoreScale);
    spr2.on('click',restoreScale);
    spr2.interactive = true;

    FontLoad(spr,"+3", 30, -40,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f',strokeThickness:5},200);

    sprPopupItemBuy1btn = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_1.png",0,84,0.5,0.5,25,25,0,0,142,108);
    sprPopupItemBuy1btn.interactive = true;
    sprPopupItemBuy1btn.on('click',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(0)});
    sprPopupItemBuy1btn.on('tap',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(0)});
    sprPopupItemBuy1btn.on('touchstart',scaleUp);
    sprPopupItemBuy1btn.on('mouseover',scaleUp);
    sprPopupItemBuy1btn.on('touchend',restoreScale);
    sprPopupItemBuy1btn.on('mouseout',restoreScale);

    sprPopupItemBuy1btn_disable = SpriteSliceLoadNew(spr,"Popup/Shop/btn_shop_3.png",0,84,0.5,0.5,25,25,0,0,142,108);
    sprPopupItemBuy1btn_disable.visible = false;
    sprPopupItemBuy1btn_disable.interactive = true;
    sprPopupItemBuy1btn_disable.on('click',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(0)});
    sprPopupItemBuy1btn_disable.on('tap',function cbButtonItem1BuyDelegate(){cbButtonItem1Buy(0)});

    txtItem1Ex = FontLoad(spr,"0",0,-8,0.5,0.5,
        {font:'30px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f',strokeThickness:3},200);
    sprCoinPopupItem[0] = SpriteLoad(sprPopupItemBuy1btn, "StageSelect/shop_gold.png", -30 , -10 ,0.5,0.5);
    txtPopupItemBuy1btn = FontLoad(sprCoinPopupItem[0], ITEM1_PAY.toString(), 50, 0, 0.5, 0.5,
        {font:'25px ' + tbTTF[lang], fill:'#fef6e7', align:"right",
            stroke:'#7d0000', strokeThickness:3,wordWrap:true, wordWrapWidth:200});

    sprGameStartBtnStart = SpriteSliceLoadNew(sPopupGameStart, "StageSelect/btn_pink_large.png", iCenterSizeX, iCenterSizeY + 404,0.5,0.5,30,30,0,0,248,126);
    sprGameStartBtnStart.interactive = true;
    sprGameStartBtnStart.on('click', cbButtonGameStart);
    sprGameStartBtnStart.on('tap', cbButtonGameStart);
    sprGameStartBtnStart.on('mouseover', scaleUp);
    sprGameStartBtnStart.on('touchstart', scaleUp);
    sprGameStartBtnStart.on('mouseout', restoreScale);
    sprGameStartBtnStart.on('touchend', restoreScale);

    // sprGameStartBtnBack = Button(sPopupGameStart,"StageSelect/btn_brown_large.png",iCenterSizeX - 144, iCenterSizeY + 404, cbButtonGameStartBack,'scaleUp',1.05,1.05, 0.5,0.5,true);
    sprGameStartBtnBack = SpriteSliceLoadNew(sPopupGameStart, "StageSelect/btn_brown_large.png", iCenterSizeX -144, iCenterSizeY + 404,0.5,0.5,30,30,0,0,248,126);
    sprGameStartBtnBack.interactive = true;
    sprGameStartBtnBack.on('click', cbButtonGameStartBack);
    sprGameStartBtnBack.on('tap', cbButtonGameStartBack);
    sprGameStartBtnBack.on('mouseover', scaleUp);
    sprGameStartBtnBack.on('touchstart', scaleUp);
    sprGameStartBtnBack.on('mouseout', restoreScale);
    sprGameStartBtnBack.on('touchend', restoreScale);

    txtGameStartBtnStart = FontLoad(sprGameStartBtnStart, GetString("start"), 0, -12, 0.5, 0.5,
        {font:'50px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#7d0000',strokeThickness:5,
			dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:4});
    FontLoad(sprGameStartBtnBack, GetString("back"), 0, -12, 0.5, 0.5,
        {font:'50px ' + tbTTF[lang], fill:'#ffffff',
            stroke:'#7d0000',strokeThickness:5,
			dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:4});

    sPopupGameStart.addChild(spine_heart_bomb);

    // stage.addChild(kMGMenu.main);

    InGameBackGround(Math.floor(Math.random() * 4) +1);

    var sprTop = SpriteLoad(sGame, "inGame/top.png", iCenterSizeX, 70,0.5,0.5); // 백그라운드 위쪽
    //SpriteLoad(sGame, tbLanguageImage[CURRENT_LANGUAGE][1], iCenterSizeX - 190, iCenterSizeY - 395);// 남은패 타이틀
    //SpriteLoad(sGame, tbLanguageImage[CURRENT_LANGUAGE][0], iCenterSizeX - 100, iCenterSizeY - 395);// 가능패 타이틀

    // 남은패 숫자 폰트.
    txtTotalPaeCnt = FontLoad(sprTop, "0", -241 , -43, 0.5, 0.5,
        {font:'30px ' + tbTTF[lang], fill:'#facd89', align:'center',
            stroke:'#59493f', strokeThickness:5,
            dropShadow:true,dropShadowColor:'#7a7c79', dropShadowDistance:2});

    // 가능패 숫자 폰트
    txtSelectPaeCnt = FontLoad(sprTop, "0", -257, 0, 0.5, 0.5,
        {font:'50px ' + tbTTF[lang], fill:'#ffff00', align:'center',
            stroke:'#59493f', strokeThickness:5,
            dropShadow:true,dropShadowColor:'#7a7c79', dropShadowDistance:2});

    // "가능패"
    FontLoad(sprTop,GetString("ablecard"), 99 - (sprTop.width / 2), 109 - (sprTop.height / 2) ,0.5,0.5,
        {font:'20px ' + tbTTF[lang], fill:'#fef6e7', align:'center',
            stroke:'#59493f', strokeThickness:5});

    // 일시정지
    sprPause = SpriteLoad(sprTop, "inGame/btn_pause.png", 300, -14);
    sprPause.interactive = true;
    sprPause.on('click', cbButtonPause);
    sprPause.on('tap', cbButtonPause);
    sprPause.on('mouseover', scaleUp);
    sprPause.on('touchstart', scaleUp);
    sprPause.on('mouseout', restoreScale);
    sprPause.on('touchend', restoreScale);

    var sprBot = SpriteLoad(sGame, "inGame/bottom.png", iCenterSizeX, 1280 - 50,0.5,0.5);// 백그라운드 아래쪽

    FontLoad(sprBot,GetString("item"),108 - (sprBot.width/2) , 61 - (sprBot.height/2),0.5,0.5,
        {font:'50px ' + tbTTF[lang], fill:'#facd89', align:'center',
            stroke:'#59493f', strokeThickness:5,
            dropShadow:true,dropShadowColor:'#7a7c79', dropShadowDistance:2});

    // time gage mask setting
    sprTimeGauge = SpriteLoad(sprTop, "inGame/time_gage.png", 93, 12);

    sprTimeGauge.interactive = true;
	//sprTimeGauge.on('click',TimeMinus10);

    sprGaugeMask = new PIXI.Graphics();
    sprTimeGauge.addChild(sprGaugeMask);

    sprGaugeMask.position.set(0,0);
    sprGaugeMask.lineStyle(0);
    sprTimeGauge.mask = sprGaugeMask;

    sprGaugeMask.clear();
    sprGaugeMask.beginFill(0x8bc5ff,0.4);
    sprGaugeMask.moveTo(-1 * (sprTimeGauge.width/2),sprTimeGauge.height/2);
    sprGaugeMask.lineTo(-1 * (sprTimeGauge.width/2), -1 * (sprTimeGauge.height/2));
    sprGaugeMask.lineTo(sprTimeGauge.width/2, -1 * (sprTimeGauge.height/2));
    sprGaugeMask.lineTo(sprTimeGauge.width/2, (sprTimeGauge.height/2));

    txtStage = FontLoad(sprTop, GetString('stage'), -44, -37, 0, 0.5,
        {font:'30px ' + tbTTF[lang], fill:'#fff799',
            stroke:'#59493f', strokeThickness:5});

    txtTime = FontLoad(sprTop, "0:00", -110, 12, 0.5, 0.5,
        {font:'32px ' + tbTTF[lang], fill:'#ffffff'
            , stroke:'#59493f', strokeThickness:5});

    // time stars
    sprInGameStars[2] = SpriteLoad(sprTop,"inGame/time_star_1.png",39,-10);
    sprInGameStars[1] = SpriteLoad(sprTop,"inGame/time_star_1.png",12,-10);
    sprInGameStars[0] = SpriteLoad(sprTop,"inGame/time_star_1.png",-34,-10);

    // time limite line
    SpriteLoad(sprInGameStars[2],"inGame/time_line.png",0,22);
    SpriteLoad(sprInGameStars[1],"inGame/time_line.png",0,22);


    sGame.interative = true;

    // 하단 아이템
    sprItem1 = SpriteLoad(sGame, "inGame/item_01.png", sprBot.x + 278, sprBot.y -42);
    sprItemBlock[0] = SpriteLoad(sGame, "inGame/item_01.png", sprBot.x + 278, sprBot.y -42);
    sprItemBlock[0].interactive = true;
    sprItemBlock[0].visible = false;
    sprItem1.interactive = true;
    sprItem1.on('click', cbButtonItem1);
    sprItem1.on('tap', cbButtonItem1);
    sprItem1.on('mouseover', scaleUp);
    sprItem1.on('touchstart', scaleUp);
    sprItem1.on('mouseout', restoreScale);
    sprItem1.on('touchend', restoreScale);

    sprItem2 = SpriteLoad(sGame, "inGame/item_02.png", sprBot.x -88, sprBot.y-42,0.5,0.5);
    sprItemBlock[1] = SpriteLoad(sGame, "inGame/item_02.png", sprBot.x -88, sprBot.y-42,0.5,0.5);
    sprItemBlock[1].interactive = true;
    sprItemBlock[1].visible = false;
    sprItem2.interactive = true;
    sprItem2.on('click', cbButtonItem2);
    sprItem2.on('tap', cbButtonItem2);
    sprItem2.on('mouseover', scaleUp);
    sprItem2.on('touchstart', scaleUp);
    sprItem2.on('mouseout', restoreScale);
    sprItem2.on('touchend', restoreScale);

    sprItem3 = SpriteLoad(sGame, "inGame/item_03.png", sprBot.x + 31, sprBot.y-42);
    sprItemBlock[2] = SpriteLoad(sGame, "inGame/item_03.png", sprBot.x + 31, sprBot.y-42);
    sprItemBlock[2].interactive = true;
    sprItemBlock[2].visible = false;
    sprItem3.interactive = true;
    sprItem3.on('click', cbButtonItem3);
    sprItem3.on('tap', cbButtonItem3);
    sprItem3.on('mouseover', scaleUp);
    sprItem3.on('touchstart', scaleUp);
    sprItem3.on('mouseout', restoreScale);
    sprItem3.on('touchend', restoreScale);

    sprItem4 = SpriteLoad(sGame, "inGame/item_04.png", sprBot.x + 155, sprBot.y -42);
    sprItemBlock[3] = SpriteLoad(sGame, "inGame/item_04.png", sprBot.x + 155, sprBot.y -42);
    sprItemBlock[3].interactive = true;
    sprItemBlock[3].visible = false;
    sprItem4.interactive = true;
    sprItem4.on('click', cbButtonItem4);
    sprItem4.on('tap', cbButtonItem4);
    sprItem4.on('mouseover', scaleUp);
    sprItem4.on('touchstart', scaleUp);
    sprItem4.on('mouseout', restoreScale);
    sprItem4.on('touchend', restoreScale);

    // 하단 아이템 숫자풍선
    //SpriteLoad(sprItem1, "item_box_balloon_01.png", 0, 50);
    //SpriteLoad(sprItem2, "item_box_balloon_02.png", 0, 50);
    //SpriteLoad(sprItem3, "item_box_balloon_03.png", 0, 50);
    //SpriteLoad(sprItem4, "item_box_balloon_04.png", 0, 50);

    // 하단 아이템 숫자폰트
    txtItem1 = FontLoad(sprItem1, "0", 0, 62, 0.5, 0.5,
        {font:'32px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f', strokeThickness:5});
    txtItem2 = FontLoad(sprItem2, "0", 0, 62, 0.5, 0.5,
        {font:'32px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f', strokeThickness:5});
    txtItem3 = FontLoad(sprItem3, "0", 0, 62, 0.5, 0.5,
        {font:'32px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f', strokeThickness:5});
    txtItem4 = FontLoad(sprItem4, "0", 0, 62, 0.5, 0.5,
        {font:'32px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#59493f', strokeThickness:5});

    sGameEffect.addChild(graphicsLine); // 그래픽을 블럭보다 밑으로 둔다.

    var number = 0;

    for(var y=0;y<BLOCK_HEIGHT;++y)
    {
        for(var x=0;x<BLOCK_WIDTH;++x)
        {
            var sprite = SpritePool.getInstance().get(blockImgGame[tbBlock[y][x]]);

            if(tbBlock[y][x] == 1)
                sprite.texture = SpritePool.getInstance().get(blockImgGame[number]);

            if(number < 64)
                number++;

            sprite.yy = y;
            sprite.xx = x;
            sprite.type = tbBlock[y][x];

            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            // 짝수일경우..좌표보정..
            // 홀수일경우  + (block.sprite.width/2) 이부분이 빠진다.
            sprite.position.x = iCenterSizeX + (BLOCK_SIZE_X/2) - (BLOCK_WIDTH/2*BLOCK_SIZE_X) + (x*BLOCK_SIZE_X);
            sprite.position.y = iCenterSizeY + 0 + (BLOCK_SIZE_Y/2) - (BLOCK_HEIGHT/2*BLOCK_SIZE_Y) + (y*BLOCK_SIZE_Y);
            sprite.interactive = true;
            sprite.on('click', cbButtonBlock);
            sprite.on('tap', cbButtonBlock);
            sprBlock[y][x] = sprite;
            if((y == 0 || y == BLOCK_HEIGHT - 1 || x == 0 || x == BLOCK_WIDTH - 1) == false)
                sGame.addChild(sprBlock[y][x]);
            else
                sprBlock[y][x].visible = false;
        }
    }

    sGameEffect.addChild(spine_select_blocks[0]);
    sGameEffect.addChild(spine_select_blocks[1]);

    // turn block ani
    var frameClose = [];
    var frameOpen = [];
    for(var i=1,imax=7;i<imax;++i){
        if(i < 4)
            frameClose.push(new PIXI.Texture.fromFrame("TurnBlock/block_ani_0" + i + ".png"));
        else
            frameOpen.push(new PIXI.Texture.fromFrame("TurnBlock/block_ani_0" + i + ".png"));
    }

    for(var y=0;y<BLOCK_HEIGHT;++y) {
        for (var x = 0; x < BLOCK_WIDTH; ++x) {
            turnBlockClose[y][x] = new PIXI.extras.MovieClip(frameClose);
            turnBlockClose[y][x].anchor.set(0.5);
            turnBlockClose[y][x].scale.set(1);
            turnBlockClose[y][x].animationSpeed = 0.4;
            turnBlockClose[y][x].loop = false;
            turnBlockClose[y][x].visible = false;
            sGame.addChild(turnBlockClose[y][x]);

            turnBlockOpen[y][x] = new PIXI.extras.MovieClip(frameOpen);
            turnBlockOpen[y][x].anchor.set(0.5);
            turnBlockOpen[y][x].scale.set(1);
            turnBlockOpen[y][x].animationSpeed = 0.4;
            turnBlockOpen[y][x].loop = false;
            turnBlockOpen[y][x].visible = false;
            sGame.addChild(turnBlockOpen[y][x]);
        }
    }

    for(var i=0,imax=BLOCK_HEIGHT*2;i<imax;++i){
        sprLineVertical[i] = SpriteLoad(sGameEffect,"inGame/line_normal_3.png",iCenterSizeX,iCenterSizeY);
        sprLineVertical_Combo[i] = SpriteLoad(sGameEffect,"inGame/line_combo_3.png",iCenterSizeX,iCenterSizeY);

        sprLineVertical[i].visible = false;
        sprLineVertical_Combo[i].visible = false;
    }

    for(var i=0,imax=BLOCK_WIDTH*2;i<imax;++i){
        sprLineHorizontal[i] = SpriteLoad(sGameEffect,"inGame/line_normal_2.png",iCenterSizeX,iCenterSizeY);
        sprLineHorizontal_Combo[i] = SpriteLoad(sGameEffect,"inGame/line_combo_2.png",iCenterSizeX,iCenterSizeY);

        sprLineHorizontal[i].visible = false;
        sprLineHorizontal_Combo[i].visible = false;
    }

    for(var i=0,imax=4;i<imax;++i){
        sprLineAnchor[i] = SpriteLoad(sGameEffect,"inGame/line_normal_1.png",iCenterSizeX,iCenterSizeY);
        sprLineAnchor_Combo[i] = SpriteLoad(sGameEffect,"inGame/line_combo_1.png",iCenterSizeX,iCenterSizeY);

        sprLineAnchor[i].visible = false;
        sprLineAnchor_Combo[i].visible = false;
    }

    sGameEffect.addChild(spine_hint_blocks[0]);
    sGameEffect.addChild(spine_hint_blocks[1]);

    sGameEffect.addChild(spine_time_eff);
    spine_time_eff.position.x = iCenterSizeX - 100;
    spine_time_eff.position.y = iCenterSizeY - 550;
    sGameEffect.addChild(spine_item_use_eff);

    for(var spine_eff_i=0,spine_eff_imax = spine_bomb_eff.length;spine_eff_i< spine_eff_imax;++spine_eff_i)
        sGameEffect.addChild(spine_bomb_eff[spine_eff_i]);

    for(var i=0,imax= spine_blockBomb.length;i<imax;++i)
        sGameEffect.addChild(spine_blockBomb[i]);

    sGameEffect.addChild(spine_full_combo);
    sGameEffect.addChild(spine_etc_message);

    spine_etc_message.position.x = iCenterSizeX;
    spine_etc_message.position.y = iCenterSizeY;

    sGameEffect.addChild(spine_combo_ani_big);

	spr = SpriteSliceLoadNew(sPopupGameClear,"Popup/result_bg.png",iCenterSizeX, iCenterSizeY +10,0.5,0.5,20,20,0,0,568,70);
	FontLoad(spr, GetString('reward'), -240, 0, 0, 0.5,
		{font:'40px ' + tbTTF[lang],fill:'#ffffff', align:'left',
			stroke:'#59493f',strokeThickness:4});
    txtResultReward = FontLoad(spr, "0", 240, 0, 1, 0.5,
        {font:'42px ' + tbTTF[lang], fill:'#ffffff', align:'right',
			stoke:'#59493f', strokeThickness:3});
    SpriteLoad(spr,"Popup/result_gold.png", 87,0);

    spr = SpriteSliceLoadNew(sPopupGameClear,"Popup/result_bg.png",iCenterSizeX,iCenterSizeY + 120,0.5,0.5,20,20,0,0,568,70);
    FontLoad(spr,GetString('record'),-240,0, 0, 0.5,
        {font:'40px ' + tbTTF[lang],fill:'#ffffff', align:'left',
            stroke:'#59493f',strokeThickness:4});
    txtResultRecord = FontLoad(spr, "0:00", 240, 0, 1, 0.5,
        {font:'42px ' + tbTTF[lang], fill:'#ffffff', align:'right',
            stoke:'#59493f', strokeThickness:3});

    spr = SpriteSliceLoadNew(sPopupGameClear,"Popup/result_bg.png",iCenterSizeX, iCenterSizeY + 230,0.5,0.5,20,20,0,0,568,70);
    FontLoad(spr, GetString('bonus'),-240,0, 0, 0.5,
        {font:'40px ' + tbTTF[lang],fill:'#ffffff', align:'left',
            stroke:'#59493f',strokeThickness:4});
    txtResultBonus = FontLoad(spr, "0", 240, 0, 1, 0.5,
        {font:'42px ' + tbTTF[lang], fill:'#ffffff', align:'right',
            stoke:'#59493f', strokeThickness:3});
    SpriteLoad(spr,"Popup/result_gold.png", 87,0);

    var sprData = SpriteLoad(sPopupGameClear,"Popup/btn_start_replay.png", iCenterSizeX - 205, iCenterSizeY + 400, 0.5, 0.5);
    sprData.interactive = true;
    sprData.on('click', PopupPauseReplay);
    sprData.on('tap', PopupPauseReplay);
    sprData.on('mouseover', scaleUp);
    sprData.on('touchstart', scaleUp);
    sprData.on('mouseout', restoreScale);
    sprData.on('touchend', restoreScale);

    sprData = SpriteSliceLoadNew(sPopupGameClear,"StageSelect/btn_pink_large.png",iCenterSizeX ,iCenterSizeY + 405, 0.5, 0.5,30,30,0,0,248,126);
    sprData.interactive = true;
    sprData.on('click',ButtonShowStageSelect);
    sprData.on('tap',ButtonShowStageSelect);
    sprData.on('mouseover', scaleUp);
    sprData.on('touchstart', scaleUp);
    sprData.on('mouseout', restoreScale);
    sprData.on('touchend', restoreScale);

    FontLoad(sprData, GetString("ok"), 0, -10, 0.5, 0.5,
        {font:'65px ' + tbTTF[lang], fill:'#ffffff',align:'center',
			stroke:'#7d0000',strokeThickness:5,
			dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:2},180);

    sprData = SpriteLoad(sPopupGameClear,"Popup/btn_start_next.png",iCenterSizeX + 205 ,iCenterSizeY + 400, 0.5, 0.5);
    sprData.interactive = true;
    sprData.on('click',cbButtonNextStage);
    sprData.on('tap',cbButtonNextStage);
    sprData.on('mouseover', scaleUp);
    sprData.on('touchstart', scaleUp);
    sprData.on('mouseout', restoreScale);
    sprData.on('touchend', restoreScale);

    // 팝업 Fail구성.
	spr = SpriteLoad(sPopupGameFail, "Popup/btn_fail_replay.png", iCenterSizeX - 141, iCenterSizeY + 228);
    spr.interactive = true;
    spr.on('click', PopupPauseReplay);
    spr.on('tap', PopupPauseReplay);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);

    spr = SpriteSliceLoadNew(sPopupGameFail, "StageSelect/btn_pink_large.png", iCenterSizeX + 84, iCenterSizeY + 228, 0.5,0.5, 30,30,0,0,248,126);
    spr.interactive = true;
    spr.on('click', ButtonShowStageSelect);
    spr.on('tap', ButtonShowStageSelect);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr, GetString("ok"), 0, -5, 0.5, 0.5,
        {font:'63px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#75330F', strokeThickness:7});

    // 팝업 Pause 구성
    SpriteSliceLoadNew(sPopupPause,"Popup/popup_subject.png",iCenterSizeX,iCenterSizeY + 46, 0.5,0.5, 35,35, 35,35, 528,322);
    spr = SpriteLoad(sPopupPause,"Popup/btn_set_play.png",iCenterSizeX - 156,iCenterSizeY - 26);
    spr.interactive = true;
    spr.on('click', cbButtonPauseContinue);
    spr.on('tap', cbButtonPauseContinue);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);

    spr = SpriteLoad(sPopupPause, "Popup/btn_set_replay.png", iCenterSizeX, iCenterSizeY - 26);
    spr.interactive = true;
    spr.on('click', cbButtonPauseReplayYES);
    spr.on('tap', cbButtonPauseReplayYES);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);

    spr = SpriteLoad(sPopupPause, "Popup/btn_set_home.png", iCenterSizeX + 156, iCenterSizeY - 26);
    spr.interactive = true;
    spr.on('click', ShowPopupExit);
    spr.on('tap', ShowPopupExit);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);

    spr = SpriteLoad(sPopupPause, "Popup/btn_set_tutorial.png", iCenterSizeX - 77, iCenterSizeY + 129);
    spr.interactive = true;
    spr.on('click', cbButtonTutorial);
    spr.on('tap', cbButtonTutorial);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);

    sprSoundBGM = SpriteLoad(sPopupPause, "Popup/btn_set_sound.png", iCenterSizeX + 78, iCenterSizeY + 129);
    sprSoundBGM.interactive = true;
    sprSoundBGM.on('click', cbButtonSoundBGM);
    sprSoundBGM.on('tap', cbButtonSoundBGM);
    sprSoundBGM.on('mouseover', scaleUp);
    sprSoundBGM.on('touchstart', scaleUp);
    sprSoundBGM.on('mouseout', restoreScale);
    sprSoundBGM.on('touchend', restoreScale);

    SetSoundIcon();

    SpriteSliceLoadNew(sPopupReplay, "Popup/popup_subject.png", iCenterSizeX, iCenterSizeY - 19, 0.5,0.5, 35,35, 35,35, 528,221);
    FontLoad(sPopupReplay, GetString("popupreplay"), iCenterSizeX, iCenterSizeY - 20, 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff', align:'center',
            stroke:'#7d0000', strokeThickness:5});

    spr = SpriteSliceLoadNew(sPopupReplay, "StageSelect/btn_brown_large.png", iCenterSizeX - 132, iCenterSizeY + 162, 0.5,0.5, 30,30,0,0, 248,116);
    spr.interactive = true;
    spr.on('click', function () {
		SESoundPlay(SE_CLICK);
		ShowPopup(true,POPUP_TYPE.GAME_SETTING);
    });
    spr.on('tap', function () {
        SESoundPlay(SE_CLICK);
        ShowPopup(true,POPUP_TYPE.GAME_SETTING);
    });
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr, GetString("no"), 0, 0, 0.5, 0.5,
        {font:'34px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#7d0000',strokeThickness:5,
            dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:3});

    spr = SpriteSliceLoadNew(sPopupReplay, "StageSelect/btn_pink_large.png", iCenterSizeX + 132, iCenterSizeY + 162, 0.5,0.5, 30,30,0,0, 248,116);
    spr.interactive = true;
    spr.on('click',PopupPauseReplay);
    spr.on('tap',PopupPauseReplay);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr, GetString("yes"), 0, 0, 0.5, 0.5,
        {font:'34px ' + tbTTF[lang], fill:'#ffffff',
            stroke:'#7d0000',strokeThickness:5,
            dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:3});

    // 그만하기 팝업창 구성
    SpriteSliceLoadNew(sPopupExit, "Popup/popup_subject.png", iCenterSizeX, iCenterSizeY - 19, 0.5,0.5, 35,35, 35,35, 528,221);
    FontLoad(sPopupExit, GetString("popupgiveup"), iCenterSizeX, iCenterSizeY -20 , 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff', align:'center',
			stroke:'#7d0000', strokeThickness:5});

    spr = SpriteSliceLoadNew(sPopupExit, "StageSelect/btn_brown_large.png", iCenterSizeX - 132, iCenterSizeY + 162, 0.5,0.5, 30,30,0,0, 248,116);
    spr.interactive = true;
    spr.on('click', cbButtonPauseReplayNO);
    spr.on('tap', cbButtonPauseReplayNO);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr, GetString("no"), 0, 0, 0.5, 0.5,
        {font:'34px ' + tbTTF[lang],fill:'#ffffff',
			stroke:'#7d0000',strokeThickness:5,
			dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:3});

    spr = SpriteSliceLoadNew(sPopupExit, "StageSelect/btn_pink_large.png", iCenterSizeX + 132, iCenterSizeY + 162, 0.5,0.5, 30,30,0,0, 248,116);
    spr.interactive = true;
    spr.on('click',ButtonPauseExitYes);
    spr.on('tap',ButtonPauseExitYes);
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr, GetString("yes"), 0, 0, 0.5, 0.5,
        {font:'34px ' + tbTTF[lang], fill:'#ffffff',
            stroke:'#7d0000',strokeThickness:5,
            dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:3});

	// 튜토리얼 셋팅.
    spr = SpriteLoad(sPopupTutorial,"Popup/tutorial.png",iCenterSizeX, iCenterSizeY);
    spr.interactive = true;
    spr.on('click', cbButtonTutorialBack);
    spr.on('tap', cbButtonTutorialBack);

	FontLoad(sPopupTutorial,GetString('tutorial'),iCenterSizeX, iCenterSizeY - 590, 0.5,0.5,
		{font:'50px ' + tbTTF[lang],fill:'#fff45c',
			stroke:'#7f2d00',strokeThickness:5});

	spr = SpriteLoad(sPopupTutorial, "Popup/btn_close.png", iCenterSizeX + 295, iCenterSizeY - 580);
	spr.interactive = true;
	spr.on('click', cbButtonTutorialBack);
	spr.on('tap', cbButtonTutorialBack);
	spr.on('mouseover', scaleUp);
	spr.on('touchstart', scaleUp);
	spr.on('mouseout', restoreScale);
	spr.on('touchend', restoreScale);

//	lang = 'ja';
	FontLoad(sPopupTutorial, GetString("tutorial000"), iCenterSizeX - 175, iCenterSizeY - 22, 0.5, 0.5,
		{font:'22px ' + tbTTF[lang], fill:'#fef6e7', fontStyle:'bold', align:'center',
			stroke:'#5a4a3d', strokeThickness:1, wordWrap:true, wordWrapWidth:285},285);
	FontLoad(sPopupTutorial, GetString("tutorial001"), iCenterSizeX + 175, iCenterSizeY - 22, 0.5, 0.5,
        {font:'22px ' + tbTTF[lang], fill:'#fef6e7', fontStyle:'bold', align:'center',
            stroke:'#5a4a3d', strokeThickness:1, wordWrap:true, wordWrapWidth:285},285);
	FontLoad(sPopupTutorial, GetString("tutorial002"), iCenterSizeX - 175, iCenterSizeY + 515, 0.5, 0.5,
        {font:'22px ' + tbTTF[lang], fill:'#fef6e7', fontStyle:'bold', align:'center',
            stroke:'#5a4a3d', strokeThickness:1, wordWrap:true, wordWrapWidth:285},285);
	FontLoad(sPopupTutorial, GetString("tutorial003"), iCenterSizeX + 175, iCenterSizeY + 515, 0.5, 0.5,
        {font:'22px ' + tbTTF[lang], fill:'#fef6e7', fontStyle:'bold', align:'center',
            stroke:'#5a4a3d', strokeThickness:1, wordWrap:true, wordWrapWidth:285},285);


	// 팝업 충전 권유
    SpriteSliceLoadNew(sPopupCharge, "Popup/popup_subject.png", iCenterSizeX, iCenterSizeY - 19, 0.5,0.5, 35,35, 35,35, 528,221);
    sprPopupCharge = SpriteLoad(sPopupCharge,"Popup/heart.png",iCenterSizeX + 3, iCenterSizeY - 51);
    txtPopupChargeMsg = FontLoad(sPopupCharge, GetString("charge_heart"), iCenterSizeX, iCenterSizeY +38 , 0.5,0.5,
        {font:'30px ' + tbTTF[lang], fill:'#ffffff', align:'center',
            stroke:'#7d0000', strokeThickness:5});

    spr = SpriteSliceLoadNew(sPopupCharge, "StageSelect/btn_brown_large.png", iCenterSizeX - 132, iCenterSizeY + 162, 0.5,0.5, 30,30,0,0, 248,116);
    spr.interactive = true;
    spr.on('click', function () {
    	SESoundPlay(SE_CLICK);
		ShowPopup(true,POPUP_TYPE.GAME_START);
    });
    spr.on('tap', function () {
        SESoundPlay(SE_CLICK);
        ShowPopup(true,POPUP_TYPE.GAME_START);
    });
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr, GetString("no"), 0, 0, 0.5, 0.5,
        {font:'34px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#7d0000',strokeThickness:5,
            dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:3});

    spr = SpriteSliceLoadNew(sPopupCharge, "StageSelect/btn_pink_large.png", iCenterSizeX + 132, iCenterSizeY + 162, 0.5,0.5, 30,30,0,0, 248,116);
    spr.interactive = true;
    spr.on('click', function () {
        SESoundPlay(SE_CLICK);
    	if(bIsHeartCharge){
            ShowPopup(true,POPUP_TYPE.GAME_HEART_SHOP);
		}
    	else{
            ShowPopup(true,POPUP_TYPE.GAME_GOLD_SHOP);
		}
    });
    spr.on('tap', function () {
        SESoundPlay(SE_CLICK);
        if(bIsHeartCharge){
            ShowPopup(true,POPUP_TYPE.GAME_HEART_SHOP);
        }
        else{
            ShowPopup(true,POPUP_TYPE.GAME_GOLD_SHOP);
        }
    });
    spr.on('mouseover', scaleUp);
    spr.on('touchstart', scaleUp);
    spr.on('mouseout', restoreScale);
    spr.on('touchend', restoreScale);
    FontLoad(spr, GetString("yes"), 0, 0, 0.5, 0.5,
        {font:'34px ' + tbTTF[lang],fill:'#ffffff',
            stroke:'#7d0000',strokeThickness:5,
            dropShadow:true, dropShadowColor:'#7d0000', dropShadowDistance:3});

    for(var i=0;i<10;++i){
    	txtComboCount[i] = new PIXI.extras.BitmapText("0",{font:ComboNumTTF, align:'center'});
    	txtComboCount[i].position.set(0,0);
        txtCombo[i] = FontLoad(txtComboCount[i],GetString('combo'),20,100, 0.5,0.5,
			{font:'30px ' + tbTTF[lang],fill:'#ffff00', align:'center',
				stroke:'#59493f', strokeThickness:7});

        txtComboCount[i].visible = false;
        comboFontTime[i] = 0;
        //spine_combo_ani_mini[i].addChild(txtComboCount[i]);
        sGameEffect.addChild(spine_combo_ani_mini[i]);
        sGameEffect.addChild(txtComboCount[i]);
    }

    stage.addChild(sGameEffect);
    stage.addChild(sPopupBase);
    stage.addChild(sPopupHeartAD);

    sPopupBase.addChild(sPopupGameStart);
    sPopupBase.addChild(sPopupGameClear);
    sPopupBase.addChild(sPopupGameFail);
    sPopupBase.addChild(sPopupPause);
    sPopupBase.addChild(sPopupSound);
    sPopupBase.addChild(sPopupExit);
    sPopupBase.addChild(sPopupTutorial);
    sPopupBase.addChild(sPopupReplay);
    sPopupBase.addChild(sPopupCharge);

    sPopupBase.visible = false;

    if(yahooIN != undefined || bMGCHEAT == true){
		stage.addChild(kMGMenu.main);
		kMGMenu.main.interactive = true;
    }

	// 네트워크에서 데이터 받을때 까지 버튼 막는 용도. (ping-pong loading)
	spr = PIXIGraphics(sNetworkLoading, 0x000000, 0.5, 0,0,iMaxSizeX,iMaxSizeY);
    spr.interactive = true;
    //spr.cbNum = 10;
    //spr.on('click',cbButtonWhite);
    //spr.on('tep',cbButtonWhite);
    //spr.on('mousedown', cbButtonWhite);
    //spr.on('touchstart', cbButtonWhite);
    //spr.on('mouseup', cbButtonWhite);
    //spr.on('touchend', cbButtonWhite);
}

function cbButtonTutorialBack()
{
	if(kData.bFirst){
        spine_etc_message.visible= true;
        SpinePlay(spine_etc_message,null,null,'ready_go',1,false);

        b_timeStop = false;
        kData.bFirst = false;
		networkManager.ForcedSaveData();

        SESoundPlay(SE_CLICK);
        ShowPopup(false);
	}else{
        SESoundPlay(SE_CLICK);
        ShowPopup(true,POPUP_TYPE.GAME_SETTING);
	}
}

function cbButtonShop()
{
    SESoundPlay(SE_CLICK);
    renderer.backgroundColor = 0x3576b8; // 백그라운드 컬러를 변경한다.
    updateItemFont();
	sPopupHeartAD.visible = true;
	sStageSelect.visible = false;
}

function cbButtonTutorial()
{
	SESoundPlay(SE_CLICK);
	ShowPopup(true,POPUP_TYPE.GAME_TUTORIAL);
}

function cbButtonStageClick(s){
	if(bStageSelectTouch == false && fTimeDelay < 1.2) return;
	bStageSelectTouch = true;

    CheckItemEnableToBuy();

	if((s + (iPage * PAGE_CHILD_CNT)) < kData.clearStage.length)
	{
		SESoundPlay(SE_CLICK);
		iStage = s + (iPage * PAGE_CHILD_CNT);
		// 255 스테이지 고정
		// iStage = 254;

		for(var i=0,imax=sprStageSelectedStars.length;i<imax;++i){
			if(i < kData.clearStage[iStage])
                sprStageSelectedStars[i].visible = true;
			else
            	sprStageSelectedStars[i].visible = false;
		}

		if(kData.clearFullCombStage[iStage] >= 1)
			sprStageSelectFullCombo.visible = true;
		else
            sprStageSelectFullCombo.visible = false;

		ShowPopup(true,POPUP_TYPE.GAME_START);
		state = STATE_GAME;
		gameState = STATE_GAME_INIT;
	}
	else
		SESoundPlay(SE_CLICK_BAD);
}

function cbButtonArrowLeft()
{
	if(bStageSelectTouch == false && fTimeDelay < 1.2) return;
	bStageSelectTouch = true;

	SESoundPlay(SE_CLICK_PAGE);
	--iPage;
	ShowStageSelect();
}

function cbButtonArrowRight()
{
	if(bStageSelectTouch == false && fTimeDelay < 1.2) return;
	bStageSelectTouch = true;

    SESoundPlay(SE_CLICK_PAGE);
	++iPage;
	ShowStageSelect();
}

function ShowArrow()
{
	sprArrowLeft.visible = true;
	sprArrowRight.visible = true;
	
	if(iPage == 0)
		sprArrowLeft.visible = false;
	if(iPage >= Math.floor((kData.clearStage.length-1) / PAGE_CHILD_CNT))
		sprArrowRight.visible = false;
}

function ShowStageSelect()
{
	ShowArrow();
    // BGMSoundPlay(BGM_BG_Main);
	sStageSelect.visible = true;
	coinLifeView.show(0);

	if(spine_etc_message.visible)
		spine_etc_message.visible = false;

	if(spine_combo_ani_big.visible)
		spine_combo_ani_big.visible = false;

    for(var i=0,imax = spine_hint_blocks.length;i<imax;++i)
        spine_hint_blocks[i].visible = false;

    for(var i=0,imax= 4;i<imax;++i)
        sprItemBlock[i].visible = false;

    spine_clear.visible = false;
    for(var i=0,imax=spine_clear_stars.length;i<imax;++i)
        spine_clear_stars[i].visible =false;

	var si = iPage*PAGE_CHILD_CNT;
	// 스테이지 셋팅 관련 처리..
	for(var i=si;i<si+PAGE_CHILD_CNT;++i)
	{
		if(i < kData.clearStage.length)
		{
			if(kData.clearStage[i] == -1)
			{
				bStageSelectTouch = false;
				fTimeDelay = 0;
			}
			sprStage[i%PAGE_CHILD_CNT].Show(i, kData.clearStage[i]);
		}
		else
			sprStage[i%PAGE_CHILD_CNT].Show(-1, -1);
	}

    iPageMax = Math.floor(((kData.clearStage.length-1) / sprStage.length) +1);
    txtPageInfo.text = (iPage+1) + " / " + iPageMax;
}

function HideStageSelect()
{
	sStageSelect.visible = false;
}

function TimeMinus10() {
	if(gameState != STATE_GAME_PLAY) return;
	fPlayTime -= 10;
}

/// _b_open == false :: 패 뒤집기
/// _b_open == true:: 패 열기
/// _no_anim -> 에니메이션 동작 여부

var fTurnBlockTime = 0;
var fTurnBlockTImeMax = 0.02;
var iTurnBlockCompCnt = 0;
var bTurnBlockOnceCall = false;
var iBlock_LockCnt = -1;

function TurnBlock(_b_open,_b_anim) {
	if(_b_anim === undefined) _b_anim = false;

	fTurnBlockTime += deltaTime;

	if(!_b_anim){
        for(var checkeri =0,checkeriMax = 30; checkeri< checkeriMax;++checkeri) {
            for (var y = 0, yMax = sprBlock.length; y < yMax; ++y) {
                for (var x = 0, xMax = sprBlock[y].length; x < xMax; ++x) {
                	if(_b_open) {
                        if(sprBlock[y][x].type >= 9){
                            sprBlock[y][x].alpha = 1;
                            sprBlock[y][x].texture = PIXI.Texture.fromImage("block/block_" + (sprBlock[y][x].type+1) + ".png");
                        }
                        else{
                            sprBlock[y][x].alpha = 1;
                            sprBlock[y][x].texture = PIXI.Texture.fromImage("block/block_0" + (sprBlock[y][x].type+1) + ".png");
                        }
                    }else{
                        sprBlock[y][x].texture = PIXI.Texture.fromImage("block/block_65.png");
					}
                }
            }
        }
	}
	else{
        for(var checkeri =0,checkeriMax = 30; checkeri< checkeriMax;++checkeri){
            for(var y = 0, yMax = sprBlock.length; y<yMax; ++y)
                for(var x =0, xMax = sprBlock[y].length; x<xMax; ++x){
                    if(!sprBlock[y][x].interactive && sprBlock[y][x].visible && y+x == checkeri && fTurnBlockTime >= fTurnBlockTImeMax * checkeri){
                        if(_b_open === undefined || _b_open == true && sprBlock[y][x].type != BLOCK_LOCK){
                            iTurnBlockCompCnt++;

						 	if(iTurnBlockCompCnt >= (iTotalPaeCnt)){
                                turnBlockOpen[y][x].onComplete = function () {
                                    if(this.children[0] !== undefined){
                                        this.children[0].alpha = 1;
                                        sGame.addChild(this.children[0]);
                                    }
                                    this.visible = false;

                                    for(var newy=0;newy<BLOCK_HEIGHT;++newy)
                                        for(var newx=0;newx<BLOCK_WIDTH;++newx)
                                            if((newy == 0 || newy == BLOCK_HEIGHT - 1 || newx == 0 || newx == BLOCK_WIDTH - 1) == false){
                                                sGame.addChild(sprBlock[newy][newx]);
                                                if(tbBlock[newy][newx] >= 0 && sprBlock[newy][newx].interactive)
                                                    sprBlock[newy][newx].alpha = 1;
											}


                                    bTurnBlockOnceCall = false;
                                    gameState = STATE_GAME_PLAY;
                                };
							}else{
                                turnBlockOpen[y][x].onComplete = function () {
                                	 if(this.children[0] !== undefined){
                                         this.children[0].alpha = 1;
                                         sGame.addChild(this.children[0]);
									 }
                                    this.visible = false;
                                };
							}

							turnBlockOpen[y][x].position.set(sprBlock[y][x].x,sprBlock[y][x].y);
							turnBlockOpen[y][x].visible = true;
							turnBlockOpen[y][x].play();
							turnBlockOpen[y][x].addChild(sprBlock[y][x]);


                            if(sprBlock[y][x].type >= 9){
                                sprBlock[y][x].alpha = 0;
                                sprBlock[y][x].texture = PIXI.Texture.fromImage("block/block_" + (sprBlock[y][x].type+1) + ".png");
							}
                            else{
                                sprBlock[y][x].alpha = 0;
                                sprBlock[y][x].texture = PIXI.Texture.fromImage("block/block_0" + (sprBlock[y][x].type+1) + ".png");
							}

                            sprBlock[y][x].interactive = true;
                        }
                        else if(_b_open == false && sprBlock[y][x].type != BLOCK_LOCK){
                            iTurnBlockCompCnt++;

                            if(iTurnBlockCompCnt >= (iTotalPaeCnt)){
                                turnBlockClose[y][x].onComplete = function () {
                                    DoMixBlocks();
                                    if(this.children[0] !== undefined){
                                        this.children[0].alpha = 1;
                                        sGame.addChild(this.children[0]);
									}

                                    this.visible = false;

                                    if(!bTurnBlockOnceCall){
                                        for(var newy=0;newy<BLOCK_HEIGHT;++newy)
                                            for(var newx=0;newx<BLOCK_WIDTH;++newx)
                                                if((newy == 0 || newy == BLOCK_HEIGHT - 1 || newx == 0 || newx == BLOCK_WIDTH - 1) == false)
													sprBlock[newy][newx].interactive = false;

                                        bTurnBlockOnceCall= true;
                                        fTurnBlockTime = 0;
                                        iTurnBlockCompCnt = 0;

                                        b_turnOpen = true;
                                        b_turnAnim = true;
									}
                                };
                            }
                            else{
                                turnBlockClose[y][x].onComplete = function () {
                                    if(this.children[0] !== undefined) {
                                        this.children[0].alpha = 1;
                                        sGame.addChild(this.children[0]);
                                    }
                                    this.visible = false;
                                };
                            }

                            turnBlockClose[y][x].position.set(sprBlock[y][x].x,sprBlock[y][x].y);
                            turnBlockClose[y][x].visible = true;
                            turnBlockClose[y][x].addChild(sprBlock[y][x]);
                            turnBlockClose[y][x].play();

							sprBlock[y][x].alpha = 0;
							sprBlock[y][x].texture = PIXI.Texture.fromImage("block/block_65.png");

                            sprBlock[y][x].interactive = true;
						}
                    }
                }
        }
	}

}