import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loader = () => (
  <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
);



export default Loader;
