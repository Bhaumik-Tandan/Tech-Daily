import WebView from 'react-native-webview';
import React, { useState, useRef } from 'react';
import { View, ActivityIndicator } from 'react-native';

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
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

export default SingleNewsPage;
