# react-native-fcm-notification

A lightweight React Native Module for integrating Firebase Cloud Messaging

## Installation

```sh
npm install react-native-fcm-notification
```

## Usage

```js
import FCMNotification from "react-native-fcm-notification";

// ...

const result = await FCMNotification.multiply(3, 7);
```

## References
+ https://github.com/zo0r/react-native-push-notification
+ https://github.com/evollu/react-native-fcm
+ https://github.com/wix/react-native-notifications
+ https://github.com/wumke/react-native-local-notifications
+ https://github.com/wix/react-native-notifications/wiki/Android:-working-with-RNN
+ https://github.com/firebase/quickstart-android/blob/e8743a69ae3e21b66414fe9890b0dffaac20ff1d/messaging/app/src/main/java/com/google/firebase/quickstart/fcm/kotlin/MyFirebaseMessagingService.kt
+ https://github.com/firebase/firebase-android-sdk/blob/master/firebase-messaging/src/main/java/com/google/firebase/messaging/CommonNotificationBuilder.java
+ https://firebase.google.com/docs/cloud-messaging/android/receive#sample-receive
+ https://notifee.app/react-native/docs/android/appearance
+ https://rnfirebase.io/
+ https://github.com/react-native-push-notification-ios/push-notification-ios
+ https://github.com/firebase/firebase-ios-sdk/issues/6553
+ https://github.com/invertase/react-native-firebase/issues/4299
+ https://github.com/invertase/react-native-firebase/issues/3040
+ https://github.com/OneSignal/OneSignal-Android-SDK/blob/97791c996305a2d8bb0f63714e6b320d3566ecfc/OneSignalSDK/onesignal/src/main/java/com/onesignal/GcmBroadcastReceiver.java
+ https://developer.android.com/guide/topics/ui/notifiers/notifications
## Q & A

### About Force Stop
+ https://stackoverflow.com/questions/39480931/error-broadcast-intent-callback-result-cancelled-forintent-act-com-google-and
+ https://github.com/evollu/react-native-fcm/issues/834
+ https://github.com/firebase/quickstart-android/issues/822#issuecomment-611567389
+ https://github.com/firebase/quickstart-android/issues/822
+ https://stackoverflow.com/questions/48642423/firebase-push-notification-issue-in-android-when-app-is-closed-killed
+ https://github.com/firebase/quickstart-android/issues/822
+ https://github.com/firebase/quickstart-android/issues/41
+ https://github.com/invertase/react-native-firebase/issues/2074
+ https://developer.android.com/about/versions/android-3.1#launchcontrols
+ https://github.com/firebase/quickstart-android/issues/368#issuecomment-424454844
+ https://github.com/firebase/firebase-android-sdk/search?q=com.google.android.c2dm.intent.RECEIVE
+ https://stackoverflow.com/questions/47398812/is-it-possible-to-receive-fcm-push-notification-when-app-is-killed
+ https://stackoverflow.com/questions/39504805/android-app-not-receiving-firebase-notification-when-app-is-stopped-from-multi-t
+ https://stackoverflow.com/questions/38079245/handle-onmessagereceived-and-ontokenrefresh-even-if-the-app-is-not-running

## License

MIT
