GAME.gunShopSlot = function(bgURL, gunImgURL, gunName, gunPrice, lockFloor, gunIdx){
	var self = this;
	this.slotBG = SpriteLoad(GAME.gunShopContainer.scrollContainer, bgURL, 0, 0);
	this.spr_gunImg = SpriteLoad(this.slotBG, gunImgURL, 0, 95);
	this.txtGunName = FontLoad(this.slotBG, gunName, 0, -(this.slotBG.height/2|0)+45
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"30px", fill:'#ffffff', stroke:"#000000", strokeThickness:5});
	this.button = new GUMA.button(this.slotBG, "gun_shop_price_2_btn.png", 0, 150);
	this.texBuy = new PIXI.Texture.fromFrame("gun_shop_price_1_2_btn.png");
	this.texNone = new PIXI.Texture.fromFrame("gun_shop_price_2_2_btn.png");
	this.texEquip = new PIXI.Texture.fromFrame("gun_shop_equip_btn.png");
	this.texUse = new PIXI.Texture.fromFrame("gun_shop_use_btn.png");
	
	this.txtButton = FontLoad(this.button.sprite, "$"+gunPrice.formatMoney(0), 0, 0
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"30px", fill:'#ffffff', stroke:"#000000", strokeThickness:5});
	this.txt_test = FontLoad(this.button.sprite, GAME.table_language["buyNow"][GAME.language], 0, -25
        , {fontFamily:GAME.fontName[GAME.language], fontSize:"20px", fill:'#ffffff', stroke:"#000000", strokeThickness:5});
	this.txt_test.visible = false;
	
	this.button.setCallback(function(){
        SESoundPlay(SE_BUTTON);
		var gunSlot = self;
		switch(gunSlot.state){
			case gunSlot.STATE.NONE:
                GAME.ui_shop_gold.cb_ShowPop();
				break;
			case gunSlot.STATE.EQUIP:
				GAME.setGunBuff(gunSlot.index);
				GAME.view.selectCancel(kData.iUserOwnGun);
                kData.iUserOwnGun = gunSlot.index;
				SaveDataInClient();
				gunSlot.state = gunSlot.STATE.USE;
				gunSlot.setButton();
				break;
            case gunSlot.STATE.BUY:
                GAME.ui_gunBuyPop.show(gunSlot.index, gunSlot.gunPrice, gunSlot.gunName);
				break;
			case gunSlot.STATE.USE:
				break;
			case gunSlot.STATE.LOCKED:
				break;
		}
	});
	this.button.setDownAction(function(){
        GAME.bGetButton = true;
    });

	this.index = gunIdx;
	this.gunName = gunName;
	this.gunPrice = gunPrice;
	this.lockFloor = lockFloor;

	//quality up start//
	this.txt_skill_desc_0 = FontLoad(this.slotBG, "text1", 0, -(this.slotBG.height/2)+90
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"20px", fill:"#ffffff", stroke:"#000000", strokeThickness:5}, 0.5, 0.5, 250);
	this.txt_skill_desc_1 = FontLoad(this.slotBG, "text2", 0, -(this.slotBG.height/2)+140
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"20px", fill:"#ffffff", stroke:"#000000", strokeThickness:5}, 0.5, 0.5, 250);

	this.txt_skill_desc_0.visible = false;
	this.txt_skill_desc_1.visible = false;
	this.setGunSkillDesc();
	//quality up end//

    var txt = GAME.table_language["breakLock"][GAME.language];
	this.txtLockFloor = FontLoad(this.slotBG, txt.replace("{0}", lockFloor.toString()), 0, -45
			, {fontFamily:GAME.fontName[GAME.language], fontSize:"20px", fill:'#ffffff', stroke:"#000000", strokeThickness:5, padding:3}, 0.5, 0.5);
    this.lockBG = SpriteLoad(this.txtLockFloor, "gun_shop_slot_lock_new.png", -(this.txtLockFloor.width*0.5), 0, 1, 0.5);
    fontLimited(this.txtLockFloor, this.txtLockFloor.text, 250);
    // this.lockBG.visible = false;

	this.selectSlot = SpriteLoad(this.slotBG, "gun_shop_slot_equip_new.png", 0, 0);
	this.selectSlot.visible = false;

	this.state = this.STATE.STAE_NONE;
	this.setButton();
};

GAME.gunShopSlot.constructor = GAME.gunShopSlot;

GAME.gunShopSlot.prototype.setState = function(bBuy){
	if(bBuy){//샀다
		if(kData.iUserOwnGun === this.index)
			this.state = this.STATE.USE;
		else
			this.state = this.STATE.EQUIP;
	} else {//안샀다
        if(kData.iUserOwnGold < this.gunPrice){
            this.state = this.STATE.NONE;
        } else {
            this.state = this.STATE.BUY;
        }
	}

	this.setButton();
};

GAME.gunShopSlot.prototype.setButton = function(){
	switch(this.state){
		case this.STATE.NONE:
			this.button.sprite.texture = this.texNone;
			this.button.sprite.interactive = true;
            this.txtButton.style.fill = "#ff7200";
            this.txtButton.position.y = 25;
            this.txt_test.visible = true;
            if(this.txt_skill_desc_0.visible&&!this.txt_skill_desc_1.visible) this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+130;
            else if(this.txt_skill_desc_0.visible&&this.txt_skill_desc_1.visible) {
                this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+90;
                this.txt_skill_desc_1.position.y = -(this.slotBG.height/2)+140;
            }
			break;
		case this.STATE.EQUIP:
			this.txtButton.text = GAME.table_language["button04"][GAME.language];
            this.txtButton.position.y = 0;
            this.button.sprite.texture = this.texEquip;
            this.button.sprite.interactive = true;
			this.txtLockFloor.visible = false;
			if(this.txt_skill_desc_0.visible&&!this.txt_skill_desc_1.visible) this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+140;
			else if(this.txt_skill_desc_0.visible&&this.txt_skill_desc_1.visible) {
                this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+120;
                this.txt_skill_desc_1.position.y = -(this.slotBG.height/2)+160;
            }
            this.txt_test.visible = false;
			break;
        case this.STATE.BUY:
			this.button.sprite.texture = this.texBuy;
			this.button.sprite.interactive = true;
            this.txtButton.style.fill = "#ffffff";
            this.txtButton.position.y = 25;
            this.txt_test.visible = true;
            if(this.txt_skill_desc_0.visible&&!this.txt_skill_desc_1.visible) this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+130;
            else if(this.txt_skill_desc_0.visible&&this.txt_skill_desc_1.visible) {
                this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+90;
                this.txt_skill_desc_1.position.y = -(this.slotBG.height/2)+140;
            }
			break;
		case this.STATE.USE:
			this.txtButton.text = GAME.table_language["button03"][GAME.language];
			// this.txtButton.style.fontSize = "30px";
			// this.txtButton.style.fill = "#ffffff";
            this.txtButton.position.y = 0;
			this.button.sprite.texture = this.texUse;
			this.button.sprite.interactive = true;
			this.selectSlot.visible = true;
            this.txtLockFloor.visible = false;
            if(this.txt_skill_desc_0.visible&&!this.txt_skill_desc_1.visible) this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+140;
            else if(this.txt_skill_desc_0.visible&&this.txt_skill_desc_1.visible) {
                this.txt_skill_desc_0.position.y = -(this.slotBG.height/2)+120;
                this.txt_skill_desc_1.position.y = -(this.slotBG.height/2)+160;
            }
            this.txt_test.visible = false;
			break;
		// case this.STATE.LOCKED:
		// 	this.button.sprite.texture = this.texNone;
		// 	this.button.sprite.interactive = true;
		// 	this.lockBG.visible = true;
			break;
	}
};

GAME.gunShopSlot.prototype.STATE = {
	NONE : 0,
	EQUIP : 1,
	BUY : 2,
	USE : 3,
	LOCKED : 4
};

GAME.gunShopSlot.prototype.setGunSkillDesc = function(){
	var gunData = GAME.gunData[this.index];
	var i = 0; var value = 0; var type = 0; var pixiFont = undefined;
	for(i=0;i<2;++i){
		type = gunData["skill"+(i+1).toString()];
		if(type === -1) break;
		value = gunData["value"+(i+1).toString()];
		pixiFont = this["txt_skill_desc_"+i.toString()];
		pixiFont.text = GAME.table_language["gunbuff"+type.toString()][GAME.language];
		pixiFont.text = pixiFont.text.replace("{0}", value.toString());
		pixiFont.visible = true;

		fontLimited(pixiFont, pixiFont.text, 280);

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