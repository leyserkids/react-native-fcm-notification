import { NativeModules, NativeEventEmitter } from 'react-native';
const { RNFIRMessaging } = NativeModules;
const eventEmitter = new NativeEventEmitter(RNFIRMessaging || {});

export enum UNAuthorizationStatus {
  // The user has not yet made a choice regarding whether the application may post user notifications.
  UNAuthorizationStatusNotDetermined = 0,
  // The application is not authorized to post user notifications.
  UNAuthorizationStatusDenied,
  // The application is authorized to post user notifications.
  UNAuthorizationStatusAuthorized,
  // The application is authorized to post non-interruptive user notifications.
  UNAuthorizationStatusProvisional,
  // The application is temporarily authorized to post notifications. Only available to app clips.
  UNAuthorizationStatusEphemeral,
}

export type GooglePlayServiceStatus = {
  isAvailable: boolean;
  status: number;
  error?: string;
  isUserResolvableError?: boolean;
  hasResolution?: boolean;
};

export type UNNotificationSettings = {
  alertSetting: boolean;
  soundSetting: boolean;
  badgeSetting: boolean;
  lockScreenSetting: boolean;
  notificationCenterSetting: boolean;
  authorizationStatus: UNAuthorizationStatus;
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
      throw Error('Failed to initial FCM');
    }
  }

  async getToken(): Promise<string> {
    return await RNFIRMessaging.getToken();
  }

  async getBadgeCount(): Promise<number> {
    return await RNFIRMessaging.getBadgeCount();
  }

  async setBadgeCount(badgeCount: number): Promise<boolean> {
    return await RNFIRMessaging.setBadgeCount(badgeCount);
  }

  async getInitialNotification(): Promise<Notification | null> {
    return await RNFIRMessaging.getInitialNotification();
  }

  async deleteToken(): Promise<boolean> {
    return await RNFIRMessaging.deleteToken();
  }

  /**
   * @platform Android
   */
  async isNotificationsEnabled(): Promise<boolean> {
    return await RNFIRMessaging.isNotificationsEnabled();
  }

  /**
   * @platform Android
   */
  async getGooglePlayServiceStatus(): Promise<GooglePlayServiceStatus> {
    return await RNFIRMessaging.getGooglePlayServiceStatus();
  }

  /**
   * @platform Android
   */
  async isLauncherBadgeSupported(): Promise<boolean> {
    return await RNFIRMessaging.isLauncherBadgeSupported();
  }

  /**
   * @platform Android
   */
  async isBackgroundRestricted(): Promise<boolean> {
    return await RNFIRMessaging.isBackgroundRestricted();
  }

  /**
   * @platform iOS
   */
  async requestAuthorization(): Promise<boolean> {
    return await RNFIRMessaging.requestAuthorization();
  }

  /**
   * @platform iOS
   */
  async getNotificationSettings(): Promise<UNNotificationSettings> {
    return await RNFIRMessaging.getNotificationSettings();
  }

  onNotificationReceived(handler: (notification: Notification) => void) {
    return eventEmitter.addListener('notification_arrival_event', handler);
  }

  onNewToken(handler: (token: Token) => void) {
    return eventEmitter.addListener('new_token_event', handler);
  }

  onNotificationTap(handler: (notification: Notification) => void) {
    return eventEmitter.addListener('notification_tap_event', handler);
  }
}

export default new RNFIRMessagingWrapper();
