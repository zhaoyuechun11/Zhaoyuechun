<template>
    <f7-page>
        <f7-navbar no-shadow data-forceUrl="true" style="background: transparent;font-weight: normal;">
            <f7-nav-left >
                <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title style="font-weight: normal"> STRANGER MESSAGES </f7-nav-title>
            <f7-nav-right>
                <img src="static/images/head_icon.png" style="width: 56px;height: 56px"/>
            </f7-nav-right>
        </f7-navbar>

        <div class="noting-parent" style="display: none;padding: 0px;align-items: center"  ref="strangerNothing">
            <!--<a class="no-div">No body found</a>-->
            <div class="parent-flex-col">
                <img src="static/images/nofriend_bg.png" style="width: 200px;height: 80%;margin-top: 120px;">
                <a style="margin-top: 26px;font-size: 16px;color: #999">NO MESSAGES</a>
            </div>

        </div>

        <f7-list v-for="(notify) in allStrongerList" :key="notify.key">
            <f7-link href="" style="display:block" class="game">
                <div class="fitem" v-on:click="goChat(notify)">
                    <div class="add-friends" style="margin-top: 0px;background: white;border-radius: 0px;margin-left: 0px">
                        <img   v-bind:src="getChatHead(notify)"  class="add-friends-img" v-on:click.stop="goPersonal(notify)"/>
                        <div style="height: 60px;width:60%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                            <a style="text-transform: capitalize; height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: left;">
                                {{notify.userName}}
                            </a>
                            <a style="overflow: hidden; height:auto; padding:0px; width:100%; margin-left: 40px;color: black;text-align: left;font-size: 10px">
                                You played {{notify.gameName}} together
                            </a>
                        </div>
                        <p  class="small-name" style="font-size: 12px;color: #999;width: 80px!important;">{{notify.timeLabel}}</p>
                    </div>
                    <p style="" class="line-item"></p>
                </div>
            </f7-link>
        </f7-list>
    </f7-page>
</template>

<script>
    import { getTimeLabel,getNowTimeLab} from '../utils/utils.js';
    export default {
        name: "test",
        data () {
            return {
                headImag:this.$store.state.userInfo.headImg,
                sites: [
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] }
                ],
                notifyList:[],
                defHeadUrl:'./static/images/morentou.png',
                allStrongerList:[],
            }
        },


        methods:{

            goBack(){
                console.log("go back")
                this.$f7router.back()
            },

            goChat(addfriend){
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

                // this.$f7router.push({name:'ChatPage',params:{pk_refinfo:'test',value:'test1'}});
            },

            getStrongerChat() {
                const _this = this
                let notifyAll = _this.$dataManager.copyAllNotifyMessage();
                let allChats = _this.$dataManager.copyAllChat();
                let userInfo = _this.$dataManager.getMyself()
                _this.allStrongerList = _this.$dataManager.getAllStrongerList()
                console.log(_this.allStrongerList)
                if (_this.allStrongerList != null) {
                    if(_this.allStrongerList.length>0){
                        _this.$refs.strangerNothing.style.display= "none"
                    }else{
                        _this.$refs.strangerNothing.style.display= "block"
                    }
                    for (var stronger of _this.allStrongerList) {
                        //console.log(stronger.recivetime)
                        let label = getTimeLabel(stronger.recivetime)
                        //console.log(label)
                        _this.$set(stronger, "timeLabel", label);
                    }
                }else{
                    _this.$refs.strangerNothing.style.display= "none"
                }
                for (let userId in allChats) {
                    //console.log(userId)
                    //console.log(userInfo.userId.toString())
                    if (userId != userInfo.userId.toString()) {
                        //console.log('user info inner' + userId );
                        if (notifyAll[userId] === undefined) {
                            notifyAll[userId] = [];
                        }

                        let chats = allChats[userId];
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

                for (let id in notifyAll) {
                    if (id > 0) {
                        let user = _this.$dataManager.hasUser(id);
                        let notifyList = notifyAll[id];
                        let notifyLast = notifyList[notifyList.length - 1];

                        if ((user !== undefined)) {
                            if (notifyLast.type === 'chat') {
                                if (_this.allStrongerList != null) {
                                    _this.allStrongerList.find(function (element) {
                                        if (element.userId == id) {
                                            let index = _this.allStrongerList.indexOf(element)
                                            _this.allStrongerList.splice(index, 1)
                                        }
                                        return element.userId == id;
                                    });
                                    console.log(_this.allStrongerList)
                                }
                            }
                        }
                        else {
                            if (notifyLast.type === 'chat') {
                                if (_this.allStrongerList != null) {
                                    _this.allStrongerList.find(function (element) {
                                        if (element.userId == id) {
                                            let index = _this.allStrongerList.indexOf(element)
                                            _this.allStrongerList.splice(index, 1)
                                        }
                                        return element.userId == id;
                                    });
                                    //console.log(_this.allStrongerList)
                                }
                            }
                        }
                    }
                }
            },

            getChatHead(friend){
                if(null!=friend){
                    return friend.userHead
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
            this.getStrongerChat()
        },
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
    #shenmu-nav{
        background: #FF6900;
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
    .noting-parent{
        position:relative!important;
        width:100%;
        height: 80% !important;
    }

    .small-name {
        -webkit-transform: scale(0.8);
        transform: scale(0.8);
    }

</style>
