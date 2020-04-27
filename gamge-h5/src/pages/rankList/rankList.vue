<template>
  <f7-page>
    <f7-block class="wrapContent">
      <div style="padding:10px 16px;">
        <f7-block class="back">
          <!-- <router-link to="/home">
            <img src="../../static/images/back.png" />
            <span class="head_title">leaderboard</span>
          </router-link> -->
          <img src="../../static/images/back.png" @click="goback"/> <span class="head_title">leaderboard</span>
        </f7-block>
        <div class="game_list">
          <f7-card class="game-card" v-for="(game ,index) in gameList" :key="game.id">
            <div v-on:click="tap(index,game.gameUrl,token,game.gameName)">
              <f7-card-header :style="fullStyle(game)" :class="{active:index==isShow}"></f7-card-header>
            </div>
          </f7-card>
        </div>
        <div class="game_name">{{gameName}}</div>
        <!--weekly和All按钮布局-->
        <div class="btn_box">
          <span
            class="btn"
            v-for="(title,index) in tabTitle"
            @click="Rank(index,gameUrl,token)"
            :class="{selected:cur==index}"
            :key="index"
          >{{title}}</span>
        </div>
      </div>
      <div class="ranInfoBox">
        <!-- 前三名布局-->
        <div class="top_tree" style="padding:10px 16px;">
          <div class="top_tree_flex">
            <div v-if="topTreeRankInfo.length >1">
              <div class="top_tree_flex_item" v-for="(rank,index) in topTreeRankInfo" :key="index">
                <div class="first_item" v-if="index == 0">
                  <div class="head_img">
                    <img class="second_img" :src="topTreeRankInfo[1].profilePicture" />
                    <div class="live_box" v-if="topTreeRankInfo[1].liveFlag == 1">
                      <div class="k-line k-line2-1"></div>
                      <div class="k-line k-line2-2"></div>
                      <div class="k-line k-line2-3"></div>LIVE
                    </div>
                  </div>

                  <div class="first_item_name">{{topTreeRankInfo[1].nickName}}</div>
                  <div>
                    <img class="star" src="../../static/images/start.png" />
                  </div>
                  <div class="score">{{topTreeRankInfo[1].score}}</div>
                  <div>
                    <span
                      v-if="topTreeRankInfo[1].followFlag == 0"
                      @click="topTreeAdd(1,topTreeRankInfo[1].memberId,token,1)"
                    >
                      <img class="plus" src="../../static/images/plus.png" />
                    </span>
                    <span class="topTreeFollow" v-if="topTreeRankInfo[1].followFlag == 1">
                      <img src="../../static/images/rank_unfollow.png" />
                    </span>
                  </div>
                </div>
                <div v-if="index == 1" class="second_item">
                  <div class="head_img">
                    <img :src="topTreeRankInfo[0].profilePicture" />
                    <div class="live_box" v-if="topTreeRankInfo[0].liveFlag == 1">
                      <div class="k-line k-line2-1"></div>
                      <div class="k-line k-line2-2"></div>
                      <div class="k-line k-line2-3"></div>LIVE
                    </div>
                  </div>
                  <div class="third_item_name">{{topTreeRankInfo[0].nickName}}</div>
                  <div>
                    <img class="star" src="../../static/images/start.png" />
                  </div>
                  <div class="score">{{topTreeRankInfo[0].score}}</div>
                  <div>
                    <span
                      v-if="topTreeRankInfo[0].followFlag == 0"
                      @click="topTreeAdd(0,topTreeRankInfo[0].memberId,token,1)"
                    >
                      <img class="plus" src="../../static/images/plus.png" />
                    </span>
                    <span class="topTreeFollow" v-if="topTreeRankInfo[0].followFlag == 1">
                      <img src="../../static/images/rank_unfollow.png" />
                    </span>
                  </div>
                </div>
                <div class="last_item" v-if="index == 2">
                  <div class="head_img">
                    <img class="second_img" :src="topTreeRankInfo[2].profilePicture" />
                    <div class="live_box" v-if="topTreeRankInfo[2].liveFlag == 1">
                      <div class="k-line k-line2-1"></div>
                      <div class="k-line k-line2-2"></div>
                      <div class="k-line k-line2-3"></div>LIVE
                    </div>
                  </div>
                  <div class="last_item_name">{{topTreeRankInfo[2].nickName}}</div>
                  <div>
                    <img class="star" src="../../static/images/start.png" />
                  </div>
                  <div class="score">{{topTreeRankInfo[2].score}}</div>
                  <div>
                    <span
                      v-if="topTreeRankInfo[2].followFlag == 0"
                      @click="topTreeAdd(2,topTreeRankInfo[2].memberId,token,1)"
                    >
                      <img class="plus" src="../../static/images/plus.png" />
                    </span>
                    <span class="topTreeFollow" v-if="topTreeRankInfo[2].followFlag == 1">
                      <img src="../../static/images/rank_unfollow.png" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="topTreeRankInfo.length == 1">
              <div
                class="top_tree_flex_item onlyOne"
                v-for="(rank,index) in topTreeRankInfo"
                :key="index"
              >
                <div v-if="index == 0" class="second_item">
                  <div class="head_img">
                    <img :src="topTreeRankInfo[0].profilePicture" />
                    <div class="live_box" v-if="topTreeRankInfo[0].liveFlag == 1">
                      <div class="k-line k-line2-1"></div>
                      <div class="k-line k-line2-2"></div>
                      <div class="k-line k-line2-3"></div>LIVE
                    </div>
                  </div>
                  <div class="third_item_name">{{topTreeRankInfo[0].nickName}}</div>
                  <div>
                    <img class="star" src="../../static/images/start.png" />
                  </div>
                  <div class="score">{{topTreeRankInfo[0].score}}</div>
                  <div>
                    <span
                      v-if="topTreeRankInfo[0].followFlag == 0"
                      @click="topTreeAdd(0,topTreeRankInfo[0].memberId,token,1)"
                    >
                      <img class="plus" src="../../static/images/plus.png" />
                    </span>
                    <span class="topTreeFollow" v-if="topTreeRankInfo[0].followFlag == 1">
                      <img src="../../static/images/rank_unfollow.png" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="white" v-on:click="personalCenter(this)">
          <div v-for="(afterFourthRankInfo,index) in  afterFourthRankInfo" :key="index">
            <div class="rank_list">
              <div class="rankNum">{{index+4}}</div>
              <div>
                <img class="nicheng_img" :src="afterFourthRankInfo.profilePicture" />
              </div>
              <div class="nicheng_win_box">
                <div class="nicheng">{{afterFourthRankInfo.nickName}}</div>
                <div class="afterFourthScore score">
                  <img class="star" src="../../static/images/start.png" />
                  <a class="score">{{afterFourthRankInfo.score}}</a>
                </div>
              </div>
              <div class="live_box" v-if="afterFourthRankInfo.liveFlag == 1">
                <div class="k-line k-line2-1"></div>
                <div class="k-line k-line2-2"></div>
                <div class="k-line k-line2-3"></div>LIVE
              </div>
              <div>
                <span
                  v-if="afterFourthRankInfo.followFlag == 0"
                  @click="add(index,afterFourthRankInfo.memberId,token,2)"
                >
                  <img class="plus" src="../../static/images/plus.png" />
                </span>
                <span class="follow" v-if="afterFourthRankInfo.followFlag == 1">
                  <img src="../../static/images/rank_unfollow.png" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="rank_list" v-for="(arrSelfRank,index) in  arrSelfRank" :key="index">
          <div class="rankNum">
            <span v-if="selfRankLessThanFiveHundred">
              {{arrSelfRank.rank
              +1}}
            </span>
            <span v-if="selfRankMoreThanFiveHundred">500+</span>
          </div>
          <div>
            <img class="nicheng_img" :src="arrSelfRank.profilePicture" />
          </div>
          <div class="nicheng_win_box">
            <div class="nicheng">{{arrSelfRank.nickName}}</div>
            <div class="arrSelfRank score">
              <img class="star" src="../../static/images/start.png" />
              <a class="score" v-if="arrSelfRank.score!=-1">{{arrSelfRank.score}}</a>
            </div>
          </div>
          <div v-if="warnMessage" class="warnMessage">You haven't played this game yet!</div>
        </div>
        <!-- chenwei8.9  -->
        <div class="gift-box" @click="handleAward()">
          <img class="gift-img" src="../../static/images/hezi.png" alt />
        </div>
      </div>
    </f7-block>
<<<<<<< HEAD
=======

    <!-- chenwei8.9 -->
    <div class="modal-pages" v-show="successShow">
      <div class="success-page">
        <h3 class="page-title">恭喜您!</h3>
        <div class="page-content">在上期游戏排行榜中排名第{{getUserRank}}! 获取奖励Exp {{getUserLevelExp}}!</div>
        <div class="page-awared" v-show="warnShow">已领奖</div>
        <div class="page-confirm" @click="closeShow()">确认</div>
      </div>
    </div>

    <div class="modal-pages" v-show="errorShow">
      <div class="success-page">
        <h3 class="page-title">很遗憾!</h3>
        <div class="page-content">只有在游戏排行榜中50名以内的玩家才能获得奖励! 争取下一次获奖哦!</div>
        <div class="page-confirm" @click="closeShow()">确认</div>
      </div>
    </div>
>>>>>>> 040415cd0ab07005cb939d9a63a5f78837362307
  </f7-page>
</template>
<style lang="scss" scoped>
@import "rankList.scss";
</style>
<script>
// import sample from "./rankList";
import Loading from "../components/Loading.vue";
export default {
  components: { Loading },

  data() {
    return {
      gameList: [],
      homeGames: [],
      gameHashData: {}, //游戏
      isShow: 0, //默认选中第一个游戏
      gameName: "Puzzle Trip",
      gameUrl: "puzzletrip",
      tabTitle: ["weekly", "All"],
      cur: 0, //默认选中第一个周排行榜,
      topTreeRank: [], //得分排名前三
      topTreeRankInfo: [], //排行榜信息排名前三
      afterFourthRankInfo: [], //排行榜第四名之后的信息
      isFollow: false, //是否关注
      token: "",
      arrSelfRank: [], //自己排行
      warnMessage: false, //自己玩过游戏时
      selfFollowStata: false, //自己在排行榜内时关注按钮不显示
      selfRankMoreThanFiveHundred: false, //自己排名超过500


      //chenwei8.9
      successShow: false,
      errorShow: false,
      warnShow: false,
      weekRanking: "",
      awardExp: "",
      currentLevel: "",
      currentExp: "",
      totalExp: "",
      levelProcess: ""

    };
  },
  created() {
    //是否需要远程拉取
    var _this = this;
    /**游戏列表 */

    // for (let i = 0; i < game_list.gameList.length; i++) {
    //   if (game_list.gameList[i].gameId != "happywheel") {
    //     _this.gameList.push(game_list.gameList[i]);
    //   }
    // }
    for (let i = 0; i < game_list.length; i++) {
      if (game_list[i].gameId != "happywheel") {
        _this.gameList.push(game_list[i]);
      }
    }
  },

  //chenwei8.9得到全局变量计算属性
  computed: {
    getUserRank() {
      return this.$store.getters.getUserRank();
    },

    getUserLevelExp() {
      return this.$store.getters.getUserLevelExp();
    }
  },
  methods: {
    //领取奖励打开弹窗 chenwei8.9
    handleAward() {
      this.getWeekListAwar();
    },

    //关闭领取奖励弹窗 chenwei8.9
    closeShow() {
      this.successShow = false;
      this.errorShow = false;
      this.warnShow = false;
    },

    //领取周排行榜奖励 chenwei8.9
    getWeekListAwar() {
      // let url =
      //   "http://172.31.2.218:8087/game/receive_award?gid=" +
      //   localStorage.getItem("currentGameName") +
      //   "&x-auth-token=" +
      //   localStorage.getItem("token");
       var url = "";
        url = environment(
          url,
          "/game/receive_award?gid=" +
        localStorage.getItem("currentGameName") +
        "&x-auth-token=" +
        localStorage.getItem("token")
        );
      this.$axios
        .post(url)
        .then(res => {
          if (res.data.code == "0") {
            this.weekRanking = res.data.data.ranking;
            this.awardExp = res.data.data.award_exp;
            this.currentLevel = res.data.data.level;
            this.currentExp = res.data.data.exp;
            this.totalExp = res.data.data.up_exp;
            this.levelProcess = parseInt(
              (res.data.data.exp / res.data.data.up_exp) * 100
            );
            this.$store.commit("setLevelProcess", this.levelProcess); //全局变量 存储进度条
            this.$store.commit("setUserRank", this.weekRanking); //全局变量 存储当前排行榜
            this.$store.commit("setUserLevel", this.currentLevel); //全局变量 存储当前等级
            this.$store.commit("setUserLevelExp", this.currentExp); //全局变量 存储当前经验
            this.$store.commit("setUserLevelTotalExp", this.totalExp); //全局变量 存储对应等级总经验
            this.successShow = true;
            this.warnShow = false;
            this.errorShow = false;
          } else if (res.data.code == "201") {
            this.successShow = true;
            this.warnShow = true;
            this.errorShow = false;
          } else if (res.data.code == "202") {
            this.successShow = false;
            this.warnShow = false;
            this.errorShow = true;
          }
        })
        .catch(err => {});
    },
    goback() {
      this.$router.back();
    },
    personalCenter(e) {
      console.info(e);
    },
    /*****************关注 ********************/
    followMember(index, id, token, type) {
      var _this = this;
      var url = "";
        url = environment(
          url,
          "/gameApi/followMember"
        );
      _this
        .$axios({
          method: "post",
          url: url + "?memberId=" + id,
          headers: {
            "x-auth-token": token,
            version: 3,
            deviceType: 2
          }
        })
        .then(function(res) {
          if (res.data.code === 0) {
            nnlog("关注前结果" + res.data.data.firstFollow);
            if (type === 1) {
              /**********************前三名的关注情况 **************/
              if (_this.topTreeRankInfo[index].followFlag == 0) {
                _this.topTreeRankInfo[index].followFlag =
                  res.data.data.firstFollow;
                nnlog("关注后结果" + _this.topTreeRankInfo[index].followFlag);
              } else {
                // _this.afterFourthRankInfo[index].followFlag = 0;
              }
            } else {
              if (_this.afterFourthRankInfo[index].followFlag == 0) {
                _this.afterFourthRankInfo[index].followFlag = 1;
                nnlog(
                  "关注后结果" + _this.afterFourthRankInfo[index].followFlag
                );
              } else {
                // _this.afterFourthRankInfo[index].followFlag = 0;
              }
            }
          }
        })
        .catch(
          e =>
            function(e) {
              nnlog(e);
            }
        );
    },

    topTreeAdd(index, id, token, type) {
      var _this = this;
      _this.followMember(index, id, token, type);
    },
    /**关注 */
    add(index, id, token, type) {
      var _this = this;
      _this.followMember(index, id, token, type);
    },

    /**获取游戏图片 */
    fullStyle(e) {
      return {
        "background-image": this.toGameImg(e)
      };
    },

    toGameImg(game) {
      return "url(" + game.gameImage + ")";
    },

    weekRankAndTotalRank(index, game, token) {
      var _this = this;
      //_this.cur = index;
      nnlog("进入排行榜方法时传过来的token值" + token);

      var url = "";

      /**周排行榜远程获取数据*/
      if (_this.cur === 0) {


        url = environment(
          url,
          "/game/week_of_rank?x-auth-token=" + token + "&gid=" + game
        );

        nnlog("传递给周排行榜的url" + url);
        _this.afterFourthRankInfo = [];
        _this.arrSelfRank = [];
        _this.topTreeRankInfo = [];
        _this.$axios
          .get(url)
          .then(function(res) {
            nnlog("周排行榜返回的数据" + JSON.stringify(res.data.data));
            if (res.data.data != null) {
              let rank = res.data.data.rank; //获取排行榜得分
              let rankInfo = res.data.data.rankingInfo.data;
              let selfRank = res.data.data.selfRank;
              _this.arrSelfRank.push(selfRank);
              /***************判断用户是否在500名*********/

              if (selfRank.rank > 499) {
                _this.selfRankMoreThanFiveHundred = true;
              } else {
                _this.selfRankLessThanFiveHundred = true;
              }

              /***************************把每一項的分数添加到排行榜对应的每一项信息中*************** */
              if (rank != null && rankInfo != null) {
                rankInfo.map((item, index) => {
                  for (let i in rank) {
                    if (rank[i].memberId != null && item.memberId != null) {
                      if (rank[i].memberId === item.memberId) {
                        rankInfo[index].score = rank[i].score;
                      }
                    }
                  }
                });
              }
              if (_this.arrSelfRank != null && rankInfo != null) {
                _this.arrSelfRank.map((item, index) => {
                  for (let i in rankInfo) {
                    if (rankInfo[i].memberId != null && item.uid != null) {
                      if (rankInfo[i].memberId === item.uid) {
                        _this.arrSelfRank[index].profilePicture =
                          rankInfo[i].profilePicture;
                        _this.arrSelfRank[index].nickName =
                          rankInfo[i].nickName;
                        _this.arrSelfRank[index].roomNo = rankInfo[i].roomNo;
                      }
                    }
                  }
                });
              }
              if (rankInfo.length < 4) {
                for (let i = 0; i < rankInfo.length - 1; i++) {
                  _this.topTreeRankInfo.push(rankInfo[i]);
                }
              } else {
                _this.topTreeRankInfo = rankInfo.slice(0, 3);
                var rankText = rankInfo.slice(3);
                if (selfRank != -1) {
                  for (let i = 0; i < rankText.length - 1; i++) {
                    _this.afterFourthRankInfo.push(rankText[i]);
                  }
                  _this.afterFourthRankInfo.slice(3);
                }
              }
              if (selfRank.score == -1) {
                _this.warnMessage = true;
              } else {
                _this.warnMessage = false;
              }
            } else {
              _this.topTreeRankInfo = [];
              _this.afterFourthRankInfo = [];
            }
          })
          .catch(function(error) {
            console.info("抛出错误" + error);
          });
      } else {
        /** 总排行榜远程获取数据切换直播 */
        nnlog("总排行榜获取到的token" + token);
        _this.afterFourthRankInfo = [];
        _this.arrSelfRank = [];
        _this.topTreeRankInfo = [];
        url = environment(
          url,
          "/game/total_of_rank?x-auth-token=" + token + "&gid=" + game
        );
        nnlog("获得总排行的地址" + url);
        _this.$axios
          .get(url)
          .then(function(res) {
            nnlog("总排行榜的数据" + JSON.stringify(res.data.data));
            if (res.data.data != null) {
              let rank = res.data.data.rank; //获取排行榜得分
              let rankInfo = res.data.data.rankingInfo.data;
              let selfRank = res.data.data.selfRank;
              _this.arrSelfRank.push(selfRank);

              /***************判断用户是否在500名*********/
              if (selfRank.rank > 499) {
                _this.selfRankMoreThanFiveHundred = true;
              } else {
                _this.selfRankLessThanFiveHundred = true;
              }
              if (rank != null && rankInfo != null) {
                rankInfo.map((item, index) => {
                  for (let i in rank) {
                    if (rank[i].memberId != null && item.memberId != null) {
                      if (rank[i].memberId === item.memberId) {
                        rankInfo[index].score = rank[i].score;
                      }
                    }
                  }
                });
              }
              if (_this.arrSelfRank != null && rankInfo != null) {
                _this.arrSelfRank.map((item, index) => {
                  for (let i in rankInfo) {
                    if (rankInfo[i].memberId != null && item.uid != null) {
                      if (rankInfo[i].memberId === item.uid) {
                        _this.arrSelfRank[index].profilePicture =
                          rankInfo[i].profilePicture;
                        _this.arrSelfRank[index].nickName =
                          rankInfo[i].nickName;
                        _this.arrSelfRank[index].roomNo = rankInfo[i].roomNo;
                      }
                    }
                  }
                });
              }
              if (rankInfo.length < 4) {
                for (let i = 0; i < rankInfo.length - 1; i++) {
                  _this.topTreeRankInfo.push(rankInfo[i]);
                }
              } else {
                _this.topTreeRankInfo = rankInfo.slice(0, 3);
                var rankText = rankInfo.slice(3);
                if (selfRank != -1) {
                  for (let i = 0; i < rankText.length - 1; i++) {
                    _this.afterFourthRankInfo.push(rankText[i]);
                  }
                  _this.afterFourthRankInfo.slice(3);
                }
              }

              if (selfRank.score == -1) {
                _this.warnMessage = true;
              } else {
                _this.warnMessage = false;
              }
            } else {
              _this.topTreeRankInfo = [];
              _this.afterFourthRankInfo = [];
            }
          })
          .catch(function(error) {
            console.info("抛出错误" + error);
          });
      }
    },

    Rank(index, game, token) {
      var _this = this;
      _this.cur = index; //设置当前是周榜还是总榜
      _this.weekRankAndTotalRank(index, game, token);
    },

    /**根据游戏名获得游戏排行榜 */
    tap(index, game, token, gameName) {
      var _this = this;
      this.isShow = index; //当前第几个游戏
      _this.gameName = gameName; //设置在页面上显示当前点击显示的游戏名
      _this.gameUrl = game;
      _this.weekRankAndTotalRank(index, game, token);

    }
  },
  watch: {
    isFreshData: function() {
      //console.log('is fresh data');
      if (this.isFreshData) {
        this.gamePlayer = this.toPlayerNum(this.game.gamePlayer);
      }
      this.isFlip = this.isFreshData;

    }
  },
  mounted() {
    var _this = this;
    cordova.exec(successCallBack, null, "SDKWrapper", "getToken", []);
    function successCallBack(result) {
      _this.token = result;
      nnlog("进入排行榜时获得安卓传递的token" + _this.token);
      _this.Rank(0, "puzzletrip", _this.token);
    }

    // _this.Rank(
    //   0,
    //   "puzzletrip",
    //   "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjozNzgsInJvb20tbm8iOjM4MCwibG9jYWwiOiJ6aF9DTiIsInJlZnJlc2gtdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUoxYzJWeUxXbGtJam96Tnpnc0luSmhibVFpT2pFM01qWTJNems0TURGOS5TclpMUGhkQ0Q3M1pDTTI0Q3gxM3hYajY2YjBjcW1sVmlNMHVGUzZ1T1g0IiwicmVmcmVzaC10aW1lIjoxNTY1OTY2MDIzMjI4fQ.RiKS2UN0WOYK36rZp9XWUzmw4MM9rmrKN1vbJLzrEdI"
    // );
  }
};
</script>


 
 