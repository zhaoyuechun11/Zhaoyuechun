var ControllerManage=function(){function n(){}return n.Instance=function(){return null==this.instance&&(this.instance=new n),this.instance},n.prototype.Init=function(){this.mPreLoadController=new PreLoadController,this.mGameController=new GameController,this.mGameOverController=new GameOverController},n.prototype.Reset=function(){n.instance=null},n}();