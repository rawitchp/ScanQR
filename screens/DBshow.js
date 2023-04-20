import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as SQLite from 'expo-sqlite';
import { useIsFocused } from '@react-navigation/native';
import { unChecked } from '../redux/scanSlice';

const DBshow = () => {
  const state = useSelector((state) => state.url);
  const dispatch = useDispatch();
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

  const deleteUrl = (id, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM urls WHERE id = ?',
        [id],
        (txObj, res) => {
          console.log(res);
        },
        (txObj, err) => console.log(err)
      );
    });
    callback();
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
            <View
              className="p-3 mx-5 my-1 rounded justify-between bg-regal-blue flex-row"
              key={item.id}
            >
              <Text style={{ color: '#fff' }}>{item.url}</Text>
              <Pressable
                onPress={() => {
                  deleteUrl(item.id, refresh);
                  dispatch(unChecked(item.id));
                }}
              >
                <Text>❌</Text>
              </Pressable>
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
