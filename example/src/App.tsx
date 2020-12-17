import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import FCM from 'react-native-fcm-notification';

const SERVER_ADDR = 'https://notification.kr1.cc';

export default function App() {
  const [token, setToken] = React.useState<string | undefined>();
  const [googlePlayServiceStatus, setGooglePlayServiceStatus] = React.useState<string | undefined>();
  const [isBadgeCounterSupported, setIsBadgeCounterSupported] = React.useState<string | undefined>();
  const [isBackgroundRestricted, setIsBackgroundRestricted] = React.useState<string | undefined>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState<string | undefined>();

  const getToken = () => {
    FCM.getToken().then(setToken);
  };

  React.useEffect(() => {
    getToken();
    FCM.isNotificationsEnabled().then((x) => setIsNotificationsEnabled(`${x}`));
    if (Platform.OS === 'android') {
      FCM.getGooglePlayServiceStatus().then((x) => setGooglePlayServiceStatus(JSON.stringify(x)));
      FCM.isBadgeCounterSupported().then((x) => setIsBadgeCounterSupported(`${x}`));
      FCM.isBackgroundRestricted().then((x) => setIsBackgroundRestricted(`${x}`));
    }
  }, []);

  const invokeServerPush = (isDelay: boolean = false) => {
    fetch(`${SERVER_ADDR}/api/fcm?isDelay=${isDelay}&token=${token}`, {
      method: 'GET',
    })
      .then(async (r) => Alert.alert('Invoke Success', await r.text()))
      .catch((err) => {
        Alert.alert('Invoke Error', `${err}`);
        console.error(err);
      });
  };



  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getToken()}>
        <Text>Token: {token}</Text>
      </TouchableOpacity>
      <Text>isNotificationsEnabled: {isNotificationsEnabled}</Text>
      <Text>GooglePlayServiceStatus: {googlePlayServiceStatus}</Text>
      <Text>isBadgeCounterSupported: {isBadgeCounterSupported}</Text>
      <Text>isBackgroundRestricted: {isBackgroundRestricted}</Text>
      <TouchableOpacity onPress={() => invokeServerPush()}>
        <Text
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            margin: 10,
          }}
        >
          Server Push
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => invokeServerPush(true)}>
        <Text
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            margin: 10,
          }}
        >
          Server Push After 5 sec
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
