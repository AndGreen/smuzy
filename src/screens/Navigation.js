import React from 'react';
import {useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {DayScreen} from './DayScreen';
import {AboutScreen} from './AboutScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RoutineModal, routineModalHeaderButtons} from './Modals/RoutineModal';
import {CalendarModal} from './Modals/CalendarModal';
import {DayPicker} from '../components/DayPicker';
import {Ionicons} from '@expo/vector-icons';
import {useIsDark} from '../utils/hooks';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  const isDark = useIsDark();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          const icons = {
            Settings: 'flask', //folder-open
            Day: 'cafe',
          };
          return <Ionicons name={icons[route.name]} size={30} color={color} />;
        },
        tabBarActiveTintColor: isDark ? 'tomato' : '#0284c7',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Day"
        component={DayScreen}
        options={({navigation}) => ({
          headerTitle: () => <DayPicker navigation={navigation} />,
        })}
      />
      <Tab.Screen name="Settings" component={AboutScreen} />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  const isDark = useIsDark();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Main}
            options={{headerShown: false}}
          />
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen
              name="RoutineModal"
              component={RoutineModal}
              options={props => ({
                title: 'Edit Routine',
                ...routineModalHeaderButtons(props),
              })}
            />
            <Stack.Screen
              name="CalendarModal"
              component={CalendarModal}
              options={props => ({
                title: 'Calendar',
                headerShown: false,
              })}
            />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
