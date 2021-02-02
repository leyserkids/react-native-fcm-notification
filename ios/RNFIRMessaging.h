#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>
#import <React/RCTConvert.h>
#import <React/RCTEventEmitter.h>

#import <Firebase/Firebase.h>

@import UserNotifications;

@interface RNFIRMessaging : RCTEventEmitter <RCTBridgeModule, UNUserNotificationCenterDelegate, FIRMessagingDelegate>

+ (void)didReceiveRemoteNotification:(NSDictionary *)userInfo;

@end
