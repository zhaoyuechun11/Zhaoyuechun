<template>
    <!-- App -->
    <f7-app :params="f7params">
        <f7-statusbar></f7-statusbar>
        <f7-panel left cover @panel:opened="onPanelOpened" class="left-panel" style="width: 100%;height: 100%;">
            <f7-view url="/role/" links-view=".view-main" />
        </f7-panel>
        <f7-view url="/" :main="true"></f7-view>
        <f7-popup class="login-popup" :opened="popupOpened" @popup:closed="popupOpened = false" style="background:transparent">
            <f7-page style="background:transparent;position: relative">
                    <div class="Absolute-Center " style="width: 320px;height: 360px;">
                        <img src="static/images/close_icon.png" style="width: 18px;height:18px;margin-right: 0px;margin-top: 0px;padding: 10px;" class="Absolute-Center popup-close" @click="closeDialog"/>
                        <img src="static/images/login_head.png" style="width: 141px;height: 82px;margin-left: 88px;margin-top: 0px;"/>
                        <div class="share-dialog" style="position: relative;width: 320px;height: 280px;margin-top: -40px;z-index: -1"></div>
                        <div class="parent-flex-col" style="position: relative;margin-top: -250px;height: 200px;">
                            <img src="static/images/login_txt.png" style="width: 117px;height: 26px;margin-top: 0px;"/>
                            <div class="parent-flex-row">
                                <img src="static/images/blue_block.png" style="width: 30px;height: 1px;margin-top: 50px;"/>
                                <img src="static/images/login_icon.png" style="width: 46px;height: 9px;margin-top: 50px;margin-left: 16px;margin-right: 16px;"/>
                                <img src="static/images/blue_block.png" style="width: 30px;height: 1px;margin-top: 50px;"/>
                            </div>

                            <div style="width:300px;height:60px;margin-top: 30px;" >
                                <img src="static/images/bongo_an_fb.png" style="width: 50px;height:50px;margin-left: 16px;margin-right: 16px;" @click="facebookLogin"></img>
                                <img src="static/images/google.png" style="width: 50px;height:50px;margin-left: 16px;margin-right: 16px;" @click="googleLogin"></img>
                                <img src="static/images/shouji_icon.png" style="width: 50px;height:50px;margin-left: 16px;margin-right: 16px;" class="popup-close"  @click="shoujiLogin"></img>
                            </div>
                        </div>
                    </div>
            </f7-page>
        </f7-popup>
    </f7-app>
</template>
<script>
// Import Routes...
import routes from './routes.js';
import { mapMutations } from 'vuex';
import Response from './socket/down.js';
import Types from './socket/types.js';
import JsonData from './assets/json/config.json';;

let theme = 'md';
export default {
    data() {
        return {
            f7params: {
                theme,
                routes,
                id: 'com.dotjoy.bongo',
                dialog: {
                    title: 'Bongo',
                    buttonOk: 'OK',
                    passwordPlaceholder:"",
                },
                calendar: {
                    url: 'calendar/',
                    dateFormat: 'dd-mm-yyyy',
                },
                statusbar:{
                    iosOverlaysWebview: true,
                    enabled:false
                },
                actions: {

                },
                touch:{
                    materialRipple: false,
                    fastClicks: false,
                },

            },
            toastTopError: null,
            toastNetworkError:null,
            popupOpened:false,
            phonePopupOpened:false,
            countryCode:"+86",
            countryLabel:"CN"
        }
    },

    created:function(){
        //console.error('main page created');
    },

    destroyed:function(){
        //console.error('main page destroyed');
    },

    beforeDestroy() {
        //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
        this.$EventBus.$off("openPopEvent");
    },

    mounted:function() {
        var _this = this;
        _this.$EventBus.$on("openPopEvent", ({poped}) => {
            _this.$nextTick(()=>{
                console.log("poped: "+poped)
                _this.popupOpened=poped
            })
        });

        this.$websocket.setErrorCallback(this.onNetErrorCallback);
        this.$websocket.setLogin(false);
        this.$websocket.setDebug(this.$config.debug);
        this.$websocket.setLogin(false);
        this.$websocket.connect().then(()=>{
            console.log("Connect server opened");
        },(msg)=>{

        });

        //离线通知
        this.$websocket.addcallback(Types.MsgEnum.add_friend, this.onHandleAddFriend);
        this.$websocket.addcallback(Types.MsgEnum.agree_add_friend, this.onHandleAgreeAddFriend);
        this.$websocket.addcallback(Types.MsgEnum.match_game, this.onHandleGameMatch);
        this.$websocket.addcallback(Types.MsgEnum.invite_game, this.onHandleInviteGame);
        this.$websocket.addcallback(Types.MsgEnum.cancel_invite_game, this.onCancelInviteGame);
        this.$websocket.addcallback(Types.MsgEnum.agree_invite_game, this.onHandleAgreeInviteGame);
        this.$websocket.addcallback(Types.MsgEnum.chat, this.onHandleGameChat);
        this.$websocket.addcallback('network_on_close', this.onNetworkCloseCallback);

        this.$dataManager.init(this.$websocket);
        this.$dataManager.initLoad();
        this.$gameManager.setPlatform(this.$config.deviceName);
        this.$gameManager.init(JsonData);
        this.$gameManager.setWebsocket(this.$websocket);
        this.$gameManager.setLogin(false);

        window.addEventListener("offline", this.onOffline, false);
        window.addEventListener("online", this.onOnline, false);

        document.addEventListener("resume", this.onResume, false);
        document.addEventListener("pause", this.onPause, false);
    },

    destroyed:function(){
        this.$websocket.removecallback(Types.MsgEnum.match_game, this.onHandleGameMatch);
        this.$websocket.removecallback(Types.MsgEnum.add_friend, this.onHandleAddFriend);
        this.$websocket.removecallback(Types.MsgEnum.agree_add_friend, this.onHandleAgreeAddFriend);
        this.$websocket.removecallback(Types.MsgEnum.invite_game, this.onHandleInviteGame);
        this.$websocket.removecallback(Types.MsgEnum.cancel_invite_game, this.onCancelInviteGame);
        this.$websocket.removecallback(Types.MsgEnum.agree_invite_game, this.onHandleAgreeInviteGame);
        this.$websocket.removecallback(Types.MsgEnum.chat, this.onHandleGameChat);
    },

    methods: {
        ...mapMutations(['setMatchUser']),

        closeDialog(){
            this.popupOpened = false
        },

        //facebook登陆
        facebookLogin(){
            var _this = this;
            _this.$f7.preloader.show();
            this.$gameManager.startLogin('facebook', function (data) {
                //alert('facebook login ' + data.user.userId + "  token = " + data.user.accessToken + ' image= ' + data.user.imageUrl + " givenName " + data.user.givenName );
                _this.$f7.preloader.hide();
                if ( data.result == "success" )
                {
                    //alert('success result ' + data.user.userId  + ' data ' + data.user.accessToken );
                    _this.$gameManager.bindAccount(2, data.user.userId, data.user.accessToken, function (result) {
                        //console.log(result.result);
                        if (result.result == "success") {
                            //alert('userId ' + result.user.userId + ' tocken ' + result.user.tocken);
                            //alert("绑定成功");
                            localStorage.setItem('userid', result.user.userId);
                            localStorage.setItem('tokenKey', result.user.token);
                            //alert(' game token ' + result.isBinded  + " " + result.user.token);
                            if ( result.isBinded ){
                                // start logining
                                _this.$gameManager.IsLogin = false;
                                _this.$websocket.setLogin(false);
                                //alert(' already bind ' + result.user.token);
                                _this.$EventBus.$emit('LoginAction', {
                                    data : {
                                        type: 'auto',
                                        uuid: null,
                                        token: result.user.token,
                                        imageUrl: data.user.imageUrl,
                                        givenName: data.user.givenName
                                    }
                                })

                            }
                        } else {
                            //alert('Repeated binding');
                        }
                    });
                }
                else
                {

                }
                //alert(data.userId + " " + data.accessToken);
                // default_login          = 1; // 默认登陆方式 (账号/密码)
                // facebook_login         = 2; // facebook登录
                // guest_login            = 3; // 游客登录
                // token_login            = 4; // 内部token登录
                // mobile_login           = 5; // 手机号登录
                // google_login           = 6; // google登录
            });
        },
        //google登陆
        googleLogin(){
            var _this = this;
            _this.$f7.preloader.show();
            _this.$gameManager.startLogin('google', function (data) {
                //alert('google login ' + data.user.userId + "  token = " + data.user.accessToken + ' image= ' + data.user.imageUrl + " givenName " + data.user.givenName );
                _this.$f7.preloader.hide();
                if ( data.result == "success" ) {

                    _this.$gameManager.bindAccount(6, data.user.userId, data.user.accessToken, function (result) {
                        //console.log(result.result);
                        if (result.result == "success") {
                            //alert('userId ' + result.user.userId + ' tocken ' + result.user.tocken);
                            //alert("绑定成功");
                            localStorage.setItem('userid', result.user.userId);
                            localStorage.setItem('tokenKey', result.user.token);
                            //alert(' game token ' + result.isBinded  + " " + result.user.token);
                            if ( result.isBinded ){
                                // start logining
                                _this.$gameManager.IsLogin = false;
                                _this.$websocket.setLogin(false);
                                //alert(' already bind ' + result.user.token);
                                _this.$EventBus.$emit('LoginAction', {
                                    data : {
                                        type: 'auto',
                                        uuid: null,
                                        token: result.user.token,
                                        imageUrl: data.user.imageUrl,
                                        givenName: data.user.givenName
                                    }
                                })
                            }
                        } else {
                            //alert('Repeated binding');
                        }
                    });
                }
                else
                {

                }
            });
        },

        //手机登陆
        shoujiLogin(){
            this.$f7.views.main.router.navigate("/phoneLogin/");
        },

        onOffline() {
            this.showNetworkOfflineToast(true);
            this.$websocket.disconnect();
        },

        onOnline() {
            this.showNetworkOfflineToast(false);
        },

        onResume() {
            //alert('on resume key down ......');
        },

        onPause() {
            //alert('on pause key down ......');
        },

        onNetworkCloseCallback() {
            //alert(" 网络断开回调 .....");
            if ( this.$gameManager.IsInGame && this.$gameManager.QuitGameCallback != null )
            {
                //alert(" 网络断开回调 ..... ");
                this.$gameManager.QuitGameCallback();
            }
        },

        onPanelOpened(){
            this.$store.state.openedPanel.updateRoleInfo();
        },

        onNetErrorCallback(msg){
            if ( msg )
            {
                this.showNetworkOfflineToast(true);
            }
        },

        showNetworkOfflineToast(show) {
            const _this = this;
            if (show) {
                if (_this.toastNetworkError == null) {
                    _this.toastNetworkError = _this.$f7.toast.create(
                        {
                            text: 'Network unavailable. Play try again',
                            position: 'top',
                            closeButton: true,
                        }
                    )
                }
                _this.toastNetworkError.open();

            } else
            {
                if (_this.toastNetworkError != null)
                {
                    _this.toastNetworkError.close();
                    _this.toastNetworkError = null;
                }
            }
        },

        showInvitedToast(data){
            let _this = this;
            //console.log(data);
            const gameData = this.$gameManager.getGameData(data.gameId);
            let toastTop = this.$f7.toast.create(
              {
                text: 'Invited ' + gameData.gameName,
                position: 'top',
                closeButton: true,
                closeButtonColor: 'red',
                closeButtonText: 'Join',
                closeTimeout: 2000,
                destroyOnClose: true,
                on: {
                    closeButtonClick(){
                       _this.$dataManager.agreeInviteGame(data.gameId, data.userId, true);
                       _this.$dataManager.setMatchGame(data.gameId);
                       _this.$dataManager.removeJoinMatchGame(data.userId);
                    }
                }
              }
            );
            toastTop.open();
        },

        onHandleAddFriend(msg){
          let data = Response.down.add_friend.decode(msg);
          //console.log(this.$dataManager);
          this.$dataManager.addInvitedFriend(data._uid);
          this.$dataManager.getUser(data._uid).then(function (user) {
            console.log('get user success ' + user.userName);
          }).catch(function (error) {
            console.log(error)
          })

            if ( this.$config.deviceName != "browser")
            {
                navigator.vibrate(1000);
            }
        },

        onHandleAgreeAddFriend(msg){
          let data = Response.down.agree_add_friend.decode(msg);
          //console.log(this.$dataManager);
          this.$dataManager.addFriendData(data._uid);

          this.$dataManager.getUser(data._uid).then(function (user) {
            console.log('get user success ' + user.userName);
          }).catch(function (error) {
            console.log(error)
          })
        },

        //游戏匹配
        onHandleGameMatch(msg){
            //console.log(msg);
            let matchInfo = Response.down.match_game.decode(msg);
            //console.log(matchInfo);
            let isComplete = matchInfo._match_complete;
            for(let i = 0; i < matchInfo._uid_list.length; i++) {
                //最后一个的时候 提交完成
                isComplete = isComplete && ((matchInfo._uid_list.length - 1) == i );
                this.addMatchUser(matchInfo._uid_list[i], matchInfo._match_complete);
            }
        },

        //被人邀请
        onHandleInviteGame(msg){

            var _this = this;
            let inviteGame = Response.down.invite_game.decode(msg);
            let game = {
                userId: inviteGame._uid,
                gameId: inviteGame._gid,
                timestamp : inviteGame._timestamp,
                isRead: false,
                userName: "userName"
            };

            if ( _this.$config.deviceName !== "browser") {
                var gameData = _this.$gameManager.getGameData(game.gameId);
                if ( gameData != null ) {
                    _this.$gameManager.hasDownGame(gameData.gameUrl, function (url) {
                        _this.$dataManager.addJoinMatchGame(game);
                        if (_this.$config.deviceName != "browser") {
                            navigator.vibrate(1000);
                        }

                        if (_this.$dataManager.onInvitedCallback !== null) {
                            _this.$dataManager.onInvitedCallback();
                        } else if (_this.$dataManager.onInvitedCallbackChat !== null) {
                            _this.$dataManager.onInvitedCallbackChat();
                        } else {
                            _this.showInvitedToast(game);
                            _this.$dataManager.addNotifyMessage(inviteGame._uid, {
                                type: 'invited',
                                data: game,
                            })
                        }

                    }, function (error) {

                    });
                }
            }
            else
            {
                _this.$dataManager.addJoinMatchGame(game);
                if (_this.$config.deviceName != "browser") {
                    navigator.vibrate(1000);
                }

                if (_this.$dataManager.onInvitedCallback !== null) {
                    _this.$dataManager.onInvitedCallback();
                } else if (_this.$dataManager.onInvitedCallbackChat !== null) {
                    _this.$dataManager.onInvitedCallbackChat();
                } else {
                    _this.showInvitedToast(game);
                    _this.$dataManager.addNotifyMessage(inviteGame._uid, {
                        type: 'invited',
                        data: game,
                    })
                }
            }
        },

        //取消邀请
        onCancelInviteGame(msg){
            let cancelInvited = Response.down.cancel_invite_game.decode(msg);
            //console.log(cancelInvited);
            let game = {
                userId: cancelInvited._uid,
                gameId: cancelInvited._gid,
                userName: "userName"
            }
            this.$dataManager.removeJoinMatchGame(game.userId);

            if( this.$dataManager.onInvitedCallback !== null )
            {
                //console.log('game result views');
                this.$dataManager.onInvitedCallback();
            }
            else if ( this.$dataManager.onInvitedCallbackChat !== null )
            {
                this.$dataManager.onInvitedCallbackChat();
            }
            else
            {
                this.$dataManager.addNotifyMessage(cancelInvited._uid,{
                    type: 'canceled',
                    data: game,
                })
            }
        },

        onHandleAgreeInviteGame(msg){
            let agreeInvited = Response.down.agree_invite_game.decode(msg);
            console.log('agree invite game ' + agreeInvited._agree);
            if ( agreeInvited._agree == false )
            {
                this.$dataManager.setInvitedGame(undefined);
                if ( this.$dataManager.onInvitedCallback !== null )
                {
                    this.$dataManager.onInvitedCallback();
                }

                if ( this.$dataManager.onInvitedCallbackChat !== null )
                {
                    this.$dataManager.onInvitedCallbackChat();
                }
                if ( this.$dataManager.onRejectInvitedGame !== null )
                {
                    this.$dataManager.onRejectInvitedGame();
                }
            }
        },

        onHandleGameChat(msg)
        {
            let chat = Response.down.chat.decode(msg);
            console.log(chat);
            console.log(this.$dataManager.onHandleChatCallback);
            if (this.$dataManager.onHandleChatCallback == null) {
                this.$dataManager.addNotifyMessage(chat._uid,
                  {
                      type:'chat',
                      data:chat
                  }
                );
            }
            else
            {
                console.log('data manager ------');
                this.$dataManager.onHandleChatCallback(chat);
            }
        },

        enterMatchGame()
        {
          let _this = this;
          let router = _this.$f7.views.main.router;
          let matchUser = _this.$dataManager.getMatchUser();
          let matchGame = _this.$dataManager.getMatchGame();
          let myUser = _this.$dataManager.getMyself();

          let gameUsers = [];
          for(let i=0; i < 2; i++)
          {
              if ( myUser.userId == matchUser[i].userId )
              {
                  gameUsers[0] = matchUser[i];
              }
              else
              {
                  gameUsers[1] = matchUser[i];
              }
          }

          if ( _this.$dataManager.onMatchedCallback ) {
              _this.$dataManager.onMatchedCallback(gameUsers[1]);
          }

            _this.$gameManager.hasDownGame(matchGame, function (url) {
              //alert('get local file url = ' + url);
              setTimeout(function () {
                  //发送信息关闭聊天界面的语音
                  _this.$EventBus.$emit("leaveChannel");
                  //跳转页面
                  router.navigate("/game/", {
                      props: {
                          game: matchGame,
                          gameUrl: url,
                          users: gameUsers
                      },
                      clearPreviousHistory:true
                  })
              }, 1000);

              _this.$dataManager.setRecordPlayGame(matchGame);

          },function (error) {
              alert('file not down load ' + url);
          });

          _this.$dataManager.clearMatchUser();
        },

        //可能有个问题 多个人的时候
        addMatchUser(userId, isEnd) {
          let _this = this;
          let user = _this.$dataManager.hasUser(userId);
          if (user !== undefined) {
            _this.$dataManager.addMatchUser(user);
            if (isEnd && _this.$dataManager.getMatchUser().length == 2) {
              _this.enterMatchGame();
            }
          } else {
            _this.$dataManager.getUser(userId).then((user) => {
                console.log(user);
              _this.$dataManager.addMatchUser(user);
              if (isEnd && _this.$dataManager.getMatchUser().length == 2) {
                _this.enterMatchGame();
              }
            }, (msg) => {
              console.log(msg);
            })
        }
    }}
}
</script>

<style>

    .left-panel{
        width: 75%!important;
    }

    html.with-panel-left-cover .panel-backdrop {
        display: block;
        opacity: 1;
        background-color:rgba(0,0,0,0.5);
    }

    .Absolute-Center {
        width: 50%;
        height: 50%;
        overflow: auto;
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
    }

    .share-dialog{
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-image: url('./static/images/login_dialog_bg.png');
    }

    .parent-flex-col{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .parent-flex-row{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
    }


</style>
