import { NativeModules } from 'react-native';

type RNFIRMessagingType = {
  getToken(): Promise<string>;
};

const { RNFIRMessaging } = NativeModules;

export default RNFIRMessaging as RNFIRMessagingType;
