import Response from '../socket/down.js';
import Request from '../socket/up.js';
import Types from '../socket/types.js';
var timeLabel=['6 months ago','3 months ago','1 month ago','7 days ago','3 days ago','1 days ago'
,'12 hours ago','5 hours ago','1 hours ago','20 mins ago','5 mins ago','3 mins ago','1 mins ago','now'
]
export { timeLabel }

/**
 * 获取token和channel
 * @param websocket
 * @param toUserId
 * @param succesCallBack
 * @param failCallBack
 */
const getTokenAndChannel=function (websocket, toUserId,succesCallBack, failCallBack) {
  const self=this
  let buf = Request.up.voice_single_chat.encode({
    _uid:toUserId,
  }).finish();
  websocket.send(Types.MsgEnum.voice_single_chat, buf).then((msg)=>{
      var chatParams = Response.down.voice_single_chat.decode(msg);
      console.log("获取token: ")
      console.log(chatParams)
      let accessToken = chatParams._access_token
      let _channel_name = chatParams._channel_name
      console.log("get voice_single_chat _access_token: "+accessToken+" _channel_name: "+_channel_name);
      if(succesCallBack!=null){
        succesCallBack(accessToken,_channel_name,"voice chat")
      }
      // self.voiceChat(self.accessToken,_channel_name,"voice chat")
    },
    ()=>{
      // 请求失败
      console.log("get voice_single_chat fail!");
      if(failCallBack!=null){
        failCallBack('get voice_single_chat fail!')
      }
    });
};
export {getTokenAndChannel}

const checkAudioPermission=function (succesCallBack, failCallBack) {
  const self=this
  var permissions = cordova.plugins.permissions;
  permissions.checkPermission(permissions.RECORD_AUDIO, function( status ){
    console.log("checkAudio: "+status.hasPermission)
    if ( status.hasPermission ) {
      if(succesCallBack!=null){
         succesCallBack(true)
      }
    }else {
      if(succesCallBack!=null){
        succesCallBack(false)
      }
      // self.getAudioPermission();
    }
  },function error() {
    console.log("checkAudio: error! ")
    if(failCallBack!=null){
      failCallBack()
    }
    // self.getAudioPermission();
  });
};
export {checkAudioPermission}

const getAudioPermission=function (websocket, toUserId,succesCallBack, failCallBack) {
  const self=this
  var permissions = cordova.plugins.permissions;
  permissions.requestPermission(permissions.RECORD_AUDIO, function success( status ) {
    console.log("getAudioPermission: "+status.hasPermission)
    if(status.hasPermission ){
      getTokenAndChannel(websocket, toUserId,succesCallBack, failCallBack)
    }
    },  function error() {
    console.warn('Camera permission is not turned on');
  });
};
export {getAudioPermission}


const closeMuteAudio=function (flag,uid){
  //静音
  agoravoice.muteLocalAudioStream(flag,function () {
    //静音成功
    console.log('静音成功');
  },function (error) {
    //静音失败
    console.log('静音失败');
    console.log(error);
  })
  //拒绝接收对方语音
  agoravoice.muteRemoteAudioStream({
    state: flag,
    uid: uid,
  },function () {
    //接收语音成功
    console.log('拒绝接收语音成功');
  },function (error) {
    //接收语音失败
    console.log('拒绝接收语音失败');
  })
};
export {closeMuteAudio}

const voiceChat=function(tokem,channel,fromUid,extraString,successCallBack,failCallBack){
  const self=this
  var uid;
  var channel;
  agoravoice.voiceChat({
    token: tokem,
    channel: channel,
    extraString:extraString,
    uid:fromUid
  },function (obj) {
    var status=obj.status
    if(status<3){
      uid=obj.uid
      channel=obj.channel
      if(successCallBack!=null){
        successCallBack(uid,channel)
      }
      console.log('status: '+status+" uid: "+uid+" channel: "+channel);
    }else{
      var err=obj.err
      if(failCallBack!=null){
        failCallBack(err)
      }
      console.log('status: '+status+" err: "+err);
    }

    console.log('语音打开成功');

  },function (error) {
    console.log('语音打开失败');
  })
};
export {voiceChat}





