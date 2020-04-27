<template>
    <f7-page>
        <f7-navbar no-shadow class="navbar" style="background: white!important;">
            <f7-nav-left >
                <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
                    <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
                </f7-link>
            </f7-nav-left>
            <f7-nav-title class="home-title"> POINTS MALL</f7-nav-title>
            <f7-nav-right>
                <img src="static/images/head_icon.png" style="width: 56px;height: 56px"/>
            </f7-nav-right>
        </f7-navbar>

        <f7-list class="list-block" style="margin-left:8px;margin-right: 8px;padding-top: 20px">
            <transition name="fade">
                <div class="row text-align-center " style="width: 100%;border: 0px" v-show="lazyLoad">
                    <div class="col-100" style="border: 0px">
                        <div class="preloader"></div>
                    </div>
                </div>
            </transition>
            <div ref="nocontent" style="display: none;width: 100%;">
            <f7-col style="width: 100%;border-width: 0px;">
                <img src="static/images/nocontent.png" style="width: 214px;height: 212px;margin-top: 36px;">
            </f7-col>
            <f7-col style="width: 100%;border-width: 0px;margin-top: 24px;">
                <a style="color: #999;font-size: 14px;">NO DATA</a>
            </f7-col>
            <f7-col style="width: 100%;border-width: 0px;margin-top: 10px;">
                <a style="color: #999;font-size: 14px;">CHECK YOUR NET</a>
            </f7-col>
            </div>
            <div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between">
                <div style="width: 33.33%;height: auto;padding: 0px;" v-for="(item,index) in productArray"
                     :key="index">
                    <div style="margin: 6px 6px">
                        <integral-item :data="item" @item_buy_click="itemBuyClick"/>
                    </div>
                </div>
            </div>
        </f7-list>
    </f7-page>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    export default {
        data () {
            return {
                productArray:[],
                commodityProductArray:[],
                typeName:null,
                lazyLoad:true,
            }
        },

        methods:{
            ...mapMutations(['setHeadPortraitFrame','setTotalCredit','setMyPortraitFrame']),
            getShops() {
                const self = this
                self.productArray = this.$store.getters.getHeadPortraitFrameArray()
                if(self.productArray==null){
                    self.$refs.nocontent.style.display="block"
                    return
                }
                self.$refs.nocontent.style.display="display"
                for (let i = 0; i < self.productArray.length; i++) {
                    var product = self.productArray[i]
                    console.log(product.id)
                    // 添加type参数 1,表示已拥有；0,表示未拥有；2，表示已佩戴
                    if (self.commodityProductArray.includes(product.id)) {
                        console.log(1)
                        self.$set(product, "type", 1);
                    } else {
                        self.$set(product, "type", 0);
                    }
                    self.$set(self.productArray, i, product)
                }
                let mineInfo = self.$dataManager.getMyself();
                for (let product of self.productArray) {
                    if (product.id == mineInfo.headPortraitFrame) {
                        product.type = 2
                    }
                }
            },

            getProductStatus(){
                console.log("getProductStatus")
                const self=this
                var msg = Request.up.get_user_commodity.create({
                    _name:'head_portrait_frame'
                });
                var buf = Request.up.get_user_commodity.encode(msg).finish();
                self.$websocket.send(Types.MsgEnum.get_user_commodity, buf).then((msg) => {
                        console.log(" get_user_commodity success");
                        // 登陆成功返回
                        var resp = Response.down.get_user_commodity.decode(msg);
                        self.commodityProductArray=resp._id_list
                        console.log(resp._id_list);
                        self.getShops()
                    },
                    (msg) => {
                        // 请求失败
                        console.log(msg.message)
                        console.log("000000000000000")
                    });
            },

            itemBuyClick: function (product) {
                console.log("downLoadIntegral")
                console.log(product.type)
                const self = this
                let mineInfo = self.$dataManager.getMyself();
                if (product.type == 1) {
                    if(mineInfo.totalCredit<product.cost_num){
                        self.toastWarn = self.$f7.toast.create({
                            text: 'Your bonus points are insufficient to buy it now!',
                            position: 'center',
                            closeTimeout: 3000,
                        });
                        // Open it
                        self.toastWarn.open();
                    }
                    //积分兑换头像
                    var msg = Request.up.commodity_trading.create({
                        _id: product.id,
                        _cost_type: product.cost_type,
                        _cost_num: product.cost_num,
                    });
                    var buf = Request.up.commodity_trading.encode(msg).finish();
                    self.$websocket.send(Types.MsgEnum.commodity_trading, buf).then((msg) => {
                            console.log(" commodity_trading success");
                            // 登陆成功返回
                            var resp = Response.down.commodity_trading.decode(msg);
                            mineInfo.totalCredit = mineInfo.totalCredit - product.cost_num
                            //self.setTotalCredit(costNum)
                            product.type = 1
                            self.sendBuyHead(product.id,);
                        },
                        (msg) => {
                            // 请求失败
                            console.log("商品交易出现异常")
                            product.type = 0
                            var index=self.productArray.indexOf(product)
                            self.$set(self.productArray,index,product);
                        });
                } else if (product.type == 2) {

                    let shopObj = self.$store.getters.getShopObj()
                    if(null!=shopObj){
                        self.typeName=shopObj[0].name
                    }
                    //佩戴
                    var msg = Request.up.set_user_commodity.create({
                        _name: self.typeName,
                        _id: product.id,
                    });
                    var buf = Request.up.set_user_commodity.encode(msg).finish();
                    self.$websocket.send(Types.MsgEnum.set_user_commodity, buf).then((msg) => {
                            console.log(" set_user_commodity success");
                            // 登陆成功返回
                            var resp = Response.down.set_user_commodity.decode(msg);
                            for (let prod of self.productArray) {
                                if(prod.type==2){
                                    prod.type=1
                                }
                            }
                            product.type = 2
                            console.log(product.type);
                            var index=self.productArray.indexOf(product)
                            self.$set(self.productArray,index,product);
                            self.setHeadPortraitFrame(resp._id)
                            self.setMyPortraitFrame(product)
                            self.$EventBus.$emit("changeHead",{
                                    image:product.image,
                                });

                            self.toastWarn = self.$f7.toast.create({
                                text: 'Decoration succeeded',
                                position: 'center',
                                closeTimeout: 3000,
                            });
                            // Open it
                            self.toastWarn.open();
                            self.sendAdornHead(product.id,);
                        },
                        (msg) => {
                            // 请求失败
                            //console.log("商品佩戴出现异常!")
                            self.toastWarn = self.$f7.toast.create({
                                text: 'Decoration error!',
                                position: 'center',
                                closeTimeout: 3000,
                            });
                            // Open it
                            self.toastWarn.open();
                            product.type = 1
                            var index=self.productArray.indexOf(product)
                            self.$set(self.productArray,index,product);
                        });
                }
            },

            goBack(){
                console.log("go back")
                this.$f7router.back()
            },

            sendBuyHead(id) {
                // console.log("每个头像的购买次数");
                let userId = this.$dataManager.getMyselfId();
                var param = {'label': userId,'value':id};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Buy_head", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },

            sendAdornHead(id) {
                // console.log("每个头像的佩戴次数");
                let userId = this.$dataManager.getMyselfId();
                var param = {'label': userId,'value':id};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Adorn_head", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            },
        },
        mounted(){
            console.log("mounted")
            const self=this
            setTimeout(function () {
                if (self && !self._isDestroyed) {
                    self.lazyLoad = false
                    self.getProductStatus()
                }
            },500)
        },
        created() {
            console.log("created")
            // this.getProductStatus()
        },
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
        padding: 0px;
        margin: 8px;
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        flex-wrap:wrap;
    }
    .role-info{
        width: 100%;
        height: 198px;
    }
    .line-div{

    }
    .top1{
          margin-top: 30px;
      }
    .top2{
        margin-top: 10px;
    }
    .label{
        width: 80px;
        white-space:nowrap;
        alignment: center;
        display:block;
        text-align:center;
        font-size: 12px;
        height: 16px;
        color: black;
        overflow:hidden;
        text-overflow:ellipsis;
    }

    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .6s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }
    .no-recom{
        width: 100%;
        height: 90%;
    }

    .pk-view-container{
        align-items: center;
        margin-top:0%;
        position:relative;
        width: 100%!important;
    }

    .text-title{
        width: 20%!important;
        height: 100%;
        margin-left: 40%!important;
        position:absolute;
        z-index:21!important;
        background: transparent;
        text-align:center;
        font-size: 20px!important;
        color: white!important;
    }

</style>
