package com.grapecity.leyserkids.reactnativefcmnotification

import android.annotation.TargetApi
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.res.Resources
import android.graphics.drawable.AdaptiveIconDrawable
import android.graphics.drawable.Drawable
import android.media.RingtoneManager
import android.os.Build
import android.os.Bundle
import android.util.Log
import androidx.core.app.NotificationCompat

class NotificationBuilder(context: Context) {
    private val mContext = context;
    private var mMetadata = Bundle.EMPTY;

    init {
        mMetadata =  getManifestMetadata()
    }

    fun sendNotification(messageTitle: String, messageBody: String) {
        val intent = Intent(mContext, FIRMessagingService::class.java)
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP)
        val pendingIntent = PendingIntent.getActivity(mContext, 0 /* Request code */, intent,
            PendingIntent.FLAG_ONE_SHOT)

        val channelId = getChannelId(mMetadata)
        val defaultSoundUri = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION)
        val notificationBuilder = NotificationCompat.Builder(mContext, channelId)
            .setSmallIcon(getNotificationIcon(mMetadata))
            .setContentTitle(messageTitle)
            .setContentText(messageBody)
            .setAutoCancel(true)
            .setVisibility(NotificationCompat.VISIBILITY_SECRET)
            .setSound(defaultSoundUri)
            .setContentIntent(pendingIntent)
            .setDefaults(NotificationCompat.DEFAULT_ALL)
            .setStyle(NotificationCompat.BigTextStyle().bigText(messageBody))
            .setPriority(NotificationCompat.PRIORITY_MAX)

        val notificationManager = mContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        // Since android Oreo notification channel is needed.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(channelId,
                "fcm_default_channel",
                NotificationManager.IMPORTANCE_HIGH)
            channel.description = "High"
            notificationManager.createNotificationChannel(channel)
        }

        notificationManager.notify(System.currentTimeMillis().toInt(), notificationBuilder.build())
    }

    private fun getManifestMetadata(): Bundle {
        try {
            val info = mContext.packageManager.getApplicationInfo(mContext.packageName, PackageManager.GET_META_DATA)
            if (info.metaData != null) {
                return info.metaData
            }
        } catch (e: PackageManager.NameNotFoundException) {
            Log.w(TAG, "Couldn't get application meta: $e")
        }
        return Bundle.EMPTY
    }

    private fun getChannelId(metadata: Bundle): String {
        try {
            val value = metadata.getString(METADATA_DEFAULT_CHANNEL_ID)
            if (value != null && value.isNotEmpty()) {
                return value
            }
        } catch (e: Exception) {
            Log.w(TAG, "Unable to find channel id in manifest. Falling back to default")
        }

        return FCM_FALLBACK_NOTIFICATION_CHANNEL
    }

    private fun getNotificationIcon(metadata: Bundle): Int {
        var iconId: Int = metadata.getInt(METADATA_DEFAULT_ICON, 0)

        if (iconId == 0 || !isValidIcon(mContext.resources, iconId)) {
            // No icon found so far. Falling back to default App icon (launcher icon).
            try {
                /* flags= */
                iconId = mContext.packageManager.getApplicationInfo(mContext.packageName, 0).icon
            } catch (e: PackageManager.NameNotFoundException) {
                Log.w(TAG, "Couldn't get own application info: $e")
            }
        }

        if (iconId == 0 || !isValidIcon(mContext.resources, iconId)) {
            // Wow, app doesn't have a launcher icon. Falling back on icon-placeholder used by the OS.
            iconId = android.R.drawable.sym_def_app_icon
        }
        return iconId
    }

    /**
     * API 26 contains a bug that causes the System UI process to crashloop (leading the device to
     * trigger a factory resets!) if the notification icon is an adaptive icon with a gradient. More
     * info: b/69969749
     */
    @TargetApi(Build.VERSION_CODES.O)
    private fun isValidIcon(resources: Resources, resId: Int): Boolean {
        // if the fix (ag/2468399) is ever backported to API 26, take SECURITY_PATCH into account.
        return if (Build.VERSION.SDK_INT != Build.VERSION_CODES.O) {
            true
        } else try {
            val icon: Drawable = resources.getDrawable(resId,  /* theme= */null)
            if (icon is AdaptiveIconDrawable) {
                // Adaptive icons without gradients don't cause the crash loop issue but those aren't easy
                // to detect. Thus we reject all adaptive icons.
                // Moreover, an adaptive icon as a notification icon doesn't make sense and won't render
                // properly anyway. (b/69965470#comment10)
                Log.e(TAG, "Adaptive icons cannot be used in notifications. Ignoring icon id: $resId")
                false
            } else {
                true
            }
        } catch (ex: Resources.NotFoundException) {
            Log.e(TAG, "Couldn't find resource $resId, treating it as an invalid icon")
            false
        }
    }

    companion object {
        private const val TAG = "NotificationBuilder"
        private const val METADATA_DEFAULT_ICON = "com.google.firebase.messaging.default_notification_icon"
        private const val METADATA_DEFAULT_CHANNEL_ID = "com.google.firebase.messaging.default_notification_channel_id"
        private const val FCM_FALLBACK_NOTIFICATION_CHANNEL = "fcm_fallback_notification_channel"
        private const val FCM_FALLBACK_NOTIFICATION_CHANNEL_LABEL = "fcm_fallback_notification_channel_label"
    }
}
