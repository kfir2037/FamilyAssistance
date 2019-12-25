import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
import DashboardStackNavigator from './DashboardStackNavigator';
import WatchTasksStackNavigator from './WatchTasksStackNavigator';

const AppDrawerNavigator = createDrawerNavigator({
    Dashboard:{
      screen:DashboardStackNavigator,
    },
    WatchTasks:{
      screen:WatchTasksStackNavigator,
    }
  })
  
  export default AppDrawerNavigator;