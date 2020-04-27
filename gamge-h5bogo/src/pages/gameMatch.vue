<!--<template>-->

    <!--<f7-page style="background: #E5E5E5">-->
        <!--<f7-navbar no-shadow style="background-color: #6C3B97;z-index:2!important;">-->
            <!--<f7-nav-left>-->
                <!--<img src="static/images/bongo_findplayer.png" class="search-icon"/>-->
            <!--</f7-nav-left>-->
            <!--<f7-nav-title class="search-title" >PLAYER SEARCHING</f7-nav-title>-->
            <!--<f7-nav-right>-->
                <!--<f7-link @click="onClickCloseMatch" icon-only>-->
                    <!--<f7-icon ios="f7:close" md="material:close"></f7-icon>-->
                <!--</f7-link>-->
            <!--</f7-nav-right>-->
        <!--</f7-navbar>-->
        <!--<f7-block class="pk-block">-->
            <!--<div style="margin: 20px;height: 240px;background: white; border-radius: 8px">-->
                <!--<div class="game-name1" readonly="readonly">{{ getGameName() }}</div>-->
                <!--<div class="pk-view" style="border-radius: 8px" >-->
                    <!--<div class="player-view" style="left: 20%" id="leftplayer">-->
                        <!--&lt;!&ndash;<img v-bind:src="leftUserHead" class="pk-head" style="background: #ED9A00"/>&ndash;&gt;-->
                        <!--<score-view  class="pk-head" style="border:0px solid white;background: transparent" :innerImgUrl="leftUserHead" :outerImgUrl="leftHeadPortraitFrame" />-->
                        <!--<a class="single-line" style="margin-top: 0px;color: #999;font-size: 12px;height: 20px;width:80px;text-align: center">{{leftUserName}}</a>-->
                    <!--</div>-->
                    <!--<img src="static/images/bongo_vs.png" ref="bongovs" class="bongo-vs" :class="{'active':isScale}">-->
                    <!--<div class="player-view" style="right: 20%" id="rightplayer">-->
                        <!--<loading-view  :showLoading = !isScale></loading-view>-->
                        <!--&lt;!&ndash;<img v-bind:src="rightUserHead" class="pk-head" style="background: #F3F3F3"/>&ndash;&gt;-->
                        <!--<score-view  class="pk-head" style="border:0px solid white;background: transparent" :innerImgUrl="rightUserHead" :outerImgUrl="rightHeadPortraitFrame" />-->
                        <!--<a class="single-line" style="margin-top: 0px;color: #999;font-size: 12px;height: 20px;width:80px;text-align: center">{{rightUserName}}</a>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</f7-block>-->
    <!--</f7-page>-->
<!--</template>-->

<!--<script>-->
  <!--import Request from '../socket/up.js';-->
  <!--import Types from '../socket/types.js';-->
  <!--import AnimateText from '../utils/animate-text';-->
  <!--import { mapMutations } from 'vuex';-->
  <!--import LoadingView from './components/LoadingView';-->

  <!--import { getHeadPortraitById} from '../utils/utils.js';-->

  <!--export default {-->
	  <!--components: { LoadingView },-->
    <!--props: {-->
      <!--game:{},-->
    <!--},-->
    <!--data(){-->
        <!--return{-->
          <!--isScale:false,-->
          <!--defHeadUrl:'./static/images/pingtaitx01.png',-->
          <!--leftUserName: "",-->
          <!--rightUserName:"matching...",-->
          <!--leftUserHead:'./static/images/pingtaitx01.png',-->
          <!--rightUserHead:'./static/images/head_icon.png',-->
          <!--//gameName:"",-->
          <!--matchResult:"......",-->
          <!--matchUsers:[],-->
          <!--dataManager: null,-->
          <!--gameBtn:"./static/images/match_game_name.png",-->
          <!--toastTopError:null,-->
          <!--leftHeadPortraitFrame:null,-->
          <!--rightHeadPortraitFrame:null,-->
          <!--matchTime:0-->
        <!--}-->
    <!--},-->

    <!--created(){-->
    <!--},-->

    <!--mounted(){-->
      <!--this.startMatchAni();-->
      <!--this.$dataManager.clearMatchUser();-->
      <!--this.$dataManager.onMatchedCallback = this.updateMatchResult;-->
      <!--this.addSelfToMatch();-->
      <!--this.startMatch();-->
    <!--},-->

    <!--destroyed(){-->
        <!--this.$dataManager.clearMatchUser();-->
        <!--this.$dataManager.onMatchedCallback = null;-->

        <!--if ( this.timeOutObject )-->
        <!--{-->
            <!--clearTimeout(this.timeOutObject);-->
            <!--this.timeOutObject = null;-->
        <!--}-->
    <!--},-->

    <!--methods:{-->
      <!--...mapMutations(['setMatchUser']),-->
      <!--getGameName(){-->
        <!--return this.game.gameName;-->
      <!--},-->

      <!--onClickCloseMatch(){-->
         <!--this.$f7router.back();-->
         <!--this.cancelMatch();-->
      <!--},-->

        <!--addSelfToMatch() {-->
            <!--let userInfo = this.$store.getters.getUserInfo();-->
            <!--this.leftUserName = userInfo.userName;-->
            <!--this.userName = userInfo.userName;-->
            <!--this.userId = userInfo.userId;-->

            <!--let headPortraitFrameArray = this.$store.getters.getHeadPortraitFrameArray()-->
            <!--this.leftHeadPortraitFrame=getHeadPortraitById(headPortraitFrameArray,userInfo)-->
            <!--this.leftUserHead = this.$store.getters.getHeadImg(userInfo.headPortrait)-->
            <!--this.matchUsers = [];-->

            <!--this.$dataManager.addMatchUser({-->
                <!--userId: userInfo.userId,-->
                <!--userName: userInfo.userName,-->
                <!--userHead: userInfo.headPortrait,-->
                <!--headPortraitFrame: userInfo.headPortraitFrame-->
            <!--});-->

            <!--//初始化名字-->
            <!--this.$dataManager.setMatchGame(this.game.gameId);-->
        <!--},-->

      <!--showErrorToast(msg) {-->
          <!--// const self = this;-->
          <!--// if ( self.toastTopError == null ) {-->
          <!--//     self.toastTopError = self.$f7.toast.create(-->
          <!--//       {-->
          <!--//           text: msg,-->
          <!--//           position: 'top',-->
          <!--//           closeTimeout: 2000,-->
          <!--//       }-->
          <!--//     );-->
          <!--// }-->
          <!--// self.toastTopError.open();-->
      <!--},-->

      <!--startMatch(){-->
        <!--this.matchTime = Date.parse(new Date());-->
        <!--let game = this.game.gameId;-->
        <!--let msg = Request.up.match_game.create({-->
          <!--_gid: game-->
        <!--});-->
        <!--let buf = Request.up.match_game.encode(msg).finish();-->
        <!--this.$websocket.send(Types.MsgEnum.match_game, buf,false).then(()=>{-->
            <!--console.log('send match games')-->
          <!--},-->
          <!--()=>{-->
            <!--console.log('reject match games')-->
          <!--}-->
        <!--)-->

        <!--let _this = this;-->
        <!--if ( this.timeOutObject )-->
        <!--{-->
            <!--clearTimeout(this.timeOutObject);-->
        <!--}-->
        <!--this.timeOutObject = setTimeout(function () {-->
            <!--_this.showErrorToast('Matching Failed!');-->
            <!--_this.onClickCloseMatch();-->
        <!--},25*1000)-->
      <!--},-->

      <!--cancelMatch(){-->
        <!--let msg = Request.up.cancel_match_game.create();-->
        <!--let buf = Request.up.cancel_match_game.encode(msg).finish();-->
        <!--this.$websocket.send(Types.MsgEnum.cancel_match_game, buf, false).then(-->
          <!--()=>{-->
            <!--console.log('cancel match games')-->
          <!--},-->
          <!--()=>{-->
            <!--console.log('reject match games')-->
          <!--}-->
        <!--);-->
      <!--},-->

      <!--updateMatchResult(user)-->
      <!--{-->
          <!--console.log("updateMatchResult");-->
          <!--if ( user != null ) {-->
              <!--let matchTime = this.getMatchingTime();-->
              <!--//判断匹配的玩家AI/真人-->
              <!--if(user.isRobot){-->
                  <!--this.sendGameMatchAITime(matchTime);-->
              <!--} else {-->
                  <!--this.sendGameMatchRoleTime(matchTime);-->
              <!--}-->
              <!--this.rightUserName = user.userName;-->
              <!--this.rightUserHead=this.$store.getters.getHeadImg(user.userHead)-->
              <!--let headPortraitFrameArray = this.$store.getters.getHeadPortraitFrameArray()-->
              <!--// this.rightHeadPortraitFrame=getHeadPortraitById(headPortraitFrameArray,user)-->
              <!--if(headPortraitFrameArray!=null){-->
                  <!--for (let headPortraitFrame of headPortraitFrameArray) {-->
                      <!--if (headPortraitFrame.id == user.headPortraitFrame) {-->
                          <!--this.rightHeadPortraitFrame = headPortraitFrame.image-->
                      <!--}-->
                  <!--}-->
              <!--}-->

              <!--this.startMatchEndAni();-->
          <!--}-->
      <!--},-->

      <!--toGameImg(){-->
        <!--return "url("+this.gameBtn+")";-->
      <!--},-->

      <!--startMatchAni(){-->
        <!--new AnimateText('.search-title', {-->
            <!--time: 1000,-->
			<!--// spanClassName: 'animate-text-text-span',-->
            <!--onAnimated: function () {console.log('动画结束')}-->
        <!--})-->
      <!--},-->

      <!--startMatchEndAni(){-->
          <!--this.$$('#rightplayer').removeClass('player-view');-->
              <!--this.$$('#rightplayer').addClass('move-right');-->

          <!--this.$$('#leftplayer').removeClass('player-view');-->
          <!--this.$$('#leftplayer').addClass('move-left');-->
          <!--this.isScale = true;-->
      <!--},-->
      <!--getMatchingTime: function (){-->
        <!--let _this = this;-->
        <!--let timestamp =Date.parse(new Date());-->
        <!--return Math.abs(_this.matchTime - timestamp) / 1000;-->
      <!--},-->

      <!--sendGameMatchAITime(time) {-->
        <!--// console.log("统计每局AI的匹配时间   "+time)-->
        <!--let userId = this.$store.getters.getUserInfo().userId;-->
        <!--var param = {'label': userId,'Value': time};-->
        <!--if (this.$config.deviceName !== "browser") {-->
            <!--facebookConnectPlugin.logEvent("Game_match_ai_time", param, 1, function () {-->
                <!--console.log("logEvent success!");-->
            <!--}, function (error) {-->
                <!--//退出失败-->
                <!--console.log("logEvent failure!");-->
                <!--console.log(error.toString());-->
            <!--});-->
        <!--}-->
      <!--},-->
      <!--sendGameMatchRoleTime(time) {-->
        <!--// console.log("统计每局和真人的匹配时间   "+time)-->
        <!--let userId = this.$store.getters.getUserInfo().userId;-->
        <!--var param = {'label': userId,'Value': time};-->
        <!--if (this.$config.deviceName !== "browser") {-->
            <!--facebookConnectPlugin.logEvent("Game_match_role_time", param, 1, function () {-->
                <!--console.log("logEvent success!");-->
            <!--}, function (error) {-->
                <!--//退出失败-->
                <!--console.log("logEvent failure!");-->
                <!--console.log(error.toString());-->
            <!--});-->
        <!--}-->
      <!--},-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

    <!--.pk-head{-->
        <!--width: 80px;-->
        <!--height:80px;-->
        <!--border-radius: 41px!important;-->
        <!--border:2px solid white;-->

    <!--}-->

    <!--.pk-view{-->
        <!--width:100%;-->
        <!--height:198px;-->
        <!--background: white;-->
        <!--margin-top: 0px;-->
        <!--position: relative;-->
        <!--align-items: center;-->
        <!--align-content: center;-->
    <!--}-->

    <!--.pk-block{-->
        <!--padding-left: 0px!important;-->
        <!--padding-right: 0px!important;-->
        <!--margin-top: 90px!important;-->
        <!--background: #E5E5E5;-->
    <!--}-->

    <!--.search-icon{-->
        <!--width: 30px;-->
        <!--height: 30px;-->
        <!--z-index:20!important;-->
        <!--margin-left: 20px;-->
        <!--margin-right: 30px;-->
        <!--margin-top: 0px;-->
        <!--animation-name:search-icon;-->
        <!--animation-duration: .3s;-->
        <!--animation-iteration-count: infinite;-->
        <!--animation-direction: alternate;-->
    <!--}-->

    <!--@keyframes search-icon{-->
        <!--to{-->
            <!--transform:scale(1.2);-->
        <!--}-->
    <!--}-->

    <!--.game-name1{-->
        <!--background: #FF4A6D;-->
        <!--margin-top: 0px!important;-->
        <!--margin-bottom:0px;-->
        <!--height: 48px;-->
        <!--width: 100%;-->
        <!--color: white;-->
        <!--font-size: 18px;-->
        <!--text-align: center;-->
        <!--line-height:48px;-->
        <!--border-top-left-radius: 8px;-->
        <!--border-top-right-radius: 8px-->
    <!--}-->

    <!--.player-view{-->
        <!--position:absolute;-->
        <!--display: flex;-->
        <!--display: -webkit-flex;-->
        <!--flex-direction: column;-->
        <!--align-items: center;-->
        <!--top: 24%;-->
    <!--}-->

    <!--.move-right{-->
        <!--position:absolute;-->
        <!--display: flex;-->
        <!--display: -webkit-flex;-->
        <!--flex-direction: column;-->
        <!--align-items: center;-->
        <!--top: 24%;-->
        <!--animation-name: move-right;-->
        <!--animation-timing-function: ease-in-out;-->
        <!--animation-fill-mode: forwards;-->
        <!--animation-duration: .6s;-->
        <!--animation-iteration-count: 1;-->
    <!--}-->

    <!--@keyframes move-right{-->
        <!--30% {transform: translateX(0%)}-->
        <!--75% {transform: translateX(80%)}-->
        <!--100% {transform: translateX(38%)}-->
    <!--}-->

    <!--.move-left{-->
        <!--position:absolute;-->
        <!--display: flex;-->
        <!--display: -webkit-flex;-->
        <!--flex-direction: column;-->
        <!--align-items: center;-->
        <!--top: 24%;-->
        <!--animation-name: move-left;-->
        <!--animation-timing-function: ease-in-out;-->
        <!--animation-fill-mode: forwards;-->
        <!--animation-duration: .6s;-->
        <!--animation-iteration-count: 1;-->
    <!--}-->

    <!--@keyframes move-left{-->
        <!--30% {transform: translateX(0%)}-->
        <!--75% {transform: translateX(-80%)}-->
        <!--100% {transform: translateX(-34%)}-->
    <!--}-->

    <!--.bongo-vs{-->
        <!--width: 80px;-->
        <!--height:80px;-->
        <!--position:absolute;-->
        <!--/*display: -webkit-flex;*/-->
        <!--flex-direction: column;-->
        <!--align-items: center;-->
        <!--top: 24%;-->
        <!--margin-left: 38%;-->
        <!--display: none;-->
    <!--}-->

    <!--.bongo-vs.active{-->
        <!--position: absolute;-->
        <!--top: 24%;-->
        <!--margin-left: 38%;-->
        <!--display: block;-->
        <!--animation-name:bongo-vs-scale;-->
        <!--animation-duration: .4s;-->
        <!--animation-iteration-count: 1;-->
        <!--animation-fill-mode: forwards;-->
        <!--animation-timing-function: linear;-->
        <!--display: block;-->
    <!--}-->

    <!--@keyframes bongo-vs-scale{-->
        <!--0%{-->
            <!--transform: scale(0) ;-->
        <!--}-->
        <!--25%{-->
            <!--transform: scale(0.2) ;-->
        <!--}-->
        <!--75%{-->
            <!--transform: scale(0.5);-->
        <!--}-->
        <!--100%{-->
            <!--transform: scale(1);-->
        <!--}-->
    <!--}-->
<!--</style>-->
