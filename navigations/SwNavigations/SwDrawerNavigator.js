import React from 'react';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import WatchTasks from '../../screens/swScreens/MainPage';
import firebase from '../../config/config';
import SwStackNavigator from './SwStackNavigator'
import SwAddNewFamilyStackNavigator from './SwAddNewFamilyStackNavigator'
import SwWatchFamiliesStackNavigator from './SwWatchFamiliesStackNavigator'
import SettingsStackNavigator from './SettingsStackNavigator'
import ReportsStackNavigator from './ReportsStackNavigator'
import { Ionicons as Icon } from '@expo/vector-icons';


const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ backgroundColor: '#767ead', height: '25%', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../../assets/family.png')} style={{ marginVertical: 10, height: 120, width: 100 }} />
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>שלום, {firebase.auth().currentUser.displayName}</Text>
    </View>
    <ScrollView contentContainerStyle={{ justifyContent: 'space-between', flex: 1, flexDirection: 'column' }}>
      <DrawerItems {...props} />
      <TouchableOpacity onPress={() => {
        try {
          firebase.auth().signOut();
        } catch (err) {

        }

      }}>
        <View style={{ padding:10, flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
          <Icon style={{ marginHorizontal: 10 }} name='md-exit' color='white' size={24} />
          <Text style={{ color: 'white', fontWeight: 'bold' }}>התנתקות</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView >
)

const SwDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: SwStackNavigator,
    navigationOptions: {
      drawerLabel: 'ראשי',
    },
  },
  // AddNewFamily: {
  //   screen: SwAddNewFamilyStackNavigator,
  //   navigationOptions: {
  //     drawerLabel: 'הוספת משפחה'
  //   }
  // },
  // WatchFamilies: {
  //   screen: SwWatchFamiliesStackNavigator,
  //   navigationOptions: {
  //     drawerLabel: 'משפחות'
  //   }
  // },

  Reports: {
    screen: ReportsStackNavigator,
    navigationOptions: {
      drawerLabel: 'דו"חות'
    }
  },

  Settings: {
    screen: SettingsStackNavigator,
    navigationOptions: {
      drawerLabel: 'הגדרות',

    }
  },

  // Logout: {
  //   screen: WelcomeScreen,

  //   navigationOptions: {
  //     drawerLabel: 'התנתקות',
  //     drawerIcon: <Icon name='md-exit' color='white' size={24} />
  //   }
  // }
}, {
  drawerPosition: 'right',
  drawerWidth: '60%',
  drawerBackgroundColor: '#767ead',
  contentOptions: {
    activeTintColor: '#b5bef5',
    inactiveTintColor: 'white',
    itemsContainerStyle: {
      alignItems: 'flex-end'
    },

  },
  contentComponent: CustomDrawerComponent,
}
)

export default SwDrawerNavigator;