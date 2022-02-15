#import "RNFIRMessaging.h"

@implementation RNFIRMessaging

NSString *const FCMNotificationReceivedEvent = @"notification_arrival_event";
NSString *const FCMNotificationTapEvent = @"notification_tap_event";
NSString *const FCMNewTokenEvent = @"new_token_event";

static bool _hasListeners;
static RNFIRMessaging *rNFIRMessagingInstance;

- (instancetype)init
{
    self = [super init];
    if (self) {
        [UNUserNotificationCenter currentNotificationCenter].delegate = self;
        [FIRMessaging messaging].delegate = self;
        [self registeredForRemoteNotifications];
        rNFIRMessagingInstance = self;
    }
    return self;
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

- (void)startObserving {
    _hasListeners = YES;
}

- (void)stopObserving {
    _hasListeners = NO;
}

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[FCMNotificationReceivedEvent, FCMNewTokenEvent, FCMNotificationTapEvent];
}

RCT_EXPORT_METHOD(getToken
                 :(RCTPromiseResolveBlock)resolve
                 :(RCTPromiseRejectBlock)reject)
{
    [self registeredForRemoteNotifications];
    [[FIRMessaging messaging] tokenWithCompletion:^(NSString * _Nullable token, NSError * _Nullable error) {
        if (error == nil && token != nil) {
            // NSString *apnsToken = [self getAPNSToken];
            // NSLog(@"Apns Token: %@", apnsToken);
            NSLog(@"FCM Token: %@", token);
            resolve(token);
        } else {
            reject([NSString stringWithFormat:@"%ld", (long)error.code], error.localizedDescription, nil);
        }
    }];
}

RCT_EXPORT_METHOD(requestAuthorization
                 :(RCTPromiseResolveBlock)resolve
                 :(RCTPromiseRejectBlock)reject)
{
    [UNUserNotificationCenter currentNotificationCenter].delegate = self;
    UNAuthorizationOptions authOptions = UNAuthorizationOptionAlert|UNAuthorizationOptionSound|UNAuthorizationOptionBadge;

    [[UNUserNotificationCenter currentNotificationCenter] requestAuthorizationWithOptions:authOptions completionHandler:^(BOOL granted, NSError * _Nullable error) {
        [self registeredForRemoteNotifications];
    }];

    resolve(@([RCTConvert BOOL:@(YES)]));
}

RCT_EXPORT_METHOD(getInitialNotification:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSDictionary *notificationDict;
    NSDictionary *remoteUserInfoFromLunchOptions = [self.bridge.launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey] mutableCopy];
    // Open by tap notification
    if (remoteUserInfoFromLunchOptions != nil) {
        notificationDict = [RNFIRMessaging remoteMessageUserInfoToDict:remoteUserInfoFromLunchOptions];
    }

    resolve(notificationDict);
}

RCT_EXPORT_METHOD(getNotificationSettings
                  :(RCTPromiseResolveBlock)resolve
                  :(RCTPromiseRejectBlock)reject)
{
    [[UNUserNotificationCenter currentNotificationCenter] getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
        NSMutableDictionary* ret = [[NSMutableDictionary alloc] init];
        ret[@"alertSetting"] = @((bool)(settings.alertSetting == UNNotificationSettingEnabled));
        ret[@"soundSetting"] = @((bool)(settings.soundSetting == UNNotificationSettingEnabled));
        ret[@"badgeSetting"] = @((bool)(settings.badgeSetting == UNNotificationSettingEnabled));
        ret[@"lockScreenSetting"] = @((bool)(settings.lockScreenSetting == UNNotificationSettingEnabled));
        ret[@"notificationCenterSetting"] = @((bool)(settings.notificationCenterSetting == UNNotificationSettingEnabled));

        ret[@"authorizationStatus"] = @(settings.authorizationStatus);
  
        resolve(ret);
    }];
}

RCT_EXPORT_METHOD(setBadgeCount: (NSInteger) badgeCount)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        [RCTSharedApplication() setApplicationIconBadgeNumber:badgeCount];
    });
}

RCT_EXPORT_METHOD(getBadgeCount: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_main_queue(), ^{
        resolve(@([RCTSharedApplication() applicationIconBadgeNumber]));
    });
}

RCT_EXPORT_METHOD(deleteToken: (RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)
{
    @try {
        [self unregisterForRemoteNotifications];
        [[FIRMessaging messaging] deleteDataWithCompletion:^(NSError * _Nullable error) {
            if (error) {
                reject([NSString stringWithFormat:@"%ld", (long)error.code], error.localizedDescription, nil);
            } else {
                resolve(@(true));
            }
        }];
    } @catch (NSException *exception) {
        reject(exception.name, exception.reason, nil);
    }
}

- (NSString *)getAPNSToken {
    NSString* hexToken = nil;
    NSData* apnsToken = [FIRMessaging messaging].APNSToken;
    if (apnsToken) {
#if __IPHONE_OS_VERSION_MAX_ALLOWED >= 130000
        // [deviceToken description] Starting with iOS 13 device token is like "{length = 32, bytes = 0xd3d997af 967d1f43 b405374a 13394d2f ... 28f10282 14af515f }"
        hexToken = [self hexadecimalStringFromData:apnsToken];
#else
        hexToken = [[apnsToken.description componentsSeparatedByCharactersInSet:[[NSCharacterSet alphanumericCharacterSet]invertedSet]]componentsJoinedByString:@""];
#endif
    }
    return hexToken;
}

- (void) registeredForRemoteNotifications {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] registerForRemoteNotifications];
    });
}

- (void) unregisterForRemoteNotifications {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIApplication sharedApplication] unregisterForRemoteNotifications];
    });
}

- (void) isRegisteredForRemoteNotifications: (void (^)(BOOL result))completeBlock {
    dispatch_async(dispatch_get_main_queue(), ^{
        BOOL isRegister = [[UIApplication sharedApplication] isRegisteredForRemoteNotifications];
        if (completeBlock) {
            completeBlock(isRegister);
        }
    });
}

- (NSString *)hexadecimalStringFromData:(NSData *)data
{
    NSUInteger dataLength = data.length;
    if (dataLength == 0) {
        return nil;
    }

    const unsigned char *dataBuffer = data.bytes;
    NSMutableString *hexString  = [NSMutableString stringWithCapacity:(dataLength * 2)];
    for (int i = 0; i < dataLength; ++i) {
        [hexString appendFormat:@"%02x", dataBuffer[i]];
    }
    return [hexString copy];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
    NSLog(@"APNs device token retrieved: %@", deviceToken);
}

// Receive displayed notifications for iOS 10 devices.
// Handle incoming notification messages while app is in the foreground.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions))completionHandler {
    NSDictionary *userInfo = notification.request.content.userInfo;

    // With swizzling disabled you must let Messaging know about the message, for Analytics
    // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];

    // Print full message.
    NSLog(@"willPresentNotification: %@", userInfo);

    // Change this to your preferred presentation option
    completionHandler(UNNotificationPresentationOptionBadge | UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert);

    if (@available(iOS 15.2, *)) {
        NSDictionary *notificationDict = [RNFIRMessaging remoteMessageUserInfoToDict:userInfo];
        if (_hasListeners) {
            [self sendEventWithName:FCMNotificationReceivedEvent body:notificationDict];
        }
    }
}

// Handle notification messages after display notification is tapped by the user.
- (void)userNotificationCenter:(UNUserNotificationCenter *)center
didReceiveNotificationResponse:(UNNotificationResponse *)response
         withCompletionHandler:(void(^)(void))completionHandler {
    NSDictionary *userInfo = response.notification.request.content.userInfo;

    // With swizzling disabled you must let Messaging know about the message, for Analytics
    // [[FIRMessaging messaging] appDidReceiveMessage:userInfo];

    // Print full message.
    NSLog(@"didReceiveNotificationResponse: %@", userInfo);

    completionHandler();
    
    NSDictionary *notificationDict = [RNFIRMessaging remoteMessageUserInfoToDict:userInfo];
    if (_hasListeners) {
        [self sendEventWithName:FCMNotificationTapEvent body:notificationDict];
    }
}

- (void)messaging:(FIRMessaging *)messaging didReceiveRegistrationToken:(NSString *)fcmToken {
    NSLog(@"FCM registration token: %@", fcmToken);
    // Note: This callback is fired at each app startup and whenever a new token is generated.
    if (_hasListeners && fcmToken != nil) {
        [self sendEventWithName:FCMNewTokenEvent body:@{@"token": fcmToken}];
    }
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error {
    NSLog(@"Unable to register for remote notifications: %@", error);
}

+ (void)didReceiveRemoteNotification:(NSDictionary *)userInfo {
    if (userInfo != nil && _hasListeners && rNFIRMessagingInstance != nil) {
        NSDictionary *notificationDict = [RNFIRMessaging remoteMessageUserInfoToDict:userInfo];
        [rNFIRMessagingInstance sendEventWithName:FCMNotificationReceivedEvent body:notificationDict];
    }
}

+ (NSDictionary *)remoteMessageUserInfoToDict:(NSDictionary *)userInfo {
    NSMutableDictionary *notification = [[NSMutableDictionary alloc] init];
    
    if (userInfo != nil) {
        notification[@"id"] = userInfo[@"gcm.message_id"];
        notification[@"extras"] = userInfo[@"extras"];
        
        NSDictionary *apsDict = userInfo[@"aps"];
        
        if (apsDict != nil) {
            notification[@"badge"] = userInfo[@"badge"];
            
            if (apsDict[@"alert"] != nil && [apsDict[@"alert"] isKindOfClass:[NSDictionary class]]) {
                NSDictionary *apsAlertDict = apsDict[@"alert"];

                notification[@"title"] = apsAlertDict[@"title"];
                notification[@"body"] = apsAlertDict[@"body"];
            }
        }
        
    }
    return notification;
}

@end
