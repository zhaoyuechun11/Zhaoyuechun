<!--<template>-->
    <!--<f7-page>-->
        <!--<div class="navbar" style="position: fixed; height: 80px;">-->
            <!--<div class="navbar-inner">-->
                <!--<div class="left">-->
                    <!--<a href="#" class="link back">-->
                        <!--<i class="icon icon-back color-gray"></i>-->
                    <!--</a>-->
                <!--</div>-->
                <!--<div class="title home-title"> Discover People</div>-->
                <!--<f7-nav-right>-->
                    <!--<img src="static/images/head_icon.png" style="width: 80px;height: 56px"/>-->
                <!--</f7-nav-right>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="no-recom" style="display: none;" ref="norecom">-->
            <!--<p style="text-align:center;background: #FFFFFF;margin-top: 50%;color: #999999"> 暂无推荐</p>-->
        <!--</div>-->
        <!--<transition name="slide-fade ">-->
            <!--<f7-list class="list-block" v-if="show">-->
                <!--<div class="line-div" style="width: 33.3%;height: auto;padding: 0px" v-for="(item,index) in friendList"-->
                     <!--:key="item.key">-->
                    <!--<f7-link :href="getPersonal(item)">-->
                        <!--<div class="role-info" :class="setMarginTop(index)">-->
                            <!--&lt;!&ndash;<img v-bind:src="getHeagImg(item)"&ndash;&gt;-->
                                 <!--&lt;!&ndash;style="width: 90px;height: 90px;border-radius:46px;border:2px solid white;background: #ED9A00"/>&ndash;&gt;-->
                            <!--<score-view style="width: 90px;height: 90px;" :innerImgUrl="getHeagImg(item)" :outerImgUrl="getOuterUrl(item)" />-->
                            <!--<li class="label">{{item._user_name}}</li>-->
                        <!--</div>-->
                    <!--</f7-link>-->
                <!--</div>-->
            <!--</f7-list>-->
        <!--</transition>-->
    <!--</f7-page>-->
<!--</template>-->

<!--<script>-->
    <!--import Request from '../socket/up.js';-->
    <!--import Response from '../socket/down.js';-->
    <!--import Types from '../socket/types.js';-->
    <!--import { getHeadPortraitFrameImage} from '../utils/utils.js';-->

    <!--export default {-->
        <!--data () {-->
            <!--return {-->
                <!--tests:["item1","item2","item3","item4","item5","item6","item7","item8"],-->
                <!--headImag:'./static/images/head_icon.jpg',-->
                <!--show: false,-->
                <!--friendList:null-->
            <!--}-->
        <!--},-->

        <!--created(){-->
            <!--this.$websocket.addcallback(Types.MsgEnum.get_user_info, this.onHandleGetUser);-->
        <!--},-->

        <!--destroyed(){-->
            <!--this.$websocket.removecallback(Types.MsgEnum.get_user_info, this.onHandleGetUser);-->
        <!--},-->


        <!--methods:{-->
            <!--setMarginTop(index){-->
                <!--var yu1 = (index+1)%3-->
                <!--if(yu1 == 2){-->
                    <!--return "top2";-->
                <!--}else{-->
                    <!--return "top1";-->
                <!--}-->
            <!--},-->

            <!--getPersonal(item){-->
                <!--alert('item id ' + item._uid)-->
                <!--return "/personalinfo/"+item._uid+"/0";-->
            <!--},-->

            <!--getHeagImg(item){-->
                <!--if( null!=item&&null!=item._head_portrait ){-->
                    <!--return this.$store.getters.getHeadImg(item._head_portrait)-->
                <!--}else{-->
                    <!--return this.headImag-->
                <!--}-->
            <!--},-->

            <!--getOuterUrl(item){-->
                <!--const self=this-->
                <!--let headPortraitFrameArray = this.$store.getters.getHeadPortraitFrameArray()-->
                <!--if(null==headPortraitFrameArray){-->
                    <!--return null-->
                <!--}-->
                <!--for (let headPortraitFrame of headPortraitFrameArray) {-->
                    <!--if(headPortraitFrame.id==item._head_portrait_frame){-->
                        <!--return headPortraitFrame.image-->
                    <!--}-->
                <!--}-->
                <!--return null;-->
            <!--},-->
        <!--},-->
        <!--mounted(){-->
            <!--//获取推荐好友-->
            <!--var msg = Request.up.recommend_friend.create({-->
                <!--_sex:0,-->
            <!--});-->
            <!--let buf = Request.up.recommend_friend.encode(msg).finish();-->
            <!--// console.log('get recommend friend list');-->
            <!--this.$websocket.send(Types.MsgEnum.recommend_friend, buf).then((msg)=>{-->
                    <!--// console.log(" getFriendList success");-->
                    <!--let resp = Response.down.recommend_friend.decode(msg);-->
                    <!--// 请求好友列表成功，通过id请求其信息-->
                    <!--// console.log(resp);-->
                    <!--this.friendList=resp._user_info_list-->
                    <!--//console.log(this.friendList);-->
                    <!--if(this.friendList.length>0){-->
                        <!--this.$refs.norecom.style.display= "none"-->
                    <!--}-->
                <!--},-->
                <!--(msg)=>{-->
                    <!--// 请求失败-->
                    <!--// console.log(msg)-->
                    <!--this.$refs.norecom.style.display= "inline"-->
                <!--});-->

            <!--this.show=true-->
        <!--},-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
    <!--div[class*="col"] {-->
        <!--background: #fff;-->
        <!--text-align: center;-->
        <!--color: #000;-->
        <!--border: 1px solid #ddd;-->
        <!--padding: 0px;-->
        <!--margin-bottom: 0px;-->
        <!--font-size: 12px;-->
    <!--}-->

    <!--.list-block{-->
        <!--padding-top: 80px;-->
        <!--display: flex;-->
        <!--display: -webkit-flex;-->
        <!--flex-direction: row;-->
        <!--flex-wrap:wrap;-->
    <!--}-->
    <!--.role-info{-->
        <!--display: flex;-->
        <!--display: -webkit-flex;-->
        <!--flex-direction: column;-->
        <!--width: 33.3%;-->
        <!--height: 120px;-->
        <!--align-items: center;-->
        <!--align-content: center;-->
        <!--justify-content: center;-->
    <!--}-->
    <!--.line-div{-->
        <!--display: flex;-->
        <!--display: -webkit-flex;-->
        <!--flex-direction: column;-->
        <!--align-items: center;-->
    <!--}-->

    <!--.label{-->
        <!--width: 80px;-->
        <!--white-space:nowrap;-->
        <!--alignment: center;-->
        <!--display:block;-->
        <!--text-align:center;-->
        <!--font-size: 12px;-->
        <!--height: 16px;-->
        <!--color: black;-->
        <!--overflow:hidden;-->
        <!--text-overflow:ellipsis;-->
    <!--}-->

    <!--.no-recom{-->
        <!--width: 100%;-->
        <!--height: 90%;-->
    <!--}-->

<!--</style>-->
