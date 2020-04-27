<template>
  <f7-link style="display: block">
    <f7-card class="game-card">
      <f7-card-header :style="fullStyle()">
        <f7-card-footer
          style="width: 100%; color: #FFFFFF;flex-direction: column;justify-content:flex-start;
                              align-items: flex-start;padding: 0px 10px;
                              background: -webkit-linear-gradient(right,rgba(0,122,255,0.8),rgba(0,122,255,1));
                              border-radius: 0px 0px 10px 10px"
          :style="{ 'background': '-webkit-linear-gradient(left,'+hex2Rgb(game.gameColor)+','+game.gameColor+')'}"
        >
          <div class="game-name">{{ game.gameName }}</div>
          <div class="game-player" v-if="game.gamePlayer > 0">
            <div style="float: left" :class="{'text-effect':isFlip}">{{gamePlayer}}</div>&nbspPLAY
          </div>
          <div class="game-player" v-if="game.gamePlayer == 0">Coming Soon</div>
        </f7-card-footer>
      </f7-card-header>
    </f7-card>
  </f7-link>
</template>
<script>
export default {
  name: "GameCard",
  props: {
    game: {},
    full: Boolean,
    isFreshData: Boolean
  },

  data() {
    return {
      gamePlayer: 100,
      isFlip: true
    };
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
    this.gamePlayer = this.toPlayerNum(this.game.gamePlayer);
  },

  methods: {
    fullStyle() {
      return {
        "background-image": this.toGameImg(this.game)
        // "padding-top": this.full ? "30%" : "65%"
      };
    },

    toGameImg(game) {
      return "url(" + game.gameImage + ")";
    },

    toGameUrl(game) {
      if (game.gamePlayer > 0) {
        return "/match/" + game.gameUrl + "/" + game.gameName;
      } else {
        return "";
      }
    },

    toPlayerNum(gamePlayer) {
      if (gamePlayer > 0) {
        return gamePlayer + Math.floor(Math.random() * 500);
      }
      return gamePlayer;
    },
    hex2Rgb(hex) {
      var rgb = [];
      if (/^\#[0-9A-F]{3}$/i.test(hex)) {
        let sixHex = "#";
        hex.replace(/[0-9A-F]/gi, function(kw) {
          sixHex += kw + kw;
        });
        hex = sixHex;
      }
      if (/^#[0-9A-F]{6}$/i.test(hex)) {
        hex.replace(/[0-9A-F]{2}/gi, function(kw) {
          rgb.push(eval("0x" + kw));
        });
        return `rgba(${rgb.join(",")}, 0.8)`;
      } else {
        console.log(`Input ${hex} is wrong!`);
        return "rgba(0,0,0)";
      }
    }
  }
};
</script>

<style scoped>
.game-card .card-header {
  overflow: hidden;
  padding: 65% 0px 0px;
  background-size: cover;
  box-shadow: none;
  color: #fff;
  border-radius: 10px;
}
.md .row.no-gap .col:nth-last-child(1) .game-card .card-header {
  padding-top: 42.4%;
  background-origin: content-box;
}
.md .row.no-gap .col:nth-last-child(1) .game-card .card-header .card-footer {
  padding: 4px 10px;
}
.game-card {
  transition-property: transform;
  transform: scale(1) !important;
  transition-duration: 0.1s;
  margin: 8px 0px !important;
  border-radius: 10px !important;
}

.game-card .card-header:after {
  content: none;
}

.game-card .card-footer:before {
  content: none;
}
.text-effect {
  backface-visibility: visible !important;
  animation-name: rotate-hor-center;
  animation-duration: 0.8s;
}

@keyframes rotate-hor-center {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
}
</style>
