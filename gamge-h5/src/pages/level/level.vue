<template>
  <!-- chenwei8.9  -->
  <f7-page>
    <div class='level-box'>
      <div class='level-header'>
        <div class='left'>
          <router-link class='left-box' to="/">
            <img class='go-back' src="../../static/images/jiantou.png" alt="">
          </router-link>
        </div>
        <div class='center'>GAME LEVEL</div>
        <div class='right'></div>
      </div>

      <div class='level-content'>
        <div class='user-img'>
          <img class='imgs-picture' :src="getUserImg" alt="">
          <div class='user-level'>LV: {{getCurrentLevel}}</div>
        </div>
      </div>

      <div class='level-progress'>
        <el-progress :percentage='getLevelProcess' :text-inside="true" :show-text='false'></el-progress>
        <div class='progress-contents'>
          <div class='left content-size'>LV: {{getCurrentLevel}}</div>
          <div class='center content-size'>{{getUserLevelExp}}/{{getUserLevelTotalExp}}</div>
          <div class='right content-size'>LV: {{getCurrentLevel + 1}}</div>
        </div>
      </div>

      <div class='level-lists'>
        <div class='group-lists'>
          <h3 class='list-title'>What's Game Level ?</h3>
          <p class='list-content'>1.等级游戏可以彰显你的游戏技术,能够吸引跟多的关注.</p>
        </div>

        <div class='group-lists'>
          <h3 class='list-title'>How to upgrade ?</h3>
          <p class='list-content'>1.玩游戏就可以增加Exp提高等级.</p>
          <p class='list-content'>2.登上游戏排行榜可以获取大量Exp用来提升等级.</p>
        </div>
      </div>
    </div>
  </f7-page>
</template>

<script>
export default {
  name: 'Level',

  data(){
    return {
      
    }
  },

  //chenwei8.9 计算属性
  computed:{
    getCurrentLevel(){
      return this.$store.getters.getUserLevel();
    },

    getUserLevelExp(){
      return this.$store.getters.getUserLevelExp();
    },

    getUserLevelTotalExp(){
      return this.$store.getters.getUserLevelTotalExp();
    },

    getUserImg(){
      return this.$store.getters.getUserImg();
    },

    getLevelProcess(){
      return this.$store.getters.getLevelProcess();
    },
  },

  mounted(){

  },

  methods:{
    
  }
}
</script>

<style lang='scss'>
  .level-box{
    padding: 20px 20px 0px;
    .level-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 400;
      .left{
        width: 15%;
        .left-box{
          display: flex;
          align-items: center;
          justify-content: start;
          .go-back{
            width: 5vw;
          }
        }
        .fa-long-arrow-left:before{
          font-size: 7vw;
          color: #000;
        }
      }
      .center{
        font-weight:  400;
        color: #000;
        font-size: 4vw;
        font-family: 'DroidSans';
      }
      .right{
        width: 15%;
      }
    }

    .level-content{
      padding: 6vw 0px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .user-img{
        .imgs-picture{
          width: 12vw;
          height: 12vw;
          border-radius: 50%;
        }
        .user-level{
          text-align: center;
          font-weight: 400;
          color: #000;
          font-size: 3vw;
          margin-top: 1vw;
          font-family: 'DroidSans';
        }
      }
    }

    .level-progress{
      .progress-contents{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 2vw; 
        .content-size{
          font-size: 3vw;
          font-family: 'DroidSans';
        }
      }
    }

    .level-lists{
      margin-top: 10vw;
      border-top: 1px solid #000;  
      .group-lists{
        .list-title{
          font-size: 4vw;
          font-family: 'DroidSans';
          font-weight: 400;
        }
        .list-content{
          font-size: 3vw;
          margin: 1vw 0vw;
          font-family: 'DroidSans';
        }
      }
    }
  }
</style>

