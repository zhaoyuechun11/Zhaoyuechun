<template>
    <f7-page>
        <f7-navbar no-shadow no-hairline style="background: transparent">
            <f7-nav-left>
                <f7-link style="padding-left: 8px; z-index: 5000" @click="onClickQuit" icon-only>
                    <f7-icon size="25px" ios="f7:arrow_back" md="material:arrow_back">
                    </f7-icon>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title></f7-nav-title>
            <f7-nav-right>
                <template v-if="isMute">
                    <img src="static/images/mute.png"
                         style="width: 25px;height:25px;margin-right: 13px;padding-left: 13px; z-index: 1"
                         @click="microphoneChange">
                </template>
                <template v-else>
                    <img src="static/images/microphone.png"
                         style="width: 25px;height:25px;margin-right: 13px;padding-left: 13px; z-index: 1"
                         @click="microphoneChange">
                </template>
            </f7-nav-right>
        </f7-navbar>
        <!-- <iframe class="game-frame" @load="onGameLoad" :src="getUrl()" style="height:100%;width:100%;" scrolling='no'
                frameborder="0" allowfullscreen></iframe>
        <game-load v-if="isShowLoad"></game-load> -->
    </f7-page>
</template>

<script>
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    
    import {checkAudioPermission,closeMuteAudio,getTokenAndChannel,voiceChat,getAudioPermission} from '../utils/agora.js';
    import {getNowTimeLab} from '../utils/utils.js';

    export default {
        
        props: {
            game: String,
            gameUrl: String,
            users: Array
        },

        data() {
            return {
                gameWindow: null,
                gameLoaded: false,
                gameResult: null,
                timerObject: null,
                quitSelf: false,
                isShowLoad: true,
                isMute: false,
                accessToken: "",
                gameTime: 0,
                gameInterrupt: false,
                isLevel20: false,
                countDownNum: 0,
                interval: null
            }
        },

        created: function () {
            this.$websocket.addcallback(Types.MsgEnum.game_over, this.onHandleGameOver);
            this.$websocket.addcallback(Types.MsgEnum.game_begin, this.onHandleGameBegin);
            this.$websocket.addcallback(Types.MsgEnum.game_score_change, this.onHandleScoreChange)
            this.$websocket.addcallback(Types.MsgEnum.game_private_data, this.onBroadcastGameData)
            window.addEventListener('message', this.onHandleGameMessage);
            document.addEventListener("resume", this.onResume, false);
            document.addEventListener("pause", this.onPause, false);

            this.$gameManager.IsInGame = true;
            this.$gameManager.QuitGameCallback = this.OnQuitGame;

            //添加监听亮屏和息屏

            if ( this.$config.deviceName !== 'browser') {
                window.broadcaster.addEventListener("SCREEN_ON", this.screenOnListener);
                window.broadcaster.addEventListener("SCREEN_OFF", this.screenOffListener);
                cordova.plugins.StatusBarNav.hideStatusNavBar(function () {
                        console.log("set full screen success")
                },function (error) {
                        console.log("set full screen fail")
                })
            }
            this.countDown();
        },

        destroyed: function () {
            //移除监听亮屏和息屏
            if ( this.$config.deviceName !== 'browser') {
                window.broadcaster.removeEventListener("SCREEN_ON", this.screenOnListener);
                window.broadcaster.removeEventListener("SCREEN_OFF", this.screenOffListener);
                this.setFullScreen(false)
            }


            //console.log("destroy game page");
            this.$websocket.removecallback(Types.MsgEnum.game_over, this.onHandleGameOver);
            this.$websocket.removecallback(Types.MsgEnum.game_begin, this.onHandleGameBegin);
            this.$websocket.removecallback(Types.MsgEnum.game_score_change, this.onHandleScoreChange)
            this.$websocket.removecallback(Types.MsgEnum.game_private_data, this.onBroadcastGameData)
            window.removeEventListener('message', this.onHandleGameMessage);
            document.removeEventListener("resume", this.onResume, false);
            document.removeEventListener("pause", this.onPause, false);

            //离开频道
            this.leaveChannel()
            this.$gameManager.IsInGame = false;
            this.$gameManager.QuitGameCallback = null;
        },

        mounted () {
            this.quitSelf = false;
            if ( this.game.singleMode )
            {
                this.isShowLoad = false;
            }
            else {
                this.isShowLoad = true;
            }

            this.gameTime = Date.parse(new Date());
            var self = this;
            var toUser = self.users[1];
            var fromUser = self.users[0];

            if(this.$config.deviceName=='android'){
                //检查网络权限，有权限则默认打开语音
                checkAudioPermission(function (status) {
                    self.setFullScreen(true)
                    console.log('check audio permisiion');
                    if(status){
                        //有录音权限，默认打开语音
                        self.isMute==false
                        getTokenAndChannel(self.$websocket, toUser.userId,function (accessToken,_channel_name,voice) {
                            self.accessToken = accessToken
                            console.log("get token and channel: "+accessToken + _channel_name)
                            // self.voiceChat(self.accessToken,_channel_name,"voice chat")
                            voiceChat(self.accessToken,_channel_name, fromUser.userId,"voice chat",function (uid,channel) {
                                console.log("open voice uid: "+uid+" channel: "+channel);
                                self.setFullScreen(true)
                            },function (err) {
                                console.log("err: "+err);
                            })
                        },function (error) {
                            console.log("err: "+err);
                        })

                    }else{
                        self.isMute = true
                        getAudioPermission(self.$websocket, toUser.userId,function (accessToken,_channel_name,voice,status) {
                            if (status) {
                                self.accessToken = accessToken
                                // self.voiceChat(self.accessToken,_channel_name,"voice chat")
                                voiceChat(self.accessToken, _channel_name, fromUser.userId, "voice chat", function (uid, channel) {
                                    self.setFullScreen(true)
                                    self.isMute = false
                                    console.log("open voice uid: " + uid + " channel: " + channel);
                                }, function (err) {
                                    console.log("err: " + err);
                                })
                            }else{
                                self.setFullScreen(true)
                            }
                        },function (error) {
                            console.log("err: "+ err);
                        })
                    }
                })
            }

        },

        methods: {

            setFullScreen(flag){
               // console.info('>>>>>>>>>>>>>');
                if (this.$config.deviceName !== 'browser') {
                    if (flag) {
                        cordova.plugins.StatusBarNav.hideStatusNavBar(function () {
                            console.log("set full screen success")
                        }, function (error) {
                            console.log("set full screen fail")
                        })
                    } else {
                        cordova.plugins.StatusBarNav.showStatusNavBar(function () {
                            console.log("stop full screen success")
                        }, function (error) {
                            console.log("stop full screen fail")
                        })
                    }
                }
            },
            leaveChannel(){
                if (this.accessToken != null && this.accessToken.length > 0) {
                    console.log("game leave channel!")
                    agoravoice.leaveChannel()
                }
            },
            screenOnListener(e) {
                //alert("ACTION_SCREEN_ON received!");
                this.PostMessage({
                    cmd: 'onResume'
                })
            },
            screenOffListener(e) {
                //alert("ACTION_SCREEN_OFF received!");
                this.PostMessage({
                    cmd: 'onPause'
                })
            },

            onResume() {
                //alert('on resume key down ......');
                this.PostMessage({
                    cmd: 'onResume'
                })
            },

            onPause() {
                //alert('on pause key down ......');
                this.PostMessage({
                    cmd: 'onPause'
                })
            },

            getUrl() {
              return this.gameUrl + "index.html"; //"./static/games/" + this.game + "/index.html";
              
            },

            microphoneChange() {
                //console.log("game microphone");
                this.checkAudio()
            },

            //检查录音权限
            checkAudio(){
                const self=this
                var toUser = self.users[1];
                var fromUser = self.users[0];
                checkAudioPermission(function (status) {
                    //有权限
                    if(status){
                        if(self.isMute==false){//非首次点击
                            self.isMute=true
                            console.log("switch button isMute: "+self.isMute);
                            closeMuteAudio(self.isMute, toUser.userId)
                        }else{//首次点击
                            self.isMute=false
                            console.log("switch button isMute: "+self.isMute)
                            closeMuteAudio(self.isMute, toUser.userId)
                        }
                    }else{
                        //没有权限的时候
                        getAudioPermission(self.$websocket, toUser.userId,function (accessToken,_channel_name,voice) {
                            self.accessToken=accessToken
                            voiceChat(self.accessToken,_channel_name, fromUser.userId,"voice chat",function (uid,channel) {
                                self.isMute=false
                                self.setFullScreen(true)
                                console.log("open voice uid: "+uid+" channel: "+channel);
                            },function (err) {
                                console.log("err: "+err);
                            })
                        },function (error) {
                            console.log("err: "+err);
                        })
                    }
                },function () {
                    getAudioPermission(self.$websocket, toUser.userId,function (accessToken,_channel_name,voice) {
                        self.accessToken=accessToken
                        voiceChat(self.accessToken,_channel_name, fromUser.userId,"voice chat",function (uid,channel) {
                            self.isMute=false
                            self.setFullScreen(true)
                            console.log("open voice uid: "+uid+" channel: "+channel);
                        },function (err) {
                            console.log("err: "+err);
                        })
                    },function (error) {
                        console.log("err: "+err);
                    })
                })
            },

            isRobot(uid) {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].userId == uid) {
                        return this.users[i].isRobot;
                    }
                }
                return false;
            },

            hasRobot() {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].isRobot) {
                        return true;
                    }
                }
                return false;
            },

            onGameLoad(event) {
                this.gameWindow = event.target.contentWindow;
                this.gameLoaded = true;
                this.onHandleGameBegin();
            },

            //处理游戏发送来的事件
            onHandleGameMessage(event) {
                console.log(event.data);
                const data = event.data;
                switch (data.cmd) {
                    case 'SendGameData': {
                        this.SendScore(data.uid, data.data);
                    }
                        break;
                    case 'GameLoadReady': {
                        this.isShowLoad = false;
                        console.log('Game Mounted Finish Time ');
                        console.log(new Date());
                    }
                        break;
                    case 'GamePlayReady': {
                        this.isShowLoad = false;
                        this.SendGameReady();
                    }
                        break;
                    case 'GameOver': {
                        this.SendGameOver(data.ret);
                    }
                        break;
                    case 'BroadCastData': {
                        this.SendBroadcastData(data.uid, data.data);
                    }
                        break;
                }
            },

            onBroadcastGameData(msg) {
                let gameData = Response.down.game_private_data.decode(msg);
                this.PostMessage({
                    cmd: "Broadcast",
                    data: {
                        userId: gameData._uid,
                        data: gameData._private_data
                    },
                });
            },

            //游戏结束回调
            onHandleGameOver(msg) {
                let result = Response.down.game_over.decode(msg);
                this.gameResult = result._ret;

                this.PostMessage({
                    cmd: "GameResult",
                    data: result._ret,
                });

                let _this = this;
                if (_this.quitSelf) {
                    this.gameInterrupt = true;
                    //_this.GoToResult(result._ret);
                } else {

                    if (this.hasRobot()) {
                        this.sendGameFullRole();
                    }
                    if (_this.timerObject) {
                        this.gameInterrupt = false;
                        clearTimeout(_this.timerObject);
                    }
                    _this.timerObject = setTimeout(function () {
                        _this.GoToResult(result._ret);
                    }, 5000);
                }
            },

            onHandleGameBegin(msg) {
                let matchUser = [];
                let length = this.users.length

                if (length == 0) {
                    return
                }

                for (let i = 0; i < length; i++) {
                    matchUser.push({
                        userId: this.users[i].userId,
                        userName: this.users[i].userName,
                        isRobot: this.users[i].isRobot,
                        userHead: this.$store.getters.getHeadImg(this.users[i].userHead),
                        userHeadFrame: this.$store.getters.getHeadFrameImage(this.users[i].headPortraitFrame),
                        headPortraitFrame: this.users[i].headPortraitFrame
                    })
                }

                let gameConfig = this.$gameManager.getGameData(this.game);
                if (this.$config.debug) {
                    console.log(matchUser);
                }

                this.PostMessage({
                    cmd: "GameBegin",
                    data: matchUser,
                    server: gameConfig.gameServer
                })
            },

            onHandleScoreChange(msg) {
                var scoreChange = Response.down.game_score_change.decode(msg);
                this.PostMessage(
                    {
                        cmd: "UpdateData",
                        data:
                            {
                                userId: scoreChange._user_game_score._uid,
                                userScore: scoreChange._user_game_score._cur_score
                            }
                    }
                )
            },

            PostMessage(msg) {
                if (this.gameWindow) {
                    this.gameWindow.postMessage(msg, '*');
                }
            },

            GoToResult(ret) {

                if (this.gameInterrupt) {//提前退出
                    this.sendGameOutEarly();
                }
                if (this.timerObject != null) {
                    clearTimeout(this.timerObject);
                }
                const self=this
                //添加到达结果页的用户信息，显示在陌生人信息中
                let hasFriend=self.$dataManager.hasFriend(self.users[1].userId)
                var currentDate=getNowTimeLab()
                if (hasFriend===undefined) {
                    self.$dataManager.addStronger({
                        userId: self.users[1].userId,
                        userName: self.users[1].userName,
                        userHead: self.$store.getters.getHeadImg(self.users[1].userHead),
                        rightHeadPortraitFrame: self.$store.getters.getHeadFrameImage(self.users[1].headPortraitFrame),
                        gameName:self.game,
                        recivetime:currentDate,
                    })
                }


                if (ret > 0) {
                    this.$dataManager.addGameHistory(this.users[1].userId, true)
                }
                else if ( ret < 0 )
                {
                    this.$dataManager.addGameHistory(this.users[1].userId, false)
                }

                //离开当前频道
                this.leaveChannel()
                this.$f7router.navigate("/chat/", {
                    props: {
                        toUser:{
                            userName: this.users[1].userName,
                            userId: this.users[1].userId,
                            userHead: this.users[1].userHead,
                            headPortraitFrame:this.users[1].headPortraitFrame,
                        },
                        gameResult: {
                            ret: ret,
                            gameId: this.game,
                        }
                    },
                    clearPreviousHistory:true
                });

                this.$dataManager.setInvitedGame(undefined);

                this.sendGameTimes();

            },

            // onClickQuit() {
            //     const _this = this;
            //     _this.$f7.dialog.confirm('You will lose if you quit now! \n Are you sure you want to quit? ', "", () => {
            //         _this.OnQuitGame();
            //     });
            //     console.info('99999999999');
            // },

            OnQuitGame() {
                this.quitSelf = true;
                //游戏结束 统计时间
                this.SendQuitGame();
                this.GoToResult(-1);
            },

            SendGameReady() {
                var msg = Request.up.game_ready.create();
                var buf = Request.up.game_ready.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.game_ready, buf, false);
            },

            SendGameOver(ret) {
                var msg = Request.up.game_over.create({
                    _ret: ret
                });

                var buf = Request.up.game_over.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.game_over, buf, false);
            },

            SendQuitGame() {
                var msg = Request.up.quit_game.create();
                var buf = Request.up.quit_game.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.quit_game, buf, false);
            },

            SendScore(uid, score) {
                var msgScore = {
                    _cur_score: score
                }

                if (this.isRobot(uid)) {
                    msgScore._robot_uid = uid;
                }

                var msg = Request.up.game_score_change.create(msgScore);
                var buf = Request.up.game_score_change.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.game_score_change, buf, false)
            },

            SendBroadcastData(uid, data) {
                var msg = Request.up.broadcast_game_private_data.create({
                    _uid: uid,
                    _private_data: JSON.stringify(data)
                })

                var buf = Request.up.broadcast_game_private_data.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.broadcast_game_private_data, buf, false);
            },

            getGameTime: function () {
                let _this = this;
                let timestamp = Date.parse(new Date());
                return Math.abs(_this.gameTime - timestamp) / 1000;
            },

            sendGameTimes() {
                let gameTime = this.getGameTime();
                if (gameTime < 15) {
                    this.sendGameOutNo15();
                }
                if (this.interval) {
                    clearInterval(this.interval);
                }
                // console.log("统计每局游戏时间的平均时间:"+gameTime);
                let userId = this.$dataManager.getMyselfId();
                let param = {'label': userId, 'value': this.game, 'extra': gameTime};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_time", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendGameOutNo15() {
                // console.log("统计每局未到15秒就退出的玩家百分比");
                let userId = this.$dataManager.getMyselfId();
                let param = {'label': userId, 'value': this.game};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_out_no_15", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendGameOutEarly() {
                // console.log("提前退出游戏的百分比/中途点击退出");
                let userId = this.$dataManager.getMyselfId();
                let param = {'label': userId, 'value': this.game};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_out_early", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendGameFullRole() {
                // console.log("统计真人用户和AI游戏的完成游戏流程的百分比");
                let userId = this.$dataManager.getMyselfId();
                let param = {'label': userId, 'value': this.game};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_full_role", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendGameTime90() {
                // console.log("统计完成90秒游戏的玩家占比");
                let userId = this.$dataManager.getMyselfId();
                let param = {'label': userId, 'value': this.game};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_time_90", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendGameTime60() {
                // console.log("统计完成60秒游戏的玩家占比");
                let userId = this.$dataManager.getMyselfId();
                let param = {'label': userId, 'value': this.game};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_time_60", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            countDown() {
                this.interval = window.setInterval(() => {
                    this.countDownNum++;
                    if (this.countDownNum > 90) {
                        clearInterval(this.interval);
                        return;
                    }
                    if (this.countDownNum == 60) {
                        this.sendGameTime60();
                    }
                    if (this.countDownNum == 90) {
                        this.sendGameTime90();
                    }
                }, 1000)
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
            }
        }
    }
</script>

<style scoped>
    .game-frame {
        border-width: 0px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
        background-color: #FFFFFF;
    }
</style>

