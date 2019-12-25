import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import WatchTasks from '../../screens/swScreens/WatchTasks';
import SwStackNavigator from './SwStackNavigator'
import SwAddNewFamilyStackNavigator from './SwAddNewFamilyStackNavigator'
import SwWatchFamiliesStackNavigator from './SwWatchFamiliesStackNavigator'



const SwDrawerNavigator = createDrawerNavigator({
    Tasks:{
      screen:SwStackNavigator,
    },
    AddNewFamily:{
      screen:SwAddNewFamilyStackNavigator,
    },
    WatchFamilies:{
      screen:SwWatchFamiliesStackNavigator,
    },
    
  })

  export default SwDrawerNavigator;