import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import WatchTasks from '../../screens/swScreens/MainPage';
import SwStackNavigator from './SwStackNavigator'
import SwAddNewFamilyStackNavigator from './SwAddNewFamilyStackNavigator'
import SwWatchFamiliesStackNavigator from './SwWatchFamiliesStackNavigator'
import SettingsStackNavigator from './SettingsStackNavigator'
import ReportsStackNavigator from './ReportsStackNavigator'


const SwDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: SwStackNavigator,
    navigationOptions: {
      drawerLabel: 'ראשי'
    }
  },
  AddNewFamily: {
    screen: SwAddNewFamilyStackNavigator,
    navigationOptions: {
      drawerLabel: 'הוסף משפחה'
    }
  },
  WatchFamilies: {
    screen: SwWatchFamiliesStackNavigator,
    navigationOptions: {
      drawerLabel: 'משפחות'
    }
  },
  Settings: {
    screen: SettingsStackNavigator,
    navigationOptions: {
      drawerLabel: 'הגדרות'
    }
  },
  Reports: {
    screen: ReportsStackNavigator,
    navigationOptions: {
      drawerLabel: 'דוחות'
    }
  }
})

export default SwDrawerNavigator;