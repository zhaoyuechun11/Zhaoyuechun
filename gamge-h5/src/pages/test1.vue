 <template>
  <div>
    <!-- <scroller :on-infinite="infinite" :on-refresh = "refresh" ref="my_scrolle">
       <div v-for="(item, index) in items" :key="index">{{ item }}</div>
    </scroller>-->
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller">
      <div v-for="(item, index) in items" :key="index">{{ item }}</div>
    </scroller>

    <!-- <scroller style="padding-top: 44px;"
              :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller"><div class="white">
        <div>
          <div v-for="(afterFourthRankInfo,index) in  afterFourthRankInfo" :key="index">
            <div v-if="index+4 ==4" class="rank_list num_four">
              <div class="rankNum">{{index+4}}</div>
              <div>
                <img class="nicheng_img" src="../static/images/bg.png" />
              </div>
              <div class="nicheng_win_box">
                <div>{{afterFourthRankInfo.nickName}}</div>
              </div>
              <div v-if="afterFourthRankInfo.liveFlag == 1">
                <img class="live" src="../static/images/live.png" />
              </div>
              <div v-if="afterFourthRankInfo.followFlag == 0">
                <img class="plus" src="../static/images/plus.png" />
              </div>
              <div v-if="afterFourthRankInfo.followFlag == 1">
                <img class="plus" src="../static/images/bg.png" />
                {{afterFourthRankInfo.followFlag}}
              </div>
              <div>
                <img class="star" src="../static/images/start.png" />
              </div>
              <div class="score">{{afterFourthRankInfo.score}}</div>
            </div>

            <div class="rank_list" v-else>
              <div class="rankNum">{{index+4}}</div>
              <div>
                <img class="nicheng_img" src="../static/images/bg.png" />
              </div>
              <div class="nicheng_win_box">
                <div>{{afterFourthRankInfo.nickName}}</div>
              </div>
              <div v-if="afterFourthRankInfo.liveFlag == 1">
                <img class="live" src="../static/images/live.png" />
              </div>
              <div v-if="afterFourthRankInfo.followFlag == 0">
                <img class="plus" src="../static/images/plus.png" />
              </div>
              <div v-if="afterFourthRankInfo.followFlag == 1">
                <img class="plus" src="../../static/images/bg.png" />
                {{afterFourthRankInfo.followFlag}}
              </div>
              <div>
                <img class="star" src="../static/images/start.png" />
              </div>
              <div class="score">{{afterFourthRankInfo.score}}</div>
            </div>
          </div>
        </div>
      </div>


    </scroller>-->
  </div>
</template>

<style lang="scss" scoped>
body {
  font-size: 0.12rem;
}
.activeClass {
  background-color: #dfa6ff;
}
.md .block {
  margin: 0;
  padding: 0;
}
.page-content {
  padding: 0;
}
.wrapContent {
  // margin: 0;
  padding: 0 20px;
  //   background-image: url("../../static/images/bg.png");
  background-repeat: no-repeat;
  background-size: contain;
  height: 100%;
  width: 100%;
  background-position: center;
}
.back {
  height: 50px;
  display: flex;
  align-items: center;
  color: #fff;
}
.game_name {
  color: #fff;
  margin-left: 5px;
  padding: 5px 0;
}
.head_title {
  margin-left: 27px;
}
.back img {
  width: 12px;
  height: 19px;
}
.game_list {
  display: flex;
  overflow-x: scroll;
}
.game-item {
  // width: 84px;
  // height: 80px;
}
.game-card .card-header {
  overflow: hidden;
  background-size: contain;
  box-shadow: none;
  color: #fff;
  border-radius: 10px;
  background-position: center;
  height: 64px;
  width: 64px;
  border: 3px solid #dfa6ff;
}
.game-card .active {
  border: 3px solid #ffffff;
}
.game-card {
  transition-property: transform;
  transform: scale(1) !important;
  transition-duration: 0.1s;
  border-radius: 10px !important;
}

.game-card .card-header:after {
  content: none;
}
.game-card .card-footer:before {
  content: none;
}
.md .card {
  margin: 0;
  margin-right: 15px;
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
.btn_box {
  display: flex;
  justify-content: space-between;
}
.btn {
  width: 46%;
  height: 34px;
  display: inline-block;
  background-color: #939292;
  line-height: 34px;
  text-align: center;
  color: #fff;
  font-weight: 800;
  border-radius: 5px;
}
.selected {
  background-color: #0084ff;
}
.top_tree {
  //   background-image: url("../../static/images/topThree.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
  width: 95%;
  height: 38%;
}
.top_tree_flex {
  display: flex;
  justify-content: space-around;
  color: #fff;
  // position: relative;
  // top: -22px;
  margin-top: 30px;
}
.top_tree_flex_item {
  text-align: center;
}
.third_item_name {
  position: relative;
  top: -10px;
}
.top_tree_flex_item .head_img {
  position: relative;
  top: -15px;
}
.last_item .head_img {
  position: relative;
  top: -5px;
}
.first_item {
  position: relative;
  top: 20px;
}
.first_item .head_img {
  position: relative;
  top: -10px;
}
.first_item_name {
  position: relative;
  top: -6px;
}
.last_item_name {
  position: relative;
  top: -10px;
}
.second_item {
  position: relative;
  top: -10px;
}
.top_tree_flex_item .head_img::before {
  width: 25px;
  height: 23px;
  display: block;
  position: absolute;
  content: "";
  left: 25px;
  top: -10px;
}
.second_item .head_img::before {
  //   background: url("../../static/images/cold_crown.png") no-repeat center;
  background-size: contain;
}
.last_item .head_img::before {
  //   background: url("../../static/images/copper_crown.png") no-repeat center;
  background-size: contain;
}
.first_item .head_img::before {
  //   background: url("../../static/images/greater.png") no-repeat center;
  background-size: contain;
}
.head_img img,
.nicheng_img {
  width: 46px;
  height: 46px;
  border-radius: 23px;
}
.first_item {
  // position: relative;
  // top: -34px;
}
.last_item {
  position: relative;
  bottom: -0.4rem;
}
.winning {
  color: #767676;
}
.top_tree .star {
  width: 30px;
  height: 30px;
}
.rank_list .star {
  width: 20px;
  height: 20px;
  padding: 0 5px;
}
.score {
  color: #fd4a89;
}
.white {
  //   background-image: url("../../static/images/whiteBg.png");
  background-repeat: no-repeat;
  position: fixed;
  width: 100%;
  height: 1.8rem;
  left: 0;
  bottom: 12%;
  overflow-y: scroll;
}
.rank_list {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  padding: 10px;
  font-size: 12px;
}
.nicheng_win_box {
  flex-grow: 1;
  margin-left: 10px;
}
.rankNum {
  margin-right: 18px;
  color: #d0d0d0;
  font-size: 15px;
}
.num_four {
  padding: 40px 10px 10px;
}
.plus {
  padding: 0 5px;
}
.live {
  width: 61px;
}
.minus_wrap {
  margin-right: 5px;
}
.minus {
  width: 20p;
}
.footer {
  position: fixed;
  bottom: 0;
  height: 77px;
  background-color: #fff;
  width: 100%;
  left: 0;
}

// /* iphone 6 */
// @media (min-device-width : 375px) and (max-device-width : 667px) and (-webkit-min-device-pixel-ratio : 2){
//     html{font-size: 117.1875px;}
// }
// /* iphone6 plus */
// @media (min-device-width : 414px) and (max-device-width : 736px) and (-webkit-min-device-pixel-ratio : 3){
//     html{font-size: 129.375px;}
// }
</style>
<script>
var text = {
  data: {
    rankingInfo: {
      code: 0,
      data: [
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100014,
          nickName: "呼呼",
          followFlag: 1,
          memberId: 15
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100004,
          nickName: "拉拉",
          followFlag: 0,
          memberId: 5
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100002,
          nickName: "哈哈",
          followFlag: 0,
          memberId: 1
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100002,
          nickName: "嘿嘿",
          followFlag: 0,
          memberId: 2
        },
        {
          profilePicture: null,
          liveFlag: 1,
          roomNo: 100014,
          nickName: "呼呼",
          followFlag: 0,
          memberId: 3
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100004,
          nickName: "拉拉",
          followFlag: 1,
          memberId: 4
        },
        {
          profilePicture: null,
          liveFlag: 1,
          roomNo: 100002,
          nickName: "哈哈",
          followFlag: 0,
          memberId: 5
        },
        {
          profilePicture: null,
          liveFlag: 1,
          roomNo: 100002,
          nickName: "嘿嘿",
          followFlag: 1,
          memberId: 6
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100014,
          nickName: "呼呼",
          followFlag: 1,
          memberId: 7
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100004,
          nickName: "拉拉",
          followFlag: 0,
          memberId: 8
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100002,
          nickName: "哈哈",
          followFlag: 0,
          memberId: 9
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100002,
          nickName: "嘿嘿",
          followFlag: 0,
          memberId: 10
        },
        {
          profilePicture: null,
          liveFlag: 1,
          roomNo: 100014,
          nickName: "呼呼",
          followFlag: 0,
          memberId: 11
        },
        {
          profilePicture: null,
          liveFlag: 0,
          roomNo: 100004,
          nickName: "拉拉",
          followFlag: 1,
          memberId: 12
        },
        {
          profilePicture: null,
          liveFlag: 1,
          roomNo: 100002,
          nickName: "哈哈",
          followFlag: 0,
          memberId: 13
        },
        {
          profilePicture: null,
          liveFlag: 1,
          roomNo: 100002,
          nickName: "嘿嘿",
          followFlag: 1,
          memberId: 14
        }
      ],
      serverTime: 1561948912156,
      message: "SUCCESS"
    },
    rank: [
      {
        score: 120,
        memberId: 15
      },
      {
        score: 110,
        memberId: 5
      },
      {
        score: 100,
        memberId: 1
      },
      {
        score: 99,
        memberId: 2
      },
      {
        score: 99,
        memberId: 3
      },
      {
        score: 99,
        memberId: 4
      },
      {
        score: 99,
        memberId: 5
      },
      {
        score: 99,
        memberId: 6
      },

      {
        score: 120,
        memberId: 7
      },
      {
        score: 110,
        memberId: 8
      },
      {
        score: 100,
        memberId: 9
      },
      {
        score: 99,
        memberId: 10
      },
      {
        score: 99,
        memberId: 11
      },
      {
        score: 99,
        memberId: 12
      },
      {
        score: 99,
        memberId: 13
      },
      {
        score: 99,
        memberId: 14
      }
    ],
    friendList: {
      code: 0,
      data: {
        number: 0,
        size: 0,
        content: [],
        totalElements: 0
      },
      serverTime: 1561948912497,
      message: "SUCCESS"
    }
  },
  code: 0,
  message: "SUCCESS",
  serverTime: 1561948912501
};

//   import NavBar from './NavBar.vue'

export default {
  // components: {
  //   NavBar
  // },

  data() {
    return {
      isLoading: true,
      items: [],
      afterFourthRankInfo: [] //排行榜第四名之后的信息
    };
  },

  mounted() {
    //   for (let i = 1; i <= 20; i++) {
    //     this.items.push(i + ' - keep walking, be 2 with you.')
    //   }

    //   this.top = 1
    //   this.bottom = 20

    // var _this = this;

    let rank = text.data.rank; //获取排行榜得分
    let rankInfo = text.data.rankingInfo.data;
    rankInfo.map((item, index) => {
      for (let i in rank) {
        if (rank[i].memberId === item.memberId) {
          rankInfo[index].score = rank[i].score;
        }
      }
    });
    // console.info(rankInfo);
    this.topTreeRankInfo = rankInfo.slice(0, 3);
    this.afterFourthRankInfo = rankInfo.slice(3);

    for (let i = 1; i <= 3; i++) {
      this.items.push(this.afterFourthRankInfo[i]);
    }

    //       this.top = 1
    //       this.bottom = 3

    //console.info(_this.afterFourthRankInfo);
    //console.info(game);
    // _this.$axios
    //   .get(
    //     "http://172.31.2.218:8087/game/total_of_rank?x-auth-token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjoxNSwicmVmcmVzaC10b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5TFdsa0lqb3hOU3dpY21GdVpDSTZNVGt5TXpnNU16Z3pOMzAuT0t1bGcwNms5Z1pLS1NGNFpnZXRxUmRiUmREdS1ZVEpnNFM1ZlBqRzQ0SSIsInJlZnJlc2gtdGltZSI6MTU1OTgzNjg2NzE3Nn0.y_Xuh9UCb_SDv11kUfo7aQ9ACfQbtrcfgMcI0uwEGGI&gid=" +
    //       game
    //   )

    //   // .get("http://172.31.2.218:8087/game/total_of_rank?x-auth-token=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyLWlkIjoxNSwicmVmcmVzaC10b2tlbiI6ImV5SmhiR2NpT2lKSVV6STFOaUo5LmV5SjFjMlZ5TFdsa0lqb3hOU3dpY21GdVpDSTZNVGt5TXpnNU16Z3pOMzAuT0t1bGcwNms5Z1pLS1NGNFpnZXRxUmRiUmREdS1ZVEpnNFM1ZlBqRzQ0SSIsInJlZnJlc2gtdGltZSI6MTU1OTgzNjg2NzE3Nn0.y_Xuh9UCb_SDv11kUfo7aQ9ACfQbtrcfgMcI0uwEGGI&gid="+game.gameUrl)

    //   .then(function(res) {
    //     console.info(res);
    //   })
    //   .catch(function(error) {
    //     console.info("抛出错误" + error);
    //   });
  },

  methods: {
    // myInstalHomeFun(done) {
    //     var _this = this;
    //   if (_this.isLoading) {
    //     this.isLoading = false;
    //     this.showLoading = false;
    //     if (this.afterFourthRankInfo.length > 0) {
    //       for (let i = 1; i <= this.afterFourthRankInfo.length; i++) {
    //         this.items.push(this.afterFourthRankInfo[i]);
    //       }
    //     } else {
    //       done(2);
    //     }
    //   } else {
    //     done(2);
    //   }
    // },
    // refresh(done) {
    //     this.isLoading = true;
    //   let timer = null;
    //   this.page = 1;
    //   clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     this.myInstalHomeFun(done);
    //   }, 500);
    // },
    // infinite(done) {
    //   let timer = null;
    //   clearTimeout(timer);
    //   timer = setTimeout(() => {
    //     this.myInstalHomeFun(done);
    //   }, 500);
    // }

    //上拉加载
    infinite: function() {
      console.log("infinite");
      this.timeout = setTimeout(() => {
        for (let i = 1; i <= this.afterFourthRankInfo.length; i++) {
          if (i <this.afterFourthRankInfo.length) {
            this.$refs.my_scroller.finishInfinite(true);
              this.items.push(this.afterFourthRankInfo[i]);
          } else {
            this.$refs.my_scroller.finishInfinite(false);
          }
          //this.$refs.my_scroller.resize();//已弃用，
        
        }
      }, 1500);
    },
    //下拉刷新
    refresh: function() {
      console.log("refresh");
      this.timeout = setTimeout(() => {
        this.$refs.my_scroller.finishPullToRefresh();
      }, 1500);
    }
  }
};
</script>