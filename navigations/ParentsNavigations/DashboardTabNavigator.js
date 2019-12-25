import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
// import Feed from './screens/ParentsScreens/Feed';
// import Settings from './screens/ParentsScreens/Settings';
// import Profile from './screens/ParentsScreens/Profile';
import Feed from '../../screens/ParentsScreens/Feed';
import Settings from '../../screens/ParentsScreens/Settings';
import Profile from '../../screens/ParentsScreens/Profile';


const DashboardTabNavigator = createBottomTabNavigator({
    Feed,
    Profile,
    Settings,
  },
  
  {
  navigationOptions:({navigation})=>{
      const {routhName} = navigation.state.routes[navigation.state.index]
    return{
      headerTitle:routhName,
    } 
  } 
  }
  )


  export default DashboardTabNavigator;