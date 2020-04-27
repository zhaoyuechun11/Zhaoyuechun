package org.apache.cordova.cache;

import android.app.Activity;
import android.content.Context;
import android.os.Build;
import android.util.Log;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 * @author Avazu Holding
 */
public class Cache extends CordovaPlugin {

    private static final String GETCACHESIZE="getCacheSize";
    private static final String CLEARCACHE="clearCache";
    private static final boolean IS_AT_LEAST_LOLLIPOP = Build.VERSION.SDK_INT >= 21;
    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        Log.i("test"," execute: action "+action);
        if (action.equals(GETCACHESIZE)) {
            Log.i("test"," getCacheSize ");
            Context context = IS_AT_LEAST_LOLLIPOP ? cordova.getActivity().getWindow().getContext() : cordova.getActivity().getApplicationContext();
            this.getCacheSize(callbackContext,context);
            return true;
        }else if(action.equals(CLEARCACHE)){
			Context context = IS_AT_LEAST_LOLLIPOP ? cordova.getActivity().getWindow().getContext() : cordova.getActivity().getApplicationContext();
            this.clearCache(callbackContext,context);
            return true;
        }
        return false;
    }

    private void getCacheSize(CallbackContext callbackContext,Context context){
            try {
                String totalCacheSize = CacheUtil.getTotalCacheSize(context);
                Log.i("test"," totalCacheSize: "+totalCacheSize);
                if(null!=callbackContext){
                    callbackContext.success(totalCacheSize);
                }
            } catch (Exception e) {
                e.printStackTrace();
                Log.i("test"," getCacheSize: cause "+e.getCause()+" // "+e.getMessage());
                if(null!=callbackContext){
                    callbackContext.error(e.getMessage());
                }
            }
    }


    private void clearCache(CallbackContext callbackContext,Context context){
            CacheUtil.clearAllCache(context);
            if(null!=callbackContext){
                callbackContext.success();
            }
    }
}
