import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  TextInput,
} from 'react-native';
import FCM, { Notification } from 'react-native-fcm-notification';

const SERVER_ADDR = 'https://notification.kr1.cc';

export default function App() {
  console.log("initialize");
  const [token, setToken] = React.useState<string | undefined>();
  const [googlePlayServiceStatus, setGooglePlayServiceStatus] = React.useState<string | undefined>();
  const [isBadgeCounterSupported, setIsBadgeCounterSupported] = React.useState<string | undefined>();
  const [isBackgroundRestricted, setIsBackgroundRestricted] = React.useState<string | undefined>();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState<string | undefined>();

  const [title, onChangeTitle] = React.useState('Title text');
  const [body, onChangeBody] = React.useState('Body text');

  const [initialTitle, onChangeInitialTitle] = React.useState('');

  FCM.getInitialNotification().then((message) => {
    onChangeInitialTitle(message?.title);
  });

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

    FCM.onNotificationReceived(({ title }) => {
      console.log('onNotificationReceived - messageTitle: ' + title)
    });
  }, []);

  const invokeServerPush = (isDelay: boolean = false) => {
    fetch(`${SERVER_ADDR}/api/fcm?isDelay=${isDelay}&token=${token}&title=${title}&body=${body}`, {
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
      <View >
        <TextInput
          onChangeText={text => onChangeTitle(text)}
          value={title}
          placeholder={"Title"}
          style={styles.textbox}
          maxLength={20} />
        <TextInput
          onChangeText={text => onChangeBody(text)}
          value={body}
          placeholder={"Body"}
          style={styles.textbox}
          maxLength={20} />
      </View>
      <TouchableOpacity onPress={() => invokeServerPush()}>
        <Text style={styles.button}>
          Server Push
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => invokeServerPush(true)}>
        <Text style={styles.button}>
          Server Push After 5 sec
        </Text>
      </TouchableOpacity>
      <Text>InitialNotificationTitle: {initialTitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  textbox: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    width: 150
  }
});
