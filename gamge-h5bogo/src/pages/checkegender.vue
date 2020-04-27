<template>
    <f7-page style="background: transparent !important;">
        <f7-popup style="background: transparent!important;" class="demo-popup" :opened="genderPopupOpened" @popup:closed="genderPopupOpened = false">
            <f7-page style="background: transparent!important;position: relative">

        <div class="absolute-center" style="background: white;width: 300px;height: 220px;border-radius: 4px;background: white">
            <div class=" fitem" style="display: flex;flex-direction: column;align-items: left;">
                    <p style="text-align: center;font-size: 16px;font-weight:bold;"> 性别配对</p>
                    <!--<label class="radio checkitem"  style="margin-top: 0px;" @click="checkGender(0)">-->
                        <!--<input type="radio" name="demo-radio-inline" value="1"  checked>-->
                        <!--<i class="icon-radio" ></i>-->
                        <!--<div class="item-inner" style="margin-left: 16px;">-->
                            <!--<div class="item-title">未知</div>-->
                        <!--</div>-->
                    <!--</label>-->
                    <!--<label class="radio checkitem" @click="checkGender(1)">-->
                        <!--<input type="radio" name="demo-radio-inline" value="2" checked >-->
                        <!--<i class="icon-radio" ></i>-->
                        <!--<div class="item-inner" style="margin-left: 16px;">-->
                            <!--<div class="item-title">女性</div>-->
                        <!--</div>-->
                    <!--</label>-->
                    <!--<label class="radio checkitem" @click="checkGender(2)">-->
                        <!--<input type="radio" name="demo-radio-inline" value="3" checked >-->
                        <!--<i class="icon-radio" ></i>-->
                        <!--<div class="item-inner" style="margin-left: 16px;">-->
                            <!--<div class="item-title">男性</div>-->
                        <!--</div>-->
                    <!--</label>-->


                <f7-radio
                class="checkitem"
                style="margin-top: 0px;"
                name="gender"
                value="unset"
                :checked="gender === 'unset'"
                @change="gender = $event.target.value"
                ><div class="item-inner" style="margin-left: 16px;">
                    <div class="item-title">未知</div>
                    </div>
                </f7-radio>
                <f7-radio
                class="checkitem"
                name="gender"
                value="male"
                :checked="gender === 'male'"
                @change="gender = $event.target.value">
                    <div class="item-inner" style="margin-left: 16px;">
                    <div class="item-title">女性</div>
                    </div>
                </f7-radio>

                <f7-radio
                class="checkitem"
                name="gender"
                value="female"
                :checked="gender === 'female'"
                @change="gender = $event.target.value">
                    <div class="item-inner" style="margin-left: 16px;">
                        <div class="item-title">男性</div>
                    </div>
                </f7-radio>

            </div>


        <f7-button  class="login-btn" style="width: 20%;margin-left: 70%;margin-top: 12px;height: 32px;line-height: 32px;" @click="cancelDia">取消</f7-button>

        </div>

            </f7-page>
        </f7-popup>

    </f7-page>
</template>
<script>
    import { mapMutations } from 'vuex'
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    export default {

        components:{
        },
        data(){
            return{
                sendVal: false,
                loginName:null,
                
                dataManager: this.$store.state.dataManager,
                toastCodeResult: null,
                uid:0,
                client:null,
                localStream:null,
                country:this.$store.getters.getCountry(),
                content: 'get code',   // 按钮里显示的内容
                totalTime: 60,          //记录具体倒计时时间
                canClick: true,  //添加canClick
                phoneNum:0,
                inputWidth:{
                    width:''
                },
                genderPopupOpened:true,
                checked:false,
                gender:this.$store.getters.getPairGender()=='未知'?'unset':this.$store.getters.getPairGender()
            }
        },
        methods:{
            ...mapMutations(['setPairGender']),
            openMask(index){
                this.sendVal = true;
            },

            cancelDia() {
                console.log("type: " + this.gender)
                let self=this;
                if (self && !self._isDestroyed) {
                    setTimeout(() => {
                        if (self && !self._isDestroyed)
                            self.genderPopupOpened = false

                            self.$f7router.back()
                            self.changeEvent()
                    }, 300);
                }
            },

            changeEvent(){
                const self=this
                self.setPairGender(this.gender)
                self.$EventBus.$emit("changeEvent",
                    {
                        gender:self.gender,

                    });

            },
        },
        mounted(){
            const self=this
            self.country=self.$store.getters.getCountry()
            // self.gender=self.$store.getters.getPairGender()
            // self.getHeight()
        },

        watch:{
           'gender':'cancelDia'
        }

    }
</script>
<style scoped>
    .input-txt{
        border:none;
        outline:medium;
        margin-left: 6px;
        height: 38px!important;
        font-size: 16px;
        width:100px;
    }

    .yanzheng{
        /*background-color: #ECEFF6!important;*/
        /*color: #999!important;*/
    }
    .disabled{
        background-color: #ddd;
        border-color: #ddd;
        color:#57a3f3;
    }
    .login-btn{
        margin-top: 10px;
        height: 22px;
        line-height: 22px;
    }

    .absolute-center {
        width: 50%;
        height: 50%;
        overflow: auto;
        margin: auto;
        position: absolute;
        top: 0; left: 0; bottom: 0; right: 0;
    }

    .checkitem{
        margin-left: 20px;
        display:flex;
        flex-direction: row;
        margin-top: 20px;
    }

</style>
