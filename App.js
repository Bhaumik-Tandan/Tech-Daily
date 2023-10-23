import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import Navigator from './Navigator';
import Constants from 'expo-constants';
import {ScreenDimensionsProvider} from './ScreenDimension';
import { useState } from 'react';


export default function App() {
  const [height, setHeight] = useState();
  return (
    <ScreenDimensionsProvider onDimensions={layout => setHeight(layout.height)} >
      <StatusBar style="auto" />
      <Navigator/>
    </ScreenDimensionsProvider>
  );
}
