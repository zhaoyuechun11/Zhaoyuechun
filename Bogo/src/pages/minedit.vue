<template>
    <f7-page>
        <f7-navbar  no-shadow back-link="Back" class="person-nav no-shadow" >
            <f7-nav-title></f7-nav-title>
            <f7-nav-right>
                <div  class="img-div" ref="uedit">
                    <f7-link class="link1">
                        <img src="static/images/fenxiang.png"  id="share_btn"  style="display:none;width:20px;height:20px;padding-left:10px;padding-right:0px;padding-top: 15px;padding-bottom: 15px;"/>
                    </f7-link>
                </div>
            </f7-nav-right>
        </f7-navbar>　
        <div class=" head-view" style="margin-top: -56px;">


            <div class="head-view parent-flex-col" style="position: relative" ></div>
            <div  class="head-name-view" v-on:click.stop="toastImg(0)">
                <score-view class="" style="width: 80px;height: 80px;"  :gender="getGender(userInfo)" :innerImgUrl="getUrl(userInfo)" :outerImgUrl="outerImage" />
                <template v-if="userInfo!=null">
                    <a style="font-size: 16px;color: white;margin-top: 8px;">{{userInfo.userName}}</a>
                </template>
                <template v-else>
                    <a style="font-size: 16px;color: white;margin-top: 8px;">unset</a>
                </template>
            </div>

            <div class="parent-flex-row trans-bg" style="height:40px;justify-content:center;margin-top: 16px;margin-bottom: 20px">
                <div class="parent-flex-col grow-value" style="width: 33.3%" >
                    <template v-if="userInfo!=null">
                        <a style="color: white">{{userInfo.age}}</a>
                    </template>
                    <template v-else>
                        <a style="color: white">unset</a>
                    </template>
                    <img src="static/images/age_icon.png" style="width: 20px;height: 8px;margin-top: 4px;">
                </div>
                <img src="static/images/vline.png" class="info-line" >
                <div class="parent-flex-col grow-value " style="width: 33.3%">
                    <img src="static/images/constedit.png" style="width: 11px;height:13px;margin-top: 4px;margin-bottom: 4px;">
                    <img src="static/images/constell.png" style="width: 86px;height: 8px;margin-top: 4px;">
                </div>
                <img src="static/images/vline.png" class="info-line">
                <div class="parent-flex-col grow-value " style="width: 33.3%">
                    <img src="static/images/location.png" style="width: 11px;height:13px;margin-top: 4px;margin-bottom: 4px;">
                    <img src="static/images/regsion.png" style="width: 40px;height: 8px;margin-top: 4px;">
                </div>
            </div>

            <div style="height: auto;background: white;margin-top: 16px;border-top-left-radius: 12px;border-top-right-radius: 12px;margin: 0px;padding-left: 24px;padding-right: 24px;">
                <f7-list style="background: white" class="info-list">
                <f7-link href="#" style="display:block" class="">
                    <div class="fitem" v-on:click="openNickDia" >
                        <div class="add-friends mine-item" style="margin-top: 0px;border-radius: 0px;margin-left: 0px;background: #FFFFFF;height: 52px;">
                            <a style="height:auto;padding:0px;width:30%;margin-left: 40px;color: #999;text-align: left;">Nickname</a>
                            <div style="height: auto;width:40%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                                <template v-if="userInfo!=null">
                                    <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right;" class="two-line">{{userInfo.userName}}</a>
                                </template>
                                <template v-else>
                                    <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">未设置</a>
                                </template>

                            </div>
                            <img type="button" class="add-btn" style="margin-left:30px;padding: 12px" src="static/images/moregame.png" value="add"  ref="abtn"/>
                        </div>
                    </div>
                </f7-link>
                <p class="line-item" style=""/>

                    <f7-link href="game/1" style="display:block" class="">
                        <div class="fitem" v-on:click="openSign">
                            <div class="add-friends mine-item" style="margin-top: 0px;border-radius: 0px;margin-left: 0px;background: #FFFFFF">
                                <a style="height:auto;padding:0px;width:30%;margin-left: 40px;color: #999;text-align: left;">Signature</a>
                                <div style="height: auto;width:40%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >

                                    <template v-if="userInfo!=null">

                                        <template v-if="userInfo.signature!=null&&userInfo.signature.length>0">
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right;" class="two-line">{{userInfo.signature}}</a>
                                        </template>

                                        <template v-else>
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">nothing</a>
                                        </template>

                                    </template>

                                    <template v-else>
                                        <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">Not added</a>
                                    </template>
                                </div>
                                <img type="button" class="add-btn" style="margin-left:30px;padding: 12px" src="static/images/moregame.png" value="add"  ref="abtn"/>
                            </div>

                        </div>
                    </f7-link>
                    <p class="line-item" style=""/>
                    <f7-link href="game/1" style="display:block" class="">
                        <div class="fitem" v-on:click="openBirth">
                            <div class="add-friends mine-item" style="margin-top: 0px;border-radius: 0px;margin-left: 0px;background: #FFFFFF">
                                <a style="height:auto;padding:0px;width:30%;margin-left: 40px;color: #999;text-align: left;">Birthday</a>
                                <div style="height: 60px;width:40%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                                    <template v-if="userInfo!=null">
                                        <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">{{userInfo.birthday}}</a>
                                    </template>
                                    <template v-else>
                                        <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">Not added</a>
                                    </template>
                                </div>
                                <img type="button" class="add-btn" style="margin-left:30px;padding: 12px" src="static/images/moregame.png" value="add"  ref="abtn"/>
                            </div>

                        </div>
                    </f7-link>
                    <p class="line-item" style=""/>

                    <f7-link href="game/1" style="display:block" class="">
                        <div class="fitem" v-on:click="openSex">
                            <div class="add-friends mine-item" style="margin-top: 0px;border-radius: 0px;margin-left: 0px;background: #FFFFFF">
                                <a style="height:auto;padding:0px;width:30%;margin-left: 40px;color: #999;text-align: left;">Gender</a>
                                <div style="height: 60px;width:40%;display: flex;flex-direction: column;align-items: center;justify-content:center;" >
                                    <template v-if="userInfo!=null">
                                        <template v-if="userInfo.sex==0">
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">unknown</a>
                                        </template>
                                        <template v-else-if="userInfo.sex==1">
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">male</a>
                                        </template>
                                        <template v-else>
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">female</a>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">unknown</a>
                                    </template>
                                    <!--<a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">{{userInfo._user_base_info._sex}}</a>-->
                                </div>
                                <img type="button" class="add-btn" style="margin-left:30px;padding: 12px" src="static/images/moregame.png" value="add"  ref="abtn"/>
                            </div>

                        </div>
                    </f7-link>
                    <p class="line-item" style=""/>


                    <f7-link href="#" style="display:block" class="">
                        <div class="fitem" v-on:click="openJob">
                            <div class="add-friends mine-item"
                                 style="margin-top: 0px;border-radius: 0px;margin-left: 0px;background: #FFFFFF">
                                <a style="height:auto;padding:0px;width:30%;margin-left: 40px;color: #999;text-align: left;">Career</a>
                                <div style="height: 60px;width:40%;display: flex;flex-direction: column;align-items: center;justify-content:center;">
                                    <template v-if="userInfo!=null">
                                        <template v-if="userInfo.job!=null">
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">{{userInfo.job}}</a>
                                        </template>

                                        <template v-else>
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">unknown</a>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">unknown</a>
                                    </template>
                                </div>
                                <img type="button" class="add-btn" style="margin-left:30px;padding: 12px"
                                     src="static/images/moregame.png" value="add"  ref="abtn"/>
                            </div>

                        </div>
                    </f7-link>
                    <p class="line-item" style=""/>

                    <f7-link href="#" style="display:block" class="">
                        <div class="fitem" v-on:click="openHomeLand">
                            <div class="add-friends mine-item"
                                 style="margin-top: 0px;border-radius: 0px;margin-left: 0px;background: #FFFFFF">
                                <a style="height:auto;padding:0px;width:30%;margin-left: 40px;color: #999;text-align: left;">Hometown</a>
                                <div style="height: 60px;width:40%;display: flex;flex-direction: column;align-items: center;justify-content:center;">
                                    <template v-if="userInfo!=null">
                                        <template v-if="userInfo.homeland!=null">
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">{{userInfo.homeland}}</a>
                                        </template>

                                        <template v-else>
                                            <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">Not set</a>
                                        </template>
                                    </template>
                                    <template v-else>
                                        <a style="height:auto;padding:0px;width:100%;margin-left: 40px;color: black;text-align: right">Not set</a>
                                    </template>
                                </div>
                                <img type="button" class="add-btn" style="margin-left:30px;padding: 12px"
                                     src="static/images/moregame.png" value="add"  ref="abtn"/>
                            </div>

                        </div>
                    </f7-link>
                    <p class="line-item" style=""/>
            </f7-list>

            </div >
            <!--<div ></div>-->
        </div>

    </f7-page>
</template>


<script>
    import { mapMutations } from 'vuex'
    import Request from '../socket/up.js';
    import Response from '../socket/down.js';
    import Types from '../socket/types.js';
    import {updateUserInfo,userInfoKey,setHeadPortrait} from '../data/usermanager.js';
    export default {
        name: "test",
        data () {
            return {
                sites: [
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] },
                    { row1: ['Runoob','Google'] }
                ],
                uid:null,

                defHeadaddUrl:'./static/images/head_icon.png',
                userInfo:{},
                gameIds:null,
                selImg:false,
                fileUpLoad: null,
                constellation_list:[
                    "Aquarius","Pisces","Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn"
                ],
                defSelImg:"./static/images/head_icon.png",
                imgHeight:{
                    height:''
                },
                marginTop:{
                    marginTop:''
                },
                toastWarn: null,
                imgUrls:[
                    "./static/images/add_head_icon.png"
                ],
                imgUploadSucc:false,
                outerImage:null
            }
        },
        methods:{
            ...mapMutations(['setUserName','setUserAge']),

            getUrl(userInfo){
                if(null!=userInfo&& null!=userInfo.headPortrait){
                    var headPort=userInfo.headPortrait
                    if(null!=headPort){
                        return this.$store.getters.getHeadImg(headPort)
                    }
                }else {
                    return this.defHeadaddUrl
                }
            },

            getGender(userInfo){
                return userInfo==null?0:this.userInfo.sex
            },
            getPortraitFrame(){
                const self=this
                var portraitFrame = self.$store.getters.getMyPortraitFrame()
                if(null!=portraitFrame){
                    self.outerImage=portraitFrame.image
                }else{
                    self.outerImage=self.defTransImg
                }
            },

            // pGoChat(){
            //     this.$f7router.navigate({name: 'ChatPage'}, {
            //         props: {
            //             toUser : {
            //                 userName: this.uerBaseInfo.userName,
            //                 userId: this.uerBaseInfo.userId,
            //                 userHead: this.uerBaseInfo.headPortrait
            //             }
            //         }
            //     })
            // },
            //
            openNickDia(){
                const self=this
                console.log("openNickDia")
                this.$f7.dialog.prompt('','Your nickname', function (name){
                    self.userInfo.userName=name
                    self.setUserName(name)
                    console.log(name)
                    updateUserInfo(self.$websocket,userInfoKey.name,self.userInfo.userName)
                });
            },
            openBirth(){
                console.log("openBirth")
                const self=this
                var calendarDefault = this.$f7.calendar.create({
                    inputEl: '#demo-calendar-modal',
                    openIn: 'customModal',
                    header: true,
                    footer: true,
                    on: {
                        dayClick:function (calendar, dayEl, year, month, day) {
                            console.log(calendar.getValue())
                            console.log(dayEl)
                            console.log(year+"-"+month+"-"+day)
                            var strtime = year+"-"+(month+1)+"-"+day;
                            self.userInfo.birthday=strtime
                            let ages=self.getAge(year)
                            self.setUserAge(ages)
                            updateUserInfo(self.$websocket,userInfoKey.birthday,self.userInfo.birthday)
                        }
                    }
                });
                calendarDefault.open()

            },
            openSex(){
                console.log("openBirth")
                const self=this
                var dialog=this.$f7.dialog.create({
                    title: 'gender',
                    text: 'please select gender',
                    buttons: [
                        {
                            text: 'male',
                        },
                        {
                            text: ' ',
                        },
                        {
                            text: 'female',
                        },
                    ],
                    verticalButtons: false,
                    onClick:function (dialog, index) {
                        console.log(index)
                        //0 男性，2 女性
                        if(index==0){
                            self.userInfo.sex=1
                        }else if(index==2){
                            self.userInfo.sex=2
                        }else {
                            self.userInfo.sex=0
                        }
                        updateUserInfo(self.$websocket,userInfoKey.sex,self.userInfo.sex)
                    }

                });
                dialog.open();

            },

            openJob(){
                console.log("openJob")
                const self=this
                this.$f7.dialog.prompt('','Your job', function (password) {
                    console.log(password)
                    self.userInfo.job=password
                    updateUserInfo(self.$websocket,userInfoKey.job,self.userInfo.job)
                });
            },
            //
            openHomeLand(){
                console.log("openHomeLand")
                const self=this
                this.$f7.dialog.prompt('','Your hometown', function (password) {
                    console.log(password)
                    self.userInfo.homeland=password
                    updateUserInfo(self.$websocket,userInfoKey.homeland,self.userInfo.homeland)
                });
            },
            //
            openSign(){
                console.log("openSign")
                const self=this
                this.$f7.dialog.prompt('','Your signature', function (password) {
                    console.log(password)
                    self.userInfo.signature=password
                    updateUserInfo(self.$websocket,userInfoKey.signature,self.userInfo.signature)
                });
            },

            getAge(y){
                var today = new Date();//获得当前日期
                var year = today.getFullYear();
                return (year-y)
            },

            toastImg(index){
                console.log("index: "+index)
                const self=this
                //let imgSize=self.imgUrls.length;
                // var param={'user':'head'};
                // if ( this.$config.deviceName !== "browser")
                // {
                //     facebookConnectPlugin.logEvent("Click_center",param,1,function(){
                //         console.log("logEvent success!");
                //     }, function (error) {
                //         //退出失败
                //         console.log("logEvent failure!");
                //         console.log(error.toString());
                //     });
                // }

                var ac1 = this.$f7.actions.create({
                    buttons: [
                        {
                            text: 'Take Photos',
                            onClick: function () {
                                console.log('Button1 clicked')
                                // self.$$('#headImg')[0].src=this.testImg;
                                navigator.camera.getPicture(onSuccess, onFail, {
                                    quality: 90,
                                    destinationType: Camera.DestinationType.DATA_URL,
                                    allowEdit:true,
                                    targetWidth:512,
                                    targetHeight:512,
                                    correctOrientation:true,
                                });

                                function onSuccess(imageData) {
                                    self.selImg=true
                                    console.log(imageData)
                                    self.defSelImg = "data:image/jpeg;base64," +imageData;
                                    // self.loadImg(index,self.defSelImg)
                                    console.log('拍照成功！')
                                    self.userInfo.headPortrait="data:image/jpeg;base64," +imageData;
                                    self.uploadImg()
                                }

                                function onFail(message) {
                                    console.log("拍照失败。")
                                    console.log('Failed because: '+message)
                                    // alert('Failed because: ' + message);
                                }
                            }
                        },
                        {
                            text: 'Choose From Library',
                            onClick: function () {
                                console.log('Button2 clicked')
                                navigator.camera.getPicture(onSuccess, onFail, {
                                    quality: 90,
                                    destinationType: Camera.DestinationType.DATA_URL,
                                    sourceType:Camera.PictureSourceType.SAVEDPHOTOALBUM,
                                    allowEdit:true,
                                    targetWidth:512,
                                    targetHeight:512,
                                    correctOrientation:true,
                                });

                                function onSuccess(imageData) {
                                    self.selImg=true
                                    self.defSelImg = "data:image/jpeg;base64," +imageData;
                                    self.userInfo.headPortrait="data:image/jpeg;base64," +imageData;
                                    self.uploadImg()
                                }
                                function onFail(message) {
                                }
                            }
                        },
                    ],
                    onClick:function (action,index) {
                        console.log(index)
                    },

                }).open()

            },
            // //上传文件
            uploadImg() {
                const self=this;
                self.toastWarn = self.$f7.toast.create({
                    text: 'waiting for uploading',
                    position: 'center',
                    closeTimeout: 2000,
                });
                // Open it
                self.toastWarn.open();
                console.log(self.defSelImg)
                let blob=self.dataURItoBlob(self.defSelImg)
                console.log("blob: size "+blob.size)
                let fileName=self.userInfo._uid+".png"
                setHeadPortrait(self.$websocket,function (url) {
                    console.log("get upload img url: "+url)
                    self.postFile(url,blob,fileName)
                },function (error) {
                    console.log(error)
                })
                self.sendUploadRate()
            },
            postFile(httpUrl, file, fileName) {
                const self = this
                let xhr = new XMLHttpRequest()
                console.log("file: size "+file.size)
                let formData = new FormData()
                formData.append('name', fileName);
                formData.append('file', file);

                // 进度监听
                xhr.upload.addEventListener('progress', (e)=>{console.log(e.loaded / e.total)}, false);
                // 加载监听
                xhr.addEventListener('load', ()=>{console.log("加载中");}, false);
                // 错误监听
                xhr.addEventListener('error', ()=>{
                    console.log("失败")
                    let failToast = self.$f7.toast.create({
                        text: 'upload failure!',
                        position: 'center',
                        closeTimeout: 2000,
                    });
                    // Open it
                    failToast.open();
                }, false);
                xhr.onreadystatechange = function () {
                    console.log(xhr.readyState)
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        let res=xhr.responseText
                        console.log("----------4------------")
                        console.log(res)
                        let jsonString=JSON.parse(res)
                        if (jsonString.errcode == 0) {
                            self.imgUploadSucc = true;
                            var imgUrl=jsonString.url
                            // self.userInfo.headPortrait=imgUrl
                            console.log("headPortrait: "+imgUrl)
                            let successToast = self.$f7.toast.create({
                                text: 'upload success!',
                                position: 'center',
                                closeTimeout: 2000,
                            });
                            // Open it
                            successToast.open();
                        }
                    } else {
                        self.imgUploadSucc = false;

                    }
                }
                xhr.open('post', httpUrl, true)
                xhr.send(formData)
            },
            dataURItoBlob(dataUrl) {
                const binaryString = window.atob(dataUrl.split(',')[1]);
                const arrayBuffer = new ArrayBuffer(binaryString.length);
                const intArray = new Uint8Array(arrayBuffer);
                for (let i = 0, j = binaryString.length; i < j; i++) {
                    intArray[i] = binaryString.charCodeAt(i);
                }
                const data = [intArray];
                return new Blob(data, {type: "image/png"});
            },
            sendUploadRate(){
                // console.log("上传图片上传成功率");
                let userId = this.$dataManager.getMyselfId();
                var param = {'label': 'UserId','value': userId};
                if (this.$config.deviceName !== "browser") {
                    facebookConnectPlugin.logEvent("Click_center_upload", param, 1, function () {
                        console.log("logEvent success!");
                    }, function (error) {
                        //退出失败
                        console.log("logEvent failure!");
                        console.log(error.toString());
                    });
                }
            }
        },
        created:function () {

        },
        destroyed:function(){
            console.log("minedit destroyed")
            if(this.imgUploadSucc){
                this.userInfo.headPortrait=this.defSelImg
            }
        },
        mounted() {
            //获取当前用户个人信息
            const self=this
            var minedit=self.$dataManager.getMyself();
            if(minedit==null){
                return
            }
            self.getPortraitFrame()
            self.userInfo=minedit
            self.uid = minedit.userId
            console.log(self.userInfo)
        },
    }
</script>

<style scoped>
    div[class*="col"] {
        background: transparent;
        text-align: center;
        color: #000;
        border: 0px solid #ddd;
        padding: 0px;
        margin-bottom: 0px;
        font-size: 12px;
    }

    .list-block{
        padding: 0px!important;
        margin: 0px!important;
    }
    .person-nav{
        background:#ED9A00!important;
    }

    .base-info{
        margin-left: 6%;
        z-index:2!important;
        position: absolute;

    }

    .mine-item{
        margin-left: 0px;
        margin-right: 0px;
        /*background: #FFFFFF;*/
    }

    .line{
        background: #000
    }

    .line-item{
        width:90%!important;
        height: 1px!important;
        margin-top: 0px!important;
        margin-bottom: 0px!important;
        background: #eee;
        margin-left: 5%;
    }

    .info-list{
        margin-top: 0px!important;
    }

    .dialog-input{
        placeholder:"sss"!important;
    }
    .row-img{
        display: flex!important;
        display: -webkit-flex!important;
        flex-direction: row;
    }

    .sel-img{
        width: 60px!important;
        height: 60px!important;
    }

    .un-sel-img{
        display: none;
    }

    .two-line{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .person-nav{
        background:transparent!important;
    }
    .img-div{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction: row;
    }

    .head-view{
        background-size: 100% auto;
        background-repeat: no-repeat;
        background-image: url('../static/images/person_head.png');
    }

    .parent-flex-col{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .parent-flex-row{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
    }

    .head-name-view{
        display:flex;
        display: -webkit-flex;
        flex-direction:column;
        align-items: center;
        width: 100px;
        margin-left: 30px;
        margin-top:76px;
        background: transparent;
    }

    .info-line{
        width: 2px;
        height: 100%;
    }

    .grow-value{
        flex-grow:1
    }
    .trans-bg{
        background: transparent;
    }
</style>
