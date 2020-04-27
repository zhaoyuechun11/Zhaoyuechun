<template>
    <div class="img-div" ref="root">
        <img  ref="inner" class="inner-img" v-bind:src="innerImg"/>
        <img  class="outer-img" v-bind:src="outerImg" v-show="!outerHide" />
        <img v-bind:src="genderIcon" class="gender-img" v-show="!hideGender"/>
    </div>
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
                outerHide:true,
                innerImg:this.innerImgUrl,
                outerImg:this.outerImgUrl,
                maleIcon:'./static/images/male.png',
                femaleIcon:'./static/images/female.png',
                genderIcon:'./static/images/male.png',
                hideGender:true,
            }
        },

        mounted() {
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
                    // if(nv==false){
                    //     if(this.rootWidth==0){
                    //         return
                    //     }
                    //     let array=this.rootWidth.split('px')
                    //     console.log(array[0]*0.8)
                    //     this.$refs.inner.style.width=array[0]*0.8+'px'
                    //     this.$refs.inner.style.height=array[0]*0.8+'px'
                    //     this.$refs.inner.style.border='0px solid white'
                    // }else{
                    //     this.$refs.inner.style.border='2px solid white'
                    // }
                }
            },

        },

        methods:{
            getInnerImgUrl(){
                // if(null!=this.innerImg&&this.innerImg.length>0){
                //     return this.innerImg
                // }
            },

            getOuterImgUrl(){
                if(null!=this.outerImg&&this.outerImg.length>0){
                    this.outerHide=false
                    return this.outerImg
                }else{
                    this.outerHide=true
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
        width: 100%;
        height: 100%;
    }

    .inner-img{
        position:absolute;
        top:0px;
        left:0px;
        right:0;
        bottom:0;
        margin:auto;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #ED9A00;
    }

    .outer-img{
        position:absolute;
        top:0;
        left:-25%;
        right:0;
        bottom:0;
        margin:auto;
        width: 150%;
        height: 150%;
        border-radius: 50%;
    }

    .gender-img{
        position:relative;
        width: 26%;
        height: 26%;
        margin-left: 74%;
        margin-top: 74%;
        z-index: 60;
    }
</style>
