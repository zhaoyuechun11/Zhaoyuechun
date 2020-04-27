GAME.messageState = undefined;
GAME.flag_msgState = {//메시지 종류
	pay_result : 0,//구매 결과
	pay_cancel : 1,//구매 취소
	recommand_login : 2,//회원 가입 권유
    recommand_google : 3,//구글 플레이 설치 권유
    alert_pointLack : 4//포인트 부족...
};
/*
결제 상품 알림 창
etc51
ㄴ골드...시간...
ㄴ각 골드 케이스...
ㄴ각 시간 케이스..

구매 취소 알림 창
etc52
¥
회원가입 권유 알림 창
etc54
*/
function UI_message(parent){
	this.graphic_shield = new PIXI.Graphics();
	parent.addChild(this.graphic_shield);
	this.graphic_shield.beginFill(0x000000, 0.6);
	this.graphic_shield.drawRect(0, 0, iMaxSizeX, iMaxSizeY);
	this.graphic_shield.endFill();
	this.graphic_shield.interactive = true;
	this.graphic_shield.visible = false;

	this.spr_bg = SpriteLoad(parent, "popup_message.png", iCenterSizeX, iCenterSizeY-50);
	this.spr_bg.interactive = true;
	this.btn_ok = new GUMA.button(this.spr_bg, "btn_shop_ok.png", 135, 155);//회원가입 ㄱㄱ...
	this.btn_ok.setCallback(this.btnOK, this);
	this.txt_ok = FontLoad(this.btn_ok.sprite, GAME.table_language["button01"][GAME.language], 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:5});
	this.btn_cancel = new GUMA.button(this.spr_bg, "btn_shop_no.png", -135, 155);
	this.btn_cancel.setCallback(this.closePop, this);
	this.txt_cancel = FontLoad(this.btn_cancel.sprite, GAME.table_language["button02"][GAME.language], 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:5});
	this.btn_confirm = new GUMA.button(this.spr_bg, "btn_shop_ok.png", 0, 155);
	this.btn_confirm.setCallback(this.closePop, this);
	this.txt_confirm = FontLoad(this.btn_confirm.sprite, GAME.table_language["button01"][GAME.language], 0, 0
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"35px", fill:"#ffffff", stroke:"#000000", strokeThickness:5});

	this.spr_resultBG = SpriteLoad(this.spr_bg, "shop_bg.png", 0, -70);
	this.txt_msg = FontLoad(this.spr_bg, GAME.table_language["shop06"][GAME.language], 0, -20
		, {fontFamily:GAME.fontName[GAME.language], fontSize:"40px", fill:"#ffffff", storke:"#000000", strokeThickness:5,
			wordWrap:true, wordWrapWidth:600, align:"center"});

	this.spr_resultIcon = SpriteLoad(this.spr_resultBG, "dollar_2.png", 0, 0);
	this.bit_result = createBitmapFont("50px shop_no_export", "g", {x:0, y:0}, "center");
	this.spr_resultBG.addChild(this.bit_result);

	this.tex_gold1 = new PIXI.Texture.fromFrame("dollar_2.png");
	this.tex_gold2 = new PIXI.Texture.fromFrame("dollar_3.png");
	this.tex_gold3 = new PIXI.Texture.fromFrame("dollar_4.png");

    this.popupType = GAME.flag_msgState.none;

	this.spr_bg.visible = false;
	this.spr_bg.scale.y = 0;
	this.init();
}

UI_message.constructor = UI_message;

UI_message.prototype.init = function(){
	this.btn_ok.sprite.visible = false;
	this.btn_cancel.sprite.visible = false;
	this.btn_confirm.sprite.visible = false;
	this.spr_resultBG.visible = false;
	this.spr_resultIcon.visible = false;
	this.bit_result.visible = false;
};

UI_message.prototype.showPop = function(caseNum, flag_type, _texture, flag_gameMoney){
	this.graphic_shield.visible = true;
	switch(caseNum){
		case GAME.flag_msgState.pay_result:
            this.popupType = GAME.flag_msgState.pay_result;
			switch(flag_type){
				case 1://gold(gameMoney)
				this.spr_resultIcon.texture = _texture;
				this.bit_result.text = flag_gameMoney.formatMoney(0) + "G";
				break;
			}

			this.bit_result.visible = true;
			this.spr_resultIcon.visible = true;
			this.spr_resultBG.visible = true;

			this.txt_msg.position.set(0, 50);
			this.txt_msg.text = GAME.table_language["shop03"][GAME.language];//구매 완료하였습니다.
			this.btn_confirm.sprite.visible = true;
			break;
		case GAME.flag_msgState.pay_cancel:
			// console.log("pay_cancel");
            this.popupType = GAME.flag_msgState.pay_cancel;
			this.txt_msg.position.set(0, -20);
			this.txt_msg.text = GAME.table_language["shop04"][GAME.language];//구매가 취소되었습니다.
			this.btn_confirm.sprite.visible = true;
			break;
		case GAME.flag_msgState.recommand_login:
			// console.log("recommand");
            this.popupType = GAME.flag_msgState.recommand_login;
            this.txt_msg.position.set(0, -20);
			this.txt_msg.text = GAME.table_language["shop06"][GAME.language];//회원가입 페이지로 이동하시겠습니까?
			this.btn_ok.sprite.visible = true;
			this.btn_cancel.sprite.visible = true;
		    break;
        case GAME.flag_msgState.recommand_google:
            this.popupType = GAME.flag_msgState.recommand_google;
            this.txt_msg.position.set(0, -20);
            this.txt_msg.text = "광고는 모바일만 가능합니다.\n구글플레이로 이동하시겠습니까?";//언어대응 예정.
            this.btn_ok.sprite.visible = true;
            this.btn_cancel.sprite.visible = true;
            break;
        case GAME.flag_msgState.alert_pointLack:
            this.popupType = GAME.flag_msgState.alert_pointLack;
            this.txt_msg.position.set(0, 0);
            this.txt_msg.text = "포인트가 부족합니다.";//언어대응 예정.
            this.btn_confirm.sprite.visible = true;
            break;
	}

	this.spr_bg.visible = true;
	TweenLite.to(this.spr_bg, 0.3, {scaleY:1});
};

UI_message.prototype.closePop = function(){
    /**
     * 버튼 소리 호출.
     * */
    SESoundPlay(SE_BUTTON);
	this.spr_bg.visible = false;
	this.spr_bg.scale.y = 0;

	this.graphic_shield.visible = false;
	this.init();
};

UI_message.prototype.btnOK = function(){
    /**
     * 버튼 소리 호출.
     * */
    SESoundPlay(SE_BUTTON);
    switch(this.popupType){
        case GAME.flag_msgState.recommand_login:
            networkManager.JoinMember();
            break;
        case GAME.flag_msgState.recommand_google:
            networkManager.JoinMember();//현재(170314)해당 함수 미작업 상태..
            break;
    }
};