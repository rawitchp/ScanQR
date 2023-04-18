import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const urls = useSelector((state) => state.url);
  urls.map((url) => console.log(url.data));
  return (
    <View>
      <ScrollView>
        {urls.map((url, i) => (
          <Pressable onPress={() => Linking.openURL(url.data)}>
            <View style={styles.container} id={i} key={i}>
              <Text style={{ color: '#fff' }}>{url.data}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: 'tomato',
    color: '#fff',
    borderRadius: 5,
  },
});
