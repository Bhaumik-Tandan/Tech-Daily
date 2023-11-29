import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsList from '../pages/NewsList';
import PAGES from '../utils/constants/pages';
import linking from '../utils/linking';
import News from '../pages/News';
import Menu from '../pages/Menu';
import Summarizer from '../pages/Summarizer';
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
             <Stack.Screen
                name={PAGES.MENU}
                component={Menu}
            />
            <Stack.Screen
                name={PAGES.SUMMARIZER}
                component={Summarizer}
            />
    </Stack.Group>

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default RootNavigator;
