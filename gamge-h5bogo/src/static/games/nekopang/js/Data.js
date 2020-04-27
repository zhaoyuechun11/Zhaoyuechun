Define = function () {};
/*
1	상하이타운
2	펭귄 대쉬
3	네오 2048
4	상하이쉐프
5	스페이스버블
6	네코닌자
7	좀비건
8	코스믹팝
9	네코팡
10	모미모미
11	요괴파티
12	라이벌레이싱
13	트레져 아일랜드(슬롯01)
14	창업신화
15	쥬얼리 스타(슬롯02)
16	IKON틀린그림찾기
17	"스위트블릭스
(벽돌깨기)"
18	다루마
20	"몬스터크로니클
(드래곤마스터)"
 */
Define.GIDX = 9;
Define.NS_IMAGE_URL = "./asset/atlas/shop/";
//var sheet = document.createElement('style')
//sheet.innerHTML = "div {border: 2px solid black; background-color: blue;}";
//document.body.appendChild(sheet);
//var CAT_DISABLE = 0;
//var CAT_SHODOW_NEW = 1;
//var CAT_SHODOW = 2;
//var CAT_GET_NEW = 3;
//var CAT_GET = 4;

//var CAT_ACH_NONE = 0;			// 업적자체가 없음.
//var CAT_ACH_ING = 1;			// 업적 진행중..
//var CAT_ACH_COMPLETED = 2;		// 업적 완료..
//var CAT_ACH_ONCE_COMPLETED = 3;	// 업적완료이긴한뎅 다시 초기화되는 업적..

//var CAT_ACH_CLOSE = 0;		// 업적 클로즈..
//var CAT_ACH_OPEN_NEW = 1;	// 업적 오픈 뉴..
//var CAT_ACH_OPEN = 2;		// 업적 오픈.
//var CAT_ACH_ALL_OPEN = 3;	// 업전 전체 오픈

tbCreateBlock = function()
{
    this.p;
    this.y;
    this.x;
}
/*
CatUI = function(x, y, cbInfo, cbCheck)
{
	this.sprMain = new PIXI.Container();
	this.sprMain.position.set(x, y);
	sCatUI.addChild(this.sprMain);
	this.sprBG = SpriteLoad(this.sprMain, "img/cat_slot_lock.png", 0, 0);
	this.sprBG.interactive = true;
	this.sprBG.on('click', cbInfo);
	this.sprBG.on('tap', cbInfo);
	this.sprCat = SpriteLoad(this.sprMain, "img/cat/1.png", 0, -10);
	this.sprSelect = SpriteLoad(this.sprMain, "img/cat_slot_select.png", 0, 0);
	this.sprSelect2 = SpriteLoad(this.sprMain, "img/cat_slot_add.png", 52, -63);
	this.txtSelect = FontLoad(this.sprSelect2, "장착", 16, -16, 0.5, 0.5,
			{fontFamily:'HYDNKB', fontSize:'30px', fill:'#ffffff', stroke:'#70003B', strokeThickness:5});
	this.txtSelect.rotation = 3.14 / 180 * 45;
	this.sprCheckBox = SpriteLoad(this.sprMain, "img/check_box.png", -80, -85);
	this.sprCheckBox.interactive = true;
	this.sprCheckBox.on('click', cbCheck);
	this.sprCheckBox.on('tap', cbCheck);

	this.sprCheck = SpriteLoad(this.sprCheckBox, "img/chaeck_icon.png", -5, -16);
	this.txtNo = FontLoad(this.sprMain, "No.001", 0, 85, 0.5, 0.5,
			{fontFamily:'HYDNKB', fontSize:'35px', fill:'#ffffff', stroke:'#795E17', strokeThickness:5});
	this.sprQuestion = SpriteLoad(this.sprMain, "img/question-mark.png", 0, 0);
	this.sprNew = SpriteLoad(this.sprMain, "img/new.png", 0, -85);
}

CatUI.prototype.SetType = function(no, type)
{
//	this.iNo = no;
	this.sprCat.texture = SpritePool.getInstance().get("img/cat/"+no+".png").texture;
	this.txtNo.text = "No." + leadingZeros(no, 3);
	switch(type)
	{
	case CAT_DISABLE:	// 오픈되지 않은 상태
		this.sprCat.visible = false;
		this.sprQuestion.visible = true;
		this.sprBG.texture = SpritePool.getInstance().get("img/cat_slot_lock.png").texture;
		this.sprCheckBox.visible = false;
		this.sprNew.visible = false;
		break;
	case CAT_SHODOW_NEW: // 그림자만 오픈이며 new 상태
		this.sprCat.visible = true;
		this.sprQuestion.visible = true;
		this.sprCat.tint = 0x000000;
		this.sprBG.texture = SpritePool.getInstance().get("img/cat_slot_lock.png").texture;
		this.sprCheckBox.visible = false;
		this.sprNew.visible = true;
		kData.iCatGet[no-1] = CAT_SHODOW;
		break;
	case CAT_SHODOW: // 그림자만 오픈이며 new 상태
		this.sprCat.visible = true;
		this.sprQuestion.visible = true;
		this.sprCat.tint = 0x000000;
		this.sprBG.texture = SpritePool.getInstance().get("img/cat_slot_lock.png").texture;
		this.sprCheckBox.visible = false;
		this.sprNew.visible = false;
		break;
	case CAT_GET_NEW: // 캐릭터가 오픈된 상태..
		this.sprCat.visible = true;
		this.sprQuestion.visible = false;
		this.sprCat.tint = 0xffffff;
		this.sprBG.texture = SpritePool.getInstance().get("img/cat_slot_normal.png").texture;
		this.sprCheckBox.visible = true;
		this.sprNew.visible = true;
		kData.iCatGet[no-1] = CAT_GET;
		break;
	case CAT_GET: // 캐릭터가 오픈된 상태..
		this.sprCat.visible = true;
		this.sprQuestion.visible = false;
		this.sprCat.tint = 0xffffff;
		this.sprBG.texture = SpritePool.getInstance().get("img/cat_slot_normal.png").texture;
		this.sprCheckBox.visible = true;
		this.sprNew.visible = false;
		break;
	}
}

CatUI.prototype.SetCheck = function(flag)
{
	if(flag == false)
	{
		this.sprCheck.visible = false;
		this.sprSelect.visible = false;
		this.sprSelect2.visible = false;
	}
	else
	{
		this.sprCheck.visible = true;
		this.sprSelect.visible = true;
		this.sprSelect2.visible = true;
	}
}

CatUI.prototype.IsCheck = function()
{
	return this.sprCheck.visible;
}
*/
//======================================================================================
// 리워드주는 부분에서의 고양이..
//RewardCat = function(spBox, cbButton)//, parent, spEff)
//{
//	this.sprMain = new PIXI.Container();
//	this.sprSub1 = new PIXI.Container();
//	this.sprSub2 = new PIXI.Container();
//	this.sprMain.addChild(this.sprSub1);
//	this.sprMain.addChild(this.sprSub2);
//
////	this.spineEff = new PIXI.spine.Spine(spEff);
////	parent.addChild(this.spineEff);
////	SpinePlay(this.spineEff, null, null, "animation", 0, true);
//	this.sprCat = SpriteLoad(this.sprSub1, "img/cat/1.png", 0, 0);
//	this.sprNew = SpriteLoad(this.sprSub1, "img/new.png", 0, -70);
//	this.sprTurn = SpriteLoad(this.sprSub1, "img/turn_icon.png", 0, -70);
//	this.txtTurn = BitmapFontLoad(this.sprTurn, "+5", 20, -54, 0, 0.5,
//			{font:'80px yellow_number', align: 'center', tint: 0xffffff});
//	this.sprTurn.position.set(-this.txtTurn.width/2, -70)
//	this.spineBox = new PIXI.spine.Spine(spBox);
//
//	this.sprSub2.addChild(this.spineBox);
//	this.spineBox_onComplete = this.spineBox_onComplete.bind(this);
//	this.spineBox.state.addListener({complete:this.spineBox_onComplete});
//	this.spineBox.interactive = true;
//	this.spineBox.on('click', cbButton);
//	this.spineBox.on('tap', cbButton);
//	this.spineBox.on('mouseover', scaleUp);
//	this.spineBox.on('tap', scaleUp);
//	this.spineBox.on('mouseout', restoreScale);
//	this.spineBox.on('touchend', restoreScale);
//	this.SetType(0);
//}
//
//RewardCat.prototype.spineBox_onComplete = function(entry)
//{
//	switch(entry.trackIndex){
//	case 1:
//		this.spineBox.visible = false;
//		gameState = STATE_GAME_CLEAR_STEP7;
//		break;
//	}
//}
//
//RewardCat.prototype.SetType = function(type, _new)
//{
//	switch(type)
//	{
//	case 0:	// 선물상자로 셋팅..
//		this.sprSub1.alpha = 0;
//		this.sprSub2.alpha = 1;
//	//	this.sprCat.visible = false;
//		this.sprNew.visible = false;
//		this.sprTurn.visible = false;
//		this.spineBox.interactive = true;
//		SpinePlay(this.spineBox, null, null, "box_idle", 0, true);
//		break;
//	case 1:
//		if(_new == true)
//		{
//			this.sprNew.visible = true;
//			this.sprTurn.visible = false;
//		}
//		else
//		{
//			this.sprNew.visible = false;
//			this.sprTurn.visible = true;
//		}
//	//	this.spineBox.interactive = false;
//		SpinePlay(this.spineBox, null, null, "box_open", 1, false);
//		break;
//	case 2:
//		break;
//	case 3:
//		breka;
//	case 4:
//		break;
//	}
//}
//
//RewardCat.prototype.SetCatTexture = function(num)
//{
////	this.sprCat.visible = true;
//	this.sprCat.texture = SpritePool.getInstance().get("img/cat/"+(num+1)+".png").texture;
////	this.sprCat.visible = false;
//}
//======================================================================================
// 아카이브 처리..
/*
Achievements = function(_y, _x)
{
	this.y = _y;
	this.x = _x;
}

//업적을 타입별로 분리한다.
var listAch = new Array();
var listAchOpen = new Array();
var listAchOpenEx = new Array();
function InitAchievements()
{
	for(var i=0;i<200;++i)
	{
		if(kData.iCatAchComplete[i][4] != CAT_ACH_COMPLETED)	// 업적 4개를 다 완료했는지 체크.
		{
			for(var k=0;k<4;++k)
			{
				if(kData.iCatAchComplete[i][k] == CAT_ACH_ING)
				{
					if(listAch[tbAchievements[i]["ach"+k]] == undefined)
						listAch[tbAchievements[i]["ach"+k]] = new Array();
					listAch[tbAchievements[i]["ach"+k]].push(new Achievements(i, k));

					if(kData.iCatAchOpen[i][k] == CAT_ACH_CLOSE)
						listAchOpen.push(new Achievements(i, k));
				}
			}
		}

		// 여기서는 모든 리스트를 등록한다.
		for(var k=0;k<4;++k)
		{
			if(kData.iCatAchComplete[i][k] != CAT_ACH_NONE)
				listAchOpenEx.push(new Achievements(i, k));
		}
	}

	// 여기서 listAchOpen를 믹스시킨다.
	RandomMix(listAchOpen, 300);
}

function AddAchievementsCnt(type, value)
{
	switch(type)
	{
	case BT_NEKO_RED:
		kData.iCatAchCnt[5] += value;
		UpdateAchievements(5);
		kData.iCatAchCnt[37] += value;
		break;
	case BT_NEKO_YELLOW:
		kData.iCatAchCnt[6] += value;
		UpdateAchievements(6);
		kData.iCatAchCnt[38] += value;
		break;
	case BT_NEKO_GREEN:
		kData.iCatAchCnt[7] += value;
		UpdateAchievements(7);
		kData.iCatAchCnt[39] += value;
		break;
	case BT_NEKO_BLUE:
		kData.iCatAchCnt[8] += value;
		UpdateAchievements(8);
		kData.iCatAchCnt[40] += value;
		break;
	case BT_NEKO_VIOLET:
		kData.iCatAchCnt[9] += value;
		UpdateAchievements(9);
		break;
	case BT_ITEM_WIDTH:
		kData.iCatAchCnt[11] += value;
		UpdateAchievements(11);
		break;
	case BT_ITEM_HEIGHT:
		kData.iCatAchCnt[12] += value;
		UpdateAchievements(12);
		break;
	case BT_ITEM_BOMB:
		kData.iCatAchCnt[13] += value;
		UpdateAchievements(13);
		break;
	case BT_ITEM_CROSS:
		kData.iCatAchCnt[14] += value;
		UpdateAchievements(14);
		break;
	case BT_ITEM_RAINBOW:
		kData.iCatAchCnt[15] += value;
		UpdateAchievements(15);
		break;
	}

	SaveData();
}

function UpdateAchievements(type)
{
	if(listAch[type] === undefined) return;
	var i = 0;
	var k = 0;
	var flag = false;

	switch(type)
	{
	case 0:	// No.n 고양이 획득
		for(i=0;i<listAch[type].length;++i)
		{
			// 획득한 고양이 인지 체크.
			if(kData.iCatGet[tbAchievements[listAch[type][i].y]["ach"+listAch[type][i].x+"Num"]] >= CAT_GET_NEW)
			{
				kData.iCatAchComplete[listAch[type][i].y][listAch[type][i].x] = CAT_ACH_COMPLETED;
				flag = true;
				for(k=0;k<4;++k)
				{
					if(kData.iCatAchComplete[listAch[type][i].y][k] == CAT_ACH_ING)
					{
						flag = false;
						break;
					}
				}
				if(flag == true) // 전체가 성공이면 풀컴플릿을 설정..
					kData.iCatAchComplete[listAch[type][i].y][4] = CAT_ACH_COMPLETED;
				listAch[type].splice(i, 1);	// 성공했으면 리스트에서 삭제..
				SaveData();
			}
		}
		break;
	case 1:		// 기본자세 n마리 보유
	case 2:		// 냥모아니트 자세 n마리 보유
	case 3:		// 롱캣 자세 n마리 보유
	case 4:		// 빵굽기 자세 n마리 보유.
	case 5: 	// 빨강 퍼즐 n개 제거
	case 6:		// 노랑 퍼즐 n개 제거
	case 7: 	// 초록 퍼즐 n개 제거
	case 8:		// 파랑 퍼즐 n개 제거
	case 9:		// 보라 퍼즐 n개 제거.
	case 10:	// 게임 플레이 n번.
	case 11:	// 가로 폭탄 아이템 사용 n번
	case 12:	// 세로 폭탄 아이템 사용 n번
	case 13:	// 3*3 폭탄 아이템 사용 n번
	case 14:	// 십자 폭탄 아이템 사용 n번
	case 15:	// 무지개 폭탄 아이템 사용 n번
	case 16:	// 가로 폭탄 아이템으로 블럭 제거 n번
	case 17:	// 세로 폭탄 아이템으로 블럭 제거 n번
	case 18:	// 3*3 폭탄 아이템으로 블럭 제거 n번
	case 19:	// 십자 폭탄 아이템으로 블럭 제거 n번
	case 20:	// 무지개 폭탄 아이템으로 블럭 제거 n번
	case 21:	// 캐릭터가 위로 이동 횟수 n번
	case 22:	// 캐릭터가 아래로 이동 횟수 n번
	case 23:	// 캐릭터가 좌로 이동 횟수 n번
	case 24:	// 캐릭터가 우로 이동 횟수 n번
	case 25:	// 캐릭터가 2칸 이상 이동 횟 수 n번
	case 26:	// 광고시청 n번
	case 27:	// 캐릭터 터치 n번
	case 28:	// 도감 상세조건 보기 n번
	case 29:	// 출현 힌트 해금 n번
	case 30:	// 외형 힌트 해금 n번
	case 31:	// 같은 고양이 획득 n번
	case 32:	// 고양이 배치 후 플레이 n번
	case 33:	// 게임 오버 n번
	case 34:	// 아이템 3개 이상 남기고 클리어 n번
	case 35:	// n레벨 도달.
		for(i=0;i<listAch[type].length;++i)
		{
			if(tbAchievements[listAch[type][i].y]["ach"+listAch[type][i].x+"Num"] <= kData.iCatAchCnt[type])
			{
				kData.iCatAchComplete[listAch[type][i].y][listAch[type][i].x] = CAT_ACH_COMPLETED;
				flag = true;
				for(k=0;k<4;++k)
				{
					if(kData.iCatAchComplete[listAch[type][i].y][k] == CAT_ACH_ING)
					{
						flag = false;
						break;
					}
				}
				if(flag == true) // 전체가 성공이면 풀컴플릿을 설정..
					kData.iCatAchComplete[listAch[type][i].y][4] = CAT_ACH_COMPLETED;
				listAch[type].splice(i, 1);	// 성공했으면 리스트에서 삭제..
				SaveData();
			}
		}
		break;
	case 36:	// n발판에서 해당고양이 획득시 해금
	case 44:	// 맨 위쪽 라인 조작하지 않기
	case 45:	// 맨 아래쪽 라인 조작하지 않기
	case 46:	// 맨 왼쪽 라인 조작하지 않기
	case 47:	// 맨 오른쪽 라인 조작하지 않기
	case 48:	// 위로 매칭하지 않기
	case 49:	// 아래로 매칭하지 않기
	case 50:	// 좌로 매칭하지 않기
	case 51:	// 우로 매칭하지 않기
	case 52:	// 1턴 남기고 클리어
	case 53:	// 빨 > 노 > 초 > 파 > 보 순서대로 퍼즐 제거
		for(i=0;i<listAch[type].length;++i)
		{
			if(tbAchievements[listAch[type][i].y]["ach"+listAch[type][i].x+"Num"] == kData.iCatAchCnt[type])
			{
				kData.iCatAchComplete[listAch[type][i].y][listAch[type][i].x] = CAT_ACH_ONCE_COMPLETED;
				flag = true;
				for(k=0;k<4;++k)
				{
					if(kData.iCatAchComplete[listAch[type][i].y][k] == CAT_ACH_ING)
					{
						flag = false;
						break;
					}
				}
				if(flag == true) // 전체가 성공이면 풀컴플릿을 설정..
					kData.iCatAchComplete[listAch[type][i].y][4] = CAT_ACH_ONCE_COMPLETED;
			//	listAch[type].splice(i, 1); // 여기서는 리스트에서 삭제시키지 않고 레어고양이를 획득했을때 리스트에서 삭제시킨다.
				SaveData();
			}
		}
		break;
	case 37:	// 해당판에서 빨강 퍼즐 가장 많이 제거후 해당고양이 획득시 해금
	case 38:	// 해당판에서 노랑 퍼즐 가장 많이 제거후 해당고양이 획득시 해금
	case 39:	// 해당판에서 초록 퍼즐 가장 많이 제거후 해당고양이 획득시 해금
	case 40:	// 해당판에서 파랑 퍼즐 가장 많이 제거후 해당고양이 획득시 해금
	case 41:	// 1턴 안에 방해블럭 n개 제거
	case 42:	// n턴 안에 클리어
	case 43:	// 아이템 n개 남기고 클리어
	case 54:	// n콤보..
		for(i=0;i<listAch[type].length;++i)
		{
			if(tbAchievements[listAch[type][i].y]["ach"+listAch[type][i].x+"Num"] <= kData.iCatAchCnt[type])
			{
				kData.iCatAchComplete[listAch[type][i].y][listAch[type][i].x] = CAT_ACH_ONCE_COMPLETED;
				flag = true;
				for(k=0;k<4;++k)
				{
					if(kData.iCatAchComplete[listAch[type][i].y][k] == CAT_ACH_ING)
					{
						flag = false;
						break;
					}
				}
				if(flag == true) // 전체가 성공이면 풀컴플릿을 설정..
					kData.iCatAchComplete[listAch[type][i].y][4] = CAT_ACH_ONCE_COMPLETED;
			//	listAch[type].splice(i, 1); // 여기서는 리스트에서 삭제시키지 않고 레어고양이를 획득했을때 리스트에서 삭제시킨다.
				SaveData();
			}
		}
		break;
	}
}
*/

var fLifeAddTime = 600;	//라이프가 획득 시간
var iLifeMax = 5;	//라이프 맥스값
var iLifeFirstCnt = 100;	//라이프 초기값

//국가별 언어 설정
var tbString_json = "{\"rainbow\":{\"en\":\"Please select{E}a block to remove.\",\"jp\":\"消したいブロックを{E}選択してください\",\"kr\":\"제거할 블록을{E}선택해 주세요.\"},\"shop_popup_success_contents\":{\"en\":\"Gained {V} films\",\"jp\":\"フィルム {V}個をゲット！\",\"kr\":\"필름{V}개 획득!\"},\"MembersOnly\":{\"en\":\"MEMBERS\",\"jp\":\"会員専用\",\"kr\":\"회원전용\"},\"MAX\":{\"en\":\"MAX\",\"jp\":\"MAX\",\"kr\":\"MAX\"},\"STAGESELECT\":{\"en\":\"SELECT STAGE\",\"jp\":\"STAGE SELECT\",\"kr\":\"SELECT STAGE\"},\"SKIP\":{\"en\":\"SKIP ▶\",\"jp\":\"SKIP ▶\",\"kr\":\"SKIP ▶\"},\"STAGE\":{\"en\":\"STAGE\",\"jp\":\"STAGE\",\"kr\":\"STAGE\"},\"SCORE\":{\"en\":\"SCORE\",\"jp\":\"SCORE\",\"kr\":\"SCORE\"},\"START\":{\"en\":\"START\",\"jp\":\"START\",\"kr\":\"START\"},\"ALBUM\":{\"en\":\"ALBUM\",\"jp\":\"ALBUM\",\"kr\":\"ALBUM\"},\"ALLCLEAR\":{\"en\":\"ALL{E}CLEAR\",\"jp\":\"ALL{E}CLEAR\",\"kr\":\"ALL{E}CLEAR\"},\"NotBlock\":{\"en\":\"No match!\",\"jp\":\"これ以上合わせることができません!\",\"kr\":\"더 이상 맞출 수가 없어요!\"},\"TURNOVER\":{\"en\":\"TURN OVER!\",\"jp\":\"残念!\",\"kr\":\"TURN OVER!\"},\"TurnAdd\":{\"en\":\"ADD MOVE\",\"jp\":\"続ける\",\"kr\":\"Add이동\"},\"TurnOver0\":{\"en\":\"<c>ADD 10</v>MOVES!\",\"jp\":\"フィルム使用して コンテニューします。\",\"kr\":\"<c>이동 10회</v>를 Add하세요!\"},\"TurnOver1\":{\"en\":\"The items are applied directly to the game{E}<c>1 film</c> will be consumed!\",\"jp\":\"\",\"kr\":\"아이템은 게임에 바로 적용되고<c> 1필름</c>이 소비돼요.\"},\"GAMEOVER\":{\"en\":\"GAME OVER!!\",\"jp\":\"GAME OVER!\",\"kr\":\"GAME OVER!!\"},\"RETRY\":{\"en\":\"RETRY\",\"jp\":\"RETRY\",\"kr\":\"RETRY\"},\"PHOTOTIME\":{\"en\":\"PHOTO TIME\",\"jp\":\"PHOTO TIME\",\"kr\":\"PHOTO TIME\"},\"PHOTOSHOT\":{\"en\":\"Take photo\",\"jp\":\"写真撮影\",\"kr\":\"사진 찍기\"},\"PHOTORESULT\":{\"en\":\"PHOTO RESULT\",\"jp\":\"PHOTO RESULT\",\"kr\":\"PHOTO RESULT\"},\"NEW\":{\"en\":\"NEW\",\"jp\":\"NEW\",\"kr\":\"NEW\"},\"FilmWarning\":{\"en\":\"Not enough film. {E}Do you want to go to{E}film purchasing page?\",\"jp\":\"フィルムが足りません。{E}フィルムを購入しますか?\",\"kr\":\"필름이 부족합니다.{E}필름 구입창으로 이동하시겠습니까?\"},\"ReShoot\":{\"en\":\"ReShoot\",\"jp\":\"もう１枚\",\"kr\":\"ReShoot\"},\"Turn\":{\"en\":\"GOAL{E}<c>{V}</c>TURN\",\"jp\":\"到着まで{E}<c> {V}</c> マス\",\"kr\":\"도착까지{E}<c> {V}</c> 칸\"},\"SCORE2\":{\"en\":\"SCORE <c>{V}</c>\",\"jp\":\"SCORE <c>{V}</c>\",\"kr\":\"SCORE <c>{V}</c>\"},\"STAGE2\":{\"en\":\"STAGE <c>{V}</c>\",\"jp\":\"STAGE <c>{V}</c>\",\"kr\":\"STAGE <c>{V}</c>\"},\"Login\":{\"en\":\"LOGIN\",\"jp\":\"ログイン\",\"kr\":\"로그인\"},\"FILMSHOP\":{\"en\":\"FILM SHOP\",\"jp\":\"FILM SHOP\",\"kr\":\"FILM SHOP\"},\"OK\":{\"en\":\"OK\",\"jp\":\"OK\",\"kr\":\"OK\"},\"NO\":{\"en\":\"NO\",\"jp\":\"NO\",\"kr\":\"NO\"},\"signup\":{\"en\":\"Members only!<br/>Would you like to go to the sign up page?\",\"jp\":\"会員専用<br/>会員登録をしますか?\",\"kr\":\"회원전용!<br/>회원가입 하시겠습니까?\"},\"gotogpg\":{\"en\":\"Only available in the Moby Games app.<br/>Would you like to go to the Moby Games app?\",\"jp\":\"モビーゲームアプリのみ購入で きます。<br/>モビーゲームアプリに移動しますか？\",\"kr\":\"모비게임 앱에서만 구매 가능합니다.<br/>모비게임 앱으로 이동하시겠습니까?\"},\"lowpoint\":{\"en\":\"Not enough points!\",\"jp\":\"ポイントが足りません!\",\"kr\":\"There are not enough points!\"},\"allcomplete\":{\"en\":\"ALL{E}COMPLETE\",\"jp\":\"ALL{E}COMPLETE\",\"kr\":\"ALL{E}COMPLETE\"},\"MSHOP\":{\"en\":\"M SHOP\",\"jp\":\"M SHOP\",\"kr\":\"M SHOP\"},\"MGM_Title\":{\"en\":\"NekoPang\",\"jp\":\"ネコパン\",\"kr\":\"네코팡\"},\"MGM_Contents\":{\"en\":\"Cute Cat 3 Match Puzzle! Enjoy puzzles and collect various cats! Come on! The cats wait for you!\",\"jp\":\"同じ顔のネコを合わせてゴミ箱を消し、{E}ゴールまで辿り着く頭脳派パズルゲーム！{E}ステージクリアでかわいいネコの写真を{E}ＧＥＴ！たくさん集めて自慢しよう！\",\"kr\":\"귀여운 고양이 3매치 퍼즐! 퍼즐을 즐기며 다양한 고양이를 모아보세요! 어서요! 고양이들이 당신을 기다려요!\"}}";
var tbString = JSON.parse(tbString_json);
