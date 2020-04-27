var Utils=(function () {

  function Utils() {
    this.fbBaseUrl="https://platform-lookaside.fbsbx.com/platform/profilepic/?";
    this.tempBaseUrl ="./static/images/";
  }

  Utils.prototype.getHeadImg= function ( headPort ) {
    var fdStart = headPort.startsWith("temphead");
    if(fdStart){
      return tempBaseUrl+headPort
    }else{
      return fbBaseUrl+headPort
    }
  };

  Utils.prototype.getHeadPortraitFrameImage = function (headPortraitFrameArray,userInfo) {
    if ((null != headPortraitFrameArray) && (headPortraitFrameArray.length > 0)) {
      for (let headPortraitFrame of headPortraitFrameArray) {
        if (headPortraitFrame.id == userInfo.headPortraitFrame) {
          return headPortraitFrame.image
        }
      }
    } else {
      return null
    }
  };

}())
export { Utils }
