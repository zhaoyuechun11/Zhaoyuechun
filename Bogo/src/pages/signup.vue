<template>
  <f7-page class="signup" @page:beforeremove="onPageBeforeRemove">
    <img class="background" style="width: 100%;height: 100%" src="static/images/background.jpg">
    <f7-block >
        <img style="margin-top:30%" width="100%" src="static/images/logo.png">
    </f7-block>

    <f7-block style="bottom: -15%;" :class="{'active' : isShowLogin }">
        <f7-row style="justify-content: center">
            <f7-col width="66px" style="background-color: transparent" class="btn-group">
                <f7-button v-if="isDebug" block fill social outline @click="loginScreenOpened = true" class="loginbtn" style="margin-top: 10px;padding-left: 30px;padding-right: 30px;margin-top: 1px;" :class="{'active': actionSignIndex == 0}">
                    <i class="fa fa-fw fa-la fa-facebook"></i>
                    <span style="font-weight: bold">Test Login</span>
                </f7-button>
                <f7-button block fill social  outline color="#3D75FE" @click="fbLogin" style="margin-top: 10px;padding-left: 30px;padding-right: 30px;margin-top: 10px;"  class="loginbtn" :class="{'active': actionSignIndex == 1}">
                    <i class="fa fa-fw fa-la fa-facebook"></i>
                    <span style="font-weight: bold">FaceBook</span>
                </f7-button>
                <div style="margin-top: 14px;">
                    <img src="static/images/google.png" style="width: 36px;height: 36px;" @click="goolgeLogin"/>
                    <img src="static/images/shouji.png" style="width: 36px;height: 36px;margin-left: 16px;" raised @click="$f7router.navigate('/phoneLogin/')"/>
                </div>
            </f7-col>
        </f7-row>
    </f7-block>

    <f7-login-screen ref="loginScreenPanel" :opened="loginScreenOpened" @loginscreen:closed="loginScreenOpened = false">
      <f7-page no-toolbar no-navbar no-swipeback login-screen>
          <f7-block style="margin-top: 30%">
            <f7-row style="">
                <f7-col class="flex-align-center">
                    <div style="width:70%">
                        <f7-list no-hairlines-md>
                            <f7-list-input
                                label="Name"
                                type="text"
                                placeholder="Your name"
                                clear-button
                                :value="username"
                                @input="username = $event.target.value"
                            >
                            </f7-list-input>
                            <f7-list-input
                                label="Password"
                                type="password"
                                placeholder="Your password"
                                clear-button
                                :value="password"
                                @input="password = $event.target.value"
                            >
                            </f7-list-input>
                        </f7-list>
                    </div>
                 </f7-col>
            </f7-row>
            <f7-row>
                <f7-col class="flex-align-center">
                    <div style="width:70%">
                        <f7-button block big fill social style="width:100%" @click="signIn">
                            <span>Sign In</span>
                        </f7-button>
                    </div>
                </f7-col>
            </f7-row>
          </f7-block>
        </f7-page>
    </f7-login-screen>
    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
          <f7-page>
              <f7-navbar no-shadow style="background: #FF6900;">
                  <f7-nav-left>
                      <img src="static/images/shouji.png" style="width: 30px;height: 30px;margin-left: 26px;" @click="closePhoneLogin"/>
                  </f7-nav-left>
                  <f7-nav-title></f7-nav-title>
                  <f7-nav-right>
                      <f7-link icon="icon-bars" panel-open="right"></f7-link>
                  </f7-nav-right>
              </f7-navbar>
              <f7-link href="" style="display:block" class="game">
                  <div class="fitem" style="border:1px #999 solid;width: 90%;margin-left: 5%;margin-top: 36px;border-top-left-radius: 6px;border-top-right-radius: 6px;">
                      <div class="add-friends" style="margin-top: 0px;margin-bottom:0px;background: white;border-radius: 0px;margin-left: 0px;padding-bottom: 0px;padding-top: 0px;">
                          <img  src="static/images/shouji.png"  class="add-friends-img" style="width: 20px;height: 20px" v-on:click.stop="goPersonal(notify)"/>
                          <div style="height: 48px;display: flex;flex-direction: row;align-items: center;justify-content:center;" >
                              <div @click="openCountrySel" >
                                  <a style="height:auto;padding:0px;margin-left: 2px;color: black;text-align: center;font-size: 16px;">
                                     {{countryLabel}}
                                  </a>
                                  <a style="height:auto; padding:0px; margin-left: 2px;color: black;text-align: center;font-size: 16px;">
                                      {{countryCode}}
                                  </a>
                                  <img src="static/images/setting.png" style="width: 10px;height: 10px;"/>
                              </div>
                              <input placeholder="Phone Number" class="input-txt"/>
                          </div>
                      </div>
                  </div>
                  <div class="fitem" style="border:1px #999 solid;width: 90%;margin-left: 5%;border-bottom-left-radius: 6px;border-bottom-right-radius:6px;border-top-width:0px;" >
                      <div class="add-friends" style="margin-top: 0px;background: white;border-radius: 0px;margin-left: 0px;padding-bottom: 0px;padding-top: 0px;">
                          <img  src="static/images/shouji.png"  class="add-friends-img" style="width: 20px;height: 20px" />
                          <div style="height: 48px;display: flex;flex-direction: row;align-items: center;justify-content:center;" >
                              <input placeholder="Verification Code" class="input-txt"/>
                              <f7-button fill class="yanzheng">GET CODE</f7-button>
                          </div>

                      </div>
                  </div>
              </f7-link>

              <f7-button fill class="login-btn" style="width: 90%;margin-left: 5%;margin-top: 24px;">Login</f7-button>

              <p style="width: 60%!important;margin-left: 20%;margin-top:70%;text-align: center;color: #999;font-size: 8px;">-----其他登陆选项-----</p>

              <div style="margin-top: 14px;width: 60%!important;margin-left: 20%;alignment: center;display: flex;flex-direction: row;justify-content:center;">
                  <img src="static/images/google.png" style="width: 36px;height: 36px;"/>
                  <img src="static/images/shouji.png" style="width: 36px;height: 36px;margin-left: 16px;"/>
              </div>
          </f7-page>
      </f7-popup>
  </f7-page>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    import {LoadManager} from 'src/data/loadmanager';
    import GameLoad from "src/pages/components/gameload";

    export default {
        components: {GameLoad},
        data() {
            return {
                actionSignIndex: null,
                loginScreenOpened: false,
                createOpened: false,
                username: '',
                password: '',
                loginDialog: null,
                popupOpened: false,
                countryOpened:false,
                countryCode:"+86",
                countryLabel:"CN",
                isLogin:false,
                isDebug : false,
                toastTopError: null,
                isShowLogin: false
            };
        },
        methods: {
            ...mapMutations(['setAccount','setFbUid']),

            showErrorToast(msg) {
                // const self = this;
                // if ( self.toastTopError == null ) {
                //     self.toastTopError = self.$f7.toast.create(
                //         {
                //             text: msg,
                //             position: 'top',
                //             closeTimeout: 2000,
                //         }
                //     );
                // }
                // self.toastTopError.open();
            },

            //测试登陆
            signIn() {
                const self = this;
                let msg = Request.up.login.create({
                    _login_type: 1,
                    _name: self.username,
                    _password: self.password,
                });

                let buf = Request.up.login.encode(msg).finish();
                self.$f7.preloader.show();
                this.$websocket.send(Types.MsgEnum.login, buf).then((msg)=>{
                    let user = Response.down.login.decode(msg);
                    if ( user._uid > 0 )
                    {
                       let localUser = localStorage.getItem('userid');
                       if ( localUser != null && localUser != user._uid )
                       {
                          localStorage.clear();
                       }

                       localStorage.setItem('userid',user._uid);
                       localStorage.setItem('tokenKey', user._token);
                       localStorage.setItem('type',1);
                       self.$websocket.setLogin(true);
                       //self.setUserId(user._uid);
                       self.getUserInfo(user._uid,this.username,0,null);
                    }
                    self.$f7.preloader.hide();
                });
            },

            getUserInfo( uid,name, sex, head_portrait){
                //console.log("获取用户信息。。。"+head_portrait);
                const self = this
                var msg = Request.up.get_user_info.create({
                    _uid: uid
                });
                console.log(msg);
                var buf = Request.up.get_user_info.encode(msg).finish();
                self.$websocket.send(Types.MsgEnum.get_user_info, buf).then((msg)=>{
                    var userInfo = Response.down.get_user_info.decode(msg);
                    console.log(userInfo);
                    console.log("userName: "+userInfo._user_info._user_base_info._user_name+"headPortrait: "+userInfo._user_info._user_base_info._head_portrait);
                    // 保存自己信息
                    self.setUserInfo({
                        userName: userInfo._user_info._user_base_info._user_name,
                        userId: userInfo._user_info._user_base_info._uid,
                        birthday:userInfo._user_info._user_base_info._birthday,
                        headPortrait:userInfo._user_info._user_base_info._head_portrait,
                        sex:userInfo._user_info._user_base_info._sex,
                        job:userInfo._user_info._user_base_info._job,
                        homeland:userInfo._user_info._user_base_info._homeland,
                        signature:userInfo._user_info._user_base_info._signature,
                        constellation:userInfo._user_info._user_base_info._constellation,
                        isRobot:userInfo._user_info._user_base_info._is_robot,
                        age:0,
                        totalCredit:userInfo._user_info._total_integral,
                        headPortraitFrame:userInfo._user_info._head_portrait_frame,
                        totalBelike:userInfo._user_info._total_belike
                    });
                    self.$dataManager.addUser(
                      userInfo
                    );

                    self.isLogin = false
                    self.$f7.preloader.hide();
                    self.$f7.loginScreen.close();
                    self.$f7.loginScreen.destroy(self.$refs.loginScreenPanel);
                    self.$f7router.navigate('/home/', {
                        clearPreviousHistory:true
                    });

                }, (msg)=>{
                    self.createUser(uid,name, sex, head_portrait)
                });
            },

            getFbUserInfo(accessToken, callback)
            {
                var _this = this;
                var fbUrl="https://graph.facebook.com/me?fields=name,gender,birthday,picture&access_token="+accessToken;
                this.$axios.get(fbUrl).then(response => {
                        var data = response.data
                        var fbHeadUrl="http://graph.facebook.com/"+data.id+"/picture?width=512&height=512";

                        if ( _this.$config.debug )
                        {
                            console.log('facebook login success! ');
                            console.log(data);
                        }

                        if ( callback != null )
                        {
                            callback(
                                {
                                    userId: data.id,
                                    givenName: data.name,
                                    imageUrl: fbHeadUrl,
                                    accessToken: accessToken
                                }
                            )
                        }
                    })
                    .catch(error => {
                        if ( callback )
                        {
                            callback(null);
                        }
                    })
            },

            loginEnter( loginType, id, name, headUrl ,accessToken, callback){
                self = this;
                var msg = null
                if (loginType == 'facebook') {//fb
                    msg = Request.up.login.create({
                        _login_type: 2,
                        _name: id,
                        _password:accessToken
                    });
                } else if(loginType == 'google'){//google
                    msg = Request.up.login.create({
                        _login_type: 6,
                        _name: name,
                        _password:accessToken
                    });
                } else if(loginType == 'auto'){

                    msg = Request.up.login.create({
                        _login_type:4,
                        _password:accessToken
                    });
                } else if(loginType == 'guest')
                {
                    msg = Request.up.login.create({
                        _login_type:3,
                        _name: id
                    });
                }
                console.log(loginType + " " + msg._login_type + " " + msg._name);
                if ( msg != null ) {
                    var buf = Request.up.login.encode(msg).finish();
                    self.$websocket.send(Types.MsgEnum.login, buf).then((msg) => {
                            // 登陆成功返回
                            var resp = Response.down.login.decode(msg);
                            self.$websocket.setLogin(true);
                            self.getUserInfo(resp._uid, name, 0, headUrl);
                            if (resp._uid > 0) {
                                localStorage.setItem('userid', resp._uid);
                                localStorage.setItem('account', name);
                                localStorage.setItem("tokenKey", resp._token);
                                localStorage.setItem('type', loginType);
                            }

                            if ( callback )
                            {
                                callback(resp._uid);
                            }
                        },
                        (msg) => {
                            // 请求失败
                            if ( callback ) {
                                callback(null);
                            }
                        });
                }
                else
                {
                    if ( callback )
                    {
                        callback(null);
                    }
                }
            },

            startLogin( loginType )
            {
                var _this = this;

                if ( _this.$websocket.IsNetworkOnline() == false )
                {
                    console.log('Network unavailable. Play try again');
                    //_this.showErrorToast('Network unavailable. Play try again');
                    return;
                }
                _this.$f7.preloader.show();

                if ( loginType == 'facebook')
                {
                    facebookConnectPlugin.getLoginStatus(function onLoginStatus (status) {
                        if(status.status === 'connected'){
                            console.log('facebook logined ...' + status.authResponse.userID);
                            console.log('facebook accessToken ...' + status.authResponse.accessToken );
                            var result = status;
                            _this.setFbUid(result.authResponse.userID)
                            //获取个人信息
                            _this.getFbUserInfo(result.authResponse.accessToken, (data)=>{

                                if ( data != null )
                                {
                                    //获取成功
                                    console.log(data.userId + ' ' + data.givenName + " " + data.imageUrl + " " + data.accessToken );
                                    _this.loginEnter(loginType, data.userId, data.givenName, data.imageUrl, data.accessToken, (ret) => {
                                        if ( ret == null )
                                        {
                                            console.log('login failure');
                                        }
                                        else
                                        {
                                            _this.$config.loginType = loginType;
                                        }

                                        console.log('logined print login type ' + _this.$config.loginType);
                                        _this.$f7.preloader.hide();

                                    });
                                }
                                else
                                {
                                    //获取失败 notify
                                    _this.$f7.preloader.hide();
                                }
                            })
                        }
                        else
                        {
                            console.log('facebook logined ..5555555555555555555');
                            facebookConnectPlugin.login(['public_profile',"user_friends"],
                                function (fbResult) {
                                    console.log('facebook new login ...' + fbResult.authResponse.userId);
                                    _this.setFbUid(fbResult.authResponse.userID)
                                    //获取个人信息
                                    _this.getFbUserInfo(fbResult.authResponse.accessToken, (data)=>{

                                        if ( data != null )
                                        {
                                            //获取成功
                                            console.log(data.userId + ' ' + data.givenName + " " + data.imageUrl + " " + data.accessToken );
                                            _this.loginEnter(loginType, data.userId, data.givenName, data.imageUrl, data.accessToken, (ret) => {
                                                if ( ret == null )
                                                {
                                                    console.log('login failure');
                                                }
                                                else
                                                {
                                                    _this.$config.loginType = loginType;
                                                }
                                                console.log('logined print login type ' + _this.$config.loginType);
                                                _this.$f7.preloader.hide();
                                            });
                                        }
                                        else
                                        {
                                            //获取失败 notify
                                            _this.$f7.preloader.hide();
                                        }
                                    })

                                }, function (result) {
                                    //_this.showErrorToast('Login Fail, Please Try Again!')
                                    _this.$f7.preloader.hide();
                                });
                        }
                    });
                }
                else if ( loginType == 'google')
                {
                    window.plugins.googleplus.login(
                        {
                            'webClientId': '572025193413-uh9sa0kopn55sh1rkacuk5e74jt8b5q5.apps.googleusercontent.com'
                        },
                        function (data) {
                            //self.thirdLoginSuc(obj,loginType)
                            //result.userId,6,result.givenName,result.imageUrl,result.idToken
                            console.log(data.userId + ' ' + data.givenName + " " + data.imageUrl + " " + data.accessToken );
                            _this.loginEnter(loginType, data.userId, data.givenName, data.imageUrl, data.idToken, (ret)=>{
                                if ( ret == null )
                                {
                                    console.log('login failure');
                                }
                                else
                                {
                                    _this.$config.loginType = loginType;
                                }

                                console.log('logined print login type ' + _this.$config.loginType);
                                _this.$f7.preloader.hide();

                            } );
                        },
                        function (msg) {
                            //google login failure
                            _this.$f7.preloader.hide();
                        }
                    );
                }
                else
                {
                    _this.$f7.preloader.hide();
                }
            },

            fbLogin() {
                this.startLogin('facebook');
            },

            createUser(uid,_role_name,_sex,_head_portrait){
                    const self=this
                    var tempHeadArray = self.$store.getters.getTempHead()
                    let head=self.$store.getters.getPicUrl(tempHeadArray[Math.floor(Math.random() * tempHeadArray.length)])
                    var msg,dateArray;
                    if(null!=_head_portrait){//fb
                          msg = Request.up.create_user.create({
                          _user_name: _role_name,
                          _sex:_sex,
                          _head_portrait:_head_portrait
                      });
                    }else{
                          msg = Request.up.create_user.create({
                          _user_name: _role_name,
                          _sex:_sex,
                          _head_portrait:head
                      });
                    }
                    var buf = Request.up.create_user.encode(msg).finish();
                    this.$websocket.send(Types.MsgEnum.create_user, buf).then((msg)=>{
                    var loginInfo = Response.down.create_user.decode(msg);
                    localStorage.setItem('uid', uid);
                    self.$f7.loginScreen.close();
                    self.getUserInfo(uid,_role_name,_sex,_head_portrait)
                }, (msg)=>{
                    this.$f7.loginScreen.close();
                    this.$f7router.navigate('/create/');
                });
            },

            goolgeLogin() {
                this.startLogin('google');
            },

            closePhoneLogin(){
                this.popupOpened = false
            },

            onPageBeforeRemove() {
                const self = this;
                // Destroy popup when page removed
                if (self.popup) self.popup.destroy();
            },

            openCountrySel(){
                const self = this;
                //console.log("openCountrySel")
                self.countryOpened = true
                self.$f7.views.main.router.navigate("/countrySelect/")
            },
        },

        created(){
            this.isDebug = this.$config.debug;
        },

        mounted(){

            // console.log('enter start up page');
            const _this = this;
            this.$websocket.connect().then(()=>{

                if ( _this.$config.loginIsAuto )
                {
                    _this.isDebug = _this.$config.debug;
                    var token = localStorage.getItem('tokenKey');
                    console.log(token)
                    if (token != null && token.length > 0) {
                        _this.loginEnter('auto', null, null, null, token, (result) => {
                            console.log('token login success');
                        })
                    } else
                    {
                        alert('auto login with device ');
                        //alert('device id ' + device.uuid);
                        var uuid = device.uuid;
                        console.log('device' + uuid);
                        _this.loginEnter('guest', uuid, null, null, null, (result) => {
                            console.log('token login success');
                        })
                    }
                }

            },(msg)=>{

            });

            // const _this = this;
            // _this.isDebug = _this.$config.debug;
            // var token = localStorage.getItem('tokenKey');
            // console.log(token)
            //
            // if ( _this.$config.loginIsAuto && (token != null && token.length > 0)) {
            //     _this.loginEnter('auto', null, null, null, token, (result)=>{
            //         console.log('token login success');
            //     })
            // }
            // else if ( _this.$config.loginType == "guest")
            // {
            //
            // }


            // if ( _this.$config.deviceName != 'browser' && this.$config.debug == false)
            // {
            //     LoadManager.downLoadUrl = _this.$config.downLoadUrl;
            //     LoadManager.initConfigFile(function (result) {
            //         if ( result.ret > 0 )
            //         {
            //            let gameData =  JSON.parse(result.data);
            //           _this.$gameManager.init(gameData);
            //         }
            //
            //         // 獲取
            //         if(null!= token && token.length>0){
            //             //token登陆
            //             _this.loginEnter('auto',null,null,null,token, (result)=>{
            //
            //             });
            //         }
            //     })
            // }
        },

        destroyed(){
            this.$f7.preloader.hide();
            if ( this.toastTopError != null )
            {
                this.toastTopError.destroy()
            }
            this.$f7.loginScreen.destroy(this.$refs.loginScreenPanel);
        }
  };
</script>

<style>

    .signup .page-content{
      overflow: hidden;
    }

    .background{
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .loginbtn{
        transition-duration: .1s;
        transition-property: transform;
        transform: scale(1) !important;
    }

    .loginbtn.active{
        transition-duration: .1s;
        transition-property: box-shadow, transform;
        box-shadow:  0 10px 10px -10px rgba(0, 0, 0, 0.5) !important;
        transform: scale(1.2) !important;
         /*transform:translateZ(0);*/
         /*transition-duration: .5s;*/
         /*transform: scale(1.1)!important;*/
         /*transition-timing-function: cubic-bezier(0.47, 2.02, 0.31, -0.36);*/
     }

    .flex-align-center{
        display:flex; 
        align-items:center; 
        justify-content:center
    }

    .input-txt{
        border:none;
        outline:medium;
        margin-left: 6px;
        height: 40px!important;
        font-size: 16px;
        width:160px;
    }

    .login-btn{

    }
</style>
