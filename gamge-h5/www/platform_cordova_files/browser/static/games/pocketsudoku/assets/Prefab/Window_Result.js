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
						//this.fBtn_continue.inputEnabled = true;
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
				    
				    	if(_TIME_SCOPE[_UserInfo.Nowlevel][1] * 60 <= _UserInfo.PlayTime)
				    	{
				    		this.getstar =_BONUS_OBTAIN[_UserInfo.Nowlevel][1];	
				    	
						}
						if(_TIME_SCOPE[_UserInfo.Nowlevel][2] * 60 <= _UserInfo.PlayTime)
				    	{
				    		this.getstar =_BONUS_OBTAIN[_UserInfo.Nowlevel][2];
				    	}
						var endResult = (this.getstar*1000)-Math.min(_UserInfo.PlayTime,_UserInfo.Nowlevel*600+600);
					    _UserInfo.TotalStar +=  this.getstar;
					  // this.fRewardStar.text = this.getstar;
					    this.fRewardStar.text = endResult;
					    Storage.SaveGrade();
					    this.userInfo.initialize();					    
						this.game.add.tween(this.fRewardStar.scale).to( {x:2,y:2}, 200,Phaser.Easing.Bounce.Out, true).yoyo(true);
					
						var text  = this.getstar*1000;
						var test =  Math.min(_UserInfo.PlayTime,_UserInfo.Nowlevel*600+600);
						var playTime = _UserInfo.PlayTime;
						var hh = _BONUS_OBTAIN[_UserInfo.Nowlevel]*600+600;
						var tt = _BONUS_OBTAIN[_UserInfo.Nowlevel];
						var ss = _UserInfo.Nowlevel;

						// ---------------- 这里是结束的地方 ---------------- //
						//_UserInfo.TotalStar
						if ( window.parent != null ) {
							window.parent.postMessage({
								cmd: "GameOver",
								msg: {
									totalStar: _UserInfo.TotalStar, // 如果是星星数，也是这个分数
									score:endResult,
									level: 0,
									text:text,
									test:test,
									playTime:playTime,
									hh:hh,
									tt:tt,
									ss:ss

								}
							}, "*");
						}
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