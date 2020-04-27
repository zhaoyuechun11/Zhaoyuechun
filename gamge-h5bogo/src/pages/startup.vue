<template>
    <img class="background" style="width: 100%;height: 100%" src="static/images/background.jpg">
</template>

<script>

    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    export default {
        name: "startup",
        mounted(){
            console.log('enter start up page');
            const _this = this;
            if ( _this.$config.deviceName == "browser" || _this.$config.loginIsAuto == false)
            {
                this.$f7router.navigate('/signup/',{
                    clearPreviousHistory:true
                })
            }
            else {
                var token = localStorage.getItem('tokenKey');
                if (token != null && token.length > 0) {
                    _this.loginEnter('auto', null, null, null, token, (result) => {
                        console.log('token login success');
                    })
                } else {
                    alert('auto login with device ');
                    //alert('device id ' + device.uuid);
                    var uuid = "device_90900";//device.uuid;
                    console.log('device' + uuid);
                    _this.loginEnter('guest', uuid, null, null, null, (result) => {
                        console.log('token login success');
                    })
                }
            }
        },
        methods: {
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
      }
    }
</script>

<style scoped>

</style>
