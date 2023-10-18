import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import Navigator from './Navigator';
import Constants from 'expo-constants';


export default function App() {
  return (
    <SafeAreaProvider
      style={{
        paddingTop:Constants.statusBarHeight
      }}
    >
      <StatusBar style="auto" />
      <Navigator/>
    </SafeAreaProvider>
  );
}
