import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
// import WatchTasks from '../../screens/swScreens/WatchTasks';
// import SwStackNavigator from './SwStackNavigator'
// import SwAddNewFamilyStackNavigator from './SwAddNewFamilyStackNavigator'
// import SwWatchFamiliesStackNavigator from './SwWatchFamiliesStackNavigator'
// import KidsWatchTasks from '../../screens/kidsScreens/KidsWatchTasks';
import KidsStackNavigator from './KidsStackNavigator';
import KidsMainPageStackNavigator from './KidsMainPageStackNavigator';

const KidsDrawerNavigator = createDrawerNavigator({
    Main:{
      screen:KidsMainPageStackNavigator,
    },
    Tasks:{
      screen:KidsStackNavigator,
    }
  })
  
  export default KidsDrawerNavigator;