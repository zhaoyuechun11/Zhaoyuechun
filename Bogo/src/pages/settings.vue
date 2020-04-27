<template>
    <f7-page style="background: #e5e5e5">
    <f7-navbar no-shadow  id="friends-bar" style="background: white">
        <f7-nav-left >
            <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
            </f7-link>
        </f7-nav-left>
        <f7-nav-title>Settings</f7-nav-title>
        <f7-nav-right>
            <img src="static/images/head_icon.png" style="width: 56px;height: 56px"/>
        </f7-nav-right>
    </f7-navbar>
        <f7-list class="settings-list" style="padding-top: 16px;display: none">
            <f7-list-item class="item" title="配对性别" link="/checkeGender/"  ref="genderitem">
                <div>{{gender}}</div>
            </f7-list-item>
            <f7-list-item class="item" title="消息通知"></f7-list-item>
            <f7-list-item class="item" title="WIFI网络自动下载游戏"></f7-list-item>
            <f7-list-item class="item" title="隐私" link="#"></f7-list-item>
            <f7-list-item class="item" title="在社交网站关注我们" link="#">
                <img slot="after" src="static/images/bongo_an_fb.png" style="width: 26px;height: 26px;"></img>
                <img slot="after" src="static/images/bongo_an_fb.png" style="width: 26px;height: 26px;margin-left: 6px;"></img>
            </f7-list-item>
            <f7-list-item class="item" title="黑名单" link="#"></f7-list-item>
        </f7-list>

        <f7-list class="settings-list" style="padding-top: 16px;">
            <f7-list-item  id="cacheitem" @click="clearCache" class="item"title="Clear Cache" link="#" after="0M" ></f7-list-item>
            <f7-list-item class="item"title="About Us" link="/about/" ></f7-list-item>
        </f7-list>

        <f7-list class="settings-list" style="padding-top: 16px;">
            <f7-list-item class="item" title="Sign Out" style="color: orange;" @click="alertLoginOut"></f7-list-item>
        </f7-list>

    </f7-page>
</template>
<script>
    import { EventBus } from "../eventbus.js";
    export default {
        data(){
            return{
                sendVal: false,
                gender:this.$store.getters.getPairGender(),
                cacheSize:"0.0MB"
            }
        },
        methods:{
            goBack(){
                console.log("go back")
                this.$f7router.back()
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
            alertLoginOut(){
                const self=this
                this.$f7.dialog.confirm('','You will leave,Still Want to sign out?', function(){
                    //退出成功
                    localStorage.removeItem("uid");
                    localStorage.removeItem("tokenKey");
                    self.$f7.dialog.close()
                    self.$f7router.navigate({name: 'SignupPage'})

                    if ( self.$config.debug ) {
                        console.log('login type ' + self.$config.loginType);
                    }

                    //Ok
                    if (self.$config.loginType == 'facebook')
                    {
                        facebookConnectPlugin.logout(function(){

                            self.$f7router.navigate({
                                name:"SignupPage"
                            })

                        }, function () {
                            //退出失败
                            console.log('fb logout fail!');
                        });
                    }
                    else if ( self.$config.loginType == 'google' ){
                        window.plugins.googleplus.logout(
                            function (msg) {
                                self.$f7router.navigate({
                                    name:"SignupPage"
                                })
                            }
                        );
                    }
                    else
                    {
                        self.$f7router.navigate({
                            name:"SignupPage"
                        })
                    }
                },function () {
                    //Cancel
                });
            },
            getCacheSize(){
                const self = this
                console.log("getCacheSize");
                if ( this.$config.deviceName != 'browser'){
                    var cacheSize=cordova.plugins.Cache.getCacheSize(function (size) {
                        //获取缓存成功
                        console.log('size: '+size);
                        self.$$('#cacheitem').find('span')[0].innerText=size

                        // console.log(self.$$('#cacheitem').find('span')[0].innerText='10M')
                    },function (error) {
                        //获取缓存失败
                        console.log('获取缓存失败');
                    })
                }
            },
            clearCache() {
                const self = this
                if (self.$config.deviceName != 'browser') {
                    self.$f7.dialog.confirm('', 'Clear cache?', function () {
                        //退出成功
                        self.$f7.dialog.close()
                        //Ok
                        cordova.plugins.Cache.clearCache(function () {
                            //清除缓存成功
                            self.$$('#cacheitem').find('span')[0].innerText = ''
                        }, function (error) {
                            //清除缓存失败
                            console.log('清除缓存失败');
                        })

                    }, function () {
                        //Cancel
                    });
                }
            },

        },

        mounted(){
            const self=this
            self.$$('#cacheitem').find('span')[0].innerText='0M'
            self.$EventBus.$on("changeEvent", ({gender}) => {
                console.log("8888888gender: "+gender)
                self.$nextTick(()=>{
                    // this.backCount += num
                    // this.degValue += deg;
                    console.log("8888888gender: "+gender)
                    self.gender=gender
                })
            });

            if ( self.$config.deviceName != 'browser')
            {
                self.getCacheSize()
            }

            // console.log(self.$$('#cacheitem').find('span')[0].innerText='10M')
        },

        beforeDestroy() {
            //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
            this.$EventBus.$off("changeEvent");
        },

    }
</script>
<style scoped>
    .settings-list{
        height: auto;
        margin: 0px!important;
        margin-top: 0px!important;
    }

    .item{
        background: white;
    }

    .md .list .item-content {
        padding-left: 0px!important;
    }

    .md .list .item-content {
        padding-left: 0px!important;
    }

</style>
