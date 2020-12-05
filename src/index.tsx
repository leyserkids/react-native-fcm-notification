import { NativeModules } from 'react-native';

type FCMNotificationType = {
  multiply(a: number, b: number): Promise<number>;
};

const { FCMNotification } = NativeModules;

export default FCMNotification as FCMNotificationType;
