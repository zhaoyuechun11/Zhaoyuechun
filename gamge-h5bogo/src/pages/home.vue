<template>
    <f7-page class="home-page">
        <!-- 头toolbar -->
        <f7-navbar no-shadow style="position: fixed; height: 68px">
            <f7-nav-left style="padding: 26px 0px;">
                <a class="link icon-only panel-open" open-panel="left">
                    <div style="height: 30px; width: 30px;" v-on:click="btnClick">
                        <score-view :innerImgUrl="this.headImag" :outerImgUrl="outerImage"/>
                    </div>
                </a>
            </f7-nav-left>
            <f7-nav-title style="padding: 26px 0px;">
                <img src="static/images/home_title_logo.png" style="height: 17px">
            </f7-nav-title>
            <f7-nav-right style="padding: 26px 0px;">
                <a class="link icon-only"  :href="toChatList()" @click="onClickOpenChat()" style="margin-top: 10px">
                    <i class="icon color-yellow" :class="{'active': newNotifyNum > 0}">
                        <img src="static/images/home_msg_notify.png" style="width: 25px;">
                        <span v-if="newNotifyNum >= 0" class="badge color-red" style="padding: 3px 3px; width: 6px; height: 6px; border-radius: 3px; top: 15px; margin-left: -6px">
                        </span>
                    </i>
                </a>
            </f7-nav-right>
        </f7-navbar>
        <!-- play with friends -->
        <f7-block ref="list_friends" style="padding-left: 10px; padding-right: 10px; padding-top: 20px; margin: 0px">
            <scroll-item>
                <f7-row no-gap>
                    <f7-col v-on:click="sendClickFriends()">
                        <play-friend :isFreshData="isFreshData"></play-friend>
                    </f7-col>
                    <f7-col>
                        <play-stranger :isFreshData="isFreshData"></play-stranger>
                    </f7-col>
                </f7-row>
            </scroll-item>
        </f7-block>
        <f7-block style="margin-top: 5px; padding: 0px 10px">
            <scroll-item v-for="(games) in gameList" :key="games.key">
                <f7-row no-gap id="list-row" class="card-raw">
                    <f7-col v-for="(game) in games " :key="game.id" >
                        <home-item  :game=game v-on:home-item-click="onHomeItemClick" v-on:home-enter-game="onHomeEnterGame">
                            <game-card :game=game :full=isFull(games) :isFreshData="isFreshData"></game-card>
                        </home-item>
                    </f7-col>
                </f7-row>
            </scroll-item>
        </f7-block>
        <div class="popup popup-match">
            <div class="link" @click="onMatchCancel" style="position: absolute; right: 25px; top: 25px">
                <i class="icon material-icons" style="color: white;">close</i>
            </div>
            <div class="match-center">
                <div class="match-dialog">
                    <div class="match-title" style="background-image: url('static/images/bg_match_title.png')">
                        {{matchGame.gameName}}
                    </div>
                    <div class="match-content">
                        <div class="head-left">
                            <score-view style="width: 80px; height: 80px;" :innerImgUrl="matchUserSelf.userHead" :outerImgUrl="matchUserSelf.userHeadFrame"/>
                            <a class="single-line" style="text-transform: uppercase; margin-top: 0px;color: #999;font-size: 12px;height: 20px;width:80px;text-align: center">{{matchUserSelf.userName}}</a>
                        </div>
                        <div class="match-vs" :class="{'active':matchAnimActive}">
                            <img src="static/images/img_match_vs.png" style="width: 70%; height: auto">
                        </div>
                        <div class="head-right">
                            <img v-if="matchAnimActive == false" src="static/images/bongo_findplayer.png" class="search-icon"/>
                            <score-view  style="width: 80px; height: 80px;" :innerImgUrl="matchUserOther.userHead" :outerImgUrl="matchUserOther.userHeadFrame"/>
                            <a class="single-line" style="text-transform: uppercase; margin-top: 0px;color: #999;font-size: 12px;height: 20px;width:80px;text-align: center">{{matchUserOther.userName}}</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="popup popup-game">
            <iframe class="game-frame" @load="onGamePopupLoad" :src="getGameUrl()" style="position: absolute; top: 0px; height:100%;width:100%;" scrolling='no'
                    frameborder="0" allowfullscreen></iframe>
            <f7-link style="position: absolute; left: 10px; top: 10px; z-index: 5000; color: white" @click="onGamePopupClose(true)" icon-only>
                <f7-icon size="25px" ios="f7:arrow_back" md="material:arrow_back">
                </f7-icon>
            </f7-link>
        </div>
        <div class="popup popup-rank" style="z-index: 20000">
            <div class = "rank-center">
                <div class="rank-dialog">
                    <div class="title-image-bg">
                        <img src="static/images/rank_title_bg.png" width="100%" style="position: absolute; left: 0px; top: -48px; background-size: cover">
                    </div>
                    <div class="role-info" style="color: white; height: 120px">
                        <div class="role-head" style="padding-top: 15px; padding-left: 15px; width: 60px; height: 60px;">
                            <score-view :innerImgUrl="headImag" :outerImgUrl="outerImage"/>
                        </div>
                        <div class="role-info" style="position: absolute; left: 90px; top: 50px;">
                            <div class="role-name">
                                <div style="position: relative; font-weight: bold; font-size: 20px; line-height: 100%; text-align: left">{{this.roleName}}</div>
                            </div>
                            <div class="role-score">
                                <div style="position: relative; font-size: 20px; line-height: 90%; text-align: left">{{this.rankData.score}}</div>
                            </div>
                        </div>
                        <div class="rank-self">
                            <div style="position: absolute; top: 30px; right: 15px; ">
                                <div v-if="rankData.rankShowRise" style="padding-right: 25px; padding-top: 0px; font-size: 30px; font-weight: bold">{{rankData.rankShowNum}}</div>
                                <img v-if="!rankData.rankShowRise" style="width: 100px" src='static/images/rank_up_bg.png'/>
                            </div>
                        </div>s
                    </div>
                    <div class="rank-title" style="text-align: center; color: white; font-weight: bold; padding-top: 10px; height: 60px; display: flex; justify-content: center">
                        <div class="left-tab link" @click="onRankTapLeft" :style="{'background-image': 'url('+rankTapLeftBg+')'}" style="width: 150px; background-size: cover">
                            <div style="margin-bottom: 8px">Daily Rank</div>
                        </div>
                        <div class="right-tab link" @click="onRankTapRight" :style="{'background-image': 'url('+ rankTapRightBg + ')'}" style="width: 150px; background-size: cover">
                            <div style="margin-bottom: 8px">Global Rank</div>
                        </div>
                    </div>
                    <div class="rank-list" style=" width: 260px; height: 240px; margin: auto; overflow: hidden ">
                        <div class="view">
                            <div class="page">
                                <div class=" page-content infinite-scroll-content">
                                    <div class="list media-list" style="margin: 0px 0px">
                                        <ul>
                                            <li v-for="rank in rankData.rankList" :key="rank.userId">
                                                <div class="item-content" :style ="{'background-image': RankColorBg(rank.index)}" style="color: white; background-size: 100% 100%; margin-bottom: 10px; padding-left: 0px; height: 52px; min-height: 45px">
                                                    <div class="item-media" style="width: 46px; height: 46px; padding-left: 10px; padding-top: 14px; text-align: center;  ">
                                                        <div v-if="rank.index > 3" class="item-rank" style="font-weight: bold; font-size: 14px; margin: auto">{{rank.index}}</div>
                                                        <div v-if="rank.index <= 3"> <img :src="'static/images/rank_num_' + rank.index + '.png'" style="width: 36px;"/></div>
                                                    </div>
                                                    <div class="item-media" style="width: 46px; height: 46px; padding-top: 0px; padding-bottom: 0px">
                                                        <score-view :innerImgUrl="rank.userData.userHead" :outerImgUrl="rank.userData.userHeadFrame"/>
                                                    </div>
                                                    <div class="item-inner" style="min-height: 20px; height: 100%; padding-bottom: 2px;">
                                                        <div class="item-title-row">
                                                            <div class="item-title" style="text-align: left; font-size: 14px">{{rank.userData.userName}}</div>
                                                        </div>
                                                    </div>
                                                    <div class="item-inner" style="min-height: 20px; height: 100%; padding-bottom: 2px; padding-right: 30px">
                                                        <div class="item-title-row" style="float: right;">
                                                            <div class="item-title" style="font-weight: bold; text-align: right; font-size: 14px">{{getRankScore(rank)}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="rank-buttons" style="padding-top: 30px; margin: auto; width: 200px; display: flex; justify-content: space-between">
                        <div class="btn link" @click="onRankBack" >
                            <img style="width: 45px;" src="static/images/rank_back_btn.png">
                        </div>
                        <div class="btn link" @click="onRankRestart">
                            <img style="width: 45px;" src="static/images/rank_restart_btn.png">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </f7-page>
</template>
<script>
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    import DigitRoll from './components/DigitRoll';
    import GameCard from './components/gamecard';
    import {mapMutations} from 'vuex'
    import GameMatch from "./gameMatch";
    import HomeItem from "./components/homeitem";
    import ScrollItem from "./components/scrollitem"
    import PlayFriend from "./components/playfriend";
    import PlayStranger from "./components/playstranger";

    import {getHeadPortraitFrameImage} from "../utils/utils.js";
    import {getFriendList,getLoveGameList,getAchievementObj, updateUserInfo, userInfoKey} from '../data/usermanager.js';
    import {getShopData} from "../data/shopmanger.js";
    export default {
        components: {PlayStranger, PlayFriend, ScrollItem, HomeItem, GameCard, GameMatch, DigitRoll},
        data() {
            return {
                toastCenter: null,
                actionListIndex: null,
                headImag: "./static/images/morentou.png",
                gameList: [],
                timer: null,
                notifyTimer: null,
                newNotifyNum: 0,
                isFreshData: false,
                outerImage: null,
                exitNoGame: false,
                roleName:"muse",
                gameTime: 0,
                matchGame: {},
                matchAnimActive: false,
                matchUserSelf: {
                    userName : "......",
                    userHead : "./static/images/pingtaitx01.png",
                    userHeadFrame : ""
                },
                matchUserOther: {
                    userName : "......",
                    userHead : "./static/images/head_icon.png",
                    userHeadFrame: ""
                },
                rankData :{
                  rankType: 'day',
                  gameId: 'abc',
                  score: 100,
                  rankUpText:"Low Score",
                  rankShowNum: "100",
                  rankShowRise: true,
                  rankDayNum:0,
                  rankDayRise: false,
                  rankWorldNum: 0,
                  rankWorldRise: false,
                  rankList: [
                      // {
                      //     userId: 1000,
                      //     userData: {
                      //         userName: "",
                      //         userHead: "",
                      //         headPortraitFrame: ""
                      //     },
                      //     rankData: {
                      //        score: rank._score,
                      //        level: rank._level,
                      //     }
                      // }
                  ]
                },
                matchBegin: true,
                gamePopupUrl: "",
                gameWindow: null,
                rankTapLeftBg : "static/images/rank_tab_blue_01.png",
                rankTapRightBg : "static/images/rank_tab_red_01.png"
            }
        },
        created() {
            //是否需要远程拉取
            var _this = this;
            _this.gameList = this.$gameManager.getHomeGames();

            //alert('add login action');
            _this.$EventBus.$on("LoginAction", ({data}) => {
                console.log(data);
                //alert('type ' + data.type + ' uuid ' + data.uuid + ' token ' + data.token);
                _this.$f7.popup.close('.login-popup', false);
                _this.startLogin(data.type, data.uuid, data.token, (result) => {
                    //alert(result.userId);
                    _this.updateData(result.userId, {
                        imageUrl: data.imageUrl,
                        givenName: data.givenName
                    });
                })
            });

            window.addEventListener('message', this.onHandleGameMessage);
        },

        mounted: function () {
            var _this = this;
            //获取当前屏幕的宽度并保存
            let isLogin = _this.$gameManager.IsLogin
            if (isLogin) {
                //每次退回首页获取好友列表,保存在内存中
                getFriendList(_this.$websocket, function (uidList) {
                    _this.$dataManager.setFriendList(uidList)
                }, function (error) {
                    //提示网络有异常
                    console.log("get friends failure: " + error);
                })
            }
            var callback = function (result) {
                if (result == 'success') {
                    _this.$f7.preloader.hide();
                }
                else {
                    setTimeout(function () {
                        _this.startBegin(callback)
                    }, 5000);
                }
            }

            _this.$f7.preloader.show();
            _this.startBegin(callback);

            _this.$EventBus.$on("changeHead", ({image}) => {
                console.log("home changeHead: " + image)
                _this.$nextTick(() => {
                    _this.outerImage = image
                })
            });
            _this.$websocket.addcallback(Types.MsgEnum.get_user_info, this.onHandleGetUserInfo);

            _this.sendBonggoTimes();
        },

        beforeDestroy() {
            this.sendClickNo();
            //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
            this.$EventBus.$off("changeHead");
            window.removeEventListener('message', this.onHandleGameMessage);
        },

        methods: {
            ...mapMutations(['setOnLineAddIdList', 'setOnLineAgreeIdList', 'setOnLineChatIdList', 'setMyPortraitFrame',
                'setHeadPortraitFrameArray', 'setShopObj','setLoveGameList','setAcheiveMentObj']),

            onGamePopupClose(showConfirm) {

                var _this = this;
                if ( showConfirm ) {
                    _this.$f7.dialog.confirm('Are you sure you want to quit? ', "", () => {
                        _this.gamePopupUrl = '';
                        _this.$f7.popup.close('.popup-game', false);
                        _this.OnQuitGame();

                        if (_this.gameWindow != null) {
                            _this.gameWindow.location.replace("");
                        }
                    });
                }
                else
                {
                    _this.gamePopupUrl = '';
                    _this.$f7.popup.close('.popup-game', false);

                    if (_this.gameWindow != null) {
                        _this.gameWindow.location.replace("");
                    }
                }

            },
 OnQuitGame() {
      this.quitSelf = true;
      //游戏结束 统计时间
      this.SendQuitGame();
      //this.GoToResult(-1);
    },
    SendQuitGame() {
      var msg = Request.up.quit_game.create();
      var buf = Request.up.quit_game.encode(msg).finish();
      this.$websocket.send(Types.MsgEnum.quit_game, buf, false);
    },
            onGamePopupOpen(url){
                this.gamePopupUrl = "static/games/" + url + "/index.html";
                this.$f7.popup.open('.popup-game', false);
                //this.$f7.popup.open('.popup-rank',false);
            },

            getGameUrl(){
                return this.gamePopupUrl;
            },

            onGamePopupLoad(event){
                //console.log(' on game popup load ');
                this.gameWindow = event.target.contentWindow;
            },

            getShops() {
                const self = this
                var url = self.$config.downLoadUrl + 'config/shop.json'
                if (self.$config.deviceName == 'browser') {
                    url = self.$config.proxyHeadPortraitFrame + url
                }
                //console.log(url)
                const service = self.$axios.create({
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                });
                getShopData(service,url,function (integArray) {
                    console.log(integArray)
                    self.setShopObj(integArray)
                    var productArray = integArray[0].product
                    var name = integArray[0].name
                    console.log("name: "+name)
                    self.setHeadPortraitFrameArray(productArray)
                    let myself = self.$dataManager.getMyself();
                    getHeadPortraitFrameImage(productArray, myself, function (product) {
                        if (null == product) {
                            self.setMyPortraitFrame(null)
                            self.outerImage = null
                        } else {
                            self.setMyPortraitFrame(product)
                            self.outerImage = product.image
                        }
                    })
                },function (error) {
                    console.log("获取商店信息失败！"+error)
                })
            },

            loginDialog(callback) {
                var _this = this;
                this.$f7.dialog.login('', (username, password) => {
                    if (username.length > 0) {
                        if (callback)
                            callback(username)
                    } else {
                        _this.loginDialog(callback);
                    }
                }, (username, password) => {
                    if (username.length > 0) {
                        if (callback)
                            callback(username)
                    } else {
                        _this.loginDialog(callback);
                    }
                });
            },

            updateData(myUserId, data) {
                var _this = this;
                _this.$dataManager.setMyself(myUserId);
                _this.$dataManager.getUser(myUserId).then((result) => {
                    let myself = this.$dataManager.getMyself();
                    let headPort = myself.headPortrait;
                    _this.gameTime = Date.parse(new Date());

                    if (null != headPort) {
                        _this.headImag = _this.$store.getters.getHeadImg(headPort)
                    }

                    _this.roleName = myself.userName;
                    _this.fetchOfflineData();

                    //获取自己喜欢的游戏列表
                    getLoveGameList(_this, _this.$websocket, myself.userId, function (gameInfoList) {
                        _this.setLoveGameList(gameInfoList)
                    }, function (error) {
                        console.log("get love game list")
                    })
                    _this.setNotifyTimer();
                    _this.fetchOnlineNum();
                    _this.getShops();

                    getFriendList(_this.$websocket, function (uidList) {
                        _this.$dataManager.setFriendList(uidList)
                    }, function (error) {
                        //提示网络有异常
                        console.log("get friends failure: " + error);
                    })

                    var url = _this.$config.downLoadUrl + _this.$config.achievementUrl
                    if (_this.$config.deviceName == 'browser') {
                        url = _this.$config.proxyHeadPortraitFrame + url
                    }

                    getAchievementObj(this.$axios, url, function (achievement) {
                        _this.setAcheiveMentObj(achievement)
                    }, function (error) {
                        console.log(error)
                    });

                    if ( data != undefined )
                    {

                        if ( data.imageUrl != undefined )
                        {
                            updateUserInfo(_this.$websocket, userInfoKey.head_portrait, data.imageUrl);
                            myself.headPortrait = data.imageUrl;
                        }

                        if ( data.givenName != undefined)
                        {
                            updateUserInfo(_this.$websocket, userInfoKey.name, data.givenName);
                            myself.userName = data.givenName;
                        }
                    }

                },(error) => {
                    alert('get user failure ' + error);
                })
            },

            startBegin(callback){
                var _this = this;
                _this.startEnter((result) => {
                    if (result.state == 'success') {

                        _this.$dataManager.setMyself(result.userId);
                        _this.$dataManager.getUser(result.userId).then((result) => {
                            let myself = this.$dataManager.getMyself();
                            let headPort = myself.headPortrait;
                            _this.gameTime = Date.parse(new Date());

                            if (null != headPort) {
                                _this.headImag = _this.$store.getters.getHeadImg(headPort)
                            }
                            _this.roleName = myself.userName;

                            _this.fetchOfflineData();
                            //获取自己喜欢的游戏列表
                            getLoveGameList(_this,_this.$websocket, myself.userId,function (gameInfoList) {
                                _this.setLoveGameList(gameInfoList)
                            },function (error) {
                                console.log("get love game list")
                            })
                            _this.setNotifyTimer();
                            _this.fetchOnlineNum();
                            _this.getShops();

                            getFriendList(_this.$websocket, function (uidList) {
                                _this.$dataManager.setFriendList(uidList)
                            }, function (error) {
                                //提示网络有异常
                                console.log("get friends failure: " + error);
                            })

                            var url=_this.$config.downLoadUrl+_this.$config.achievementUrl
                            if ( _this.$config.deviceName == 'browser'){
                                url=_this.$config.proxyHeadPortraitFrame+url
                            }
                            getAchievementObj(this.$axios,url,function (achievement) {
                                _this.setAcheiveMentObj(achievement)
                            },function (error) {
                                console.log(error)
                            })

                            if ( callback )
                            {
                                callback('success');
                            }

                        }, (error) => {
                            //alert('get user failure ');
                            if ( callback )
                            {
                                callback('failure');
                            }
                        })
                    } else {
                        //alert('start enter failure');
                        if ( callback )
                        {
                            callback('failure');
                        }
                    }
                });
            },

            startLogin(type, uuid, token,callback) {
                var _this = this;
                _this.$websocket.connect().then((msg) => {
                        _this.$gameManager.loginEnter(type, uuid, null, null, token, (result) => {
                            console.log('login enter .... ' + result)
                            //_this.$f7.preloader.hide();
                            var _result = result;
                            if (result == null) {
                                alert('login enter failure');
                            } else {
                                _this.$gameManager.IsLogin = true;
                                _this.$websocket.setLogin(true);
                                localStorage.setItem('userid', result.userId);
                                localStorage.setItem('tokenKey', result.token);
                                localStorage.setItem('type', 1);

                                if (result.state == 'logined') {
                                    if (callback) {
                                        callback({
                                            state: 'success',
                                            userId: result.userId
                                        })
                                    }
                                } else (result.state == "login")
                                {
                                    _this.$dataManager.getUser(result.userId).then(
                                        (msg) => {
                                            if (callback) {
                                                callback({
                                                    state: 'success',
                                                    userId: _result.userId
                                                })
                                            }
                                        },
                                        (msg) => {
                                            //alert('user info is not exist, create new user  ')
                                            var tempHeadArray = _this.$store.getters.getTempHead()
                                            let headUrl = _this.$store.getters.getPicUrl(tempHeadArray[Math.floor(Math.random() * tempHeadArray.length)])
                                            _this.$gameManager.createUser('' + result.userId, 0, headUrl, (result) => {
                                                if (result.state == 'success') {
                                                    if (callback) {
                                                        callback({
                                                            state: 'success',
                                                            userId: _result.userId
                                                        })
                                                    }
                                                } else {
                                                    alert('create user failure');
                                                }
                                            });
                                        }
                                    )
                                }
                            }
                        });
                    }
                    , (msg) => {
                        if (callback) {
                            callback({
                                state: "failure"
                            })
                        }
                    });
            },

            startEnter(callback) {
                var _this = this;
                if (_this.$gameManager.IsLogin) {
                    callback({
                        state: 'success',
                        userId: _this.$gameManager.userId
                    })
                    return;
                }

                _this.$f7.preloader.hide();
                /*if (_this.$config.deviceName == "browser") {
                    _this.$f7.preloader.hide();
                    _this.loginDialog((uuid) => {
                        _this.$f7.preloader.show();
                        _this.startLogin('guest',uuid, null,(result) => {
                            if (callback) {
                                callback(result);
                            }
                        })
                    });
                } else {
                    // var token = localStorage.getItem('tokenKey');
                    // alert('token ' + token);
                    // if (token !== undefined && token !== null)
                    // {
                    //     //alert('token login  ' + token);
                    //     _this.startLogin('auto', null ,token, (result) => {
                    //         if (callback)
                    //             callback(result);
                    //     })
                    // }
                    // else {
                        var uuid = device.uuid;
                        _this.startLogin('guest', uuid, null, (result) => {
                            if (callback)
                                callback(result);
                        })
                    // }
                }*/
            },

            isFull(games) {
                return games.length == 1;
            },

            toChatList() {
                return "/shenmi/" + "Chat";
            },

            onHomeItemClick(data) {
                // console.log('on item click event from child ' + data);
                //this.isFreshData = data;
                this.exitNoGame = true;
            },

            onHomeEnterGame(data){
                //console.log('on home enter game event ' + data);
                this.onMatchStart(data.game);
            },

            onMatchStart(game){

                this.matchGame = game;

                if ( game.singleMode )
                {
                    this.onGamePopupOpen(game.gameUrl);
                    return;
                }
                this.matchBegin = true;
                this.$dataManager.clearMatchUser();
                let userInfo = this.$dataManager.getMyself();
                this.$dataManager.addMatchUser({
                    userId: userInfo.userId,
                    userName: userInfo.userName,
                    userHead: userInfo.headPortrait,
                    headPortraitFrame: userInfo.headPortraitFrame
                });

                //初始化名字
                this.$dataManager.setMatchGame(this.matchGame.gameId);
                this.matchUserSelf = {
                    userId : userInfo.userId,
                    userName : userInfo.userName,
                    userHead : userInfo.headPortrait,
                    userHeadFrame : this.$store.getters.getHeadFrameImage(userInfo.headPortraitFrame)
                }
                this.$dataManager.onMatchedCallback = this.onMatchSuccess;

                // 发送匹配
                this.matchTime = Date.parse(new Date());
                let matchGameId = this.matchGame.gameId;
                let msg = Request.up.match_game.create({
                    _gid: matchGameId
                });

                let buf = Request.up.match_game.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.match_game, buf,false).then(()=>{
                        console.log('send match games')
                    },
                    ()=>{
                        console.log('reject match games')
                    }
                )

                let _this = this;
                if ( this.matchTimeOutObject )
                {
                    clearTimeout(this.matchTimeOutObject);
                }
                this.matchTimeOutObject = setTimeout(function () {
                    //alert('Matching Failed!');
                    _this.onMatchCancel();

                },25*1000)

                this.$f7.popup.open('.popup-match', false);
            },

            onMatchCancel(){
                //alert(' on match cancel ');
                let msg = Request.up.cancel_match_game.create();
                let buf = Request.up.cancel_match_game.encode(msg).finish();
                this.$websocket.send(Types.MsgEnum.cancel_match_game, buf, false).then(
                    ()=>{
                        console.log('cancel match games')
                    },
                    ()=>{
                        console.log('reject match games')
                    }
                );

                if ( this.matchTimeOutObject !== undefined )
                {
                    clearTimeout(this.matchTimeOutObject);
                }

                this.$f7.popup.close('.popup-match', false)
                this.matchAnimActive = false;
                this.matchBegin = false;
            },

            sendGameMatchAITime(time) {
                // console.log("统计每局AI的匹配时间   "+time)
                var param = {'label': 'user','Value': time};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_match_ai_time", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendGameMatchRoleTime(time) {
                // console.log("统计每局和真人的匹配时间   "+time)
                var param = {'label': 'user','Value': time};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Game_match_role_time", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            onMatchSuccess( user ){
                if ( user != null ) {
                    let matchTime = this.getMatchedTimeNow();
                    //判断匹配的玩家AI/真人
                    if(user.isRobot){
                        this.sendGameMatchAITime(matchTime);
                    } else {
                        this.sendGameMatchRoleTime(matchTime);
                    }

                    this.matchUserOther = {
                        userName : user.userName,
                        userHead : user.userHead,
                        userHeadFrame : this.$store.getters.getHeadFrameImage(user.headPortraitFrame)
                    }

                    this.matchAnimActive = true;
                }

                if ( this.matchTimeOutObject !== undefined )
                {
                    clearTimeout(this.matchTimeOutObject);
                }

                var _this = this;
                setTimeout( function () {
                    _this.$f7.popup.close('.popup-match', false)
                    _this.matchAnimActive = false;
                }, 1000);
            },

            getMatchedTimeNow: function (){
                let _this = this;
                let timestamp =Date.parse(new Date());
                return Math.abs(_this.matchTime - timestamp) / 1000;
            },

            onClickOpenChat() {
                this.sendClickChat();
                if (this.notifyTimer) {
                    clearImmediate(this.notifyTimer);
                }
            },

            //获取游戏在线人数
            fetchOnlineNum() {
                var _this = this;
                var gameIds = [];
                var games = this.$gameManager.getGameList();
                for (var i = 0; i < games.length; i++) {
                    gameIds.push(games[i].gameId);
                }

                let buf = Request.up.game_online_num.encode(
                    {
                        _gid_list: gameIds
                    }
                ).finish();

                _this.$websocket.send(Types.MsgEnum.game_online_num, buf).then((msg) => {
                        let data = Response.down.game_online_num.decode(msg);
                        let gidNumList = data._gid_num_list;
                        for (var i = 0; i < gidNumList.length; i++) {
                            var game = _this.$gameManager.getGameData(gidNumList[i]._gid);
                            game.gamePlayer = gidNumList[i]._online_num;
                        }
                        _this.gameList = _this.$gameManager.getHomeGames();
                        _this.isFreshData = true;
                    }
                    , (msg) => {
                        //console.log(' game online num ')
                    }
                );
            },

            fetchOfflineData() {
                let _this = this;
                let buf = Request.up.get_offline_data.encode({
                    _type: 1
                }).finish();

                _this.newNotifyNum = 0;
                _this.$websocket.send(Types.MsgEnum.get_offline_data, buf).then((msg) => {
                    // 请求好友列表成功，通过id请求其信息
                    let data = Response.down.get_offline_data.decode(msg);
                    console.log(data);
                    let addFriends = data._add_friend_list;
                    for (let uid in addFriends) {
                        _this.$dataManager.addInvitedFriend(uid);
                        _this.newNotifyNum++;
                    }

                    let agreeList = data._agree_add_friend_list;
                    for (let i = 0; i < agreeList.length; i++) {
                        _this.$dataManager.addAgreeFriend(agreeList[i]);
                        _this.newNotifyNum++;
                    }

                    let chatList = data._chat_list;
                    for (let i = 0; i < chatList.length; i++) {
                        this.$dataManager.addNotifyMessage(chatList[i]._uid, {
                            type: 'chat',
                            data: chatList[i]
                        })
                    }

                    let invitedList = data._invite_game_list;
                    for (let n = 0; n < invitedList.length; n++) {
                        let invited = invitedList[n];
                        let game = {
                            userId: invited._uid,
                            gameId: invited._gid,
                            timestamp: invited._timestamp,
                            userName: "userName"
                        };
                        this.$dataManager.addNotifyMessage(invited._uid, {
                            type: 'invited',
                            data: game
                        })
                    }

                    let cancelInvitedList = data._cancel_invite_game_list;
                    for (let n = 0; n < cancelInvitedList.length; n++) {
                        let cancelInvited = cancelInvitedList[n];
                        let game = {
                            userId: cancelInvited._uid,
                            gameId: cancelInvited._gid,
                            timestamp: cancelInvited.timestamp,
                            isRead: false,
                            userName: "userName"
                        };
                        this.$dataManager.addNotifyMessage(cancelInvited._uid, {
                            type: 'canceled',
                            data: game
                        })

                        //删除
                        let find = invitedList.findIndex(function (item) {
                            return (item._uid == cancelInvited._uid && item._gid == cancelInvited._gid)
                        })

                        console.log('find result === ' + find);
                        if (find >= 0) {
                            invitedList.splice(find, 1);
                        }
                    }

                    //添加离线的邀请
                    console.log(invitedList);
                    if (invitedList.length > 0) {
                        let game = {
                            userId: invitedList[0]._uid,
                            gameId: invitedList[0]._gid,
                            timestamp: invitedList[0]._timestamp,
                            isRead: false,
                            userName: "userName"
                        };
                        this.$dataManager.addJoinMatchGame(game);
                    }

                }).catch((msg) => {
                    console.log("get offline message " + msg);
                });
            },

            onClickEnterGame(game) {
                if (game.gamePlayer <= 0) {
                    // Create toast
                    if (!this.toastCenter) {
                        this.toastCenter = this.$f7.toast.create({
                            text: 'Coming Soon !',
                            position: 'center',
                            closeTimeout: 1000,
                        });
                    }
                    // Open it
                    this.toastCenter.open();
                }
            },

            setNotifyTimer: function () {
                let _this = this;
                _this.notifyTimer = setInterval(() => {
                    let notifys = _this.$dataManager.getAllNotifyMessage();
                    _this.newNotifyNum = Object.keys(notifys).length;
                    //console.log('new notify num ' + _this.newNotifyNum);
                }, 5000)
            },

            getSpacingTime: function () {
                let _this = this;
                let timestamp = Date.parse(new Date());
                return Math.abs(_this.gameTime - timestamp) / 1000;
            },

            btnClick() {
                // console.log("点击个人中心");
                let userId = this.$dataManager.getMyselfId();
                var param = {'label':'userId', 'value':userId};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Click_center", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendClickFriends() {
                // console.log("点击好友");
                let userId = this.$dataManager.getMyselfId();
                var param = {'label': 'UserId', 'value': userId};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Click_friends", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendClickChat() {
                // console.log("点击右上角聊天");
                let userId = this.$dataManager.getMyselfId();
                var param = {'label': userId};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Click_chat", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendClickNo() {
                if (this.exitNoGame) {
                    return;
                }
                // console.log("直接退出");
                let userId = this.$dataManager.getMyselfId();
                var param = {'label': userId};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Click_no", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendBonggoTimes() {
                let userId = this.$dataManager.getMyselfId();
                let param = {'label': 'UserId', 'value': userId};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Bonggo_times", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            //排行版学习 返回游戏列表
            onRankBack(){
                //alert('on rank back');
                this.$f7.popup.close('.popup-rank',false);
                this.onGamePopupClose(false);
            },
            //重新开始游戏
            onRankRestart(){
                //alert('on rank restart');
                this.$f7.popup.close('.popup-rank',false);

                if ( this.gameWindow != null )
                {
                    this.gameWindow.location.reload();
                }
            },

            onRankTapLeft(){
                var _this = this;
                var gameId = _this.matchGame.gameId;
                _this.$gameManager.getTodayRank(gameId,1,function (data) {
                    console.log(data);
                    _this.updateRankData(data);
                })

                _this.rankData.rankType = 'day';
                _this.updateRankNum();

                _this.rankTapLeftBg = "static/images/rank_tab_blue.png";
                _this.rankTapRightBg = "static/images/rank_tab_red_01.png";
            },

            onRankTapRight(){
                var _this = this;
                var gameId = _this.matchGame.gameId;
                _this.$gameManager.getWordRank(gameId,1,function (data) {
                    console.log(data);
                    _this.updateRankData(data);
                })

                _this.rankData.rankType = 'world';


                _this.updateRankNum();

                _this.rankTapLeftBg = "static/images/rank_tab_blue_01.png";
                _this.rankTapRightBg = "static/images/rank_tab_red.png";
            },

            updateRankData(data)
            {
                var _this = this;
                if ( data != null ) {
                    _this.rankData.rankList = [];
                    _this.rankList = [];
                    for (let i = 0; i < data._rank_list.length; i++) {
                        let rank = data._rank_list[i]
                        let pushData = {
                            index: i + 1,
                            userId: rank._uid,
                            userData: {
                                userName: "",
                                userHead: "./static/images/pingtaitx01.png",
                                userHeadFrame: ""
                            },
                            rankData: {
                                score: rank._score,
                                level: rank._level,
                            }
                        }

                        let localUser = _this.$dataManager.hasUser(rank._uid);
                        if (localUser == undefined) {
                            _this.$dataManager.fetchUserInfo(rank._uid);
                        } else {
                            pushData.userData = localUser;
                            _this.rankList.push(pushData);
                        }

                        _this.rankData.rankList.push(
                            pushData
                        )
                    }
                }
            },

            onHandleGetUserInfo(msg)
            {
                let userInfo = Response.down.get_user_info.decode(msg);
                let user = this.$dataManager.addUser(userInfo);
                for(let i = 0; i < this.rankData.rankList.length; i++)
                {
                    if ( this.rankData.rankList[i].userId == user.userId )
                    {
                        this.rankData.rankList[i].userData = user;
                        this.rankList.push(this.rankData.rankList[i]);
                        console.log(this.rankList)
                    }
                }
            },

            RankColorBg( index )
            {
                if ( index > 3 ) {
                    return 'url(\'static/images/rank_item_bg_04.png\')';
                }
                else
                {
                    return 'url(\'static/images/rank_item_bg_0' + index + '.png\')';
                }
            },

            SendRankData( gameId, score, level)
            {
                var _this = this;
                _this.rankData.score = score;
                _this.rankData.gameId = gameId;
                _this.$gameManager.sendRankData(this.matchGame.gameId, score, level, function (data) {

                    console.log('world num ');
                    console.log(data);
                    if ( data != null ) {
                        _this.rankData.rankDayNum = data._today_rank;
                        _this.rankData.rankWorldNum = data._world_rank;
                        _this.rankData.rankDayRise = data._today_rank_rise;
                        _this.rankData.rankWorldRise = data._world_rank_rise;
                        _this.updateRankNum();
                    }
                });

            },

            updateRankNum () {
                if ( this.rankData.rankType == 'day')
                {
                    this.rankData.rankShowNum = this.rankData.rankDayNum == undefined ? "50+" : this.rankData.rankDayNum;
                    this.rankData.rankShowRise = this.rankData.rankDayRise && this.rankData.rankDayNum > 0 ;
                }
                else if( this.rankData.rankType == 'world')
                {
                    this.rankData.rankShowNum =  this.rankData.rankWorldNum == 0 ? "50+" : this.rankData.rankWorldNum;
                    this.rankData.rankShowRise = this.rankData.rankWorldRise && this.rankData.rankWorldNum > 0 ;
                }
            },

            onHandleGameMessage(event){
                const data = event.data;
                console.info('游戏结束了');
                console.log(data);
                console.info('获得游戏传过来了的消息');
                switch (data.cmd) {
                    case 'GameOver': {
                            this.SendRankData( this.matchGame.gameId, data.msg.score, data.msg.level );
                            this.onPopupRankOpened();
                        }
                        break;
                    default:
                        break;
                }
            },

            onPopupRankOpened(){
                this.$f7.popup.open('.popup-rank', false);
                this.onRankTapLeft();
            },

            getRankScore(rank) {
                return  rank.rankData.score > 0 ? rank.rankData.score : rank.rankData.level;
            }
        }
    };
</script>

<style>

    .popup-rank {
        background: rgba(0, 0, 0, 0.4);
    }

    .popup-rank .rank-center {
        position: absolute;
        top: 55%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    .rank-dialog {
        width: 320px;
        height: 530px;
        background: white;
        border-radius: 1em;
        text-align: center;
    }

    .popup-match{
        background: rgba(0, 0, 0, 0.4);
    }

    .popup-match .match-center{
        position: absolute;
        top: 50%; left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
    }

    .match-dialog{
        width: 320px;
        height: 210px;
        background: snow;
        border-radius: 1em;
        text-align: center;
        vertical-align: middle
    }

    .match-dialog .match-title{
        position: relative;
        text-transform: uppercase;
        width: 128px;
        top: -20px;
        margin-right: auto;
        margin-left: auto;
        background-size: cover;
        padding: 11px 0px 15px 0px;
        color: snow;
        font-weight: bold;
        z-index: 10
    }

    .match-dialog .match-content{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .head-right, .head-left{
        margin: 6px;
        width: 25%;
        height: 25%;
        position: relative;
    }

    .head-right .search-icon{
        position: absolute;
        top: 25px;
        left: 25px;
        margin: 0 auto;
        width: 40px;
        z-index: 2;
        animation-name:anim-search-icon;
        animation-duration: .3s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
    }

    @keyframes anim-search-icon{
        to{
            transform:scale(1.2);
        }
    }

    .match-vs{
        width: 25%;
        display: none;
        transform: scale(0);
    }

    .match-vs.active{
        display: block;
        animation-name:match-vs-anim;
        animation-duration: .4s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
    }

    @keyframes match-vs-anim{
        0%{
            transform: scale(0) ;
        }
        25%{
            transform: scale(0.2) ;
        }
        75%{
            transform: scale(0.5);
        }
        100%{
            transform: scale(1);
        }
    }

    .card-raw {
        -webkit-flex-shrink: 0;
        -ms-flex: 0 0 auto;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        position: relative;
    }

    .card-raw.active {
        animation-name: card-raw-ani;
        animation-duration: 0.3s;
        animation-timing-function: linear;
        animation-iteration-count: 1;
    }

    div[class*="col"] {
        text-align: center;
        border: 0px solid #ddd;
        padding: 0px;
        margin-bottom: 0px;
        font-size: 12px;
    }

    .list-block {
        background: white;
        padding: 0px;
        margin: 8px;
        overflow: scroll !important;
    }

    #list-block {
        background: white;
        padding: 0px;
        margin: 0px;
        overflow: scroll !important;
    }

    .list-row {
        transform: scale(0.8) !important;
    }

    .list-row.scale {
        transform: scale(2) !important;
        transition: all ease 0.5s;
        position: relative; /*相对定位，是相对于前面的容器定位的*/
        z-index: 100;
    }

    #slide {
        background: #FBFBFB;
        height: 90px;
    }

    #cus-scrollbars {
        background: #FBFBFB;
        bottom: 0px !important;
        margin-left: 10px;
        margin-right: 10px;
    }

    .cir-image {
        width: 25px;
        height: 25px;
        border-radius: 13px;
    }

    .cir-image.active {
        width: 25px;
        height: 25px;
        border-radius: 13px;

        animation-name: img_scale;
        animation-duration: .6s;
        animation-iteration-count: 1;
        animation-direction: alternate;
    }

    @keyframes img_scale {
        0% {
            transform: scale(1)
        }
        50% {
            transform: scale(0)
        }
        100% {
            transform: scale(1)
        }
    }

    .cir-image1 {
        width: 32px;
        height: 32px;
        border-radius: 17px;
    }

    .game-name {
        padding-top: 8px;
        padding-bottom: 0px;
        text-align: start;
        font-size: 12px;
        font-weight: bold;
        color: #FFFFFF;
        text-transform: uppercase;
    }

    .game-player {
        text-align: start;
        font-size: 12px;
        font-weight: bold;
        align-content: center;
        color: #FFFFFF;
    }

    .game-item {
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .game-item-img {
        width: 54px;
        height: 54px;
        border-radius: 27px;
        margin: 0px auto;
        text-align: center;
        vertical-align: middle;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
    }

    .swiper-container-horizontal > .swiper-scrollbar {
        height: 0px;
    }

    .slide-item {
        align-items: center;
        margin-top: 24px;
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .5s ease;
    }

    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateX(10px);
        opacity: 0;
    }

    .home-title {
        alignment: center
    }

    .chat-list.active {
        animation-name: chat-list-ani;
        animation-duration: 8s;
        animation-timing-function: linear !important;
        animation-iteration-count: infinite;
    }

    @keyframes chat-list-ani {
        1% {
            transform: translateX(6px) rotate(2deg)
        }
        2% {
            transform: translateX(-6px) rotate(-2deg)
        }
        3% {
            transform: translateX(6px) rotate(2deg)
        }
        4% {
            transform: translateX(-6px) rotate(-2deg)
        }
        5% {
            transform: translateX(4px) rotate(1deg)
        }
        6% {
            transform: translateX(-4px) rotate(-1deg)
        }
        7% {
            transform: translateX(4px) rotate(1deg)
        }
        8% {
            transform: translateX(-4px) rotate(-1deg)
        }
        9% {
            transform: translateX(2px) rotate(0)
        }
        10% {
            transform: translateX(-2px) rotate(0)
        }
    }

    .pk-view-container {
        align-items: center;
        margin-top: 0%;
        position: relative;
        width: 100% !important;
    }

    .text-title {
        width: 20% !important;
        height: 100%;
        margin-left: 40% !important;
        position: absolute;
        z-index: 21 !important;
        background: transparent;
        text-align: center;
        font-size: 20px !important;
        color: white !important;
    }

    .popup-rank .list .item-inner:after{
        height: 0px;
    }

    .popup-rank .list ul:after{
        height: 0px;
    }

    .popup-rank .list ul:before{
        height: 0px;
    }
</style>

