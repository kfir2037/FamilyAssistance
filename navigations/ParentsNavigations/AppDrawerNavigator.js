import { createDrawerNavigator } from 'react-navigation-drawer';
import DashboardStackNavigator from './DashboardStackNavigator';
import WatchTasksStackNavigator from './WatchTasksStackNavigator';
import MainPageStackNavigator from './MainPageStackNavigator';
import TestScreen from '../../screens/swScreens/TestScreen';

const AppDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: MainPageStackNavigator,
  },
  Dashboard: {
    screen: DashboardStackNavigator,
  },
  WatchTasks: {
    screen: WatchTasksStackNavigator,
  },
  Test: {
    screen: TestScreen,
  }
}, {
  drawerPosition: 'right',
  drawerWidth: '45%',
  drawerBackgroundColor: '#767ead',
}

)

export default AppDrawerNavigator;