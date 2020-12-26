package com.grapecity.leyserkids.reactnativefcmnotification

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class FIRMessagingService : FirebaseMessagingService() {
    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        Log.d(TAG, "From: ${remoteMessage.from}")

        // Check if message contains a data payload.
        if (remoteMessage.data.isNotEmpty()) {
            Log.d(TAG, "Message data payload: ${remoteMessage.data}")

//          if (/* Check if data needs to be processed by long running job */ true) {
//              // For long-running tasks (10 seconds or more) use WorkManager.
//              scheduleJob()
//          } else {
//              // Handle message within 10 seconds
//              handleNow()
//          }
            val title = remoteMessage.data["title"] ?: "Title"
            val body = remoteMessage.data["body"] ?: "Body"
            val extras = remoteMessage.data["extras"] ?: ""

            NotificationBuilder(this).sendNotification(title, body)
            ReactNativeEventDelivery(this).sendNotification(title, body, extras)
        }

        // Check if message contains a notification payload.
//        remoteMessage.notification?.let {
//            Log.d(TAG, "Message Notification Body: ${it.body}")
//
//            sendNotification(it.body, it.title, metadata)
//        }


        // Also if you intend on generating your own notifications as a result of a received FCM
        // message, here is where that should be initiated. See sendNotification method below.
    }

    override fun onNewToken(token: String) {
        Log.d(TAG, "Refreshed token: $token")

        // If you want to send messages to this application instance or
        // manage this apps subscriptions on the server side, send the
        // FCM registration token to your app server.
//        sendRegistrationToServer(token)
    }

    companion object {
        private const val TAG = "FIRMessagingService"
    }
}
