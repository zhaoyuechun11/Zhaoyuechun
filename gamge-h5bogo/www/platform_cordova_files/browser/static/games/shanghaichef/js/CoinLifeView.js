var CoinLifeView_currentType = 0;
var CoinLifeView_cb = [];

function CoinLifeView(_cbType0, _cbType3, _cbType4)
{
	this.sMain = new PIXI.Container();
	CoinLifeView_cb.push(_cbType0);
	CoinLifeView_cb.push(_cbType3);
	CoinLifeView_cb.push(_cbType4);
	this.bInitSprite = false;

	this.sprBG;

	this.sprCoin;
	//this.sprCoinPlus;
	this.txtCoin;

	this.sprLife;;
	//his.sprLifePlus;
	this.txtLife;

	// 라이프 게이지..
	//this.txtTime;
}

CoinLifeView.prototype.initSprite = function()
{
	//this.sprBG = SpriteLoad(this.sMain, "result_slot.png", iCenterSizeX, 0);

    this.sprCoin = SpriteLoad(this.sMain, "Popup/result_gold.png", 0, 0, 0.5, 0.5);
    this.sprCoin.interactive = true;

    this.txtCoin = FontLoad(this.sMain, "0", 35, 3, 1, 0.5,
        {font:'35px ' + tbTTF[lang], fill:'#fff799',
			stroke:'#59493f', strokeThickness:5});
    /*this.sprCoinPlus = SpriteLoad(this.sMain, "StageSelect/btn_plus.png", 20, 20);
	this.sprCoinPlus.on('mousedown',function () {
        bIsHeartCharge = false;
		SESoundPlay(SE_CLICK);
		ShowPopup(true,POPUP_TYPE.GAME_GOLD_SHOP);
    });
	this.sprCoinPlus.on('touchstart',function () {
        bIsHeartCharge = false;
        SESoundPlay(SE_CLICK);
        ShowPopup(true,POPUP_TYPE.GAME_GOLD_SHOP);
    });
    this.sprCoinPlus.on('mouseover', scaleUp);
    this.sprCoinPlus.on('touchestart', scaleUp);
    this.sprCoinPlus.on('mouseout', restoreScale);
    this.sprCoinPlus.on('touchend', restoreScale);
	this.sprCoinPlus.interactive = true;*/

    //SpriteLoad(this.sprCoinPlus, "plus_btn.png", 0, 3);

    /* 2016-12-28 Q-UP 기획 삭제
	  this.sprCoin.on('mousedown', this.callback);
	 this.sprCoin.on('touchstart', this.callback);
	 */

    /*this.txtTime = FontLoad(this.sMain, "00:00", 47, -2, 0.5, 0.5,
			{font:'35px ' + tbTTF[lang], fill:'#fff799',
				stroke:'#59493f', strokeThickness:4});*/

    this.sprLife = SpriteLoad(this.sMain, "Popup/heart.png", -15, 0);

    this.txtLife = FontLoad(this.sMain, "0", 0, 0 , 0.5, 0.5,
        {font:'40px ' + tbTTF[lang], fill:'#ffffff',
			stroke:'#7d0000', strokeThickness:5});

    /*this.sprLifePlus = SpriteLoad(this.sMain, "StageSelect/btn_plus.png", this.sprLife.width / 2, 0);
    this.sprLifePlus.on('mousedown', function () {
        bIsHeartCharge = true;
        SESoundPlay(SE_CLICK);
        ShowPopup(true,POPUP_TYPE.GAME_HEART_SHOP);
    });
    this.sprLifePlus.on('touchstart', function () {
        bIsHeartCharge = true;
        SESoundPlay(SE_CLICK);
        ShowPopup(true,POPUP_TYPE.GAME_HEART_SHOP);
    });
    this.sprLifePlus.on('mouseover', scaleUp);
    this.sprLifePlus.on('touchestart', scaleUp);
    this.sprLifePlus.on('mouseout', restoreScale);
    this.sprLifePlus.on('touchend', restoreScale);
    this.sprLifePlus.interactive = true;*/

	this.bInitSprite = true;
}

CoinLifeView.prototype.init = function()
{
	if(kData.lastTick == 0) return;
	var time = (Date.now() - kData.lastTick) * 0.001;

	if(kData.life < iHeartChargeMax){
        var lifeCnt = Math.floor(time / (LIFE_ADD_TIME * 60));
        /*kData.lifeTime =  kData.lifeTime - (time % (LIFE_ADD_TIME * 60));
        if(kData.lifeTime < 0)
            kData.lifeTime = 0;*/

        kData.life += lifeCnt;
        if(kData.life > iHeartChargeMax)
        	kData.life = iHeartChargeMax;
	}

//	time = 601;
//	cosole.log("")

	// if(kData.life > LIFE_MAX)
	// {
	// 	kData.lifeTime = LIFE_ADD_TIME * 60;
	// 	kData.life = LIFE_MAX;
	// }
//	this.updateFont();
	//SaveDataInClient();
}

CoinLifeView.prototype.callback = function()
{
	switch(CoinLifeView_currentType){
		case 0: // 스테이지 셀럭트 일때..
			CoinLifeView_cb[0]();
			break;
		case 3: // PAUSE 일때
			CoinLifeView_cb[1]();
			break;
	}
}

CoinLifeView.prototype.update = function()
{
	if(this.bInitSprite == false) return;

	this.txtCoin.text = Number(kData.coin).toLocaleString('en');

	if(kData.life < iHeartChargeMax){
		/*kData.lifeTime -= deltaTime;

		if(kData.lifeTime <= 0){
            networkManager.LoadData(function () {
                if(loginTF == 0){
                    kData.life++;
                    kData.lifeTime = LIFE_ADD_TIME * 60;
                }
                coinLifeView.updateFont();
                networkManager.ForcedSaveData();
            });
		}*/

        /*this.txtTime.text = GetString('full');

		if(this.sMain.visible == true)
		{
			this.txtTime.text = "";
			if((kData.lifeTime+0.99999)/60 < 10)
				this.txtTime.text += "0" + Math.floor((kData.lifeTime+0.99999)/60) + ":";
			else
				this.txtTime.text += Math.floor((kData.lifeTime+0.99999)/60) + ":";
			
			if((kData.lifeTime+0.99999)%60 < 10)
				this.txtTime.text += "0" + Math.floor((kData.lifeTime+0.99999)%60);
			else
				this.txtTime.text += Math.floor((kData.lifeTime+0.99999)%60);
		}*/
	}else{
        //this.txtTime.text = GetString('full');
        //kData.lifeTime = LIFE_ADD_TIME * 60;
		//this.txtTime.visible = true;
        this.updateFont();
	}

	coinLifeView.ADCooltimeUpdate();
}

CoinLifeView.prototype.show = function(type)
{
	this.sMain.visible = true;
	CoinLifeView_currentType = type;
	switch(CoinLifeView_currentType)
	{
		case 0: // 스테이지 셀렉트 셋팅.
			sStageSelect.addChild(this.sMain);

			/* 2016-12-28 Q-UP 기획 삭제
            this.sprCoin.interactive = true;
			*/

			// 코인
            this.txtCoin.visible = true;
            //this.sprCoinPlus.visible = true;

            this.txtCoin.position.set(iCenterSizeX + 235, iCenterSizeY -350);
            //this.sprCoinPlus.position.set(iCenterSizeX + 270, iCenterSizeY -348);

            // 라이프
            //this.txtTime.visible = true;
			this.txtLife.visible = true;
			//this.sprLifePlus.visible = true;
            //this.sprLifePlus.interactive = true;

            this.txtLife.position.set(iCenterSizeX - 260, iCenterSizeY - 354)
            //this.txtTime.position.set(iCenterSizeX - 150, iCenterSizeY - 350)
            //this.sprLifePlus.position.set(iCenterSizeX - 50, iCenterSizeY - 348)

            // 차후 제거 해야 함
            this.sprCoin.visible = false;
            //this.sprBG.visible = false;
            this.sprLife.visible = false
			break;
		case 1: // Shop.
			/* 2016-12-28 Q-UP 기획 삭제
			 this.sprCoin.visible = true;
			 this.sprCoin.interactive = false;
			 this.sprCoin.position.x = iCenterSizeX - 80;
			 this.sprCoin.position.y = iCenterSizeY - 320;
			*/

            this.txtCoin.visible = false;
            //this.sprCoinPlus.visible = false;

            this.txtLife.visible = false;
            //this.txtTime.visible = false;
            //this.sprLifePlus.visible = false

            //this.sprBG.visible = false;

            //this.sprCoinPlus.visible = false;

			this.sprLife.visible = false;
			this.sprLife.interactive = false;
			//this.sprLifePlus.visible = false;
			this.sprLife.position.x = iCenterSizeX + 105;
			this.sprLife.position.y = iCenterSizeY - 320;
			break;
		case 2: // 게임시작시 팝업창에 붙음..
			//sPopupGameStart.addChild(this.sMain);

			/* 2016-12-28 Q-UP 기횓 삭제
			 this.sprCoin.visible = true;
			 this.sprCoin.interactive = false;
			 this.sprCoin.position.x = iCenterSizeX - 148;
			 this.sprCoin.position.y = iCenterSizeY - 305;

			 this.sprLife.visible = true;
			 this.sprLife.interactive = false;
			 this.sprLifePlus.visible = false;

			 this.sprLife.position.x = iCenterSizeX - 120;
			 this.sprLife.position.y = iCenterSizeY - 305;
			*/


            this.txtCoin.visible = true;
            //this.sprCoinPlus.visible = true;

            this.txtLife.visible = true;
            //this.txtTime.visible = true;
            //this.sprLifePlus.visible = true

            //this.sprBG.visible = false;
			break;
		case 3: //fail

			/* 2016-12-28 Q-UP 기획 삭제

			 this.sprCoin.interactive = true;
			 this.sprCoinPlus.visible = true;

			 this.sprCoin.position.x = iCenterSizeX - 148;
			 this.sprCoin.position.y = iCenterSizeY - 315;
			*/

            this.txtCoin.visible = false;
            //this.sprCoinPlus.visible = false;

            //this.txtTime.visible = false;
            this.txtLife.visible = false;
            //this.sprLifePlus.visible = false;

			//sPopupBase.addChild(this.sMain);

			//this.sprBG.visible = false;

			//this.sprLife.position.x = iCenterSizeX + 76;
			//this.sprLife.position.y = iCenterSizeY - 315;
			//this.sprBG.position.y = iCenterSizeY - 315;
			break;
		case 4: // 스테이지 클리어시 모드 끈다.
			/* 2016-12-28 Q-UP 삭제
			 this.sprCoin.visible = false;
			 this.sprCoin.interactive = false;
			 this.sprCoinPlus.visible = false;
			*/

            this.sprCoin.visible = false;
            //this.sprCoinPlus.visible = false;

			//this.sprBG.visible = false;
			this.sprLife.visible = false;
			this.sprLife.interactive = false;
			//this.sprLifePlus.visible = false;
			break;
	}
	
	this.updateFont();
}

CoinLifeView.prototype.hide = function(type)
{
	this.sMain.visible = false;
}

CoinLifeView.prototype.updateFont = function()
{
	/* 2016-12-28 Q-UP 기획 삭제
	if(kData.coin < COIN_MAX)
		this.txtCoin.text = kData.coin.toString();
	else
		this.txtCoin.text = "MAX";
	*/
	
	// 하트 무제한으로 인한 수정
	// if(kData.life < LIFE_MAX)
	// else
	// 	this.txtLife.text = "MAX";

    this.txtLife.text = kData.life.toString();
    
    // if(kData.life >= LIFE_CHARGE_MAX)
    //     this.lifegauge_mask.scale.set(this.lifegauge.width, 1);

	if(CoinLifeView_currentType != 0) return;

    this.sprCoin.visible = false;
    //this.sprBG.visible = false;
    this.sprLife.visible = false
};
var iHeartChargeMax = 5;
var fHeartChargeTime = 600;
var iHeartInitData = 1;
var iCoinInitData = 200;

CoinLifeView.prototype.LostTime = function (_iLostTime) {
    var addHeart = 0;

    for(var i=0,imax= kData.fCooltime_Heart.length;i<imax;++i){
        if(kData.fCooltime_Heart[i] > 0){
            kData.fCooltime_Heart[i] -= _iLostTime;

            if(kData.fCooltime_Heart[i] <= 0)
                kData.fCooltime_Heart[i] = 0;
        }

        if(kData.fCooltime_Gamemoney[i] > 0){
            kData.fCooltime_Gamemoney[i] -= _iLostTime;

            if(kData.fCooltime_Gamemoney[i] <= 0)
                kData.fCooltime_Gamemoney[i] = 0;
        }
    }

    if(kData.life < iHeartChargeMax){
        while(_iLostTime >= fHeartChargeTime){
            addHeart++;
            _iLostTime -= fHeartChargeTime;
        }

        /*kData.lifeTime -= _iLostTime;

        if(kData.lifeTime < 0){
            addHeart++;
            kData.lifeTime = fHeartChargeTime + kData.lifeTime;
        }*/

        kData.life += addHeart;

        if(kData.life > iHeartChargeMax)
            kData.life = iHeartChargeMax;
    }

    // networkManager.ForcedSaveData();
};

/** 하트 관련 광고 쿨타임 체크 shopList 네트워크 통신 이 후
 * 선행 작업 - kData에 cooltime 관련 변수 추가
 * ex)
 kData.fCooltime_Heart = [];
 * Update 부분에 ADCooltimeUpdate 넣어 줘야함
 */
CoinLifeView.prototype.ADCoolTimeCheck = function () {
    if(shopListData == null || shopListData.length < 1) return;

    for(var i=0,imax=shopListData.length;i<imax;++i){
        if(!(shopListData[i].pType.indexOf('ad') != -1)){
            kData.fCooltime_Heart[i] = 0;
        }
    }

    for(var i=0,imax=shopListData.length;i<imax;++i){
        if(!(shopListData[i].pType.indexOf('ad') != -1)){
            kData.fCooltime_Gamemoney[i] = 0;
        }
    }
};

var type_data = -1;
CoinLifeView.prototype.ADCooltimeUpdate = function () {
    for(var i=0,imax = kData.fCooltime_Heart.length;i<imax;++i) {
        if (kData.fCooltime_Heart[i] > 0)
            kData.fCooltime_Heart[i] -= deltaTime;

        if (kData.fCooltime_Gamemoney[i] > 0)
            kData.fCooltime_Gamemoney[i] -= deltaTime;


        if(kData.fCooltime_Heart	[i] <= 0)
            kData.fCooltime_Heart[i] = 0;

        if(kData.fCooltime_Gamemoney	[i] <= 0)
            kData.fCooltime_Gamemoney[i] = 0;
    }

	switch(type_data){
		case AD_TYPE.HEART:
            for(var i=0,imax = kData.fCooltime_Heart.length;i<imax;++i){
                if(kData.fCooltime_Heart[i] > 0){
                    var min = Math.floor(kData.fCooltime_Heart[i] / 60);
                    if(min < 10)
                        min = '0' + min;
                    var sec = Math.floor(kData.fCooltime_Heart[i] % 60);
                    if(sec < 10)
                        sec = '0'+sec;

                    txtPopupShopContentsCooltime[i].visible = true;
                    txtPopupShopContentsCooltime[i].text = min + ':' + sec;

                    list_sprPopupShopBtn[i].visible = false;

                    sprPopupShopBtn_disable[i].visible = true;
                    sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsCooltime[i]);

                    sprPopupShopContentsInBtn[i].visible = false;

                    // txtCoolTime_Heart[i].text = min + ':' + sec;
                    // sprHeartShopBtn[i].interactive = false;
                }else  if(shopListData.length > 1 && shopListData[0].mkidx >= 0){

                     if(txtPopupShopContentsCooltime[i].visible){
                         // list_sprPopupShopBtn[i].texture = PIXI.Texture.fromFrame('btn_shop_2.png');

                         sprPopupShopBtn_disable[i].visible = false;

                         list_sprPopupShopBtn[i].visible = true;
                         list_sprPopupShopBtn[i].addChild(txtPopupShopContentsCooltime[i]);

                         txtPopupShopContentsCooltime[i].visible = false;
                         sprPopupShopContentsInBtn[i].visible = true;
                    }
                }
            }
			break;
		case AD_TYPE.GAME_MONEY:
            for(var i=0,imax = kData.fCooltime_Gamemoney.length;i<imax;++i){
                if(kData.fCooltime_Gamemoney[i] > 0){

                    var min = Math.floor(kData.fCooltime_Gamemoney[i] / 60);
                    if(min < 10)
                        min = '0' + min;
                    var sec = Math.floor(kData.fCooltime_Gamemoney[i] % 60);
                    if(sec < 10)
                        sec = '0'+sec;

                    txtPopupShopContentsCooltime[i].visible = true;
                    txtPopupShopContentsCooltime[i].text = min + ':' + sec;

                    list_sprPopupShopBtn[i].visible = false;

                    sprPopupShopBtn_disable[i].visible = true;
                    sprPopupShopBtn_disable[i].addChild(txtPopupShopContentsCooltime[i]);

                    sprPopupShopContentsInBtn[i].visible = false;
                }else  if(shopListData.length > 1 && shopListData[0].mkidx >= 0){
                    if(txtPopupShopContentsCooltime[i].visible){
                        // list_sprPopupShopBtn[i].texture = PIXI.Texture.fromFrame('btn_shop_2.png');

                        sprPopupShopBtn_disable[i].visible = false;

                        list_sprPopupShopBtn[i].visible = true;
                        list_sprPopupShopBtn[i].addChild(txtPopupShopContentsCooltime[i]);

                        txtPopupShopContentsCooltime[i].visible = false;
                        sprPopupShopContentsInBtn[i].visible = true;
                    }
                }
            }
			break;
	}
};

/** 하트 구매 했을 경우 쿨타임 지정해 주기
 */
var AD_TYPE = {
	HEART : 0,
	GAME_MONEY : 1
};

var cooltimeMaxTime = 600; // 10분
CoinLifeView.prototype.ADCooltime = function(_payIndex){

	switch(type_data){
		case AD_TYPE.HEART:
            if(shopListData[_payIndex].pType.indexOf('ad') != -1 && apkTF == 1)
                kData.fCooltime_Heart[_payIndex] = cooltimeMaxTime;
			break;
		case AD_TYPE.GAME_MONEY:
            if(shopListData[_payIndex].pType.indexOf('ad') != -1 && apkTF == 1)
                kData.fCooltime_Gamemoney[_payIndex] = cooltimeMaxTime;
			break;
	}
};