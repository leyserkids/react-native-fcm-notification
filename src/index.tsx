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
  title: string;
  body: string;
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

  onNotificationReceived(handler: (event: Notification) => void) {
    eventEmitter.addListener('notification_received', handler);
  }
}

export default new RNFIRMessagingWrapper();
