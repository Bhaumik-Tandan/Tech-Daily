import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsList from './pages/NewsList';
import SingleNewsPage from './pages/SingleNewsPage';
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
                    null
                ),
            }}
            component={NewsList}
        />
    </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigator;
