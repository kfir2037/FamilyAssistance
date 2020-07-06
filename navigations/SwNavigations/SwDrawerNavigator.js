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
import ChangePasswordScreen from '../../screens/ChangePasswordScreen'
import SettingsStackNavigator from './SettingsStackNavigator'
import ReportsStackNavigator from './ReportsStackNavigator'
import { Ionicons as Icon } from '@expo/vector-icons';


const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ backgroundColor: '#e0aa00', height: '25%', alignItems: 'center', justifyContent: 'center' }}>
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
        <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
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

  ChangePasswordFlow:{
    screen: createStackNavigator({
      ChangePassword: {
        screen: ChangePasswordScreen,
      }
    },{
      defaultNavigationOptions:({navigation}) => {
        return {
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
    }),
    navigationOptions:{
      drawerLabel:'ערוך פרופיל'
    }
    
  },
  
    
}, {
  drawerPosition: 'right',
  drawerWidth: '60%',
  drawerBackgroundColor: '#e0aa00',
  contentOptions: {
    activeTintColor: '#0ca5e5',
    inactiveTintColor: 'white',
    itemsContainerStyle: {
      alignItems: 'flex-end'
    },

  },
  contentComponent: CustomDrawerComponent,
}
)

export default SwDrawerNavigator;