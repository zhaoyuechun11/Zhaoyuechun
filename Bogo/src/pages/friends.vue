<template xmlns:http="http://www.w3.org/1999/xhtml">
    <f7-page style="background: #FFFFFF">
            <f7-navbar no-shadow id="friends-bar" style="background: transparent">
                <f7-nav-left >
                    <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                    </f7-link>
                </f7-nav-left>
                <f7-nav-title> FRIENDS </f7-nav-title>
                <f7-nav-right>
                    <f7-link href="/searchfriends/" style="width: 56px;height: 56px;padding-left: 13px;padding-right: 13px;">
                     <img src="static/images/add_friend_icon.png" style="width: 22px;height: 20px"/>
                    </f7-link>
                </f7-nav-right>
            </f7-navbar>
        <div class="search-parent" style="display:none">
            <div class="search-div" v-on:click="goSearch">
                <img src="static/images/search.png" style="width: 20px;height: 20px;margin-left: 20px"/>
                <a style="color: #FFFFFF;margin-left: 15px;">ALL FRIENDS</a>
            </div>
        </div>
        <f7-list>
            <f7-list style="margin-top: -20px">
                <f7-link href="/addfriends/" style="display:none" class="game">
                    <div class="add-friends">
                        <img src="static/images/tianjiahaoyou.png" class="add-friends-img" style="width:46px;height:46px;border:0px solid white;"/>
                        <p style="margin-left: 40px;color: #FFFFFF">Add New Friends</p>
                    </div>
                </f7-link>

                <f7-link href="/bongochat/" style="display:block;margin-top: 12px;" class="game">
                    <div class="add-friends" style="">
                        <img src="static/images/bongo_logo.png" class="add-friends-img" style="width:42px;height:42px;"/>
                        <p style="margin-left: 40px;color: #515151">Bongo</p>
                    </div>
                </f7-link>
                <p class="line-item" style=""/>


                <f7-link :href="toChatList()" style="display:none" class="game">
                    <div class="add-friends" style="margin-top: 10px;background: #F8661B">
                        <img src="static/images/youjian.png" class="add-friends-img" style="width:46px;height:46px;border:0px solid white;"/>
                        <div style="height: 60px;display: flex;flex-direction: column;align-items: left;justify-content:left;" >
                            <a style="height:20px;margin-left: 40px;margin-top:8px;color: #FFFFFF;">神秘信</a>
                            <a style="height:20px;margin-left: 40px;color: #FFFFFF;">与通讯录好友玩</a>
                        </div>
                    </div>
                </f7-link>
                <f7-row v-for="friend in friendList" :key="friend.key" no-gap>
                    <f7-col>
                        <f7-link style="display:block" class="game">
                            <div class="add-friends" style="margin-top: 0px;" v-on:click="goChat(friend)" >
                                 <!--<img v-bind:src="getUrl(friend)" class="add-friends-img" v-on:click.stop="goPersonal(friend)"/>-->
                                <div style="margin-left: 10px; height: 46px; width: 46px">
                                    <score-view  class="add-friends-img" style="margin-left: 0px; border:0px solid white;" :gender="getSex(friend)" v-on:click.stop="goPersonal(friend)" :innerImgUrl="getUrl(friend)" :outerImgUrl="getOuterUrl(friend)" />
                                </div>
                                <div style="height: 60px;display: flex;flex-direction: column;justify-content:center">
                                    <a style="height:20px;margin-left: 40px;color: #515151; font-size:16px;text-align: left; text-transform:capitalize ">{{ friend.userName }}</a>
                                    <a style="height:20px;margin-left: 40px;color: #515151; margin-top:6px;font-size:10px;text-align: left">{{ friend.userId }}</a>
                                </div>
                            </div>
                        </f7-link>
                        <p class="line-item" style=""/>
                    </f7-col>
                </f7-row>
            </f7-list>
        </f7-list>
    </f7-page>
</template>
<script>
  import { mapMutations } from 'vuex'
  import Request from '../socket/up.js';
  import Response from '../socket/down.js';
  import Types from '../socket/types.js';

  import { getHeadPortraitById,toChatPage} from '../utils/utils.js';

  export default {
    data (){
      return {
        headImag:this.$store.state.userInfo.headImg,
        friendList: [],
        defHeadaddUrl:'./static/images/head_icon.jpg',
        outerUrl:null,
      }
    },

    created(){
      this.$websocket.addcallback(Types.MsgEnum.get_user_info, this.onHandleGetUserInfo);
    },

    destroyed(){
      this.$websocket.removecallback(Types.MsgEnum.get_user_info, this.onHandleGetUserInfo);
    },

    methods: {

     getSex(friend){
         return friend.sex
     },
     goBack(){
         console.log("go back")
         this.$f7router.back()
      },
      goAddFriend(){

      },
      goSearch(){
        this.$f7router.navigate({name: 'SearchFriend'})
      },

      toChatList(){
        //console.log("to chat 页面")
        return "/shenmi/"+"神秘信";
      },

      getFriendList(){
        let _this = this;
        let buf = Request.up.get_friend_list.encode().finish();
        this.$websocket.send(Types.MsgEnum.get_friend_list, buf).then((msg)=>{
             // 请求好友列表成功，通过id请求其信息
            let data = Response.down.get_friend_list.decode(msg);
            let uidList = data._uid_list;

            _this.friendList=[];
            if(uidList==null||(uidList!=null&&uidList.length==0)){
                return
            }
            for (let i = 0; i < uidList.length; i++) {
                const uid = uidList[i]
                let user = _this.$dataManager.hasUser(uid);
                if ( user === undefined )
                {
                   _this.$dataManager.fetchUserInfo(uid);
                }
                else
                {
                   _this.friendList.push(user);
                }

                //添加好友
                _this.$dataManager.addFriendData(uid);
                _this.$dataManager.removeSendAddFriend(uid);
            }
          },
          (error)=>{
            // 请求失败
            console.log(error)
          });

      },

      onHandleGetUserInfo(msg)
      {
        let userInfo = Response.down.get_user_info.decode(msg);
        let userBaseInfo = userInfo._user_info._user_base_info
        var headPortraitFrame=userInfo._user_info._head_portrait_frame
          console.log("headPortraitFrame..."+headPortraitFrame);
        let user = this.$dataManager.addUser(userInfo);

        //去重
        let mineInfo = this.$store.getters.getUserInfo()
        null!=this.friendList&&this.friendList.findIndex(friend => friend.userId === user.userId)<0&&(user.userId!=mineInfo.userId)&&this.friendList.push(user);
        console.log("集合长度..."+this.friendList.length);
      },

      goChat(user){
        toChatPage(this,user.userName,user.userId,user.userHead,user.headPortraitFrame)
      },
      getUrl(userInfo){
            if(null!=userInfo&& null!=userInfo.userHead){
                var headPort=userInfo.userHead
                return this.$store.getters.getHeadImg(headPort)
            }else {
                return this.defHeadaddUrl
            }
      },
        getOuterUrl(userInfo){
            const self=this
            let headPortraitFrameArray = self.$store.getters.getHeadPortraitFrameArray()
            return getHeadPortraitById(headPortraitFrameArray,userInfo)
        },
      goPersonal(friend){
          this.$f7router.navigate({
              name: 'PersonalInfo',
              params: {uid:friend.userId,type:0 },
          })
      },
    },
    mounted(){
      console.log(" friends mounted");
      let viewArray=console.log(this.$$('.icon-back'))

        // for (let i = 0; i < viewArray.length-1; i++) {
        //     viewArray[i].childNodes[0].style.marginLeft='6px'
        //     viewArray[i].childNodes[0].style.color='#999'
        // }
      //
      //   icon-back
      this.getFriendList()
    },
  };
</script>

<style>

    .add-friends{
        height: 48px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-content: center;
        border-radius: 0px;
        padding: 10px;
        align-items: center;
        margin-left: 10px;
        margin-right: 10px;

    }
    #friend-list{
        margin:0px;
    }
    .line-item{
        width:90%!important;
        height: 1px!important;
        margin-top: 0px!important;
        margin-bottom: 0px!important;
        background: #eee;
        margin-left: 5%;
    }
    #friends-bar{
        background: #6C3B97;
        width: 100%;
    }
    .add-friends-img{
        width: 52px;
        height: 52px;
        margin-left: 10px;
        border-radius: 28px;
        border:2px solid white;
    }

    .search-div{
        display: flex;
        display: -webkit-flex;
        width: 80%;
        height: 60%;
        flex-direction: row;
        align-items: center;
        background: #29BDA3;
        border-radius: 24px;

    }
    .search-parent{
        height: 56px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        align-items:center;
        display:flex;
        display: -webkit-flex;
        justify-content:center
    }

</style>
