<template>
    <f7-page class="page-per">
        <f7-navbar  no-shadow back-link="Back" class="person-nav no-shadow" >
            <f7-nav-title></f7-nav-title>
            <f7-nav-right>
                <div  class="img-div" ref="uedit" v-show="showbot">
                    <f7-link class="link1">
                        <img id="delbtn" style="width: 20px;height: 20px;padding: 10px;margin-left: 0px;display: none" src="static/images/sel_friend.png" v-on:click="delUser"/>
                    </f7-link>
                </div>
            </f7-nav-right>
        </f7-navbar>

        <f7-toolbar bottom-md  class="no-shadow no-border" v-show="showbot"  ref="bot" id="bottom" style="margin-bottom:12px;width:90%;margin-left: 5%;" color="oldlace">
            <f7-link class="p-add-btn" :class="{'p-add-btnsel':added == true}" @click="addFriend" id="addBtn" style="font-size: 16px"><p  ref="addtext">+ Add</p></f7-link>
            <f7-link style="alignment: center;width: 50%;background: #eee;border-top-right-radius: 24px;border-bottom-right-radius: 24px;" @click="pGoChat" id="chatBtn"><p style="color: #999999;font-size: 16px" >Chat</p></f7-link>
        </f7-toolbar>

        <div class=" head-view" style="margin-top: -56px;">
            <div class="head-view parent-flex-col" style="position: relative" ></div>
            <div  class="head-name-view">
                <score-view class="" style="width: 80px;height: 80px;" :gender="1" :innerImgUrl="getUrl(userInfo)" :outerImgUrl="getOuterUrl(userInfo)"/>
                <template v-if="userInfo!=null">
                    <a style="font-size: 16px;color: white;margin-top: 8px;">{{userInfo.userName}}</a>
                </template>
                <template v-else>
                    <a style="font-size: 16px;color: white;margin-top: 8px;">unset</a>
                </template>
            </div>

            <div class="parent-flex-row trans-bg" style="height:40px;justify-content:center;margin-top: 16px;margin-bottom: 20px">
                <div class="parent-flex-col grow-value" >
                    <template v-if="userInfo!=null">
                        <a style="color: white">{{userInfo.age}}</a>
                    </template>
                    <template v-else>
                        <a style="color: white">unset</a>
                    </template>
                    <img src="static/images/age_icon.png" style="width: 20px;height: 8px;margin-top: 4px;">
                </div>
                <img src="static/images/vline.png" class="info-line" >
                <div class="parent-flex-col grow-value ">
                    <img src="static/images/constedit.png" style="width: 11px;height:13px;margin-top: 4px;margin-bottom: 4px;">
                    <img src="static/images/constell.png" style="width: 86px;height: 8px;margin-top: 4px;">
                </div>
                <img src="static/images/vline.png" class="info-line">
                <div class="parent-flex-col grow-value ">
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
                <div class="parent-flex-row" style="align-items: center;justify-content:left;margin-top: 10px;padding-left: 4px;">
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
                <div class="parent-flex-row" style="align-items: center;justify-content:left;margin-top: 30px;">
                    <img src="static/images/xunzhang.png" style="width: 18px;height: 25px;">
                    <f7-swiper class="head-img" id="head" style="width:100px;height: 26px;flex-grow:1;margin-left: 6px;">
                        <f7-swiper-slide style="width: 26px;" v-for="icon in myAchievementIconArray" :key="icon.key">
                            <img v-bind:src="icon"   style="height: 26px;"/>
                        </f7-swiper-slide>
                    </f7-swiper>
                </div>
                <div style="width: 100%;height: 2px;background: #eee;margin-top: 30px;"></div>
                <div class="parent-flex-row" style="align-items: center;justify-content:left;margin-top: 42px;padding-left: 4px;">
                    <img src="static/images/red_circle.png" style="width: 10px;height: 10px;">
                    <img src="static/images/favorotegame.png" style="width: 128px;height: 12px;margin-left: 10px;">
                </div>

                <!-- play games -->
                <f7-block style="margin: 0px 0px; width: auto;margin-top:22px;padding-left: 0px;padding-right: 0px;" >
                    <f7-swiper  scrollbar :params="{speed:500, slidesPerView: 4, spaceBetween: 20}">
                        <f7-swiper-slide id="slide" class="slide-item personal-item" v-for="game in loveGameList" :key="game.key">
                            <div>
                                <img  class="game-item-img" v-bind:src="game._gameIcon" style=" border:1px solid #fff;border-radius: 8px;width:80px;height:80px"/>
                            </div>
                        </f7-swiper-slide>
                    </f7-swiper>
                </f7-block>
            </div >
            <!--<div ></div>-->
        </div>
    </f7-page>
</template>

<script>
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';

    import {toChatPage,getHeadPortraitById} from '../utils/utils.js';
    import {getUserInfo,getUserAchievement,removeFriend}from '../data/usermanager.js';
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
                    {
                        _uid:"Fun Link",
                        _gameIcon:"./static/icon/lianliankan.jpg"
                    },
                    {
                        _uid:"Slices",
                        _gameIcon:"./static/icon/slices.jpg"
                    },
                    {
                        _uid:"Knife Throw",
                        _gameIcon:"./static/icon/feidao.jpg"
                    },
                    {
                        _uid:"Stick Man",
                        _gameIcon:"./static/icon/stickman.png"
                    }
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
                myAchievementIconArray:[],
            }
        },
        methods:{
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
                this.$$('#dialogHead')[0].style.background=roleHeadBg
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
                self.$refs.addtext.innerText="+Adding"
                self.added=true
                self.$$('#addBtn')[0].style.background="#999"

                // addFriend(self.$websocket,this.uid,function (friend) {
                //
                // },function () {
                //
                // })

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
                let friendList=_this.$dataManager.getAllFriend()
                if(friendList==null){
                    return
                }
                let index= friendList.indexOf(parseInt(_this.uid))
                console.log(index);
                friendList.indexOf(parseInt(_this.uid))>-1&&(_this.$$('#delbtn')[0].style.display="block")
                friendList.indexOf(parseInt(_this.uid))>-1&&(_this.$refs.addtext.innerText="+Added")
                friendList.indexOf(parseInt(_this.uid))>-1&&(_this.$$('#addBtn')[0].style.background="#ddd")
                friendList.indexOf(parseInt(_this.uid))>-1&&(this.added=true)

                if(_this.type==1){
                    _this.$$('#addBtn')[0].style.width="100%"
                    _this.$$('#addBtn')[0].style.borderTopRightRadius=24+"px";
                    _this.$$('#addBtn')[0].style.borderBottomRightRadius=24+"px";
                    // border-top-right-radius: 0px;
                    // border-bottom-right-radius: 0px;
                    _this.$$('#chatBtn')[0].style.display="none"
                }
            },

            removeFriend(){
                let _this = this;
                removeFriend(this.$websocket,this.uid,function (result) {
                    console.log(result)
                    _this.$$('#delbtn')[0].style.display="none"

                    _this.$dataManager.removeFriend(this.uid);

                },function (error) {
                    console.log("fail")
                })
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
            },

            getOuterUrl(userInfo){
                const self=this
                let headPortraitFrameArray = self.$store.getters.getHeadPortraitFrameArray()
                return getHeadPortraitById(headPortraitFrameArray,userInfo)
            },

        },
        beforeRouteEnter (to, from, next) {
            console.log("from: "+from)
        },
        mounted: function () {
            this.uid = this.$f7route.params["uid"]
            this.type = this.$f7route.params["type"]
            //判断是否为好友
            //console.log("获取朋友列表")
            let _this = this;
            _this.getFriendList();
            //获取最喜爱游戏
            //获取当前用户的勋章
            getUserAchievement(self.$websocket,this.uid,function (achievementIconArray) {
                console.log(achievementIconArray)
                _this.myAchievementIconArray=achievementIconArray
            },function (error) {
                console.log(error)
            })
            _this.showbot = true
            console.log("获取用户信息")
            getUserInfo(_this.$websocket, _this.uid, function (resp) {
                console.log(resp);
                let userBaseInfo=resp._user_info._user_base_info
                _this.userInfo={
                    userName: userBaseInfo._user_name,
                    userId:userBaseInfo._uid,
                    birthday: userBaseInfo._birthday,
                    headPortrait:userBaseInfo._head_portrait,
                    sex:userBaseInfo._sex,
                    job:userBaseInfo._job,
                    homeland:userBaseInfo._homeland,
                    signature:userBaseInfo._signature,
                    constellation:userBaseInfo._constellation
                }
                let birthy = _this.userInfo.birthday;
                if(null!=birthy&&birthy.length>0){
                    let dateArray = birthy.split("-")
                    if ( dateArray.length == 3 ) {
                        let ages=_this.getAge(dateArray[0])
                        _this.userInfo.age=ages
                    }
                }else{
                    _this.userInfo.age=0
                }

            }, function (error) {
                console.log("get user info error! ")
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

    .list-block{
        background: white;
        padding: 0px!important;
        margin: 0px!important;
    }
    .person-nav{
        background:transparent!important;
    }
    .head-view{
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-image: url('../static/images/person_head.png');
    }


    .img-div{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction: row;
    }
    .link1{
        padding: 0px!important;
    }
    .nickname{
        display: flex!important;
        display: -webkit-flex!important; /* Safari */
        flex-direction: row;
    }

    .userinfo{
        margin-top: 10px;
        display: flex;
        z-index: 30!important;
        display: -webkit-flex; /* Safari */
        flex-direction: column;
    }
    .sign{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction: row;
        margin-left: 10%;
        margin-top: 16px;
        align-items: center;
    }
    .user{

    }

    .personal-item{
        margin-top: 0px;
    }
    .parent{
        position: relative;
        background: dodgerblue;

    }

    .bottom-bar{
        width: 100%;
    }

    .base-info{
        margin-left: 5%;
        z-index:9!important;
        position: absolute;
    }

    /*.ios .toolbar-inner {*/
    /*padding:0px;*/
    /*}*/

    .p-add-btn{
        alignment: center;
        background:#FB5295;
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
        width: 50%;

    }
    .p-add-btnsel{
        alignment: center;
        background:#999;

        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;

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
