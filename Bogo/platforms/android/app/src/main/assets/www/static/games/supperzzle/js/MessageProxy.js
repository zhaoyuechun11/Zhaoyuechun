var Browser=Laya.Browser,MessageProxy=function(){function e(){}return e.Instance=function(){return null==this.s_instance&&(this.s_instance=new e),this.s_instance},e.prototype.InitProxy=function(){var e=this;Browser.window.addEventListener("message",function(t){console.log("receive message listener"),e.OnReceiveMessage(t.data)}),this._users=[]},e.prototype.PostMessage=function(e){Browser.window.parent&&Browser.window.parent.postMessage(e,"*")},e.prototype.SendPostScore=function(e){this.PostMessage({cmd:"SendGameData",data:e})},e.prototype.SendGameReady=function(){this.PostMessage({cmd:"GameLoadReady"})},e.prototype.SendGameOver=function(){this.PostMessage({cmd:"GameOver"})},e.prototype.AddListenter=function(e){this._listener=e},e.prototype.RemoveListener=function(){this._listener=null},e.prototype.OnReceiveMessage=function(e){console.log("on receive message"),console.log(e);switch(e.cmd){case"UpdateData":2==this._users.length&&(e.data.userId==this._users[0].userId?GameManage.Instance().OnUpdateData(0,e.data.userScore):GameManage.Instance().OnUpdateData(1,e.data.userScore));break;case"GameResult":GameManage.Instance().OnGameOver(e.data);break;case"GameBegin":console.log(e.data),this._users=e.data,GameManage.Instance().OnGameBegin(e)}this._listener&&(console.log("call back listener "),this._listener(e.data))},e}();