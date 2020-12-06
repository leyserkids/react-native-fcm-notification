package com.grapecity.leyserkids.reactnativefcmnotification

import android.app.ActivityManager
import android.content.Context
import android.os.Build
import android.util.Log
import androidx.core.app.NotificationManagerCompat
import com.facebook.react.bridge.*
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
import com.google.firebase.messaging.FirebaseMessaging


class FIRMessagingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String {
        return "RNFIRMessaging"
    }

    @ReactMethod
    fun getToken(promise: Promise) {
        FirebaseMessaging.getInstance().token
            .addOnSuccessListener { token ->
                Log.d(TAG, "FCM registration token: $token")
                promise.resolve(token)
            }
            .addOnFailureListener {exception ->
                Log.w(TAG, "Fetching FCM registration token failed", exception)
                promise.reject(null, "Failed to get Token: $exception")
            }
    }

    @ReactMethod
    fun isNotificationsEnabled(promise: Promise) {
        var isNotificationsEnabled = NotificationManagerCompat.from(reactApplicationContext).areNotificationsEnabled()
        promise.resolve(isNotificationsEnabled)
    }

    @ReactMethod
    fun isBadgeCounterSupported(promise: Promise) {
        var isSupported = BadgeHelper(reactApplicationContext).isBadgeSupported()
        promise.resolve(isSupported)
    }

    @ReactMethod
    fun isBackgroundRestricted(promise: Promise) {
        var isRestricted = false;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
            val activityManager = reactApplicationContext
                .getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
            isRestricted = activityManager.isBackgroundRestricted
        }
        promise.resolve(isRestricted)
    }

    @ReactMethod
    fun getGooglePlayServiceStatus(promise: Promise) {
        val result: WritableMap = Arguments.createMap()
        val googlePlayApi = GoogleApiAvailability.getInstance()

        val status = googlePlayApi.isGooglePlayServicesAvailable(reactApplicationContext)
        result.putInt("status", status)

        if (status == ConnectionResult.SUCCESS) {
            result.putBoolean("isAvailable", true)
        } else {
            result.putBoolean("isAvailable", false)
            result.putString("error", googlePlayApi.getErrorString(status))
            result.putBoolean("isUserResolvableError", googlePlayApi.isUserResolvableError(status))
            result.putBoolean("hasResolution", ConnectionResult(status).hasResolution())
        }
        promise.resolve(result)
    }

    companion object {
        private const val TAG = "FIRMessagingModule"
    }
}
