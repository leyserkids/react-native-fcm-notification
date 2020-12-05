import * as React from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import FCM from 'react-native-fcm-notification';

export default function App() {
  const [token, setToken] = React.useState<string | undefined>();

  React.useEffect(() => {
    FCM.getToken().then(setToken)
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {token}</Text>
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
