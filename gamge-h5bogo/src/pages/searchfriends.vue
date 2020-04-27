<template>
    <f7-page>

        <f7-navbar no-shadow id="add-friends-bar" style="background: white" class="no-shadow">
            <f7-nav-left >
                <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title class="search-title" >ADD FRIENDS</f7-nav-title>
            <f7-nav-right>
                <img src="static/images/head_icon.png" style="width: 56px;height: 56px"/>
            </f7-nav-right>
            <f7-subnavbar :inner="false" id="subnavbar" class="no-shadow">
                <div class="" style="border-radius: 0px;background: white;width: 100%">
                    <div class="search-div" style="background: #EEEEEE;height: 40px;width: 90%;margin-left: 5%;margin-right: 5%">
                        <img src="static/images/search.png" style="width: 22px;height: 20px;margin-left: 24px"/>
                        <input ref="input1" type="search" style="color: #999;margin-left: 30px;font-size: 18px;height: 22px;line-height: 22px;"
                               placeholder="SEARCH BY NICKNAME OR ID" @keypress="show"/>
                    </div>
                </div>
            </f7-subnavbar>
        </f7-navbar>

        <f7-link style="display:none;margin-top: 12px;" class="game">
            <div class="add-friends" style="">
                <img src="static/images/bongo_an_fb.png" class="add-friends-img" style="width:42px;height:42px;margin-left: 0px;"/>
                <p style="margin-left: 20px;color: #515151;width: 146px;">FACEBOOK FRIENS</p>
                <input type="button"  style="margin-left: 24px;height: 30px;width: 80px;background: #318DE3;border-radius: 15px;
                border: 1px solid transparent;outline:none;color: white" value="BINDING" @click="bindFb"></input>
            </div>
        </f7-link>
        <p class="line-item" style=""/>


        <div class="noting-parent" style="display: block;padding: 0px;align-items: center"  ref="nothing">
            <!--<a class="no-div">No body found</a>-->
            <div class="parent-flex-col">
                <img src="static/images/nofriend_bg.png" style="width: 200px;height: 210px;margin-top: 80px;">
                <a style="margin-top: 26px;font-size: 16px;color: #515151">PLAY WITH FRIENDS</a>
                <a style="margin-top: 6px;color: #999">SEARCH FOR FRIENDS ON BONGO</a>
            </div>

        </div>

        <f7-list class="" v-for="(friend,index) in friendList"  :key="friend.key">
            <f7-link style="display:block" class="game">
                <div class="fitem" v-on:click="goChat(friend)">
                    <div class="add-friends" style="width: 100%; margin-top: 0px;background: white;border-radius: 0px;margin-left: 0px">
                        <!--<img v-bind:src="getHeadImg(friend)"  class="add-friends-img"/>-->
                        <score-view  class="this-add-friends-img" style="width: 52px!important;height: 52px!important"  :gender="getSex(friend)" v-on:click.stop="goPersonal(friend)" :innerImgUrl="getHeadImg(friend)" :outerImgUrl="getOuterUrl(friend)" />
                        <div style="height: 60px;width:41%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;font-size: 16px;">{{friend._user_name}}</a>
                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;font-size: 10px;">{{friend._uid}}</a>
                        </div>
                        <input type="button" class="add-btn bg-class" :class="{'bsel':isMyFriend(friend._uid)}" :value="getText(friend._uid)" v-on:click.stop="addfriends(index,friend)" :key="index"/>
                    </div>
                    <!--<a style="width: 100%;height: 1px;background: #ddd"></a>-->
                </div>
            </f7-link>
            <p class="line-item" style=""/>
        </f7-list>
    </f7-page>
</template>

<script>
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';

    import { getHeadPortraitFrameImage,toChatPage} from '../utils/utils.js';
    import {searchFriend}from '../data/usermanager'

    export default {
        name: "test",
        data () {
            return {
                sites: [
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] }
                ],
                keycode:0,
                friendList:null,
                defHeadUrl:'./static/images/morentou.png',
            }
        },

        mounted(){

        },

        methods:{

            getSex(friend){
                return friend._sex
            },

            goBack(){
                console.log("go back")
                this.$f7router.back()
            },
            bindFb(){
                console.log("bindFb")
            },

            onEnable: function (event) {
                console.log('enable');
            },

            onDisable: function (event) {
                console.log('disable');
            },

            isMyFriend: function(uid){
                return this.$dataManager.isMyFriend(uid) || this.$dataManager.isSendAddFriend(uid);
            },

            getText : function(uid){
                if ( this.$dataManager.isMyFriend(uid) )
                {
                    return 'Friend';
                }
                else if ( this.$dataManager.isSendAddFriend(uid) )
                {
                    return 'ADDING';
                }
                else
                {
                    return 'ADD';
                }
            },

            show:function (event) {
                const self=this
                let code=event.keyCode
                //console.log('code: '+code);
                let selValue=self.$refs.input1.value
                if(code==13){
                    self.$refs.input1.blur();
                    self.$refs.input1.value=""
                    self.keycode=code
                    searchFriend(this.$websocket,selValue,1,function (list) {
                        self.friendList=list;
                        let size=self.friendList.length;
                        if(size>0){
                            self.$refs.nothing.style.display= "none"
                        }else{
                            self.$refs.nothing.style.display= "block"
                        }
                    },function (error) {
                        self.$refs.nothing.style.display= "inline";
                    })
                    // 调用搜索接口
                    // let nameOrId=this.$refs.input1.value
                    // let msg = Request.up.search_friend.create({
                    //     _uid_or_name: selValue,
                    //     _page:1
                    // });
                    // let buf = Request.up.search_friend.encode(msg).finish();
                    // this.$websocket.send(Types.MsgEnum.search_friend, buf).then((msg)=>{
                    //       let resp=Response.down.search_friend.decode(msg);
                    //       console.log(resp);
                    //       // 请求好友列表成功，通过id请求其信息
                    //       var fList = resp._user_info_list;
                    //
                    //   },
                    //   (msg)=>{
                    //       // 请求失败
                    //
                    //   });
                }
            },

            addfriends(index,friend){
                var uid=friend._uid
                //let _this = this;
                //console.log('add friends : '+uid);
                //console.log(index);
                this.$set(friend,'select',1)
                // this.$refs.index.disabled =true
                this.friendList[index]=friend
                let msg = Request.up.add_friend.create({
                    _uid: uid
                });
                //console.log('33333333333333333333');
                let buf = Request.up.add_friend.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.add_friend, buf, false);
                this.$dataManager.addSendAddFriend(uid);

            },
            getHeadImg(friend){
                if(null==friend){
                    return this.defHeadUrl
                }else{
                    return this.$store.getters.getHeadImg(friend._head_portrait)
                }
            },
            goChat(addfriend){
                toChatPage(this,addfriend._user_name,addfriend._uid,addfriend._head_portrait,addfriend.headPortraitFrame)
            },
            getOuterUrl(friend){
                let headPortraitFrameArray = this.$store.getters.getHeadPortraitFrameArray()
                if ( headPortraitFrameArray == null)
                    return null;
                for (let headPortraitFrame of headPortraitFrameArray) {
                    if(headPortraitFrame.id==friend._head_portrait_frame){
                        return headPortraitFrame.image
                    }
                }
                return null;
            },

        }
    }
</script>

<style scoped>
    div[class*="col"] {
        background: #fff;
        text-align: center;
        color: #000;
        border: 0px solid #ddd;
        padding: 0px;
        margin-bottom: 0px;
        font-size: 12px;
    }

    .list-block{
        background: white;
        padding: 0px;
        margin: 8px;
    }

    #add-friends-bar{
        background: #FFB200;
    }
    #subnavbar{
        background: white;
    }

    ::-webkit-input-placeholder { /* WebKit browsers */
        color: #999;
        font-size: 12px;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color: #999;
        font-size: 12px;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color: #999;
        font-size: 12px;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
        color: #999;
        font-size: 12px;
    }
    input[type="search"]::-webkit-search-cancel-button{
        display: none;
        -webkit-appearance: none;
    }
    .add-btn{
        border: 0;
        background-color: transparent;
        outline: none;
        width: 60px;
        height: 24px;
        margin-left: 20%;
        border-radius: 4px;
        color: white;
    }
    .md .list{
        margin:0px ;
    }
    .fitem{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
    }
    .bg-class{
        background: #FFB200;
    }

    .bsel{
        background:white;
        opacity:0.5;
        color:#999;
    }
    .noting-parent{
        position:relative!important;
        width:100%;
        height: 80% !important;
    }
    .no-div{
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 50%;
        transform: translateX(-50%);
        color: #999;

    }

    .this-add-friends-img{
        width: 52px;
        height: 52px;
        margin-left: 10px;
        border-radius: 28px;
        border:2px solid white;
    }

    .search-div{
        display: flex;
        display: -webkit-flex;
        width: 90%;
        height: 70%;
        flex-direction: row;
        align-items: center;
        background: #eee;
        border-radius: 24px;

    }

    .parent-flex-col{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
</style>
