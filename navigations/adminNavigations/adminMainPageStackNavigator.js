import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import adminMainPage from '../../screens/adminScreens/adminMainPage';
import firebase from '../../config/config';
import editFamilies from '../../screens/adminScreens/editFamilies';

const adminStackNavigator = createStackNavigator({
    Main:adminMainPage,
    editFamilies:editFamilies,

  },{
  
  defaultNavigationOptions:({navigation})=>{
    return{

      headerRight: (
        <Icon style={{ padding: 10 }}
          onPress={() => navigation.openDrawer()}
          name="md-menu"
          size={30}
          color='white' />
      ),
      headerTintColor:'white',
      // headerLeft: (
      //   <Icon style={{ padding: 10 }}
      //     name="md-exit"
      //     onPress={() => {
      //       firebase.auth().signOut();
      //       navigation.navigate('Welcome');
      //     }
      //     }
      //     size={30}
      //     color='white' />
      // ),
      headerStyle: {
        backgroundColor: '#e0aa00'
      }
    }
  }
  }
  )

  export default adminStackNavigator;