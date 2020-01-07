import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import WatchTasks from '../../screens/swScreens/WatchTasks';
import Icon from '@expo/vector-icons/Ionicons';
import firebase from '../../config/config'

const SwStackNavigator = createStackNavigator({
  Tasks: WatchTasks,
  // AddNewFamily:AddNewFamily,
  // WatchFamilies:WatchFamilies,
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