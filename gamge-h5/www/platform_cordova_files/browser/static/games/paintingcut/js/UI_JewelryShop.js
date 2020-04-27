
function UI_JewelryShop() {
    this.jewelryShopWindowGroup = MG.game.add.group();
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.panelOption = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY, w: 632, h: 952, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.panelBG = uiManager.createImg9(this.panelOption);
    this.titleText = MG.game.add.bitmapText(MG.game.world.centerX, 250, 'uiFont', 'Bitmap Fonts!', 60);
    this.moviPointBG = MG.game.add.sprite(MG.game.world.centerX, 330, 'atlas_UI', 'point.png');
    this.moviPoint_Text = MG.game.add.bitmapText(0, 0, 'uiFont', 'Bitmap Fonts!', 38);
    //this.plusJewelButton = MG.game.add.image(0, 0, 'atlas_UI', 'btn_plus.png');
    this.itemPanel1Option = { game: MG.game, packname: "atlas_UI", pngname: "list_1.png", x: 0, y: 0, w: 564, h: 136, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.itemPanel2Option = { game: MG.game, packname: "atlas_UI", pngname: "list_2.png", x: 0, y: 0, w: 564, h: 136, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.itemPanel1BG_1 = uiManager.createImg9(this.itemPanel1Option);
    this.itemPanel2BG_1 = uiManager.createImg9(this.itemPanel2Option);
    this.itemPanel1BG_2 = uiManager.createImg9(this.itemPanel1Option);
    this.itemPanel2BG_2 = uiManager.createImg9(this.itemPanel2Option);
    this.okButton_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_2.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.okButton = uiManager.createImg9(this.okButton_Option);
    this.jewelryIcon_1 = MG.game.add.sprite(0, 0, 'atlas_UI', 'shop_jewel_1.png');
    this.jewelryIcon_2 = MG.game.add.sprite(0, 0, 'atlas_UI', 'shop_jewel_2.png');
    this.jewelryIcon_3 = MG.game.add.sprite(0, 0, 'atlas_UI', 'shop_jewel_3.png');
    this.jewelryIcon_4 = MG.game.add.sprite(0, 0, 'atlas_UI', 'shop_jewel_2.png');
    // this.movi_icon_1 = MG.game.add.sprite(0, 0, 'atlas_UI', 'coin.png');
    // this.movi_icon_2 = MG.game.add.sprite(0, 0, 'atlas_UI', 'coin.png');
    this.ad_icon_1 = MG.game.add.sprite(0, 0, 'atlas_UI', 'shop_movie.png');
    this.ad_icon_2 = MG.game.add.sprite(0, 0, 'atlas_UI', 'shop_movie.png');
    this.itemPanel1_Text = MG.game.add.bitmapText(0, 0, 'numberFont_Shop', 'Bitmap Fonts!', 70);
    this.itemPanel2_Text = MG.game.add.bitmapText(0, 0, 'numberFont_Shop', 'Bitmap Fonts!', 70);
    this.itemPanel3_Text = MG.game.add.bitmapText(0, 0, 'numberFont_Shop', 'Bitmap Fonts!', 70);
    this.itemPanel4_Text = MG.game.add.bitmapText(0, 0, 'numberFont_Shop', 'Bitmap Fonts!', 70);
    this.getJewelry_Button_BG_ON_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_2.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.getJewelry_Button_BG_OFF_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.getJewelry_Button_BG_1 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option);
    this.getJewelry_Button_BG_2 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option);
    this.getJewelry_Button_BG_3 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option);
    this.getJewelry_Button_BG_4 = uiManager.createImg9(this.getJewelry_Button_BG_ON_Option);
    this.getJewelry_Button_BG_1_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option);
    this.getJewelry_Button_BG_2_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option);
    this.getJewelry_Button_BG_3_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option);
    this.getJewelry_Button_BG_4_OFF = uiManager.createImg9(this.getJewelry_Button_BG_OFF_Option);
    this.itemPanel_PayCounter_Text_1 = MG.game.add.bitmapText(0, 0, 'uiFont', '', 25);
    this.itemPanel_PayCounter_Text_2 = MG.game.add.bitmapText(0, 0, 'uiFont', '', 25);
    this.itemPanel_PayCounter_Text_3 = MG.game.add.bitmapText(0, 0, 'uiFont', '', 25);
    this.itemPanel_CollTime_Text_1 = MG.game.add.bitmapText(0, 0, 'numberFont_Pink', '', 35);
    this.itemPanel_CollTime_Text_2 = MG.game.add.bitmapText(0, 0, 'numberFont_Pink', '', 35);
    this.itemPanel_CollTime_Text_3 = MG.game.add.bitmapText(0, 0, 'numberFont_Pink', '', 35);
    this.itemPanel_CollTime_Text_4 = MG.game.add.bitmapText(0, 0, 'numberFont_Pink', '', 35);
    // this.itemPanel_PayCounter_Text_4 = MG.game.add.bitmapText(0, 0, 'uiFont', 'Bitmap Fonts!', 30);

    //////////////////////////////////////////////
    // 보석이 모자랍니다. 충전하시겠습니까? 창
    //////////////////////////////////////////////
    this.windowIsBuyGroup = MG.game.add.group();
    this.blackWall_IsBuy = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.isBuyPanelBG_Option = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY, w: 570, h: 415, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.isBuyPanelBG = uiManager.createImg9(this.isBuyPanelBG_Option);     // 구매경고창
    this.message_bg_Option = { game: MG.game, packname: "atlas_UI", pngname: "message_bg.png", x: MG.game.world.centerX, y: MG.game.world.centerY - 45, w: 494, h: 205, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.isBuyPanel_MessageBG = uiManager.createImg9(this.message_bg_Option);     // 구매경고창
    this.dialogStyle = {font: "32px Arial", fill: "#666666", align: "center", fontWeight: "normal"};
    this.OkBuy_dialog = MG.game.add.text(0, 0, '', this.dialogStyle);
    this.isBuy_dialog = MG.game.add.text(0, 0, GetString("GEM_None"), this.dialogStyle);
    this.okButton_IsBuy_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_98_green.png", x: 0, y: 0, w: 235, h: 98, off_l: 50, off_r: 50, off_t: 0, off_b: 0 };
    this.okButton_IsBuy = uiManager.createImg9(this.okButton_IsBuy_Option);
    this.noButton_IsBuy_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_98_pink.png", x: 0, y: 0, w: 235, h: 98, off_l: 50, off_r: 50, off_t: 0, off_b: 0 };
    this.noButton_IsBuy = uiManager.createImg9(this.noButton_IsBuy_Option);

    //////////////////////////////////////////////
    // 보석을 충전하였습니다. 창
    //////////////////////////////////////////////
    this.windowOkBuyGroup = MG.game.add.group();
    this.blackWall_OkBuy = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.OkBuyPanelBG_Option = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY, w: 570, h: 415, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.OkBuyPanelBG = uiManager.createImg9(this.OkBuyPanelBG_Option);     // 구매경고창
    this.message_bg_Option = { game: MG.game, packname: "atlas_UI", pngname: "message_bg.png", x: MG.game.world.centerX, y: MG.game.world.centerY - 45, w: 494, h: 205, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.OkBuyPanel_MessageBG = uiManager.createImg9(this.message_bg_Option);     // 구매경고창
    this.dialogStyle = {font: "32px Arial", fill: "#666666", align: "center", fontWeight: "normal"};
    this.okButton_OkBuy_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_98_green.png", x: 0, y: 0, w: 235, h: 98, off_l: 50, off_r: 50, off_t: 0, off_b: 0 };
    this.okButton_OkBuy = uiManager.createImg9(this.okButton_OkBuy_Option);
    this.noButton_OkBuy_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_98_pink.png", x: 0, y: 0, w: 235, h: 98, off_l: 50, off_r: 50, off_t: 0, off_b: 0 };
    this.noButton_OkBuy = uiManager.createImg9(this.noButton_OkBuy_Option);



    this.Create_Window();
    this.Create_IsBuyWindow();
    this.Create_OkBuyWindow();
    this.VisibleWindow(false);
    this.VisibleIsBuyWindow(false);
    this.VisibleOkBuyWindow(false);
}

UI_JewelryShop.prototype.Create_Window = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.jewelryShopWindowGroup.add(this.blackWall);
    // 메인 창
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0.5);
    this.jewelryShopWindowGroup.add(this.panelBG);
    // 타이틀 Text
    this.titleText.anchor.setTo(0.5, 0);
    this.titleText.setText("JEWEL SHOP");
    this.titleText.tint = 0xF47E8E;
    this.titleText.align = 'center';
    this.jewelryShopWindowGroup.add(this.titleText);
    // 모비 포인트
    // this.moviPointBG.anchor.setTo(0.5, 0.5);
    // this.jewelryShopWindowGroup.add(this.moviPointBG);
    // 모비 포인트 (text)
    // this.moviPoint_Text.anchor.setTo(1, 0.5);
    // this.moviPoint_Text.alignIn(this.moviPointBG, Phaser.CENTER);
    //// this.moviPoint_Text.position.setTo(this.moviPointBG.position.x + 10, this.moviPointBG.position.y);
    // this.moviPoint_Text.setText("9,999");
    // this.moviPoint_Text.tint = 0x666666;
    // this.moviPoint_Text.align = 'center';
    // this.jewelryShopWindowGroup.add(this.moviPoint_Text);
    // + 버튼
    // this.plusJewelButton.scale.setTo(1);
    // this.plusJewelButton.anchor.setTo(1, 0.5);
    // this.plusJewelButton.alignIn(this.moviPointBG, Phaser.RIGHT);
    //// this.plusJewelButton.position.setTo(this.moviPointBG.position.x - 5, this.moviPointBG.position.y + 2);
    // this.plusJewelButton.inputEnabled = true;
    // this.plusJewelButton.events.onInputUp.add( function () {} );
    // this.jewelryShopWindowGroup.add(this.plusJewelButton);

    /////////////////////////////////////////////////////// 아이템 프레임 1
    this.itemPanel1BG_1.scale.setTo(1);
    this.itemPanel1BG_1.anchor.setTo(0.5);
    this.itemPanel1BG_1.position.setTo(MG.game.world.centerX, 460);
    this.jewelryShopWindowGroup.add(this.itemPanel1BG_1);
    // 아이템 프레임 1 (icon)
    this.jewelryIcon_1.scale.setTo(1);
    this.jewelryIcon_1.anchor.setTo(0.5);
    this.jewelryIcon_1.position.setTo(this.itemPanel1BG_1.position.x - 190, this.itemPanel1BG_1.position.y);
    this.jewelryShopWindowGroup.add(this.jewelryIcon_1);
    // 아이템 프레임 1 (text)
    this.itemPanel1_Text.anchor.setTo(1, 0.5);
    this.itemPanel1_Text.position.setTo(this.itemPanel1BG_1.position.x + 80, this.itemPanel1BG_1.position.y - 15);
    this.itemPanel1_Text.setText("x" + shopManager.Get_Reward_Count(0));
    // this.itemPanel1_Text.tint = 0x1FBB99;
    this.itemPanel1_Text.align = 'right';
    this.jewelryShopWindowGroup.add(this.itemPanel1_Text);
    // 아이템 프레임 1 (button bg ON)
    this.getJewelry_Button_BG_1.scale.setTo(1);
    this.getJewelry_Button_BG_1.anchor.setTo(0.5);
    this.getJewelry_Button_BG_1.position.setTo(this.itemPanel1BG_1.position.x + 180, this.itemPanel1BG_1.position.y);
    this.getJewelry_Button_BG_1.inputEnabled = true;
    this.getJewelry_Button_BG_1.events.onInputUp.add( function () { shopManager.Buy_Jewelry(0); } );
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_1);
    // 아이템 프레임 1 (button bg OFF)
    this.getJewelry_Button_BG_1_OFF.scale.setTo(1);
    this.getJewelry_Button_BG_1_OFF.anchor.setTo(0.5);
    this.getJewelry_Button_BG_1_OFF.position.setTo(this.itemPanel1BG_1.position.x + 180, this.itemPanel1BG_1.position.y);
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_1_OFF);
    // 아이템 프레임 1 (button icon)
    // this.movi_icon_1.scale.setTo(1);
    // this.movi_icon_1.anchor.setTo(0.5);
    // this.movi_icon_1.position.setTo(this.getJewelry_Button_BG_1.position.x - 40, this.getJewelry_Button_BG_1.position.y);
    // this.jewelryShopWindowGroup.add(this.movi_icon_1);
    // 아이템 프레임 1 (button text)
    this.itemPanel_PayCounter_Text_1.anchor.setTo(0.5);
    this.itemPanel_PayCounter_Text_1.position.setTo(this.getJewelry_Button_BG_1.position.x, this.getJewelry_Button_BG_1.position.y);
    this.itemPanel_PayCounter_Text_1.setText("AD");
    this.itemPanel_PayCounter_Text_1.align = 'center';
    this.jewelryShopWindowGroup.add(this.itemPanel_PayCounter_Text_1);
    // cool time text
    this.itemPanel_CollTime_Text_1.anchor.setTo(0.5);
    this.itemPanel_CollTime_Text_1.position.setTo(this.getJewelry_Button_BG_1_OFF.position.x, this.getJewelry_Button_BG_1_OFF.position.y - 5);
    this.itemPanel_CollTime_Text_1.setText("");
    this.itemPanel_CollTime_Text_1.align = 'center';
    this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_1);

    /////////////////////////////////////////////////////// 아이템 프레임 2
    this.itemPanel1BG_2.scale.setTo(1);
    this.itemPanel1BG_2.anchor.setTo(0.5);
    this.itemPanel1BG_2.position.setTo(MG.game.world.centerX, 605);
    this.jewelryShopWindowGroup.add(this.itemPanel1BG_2);
    // 아이템 프레임 1 (text)
    this.itemPanel2_Text.anchor.setTo(1, 0.5);
    this.itemPanel2_Text.position.setTo(this.itemPanel1BG_2.position.x + 80, this.itemPanel1BG_2.position.y - 15);
    this.itemPanel2_Text.setText("x" + shopManager.Get_Reward_Count(1));
    // this.itemPanel2_Text.tint = 0x1FBB99;
    this.itemPanel2_Text.align = 'right';
    this.jewelryShopWindowGroup.add(this.itemPanel2_Text);
    // 아이템 프레임 1 (icon)
    this.jewelryIcon_2.scale.setTo(1);
    this.jewelryIcon_2.anchor.setTo(0.5);
    this.jewelryIcon_2.position.setTo(this.itemPanel1BG_2.position.x - 190, this.itemPanel1BG_2.position.y);
    this.jewelryShopWindowGroup.add(this.jewelryIcon_2);
    // 아이템 프레임 1 (button bg ON)
    this.getJewelry_Button_BG_2.scale.setTo(1);
    this.getJewelry_Button_BG_2.anchor.setTo(0.5);
    this.getJewelry_Button_BG_2.position.setTo(this.itemPanel1BG_2.position.x + 180, this.itemPanel1BG_2.position.y);
    this.getJewelry_Button_BG_2.inputEnabled = true;
    this.getJewelry_Button_BG_2.events.onInputUp.add( function () { shopManager.Buy_Jewelry(1); } );
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_2);
    // 아이템 프레임 1 (button bg OFF)
    this.getJewelry_Button_BG_2_OFF.scale.setTo(1);
    this.getJewelry_Button_BG_2_OFF.anchor.setTo(0.5);
    this.getJewelry_Button_BG_2_OFF.position.setTo(this.itemPanel1BG_2.position.x + 180, this.itemPanel1BG_2.position.y);
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_2_OFF);
    // 아이템 프레임 1 (button icon)
    this.ad_icon_1.scale.setTo(1);
    this.ad_icon_1.anchor.setTo(0.5);
    this.ad_icon_1.position.setTo(this.getJewelry_Button_BG_2.position.x, this.getJewelry_Button_BG_2.position.y);
    this.jewelryShopWindowGroup.add(this.ad_icon_1);
    // cool time text
    this.itemPanel_CollTime_Text_2.anchor.setTo(0.5);
    this.itemPanel_CollTime_Text_2.position.setTo(this.getJewelry_Button_BG_2_OFF.position.x, this.getJewelry_Button_BG_2_OFF.position.y - 5);
    this.itemPanel_CollTime_Text_2.setText("");
    this.itemPanel_CollTime_Text_2.align = 'center';
    this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_2);
    // this.movi_icon_2.scale.setTo(1);
    // this.movi_icon_2.anchor.setTo(0.5);
    // this.movi_icon_2.position.setTo(this.getJewelry_Button_BG_2.position.x - 40, this.getJewelry_Button_BG_2.position.y);
    // this.jewelryShopWindowGroup.add(this.movi_icon_2);
    // 아이템 프레임 1 (button text)
    // this.itemPanel_PayCounter_Text_2.anchor.setTo(0.5);
    // this.itemPanel_PayCounter_Text_2.position.setTo(this.getJewelry_Button_BG_2.position.x + 25, this.getJewelry_Button_BG_2.position.y);
    // this.itemPanel_PayCounter_Text_2.setText("500");
    // this.itemPanel_PayCounter_Text_2.align = 'center';
    // this.jewelryShopWindowGroup.add(this.itemPanel_PayCounter_Text_2);

    ////////////////////////////////////////////////////////// 아이템 프레임 3
    this.itemPanel2BG_1.scale.setTo(1);
    this.itemPanel2BG_1.anchor.setTo(0.5);
    this.itemPanel2BG_1.position.setTo(MG.game.world.centerX, 750);
    this.jewelryShopWindowGroup.add(this.itemPanel2BG_1);
    // 아이템 프레임 2 (icon)
    this.jewelryIcon_3.scale.setTo(1);
    this.jewelryIcon_3.anchor.setTo(0.5);
    this.jewelryIcon_3.position.setTo(this.itemPanel2BG_1.position.x - 190, this.itemPanel2BG_1.position.y);
    this.jewelryShopWindowGroup.add(this.jewelryIcon_3);
    // 아이템 프레임 2 (text)
    this.itemPanel3_Text.anchor.setTo(1, 0.5);
    this.itemPanel3_Text.position.setTo(this.itemPanel2BG_1.position.x + 80, this.itemPanel2BG_1.position.y - 15);
    this.itemPanel3_Text.setText("x" + shopManager.Get_Reward_Count(2));
    // this.itemPanel3_Text.tint = 0x1FBB99;
    this.itemPanel3_Text.align = 'right';
    this.jewelryShopWindowGroup.add(this.itemPanel3_Text);
    // 아이템 프레임 2 (button bg ON)
    this.getJewelry_Button_BG_3.scale.setTo(1);
    this.getJewelry_Button_BG_3.anchor.setTo(0.5);
    this.getJewelry_Button_BG_3.position.setTo(this.itemPanel2BG_1.position.x + 180, this.itemPanel2BG_1.position.y);
    this.getJewelry_Button_BG_3.inputEnabled = true;
    this.getJewelry_Button_BG_3.events.onInputUp.add( function () { shopManager.Buy_Jewelry(2); } );
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_3);
    // 아이템 프레임 2 (button bg OFF)
    this.getJewelry_Button_BG_3_OFF.scale.setTo(1);
    this.getJewelry_Button_BG_3_OFF.anchor.setTo(0.5);
    this.getJewelry_Button_BG_3_OFF.position.setTo(this.itemPanel2BG_1.position.x + 180, this.itemPanel2BG_1.position.y);
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_3_OFF);
    // 아이템 프레임 2 (button text)
    this.itemPanel_PayCounter_Text_3.anchor.setTo(0.5);
    this.itemPanel_PayCounter_Text_3.position.setTo(this.getJewelry_Button_BG_3.position.x, this.getJewelry_Button_BG_3.position.y);
    this.itemPanel_PayCounter_Text_3.setText("AD");
    this.itemPanel_PayCounter_Text_3.align = 'center';
    this.jewelryShopWindowGroup.add(this.itemPanel_PayCounter_Text_3);
    // cool time text
    this.itemPanel_CollTime_Text_3.anchor.setTo(0.5);
    this.itemPanel_CollTime_Text_3.position.setTo(this.getJewelry_Button_BG_3_OFF.position.x, this.getJewelry_Button_BG_3_OFF.position.y - 5);
    this.itemPanel_CollTime_Text_3.setText("");
    this.itemPanel_CollTime_Text_3.align = 'center';
    this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_3);

    //////////////////////////////////////////////////////////// 아이템 프레임 4
    this.itemPanel2BG_2.scale.setTo(1);
    this.itemPanel2BG_2.anchor.setTo(0.5);
    this.itemPanel2BG_2.position.setTo(MG.game.world.centerX, 895);
    this.jewelryShopWindowGroup.add(this.itemPanel2BG_2);
    // 아이템 프레임 2 (icon)
    this.jewelryIcon_4.scale.setTo(1);
    this.jewelryIcon_4.anchor.setTo(0.5);
    this.jewelryIcon_4.position.setTo(this.itemPanel2BG_2.position.x - 190, this.itemPanel2BG_2.position.y);
    this.jewelryShopWindowGroup.add(this.jewelryIcon_4);
    // 아이템 프레임 2 (text)
    this.itemPanel4_Text.anchor.setTo(1, 0.5);
    this.itemPanel4_Text.position.setTo(this.itemPanel2BG_2.position.x + 80, this.itemPanel2BG_2.position.y - 15);
    this.itemPanel4_Text.setText("x" + shopManager.Get_Reward_Count(3));
    // this.itemPanel4_Text.tint = 0x1FBB99;
    this.itemPanel4_Text.align = 'right';
    this.jewelryShopWindowGroup.add(this.itemPanel4_Text);
    // 아이템 프레임 2 (button bg ON)
    this.getJewelry_Button_BG_4.scale.setTo(1);
    this.getJewelry_Button_BG_4.anchor.setTo(0.5);
    this.getJewelry_Button_BG_4.position.setTo(this.itemPanel2BG_2.position.x + 180, this.itemPanel2BG_2.position.y);
    this.getJewelry_Button_BG_4.inputEnabled = true;
    this.getJewelry_Button_BG_4.events.onInputUp.add( function () { shopManager.Buy_Jewelry(3); } );
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_4);
    // 아이템 프레임 2 (button bg OFF)
    this.getJewelry_Button_BG_4_OFF.scale.setTo(1);
    this.getJewelry_Button_BG_4_OFF.anchor.setTo(0.5);
    this.getJewelry_Button_BG_4_OFF.position.setTo(this.itemPanel2BG_2.position.x + 180, this.itemPanel2BG_2.position.y);
    this.jewelryShopWindowGroup.add(this.getJewelry_Button_BG_4_OFF);
    // 아이템 프레임 2 (AD icon)
    this.ad_icon_2.scale.setTo(1);
    this.ad_icon_2.anchor.setTo(0.5);
    this.ad_icon_2.position.setTo(this.getJewelry_Button_BG_4.position.x, this.getJewelry_Button_BG_4.position.y);
    this.jewelryShopWindowGroup.add(this.ad_icon_2);
    // cool time text
    this.itemPanel_CollTime_Text_4.anchor.setTo(0.5);
    this.itemPanel_CollTime_Text_4.position.setTo(this.getJewelry_Button_BG_4_OFF.position.x, this.getJewelry_Button_BG_4_OFF.position.y - 5);
    this.itemPanel_CollTime_Text_4.setText("");
    this.itemPanel_CollTime_Text_4.align = 'center';
    this.jewelryShopWindowGroup.add(this.itemPanel_CollTime_Text_4);
    // 아이템 프레임 2 (button text)
    // this.itemPanel_PayCounter_Text_4.anchor.setTo(0.5);
    // this.itemPanel_PayCounter_Text_4.position.setTo(this.getJewelry_Button_BG_4.position.x, this.getJewelry_Button_BG_4.position.y);
    // this.itemPanel_PayCounter_Text_4.setText("1000");
    // this.itemPanel_PayCounter_Text_4.align = 'center';
    // this.jewelryShopWindowGroup.add(this.itemPanel_PayCounter_Text_4);

    // OK Button
    this.okButton.position.setTo(MG.game.world.centerX, 1035);
    this.okButton.scale.setTo(1.4);
    this.okButton.anchor.setTo(0.5);
    this.okButton.inputEnabled = true;
    this.okButton.events.onInputUp.add( this.onClick_OK, this );
    this.jewelryShopWindowGroup.add(this.okButton);
    // OK text
    this.ok_Text = MG.game.add.bitmapText(this.okButton.position.x, this.okButton.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.ok_Text.anchor.setTo(0.5);
    this.ok_Text.setText('OK');
    this.ok_Text.align = 'center';
    this.jewelryShopWindowGroup.add(this.ok_Text);
};

UI_JewelryShop.prototype.Create_IsBuyWindow = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall_IsBuy.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall_IsBuy.anchor.setTo(0.5);
    this.blackWall_IsBuy.alpha = 0.75;
    this.blackWall_IsBuy.inputEnabled = true;
    this.blackWall_IsBuy.events.onInputUp.add( function () {} );
    this.windowIsBuyGroup.add(this.blackWall_IsBuy);
    // BG pannel
    this.isBuyPanelBG.scale.setTo(1);
    this.isBuyPanelBG.anchor.setTo(0.5);
    this.windowIsBuyGroup.add(this.isBuyPanelBG);
    // 내부 박스
    this.isBuyPanel_MessageBG.scale.setTo(1);
    this.isBuyPanel_MessageBG.anchor.setTo(0.5);
    this.windowIsBuyGroup.add(this.isBuyPanel_MessageBG);
    // 설명글
    this.isBuy_dialog.anchor.setTo(0.5);
    this.isBuy_dialog.position.setTo(this.isBuyPanel_MessageBG.position.x, this.isBuyPanel_MessageBG.position.y);
    this.windowIsBuyGroup.add(this.isBuy_dialog);
    // OK Button
    this.okButton_IsBuy.position.setTo(MG.game.world.centerX + 130, this.isBuyPanelBG.position.y + 125);
    this.okButton_IsBuy.anchor.setTo(0.5);
    this.okButton_IsBuy.inputEnabled = true;
    this.okButton_IsBuy.events.onInputUp.add( this.onClick_IsBuy_OK, this );
    this.windowIsBuyGroup.add(this.okButton_IsBuy);
    // OK text
    this.ok_Text = MG.game.add.bitmapText(this.okButton_IsBuy.position.x, this.okButton_IsBuy.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.ok_Text.anchor.setTo(0.5);
    this.ok_Text.setText('OK');
    this.ok_Text.align = 'center';
    this.windowIsBuyGroup.add(this.ok_Text);
    // NO Button
    this.noButton_IsBuy.position.setTo(MG.game.world.centerX - 130, this.isBuyPanelBG.position.y + 125);
    this.noButton_IsBuy.anchor.setTo(0.5);
    this.noButton_IsBuy.inputEnabled = true;
    this.noButton_IsBuy.events.onInputUp.add( this.onClick_IsBuy_NO, this );
    this.windowIsBuyGroup.add(this.noButton_IsBuy);
    // NO text
    this.no_Text = MG.game.add.bitmapText(this.noButton_IsBuy.position.x, this.noButton_IsBuy.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.no_Text.anchor.setTo(0.5);
    this.no_Text.align = 'center';
    this.no_Text.setText('NO');
    this.windowIsBuyGroup.add(this.no_Text);
};

// 충전, 구매 완료 창
UI_JewelryShop.prototype.Create_OkBuyWindow = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall_OkBuy.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall_OkBuy.anchor.setTo(0.5);
    this.blackWall_OkBuy.alpha = 0.75;
    this.blackWall_OkBuy.inputEnabled = true;
    this.blackWall_OkBuy.events.onInputUp.add( function () {} );
    this.windowOkBuyGroup.add(this.blackWall_OkBuy);
    // BG pannel
    this.OkBuyPanelBG.scale.setTo(1);
    this.OkBuyPanelBG.anchor.setTo(0.5);
    this.windowOkBuyGroup.add(this.OkBuyPanelBG);
    // 내부 박스
    this.OkBuyPanel_MessageBG.scale.setTo(1);
    this.OkBuyPanel_MessageBG.anchor.setTo(0.5);
    this.windowOkBuyGroup.add(this.OkBuyPanel_MessageBG);
    // 설명글
    this.OkBuy_dialog.anchor.setTo(0.5);
    this.OkBuy_dialog.position.setTo(this.isBuyPanel_MessageBG.position.x, this.isBuyPanel_MessageBG.position.y);
    this.windowOkBuyGroup.add(this.OkBuy_dialog);
    // OK Button
    this.okButton_OkBuy.position.setTo(MG.game.world.centerX, this.isBuyPanelBG.position.y + 125);
    this.okButton_OkBuy.anchor.setTo(0.5);
    this.okButton_OkBuy.inputEnabled = true;
    this.okButton_OkBuy.events.onInputUp.add( this.onClick_IsBuy_OK, this );
    this.windowOkBuyGroup.add(this.okButton_OkBuy);
    // OK text
    this.ok_OkText = MG.game.add.bitmapText(this.okButton_OkBuy.position.x, this.okButton_OkBuy.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.ok_OkText.anchor.setTo(0.5);
    this.ok_OkText.setText('OK');
    this.ok_OkText.align = 'center';
    this.windowOkBuyGroup.add(this.ok_OkText);
};

UI_JewelryShop.prototype.VisibleWindow = function (b) {
    this.jewelryShopWindowGroup.visible = b;
    if(b) {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off'); // se_popup_on 보다 이게 더 어울리는 사운드라 열리는 때 사용
        // this.getJewelry_Button_BG_1.loadTexture('atlas_UI', 'btn_shop_disable.png');

        //MG.game.world.bringToTop(this.jewelryShopWindowGroup);
    } else {
        shopManager.CloseJewelShopWindow();
    }
};

UI_JewelryShop.prototype.Set_CoolTime_0 = function (_t) {
    if(_t != 'none') {
        this.getJewelry_Button_BG_1.visible = false;
        this.getJewelry_Button_BG_1_OFF.visible = true;
        this.itemPanel_PayCounter_Text_1.setText("");
        this.itemPanel_CollTime_Text_1.setText(_t);
    } else {
        this.getJewelry_Button_BG_1.visible = true;
        this.getJewelry_Button_BG_1_OFF.visible = false;
        this.itemPanel_PayCounter_Text_1.setText("AD");
        this.itemPanel_CollTime_Text_1.setText("");
    }
};

UI_JewelryShop.prototype.Set_CoolTime_1 = function (_t) {
    if(_t != 'none') {
        this.getJewelry_Button_BG_2.visible = false;
        this.getJewelry_Button_BG_2_OFF.visible = true;
        this.ad_icon_1.visible = false;
        this.itemPanel_CollTime_Text_2.setText(_t);
    } else {
        this.getJewelry_Button_BG_2.visible = true;
        this.getJewelry_Button_BG_2_OFF.visible = false;
        this.ad_icon_1.visible = true;
        this.itemPanel_CollTime_Text_2.setText("");
    }
};

UI_JewelryShop.prototype.Set_CoolTime_2 = function (_t) {
    if(_t != 'none') {
        this.getJewelry_Button_BG_3.visible = false;
        this.getJewelry_Button_BG_3_OFF.visible = true;
        this.itemPanel_PayCounter_Text_3.setText("");
        this.itemPanel_CollTime_Text_3.setText(_t);
    } else {
        this.getJewelry_Button_BG_3.visible = true;
        this.getJewelry_Button_BG_3_OFF.visible = false;
        this.itemPanel_PayCounter_Text_3.setText("AD");
        this.itemPanel_CollTime_Text_3.setText("");
    }
};

UI_JewelryShop.prototype.Set_CoolTime_3 = function (_t) {
    if(_t != 'none') {
        this.getJewelry_Button_BG_4.visible = false;
        this.getJewelry_Button_BG_4_OFF.visible = true;
        this.ad_icon_2.visible = false;
        this.itemPanel_CollTime_Text_4.setText(_t);
    } else {
        this.getJewelry_Button_BG_4.visible = true;
        this.getJewelry_Button_BG_4_OFF.visible = false;
        this.ad_icon_2.visible = true;
        this.itemPanel_CollTime_Text_4.setText("");
    }
};

UI_JewelryShop.prototype.VisibleIsBuyWindow = function (b) {
    this.windowIsBuyGroup.visible = b;

    if(b)
    {
        MG.game.world.bringToTop(this.windowIsBuyGroup);
    }
};

UI_JewelryShop.prototype.VisibleOkBuyWindow = function (b, _count) {
    this.windowOkBuyGroup.visible = b;

    if(b)
    {
        if(_count != undefined) this.OkBuy_dialog.setText(GetString("GEM_Get", _count));
        MG.game.world.bringToTop(this.windowOkBuyGroup);
    }
};

UI_JewelryShop.prototype.onClick_OK = function () {
    this.VisibleWindow(false);
};

UI_JewelryShop.prototype.onClick_IsBuy_OK = function () {
    this.VisibleOkBuyWindow(false);
    this.VisibleWindow(true);
};

UI_JewelryShop.prototype.onClick_IsBuy_NO = function () {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
    this.VisibleIsBuyWindow(false);
};