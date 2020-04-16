import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import Main from '../../screens/swScreens/MainPage';
import Icon from '@expo/vector-icons/Ionicons';
import firebase from '../../config/config';
import AddNewFamily from '../../screens/swScreens/AddNewFamily';
import Tasks2 from '../../screens/swScreens/WatchFamiliesTasks';
import WatchFamilies from '../../screens/swScreens/WatchFamilies';


const SwStackNavigator = createStackNavigator({
  Main: Main,
  AddNewFamily:AddNewFamily,
  Tasks2:Tasks2,
  WatchFamilies:WatchFamilies
},
  {
    
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30} />
        ),
        headerRight: (
          <Icon style={{ padding: 10 }}
            name="md-exit"
            onPress={() => {
              firebase.auth().signOut();
              navigation.navigate('Welcome');

            }
            }
            size={30} />
        )
      }
    }
  }
)

export default SwStackNavigator;