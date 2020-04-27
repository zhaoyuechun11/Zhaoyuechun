// GAME.flag_enum = {
//     logout : 0,
//     login : 1,
//     yahoo : 2
// };
//
// GAME.connect_flag = GAME.flag_enum.logout;
//
// GAME.fill_list1 = "#ffe401";
// GAME.stroke_list1 = "#763304";
// GAME.fill_list2 = "#b5f05e";
// GAME.stroke_list2 = "#575919";

// GAME.ad_coolTime1 = 60*10;
// GAME.ad_coolTime2 = 60*10;
// GAME.ad_coolTime3 = 60*10;
//
// GAME.pay_Point_0 = 0;//해당 상품에 대한 최상단 greappoint 결제 가능 포인트.
// GAME.pay_Point_1 = 0;

// GAME.goods_00_value = 3000;//최상단 슬롯...greappoint slot 로그아웃 상태 시, 회원 전용
// GAME.goods_01_value = 3000;
// GAME.goods_02_value = 12000;
// GAME.goods_03_value = 25000;

GAME.ad_coolTime = 60*10;
GAME.paySlot = undefined;//결제를 하는 슬롯 참조변수.(광고버튼에서사용)
var bPressYahooPay = false;
var lang = "en";

function UI_goldShop(parent){
    /**
     * test data
     * */
    if(networkManager.networkState !== NET_STATE.RUN_SERVER){
        shopListData = [
            {Price:100, Quantity:1000, mkidx:12, mtype:"login", pType:"point", icon:"dollar_1.png"},
            {Price:1000, Quantity:5000, mkidx:13, mtype:"login", pType:"point", icon:"dollar_2.png"},
            // {Price:1000, Quantity:5000, mkidx:14, mtype:"login", pType:"point", icon:"dollar_3.png"},
            // {Price:1000, Quantity:5000, mkidx:15, mtype:"login", pType:"point", icon:"dollar_4.png"}
            {Price:100, Quantity:1000, mkidx:14, mtype:"loginout", pType:"ad_1", icon:"dollar_1.png"},
            {Price:100, Quantity:1500, mkidx:15, mtype:"loginout", pType:"ad_2", icon:"dollar_2.png"}
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

	this.spr_bg = SpriteLoad(parent, "popup_shop.png", iCenterSizeX, iCenterSizeY);
	this.spr_bg.interactive = true;
	this.btn_confirm = new GUMA.button(this.spr_bg, "btn_shop_ok.png", 0, 365);
	this.btn_confirm.setCallback(this.closePop, this);
	this.txt_confirm = FontLoad(this.btn_confirm.sprite, GAME.table_language["button01"][GAME.language], 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", stroke:"#000000", strokeThickness:5});

	this.txt_title = FontLoad(this.spr_bg, GAME.table_language["shop01"][GAME.language], 0, -445
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:5});

	this.spr_point = SpriteLoad(this.spr_bg, "point.png", 0, -340);
	this.spr_point.on("click", goSignUp);
    this.spr_point.on("tap", goSignUp);
    function goSignUp(){
        if(bPressYahooPay){
            bPressYahooPay = false;
            return;
        }

        if(loginTF!==1) {
            // networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_modalMsg["signup"][GAME.language]
            //     , networkManager.JoinMember, null);
            kMGMenu.SetToastMsg(kMGMenu.GetString("signup"));
        }
    }
    this.spr_point.interactive = true;

    this.btn_yahooPay = new GUMA.button(this.spr_point, "btn_point.png", (this.spr_point.width/2)-37.5, 0);
    this.btn_yahooPay.setCallback(function () {
        bPressYahooPay = true;
        kData.iUserOwnGold += gameResultMoney;
        gameResultMoney = 0;

        // if(!GAME.view.shopBG_shop.visible&&!GAME.gunShopContainer.scrollContainer.visible) {
        //     kData.iClimbFloor = GAME.stageFloor;
        //     if(GAME.stageFloor>kData.iBestFloor) kData.iBestFloor = GAME.stageFloor;
        //
        //     // var lvData = undefined;
        //     // var levelData = GAME.engineInst.stageManager.levelData;
        //     // var remains = GAME.stageFloor%5;
        //     // var tempStageLevel = 0;
        //     //
        //     // this.newBestSpine_over.skeleton.setToSetupPose();
        //     //
        //     // /**
        //     //  * 올라간 층에 대한 보상금 계산
        //     //  * */
        //     // if(GAME.stageFloor<=125){//테이블로 표현된 최대 층 수 : 125
        //     //     if(remains!==0){
        //     //         tempStageLevel = ((GAME.stageFloor/5)|0);
        //     //         if(tempStageLevel>24) lvData = levelData[levelData.length-1];
        //     //         else{
        //     //             for(i=0;i<levelData.length;++i){
        //     //                 if(i===tempStageLevel){
        //     //                     lvData = levelData[i];
        //     //                     break;
        //     //                 }
        //     //             }
        //     //         }
        //     //
        //     //         GAME.accStageGold = lvData.gold + (lvData.add*(remains-1));
        //     //     }else{//5, 10층 등 각 레벨 끝 층..
        //     //         tempStageLevel = ((GAME.stageFloor/5)|0)-1;
        //     //         if(tempStageLevel>24) lvData = levelData[levelData.length-1];
        //     //         else{
        //     //             for(i=0;i<levelData.length;++i){
        //     //                 if(i===tempStageLevel){
        //     //                     lvData = levelData[i];
        //     //                     break;
        //     //                 }
        //     //             }
        //     //         }
        //     //
        //     //         GAME.accStageGold = lvData.gold + (lvData.add*4);
        //     //     }
        //     // }else{
        //     //     lvData = levelData[levelData.length-1];
        //     //     GAME.accStageGold = (lvData.gold + (lvData.add*4)) + ((GAME.stageFloor-125)*lvData.add);
        //     // }
        //     //
        //     // var plusGold = (GAME.accStageGold*GAME.getMoneyBuff_pct)|0;
        //     // // var reward = Math.round((GAME.accStageGold + (GAME.accStageGold*GAME.getMoneyBuff_pct)));
        //     // // var reward = GAME.accStageGold+plusGold;
        //     // kData.iUserOwnGold += GAME.accStageGold+plusGold;
        //     // /**
        //     //  * 올라간 층에 대한 보상금 계산 end
        //     //  * */
        // }

        networkManager.ForcedSaveData(true, function () {
            location.href = yahooInappURL;
        });
    });

    this.btn_yahooPay.sprite.visible = (yahooIN!==undefined);//default

	this.txt_greappoint = FontLoad(this.spr_point, "text", 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"28px", fill:"#ffffff", stroke:"#000000", strokeThickness:3});
	if(!this.btn_yahooPay.visible) this.txt_greappoint.position.x += 25;

	this.startY = -220;
	this.interval = 142;

	// this.tex_slotBG_0 = new PIXI.Texture.fromFrame("list_1.png");
	// this.tex_slotBG_1 = new PIXI.Texture.fromFrame("list_2.png");
	// this.tex_btn_0 =  new PIXI.Texture.fromFrame("btn_shop_1.png");
	// this.tex_btn_1 = new PIXI.Texture.fromFrame("btn_shop_2.png");
	// this.tex_icon_0 = new PIXI.Texture.fromFrame("dollar_2.png");
	// this.tex_icon_1 = new PIXI.Texture.fromFrame("dollar_3.png");
	// this.tex_icon_2 = new PIXI.Texture.fromFrame("dollar_4.png");
    //
	// this.tex_pay_0 = new PIXI.Texture.fromFrame("shop_ad.png");
	// this.tex_pay_1 = new PIXI.Texture.fromFrame("shop_down.png");
	// this.tex_pay_2 = new PIXI.Texture.fromFrame("shop_movie.png");

	this.arr_slots = [];

	this.arr_goldValue = [];//각 상품별 지급되는 골드의 가격...

    for(i=0;i<4;++i){
        this.arr_goldValue[i] = 0;
    }

	this.init();

	this.i = 0;
	this.length = 4;

	this.popupShield.visible = false;
	this.spr_bg.visible = false;
	this.spr_bg.scale.y = 0;
}

UI_goldShop.constructor = UI_goldShop;

UI_goldShop.prototype.init = function(){
	this.makeSlots();
};

UI_goldShop.prototype.makeSlots = function(){
	var i = 0; var newSlot = undefined;
	var slotData = undefined;
	// for(i=0;i<shopListData.length;++i){
     //    slotData = shopListData[i];
	// 	newSlot = new UI_goldShop_slot(this.spr_bg);
	// 	newSlot.setSlot(slotData.mkidx, slotData.mtype, slotData.pType, slotData.Price, slotData.Quantity, slotData.icon);
	// 	newSlot.spr_bg.position.y = this.startY;
	// 	this.startY += this.interval;
	// 	this.arr_slots[i] = newSlot;
	// }//170908 서버 데이터 오류로 수정.

    for(i=0;i<4;++i){
        slotData = shopListData[i];
        newSlot = new UI_goldShop_slot(this.spr_bg);
        newSlot.setSlot(slotData.mkidx, slotData.mtype, slotData.pType, slotData.Price, slotData.Quantity, slotData.icon);
        newSlot.spr_bg.position.y = this.startY;
        this.startY += this.interval;
        this.arr_slots[i] = newSlot;
    }
};

UI_goldShop.prototype.update = function(){
	for(this.i=0;this.i<this.length;++this.i){
		this.arr_slots[this.i].update(deltaTime);
	}
};

UI_goldShop.prototype.showPop = function(){
	this.spr_bg.visible = true;
	this.popupShield.visible = true;
	TweenLite.to(this.spr_bg, 0.3, {scaleY:1});
};

UI_goldShop.prototype.cb_ShowPop = function(){//networkManager.GetShoplist() 에서 사용될 콜백 함수...
	var shop_gold = GAME.ui_shop_gold;
    shop_gold.txt_greappoint.text = (loginTF!==1)?GAME.table_language["shop02"][GAME.language]:kData.greappoint.formatMoney(0);
	shop_gold.spr_bg.visible = true;
	shop_gold.popupShield.visible = true;
	TweenLite.to(shop_gold.spr_bg, 0.3, {scaleY:1});
};

UI_goldShop.prototype.closePop = function(){
    SESoundPlay(SE_BUTTON);
	this.spr_bg.scale.y = 0;
	this.spr_bg.visible = false;
    this.popupShield.visible = false;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UI_goldShop_slot(parent){
	this.slotNum = -1;
	this.spr_bg = SpriteLoad(parent, "list_2.png", 0, 0);
	this.btn_pay = new GUMA.button(this.spr_bg, "btn_shop_2.png", 180, 0);
    this.btn_pay.setCallback(this.btnPay, this);

	this.tex_btnOrigin = undefined;
	this.tex_btnDisbaled = new PIXI.Texture.fromFrame("btn_shop_3.png");

	this.txt_pay = FontLoad(this.btn_pay.sprite, "text", 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"25px", fill:"#ffffff", stroke:"#000000", strokeThickness:5});
	this.spr_pay_icon = SpriteLoad(this.btn_pay.sprite, "shop_ad.png", 0, 0);
	this.spr_pay_icon.visible = false;
	this.spr_icon = SpriteLoad(this.spr_bg, "dollar_1.png", -150, 0);

	this.txt_loginAlert = FontLoad(this.spr_bg, GAME.table_language["shop07"][GAME.language], -200, -45
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"25px", fill:"#ffffff", stroke:"#000000", strokeThickness:5});
	this.txt_loginAlert.visible = false;

	this.coolTimer = new Timer(this.btn_pay.sprite
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"30px", fill:"#ffffff", stroke:"#000000", strokeThickness:5}, 600);

	this.goldValue = 0;
	this.bit_goldValue = createBitmapFont("50px shop_no_export", "456789,", {x:80, y:-30}, 'right');
	this.spr_bg.addChild(this.bit_goldValue);

	this.bChange = true;//다시 볼수 있게 바꼈는지 확인하는 변수.
    this.slot_mkIdx = 0;//server에서 보내주는 slot별 mkIdx를 담는 변수.
	this.bAbleAD = true;//광고 볼 수 있는지 확인하는 변수.
    this.spr_adIcon = undefined;
    this.str_AdTimeName = undefined;
}

UI_goldShop_slot.constructor = UI_goldShop_slot;
// {Price:100, Quantity:1000, mkidx:12, mtype:"login", pType:"point"},
// {Price:100, Quantity:1000, mkidx:14, mtype:"loginout", pType:"ad_1"},
UI_goldShop_slot.prototype.setSlot = function (_mkIdx, _mType, _pType, _price, _value, _iconTexture) {
    this.price = _price;
    this.mkIdx = _mkIdx;
    this.mType = _mType;
    this.pType = _pType;
    this.goldValue = _value;

    if(_iconTexture===undefined) _iconTexture = "dollar_1.png";//test
    this.spr_icon.texture = PIXI.Texture.fromFrame(_iconTexture);
    this.txt_loginAlert.visible = false;
    this.bit_goldValue.text = this.goldValue.formatMoney(0);

    if(!_pType.match("ad")){
        this.spr_bg.texture = PIXI.Texture.fromFrame("list_1.png");
        this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_2.png");
        this.txt_loginAlert.visible = (loginTF!==1);
        this.txt_pay.text = (loginTF!==1)?GAME.table_language["ranking04"][GAME.language]:this.price.toString();
        this.btn_pay.setCallback(this.btnPoint, this);
        if(loginTF===1){
            this.txt_pay.position.x += 20;
            this.spr_coinIcon = SpriteLoad(this.btn_pay.sprite, "coin.png", -65, 0);
            this.spr_coinIcon.scale.set(0.675);
            // this.spr_coinIcon.position.x -= (this.spr_coinIcon.width/2);
            // this.txt_pay.position.x += (this.spr_coinIcon.width/2);
        }
    } else {
        this.spr_bg.texture = PIXI.Texture.fromFrame("list_2.png");
        this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_1.png");
        switch(_pType){
            case "ad_1":
                this.txt_pay.visible = false;
                this.spr_adIcon = SpriteLoad(this.btn_pay.sprite, "shop_ad.png", 0, 0);
                this.bAbleAD = (kData.gold_ad_time_2<GAME.curServerTime);
                if(!this.bAbleAD) this.coolTimer.remainTime = kData.gold_ad_time_2-GAME.curServerTime;
                this.str_AdTimeName = "gold_ad_time_2";
                break;
            case "ad_2":
                this.txt_pay.visible = false;
                this.spr_adIcon = SpriteLoad(this.btn_pay.sprite, "shop_movie.png", 0, 0);
                this.bAbleAD = (kData.gold_ad_time_3<GAME.curServerTime);
                if(!this.bAbleAD) this.coolTimer.remainTime = kData.gold_ad_time_3-GAME.curServerTime;
                this.str_AdTimeName = "gold_ad_time_3";
                break;
        }

        this.coolTimer.cb_ableFunction = function(_this){
            _this.coolTimer.remainTime = 0;
            _this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_1.png");
            _this.coolTimer.txt_coolTime.visible = false;
            if(_this.spr_adIcon!==undefined) _this.spr_adIcon.visible = true;
            _this.bAbleAD = true;
        };

        this.coolTimer.coolTime = GAME.ad_coolTime;

        if(this.bAbleAD){
            this.coolTimer.remainTime = 0;
            this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_1.png");
            this.coolTimer.txt_coolTime.visible = false;
            if(this.spr_adIcon!==undefined) this.spr_adIcon.visible = true;
        } else {
            this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_3.png");
            this.coolTimer.txt_coolTime.visible = true;
            if(this.spr_adIcon!==undefined) this.spr_adIcon.visible = false;
        }

        this.btn_pay.setCallback(this.btnAD, this);
    }
};

UI_goldShop_slot.prototype.update = function (_deltaTime) {
    if(!this.pType.match("ad")) return;
    this.coolTimer.remainTime -= _deltaTime;
    this.coolTimer.update();
    this.coolTimer.checkRemainTime(this);
};

UI_goldShop_slot.prototype.btnPoint = function () {
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
            kMGMenu.ShowPopup(kMGMenu.GetString("notice"), kMGMenu.GetString('lowpoint'), kMGMenu.GetString("ok"), yahooInappURL, function () {
                kData.iUserOwnGold += gameResultMoney;
                gameResultMoney = 0;
                // kMGMenu.SetToastMsg("aksdjlf", 10000);
                // console.log("mgMenu callback");

                networkManager.ForcedSaveData(true, function () {
                    location.href = yahooInappURL;
                });
            });
        return;
    }

    this.payment();
};

UI_goldShop_slot.prototype.btnAD = function () {
    SESoundPlay(SE_BUTTON);
    if(!this.bAbleAD) return;

    /**
     * default
     * */
    // if(apkTF!==1){
    //     networkManager.ModalCall(MODAL_BUTTON_TYPE.OKCANCEL, GAME.table_modalMsg["gotogpg"][GAME.language]
    //         , networkManager.JumpGooglePlay, null);
    //     return;
    // }//웹에서 광고 안 보고 재화 얻을 수 있게 수정(171127)

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

UI_goldShop_slot.prototype.cb_payment = function () {
    if(!this.pType.match("ad")) GAME.ui_message.showPop(GAME.flag_msgState.pay_result, 1, this.spr_icon.texture, this.goldValue);
    else {
        GAME.ui_message.showPop(GAME.flag_msgState.pay_result, 1, this.spr_icon.texture, this.goldValue);
        this.bAbleAD = false;
        this.btn_pay.sprite.texture = PIXI.Texture.fromFrame("btn_shop_3.png");
        this.coolTimer.txt_coolTime.visible = true;
        if(this.spr_adIcon!==undefined) this.spr_adIcon.visible = false;
        if(loginTF===0) kData.iUserOwnGold += this.goldValue;
        this.coolTimer.remainTime = this.coolTimer.coolTime;//default
        // this.coolTimer.remainTime = 60;//test
        // alert("show AD");
        if(this.pType==="ad_1") {
            if(isApp) window.parent.postMessage({adStatus:0}, "*");//전면 광고
        } else {
            if(isApp) window.parent.postMessage({adStatus:1}, "*");//비디오 광고
        }
    }

    var money = kData[CASH_DATA_NAME].formatMoney(0);
	GAME.view.shop_txtUserOwnGold.text = money;//상점 유저 골드 갱신
    GAME.view.setSlotState();//상점 슬롯 갱신
    GAME.view.txt_userGold.text = money;//이어하기 창 갱신.
    GAME.view.setContAble();//이어하기 창 버튼 갱신.
	GAME.view.select_txtUserGold.text = money;//층 선택창 유저 골드 갱신
    if(loginTF===1)GAME.ui_shop_gold.txt_greappoint.text = kData.greappoint.formatMoney(0);
    SaveDataInClient();
};

UI_goldShop_slot.prototype.payment = function () {
    GAME.cb_Pay = this.cb_payment.bind(this);
    networkManager.Payment(this.mkIdx, GAME.cb_Pay);
};