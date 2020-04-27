<template>
    <f7-page style="overflow-y: hidden">

        <div class="navbar" style="position: fixed; height:56px;">
            <div class="navbar-inner">
                <div class="left">
                    <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                        <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                    </f7-link>
                </div>
                <div class="title home-title"> DISCOVER</div>
                <f7-nav-right>
                    <img src="static/images/head_icon.png" style="width: 56px;height: 56px"/>
                </f7-nav-right>
            </div>
        </div>

        <!--<f7-list>-->
        <div class="noting-parent" style="display: none;padding: 0px;align-items: center;margin-top:60px;"  ref="discovery">
            <!--<a class="no-div">No body found</a>-->
            <div class="parent-flex-col">
                <img src="static/images/nofriend_bg.png" style="width: 200px;height: 210px;margin-top: 80px;">
                <a style="margin-top: 26px;font-size: 16px;color: #515151">PLAY WITH FRIENDS</a>
                <a style="margin-top: 6px;color: #999">SEARCH FOR FRIENDS ON BONGO</a>
            </div>
        </div>

        <div style="height: 30px;margin-top:70px;" class="parent-flex-row">
            <div style="color: black;width: 10px;height: 10px;border-radius: 5px;background: #0C9CE6;margin-left: 20px;"></div>
            <a style="margin-left: 8px;color: #999;font-size: 12px;">THE NEAREST OPPONENT</a>
        </div>

        <!-- recommend -->
        <f7-block style="margin: 0px 0px; width: auto;height:auto;margin-top:0px;padding-left: 0px;padding-right: 0px;background: white" >
            <!--<f7-swiper  :params="{speed:500, slidesPerView: 5, spaceBetween:2}" style="height: 100px;">-->
                <!--<f7-swiper-slide id="slide" class="slide-item personal-item" style="width:58px;background: white;margin-top: 12px; " v-for="(item,index) in horizonPersonArray" :key="item.key">-->
                    <!--<f7-link :href="getPersonal(item)">-->
                    <!--<score-view class="user-photo"  :gender="0" :innerImgUrl="getHeagImg(item)" :outerImgUrl="getOuterUrl(item)"/>-->
                    <!--</f7-link>-->
                <!--</f7-swiper-slide>-->
            <!--</f7-swiper>-->
            <div class="parent-flex-row" style="justify-content:center;margin-top: 10px;" >
                <f7-link :href="getPersonal(horizonPersonArray[0])">
                <score-view class="user-photo" style="width: 60px;height: 60px;margin-left: 0px;"  :gender="getSex(horizonPersonArray[0])" :innerImgUrl="getHeagImg(horizonPersonArray[0])" :outerImgUrl="getOuterUrl(horizonPersonArray[0])"/>
                </f7-link>
                <f7-link :href="getPersonal(horizonPersonArray[1])">
                    <score-view class="user-photo" style="width: 60px;height: 60px;margin-left: 6px;" :gender="getSex(horizonPersonArray[1])" :innerImgUrl="getHeagImg(horizonPersonArray[1])" :outerImgUrl="getOuterUrl(horizonPersonArray[1])"/>
                </f7-link>
                <f7-link :href="getPersonal(horizonPersonArray[2])">
                    <score-view class="user-photo" style="width: 60px;height: 60px;margin-left: 6px;" :gender="getSex(horizonPersonArray[2])" :innerImgUrl="getHeagImg(horizonPersonArray[2])" :outerImgUrl="getOuterUrl(horizonPersonArray[2])"/>
                </f7-link>
                <f7-link :href="getPersonal(horizonPersonArray[3])">
                    <score-view class="user-photo" style="width: 60px;height: 60px;margin-left: 6px;" :gender="getSex(horizonPersonArray[3])" :innerImgUrl="getHeagImg(horizonPersonArray[3])" :outerImgUrl="getOuterUrl(horizonPersonArray[3])"/>
                </f7-link>
                <f7-link :href="getPersonal(horizonPersonArray[4])">
                    <score-view class="user-photo" style="width: 60px;height: 60px;margin-left: 6px;" :gender="getSex(horizonPersonArray[4])" :innerImgUrl="getHeagImg(horizonPersonArray[4])" :outerImgUrl="getOuterUrl(horizonPersonArray[4])"/>
                </f7-link>
            </div>
        </f7-block>

        <div  id="img_bg" style="width: 100%;margin-top: 20px;position: relative;bottom: 0px;display: block" class="discover-bg">
            <div style="height: 60px;margin-top:0px;" class="parent-flex-row">
                <div style="color: black;width: 10px;height: 10px;border-radius: 5px;background: white;margin-left: 20px;"></div>
                <a style="margin-left: 8px;color: white;font-size: 12px;height: 20px;line-height: 20px;">NEW FRIENDS</a>
                <!--<div style="height: 100px;"></div>-->
            </div>

            <div style="height: 100px;margin-top: 0px;" class="parent-flex-row2">
                <f7-link :href="getPersonal(verticalPersonArray[0])" style="margin-left: 24%;">
                <score-view style="width: 64px!important;height: 64px!important;margin-top: 10px;" :gender="getSex(verticalPersonArray[0])"  :innerImgUrl="getHeagImg(verticalPersonArray[0])" :outerImgUrl="getOuterUrl(verticalPersonArray[0])" />
                </f7-link>
                <f7-link :href="getPersonal(verticalPersonArray[1])">
                    <score-view style="width: 70px!important;height: 70px!important;margin-top: 0px;margin-left: 46px;" :gender="getSex(verticalPersonArray[1])" :innerImgUrl="getHeagImg(verticalPersonArray[1])" :outerImgUrl="getOuterUrl(verticalPersonArray[1])" />
                </f7-link>
                <f7-link :href="getPersonal(verticalPersonArray[2])">
                    <score-view style="width: 40px!important;height: 40px!important;margin-top: 62px;margin-left: 26px;" :gender="getSex(verticalPersonArray[2])" :innerImgUrl="getHeagImg(verticalPersonArray[2])" :outerImgUrl="getOuterUrl(verticalPersonArray[2])" />
                </f7-link>
            </div>
            <div style="height: 110px;" class="parent-flex-row2">
                <div style="width:100px;flex-grow: 2"></div>
                <f7-link :href="getPersonal(verticalPersonArray[3])">
                <score-view style="position:relative;width: 70px!important;height: 70px!important;margin-top:20px;margin-right:16px;" :gender="getSex(verticalPersonArray[3])" :innerImgUrl="getHeagImg(verticalPersonArray[3])" :outerImgUrl="getOuterUrl(verticalPersonArray[3])" />
                </f7-link>
            </div>
            <div style="height: 140px;" class="parent-flex-row2">
                <f7-link :href="getPersonal(verticalPersonArray[4])">
                <score-view style="width: 64px!important;height: 64px!important;margin-top: 0px;margin-left:20px;" :gender="getSex(verticalPersonArray[4])" :innerImgUrl="getHeagImg(verticalPersonArray[4])" :outerImgUrl="getOuterUrl(verticalPersonArray[4])" />
                </f7-link>
                <f7-link :href="getPersonal(verticalPersonArray[5])">
                    <score-view style="width: 80px!important;height: 80px!important;margin-top: 60px;margin-left: 38px;" :gender="getSex(verticalPersonArray[5])" :innerImgUrl="getHeagImg(verticalPersonArray[5])" :outerImgUrl="getOuterUrl(verticalPersonArray[5])" />
                </f7-link>
                <f7-link :href="getPersonal(verticalPersonArray[6])">
                    <score-view style="width: 50px!important;height: 50px!important;margin-top: 20px;margin-left: 58px;" :gender="getSex(verticalPersonArray[6])" :innerImgUrl="getHeagImg(verticalPersonArray[6])" :outerImgUrl="getOuterUrl(verticalPersonArray[6])" />
                </f7-link>
            </div>
        </div>
        <!--</f7-list>-->
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
    </f7-page>
</template>

<script>
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    import { getHeadPortraitFrameImage} from '../utils/utils.js';
    import {getRecommendFriends} from '../data/usermanager'
    export default {
        data () {
            return {
                tests:["item1","item2","item3","item4","item5","item6","item7","item8"],
                headImag:'./static/images/head_icon.jpg',
                show: false,
                friendList:null,
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
                    },
                    {
                        _uid:"Stick Man",
                        _gameIcon:"./static/icon/stickman.png"
                    }
                ],
                outerImage:null,
                horizonPersonArray:[
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'}
                    ],
                verticalPersonArray:[
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'},
                    {_head_portrait:'./static/images/head_icon.png'}
                    ],

            }
        },

        created(){
            this.$websocket.addcallback(Types.MsgEnum.get_user_info, this.onHandleGetUser);
        },

        destroyed(){
            this.$websocket.removecallback(Types.MsgEnum.get_user_info, this.onHandleGetUser);
        },


        methods:{
            getSex(item){
                if(null!=item&&null!=item._sex){
                    return item._sex
                }else{
                    return 0
                }
            },
            goBack(){
                console.log("go back")
                this.$f7router.back()
            },

            setMarginTop(index){
                var yu1 = (index+1)%3
                if(yu1 == 2){
                    return "top2";
                }else{
                    return "top1";
                }
            },

            getPersonal(item){
                return "/personalinfo/"+item._uid+"/0";
            },

            getHeagImg(item){
                // return './static/icon/stickman.png'
                if( null!=item&&null!=item._head_portrait ){
                    return this.$store.getters.getHeadImg(item._head_portrait)
                }else{
                    return this.headImag
                }
            },

            getOuterUrl(item){
                const self=this
                if(item==null){
                    return null
                }
                let headPortraitFrameArray = this.$store.getters.getHeadPortraitFrameArray()
                if(null==headPortraitFrameArray){
                    return null
                }
                for (let headPortraitFrame of headPortraitFrameArray) {
                    if(item._head_portrait_frame!==undefined &&headPortraitFrame.id==item._head_portrait_frame){
                        return headPortraitFrame.image
                    }
                }
                return null;
            },

            initArray(dataArray){
                const self=this
                if(dataArray==null){
                    return
                }
               if(dataArray.length>0){
                   self.horizonPersonArray=dataArray.slice(0, 5)
                   self.verticalPersonArray=dataArray.slice(5, 12)
               }
            },
        },
        mounted(){
            const self=this
            let screenWidth = self.$store.getters.getScreenWidth()
            let height = document.documentElement.clientHeight;
            console.log('height: '+height)
            // this.$$('#img_bg')[0].style.height=screenWidth*1.27+"px"
            self.$$('#img_bg')[0].style.height=(height-190)+'px'
            //获取推荐好友
            getRecommendFriends(self.$websocket,0,function (friends) {
                // console.log(friends)
                self.friendList = friends
                if (self.friendList.length > 0) {
                    self.$refs.discovery.style.display = "none"
                    self.initArray(self.friendList)
                } else {
                    self.$refs.discovery.style.display = "inline"
                }
            }, function (error) {
                console.log("error: " + error)
                this.$refs.discovery.style.display= "inline"
            })
            this.show=true
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
        padding-top: 80px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .role-info{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        width: 33.3%;
        height: 120px;
        align-items: center;
        align-content: center;
        justify-content: center;
    }
    .line-div{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
    }

    .label{
        width: 80px;
        white-space:nowrap;
        alignment: center;
        display:block;
        text-align:center;
        font-size: 12px;
        height: 16px;
        color: black;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    .no-recom{
        width: 100%;
        height: 90%;
    }

    .noting-parent{
        position:relative!important;
        width:100%;
        height: 80% !important;
    }

    .discover-bg{
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-image: url('../static/images/discovery_bg.png');
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
        align-items: center;
    }

    .parent-flex-row2{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
    }
</style>
