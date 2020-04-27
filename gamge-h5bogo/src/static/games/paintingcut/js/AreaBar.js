'use strict';

function AreaBar(totalValue) {
    this.bg;
    this.warningBG;
    this.barOption;
    this.bar;
    this.bar_cover;
    // this.zeroTimeGagePointX;
    this.barBG;
    // this.timerIcon;
    this.timerText;
    //this.timerStyle;
    this.totalTimer = totalValue;
    this.paintedArea;
    this.time_top_icon_spine;
    this.oops_time_broken_spine;
    this.isHurryUp = false;
}

/**
 * @return {boolean}
 */
AreaBar.prototype.GetIsHurryUp = function () {
    return this.isHurryUp;
};

AreaBar.prototype.LoadingSprite = function()
{
    this.bg = MG.game.add.sprite(MG.game.world.centerX, 163, "wall");
    this.bg.scale.setTo(MG.game.world.width, 30);
    this.bg.anchor.setTo(0.5);
    //this.bg.enableBody = true;

    this.barGroup = MG.game.add.group();

    this.barBGOption = { game:MG.game, packname:"atlas_UI", pngname:"gage_bg.png", x:200, y:164, w:MG.game.world.width - 200, h:28, off_l:20, off_r:20, off_t:0, off_b:0 };
    this.barBG = uiManager.createImg9(this.barBGOption);
    this.barBG.scale.setTo(0.999);
    this.barBG.anchor.setTo(0, 0.5);
    // this.barBG = MG.game.add.graphics(0, 0);
    // this.barBG.beginFill(0x000000);
    this.barGroup.add(this.barBG);

    this.barWarningOption = { game:MG.game, packname:"atlas_UI", pngname:"gage_warning.png", x:200, y:164, w:MG.game.world.width - 200, h:28, off_l:20, off_r:20, off_t:0, off_b:0 };
    this.warningBG = uiManager.createImg9(this.barWarningOption);
    this.warningBG.scale.setTo(1);
    this.warningBG.anchor.setTo(0, 0.5);
    this.warningBG.visible = false;
    this.barGroup.add(this.warningBG);

    this.barOption = { game:MG.game, packname:"atlas_UI", pngname:"gage.png", x:MG.game.world.width, y:164, w:MG.game.world.width - 200, h:28, off_l:20, off_r:20, off_t:0, off_b:0 };
    this.bar = uiManager.createImg9(this.barOption);
    // this.zeroTimeGagePointX = MG.game.world.width - 200;
    this.bar.scale.setTo(1);
    this.bar.anchor.setTo(1, 0.5);
    this.barGroup.add(this.bar);

    this.bar_cover = MG.game.add.sprite(0, 164, 'atlas_UI', 'gage_cover.png');
    this.bar_cover.anchor.setTo(0, 0.5);
    this.bar_cover.scale.setTo(1.13, 1);
    this.barGroup.add(this.bar_cover);
    MG.game.world.bringToTop(this.barGroup);
    // this.barGroup.swap(this.bar, this.bar_cover);

    this.paintedArea = 0;
    this.herry_up_event;
    this.oops_time_broken_spine = MG.game.add.spine(MG.game.world.centerX + 110, 165, 'oops_time_broken');

    this.time_top_icon_spine = MG.game.add.spine(40, 165, 'time_top_icon');
    this.time_top_icon_spine.setAnimationByName(0, 'time_idle', true);
    this.time_top_icon_spine.state.onComplete = function () {};

    // this.timerIcon = MG.game.add.sprite(40, 165, 'atlas_UI', 'time.png');
    // this.timerIcon.scale.setTo(1);
    // this.timerIcon.anchor.setTo(0.5, 0.5);


    this.timerText = MG.game.add.bitmapText(125, 162, 'numberFont_Pink','Bitmap Fonts!',32);
    this.timerText.anchor.setTo(0.5);
    this.SetTimeFormat(timer);
    // this.timerText.setText("");


    // this.timerStyle = { font: "25px Arial", fill: "#e07860", align: "left", fontWeight: "bold" };
    // this.timerText = MG.game.add.text(80, 168, '', this.timerStyle);
    // this.timerText.anchor.setTo(0, 0.5);
    // this.timerText.setText("0");

    this.UpdateBarGauge(timer);
};

// AreaBar.prototype.ReSet = function () {
//     MG.game.time.events.remove(this.herry_up_event);
// };

AreaBar.prototype.StartWarning = function (_playAni) {
    this.HerryUp_Timer_Start(_playAni);
    this.herry_up_event = MG.game.time.events.repeat(Phaser.Timer.SECOND * 0.5, 20, this.FlipWarningBG, this);
};

AreaBar.prototype.StopWarning = function () {
    this.HerryUp_Timer_Stop();
    this.warningBG.visible = false;
    MG.game.time.events.remove(this.herry_up_event);
};



AreaBar.prototype.FlipWarningBG = function () {
    this.warningBG.visible = !this.warningBG.visible;
};

AreaBar.prototype.HerryUp_Timer_Start = function (_playAni) {
    if(StorageManager.prototype.get('isSfx')) MG.PlayAudio('se_hurryUp');
    this.isHurryUp = true;
    if(_playAni) {
        this.time_top_icon_spine.setAnimationByName(0, 'time_hurry_up', true);
        this.time_top_icon_spine.state.onComplete = function () {};
    }
};

AreaBar.prototype.HerryUp_Timer_Stop = function () {
    this.isHurryUp = false;
    this.time_top_icon_spine.setAnimationByName(0, 'time_idle', true);
    this.time_top_icon_spine.state.onComplete = function () {};
};

AreaBar.prototype.OOPS_Time_Broken = function () {
    this.oops_time_broken_spine.setAnimationByName(0, 'oop_time_broken', false);
    MG.game.world.bringToTop(this.oops_time_broken_spine);
};

AreaBar.prototype.GetJustPaintingRatio = function(targetArea)
{
    this.paintedArea += targetArea;
    this.UpdateBarGauge();
    //console.log("==== " + ((targetArea / this.totalTimer) * 100).toFixed(2) + "%");
    return (targetArea / this.totalTimer).toFixed(2);
};

AreaBar.prototype.UpdateBarGauge = function(timer)
{
    if(timer >= DEFAULT_TIME_COUNT) timer = DEFAULT_TIME_COUNT;

    // this.barBG.clear();

    //var useTime = timer / DEFAULT_TIME_COUNT;
    //this.bar.position.setTo((this.zeroTimeGagePointX * useTime) + 200, this.bar.position.y);


    var _gage = parseInt(((MG.game.world.width - 200) / DEFAULT_TIME_COUNT) * (DEFAULT_TIME_COUNT - timer));

    this.bar.position.setTo(MG.game.world.width - _gage, 164);



    // this.bar.scale.setTo(useTime, 1);
    this.SetTimeFormat(timer);
};

AreaBar.prototype.SetTimeFormat = function(t)
{
    var timeFormat;

    if(t <= 0)
    {
        timeFormat = "00:00";
        this.timerText.setText(timeFormat.toString());
        this.HerryUp_Timer_Stop();
        return;
    }

    var min = Math.floor(t / 60);
    var sec = Math.floor(t % 60);

    if(min > 0)
    {
        if(sec >= 10)
            timeFormat = "0" + min.toString() + ":" + sec.toString();
        else
            timeFormat = "0" + min.toString() + ":0" + sec.toString();
    }
    else
    {
        if(sec >= 10)
            timeFormat = "00" + ":" + sec.toString();
        else
            timeFormat = "00" + ":0" + sec.toString();
    }

    this.timerText.setText(timeFormat.toString());
};