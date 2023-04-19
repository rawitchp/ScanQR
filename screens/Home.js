import {
  Text,
  View,
  Pressable,
  StyleSheet,
  ScrollView,
  Linking,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checked, unChecked } from '../redux/scanSlice';
import * as SQLite from 'expo-sqlite';

export default function Home() {
  const urls = useSelector((state) => state.url);
  const dispatch = useDispatch();
  const db = SQLite.openDatabase('scanQR_DB');
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS urls (id TEXT PRIMARY KEY AUTOINCREMENT)'
      );
      // Add the "url" column if it doesn't exist
      tx.executeSql(
        'ALTER TABLE urls ADD COLUMN url TEXT',
        [],
        (txObj, res) => {
          console.log('Column added successfully');
        },
        (txObj, err) => {
          console.log(err);
        }
      );
      tx.executeSql(
        'ALTER TABLE urls ADD COLUMN checked BOOLEAN',
        [],
        (txObj, res) => {
          console.log('Column added successfully');
        },
        (txObj, err) => {
          console.log(err);
        }
      );
    });
  }, []);
  const isCheck = (id) => {
    const url = urls.find((item) => item.id === id);
    return url ? url.checked : false;
  };
  const checkboxStatus = (id, url) => {
    if (isCheck(id)) {
      dispatch(unChecked(id));
      deleteUrl(id);
    } else {
      dispatch(checked(id));
      addUrl(id, url, true);
    }
  };

  // DB
  const addUrl = (id, url, checked) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO urls (id, url, checked) VALUES (?,?,?)',
        [id, url, checked],
        (txObj, res) => {
          console.log('add successfully');
        },
        (txObj, err) => {
          console.log(err);
        }
      );
    });
  };

  const deleteUrl = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM urls WHERE id = ?',
        [id],
        (txObj, res) => {
          if (res.rowsAffected > 0) {
            let existingUrls = [...items].filter((item) => item.id !== id);
          }
        },
        (txObj, err) => console.log(err)
      );
    });
  };
;;
  return (
    <View>
      <ScrollView>
        {urls.map((url) => (
          <View style={styles.container} id={url.id} key={url.id}>
            <Pressable onPress={() => Linking.openURL(url.data)}>
              <View>
                <Text style={{ color: '#fff' }}>{url.data}</Text>
              </View>
            </Pressable>
            <Checkbox
              onValueChange={() => checkboxStatus(url.id, url.data)}
              value={isCheck(url.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    backgroundColor: 'tomato',
    color: '#fff',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
});
