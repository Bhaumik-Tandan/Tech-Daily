import * as Linking from 'expo-linking';
import DeepLink from './constants/deeplink';
import PAGES from './constants/pages';
const prefix = Linking.createURL('/');
const linking = {
    prefixes: [prefix, 'techDaily://'],
    async getInitialURL() {
        const url = await Linking.getInitialURL();
        if (url != null) {
            return url;
        }
        return null;
    },
    subscribe(listener) {
        const onReceiveURL = ({ url }) => listener(url);
        Linking.addEventListener('url', onReceiveURL);
        return () => {
            Linking.removeEventListener('url', onReceiveURL);
        };
    },
    config: {
        screens: {
            [PAGES.NEWS_LIST]: {
                path: DeepLink.NEWS_LIST,
                exact: true,
            },
            [PAGES.SINGLE_NEWS_PAGE]: {
                path: DeepLink.SINGLE_NEWS_PAGE,
                parse: {
                    url: (url) => `${url}`,
                },
            }
        },
    },
};
export default linking;
