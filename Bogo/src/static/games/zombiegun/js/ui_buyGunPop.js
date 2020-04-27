/**
 * Created by ggumak on 2017-06-30.
 */
"use strict";

function UI_buyGunPop (){
    this.con_pop = new PIXI.Container();
    this.con_pop.interactive = true;
    // GAME.view.addChild(this.con_pop);
    this.spr_blackBG = SpriteLoad(this.con_pop, "white.png", iCenterSizeX, iCenterSizeY);
    this.spr_blackBG.tint = 0x000000;
    this.spr_blackBG.width = iMaxSizeX;
    this.spr_blackBG.height = iMaxSizeY;
    this.spr_blackBG.alpha = 0.8;

    this.spr_bg = SpriteLoad(this.con_pop, "popup_ui_2.png", iCenterSizeX, iCenterSizeY);
    this.spr_gunImg = SpriteLoad(this.spr_bg, "gun_shop_slot_1.png", 0, -140);
    this.spr_priceBG = SpriteLoad(this.spr_bg, "game_over_popup_slot_1.png", 0, 170);
    this.btn_cancle = new Button(this.spr_bg, "btn_shop_no.png", -150, 300);
    this.btn_cancle.setCallback(this.close, this);
    this.btn_confirm = new Button(this.spr_bg, "btn_shop_ok.png", 150, 300);
    this.btn_confirm.setCallback(this.cb_confirm, this);

    FontLoad(this.btn_cancle.sprite, GAME.table_language["button02"][GAME.language], 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});//btn_cancle text
    FontLoad(this.btn_confirm.sprite, GAME.table_language["button01"][GAME.language], 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});//btn_confirm text

    FontLoad(this.spr_bg, GAME.table_language["popup06"][GAME.language], 0, -345
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"50px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});//title text

    this.txt_gunName = FontLoad(this.spr_gunImg, "name", 0, -(this.spr_gunImg.height/2)+42
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"30px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});
    this.txt_buff_0 = FontLoad(this.spr_bg, "buff_0", 0, 30
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:4}, 0.5, 0.5, 600);
    this.txt_buff_1 = FontLoad(this.spr_bg, "buff_1", 0, 70
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:4}, 0.5, 0.5, 600);

    this.txt_price = FontLoad(this.spr_priceBG, "Price", 0, 0
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"55px", fill:"#ffffff", stroke:"#000000", strokeThickness:4});

    this.gunPrice = 0;
    this.slotID = 0;
    this.con_pop.visible = false;
}

UI_buyGunPop.prototype.show = function (_slot_id, _price, _name) {
    this.slotID = _slot_id;
    this.gunPrice = _price;
    this.txt_price.text = "$"+_price.formatMoney(0);
    this.txt_gunName.text = _name;

    this.con_pop.visible = true;
    this.spr_gunImg.texture = PIXI.Texture.fromFrame("gun_shop_slot_"+(_slot_id+1).toString()+".png");

    this.txt_buff_0.visible = false;
    this.txt_buff_1.visible = false;
    this.setGunSkillDesc();
};

UI_buyGunPop.prototype.close = function () {
    this.con_pop.visible = false;
};

UI_buyGunPop.prototype.cb_confirm = function () {
    kData.iUserOwnGold -= this.gunPrice;
    kData.arrBuyRecords[this.slotID] = true;
    networkManager.ForcedSaveData(false, function(){
        GAME.view.shop_txtUserOwnGold.text = kData.iUserOwnGold.formatMoney(0);
        GAME.view.setSlotState();
        GAME.view.shop_gunSlots[GAME.ui_gunBuyPop.slotID].state = GAME.view.shop_gunSlots[GAME.ui_gunBuyPop.slotID].STATE.EQUIP;
        GAME.view.shop_gunSlots[GAME.ui_gunBuyPop.slotID].setButton();
        checkNextGunSlot();
        setUnlockGunData();
        GAME.ui_gunBuyPop.close();
    });
};

UI_buyGunPop.prototype.setGunSkillDesc = function(){
    var gunData = GAME.gunData[this.slotID];
    var i = 0; var value = 0; var type = 0; var pixiFont = undefined;
    for(i=0;i<2;++i){
        type = gunData["skill"+(i+1).toString()];
        if(type === -1) break;
        value = gunData["value"+(i+1).toString()];
        pixiFont = this["txt_buff_"+i.toString()];
        pixiFont.text = GAME.table_language["gunbuff"+type.toString()][GAME.language];
        pixiFont.text = pixiFont.text.replace("{0}", value.toString());
        pixiFont.visible = true;

        switch(type){
            case 100://돈 획득량 증가.
                pixiFont.style.fill = "#7cd268";
                break;
            case 101://층 이동 요금 할인.
                pixiFont.style.fill = "#ffae57";
                break;
            case 102://라이프 증가.
                pixiFont.style.fill = "#00b4ff";
                break;
            case 103://라이프 감소.
                pixiFont.style.fill = "#f34213";
                break;
        }
    }
};