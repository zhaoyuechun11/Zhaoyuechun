<template>
    <f7-page name="gameResult" style="background: #252525">
        <f7-navbar no-shadow style="background-color: transparent">
            <f7-nav-left>
                <f7-link @click="onClickBackToHome" icon-only>
                    <f7-icon ios="f7:close" md="material:close"></f7-icon>
                </f7-link>
            </f7-nav-left>
        </f7-navbar>
        <f7-row>
            <f7-col style="background: transparent">
                <img width="80%" v-bind:src="ImgTitleUrl()"/>
            </f7-col>
        </f7-row>
        <!-- <f7-block style="padding: 0px 35px;margin-bottom: 0px;margin-top:0px;padding-bottom: 0px">
            <f7-row strong>
                <f7-col width="25" style="background: transparent">
                    <div style="margin-top: 8px;color: #FFFFFF;width:100%;display:flex;justify-content: center;align-items: center" v-show="isWin">
                        <a style="font-size: 16px;color:#F9C032 ">+5</a>
                        <img src="static/images/bcion.png" style="width: 28px;height: 28px;margin-left: 10px;"/>
                    </div>
                </f7-col>
                <f7-col width="50" style="background: transparent">
                </f7-col>
                <f7-col width="25" style="background: transparent">
                    <div style="margin-top: 8px;color: #FFFFFF;width:100%;display:flex;justify-content: center;align-items: center" v-show="!isWin">
                        <a style="font-size: 16px;color: #F9C032">+5</a>
                        <img src="static/images/bcion.png" style="width:28px;height: 28px;margin-left: 10px;"/>
                    </div>
                </f7-col>
            </f7-row>
        </f7-block> -->

        <!-- <f7-block style="padding: 15%">
            <f7-row>
                <f7-col style="background: transparent">
                    <f7-button  v-if="joinGame !== undefined" big fill style="background-color:#ff4a70" @click="onJoinGame">Join</f7-button>
                    <f7-button  v-if="joinGame === undefined" big fill style="background-color:#ff4a70" @click="onPlayAgain" :disabled="isSendInvited">
                        {{getButtonText()}}
                    </f7-button>
                </f7-col>
            </f7-row>
            <f7-row style="margin-top: 10px">
                <f7-col  style="background: transparent">
                    <f7-button big fill color="gray" style="display: none">More Games</f7-button>
                </f7-col>
            </f7-row>
        </f7-block> -->
    </f7-page>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { getHeadPortraitById,getNowTimeLab} from '../utils/utils.js';
  export default {
    props: {
      ret:Number,
      gameId:String,
      users:Array
    },

    data(){
      return{
        defHeadUrl:'/static/images/morentou.png',
        leftUserName: "",
        leftUserHead:"/static/images/temphead01.png",
        rightUserName:"",
        rightUserHead:"/static/images/temphead10.png",
        leftScore: 1,
        rightScore: "02",
        gameName:"",
        joinGame:undefined,
        isSendInvited: false,
        leftHeadPortraitFrame:null,
        rightHeadPortraitFrame:null,
        isWin:false,
      }
    },

      mounted () {

          this.leftUserName = this.users[0].userName;
          this.leftUserHead = this.$store.getters.getHeadImg(this.users[0].userHead);
          let headPortraitFrameArray = this.$store.getters.getHeadPortraitFrameArray()
          this.leftHeadPortraitFrame = getHeadPortraitById(headPortraitFrameArray, this.users[0])
          this.rightUserName = this.users[1].userName;
          this.rightUserHead = this.$store.getters.getHeadImg(this.users[1].userHead);
          this.rightHeadPortraitFrame = getHeadPortraitById(headPortraitFrameArray, this.users[1])

          console.log('this game result == ' + this.ret);
          if (this.ret > 0) {
              this.$dataManager.addGameHistory(this.users[1].userId, true);
              this.isWin = true
              let mineInfo = this.$dataManager.getMyself();
              mineInfo.totalCredit =  mineInfo.totalCredit + 5;
              //this.setTotalCredit(totalCredit + 5)
          }
          else if (this.ret < 0) {
              this.$dataManager.addGameHistory(this.users[1].userId, false);
              this.isWin = false
          }
      if(this.hasRobot()){
          this.sendGameWinRole(!this.isWin);
      }
          let score = this.$dataManager.getGameHistory(this.users[1].userId);

          this.leftScore = score[0];
          this.rightScore = score[1];

          //判断是否有邀请
          this.onInvitedCallback();
          this.$dataManager.onInvitedCallback = this.onInvitedCallback;
          this.$dataManager.onRejectInvitedGame = this.onRejectInvitedGame;

          this.gameName=this.getGameName()
          //添加到达结果页的用户信息，显示在陌生人信息中
          let hasFriend=this.$dataManager.hasFriend(this.users[1].userId)
          var currentDate=getNowTimeLab()
          if (hasFriend===undefined) {
              this.$dataManager.addStronger({
                  userId: this.users[1].userId,
                  userName: this.rightUserName,
                  userHead: this.rightUserHead,
                  rightHeadPortraitFrame: this.rightHeadPortraitFrame,
                  gameName:this.gameName,
                  recivetime:currentDate,
              })
          }
      },

    destroyed(){
      console.log('destroyed object ');
      this.$dataManager.onInvitedCallback = null;
      this.$dataManager.onRejectInvitedGame = null;
    },

    methods:{
      //  ...mapMutations(['setTotalCredit']),
      getButtonText(){
        return this.isSendInvited ? "Wait Join" : "Play Again";
      },

      ImgTitleUrl(){


        if ( this.ret > 0 )
        {
            return "./static/images/bongo_win.png";
        }
        else if ( this.ret == 0 )
        {
            return "./static/images/bongo_tie.png";
        }
        else
        {
            return "./static/images/bongo_lose.png"
        }
      },

      getGameName(){
        let game=this.$gameManager.getGameData(this.gameId)
          console.log("获取游戏信息")
          console.log(game)
        return game.gameName;
      },

      onClickBackToHome(){

          this.$f7router.navigate("/chat/", {
              props: {
                toUser:{
                  userName: this.users[1].userName,
                  userId: this.users[1].userId,
                  userHead: this.users[1].userHead,
                  headPortraitFrame:this.users[1].headPortraitFrame,
                }
              },
              clearPreviousHistory:true
          });

          this.$dataManager.setInvitedGame(undefined);
          this.$dataManager.cancelInviteGame(this.gameId, this.users[1].userId);
      },

      onPlayAgain(){
        let timestamp = Date.now() - this.$websocket.serverTimeDelay;
        this.$dataManager.sendInvitedGame(this.gameId, this.users[1].userId, timestamp);
        this.$dataManager.setInvitedGame({
            gameId:this.gameId,
            userId:this.users[1].userId,
        })

        this.isSendInvited = true;
        this.sendGamePlayAgain(this.gameId);
      },

      onInvitedCallback(data){
         console.log('on invited callback in game result page');
         this.joinGame = this.$dataManager.getJoinMatchGame(this.users[1].userId);
      },

      onRejectInvitedGame()
      {
          this.onClickBackToHome();
      },

      onJoinGame(){
        this.$dataManager.agreeInviteGame(this.gameId, this.users[1].userId, true);
      },

      hasRobot(){
        for( let i = 0; i < this.users.length; i++)
        {
            if ( this.users[i].isRobot )
            {
                return true;
            }
        }
        return false;
      },

      sendGameWinRole(aiWin){
        // console.log("统计AI和真人用户游戏获胜的百分比 ");
        let userId = this.$dataManager.getMyselfId();
        let param = {'label': userId,'value':this.gameId,'extra':aiWin};
        if (this.$config.deviceName !== "browser") {
            facebookConnectPlugin.logEvent("Game_win_role", param, 1, function () {
                console.log("logEvent success!");
            }, function (error) {
                //退出失败
                console.log("logEvent failure!");
                console.log(error.toString());
            });
        }
      },

      sendGamePlayAgain(name){
        // console.log("再来一局的点击次数:"+name);
        let userId = this.$dataManager.getMyselfId();
        let param = {'label': userId,'value':name};
        if (this.$config.deviceName !== "browser") {
            facebookConnectPlugin.logEvent("Game_play_again", param, 1, function () {
                console.log("logEvent success!");
            }, function (error) {
                //退出失败
                console.log("logEvent failure!");
                console.log(error.toString());
            });
        }
       }
    }
  }
</script>

<style scoped>

</style>
