import { StatusBar } from 'expo-status-bar';
import Navigator from './navigator/RootNavigator';
import {ScreenDimensionsProvider} from './ScreenDimension';
import { useState } from 'react';


export default function App() {
  return (
    <ScreenDimensionsProvider>
      <StatusBar style="auto" />
      <Navigator/>
    </ScreenDimensionsProvider>
  );
}
