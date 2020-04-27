<template>
  <f7-page>

    <f7-navbar no-shadow style="background: transparent">
      <f7-nav-left >
        <f7-link v-on:click="goBack" style="width: 56px;height: 56px;padding-left: 20px;padding-right: 20px;">
          <img  src="static/images/gray_back.png" style="width: 12px;height: 22px;"/>
        </f7-link>
      </f7-nav-left>
      <f7-nav-title> ABOUT US </f7-nav-title>
      <f7-nav-right>
        <f7-link href="/searchfriends/" style="width: 56px;height: 56px;padding-left: 13px;padding-right: 13px;">
          <img src="static/images/add_friend_icon.png" style="width: 22px;height: 20px"/>
        </f7-link>
      </f7-nav-right>
    </f7-navbar>


    <f7-row style="justify-content: center;margin-top: 80px;">
      <img style="width: 90px;height: 90px;" src="static/images/bongo_logo.png"/>
    </f7-row>
    <f7-row style="justify-content: center;margin-top: 26px;">
      <div style="font-size: 18px;font-weight: bold">Bongo</div>
    </f7-row>
    <f7-row style="justify-content: center;margin-top: 2px;">
      <div>{{versionNumber}}</div>
    </f7-row>
  </f7-page>
</template>
<script>
  import { f7Page, f7Navbar, f7BlockTitle, f7Block, f7Row, f7Col } from 'framework7-vue';

  export default {
      data (){
          return {
              versionNumber:"1.0.0"
          }
      },
      mounted(){
          const self=this
          if ( self.$config.deviceName !== "browser"){
              cordova.getAppVersion.getVersionNumber(function (version) {
                  console.log(version)
                  self.versionNumber=version
              });
          }

      },
  };
</script>
