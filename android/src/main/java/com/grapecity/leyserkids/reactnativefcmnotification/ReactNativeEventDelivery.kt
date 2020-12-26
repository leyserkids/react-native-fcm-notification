package com.grapecity.leyserkids.reactnativefcmnotification

import android.content.Context
import android.os.Handler
import android.os.Looper
import androidx.annotation.Nullable
import com.facebook.react.ReactApplication
import com.facebook.react.ReactInstanceManager.ReactInstanceEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter


class ReactNativeEventDelivery(context: Context) {
    private val mContext = context;

    fun sendNotification(title: String) {
        val params: WritableMap = Arguments.createMap()
        params.putString("eventProperty", title)
        sendEvent(NOTIFICATION_EVENT, params)
    }

    private fun sendEvent(eventName: String, @Nullable params: WritableMap) {
        // We need to run this on the main thread, as the React code assumes that is true.
        // Namely, DevServerHelper constructs a Handler() without a Looper, which triggers:
        // "Can't create handler inside thread that has not called Looper.prepare()"
        val handler = Handler(Looper.getMainLooper())
        handler.post {
            // Construct and load our normal React JS code bundle
            val mReactInstanceManager = (mContext.applicationContext as ReactApplication).reactNativeHost.reactInstanceManager
            val context = mReactInstanceManager.currentReactContext
            // If it's constructed, send a notification
            if (context != null) {
                sendEventImpl(context, eventName, params)
            } else {
                // Otherwise wait for construction, then send the notification
                mReactInstanceManager.addReactInstanceEventListener(object : ReactInstanceEventListener {
                    override fun onReactContextInitialized(context: ReactContext) {
                        sendEventImpl(context, eventName, params)
                        mReactInstanceManager.removeReactInstanceEventListener(this)
                    }
                })
                if (!mReactInstanceManager.hasStartedCreatingInitialContext()) {
                    // Construct it in the background
                    mReactInstanceManager.createReactContextInBackground()
                }
            }
        }
    }

    private fun sendEventImpl(reactContext: ReactContext,
                              eventName: String,
                              @Nullable params: WritableMap) {
        reactContext
            .getJSModule(RCTDeviceEventEmitter::class.java)
            .emit(eventName, params)
    }

    companion object {
        private const val NOTIFICATION_EVENT = "notification_received"
    }
}
