import WebView from 'react-native-webview';
import React, { useState, useRef, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { API_URL } from "@env";


const apiUrl = API_URL + "/news";
const SingleNewsPage = ({ route }) => {
    const { id } = route.params;
    const webViewRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState(route.params.url);

   useEffect(() => {
    const fetchNewsData = async () => {
    if(id)
    {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      setUrl(data.sourceURL);
    }
}
    fetchNewsData();
   }, [id]);

    
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
