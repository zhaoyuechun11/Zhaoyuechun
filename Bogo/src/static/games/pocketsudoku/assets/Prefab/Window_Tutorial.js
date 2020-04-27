
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

	var _text3 = this.game.add.text(-4, -165, 'Each Number can be\n filled in only once',style, _group_crop);
	_text3.pivot.setTo(0.5, 0.5);
	_text3.anchor.setTo(0.5, 0.5);
	_text3.stroke = "#602e0d";
	_text3.strokeThickness = 0.5;
	
	var _text1 = this.game.add.text(24, 232, 'Only 1 to 9 digits in the\n vertical line.',style, _group_crop);
	_text1.stroke = "#602e0d";
	_text1.pivot.setTo(0.5, 0.5);
	_text1.anchor.setTo(0.5, 0.5);
	_text1.strokeThickness = 0.5;

	var _text2 = this.game.add.text(-3, 758, 'Only 1 to 9 digits will\nbe inserted into the box.',style, _group_crop);
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