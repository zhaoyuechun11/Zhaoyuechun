
function UI_UserItem_Display() {
    this.userItemDisplayGroup = MG.game.add.group();
    this.TimeItemGroup = MG.game.add.group();
    this.SlowItemGroup = MG.game.add.group();
    this.LifeItemGroup = MG.game.add.group();
    this.timeUI_Parent = MG.game.add.sprite(0, 0, 'blank');
    this.slowUI_Parent = MG.game.add.image(0, 0, 'blank');
    this.lifeUI_Parent = MG.game.add.image(0, 0, 'blank');
    this.isUseTime = false;
    this.isUseSlow = false;
    this.isUseLife = false;
    this.useCount = 0;
    this.alignXpos = new Array(3);
    this.dialog1Style = {font: "23px Arial", fill: "#ffffff", align: "center", fontWeight: "normal"};
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.blackWall = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY, 'blackTexture');
    this.text_item_start;


    this.Create_Window();
    this.VisibleWindow(false);
}

UI_UserItem_Display.prototype.Create_Window = function () {
    // 터치 방지용 암막 백그라운드
    this.blackWall.scale.setTo(MG.game.world.width, MG.game.world.height);
    this.blackWall.anchor.setTo(0.5);
    this.blackWall.alpha = 0.75;
    this.blackWall.inputEnabled = true;
    this.blackWall.events.onInputUp.add( function () {} );
    this.userItemDisplayGroup.add(this.blackWall);
    this.text_item_start = MG.game.add.sprite(MG.game.world.centerX, MG.game.world.centerY - 300, 'atlas_UI', 'text_item_effect.png');
    this.text_item_start.anchor.setTo(0.5);
    this.userItemDisplayGroup.add(this.text_item_start);
    this.TimeUI();
    this.SlowUI();
    this.LifeUI();
};

UI_UserItem_Display.prototype.VisibleWindow = function (b) {
    this.userItemDisplayGroup.visible = b;
    var inx = 0;
    if(b) {
        if(this.isUseTime) {
            this.TimeItemGroup.visible = true;
            this.TimeItemGroup.position.setTo(this.alignXpos[inx++], MG.game.world.centerY);
            this.TimeItemGroup.scale.setTo(0, 0);
            MG.game.add.tween(this.TimeItemGroup.scale).to( {x: 1, y: 1}, 400, Phaser.Easing.Sinusoidal.Out, true);
        }
        if(this.isUseSlow) {
            this.SlowItemGroup.visible = true;
            this.SlowItemGroup.position.setTo(this.alignXpos[inx++], MG.game.world.centerY);
            this.SlowItemGroup.scale.setTo(0, 0);
            MG.game.add.tween(this.SlowItemGroup.scale).to( {x: 1, y: 1}, 400, Phaser.Easing.Sinusoidal.Out, true);
        }
        if(this.isUseLife) {
            this.LifeItemGroup.visible = true;
            this.LifeItemGroup.position.setTo(this.alignXpos[inx++], MG.game.world.centerY);
            this.LifeItemGroup.scale.setTo(0, 0);
            MG.game.add.tween(this.LifeItemGroup.scale).to( {x: 1, y: 1}, 400, Phaser.Easing.Sinusoidal.Out, true);
        }
        MG.game.world.bringToTop(this.userItemDisplayGroup);
        MG.game.world.bringToTop(this.TimeItemGroup);
        MG.game.world.bringToTop(this.SlowItemGroup);
        MG.game.world.bringToTop(this.LifeItemGroup);
    } else {
        this.TimeItemGroup.visible = false;
        this.SlowItemGroup.visible = false;
        this.LifeItemGroup.visible = false;
        this.isUseTime = false;
        this.isUseSlow = false;
        this.isUseLife = false;
    }
};

UI_UserItem_Display.prototype.TimeUI = function () {
    this.timeUI_Parent.position.setTo(0, 0);
    this.timeUI_Parent.anchor.setTo(0.5);
    this.TimeItemGroup.add(this.timeUI_Parent);
    // O 배경
    this.cicleBG = MG.game.add.image(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y, 'atlas_UI', 'item_normal.png');
    this.cicleBG.anchor.setTo(0.5);
    this.TimeItemGroup.add(this.cicleBG);
    // icon
    this.itemIcon = MG.game.add.image(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y - 10, 'atlas_UI', 'item_1.png');
    this.itemIcon.anchor.setTo(0.5);
    this.TimeItemGroup.add(this.itemIcon);
    // Reward Text
    this.reward_Text = MG.game.add.bitmapText(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 45, 'uiFont','Bitmap Fonts!', 20);
    this.reward_Text.anchor.setTo(0.5);
    this.reward_Text.setText("+" + MG.gameSheetsData["AddTimePlus"].toString());
    this.reward_Text.align = 'center';
    this.TimeItemGroup.add(this.reward_Text);
    // comment Text
    this.commentText = MG.game.add.text(this.timeUI_Parent.position.x, this.timeUI_Parent.position.y + 120, '', this.dialog1Style);
    this.commentText.anchor.setTo(0.5);
    this.commentText.setText(GetString("Passive_Item01_Explanation", MG.gameSheetsData["AddTimePlus"]));
    this.TimeItemGroup.add(this.commentText);
};

UI_UserItem_Display.prototype.SlowUI = function () {
    this.slowUI_Parent.position.setTo(0, 0);
    this.slowUI_Parent.scale.setTo(1);
    this.slowUI_Parent.anchor.setTo(0.5);
    this.SlowItemGroup.add(this.slowUI_Parent);
    // O 배경
    this.cicleBG = MG.game.add.image(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y, 'atlas_UI', 'item_normal.png');
    this.cicleBG.anchor.setTo(0.5);
    this.SlowItemGroup.add(this.cicleBG);
    // icon 1
    this.itemIcon = MG.game.add.image(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y - 15, 'atlas_UI', 'item_2_1.png');
    this.itemIcon.anchor.setTo(0.5);
    this.SlowItemGroup.add(this.itemIcon);
    // icon 2
    this.itemIcon2 = MG.game.add.image(this.itemIcon.position.x + 15, this.itemIcon.position.y + 15, 'atlas_UI', 'item_2_2.png');
    this.itemIcon2.anchor.setTo(0.5);
    this.SlowItemGroup.add(this.itemIcon2);
    // Reward Text
    this.reward_Text = MG.game.add.bitmapText(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 45, 'uiFont','Bitmap Fonts!', 20);
    this.reward_Text.anchor.setTo(0.5);
    this.ratio = parseFloat(1 - MG.gameSheetsData["SlowItemSkill"]);
    this.reward_Text.setText("-" + Math.round(this.ratio * 100).toString());
    this.reward_Text.align = 'center';
    this.SlowItemGroup.add(this.reward_Text);
    // comment Text
    this.commentText = MG.game.add.text(this.slowUI_Parent.position.x, this.slowUI_Parent.position.y + 120, '', this.dialog1Style);
    this.commentText.anchor.setTo(0.5);
    this.commentText.setText(GetString("Passive_Item02_Explanation", Math.round(this.ratio * 100)));
    this.SlowItemGroup.add(this.commentText);
};

UI_UserItem_Display.prototype.LifeUI = function () {
    this.lifeUI_Parent.position.setTo(0, 0);
    this.lifeUI_Parent.anchor.setTo(0.5);
    this.LifeItemGroup.add(this.lifeUI_Parent);
    // O 배경
    this.cicleBG = MG.game.add.image(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y, 'atlas_UI', 'item_normal.png');
    this.cicleBG.anchor.setTo(0.5);
    this.LifeItemGroup.add(this.cicleBG);
    // icon
    this.itemIcon = MG.game.add.image(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y - 10, 'atlas_UI', 'item_3.png');
    // this.itemIcon.scale.setTo(0.4);
    this.itemIcon.anchor.setTo(0.5);
    this.LifeItemGroup.add(this.itemIcon);
    // Reward Text
    this.reward_Text = MG.game.add.bitmapText(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 45, 'uiFont','Bitmap Fonts!', 20);
    this.reward_Text.anchor.setTo(0.5);
    this.reward_Text.setText("+" + MG.gameSheetsData["LifeItemSkill"].toString());
    this.reward_Text.align = 'center';
    this.LifeItemGroup.add(this.reward_Text);
    // comment Text
    this.commentText = MG.game.add.text(this.lifeUI_Parent.position.x, this.lifeUI_Parent.position.y + 120, '', this.dialog1Style);
    this.commentText.anchor.setTo(0.5);
    this.commentText.setText(GetString("Passive_Item03_Explanation", MG.gameSheetsData["LifeItemSkill"]));
    this.LifeItemGroup.add(this.commentText);
};

// from uiManager...
UI_UserItem_Display.prototype.SetUseItemPosition = function (_time, _slow, _life) {
    this.useCount = 0;
    this.isUseTime = _time;
    this.isUseSlow = _slow;
    this.isUseLife = _life;
    if(_time) this.useCount++;
    if(_slow) this.useCount++;
    if(_life) this.useCount++;

    switch(this.useCount) {
        case 1:
            this.alignXpos[0] = MG.game.world.centerX;
            break;

        case 2:
            this.alignXpos[0] = MG.game.world.centerX - 100;
            this.alignXpos[1] = MG.game.world.centerX + 100;
            break;

        case 3:
            this.alignXpos[0] = MG.game.world.centerX;
            this.alignXpos[1] = MG.game.world.centerX - 200;
            this.alignXpos[2] = MG.game.world.centerX + 200;
            break;
    }
};

