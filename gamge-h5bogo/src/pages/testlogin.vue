<template>
    <f7-page>
        <f7-navbar no-shadow id="friends-bar" style="background: transparent">
            <f7-nav-left >
                <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title> TEST </f7-nav-title>
            <f7-nav-right>
                <f7-link href="/searchfriends/" style="width: 56px;height: 56px;padding-left: 13px;padding-right: 13px;">
                    <img src="static/images/add_friend_icon.png" style="width: 22px;height: 20px"/>
                </f7-link>
            </f7-nav-right>
        </f7-navbar>
    <div class="main" style="width: 100%;height: 100%;">
        <div @click="openMask">测试字符串</div>
        <div><input ref="inputtext" style="width: 80%;height: 30px;margin: 10px" /></div>
        <button  class="button1" v-on:click="senddata">发送</button>

        <button  class="button1" v-on:click="sendAudia">发送语音</button>

        <button  class="button1" v-on:click="goolgeLogin">Google登录</button>

        <div id="agora_local"></div>
        <score-view  class="button1" style="width: 80px;height: 80px;" :gender="0" :innerImgUrl="this.innerImgUrl1" :outerImgUrl="this.outerImgUrl1" />
        <!--<integral-item style="width: 180px;height: 180px;" @downLoad="downLoadIntegral"/>-->

        <!--<img-select-items style="width: 360px;height: 60px;" :imgUrls="imgUrls" @selectImg="toastTest"></img-select-items>-->

        <button  class="button1" v-on:click="selectImg">拍照</button>

        <button  style="width: 200px;height: 60px;" v-on:click="testBroadCast">测试</button>

        <button  style="width: 200px;height: 60px;" v-on:click="openDialog">打开弹窗</button>

        <div class="animation-style" ref="anim"></div>


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
                
                uid:0,
                client:null,
                localStream:null,
                innerImgUrl1:"./static/images/temphead06.png",
                outerImgUrl1:"./static/images/k1.png",
                imgUrls:[
                    "./static/images/temphead01.png",
                    "./static/images/temphead02.png",
                ],
            }
        },
        methods:{
            goBack(){
                console.log("go back")
                this.$f7router.back()
            },
            openDialog(){
                this.$f7.f7params.popupOpened=true
            },
            screenOnListener (e) {
                console.log( "ACTION_SCREEN_ON received!" );
            },
            screenOffListener (e) {
                console.log( "ACTION_SCREEN_OFF received!");
            },
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
            senddata(){
                agroaplugin.coolMethod("长洪",function (msg) {
                    console.log(msg);
                    alert(msg)
                },function (error) {
                    
                })
                // this.loginName=this.$refs.inputtext.value
                // console.log(this.loginName);
                // var msg = Request.up.login.create({
                //     _login_type: 2,
                //     _name:this.loginName
                // });
                // console.log("-------------------------------");
                // console.log(msg);
                // var buf = Request.up.login.encode(msg).finish();
                // this.$websocket.send(Types.MsgEnum.login, buf).then((msg) => {
                //         console.log(" fbLogin success");
                //         // 登陆成功返回
                //         var resp = Response.down.login.decode(msg);
                //         console.log(resp);
                //         //解析用户名，性别，生日，头像路径
                //         //发送后台，获取登陆信息，跳转首页
                //         var _role_name,_sex,_head_portrait
                //         // _role_name= data.name
                //         // _head_portrait=data.picture.data.url;
                //         // _sex=0;
                //         // self.createUser(_role_name,_head_portrait,_sex)
                //         // this.game_begin=resp._love_game
                //     },
                //     (msg) => {
                //         // 请求失败
                //         console.log("000000000000000")
                //     });
            },
            sendAudia(){
                const self=this
                self.checkAudio()
            },

            //发布本地音频流
            publish(){
                const self=this
                self.client.publish(localStream, function (err) {
                    console.log("Publish local stream error: " + err);
                });

                self.client.on('stream-published', function (evt) {
                    console.log("Publish local stream successfully");
                });
            },
            goolgeLogin(){
                const self=this
                window.plugins.googleplus.login(
                    {
                    },
                    function (obj) {
                        console.log("登陆成功");
                        let resp=JSON.stringify(obj)
                        console.log(obj.imageUrl);
                        console.log(obj.accessToken);
                        console.log(resp.displayName);
                        alert(JSON.stringify(obj)); // do something useful instead of alerting
                    },
                    function (msg) {
                        alert('error: ' + msg);
                        console.log("登陆失败");
                        console.log(msg);
                        self.googleLogout()
                    }
                );
            },
            googleLogout(){
                window.plugins.googleplus.logout(
                    function (msg) {
                        console.log("退出登录");
                        alert(msg); // do something useful instead of alerting
                    }
                );
            },

            //检查录音权限
            checkAudio(){
                const self=this
                var permissions = cordova.plugins.permissions;
                permissions.hasPermission(permissions.RECORD_AUDIO, function( status ){
                    if ( status.hasPermission ) {
                        console.log("Yes :D ");
                        self.voiceChat()
                    }
                    else {
                        self.getAudioPermission();
                    }
                });
            },

            //获取权限
            getAudioPermission(){
                const self=this
                var permissions = cordova.plugins.permissions;
                permissions.requestPermission(permissions.RECORD_AUDIO, function success( status ) {
                    self.voiceChat()
                },  function error() {
                    console.warn('Camera permission is not turned on');
                });
            },

            //打开语音通话
            voiceChat(){
                agoravoice.voiceChat({
                    token: null,
                    channel: 'channelDemonew',
                    extraString:'this is test',
                },function () {
                    console.log('语音打开成功');
                },function (error) {
                    console.log('语音打开失败');
                })
            },
            //关闭麦克风
            muteLocalAudio(){},

            downLoadIntegral(uid){
                //积分兑换头像

            },

            toastTest(){
                console.log('点击弹窗!');
            },

            selectImg(){
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 90,
                    destinationType: Camera.DestinationType.DATA_URL,
                    allowEdit:true,
                    targetWidth:512,
                    targetHeight:512,
                    correctOrientation:true,
                });

                function onSuccess(imageData) {

                    console.log(imageData)
                    console.log('拍照成功！')
                }

                function onFail(message) {
                    console.log("拍照失败。")
                    console.log('Failed because: '+message)
                    // alert('Failed because: ' + message);
                }
            },

            testBroadCast(){
                broadcaster.addEventListener( "SCREEN_ON",this.screenOnListener);
                broadcaster.addEventListener( "SCREEN_OFF",this.screenOffListener);
            },
        },
        mounted() {
            const self = this
            self.$lottie.loadAnimation({
                container: this.$refs.anim,
                renderer: 'svg',
                loop: true,
                autoplay: true
            })
        },
    }
</script>
<style scoped>

    .button1{
        width: auto;
        height: 30px;
    }

</style>
