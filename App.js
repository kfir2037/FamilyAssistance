import React, { useEffect } from 'react';
import { StyleSheet, I18nManager } from 'react-native';
import { useFonts } from '@use-expo/font';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AppDrawerNavigator from './navigations/ParentsNavigations/AppDrawerNavigator';
import SwDrawerNavigator from './navigations/SwNavigations/SwDrawerNavigator';
import KidsDrawerNavigator from './navigations/KidsNavigations/KidsDrawerNavigator';
import adminDrawerNavigator from './navigations/adminNavigations/adminDrawerNavigator';
import loadingScreen from './screens/loadingScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import { AppLoading } from 'expo';
import firebase from './config/config';
import moment from 'moment';
import { createStackNavigator } from 'react-navigation-stack';

const App = () => {



  const [fontsLoaded] = useFonts({
    'Heebo': require('./assets/fonts/Heebo-VariableFont_wght.ttf'),
  });

  console.log('isRTL: ', I18nManager.isRTL);

  
  useEffect(() => {
    I18nManager.allowRTL(false);
  }, []);
  // const messaging = firebase.messaging();
  // messaging.usePublicVapidKey('BCeJeaN3JawwJIYicC7n4cNkvfSdxkRuSjkXkiX_lvksdWks0bddHh39QhWnakxdu4PTMRSYKmU4BYhIAAViv10');

  return (
    <AppContainer />
  )

}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  loading: loadingScreen,
  WelcomeFlow:
    createStackNavigator({
      Welcome: {
        screen: WelcomeScreen,
        navigationOptions: {
          header: null
        }
      },
      // ForgotPassword: {
      //   screen: ForgotPasswordScreen,
      //   navigationOptions: {
      //     headerStyle: {
      //       backgroundColor: '#e0aa00'
      //     }
      //   }
      // }
    }

    ),
  ParentsDashboard: {
    screen: AppDrawerNavigator,
  },
  SwDashboard: {
    screen: SwDrawerNavigator
  },
  KidsDashboard: {
    screen: KidsDrawerNavigator
  },
  adminDashboard: {
    screen: adminDrawerNavigator
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
