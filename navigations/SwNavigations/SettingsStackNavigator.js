
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
// import DashboardTabNavigator from './DashboardTabNavigator';
import WatchFamilies from '../../screens/swScreens/WatchFamilies';
import Settings from '../../screens/swScreens/Settings'

const SettingsStackNavigator = createStackNavigator({
  Settings: Settings,
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
        headerTintColor:'white',
        headerStyle: {
          backgroundColor: '#e0aa00'
        }
      }
    }
  }
)

export default SettingsStackNavigator;