<template>
  <f7-page class="home-page">
    <!-- chenwei8.9 个人信息-->
    <router-link to="/level/level/">
      <div class="user-info" @click="getLevelMsg()">
        <div class="user-img">
          <img class="head-img" :src="getUserBaseImg" alt />
        </div>
        <div class="user-message">
          <div class="username">UserName: {{getUserBaseName | addFilter}}</div>
          <div class="user-level">LV: {{getCurrentLevel}}</div>
        </div>
      </div>
    </router-link>

    <router-link class="rankInWrap" to="/rankList/rankList">
      <img class="rankIn" src="../static/images/icon.png" />
    </router-link>
    <div class="rankInWrap" @click="goToRank">
      <img class="rankIn" src="../static/images/icon.png" />
    </div>

    <!------------------未加进大转盘时的布局-------------------->
    <f7-block style="margin-top: 5px;" v-if="homeList">
      <f7-row no-gap id="list-row" class="card-raw">
        <f7-col v-for="game in gameList " :key="game.id">
          <div class="home-item" v-if="game!= null">
            <home-item
              :game="game"
              v-on:home-item-click="onHomeItemClick(game)"
              v-on:home-enter-game="onHomeEnterGame"
            >
              <game-card :game="game" :full="isFull(game)" :isFreshData="isFreshData"></game-card>
              <div class="load-bar" :ref="game.gameUrl"></div>
            </home-item>
          </div>
        </f7-col>
      </f7-row>
    </f7-block>
    <router-view></router-view>
    <!-----------     新增大转盘后的重新布局                            --------------->
    <!-- <f7-block style="margin-top: 5px; padding: 0px 10px">
      <scroll-item v-for="(games) in homeGames" :key="games.key">
        <f7-row no-gap id="list-row" class="card-raw">
          <f7-col v-for="(game) in games " :key="game.id">
            <home-item
              :game="game"
              v-on:home-item-click="onHomeItemClick"
              v-on:home-enter-game="onHomeEnterGame"
            >
              <game-card :game="game" :full="isFull(games)" :isFreshData="isFreshData"></game-card>
              <div class="load-bar" :ref="game.gameUrl"></div>
            </home-item>
          </f7-col>
        </f7-row>
      </scroll-item>
    </f7-block>-->
    <div class="popup popup-game">
      <iframe
        class="game-frame"
        @load="onGamePopupLoad"
        :src="getGameUrl(result)"
        style="position: absolute; top: 0px; height:100%;width:100%;"
        scrolling="no"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <f7-link
        style="position: absolute; left: 10px; top: 10px; z-index: 5000; color: white"
        @click="onGamePopupClose(true)"
        icon-only
      >
        <f7-icon size="25px" ios="f7:arrow_back" md="material:arrow_back"></f7-icon>
      </f7-link>
    </div>

    <div class="popup popup-rank" style="z-index: 20000" @click="onRankBack">
      <div class="rank-center">
        <div class="rank-dialog"></div>
      </div>
    </div>
  </f7-page>
</template>
<script>
import Request from "../socket/up.js";
import Response from "../socket/down.js";
import Types from "../socket/types.js";
import GameCard from "./components/gamecard";
import { mapMutations } from "vuex";
import HomeItem from "./components/homeitem";
export default {
  components: { HomeItem, GameCard },
  data() {
    return {
      homeList: true,
      active: false,
      downloadDomObj: {}, // 下载游戏的dom数组节点
      gameHashData: {}, //游戏
      homeGames: [],
      gameList: [],
      isFreshData: false,
      exitNoGame: false,
      result: "",
      gamePopupUrl: "",
      gameWindow: null,
      transmitGameName: "",

      //chenwei8.9
      userBaseName: "",
      userBaseImg: "",
      currentLevel: "",
      currentExp: "",
      currentTotalExp: "",
      userToken: "",
      gameName: "",
      levelProcess: ""
    };
  },

  //chwenwei8.9 得到全局变量计算属性
  computed: {
    getUserBaseName() {
      return this.$store.getters.getUsername();
    },

    getCurrentLevel() {
      return this.$store.getters.getUserLevel();
    },

    getUserBaseImg() {
      return this.$store.getters.getUserImg();
    }
  },

  created() {
    //是否需要远程拉取
    var _this = this;
    nnlog("game_list_2019_6_25:" + JSON.stringify(game_list));
    nnlog("game_list_2019_6_25_gameList.length:" + game_list.length);
    _this.gameList = game_list;
    /**添加大转盘后数据重新处理 */
    // for (let i = 0; i < _this.gameList.gameList.length; i++) {
    //   _this.gameHashData[_this.gameList.gameList[i].gameId] =
    //     _this.gameList.gameList[i];
    // }
    // let homeGameIds = _this.gameList.homeGames;
    // for (let i = 0; i < homeGameIds.length; i++) {
    //   let games = [];
    //   for (let n = 0; n < homeGameIds[i].length; n++) {
    //     let gd = _this.gameHashData[homeGameIds[i][n]];
    //     if (gd != null) {
    //       games.push(gd);
    //     }
    //   }
    //   _this.homeGames.push(games);
    // }
    // nnlog(_this.homeGames);
    window.addEventListener("message", _this.onHandleGameMessage);
  },
  mounted() {
    //chenwei8.9
    this.getUserToken(); //获取token

    var _this = this;
    // 注册方法
    window["setDownloadProgress"] = result => {
      this.setDownloadProgress(result);
    };
    // _this.setDownloadProgress('{"gameName":"happywheel","current":"100" ,"total":"1000"}');
    /**********************切换到直播平台页面加载完成加载游戏 *******************************/
    cordova.exec(successCallBack, null, "SDKWrapper", "LoadGame", []);
    function successCallBack(result) {
      nnlog("调用loadGame_result" + result);
      nnlog("转换为对象之后" + JSON.parse(result));
      nnlog("调用loadGame" + JSON.parse(result).filePath);
      nnlog("tag 调用loadGame" + JSON.parse(result).tag);
      if (JSON.parse(result).tag == "10001") {
        nnlog("-0-----调用loadGame" + result.tag);
        // window.location.href = result.filePath;
        _this.onGamePopupOpen(JSON.parse(result).filePath); //打开有戏框
        nnlog("-0-----调用onGamePopupOpen" + JSON.parse(result).tag);
      }
    }
  },
  beforeDestroy() {
    //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    this.$EventBus.$off("changeHead");
    window.removeEventListener("message", this.onHandleGameMessage);
    if (window.setDownloadProgress) {
      window.setDownloadProgress = undefined;
    }
  },
  filters: {
    addFilter(vaule) {
      if (vaule == undefined) {
        return "";
      }
      if (vaule.length > 12) {
        return (
          vaule.substr(0, 5) +
          "..." +
          vaule.substr(vaule.length - 5, vaule.length)
        );
      } else {
        return vaule;
      }
    }
  },
  methods: {
    goToRank() {
      //var that = this;
      this.$router.push({
        // path:"/rankList/rankList"
        name: "rankList"
      });

      //window.open(routeData.href, '_blank');
    },
    /***************************** chenwei8.9 等级相关接口 *************************************/
    //chenwei8.9 获取token
    getUserToken() {
      let _this = this;
      cordova.exec(successCallBack, null, "SDKWrapper", "getToken", []);
      function successCallBack(result) {
        _this.userToken = result;
        nnlog("8.7chenwei获取token" + result);
        localStorage.setItem("token", _this.userToken);
        if (result) {
          _this.getUserBaseInfo(result);
          _this.getUserLevelInfo(result);
        }
      }
    },

    //chenwei8.9 获取个人头像 用户名
    getUserBaseInfo(result) {
      var url = "";
      url = environment(url, "/gameApi/gameMemberNameAndProInfo");
      nnlog("获取个人头像和用户名的url" + url);
      //result = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjozNzgsInJvb20tbm8iOjM4MCwibG9jYWwiOiJ6aF9DTiIsInJlZnJlc2gtdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUoxYzJWeUxXbGtJam96Tnpnc0luSmhibVFpT2pFM01qWTJNems0TURGOS5TclpMUGhkQ0Q3M1pDTTI0Q3gxM3hYajY2YjBjcW1sVmlNMHVGUzZ1T1g0IiwicmVmcmVzaC10aW1lIjoxNTY1OTY2MDIzMjI4fQ.RiKS2UN0WOYK36rZp9XWUzmw4MM9rmrKN1vbJLzrEdI';
      this.$axios
        .get(url, {
          headers: {
            "x-auth-token": result,
            version: 3,
            deviceType: 2,
            platform: "web"
          }
        })
        .then(res => {
          this.userBaseName = res.data.data.nickName;
          this.userBaseImg = res.data.data.profilePicture;
          this.$store.commit("setUsername", this.userBaseName); //全局存储 用户名
          this.$store.commit("setUserImg", this.userBaseImg); //全局存储  头像
        })
        .catch(err => {});
    },

    //chenwei8.9 获取个人等级信息
    getUserLevelInfo(result) {
      nnlog("个人等级的token" + result);
      var url = "";
      url = environment(url, "/game/get_user_level_info");
      //result = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjozNzgsInJvb20tbm8iOjM4MCwibG9jYWwiOiJ6aF9DTiIsInJlZnJlc2gtdG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlKOS5leUoxYzJWeUxXbGtJam96Tnpnc0luSmhibVFpT2pFM01qWTJNems0TURGOS5TclpMUGhkQ0Q3M1pDTTI0Q3gxM3hYajY2YjBjcW1sVmlNMHVGUzZ1T1g0IiwicmVmcmVzaC10aW1lIjoxNTY1OTY2MDIzMjI4fQ.RiKS2UN0WOYK36rZp9XWUzmw4MM9rmrKN1vbJLzrEdI';
      this.$axios
        .get(url, {
          headers: {
            "x-auth-token": result,
            version: 3,
            deviceType: 2,
            platform: "web"
          }
        })
        .then(res => {
          nnlog("8.7chenwei调用个人直播信息" + res.data.data);
          this.currentLevel = res.data.data.level;
          this.currentExp = res.data.data.exp;
          this.currentTotalExp = res.data.data.up_exp;
          this.levelProcess = parseInt(
            (res.data.data.exp / res.data.data.up_exp) * 100
          );
          this.$store.commit("setLevelProcess", this.levelProcess); //全局存储 等级进度条
          this.$store.commit("setUserLevel", this.currentLevel); //全局存储 用户等级
          this.$store.commit("setUserLevelExp", this.currentExp); //全局存储 用户当前经验
          this.$store.commit("setUserLevelTotalExp", this.currentTotalExp); //全局存储 用户对应升级总经验
        })
        .catch(err => {
          nnlog("调用个人等级信息" + err);
        });
    },

    //chenwei8.9 游戏开始通知
    getGameStartNotify(data) {
      var url = "";
      url = environment(
        url,
        "/game/game_begin?gid=" +
          data +
          "&x-auth-token=" +
          localStorage.getItem("token")
      );
      nnlog("游戏开始通知的url" + url);
      this.$axios
        .post(url)
        .then(res => {
          nnlog("8.7chenwei游戏开始通知" + res.data.code);
          let startGameRes = res;
        })
        .catch(err => {});
    },

    //chenwei8.9 游戏未正常结束返回通知
    getGameOverNotify() {
      let _this = this;
      var url = "";
      url = environment(
        url,
        "/game/game_return?gid=" +
          localStorage.getItem("gameName") +
          "&x-auth-token=" +
          localStorage.getItem("token")
      );
      nnlog("游戏未正常结束返回通知的url:" + url);
      _this.$axios
        .post(url)
        .then(res => {
          nnlog("游戏未正常结束返回通知" + res.data.code);
          let overGameRes = res;
          if (res.data.code == 0) {
            _this.getUserLevelInfo(localStorage.getItem("token"));
            nnlog("chenwei8.7 getUserLevelInfo");
          }
        })
        .catch(err => {});
    },

    //chenwei8.9点击跳转等级页面获取个人等级相关信息
    getLevelMsg() {
      let token = localStorage.getItem("token");
      this.getUserLevelInfo(token);
    },

    ...mapMutations([
      "setOnLineAddIdList",
      "setOnLineAgreeIdList",
      "setOnLineChatIdList",
      "setMyPortraitFrame",
      "setHeadPortraitFrameArray",
      "setShopObj",
      "setLoveGameList",
      "setAcheiveMentObj",

      //chenwei8.9
      "setUsername",
      "setUserImg",
      "setUserLevel",
      "setUserLevelExp",
      "setUserLevelTotalExp"
    ]),

    /**************************************安卓调用进度条的方法 *************************************/
    setDownloadProgress: function(dataStr) {
      // debugger
      nnlog("进入进度条的方法：" + dataStr);
      var app = this.$f7;
      var _this = this;
      var downData = JSON.parse(dataStr);
      downData.current = Number(downData.current);
      downData.total = Number(downData.total);

      // _this.dataStr.current += 100
      // 2. 显示进度条
      //nnlog(downData.gameName);
      if (_this.downloadDomObj[downData.gameName]) {
        nnlog("设置进度条");
        app.progressbar.set(
          _this.downloadDomObj[downData.gameName],
          (downData.current / downData.total) * 100
        );
        //console.info(downData.current, downData.total);
        // 隐藏进度条
        if (downData.current == downData.total) {
          nnlog("隐藏进度条");
          app.progressbar.hide(_this.downloadDomObj[downData.gameName]);
        }
      } else {
        nnlog("显示进度条");
        _this.downloadDomObj[downData.gameName] = app.progressbar.show(
          _this.$refs[downData.gameName],
          1
        );
        // _this.loadProgress = app.progressbar.show(_this.$refs[downData.gameName], 1);
      }
    },

    /**游戏上的左箭头触发事件 */

    onGamePopupClose(showConfirm) {
      var _this = this;
      if (showConfirm) {
        if (deviceName == "browser") {
          _this.$f7.dialog.confirm(
            "Are you sure you want to quit? ",
            "",
            () => {
              _this.gamePopupUrl = "";
              _this.$f7.popup.close(".popup-game", false);
              // _this.OnQuitGame();

              if (_this.gameWindow != null) {
                _this.gameWindow.location.replace("");
              }
            }
          );

          //_this.OnQuitGame();
        } else {
          _this.$f7.dialog.confirm(
            "Are you sure you want to quit? ",
            "",
            () => {
              cordova.exec(null, null, "SDKWrapper", "quit", []);
              _this.getGameOverNotify(); //chenwei8.9 调用游戏结束接口
            }
          );
        }
      } else {
        /******************************调用安卓的方法切换直播平台 **********************/
        if (deviceName == "browser") {
          _this.gamePopupUrl = "";
          _this.$f7.popup.close(".popup-game", false);

          if (_this.gameWindow != null) {
            _this.gameWindow.location.replace("");
          }
        } else {
          cordova.exec(null, null, "SDKWrapper", "quit", []);
        }
        //_this.getGameOverNotify();//chenwei8.9 调用游戏结束接口
      }
    },
    /************************************游戏框打开 *****************************************/
    onGamePopupOpen(url) {
      nnlog("调用onGamePopupOpen传递的" + url);
      var _this = this;
      let split = url.split("/");
      let getIndex = split.length - 2;
      _this.transmitGameName = split[getIndex]; //从安卓端获取游戏名
      if (deviceName == "browser") {
        if (_this.transmitGameName == "happywheel") {
          _this.gamePopupUrl =
            "http://172.31.2.229:8081/static/gameList/sever-games/dazhuanpan/happywheel/index.html?x-auth-token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjo1LCJyZWZyZXNoLXRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKMWMyVnlMV2xrSWpvMUxDSnlZVzVrSWpveE5qWTNOREkzTkRFeGZRLnZpUHNBLUFUeUljSHZFUnI3S01wMlQ4cDUyOWpvR3Q0WklNNDBCMjFLNmciLCJyZWZyZXNoLXRpbWUiOjE1NjA0MTQ5ODUxNTd9.nTOpETidfWTgoUf7Qj6KlyJakYZKlaYvfOkOnrwtEEk";
        } else {
          this.gamePopupUrl =
            "static/games/" +
            url +
            "/index.html?x-auth-token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjo1LCJyZWZyZXNoLXRva2VuIjoiZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKMWMyVnlMV2xrSWpvMUxDSnlZVzVrSWpveE5qWTNOREkzTkRFeGZRLnZpUHNBLUFUeUljSHZFUnI3S01wMlQ4cDUyOWpvR3Q0WklNNDBCMjFLNmciLCJyZWZyZXNoLXRpbWUiOjE1NjA0MTQ5ODUxNTd9.nTOpETidfWTgoUf7Qj6KlyJakYZKlaYvfOkOnrwtEEk";
        }
        this.$f7.popup.open(".popup-game", false);
      } else {
        /***************************切换到直播平台打开游戏 **********************************/

        // cordova.exec(successCallBack, null, "SDKWrapper", "getToken", []);
        // function successCallBack(result) {
        if (_this.transmitGameName == "happywheel") {
          var domainName = "";
          switch (isOpen) {
            case 1:
              /*****************************本地服务环境 *****************************/
              domainName = "172.31.2.218:8087";
              _this.gamePopupUrl =
                "http://172.31.2.229:8081/static/gameList/sever-games/dazhuanpan/happywheel/index.html?x-auth-token=" +
                localStorage.getItem("token") +
                "&domainName=" +
                domainName;
              break;
            case 2:
              /*****************************测试服务环境 *****************************/
              domainName = "test-api.unicolive.com";
              _this.gamePopupUrl =
                "http://test.unicolive.com/gameList/sever-games/dazhuanpan/happywheel/index.html?x-auth-token=" +
                localStorage.getItem("token") +
                "&domainName=" +
                domainName;
              break;
            default:
              domainName = "game.unicolive.com";
              _this.gamePopupUrl =
                "http://game.unicolive.com/gameList/sever-games/dazhuanpan/happywheel/index.html?x-auth-token=" +
                localStorage.getItem("token") +
                "&domainName=" +
                domainName;
          }
        } else {
          _this.gamePopupUrl = url + "?x-auth-token=" + result;
        }
        nnlog("进入获得token回调打开游戏的地址" + _this.gamePopupUrl);
        _this.$f7.popup.open(".popup-game", false);

        //chenwei8.9 游戏页面打开调用游戏开始接口
        _this.getGameStartNotify(localStorage.getItem("gameName"));
        // }
      }
    },

    getGameUrl() {
      nnlog("进入getGameUrl" + this.gamePopupUrl);
      return this.gamePopupUrl;
    },

    onGamePopupLoad(event) {
      nnlog(" on game popup load ");
      this.gameWindow = event.target.contentWindow;
    },
    isFull(games) {
      return games.length == 1;
    },

    onHomeItemClick(data) {
      var _this = this;
      nnlog("on item click event from child " + JSON.stringify(data));
      _this.transmitGameName = data.gameId;

      //chenwei8.9 本地存储游戏名
      localStorage.setItem("gameName", data.gameId);

      nnlog("设置要传递的游戏名" + _this.transmitGameName);
      //this.isFreshData = data;
      _this.exitNoGame = true;
    },
    /**从子组件传递过来的事件 */
    onHomeEnterGame(data) {
      nnlog("on home enter game event " + JSON.stringify(data));
      // this.onMatchStart(data.game); //本地打开游戏
      //nnlog("onHomeEnterGame" + data);
      this.onGamePopupOpen(data.game.gameUrl);
    },
    /********************关闭排行榜弹框合游戏的弹框*******************************/
    onRankBack() {
      //alert('on rank back');
      this.$f7.popup.close(".popup-rank", false);
      this.onGamePopupClose(false);
    },

    onRankRestart() {
      //alert('on rank restart');
      this.$f7.popup.close(".popup-rank", false);

      if (this.gameWindow != null) {
        this.gameWindow.location.reload();
      }
    },
    /***************************************游戏结束时提交分数的方法 ********************/
    onHandleGameMessage(event) {
      const data = event.data;
      nnlog("游戏传递过来的数据" + JSON.stringify(data));
      //nnlog("游戏传递过来的数据" + data);
      nnlog("进入游戏方法的游戏名" + this.transmitGameName);
      //_this.onHomeItemClick(data);

      switch (data.cmd) {
        case "GameOver":
          {
            var _this = this;
            _this.onPopupRankOpened(); //游戏结束时调用返回游戏列表页的方法
            _this.getGameOverNotify(); //chenwei8.9 调用游戏结束接口
            /**切到到直播平台提交游戏成绩结果 */
            // cordova.exec(successCallBack, null, "SDKWrapper", "getToken", []);
            // function successCallBack(result) {
            nnlog("进入成功回调的游戏名" + _this.transmitGameName);
            nnlog(
              "游戏结束时获得安卓传递的token" + localStorage.getItem("token")
            );
            var url = "";
            url = environment(
              url,
              "/game/commit_score?x-auth-token=" +
                localStorage.getItem("token") +
                "&gid=" +
                _this.transmitGameName +
                "&score=" +
                data.msg.score
            ); //获取接口的环境
            nnlog("提交分数的url" + url);
            _this.$axios
              .post(url)
              .then(function(res) {
                // nnlog("提交分数返回的结果"+JSON.stringify(res));
                nnlog("提交分数返回的结果" + res);
                nnlog("返回结果" + res.data.data);
              })
              .catch(function(error) {
                console.info("抛出错误" + error);
              });
            // }
          }
          break;
        default:
          break;
      }
    },

    onPopupRankOpened() {
      this.$f7.popup.open(".popup-rank", false);
      //this.onRankTapLeft();
    },

    getRankScore(rank) {
      return rank.rankData.score > 0
        ? rank.rankData.score
        : rank.rankData.level;
    }
  }
};
</script>

<style  scoped>
.md .row.no-gap .col:nth-last-child(5),
.md .row.no-gap .col:nth-last-child(4),
.md .row.no-gap .col:nth-last-child(3),
.md .row.no-gap .col:nth-last-child(2) {
  width: 50%;
}
.md .row.no-gap .col:nth-last-child(1) {
  width: 100%;
  height: 100%;
}

.home-item {
  display: block;
  margin: 2px 8px;
  transition: all 100ms ease-in;
  transform: scale(1);
  -webkit-transform: scale(1);
}

.touch-scale-effect {
  transition: all 100ms ease-in;
  -webkit-transition: all 100ms ease-in;
  transform: scale(0.9);
  -webkit-transform: scale(0.9);
}

.home-item .load-bar {
  position: absolute;
  bottom: 0;
  width: 90%;
  margin: 5%;
  z-index: 100;
}

.md .progressbar,
.md .progressbar-infinite {
  height: 20px;
}
</style>
<style lang='scss'>
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
  /* background: white; */
  border-radius: 1em;
  text-align: center;
}

.popup-match {
  background: rgba(0, 0, 0, 0.4);
}

.popup-match .match-center {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}

.match-dialog {
  width: 320px;
  height: 210px;
  background: snow;
  border-radius: 1em;
  text-align: center;
  vertical-align: middle;
}

.match-dialog .match-title {
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
  z-index: 10;
}

.match-dialog .match-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.head-right,
.head-left {
  margin: 6px;
  width: 25%;
  height: 25%;
  position: relative;
}

.head-right .search-icon {
  position: absolute;
  top: 25px;
  left: 25px;
  margin: 0 auto;
  width: 40px;
  z-index: 2;
  animation-name: anim-search-icon;
  animation-duration: 0.3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes anim-search-icon {
  to {
    transform: scale(1.2);
  }
}

.match-vs {
  width: 25%;
  display: none;
  transform: scale(0);
}

.match-vs.active {
  display: block;
  animation-name: match-vs-anim;
  animation-duration: 0.4s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

@keyframes match-vs-anim {
  0% {
    transform: scale(0);
  }
  25% {
    transform: scale(0.2);
  }
  75% {
    transform: scale(0.5);
  }
  100% {
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
  background: #fbfbfb;
  height: 90px;
}

#cus-scrollbars {
  background: #fbfbfb;
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
  animation-duration: 0.6s;
  animation-iteration-count: 1;
  animation-direction: alternate;
}

@keyframes img_scale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
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
  color: #ffffff;
  text-transform: uppercase;
}

.game-player {
  text-align: start;
  font-size: 12px;
  font-weight: bold;
  align-content: center;
  color: #ffffff;
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
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
 {
  transform: translateX(10px);
  opacity: 0;
}

.home-title {
  /* alignment: center; */
}

.chat-list.active {
  animation-name: chat-list-ani;
  animation-duration: 8s;
  animation-timing-function: linear !important;
  animation-iteration-count: infinite;
}

@keyframes chat-list-ani {
  1% {
    transform: translateX(6px) rotate(2deg);
  }
  2% {
    transform: translateX(-6px) rotate(-2deg);
  }
  3% {
    transform: translateX(6px) rotate(2deg);
  }
  4% {
    transform: translateX(-6px) rotate(-2deg);
  }
  5% {
    transform: translateX(4px) rotate(1deg);
  }
  6% {
    transform: translateX(-4px) rotate(-1deg);
  }
  7% {
    transform: translateX(4px) rotate(1deg);
  }
  8% {
    transform: translateX(-4px) rotate(-1deg);
  }
  9% {
    transform: translateX(2px) rotate(0);
  }
  10% {
    transform: translateX(-2px) rotate(0);
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

.popup-rank .list .item-inner:after {
  height: 0px;
}

.popup-rank .list ul:after {
  height: 0px;
}

.popup-rank .list ul:before {
  height: 0px;
}

.rankIn {
  width: 95%;
  margin: 10px auto 0 auto;
}
.rankInWrap {
  display: inline-block;
  text-align: center;
}
.md .block {
  padding: 0;
}

/*chenwei8.9*/
.user-info {
  padding: 10px 13px 0px;
  display: flex;
  align-items: center;
  font-family: DroidSans;
  .user-img {
    display: flex;
    align-items: center;
    .head-img {
      width: 14vw;
      height: 14vw;
      border-radius: 50%;
    }
  }
  .user-message {
    margin-left: 10px;
    .username {
      font-size: 4.5vw;
      font-weight: 400;
      color: #000;
      font-family: "DroidSans" !important;
      opacity: 0.8;
    }
    .user-level {
      font-size: 4.5vw;
      font-weight: 400;
      color: #000;
      font-family: "DroidSans" !important;
      opacity: 0.8;
    }
  }
}
</style>

