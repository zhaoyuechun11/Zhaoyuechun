
function UI_UserItem() {
    this.isTimeUse = false;
    this.isSlowUse = false;
    this.isLifeUse = false;
    this.userItemWindowGroup = MG.game.add.group();     // 모든 요소 포함
    this.time_slot_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'item_slot');
    this.slow_slot_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'item_slot');
    this.shield_slot_spine = MG.game.add.spine(MG.game.world.centerX, MG.game.world.centerY, 'item_slot');
    this.gradationBG = MG.game.add.image(0, 0, 'atlas_UI', 'ready_bg.png');
    this.bestScoreTitle_Text = MG.game.add.bitmapText(MG.game.world.centerX, 190, 'uiFont', 'Bitmap Fonts!', 30);
    this.bestScoreCount_Text = MG.game.add.bitmapText(MG.game.world.centerX, 280, 'uiFont', 'Bitmap Fonts!', 35);
    this.panelOption = { game: MG.game, packname: "atlas_UI", pngname: "best.png", x: MG.game.world.centerX, y: 280, w: 556, h: 88, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.mainWindowOption = { game: MG.game, packname: "atlas_UI", pngname: "panel.png", x: MG.game.world.centerX, y: MG.game.world.centerY, w: 606, h: 539, off_l: 27, off_r: 27, off_t: 27, off_b: 27 };
    this.playButtonOption = { game: MG.game, packname: "atlas_UI", pngname: "btn_main_yellow.png", x: MG.game.world.centerX, y: MG.game.world.height - 250, w: 550, h: 98, off_l: 43, off_r: 43, off_t: 0, off_b: 0 };
    this.stageJumpButtonOption = { game: MG.game, packname: "atlas_UI", pngname: "btn_main_green.png", x: MG.game.world.centerX, y: MG.game.world.height - 100, w: 550, h: 98, off_l: 43, off_r: 43, off_t: 0, off_b: 0 };
    this.time_useJewelryInfoBox_Enable_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_1.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.time_useJewelryInfoBoxEnableBG = uiManager.createImg9(this.time_useJewelryInfoBox_Enable_Option);
    this.time_useJewelryInfoBox_Disable_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.time_useJewelryInfoBoxDisableBG = uiManager.createImg9(this.time_useJewelryInfoBox_Disable_Option);
    this.slow_useJewelryInfoBox_Enable_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_1.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.slow_useJewelryInfoBoxEnableBG = uiManager.createImg9(this.slow_useJewelryInfoBox_Enable_Option);
    this.slow_useJewelryInfoBox_Disable_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.slow_useJewelryInfoBoxDisableBG = uiManager.createImg9(this.slow_useJewelryInfoBox_Disable_Option);
    this.life_useJewelryInfoBox_Enable_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_1.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.life_useJewelryInfoBoxEnableBG = uiManager.createImg9(this.life_useJewelryInfoBox_Enable_Option);
    this.life_useJewelryInfoBox_Disable_Option = { game: MG.game, packname: "atlas_UI", pngname: "btn_shop_disable.png", x: 0, y: 0, w: 148, h: 73, off_l: 40, off_r: 40, off_t: 0, off_b: 0 };
    this.life_useJewelryInfoBoxDisableBG = uiManager.createImg9(this.life_useJewelryInfoBox_Disable_Option);
    this.horizontalLine = MG.game.add.sprite(0, 0, 'atlas_UI', 'line_width.png');
    this.dialog1Style = {font: "23px Arial", fill: "#666666", align: "center", fontWeight: "normal"};
    this.dialog3Style = {font: "23px Arial", fill: "#666666", align: "center", fontWeight: "normal"};
    this.dialog2Style = {font: "30px Arial", fill: "#ffffff", align: "center", fontWeight: "bold"};
    this.timeUI_Parent = MG.game.add.sprite(0, 0, 'blank');
    this.slowUI_Parent = MG.game.add.image(0, 0, 'blank');
    this.lifeUI_Parent = MG.game.add.image(0, 0, 'blank');

    this.Create_UserItemWindow();
    this.VisibleWindow(false);
}

/////////////////////////////////////////////////////////
/// 유저 아이템 장착 윈도우
/////////////////////////////////////////////////////////
UI_UserItem.prototype.Create_UserItemWindow = function () {

    if(isPlaying)
    {
        uiManager.PlayGame();
        return;
    }

    this.gradationBG.anchor.setTo(0, 0);
    this.gradationBG.scale.setTo(MG.game.world.width * 0.1, 1);
    this.userItemWindowGroup.add(this.gradationBG);

    this.BestScoreZone();

    // 옵션창
    this.mainBG = uiManager.createImg9(this.mainWindowOption);
    this.mainBG.scale.setTo(1);
    this.mainBG.anchor.setTo(0.5);
    this.userItemWindowGroup.add(this.mainBG);
    this.dialog1Text = MG.game.add.text(this.mainBG.position.x, this.mainBG.position.y - 210, '', this.dialog3Style);
    this.dialog1Text.anchor.setTo(0.5);
    this.dialog1Text.setText(GetString("Item_Description"));
    this.userItemWindowGroup.add(this.dialog1Text);
    // horizontal Line
    this.horizontalLine.position.setTo(this.mainBG.position.x, this.mainBG.position.y - 160);
    this.horizontalLine.scale.setTo(48, 1);
    this.horizontalLine.alpha = 0.5;
    this.horizontalLine.anchor.setTo(0.5, 0.5);
    this.userItemWindowGroup.add(this.horizontalLine);

    this.TimeUI();
    this.SlowUI();
    this.LifeUI();
    this.Buttons();


};

UI_UserItem.prototype.VisibleWindow = function (b) {
    this.userItemWindowGroup.visible = b;
    if(b) {
        currentScene = "userItem";
        uData.nStage = 1;
    }
};

UI_UserItem.prototype.BestScoreZone = function () {
    // 'BEST SCORE' text
    this.bestScoreTitle_Text.anchor.setTo(0.5);
    this.bestScoreTitle_Text.setText("BEST LEVEL");
    this.bestScoreTitle_Text.tint = '#ffffff';
    this.bestScoreTitle_Text.alpha = 0.6;
    this.bestScoreTitle_Text.align = 'center';
    this.userItemWindowGroup.add(this.bestScoreTitle_Text);
    // Jewelry Count BG
    this.bestScoreBG = uiManager.createImg9(this.panelOption);
    this.bestScoreBG.scale.setTo(1);
    this.bestScoreBG.anchor.setTo(0.5);
    this.userItemWindowGroup.add(this.bestScoreBG);
    // Jewelry Count Text
    this.bestScoreCount_Text.anchor.setTo(0.5);
    this.bestScoreCount_Text.setText(uData.nBestScore);
    // this.bestScoreCount_Text.tint = '#ffffff';
    // this.bestScoreCount_Text.alpha = 0.6;
    this.bestScoreCount_Text.align = 'center';
    this.userItemWindowGroup.add(this.bestScoreCount_Text);
};

UI_UserItem.prototype.Buttons = function () {
    // PLAY Button
    this.playButton = uiManager.createImg9(this.playButtonOption);
    this.playButton.scale.setTo(1);
    this.playButton.anchor.setTo(0.5);
    this.playButton.inputEnabled = true;
    this.playButton.events.onInputUp.add( function () {this.OnClickEvent_PlayButton()}.bind(this) );
    this.userItemWindowGroup.add(this.playButton);
    this.playButton_Text = MG.game.add.bitmapText(this.playButton.position.x, this.playButton.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.playButton_Text.anchor.setTo(0.5);
    this.playButton_Text.setText("PLAY");
    this.playButton_Text.align = 'center';
    this.userItemWindowGroup.add(this.playButton_Text);

    // STAGE JUMP Button
    this.stageJumpButton = uiManager.createImg9(this.stageJumpButtonOption);
    this.stageJumpButton.scale.setTo(1);
    this.stageJumpButton.anchor.setTo(0.5);
    this.userItemWindowGroup.add(this.stageJumpButton);
    this.jumpButton_Text = MG.game.add.bitmapText(this.stageJumpButton.position.x, this.stageJumpButton.position.y, 'uiFont','Bitmap Fonts!', 45);
    this.jumpButton_Text.anchor.setTo(0.5);
    this.jumpButton_Text.setText("LEVEL JUMP");
    this.jumpButton_Text.align = 'center';
    if(uData.nBestScore >= 11) {
        this.stageJumpButton.inputEnabled = true;
        this.stageJumpButton.alpha = 1;
        this.jumpButton_Text.alpha = 1;
    } else {
        this.stageJumpButton.inputEnabled = false;
        this.stageJumpButton.alpha = 0.35;
        this.jumpButton_Text.alpha = 0.35;
    }
    this.stageJumpButton.events.onInputUp.add( function () {this.OnClickEvent_JumpButton();}.bind(this) );
    this.userItemWindowGroup.add(this.jumpButton_Text);
};

UI_UserItem.prototype.TimeUI = function () {
    this.timeUI_Parent.position.setTo(this.mainBG.position.x - 200, this.mainBG.position.y);
    this.timeUI_Parent.scale.setTo(1);
    this.timeUI_Parent.anchor.setTo(0.5);
    // Spine
    this.time_slot_spine.setAnimationByName(0, "time_idle", true);
    this.time_slot_spine.position.setTo(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y);
    this.time_slot_spine.scale.setTo(1);
    this.time_slot_spine.state.onComplete = function () {};
    // O Button
    this.time_button = MG.game.add.image(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y, 'atlas_UI', 'item_normal.png');
    this.time_button.scale.setTo(1);
    this.time_button.anchor.setTo(0.5);
    this.time_button.alpha = 0;
    this.time_button.inputEnabled = true;
    this.time_button.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Time", !this.isTimeUse, this.time_useJewelryCount_Text, this.time_jewelIcon, this.time_cancleText)
    }.bind(this) );
    // Reward Text
    this.reward_Text = MG.game.add.bitmapText(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 45, 'uiFont','Bitmap Fonts!', 20);
    this.reward_Text.anchor.setTo(0.5);
    this.reward_Text.setText("+" + MG.gameSheetsData["AddTimePlus"].toString());
    this.reward_Text.align = 'center';
    // this.time_reward_node = this.FindSpineNode(this.time_slot_spine, "text_time_count");
    // this.time_reward_node.addChild(this.reward_Text);
    // comment Text
    this.commentText = MG.game.add.text(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 120, '', this.dialog1Style);
    this.commentText.anchor.setTo(0.5);
    this.commentText.setText(GetString("Passive_Item01_Explanation", MG.gameSheetsData["AddTimePlus"]));
    // use Jewelry Information Box
    this.time_useJewelryInfoBoxEnableBG.position.setTo(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 190);
    this.time_useJewelryInfoBoxEnableBG.scale.setTo(1);
    this.time_useJewelryInfoBoxEnableBG.anchor.setTo(0.5);
    this.time_useJewelryInfoBoxEnableBG.inputEnabled = true;
    this.time_useJewelryInfoBoxEnableBG.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Time", !this.isTimeUse, this.time_useJewelryCount_Text, this.time_jewelIcon, this.time_cancleText)
    }.bind(this) );
    this.time_useJewelryInfoBoxDisableBG.position.setTo(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 190);
    this.time_useJewelryInfoBoxDisableBG.scale.setTo(1);
    this.time_useJewelryInfoBoxDisableBG.anchor.setTo(0.5);
    this.time_useJewelryInfoBoxDisableBG.visible = false;
    this.time_useJewelryInfoBoxDisableBG.inputEnabled = true;
    this.time_useJewelryInfoBoxDisableBG.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Time", !this.isTimeUse, this.time_useJewelryCount_Text, this.time_jewelIcon, this.time_cancleText)
    }.bind(this) );
    // 크기 조정
    this.time_use_jewel_count =  Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["TimeItemPayCount"]));
    this.time_icon_scale = 0;
    this.time_text_scale = 0;
    if(this.time_use_jewel_count >= 10000) {
        this.time_icon_scale = 0.3;
        this.time_text_scale = 23;
    } else if(this.time_use_jewel_count < 10000 && this.time_use_jewel_count >= 1000) {
        this.time_icon_scale = 0.32;
        this.time_text_scale = 25;
    } else if(this.time_use_jewel_count < 1000 && this.time_use_jewel_count >= 100) {
        this.time_icon_scale = 0.34;
        this.time_text_scale = 27;
    } else if(this.time_use_jewel_count < 100 && this.time_use_jewel_count >= 10) {
        this.time_icon_scale = 0.36;
        this.time_text_scale = 29;
    } else {
        this.time_icon_scale = 0.4;
        this.time_text_scale = 31;
    }
    // jewelry icon
    this.time_jewelIcon = MG.game.add.image(this.time_useJewelryInfoBoxEnableBG.position.x - 60, this.time_useJewelryInfoBoxEnableBG.position.y, 'atlas_UI', 'jewel.png');
    this.time_jewelIcon.scale.setTo(this.time_icon_scale);
    this.time_jewelIcon.anchor.setTo(0, 0.5);
    // use Jewelry Count Text
    this.time_useJewelryCount_Text = MG.game.add.bitmapText(this.time_useJewelryInfoBoxEnableBG.position.x + 17, this.time_useJewelryInfoBoxEnableBG.position.y, 'uiFont','Bitmap Fonts!', this.time_text_scale);
    this.time_useJewelryCount_Text.anchor.setTo(0.5);
    this.time_useJewelryCount_Text.setText(this.time_use_jewel_count);
    // this.time_useJewelryCount_Text.setText('55555');
    this.time_useJewelryCount_Text.align = 'center';
    // 해제
    this.time_cancleText = MG.game.add.text(this.timeUI_Parent.position.x, this.time_useJewelryInfoBoxEnableBG.position.y, '', this.dialog2Style);
    this.time_cancleText.anchor.setTo(0.5);
    this.time_cancleText.setText(GetString("Release"));
    this.time_cancleText.visible = false;

    // add Group
    this.userItemWindowGroup.add(this.timeUI_Parent);
    // this.userItemWindowGroup.add(this.title_Text);
    this.userItemWindowGroup.add(this.time_slot_spine);
    this.userItemWindowGroup.add(this.time_button);
    this.userItemWindowGroup.add(this.reward_Text);
    this.userItemWindowGroup.add(this.commentText);
    this.userItemWindowGroup.add(this.time_useJewelryInfoBoxEnableBG);
    this.userItemWindowGroup.add(this.time_useJewelryInfoBoxDisableBG);
    this.userItemWindowGroup.add(this.time_jewelIcon);
    this.userItemWindowGroup.add(this.time_useJewelryCount_Text);
    this.userItemWindowGroup.add(this.time_cancleText);
};

UI_UserItem.prototype.SlowUI = function () {
    this.slowUI_Parent.position.setTo(this.mainBG.position.x, this.mainBG.position.y);
    this.slowUI_Parent.scale.setTo(1);
    this.slowUI_Parent.anchor.setTo(0.5);
    // item Title
    // this.title_Text = MG.game.add.bitmapText(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y - 100, 'uiFontBlack','Bitmap Fonts!', 25);
    // this.title_Text.tint = '#ffffff';
    // this.title_Text.alpha = 0.65;
    // this.title_Text.anchor.setTo(0.5);
    // this.title_Text.setText("SLOW");
    // this.title_Text.align = 'center';
    // Spine
    this.slow_slot_spine.setAnimationByName(0, "slow_idle", true);
    this.slow_slot_spine.position.setTo(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y);
    this.slow_slot_spine.scale.setTo(1);
    this.slow_slot_spine.state.onComplete = function () {};
    // this.slow_slot_spine.inputEnabled = true;
    // this.slow_slot_spine.events.onInputUp.add( function () {
    //     this.OnClickEvent_SetItem("Slow", !this.isSlowUse, this.slow_slot_spine, this.slow_useJewelryCount_Text, this.slow_jewelIcon, this.slow_cancleText)
    // }.bind(this) );
    // O Button
    this.slow_button = MG.game.add.image(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y, 'atlas_UI', 'item_normal.png');
    this.slow_button.scale.setTo(1);
    this.slow_button.anchor.setTo(0.5);
    this.slow_button.alpha = 0;
    this.slow_button.inputEnabled = true;
    this.slow_button.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Slow", !this.isSlowUse, this.slow_useJewelryCount_Text, this.slow_jewelIcon, this.slow_cancleText)
    }.bind(this) );
    // icon 1
    // this.itemIcon = MG.game.add.image(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y - 15, 'atlas_UI', 'item_2_1.png');
    // this.itemIcon.scale.setTo(1);
    // this.itemIcon.anchor.setTo(0.5);
    // icon 2
    // this.itemIcon2 = MG.game.add.image(this.itemIcon.position.x + 15, this.itemIcon.position.y + 15, 'atlas_UI', 'item_2_2.png');
    // this.itemIcon2.scale.setTo(1);
    // this.itemIcon2.anchor.setTo(0.5);
    // Reward Text
    this.reward_Text = MG.game.add.bitmapText(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 45, 'uiFont','Bitmap Fonts!', 20);
    this.reward_Text.anchor.setTo(0.5);
    this.ratio = parseFloat(1 - MG.gameSheetsData["SlowItemSkill"]);
    this.reward_Text.setText("-" + Math.round(this.ratio * 100).toString());
    this.reward_Text.align = 'center';
    // comment Text
    this.commentText = MG.game.add.text(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 120, '', this.dialog1Style);
    this.commentText.anchor.setTo(0.5);
    // this.commentText.setText("방해물 속도\n" + Math.round(this.ratio * 100).toString() + "% 감소");
    this.commentText.setText(GetString("Passive_Item02_Explanation", Math.round(this.ratio * 100)));
    // use Jewelry Information Box
    this.slow_useJewelryInfoBoxEnableBG.position.setTo(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 190);
    this.slow_useJewelryInfoBoxEnableBG.scale.setTo(1);
    this.slow_useJewelryInfoBoxEnableBG.inputEnabled = true;
    this.slow_useJewelryInfoBoxEnableBG.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Slow", !this.isSlowUse, this.slow_useJewelryCount_Text, this.slow_jewelIcon, this.slow_cancleText)
    }.bind(this) );
    this.slow_useJewelryInfoBoxDisableBG.position.setTo(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 190);
    this.slow_useJewelryInfoBoxDisableBG.scale.setTo(1);
    this.slow_useJewelryInfoBoxDisableBG.anchor.setTo(0.5);
    this.slow_useJewelryInfoBoxDisableBG.visible = false;
    this.slow_useJewelryInfoBoxDisableBG.inputEnabled = true;
    this.slow_useJewelryInfoBoxDisableBG.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Slow", !this.isSlowUse, this.slow_useJewelryCount_Text, this.slow_jewelIcon, this.slow_cancleText)
    }.bind(this) );
    // 크기 조정
    this.slow_use_jewel_count =  Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["SlowItemPayCount"]));
    this.slow_icon_scale = 0;
    this.slow_text_scale = 0;
    if(this.slow_use_jewel_count >= 10000) {
        this.slow_icon_scale = 0.3;
        this.slow_text_scale = 23;
    } else if(this.slow_use_jewel_count < 10000 && this.slow_use_jewel_count >= 1000) {
        this.slow_icon_scale = 0.32;
        this.slow_text_scale = 25;
    } else if(this.slow_use_jewel_count < 1000 && this.slow_use_jewel_count >= 100) {
        this.slow_icon_scale = 0.34;
        this.slow_text_scale = 27;
    } else if(this.slow_use_jewel_count < 100 && this.slow_use_jewel_count >= 10) {
        this.slow_icon_scale = 0.36;
        this.slow_text_scale = 29;
    } else {
        this.slow_icon_scale = 0.4;
        this.slow_text_scale = 31;
    }
    // jewelry icon
    this.slow_jewelIcon = MG.game.add.image(this.slow_useJewelryInfoBoxEnableBG.position.x - 60, this.slow_useJewelryInfoBoxEnableBG.position.y, 'atlas_UI', 'jewel.png');
    this.slow_jewelIcon.scale.setTo(this.slow_icon_scale);
    this.slow_jewelIcon.anchor.setTo(0, 0.5);
    // use Jewelry Count Text
    this.slow_useJewelryCount_Text = MG.game.add.bitmapText(this.slow_useJewelryInfoBoxEnableBG.position.x + 17, this.slow_useJewelryInfoBoxEnableBG.position.y, 'uiFont','Bitmap Fonts!', this.slow_text_scale);
    this.slow_useJewelryCount_Text.anchor.setTo(0.5);
    this.slow_useJewelryCount_Text.setText(this.slow_use_jewel_count);
    this.slow_useJewelryCount_Text.align = 'center';
    // 해제
    this.slow_cancleText = MG.game.add.text(this.slowUI_Parent.position.x, this.slow_useJewelryInfoBoxEnableBG.position.y, '', this.dialog2Style);
    this.slow_cancleText.anchor.setTo(0.5);
    this.slow_cancleText.setText(GetString("Release"));
    this.slow_cancleText.visible = false;

    // add Group
    this.userItemWindowGroup.add(this.slowUI_Parent);
    // this.userItemWindowGroup.add(this.title_Text);
    this.userItemWindowGroup.add(this.slow_slot_spine);
    this.userItemWindowGroup.add(this.slow_button);
    // this.userItemWindowGroup.add(this.itemIcon2);
    this.userItemWindowGroup.add(this.reward_Text);
    this.userItemWindowGroup.add(this.commentText);
    this.userItemWindowGroup.add(this.slow_useJewelryInfoBoxEnableBG);
    this.userItemWindowGroup.add(this.slow_useJewelryInfoBoxDisableBG);
    this.userItemWindowGroup.add(this.slow_jewelIcon);
    this.userItemWindowGroup.add(this.slow_useJewelryCount_Text);
    this.userItemWindowGroup.add(this.slow_cancleText);
};

UI_UserItem.prototype.LifeUI = function () {
    this.lifeUI_Parent.position.setTo(this.mainBG.position.x + 200, this.mainBG.position.y);
    this.lifeUI_Parent.scale.setTo(1);
    this.lifeUI_Parent.anchor.setTo(0.5);
    // item Title
    // this.title_Text = MG.game.add.bitmapText(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y - 100, 'uiFontBlack','Bitmap Fonts!', 25);
    // this.title_Text.tint = '#ffffff';
    // this.title_Text.alpha = 0.65;
    // this.title_Text.anchor.setTo(0.5);
    // this.title_Text.setText("SHIELD");
    // this.title_Text.align = 'center';
    // Spine
    this.shield_slot_spine.setAnimationByName(0, "shield_idle", true);
    this.shield_slot_spine.position.setTo(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y);
    this.shield_slot_spine.scale.setTo(1);
    this.shield_slot_spine.state.onComplete = function () {};
// this.shield_slot_spine.inputEnabled = true;
    // this.shield_slot_spine.events.onInputUp.add( function () {
    //     this.OnClickEvent_SetItem("Life", !this.isLifeUse, this.shield_slot_spine, this.life_useJewelryCount_Text, this.life_jewelIcon, this.life_cancleText)
    // }.bind(this) );
    // icon
    // this.itemIcon = MG.game.add.image(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y - 10, 'atlas_UI', 'item_3.png');
    // this.itemIcon.anchor.setTo(0.5);
    // Button
    this.shield_button = MG.game.add.image(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y, 'atlas_UI', 'item_normal.png');
    this.shield_button.scale.setTo(1);
    this.shield_button.anchor.setTo(0.5);
    this.shield_button.alpha = 0;
    this.shield_button.inputEnabled = true;
    this.shield_button.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Life", !this.isLifeUse, this.life_useJewelryCount_Text, this.life_jewelIcon, this.life_cancleText)
    }.bind(this) );
    // Reward Text
    this.reward_Text = MG.game.add.bitmapText(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 45, 'uiFont','Bitmap Fonts!', 20);
    this.reward_Text.anchor.setTo(0.5);
    this.reward_Text.setText("+" + MG.gameSheetsData["LifeItemSkill"].toString());
    this.reward_Text.align = 'center';
    // comment Text
    this.commentText = MG.game.add.text(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 120, '', this.dialog1Style);
    this.commentText.anchor.setTo(0.5);
    // this.commentText.setText("실드\n" + MG.gameSheetsData["LifeItemSkill"].toString() + "개 추가");
    this.commentText.setText(GetString("Passive_Item03_Explanation", MG.gameSheetsData["LifeItemSkill"]));
    // use Jewelry Information Box
    this.life_useJewelryInfoBoxEnableBG.position.setTo(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 190);
    this.life_useJewelryInfoBoxEnableBG.scale.setTo(1);
    this.life_useJewelryInfoBoxEnableBG.anchor.setTo(0.5);
    this.life_useJewelryInfoBoxEnableBG.inputEnabled = true;
    this.life_useJewelryInfoBoxEnableBG.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Life", !this.isLifeUse, this.life_useJewelryCount_Text, this.life_jewelIcon, this.life_cancleText)
    }.bind(this) );
    this.life_useJewelryInfoBoxDisableBG.position.setTo(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 190);
    this.life_useJewelryInfoBoxDisableBG.scale.setTo(1);
    this.life_useJewelryInfoBoxDisableBG.anchor.setTo(0.5);
    this.life_useJewelryInfoBoxDisableBG.visible = false;
    this.life_useJewelryInfoBoxDisableBG.inputEnabled = true;
    this.life_useJewelryInfoBoxDisableBG.events.onInputUp.add( function () {
        this.OnClickEvent_SetItem("Life", !this.isLifeUse, this.life_useJewelryCount_Text, this.life_jewelIcon, this.life_cancleText)
    }.bind(this) );
    // 크기 조정
    this.life_use_jewel_count =  Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["LifeItemPayCount"]));
    this.life_icon_scale = 0;
    this.life_text_scale = 0;
    if(this.life_use_jewel_count >= 10000) {
        this.life_icon_scale = 0.3;
        this.life_text_scale = 23;
    } else if(this.life_use_jewel_count < 10000 && this.life_use_jewel_count >= 1000) {
        this.life_icon_scale = 0.32;
        this.life_text_scale = 25;
    } else if(this.life_use_jewel_count < 1000 && this.life_use_jewel_count >= 100) {
        this.life_icon_scale = 0.34;
        this.life_text_scale = 27;
    } else if(this.life_use_jewel_count < 100 && this.life_use_jewel_count >= 10) {
        this.life_icon_scale = 0.36;
        this.life_text_scale = 29;
    } else {
        this.life_icon_scale = 0.4;
        this.life_text_scale = 31;
    }
    // jewelry icon
    this.life_jewelIcon = MG.game.add.image(this.life_useJewelryInfoBoxEnableBG.position.x - 60, this.life_useJewelryInfoBoxEnableBG.position.y, 'atlas_UI', 'jewel.png');
    this.life_jewelIcon.scale.setTo(this.life_icon_scale);
    this.life_jewelIcon.anchor.setTo(0, 0.5);
    // use Jewelry Count Text
    this.life_useJewelryCount_Text = MG.game.add.bitmapText(this.life_useJewelryInfoBoxEnableBG.position.x + 17, this.life_useJewelryInfoBoxEnableBG.position.y, 'uiFont','Bitmap Fonts!', this.life_text_scale);
    this.life_useJewelryCount_Text.anchor.setTo(0.5);
    this.life_useJewelryCount_Text.setText(this.life_use_jewel_count);
    this.life_useJewelryCount_Text.align = 'center';
    // 해제
    this.life_cancleText = MG.game.add.text(this.lifeUI_Parent.position.x, this.life_useJewelryInfoBoxEnableBG.position.y, '', this.dialog2Style);
    this.life_cancleText.anchor.setTo(0.5);
    this.life_cancleText.setText(GetString("Release"));
    this.life_cancleText.visible = false;

    // add Group
    this.userItemWindowGroup.add(this.lifeUI_Parent);
    // this.userItemWindowGroup.add(this.title_Text);
    this.userItemWindowGroup.add(this.shield_slot_spine);
    this.userItemWindowGroup.add(this.shield_button);
    this.userItemWindowGroup.add(this.reward_Text);
    this.userItemWindowGroup.add(this.commentText);
    this.userItemWindowGroup.add(this.life_useJewelryInfoBoxEnableBG);
    this.userItemWindowGroup.add(this.life_useJewelryInfoBoxDisableBG);
    this.userItemWindowGroup.add(this.life_jewelIcon);
    this.userItemWindowGroup.add(this.life_useJewelryCount_Text);
    this.userItemWindowGroup.add(this.life_cancleText);
};

UI_UserItem.prototype.VisibleWindow = function (b) {
    this.userItemWindowGroup.visible = b;
    if(b) MG.game.world.bringToTop(this.userItemWindowGroup);
};

// 유저가 Play 버튼을 눌렀다.
// 최초 실행인 경우에는 Tutorial -> play game 순서로 한다.
UI_UserItem.prototype.OnClickEvent_PlayButton = function () {
    actionManager.Button_Click_Effect(this.playButton, this.playButton_Text);
    MG.game.time.events.add(300, this.OnClickEvent_PlayButton_Start, this);
};

UI_UserItem.prototype.OnClickEvent_PlayButton_Start = function () {
    this.userItemWindowGroup.visible = false;
    isPlaying_TitleBGM = false;
    MG.StopBgm('bgm_title');
    userItemManager.SetupItemSkill(this.isTimeUse, this.isSlowUse, this.isLifeUse);
    StorageManager.prototype.set('nJewelryCount', uData.nJewelryCount);
    uiManager.PlayGame();
};

UI_UserItem.prototype.OnClickEvent_JumpButton = function () {
    actionManager.Button_Click_Effect(this.stageJumpButton, this.jumpButton_Text);
    MG.game.time.events.add(300, uiManager.OnClickEvent_JumpButton, this);
};

UI_UserItem.prototype.OnClickEvent_SetItem = function (targetName, isUse, useJewelryCountText, jewelryIcon, cancleText) {

    switch(targetName) {
        case "Time":
            if(isUse && parseInt(Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["TimeItemPayCount"]))) > uData.nJewelryCount) {
                shopManager.OpenIsBuyWindow();
                return;
            }
            this.isTimeUse = isUse;

            if(this.isTimeUse) {
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_on');
                this.time_slot_spine.setAnimationByName(0, "time_equip", false);
            } else {
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
                this.time_slot_spine.setAnimationByName(0, "time_unequip", false);
            }

            this.time_slot_spine.state.onComplete = function () {
                if(this.isTimeUse) {
                    this.time_slot_spine.setAnimationByName(0, "time_equip_idle", true);
                } else {
                    this.time_slot_spine.setAnimationByName(0, "time_idle", true);
                }
            }.bind(this);

            break;

        case "Slow":
            if(isUse && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["SlowItemPayCount"])) > uData.nJewelryCount) {
                shopManager.OpenIsBuyWindow();
                return;
            }
            this.isSlowUse = isUse;

            if(this.isSlowUse) {
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_on');
                this.slow_slot_spine.setAnimationByName(0, "slow_equip", false);
            } else {
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
                this.slow_slot_spine.setAnimationByName(0, "slow_unequip", false);
            }

            this.slow_slot_spine.state.onComplete = function () {
                if(this.isSlowUse)
                    this.slow_slot_spine.setAnimationByName(0, "slow_equip_idle", true);
                else
                    this.slow_slot_spine.setAnimationByName(0, "slow_idle", true);
            }.bind(this);

            break;

        case "Life":
            if(isUse && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["LifeItemPayCount"])) > uData.nJewelryCount) {
                shopManager.OpenIsBuyWindow();
                return;
            }
            this.isLifeUse = isUse;

            if(this.isLifeUse) {
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_on');
                this.shield_slot_spine.setAnimationByName(0, "shield_equip", false);
            } else {
                if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_click');
                this.shield_slot_spine.setAnimationByName(0, "shield_unequip", false);
            }

            this.shield_slot_spine.state.onComplete = function () {
                if(this.isLifeUse)
                    this.shield_slot_spine.setAnimationByName(0, "shield_equip_idle", true);
                else
                    this.shield_slot_spine.setAnimationByName(0, "shield_idle", true);
            }.bind(this);
            break;
    }

    if(isUse) {
        cancleText.visible = true;
        jewelryIcon.visible = false;
        useJewelryCountText.visible = false;
        uData.nJewelryCount -= parseInt(useJewelryCountText.text);
    } else {
        cancleText.visible = false;
        jewelryIcon.visible = true;
        useJewelryCountText.visible = true;
        uData.nJewelryCount += parseInt(useJewelryCountText.text);
    }

    uiManager.SetJewelryCount();
    UI_UserItem.prototype.CheckAvailable(this.time_useJewelryInfoBoxDisableBG, this.slow_useJewelryInfoBoxDisableBG, this.life_useJewelryInfoBoxDisableBG, this.isTimeUse, this.isSlowUse, this.isLifeUse);
};


UI_UserItem.prototype.CheckAvailable = function (timeBG, slowBG, lifeBG, bTime, bSlow, bLife) {
    if(bTime === false && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["TimeItemPayCount"])) > uData.nJewelryCount)
        timeBG.visible = true;
    else
        timeBG.visible = false;

    if(bSlow === false && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["SlowItemPayCount"])) > uData.nJewelryCount)
        slowBG.visible = true;
    else
        slowBG.visible = false;

    if(bLife === false && Math.floor(parseInt(assetManager.GetRewardJewelry("nBestStage")) * parseFloat(MG.gameSheetsData["LifeItemPayCount"])) > uData.nJewelryCount)
        lifeBG.visible = true;
    else
        lifeBG.visible = false;
};

UI_UserItem.prototype.FindSpineNode = function ( SpineObj, NodeName ) {
    return SpineObj.children[SpineObj.skeleton.findSlotIndex(NodeName)];
};