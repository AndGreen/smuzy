import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {DayScreen} from '../screens/DayScreen';
import {useColorScheme} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  RoutineModal,
  routineModalHeaderButtons,
} from '../screens/Modals/RoutineModal';
import {CalendarModal} from '../screens/Modals/CalendarModal';
import {StatusBar} from 'expo-status-bar';
import {DayPicker} from '../components/DayPicker';

const Stack = createStackNavigator();

export const Navigation = () => {
  const scheme = useColorScheme();
  const isDarkTheme = scheme === 'dark';
  return (
    <>
      <StatusBar style={isDarkTheme ? 'light' : 'dark'} />
      <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen
            name="Today"
            component={DayScreen}
            options={({navigation}) => ({
              headerTitle: () => <DayPicker navigation={navigation} />,
            })}
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
