#import "RNFIRMessaging.h"
#import <React/RCTConvert.h>
#import <Firebase/Firebase.h>

@implementation RNFIRMessaging

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getToken
                 :(RCTPromiseResolveBlock)resolve
                 :(RCTPromiseRejectBlock)reject)
{
    [[FIRMessaging messaging] tokenWithCompletion:^(NSString * _Nullable token, NSError * _Nullable error) {
        if (error == nil && token != nil) {
            resolve(token);
        } else {
            reject(@"e2", @"e2", error);
        }
    }];
}

RCT_EXPORT_METHOD(isNotificationsEnabled
                 :(RCTPromiseResolveBlock)resolve
                 :(RCTPromiseRejectBlock)reject)
{
    if (@available(iOS 10.0, *)) {
        UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert|UNAuthorizationOptionSound|UNAuthorizationOptionBadge;

        [[UNUserNotificationCenter currentNotificationCenter] requestAuthorizationWithOptions:authOptions completionHandler:^(BOOL granted, NSError * _Nullable error) {
            dispatch_async(dispatch_get_main_queue(), ^{
                [[UIApplication sharedApplication] registerForRemoteNotifications];
            });
        }];
    }

    resolve(@([RCTConvert BOOL:@(YES)]));
}

@end
