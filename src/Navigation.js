import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  RoutinesHeadLeftButton,
  RoutinesHeadRightButton,
  RoutinesScreen,
} from './screens/RoutinesScreen';
import {DayScreen} from './screens/DayScreen';
import React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            const icons = {
              Routines: 'cafe-outline',
              Day: 'calendar-outline',
            };
            return (
              <Ionicons name={icons[route.name]} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Routines"
          options={{
            headerRight: () => <RoutinesHeadRightButton />,
            headerLeft: () => <RoutinesHeadLeftButton />,
          }}
          component={RoutinesScreen}
        />
        <Tab.Screen name="Day" component={DayScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
