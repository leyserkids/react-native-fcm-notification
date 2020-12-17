#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@import UserNotifications;

@interface RNFIRMessaging : NSObject <RCTBridgeModule, UNUserNotificationCenterDelegate>

@end
