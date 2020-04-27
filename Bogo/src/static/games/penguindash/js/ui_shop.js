var GAME = GAME || {};
// GAME.flag_enum = {
//     logout : 0,
//     login : 1,
//     yahoo : 2
// };
//
// GAME.connect_flag = GAME.flag_enum.logout;
//
// GAME.fill_list1 = "#ffffff";
// GAME.stroke_list1 = "#0068b7";
// GAME.fill_list2 = "#b5f05e";
// GAME.stroke_list2 = "#575919";
//
// GAME.ad_coolTime1 = 60*10;
// GAME.ad_coolTime2 = 10;
// GAME.ad_coolTime3 = 60*10;
//
// GAME.pay_Point_0 = 0;//상점 greapPoint 0
// GAME.pay_Point_1 = 0;//상점 greapPoint 1

GAME.ad_coolTime = 60*10;
GAME.paySlot = undefined;//결제를 하는 슬롯 참조변수.(광고버튼에서사용)
var bPressYahooPay = false;
var bPayRank = false;//결제 점프 전 랭킹을 등록하는 건지 아닌지 확인하는 변수.

function UI_shop(parent){
    /**
     * test data
     * */
    if(networkManager.networkState !== NET_STATE.RUN_SERVER){
        shopListData = [
            {Price:100, Quantity:1000, mkidx:12, mtype:"login", pType:"point", icon:"shop_jewel_1.png"},
            {Price:1000, Quantity:5000, mkidx:13, mtype:"login", pType:"point", icon:"shop_jewel_2.png"},
            // {Price:1000, Quantity:5000, mkidx:14, mtype:"login", pType:"point", icon:"shop_jewel_3.png"},
            // {Price:1000, Quantity:5000, mkidx:15, mtype:"login", pType:"point", icon:"shop_jewel_4.png"}
            {Price:100, Quantity:1000, mkidx:14, mtype:"loginout", pType:"ad_1", icon:"shop_jewel_1.png"},
            {Price:100, Quantity:1500, mkidx:15, mtype:"loginout", pType:"ad_2", icon:"shop_jewel_4.png"}
        ];
    }
    /**
     * end
     * */

	this.popupShield = new PIXI.Graphics();
	parent.addChild(this.popupShield);
	this.popupShield.beginFill(0x000000, 0.6);
	this.popupShield.drawRect(0, 0, iMaxSizeX, iMaxSizeY);
	this.popupShield.endFill();
	this.popupShield.interactive = true;

	this.spr_bg = SpriteSliceLoad(parent, "pop_bg.png", iCenterSizeX, iCenterSizeY, 626, 948, 13, 13, 13, 13);
	this.spr_bg.interactive = true;

	this.btn_confirm = new GUMA.button(this.spr_bg, "btn_shop_ok.png", 0, 365);
	this.btn_confirm.setCallback(this.closePop, this);
	this.txt_confirm = FontLoad(this.btn_confirm.sprite, GAME.table_language["select03"][GAME.language], 0, 0
		, {font:"bold 35px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});//확인

	this.txt_title = FontLoad(this.spr_bg, GAME.table_language["shop01"][GAME.language], 0, -435
		, {font:"bold 65px "+GAME.fontName[GAME.language], fill:"#ffffff"});//보석상점

	this.spr_point = SpriteLoad(this.spr_bg, "point_jp.png", 0, -340);
    this.spr_point.on("click", goSignUp);
    this.spr_point.on("tap", goSignUp);
    function goSignUp(){
        if(bPressYahooPay){
            bPressYahooPay = false;
            return;
        }

        if(loginTF === 0){
            // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_modalMsg["signup"][GAME.language]
            //     , networkManager.JoinMember, null);
            kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
        }
    }
    this.spr_point.interactive = true;

    this.btn_yahooPay = new GUMA.button(this.spr_point, "btn_point_jp.png", (this.spr_point.width/2)-30.5, 0);
    this.btn_yahooPay.setCallback(function () {
        bPressYahooPay = true;
        bPayRank = true;
        // kData.iRankScore = GAME.engine.blockCount;
        networkManager.ForcedSaveData(true, function () {
            location.href = yahooInappURL;
        });
    });

    this.btn_yahooPay.sprite.visible = (yahooIN!==undefined);//default

	this.txt_greappoint = FontLoad(this.spr_point, "text", 0, 0
		, {font:"32px "+GAME.fontName[GAME.language], fill:"#ffffff"});
    if(!this.btn_yahooPay.sprite.visible) this.txt_greappoint.position.x += 25;

	this.startY = -220;
	this.interval = 142;

	this.arr_slots = [];

	this.arr_gameMoney = [];//각 상품별 지급되는 게임머니의 가격...

    for(i=0;i<4;++i){
        this.arr_gameMoney[i] = 0;
    }

	this.makeSlots();

	this.i = 0;
	this.length = 4;

	this.popupShield.visible = false;
	this.spr_bg.visible = false;
	this.spr_bg.scale.y = 0;
}

UI_shop.constructor = UI_shop;

UI_shop.prototype.makeSlots = function(){
	var i = 0; var newSlot = undefined;
	for(i=0;i<4;++i){
        newSlot = new UI_shop_slot(this.spr_bg, shopListData[i]);
		newSlot.spr_bg.position.y = this.startY;
		this.startY += this.interval;
		this.arr_slots[i] = newSlot;
	}
};

UI_shop.prototype.update = function(){
	for(this.i=0;this.i<this.length;++this.i){
		this.arr_slots[this.i].update(deltaTime);
	}
};

UI_shop.prototype.cb_ShowPop = function(){//networkManager.GetShoplist() 에서 사용될 콜백 함수...
    if(engine.state !== engine.gameState.STATE_PAUSE) {
        engine.prevState = engine.state;
        engine.state = engine.gameState.STATE_PAUSE;
    }

	var gemShop = GAME.ui_gemShop;
	gemShop.spr_bg.visible = true;
	gemShop.popupShield.visible = true;
    this.txt_greappoint.text = (loginTF===1)?kData.greappoint.formatMoney(0):GAME.table_language["shop02"][GAME.language];
	TweenLite.to(gemShop.spr_bg, 0.3, {scaleY:1});
};

UI_shop.prototype.closePop = function(){
    SESoundPlay(SE_BUTTON);
	this.spr_bg.scale.y = 0;
	this.spr_bg.visible = false;
    this.popupShield.visible = false;

    if(!GAME.view.sprPausePopBG.visible) engine.state = engine.prevState;

    GAME.prev_pauseState = -1;
    // if(!GAME.view.sprPausePopBG.visible) engine.state = engine.prevState;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UI_shop_slot(parent, _slotData){
    this.price = _slotData.Price;
    this.mkIdx = _slotData.mkidx;
    this.mType = _slotData.mtype;
    this.pType = _slotData.pType;
    this.value = _slotData.Quantity;

    this.str_AdTimeName = undefined;//광고시간에 접근할 변수이름을 담는 변수
    // this.spr_icon = SpriteLoad(this.spr_bg, _slotData.icon, -150, 0);//상품 아이콘

    if(!this.pType.match("ad")){//point
        this.spr_bg = SpriteSliceLoad(parent, "list_1.png", 0, 0, 578, 132, 5, 5, 5, 5);
        this.btn_pay = new GUMA.button(this.spr_bg, "btn_shop_1.png", 180, 0);
        this.txt_pay = FontLoad(this.btn_pay.sprite, (loginTF!==1)?GAME.table_language["shop05"][GAME.language]:this.price.toString()
            , 0, 0, {font:"bold 30px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});
        this.btn_pay.setCallback(this.btnPoint, this);

        if(loginTF===1){
            this.txt_pay.position.x += 20;
            this.spr_coinIcon = SpriteLoad(this.btn_pay.sprite, "coin.png", -65, 0);
            this.spr_coinIcon.scale.set(0.675);
            // this.spr_coinIcon.position.x -= (this.spr_coinIcon.width/2);
            // this.txt_pay.position.x += (this.spr_coinIcon.width/2);
        } else {
            this.spr_icon = SpriteLoad(this.spr_bg, _slotData.icon, -150, 0);//상품 아이콘
            this.txt_loginAlert = FontLoad(this.spr_bg, GAME.table_language["shop07"][GAME.language], -200, -45
            	, {font:"bold 30px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});//회원전용
            // this.txt_loginAlert.visible = false;
        }
    } else {//ad
        this.spr_bg = SpriteSliceLoad(parent, "list_2.png", 0, 0, 578, 132, 5, 5, 5, 5);
        this.btn_pay = new GUMA.button(this.spr_bg, "btn_shop_2.png", 180, 0);
        this.txt_pay = FontLoad(this.btn_pay.sprite, (loginTF!==1)?GAME.table_language["shop05"][GAME.language]:this.price.toString()
            , 0, 0, {font:"bold 30px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});

        this.coolTimer = new Timer(this.btn_pay.sprite
            , {font:"30px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#000000", strokeThickness:3}, 600);

        switch(this.pType){
            case "ad_1":
                this.txt_pay.text = "AD";
                this.txt_pay.style.fontSize = "50px";
                this.bAbleAD = (kData.gameMoney_add_time_2<GAME.curServerTime);
                if(!this.bAbleAD) this.coolTimer.remainTime = kData.gameMoney_add_time_2-GAME.curServerTime;
                this.str_AdTimeName = "gameMoney_add_time_2";
                break;
            case "ad_2":
                this.txt_pay.visible = false;
                this.spr_adIcon = SpriteLoad(this.btn_pay.sprite, "shop_movie.png", 0, 0);
                this.bAbleAD = (kData.gameMoney_add_time_3<GAME.curServerTime);
                if(!this.bAbleAD) this.coolTimer.remainTime = kData.gameMoney_add_time_3-GAME.curServerTime;
                this.str_AdTimeName = "gameMoney_add_time_3";
                break;
        }

        this.coolTimer.cb_ableFunction = function(_this){
            if(_this.pType==="ad_1") _this.txt_pay.visible = true;
            _this.coolTimer.remainTime = 0;
            _this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_2.png");
            _this.coolTimer.txt_coolTime.visible = false;
            if(_this.spr_adIcon!==undefined) _this.spr_adIcon.visible = true;
            _this.bAbleAD = true;
        };

        this.coolTimer.coolTime = GAME.ad_coolTime;

        if(this.bAbleAD){
            this.coolTimer.remainTime = 0;
            this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_2.png");
            this.coolTimer.txt_coolTime.visible = false;
            if(this.spr_adIcon!==undefined) this.spr_adIcon.visible = true;
        } else {
            if(this.pType==="ad_1") this.txt_pay.visible = false;
            this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_disable.png");
            this.coolTimer.txt_coolTime.visible = true;
            if(this.spr_adIcon!==undefined) this.spr_adIcon.visible = false;
        }

        this.btn_pay.setCallback(this.btnAD, this);
    }

    if(this.spr_icon===undefined) this.spr_icon = SpriteLoad(this.spr_bg, _slotData.icon, -150, 0);//상품 아이콘

    this.tex_btnOrigin = this.btn_pay.sprite.texture;
	this.tex_btnDisbaled = new PIXI.Texture.fromFrame("btn_shop_disable.png");

	// this.txt_loginAlert = FontLoad(this.spr_bg, GAME.table_language["shop07"][GAME.language], -200, -45
	// 	, {font:"bold 30px "+GAME.fontName[GAME.language], fill:"#ffffff", stroke:"#0068b7", strokeThickness:5});//회원전용
	// this.txt_loginAlert.visible = false;

	this.bit_goldValue = createBitmapFont("70px shop_no_export", "456789,", {x:60, y:-40}, 'right');
	this.spr_bg.addChild(this.bit_goldValue);

	this.bit_goldValue.text = "x"+this.value.formatMoney(0);

	this.bAbleAD = false;//광고 볼 수 있는지 확인하는 변수.
}

UI_shop_slot.constructor = UI_shop_slot;

UI_shop_slot.prototype.update = function (_deltaTime) {
    if(!this.pType.match("ad")) return;
    this.coolTimer.remainTime -= _deltaTime;
    this.coolTimer.update();
    this.coolTimer.checkRemainTime(this);
};

UI_shop_slot.prototype.btnPoint = function () {
    SESoundPlay(SE_BUTTON);

    if(loginTF===0){
        // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_modalMsg["signup"][GAME.language]
        //     , networkManager.JoinMember, null);
        kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
        return;
    }

    if(this.price>kData.greappoint){
        // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKONLY, GAME.table_modalMsg["lowpoint"][GAME.language]
        //     , null, null);
        if(yahooIN === undefined)
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint1'), kMGMenu.GetString("ok"));
        else
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL);
        return;
    }

    this.payment();
};

UI_shop_slot.prototype.btnAD = function () {
    SESoundPlay(SE_BUTTON);
    if(!this.bAbleAD) return;

    /**
     * default
     * */
    // if(apkTF!==1){
    //     networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_modalMsg["gotogpg"][GAME.language]
    //         , networkManager.JumpGooglePlay, null);
    //     return;
    // }

    GAME.paySlot = this;
    networkManager.GetServerTime(function(_timeStamp){
        GAME.curServerTime = _timeStamp;
        kData[GAME.paySlot.str_AdTimeName] = GAME.curServerTime + GAME.ad_coolTime;
        GAME.paySlot.payment();
    });
    /**
     * default
     * */
};

UI_shop_slot.prototype.cb_payment = function () {
    if(!this.pType.match("ad")) GAME.ui_message.showPop(GAME.flag_msgState.pay_result, 1, this.spr_icon.texture, this.value);
    else {
        GAME.ui_message.showPop(GAME.flag_msgState.pay_result, 1, this.spr_icon.texture, this.value);
        this.bAbleAD = false;
        this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_disable.png");
        this.coolTimer.txt_coolTime.visible = true;
        if(this.spr_adIcon!==undefined) this.spr_adIcon.visible = false;
        if(loginTF===0) kData[CASH_DATA_NAME] += this.value;
        this.coolTimer.remainTime = this.coolTimer.coolTime;//default
        // this.coolTimer.remainTime = 60;//test
        if(this.pType==="ad_1") {
            this.txt_pay.visible = false;
            if(isApp) window.parent.postMessage({adStatus:0}, "*");//전면 광고
        } else {
            if(isApp) window.parent.postMessage({adStatus:1}, "*");//비디오 광고
        }
    }

    engine.gemCount = kData.iGemCount;
    GAME.view.txt_curGem.text = kData[CASH_DATA_NAME].formatMoney(0);
    if(loginTF===1)GAME.ui_gemShop.txt_greappoint.text = kData.greappoint.formatMoney(0);
    SaveDataInClient();
};

UI_shop_slot.prototype.payment = function () {
    GAME.cb_Pay = this.cb_payment.bind(this);
    networkManager.Payment(this.mkIdx, GAME.cb_Pay);
};