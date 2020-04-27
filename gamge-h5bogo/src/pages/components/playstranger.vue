<template>
  <a href="/discovery/" class="link display-block">
    <div no-shadow no-border style="background-image:url('static/images/bg_main_red.png'); padding-top: 46%; background-position: center; background-size: cover;">
      <div style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
        <div class="row" style="padding: 11% 15%">
          <div class="col-30">
            <img src="static/images/morentou.png" style="width: 90%">
          </div>
          <div class="col-65" style="text-align: left">
            <div style="color: #ffffff; font-weight: bold; font-size: 2vh">DISCOVER</div>
            <div style="color: #ffffff; font-weight: normal; font-size: 1.2vh">WITH FRIENDS</div>
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
  export default {
    name: "PlayStranger",
    data(){
      return{
        wemeetList:[
          {
            _uid:"Asa",
            _headIcon:"./static/images/temphead01.png"
          },
          {
            _uid:"Alex",
            _headIcon:"./static/images/temphead02.png"
          },
          {
            _uid: "Leon",
            _headIcon: "./static/images/temphead03.png"
          }
        ],
        isFlip : false
      }
    },

    props: {
      isFreshData: Boolean,
    },

    watch:{
      isFreshData: function () {
        this.isFlip = this.isFreshData;
      }
    },

    methods:{
      delayTime(i){
        return i*2+"00ms";
      }
    }
  }
</script>

<style scoped>

</style>
