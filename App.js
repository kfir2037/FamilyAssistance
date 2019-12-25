import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/ParentsScreens/DashboardScreen';
import WatchTasks from './screens/swScreens/WatchTasks';
import KidsWatchTasks from './screens/kidsScreens/KidsWatchTasks';
import AddNewFamily from './screens/swScreens/AddNewFamily';
import WatchFamilies from './screens/swScreens/WatchFamilies';
import DashboardTabNavigator from './navigations/ParentsNavigations/DashboardTabNavigator';
import DashboardStackNavigator from './navigations/ParentsNavigations/DashboardStackNavigator';
import AppDrawerNavigator from './navigations/ParentsNavigations/AppDrawerNavigator';
import WatchTasksStackNavigator from './navigations/ParentsNavigations/WatchTasksStackNavigator';
import SwAddNewFamilyStackNavigator from './navigations/SwNavigations/SwAddNewFamilyStackNavigator';
import SwWatchFamiliesStackNavigator from './navigations/SwNavigations/SwWatchFamiliesStackNavigator';
import SwDrawerNavigator from './navigations/SwNavigations/SwDrawerNavigator';
import {KidsStackNavigator} from './navigations/KidsNavigations/KidsStackNavigator'
import KidsDrawerNavigator from './navigations/KidsNavigations/KidsDrawerNavigator';


class App extends React.Component{
  render(){
    return(
        <AppContainer/>
    )   
  }
}
export default App


 
const AppSwitchNavigator = createSwitchNavigator({
  Welcome:{ 
    screen:WelcomeScreen,
  },
  Dashboard:{
    screen:AppDrawerNavigator,
  },
  SwDashboard:{
    screen:SwDrawerNavigator
  },
  KidsDashboard:{
    screen:KidsDrawerNavigator
  }
})

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
