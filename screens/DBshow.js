import { View, Text, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';

const DBshow = () => {
  const db = SQLite.openDatabase('scanQR_DB');
  const [urls, setUrls] = useState([]);
  const isFocused = useIsFocused();
  const refresh = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM urls',
        null,
        (txObj, res) => setUrls(res.rows._array),
        (txObj, err) => console.log(err)
      );
    });
  };

  useEffect(() => {
    refresh();
  }, [isFocused]);

  return (
    <View>
      {/* <Button title={'Refresh'} onPress={refresh}></Button> */}
      {urls.map((item) => {
        if (item.checked) {
          return (
            <View style={styles.container}>
              <Text style={{ color: '#fff' }}>{item.url}</Text>
            </View>
          );
        }
      })}
    </View>
  );
};

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

export default DBshow;
