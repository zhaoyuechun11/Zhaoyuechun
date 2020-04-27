<template>
  <f7-page name="chat" style="padding-top: 130px">
    <f7-navbar no-shadow style="display:block; height: 80px; background-color: white">
       <f7-nav-left>
           <f7-link @click="onClickBack" icon-only>
               <i class="icon icon-back color-gray"></i>
            </f7-link>
       </f7-nav-left>
      <div class="pknav">
        <div class="account" v-on:click="goPersonal(1)">
          <score-view  id="fromView" style="width: 46px;height: 46px;background:transparent"  :innerImgUrl="fromUserHead" :outerImgUrl="getFromUserOuterUrl(1)" />
          <a style="font-size: 12px;margin-top: 4px;width: 80px;height: 18px; text-transform:capitalize;text-align: center;color: #999" ref="fromuser" class="single-line">{{fromUserName}}</a>
        </div>
        <div style="width: auto;max-height: 80px;">
          <a style="font-size: 16px;width: 30px;color: #515151">{{leftScore}}</a>
          <a style="font-size: 16px;color: #515151">:</a>
          <a style="font-size: 16px;width: 30px;color: #515151">{{rightScore}}</a>
        </div>
        <div class="account" v-on:click="goPersonal(2)">
            <score-view  id="toView" style="width: 46px;height: 46px;background:transparent" :innerImgUrl="toUserHead" :outerImgUrl="getFromUserOuterUrl(2)" />
          <a style="font-size: 12px;margin-top: 4px;width: 80px;height: 18px; text-transform:capitalize;text-align: center;color: #999" ref="touser" class="single-line">{{toUserName}}</a>
          <template v-if="isStranger">
            <img src="static/images/add_friend.png" class="add-icon" @click="onAddFriend">
          </template>
        </div>
      </div>
      <!--<div style="width: 56px;height: 56px;" type="button">-->
      <!--</div>-->
        <f7-nav-right style="width: 56px;height: 56px;margin-right: 18px;" >
            <!--<f7-link style="width: 56px;height:48px; " @click="microphoneChange">-->
            <template v-if="isMute">
                <img src="static/images/mute.png" style="width: 30px;height:30px;z-index: 60;margin-right: 13px;padding-left: 13px;" @click="microphoneChange">
            </template>
            <template v-else>
                <img src="static/images/microphone.png" style="width: 30px;height:30px;z-index: 60;margin-right: 13px;padding-left: 13px;" @click="microphoneChange">
            </template>
            <!--</f7-link>-->
        </f7-nav-right>
    </f7-navbar>
    <!-- play games -->
    <f7-toolbar ref="gameList" no-shadow no-hairline style="z-index: 400; top: 80px; padding-top: 35%; background-color: #FFFFFF">
      <f7-swiper style="height: 100%; width: 100%" scrollbar :params="{speed:500, slidesPerView: 3, spaceBetween: 5}">
        <f7-swiper-slide v-for="game in gameList" :key="game.gameId">
              <f7-card no-border style= "margin: 5px 5px; height: 90%" @click="onInvitePlayGame(game)" >
                <f7-card-header
                  class="no-border"
                  valign="bottom"
                  :style="{'background-image': toGameImg(game)}"
                   style="background-size: cover;
                       color: #FFFFFF;
                       height: 70%;
                       font-weight: bold;
                       justify-content: center;
                       border-radius: 4px;
                       width: 100%;
                       padding: 4px 4px;
                       text-transform: uppercase;
                       font-size: 10px; ">
                      {{game.gameName}}
                </f7-card-header>
                <f7-card-footer style="justify-content: center; min-height: 0;">
                  <f7-button fill small color="red" style="width: 80%;" @click="onInvitePlayGame(game)">Play</f7-button>
                </f7-card-footer>
              </f7-card>
        </f7-swiper-slide>
      </f7-swiper>
    </f7-toolbar>
    <f7-toolbar ref="invitedGame" no-shadow no-hairline style="z-index: 400; top: 80px; height:250px; background-color: #FFFFFF">
       <f7-row style="width: 100%; height: 100%">
         <f7-col v-if="invitedGame !== undefined ">
          <f7-card style="border-radius: 0px; margin: 10px 5%; box-shadow: none;">
              <f7-card-header
                class="no-border"
                valign="bottom"
                :style="{'background-image':toGameImg(invitedGame)}"
                style="height: 180px; background-size: cover; background-position: center; color: #FFFFFF;
                         justify-content: center; border-radius: 4px; width: 100%;text-transform: uppercase">
                  <div class="timer-round">
                      <div class="text-num">{{invitedTimer}}</div>
                  </div>
                </f7-card-header>
              <f7-card-footer style="justify-content: center">
              <f7-button outline color="red" style="width: 80%; margin: 10px 0px; color: red" @click="onCancelInvitedGame(invitedGame)">Cancel</f7-button>
            </f7-card-footer>
          </f7-card>
         </f7-col>
         <f7-col v-if="joinGame !== undefined ">
           <f7-card style="border-radius: 0px; margin: 10px 5%; box-shadow: none;">
               <f7-card-header
                       class="no-border"
                       valign="bottom"
                       :style="{'background-image':toGameImg(joinGame)}"
                       style=" height: 180px; background-size: cover; background-position: center; color: #FFFFFF;
                         justify-content: center; border-radius: 4px; width: 100%;text-transform: uppercase"
                      >
                   <div class="timer-round">
                       <div class="text-num">{{joinTimer}}</div>
                   </div>
               </f7-card-header>
               <f7-card-footer style="padding: 4px 4px">
                  <f7-button outline color="red" style="min-width: auto; width: 45%; margin: 10px 0px; color: red" @click="onJoinPlayGame(false)">Reject</f7-button>
                  <f7-button fill color="red" style="min-width: auto; width: 45%; margin: 10px 0px; color: white" @click="onJoinPlayGame(true)">Join</f7-button>
             </f7-card-footer>
           </f7-card>
         </f7-col>
       </f7-row>
    </f7-toolbar>

        <f7-messagebar
                style="padding-left:12px"
                :placeholder="placeholder"
                ref="messagebar"
                :attachments-visible="attachmentsVisible"
                :sheet-visible="sheetVisible"
                :value="messageText"
                @input="messageText = $event.target.value"
        >
            <f7-link style="display: none"
                     icon-ios="f7:camera_fill"
                     icon-md="material:camera_alt"
                     slot="inner-start"
                     @click="sheetVisible = !sheetVisible"
            ></f7-link>
            <f7-link
                    icon-ios="f7:arrow_up_fill"
                    icon-md="material:send"
                    slot="inner-end"
                    @click="sendMessage"
            ></f7-link>
            <f7-messagebar-attachments>
                <f7-messagebar-attachment
                        v-for="(image, index) in attachments"
                        :key="index"
                        :image="image"
                        @attachment:delete="deleteAttachment(image)"
                ></f7-messagebar-attachment>
            </f7-messagebar-attachments>
        </f7-messagebar>

        <f7-messages ref="messages">
            <f7-messages-title>{{getCurrentDate}}</f7-messages-title>
            <f7-message
                    v-for="(message, index) in messagesData"
                    :key="index"
                    :type="message.type"
                    :image="message.image"
                    :name="message.name"
                    :avatar="message.avatar"
                    :first="isFirstMessage(message, index)"
                    :last="isLastMessage(message, index)"
                    :tail="isTailMessage(message, index)"
            >
                <span slot="text" v-if="message.text" v-html="message.text"></span>
            </f7-message>
            <f7-message v-if="typingMessage"
                        type="received"
                        :typing="true"
                        :first="true"
                        :last="true"
                        :tail="true"
                        :header="`${typingMessage.name} is typing`"
                        :avatar="typingMessage.avatar"
            ></f7-message>
        </f7-messages>

        <div class="popup popup-settlement">
            <div class="link" @click="onSettlementClose" style="position: absolute; right: 25px; top: 25px">
                <i class="icon material-icons" style="color: white;">close</i>
            </div>
            <div class="settlement-center">
                <div class="settlement-dialog" style="display: flex; flex-direction: column; align-items: center">
                    <div class="settlement-title">
                        <img :src="settlement.titleImage" style="width: 100%;">
                    </div>
                    <div class="settlement-coin" :class="{'settlement-coin-gray': settlement.checkIsFail}">
                        <img src="static/images/settlement_coin.png" style="width: 75px;">
                        <div class="settlement-add-five">
                            {{settlement.addCoinText}}
                        </div>
                        <div class="settlement_streak" style="opacity: 0; filter: alpha(opacity=0)">
                            <div class="settlement-streak-text" style=" background-size: cover; background-image: url('static/images/settlement_streaks.png')">
                                {{settlement.streaksText}}
                            </div>
                        </div>
                    </div>
                    <div class="settlement-content" style="display: flex; justify-content: center; align-items: center;">
                        <div class="head-left" style="width: 25%;height: auto">
                            <score-view style="width: 68px; height: 68px;" :innerImgUrl="fromUser.userHead"
                                        :outerImgUrl="fromUser.userHeadFrame"/>
                            <a  style="text-transform: uppercase; margin-top: 0px;color: #999;font-size: 12px;height: 20px;width:68px;text-align: center">{{fromUser.userName}}</a>
                        </div>
                        <div class="settlement-vs" style="margin: 0px 20px; width: 25%; display: flex; align-items: center; font-size: 30px">
                            <div style="width: 40%;">
                                {{settlement.leftScoreText}}
                            </div>
                            <div style="width: 20%;">
                                ：
                            </div>
                            <div style="width: 40%;">
                                {{settlement.rightScoreText}}
                            </div>
                        </div>
                        <div class="head-right" style="width: 25%;height: auto;">
                            <score-view style="width: 68px; height: 68px;" :innerImgUrl="toUser.userHead"
                                        :outerImgUrl="toUser.userHeadFrame"/>
                            <a style="text-transform: uppercase; margin-top: 0px;color: #999;font-size: 10px;height: 20px;width:68px; text-align: center; overflow: hidden">{{toUser.userName}}</a>
                        </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center;">
                    <div class="settlement-button"
                         style="display: flex; flex-direction: column; align-items: center">
                        <div style="padding-top: 16px">
                            <div style="width: 240px;">
                                <div class="button" @click="onClickMoreGames"
                                     style="color: white; font-weight: bold; padding-top: 12px; height: 55px; width: 100%; font-size: 16px; background-image: url('static/images/settlement_btn_white.png'); background-size: cover;">
                                    more games
                                </div>
                            </div>
                        </div>
                        <div class="settlement-toagame">
                            <div style="width: 245px; height: 56px; padding-top: 10px">
                                <div v-if = "settlement.isJoinGame" class="button" @click="onSettlementJoin"
                                     style="color: white; font-weight: bold; padding-top: 12px; height: 60px; width: 100%; font-size: 16px; background-image: url('static/images/settlement_btn_red.png'); background-size: cover;">
                                     Join
                                </div>
                                <div v-if = "settlement.isJoinGame == false" class="button" @click="onSettlementPlay" :class="{'settlement-coin-gray' : settlement.isWaitGame}"
                                     style="color: white; font-weight: bold; padding-top: 12px; height: 60px; width: 100%; font-size: 16px; background-image: url('static/images/settlement_btn_red.png'); background-size: cover;">
                                    {{settlement.playAgainText}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
  import Request from '../socket/up.js';
  import { mapMutations } from 'vuex'

  import Response from '../socket/down.js';
  import Types from '../socket/types.js';
  import {checkAudioPermission,closeMuteAudio,getTokenAndChannel,voiceChat,getAudioPermission} from '../utils/agora.js';
  import { f7Navbar, f7Page, f7Messages, f7MessagesTitle, f7Message, f7Messagebar, f7Link, f7MessagebarAttachments, f7MessagebarAttachment, f7MessagebarSheet, f7MessagebarSheetImage } from 'framework7-vue';
  export default {
    components: {
      f7Navbar,
      f7Page,
      f7Messages,
      f7MessagesTitle,
      f7Message,
      f7Messagebar,
      f7MessagebarAttachments,
      f7MessagebarAttachment,
      f7MessagebarSheet,
      f7MessagebarSheetImage,
      f7Link,
    },

        props: {
            toUser: {
                userName: String,
                userId: Number,
                userHead: String,
                headPortraitFrame: String,
            },

            gameResult: {
               ret : 0,
               gameId : 0,
            }
        },

        data() {
            return {
                attachments: [],
                sheetVisible: false,
                typingMessage: null,
                messageText: '',
                fromUser: null,
                messagesData: [
                    {
                        type: 'sent',
                        text: 'Hi, Kate',
                    },
                    {
                        name: 'Kate',
                        type: 'received',
                        text: 'Hi, I am good!',
                        avatar: 'http://lorempixel.com/100/100/people/9',
                    }
                ],

                responseInProgress: false,
                gameList: [],
                fullHeight: 0,
                invitedGame: undefined,
                joinGame: undefined,
                leftScore: 0,
                rightScore: 0,
                invitedTimer: 0,
                invitedTimerObject: null,
                joinTimer: 0,
                joinTimerObject: null,
                mocrophoneIcon: "./static/images/mute.png",
                accessToken: "",
                isMute: false,
                userAgoraId: 0,
                isStranger: false,
                chatTime: 0,
                settlement : {
                    titleImage : "static/images/settlement_win.png",
                    addCoinText : "+5",
                    streaksText : "x 3 streaks",
                    leftScoreText : "0",
                    rightScoreText : "0",
                    checkIsFail : false,
                    playAgainText : "Play Again",
                    isJoinGame : false,
                    isWaitGame : false,
                }
            };
        },
        computed: {

            attachmentsVisible() {
                const self = this;
                return self.attachments.length > 0;
            },

            placeholder() {
                const self = this;
                return self.attachments.length > 0 ? 'Add comment or Send' : 'Send a message';
            },

            toUserName() {
                return this.toUser.userName;
            },

            toUserHead() {
                return this.$store.getters.getHeadImg(this.toUser.userHead)
            },

            fromUserName() {
                return this.fromUser.userName;
            },

            fromUserHead() {
                return this.$store.getters.getHeadImg(this.fromUser.headPortrait)
            },

            getCurrentDate() {
                return "";//'<b>Sunday, Feb 9,</b> 12:58';
            },
        },

        mounted() {
            const self = this;
            self.chatTime = Date.parse(new Date());
            self.$f7ready(() => {
                self.messagebar = self.$refs.messagebar.f7Messagebar;
                self.messages = self.$refs.messages.f7Messages;
            });

            this.messagesData = [];
            this.isStranger = (this.$dataManager.isMyFriend(this.toUser.userId) || this.$dataManager.isSendAddFriend(this.toUser.userId)) == false;

            // 添加离线消息和不在聊天室消息
            let notifys = this.$dataManager.getNotifyMessage(this.toUser.userId);
            if (notifys != undefined) {
                for (let i = 0; i < notifys.length; i++) {
                    if (notifys[i].type == 'chat' && notifys[i].temp != true) {
                        this.$dataManager.addChatInfo(this.toUser.userId, notifys[i].data);
                    }
                }
                this.$dataManager.removeNotifyMessage(this.toUser.userId);
            }

            let chatList = this.$dataManager.getChatInfo(this.toUser.userId);
            for (let i = 0; i < chatList.length; i++) {
                if (chatList[i] == null)
                    continue;

                let chatMsg = {};
                if (chatList[i]._uid == this.fromUser.userId) {
                    chatMsg.type = 'sent';
                    chatMsg.name = this.fromUser.userName;
                    chatMsg.text = chatList[i]._data;
                } else {
                    chatMsg.type = 'received';
                    chatMsg.name = this.toUser.userName;
                    chatMsg.text = chatList[i]._data;
                    chatMsg.avatar = this.$store.getters.getHeadImg(this.toUser.userHead);
                }
                this.messagesData.push(chatMsg);
            }
            let score = this.$dataManager.getGameHistory(this.toUser.userId);


            this.leftScore = score[0];
            this.rightScore = score[1];
            this.$dataManager.onInvitedCallbackChat = this.onInvitedCallback;
            this.$dataManager.onHandleChatCallback = this.onHandleGameChat;

            this.onInitInvited();
            this.onInitSettlement();

            if(this.$config.deviceName=='android'){
                //检查网络权限，有权限则默认打开语音
                checkAudioPermission(function (status) {
                    if(status){
                        //有录音权限，默认打开语音
                        self.isMute==false
                        console.log("defualt open microphone!")
                        getTokenAndChannel(self.$websocket, self.toUser.userId,function (accessToken,_channel_name,voice) {
                            self.accessToken=accessToken
                            console.log("get token and channel: "+accessToken+_channel_name)
                            // self.voiceChat(self.accessToken,_channel_name,"voice chat")
                            voiceChat(self.accessToken,_channel_name,self.fromUser.userId,"voice chat",function (uid,channel) {
                                console.log("open voice uid: "+uid+" channel: "+channel);
                            },function (err) {
                                console.log("err: "+err);
                            })
                        },function (error) {
                            console.log("err: "+err);
                        })
                    }else{
                        self.isMute=true
                        getAudioPermission(self.$websocket, self.toUser.userId,function (accessToken,_channel_name,voice) {
                            self.accessToken=accessToken
                            // self.voiceChat(self.accessToken,_channel_name,"voice chat")
                            voiceChat(self.accessToken,_channel_name,self.fromUser.userId,"voice chat",function (uid,channel) {
                                self.isMute=false
                                console.log("open voice uid: "+uid+" channel: "+channel);
                            },function (err) {
                                console.log("err: "+err);
                            })
                        },function (error) {
                            console.log("err: "+err);
                        })
                    }
                })
            }

            this.sendClickChatTime();
        },

        created() {
            var _this = this;
            _this.fromUser = _this.$dataManager.getMyself();
            _this.initGameList();

            //注册监听
            _this.$EventBus.$on("leaveChannel", () => {
                _this.$nextTick(()=>{
                    console.log("recive msg from main")
                   _this.leaveChannel()
                })
            });
        },

        beforeDestroy() {
            //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
            this.$EventBus.$off("leaveChannel");
        },

        destroyed() {
            //this.$websocket.removecallback(Types.MsgEnum.chat, this.onHandleGameChat);
            //console.log('destroy chat page ');
            //console.log('destroy chat page ');

            this.leaveChannel()
            this.$dataManager.onHandleChatCallback = null;
            this.$dataManager.onInvitedCallbackChat = null;

            if (this.invitedGame != undefined) {
                this.$dataManager.cancelInviteGame(this.invitedGame.gameId, this.toUser.userId);
            }

            if (this.joinGame != undefined) {
                this.$dataManager.agreeInviteGame(this.joinGame.gameId, this.toUser.userId, false);
            }

            this.$dataManager.setInvitedGame(undefined);
            this.$dataManager.removeJoinMatchGame(this.toUser.userId);

            //this.gameResult = undefined;

            this.onSettlementClose();
        },

        methods: {

            //...mapMutations(['setTotalCredit']),

            leaveChannel(){
                if (this.accessToken != null && this.accessToken.length > 0) {
                    console.log("chat leave channel!")
                    agoravoice.leaveChannel()
                }
            },
            onSettlementClose() {
                this.$f7.popup.close('.popup-settlement', false);
                if (this.settlement.isWaitGame )
                {
                    this.$dataManager.setInvitedGame(undefined);
                    this.$dataManager.cancelInviteGame(this.gameResult.gameId,this.fromUser.userId);
                }
                //this.gameResult = {};
            },
            onSettlementOpen() {
                this.$f7.popup.open('.popup-settlement', false);
            },
            onInitSettlement() {
                if ( this.gameResult != undefined ) {
                    let score = this.$dataManager.getGameHistory(this.toUser.userId);
                    console.log(score);
                    this.settlement.leftScoreText = score[0];
                    this.settlement.rightScoreText = score[1];

                    if (this.gameResult.ret == 0) {
                        this.settlement.titleImage = 'static/images/settlement_tie.png'
                        this.settlement.addCoinText = "";
                        this.settlement.streaksText = "x 3 streaks";
                        this.settlement.checkIsFail = true;

                    } else if (this.gameResult.ret < 0) {
                        this.settlement.titleImage = 'static/images/settlement_lose.png';
                        this.settlement.addCoinText = "";
                        this.settlement.streaksText = "x 3 streaks";
                        this.settlement.checkIsFail = true;
                    } else {
                        this.settlement.titleImage = 'static/images/settlement_win.png';
                        this.settlement.addCoinText = "+5";
                        this.settlement.streaksText = "x 3 streaks";
                        this.settlement.checkIsFail = false;
                        let mineInfo = this.$dataManager.getMyself();
                        mineInfo.totalCredit = mineInfo.totalCredit + 5;
                        //this.setTotalCredit(totalCredit + 5)
                    }
                    this.onSettlementOpen();
                }
                else
                {
                    this.onSettlementClose();
                }

                this.onSettlementButtonText();
            },

            onSettlementPlay(){
                console.log('on Settlement Play ')
                if ( this.settlement.isWaitGame == false ) {
                    console.log('on setttlement play ---- ')
                    var gameId = this.gameResult.gameId;
                    let timestamp = Date.now() - this.$websocket.serverTimeDelay;
                    this.$dataManager.sendInvitedGame(gameId, this.toUser.userId, timestamp);
                    this.$dataManager.setInvitedGame({
                        gameId: gameId,
                        userId: this.toUser.userId,
                    })

                    this.settlement.isWaitGame = true;
                    this.onSettlementButtonText();
                }
            },

            onSettlementJoin(){
               if ( this.settlement.isJoinGame )
               {
                   this.$dataManager.agreeInviteGame(this.gameResult.gameId, this.toUser.userId, true);
               }
            },

            onAddFriend() {
                let uid = this.toUser.userId;
                let msg = Request.up.add_friend.create({
                    _uid: uid
                });
                let buf = Request.up.add_friend.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.add_friend, buf, false);
                this.$dataManager.addSendAddFriend(uid);
                this.isStranger = false;
            },

            onClickBack() {
                console.log(this.$f7router.previousRoute);
                // if (this.$f7router.previousRoute && this.$f7router.previousRoute.url != '/game/') {
                //     this.$f7router.back(
                //         {
                //             force: true,
                //             ignoreCache: true
                //         }
                //     );
                // } else
                {
                    this.$f7router.navigate("/home/", {
                        clearPreviousHistory: true,
                        force: true,
                        ignoreCache: true
                    });
                }
            },

            onClickMoreGames() {
                this.onSettlementClose();
                this.$f7router.navigate("/home/", {
                    clearPreviousHistory: true,
                    force: true,
                    ignoreCache: true
                });
            },

            onSettlementButtonText() {
                this.settlement.playAgainText =  this.settlement.isWaitGame ? "Wait Join": "Play Again";
            },

            initGameList() {
                this.gameList = [];
                var lastPlay = this.$dataManager.getLastPlayGame();
                var playGames = this.$dataManager.getRecordPlayGame();

                //console.log(playGames);
                var lastPlayGame = this.$gameManager.getGameData(lastPlay);
                if (lastPlayGame != null) {
                    this.gameList.push(lastPlayGame);
                }

                for (let i = 0; i < playGames.length; i++) {
                    const gameData = this.$gameManager.getGameData(playGames[i].gameId);
                    if (gameData != null && gameData.gameId != lastPlay) {
                        this.gameList.push(gameData);
                    }
                }

                //console.log(this.gameList);
                const hasGames = this.$gameManager.getGameList();
                for (var i = 0; i < hasGames.length; i++) {
                    var find = this.gameList.findIndex(function (element) {
                        return element.gameId == hasGames[i].gameId
                    });
                    if (find >= 0) {
                        continue;
                    } else if (this.gameList.length <= 4) {
                        this.gameList.push(hasGames[i]);
                    }
                }
            },

            isFirstMessage(message, index) {
                return false;
                const self = this;
                const previousMessage = self.messagesData[index - 1];
                if (message.isTitle) return false;
                if (!previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name) return true;
                return true;
            },

            isLastMessage(message, index) {
                return true;
                const self = this;
                const nextMessage = self.messagesData[index + 1];
                if (message.isTitle) return false;
                if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
                return false;
            },

            isTailMessage(message, index) {
                return true;
                const self = this;
                const nextMessage = self.messagesData[index + 1];
                if (message.isTitle) return false;
                if (!nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name) return true;
                return false;
            },

            deleteAttachment(image) {
                const self = this;
                const index = self.attachments.indexOf(image);
                self.attachments.splice(index, 1)[0]; // eslint-disable-line
            },

            handleAttachment(e) {
                const self = this;
                const index = self.$$(e.target).parents('label.checkbox').index();
                const image = self.images[index];
                if (e.target.checked) {
                    // Add to attachments
                    self.attachments.unshift(image);
                } else {
                    // Remove from attachments
                    self.attachments.splice(self.attachments.indexOf(image), 1);
                }
            },

            toGameImg(game) {
                // 如果没找到，到游戏列表去查找
                if (game.gameImage !== undefined) {
                    return "url(" + game.gameImage + ")";
                } else {
                    for (let i = 0; i < this.gameList.length; i++) {
                        if (this.gameList[i].gameId === game.gameId) {
                            return "url(" + this.gameList[i].gameImage + ")";
                        }
                    }
                }
            },

            onHandleGameChat(chat) {
                if (chat._uid == this.toUser.userId) {
                    let receiveChat = {
                        name: this.toUserName,
                        type: 'received',
                        text: chat._data,
                        avatar: this.$store.getters.getHeadImg(this.toUser.userHead),
                    };
                    this.messagesData.push(receiveChat);
                    this.$dataManager.addChatInfo(this.toUser.userId, chat);
                } else {
                    this.$dataManager.addNotifyMessage(chat._uid,
                        {
                            type: 'chat',
                            data: chat
                        }
                    );
                }
            },

            onInvitePlayGame(game) {
                var _this = this;
                if ( _this.$config.deviceName !== "browser") {
                    var gameData = this.$gameManager.getGameData(game.gameId);
                    if ( gameData != null ) {

                        _this.$gameManager.hasDownGame(gameData.gameUrl, function (url) {

                            _this.invitedGame = {
                                gameId: game.gameId,
                                gameUserId: _this.toUser.userId,
                            }

                            _this.$refs.gameList.hide(true);
                            _this.$refs.invitedGame.show(true);

                            let timestamp = Date.now() - _this.$websocket.serverTimeDelay;
                            _this.$dataManager.sendInvitedGame(game.gameId, _this.toUser.userId, timestamp);
                            _this.$dataManager.setInvitedGame({
                                gameId: game.gameId,
                                gameUserId: _this.toUser.userId,
                            })
                            _this.$dataManager.setMatchGame(game.gameId);
                            _this.startTimerInvited();
                            _this.gameInviteFriends(game);

                        }, function (error) {

                        });
                    }
                }
                else {
                    _this.invitedGame = {
                        gameId: game.gameId,
                        gameUserId: _this.toUser.userId,
                    }

                    _this.$refs.gameList.hide(true);
                    _this.$refs.invitedGame.show(true);

                    let timestamp = Date.now() - _this.$websocket.serverTimeDelay;
                    _this.$dataManager.sendInvitedGame(game.gameId, _this.toUser.userId, timestamp);
                    _this.$dataManager.setInvitedGame({
                        gameId: game.gameId,
                        gameUserId: _this.toUser.userId,
                    })
                    _this.$dataManager.setMatchGame(game.gameId);
                    _this.startTimerInvited();
                    _this.gameInviteFriends(game);
                }
// ||||||| .r709
//                 let timestamp = Date.now() - this.$websocket.serverTimeDelay;
//                 this.$dataManager.sendInvitedGame(game.gameId, this.toUser.userId, timestamp);
//                 this.$dataManager.setInvitedGame({
//                     gameId: game.gameId,
//                     gameUserId: this.toUser.userId,
//                 })
//                 this.$dataManager.setMatchGame(game.gameId);
//                 this.startTimerInvited();
//                 this.gameInviteFriends();
// =======
//                 let timestamp = Date.now() - this.$websocket.serverTimeDelay;
//                 this.$dataManager.sendInvitedGame(game.gameId, this.toUser.userId, timestamp);
//                 this.$dataManager.setInvitedGame({
//                     gameId: game.gameId,
//                     gameUserId: this.toUser.userId,
//                 })
//                 this.$dataManager.setMatchGame(game.gameId);
//                 this.gameInviteFriends();
//                 this.startTimerInvited();
// >>>>>>> .r721
            },

            onCancelInvitedGame() {

                if (this.invitedGame != undefined) {
                    this.$dataManager.cancelInviteGame(this.invitedGame.gameId, this.toUser.userId);
                    this.$dataManager.setInvitedGame(undefined);
                    this.invitedGame = undefined;
                    this.onInitInvited();
                }
            },

            onJoinPlayGame(agree) {
                if (this.joinGame !== undefined) {
                    this.$dataManager.agreeInviteGame(this.joinGame.gameId, this.toUser.userId, agree);
                    if (agree == true) {
                        this.$dataManager.setMatchGame(this.joinGame.gameId);
                    }
                }

                this.$dataManager.removeJoinMatchGame(this.toUser.userId)
                this.joinGame = undefined;
                this.onInitInvited();
            },

            onInvitedCallback(data) {
                console.log('on invited callback in chat page');
                // 判断是否有结算界面
                var noteGameJoin  = this.$dataManager.getJoinMatchGame(this.toUser.userId);
                if ( this.gameResult != undefined && noteGameJoin != null &&
                    noteGameJoin.gameId == this.gameResult.gameId )
                {
                    this.settlement.isJoinGame = true;
                }
                else {
                    this.onInitInvited();
                }
            },

            onInitInvited() {
                this.joinGame = this.$dataManager.getJoinMatchGame(this.toUser.userId);
                this.invitedGame = this.$dataManager.getInvitedGame();

                if (this.joinGame !== undefined || this.invitedGame !== undefined) {
                    this.$refs.invitedGame.show(true);
                    this.$refs.gameList.hide(true);
                } else {
                    if (this.$refs.gameList != null && this.$refs.invitedGame != null) {
                        this.$refs.gameList.show(true);
                        this.$refs.invitedGame.hide(true);
                    }
                }

                if (this.joinGame !== undefined) {
                    this.startTimerJoin(this.joinGame.timestamp);
                }
            },

            startTimerInvited() {

                let _this = this;
                _this.invitedTimer = 30;

                if (_this.invitedTimerObject != null)
                    clearInterval(_this.invitedTimerObject);

                _this.invitedTimerObject = setInterval(function () {

                    _this.invitedTimer--
                    if (_this.invitedTimer <= 0) {
                        clearInterval(_this.invitedTimerObject);
                        _this.onCancelInvitedGame();
                    }

                }, 1000);
            },

            startTimerJoin(timeStamp) {
                let _this = this;
                let now = Date.now() - _this.$websocket.serverTimeDelay;
                _this.joinTimer = 30 - Math.floor((now - timeStamp) / 1000);
                if (_this.joinTimer <= 0) {
                    _this.onJoinPlayGame(false);
                    return;
                }

                console.log('self now ' + now + ' other time ' + timeStamp + ' step ' + (now - timeStamp));
                if (_this.joinTimerObject != null)
                    clearInterval(_this.joinTimerObject);

                _this.joinTimerObject = setInterval(function () {
                    _this.joinTimer--

                    if (_this.joinTimer <= 0) {
                        clearInterval(_this.joinTimerObject);
                        _this.onJoinPlayGame(false);
                    }

                }, 1000);
            },

            sendMessage() {
                const self = this;
                const text = self.messageText.replace(/\n/g, '<br>').trim();
                const messagesToSend = [];
                self.attachments.forEach((attachment) => {
                    messagesToSend.push({
                        image: attachment,
                    });
                    console.log(" send msg..1111. ")
                });

                if (text.length) {
                    messagesToSend.push({
                        text,
                    });
                }

                if (messagesToSend.length === 0) {
                    return;
                }
                // Reset attachments
                self.attachments = [];
                // Hide sheet
                self.sheetVisible = false;
                // Clear area
                self.messageText = '';
                // Focus area
                if (text.length) self.messagebar.focus();
                var timestamp = new Date().getTime();
                let buf = Request.up.chat.encode({
                    _type: 1,
                    _data: text,
                    _channel: 2,
                    _uid: this.toUser.userId,
                    _timestamp: timestamp
                }).finish();
                console.log("发送消息: " + text);
                self.$websocket.send(Types.MsgEnum.chat, buf, false).then(() => {
                        console.log("send message success");
                    },
                    () => {
                        // 请求失败
                        console.log("send message fail!");
                    });

                console.log(self.messagesData.length)

                // Send message
                self.messagesData.push(...messagesToSend);

                self.$dataManager.addChatInfo(this.toUser.userId, {
                    _type: 1,
                    _data: text,
                    _channel: 2,
                    _uid: this.fromUser.userId,
                    _timestamp: timestamp
                });
            },
            goPersonal(type) {
                if (type == 1) {
                    //暂时不跳转
                    // this.$f7router.navigate({
                    //     name: 'MineInfo',
                    //     params: {
                    //         uid: this.fromUser.userId,
                    //         type: 0
                    //     },
                    // })
                } else {
                    this.$f7router.navigate({
                        name: 'PersonalInfo',
                        params: {
                            uid: this.toUser.userId,
                            type: 1
                        },
                        clearPreviousHistory: true,
                        //加此参数主要是为了区别从哪个页面进入个人主页，
                        //用来隐藏个人主页的chat按钮，防止循环点击，出现错误，参考了hago
                })
               }
             },
            sendAudia() {
            const self = this
            self.checkAudio()
            },
            microphoneChange() {
            console.log("microphoneChange");
            this.checkAudio()
            },

          //检查录音权限
          checkAudio(){
            const self=this
            checkAudioPermission(function (status) {
                //有权限
                if(status){
                    if(self.isMute==false){//非首次点击
                        self.isMute=true
                        console.log("switch button isMute: "+self.isMute);
                        closeMuteAudio(self.isMute,self.toUser.userId)
                    }else{//首次点击
                        self.isMute=false
                        console.log("switch button isMute: "+self.isMute)
                        closeMuteAudio(self.isMute,self.toUser.userId)
                    }
                }else{
                    //没有权限的时候
                    getAudioPermission(self.$websocket, self.toUser.userId,function (accessToken,_channel_name,voice) {
                        self.accessToken=accessToken
                        voiceChat(self.accessToken,_channel_name,self.fromUser.userId,"voice chat",function (uid,channel) {
                            self.isMute=false
                            console.log("open voice uid: "+uid+" channel: "+channel);
                        },function (err) {
                            console.log("err: "+err);
                        })
                    },function (error) {
                        console.log("err: "+err);
                    })
                }
            },function () {
                getAudioPermission(self.$websocket, self.toUser.userId,function (accessToken,_channel_name,voice) {
                    self.accessToken=accessToken
                    voiceChat(self.accessToken,_channel_name,self.fromUser.userId,"voice chat",function (uid,channel) {
                        self.isMute=false
                        console.log("open voice uid: "+uid+" channel: "+channel);
                    },function (err) {
                        console.log("err: "+err);
                    })
                },function (error) {
                    console.log("err: "+err);
                })
            })
        },

          getFromUserOuterUrl(type){
          const self=this
          let headPortraitFrameArray = this.$store.getters.getHeadPortraitFrameArray()
          if(headPortraitFrameArray==null){
              return
          }
          if(1==type){
              for (let headPortraitFrame of headPortraitFrameArray) {
                  if(headPortraitFrame.id==this.fromUser.headPortraitFrame){
                      console.log( self.$$('#fromView'))
                      if(self.$$('#fromView').length>0){
                          self.$$('#fromView')[0].style.width='54px'
                          self.$$('#fromView')[0].style.height='54px'
                          self.$refs.fromuser.style.marginTop="0px"
                      }
                      return headPortraitFrame.image
                  }
              }
              return null
          }else{
              for (let headPortraitFrame of headPortraitFrameArray) {
                  if(headPortraitFrame.id==this.toUser.headPortraitFrame){
                      if(self.$$('#toView').length>0){
                          self.$$('#toView')[0].style.width='54px'
                          self.$$('#toView')[0].style.height='54px'
                          self.$refs.touser.style.marginTop="0px"
                      }
                      return headPortraitFrame.image
                  }
              }
              return null
          }
          },
          sendClickChatTime(){
            let chatTime = this.getSpacingTime();
            // console.log("统计平均在聊天界面停留的时间: "+chatTime);
            let userId = this.$dataManager.getMyselfId();
            let param = {'label': userId,'value':chatTime};
            if (this.$config.deviceName !== "browser") {
                facebookConnectPlugin.logEvent("Click_chat_time", param, 1, function () {
                    console.log("logEvent success!");
                }, function (error) {
                    //退出失败
                    console.log("logEvent failure!");
                    console.log(error.toString());
                });
            }
          },
          getSpacingTime: function (){
            let _this = this;
            let timestamp =Date.parse(new Date());
            return Math.abs(_this.chatTime - timestamp) / 1000;
          },

         gameInviteFriends(game) {
                // console.log("统计用户邀请好友进行游戏的次数和百分比: "+game.gameName);
               let userId = this.$dataManager.getMyselfId();
               var param = {'label': userId,'value': game.gameName};
               if (this.$config.deviceName !== "browser") {
                   facebookConnectPlugin.logEvent("Game_invite_friends", param, 1, function () {
                      console.log("logEvent success!");
                   }, function (error) {
                      //退出失败
                      console.log("logEvent failure!");
                      console.log(error.toString());
                   });
               }
            },
            sendClickVoiceChat() {
              // console.log("统计用户邀请好友进行游戏的次数和百分比: "+game.gameName);
              let userId = this.$dataManager.getMyselfId();
              var param = {'label': userId};
              if (this.$config.deviceName !== "browser") {
                  facebookConnectPlugin.logEvent("Click_voice_chat", param, 1, function () {
                      console.log("logEvent success!");
                  }, function (error) {
                      //退出失败
                      console.log("logEvent failure!");
                      console.log(error.toString());
                  });
            }
          },
        },
  };
</script>

<style>

    .popup-settlement {
        background: rgba(0, 0, 0, 0.4);
    }

    .popup-settlement .settlement-center {
        position: absolute;
        top: 59%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    .settlement-dialog {
        width: 320px;
        height: 300px;
        background: snow;
        border-radius: 1em;
        text-align: center;
    }

    .settlement-title {
        position: absolute;
        top: -90px;
        width: 194px;
    }

    .settlement-content {
        padding-top: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .settlement-coin {
        margin-top: 60px;
        position: relative;
    }

    .settlement-coin-gray {
        filter: grayscale(100%);
    }

    .settlement-add-five {
        position: absolute;
        top: -5px;
        right: 10px;
        font-weight: bold;
        font-size: 16px;
        color: #fd9d00;
    }

    .settlement-streak-text {
        width: 110px;
        color: white;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
        font-size: 12px;
        padding: 1px;
    }

    .pknav {
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-grow: 1;
    }

    .timer-round {
        border-radius: 50%;
        border: 4px solid #ffffff;
        background-color: #675e5c;
        margin: auto;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        justify-content: center
    }

    .account {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        margin-top: 6px;
        width: 80px;
    }

    .account .add-icon {
        position: absolute;
        height: 18px;
        bottom: 20px;
        padding-left: 70px;
    }

    .play-game {
        padding-top: 80px;
    }

    .chat-game {

    }

    .chat-game-img {
        width: 100%;
        height: 80px;
        border-radius: 0px;
    }

    .chat-slide {
        margin-top: 0px;
        height: 120px !important;
    }

    .play-game-nar {
        display: none;
    }

    .single-line {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

</style>
