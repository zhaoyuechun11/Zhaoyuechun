
function UI_MonthsOpen() {
    this.monthsOpenWindowGroup = MG.game.add.group();
    this.panelOption = { game:MG.game, packname:"atlas_UI", pngname:"popup_open.png", x:MG.game.world.centerX, y:MG.game.world.centerY, w:606, h:621, off_l:45, off_r:45, off_t:155, off_b:55 };
    this.panelBG;                   // main BG frame
    this.titleText;                 // title
    // this.dialogInMonthsText;        // 설명글 안의 스테이지
    this.monthsCountFrameOption = { game:MG.game, packname:"atlas_UI", pngname:"panel_open.png", x:MG.game.world.centerX, y:MG.game.world.centerY, w:364, h:222, off_l:30, off_r:30, off_t:25, off_b:40 };
    this.monthsCountFrame;          // 스테이지 박스
    this.selectedMonthText;         // 타겟 스테이지
    this.dialogStyle = { font: "30px Arial", fill: "#776e65", align: "center", fontWeight: "normal" };
    //this.months_text = uData.nStage.toString()[0] + 1;
    this.months_text = this.Get_Months_Open();

    this.CreateWindow();
    // if(currentScene != "viewMonthsOpen") this.VisibleWindow(false);
    this.VisibleWindow(false);
}

UI_MonthsOpen.prototype.Get_Months_Open = function () {
    if(uData.nStage <= 10) return "";

    var _retrunStr = "";

    for(var i = 0; i < uData.nStage.toString().length - 1; i++) {
        _retrunStr += uData.nStage.toString()[i];
    }

    return _retrunStr + 1;
};

UI_MonthsOpen.prototype.CreateWindow = function () {
    // BG pannel
    this.panelBG = uiManager.createImg9(this.panelOption);
    this.panelBG.scale.setTo(1);
    this.panelBG.anchor.setTo(0.5);
    this.monthsOpenWindowGroup.add(this.panelBG);
    // Title text 'MONTHS OPEN'
    this.titleText = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',52);
    this.titleText.anchor.setTo(0.5);
    this.titleText.setText("LEVEL OPEN");
    // this.titleText.alpha = 0.6;
    this.titleText.align = 'center';
    this.titleText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 230);
    this.monthsOpenWindowGroup.add(this.titleText);
    // 캘린더 카운트 텍스트 박스
    this.monthsCountFrame = uiManager.createImg9(this.monthsCountFrameOption);
    this.monthsCountFrame.scale.setTo(1);
    this.monthsCountFrame.anchor.setTo(0.5);
    this.monthsOpenWindowGroup.add(this.monthsCountFrame);
    // Months Text
    this.selectedMonthText = MG.game.add.bitmapText(0, 0, 'uiFont','Bitmap Fonts!',125);
    this.selectedMonthText.anchor.setTo(0.5);
    this.selectedMonthText.setText(this.months_text);
    // this.selectedMonthText.alpha = 0.6;
    this.selectedMonthText.align = 'center';
    this.selectedMonthText.position.setTo(MG.game.world.centerX, MG.game.world.centerY - 10);
    this.monthsOpenWindowGroup.add(this.selectedMonthText);
    // 설명 글
    this.dialogText = MG.game.add.text(MG.game.world.centerX, MG.game.world.centerY + 210, GetString("Stage_Open", this.months_text), this.dialogStyle);
    this.dialogText.anchor.setTo(0.5, 0.5);
    this.monthsOpenWindowGroup.add(this.dialogText);
    // 설명 글 안에 Months Pink Text
    // this.dialogInMonthsText = MG.game.add.bitmapText(0, 0, 'numberFont_1fbb99','Bitmap Fonts!',80);
    // this.dialogInMonthsText.anchor.setTo(0.5);
    // this.dialogInMonthsText.setText(this.months_text);
    // this.dialogInMonthsText.align = 'center';
    // this.dialogInMonthsText.position.setTo(this.dialogText.position.x - 65, this.dialogText.position.y - 50);
    // this.monthsOpenWindowGroup.add(this.dialogInMonthsText);
};

UI_MonthsOpen.prototype.VisibleWindow = function (b) {
    if(b) {
        if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_popup_off');
        this.monthsOpenWindowGroup.visible = true;
        MG.game.world.bringToTop(this.monthsOpenWindowGroup);
    } else {
        this.monthsOpenWindowGroup.visible = false;
    }
};

// UI_MonthsOpen.prototype.Set_JumpMonths_Text = function () {
//     this.months_text = parseInt(uData.nStage % 10);
// };