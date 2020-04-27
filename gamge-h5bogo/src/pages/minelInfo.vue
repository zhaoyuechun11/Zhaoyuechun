<template>
    <f7-page class="page-per">


        <f7-navbar  no-shadow back-link="Back" class="person-nav no-shadow" >
            <f7-nav-title></f7-nav-title>
            <f7-nav-right>
            <div  class="img-div" ref="uedit" v-show="!showbot">
                <f7-link class="link1" href="/mine/">
                    <img style="width: 20px;height: 20px;padding-left:20px;padding-right: 10px;padding-top: 15px;padding-bottom: 15px" src="static/images/bi.png"/>
                </f7-link>
                <f7-link class="link1">
                <img src="static/images/fenxiang.png"  id="share_btn" v-on:click="share" style="width:20px;height:20px;padding-left:10px;padding-right: 30px;padding-top: 15px;padding-bottom: 15px;"/>
                </f7-link>
            </div>

            <div  class="img-div" ref="uedit" v-show="showbot">
                <f7-link class="link1">
                    <img id="delbtn" style="width: 20px;height: 20px;padding: 10px;margin-left: 0px;display: none" src="static/images/sel_friend.png" v-on:click="delUser"/>
                </f7-link>
            </div>
            </f7-nav-right>
        </f7-navbar>
        　

        <div class=" head-view" style="margin-top: -56px;">


        <div class="head-view parent-flex-col" style="position: relative" ></div>
            <div  class="head-name-view">
                <score-view class="" style="width: 80px;height: 80px;" :gender="getGender(userInfo)" :innerImgUrl="getUrl(userInfo)" :outerImgUrl="outerImage" />
                <template v-if="userInfo!=null">
                    <a style="font-size: 16px;color: white;margin-top: 8px;">{{userInfo.userName}}</a>
                </template>
                <template v-else>
                    <a style="font-size: 16px;color: white;margin-top: 8px;">unset</a>
                </template>
            </div>

            <div class="parent-flex-row trans-bg" style="height:40px;justify-content:center;margin-top: 16px;margin-bottom: 20px">
                <div class="parent-flex-col grow-value;" style="width: 33.3%" >
                    <template v-if="userInfo!=null">
                    <a style="color: white">{{userInfo.age}}</a>
                    </template>
                    <template v-else>
                        <a style="color: white">unset</a>
                    </template>
                    <img src="static/images/age_icon.png" style="width: 20px;height: 8px;margin-top: 4px;">
                </div>
                <img src="static/images/vline.png" class="info-line" >
                <div class="parent-flex-col grow-value " style="width: 33.3%" >
                    <img src="static/images/constedit.png" style="width: 11px;height:13px;margin-top: 4px;margin-bottom: 4px;">
                    <img src="static/images/constell.png" style="width: 86px;height: 8px;margin-top: 4px;">
                </div>
                <img src="static/images/vline.png" class="info-line">
                <div class="parent-flex-col grow-value " style="width: 33.3%" >
                    <img src="static/images/location.png" style="width: 11px;height:13px;margin-top: 4px;margin-bottom: 4px;">
                    <template v-if="userInfo!=null&&userInfo.homeland.length>0">
                        <a style="color: white">{{userInfo.homeland}}</a>
                    </template>
                    <template v-else>
                        <a style="color: white">unset</a>
                    </template>
                </div>
            </div>

            <div style="height: auto;background: white;margin-top: 16px;border-top-left-radius: 12px;border-top-right-radius: 12px;margin: 0px;padding: 24px;">
                <div class="parent-flex-row" style="align-items: center;margin-top: 10px;padding-left: 4px;justify-content:left;">
                    <img src="static/images/uinfo_icon.png" style="width: 10px;height: 10px;">
                    <img src="static/images/userinfo.png" style="width: 98px;height: 12px;margin-left: 10px;">
                </div>
                <div class="parent-flex-row" style="align-items: center;justify-content:left;margin-top: 30px;">
                    <img src="static/images/signlab.png" style="width: 20px;height: 20px;">
                    <template v-if="userInfo!=null&&userInfo.signature!=null&&userInfo.signature.length>0">
                        <a style="color: #999;margin-left: 10px;">signature:{{userInfo.signature}}</a>
                    </template>
                    <template v-else>
                        <a style="color: #999;margin-left: 10px;">signature:nothing</a>
                    </template>

                </div>
                <div class="parent-flex-row" style="align-items: center;margin-top: 30px;">
                    <img src="static/images/xunzhang.png" style="width: 18px;height: 25px;">
                    <f7-swiper class="head-img" id="head" style="width:100px;height: 26px;flex-grow:1;margin-left: 6px;">
                        <f7-swiper-slide style="width: 26px;" v-for="icon in myAchievementIconArray" :key="icon.key">
                            <img v-bind:src="icon"   style="height: 26px;"/>
                        </f7-swiper-slide>
                    </f7-swiper>
                </div>
                <div style="width: 100%;height: 2px;background: #eee;margin-top: 30px;"></div>
                <div class="parent-flex-row" style="align-items: center;margin-top: 42px;padding-left: 4px;justify-content:left;">
                    <img src="static/images/red_circle.png" style="width: 10px;height: 10px;">
                    <img src="static/images/favorotegame.png" style="width: 128px;height: 12px;margin-left: 10px;">
                </div>

                <!-- play games -->
                <f7-block style="margin: 0px 0px; width: auto;margin-top:22px;padding-left: 0px;padding-right: 0px;" >
                    <f7-swiper  scrollbar :params="{speed:500, slidesPerView: 4, spaceBetween: 20}">
                        <f7-swiper-slide id="slide" class="slide-item personal-item" v-for="game in loveGameList" :key="game.key">
                            <div>
                                <img  class="game-item-img" v-bind:src="game.gameImage" style=" border:1px solid #fff;border-radius: 8px;width:80px;height:80px"/>
                            </div>
                        </f7-swiper-slide>
                    </f7-swiper>
                </f7-block>
            </div >
            <!--<div ></div>-->
        </div>

        <f7-popup v-if="userInfo" style="background: transparent!important;" class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
            <f7-page style="background: transparent!important;position: relative">
                <div class="Absolute-Center " style="width: 300px;height: 300px;">

                    <!--<div style="position: relative;height: 50px;background: blue;"></div>-->
                    <score-view class="" style="width: 80px;height: 80px;margin-left: 110px;margin-top: 0px;z-index: 20" :gender="1" :innerImgUrl="getUrl(userInfo)" :outerImgUrl="outerImage"/>
                    <div class="share-dialog" style="position: relative;width: 300px;height: 260px;margin-top: -40px"></div>
                    <div class="parent-flex-col" style="position: relative;margin-top: -220px;z-index: 60;height: 200px;">
                        <template v-if="userInfo!=null">
                            <a style="color: white;margin-top: 10px;font-size: 16px">{{userInfo.userName}}</a>
                        </template>
                        <template v-else>
                            <a style="color: white;margin-top: 10px;font-size: 16px">unset</a>
                        </template>
                        <template v-if="userInfo!=null">
                            <a style="color: white;margin-top: 2px;font-size: 12px">ID:{{userInfo.userId}}</a>
                        </template>
                        <template v-else>
                            <a style="color: white;margin-top: 2px;font-size: 12px">unset</a>
                        </template>
                        <img src="static/images/share_bongo_txt.png" style="width: 161px;height: 23px;margin-top: 42px;"/>
                        <div style="height:60px;margin-top: 30px;" >
                            <img src="static/images/bongo_an_fb.png" style="width: 40px;height:40px;" @click="shareInfo(0)"></img>
                            </div>
                    </div>
                    <img src="static/images/close_icon.png" style="width: 18px;height:18px;margin-right: 0px;margin-top: 0px;padding: 10px" class="Absolute-Center" @click="closeDialog"/>
                </div>

            </f7-page>
        </f7-popup>

    </f7-page>
</template>

<script>
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';

    import {toChatPage} from '../utils/utils.js';
    import {getUserAchievement} from '../data/usermanager.js';

    export default {
        name: "test",
        data () {
            return {
                uid:null,
                
                defHeadaddUrl:"./static/images/head_icon.png",
                defHeadUrl:"./static/images/thumb_4.jpg",
                userInfo:null,
                showbot:true,
                gameIds:null,
                added:false,
                loveGameList:[
                ],
                age:25,
                astro:"摩羯座",
                isFriend:false,
                imgHeight:{
                    height:''
                },
                type:0,
                popupOpened: false,
                dialogSize:{
                    width:'',
                    height:''
                },
                outerImage:null,
                userName:null,
                achievementNameArray:['continue_login','like','belike','use_face','friend','game_win','agile_game_win','brain_game_win','operate_game_win','knowledge_game_win','fortune_game_win','game'],
                achievementIconArray:['./static/images/k1.png','./static/images/k2.png','./static/images/k3.png','./static/images/k4.png','./static/images/k5.png','./static/images/k6.png','./static/images/k7.png','./static/images/k8.png','./static/images/k9.png','./static/images/k10.png','./static/images/k11.png'],
                myAchievementIconArray:[],
            }
        },
        methods:{

            getGender(userInfo){
                return userInfo==null?0:this.userInfo.sex
            },

            getPortraitFrame(){
                const self=this
                var portraitFrame = self.$store.getters.getMyPortraitFrame()
                if(null!=portraitFrame){
                    self.outerImage=portraitFrame.image
                }else{
                    self.outerImage=self.defTransImg
                }
            },

            getPersonal(){
            },

            //编辑个人信息
            edit(){
                console.log("edit")
            },
            //分享
            share(){
                console.log("share")
                let roleHeadBg=localStorage.getItem('roleHeadBg');
                // this.$$('#dialogHead')[0].style.background=roleHeadBg
                this.popupOpened=true
            },
            getUrl(userInfo){
                if(null!=userInfo&& null!=userInfo.headPortrait){
                    var headPort=userInfo.headPortrait
                    if(null!=headPort){
                        return this.$store.getters.getHeadImg(headPort)
                    }
                }else {
                    return this.defHeadaddUrl
                }
            },
            addFriend(){
                const self=this
                console.log(this.added);
                if(self.added==true){
                    return
                }
                console.log('add friends : '+this.uid);
                let msg = Request.up.add_friend.create({
                    _uid: this.uid
                });
                self.$refs.addtext.innerText="+Adding"
                self.added=true
                self.$$('#addBtn')[0].style.background="#ddd"
                let buf = Request.up.add_friend.encode(msg).finish();
                self.$websocket.send(Types.MsgEnum.add_friend, buf).then((msg)=>{
                    console.log("add_friend  success!")
                    // 请求好友列表成功，通过id请求其信息
                    var friend = Response.down.add_friend.decode(msg);
                    console.log(friend)
                })
              .catch((msg)=>{
                  console.log("fail")
              });
            },
            pGoChat(){
                toChatPage(this,this.userInfo.userName,this.userInfo.userId,this.userInfo.headPortrait,this.userInfo.headPortraitFrame)
            },
            getAge(y){

                var today = new Date();//获得当前日期
                var year = today.getFullYear();
                return (year-y)
            },

            delUser(){
                const self=this
                var ac1 = this.$f7.actions.create({
                    buttons: [
                        {
                            text: 'Remove Friend',
                            bold: true,
                            onClick: function () {
                                console.log('Button1 clicked')
                                self.$f7.dialog.confirm('','You will delete your friend,Still Want to go on?', function(){
                                    //Ok
                                    self.removeFriend()
                                },function () {
                                    //Cancel
                                });


                            }
                        }
                    ],
                    onClick:function (action,index) {
                        console.log(index)
                    },

                }).open()
            },

            getFriendList(){
                let _this = this;
                let buf = Request.up.get_friend_list.encode().finish();
                this.$websocket.send(Types.MsgEnum.get_friend_list, buf).then((msg)=>{
                        // 请求好友列表成功，通过id请求其信息
                        let data = Response.down.get_friend_list.decode(msg);
                        let uidList = data._uid_list;
                        console.log("进入个人信息页面请求好友列表成功！");
                        console.log(uidList);
                        console.log(_this.uid);
                        if(uidList==null){
                            return
                        }
                       let index= uidList.indexOf(parseInt(_this.uid))
                        console.log(index);
                        data._uid_list.indexOf(parseInt(_this.uid))>-1&&(_this.$$('#delbtn')[0].style.display="block")
                        data._uid_list.indexOf(parseInt(_this.uid))>-1&&(_this.$refs.addtext.innerText="+Added")
                        data._uid_list.indexOf(parseInt(_this.uid))>-1&&(_this.$$('#addBtn')[0].style.background="#ddd")
                        data._uid_list.indexOf(parseInt(_this.uid))>-1&&(this.added=true)

                        if(_this.type==1){
                            _this.$$('#addBtn')[0].style.width="100%"
                            _this.$$('#chatBtn')[0].style.display="none"
                        }

                    },
                    (error)=>{
                        // 请求失败
                        console.log(error)
                        console.log("进入个人信息页面请求好友列表失败！");
                    });
            },

            removeFriend(){
                let _this = this;

                let msg = Request.up.remove_friend.create({
                    _uid: this.uid
                });
                let buf = Request.up.remove_friend.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.remove_friend, buf).then((msg)=>{
                    console.log("remove friend  success!")
                    // 请求好友列表成功，通过id请求其信息
                    var removeResult = Response.down.remove_friend.decode(msg);
                    _this.$$('#delbtn')[0].style.display="none"
                    console.log(removeResult)
                })
                    .catch((msg)=>{
                        console.log("fail")
                    });
            },

            getHeight(){
                this.imgHeight.height=window.innerWidth+'px';
                this.dialogSize.width=(window.innerWidth-80)+'px'
                this.dialogSize.height=(window.innerWidth-80)+'px'
            },

            closeDialog(){
                this.popupOpened=false
            },

            shareInfo(type){

                facebookConnectPlugin.showDialog({
                        method: "share",
                        href: "https://play.google.com/store/apps/details?id=com.dotjoy.bongo",
                        picture:'http://cdn.download.mpcfiles.info/uploadonly/201901/103/547fab513377770b23b9f7426d6dab32.jpg',
                        name:'BONGO',
                        message:'Bongo VIP Card',
                        caption: 'Meet me in Bongo',
                        description: 'test test',
                    }, function (response) {
                        console.log(response)
                    }, function (response) {
                        console.log(response)
                    }
                );
            }

        },
        beforeRouteEnter (to, from, next) {
            console.log("from: "+from)
        },
        mounted: function () {
            const self=this
            let mineInfo = self.$dataManager.getMyself();
            self.loveGameList=self.$store.getters.getLoveGameList()
            self.userName=mineInfo.userName
            self.getPortraitFrame()
            self.uid = this.$f7route.params["uid"]
            self.type = this.$f7route.params["type"]
            self.showbot = false
            self.userInfo = mineInfo;
            var birthy = self.userInfo.birthday;
            //console.log(birthy)
            if (null != birthy && birthy.length > 0) {
                var dateArray = birthy.split("-")
                let age = self.getAge(dateArray[0])
                console.log(age)
                self.userInfo.age = age
            }
            //console.log(self.userInfo.age)
            getUserAchievement(self.$websocket,this.uid,function (achievementIconArray) {
                console.log(achievementIconArray)
                self.myAchievementIconArray=achievementIconArray
            },function (error) {
                console.log(error)
            })
        },
        activated: function (){
            console.log("activated")
        },
        created:function () {
            console.log("created")
            this.getHeight()
        }
    }
</script>

<style scoped>
    div[class*="col"] {
        background: transparent;
        text-align: center;
        color: #000;
        border: 0px solid #ddd;
        padding: 0px;
        margin-bottom: 0px;
        font-size: 12px;
    }

    .person-nav{
        background:transparent!important;
    }



    .head-view{
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-image: url('../static/images/person_head.png');
    }


    .share-dialog{
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-image: url('../static/images/share_dialog_bg.png');
    }

    .img-div{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction: row;
    }
    .link1{
        padding: 0px!important;
    }

    .userinfo{
        margin-top: 10px;
        display: flex;
        z-index: 30!important;
        display: -webkit-flex; /* Safari */
        flex-direction: column;
    }

    .personal-item{
        margin-top: 0px;
    }

    .p-add-btn{
        alignment: center;
        background:orange;
        width: 50%;

    }
    .p-add-btnsel{
        alignment: center;
        background:#ddd;
        width: 50%
    }

    /*.ios .toolbar-inner {*/
         /*padding: 0px!important;*/
    /*}*/

    .head-img{
        position: relative;
        z-index:0;
    }

    .block-title{
        margin-top:8px!important;
    }

    .ios .toolbar-inner {
        padding: 0 0px;
    }
    .page-per.page-content{
        padding-bottom: 0px!important;
        background: white!important;
        overflow: hidden!important;
    }

    .Absolute-Center {
        width: 50%;
        height: 50%;
        overflow: auto;
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
    }

    .swiper-pagination {
        z-index: 20;
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
    }

    .head-name-view{
        display:flex;
        display: -webkit-flex;
        flex-direction:column;
        align-items: center;
        width: 100px;
        margin-left: 30px;
        margin-top:76px;
        background: transparent;
    }

    .info-line{
        width: 2px;
        height: 100%;
    }

    .grow-value{
        flex-grow:1
    }
    .trans-bg{
        background: transparent;
    }
</style>
