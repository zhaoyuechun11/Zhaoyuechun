<template>
    <f7-page style="background: transparent!important;">
        <div class="Absolute-Center" style="background: white;width: 86%;height: 40%;margin-left: 7%;margin-top: 55%;border-radius: 20px;">
        <f7-navbar no-shadow style="background: #2196f3;height: 36px;">
            <f7-nav-left>
                <img src="static/images/phoneLoginicon.png" style="width: 26px;height: 26px;margin-left: 16px;" @click="$f7router.back()"/>
            </f7-nav-left>
            <f7-nav-title style="height: 30px!important;line-height: 30px!important;margin-top: 4px!important;font-size:16px!important;color: white; ">Welcome</f7-nav-title>
            <f7-nav-right>
                <f7-link icon="icon-bars" panel-open="right"></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-link href="" style="display:block" class="game">
            <div class="fitem" style="border:1px #999 solid;width: 90%;margin-left: 5%;margin-top: 40px;border-top-left-radius: 4px;border-top-right-radius: 4px;">
                <div class="add-friends" style="margin-top: 0px;margin-bottom:0px;height:40px;background: white;border-radius: 0px;margin-left: 2px;padding-bottom: 0px;padding-top: 0px;">
                    <img  src="static/images/shouji.png"  class="add-friends-img" style="width: 20px;height: 20px;margin-left: 2px!important;" v-on:click.stop="goPersonal(notify)"/>
                    <div style="height: 38px;display: flex;flex-direction: row;align-items: center;justify-content:center;" >
                        <div @click="openCountrySel" style="height: 48px;display: flex;flex-direction: row;align-items: center;justify-content:center;margin-top: 2px">
                        <a style="height:26px;line-height:26px;text-align: center;padding:0px;margin-left: 6px;color: black;font-size: 14px;">
                           {{country.abbreviation}}
                        </a>
                        <a style="height:26px;line-height:26px;text-align: center; padding:0px; margin-left: 6px;color: black;font-size: 14px;">
                            {{country.code}}
                        </a>
                            <img src="static/images/setting.png" style="width: 10px;height: 10px;margin-left: 2px;"/>
                        </div>
                        <input placeholder="Phone Number" type="phone" class="input-txt" :style="inputWidth" id="phoneNumber" style="font-size: 14px;"/>
                    </div>
                </div>
            </div>
            <div class="fitem" style="border:1px #999 solid;width: 90%;margin-left: 5%;border-bottom-left-radius: 4px;border-bottom-right-radius:4px;border-top-width:0px;" >
                <div class="add-friends" style="margin-top: 0px;background: white;height:40px;border-radius: 0px;margin-left:2px;padding-bottom: 0px;padding-top: 0px;">
                    <img  src="static/images/shouji.png"  class="add-friends-img" style="width: 20px;height: 20px;margin-left: 2px!important;" />
                    <div style="height: 48px;display: flex;flex-direction: row;align-items: center;justify-content:center;" >
                        <input placeholder="Verification Code" class="input-txt" :style="inputWidth" id="code-input" style="font-size: 14px;" />
                        <f7-button fill class="yanzheng" :class="{disabled: !this.canClick}" @click="getCode" style="width: 86px;height: 28px;line-height: 28px;padding: 0px!important;text-align: center">{{content}}</f7-button>
                    </div>

                </div>
            </div>
        </f7-link>

        <f7-button fill class="login-btn" style="width: 90%;margin-left: 5%;margin-top: 24px;height: 32px;line-height: 32px;" @click="loginPhone">Login</f7-button>

            <div style="margin-top: 20px;">
                <div style=" display: none; flex-direction: row;justify-content: center;align-items: center;width: 100%;">
                <a style="color: #999;font-size: 10px;">登录时有什么问题吗?</a>
                <a class="button  button-small tooltip-init" style="font-size: 10px;" @click="$f7router.back()">试试其他方法</a>
                </div>
            </div>



        <p style="width: 60%!important;margin-left: 20%;margin-top:60%;text-align: center;color: #999;font-size: 10px;display: none">-----其他登陆选项-----</p>

        <div style="margin-top: 14px;width: 60%!important;margin-left: 20%;alignment: center;display: flex;flex-direction: row;justify-content:center;display: none">
            <img src="static/images/google.png" style="width: 36px;height: 36px;"/>
            <img src="static/images/bongo_an_fb.png" style="width: 36px;height: 36px;margin-left: 16px;"/>
        </div>

        </div>
    </f7-page>
</template>
<script>
    import { mapMutations } from 'vuex'
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    export default {
        components:{
        },
        data(){
            return{
                sendVal: false,
                loginName:null,
                toastCodeResult: null,
                uid:0,
                client:null,
                localStream:null,
                country:this.$store.getters.getCountry(),
                content: 'get code',   // 按钮里显示的内容
                totalTime: 60,          //记录具体倒计时时间
                canClick: true,  //添加canClick
                phoneNum:0,
                inputWidth:{
                    width:''
                },
                totalCount:90,
            }
        },
        created(){
            const self=this
            self.$EventBus.$on("updateCode", ({country}) => {
                self.$nextTick(()=>{
                    console.log("country: "+country)
                    self.country=country
                })
            });
        },
        beforeDestroy() {
            //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
            this.$EventBus.$off("updateCode");
        },
        methods:{
            ...mapMutations(['setUserId','setUserInfo']),
            openMask(index){
                this.sendVal = true;
            },
            clickCancel(){
                console.log('点击了取消');
            },
            clickDanger(){
                console.log('这里是danger回调')
            },
            clickConfirm(){
                console.log('点击了confirm');
            },
            openCountrySel(){
                console.log('点击打开页面!');
                this.$f7router.navigate("/countrySelect/")
            },
            getCode(){
                if(!this.canClick){
                    return
                }
                this.canClick = false
                let clock0 = window.setInterval(() => {
                    this.totalCount--
                    if (this.totalCount < 0) {
                        window.clearInterval(clock0)
                        this.totalCount = 10
                        this.canClick = true   //这里重新开启
                    }
                },1000)

                const self=this
                console.log('点击了getCode');
                let phone=this.$$('#phoneNumber')[0].value
                if(null==phone||phone.length==0){
                    console.log("号码不能为空");
                    return
                }
                if(!/^[0-9]*$/.test(phone)){
                    // alert("请输入数字!");
                    console.log("请输入正确的手机号码");
                    return
                }
                let returnCode=self.country.code
                self.phoneNum=returnCode+phone
                console.log("传入后台号码："+self.phoneNum);


                //0表示国内，1表示国际
                //手机号码传入后台
                var msg = Request.up.account_binding.create({
                    _new_login_type: 5,
                    _new_name: self.phoneNum,
                });
                var buf = Request.up.account_binding.encode(msg).finish();
                self.$websocket.send(Types.MsgEnum.account_binding, buf).then((msg) => {
                        console.log("get code success");
                    },
                    (msg) => {
                        // 获取验证码返回
                        console.log("===============");
                        console.log(msg);
                        let resp = Response.down.exception.decode(msg);
                        console.log(resp);
                        if(resp._result._err_no==0){
                            console.log("获取验证码成功!")
                            if (self && !self._isDestroyed) {
                                //5秒后无论是否登录成功都关闭缓存条
                                self.$f7.preloader.hide();
                                self.countDown()
                                self.toastCodeResult = self.$f7.toast.create({
                                    text: '验证码已发送成功!',
                                    closeTimeout: 3000,
                                    position: 'top',
                                });
                                self.toastCodeResult.open();
                            }
                        }else{
                            console.log("获取验证码失败请检查你的手机号码!")
                            this.canClick = true
                            if (self && !self._isDestroyed) {
                                //5秒后无论是否登录成功都关闭缓存条
                                self.$f7.preloader.hide();
                                self.toastCodeResult = self.$f7.toast.create({
                                    text: '获取验证码失败!',
                                    closeTimeout: 3000,
                                    position: 'top',
                                });
                                self.toastCodeResult.open();
                            }
                        }
                    });

            },
            countDown () {
                // if (!this.canClick){
                //     return
                // }
                // this.canClick = false
                this.content = 'WAITTING '+this.totalTime+'s'
                let clock = window.setInterval(() => {
                    this.totalTime--
                    this.content = 'WAITTING '+this.totalTime + 's'
                    if (this.totalTime < 0) {
                        window.clearInterval(clock)
                        this.content = 'GET CODE'
                        this.totalTime = 10
                        this.canClick = true   //这里重新开启
                    }
                },1000)
            },

            loginPhone(){
                const _this = this
                let phone=this.$$('#phoneNumber')[0].value
                if(null==phone||phone.length==0){
                    console.log("号码不能为空");
                    return
                }
                if(!/^[0-9]*$/.test(phone)){
                    // alert("请输入数字!");
                    alert("Please enter the correct phone number");
                    return
                }

                let code= this.$$('#code-input')[0].value
                if(null==code||code.length==0){
                    alert("Verification code cannot be empty");
                    return
                }
                if(!/^[0-9]*$/.test(code)){
                    // alert("请输入数字!");
                    alert("Please enter the correct phone number");
                    return
                }

                let returnCode=_this.country.code
                _this.phoneNum=returnCode+phone
                _this.$gameManager.bindAccount(5, _this.phoneNum, code, function (result) {
                    console.log(result.result);
                    if (result.result == "success") {

                        localStorage.setItem('userid', result.user.userId);
                        localStorage.setItem('tokenKey', result.user.token);
                        //alert(' game Manager ' + result.isBinded );
                        if ( result.isBinded ){
                            // start logining
                            _this.$gameManager.IsLogin = false;
                            _this.$websocket.setLogin(false);

                            //alert(' already bind ' + result.user.token);
                            _this.$EventBus.$emit('LoginAction', {
                                data : {
                                    type: 'auto',
                                    uuid: null,
                                    token: result.user.token
                                }
                            })

                        }

                        _this.$f7router.back()

                    } else {
                        alert('Repeated binding ');
                    }
                });

                //手机号和验证码发到后台
                // var msg = Request.up.login.create({
                //     _login_type: 5,
                //     _name:self.phoneNum,
                //     _password:code
                // });
                // var buf = Request.up.login.encode(msg).finish();
                // self.$websocket.send(Types.MsgEnum.login, buf).then((msg) => {
                //         console.log(" Phone success");
                //         // 登陆成功返回
                //         var resp = Response.down.login.decode(msg);
                //         if ( resp._uid > 0 )
                //         {
                //             localStorage.setItem('userid',resp._uid);
                //             localStorage.setItem('account', phone);
                //             localStorage.setItem("tokenKey", resp._token);
                //             localStorage.setItem('type',5);
                //         }
                //         self.getUserInfo(resp._uid,phone)
                //     },
                //     (msg) => {
                //         // 请求失败
                //         console.log("000000000000000")
                //     });
            },

            getUserInfo(uid,name){
                console.log("获取用户信息");
                const self=this
                var msg = Request.up.get_user_info.create({
                    _uid: uid
                });
                console.log(msg);
                var buf = Request.up.get_user_info.encode(msg).finish();
                self.$websocket.send(Types.MsgEnum.get_user_info, buf).then((msg)=>{
                    var userInfo = Response.down.get_user_info.decode(msg);
                    //console.log("获取用户信息成功。。。");
                    //console.log(userInfo);
                    // self.setUserInfo({
                    //     userName: userInfo._user_info._user_base_info._user_name,
                    //     userId: userInfo._user_info._user_base_info._uid,
                    //     birthday:userInfo._user_info._user_base_info._birthday,
                    //     headPortrait:userInfo._user_info._user_base_info._head_portrait,
                    //     sex:userInfo._user_info._user_base_info._sex,
                    //     job:userInfo._user_info._user_base_info._job,
                    //     homeland:userInfo._user_info._user_base_info._homeland,
                    //     signature:userInfo._user_info._user_base_info._signature,
                    //     constellation:userInfo._user_info._user_base_info._constellation,
                    //     isRobot:userInfo._user_info._user_base_info._is_robot,
                    //     age:0,
                    //     totalCredit:userInfo._user_info._total_integral,
                    //     headPortraitFrame:userInfo._user_info._head_portrait_frame
                    // });
                    self.$f7.preloader.hide();
                    self.$f7router.navigate('/home/', {
                        clearPreviousHistory:true
                    });
                    self.$dataManager.addUser(userInfo);
                    self.$dataManager.setMyself(userInfo.userId);
                }, (msg)=>{
                    console.log("用户不存在，创建用户。。。");
                    console.log(msg);
                    let type=localStorage.getItem('type');
                    self.createUser(name,0,uid)
                });
            },

            createUser(_role_name,_sex,_uid){
                const self = this
                var tempHeadArray = self.$store.getters.getTempHead()
                let head = self.$store.getters.getPicUrl(tempHeadArray[Math.floor(Math.random() * tempHeadArray.length)])
                console.log("head: " + head);
                var msg = Request.up.create_user.create({
                    _user_name: _role_name,
                    _sex: _sex,
                    _head_portrait: head
                });
                console.log("create user ");
                console.log(msg);
                var buf = Request.up.create_user.encode(msg).finish();
                self.$websocket.send(Types.MsgEnum.create_user, buf).then((msg) => {
                    var loginInfo = Response.down.create_user.decode(msg);
                    console.log("create user success");
                    console.log(loginInfo);
                    console.log("保存uid: " + _uid);
                    localStorage.setItem('uid', _uid);
                    self.$f7.loginScreen.close();
                    self.getUserInfo(_uid, _role_name)
                }, (msg) => {
                    console.log(msg);
                    console.log("create user failure!");
                    // this.$f7.loginScreen.close();
                    // this.$f7router.navigate('/create/');
                });
            },

            getHeight(){
                let winWidth=window.innerWidth;
                let inputWidth=winWidth*0.86;
                console.log(inputWidth);
                this.inputWidth.width=(inputWidth-180)+'px'
                // console.log(top)
            },


        },
        mounted(){
            const self=this
            self.country=self.$store.getters.getCountry()
            self.getHeight()
        },
    }
</script>
<style scoped>
    .input-txt{
        border:none;
        outline:medium;
        margin-left: 6px;
        height: 38px!important;
        font-size: 16px;
        width:100px;
    }

    .yanzheng{
        /*background-color: #ECEFF6!important;*/
        /*color: #999!important;*/
    }
    .disabled{
        background-color: #ddd;
        border-color: #ddd;
        color:#57a3f3;
    }
    .login-btn{

    }
</style>
