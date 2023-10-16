import WebView from 'react-native-webview';
import React, { useState, useRef } from 'react';
import { View, ActivityIndicator, Pressable,Text } from 'react-native';
import Loader from '../component/Loader';

const SingleNewsPage = ({ route }) => {
    const { url } = route.params;
    const webViewRef = useRef(null);
    const [loading, setLoading] = useState(true);

    
    return (
        <View style={{ flex: 1 }}>
            <WebView
                ref={webViewRef}
                source={{ uri: url }}
                onLoad={() => setLoading(false)}
            />

            {loading && (
               <Loader/>
            )}
        </View>
    );
};

export default SingleNewsPage;
