import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import WatchTasks from '../../screens/swScreens/WatchTasks';
import Icon from '@expo/vector-icons/Ionicons';

const SwStackNavigator = createStackNavigator({
    Tasks:WatchTasks,
    // AddNewFamily:AddNewFamily,
    // WatchFamilies:WatchFamilies,
  },
  {
  defaultNavigationOptions:({navigation})=>{
    return{
      headerLeft:(
        <Icon style={{padding:10}}
        onPress={()=>navigation.openDrawer()}
        name="md-menu"
        size={30}/>
      ),
      headerRight:(
        <Icon style={{padding:10}}
        name="md-exit"
        onPress={()=>navigation.navigate('Welcome')}
        size={30}/>   
      )
    }
  }
  }
  )

  export default SwStackNavigator;