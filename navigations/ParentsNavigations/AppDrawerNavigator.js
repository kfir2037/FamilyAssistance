import React from 'react';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { StyleSheet, Text, View, Image, Button, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import DashboardStackNavigator from './DashboardStackNavigator';
import WatchTasksStackNavigator from './WatchTasksStackNavigator';
import MainPageStackNavigator from './MainPageStackNavigator';
import MotivationStackNavigator from './MotivationStackNavigator';
import ChangePasswordScreen from '../../screens/ChangePasswordScreen';
import TestScreen from '../../screens/swScreens/TestScreen';
import firebase from '../../config/config';


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


const AppDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: MainPageStackNavigator,
    navigationOptions: {
      drawerLabel: 'ראשי'
    }
  },

  WatchTasks: {
    screen: WatchTasksStackNavigator,
    navigationOptions: {
      drawerLabel: 'משימות'
    }
  },

  Motivation: {
    screen: MotivationStackNavigator,
    navigationOptions: {
      drawerLabel: 'משפטי מוטיבציה'
    }
  },
  ChangePasswordFlow: {
    screen: createStackNavigator({
      ChangePassword: {
        screen: ChangePasswordScreen,
      }
    }, {
      defaultNavigationOptions: ({ navigation }) => {
        return {
          headerRight: (
            <Icon style={{ padding: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
              color='white'
            />
          ),
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: '#e0aa00'
          }
        }
      }
    }),
    navigationOptions: {
      drawerLabel: 'ערוך פרופיל'
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
    }
  },
  contentComponent: CustomDrawerComponent
}
)

export default AppDrawerNavigator;