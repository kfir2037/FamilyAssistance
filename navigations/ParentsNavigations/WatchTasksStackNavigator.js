import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from '@expo/vector-icons/Ionicons';
import WatchTasks from '../../screens/ParentsScreens/WatchTasks'

const WatchTasksStackNavigator = createStackNavigator({
  watchTasks: WatchTasks,
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerRight: (
          <Icon style={{ padding: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
            color='white' />
        ),
        headerTintColor: 'white',
        // headerLeft:(
        //   <Icon style={{padding:10}}
        //   name="md-exit"
        //   onPress={()=>navigation.navigate('Welcome')}
        //   size={30}/>   
        // )

        headerStyle: {
          backgroundColor: '#e0aa00'
        }
      }
    }
  },
  {
    headerLayoutPreset: 'center'
  }
)

export default WatchTasksStackNavigator;