import { NativeModules } from 'react-native';

type GooglePlayServiceStatus = {
  isAvailable: boolean;
  status: number;
  error?: string;
  isUserResolvableError?: boolean;
  hasResolution?: boolean;
}

type RNFIRMessagingType = {
  getToken(): Promise<string>;
  getGooglePlayServiceStatus(): Promise<GooglePlayServiceStatus>
  isBadgeCounterSupported(): Promise<boolean>
  isBackgroundRestricted(): Promise<boolean>
};

const { RNFIRMessaging } = NativeModules;

export default RNFIRMessaging as RNFIRMessagingType;
