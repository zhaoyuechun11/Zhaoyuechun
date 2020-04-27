<template>
    <f7-page>
        <f7-navbar no-shadow data-forceUrl="true" style="background: white;">
            <f7-nav-left >
                <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title class="search-title" >CHAT</f7-nav-title>
            <f7-nav-right>
                <img src="static/images/head_icon.png" style="width: 56px;height: 56px"/>
            </f7-nav-right>
        </f7-navbar>

        <div  class="no-msg" style="display:none">
            <a style="font-size: 12px;color: black">你还没有通讯录朋友</a>
            <a style="font-size: 12px;color: black;margin-top: 10px;">添加他们开始游戏吧!</a>
        </div>

        <f7-list>
            <f7-link href="/stronger/" style="display:block;" class="game">
                <div class="add-friends" style="margin-left: 0px;">
                    <img src="static/images/tianjiahaoyou.png" class="add-friends-img" style="width:56px;height:56px;border:0px solid white;"/>
                    <p style="margin-left: 40px;color: #414141">Stranger Messages</p>
                </div>
            </f7-link>
            <p class="line-item" style=""/>
            <!-- 请求好友信息 -->
            <f7-list v-for="(friend,index) in invitedList" :key="friend.key">
                <f7-link href="" style="display:block" class="game">
                    <div class="fitem" v-on:click="goChat(friend)">
                        <div class="add-friends" style="margin-top: 0px;background: white;border-radius: 0px;margin-left: 0px">
                            <img   v-bind:src="getAddHead(friend)"  class="add-friends-img" v-on:click.stop="goPersonal(friend)"/>
                            <div style="height: 60px;width:60%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                                <a style="text-transform: capitalize; height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;">{{friend.userName}}</a>
                                <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;font-size: 10px">{{friend.userId}}</a>
                            </div>
                            <input type="button" class="add-btn yellow-bg" :class="{'grey-bg':friend.select == 1}" v-on:click.stop.prevent="agreeFriend(index,friend)" style="" value="+ACCEPT" />
                        </div>
                        <p style="" class="line-style"></p>
                    </div>
                </f7-link>
            </f7-list>

            <!-- 已同意好友信息列表 -->
            <f7-list v-for="(agreeFriend) in agreeList" :key="agreeFriend.key">
                <f7-link href="" style="display:block" class="game">
                    <div class="fitem" v-on:click="goChat(agreeFriend)">
                        <div class="add-friends" style="margin-top: 0px;background: white;border-radius: 0px;margin-left: 0px">
                            <img  v-bind:src="getAddAgreeHead(agreeFriend)"  class="add-friends-img"  v-on:click.stop="goPersonal(agreeFriend)"/>
                            <div style="height: 60px;width:60%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                                <a style="text-transform: capitalize; height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;">{{agreeFriend.userName}}</a>
                                <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;font-size: 10px">{{agreeFriend.userId}}</a>
                            </div>
                            <input type="button" class="add-btn" style="background:white;border: none;padding:0px;color:#999" value="已添加" />
                        </div>
                        <p style="" class="line-style"></p>
                    </div>
                </f7-link>
            </f7-list>

            <f7-list v-for="(notify) in notifyList" :key="notify.key">
                <f7-link href="" style="display:block" class="game">
                    <div class="fitem" v-on:click="goChat(notify)">
                        <div class="add-friends" style="margin-top: 0px;background: white;border-radius: 0px;margin-left: 0px">
                            <img   v-bind:src="getChatHead(notify)"  class="add-friends-img" v-on:click.stop="goPersonal(notify)"/>
                            <div style="height: 60px;width:60%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                                <a style="text-transform: capitalize; height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;">
                                    {{notify.userName}}
                                </a>
                                <a style="overflow: hidden; height:auto; padding:0px; width:100%; margin-left: 40px;color: black;text-align: left;font-size: 10px">
                                    {{notify.message}}
                                </a>
                            </div>
                            <p style="font-size: 12px;color: #999;" v-if="notify.timeLabel!=null">{{notify.timeLabel}}</p>
                        </div>
                        <p style="" class="line-style"></p>
                    </div>
                </f7-link>
            </f7-list>
        </f7-list>
    </f7-page>
</template>

<script>
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    import { getTimeFromTimestamp,getTimeLabel} from '../utils/utils.js';
    export default {
        name: "test",
        data () {
            return {
                headImag:this.$store.state.userInfo.headImg,
                agreeList:[],
                invitedList:[],
                notifyList:[],
                agreeIdList:[],
                invitedIdList:[],
                notifyIdList:[],
                changeGrey1:-1,
                changeGrey2:-1,
                userInfo:null,
                defHeadUrl:'./static/images/morentou.png',
            }
        },

        created(){
            this.$websocket.addcallback(Types.MsgEnum.get_user_info, this.onHandleGetUserInfo);
          },

        destroyed(){
            this.$websocket.removecallback(Types.MsgEnum.get_user_info, this.onHandleGetUserInfo);
        },

        methods:{
            goBack(){
                console.log("go back")
                this.$f7router.back()
            },
            onHandleGetUserInfo(msg)
            {
                let userInfo = Response.down.get_user_info.decode(msg);
                let userBaseInfo=userInfo._user_info._user_base_info


                this.$dataManager.addUser(userInfo);


                //处理数据
                //去重
                this.invitedIdList.indexOf(userBaseInfo._uid)>0&&this.invitedList.findIndex(friend => friend.userId === userBaseInfo._uid)<0&&this.invitedList.push( {
                    userName: userBaseInfo._user_name,
                    userHead: userBaseInfo._head_portrait,
                    userId:userBaseInfo._uid
                });

                //去重
                this.agreeIdList.indexOf(userBaseInfo._uid)>0&&this.agreeList.findIndex(friend => friend.userId === userBaseInfo._uid)<0&&this.agreeList.push( {
                    userName: userBaseInfo._user_name,
                    userHead: userBaseInfo._head_portrait,
                    userId:userBaseInfo._uid
                });


                var notify = undefined;
                for( var i = 0; i < this.notifyIdList.length; i++) {
                    if (this.notifyIdList[i].userId == userBaseInfo._uid)
                        notify = this.notifyIdList[i];
                };

                if ( notify !== undefined ) {
                    notify.userName = userBaseInfo._user_name;
                    notify.userHead = userBaseInfo._head_portrait;
                    this.notifyList.push(
                      notify
                    );
                }
            },

            fetchUserInfo(uid)
            {
                this.$dataManager.fetchUserInfo(uid);
            },

            goChat(addfriend){
                //console.log(addfriend);
                // this.$f7router.navigate({name: 'ChatPage'})
                this.$f7router.navigate({name: 'ChatPage'}, {
                    props: {
                        toUser : {
                            userName: addfriend.userName,
                            userId: addfriend.userId,
                            userHead: addfriend.userHead
                        }
                    }
                })
            },

            //获取所有信息
            initNotifyMsg(){
                let _this = this;
                _this.invitedIdList = _this.$dataManager.getInvitedFriend();
                for( let i = 0; i < _this.invitedIdList.length; i++)
                {
                    const uid = _this.invitedIdList[i]
                    var user = _this.$dataManager.hasUser(uid);
                    if ( user === undefined )
                    {
                        _this.fetchUserInfo(uid);
                    }
                    else
                    {
                        _this.invitedList.push(user);
                    }
                }

                _this.agreeIdList = this.$dataManager.getAllAgree();
                for( let i = 0; i < _this.agreeIdList.length; i++)
                {
                    const uid = _this.agreeIdList[i]
                    let user = _this.$dataManager.hasUser(uid);
                    if ( user === undefined )
                    {
                        //添加到好友列表
                        _this.$dataManager.addFriend(uid)
                        _this.fetchUserInfo(uid);
                    }
                    else
                    {
                        _this.agreeList.push(user);
                    }
                }


                let notifyAll = _this.$dataManager.copyAllNotifyMessage();
                let allChats =  _this.$dataManager.copyAllChat();
                let userInfo = this.$dataManager.getMyself();
                for( let userId in allChats )
                {
                    //on line message to notify message
                    //console.log('user info ' + userInfo.userId );
                    if ( userId != userInfo.userId.toString() ) {
                        //console.log('user info inner' + userId );
                        if (notifyAll[userId] === undefined) {
                           notifyAll[userId] = [];
                        }

                        let chats = allChats[userId];
                        console.log(chats)
                        let num = chats.length;
                        if (num > 0) {
                            notifyAll[userId].unshift({
                                type: 'chat',
                                temp: true,
                                data: chats[num - 1]
                            });
                        }
                    }
                }

                for( let id in notifyAll )
                {
                    if ( id > 0 )
                    {
                        let user = _this.$dataManager.hasUser(id);
                        let notifyList = notifyAll[id];
                        console.log(notifyList)
                        let notifyLast = notifyList[notifyList.length-1];

                        if ( user !== undefined ) {
                            if (notifyLast.type === 'invited' ||
                              notifyLast.type === 'canceled') {
                                _this.notifyList.push({
                                    type: notifyLast.type,
                                    userId: id,
                                    userName: user.userName,
                                    userHead: user.userHead,
                                    message: 'Invited you to join ' + notifyLast.data.gameId
                                })
                            } else if (notifyLast.type === 'chat') {
                                _this.notifyList.push({
                                    type: notifyLast.type,
                                    userId: id,
                                    userName: user.userName,
                                    userHead: user.userHead,
                                    message:notifyLast.data._data,
                                    timeLabel:getTimeLabel(getTimeFromTimestamp(notifyLast.data._timestamp))
                                })

                            }
                        }
                        else
                        {
                            if (notifyLast.type === 'invited' ||
                              notifyLast.type === 'canceled') {
                                _this.notifyIdList.push({
                                    type: notifyLast.type,
                                    userId: id,
                                    userName: "",
                                    userHead: "",
                                    message: 'Invited you to join ' + notifyLast.data.gameName
                                })
                            } else if (notifyLast.type === 'chat') {
                                _this.notifyIdList.push({
                                    type: notifyLast.type,
                                    userId: id,
                                    userName: "",
                                    userHead: "",
                                    message:notifyLast.data._data,
                                    timeLabel:getTimeLabel(getTimeFromTimestamp(notifyLast.data._timestamp))
                                })
                            }
                            _this.fetchUserInfo(id);
                        }
                    }
                }
            },

            //同意好友请求
            agreeFriend(index,friend){
                this.changeGrey1=index
                this.$set(friend,'select',1)
                //判断是进入当前个人页面还是陌生人页面
                var userInfo = this.$dataManager.getMyself();
                //console.log("agreeFriend");
                //console.log(userInfo)
                let msg = Request.up.agree_add_friend.create({
                    _uid: friend.userId,
                    _is_agree:true
                });
                let buf = Request.up.agree_add_friend.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.agree_add_friend, buf, false).then((msg)=>{
                    //console.log("agree  success!" + msg);
                })
                .catch((msg)=>{
                    //console.log(msg);
                });
            },

            getAddHead(friend){
                if(null!=friend){
                    return this.$store.getters.getHeadImg(friend.userHead)
                }else{
                    return this.defHeadUrl
                }
            },
            getAddAgreeHead(friend){
                if(null!=friend){
                    return this.$store.getters.getHeadImg(friend.userHead)
                }else{
                    return this.defHeadUrl
                }
            },
            getChatHead(friend){
                if(null!=friend){
                    return this.$store.getters.getHeadImg(friend.userHead)
                }else{
                    return this.defHeadUrl
                }
            },
            goPersonal(friend){
                this.$f7router.navigate({
                    name: 'PersonalInfo',
                    params: { uid:friend.userId,type:0},
                })
            },

        },
        mounted() {
            this.initNotifyMsg()
        },
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
        padding: 0px;
        margin: 8px;
    }

    .no-msg{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        margin-top: 50%;
        width: 100%;
    }

    .mi-friends{
        height: 48px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-content: center;
        padding: 10px;
        align-items: center;
    }

    .mi-friends-img{
        width: 44px;
        height: 44px;
        margin-left: 0px;
        border-radius: 22px;
    }

    .md .list {
        margin: 0px 0;
        font-size: 16px;
    }

    .yellow-bg{
        background: #FFB200!important;
        border: none;
        height: 28px;
        color: white;
        border-radius: 4px;
    }
    .grey-bg{
        background: #ddd!important;
    }
    .line-style{
        width:90%!important;
        height: 1px;
        background: #eee;
        padding: 0px!important;
        margin-top: 0px!important;
        margin-bottom: 0px!important;
        margin-left: 5%;
    }
</style>
