
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
