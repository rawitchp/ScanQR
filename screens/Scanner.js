import {
  Text,
  View,
  StyleSheet,
  Button,
  Linking,
  Dimensions,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch, useSelector } from 'react-redux';
import { scanUrl } from '../redux/scanSlice';
import { changeStatus } from '../redux/cameraSlice';
import uuid from 'react-native-uuid';

export default function Scanner() {
  const camera = useSelector((state) => state.camera);
  const dispatch = useDispatch();
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet Scanned !');
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      dispatch(changeStatus(status == 'granted'));
    })();
  };
  //   askForCameraPermission();

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log(`Type: ${type} \nData: ${data}`);
    Alert.alert(`Title`, `Barcode with type ${type} and data ${data}`, [
      { text: 'Scan again?', onPress: () => setScanned(false) },
    ]);
    Linking.openURL(data);
    dispatch(scanUrl({ uuid: uuid.v4(), data: data }));
  };

  if (camera === null) {
    return (
      <View style={styles2.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }

  if (camera === false) {
    <View style={styles2.container}>
      <Text>No access to camera</Text>
      <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
    </View>;
  }
  return (
    <View style={styles2.container}>
      <View style={styles2.barcodeBox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? null : handleBarcodeScanned}
          style={{
            height: Dimensions.get('window').height,
            width: Dimensions.get('window').width,
          }}
        />
      </View>

      {scanned && (
        <View style={{ zIndex: 10000 }}>
          <Text style={styles2.maintext}>{text}</Text>
          <Button
            title={'Scan Again?'}
            onPress={() => setScanned(false)}
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barcodeBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
    zIndex: 0,
  },
  maintext: { fontSize: 16, margin: 20 },
  button: {
    zIndex: 10,
  },
});
