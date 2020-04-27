

/**
 * Miss
 * @param {Phaser.Game} aGame A reference to the currently running game.
 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
function Prefab(aGame, aX, aY, aKey, aFrame) {
    Phaser.Sprite.call(this, aGame, aX, aY, aKey || 'data02', aFrame == undefined || aFrame == null? 'miss' : aFrame);
    this.anchor.setTo(0.5, 0.5);
    this.fLive = true;
}

/** @type Phaser.Sprite */
var Prefab_proto = Object.create(Phaser.Sprite.prototype);
Prefab.prototype = Prefab_proto;
Prefab.prototype.constructor = Prefab;

/* --- end generated code --- */
//-- user code here --
Prefab.prototype.start = function(temp,target)
{
    this.name ="skip";
    this.inputEnabled  = false;
    switch(temp)
    {
        case _EFFECT_IMAGE.ONETIME:

            this.x = this.game.width /2;
            var tween1 = this.game.add.tween(this.position).to({y:600}, 800, Phaser.Easing.Elastic.Out,false,400);
            var tween2 = this.game.add.tween(this).to({alpha:0.5}, 500, Phaser.Easing.Linear.Out,false,0);

            tween2.onComplete.add(this.end,this);
            tween1.chain(tween2);
            tween1.start();
            break;
        case _EFFECT_IMAGE.GOOD:
            this.x = this.game.width /2;
            this.y = 560;
            this.scale.setTo(4,4);
            var tween1 = this.game.add.tween(this.scale).to({x:1.2,y:1.2}, 600, Phaser.Easing.Linear.None,false,0);
            var tween2 = this.game.add.tween(this).to({alpha:0.5}, 300, Phaser.Easing.Linear.Out,false,600);

            tween1.chain(tween2);
            tween2.onComplete.add(this.gosound,this);
            tween2.onComplete.add(this.end,this);

            tween1.start();
            break;
        case _EFFECT_IMAGE.GO:
            this.x = this.game.width /2;
            var tween1 = this.game.add.tween(this.position).to({y:600}, 600, Phaser.Easing.Elastic.Out,false,400);
            var tween2 = this.game.add.tween(this).to({alpha:1}, 300, Phaser.Easing.Linear.Out,false,0);

            tween1.chain(tween2);
            tween2.onComplete.add(this.gosound,this);
            tween2.onComplete.add(this.readyend,this);

            tween1.start();
            break;
        case _EFFECT_IMAGE.LINEMAKE:
            this.angle = target.normalAngle*180/Math.PI;
            this.height =0;
            this.game.add.tween(this).to( {height: target.length-78}, 100, Phaser.Easing.Linear.Out,true);
            break;
        case _EFFECT_IMAGE.LINEKILL:
            var tween = this.game.add.tween(this).to( {height: 0}, 100, Phaser.Easing.Linear.Out, true,500);
            tween.onComplete.add(this.kill,this);

            break;

        case _EFFECT_IMAGE.KILL:
            this.alpha = 0;
            var tween1 = this.game.add.tween(this).to({alpha:1}, 100, Phaser.Easing.Linear.Out,false,0);
            var tween2 = this.game.add.tween(this).to({alpha:1}, 800, Phaser.Easing.Linear.Out,false,0);
            tween1.chain(tween2);
            tween2.onComplete.add(this.kill,this);
            tween1.start();
            break;

        case _EFFECT_IMAGE.ONOFF:

            this.alpha = 1;
            var tween1 = this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,false,0);
            var tween2 = this.game.add.tween(this).to({alpha:1}, 100, Phaser.Easing.Linear.Out,false,0);
            var tween3 = this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,false,0);
            var tween4 = this.game.add.tween(this).to({alpha:1}, 100, Phaser.Easing.Linear.Out,false,0);
            var tween5 = this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,false,0);

            tween1.chain(tween2);
            tween2.chain(tween3);
            tween3.chain(tween4);
            tween4.chain(tween5);
            tween5.onComplete.add(this.kill,this);
            tween1.start();
            break;

        case _EFFECT_IMAGE.MISS:
            _FX.Start(_FX.SE_ERROR);
            this.x = this.game.width /2;
            this.y = 560;
            this.scale.setTo(4,4);
            var tween1 = this.game.add.tween(this.scale).to({x:1.2,y:1.2}, 600, Phaser.Easing.Linear.None,false,0);
            var tween2 = this.game.add.tween(this).to({alpha:0.5}, 300, Phaser.Easing.Linear.Out,false,600);

            tween1.chain(tween2);
            tween2.onComplete.add(this.end,this);
            tween1.start();
            break;

        case _EFFECT_IMAGE.MISSNUMBER:
            _FX.Start(_FX.SE_ERROR);
            this.alpha = 1.0;
            this.scale.setTo(0.3,0.3);
            var tempposition = this.position.y - 100;
            this.game.add.tween(this).to( { alpha: 0.2}, 600, Phaser.Easing.Linear.None, true,0);
            var tween = this.game.add.tween(this.position).to( { y: tempposition}, 600, Phaser.Easing.Linear.None, true,0);
            tween.onComplete.add(this.kill,this);
            break;

    }
};
Prefab.prototype.lineend = function()
{
    this.fLive  = false;

    var tween = this.game.add.tween(this).to( {height: 0}, 50, Phaser.Easing.Linear.Out, true,0);
    tween.onComplete.add(this.kill,this);

};

Prefab.prototype.readyend = function()
{

    this.game.add.tween(this).to({alpha:0}, 300, Phaser.Easing.Linear.Out,true,300);
    tween = this.game.add.tween(this.scale).to({x:3,y:3}, 300, Phaser.Easing.Linear.Out,true,300);
    tween.onComplete.add(this.kill,this);
};

Prefab.prototype.end = function()
{
    this.game.add.tween(this).to({alpha:0}, 100, Phaser.Easing.Linear.Out,true,0);
    tween = this.game.add.tween(this.scale).to({x:3,y:3}, 100, Phaser.Easing.Linear.Out,true,0);
    tween.onComplete.add(this.kill,this);
};
Prefab.prototype.gosound = function()
{

};

// -- user code here --

/* --- start generated code --- */

// Generated by Phaser Editor 1.4.3 (Phaser v2.6.2)


/**
 * Dihelp.
 * @param {Phaser.Game} aGame A reference to the currently running game.
 * @param {Phaser.Group} aParent The parent Group (or other {@link DisplayObject}) that this group will be added to.
 If undefined/unspecified the Group will be added to the {@link Phaser.Game#world Game World}; if null the Group will not be added to any parent.
 * @param {string} aName A name for this group. Not used internally but useful for debugging.
 * @param {boolean} aAddToStage If true this group will be added directly to the Game.Stage instead of Game.World.
 * @param {boolean} aEnableBody If true all Sprites created with {@link #create} or {@link #createMulitple} will have a physics body created on them. Change the body type with {@link #physicsBodyType}.
 * @param {number} aPhysicsBodyType The physics body type to use when physics bodies are automatically added. See {@link #physicsBodyType} for values.
 */
function Dihelp(aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType) {


    Phaser.Group.call(this, aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType);

    this.fPopup_level_info = this.game.add.sprite(0, 0, 'data03', 'popup_level_info', this);

    var style = { font: "bold 32px", fill: "#602e0d",stroke:"#602e0d", strokeThickness:1};

    this.fTextcount1 = this.game.add.text(380, 60, '0', style, this);
    this.fTextcount1.scale.setTo(1.1,1.1);
    this.fTextcount1.anchor.setTo(1,0.5);

    this.fTextrule1 = this.game.add.text(15, 60,    '', style, this);
    this.fTextrule1.scale.setTo(1,1.1);
    this.fTextrule1.anchor.setTo(0,0.5);
    _star = this.game.add.sprite(324, 57, 'data01', 'star', this);
    _star.scale.setTo(0.8, 0.8);
    _star.anchor.setTo(0.5, 0.5);

    this.fTextcount2 = this.game.add.text(380, 140, '0',style, this);
    this.fTextcount2.scale.setTo(1.1,1.1);
    this.fTextcount2.anchor.setTo(1,0.5);
    this.fTextrule2 = this.game.add.text(15, 140,   '', style, this);
    this.fTextrule2.scale.setTo(1,1.1);
    this.fTextrule2.anchor.setTo(0,0.5);

    _star = this.game.add.sprite(324, 137, 'data01', 'star', this);
    _star.scale.setTo(0.8, 0.8);
    _star.anchor.setTo(0.5, 0.5);

    this.fTextcount3 = this.game.add.text(380, 220, '0', style, this);
    this.fTextcount3.scale.setTo(1.1,1.1);
    this.fTextcount3.anchor.setTo(1,0.5);
    this.fTextrule3 = this.game.add.text(15, 220,   '', style, this);
    this.fTextrule3.scale.setTo(1,1.1);
    this.fTextrule3.anchor.setTo(0,0.5);

    _star = this.game.add.sprite(324, 217, 'data01', 'star', this);
    _star.scale.setTo(0.8, 0.8);
    _star.anchor.setTo(0.5, 0.5);





    var _star;




    this.pivot.setTo(1.0, 1.0);
    this.start();
    _FX.Start(_FX.SE_POPUP_ON);

}

/** @type Phaser.Group */
var Dihelp_proto = Object.create(Phaser.Group.prototype);
Dihelp.prototype = Dihelp_proto;
Dihelp.prototype.constructor = Dihelp;

/* --- end generated code --- */
// -- user code here --

Dihelp.prototype.setText = function(temp)
{
    this.fTextcount1.text = _BONUS_OBTAIN[temp][0];
    this.fTextcount2.text = _BONUS_OBTAIN[temp][1];
    this.fTextcount3.text = _BONUS_OBTAIN[temp][2];

    this.fTextrule1.text = _TIME_SCOPE[temp][1] + "분 이내 클리어";
    this.fTextrule2.text = _TIME_SCOPE[temp][1] + "분 ~" + _TIME_SCOPE[temp][2] + "분 클리어";
    this.fTextrule3.text = _TIME_SCOPE[temp][2] + "분 초과 클리어";
};
Dihelp.prototype.start = function()
{
    this.alpha = 0;
    this.game.add.tween(this).to({alpha:1},300, Phaser.Easing.Linear.None,true);
    this.event = this.game.time.events.add(Phaser.Timer.SECOND*3, this.timeEventout, this);
};

Dihelp.prototype.timeEventout = function()
{
    _FX.Start(_FX.SE_POPUP_OFF);
    this.destroy();

};
Dihelp.prototype.timeEventRemove = function()
{

    this.game.time.events.remove(this.event);
    this.destroy();
};


function Window_Tutorial(aGame,aparent) {
    Phaser.Group.call(this, aGame);
    this.messagestate = aparent;
    var _popup_tutorial = this.game.add.sprite(0, 0, 'popup_tutorial', null, this);
    _popup_tutorial.anchor.setTo(0.5, 0.5);

    var _group_crop = this.game.add.group(this);

    var _tutorial_3 = this.game.add.sprite(0, 231, 'data02', 'tutorial_2', _group_crop);
    _tutorial_3.anchor.setTo(0.5, 0.5);

    var _tutorial_2 = this.game.add.sprite(0, 684, 'data02', 'tutorial_3', _group_crop);
    _tutorial_2.anchor.setTo(0.5, 0.5);

    var _tutorial_1 = this.game.add.sprite(0, -191, 'data02', 'tutorial_1', _group_crop);
    _tutorial_1.anchor.setTo(0.5, 0.5);

    var style = { font: "28px", fill: "#602e0d", align: "center" };

    this.fExitbtn = this.game.add.button(-15, 0, 'btn_icon',this.Close_This, this, null, 0, null, null,this);
    this.fExitbtn.name = 'window_tutorial_title';
    this.fExitbtn.anchor.setTo(0.5, 0.5);
    this.fExitbtn.position.setTo(260, -500);

    var _text3 = this.game.add.text(-4, -165, '가로줄에 1-9의 숫자가\n한번씩만 들어갑니다.',style, _group_crop);
    _text3.pivot.setTo(0.5, 0.5);
    _text3.anchor.setTo(0.5, 0.5);
    _text3.stroke = "#602e0d";
    _text3.strokeThickness = 0.5;

    var _text1 = this.game.add.text(24, 232, '세로줄에 1-9의 숫자가\n한번씩만 들어갑니다.',style, _group_crop);
    _text1.stroke = "#602e0d";
    _text1.pivot.setTo(0.5, 0.5);
    _text1.anchor.setTo(0.5, 0.5);
    _text1.strokeThickness = 0.5;

    var _text2 = this.game.add.text(-3, 758, '9칸 안에 1-9의 숫자가\n한번씩만 들어갑니다.',style, _group_crop);
    _text2.stroke = "#602e0d";
    _text2.pivot.setTo(0.5, 0.5);
    _text2.anchor.setTo(0.5, 0.5);
    _text2.strokeThickness = 0.5;

    var _title = this.game.add.sprite(0, -467,'data02', 'text_tutorial_en', this);
    _title.pivot.setTo(0.5, 0.5);
    _title.anchor.setTo(0.5, 0.5);

    this.position.setTo(-70, -238);

    // public fields

    this.fGroup_crop = _group_crop;
    this.fTutorial_3 = _tutorial_3;
    this.fTutorial_2 = _tutorial_2;
    this.fTutorial_1 = _tutorial_1;

    this.arraw = this.game.add.sprite(0, 320, 'data01', 'tutorial_arrow', this);
    this.arraw.anchor.setTo(0.5, 0.5);

    this.game.add.tween(this.arraw.position).to({y:400}, 1000, Phaser.Easing.Linear.None,true,300,-1);
    this.game.add.tween(this.arraw).to({alpha:0}, 1000, Phaser.Easing.Linear.None,true,300,-1);

    this.makemask();
}

/** @type Phaser.Group */
var Window_Tutorial_proto = Object.create(Phaser.Group.prototype);
Window_Tutorial.prototype = Window_Tutorial_proto;
Window_Tutorial.prototype.constructor = Window_Tutorial;

/* --- end generated code --- */
// -- user code here --

Window_Tutorial.prototype.setName = function(name)
{
    this.fExitbtn.name =  name;
};

Window_Tutorial.prototype.makemask = function()
{

    this.direction = 0;
    this.time      = 0;
    this.mousey    =  0;
    this.movevalue =  0;
    this.starpoint = 0;
    this.pushing=  false;
    var  mask1 = this.game.add.graphics(0,340);
    mask1.beginFill(0xffffff);
    mask1.drawRect(0,-40,720,820);
    mask1.endFill();
    this.fGroup_crop.mask = mask1;

    this.fGroup_crop.onChildInputDown.add(this.onDown, this);
    this.fGroup_crop.onChildInputUp.add(this.onUp, this);


    this.fTutorial_1.inputEnabled = true;
    this.fTutorial_2.inputEnabled = true;
    this.fTutorial_3.inputEnabled = true;
    this.timer = this.game.time.create(false);

    this.timer.start();
    this.timerstart = 0;
    this.timerend = 0;
    this.backupdatay = this.fGroup_crop.y;
    this.backupdatax = this.fGroup_crop.x;

};
Window_Tutorial.prototype.Reset_Position = function()
{
    this.arraw.visible = true;
    this.fGroup_crop.y = this.backupdatay;
    this.fGroup_crop.x = this.backupdatax;
};
Window_Tutorial.prototype.onDown = function()
{
    if(this.game.input.y< 1100)
    {
        _FX.Start(_FX.SE_SELECTNUMBER);
        this.timerstart  = this.timer.ms;
        this.pushing   = true;
        this.mousey    = this.game.input.y;
        this.starpoint = this.fGroup_crop.y;
        this.arraw.visible = false;
    }
};
Window_Tutorial.prototype.onUp = function()
{
    this.pushing = false;
    this.timerend  = this.timer.ms;
    var durationtime =this.timerend  - this.timerstart;

    if(durationtime <= 400)
    {
        if(this.movevalue < 0)
        {
            this.game.add.tween(this.fGroup_crop).to({y:-408}, 400,Phaser.Easing.Bounce.Out,true);
        }
        else
        {
            this.game.add.tween(this.fGroup_crop).to({y:0}, 400,Phaser.Easing.Bounce.Out,true);
        }
    }
};
Window_Tutorial.prototype.update = function()
{
    if(this.pushing == true)
    {
        this.movevalue = this.game.input.y - this.mousey;
        this.fGroup_crop.y = this.starpoint +this.movevalue;

        if(this.fGroup_crop.y < -448)
        {
            this.game.add.tween(this.fGroup_crop).to({y:-408}, 400,Phaser.Easing.Bounce.Out,true);
        }
        if(this.fGroup_crop.y > 0)
        {
            this.game.add.tween(this.fGroup_crop).to({y:0}, 400,Phaser.Easing.Bounce.Out,true);
        }
    }
};
Window_Tutorial.prototype.Close_This = function()
{

    this.messagestate.Close_Turtorial(this.fExitbtn);
};

function Window_Result(aGame,aparent) {
    Phaser.Group.call(this,aGame);
    this.messagestate = aparent;
    this.initialize();
}
/** @type Phaser.Group */
var Window_Result_proto = Object.create(Phaser.Group.prototype);
Window_Result.prototype = Window_Result_proto;
Window_Result.prototype.constructor = Window_Result;

/* --- end generated code --- */
// -- user code here --
Window_Result.prototype.setting = function(parent1)
{
    this.parent21 = parent1;
};
Window_Result.prototype.initialize = function()
{

    this.fEffect = this.game.add.sprite(360, -337, 'effect', null, this);
    this.fEffect.alpha = 0.0;
    this.fEffect.anchor.setTo(0.5, 0.5);

    var _popup_result = this.game.add.sprite(360, 0, 'popup_result', null, this);
    _popup_result.anchor.setTo(0.5, 0.5);

    this.fBest = this.game.add.sprite(378, -479, 'best', null, this);
    this.fBest.anchor.setTo(0.5, 0.5);
    this.fBest.visible = false;

    this.fNo_result1 = this.game.add.sprite(505, -110, 'no_resulttime', 0, this);
    this.fNo_result1.anchor.setTo(0.5, 0.5);

    this.fNo_result2 = this.game.add.sprite(428, -110, 'no_resulttime', 0, this);
    this.fNo_result2.anchor.setTo(0.5, 0.5);

    this.fNo_result3 = this.game.add.sprite(293, -110, 'no_resulttime', 0, this);
    this.fNo_result3.anchor.setTo(0.5, 0.5);

    this.fNo_result4 = this.game.add.sprite(216, -110, 'no_resulttime', 0, this);
    this.fNo_result4.anchor.setTo(0.5, 0.5);

    var _no_resulttime3 = this.game.add.sprite(360, -115, 'no_resulttime', 10, this);
    _no_resulttime3.anchor.setTo(0.5, 0.5);

    var tempspr = this.game.add.sprite(360, -222, 'data03','panel_result', this);
    tempspr.anchor.setTo(0.5, 0.5);

    var _levelback = this.game.add.tileSprite(360, -222, 240, 62, 'levelback', _UserInfo.Nowlevel, this);
    _levelback.anchor.setTo(0.5, 0.5);
    var temp= this.game.add.sprite(360, -223, "data02",_IMAGE_LOCALIZING.TEXT_SELECT_TITLE[_UserInfo.Nowlevel], this);
    temp.anchor.setTo(0.5);

    this.fBtn_continue = this.game.add.button(360, 319, 'data01', this.ClickRetry, this, null, 'btn_continue', null, null, this);
    this.fBtn_continue.anchor.setTo(0.5, 0.5);


    this.fBtn_continue.inputEnabled = false;


    var Clear = this.game.add.sprite(360, -350, 'data02', 'clear', this);
    Clear.anchor.setTo(0.5, 0.5);
    var temp = this.game.add.sprite(360, 320, 'data02',"text_ok_en", this);
    temp.anchor.setTo(0.5, 0.5);


    this.fNewtime = this.game.add.sprite(596, 14, 'data01', 'new', this);
    this.fNewtime.anchor.setTo(0.1, 1.0);


    this.fNewlevel = this.game.add.sprite(596, 174, 'data01', 'new', this);
    this.fNewlevel.anchor.setTo(0.1, 1.0);

    this.fNewtime.scale.setTo(0);
    this.fNewlevel.scale.setTo(0);

    var _text = this.game.add.sprite(212,  30,"data02","text_result_best_en", this);


    this.fText2 = this.game.add.sprite(212, 107,"data02","text_result_reward_en", this);
    this.fText3 = this.game.add.sprite(212, 185,"data02","text_result_rank_en", this);

    _text.anchor.setTo(0.5, 0.5);
    this.fText2.anchor.setTo(0.5, 0.5);
    this.fText3.anchor.setTo(0.5, 0.5);

    this.game.add.sprite(350, 8,"data01","trophy_2",  this);
    this.game.add.sprite(350, 87, 'data01', 'star', this);
    this.game.add.sprite(350, 162, 'grade', _UserInfo.Grade, this);

    var style = { font: "bold 36px", fill: "#602e0d",stroke:"#602e0d", strokeThickness:1};


    var  sec1 = Math.floor(_UserInfo.Besttime[_UserInfo.Nowlevel] % 60);
    var  min1 = Math.floor(_UserInfo.Besttime[_UserInfo.Nowlevel] / 60);
    var formattedNumber = ("0" + sec1).slice(-2);
    var value  = min1 + ":"+formattedNumber;


    this.fTextBesttime      = this.game.add.text(500, 32, value,style, this);
    this.fRewardStar         = this.game.add.text(500, 110,"0",style, this);

    this.fTextRank      = this.game.add.text(500, 188,_BONUS_OBTAIN.GRADE[_UserInfo.Grade],style, this);

    this.fTextBesttime.anchor.setTo(0.5, 0.5);
    this.fRewardStar.anchor.setTo(0.5, 0.5);
    this.fTextRank.anchor.setTo(0.5, 0.5);

    this.min = 0;
    this.sec = 0;

    this.fNo_result4.frame =  Math.floor(this.min / 10);
    this.fNo_result3.frame =  Math.floor(this.min % 10);

    this.fNo_result2.frame =  Math.floor(this.sec / 10);
    this.fNo_result1.frame=	  Math.floor(this.sec % 10);
    this.getstar = 0;
    this.viewtime = 0;
    this.timestart = false;
    this.puttime();
    this.updatestatic = 0;

    this.userInfo = new Window_User(this.game, this);
    this.userInfo.position.setTo(10,-680);

    this.userInfo.visible = true;
    _FX.Start(_FX.SE_WIN);

    var tween  = this.game.add.tween(this).to( {y:700}, 700,Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(this.OnEffect,this);
};
Window_Result.prototype.OnEffect = function()
{
    this.timestart = true;
};
Window_Result.prototype.bestscore = function()
{
    this.fBest.scale.setTo(7,7);
    this.fBest.alpha = 0;
    this.game.add.tween(this.fBest.scale).to( {x:1,y:1}, 500,Phaser.Easing.Bounce.Out, true,1000);
    this.game.add.tween(this.fBest).to( {alpha:1}, 1000,Phaser.Easing.Linear.Out, true,1000);
};
Window_Result.prototype.puttime = function()
{
    this.sec = this.viewtime % 60;
    this.min = this.viewtime / 60;
    this.min = this.min % 99;

    this.fNo_result4.frame =  Math.floor(this.min / 10);
    this.fNo_result3.frame =  Math.floor(this.min % 10);
    this.fNo_result2.frame =  Math.floor(this.sec / 10);
    this.fNo_result1.frame=	  Math.floor(this.sec % 10);
};
Window_Result.prototype.update = function()
{
    switch(	this.updatestatic)
    {
        case 0:
            if(this.timestart)
            {
                if(	_UserInfo.PlayTime > this.viewtime)
                {
                    this.viewtime  += 10;
                    if(	_UserInfo.PlayTime <= this.viewtime)
                    {
                        this.fBtn_continue.inputEnabled = true;
                        this.viewtime  = _UserInfo.PlayTime;
                        this.updatestatic = 1;
                        if((_UserInfo.Besttime[_UserInfo.Nowlevel] == 0) ||(_UserInfo.Besttime[_UserInfo.Nowlevel] > _UserInfo.PlayTime ))
                        {
                            _UserInfo.Besttime[_UserInfo.Nowlevel] = _UserInfo.PlayTime;
                            this.fBest.visible = true;
                            var  sec1 = Math.floor(_UserInfo.Besttime[_UserInfo.Nowlevel] % 60);
                            var  min1 = Math.floor(_UserInfo.Besttime[_UserInfo.Nowlevel] / 60);
                            var formattedNumber = ("0" + sec1).slice(-2);
                            this.fTextBesttime.text = min1 + ":"+formattedNumber;


                            this.game.add.tween(this.fNewtime.scale).to( {x:1,y:1}, 500,Phaser.Easing.Bounce.Out, true);
                            var tween1 = this.game.add.tween(this.fEffect).to( {alpha:0.4 }, 100,Phaser.Easing.Linear.In, false);
                            var tween2 = this.game.add.tween(this.fEffect).to( {angle:360 }, 5000,Phaser.Easing.Linear.In, false,0,-1);
                            tween1.chain(tween2);
                            tween1.start(0);
                            Storage.SaveTime();

                        }
                        this.getstar =_BONUS_OBTAIN[_UserInfo.Nowlevel][0];
                        if(_TIME_SCOPE[_UserInfo.Nowlevel][2] * 60 <= _UserInfo.PlayTime)
                        {
                            this.getstar =_BONUS_OBTAIN[_UserInfo.Nowlevel][2];
                        }
                        if(_TIME_SCOPE[_UserInfo.Nowlevel][1] * 60 <= _UserInfo.PlayTime)
                        {
                            this.getstar =_BONUS_OBTAIN[_UserInfo.Nowlevel][1];

                        }

                        _UserInfo.TotalStar +=  this.getstar;
                        this.fRewardStar.text = this.getstar;
                        Storage.SaveGrade();
                        this.userInfo.initialize();
                        this.game.add.tween(this.fRewardStar.scale).to( {x:2,y:2}, 200,Phaser.Easing.Bounce.Out, true).yoyo(true);
                    }
                    this.puttime();
                }
            }
            break;
        case 1:
            break;
    }
};
Window_Result.prototype.ClickRetry = function()
{
    this.messagestate.On_EventCloseresult();
};

function Window_User(aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType) {

    Phaser.Group.call(this, aGame, aParent, aName, aAddToStage, aEnableBody, aPhysicsBodyType);
    this.game.add.sprite(0, 0, 'data03','popup_info', this);
    this._my_grade = this.game.add.tileSprite(25, 22, 38, 46, 'grade', _UserInfo.Grade,this);

    this.game.add.sprite(86, 22,'data01','star',this);

    this.fText_mystar  = this.game.add.text(220, 48, _UserInfo.TotalStar,{ font: "bold 36px", fill: "#602e0d",stroke:"#602e0d", strokeThickness:2},this);
    this.fText_mystar.anchor.setTo(0.5,0.5);
    this.fText_mystar.pivot.setTo(0.5, 0.5);
    this.fText_mystar.anchor.setTo(0.5, 0.5);

}
/** @type Phaser.Group */
var Window_User_proto = Object.create(Phaser.Group.prototype);
Window_User.prototype = Window_User_proto;
Window_User.prototype.constructor = Window_Result;


Window_User.prototype.initialize = function()
{
    this.fText_mystar.text = _UserInfo.TotalStar;
    this._my_grade.frame   = _UserInfo.Grade;
};

// -- user code here --

/* --- start generated code --- */

// Generated by  1.4.4 (Phaser v2.6.2)


/**
 * Prefab_Back
 * @param {Phaser.Game} aGame A reference to the currently running game.
 * @param {Number} aX The x coordinate (in world space) to position the Sprite at.
 * @param {Number} aY The y coordinate (in world space) to position the Sprite at.
 * @param {any} aKey This is the image or texture used by the Sprite during rendering. It can be a string which is a reference to the Cache entry, or an instance of a RenderTexture or PIXI.Texture.
 * @param {any} aFrame If this Sprite is using part of a sprite sheet or texture atlas you can specify the exact frame to use by giving a string or numeric index.
 */
function Prefab_Back(aGame, aX, aY, aSx, aSy, aKey, aFrame) {

    Phaser.TileSprite.call(this, aGame, aX, aY, aSx,aSy,aKey || null, aFrame == undefined || aFrame == null? null : aFrame);
    this.anchor.setTo(0.5,0.5);
    this.name = "skip";
    this.inputEnabled = false;
    this.game.time.events.add(5000, this.killself, this);
}

/** @type Phaser.TileSprite */
var Prefab_Back_proto = Object.create(Phaser.TileSprite.prototype);
Prefab_Back.prototype = Prefab_Back_proto;
Prefab_Back.prototype.constructor = Prefab_Back;

/* --- end generated code --- */
// -- user code here --
Prefab_Back.prototype.killself = function()
{
    console.log("kill");
    this.destroy();
};

/**
 *
 *
 */
"use strict";


var _DEFINE = _DEFINE  ||
    {
        VERSION:"SUDOKU@1.1",
        SUDOKUBASECOUNT:5,
        COUNT_TOTAL:81,
        COUNT_NUMBER:9,
        CHECK_PENALTY_TIME:30,
        LEVEL:{EASY:0,NORMAL:1,HARD:2},
        OPEN_COUNT:[55,40,35],
//	OPEN_COUNT:[75,40,35],
        PUSHTIME:20

    };

var _UserInfo = _UserInfo  ||
    {
        Sound:true,
        Besttime:[0,0,0],
        TotalStar: 0,
        Getstar: 0,
        PlayTime:0,
        Grade:0,
        PlayRetry:false,
        Nowlevel:_DEFINE.LEVEL.EASY,
        Prefab:null
    };

var _CALCUL = _CALCUL  ||
    {
        QUO_9:function (value)  {  	return Math.floor(value % 9); },
        DIV_9:function (value)  {  	return Math.floor(value / 9); },
        QUO_3:function (value)  {  	return Math.floor(value % 3); },
        DIV_3:function (value)  {  	return Math.floor(value / 3); }
    };

var _BONUS_OBTAIN= _BONUS_OBTAIN  ||
    {
        "0":[3,2,1],
        "1":[8,6,4],
        "2":[15,12,9],
        GRADE:["브론즈","실버","골드","다이아"]
    };
var _TIME_SCOPE= _TIME_SCOPE  ||
    {
        "0":[0,5,10],
        "1":[0,10,20],
        "2":[0,15,30]
    };

var _Config =  _Config  ||
    {
        width: 720,
        height: 1280,
        renderer: Phaser.AUTO,
        parent: 'gameWrapper',
        scaleMode: Phaser.ScaleManager.SHOW_ALL,
        fullScreenScaleMode: Phaser.ScaleManager.SHOW_ALL,
        transparent: true,
        antialias: true
    };

var _EFFECT_IMAGE = _EFFECT_IMAGE  ||
    {
        GO:1,
        MISS:2,
        GOOD:3,
        ONOFF:4,
        ONETIME:5,
        LINE:6,
        KILL:7,
        MISSNUMBER:8,
        LINEMAKE:9
    };

var _BTN = _BTN  ||
    {
        ANI1:function (_object)
        {
            _object.game.add.tween(_object.scale).to({x:1.4,y:1.4}, 40,Phaser.Easing.Elastic.InSine,true,0,0,true);
        },
        ANI2:function (_object)
        {
            _object.game.add.tween(_object.scale).to({x:1.4,y:1.4}, 40,Phaser.Easing.Bounce.InSine,true,0,0,true);
        },
        ANI3:function (_object)
        {

            _object.game.add.tween(_object.scale).to({x:1.1,y:1.1}, 40,Phaser.Easing.Linear.None,true,0,0,true);
        },
        ANI4:function (_object)
        {
            _object.game.add.tween(_object.scale).to({x:1.1,y:1.1}, 20,Phaser.Easing.Bounce.InSine,true,0,0,true);
        },
        ANI5:function (_object)
        {
            _object.game.add.tween(_object.scale).to({x:1.05,y:1.05}, 20,Phaser.Easing.Bounce.InSine,true,0,0,true);
        }

    };

var _IMAGE_LOCALIZING =  _IMAGE_LOCALIZING  ||
    {
        SELECT:["panel_level_easy","panel_level_normal","panel_level_hard"   ],
        TEXT_CHECK:[   "text_check",   "text_check_en",    "text_easy_en"   ],
        TEXT_SELECT_TITLE:["text_easy_en",   "text_normal_en",    "text_hard_en"   ],
        TEXT_CONFIRM:[ "text_confirm", "text_confirm_en",  "text_confirm_jp" ],
        TEXT_CONTINUE:["text_continue","text_continue_en", "text_continue_jp"],
        TEXT_DELETE:[  "text_delete",  "text_delete_en",   "text_delete_jp"  ],
        TEXT_GIVEUP:[  "text_giveup",  "text_giveup_en",   "text_giveup_jp"  ],
        TEXT_RESTART:[  "text_restart",  "text_restart_en",   "text_restart_jp"  ],
        TEXT_MEMO:[    "text_memo",    "text_memo_en",    "text_memo_jp"     ],
        TEXT_TITLE:[    "title_record",    "title_record_en",    "title_record_jp"     ],
        _BUTTON:[    "memo",    "delete",    "check"     ],
        TEXT_BUTTON:[  [ "text_memo",   "text_memo_en",   "text_memo_jp"  ],
            [ "text_delete", "text_delete_en", "text_delete_jp"  ],
            [ "text_check",  "text_check_en",  "text_check_jp"  ]
        ],
    };

var _FX = _FX ||
    {
        enable:true,
        Phasergame:null,

        Firststart:function ()
        {

            this.BGM_GAME.loop = true;
            this.BGM_TITLE.loop = true;
            this.Start(_FX.BGM_TITLE);
        },
        Load:function (obj)
        {
            this.Phasergame = obj;
            this.BGM_TITLE     = this.Phasergame.add.audio('BGM_Title');
            this.BGM_GAME      = this.Phasergame.add.audio('BGM_Game');
            this.SE_POPUP_ON      = this.Phasergame.add.audio('SE_Popup_ON');  // check
            this.SE_POPUP_OFF     = this.Phasergame.add.audio('SE_Popup_OFF');  // check
            this.SE_CLICK       = this.Phasergame.add.audio('SE_Click');  // check
            this.SE_SHUFFLE  = this.Phasergame.add.audio('SE_Shuffle');  // check
            this.SE_GO          = this.Phasergame.add.audio('SE_Go');
            this.SE_SELECTNUMBER= this.Phasergame.add.audio('SE_SelectNumber');
            this.SE_KEYPAD   = this.Phasergame.add.audio('SE_Keypad');
            this.SE_CHECK    = this.Phasergame.add.audio('SE_Check');
            this.SE_CORRECT  = this.Phasergame.add.audio('SE_Correct');
            this.SE_ERROR    = this.Phasergame.add.audio('SE_Error');
            this.SE_NUMBER    = this.Phasergame.add.audio('SE_Number');
            this.SE_MEMO     = this.Phasergame.add.audio('SE_Memo');
            this.SE_1     = this.Phasergame.add.audio('SE_1');
            this.SE_2     = this.Phasergame.add.audio('SE_2');
            this.SE_WIN     = this.Phasergame.add.audio('SE_Win');

        },
        Start:function (Source)
        {

            if(this.enable === false)return;
            Source.play();

        },
        Stop:function ()
        {

            if(this.BGM_TITLE.isPlaying === true) 	this.BGM_TITLE.stop();
            if(this.BGM_GAME.isPlaying === true)   	this.BGM_GAME.stop();
            if(this.SE_POPUP_ON.isPlaying === true) 		this.SE_POPUP_ON.stop();
            if(this.SE_POPUP_OFF.isPlaying === true) 	this.SE_POPUP_OFF.stop();
            if(this.SE_CLICK.isPlaying === true) 		this.SE_CLICK.stop();
            if(this.SE_SHUFFLE.isPlaying === true) 	this.SE_SHUFFLE.stop();
            if(this.SE_GO.isPlaying === true) 		this.SE_GO.stop();
            if(this.SE_SELECTNUMBER.isPlaying === true)this.SE_SELECTNUMBER.stop();
            if(this.SE_KEYPAD.isPlaying === true) 	this.SE_KEYPAD.stop();
            if(this.SE_CHECK.isPlaying === true) 	this.SE_CHECK.stop();
            if(this.SE_CORRECT.isPlaying === true) 	this.SE_CORRECT.stop();
            if(this.SE_ERROR.isPlaying === true) 	this.SE_ERROR.stop();
            if(this.SE_NUMBER.isPlaying === true) 	this.SE_NUMBER.stop();
            if(this.SE_MEMO.isPlaying === true) 	this.SE_MEMO.stop();
            if(this.SE_1.isPlaying === true) 		this.SE_1.stop();
            if(this.SE_2.isPlaying === true) 		this.SE_2.stop();
            if(this.SE_WIN.isPlaying === true) 		this.SE_WIN.stop();

        },
        SetBtn:function(Btn)
        {

            if(this.enable === true)Btn.setFrames(2,2,2,2);
            else                    Btn.setFrames(1,1,1,1);
        },
        Toggle:function(mode,But)
        {

            if(this.enable === false)
            {
                this.enable = true;
                switch(mode)
                {
                    case 0:

                        if(this.BGM_GAME.isPlaying === true)  this.BGM_GAME.stop();
                        this.BGM_TITLE.play();
                        break;
                    case 1:
                        if(this.BGM_TITLE.isPlaying === true)  this.BGM_TITLE.stop();
                        this.BGM_GAME.play();
                        break;
                }
            }
            else
            {

                this.enable = false;
                if(this.BGM_TITLE.isPlaying === true) 		this.BGM_TITLE.stop();
                if(this.BGM_GAME.isPlaying === true)   		this.BGM_GAME.stop();
                if(this.SE_POPUP_ON.isPlaying === true) 	this.SE_POPUP_ON.stop();
                if(this.SE_POPUP_OFF.isPlaying === true) 	this.SE_POPUP_OFF.stop();
                if(this.SE_CLICK.isPlaying === true) 		this.SE_CLICK.stop();
                if(this.SE_SHUFFLE.isPlaying === true) 		this.SE_SHUFFLE.stop();
                if(this.SE_GO.isPlaying === true) 			this.SE_GO.stop();
                if(this.SE_SELECTNUMBER.isPlaying === true)	this.SE_SELECTNUMBER.stop();
                if(this.SE_KEYPAD.isPlaying === true) 		this.SE_KEYPAD.stop();
                if(this.SE_CHECK.isPlaying === true) 		this.SE_CHECK.stop();
                if(this.SE_CORRECT.isPlaying === true) 		this.SE_CORRECT.stop();
                if(this.SE_ERROR.isPlaying === true) 		this.SE_ERROR.stop();
                if(this.SE_NUMBER.isPlaying === true) 		this.SE_NUMBER.stop();
                if(this.SE_MEMO.isPlaying === true) 		this.SE_MEMO.stop();
                if(this.SE_1.isPlaying === true) 			this.SE_1.stop();
                if(this.SE_2.isPlaying === true) 			this.SE_2.stop();
                if(this.SE_WIN.isPlaying === true) 			this.SE_WIN.stop();		}

            if(this.enable === true)But.setFrames(2,2,2,2);
            else                    But.setFrames(1,1,1,1);

            Storage.SaveSound(this.enable);
        }
    };


var _TimeInfo = _TimeInfo  ||
    {
        Player:null,
        Now:null
    };
/*
var FontStyle= FontStyle  ||
{
	T1: { font: "bold 46px Nanum Gothic", fill: "#fff",    boundsAlignH: "center", boundsAlignV: "middle" ,stroke:"473b30", strokeThickness:2},
	T2: { font: "bold 38px Nanum Gothic", fill: "#fff",    boundsAlignH: "center", boundsAlignV: "middle" ,stroke:"473b30", strokeThickness:2},
	T3: { font: "bold 44px Nanum Gothic", fill: "#804000", boundsAlignH: "center", boundsAlignV: "middle" },
	T4: { font: "bold 50px Nanum Gothic", fill: "#602e0d", boundsAlignH: "center", boundsAlignV: "middle" },
	C1: { font: "bold 26px Nanum Gothic", fill: "#482711", boundsAlignH: "left",   boundsAlignV: "middle" },
	C2: { font: "bold 26px Nanum Gothic", fill: "#602e0d", boundsAlignH: "left",   boundsAlignV: "middle" },
	BEST: { font: "bold 26px Nanum Gothic", fill: "#482711", boundsAlignH: "left",   boundsAlignV: "middle",stroke:"#482711", strokeThickness:1 },

    BONUSHELP: { font: "bold 30px Nanum Gothic", fill: "#602e0d", boundsAlignH: "left",   boundsAlignV: "middle" },
	C3: { font: "bold 28px Nanum Gothic", fill: "#482711", boundsAlignH: "left",   boundsAlignV: "middle" ,wordWrap: false, wordWrapWidth: 40},
	C4: { font: "bold 34px Nanum Gothic", fill: "#602e0d", boundsAlignH: "left",   boundsAlignV: "middle" ,wordWrap: false, wordWrapWidth: 40},
	C5: { font: "bold 24px Nanum Gothic", fill: "#ffffff", boundsAlignH: "left",   boundsAlignV: "middle" ,wordWrap: false, wordWrapWidth: 40},
	C6: { font: "bold 38px Nanum Gothic", fill: "#ffffff", stroke:"#473b30", strokeThickness:3, align:"center"},
	TIME: { font: "bold 35px Nanum Gothic", fill: "#473b30", boundsAlignH: "left",  stroke:"#473b30", strokeThickness:1, boundsAlignV: "middle" },
	C7: { font: "bold 34px Nanum Gothic", fill: "#602e0d",stroke:"#602e0d", strokeThickness:1},
	C8: { font: "bold 36px Nanum Gothic", fill: "#602e0d",stroke:"#602e0d", strokeThickness:1},
};

*/

var FontStyle= FontStyle  ||
    {
        T1: { font: "bold 46px ", fill: "#fff",    boundsAlignH: "center", boundsAlignV: "middle" ,stroke:"473b30", strokeThickness:2},
        T2: { font: "bold 38px ", fill: "#fff",    boundsAlignH: "center", boundsAlignV: "middle" ,stroke:"473b30", strokeThickness:2},
        T3: { font: "bold 44px ", fill: "#804000", boundsAlignH: "center", boundsAlignV: "middle" },
        T4: { font: "bold 50px ", fill: "#602e0d", boundsAlignH: "center", boundsAlignV: "middle" },
        C1: { font: "bold 26px ", fill: "#482711", boundsAlignH: "left",   boundsAlignV: "middle" },
        C2: { font: "bold 26px ", fill: "#602e0d", boundsAlignH: "left",   boundsAlignV: "middle" },
        BEST: { font: "bold 26px ", fill: "#482711", boundsAlignH: "left",   boundsAlignV: "middle",stroke:"#482711", strokeThickness:1 },

        BONUSHELP: { font: "bold 30px  ", fill: "#602e0d", boundsAlignH: "left",   boundsAlignV: "middle" },
        C3: { font: "bold 28px  ", fill: "#482711", boundsAlignH: "left",   boundsAlignV: "middle" ,wordWrap: false, wordWrapWidth: 40},
        C4: { font: "bold 34px  ", fill: "#602e0d", boundsAlignH: "left",   boundsAlignV: "middle" ,wordWrap: false, wordWrapWidth: 40},
        C5: { font: "bold 24px  ", fill: "#ffffff", boundsAlignH: "left",   boundsAlignV: "middle" ,wordWrap: false, wordWrapWidth: 40},
        C6: { font: "bold 38px  ", fill: "#ffffff", stroke:"#473b30", strokeThickness:3, align:"center"},
        TIME: { font: "bold 35px  ", fill: "#473b30", boundsAlignH: "left",  stroke:"#473b30", strokeThickness:1, boundsAlignV: "middle" },
        C7: { font: "bold 34px  ", fill: "#602e0d",stroke:"#602e0d", strokeThickness:1},
        C8: { font: "bold 36px  ", fill: "#602e0d",stroke:"#602e0d", strokeThickness:1},
    };


var LEVEL_CHAR =LEVEL_CHAR  ||
    {
        "0":[ '쉬움', 'EASY','初級'    ],
        "1":[ '보통', 'MEDIUM', '中級' ],
        "2":[ '어려움','HARD', '上級'   ],
    };
var _LocalText = _LocalText  ||
    {
        TITLE_CHOICE: { 0: '난이도선택', 1: 'Select Level', 2:  'レベルを選択します' },
        SELECTEXT: ['쉬움', 'EASY','初級','보통', 'MEDIUM','中級' ,'어려움','HARD','上級' ],
        BONUS: { 0: '클리어보상', 1: 'Bonus', 2: 'Bonus' },
        BESTTIME: { 0: '최단시간', 1: 'Best Time', 2: 'Best Time' },
        MYLEVEL: { 0: '내등급', 1: 'My Level', 2: '私のレベル' },
        "0":[ '쉬움', 'EASY','初級'    ],
        "1":[ '보통', 'MEDIUM', '中級' ],
        "2":[ '어려움','HARD', '上級'   ],
    };

var Button_Tween = Button_Tween  ||function(source,object,scalex,scaley,time)
{
    source.add.tween(object.scale).to({x:scalex, y:scaley}, time,"Linear",true,0,-1).yoyo(true);
};
var _Locailizing = _Locailizing  ||
    {
        County:1
    };


function  _Object_SUDOKU()
{

    this._MixBase  = [0,1,2,3,4,5,6,7,8];
    this.Level = 0;

    this.LevelChoice = [0,0,0];

    this._Data_Org =
        {
            '0':
                [
                    [
                        ( 9| 0x1000),( 8| 0x1000),( 1| 0x1000),( 5| 0x0000),( 2| 0x0000),( 3| 0x1000),( 6| 0x0000),( 4| 0x1000),( 7| 0x0000),
                        ( 6| 0x0000),( 3| 0x0000),( 4| 0x0000),( 8| 0x0000),( 7| 0x1000),( 9| 0x1000),( 2| 0x1000),( 5| 0x1000),( 1| 0x0000),
                        ( 2| 0x0000),( 7| 0x1000),( 5| 0x0000),( 1| 0x1000),( 4| 0x0000),( 6| 0x1000),( 9| 0x0000),( 8| 0x1000),( 3| 0x1000),
                        ( 1| 0x0000),( 9| 0x1000),( 6| 0x0000),( 4| 0x1000),( 8| 0x0000),( 7| 0x1000),( 5| 0x1000),( 3| 0x0000),( 2| 0x1000),
                        ( 5| 0x0000),( 4| 0x0000),( 8| 0x1000),( 3| 0x0000),( 1| 0x1000),( 2| 0x0000),( 7| 0x1000),( 6| 0x0000),( 9| 0x0000),
                        ( 7| 0x1000),( 2| 0x0000),( 3| 0x1000),( 6| 0x1000),( 9| 0x0000),( 5| 0x1000),( 4| 0x0000),( 1| 0x1000),( 8| 0x0000),
                        ( 3| 0x1000),( 1| 0x1000),( 2| 0x0000),( 7| 0x1000),( 5| 0x0000),( 4| 0x1000),( 8| 0x0000),( 9| 0x1000),( 6| 0x0000),
                        ( 4| 0x0000),( 6| 0x1000),( 9| 0x1000),( 2| 0x1000),( 3| 0x1000),( 8| 0x0000),( 1| 0x0000),( 7| 0x0000),( 5| 0x0000),
                        ( 8| 0x0000),( 5| 0x1000),( 7| 0x0000),( 9| 0x1000),( 6| 0x0000),( 1| 0x0000),( 3| 0x1000),( 2| 0x1000),( 4| 0x1000)
                    ],
                    [
                        ( 7| 0x0000),( 2| 0x1000),( 1| 0x1000),( 6| 0x1000),( 8| 0x0000),( 5| 0x0000),( 4| 0x1000),( 9| 0x1000),( 3| 0x0000),
                        ( 3| 0x1000),( 8| 0x1000),( 6| 0x0000),( 1| 0x1000),( 9| 0x1000),( 4| 0x1000),( 5| 0x0000),( 2| 0x0000),( 7| 0x0000),
                        ( 5| 0x1000),( 9| 0x0000),( 4| 0x0000),( 2| 0x0000),( 7| 0x1000),( 3| 0x0000),( 6| 0x1000),( 8| 0x0000),( 1| 0x0000),
                        ( 8| 0x0000),( 4| 0x1000),( 5| 0x1000),( 7| 0x1000),( 6| 0x0000),( 2| 0x1000),( 1| 0x1000),( 3| 0x0000),( 9| 0x0000),
                        ( 9| 0x1000),( 6| 0x1000),( 3| 0x0000),( 8| 0x0000),( 5| 0x1000),( 1| 0x0000),( 2| 0x0000),( 7| 0x1000),( 4| 0x1000),
                        ( 1| 0x0000),( 7| 0x0000),( 2| 0x1000),( 3| 0x1000),( 4| 0x0000),( 9| 0x1000),( 8| 0x1000),( 5| 0x1000),( 6| 0x0000),
                        ( 6| 0x0000),( 5| 0x0000),( 9| 0x1000),( 4| 0x0000),( 2| 0x1000),( 7| 0x0000),( 3| 0x0000),( 1| 0x0000),( 8| 0x1000),
                        ( 2| 0x0000),( 1| 0x0000),( 8| 0x0000),( 9| 0x1000),( 3| 0x1000),( 6| 0x1000),( 7| 0x0000),( 4| 0x1000),( 5| 0x1000),
                        ( 4| 0x0000),( 3| 0x1000),( 7| 0x1000),( 5| 0x0000),( 1| 0x0000),( 8| 0x1000),( 9| 0x1000),( 6| 0x1000),( 2| 0x0000)
                    ],
                    [
                        ( 9| 0x1000),( 6| 0x0000),( 1| 0x0000),( 7| 0x1000),( 3| 0x0000),( 4| 0x1000),( 5| 0x0000),( 8| 0x0000),( 2| 0x1000),
                        ( 7| 0x0000),( 8| 0x0000),(	3| 0x1000),( 5| 0x1000),( 9| 0x0000),( 2| 0x1000),(	6| 0x1000),( 4| 0x0000),( 1| 0x0000),
                        ( 5| 0x0000),( 2| 0x1000),(	4| 0x1000),( 8| 0x1000),( 6| 0x0000),( 1| 0x1000),( 9| 0x1000),( 7| 0x1000),( 3| 0x0000),
                        ( 2| 0x1000),( 1| 0x1000),( 7| 0x1000),( 9| 0x0000),( 5| 0x0000),( 6| 0x0000),( 4| 0x1000),( 3| 0x1000),( 8| 0x1000),
                        ( 4| 0x0000),( 3| 0x0000),(	9| 0x0000),( 2| 0x0000),( 8| 0x1000),( 7| 0x0000),( 1| 0x0000),( 6| 0x0000),( 5| 0x0000),
                        ( 6| 0x1000),( 5| 0x1000),( 8| 0x1000),( 4| 0x0000),( 1| 0x0000),( 3| 0x0000),(	2| 0x1000),( 9| 0x1000),( 7| 0x1000),
                        ( 8| 0x0000),( 4| 0x1000),(	5| 0x1000),( 3| 0x1000),( 2| 0x0000),( 9| 0x1000),( 7| 0x1000),( 1| 0x1000),( 6| 0x0000),
                        ( 3| 0x0000),( 7| 0x0000),( 6| 0x1000),( 1| 0x1000),( 4| 0x0000),( 5| 0x1000),(	8| 0x1000),( 2| 0x0000),( 9| 0x0000),
                        ( 1| 0x1000),( 9| 0x0000),(	2| 0x0000),( 6| 0x1000),( 7| 0x0000),( 8| 0x1000),( 3| 0x0000),( 5| 0x0000),( 4| 0x1000)
                    ],
                    [
                        ( 5| 0x0000),( 6| 0x0000),( 1| 0x0000),( 7| 0x0000),( 9| 0x0000),( 4| 0x1000),( 2| 0x1000),( 8| 0x1000),( 3| 0x0000),
                        ( 2| 0x0000),( 7| 0x1000),( 3| 0x0000),( 1| 0x1000),( 8| 0x1000),( 6| 0x0000),( 4| 0x1000),( 9| 0x1000),( 5| 0x1000),
                        ( 8| 0x0000),( 9| 0x0000),( 4| 0x1000),( 2| 0x1000),( 3| 0x0000),( 5| 0x0000),( 6| 0x1000),( 7| 0x0000),( 1| 0x1000),
                        ( 9| 0x0000),( 1| 0x1000),( 2| 0x0000),( 6| 0x0000),( 5| 0x0000),( 8| 0x1000),( 3| 0x1000),( 4| 0x1000),( 7| 0x1000),
                        ( 7| 0x1000),( 4| 0x0000),( 8| 0x1000),( 3| 0x0000),( 1| 0x1000),( 9| 0x0000),( 5| 0x1000),( 2| 0x0000),( 6| 0x1000),
                        ( 3| 0x1000),( 5| 0x1000),( 6| 0x1000),( 4| 0x1000),( 7| 0x0000),( 2| 0x0000),( 8| 0x0000),( 1| 0x1000),( 9| 0x0000),
                        ( 4| 0x1000),( 3| 0x0000),( 7| 0x1000),( 8| 0x0000),( 6| 0x0000),( 1| 0x1000),( 9| 0x1000),( 5| 0x0000),( 2| 0x0000),
                        ( 6| 0x1000),( 8| 0x1000),( 5| 0x1000),( 9| 0x0000),( 2| 0x1000),( 7| 0x1000),( 1| 0x0000),( 3| 0x1000),( 4| 0x0000),
                        ( 1| 0x0000),( 2| 0x1000),( 9| 0x1000),( 5| 0x1000),( 4| 0x0000),( 3| 0x0000),( 7| 0x0000),( 6| 0x0000),( 8| 0x0000)
                    ],
                    [
                        ( 9| 0x1000),( 1| 0x1000),( 4| 0x0000),( 3| 0x1000),( 6| 0x1000),( 7| 0x1000),( 2| 0x0000),( 5| 0x1000),( 8| 0x1000),
                        ( 2| 0x1000),( 3| 0x0000),( 7| 0x0000),( 5| 0x0000),( 1| 0x0000),( 8| 0x0000),( 9| 0x0000),( 6| 0x0000),( 4| 0x1000),
                        ( 5| 0x0000),( 8| 0x1000),( 6| 0x1000),( 9| 0x0000),( 2| 0x0000),( 4| 0x0000),( 7| 0x1000),( 3| 0x1000),( 1| 0x0000),
                        ( 1| 0x0000),( 2| 0x1000),( 5| 0x1000),( 7| 0x1000),( 4| 0x0000),( 9| 0x1000),( 6| 0x1000),( 8| 0x1000),( 3| 0x0000),
                        ( 7| 0x0000),( 6| 0x0000),( 8| 0x0000),( 1| 0x1000),( 3| 0x1000),( 2| 0x1000),( 4| 0x0000),( 9| 0x0000),( 5| 0x0000),
                        ( 3| 0x0000),( 4| 0x1000),( 9| 0x1000),( 6| 0x1000),( 8| 0x0000),( 5| 0x1000),( 1| 0x1000),( 2| 0x1000),( 7| 0x0000),
                        ( 8| 0x0000),( 9| 0x1000),( 3| 0x1000),( 4| 0x0000),( 7| 0x0000),( 6| 0x0000),( 5| 0x1000),( 1| 0x1000),( 2| 0x0000),
                        ( 6| 0x1000),( 7| 0x0000),( 1| 0x0000),( 2| 0x0000),( 5| 0x0000),( 3| 0x0000),( 8| 0x0000),( 4| 0x0000),( 9| 0x1000),
                        ( 4| 0x1000),( 5| 0x1000),( 2| 0x0000),( 8| 0x1000),( 9| 0x1000),( 1| 0x1000),( 3| 0x0000),( 7| 0x1000),( 6| 0x1000)
                    ],
                ],

            '1':
                [
                    [
                        ( 1| 0x0000),(3| 0x0000),(7| 0x1000),(6| 0x0000),(8| 0x1000),(4| 0x0000),(2| 0x1000),(9| 0x0000),(5| 0x0000),
                        ( 6| 0x1000),(5| 0x0000),(4| 0x0000),(7| 0x1000),(9| 0x0000),(2| 0x1000),(8| 0x0000),(3| 0x0000),(1| 0x0000),
                        ( 8| 0x0000),(9| 0x1000),(2| 0x0000),(5| 0x1000),(3| 0x0000),(1| 0x1000),(4| 0x0000),(6| 0x1000),(7| 0x0000),
                        ( 7| 0x1000),(6| 0x0000),(5| 0x0000),(2| 0x0000),(1| 0x0000),(9| 0x1000),(3| 0x0000),(4| 0x0000),(8| 0x1000),
                        ( 4| 0x1000),(8| 0x0000),(9| 0x0000),(3| 0x1000),(5| 0x0000),(7| 0x1000),(6| 0x0000),(1| 0x0000),(2| 0x1000),
                        ( 3| 0x1000),(2| 0x0000),(1| 0x0000),(8| 0x1000),(4| 0x0000),(6| 0x0000),(5| 0x0000),(7| 0x0000),(9| 0x1000),
                        ( 9| 0x0000),(1| 0x1000),(6| 0x0000),(4| 0x1000),(2| 0x0000),(8| 0x1000),(7| 0x0000),(5| 0x1000),(3| 0x0000),
                        ( 2| 0x0000),(4| 0x0000),(3| 0x0000),(9| 0x1000),(7| 0x0000),(5| 0x1000),(1| 0x0000),(8| 0x0000),(6| 0x1000),
                        ( 5| 0x0000),(7| 0x0000),(8| 0x1000),(1| 0x0000),(6| 0x1000),(3| 0x0000),(9| 0x1000),(2| 0x0000),(4| 0x0000)
                    ],
                    [
                        ( 2| 0x1000),(6| 0x0000),(9| 0x1000),(5| 0x0000),(8| 0x0000),(7| 0x1000),(1| 0x0000),(4| 0x0000),(3| 0x0000),
                        ( 8| 0x1000),(7| 0x0000),(1| 0x1000),(2| 0x1000),(4| 0x0000),(3| 0x0000),(5| 0x0000),(6| 0x1000),(9| 0x0000),
                        ( 5| 0x0000),(3| 0x0000),(4| 0x0000),(9| 0x0000),(1| 0x1000),(6| 0x0000),(8| 0x0000),(7| 0x0000),(2| 0x1000),
                        ( 3| 0x1000),(9| 0x1000),(8| 0x0000),(4| 0x0000),(2| 0x0000),(5| 0x1000),(7| 0x0000),(1| 0x1000),(6| 0x0000),
                        ( 6| 0x1000),(2| 0x1000),(5| 0x0000),(3| 0x0000),(7| 0x0000),(1| 0x0000),(4| 0x0000),(9| 0x1000),(8| 0x1000),
                        ( 1| 0x0000),(4| 0x1000),(7| 0x0000),(8| 0x1000),(6| 0x0000),(9| 0x0000),(2| 0x0000),(3| 0x1000),(5| 0x1000),
                        ( 4| 0x1000),(1| 0x0000),(2| 0x0000),(6| 0x0000),(9| 0x1000),(8| 0x0000),(3| 0x0000),(5| 0x0000),(7| 0x0000),
                        ( 9| 0x0000),(8| 0x1000),(3| 0x0000),(7| 0x0000),(5| 0x0000),(4| 0x1000),(6| 0x1000),(2| 0x0000),(1| 0x1000),
                        ( 7| 0x0000),(5| 0x0000),(6| 0x0000),(1| 0x1000),(3| 0x0000),(2| 0x0000),(9| 0x1000),(8| 0x0000),(4| 0x1000)
                    ],
                    [
                        ( 3| 0x0000),(1| 0x0000),(9| 0x1000),(7| 0x1000),(4| 0x0000),(6| 0x1000),(5| 0x1000),(8| 0x0000),(2| 0x0000),
                        ( 7| 0x0000),(2| 0x1000),(4| 0x0000),(5| 0x0000),(8| 0x0000),(3| 0x0000),(9| 0x0000),(1| 0x1000),(6| 0x0000),
                        ( 6| 0x1000),(5| 0x0000),(8| 0x0000),(9| 0x0000),(1| 0x1000),(2| 0x0000),(4| 0x0000),(7| 0x0000),(3| 0x1000),
                        ( 4| 0x1000),(3| 0x0000),(1| 0x0000),(2| 0x1000),(9| 0x0000),(7| 0x1000),(8| 0x0000),(6| 0x0000),(5| 0x1000),
                        ( 9| 0x0000),(7| 0x0000),(2| 0x1000),(8| 0x0000),(6| 0x0000),(5| 0x0000),(3| 0x1000),(4| 0x0000),(1| 0x0000),
                        ( 8| 0x1000),(6| 0x0000),(5| 0x0000),(4| 0x1000),(3| 0x0000),(1| 0x1000),(7| 0x0000),(2| 0x0000),(9| 0x1000),
                        ( 5| 0x1000),(9| 0x0000),(7| 0x0000),(1| 0x0000),(2| 0x1000),(8| 0x0000),(6| 0x0000),(3| 0x0000),(4| 0x1000),
                        ( 2| 0x0000),(8| 0x1000),(6| 0x0000),(3| 0x0000),(5| 0x0000),(4| 0x0000),(1| 0x0000),(9| 0x1000),(7| 0x0000),
                        ( 1| 0x0000),(4| 0x0000),(3| 0x1000),(6| 0x1000),(7| 0x0000),(9| 0x1000),(2| 0x1000),(5| 0x0000),(8| 0x0000)
                    ],
                    [
                        ( 1| 0x0000),(5| 0x1000),(9| 0x0000),(2| 0x0000),(7| 0x1000),(8| 0x0000),(3| 0x0000),(6| 0x1000),(4| 0x1000),
                        ( 8| 0x0000),(3| 0x0000),(2| 0x0000),(4| 0x0000),(5| 0x0000),(6| 0x1000),(7| 0x0000),(9| 0x0000),(1| 0x0000),
                        ( 6| 0x0000),(4| 0x1000),(7| 0x0000),(1| 0x0000),(3| 0x1000),(9| 0x0000),(5| 0x1000),(2| 0x1000),(8| 0x0000),
                        ( 7| 0x1000),(8| 0x1000),(4| 0x1000),(3| 0x0000),(6| 0x1000),(1| 0x0000),(9| 0x1000),(5| 0x0000),(2| 0x0000),
                        ( 9| 0x0000),(6| 0x0000),(5| 0x0000),(8| 0x0000),(2| 0x1000),(7| 0x0000),(4| 0x0000),(1| 0x0000),(3| 0x0000),
                        ( 2| 0x0000),(1| 0x0000),(3| 0x1000),(5| 0x0000),(9| 0x1000),(4| 0x0000),(6| 0x1000),(8| 0x1000),(7| 0x1000),
                        ( 3| 0x0000),(9| 0x1000),(8| 0x1000),(7| 0x0000),(1| 0x1000),(5| 0x0000),(2| 0x0000),(4| 0x1000),(6| 0x0000),
                        ( 4| 0x0000),(2| 0x0000),(6| 0x0000),(9| 0x1000),(8| 0x0000),(3| 0x0000),(1| 0x0000),(7| 0x0000),(5| 0x0000),
                        ( 5| 0x1000),(7| 0x1000),(1| 0x0000),(6| 0x0000),(4| 0x1000),(2| 0x0000),(8| 0x0000),(3| 0x1000),(9| 0x0000)
                    ],
                    [
                        ( 5| 0x0000),(4| 0x0000),(6| 0x1000),(2| 0x1000),(9| 0x1000),(7| 0x0000),(1| 0x0000),(8| 0x1000),(3| 0x0000),
                        ( 9| 0x1000),(8| 0x1000),(3| 0x0000),(1| 0x0000),(6| 0x1000),(5| 0x0000),(4| 0x0000),(7| 0x0000),(2| 0x1000),
                        ( 7| 0x1000),(2| 0x0000),(1| 0x0000),(4| 0x0000),(3| 0x0000),(8| 0x1000),(5| 0x0000),(6| 0x0000),(9| 0x1000),
                        ( 1| 0x1000),(7| 0x0000),(2| 0x1000),(5| 0x1000),(4| 0x1000),(6| 0x0000),(9| 0x0000),(3| 0x1000),(8| 0x0000),
                        ( 3| 0x0000),(9| 0x0000),(4| 0x0000),(8| 0x0000),(7| 0x1000),(1| 0x0000),(2| 0x0000),(5| 0x0000),(6| 0x0000),
                        ( 6| 0x0000),(5| 0x1000),(8| 0x0000),(9| 0x0000),(2| 0x1000),(3| 0x1000),(7| 0x1000),(4| 0x0000),(1| 0x1000),
                        ( 2| 0x1000),(3| 0x0000),(9| 0x0000),(6| 0x1000),(5| 0x0000),(4| 0x0000),(8| 0x0000),(1| 0x0000),(7| 0x1000),
                        ( 4| 0x1000),(1| 0x0000),(7| 0x0000),(3| 0x0000),(8| 0x1000),(2| 0x0000),(6| 0x0000),(9| 0x1000),(5| 0x1000),
                        ( 8| 0x0000),(6| 0x1000),(5| 0x0000),(7| 0x0000),(1| 0x1000),(9| 0x1000),(3| 0x1000),(2| 0x0000),(4| 0x0000)
                    ]
                ],
            '2':
                [
                    [
                        ( 5| 0x0000),(9| 0x1000),(2| 0x0000),(6| 0x1000),(7| 0x0000),(4| 0x1000),(3| 0x0000),(8| 0x1000),(1| 0x0000),
                        ( 4| 0x1000),(3| 0x0000),(6| 0x0000),(8| 0x1000),(9| 0x0000),(1| 0x1000),(5| 0x0000),(2| 0x0000),(7| 0x1000),
                        ( 8| 0x0000),(1| 0x0000),(7| 0x0000),(5| 0x0000),(3| 0x1000),(2| 0x0000),(4| 0x0000),(9| 0x0000),(6| 0x0000),
                        ( 6| 0x1000),(5| 0x1000),(8| 0x0000),(9| 0x0000),(1| 0x0000),(7| 0x0000),(2| 0x0000),(3| 0x1000),(4| 0x1000),
                        ( 3| 0x0000),(4| 0x0000),(1| 0x1000),(2| 0x0000),(8| 0x0000),(6| 0x0000),(9| 0x1000),(7| 0x0000),(5| 0x0000),
                        ( 2| 0x1000),(7| 0x1000),(9| 0x0000),(3| 0x0000),(4| 0x0000),(5| 0x0000),(1| 0x0000),(6| 0x1000),(8| 0x1000),
                        ( 9| 0x0000),(6| 0x0000),(5| 0x0000),(4| 0x0000),(2| 0x1000),(8| 0x0000),(7| 0x0000),(1| 0x0000),(3| 0x0000),
                        ( 7| 0x1000),(2| 0x0000),(4| 0x0000),(1| 0x1000),(6| 0x0000),(3| 0x1000),(8| 0x0000),(5| 0x0000),(9| 0x1000),
                        ( 1| 0x0000),(8| 0x1000),(3| 0x0000),(7| 0x1000),(5| 0x0000),(9| 0x1000),(6| 0x0000),(4| 0x1000),(2| 0x0000)
                    ],
                    [
                        ( 8| 0x0000),(6| 0x0000),(4| 0x0000),(5| 0x1000),(9| 0x1000),(2| 0x1000),(1| 0x0000),(3| 0x0000),(7| 0x0000),
                        ( 9| 0x0000),(2| 0x0000),(7| 0x1000),(1| 0x1000),(6| 0x1000),(3| 0x1000),(5| 0x1000),(8| 0x0000),(4| 0x0000),
                        ( 5| 0x0000),(3| 0x1000),(1| 0x0000),(7| 0x0000),(4| 0x0000),(8| 0x0000),(9| 0x0000),(6| 0x1000),(2| 0x0000),
                        ( 2| 0x1000),(4| 0x1000),(8| 0x0000),(9| 0x0000),(1| 0x1000),(5| 0x0000),(6| 0x0000),(7| 0x1000),(3| 0x1000),
                        ( 7| 0x1000),(9| 0x1000),(5| 0x0000),(3| 0x1000),(2| 0x0000),(6| 0x1000),(4| 0x0000),(1| 0x1000),(8| 0x1000),
                        ( 3| 0x1000),(1| 0x1000),(6| 0x0000),(4| 0x0000),(8| 0x1000),(7| 0x0000),(2| 0x0000),(9| 0x1000),(5| 0x1000),
                        ( 4| 0x0000),(7| 0x1000),(3| 0x0000),(6| 0x0000),(5| 0x0000),(9| 0x0000),(8| 0x0000),(2| 0x1000),(1| 0x0000),
                        ( 6| 0x0000),(5| 0x0000),(2| 0x1000),(8| 0x1000),(7| 0x1000),(1| 0x1000),(3| 0x1000),(4| 0x0000),(9| 0x0000),
                        ( 1| 0x0000),(8| 0x0000),(9| 0x0000),(2| 0x1000),(3| 0x1000),(4| 0x1000),(7| 0x0000),(5| 0x0000),(6| 0x0000)
                    ],
                    [
                        ( 7| 0x1000),(4| 0x1000),(6| 0x0000),(9| 0x1000),(3| 0x0000),(2| 0x1000),(8| 0x0000),(5| 0x1000),(1| 0x1000),
                        ( 9| 0x1000),(5| 0x0000),(2| 0x0000),(6| 0x0000),(1| 0x0000),(8| 0x0000),(4| 0x0000),(3| 0x0000),(7| 0x1000),
                        ( 8| 0x0000),(3| 0x0000),(1| 0x1000),(4| 0x1000),(7| 0x0000),(5| 0x1000),(2| 0x1000),(9| 0x0000),(6| 0x0000),
                        ( 3| 0x1000),(1| 0x0000),(5| 0x1000),(2| 0x1000),(6| 0x0000),(7| 0x1000),(9| 0x1000),(8| 0x0000),(4| 0x1000),
                        ( 2| 0x0000),(8| 0x0000),(7| 0x0000),(5| 0x0000),(4| 0x0000),(9| 0x0000),(1| 0x0000),(6| 0x0000),(3| 0x0000),
                        ( 6| 0x1000),(9| 0x0000),(4| 0x1000),(1| 0x1000),(8| 0x0000),(3| 0x1000),(5| 0x1000),(7| 0x0000),(2| 0x1000),
                        ( 5| 0x0000),(6| 0x0000),(8| 0x1000),(7| 0x1000),(2| 0x0000),(1| 0x1000),(3| 0x1000),(4| 0x0000),(9| 0x0000),
                        ( 1| 0x1000),(7| 0x0000),(9| 0x0000),(3| 0x0000),(5| 0x0000),(4| 0x0000),(6| 0x0000),(2| 0x0000),(8| 0x1000),
                        ( 4| 0x1000),(2| 0x1000),(3| 0x0000),(8| 0x1000),(9| 0x0000),(6| 0x1000),(7| 0x0000),(1| 0x1000),(5| 0x1000)
                    ],
                    [

                        ( 7| 0x1000),(8| 0x0000),(9| 0x0000),(4| 0x0000),(3| 0x0000),(5| 0x0000),(1| 0x1000),(6| 0x0000),(2| 0x1000),
                        ( 1| 0x0000),(4| 0x1000),(6| 0x1000),(9| 0x0000),(2| 0x0000),(7| 0x0000),(3| 0x0000),(5| 0x0000),(8| 0x1000),
                        ( 3| 0x0000),(2| 0x1000),(5| 0x0000),(6| 0x0000),(8| 0x1000),(1| 0x0000),(9| 0x0000),(7| 0x1000),(4| 0x1000),
                        ( 6| 0x1000),(9| 0x1000),(8| 0x0000),(2| 0x1000),(5| 0x0000),(4| 0x1000),(7| 0x0000),(1| 0x0000),(3| 0x0000),
                        ( 5| 0x0000),(1| 0x0000),(2| 0x0000),(7| 0x0000),(6| 0x0000),(3| 0x0000),(8| 0x0000),(4| 0x0000),(9| 0x0000),
                        ( 4| 0x0000),(7| 0x0000),(3| 0x0000),(1| 0x1000),(9| 0x0000),(8| 0x1000),(6| 0x0000),(2| 0x1000),(5| 0x1000),
                        ( 2| 0x1000),(3| 0x1000),(1| 0x0000),(5| 0x0000),(7| 0x1000),(9| 0x0000),(4| 0x0000),(8| 0x1000),(6| 0x0000),
                        ( 8| 0x1000),(6| 0x0000),(4| 0x0000),(3| 0x0000),(1| 0x0000),(2| 0x0000),(5| 0x1000),(9| 0x1000),(7| 0x0000),
                        ( 9| 0x1000),(5| 0x0000),(7| 0x1000),(8| 0x0000),(4| 0x0000),(6| 0x0000),(2| 0x0000),(3| 0x0000),(1| 0x1000)
                    ],
                    [

                        ( 2| 0x0000),(6| 0x1000),(7| 0x1000),(5| 0x0000),(8| 0x0000),(1| 0x0000),(4| 0x1000),(9| 0x1000),(3| 0x0000),
                        ( 5| 0x1000),(4| 0x0000),(3| 0x0000),(9| 0x1000),(2| 0x0000),(6| 0x1000),(7| 0x0000),(1| 0x0000),(8| 0x1000),
                        ( 1| 0x1000),(8| 0x0000),(9| 0x0000),(7| 0x0000),(3| 0x0000),(4| 0x0000),(6| 0x0000),(2| 0x0000),(5| 0x1000),
                        ( 7| 0x0000),(5| 0x1000),(4| 0x0000),(3| 0x0000),(6| 0x1000),(9| 0x0000),(2| 0x0000),(8| 0x1000),(1| 0x0000),
                        ( 6| 0x0000),(1| 0x0000),(8| 0x0000),(2| 0x1000),(5| 0x0000),(7| 0x1000),(9| 0x0000),(3| 0x0000),(4| 0x0000),
                        ( 3| 0x0000),(9| 0x1000),(2| 0x0000),(1| 0x0000),(4| 0x1000),(8| 0x0000),(5| 0x0000),(7| 0x1000),(6| 0x0000),
                        ( 9| 0x1000),(7| 0x0000),(6| 0x0000),(4| 0x0000),(1| 0x0000),(3| 0x0000),(8| 0x0000),(5| 0x0000),(2| 0x1000),
                        ( 8| 0x1000),(2| 0x0000),(1| 0x0000),(6| 0x1000),(7| 0x0000),(5| 0x1000),(3| 0x0000),(4| 0x0000),(9| 0x1000),
                        ( 4| 0x0000),(3| 0x1000),(5| 0x1000),(8| 0x0000),(9| 0x0000),(2| 0x0000),(1| 0x1000),(6| 0x1000),(7| 0x0000)
                    ]
                ]
        };



    this._DEF={x:9,y:9,ROW:9,COL:9,TOTAL:81,BASECOUNT:9,BIT0001:0x00000001};
    this._Data_Save_Result  = [
        -1,-1,-1,-1,-1,-1,-1,-1,-1,        -1,-1,-1,-1,-1,-1,-1,-1,-1,        -1,-1,-1,-1,-1,-1,-1,-1,-1,
        -1,-1,-1,-1,-1,-1,-1,-1,-1,        -1,-1,-1,-1,-1,-1,-1,-1,-1,        -1,-1,-1,-1,-1,-1,-1,-1,-1,
        -1,-1,-1,-1,-1,-1,-1,-1,-1,        -1,-1,-1,-1,-1,-1,-1,-1,-1,        -1,-1,-1,-1,-1,-1,-1,-1,-1];


    this._Data_Base               			= [1,2,3,4,5,6,7,8,9];
    this._int_Count_Error   				=  0;
    this._int_Hidden_Number 				= 40;
    this._Arrangement_Rule_Data 			= new Array(this._DEF.TOTAL);
    this.Make__Arrangement_Rule_Data();
}
_Object_SUDOKU.prototype.CreateNew=function(level)
{
    this.Level= level;
    this.Mix_Sudoku_Data();
    this.Mix_Number_Data();
//	this.Mix_Position_Data();
};
_Object_SUDOKU.prototype.Make__Arrangement_Rule_Data =function()
{
    for(var i= 0; i < this._DEF.TOTAL; i ++)
    {
        this._Arrangement_Rule_Data[i]  = new Array();
        var tempROW  = Math.floor(i % this._DEF.ROW);
        var tempCOL  = Math.floor(i / this._DEF.COL);
        var tempROW1 = Math.floor(tempROW / 3)*3;
        var tempCOL1 = Math.floor(tempCOL / 3)*3;

        for(var j = 0;  j < 9 ; j ++) // row
        {
            if(!((j>=tempROW1) && (j < (tempROW1+3))))
            {
                this._Arrangement_Rule_Data[i].push(j + tempCOL*9);
            }
        }
        for(var j = 0;  j < 9 ; j ++) // column
        {
            if(!((j>=tempCOL1) && (j < (tempCOL1+3)))) this._Arrangement_Rule_Data[i].push(j*9 + tempROW);
        }
        for(var j = 0 ; j < 3 ; j ++)
        {
            this._Arrangement_Rule_Data[i].push(tempROW1 + tempCOL1*9+0+j*9);
            this._Arrangement_Rule_Data[i].push(tempROW1 + tempCOL1*9+1+j*9);
            this._Arrangement_Rule_Data[i].push(tempROW1 + tempCOL1*9+2+j*9);
        }
    }
};

_Object_SUDOKU.prototype.Mix_Sudoku_Data =function()
{
    var temporg        = new Array();
    var C 	 	      = Math.floor(Math.random() * (_DEFINE.SUDOKUBASECOUNT-1));
    C ++;
    this.LevelChoice[this.Level] += C;
    this.LevelChoice[this.Level] %= _DEFINE.SUDOKUBASECOUNT;
    var MixArray  = [0,1,2,3,4,5,6,7,8];
    for(var i = 0 ; i < 81 ; i ++)
    {
        temporg[i] = this._Data_Org[this.Level][this.LevelChoice[this.Level]][i];
    }
    var _Mix_Base = function()
    {
        for(var i = 0 ; i < 9 ; i += 3)
        {
            for(var j = 0 ; j < 3 ; j ++)
            {
                var A 	 	      = Math.floor(Math.random() * 3);
                var B     	 	  = MixArray[i + j];
                MixArray[i+j]	  = MixArray[i + A];
                MixArray[i+A]     = B;
            }
        }
    };
    _Mix_Base();
    for(var i = 0 ; i < 9 ; i ++)
    {
        for(var j = 0 ; j < 9 ; j ++)
        {
            var source = Math.floor(i + j * 9);
            var target = Math.floor(MixArray[i] + j* 9);

            var A 			= temporg[target];
            temporg[target] = temporg[source];
            temporg[source] = A;


        }
    }
    _Mix_Base();
    for(var i = 0 ; i < 9 ; i ++)
    {
        for(var j = 0 ; j < 9 ; j ++)
        {
            var source = Math.floor(i * 9 + j);
            var target = Math.floor(MixArray[i] * 9 + j);

            var A 			= temporg[target];
            temporg[target] = temporg[source];
            temporg[source] = A;


        }
    }
    this._int_Count_Error = 0;

    for(var i = 0 ; i < 81 ; i ++)	{		this._Data_Save_Result[i] = temporg[i];	}
};
_Object_SUDOKU.prototype.Mix_Number_Data =function()
{

    for(var i = 0 ; i < 9 ; i ++)
    {
        var C    = Math.floor(Math.random() * 9);
        var temp = this._Data_Base[i];
        this._Data_Base[i] = this._Data_Base[C];
        this._Data_Base[C] = temp;
    }
    for(var i = 0 ; i < 81 ; i ++)
    {
        switch(this._Data_Save_Result[i])
        {
            case ( 9| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[8]| 0x1000) ;	break;
            case 9:		    	this._Data_Save_Result[i] =  this._Data_Base[8];		    	break;

            case ( 8| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[7]| 0x1000);	break;
            case 8:				this._Data_Save_Result[i] = this._Data_Base[7];			break;

            case ( 7| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[6]| 0x1000);	break;
            case 7:				this._Data_Save_Result[i] = this._Data_Base[6];			break;

            case ( 6| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[5]| 0x1000);	break;
            case 6:				this._Data_Save_Result[i] = this._Data_Base[5];			break;

            case ( 5| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[4]| 0x1000);	break;
            case 5:				this._Data_Save_Result[i] = this._Data_Base[4];			break;

            case ( 4| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[3]| 0x1000);	break;
            case 4:				this._Data_Save_Result[i] = this._Data_Base[3] ;			break;

            case ( 3| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[2]| 0x1000);	break;
            case 3:				this._Data_Save_Result[i] = this._Data_Base[2];			break;

            case ( 2| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[1]| 0x1000);	break;
            case 2:				this._Data_Save_Result[i] = this._Data_Base[1];			break;

            case ( 1| 0x1000):	this._Data_Save_Result[i] = (this._Data_Base[0]| 0x1000);	break;
            case 1:				this._Data_Save_Result[i] =  this._Data_Base[0];			break;
            default:
                break;
        }
    }

};
_Object_SUDOKU.prototype.Mix_Position_Data =function()
{
    var MixArray = [0,3,6];
    var Tempvalue = new Array();

    for(var i = 0 ; i < 81 ; i ++)	{ Tempvalue[i] = this._Data_Save_Result[i];	}

    var _Mix_Base = function()
    {
        for(var i = 0 ; i < 3 ; i ++)
        {
            var A 	 	      = Math.floor(Math.random() * 3);
            var B     	 	  = MixArray[i];
            MixArray[i]	      = MixArray[A];
            MixArray[A]       = B;
        }
    };
    _Mix_Base();

    for(var i = 0 ; i < 3  ; i ++)
    {
        for(var j = 0 ; j < 9  ; j ++)
        {
            Tempvalue[i] = this._Data_Save_Result[MixArray[i]+ j*9];
            Tempvalue[i] = this._Data_Save_Result[MixArray[i]+ j*9+ 1];
            Tempvalue[i] = this._Data_Save_Result[MixArray[i]+ j*9+ 2];
        }
    }

    for(var i = 0 ; i < 81 ; i ++)	{		this._Data_Save_Result[i] = Tempvalue[i];	}
};

_Object_SUDOKU.prototype.check_sum =function()
{
    var sum1 = 0;
    var sum2 = 0;
    this._int_Count_Error = 0;
    for(var i = 0 ; i < 81 ; i ++)
    {
        this._Data_Save_Result[i] = this._Data_Org[0][i];
    }
    for(var i = 0 ; i < 9 ; i ++)
    {
        for(var j = 0; j < 9 ; j ++)
        {
            sum1 += this._Data_Save_Result[j + (i * 9)];
            sum2 += this._Data_Save_Result[(j*9)+i];
        }
        if(sum1 != 45)
        {
            this._int_Count_Error ++;
        }
        if(sum2 != 45)
        {
            this._int_Count_Error ++;
        }
        sum1 = 0;
        sum2 = 0;
    }
};

Define = function () {};
Enum = function () {};


Enum.SERVICE_CODE = {
    MOVI_KR : 0,
    MOVI_JP : 1,
    YAHOO : 2,
    NAVER : 3
};

Enum.MOVI_STATE = {
    PreLoader : 0,
    Menu : 1,
    Game : 2
};

Enum.DEVICE_STATE = {
    PC : 0,
    IOS : 1,
    ANDROID : 2
};

Enum.LANGUAGE = {
    KR : 0,
    JP : 1,
    EN : 2,
};

/*
1	상하이타운
2	펭귄 대쉬
3	네오 2048
4	상하이쉐프
5	스페이스버블
6	네코닌자
7	좀비건
8	코스믹팝
9	네코팡
10	모미모미
11	요괴파티
12	라이벌레이싱
13	트레져 아일랜드(슬롯01)
14	창업신화
15	쥬얼리 스타(슬롯02)
16	IKON틀린그림찾기
17	"스위트블릭스
(벽돌깨기)"
18	다루마
20	"몬스터크로니클
(드래곤마스터)"
 */

Define.staticWidth  = window.innerWidth;
Define.staticHeight = window.innerHeight;

Define.LANDSCAPE = false;

Define.GIDX = 18;       // 다루마
Define.SAVE_VER = 1;    // 세이브버젼
Define.IMG_VER = 1;     // 이미지 버젼
Define.SND_VER = 1;     // 사운드 버젼
Define.SPINE_VER = 1;	// 스파인 버젼
Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR; // 접속경로를 설정한다.
Define.strGamePath = "";    // 게임url을 셋팅한다. : 야후에 런칭할때 필요함
Define.DEVICE = Enum.DEVICE_STATE.PC;
Define.LANGUAGE = Enum.LANGUAGE.KR;

var SudokuEngine = new _Object_SUDOKU();
var PhaserGame = null;

window.onload = function() {
    PhaserGame = new Phaser.Game(_Config);

    PhaserGame.clearBeforeRender = true;
    PhaserGame.forceSingleUpdate = true;
    PhaserGame.preserveDrawingBuffer = true;
    PhaserGame.lockRender = false;

    PhaserGame.state.add("Boot", Boot);
    PhaserGame.state.add("Preloader", Preloader);
    PhaserGame.state.add("Menu", Menu);
    PhaserGame.state.add("Level", Level);
    PhaserGame.state.start("Boot");
};


// -- user code here --
//new code
/* --- start generated code --- */
// Generated by  1.4.4 (Phaser v2.6.2)

/**
 * Boot.
 */
function Boot() {
    Phaser.State.call(this);
}

/** @type Phaser.State */
var Boot_proto = Object.create(Phaser.State.prototype);
Boot.prototype = Boot_proto;
Boot.prototype.constructor = Boot;

Boot.prototype.init = function () {

    console.log(_DEFINE.VERSION);
    this.firstPortrait = false;
    this.firstLandScape = false;
    this.callReSize     = null;
    this.game.stage.disableVisibilityChange = false;
    this.initScreenSize();

};
Boot.prototype.preload = function () {

    this.load.pack('boot', 'assets/pack.json');
};
Boot.prototype.create = function () {
    this.game.plugin = 	this.game.plugins.add(PhaserSpine.SpinePlugin);

};
/* --- end generated code --- */
// -- user code here --
Boot.prototype.update = function(){

    if(this.load.cache.checkImageKey('backtile') 		== true)
        if(this.load.cache.checkImageKey('rotate') 		== true)
            if(this.load.cache.checkImageKey('movi_game') 	== true)
                if(this.load.cache.checkImageKey('loadback') 	== true)
                    if(this.load.cache.checkImageKey('Loading_banner') 	== true)
                        if(this.load.cache.checkImageKey('loadprocess') == true)
                        {
                            this.game.state.start("Preloader");
                        }
};
Boot.prototype.initScreenSize= function(){

    var that = this;
    this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    this.firstPortrait  = Define.LANDSCAPE;
    this.firstLandScape = !Define.LANDSCAPE;

    if (this.game.device.desktop) {

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;    //축소확대 비율유지
        this.game.pageAlignHorizontally = false;//game.stage.scale.pageAlignHorizontally = true;
        this.game.pageAlignVertically = false;//game.stage.scale.pageAlignVertically = true;
        this.game.scale.parentIsWindow = true;//지우니간 폭만 맞고 길이가 길어지는 화면이 됨
    }
    else {
        var landscape = false;
        this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

        if(window.orientation !== undefined)
        {
            if(window.orientation === 0)
            {
                landscape = false;
            }
            else
                landscape = true;
        }
        else
        {
            if(Define.staticWidth < Define.staticHeight)
            {
                landscape = false;
            }else
            {
                landscape=  true;//this.game.scale.forceLandscape;
            }
        }


        var ratio_w = parseFloat(Define.staticWidth / this.game.width);
        var ratio_h = parseFloat(Define.staticHeight / this.game.height);

        if (landscape === true) {
            document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "block" : "none";
            this.firstLandScape = true;
        }
        else {
            document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "none" : "block";
            this.firstPortrait = true;
        }
        this.game.scale.setUserScale(ratio_w, ratio_h);
    }

    window.addEventListener("orientationchange", function() {
        that.reScreenSize();

    });
    this.game.scale.setResizeCallback(function(scale, parentBounds) {
        // that.reScreenSize();
    });

},
    Boot.prototype.callBackReSize = function (callback) {

        this.callReSize = function()
        {
            if(callback !== undefined)   callback(this.isLandscape);
        };
    },

    Boot.prototype.reScreenSize = function () {
        var landscape = false;
        if(!this.game.device.desktop){// && !this.game.device.iOS) {
            //일반적인 안드로이드
            if(window.orientation !== undefined)
            {
                if(window.orientation === 0)
                {
                    landscape = false;
                }
                else
                    landscape = true;
            }
            else
            {
                if(window.innerWidth < window.innerHeight)
                {
                    landscape = false;
                }else
                {
                    landscape=  true;//this.game.scale.forceLandscape;
                }
            }
            var ratio_w = parseFloat(Define.staticWidth / this.game.width);
            var ratio_h = parseFloat(Define.staticHeight / this.game.height);
            if (landscape === false) {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "none" : "block";
                if(this.firstPortrait === false)
                {
                    location.reload();
                }
                if(Define.LANDSCAPE === true)
                    this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height));
                else
                    this.game.scale.setUserScale(ratio_w, ratio_h);
            }
            else {
                document.getElementById("turn").style.display = Define.LANDSCAPE === false ? "block" : "none";
                if(this.firstLandScape === false)
                {
                    location.reload();
                }
                if(Define.LANDSCAPE === false)
                    this.game.scale.setUserScale(parseFloat(Define.staticHeight / this.game.width), parseFloat(Define.staticWidth / this.game.height));
                else
                    this.game.scale.setUserScale(ratio_w, ratio_h);

            }
        }
        this.game.scale.refresh();
        if(this.callReSize !== null)
            this.callReSize(landscape);
    };

Boot.prototype.Initialize = function()
{
    // 디바이스 구분.
    if (/Android/i.test(navigator.userAgent))
        Define.DEVICE = Enum.DEVICE_STATE.ANDROID;
    else if (/iPhone|iPad|iPod/i.test(navigator.userAgent))
        Define.DEVICE = Enum.DEVICE_STATE.IOS;
    else
        Define.DEVICE = Enum.DEVICE_STATE.PC;

    // 접속경로 구분.
    if(document.location.href.indexOf('game.jp') > -1)
        Define.SERVICE = Enum.SERVICE_CODE.MOVI_JP;
    else if(document.location.href.indexOf('yahoo-net.jp') > -1)
        Define.SERVICE = Enum.SERVICE_CODE.YAHOO;
    else if(document.location.href.indexOf('naver.com') > -1)
        Define.SERVICE = Enum.SERVICE_CODE.NAVER;
    else
        Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR;
    // Prevent certain keys from propagating to the browser:
    var arrPreventedKeys = [
        Phaser.Keyboard.SPACEBAR,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT
    ];
    this.game.input.keyboard.addKeyCapture(arrPreventedKeys);
    this.networkManager = NetworkManager(this.getServiceString(), function() { });
};



// -- user code here --
// user
//var textload;
//var g_group;
/* --- start generated code --- */

// Generated by Phaser Editor 1.4.3 (Phaser v2.6.2)


/**
 * Preloader.
 */
function Preloader() {

    Phaser.State.call(this);

}

/** @type Phaser.State */
var Preloader_proto = Object.create(Phaser.State.prototype);
Preloader.prototype = Preloader_proto;
Preloader.prototype.constructor = Preloader;

Preloader.prototype.init = function () {

};
Preloader.prototype.preload = function () {

    this.load.spine("Title_spine","assets/titlespine/sudoku_title.json");
    this.load.spine("CheckBtn_spine","assets/titlespine/btn_check_ani.json");

    this.load.pack('preloader', 'assets/pack.json');

    this.fGroup = this.add.group();
    this.fmovi_backtile = this.add.sprite(0, 0, 'backtile', null, this.fGroup);
    this.fmovi_backtile.scale.setTo(25,40);
    this.fmovi_game = this.add.sprite(360, 655, 'movi_game', null, this.fGroup);
    this.fmovi_game.anchor.setTo(0.5, 0.5);
    this.fmovi_banner = this.add.sprite(0, 1180, 'Loading_banner', null, this.fGroup);
    this.fback        = this.add.sprite(250, 360, 'loadback', null, this.fGroup);
    this.floadprocess = this.add.sprite(250, 360, 'loadprocess', null, this.fGroup);

    this.fText = this.add.text(360, 720, '1%', {"font":"bold 32px","fill":"#2E85ED","align":"center"}, this.fGroup);
    this.fText.pivot.setTo(0.5, 0.5);
    this.fText.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(this.floadprocess, 0);


    this.fFileComplete = this.load.onFileComplete.add(this.fileComplete,this);
    this.fLoadComplete=  this.load.onLoadComplete.add(this.loadEnd,this);
};

Preloader.prototype.create = function () {

};
/* --- end generated code --- */
// -- user code here --
Preloader.prototype.doinit = function()
{
};
Preloader.prototype.fileComplete = function(progress, cacheKey, success, totalLoaded, totalFiles)
{
    this.fText.setText(progress + "%");
};
Preloader.prototype.loadEnd = function()
{
    _FX.Load(this.game);
    this.game.clearBeforeRender = false;
    this.fFileComplete.detach();
    this.fLoadComplete.detach();
    this.fmovi_game.destroy(true, true);
    this.fmovi_banner.destroy(true, true);
    this.fback.destroy(true, true);
    this.floadprocess.destroy(true, true);
    this.game.state.start("Menu");
};


// -- user code here --
function _Class_SelectManager()
{
    this.Group;
    this.Btn;
    this.BtnHelp;
}
/* --- start generated code --- */
// Generated by Phaser Editor 1.4.3 (Phaser v2.6.2)
/**
 * Menu.
 */
function Menu() {

    Phaser.State.call(this);
}
/** @type Phaser.State */
var Menu_proto = Object.create(Phaser.State.prototype);
Menu.prototype = Menu_proto;
Menu.prototype.constructor = Menu;

Menu.prototype.init = function () {

};
Menu.prototype.create = function () {
    // user code
    this.initObjects();
};
/* --- end generated code --- */
Menu.prototype.StartReplay = function() {
    this.fGroup.visible = true;
};
Menu.prototype.initObjects = function() {
    // public fields
    this.Helpprefab     = null;
    this.tutorialwindow = null;
    this.s_Select  		= new Array(3);
    for(var i = 0; i < 3; i ++)this.s_Select[i] = new _Class_SelectManager();
    this.DEF=
        {
            SelectImage:
                {
                    BTNNAME:["EASY","NORMAL","HARD"],
                    BTNHELPNAME:["helpeasy","helpnormal","helphard"],
                    PosX:110, StartY:250, Step: 270,
                    '0':'panel_level_easy', '1':'panel_level_normal', '2':'panel_level_hard' , 'key':'data01'
                },
        };

    this.initGroup();
    this.fGroupBtn.position.setTo(620,50);

    this.fBtn_tutorial = this.add.button(-50, 0, 'btn_icon', this.OnClickChangeWindow, this, null, 3, null, null,this.fGroupBtn);
    this.fBtn_tutorial.name = 'window_tutorial_title';
    this.fBtn_tutorial.anchor.setTo(0.5, 0.5);
    this.fBtn_tutorial.onInputDown.add(_BTN.ANI1, this);
    this.fBtn_tutorial.scale.setTo(0);

    this.fBtn_sound = this.add.button(50, 0, 'btn_icon', this.OnClickSound , this, null, 2, null, null,this.fGroupBtn);
    this.fBtn_sound.anchor.setTo(0.5, 0.5);
    this.fBtn_sound.scale.setTo(0);

    this.fGroupSelect.visible = false;
    this.Register_GroupBack();

    this.initTutorial();
    this.initSelect();

    if(_UserInfo.PlayRetry == true)
    {

        //this.fText_copyright.visible = false;

        this.tutorialwindow.setName("window_tutorial_select");

        this.fBtn_tutorial.name    ="window_tutorial_select";
        this.fGroupSelect.alpha = 0;
        this.game.add.tween(this.fGroupSelect).to({	alpha : 1}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
        this.tutorialwindow.position.x = 1080;
        this.fGroupTitle.position.x    = -720;
        this.fGroupTitle.visible = false;
        this.tutorialwindow.visible = false;
        this.fGroupSelect.position.x   = 0;
        this.fGroupSelect.visible      = true;
    }
    else
    {
        this.initTitle();
    }
    this.LoadUserInfo();
    // button on
    this.game.add.tween(this.fBtn_sound.scale).to({	x:1,y:1}, 300, Phaser.Easing.Elastic.Out, true, 800, 0, false);
    this.game.add.tween(this.fBtn_tutorial.scale).to({	x:1,y:1}, 300, Phaser.Easing.Elastic.Out, true, 800, 0, false);

};
//,Phaser.Easing.Elastic.InSine

Menu.prototype.OffBtn = function()
{
    this.fBtn_sound.visible = false;
    this.fBtn_tutorial.visible = false;
};
Menu.prototype.OnBtn2 = function(temp)
{
    this.fBtn_tutorial.visible = true;
    this.fBtn_sound.visible = true;

    this.fBtn_tutorial.scale.setTo(0);
    this.fBtn_sound.scale.setTo(0);

    this.game.add.tween(this.fBtn_sound.scale).to({	x:1,y:1}, 300, Phaser.Easing.Elastic.Out, true, 300, 0, false);
    this.game.add.tween(this.fBtn_tutorial.scale).to({	x:1,y:1}, 300, Phaser.Easing.Elastic.Out, true, 300, 0, false);
};
Menu.prototype.LoadUserInfo = function()
{
    _UserInfo.TotalStar       = 0;
    _UserInfo.Grade           = 0;
    _UserInfo.Nowlevel        = 0;
    _UserInfo.Time            = 0;
    Storage.Start();

    if(_UserInfo.Sound == 'false')
    {
        if(_FX.enable = true)		_FX.Toggle(0, this.fBtn_sound);
    }
    this.initSound();
};
Menu.prototype.initGroup = function()
{
    this.fGroup       = this.add.group();
    this.fGroupBack   = this.add.group(this.fGroup);
    this.fGroupTitle  = this.add.group(this.fGroup);
    this.fGroupBtn    = this.add.group(this.fGroup);
    this.fGroupSelect = this.add.group(this.fGroup);
    this.fGroupSelect.position.setTo(720, 60);
    this.fGroupTitle.pivot.setTo(0.5, 0.5);
};
Menu.prototype.Register_GroupBack = function() {

    this.fTitle_bg = this.add.sprite(360, 640, 'data03', 'title_bg', this.fGroupBack);
    this.fTitle_bg.scale.setTo(2.0, 2.0);
    this.fTitle_bg.anchor.setTo(0.5, 0.5);

    this.UserInfo = new Window_User(this.game, this.fGroupBack );
    this.UserInfo.position.setTo(10,10);
    this.UserInfo.visible = true;
};
Menu.prototype.UserInfoOnOff = function() {

    var tween1 = this.game.add.tween(this.UserInfo.position).to({y : -200}, 200, Phaser.Easing.Linear.None, false, 0);
    var tween2 = this.game.add.tween(this.UserInfo.position).to({y : 10}, 200, Phaser.Easing.Linear.None,   false, 200);
    tween1.chain(tween2);
    tween1.start();
};
Menu.prototype.initSelect = function() {

    var tempspr;
    var temptext;
    var veticalValue = 147;
    tempspr = this.add.sprite(360, 600, 'popup_tutorial', null, this.fGroupSelect);
    tempspr.anchor.setTo(0.5, 0.5);

    temptext = this.game.add.sprite(360, 132,'data02', 'text_select_en', this.fGroupSelect);
    temptext.anchor.setTo(0.5);

    for(var i = 0; i < 3; i ++)
    {
        this.s_Select[i].Group =  this.add.group(this.fGroupSelect);
        this.s_Select[i].Group.position.setTo(this.DEF.SelectImage.PosX,this.DEF.SelectImage.Step *i + this.DEF.SelectImage.StartY);

        this.add.tileSprite(0,0,502, 254, this.DEF.SelectImage.key,this.DEF.SelectImage[i],this.s_Select[i].Group);

        this.s_Select[i].Btn = this.add.button(386, 170, 'btn_select', this.OnClickStartgame, this, null, i, null, null, this.s_Select[i].Group);
        this.s_Select[i].Btn.name = this.DEF.SelectImage.BTNNAME[i];
        this.s_Select[i].Btn.anchor.setTo(0.5);

        this.s_Select[i].BtnHelp= this.add.button(436, 57, 'data01', this.OnClickHelp, this, null, 'btn_info', null, null, this.s_Select[i].Group);
        this.s_Select[i].BtnHelp.name = this.DEF.SelectImage.BTNHELPNAME[i];
        this.s_Select[i].BtnHelp.anchor.setTo(0.5);


        temptext = this.add.sprite(246, 58, "data02",_IMAGE_LOCALIZING.TEXT_SELECT_TITLE[i],this.s_Select[i].Group);
        temptext.anchor.setTo(0.5);

        veticalValue = 147;

        tempspr = this.add.sprite( 35, veticalValue,"data02","text_reward_en", this.s_Select[i].Group);
        tempspr.anchor.setTo(0,0.5);

        tempspr = this.add.sprite(180, veticalValue, 'data01', 'star', this.s_Select[i].Group);
        tempspr.anchor.setTo(0.5,0.5);
        tempspr.scale.setTo(0.7, 0.7);

        var style = { font: "bold 26px", fill: "#602e0d",stroke:"#602e0d", strokeThickness:1},
            temptext = this.add.text(270, veticalValue +2, _BONUS_OBTAIN[i][2]+"~"+ _BONUS_OBTAIN[i][0], style ,this.s_Select[i].Group);
        temptext.anchor.setTo(1,0.5);

        veticalValue = 195;
        var Sec = Math.floor(_UserInfo.Besttime[i] % 60);
        var Min = Math.floor(_UserInfo.Besttime[i] / 60);
//		Min = 90*i;
        var formattedNumber = ("0" + Sec).slice(-2);
        var text = Min + ":"+formattedNumber;
        temptext = this.add.text(270, veticalValue+2, text,FontStyle.BEST, this.s_Select[i].Group);
        temptext.anchor.setTo(1,0.5);




        tempspr = this.add.sprite( 35, veticalValue,"data02","text_best_en",  this.s_Select[i].Group);
        tempspr.anchor.setTo(0,0.5);

        tempspr = this.add.sprite( 160, veticalValue,"data01","trophy_2",  this.s_Select[i].Group);
        tempspr.anchor.setTo(0.5,0.5);
        tempspr.scale.setTo(0.85, 0.85);


        this.s_Select[i].BtnHelp.onInputDown.add(_BTN.ANI1, this);
    }
};

Menu.prototype.initSound = function() {
    _FX.Stop();
    _FX.Firststart();
};

Menu.prototype.Close_Turtorial = function(spr)
{
    this.OnClickChangeWindow(spr);
};
Menu.prototype.initTutorial = function()
{
    this.tutorialwindow = new Window_Tutorial(this.game,this);
    this.tutorialwindow.position.setTo(1080, 660);
    this.tutorialwindow.visible = false;
};
Menu.prototype.initTitle = function()
{
    //this.fText_copyright = this.add.text(360, 1275, 'Copyright ⓒ2018 Game Corp. All rights reserved\n',{ font: "bold 24px", fill: "#602e0d"});
    //this.fText_copyright.anchor.setTo(0.5);

    this.fText_mystar = this.add.text(0, 3, _UserInfo.TotalStar,FontStyle.C8);
    this.fText_mystar.anchor.setTo(0.5);
    this.fText_mystar.pivot.setTo(0,0.5);

    this.fText_mylevel = this.add.text(0, 3, _BONUS_OBTAIN.GRADE[_UserInfo.Grade],FontStyle.C8);
    this.fText_mylevel.anchor.setTo(0.5);

    this.fMy_grade = this.add.tileSprite(0, 0, 38, 46, 'grade', _UserInfo.Grade);
    this.fMy_grade.anchor.setTo(0.5, 0.5);


    this.fBtn_select = this.add.button(0, 0, 'data01', this.OnClickChangeWindow, this, null, 'btn_start', null, null);
    this.fBtn_select.name = 'window_title';
    this.fBtn_select.anchor.setTo(0.5, 0.5);

    this.fSpine_Title = this.game.add.spine(360,640,"Title_spine");
    this.fGroupTitle.add(this.fSpine_Title);
    //this.fGroupTitle.add(this.fText_copyright);


    var index         = this.fSpine_Title.skeleton.findSlotIndex("btn_start");
    var slotcontainer = this.fSpine_Title.slotContainers[index];
    slotcontainer.addChild(this.fBtn_select);

    var index         = this.fSpine_Title.skeleton.findSlotIndex("banner");
    var slotcontainer = this.fSpine_Title.slotContainers[index];
    slotcontainer.addChild(this.fMy_grade);

    var index         = this.fSpine_Title.skeleton.findSlotIndex("text_star_count");
    var slotcontainer = this.fSpine_Title.slotContainers[index];
    slotcontainer.addChild(this.fText_mystar);

    var index         = this.fSpine_Title.skeleton.findSlotIndex("text_banner_color");
    var slotcontainer = this.fSpine_Title.slotContainers[index];
    slotcontainer.addChild(this.fText_mylevel);

    this.fSpine_Title.setAnimationByName(0,"title_in",false);
    this.fSpine_Title.addAnimationByName(0,"title_idle",true);
    this.add.sprite(30, 30, 'data02', 'all', this.fGroupTitle);
};

Menu.prototype.DestoryHelpprefab = function() {
    if (this.Helpprefab != null) {
        this.Helpprefab.destroy();
        this.Helpprefab = null;
    }
};

Menu.prototype.OnClickSound = function(Sprite) {
    _FX.Toggle(0, Sprite);
};

Menu.prototype.ClearState = function()
{
    this.DestoryHelpprefab();
    this.Helpprefab     = null;
    this.tutorialwindow.destroy();
    this.tutorialwindow = null;

    this.UserInfo.destroy();

    this.Helpprefab     = null;
    this.fGroupBack.removeAll(true);
    this.fGroupTitle.removeAll(true);
    this.fGroupBtn.removeAll(true);
    this.fMy_grade.destroy(true,true);
    this.fBtn_select.destroy();
    this.fGroupSelect.removeAll(true);
    for(var i = 0; i < 3; i ++)
    {
        this.s_Select[i].Group.destroy(true);
    }
    this.fGroup.removeAll(true);

};
Menu.prototype.OnClickStartgame = function(Sprite) {

    if (_DEFINE.LEVEL[Sprite.name] != undefined) {
        this.ClearState();
        _UserInfo.Nowlevel = _DEFINE.LEVEL[Sprite.name];
        _FX.Stop();
        _FX.Start(_FX.SE_CLICK);
        this.TitleDestoy();
        this.game.state.start("Level",true);

    }
};
Menu.prototype.OnClickHelp = function(Sprite) {

    var x = 180, y = -300;
    var option = false;
    if (this.Helpprefab != null)
    {
        if(this.Helpprefab.callname == Sprite.name) option = true;
        this.Helpprefab.timeEventRemove();
    }
    if(!option)
    {
        switch (Sprite.name) {
            case 'helpeasy':
                this.Helpprefab = new Dihelp(this.game, this.s_Select[0].Group);
                this.Helpprefab.setText(0);
                this.fBtn_sound.inputEnabled = false;
                break;
            case 'helpnormal':
                this.Helpprefab = new Dihelp(this.game, this.s_Select[1].Group);
                this.Helpprefab.setText(1);
                this.s_Select[0].Btn.inputEnabled = false;
                this.s_Select[0].BtnHelp.inputEnabled = false;
                break;
            case 'helphard':

                this.Helpprefab = new Dihelp(this.game, this.s_Select[2].Group);
                this.Helpprefab.setText(2);
                this.s_Select[1].Btn.inputEnabled = false;
                this.s_Select[1].BtnHelp.inputEnabled = false;
                break;
        }
        this.Helpprefab.callname = Sprite.name;
        this.Helpprefab.position.setTo(x, y);
        this.Helpprefab.onDestroy.add(this.OnDestroyHelp, this);
        this.game.add.tween(this.Helpprefab).to({		y : y + 8	}, 300, Phaser.Easing.Linear.None, true, 300, -1, true);
    }
};

Menu.prototype.OnDestroyHelp = function(object) {
    this.Helpprefab = null;
    this.fBtn_sound.inputEnabled = true;
    this.s_Select[0].Btn.inputEnabled = true;
    this.s_Select[1].Btn.inputEnabled = true;
    this.s_Select[0].BtnHelp.inputEnabled = true;
    this.s_Select[1].BtnHelp.inputEnabled = true;
};
Menu.prototype.OnClickSelect = function(object) {

    this.OpenSelect();
};
Menu.prototype.TitleOff = function()
{
    this.fGroupTitle.visible = false;
};

Menu.prototype.TitleDestoy = function()
{

    //this.fText_copyright.destroy();
    this.fSpine_Title.destroy();
    this.fGroupTitle.removeAll();

    this.fText_mystar = this.add.text(0, 3, _UserInfo.TotalStar,FontStyle.C8);
    this.fText_mystar.anchor.setTo(0.5);
    this.fText_mystar.pivot.setTo(0,0.5);

    this.fText_mylevel = this.add.text(0, 3, _BONUS_OBTAIN.GRADE[_UserInfo.Grade],FontStyle.C8);
    this.fText_mylevel.anchor.setTo(0.5);
    this.fGroupTitle.destroy(true);
};
Menu.prototype.CloseSelect = function()
{
    this.DestoryHelpprefab();
    this.game.add.tween(this.fGroupSelect).to({		x : -720	}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
};
Menu.prototype.CloseTitle = function(option)
{
    this.OffBtn();
    var tween = this.game.add.tween(this.fGroupTitle).to({		x : -800	}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
    if(option == 0)
    {
        tween.onComplete.addOnce(this.TitleOff,this);
    }
};
Menu.prototype.CloseTutorialSelect = function()
{
    this.OffBtn();
    var tween = this.game.add.tween(this.tutorialwindow.position).to({		x : 1080	}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
    tween.onComplete.addOnce(this.Offtutorial,this);
    tween.onComplete.add(this.OnBtn2,this);
};
Menu.prototype.CloseTutorialTitle = function()
{
    this.OffBtn();
    var tween = this.game.add.tween(this.tutorialwindow.position).to({		x : 1080	}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
    tween.onComplete.addOnce(this.Offtutorial,this);
    tween.onComplete.add(this.OnBtn2,this);
};

Menu.prototype.Offtutorial = function()
{
    this.tutorialwindow.visible = false;
};

Menu.prototype.OnUserinfo = function()
{
    this.OnBtn2();
    this.UserInfo.visible = true;
};
Menu.prototype.OffUserinfo = function()
{
    this.UserInfo.visible = false;
};
Menu.prototype.OpenSelect = function()
{
    _FX.Start(_FX.SE_POPUP_ON);
    this.fGroupSelect.visible = true;
    var tween  = this.game.add.tween(this.fGroupSelect).to({	x : 0}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);

    tween.onComplete.addOnce(this.OnEnableButton,this);
    tween.onComplete.add(this.OnUserinfo,this);
};
Menu.prototype.OpenTitle = function() {

    this.fGroupTitle.visible = true;
    var tween = this.game.add.tween(this.fGroupTitle).to({		x : 0	}, 300, Phaser.Easing.Elastic.OutSine, true, 0, 0, false);
    tween.onComplete.addOnce(this.OnEnableButton,this);
    tween.onComplete.add(this.OffUserinfo,this);
};
Menu.prototype.OpenTutorialTitle = function(object) {

    _FX.Start(_FX.SE_POPUP_ON);
    this.tutorialwindow.Reset_Position();
    this.tutorialwindow.visible = true;
    this.tutorialwindow.position.setTo(1080, 660);
    var tween  = this.game.add.tween(this.tutorialwindow.position).to({		x : 360	}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
    tween.onComplete.addOnce(this.OnEnableButton,this);
    tween.onComplete.add(this.OnUserinfo,this);
};
Menu.prototype.OpenTutorialselect = function(object) {
    //1080
    _FX.Start(_FX.SE_POPUP_ON);
    this.OffBtn();
    this.tutorialwindow.Reset_Position();
    this.tutorialwindow.visible = true;
    this.tutorialwindow.position.setTo(1080, 660);
    var tween = this.game.add.tween(this.tutorialwindow.position).to({		x : 360	}, 300, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
    tween.onComplete.addOnce(this.OnEnableButton,this);
    tween.onComplete.add(this.OnUserinfo,this);
};
Menu.prototype.OnEnableButton = function(object) {

    this.buttonaction = true;
};
Menu.prototype.OnClickChangeWindow = function(object) {

    if(this.buttonaction == false)return;
    this.buttonaction = false;
    this.UserInfoOnOff();
    _FX.Start(_FX.SE_CLICK);
    switch(object.name)
    {
        case "window_title":
            this.OpenSelect();
            this.CloseTitle(1);
            this.tutorialwindow.setName("window_tutorial_select");
            this.fBtn_tutorial.name ="window_tutorial_select";
            break;
        case "window_tutorial_title":
            if(this.tutorialwindow.visible == false)
            {
                this.OpenTutorialTitle();
                this.CloseTitle();
            }
            else{

                this.OpenTitle(0);
                this.CloseTutorialTitle();
            }
            break;
        case "window_tutorial_select":
            if(this.tutorialwindow.visible == false)
            {
                this.OpenTutorialselect();
                this.CloseSelect();
            }
            else{

                this.OpenSelect();
                this.CloseTutorialTitle();
            }
            break;
        case "window_select":

            this.tutorialwindow.setName("window_tutorial_select");
            this.fBtn_tutorial.name ="window_tutorial_select";
            this.OpenWindow(_DEFINE.WINDOW.SELECT);
            break;

    }
};


"use strict";
// -- user code here --
var DEF = {
    // PENAL_TIME:10,
    MAINSTEPX : 77,
    MAINSTEPY : 77,
    GAP : 6,
    MIXCOUNT : 10,
    FRAME : {
        BASE : 0,		FIXED : 1,		CEHCK : 0,		NUMBER : 4,		MEMO : 0
    },
    SUDOKU : {
        FIXED : 0,		EMPTY : 1,		MEMO : 2,		WORK : 3	},
    BUTTON : {
        DEFAULT : 0,		CHECK : 1,		MEMO : 2,		DELETE : 3
    },
    SFIXED : 0,	SEMPTY : 1,	SMEMO : 2,	SWORK : 3,	EMPTYNO : 0
};
var FRAME = {
    0 : 1,
    1 : 0,
    2 : 0,
    3 : 1
};
function LINEINFO() {
    this.prefab = null, this.index = 0, this.start = 0, this.end = 0;
}
function _Class_InputManager() {
    this.Group;
    this.Index;
    this.Number;
    this.Btn;
    this.Spr;
}
function _Class_SudokuManager() {
    this.x, this.y, this.Index = 0;
    this.OrignalNo = -1,
        this.No = -1,
        this.Type = DEF.SEMPTY;
    this.SprMemo = [ null, null, null, null, null, null, null, null, null ],
        this.Spr_Back,  this.Spr_W_Box,
        this.W_Box_Count = 0, this.Spr_Effect, this.Spr_No;
    this.BtnIndex;
    this.isButton = false;
}
/* --- start generated code --- */

// Generated by 1.4.4 (Phaser v2.6.2)

/**
 * Level.
 */
function Level() {

    Phaser.State.call(this);

}

/** @type Phaser.State */
var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

Level.prototype.init = function() {
};

Level.prototype.preload = function() {
};
Level.prototype.create = function() {

    this.initObjects();
};

/* --- end generated code --- */
Level.prototype.initGroup = function() {

    _UserInfo.PlayRetry = true;
    this.fGroup_main = this.add.group();
    this.backimage = this.add.sprite(360, 640, 'bg', null, this.fGroup_main);
    this.backimage.anchor.setTo(0.5, 0.5);

    this.fGroup_pause 		= this.add.group();
    this.fGroup_Sudoku 		= this.add.group(this.fGroup_main);
    this.fGroup_Button 		= this.add.group(this.fGroup_main);
    this.fGroup_Input 		= this.add.group(this.fGroup_main);
    this.fGroup_notice 		= this.add.group(this.fGroup_main);
    this.fGroup_Game     	= this.add.group(this.fGroup_Sudoku);
    this.fGroup_GameNumber 	= this.add.group(this.fGroup_Sudoku);
    this.fGroup_Memo 		= this.add.group(this.fGroup_Button);
    this.fGroup_Delete 		= this.add.group(this.fGroup_Button);
    this.fGroup_Check 		= this.add.group(this.fGroup_Button);

    this.fNowNoBtn = null;

    this.fGroup_notice.position.setTo(0, 470);
    this.fGroup_pause.position.setTo(0, 100);
    this.fGroup_Input.position.setTo(110, 960);
    this.fGroup_Sudoku.position.setTo(46, 191);
    this.fGroup_Button.position.setTo(450, 960);

    this.fSpine_Check = this.game.add.spine(0, 0, "CheckBtn_spine");
    this.fSpine_Check.position.setTo(550, 1200);
    this.fGroup_Spine = this.add.group(this.fGroup_main);

    this.f_onpuase = this.game.onPause.add(this.OnPause, this);
    this.f_onresume = this.game.onResume.add(this.OnResume, this);

};
Level.prototype.OnPause = function() {
    if (this.fGroup_pause.visible == false) {
        if (this.fboolResult == false)
            this.fGroup_GameNumber.visible = false;
    }
};
Level.prototype.OnResume = function() {
    if (!this.fGroup_pause.visible == true) {
        if (this.fboolResult == false)
            this.fGroup_GameNumber.visible = true;
    }
};
Level.prototype.initCheckButton = function() {
    this.fBtn_check = this.add.button(100, 250, 'data01', null, this, null,	'btn_off', null, null, this.fGroup_Check);
    this.fBtn_check.anchor.setTo(0.5, 0.5);
    this.fBtn_check.onInputDown.add(this.OnClickCheck, this);
    this.fBtn_check.onInputDown.add(_BTN.ANI3, this);
    this.add.sprite(30, 250, 'data01', 'check', this.fGroup_Check).anchor.setTo(0.5, 0.5);
    this.add.sprite(130, 250, 'data01', 'text_check', this.fGroup_Check).anchor.setTo(0.5, 0.5);

};
Level.prototype.initDeleteButton = function() {
    this.fBtn_delete = this.add.button(100, 125, 'data01', null, this, null,'btn_off', null, null, this.fGroup_Delete);
    this.fBtn_delete.onInputDown.add(this.OnClickDelete, this);
    this.fBtn_delete.onInputDown.add(_BTN.ANI3, this);
    this.fBtn_delete.name = 'btndelete';
    this.fBtn_delete.anchor.setTo(0.5, 0.5);
    this.add.sprite(30, 125, 'data01', 'delete', this.fGroup_Delete).anchor.setTo(0.5, 0.5);
    this.add.sprite(130, 125, 'data01', 'text_delete', this.fGroup_Delete).anchor.setTo(0.5, 0.5);
};
Level.prototype.initMemoButton = function() {
    this.fBtn_memo = this.add.button(100, 0, 'data01', null, this, 'btn_off','btn_off', 'btn_off', 'btn_off', this.fGroup_Memo);
    this.fBtn_memo.onInputDown.add(this.OnClickMemo, this);
    this.fBtn_memo.onInputDown.add(_BTN.ANI3, this);
    this.fBtn_memo.name = 'memobutton';
    this.fBtn_memo.anchor.setTo(0.5, 0.5);
    this.add.sprite(30, 0, 'data01', 'memo', this.fGroup_Memo).anchor.setTo(0.5);
    this.add.sprite(130, 0, 'data01', 'text_memo', this.fGroup_Memo).anchor.setTo(0.5);
};
Level.prototype.initPause = function() {
    var spr;
    this.fBtn_pause = this.add.button(620, -130, 'data01', this.OnClickPause,this, null, 'btn_pause', null, null, this.fGroup_Game);
    this.fBtn_pause.pivot.setTo(0.5, 0.5);
    this.fBtn_pause.anchor.setTo(0.5, 0.5);

    spr = this.add.sprite(360, 330, 'data03', 'popup_pause', this.fGroup_pause);
    spr.anchor.setTo(0.5, 0.0);

    this.fBtn_sound = this.add.button(584, 235, 'btn_icon', this.OnClicksound,this, null, 2, null, null, this.fGroup_pause);
    this.fBtn_sound.anchor.setTo(0.5, 0.5);

    this.fBtn_Tutorial = this.add.button(475, 235, 'btn_icon',this.OnClickTutorial, this, null, 3, null, null, this.fGroup_pause);
    this.fBtn_Tutorial.anchor.setTo(0.5, 0.5);

    this.fBtn_giveup = this.add.button(361, 591, 'data01', this.OnClickgiveup,this, null, 'btn_giveup', null, null, this.fGroup_pause);
    this.fBtn_giveup.anchor.setTo(0.5, 0.5);

    this.fBtn_continue = this.add.button(359, 446, 'data01',this.OnClickExitpause, this, null, 'btn_continue', null, null,
        this.fGroup_pause);
    this.fBtn_continue.anchor.setTo(0.5, 0.5);
    var _text_continue = this.add.sprite(357, 447, 'data02', 'text_back_en',this.fGroup_pause);
    _text_continue.anchor.setTo(0.5, 0.5);
    var _text_giveup = this.add.sprite(358, 590, 'data02', 'text_quit_en',	this.fGroup_pause);
    _text_giveup.anchor.setTo(0.5, 0.5);
    // public fields
    this.fBtn_pause.inputEnabled = false;

    this.fBtn_continue.onInputDown.add(_BTN.ANI4, this);
    this.fBtn_giveup.onInputDown.add(_BTN.ANI4, this);
    this.fBtn_Tutorial.onInputDown.add(_BTN.ANI4, this);

};
Level.prototype.initNobutton = function() {
    for (var i = 0; i < 9; i++) {
        var QUO_3 = Math.floor(i % 3) * 120;
        var DIV_3 = Math.floor(i / 3) * 120;
        this.NumberInput[i].Group = this.add.group(this.fGroup_Input);
        this.NumberInput[i].Group.position.setTo(QUO_3, DIV_3);
        this.NumberInput[i].Index = i;
        this.NumberInput[i].Number = i + 1;
        this.NumberInput[i].Btn = this.add.button(0, 0, 'btn_small', null,this, 3, 3, 4, 3, this.NumberInput[i].Group);
        this.NumberInput[i].Btn.name = 'buttonnumber';
        this.NumberInput[i].Btn.data['object'] = this.NumberInput[i];
        this.NumberInput[i].Btn.anchor.setTo(0.5, 0.5);
        this.NumberInput[i].Btn.onInputDown.add(this.OnClickNumber, this);
        this.NumberInput[i].Btn.onInputDown.add(_BTN.ANI5, this);
        this.NumberInput[i].Spr = this.add.sprite(0, 0,'no_default', (i + 1));
        this.NumberInput[i].Group.add(this.NumberInput[i].Spr);
        this.NumberInput[i].Spr.anchor.setTo(0.5, 0.5);
        this.NumberInput[i].Spr.position.setTo(0, -2);
    }
};
Level.prototype.initMain = function() {
    this.fClock = this.add.sprite(245, -130, 'data01', 'clock',	this.fGroup_Sudoku);
    this.fClock.anchor.setTo(0.5, 0.5);

    this.fClock = this.add.sprite(420, -130, 'data01', 'trophy_1',	this.fGroup_Sudoku);
    this.fClock.anchor.setTo(0.5, 0.5);


    this.flevelbackspr = this.add.sprite(-40, -160, 'levelback',_UserInfo.Nowlevel);
    this.fGroup_Sudoku.add(this.flevelbackspr);
    this.ftextlevel = this.add.sprite(78, -132, "data02",_IMAGE_LOCALIZING.TEXT_SELECT_TITLE[_UserInfo.Nowlevel],this.fGroup_Sudoku);
    this.ftextlevel.pivot.setTo(0.5, 0.5);
    this.ftextlevel.anchor.setTo(0.5, 0.5);

    this.fText_Gametime = this.add.text(325, -126, '', FontStyle.TIME,this.fGroup_Sudoku);
    this.fText_Gametime.anchor.setTo(0.5, 0.5);


    this.fText_Besttime = this.add.text(490, -126, '', FontStyle.TIME,	this.fGroup_Sudoku);
    this.fText_Besttime.anchor.setTo(0.5, 0.5);

    var Sec = Math.floor(_UserInfo.Besttime[_UserInfo.Nowlevel] % 60);
    var Min = Math.floor(_UserInfo.Besttime[_UserInfo.Nowlevel] / 60);
    Min = Min % 100;
    var formattedNumber = ("0" + Sec).slice(-2);
    this.fText_Besttime.text = Min + ":" + formattedNumber;

};

Level.prototype.initObjects = function() {

    _UserInfo.PlayTime = 0;
    this.addtime = 0;
    this.NumberInput = new Array(_DEFINE.COUNT_NUMBER);
    this.Sudoku = new Array(_DEFINE.COUNT_TOTAL);
    this.fWrong_Line_Prefab = new Array();
    this.fWrong_Spine = new Array();

    for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++)		this.Sudoku[i]      = new _Class_SudokuManager();
    for (var i = 0; i < _DEFINE.COUNT_NUMBER; i++)		this.NumberInput[i] = new _Class_InputManager();
    this.initGroup();
    this.initDeleteButton();
    this.initCheckButton();
    this.initMemoButton();
    this.initNobutton();
    this.initMain();
    this.initPause();
    this.Register_Sodoku();

    this.fbool_memo = false;
    this.fbool_delete = false;

    var _popup_message = this.add.sprite(360, 0, 'data03', 'popup_message',	this.fGroup_notice);
    _popup_message.anchor.setTo(0.5, 0.5);
    var _style = {"font" : "bold 40px",		"stroke" : "#ffffff",		"strokeThickness" : 1,		"align" : "center"};

    this.fTextnotice = this.add.text(360, 1, '숫자를 먼저 선택하세요 !\n',_style, this.fGroup_notice);

    this.fTextnotice.anchor.setTo(0.5, 0.5);
    this.fGroup_notice.visible = false;
    this.fSec = 0;
    this.fboolResult = false;
    this.addevent = null;
    this.ButtonEvent = {		Timer : null,		Object : null,		Tick : null,		SelectImage : null,		Live : false	};
    this.fTimer_Game = this.game.time.create(false);
    this.fTimer_Game.loop(1000, this.On_Timer_Count, this);

    this.ButtonEvent.Timer = this.game.time.create(false);
    this.ButtonEvent.Timer.loop(1, this.On_ProcessEmpty, this);

    this.fGroup_main.alpha = 0;
    this.fGroup_Sudoku.alpha = 0;
    this.fGroup_Input.alpha = 0;
    this.fGroup_Button.alpha = 0;

    this.fGroup_notice.visible = false;
    this.fGroup_pause.visible = false;

    _FX.SetBtn(this.fBtn_sound);

    this.fWindow_Tutorial = null;

    this.Update_Timer();
    this.Mixcount = DEF.MIXCOUNT;
    this.Process_Ready();
    this.fTextnotice.text = "";

};
// -- user code here --
Level.prototype.Make_Back_9 = function(index) {
    this.Sudoku[index].Spr_Back.frame = 2;
};
Level.prototype.Register_Sodoku = function() {
    for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++) {
        var QUO_9 = Math.floor(i % 9);
        var DIV_9 = Math.floor(i / 9);

        var QUO_3 = Math.floor(DIV_9 / 3);
        var DIV_3 = Math.floor(QUO_9 / 3);

        this.Sudoku[i].x = (QUO_9 * DEF.MAINSTEPX) + DIV_3 * DEF.GAP;
        this.Sudoku[i].y = (DIV_9 * DEF.MAINSTEPY) + QUO_3 * DEF.GAP;

        this.Sudoku[i].Spr_Back = this.game.add.sprite( this.Sudoku[i].x,this.Sudoku[i].y,"btn_sudoku",0);

        this.Sudoku[i].Spr_Back.anchor.setTo(0.5, 0.5);
        this.Sudoku[i].Spr_Back.name = "sudokuworkbutton";
        this.Sudoku[i].Spr_Back.data["object"] = this.Sudoku[i];

        this.fGroup_Game.add(this.Sudoku[i].Spr_Back);

        this.Sudoku[i].Type = DEF.SFIXED;
        this.Sudoku[i].Spr_Back.inputEnabled = true;
        this.Sudoku[i].Spr_Back.events.onInputDown.add(this.onClickSudoku, this);
        this.Sudoku[i].Spr_Back.events.onInputDown.add(this.onClickToggleOn,this);
        this.Sudoku[i].Spr_Back.events.onInputUp.add(this.onClickToggleOff,	this);
    }
    for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++) {
        this.Sudoku[i].Spr_No = this.game.add.sprite(this.Sudoku[i].x,		this.Sudoku[i].y, "no_default", 0);
        this.Sudoku[i].Spr_No.anchor.setTo(0.5, 0.5);
        this.Sudoku[i].Spr_No.scale.setTo(0.73, 0.73);
        this.Sudoku[i].Spr_No.name = "skip";
        this.Sudoku[i].Spr_No.inputEnabled = false;
        this.fGroup_GameNumber.add(this.Sudoku[i].Spr_No);
    }
    for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++) {
        this.Sudoku[i].Spr_Effect = this.game.add.sprite(this.Sudoku[i].x,this.Sudoku[i].y, "data01", "selected_no");
        this.Sudoku[i].Spr_Effect.anchor.setTo(0.5, 0.5);
        this.Sudoku[i].Spr_Effect.scale.setTo(1, 1);
        this.Sudoku[i].Spr_Effect.name = "skip";
        this.Sudoku[i].Spr_Effect.visible = false;
        this.Sudoku[i].Spr_Effect.inputEnabled = false;
        this.fGroup_GameNumber.add(this.Sudoku[i].Spr_Effect);
    }
    for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++) {
        this.Sudoku[i].Spr_W_Box = this.game.add.sprite(this.Sudoku[i].x,this.Sudoku[i].y, "data01", "wrong_box");
        this.Sudoku[i].Spr_W_Box.anchor.setTo(0.5, 0.5);
        this.Sudoku[i].Spr_W_Box.scale.setTo(1, 1);
        this.Sudoku[i].Spr_W_Box.name = "skip";
        this.Sudoku[i].Spr_W_Box.visible = false;
        this.Sudoku[i].Spr_W_Box.inputEnabled = false;
        this.Sudoku[i].W_Box_Count = 0;
        this.fGroup_GameNumber.add(this.Sudoku[i].Spr_W_Box);
        this.Sudoku[i].Index = i;
    }
};

Level.prototype.Pop_up_notice = function(notice) {
    if (this.fGroup_notice.visible === true)	return;
    _FX.Start(_FX.SE_SELECTNUMBER);
    this.fGroup_notice.visible = true;
    this.fGroup_notice.scale.y = 0;
    this.fTextnotice.text = notice;
    var tween1 = this.game.add.tween(this.fGroup_notice.scale).to({		y : 1	}, 100, Phaser.Easing.Linear.Out, false);
    var tween2 = this.game.add.tween(this.fGroup_notice.scale).to({		y : 0	}, 200, Phaser.Easing.Linear.Out, false, 600);
    tween2.onComplete.add(this.On_EventPop_up_close, this);
    tween1.chain(tween2);
    tween1.start();
};
Level.prototype.On_EventPop_up_close = function() {
    this.fGroup_notice.visible = false;
};
Level.prototype.OnClicksound = function(Object) {

    _FX.Toggle(1, Object);
    _FX.Start(_FX.SE_CLICK);
};

Level.prototype.NobuttonNormal = function() {
    this.fBtn_memo.setFrames("btn_off", "btn_off", "btn_off", "btn_off");
    for (var i = 0; i < 9; i++) {
        this.NumberInput[i].Group.alpha = 1;
        this.NumberInput[i].Spr.loadTexture("no_default");
        this.NumberInput[i].Spr.frame = i + 1;
        this.NumberInput[i].Btn.setFrames(3, 3, 4, 3);
    }
};
Level.prototype.Result_Initialize = function() {
    this.Input_Disable(true);
    this.NobuttonNormal();

    for (var i = 0; i < 81; i++) {
        this.Sudoku[i].Spr_Effect.visible = false;
    }
    this.fbool_memo = false;

    this.fGroup_Button.alpha = 0.5;
    this.fGroup_Input.alpha = 0.5;
    this.fBtn_pause.inputEnabled = false;
    this.game.time.events.add(Phaser.Timer.SECOND, this.Animation_result, this);
    this.fboolResult = true;
    this.fTimer_Game.pause();
};
Level.prototype.Check_Result = function() {
    if (this.fboolResult == true)		return;
    for (var i = 0; i < 81; i++)		if (this.Sudoku[i].No == 0)			return false;
    for (var i = 0; i < 81; i++)
    {
        if (this.BackMask_Vertical(i, 1) == false)				return false;
        if (this.BackMask_Horizontal(i, 1) == false)			return false;
        if (this.BackMask_Center(i, 1) == false)				return false;
    }
    this.Result_Initialize();
};
Level.prototype.OnClickCheck = function() {
    var check = false;
    _FX.Start(_FX.SE_KEYPAD);

    for (var i = 0; i < 81; i++) {
        if (this.Sudoku[i].No != 0)
            if (this.Sudoku[i].No != this.Sudoku[i].OrignalNo) {
                this.Sudoku[i].Spr_W_Box.frameName = "check_result";
                this.Sudoku[i].Spr_W_Box.alpha = 1;
                this.Sudoku[i].Spr_W_Box.visible = true;
                check = true;
            }
    }
    for (var i = 0; i < 81; i++) {
        if (this.Sudoku[i].Type == DEF.SWORK)
            if (this.Sudoku[i].No == this.Sudoku[i].OrignalNo) {
                this.Sudoku[i].Spr_No.loadTexture("no_default");
                this.Sudoku[i].Spr_No.frame = this.Sudoku[i].No;
                this.Sudoku[i].Type = DEF.SFIXED;
                this.Sudoku[i].Spr_W_Box.visible = false;
                this.game.add.tween(this.Sudoku[i].Spr_No.scale).to({
                    x : 1.5,
                    y : 1.5
                }, 200, Phaser.Easing.Linear.Out, true).yoyo(true);
            }
    }
    if (check == false) {
        _FX.Start(_FX.SE_CORRECT);

    } else {
        this.fSpine_Check.setAnimationByName(0, "btn_check_ani", false);
        this.addtime += _DEFINE.CHECK_PENALTY_TIME;
        this.Add_Effect(_EFFECT_IMAGE.MISS);
        _FX.Start(_FX.SE_ERROR);
    }

    if (this.addtime > 0)
        this.game.time.events.add(500, this.On_EventCallitself, this);
    this.Process_Equal_number();
    this.Check_CommomButton();
};

Level.prototype.OnBackBlack = function(value) {
    if (value == true)
    {
        this.fGroup_GameNumber.visible = false;
        this.backimage.tint = 0x000000;
        this.fGroup_Sudoku.alpha = 0.1;
        this.fGroup_Button.alpha = 0.1;
        this.fGroup_Input.alpha = 0.1;
    }
    else {
        this.backimage.tint = 0xffffff;
        this.fGroup_Sudoku.alpha = 1;
        this.fGroup_Button.alpha = 1;
        this.fGroup_Input.alpha = 1;
        this.fGroup_GameNumber.visible = true;
    }
};
Level.prototype.OnClickPause = function() {
    _FX.Start(_FX.SE_POPUP_ON);
    this.fBtn_pause.inputEnabled = true;
    this.fTimer_Game.pause();
    this.fGroup_pause.scale.setTo(1, 0);
    this.fGroup_pause.visible = true;
    this.Input_Disable(true);

    this.fGroup_pause.alpha = 1;
    this.OnBackBlack(true);
    this.game.add.tween(this.fGroup_pause.scale).to({
        x : 1,
        y : 1
    }, 100, Phaser.Easing.Linear.None, true);
};
Level.prototype.OnClickExitpause = function() {
    _FX.Start(_FX.SE_CLICK);
    this.OnBackBlack(false);
    this.fTimer_Game.resume();
    this.game.add.tween(this.fGroup_Sudoku).to({		alpha : 1	}, 100, Phaser.Easing.Linear.None, true);
    _FX.Start(_FX.SE_POPUP_OFF);
    this.fGroup_pause.visible = false;
    this.Input_Disable(false);
};
Level.prototype.Add_Effect = function(value, object) {
    var prefabtemp;
    switch (value) {
        case _EFFECT_IMAGE.GO:
            prefabtemp = new Prefab(this.game, this.game.canvas.width / 2 + 70,-200, 'data02', 'go');
            this.game.add.existing(prefabtemp);
            prefabtemp.start(_EFFECT_IMAGE.GO);
            break;
        case _EFFECT_IMAGE.MISSNUMBER:
            prefabtemp = new Prefab(this.game, object.x+50, object.y+150, 'data02',"miss");
            this.game.add.existing(prefabtemp);
            prefabtemp.start(_EFFECT_IMAGE.MISSNUMBER);
            break;
        case _EFFECT_IMAGE.MISS:
            prefabtemp = new Prefab(this.game, this.game.canvas.width / 2, -200,'data02', "miss");
            this.game.add.existing(prefabtemp);
            prefabtemp.start(_EFFECT_IMAGE.MISS);
            break;
        case _EFFECT_IMAGE.GOOD:
            prefabtemp = new Prefab(this.game, this.game.canvas.width / 2, -200,'data02', "good");
            this.game.add.existing(prefabtemp);
            prefabtemp.start(_EFFECT_IMAGE.GOOD);
            break;
    }
};
Level.prototype.Animation_Clock = function() {
    // var tempy = (this.fClock.position.y) -5;
    // this.game.add.tween(this.fClock.position).to({y:tempy},1000,
    // Phaser.Easing.Linear.Out,true,true,-1);
};
Level.prototype.Make_sudoku_number = function() {

    SudokuEngine.CreateNew(_UserInfo.Nowlevel);
    for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++)
    {
        this.Sudoku[i].OrignalNo = SudokuEngine._Data_Save_Result[i] & 0x00ff;

        if( SudokuEngine._Data_Save_Result[i] & 0x1000)
        {
            this.Sudoku[i].Type      = DEF.SFIXED;
            this.Sudoku[i].No        = this.Sudoku[i].OrignalNo;

            this.Sudoku[i].Spr_No.loadTexture("no_default");
            this.Sudoku[i].Spr_No.frame = this.Sudoku[i].No;
            this.Sudoku[i].Spr_Back.frame = DEF.FRAME.FIXED;

        }
        else
        {
            this.Sudoku[i].Type = DEF.SEMPTY;
            this.Sudoku[i].No   = DEF.EMPTYNO;

            this.Sudoku[i].Spr_Back.frame = DEF.FRAME.BASE;
            this.Sudoku[i].Spr_No.loadTexture("no_normal");
            this.Sudoku[i].Spr_No.frame = this.Sudoku[i].No;
        }
    }
};
Level.prototype.Put_Memo = function(object)
{

    this.Sudoku[object.Index].Type = DEF.SEMPTY;
    var index = object.Index;
    var number = this.fNowNoBtn.Index;
    var tempx = Math.floor(number % 3);
    var tempy = Math.floor(number / 3);
    tempx = (tempx * 22) - 22;
    tempy = (tempy * 22) - 20;

    if(this.Sudoku[index].SprMemo[number] == null)
    {
        this.Sudoku[index].SprMemo[number] = this.add.sprite(this.Sudoku[index].x + tempx, this.Sudoku[index].y + tempy,"no_memo", number + 1);
        this.fGroup_GameNumber.add(this.Sudoku[index].SprMemo[number]);
        this.Sudoku[index].SprMemo[number].anchor.setTo(0.5, 0.5);
        this.Sudoku[index].SprMemo[number].scale.setTo(0.30, 0.30);
        _FX.Start(_FX.SE_MEMO);
    }
    else
    {
        this.Sudoku[index].SprMemo[number].destroy();
        this.Sudoku[index].SprMemo[number] = null;
    }
    for (var i = 0; i < 8; i++)	if (this.Sudoku[object.Index].SprMemo[i] != null)this.Sudoku[object.Index].Type = DEF.SMEMO;
};

Level.prototype.Input_Disable = function(temp) {
    for (var i = 0; i < 9; i++)
        this.NumberInput[i].Group.ignoreChildInput = temp;
    this.fGroup_main.ignoreChildInput = temp;
    this.fGroup_Button.ignoreChildInput = temp;
    this.fGroup_Game.ignoreChildInput = temp;
    this.fGroup_Input.ignoreChildInput = temp;
    this.fGroup_Check.ignoreChildInput = temp;
    this.fGroup_Memo.ignoreChildInput = temp;
    this.fGroup_Delete.ignoreChildInput = temp;

};
Level.prototype.Animation_result = function() {
    _FX.Stop();
    for (var i = 0; i < 81; i++) {
        this.Sudoku[i].Spr_Back.frame = 1;
        this.Sudoku[i].Spr_No.loadTexture("no_normal");
        this.Sudoku[i].Spr_No.frame = this.Sudoku[i].OrignalNo;
    }
    var value = 100;
    var delayvalue = 0;

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < i + 1; j++) {
            var _start = i + j * 8;
            this.game.add.tween(this.Sudoku[_start].Spr_Back).to({
                frame : 2
            }, 60, Phaser.Easing.Linear.In, true, i * value);
            this.game.add.tween(this.Sudoku[_start].Spr_No.scale).to({
                x : 1.02,
                y : 1.02
            }, 60, Phaser.Easing.Linear.None, true, i * value).yoyo(true);
        }
        this.game.time.events.add(i * value, this.On_Playresultsound, this);
    }
    delayvalue = 9 * value;

    for (var i = 0; i < 8; i++) {

        for (var j = 0; j < (8 - i); j++) {
            var _start = (17 + (i * 9) + j * 8);

            this.game.add.tween(this.Sudoku[_start].Spr_Back).to({
                frame : 2
            }, 60, Phaser.Easing.Linear.In, true, i * value + delayvalue);
            this.game.add.tween(this.Sudoku[_start].Spr_No.scale).to({
                x : 1.02,
                y : 1.02
            }, 60, Phaser.Easing.Linear.In, true, i * value + delayvalue).yoyo(
                true);

        }
        this.game.time.events.add(i * value + delayvalue,
            this.On_Playresultsound, this);
    }
    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.Result_Display,	this);
};
Level.prototype.On_Playresultsound = function() {
    _FX.Start(_FX.SE_2);
};
Level.prototype.Result_Display = function()
{
    this.Window_Result = new Window_Result(this.game,this);
    this.OnBackBlack(true);
    this.Window_Result.position.setTo(0, -700);
    this.fGroup_GameNumber.visible = false;
};
Level.prototype.Shutdown = function()

{
    for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++)
    {
        this.Sudoku[i].Spr_Back.destroy(true);
        this.Sudoku[i].Spr_Back.events.destroy();
        this.Sudoku[i].Spr_No.destroy();
        this.Sudoku[i].Spr_Effect.destroy();
        this.Sudoku[i].Spr_W_Box.destroy();

        for (var i = 0; i < _DEFINE.COUNT_TOTAL; i++)
        {
            for (var j = 0; j < 9; j++)
            {
                if(this.Sudoku[i].SprMemo[j] != null)
                {
                    this.Sudoku[i].SprMemo[j].destroy();
                    this.Sudoku[i].SprMemo[j] = null;
                }
            }
        }
        this.Sudoku[i] = null;
    }

    this.fGroup_Sudoku.removeAll(true);
    this.backimage.destroy();
    this.fNowNoBtn = null;
    this.fSpine_Check.destroy();
    this.game.onPause.removeAll();
    this.game.onResume.removeAll();

    this.fGroup_main.removeAll(true);
    this.fGroup_pause.removeAll(true);

    this.fGroup_Button.removeAll(true);
    this.fGroup_Input.removeAll(true);
    this.fGroup_notice.removeAll(true);
    this.fGroup_Game.removeAll(true);
    this.fGroup_GameNumber.removeAll(true);


    this.fGroup_Memo.removeAll(true);
    this.fGroup_Delete.removeAll(true);
    this.fGroup_Check.removeAll(true);

    this.ButtonEvent.Timer.stop(true);
    this.fTimer_Game.stop(true);

    this.fGroup_main = null;
    this.fGroup_pause = null;
    this.fGroup_Sudoku = null;
    this.fGroup_Button = null;
    this.fGroup_Input = null;
    this.fGroup_notice = null;
    this.fGroup_Game = null;
    this.fGroup_GameNumber = null;
    this.fGroup_Memo = null;
    this.fGroup_Delete = null;
    this.fGroup_Check = null;
};
Level.prototype.GotoMenu = function() {
    _FX.Stop();
    this.fGroup_main.visible = false;
    this.fGroup_pause.visible = false;
    this.Shutdown();
    this.game.state.start("Menu", true);
};
Level.prototype.On_EventCloseresult = function() {
    this.Window_Result.destroy(true);
    this.GotoMenu();
};
Level.prototype.Update_Timer = function() {
    var Sec = Math.floor(_UserInfo.PlayTime % 60);
    var Min = Math.floor(_UserInfo.PlayTime / 60);
    Min = Min % 100;
    var formattedNumber = ("0" + Sec).slice(-2);
    this.fText_Gametime.text = Min + ":" + formattedNumber;

    if (_UserInfo.Besttime[_UserInfo.Nowlevel] == 0) {
        this.fText_Besttime.text = this.fText_Gametime.text;
    }
};
Level.prototype.On_Timer_Count = function() {
    _UserInfo.PlayTime++;
    this.Update_Timer();
};
Level.prototype.Close_Turtorial = function(obj) {
    _FX.Start(_FX.SE_CLICK);
    _FX.Start(_FX.SE_POPUP_OFF);

    this.game.add.tween(this.fGroup_pause).to({	x : 0}, 200, Phaser.Easing.Linear.Out, true).yoyo(false);
    var tween = this.game.add.tween(this.fWindow_Tutorial.position).to({x : 1080}, 200, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
    tween.onComplete.add(this.OnClearTutorial, this);
};
Level.prototype.OnClearTutorial = function() {
    this.fUserinfoPrefab.destroy(true);
    this.fWindow_Tutorial.destroy();
};
Level.prototype.OnClickgiveup = function() {
    this.GotoMenu();
    _FX.Start(_FX.SE_POPUP_OFF);
};
Level.prototype.OnClickTutorial = function() {
    _FX.Start(_FX.SE_POPUP_ON);

    this.fWindow_Tutorial = new Window_Tutorial(this.game,this);
    this.fWindow_Tutorial.position.setTo(1080, 660);
    this.fWindow_Tutorial.Reset_Position();

    this.fUserinfoPrefab = new Window_User(this.game, this.fWindow_Tutorial);
    this.fUserinfoPrefab.position.setTo(-360, -650);
    this.fUserinfoPrefab.visible = true;

    this.fWindow_Tutorial.visible = true;
    this.game.add.tween(this.fGroup_pause).to({	x : -720}, 200, Phaser.Easing.Linear.Out, true).yoyo(false);
    this.game.add.tween(this.fWindow_Tutorial.position).to({x : 360	}, 200, Phaser.Easing.Bounce.OutSine, true, 0, 0, false);
};
Level.prototype.OnClickDelete = function(object) {
    if (object.name == "btndelete")
        _FX.Start(_FX.SE_KEYPAD);
    if (this.fbool_delete == false) {
        this.fbool_delete = true;
        this.fBtn_delete.setFrames("btn_on", "btn_on", "btn_on", "btn_on");
    } else {
        this.fbool_delete = false;
        this.fBtn_delete.setFrames("btn_off", "btn_off", "btn_off", "btn_off");
    }
};

Level.prototype.Set_NoBtn_Normal = function() {
    for (var i = 0; i < 9; i++) {
        this.NumberInput[i].Spr.loadTexture("no_default");
        this.NumberInput[i].Spr.frame = i + 1;
        this.NumberInput[i].Btn.setFrames(3, 3, 4, 3);
    }
};
Level.prototype.Set_NoBtn_Memo = function() {
    for (var i = 0; i < 9; i++) {
        this.NumberInput[i].Spr.loadTexture("no_memo");
        this.NumberInput[i].Spr.frame = i + 1;
        this.NumberInput[i].Btn.setFrames(1, 1, 2, 1);
    }
};
Level.prototype.Set_NoBtn_BaseFrame = function() {
    if (this.fbool_memo == true) {
        this.fBtn_memo
            .setFrames("btn_memo", "btn_memo", "btn_memo", "btn_memo");
        this.Set_NoBtn_Memo();
    } else {
        this.fBtn_memo.setFrames("btn_off", "btn_off", "btn_off", "btn_off");
        this.Set_NoBtn_Normal();
    }
};
Level.prototype.OnClickMemo = function(object) {
    if (object.name != "memobutton")
        return;
    _FX.Start(_FX.SE_KEYPAD);
    if (this.fbool_memo == true) {
        this.fbool_memo = false;
        this.Set_NoBtn_BaseFrame();
        this.No_Button_9OverCheck();
        if (this.fNowNoBtn != null)
            this.fNowNoBtn.Btn.setFrames(4, 4, 3, 4);
    } else {
        this.fbool_memo = true;
        this.Set_NoBtn_BaseFrame();
        this.No_Button_9OverCheck();
        if (this.fNowNoBtn != null)
            this.fNowNoBtn.Btn.setFrames(2, 2, 1, 2);
    }
};

Level.prototype.Number_Setting = function() {
    this.Set_NoBtn_BaseFrame();
    if (this.fbool_memo != true) {
        if (this.fNowNoBtn != null)
            this.fNowNoBtn.Btn.setFrames(4, 4, 4, 4);
    } else {
        if (this.fNowNoBtn != null)
            this.fNowNoBtn.Btn.setFrames(2, 2, 2, 2);
    }
};

Level.prototype.OnClickNumber = function(object) {
    if (object.name == "buttonnumber") {
        _FX.Start(_FX.SE_KEYPAD);
        this.fGroup_Input.ignoreChildInput = true;
        this.game.time.events.add(100, this.On_EventEnableNumberInput, this);
        this.fNowNoBtn = object.data['object'];
        this.Number_Setting(object.data['object']);
        this.No_Button_9OverCheck();
        this.Process_Equal_number();
    }
};
Level.prototype.On_EventEnableNumberInput = function() {
    this.fGroup_Input.ignoreChildInput = false;
};
Level.prototype.No_Button_9OverCheck = function() {
    var count = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    for (var i = 0; i < 81; i++) {
        count[this.Sudoku[i].No]++;
    }

    for (var i = 1; i < 10; i++) {
        this.NumberInput[i - 1].Group.alpha = 1;
        if (count[i] >= 9) {
            this.NumberInput[i - 1].Group.alpha = 0.4;
            this.NumberInput[i - 1].Btn.setFrames(5, 5, 5, 5);

        }
    }

    if (this.fbool_memo == true) {
        if (this.fNowNoBtn != null)
            this.fNowNoBtn.Btn.setFrames(2, 2, 2, 2);
    } else {
        if (this.fNowNoBtn != null)
            this.fNowNoBtn.Btn.setFrames(4, 4, 4, 4);
    }

};
Level.prototype.Reset_SudokuFrame = function() {
    for (var i = 0; i < 81; i++) {
        this.Sudoku[i].Spr_Back.frame = FRAME[this.Sudoku[i].Type];
    }
};
Level.prototype.Process_Equal_number = function() {
    if (this.fNowNoBtn == null) {
        for (var i = 0; i < 81; i++) {
            this.Sudoku[i].Spr_Effect.visible = false;
            this.Sudoku[i].Spr_Effect.frameName = "selected_no";
        }
        return;
    }

    for (var i = 0; i < 81; i++) {
        this.Sudoku[i].Spr_Effect.visible = false;
        this.Sudoku[i].Spr_Effect.frameName = "selected_no";

        if (this.fNowNoBtn.Number == this.Sudoku[i].No) {
            this.Sudoku[i].Spr_Effect.visible = true;
        }
        if (this.Sudoku[i].Type != DEF.SFIXED)
            if (this.Sudoku[i].SprMemo[this.fNowNoBtn.Index] != null) {
                this.Sudoku[i].Spr_Effect.frameName = "selected_memo";
                this.Sudoku[i].Spr_Effect.visible = true;
            }
    }
};

Level.prototype.UpdateChangeOption = function() {
    this.Process_Equal_number();
    this.Number_Setting();
    this.No_Button_9OverCheck();
    this.Check_CommomButton();
    this.Check_Result();
};
Level.prototype.onClickToggleOff = function(buttonobject) {
    if ('sudokuworkbutton' != buttonobject.name) {
        return;
    }
    var object = buttonobject.data["object"];

    object.isButton = false;
};
Level.prototype.onClickToggleOn = function(buttonobject) {
    if ('sudokuworkbutton' != buttonobject.name) {
        return;
    }

    var object = buttonobject.data["object"];

    object.isButton = true;
};

Level.prototype.onClickSudoku = function(buttonobject) {
    if ('sudokuworkbutton' != buttonobject.name) {
        return;
    }
    var object = buttonobject.data["object"];
    switch (this.Sudoku[object.Index].Type) {
        case DEF.SMEMO:

            if (this.fbool_delete == true) {
                this.Delete_Number(object);
                this.Clear_memo(object);
            } else {
                if (this.fNowNoBtn == null) {
                    this.Pop_up_notice("숫자를 선택하세요");
                } else {

                    if (this.fbool_memo) {
                        this.Put_Memo(object);
                    } else {
                        this.Put_Number(object);
                    }
                }
            }
            break;
        case DEF.SWORK:
            if (this.fbool_delete == true) {
                this.fNowNoBtn = null;
                this.Delete_Number(object);
                _FX.Start(_FX.SE_NUMBER);
            }
            if (this.fNowNoBtn != null) {
                if ((object.No == this.fNowNoBtn.Number)) {
                    this.Delete_Number(object);
                    _FX.Start(_FX.SE_NUMBER);
                } else {
                    this.fNowNoBtn = this.NumberInput[object.No - 1];
                }
            } else {
                this.fNowNoBtn = this.NumberInput[object.No - 1];
            }
            break;
        case DEF.SEMPTY:
            if (this.fbool_delete == true) {
                this.Pop_up_notice("삭제할 칸을 선택해주세요.");
                return;
            }
            if (this.fNowNoBtn == null) {
                this.Pop_up_notice("숫자를 선택하세요");
                return;
            }

            if (this.ButtonEvent.Timer.running)
                this.ButtonEvent.Timer.resume();
            else
                this.ButtonEvent.Timer.start();
            this.ButtonEvent.Tick = 0;
            this.ButtonEvent.Object = object;
            break;
        case DEF.SFIXED:
            if (this.fNowNoBtn == this.NumberInput[object.No - 1]) {
                this.fNowNoBtn = null;
            } else {
                _FX.Start(_FX.SE_KEYPAD);
                this.fNowNoBtn = this.NumberInput[object.No - 1];
            }
            break;

    }
    this.UpdateChangeOption();

};
Level.prototype.On_ProcessEmpty = function() {
    this.ButtonEvent.Tick++;
    if (this.ButtonEvent.Tick >= _DEFINE.PUSHTIME) {
        if (this.Sudoku[this.ButtonEvent.Object.Index].isButton == true) {

            if (!this.fbool_memo) {
                this.Put_Memo(this.ButtonEvent.Object);
            } else {
                this.Put_Number(this.ButtonEvent.Object);
            }
            this.ButtonEvent.Timer.pause();

            this.UpdateChangeOption();
        } else {

            if (this.fbool_memo) {
                this.Put_Memo(this.ButtonEvent.Object);
            } else {
                this.Put_Number(this.ButtonEvent.Object);
            }
            this.ButtonEvent.Timer.pause();

            this.UpdateChangeOption();
        }
    } else {
        if (this.Sudoku[this.ButtonEvent.Object.Index].isButton == false) {

            if (this.fbool_memo) {
                this.Put_Memo(this.ButtonEvent.Object);
            } else {
                this.Put_Number(this.ButtonEvent.Object);
            }

            this.ButtonEvent.Timer.pause();

            this.UpdateChangeOption();

        }
    }
};
Level.prototype.Off_Combutton = function(mode) {
    switch (mode) {
        case DEF.BUTTON.CHECK:
            this.fGroup_Check.ignoreChildInput = true;
            this.fGroup_Check.alpha = 0.5;
            break;
        case DEF.BUTTON.MEMO:
            this.fGroup_Memo.ignoreChildInput = true;
            this.fGroup_Memo.alpha = 0.5;
            break;
        case DEF.BUTTON.DELETE:
            this.fbool_delete = false;
            this.fBtn_delete.setFrames("btn_off", "btn_off", "btn_off", "btn_off");
            this.fGroup_Delete.ignoreChildInput = true;
            this.fGroup_Delete.alpha = 0.5;
            break;
    }
};
Level.prototype.On_Combutton = function(mode) {
    switch (mode) {
        case DEF.BUTTON.CHECK:
            this.fGroup_Check.ignoreChildInput = false;
            this.fGroup_Check.alpha = 1.0;
            break;
        case DEF.BUTTON.MEMO:
            this.fGroup_Memo.ignoreChildInput = false;
            this.fGroup_Memo.alpha = 1;
            break;
        case DEF.BUTTON.DELETE:
            this.fBtn_delete.setFrames("btn_off", "btn_off", "btn_off", "btn_off");
            this.fbool_delete = false;
            this.fGroup_Delete.ignoreChildInput = false;
            this.fGroup_Delete.alpha = 1;
            break;
    }
};

Level.prototype.Check_CommomButton = function() {
    var memocount = 0;
    var workcount = 0;
    for (var i = 0; i < 81; i++) {
        if (this.Sudoku[i].Type == DEF.SMEMO)
            memocount++;
        if (this.Sudoku[i].Type == DEF.SWORK)
            workcount++;
    }

    if ((workcount > 0) || (memocount > 0)) {
        if (this.fbool_delete == false)
            this.On_Combutton(DEF.BUTTON.DELETE);
    }
    if (workcount > 0) {
        this.On_Combutton(DEF.BUTTON.CHECK);
    } else {
        this.Off_Combutton(DEF.BUTTON.CHECK);
    }
    if (memocount == 0 && workcount == 0) {
        this.Off_Combutton(DEF.BUTTON.DELETE);
    }
};
Level.prototype.Delete_Number = function(object) {
    this.Remove_Wrong_Line(object.Index);
    this.Sudoku[object.Index].No = DEF.EMPTYNO;
    this.Sudoku[object.Index].Type = DEF.SEMPTY;
    this.Sudoku[object.Index].Spr_Back.frame = 0;
    this.Sudoku[object.Index].Spr_No.frame = 0;
    this.Sudoku[object.Index].Spr_Effect.visible = false;
    this.Sudoku[object.Index].Spr_W_Box.visible = false;

};
Level.prototype.Clear_memo = function(object) {
    for (var i = 0; i < 9; i++)
    {
        if(object.SprMemo[i]!= null)
        {
            object.SprMemo[i].destroy();
            object.SprMemo[i]= null;
        }
    }
};
Level.prototype.Check_Wrongnumber = function(index) {
    var result = false;
    var source = index;

    for (var i = 0; i < SudokuEngine._Arrangement_Rule_Data[index].length; i++) {
        var target = SudokuEngine._Arrangement_Rule_Data[index][i];
        if (target != source)
            if (this.Sudoku[target].No == this.Sudoku[source].No) {
                this.MakeWrongLine(source, target);
                this.Sudoku[source].Spr_W_Box.frameName = "wrong_box";
                this.Sudoku[target].Spr_W_Box.frameName = "wrong_box";
                this.Sudoku[source].Spr_W_Box.visible = true;
                this.Sudoku[target].Spr_W_Box.visible = true;

                this.Sudoku[source].W_Box_Count++;
                this.Sudoku[target].W_Box_Count++;

                result = true;
            }
    }
    return result;
};

Level.prototype.Check_PositionDef = function(index)
{
    if (this.Sudoku[index].Type != DEF.SFIXED)
    {
        if (this.Sudoku[index].No == 0) {
            this.Sudoku[index].Type = DEF.SEMPTY;
            for (var i = 0; i < 9; i++)
            {
                if (this.Sudoku[index].SprMemo[i] != null)	this.Sudoku[index].Type = DEF.SMEMO;
            }
        } else
        {
            this.Sudoku[index].Type = DEF.SWORK;
        }
    }
};
Level.prototype.DeleteMemo_On_Validindex = function(index) {
    for (var i = 0; i < SudokuEngine._Arrangement_Rule_Data[index].length; i++) {
        var temp = SudokuEngine._Arrangement_Rule_Data[index][i];

        if (this.Sudoku[temp].Type !== DEF.SFIXED)
            if (this.Sudoku[temp].SprMemo[this.fNowNoBtn.Index] != null) {
                this.Sudoku[temp].Spr_Effect.visible = false;
                this.Sudoku[temp].SprMemo[this.fNowNoBtn.Index].destroy();
                this.Sudoku[temp].SprMemo[this.fNowNoBtn.Index] = null;
            }
        this.Check_PositionDef(temp);
    }
};
Level.prototype.Put_Number = function(arg) {
    var object = arg;
    this.Sudoku[object.Index].No = this.fNowNoBtn.Number;
    this.Sudoku[object.Index].Spr_Effect.visible = true;
    this.Sudoku[object.Index].Spr_No.frame = this.Sudoku[object.Index].No;
    this.Sudoku[object.Index].Spr_Back.frame = 1;
    this.Sudoku[object.Index].Type = DEF.SWORK;
    this.Clear_memo(object);

    if (this.Check_Wrongnumber(object.Index) == true) {
        this.Add_Effect(_EFFECT_IMAGE.MISSNUMBER, object);
        _FX.Start(_FX.SE_ERROR);
        if (_UserInfo.Nowlevel == 2) {
            this.MakeSpine(this.Sudoku[object.Index].x + 46,
                this.Sudoku[object.Index].y + 170);
            this.addtime += _DEFINE.CHECK_PENALTY_TIME;
            if (this.addevent == null)
                this.addevent = this.game.time.events.add(500,
                    this.On_EventCallitself, this);

        }
    } else {
        _FX.Start(_FX.SE_NUMBER);
    }

    this.DeleteMemo_On_Validindex(object.Index);
    var soundcheck = false;
    if (this.BackMask_Vertical(object.Index, 0) == true) 	{		soundcheck = true;	}
    if (this.BackMask_Horizontal(object.Index, 0) == true) 	{		soundcheck = true;	}
    if (this.BackMask_Center(object.Index, 0) == true) 		{		soundcheck = true;	}
    if (soundcheck)
    {
        _FX.Start(_FX.SE_1);
        this.game.time.events.add(200, this.ReTurnBackImage, this);
    }
};

Level.prototype.Put_Memo1 = function(object) {

    this.Sudoku[object.Index].Type = DEF.SEMPTY;
    if (this.Sudoku[object.Index].SprMemo[this.fNowNoBtn.Index].visible == true)
    {
        this.Sudoku[object.Index].SprMemo[this.fNowNoBtn.Index].visible = false;
    } else
    {
        this.Sudoku[object.Index].SprMemo[this.fNowNoBtn.Index].visible = true;
        _FX.Start(_FX.SE_MEMO);
    }
    for (var i = 0; i < 8; i++)
        if (this.Sudoku[object.Index].SprMemo[i].visible == true)
            this.Sudoku[object.Index].Type = DEF.SMEMO;
};

Level.prototype.MakeWrongLine = function(start, end) {
    var sx = 0, sy = 0, tx = 0, ty = 0;
    for ( var temp in this.fWrong_Line_Prefab) {
        if ((this.fWrong_Line_Prefab[temp].start == start)
            && (this.fWrong_Line_Prefab[temp].end == end)) {
            return;
        }
        if ((this.fWrong_Line_Prefab[temp].start == end)
            && (this.fWrong_Line_Prefab[temp].end == start)) {
            return;
        }
    }
    sx = this.Sudoku[start].x;
    sy = this.Sudoku[start].y;
    tx = this.Sudoku[end].x;
    ty = this.Sudoku[end].y;
    var line = new Phaser.Line(sx, sy, tx, ty);
    sx = line.left + (line.right - line.left) / 2;
    sy = line.top + (line.bottom - line.top) / 2;
    var wrongline = new Prefab(this.game, sx, sy, "data01", "wrong_line");
    wrongline.start(_EFFECT_IMAGE.LINEMAKE, line);
    this.game.add.existing(wrongline);
    this.fGroup_GameNumber.add(wrongline);

    temp = new LINEINFO();
    temp.end = end;
    temp.start = start;
    temp.prefab = wrongline;
    this.fWrong_Line_Prefab.push(temp);
};
Level.prototype.Remove_Wrong_Line = function(index) {
    var temp = 0;

    for (var i = 0; i < this.fWrong_Line_Prefab.length; i++) {
        var lineinfo = this.fWrong_Line_Prefab[i];
        if ((lineinfo.start === index) || (lineinfo.end === index)) {
            temp++;
            if (this.Sudoku[lineinfo.start].W_Box_Count > 0) {
                this.Sudoku[lineinfo.start].W_Box_Count--;
                if (this.Sudoku[lineinfo.start].W_Box_Count == 0)
                    this.Sudoku[lineinfo.start].Spr_W_Box.visible = false;
            }
            if (this.Sudoku[lineinfo.end].W_Box_Count > 0) {
                this.Sudoku[lineinfo.end].W_Box_Count--;
                if (this.Sudoku[lineinfo.end].W_Box_Count == 0)
                    this.Sudoku[lineinfo.end].Spr_W_Box.visible = false;
            }
            if (this.fWrong_Line_Prefab[i].prefab.fLive == true)
                this.fWrong_Line_Prefab[i].prefab.lineend(
                    _EFFECT_IMAGE.LINEKILL, i);

        }
    }
    while (temp) {
        for (var i = 0; i < this.fWrong_Line_Prefab.length; i++) {
            if (this.fWrong_Line_Prefab[i].start == index
                || (this.fWrong_Line_Prefab[i].end == index)) {
                this.fWrong_Line_Prefab.splice(i, 1);
                temp--;
                break;
            }
        }
    }
};
Level.prototype.Process_Ready = function() {
    this.Check_CommomButton();
    this.fGroup_main.alpha = 1;
    if (_FX.BGM_TITLE.isPlaying === true)
        _FX.BGM_TITLE.stop();
    this.fGroup_Sudoku.alpha = 1;
    _FX.Start(_FX.SE_SHUFFLE);
    this.e_startdoing = this.game.time.events.add(10, this.Process_Makesudoku,this);
    this.Input_Disable(true);
};
Level.prototype.Process_Makesudoku = function() {

    if (this.Mixcount == 0)
    {
        this.game.add.tween(this.fGroup_Input).to({			alpha : 1		}, 500, Phaser.Easing.Linear.In, true, 0);
        this.game.add.tween(this.fGroup_Button).to({			alpha : 1		}, 600, Phaser.Easing.Linear.In, true, 0);
        this.Add_Effect(_EFFECT_IMAGE.GO);
        this.game.time.events.add(1000, this.Process_Gamestart, this);
    } else {
        this.game.time.events.add(100, this.Process_Makesudoku, this);
        this.Make_sudoku_number();
        this.Mixcount--;
    }
};

Level.prototype.BackMask_Vertical = function(position, option) {
    var checkdata = new Array();
    var checkbit = 0x000000;
    var tempCOL = Math.floor(position / 9);
    for (var i = 0; i < 9; i++)
        checkdata.push(i + tempCOL * 9);
    for (var i = 0; i < 9; i++) {
        if (this.Sudoku[checkdata[i]].Type == DEF.SEMPTY)			return;
        if (this.Sudoku[checkdata[i]].Type == DEF.SMEMO)			return;
        checkbit |= (0x00000001 << this.Sudoku[checkdata[i]].No);
    }

    if (checkbit == 0x0003fe) {
        if (option == 0)
        {
            for (var i = 0; i < 9; i++)this.Sudoku[checkdata[i]].Spr_Back.frame = 2;
        }
        return true;
    }
    return false;
};

Level.prototype.BackMask_Horizontal = function(position, option) {
    var checkdata = new Array();
    var checkbit = 0x000000;
    var tempROW = Math.floor(position % 9);
    for (var i = 0; i < 9; i++)
        checkdata.push(i * 9 + tempROW);
    for (var i = 0; i < 9; i++) {
        if (this.Sudoku[checkdata[i]].Type == DEF.SEMPTY)			return;
        if (this.Sudoku[checkdata[i]].Type == DEF.SMEMO)			return;
        checkbit |= (0x00000001 << this.Sudoku[checkdata[i]].No);
    }
    if (checkbit == 0x0003fe) {
        if (option == 0)
        {
            for (var i = 0; i < 9; i++)this.Sudoku[checkdata[i]].Spr_Back.frame = 2;
        }
        return true;
    }
    return false;
};
Level.prototype.ReTurnBackImage = function()
{

    for(var i = 0 ; i < 81 ; i ++)
    {
        if(this.Sudoku[i].Spr_Back.frame == 2)
        {
            this.Sudoku[i].Spr_Back.frame = 1;
        }
    }
};

Level.prototype.BackMask_Center = function(position, option) {
    var checkdata = new Array();
    var checkbit = 0x000000;
    var tempROW = Math.floor(position % 9);
    var tempCOL = Math.floor(position / 9);
    var tempROW1 = Math.floor(tempROW / 3) * 3;
    var tempCOL1 = Math.floor(tempCOL / 3) * 3;
    for (var i = 0; i < 3; i++) {
        checkdata.push(tempROW1 + tempCOL1 * 9 + 0 + i * 9);
        checkdata.push(tempROW1 + tempCOL1 * 9 + 1 + i * 9);
        checkdata.push(tempROW1 + tempCOL1 * 9 + 2 + i * 9);
    }
    for (var i = 0; i < 9; i++) {
        if (this.Sudoku[checkdata[i]].Type == DEF.SEMPTY)			return;
        if (this.Sudoku[checkdata[i]].Type == DEF.SMEMO)			return;
        checkbit |= (0x00000001 << this.Sudoku[checkdata[i]].No);
    }
    if (checkbit == 0x0003fe)
    {
        if (option == 0)
        {
            for (var i = 0; i < 9; i++)	this.Sudoku[checkdata[i]].Spr_Back.frame = 2;
        }
        return true;
    }
    return false;
};

Level.prototype.StartBGM = function() {
    this.fBtn_pause.inputEnabled = true;
    _FX.Start(_FX.BGM_GAME);
};
Level.prototype.Process_Gamestart = function() {
    this.Input_Disable(false);
    this.Animation_Clock();
    this.fTimer_Game.start();
    this.Timer_Pushing = 0;
    this.game.time.events.add(1000, this.StartBGM, this);

    this.Check_CommomButton();
    this.No_Button_9OverCheck();
    _FX.Start(_FX.SE_GO);
};
Level.prototype.MakeSpine = function(x, y) {
    this.fSpine_Check.position.setTo(x, y);
    this.fSpine_Check.scale.setTo(0.5);
    this.fSpine_Check.setAnimationByName(0, "btn_check_ani", false);
};

Level.prototype.On_EventCallitself = function() {
    if (this.addtime > 0) {
        this.addevent = null;
        this.addtime--;
        _UserInfo.PlayTime++;
        this.Update_Timer();
        this.game.add.tween(this.fText_Gametime.scale).to({			x : 1.1,			y : 1.1		}, 10, Phaser.Easing.Linear.Out, true).yoyo(true);
        if (this.addtime > 0) {			this.addevent = this.game.time.events.add(60,					this.On_EventCallitself, this);
        }
    }
};
