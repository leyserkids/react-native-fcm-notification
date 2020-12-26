import { NativeModules, NativeEventEmitter } from 'react-native';

type GooglePlayServiceStatus = {
  isAvailable: boolean;
  status: number;
  error?: string;
  isUserResolvableError?: boolean;
  hasResolution?: boolean;
};

type RNFIRMessagingType = {
  getToken(): Promise<string>;
  isNotificationsEnabled(): Promise<boolean>;
  getGooglePlayServiceStatus(): Promise<GooglePlayServiceStatus>;
  isBadgeCounterSupported(): Promise<boolean>;
  isBackgroundRestricted(): Promise<boolean>;
};

const { RNFIRMessaging } = NativeModules;

const eventEmitter = new NativeEventEmitter(RNFIRMessaging || {});

eventEmitter.addListener('notification_received', (event) => {
  console.log(event)
});

export default RNFIRMessaging as RNFIRMessagingType;
