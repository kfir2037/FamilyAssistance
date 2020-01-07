import React from 'react';
import { StyleSheet } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import AppDrawerNavigator from './navigations/ParentsNavigations/AppDrawerNavigator';
import SwDrawerNavigator from './navigations/SwNavigations/SwDrawerNavigator';
import KidsDrawerNavigator from './navigations/KidsNavigations/KidsDrawerNavigator';
import loadingScreen from './screens/loadingScreen';

class App extends React.Component{
  render(){ 
    return(
      <AppContainer/>
    )   
  }
}

export default App;

const AppSwitchNavigator = createSwitchNavigator({
  loading:loadingScreen,
  Welcome:{ 
    screen:WelcomeScreen,
  },
  ParentsDashboard:{
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
