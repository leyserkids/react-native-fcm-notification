#import "RNFIRMessaging.h"
#import <React/RCTConvert.h>

@implementation RNFIRMessaging

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getToken
                 :(RCTPromiseResolveBlock)resolve
                 :(RCTPromiseRejectBlock)reject)
{
  NSString *result = @"abc";

  resolve(result);
}

RCT_EXPORT_METHOD(isNotificationsEnabled
                 :(RCTPromiseResolveBlock)resolve
                 :(RCTPromiseRejectBlock)reject)
{
  resolve(@([RCTConvert BOOL:@(YES)]));
}

@end
