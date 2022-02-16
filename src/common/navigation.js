import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import {routinesHeaderButtons, RoutinesScreen} from '../screens/RoutinesScreen';
import {DayScreen} from '../screens/DayScreen';
import {Button, useColorScheme, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {RoutineModal, routineModalHeaderButtons} from '../screens/RoutineModal';
import {StatusBar} from 'expo-status-bar';
import {Picker} from '../components/Picker';
import {useStoreActions} from 'easy-peasy';
import tw from 'twrnc';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = () => {
  return (
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
        options={props => ({...routinesHeaderButtons(props)})}
        component={RoutinesScreen}
      />
      <Tab.Screen name="Day" component={DayScreen} />
    </Tab.Navigator>
  );
};

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
            options={{
              headerTitle: () => <Picker />,
              // headerLeft: () => {
              //   const restoreDefaultRoutines = useStoreActions(
              //     state => state.restoreDefaultRoutines,
              //   );
              //   return (
              //     <View style={tw`mr-3`}>
              //       <Button
              //         onPress={() => {
              //           restoreDefaultRoutines();
              //           alert('restored!');
              //         }}
              //         title="restore"
              //       />
              //     </View>
              //   );
              // },
            }}
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
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
