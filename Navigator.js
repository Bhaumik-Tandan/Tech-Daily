import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsList from './pages/NewsList';
import SingleNewsPage from './pages/SingleNewsPage';
import BannerAd from './component/BannerAd';
import PAGES from './utils/constants/pages';
import linking from './utils/linking';
const Stack = createNativeStackNavigator();

function Navigator() {

    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName={PAGES.NEWS_LIST} >
            <Stack.Group>
        <Stack.Screen
            name={PAGES.NEWS_LIST}
            options={{
                header: () => (
                    // <BannerAd />
                    null
                ),
            }}
            component={NewsList}
        />
        <Stack.Screen
            name={PAGES.SINGLE_NEWS_PAGE}
            options={{
                headerShown: false,
            }}
            component={SingleNewsPage}
        />
    </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;
