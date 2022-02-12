import React from 'react';
import {Button, useColorScheme, View} from 'react-native';
import {StoreProvider} from 'easy-peasy';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DayScreen} from './src/screens/DayScreen';
import {RoutinesHeadButton, RoutinesScreen} from './src/screens/RoutinesScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {store} from './src/common/store';
import tw, {useDeviceContext} from 'twrnc';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const scheme = useColorScheme();
  useDeviceContext(tw);

  return (
    <StoreProvider store={store}>
      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Routines') {
                iconName = 'cafe-outline';
              }

              if (route.name === 'Day') {
                iconName = 'calendar-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="Routines"
            options={{
              headerRight: () => <RoutinesHeadButton />,
            }}
            component={RoutinesScreen}
          />
          <Tab.Screen name="Day" component={DayScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
};
export default App;
