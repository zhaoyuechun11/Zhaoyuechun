<template>
  <a href="/friends/" class="link display-block">
    <div no-shadow no-border style="background-image:url('static/images/bg_main_blue.png'); padding-top: 46%; background-position: center; background-size: cover;">
        <div style="position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">
            <div class="row" style="padding: 11% 15%">
                <div class="col-30">
                    <img src="static/images/home_entry_heart.png" style="width: 90%">
                </div>
                <div class="col-65" style="text-align: left">
                    <div style="color: #ffffff; font-weight: bold; font-size: 2vh">PLAY</div>
                    <div style="color: #ffffff; font-weight: normal; font-size: 1.2vh">WITH FRIENDS</div>
                </div>
            </div>
        </div>
    </div>
  </a>
</template>

<script>
  export default {
    name: "PlayFriend",
    props: {
      isFreshData: Boolean,
    },
    data() {
      return {
        isFlip : false
      }
    },

    watch:{
      isFreshData: function () {
        this.isFlip = this.isFreshData;
      }
    },
  }
</script>

<style scoped>


</style>
