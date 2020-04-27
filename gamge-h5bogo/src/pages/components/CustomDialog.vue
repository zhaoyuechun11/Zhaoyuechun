<template>
    <f7-popup v-if="userInfo" style="background: transparent!important;" class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
        <f7-page style="background: transparent!important;position: relative">
            <div class="Absolute-Center" style="width: 300px;height: 300px;">

                <div style="background: white;display: flex;flex-direction: column;width: 300px;height: 300px;"  class="Absolute-Center">

                    <div style="width: 100%;height: 130px;background:blue;position: relative" id="dialogHead">
                        <img v-bind:src="getUrl(userInfo)" style="width: 90px;height:90px;border:1px solid white;border-radius: 46px;" class="Absolute-Center"/>
                    </div>
                    <!--<div style="height: 20px;background: blue;"></div>-->
                    <a style="color: black;text-align: center;padding-top: 16px;padding-bottom: 10px;">{{userInfo.userName}}</a>
                    <div style="display: flex;flex-direction: row;justify-content: center">
                        <a style="color: black;text-align: center;padding-bottom: 6px;font-size: 16px;">ID:</a>
                        <a style="color: black;text-align: center;padding-bottom: 6px;font-size: 16px;">{{userInfo.userId}}</a>
                    </div>
                    <a style="color: #999;text-align: center;">- 与朋友分享您的bongo名片吧 -</a>
                    <div style="position: relative;height:60px;" >
                        <img src="static/images/bongo_an_fb.png" style="width: 40px;height:40px;" class="Absolute-Center" @click="shareInfo(0)"></img>
                    </div>
                </div>
                <img src="static/images/close_icon.png" style="width: 18px;height:18px;margin-right: 0px;margin-top: 0px;padding: 10px" class="Absolute-Center" @click="closeDialog"/>
            </div>

        </f7-page>
    </f7-popup>
</template>

<script>
	export default {
		name: "ScoreView",
		props: {
            innerImgUrl:{
                type:String,
                default:""
            },
            outerImgUrl:{
                type:String,
                default:""
            },
            gender:{
                type:Number,
                default:0
            }
        },

        data() {
            return {
                innerHide:false,
                outerHide:true,
                innerImg:this.innerImgUrl,
                outerImg:this.outerImgUrl,
                rootWidth:0,
                rootHeight:0,
                maleIcon:'./static/images/male.png',
                femaleIcon:'./static/images/female.png',
                genderIcon:'./static/images/male.png',
                hideGender:true,
            }
        },

        mounted() {
		        //console.log("mounted")
            this.rootWidth=this.$refs.root.style.width;
		        this.rootHeight=this.$refs.root.style.width;
            this.innerImg=this.innerImgUrl;
            this.outerImg=this.outerImgUrl;
            this.getOuterImgUrl()
            let gender=this.gender
            this.getGenderIcon(gender)
        },

        watch:{

            innerImgUrl: {
                deep: true,
                handler(nv, ov) {
                    this.innerImg=nv;
                    this.getInnerImgUrl()
                    this.getOuterImgUrl()
                }
            },

            outerImgUrl:{
                deep: true,
                handler(nv, ov) {
                    this.outerImg=nv;
                    this.getOuterImgUrl()
                }
            },

            gender:{
                deep: true,
                handler(nv, ov) {
                    console.log(nv)
                    this.getGenderIcon(nv)
                }
            },

            outerHide:{
                deep: true,
                handler(nv, ov) {
                    if(nv==false){
                        if(this.rootWidth==0){
                            return
                        }
                        let array=this.rootWidth.split('px')
                        console.log(array[0]*0.8)
                        this.$refs.inner.style.width=array[0]*0.8+'px'
                        this.$refs.inner.style.height=array[0]*0.8+'px'
                        this.$refs.inner.style.border='0px solid white'
                    }else{
                        this.$refs.inner.style.border='2px solid white'
                    }
                }
            },

        },

        methods:{
            getInnerImgUrl(){
                if(null!=this.innerImg&&this.innerImg.length>0){
                    this.outerHide=false
                    return this.innerImg
                }else{
                    this.innerHide=true
                }
            },
            getOuterImgUrl(){
                if(null!=this.outerImg&&this.outerImg.length>0){
                    this.outerHide=false
                    return this.outerImg
                }else{
                    this.outerHide=true
                    //console.log("隐藏外边框")
                    //console.log("隐藏外边框")
                    let array=this.rootWidth.split('px')
                    this.$refs.inner.style.width=(array[0]-4)+"px"
                    this.$refs.inner.style.height=(array[0]-4)+"px"
                    this.$refs.inner.style.border='2px solid white'
                }
            },
            getGenderIcon(nv){
                if(nv==1){
                    //1 为男
                    this.hideGender=false
                    this.genderIcon=this.maleIcon
                }else if(nv==2){
                    //2 为女
                    this.hideGender=false
                    this.genderIcon=this.femaleIcon
                }else{
                    this.hideGender=true
                }
            },
        }
	}
</script>

<style scoped>
    .img-div {
        position:relative;
    }
    .inner-img{
        position:absolute;
        top:0;left:0;right:0;bottom:0;/*在距离父级元素的上下左右各自值之后围成的区域之中进行下面的水平和垂直居中*/
        margin:auto;
        width: 80%;
        height: 80%;
        border-radius: 50%;
    }
    .outer-img{
        position:absolute;
        top:0;left:0;right:0;bottom:0;/*在距离父级元素的上下左右各自值之后围成的区域之中进行下面的水平和垂直居中*/
        margin:auto;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .gender-img{
        position:absolute;
        width: 26%;
        height: 26%;
        margin-left: 74%;
        margin-top: 74%;
        z-index: 60;
    }
</style>
