import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNFIRMessaging } = NativeModules;
const eventEmitter = new NativeEventEmitter(RNFIRMessaging || {});

export type GooglePlayServiceStatus = {
  isAvailable: boolean;
  status: number;
  error?: string;
  isUserResolvableError?: boolean;
  hasResolution?: boolean;
};

export type Notification = {
  id: number;
  title: string;
  body: string;
  badge: number;
  extras: string;
};

export type Token = {
  token: string;
};

class RNFIRMessagingWrapper {
  constructor() {
    if (!RNFIRMessaging) {
      throw Error("Failed to initial FCM");
    }
  }

  async getToken(): Promise<string> {
    return await RNFIRMessaging.getToken()
  }

  async deleteToken(): Promise<boolean> {
    return await RNFIRMessaging.deleteToken()
  }

  async isNotificationsEnabled(): Promise<boolean> {
    return await RNFIRMessaging.isNotificationsEnabled()
  }

  async getGooglePlayServiceStatus(): Promise<GooglePlayServiceStatus> {
    return await RNFIRMessaging.getGooglePlayServiceStatus()
  }

  async isBadgeCounterSupported(): Promise<boolean> {
    return await RNFIRMessaging.isBadgeCounterSupported()
  }

  async isBackgroundRestricted(): Promise<boolean> {
    return await RNFIRMessaging.isBackgroundRestricted()
  }

  async getInitialNotification(): Promise<Notification> {
    return await RNFIRMessaging.getInitialNotification()
  }
  
  async getBadgeCount(): Promise<number> {
    return await RNFIRMessaging.getBadgeCount()
  }

  async setBadgeCount(badgeCount: number): Promise<boolean> {
    return await RNFIRMessaging.setBadgeCount(badgeCount)
  }

  onNotificationReceived(handler: (notification: Notification) => void) {
    eventEmitter.addListener('notification_arrival_event', handler);
  }

  onNewToken(handler: (token: Token) => void) {
    eventEmitter.addListener('new_token_event', handler);
  }
}

export default new RNFIRMessagingWrapper();
