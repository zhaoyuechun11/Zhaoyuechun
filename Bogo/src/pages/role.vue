<template>
    <f7-page style="">
        <div  ref="headview" style="height: 0px; padding-top: 100%; width:100%;background-image: url('static/images/cebian_bg.png');background-size:cover;">
            <div style="position: absolute; top: 70px">
            <div class="parent-flex-row" style="margin-top:20px;margin-left: 30px;justify-content: left;">
                <f7-link class="user-photo" :href="enterinfo()" panel-close>
                    <template v-if="null==userHead">
                            <score-view class="user-photo"  :gender="sex" :innerImgUrl="defHeadUrl" :outerImgUrl="outerImage"/>
                    </template>
                    <template v-else>
                            <score-view class="user-photo" :gender="sex" :innerImgUrl="this.userHead" :outerImgUrl="outerImage"/>
                    </template>
                </f7-link>
                <div class="parent-flex-col-role" style="margin-left: 10px; align-items: flex-start">
                    <div class="f7-li single-line" ref="userName" style="text-transform: capitalize;text-align: left;font-size: 18px;">{{userName}}</div>
                    <div class="f7-li single-line " ref="userId" style="text-align: left">ID: {{userId}}</div>
                </div>
            </div>
            <div class="parent-flex-row" style="justify-content: left;padding-left: 36px;margin-top: 16px;">
                <img src="static/images/bcoin.png" style="width: 30px;height: 30px;">
                <template v-if="totalCredit==0">
                <div class="f7-li single-line" style="height:18px;min-width:20px;font-size: 12px;margin-left: 8px;
                    background-color:rgba(0,0,0,0.5);text-align: center;
                    border-radius: 9px;padding-left: 6px;padding-right: 6px;"  ref="userId">0</div>
                </template>
                <template v-else>
                <div class="f7-li single-line" style="height:18px;min-width:12px;font-size: 12px;padding-left: 10px;
                    padding-right:10px;background-color:rgba(0,0,0,0.2);text-align: center;
                    background: #666666;border-radius: 9px;" ref="userId">{{totalCredit}}</div>
                </template>
                <div  @click="onBindLogin" class="panel-close button button-round button-fill color-red" style="min-width: 0px; height: 17px; font-size: 10px; margin: 0px 5px; line-height: 17px;" >LOGIN</div>
             </div>
            </div>
        </div>
        <f7-list no-hairlines no-hairlines-between style="margin-top: 16px;margin-bottom: 0px">
            <f7-list-item  title = "My Friends"  v-on:click="openPage('/friends/')">
                <img slot="media" src="static/images/myfriend_icon.png" width="28" />
            </f7-list-item>

            <f7-list-item title = "Invite Friends"  v-on:click="openPage('/searchfriends/')">
                <img slot="media" src="static/images/gain_friend.png" width="28" />
            </f7-list-item>
            <f7-list-item style="display: none" title = "Shop" v-on:click="openPage('/scoreStore/')"  panel-close>
                <img slot="media" src="static/images/shop.png" width="28" />
            </f7-list-item>

            <f7-list-item style="display: none" title = "Setting"  @click="openPage('/settings/')"  panel-close>
                <img slot="media" src="static/images/setting.png" width="28" />
            </f7-list-item>
            <f7-list-item title = "Feedback"  @click="comingSoon" panel-close>
                <img slot="media" src="static/images/fankui.png" width="28" />
            </f7-list-item>
            <f7-list-item style="display: none" title = "New Work"  link="/network/" panel-close>
                <f7-icon slot="media" ios="f7:feedback" md="material:feedback"></f7-icon>
            </f7-list-item>

            <f7-list-item style="display: none" title = "ClearStorage"  @click="clearStore" panel-close>
                <f7-icon slot="media" ios="f7:feedback" md="material:feedback"></f7-icon>
            </f7-list-item>

            <f7-list-item style="display: none" title = "Test"  link="/testlogin/" panel-close>
                <f7-icon slot="media" ios="f7:feedback" md="material:feedback"></f7-icon>
            </f7-list-item>
        </f7-list>
    </f7-page>
</template>
<script>
    import { mapMutations } from 'vuex'
    export default {
        props: {
            popOpened:{
                type:Boolean,
                default:false
            }
        },

        data() {
            return {
                userHead: null,
                userName: "pl",
                userId: "1000",
                toastCenter: null,
                totalCredit:0,
                isDebug:false,
                outerImage:null,
                defTransImg:"./static/images/head_icon.png",
                defHeadUrl:'./static/images/playgamedef.png',
                sex:0,
            }
        },

        created(){
            this.setOpenedPanel(this);
            //console.log('role created');
        },

        destroyed(){
            //console.log('destroyed');
        },

        mounted(){
            // this.isDebug = this.$config.debug;
            // let roleHeadBg=localStorage.getItem('roleHeadBg');
            // if(null==roleHeadBg||roleHeadBg.length==0){
            //     var colArray=this.$store.getters.getTempCol()
            //     var colBg=colArray[Math.floor(Math.random() * colArray.length)];
            //     localStorage.setItem('roleHeadBg', colBg);
            //     roleHeadBg=colBg
            // }

            // let width = document.documentElement.clientWidth;
            // this.setScreenWidth(width)
            //
            // //this.$refs.headview.style.height=width*0.75+"px"
            //
            // var viewArray=this.$$('.item-inner')
            // for (let i = 0; i < viewArray.length-1; i++) {
            //     viewArray[i].childNodes[0].style.marginLeft='6px'
            //     viewArray[i].childNodes[0].style.color='#999'
            // }
            //
            // var mediaArray=this.$$('.item-media')
            // for (let i = 0; i <mediaArray.length-1 ; i++) {
            //     mediaArray[i].childNodes[0].style.marginLeft='16px'
            // }
        },
        methods:{
            ...mapMutations(['setOpenedPanel']),
            getPortraitFrame(){
                const self=this
                var portraitFrame = self.$store.getters.getMyPortraitFrame()
                if(null!=portraitFrame){
                    self.outerImage=portraitFrame.image
                }else{
                    self.outerImage=null
                }
            },

            onBindLogin() {
                this.$f7.popup.open('.login-popup', false);
            },

            clearStore(){
                console.log('clear storage');
                localStorage.clear();
            },

            updateRoleInfo(){
                var userInfo = this.$dataManager.getMyself();
                this.userName = userInfo.userName;
                this.userId = userInfo.userId;
                this.userHead=this.$store.getters.getHeadImg(userInfo.headPortrait);
                this.totalCredit=userInfo.totalCredit;
                this.sex=userInfo.sex;
                this.getPortraitFrame();
            },

            enterinfo(){
                return "/mineinfo/"+this.userId;
            },

            comingSoon(){
                //console.log('coming soon');
                this.showToastCenter('Coming Soon')
            },

            showToastCenter(text) {
                const self = this;
                // Create toast
                if (!self.toastCenter) {
                }

                self.toastCenter = self.$f7.toast.create({
                    text: text,
                    position: 'center',
                    closeTimeout: 1000,
                });

                // Open it
                self.toastCenter.open();
            },
            openPage(url){
                let userId = this.$dataManager.getMyselfId();
                var action=null
                var param={'label': userId};
                if(url=='/friends/'){
                    // this.sendClickFriends();
                    action="Click_friends"
                }else if(url=='/addfriends/'){
                    // this.sendClickInvite();
                    action='Click_invite'
                }else if(url=='/settings/'){
                    // this.sendClickSetting();
                    action='Click_setting'
                }else if(url=='/scoreStore/'){
                    action='Click_shop'
                }
                 if ( this.$config.deviceName !== "browser")
                 {
                    facebookConnectPlugin.logEvent(action, param,1, function(){
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
                if(this&&!this._isDestroyed){
                    setTimeout(()=>{
                        this.$f7.panel.close()
                        this.$f7.views.main.router.navigate(url);
                    },200)
                }

            },
            // sendClickFriends() {
            //     // console.log("点击好友");
            //     let userId = this.$dataManager.getMyselfId();
            //     var param = {'label': userId};
            //     if (this.$config.deviceName !== "browser") {
            //         facebookConnectPlugin.logEvent("Click_friends", param, 1, function () {
            //             console.log("logEvent success!");
            //         }, function (error) {
            //             //退出失败
            //             console.log("logEvent failure!");
            //             console.log(error.toString());
            //         });
            //     }
            // },
            // sendClickInvite() {
            //     // console.log("点击邀请");
            //     let userId = this.$dataManager.getMyselfId();;
            //     var param = {'label': userId};
            //     if (this.$config.deviceName !== "browser") {
            //         facebookConnectPlugin.logEvent("Click_invite", param, 1, function () {
            //             console.log("logEvent success!");
            //         }, function (error) {
            //             //退出失败
            //             console.log("logEvent failure!");
            //             console.log(error.toString());
            //         });
            //     }
            // },
            // sendClickShop() {
            //     // console.log("点击打开商店");
            //     let userId = this.$dataManager.getMyselfId();;
            //     var param = {'label': userId};
            //     if (this.$config.deviceName !== "browser") {
            //         facebookConnectPlugin.logEvent("Click_shop", param, 1, function () {
            //             console.log("logEvent success!");
            //         }, function (error) {
            //             //退出失败
            //             console.log("logEvent failure!");
            //             console.log(error.toString());
            //         });
            //     }
            // },
            // sendClickSetting() {
            //     // console.log("点击setting");
            //     let userId = this.$dataManager.getMyselfId();;
            //     var param = {'label': userId};
            //     if (this.$config.deviceName !== "browser") {
            //         facebookConnectPlugin.logEvent("Click_setting", param, 1, function () {
            //             console.log("logEvent success!");
            //         }, function (error) {
            //             //退出失败
            //             console.log("logEvent failure!");
            //             console.log(error.toString());
            //         });
            //     }
            // },
            //点击登陆按钮
            // loginBtn(){
            //     const self=this
            //     self.$f7.panel.close()
            //     if(self&&!self._isDestroyed){
            //         setTimeout(()=> {
            //             self.$EventBus.$emit("openPopEvent",{
            //                 poped: true,
            //             });
            //         },300)
            //     }
            //
            // },
        }
    };
</script>

<style>
    .user-photo {
        width: 60px;
        height: 60px;
        border-radius:30px;
    }
    /*.role-account{*/
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*justify-content:center;*/
        /*font-size:20px;*/
        /*margin-top: 16px;*/
    /*}*/

    /*.ids{*/
        /*display: flex;*/
        /*display: -webkit-flex;*/
        /*justify-content:center;*/
        /*font-size:16px;*/
    /*}*/

    /*.user-info{*/
        /*background: white;*/
        /*margin-bottom: 16px;*/
    /*}*/
    .f7-li{
        color: #FFFFFF;
    }
    .single-line{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .md .list .item-content {
        min-height: 56px;
        padding-left: 16px;
    }

    .parent-flex-row{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
    }

    .parent-flex-col-role{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
    }

</style>
