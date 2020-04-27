var GameOverController=function(){function e(){this.targetInterval=15,this.rotations=15,this.rate=25,this.rateOffset=3,this.AddListener()}return e.prototype.AddListener=function(){EventManage.Instance().AddListener(EventEnum.over_game,this.GameOver.bind(this))},e.prototype.GameOver=function(e){this.mGameOverView=new GameOverView,this.mGameOverView.show(),GameManage.Instance().mRootStage.push(this.mGameOverView),console.log("GameOver");for(var a in Dialog.manager)if(Dialog.manager.hasOwnProperty(a)){var n=this.mGameOverView[a];"showEffect"==a&&console.log(a+"="+n)}null!=e?(Laya.SoundManager.playSound("sounds/over.mp3",1),this.mGameOverView.img_result_state.skin="Frame/lose.png",this.mGameOverView.img_guangquan.skin="Frame/guangquan2.png",this.mGameOverView.img_win_star.visible=!1):(Laya.SoundManager.playSound("sounds/win.mp3",1),this.mGameOverView.img_result_state.skin="Frame/win.png",this.mGameOverView.img_guangquan.skin="Frame/guangquan.png",Laya.Tween.to(this.mGameOverView.img_win_star,{scaleX:1,scaleY:1},1e3,Laya.Ease.elasticOut)),this.startAnimation(),this.mGameOverView.sp_back.on(Laya.Event.MOUSE_DOWN,this,function(){console.log("OverClick"),MessageProxy.Instance().SendGameOver()})},e.prototype.AgainBtnClick=function(){console.log("AgainBtnClick"),Laya.timer.clear(this,this.loopAnimate),this.mGameOverView.destroy(),GameManage.Instance().AgainGame()},e.prototype.ReturnBtnClick=function(){console.log("ReturnBtnClick"),GameManage.Instance().ResetGame()},e.prototype.startAnimation=function(){Laya.timer.frameLoop(1,this,this.loopAnimate)},e.prototype.loopAnimate=function(){this.mGameOverView.img_guangquan.rotation+=2},e}();