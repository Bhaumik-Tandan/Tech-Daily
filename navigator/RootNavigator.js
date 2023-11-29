import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsList from '../pages/NewsList';
import PAGES from '../utils/constants/pages';
import linking from '../utils/linking';
import News from '../pages/News';
const Stack = createNativeStackNavigator();

function RootNavigator() {

    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator>
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
        <Stack.Screen
                name={PAGES.NEWS}
                component={News}
            />
    </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
