var GameManage=function(){function a(){this.isInitManages=!1}return a.Instance=function(){return null==this.instance&&(this.instance=new a),this.instance},a.prototype.InitManages=function(){Config.isAlpha=!0,Laya.init(750,1334,Laya.WebGL),Laya.stage.bgColor="none",Laya.stage.alignH=Laya.Stage.ALIGN_CENTER,Laya.stage.alignV=Laya.Stage.ALIGN_MIDDLE,Laya.stage.scaleMode=Laya.Stage.SCALE_SHOWALL,Laya.stage.screenMode=Laya.Stage.SCREEN_VERTICAL,Laya.MouseManager.multiTouchEnabled=!1,Laya.stage.frameRate="fast",this.mRoot=new Laya.View,this.mRoot.width=Laya.stage.width,this.mRoot.height=Laya.stage.height,this.mRoot.centerX=0,this.mRoot.centerY=0,Laya.stage.addChild(this.mRoot),this.mRootStage=[],EventManage.Instance().Init(),TimeManage.Instance().Init(),ControllerManage.Instance().Init(),ResourceManage.Instance().Init(),this.isInitManages=!0},a.prototype.Reset=function(){for(this.mRoot.destroy();this.mRootStage.length>0;)this.mRootStage.shift().destroy();this.isInitManages=!1,this.StartGame()},a.prototype.StartGame=function(){this.isInitManages||this.InitManages(),EventManage.Instance().Broadcast(EventEnum.start_game)},a.prototype.ResetGame=function(){EventManage.Instance().Reset(),TimeManage.Instance().Reset(),ControllerManage.Instance().Reset(),ResourceManage.Instance().Reset(),this.Reset()},a.prototype.AgainGame=function(){ControllerManage.Instance().mGameController.ResetGame()},a.prototype.PauseGame=function(){Laya.stage.frameRate="sleep"},a.prototype.PlayGame=function(){Laya.stage.frameRate="fast"},a.prototype.OnGameBegin=function(a){console.log("on game begin "),EventManage.Instance().Broadcast(EventEnum.net_user_info,a)},a.prototype.OnUpdateData=function(a,e){console.log("set update data"+e),EventManage.Instance().Broadcast(EventEnum.net_update_score,{id:a,score:e})},a.prototype.OnGameOver=function(a){console.log("on game over "+a),a>0?(EventManage.Instance().Broadcast(EventEnum.over_game),Laya.SoundManager.stopMusic()):(EventManage.Instance().Broadcast(EventEnum.over_game,"fail"),Laya.SoundManager.stopMusic())},a}();