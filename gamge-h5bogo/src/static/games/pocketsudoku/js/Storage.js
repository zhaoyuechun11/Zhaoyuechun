/**
 *
 */
var Storage =
{
	writeEnable:true,	
	Start:function ()
	{				
		_UserInfo.Id = localStorage.getItem("SUDOKU@");	
		if(_UserInfo.Id == null)
		{
			
			this.Create();		
		}
		else
		{
			
			if(_UserInfo.Id == _DEFINE.VERSION)
			{
				this.Load();
			}
			else
			{
				this.Create();			
			}
		}
	},
	Create:function ()
	{
		var check = localStorage.setItem("SUDOKU@",_DEFINE.VERSION);

		if(check  == 'QUOTA_EXCEEDED_ERR')
		{
			this.writeEnable = false;	
		}
		else
		{
			this.writeEnable = true;
			for(var i = 0 ; i < 3; i++)	localStorage.setItem("SUDOKU@TIME"+i,_UserInfo.Besttime[i]);
			localStorage.setItem("SUDOKU@TOTALSTAR",_UserInfo.TotalStar);
			localStorage.setItem("SUDOKU@GRADE",_UserInfo.Grade);	
			localStorage.setItem("SUDOKU@SOUND",_UserInfo.Sound);
		}		
	},	
	Load:function ()
	{
		var temp  = localStorage.getItem("SUDOKU@TIME0");
		_UserInfo.Besttime[0] = temp *1;		
		temp  = localStorage.getItem("SUDOKU@TIME1");
		_UserInfo.Besttime[1] = temp *1;
		temp  = localStorage.getItem("SUDOKU@TIME2");
		_UserInfo.Besttime[2] = temp *1;
	
		_UserInfo.TotalStar  = localStorage.getItem("SUDOKU@TOTALSTAR")*1;	
		_UserInfo.Sound 	 = localStorage.getItem("SUDOKU@SOUND");		
		_UserInfo.Grade 	 = localStorage.getItem("SUDOKU@GRADE") *1;
		
	},
	SaveTime:function ()	
	{
		if(this.writeEnable)
		{
			localStorage.setItem("SUDOKU@TIME0",_UserInfo.Besttime[0]);
			localStorage.setItem("SUDOKU@TIME1",_UserInfo.Besttime[1]);
			localStorage.setItem("SUDOKU@TIME2",_UserInfo.Besttime[2]);
			
		}
	},
	SaveGrade:function ()
	{
		if(this.writeEnable)		localStorage.setItem("SUDOKU@TOTALSTAR",_UserInfo.TotalStar);
	},
	SaveSound:function(index)
	{
		if(this.writeEnable)localStorage.setItem("SUDOKU@SOUND",index);
	},
	Clear:function()
	{
		if(this.writeEnable)
		{
			localStorage.removeItem("SUDOKU@");	
			localStorage.removeItem("SUDOKU@TOTALSTAR");
			localStorage.removeItem("SUDOKU@TIME0");
			localStorage.removeItem("SUDOKU@TIME1");
			localStorage.removeItem("SUDOKU@TIME2");
			localStorage.removeItem("SUDOKU@SOUND");
			localStorage.removeItem("SUDOKU@GRADE");
		}
	}
};