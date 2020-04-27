<template>
    <div class="img-sel-div div-parent">
        <!--<img v-bind:src="defSelImg"  id="headImg" class ="item" refs="img"  @click="imgClick(i)"/>-->
        <img src="static/images/add_head_icon.png"  class ="item" id="headImg0" refs="img0" @click="imgClick(0)"/>
        <template v-if="imgUrls!=null">
        <img v-bind:src="imgUrls[0]" class="item" id="headImg1" refs="img1" @click="imgClick(1)" v-show="imgCount>0"/>
        <img v-bind:src="imgUrls[1]" class="item" id="headImg2" refs="img2" @click="imgClick(2)" v-show="imgCount>1"/>
        <img v-bind:src="imgUrls[2]" class="item" id="headImg3" refs="img3" @click="imgClick(3)" v-show="imgCount>2"/>
        <!--<img v-bind:src="imgUrls[3]" class="item" id="headImg4" refs="img4" @click="imgClick(4)" v-show="imgCount>3"/>-->
        </template>
    </div>
</template>

<script>
	export default {
		name: "imgSelectItem",
		props: {
            maxImg:{
                type:Number,
                default:1
            },
            imgUrls:{
                type:Array,
                default:null
            },
        },

        data() {
            return {
                canClick:true,
                imgCount:0,
                defSelImg:"./static/images/shouji.png",
            }
        },
        computed: {
        },
        mounted(){
            const self=this
            var html = '';
            // for (var i = 0; i < self.maxImg; i++) {
            //     html += '<img v-bind:src="'+self.defSelImg+'" '+' class ="item"'+' id="'+'headImg'+i+'"'+' refs="img'+i+'"'+'@click="imgClick('+i+')"/> ';
            // }
            // // Append new items
            // self.$$('.div-parent').append(html);
        },
        methods: {
            setImgSrc(img){

            },
            imgClick(index){
                const self=this
                if(index==0&&self.canClick){
                    self.$emit('selectImg',index);
                }else {
                    self.$emit('selectImg',index);
                }
                console.log(index)
            },
            changeState(){
                console.log("改变状态...")
                const self=this
                if(null!=self.imgUrls){
                    self.imgCount=self.imgUrls.length
                    if(self.imgCount==4){
                        self.canClick=false;
                    }
                }
            },
        },
        watch:{
            'imgUrls':'changeState'
        }
	}
</script>

<style scoped>

    .img-sel-div {
        display: -webkit-flex; /* Safari */
        display: flex;
        flex-direction: row;
        justify-content:flex-start;
        /*background: red;*/
    }

    .item{
        width: 60px;
        height: 60px;
        margin-left: 10px
    }
</style>
