<template>
    <f7-page class="page-per">
        <f7-navbar  no-shadow back-link="Back" class="person-nav no-shadow" >
            <f7-nav-title></f7-nav-title>
            <f7-nav-right>
            <div  class="img-div" ref="uedit" v-show="!showbot">
                <f7-link class="link1" href="/mine/">
                    <img style="width: 17px;height: 18px;padding-left:20px;padding-right: 10px;padding-top: 15px;padding-bottom: 15px" src="static/images/bi.png"/>
                </f7-link>
                <f7-link class="link1">
                <img src="static/images/fenxiang.png"  id="share_btn" v-on:click="share" style="width:15px;height:17px;padding-left:10px;padding-right: 30px;padding-top: 15px;padding-bottom: 15px;"/>
                </f7-link>
            </div>

            <div  class="img-div" ref="uedit" v-show="showbot">
                <f7-link class="link1">
                    <img id="delbtn" style="width: 20px;height: auto;padding: 10px;margin-left: 0px;display: none" src="static/images/sel_friend.png" v-on:click="delUser"/>
                </f7-link>
            </div>
            </f7-nav-right>
        </f7-navbar>　

        <f7-toolbar bottom-md  class="no-shadow no-border" v-show="showbot"  ref="bot" id="bottom"  color="oldlace">
            <f7-link class="p-add-btn" :class="{'p-add-btnsel':added == true}" @click="addFriend" id="addBtn" style="font-size: 16px"><p  ref="addtext">+ Add</p></f7-link>
            <f7-link style="alignment: center;width: 50%;color: #999999" @click="pGoChat" id="chatBtn"><p style="color: #999999;font-size: 16px" >Chat</p></f7-link>
        </f7-toolbar>

        <f7-list class="list-block" no-hairlines v-if="userInfo">

                <div class="head-view" id="head-view" :style="imgHeight" >
                    <!--<img v-bind:src="getUrl(userInfo)" class="head-img" id="head" :style="imgHeight"/>-->
                    <f7-swiper class="head-img" id="head" :style="imgHeight">
                        <f7-swiper-slide style="width: 100%!important;">
                            <img v-bind:src="getUrl(userInfo)"   :style="imgHeight"/>
                        </f7-swiper-slide>
                        <!--<f7-swiper-slide style="width: 100%!important;">-->
                            <!--<img v-bind:src="getUrl(userInfo)"   :style="imgHeight"/>-->
                        <!--</f7-swiper-slide>-->
                        <!--<f7-swiper-slide style="width: 100%!important;">-->
                            <!--<img v-bind:src="getUrl(userInfo)"   :style="imgHeight"/>-->
                        <!--</f7-swiper-slide>-->
                    </f7-swiper>

                    <div class="base-info" style="margin-top:-80px;" >
                        <div class="nickname">
                            <a style="color:white;font-size: 20px">Nickname:</a>
                            <template v-if="userInfo!=null">
                                <a class="single-line" style="width:200px;color:white;font-size: 20px;margin-left: 8px;">{{userInfo.userName}}</a>
                            </template>
                            <template v-else>
                                <a style="width:200px;color: white;font-size: 18px;margin-left: 8px;">unset</a>
                            </template>
                        </div>

                        <div class="nickname" style="margin-top: 6px;">
                            <a style="color: white;font-size: 12px">Age:</a>

                            <template v-if="userInfo!=null">
                                <a style="width:26px;color: white;font-size: 12px;margin-left: 6px;">{{userInfo.age}}</a>
                            </template>
                            <template v-else>
                                <a style="width:40px;color: white;font-size: 12px;margin-left: 6px;">unset</a>
                            </template>

                            <a style="color: white;font-size: 12px;margin-left: 4px;display: none">constellation:</a>
                            <template v-if="userInfo!=null">
                                <a style="width:40px;color: white;font-size: 12px;margin-left: 4px;display: none">{{userInfo.constellation}}</a>
                            </template>
                            <template v-else>
                                <a style="width:40px;color: white;font-size: 12px;margin-left: 6px;display: none">unset</a>
                            </template>
                            <a style="color: white;font-size: 12px;margin-left: 26px;">Area:</a>
                            <template v-if="userInfo!=null">
                              <a  class="single-line" style="width:100px;color: white;font-size: 12px;margin-left: 4px;">{{userInfo.homeland}}</a>
                            </template>
                            <template v-else>
                                <a  class="single-line" style="width:100px;color: white;font-size: 12px;margin-left: 6px;">unset</a>
                            </template>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 20px" class="userinfo">
                    <a style="color: black;margin-left: 10%;">UserInfo</a>
                    <div class="sign">
                        <img  style="width: 10px;height: 10px;margin-left: 6px" src="static/images/qianming.png"/>
                        <a style="margin-left: 12px;color: #999999">Signature:</a>
                        <template v-if="userInfo!=null">
                                <a style="margin-left: 6px;color: black">{{userInfo.signature}}</a>
                        </template>
                        <template v-else>
                            <a style="margin-left: 6px;color: black">unset</a>
                        </template>
                    </div>
                    <div class="sign">
                        <img  style="width: 9px;height: 14px;margin-left: 6px" src="static/images/prize.png"/>
                        <a style="margin-left: 12px;color: #999999">1star</a>
                    </div>

                    <a style="width: 86%;height: 2px;background: #c6c6c6;margin-top: 26px;margin-left: 7%;margin-right: 7%"></a>
                    <div class="sign" style="display:none">
                        <a style="width:72%;color:black">Favourite Games</a>
                        <a style="margin-left: 12px;color:black;display: none">More</a>
                        <img  style="width: 12px;height: 18px;margin-left: 6px;padding: 6px;display: none" src="static/images/moregame.png"/>
                    </div>

                    <!-- play games -->
                    <f7-block style="margin: 0px 0px; width: 100%" >
                        <f7-block-title style="color: black" class="block-title">Favourite Games</f7-block-title>
                        <f7-swiper id="cus-scrollbars" scrollbar :params="{speed:500, slidesPerView: 4, spaceBetween: 0}">
                            <f7-swiper-slide id="slide" class="slide-item personal-item" v-for="game in loveGameList" :key="game.key">
                                <div class="game-item">
                                    <img  class="game-item-img" v-bind:src="game._gameIcon" style=" border:1px solid #fff;border-radius: 6px;width:66px;height: 66px"/>
                                    <!--<div style=" margin:0px auto;text-align:center;">{{game._uid}}</div>-->
                                </div>
                            </f7-swiper-slide>
                        </f7-swiper>
                    </f7-block>

                </div>

                <!--<div style="height: 60px"></div>-->
                <!--<f7-block-footer>Block Footer</f7-block-footer>-->
            </f7-list>

        <f7-popup v-if="userInfo" style="background: transparent!important;" class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
            <f7-page style="background: transparent!important;position: relative">
                <div class="Absolute-Center" style="width: 300px;height: 300px;">

                <div style="background: white;display: flex;flex-direction: column;width: 300px;height: 300px;"  class="Absolute-Center">

                <div style="width: 100%;height: 130px;background:blue;position: relative" id="dialogHead">
                    <img v-bind:src="getUrl(userInfo)" style="width: 90px;height:90px;border:1px solid white;border-radius: 46px;" class="Absolute-Center"/>
                </div>
                    <!--<div style="height: 20px;background: blue;"></div>-->
                    <a style="color: black;text-align: center;padding-top: 16px;padding-bottom: 10px;">{{userInfo.userName}}</a>
                    <div style="display: flex;flex-direction: row;justify-content: center">
                        <a style="color: black;text-align: center;padding-bottom: 6px;font-size: 16px;">ID:</a>
                        <a style="color: black;text-align: center;padding-bottom: 6px;font-size: 16px;">{{userInfo.userId}}</a>
                    </div>
                    <a style="color: #999;text-align: center;">- 与朋友分享您的bongo名片吧 -</a>
                    <div style="position: relative;height:60px;" >
                        <img src="static/images/bongo_an_fb.png" style="width: 40px;height:40px;" class="Absolute-Center" @click="shareInfo(0)"></img>
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

    export default {
        name: "test",
        data () {
            return {
                uid:null,
                
                defHeadaddUrl:"./static/images/head_icon.png",
                defHeadUrl:"./static/images/head_icon.jpg",
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
            this.uid = this.$f7route.params["uid"]
            this.type = this.$f7route.params["type"]
           //判断是否为好友
            //console.log("获取朋友列表")
            self.getFriendList();
            let mineInfo = self.$dataManager.getMyself();
            if (mineInfo.userId == this.uid) {
                this.showbot = false
                this.userInfo = mineInfo;
                var birthy = this.userInfo.birthday;
                console.log(birthy)
                if(null!=birthy&&birthy.length>0){
                    var dateArray=birthy.split("-")
                    let age=self.getAge(dateArray[0])
                    console.log(age)
                    this.userInfo.age=age
                }
                console.log(this.userInfo.age)
            } else {
                //其他用户
                let _this = this;

                //setTimeout(function () {

                    _this.showbot = true
                    console.log("获取用户信息")
                    //获取个人信息
                    let msg = Request.up.get_user_info.create({
                        _uid: _this.uid
                    });

                    let buf = Request.up.get_user_info.encode(msg).finish();
                    _this.$websocket.send(Types.MsgEnum.get_user_info, buf).then((msg) => {
                            //console.log(" getUserInfo success");
                            //console.log("获取用户信息成功")
                            // 请求好友列表成功，通过id请求其信息
                            let resp = Response.down.get_user_info.decode(msg);
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
                            // this.$set(this.userInfo,"userName",userBaseInfo._user_name);
                            // this.$set(this.userInfo,"userId",userBaseInfo._uid);
                            // this.$set(this.userInfo,"birthday",userBaseInfo._birthday);
                            // this.$set(this.userInfo,"headPortrait",userBaseInfo._head_portrait);
                            // this.$set(this.userInfo,"sex",userBaseInfo._sex);
                            // this.$set(this.userInfo,"job",userBaseInfo._job);
                            // this.$set(this.userInfo,"homeland",userBaseInfo._homeland);
                            // this.$set(this.userInfo,"signature",userBaseInfo._signature);
                            // this.$set(this.userInfo,"constellation",userBaseInfo._constellation);
                            //console.log(uinfo);
                            let birthy = _this.userInfo.birthday;
                            if(null!=birthy&&birthy.length>0){
                                let dateArray = birthy.split("-")
                                if ( dateArray.length == 3 ) {
                                    let ages=self.getAge(dateArray[0])
                                    _this.userInfo.age = ages;
                                }
                            }

                        },
                        (msg) => {
                            // 请求失败
                            console.log("000000000000000")
                            console.log("获取用户信息失败")
                        });

                //}, 10)
            }

            /*
            //获取喜爱的游戏
            var msg = Request.up.get_love_game_list.create({
                _uid: this.uid
            });
            var buf = Request.up.get_love_game_list.encode(msg).finish();
            this.$websocket.send(Types.MsgEnum.get_love_game_list, buf).then((msg) => {
                    //console.log(" getLoveGame success");
                    // 请求好友列表成功，通过id请求其信息
                    var resp = Response.down.get_love_game_list.decode(msg);
                    console.log(resp);
                    // this.game_begin=resp._love_game
                },
                (msg) => {
                    // 请求失败
                    console.log("000000000000000")
                });*/
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
        background: #fff;
        text-align: center;
        color: #000;
        border: 1px solid #ddd;
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
        background:#ED9A00!important;
    }
    .head-view{
        background-color:#ED9A00;
        width: 100%;
        position: relative;
        margin: auto;
        padding-left: 0px;
        padding-right: 0px;
    }

    .head-view img{
        top: 0px!important;
        bottom:0!important;
        left: 0!important;
        right:0!important;
        margin: auto;
        width: 100%;
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

</style>
