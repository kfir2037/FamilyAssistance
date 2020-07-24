import React from 'react';
import {TouchableOpacity,ScrollView, SafeAreaView,Image, StyleSheet, Text, View,Button } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import adminStackNavigator from './adminStackNavigator';
import firebase from '../../config/config'
import adminMainPageStackNavigator from './adminMainPageStackNavigator';
import { Ionicons as Icon } from '@expo/vector-icons';
import adminReports from '../../screens/adminScreens/adminReports'
const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ backgroundColor: '#e0aa00', height: '25%', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../../assets/family2.png')} style={{ marginVertical: 10, height: 120, width: 100 }} />
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


const adminDrawerNavigator = createDrawerNavigator({
    Main:{
      screen:adminMainPageStackNavigator,
      navigationOptions: {
        drawerLabel: 'ראשי',
      },
    },
    Tasks:{
      screen:adminStackNavigator,
      navigationOptions: {
        drawerLabel: "הוספת עו''ס",
      },
    },
    Reports:{
      screen:adminReports,
      navigationOptions: {
        drawerLabel: "הפקדת דוחות",
      },
    }
  },{
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
  
  export default adminDrawerNavigator;