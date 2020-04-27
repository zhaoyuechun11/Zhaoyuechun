<template>
    <f7-page>
        <f7-navbar no-shadow title="邀请好友" back-link="Back"></f7-navbar>

        <div class="gain-friend" style="padding-top: 80%">
            <a style="color: #999999">-通过以下方式邀请-</a>
            <div style="margin-top: 6px" class="fb-btn">
                <img v-bind:src="headImag" style="width: 20px;height: 20px;border-radius: 10px">
                <a style="margin-left: 8px;color:white;font-size: 12px">WHATSAPP</a>
            </div>
            <div style="margin-top: 6px;background: white" class="fb-btn">
                <div  class="fb-btn" style="width: 50%;background: #0084FF">
                    <img v-bind:src="headImag" style="width: 20px;height: 20px;border-radius: 10px">
                    <a style="margin-left: 8px;color:white;font-size: 12px">FACEBOOK</a>
                </div>
                <div  class="fb-btn" style="width: 50%;margin-left: 10px;background: #FF00B4">
                    <img v-bind:src="headImag" style="width: 20px;height: 20px;border-radius: 10px">
                    <a style="margin-left: 8px;color:white;font-size: 12px">INSTAGRAM</a>
                </div>
            </div>
        </div>

    </f7-page>
</template>

<script>
    export default {
        name: "test",
        data () {
            return {
                headImag:this.$store.state.userInfo.headImg,
                sites: [
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] }
                ]
            }
        }
    }
</script>

<style scoped>
    div[class*="col"] {
        background: #fff;
        text-align: center;
        color: #000;
        border: 1px solid #ddd;
        padding: 0px;
        margin-bottom: 0px;
        font-size: 12px;
    }

    .list-block{
        background: white;
        padding: 0px;
        margin: 8px;
    }
    .gain-friend{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
    }
    .fb-btn{
        background: #189D0E;
        width: 70%;
        height: 40px;
        border-radius: 4px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items: center;
        justify-content:center
    }
</style>
