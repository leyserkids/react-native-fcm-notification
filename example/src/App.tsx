import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import FCM from 'react-native-fcm-notification';

export default function App() {
  const [token, setToken] = React.useState<string | undefined>();
  const [googlePlayServiceStatus, setGooglePlayServiceStatus] = React.useState<string | undefined>();
  const [isBadgeCounterSupported, setIsBadgeCounterSupported] = React.useState<string | undefined>();
  const [isBackgroundRestricted, setIsBackgroundRestricted] = React.useState<string | undefined>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState<string | undefined>();

  React.useEffect(() => {
    FCM.getToken().then(setToken)
    FCM.isNotificationsEnabled().then(x => setIsNotificationsEnabled(`${x}`))
    FCM.getGooglePlayServiceStatus().then(x => setGooglePlayServiceStatus(JSON.stringify(x)))
    FCM.isBadgeCounterSupported().then(x => setIsBadgeCounterSupported(`${x}`))
    FCM.isBackgroundRestricted().then(x => setIsBackgroundRestricted(`${x}`))
  }, []);

  const invokeServerPush = (isDelay: boolean = false) => {
    fetch(`http://192.168.31.221:5000/api/fcm?isDelay=${isDelay}&token=${token}`, {
      method: 'GET'
    }).then(async r => Alert.alert("Invoke Success", await r.text()))
      .catch(err => {
        Alert.alert("Invoke Error", `${err}`);
        console.error(err);
      })
  }

  return (
    <View style={styles.container}>
      <Text>Token: {token}</Text>
      <Text>isNotificationsEnabled: {isNotificationsEnabled}</Text>
      <Text>GooglePlayServiceStatus: {googlePlayServiceStatus}</Text>
      <Text>isBadgeCounterSupported: {isBadgeCounterSupported}</Text>
      <Text>isBackgroundRestricted: {isBackgroundRestricted}</Text>
      <TouchableOpacity onPress={() => invokeServerPush()} >
        <Text style={{
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          margin: 10,
        }}>
          Server Push
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => invokeServerPush(true)} >
        <Text style={{
          borderColor: 'gray',
          borderWidth: 1,
          padding: 10,
          margin: 10,
        }}>
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
