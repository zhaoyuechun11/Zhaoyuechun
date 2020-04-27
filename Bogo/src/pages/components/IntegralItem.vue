<template>
    <div class="img-div">
        <div class="img-parent">
            <img  class="inner-img" v-bind:src="getInnerImgUrl" data-ratio="1:1"/>
        </div>

        <div style="height: 22px;display:flex;justify-content: center;align-items: center;line-height: 22px;font-size: 8px;color: #515151;">
            <div ref="lab" v-show="!hideLab">{{integral.cost_num}}</div>
            <img ref="labImg" v-bind:src="bcionImg" style="width: 16px;height: 16px;margin-left: 2px;"/>
        </div>
        <input type="button" value="Exchange" style="font-size:10px;border-radius: 13px;margin-top: 6px;" class="download-btn" @click="itemClickBuy" ref="downBtn"/>
    </div>
</template>

<script>
	export default {
		name: "ScoreView",
        props: {
            data:Object,
        },
        // props: ['data'],
        data() {
            return {
                innerHide:false,
                outerHide:false,
                canClick:true,
                integral:this.data,
                ownerImg:'./static/images/owner.png',
                bcionImg:'./static/images/bcoin.png',
                hideLab:false,
            }
        },
        watch:{
            data: {
                deep: true,
                handler(nv, ov) {
                    this.changeBtnStatus()
                }
            }
        },

        mounted() {
            this.integral = this.data;
        },

        computed: {
            getInnerImgUrl(){
                return this.integral.image
            },
            getOuterImgUrl(){
                if(null!=this.outerImgUrl&&this.outerImgUrl.length>0){
                    return this.outerImgUrl
                }else{
                    this.outerHide=true
                }
            },
        },

        methods:{

            itemClickBuy(){
                const self=this
                if((null!=self.integral)&&(self.canClick)){
                    self.canClick=false
                    //console.log("购买")
                    //console.log(self.integral.type)
                    if(self.integral.type==0){
                       self.integral.type=1
                    }else if(self.integral.type==1){
                        self.integral.type=2
                    }else if(self.integral.type==2){
                        return
                    }
                    console.log(self.integral.type)
                    self.changeBtnStatus()
                    self.$emit('item_buy_click',self.integral);
                    setTimeout(function () {
                        self.canClick=true
                    },200);
                }
            },

            changeBtnStatus(){
                const self=this
                console.log("改变按钮状态")
                console.log(self.integral.type)
                if(self.integral.type==0){
                    self.hideLab=false;
                    self.$refs.labImg.src=self.bcionImg;
                    self.$refs.downBtn.value="EXCHANGE";
                    self.$refs.downBtn.style.background="#FF6900";
                }else if(self.integral.type==1){
                    self.hideLab=true;
                    self.$refs.labImg.src=self.ownerImg;
                    self.$refs.downBtn.value="UNEQUIPPED";
                    self.$refs.downBtn.style.background="#BF7948";
                }else if(self.integral.type==2){
                    self.hideLab=true;
                    self.$refs.labImg.src=self.ownerImg;
                    self.$refs.downBtn.value="EQUIPPED";
                    self.$refs.downBtn.style.background="#BF7948";
                }
            }

        },
        mounted(){
            const self=this
            self. changeBtnStatus()
        }

	}
</script>

<style scoped>
    .img-div {
        display: flex;
        display: -webkit-flex;
        -webkit-flex-direction: column;
        flex-direction: column;
        justify-content:center;
        align-items: center;
    }
    .inner-img{
        position:absolute;
        top:10px;
        left:5%;
        width: 90%;
        height:90%;
        border-radius: 45%;
    }

    .download-btn{
        width: 80px;
        border: none;
        height: 26px;
        background: linear-gradient(180deg, #FD3C89, #F95F9D)!important;
        color: white
    }

    .img-parent{
        position:relative;
        width: 100%;
        height:0;
        padding-top:100%;
        border-radius: 50%;
    }
</style>
