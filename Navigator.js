import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsList from './pages/NewsList';
import SingleNewsPage from './pages/SingleNewsPage';
import BannerAd from './component/BannerAd';
const Stack = createNativeStackNavigator();

function Navigator() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"NewsList"} >
            <Stack.Group>
        <Stack.Screen
            name={"NewsList"}
            options={{
                header: () => (
                    <BannerAd />
                ),
            }}
            component={NewsList}
        />
        <Stack.Screen
            name={"SingleNewsPage"}
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
