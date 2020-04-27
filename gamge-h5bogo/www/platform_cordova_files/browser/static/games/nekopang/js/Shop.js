var tbShop_json = "[{\"icon\":\"film_no_1.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":100,\"reward\":5,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_2.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":300,\"reward\":25,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_3.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":500,\"reward\":55,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_4.png\",\"bg\":\"list_2.png\",\"market\":0,\"pType\":\"point\",\"Price\":1000,\"reward\":130,\"login\":1,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_1.png\",\"bg\":\"list_1.png\",\"market\":1,\"pType\":\"point\",\"Price\":100,\"reward\":5,\"login\":1,\"membersOnly\":1,\"btnbg\":\"btn_shop_1.png\"},{\"icon\":\"film_no_3.png\",\"bg\":\"list_1.png\",\"market\":1,\"pType\":\"point\",\"Price\":600,\"reward\":40,\"login\":1,\"membersOnly\":1,\"btnbg\":\"btn_shop_1.png\"},{\"icon\":\"film_no_1.png\",\"bg\":\"list_2.png\",\"market\":1,\"pType\":\"ad_1\",\"Price\":0,\"reward\":5,\"login\":0,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"},{\"icon\":\"film_no_3.png\",\"bg\":\"list_2.png\",\"market\":1,\"pType\":\"ad_2\",\"Price\":0,\"reward\":30,\"login\":0,\"membersOnly\":0,\"btnbg\":\"btn_shop_2.png\"}]";
var tbShop = JSON.parse(tbShop_json);

Shop = function(parent)
{
//	this.market = 0;
//	this.bLogin = true;
	this.main = new PIXI.Container();
	parent.addChild(this.main);	
	//===============================================================================
	// 필름샵 구성 (야후용)
	this.shop_Yahoo = new PIXI.Container();
	// 검은색 배경
	var spr = SpriteLoad(this.shop_Yahoo, "white.png", iCenterSizeX/4, iCenterSizeY/4);
	spr.scale.set(iMaxSizeX, iMaxSizeY);
	spr.tint = 0x000000;
	spr.alpha = 0.9;
	spr.interactive = true;
	spr.on('click', this.cbButtonWhite);
	spr.on('tap', this.cbButtonWhite);
	
	spr = SpriteSliceLoad(this.shop_Yahoo, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 950);
	var spr2 = SpriteLoad(spr, "title.png", 0, -412);
	FontLoad(spr2, GetString("FILMSHOP"), 0, 3, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 810);

	// 상단 포인트
	var spr3 = SpriteSliceLoad(spr2, "point_bg.png", 0, -350, 300, 60);
	spr3.interactive = true;
	spr3.on('click', this.cbButtonLogin.bind(this));
	spr3.on('tap', this.cbButtonLogin.bind(this));
	this.sprPointIcon = SpriteLoad(spr3, "point.png", -150, 0);
	this.txtPoint = FontLoad(spr3, "0", 10, 2, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', padding:2, stroke:'#005653', strokeThickness:6});
	this.btnPointBuy = new Button(spr3, "btn_plus.png", 150, 0, this.cbButtonPointBuy, "scaleDown");
	this.btnPointBuy.visible = false;
	
	// 메뉴구성.
	this.sprBG = [];
	this.sprBGType = [];
	this.btnBG = [];
	this.btnBGType = [];
	this.icon = [];
	this.iconM = [];
	this.txtRewardNum = [];
	this.txtPrice = [];
	this.sprPrice = [];
	this.txtMembersOnly = [];
	this.sprBGType[0] = SpriteSliceLoad(this.main, "list_1.png", 0, 0, 610, 150);
	this.sprBGType[1] = SpriteSliceLoad(this.main, "list_2.png", 0, 0, 610, 150);
	this.sprBGType[0].visible = false;
	this.sprBGType[1].visible = false;
	this.btnBGType[0] = SpriteSliceLoad(this.main, "btn_shop_1.png", 0, 0, 186, 82);
	this.btnBGType[1] = SpriteSliceLoad(this.main, "btn_shop_2.png", 0, 0, 186, 82);
	this.btnBGType[2] = SpriteSliceLoad(this.main, "btn_shop_cooltime.png", 0, 0, 186, 82);
	this.btnBGType[0].visible = false;
	this.btnBGType[1].visible = false;
	this.btnBGType[2].visible = false;
	for(var i=0;i<4;++i){
		this.sprBG[i] = SpriteSliceLoad(spr2, tbShop[i].bg, 0, -230 + (145*i), 610, 150);
		this.icon[i] = SpriteLoad(this.sprBG[i], tbShop[i].icon, -170, -3);
		this.txtRewardNum[i] = BitmapFontLoad(this.sprBG[i], "x"+tbShop[i].reward, 5, -15, 0.5, 0.5,
				{font:'65px shop_no', align:'center', tint: 0xffffff});
		this.btnBG[i] = SpriteSliceLoad(this.sprBG[i], tbShop[i].btnbg, 0, 0, 186, 82);
		var spr4 = new Button(this.sprBG[i], "btn_start.png", 185, 0, eval("this.cbButtonClick"+i+".bind(this)"), "scaleDown", 1, 1, 0.5, 0.5, this.btnBG[i]);
		this.iconM[i] = SpriteLoad(spr4.sprite, "gold_1.png", 0, 5);
		this.iconM[i].scale.set(0.6);
		this.iconM[i].visible = false;
		this.txtPrice[i] = FontLoad(spr4.sprite, tbShop[i].Price, 0, -5, 0.5, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'32px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#015754', strokeThickness:6});
		this.sprPrice[i] = SpriteLoad(spr4.sprite, "shop_movie.png", 0, -5);
		this.sprPrice[i].visible = false;
		this.txtMembersOnly[i] = FontLoad(this.sprBG[i], GetString("MembersOnly"), -230, -45, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'25px', fontWeight:'bold', align:'center', fill:'#ffffff', padding:2, stroke:'#000000', strokeThickness:4});
	}
	
	// todo : kook : 일본대응 임시 추가.
//	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, 42, 620, 810);
//	for(var ii=0;ii<9;++ii){
//		spr2.children[ii].tint = 0x000000;
//		spr2.children[ii].alpha = 0.8;
//	}
//	spr2.interactive = true;
//	FontLoad(spr2, "COMING SOON", 0, 0, 0.5, 0.5,
//		{fontFamily:tbTTF[lang], fontSize:'70px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	// todo : kook : 일본대응 임시 추가. end

	// OK버튼
	spr3 = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 250, 97);
	FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 0, 340, this.cbButtonClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
	this.main.addChild(this.shop_Yahoo);
	//===============================================================================
	// 성공 팝업구성.
	this.popup_success = new PIXI.Container();
	spr = SpriteLoad(this.popup_success, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX, iMaxSizeY);
	spr.tint = 0x000000;
	spr.alpha = 0.7;
	spr.interactive = true;
	spr.on('click', this.cbButtonWhite);
	spr.on('tap', this.cbButtonWhite);
	
	spr = SpriteSliceLoad(this.popup_success, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 410);
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, -3, 620, 350);
	spr3 = SpriteSliceLoad(spr2, "list_1.png", 0, -90, 350, 140);
	this.popup_success_icon = SpriteLoad(spr3, "film_no_1.png", 0, -5);
	this.popup_success_txtRewardNum = BitmapFontLoad(spr3, "x60", 160, -45, 1, 0.5,
			{font:'50px shop_no', align:'center', tint: 0xffffff});
	this.popup_success_txtContents = FontLoad(spr2, "Acquired 50 hearts!", 0, 15, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00887B', strokeThickness:8});
	
	spr3 = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 250, 97);
	FontLoad(spr3, "OK", 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 0, 110, this.cbButtonPopupSuccessClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
	this.popup_success.visible = false;
	this.main.addChild(this.popup_success);
	//===============================================================================
	// 에러 팝업구성.
	this.popupState = 0;	// 0:로그인경고창..
	this.popup_error = new PIXI.Container();
	spr = SpriteLoad(this.popup_error, "white.png", iCenterSizeX, iCenterSizeY);
	spr.scale.set(iMaxSizeX, iMaxSizeY);
	spr.tint = 0x000000;
	spr.alpha = 0.7;
	spr.interactive = true;
	spr.on('click', this.cbButtonWhite);
	spr.on('tap', this.cbButtonWhite);
	
	spr = SpriteSliceLoad(this.popup_error, "popup_select.png", iCenterSizeX, iCenterSizeY, 670, 410);
	spr2 = SpriteSliceLoad(spr, "popup_in.png", 0, -3, 620, 350);
	this.popup_error_txtContents = FontLoad(spr2, "", 0, -60, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00887B', strokeThickness:8});
	
	spr3 = SpriteSliceLoad(spr2, "btn_no.png", 0, 0, 250, 97);
	FontLoad(spr3, GetString("NO"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_no.png", -150, 110, this.cbButtonPopupErrorClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3); 
	spr3 = SpriteSliceLoad(spr2, "btn_start.png", 0, 0, 250, 97);
	FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:4, dropShadowAngle:Math.PI/3});
	new Button(spr2, "btn_start.png", 150, 110, this.cbButtonPopupErrorOK.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
	this.popup_error.visible = false;
	this.main.addChild(this.popup_error);
	//===============================================================================
	// 캐쉬샵 구성 (야후용)
	if(proto.serPos == 1){
		this.shop_Cash = new PIXI.Container();
		// 검은색 배경
		spr = SpriteLoad(this.shop_Cash, "white.png", iCenterSizeX/4, iCenterSizeY/4);
		spr.scale.set(iMaxSizeX, iMaxSizeY);
		spr.tint = 0x000000;
		spr.alpha = 0.4;
		spr.interactive = true;
		spr.on('click', this.cbButtonWhite);
		spr.on('tap', this.cbButtonWhite);

		spr = SpriteSliceLoad(this.shop_Cash, "popup_gold_top.png", iCenterSizeX, iCenterSizeY - 495 + 30, 660, 100);
		FontLoad(spr, GetString("MSHOP"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'55px', fontWeight:'bold', align:'center', fill:'#ffffff', dropShadow:true, dropShadowColor:'#424242', dropShadowDistance:5, dropShadowAngle:Math.PI/3});
		spr2 = SpriteSliceLoad(this.shop_Cash, "popup_gold_bottom.png", iCenterSizeX, iCenterSizeY + 50 + 30, 660, 990);

		// 상단 포인트
		spr3 = SpriteSliceLoad(spr2, "gold_bg.png", 0, -450, 300, 60);
		SpriteLoad(spr3, "gold_2.png", -150, 0);
		this.txtMPoint = FontLoad(spr3, "0", 10, 2, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff'});

		// 메뉴구성.
		this.txtMRewardNum = [];
		this.txtDiscount = [];
		this.txtMPrice = [];
		var tbTMRewardNum = [200, 650, 2300, 4100, 8100, 18000];
		var tbTMDiscount = [0, 8, 21, 36, 36, 36];
		var tbTMPrice = [240, 720, 2300, 3600, 6800, 10200];
		for(var i=0;i<6;++i){
			spr3 = SpriteSliceLoad(spr2, "list_3.png", 0, -330 + (124*i), 610, 112);
			SpriteLoad(spr3, "gold_2.png", -240, 0);
			this.txtMRewardNum[i] = FontLoad(spr3, GetComma(tbTMRewardNum[i]), -180, -15, 0, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
			spr = FontLoad(spr3, "BONUS", -180, 25, 0, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'24px', fontWeight:'bold', align:'center', fill:'#35495c'});
			this.txtDiscount[i] = FontLoad(spr, "+" + tbTMDiscount[i] + "%", spr.width + 5, 0, 0, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'24px', fontWeight:'bold', align:'center', fill:'#ffff00'});
			spr = SpriteSliceLoad(spr3, "btn_gold.png", 0, 0, 190, 70);
			var spr4 = new Button(spr3, "btn_gold.png", 185, 0, eval("this.cbButtonMClick"+i+".bind(this)"), "scaleDown", 1, 1, 0.5, 0.5, spr);
			this.txtMPrice[i] = FontLoad(spr4.sprite, "￥" + GetComma(tbTMPrice[i]), 0, 0, 0.5, 0.5,
				{fontFamily:tbTTF[lang], fontSize:'30px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#5f6e7c', strokeThickness:5});
		}
		// OK버튼
		spr3 = SpriteSliceLoad(spr2, "btn_ok_gold.png", 0, 0, 250, 97);
		FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
		new Button(spr2, "btn_ok_gold.png", 0, 420, this.cbButtonClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);

		this.shop_Cash.visible = false;
		this.main.addChild(this.shop_Cash);
		//===============================================================================
		// 캐쉬샵 성공 팝업구성.
		this.popup_Msuccess = new PIXI.Container();
		spr = SpriteLoad(this.popup_Msuccess, "white.png", iCenterSizeX, iCenterSizeY);
		spr.scale.set(iMaxSizeX, iMaxSizeY);
		spr.tint = 0x000000;
		spr.alpha = 0.7;
		spr.interactive = true;
		spr.on('click', this.cbButtonWhite);
		spr.on('tap', this.cbButtonWhite);

		spr = SpriteSliceLoad(this.popup_Msuccess, "popup_message_gold.png", iCenterSizeX, iCenterSizeY, 560, 410);
		spr3 = SpriteSliceLoad(spr, "list_3.png", 0, -90, 350, 130);
		this.popup_Msuccess_sprIcon = SpriteLoad(spr3, "gold_2.png", 0, 0);
		this.popup_Msuccess_txtRewardNum = FontLoad(spr3, "18,000", 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
		this.popup_Msuccess_sprIcon.position.set(-this.popup_Msuccess_txtRewardNum.width/2 - 5, 0);
		this.popup_Msuccess_txtRewardNum.position.set(this.popup_Msuccess_sprIcon.width/2 + 5, 0);
		this.popup_Msuccess_txtContents = FontLoad(spr, "Acquired 50 hearts!", 0, 25, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'35px', fontWeight:'bold', align:'center', fill:'#ffffff', stroke:'#00887B', strokeThickness:8});

		spr3 = SpriteSliceLoad(spr, "btn_ok_gold.png", 0, 0, 250, 97);
		FontLoad(spr3, GetString("OK"), 0, 0, 0.5, 0.5,
			{fontFamily:tbTTF[lang], fontSize:'50px', fontWeight:'bold', align:'center', fill:'#ffffff'});
		new Button(spr, "btn_start.png", 0, 120, this.cbButtonPopupMSuccessClose.bind(this), "scaleDown", 1, 1, 0.5, 0.5, spr3);
		this.popup_Msuccess.visible = false;
		this.main.addChild(this.popup_Msuccess);
	}
	this.main.visible = false;
}

Shop.prototype.Update = function()
{
	if(kShop.main.visible == true){
		for(i=0;i<4;++i) {
			if(kData.fADTime[i] != -1){
				if((Date.now() - kData.fADTime[i])/1000 < 600)
					kShop.txtPrice[i].text = GetTime(Mathfloor(600 - ((Date.now() - kData.fADTime[i]) / 1000)));
				else {
					kData.fADTime[i] = -1;
					this.SetMenu(tbShop[i + 4].pType, i);
					//SaveDataInClient();
					networkManager.ForcedSaveData();
				}
			}
		}
	}
}

Shop.prototype.SetMenu = function(type, i)
{
	switch (type) {
		case "member":
		case "point":
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			if(proto.serPos == 0){
				this.txtPrice[i].text;
				this.txtPrice[i].position.set(0, -5);
				this.iconM[i].visible = true;
				this.iconM[i].position.set((-this.txtPrice[i].width/2), -5);
				this.txtPrice[i].position.set(this.iconM[i].width/2, -5);
				this.txtMembersOnly[i].visible = true;
				SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[0]);
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[0]);
			}else{
				this.iconM[i].visible = true;
				this.iconM[i].position.set((-this.txtPrice[i].width/2), -5);
				this.txtPrice[i].position.set(this.iconM[i].width/2, -5);
				this.txtMembersOnly[i].visible = false;
				SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			}
			break;
		case "ad_1":
			this.iconM[i].visible = false;
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			this.txtPrice[i].text = "AD";
			this.txtMembersOnly[i].visible = false;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			if(kData.fADTime[i] == -1)
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			else
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[2]);
			break;
		case "ad_2":
			this.iconM[i].visible = false;
			this.txtMembersOnly[i].visible = false;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			if(kData.fADTime[i] == -1) {
				this.txtPrice[i].visible = false;
				this.sprPrice[i].visible = true;
				this.sprPrice[i].texture = PIXI.Texture.fromFrame("shop_movie.png");
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			}
			else {
				this.txtPrice[i].visible = true;
				this.sprPrice[i].visible = false;
				SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[2]);
			}
			break;
		case "ad_3":
			this.iconM[i].visible = false;
			this.txtPrice[i].visible = false;
			this.sprPrice[i].visible = true;
			this.sprPrice[i].texture = PIXI.Texture.fromFrame("shop_down.png");
			this.txtMembersOnly[i].visible = false;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			break;
		case "pay":
			this.iconM[i].visible = false;
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			this.txtPrice[i].text += "￥";
			this.txtMembersOnly[i].visible = true;
			SlicedSpriteChangeTexture(this.sprBG[i], this.sprBGType[1]);
			SlicedSpriteChangeTexture(this.btnBG[i], this.btnBGType[1]);
			break;
	}
}

Shop.prototype.Show = function()
{
	SESoundPlay(SE_ButtonClick);
	if(this.main.visible == true) return;
	if(networkManager.networkState != NET_STATE.LOCALHOST) {
		networkManager.GetShoplist(ShopType.HEART, function () {
			SESoundPlay(SE_PopupOn);
			this.main.visible = true;
			this.shop_Yahoo.visible = true;	// 현재는 한개만 사용하고 있음. 일본, 국내 다 같이 사용..
			TweenMax.fromTo(this.shop_Yahoo.children[0], 0.5, {alpha: 0},
				{alpha: 0.9, ease: Linear.easeNone});
			TweenMax.fromTo(this.shop_Yahoo.children[1], 1, {as: 0.5},
				{as: 1, ease: Elastic.easeOut});

			var i = 0;
			if (loginTF == 1) {	// 로그인상태..
				switch (proto.serPos) {
					case 0: // 글로벌버젼
						this.txtPoint.text = GetComma(kData.iMoviPoint);
						this.btnPointBuy.visible = false;
						this.sprPointIcon.texture = PIXI.Texture.fromFrame("point.png");
						for (i = 0; i < 4; ++i) {
							this.icon[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
							this.txtPrice[i].text = GetComma(shopListData[i].Price);
							this.SetMenu(shopListData[i].pType, i);
							this.txtRewardNum[i].text = "x" + shopListData[i].Quantity;
						}
						break;
					case 1: // 야후버젼
						this.txtPoint.text = GetComma(kData.iMoviPoint);
						this.btnPointBuy.visible = true;
						this.sprPointIcon.texture = PIXI.Texture.fromFrame("gold_1.png");
						for (i = 0; i < 4; ++i) {
							this.icon[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
							this.txtPrice[i].text = GetComma(shopListData[i].Price);
							this.SetMenu(shopListData[i].pType, i);
							this.txtRewardNum[i].text = "x" + shopListData[i].Quantity;
						}
						break;
				}
			} else { // 로그아웃 상태..
				this.btnPointBuy.visible = false;
				this.sprPointIcon.texture = PIXI.Texture.fromFrame("point.png");
				this.txtPoint.text = GetString("Login");
				for (i = 0; i < 4; ++i) {
					this.icon[i].texture = PIXI.Texture.fromFrame(shopListData[i].icon);
					this.txtPrice[i].text = GetComma(shopListData[i].Price);
					this.SetMenu(shopListData[i].pType, i);
					this.txtRewardNum[i].text = "x" + shopListData[i].Quantity;
				}
			}
		}.bind(this));
	}else{	// 로컬에서 사용할때 처리..
		this.main.visible = true;
		this.shop_Yahoo.visible = true;	// 현재는 한개만 사용하고 있음. 일본, 국내 다 같이 사용..
		TweenMax.fromTo(this.shop_Yahoo.children[0], 0.5, {alpha: 0},
			{alpha: 0.9, ease: Linear.easeNone});
		TweenMax.fromTo(this.shop_Yahoo.children[1], 1, {as: 0.5},
			{as: 1, ease: Elastic.easeOut});

		this.btnPointBuy.visible = false;
		this.sprPointIcon.texture = PIXI.Texture.fromFrame("point.png");
		for (var i = 0; i < 4; ++i) {
			this.icon[i].texture = PIXI.Texture.fromFrame(tbShop[i + 4].icon);
			this.txtPrice[i].vislble = true;
			this.sprPrice[i].visible = false;
			this.txtPrice[i].text = GetComma(tbShop[i + 4].Price);
			this.SetMenu(tbShop[i + 4].pType, i);
			this.txtRewardNum[i].text = "x" + tbShop[i + 4].reward;
		}
		this.txtPoint.text = GetString("Login");
	}
}

Shop.prototype.ShowPopup = function(type)
{
	switch(type){
		case 0:	// 로그인하지 않았을때 포인트 버튼을 눌렀을경우
			kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
			/*networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL,GetString('signup'),
				function(){networkManager.JoinMember();},
				function(){}
			);*/
		//	this.popupState = 0;
		//	this.popup_error.visible = true;
		//	this.popup_error_txtContents.text = GetString("PopupLogin");
			break;
		case 1: // 포인트가 모자랄때 포인트 버튼을 눌렀을 경우.
			this.popupState = 1;
			this.popup_error.visible = true;
			this.popup_error_txtContents.text = GetString("PopupLogin");
			break;
		case 2: // apk접속이 아닐경우 광고클릭시 apk를 설치하라는 메세지 출력..
			this.popupState = 2;
			this.popup_error.visible = true;
			this.popup_error_txtContents.text = GetString("PopupLogin");
			break;
	}
}

Shop.prototype.cbButtonPointBuy = function()
{
	location.href = yahooInappURL;
}

Shop.prototype.cbButtonLogin = function()
{
	if(loginTF == 0)
		this.ShowPopup(0);
}

Shop.prototype.cbButtonClick0 = function(){this.cbButtonClick(0);}
Shop.prototype.cbButtonClick1 = function(){this.cbButtonClick(1);}
Shop.prototype.cbButtonClick2 = function(){this.cbButtonClick(2);}
Shop.prototype.cbButtonClick3 = function(){this.cbButtonClick(3);}
Shop.prototype.cbButtonClick = function(i)
{
	if(networkManager.networkState != NET_STATE.LOCALHOST) {
		if (shopListData[i].pType == "point") {	// 포인트일경우..비로그인과 로그인을 비교해서 출력해준다.
			if (loginTF != 0) {	// 로그인상태일때 포인터를 비교해서
				if (kData.iMoviPoint >= shopListData[i].Price)	// 포인트가 많이 있으면 결제 진행, 없으면 포인트 없음 팝업창 띄우기
					this.ShowPopupSuccess(i);
				else {
					if(yahooIN === undefined)
						kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
					else
						kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
				//	networkManager.ModalCall(MODAL_BUTTON_TYPE.OKONLY,GetString('lowpoint'),
				//		function(){}
				//	);
				}
			} else {// 비로그인일경우 팝업창을 띄워 로그인 및 회원가입을 유도한다.
				this.ShowPopup(0);
			}
		} else if (shopListData[i].pType == "ad_1" || shopListData[i].pType == "ad_2") {
			if (kData.fADTime[i] == -1)
				this.ShowPopupSuccess(i);
		} else if (shopListData[i].pType == "member"){
			this.ShowPopup(0);
		} else {
			this.ShowPopupSuccess(i);
		}
	}else{
		if(tbShop[i + 4].pType == "ad_1" || tbShop[i + 4].pType == "ad_2"){
			if(kData.fADTime[i] == -1) {
				kData.fADTime[i] = Date.now();	// 나중에 광고가 끝난다음에 시간을 셋팅하게 변경하던가 한다.
				kShop.txtPrice[i].text = "10:00";
				kShop.txtPrice[i].visible = true;
				kShop.sprPrice[i].visible = false;
				SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);

				kData.iLife += tbShop[i + 4].reward;
				kShop.popup_success.visible = true;
				kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(tbShop[i].icon);
				kShop.popup_success_txtRewardNum.text = "x" + tbShop[i + 4].reward;
				kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", tbShop[i + 4].reward);
			}
		}else{
			kData.iLife += tbShop[i + 4].reward;
			kShop.popup_success.visible = true;
			kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(tbShop[i].icon);
			kShop.popup_success_txtRewardNum.text = "x" + tbShop[i + 4].reward;
			kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", tbShop[i + 4].reward);
		}
		//SaveDataInClient();
		networkManager.ForcedSaveData();
	}
}

// pType : point,pay,ad_1,ad_2,ad_3,member
Shop.prototype.ShowPopupSuccess = function(i)
{
	networkManager.Payment(shopListData[i].mkidx, function () {
		if (loginTF == 1) {	// 로그인상태
			kShop.txtPoint.text = GetComma(kData.iMoviPoint);
			if(shopListData[i].pType == "point") {
				if (kData.iMoviPoint >= shopListData[i].Price)
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[0]);
				else
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);
			}else if(shopListData[i].pType == "ad_1" || shopListData[i].pType == "ad_2"){
				if(apkTF == 1) {	// 광고 상품일경우 타이머체크
					kData.fADTime[i] = Date.now();	// 나중에 광고가 끝난다음에 시간을 셋팅하게 변경하던가 한다.
					kShop.txtPrice[i].text = "10:00";
					kShop.txtPrice[i].visible = true;
					kShop.sprPrice[i].visible = false;
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);
				}
			}

			kShop.popup_success.visible = true;
			kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(shopListData[i].icon);
			kShop.popup_success_txtRewardNum.text = "x" + shopListData[i].Quantity;
			kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", shopListData[i].Quantity);
		//	SaveDataInClient();
		} else {	// 로그아웃상태..
			if(shopListData[i].pType == "ad_1" || shopListData[i].pType == "ad_2"){
				if(apkTF == 1) {	// 광고 상품일경우 타이머체크
					kData.fADTime[i] = Date.now();	// 나중에 광고가 끝난다음에 시간을 셋팅하게 변경하던가 한다.
					kShop.txtPrice[i].text = "10:00";
					kShop.txtPrice[i].visible = true;
					kShop.sprPrice[i].visible = false;
					SlicedSpriteChangeTexture(kShop.btnBG[i], kShop.btnBGType[2]);
				}
			}

			kData.iLife += shopListData[i].Quantity;
			kShop.popup_success.visible = true;
			kShop.popup_success_icon.texture = PIXI.Texture.fromFrame(tbShop[i].icon);
			kShop.popup_success_txtRewardNum.text = "x" + shopListData[i].Quantity;
			kShop.popup_success_txtContents.text = GetString("shop_popup_success_contents", shopListData[i].Quantity);
		//	SaveDataInClient();
		}
		networkManager.ForcedSaveData();
	});
}

Shop.prototype.cbButtonPopupErrorClose = function()
{
	this.popup_error.visible = false;
}

Shop.prototype.cbButtonPopupErrorOK = function()
{
	switch(this.popupState){
		case 0:
			networkManager.JoinMember();
			this.popup_error.visible = false;
			break;
		case 1:
			this.popup_error.visible = false;
			break;
		case 2:
			this.popup_error.visible = false;
			break;
	}
}

Shop.prototype.cbButtonPopupSuccessClose = function()
{
	this.popup_success.visible = false;
}

Shop.prototype.cbButtonClose = function()
{
	SESoundPlay(SE_PopupOff);
	TweenMax.fromTo(kShop.shop_Yahoo.children[0], 0.2, {alpha:0.9},
		{alpha:0, ease:Linear.easeNone});
	TweenMax.fromTo(kShop.shop_Yahoo.children[1], 0.2, {as:1},
		{as:0, ease:Linear.easeNone, onComplete:this.cbTweenClose.bind(this)});
}

Shop.prototype.cbTweenClose = function()
{
	this.main.visible = false;
	CloseWarningPopup();
}

Shop.prototype.cbButtonWhite = function()
{
	// 검은색 알파 배경 클릭이라 아무짓도 하지 않는다.
}

//=================================================================================================
Shop.prototype.ShowCashShop = function()
{

}
// 일본상점
Shop.prototype.cbButtonMClick0 = function(){this.cbButtonClick(0);}
Shop.prototype.cbButtonMClick1 = function(){this.cbButtonClick(1);}
Shop.prototype.cbButtonMClick2 = function(){this.cbButtonClick(2);}
Shop.prototype.cbButtonMClick3 = function(){this.cbButtonClick(3);}
Shop.prototype.cbButtonMClick4 = function(){this.cbButtonClick(4);}
Shop.prototype.cbButtonMClick5 = function(){this.cbButtonClick(5);}
Shop.prototype.cbButtonMClick = function(i)
{
}

Shop.prototype.cbButtonPopupMSuccessClose = function()
{

}

var crossBanner;
var base64_BG_Type0 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtAAAACtCAYAAACZdEiqAAAOtElEQVR4nO3db2xd5X3A8d9NrmPjJPxJYuokjBjikQUHCP9iWFmBJWhkaCpsmSBohAYhEapURHuzoKZCaJOAlwjEH4l1TakS0JBGXqAINWGUTWKwshbi0EKD8GgAC5eSERLFiYP3wtzr4+NrO4/v9Z/Qz0c6uude3/v43DfR10+ec04hpr7CZB8AAAATpm+yD2A0Uy1O88dTGOV1AABOXvlY7hvl9SmhONkHEINjOBvMhQrPK30GAICTU19uvy+3XymcJz2mJzOg87PLhdw2rcJr2ffn9wEAODnkw7n0mN2+rPDacGNMqMkI6OGCORvN02JwQE+r8LnsWAAAnDzy0Vzaz0bzl5nnI8X0hIf0RAZ0PnrzsTzSlg3piMERDQDAyScbwpXCeaSt9L78eBNiogI6P3ucD+TpmcfpudcqhXR+TAAATg6V1j1XCufjmcfjude+jP4G/DIzTiEmKKInIqArLdPIxnJpK+b2K0V0pZloAABOLqPNPJdCuTcGAjq7X9oKuTGyY4+b8Qzo4Wad89FcacvHdX5ddH58AABODvnQza93zkdy7zDbtBg8Oz1hSzrGK6ArxXM+nOsyj6X9QRF94403tq5evfraxYsXL21ubp4/d+7cM2bPnt1QX19fLBaL08fp2AEAGGe9vb1f9vT0HDt48OCRTz/99LOurq6P33vvvV/t3Lnz359//vl9UTmej321Tf/qsdSax78adkKWdIzH7G02nrPLL7JxXIrmGZn9uogo3nTTTUtuu+22tStWrGhfuHDhGeNwfAAATGEffvjhZ6+//vpr27Zt2/7cc8+9E4Pj+VhEHM3sZwM7f6JhxDhE9HgFdKUlG9lQnpF5nBERdRs3brzi9ttvv+vSSy/9k0KhYFkGAMAfuL6+vr433njj11u3bn3y0Ucf/a8YiOejMTSkj8XQJR3D3YylKrUO1ezJgvl1zqVgro+BcJ6xatWqs++///4tV1555XLdDABAXl9fX7z66qu/vO+++/5p165dH8RARB+NiJ4YCOnSTHQppEe6o+GY1bJY81fayK51LgVzfWQC+uGHH15355133tnY2DijhscBAMDX0OHDh48+9dRTT91zzz0/jsEB3RODZ6ZLEZ2/AUtN1CqgszdHycdzXQyEc31E1Dc3N5+2bdu2B6+99toVNfr9AKPq6T4UPZ8cjoiI+jMbo75p5iQfEQBj8fLLL//32rVr/6Grq+v/YiCgR4ro7MmFVatlQI8089wQ/fHc0NbW1vTss88+3tbW1lKj3w1wQn77k47439v+JyIiFj19SfzR3y2rarxDnQfi/Qd/HhERsy6aGy13X1z1MU4lvYePxed7PolDv/ksIiJm/vEZMad94SQfFUC/vXv3dt5888137927tzsijkR/QB+J0Weiq1aLy9hVWrqRjejyzHNra+u8HTt2/HDx4sXza/B7ASbV8UPH4sCTH/U/uevEPtP5+C/iizc/jYiIczZfFjNbTk/6nT3dh+KTF98f9X2nXfyNOLWtKSL6/3AoKf3RUOm1rO7dnfHehteid1/PoNcbrp4dS3907ajHPdr4ANVqa2tr2bFjxw+vv/769fv27ev+6uX8TVkqLd+oOqJrMQOdv+JGdtlGQ2lrbm4+/aWXXvrR0qVLz67B7wQY4j8LP67peFf1ratq/Eqz3B0bdpWj+8KO1eXIPVGf7+2Ot5btTPrd2eMufadKr5V07+6Md1a9MuzYxdb6uOCnfzFiRI80PkAtvf322x+sXLnyO11dXQeifwa6tPXE4Ktz5C9vN2bTRn/LiIabfc5erm5GRMzYtm3bg+IZYGrrPXws3tvwWvn5oqcviav61sXln/xNzNvc0v+efT3lpSsAk+38888/e/v27Q9FpjtjoEVLbVq6m3Vpq0otl3Bk1z8XI3Ot50ceeeQ7ThgExtuipy8Z8trxg8di/3f3lJ/PWjMvert74sjPDpZfO+uxC2L67Lqk8T+8f++Q5Q0REfM2t8TMtjkR0b+MIrtkIyLii92fDvlMilPbmoad0c2u8e7Zfyg+39td8X0j+ezVD8vf6/S7FpRnseubZkbrD66MA899HL37euLAkx9Fzz8eciImMCVcc801lz/66KPrN27c+M8x9Fbg2Zur1OTuhNUEdH72udLVN2bccMMNi++44447qj1QgNHkl0sc6jwQe657sfx81pp5sWzrdRER0XH7T+OL534XERG/e7bzhNb1lsbv3t05KDLP/t5F5WUVvZ8dHXQcHzzy5sA66QnUde870XXvO8mfO/LxF+X9065qHvSzYmNdzFo5Nw7s6/8+PZ8cFtDAlLF+/fr1O3fufPmFF154NwZuA54N6WkxcIvviCpCutolHBHDnzxYFxF1W7Zs+b7rPAMT7fevfRh7rnuxHLrNDyyJ5f/6l1FsrItiY10s23pdND+wJCIijvzsYOy57sUTmrHNL3E4Z/NlcWpbU3l5w4EnP4ru3Z3ln8+6aG6cfteC8lZsra/dlxwHxdkD/1z37D805OdHfj0wcz995uiz9gATpbGxccaWLVu+H4Pvfl2Mocs4qlarNdClGehiZqvbtGnTN9vb251+DUyo7t2d8fYVu8vxvOjpS6J1c/ug9xQb66J1c3uc9dgFEdG/rvetZTsHxW8l+7d2lMc967ELyrPW5/z9peU4fm/Da9F7+FhERLTcfXEse2JVeZu1cm7NvudImh9YEhd2rI4LO1YnfW7Onw5cpq7r3ncG/VHx2590lJe+NFw9O/kKIgDjrb29fdmmTZu+GQPxXNpKrVqTNdBjDejhlm9k10AX161bt8HtuYGJtO/B1wZdQWLJrm+NeBm1lrsvjiW7vlV+/s6qV6Lz8V9UfG9P96Hyeupia32cdfvAuPVNM2PhfW0R0R/j+7d2VBxjotSfNTNObWtKvspHfdPM8h8VERFvLdsZHRt2xc+v+bfy+uqIiHMfcloLMPUUCoVYt27dhhhYEZGfga7JyYS1nIEetIRjzZo1S5YvX95a5fgAJ6T38LH4eMe7caTzYHm5xIUdq6NpZcuon21a2RIXdqwuf+6LNz+Nj3e8O+R9v/nBq+X9xU+0R7Fx8BKG+X+9JBqunh0REfu/uyd6uocugTgZtNx9cXl5S0T/spTsSZdLdn3LDVWAKWv58uWtt9xyy9IYmNStdCWOqlR7EuG03FY+yLVr195cMP0MTJBiY13M//Z5Mf/b543p86e2NcWyJ1YN+/NDnQciov+kwYaW2RXDvNhYF+c+tCI++pdfRUTEJy++P2T2+xt/21o+Oa/+zMYxHetEaN3cHmf+1bnx+1f2l68iMuuiuTF/zXkndOKgaz8Dk6VQKBRuvfXWW5955pm9MTC5m52BnhZVXg+6FlfhyC7hKM9EX3HFFVdWMTZAsuzd72ohG78zW04fMbBL5rQvHHF29kRmxKeKsSwBAZgKLr/88hUxdOlGzdZBjzWgCzHCOugbb7yxdcGCBWdUc2AAqbJrdGshP3ucPaFuKoZlw/xZcfpdC8r7YzXed3QEGG/Nzc2nrV27dun27dt/GcOvfx7zNaHHEtCF3H6+6qevXr36z8dyMABTWfYW2lMxCptWtpxUM9wA42nVqlXXbN++fU8MnYXOt2xyRNdqBnpQSC9evHjpGMcFGLPRojZ7p75FT18y4tU56Ffp7o4notb/GwCQatGiRefFQDBXmn2e0BnokuECutDc3Nw80gcBODmM9Y8MAQ1Mtvnz5zdHrlFz25jV8k6E5ZBuamqaU4NxAQBgTObNmzcnco0aU+hOhKXH8oHNnj37lCrHBQCAMWtsbKyPyuE8adeBzk595yM6TjnllLpKHwL4uujYsKvqMc7ZfNmUvx12Lb4nwGRoaGgo9WilpRtVLeOoZg10Vk2rHmCqO/DkR1WPcfx7x2pwJOOrFt8TYDIUi8WazzyXx67y8/l6F8/A11bpGsu1Mn3m1PzPulp/T4BJlm/Vqnt1LAMUYuC2iDMioj4iGiKiMSJmRkRjX1/ff1R7YAAAUI1CofBnEXE4Ig599XgkInoi4mhE9EbE8RjDpexqcRUOAAD4gyGgAQAggYAGAIAEAhoAABIIaAAASFCr60APUigUto/HuAAAMNnMQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACQQ0AAAkENAAAJBAQAMAQAIBDQAACf4feQ2GyhZ4kdMAAAAASUVORK5CYII=';
var base64_BG_Type1 = 'data:image/png;base64,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xBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxEkOMxBAjMcRIDDESQ4zEECMxxEgMMRJDjMQQIzHESAwxMgxTXY99ESPDMtX1fN4wxcigHaqZIfZFjAza/sOP7aPhVI+PzSBGBm2yGsE1R8i+9x/FyKC9UZ0hdk/bsxIjg/Z6TUfYHuW8BzFiZNB21HSEvWK0z8iiebGqDh5eDlXnCNnUM0gxMkivV9VrNTNGIyOLbmv1HhW7j6x7EiODtKWmYzxQc0/VM4iRQXm+GlP0gZoOsRmjy4EsmqmqergaEe6vmTF27zf2JEYGYWtVvVLTITaXvvcXq8TIwu2rqgerEWJz6TVNz0uMLNRPq2p3NaLsjrHvKbpKjCzMU4eXZoj7qvMApu8pukqMHL2Xq+qBagTYXJojY68jafuMDMWOqvpxVe2tmTH2mqL7MjrwzeT/uxer6p6qeqsa711sLrMduPQ9TYuRI/FUNabmvTUzxO5Rse8Im8RIP/ZVI8Kna3pKboY42xR9xHcIipG5TFXVb6rqv6vxDu72/cPmiNg8gj7iUzndxMhsnq2qR6tqoqajaz+F036S+6j3E9uJkXa7qzESPl3Tb3poj677xHb3Zb8jOnruJsYTz6FqxPR2Vb1ZjQB3VOMoeXdNv/2rfWkPsPuoudcBy1EFOVJVlxzNN3Lc6XUPc/u9Kge7lu4gu98a1msfsX39R2y0GofpnBiaoXTfStpcmoG1R9cd4BHfTtCv0aras9CVcFzo9btvumNsD/Jg1/O5biNYcIhVRsYTUXtEs42Qsy3Nr6sacIhVjRjfHtTKiNfrd950/+aH7vBmu+95YBE2jVbj5CUnhl73LveKrdf5wqFF2DRajXNHnFhm+92Jc41+Q4uwaaScazwRdYc126g39ADbjRxeYFHDAwAAAAAAAAAAgDb/Bwg4Yvzeh6kBAAAAAElFTkSuQmCC';
// 라이브러리타입, 부모, 리스트타입, x, y, 리스트갯수, 페이져용 game클래스,
function CrossBanner(_libType, parent, _type, _x, _y, _max, _game, atlasName){
    this.libType = _libType;
    this.type = _type;
    this.x = _x;
    this.y = _y;
    this.max = _max;
    this.game = _game;

    if(this.libType == "Phaser"){	// 페이져용 처리
        this.main = this.game.add.group();
        parent.addChild(this.main);
        this.main.position.set(this.x, this.y);

        switch (this.type) {
            case 0:		// 아래하단 4개배치..
                MG.game.load.image('base64_BG', base64_BG_Type0);
                MG.game.load.start();
                setTimeout(function(){
                    MG.AddSprite(this.main, 0, 0, 'base64_BG');

                    this.sprIcon = [];
                    for (var i = 0; i < this.max; ++i) {
                        this.sprIcon[i] = MG.AddSprite(this.main,  -255 + (i * 170), 22, atlasName, "white.png");
                        this.sprIcon[i].inputEnabled = true;
                        this.sprIcon[i].events.onInputUp.add(function(){
                            window.open(crossBanner.crossList[this._i].aLNK);
                        }.bind({_i:i}));
                    }
                }.bind(this), 1);
                break;
            case 1:		// 가로게임의 경우 왼쪽 3개배치..
                MG.game.load.image('base64_BG', base64_BG_Type1);
                MG.game.load.start();
                setTimeout(function() {
                    MG.AddSprite(this.main, 0, 0, 'base64_BG');

                    this.sprIcon = [];
                    for (var i = 0; i < this.max; ++i) {
                        this.sprIcon[i] = MG.AddSprite(this.main, -10, -210 + (i * 150), atlasName, "white.png");
                        this.sprIcon[i].inputEnabled = true;
                        this.sprIcon[i].events.onInputUp.add(function () {
                            window.open(crossBanner.crossList[this._i].aLNK);
                        }.bind({_i: i}));
                    }
                }.bind(this), 1);
                break;
        }
    }else {		// 픽시용 처리..
        this.main = new PIXI.Container();
        parent.addChild(this.main);
        this.main.position.set(this.x, this.y);

        switch(this.type){
            case 0:		// 아래하단 4개배치..
                SpriteLoadFromExtenalUrl(this.main, base64_BG_Type0, 0, 0);

                this.sprIcon = [];
                for(var i=0;i<this.max;++i) {
                    this.sprIcon[i] = SpriteLoad(this.main, "white.png", -255+(i*170), 22);
                    this.sprIcon[i].interactive = true;
                    var cb = function(){
                        window.open(crossBanner.crossList[this._i].aLNK);
                    }.bind({_i:i});
                    this.sprIcon[i].on('click', cb);
                    this.sprIcon[i].on('tap', cb);
                }
                break;
            case 1:		// 가로게임의 경우 왼쪽 3개배치..
                break;
        }
    }
    this.main.visible = false;
}
/*
CrossBanner.prototype.cbClick = function(){
	window.open(crossBanner.crossList[0].aLNK);
}
*/
CrossBanner.prototype.Show = function(){
    if(this.libType == "Phaser") {	// 페이져용 처리
        switch (this.type) {
            case 0:
                this.GetIcon(this.max, function (list) {
                    for (var i = 0; i < this.max; ++i) {
                        if(MG.game.cache.checkImageKey(list[i].gameinfoIdx) == false)
                            MG.game.load.image(list[i].gameinfoIdx, 'data:image/png;base64,' + list[i].iconRecom);
                    }
                    this.cbComplete = function(){
                        for (var i = 0; i < this.max; ++i)
                            this.sprIcon[i].loadTexture(crossBanner.crossList[i].gameinfoIdx);
                        MG.game.load.onLoadComplete.remove(this.cbComplete, this);
                    }
                    MG.game.load.onLoadComplete.add(this.cbComplete, this);
                    MG.game.load.start();
                    this.main.visible = true;
                    this.main.position.set(this.x, this.y);
                    MG.game.add.tween(this.main).to({y:this.y-173}, 500, Phaser.Easing.Linear.None).start();
                }.bind(this));
                break;
            case 1:
                this.GetIcon(this.max, function (list) {
                    for (var i = 0; i < this.max; ++i) {
                        if(MG.game.cache.checkImageKey(list[i].gameinfoIdx) == false)
                            MG.game.load.image(list[i].gameinfoIdx, 'data:image/png;base64,' + list[i].iconRecom);
                    }
                    this.cbComplete = function(){
                        for (var i = 0; i < this.max; ++i)
                            this.sprIcon[i].loadTexture(crossBanner.crossList[i].gameinfoIdx);
                        MG.game.load.onLoadComplete.remove(this.cbComplete, this);
                    }
                    MG.game.load.onLoadComplete.add(this.cbComplete, this);
                    MG.game.load.start();
                    this.main.visible = true;
                    this.main.position.set(this.x, this.y);
                    MG.game.add.tween(this.main).to({x:this.x+163}, 500, Phaser.Easing.Linear.None).start();
                }.bind(this));
                break;
        }
    }else{	// 픽시용 처리..
        this.GetIcon(this.max, function (list) {
            for (var i = 0; i < this.max; ++i)
                this.sprIcon[i].texture = PIXI.Sprite.fromImage('data:image/png;base64,' + list[i].iconRecom).texture;
            this.main.visible = true;
            this.main.position.set(this.x, this.y);
            TweenMax.to(this.main, 0.5, {y:this.y-173, ease:Linear.easeNone});
        }.bind(this));
    }
}

CrossBanner.prototype.GetIcon = function(cnt, callback){
    var url = "https://game.com/__api_naver/reqCrossList.php";
    var jsondata = {"nGix":Define.GIDX,"nGcnt":cnt};//encodeURIComponent("{\"mode\":\"GET_GAME_LIST\"}");
    $.ajax({
        url:url,
        dataType:"text",
        data:jsondata,
        jsonpCallback:"callback",
        success:function(data){
            data = JSON.parse(data);
            crossBanner.crossList = data.gameList;
            callback(data.gameList);
        }/*,
		error:function(err){
			// 따로 에러처리하지 않는다.
		}*/
    });
}

CrossBanner.prototype.Hide = function(){
    this.main.visible = false;
}