package org.apache.cordova.agoravoice;

import android.app.Activity;
import android.content.Context;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.RtcEngine;
public class VoicePlugin extends CordovaPlugin {

    private static final String JOINCHANNEL="voiceChat";
    private static final String MUTELOCALAUDIOSTREAM="muteLocalAudioStream";
	private static final String MUTEREMOTEAUDIOSTREAM="muteRemoteAudioStream";
    private static final String LEAVECHANNEL="leaveChannel";
    private static final String DESTROY="destroy";
    private static final int PERMISSION_REQ_ID_RECORD_AUDIO = 22;
    private static final String LOG_TAG = VoicePlugin.class.getSimpleName();
    // 0表示离线；1表示禁麦
    private CallbackContext RtcEngineCallback;
    private RtcEngine mRtcEngine;

    @Override
    public boolean execute(String action, final JSONArray args, final CallbackContext callbackContext){
        if (JOINCHANNEL.equals(action)) {
                cordova.getThreadPool().execute(new Runnable() {
                @Override
                public void run() {
                    voiceChat(args,callbackContext);
                }
            });
            return true;
        }else if(MUTELOCALAUDIOSTREAM.equals(action)){
            this.muteLocalAudioStream(args,callbackContext);
            return true;
        }else if(LEAVECHANNEL.equals(action)){
            this.leaveChannel();
            return true;
        }else if(DESTROY.equals(action)){
            this.destroy();
            return true;
        }else if(MUTEREMOTEAUDIOSTREAM.equals(action)){
            this.muteRemoteAudioStream(args,callbackContext);
            return true;
        }
        return false;
    }

    private void leaveChannel(){
        if(null!=mRtcEngine){
            mRtcEngine.leaveChannel();
        }
    }

    private void destroy(){
        RtcEngine.destroy();
        mRtcEngine = null;
    }

    //禁止向对方发送信息
    private void muteLocalAudioStream(JSONArray args, CallbackContext callbackContext){
        try {
            Boolean select=args.getBoolean(0);
            int id =mRtcEngine.muteLocalAudioStream(select);
            if(id==0){
                callbackContext.success();
            }else{
                callbackContext.error(id);
            }
        } catch (JSONException e) {
            callbackContext.error(e.getMessage());
            e.printStackTrace();
        }
    }

	    //禁止接收对方发送来的信息
    private void muteRemoteAudioStream(JSONArray args, CallbackContext callbackContext){
        try {
            Boolean select=args.getBoolean(0);
            int uid=args.getInt(1);
            int id = mRtcEngine.muteRemoteAudioStream(uid, select);
			Log.i("test","muteRemoteAudioStream  uid: "+uid+" select: "+select);
            if(id==0){
                callbackContext.success();
            }else{
                callbackContext.error(id);
            }
        } catch (JSONException e) {
            callbackContext.error(e.getMessage());
            e.printStackTrace();
        }
    }
	
    public void voiceChat(JSONArray args, CallbackContext callbackContext) {
        initAgoraEngineAndJoinChannel(args, callbackContext);
    }

    private void initAgoraEngineAndJoinChannel(JSONArray args,CallbackContext callbackContext) {
        Log.i(LOG_TAG,"initAgoraEngineAndJoinChannel ");
        // Tutorial Step 1
        initializeAgoraEngine(callbackContext);
        // Tutorial Step 2
        joinChannel(args);
    }

    // Tutorial Step 2
    private void joinChannel(JSONArray args) {
            Log.i(LOG_TAG,"args: "+args);
        try {
            String token=args.getString(0);
            String channel=args.getString(1);
            String extraString=args.getString(2);
			int uid=args.getInt(3);
            Log.i(LOG_TAG,"token: "+token+" channel: "+channel+" extraString: "+extraString);
            // if you do not specify the uid, we will generate the uid for you
            mRtcEngine.joinChannel(token, channel, extraString, uid);
        } catch (JSONException e) {
            Log.e(LOG_TAG, "joinChannel failure!");
            e.printStackTrace();
        }

    }

    private final IRtcEngineEventHandler mRtcEventHandler = new IRtcEngineEventHandler() {

        //status  0为离线;1为关闭麦克风;2为加入频道成功
        @Override
        public void onUserOffline(final int uid, final int reason) { // Tutorial Step 4
            Log.i(LOG_TAG,"onUserOffline  uid: "+uid+"reason: "+reason);
            if(null!=RtcEngineCallback){
                JSONObject obj = new JSONObject();
                try {
                    obj.put("status",0);
                    obj.put("uid",uid);
                    obj.put("reason",reason);
                    RtcEngineCallback.success(obj);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }

        }

        @Override
        public void onUserMuteAudio(final int uid, final boolean muted) { // Tutorial Step 6
            Log.i(LOG_TAG,"onUserMuteAudio  uid: "+uid+"muted: "+muted);
            if(null!=RtcEngineCallback){
                JSONObject obj = new JSONObject();
                try {
                    obj.put("status",1);
                    obj.put("uid",uid);
                    obj.put("muted",muted);
                    RtcEngineCallback.success(obj);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }

        @Override
        public void onError(int err) {
            super.onError(err);
            Log.i(LOG_TAG,"onError: "+err);
			if(null!=RtcEngineCallback){
                JSONObject obj = new JSONObject();
                try {
                    obj.put("status",3);
                    obj.put("err",err);
                    RtcEngineCallback.success(obj);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }

        @Override
        public void onJoinChannelSuccess(String channel,int uid,int elapsed ){
            Log.i(LOG_TAG,"onJoinChannelSuccess: "+channel);
			if(null!=RtcEngineCallback){
                JSONObject obj = new JSONObject();
                try {
                    obj.put("status",2);
                    obj.put("uid",uid);
                    obj.put("channel",channel);
                    RtcEngineCallback.success(obj);
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }
    };

    private void initializeAgoraEngine(CallbackContext callbackContext) {
        try {
            Log.i(LOG_TAG,"initializeAgoraEngine ");
            RtcEngineCallback=callbackContext;
            Activity activity = cordova.getActivity();
            String appId=activity.getString(getStringId(activity.getApplication(),"agora_app_id"));
            Log.i(LOG_TAG,"initializeAgoraEngine  appId: "+appId);
            mRtcEngine = RtcEngine.create(activity.getApplication().getBaseContext(), appId, mRtcEventHandler);
        } catch (Exception e) {
            if(null!=RtcEngineCallback){
                RtcEngineCallback.error(e.getMessage());
            }
            Log.e(LOG_TAG, "create Engine failure!");
            Log.e(LOG_TAG, Log.getStackTraceString(e));
            throw new RuntimeException("NEED TO check rtc sdk init fatal error\n" + Log.getStackTraceString(e));
        }
    }

    public int getStringId(Context paramContext, String paramString) {
        return paramContext.getResources().getIdentifier(paramString, "string",
                paramContext.getPackageName());
    }

    private boolean checkSelfPermission(String permission, int requestCode) {
        Log.i(LOG_TAG, "checkSelfPermission " + permission + " " + requestCode);
        if (ContextCompat.checkSelfPermission(cordova.getActivity().getApplication(),
                permission)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(cordova.getActivity(),
                    new String[]{permission},
                    requestCode);
            return false;
        }
        return true;
    }
}
