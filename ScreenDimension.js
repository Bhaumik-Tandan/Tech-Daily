import React, { useContext, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

const ScreenDimensionsContext = React.createContext(null);

export const useDimensions = () => {
  const dimensions = useContext(ScreenDimensionsContext);
  return dimensions;
};

export const ScreenDimensionsProvider = ({ children, onDimensions }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const onLayout = (layout) => {
    if (onDimensions) {
      onDimensions(layout);
    }
    setDimensions(layout);
  };
  return (
    <ScreenDimensionsContext.Provider value={dimensions}>
      <SafeAreaView style={{...styles.flex,paddingTop:Constants.statusBarHeight}}>
        <View
          style={styles.flex}
          onLayout={(e) => onLayout(e.nativeEvent.layout)}>
          {children}
        </View>
      </SafeAreaView>
    </ScreenDimensionsContext.Provider>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});