import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Scanner from './screens/Scanner';
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus } from './redux/cameraSlice';
import { BarCodeScanner } from 'expo-barcode-scanner';


const Tab = createBottomTabNavigator();

function MyTabs() {
  const dispatch = useDispatch();
  const camera = useSelector((state) => state.camera);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        listeners={{
          tabPress: (e) => {
            dispatch(changeStatus(null));
          },
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        listeners={{
          tabPress: async (e) => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            dispatch(changeStatus(status == 'granted'));
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={Store}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="bottomTabs"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Scanner" component={Scanner} />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
