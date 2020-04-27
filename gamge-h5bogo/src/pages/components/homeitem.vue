<template>
  <div class="home-item" :class="{'touch-scale-effect': isActive()}">
    <div class="load-bar" ref="loadProgress">
      <!--<div class="progressbar" data-progress="0"></div>-->
    </div>
    <slot></slot>
  </div>
</template>

<script>
  import GameCard from './gamecard';
  import {LoadManager} from 'src/data/loadmanager';

  export default {
    name: "HomeItem",
    components: {GameCard},
    props: {
      game: null,
    },

    data() {
      return{
        active: false,
        loadProgress : null,
        isloading: false,
        pressMoved: false,
      }
    },

    methods : {
      isActive: function () {
        return this.active;
      },

      onEnterGame(game)
      {
        this.sendGameClickTimes(game);
        if (game.gamePlayer <= 0 )
        {
          if (!this.toastCenter) {
          }

          this.toastCenter = this.$f7.toast.create({
            text: 'Coming Soon !',
            position: 'center',
            closeTimeout: 1000,
          });

          // Open it
          this.toastCenter.open();
        }
        else
        {
          // this.$f7router.navigate('/match/',{
          // props:{
          //   game : this.game
          // }});
          this.$emit('home-enter-game', {
            game: this.game
          });

        }
      },

      addEventListener()
      {
        var _el = this.$el;
        var _this = this;
        var app = this.$f7;
        _el.addEventListener('touchstart', e => {
          _this.pressMoved = false;
          if ( _this.active == false )
          {
            _this.active = true;
            _this.$emit('home-item-click', false);
          }

        },{passive: true});

        _el.addEventListener('touchmove', e =>{
          if ( _this.active ) {
            _this.active = false;
          }
          _this.pressMoved = true;
        },{passive: true});

        _el.addEventListener('touchend', e =>{
          if ( _this.active ) {
            _this.active = false;
            _this.$emit('home-item-click', true);
          }

          if ( _this.pressMoved == false && _this.game )
          {
            if ( _this.game.gamePlayer > 0 ) {

              _this.$gameManager.hasDownGame(_this.game.gameUrl,function (url) {
                //alert('game url ' + url);
                _this.game.localUrl = url;
                _this.onEnterGame(_this.game);

              }, function (error) {

                // find file error,
                //alert('Begin Down Load Game');
                if ( _this.isloading )
                  return;

                _this.isloading = true;
                let url = 'games/' + _this.game.gameUrl;
                LoadManager.downLoadGame(url,function (result) {
                  if ( result.ret > 0 )
                  {
                    //_this.onEnterGame(_this.game);
                  }
                  else
                  {
                    //alert('down load game fail !!!');
                  }
                  app.progressbar.hide(_this.loadProgress);
                  _this.loadProgress = null;
                  _this.isloading = false;
                },function (process) {
                  //console.log('process value ' + process);
                  if ( _this.loadProgress == null )
                  {
                    _this.loadProgress = app.progressbar.show(_this.$refs.loadProgress, 1);
                  }
                  else
                  {
                    app.progressbar.set(_this.loadProgress, process);
                  }
                });
              })
            }
          }
        },{passive: true})
      },
      sendGameClickTimes(game){
        // console.log("大厅游戏入口的点击次数:"+game.gameName);
        let userId = this.$dataManager.getMyselfId();
        let param = {'label': game.gameName,'value': userId };
        if (this.$config.deviceName !== "browser") {
            facebookConnectPlugin.logEvent("Game_click_times", param, 1, function () {
            console.log("logEvent success!");
          }, function (error) {
            //退出失败
            console.log("logEvent failure!");
            console.log(error.toString());
          });
        }
      }
    },

    mounted: function () {
      this.addEventListener();
    }
  }
</script>

<style scoped>
  .home-item{
    display: block;
    margin: 2px 8px;
    transition: all 100ms ease-in;
    transform: scale(1);
    -webkit-transform: scale(1);
  }

  .touch-scale-effect{
    transition: all 100ms ease-in;
    -webkit-transition : all 100ms ease-in;
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
  }

  .home-item .load-bar{
    position: absolute;
    bottom: 40%;
    width: 90%;
    margin: 5%;
    z-index: 100;
  }

  .md .progressbar, .md .progressbar-infinite {
    height: 20px;
  }

</style>
