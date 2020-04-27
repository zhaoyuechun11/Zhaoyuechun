<template>
    <f7-page>
        <f7-navbar no-shadow id="add-friends-bar" style="background: white" class="no-shadow">
            <f7-nav-left >
                <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title class="search-title" >Play With Friends</f7-nav-title>
            <f7-nav-right>
            <img src="static/images/head_icon.png" style="width: 80px;height: 56px"/>
            </f7-nav-right>
        </f7-navbar>

        <div class="search-parent" style="">
            <div class="search-div" v-on:click="goSearch">
                <img src="../static/images/search.png" style="width: 22px;height: 20px;margin-left: 20px"/>
                <a style="color: #999;margin-left: 15px;">SEARCH BY NICKNAME OR ID</a>
            </div>

        </div>

        <f7-link style="display:block;margin-top: 12px;" class="game">
            <div class="add-friends" style="">
                <img src="static/images/bongo_an_fb.png" class="add-friends-img" style="width:42px;height:42px;margin-left: 0px;"/>
                <p style="margin-left: 20px;color: #515151">FACEBOOK FRIENDS</p>
                <input type="button"  style="margin-left: 20px;height: 30px;width: 72px;background: #318DE3;border-radius: 15px;
                border: 1px solid transparent;outline:none;font-size: 6px;color: white" value="BINDING" @click="bindFb"></input>
            </div>
        </f7-link>
        <p class="line-item" style=""/>


        <div class="bind-fb-parent" style="display: none">
            <div class="bind-fb">
                <img src="../static/images/bongo_an_fb.png" style="width: 48px;height: 48px;margin-left: 0px;border-radius: 24px"/>
                <a style="color: #FFFFFF;margin-left: 15px;">Find facebook friends</a>
                <button type="button" class="bind-btn">Invite</button>
            </div>
        </div>

        <div class="tint">
            <a style="color: black"></a>
            <a style="color: #999999;font-size: 12px">Invite friends</a>
        </div>

    </f7-page>
</template>

<script>
    export default {
        name: "test",
        data () {
            return {
                headImag:this.$store.state.userInfo.headImg,
            }
        },

        methods:{
            goSearch(){
                console.log("open search页面")
                this.$f7router.navigate({name: 'SearchFriend'})

            },
            goBack(){
                console.log("go back")
                this.$f7router.back()
            },
            bindFb(){
                console.log("bindFb")
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
    #add-friends-bar{
        background: #FFB200;
    }
    .search-div{
        display: flex;
        display: -webkit-flex;
        width: 90%;
        height: 70%;
        flex-direction: row;
        align-items: center;
        background: #eee;
        border-radius: 24px;

    }
    .search-parent{
        height: 56px;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        align-items:center;
        display:flex;
        display: -webkit-flex;
        justify-content:center
    }

    .bind-fb{
        height: 72px;
        width: 90%;
        background: #3B5999;
        border-radius: 28px;
        align-items:center;
        margin-top: 10px;
        display:flex;
        justify-content:center
    }
    .bind-fb-parent{
        align-items:center;
        display:flex;
        justify-content:center
    }
    .bind-btn{
        width: 50px;
        height: 28px;
        background: #FFB200;
        border: none;
        padding: 0px;
        font-size: 16px;
        color: #FFFFFF;
        border-radius: 4px;
        margin-left: 30px;
    }

    .tint{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items:center;
        margin-top: 20%;
    }
</style>
