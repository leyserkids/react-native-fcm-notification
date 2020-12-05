package com.grapecity.leyserkids.reactnativefcmnotification

import android.util.Log
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.google.android.gms.tasks.OnCompleteListener

import com.google.firebase.messaging.FirebaseMessaging


class FIRMessagingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val TAG = FIRMessagingModule::class.java.canonicalName

    override fun getName(): String {
        return "RNFIRMessaging"
    }

    @ReactMethod
    fun getToken(promise: Promise) {
        try {
            FirebaseMessaging.getInstance().token.addOnCompleteListener(OnCompleteListener { task ->
                if (!task.isSuccessful) {
                    Log.w(TAG, "Fetching FCM registration token failed", task.exception)
                    promise.reject(null, "Failed to get Token")
                    return@OnCompleteListener
                }

                val token = task.result

                Log.d(TAG, "FCM registration token: $token")
                promise.resolve(token)
            })

        } catch (e: Throwable) {
            e.printStackTrace()
            promise.reject(null, e.message)
        }
    }

}
