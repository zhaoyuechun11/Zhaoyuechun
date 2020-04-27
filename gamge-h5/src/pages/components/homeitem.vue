<template>
  <div class="home-item" :class="{'touch-scale-effect': isActive()}">
    <slot></slot>
  </div>
</template>

<script>


export default {
  name: "HomeItem",
  props: {
    game: null,
    gameIndex: null
  },

  data() {
    return {
      active: false,
      isloading: false,
      pressMoved: false,
   
    };
  },
  created: function() {

  },
  methods: {
    isActive: function() {
      return this.active;
    },
    onEnterGame(game) {
      // this.sendGameClickTimes(game);
      if (game.gamePlayer <= 0) {
        if (!this.toastCenter) {
        }

        this.toastCenter = this.$f7.toast.create({
          text: "Coming Soon !",
          position: "center",
          closeTimeout: 1000
        });

        // Open it
        this.toastCenter.open();
      } else {
        // this.$f7router.navigate('/match/',{
        // props:{
        //   game : this.game
        // }});
        /********************************要传递给父组件的事件名 *************************/
        this.$emit("home-enter-game", {
          game: this.game
        });
        console.info("onEnterGame" + game);
      }
    },

    addEventListener() {
      var _el = this.$el;
      var _this = this;
      var app = this.$f7;
      _el.addEventListener(
        "touchstart",
        e => {
          _this.pressMoved = false;
          if (_this.active == false) {
            _this.active = true;
            _this.$emit("home-item-click", false);
          }
        },
        { passive: true }
      );

      _el.addEventListener(
        "touchmove",
        e => {
          if (_this.active) {
            _this.active = false;
          }
          _this.pressMoved = true;
        },
        { passive: true }
      );

      _el.addEventListener(
        "touchend",
        e => {
          if (_this.active) {
            _this.active = false;
            _this.$emit("home-item-click", true);
          }
          // _this.$emit("sendGame", _this.game.gameUrl);
          if (_this.pressMoved == false && _this.game) {
            if (deviceName == "browser") {
              /************************************本地打开游戏调用的方法************************ */
                _this.onEnterGame(_this.game);
            } else {
              let url = "";
              switch (isOpen) {
                case 1:
                  /*******************本地服务环境 *****************/
                  url =
                    "http://172.31.2.229:8081/static/gameList/sever-games/" +
                    _this.game.gameUrl +
                    ".zip";
                  break;
                case 2:
                  /*************************测试服务环境 *******************/
                  url =
                    "http://test.unicolive.com/gameList/sever-games/" +
                    _this.game.gameUrl +
                    ".zip";
                  break;
                default:
              }
              nnlog("准备调用下载" + url);
              cordova.exec(null, null, "SDKWrapper", "downloadGame", [
                url,
                _this.game.gameUrl,
                _this.game.versionNo
              ]);
              nnlog("调用下载完成");
            }
          }
        },
        { passive: true }
      );
    },
  },

  mounted() {
    this.addEventListener();
  },

  beforeDestroy() {
    //将全局的方法注销掉;
  }
};
</script>

<style scoped>
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

</style>
