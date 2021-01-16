package com.grapecity.leyserkids.reactnativefcmnotification

import android.os.Bundle
import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class FIRMessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        Log.d(TAG, "onMessageReceived From: ${remoteMessage.from}")

        val rawIdHashCode = remoteMessage.messageId.hashCode()
        val messageId = if (rawIdHashCode != 0) rawIdHashCode else System.currentTimeMillis().toInt()

        // Check if message contains a data payload.
        if (remoteMessage.data.isNotEmpty()) {
            Log.d(TAG, "Message data payload: ${remoteMessage.data}")

            val title = remoteMessage.data[Notification_Title] ?: applicationInfo.loadLabel(packageManager).toString()
            val body = remoteMessage.data[Notification_Body] ?: ""
            val badge = remoteMessage.data[Notification_Badge]?.toInt() ?: 0
            val extras = remoteMessage.data[Notification_Extras] ?: ""

            val notification = Bundle()
            notification.putInt(Notification_Id, messageId)
            notification.putString(Notification_Title, title)
            notification.putString(Notification_Body, body)
            notification.putInt(Notification_Badge, badge)
            notification.putString(Notification_Extras, extras)

            notification.putBoolean(Notification_Flag, true)

            NotificationBuilder(this).sendNotification(title, body, messageId, notification)
            ReactNativeEventDelivery(this).sendNotification(notification)
            BadgeHelper(this).setBadgeCount(badge)
        }
    }

    override fun onNewToken(token: String) {
        Log.d(TAG, "Refreshed token: $token")

        ReactNativeEventDelivery(this).sendNewToken(token)
    }

    companion object {
        private const val TAG = "FIRMessagingService"
    }
}
