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
	GRADE:["bronze","silver","gold","Diamond"]
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
	"0":[ 'facility', 'EASY','初級'    ],
	"1":[ 'usually', 'MEDIUM', '中級' ],
	"2":[ 'difficulty','HARD', '上級'   ],
};
var _LocalText = _LocalText  ||
{
	TITLE_CHOICE: { 0: 'Difficulty selection', 1: 'Select Level', 2:  'Choose a level' },
	SELECTEXT: ['facility', 'EASY','初級','usually', 'MEDIUM','中級' ,'difficulty','HARD','上級' ],
	BONUS: { 0: 'Clear Compensation', 1: 'Bonus', 2: 'Bonus' },
	BESTTIME: { 0: 'The shortest time', 1: 'Best Time', 2: 'Best Time' },
	MYLEVEL: { 0: 'My rating', 1: 'My Level', 2: '私のレベル' },
 	"0":[ 'facility', 'EASY','初級'    ],
	"1":[ 'usually', 'MEDIUM', '中級' ],
	"2":[ 'difficulty','HARD', '上級'   ],
};

var Button_Tween = Button_Tween  ||function(source,object,scalex,scaley,time) 
{
	source.add.tween(object.scale).to({x:scalex, y:scaley}, time,"Linear",true,0,-1).yoyo(true);
};
var _Locailizing = _Locailizing  ||
{   
	County:1
};
