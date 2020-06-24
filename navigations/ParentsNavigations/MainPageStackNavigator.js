import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
import DashboardTabNavigator from './DashboardTabNavigator';
// import WatchTasks from '../../screens/swScreens/WatchTasks';
import MainPage from '../../screens/ParentsScreens/ParentsMainPage';
import WatchTasks from '../../screens/ParentsScreens/WatchTasks'
import firebase from '../../config/config'

const MainPageStackNavigator = createStackNavigator({
  Main: MainPage,
  //Tasks:WatchTasks
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        // title:'משימות לתאריך:',
        headerRight: (
          <Icon style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
            color='white'
          />
        ),
        headerTintColor: 'white',

        // headerLeft: (
        //   <Icon style={{ padding: 10 }}
        //     name="md-exit"
        //     onPress={() => {
        //       try {
        //         firebase.auth().signOut();
        //         navigation.navigate('Welcome');
        //       } catch (error) {
        //         console.log(error);
        //       }
        //     }}
        //     size={30}
        //     color='white'
        //   />
        // ),
        headerStyle: {
          backgroundColor: '#e0aa00'
        }
      }
    }
  },
  {
    headerLayoutPreset: 'cenetr'
  }
)

export default MainPageStackNavigator;