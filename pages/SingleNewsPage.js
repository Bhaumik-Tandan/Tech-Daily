import WebView from 'react-native-webview';

const SingleNewsPage = ({ route }) => {
    const { url } = route.params;
    return <WebView source={{ uri: url }} />;
};

export default SingleNewsPage;